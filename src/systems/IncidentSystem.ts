/**
 * IncidentSystem — Urgences clients aléatoires avec mini-quiz IA éducatif.
 * Apparaît toutes les 2-5 min de jeu actif (au moins 1 agent requis).
 */

export interface IncidentQuestion {
  client:   string;
  urgency:  string;
  problem:  string;
  question: string;
  answers:  [string, string, string];
  correct:  0 | 1 | 2;
  lesson:   string;
  reward:   number;
}

const INCIDENTS: IncidentQuestion[] = [
  {
    client: 'MégaRetail',
    urgency: '🔴 CRITIQUE',
    problem: 'Le chatbot répond avec des infos de 2022 et invente des promos inexistantes.',
    question: 'Quelle est la meilleure solution à court terme ?',
    answers: [
      'Augmenter la température du modèle à 1.5',
      'Implémenter du RAG avec le catalogue produits à jour',
      'Passer à un modèle plus récent',
    ],
    correct: 1,
    lesson: 'Le RAG (Retrieval Augmented Generation) ancre les réponses dans des données réelles actualisées — le modèle ne peut répondre que ce qui est dans la base.',
    reward: 800,
  },
  {
    client: 'PharmaPlus',
    urgency: '🔴 URGENT',
    problem: 'L\'agent invente des posologies de médicaments — données potentiellement dangereuses.',
    question: 'Comment sécuriser le système en priorité ?',
    answers: [
      'Ajouter un disclaimer légal dans les réponses',
      'Contraindre les réponses à la base de données médicale validée uniquement',
      'Passer en mode conversationnel libre pour plus de souplesse',
    ],
    correct: 1,
    lesson: 'Pour les domaines critiques, le modèle doit être ancré dans une base validée. Les hallucinations sont réduites de 80%+ quand on gronde le modèle avec des sources fiables.',
    reward: 1200,
  },
  {
    client: 'SpeedLogistix',
    urgency: '🟠 IMPORTANT',
    problem: 'Les appels API coûtent 3× le budget prévu. Le client menace de résilier.',
    question: 'Quelle est la cause la plus probable ?',
    answers: [
      'Le modèle utilise trop de puissance de calcul',
      'Les prompts sont trop longs et il n\'y a pas de cache sémantique',
      'Le serveur retente les appels trop souvent',
    ],
    correct: 1,
    lesson: 'Le cache sémantique stocke les réponses à des requêtes similaires. Combiné à la compression de prompts, il réduit les coûts de 60 à 80%.',
    reward: 600,
  },
  {
    client: 'LexGroup',
    urgency: '🔴 CRITIQUE',
    problem: 'Un utilisateur a réussi à faire ignorer les instructions du système au chatbot juridique.',
    question: 'Ce type d\'attaque s\'appelle ?',
    answers: [
      'SQL Injection',
      'Prompt Injection',
      'Cross-Site Scripting (XSS)',
    ],
    correct: 1,
    lesson: 'Le Prompt Injection insère des instructions malveillantes dans l\'input pour détourner le comportement du modèle. La validation des entrées et les garde-fous système sont essentiels.',
    reward: 900,
  },
  {
    client: 'FluentAI',
    urgency: '🟠 IMPORTANT',
    problem: 'Les traductions automatiques sont inconsistantes — même texte, résultats différents à chaque session.',
    question: 'Quel paramètre est probablement mal configuré ?',
    answers: [
      'La température est trop haute (0.9+)',
      'Le modèle manque de mémoire RAM',
      'Le prompt système est trop court',
    ],
    correct: 0,
    lesson: 'La température contrôle la créativité du modèle. Pour les tâches de précision (traduction, extraction de données), une température basse (0.0-0.2) garantit des résultats cohérents.',
    reward: 500,
  },
  {
    client: 'DataNova',
    urgency: '🟡 MOYEN',
    problem: 'L\'agent dépasse systématiquement la fenêtre de contexte quand les rapports sont longs.',
    question: 'Quelle technique résout ce problème sans changer de modèle ?',
    answers: [
      'Ignorer les parties trop longues du document',
      'Découper le document en chunks et traiter par parties',
      'Augmenter le budget pour un modèle 128k tokens',
    ],
    correct: 1,
    lesson: 'Le chunking divise les longs documents en segments traités séquentiellement avec résumés intermédiaires. C\'est la base de tout pipeline RAG robuste — avant d\'augmenter les coûts.',
    reward: 600,
  },
  {
    client: 'ViralBoost',
    urgency: '🟠 IMPORTANT',
    problem: 'L\'agent de génération de contenu tourne en boucle infinie sans jamais livrer de résultat.',
    question: 'Qu\'est-ce qui manque dans l\'architecture de l\'agent ?',
    answers: [
      'Un modèle de langage plus performant',
      'Une condition d\'arrêt et un compteur maximum d\'itérations',
      'Plus de mémoire sur le serveur',
    ],
    correct: 1,
    lesson: 'Tout agent doit avoir une condition d\'arrêt explicite (max_iterations, stop_condition). Sans garde-fou, les agents LLM peuvent boucler indéfiniment et exploser la facture.',
    reward: 700,
  },
  {
    client: 'GreenBank',
    urgency: '🔴 CRITIQUE',
    problem: 'Des données clients PII sont envoyées à l\'API OpenAI. Le DPO est en train d\'appeler les avocats.',
    question: 'Solution RGPD-compatible en urgence ?',
    answers: [
      'Anonymiser les données avant envoi ou héberger le modèle en interne',
      'Ajouter un bandeau de consentement cookie sur le site',
      'Envoyer les données en HTTPS — c\'est suffisant pour la conformité',
    ],
    correct: 0,
    lesson: 'Les APIs cloud de LLM ne sont pas RGPD-safe par défaut. L\'anonymisation (masquage PII) ou le self-hosting (Ollama, vLLM) sont les seules solutions réellement conformes.',
    reward: 1500,
  },
  {
    client: 'QuickSort',
    urgency: '🟡 MOYEN',
    problem: 'Le classifieur de tickets support a 65% de précision. Le client attendait 90%+.',
    question: 'Comment améliorer rapidement les performances sans réentraîner ?',
    answers: [
      'Passer directement à GPT-4 Turbo',
      'Ajouter 3 à 5 exemples concrets dans le prompt (few-shot learning)',
      'Entraîner un nouveau modèle from scratch sur les données internes',
    ],
    correct: 1,
    lesson: 'Le few-shot learning (exemples dans le prompt) améliore souvent la précision de 15 à 30% sans coût d\'entraînement. C\'est toujours le premier levier à tester — avant de changer de modèle.',
    reward: 700,
  },
  {
    client: 'PrimeCare',
    urgency: '🟠 IMPORTANT',
    problem: 'Le modèle prend 8+ secondes pour répondre. Les utilisateurs abandonnent avant la fin.',
    question: 'Quelle technique améliore la perception de vitesse sans changer de modèle ?',
    answers: [
      'Réduire la longueur maximale des réponses à 50 tokens',
      'Implémenter le streaming — afficher les tokens au fur et à mesure',
      'Mettre toutes les réponses en cache côté serveur',
    ],
    correct: 1,
    lesson: 'Le streaming affiche les tokens dès leur génération. L\'utilisateur lit pendant que le modèle génère — la perception de vitesse est transformée même si le temps total ne change pas.',
    reward: 500,
  },
  {
    client: 'AutoFleet',
    urgency: '🟡 MOYEN',
    problem: 'Le workflow d\'automatisation plante sans se relancer en cas d\'erreur API intermittente.',
    question: 'Quelle stratégie de résilience implémenter ?',
    answers: [
      'Try/catch avec log d\'erreur et arrêt du workflow',
      'Exponential backoff avec retry automatique (3 tentatives espacées)',
      'Envoyer une alerte Slack et attendre l\'intervention manuelle',
    ],
    correct: 1,
    lesson: 'L\'exponential backoff (attendre 1s, puis 2s, puis 4s avant retry) est le standard pour les APIs instables. Elle évite de surcharger un service déjà en difficulté.',
    reward: 600,
  },
  {
    client: 'MindScope',
    urgency: '🔴 CRITIQUE',
    problem: 'L\'agent d\'analyse confond deux pathologies similaires dans 35% des cas.',
    question: 'Quel est le premier levier d\'amélioration à tester ?',
    answers: [
      'Changer immédiatement de fournisseur d\'API',
      'Affiner le prompt avec des critères de différenciation précis et des contre-exemples',
      'Augmenter la résolution des images envoyées au modèle',
    ],
    correct: 1,
    lesson: 'Avant de changer de modèle, optimisez le prompt. Des critères de différenciation explicites et des contre-exemples concrets améliorent souvent la précision de 20 à 40%.',
    reward: 1000,
  },
];

export class IncidentSystem {
  private nextIn: number;
  private active = false;
  private usedIndices: Set<number> = new Set();

  constructor() {
    this.nextIn = 210 + Math.random() * 90; // Premier incident : 3.5-5 min après lancement
  }

  tick(dt: number, hasAgents: boolean): IncidentQuestion | null {
    if (!hasAgents || this.active) return null;
    this.nextIn -= dt;
    if (this.nextIn <= 0) {
      this.active = true;
      return this.pickQuestion();
    }
    return null;
  }

  resolve(): void {
    this.active = false;
    this.nextIn = 180 + Math.random() * 120; // Prochain : 3-5 min
  }

  private pickQuestion(): IncidentQuestion {
    // Cycling — reset si tout a été vu
    if (this.usedIndices.size >= INCIDENTS.length) this.usedIndices.clear();
    let idx: number;
    do {
      idx = Math.floor(Math.random() * INCIDENTS.length);
    } while (this.usedIndices.has(idx));
    this.usedIndices.add(idx);
    return INCIDENTS[idx]!;
  }
}
