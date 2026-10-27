// =====================================================================================
// VETWEEFSEL (wit vetweefsel). Recept: witte vetcel 50–150 µm; één grote vetdruppel vult ± 90 % van de cel; cytoplasma
// als dun randje met een paar mitochondriën; kern platgedrukt (sikkel) tegen de rand. In weefsel drukken de cellen tegen
// elkaar tot veelhoeken met afgeronde hoeken, onregelmatig (80–120 % grootteverschil, geen honingraat), met dun bindweefsel
// en haarvaten ertussen. Bron: Junqueira's Basic Histology h. 6; OpenStax A&P 2e 4.3 (adipocyten, één grote vetdruppel).
// Bekende fouten: raster van gelijke rondjes of zeshoeken; kern in het midden.
// v2 (beeldbank 27 okt 2026): eigen onregelmatige celverdeling (punten met minimumafstand, geen verschoven rijen), dun
// cytoplasmarandje met mitochondriën zodat het een cel blijft lezen, en o.vul 0..1: bij leeglopen (vasten, energie
// verbruiken) krimpt de vetdruppel en de cel, het randje wordt dikker en de cellen worden hoekiger met meer bindweefsel
// ertussen (vul 1 = gevuld, ± 0,3 = flink geslonken). Tekent de vetcellen zelf (los van vetcel()).
// v2.1 (blinde beoordeling ronde 2): haarvaten volgen de grenzen tussen de cellen (in het bindweefsel), niet meer dwars over
// de cellen (Digital Histology 'Adipose 1': vaten in het bindweefsel tussen de vetcellen; OpenStax A&P 4.3).
// o: a, d (celmaat in px), seed, haarvat, t, vul. Geeft { cellen: [[x,y]…] } terug (middens, voor namen).
// =====================================================================================
function _vwCellen(key, w, h, d, seed) { // onregelmatige celmiddens (minimumafstand) + veelhoeken (gecachet)
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const cs = []; const nDoel = Math.round(w * h / (d * d * 0.86)) + 4; let k = 0;
  while (cs.length < nDoel && k < nDoel * 60) { k++; const p = [(hash(seed * 31 + k * 7.13) - 0.5) * (w + d), (hash(seed * 17 + k * 3.71) - 0.5) * (h + d)];
    const min = d * (0.72 + 0.28 * hash(k * 1.9 + seed)); if (cs.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > min)) cs.push(p); }
  const polys = cs.map((p, i) => { const pts = []; for (let m = 0; m < 40; m++) { const an = m / 40 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.9;
      cs.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); const proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); });
      pts.push([p[0] + ux * Math.max(0, best - 2), p[1] + uy * Math.max(0, best - 2)]); }
    return { c: p, pts }; });
  _bioPolyCache[key] = polys; return polys;
}
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0, vul = 1 } = o; if (a <= 0.01) return { cellen: [] };
  const v = clamp(vul, 0, 1), krimp = lerp(0.8, 1, v), druppel = lerp(0.42, 0.86, v);
  const polys = _vwCellen('vw2' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = '#6E4A44'; ctx.fillRect(x - w / 2, y - h / 2, w, h); // bindweefsel tussen de cellen
  ctx.strokeStyle = rgba('#C9A090', 0.35); ctx.lineWidth = 1.2; for (let i = 0; i < 14; i++) { const yy = y - h / 2 + hash(i * 5.1 + seed) * h; ctx.beginPath(); ctx.moveTo(x - w / 2, yy); ctx.bezierCurveTo(x - w / 6, yy - 30, x + w / 6, yy + 30, x + w / 2, yy + (hash(i) - 0.5) * 40); ctx.stroke(); } // collageenvezels
  const middens = [];
  polys.forEach((pg, i) => { const cx = x + pg.c[0], cy = y + pg.c[1]; middens.push([cx, cy]);
    const hoek = 1 - v; // leger = hoekiger: minder afgeronde omtrek
    const om = pg.pts.map(p => [cx + p[0] * krimp - pg.c[0] * krimp, cy + p[1] * krimp - pg.c[1] * krimp]);
    ctx.beginPath(); hoek > 0.4 ? om.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])) : bioPad(ctx, om, true); ctx.closePath();
    shape(ctx, '#D8C9A8', '#EADCC0', 1.5); // cel: cytoplasmarandje
    const dr = om.map(p => [cx + (p[0] - cx) * druppel, cy + (p[1] - cy) * druppel]);
    ctx.beginPath(); bioPad(ctx, dr, true); shape(ctx, rgba(BIO.vet, 0.92), rgba(BIO.vetS, 0.9), 1.2); // vetdruppel
    // kern als sikkel tegen de rand (rechtsonder), mitochondriën in het randje
    let bi = 0, bv = -1e9; om.forEach((p, k) => { const s2 = (p[0] - cx) * 0.6 + (p[1] - cy) + hash(i * 3.3) * 30; if (s2 > bv) { bv = s2; bi = k; } });
    const kp = om[bi], an = Math.atan2(kp[1] - cy, kp[0] - cx), rr = Math.hypot(kp[0] - cx, kp[1] - cy), rk = lerp(0.93, (1 + druppel) / 2, 0.5);
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * rr * rk, cy + Math.sin(an) * rr * rk, Math.max(4, rr * 0.2), Math.max(2, rr * (0.06 + 0.06 * (1 - v))), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1);
    if (d > 50) for (let m = 0; m < 2; m++) { const k2 = (bi + 13 + m * 9 + Math.floor(hash(i + m) * 4)) % om.length, q = om[k2], a2 = Math.atan2(q[1] - cy, q[0] - cx), r2 = Math.hypot(q[0] - cx, q[1] - cy) * (1 + druppel) / 2;
      ctx.beginPath(); ctx.ellipse(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2, Math.max(2.5, d * 0.035), Math.max(1.2, d * 0.014 + (1 - v) * d * 0.01), a2 + Math.PI / 2, 0, 6.283); shape(ctx, rgba(C.koraal || '#E07A5F', 0.85), null); } });
  // haarvaten lopen in het bindweefsel tússen de cellen: het pad volgt de grenzen tussen buurcellen (middelloodlijn van de
  // twee dichtstbijzijnde celmiddens), nooit dwars over een vetdruppel
  if (haarvat) { const S = polys.map(pg => [x + pg.c[0], y + pg.c[1]]);
    const grens = (px, py) => { let i1 = 0, i2 = 1, d1 = 1e9, d2 = 1e9; S.forEach((q, i) => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < d1) { d2 = d1; i2 = i1; d1 = d; i1 = i; } else if (d < d2) { d2 = d; i2 = i; } });
      const A = S[i1], B = S[i2], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, nx = (B[0] - A[0]) / (Math.hypot(B[0] - A[0], B[1] - A[1]) || 1), ny = (B[1] - A[1]) / (Math.hypot(B[0] - A[0], B[1] - A[1]) || 1);
      const k = (px - mx) * nx + (py - my) * ny; return [px - k * nx, py - k * ny]; };
    const rv = Math.max(2.5, d * 0.035);
    for (const [hor, f] of [[true, 0.12], [false, 0.18]]) { const P = [];
      if (hor) for (let xx = x - w / 2 - 10; xx <= x + w / 2 + 10; xx += d * 0.12) P.push(grens(xx, y + h * f + Math.sin(xx / w * 5) * h * 0.08));
      else for (let yy = y - h / 2 - 10; yy <= y + h / 2 + 10; yy += d * 0.12) P.push(grens(x + w * f + Math.sin(yy / h * 4) * w * 0.05, yy));
      // knip waar het pad naar een andere grens springt (anders snijdt de bocht door een cel); elk stuk apart
      const stukken = [[]]; P.forEach((q, i) => { if (i && Math.hypot(q[0] - P[i - 1][0], q[1] - P[i - 1][1]) > d * 0.22) stukken.push([]); stukken[stukken.length - 1].push(q); });
      stukken.forEach((Q, j) => { if (Q.length < 3) return; bloedvat(ctx, Q, rv, t + j + (hor ? 0 : 3), { n: Math.max(2, Math.round(Q.length / 5)), speed: 0.06, haarvat: true, wand: '#B5574A' }); }); } }
  ctx.restore(); return { cellen: middens };
}
