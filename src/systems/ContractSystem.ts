/**
 * ContractSystem — Board de 3 contrats urgents time-limited.
 * Nouveaux contrats apparaissent toutes les 20-40 min si un slot est libre.
 * Les contrats expirent si non acceptés. Une fois accepté, progression auto.
 */

import { ContractDef, CONTRACTS } from '../config/contracts.ts';
import { GameState } from '../core/GameState.ts';

export interface ActiveContract extends ContractDef {
  slotId:      number;
  expiresAt:   number;   // timestamp
  acceptedAt?: number;   // timestamp si accepté
  completesAt?: number;  // timestamp si accepté
  status:      'available' | 'accepted' | 'completed' | 'expired';
}

const BASE_BOARD_SIZE = 3;
const REFILL_MIN      = 20 * 60;  // 20 min
const REFILL_MAX      = 40 * 60;  // 40 min
const SAVE_KEY        = 'bot-empire-contracts';

export class ContractSystem {
  private slots:          Array<ActiveContract | null> = [null, null, null];
  private nextRefill:     number[] = [0, 0, 0]; // timestamps
  private usedIds:        Set<string> = new Set();
  private onNewContract?: (contract: ActiveContract) => void;
  private onComplete?:    (contract: ActiveContract) => void;
  private boardSize:      number = BASE_BOARD_SIZE;
  private rewardBonus:    number = 1; // multiplicateur récompenses (réputation)

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

  /** Appelé depuis main.ts quand la réputation change */
  setReputation(extraSlot: boolean, rewardBonus: number): void {
    const newSize = extraSlot ? BASE_BOARD_SIZE + 1 : BASE_BOARD_SIZE;
    this.rewardBonus = rewardBonus;

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

  canAccept(contract: ActiveContract, state: GameState): boolean {
    if (contract.status !== 'available') return false;

    // Vérifier production €/s
    if (contract.requiresRate) {
      const rate = this.getTotalRate(state);
      if (rate < contract.requiresRate) return false;
    }

    // Vérifier agents requis
    if (contract.requiresAgent) {
      const count = state.agents[contract.requiresAgent.id]?.count ?? 0;
      if (count < contract.requiresAgent.count) return false;
    }

    return true;
  }

  accept(contract: ActiveContract): void {
    const now = Date.now();
    contract.acceptedAt  = now;
    contract.completesAt = now + contract.workTime * 1000;
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
    const accessible = pool.filter(c => {
      if (c.requiresRate && rate < c.requiresRate * 0.1) return false;
      return true;
    });

    const candidates = (accessible.length > 0 ? accessible : pool);

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

  private getTotalRate(state: GameState): number {
    // Import circulaire évité — calcul simplifié
    return Object.values(state.agents).reduce((sum, a) => sum + a.count * 0.1, 0);
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
      if (data.slots)      this.slots      = data.slots;
      if (data.nextRefill) this.nextRefill  = data.nextRefill;
      if (data.usedIds)    this.usedIds     = new Set(data.usedIds);
    } catch { /* silencieux */ }
  }
}
