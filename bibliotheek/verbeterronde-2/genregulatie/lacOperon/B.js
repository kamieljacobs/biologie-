// =====================================================================================
// LAC-OPERON — variant B (verbeterronde 2): DE HELIX DOOR DE KLEM. Het DNA is de echte helix (dnaDraad); de gebieden staan als
// gekleurde balkjes direct onder de helix (geen mouwen eromheen, zodat het DNA zelf rustig blijft). De eiwitten OMKLEMMEN
// het DNA: achterste helft van het eiwit → DNA → voorste lip, zodat je ziet dat de helix dóór het eiwit loopt.
// Recept (Pierce, Genetics Essentials 3e § 12.8; BioNumbers 102084, Müller-Hill 1996):
//  - volgorde: regulatorgen lacI (eigen promotor) … promotor → operator → lacZ → lacY → lacA; één promotor, één mRNA voor drie
//    genen; lacZ is het langste gen (3075 bp), lacY en lacA korter (verhouding bij benadering).
//  - ZONDER lactose zit de repressor ÓP de operator en omklemt het DNA (bindingsconstante ± 10^9 M⁻¹); RNA-polymerase zit op de
//    promotor en kan niet verder. (Fout ronde 1, twee bronnen: de repressor zweefde bóven de operator.)
//  - MET lactose: allolactose (oker, twee zesringen) bindt in de repressor, de klem gaat open (de lip zwaait weg) en de
//    repressor laat los; RNA-polymerase schuift over lacZ, lacY, lacA en laat één dunne mRNA-sliert achter (teal).
//  - kleuren: promotor goud, operator koraal, genen groen (voller als ze worden afgelezen), lacI grijsblauw; repressor
//    koraal kralenketen (remmer), polymerase grijsblauw kralenketen (C2); DNA paars (C1).
//  - o.lactose 0..1: 0–0,3 allolactose komt aan · 0,3–0,5 klem open, repressor weg · 0,5–1 polymerase loopt, mRNA groeit.
// Bekende fouten: repressor die boven de operator zweeft; eiwit als bol; operator vóór de promotor; drie promotors.
// Aanroep (zelfde als ronde 1): lacOperon(ctx, x0, y, w, {a, lactose, lacI, t}); (x0, y) = begin van lacI op de DNA-as,
// w = lengte t/m lacA. Geeft {lacI, promotor, operator, genen: [[x, y] ×3], repressor, polymerase, mrna} terug.
// Vereist dnaDraad, _grKralen (lib_bio.js).
// =====================================================================================
function _lacSuiker(ctx, x, y, r, a = 1) { // (allo)lactose: twee zesringen (galactose + glucose) met een brug; oker = voedingsmolecuul (C1)
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = lighten(C.oker, 0.35); ctx.fillStyle = rgba(C.oker, 0.6); ctx.lineWidth = Math.max(1.2, r * 0.18); ctx.lineJoin = 'round';
  const ring = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + Math.PI / 6, X = cx + Math.cos(an) * r, Y = cy + Math.sin(an) * r * 0.62; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); ctx.fill(); ctx.stroke(); };
  ring(x - r * 1.25, y); ring(x + r * 1.25, y + r * 0.35); ctx.beginPath(); ctx.moveTo(x - r * 0.3, y + r * 0.2); ctx.lineTo(x + r * 0.3, y + r * 0.3); ctx.stroke(); ctx.restore(); }
