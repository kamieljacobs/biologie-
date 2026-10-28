// =====================================================================================
// LAC-OPERON — variant A (verbeterronde 2): VLAKKE LEERBOEKSTROOK. Eenvoud voorop: het DNA is een platte ladder
// (twee rails, korte sporten, geen draaiing), de gebieden zijn gekleurde vakken achter de ladder, zoals in een leerboekschema.
// Recept (Pierce, Genetics Essentials 3e § 12.8; BioNumbers 102084, Müller-Hill 1996):
//  - volgorde op het DNA: regulatorgen lacI (eigen promotor, ligt ervoor) … promotor → operator → lacZ → lacY → lacA.
//    Eén promotor voor de drie genen: één mRNA. lacZ is het langste gen (3075 bp); lacY en lacA korter (verhouding bij benadering).
//  - ZONDER lactose zit de repressor ÓP de operator (hij bindt het DNA zelf, bindingsconstante ± 10^9 M⁻¹): de onderkant van het
//    eiwit ligt over de ladder heen, twee 'koppen' grijpen in het DNA. RNA-polymerase zit op de promotor maar kan niet verder.
//    (Fout ronde 1, twee bronnen: de repressor zweefde bóven de operator.)
//  - MET lactose bindt allolactose (oker, twee zesringen) aan de repressor; die verandert van vorm en laat het DNA los;
//    RNA-polymerase schrijft lacZ, lacY en lacA over tot één dunne mRNA-sliert (teal).
//  - kleuren met betekenis en duidelijk verschillend in lichtheid: promotor goud, operator koraal (rem), genen groen (licht →
//    voller als ze worden afgelezen), lacI grijsblauw; repressor koraal kralenketen (remmer, C2), polymerase grijsblauw kralenketen.
//    DNA-rails paars (DNA, Part C1), rustig.
//  - o.lactose 0..1: 0–0,3 allolactose komt aan en bindt · 0,3–0,5 repressor laat los en zweeft weg · 0,5–1 polymerase loopt,
//    mRNA groeit.
// Bekende fouten: repressor die boven de operator zweeft; operator vóór de promotor; drie aparte promotors; lactose op het DNA.
// Aanroep (zelfde als ronde 1): lacOperon(ctx, x0, y, w, {a, lactose, lacI, t}); (x0, y) = begin van lacI op de DNA-as,
// w = lengte t/m lacA (± w × 0,35 hoog met eiwitten). Geeft {lacI, promotor, operator, genen: [[x, y] ×3], repressor,
// polymerase, mrna} terug (punten in beeld, voor namen).
// Vereist _grKralen (lib_bio.js). Het mRNA is hier een eigen eenvoudige sliert (_lacSliert), zonder basen of codons.
// =====================================================================================
function _lacSuiker(ctx, x, y, r, a = 1) { // (allo)lactose: twee zesringen (galactose + glucose) met een brug; oker = voedingsmolecuul (C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(C.oker, 0.35); ctx.fillStyle = rgba(C.oker, 0.6); ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineJoin = 'round';
  const ring = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + Math.PI / 6, X = cx + Math.cos(an) * r, Y = cy + Math.sin(an) * r * 0.62; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  ring(x - r * 1.25, y); ring(x + r * 1.25, y + r * 0.35); ctx.beginPath(); ctx.moveTo(x - r * 0.3, y + r * 0.2); ctx.lineTo(x + r * 0.3, y + r * 0.3); ctx.stroke(); ctx.restore(); }
