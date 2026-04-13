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

// ─── CONFETTIS PRESTIGE ───────────────────────────────────────

const CONFETTI_COLORS = ['#00ff88', '#7c3aed', '#38bdf8', '#f97316', '#fbbf24', '#ec4899'];

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

export function flashScreen(color: string = 'rgba(0,255,136,0.08)'): void {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;inset:0;background:${color};
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
