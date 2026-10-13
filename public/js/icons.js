// Proste ikony liniowe (viewBox 0 0 48 48, kolor = currentColor).
const P = {
  leaf: '<path d="M24 4l3 9 7-4-2 9h9l-6 6 4 6h-11v6l-3-2-1 10h-2l-1-10-3 2v-6H7l4-6-6-6h9l-2-9 7 4z"/>',
  home: '<path d="M6 22L24 7l18 15"/><path d="M11 19v22h26V19"/><path d="M20 41V29h8v12"/><path d="M33 13V8h4v8"/>',
  star: '<path d="M24 5l5.6 12.2L43 19l-10 9.4 2.6 13.4L24 35.2l-11.6 6.6L15 28.4 5 19l13.4-1.8z"/>',
  plate: '<circle cx="24" cy="26" r="15"/><circle cx="24" cy="26" r="9"/><path d="M6 6v12a3 3 0 006 0V6M9 18v24"/><path d="M42 6c-4 2-5 8-5 13h5v23"/>',
  heart: '<path d="M24 41S6 30 6 17.5A9.5 9.5 0 0124 13a9.5 9.5 0 0118 4.5C42 30 24 41 24 41z"/>',
  heartpin: '<path d="M24 30s-9-5.5-9-11.5a4.8 4.8 0 019-2.3 4.8 4.8 0 019 2.3C33 24.5 24 30 24 30z"/><path d="M24 44S10 31 10 20a14 14 0 0128 0c0 11-14 24-14 24z"/>',
  gift: '<rect x="7" y="18" width="34" height="8" rx="1"/><path d="M10 26v16h28V26M24 18v24"/><path d="M24 18c-3-6-12-9-12-3 0 3 6 3 12 3zM24 18c3-6 12-9 12-3 0 3-6 3-12 3z"/>',
  candle: '<rect x="17" y="22" width="14" height="20" rx="2"/><path d="M24 22v-4"/><path d="M24 6c4 4 4 9 0 11-4-2-4-7 0-11z"/><path d="M10 42h28"/>',
  runner: '<circle cx="29" cy="8" r="4"/><path d="M14 22l7-7 8 3 4 8 6 2"/><path d="M21 15l-3 12 8 5-3 11"/><path d="M18 27l-6 9H5"/>',
  jeep: '<path d="M4 30v-8l6-1 5-8h14l3 8h10l2 4v5"/><path d="M15 13v8h17"/><circle cx="13" cy="33" r="5"/><circle cx="35" cy="33" r="5"/><path d="M18 33h12M40 33h4M4 33h4"/>',
  cottage: '<path d="M5 24L24 8l19 16"/><path d="M9 21v20h30V21"/><path d="M20 41V31h8v10"/><rect x="13" y="25" width="5" height="5"/><rect x="30" y="25" width="5" height="5"/><path d="M19 17h10"/>',
  kite: '<path d="M8 6c16-2 30 6 34 18-8-4-18-5-26 0C14 18 12 11 8 6z"/><path d="M14 18L30 40M16 24l13 18"/><path d="M28 40c2 2 3 3 6 3"/><path d="M6 44c4-2 8-2 12 0s8 2 12 0 8-2 12 0"/>',
  palace: '<path d="M4 42h40M7 42V22h34v20"/><path d="M7 22l17-11 17 11"/><path d="M24 11V5M24 5h5"/><path d="M13 42V30M20 42V30M28 42V30M35 42V30"/><circle cx="24" cy="18" r="2"/>',
  mushroom: '<path d="M6 22C6 12 14 6 24 6s18 6 18 16z"/><path d="M18 22l-2 16a3 3 0 003 3h10a3 3 0 003-3l-2-16"/><circle cx="16" cy="14" r="2"/><circle cx="28" cy="11" r="2"/><circle cx="33" cy="17" r="1.5"/>',
  cup: '<path d="M8 18h26v10a11 11 0 01-11 11h-4A11 11 0 018 28z"/><path d="M34 21h3a5 5 0 010 10h-4"/><path d="M16 6c-2 3 2 5 0 8M23 6c-2 3 2 5 0 8"/><path d="M6 43h32"/>',
  sun: '<circle cx="24" cy="24" r="8"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2"/>',
  ski: '<path d="M6 40l36-10"/><path d="M8 44l36-10"/><path d="M14 8l10 30M30 6l-6 32"/><circle cx="34" cy="10" r="3"/>',
  kart: '<circle cx="12" cy="34" r="6"/><circle cx="37" cy="34" r="6"/><path d="M18 34h13M4 28h10l6-8h10l4 8h10"/><path d="M24 20l2-8h5"/><path d="M38 12l4-6M42 16l4-4"/>',
  billiard: '<circle cx="18" cy="30" r="12"/><circle cx="18" cy="30" r="5"/><path d="M15.5 28.5l3 0M18 27v6"/><path d="M28 20L44 4"/><circle cx="36" cy="38" r="5"/>',
  cinema: '<rect x="5" y="16" width="38" height="26" rx="2"/><path d="M5 16l4-9 34 9M15 9l-2 7M25 11.5l-2 7.5M35 14l-1 3"/><path d="M20 24v11l10-5.5z"/>',
  jar: '<path d="M15 12h18v-5H15z"/><path d="M13 12h22l2 6v20a5 5 0 01-5 5H16a5 5 0 01-5-5V18z"/><path d="M11 24h26"/><path d="M17 31h14M20 36h8"/>',
  owl: '<path d="M10 8l6 5h16l6-5v18c0 9-6 16-14 16S10 35 10 26z"/><circle cx="18" cy="21" r="4.5"/><circle cx="30" cy="21" r="4.5"/><path d="M22 28l2 3 2-3"/><path d="M17 36l3-3M31 36l-3-3"/>',
  lock: '<rect x="10" y="21" width="28" height="22" rx="3"/><path d="M16 21v-6a8 8 0 0116 0v6"/><circle cx="24" cy="31" r="2.5"/><path d="M24 33.5V37"/>',
};

export function icon(name, cls = '') {
  return `<svg class="icon ${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.leaf}</svg>`;
}

// Wycinanka – rozeta w kolorach jesieni. Złożona z koncentrycznych pierścieni płatków.
export function rosette(size = 200, inner = '') {
  const rings = [
    { n: 16, r: 92, w: 14, h: 22, c: 'var(--forest)' },
    { n: 16, r: 78, w: 13, h: 20, c: 'var(--rust)', off: 11.25 },
    { n: 12, r: 64, w: 13, h: 18, c: 'var(--mustard)' },
    { n: 12, r: 52, w: 10, h: 14, c: 'var(--burgundy)', off: 15 },
  ];
  let g = '';
  for (const ring of rings) {
    for (let i = 0; i < ring.n; i++) {
      const a = (360 / ring.n) * i + (ring.off || 0);
      g += `<ellipse cx="100" cy="${100 - ring.r + ring.h / 2}" rx="${ring.w / 2}" ry="${ring.h / 2}" fill="${ring.c}" transform="rotate(${a} 100 100)"/>`;
    }
  }
  g += '<circle cx="100" cy="100" r="44" fill="var(--paper)"/>';
  g += '<circle cx="100" cy="100" r="44" fill="none" stroke="var(--rust)" stroke-width="2" stroke-dasharray="3 5"/>';
  return `<div class="rosette" style="--s:${size}px"><svg viewBox="0 0 200 200" aria-hidden="true">${g}</svg><div class="rosette-in">${inner}</div></div>`;
}
