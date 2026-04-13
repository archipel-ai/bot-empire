/**
 * CloudSave — Backup Firebase Realtime Database.
 *
 * Stratégie :
 * - localStorage reste la source principale (autosave 10s, pas de Firebase)
 * - Firebase = backup cloud (sync toutes les 5 min + fermeture onglet)
 * - Au 1er lancement sur un nouvel appareil → restauration automatique si save cloud plus récente
 * - Auth anonyme → uid stable par device, pas de compte requis
 */

import { initializeApp, type FirebaseApp }        from 'firebase/app';
import { getAuth, signInAnonymously, type Auth, type User } from 'firebase/auth';
import { getDatabase, ref, set, get, type Database }        from 'firebase/database';
import { GameState, createInitialState }           from './GameState.ts';

const DB_PATH      = 'saves';
const DB_VERSION   = 'v1';
const SYNC_MS      = 5 * 60 * 1000; // 5 min

export class CloudSave {
  private app:   FirebaseApp | null = null;
  private auth:  Auth        | null = null;
  private db:    Database    | null = null;
  private user:  User        | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private ready  = false;

  // ─── INIT ─────────────────────────────────────────────────

  async init(config: object): Promise<boolean> {
    try {
      this.app  = initializeApp(config, 'bot-empire');
      this.auth = getAuth(this.app);
      this.db   = getDatabase(this.app);
      const cred = await signInAnonymously(this.auth);
      this.user  = cred.user;
      this.ready = true;
      console.info(`[CloudSave] connecté — uid: ${this.user.uid}`);
      return true;
    } catch (e) {
      console.warn('[CloudSave] init échoué (mode offline)', e);
      return false;
    }
  }

  isReady(): boolean { return this.ready && !!this.user && !!this.db; }
  getUserId(): string | null { return this.user?.uid ?? null; }

  // ─── PUSH ─────────────────────────────────────────────────

  async push(state: GameState): Promise<void> {
    if (!this.isReady()) return;
    try {
      await set(
        ref(this.db!, `${DB_PATH}/${this.user!.uid}/${DB_VERSION}`),
        { ...state, lastCloudSync: Date.now() },
      );
    } catch (e) {
      console.warn('[CloudSave] push échoué', e);
    }
  }

  // ─── PULL ─────────────────────────────────────────────────

  async pull(): Promise<GameState | null> {
    if (!this.isReady()) return null;
    try {
      const snap = await get(ref(this.db!, `${DB_PATH}/${this.user!.uid}/${DB_VERSION}`));
      if (!snap.exists()) return null;
      return this.merge(snap.val() as Partial<GameState>);
    } catch (e) {
      console.warn('[CloudSave] pull échoué', e);
      return null;
    }
  }

  /**
   * Récupère la save cloud et la compare à la save locale.
   * Retourne la save cloud si elle est plus récente, null sinon.
   */
  async getIfNewer(localState: GameState): Promise<GameState | null> {
    const cloud = await this.pull();
    if (!cloud) return null;
    if (cloud.lastSave > localState.lastSave + 60_000) return cloud; // 1 min de marge
    return null;
  }

  // ─── AUTO SYNC ────────────────────────────────────────────

  startAutoSync(getState: () => GameState): void {
    this.timer = setInterval(() => { this.push(getState()); }, SYNC_MS);

    // Sync à la fermeture de l'onglet (sendBeacon n'est pas dispo pour Firebase → on tente set())
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.push(getState());
    });
    window.addEventListener('pagehide', () => { this.push(getState()); });
  }

  stopAutoSync(): void {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  // ─── PRIVATE ──────────────────────────────────────────────

  private merge(partial: Partial<GameState>): GameState {
    const initial = createInitialState();
    return {
      ...initial,
      ...partial,
      agents:            { ...initial.agents,            ...(partial.agents            ?? {}) },
      clientsUnlocked:   { ...initial.clientsUnlocked,   ...(partial.clientsUnlocked   ?? {}) },
      upgradesPurchased: { ...initial.upgradesPurchased,  ...(partial.upgradesPurchased  ?? {}) },
    };
  }
}
