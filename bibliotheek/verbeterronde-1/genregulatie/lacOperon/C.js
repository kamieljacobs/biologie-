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
// GEDEELD HULPJE (groep genregulatie, ronde 2, 27 okt 2026): EIWITKLUWEN als ÉÉN GEVOUWEN KETEN (lintmodel). Eén keer in
// lib_bio.js plakken; transcriptiefactor, lacOperon, rnaInterferentie en uvSchade gebruiken het (kopieën in hun bestanden zijn gelijk).
// Recept (C9, BEELDAFSPRAKEN 'eiwitten zijn een keten die vouwt'; vouwstanden als eiwitVouw): de ruggengraat is één doorlopende
// gladde buis (dikke lijn met lichte rand) die heen en weer door de omtrek loopt; 2–3 stukken zijn α-helix (spiraaltje,
// 3,6 aminozuren per winding, voorkant licht, achterkant donker) en een paar stukken zijn β-streng (brede pijl, buren
// antiparallel = een plaat); bochten zijn lussen. Samen een compacte kluwen; de omtrek (binnen(x, y), ontwerpeenheden) mag een
// pasvorm hebben. o.fold 0 = gestrekte keten → 1 = gevouwen (helices en pijlen verschijnen pas aan het eind van het vouwen).
// o.sc = schaal; o.r = buisdikte-maat; o.key = cachesleutel. Geeft de punten van de hartlijn in beeld terug ([x, y, z]).
// Bekende fouten: losse kralen of bolletjeswolk; een bol; helix als zigzag zonder voor/achter.
// -------------------------------------------------------------------------------------
const _grKluwenCache = {};
function _grKluwenVorm(binnen, bbox, r, seed) { // rijen door de omtrek, met soort per rij: h = helix, s = streng, l = lus
  const rows = [], gap = r * 3.1; for (let y = bbox[1] + r * 1.8; y <= bbox[3] - r * 1.4; y += gap) rows.push(y);
  const spans = []; rows.forEach(y => { let best = null, cur = null; for (let x = bbox[0]; x <= bbox[2]; x += r * 0.4) { if (binnen(x, y)) { if (!cur) cur = [x, x]; cur[1] = x; } else if (cur) { if (!best || cur[1] - cur[0] > best[1] - best[0]) best = cur; cur = null; } }
    if (cur && (!best || cur[1] - cur[0] > best[1] - best[0])) best = cur; if (best && best[1] - best[0] > r * 3) spans.push([y, best[0] + r * 1.3, best[1] - r * 1.3]); });
  const n = spans.length, soort = spans.map(() => 'l'); let h = 0, st = 0;
  const volg = spans.map((_, i) => i).sort((a, b) => hash(seed * 3.1 + a * 7.7) - hash(seed * 3.1 + b * 7.7));
  volg.forEach(i => { const L = spans[i][2] - spans[i][1]; if (h < Math.min(3, Math.max(1, Math.round(n / 3))) && L > r * 6 && soort[i - 1] !== 'h' && soort[i + 1] !== 'h') { soort[i] = 'h'; h++; } });
  for (let i = 0; i < n - 1 && st < 4; i++) if (soort[i] === 'l' && soort[i + 1] === 'l' && hash(seed + i * 2.3) > 0.25) { soort[i] = soort[i + 1] = 's'; st += 2; i++; }
  return spans.map((sp, i) => ({ y: sp[0], x0: sp[1], x1: sp[2], dir: i % 2 ? -1 : 1, soort: soort[i] })); }
