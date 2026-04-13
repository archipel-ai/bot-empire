export interface ClientDef {
  id: string;
  name: string;
  sector: string;
  icon: string;
  bonusPerSecond: number;
  unlockRateRequired: number;
  unlockDialogue: string; // Message affiché quand le client signe
}

export const CLIENTS: ClientDef[] = [
  {
    id: 'restaurant-local',
    name: 'La Taverne',
    sector: 'Restauration 🍺',
    icon: '🍽️',
    bonusPerSecond: 1.5,          // était 0.5
    unlockRateRequired: 0.2,      // était 0.3
    unlockDialogue: '🍺 La Taverne signe ! "On veut un chatbot pour les réservations."',
  },
  {
    id: 'cabinet-medical',
    name: 'MédiaTech+',
    sector: 'Santé numérique',
    icon: '🏥',
    bonusPerSecond: 8,            // était 2
    unlockRateRequired: 1.5,      // était 2
    unlockDialogue: '💊 MédiaTech+ à bord ! "L\'IA doit rester RGPD-compliant." On gère.',
  },
  {
    id: 'pme-ecommerce',
    name: 'BricoMax',
    sector: 'E-commerce',
    icon: '🛍️',
    bonusPerSecond: 30,           // était 8
    unlockRateRequired: 8,        // était 10
    unlockDialogue: '🛒 BricoMax signe ! "Nos concurrents ont déjà l\'IA. Rattrapez-nous."',
  },
  {
    id: 'groupe-hotelier',
    name: 'PalmHôtel Group',
    sector: 'Hôtellerie & Luxe',
    icon: '🏨',
    bonusPerSecond: 100,          // était 30
    unlockRateRequired: 40,       // était 50
    unlockDialogue: '🌴 PalmHôtel Group confirme ! "Automatisation totale du concierge virtuel."',
  },
  {
    id: 'grand-compte',
    name: 'GigaSoft Corp.',
    sector: 'Big Tech',
    icon: '🏢',
    bonusPerSecond: 400,          // était 120
    unlockRateRequired: 150,      // était 200
    unlockDialogue: '🔥 GigaSoft Corp. entre dans l\'empire ! Budget illimité. Exécution parfaite attendue.',
  },
  {
    id: 'gouvernement',
    name: 'MinisteIA',
    sector: 'Secteur Public',
    icon: '🏛️',
    bonusPerSecond: 2_000,        // était 500
    unlockRateRequired: 600,      // était 800
    unlockDialogue: '🏛️ MinisteIA valide le marché ! L\'État fait confiance à ton agence. Historique.',
  },
];
