import { t } from '../i18n/i18n.ts';
import { setText } from '../utils/format.ts';
import { spawnInkLetters } from '../utils/gamefeel.ts';

/**
 * LeadLetter — la lettre ambre posée sur la scène du bureau : un vrai bouton (clavier, lecteur
 * d'écran, zone de toucher de 52 px) qui traverse la dalle en arc, suivi d'une traîne de 3 lettres.
 * Avec prefers-reduced-motion, elle reste immobile à un endroit fixe, sans traîne, toujours attrapable.
 * Affiche aussi la pastille de l'effet en cours (« ×3 · 24 s »).
 */

const GLYPH        = '@';   // un lead entrant
const TRAIL        = 3;
const TRAIL_STEP   = 0.035; // décalage de chaque lettre de la traîne sur le trajet
const Y_MIN        = 0.24;  // bande verticale du trajet (part de la hauteur de la scène),
const Y_SPAN       = 0.26;  // au-dessus du bouton de travail posé en bas sur téléphone
const ARC          = 0.12;  // hauteur de l'arc
const STILL_X      = 0.72;  // position fixe (mouvement réduit)
const STILL_Y      = 0.34;
const MARGIN       = 0.06;  // la lettre entre et sort juste hors du cadre

export class LeadLetter {
  private host = document.getElementById('bureau')!;
  private btn: HTMLButtonElement | null = null;
  private trail: HTMLSpanElement[] = [];
  private chip = document.createElement('div');
  private still = false;
  private dir = 1;
  private y0 = 0.3;
  private y1 = 0.4;
  private onCatch: () => void;

  constructor(onCatch: () => void) {
    this.onCatch = onCatch;
    this.chip.className = 'lead-chip hidden';
    this.chip.setAttribute('aria-live', 'polite');
    this.host.appendChild(this.chip);
  }

  /** Fait apparaître la lettre (trajet tiré au hasard, ou position fixe si `still`). */
  show(still: boolean): void {
    this.hide();
    this.still = still;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    this.y0 = Y_MIN + Math.random() * Y_SPAN;
    this.y1 = Y_MIN + Math.random() * Y_SPAN;
    if (!still) {
      for (let i = 0; i < TRAIL; i++) {
        const s = document.createElement('span');
        s.className = 'lead-trail';
        s.textContent = GLYPH;
        s.setAttribute('aria-hidden', 'true');
        s.style.opacity = String(0.45 - i * 0.13);
        this.host.appendChild(s);
        this.trail.push(s);
      }
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lead-letter${still ? ' still' : ''}`;
    btn.innerHTML = `<span aria-hidden="true">${GLYPH}</span>`;
    btn.setAttribute('aria-label', t('lead.aria'));
    btn.addEventListener('click', () => this.onCatch());
    this.host.appendChild(btn);
    this.btn = btn;
    this.update(0);
  }

  /** Position sur le trajet (`progress` de 0 à 1). */
  update(progress: number): void {
    if (!this.btn) return;
    const w = this.host.clientWidth;
    const h = this.host.clientHeight;
    const at = (p: number): [number, number] => {
      if (this.still) return [STILL_X * w, STILL_Y * h];
      const k = Math.max(0, Math.min(1, p));
      const xr = -MARGIN + k * (1 + 2 * MARGIN);
      const x = (this.dir > 0 ? xr : 1 - xr) * w;
      const y = (this.y0 + (this.y1 - this.y0) * k - ARC * Math.sin(Math.PI * k)) * h;
      return [x, y];
    };
    const [x, y] = at(progress);
    this.btn.style.transform = `translate(${x}px, ${y}px)`;
    this.trail.forEach((s, i) => {
      const [tx, ty] = at(progress - TRAIL_STEP * (i + 1));
      s.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  }

  /** Lettre attrapée : elle éclate en petites lettres qui volent vers le compteur, puis disparaît. */
  burst(target: HTMLElement): void {
    if (this.btn) spawnInkLetters(this.btn, target, 8);
    this.hide();
  }

  hide(): void {
    this.btn?.remove();
    this.btn = null;
    this.trail.forEach(s => s.remove());
    this.trail = [];
  }

  /** Pastille de l'effet en cours (texte vide : masquée). */
  setChip(text: string): void {
    this.chip.classList.toggle('hidden', !text);
    setText(this.chip, text);
  }
}
