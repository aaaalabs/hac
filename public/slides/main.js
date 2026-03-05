/**
 * AIC Slide Deck — Navigation controller
 * Injects slides from window.__slides, handles keyboard + click nav.
 */

const slides = window.__slides || [];

// Phase → label + badge class
const PHASES = {
  general:    { label: 'AI Collective Innsbruck',      badge: 'badge-neutral'  },
  ideation:   { label: 'Phase 01 — Ideation',          badge: 'badge-orange'   },
  konzeption: { label: 'Phase 02 — Konzeption',        badge: 'badge-blue'     },
  building:   { label: 'Phase 03 — Building',          badge: 'badge-green'    },
  showntell:  { label: 'Phase 04 — Show & Tell',       badge: 'badge-amber'    },
  closing:    { label: 'Closing',                      badge: 'badge-rose'     },
};

const container   = document.getElementById('slides-container');
const counter     = document.getElementById('nav-counter');
const phaseLabel  = document.getElementById('phase-label');
const btnPrev     = document.getElementById('btn-prev');
const btnNext     = document.getElementById('btn-next');
const fsBtn       = document.getElementById('fs-btn');

let current = 0;

// ── Build slide DOM ──────────────────────────────────────────────────────────
slides.forEach((slide, i) => {
  const el = document.createElement('div');
  el.className = 'slide' + (i === 0 ? ' active' : '');
  el.id = `slide-${i}`;
  el.dataset.phase = slide.phase;

  // Shared background layers + optional phase accent line
  const phaseLine = (slide.phase !== 'general')
    ? `<div class="phase-line phase-line--${slide.phase}"></div>`
    : '';

  el.innerHTML = `
    <div class="bg-base"></div>
    <div class="bg-grid"></div>
    ${phaseLine}
    ${slide.html}
  `;

  container.appendChild(el);
});

const slideEls = document.querySelectorAll('.slide');

// ── Navigation ───────────────────────────────────────────────────────────────
function goTo(n) {
  slideEls[current].classList.remove('active');
  current = Math.max(0, Math.min(n, slides.length - 1));
  slideEls[current].classList.add('active');

  // Update counter
  counter.textContent = `${current + 1} / ${slides.length}`;

  // Update phase badge
  const phase = PHASES[slides[current].phase] || PHASES.general;
  phaseLabel.className = `badge ${phase.badge}`;
  phaseLabel.textContent = phase.label;

  // Prev/next disabled state
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === slides.length - 1;
}

btnNext.onclick = () => goTo(current + 1);
btnPrev.onclick = () => goTo(current - 1);

// ── Keyboard shortcuts ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ')  { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft')                     { e.preventDefault(); goTo(current - 1); }
  if (e.key === 'f' || e.key === 'F')           { toggleFullscreen(); }
  if (e.key === 'Home')                          { e.preventDefault(); goTo(0); }
  if (e.key === 'End')                           { e.preventDefault(); goTo(slides.length - 1); }
});

// ── Fullscreen ────────────────────────────────────────────────────────────────
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}
fsBtn.onclick = toggleFullscreen;

// ── Init ─────────────────────────────────────────────────────────────────────
goTo(0);
