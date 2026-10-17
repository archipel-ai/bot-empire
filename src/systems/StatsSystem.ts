/**
 * StatsSystem — le registre de statistiques, gardé sur l'appareil (clé `bot-empire-stats`).
 * Aucun champ dans GameState (règles Firebase) : un joueur qui change d'appareil repart de zéro
 * ici, ce qui est acceptable. Sert au joueur (page « Registre ») et à nous (bouton « Copier mes
 * statistiques », à coller en commentaire sur itch.io : notre seule mesure sans serveur).
 */

const STATS_KEY = 'bot-empire-stats';
const SAVE_EVERY_S = 10;

export interface Stats {
  playSeconds:     number;   // temps de jeu actif, toutes parties
  runSeconds:      number;   // temps de jeu de la partie en cours
  clicks:          number;   // clics manuels
  bestRate:        number;   // meilleur revenu par seconde (hors effets temporaires)
  pastRunsEarned:  number;   // gains des parties terminées (depuis la 1.2)
  lettersSeen:     number;
  lettersCaught:   number;
  contractsDone:   number;
  incidentsSeen:   number;
  incidentsSolved: number;
  lessonsLearned:  number;   // leçons acquises par une bonne réponse (hors report)
  lessonsFirstTry: number;   // … dès le premier essai
  wrongLessons:    string[]; // leçons déjà ratées une fois (pour le « premier essai »)
}

function blank(): Stats {
  return {
    playSeconds: 0, runSeconds: 0, clicks: 0, bestRate: 0, pastRunsEarned: 0,
    lettersSeen: 0, lettersCaught: 0, contractsDone: 0, incidentsSeen: 0, incidentsSolved: 0,
    lessonsLearned: 0, lessonsFirstTry: 0, wrongLessons: [],
  };
}

const finite = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : 0);

export class StatsSystem {
  private s: Stats = blank();
  private sinceSave = 0;

  constructor() {
    this.load();
    const saveNow = () => this.save();
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });
    window.addEventListener('pagehide', saveNow);
  }

  get(): Readonly<Stats> { return this.s; }

  /** Temps de jeu et meilleur revenu, à chaque pas de la boucle. */
  tick(dt: number, rate: number): void {
    this.s.playSeconds += dt;
    this.s.runSeconds += dt;
    if (rate > this.s.bestRate && Number.isFinite(rate)) this.s.bestRate = rate;
    this.sinceSave += dt;
    if (this.sinceSave >= SAVE_EVERY_S) this.save();
  }

  addClick(): void { this.s.clicks++; }
  letterSeen(): void { this.s.lettersSeen++; }
  letterCaught(): void { this.s.lettersCaught++; this.save(); }
  contractDone(): void { this.s.contractsDone++; }
  incidentSeen(): void { this.s.incidentsSeen++; }
  incidentSolved(): void { this.s.incidentsSolved++; }

  lessonWrong(lessonId: string): void {
    if (!this.s.wrongLessons.includes(lessonId)) this.s.wrongLessons.push(lessonId);
  }

  lessonLearned(lessonId: string): void {
    this.s.lessonsLearned++;
    if (!this.s.wrongLessons.includes(lessonId)) this.s.lessonsFirstTry++;
    this.save();
  }

  /** Vente de l'agence : les gains de la partie rejoignent le total, la partie repart de zéro. */
  prestige(runEarned: number): void {
    this.s.pastRunsEarned += finite(runEarned);
    this.s.runSeconds = 0;
    this.save();
  }

  save(): void {
    this.sinceSave = 0;
    try { localStorage.setItem(STATS_KEY, JSON.stringify(this.s)); }
    catch { /* stockage indisponible : registre limité à la session */ }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Partial<Record<keyof Stats, unknown>>;
      const s = blank();
      for (const k of Object.keys(s) as Array<keyof Stats>) {
        if (k === 'wrongLessons') continue;
        (s[k] as number) = finite(p[k]);
      }
      s.wrongLessons = Array.isArray(p.wrongLessons) ? p.wrongLessons.filter((x): x is string => typeof x === 'string') : [];
      this.s = s;
    } catch { /* registre illisible : on repart de zéro */ }
  }
}
