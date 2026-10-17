export interface AgentDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseCost: number;
  baseProduction: number; // €/s par unité
  costMultiplier: number;
}

/**
 * Paliers d'équipe : chaque type d'agent produit ×TEAM_TIER_MULT à chacun de ces effectifs
 * (×5,06 au maximum). Calculés à partir du nombre d'agents : rien n'est sauvegardé.
 */
export const TEAM_TIERS: readonly number[] = [25, 50, 100, 200];
export const TEAM_TIER_MULT = 1.5;

/** Nombre de paliers d'équipe atteints avec `count` agents d'un type (0 à TEAM_TIERS.length). */
export function getTeamTier(count: number): number {
  return TEAM_TIERS.filter(th => count >= th).length;
}

/** Multiplicateur de production d'un type d'agent dû à ses paliers d'équipe. */
export function getTeamTierMultiplier(count: number): number {
  return Math.pow(TEAM_TIER_MULT, getTeamTier(count));
}

/** Effectif du prochain palier, ou null si le dernier est atteint. */
export function getNextTeamTier(count: number): number | null {
  return TEAM_TIERS.find(th => count < th) ?? null;
}

export const AGENTS: AgentDef[] = [
  {
    id: 'bot-workflows',
    name: 'Bot Workflows',
    description: 'Automatise les tâches répétitives via n8n',
    icon: '🤖',
    baseCost: 10,
    baseProduction: 0.15,     // était 0.1
    costMultiplier: 1.13,     // était 1.15
  },
  {
    id: 'agent-copy',
    name: 'Agent Copy',
    description: 'Génère du contenu marketing en continu',
    icon: '✍️',
    baseCost: 75,
    baseProduction: 0.8,      // était 0.5
    costMultiplier: 1.13,
  },
  {
    id: 'agent-analytics',
    name: 'Agent Analytics',
    description: 'Analyse les données et optimise les performances',
    icon: '📊',
    baseCost: 500,
    baseProduction: 3.5,      // était 2
    costMultiplier: 1.13,
  },
  {
    id: 'agent-audit',
    name: 'Agent Audit',
    description: 'Audite les projets clients, débloque les grands comptes',
    icon: '🔍',
    baseCost: 3_000,
    baseProduction: 18,       // était 8
    costMultiplier: 1.13,
  },
  {
    id: 'agent-legal',
    name: 'Agent Légal',
    description: 'CGV, RGPD, conformité — ouvre les marchés publics',
    icon: '⚖️',
    baseCost: 20_000,
    baseProduction: 60,       // était 25
    costMultiplier: 1.13,
  },
  {
    id: 'agent-growth',
    name: 'Agent Growth',
    description: 'Cold outreach, partenariats, distribution à grande échelle',
    icon: '🚀',
    baseCost: 150_000,
    baseProduction: 200,      // était 80
    costMultiplier: 1.13,
  },
  {
    id: 'agent-supervisor',
    name: 'Agent Supervisor',
    description: 'Orchestre tous les agents à grande échelle',
    icon: '🎯',
    baseCost: 1_000_000,
    baseProduction: 800,      // était 300
    costMultiplier: 1.13,
  },
];
