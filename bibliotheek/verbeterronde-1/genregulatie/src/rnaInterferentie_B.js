// =====================================================================================
// RNA-INTERFERENTIE: close-up van RISC op het mRNA (basen zichtbaar). Recept (OpenStax Biology 2e § 16.5; Kawamata & Tomari
// 2010, Trends Biochem Sci (PMC2855239): siRNA-duplex van Dicer (± 21 nt, 2 nt overhang aan 3') gaat naar Argonaute, de
// passagiersstreng gaat weg, de gidsstreng blijft; alleen bij volledige passing knipt Argonaute het doel-mRNA, tegenover
// nucleotide 10–11 van de gids):
//  - Argonaute = eiwit met twee lobben (gevouwen ketens) en een geul waarin de gids ligt; basen naar buiten, klaar om te paren.
//  - het mRNA (dunne teal sliert) komt langs; de basen passen als puzzelstukjes op de gids (A–U, C–G), dan knipt Argonaute in
//    het midden (goud). De twee stukken laten los en worden afgebroken; RISC blijft heel en kan opnieuw.
//  - o.f 0..1: 0–0.25 duplex komt binnen, passagier gaat weg · 0.25–0.5 mRNA komt aan · 0.5–0.7 basen paren · 0.7–0.82 knip ·
//    0.82–1 stukken laten los. (Dicer zelf en het lange dubbelstrengs RNA staan in de overzichtsversie.)
// Bekende fouten: knip zonder passing; RISC dat beide strengen houdt; basen die niet passen (A tegenover C).
// Vereist baseRingRNA (lib_bio.js). Zelfde aanroep als de overzichtsversie: (x, y) = midden; s = schaal (± 1000 × 520 bij s = 1).
// Geeft {dsRNA, risc, mrna, knip} terug.
// =====================================================================================
//@@KLUWEN
function _riStreng(ctx, P, kl, lw) { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); }
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0, gids = 'UAGCUUAGCAGGUCAUCGAAU' } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.25, 0, 1)), p2 = ease(clamp((f - 0.25) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.5) / 0.2, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.12, 0, 1)), p5 = ease(clamp((f - 0.82) / 0.18, 0, 1)), uit = {};
  const n = gids.length, dx = 38 * s, bs = 0.4 * s, Lb = DNA_BASE.len * bs, xg0 = x - (n - 1) * dx / 2, yg = y - 20 * s, comp = { A: 'U', U: 'A', C: 'G', G: 'C' };
  ctx.save(); ctx.globalAlpha *= a;
  // Argonaute: twee lobben (achter), de gids in de geul ertussen
  const binL = (qx, qy) => { const ex = (qx + 10) / 300, ey = (qy + 40) / 80; return ex * ex + ey * ey < 1 && qy < -2; };
  const binO = (qx, qy) => { const ex = (qx - 30) / 250, ey = (qy - 128) / 70; return ex * ex + ey * ey < 1 && qy > 92; };
  _grKluwen(ctx, x, y, binL, { r: 7, sc: s, col: '#8C9AB4', seed: 19, bbox: [-320, -130, 300, 0], key: 'agoB1' });
  uit.risc = [x - 10 * s, y - 120 * s];
  // gidsstreng (ruggengraat + basen naar beneden); passagiersstreng (lichter) eronder, gaat weg
  _riStreng(ctx, [[xg0 - 20 * s, yg], [xg0 + (n - 1) * dx + 10 * s, yg]], C.teal, 6 * s);
  for (let i = 0; i < n; i++) baseRingRNA(ctx, xg0 + i * dx, yg + 4 * s, gids[i], 1, { s: bs, plekA: 0, rand: (i === 9 || i === 10) && p4 > 0.01 && p4 < 1 ? C.goud : null });
  const ink = lerp(-420, 0, p1) * s;
  if (p1 < 1 || f < 0.25) { ctx.save(); ctx.globalAlpha *= 1 - ease(clamp((f - 0.15) / 0.1, 0, 1)); const yp = yg + 2 * Lb + 16 * s + p1 * 60 * s * clamp((f - 0.12) * 10, 0, 1);
    for (let i = 2; i < n; i++) baseRingRNA(ctx, xg0 + i * dx + ink * 0 + (f < 0.12 ? 0 : 0), yp - 4 * s, comp[gids[i]], -1, { s: bs, plekA: 0 }); _riStreng(ctx, [[xg0 + 2 * dx - 10 * s, yp], [xg0 + (n + 1) * dx, yp]], lighten(C.teal, 0.4), 6 * s); ctx.restore(); uit.dsRNA = [x, yp]; }
  // mRNA: komt van onderen aan, basen naar boven; passend stuk in het midden, de rest dun en sliertig
  if (p2 > 0.01) { const ym = lerp(y + 260 * s, yg + 2 * Lb + 16 * s, p2) + p5 * 70 * s, gap = p4 * 26 * s, Ls = [], Rs = [];
    const yy = (u) => ym + (Math.abs(u - x) > (n / 2) * dx ? Math.sin(u / (30 * s) + t * 0.5) * 8 * s * (1 - p3 * 0.3) + (Math.abs(u - x) - (n / 2) * dx) * 0.12 : 0);
    for (let u = x - 470 * s; u <= x + 470 * s; u += 6 * s) { const knipX = xg0 + 9.5 * dx; (u < knipX ? Ls : Rs).push([u + (u < knipX ? -gap : gap) - (u < knipX ? 1 : -1) * p5 * 60 * s, yy(u)]); }
    ctx.save(); ctx.globalAlpha *= Math.min(1, p2 * 2) * (1 - p5 * 0.7); _riStreng(ctx, Ls, C.teal, 6 * s); _riStreng(ctx, Rs, C.teal, 6 * s);
    for (let i = 0; i < n; i++) { const kx = xg0 + i * dx, links = i <= 9; baseRingRNA(ctx, kx + (links ? -gap : gap) - (links ? 1 : -1) * p5 * 60 * s, ym - 4 * s, comp[gids[i]], -1, { s: bs, plekA: 0 }); }
    _bioCirc(ctx, Ls[0][0] - 6 * s, Ls[0][1], 8 * s, C.goud, lighten(C.goud, 0.3), 1); ctx.restore(); uit.mrna = [x - 380 * s, ym]; }
  // onderste lob van Argonaute klemt het gepaarde stuk (komt pas bij paren dicht)
  _grKluwen(ctx, x, y + lerp(60, 0, p3) * s, binO, { r: 7, sc: s, col: '#7A8BA8', seed: 23, bbox: [-230, 50, 290, 200], key: 'agoB2', a: 0.35 + 0.65 * p3 });
  if (p4 > 0.01 && p4 < 1) { const kx = xg0 + 9.5 * dx, ky = yg + Lb + 8 * s; ctx.save(); ctx.globalAlpha *= Math.sin(p4 * Math.PI); ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath();
    for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283; ctx.moveTo(kx + Math.cos(an) * 14 * s, ky + Math.sin(an) * 14 * s); ctx.lineTo(kx + Math.cos(an) * 30 * s, ky + Math.sin(an) * 30 * s); } ctx.stroke(); ctx.restore(); uit.knip = [kx, ky]; }
  ctx.restore(); return uit;
}
