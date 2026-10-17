import { type GameState, MAX_AMOUNT, createInitialState } from './GameState.ts';
import { AGENTS, type AgentDef, getTeamTierMultiplier } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import {
  REPUTATION_PERKS, getPrestigeRP, NOTORIETE_IDS, NOTORIETE_MAX_LEVEL, NOTORIETE_INCOME_PER_LEVEL, getNotorieteCost,
} from '../config/reputationPerks.ts';

const PRESTIGE_BASE           = 10_000_000; // atteint juste après le dernier client (~30 min la 1re partie)
const PRESTIGE_SCALE          = 1.5;  // ×1.5 par prestige : chaque partie reste plus courte que la précédente
const PRESTIGE_BONUS_PER_LEVEL = 0.15;
const BASE_CLICK_VALUE         = 1;  // 10 clics pour le premier agent (10 €)
const MAX_OFFLINE_HOURS        = 8;
const MAX_BULK_BUY             = 1_000; // garde-fou du mode d'achat « max »

export interface TickResult {
  newClients: string[];
}

/** Somme plafonnée à MAX_AMOUNT : jamais d'Infinity ni de NaN dans l'état. */
function addCapped(a: number, b: number): number {
  const sum = a + b;
  if (Number.isNaN(sum)) return a;
  return Math.min(sum, MAX_AMOUNT);
}

export class GameEngine {
  // ─── PRODUTION ─────────────────────────────────────────────

  getPrestigeMultiplier(state: GameState): number {
    return 1 + state.prestigeCount * PRESTIGE_BONUS_PER_LEVEL;
  }

