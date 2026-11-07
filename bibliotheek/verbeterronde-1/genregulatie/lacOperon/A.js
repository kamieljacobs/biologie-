// =====================================================================================
// LAC-OPERON (rij op het DNA, repressor op de operator). Recept (OpenStax Biology 2e § 16.2; Lodish 8e § 7.2;
// BioNumbers 102070: lacZ = 3075 bp):
//  - volgorde: regulatorgen lacI (maakt de repressor, ligt los ervoor) … promotor → operator → lacZ → lacY → lacA. Eén
//    promotor voor drie genen: één mRNA voor alle drie. lacZ is het langste gen; lacY en lacA korter (verhouding bij benadering).
//  - zonder lactose zit de lac-repressor op de operator en houdt RNA-polymerase tegen. De repressor is een eiwit (tetrameer =
//    twee paren; hier één paar zichtbaar op de operator), gevouwen keten, geen bol.
//  - met lactose bindt het omzettingsproduct allolactose aan de repressor; die verandert van vorm, laat de operator los, en
//    RNA-polymerase schrijft de drie genen over tot één mRNA (dunne teal sliert).
//  - o.lactose 0..1: 0–0.3 suiker komt aan en bindt · 0.3–0.5 repressor laat los · 0.5–1 polymerase loopt, mRNA groeit.
// Bekende fouten: operator vóór de promotor; drie aparte promotors; repressor die op een gen zit; lactose die op het DNA bindt.
// Vereist dnaDraad (lib_micro_evo.js). (x0, y) = begin van lacI op de DNA-as; w = lengte t/m lacA (± w × 0,4 hoog met
// repressor). o.lactose 0..1, o.lacI (standaard aan), o.t. Plaatshouder voor RNA-polymerase (eigen object: rnaPolymerase).
// Geeft {lacI, promotor, operator, genen: [[x, y] ×3], repressor, polymerase, mrna} terug.
// =====================================================================================
// -------------------------------------------------------------------------------------
// GEDEELD HULPJE (groep genregulatie, 27 okt 2026): EIWITKLUWEN binnen een omtrek. Eén keer in lib_bio.js plakken;
// transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (de kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN): een eiwit is een keten van aminozuren (kralen) die vouwt: stukken α-helix (strakke
// spiraal, 3,6 aminozuren per winding) afgewisseld met gestrekte stukken en lussen, samen een compacte kluwen. Nooit een
// bol. De omtrek (binnen(x, y) in lokale coördinaten) mag een pasvorm hebben: een holte waar DNA of een molecuul in past.
// Alle maten (bbox, binnen, r) in ontwerpeenheden; o.sc = schaal naar beeld. o.fold 0 = gestrekte keten (net gemaakt) → 1 = gevouwen; o.key = cachesleutel voor de vorm. Geeft de kralen in beeld terug.
// Kleur: regeleiwitten en enzymen grijsblauw (#7A8BA8, C2); de bindende plek mag goud (o.hl = functie(i) → 0..1).
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r: r0 = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null, sx = 1 } = o; const r = r0; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r.toFixed(2) + '|' + bbox.join(',');
  let P = _grKluwenCache[k];
  if (!P) { P = []; const rows = []; for (let y = bbox[1] + r * 1.1; y <= bbox[3] - r * 0.9; y += r * 2.45) rows.push(y);
    rows.forEach((y, ri) => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
      if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (!best || best[1] - best[0] < r * 2) return;
      const x0 = best[0] + r * 0.9, x1 = best[1] - r * 0.9, dir = ri % 2 ? -1 : 1, helix = hash(seed * 7.3 + ri * 3.1) > 0.42 && x1 - x0 > r * 6;
      const L = x1 - x0, stap = helix ? r * 0.95 : r * 1.7, n = Math.max(2, Math.round(L / stap));
      if (P.length) { const q = P[P.length - 1], xs = dir > 0 ? x0 : x1; P.push([(q[0] + xs) / 2 + dir * -r * 1.1, (q[1] + y) / 2, 0]); }
      for (let i = 0; i <= n; i++) { const u = i / n, x = dir > 0 ? lerp(x0, x1, u) : lerp(x1, x0, u);
        if (helix) { const ph = i / 3.6 * 6.283 + seed; P.push([x, y + Math.sin(ph) * r * 0.95, Math.cos(ph)]); } else P.push([x + (hash(seed * 3.7 + ri * 11 + i * 1.3) - 0.5) * r * 0.6, y + Math.sin(i * 0.9 + seed) * r * 0.25 + (hash(seed * 5.1 + ri * 7 + i * 2.9) - 0.5) * r * 0.9, 0]); } });
    _grKluwenCache[k] = P; }
  const n = P.length, L = n * r * 1.8;
  const pts = P.map((p, i) => { const f = ease(clamp(fold * 1.4 - (i / n) * 0.4, 0, 1)); const bx = -L / 2 + i * r * 1.8, by = Math.sin(i * 0.35 + seed) * r * 3;
    const X = lerp(bx, p[0] * sx, f) * sc, Y = lerp(by, p[1], f) * sc, cs = Math.cos(rot), sn = Math.sin(rot);
    return [cx + X * cs - Y * sn, cy + X * sn + Y * cs, (p[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * sc * 0.38); ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  const tint = [0, 0.12, -0.1]; const order = pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]);
  order.forEach(i => { const p = pts[i], z = p[2], t = tint[(i * 7 + seed) % 3]; const h = hl ? hl(i, n) : 0;
    const fill = h > 0.5 ? C.goud : (t >= 0 ? lighten(col, t + 0.08 * z) : _mixHex(col, '#000000', -t)); ctx.beginPath(); ctx.arc(p[0], p[1], r * sc * (0.84 + 0.14 * z), 0, 6.283); shape(ctx, fill, h > 0.5 ? lighten(C.goud, 0.35) : lighten(col, 0.3), 1); });
  ctx.restore(); return pts;
}
function _lacSuiker(ctx, x, y, r, a = 1) { // (allo)lactose: twee zesringen (galactose + glucose) met een brug; oker = voedingsmolecuul (C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(C.oker, 0.35); ctx.fillStyle = rgba(C.oker, 0.55); ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineJoin = 'round';
  const ring = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + Math.PI / 6, X = cx + Math.cos(an) * r, Y = cy + Math.sin(an) * r * 0.62; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  ring(x - r * 1.25, y); ring(x + r * 1.25, y + r * 0.35); ctx.beginPath(); ctx.moveTo(x - r * 0.3, y + r * 0.2); ctx.lineTo(x + r * 0.3, y + r * 0.3); ctx.stroke(); ctx.restore(); }
function _lacMRNA(ctx, x0, x1, y, s, t = 0) { if (x1 - x0 < 3) return; ctx.strokeStyle = C.teal; ctx.lineWidth = 2.6 * s; ctx.lineCap = 'round'; ctx.beginPath(); // dunne sliert (C9: ± half zo dik als DNA)
  for (let u = x0; u <= x1; u += 5 * s) { const Y = y + Math.sin(u / (30 * s) + t) * 8 * s + Math.sin(u / (83 * s)) * 5 * s; u === x0 ? ctx.moveTo(u, Y) : ctx.lineTo(u, Y); } ctx.stroke(); }
function _lacMouw(ctx, x0, x1, y, h, fill, rand, s) { roundRect(ctx, x0, y - h / 2, x1 - x0, h, h * 0.3); shape(ctx, fill, rand, 1.5 * Math.max(0.6, s)); }
function lacOperon(ctx, x0, y, w, o = {}) {
  const { a = 1, lactose = 0, lacI = true, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1600, dw = Math.max(5, 26 * s), mh = 62 * s, uit = { genen: [] };
  const X = (bp) => x0 + bp * s; // indeling in 'beeldeenheden' (lacZ 3075 bp → 560, lacY → 240, lacA → 130; rest schematisch)
  const R = { I: [0, 230], p: [330, 470], o: [478, 540], Z: [552, 1112], Y: [1124, 1364], A: [1376, 1506] };
  const kom = ease(clamp(lactose / 0.3, 0, 1)), los = ease(clamp((lactose - 0.3) / 0.2, 0, 1)), loop = ease(clamp((lactose - 0.5) / 0.5, 0, 1));
  ctx.save(); ctx.globalAlpha *= a;
  if (lacI) _lacMouw(ctx, X(R.I[0]), X(R.I[1]), y, mh, rgba(C.paars, 0.3), rgba(C.paars, 0.8), s);
  _lacMouw(ctx, X(R.p[0]), X(R.p[1]), y, mh, rgba(C.goud, 0.28), rgba(C.goud, 0.8), s);
  _lacMouw(ctx, X(R.o[0]), X(R.o[1]), y, mh, rgba(C.koraal, 0.3), rgba(C.koraal, 0.85), s);
  ['Z', 'Y', 'A'].forEach(g => { _lacMouw(ctx, X(R[g][0]), X(R[g][1]), y, mh, rgba(C.kernR, 0.3 + 0.25 * loop), C.kernR, s); uit.genen.push([(X(R[g][0]) + X(R[g][1])) / 2, y]); });
  dnaDraad(ctx, [[X(-40), y], [X(1560), y]], { w: dw, helix: true, glad: false, fase: t * 0.05 });
  const xs = X(R.p[1]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s * 1.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs, y + mh / 2); ctx.lineTo(xs, y + mh * 1.05); ctx.lineTo(xs + 46 * s, y + mh * 1.05); ctx.stroke();
  uit.lacI = [(X(R.I[0]) + X(R.I[1])) / 2, y]; uit.promotor = [(X(R.p[0]) + X(R.p[1])) / 2, y]; uit.operator = [(X(R.o[0]) + X(R.o[1])) / 2, y];
  // RNA-polymerase (plaatshouder): wacht bij de promotor, loopt na het loslaten over de genen; mRNA erachter
  const px = lerp(X(R.p[0] + 40), X(R.A[1] - 30), loop), py = y - 66 * s; if (loop > 0.01) _lacMRNA(ctx, X(R.Z[0]), px - 40 * s, y - 150 * s, s, t);
  enzymKluwen(ctx, px, py, 70 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2 }); uit.polymerase = [px, py]; if (loop > 0.01) uit.mrna = [(X(R.Z[0]) + px) / 2, y - 150 * s];
  // repressor: paar kluwens op de operator; met allolactose kantelt het en gaat omhoog weg
  const ox = uit.operator[0], ry = y - 70 * s - los * 210 * s, rx = ox + los * 120 * s, rot = los * 0.5;
  [-1, 1].forEach(k => { const binnen = (px2, py2) => { const ex = px2 / 74, ey = (py2 + 4) / 64; return ex * ex + ey * ey < 1 && Math.hypot(px2, py2 - 66) > 30 && px2 * k > 3; };
    _grKluwen(ctx, rx, ry, binnen, { r: 6.5, sc: s * 1.6, col: k < 0 ? '#A57F7A' : '#B08A84', seed: k < 0 ? 8 : 11, rot, bbox: [-76, -66, 76, 60], key: 'lacA' + k }); });
  uit.repressor = [rx, ry - 70 * s];
  // allolactose: twee moleculen drijven aan en zakken in de holtes van de repressor
  [-1, 1].forEach(k => { const doelX = rx + k * 46 * s * 1.6 * Math.cos(rot), doelY = ry - 10 * s * 1.6 + k * 46 * s * 1.6 * Math.sin(rot); const sx0 = ox + k * 360 * s + 200 * s, sy0 = y - 330 * s + k * 30 * s;
    if (lactose > 0.01) _lacSuiker(ctx, lerp(sx0, doelX, kom), lerp(sy0, doelY, kom), 13 * s * 1.6, Math.min(1, lactose * 6)); });
  ctx.restore(); return uit;
}
