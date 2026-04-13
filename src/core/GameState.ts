import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { REPUTATION_PERKS } from '../config/reputationPerks.ts';

export interface AgentState {
  count: number;
}

export interface GameState {
  currency: number;
  totalEarned: number;
  prestigeCount: number;
  agents: Record<string, AgentState>;
  clientsUnlocked: Record<string, boolean>;
  upgradesPurchased: Record<string, boolean>;
  lastSave: number;
  // Réputation (survit au prestige)
  reputationPoints:    number;
  reputationPurchased: Record<string, boolean>;
}

export function createInitialState(): GameState {
  const agents: Record<string, AgentState> = {};
  AGENTS.forEach(a => { agents[a.id] = { count: 0 }; });

  const clientsUnlocked: Record<string, boolean> = {};
  CLIENTS.forEach(c => { clientsUnlocked[c.id] = false; });

  const upgradesPurchased: Record<string, boolean> = {};
  UPGRADES.forEach(u => { upgradesPurchased[u.id] = false; });

  const reputationPurchased: Record<string, boolean> = {};
  REPUTATION_PERKS.forEach(p => { reputationPurchased[p.id] = false; });

  return {
    currency: 0,
    totalEarned: 0,
    prestigeCount: 0,
    agents,
    clientsUnlocked,
    upgradesPurchased,
    lastSave: Date.now(),
    reputationPoints: 0,
    reputationPurchased,
  };
}
