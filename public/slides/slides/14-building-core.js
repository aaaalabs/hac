
(window.__slides = window.__slides || []).push({
  phase: 'building',
  html: `
    <div class="slide-content">
      <div class="badge badge-green mb-20">Phase 03 — Building</div>
      <h2>Kernprinzip</h2>

      <div class="highlight mt-24" style="border-color:var(--green-border);background:var(--green-soft);text-align:center;padding:36px 40px;">
        <h2 style="font-size:2rem;line-height:1.35;">Die technische Person leitet an. <span style="color:var(--green);">Der Neuling tippt.</span></h2>
        <p class="mt-16" style="font-size:1.1rem;">Wer lernen will, muss selbst prompten. So lernen alle — und niemand sitzt isoliert vor dem Bildschirm.</p>
      </div>

      <div class="grid-2 mt-28">
        <div class="card">
          <h3 style="font-size:1.05rem;margin-bottom:14px;">
            <span style="color:var(--amber);display:inline-flex;vertical-align:middle;margin-right:6px;">${ic('key', 18)}</span>Lovable-Zugang
          </h3>

          <!-- Promo code — prominent display -->
          <div style="background:rgba(249,115,22,0.08);border:1px solid var(--orange-border);border-radius:10px;padding:12px 16px;margin-bottom:14px;text-align:center;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-3);margin-bottom:4px;">Promo Code</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:600;letter-spacing:0.08em;color:var(--orange);">SADFJKL437Q89</div>
            <div style="font-size:0.75rem;color:var(--text-3);margin-top:4px;">Pro Plan 1 · 100 Credits · kostenlos</div>
          </div>

          <p style="color:var(--text);font-size:0.88rem;line-height:1.7;">
            1. <a href="https://lovable.dev" style="color:var(--blue-light);text-decoration:none;">lovable.dev</a> → "Get started"<br>
            2. Settings → Plans &amp; Credits<br>
            3. Pro Plan 1 auswählen (Monthly)<br>
            4. Code bei Checkout eingeben
          </p>
          <p style="font-size:0.78rem;color:var(--text-3);margin-top:8px;">Nur für heute — nicht weitergeben.</p>
        </div>

        <div class="card">
          <h3 style="font-size:1.05rem;margin-bottom:8px;">
            <span style="color:var(--amber);display:inline-flex;vertical-align:middle;margin-right:6px;">${ic('clock', 18)}</span>Timing
          </h3>
          <p style="color:var(--text);font-size:0.95rem;line-height:1.7;">Zwischencheck nach 30 Min.<br>Demo-Reminder 15 Min. vor Schluss.</p>
        </div>
      </div>
    </div>
  `
});
