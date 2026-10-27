// =====================================================================================
// mRNA ALS SLIERT — variant A (nieuw, beeldbank 27 okt 2026).
// Recept (OpenStax Biology 2e § 15.2–15.5; Alberts MBoC 4e 'From RNA to Protein'; prompt C9 'mRNA: a thin, slack single strand, about half as
// thick as DNA, gently curved, never a straight bar; bases as short spikes on one side'; Beeldafspraak: dun en sliertig):
//  - één enkele streng, teal (RNA), ± half zo dik als DNA (dnaDraad/d2Rug), slap en zacht kronkelend; beweegt rustig (t).
//  - basen als korte stekels aan één kant; ingezoomd (o.basen → 1) de puzzelvorm van baseRingRNA (U heeft de rand van T).
//  - leesrichting 5' → 3' (ribosoom leest 5' → 3', OpenStax § 15.5); codons = drietallen, gemarkeerd met een lichte boog per drie.
//  - vwo: 5'-cap (gemodificeerde G) als knopje aan het 5'-uiteinde, poly-A-staart (hier 14 A; cap en staart: OpenStax § 15.4, nog niet geopend in deze ronde) aan 3'.
//  - afbreken (o.afbraak 0 → 1): de staart wordt korter, dan breekt de streng vanaf het 5'-uiteinde in losse nucleotiden.
//  Bekende fouten: staafje of blokje (Beeldafspraak); dubbele streng; basen aan beide kanten; even dik als DNA.
// mrnaSliert(ctx, x, y, len, {rot, seq, t, slap 0..1, rek 0..1, basen 0..1, codons 0..1, cap 0..1, polyA 0..1, afbraak 0..1, dikte, a})
// (x, y) = 5'-uiteinde; len = lengte in px langs de as. Geeft {p5, p3, punt(u) → [x, y, hoek], codon(k) → [x, y]} terug.
// =====================================================================================
const MRNA_SEQ = 'AUGGCCAAGUUCGGAUCCUGGAAACUGGUCAAUGCGUACGAUCUGGCAAGCUGA';
function _mrnaPad(x, y, len, o) { const { rot = 0, t = 0, slap = 1, rek = 0, seed = 1 } = o; const amp = len * 0.055 * slap * (1 - rek), n = 80, P = [];
  for (let i = 0; i <= n; i++) { const u = i / n, X = u * len, Y = amp * (Math.sin(u * 6.283 * 1.15 + t * 0.6 + seed) + 0.45 * Math.sin(u * 6.283 * 2.7 - t * 0.4 + seed * 2)) * Math.min(1, u * 6 + 0.25);
    P.push([x + X * Math.cos(rot) - Y * Math.sin(rot), y + X * Math.sin(rot) + Y * Math.cos(rot)]); } return P; }
function _mrnaPunt(P, u) { const f = clamp(u, 0, 1) * (P.length - 1), i = Math.min(P.length - 2, Math.floor(f)), k = f - i; const a = P[i], b = P[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; }
function mrnaSliert(ctx, x, y, len, o = {}) {
  const { a = 1, seq = MRNA_SEQ, basen = 0, codons = 0, cap = 0, polyA = 0, afbraak = 0, dikte = Math.max(2.2, len * 0.0045) } = o; if (a <= 0.01) return {};
  const P = _mrnaPad(x, y, len, o), kl = '#5BA4C9', kd = '#2E6F92';
  const nB = seq.length, nA = Math.round(14 * polyA), tot = nB + nA, stap = 1 / tot, sp = len * stap;
  const af = ease(clamp(afbraak, 0, 1)), staart = nA * (1 - clamp(af * 2, 0, 1)), u0 = clamp((af - 0.4) / 0.6, 0, 1) * 0.85, u1 = (nB + staart) / tot;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // basen (stekels aan één kant, of puzzelvorm als ingezoomd)
  const vorm = basen > 0.5 && sp >= 18;
  for (let i = 0; i < nB + Math.floor(staart); i++) { const u = (i + 0.5) * stap; if (u < u0) continue; const [px, py, an] = _mrnaPunt(P, u), b = i < nB ? seq[i] : 'A', nx = Math.cos(an + Math.PI / 2), ny = Math.sin(an + Math.PI / 2);
    if (vorm) { ctx.save(); ctx.globalAlpha *= clamp((basen - 0.5) * 2, 0, 1); d2Base(ctx, px + nx * dikte, py + ny * dikte, an + Math.PI / 2, b, sp * 0.9, sp * 0.3, { rna: true, letter: sp >= 34 }); ctx.restore(); }
    const kort = (vorm ? 0 : 1) * lerp(dikte * 2.2, Math.min(sp * 0.9, dikte * 5), basen); if (kort > 0.5) { ctx.strokeStyle = RNA_BASE.base[b]; ctx.lineWidth = Math.max(1.6, Math.min(sp * 0.45, dikte * 1.1)); ctx.beginPath(); ctx.moveTo(px + nx * dikte * 0.5, py + ny * dikte * 0.5); ctx.lineTo(px + nx * (dikte * 0.5 + kort), py + ny * (dikte * 0.5 + kort)); ctx.stroke(); } }
  // ruggengraat
  const Q = P.filter((p, i) => { const u = i / (P.length - 1); return u >= u0 && u <= u1 + stap * 0.5; });
  if (Q.length > 1) { ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = kd; ctx.lineWidth = dikte + 2; ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dikte; ctx.stroke(); }
  // codons: lichte boog onder elk drietal (aan de kant zonder basen)
  if (codons > 0.01) { ctx.save(); ctx.globalAlpha *= codons * 0.85; for (let k = 0; k * 3 < nB; k++) { const ua = k * 3 * stap + stap * 0.15, ub = (k * 3 + 3) * stap - stap * 0.15; if (ua < u0) continue; ctx.beginPath();
      for (let q = 0; q <= 8; q++) { const [px, py, an] = _mrnaPunt(P, lerp(ua, ub, q / 8)), nx = Math.cos(an - Math.PI / 2), ny = Math.sin(an - Math.PI / 2), d = dikte * 2.4 + Math.sin(q / 8 * Math.PI) * dikte * 1.2; q ? ctx.lineTo(px + nx * d, py + ny * d) : ctx.moveTo(px + nx * d, py + ny * d); }
      ctx.strokeStyle = k % 2 ? rgba(C.goud, 0.55) : rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1.5, dikte * 0.6); ctx.stroke(); } ctx.restore(); }
  // cap aan 5'
  if (cap > 0.01 && u0 < 0.01) { const [px, py] = P[0]; ctx.save(); ctx.globalAlpha *= cap; _bioCirc(ctx, px - dikte * 1.6, py, dikte * 2, '#356F91', '#8CC6E1', 1.5); ctx.restore(); }
  // losse nucleotiden van de afbraak
  if (af > 0.4) { const nLos = Math.round(u0 * nB); for (let i = 0; i < nLos; i++) { const [px, py] = _mrnaPunt(P, (i + 0.5) * stap), dr = (af - 0.4) * 60 + 10; _bioCirc(ctx, px + (hash(i * 3.1) - 0.5) * dr, py + (hash(i * 7.7) - 0.3) * dr, Math.max(1.5, dikte * 0.8), rgba(RNA_BASE.base[seq[i]], 0.8)); } }
  ctx.restore();
  return { p5: P[0], p3: _mrnaPunt(P, u1), punt: (u) => _mrnaPunt(P, u), codon: (k) => _mrnaPunt(P, (k * 3 + 1.5) * stap) };
}
