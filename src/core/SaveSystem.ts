import { GameState, createInitialState } from './GameState.ts';

const SAVE_KEY = 'bot-empire-v1';
const AUTOSAVE_INTERVAL = 10_000; // 10s

export class SaveSystem {
  private autosaveTimer: ReturnType<typeof setInterval> | null = null;

  save(state: GameState): void {
    try {
      const payload = { ...state, lastSave: Date.now() };
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage plein ou bloqué — on ignore silencieusement
    }
  }

  load(): GameState {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return createInitialState();
      const parsed = JSON.parse(raw) as Partial<GameState>;
      // Fusion avec l'état initial pour garantir les nouveaux champs
      const initial = createInitialState();
      return {
        ...initial,
        ...parsed,
        agents: { ...initial.agents, ...(parsed.agents ?? {}) },
        clientsUnlocked: { ...initial.clientsUnlocked, ...(parsed.clientsUnlocked ?? {}) },
        upgradesPurchased: { ...initial.upgradesPurchased, ...(parsed.upgradesPurchased ?? {}) },
      };
    } catch {
      return createInitialState();
    }
  }

  reset(): void {
    localStorage.removeItem(SAVE_KEY);
  }

  startAutosave(getState: () => GameState): void {
    this.autosaveTimer = setInterval(() => {
      this.save(getState());
    }, AUTOSAVE_INTERVAL);
  }

  stopAutosave(): void {
    if (this.autosaveTimer !== null) {
      clearInterval(this.autosaveTimer);
      this.autosaveTimer = null;
    }
  }

  /** Calcule le temps écoulé depuis la dernière sauvegarde (en secondes). */
  getOfflineSeconds(state: GameState): number {
    const elapsed = (Date.now() - state.lastSave) / 1000;
    // Maximum 8h de production offline
    return Math.min(elapsed, 8 * 3600);
  }
}
