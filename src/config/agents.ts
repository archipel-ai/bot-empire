export interface AgentDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseCost: number;
  baseProduction: number; // €/s par unité
  costMultiplier: number;
}

export const AGENTS: AgentDef[] = [
  {
    id: 'bot-workflows',
    name: 'Bot Workflows',
    description: 'Automatise les tâches répétitives via n8n',
    icon: '🤖',
    baseCost: 10,
    baseProduction: 0.1,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-copy',
    name: 'Agent Copy',
    description: 'Génère du contenu marketing en continu',
    icon: '✍️',
    baseCost: 75,
    baseProduction: 0.5,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-analytics',
    name: 'Agent Analytics',
    description: 'Analyse les données et optimise les performances',
    icon: '📊',
    baseCost: 500,
    baseProduction: 2,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-audit',
    name: 'Agent Audit',
    description: 'Audite les projets clients, débloque les grands comptes',
    icon: '🔍',
    baseCost: 3_000,
    baseProduction: 8,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-legal',
    name: 'Agent Légal',
    description: 'CGV, RGPD, conformité — ouvre les marchés publics',
    icon: '⚖️',
    baseCost: 20_000,
    baseProduction: 25,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-growth',
    name: 'Agent Growth',
    description: 'Cold outreach, partenariats, distribution à grande échelle',
    icon: '🚀',
    baseCost: 150_000,
    baseProduction: 80,
    costMultiplier: 1.15,
  },
  {
    id: 'agent-supervisor',
    name: 'Agent Supervisor',
    description: 'Orchestre tous les agents — multiplicateur global ×2',
    icon: '🎯',
    baseCost: 1_000_000,
    baseProduction: 300,
    costMultiplier: 1.15,
  },
];
