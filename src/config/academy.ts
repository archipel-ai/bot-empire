// ─── IA ACADEMY — Contenu pédagogique ────────────────────────
// Progression crescendo : du "c'est quoi l'IA ?" au prompt expert.

export interface AcademyCriterion {
  pattern: RegExp;
  label:   string;
  points:  number;
}

export interface AcademyChallenge {
  id:          string;
  chapterId:   string;
  title:       string;
  subtitle:    string;
  context:     string;   // Description du défi côté joueur
  tips:        string[]; // Conseils affichés
  type:        'discovery' | 'gpturbo';
  criteria:    AcademyCriterion[];
  responses: {
    poor:      string;   // 0–35 pts
    decent:    string;   // 36–60 pts
    good:      string;   // 61–80 pts
    excellent: string;   // 81+ pts
  };
  lesson:      string;   // Enseignement révélé après
  xpReward:    number;
  euroReward:  number;
  unlockAfter?: string;  // ID du défi à compléter avant
}

export interface AcademyChapter {
  id:       string;
  number:   number;
  title:    string;
  subtitle: string;
  icon:     string;
  color:    string;
  unlockCondition: 'always' | 'after_prestige_1';
}

// ─── CHAPITRES ────────────────────────────────────────────────

export const CHAPTERS: AcademyChapter[] = [
  {
    id:       'ch1',
    number:   1,
    title:    'La Première Rencontre',
    subtitle: "Découvre ce qu'est vraiment l'IA",
    icon:     '🤖',
    color:    '#00ff88',
    unlockCondition: 'always',
  },
  {
    id:       'ch2',
    number:   2,
    title:    "L'Art du Prompt",
    subtitle: 'Apprends à parler à l\'IA comme un pro',
    icon:     '⚡',
    color:    '#38bdf8',
    unlockCondition: 'always',
  },
];

// ─── DÉFIS ────────────────────────────────────────────────────

