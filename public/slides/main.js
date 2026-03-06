/**
 * AIC Slide Deck — Navigation controller
 * Injects slides from window.__slides, handles keyboard + click nav.
 */

const slides = window.__slides || [];

// ── Zeitplan (MEZ) ────────────────────────────────────────────────────────────
const SCHEDULE = [
  [17,15],[17,17],[17,19],[17,25],[17,28],                   // slides 0–4  (general)
  [17,30],[17,50],[18,10],[18,28],                           // slides 5–8  (ideation)
  [18,28],                                                   // slide  9    (mindset)
  [18,30],[18,40],[18,50],[19,5],                           // slides 10–13 (konzeption)
  [19,15],[19,25],[20,0],[20,30],[20,38],[20,43],           // slides 14–19 (building + showntell preview + timer)
  [20,55],[21,5],[21,10],[21,15],[21,20],[21,25]            // slides 20–25 (showntell + closing)
];
const EVENT_END = [22, 0];

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
  general:    { label: 'Introduction',                  badge: 'badge-neutral'  },
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

// ── Timer system ──────────────────────────────────────────────────────────────
const timers = {};

document.querySelectorAll('.timer-big').forEach(el => {
  el.addEventListener('click', () => {
    const phase = el.dataset.phase;
    if (timers[phase]?.running) return;
    const slide = window.__slides.find(s => s.isTimer && s.html.includes(`timer-click-${phase}`));
    const mins = slide ? slide.timerMinutes : 60;
    timers[phase] = { running: true, startTime: Date.now(), durationMs: mins * 60 * 1000 };
    el.classList.add('running');
    document.getElementById(`timer-hint-${phase}`)?.classList.add('hidden');
  });
});

function updateTimers() {
  for (const [phase, t] of Object.entries(timers)) {
    if (!t.running) continue;
    const remaining = Math.max(0, t.durationMs - (Date.now() - t.startTime));
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const el = document.getElementById(`timer-click-${phase}`);
    if (el) {
      el.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
      el.classList.remove('warning','danger');
      if (remaining / t.durationMs < 0.05) el.classList.add('danger');
      else if (remaining / t.durationMs < 0.15) el.classList.add('warning');
    }
  }
}

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

// ── Marker update ─────────────────────────────────────────────────────────────
function updateMarker(mez) {
  const sched     = SCHEDULE[current] || SCHEDULE[SCHEDULE.length - 1];
  const startMins = sched[0] * 60 + sched[1];
  const endEntry  = SCHEDULE[current + 1] || EVENT_END;
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
  const clockEl = document.getElementById('mez-clock');
  if (clockEl) clockEl.textContent =
    `${String(mez.h).padStart(2,'0')}:${String(mez.m).padStart(2,'0')}`;
  updateMarker(mez);
  updateTimers();
}, 1000);

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
