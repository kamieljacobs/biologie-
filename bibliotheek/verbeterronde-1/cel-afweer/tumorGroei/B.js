// =====================================================================================
// TUMORGROEI en APOPTOSE. Recept: kanker begint met één cel waarin mutaties de rem op de celcyclus uitschakelen
// (tumorsuppressorgenen zoals p53) of het gaspedaal vastzetten (oncogenen); die cel deelt ongeremd en zijn
// nakomelingen vormen een kluwen (tumor) tussen de gewone weefselcellen. Tumorcellen: onregelmatig van vorm en maat,
// grote donkere kernen, veel cellen in deling, ze stapelen op en drukken de buren weg; een kwaadaardige tumor breekt
// door het basaalmembraan (invasie). Gewone cellen: even groot, netjes in één laag, regelmatige kern. Apoptose als
// tegenhanger (p53 laat een beschadigde cel zichzelf opruimen): de cel krimpt, de kern wordt klein en donker en valt in
// stukjes, het membraan vormt blaasjes (blebs) en de cel valt uiteen in ingepakte stukjes die worden opgeruimd; geen
// lekkende inhoud. Bron: OpenStax Biology AP Courses § 10.4; Klymkowsky & Cooper, Biofundamentals 10.5.
// Bekende fouten: tumor als één grote rode bol; tumorcellen die er net zo uitzien als gewone cellen; apoptose als een
// cel die ontploft.
// =====================================================================================
// Stijl B: bovenaanzicht door een ronde 'microscoop'-uitsnede: gewone cellen als veelhoeken met afgeronde hoeken die
// zonder kieren tegen elkaar liggen (80–120 % maatverschil); met o.g ontstaat vanuit één cel een groeiende kluwen van
// kleinere, onregelmatige cellen met grote kernen (veel in deling) die de buren opzij duwt. Eén cel rechtsboven ruimt
// zichzelf op (o.apoptose). Aanroep: tumorGroei(ctx, x, y, s, o) — (x, y) = 60 s onder het midden van de uitsnede (zelfde ankerpunt als de zijaanzicht-variant), s = 1 → Ø 420 px.
// o.g 0..1, o.apoptose 0..1, o.t. Geeft { tumor, apoptose, membraan } terug (membraan = rand van de uitsnede).
// =====================================================================================
const _TGB = { cel: '#3A4A66', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', tum: '#7A4E6E', tumR: '#D9A0C0', tumK: '#4E3A7A' };
function _tgbVoronoi(pts, i, R0) { // cel i als veelhoek: vierkant rond het punt, afgesneden door de middelloodlijnen met de buren
  const [px, py] = pts[i]; let poly = [[px - R0, py - R0], [px + R0, py - R0], [px + R0, py + R0], [px - R0, py + R0]];
  for (let j = 0; j < pts.length; j++) { if (j === i) continue; const [qx, qy] = pts[j]; const dx = qx - px, dy = qy - py; const d2 = dx * dx + dy * dy; if (d2 > 4 * R0 * R0) continue;
    const mx = (px + qx) / 2, my = (py + qy) / 2; const inside = p => (p[0] - mx) * dx + (p[1] - my) * dy <= 0; const out = [];
    for (let k = 0; k < poly.length; k++) { const A2 = poly[k], B2 = poly[(k + 1) % poly.length]; const ia = inside(A2), ib = inside(B2); if (ia) out.push(A2);
      if (ia !== ib) { const da = (A2[0] - mx) * dx + (A2[1] - my) * dy, db = (B2[0] - mx) * dx + (B2[1] - my) * dy; const u = da / (da - db); out.push([A2[0] + (B2[0] - A2[0]) * u, A2[1] + (B2[1] - A2[1]) * u]); } }
    poly = out; if (poly.length < 3) break; }
  return poly;
}
function _tgbVorm(ctx, poly, krimp, rond) { // afgeronde veelhoek, iets naar binnen (kier = celmembranen van buren)
  const cx = poly.reduce((s2, p) => s2 + p[0], 0) / poly.length, cy = poly.reduce((s2, p) => s2 + p[1], 0) / poly.length;
  const P = poly.map(p => { const dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy) || 1; return [p[0] - dx / d * krimp, p[1] - dy / d * krimp]; });
  ctx.beginPath(); ctx.moveTo((P[0][0] + P[1][0]) / 2, (P[0][1] + P[1][1]) / 2);
  for (let k = 1; k <= P.length; k++) { const p = P[k % P.length], q = P[(k + 1) % P.length], pr = P[(k - 1 + P.length) % P.length]; const rr = Math.max(0, Math.min(rond, 0.45 * Math.hypot(q[0] - p[0], q[1] - p[1]), 0.45 * Math.hypot(pr[0] - p[0], pr[1] - p[1]))); ctx.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, rr); } ctx.closePath(); return [cx, cy];
}
function tumorGroei(ctx, x, y, s = 1, o = {}) {
  const { a = 1, g = 0, apoptose = 0, t = 0 } = o; const lw = Math.max(0.8, 1.2 * s); const RV = 210 * s, sp = 38 * s; y = y - 60 * s; // (x, y) = midden onderkant zoals de zijaanzicht-versie
  const gg = clamp(g, 0, 1), tx = x - 30 * s, ty = y + 20 * s; const rt = gg > 0 ? sp * (0.35 + 3.2 * Math.sqrt(gg)) : 0; // straal van de kluwen
  const ret = { tumor: [tx, ty - rt], apoptose: [x + RV * 0.45, y - RV * 0.4], membraan: [x - RV * 0.7, y + RV * 0.72] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // punten: gewone cellen op een verstoord rooster, weggeduwd door de kluwen; tumorcellen dichter opeen erin
  const pts = [], soort = [];
  for (let r = -8; r <= 8; r++) for (let c = -8; c <= 8; c++) { let px = x + (c + (r % 2 ? 0.5 : 0)) * sp + (hash(r * 31 + c) - 0.5) * sp * 0.45, py = y + r * sp * 0.87 + (hash(r * 17 + c * 3) - 0.5) * sp * 0.4;
    if (Math.hypot(px - x, py - y) > RV + sp * 1.5) continue; const dx = px - tx, dy = py - ty, d = Math.hypot(dx, dy) || 1;
    if (rt > 0) { const nd = d < rt * 1.05 ? rt * 1.05 + (d / (rt * 1.05)) * sp * 0.35 : d + rt * 0.8 * Math.exp(-(d - rt) / (sp * 2.2)) * 0.5; px = tx + dx / d * nd; py = ty + dy / d * nd; }
    pts.push([px, py]); soort.push(0); }
  if (rt > 0) { const n = Math.max(1, Math.round((rt / (sp * 0.5)) ** 2 * 1.25)); for (let i = 0; i < n; i++) { const an = i * 2.39996, d = Math.sqrt((i + 0.5) / n) * rt * 1.02; pts.push([tx + Math.cos(an) * d + (hash(i * 5.5) - 0.5) * sp * 0.2, ty + Math.sin(an) * d + (hash(i * 7.7) - 0.5) * sp * 0.2]); soort.push(1); } }
  // apoptose-cel: het gewone punt dat het dichtst bij ret.apoptose ligt
  let api = -1, best = 1e9; pts.forEach((p, i) => { if (soort[i]) return; const d = Math.hypot(p[0] - ret.apoptose[0], p[1] - ret.apoptose[1]); if (d < best) { best = d; api = i; } });
  // bindweefsel-achtergrond in de uitsnede
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, RV, 0, 6.283); ctx.fillStyle = '#251F33'; ctx.fill(); ctx.clip();
  pts.forEach((p, i) => { if (Math.hypot(p[0] - x, p[1] - y) > RV + sp * 1.2) return; const poly = _tgbVoronoi(pts, i, sp * (soort[i] ? 1.2 : 1.6)); if (poly.length < 3) return;
    if (i === api && apoptose > 0.001) { // cel ruimt zichzelf op: krimpt, blaasjes, valt in ingepakte stukjes
      const ap = clamp(apoptose, 0, 1), k = ease(clamp(ap / 0.3, 0, 1)), bleb = clamp((ap - 0.3) / 0.4, 0, 1), uit = ease(clamp((ap - 0.7) / 0.3, 0, 1)); const c0 = _tgbVorm(ctx, poly, 1.5 * s, sp * 0.2); ret.apoptose = c0;
      ctx.fillStyle = '#251F33'; ctx.fill();
      const rr = sp * lerp(0.42, 0.26, k);
      if (uit < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - uit; ctx.beginPath(); ctx.arc(c0[0], c0[1], rr, 0, 6.283); shape(ctx, _TGB.cel, _TGB.rand, lw);
        for (let j = 0; j < 7; j++) { const u = j / 7 * 6.283, b = bleb * (0.6 + 0.4 * hash(j * 3)); if (b < 0.05) continue; ctx.beginPath(); ctx.arc(c0[0] + Math.cos(u) * rr, c0[1] + Math.sin(u) * rr, sp * 0.09 * b, 0, 6.283); shape(ctx, _TGB.cel, _TGB.rand, lw); }
        if (ap < 0.45) { ctx.beginPath(); ctx.arc(c0[0], c0[1], rr * 0.45, 0, 6.283); shape(ctx, ap > 0.2 ? '#3E2E66' : _TGB.kern, _TGB.kernR, lw); }
        else for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(c0[0] + (j - 1.5) * rr * 0.28, c0[1] + (j % 2 ? 1 : -1) * rr * 0.18, rr * 0.16, 0, 6.283); shape(ctx, '#3E2E66', _TGB.kernR, lw); }
        ctx.restore(); }
      if (uit > 0.001) { ctx.save(); ctx.globalAlpha *= uit; for (let j = 0; j < 5; j++) { const an = j * 1.3 + 0.3, d = sp * 0.22 * (0.4 + hash(j)); const r2 = sp * (0.09 + 0.05 * hash(j * 2)); ctx.beginPath(); ctx.arc(c0[0] + Math.cos(an) * d, c0[1] + Math.sin(an) * d, r2, 0, 6.283); shape(ctx, _TGB.cel, _TGB.rand, lw); if (j % 2 === 0) { ctx.beginPath(); ctx.arc(c0[0] + Math.cos(an) * d, c0[1] + Math.sin(an) * d, r2 * 0.45, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); } } ctx.restore(); }
      return; }
    const tum = soort[i] === 1; const c0 = _tgbVorm(ctx, poly, 1.4 * s, sp * (tum ? 0.25 : 0.18)); shape(ctx, tum ? _TGB.tum : _TGB.cel, tum ? _TGB.tumR : _TGB.rand, lw);
    const kr = tum ? sp * (0.2 + 0.08 * hash(i * 3.3)) : sp * 0.17;
    if (tum && hash(i * 9.1) < 0.2) { ctx.strokeStyle = '#2E2050'; ctx.lineWidth = Math.max(1, sp * 0.06); ctx.lineCap = 'round'; for (let k2 = 0; k2 < 3; k2++) { const yy = c0[1] + (k2 - 1) * kr * 0.5; ctx.beginPath(); ctx.moveTo(c0[0] - kr * 0.3, yy - kr * 0.15); ctx.lineTo(c0[0] + kr * 0.3, yy + kr * 0.15); ctx.moveTo(c0[0] + kr * 0.3, yy - kr * 0.15); ctx.lineTo(c0[0] - kr * 0.3, yy + kr * 0.15); ctx.stroke(); } }
    else { const kp = []; for (let k2 = 0; k2 < 10; k2++) { const u = k2 / 10 * 6.283, w = tum ? 0.25 : 0.06; kp.push([c0[0] + Math.cos(u) * kr * (1 + w * (hash(i * 13 + k2) - 0.5) * 2), c0[1] + Math.sin(u) * kr * 0.9 * (1 + w * (hash(i * 11 + k2) - 0.5) * 2)]); }
      ctx.beginPath(); bioPad(ctx, kp, true); shape(ctx, tum ? _TGB.tumK : _TGB.kern, _TGB.kernR, lw); } });
  ctx.restore();
  ctx.beginPath(); ctx.arc(x, y, RV, 0, 6.283); ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = Math.max(1.5, 2.5 * s); ctx.stroke();
  ctx.restore(); return ret;
}
