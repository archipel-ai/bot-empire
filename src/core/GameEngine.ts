import { GameState } from './GameState.ts';
import { AGENTS, AgentDef } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { REPUTATION_PERKS, getPrestigeRP } from '../config/reputationPerks.ts';

const PRESTIGE_BASE           = 750_000;
const PRESTIGE_SCALE          = 2.0;  // ×2 par prestige
const PRESTIGE_BONUS_PER_LEVEL = 0.15;
const BASE_CLICK_VALUE         = 0.1;
const MAX_OFFLINE_HOURS        = 8;

export interface TickResult {
  newClients: string[];
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

  getAgentProduction(state: GameState, def: AgentDef): number {
    const count = state.agents[def.id]?.count ?? 0;
    if (count === 0) return 0;
    const agentMult = this.getAgentMultiplier(state, def.id);
    return def.baseProduction * count * agentMult;
  }

  getClientBonus(state: GameState): number {
    return CLIENTS.filter(c => state.clientsUnlocked[c.id])
      .reduce((acc, c) => acc + c.bonusPerSecond, 0);
  }

  getTotalRate(state: GameState, marketMult = 1): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    const clientBonus   = this.getClientBonus(state);
    const globalMult    = this.getGlobalUpgradeMultiplier(state);
    const prestigeMult  = this.getPrestigeMultiplier(state);
    const repMult       = this.getReputationIncomeMult(state);
    return (agentProd + clientBonus) * globalMult * prestigeMult * repMult * marketMult;
  }

  // ─── CLIC ──────────────────────────────────────────────────

  getClickValue(state: GameState, marketClickMult = 1): number {
    const clickMult = UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'click_multiplier' ? u.effect.multiplier : 1);
    }, 1);
    const prestigeMult = this.getPrestigeMultiplier(state);
    const repClickMult = this.getReputationClickMult(state);
    return BASE_CLICK_VALUE * clickMult * prestigeMult * repClickMult * marketClickMult;
  }

  click(state: GameState, marketClickMult = 1): GameState {
    const value = this.getClickValue(state, marketClickMult);
    return {
      ...state,
      currency: state.currency + value,
      totalEarned: state.totalEarned + value,
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
    return state.currency >= this.getAgentCost(state, agentId);
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

  // ─── UPGRADES ──────────────────────────────────────────────

  isUpgradeVisible(state: GameState, upgradeId: string): boolean {
    const def = UPGRADES.find(u => u.id === upgradeId)!;
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

    // Unlock clients automatically
    const newClientStates = { ...state.clientsUnlocked };
    CLIENTS.forEach(c => {
      if (!newClientStates[c.id] && rate >= c.unlockRateRequired) {
        newClientStates[c.id] = true;
      }
    });

    const newClients = CLIENTS
      .filter(c => newClientStates[c.id] && !prevClientStates[c.id])
      .map(c => c.id);

    const newState: GameState = {
      ...state,
      currency: state.currency + earned,
      totalEarned: state.totalEarned + earned,
      clientsUnlocked: newClientStates,
    };

    return { state: newState, result: { newClients } };
  }

  // ─── OFFLINE ───────────────────────────────────────────────

  applyOfflineEarnings(state: GameState, seconds: number): { state: GameState; earned: number } {
    const capped = Math.min(seconds, MAX_OFFLINE_HOURS * 3600);
    const rate = this.getTotalRate(state);
    const offlineRate = this.getReputationOfflineRate(state);
    const earned = rate * capped * offlineRate;
    if (earned <= 0) return { state, earned: 0 };
    return {
      state: {
        ...state,
        currency: state.currency + earned,
        totalEarned: state.totalEarned + earned,
      },
      earned,
    };
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

  getPrestigeRP(state: GameState): number {
    return getPrestigeRP(state.prestigeCount);
  }

  prestige(state: GameState): GameState {
    if (!this.canPrestige(state)) return state;
    const newPrestigeCount = state.prestigeCount + 1;
    const earnedRP         = this.getPrestigeRP(state);
    const startBonus       = this.getReputationStartBonus(state);

    const fresh: GameState = {
      currency:          startBonus,
      totalEarned:       startBonus,
      prestigeCount:     newPrestigeCount,
      agents:            Object.fromEntries(Object.keys(state.agents).map(id => [id, { count: 0 }])),
      clientsUnlocked:   Object.fromEntries(Object.keys(state.clientsUnlocked).map(id => [id, false])),
      upgradesPurchased: Object.fromEntries(Object.keys(state.upgradesPurchased).map(id => [id, false])),
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
    return this.hasRepPerk(state, 'rep-income-x125') ? 1.25 : 1;
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
