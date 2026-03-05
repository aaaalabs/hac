
(window.__slides = window.__slides || []).push({
  phase: 'konzeption',
  html: `
    <div class="slide-content">
      <div class="badge badge-blue mb-20">Phase 02 — Konzeption</div>
      <h2>Was ist <span class="grad-blue">Vibe Coding</span>?</h2>

      <div class="two-col mt-28">
        <div>
          <p class="large-text" style="color:var(--text);">Ihr beschreibt, was ihr bauen wollt. Die KI baut es.</p>
          <p class="mt-16">Lovable ist euer Tool: Ihr gebt einen detaillierten Prompt ein, und Lovable erstellt daraus eine funktionierende Web-App — in Minuten, nicht Wochen.</p>

          <div class="card mt-24" style="border-left:3px solid var(--blue-light);">
            <h3 style="font-size:0.95rem;color:var(--blue-light);margin-bottom:12px;">Technischer Rahmen</h3>

            <div class="check-row">
              <span style="color:var(--green);display:flex;">${ic('check', 16)}</span>
              <span>Frontend (was man sieht &amp; klickt)</span>
            </div>
            <div class="check-row">
              <span style="color:var(--green);display:flex;">${ic('check', 16)}</span>
              <span>Mock-Daten (Beispielinhalte)</span>
            </div>
            <div class="check-row">
              <span style="color:var(--text-3);display:flex;">${ic('x', 16)}</span>
              <span style="color:var(--text-3);">Keine Datenbank</span>
            </div>
            <div class="check-row">
              <span style="color:var(--text-3);display:flex;">${ic('x', 16)}</span>
              <span style="color:var(--text-3);">Keine Login-Systeme</span>
            </div>
          </div>
        </div>

        <div>
          <div class="highlight" style="border-color:var(--blue-border);background:rgba(0,118,219,0.05);">
            <p style="font-size:1.75rem;font-weight:700;color:var(--text);line-height:1.3;font-family:'Inter';">Je präziser euer Prompt, desto besser euer Prototyp.</p>
            <p class="mt-16" style="font-size:0.95rem;">Deshalb investieren wir jetzt Zeit in ein strukturiertes Framework — damit der erste Prompt sitzt.</p>
          </div>
        </div>
      </div>
    </div>
  `
});
