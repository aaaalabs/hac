
(window.__slides = window.__slides || []).push({
  phase: 'showntell',
  html: `
    <div class="slide-content" style="display:flex;flex-direction:column;align-items:center;text-align:center;">
      <span class="badge badge-amber" style="margin-bottom:24px;">Community Favorite</span>
      <h1 style="font-size:3.5rem;">Jetzt abstimmen!</h1>

      <div style="width:260px;height:260px;background:white;border-radius:20px;margin:32px auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
        <span style="color:var(--orange);display:flex;">${ic('qrcode', 64)}</span>
        <span style="color:#1f2937;font-family:'JetBrains Mono',monospace;font-size:0.72rem;font-weight:600;letter-spacing:0.08em;">[ QR-Code Slido ]</span>
      </div>

      <p class="large-text text-center" style="color:var(--text-2);">Scannt den Code und stimmt für euer Lieblingsteam.</p>
    </div>
  `
});
