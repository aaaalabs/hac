
(window.__slides = window.__slides || []).push({
  phase: 'konzeption',
  html: `
    <div class="slide-content">
    <div class="badge badge-blue mb-20">Phase 02 - Konzeption</div>
    <h2>Was ist <span class="grad-blue">Vibe Coding</span>?</h2>
    <div class="two-col mt-28">
      <div>
        <p class="large-text" style="color:var(--text);">Ihr beschreibt, was ihr bauen wollt. Die KI baut es.</p>
        <p class="mt-16">Lovable ist euer Tool: Ihr gebt einen detaillierten Prompt ein, und Lovable erstellt daraus eine funktionierende Web-App - in Minuten, nicht Wochen.</p>
        <div class="lovable-card mt-24">
          <img src="${LOVABLE_LOGO}" class="lovable-logo" alt="Lovable">
          <h3 style="font-size:0.95rem;margin-bottom:12px;">Was Lovable kann</h3>
          <div class="check-row"><span style="color:var(--green);display:flex;">${ic('check',16)}</span><span>Frontend (was man sieht & klickt)</span></div>
          <div class="check-row"><span style="color:var(--green);display:flex;">${ic('check',16)}</span><span>Datenbank (Supabase, nativ integriert)</span></div>
          <div class="check-row"><span style="color:var(--green);display:flex;">${ic('check',16)}</span><span>Login & Authentifizierung</span></div>
          <div class="check-row"><span style="color:var(--green);display:flex;">${ic('check',16)}</span><span>Lovable Cloud zum Deployen</span></div>
          <div class="check-row"><span style="color:var(--green);display:flex;">${ic('check',16)}</span><span>Lovable AI für smarte Features</span></div>
        </div>
      </div>
      <div>
        <div class="highlight" style="border-color:var(--blue-border);background:rgba(0,118,219,0.05);">
          <p style="font-size:1.75rem;font-weight:700;color:var(--text);line-height:1.3;">Je präziser euer Prompt, desto besser euer Prototyp.</p>
          <p class="mt-16" style="font-size:0.95rem;">Deshalb investieren wir jetzt Zeit in ein strukturiertes Framework - damit der erste Prompt sitzt.</p>
        </div>
        <div class="card mt-16" style="border-left:3px solid var(--amber);">
          <h3 style="font-size:0.95rem;color:var(--amber);margin-bottom:8px;">Gemeinsam arbeiten</h3>
          <p style="font-size:0.9rem;color:var(--text);">Nutzt das LLM eurer Wahl, um euren Master Prompt zu entwickeln — und speichert ihn als Text- oder Markdown-Datei. So habt ihr ihn sauber parat.</p>
        </div>
      </div>
    </div>
  </div>
  `
});
