// -------------------------------------------------------------------------------------
// VRIJE NUCLEOTIDE, KLEINE BASEN, RNA-BASE — variant B 'met fosfaatstaartje' (verbeterronde 2, 28 okt 2026; afgekeurd zonder
// opmerking: 'eenvoudiger en rustiger').
// Recept (OpenStax Biology 2e § 14.4: 'this energy is obtained from the nucleoside triphosphates dATP, dGTP, dTTP and dCTP';
// Open Oregon (OpenStax-afgeleid): 'breaking off the third phosphate releases energy'; § 14.2: fosfaat aan 5', base aan 1'):
//  - vrijNucleotide: base (puzzelstaaf) – suiker (vijfhoek) – een staartje van drie kleine fosfaatkralen. Zo zie je het verschil
//    met een nucleotide in de streng (één fosfaat). Optie o.pp 0..1: de twee buitenste fosfaten laten samen los (pyrofosfaat) en
//    vervagen vlak naast de nucleotide (geven de energie voor de binding). Geen randen, geen letter onder s 1.
//  - d2Base: alleen de puzzelstaaf als hij groot genoeg is (staafbreedte ≥ 18 px); anders een egaal staafje met een smalle
//    donkere voeg naar het volgende staafje (1 px), zodat losse basen ook klein te tellen zijn.
//  - baseRingRNA: RNA-basen in dezelfde vorm (U met de rand van T) in de RNA-tinten; letter U direct.
// Aanroepen gelijk; nieuw: vrijNucleotide(…, {pp, tri}) (tri standaard true).
// Bekende fouten: base die tegen de suiker plakt; vier bijna gelijke tinten; pyrofosfaat dat uit beeld drijft.
// -------------------------------------------------------------------------------------
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k];
  DNA_BASE.base[k] = RNA_BASE.base[b]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (o.geenLetter) return; const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter[b], 'center'); ctx.restore(); }
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, len = DNA_BASE.len * s;
  if (!vorm || 44 * s < 18) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    const v = hw > 2.5 ? 0.5 : 0; ctx.fillStyle = fill; ctx.fillRect(-hw + v, 0, hw * 2 - 2 * v, len); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.strokeRect(-hw, 0, hw * 2, len); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0, k = (rna && b === 'U') ? 'T' : b, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore(); if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos, m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null, pp = 0, tri = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const e = ease(clamp(pp, 0, 1)), r = 6.5 * s, kl = DNA_BASE.fosfaat;
  // staartje: fosfaat 1 aan C5', fosfaat 2 en 3 erachter (bij pp los als pyrofosfaat)
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = Math.max(1.5, 2.5 * s); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-10 * s, -2 * s); ctx.lineTo(-24 * s, -2 * s); ctx.moveTo(0, -12 * s); ctx.lineTo(0, -20 * s); ctx.stroke();
  _bioCirc(ctx, -28 * s, -2 * s, r, kl, rand, 3);
  if (tri && e < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - e * 0.85; const dx = -e * 14 * s, dy = e * 16 * s;
    ctx.beginPath(); ctx.moveTo(-28 * s - r + dx, -2 * s + dy); ctx.lineTo(-54 * s + dx, -2 * s + dy); ctx.stroke(); if (e < 0.05) { ctx.beginPath(); ctx.moveTo(-28 * s - r, -2 * s); ctx.lineTo(-28 * s - r - 4 * s, -2 * s); ctx.stroke(); }
    _bioCirc(ctx, -42 * s + dx, -2 * s + dy, r, kl); _bioCirc(ctx, -56 * s + dx, -2 * s + dy, r, kl); ctx.restore(); }
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  ctx.fillStyle = DNA_BASE.suiker; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -20 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 1, rand }); ctx.restore(); }
