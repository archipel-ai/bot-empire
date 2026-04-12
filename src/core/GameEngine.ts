import { GameState } from './GameState.ts';
import { AGENTS, AgentDef } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';

const PRESTIGE_THRESHOLD = 1_000_000;
const PRESTIGE_BONUS_PER_LEVEL = 0.15;
const BASE_CLICK_VALUE = 0.1;
const MAX_OFFLINE_HOURS = 8;

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

  getTotalRate(state: GameState): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    const clientBonus = this.getClientBonus(state);
    const globalMult = this.getGlobalUpgradeMultiplier(state);
    const prestigeMult = this.getPrestigeMultiplier(state);
    return (agentProd + clientBonus) * globalMult * prestigeMult;
  }

  // ─── CLIC ──────────────────────────────────────────────────

  getClickValue(state: GameState): number {
    const clickMult = UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'click_multiplier' ? u.effect.multiplier : 1);
    }, 1);
    const prestigeMult = this.getPrestigeMultiplier(state);
    return BASE_CLICK_VALUE * clickMult * prestigeMult;
  }

  click(state: GameState): GameState {
    const value = this.getClickValue(state);
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
    return def.baseCost * Math.pow(def.costMultiplier, count);
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

  tick(state: GameState, deltaSeconds: number): { state: GameState; result: TickResult } {
    const rate = this.getTotalRate(state);
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
    // Offline = 50% de la production normale (équilibre)
    const earned = rate * capped * 0.5;
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

  canPrestige(state: GameState): boolean {
    return state.totalEarned >= PRESTIGE_THRESHOLD;
  }

  getPrestigeProgress(state: GameState): number {
    return Math.min(state.totalEarned / PRESTIGE_THRESHOLD, 1);
  }

  prestige(state: GameState): GameState {
    if (!this.canPrestige(state)) return state;
    const newPrestigeCount = state.prestigeCount + 1;
    // Reset total — on garde seulement le compteur prestige
    const fresh: GameState = {
      currency: 0,
      totalEarned: 0,
      prestigeCount: newPrestigeCount,
      agents: Object.fromEntries(Object.keys(state.agents).map(id => [id, { count: 0 }])),
      clientsUnlocked: Object.fromEntries(Object.keys(state.clientsUnlocked).map(id => [id, false])),
      upgradesPurchased: Object.fromEntries(Object.keys(state.upgradesPurchased).map(id => [id, false])),
      lastSave: Date.now(),
    };
    return fresh;
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
