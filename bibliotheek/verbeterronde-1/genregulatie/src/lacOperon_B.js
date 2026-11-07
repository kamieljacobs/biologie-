// =====================================================================================
// LAC-OPERON met DNA-LUS (repressor-tetrameer klemt twee operators). Recept (OpenStax Biology 2e § 16.2; Lodish 8e § 7.2;
// Lewis/UCLA 'Lac operon repressor and its complexes' (tetrameer = dimeer van dimeren, V-vorm); Swigon e.a. 2006 (PMC1502547):
// O1 en O3 liggen 92 bp uit elkaar; BioNumbers 102070: lacZ = 3075 bp):
//  - volgorde: lacI (repressorgen; O3 ligt aan het eind ervan) … promotor → operator O1 → lacZ → lacY → lacA (één mRNA).
//  - zonder lactose grijpt de repressor (V-vormige tetrameer: twee paren 'koppen') tegelijk O1 en O3: het DNA ertussen vormt
//    een lus en de promotor is afgesloten.
//  - met lactose bindt allolactose (oker, twee suikerringen) aan de repressor; de affiniteit voor het DNA daalt, de klem laat los,
//    de lus gaat open, RNA-polymerase loopt over de genen en maakt één mRNA (dunne teal sliert).
//  - o.lactose 0..1: 0–0.3 suiker bindt · 0.3–0.55 klem los, lus ontspant · 0.55–1 polymerase loopt, mRNA groeit.
// Bekende fouten: repressor als bol; lus zonder tweede operator; lactose die aan het DNA bindt; operator vóór de promotor.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de rijversie: (x0, y) = begin lacI op de as, w = lengte t/m lacA;
// o.lactose, o.lacI, o.t. Plaatshouder voor RNA-polymerase. Geeft {lacI, promotor, operator, operator3, genen, repressor, polymerase, mrna, lus}.
// =====================================================================================
//@@KLUWEN
//@@LAC
function lacOperon(ctx, x0, y, w, o = {}) {
  const { a = 1, lactose = 0, lacI = true, t = 0 } = o; if (a <= 0.01) return {};
  const s = w / 1600, dw = Math.max(5, 26 * s), mh = 62 * s, uit = { genen: [] };
  const X = (bp) => x0 + bp * s, R = { I: [0, 230], p: [330, 470], o: [478, 540], Z: [552, 1112], Y: [1124, 1364], A: [1376, 1506] };
  const kom = ease(clamp(lactose / 0.3, 0, 1)), los = ease(clamp((lactose - 0.3) / 0.25, 0, 1)), loop = ease(clamp((lactose - 0.55) / 0.45, 0, 1)), lus = 1 - los;
  const xO1 = (X(R.o[0]) + X(R.o[1])) / 2, xb = xO1, xa = xb - lerp(280, 70, lus) * s, H = 150 * s * lus, rl = 40 * s * lus;
  const sh = xa - X(R.I[1] - 15), XL = (bp) => X(bp) + sh; // links deel (lacI met O3 aan het eind) schuift mee als de lus sluit
  ctx.save(); ctx.globalAlpha *= a;
  const mid = (xa + xb) / 2, hg = (xb - xa) / 2, Lp = [];
  for (let k = 0; k <= 48; k++) { const u = k / 48, an = Math.PI * u; Lp.push([mid - Math.cos(an) * (hg + rl * Math.sin(an)), y - Math.sin(an) * H]); }
  if (lacI) _lacMouw(ctx, XL(R.I[0]), XL(R.I[1] - 40), y, mh, rgba(C.paars, 0.3), rgba(C.paars, 0.8), s);
  _lacMouw(ctx, XL(R.I[1] - 36), XL(R.I[1] + 6), y, mh * 0.9, rgba(C.koraal, 0.3), rgba(C.koraal, 0.85), s); // O3
  _lacMouw(ctx, X(R.o[0]), X(R.o[1]), y, mh, rgba(C.koraal, 0.3), rgba(C.koraal, 0.85), s); // O1
  // promotor = het stuk tussen O3 en O1 (ligt in de lus): gouden mouw langs het pad
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const Pp = Lp.slice(14, 44); ctx.beginPath(); bioPad(ctx, Pp, false); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = mh + 3 * s; ctx.stroke(); ctx.strokeStyle = _mixHex('#1A2740', C.goud, 0.32); ctx.lineWidth = mh; ctx.stroke(); ctx.restore();
  ['Z', 'Y', 'A'].forEach(g => { _lacMouw(ctx, X(R[g][0]), X(R[g][1]), y, mh, rgba(C.kernR, 0.3 + 0.25 * loop), C.kernR, s); uit.genen.push([(X(R[g][0]) + X(R[g][1])) / 2, y]); });
  const P = [[XL(-40), y], [XL(R.I[1] - 15), y], ...Lp, [X(1560), y]]; dnaDraad(ctx, P, { w: dw, helix: true, glad: true, fase: t * 0.05 }); uit.lus = [mid, y - H * 0.6];
  const xs = xb - 40 * s; ctx.strokeStyle = C.goud; ctx.lineWidth = 4.8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs, y + mh / 2); ctx.lineTo(xs, y + mh * 1.05); ctx.lineTo(xs + 46 * s, y + mh * 1.05); ctx.stroke();
  uit.lacI = [(XL(R.I[0]) + XL(R.I[1])) / 2, y]; uit.promotor = Lp[30]; uit.operator = [xb, y]; uit.operator3 = [xa, y];
  const px = lerp(xb - 150 * s * lus - 60 * s, X(R.A[1] - 30), loop), py = y - 70 * s - (1 - los) * 160 * s; if (loop > 0.01) _lacMRNA(ctx, X(R.Z[0]), px - 40 * s, y - 160 * s, s, t);
  enzymKluwen(ctx, px, py, 70 * s, { col: '#7A8BA8', seed: 5, an: Math.PI / 2, a: 1 }); uit.polymerase = [px, py];
  // tetrameer: twee paren (V) onder het DNA, koppen op O3 en O1; bij loslaten zakt hij weg en gaan de armen uit elkaar
  const apX = mid, apY = y + 130 * s + los * 120 * s, kop = [[xa, y + 22 * s + los * 70 * s], [xb, y + 22 * s + los * 70 * s]];
  kop.forEach((kp, k) => { const ax = lerp(apX, kp[0], 0.5), ay = lerp(apY, kp[1], 0.5), rot = Math.atan2(kp[1] - apY, kp[0] - apX) - Math.PI / 2;
    const binnen = (qx, qy) => { const ex = qx / 46, ey = qy / 78; return ex * ex + ey * ey < 1; };
    _grKluwen(ctx, ax + los * (k ? 40 : -40) * s, ay, binnen, { r: 6.2, sc: s * 1.1, col: k ? '#B08A84' : '#A57F7A', seed: 9 + k, rot: rot + Math.PI / 2 * 0 + Math.PI, bbox: [-48, -80, 48, 80], key: 'lacB' }); });
  uit.repressor = [apX, apY + 30 * s];
  [-1, 1].forEach(k => { const doelX = apX + k * 60 * s, doelY = apY - 40 * s; const sx0 = apX + k * 380 * s, sy0 = y + 330 * s;
    if (lactose > 0.01) _lacSuiker(ctx, lerp(sx0, doelX, kom), lerp(sy0, doelY, kom), 13 * s * 1.3, Math.min(1, lactose * 6)); });
  ctx.restore(); return uit;
}
