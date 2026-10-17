// ─── CARNET DE RÉFÉRENCES (succès) ──────────────────────────
// Chaque référence est une fiche client obtenue en atteignant un objectif lisible (pas de succès
// secret) et vaut +0,5 % de revenu, pour toujours. Sauvegarde : une clé booléenne `ref-<id>` de
// reputationPurchased (survit à la vente, synchronisée dans le cloud, déclarée dans createInitialState).
// Français ici ; anglais dans i18n/content.ts. Les fiches « client signé » reprennent le nom du client.

export type ReferenceCondition =
  | { type: 'agents';   agentId: string; count: number }
  | { type: 'client';   clientId: string }
  | { type: 'prestige'; count: number }
  | { type: 'lessons';  count: number }
  | { type: 'letters';  count: number };   // lettres ambre attrapées (statistiques locales)

export interface ReferenceDef {
  id:        string;
  condition: ReferenceCondition;
  name:      string;   // vide pour une fiche « client signé » (nom repris du client)
  sector:    string;
  quote:     string;   // témoignage, une phrase
}

/** +0,5 % de revenu par référence obtenue. */
export const REFERENCE_INCOME_BONUS = 0.005;

const team = (agentId: string, count: number, name: string, sector: string, quote: string): ReferenceDef =>
  ({ id: `ref-${agentId}-${count}`, condition: { type: 'agents', agentId, count }, name, sector, quote });
const signed = (clientId: string, quote: string): ReferenceDef =>
  ({ id: `ref-client-${clientId}`, condition: { type: 'client', clientId }, name: '', sector: '', quote });

export const REFERENCES: ReferenceDef[] = [
  // Équipes : 25 puis 100 agents des 7 premiers métiers
  team('bot-workflows', 25,     'Atelier Lumen',          'Imprimerie',          'Nos devis partent seuls depuis que vos workflows tournent.'),
  team('bot-workflows', 100,    'TransRhône',             'Logistique',          'Cent workflows, et plus une commande oubliée.'),
  team('agent-copy', 25,        'Maison Ondine',          'Cosmétiques',         "Nos fiches produits n'ont jamais été aussi claires."),
  team('agent-copy', 100,       'Éditions Pivert',        'Édition',             'Tout le catalogue réécrit avant le salon.'),
  team('agent-analytics', 25,   'Vélo Cité',              'Mobilité',            'On sait enfin quelles stations remplir le matin.'),
  team('agent-analytics', 100,  'Coop du Vercors',        'Agroalimentaire',     'Nos prévisions de collecte tombent juste à 3 % près.'),
  team('agent-audit', 25,       'Cabinet Hélios',         'Expertise comptable', 'Un audit par semaine, sans y passer nos soirées.'),
  team('agent-audit', 100,      'Mutuelle Azur',          'Assurance',           'Toutes nos chaînes de traitement passées au crible.'),
  team('agent-legal', 25,       'Studio Marelle',         'Jeu vidéo',           'Nos CGU tiennent enfin sur une page lisible.'),
  team('agent-legal', 100,      'Groupe Ferrandi',        'BTP',                 'Deux cents contrats fournisseurs relus avant la fusion.'),
  team('agent-growth', 25,      'Brasserie du Port',      'Boissons',            'Trente nouveaux bars en un trimestre.'),
  team('agent-growth', 100,     'Kelvin Énergie',         'Énergie',             "Notre carnet de commandes est plein jusqu'à l'été."),
  team('agent-supervisor', 25,  'Clinique Saint-Roch',    'Santé',               'Les plannings se font seuls, et ils sont justes.'),
  team('agent-supervisor', 100, 'Région Sud-Atlantique',  'Collectivité',        'Toute notre administration tourne sur vos agents.'),
  // Clients : chaque client signé une fois
  signed('restaurant-local', 'Les réservations du midi se prennent toutes seules.'),
  signed('cabinet-medical',  'Conforme au RGPD, et nos patients le sentent.'),
  signed('pme-ecommerce',    'On a rattrapé nos concurrents en un mois.'),
  signed('groupe-hotelier',  'Notre concierge virtuel parle douze langues.'),
  signed('grand-compte',     'Exécution parfaite, comme promis.'),
  signed('gouvernement',     "L'État vous fait confiance. Nous aussi."),
  signed('banque-nova',      'Chaque réponse cite la règle interne qui la justifie.'),
  signed('eurosante',        'Quarante hôpitaux, et aucune donnée qui sort.'),
  // Ventes de l'agence (« 4 ventes » : ajout de la révision du prestige, une nouveauté en 5e partie)
  { id: 'ref-vente-1',  condition: { type: 'prestige', count: 1 },  name: 'Fonds Albatros',        sector: 'Investissement',      quote: 'Première cession, belle valorisation.' },
  { id: 'ref-vente-3',  condition: { type: 'prestige', count: 3 },  name: 'Banque Vauclair',       sector: 'Finance',             quote: 'Trois agences vendues : ce n\'est plus de la chance.' },
  { id: 'ref-vente-4',  condition: { type: 'prestige', count: 4 },  name: 'Cercle des repreneurs', sector: "Réseau d'affaires",   quote: 'On vous cite en exemple à chaque réunion.' },
  { id: 'ref-vente-5',  condition: { type: 'prestige', count: 5 },  name: 'Capital & Code',        sector: 'Presse économique',   quote: "Le serial-entrepreneur de l'IA, c'est vous." },
  { id: 'ref-vente-10', condition: { type: 'prestige', count: 10 }, name: 'Club des Dix',          sector: 'Investisseurs',       quote: 'Dix ventes. On ne vous présente plus.' },
  // Academy : 5, 12 et 24 leçons
  { id: 'ref-acad-5',  condition: { type: 'lessons', count: 5 },  name: 'École Pixel',            sector: 'Formation',           quote: 'Vos stagiaires apprennent vite.' },
  { id: 'ref-acad-12', condition: { type: 'lessons', count: 12 }, name: "Campus d'Arles",         sector: 'Enseignement',        quote: 'Venez donner un cours à nos étudiants.' },
  { id: 'ref-acad-24', condition: { type: 'lessons', count: 24 }, name: 'Institut Mentor',        sector: 'Recherche',           quote: 'Vous avez tout appris. Maintenant, transmettez.' },
  // Lettres ambre attrapées : 1, 10 et 50
  { id: 'ref-ambre-1',  condition: { type: 'letters', count: 1 },  name: 'Courrier du Matin',     sector: 'Prospect',            quote: 'Vous avez répondu dans la minute.' },
  { id: 'ref-ambre-10', condition: { type: 'letters', count: 10 }, name: 'Les Ateliers Sauvage',  sector: 'Artisanat',           quote: 'Dix demandes, dix réponses rapides.' },
  { id: 'ref-ambre-50', condition: { type: 'letters', count: 50 }, name: 'Union des PME',         sector: 'Organisation professionnelle', quote: 'Cinquante entreprises vous ont trouvés seules.' },
];

export const REFERENCE_IDS: readonly string[] = REFERENCES.map(r => r.id);
