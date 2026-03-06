
(window.__slides = window.__slides || []).push({
  phase: 'building', isTimer: true, timerMinutes: 80,
  html: `
    <div class="slide-content timer-slide" style="position:relative;">
      <div class="phase-bg-num" style="color:var(--green);">03</div>
      <div style="position:relative;z-index:2;">
        <span class="badge badge-green" style="margin-bottom:24px;">Phase 03 - Building</span>
        <div class="timer-big" id="timer-click-building" data-phase="building">80:00</div>
        <p class="timer-hint" id="timer-hint-building">Klick zum Starten</p>
      </div>
    </div>
  `
});
