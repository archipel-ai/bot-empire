export type UpgradeEffect =
  | { type: 'agent_multiplier'; agentId: string; multiplier: number }
  | { type: 'global_multiplier'; multiplier: number }
  | { type: 'click_multiplier'; multiplier: number };

export interface UpgradeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  effect: UpgradeEffect;
  effectLabel: string;
  requiresAgentId?: string;
  requiresAgentCount?: number;
}

export const UPGRADES: UpgradeDef[] = [
  {
    id: 'api-rate-x2',
    name: 'API Rate Limit ×2',
    description: 'Double la cadence de vos bots de workflows',
    icon: '⚡',
    cost: 150,              // était 200 — plus tôt accessible
    effect: { type: 'agent_multiplier', agentId: 'bot-workflows', multiplier: 2 },
    effectLabel: 'Bot Workflows ×2',
    requiresAgentId: 'bot-workflows',
    requiresAgentCount: 5,
  },
  {
    id: 'gpt5-integration',
    name: 'GPT-5 Integration',
    description: "L'Agent Copy génère du contenu de qualité supérieure",
    icon: '🧠',
    cost: 1_000,            // était 1 500
    effect: { type: 'agent_multiplier', agentId: 'agent-copy', multiplier: 3 },
    effectLabel: 'Agent Copy ×3',
    requiresAgentId: 'agent-copy',
    requiresAgentCount: 5,
  },
  {
    id: 'iso-certification',
    name: 'Certification ISO 27001',
    description: 'Vos audits sont deux fois plus valorisés',
    icon: '🛡️',
    cost: 8_000,            // était 10 000
    effect: { type: 'agent_multiplier', agentId: 'agent-audit', multiplier: 2 },
    effectLabel: 'Agent Audit ×2',
    requiresAgentId: 'agent-audit',
    requiresAgentCount: 3,
  },
  {
    id: 'click-boost',
    name: 'Automatisation du Clic',
    description: 'Chaque tâche manuelle rapporte 5× plus',
    icon: '🖱️',
    cost: 350,              // était 500
    effect: { type: 'click_multiplier', multiplier: 5 },
    effectLabel: 'Clic ×5',
  },
  {
    id: 'venture-round',
    name: 'Levée de Fonds Série A',
    description: "L'ensemble de l'agence tourne à plein régime",
    icon: '💰',
    cost: 30_000,           // était 50 000
    effect: { type: 'global_multiplier', multiplier: 1.5 },
    effectLabel: 'Toute production ×1.5',
    requiresAgentId: 'agent-legal',
    requiresAgentCount: 1,
  },
  {
    id: 'ai-sovereignty',
    name: 'IA Souveraine',
    description: "Votre agence devient une référence nationale de l'IA",
    icon: '👑',
    cost: 250_000,          // était 500 000
    effect: { type: 'global_multiplier', multiplier: 3 },
    effectLabel: 'Toute production ×3',
    requiresAgentId: 'agent-growth',
    requiresAgentCount: 5,
  },
  {
    id: 'n8n-enterprise',
    name: 'n8n Enterprise License',
    description: 'Les workflows tournent sans limits de vitesse',
    icon: '🔗',
    cost: 3_500,            // était 5 000
    effect: { type: 'agent_multiplier', agentId: 'bot-workflows', multiplier: 4 },
    effectLabel: 'Bot Workflows ×4',
    requiresAgentId: 'bot-workflows',
    requiresAgentCount: 15,
  },
  {
    id: 'mcp-protocol',
    name: 'Protocole MCP Full Stack',
    description: 'Tous vos agents communiquent en temps réel',
    icon: '🕸️',
    cost: 100_000,          // était 200 000
    effect: { type: 'global_multiplier', multiplier: 2 },
    effectLabel: 'Toute production ×2',
    requiresAgentId: 'agent-supervisor',
    requiresAgentCount: 1,
  },
];
