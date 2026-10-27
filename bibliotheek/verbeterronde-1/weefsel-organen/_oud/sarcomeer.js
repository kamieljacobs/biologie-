// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// =====================================================================================
function sarcomeer(ctx, x, y, s, o = {}) { const { L = 2.5, a = 1, rijen = 4, kop = 0, hl = {}, volg = false, tropo = 0, t = 0, dz = 0.42 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hz = L / 2 * s, act = 1.0 * s, myo = 0.8 * s, gapY = dz * s, top = y - (rijen - 0.5) * gapY / 2 * 2 / 2 * 1;
  const ys = [...Array(rijen)].map((_, i) => y + (i - (rijen - 1) / 2) * gapY);
  // Z-lijnen
  for (const sg of [-1, 1]) { ctx.strokeStyle = Z9.zlijn; ctx.lineWidth = Math.max(2, 0.03 * s); ctx.beginPath(); const zx = x + sg * hz;
    for (let k = 0; k <= 8; k++) { const yy = ys[0] - gapY * 0.6 + k * (ys[ys.length - 1] - ys[0] + gapY * 1.2) / 8; k ? ctx.lineTo(zx + (k % 2 ? 4 : -4), yy) : ctx.moveTo(zx, yy); } ctx.stroke(); }
  // actine: van elke Z-lijn naar binnen, tussen de myosinerijen (boven en onder elke rij)
  const actYs = []; for (let i = 0; i <= rijen; i++) actYs.push(ys[0] - gapY / 2 + i * gapY);
  ctx.save(); ctx.globalAlpha *= hl.actine != null ? 0.35 + 0.65 * hl.actine : 1;
  for (const ay of actYs) for (const sg of [-1, 1]) { const x0 = x + sg * hz, x1 = x0 - sg * act;
    ctx.strokeStyle = Z9.actine; ctx.lineWidth = Math.max(3, 0.035 * s); ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = lighten(Z9.actine, 0.25); for (let k = 0; k < act / (0.055 * s); k++) { const xx = x0 - sg * (k + 0.5) * 0.055 * s; circ(ctx, xx, ay + (k % 2 ? 1.5 : -1.5), Math.max(1.6, 0.018 * s), lighten(Z9.actine, 0.25)); }
    if (tropo > 0.01) { ctx.save(); ctx.globalAlpha *= tropo; ctx.strokeStyle = C.paars; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 - sg * act * k / 20; k ? ctx.lineTo(xx, ay + Math.sin(k * 1.6) * 3) : ctx.moveTo(xx, ay); } ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // myosine: dikke draad in het midden, koppen op beide helften behalve de kale zone
  ctx.save(); ctx.globalAlpha *= hl.myosine != null ? 0.35 + 0.65 * hl.myosine : 1; const kale = 0.15 * s;
  for (const my of ys) { roundRect(ctx, x - myo, my - Math.max(3, 0.05 * s), 2 * myo, Math.max(6, 0.1 * s), Math.max(3, 0.05 * s)); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1);
    for (const sg of [-1, 1]) for (let k = 0; k < 9; k++) { const kx = x + sg * (kale + (k + 0.5) * (myo - kale) / 9);
      for (const up of [-1, 1]) { const fase = (kop + k * 0.13 + (up > 0 ? 0.07 : 0)) % 1, hoek = fase < 0.5 ? lerp(0.9, 0.35, fase * 2) : lerp(0.35, 0.9, (fase - 0.5) * 2);
        const lx = kx + sg * Math.cos(hoek) * 0.07 * s * 0.5, ly = my + up * (Math.max(3, 0.05 * s) + Math.sin(hoek) * 0.12 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.018 * s); ctx.beginPath(); ctx.moveTo(kx, my + up * Math.max(3, 0.05 * s)); ctx.lineTo(lx, ly); ctx.stroke(); circ(ctx, lx, ly, Math.max(2.2, 0.025 * s), lighten(Z9.myosine, 0.15)); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}
