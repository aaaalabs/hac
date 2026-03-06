
(window.__slides = window.__slides || []).push({
  phase: 'showntell',
  html: `
    <div class="slide-content" style="display:flex;flex-direction:column;align-items:center;text-align:center;">
    <span class="badge badge-amber" style="margin-bottom:24px;">Community Favorite</span>
    <h1 style="font-size:3.5rem;">Euer Favorit ist...</h1>
    <div style="margin:40px auto;">
      <div style="width:200px;height:200px;background:var(--bg-card);border:2px solid rgba(0,118,219,0.3);border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;margin:0 auto;">
        <span style="color:var(--blue-light);display:flex;">${ic('heart',64)}</span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;font-weight:600;letter-spacing:0.08em;color:var(--text-3);">PUBLIKUMSVOTING</span>
      </div>
    </div>
    <p class="large-text text-center" style="color:var(--text-2);max-width:560px;">Das Publikum hat gewählt - herzlichen Glückwunsch!</p>
  </div>
  `
});
