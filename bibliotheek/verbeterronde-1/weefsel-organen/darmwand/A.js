// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// v2 (beeldbank 27 okt 2026), recept vlokken (OpenStax A&P 2e 23.5; Junqueira h. 15): dunne darm met vingervormige
// vlokken (± 0,5–1 mm hoog, ± 4× zo hoog als breed, dicht op elkaar) die de holte in steken; in elke vlok een haarvatlus
// (rood) en in het midden een chylvat (lymfe, lichtgeel); bekleed met één laag cilindrische cellen met borstelzoom (alleen
// als de vlok groot genoeg is). Tussen de vlokken de klierbuisjes (crypten). Slijmvlies en kringspier dikker dan in v1,
// zodat de wand op filmformaat geen dunne gestreepte band is. Vlokvorm overgenomen uit de benchmarkscène (darmwandRijk).
// o: a, dikte, vlokken (bool), vh (vlokhoogte, standaard ± 0,9 × dikte, nooit meer dan 0,6 × r), t.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
  ctx.save(); ctx.globalAlpha *= a;
  const riF = (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)), dkF = (xx) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1));
  const N = 160; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(riF), dk = xs.map(dkF);
  ctx.save(); ctx.beginPath(); ctx.rect(x0, yc - r - dikte * 3, x1 - x0, 2 * (r + dikte * 3)); ctx.clip();
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.34, '#B9767A');            // slijmvlies (met klierbuisjes)
    band(0.34, 0.46, '#7E6262');         // bindweefsel (onder het slijmvlies)
    band(0.46, 0.80, '#9A4A46');         // kringspier
    band(0.80, 0.95, '#B5645C');         // lengtespier
    band(0.95, 1.0, '#E2CEC6');          // buitenvlies
    // klierbuisjes (crypten) in het slijmvlies
    ctx.strokeStyle = rgba('#6E3E40', 0.65); ctx.lineWidth = Math.max(1.5, dikte * 0.045); ctx.lineCap = 'round';
    const stap = vlokken ? Math.max(8, dikte * 0.36) : Math.max(6, dikte * 0.22);
    for (let xx = x0 + stap * 0.5; xx < x1; xx += stap) { const yy = yc + kant * riF(xx); ctx.beginPath(); ctx.moveTo(xx, yy + kant * 2); ctx.lineTo(xx, yy + kant * dkF(xx) * 0.28); ctx.stroke(); }
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#461816', 0.55); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.63); ctx.beginPath(); ctx.ellipse(xs[i], yy, Math.max(2, dikte * 0.07), dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.85, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    if (!vlokken) { // dikke darm: plooien met kliergaatjes
      ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
      xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - Math.abs(Math.sin(xx * 0.06)) * 4); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); continue; }
    // dunne darm: vlokken die de holte in steken
    const vh0 = Math.min(r * 0.6, o.vh || dikte * 0.9), vb = vh0 * 0.3, vst = vb * 1.2;
    for (let xx = x0 - vb, k = 0; xx < x1 + vb; k++, xx += vst * (0.88 + 0.24 * hash(k * 3.7 + kant))) { const y0 = yc + kant * riF(xx);
      const h = Math.min(vh0, riF(xx) * 0.6) * (0.85 + 0.15 * hash(k * 7.1 + (kant > 0 ? 3 : 0))), top = y0 - kant * h, sw = Math.sin(t * 1.4 + k * 0.7) * vb * 0.12;
      const pad = () => { ctx.beginPath(); ctx.moveTo(xx - vb * 0.5, y0 + kant * 2); ctx.bezierCurveTo(xx - vb * 0.55, y0 - kant * h * 0.7, xx - vb * 0.5 + sw, top, xx + sw, top); ctx.bezierCurveTo(xx + vb * 0.5 + sw, top, xx + vb * 0.55, y0 - kant * h * 0.7, xx + vb * 0.5, y0 + kant * 2); ctx.closePath(); };
      pad(); ctx.fillStyle = '#C98A86'; ctx.fill();
      ctx.save(); pad(); ctx.clip(); ctx.lineCap = 'round';
      ctx.strokeStyle = rgba('#C83232', 0.75); ctx.lineWidth = Math.max(1.2, vb * 0.08); ctx.beginPath(); ctx.moveTo(xx - vb * 0.24, y0); ctx.quadraticCurveTo(xx - vb * 0.26 + sw * 0.6, top + kant * vb * 0.3, xx + sw, top + kant * vb * 0.2); ctx.quadraticCurveTo(xx + vb * 0.26 + sw * 0.6, top + kant * vb * 0.3, xx + vb * 0.24, y0); ctx.stroke(); // haarvatlus
      ctx.strokeStyle = rgba('#F0D26E', 0.85); ctx.lineWidth = Math.max(1.2, vb * 0.09); ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx + sw * 0.8, top + kant * vb * 0.5); ctx.stroke(); // chylvat
      if (vb > 26) { const M = Math.max(6, Math.round(h / (vb * 0.18))); ctx.strokeStyle = rgba('#6E3232', 0.5); ctx.lineWidth = 1; // cilindercellen met kern
        for (let i = 0; i <= M; i++) for (const z of [-1, 1]) { const u = i / M, px = xx + z * vb * 0.5 * (1 - Math.pow(u, 4) * 0.98) + sw * u, py = y0 - kant * h * u, ix = xx + z * vb * 0.3 * (1 - Math.pow(u, 4)) + sw * u;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ix, py + kant * 2); ctx.stroke(); if (i < M) { ctx.fillStyle = rgba('#5A3C8C', 0.6); ctx.beginPath(); ctx.ellipse((px + ix) / 2, py - kant * h / M * 0.5, vb * 0.04, h / M * 0.3, 0, 0, 6.283); ctx.fill(); } } }
      ctx.restore();
      pad(); ctx.strokeStyle = rgba('#FAE2D8', 0.9); ctx.lineWidth = vb > 26 ? 2.5 : 1.3; ctx.stroke(); // borstelzoom / epitheelrand
    }
  }
  ctx.restore(); ctx.restore(); return { ri: riF };
}
