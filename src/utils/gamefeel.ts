import { formatCurrency } from './format.ts';

// ─── CHIFFRES FLOTTANTS ───────────────────────────────────────

export function spawnFloatingNumber(value: number, originEl: HTMLElement): void {
  const rect = originEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'floating-number';
  el.textContent = `+${formatCurrency(value)}`;
  const xOffset = (Math.random() - 0.5) * 50;
  el.style.left = `${rect.left + rect.width / 2 + xOffset}px`;
  el.style.top  = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

// ─── LETTRES QUI S'ENVOLENT ──────────────────────────────────

const INK_LETTERS     = 'abcdefghijklmnopqrstuvwxyz€';
const MAX_INK_FLIGHTS = 40; // au-delà (clics très rapides), on n'en ajoute plus
let inkFlights = 0;

/**
 * Quelques lettres d'encre s'envolent de `from` vers `to` en arc (clic → compteur d'argent).
 * Rien avec prefers-reduced-motion.
 */
export function spawnInkLetters(from: HTMLElement, to: HTMLElement, count = 4): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  if (b.width === 0) return;
  for (let i = 0; i < count && inkFlights < MAX_INK_FLIGHTS; i++) {
    const el = document.createElement('span');
    el.className = 'ink-letter';
    el.textContent = INK_LETTERS[Math.floor(Math.random() * INK_LETTERS.length)]!;
    const x0 = a.left + a.width * (0.3 + Math.random() * 0.4);
    const y0 = a.top + a.height * 0.4;
    const x1 = b.left + b.width * (0.2 + Math.random() * 0.6);
    const y1 = b.top + b.height * 0.5;
    const mx = (x0 + x1) / 2 + (Math.random() - 0.5) * 160;
    const my = Math.min(y0, y1) - 40 - Math.random() * 80;
    el.style.left = '0px';
    el.style.top  = '0px';
    document.body.appendChild(el);
    inkFlights++;
    const anim = el.animate([
      { transform: `translate(${x0}px, ${y0}px) scale(1)`, opacity: 0 },
      { transform: `translate(${mx}px, ${my}px) scale(1.25)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${x1}px, ${y1}px) scale(.6)`, opacity: 0.2 },
    ], { duration: 620 + Math.random() * 260, delay: i * 45, easing: 'cubic-bezier(.3,.1,.3,1)', fill: 'both' });
    anim.onfinish = () => { el.remove(); inkFlights--; };
  }
}

// ─── CONFETTIS PRESTIGE ───────────────────────────────────────

// Jetons de la direction artistique (voir style.css)
const CONFETTI_COLORS = ['var(--outremer)', 'var(--ambre)', 'var(--encre)', 'var(--brume)'];

export function spawnPrestigeConfetti(): void {
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      el.style.left             = `${Math.random() * 100}vw`;
      el.style.background       = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!;
      el.style.animationDuration = `${0.9 + Math.random() * 1.4}s`;
      el.style.animationDelay   = `0s`;
      el.style.width            = `${6 + Math.random() * 8}px`;
      el.style.height           = `${6 + Math.random() * 8}px`;
      el.style.borderRadius     = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2500);
    }, i * 25);
  }
}

// ─── FLASH MILESTONE ─────────────────────────────────────────

export type FlashTone = 'outremer' | 'ambre';

/** Voile bref sur tout l'écran, teinté d'un jeton de couleur (`strength` en %). */
export function flashScreen(tone: FlashTone = 'outremer', strength = 8): void {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;inset:0;background:color-mix(in srgb, var(--${tone}) ${strength}%, transparent);
    pointer-events:none;z-index:9998;
    animation:screen-flash 0.4s ease forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 400);
}

// ─── TYPAGE ANIMÉ (pour Academy) ─────────────────────────────

export function typeText(
  el: HTMLElement,
  text: string,
  speedMs = 12,
  onComplete?: () => void,
): void {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      onComplete?.();
    }
  }, speedMs);
}
