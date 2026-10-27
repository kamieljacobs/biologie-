// =====================================================================================
// mRNA ALS SLIERT — variant B (nieuw, beeldbank 27 okt 2026).
// Recept (OpenStax Biology 2e § 15.2–15.5; Alberts MBoC 4e 'From RNA to Protein'; prompt C9 'mRNA: a thin, slack single strand, about half as
// thick as DNA, gently curved, never a straight bar; bases as short spikes on one side'; Beeldafspraak: dun en sliertig):
//  - B: de streng is een ketting van nucleotiden: per nucleotide één klein kraaltje (suiker-fosfaat) op een dunne draad, met
//    de base als kort stompje eraan; tussen twee codons een iets grotere tussenruimte, zodat drietallen zonder extra tekens
//    zichtbaar zijn (o.codons). Afbreken = kraaltjes laten één voor één los vanaf het 5'-uiteinde en drijven weg.
//  - één enkele streng, teal (RNA), ± half zo dik als DNA, slap en zacht kronkelend; beweegt rustig (t).
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
  const { a = 1, seq = MRNA_SEQ, basen = 0, codons = 0, cap = 0, polyA = 0, afbraak = 0, dikte = Math.max(2, len * 0.004), t = 0 } = o; if (a <= 0.01) return {};
  const P = _mrnaPad(x, y, len, o), kl = '#5BA4C9', kd = '#2E6F92';
  const nA = Math.round(14 * polyA), nB = seq.length, tot = nB + nA, gapC = codons * 0.35; // extra ruimte na elk codon (in nucleotiden)
  const pos = []; let acc = 0; for (let i = 0; i < tot; i++) { pos.push(acc); acc += 1 + (i < nB && i % 3 === 2 ? gapC : 0); } const U = (i) => (pos[i] + 0.5) / acc;
  const sp = len / acc, af = ease(clamp(afbraak, 0, 1)), los = Math.floor(clamp((af - 0.25) / 0.75, 0, 1) * nB * 0.8), staart = Math.round(nA * (1 - clamp(af * 3, 0, 1)));
  const kr = Math.max(1.6, Math.min(sp * 0.3, dikte * 1.4));
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const laatste = nB + staart - 1;
  // draad tussen de nog vaste kraaltjes
  if (laatste > los) { ctx.beginPath(); for (let q = 0; q <= 60; q++) { const p = _mrnaPunt(P, lerp(U(los), U(laatste), q / 60)); q ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.strokeStyle = kd; ctx.lineWidth = Math.max(1.2, dikte * 0.45); ctx.stroke(); }
  for (let i = 0; i <= laatste; i++) { let [px, py, an] = _mrnaPunt(P, U(i)); const b = i < nB ? seq[i] : 'A', nx = Math.cos(an + Math.PI / 2), ny = Math.sin(an + Math.PI / 2);
    if (i < los) { const d = (los - i) * 3 + 8; px += (hash(i * 3.3) - 0.5) * d * 2; py += (hash(i * 5.1) - 0.2) * d; an += hash(i) * 3; }
    const st = lerp(kr * 1.6, Math.min(sp * 1.2, kr * 4), basen);
    if (basen > 0.5 && sp >= 18 && i >= los) d2Base(ctx, px + nx * kr, py + ny * kr, an + Math.PI / 2, b, sp * 0.8, sp * 0.28, { rna: true, letter: sp >= 34 });
    else { ctx.strokeStyle = RNA_BASE.base[b]; ctx.lineWidth = Math.max(1.6, kr * 0.9); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an + Math.PI / 2) * st, py + Math.sin(an + Math.PI / 2) * st); ctx.stroke(); }
    _bioCirc(ctx, px, py, kr, kl, i < los ? null : '#B5DCEE', 1); }
  if (cap > 0.01 && los === 0) { const [px, py] = P[0]; ctx.save(); ctx.globalAlpha *= cap; _bioCirc(ctx, px - kr * 2.4, py, kr * 1.5, '#356F91', '#8CC6E1', 1.5); ctx.restore(); }
  ctx.restore();
  return { p5: P[0], p3: _mrnaPunt(P, U(Math.max(0, laatste))), punt: (u) => _mrnaPunt(P, u), codon: (k) => _mrnaPunt(P, U(Math.min(tot - 1, k * 3 + 1))) };
}
