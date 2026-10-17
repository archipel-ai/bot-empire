/**
 * LeadSystem — la lettre ambre (un « lead entrant ») à attraper.
 * Toutes les 3 à 6 min de jeu actif (onglet visible, aucune fenêtre ouverte), une lettre traverse
 * la dalle (8 s ; 12 s immobile avec prefers-reduced-motion). La toucher tire un effet au hasard.
 * Rien n'est sauvegardé : minuteurs en mémoire. Aucune logique d'affichage ici (voir ui/LeadLetter.ts).
 */

export type LeadEffect = 'boost' | 'cash' | 'click';

const FIRST_LEAD_MIN_S = 120; // 1re lettre : 2 à 4 min de jeu actif
const FIRST_LEAD_SPAN_S = 120;
const LEAD_MIN_S       = 180; // suivantes : 3 à 6 min
const LEAD_SPAN_S      = 180;
export const LEAD_FLIGHT_S = 8;   // traversée de la dalle
export const LEAD_STILL_S  = 12;  // version immobile (mouvement réduit)

const BOOST_SHARE   = 0.55; // « Lead chaud » : revenu ×3 pendant 30 s
const CASH_SHARE    = 0.35; // « Contrat signé sur le champ » : 5 min de production, plafonnée
export const BOOST_MULT = 3;
export const BOOST_S    = 30;
export const CASH_SECONDS = 300;
export const CASH_CAP   = 0.10; // … à 10 % de l'argent en poche
export const CLICK_MULT = 10;   // « Le fondateur s'y met » : clic ×10 pendant 15 s
export const CLICK_S    = 15;

export interface LeadCatch {
  effect: LeadEffect;
  amount: number; // euros gagnés tout de suite (effet « cash »), 0 sinon
}

/** Gain immédiat de l'effet « cash » : 5 min de production, au plus 10 % de l'argent en poche. */
export function getLeadCashReward(rate: number, currency: number): number {
  return Math.max(0, Math.min(CASH_SECONDS * rate, CASH_CAP * currency));
}

export class LeadSystem {
  private nextIn: number;
  private onScreen = 0;   // secondes restantes de la lettre visible (0 : aucune)
  private boostLeft = 0;
  private clickLeft = 0;
  private rng: () => number;

  constructor(rng: () => number = Math.random) {
    this.rng = rng;
    this.nextIn = FIRST_LEAD_MIN_S + this.rng() * FIRST_LEAD_SPAN_S;
  }

  /**
   * Avance de `dt` secondes. `canSpawn` : onglet visible, aucune fenêtre, scène dégagée.
   * `intervalMult` : 0,8 avec la leçon « streaming ». `still` : mouvement réduit (lettre immobile, 12 s).
   * Retourne 'spawn' quand une lettre apparaît, 'expire' quand elle repart sans avoir été touchée.
   */
  tick(dt: number, canSpawn: boolean, intervalMult = 1, still = false): 'spawn' | 'expire' | null {
    if (this.boostLeft > 0) this.boostLeft = Math.max(0, this.boostLeft - dt);
    if (this.clickLeft > 0) this.clickLeft = Math.max(0, this.clickLeft - dt);
    if (this.onScreen > 0) {
      this.onScreen = Math.max(0, this.onScreen - dt);
      if (this.onScreen === 0) { this.schedule(intervalMult); return 'expire'; }
      return null;
    }
    if (!canSpawn) return null;
    this.nextIn -= dt;
    if (this.nextIn > 0) return null;
    this.onScreen = still ? LEAD_STILL_S : LEAD_FLIGHT_S;
    return 'spawn';
  }

  isOnScreen(): boolean { return this.onScreen > 0; }

  /** Part du trajet déjà parcourue (0 → 1) pour l'affichage. */
  getProgress(still = false): number {
    const total = still ? LEAD_STILL_S : LEAD_FLIGHT_S;
    return this.onScreen > 0 ? 1 - this.onScreen / total : 0;
  }

  /** La lettre est touchée : tire un effet au hasard. `rate` et `currency` servent à l'effet « cash ». */
  catch(rate: number, currency: number, intervalMult = 1): LeadCatch | null {
    if (this.onScreen <= 0) return null;
    this.onScreen = 0;
    this.schedule(intervalMult);
    const x = this.rng();
    if (x < BOOST_SHARE) {
      this.boostLeft = BOOST_S; // un 2e ×3 ne se cumule pas : le temps restant repart à 30 s
      return { effect: 'boost', amount: 0 };
    }
    if (x < BOOST_SHARE + CASH_SHARE) return { effect: 'cash', amount: getLeadCashReward(rate, currency) };
    this.clickLeft = CLICK_S;
    return { effect: 'click', amount: 0 };
  }

  getIncomeMultiplier(): number { return this.boostLeft > 0 ? BOOST_MULT : 1; }
  getClickMultiplier(): number { return this.clickLeft > 0 ? CLICK_MULT : 1; }
  getBoostSeconds(): number { return Math.ceil(this.boostLeft); }
  getClickSeconds(): number { return Math.ceil(this.clickLeft); }

  private schedule(intervalMult: number): void {
    this.nextIn = (LEAD_MIN_S + this.rng() * LEAD_SPAN_S) * intervalMult;
  }
}
