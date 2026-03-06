
(window.__slides = window.__slides || []).push({
  phase: 'building',
  html: `
    <div class="slide-content phase-title" style="min-height:calc(100vh - 140px);position:relative;">
      <div class="phase-bg-num" style="color:var(--green);">03</div>
      <div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;">
        <span class="badge badge-green" style="margin-bottom:20px;">Phase 03 - 10 min Input</span>
        <h1 style="font-size:4rem;">Building</h1>
        <p class="large-text mt-16" style="max-width:560px;text-align:center;">Bevor ihr startet: kurze Einführung in den Building-Flow, Tipps zur Demo-Vorbereitung und den Bug-Umgang.</p>
        <div class="grid-3 mt-40" style="max-width:700px;gap:16px;">
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--green);">
            <div style="color:var(--green);display:flex;justify-content:center;margin-bottom:10px;">${ic('code',22)}</div>
            <h3 style="font-size:0.95rem;">Der Building-Flow</h3>
          </div>
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--green);">
            <div style="color:var(--green);display:flex;justify-content:center;margin-bottom:10px;">${ic('film',22)}</div>
            <h3 style="font-size:0.95rem;">Demo-Vorbereitung</h3>
          </div>
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--green);">
            <div style="color:var(--green);display:flex;justify-content:center;margin-bottom:10px;">${ic('zap',22)}</div>
            <h3 style="font-size:0.95rem;">Wenn's hakt</h3>
          </div>
        </div>
      </div>
    </div>
  `
});
