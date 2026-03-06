
(window.__slides = window.__slides || []).push({
  phase: 'general',
  html: `
    <div class="slide-content">
    <span class="tag mb-16">Community Partner</span>
    <h2>Unsere Partner</h2>
    <p class="mt-8">Gemeinsam bringen wir unterschiedliche Welten zusammen.</p>
    <div class="grid-4 mt-32" style="max-width:960px;margin:0 auto;">
      ${['KINN','InnCubator','Women4Cyber','ICONS','WKO Tirol','WIFI Tirol','Fusion Peak','Standortagentur Tirol'].map(p => `
        <div class="card" style="text-align:center;padding:18px 14px;">
          <h3 style="font-size:1.05rem;font-weight:700;color:var(--text);">${p}</h3>
        </div>`).join('')}
    </div>
  </div>
  `
});
