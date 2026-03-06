
(window.__slides = window.__slides || []).push({
  phase: 'konzeption',
  html: `
    <div class="slide-content">
    <div class="badge badge-blue mb-20">Phase 02 - Prompt-Framework</div>
    <h2>Euer Master Prompt</h2>
    <div class="two-col mt-24" style="grid-template-columns:1.2fr 0.8fr;gap:32px;">
      <div>
        <div class="prompt-item"><div class="prompt-num">1</div><div><div class="prompt-label">Kontext & Problem</div><div class="prompt-desc">Was ist die Ausgangssituation? Welches Problem lösen wir für wen?</div></div></div>
        <div class="prompt-item"><div class="prompt-num">2</div><div><div class="prompt-label">Zielgruppe</div><div class="prompt-desc">Wer nutzt die App? Was sind deren Bedürfnisse?</div></div></div>
        <div class="prompt-item"><div class="prompt-num">3</div><div><div class="prompt-label">Features</div><div class="prompt-desc">Was muss die App können? Priorisiert: Was ist Kern, was ist Nice-to-have? Es ist ein Prototyp - anteasern ist erlaubt!</div></div></div>
        <div class="prompt-item"><div class="prompt-num">4</div><div><div class="prompt-label">Technische Anforderungen</div><div class="prompt-desc">Braucht ihr Login? Datenbank? SaaS-Modell? WebApp oder Mobile?</div></div></div>
        <div class="prompt-item"><div class="prompt-num">5</div><div><div class="prompt-label">User Journey</div><div class="prompt-desc">Einstieg → Kernfunktion → Ergebnis</div></div></div>
        <div class="prompt-item"><div class="prompt-num">6</div><div><div class="prompt-label">Design & Styling</div><div class="prompt-desc">Welcher Look? Modern, minimalistisch, verspielt, professionell ...</div></div></div>
      </div>
      <div>
        <div class="card mb-16" style="background:rgba(249,115,22,0.06);border-color:var(--orange-border);">
          <h3 style="font-size:0.95rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
            <span style="color:var(--orange);">${ic('bulb',18)}</span>Pro-Tipp
          </h3>
          <p style="font-size:0.88rem;color:var(--text);line-height:1.7;">
            Schreibt euren Prompt zuerst in einem <strong>Chat-Modell</strong> (ChatGPT, Claude, etc.) und lasst ihn dort verfeinern. Dann copy-paste in Lovable.
          </p>
        </div>
        <div class="card mb-16" style="background:var(--blue-soft);border-color:var(--blue-border);">
          <h3 style="font-size:0.95rem;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
            <span style="color:var(--blue-light);">${ic('users',18)}</span>Jede:r bringt etwas mit
          </h3>
          <p style="font-size:0.88rem;color:var(--text);line-height:1.7;">
            Im Team stecken verschiedenste Erfahrungen und Perspektiven. Bringt eure Ideen aktiv ein - und gebt allen den Raum, dasselbe zu tun.
          </p>
        </div>
        <div class="card"><p style="font-size:0.88rem;color:var(--text-2);">Die Leitfragen liegen gedruckt vor - nutzt sie als Checkliste für euren Prompt.</p></div>
      </div>
    </div>
  </div>
  `
});
