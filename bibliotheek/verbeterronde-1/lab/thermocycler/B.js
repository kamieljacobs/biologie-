// =====================================================================================
// THERMOCYCLER als gekoppeld schema: apparaat (vooraanzicht) + temperatuurprofiel met lopende stip + wat de
// DNA-strengen bij die temperatuur doen + teller van het aantal kopieën (1 → 2 → 4 → 8).
// Recept: drie stappen per cyclus (OpenStax Biology 2e § 17.1; PCR-collegeslides KSU): ± 95 °C (20–30 s) de twee
//  strengen gaan los; 50–65 °C (hier 55, ± 30 s) korte primers binden aan het 3′-uiteinde van elke streng; 72 °C
//  (± 60 s) Taq-polymerase bouwt vanaf de primer een nieuwe streng (5′ → 3′). Elke cyclus verdubbelt het aantal
//  kopieën (n cycli → 2ⁿ); 25–35 cycli. De opwarm- en afkoelflanken zijn kort maar zichtbaar (geen sprong).
//  Kleuren: oude streng paars, nieuwe streng lichtpaars, primer goud; lijn van het profiel koraal bij opwarmen,
//  teal bij afkoelen. Apparaat ± 25 cm breed (≈).
//  Bekende fouten: primers binden bij 95 °C; nieuwe streng groeit in beide richtingen tegelijk vanaf het midden;
//  na één cyclus vier kopieën.
// x, y = linksonder van het hele schema; s = schaal (1 ≈ 1 px per mm voor het apparaat; schema ± 860 × 520 px).
// o.fase = cycli als kommagetal (2,4 = derde cyclus, primers binden); o.toon 'alles' | 'apparaat'; o.a.
// Geeft { apparaat, profiel, strengen, teller, temp } terug.
// =====================================================================================
function _tcTemp(f) { const c = Math.floor(f), u = f - c, voor = c === 0 ? 25 : 72;
  if (u < 0.05) return lerp(voor, 95, u / 0.05); if (u < 0.25) return 95; if (u < 0.32) return lerp(95, 55, (u - 0.25) / 0.07); if (u < 0.5) return 55; if (u < 0.55) return lerp(55, 72, (u - 0.5) / 0.05); return 72; }
