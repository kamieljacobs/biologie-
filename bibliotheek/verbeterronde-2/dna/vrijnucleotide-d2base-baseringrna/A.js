// -------------------------------------------------------------------------------------
// VRIJE NUCLEOTIDE, KLEINE BASEN, RNA-BASE — variant A 'zoals in de streng' (verbeterronde 2, 28 okt 2026; afgekeurd zonder
// opmerking: 'eenvoudiger en rustiger').
// Recept (OpenStax Biology 2e § 14.2: fosfaat aan 5', base aan 1'; § 14.4: nieuwe nucleotiden komen aan het 3'-OH-uiteinde):
//  - vrijNucleotide: precies de bouwsteen zoals hij straks in de streng zit: één fosfaat (rondje), suiker (vijfhoek), base (staafje
//    met puzzelrand) met een duidelijk bindingsstreepje ertussen. Geen rand om de suiker, geen extra stippen. Letter alleen als hij
//    leesbaar is (s ≥ 0,9). De drie fosfaten van de echte vrije nucleotide laten we hier weg (zie variant B).
//  - d2Base: groot (staafbreedte ≥ 14 px) de puzzelstaaf; kleiner een egaal staafje zonder rand, zodat een streng op filmgrootte
//    rustig blijft; letter alleen bij de puzzelstaaf.
//  - baseRingRNA: RNA-basen in dezelfde vorm (U met de rand van T), in de RNA-tinten van het palet; de RNA-ruggengraat is teal,
//    dus RNA en DNA verschillen in de ruggengraat, niet in een tweede set van vier tinten.
// Aanroepen gelijk: vrijNucleotide(ctx, x, y, b, ang, s, {a, rand}); d2Base(ctx, x, y, ang, b, L, hw, {rna, a, rand, vorm, letter});
// baseRingRNA(ctx, x, y, b, dir, {s, a, rot, geenLetter}).
// Bekende fouten: base die tegen de suiker plakt; vier bijna gelijke tinten; randen om kleine staafjes (druk).
// -------------------------------------------------------------------------------------
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k];
  DNA_BASE.base[k] = RNA_BASE.base[b]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (o.geenLetter) return; const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter[b], 'center'); ctx.restore(); }
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, len = DNA_BASE.len * s;
  if (!vorm || 44 * s < 14) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    ctx.fillStyle = fill; ctx.fillRect(-hw, 0, hw * 2, len); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.strokeRect(-hw, 0, hw * 2, len); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0, k = (rna && b === 'U') ? 'T' : b, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore(); if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos, m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), (rna ? RNA_BASE.letter : DNA_BASE.letter)[b] || '#121A26', 'center'); ctx.restore(); }
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links (aan C5'), base omhoog (aan C1'), met een bindingsstreepje
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = Math.max(1.5, 3 * s); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-10 * s, -2 * s); ctx.lineTo(-27 * s, -2 * s); ctx.moveTo(0, -12 * s); ctx.lineTo(0, -22 * s); ctx.stroke();
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  ctx.fillStyle = DNA_BASE.suiker; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); }
  _bioCirc(ctx, -36 * s, -2 * s, 9 * s, DNA_BASE.fosfaat, rand, 3);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -22 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }
