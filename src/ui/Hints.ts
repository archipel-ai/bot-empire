import { t } from '../i18n/i18n.ts';
import type { UiKey } from '../i18n/ui.ts';

/**
 * Hints — bulles d'aide non bloquantes, affichées au bon moment.
 * Remplace l'ancien tutoriel en fenêtres modales : le jeu reste jouable,
 * chaque bulle pointe un élément et disparaît dès que l'action est faite.
 */

export type HintId = 'first-click' | 'first-agent' | 'first-client';

interface HintDef {
  text:    UiKey;
  targets: string[]; // sélecteurs par ordre de priorité — le premier visible gagne
}

const HINTS: Record<HintId, HintDef> = {
  'first-click': {
    text:    'hint.firstClick',
    targets: ['#click-fab', '#btn-click'],
  },
  'first-agent': {
    text:    'hint.firstAgent',
    targets: ['[data-agent="bot-workflows"] .btn-buy', '.tab[data-tab="agents"]'],
  },
  'first-client': {
    text:    'hint.firstClient',
    targets: ['.tab[data-tab="clients"]'],
  },
};

const SEEN_KEY       = 'bot-empire-hints';
const LEGACY_TUTO_KEY = 'tuto-done'; // ancien tutoriel : les joueurs l'ayant fini ne revoient pas les bulles
const BUBBLE_W       = 260;
const GAP            = 12;

export class Hints {
  private seen:     Set<HintId>;
  private activeId: HintId | null = null;
  private bubble:   HTMLElement | null = null;
  private autoHide: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.seen = this.load();
  }

  /** Affiche une bulle si elle n'a jamais été vue. Idempotent. `autoHideMs` la retire seule. */
  show(id: HintId, autoHideMs?: number): void {
    if (this.seen.has(id) || this.activeId === id) return;
    if (this.activeId) this.dismiss(this.activeId);

    const el = document.createElement('div');
    el.className = 'hint-bubble';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = `<span class="hint-text"></span><button class="hint-close" type="button">×</button>`;
    el.querySelector('.hint-text')!.textContent = t(HINTS[id].text);
    el.querySelector('.hint-close')!.setAttribute('aria-label', t('hint.close'));
    el.querySelector('.hint-close')!.addEventListener('click', () => this.dismiss(id));
    document.body.appendChild(el);

    this.bubble   = el;
    this.activeId = id;
    this.reposition();
    if (autoHideMs) this.autoHide = setTimeout(() => this.dismiss(id), autoHideMs);
  }

  /** Retire la bulle (si active) et la marque comme vue pour toujours. */
  dismiss(id: HintId): void {
    if (!this.seen.has(id)) {
      this.seen.add(id);
      this.save();
    }
    if (this.activeId !== id) return;
    if (this.autoHide) { clearTimeout(this.autoHide); this.autoHide = null; }
    this.bubble?.remove();
    this.bubble   = null;
    this.activeId = null;
  }

  isSeen(id: HintId): boolean { return this.seen.has(id); }

  /** Recalé à chaque frame : les cibles peuvent être re-rendues ou bouger (scroll, onglets). */
  reposition(): void {
    if (!this.bubble || !this.activeId) return;
    const target = this.findTarget(HINTS[this.activeId].targets);
    if (!target) { this.bubble.style.visibility = 'hidden'; return; }

    const r  = target.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bh = this.bubble.offsetHeight;
    const w  = Math.min(BUBBLE_W, vw - GAP * 2);

    // Au-dessus de la cible si possible (la main du joueur est souvent en bas), sinon en dessous
    const above = r.top - bh - GAP >= GAP;
    const top   = above ? r.top - bh - GAP : Math.min(r.bottom + GAP, vh - bh - GAP);
    let left    = r.left + r.width / 2 - w / 2;
    left        = Math.max(GAP, Math.min(left, vw - w - GAP));

    this.bubble.style.width      = `${w}px`;
    this.bubble.style.top        = `${top}px`;
    this.bubble.style.left       = `${left}px`;
    this.bubble.style.visibility = '';
    this.bubble.style.setProperty('--arrow-x', `${Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14))}px`);
    this.bubble.classList.toggle('below', !above);
  }

  private findTarget(selectors: string[]): HTMLElement | null {
    for (const sel of selectors) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el && el.getClientRects().length > 0) return el;
    }
    return null;
  }

  private load(): Set<HintId> {
    try {
      const raw = localStorage.getItem(SEEN_KEY);
      if (raw) return new Set(JSON.parse(raw) as HintId[]);
      if (localStorage.getItem(LEGACY_TUTO_KEY)) return new Set(Object.keys(HINTS) as HintId[]);
    } catch { /* silencieux */ }
    return new Set();
  }

  private save(): void {
    try { localStorage.setItem(SEEN_KEY, JSON.stringify([...this.seen])); }
    catch { /* silencieux */ }
  }
}
