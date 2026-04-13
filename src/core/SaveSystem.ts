import { GameState, createInitialState } from './GameState.ts';

const SAVE_KEY      = 'bot-empire-v1';
const PURCHASE_KEY  = 'bot-empire-purchases'; // Jamais exporté — lié à l'appareil
const AUTOSAVE_INT  = 10_000; // 10s

/** Achats réels — device-only, jamais dans les exports ni les URL partagées. */
export interface PurchaseRecord {
  noAds?:          boolean;
  boosterX2Until?: number; // timestamp expiration
  // Ajouter les futurs IAP ici
}

export class SaveSystem {
  private autosaveTimer: ReturnType<typeof setInterval> | null = null;

  // ─── CORE ─────────────────────────────────────────────────

  save(state: GameState): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastSave: Date.now() }));
    } catch { /* localStorage plein — silencieux */ }
  }

  load(): GameState {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return createInitialState();
      return this.merge(JSON.parse(raw) as Partial<GameState>);
    } catch {
      return createInitialState();
    }
  }

  reset(): void { localStorage.removeItem(SAVE_KEY); }

  startAutosave(getState: () => GameState): void {
    this.autosaveTimer = setInterval(() => this.save(getState()), AUTOSAVE_INT);

    // iOS PWA : les setInterval s'arrêtent en arrière-plan.
    // On sauvegarde dès que l'app est masquée / fermée — garantit que lastSave est à jour.
    const saveNow = () => this.save(getState());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveNow();
    });
    window.addEventListener('pagehide', saveNow);
    window.addEventListener('beforeunload', saveNow);
  }

  stopAutosave(): void {
    if (this.autosaveTimer !== null) { clearInterval(this.autosaveTimer); this.autosaveTimer = null; }
  }

  getOfflineSeconds(state: GameState): number {
    return Math.min((Date.now() - state.lastSave) / 1000, 8 * 3600);
  }

  isFirstTime(): boolean {
    return !localStorage.getItem(SAVE_KEY);
  }

  // ─── ACHATS (device-only) ─────────────────────────────────

  getPurchases(): PurchaseRecord {
    try { return JSON.parse(localStorage.getItem(PURCHASE_KEY) ?? '{}'); }
    catch { return {}; }
  }

  setPurchase<K extends keyof PurchaseRecord>(key: K, value: PurchaseRecord[K]): void {
    const p = this.getPurchases();
    p[key] = value;
    localStorage.setItem(PURCHASE_KEY, JSON.stringify(p));
  }

  hasNoAds(): boolean { return !!this.getPurchases().noAds; }

  hasBooster(): boolean {
    const until = this.getPurchases().boosterX2Until ?? 0;
    return until > Date.now();
  }

  // ─── EXPORT / IMPORT ──────────────────────────────────────

  exportToFile(state: GameState): void {
    const data   = JSON.stringify({ ...state, lastSave: Date.now() }, null, 2);
    const blob   = new Blob([data], { type: 'application/json' });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement('a');
    a.href       = url;
    a.download   = `bot-empire-save-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importFromText(raw: string): GameState | null {
    try {
      const parsed = JSON.parse(raw) as Partial<GameState>;
      if (typeof parsed.currency !== 'number') return null;
      return this.merge(parsed);
    } catch { return null; }
  }

  // ─── URL SHARE ────────────────────────────────────────────

  encodeForURL(state: GameState): string {
    const json   = JSON.stringify({ ...state, lastSave: Date.now() });
    const bytes  = new TextEncoder().encode(json);
    const b64    = btoa(String.fromCharCode(...bytes));
    return `${window.location.origin}${window.location.pathname}#save=${encodeURIComponent(b64)}`;
  }

  decodeFromURL(): GameState | null {
    try {
      const hash = window.location.hash;
      if (!hash.startsWith('#save=')) return null;
      const b64   = decodeURIComponent(hash.slice(6));
      const chars = atob(b64);
      const bytes = Uint8Array.from(chars, c => c.charCodeAt(0));
      const json  = new TextDecoder().decode(bytes);
      const parsed = JSON.parse(json) as Partial<GameState>;
      if (typeof parsed.currency !== 'number') return null;
      return this.merge(parsed);
    } catch { return null; }
  }

  // ─── PRIVATE ──────────────────────────────────────────────

  private merge(partial: Partial<GameState>): GameState {
    const initial = createInitialState();
    return {
      ...initial,
      ...partial,
      agents:              { ...initial.agents,              ...(partial.agents              ?? {}) },
      clientsUnlocked:     { ...initial.clientsUnlocked,     ...(partial.clientsUnlocked     ?? {}) },
      upgradesPurchased:   { ...initial.upgradesPurchased,   ...(partial.upgradesPurchased   ?? {}) },
      reputationPurchased: { ...initial.reputationPurchased, ...(partial.reputationPurchased ?? {}) },
      reputationPoints:    partial.reputationPoints ?? 0,
    };
  }
}
