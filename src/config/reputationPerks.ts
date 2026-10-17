export type ReputationEffect =
  | { type: 'extra_contract_slot' }
  | { type: 'contract_reward_bonus'; multiplier: number }
  | { type: 'click_multiplier';      multiplier: number }
  | { type: 'agent_cost_reduction';  reduction:  number }  // 0.2 = -20%
  | { type: 'offline_rate';          rate:        number }  // 0.75 au lieu de 0.5
  | { type: 'start_bonus';           amount:      number }  // €€ au démarrage
  | { type: 'echo_cooldown';         reduction:   number }  // 0.5 = ÷2
  | { type: 'income_multiplier';     multiplier: number };

export interface ReputationPerk {
  id:          string;
  name:        string;
  icon:        string;
  description: string;
  cost:        number;  // points de réputation
  effect:      ReputationEffect;
}

export const REPUTATION_PERKS: ReputationPerk[] = [
  {
    id: 'rep-start-bonus',
    name: 'Capital de départ',
    icon: '💳',
    description: 'Commencez chaque prestige avec 2 000 € en poche.',
    cost: 2,
    effect: { type: 'start_bonus', amount: 2_000 },
  },
  {
    id: 'rep-click-x2',
    name: 'Expert reconnu',
    icon: '⚡',
    description: 'Vos tâches manuelles valent 2× plus.',
    cost: 2,
    effect: { type: 'click_multiplier', multiplier: 2 },
  },
  {
    id: 'rep-contract-slot',
    name: 'Réputation établie',
    icon: '📋',
    description: '4ème slot de contrat débloqué en permanence.',
    cost: 3,
    effect: { type: 'extra_contract_slot' },
  },
  {
    id: 'rep-contract-bonus',
    name: 'Marges premium',
    icon: '💎',
    description: 'Récompenses de tous les contrats +25%.',
    cost: 3,
    effect: { type: 'contract_reward_bonus', multiplier: 1.25 },
  },
  {
    id: 'rep-offline-rate',
    name: 'Production continue',
    icon: '🌙',
    description: 'Revenus offline passent de 50% à 75%.',
    cost: 4,
    effect: { type: 'offline_rate', rate: 0.75 },
  },
  {
    id: 'rep-agent-discount',
    name: "Réseau d'élite",
    icon: '🤝',
    description: 'Coût de tous les agents réduit de 20%.',
    cost: 5,
    effect: { type: 'agent_cost_reduction', reduction: 0.2 },
  },
  {
    id: 'rep-echo-boost',
    name: 'Rythme de croisière',
    icon: '↺',
    description: 'Cooldown du mode ÉCHO divisé par 2.',
    cost: 5,
    effect: { type: 'echo_cooldown', reduction: 0.5 },
  },
  {
    id: 'rep-income-x125',
    name: 'Expertise IA',
    icon: '🧠',
    description: 'Revenus de tous vos agents ×1.25 en permanence.',
    cost: 7,
    effect: { type: 'income_multiplier', multiplier: 1.25 },
  },
];

// ─── NOTORIÉTÉ : bonus à niveaux, sans plafond pratique ──────────
// Chaque niveau est une clé booléenne `rep-notoriete-<n>` de reputationPurchased : aucun champ
// de sauvegarde nouveau (les règles Firebase n'acceptent que de nouvelles clés dans ce dictionnaire).

export const NOTORIETE_PREFIX            = 'rep-notoriete-';
/** Niveaux possibles. Le 50e coûte 5 × 2^49 ≈ 2,8·10^15 RP : hors d'atteinte, donc « sans plafond ». */
export const NOTORIETE_MAX_LEVEL         = 50;
export const NOTORIETE_INCOME_PER_LEVEL  = 0.05; // +5 % de revenu par niveau
const NOTORIETE_BASE_COST                = 5;
const NOTORIETE_COST_GROWTH              = 2;    // le prix double à chaque niveau

/** Identifiants des niveaux de Notoriété, du 1er au dernier. */
export const NOTORIETE_IDS: readonly string[] =
  Array.from({ length: NOTORIETE_MAX_LEVEL }, (_, i) => `${NOTORIETE_PREFIX}${i + 1}`);

/** Coût en RP du niveau `level` (1 pour le premier) : 5, 10, 20, 40… */
export function getNotorieteCost(level: number): number {
  return Math.ceil(NOTORIETE_BASE_COST * Math.pow(NOTORIETE_COST_GROWTH, level - 1));
}

/** Clé de transition : posée à la 1re vente faite avec la formule 1.2 (tant qu'elle manque, le seuil 1.1 reste un plafond). */
export const PRESTIGE_V2_KEY = 'rep-seuil-v2';
const RP_BASE     = 3; // RP au seuil de la 1re vente
const RP_PER_SALE = 1; // +1 RP au seuil par vente déjà faite

/**
 * RP gagnés à la vente : (3 + ventes) × ∛(gains de la partie / seuil de la partie).
 * Au seuil, on gagne 3 + ventes ; gagner 8× plus que le seuil double les RP.
 */
export function getPrestigeRP(runEarned: number, threshold: number, prestigeCount: number): number {
  if (runEarned <= 0 || threshold <= 0) return 0;
  return Math.floor((RP_BASE + RP_PER_SALE * prestigeCount) * Math.cbrt(runEarned / threshold));
}