function _grKluwen(ctx, cx, cy, binnen, o = {}) {
  const { r = 7, sc = 1, col = '#7A8BA8', seed = 1, a = 1, rot = 0, bbox = [-60, -50, 60, 50], fold = 1, key = null, hl = null } = o; if (a <= 0.01) return [];
  const k = (key || 'k') + '|' + seed + '|' + r + '|' + bbox.join(','); let V = _grKluwenCache[k];
  if (!V) { const rijen = _grKluwenVorm(binnen, bbox, r, seed), P = [];
    rijen.forEach((rj, i) => { const xa = rj.dir > 0 ? rj.x0 : rj.x1, xb = rj.dir > 0 ? rj.x1 : rj.x0;
      if (i > 0) { const q = P[P.length - 1], bx = xa - rj.dir * r * 2.2; for (let u = 0.2; u < 1; u += 0.2) P.push([lerp(q[0], xa, u) + Math.sin(u * Math.PI) * -rj.dir * r * 2.2, lerp(q[1], rj.y, u), 'l', -1]); }
      const m = Math.max(4, Math.round(Math.abs(xb - xa) / (r * 0.8))), Lr = Math.abs(xb - xa), maxL = rj.soort === 'h' ? r * 10 : r * 13, w0 = Lr > maxL ? (Lr - maxL) / 2 / Lr : 0;
        for (let j = 0; j <= m; j++) { const u = j / m, x = lerp(xa, xb, u), tp = (u >= w0 - 1e-6 && u <= 1 - w0 + 1e-6) ? rj.soort : 'l'; P.push([x, rj.y + Math.sin(x / (r * 7) + i * 1.7 + seed) * r * 0.9 + (tp === 'l' ? Math.sin(u * 5 + seed + i) * r * 0.7 * (rj.soort === 'l' ? 1 : 0.4) : 0), tp, tp === 'l' ? -1 : i]); } });
    V = { P, rijen: rijen }; _grKluwenCache[k] = V; }
  const n = V.P.length, cs = Math.cos(rot), sn = Math.sin(rot), Lst = n * r * 0.85;
  const W = (x, y) => [cx + (x * cs - y * sn) * sc, cy + (x * sn + y * cs) * sc];
  const pts = V.P.map((p, i) => { const f = ease(clamp(fold * 1.3 - (i / n) * 0.3, 0, 1)); const bx = -Lst / 2 + i * r * 0.85, by = Math.sin(i * 0.22 + seed) * r * 2.5; return [...W(lerp(bx, p[0], f), lerp(by, p[1], f)), 0]; });
  const deco = ease(clamp((fold - 0.75) / 0.25, 0, 1)), w = r * sc * 1.05, rand = lighten(col, 0.38), donker = _mixHex(col, '#000000', 0.28);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const buis = (Q, kl = col, ww = w) => { if (Q.length < 2) return; ctx.beginPath(); bioPad(ctx, Q, false); ctx.strokeStyle = rand; ctx.lineWidth = ww + 2.4 * Math.max(0.5, sc); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = ww; ctx.stroke(); };
  // 1) de hele keten als buis (bij helices/strengen alleen zolang ze nog niet gevormd zijn)
  ctx.save(); let seg = []; const flush = () => { buis(seg); seg = []; };
  pts.forEach((p, i) => { const tp = V.P[i][2]; if (tp === 'l' || deco < 0.5) seg.push(p); else { if (seg.length) { seg.push(p); flush(); } } }); flush(); ctx.restore();
  if (deco > 0.01) { ctx.save(); ctx.globalAlpha *= deco;
    V.rijen.forEach((rj, i) => { if (rj.soort === 'l') return; const ids = V.P.map((p, j) => p[3] === i ? j : -1).filter(j => j >= 0); if (ids.length < 2) return; const A = pts[ids[0]], B = pts[ids[ids.length - 1]];
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux, isHl = hl && hl(ids[0], n) > 0.5, kl = isHl ? C.goud : col, rd = isHl ? lighten(C.goud, 0.35) : rand;
      if (rj.soort === 's') { const hw = r * sc * 0.95, kop = Math.min(L * 0.35, r * sc * 2.4), q = (t2, s2) => [A[0] + ux * t2 + nx * s2, A[1] + uy * t2 + ny * s2];
        const poly = [q(0, -hw), q(L - kop, -hw), q(L - kop, -hw * 1.75), q(L, 0), q(L - kop, hw * 1.75), q(L - kop, hw), q(0, hw)]; ctx.beginPath(); poly.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, lighten(kl, 0.06), rd, 1.2 * Math.max(0.6, sc)); }
      else { const amp = r * sc * 1.35, tw = Math.max(2, Math.round(L / (amp * 2.1))), N = tw * 24, H = []; for (let j = 0; j <= N; j++) { const u = j / N, ph = u * tw * 6.283; H.push([A[0] + ux * L * u + nx * Math.sin(ph) * amp, A[1] + uy * L * u + ny * Math.sin(ph) * amp, Math.cos(ph)]); }
        [false, true].forEach(voor => { let s2 = []; H.forEach(p => { if ((p[2] >= 0) === voor) s2.push(p); else { if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); s2 = []; } }); if (s2.length > 1) buis(s2, voor ? lighten(kl, 0.12) : _mixHex(isHl ? C.goud : col, '#000000', 0.3), w * (voor ? 1.25 : 1.0)); }); } });
    ctx.restore(); }
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
