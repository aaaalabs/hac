
(window.__slides = window.__slides || []).push({
  phase: 'konzeption',
  html: `
    <div class="slide-content phase-title" style="min-height:calc(100vh - 140px);position:relative;">
      <div class="phase-bg-num" style="color:var(--blue-light);">02</div>
      <div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;">
        <span class="badge badge-blue" style="margin-bottom:20px;">Phase 02 - 10 min Input</span>
        <h1 style="font-size:4rem;">Konzeption</h1>
        <p class="large-text mt-16" style="max-width:560px;text-align:center;">Bevor ihr startet: kurze Einführung in Vibe Coding, Lovable und euren Master Prompt.</p>
        <div class="grid-3 mt-40" style="max-width:700px;gap:16px;">
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--blue);">
            <div style="color:var(--blue-light);display:flex;justify-content:center;margin-bottom:10px;">${ic('sparkles',22)}</div>
            <h3 style="font-size:0.95rem;">Was ist Vibe Coding?</h3>
          </div>
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--blue);">
            <div style="color:var(--blue-light);display:flex;justify-content:center;margin-bottom:10px;">${ic('layout',22)}</div>
            <h3 style="font-size:0.95rem;">Das Prompt-Framework</h3>
          </div>
          <div class="card" style="text-align:center;padding:20px 14px;border-top:2px solid var(--blue);">
            <div style="color:var(--blue-light);display:flex;justify-content:center;margin-bottom:10px;">${ic('pencil',22)}</div>
            <h3 style="font-size:0.95rem;">Euer Master Prompt</h3>
          </div>
        </div>
      </div>
    </div>
  `
});
