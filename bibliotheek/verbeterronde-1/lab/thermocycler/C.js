// =====================================================================================
// THERMOCYCLER als gekoppeld schema: apparaat (schuin, deksel open met blok en buisjes) + temperatuurprofiel met lopende stip + wat de
// DNA-strengen bij die temperatuur doen + teller van het aantal kopieën (1 → 2 → 4 → 8).
// Recept: drie stappen per cyclus (OpenStax Biology 2e § 17.1; PCR-collegeslides KSU): ± 95 °C (20–30 s) de twee
//  strengen gaan los; 50–65 °C (hier 55, ± 30 s) korte primers binden aan het 3′-uiteinde van elke streng; 72 °C
//  (± 60 s) Taq-polymerase bouwt vanaf de primer een nieuwe streng (5′ → 3′). Elke cyclus verdubbelt het aantal
//  kopieën (n cycli → 2ⁿ); 25–35 cycli. De opwarm- en afkoelflanken zijn kort maar zichtbaar (geen sprong).
//  Kleuren: oude streng paars, nieuwe streng lichtpaars, primer goud; lijn van het profiel koraal bij opwarmen,
//  teal bij afkoelen. Apparaat ± 25 cm breed (≈).
//  Bekende fouten: primers binden bij 95 °C; nieuwe streng groeit in beide richtingen tegelijk vanaf het midden;
//  na één cyclus vier kopieën.
// x, y = linksonder van het hele schema; s = schaal (1 ≈ 1 px per mm voor het apparaat; schema ± 860 × 520 px).
// o.fase = cycli als kommagetal (2,4 = derde cyclus, primers binden); o.toon 'alles' | 'apparaat'; o.open (deksel,
// standaard 0,55); o.a.
// Geeft { apparaat, profiel, strengen, teller, temp } terug.
// =====================================================================================
function _tcTemp(f) { const c = Math.floor(f), u = f - c, voor = c === 0 ? 25 : 72;
  if (u < 0.05) return lerp(voor, 95, u / 0.05); if (u < 0.25) return 95; if (u < 0.32) return lerp(95, 55, (u - 0.25) / 0.07); if (u < 0.5) return 55; if (u < 0.55) return lerp(55, 72, (u - 0.5) / 0.05); return 72; }