function _lacSliert(ctx, xa, ya, xb, yb, s, t = 0) { // dunne mRNA-sliert (± half zo dik als DNA), 5' = (xa, ya) → 3' = (xb, yb)
  if (xb - xa < 4) return; ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = Math.max(1.4, 5 * s); ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60; for (let i = 0; i <= n; i++) { const u = i / n, X = lerp(xa, xb, u), Y = lerp(ya, yb, u * u) + Math.sin(u * 9 + t) * 14 * s * (1 - u * 0.6) + Math.sin(u * 23 + 1) * 4 * s; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.stroke(); ctx.restore(); }
function lacOperon(ctx, x0, y, w, o = {}) {
  const { a = 1, lactose = 0, lacI = true, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1600, uit = { genen: [] }, X = (u) => x0 + u * s, dw = Math.max(5, 46 * s);
  const R = { I: [0, 210], p: [300, 430], o: [436, 500], Z: [510, 1070], Y: [1080, 1308], A: [1318, 1430] };
  const kom = ease(clamp(lactose / 0.3, 0, 1)), los = ease(clamp((lactose - 0.3) / 0.2, 0, 1)), loop = ease(clamp((lactose - 0.5) / 0.5, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // 1) gebieden als balkjes direct onder de helix
  const by = y + dw * 0.5 + 10 * s, bh = Math.max(3, 18 * s);
  const balk = (r, kl, al = 1) => { roundRect(ctx, X(r[0]) + 2 * s, by, X(r[1]) - X(r[0]) - 4 * s, bh, bh / 2); ctx.globalAlpha *= al; ctx.fillStyle = kl; ctx.fill(); ctx.globalAlpha /= al; };
  if (lacI) balk(R.I, C.enzym); balk(R.p, C.goud); balk(R.o, C.koraal);
  ['Z', 'Y', 'A'].forEach(g => { balk(R[g], C.groen, 0.55 + 0.45 * loop); uit.genen.push([(X(R[g][0]) + X(R[g][1])) / 2, y]); });
  const xs = X(R.p[1]); ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = Math.max(1.2, 4 * s); ctx.beginPath(); ctx.moveTo(xs, by + bh); ctx.lineTo(xs, by + bh + 26 * s); ctx.lineTo(xs + 38 * s, by + bh + 26 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(xs + 50 * s, by + bh + 26 * s); ctx.lineTo(xs + 36 * s, by + bh + 18 * s); ctx.lineTo(xs + 36 * s, by + bh + 34 * s); ctx.closePath(); ctx.fill();
  uit.lacI = [(X(R.I[0]) + X(R.I[1])) / 2, y]; uit.promotor = [(X(R.p[0]) + X(R.p[1])) / 2, y]; uit.operator = [(X(R.o[0]) + X(R.o[1])) / 2, y];
  // eiwitvormen (ontwerpeenheden; oorsprong = DNA-as): lijf boven het DNA, holte waar de helix doorheen loopt, lip ervóór
  const px = lerp(X(R.p[0]) + 30 * s, X(R.A[1]) - 40 * s, loop);
  const polLijf = (qx, qy) => { const ex = qx / 64, ey = (qy + 34) / 74; return ex * ex + ey * ey < 1; };
  const polLip = (qx, qy) => { const ex = qx / 50, ey = (qy - 8) / 30; return ex * ex + ey * ey < 1; };
  const ox = uit.operator[0] + 10 * s, rx = ox + los * 150 * s, ry = y - los * 240 * s, rot = los * 0.35, lipA = 1 - ease(clamp((lactose - 0.25) / 0.12, 0, 1));
  const repLijf = (qx, qy) => { const ex = qx / 60, ey = (qy + 46) / 58; return (ex * ex + ey * ey < 1 || (qy > -10 && qy < 30 && Math.abs(qx) < 44)) && !(Math.hypot(qx - 26, qy + 86) < 14) && !(Math.hypot(qx + 26, qy + 86) < 14); };
  const repLip = (qx, qy) => { const ex = qx / 44, ey = (qy - 8) / 28; return ex * ex + ey * ey < 1; };
  // 2) achterkant van de eiwitten
  _grKralen(ctx, px, y, polLijf, { r: 13, sc: s, col: _mixHex(C.enzym, '#1A2740', 0.25), seed: 5, bbox: [-66, -110, 66, 42], key: 'lacBpol' });
  _grKralen(ctx, rx, ry, repLijf, { r: 11, sc: s, col: _mixHex('#C9826F', '#1A2740', 0.2), seed: 8, rot, bbox: [-62, -104, 62, 32], key: 'lacBrep' });
  // 3) het DNA (helix) loopt dóór de eiwitten
  dnaDraad(ctx, [[X(-40), y], [X(1500), y]], { w: dw, helix: true, glad: false, fase: t * 0.05 });
  // 4) voorste lippen: de klem om het DNA (repressorlip zwaait weg zodra allolactose bindt)
  _grKralen(ctx, px, y, polLip, { r: 12, sc: s, col: C.enzym, seed: 2, bbox: [-52, -24, 52, 40], key: 'lacBpolLip' });
  if (lipA > 0.01) _grKralen(ctx, ox, y + (1 - lipA) * 40 * s, repLip, { r: 10, sc: s, col: '#C9826F', seed: 3, a: lipA, bbox: [-46, -22, 46, 38], key: 'lacBrepLip' });
  uit.polymerase = [px, y - 90 * s]; uit.repressor = [rx, ry - 70 * s];
  // 5) allolactose in de twee holtes bovenop de repressor
  [-1, 1].forEach(k => { const lx = 26 * k * s, ly = -86 * s, dX = rx + lx * Math.cos(rot) - ly * Math.sin(rot), dY = ry + lx * Math.sin(rot) + ly * Math.cos(rot);
    if (lactose > 0.01) _lacSuiker(ctx, lerp(ox + k * 260 * s + 120 * s, dX, kom), lerp(y - 330 * s, dY, kom), 12 * s, Math.min(1, lactose * 6)); });
  // 6) mRNA: 5' vrij boven lacZ, 3' in de polymerase
  if (loop > 0.02 && px - X(R.Z[0]) > 60 * s) { const x5 = X(R.Z[0]) + 20 * s, ym = y - 170 * s; _lacSliert(ctx, x5, ym, px - 50 * s, y - 100 * s, s, t); uit.mrna = [(x5 + px) / 2, ym]; }
  ctx.restore(); return uit;
}