export const CHALLENGES: AcademyChallenge[] = [

  // ── CHAPITRE 1 : Découverte ──────────────────────────────

  {
    id:        'discovery-1',
    chapterId: 'ch1',
    title:     'Dis Bonjour à GPTurbo',
    subtitle:  'Ta toute première conversation avec une IA',
    context:   "GPTurbo vient d'être installé dans ton agence. C'est une intelligence artificielle — elle comprend ce que tu écris et te répond. Tape n'importe quoi pour commencer. Un bonjour, une question, une blague... Elle répondra !",
    tips: [
      '💡 Essaie de lui dire bonjour',
      '🎯 Pose-lui une question que tu te poses vraiment',
      '😄 Demande-lui de te raconter une blague',
    ],
    type:     'discovery',
    criteria: [], // Pas de scoring — toute entrée valide
    responses: {
      poor:      "Bonjour ! Je suis GPTurbo ⚡ — l'IA de ton agence. Je suis prêt à t'aider ! Pose-moi une vraie question pour voir ce que je sais faire.",
      decent:    "Bonjour ! Je suis GPTurbo ⚡\n\nJe suis une intelligence artificielle. Concrètement, ça veut dire que j'ai été entraîné sur des milliards de textes — livres, articles, sites web — et que j'ai appris à comprendre et générer du langage humain.\n\nJe peux écrire, expliquer, traduire, résumer, coder... Qu'est-ce que tu voudrais faire ?",
      good:      "Salut ! GPTurbo ici ⚡🚀\n\nJe suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.\n\nJe peux t'aider à :\n• Écrire des textes, emails, descriptions\n• Répondre à tes questions\n• Analyser et résumer des infos\n• Générer des idées créatives\n\nDis-moi ce dont tu as besoin ! 🎯",
      excellent: "Salut ! GPTurbo ici ⚡🚀\n\nJe suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.\n\nJe peux t'aider à :\n• Écrire des textes, emails, descriptions\n• Répondre à tes questions\n• Analyser et résumer des infos\n• Générer des idées créatives\n\nDis-moi ce dont tu as besoin ! 🎯",
    },
    lesson:    "🎉 Tu viens de parler à une IA pour la première fois ! Ce que tu as tapé s'appelle un **prompt** — c'est ta demande à l'IA. La qualité de ta réponse dépend de la qualité de ta demande. On va apprendre ça ensemble.",
    xpReward:  50,
    euroReward: 500,
  },

  // ── CHAPITRE 2 : GPTurbo ────────────────────────────────

  {
    id:        'gpturbo-1',
    chapterId: 'ch2',
    title:     'Ta Première Mission',
    subtitle:  'Demande quelque chose de précis',
    context:   "🥐 La Boulangerie Martin est ton premier client. Ils veulent une description pour leur nouveau croissant au beurre — à afficher en vitrine.\n\nUtilise GPTurbo pour l'écrire. Dis-lui ce que tu veux !",
    tips: [
      '💡 Dis à GPTurbo QUOI faire (ex: "écris une description...")',
      '🎯 Parle du produit : c\'est quoi ? C\'est pour qui ?',
      '✨ Plus tu es précis, meilleure sera la réponse !',
    ],
    type:     'gpturbo',
    criteria: [
      { pattern: /\b(écri|rédige|créé|fais|génère|propose)/i,         label: 'Tu as demandé quelque chose de précis',   points: 20 },
      { pattern: /\b(croissant|boulangerie|martin|viennoiserie)/i,     label: 'Tu as mentionné le produit',              points: 25 },
      { pattern: /\b(beurr|croustillant|doré|saveur|goût|délicieu|appétissant|frais)/i, label: 'Tu décris la qualité', points: 25 },
      { pattern: /[\s\S]{35,}/,                                        label: 'Ta demande est suffisamment détaillée',   points: 15 },
      { pattern: /\b(vitrine|client|passant|acheteur|consommateur)/i,  label: 'Tu penses à l\'audience',                points: 15 },
    ],
    responses: {
      poor:      "Un croissant au beurre. Il est bon et frais.",
      decent:    "Découvrez notre croissant au beurre, une viennoiserie préparée chaque matin avec soin. Croustillant à l'extérieur et moelleux à l'intérieur, il sera parfait pour bien commencer votre journée.",
      good:      "🥐 Croissant Pur Beurre — Boulangerie Martin\n\nCroustillant à souhait, doré à la perfection, notre croissant au beurre est façonné chaque matin avec un beurre AOP sélectionné. Sa mie alvéolée fond en bouche, libérant des arômes de beurre frais et de pâte feuilletée. Une gourmandise incontournable pour bien démarrer la journée.",
      excellent: "🥐 Le Croissant Signature — Boulangerie Martin\n\nNé à l'aube, façonné à la main, notre croissant au beurre incarne l'art de la viennoiserie française. Ses couches feuilletées, croustillantes au toucher, révèlent une mie dorée et aérienne imprégnée d'un beurre AOP Charentes-Poitou.\n\nChaque bouchée est une invitation — celle d'un matin parisien, d'une terrasse ensoleillée. Une gourmandise artisanale, disponible dès 7h. Jusqu'à épuisement du stock.",
    },
    lesson:    "💡 Tu viens de découvrir la règle n°1 du prompt : dire **QUOI** faire et **SUR QUOI**. Plus ta demande est claire, meilleure est la réponse. Regarde la différence entre le score faible et le score excellent !",
    xpReward:  100,
    euroReward: 1_500,
    unlockAfter: 'discovery-1',
  },

  {
    id:        'gpturbo-2',
    chapterId: 'ch2',
    title:     'Connais ton Public',
    subtitle:  'Le contexte change tout',
    context:   "🎒 Même boulangerie, même croissant — mais le client veut maintenant attirer les écoliers qui passent après l'école.\n\nLa description doit être fun, accessible, parler aux enfants de 10 ans. Adapte ta demande à GPTurbo !",
    tips: [
      '👦 Précise à qui s\'adresse le texte (des enfants ? des ados ?)',
      '🎨 Pense au ton : joyeux, simple, amusant',
      '📏 Un texte court et percutant pour un enfant',
    ],
    type:     'gpturbo',
    criteria: [
      { pattern: /\b(enfant|gamin|écolier|jeune|ado|école|gosse|kid|10 ans|petit)/i,  label: 'Tu as précisé l\'audience',           points: 30 },
      { pattern: /\b(amusant|fun|rigolo|cool|super|waouh|joyeux|sympa|marrant)/i,     label: 'Tu as pensé au ton',                   points: 20 },
      { pattern: /\b(croissant|boulangerie|viennoiserie|gâteau|pâtisserie)/i,          label: 'Tu as gardé le sujet principal',       points: 15 },
      { pattern: /\b(court|simple|facile|accessible|rapide|petit texte)/i,             label: 'Tu penses à la lisibilité',            points: 20 },
      { pattern: /[\s\S]{40,}/,                                                        label: 'Ta demande est complète',              points: 15 },
    ],
    responses: {
      poor:      "Un croissant pour les enfants. Il est bon.",
      decent:    "Hé les ados ! Vous voulez un super goûter après l'école ? Notre croissant au beurre est mega bon ! Croustillant et moelleux, c'est le meilleur du quartier. Venez vite !",
      good:      "🥐 Hé toi ! Oui, toi ! 👋\n\nTu rentres de l'école et t'as trop faim ?\n\nLe croissant au beurre de la Boulangerie Martin, c'est :\n✅ Croustillant comme tu aimes\n✅ Tout chaud sorti du four\n✅ Au goût de beurre trop bon\n\nViens vite — y'en a pas pour tout le monde ! 😄",
      excellent: "🥐 Hé ! Toi qui rentres de l'école ! 👋\n\nT'as la dalle ? Le croissant au beurre de la Boulangerie Martin est FAIT POUR TOI.\n\n🔥 Croustillant à l'extérieur\n🧁 Tout moelleux à l'intérieur\n🧈 Avec du vrai bon beurre\n\nC'est le snack préféré de tous les écoliers du quartier. Et il est chaud sorti du four !\n\n📍 Juste en face de l'école. Cours ! 😄",
    },
    lesson:    "💡 Règle n°2 : toujours préciser **pour qui** tu écris. L'IA adapte automatiquement le ton, le vocabulaire et le format. Un texte pour un enfant de 10 ans ≠ un texte pour un adulte. Le contexte, c'est ton super-pouvoir.",
    xpReward:  150,
    euroReward: 2_500,
    unlockAfter: 'gpturbo-1',
  },

  {
    id:        'gpturbo-3',
    chapterId: 'ch2',
    title:     "Donne un Rôle à l'IA",
    subtitle:  "Transforme GPTurbo en expert",
    context:   "⭐ Un chef étoilé Michelin ouvre une pâtisserie de luxe à Paris. Il veut une description ultra-raffinée pour sa carte gastronomique.\n\nTon astuce secrète : donne un rôle précis à GPTurbo. Dis-lui QUI il est avant de lui dire QUOI faire.",
    tips: [
      '🎭 Commence par "Tu es..." ou "Agis comme..."',
      '👨‍🍳 Donne un rôle précis : chef étoilé, critique gastronomique...',
      '✨ Combine le rôle + le contexte + la demande',
    ],
    type:     'gpturbo',
    criteria: [
      { pattern: /\b(tu es|agis comme|joue le rôle|en tant que|imagine que tu es|incarne|tu joues)/i, label: 'Tu as donné un rôle à l\'IA !',      points: 35 },
      { pattern: /\b(chef|cuisinier|gastronomique|Michelin|étoilé|culinaire|critique|sommelier)/i,    label: 'Le rôle est précis et adapté',        points: 25 },
      { pattern: /\b(luxe|gastronomique|raffiné|élégant|carte|menu|prestige|haute cuisine)/i,         label: 'Tu as le contexte de prestige',        points: 20 },
      { pattern: /[\s\S]{50,}/,                                                                       label: 'Ta demande est complète et structurée', points: 20 },
    ],
    responses: {
      poor:      "Le croissant est très bon. Il est au beurre et très raffiné.",
      decent:    "Notre croissant au beurre est une création d'exception, façonnée avec les meilleurs ingrédients pour une expérience gustative mémorable. Une pure viennoiserie d'art.",
      good:      "**Croissant Feuilleté — Beurre de Baratte AOP**\n\nUne architecture en spirale de 27 couches, dorée à 185°C pour révéler une caramélisation parfaite. La mie, d'une légèreté soyeuse, libère en bouche les notes lactées d'un beurre de baratte sélectionné en Normandie.\n\nUne œuvre éphémère. Disponible chaque matin dès l'ouverture.",
      excellent: "**Le Croissant Origine — Création du Chef**\n_Pâtisserie Maison, Paris 8e_\n\nFaçonné à la main à 4h du matin, ce croissant est l'aboutissement d'un savoir-faire transmis sur trois générations. Vingt-sept couches de feuilletage beurré alternent croustillant ambré et mie alvéolée, libérant au premier mordant les arômes complexes d'un beurre de baratte AOP Isigny, à 84% de matières grasses.\n\nLa caramélisation, obtenue à 185°C précis, confère une robe dorée irisée d'une rare régularité. Une création éphémère — 30 pièces par jour, servies chaudes à partir de 8h.\n\n_«La simplicité est la sophistication suprême.»_",
    },
    lesson:    "💡 Règle n°3 — et c'est la plus puissante : donne un **rôle** à l'IA. \"Tu es un chef étoilé\" active tout le vocabulaire gastronomique appris pendant l'entraînement. C'est comme passer l'IA en mode expert instantanément. Cette technique s'appelle le **role prompting** — les pros l'utilisent tous.",
    xpReward:  200,
    euroReward: 4_000,
    unlockAfter: 'gpturbo-2',
  },
];

/** Récupère les défis d'un chapitre */
export function getChallengesByChapter(chapterId: string): AcademyChallenge[] {
  return CHALLENGES.filter(c => c.chapterId === chapterId);
}