  getGlobalUpgradeMultiplier(state: GameState): number {
    return UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'global_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'global_multiplier' ? u.effect.multiplier : 1);
    }, 1);
  }

  getAgentMultiplier(state: GameState, agentId: string): number {
    return UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] &&
      u.effect.type === 'agent_multiplier' &&
      u.effect.agentId === agentId
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'agent_multiplier' ? u.effect.multiplier : 1);
    }, 1);
  }

  /** Synergies achetées (ex. Orchestration) : chaque agent source renforce les autres types. */
  getSynergyMultiplier(state: GameState, agentId: string): number {
    return UPGRADES.reduce((acc, u) => {
      if (!state.upgradesPurchased[u.id] || u.effect.type !== 'synergy' || u.effect.sourceAgentId === agentId) return acc;
      const sources = state.agents[u.effect.sourceAgentId]?.count ?? 0;
      return acc * (1 + u.effect.perUnit * sources);
    }, 1);
  }

  getAgentProduction(state: GameState, def: AgentDef): number {
    const count = state.agents[def.id]?.count ?? 0;
    if (count === 0) return 0;
    const agentMult = this.getAgentMultiplier(state, def.id);
    return def.baseProduction * count * agentMult * getTeamTierMultiplier(count)
      * this.getSynergyMultiplier(state, def.id);
  }

  /** Multiplicateur des bonus clients (ex. Clients récurrents). */
  getClientMultiplier(state: GameState): number {
    return UPGRADES.reduce((acc, u) =>
      state.upgradesPurchased[u.id] && u.effect.type === 'client_multiplier' ? acc * u.effect.multiplier : acc, 1);
  }

  getClientBonus(state: GameState): number {
    return CLIENTS.filter(c => state.clientsUnlocked[c.id])
      .reduce((acc, c) => acc + c.bonusPerSecond, 0) * this.getClientMultiplier(state);
  }

  // ─── NOUVEAUX MARCHÉS (réservés aux parties après un prestige) ─

  /** L'agent peut-il être recruté dans cette partie (prestiges requis atteints) ? */
  isAgentAvailable(state: GameState, agentId: string): boolean {
    const def = AGENTS.find(a => a.id === agentId);
    return !!def && state.prestigeCount >= (def.minPrestige ?? 0);
  }

  /** Le client peut-il signer dans cette partie (prestiges requis atteints) ? */
  isClientAvailable(state: GameState, clientId: string): boolean {
    const def = CLIENTS.find(c => c.id === clientId);
    return !!def && state.prestigeCount >= (def.minPrestige ?? 0);
  }

  getTotalRate(state: GameState, marketMult = 1): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    const clientBonus   = this.getClientBonus(state);
    return (agentProd + clientBonus) * this.getIncomeMultiplier(state) * marketMult;
  }

  /**
   * Production des agents seuls (hors bonus clients et hors événement de marché).
   * Sert au déblocage des clients : inclure leurs bonus créait une cascade
   * où chaque client débloquait immédiatement le suivant.
   */
  getAgentRate(state: GameState): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    return agentProd * this.getIncomeMultiplier(state);
  }

  /** Multiplicateurs permanents de revenu : upgrades globaux × prestige × réputation. */
  private getIncomeMultiplier(state: GameState): number {
    return this.getGlobalUpgradeMultiplier(state)
      * this.getPrestigeMultiplier(state)
      * this.getReputationIncomeMult(state);
  }

  // ─── CLIC ──────────────────────────────────────────────────

  /** Part de la production des agents ajoutée à chaque clic (Copilote : 0.02). */
  getClickShare(state: GameState): number {
    return UPGRADES.reduce((acc, u) =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_share' ? acc + u.effect.share : acc, 0);
  }

  getClickValue(state: GameState, marketClickMult = 1): number {
    const clickMult = UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'click_multiplier' ? u.effect.multiplier : 1);
    }, 1);
    const prestigeMult = this.getPrestigeMultiplier(state);
    const repClickMult = this.getReputationClickMult(state);
    const base = BASE_CLICK_VALUE * clickMult * prestigeMult * repClickMult;
    const share = this.getClickShare(state);
    const copilot = share > 0 ? share * this.getAgentRate(state) : 0;
    return (base + copilot) * marketClickMult;
  }

  click(state: GameState, marketClickMult = 1): GameState {
    return this.earn(state, this.getClickValue(state, marketClickMult));
  }

  /**
   * Ajoute un gain à la trésorerie et au total gagné, plafonnés à MAX_AMOUNT.
   * Passage obligé de tout revenu (clic, tick, hors ligne, contrats, incidents, Academy).
   */
  earn(state: GameState, amount: number): GameState {
    if (!(amount > 0)) return state;
    return {
      ...state,
      currency: addCapped(state.currency, amount),
      totalEarned: addCapped(state.totalEarned, amount),
    };
  }

  // ─── AGENTS ────────────────────────────────────────────────

  getAgentCost(state: GameState, agentId: string): number {
    const def = AGENTS.find(a => a.id === agentId)!;
    const count = state.agents[agentId]?.count ?? 0;
    const base = def.baseCost * Math.pow(def.costMultiplier, count);
    const reduction = this.getReputationAgentDiscount(state);
    return base * (1 - reduction);
  }

  canBuyAgent(state: GameState, agentId: string): boolean {
    return this.isAgentAvailable(state, agentId) && state.currency >= this.getAgentCost(state, agentId);
  }

  buyAgent(state: GameState, agentId: string): GameState {
    if (!this.canBuyAgent(state, agentId)) return state;
    const cost = this.getAgentCost(state, agentId);
    return {
      ...state,
      currency: state.currency - cost,
      agents: {
        ...state.agents,
        [agentId]: { count: (state.agents[agentId]?.count ?? 0) + 1 },
      },
    };
  }

  /** Coût cumulé de `n` agents achetés d'affilée (série géométrique du prix). */
  getAgentBulkCost(state: GameState, agentId: string, n: number): number {
    if (n <= 0) return 0;
    const def = AGENTS.find(a => a.id === agentId)!;
    const first = this.getAgentCost(state, agentId);
    const m = def.costMultiplier;
    return m === 1 ? first * n : first * (Math.pow(m, n) - 1) / (m - 1);
  }

  /** Nombre d'agents qu'on peut acheter d'affilée avec la trésorerie actuelle (plafonné). */
  getAffordableAgentCount(state: GameState, agentId: string): number {
    if (!this.isAgentAvailable(state, agentId)) return 0;
    const def = AGENTS.find(a => a.id === agentId)!;
    let price = this.getAgentCost(state, agentId);
    let budget = state.currency;
    let n = 0;
    while (n < MAX_BULK_BUY && budget >= price) {
      budget -= price;
      price *= def.costMultiplier;
      n++;
    }
    return n;
  }

  /** Achète jusqu'à `n` agents, un par un (chaque achat est validé comme un achat simple). */
  buyAgents(state: GameState, agentId: string, n: number): GameState {
    let next = state;
    for (let i = 0; i < Math.min(n, MAX_BULK_BUY); i++) {
      const after = this.buyAgent(next, agentId);
      if (after === next) break;
      next = after;
    }
    return next;
  }

  // ─── UPGRADES ──────────────────────────────────────────────

  isUpgradeVisible(state: GameState, upgradeId: string): boolean {
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    if (state.prestigeCount < (def.minPrestige ?? 0)) return false; // invisible avant le prestige requis
    if (!def.requiresAgentId) return true;
    const count = state.agents[def.requiresAgentId]?.count ?? 0;
    return count >= (def.requiresAgentCount ?? 1);
  }

  canBuyUpgrade(state: GameState, upgradeId: string): boolean {
    if (state.upgradesPurchased[upgradeId]) return false;
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    return state.currency >= def.cost && this.isUpgradeVisible(state, upgradeId);
  }

  buyUpgrade(state: GameState, upgradeId: string): GameState {
    if (!this.canBuyUpgrade(state, upgradeId)) return state;
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    return {
      ...state,
      currency: state.currency - def.cost,
      upgradesPurchased: { ...state.upgradesPurchased, [upgradeId]: true },
    };
  }

  // ─── TICK ──────────────────────────────────────────────────

  tick(state: GameState, deltaSeconds: number, marketMult = 1): { state: GameState; result: TickResult } {
    const rate = this.getTotalRate(state, marketMult);
    const earned = rate * deltaSeconds;
    const prevClientStates = { ...state.clientsUnlocked };

    // Unlock clients automatically — sur la production des agents seuls
    const agentRate = this.getAgentRate(state);
    const newClientStates = { ...state.clientsUnlocked };
    CLIENTS.forEach(c => {
      if (!newClientStates[c.id] && agentRate >= c.unlockRateRequired && state.prestigeCount >= (c.minPrestige ?? 0)) {
        newClientStates[c.id] = true;
      }
    });

    const newClients = CLIENTS
      .filter(c => newClientStates[c.id] && !prevClientStates[c.id])
      .map(c => c.id);

    const newState: GameState = {
      ...this.earn(state, earned),
      clientsUnlocked: newClientStates,
    };

    return { state: newState, result: { newClients } };
  }

  // ─── OFFLINE ───────────────────────────────────────────────

  applyOfflineEarnings(state: GameState, seconds: number): { state: GameState; earned: number } {
    const capped = Math.min(seconds, MAX_OFFLINE_HOURS * 3600);
    const rate = this.getTotalRate(state);
    const offlineRate = this.getReputationOfflineRate(state);
    const earned = Math.min(rate * capped * offlineRate, MAX_AMOUNT);
    if (!(earned > 0)) return { state, earned: 0 };
    return { state: this.earn(state, earned), earned };
  }

  // ─── PRESTIGE ──────────────────────────────────────────────

  getPrestigeThreshold(state: GameState): number {
    return Math.round(PRESTIGE_BASE * Math.pow(PRESTIGE_SCALE, state.prestigeCount));
  }

  canPrestige(state: GameState): boolean {
    return state.totalEarned >= this.getPrestigeThreshold(state);
  }

  getPrestigeProgress(state: GameState): number {
    return Math.min(state.totalEarned / this.getPrestigeThreshold(state), 1);
  }

  /** RP gagnés en vendant maintenant (au minimum ceux du seuil, tant qu'il n'est pas atteint). */
  getPrestigeRP(state: GameState): number {
    const runEarned = Math.max(state.totalEarned, this.getPrestigeThreshold(state));
    return getPrestigeRP(runEarned, PRESTIGE_BASE);
  }

  prestige(state: GameState): GameState {
    if (!this.canPrestige(state)) return state;
    const newPrestigeCount = state.prestigeCount + 1;
    const earnedRP         = this.getPrestigeRP(state);
    const startBonus       = this.getReputationStartBonus(state);

    // Agents, clients et améliorations repartent de zéro, avec tous les ids de la config
    // (y compris ceux des nouveaux marchés) ; seule la réputation survit.
    const blank = createInitialState();
    const fresh: GameState = {
      currency:          startBonus,
      totalEarned:       startBonus,
      prestigeCount:     newPrestigeCount,
      agents:            blank.agents,
      clientsUnlocked:   blank.clientsUnlocked,
      upgradesPurchased: blank.upgradesPurchased,
      lastSave:          Date.now(),
      // Réputation : survit au prestige
      reputationPoints:    (state.reputationPoints ?? 0) + earnedRP,
      reputationPurchased: { ...(state.reputationPurchased ?? {}) },
    };
    return fresh;
  }

  // ─── RÉPUTATION ────────────────────────────────────────────

  hasRepPerk(state: GameState, perkId: string): boolean {
    return !!(state.reputationPurchased?.[perkId]);
  }

  canBuyRepPerk(state: GameState, perkId: string): boolean {
    const perk = REPUTATION_PERKS.find(p => p.id === perkId);
    if (!perk || this.hasRepPerk(state, perkId)) return false;
    return (state.reputationPoints ?? 0) >= perk.cost;
  }

  buyRepPerk(state: GameState, perkId: string): GameState {
    if (!this.canBuyRepPerk(state, perkId)) return state;
    const perk = REPUTATION_PERKS.find(p => p.id === perkId)!;
    return {
      ...state,
      reputationPoints: (state.reputationPoints ?? 0) - perk.cost,
      reputationPurchased: { ...(state.reputationPurchased ?? {}), [perkId]: true },
    };
  }

  getReputationIncomeMult(state: GameState): number {
    const expertise = this.hasRepPerk(state, 'rep-income-x125') ? 1.25 : 1;
    return expertise * (1 + NOTORIETE_INCOME_PER_LEVEL * this.getNotorieteLevel(state));
  }

  // ─── NOTORIÉTÉ ─────────────────────────────────────────────

  /** Niveau de Notoriété : nombre de clés `rep-notoriete-<n>` achetées. */
  getNotorieteLevel(state: GameState): number {
    return NOTORIETE_IDS.filter(id => state.reputationPurchased?.[id]).length;
  }

  /** La Notoriété s'ouvre une fois tous les bonus de réputation de base acquis. */
  isNotorieteOpen(state: GameState): boolean {
    return REPUTATION_PERKS.every(p => this.hasRepPerk(state, p.id));
  }

  /** Coût en RP du prochain niveau de Notoriété (Infinity au dernier niveau). */
  getNextNotorieteCost(state: GameState): number {
    const level = this.getNotorieteLevel(state);
    return level >= NOTORIETE_MAX_LEVEL ? Infinity : getNotorieteCost(level + 1);
  }

  canBuyNotoriete(state: GameState): boolean {
    return this.isNotorieteOpen(state) && (state.reputationPoints ?? 0) >= this.getNextNotorieteCost(state);
  }

  buyNotoriete(state: GameState): GameState {
    if (!this.canBuyNotoriete(state)) return state;
    const next = NOTORIETE_IDS.find(id => !state.reputationPurchased?.[id])!;
    return {
      ...state,
      reputationPoints: (state.reputationPoints ?? 0) - this.getNextNotorieteCost(state),
      reputationPurchased: { ...(state.reputationPurchased ?? {}), [next]: true },
    };
  }

  getReputationClickMult(state: GameState): number {
    return this.hasRepPerk(state, 'rep-click-x2') ? 2 : 1;
  }

  getReputationAgentDiscount(state: GameState): number {
    return this.hasRepPerk(state, 'rep-agent-discount') ? 0.2 : 0;
  }

  getReputationOfflineRate(state: GameState): number {
    return this.hasRepPerk(state, 'rep-offline-rate') ? 0.75 : 0.5;
  }

  getReputationStartBonus(state: GameState): number {
    return this.hasRepPerk(state, 'rep-start-bonus') ? 2_000 : 0;
  }

  getReputationContractBonus(state: GameState): number {
    return this.hasRepPerk(state, 'rep-contract-bonus') ? 1.25 : 1;
  }

  getReputationExtraSlot(state: GameState): boolean {
    return this.hasRepPerk(state, 'rep-contract-slot');
  }

  getReputationEchoCooldownMult(state: GameState): number {
    return this.hasRepPerk(state, 'rep-echo-boost') ? 0.5 : 1;
  }

  // ─── STATS ─────────────────────────────────────────────────

  getTotalAgentCount(state: GameState): number {
    return Object.values(state.agents).reduce((acc, a) => acc + a.count, 0);
  }

  getUnlockedClientCount(state: GameState): number {
    return Object.values(state.clientsUnlocked).filter(Boolean).length;
  }

  getPurchasedUpgradeCount(state: GameState): number {
    return Object.values(state.upgradesPurchased).filter(Boolean).length;
  }
}
