// =====================================================================================
// GEWRICHT IN DOORSNEDE (schouder, kogelgewricht; van voren in een frontale snede). Recept (OpenStax A&P 9.4):
// gewrichtskop en -kom bekleed met kraakbeen (glad, zonder bloedvaten), gewrichtsholte met een dun laagje gewrichtssmeer,
// gewrichtskapsel als mouw van bindweefsel van bot naar bot, gewrichtsbanden als verdikkingen buiten het kapsel.
// Bekende fouten: kraakbeen als losse schijf; holte als grote lege ruimte; kapsel dat niet aan het bot vastzit.
// draai = hoek van het opperarmbeen (rad), hl = { kop, kom, kraakbeen, kapsel, smeer, banden }.
// =====================================================================================
function gewrichtDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, draai = 0, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.3 + 0.7 * (hl[k] == null ? 1 : hl[k]);
  const R = 2.4 * s, gap = 0.07 * R, kb = 0.1 * R, cup = 0.95; // straal kop (± 2,4 cm), spleet, kraakbeendikte, halve openingshoek kom
  const spons = (cx, cy, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = hash(i + seed) * 6.283, rr = Math.sqrt(hash(i * 3 + seed)); circ(ctx, cx + Math.cos(an) * rr * rx, cy + Math.sin(an) * rr * ry, 1.4 + hash(i + 7 + seed) * 2.6, rgba(Z9.botS, 0.55)); } };
  // schouderblad met kom (links)
  const r2 = R + gap + kb; ctx.save(); ctx.globalAlpha *= L('kom');
  ctx.beginPath(); ctx.moveTo(Math.cos(Math.PI - cup) * r2 - 0.25 * R, -Math.sin(Math.PI - cup) * r2 - 0.25 * R); ctx.lineTo(-2.6 * R, -1.6 * R); ctx.lineTo(-2.9 * R, 1.9 * R); ctx.lineTo(Math.cos(Math.PI + cup) * r2 - 0.25 * R, -Math.sin(Math.PI + cup) * r2 + 0.25 * R);
  ctx.lineTo(Math.cos(Math.PI + cup) * r2, -Math.sin(Math.PI + cup) * r2); ctx.arc(0, 0, r2, Math.PI - cup, Math.PI + cup, false); ctx.closePath(); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.save(); ctx.clip(); spons(-1.9 * R, 0, 0.9 * R, 1.5 * R, 90, 3); ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R + gap + kb, Math.PI - cup, Math.PI + cup, false); ctx.arc(0, 0, R + gap, Math.PI + cup, Math.PI - cup, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // gewrichtssmeer: dun laagje in de spleet, met twee zakjes binnen het kapsel
  ctx.save(); ctx.globalAlpha *= L('smeer'); ctx.beginPath(); ctx.arc(0, 0, R + gap, Math.PI - cup - 0.15, Math.PI + cup + 0.15, false); ctx.arc(0, 0, R, Math.PI + cup + 0.15, Math.PI - cup - 0.15, true); ctx.closePath(); ctx.fillStyle = rgba(Z9.smeer, 0.9); ctx.fill();
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-0.42 * R, sg * 1.02 * R, 0.3 * R, 0.1 * R, sg * 0.5, 0, 6.283); ctx.fillStyle = rgba(Z9.smeer, 0.75); ctx.fill(); } ctx.restore();
  // opperarmbeen: kop + hals + schacht, draait om het middelpunt van de kop
  ctx.save(); ctx.rotate(draai); ctx.globalAlpha *= L('kop'); const sa = 1.05, sw = 0.55 * R; // schachtrichting (rad onder de horizontaal), halve breedte
  const ux = Math.cos(sa), uy = Math.sin(sa), nx = -uy, ny = ux, b0 = [0.35 * R * ux, 0.35 * R * uy], b1 = [b0[0] + 3.6 * R * ux, b0[1] + 3.6 * R * uy];
  const hum = () => { ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.moveTo(b0[0] - nx * sw * 1.45, b0[1] - ny * sw * 1.45); ctx.lineTo(b1[0] - nx * sw, b1[1] - ny * sw); ctx.lineTo(b1[0] + nx * sw, b1[1] + ny * sw); ctx.lineTo(b0[0] + nx * sw * 1.7, b0[1] + ny * sw * 1.7); ctx.closePath(); };
  hum(); ctx.strokeStyle = Z9.botS; ctx.lineWidth = 3; ctx.stroke(); hum(); ctx.fillStyle = Z9.bot; ctx.fill('nonzero');
  hum(); ctx.save(); ctx.clip(); spons(0.15 * R, 0.15 * R, 0.85 * R, 0.85 * R, 110, 9); ctx.beginPath(); ctx.moveTo(b0[0] + ux * R * 0.9, b0[1] + uy * R * 0.9); ctx.lineTo(b1[0], b1[1]); ctx.strokeStyle = rgba(Z9.mergG, 0.9); ctx.lineWidth = sw * 0.9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  ctx.globalAlpha /= L('kop'); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R, Math.PI - cup - 0.35, Math.PI + cup + 0.35, false); ctx.arc(0, 0, R - kb, Math.PI + cup + 0.35, Math.PI - cup - 0.35, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1);
  ctx.restore();
  // kapsel: mouw van de rand van de kom naar de hals (boven en onder)
  const rot = (px, py) => [px * Math.cos(draai) - py * Math.sin(draai), px * Math.sin(draai) + py * Math.cos(draai)];
  ctx.save(); ctx.globalAlpha *= L('kapsel'); ctx.strokeStyle = Z9.kapsel; ctx.lineWidth = 0.13 * R; ctx.lineCap = 'round';
  const kb1 = [Math.cos(Math.PI - cup) * r2 - 0.1 * R, -Math.sin(Math.PI - cup) * r2 - 0.12 * R], ke1 = rot(0.55 * R, -1.18 * R), kb2 = [Math.cos(Math.PI + cup) * r2 - 0.1 * R, -Math.sin(Math.PI + cup) * r2 + 0.12 * R], ke2 = rot(-0.15 * R, 1.35 * R);
  ctx.beginPath(); ctx.moveTo(kb1[0], kb1[1]); ctx.bezierCurveTo(-0.5 * R, -1.45 * R, 0.1 * R, -1.5 * R, ke1[0], ke1[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kb2[0], kb2[1]); ctx.bezierCurveTo(-0.6 * R, 1.45 * R, -0.35 * R, 1.6 * R, ke2[0], ke2[1]); ctx.stroke(); ctx.restore();
  // banden: verdikkingen aan de buitenkant van het kapsel
  ctx.save(); ctx.globalAlpha *= L('banden'); ctx.strokeStyle = Z9.pees; ctx.lineWidth = 0.07 * R; ctx.lineCap = 'round';
  for (const d of [0.12, 0.24]) { ctx.beginPath(); ctx.moveTo(kb1[0] - 0.1 * R, kb1[1] - d * R); ctx.bezierCurveTo(-0.5 * R, -(1.45 + d) * R, 0.1 * R, -(1.5 + d) * R, ke1[0] + 0.1 * R, ke1[1] - d * R); ctx.stroke(); } ctx.restore();
  ctx.restore();
  return { kop: [x + 0.35 * R, y], kom: [x - 1.9 * R, y + 0.2 * R], kraakbeen: [x - 1.1 * R, y - 0.75 * R], smeer: [x - 0.42 * R, y + 1.02 * R], kapsel: [x - 0.3 * R, y - 1.45 * R], banden: [x - 0.1 * R, y - 1.85 * R], R };
}
