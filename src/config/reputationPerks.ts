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

/** RP gagnés au prochain prestige (avant de prestige) */
export function getPrestigeRP(_prestigeCount: number): number {
  return 3; // flat — simple et prévisible
}
