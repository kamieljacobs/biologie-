// delende cel (Micro) — variant A (beeldbank 27 okt 2026). Recept (OpenStax Biology 2e § 10.2: spoelfiguur uit microtubuli vanaf de
// centrosomen; een trekdraad is een bundel microtubuli (aantal hier schematisch)):
//  - celrand = membraan als dunne dubbele lijn in de membraankleur van celRond (C.er), met een kier, zodat hij naast celRond als
//    dezelfde soort cel leest; insnoeren in het midden (cytokinese) als morph van dezelfde rand.
//  - cel is niet leeg: rustige textuur plus een paar organellen (mitochondriën, stukjes ER) op 35 % in een ring langs de rand,
//    buiten de spoelfiguur; alles geclipt binnen de binnenste membraanlijn (Beeldafspraak: niets steekt buiten het membraan).
//  - trekdraad = bundel van o.n lijnen (standaard 3) die bij de pool samenkomen en bij het kinetochoor licht uitwaaieren.
// Aanroepen gelijk aan v1; cdDraad krijgt een negende argument n (aantal lijnen, 1 = oude enkele lijn).
function cdCel(ctx, cx, cy, rx, ry, o = {}) {
  const { insnoer = 0, a = 1, polen = 0, kern = 0, seed = 3, t = 0, organellen = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = (f = 1) => { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, c = Math.cos(an), s = Math.sin(an); const pinch = 1 - insnoer * 0.92 * Math.exp(-Math.pow(c / 0.32, 2)); const wob = 1 + 0.008 * Math.sin(an * 5 + t * 0.7 + seed);
    const X = cx + c * rx * wob * f, Y = cy + s * ry * pinch * wob * f; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); };
  const gap = Math.max(2.5, Math.min(rx, ry) * 0.012), f2 = 1 - gap / Math.min(rx, ry);
  pad(); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  ctx.save(); pad(f2 - 0.01); ctx.clip();
  for (let i = 0; i < 120; i++) { const X = cx + (hash(i * 3 + seed) - 0.5) * rx * 2, Y = cy + (hash(i * 7 + seed) - 0.5) * ry * 2; ctx.beginPath(); ctx.arc(X, Y, Math.max(1, Math.min(rx, ry) * 0.004), 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (organellen && Math.min(rx, ry) > 40) { ctx.save(); ctx.globalAlpha *= 0.35; const m = Math.min(rx, ry);
    for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283 + 0.35 + hash(k + seed) * 0.4, rr = 0.74 + 0.1 * hash(k * 5 + seed); const X = cx + Math.cos(an) * rx * rr, Y = cy + Math.sin(an) * ry * rr * (1 - insnoer * 0.8 * Math.exp(-Math.pow(Math.cos(an) / 0.32, 2)));
      if (k % 3 === 2) { ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.5, m * 0.008); ctx.beginPath(); for (let q = 0; q < 3; q++) { const d = (q - 1) * m * 0.03; ctx.moveTo(X - m * 0.07 + d, Y + d); ctx.quadraticCurveTo(X + d, Y - m * 0.03 + d, X + m * 0.07 + d, Y + d); } ctx.stroke(); }
      else { const lx = m * 0.075, ly = m * 0.035; ctx.save(); ctx.translate(X, Y); ctx.rotate(an + 1.4); ctx.beginPath(); ctx.ellipse(0, 0, lx, ly, 0, 0, 6.283); shape(ctx, C.mito, C.mitoR, 1.2); ctx.strokeStyle = C.mitoR; ctx.lineWidth = Math.max(1, m * 0.005); ctx.beginPath(); for (let q = -2; q <= 2; q++) { ctx.moveTo(q * lx * 0.32, -ly * 0.75); ctx.lineTo(q * lx * 0.32 + lx * 0.1, ly * 0.2); } ctx.stroke(); ctx.restore(); } } ctx.restore(); }
  ctx.restore();
  pad(); ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.5, gap * 0.6); ctx.stroke(); pad(f2); ctx.strokeStyle = rgba(C.er, 0.75); ctx.lineWidth = Math.max(1.2, gap * 0.5); ctx.stroke();
  ctx.restore();
}
function cdDraad(ctx, px, py, x, y, a = 1, kl = CD.draad, lw = 1.4, n = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = n > 1 ? lw * 0.8 : lw;
  const dx = x - px, dy = y - py, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, sp = Math.max(1.6, lw * 1.6);
  for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * sp; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + x) / 2 + nx * o * 0.6, (py + y) / 2 + (y - py) * 0.12 + ny * o * 0.6, x + nx * o, y + ny * o); ctx.stroke(); }
  ctx.restore(); }
