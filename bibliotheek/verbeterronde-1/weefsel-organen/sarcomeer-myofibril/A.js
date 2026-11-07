// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// v2 (beeldbank 27 okt 2026): elke myosinekop = nek (hefboom) + gebogen kop (golfclub/hamertje) die schuin naar de Z-lijn
// wijst, in rijen boven en onder de dikke draad, i.p.v. een wolk stippen. Myofibril: banden in twee tinten (A donker met
// lichtere H-zone en M-lijn, I licht met donkere Z-lijn), A-band ± 1,6 µm vast, zodat elke herhaling als sarcomeer leest.
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
        // nek (hefboom) vanaf de dikke draad, dan de kop als gebogen 'hamertje' dat naar de Z-lijn wijst
        const b0 = [kx, my + up * Math.max(3, 0.05 * s)], nl = 0.05 * s, b1 = [b0[0] + sg * Math.cos(hoek) * nl, b0[1] + up * Math.sin(hoek) * nl];
        const ka = Math.atan2(up * 0.35, sg * 1), kl = Math.max(5, 0.06 * s), kb = Math.max(2.4, 0.024 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.016 * s); ctx.beginPath(); ctx.moveTo(b0[0], b0[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke();
        ctx.save(); ctx.translate(b1[0], b1[1]); ctx.rotate(ka); ctx.beginPath(); ctx.moveTo(-kl * 0.15, -kb); ctx.quadraticCurveTo(kl * 0.6, -kb * 1.5, kl, -kb * 0.2); ctx.quadraticCurveTo(kl * 0.75, kb * 1.1, kl * 0.2, kb * 0.9); ctx.quadraticCurveTo(-kl * 0.2, kb * 0.6, -kl * 0.15, -kb); ctx.closePath();
        shape(ctx, lighten(Z9.myosine, 0.15), lighten(Z9.myosine, 0.4), 1); ctx.restore(); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}

// myofibril: een buis met banden als herhaling van sarcomeren. v2: A-band (donker, ± 1,6 µm, houdt zijn breedte) met
// lichtere H-zone en M-lijn in het midden; I-band (licht) met een donkere Z-lijn; bij kleinere L worden alleen I-band en
// H-zone smaller (glijdende draden). hlIdx = één sarcomeer goud omlijnd (van Z-lijn tot Z-lijn).
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, '#D9A496', '#E8C4B8', 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s, A = 1.6 * s, Hz = Math.max(0, L - 2.0) * s; let i = 0;
  for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2;
    ctx.fillStyle = '#8E3E38'; ctx.fillRect(mid - A / 2, y - h / 2, A, h);                                          // A-band
    if (Hz > 1) { ctx.fillStyle = '#A85A50'; ctx.fillRect(mid - Hz / 2, y - h / 2, Hz, h); }                         // H-zone
    ctx.fillStyle = rgba('#5A1E1A', 0.9); ctx.fillRect(mid - Math.max(0.6, 0.02 * s), y - h / 2, Math.max(1.2, 0.04 * s), h); // M-lijn
    ctx.fillStyle = '#4A1A16'; ctx.fillRect(xx - Math.max(0.8, 0.03 * s), y - h / 2, Math.max(1.6, 0.06 * s), h);    // Z-lijn
    if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.fillStyle = rgba('#2A0E0C', 0.18); ctx.fillRect(x0, y + h * 0.2, w, h); ctx.fillStyle = rgba('#FFFFFF', 0.08); ctx.fillRect(x0, y - h / 2, w, h * 0.2); // ronde buis (vlak)
  ctx.restore(); ctx.restore(); }