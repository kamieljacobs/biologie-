// =====================================================================================
// THERMOCYCLER (PCR-apparaat), schuin van voren en boven, op ware maat, met deksel, blok en display.
// Recept: een thermocycler verwarmt en koelt een metalen blok met gaatjes voor 0,2 ml-buisjes, steeds in drie
//  stappen: ± 95 °C (strengen los), 50–65 °C (primers binden; vaak ± 55) en 72 °C (Taq-polymerase bouwt), 25–35 keer
//  (bronnen: OpenStax Biology 2e § 17.1; PCR-collegeslides KSU). Het blok is een 96-wells raster van 12 × 8 gaten,
//  9 mm hart-op-hart (± 108 × 72 mm); een verwarmd deksel drukt de buisjes dicht. Apparaat ± 25 cm breed,
//  ± 40 cm diep, ± 20 cm hoog (≈, productfoto's van gangbare tafelmodellen). Display met temperatuur en cyclus,
//  statuslampje: koraal = verwarmen, teal = koelen, groen = klaar.
//  Bekende fouten: apparaat zo groot als een koelkast of zo klein als een broodrooster met één buisje;
//  temperatuurvolgorde 55 → 95 → 72; geen deksel.
// x, y = linksonder op de voorkant; s = px per mm. o.open 0..1 (deksel omhoog), o.temp (°C op het display),
// o.cyclus, o.van (aantal cycli), o.stap ('op' | 'af' | 'klaar' | null), o.buisjes (aantal in de eerste rij), o.a.
// Geeft { display, blok, deksel, lamp } terug.
// =====================================================================================
function thermocycler(ctx, x, y, s, o = {}) {
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
