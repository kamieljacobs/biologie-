// [variant C = A + gespreide poten bij liggen/kruipen, meer onder het lijf bij de high walk, hogere (zijdelings platte) staart]
// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, snuit
// lang maar met dikte (bovenkaak een eigen vlak, taps naar de punt) en een neusgatbult op de punt; ogen en neus hoog op de
// kop (kan onder water liggen met alleen die erboven); in een gesloten bek steken onder- en bovententanden zichtbaar
// langs elkaar (4e ondertand past in een inkeping); rugschilden (osteodermen) in rijen met kammen; staart ± de helft van
// de lengte, zijdelings plat (hoog en smal van opzij) met dubbele kam die verderop enkel wordt; poten kort en zijwaarts,
// achterpoten groter, met knie/elleboog en tenen (voor 5, achter 4 met zwemvlies). Bron: foto's nijlkrokodil.
// Bekende fout: draak; snuit als dunne lijn; poten als klodders.
// o.t (s): staart zwiept langzaam; o.houding 'lopen' (o.t 0–1: diagonale poten samen, 'high walk' met lijf iets omhoog).
// Let op: lib_dieren.js heeft ook een krokodil-uitknippop (`krokodil`); deze vlakke versie is voor films zonder lib_dieren.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const loopt = o.houding === 'lopen', ph = ((t % 1) + 1) % 1; const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.15);
  const zw = loopt ? Math.sin(ph * 6.283) * 5 : Math.sin(t * 1.1) * 4; const til = loopt ? -14 : 12; ctx.translate(0, til); // liggen/kruipen: buik op de grond (til +12); high walk: lijf omhoog
  // poot: dij/opperarm schuin naar buiten-onder, knie, onderbeen naar de grond, voet met tenen
  const poot = (hx, hy, L, f, ver, achter) => { const c = ver ? _bioDonker(kleur, 0.45) : donker; const sw = loopt ? Math.sin((ph + f) * 6.283) * 18 : 0; const lift = loopt ? Math.max(0, Math.sin((ph + f) * 6.283 + 1.57)) * 8 : 0;
    // gespreid (liggen/kruipen): opperarm/dij wijst zijwaarts naar de kijker en is dus kort in beeld, elleboog/knie op
    // buikhoogte naast het lijf, onderbeen omlaag; high walk: dij/opperarm meer onder het lijf (geadduceerd), knie lager.
    const K = loopt ? [hx + (achter ? -L * 0.3 : L * 0.22) + sw * 0.4, hy + L * 0.6 - lift * 0.4] : [hx + (achter ? -L * 0.42 : L * 0.36), hy + L * 0.08],
      F = loopt ? [hx + (achter ? -L * 0.05 : L * 0.15) + sw, 44 - til - lift] : [hx + (achter ? -L * 0.62 : L * 0.55), 44 - til];
    ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineWidth = L * 0.42; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(K[0], K[1]); ctx.stroke(); ctx.lineWidth = L * 0.3; ctx.beginPath(); ctx.moveTo(K[0], K[1]); ctx.lineTo(F[0], F[1]); ctx.stroke();
    ctx.lineWidth = 3.4; const n = achter ? 4 : 5; for (let k = 0; k < n; k++) { ctx.beginPath(); ctx.moveTo(F[0], F[1]); ctx.lineTo(F[0] + (achter ? 8 : 6) + k * (achter ? 6 : 4.5), F[1] + 2 + (k % 2)); ctx.stroke(); }
    if (achter) { ctx.fillStyle = rgba(c, 0.8); ctx.beginPath(); ctx.moveTo(F[0], F[1]); ctx.lineTo(F[0] + 26, F[1] + 2); ctx.lineTo(F[0] + 8, F[1] + 3); ctx.fill(); } };
  poot(-60, 14, 46, 0.5, true, true); poot(82, 12, 36, 0, true, false);
  const lijf = [[-282, 0 + zw], [-200, -16 + zw * 0.6], [-110, -24], [-30, -30], [60, -28], [120, -24], [150, -28], [176, -30], [200, -22], [240, -18], [282, -16], [298, -12], [304, -4], [292, 4], [232, 6], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 26], [-220, 16 + zw * 0.6]];
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 18, 470, 30); ctx.beginPath(); bioPad(ctx, [[170, 14], [232, 6], [292, 4], [300, 6], [300, 20], [170, 30]], true); ctx.fill(); // lichte keel/onderkaak
  ctx.fillStyle = licht; ctx.beginPath(); bioPad(ctx, [[176, -30], [240, -19], [298, -13], [304, -6], [240, -9], [180, -14]], true); ctx.fill(); // bovenkaak als eigen vlak (dikte)
  ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); } // schildrijen
  ctx.strokeStyle = rgba(donker, 0.5); ctx.lineWidth = 1.5; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-200 + i * 26, -6); ctx.lineTo(-188 + i * 26, -6); ctx.stroke(); }
  ctx.restore();
  // kammen: dubbele rij op romp en eerste staarthelft (twee tinten, iets verspringend), daarna één rij
  const kamTop = px => px < -120 ? -12 + (px + 250) * 0.07 + zw * Math.max(0, (-px - 120) / 160) * 0.6 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06);
  for (let i = 0; i < 24; i++) { const px = -262 + i * 16; if (px > 140) break; const top = kamTop(px); const h = px < -100 ? 13 : 8; const dubbel = px > -190;
    if (dubbel) { ctx.fillStyle = _bioDonker(kleur, 0.45); ctx.beginPath(); ctx.moveTo(px + 2, top + 2); ctx.lineTo(px + 7, top - h + 2); ctx.lineTo(px + 12, top + 2); ctx.fill(); }
    ctx.fillStyle = donker; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 7], [222, 6], [240, 5], [258, 4], [276, 3], [290, 2]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(tx - 3, ty); ctx.lineTo(tx, ty + (i % 2 ? -8 : 9)); ctx.lineTo(tx + 3, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(168, 9); ctx.quadraticCurveTo(240, 6, 300, 0); ctx.stroke(); // bekspleet
  ctx.beginPath(); ctx.ellipse(160, -31, 13, 9, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 160, -31, 6, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(159, -36, 2, 10); // oog hoog op de kop
  ctx.beginPath(); ctx.ellipse(292, -15, 9, 6, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 294, -17, 2.8, '#1A1410'); // neusgatbult
  poot(-50, 16, 50, 0, false, true); poot(96, 14, 38, 0.5, false, false);
  ctx.restore();
}
