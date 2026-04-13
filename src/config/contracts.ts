/**
 * Contrats urgents — missions time-limited qui apparaissent sur le board.
 * Pool de 25 contrats avec conditions et récompenses variées.
 */

export interface ContractDef {
  id:          string;
  client:      string;
  clientIcon:  string;
  title:       string;
  description: string;
  reward:      number;         // € encaissés à la complétion
  duration:    number;         // secondes disponibles avant expiration
  workTime:    number;         // secondes pour compléter (si accepté)
  rarity:      'common' | 'rare' | 'epic';
  requiresRate?: number;       // €/s minimum
  requiresAgent?: { id: string; count: number };
}

export const CONTRACTS: ContractDef[] = [
  // ── COMMON ─────────────────────────────────────────────────
  {
    id: 'audit-flash-retail',
    client: 'QuickRetail', clientIcon: '🛒',
    title: 'Audit Flash Chatbot',
    description: 'Leur chatbot répond en 8s. Ils veulent du sub-2s. Audit express demandé.',
    reward: 1_200, duration: 3 * 3600, workTime: 120,
    rarity: 'common', requiresRate: 0.5,
  },
  {
    id: 'content-rush-startup',
    client: 'LaunchPad', clientIcon: '🚀',
    title: '20 posts LinkedIn urgents',
    description: 'Levée de fonds dans 48h. Ils ont besoin de contenu maintenant.',
    reward: 800, duration: 2 * 3600, workTime: 90,
    rarity: 'common', requiresRate: 0.3,
  },
  {
    id: 'workflow-bug-fix',
    client: 'AutoBiz', clientIcon: '⚙️',
    title: 'Workflow planté en prod',
    description: '3 000 emails non envoyés depuis ce matin. Fix immédiat.',
    reward: 1_500, duration: 1.5 * 3600, workTime: 60,
    rarity: 'common', requiresAgent: { id: 'bot-workflows', count: 1 },
  },
  {
    id: 'data-extract-simple',
    client: 'DataFirst', clientIcon: '📊',
    title: 'Extraction CSV → insights',
    description: '10 000 lignes à analyser. Rapport en 2h pour la réunion board.',
    reward: 900, duration: 2 * 3600, workTime: 100,
    rarity: 'common', requiresRate: 0.8,
  },
  {
    id: 'rgpd-quick-check',
    client: 'E-Shop Pro', clientIcon: '🔒',
    title: 'Vérification RGPD express',
    description: 'Audit CNIL demandé pour demain. Formulaires et cookies à vérifier.',
    reward: 1_100, duration: 4 * 3600, workTime: 150,
    rarity: 'common',
  },
  {
    id: 'social-media-crisis',
    client: 'BrandUp', clientIcon: '📱',
    title: 'Gestion crise réseaux',
    description: 'Post viral négatif. Besoin de 10 réponses calibrées dans l\'heure.',
    reward: 700, duration: 1 * 3600, workTime: 45,
    rarity: 'common', requiresAgent: { id: 'agent-copy', count: 1 },
  },
  {
    id: 'api-integration-express',
    client: 'ConnectApp', clientIcon: '🔗',
    title: 'Intégration API express',
    description: 'Connecter Stripe + n8n avant le lancement de demain.',
    reward: 1_300, duration: 3 * 3600, workTime: 110,
    rarity: 'common', requiresAgent: { id: 'bot-workflows', count: 3 },
  },
  {
    id: 'newsletter-automation',
    client: 'MailBlast', clientIcon: '📧',
    title: 'Automation newsletter',
    description: '5 séquences d\'onboarding à configurer. Client pressé.',
    reward: 950, duration: 5 * 3600, workTime: 130,
    rarity: 'common',
  },

  // ── RARE ────────────────────────────────────────────────────
  {
    id: 'bank-audit-full',
    client: 'FinanceCore', clientIcon: '🏦',
    title: 'Audit IA complet — banque',
    description: 'Conformité BCEAO + RGPD pour leur nouveau système de scoring crédit.',
    reward: 15_000, duration: 6 * 3600, workTime: 300,
    rarity: 'rare', requiresAgent: { id: 'agent-audit', count: 2 },
  },
  {
    id: 'hospital-chatbot',
    client: 'CliniqIA', clientIcon: '🏥',
    title: 'Déploiement chatbot médical',
    description: 'Assistant triage urgences. Validation médicale requise. Contrat récurrent.',
    reward: 22_000, duration: 8 * 3600, workTime: 400,
    rarity: 'rare', requiresRate: 5,
  },
  {
    id: 'media-scraping',
    client: 'PressBot', clientIcon: '📰',
    title: 'Pipeline médias temps réel',
    description: '500 sources RSS → résumés → newsletter. Architecture complète.',
    reward: 12_000, duration: 5 * 3600, workTime: 250,
    rarity: 'rare', requiresAgent: { id: 'bot-workflows', count: 10 },
  },
  {
    id: 'legal-contract-review',
    client: 'LexCorp', clientIcon: '⚖️',
    title: 'Revue 200 contrats IA',
    description: 'Fusion en cours. 200 contrats fournisseurs à analyser en 24h.',
    reward: 18_000, duration: 7 * 3600, workTime: 350,
    rarity: 'rare', requiresAgent: { id: 'agent-legal', count: 1 },
  },
  {
    id: 'growth-series-a',
    client: 'ScaleUp Corp', clientIcon: '📈',
    title: 'Stratégie go-to-market Série A',
    description: 'Pitch deck + 90j de content plan + outreach séquences. Urgence investisseurs.',
    reward: 25_000, duration: 8 * 3600, workTime: 420,
    rarity: 'rare', requiresAgent: { id: 'agent-growth', count: 2 },
  },
  {
    id: 'ecommerce-optimization',
    client: 'MegaShop', clientIcon: '🛍️',
    title: 'Optimisation conversion e-commerce',
    description: 'A/B tests IA sur 40 landing pages. Deadline : Black Friday dans 3j.',
    reward: 14_000, duration: 6 * 3600, workTime: 280,
    rarity: 'rare', requiresRate: 8,
  },
  {
    id: 'analytics-dashboard',
    client: 'DataVision', clientIcon: '🔭',
    title: 'Dashboard analytics C-level',
    description: '12 KPIs, 3 marchés, temps réel. Présentation board lundi.',
    reward: 11_000, duration: 5 * 3600, workTime: 240,
    rarity: 'rare', requiresAgent: { id: 'agent-analytics', count: 3 },
  },
  {
    id: 'ai-security-audit',
    client: 'SecureIA', clientIcon: '🛡️',
    title: 'Pentest IA + rapport',
    description: 'Prompt injection, data leakage, model inversion. Rapport certifié.',
    reward: 19_000, duration: 7 * 3600, workTime: 380,
    rarity: 'rare', requiresAgent: { id: 'agent-audit', count: 5 },
  },

  // ── EPIC ────────────────────────────────────────────────────
  {
    id: 'ministere-ia-project',
    client: 'MinistèreIA', clientIcon: '🏛️',
    title: 'Appel d\'offre — IA d\'État',
    description: 'Système de traitement de 2M de dossiers/an. Contrat pluriannuel. C\'est maintenant ou jamais.',
    reward: 180_000, duration: 12 * 3600, workTime: 900,
    rarity: 'epic', requiresAgent: { id: 'agent-supervisor', count: 1 },
  },
  {
    id: 'ipo-ai-audit',
    client: 'TechGiant FR', clientIcon: '🦅',
    title: 'Audit IA pré-IPO',
    description: 'IPO dans 30j. Due diligence complète de tous les systèmes IA. Confidentiel.',
    reward: 250_000, duration: 10 * 3600, workTime: 800,
    rarity: 'epic', requiresAgent: { id: 'agent-legal', count: 3 },
  },
  {
    id: 'unicorn-partnership',
    client: 'Unicorn Labs', clientIcon: '🦄',
    title: 'Partenariat stratégique annuel',
    description: 'Externalisation complète de la stack IA. 12 mois, équipe dédiée.',
    reward: 500_000, duration: 8 * 3600, workTime: 600,
    rarity: 'epic', requiresRate: 50,
  },
  {
    id: 'media-empire',
    client: 'Groupe Média', clientIcon: '📺',
    title: 'IA éditoriale — 10 médias',
    description: 'Automatisation complète : veille, rédaction, SEO, distribution. Groupe national.',
    reward: 320_000, duration: 10 * 3600, workTime: 750,
    rarity: 'epic', requiresAgent: { id: 'agent-growth', count: 5 },
  },
  {
    id: 'defense-contract',
    client: 'Défense IA', clientIcon: '🎖️',
    title: 'Contrat ministère défense',
    description: 'Analyse de renseignement open-source. Top secret. Fenêtre de 8h.',
    reward: 400_000, duration: 8 * 3600, workTime: 700,
    rarity: 'epic', requiresAgent: { id: 'agent-supervisor', count: 2 },
  },
  {
    id: 'global-rollout',
    client: 'GlobalCorp', clientIcon: '🌍',
    title: 'Déploiement mondial 40 pays',
    description: 'Stack IA full — 40 langues, conformités locales, 24/7 support. Il faut tout.',
    reward: 800_000, duration: 12 * 3600, workTime: 1_200,
    rarity: 'epic', requiresRate: 100,
  },
  {
    id: 'acquisition-ia',
    client: 'VentureCapital', clientIcon: '💼',
    title: 'Acquisition — valorisation IA',
    description: 'Un VC veut racheter ta technologie. Négo express, window de 6h.',
    reward: 1_000_000, duration: 6 * 3600, workTime: 500,
    rarity: 'epic', requiresAgent: { id: 'agent-supervisor', count: 3 },
  },
];
