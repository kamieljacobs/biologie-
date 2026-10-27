// =====================================================================================
// RNA-POLYMERASE MET TRANSCRIPTIEBEL — variant B (nieuw, beeldbank 27 okt 2026): doorzichtig enzym als kralenkluwen vóór het DNA.
// Recept (OpenStax Biology 2e § 15.2: 'the DNA unwinds ahead of the polymerase and then rewinds behind it', RNA 5' → 3' met
// ± 40 nt/s, promotor stroomopwaarts, terminator laat los; Barnes e.a. 2015 Mol Cell 59:258: transcriptiebel ± 8–22 nt open,
// kort DNA-RNA-hybride ± 8–9 bp):
//  - de polymerase (grijsblauw eiwit, actief centrum goud) zit óp het DNA en opent het alleen lokaal (bel ± 14 bp); vóór en
//    achter de bel blijft het een rechtsdraaiende dubbele helix (dnaLadderHelix) — duidelijk anders dan replicatie: geen vork,
//    geen twee nieuwe strengen, maar één dunne teal mRNA-sliert die uit het enzym komt.
//  - de matrijsstreng (onder) wordt 3' → 5' gelezen; het mRNA groeit 5' → 3' met U tegenover A; ± 8 basen vormen een hybride
//    met de matrijs, daarna laat het mRNA los en verlaat het enzym schuin naar boven.
//  - B: het enzym ligt als één gevouwen kralenketen (Beeldafspraak: eiwit = keten) vóór het DNA, met een halfdoorzichtige vulling
//    (vlak, 40 %), zodat bel, matrijs en mRNA er doorheen te zien zijn; het mRNA komt via een uitgangsgleuf linksboven naar buiten.
//  - standen: 'bind' (op de promotor, DNA nog dicht), 'open' (bel open, nog geen RNA), 'lees' (bel + mRNA van o.mrna px),
//    'los' (terminator: enzym en mRNA laten los, DNA sluit). Animeer de beweging door x te verschuiven (DNA ligt stil).
//  Bekende fouten: replicatievork; RNA dat aan beide strengen ontstaat; DNA dat open blijft achter de polymerase; dik mRNA.
// rnaPolymerase(ctx, x, y, s, {stand, mrna, x0, x1, seq, t, a}); (x, y) = actief centrum op de DNA-as; s = schaal (1 ≈ 240 px breed).
// Geeft {actief, p5 (mRNA-uiteinde), bel: [xa, xb]} terug.
// =====================================================================================
function _rnapDNA(ctx, x, y, u, o) { const { x0 = x - 6 * u, x1 = x + 6 * u, open = 1, seq = 'TACGGATCCATGAAGTTCGGACTGATCCGTAGCTTAG' } = o;
  const dx = 0.1 * u, R = 0.27 * u, xa = x - 1.0 * u, xb = x + 0.4 * u, s = R / 110 * 0.62 * 1.6;
  const helix = (xs, xe, fase) => { if (xe - xs < dx * 2) return; const n = Math.floor((xe - xs) / dx) + 1; dnaLadderHelix(ctx, xs, y, dx, seq.repeat(4).slice(0, n), { draai: 1, R, s: Math.max(0.05, s), fase, toonBasen: 1 }); };
  if (open < 0.01) { helix(x0, x1, 0); return { xa, xb, dx, R, dicht: true }; }
  helix(x0, xa, 0); helix(xb, x1, (xb - x0) / dx * 0.628);
  // bel: codestreng boog omhoog, matrijs boog omlaag, met losse basen naar binnen
  const H = (X) => Math.sin(clamp((X - xa) / (xb - xa), 0, 1) * Math.PI) * open;
  const rug = D2.oud, bw = Math.max(3, R * 0.2), Ltop = [], Lbot = [];
  for (let X = xa; X <= xb + 0.01; X += dx * 0.5) { Ltop.push([X, y - R - H(X) * 0.35 * u]); Lbot.push([X, y + R + H(X) * 0.25 * u]); }
  const tB = [], cB = []; for (let X = xa + dx * 0.5, i = 0; X < xb; X += dx, i++) { const b = seq[i % seq.length]; tB.push([X, b]); cB.push([X, D2.comp[b]]); }
  return { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug }; }
