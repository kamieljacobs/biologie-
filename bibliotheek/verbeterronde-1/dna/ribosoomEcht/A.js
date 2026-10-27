// =====================================================================================
// RIBOSOOM — variant A (nieuw, beeldbank 27 okt 2026): twee gladde subeenheden met een uitsnede voor de A-, P- en E-plek.
// Recept (OpenStax Biology 2e § 15.5; Alberts MBoC 4e 'From RNA to Protein'):
//  - kleine subeenheid (onder het mRNA) bindt het mRNA, grote subeenheid (erboven) bindt de tRNA's en maakt de peptidebinding;
//    mens 40S + 60S = 80S, ± 25 nm (prompt C9); voor 2/3 RNA, 1/3 eiwit. Kleur C.ribo (beige), zoals de ribosomen in de cel (C2).
//  - drie tRNA-plekken naast elkaar langs het mRNA: E (exit) – P (peptidyl) – A (aminoacyl), in leesrichting 5' → 3';
//    het ribosoom schuift per stap precies één codon (3 nucleotiden) op (o.stap 0 → 1 = één codon verder).
//  - de groeiende keten verlaat de grote subeenheid door een tunnel (± 10 nm × 1,5 nm) bovenop en vouwt daarbuiten (keten van
//    kralen, oker = voedsel/aminozuren, C1); stand 'er': de grote subeenheid zit op het ER-membraan en de keten gaat erdoorheen.
//  - polysoom: meerdere ribosomen op één mRNA, minstens ± 80 nucleotiden uit elkaar, ketens langer naarmate ze verder zijn.
//  Bekende fouten: twee bolletjes; mRNA dóór de grote subeenheid; keten uit de kleine subeenheid; sites in de verkeerde volgorde.
// ribosoomEcht(ctx, x, y, s, {stand, keten, stap, sites, codon, t, a}); (x, y) = mRNA onder de P-plek; s = schaal (1 ≈ 220 px breed).
// Geeft {A, P, E, tunnel, top} terug. polysoom(ctx, x0, y, len, n, {s, t, a}).
// =====================================================================================
function _riboKeten(ctx, x, y, n, r, t, er) { if (n <= 0) return; const P = []; let px = x, py = y, an = -Math.PI / 2;
  for (let i = 0; i < n; i++) { if (i > 2) an += (hash(i * 3.7) - 0.5) * 1.6 + Math.sin(t * 0.8 + i) * 0.08; else an = er ? Math.PI / 2 : -Math.PI / 2; px += Math.cos(an) * r * 1.7; py += Math.sin(an) * r * 1.7; P.push([px, py]); }
  ctx.strokeStyle = '#9C7A4A'; ctx.lineWidth = r * 0.6; ctx.beginPath(); ctx.moveTo(x, y); P.forEach(p => ctx.lineTo(p[0], p[1])); ctx.stroke();
  const AAT = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F']; P.forEach((p, i) => _bioCirc(ctx, p[0], p[1], r, AAT[i % 5], lighten(AAT[i % 5], 0.3), 1.2)); }
function ribosoomEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, stand = 'vrij', keten = 0, stap = 0, sites = 0, t = 0, codon = 42 * s } = o; if (a <= 0.01) return {}; const u = 100 * s, er = stand === 'er';
  const kl = C.ribo || '#C9B896', kd = _mixHex(kl, '#121A26', 0.35), rd = lighten(kl, 0.3);
  ctx.save(); ctx.globalAlpha *= a; const dx = -ease(clamp(stap, 0, 1)) * 0; // ribosoom zelf staat; de aanroeper schuift x per codon
  const X = x + codon * 0.0, P = [X, y], A = [X + codon, y], E = [X - codon, y];
  // grote subeenheid (boven het mRNA): koepel met een inham aan de onderkant voor de drie plekken
  ctx.beginPath(); bioPad(ctx, [[X - 1.05 * u, y - 0.18 * u], [X - 1.12 * u, y - 0.75 * u], [X - 0.7 * u, y - 1.28 * u], [X + 0.05 * u, y - 1.42 * u], [X + 0.8 * u, y - 1.22 * u], [X + 1.15 * u, y - 0.7 * u], [X + 1.05 * u, y - 0.18 * u], [X + 0.6 * u, y - 0.12 * u], [X, y - 0.16 * u], [X - 0.6 * u, y - 0.12 * u]], true); shape(ctx, kl, rd, 1.5);
  // kleine subeenheid (onder het mRNA) met 'kop'
  ctx.beginPath(); bioPad(ctx, [[X - 0.92 * u, y + 0.12 * u], [X - 0.98 * u, y + 0.45 * u], [X - 0.55 * u, y + 0.72 * u], [X + 0.2 * u, y + 0.66 * u], [X + 0.6 * u, y + 0.8 * u], [X + 0.95 * u, y + 0.5 * u], [X + 0.9 * u, y + 0.14 * u], [X, y + 0.1 * u]], true); shape(ctx, _mixHex(kl, '#121A26', 0.12), rd, 1.5);
  // uitsnede met de drie plekken (donker), E – P – A
  if (sites > 0.01 && u > 50) { ctx.save(); ctx.globalAlpha *= sites; [[E, 'E'], [P, 'P'], [A, 'A']].forEach(([q]) => { roundRect(ctx, q[0] - codon * 0.44, y - 0.95 * u, codon * 0.88, 0.8 * u, codon * 0.25); shape(ctx, rgba('#121A26', 0.75), kd, 1.5); }); ctx.restore(); }
  // tunnel vanaf de P-plek naar de top
  ctx.strokeStyle = kd; ctx.lineWidth = Math.max(2, 0.07 * u); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X + 0.05 * u, y - 0.9 * u); ctx.quadraticCurveTo(X + 0.25 * u, y - 1.15 * u, X + 0.12 * u, y - 1.42 * u); ctx.stroke();
  const tun = [X + 0.12 * u, y - 1.42 * u];
  if (er) { const Rm = 9 * u, cy = y - 1.62 * u - Rm; ctx.lineCap = 'round'; [0, 0.2 * u].forEach((d, k) => { ctx.beginPath(); ctx.arc(X, cy - d, Rm, Math.PI / 2 - 0.2, Math.PI / 2 + 0.2); ctx.strokeStyle = rgba(C.er, k ? 0.6 : 0.95); ctx.lineWidth = 0.12 * u; ctx.stroke(); }); } // ER-membraan (gebogen, dubbel)
  _riboKeten(ctx, tun[0], tun[1] - (er ? 0.45 * u : 0), keten, Math.max(2, 0.085 * u), t, false);
  ctx.restore(); return { A, P, E, tunnel: tun, top: y - 1.42 * u };
}
function polysoom(ctx, x0, y, len, n, o = {}) { const { s = 0.5, t = 0, a = 1 } = o; const out = [];
  for (let i = 0; i < n; i++) { const x = x0 + len * (n - i - 0.5) / n; out.push(ribosoomEcht(ctx, x, y, s, { keten: 2 + Math.round((n - i) * 3), t: t + i, a })); } return out; }