function _tcKast(ctx, x, y, s, o = {}) {
  const { a = 1, open = 0, temp = 95, cyclus = 1, van = 30, stap = null, buisjes = 0, hl = 0 } = o;
  const W = 250, H = 150, D = 400, kx = 0.42, ky = 0.3;
  const pr = (X, Y, Z) => [x + (X + Z * kx) * s, y - (Y + Z * ky) * s];
  const ret = { display: pr(70, 90, 0), blok: pr(125, H, 96), deksel: pr(125, H + 60, 200), lamp: pr(210, 95, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const lw = Math.max(1, s * 0.5);
  const vlak = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach((p, i) => { const q = pr(...p); i ? ctx.lineTo(...q) : ctx.moveTo(...q); }); ctx.closePath(); shape(ctx, fill, stroke || lighten(fill, 0.18), lw); };
  const kast = '#3A4A66', kastL = '#4B5D7E', kastD = '#2B384F';
  // voetjes, zijkant, voorkant, bovenkant
  vlak([[W, 0, 0], [W, 0, D], [W, H, D], [W, H, 0]], kastD);
  vlak([[0, 0, 0], [W, 0, 0], [W, H, 0], [0, H, 0]], kast);
  vlak([[0, H, 0], [W, H, 0], [W, H, D], [0, H, D]], kastL);
  // ventilatiesleuven op de zijkant
  ctx.strokeStyle = rgba('#121A26', 0.6); ctx.lineWidth = lw; for (let k = 0; k < 9; k++) { const z = 120 + k * 22; const p0 = pr(W, 25, z), p1 = pr(W, 70, z); ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  // display + lampje + knopjes op de voorkant
  vlak([[18, 55, 0], [128, 55, 0], [128, 125, 0], [18, 125, 0]], '#0F1828', '#5A6B88');
  const dp = pr(73, 102, 0), fs = 22 * s;
  if (s > 0.6) { text(ctx, Math.round(temp) + ' °C', dp[0], dp[1], fMeta(Math.max(8, fs)), stap === 'op' ? C.koraal : stap === 'af' ? C.teal : C.text, 'center');
    const dp2 = pr(73, 72, 0); text(ctx, cyclus + ' / ' + van, dp2[0], dp2[1], fMeta(Math.max(7, fs * 0.65)), C.text2, 'center'); }
  const lp = pr(205, 100, 0); circ(ctx, lp[0], lp[1], 6 * s, stap === 'op' ? C.koraal : stap === 'af' ? C.teal : stap === 'klaar' ? C.groen : '#55657F');
  for (let k = 0; k < 3; k++) { const q = pr(160 + k * 22, 70, 0); circ(ctx, q[0], q[1], 6 * s, '#55657F'); }
  // blok met 12 × 8 gaatjes (bovenop, onder het deksel)
  const bx0 = 71, bz0 = 60; vlak([[bx0 - 8, H, bz0 - 8], [bx0 + 116, H, bz0 - 8], [bx0 + 116, H, bz0 + 80], [bx0 - 8, H, bz0 + 80]], '#8C96A6', '#B8C0CC');
  if (s > 0.9) for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const q = pr(bx0 + c * 9 + 4.5, H, bz0 + r * 9 + 4.5); ctx.beginPath(); ctx.ellipse(q[0], q[1], 3.0 * s, 2.0 * s, 0, 0, 6.283); ctx.fillStyle = '#4C5566'; ctx.fill(); }
  for (let c = 0; c < buisjes; c++) { const q0 = pr(bx0 + c * 9 + 4.5, H, bz0 + 4.5), q1 = pr(bx0 + c * 9 + 4.5, H + 9, bz0 + 4.5); ctx.fillStyle = rgba(C.er, 0.8); ctx.fillRect(q0[0] - 3 * s, q1[1], 6 * s, q0[1] - q1[1]); ctx.beginPath(); ctx.ellipse(q1[0], q1[1], 3.2 * s, 1.6 * s, 0, 0, 6.283); ctx.fillStyle = '#DDE4EC'; ctx.fill(); }
  // deksel: doos die om de achterrand (Z = D) draait
  const phi = clamp(open, 0, 1) * 1.25, Lz = D - 20, h = 55;
  const hoek = (X, yr, zr) => { const Z = zr * Math.cos(phi) + yr * Math.sin(phi), Y = -zr * Math.sin(phi) + yr * Math.cos(phi); return [X, H + 2 + Y, D + Z]; };
  const c = (X, top, voor) => hoek(X, top ? h : 0, voor ? -Lz : 0);
  const vlakken = [
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 0, 0), c(0, 0, 0)], f: '#262F40', z: 0 },   // onderkant (verwarmd deksel)
    { p: [c(0, 0, 1), c(W, 0, 1), c(W, 1, 1), c(0, 1, 1)], f: kast, z: 1 },        // voorkant
    { p: [c(W, 0, 1), c(W, 0, 0), c(W, 1, 0), c(W, 1, 1)], f: kastD, z: 1 },       // zijkant
    { p: [c(0, 1, 1), c(W, 1, 1), c(W, 1, 0), c(0, 1, 0)], f: kastL, z: 2 }];      // bovenkant
  const zichtbaar = (q) => { const P0 = pr(...q[0]), P1 = pr(...q[1]), P2 = pr(...q[2]); return (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P1[1] - P0[1]) * (P2[0] - P0[0]); };
  vlakken.forEach(v => { if (v.z === 0 ? phi > 0.05 : true) { const z = zichtbaar(v.p); if (v.z === 0 || z < 0 || v.z === 2 || v.z === 1) vlak(v.p, v.f); } });
  if (s > 0.6) { const g = pr(W / 2, H + h + 2, 30); const g2 = c(W / 2 - 40, 1, 1), g3 = c(W / 2 + 40, 1, 1); ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(...pr(...g2)); ctx.lineTo(...pr(...g3)); ctx.stroke(); }
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = lw * 2.5; ctx.beginPath(); const q = [pr(0, 0, 0), pr(W, 0, 0), pr(W, 0, D), pr(W, H, D)]; ctx.strokeRect(q[0][0] - 6, pr(0, H + h, 0)[1] - 6, q[1][0] - q[0][0] + 12, q[0][1] - pr(0, H + h, 0)[1] + 12); }
  ctx.restore(); return ret;
}
function thermocycler(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0, toon = 'alles' } = o; const f = Math.max(0, fase), c = Math.floor(f), u = f - c, T = _tcTemp(f);
  const stap = u < 0.05 || (u >= 0.5 && u < 0.55) ? 'op' : (u >= 0.25 && u < 0.32) ? 'af' : u < 0.25 ? 'los' : u < 0.5 ? 'binden' : 'bouwen';
  const ret = { apparaat: [x + 150 * s, y - 130 * s], profiel: [x + 560 * s, y - 380 * s], strengen: [x + 560 * s, y - 150 * s], teller: [x + 125 * s, y - 20 * s], temp: T };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // --- apparaat schuin van voren, deksel open met het blok (12 × 8 gaatjes) en een strip buisjes erin
  _tcKast(ctx, x, y, 0.72 * s, { open: o.open == null ? 0.55 : o.open, temp: T, cyclus: c + 1, van: 30, stap: stap === 'op' ? 'op' : stap === 'af' ? 'af' : null, buisjes: 8 });
  if (toon !== 'alles') { ctx.restore(); return ret; }
  // --- temperatuurprofiel: 3 cycli zichtbaar rond de huidige
  const gx = x + 400 * s, gy = y - 260 * s, gw = 470 * s, gh = 230 * s, c0 = Math.max(0, c - 1), nC = 3;
  const tx = (ff) => gx + (ff - c0) / nC * gw, ty = (TT) => gy - (Math.max(TT, 40) - 40) / 60 * gh;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10 * s); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw + 10 * s, gy); ctx.stroke();
  for (const TT of [55, 72, 95]) { ctx.strokeStyle = rgba(C.line, 0.25); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(gx, ty(TT)); ctx.lineTo(gx + gw, ty(TT)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, TT + ' °C', gx - 10 * s, ty(TT) + 9 * s, fMeta(Math.max(10, 26 * s)), C.text2, 'right'); }
  const seg = (f0, f1, kleur, w) => { ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); for (let ff = f0; ff <= f1 + 1e-6; ff += 0.004) { const p = [tx(ff), ty(_tcTemp(ff))]; ff === f0 ? ctx.moveTo(...p) : ctx.lineTo(...p); } ctx.stroke(); };
  seg(c0, c0 + nC - 0.001, rgba(C.line, 0.45), 2.5 * s); // hele profiel vaag
  for (let ff = c0; ff < f; ff += 0.01) { const g = ff - Math.floor(ff); const k = (g < 0.05 || (g >= 0.5 && g < 0.55)) ? C.koraal : (g >= 0.25 && g < 0.32) ? C.teal : C.text; seg(ff, Math.min(f, ff + 0.01), k, 4 * s); }
  circ(ctx, tx(f), ty(T), 9 * s, C.goud);
  // --- de strengen bij deze stap (één molecuul, 20 sporten)
  const sx = gx + 40 * s, sw = gw - 80 * s, sy = y - 120 * s, N = 20, st = sw / N, open = stap === 'los' ? clamp(u / 0.2, 0, 1) : stap === 'af' || stap === 'binden' || stap === 'bouwen' ? 1 : (u >= 0.5 ? 1 : 0);
  const gap = lerp(28, 90, open) * s, yT = sy - gap / 2, yB = sy + gap / 2, rung = 13 * s;
  const streng = (yy, kl, i0, i1, dir) => { ctx.strokeStyle = kl; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(sx + i0 * st, yy); ctx.lineTo(sx + i1 * st, yy); ctx.stroke(); ctx.lineWidth = 5 * s; for (let i = i0; i < i1; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yy); ctx.lineTo(sx + (i + 0.5) * st, yy + dir * rung); ctx.stroke(); } };
  streng(yT, C.paars, 0, N, 1); streng(yB, C.paars, 0, N, -1);
  if (open < 0.3) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 3 * s; for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yT + rung); ctx.lineTo(sx + (i + 0.5) * st, yB - rung); ctx.stroke(); } }
  const prim = (stap === 'binden' && u > 0.36) || stap === 'bouwen' || (u >= 0.5); const pa = stap === 'binden' ? clamp((u - 0.36) / 0.1, 0, 1) : 1;
  if (prim && open > 0.9) { ctx.save(); ctx.globalAlpha *= pa; streng(yT + 2 * rung + 4 * s, C.goud, N - 3, N, -1); streng(yB - 2 * rung - 4 * s, C.goud, 0, 3, 1); ctx.restore();
    if (stap === 'bouwen') { const g = clamp((u - 0.55) / 0.4, 0, 1), n = Math.round(g * (N - 3)); streng(yT + 2 * rung + 4 * s, D2.nieuw, N - 3 - n, N - 3, -1); streng(yB - 2 * rung - 4 * s, D2.nieuw, 3, 3 + n, 1); } }
  text(ctx, "5′", sx - 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'right'); text(ctx, "3′", sx + sw + 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'left');
  // --- teller: aantal kopieën als kleine dubbelstrengen
  const n = Math.pow(2, c) * (stap === 'bouwen' && u > 0.97 ? 2 : 1), toonN = Math.min(n, 16);
  for (let i = 0; i < toonN; i++) { const px = x + (10 + (i % 8) * 30) * s, py = y + (40 + Math.floor(i / 8) * 26) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22 * s, py); ctx.moveTo(px, py + 9 * s); ctx.lineTo(px + 22 * s, py + 9 * s); ctx.stroke(); }
  text(ctx, '× ' + n, x + 260 * s, y + 56 * s, fMeta(Math.max(10, 28 * s)), C.text, 'left');
  ctx.restore(); return ret;
}
