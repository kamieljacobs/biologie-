// -------------------------------------------------------------------------------------
// BASE ALS STAAFJE MET PUZZELRAND — variant A 'rustig' (verbeterronde 2, 28 okt 2026).
// Recept (ongewijzigd, besluit Kamiel 27 okt 2026): één staafje per base, alle basen even lang; de paarrand laat zien wie bij wie
// past (model): A punt ↔ T inkeping, C nok ↔ G sleuf. A–T twee, C–G drie waterstofbruggen (OpenStax Biology 2e § 14.2).
// Rustiger: dunne lichte rand (1,2 px), dun steeltje, bindingsplekken alleen als open stip zolang ze níet gebonden zijn;
// gebonden = korte doorgetrokken gouden streepjes (geen streepjeslijn + stip), en de drie bruggen van C–G verder uit elkaar
// (plekken 0,15 / 0,5 / 0,85 i.p.v. 0,2 / 0,5 / 0,8), zodat ze niet tegen elkaar plakken.
// Aanroepen gelijk: baseRing(ctx, x, y, b, dir, {s, a, rot, rand, bindA, plekA}); baseBruggen(ctx, x, y1, y2, b, s, a).
// Bekende fouten: ringen; basen van ongelijke lengte; randen die niet passen; bruggen die tegen elkaar plakken.
// -------------------------------------------------------------------------------------
DNA_BASE.plek = { A: [0.27, 0.73], T: [0.27, 0.73], G: [0.15, 0.5, 0.85], C: [0.15, 0.5, 0.85] };
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.strokeStyle = lighten(kl, 0.2); ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 9 * s); ctx.stroke(); // steeltje naar de suiker
  basePuzzelPad(ctx, b, s); shape(ctx, kl, lighten(kl, 0.3), Math.max(0.8, 1.2 * Math.min(1, s)));
  if (DNA_BASE.letter[b] && DNA_BASE.letter[b] !== 'rgba(0,0,0,0)') { ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }
  const open = plekA * (1 - clamp(bindA, 0, 1)); // open plekken alleen zolang er nog niets bindt
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= open; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 0.9; _bioCirc(ctx, px, _baseRand(b, px, s) - 5 * s, 3.4 * s, '#121A26', lighten(kl, 0.5), 1.2); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, -4 * s, w * 1.4, L + 25 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen: korte doorgetrokken gouden streepjes in de spleet tussen de paarranden
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.lineCap = 'round';
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L), yb = y2 - sg * (_baseRand(c, px, s) - L);
    ctx.beginPath(); ctx.moveTo(x + px, ya + sg * 3 * s); ctx.lineTo(x + px, yb - sg * 3 * s); ctx.stroke(); }); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE — variant A 'op een rij' (verbeterronde 2, 28 okt 2026; Kamiel: 'de plaatsing van de stikstofbase aan de suiker is
// een beetje druk en dicht op elkaar').
// Recept (OpenStax Biology 2e § 14.2: fosfaat aan koolstof 5', base aan koolstof 1', OH aan koolstof 3'): de drie delen naast
// elkaar zoals in de leerboekfiguur: fosfaat (rondje met P) links-boven aan C5', suiker (vijfhoek, ring-O boven, C1' rechts,
// C4' links) in het midden, base rechts aan C1' met een duidelijk bindingsstreepje (± 0,7 × de suikerstraal) en naar rechts
// wijzend, zodat de base niet over de ring valt. Nummers 1'–5' buiten de ring op vaste, vrije plekken (niet op een binding).
// o.explode 0..1 trekt fosfaat naar links en base naar rechts; o.nummers, o.oh, o.hl ("1'".."5'", "3'") zoals voorheen.
// o.dir wordt genegeerd (de base wijst altijd van de suiker af). Geeft {p, su, b, c3, c5, c1} terug.
// Bekende fouten: base die tegen of over de suiker ligt; fosfaat aan C3'; nummers op een binding.
// -------------------------------------------------------------------------------------
function _ntBase(ctx, x, y, ang, b, s, o = {}) { // base als puzzelstaaf vanaf (x, y) in richting ang, letter rechtop
  const kl = DNA_BASE.base[b]; ctx.save(); ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
  basePuzzelPad(ctx, b, s); shape(ctx, kl, lighten(kl, 0.3), Math.max(0.8, 1.2 * Math.min(1, s))); ctx.restore();
  if (o.letter === false) return; const c = DNA_BASE.letterY * s + 4 * s; text(ctx, b, x + Math.cos(ang) * c, y + Math.sin(ang) * c + 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); }
function nucleotideRing(ctx, x, y, b, o = {}) {
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([x + R * Math.cos(an), y + R * Math.sin(an)]); } // 0 ring-O, 1 C1', 2 C2', 3 C3', 4 C4'
  const c5 = [pt[4][0] - 17 * s, pt[4][1] - 25 * s];
  const px = c5[0] - 44 * s - e * 60 * s, py = c5[1] - 14 * s - e * 10 * s;
  const bx = pt[1][0] + 24 * s + e * 50 * s, by = pt[1][1];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const bond = DNA_BASE.rugR; ctx.strokeStyle = bond; ctx.lineWidth = 3 * s;
  ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.95) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(bx, by); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.3), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 4.5 * s, '#C9B896'); // ring-O
  _ntBase(ctx, bx, by, 0, b, s * 0.9);
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.35), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  const lab = (l, X, Y) => text(ctx, l, X, Y + 9 * s, fTekst(24 * s, 700), hl === l ? C.goud : C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - 26 * s, oy = pt[3][1] + 18 * s; ctx.strokeStyle = bond; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 6 * s, oy - 4 * s); ctx.stroke(); lab('OH', ox - 14 * s, oy + 6 * s); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    lab("1'", pt[1][0] + 12 * s, pt[1][1] - 26 * s); lab("2'", pt[2][0] + 18 * s, pt[2][1] + 18 * s); lab("3'", pt[3][0] + 2 * s, pt[3][1] + 28 * s);
    lab("4'", pt[4][0] - 24 * s, pt[4][1] + 14 * s); lab("5'", c5[0] + 20 * s, c5[1] - 14 * s); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [x, y], b: [bx + 50 * s, by], c3: pt[3], c5, c1: pt[1] };
}