function _rnapStrengen(ctx, D, y, u, mrna, t) { if (D.dicht) return null; const { xa, xb, dx, R, bw, Ltop, Lbot, tB, cB, H, rug } = D; const L = Math.max(4, R * 0.75);
  cB.forEach(([X, b]) => d2Base(ctx, X, y - R - H(X) * 0.35 * u + bw * 0.4, Math.PI / 2, b, L * (1 - 0.35 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  tB.forEach(([X, b]) => d2Base(ctx, X, y + R + H(X) * 0.25 * u - bw * 0.4, -Math.PI / 2, D2.comp[b], L * (1 - 0.2 * H(X)), Math.max(1.5, dx * 0.32), { vorm: false }));
  d2Rug(ctx, Ltop, { kleur: rug, bw }); d2Rug(ctx, Lbot, { kleur: rug, bw });
  // RNA: hybride over de laatste 8 nt vóór het actieve centrum, daarna los en schuin omhoog naar achteren
  if (mrna > 0) { const xs = xb - dx * 1.5, yh = (X) => y + R + H(X) * 0.25 * u - L * 1.9; const P = [];
    for (let k = 0; k <= 8 && k * dx <= mrna; k++) P.push([xs - k * dx, yh(xs - k * dx)]);
    const rest = mrna - 8 * dx; if (rest > 0) { const [px, py] = P[P.length - 1]; for (let q = 1; q <= 40; q++) { const f = q / 40, d = rest * f; P.push([px - d * 0.55 + Math.sin(f * 7 + t) * u * 0.05, py - d * 0.75 + Math.sin(f * 5 - t * 0.7) * u * 0.06]); } }
    // basen van het hybride (U tegenover A)
    for (let k = 0; k < 8 && k * dx <= mrna; k++) { const X = xs - k * dx, tb = tB.find(q => Math.abs(q[0] - X) < dx * 0.6); if (!tb) continue; const rb = D2.rcomp[D2.comp[tb[1]]] ; d2Base(ctx, X, yh(X), Math.PI / 2, rb === 'T' ? 'U' : rb, L * 0.85, Math.max(1.5, dx * 0.32), { vorm: false, rna: true }); }
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#2E6F92'; ctx.lineWidth = Math.max(2.5, bw * 0.55) + 2; ctx.stroke(); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, bw * 0.55); ctx.stroke(); ctx.restore();
    return P[P.length - 1]; } return null; }
function rnaPolymerase(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'lees', mrna = 0, t = 0 } = o; if (a <= 0.01) return {}; const u = 100 * s;
  const open = stand === 'bind' || stand === 'los' ? 0 : 1, los = stand === 'los' ? 1 : 0, rL = stand === 'lees' || stand === 'los' ? mrna : 0;
  ctx.save(); ctx.globalAlpha *= a;
  const ex = x - 0.3 * u, ey = y - los * 0.75 * u; // enzymmidden (tilt omhoog bij loslaten)
  const D = _rnapDNA(ctx, x, y, u, Object.assign({}, o, { open }));
  let p5 = null; if (los < 1) p5 = _rnapStrengen(ctx, D, y, u, rL, t); else { // los: DNA dicht, mRNA drijft weg
    const P = []; for (let q = 0; q <= 40; q++) { const f = q / 40; P.push([x - 0.6 * u - f * rL * 0.8, y - 0.9 * u - f * rL * 0.3 + Math.sin(f * 6 + t) * u * 0.08]); } ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = Math.max(2.5, u * 0.04); ctx.stroke(); ctx.restore(); p5 = P[P.length - 1]; }
  // voorkant: halfdoorzichtig kluwen + kralenketen langs de omtrek (en een lus door het midden boven de bel)
  const omtrek = [[ex - 1.25 * u, ey + 0.1 * u], [ex - 1.05 * u, ey - 0.85 * u], [ex - 0.2 * u, ey - 1.15 * u], [ex + 0.8 * u, ey - 0.95 * u], [ex + 1.25 * u, ey - 0.25 * u], [ex + 1.15 * u, ey + 0.7 * u], [ex + 0.3 * u, ey + 1.0 * u], [ex - 0.8 * u, ey + 0.85 * u]];
  ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.fillStyle = rgba('#7A8BA8', 0.4); ctx.fill();
  const keten = bioDicht(omtrek.concat([omtrek[0], [ex - 0.5 * u, ey - 0.55 * u], [ex + 0.6 * u, ey - 0.6 * u]]), 10), rk = Math.max(1.8, u * 0.055);
  ctx.strokeStyle = rgba('#5E6E8A', 0.9); ctx.lineWidth = rk * 0.8; ctx.lineJoin = 'round'; ctx.beginPath(); keten.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  for (let i = 0; i < keten.length; i += 3) _bioCirc(ctx, keten[i][0], keten[i][1], rk, '#8E9CB8', '#B8C4D6', 1);
  const act = [D.xb - D.dx * 1.5, y + D.R + 0.25 * u * open - D.R * 0.75 * 1.0]; if (open && !los) _bioCirc(ctx, act[0], act[1], Math.max(2.5, u * 0.05), rgba(C.goud, 0.85), C.goud, 1.5);
  ctx.restore(); return { actief: act, p5, bel: [D.xa, D.xb] };
}
