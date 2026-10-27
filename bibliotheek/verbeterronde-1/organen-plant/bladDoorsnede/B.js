// =====================================================================================
// BLAD IN DOORSNEDE — als blokje uit het blad gesneden (ruimtelijk: bovenkant, snijvlak vóór en rechts).
// Recept (boven → onder): cuticula – bovenopperhuid (doorzichtig) – palissadeweefsel (lange cellen, veel bladgroen) –
// sponsweefsel (losse cellen, luchtholtes) met de nerf (hout boven, bast onder) die dóór het blokje loopt –
// onderopperhuid met huidmondjes (twee sluitcellen rond een spleet; aan de onderkant zitten er de meeste).
// Gaswisseling: open huidmondjes laten CO2 binnen en O2 en waterdamp naar buiten; dicht = spleet dicht.
// Bron: LibreTexts Botany Lab Manual 9.3.
// Bekende fouten: huidmondjes op de bovenkant; nerf die in het snijvlak ophoudt; palissade en spons omgedraaid.
// Ontwerp: blokje ± 680 breed × 480 hoog (inclusief diepte), oorsprong = midden. Aanpak B: doorsnede-3D (blokje), lagen als
// banden met cellen erin, onderkant schuin zichtbaar met huidmondjes van onderen; open pijlen voor de gassen.
// o: a, t, open (0..1), gas (0..1), hi ('palissade','spons','nerf','huidmondje','opperhuid')
// =====================================================================================
function bladDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, open = 1, gas = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const BX = -300, BW = 460, TOP = -150, BOT = 120, DX = 170, DY = -110; // voorvlak + diepte-vector
  const anker = { palissade: W(BX + 40, -90), spons: W(BX + 40, 40), nerf: W(BX + 230, 20), huidmondje: W(BX + 120, BOT + 60), opperhuid: W(BX + 40, TOP + 10), bovenkant: W(BX + 200, TOP - 50) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const CEL = '#B9D6A0', CELr = '#7FA868', HUID = '#DDE8CF', BGK = '#4F8F5A', BLAD = '#6FA866', BLADd = '#5A8E54';
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  const poly = (pts, fill, stroke, lw = 1.5) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } };
  // onderkant (schuin gezien, van onderen: huidmondjes als kleine 'oogjes') — getekend als smalle strook onder het voorvlak
  const ond = [[BX, BOT], [BX + BW, BOT], [BX + BW + DX * 0.35, BOT + 70], [BX + DX * 0.35, BOT + 70]];
  poly(ond, '#8DBB7E', CELr); ctx.save(); ctx.beginPath(); ond.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.clip();
  ctx.globalAlpha *= dimF('huidmondje'); for (let i = 0; i < 14; i++) { const u = (i % 7) / 7 + 0.06, v = Math.floor(i / 7) * 0.5 + 0.25; const px = BX + u * BW + v * DX * 0.35, py = BOT + v * 70; const sp = lerp(0.5, 3, open);
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + sd * (5 + sp), py, 6, 9, 0, 0, 6.283); ctx.fillStyle = hi === 'huidmondje' ? C.goud : CEL; ctx.fill(); } ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.ellipse(px, py, sp, 7, 0, 0, 6.283); ctx.fill(); } ctx.restore();
  // bovenkant (schuin van boven)
  const top = [[BX, TOP], [BX + DX, TOP + DY], [BX + BW + DX, TOP + DY], [BX + BW, TOP]];
  poly(top, BLAD, BLADd); ctx.strokeStyle = rgba('#E8E1C4', 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(BX + 230, TOP); ctx.lineTo(BX + 230 + DX, TOP + DY); ctx.stroke(); // nerf aan de bovenkant
  ctx.fillStyle = rgba('#FFFFFF', 0.08); poly(top, rgba('#FFFFFF', 0.06));
  // rechterzijvlak
  const zij = [[BX + BW, TOP], [BX + BW + DX, TOP + DY], [BX + BW + DX, BOT + DY], [BX + BW, BOT]];
  poly(zij, '#7FA868', CELr);
  const laagZ = (y0, y1, col) => poly([[BX + BW, y0], [BX + BW + DX, y0 + DY], [BX + BW + DX, y1 + DY], [BX + BW, y1]], col);
  laagZ(TOP, TOP + 14, HUID); laagZ(TOP + 14, TOP + 110, '#9CC487'); laagZ(TOP + 110, BOT - 14, '#B6D5A2'); laagZ(BOT - 14, BOT, HUID);
  ctx.save(); ctx.globalAlpha *= dimF('nerf'); ctx.fillStyle = '#D6CFA8'; ctx.beginPath(); ctx.ellipse(BX + BW + DX * 0.5, 22 + DY * 0.5, 14, 30, -0.55, 0, 6.283); ctx.fill(); ctx.restore();
  // voorvlak: de echte doorsnede
  ctx.save(); ctx.beginPath(); ctx.rect(BX, TOP, BW, BOT - TOP); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(BX, TOP, BW, BOT - TOP);
  ctx.save(); ctx.globalAlpha *= dimF('opperhuid'); for (let i = 0; i < 12; i++) poly([[BX + i * 40 + 1, TOP + 2], [BX + i * 40 + 39, TOP + 2], [BX + i * 40 + 39, TOP + 14], [BX + i * 40 + 1, TOP + 14]], HUID, '#A9BC94'); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('palissade'); for (let i = 0; i < 20; i++) { const x0 = BX + i * 23 + 1; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, TOP + 16, 21, 92, 8) : ctx.rect(x0, TOP + 16, 21, 92); ctx.fillStyle = CEL; ctx.fill(); ctx.strokeStyle = hi === 'palissade' ? C.goud : CELr; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = BGK; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(x0 + (k % 2 ? 15 : 6), TOP + 26 + k * 14, 3.6, 2.6, 0, 0, 6.283); ctx.fill(); } } ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('spons'); for (let i = 0; i < 40; i++) { const cx = BX + 14 + (i % 10) * 46 + (Math.floor(i / 10) % 2) * 22 + (hash(i) - 0.5) * 10, cy = TOP + 128 + Math.floor(i / 10) * 32 + (hash(i + 5) - 0.5) * 8; if (Math.abs(cx - (BX + 230)) < 48 && cy < BOT - 30) continue;
    ctx.beginPath(); ctx.ellipse(cx, cy, 15 + hash(i * 2) * 4, 11 + hash(i * 3) * 3, hash(i) * 2, 0, 6.283); ctx.fillStyle = CEL; ctx.fill(); ctx.strokeStyle = hi === 'spons' ? C.goud : CELr; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = BGK; ctx.beginPath(); ctx.arc(cx - 4, cy, 2.6, 0, 6.283); ctx.arc(cx + 5, cy + 2, 2.6, 0, 6.283); ctx.fill(); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('nerf'); ctx.beginPath(); ctx.ellipse(BX + 230, 20, 44, 62, 0, 0, 6.283); ctx.fillStyle = '#D6CFA8'; ctx.fill(); ctx.strokeStyle = hi === 'nerf' ? C.goud : '#A89C6A'; ctx.lineWidth = 2; ctx.stroke();
  for (const [vx, vy] of [[-14, -2], [6, -10], [16, 6], [-4, 12]]) { ctx.beginPath(); ctx.arc(BX + 230 + vx, 20 + vy - 10, 8, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.55); ctx.fill(); ctx.strokeStyle = '#6E8FA6'; ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.fillStyle = rgba(C.oker, 0.6); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(BX + 212 + k * 9, 52, 5, 0, 6.283); ctx.fill(); } ctx.restore();
  const HMX = [BX + 120, BX + 360]; for (let i = 0; i < 12; i++) { const x0 = BX + i * 40; if (HMX.some(h => x0 + 40 > h - 22 && x0 < h + 22)) continue; poly([[x0 + 1, BOT - 14], [x0 + 39, BOT - 14], [x0 + 39, BOT - 2], [x0 + 1, BOT - 2]], HUID, '#A9BC94'); }
  HMX.forEach(hx => { const sp = lerp(1, 7, open); ctx.save(); ctx.globalAlpha *= dimF('huidmondje'); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + sd * (10 + sp), BOT - 8, 10, 10, 0, 0, 6.283); ctx.fillStyle = hi === 'huidmondje' ? C.goud : CEL; ctx.fill(); ctx.strokeStyle = CELr; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); });
  ctx.fillStyle = rgba('#E8D9A0', 0.85); ctx.fillRect(BX, TOP, BW, 3); ctx.fillRect(BX, BOT - 2, BW, 2);
  ctx.restore();
  ctx.strokeStyle = CELr; ctx.lineWidth = 2; ctx.strokeRect(BX, TOP, BW, BOT - TOP);
  // gassen door de huidmondjes: open pijlen
  if (gas > 0.01 && open > 0.2) { ctx.save(); ctx.globalAlpha *= gas * open; const pijl = (x1, y1, x2, y2, col) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2 - Math.cos(an - 0.5) * 14, y2 - Math.sin(an - 0.5) * 14); ctx.lineTo(x2, y2); ctx.lineTo(x2 - Math.cos(an + 0.5) * 14, y2 - Math.sin(an + 0.5) * 14); ctx.stroke(); };
    const p = 6 * Math.sin(t * 2.5); HMX.forEach(hx => { pijl(hx - 12, BOT + 110 + p, hx - 6, BOT - 30 + p, '#AEB6C2'); pijl(hx + 6, BOT - 30 - p, hx + 14, BOT + 110 - p, C.teal); }); ctx.restore(); }
  ctx.restore(); return anker;
}
