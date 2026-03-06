/**
 * AIC Slide Deck — Navigation controller
 * Injects slides from window.__slides, handles keyboard + click nav.
 */

const slides = window.__slides || [];

// ── Zeitplan (MEZ) ────────────────────────────────────────────────────────────
const SCHEDULE = [
  [17,0],[17,2],[17,4],[17,7],[17,10],[17,13],
  [17,15],[17,35],[17,55],[18,15],[18,23],[18,33],
  [18,55],[19,15],[19,35],[20,5],[20,20],[20,35],[20,50],[21,5]
];
const EVENT_END = [21, 30];

function getMEZ() {
  const parts = new Intl.DateTimeFormat('de-AT', {
    timeZone: 'Europe/Vienna',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).formatToParts(new Date());
  return {
    h: +parts.find(p => p.type === 'hour').value,
    m: +parts.find(p => p.type === 'minute').value,
    s: +parts.find(p => p.type === 'second').value
  };
}

function getScheduledSlide(mez) {
  const now = mez.h * 60 + mez.m;
  let idx = 0;
  for (let i = 0; i < SCHEDULE.length; i++) {
    if (now >= SCHEDULE[i][0] * 60 + SCHEDULE[i][1]) idx = i;
    else break;
  }
  return idx;
}

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

  const schedTime = SCHEDULE[i];
  const schedLabel = `${String(schedTime[0]).padStart(2,'0')}:${String(schedTime[1]).padStart(2,'0')}`;

  el.innerHTML = `
    <div class="bg-base"></div>
    <div class="bg-grid"></div>
    ${phaseLine}
    ${slide.html}
    <div class="slide-progress"><div class="slide-progress-bar" id="pb-${i}"></div></div>
    <div class="slide-marker" id="sm-${i}">
      <span id="sm-time-${i}">${schedLabel}</span>
      <span id="sm-status-${i}" class="sm-on">✓</span>
    </div>
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

// ── Autopilot ─────────────────────────────────────────────────────────────────
let autopilotOn = false;
const btnAutopilot = document.getElementById('btn-autopilot');
btnAutopilot.onclick = () => {
  autopilotOn = !autopilotOn;
  btnAutopilot.textContent = autopilotOn ? '⏸ Auto' : '▶ Auto';
  btnAutopilot.classList.toggle('is-running', autopilotOn);
};

// ── Marker update ─────────────────────────────────────────────────────────────
function updateMarker(mez) {
  const startMins = SCHEDULE[current][0] * 60 + SCHEDULE[current][1];
  const endEntry  = SCHEDULE[current + 1] ?? EVENT_END;
  const endMins   = endEntry[0] * 60 + endEntry[1];
  const nowMins   = mez.h * 60 + mez.m + mez.s / 60;
  const frac      = Math.max(0, Math.min(1, (nowMins - startMins) / (endMins - startMins)));

  const pbEl = document.getElementById(`pb-${current}`);
  if (pbEl) pbEl.style.transform = `scaleX(${frac})`;

  const scheduled = getScheduledSlide(mez);
  const diffMins  = Math.round(nowMins - (SCHEDULE[scheduled][0] * 60 + SCHEDULE[scheduled][1]));
  const statusEl  = document.getElementById(`sm-status-${current}`);
  if (statusEl) {
    if (diffMins === 0)    { statusEl.textContent = '✓';           statusEl.className = 'sm-on'; }
    else if (diffMins > 0) { statusEl.textContent = `+${diffMins}m`; statusEl.className = 'sm-ahead'; }
    else                   { statusEl.textContent = `${diffMins}m`;  statusEl.className = 'sm-behind'; }
  }
  const timeEl = document.getElementById(`sm-time-${current}`);
  if (timeEl) timeEl.textContent = `${String(mez.h).padStart(2,'0')}:${String(mez.m).padStart(2,'0')}`;
}

// ── Tick loop (1s) ────────────────────────────────────────────────────────────
setInterval(() => {
  const mez = getMEZ();
  document.getElementById('mez-clock').textContent =
    `${String(mez.h).padStart(2,'0')}:${String(mez.m).padStart(2,'0')}`;
  updateMarker(mez);
  if (autopilotOn) {
    const target = getScheduledSlide(mez);
    if (target > current) goTo(target);
  }
}, 1000);

// ── Keyboard shortcuts ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ')  { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft')                     { e.preventDefault(); goTo(current - 1); }
  if (e.key === 'f' || e.key === 'F')           { toggleFullscreen(); }
  if (e.key === 'a' || e.key === 'A')           { btnAutopilot.onclick(); }
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
