// =====================================================================================
// LAC-OPERON (rij op het DNA, repressor op de operator). Ronde-1-winnaar (C), in ronde 2 alleen de fout hersteld: de repressor
// zat bóven de operator; nu ligt hij er met zijn onderkant (de pasvorm) óp (ry = y − 6·s i.p.v. y − 70·s). Recept (OpenStax Biology 2e § 16.2; Lodish 8e § 7.2;
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
// (_grKluwen, het gedeelde lint-hulpje uit ronde 1, staat al in lib_bio.js en is hier weggelaten.)
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
  const ox = uit.operator[0], ry = y - 6 * s - los * 274 * s, rx = ox + los * 120 * s, rot = los * 0.5;
  [-1, 1].forEach(k => { const binnen = (px2, py2) => { const ex = px2 / 74, ey = (py2 + 4) / 64; return ex * ex + ey * ey < 1 && Math.hypot(px2, py2 - 66) > 30 && px2 * k > 3; };
    _grKluwen(ctx, rx, ry, binnen, { r: 6.5, sc: s * 1.6, col: k < 0 ? '#A57F7A' : '#B08A84', seed: k < 0 ? 8 : 11, rot, bbox: [-76, -66, 76, 60], key: 'lacA' + k }); });
  uit.repressor = [rx, ry - 70 * s];
  // allolactose: twee moleculen drijven aan en zakken in de holtes van de repressor
  [-1, 1].forEach(k => { const doelX = rx + k * 46 * s * 1.6 * Math.cos(rot), doelY = ry - 10 * s * 1.6 + k * 46 * s * 1.6 * Math.sin(rot); const sx0 = ox + k * 360 * s + 200 * s, sy0 = y - 330 * s + k * 30 * s;
    if (lactose > 0.01) _lacSuiker(ctx, lerp(sx0, doelX, kom), lerp(sy0, doelY, kom), 13 * s * 1.6, Math.min(1, lactose * 6)); });
  ctx.restore(); return uit;
}
