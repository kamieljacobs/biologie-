
// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
// Herstel 28 okt 2026 (keuze 'gelijk'): de kop was ± 27 % van de totale lengte; kop (snuitpunt tot achter de schedel)
// is ± 1/7 van de totale lengte (gemiddeld 1:7, bij grote dieren tot 1:8–9; Whitaker & Whitaker 2008 via Journal of
// Threatened Taxa 13(8), 2021; Sanctuary Nature Foundation 'Size matters'). Alles vóór x = 140 (achter het oog) wordt
// in de lengte samengedrukt (KX = 0,38; kop nu ± 15 % van de lengte) en het dier schuift 50 px op, zodat het midden op dezelfde plek blijft. Rest gelijk.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.translate(50, 0);
  const KX = 0.38, X = (px) => (px <= 140 ? px : 140 + (px - 140) * KX); // kop ± 1/7 van de lengte
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]].map(([px, py]) => [X(px), py]);
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [246, 4], [284, 1]].forEach(([tx, ty], i) => { tx = X(tx); ctx.beginPath(); ctx.moveTo(tx - 2.5, ty); ctx.lineTo(tx, ty + (i % 2 ? -7 : 8)); ctx.lineTo(tx + 2.5, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(170), 8); ctx.quadraticCurveTo(X(240), 6, X(298), -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(X(160), -30, 11, 8, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, X(160), -30, 5.5, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(X(160) - 1, -35, 2, 10);
  _bioCirc(ctx, X(292), -14, 3.5, '#1A1410');
  ctx.restore();
}
