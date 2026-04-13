/**
 * MarketSystem — Événements aléatoires du marché IA.
 * Un événement se déclenche toutes les 15-30 min, dure quelques minutes,
 * et applique un multiplicateur de revenus ou de clic.
 */

import { MARKET_EVENTS, MarketEventDef } from '../config/marketEvents.ts';

export interface ActiveMarketEvent {
  event:  MarketEventDef;
  endsAt: number;  // timestamp
}

const SAVE_KEY   = 'bot-empire-market';
const MIN_GAP_MS = 15 * 60 * 1000;  // 15 min entre événements
const MAX_GAP_MS = 30 * 60 * 1000;  // 30 min max

export class MarketSystem {
  private current:     ActiveMarketEvent | null = null;
  private nextEventAt: number = 0;
  private recentIds:   string[] = [];
  private onEvent?: (ev: ActiveMarketEvent) => void;
  private onEnd?:   (ev: ActiveMarketEvent) => void;

  constructor() {
    this.load();
    // Si pas de timer chargé, planifier le premier
    if (this.nextEventAt === 0) this.scheduleNext(2 * 60 * 1000); // 2 min au tout premier lancement
  }

  setCallbacks(onEvent: (ev: ActiveMarketEvent) => void, onEnd: (ev: ActiveMarketEvent) => void): void {
    this.onEvent = onEvent;
    this.onEnd   = onEnd;
  }

  // Appelé à chaque tick du game loop — renvoie l'événement actif ou null
  tick(): ActiveMarketEvent | null {
    const now = Date.now();

    // Fin d'événement en cours
    if (this.current && now >= this.current.endsAt) {
      const ended = this.current;
      this.current = null;
      this.scheduleNext();
      this.save();
      this.onEnd?.(ended);
    }

    // Démarrer un nouvel événement
    if (!this.current && now >= this.nextEventAt) {
      this.startRandom();
    }

    return this.current;
  }

  getCurrent(): ActiveMarketEvent | null { return this.current; }

  getIncomeMultiplier(): number {
    if (!this.current) return 1;
    return this.current.event.effect.type === 'income' ? this.current.event.effect.multiplier : 1;
  }

  getClickMultiplier(): number {
    if (!this.current) return 1;
    return this.current.event.effect.type === 'click' ? this.current.event.effect.multiplier : 1;
  }

  // ─── PRIVATE ──────────────────────────────────────────────

  private startRandom(): void {
    const available = MARKET_EVENTS.filter(e => !this.recentIds.includes(e.id));
    const pool = available.length > 0 ? available : MARKET_EVENTS;
    const event = pool[Math.floor(Math.random() * pool.length)]!;

    this.current = {
      event,
      endsAt: Date.now() + event.durationMin * 60 * 1000,
    };

    this.recentIds.push(event.id);
    if (this.recentIds.length > 4) this.recentIds.shift();

    this.save();
    this.onEvent?.(this.current);
  }

  private scheduleNext(overrideMs?: number): void {
    const delay = overrideMs ?? (MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS));
    this.nextEventAt = Date.now() + delay;
  }

  private save(): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        current:     this.current,
        nextEventAt: this.nextEventAt,
        recentIds:   this.recentIds,
      }));
    } catch { /* silencieux */ }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.current && data.current.endsAt > Date.now()) this.current = data.current;
      if (data.nextEventAt) this.nextEventAt = data.nextEventAt;
      if (data.recentIds)   this.recentIds   = data.recentIds;
    } catch { /* silencieux */ }
  }
}
