// RNA-INTERFERENTIE (overzicht van het hele proces in één beeld), ronde 2 + verbeterronde 2 eiwitten (28 okt 2026): Dicer en
// RISC (Argonaute) zijn nu een gevouwen kralenketen (_kkKluwen, eiwitten/_hulp.js) in plaats van het lintmodel; omtrek,
// plaats, grootte, stappen en aanroep ongewijzigd. Recept (OpenStax Biology 2e § 16.5; zie bron.md van ronde 2: Dicer knipt
// dubbelstrengs RNA in stukjes van ± 21 nt met 2 nt overhang aan 3'; het duplex gaat van Dicer naar Argonaute (RISC), de
// gidsstreng blijft, de passagiersstreng verdwijnt; bij volledige passing knipt Argonaute het doel-mRNA tegenover nucleotide
// 10–11 van de gids; miRNA's zijn 21–24 nt):
//  - dubbelstrengs RNA = twee dunne teal strengen met korte sporten (basenparen); Dicer = enzym (kralenketen) dat er
//    stukjes van gelijke lengte af knipt.
//  - RISC (Argonaute + één streng, de gids; kralenketen met twee lobben) zoekt een mRNA met de passende volgorde, bindt en
//    knipt het in het midden van de gids; de twee stukken mRNA worden afgebroken. RISC gaat door naar het volgende mRNA.
//  - mRNA blijft dun en sliertig (kapje aan 5', poly-A-staart aan 3').
//  - o.f 0..1: 0–0.2 Dicer knipt · 0.2–0.45 RISC houdt de gids, passagier weg · 0.45–0.7 RISC bindt het mRNA · 0.7–0.85 knip ·
//    0.85–1 stukken vallen uiteen.
// Bekende fouten: RISC dat DNA knipt; beide strengen in RISC; mRNA als balk; knip zonder passende volgorde; eiwit als lint.
// (x, y) = midden; s = schaal (± 1000 × 520 px bij s = 1). o.f, o.t. Geeft {dsRNA, dicer, risc, mrna, knip} terug.
// (_riStreng en _riDuplex blijven ongewijzigd in lib_bio.js)
function rnaInterferentie(ctx, x, y, s = 1, o = {}) {
  const { a = 1, f = 0, t = 0 } = o; if (a <= 0.01) return {};
  const p1 = ease(clamp(f / 0.2, 0, 1)), p2 = ease(clamp((f - 0.2) / 0.25, 0, 1)), p3 = ease(clamp((f - 0.45) / 0.25, 0, 1)), p4 = ease(clamp((f - 0.7) / 0.15, 0, 1)), p5 = ease(clamp((f - 0.85) / 0.15, 0, 1)), uit = {};
  const X = (v) => x + v * s, Y = (v) => y + v * s, dl = 120; // lengte van één stukje (± 21 nt; verkort getekend met 6 basenparen)
  ctx.save(); ctx.globalAlpha *= a;
  // 1) lang dubbelstrengs RNA linksboven; Dicer schuift van rechts naar links en knipt stukjes af
  const x0 = -490, x1 = -60, yd = -200, nKnip = Math.floor(p1 * 3.01);
  const rest = x1 - nKnip * (dl + 0); _riDuplex(ctx, X((x0 + rest) / 2), Y(yd), (rest - x0) * s, s, 0, 1 - p5 * 0.5, 1, 1, 0, 9);
  for (let k = 1; k <= nKnip; k++) { const kx = X(rest + (k - 1) * 0 ), ky = Y(yd); if (k > 1) break; ctx.save(); ctx.globalAlpha *= 1 - p3; ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(kx - 9 * s, ky - 34 * s); ctx.lineTo(kx + 9 * s, ky - 14 * s); ctx.moveTo(kx + 9 * s, ky - 34 * s); ctx.lineTo(kx - 9 * s, ky - 14 * s); ctx.stroke(); ctx.restore(); }
  for (let k = 0; k < 3; k++) { if (k >= nKnip) break; const isGids = k === 0, px = X(x1 - (k + 0.5) * dl + 20 + k * 30), py = Y(yd + 95 + (k % 2) * 40);
    if (isGids && p2 > 0.01) continue; _riDuplex(ctx, px, py, (dl - 6) * s, s, (k % 2 ? 0.2 : -0.15), 1 - p5 * 0.5, 1, 1, 0, k + 2); }
  const dxD = X(rest + 10), dyD = Y(yd - 46); const binD = (qx, qy) => { const ex = qx / 58, ey = qy / 40; return ex * ex + ey * ey < 1 && Math.hypot(qx, qy - 46) > 16; };
  _kkKluwen(ctx, dxD, dyD, binD, { r: 6, sc: s, col: '#7A8BA8', seed: 13, bbox: [-60, -42, 60, 42], key: 'dicer', a: 1 - p3 * 0.6 }); uit.dicer = [dxD, dyD - 50 * s]; uit.dsRNA = [X((x0 + rest) / 2), Y(yd)];
  // 2) RISC (Argonaute, twee lobben) pakt het eerste stukje; de passagiersstreng gaat weg
  const rx = lerp(X(-150), X(60), p3), ry = lerp(Y(-40), Y(132), p3); const binR = (qx, qy) => { const ex = qx / 70, ey = qy / 50; return ex * ex + ey * ey < 1 && !(Math.abs(qy - 12) < 9 && qx > -60); };
  _kkKluwen(ctx, rx, ry, binR, { r: 6, sc: s, col: '#8C9AB4', seed: 17, bbox: [-72, -52, 72, 52], key: 'risc', a: Math.min(1, f * 6) });
  if (p2 > 0.01) { const gx = lerp(X(x1 - dl / 2 + 20), rx, p2), gy = lerp(Y(yd + 95), ry + 4 * s, p2); _riDuplex(ctx, gx, gy, (dl - 6) * s, s, 0, 1, 1, 1 - ease(clamp(p2 * 1.6 - 0.6, 0, 1)), p2 * 60 * s, 2);
    // gidsstreng goud omrand zodra hij alleen in RISC zit
    if (p2 > 0.8) { ctx.save(); ctx.globalAlpha *= (p2 - 0.8) / 0.2 * (1 - p4); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5 * s; roundRect(ctx, gx - dl / 2 * s - 4 * s, gy - 34 * s, (dl - 6) * s + 8 * s, 40 * s, 8 * s); ctx.stroke(); ctx.restore(); } }
  uit.risc = [rx, ry - 60 * s];
  // 3) mRNA (dunne sliert, kapje + staart) onderaan; RISC bindt in het midden; knip; stukken vallen uiteen
  const ym = Y(150), xa = X(-420), xb = X(420), xm = X(60), gap = p4 * 30 * s, val = p5;
  const seg = (xs, xe, side) => { const P = []; for (let u = xs; side < 0 ? u <= xe : u <= xe; u += 6 * s) { const yy = ym + Math.sin(u / (34 * s) + t * 0.5) * 7 * s + Math.sin(u / (95 * s)) * 6 * s + val * 40 * s * Math.abs(Math.sin(u / (40 * s))); P.push([u + side * gap, yy + (1 - p3) * 0]); } return P; };
  ctx.save(); ctx.globalAlpha *= 1 - val * 0.75; const L = seg(xa, xm, -1), Rr = seg(xm, xb, 1);
  if (val > 0.01) { [L, Rr].forEach(P => { for (let i = 0; i < P.length - 6; i += 8) _riStreng(ctx, P.slice(i, i + 5), C.teal, 2.6 * s); }); } else { _riStreng(ctx, L, C.teal, 2.6 * s); _riStreng(ctx, Rr, C.teal, 2.6 * s); }
  _bioCirc(ctx, xa - 6 * s, ym, 7 * s, C.goud, lighten(C.goud, 0.3), 1); const Pa = []; for (let u = 0; u <= 80 * s; u += 5 * s) Pa.push([xb + gap + u, ym + Math.sin(u / (8 * s)) * 3 * s]); _riStreng(ctx, Pa, lighten(C.teal, 0.35), 1.6 * s); ctx.restore();
  uit.mrna = [X(-250), ym];
  if (p3 > 0.9 && p4 < 1) { ctx.save(); ctx.globalAlpha *= Math.min((p3 - 0.9) * 10, 1 - p4 * 0.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 * s; [[-1, -1], [1, -1]].forEach(([q]) => {}); ctx.beginPath(); ctx.moveTo(xm - 10 * s, ym - 16 * s); ctx.lineTo(xm + 10 * s, ym + 16 * s); ctx.moveTo(xm + 10 * s, ym - 16 * s); ctx.lineTo(xm - 10 * s, ym + 16 * s); ctx.stroke(); ctx.restore(); uit.knip = [xm, ym]; }
  ctx.restore(); return uit;
}
