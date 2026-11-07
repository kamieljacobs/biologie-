// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.18), Z9.peesR, 1.5);
  for (const dy of [-0.45, 0, 0.45]) { roundRect(ctx, x - L * 0.42, y + dy * h - h * 0.14, L * 0.84, h * 0.28, h * 0.14); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1); }
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }
