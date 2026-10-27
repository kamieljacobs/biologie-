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
// Stijl C (ronde 2): zijaanzicht als A, maar de tumorcellen liggen netjes tegen elkaar zonder overlap (veelhoeken
// uit een Voronoi-indeling binnen de koepel, zoals het bovenaanzicht) en het basaalmembraan is zichtbaar doorbroken:
// de uiteinden krullen om bij de opening en de kluwen groeit erdoor het bindweefsel in.
// Basis: zijaanzicht van een dekweefsel (één laag cilindrische cellen op een licht gebogen basaalmembraan, haarvat
// eronder). Met o.g groeit uit één cel een opstapelende kluwen; vanaf o.g > 0,75 breekt hij door het basaalmembraan.
// Aanroep: tumorGroei(ctx, x, y, s, o) — (x, y) = midden van het basaalmembraan, s = 1 → ± 600 × 380 px. o.g 0..1,
// o.apoptose 0..1 (cel links in de rij), o.t. Geeft { tumor, apoptose, membraan } terug.
// =====================================================================================
const _TG = { cel: '#3A4A66', rand: '#9FB4CC', kern: '#6E5A9E', kernR: '#A392D6', tum: '#7A4E6E', tumR: '#D9A0C0', tumK: '#4E3A7A', bm: '#C9B896' };
function _tgBlob(ctx, x, y, rx, ry, seed, fill, rand, lw, wob = 0.12) { const p = []; for (let i = 0; i < 14; i++) { const u = i / 14 * 6.283; const k = 1 + wob * (hash(seed + i) - 0.5) * 2; p.push([x + Math.cos(u) * rx * k, y + Math.sin(u) * ry * k]); } ctx.beginPath(); bioPad(ctx, p, true); shape(ctx, fill, rand, lw); }
function _tgDeling(ctx, x, y, r, lw) { ctx.strokeStyle = '#2E2050'; ctx.lineWidth = Math.max(1.2, r * 0.14); ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const yy = y + (k - 1) * r * 0.32; ctx.beginPath(); ctx.moveTo(x - r * 0.2, yy - r * 0.12); ctx.lineTo(x + r * 0.2, yy + r * 0.12); ctx.moveTo(x + r * 0.2, yy - r * 0.12); ctx.lineTo(x - r * 0.2, yy + r * 0.12); ctx.stroke(); } }
function _tgApoptose(ctx, x, y, w, h, ap, lw) { // cel (breedte w, hoogte h, basis op y) die zichzelf opruimt
  const k = ease(clamp(ap / 0.3, 0, 1)), bleb = clamp((ap - 0.3) / 0.4, 0, 1), uit = ease(clamp((ap - 0.7) / 0.3, 0, 1));
  const cx = x, cy = y - h / 2, sw = w * lerp(1, 0.62, k), sh = h * lerp(1, 0.55, k);
  if (uit < 0.999) { ctx.save(); ctx.globalAlpha *= 1 - uit; _tgBlob(ctx, cx, cy + h * 0.15 * k, sw / 2, sh / 2, 71, _TG.cel, _TG.rand, lw, 0.06);
    for (let i = 0; i < 7; i++) { const u = i / 7 * 6.283 + 0.4, b = bleb * (0.6 + 0.4 * hash(i * 3)); if (b < 0.05) continue; ctx.beginPath(); ctx.arc(cx + Math.cos(u) * sw * 0.5, cy + h * 0.15 * k + Math.sin(u) * sh * 0.5, w * 0.12 * b, 0, 6.283); shape(ctx, _TG.cel, _TG.rand, lw); }
    const kr = w * lerp(0.26, 0.16, k); if (ap < 0.45) { ctx.beginPath(); ctx.arc(cx, cy + h * 0.15 * k, kr, 0, 6.283); shape(ctx, ap > 0.2 ? '#3E2E66' : _TG.kern, _TG.kernR, lw); }
    else for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(cx + (i - 1.5) * kr * 0.7, cy + h * 0.15 * k + (i % 2 ? 1 : -1) * kr * 0.4, kr * 0.4, 0, 6.283); shape(ctx, '#3E2E66', _TG.kernR, lw); }
    ctx.restore(); }
  if (uit > 0.001) { ctx.save(); ctx.globalAlpha *= uit; for (let i = 0; i < 5; i++) { const px = cx + (hash(i * 7) - 0.5) * w * 1.1, py = cy + h * 0.25 + (hash(i * 5 + 2) - 0.5) * h * 0.5 - uit * h * 0.15 * hash(i); const rr = w * (0.14 + 0.08 * hash(i * 2)); ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); shape(ctx, _TG.cel, _TG.rand, lw); if (i % 2 === 0) { ctx.beginPath(); ctx.arc(px, py, rr * 0.45, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); } } ctx.restore(); }
  return [cx, cy];
}
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
  const { a = 1, g = 0, apoptose = 0, t = 0 } = o; const lw = Math.max(1, 1.3 * s);
  const N = 13, W = 600 * s, cw = W / N, ch = 120 * s, Rb = 2600 * s; // basaalmembraan: flauwe boog
  const by = px => y + ((px - x) ** 2) / (2 * Rb);
  const gg = clamp(g, 0, 1), n = gg > 0 ? 1 + Math.round(gg * 34) : 0, mid = 7, inval = ease(clamp((gg - 0.75) / 0.25, 0, 1));
  const tumX = x + (mid - N / 2 + 0.5) * cw;
  const ret = { tumor: [tumX, y - ch * 1.2], apoptose: [x + (2 - N / 2 + 0.5) * cw, y - ch / 2], membraan: [x - W * 0.35, by(x - W * 0.35) + 8 * s] };
  if (a <= 0.01) return ret; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  // lederhuid/bindweefsel met een haarvat onder het membraan
  ctx.beginPath(); ctx.moveTo(x - W / 2, by(x - W / 2)); for (let i = 1; i <= 20; i++) { const px = x - W / 2 + W * i / 20; ctx.lineTo(px, by(px)); } ctx.lineTo(x + W / 2, y + 150 * s); ctx.lineTo(x - W / 2, y + 150 * s); ctx.closePath(); ctx.fillStyle = rgba('#3A3040', 0.5); ctx.fill();
  ctx.strokeStyle = rgba('#C9A890', 0.3); ctx.lineWidth = Math.max(0.8, s); for (let i = 0; i < 9; i++) { const yy = y + (40 + i * 12) * s; ctx.beginPath(); ctx.moveTo(x - W / 2, yy + 10 * s * Math.sin(i)); ctx.bezierCurveTo(x - W / 6, yy - 12 * s, x + W / 6, yy + 14 * s, x + W / 2, yy - 6 * s); ctx.stroke(); }
  bloedvat(ctx, [[x - W / 2, y + 105 * s], [x - W / 6, y + 95 * s], [x + W / 5, y + 112 * s], [x + W / 2, y + 100 * s]], 13 * s, t, { n: 7, cel: 9 * s });
  // vorm van de kluwen: koepel boven het membraan + lob eronder bij invasie
  const wT = n > 0 ? cw * (0.6 + 1.7 * Math.sqrt(gg)) : 0, hT = n > 0 ? ch * (0.75 + 0.85 * Math.sqrt(gg)) : 0, dT = ch * 0.7 * inval, b0t = by(tumX);
  const koepel = (nieuw = true) => { if (nieuw) ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = Math.PI + i / 40 * Math.PI; const px = tumX + Math.cos(u) * wT; const py = Math.min(by(px), b0t + Math.sin(u) * hT); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    if (dT > 1) { const wl = wT * 0.62; ctx.lineTo(tumX + wl, by(tumX + wl)); for (let i = 0; i <= 24; i++) { const u = i / 24 * Math.PI; ctx.lineTo(tumX + Math.cos(u) * wl, b0t + 2 * s + Math.sin(u) * dT); } }
    ctx.closePath(); };
  const cols = []; for (let i = 0; i < N; i++) cols.push(x + (i - N / 2 + 0.5) * cw);
  ctx.save(); if (n > 0) { ctx.beginPath(); ctx.rect(x - W, y - 1000 * s, 2 * W, 2000 * s); koepel(false); ctx.clip('evenodd'); }
  for (let i = 0; i < N; i++) { const cx = cols[i]; if (n > 0 && Math.abs(cx - tumX) < wT - cw * 0.3) continue; // onder de kluwen verdrongen
    const xl = cx - cw / 2, xr = cx + cw / 2, w2 = cw; const b0 = by(cx);
    if (i === 2 && apoptose > 0.001) { _tgApoptose(ctx, cx, b0, w2 * 0.92, ch, apoptose, lw); continue; }
    const pts = [[xl + 1.5 * s, b0], [xr - 1.5 * s, b0], [xr - 2 * s, b0 - ch], [xl + 2 * s, b0 - ch]];
    ctx.beginPath(); ctx.moveTo((pts[0][0] + pts[1][0]) / 2, pts[0][1]); for (let k = 1; k <= 4; k++) { const p = pts[k % 4], q = pts[(k + 1) % 4]; ctx.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.min(cw * 0.22, w2 * 0.3)); } ctx.closePath(); shape(ctx, _TG.cel, _TG.rand, lw);
    ctx.beginPath(); ctx.ellipse(cx, b0 - ch * 0.3, Math.min(cw * 0.24, w2 * 0.32), ch * 0.13, 0, 0, 6.283); shape(ctx, _TG.kern, _TG.kernR, lw); }
  ctx.restore();
  // tumor: veelhoekige cellen zonder overlap binnen de koepel (en de lob onder het membraan)
  if (n > 0) { const pts = []; const sp = cw * 0.78; const m = Math.max(1, n + Math.round(n * 0.25 * inval));
    for (let i = 0; i < m; i++) { const f2 = (i + 0.5) / m, an = Math.PI + ((i * 0.618034) % 1) * Math.PI, rr = Math.sqrt(f2); pts.push([tumX + Math.cos(an) * wT * rr * 0.92, b0t + Math.sin(an) * hT * rr * 0.92 - 3 * s]); }
    for (let i = 0; i < Math.round(n * 0.2 * inval); i++) { const u = (i + 0.5) / Math.max(1, Math.round(n * 0.2 * inval)) * Math.PI; pts.push([tumX + Math.cos(u) * wT * 0.32, b0t + Math.sin(u) * dT * 0.55 + 4 * s]); }
    ctx.save(); koepel(); ctx.clip();
    pts.forEach((p, i) => { const poly = _tgbVoronoi(pts, i, sp * 1.4); if (poly.length < 3) return; const c0 = _tgbVorm(ctx, poly, 1.4 * s, sp * 0.22); shape(ctx, _TG.tum, _TG.tumR, lw);
      const kr = sp * (0.2 + 0.08 * hash(i * 3.3));
      if (hash(i * 9.7) < 0.22) _tgDeling(ctx, c0[0], c0[1], kr * 1.3, lw);
      else _tgBlob(ctx, c0[0], c0[1], kr * 1.1, kr * 0.95, i * 5 + 1, _TG.tumK, _TG.kernR, lw, 0.25); });
    ctx.restore(); koepel(); ctx.strokeStyle = rgba(_TG.tumR, 0.7); ctx.lineWidth = lw; ctx.stroke();
    ret.tumor = [tumX, b0t - hT - 6 * s]; }
  // basaalmembraan; bij invasie een opening met omgekrulde, gerafelde uiteinden
  ctx.strokeStyle = _TG.bm; ctx.lineWidth = Math.max(1.5, 3 * s); const gw = wT * 0.62 * (0.75 + 0.25 * inval), gap0 = tumX - gw, gap1 = tumX + gw;
  for (const [p0, p1] of (inval > 0.02 ? [[x - W / 2, gap0], [gap1, x + W / 2]] : [[x - W / 2, x + W / 2]])) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const px = lerp(p0, p1, i / 30); i ? ctx.lineTo(px, by(px) + 2 * s) : ctx.moveTo(px, by(px) + 2 * s); } ctx.stroke(); }
  if (inval > 0.02) for (const [ex, sd] of [[gap0, 1], [gap1, -1]]) { const ey = by(ex) + 2 * s; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex - sd * 10 * s, ey + 14 * s * inval, ex + sd * 4 * s, ey + 26 * s * inval); ctx.stroke();
    ctx.lineWidth = Math.max(1, 1.5 * s); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(ex - sd * k * 5 * s, ey); ctx.lineTo(ex - sd * k * 5 * s + sd * 4 * s, ey + (6 + k * 2) * s * inval); ctx.stroke(); } ctx.lineWidth = Math.max(1.5, 3 * s); }
  ctx.restore(); return ret;
}
