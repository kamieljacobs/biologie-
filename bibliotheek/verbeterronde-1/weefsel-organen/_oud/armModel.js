// ARMMODEL (practicum, Kamiel 26 okt 2026 in plaats van de kippenvleugel). Twee latjes met een scharnier, twee touwtjes als spieren.
// Bovenste latje staat vast op een voetje; onderste latje scharniert eronder en steekt een stukje achter het scharnier uit
// (zoals het uitsteeksel van de ellepijp). Touwtje voor zit vóór het scharnier vast, touwtje achter aan het stompje.
// Elk touwtje loopt door een oogje bovenaan en eindigt in een ringetje. e = hoek onderste latje (0 = recht naar beneden,
// 1.57 = horizontaal naar voren). knikV / knikA 0..1 = touwtje voor/achter geduwd (knikt), trekV / trekA = trekpijl.
// s = px per cm (latjes ± 30 cm). Voorkant = +x.
function armModel(ctx, x, y, s, o = {}) { const { a = 1, e = 0.2, knikV = 0, knikA = 0, trekV = 0, trekA = 0, hlV = 0, hlA = 0, dimV = 0, dimA = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hout = '#C9A36A', houtS = '#9A7A4A', H = [x, y], top = [x, y - 30 * s];
  // statief (staat op tafel op hoogte o.statief) met een klem bovenaan
  if (o.statief != null) { ctx.fillStyle = '#8A94A6'; ctx.fillRect(x - 15 * s, y - 34 * s, 1.4 * s, o.statief - (y - 34 * s)); roundRect(ctx, x - 22 * s, o.statief - 1.6 * s, 16 * s, 1.6 * s, 0.5 * s); shape(ctx, '#5A6478', null); }
  roundRect(ctx, x - 16 * s, y - 34 * s, 22 * s, 3 * s, 1 * s); shape(ctx, _mixHex(hout, '#000000', 0.15), houtS, 1.5);
  // bovenste latje (opperarm)
  roundRect(ctx, x - 1.4 * s, y - 31 * s, 2.8 * s, 31 * s, 1 * s); shape(ctx, hout, houtS, 1.5);
  // onderste latje (onderarm) met stompje achter het scharnier
  const ux = Math.sin(e), uy = Math.cos(e), F = (d, n = 0) => [x + ux * d * s + uy * n * s, y + uy * d * s - ux * n * s];
  ctx.save(); ctx.translate(x, y); ctx.rotate(-e); roundRect(ctx, -1.3 * s, -4 * s, 2.6 * s, 32 * s, 1 * s); shape(ctx, _mixHex(hout, '#FFFFFF', 0.08), houtS, 1.5); ctx.restore();
  // scharnier
  circ(ctx, x, y, 1.5 * s, '#8A94A6', '#5A6478', 1.5); circ(ctx, x, y, 0.5 * s, '#3A4458');
  // oogjes bovenaan (voor en achter)
  const oogV = [x + 2.6 * s, y - 27 * s], oogA = [x - 2.6 * s, y - 27 * s];
  for (const p of [oogV, oogA]) { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 * s, 0, 6.283); ctx.stroke(); }
  // aanhechtingen
  const hV = F(5, 1.3), hA = F(-3.2, -0.6);
  const touw = (oog, h, knik, hl, dimK, kleur) => { ctx.save(); ctx.globalAlpha *= dimK ? 0.35 : 1; const d = Math.hypot(h[0] - oog[0], h[1] - oog[1]);
    ctx.strokeStyle = hl > 0.01 ? _mixHex('#E9E3D2', C.goud, hl) : '#E9E3D2'; ctx.lineWidth = 4 + 2 * hl;
    ctx.beginPath(); ctx.moveTo(h[0], h[1]);
    if (knik > 0.01) { // te veel touw: het knikt opzij
      const mx = (h[0] + oog[0]) / 2, my = (h[1] + oog[1]) / 2, nx = (oog[1] - h[1]) / d, ny = -(oog[0] - h[0]) / d, sg = oog[0] > x ? 1 : -1, b = knik * 5 * s * sg;
      ctx.bezierCurveTo(h[0] + nx * b * 0.4, h[1] + ny * b * 0.4, mx + nx * b * 1.4, my + ny * b * 1.4 + 2 * s, mx + nx * b, my + ny * b);
      ctx.bezierCurveTo(mx + nx * b * 0.6 - 2 * s * sg, my - 3 * s, oog[0] + nx * b * 0.3, oog[1] + ny * b * 0.3 + 3 * s, oog[0], oog[1]);
    } else ctx.lineTo(oog[0], oog[1]);
    ctx.stroke(); circ(ctx, h[0], h[1], 0.8 * s, '#8A94A6');
    // vrij eind boven het oogje met ringetje (langer naarmate er minder touw onder het oogje zit)
    const vrij = Math.max(2, 22 - d / s + (knik > 0 ? -knik * 4 : 0)), ex = oog[0] + (oog[0] > x ? 0.6 : -0.6) * s, ey = oog[1] - vrij * s;
    ctx.beginPath(); ctx.moveTo(oog[0], oog[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey - 1.1 * s, 1.1 * s, 0, 6.283); ctx.strokeStyle = kleur; ctx.stroke();
    ctx.restore(); return [ex, ey - 1.1 * s]; };
  const rV = touw(oogV, hV, knikV, hlV, dimV, C.goud), rA = touw(oogA, hA, knikA, hlA, dimA, C.teal);
  if (trekV > 0.01) pijl(ctx, rV[0], rV[1] - 1.5 * s, rV[0], rV[1] - 1.5 * s - 7 * s * trekV, C.goud, 1, 5, 18);
  if (trekA > 0.01) pijl(ctx, rA[0], rA[1] - 1.5 * s, rA[0], rA[1] - 1.5 * s - 7 * s * trekA, C.teal, 1, 5, 18);
  ctx.restore();
  return { scharnier: H, top, hand: F(27), onder: F(14), boven: [x, y - 15 * s], hechtV: hV, hechtA: hA, ringV: rV, ringA: rA, oogV, oogA };
}
