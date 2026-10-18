export interface ClientDef {
  id: string;
  name: string;
  sector: string;
  icon: string;
  bonusPerSecond: number;
  unlockRateRequired: number; // production des agents seuls (€/s, hors bonus clients)
  unlockDialogue: string; // Message affiché quand le client signe
  /** Nombre de prestiges requis avant que ce client puisse signer (0 par défaut). */
  minPrestige?: number;
}

// Seuils calés par simulation (joueur glouton, 1 à 3 clics/s) : 1er client vers 1 min,
// dernier vers 25-30 min d'une première partie. Le déblocage ne compte que les agents.
export const CLIENTS: ClientDef[] = [
  {
    id: 'restaurant-local',
    name: 'Le Comptoir',
    sector: 'Restauration',
    icon: '🍽️',
    bonusPerSecond: 1.5,          // était 0.5
    unlockRateRequired: 1,
    unlockDialogue: 'Le Comptoir signe ! "Un chatbot pour prendre les réservations du midi, c\'est possible ?"',
  },
  {
    id: 'cabinet-medical',
    name: 'MédiaTech+',
    sector: 'Santé numérique',
    icon: '🏥',
    bonusPerSecond: 8,            // était 2
    unlockRateRequired: 12,
    unlockDialogue: 'MédiaTech+ à bord ! "L\'IA doit rester RGPD-compliant." On gère.',
  },
  {
    id: 'pme-ecommerce',
    name: 'BricoMax',
    sector: 'E-commerce',
    icon: '🛍️',
    bonusPerSecond: 30,           // était 8
    unlockRateRequired: 100,
    unlockDialogue: 'BricoMax signe ! "Nos concurrents ont déjà l\'IA. Rattrapez-nous."',
  },
  {
    id: 'groupe-hotelier',
    name: 'PalmHôtel Group',
    sector: 'Hôtellerie & Luxe',
    icon: '🏨',
    bonusPerSecond: 100,          // était 30
    unlockRateRequired: 600,
    unlockDialogue: 'PalmHôtel Group confirme ! "Automatisation totale du concierge virtuel."',
  },
  {
    id: 'grand-compte',
    name: 'GigaSoft Corp.',
    sector: 'Big Tech',
    icon: '🏢',
    bonusPerSecond: 400,          // était 120
    unlockRateRequired: 3_000,
    unlockDialogue: 'GigaSoft Corp. entre dans l\'empire ! Budget illimité. Exécution parfaite attendue.',
  },
  {
    id: 'gouvernement',
    name: 'MinisteIA',
    sector: 'Secteur Public',
    icon: '🏛️',
    bonusPerSecond: 2_000,        // était 500
    unlockRateRequired: 15_000,
    unlockDialogue: 'MinisteIA valide le marché ! L\'État fait confiance à votre agence. Historique.',
  },
  // ── Nouveaux marchés : réservés aux parties après une vente de l'agence ──
  {
    id: 'banque-nova',
    name: 'BanqueNova',
    sector: 'Finance',
    icon: '🏦',
    bonusPerSecond: 10_000,
    unlockRateRequired: 60_000,
    unlockDialogue: 'BanqueNova signe ! "Nos conseillers veulent un assistant qui cite chaque règle interne."',
    minPrestige: 1,
  },
  {
    id: 'eurosante',
    name: 'EuroSanté',
    sector: 'Santé publique',
    icon: '⚕️',
    bonusPerSecond: 50_000,
    unlockRateRequired: 120_000,  // audit : 300 000 ; abaissé pour qu'il signe aussi pendant la 3e partie d'un joueur pressé
    unlockDialogue: 'EuroSanté signe ! 40 hôpitaux, des données sensibles, zéro droit à l\'erreur.',
    minPrestige: 2,
  },
];
