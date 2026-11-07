// Inbouw 28 okt 2026 (Kamiel koos de huidige versie): alleen de bevestigde fout hersteld: het haarvat liep dwars over de
// vetcellen; nu loopt het als één doorlopend vat over de grenzen tussen de cellen (bindweefsel). Bronnen: Digital Histology 'Adipose 1' en 'White
// adipose connective tissue' (vaten in het bindweefsel tussen de vetcellen); Mustansiriyah-college 'Adipose tissue'
// ('septa contain … blood and lymph capillaries'). Rustiger dan variant C: één doorlopend vat, geen losse stukjes. vetcel() en _bioCellen() ongewijzigd.
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  // haarvat in het bindweefsel tússen de cellen: één doorlopend pad dat van rand tot rand over de celgrenzen loopt
  // (van grenspunt naar grenspunt, stapjes kleiner dan een cel), dus nooit dwars over een vetdruppel
  if (haarvat) { const G = []; polys.forEach(pg => pg.pts.forEach(p => G.push([x + p[0], y + p[1]])));
    const yDoel = xx => y + h * 0.1 + Math.sin((xx - x) / w * 5) * h * 0.08, R = d * 0.32;
    let cur = G.filter(p => p[0] < x - w / 2 + d * 0.3).sort((p, q) => Math.abs(p[1] - yDoel(p[0])) - Math.abs(q[1] - yDoel(q[0])))[0]; const P = [[x - w / 2 - 20, cur[1]], cur];
    for (let n = 0; n < 400 && cur[0] < x + w / 2 + 10; n++) { let best = null, bs = -1e9;
      for (const p of G) { const dx = p[0] - cur[0], dy = p[1] - cur[1], dd = Math.hypot(dx, dy); if (dd < d * 0.04 || dd > R || dx < d * 0.02) continue;
        const sc = dx - 0.9 * Math.abs(p[1] - yDoel(p[0])) * (dx / dd); if (sc > bs) { bs = sc; best = p; } }
      if (!best) break; P.push(best); cur = best; }
    P.push([x + w / 2 + 20, cur[1]]);
    bloedvat(ctx, P, Math.max(2.5, Math.min(5, d * 0.045)), t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' }); }
  ctx.restore();
  ctx.restore();
}
