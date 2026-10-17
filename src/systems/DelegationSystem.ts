/**
 * DelegationSystem — le fauteuil vide : l'agence rachète seule ses agents.
 * Débloquée par l'arbre de l'Academy (« Déléguer, garder la main » : niveau I, après une vente ;
 * « Orchestrer plusieurs agents » : niveau II, après deux ventes).
 *  - I  : les 4 premiers métiers (Workflows, Copy, Analytics, Audit) ;
 *  - II : tous les métiers disponibles, plus les améliorations.
 * Une passe par seconde : l'agent le moins cher est acheté, encore et encore, tant que le total
 * dépensé pendant la passe reste sous le plus petit de deux plafonds : 10 % de la trésorerie, et
 * la moitié du revenu d'une seconde. La Délégation ne dépense donc jamais l'épargne du joueur :
 * sa trésorerie continue de monter d'au moins la moitié de son revenu. Rien ne se passe hors ligne.
 * Réglages (interrupteur général, un par métier, améliorations) en localStorage : purement locaux.
 */

import type { GameState } from '../core/GameState.ts';
import type { GameEngine } from '../core/GameEngine.ts';
import { AGENTS } from '../config/agents.ts';
import { UPGRADES } from '../config/upgrades.ts';

export const DELEGATION_BUDGET_SHARE = 0.10;  // part de la trésorerie dépensable par passe
export const DELEGATION_INCOME_SHARE = 0.5;   // part du revenu d'une passe que la Délégation peut dépenser
export const DELEGATION_LEVEL1_AGENTS = 4;    // niveau I : les 4 premiers métiers
export const DELEGATION_PERIOD_S = 1;         // une passe par seconde
const MAX_BUYS_PER_PASS = 50;                 // garde-fou
const SETTINGS_KEY = 'bot-empire-delegation';

export interface DelegationSettings {
  enabled:  boolean;                  // interrupteur général
  agents:   Record<string, boolean>;  // par métier (absent : activé)
  upgrades: boolean;                  // niveau II : améliorations
}

export interface DelegationResult {
  state:    GameState;
  agents:   string[];  // un identifiant par agent acheté, dans l'ordre
  upgrades: string[];
}

export function defaultDelegationSettings(): DelegationSettings {
  return { enabled: true, agents: {}, upgrades: true };
}

/** Métiers que la Délégation peut recruter à ce niveau (avant les interrupteurs). */
export function getDelegableAgentIds(level: number): string[] {
  if (level <= 0) return [];
  return (level >= 2 ? AGENTS : AGENTS.slice(0, DELEGATION_LEVEL1_AGENTS)).map(a => a.id);
}

/**
 * Une passe de Délégation. Fonction pure : renvoie le nouvel état et ce qui a été acheté.
 * `level` vient de `engine.getDelegationLevel(state)`.
 */
export function runDelegation(engine: GameEngine, state: GameState, level: number, settings: DelegationSettings): DelegationResult {
  const result: DelegationResult = { state, agents: [], upgrades: [] };
  if (level <= 0 || !settings.enabled) return result;
  let budget = Math.min(
    state.currency * DELEGATION_BUDGET_SHARE,
    engine.getTotalRate(state) * DELEGATION_PERIOD_S * DELEGATION_INCOME_SHARE,
  );
  const ids = getDelegableAgentIds(level).filter(id => settings.agents[id] !== false);
  let s = state;
  for (let i = 0; i < MAX_BUYS_PER_PASS; i++) {
    let pick: string | null = null;
    let pickCost = Infinity;
    for (const id of ids) {
      if (!engine.isAgentAvailable(s, id)) continue;
      const cost = engine.getAgentCost(s, id);
      if (cost <= budget && cost < pickCost) { pick = id; pickCost = cost; }
    }
    if (!pick) break;
    const next = engine.buyAgent(s, pick);
    if (next === s) break;
    budget -= pickCost;
    s = next;
    result.agents.push(pick);
  }
  if (level >= 2 && settings.upgrades) {
    const affordable = UPGRADES
      .filter(u => !s.upgradesPurchased[u.id] && engine.isUpgradeVisible(s, u.id))
      .sort((a, b) => a.cost - b.cost);
    for (const u of affordable) {
      if (u.cost > budget) break;
      const next = engine.buyUpgrade(s, u.id);
      if (next === s) continue;
      budget -= u.cost;
      s = next;
      result.upgrades.push(u.id);
    }
  }
  result.state = s;
  return result;
}

export function loadDelegationSettings(): DelegationSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultDelegationSettings();
    const p = JSON.parse(raw) as Partial<DelegationSettings>;
    const agents: Record<string, boolean> = {};
    if (p.agents && typeof p.agents === 'object') {
      for (const [id, v] of Object.entries(p.agents)) if (typeof v === 'boolean') agents[id] = v;
    }
    return { enabled: p.enabled !== false, agents, upgrades: p.upgrades !== false };
  } catch { return defaultDelegationSettings(); }
}

export function saveDelegationSettings(settings: DelegationSettings): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
  catch { /* stockage indisponible : réglages perdus au rechargement, sans gravité */ }
}
