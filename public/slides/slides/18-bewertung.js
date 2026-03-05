
(window.__slides = window.__slides || []).push({
  phase: 'showntell',
  html: `
    <div class="slide-content">
      <span class="badge badge-amber" style="margin-bottom:20px;">Bewertung</span>
      <h2>Jury-Kriterien</h2>
      <p class="mt-8">Bewertet auf einer Skala von 1–6, jeweils 20% Gewicht.</p>

      <div class="grid-5" style="margin-top:24px;">
        <div class="jury-card">
          <div class="jury-icon" style="background:var(--orange-soft);">
            <span style="color:var(--orange);">${ic('target', 22)}</span>
          </div>
          <h3>Problem-Solution Fit</h3>
        </div>

        <div class="jury-card">
          <div class="jury-icon" style="background:var(--blue-soft);">
            <span style="color:var(--blue-light);">${ic('bulb', 22)}</span>
          </div>
          <h3>Novelty & Kreativität</h3>
        </div>

        <div class="jury-card">
          <div class="jury-icon" style="background:var(--amber-soft);">
            <span style="color:var(--amber);">${ic('mic', 22)}</span>
          </div>
          <h3>Show & Tell Clarity</h3>
        </div>

        <div class="jury-card">
          <div class="jury-icon" style="background:var(--green-soft);">
            <span style="color:var(--green);">${ic('rocket', 22)}</span>
          </div>
          <h3>Next-Step Plausibility</h3>
        </div>

        <div class="jury-card">
          <div class="jury-icon" style="background:rgba(167,139,250,0.10);">
            <span style="color:#a78bfa;">${ic('layout', 22)}</span>
          </div>
          <h3>User Experience & Design</h3>
        </div>
      </div>

      <h3 style="margin-top:28px;font-size:1.3rem;margin-bottom:16px;">Gewinner-Kategorien</h3>

      <div class="grid-2" style="max-width:680px;">
        <div class="card" style="text-align:center;padding:28px 24px;">
          <div style="color:var(--blue-light);display:flex;justify-content:center;margin-bottom:14px;">${ic('heart', 32)}</div>
          <h3>Community Favorite</h3>
          <p>Publikumsvoting via Slido — alle Teams inkl. Jury-Team sind wählbar.</p>
        </div>

        <div class="card" style="text-align:center;padding:28px 24px;">
          <div style="color:var(--amber);display:flex;justify-content:center;margin-bottom:14px;">${ic('mountain', 32)}</div>
          <h3>Tirol Impact Award</h3>
          <p>Jury-Sonderbewertung: Bestes Gesamtpaket für Tirol.</p>
        </div>
      </div>
    </div>
  `
});
