// ---------- RNA-BASEN, d2Base, VRIJE NUCLEOTIDE (variant A, beeldbank 27 okt 2026) ----------
// RNA = teal-reeks (Beeldafspraak: 'U als T, in teal'; voorstel: ook zo in C1 van de prompt vastleggen). De vier RNA-tinten
// lopen nu even ver uiteen als de paarse DNA-tinten: A is een echte lichte teal (was bijna wit, #BFE0EF), U middel.
// Kleine basen (staafje, breedte < 9 px) houden hun basetint en zijn minstens 3 px breed, met een donkerdere rand van 1 px,
// zodat A/T/C/G ook op filmgrootte van elkaar te onderscheiden blijven.
// In de bibliotheek: vervang de regel `const RNA_BASE = …` door de RNA_BASE hieronder en zet D2.rbase gelijk.
Object.assign(RNA_BASE.base, { A: '#9CCFE6', U: '#72B3D8', C: '#4E93B9', G: '#356F91' });
Object.assign(D2.rbase, RNA_BASE.base);
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = o.geenLetter ? 'rgba(0,0,0,0)' : b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U' && !o.geenLetter) { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
// d2Base: base met voet op (x, y), wijst in richting ang; L = halve sport. Schaal zo dat purine + pyrimidine = 2L (één sport).
// Kleine basen (breedte < 9 px) als staafje in dezelfde tint (lessen_dna: ringen bij verkorting niet leesbaar).
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = DNA_BASE.len * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    const hb = Math.max(1.5, hw); ctx.beginPath(); ctx.rect(-hb, 0, hb * 2, len); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = _mixHex(fill, '#121A26', 0.35); ctx.lineWidth = 1; ctx.stroke(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0; // wijst omhoog: dir −1
  // letter niet met de ring meedraaien: ring zonder letter tekenen, letter daarna rechtop in beeldcoördinaten (frisse review DNA 2, MOET 4)
  const k = (rna && b === 'U') ? 'T' : b, LB = rna ? RNA_BASE.letter : DNA_BASE.letter, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore();
  if (o.letter === false) return;
  const cpos = DNA_BASE.letterY * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos;
  const m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), LB[b] || '#121A26', 'center'); ctx.restore(); }
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links, base wijst omhoog (-y)
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, D2.oud, rand || D2.oudR, rand ? 3 : 1.5);
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-24 * s, 8 * s); ctx.stroke();
  _bioCirc(ctx, -30 * s, 9 * s, 9 * s, D2.oudR, rand || '#D8CFF2', rand ? 3 : 1.2);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }
