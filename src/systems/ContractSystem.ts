/**
 * ContractSystem — Board de 3 contrats urgents time-limited.
 * Nouveaux contrats apparaissent toutes les 10-20 min si un slot est libre.
 * Récompense indexée sur le revenu : max(montant fixe, k secondes de revenu), figée à l'acceptation.
 * Les contrats expirent si non acceptés. Une fois accepté, progression auto.
 */

import { type ContractDef, CONTRACTS } from '../config/contracts.ts';
import type { GameState } from '../core/GameState.ts';

export interface ActiveContract extends ContractDef {
  slotId:      number;
  expiresAt:   number;   // timestamp
  acceptedAt?: number;   // timestamp si accepté
  completesAt?: number;  // timestamp si accepté
  status:      'available' | 'accepted' | 'completed' | 'expired';
}

const BASE_BOARD_SIZE = 3;
const REFILL_MIN      = 10 * 60;  // 10 min (20 en 1.1)
const REFILL_MAX      = 20 * 60;  // 20 min (40 en 1.1)

/** Secondes de revenu que vaut un contrat, selon sa rareté (k de la récompense indexée). */
export const CONTRACT_REWARD_SECONDS: Record<ContractDef['rarity'], number> = { common: 20, rare: 60, epic: 150 };

/** Récompense indexée : max(montant fixe du contrat, k × revenu par seconde). */
export function getIndexedContractReward(base: number, rarity: ContractDef['rarity'], rate: number): number {
  return Math.max(base, CONTRACT_REWARD_SECONDS[rarity] * (rate > 0 ? rate : 0));
}
const SAVE_KEY        = 'bot-empire-contracts';

export class ContractSystem {
  private slots:          Array<ActiveContract | null> = [null, null, null];
  private nextRefill:     number[] = [0, 0, 0]; // timestamps
  private usedIds:        Set<string> = new Set();
  private onNewContract?: (contract: ActiveContract) => void;
  private onComplete?:    (contract: ActiveContract) => void;
  private boardSize:      number = BASE_BOARD_SIZE;
  private rewardBonus:    number = 1; // multiplicateur récompenses (réputation, Academy)
  private workTimeMult:   number = 1; // durée de travail (Academy : « Exiger un format »)

  // ─── INIT ─────────────────────────────────────────────────

  init(
    onNewContract: (c: ActiveContract) => void,
    onComplete:    (c: ActiveContract) => void,
  ): void {
    this.onNewContract = onNewContract;
    this.onComplete    = onComplete;
    this.load();

    // Initialiser les timers de refill vides
    for (let i = 0; i < this.boardSize; i++) {
      if (!this.slots[i]) this.scheduleRefill(i, 5); // 5s au premier lancement
    }
  }

  /** Appelé depuis main.ts quand la réputation ou l'Academy changent. */
  setReputation(extraSlots: number, rewardBonus: number, workTimeMult = 1): void {
    const newSize = BASE_BOARD_SIZE + extraSlots;
    this.rewardBonus = rewardBonus;
    this.workTimeMult = workTimeMult;

    if (newSize > this.boardSize) {
      // Expansion du board
      for (let i = this.boardSize; i < newSize; i++) {
        this.slots.push(null);
        this.nextRefill.push(0);
        this.scheduleRefill(i, 5);
      }
      this.boardSize = newSize;
    }
  }

  // ─── TICK ─────────────────────────────────────────────────

  tick(state: GameState): void {
    const now = Date.now();

    for (let i = 0; i < this.boardSize; i++) {
      const slot = this.slots[i];

      if (!slot) {
        // Slot vide — vérifier si c'est l'heure de refill
        if (now >= this.nextRefill[i]) {
          this.fillSlot(i, state);
        }
        continue;
      }

      // Contrat disponible non expiré
      if (slot.status === 'available' && now >= slot.expiresAt) {
        slot.status = 'expired';
        this.slots[i] = null;
        this.scheduleRefill(i);
        this.save();
        continue;
      }

      // Contrat accepté — vérifier completion
      if (slot.status === 'accepted' && slot.completesAt && now >= slot.completesAt) {
        slot.status = 'completed';
        // Appliquer le bonus réputation sur la récompense
        if (this.rewardBonus !== 1) slot.reward = Math.round(slot.reward * this.rewardBonus);
        this.onComplete?.(slot);
        this.slots[i] = null;
        this.scheduleRefill(i);
        this.save();
        continue;
      }
    }
  }

  // ─── ACTIONS ──────────────────────────────────────────────

  /**
   * `rate` : production réelle (€/s) calculée par le moteur — la même que celle affichée
   * dans les exigences du contrat. Sans elle, repli sur l'estimation grossière.
   */
  canAccept(contract: ActiveContract, state: GameState, rate?: number): boolean {
    if (contract.status !== 'available') return false;

    // Vérifier production €/s
    if (contract.requiresRate) {
      rate ??= this.getTotalRate(state);
      if (rate < contract.requiresRate) return false;
    }

    // Vérifier agents requis
    if (contract.requiresAgent) {
      const count = state.agents[contract.requiresAgent.id]?.count ?? 0;
      if (count < contract.requiresAgent.count) return false;
    }

    return true;
  }

