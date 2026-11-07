// =====================================================================================
// BLAD IN DOORSNEDE — als blokje uit het blad gesneden (ruimtelijk: bovenkant, snijvlak vóór en rechts).
// Recept (boven → onder): cuticula – bovenopperhuid (doorzichtig) – palissadeweefsel (lange cellen, veel bladgroen) –
// sponsweefsel (losse cellen, luchtholtes) met de nerf (hout boven, bast onder) die dóór het blokje loopt –
// onderopperhuid met huidmondjes (twee sluitcellen rond een spleet; aan de onderkant zitten er de meeste).
// Gaswisseling: open huidmondjes laten CO2 binnen en O2 en waterdamp naar buiten; dicht = spleet dicht.
// Bron: LibreTexts Botany Lab Manual 9.3.
// Bekende fouten: huidmondjes op de bovenkant; nerf die in het snijvlak ophoudt; palissade en spons omgedraaid.
// Ontwerp: blokje ± 700 breed × 470 hoog, oorsprong = midden. Aanpak C (ronde 2, uit B): ondiep blokje zodat het
// snijvlak groot en rustig is; duidelijke cuticula-lijn boven en onder; onderkant schuin met huidmondjes van onderen;
// in het snijvlak twee volledige sluitcellen (met bladgroen) rond een zichtbaar open spleet met een luchtholte erboven;
// CO2 (grijs, drie bolletjes op een rij) gaat naar binnen, O2 (teal, twee bolletjes) naar buiten.
// o: a, t, open (0..1), gas (0..1), hi ('palissade','spons','nerf','huidmondje','opperhuid')
// =====================================================================================
function bladDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, open = 1, gas = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const BX = -330, BW = 560, TOP = -170, BOT = 150, DX = 110, DY = -64; // voorvlak + diepte-vector
  const anker = { palissade: W(BX + 40, -90), spons: W(BX + 40, 40), nerf: W(BX + 280, 20), huidmondje: W(BX + 120, BOT + 60), opperhuid: W(BX + 40, TOP + 10), bovenkant: W(BX + 200, TOP - 50) };
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
  poly(top, BLAD, BLADd); ctx.strokeStyle = rgba('#E8E1C4', 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(BX + 280, TOP); ctx.lineTo(BX + 280 + DX, TOP + DY); ctx.stroke(); // nerf aan de bovenkant
  ctx.strokeStyle = rgba('#E8E1C4', 0.3); ctx.lineWidth = 2; for (const f of [0.3, 0.65]) { const bx = BX + 280 + DX * f, by = TOP + DY * f; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + sd * 120, by - 6, bx + sd * 250, by - 26 + (sd > 0 ? 0 : 20)); ctx.stroke(); } }
  // rechterzijvlak
  const zij = [[BX + BW, TOP], [BX + BW + DX, TOP + DY], [BX + BW + DX, BOT + DY], [BX + BW, BOT]];
  poly(zij, '#7FA868', CELr);
  const laagZ = (y0, y1, col) => poly([[BX + BW, y0], [BX + BW + DX, y0 + DY], [BX + BW + DX, y1 + DY], [BX + BW, y1]], col);
  laagZ(TOP, TOP + 14, HUID); laagZ(TOP + 14, TOP + 110, '#9CC487'); laagZ(TOP + 110, BOT - 14, '#B6D5A2'); laagZ(BOT - 14, BOT, HUID);
  ctx.save(); ctx.globalAlpha *= dimF('nerf'); ctx.fillStyle = '#D6CFA8'; ctx.beginPath(); ctx.ellipse(BX + BW + DX * 0.5, 22 + DY * 0.5, 14, 30, -0.55, 0, 6.283); ctx.fill(); ctx.restore();
  // voorvlak: de echte doorsnede
  ctx.save(); ctx.beginPath(); ctx.rect(BX, TOP, BW, BOT - TOP); ctx.clip(); ctx.fillStyle = C.bgMicro; ctx.fillRect(BX, TOP, BW, BOT - TOP);
  ctx.save(); ctx.globalAlpha *= dimF('opperhuid'); for (let i = 0; i < 14; i++) poly([[BX + i * 40 + 1, TOP + 2], [BX + i * 40 + 39, TOP + 2], [BX + i * 40 + 39, TOP + 14], [BX + i * 40 + 1, TOP + 14]], HUID, '#A9BC94'); ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('palissade'); for (let i = 0; i < 25; i++) { const x0 = BX + i * 23 + 1; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, TOP + 16, 21, 100, 8) : ctx.rect(x0, TOP + 16, 21, 100); ctx.fillStyle = CEL; ctx.fill(); ctx.strokeStyle = hi === 'palissade' ? C.goud : CELr; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = BGK; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(x0 + (k % 2 ? 15 : 6), TOP + 26 + k * 13.5, 3.6, 2.6, 0, 0, 6.283); ctx.fill(); } } ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('spons'); for (let i = 0; i < 60; i++) { const cx = BX + 14 + (i % 12) * 46 + (Math.floor(i / 12) % 2) * 22 + (hash(i) - 0.5) * 10, cy = TOP + 138 + Math.floor(i / 12) * 32 + (hash(i + 5) - 0.5) * 8; if (cy > BOT - 46) continue; if (Math.abs(cx - (BX + 280)) < 50 && cy < BOT - 30) continue; if ([BX + 130, BX + 440].some(h => Math.abs(cx - h) < 36 && cy > BOT - 80)) continue;
    ctx.beginPath(); ctx.ellipse(cx, cy, 15 + hash(i * 2) * 4, 11 + hash(i * 3) * 3, hash(i) * 2, 0, 6.283); ctx.fillStyle = CEL; ctx.fill(); ctx.strokeStyle = hi === 'spons' ? C.goud : CELr; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = BGK; ctx.beginPath(); ctx.arc(cx - 4, cy, 2.6, 0, 6.283); ctx.arc(cx + 5, cy + 2, 2.6, 0, 6.283); ctx.fill(); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= dimF('nerf'); ctx.beginPath(); ctx.ellipse(BX + 280, 20, 44, 62, 0, 0, 6.283); ctx.fillStyle = '#D6CFA8'; ctx.fill(); ctx.strokeStyle = hi === 'nerf' ? C.goud : '#A89C6A'; ctx.lineWidth = 2; ctx.stroke();
  for (const [vx, vy] of [[-14, -2], [6, -10], [16, 6], [-4, 12]]) { ctx.beginPath(); ctx.arc(BX + 280 + vx, 20 + vy - 10, 8, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.55); ctx.fill(); ctx.strokeStyle = '#6E8FA6'; ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.fillStyle = rgba(C.oker, 0.6); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(BX + 262 + k * 9, 52, 5, 0, 6.283); ctx.fill(); } ctx.restore();
  const HMX = [BX + 130, BX + 440]; for (let i = 0; i < 14; i++) { const x0 = BX + i * 40; if (HMX.some(h => x0 + 40 > h - 34 && x0 < h + 34)) continue; poly([[x0 + 1, BOT - 26], [x0 + 39, BOT - 26], [x0 + 39, BOT - 3], [x0 + 1, BOT - 3]], HUID, '#A9BC94'); }
  HMX.forEach(hx => { const sp = lerp(0.5, 11, open); ctx.save(); ctx.globalAlpha *= dimF('huidmondje');
    ctx.fillStyle = C.bgMicro; ctx.beginPath(); ctx.ellipse(hx, BOT - 46, 40, 26, 0, 0, 6.283); ctx.fill(); // luchtholte boven het huidmondje
    for (const sd of [-1, 1]) { const gx = hx + sd * (19 + sp); ctx.beginPath(); ctx.ellipse(gx, BOT - 15, 19, 15, 0, 0, 6.283); ctx.fillStyle = hi === 'huidmondje' ? C.goud : CEL; ctx.fill(); ctx.strokeStyle = CELr; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = '#5E8A50'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(gx, BOT - 15, 18, sd < 0 ? -0.9 : 2.24, sd < 0 ? 0.9 : 4.04); ctx.stroke(); // dikke binnenwand aan de spleet
      ctx.fillStyle = BGK; for (const [kx, ky] of [[-4, -3], [4, 2], [-1, 5]]) { ctx.beginPath(); ctx.ellipse(gx + kx * 1.3, BOT - 15 + ky * 1.3, 3.6, 2.6, 0.4, 0, 6.283); ctx.fill(); } }
    ctx.fillStyle = C.bgMicro; ctx.fillRect(hx - sp, BOT - 30, 2 * sp, 32); // de spleet
    ctx.restore(); });
  ctx.fillStyle = '#E8D9A0'; ctx.fillRect(BX, TOP, BW, 5); ctx.fillRect(BX, BOT - 3, BW, 3); for (const hx of HMX) { const sp = lerp(0.5, 11, open); ctx.fillStyle = C.bgMicro; ctx.fillRect(hx - sp, BOT - 4, 2 * sp, 5); } // cuticula (dun waslaagje), open bij de spleet
  ctx.restore();
  ctx.strokeStyle = CELr; ctx.lineWidth = 2; ctx.strokeRect(BX, TOP, BW, BOT - TOP);
  // gassen door de open huidmondjes: CO2 (grijs, O=C=O) naar binnen, O2 (teal, O=O) naar buiten
  if (gas > 0.01 && open > 0.2) { ctx.save(); ctx.globalAlpha *= gas * open;
    const co2 = (px, py) => { ctx.fillStyle = '#7E8794'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 9, py, 4.6, 0, 6.283); ctx.fill(); } ctx.fillStyle = '#C3C9D2'; ctx.beginPath(); ctx.arc(px, py, 5.4, 0, 6.283); ctx.fill(); };
    const o2 = (px, py) => { ctx.fillStyle = C.teal; ctx.strokeStyle = lighten(C.teal, 0.4); ctx.lineWidth = 1.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(px + sd * 4.6, py, 5.2, 0, 6.283); ctx.fill(); ctx.stroke(); } };
    HMX.forEach((hx, j) => { for (let k = 0; k < 6; k++) { const u = (t * 0.25 + k / 6 + j * 0.37) % 1; const al = Math.min(1, u * 5, (1 - u) * 5); ctx.save(); ctx.globalAlpha *= al;
      if (k % 2 === 0) { const p = bioPunt([[hx - 30 + hash(k) * 20, BOT + 120], [hx - 2, BOT + 10], [hx, BOT - 46], [hx + (hash(k + 3) - 0.5) * 160, TOP + 130]], u); co2(p[0], p[1]); }
      else { const p = bioPunt([[hx + (hash(k + 5) - 0.5) * 160, TOP + 130], [hx, BOT - 46], [hx + 2, BOT + 10], [hx + 30 - hash(k) * 20, BOT + 120]], u); o2(p[0], p[1]); }
      ctx.restore(); } }); ctx.restore(); }
  ctx.restore(); return anker;
}
