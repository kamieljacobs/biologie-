// -------------------------------------------------------------------------------------
// BASE ALS STAAFJE MET PUZZELRAND — variant B 'zonder stippen' (verbeterronde 2, 28 okt 2026).
// Recept (ongewijzigd, besluit Kamiel 27 okt 2026): één staafje per base, alle basen even lang; A punt ↔ T inkeping, C nok ↔ G
// sleuf; A–T twee, C–G drie waterstofbruggen (OpenStax Biology 2e § 14.2).
// Zo kaal mogelijk: geen bindingsstippen meer (de puzzelrand zegt al wie past); waterstofbruggen als rijtjes van drie gouden
// puntjes in de spleet, verdeeld over de hele breedte (0,15 / 0,5 / 0,85 bij C–G, 0,27 / 0,73 bij A–T); geen steeltje, de base
// begint direct aan de suiker. Aanroepen gelijk (plekA en bindA worden genegeerd).
// Bekende fouten: ringen; basen van ongelijke lengte; randen die niet passen; bruggen die tegen elkaar plakken.
// -------------------------------------------------------------------------------------
DNA_BASE.plek = { A: [0.27, 0.73], T: [0.27, 0.73], G: [0.15, 0.5, 0.85], C: [0.15, 0.5, 0.85] };
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir); ctx.translate(0, -6 * s);
  basePuzzelPad(ctx, b, s); ctx.fillStyle = kl; ctx.fill();
  if (DNA_BASE.letter[b] && DNA_BASE.letter[b] !== 'rgba(0,0,0,0)') { ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, 2 * s, w * 1.4, L + 19 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.goud;
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L - 6 * s), yb = y2 - sg * (_baseRand(c, px, s) - L - 6 * s);
    for (let k = 1; k <= 3; k++) _bioCirc(ctx, x + px, lerp(ya, yb, k / 4), Math.max(1, 2.4 * s), C.goud); }); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE — variant B 'staand, zoals in de streng' (verbeterronde 2, 28 okt 2026; Kamiel: 'de plaatsing van de stikstofbase aan
// de suiker is een beetje druk en dicht op elkaar').
// Recept (OpenStax Biology 2e § 14.2: fosfaat aan 5', base aan 1', OH aan 3'): dezelfde stand als in de ladder: fosfaat links-
// boven aan C5', suiker in het midden, de base hangt omlaag (dir 1) of staat omhoog (dir −1) zoals in de streng, maar los van de
// ring: een schuin bindingsstreepje van C1' naar rechts (± 1 × suikerstraal), daarna de staaf loodrecht. Zo ligt de base naast
// C2' in plaats van er tegenaan. Nummers buiten de ring, op plekken waar geen binding loopt.
// Aanroep gelijk: nucleotideRing(ctx, x, y, b, {s, a, explode, nummers, hl, dir, oh}) → {p, su, b, c3, c5, c1}.
// Bekende fouten: base die tegen of over de suiker ligt; fosfaat aan C3'; nummers op een binding.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) {
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([x + R * Math.cos(an), y + R * Math.sin(an)]); }
  const c5 = [pt[4][0] - 17 * s, pt[4][1] - 25 * s];
  const px = c5[0] - 40 * s - e * 60 * s, py = c5[1] - 16 * s - e * 20 * s;
  const kx = pt[1][0] + 42 * s, ky = pt[1][1] + 14 * s * dir; // knik: hier begint de staaf
  const bx = kx + e * 40 * s, by = ky + e * 40 * s * dir;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const bond = DNA_BASE.rugR; ctx.strokeStyle = bond; ctx.lineWidth = 3 * s;
  ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.95) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(kx, ky); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.3), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 4.5 * s, '#C9B896');
  baseRing(ctx, bx, by, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.35), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  const lab = (l, X, Y) => text(ctx, l, X, Y + 9 * s, fTekst(24 * s, 700), hl === l ? C.goud : C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - 28 * s, oy = pt[3][1] + 12 * s; ctx.strokeStyle = bond; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 8 * s, oy - 3 * s); ctx.stroke(); lab('OH', ox - 14 * s, oy + 4 * s); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    lab("1'", pt[1][0] + 8 * s, pt[1][1] - 22 * s * dir); lab("2'", pt[2][0] - 2 * s, pt[2][1] + 30 * s); lab("3'", pt[3][0] - 6 * s, pt[3][1] + 30 * s);
    lab("4'", pt[4][0] - 24 * s, pt[4][1] + 14 * s); lab("5'", c5[0] + 20 * s, c5[1] - 14 * s); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [x, y], b: [bx, by + 60 * s * dir], c3: pt[3], c5, c1: pt[1] };
}
