/**
 * i18n — module bilingue FR/EN sans dépendance.
 * Langue : choix mémorisé du joueur, sinon `navigator.languages`, sinon le fuseau horaire.
 * La langue est fixée au chargement ; en changer recharge la page (voir `setLang`).
 */

import { UI, type UiKey } from './ui.ts';

export type Lang = 'fr' | 'en';

const LANG_KEY = 'bot-empire-lang';

/** Fuseaux de pays et territoires francophones (repli quand le navigateur n'annonce ni fr ni en). */
const FRENCH_TIME_ZONES = new Set([
  // Europe
  'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg', 'Europe/Monaco', 'Europe/Zurich',
  // Amériques et outre-mer
  'America/Montreal', 'America/Cayenne', 'America/Guadeloupe', 'America/Martinique',
  'America/Miquelon', 'America/St_Barthelemy', 'America/Marigot', 'America/Port-au-Prince',
  // Océan Indien et Pacifique
  'Indian/Reunion', 'Indian/Mayotte', 'Indian/Antananarivo', 'Indian/Comoro', 'Indian/Kerguelen',
  'Pacific/Noumea', 'Pacific/Tahiti', 'Pacific/Marquesas', 'Pacific/Gambier', 'Pacific/Wallis', 'Pacific/Efate',
  // Afrique
  'Africa/Abidjan', 'Africa/Algiers', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Brazzaville',
  'Africa/Bujumbura', 'Africa/Casablanca', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Djibouti',
  'Africa/Douala', 'Africa/Kigali', 'Africa/Kinshasa', 'Africa/Libreville', 'Africa/Lome',
  'Africa/Lubumbashi', 'Africa/Ndjamena', 'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou',
  'Africa/Porto-Novo', 'Africa/Tunis',
]);

/** Langue détectée automatiquement (sans tenir compte du choix mémorisé). */
export function detectLang(): Lang {
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of prefs) {
    const code = (raw ?? '').toLowerCase();
    if (code.startsWith('fr')) return 'fr';
    if (code.startsWith('en')) return 'en';
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (FRENCH_TIME_ZONES.has(tz)) return 'fr';
  } catch { /* Intl indisponible : anglais par défaut */ }
  return 'en';
}

function resolveLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch { /* stockage bloqué (iframe tierce) : détection auto */ }
  return detectLang();
}

/** Langue active pour toute la session. */
export const LANG: Lang = resolveLang();

/** Mémorise la langue choisie par le joueur. L'appelant recharge la page pour l'appliquer. */
export function setLang(lang: Lang): void {
  try { localStorage.setItem(LANG_KEY, lang); }
  catch { /* silencieux */ }
}

/** Texte d'interface traduit ; `{nom}` est remplacé par `params.nom`. */
export function t(key: UiKey, params?: Record<string, string | number>): string {
  const text = UI[LANG][key] ?? UI.fr[key];
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (m, name: string) => (name in params ? String(params[name]) : m));
}

/** Applique les traductions aux éléments statiques marqués `data-i18n` (texte), `data-i18n-aria`, `data-i18n-title`. */
export function translateStaticDom(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset['i18n'] as UiKey);
  });
  root.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset['i18nAria'] as UiKey));
  });
  root.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset['i18nTitle'] as UiKey);
  });
  document.documentElement.lang = LANG;
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
}
