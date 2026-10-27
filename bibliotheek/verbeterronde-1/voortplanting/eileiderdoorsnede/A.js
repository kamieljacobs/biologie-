// Variant A (27 okt 2026): littekens als onregelmatige vlek licht bindweefsel (collageenvezels) waarin de plooien
// samengroeien, met een nauw restkanaal (geen witte blokjes); franjes vertakt en vast aan een trechterkraag; trilharen
// dikker met een metachrone slag (snel naar de baarmoeder, traag terug); spiervezels dichter bij de isthmus.
// =====================================================================================
// EILEIDER in lengtedoorsnede, variant met as en lumen-functie (22 okt 2026, Anticonceptie, soa's en voortplantings-
// techniek). Naast eileiderLangs (Van bevruchting tot baby); gebruik bij nieuwe films bij voorkeur één van de twee. Recept: ± 10–12 cm lang; vanaf de baarmoeder isthmus (smal, lumen ± 1 mm, dikke spierwand) → ampulla
// (wijd, ± 1 cm, dunne wand, sterk geplooid slijmvlies; hier vindt de bevruchting plaats) → trechter met franjes
// (fimbriae) die over de eierstok liggen. Slijmvlies met trilhaarcellen die naar de baarmoeder slaan, plus
// spiercontracties. Ontsteking (salpingitis, vooral chlamydia/gonorroe): wand rood en gezwollen, plooien plakken
// aan elkaar, daarna littekens (fibrose) die het lumen vernauwen of afsluiten → eicel/embryo blijft steken
// (buitenbaarmoederlijke zwangerschap of onvruchtbaarheid). Bron: Junqueira h. 22; Sadler h. 2; RIVM chlamydia.
// Bekende fouten: een rechte buis van gelijke dikte; franjes als losse streepjes zonder trechter.
// x0 = baarmoederkant (links), x1 = trechterkant (rechts), yc = as. o: ontst 0..1, litteken 0..1, t, eicel (0..1 = plek
// langs de buis van rechts naar links), dicht 0..1 (volledig afgesloten), trilhaar (toon trilharen).
// Geeft { lumen(u) → [x, y, straal] } terug (u = 0 baarmoeder … 1 trechter).
// =====================================================================================
function eileiderDoorsnede(ctx, x0, x1, yc, o = {}) {
  const { a = 1, t = 0, ontst = 0, litteken = 0, trilhaar = 1, s = 1, franjes = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = x1 - x0; const zw = 1 + 0.18 * ontst;
  const buiten = (u) => lerp(46, 120, Math.pow(u, 1.25)) * s * zw; // halve dikte buitenwand
  const lumen = (u) => Math.max(4 * s, lerp(8, 82, Math.pow(u, 1.4)) * s * (1 - 0.25 * ontst)); // halve wijdte lumen
  const yAs = (u) => yc + Math.sin(u * 5.2) * 10 * s;
  const N = 80; const top = [], bot = [], lt = [], lb = [];
  for (let i = 0; i <= N; i++) { const u = i / N, x = x0 + u * L, y = yAs(u); top.push([x, y - buiten(u)]); bot.push([x, y + buiten(u)]); lt.push([x, y - lumen(u)]); lb.push([x, y + lumen(u)]); }
  const wandCol = ontst > 0.01 ? _mixHex(BIO.spier, '#D2453A', 0.45 * ontst) : BIO.spier;
  // spierwand
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  shape(ctx, rgba(wandCol, 0.7), rgba(BIO.spierL, 0.8), 2);
  // kringspiervezels (dwars) in de wand
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.45); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const u = Math.pow(k / 70, 0.8), x = x0 + u * L, y = yAs(u); /* vezels dichter bij de isthmus (dikke wand), ijler naar de trechter */ ctx.beginPath(); ctx.moveTo(x, y - buiten(u) + 4); ctx.lineTo(x + 6, y - lumen(u) - 6); ctx.moveTo(x, y + buiten(u) - 4); ctx.lineTo(x + 6, y + lumen(u) + 6); ctx.stroke(); } ctx.restore();
  // slijmvlies met plooien (vingers het lumen in), sterker geplooid in de ampulla
  const slijmCol = ontst > 0.01 ? _mixHex(BIO.slijm, '#E0503F', 0.6 * ontst) : BIO.slijm;
  ctx.beginPath(); lt.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(lb[i][0], lb[i][1]); ctx.closePath(); ctx.fillStyle = rgba('#2E1E2A', 0.9); ctx.fill();
  const plooi = (sd) => { const nP = 30; for (let k = 0; k < nP; k++) { const u = 0.03 + (k + 0.5) / nP * 0.94, x = x0 + u * L, y = yAs(u); const lr = lumen(u); const lenF = lerp(0.35, 0.78, u) * (0.75 + 0.5 * hash(k * 5 + (sd > 0 ? 1 : 2))) * (1 + 0.2 * ontst); const w = (L / nP) * 0.62;
      const by = y + sd * (lr + 2 * s), ty = y + sd * lr * (1 - lenF), lean = (hash(k * 3 + 7) - 0.5) * w * 0.8;
      const pts = [[x - w, by], [x - w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x - w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x + w, by]];
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.closePath(); shape(ctx, rgba(slijmCol, 0.9), rgba(BIO.slijmD, 0.75), 1.2);
      if (u > 0.55 && lenF > 0.5) { ctx.beginPath(); ctx.ellipse(x + lean * 0.4, lerp(by, ty, 0.6), w * 0.18, lr * lenF * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.slijmD, 0.25); ctx.fill(); }
      if (trilhaar > 0.01) { ctx.save(); ctx.globalAlpha *= trilhaar; ctx.strokeStyle = rgba('#F6E2D6', 0.95); ctx.lineWidth = Math.max(1.3, 2 * s); for (let c = 0; c < 5; c++) { const v = (c + 0.5) / 5; const p = bioPunt(pts, v); const ph = ((t * 1.6 - k * 0.09 - c * 0.04) % 1 + 1) % 1, sl = ph < 0.3 ? ease(ph / 0.3) : 1 - ease((ph - 0.3) / 0.7); /* snelle slag naar de baarmoeder, trage terugslag, golf over de plooien */ const nx = -sd * 0.0, dx = -(5 + 5 * sl) * s, dy = -sd * (4 + 3 * (1 - sl)) * s;
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[0] + dx * 0.3, p[1] + dy, p[0] + dx, p[1] + dy * 0.7); ctx.stroke(); } ctx.restore(); } } };
  plooi(-1); plooi(1);
  // trechter met franjes
  if (franjes > 0.01) { const ue = 1, xe = x1, ye = yAs(ue), R = buiten(ue); ctx.save(); ctx.globalAlpha *= franjes;
    // trechterrand: de franjes groeien uit één doorlopende kraag (vast aan de trechter), elk vertakt in 2–3 vingertjes
    ctx.beginPath(); ctx.ellipse(xe + 4 * s, ye, 16 * s, R * 1.02, 0, 0, 6.283); shape(ctx, rgba(wandCol, 0.85), rgba(BIO.spierL, 0.8), 1.5);
    const vinger = (sx, sy, an, len, w, d) => { const wob = Math.sin(t * 1.4 + sx * 0.05 + d) * 5 * s; const ex = sx + Math.cos(an) * len, ey = sy + Math.sin(an) * len + wob; const mx = (sx + ex) / 2 - Math.sin(an) * len * 0.12, my = (sy + ey) / 2 + Math.cos(an) * len * 0.12;
      for (const [col, lw] of [[rgba(wandCol, 0.9), w], [rgba(slijmCol, 0.95), w * 0.55]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke(); }
      if (d < 1) { const f = 0.6, bx = lerp(sx, ex, f), by = lerp(sy, ey, f); vinger(bx, by, an - 0.5, len * 0.45, w * 0.6, d + 1); vinger(bx, by, an + 0.45, len * 0.4, w * 0.6, d + 1); } };
    for (let k = 0; k < 7; k++) { const an = -1.1 + k * 0.37; const len = (62 + 18 * Math.sin(k * 1.7)) * s; vinger(xe + 6 * s, ye + Math.sin(an) * R * 0.85, an * 0.9, len, 15 * s, 0); } ctx.restore(); }
  // littekens: lichte vezelbanden die het lumen dichtknijpen
  if (litteken > 0.01) { const plekken = [0.28, 0.5, 0.66]; plekken.forEach((u0, i) => { const g = clamp(litteken * 1.6 - i * 0.3, 0, 1); if (g <= 0.01) return; const x = x0 + u0 * L, y = yAs(u0), lr = lumen(u0);
      ctx.save(); ctx.globalAlpha *= g;
      // onregelmatige vlek lichter bindweefsel in het slijmvlies; de plooien van boven en onder groeien samen (brug door het lumen), er blijft een nauw kanaaltje
      const vlek = []; for (let q = 0; q < 22; q++) { const an = q / 22 * 6.283; const rr = 1 + 0.22 * Math.sin(an * 3 + i * 2) + 0.12 * Math.sin(an * 7 + i); vlek.push([x + Math.cos(an) * 42 * s * rr, y + Math.sin(an) * (lr + 6 * s) * rr]); }
      ctx.beginPath(); bioPad(ctx, vlek, true); ctx.fillStyle = rgba('#E6D8CC', 0.88); ctx.fill(); ctx.save(); ctx.clip();
      ctx.strokeStyle = rgba('#B8A498', 0.6); ctx.lineWidth = Math.max(1, 1.5 * s); for (let k = 0; k < 9; k++) { const yy = y + (k - 4) * (lr + 6 * s) / 4.5; ctx.beginPath(); ctx.moveTo(x - 50 * s, yy); ctx.bezierCurveTo(x - 15 * s, yy - 6 * s * Math.sin(k + i), x + 15 * s, yy + 6 * s * Math.cos(k), x + 50 * s, yy + 3 * s); ctx.stroke(); }
      const gap = Math.max(1.5 * s, lr * 0.3 * (1 - g)); ctx.beginPath(); ctx.ellipse(x + 4 * s, y + 2 * s, 34 * s, gap, 0.05, 0, 6.283); ctx.fillStyle = rgba('#2E1E2A', 0.95); ctx.fill(); ctx.restore(); ctx.restore(); }); }
  ctx.restore();
  return { lumen: (u) => [x0 + u * L, yAs(u), lumen(u)], buiten: (u) => buiten(u) };
}
