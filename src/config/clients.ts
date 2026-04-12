export interface ClientDef {
  id: string;
  name: string;
  sector: string;
  icon: string;
  bonusPerSecond: number;   // €/s ajoutés une fois déverrouillé
  unlockRateRequired: number; // €/s de production passive nécessaire
}

export const CLIENTS: ClientDef[] = [
  {
    id: 'restaurant-local',
    name: 'Restaurant Local',
    sector: 'Restauration',
    icon: '🍽️',
    bonusPerSecond: 0.5,
    unlockRateRequired: 0.3,
  },
  {
    id: 'cabinet-medical',
    name: 'Cabinet Médical',
    sector: 'Santé',
    icon: '🏥',
    bonusPerSecond: 2,
    unlockRateRequired: 2,
  },
  {
    id: 'pme-ecommerce',
    name: 'PME E-commerce',
    sector: 'Commerce',
    icon: '🛍️',
    bonusPerSecond: 8,
    unlockRateRequired: 10,
  },
  {
    id: 'groupe-hotelier',
    name: 'Groupe Hôtelier',
    sector: 'Hôtellerie',
    icon: '🏨',
    bonusPerSecond: 30,
    unlockRateRequired: 50,
  },
  {
    id: 'grand-compte',
    name: 'Grand Compte CAC40',
    sector: 'Corporate',
    icon: '🏢',
    bonusPerSecond: 120,
    unlockRateRequired: 200,
  },
  {
    id: 'gouvernement',
    name: 'Marché Public',
    sector: 'Gouvernement',
    icon: '🏛️',
    bonusPerSecond: 500,
    unlockRateRequired: 800,
  },
];
