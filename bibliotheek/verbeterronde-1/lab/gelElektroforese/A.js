// =====================================================================================
// GELELEKTROFORESE, bovenaanzicht van een gelbak (schema), op ware maat.
// Recept (OpenStax Biology 2e § 17.1): DNA is negatief geladen en loopt in een elektrisch veld van de min- naar de
//  pluspool; kleine stukken bewegen sneller door de poriën van de agarosegel dan grote, dus korte stukken komen
//  verder. Afstand ≈ evenredig met −log(lengte) (lineair op een log-schaal); een markerladder met bekende lengtes
//  loopt in het eerste laantje. DNA zelf is onzichtbaar: tijdens het lopen zie je alleen de laadkleurstof (paars
//  front vóór de kleinste stukken); de banden worden pas zichtbaar na kleuren (onder UV oranje/wit oplichtend).
//  Maten (≈, gangbare minigel): bak ± 25 × 12 cm, gel ± 7 × 10 cm, ± 0,5 cm dik; putjes 5 mm breed, 1 mm diep in
//  de gel, ± 8 mm uit elkaar; buffer staat net boven de gel; elektroden = platinadraad langs de korte kanten,
//  zwarte kabel = min (bij de putjes), rode kabel = plus.
//  Bekende fouten: DNA loopt naar de min; grote stukken het verst; banden even dik en scherp als streepjes van
//  een barcode al vóór het kleuren; putjes aan de pluskant.
// x, y = midden van de gel; s = px per mm. o.loop 0..1 (hoe ver gelopen), o.kleur 0..1 (gekleurd/UV), o.laantjes
// (lijst; elk een lijst lengtes in bp; het eerste = marker), o.stroom (bool: belletjes bij de elektroden), o.t, o.a.
// Geeft { putjes:[[x,y]…], min, plus, banden:[[[x,y,bp]…]…] } terug.
// =====================================================================================
function gelElektroforese(ctx, x, y, s, o = {}) {
  const { a = 1, loop = 0.7, kleur = 0, stroom = true, t = 0 } = o;
  const lanes = o.laantjes || [[10000, 6000, 4000, 3000, 2000, 1500, 1000, 700, 500, 300], [3000, 1200, 400], [3000, 800, 400], [5000, 1200], [3000, 1200, 400], [2000, 800]];
  const gw = 70, gh = 100, bw = 120, bh = 250, n = lanes.length, pitch = Math.min(9, (gw - 8) / n), putY = -gh / 2 + 10;
  const loopMax = 72, logMin = Math.log10(200), logMax = Math.log10(12000);
  const afst = (bp) => clamp((logMax - Math.log10(bp)) / (logMax - logMin), 0, 1.05) * loopMax * loop;
  const P = (px, py) => [x + px * s, y + py * s];
  const lx = (i) => -((n - 1) / 2) * pitch + i * pitch;
  const ret = { putjes: lanes.map((_, i) => P(lx(i), putY)), min: P(0, -bh / 2 + 6), plus: P(0, bh / 2 - 6), banden: lanes.map((L, i) => L.map(bp => [...P(lx(i), putY + afst(bp)), bp])) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.3) / s;
  // bak met buffer
  roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 6); shape(ctx, rgba(C.er, 0.10), C.er, lw * 1.5);
  roundRect(ctx, -bw / 2 + 4, -bh / 2 + 4, bw - 8, bh - 8, 4); ctx.fillStyle = rgba(C.teal, 0.14); ctx.fill();
  // elektroden + kabels
  for (const [yy, kl, tk] of [[-bh / 2 + 10, '#2B2F38', '−'], [bh / 2 - 10, C.koraal, '+']]) {
    ctx.strokeStyle = '#C8D0DA'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(-bw / 2 + 10, yy); ctx.lineTo(bw / 2 - 10, yy); ctx.stroke();
    ctx.strokeStyle = kl; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(bw / 2 - 10, yy); ctx.quadraticCurveTo(bw / 2 + 25, yy, bw / 2 + 30, yy + (yy < 0 ? -30 : 30)); ctx.stroke();
    if (kl === '#2B2F38') { ctx.strokeStyle = '#7A8BA8'; ctx.lineWidth = 0.6; ctx.stroke(); }
    if (s > 1.2) text(ctx, tk, bw / 2 - 2, yy - 3, fTekst(16, 700), kl === C.koraal ? C.koraal : C.text, 'right');
    if (stroom && s > 1.2) for (let k = 0; k < 14; k++) { const bx = -bw / 2 + 12 + k * 7 + hash(k) * 3, by = yy - 1 - ((t * 6 + hash(k + 3) * 6) % 6); ctx.strokeStyle = rgba('#FFFFFF', 0.45); ctx.lineWidth = 0.3; ctx.beginPath(); ctx.arc(bx, by, yy < 0 ? 0.9 : 0.6, 0, 6.283); ctx.stroke(); } } // aan de min ontstaat twee keer zoveel gas (H₂) als aan de plus (O₂)
  // gel met putjes
  ctx.beginPath(); ctx.rect(-gw / 2, -gh / 2, gw, gh); shape(ctx, rgba('#E8E4D8', 0.16), rgba('#E8E4D8', 0.5), lw);
  lanes.forEach((_, i) => { ctx.beginPath(); ctx.rect(lx(i) - 2.5, putY - 0.6, 5, 1.2); ctx.fillStyle = '#121A26'; ctx.fill(); });
  // laadkleurstof (vóór het kleuren goed zichtbaar) en banden
  lanes.forEach((L, i) => { const xx = lx(i);
    const front = afst(150); ctx.fillStyle = rgba(C.paars, 0.55 * (1 - kleur * 0.6)); ctx.fillRect(xx - 2.4, putY + front - 0.7, 4.8, 1.4);
    if (kleur > 0.01) L.forEach((bp, j) => { const yy = putY + afst(bp); const dik = 0.9 + 0.5 * (i === 0 && (bp === 3000 || bp === 1000) ? 1 : 0); ctx.fillStyle = rgba('#FFD9A0', kleur * (i === 0 ? 0.8 : 0.95)); roundRect(ctx, xx - 2.4, yy - dik / 2, 4.8, dik, dik / 2); ctx.fill(); }); });
  ctx.restore(); return ret;
}
