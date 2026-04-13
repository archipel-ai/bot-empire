export interface MarketEventDef {
  id: string;
  name: string;
  icon: string;
  description: string;
  effect: {
    type: 'income' | 'click';
    multiplier: number;
  };
  durationMin: number; // durée en minutes
}

export const MARKET_EVENTS: MarketEventDef[] = [
  {
    id: 'chatgpt-outage',
    name: 'ChatGPT en panne',
    icon: '🔥',
    description: 'Les clients fuient vers votre agence — revenus doublés !',
    effect: { type: 'income', multiplier: 2.0 },
    durationMin: 5,
  },
  {
    id: 'new-model-launch',
    name: 'Lancement GPT-Next',
    icon: '🚀',
    description: 'L\'engouement IA mondial booste vos contrats.',
    effect: { type: 'income', multiplier: 1.5 },
    durationMin: 8,
  },
  {
    id: 'eu-regulation',
    name: 'Régulation IA UE',
    icon: '⚖️',
    description: 'Les nouvelles règles européennes ralentissent le marché.',
    effect: { type: 'income', multiplier: 0.6 },
    durationMin: 6,
  },
  {
    id: 'linkedin-viral',
    name: 'Post LinkedIn viral',
    icon: '📱',
    description: 'Votre agence buzze — la valeur de chaque clic est triplée !',
    effect: { type: 'click', multiplier: 3.0 },
    durationMin: 5,
  },
  {
    id: 'vc-interest',
    name: 'Intérêt des investisseurs',
    icon: '💰',
    description: 'Les VCs regardent votre secteur. Revenus +80%.',
    effect: { type: 'income', multiplier: 1.8 },
    durationMin: 7,
  },
  {
    id: 'competitor-down',
    name: 'Concurrent en faillite',
    icon: '📉',
    description: 'Leurs clients cherchent une alternative — c\'est vous !',
    effect: { type: 'income', multiplier: 1.7 },
    durationMin: 8,
  },
  {
    id: 'ai-winter',
    name: 'Hiver IA médiatique',
    icon: '❄️',
    description: 'La presse se retourne contre l\'IA. Revenus en baisse.',
    effect: { type: 'income', multiplier: 0.5 },
    durationMin: 5,
  },
  {
    id: 'tech-conference',
    name: 'VivaTech Paris',
    icon: '🎪',
    description: 'Vous êtes speaker — leads entrants en hausse.',
    effect: { type: 'income', multiplier: 1.6 },
    durationMin: 6,
  },
  {
    id: 'data-scandal',
    name: 'Scandale données IA',
    icon: '😱',
    description: 'La méfiance envers l\'IA touche votre agence aussi.',
    effect: { type: 'income', multiplier: 0.7 },
    durationMin: 6,
  },
  {
    id: 'automation-wave',
    name: 'Vague Automation',
    icon: '🌊',
    description: 'Toutes les PME veulent s\'automatiser maintenant !',
    effect: { type: 'income', multiplier: 2.0 },
    durationMin: 8,
  },
  {
    id: 'claude-launch',
    name: 'Nouveau modèle Claude',
    icon: '⬡',
    description: 'La puissance du modèle décuple vos performances.',
    effect: { type: 'click', multiplier: 2.0 },
    durationMin: 7,
  },
  {
    id: 'budget-cut',
    name: 'Compressions budgétaires',
    icon: '✂️',
    description: 'Vos clients coupent leurs budgets IT. Revenus réduits.',
    effect: { type: 'income', multiplier: 0.65 },
    durationMin: 5,
  },
  {
    id: 'startup-boom',
    name: 'Boom des startups',
    icon: '🦄',
    description: 'L\'écosystème startup explose — vos prospects aussi.',
    effect: { type: 'income', multiplier: 1.5 },
    durationMin: 7,
  },
  {
    id: 'harvard-study',
    name: 'Étude Harvard : +40% productivité',
    icon: '📊',
    description: 'Une étude valide votre ROI. Les contrats arrivent vite.',
    effect: { type: 'income', multiplier: 1.4 },
    durationMin: 8,
  },
  {
    id: 'gpu-costs',
    name: 'Explosion des coûts GPU',
    icon: '💸',
    description: 'Les marges fondent avec la hausse des coûts d\'inférence.',
    effect: { type: 'income', multiplier: 0.75 },
    durationMin: 6,
  },
];
