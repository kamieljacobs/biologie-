// =====================================================================================
// BASEVORM (puzzelstaaf), WATERSTOFBRUGGEN, NUCLEOTIDE — variant A (beeldbank 27 okt 2026).
// Wijzigingen t.o.v. v2 (vorm en kleuren ongewijzigd, gekeurd/besloten 25–27 okt 2026):
//  - nucleotideRing: label 4' staat binnen de vijfhoek bij C4', niet meer op de lijn naar het fosfaat.
//  - één basevorm voor de hele reeks: basePuzzelPad krijgt optioneel de maten van dnalib (lang 130, half 26, nok 16) zodat
//    dnalib.basePath uit dezelfde code komt (`basePath(ctx, x, y, b, dir, s)` hieronder, zelfde aanroep als in dnalib.js).
//  - DNA_BASE.sport(s) = afstand tussen de ruggen voor schaal s (184·s + 16·s); gebruik dit i.p.v. de oude 112/72-som
//    (lessen_dna.md en testvel rekenden nog met de ringmaten → kier tussen de basen).
// =====================================================================================
DNA_BASE.sport = (s = 1) => (2 * DNA_BASE.len + 24) * s + 16 * s;
function _baseRand(b, px, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, f = 1 - Math.min(Math.abs(px) / hw, 1);
  if (b === 'A') return L - d + 2 * d * f; if (b === 'T' || b === 'U') return L + d - 2 * d * f;
  if (b === 'C') return Math.abs(px) <= tw ? L + d : L - d; return Math.abs(px) <= tw ? L - d : L + d; }
function basePuzzelPad(ctx, b, s) { const L = DNA_BASE.len * s, hw = 22 * s, d = 11 * s, tw = hw * 0.5, y0 = 8 * s;
  ctx.beginPath(); ctx.moveTo(-hw, y0); ctx.lineTo(hw, y0);
  if (b === 'A') { ctx.lineTo(hw, L - d); ctx.lineTo(0, L + d); ctx.lineTo(-hw, L - d); }
  else if (b === 'T' || b === 'U') { ctx.lineTo(hw, L + d); ctx.lineTo(0, L - d); ctx.lineTo(-hw, L + d); }
  else if (b === 'C') { ctx.lineTo(hw, L - d); ctx.lineTo(tw, L - d); ctx.lineTo(tw, L + d); ctx.lineTo(-tw, L + d); ctx.lineTo(-tw, L - d); ctx.lineTo(-hw, L - d); }
  else { ctx.lineTo(hw, L + d); ctx.lineTo(tw, L + d); ctx.lineTo(tw, L - d); ctx.lineTo(-tw, L - d); ctx.lineTo(-tw, L + d); ctx.lineTo(-hw, L + d); }
  ctx.closePath(); }
// basePath met de aanroep van dnalib.js (L = 130·s): zelfde silhouet als baseRing, alleen geschaald
function basePath(ctx, x, y, b, dir, s) { const k = s * 130 / DNA_BASE.len; ctx.save(); ctx.translate(x, y); ctx.scale(1, dir); basePuzzelPad(ctx, b, k); ctx.restore(); }
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const L = DNA_BASE.len * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke(); // steeltje naar de suiker
  basePuzzelPad(ctx, b, s); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  ctx.save(); ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore(); // letter rechtop
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 0.9; _bioCirc(ctx, px, _baseRand(b, px, s), 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.7, -4 * s, w * 1.4, L + 11 * s + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; const c = DNA_BASE.comp[b], sg = Math.sign(y2 - y1) || 1, L = DNA_BASE.len * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * 52 * s * 0.9, ya = y1 + sg * (_baseRand(b, px, s) - L), yb = y2 - sg * (_baseRand(c, px, s) - L); ctx.beginPath(); ctx.moveTo(x + px, ya + sg * 4 * s); ctx.lineTo(x + px, yb - sg * 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
function nucleotideRing(ctx, x, y, b, o = {}) { // v2 (26 okt 2026, frisse review DNA 1): base aan C1', C5' als knooppunt naar het fosfaat, optioneel OH aan C3'
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); } // 0 = ring-O, 1 = C1', 2 = C2', 3 = C3', 4 = C4'
  const c5 = [pt[4][0] - R * 0.75, pt[4][1] - R * 0.7]; // C5' (buiten de ring, aan C4')
  const px = c5[0] - R * 0.9 - e * 60 * s, py = c5[1] - R * 0.2 - e * 20 * s; // fosfaat aan C5'
  const bx = pt[1][0] + 16 * s + e * 30 * s, by = pt[1][1] + 6 * s + e * 50 * s; // base aan C1'
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(bx, by + 4 * s); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); _bioCirc(ctx, c5[0], c5[1], 4.5 * s, lighten(DNA_BASE.suiker, 0.2)); // ring-O, C5'
  baseRing(ctx, bx, by, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - R * 0.35, oy = pt[3][1] + R * 1.35; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 8 * s, oy - 8 * s); ctx.stroke(); text(ctx, 'OH', ox - 6 * s, oy + 12 * s, fTekst(24 * s, 700), hl === "3'" ? C.goud : C.text, 'center'); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    [[1, "1'"], [2, "2'"], [3, "3'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy), off = k === 1 ? -22 : 26; text(ctx, l, pt[k][0] + dx / d * 26 * s - (k === 2 ? 22 * s : 0), pt[k][1] + dy / d * 26 * s + 9 * s + (k === 1 ? off * s * 0.6 : 0), fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    { const dx = sx - pt[4][0], dy = sy - pt[4][1], d = Math.hypot(dx, dy); text(ctx, "4'", pt[4][0] + dx / d * 17 * s + 4 * s, pt[4][1] + dy / d * 17 * s + 8 * s, fTekst(22 * s, 700), hl === "4'" ? C.goud : C.text, 'center'); } // 4' binnen de ring
    text(ctx, "5'", c5[0] + 4 * s, c5[1] - 16 * s, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by + 60 * s], c3: pt[3], c5, c1: pt[1] };
}
