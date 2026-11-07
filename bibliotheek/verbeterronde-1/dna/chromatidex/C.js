// =====================================================================================
// LOSSE X (twee zusterchromatiden + centromeer) in de stijl van kernChromatine (variant C = A, beeldbank ronde 2: vorm ongewijzigd, zie OVERZICHT).
// Recept (OpenStax Biology 2e § 10.2 en 13.1; Utah GSLC): na de S-fase bestaat een chromosoom uit twee identieke
// zusterchromatiden, vast bij het centromeer (cohesine); het centromeer ligt meestal niet in het midden (cen ≈ 0,38).
// Elke chromatide is één opgerold DNA-molecuul: de oprolling als lichte dwarse windingen.
//  - v2: de windingen volgen exact de middellijn van de arm (dezelfde kwadratische boog) en staan loodrecht op die lijn,
//    halve lengte 0,38 w, en niet in de ronde toppen (u 0,05–0,95): niets steekt meer buiten de arm.
//  Bekende fouten: losse grijze streepjes naast de armtoppen (v1); X als één staaf; centromeer in het midden.
// x, y = centromeer; len = lengte; rot = draaiing; o.w, o.kleur, o.donker, o.cen, o.uiteen 0..1, o.coils (0 = egaal).
// =====================================================================================
function chromatideX(ctx, x, y, len, rot, o = {}) {
  const { a = 1, w = len * 0.16, kleur = C.kernR, donker = C.kern, cen = 0.38, uiteen = 0, coils = 9 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const q = (p0, p1, p2, t) => [(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]];
  const qd = (p0, p1, p2, t) => [2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]), 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])];
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + uiteen * w * 1.2);
    const A0 = [off + k * w * 0.5, -len * cen], A1 = [off, -len * cen * 0.4], M = [off * 0.75, 0], B1 = [off, len * (1 - cen) * 0.4], B2 = [off + k * w * 0.5, len * (1 - cen)];
    ctx.beginPath(); ctx.moveTo(A0[0], A0[1]); ctx.quadraticCurveTo(A1[0], A1[1], M[0], M[1]); ctx.quadraticCurveTo(B1[0], B1[1], B2[0], B2[1]);
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (coils > 0 && w >= 8) { ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1);
      const n = coils * 2; for (let i = 0; i < n; i++) { const u = 0.05 + 0.9 * (i + 0.5) / n; const boven = u < cen, t = boven ? u / cen : (u - cen) / (1 - cen);
        const P = boven ? q(A0, A1, M, t) : q(M, B1, B2, t), D = boven ? qd(A0, A1, M, t) : qd(M, B1, B2, t), L = Math.hypot(D[0], D[1]) || 1, tx = D[0] / L, ty = D[1] / L, nx = -ty, ny = tx;
        if (Math.abs(u - cen) < 0.035) continue; // niet over het centromeer
        const h = w * 0.38, b = w * 0.12; ctx.beginPath(); ctx.moveTo(P[0] - nx * h - tx * b, P[1] - ny * h - ty * b); ctx.quadraticCurveTo(P[0] + tx * b, P[1] + ty * b, P[0] + nx * h - tx * b, P[1] + ny * h - ty * b); ctx.stroke(); } } });
  if (uiteen < 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * (1 - uiteen / 0.3), donker);
  ctx.restore();
}
