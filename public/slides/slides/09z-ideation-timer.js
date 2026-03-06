
(window.__slides = window.__slides || []).push({
  phase: 'ideation', isTimer: true, timerMinutes: 60,
  html: `
    <div class="slide-content timer-slide" style="position:relative;">
      <div class="phase-bg-num" style="color:var(--orange);">01</div>
      <div style="position:relative;z-index:2;">
        <span class="badge badge-orange" style="margin-bottom:24px;">Phase 01 - Ideation</span>
        <div class="timer-big" id="timer-click-ideation" data-phase="ideation">60:00</div>
        <p class="timer-hint" id="timer-hint-ideation">Klick zum Starten</p>
      </div>
    </div>
  `
});
