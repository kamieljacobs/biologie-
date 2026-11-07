/* Live werksessie-melding (Biologie bij Kamiel)
   Loopt er een werksessie, dan zet dit script bovenaan de pagina een balk 'Live werksessie: <film> · Doe mee'.
   Leest het openbare knooppunt live/ uit de Firebase-database (alleen filmtitel en starttijd, géén code:
   de code staat alleen op het bord). In demomodus (sessie/ zonder Firebase) leest het de demo-opslag.
   Gebruik: <script src="<pad>js/live.js" data-root="<pad naar de siteroot>" defer></script>
   Optioneel data-plek="<id>": zet de balk in dat element in plaats van bovenaan de body. */
(function () {
  'use strict';
  var DB = 'https://edutool-4b00b-default-rtdb.europe-west1.firebasedatabase.app';
  var MAX = 4 * 3600 * 1000; // een vergeten sessie verdwijnt na 4 uur uit de melding
  var S = document.currentScript, ROOT = (S && S.getAttribute('data-root')) || './', PLEK = S && S.getAttribute('data-plek');
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function toon(live) {
    var nu = Date.now(), lijst = Object.keys(live || {}).map(function (k) { return live[k]; })
      .filter(function (x) { return x && x.titel && nu - (x.sinds || 0) < MAX; })
      .sort(function (a, b) { return b.sinds - a.sinds; });
    var oud = document.getElementById('live-balk'); if (oud) oud.remove();
    if (!lijst.length) return;
    if (!document.getElementById('live-css')) {
      var st = document.createElement('style'); st.id = 'live-css';
      st.textContent = '#live-balk{border-radius:0;display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;padding:10px 16px;background:var(--goud-soft,rgba(224,182,74,.13));border-bottom:1px solid var(--goud,#E0B64A);font:600 15px/1.35 var(--tekst,system-ui,sans-serif);color:var(--text,#F2F2EE)}' +
        '#live-balk .lb-stip{width:10px;height:10px;border-radius:50%;background:var(--koraal,#E8876C);flex:none;animation:lbp 1.6s ease-in-out infinite}' +
        '@keyframes lbp{50%{opacity:.35}}@media (prefers-reduced-motion:reduce){#live-balk .lb-stip{animation:none}}' +
        '#live-balk .lb-mono{font:600 12px var(--meta,monospace);letter-spacing:.1em;text-transform:uppercase;color:var(--goud-text,#E8C266)}' +
        '#live-balk a{margin-left:auto;display:inline-flex;align-items:center;min-height:38px;padding:0 16px;border-radius:999px;background:var(--goud,#E0B64A);color:var(--goud-ink,#1A1405);text-decoration:none;font-weight:700}' +
        '#live-balk .lb-in{max-width:1180px;margin:0 auto;width:100%;display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap}';
      document.head.appendChild(st);
    }
    var b = document.createElement('div'); b.id = 'live-balk'; b.setAttribute('role', 'status');
    b.innerHTML = '<div class="lb-in"><span class="lb-stip" aria-hidden="true"></span><span class="lb-mono">Klas live</span><span>' +
      lijst.map(function (x) { return esc(x.titel); }).join(' · ') + '</span>' + (PLEK ? '' : '<a href="' + ROOT + 'sessie/">Doe mee met de code</a>') + '</div>';
    var p = PLEK && document.getElementById(PLEK);
    if (p) p.appendChild(b); else document.body.insertBefore(b, document.body.firstChild);
  }
  function haal() {
    var demo = null;
    try { var d = JSON.parse(localStorage.getItem('bk-sessie-demo') || 'null'); demo = d && d.live; } catch (e) { /* geen opslag */ }
    fetch(DB + '/live.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (x) { var alles = {}; [x, demo].forEach(function (o) { if (o) Object.keys(o).forEach(function (k) { alles[k] = o[k]; }); }); toon(alles); })
      .catch(function () { toon(demo); });
  }
  function start() { haal(); setInterval(function () { if (!document.hidden) haal(); }, 60000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
