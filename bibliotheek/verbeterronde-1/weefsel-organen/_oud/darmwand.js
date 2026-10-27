// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const N = 120; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(xx => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)));
  const dk = xs.map((xx, i) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1)));
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.32, rgba('#C98A86', 0.8));           // slijmvlies
    band(0.32, 0.45, rgba('#8A6A6A', 0.6));        // bindweefsel
    band(0.45, 0.78, rgba(BIO.spier, 0.75));       // kringspier
    band(0.78, 0.96, rgba(BIO.spierL, 0.55));      // lengtespier
    band(0.96, 1.0, rgba('#E6D0C8', 0.7));         // buitenvlies
    // slijmvlies-oppervlak: plooien met kliergaatjes (of vlokken)
    ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
    xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - (vlokken ? Math.max(0, Math.sin(xx * 0.12)) * 9 : Math.abs(Math.sin(xx * 0.06)) * 4)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.strokeStyle = rgba('#7A4A4A', 0.6); ctx.lineWidth = 2; for (let i = 3; i < N; i += 4) { const yy = yc + kant * ri[i]; ctx.beginPath(); ctx.moveTo(xs[i], yy); ctx.lineTo(xs[i], yy + kant * dk[i] * 0.24); ctx.stroke(); } // klieren
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#5A2A26', 0.5); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.615); ctx.beginPath(); ctx.ellipse(xs[i], yy, 3.5, dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.83, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  }
  ctx.restore(); return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
}
