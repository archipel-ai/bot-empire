/**
 * Pictogrammes SVG en trait (1,5 px, couleur `currentColor`) : remplacent les emojis
 * dans l'interface. Grille 24 × 24, dessinés pour le jeu.
 */

const PATHS = {
  // Agents
  workflow:   '<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.2 6h9.6M6.2 7.9l4.6 8.2M17.8 7.9l-4.6 8.2"/>',
  pen:        '<path d="M15.5 4.5l4 4L9 19H5v-4z"/><path d="M13.5 6.5l4 4"/><path d="M4 21h16"/>',
  chart:      '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16V6" />',
  search:     '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/><path d="M8 10.5h5"/>',
  scale:      '<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.5 6a3 3 0 0 0 5 0z"/><path d="M19 7l-2.5 6a3 3 0 0 0 5 0z"/>',
  megaphone:  '<path d="M4 10v4h3l8 4V6l-8 4z"/><path d="M7 14l1.5 5h2.5l-1-4.4"/><path d="M18.5 9.5a3.5 3.5 0 0 1 0 5"/>',
  compass:    '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  // Clients
  cup:        '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8.5 3.5c0 1.5 1.5 1.5 1.5 3M12.5 3.5c0 1.5 1.5 1.5 1.5 3"/>',
  pulse:      '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  bag:        '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  bed:        '<path d="M3 18V7M21 18v-5H3"/><path d="M3 13h18"/><path d="M7 13v-2.5a1.5 1.5 0 0 1 1.5-1.5H11v4"/>',
  tower:      '<path d="M6 21V5l7-2v18M13 8l5 2v11M4 21h16"/><path d="M9 8h1M9 12h1M9 16h1M15.5 13h0.5M15.5 17h0.5"/>',
  columns:    '<path d="M3 9l9-5 9 5z"/><path d="M5 9v9M9.7 9v9M14.3 9v9M19 9v9M3 21h18M4 18h16"/>',
  // Onglets
  agents:     '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M2.5 12v3M21.5 12v3"/>',
  handshake:  '<path d="M2.5 11l3.5-4 4 1.5 3-1.5 4.5 1 4 3"/><path d="M6 7l-1 7 5 5 2-1"/><path d="M18 9l1 5-5 5-2-2"/><path d="M10 8.5l3.5 3.5M12 14l2 2M10 16l1.5 1.5"/>',
  sliders:    '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  document:   '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  star:       '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  cap:        '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4"/><path d="M21.5 9.5v5"/>',
  building:   '<path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-5h6v5M8 11h2M14 11h2"/>',
  // Actions
  bolt:       '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',
  echo:       '<path d="M4 4v5h5"/><path d="M4.6 15a8 8 0 1 0 1.6-8.4L4 9"/>',
  link:       '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
  download:   '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4 17v3h16v-3"/>',
  upload:     '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 17v3h16v-3"/>',
  trophy:     '<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H4.5a3.5 3.5 0 0 0 3.6 4.5M16 6h3.5a3.5 3.5 0 0 1-3.6 4.5"/><path d="M12 14v4M8.5 20.5h7M10 18h4"/>',
  soundOn:    '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  soundOff:   '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  clock:      '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  inbox:      '<path d="M4 13l2.5-8h11L20 13v6H4z"/><path d="M4 13h4.5l1 2h5l1-2H20"/>',
  alert:      '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h0.01"/>',
  check:      '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cross:      '<path d="M6 6l12 12M18 6L6 18"/>',
  lock:       '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  play:       '<path d="M8 5.5v13l10-6.5z"/>',
  back:       '<path d="M10 6l-6 6 6 6M4 12h16"/>',
  send:       '<path d="M4 12l16-8-6 16-2.5-6.5z"/><path d="M11.5 13.5L20 4"/>',
  chevron:    '<path d="M6 9l6 6 6-6"/>',
  book:       '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',
  trendUp:    '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  trendDown:  '<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',
  coin:       '<circle cx="12" cy="12" r="8.5"/><path d="M15 8.5a4 4 0 1 0 0 7M7.5 11h6M7.5 13.5h6"/>',
  moon:       '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5z"/>',
  tag:        '<path d="M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8.5" r="1.3"/>',
  plus:       '<path d="M12 5v14M5 12h14"/>',
  percent:    '<path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
  chip:       '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  cursor:     '<path d="M5 3.5l13 6.5-5.5 1.8L10.5 17z"/><path d="M12.5 11.8l5 5"/>',
  // Étapes du bureau
  sofa:       '<path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2.5 13a1.5 1.5 0 0 1 3 0v1.5h13V13a1.5 1.5 0 0 1 3 0v5h-19z"/><path d="M5 18v2M19 18v2"/>',
  monitor:    '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
  rocket:     '<path d="M12 3c3.5 2 5 5.5 5 9.5l-2 3.5H9l-2-3.5C7 8.5 8.5 5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 16l-2.5 3.5M15 16l2.5 3.5M12 16v4.5"/>',
  crown:      '<path d="M3.5 8l4 4.5L12 5.5l4.5 7 4-4.5-1.5 10.5H5z"/><path d="M5 20.5h14"/>',
  logo:       '<path d="M12 13.5l8.5 4.3L12 22l-8.5-4.2z"/><path d="M9 4.5h0.01M14 2.5h0.01M16.5 7h0.01M10.5 9h0.01M13 6.5h0.01M7 7.5h0.01"/>',
} as const;

export type IconName = keyof typeof PATHS;

const ICON_NAMES = new Set(Object.keys(PATHS));

/** Balise SVG d'un pictogramme (décoratif : masqué aux lecteurs d'écran). */
export function icon(name: IconName, className = 'ico'): string {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;
}

/** Pictogramme de chaque type d'agent. */
export const AGENT_ICONS: Record<string, IconName> = {
  'bot-workflows':    'workflow',
  'agent-copy':       'pen',
  'agent-analytics':  'chart',
  'agent-audit':      'search',
  'agent-legal':      'scale',
  'agent-growth':     'megaphone',
  'agent-supervisor': 'compass',
};

/** Pictogramme de chaque client. */
export const CLIENT_ICONS: Record<string, IconName> = {
  'restaurant-local': 'cup',
  'cabinet-medical':  'pulse',
  'pme-ecommerce':    'bag',
  'groupe-hotelier':  'bed',
  'grand-compte':     'tower',
  'gouvernement':     'columns',
};

/** Pictogramme de chaque avantage de réputation. */
export const PERK_ICONS: Record<string, IconName> = {
  'rep-start-bonus':    'coin',
  'rep-click-x2':       'cursor',
  'rep-contract-slot':  'plus',
  'rep-contract-bonus': 'percent',
  'rep-offline-rate':   'moon',
  'rep-agent-discount': 'tag',
  'rep-echo-boost':     'echo',
  'rep-income-x125':    'trendUp',
};

/** Pictogramme d'un upgrade, d'après la nature de son effet. */
export function upgradeIcon(effectType: 'agent_multiplier' | 'global_multiplier' | 'click_multiplier', agentId?: string): IconName {
  if (effectType === 'click_multiplier') return 'cursor';
  if (effectType === 'global_multiplier') return 'trendUp';
  return (agentId && AGENT_ICONS[agentId]) || 'chip';
}

/** Remplit les emplacements `<span data-icon="nom">` du HTML statique. */
export function hydrateIcons(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-icon]').forEach(el => {
    const name = el.dataset['icon'] ?? '';
    if (ICON_NAMES.has(name)) el.innerHTML = icon(name as IconName);
  });
}