function _lacSliert(ctx, xa, ya, xb, yb, s, t = 0) { // dunne mRNA-sliert (C9: ± half zo dik als DNA, kronkelend), van (xa, ya) = 5' naar (xb, yb) = 3'
  if (xb - xa < 4) return; ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = Math.max(1.4, 5 * s); ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60; for (let i = 0; i <= n; i++) { const u = i / n, X = lerp(xa, xb, u), Y = lerp(ya, yb, u * u) + Math.sin(u * 9 + t) * 14 * s * (1 - u * 0.6) + Math.sin(u * 23 + 1) * 4 * s; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.stroke(); ctx.restore(); }
function lacOperon(ctx, x0, y, w, o = {}) {
  const { a = 1, lactose = 0, lacI = true, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1600, uit = { genen: [] }, X = (u) => x0 + u * s;
  const R = { I: [0, 210], p: [300, 430], o: [430, 500], Z: [510, 1070], Y: [1080, 1308], A: [1318, 1430] }; // lacZ:lacY:lacA ≈ 3075:1254:612 bp
  const kom = ease(clamp(lactose / 0.3, 0, 1)), los = ease(clamp((lactose - 0.3) / 0.2, 0, 1)), loop = ease(clamp((lactose - 0.5) / 0.5, 0, 1));
  const bh = 40 * s, vh = 64 * s; // halve ladderbreedte (rail tot rail = 2·bh·0,5), vakhoogte
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // 1) gekleurde vakken achter de ladder
  const vak = (r, fill, rand) => { roundRect(ctx, X(r[0]), y - vh / 2, X(r[1]) - X(r[0]), vh, Math.min(14 * s, vh * 0.3)); shape(ctx, fill, rand, Math.max(1, 2 * s)); };
  if (lacI) vak(R.I, rgba(C.enzym, 0.35), rgba(C.enzym, 0.9));
  vak(R.p, rgba(C.goud, 0.32), C.goud); vak(R.o, rgba(C.koraal, 0.35), C.koraal);
  ['Z', 'Y', 'A'].forEach(g => { vak(R[g], rgba(C.groen, 0.3 + 0.35 * loop), C.groen); uit.genen.push([(X(R[g][0]) + X(R[g][1])) / 2, y]); });
  // 2) platte ladder (DNA): twee rails, sporten
  const xa = X(-40), xb = X(1500), ry = bh * 0.5;
  ctx.strokeStyle = rgba(C.paars, 0.75); ctx.lineWidth = Math.max(1, 3 * s); ctx.beginPath();
  for (let u = xa + 9 * s; u < xb; u += 30 * s) { ctx.moveTo(u, y - ry); ctx.lineTo(u, y + ry); } ctx.stroke();
  [-1, 1].forEach(k => { ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = Math.max(1.6, 7 * s); ctx.beginPath(); ctx.moveTo(xa, y + k * ry); ctx.lineTo(xb, y + k * ry); ctx.stroke(); });
  // startpunt transcriptie: pijltje onder het einde van de promotor
  const xs = X(R.p[1]); ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = Math.max(1.2, 4 * s); ctx.beginPath(); ctx.moveTo(xs, y + vh / 2); ctx.lineTo(xs, y + vh * 0.95); ctx.lineTo(xs + 40 * s, y + vh * 0.95); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 52 * s, y + vh * 0.95); ctx.lineTo(xs + 38 * s, y + vh * 0.95 - 8 * s); ctx.lineTo(xs + 38 * s, y + vh * 0.95 + 8 * s); ctx.closePath(); ctx.fill();
  uit.lacI = [(X(R.I[0]) + X(R.I[1])) / 2, y]; uit.promotor = [(X(R.p[0]) + X(R.p[1])) / 2, y]; uit.operator = [(X(R.o[0]) + X(R.o[1])) / 2, y];
  // 3) mRNA (dun, sliertig): 5'-uiteinde vrij boven lacZ, 3'-uiteinde bij de polymerase
  const px = lerp(X(R.p[0]) + 30 * s, X(R.A[1]) - 40 * s, loop), py = y - 34 * s;
  if (loop > 0.02 && px - X(R.Z[0]) > 60 * s) { const x5 = X(R.Z[0]) + 20 * s, ym = y - 150 * s; _lacSliert(ctx, x5, ym, px - 60 * s, py - 70 * s, s, t); uit.mrna = [(x5 + px) / 2, ym]; }
  // 4) RNA-polymerase: kralenketen, onderkant op het DNA (zit op de promotor; loopt pas als de operator vrij is)
  const polB = (qx, qy) => { const ex = qx / 66, ey = (qy + 30) / 70; return ex * ex + ey * ey < 1 && qy < 34; };
  _grKralen(ctx, px, py, polB, { r: 14, sc: s * 1.0, col: C.enzym, seed: 5, bbox: [-68, -102, 68, 36], key: 'lacApol' }); uit.polymerase = [px, py - 60 * s];
  // 5) repressor: kralenketen die met zijn onderkant ÓP de operator ligt; twee koppen reiken in de ladder
  const ox = uit.operator[0] + 14 * s, rx = ox + los * 150 * s, ryy = y - los * 230 * s, rot = los * 0.35;
  const repB = (qx, qy) => { const ex = qx / 70, ey = (qy + 44) / 60; const lijf = ex * ex + ey * ey < 1; const kop = qy > -6 && qy < 22 && Math.abs(Math.abs(qx) - 26) < 15; return (lijf || kop) && !(Math.hypot(qx - 30, qy + 88) < 15) && !(Math.hypot(qx + 30, qy + 88) < 15); };
  _grKralen(ctx, rx, ryy, repB, { r: 11, sc: s * 1.0, col: '#C9826F', seed: 8, rot, bbox: [-72, -104, 72, 24], key: 'lacArep' });
  uit.repressor = [rx, ryy - 60 * s];
  // 6) allolactose: twee moleculen zakken in de holtes bovenop de repressor (en gaan met hem mee)
  [-1, 1].forEach(k => { const lx = 30 * k * s, ly = -88 * s, dX = rx + lx * Math.cos(rot) - ly * Math.sin(rot), dY = ryy + lx * Math.sin(rot) + ly * Math.cos(rot);
    const sx0 = ox + k * 260 * s + 120 * s, sy0 = y - 330 * s; if (lactose > 0.01) _lacSuiker(ctx, lerp(sx0, dX, kom), lerp(sy0, dY, kom), 12 * s, Math.min(1, lactose * 6)); });
  ctx.restore(); return uit;
}
