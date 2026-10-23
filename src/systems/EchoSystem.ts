/**
 * Système ÉCHO — mécanique unique de Bot Empire.
 *
 * Enregistre les intervalles entre vos clics manuels (30s glissantes),
 * puis les rejoue automatiquement pendant 60s quand vous activez l'ÉCHO.
 * Cooldown : 2 minutes.
 * Les clics sortent de la fenêtre au fil du temps, pas seulement au clic suivant :
 * le compteur affiché baisse donc en continu pendant une pause.
 */

export interface EchoState {
  canActivate: boolean;
  isActive: boolean;
  isOnCooldown: boolean;
  replayRemaining: number;   // secondes restantes en mode replay
  cooldownRemaining: number; // secondes restantes de cooldown
  clicksRecorded: number;    // nombre de clics enregistrés
  replayDuration: number;    // durée totale d'un rejeu (s)
  cooldownDuration: number;  // durée totale de la recharge (s)
}

const RECORD_WINDOW_MS  = 30_000; // on mémorise les 30 dernières secondes
const MIN_CLICKS        = 3;      // minimum pour activer
const REPLAY_DURATION_S = 60;     // durée du replay
const BASE_COOLDOWN_S   = 120;    // 2 minutes de cooldown

export class EchoSystem {
  /** Horloge en ms, remplaçable dans les tests. */
  private readonly now: () => number;
  constructor(now: () => number = Date.now) { this.now = now; }

  private clickTimestamps: number[] = [];
  private intervals: number[]       = [];

  private active             = false;
  private replayTimer        = 0;
  private cooldownTimer      = 0;
  private replayIdx          = 0;
  private nextClickIn        = 0; // secondes avant le prochain clic auto
  private cooldownMultiplier = 1; // modifié par la réputation
  private replayDuration     = REPLAY_DURATION_S; // 90 s avec la leçon « Pour qui j'écris ? »

  // ─── API PUBLIQUE ────────────────────────────────────────────

  setCooldownMultiplier(mult: number): void {
    this.cooldownMultiplier = mult;
  }

  /** Durée d'un rejeu (Academy). */
  setReplayDuration(seconds: number): void {
    this.replayDuration = seconds;
  }

  /** Appelé à chaque clic manuel du joueur. */
  recordClick(): void {
    this.clickTimestamps.push(this.now());
    this.prune();
  }

  /** Oublie les clics sortis de la fenêtre de 30 s et recalcule les intervalles. */
  private prune(): void {
    const now = this.now();
    const kept = this.clickTimestamps.filter(t => now - t <= RECORD_WINDOW_MS);
    if (kept.length === this.clickTimestamps.length && this.intervals.length === Math.max(0, kept.length - 1)) return;
    this.clickTimestamps = kept;
    this.intervals = [];
    for (let i = 1; i < this.clickTimestamps.length; i++) {
      this.intervals.push((this.clickTimestamps[i] - this.clickTimestamps[i - 1]) / 1000);
    }
  }

  canActivate(): boolean {
    this.prune();
    return !this.active && this.cooldownTimer <= 0 && this.clickTimestamps.length >= MIN_CLICKS;
  }

  activate(): void {
    if (!this.canActivate()) return;
    this.active      = true;
    this.replayTimer = this.replayDuration;
    this.replayIdx   = 0;
    // Premier clic auto : délai médian des intervalles enregistrés
    const med = this.intervals.length > 0
      ? [...this.intervals].sort((a, b) => a - b)[Math.floor(this.intervals.length / 2)]
      : 0.5;
    this.nextClickIn = med;
  }

  /**
   * Tick du système ÉCHO. Retourne le nombre de clics automatiques
   * à appliquer ce tick.
   */
  tick(dt: number): number {
    if (!this.active) {
      if (this.cooldownTimer > 0) {
        this.cooldownTimer = Math.max(0, this.cooldownTimer - dt);
      }
      return 0;
    }

    this.replayTimer -= dt;
    if (this.replayTimer <= 0) {
      this.active        = false;
      this.cooldownTimer = BASE_COOLDOWN_S * this.cooldownMultiplier;
      return 0;
    }

    // Simuler les clics selon les intervalles enregistrés
    let clicks = 0;
    this.nextClickIn -= dt;
    while (this.nextClickIn <= 0 && this.intervals.length > 0) {
      clicks++;
      this.replayIdx = (this.replayIdx + 1) % this.intervals.length;
      this.nextClickIn += this.intervals[this.replayIdx] ?? 0.5;
    }

    return clicks;
  }

  getState(): EchoState {
    return {
      canActivate:       this.canActivate(),
      isActive:          this.active,
      isOnCooldown:      this.cooldownTimer > 0,
      replayRemaining:   Math.ceil(this.replayTimer),
      cooldownRemaining: Math.ceil(this.cooldownTimer),
      cooldownDuration:  BASE_COOLDOWN_S * this.cooldownMultiplier,
      clicksRecorded:    this.clickTimestamps.length,
      replayDuration:    this.replayDuration,
    };
  }
}
