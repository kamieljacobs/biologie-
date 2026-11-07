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
// Definitief (Kamiel 28 okt 2026): basis = variant A (zijaanzicht van een dekweefsel: één laag eenvoudige cilindrische
// cellen op een licht gebogen basaalmembraan, bindweefsel met haarvat eronder), met de ronde tumor uit variant B: een
// ronde kluwen van veelhoekige cellen die zonder overlap tegen elkaar liggen (Voronoi), grote donkere kernen, enkele in
// deling. De kluwen duwt de gewone cellen opzij (die worden niet overlapt). Vanaf o.g > 0,75 groeit hij door een
// zichtbare opening in het basaalmembraan het bindweefsel in (invasie; bron: J Clin Pathol 2023 76(1):11 en MeSH
// 'Carcinoma in situ': zolang het basaalmembraan heel is = in situ).
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
  // ronde kluwen (uit B): cirkel waarvan het midden boven het membraan ligt; alleen bij invasie loopt hij eronder door
  const b0t = by(tumX), Rt = n > 0 ? cw * (0.5 + 2.0 * Math.sqrt(gg)) : 0, cyT = b0t - Rt * 0.42, dT = Rt * 0.5 * inval, wl = Rt * 0.55;
  const vorm = (nieuw = true) => { if (nieuw) ctx.beginPath(); // bovenste deel van de cirkel tot op het membraan, plus lob eronder bij invasie
    const h = (b0t - cyT) / Rt, a0 = Math.asin(clamp(h, -1, 1)); // hoek waar de cirkel het membraan raakt
    for (let i = 0; i <= 48; i++) { const u = Math.PI - a0 + i / 48 * (Math.PI + 2 * a0); const px = tumX + Math.cos(u) * Rt, py = Math.min(by(px), cyT + Math.sin(u) * Rt); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    if (dT > 1) { ctx.lineTo(tumX + wl, by(tumX + wl)); for (let i = 0; i <= 24; i++) { const u = i / 24 * Math.PI; ctx.lineTo(tumX + Math.cos(u) * wl, b0t + 2 * s + Math.sin(u) * dT); } }
    ctx.closePath(); };
  // basaalmembraan; bij invasie een duidelijke opening waar de kluwen doorheen gaat
  ctx.strokeStyle = _TG.bm; ctx.lineWidth = Math.max(1.5, 3 * s); const gw = wl * inval, gap0 = tumX - gw, gap1 = tumX + gw;
  for (const [p0, p1] of (inval > 0.02 ? [[x - W / 2, gap0], [gap1, x + W / 2]] : [[x - W / 2, x + W / 2]])) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const px = lerp(p0, p1, i / 30); i ? ctx.lineTo(px, by(px) + 2 * s) : ctx.moveTo(px, by(px) + 2 * s); } ctx.stroke(); }
  if (inval > 0.02) for (const [ex, sd] of [[gap0, 1], [gap1, -1]]) { const ey = by(ex) + 2 * s; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + sd * 3 * s, ey + 8 * s * inval, ex - sd * 2 * s, ey + 14 * s * inval); ctx.stroke(); } // uiteinden buigen omlaag
  // gewone cellen: cilindrisch, één laag, kern onderin; onder en naast de kluwen weggedrukt (niet overlapt)
  ctx.save(); if (n > 0) { ctx.beginPath(); ctx.rect(x - W, y - 1000 * s, 2 * W, 2000 * s); vorm(false); ctx.clip('evenodd'); }
  for (let i = 0; i < N; i++) { const cx0 = x + (i - N / 2 + 0.5) * cw; if (n > 0 && Math.abs(cx0 - tumX) < Rt * 0.75) continue;
    const push = n > 0 ? Math.max(0, 1 - (Math.abs(cx0 - tumX) - Rt * 0.75) / (cw * 2.2)) * Math.min(1, n / 10) : 0; const sx = Math.sign(cx0 - tumX) * push * cw * 0.15, cx = cx0 + sx; const b0 = by(cx);
    if (i === 2 && apoptose > 0.001) { _tgApoptose(ctx, cx, b0, cw * 0.92, ch, apoptose, lw); continue; }
    const pts = [[cx - cw / 2 + 1.5 * s, b0], [cx + cw / 2 - 1.5 * s, b0], [cx + cw / 2 - 2 * s, b0 - ch], [cx - cw / 2 + 2 * s, b0 - ch]];
    ctx.beginPath(); ctx.moveTo((pts[0][0] + pts[1][0]) / 2, pts[0][1]); for (let k = 1; k <= 4; k++) { const p = pts[k % 4], q = pts[(k + 1) % 4]; ctx.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, cw * 0.22); } ctx.closePath(); shape(ctx, _TG.cel, _TG.rand, lw);
    ctx.beginPath(); ctx.ellipse(cx, b0 - ch * 0.3, cw * 0.24, ch * 0.13, 0, 0, 6.283); shape(ctx, _TG.kern, _TG.kernR, lw); }
  ctx.restore();
  // tumorcellen (uit B): veelhoeken zonder overlap binnen de ronde vorm
  if (n > 0) { const sp = cw * 0.72, pts = []; const m = Math.max(1, Math.round(Math.PI * Rt * Rt / (sp * sp * 0.9)));
    for (let i = 0; i < m; i++) { const an = i * 2.39996, d = Math.sqrt((i + 0.5) / m) * Rt * 1.02; const px = tumX + Math.cos(an) * d + (hash(i * 5.5) - 0.5) * sp * 0.2, py = cyT + Math.sin(an) * d + (hash(i * 7.7) - 0.5) * sp * 0.2; if (py < by(px) - sp * 0.12) pts.push([px, py]); } // alleen boven het membraan
    if (dT > 1) { const nl = Math.max(2, Math.round(wl * 2 / sp)); for (let i = 0; i < nl; i++) { const u = (i + 0.5) / nl * Math.PI; pts.push([tumX + Math.cos(u) * wl * 0.55, b0t + Math.sin(u) * dT * 0.55 + 4 * s]); } }
    const echt = pts.length; // spookpunten net buiten de rand: zo worden de randcellen even groot als de rest (niet getekend)
    { const ng = Math.round(6.283 * Rt * 1.22 / sp); for (let i = 0; i < ng; i++) { const an = i / ng * 6.283; pts.push([tumX + Math.cos(an) * Rt * 1.22, cyT + Math.sin(an) * Rt * 1.22]); } }
    if (dT > 1) for (let i = 0; i <= 6; i++) { const u = i / 6 * Math.PI; pts.push([tumX + Math.cos(u) * wl * 1.3, b0t + Math.sin(u) * dT * 1.3 + 4 * s]); }
    ctx.save(); vorm(); ctx.fillStyle = _mixHex(_TG.tum, '#1A2740', 0.35); ctx.fill(); ctx.clip(); // dichte achtergrond: geen donkere gaten aan de rand
    pts.forEach((p, i) => { if (i >= echt) return; const poly = _tgbVoronoi(pts, i, sp * 1.4); if (poly.length < 3) return; const c0 = _tgbVorm(ctx, poly, 1.3 * s, sp * 0.25); shape(ctx, _TG.tum, _TG.tumR, lw);
      const kr = sp * (0.2 + 0.08 * hash(i * 3.3));
      if (hash(i * 9.1) < 0.18) _tgDeling(ctx, c0[0], c0[1], kr * 1.3, lw);
      else { const kp = []; for (let k2 = 0; k2 < 10; k2++) { const u = k2 / 10 * 6.283; kp.push([c0[0] + Math.cos(u) * kr * (1 + 0.25 * (hash(i * 13 + k2) - 0.5) * 2), c0[1] + Math.sin(u) * kr * 0.9 * (1 + 0.25 * (hash(i * 11 + k2) - 0.5) * 2)]); }
        ctx.beginPath(); bioPad(ctx, kp, true); shape(ctx, _TG.tumK, _TG.kernR, lw); } });
    ctx.restore(); vorm(); ctx.strokeStyle = rgba(_TG.tumR, 0.7); ctx.lineWidth = lw; ctx.stroke();
    ret.tumor = [tumX, cyT - Rt - 6 * s]; }
  ctx.restore(); return ret;
}