function thermocycler(ctx, x, y, s, o = {}) {
  const { a = 1, fase = 0, toon = 'alles' } = o; const f = Math.max(0, fase), c = Math.floor(f), u = f - c, T = _tcTemp(f);
  const stap = u < 0.05 || (u >= 0.5 && u < 0.55) ? 'op' : (u >= 0.25 && u < 0.32) ? 'af' : u < 0.25 ? 'los' : u < 0.5 ? 'binden' : 'bouwen';
  const ret = { apparaat: [x + 125 * s, y - 120 * s], profiel: [x + 560 * s, y - 380 * s], strengen: [x + 560 * s, y - 150 * s], teller: [x + 125 * s, y - 20 * s], temp: T };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // --- apparaat in vooraanzicht (250 × 200 mm), deksel met handgreep, display
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, -150, 250, 150, 10); shape(ctx, '#3A4A66', '#4B5D7E', 2);
  roundRect(ctx, 6, -210, 238, 62, 14); shape(ctx, '#4B5D7E', '#5E7194', 2); ctx.fillStyle = '#7A8BA8'; ctx.fillRect(85, -200, 80, 7);
  roundRect(ctx, 18, -128, 120, 70, 6); shape(ctx, '#0F1828', '#5A6B88', 2);
  const kl = stap === 'op' ? C.koraal : stap === 'af' ? C.teal : C.text;
  text(ctx, Math.round(T) + ' °C', 78, -86, fMeta(30), kl, 'center'); text(ctx, (c + 1) + ' / 30', 78, -64, fMeta(18), C.text2, 'center');
  circ(ctx, 205, -95, 8, stap === 'op' ? C.koraal : stap === 'af' ? C.teal : '#55657F');
  ctx.fillStyle = '#2B384F'; ctx.fillRect(14, 0, 30, 6); ctx.fillRect(206, 0, 30, 6);
  ctx.restore();
  if (toon !== 'alles') { ctx.restore(); return ret; }
  // --- temperatuurprofiel: 3 cycli zichtbaar rond de huidige
  const gx = x + 310 * s, gy = y - 260 * s, gw = 540 * s, gh = 230 * s, c0 = Math.max(0, c - 1), nC = 3;
  const tx = (ff) => gx + (ff - c0) / nC * gw, ty = (TT) => gy - (Math.max(TT, 40) - 40) / 60 * gh;
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10 * s); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw + 10 * s, gy); ctx.stroke();
  for (const TT of [55, 72, 95]) { ctx.strokeStyle = rgba(C.line, 0.25); ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(gx, ty(TT)); ctx.lineTo(gx + gw, ty(TT)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, TT + ' °C', gx - 10 * s, ty(TT) + 9 * s, fMeta(Math.max(10, 26 * s)), C.text2, 'right'); }
  const seg = (f0, f1, kleur, w) => { ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.beginPath(); for (let ff = f0; ff <= f1 + 1e-6; ff += 0.004) { const p = [tx(ff), ty(_tcTemp(ff))]; ff === f0 ? ctx.moveTo(...p) : ctx.lineTo(...p); } ctx.stroke(); };
  seg(c0, c0 + nC - 0.001, rgba(C.line, 0.45), 2.5 * s); // hele profiel vaag
  for (let ff = c0; ff < f; ff += 0.01) { const g = ff - Math.floor(ff); const k = (g < 0.05 || (g >= 0.5 && g < 0.55)) ? C.koraal : (g >= 0.25 && g < 0.32) ? C.teal : C.text; seg(ff, Math.min(f, ff + 0.01), k, 4 * s); }
  circ(ctx, tx(f), ty(T), 9 * s, C.goud);
  // --- de strengen bij deze stap (één molecuul, 20 sporten)
  const sx = gx + 40 * s, sw = gw - 80 * s, sy = y - 120 * s, N = 20, st = sw / N, open = stap === 'los' ? clamp(u / 0.2, 0, 1) : stap === 'af' || stap === 'binden' || stap === 'bouwen' ? 1 : (u >= 0.5 ? 1 : 0);
  const gap = lerp(20, 70, open) * s, yT = sy - gap / 2, yB = sy + gap / 2, rung = 9 * s;
  const streng = (yy, kl, i0, i1, dir) => { ctx.strokeStyle = kl; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(sx + i0 * st, yy); ctx.lineTo(sx + i1 * st, yy); ctx.stroke(); ctx.lineWidth = 3 * s; for (let i = i0; i < i1; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yy); ctx.lineTo(sx + (i + 0.5) * st, yy + dir * rung); ctx.stroke(); } };
  streng(yT, C.paars, 0, N, 1); streng(yB, C.paars, 0, N, -1);
  if (open < 0.3) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 3 * s; for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.moveTo(sx + (i + 0.5) * st, yT + rung); ctx.lineTo(sx + (i + 0.5) * st, yB - rung); ctx.stroke(); } }
  const prim = (stap === 'binden' && u > 0.36) || stap === 'bouwen' || (u >= 0.5); const pa = stap === 'binden' ? clamp((u - 0.36) / 0.1, 0, 1) : 1;
  if (prim && open > 0.9) { ctx.save(); ctx.globalAlpha *= pa; streng(yT + 2 * rung + 4 * s, C.goud, N - 3, N, -1); streng(yB - 2 * rung - 4 * s, C.goud, 0, 3, 1); ctx.restore();
    if (stap === 'bouwen') { const g = clamp((u - 0.55) / 0.4, 0, 1), n = Math.round(g * (N - 3)); streng(yT + 2 * rung + 4 * s, D2.nieuw, N - 3 - n, N - 3, -1); streng(yB - 2 * rung - 4 * s, D2.nieuw, 3, 3 + n, 1); } }
  text(ctx, "5′", sx - 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'right'); text(ctx, "3′", sx + sw + 14 * s, yT + 8 * s, fMeta(Math.max(10, 22 * s)), C.text2, 'left');
  // --- teller: aantal kopieën als kleine dubbelstrengen
  const n = Math.pow(2, c) * (stap === 'bouwen' && u > 0.97 ? 2 : 1), toonN = Math.min(n, 16);
  for (let i = 0; i < toonN; i++) { const px = x + (10 + (i % 8) * 30) * s, py = y + (40 + Math.floor(i / 8) * 26) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 22 * s, py); ctx.moveTo(px, py + 9 * s); ctx.lineTo(px + 22 * s, py + 9 * s); ctx.stroke(); }
  text(ctx, '× ' + n, x + 260 * s, y + 56 * s, fMeta(Math.max(10, 28 * s)), C.text, 'left');
  ctx.restore(); return ret;
}
