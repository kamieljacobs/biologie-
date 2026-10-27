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
// Stijl A: zijaanzicht van een dekweefsel (één laag cilindrische cellen op een licht gebogen basaalmembraan, haarvat
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
  // basaalmembraan (gaat open waar de tumor doorbreekt)
  ctx.strokeStyle = _TG.bm; ctx.lineWidth = Math.max(1.5, 3 * s); const gap0 = tumX - cw * 0.9 * inval, gap1 = tumX + cw * 0.9 * inval;
  for (const [p0, p1] of (inval > 0.02 ? [[x - W / 2, gap0], [gap1, x + W / 2]] : [[x - W / 2, x + W / 2]])) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const px = lerp(p0, p1, i / 30); i ? ctx.lineTo(px, by(px) + 2 * s) : ctx.moveTo(px, by(px) + 2 * s); } ctx.stroke(); }
  // gewone cellen: cilindrisch, één laag, kern onderin
  for (let i = 0; i < N; i++) { const cx = x + (i - N / 2 + 0.5) * cw; const b0 = by(cx); if (i === mid && n > 0) continue;
    const push = n > 0 ? Math.max(0, 1 - Math.abs(cx - tumX) / (cw * 2.4)) * Math.min(1, n / 10) : 0; const sx = Math.sign(cx - tumX) * push * cw * 0.18;
    if (i === 2 && apoptose > 0.001) { _tgApoptose(ctx, cx, b0, cw * 0.92, ch, apoptose, lw); continue; }
    const pts = [[cx - cw / 2 + 1.5 * s + sx, b0], [cx + cw / 2 - 1.5 * s + sx, b0], [cx + cw / 2 - 2 * s + sx * 1.3, b0 - ch * (1 - push * 0.15)], [cx - cw / 2 + 2 * s + sx * 1.3, b0 - ch * (1 - push * 0.15)]];
    ctx.beginPath(); ctx.moveTo((pts[0][0] + pts[1][0]) / 2, pts[0][1]); for (let k = 1; k <= 4; k++) { const p = pts[k % 4], q = pts[(k + 1) % 4]; ctx.arcTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, cw * 0.22); } ctx.closePath(); shape(ctx, _TG.cel, _TG.rand, lw);
    ctx.beginPath(); ctx.ellipse(cx + sx * 1.1, b0 - ch * 0.3, cw * 0.24, ch * 0.13, 0, 0, 6.283); shape(ctx, _TG.kern, _TG.kernR, lw); }
  // tumor: kluwen die vanaf de plek van de gemuteerde cel opstapelt (koepel) en bij invasie onder het membraan door gaat
  if (n > 0) { const cells = []; const sp = cw * 0.8; const nb = Math.round(n * 0.18 * inval);
    for (let r = 0; r < 14 && cells.length < n + 60; r++) for (let c = -10; c <= 10; c++) { const px = tumX + (c + (r % 2) * 0.5) * sp, py = by(tumX) - sp * 0.55 - r * sp * 0.82; cells.push([px, py, Math.hypot((px - tumX) / 1.15, (py - by(tumX)) * 1.0)]); }
    cells.sort((A2, B2) => A2[2] - B2[2]); const top = cells.slice(0, n - nb);
    for (let i = 0; i < nb; i++) top.push([tumX + (i - nb / 2 + 0.5) * sp * 0.9, by(tumX) + sp * (0.6 + 0.3 * (i % 2)), 0]);
    top.forEach(([px, py], i) => { const jx = (hash(i * 3.3) - 0.5) * sp * 0.25, jy = (hash(i * 5.1) - 0.5) * sp * 0.2, rr = sp * (0.5 + 0.18 * hash(i * 2.2));
      _tgBlob(ctx, px + jx, py + jy, rr * (0.95 + 0.25 * hash(i)), rr * (0.85 + 0.2 * hash(i + 9)), i * 7 + 3, _TG.tum, _TG.tumR, lw, 0.18);
      if (hash(i * 9.7) < 0.22 && rr > 6) _tgDeling(ctx, px + jx, py + jy, rr * 0.7, lw);
      else _tgBlob(ctx, px + jx + rr * 0.05, py + jy, rr * (0.42 + 0.15 * hash(i * 4)), rr * (0.38 + 0.12 * hash(i * 6)), i * 5 + 1, _TG.tumK, _TG.kernR, lw, 0.25); });
    ret.tumor = [tumX, Math.min(...top.map(p => p[1])) - sp * 0.2]; }
  ctx.restore(); return ret;
}
