// ---------- RNA-BASEN, d2Base, VRIJE NUCLEOTIDE (variant B, beeldbank 27 okt 2026) ----------
// Recept (model, bron nog niet geopend in deze ronde: bouwstenen voor DNA en RNA zijn nucleoside-trifosfaten (dNTP/NTP);
// bij het inbouwen gaan twee fosfaatgroepen eraf als pyrofosfaat, dat levert de energie voor de binding):
//  - vrijNucleotide = suiker + base + DRIE fosfaatkralen (α aan de suiker, dan β en γ). o.pp 0 → 1: β en γ breken samen af en
//    drijven weg (pyrofosfaat) — gebruik dat op het moment van inbouwen. De oude aanroep (zonder pp) toont het trifosfaat.
//  - kleine basen houden hun puzzelvorm als silhouet tot 3 px breed (punt, inkeping, nok, sleuf als driehoekje/blokje),
//    in hun basetint; pas onder 3 px een staafje.
//  - RNA = teal-reeks met een echte lichte teal voor A (was bijna wit) en meer afstand tussen de tinten.
Object.assign(RNA_BASE.base, { A: '#9CCFE6', U: '#72B3D8', C: '#4E93B9', G: '#356F91' });
Object.assign(D2.rbase, RNA_BASE.base);
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = o.geenLetter ? 'rgba(0,0,0,0)' : b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U' && !o.geenLetter) { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, DNA_BASE.letterY * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = DNA_BASE.len * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    const hb = Math.max(1.5, hw), d = Math.min(len * 0.22, hb * 0.9), tw = hb * 0.5; ctx.beginPath(); ctx.moveTo(-hb, 0); ctx.lineTo(hb, 0);
    if (hb < 1.6) { ctx.lineTo(hb, len); ctx.lineTo(-hb, len); } // onder 3 px: staafje
    else if (b === 'A') { ctx.lineTo(hb, len - d); ctx.lineTo(0, len); ctx.lineTo(-hb, len - d); }
    else if (b === 'T' || b === 'U') { ctx.lineTo(hb, len); ctx.lineTo(0, len - d); ctx.lineTo(-hb, len); }
    else if (b === 'C') { ctx.lineTo(hb, len - d); ctx.lineTo(tw, len - d); ctx.lineTo(tw, len); ctx.lineTo(-tw, len); ctx.lineTo(-tw, len - d); ctx.lineTo(-hb, len - d); }
    else { ctx.lineTo(hb, len); ctx.lineTo(tw, len); ctx.lineTo(tw, len - d); ctx.lineTo(-tw, len - d); ctx.lineTo(-tw, len); ctx.lineTo(-hb, len); }
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
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
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null, pp = 0, rna = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const kl = rna ? D2.rna : D2.oud, klR = rna ? D2.rnaR : D2.oudR, e = ease(clamp(pp, 0, 1));
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, kl, rand || klR, rand ? 3 : 1.5);
  // α-fosfaat aan de suiker, β en γ als staartje (pyrofosfaat) dat bij pp > 0 afbreekt en wegdrijft
  const fos = (X, Y, r) => _bioCirc(ctx, X, Y, r, DNA_BASE.fosfaat, rand || lighten(DNA_BASE.fosfaat, 0.4), rand ? 3 : 1.2);
  ctx.strokeStyle = klR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-22 * s, 8 * s); ctx.stroke();
  fos(-29 * s, 9 * s, 8 * s);
  ctx.save(); ctx.translate(-e * 30 * s, e * 22 * s); ctx.rotate(-e * 0.6); ctx.globalAlpha *= 1 - 0.6 * e;
  if (e < 0.15) { ctx.beginPath(); ctx.moveTo(-36 * s, 10 * s); ctx.lineTo(-40 * s, 11 * s); ctx.stroke(); }
  fos(-47 * s, 12 * s, 8 * s); ctx.beginPath(); ctx.moveTo(-54 * s, 13 * s); ctx.lineTo(-58 * s, 14 * s); ctx.stroke(); fos(-65 * s, 15 * s, 8 * s); ctx.restore();
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand, rna }); ctx.restore(); }
