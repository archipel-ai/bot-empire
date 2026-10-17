import { t, LANG } from '../i18n/i18n.ts';

const SUFFIXES_EN = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
const SUFFIXES_FR = ['', 'k', 'M', 'Md', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
const FR = LANG === 'fr';
const NBSP = '\u202f'; // espace fine insécable, comme en typographie française

export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value) || isNaN(value)) return '0';
  const comma = (s: string) => (FR ? s.replace('.', ',') : s);
  if (value < 1000) return comma(value.toFixed(decimals));
  const suffixes = FR ? SUFFIXES_FR : SUFFIXES_EN;
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  // Au-delà du dernier suffixe : notation scientifique (« 1,23e33 ») plutôt qu'un suffixe faux
  if (tier >= suffixes.length) {
    const exp = Math.floor(Math.log10(Math.abs(value)));
    return `${comma((value / Math.pow(10, exp)).toFixed(decimals))}e${exp}`;
  }
  const suffix = suffixes[tier];
  const scaled = value / Math.pow(1000, tier);
  return FR ? `${comma(scaled.toFixed(decimals))}${NBSP}${suffix}` : `${scaled.toFixed(decimals)}${suffix}`;
}

/** Français : « 43,18 k€ », « 0,15 € ». Anglais : « €43.18K ». */
export function formatCurrency(value: number, decimals = 2): string {
  if (!FR) return `€${formatNumber(value, decimals)}`;
  const n = formatNumber(value, decimals);
  return n.includes(NBSP) ? `${n}€` : `${n}${NBSP}€`;
}

/** Multiplicateur court : « ×1,5 », « ×2,25 » (anglais : « ×1.5 »). */
export function formatMultiplier(value: number): string {
  const s = String(Math.round(value * 100) / 100);
  return `×${FR ? s.replace('.', ',') : s}`;
}

export function formatRate(value: number): string {
  return `+${formatCurrency(value)}/s`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return t('duration.days', { n: Math.floor(seconds / 86400) });
}
