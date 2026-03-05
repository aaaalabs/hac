
(window.__slides = window.__slides || []).push({
  phase: 'ideation',
  html: `
    <div class="slide-content">
      <span class="badge badge-orange mb-20">Phase 01 — Ideation</span>
      <h2>Value Proposition Framework</h2>
      <p class="mt-8">Eure Idee auf den Punkt gebracht — in drei Dimensionen.</p>
      <div class="grid-3 mt-28">
        <div class="card" style="border-top:3px solid var(--orange);">
          <div style="color:var(--orange);margin-bottom:10px;">${ic('target', 22)}</div>
          <span class="card-label">01</span>
          <h3>Problem</h3>
          <p>Welches konkrete Problem adressieren wir? Für wen ist es relevant?</p>
        </div>
        <div class="card" style="border-top:3px solid var(--blue-light);">
          <div style="color:var(--blue-light);margin-bottom:10px;">${ic('users', 22)}</div>
          <span class="card-label">02</span>
          <h3>Zielgruppe</h3>
          <p>Wer nutzt unsere Lösung? Warum ist das Problem für diese Menschen wichtig?</p>
        </div>
        <div class="card" style="border-top:3px solid var(--green);">
          <div style="color:var(--green);margin-bottom:10px;">${ic('star', 22)}</div>
          <span class="card-label">03</span>
          <h3>Mehrwert</h3>
          <p>Was ist der konkrete Vorteil gegenüber dem Status quo? Was macht die Idee besonders?</p>
        </div>
      </div>
      <div class="highlight mt-28" style="text-align:center;">
        <p style="font-size:1.1rem;color:var(--text);font-weight:500;">Output dieser Phase: Ein gemeinsames Value-Proposition-Statement — die Basis für alles, was folgt.</p>
      </div>
    </div>
  `
});