  /**
   * Récompense affichée : figée pour un contrat accepté, indexée sur le revenu actuel sinon
   * (avant le bonus de réputation et d'Academy, appliqué à la livraison).
   */
  getReward(contract: ActiveContract, rate: number): number {
    if (contract.status === 'accepted') return contract.reward;
    const base = CONTRACTS.find(c => c.id === contract.id)?.reward ?? contract.reward;
    return getIndexedContractReward(base, contract.rarity, rate);
  }

  /** Accepte le contrat : la récompense est figée sur le revenu du moment (`rate`). */
  accept(contract: ActiveContract, rate = 0): void {
    contract.reward = this.getReward(contract, rate);
    const now = Date.now();
    contract.acceptedAt  = now;
    contract.completesAt = now + contract.workTime * this.workTimeMult * 1000;
    contract.status      = 'accepted';
    this.save();
  }

  getSlots(): Array<ActiveContract | null> {
    return [...this.slots];
  }

  getProgress(contract: ActiveContract): number {
    if (contract.status !== 'accepted' || !contract.acceptedAt || !contract.completesAt) return 0;
    const elapsed = Date.now() - contract.acceptedAt;
    const total   = contract.completesAt - contract.acceptedAt;
    return Math.min(elapsed / total, 1);
  }

  // ─── PRIVATE ──────────────────────────────────────────────

  private fillSlot(slotId: number, state: GameState): void {
    const contract = this.pickContract(state);
    if (!contract) return;

    const now = Date.now();
    const active: ActiveContract = {
      ...contract,
      slotId,
      expiresAt: now + contract.duration * 1000,
      status: 'available',
    };

    this.slots[slotId] = active;
    this.usedIds.add(contract.id);
    this.onNewContract?.(active);
    this.save();
  }

  private pickContract(state: GameState): ContractDef | null {
    // Reset si tout vu
    if (this.usedIds.size >= CONTRACTS.length) this.usedIds.clear();

    // Pondérer par rareté : epic = 10%, rare = 35%, common = 55%
    const pool = CONTRACTS.filter(c => !this.usedIds.has(c.id));
    if (pool.length === 0) return null;

    const rate = this.getTotalRate(state);

    // Filtrer par accessibilité minimale (éviter d'afficher des contrats impossibles dès le début)
    // Un contrat n'apparaît que s'il est atteignable bientôt : 10 % de la production demandée,
    // et au moins un agent du type exigé. Sinon l'emplacement reste vide et réessaie au tick suivant.
    const accessible = pool.filter(c => {
      if (c.requiresRate && rate < c.requiresRate * 0.1) return false;
      if (c.requiresAgent && (state.agents[c.requiresAgent.id]?.count ?? 0) === 0) return false;
      return true;
    });
    if (accessible.length === 0) return null;

    const candidates = accessible;

    // Pondération rareté
    const weights = candidates.map(c => c.rarity === 'common' ? 55 : c.rarity === 'rare' ? 35 : 10);
    const total   = weights.reduce((a, b) => a + b, 0);
    let rand      = Math.random() * total;
    for (let i = 0; i < candidates.length; i++) {
      rand -= weights[i]!;
      if (rand <= 0) return candidates[i]!;
    }
    return candidates[candidates.length - 1]!;
  }

  private scheduleRefill(slotId: number, overrideSec?: number): void {
    const delay = overrideSec
      ? overrideSec * 1000
      : (REFILL_MIN + Math.random() * (REFILL_MAX - REFILL_MIN)) * 1000;
    this.nextRefill[slotId] = Date.now() + delay;
  }

  /** Le vrai revenu est fourni par main.ts (le moteur n'est pas importé ici, pour éviter un import circulaire). */
  private rateOf: ((state: GameState) => number) | null = null;

  setRateProvider(fn: (state: GameState) => number): void { this.rateOf = fn; }

  private getTotalRate(state: GameState): number {
    if (this.rateOf) return this.rateOf(state);
    return Object.values(state.agents).reduce((sum, a) => sum + a.count * 0.1, 0); // repli approximatif
  }

  /** Les contrats sauvegardés gardent les textes de leur langue d'origine : on les relit depuis la config. */
  private withCurrentTexts(slot: ActiveContract | null): ActiveContract | null {
    if (!slot) return null;
    const def = CONTRACTS.find(c => c.id === slot.id);
    return def ? { ...slot, client: def.client, title: def.title, description: def.description } : slot;
  }

  // ─── PERSISTANCE ──────────────────────────────────────────

  private save(): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        slots:      this.slots,
        nextRefill: this.nextRefill,
        usedIds:    [...this.usedIds],
      }));
    } catch { /* silencieux */ }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.slots)      this.slots      = (data.slots as Array<ActiveContract | null>).map(s => this.withCurrentTexts(s));
      if (data.nextRefill) this.nextRefill  = data.nextRefill;
      if (data.usedIds)    this.usedIds     = new Set(data.usedIds);
    } catch { /* silencieux */ }
  }
}
