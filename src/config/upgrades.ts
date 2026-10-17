export type UpgradeEffect =
  | { type: 'agent_multiplier'; agentId: string; multiplier: number }
  | { type: 'global_multiplier'; multiplier: number }
  | { type: 'click_multiplier'; multiplier: number }
  /** Le clic rapporte en plus `share` de la production des agents (0.02 = 2 %). */
  | { type: 'click_share'; share: number }
  /** Bonus des clients multiplié. */
  | { type: 'client_multiplier'; multiplier: number }
  /** Chaque agent `sourceAgentId` donne +perUnit à la production de tous les autres types. */
  | { type: 'synergy'; sourceAgentId: string; perUnit: number };

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
  /** Nombre de prestiges requis : l'amélioration reste invisible avant (0 par défaut). */
  minPrestige?: number;
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
  // ── Améliorations qui changent les règles (1.1) ──
  {
    id: 'copilote',
    name: 'Copilote',
    description: 'Le fondateur travaille avec ses agents : chaque tâche manuelle profite de leur production',
    icon: '🧭',
    cost: 20_000,
    effect: { type: 'click_share', share: 0.02 },
    effectLabel: 'Clic + 2 % de la production des agents',
    requiresAgentId: 'agent-analytics',
    requiresAgentCount: 10,
  },
  {
    id: 'clients-recurrents',
    name: 'Clients récurrents',
    description: 'Les contrats signés deviennent des abonnements',
    icon: '🔁',
    cost: 5_000_000,
    effect: { type: 'client_multiplier', multiplier: 2 },
    effectLabel: 'Bonus des clients ×2',
    requiresAgentId: 'agent-supervisor',
    requiresAgentCount: 1,
    minPrestige: 1,
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    description: 'Les Supervisors répartissent le travail entre tous les agents',
    icon: '🎼',
    cost: 30_000_000,
    effect: { type: 'synergy', sourceAgentId: 'agent-supervisor', perUnit: 0.01 },
    effectLabel: '+1 % par Supervisor pour les autres agents',
    requiresAgentId: 'agent-supervisor',
    requiresAgentCount: 10,
    minPrestige: 1,
  },
  {
    id: 'memoire-partagee',
    name: 'Mémoire partagée',
    description: 'Tous les projets alimentent une seule base de savoir',
    icon: '🗄️',
    cost: 300_000_000,
    effect: { type: 'agent_multiplier', agentId: 'agent-rag', multiplier: 2 },
    effectLabel: 'Agent RAG ×2',
    requiresAgentId: 'agent-rag',
    requiresAgentCount: 10,
    minPrestige: 1,
  },
  {
    id: 'standard-ia',
    name: 'Standard IA',
    description: 'Un standard téléphonique qui ne dort jamais',
    icon: '☎️',
    cost: 3_000_000_000,
    effect: { type: 'agent_multiplier', agentId: 'agent-voice', multiplier: 3 },
    effectLabel: 'Agent Voix ×3',
    requiresAgentId: 'agent-voice',
    requiresAgentCount: 10,
    minPrestige: 3,
  },
];
