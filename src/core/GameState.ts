import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { REPUTATION_PERKS, NOTORIETE_IDS, PRESTIGE_V2_KEY } from '../config/reputationPerks.ts';
import { ACADEMY_IDS } from '../config/academy.ts';

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
  NOTORIETE_IDS.forEach(id => { reputationPurchased[id] = false; });
  // Indispensable : une clé non déclarée ici est effacée par sanitizeState au chargement
  reputationPurchased[PRESTIGE_V2_KEY] = false;
  ACADEMY_IDS.forEach(id => { reputationPurchased[id] = false; }); // leçons de l'Academy (acad-*)

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

/**
 * Plafond de tout montant (argent, gains) : bien en dessous de Number.MAX_VALUE, pour qu'aucun
 * calcul ne déborde en Infinity. Une valeur infinie ne survit pas à JSON (elle devient null) :
 * sans ce plafond, une partie très avancée repartirait à 0 € au rechargement.
 */
export const MAX_AMOUNT = 1e300;

/** Nombre positif, plafonné à MAX_AMOUNT (un nombre trop grand est ramené au plafond, pas à 0). */
const num = (v: unknown, fallback = 0): number =>
  typeof v === 'number' && !Number.isNaN(v) && v >= 0 ? Math.min(v, MAX_AMOUNT) : fallback;

const obj = (v: unknown): Record<string, unknown> =>
  v !== null && typeof v === 'object' ? v as Record<string, unknown> : {};

/**
 * Reconstruit un état sûr à partir d'une sauvegarde non fiable (localStorage, fichier importé,
 * lien #save=, cloud). Seules les clés connues sont reprises, avec leur type : un nombre positif
 * (plafonné à MAX_AMOUNT), un booléen strict. Tout le reste retombe sur la valeur initiale.
 */
export function sanitizeState(raw: unknown): GameState {
  const p = obj(raw);
  const s = createInitialState();
  const agents = obj(p.agents);
  for (const id of Object.keys(s.agents)) s.agents[id] = { count: Math.floor(num(obj(agents[id]).count)) };
  const flags = (target: Record<string, boolean>, src: unknown) => {
    const o = obj(src);
    for (const id of Object.keys(target)) target[id] = o[id] === true;
  };
  flags(s.clientsUnlocked, p.clientsUnlocked);
  flags(s.upgradesPurchased, p.upgradesPurchased);
  flags(s.reputationPurchased, p.reputationPurchased);
  s.currency         = num(p.currency);
  s.totalEarned      = num(p.totalEarned);
  s.prestigeCount    = Math.floor(num(p.prestigeCount));
  s.reputationPoints = Math.floor(num(p.reputationPoints));
  s.lastSave         = num(p.lastSave, s.lastSave);
  return s;
}
