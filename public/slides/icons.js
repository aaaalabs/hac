/**
 * AIC Slide Deck — Icon helpers
 * Tabler Icons (https://tabler.io/icons) as inline SVG strings.
 * Usage: ic('calendar') → SVG HTML string
 */

const ATTR = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

const PATHS = {
  calendar: `<rect x="4" y="5" width="16" height="16" rx="2"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="4" y1="11" x2="20" y2="11"/><line x1="11" y1="15" x2="12" y2="15"/><line x1="12" y1="15" x2="12" y2="18"/>`,
  pin:      `<circle cx="12" cy="11" r="3"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/>`,
  clock:    `<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>`,
  target:   `<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/>`,
  layout:   `<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><line x1="10" y1="15" x2="10" y2="20"/><line x1="4" y1="14" x2="20" y2="14"/>`,
  users:    `<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/>`,
  sparkles: `<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2zm0-12a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2zm-7 12a6 6 0 0 1 6-6a6 6 0 0 1-6-6a6 6 0 0 1-6 6a6 6 0 0 1 6 6z"/>`,
  desktop:  `<rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="22" x2="16" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/>`,
  star:     `<path d="M12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.093-6.255l3.093 6.255l6.9 1l-5 4.867l1.179 6.873z"/>`,
  pencil:   `<path d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0-4-4l-10.5 10.5v4"/><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"/>`,
  check:    `<path d="M5 12l5 5l10-10"/>`,
  x:        `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  code:     `<polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/><line x1="14" y1="4" x2="10" y2="20"/>`,
  key:      `<circle cx="8" cy="15" r="4"/><line x1="21" y1="2" x2="9" y2="14"/><line x1="15" y1="8" x2="17" y2="10"/><line x1="21" y1="2" x2="19" y2="4"/>`,
  film:     `<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="4" x2="8" y2="20"/><line x1="16" y1="4" x2="16" y2="20"/><line x1="4" y1="8" x2="8" y2="8"/><line x1="4" y1="16" x2="8" y2="16"/><line x1="16" y1="8" x2="20" y2="8"/><line x1="16" y1="16" x2="20" y2="16"/>`,
  message:  `<path d="M3 20l1.3-3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/><line x1="12" y1="12" x2="12.01" y2="12"/><line x1="8" y1="12" x2="8.01" y2="12"/><line x1="16" y1="12" x2="16.01" y2="12"/>`,
  refresh:  `<path d="M20 11a8.1 8.1 0 0 0-15.5-2m-.5-4v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>`,
  bulb:     `<path d="M3 12h1m8-9v1m8 8h1m-15.4-6.4l.7.7m12.1-.7l-.7.7"/><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0-1 3a2 2 0 0 1-4 0a3.5 3.5 0 0 0-1-3"/><line x1="9.7" y1="17" x2="14.3" y2="17"/>`,
  mic:      `<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="21" x2="12" y2="17"/><line x1="8" y1="21" x2="16" y2="21"/>`,
  rocket:   `<path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3-5a9 9 0 0 0 6-8a3 3 0 0 0-3-3a9 9 0 0 0-8 6a6 6 0 0 0-5 3"/><path d="M7 14a6 6 0 0 0-3 6a6 6 0 0 0 6-3"/><circle cx="15" cy="9" r="1"/>`,
  heart:    `<path d="M19.5 12.572l-7.5 7.428l-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>`,
  trophy:   `<line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="7" y1="4" x2="17" y2="4"/><path d="M17 4v8a5 5 0 0 1-10 0v-8"/><polyline points="5 9 3 9 3 11 5 11"/><polyline points="19 9 21 9 21 11 19 11"/>`,
  beer:     `<path d="M6 6h12l-1.5 9H7.5z"/><path d="M6 9h12"/><path d="M18 9h2a2 2 0 0 1 0 4h-2"/>`,
  phone:    `<rect x="7" y="4" width="10" height="16" rx="1"/><line x1="11" y1="5" x2="13" y2="5"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
  mountain: `<polyline points="3 20 9 10 13 14 17 8 21 20"/>`,
  qrcode:   `<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><line x1="7" y1="7" x2="7.01" y2="7"/><line x1="17" y1="7" x2="17.01" y2="7"/><line x1="7" y1="17" x2="7.01" y2="17"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="17" y1="14" x2="20" y2="14"/><line x1="20" y1="17" x2="20" y2="20"/><line x1="17" y1="20" x2="20" y2="20"/><line x1="14" y1="20" x2="14.01" y2="20"/>`,
};

/**
 * Returns an inline SVG icon string.
 * @param {string} name - Icon name (see PATHS above)
 * @param {number} size - Width/height in px (default 20)
 * @param {string} cls  - Extra CSS classes
 */
window.ic = function ic(name, size = 20, cls = '') {
  const paths = PATHS[name];
  if (!paths) {
    console.warn(`[icons] Unknown icon: "${name}"`);
    return '';
  }
  const classes = ['icon', cls].filter(Boolean).join(' ');
  return `<svg class="${classes}" width="${size}" height="${size}" ${ATTR}>${paths}</svg>`;
}
