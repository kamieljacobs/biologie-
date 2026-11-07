// Transport 6 · Transport in planten — scènes per alinea.
// Betekeniskleuren: water TR.water (teal), suikers TR.suiker (oker), plant groen; goud = focus.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A211C', shirt: '#4F7A6A', hairStyle: 'short' };
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const fade = (q, w1, w2, n1 = 1, n2 = 1) => q.on(w1, n1) * (1 - (w2 ? q.on(w2, n2) : 0));
const wissel = (q, w, n = 1) => { const a = q.at(w, n); return { uit: ramp(q.localT, a, 0.35), in: ramp(q.localT, a + 0.3, 0.45) }; };
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function mixHex(a, b, k) { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); k = clamp(k, 0, 1); return '#' + [16, 8, 0].map(sh => Math.round(lerp((A >> sh) & 255, (B >> sh) & 255, k)).toString(16).padStart(2, '0')).join(''); }

const PL = { stengel: '#4E8A5C', stengelR: '#7FC48F', blad: '#5E9E6C', bladSlap: '#7C9468', aarde: '#5A4030', aardeR: '#7A5A44', pot: '#9A5E46', potR: '#C08068',
  hout: '#C9B896', bast: '#6E5442', bastR: '#8C6E58', wortel: '#D9C9A8', korrel: '#6B5A48', korrelR: '#8C7A64', co2: '#AFC0D0', dood: '#7A6E5E', vrucht: '#A8C07A' };

// ---------- deeltjes ----------
function wDot(ctx, x, y, r = 6) { ctx.fillStyle = TR.water; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function sDot(ctx, x, y, r = 8) { hexagon(ctx, x, y, r, rgba(TR.suiker, 0.85), lighten(TR.suiker, 0.35), 1.2); }
function cDot(ctx, x, y, r = 6) { ctx.fillStyle = PL.co2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function mDot(ctx, x, y, r = 6) { roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 2); shape(ctx, rgba(V.neutraal, 0.85), lighten(V.neutraal, 0.4), 1); }
// deeltjes langs een polylijn (zonder gladmaken); draw(x, y)
function stroomDots(ctx, pts, n, t, speed, draw, seed = 0, a = 1) {
  if (a <= 0.01 || pts.length < 2) return; const L = _polyLen(pts); ctx.save();
  for (let k = 0; k < n; k++) { const u = ((t * speed / L) + hash(k * 7 + seed)) % 1; const p = padPunt(pts, u, false); ctx.save(); ctx.globalAlpha *= a * clamp(Math.min(u, 1 - u) * 10, 0, 1); draw(p[0], p[1], k); ctx.restore(); }
  ctx.restore(); }
function pijl(ctx, x0, y0, x1, y1, col, a = 1, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); const k = 10 + lw * 2.4;
  ctx.beginPath(); ctx.moveTo(x1 - Math.cos(an - 0.5) * k, y1 - Math.sin(an - 0.5) * k); ctx.lineTo(x1, y1); ctx.lineTo(x1 - Math.cos(an + 0.5) * k, y1 - Math.sin(an + 0.5) * k); ctx.stroke(); ctx.restore(); }

// ---------- Macro: kamer met raam en vensterbank ----------
function kamer(ctx, avond) {
  ctx.fillStyle = mixHex('#2A3B58', '#141C2E', avond); ctx.fillRect(0, 0, W, H);
  ctx.save(); roundRect(ctx, 520, 90, 880, 560, 6); ctx.fillStyle = mixHex('#4F82AE', '#18213A', avond); ctx.fill(); ctx.clip();
  const sy = lerp(230, 640, avond); ctx.save(); ctx.globalAlpha = 1 - avond * 0.8; ctx.fillStyle = '#F2D58A'; ctx.beginPath(); ctx.arc(1210, sy, 62, 0, 6.283); ctx.fill(); ctx.restore();
  if (avond > 0.01) { ctx.save(); ctx.globalAlpha = avond; ctx.fillStyle = '#E6E1D3'; ctx.beginPath(); ctx.arc(720, 220, 38, 0, 6.283); ctx.fill(); ctx.fillStyle = mixHex('#4F82AE', '#18213A', avond); ctx.beginPath(); ctx.arc(738, 208, 34, 0, 6.283); ctx.fill();
    for (let i = 0; i < 14; i++) { ctx.fillStyle = rgba('#E6E1D3', 0.6); ctx.beginPath(); ctx.arc(560 + hash(i * 3) * 800, 110 + hash(i * 3 + 1) * 260, 2.2, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.fillStyle = mixHex('#3A6048', '#1E3028', avond); ctx.beginPath(); ctx.moveTo(520, 560); ctx.quadraticCurveTo(760, 470, 980, 540); ctx.quadraticCurveTo(1180, 600, 1400, 500); ctx.lineTo(1400, 650); ctx.lineTo(520, 650); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = '#C8CFDA'; ctx.lineWidth = 18; roundRect(ctx, 520, 90, 880, 560, 6); ctx.stroke(); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(960, 90); ctx.lineTo(960, 650); ctx.moveTo(520, 340); ctx.lineTo(1400, 340); ctx.stroke();
  roundRect(ctx, 430, 640, 1060, 46, 6); shape(ctx, '#B8A88A', '#D6C8A8', 2); ctx.fillStyle = '#8C7E66'; ctx.fillRect(450, 686, 1020, 20);
}
function bladVorm(ctx, bx, by, dx, dy, L, w, fill, stroke, curl = 0) {
  const tx = bx + dx * L, ty = by + dy * L + curl * L * 0.22; const nx = -dy, ny = dx; const mx = (bx + tx) / 2, my = (by + ty) / 2;
  ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx + nx * w, my + ny * w, tx, ty); ctx.quadraticCurveTo(mx - nx * w, my - ny * w, bx, by); ctx.closePath(); shape(ctx, fill, stroke, 1.5);
  ctx.strokeStyle = rgba('#DFF2E2', 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx, my + curl * L * 0.05, tx, ty); ctx.stroke(); }
// potplant; y = bovenkant pot; slap 0 (recht) .. 1 (slap)
function potPlant(ctx, x, y, s, slap, t, nat = 0) {
  ctx.beginPath(); ctx.moveTo(x - 105 * s, y); ctx.lineTo(x + 105 * s, y); ctx.lineTo(x + 82 * s, y + 150 * s); ctx.lineTo(x - 82 * s, y + 150 * s); ctx.closePath(); shape(ctx, PL.pot, PL.potR, 2);
  roundRect(ctx, x - 118 * s, y - 20 * s, 236 * s, 32 * s, 8 * s); shape(ctx, PL.pot, PL.potR, 2);
  ctx.fillStyle = PL.aarde; ctx.beginPath(); ctx.ellipse(x, y - 18 * s, 102 * s, 11 * s, 0, 0, 6.283); ctx.fill();
  if (nat > 0.01) { ctx.save(); ctx.globalAlpha *= nat; for (let i = 0; i < 9; i++) wDot(ctx, x - 80 * s + i * 20 * s, y - 18 * s + (hash(i) - 0.5) * 8 * s, 4 * s); ctx.restore(); }
  const b = [x, y - 18 * s], top = [x + slap * 80 * s, y - 400 * s + slap * 110 * s], ctl = [x - slap * 10 * s, y - 250 * s];
  const pt = (u) => { const a = (1 - u) * (1 - u), m = 2 * u * (1 - u), c = u * u; return [a * b[0] + m * ctl[0] + c * top[0], a * b[1] + m * ctl[1] + c * top[1]]; };
  ctx.strokeStyle = PL.stengel; ctx.lineWidth = 14 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.quadraticCurveTo(ctl[0], ctl[1], top[0], top[1]); ctx.stroke();
  const col = mixHex(PL.blad, PL.bladSlap, slap);
  [0.28, 0.42, 0.56, 0.7, 0.84, 0.97].forEach((u, i) => { const p = pt(u); const sd = i % 2 ? 1 : -1; const ang = lerp(-0.6 + 0.04 * Math.sin(t * 1.2 + i), 1.05, slap);
    const L = (165 - 50 * u) * s; bladVorm(ctx, p[0], p[1], sd * Math.cos(ang), Math.sin(ang), L, L * 0.3, col, lighten(col, 0.25), slap); });
  return { top };
}

// ---------- Schema: hele plant met vaten ----------
const PL_BLAD = [{ b: [0, -170], tip: [-250, -250] }, { b: [0, -300], tip: [250, -380] }, { b: [0, -420], tip: [-215, -505] }];
const PL_WORTEL = [[[0, 0], [-6, 100], [-14, 215]], [[0, 30], [-70, 95], [-165, 160]], [[0, 60], [75, 125], [170, 185]], [[0, 15], [55, 45], [125, 62]], [[0, 110], [-45, 165], [-95, 225]]];
function plBladPt(i, f, dy = 0) { const B = PL_BLAD[i]; return [lerp(B.b[0], B.tip[0], f), lerp(B.b[1], B.tip[1], f) + dy]; }
function plPad(kind, i) {
  const B = PL_BLAD[i];
  if (kind === 'x') return [[-19, 215], [-11, 100], [-7, 0], [-7, B.b[1] + 5], plBladPt(i, 0.12, 5), plBladPt(i, 0.85, 5)];
  if (kind === 'f') return [plBladPt(i, 0.85, -5), plBladPt(i, 0.12, -5), [7, B.b[1] - 5], [7, 0], [-1, 100], [-9, 215]];
  if (kind === 'op') return [[-9, 215], [-1, 100], [7, 0], [7, -545]];
  if (kind === 'vrucht') return [plBladPt(1, 0.85, -5), plBladPt(1, 0.12, -5), [7, -295], [7, -240], [58, -216]];
  if (kind === 'top') return [plBladPt(1, 0.85, -5), plBladPt(1, 0.12, -5), [7, -305], [7, -545]];
}
function schemaPlant(ctx, X, Y, s, o = {}) {
  const { a = 1, t = 0, bodem = 1, xyl = 0, flo = 0, water = 0, omlaag = 0, omhoog = 0, naarVrucht = 0, naarTop = 0, vrucht = 1, nieuw = 0, oud = 1, hi = {}, maakSuiker = 0, opslag = 0, mineralen = 0, snel = 1 } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = (p) => [X + p[0] * s, Y + p[1] * s]; const PP = (arr) => arr.map(P);
  const line = (pts, col, lw, al = 1) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); PP(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); };
  if (bodem > 0.01) { ctx.save(); ctx.globalAlpha *= bodem; ctx.fillStyle = rgba(PL.aarde, 0.6); ctx.fillRect(X - 320 * s, Y, 640 * s, 250 * s); ctx.strokeStyle = PL.aardeR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X - 320 * s, Y); ctx.lineTo(X + 320 * s, Y); ctx.stroke(); ctx.restore(); }
  PL_WORTEL.forEach((w, i) => { line(w, PL.wortel, (i === 0 ? 14 : 9) * s); if (hi.wortels) line(w, C.goud, 3, hi.wortels); });
  line([[0, 20], [0, -548]], PL.stengel, 30 * s); line([[0, 20], [0, -548]], PL.stengelR, 1.5, 0.6);
  PL_BLAD.forEach((B, i) => { const dx = B.tip[0] - B.b[0], dy = B.tip[1] - B.b[1], L = Math.hypot(dx, dy); const p = P(B.b); ctx.save(); ctx.globalAlpha *= oud; bladVorm(ctx, p[0], p[1], dx / L, dy / L, L * s, 62 * s, rgba(C.groen, 0.42), C.groen); ctx.restore(); });
  if (nieuw > 0.01) { const p = P([0, -545]); for (const sd of [-1, 1]) bladVorm(ctx, p[0], p[1], sd * 0.7, -0.7, 110 * s * nieuw, 30 * s * nieuw, rgba(C.groen, 0.5), C.groen); }
  else { const p = P([0, -548]); ctx.beginPath(); ctx.ellipse(p[0], p[1] - 10 * s, 14 * s, 24 * s, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.6), C.groen, 1.5); }
  if (vrucht > 0.01) { ctx.save(); ctx.globalAlpha *= vrucht; line([[0, -235], [60, -215]], PL.stengel, 6 * s); const f = P([74, -184]); ctx.beginPath(); ctx.arc(f[0], f[1], 32 * s, 0, 6.283); shape(ctx, rgba(PL.vrucht, 0.7), PL.vrucht, 2); ctx.restore(); }
  // gouden markeringen
  if (hi.vrucht) { const f = P([74, -184]); ctx.save(); ctx.globalAlpha *= hi.vrucht; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(f[0], f[1], 46 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (hi.top) { const f = P([0, -555]); ctx.save(); ctx.globalAlpha *= hi.top; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(f[0], f[1], 50 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (hi.blad) { ctx.save(); ctx.globalAlpha *= hi.blad; PL_BLAD.forEach((B, i) => { const c = P(plBladPt(i, 0.55)); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(c[0], c[1], 150 * s, 80 * s, Math.atan2(B.tip[1] - B.b[1], B.tip[0] - B.b[0]), 0, 6.283); ctx.stroke(); }); ctx.restore(); }
  // vaten
  const vat = (pts, col, al) => line(pts, col, 5 * s + 1, al);
  if (xyl > 0.01) { for (let i = 0; i < 3; i++) vat(plPad('x', i), TR.water, xyl); PL_WORTEL.slice(1).forEach(w => vat(w.map(p => [p[0] - 4, p[1]]), TR.water, xyl * 0.8)); }
  if (flo > 0.01) { for (let i = 0; i < 3; i++) vat(plPad('f', i), TR.suiker, flo); vat([[7, -300], [7, -548]], TR.suiker, flo); if (vrucht > 0.01) vat(plPad('vrucht').slice(3), TR.suiker, flo * vrucht); }
  // suiker maken in de bladeren / opslag in de wortel
  if (maakSuiker > 0.01) { ctx.save(); ctx.globalAlpha *= maakSuiker * oud; PL_BLAD.forEach((B, i) => { for (let k = 0; k < 4; k++) { const p = P(plBladPt(i, 0.3 + k * 0.15, (k % 2 ? 1 : -1) * 22)); const w = wander(k + i * 9, t, 3, 1); sDot(ctx, p[0] + w.x, p[1] + w.y, 8 * Math.max(0.8, s)); } }); ctx.restore(); }
  if (opslag > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(opslag, 0, 1); const n = Math.round(2 + 6 * opslag); for (let k = 0; k < n; k++) { const p = P([-8 + (hash(k) - 0.5) * 18, 70 + k * 20]); sDot(ctx, p[0], p[1], 7 * Math.max(0.8, s)); } ctx.restore(); }
  // stromen
  const sp = 110 * s * snel;
  if (water > 0.01) { for (let i = 0; i < 3; i++) stroomDots(ctx, PP(plPad('x', i)), 9, t, sp, (x, y) => wDot(ctx, x, y, 6 * Math.max(0.8, s)), i * 13, water);
    PL_WORTEL.slice(1).forEach((w, j) => stroomDots(ctx, PP(w.map(p => [p[0] - 4, p[1]]).reverse()), 3, t, sp, (x, y) => wDot(ctx, x, y, 5 * Math.max(0.8, s)), 50 + j * 7, water)); }
  if (mineralen > 0.01) for (let i = 0; i < 3; i++) stroomDots(ctx, PP(plPad('x', i)), 3, t, sp, (x, y) => mDot(ctx, x, y, 5 * Math.max(0.8, s)), 80 + i * 5, mineralen);
  const sd = (x, y) => sDot(ctx, x, y, 7 * Math.max(0.8, s));
  if (omlaag > 0.01) for (let i = 0; i < 3; i++) stroomDots(ctx, PP(plPad('f', i)), 7, t, sp * 0.8, sd, 100 + i * 11, omlaag * oud);
  if (omhoog > 0.01) stroomDots(ctx, PP(plPad('op')), 12, t, sp * 0.8, sd, 140, omhoog);
  if (naarVrucht > 0.01) stroomDots(ctx, PP(plPad('vrucht')), 6, t, sp * 0.8, sd, 160, naarVrucht);
  if (naarTop > 0.01) stroomDots(ctx, PP(plPad('top')), 6, t, sp * 0.8, sd, 180, naarTop);
  ctx.restore();
}
function plantPunt(X, Y, s, p) { return [X + p[0] * s, Y + p[1] * s]; }

// ---------- stengel en vaatbundel ----------
function stengelDoorsnede(ctx, x, y, r, o = {}) { const { a = 1, hi = 0, xyl = 0, flo = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.groen, 0.16), C.groen, 4);
  ctx.beginPath(); ctx.arc(x, y, r * 0.5, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.07); ctx.fill();
  const n = 8; for (let i = 0; i < n; i++) { const an = i / n * 6.283 - Math.PI / 2; ctx.save(); ctx.translate(x + Math.cos(an) * r * 0.66, y + Math.sin(an) * r * 0.66); ctx.rotate(an + Math.PI / 2);
    const w = r * 0.12, h = r * 0.2;
    ctx.beginPath(); ctx.ellipse(0, -h * 0.45, w, h * 0.5, 0, 0, 6.283); shape(ctx, rgba(TR.suiker, 0.3 + 0.5 * flo), TR.suiker, 1.5);
    ctx.beginPath(); ctx.ellipse(0, h * 0.5, w, h * 0.55, 0, 0, 6.283); shape(ctx, rgba(TR.water, 0.3 + 0.5 * xyl), TR.water, 1.5);
    if (hi > 0.01) { ctx.save(); ctx.globalAlpha *= hi; ctx.beginPath(); ctx.ellipse(0, 0, w * 1.45, h * 1.3, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  ctx.restore(); }
function vaatbundelGroot(ctx, x, y, s, o = {}) { const { a = 1, xyl = 0, flo = 0, rand = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 300, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.08), rgba(C.groen, 0.6), 2);
  let i = 0; for (let r = 0; r < 4; r++) for (let c = -5; c <= 5; c++) { const px = c * 42 + (r % 2) * 21, py = -238 + r * 42; if ((px * px) / (205 * 205) + (py * py) / (280 * 280) > 0.92) continue; i++;
    ctx.beginPath(); ctx.arc(px, py, i % 3 === 0 ? 11 : 19, 0, 6.283); shape(ctx, rgba(TR.suiker, 0.12 + 0.35 * flo), rgba(TR.suiker, 0.45 + 0.55 * flo), i % 3 === 0 ? 1.2 : 2); }
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(-205, -58); ctx.lineTo(205, -58); ctx.stroke(); ctx.setLineDash([]);
  const xv = [[-120, 25, 44], [0, 12, 52], [120, 28, 42], [-68, 125, 46], [62, 128, 50], [0, 222, 38], [-155, 115, 24], [155, 120, 24], [-115, 205, 24], [115, 208, 24], [-175, 30, 18], [175, 35, 18]];
  xv.forEach(([px, py, r]) => { const big = r > 35; ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = big ? (xyl > 0.01 ? mixHex('#1A2740', '#2C5A78', xyl) : C.bgSchema) : rgba(C.groen, 0.1); ctx.fill(); ctx.strokeStyle = big ? TR.water : rgba(C.groen, 0.5); ctx.lineWidth = big ? 6 + 3 * xyl : 1.5; ctx.stroke(); });
  if (rand > 0.01) { ctx.save(); ctx.globalAlpha *= rand; metaText(ctx, 'buitenkant', 0, -318, C.grain, 'center', 24); metaText(ctx, 'binnenkant', 0, 340, C.grain, 'center', 24); ctx.restore(); }
  ctx.restore(); }
function bladBoven(ctx, x, y, s, o = {}) { const { a = 1, hi = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-230, 0); ctx.quadraticCurveTo(0, -190, 230, 0); ctx.quadraticCurveTo(0, 190, -230, 0); ctx.closePath(); shape(ctx, rgba(C.groen, 0.4), C.groen, 2);
  ctx.strokeStyle = lighten('#7FC48F', 0.15); ctx.lineWidth = 2; roundRect(ctx, -300, -6, 70, 12, 6); ctx.fillStyle = PL.stengel; ctx.fill();
  const nerf = (lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(220, 0); for (let k = 0; k < 5; k++) { const bx = -150 + k * 80; for (const sd of [-1, 1]) { ctx.moveTo(bx, 0); ctx.quadraticCurveTo(bx + 40, sd * 40, bx + 70, sd * (95 - Math.abs(k - 1.5) * 18)); } } ctx.stroke(); };
  nerf(4, rgba('#DFF2E2', 0.7)); if (hi > 0.01) { ctx.save(); ctx.globalAlpha *= hi; nerf(4, C.goud); ctx.restore(); }
  ctx.restore(); }

// ---------- houtvat en zeefvat (verticaal; voor horizontaal: draai) ----------
function houtvat(ctx, x, y0, y1, w, o = {}) { const { a = 1, dood = 1, water = 0, t = 0, n = 5, hiWand = 0, hiTussen = 0, stroom = 80, ringen = 1, mineralen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = (y1 - y0) / n;
  for (let i = 0; i < n; i++) { const cy = y0 + i * h; const dk = clamp(dood * 1.8 - (n - 1 - i) * 0.2, 0, 1);
    if (dk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - dk; roundRect(ctx, x - w / 2 + 6, cy + 6, w - 12, h - 12, 14); ctx.fillStyle = rgba(C.groen, 0.25); ctx.fill(); ctx.beginPath(); ctx.arc(x, cy + h / 2, Math.min(w, h) * 0.13, 0, 6.283); shape(ctx, rgba('#3E7A4E', 0.9), C.groen, 1.5); ctx.restore(); }
    if (i > 0 && dk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - dk; ctx.strokeStyle = hiTussen > 0.5 ? C.goud : PL.hout; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - w / 2, cy); ctx.lineTo(x + w / 2, cy); ctx.stroke(); ctx.restore(); } }
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; ctx.fillStyle = rgba(TR.water, 0.16); ctx.fillRect(x - w / 2, y0, w, y1 - y0); const L = y1 - y0, N = Math.round(L * w / 2600);
    for (let k = 0; k < N; k++) { const yy = y1 - ((((t * stroom) + hash(k * 5) * L) % L) + L) % L; const xx = x + (hash(k * 5 + 1) - 0.5) * (w - 30); if (mineralen && k % 6 === 0) mDot(ctx, xx, yy, 6); else wDot(ctx, xx, yy, 6); } ctx.restore(); }
  const wd = 5 + 7 * dood; const wc = hiWand > 0.5 ? C.goud : PL.hout;
  for (const sd of [-1, 1]) { const wx = x + sd * w / 2; ctx.fillStyle = wc; ctx.fillRect(sd < 0 ? wx - wd : wx, y0, wd, y1 - y0);
    if (ringen * dood > 0.01) { ctx.save(); ctx.globalAlpha *= ringen * dood; for (let yy = y0 + 12; yy < y1 - 6; yy += 26) { ctx.fillRect(sd < 0 ? wx : wx - 9, yy, 9, 9); } ctx.restore(); } }
  ctx.restore(); }
function zeefvat(ctx, x, y0, y1, w, o = {}) { const { a = 1, t = 0, n = 4, suiker = 0, dir = 1, hiPlaat = 0, stroom = 60, begeleidend = 0, hiBeg = 0, druk = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = (y1 - y0) / n;
  for (let i = 0; i < n; i++) { const cy = y0 + i * h; roundRect(ctx, x - w / 2, cy, w, h, 10); ctx.fillStyle = rgba(TR.suiker, 0.08 + 0.12 * druk); ctx.fill();
    roundRect(ctx, x - w / 2 + 7, cy + 7, w - 14, h - 14, 8); ctx.strokeStyle = rgba(C.groen, 0.35); ctx.lineWidth = 5; ctx.stroke();
    roundRect(ctx, x - w / 2, cy, w, h, 10); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke(); }
  for (let i = 1; i < n; i++) { const cy = y0 + i * h; ctx.strokeStyle = hiPlaat > 0.5 ? C.goud : TR.suiker; ctx.lineWidth = 9; for (let gx = -w / 2; gx < w / 2 - 4; gx += 24) { ctx.beginPath(); ctx.moveTo(x + gx, cy); ctx.lineTo(x + Math.min(gx + 12, w / 2), cy); ctx.stroke(); } }
  if (suiker > 0.01) { const L = y1 - y0, N = Math.round(L * w / 3000); ctx.save(); ctx.globalAlpha *= suiker;
    for (let k = 0; k < N; k++) { let yy = ((t * stroom * dir) + hash(k * 3) * L) % L; if (yy < 0) yy += L; const xx = x + (hash(k * 3 + 1) - 0.5) * (w - 34); sDot(ctx, xx, y0 + yy, 8); } ctx.restore(); }
  if (begeleidend > 0.01) { ctx.save(); ctx.globalAlpha *= begeleidend; for (let i = 0; i < n; i++) { const cy = y0 + i * h; roundRect(ctx, x + w / 2 + 10, cy + 12, w * 0.38, h - 24, 12); shape(ctx, rgba(C.groen, 0.25), hiBeg > 0.5 ? C.goud : C.groen, 2.5); ctx.beginPath(); ctx.arc(x + w / 2 + 10 + w * 0.19, cy + h / 2, w * 0.08, 0, 6.283); shape(ctx, '#3E7A4E', C.groen, 1); } ctx.restore(); }
  ctx.restore(); }
function horizontaal(ctx, cx, cy, fn) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(-Math.PI / 2); fn(); ctx.restore(); }

// ---------- boom ----------
const BOOM_WORTEL = [[[0, 0], [-40, 60], [-150, 120]], [[0, 0], [40, 70], [160, 130]], [[0, 0], [-5, 80], [-20, 160]], [[0, 0], [80, 40], [230, 70]], [[0, 0], [-90, 35], [-240, 60]]];
const KROON = [[0, -480, 150], [-125, -440, 110], [125, -440, 110], [-75, -575, 105], [75, -575, 105], [0, -630, 90]];
function boom(ctx, X, Y, s, o = {}) {
  const { a = 1, t = 0, ring = 0, hiRing = 0, water = 0, suiker = 0, stop = 0, ophoping = 0, wortelDood = 0, dood = 0, hiStam = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = (px, py) => [X + px * s, Y + py * s];
  ctx.fillStyle = rgba(PL.aarde, 0.6); ctx.fillRect(X - 330 * s, Y, 660 * s, 175 * s); ctx.strokeStyle = PL.aardeR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X - 330 * s, Y); ctx.lineTo(X + 330 * s, Y); ctx.stroke();
  const wc = mixHex(PL.wortel, PL.dood, wortelDood);
  BOOM_WORTEL.forEach(w => { ctx.strokeStyle = wc; ctx.lineWidth = 12 * s; ctx.lineCap = 'round'; ctx.beginPath(); w.map(p => P(...p)).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); });
  const kc = mixHex('#4E8A5C', PL.dood, dood);
  KROON.forEach(([cx, cy, r]) => { const p = P(cx, cy); ctx.beginPath(); ctx.arc(p[0], p[1], r * s, 0, 6.283); ctx.fillStyle = kc; ctx.fill(); });
  KROON.forEach(([cx, cy, r]) => { const p = P(cx, cy); ctx.beginPath(); ctx.arc(p[0], p[1], r * s, 0, 6.283); ctx.strokeStyle = lighten(kc, 0.2); ctx.lineWidth = 1.5; ctx.stroke(); });
  // stam: hout (xyleem), floëem, bast
  const top = -400, rect = (x0, x1, col) => { const p = P(x0, top); ctx.fillStyle = col; ctx.fillRect(p[0], p[1], (x1 - x0) * s, -top * s); };
  rect(-30, 30, mixHex('#8E8470', PL.hout, 0.5)); rect(-36, -30, TR.suiker); rect(30, 36, TR.suiker); rect(-48, -36, PL.bast); rect(36, 48, PL.bast);
  if (hiStam > 0.01) { ctx.save(); ctx.globalAlpha *= hiStam; const p = P(-50, -300); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(p[0], p[1], 100 * s, 60 * s); ctx.restore(); }
  if (ring > 0.01) { ctx.save(); ctx.globalAlpha *= ring; for (const [x0, x1] of [[-50, -29], [29, 50]]) { const p = P(x0, -175); ctx.fillStyle = mixHex('#8E8470', PL.hout, 0.75); ctx.fillRect(p[0], p[1], (x1 - x0) * s, 44 * s); }
    const p = P(-50, -175); ctx.strokeStyle = hiRing > 0.5 ? C.goud : '#3A2C22'; ctx.lineWidth = hiRing > 0.5 ? 3 : 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 100 * s, p[1]); ctx.moveTo(p[0], p[1] + 44 * s); ctx.lineTo(p[0] + 100 * s, p[1] + 44 * s); ctx.stroke();
    if (hiRing > 0.01) { ctx.save(); ctx.globalAlpha *= hiRing; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(p[0] - 10 * s, p[1] - 10 * s, 120 * s, 64 * s); ctx.restore(); } ctx.restore(); }
  // stromen
  if (water > 0.01) { for (const [j, xx] of [[0, -15], [1, 0], [2, 15]]) stroomDots(ctx, [P(xx, 40), P(xx, top), P(xx * 6, -520)], 8, t, 120 * s, (x, y) => wDot(ctx, x, y, 6), j * 9, water);
    BOOM_WORTEL.forEach((w, j) => stroomDots(ctx, w.map(p => P(...p)).reverse(), 3, t, 120 * s, (x, y) => wDot(ctx, x, y, 5), 40 + j * 5, water)); }
  if (suiker > 0.01) for (const [j, xx] of [[0, -33], [1, 33]]) { const end = stop > 0.5 ? -178 : 0; const pts = [P(xx * 2.5, -500), P(xx, top), P(xx, end)]; if (end === 0) pts.push(P(xx * 3, 60));
    stroomDots(ctx, pts, 7, t, 90 * s, (x, y) => sDot(ctx, x, y, 7), 20 + j * 7, suiker); }
  if (ophoping > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(ophoping, 0, 1); const n = Math.round(2 + 6 * ophoping); for (let k = 0; k < n; k++) for (const sd of [-1, 1]) { const p = P(sd * (33 + (k % 2) * 8), -186 - Math.floor(k / 2) * 14); sDot(ctx, p[0], p[1], 7); } ctx.restore(); }
  ctx.restore();
}
function stamDoorsnede(ctx, x, y, r, o = {}) { const { a = 1, hiHout = 0, hiFlo = 0, hiBast = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, PL.bast, PL.bastR, 2);
  ctx.beginPath(); ctx.arc(x, y, r * 0.86, 0, 6.283); ctx.fillStyle = TR.suiker; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r * 0.79, 0, 6.283); ctx.fillStyle = mixHex('#8E8470', PL.hout, 0.6); ctx.fill();
  ctx.strokeStyle = rgba('#5A4A38', 0.6); ctx.lineWidth = 2; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.arc(x, y, r * 0.79 * k / 7, 0, 6.283); ctx.stroke(); }
  const ring = (r0, r1, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r0, 0, 6.283); ctx.stroke(); if (r1) { ctx.beginPath(); ctx.arc(x, y, r1, 0, 6.283); ctx.stroke(); } ctx.restore(); };
  ring(r * 0.79, 0, hiHout); ring(r * 0.86, r * 0.79, hiFlo); ring(r, r * 0.86, hiBast);
  ctx.restore(); }

// ---------- blad in doorsnede ----------
const BL_SPONS = (() => { const out = []; let k = 0; for (const yy of [-5, 60, 122]) for (let xx = -610; xx <= 620; xx += 90) { k++; const px = xx + (hash(k * 3) - 0.5) * 26 + (yy === 60 ? 45 : 0), py = yy + (hash(k * 3 + 1) - 0.5) * 12; const r = 31 + hash(k * 3 + 2) * 7;
  if (Math.hypot(px + 300, py - 20) < 115) continue; if (px > 165 && px < 335 && py > 40) continue; if (px > 615 || px < -615) continue; out.push([px, py, r]); } return out; })();
const BL_STOMA = [250, 165];
function bladDoorsnede(ctx, X, Y, s, o = {}) {
  const { a = 1, t = 0, damp = 0, co2 = 0, open = 1, trek = 0, hiStoma = 0, hiNerf = 0, suiker = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(X, Y); ctx.scale(s, s);
  roundRect(ctx, -650, -196, 1300, 382, 26); ctx.fillStyle = '#0F1622'; ctx.fill();
  for (let xx = -650; xx < 650; xx += 65) { roundRect(ctx, xx + 2, -196, 61, 32, 6); shape(ctx, rgba(C.groen, 0.12), rgba(C.groen, 0.6), 1.2); }
  for (let xx = -646; xx < 640; xx += 54) { roundRect(ctx, xx + 3, -158, 48, 110, 16); shape(ctx, rgba(C.groen, 0.22), rgba(C.groen, 0.7), 1.2); for (let k = 0; k < 4; k++) { ctx.fillStyle = C.chloro; ctx.beginPath(); ctx.ellipse(xx + 17 + (k % 2) * 18, -136 + k * 24, 7, 5, 0, 0, 6.283); ctx.fill(); } }
  BL_SPONS.forEach(([px, py, r]) => { ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); shape(ctx, rgba(C.groen, 0.2), rgba(C.groen, 0.65), 1.2); ctx.fillStyle = C.chloro; ctx.beginPath(); ctx.ellipse(px - 9, py - 7, 6, 4, 0, 0, 6.283); ctx.ellipse(px + 10, py + 8, 6, 4, 0, 0, 6.283); ctx.fill(); });
  // nerf: xyleem boven, floëem onder
  ctx.beginPath(); ctx.arc(-300, 20, 90, 0, 6.283); shape(ctx, rgba(C.groen, 0.14), rgba(C.groen, 0.7), 2);
  [[-335, -12, 18], [-298, -24, 22], [-262, -8, 17], [-318, 22, 14], [-280, 16, 15]].forEach(([px, py, r]) => { ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = rgba(TR.water, 0.25 + 0.4 * trek); ctx.fill(); ctx.strokeStyle = TR.water; ctx.lineWidth = 4; ctx.stroke(); });
  [[-330, 60], [-305, 70], [-280, 62], [-258, 50], [-345, 40], [-300, 48]].forEach(([px, py], i) => { ctx.beginPath(); ctx.arc(px, py, i % 2 ? 8 : 12, 0, 6.283); shape(ctx, rgba(TR.suiker, 0.3), TR.suiker, 1.5); });
  if (hiNerf > 0.01) { ctx.save(); ctx.globalAlpha *= hiNerf; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-300, 20, 100, 0, 6.283); ctx.stroke(); ctx.restore(); }
  for (let xx = -650; xx < 650; xx += 65) { if (xx + 65 > 205 && xx < 295) continue; roundRect(ctx, xx + 2, 154, 61, 32, 6); shape(ctx, rgba(C.groen, 0.12), rgba(C.groen, 0.6), 1.2); }
  const g = 4 + 16 * open; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(BL_STOMA[0] + sd * (g + 24), BL_STOMA[1] + 2, 26, 17, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); }
  if (hiStoma > 0.01) { ctx.save(); ctx.globalAlpha *= hiStoma; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(BL_STOMA[0], BL_STOMA[1], 95, 45, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  if (suiker > 0.01) { ctx.save(); ctx.globalAlpha *= suiker; for (let k = 0; k < 12; k++) { const px = -600 + k * 105 + 10, py = -110 + (k % 3) * 25; const w = wander(k, t, 3, 1); sDot(ctx, px + w.x, py + w.y, 8); } ctx.restore(); }
  const src = [1, 3, 5, 8, 10, 13, 15, 18, 20, 23].map(i => BL_SPONS[i % BL_SPONS.length]);
  const dampPad = (c, k) => [[c[0] + (c[0] < 250 ? c[2] : -c[2]) * 0.8, c[1] + 12], [BL_STOMA[0] + (k % 3 - 1) * 14, 100], [BL_STOMA[0], BL_STOMA[1]], [BL_STOMA[0] + (k % 3 - 1) * 70, 320]];
  const dOpen = clamp(open * 1.6 - 0.15, 0, 1);
  if (damp > 0.01) src.forEach((c, k) => stroomDots(ctx, dampPad(c, k), 2, t, 110, (x, y) => wDot(ctx, x, y, 5), k * 3, damp * dOpen));
  if (damp > 0.01 && dOpen < 0.95) { ctx.save(); ctx.globalAlpha *= damp * (1 - dOpen); for (let k = 0; k < 6; k++) { const w = wander(k + 30, t, 10, 0.7); wDot(ctx, BL_STOMA[0] - 40 + k * 16 + w.x, 95 + w.y, 5); } ctx.restore(); }
  if (co2 > 0.01) src.forEach((c, k) => stroomDots(ctx, dampPad(c, k + 1).reverse(), 2, t, 100, (x, y) => cDot(ctx, x, y, 6), 200 + k * 3, co2 * dOpen));
  if (trek > 0.01) { const doel = [[-500, -100], [-420, -90], [-180, -100], [-80, -90], [-470, 0], [-150, 40], [-520, 110], [-120, 120]]; doel.forEach((d, k) => stroomDots(ctx, [[-300 + (d[0] + 300) * 0.25, -5 + (d[1] - 20) * 0.25], d], 3, t, 70, (x, y) => wDot(ctx, x, y, 5), 300 + k * 3, trek)); }
  ctx.restore(); }
function blP(X, Y, s, px, py) { return [X + px * s, Y + py * s]; }

// ---------- huidmondje van boven ----------
function sluitcellen(ctx, x, y, s, open, o = {}) { const { a = 1, hiWand = 0, hiCel = 0, water = 0, t = 0, damp = 0, co2 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const ep = [[-330, -170, 170, 120], [0, -300, 160, 90], [330, -170, 170, 120], [-360, 120, 150, 130], [360, 120, 150, 130], [0, 300, 170, 90]];
  ep.forEach(([px, py, rx, ry], i) => { blob(ctx, px, py, rx, ry, 0.08, i + 2); shape(ctx, rgba(C.groen, 0.07), rgba(C.groen, 0.4), 2); });
  const H = 175, g = 4 + open * 46, Wc = 72 + 14 * open;
  ctx.beginPath(); ctx.moveTo(0, -H + 10); ctx.quadraticCurveTo(-2 * g, 0, 0, H - 10); ctx.quadraticCurveTo(2 * g, 0, 0, -H + 10); ctx.fillStyle = '#05080E'; ctx.fill();
  for (const sd of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(0, -H); ctx.quadraticCurveTo(sd * 2 * g, 0, 0, H); ctx.quadraticCurveTo(sd * 2 * (g + Wc), 0, 0, -H); ctx.closePath(); shape(ctx, rgba(C.groen, 0.38), hiCel > 0.5 ? C.goud : C.groen, hiCel > 0.5 ? 3 : 2);
    for (let k = 0; k < 6; k++) { const u = 0.2 + k * 0.12, mx = sd * 2 * u * (1 - u) * (2 * g + Wc), my = (2 * u - 1) * H * 0.95 * (1 - 0.1); ctx.fillStyle = C.chloro; ctx.beginPath(); ctx.ellipse(mx, my, 9, 6, 0, 0, 6.283); ctx.fill(); }
    ctx.beginPath(); ctx.arc(sd * (g + Wc * 0.62), 0, 13, 0, 6.283); shape(ctx, '#3E7A4E', C.groen, 1);
    ctx.save(); ctx.strokeStyle = hiWand > 0.5 ? C.goud : '#E6E1D3'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -H + 22); ctx.quadraticCurveTo(sd * 2 * g + sd * 6, 0, 0, H - 22); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = rgba(C.groen, 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -H); ctx.quadraticCurveTo(sd * 2 * (g + Wc), 0, 0, H); ctx.stroke(); ctx.restore();
    if (water > 0.01 || water < -0.01) { const inw = water > 0; for (let k = 0; k < 4; k++) { const yy = (k - 1.5) * 70; const p0 = [sd * (g + Wc + 170), yy * 1.2], p1 = [sd * (g + Wc * 0.55), yy * 0.8]; stroomDots(ctx, inw ? [p0, p1] : [p1, p0], 2, t, 90, (px, py) => wDot(ctx, px, py, 7), k * 5 + (sd > 0 ? 50 : 0), Math.abs(water)); } }
  }
  if (damp > 0.01) { ctx.save(); ctx.globalAlpha *= damp * clamp(open * 2, 0, 1); for (let k = 0; k < 7; k++) { const u = (t * 0.5 + hash(k * 3)) % 1; const w = wander(k, t, 6, 1); ctx.globalAlpha = damp * clamp(open * 2, 0, 1) * (1 - u); wDot(ctx, (hash(k) - 0.5) * g * 1.2 + w.x, (hash(k + 4) - 0.5) * 140 + w.y - u * 40, 5 + u * 3); } ctx.restore(); }
  ctx.restore(); }

// ---------- plantencel met turgor ----------
function plantCel(ctx, x, y, w, h, turgor, o = {}) { const { a = 1, t = 0, pijlen = 1, hiVac = 0, hiWand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const wob = (1 - turgor) * 0.07, rx = w / 2 * lerp(0.94, 1, turgor), ry = h / 2 * lerp(0.9, 1, turgor);
  blob(ctx, x, y, rx, ry, wob, 3); ctx.fillStyle = rgba(C.groen, 0.14); ctx.fill(); ctx.strokeStyle = hiWand > 0.5 ? C.goud : C.groen; ctx.lineWidth = 14; ctx.stroke();
  const k = lerp(0.58, 0.88, turgor); blob(ctx, x, y + 6, rx * k, ry * k, wob * 0.6, 7); shape(ctx, rgba(TR.water, 0.32), hiVac > 0.5 ? C.goud : lighten(TR.water, 0.2), hiVac > 0.5 ? 3 : 2);
  for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + 0.3; const px = x + Math.cos(an) * rx * 0.93, py = y + Math.sin(an) * ry * 0.9; chloroplast(ctx, px, py, 42, 1, an + Math.PI / 2); }
  ctx.beginPath(); ctx.arc(x - rx * 0.7, y - ry * 0.55, 30, 0, 6.283); shape(ctx, '#3E7A4E', C.groen, 1.5);
  if (pijlen > 0.01) for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283; const r0x = rx * k * 0.92, r0y = ry * k * 0.92; const L = 18 + 42 * turgor; const x0 = x + Math.cos(an) * (r0x - 30), y0 = y + 6 + Math.sin(an) * (r0y - 30); pijl(ctx, x0, y0, x0 + Math.cos(an) * L, y0 + Math.sin(an) * L, lighten(TR.water, 0.3), pijlen * (0.35 + 0.65 * turgor), 4); }
  ctx.restore(); }

// ---------- bladluis ----------
function bladluis(ctx, x, y, s, o = {}) { const { a = 1, stilet = [x + 80, y + 120], zwel = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const col = '#A8B890';
  ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) for (const sd of [-1, 1]) { const lx = x - 50 * s + i * 45 * s; ctx.beginPath(); ctx.moveTo(lx, y + 10 * s); ctx.lineTo(lx + sd * 6 * s - 15 * s, y + 45 * s); ctx.lineTo(lx - 25 * s + sd * 8 * s, y + 62 * s); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x - 20 * s, y, (95 + 8 * zwel) * s, (52 + 6 * zwel) * s, -0.08, 0, 6.283); shape(ctx, rgba(col, 0.75), lighten(col, 0.3), 2);
  ctx.beginPath(); ctx.ellipse(x + 75 * s, y + 10 * s, 34 * s, 28 * s, 0, 0, 6.283); shape(ctx, rgba(col, 0.85), lighten(col, 0.3), 2);
  ctx.fillStyle = '#2A2F3A'; ctx.beginPath(); ctx.arc(x + 90 * s, y + 2 * s, 5 * s, 0, 6.283); ctx.fill();
  ctx.strokeStyle = col; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x + 92 * s, y - 12 * s); ctx.quadraticCurveTo(x + 150 * s, y - 80 * s, x + 200 * s, y - 60 * s); ctx.moveTo(x + 84 * s, y - 14 * s); ctx.quadraticCurveTo(x + 110 * s, y - 100 * s, x + 170 * s, y - 110 * s); ctx.stroke();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 80 * s, y - 20 * s * sd * 0 - 30 * s); ctx.lineTo(x - 95 * s, y - 55 * s); ctx.stroke(); break; }
  ctx.strokeStyle = '#D6D0B8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 92 * s, y + 30 * s); ctx.lineTo(stilet[0], stilet[1]); ctx.stroke();
  ctx.restore(); }
function stengelLengte(ctx, y0, y1, o = {}) { const { a = 1, t = 0, suiker = 0, stroomNaar = null, druk = 0, hiZeef = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(140, y0, 1640, y1 - y0); ctx.fillStyle = rgba(C.groen, 0.45); ctx.fillRect(140, y0, 1640, 22);
  for (let i = 0; i < 27; i++) for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.ellipse(170 + i * 59 + (r % 2) * 28, y0 + 60 + r * 50, 26, 20, 0, 0, 6.283); ctx.strokeStyle = rgba(C.groen, 0.35); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { schemaPlant(ctx, 1480, 640, 0.85, { t, xyl: 1, flo: 1, water: 1, omlaag: 1, bodem: 1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const av = q.on('avonds', 1, 1.8); kamer(ctx, av);
    const slap = clamp(ramp(t, q.at('hangt') - 0.4, 1.4) - ramp(t, q.at('staan'), 1.8), 0, 1);
    potPlant(ctx, 960, 490, 1, slap, t, fade(q, 'aarde', 'avonds'));
    klok(ctx, 250, 270, 88, lerp(2, 8, av), av > 0.5 ? '20:00' : '14:00', 1, C.text);
    tag(ctx, 'warm', 250, 470, C.goud, (1 - ramp(t, q.at('avonds'), 0.5)) * q.on('warme', 1));
    tag(ctx, 'koeler', 250, 470, C.text2, ramp(t, q.at('avonds') + 0.9, 0.6));
    tag(ctx, 'slap', 1240, 400, C.goud, fade(q, 'slap', 'avonds'));
    tag(ctx, 'de aarde is nog vochtig', 960, 800, TR.water, fade(q, 'aarde', 'avonds'));
    tag(ctx, 'weer recht', 1240, 260, C.groen, fade(q, 'recht', 'Hoe'));
    vraagteken(ctx, 1640, 420, q.on('Hoe', 1), 160);
  },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema');
    const tB = wissel(q, 'Elke'), tH = wissel(q, 'houtvat', 2);
    laag(ctx, 1 - tB.uit, () => {
      schemaPlant(ctx, 380, 600, 0.8, { t, bodem: 1, vrucht: 0 });
      const cut = plantPunt(380, 600, 0.8, [0, -240]);
      laag(ctx, q.on('Snijd', 1), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(cut[0] - 60, cut[1]); ctx.lineTo(cut[0] + 60, cut[1]); ctx.stroke(); ctx.setLineDash([]); });
      zoomCircle(ctx, 1000, 400, 250, cut[0], cut[1], 'stengel in doorsnede', q.on('stengel', 1), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(740, 140, 520, 520); stengelDoorsnede(ctx, 1000, 400, 210, { hi: q.on('vaatbundels', 1) }); });
      tag(ctx, 'vaatbundels', 1000, 770, C.goud, fade(q, 'vaatbundels', 'blad'));
      bladBoven(ctx, 1610, 400, 0.85, { a: q.on('blad', 1), hi: q.on('nerven', 1) });
      tag(ctx, 'nerven = vaatbundels', 1610, 620, C.goud, q.on('nerven', 1));
    });
    laag(ctx, tB.in * (1 - tH.uit), () => {
      vaatbundelGroot(ctx, 640, 470, 1.15, { xyl: q.on('xyleem', 1), flo: 0 });
      laag(ctx, fade(q, 'twee', 'xyleem'), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(640, 470 - 175, 225, 110, 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(640, 470 + 135, 240, 170, 0, 0, 6.283); ctx.stroke(); });
      tag(ctx, 'twee soorten vaten', 640, 120, C.goud, fade(q, 'twee', 'xyleem'));
      naamBij(ctx, 'xyleem', 'HOUTVATEN', 925, 625, q.on('xyleem', 1), 'left', TR.water);
      schemaPlant(ctx, 1460, 640, 0.72, { t, xyl: q.on('water', 1), water: q.on('water', 1), mineralen: q.on('mineralen', 1), vrucht: 0, bodem: 1 });
      laag(ctx, q.on('wortels', 1), () => { pijl(ctx, 1800, 760, 1800, 280, C.goud, 1, 5); });
      tag(ctx, 'water + mineralen', 1460, 120, TR.water, fade(q, 'mineralen', 'Altijd'));
      tag(ctx, 'altijd één kant op: omhoog', 1460, 120, C.goud, q.on('Altijd', 1));
    });
    laag(ctx, tH.in, () => {
      const dood = ramp(t, q.at('inhoud') - 0.2, q.at('verdwenen') + 0.8 - q.at('inhoud'));
      const hol = q.on('holle', 1);
      houtvat(ctx, 760, 130, 830, 170, { dood, t, water: hol, ringen: ramp(t, q.at('stevige'), 1), hiWand: fade(q, 'houtstof', null), hiTussen: fade(q, 'tussenwanden', 'verdwenen') });
      label(ctx, 'een rij cellen', 'EÉN HOUTVAT', 845, 300, 1150, 240, fade(q, 'houtvat', 'dode', 2), C.text, 'left');
      tag(ctx, 'dode cellen', 1300, 240, C.text2, fade(q, 'dode', 'inhoud'));
      naamBij(ctx, 'inhoud', 'VERDWIJNT', 880, 420, fade(q, 'inhoud', 'holle'), 'left', C.text);
      label(ctx, 'tussenwand', 'VERDWIJNT', 845, 550, 1150, 560, fade(q, 'tussenwanden', 'holle'), C.goud, 'left');
      tag(ctx, 'een lange, holle buis', 1400, 480, TR.water, fade(q, 'holle', 'houtstof'));
      label(ctx, 'wand van houtstof', 'STEVIG', 853, 640, 1150, 700, q.on('houtstof', 1), C.goud, 'left');
      metaText(ctx, 'schematisch · niet op schaal', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    });
  },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const X = 900, Y = 600, S = 0.85;
    const pB = q.on('Veel', 1), pC = q.on('floëem', 2), pD = q.on('zomer', 1), pE = wissel(q, 'Bastvaten', 2);
    laag(ctx, 1 - pE.uit, () => {
      const zomer = pD * (1 - q.on('voorjaar', 1)), voorjaar = q.on('voorjaar', 1);
      schemaPlant(ctx, X, Y, S, { t, xyl: 0.3 + 0.7 * pB * (1 - pC), flo: q.on('floëem', 1), maakSuiker: q.on('fotosynthese', 1) * (1 - pB) + q.on('maakt', 1) * (1 - pC),
        water: q.on('Maar', 1) * (1 - pC), mineralen: q.on('mineralen', 1) * (1 - pC),
        omlaag: pC * (1 - pD) + zomer, naarVrucht: pC * (1 - pD), naarTop: pC * (1 - pD), omhoog: voorjaar,
        oud: 1 - 0.65 * voorjaar, nieuw: voorjaar, vrucht: 1 - pD, opslag: ramp(t, q.at('zomer'), 3) * (1 - 0.6 * voorjaar),
        hi: { wortels: fade(q, 'wortels', 'zomer'), vrucht: fade(q, 'vruchten', 'zomer'), top: fade(q, 'groeipunten', 'zomer'), blad: fade(q, 'fotosynthese', 'Veel') } });
      label(ctx, 'floëem', 'BASTVATEN', X + 8 * S, Y - 120 * S, 1300, 300, fade(q, 'floëem', 'Veel'), TR.suiker, 'left');
      tag(ctx, 'suiker uit fotosynthese', 1420, 160, TR.suiker, fade(q, 'fotosynthese', 'Veel'));
      // misconceptie
      laag(ctx, fade(q, 'denken', 'Maar'), () => { tag(ctx, 'voedsel uit de bodem?', 1530, 760, C.text2, 1); pijl(ctx, X - 300, 780, X - 60, 640, C.text2, 1, 4); });
      tag(ctx, 'uit de bodem: alleen water en mineralen', 1530, 760, TR.water, fade(q, 'alleen', 'suiker', 1, 3));
      tag(ctx, 'suiker: maakt de plant zelf', 1420, 160, TR.suiker, fade(q, 'maakt', 'floëem', 1, 2));
      tag(ctx, 'naar plekken die suiker verbruiken of opslaan', 1400, 120, TR.suiker, fade(q, 'verbruiken', 'zomer'));
      const lw = (s, p, lx, ly, w) => { const pp = plantPunt(X, Y, S, p); label(ctx, s, '', pp[0], pp[1], lx, ly, w, C.goud, 'left'); };
      lw('wortels', [60, 150], 1300, 820, fade(q, 'wortels', 'zomer'));
      lw('vruchten', [100, -184], 1300, 560, fade(q, 'vruchten', 'zomer'));
      lw('groeipunten', [12, -555], 1300, 300, fade(q, 'groeipunten', 'zomer'));
      tag(ctx, 'zomer: uit de bladeren omlaag', 1450, 300, TR.suiker, zomer);
      tag(ctx, 'voorjaar: opgeslagen suiker omhoog', 1450, 300, TR.suiker, voorjaar * (1 - q.on('twee', 1)));
      laag(ctx, q.on('twee', 1), () => { tag(ctx, 'floëem: twee richtingen', 1450, 300, C.goud, 1); pijl(ctx, 1700, 420, 1700, 620, TR.suiker, 1, 5); pijl(ctx, 1760, 620, 1760, 420, TR.suiker, 1, 5); });
    });
    laag(ctx, pE.in, () => {
      zeefvat(ctx, 760, 130, 830, 180, { t, suiker: 1, dir: 1, hiPlaat: fade(q, 'gaatjes', 'zeefvaten') });
      label(ctx, 'levende cellen', 'DUNNE LAAG CYTOPLASMA', 850, 260, 1120, 250, q.on('levende', 1), C.groen, 'left');
      label(ctx, 'zeefplaat', 'TUSSENWAND VOL GAATJES', 850, 480, 1120, 480, q.on('gaatjes', 1), C.goud, 'left');
      tag(ctx, 'zeefvaten', 1400, 700, TR.suiker, q.on('zeefvaten', 1));
      metaText(ctx, 'schematisch · niet op schaal', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    });
  },

  s06(ctx, t, q) { bg(ctx, 'schema');
    const pB = wissel(q, 'Iemand');
    laag(ctx, 1 - pB.uit, () => {
      boom(ctx, 480, 700, 0.9, { t, hiStam: q.on('boom', 1) });
      const src = plantPunt(480, 700, 0.9, [0, -270]);
      zoomCircle(ctx, 1220, 430, 280, src[0], src[1], 'stam in doorsnede', q.on('boom', 1), () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(930, 140, 580, 580); stamDoorsnede(ctx, 1220, 430, 250, { hiHout: fade(q, 'hout', 'floëem'), hiFlo: fade(q, 'floëem', null), hiBast: q.on('bast', 1) }); });
      label(ctx, 'hout = xyleem', '', 1220, 430, 1530, 200, q.on('xyleem', 1), TR.water, 'left');
      label(ctx, 'floëem', 'IN DE BAST', 1220 + 205, 430 + 30, 1530, 470, q.on('floëem', 1), TR.suiker, 'left');
      label(ctx, 'bast', '', 1220 + 170, 430 + 175, 1530, 700, q.on('bast', 1), C.text, 'left');
    });
    laag(ctx, pB.in, () => {
      const r = q.on('ring', 1);
      boom(ctx, 860, 700, 0.95, { t, ring: r, hiRing: fade(q, 'ring', 'Wat') });
      const p = plantPunt(860, 700, 0.95, [50, -153]);
      label(ctx, 'ring bast weg', 'RONDOM DE STAM', p[0], p[1], 1260, 440, r, C.goud, 'left');
      tag(ctx, 'het hout blijft heel', 1420, 620, C.text2, q.on('heel', 1));
      vraagteken(ctx, 1500, 260, q.on('Wat', 1), 160);
    });
  },

  s08(ctx, t, q) { bg(ctx, 'schema');
    const X = 700, Y = 700, S = 0.95;
    const sterf = ramp(t, q.at('sterven'), 1.4), geenW = q.on('geen', 1), dood = ramp(t, q.at('dood'), 1.2);
    boom(ctx, X, Y, S, { t, ring: 1, water: q.on('xyleem', 1) * (1 - 0.85 * geenW), suiker: q.on('floëem', 1), stop: 1, ophoping: ramp(t, q.at('doorgesneden'), 4) * 1.2, wortelDood: sterf, dood: dood * 0.8, hiRing: fade(q, 'floëem', 'Suiker') });
    tag(ctx, 'antwoord b', 1400, 160, C.goud, 1);
    regel(ctx, 'xyleem in het hout: heel', 1180, 300, q.on('xyleem', 1), TR.water, 36);
    regel(ctx, 'water komt nog omhoog', 1180, 350, q.on('water', 1), C.text, 32, 'left', 400);
    regel(ctx, 'floëem in de bast: doorgesneden', 1180, 450, q.on('floëem', 1), TR.suiker, 36);
    regel(ctx, 'suiker kan niet naar de wortels', 1180, 500, q.on('Suiker', 1), C.text, 32, 'left', 400);
    regel(ctx, 'wortels sterven af', 1180, 600, q.on('sterven', 1), C.text, 36);
    regel(ctx, 'geen water meer: de boom gaat dood', 1180, 650, q.on('geen', 1), C.text, 32, 'left', 400);
    laag(ctx, fade(q, 'wortels', 'sterven'), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(X, Y + 90 * S, 270 * S, 80 * S, 0, 0, 6.283); ctx.stroke(); });
  },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'micro');
    const RX0 = 150, RX1 = 470, XC = 305, Y0 = 130, Y1 = 870;
    const HY0 = [230, 400, 570, 740], HL0 = [1000, 1340, 1180, 1300];
    ctx.fillStyle = rgba(PL.aarde, 0.18); ctx.fillRect(RX1 + 10, 90, 1500 - RX1 - 10, 800);
    // bodemkorrels
    for (let i = 0; i < 60; i++) { const px = 740 + hash(i * 5) * 700, py = 120 + hash(i * 5 + 1) * 740; const nearHair = HY0.some((hy, j) => Math.abs(py - hy) < 50 && px < HL0[j] + 40); if (nearHair) continue; blob(ctx, px, py, 34 + hash(i * 5 + 2) * 30, 26 + hash(i * 5 + 3) * 22, 0.12, i); shape(ctx, rgba(PL.korrel, 0.75), PL.korrelR, 1.5); }
    // wortel
    roundRect(ctx, RX0, Y0 - 40, RX1 - RX0, Y1 - Y0 + 20, 30); ctx.fillStyle = rgba(C.groen, 0.08); ctx.fill();
    for (let r = 0; r < 13; r++) for (let c = 0; c < 4; c++) { const px = RX0 + 40 + c * 72 + (r % 2) * 20, py = Y0 + 10 + r * 56; if (Math.abs(px - XC) < 48) continue; ctx.beginPath(); ctx.ellipse(px, py, 30, 26, 0, 0, 6.283); ctx.strokeStyle = rgba(C.groen, 0.4); ctx.lineWidth = 1.5; ctx.stroke(); }
    const hx = q.on('houtvaten', 1);
    houtvat(ctx, XC, Y0 - 40, Y1 - 20, 60, { t, water: q.on('osmose', 1), n: 8, stroom: 70, hiWand: 0 });
    laag(ctx, hx, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(XC - 44, Y0 - 30, 88, Y1 - Y0 + 20); });
    const HY = HY0, HL = HL0;
    const groei = ramp(t, 0.2, 2.2);
    HY.forEach((hy, i) => { const xe = lerp(RX1 + 20, HL[i], groei); const hiC = i === 1 ? fade(q, 'uitstulpingen', 'Samen') : 0; const hiA = fade(q, 'oppervlak', 'mineralen');
      const pth = () => { ctx.beginPath(); ctx.moveTo(RX1 - 6, hy - 40); ctx.lineTo(RX1 - 6, hy + 40); ctx.lineTo(RX1 + 30, hy + 40); ctx.quadraticCurveTo(RX1 + 60, hy + 15, RX1 + 90, hy + 14); ctx.lineTo(xe, hy + 12 + Math.sin(i) * 4); ctx.arc(xe, hy + Math.sin(i) * 4, 12, Math.PI / 2, -Math.PI / 2, true); ctx.lineTo(RX1 + 90, hy - 14); ctx.quadraticCurveTo(RX1 + 60, hy - 15, RX1 + 30, hy - 40); ctx.closePath(); };
      pth(); shape(ctx, rgba(C.groen, 0.22), (hiC > 0.5 || hiA > 0.5) ? C.goud : C.groen, (hiC > 0.5 || hiA > 0.5) ? 3 : 2);
      ctx.beginPath(); ctx.arc(RX1 + 10, hy, 14, 0, 6.283); shape(ctx, '#3E7A4E', C.groen, 1); });
    // water in de bodem
    for (let i = 0; i < 70; i++) { const w = wander(i, t, 14, 0.6); const px = 600 + hash(i * 7 + 2) * 880 + w.x, py = 110 + hash(i * 7 + 3) * 760 + w.y; waterMol(ctx, px, py, 6, 0.8); }
    for (let i = 0; i < 18; i++) { const w = wander(i + 99, t, 10, 0.5); mDot(ctx, 620 + hash(i * 11 + 4) * 850 + w.x, 110 + hash(i * 11 + 5) * 740 + w.y, 6); }
    // mineralen actief naar binnen, water door osmose
    const mi = q.on('mineralen', 1), os = q.on('osmose', 1);
    HY.forEach((hy, i) => { const xe = HL[i]; const pad = [[xe + 140, hy - 60 + i * 20], [xe - 10, hy], [RX1 + 30, hy], [XC + 34, hy]];
      stroomDots(ctx, pad.map(p => [Math.min(p[0], 1460), p[1]]), 3, t, 120, (x, y) => mDot(ctx, x, y, 7), i * 5, mi);
      stroomDots(ctx, [[Math.min(xe + 120, 1460), hy + 70], [xe - 10, hy + 2], [RX1 + 30, hy + 4], [XC + 30, hy + 4], [XC, hy - 40]], 6, t, 140, (x, y) => waterMol(ctx, x, y, 7), 40 + i * 7, os); });
    // ophoping binnen
    laag(ctx, q.on('meer', 1), () => { for (let k = 0; k < 16; k++) { const hy = HY0[k % 4]; const w = wander(k + 200, t, 4, 1); mDot(ctx, RX1 + 40 + (k % 3) * 60 + w.x, hy - 4 + w.y, 6); } });
    label(ctx, 'wortelhaar', 'DEEL VAN ÉÉN CEL', 1330, 414, 1520, 330, fade(q, 'wortelharen', 'mineralen'), C.text, 'left');
    tag(ctx, 'groot oppervlak', 1700, 500, C.goud, fade(q, 'oppervlak', 'mineralen'));
    tag(ctx, 'mineralen: actief', 1700, 500, C.text, fade(q, 'actief', 'Daardoor'));
    tag(ctx, 'meer opgelost in de cel', 1700, 500, C.text, fade(q, 'meer', 'osmose'));
    tag(ctx, 'water: osmose', 1700, 500, TR.water, fade(q, 'osmose', 'houtvaten'));
    label(ctx, 'houtvat', 'MIDDEN IN DE WORTEL', XC + 30, 820, 600, 856, hx, TR.water, 'left');
    metaText(ctx, 'wortel · schematisch', W - 60, CAPTION_Y - 30, C.text2, 'right', 26);
  },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const pB = wissel(q, 'blad'), pC = wissel(q, 'schuift');
    laag(ctx, 1 - pB.uit, () => {
      schemaPlant(ctx, 900, 620, 0.85, { t, xyl: 1, water: 1, snel: 0.6, vrucht: 0 });
      const r = plantPunt(900, 620, 0.85, [0, 40]);
      laag(ctx, fade(q, 'klein', null), () => pijl(ctx, r[0] - 70, r[1] + 40, r[0] - 70, r[1] - 40, C.goud, 1, 5));
      tag(ctx, 'worteldruk: een klein beetje', 1450, 720, C.goud, q.on('worteldruk', 1));
      laag(ctx, q.on('bovenaf', 1), () => { for (let i = 0; i < 3; i++) { const p = plantPunt(900, 620, 0.85, plBladPt(i, 0.6)); pijl(ctx, p[0], p[1] - 30, p[0], p[1] - 120, C.goud, 1, 5); } });
      tag(ctx, 'het meeste: van bovenaf getrokken', 1450, 200, C.goud, q.on('bovenaf', 1));
    });
    laag(ctx, pB.in * (1 - pC.uit), () => {
      const X = 960, Y = 440, S = 1;
      bladDoorsnede(ctx, X, Y, S, { t, damp: q.on('verdampt', 1), trek: q.on('Verdampt', 2), hiStoma: fade(q, 'huidmondjes', 'transpiratie'), hiNerf: fade(q, 'houtvaten', 'Zo') });
      const holte = blP(X, Y, S, 250, 110); label(ctx, 'luchtholte', '', holte[0], holte[1], 1340, 170, fade(q, 'holtes', 'Verdampt', 1, 2), C.text, 'left');
      metaText(ctx, 'bovenkant', 330, 220, C.grain, 'center', 24); metaText(ctx, 'onderkant', 330, 690, C.grain, 'center', 24);
      tag(ctx, 'water verdampt uit de cellen', 960, 140, TR.water, fade(q, 'verdampt', 'ontsnapt'));
      tag(ctx, 'vooral aan de onderkant', 960, 140, C.text, fade(q, 'onderkant', 'huidmondjes'));
      const st = blP(X, Y, S, 250, 180); label(ctx, 'huidmondje', '', st[0], st[1], 1420, 790, q.on('huidmondjes', 1) * (1 - q.on('Verdampt', 2)), C.goud, 'left');
      tag(ctx, 'verdampen = transpiratie', 960, 140, TR.water, fade(q, 'transpiratie', 'Verdampt', 1, 2));
      const nf = blP(X, Y, S, -300, -10); naamBij(ctx, 'houtvat in de nerf', '', nf[0], nf[1] + 235, fade(q, 'houtvaten', 'Zo'), 'center', TR.water);
      tag(ctx, 'bladcellen trekken water uit de houtvaten', 960, 140, TR.water, fade(q, 'Verdampt', 'zuigkracht', 2));
      tag(ctx, 'zuigkracht van de bladeren', 960, 140, C.goud, q.on('zuigkracht', 1));
    });
    laag(ctx, pC.in, () => {
      schemaPlant(ctx, 900, 620, 0.85, { t, xyl: 1, water: 1, snel: 1.6, vrucht: 0, hi: { blad: 0.6 } });
      for (let i = 0; i < 3; i++) { const p = plantPunt(900, 620, 0.85, plBladPt(i, 0.6)); stroomDots(ctx, [[p[0], p[1] - 20], [p[0] + (i - 1) * 30, p[1] - 140]], 4, t, 60, (x, y) => wDot(ctx, x, y, 5), 400 + i * 4, 0.8); }
      tag(ctx, 'de hele waterkolom schuift omhoog', 1450, 200, TR.water, 1);
      laag(ctx, q.on('wortel', 3), () => pijl(ctx, 1440, 760, 1440, 300, C.goud, 1, 5));
    });
  },

  s11(ctx, t, q) {
    const pB = wissel(q, 'Elk'); bg(ctx, 'schema');
    laag(ctx, 1 - pB.uit, () => { bg(ctx, 'schema');
      const X = 680, Y = 430, S = 1;
      bladDoorsnede(ctx, X, Y, S, { t, co2: q.on('koolstofdioxide', 1), damp: q.on('water', 1), hiStoma: fade(q, 'huidmondjes', 'koolstofdioxide'), suiker: fade(q, 'fotosynthese', null) * 0.8 });
      tag(ctx, 'koolstofdioxide erin', 1640, 300, PL.co2, q.on('koolstofdioxide', 1));
      tag(ctx, 'voor de fotosynthese', 1640, 380, TR.suiker, q.on('fotosynthese', 1));
      tag(ctx, 'water eruit', 1640, 520, TR.water, q.on('water', 1));
      tag(ctx, 'dezelfde gaatjes', 1640, 600, C.goud, q.on('dezelfde', 1));
      vraagteken(ctx, 1640, 210, fade(q, 'Waar', 'Een'), 130);
    });
    laag(ctx, pB.in, () => { bg(ctx, 'micro');
      const tZ = q.at('Zwellen'), tO = q.at('open', 3), tV = q.at('Verliezen'), tS = q.at('sluit', 2);
      let open = 0.45; if (t > tZ) open = lerp(0.45, 1, (t - tZ) / Math.max(0.5, tO + 0.4 - tZ)); if (t > tV) open = lerp(1, 0.05, (t - tV) / Math.max(0.5, tS + 0.5 - tV));
      const wat = t > tV ? -q.on('Verliezen', 1) : (t > tZ ? 1 : 0);
      sluitcellen(ctx, 860, 450, 1.25, open, { t, hiWand: fade(q, 'wand', 'Zwellen'), hiCel: fade(q, 'sluitcellen', 'Hun'), water: wat });
      label(ctx, 'sluitcel', '', 860 - 1.25 * (4 + open * 46 + 40), 450 + 40, 400, 620, q.on('sluitcellen', 1), C.text, 'right');
      label(ctx, 'sluitcel', '', 860 + 1.25 * (4 + open * 46 + 40), 450 + 40, 1320, 620, q.on('sluitcellen', 1), C.text, 'left');
      label(ctx, 'dikke wand', 'AAN DE KANT VAN DE OPENING', 860 + 1.25 * (4 + open * 46) + 6, 450 - 100, 1320, 220, q.on('dikker', 1), C.goud, 'left');
      tag(ctx, 'water erin: open', 1560, 760, TR.water, fade(q, 'Zwellen', 'Verliezen'));
      tag(ctx, 'water eruit: dicht', 1560, 760, C.text, q.on('Verliezen', 1));
      metaText(ctx, 'huidmondje · bovenaanzicht', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    });
  },

  s12(ctx, t, q) {
    const pB = wissel(q, 'vacuole'), pC = wissel(q, 'Tegelijk'), pD = wissel(q, 'Avonds'); bg(ctx, 'micro');
    const balans = (inn, uit, a) => laag(ctx, a, () => { const bx = 1530, by = 560; metaText(ctx, 'water per uur', 1640, 200, C.grain, 'center', 24);
      for (const [i, v, lab] of [[0, uit, 'eruit'], [1, inn, 'erin']]) { const x = bx + i * 170; roundRect(ctx, x, by - 320, 90, 320, 12); shape(ctx, rgba(C.bgSchema, 0.6), C.line, 1.5); roundRect(ctx, x + 6, by - 6 - 308 * v, 78, 308 * v, 8); ctx.fillStyle = rgba(TR.water, 0.85); ctx.fill(); text(ctx, lab, x + 45, by + 46, fTekst(32, 600), C.text, 'center'); } });
    laag(ctx, 1 - pB.uit, () => { kamer(ctx, 0); potPlant(ctx, 960, 490, 1, 1, t); klok(ctx, 250, 270, 88, 2, '14:00', 1, C.text);
      balans(0.4, 0.9, q.on('verdampt', 1)); tag(ctx, 'meer verdamping dan aanvoer', 960, 800, TR.water, q.on('verdampt', 1)); });
    laag(ctx, pB.in * (1 - pC.uit), () => { bg(ctx, 'micro');
      const tur = 1 - ramp(t, q.at('drukt'), q.at('daalt') + 0.8 - q.at('drukt'));
      plantCel(ctx, 900, 450, 720, 460, tur, { t, hiVac: fade(q, 'vacuole', 'celwand'), hiWand: fade(q, 'celwand', 'turgor') });
      label(ctx, 'vacuole', '', 900, 470, 1400, 300, q.on('vacuole', 1), TR.water, 'left');
      label(ctx, 'celwand', '', 900 + 360, 450 + 60, 1400, 640, q.on('celwand', 1), C.groen, 'left');
      tag(ctx, 'turgor: druk tegen de celwand', 900, 820, C.goud, fade(q, 'turgor', 'daalt'));
      tag(ctx, 'de turgor daalt: de bladeren zakken', 900, 820, C.goud, q.on('daalt', 1));
      metaText(ctx, 'bladcel · schematisch', 60, CAPTION_Y - 30, C.text2, 'left', 26); });
    laag(ctx, pC.in * (1 - pD.uit), () => { bg(ctx, 'micro');
      const open = lerp(1, 0.08, ramp(t, q.at('sluiten'), 1.6));
      sluitcellen(ctx, 700, 450, 1.1, open, { t, damp: 1 });
      label(ctx, 'huidmondje gaat dicht', '', 700, 330, 360, 160, fade(q, 'sluiten', 'Avonds'), C.goud, 'right');
      regel(ctx, 'minder verdamping', 1300, 330, q.on('verdampt', 2), TR.water, 40);
      regel(ctx, 'minder koolstofdioxide', 1300, 450, q.on('koolstofdioxide', 1), PL.co2, 40);
      regel(ctx, 'minder suiker', 1300, 570, q.on('suiker', 1), TR.suiker, 40);
      laag(ctx, q.on('suiker', 1), () => { for (let k = 0; k < 6; k++) { ctx.save(); ctx.globalAlpha *= k < 3 ? 1 : lerp(1, 0.2, ramp(t, q.at('suiker') + 0.3, 1)); sDot(ctx, 1320 + k * 40, 640, 12); ctx.restore(); } });
      metaText(ctx, 'huidmondje · bovenaanzicht', 60, CAPTION_Y - 30, C.text2, 'left', 26); });
    laag(ctx, pD.in, () => { const av = ramp(t, q.at('Avonds'), 1.5); kamer(ctx, av);
      const slap = 1 - ramp(t, q.at('vullen'), q.at('recht') + 0.4 - q.at('vullen'));
      potPlant(ctx, 960, 490, 1, slap, t); klok(ctx, 250, 270, 88, lerp(2, 8, av), '20:00', 1, C.text);
      tag(ctx, 'koeler en donkerder', 250, 470, C.text2, fade(q, 'koeler', 'antwoord'));
      const k = ramp(t, q.at('verdampt', 3), 1.5); balans(lerp(0.4, 0.8, ramp(t, q.at('tekort'), 1.5)), lerp(0.9, 0.3, k), fade(q, 'verdampt', 'antwoord', 3));
      tag(ctx, 'de cellen vullen zich', 960, 800, TR.water, fade(q, 'vullen', 'antwoord'));
      tag(ctx, 'antwoord b: meer verlies dan aanvoer', 960, 800, C.goud, fade(q, 'antwoord', 'kapot'));
      tag(ctx, 'niet kapot, alleen tijdelijk slap', 960, 800, C.groen, q.on('kapot', 1)); });
  },

  // ---------- vwo ----------
  s13(ctx, t, q) { bg(ctx, 'schema');
    const pB = wissel(q, 'Watermoleculen'), pC = wissel(q, 'spanning'), pD = wissel(q, 'Zo', 2);
    laag(ctx, 1 - pB.uit, () => {
      houtvat(ctx, 960, 110, 860, 110, { t, water: 1, n: 7, stroom: 70 });
      tag(ctx, 'een lange waterkolom', 1400, 300, TR.water, q.on('waterkolom', 1));
      laag(ctx, q.on('breekt', 1), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(870, 420); ctx.lineTo(1050, 400); ctx.stroke(); ctx.setLineDash([]); });
      vraagteken(ctx, 1150, 440, q.on('breekt', 1), 130);
    });
    laag(ctx, pB.in * (1 - pC.uit), () => {
      const xl = 640, xr = 1220, y0 = 110, y1 = 860;
      for (const wx of [xl, xr]) { ctx.fillStyle = PL.hout; ctx.fillRect(wx - (wx === xl ? 16 : 0), y0, 16, y1 - y0); }
      const cols = 6, dx = (xr - xl) / (cols + 1), dy = 78, off = (t * 26) % dy, co = q.on('waterstofbruggen', 1), ad = q.on('plakken', 1);
      const pos = []; for (let r = -1; r < 11; r++) for (let c = 0; c < cols; c++) { const w = wander(r * 7 + c, t, 6, 0.8); const px = xl + dx * (c + 1) + (r % 2) * dx * 0.3 - dx * 0.15 + w.x, py = y1 - r * dy - off + w.y; if (py < y0 + 10 || py > y1 - 10) continue; pos.push([px, py, c]); }
      laag(ctx, co, () => { ctx.strokeStyle = rgba(TR.water, 0.7); ctx.lineWidth = 2; ctx.setLineDash([5, 5]); for (let i = 0; i < pos.length; i++) for (let j = i + 1; j < pos.length; j++) { const d = Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]); if (d < 105) { ctx.beginPath(); ctx.moveTo(pos[i][0], pos[i][1]); ctx.lineTo(pos[j][0], pos[j][1]); ctx.stroke(); } } ctx.setLineDash([]); });
      laag(ctx, ad, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([5, 5]); for (const p of pos) { if (p[2] === 0) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(xl, p[1]); ctx.stroke(); } if (p[2] === cols - 1) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(xr, p[1]); ctx.stroke(); } } ctx.setLineDash([]); });
      for (const p of pos) waterMol(ctx, p[0], p[1], 13, 1);
      tag(ctx, 'cohesie: water trekt aan water', 1560, 300, TR.water, q.on('cohesie', 1));
      tag(ctx, 'adhesie: water plakt aan de wand', 1560, 420, C.goud, q.on('adhesie', 1));
      tag(ctx, 'een ononderbroken draad', 1560, 560, TR.water, q.on('ononderbroken', 1));
      metaText(ctx, 'houtvat · ingezoomd', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    });
    laag(ctx, pC.in * (1 - pD.uit), () => {
      const x = 700, y0 = 110, y1 = 860; const sp = 1;
      houtvat(ctx, x, y0, y1, 130, { t, water: 1, n: 7, stroom: 80 });
      laag(ctx, q.on('spanning', 1), () => { for (let yy = y0 + 40; yy < y0 + 300; yy += 60) { pijl(ctx, x - 140, yy + 20, x - 90, yy + 20, C.text2, 0.8, 3); pijl(ctx, x + 140, yy + 20, x + 90, yy + 20, C.text2, 0.8, 3); } });
      const gauge = (gy, v, lab, al) => laag(ctx, al, () => { roundRect(ctx, 1050, gy - 40, 420, 64, 14); shape(ctx, rgba(C.bgSchema, 0.6), C.line, 1.5); roundRect(ctx, 1056, gy - 34, 408 * v, 52, 10); ctx.fillStyle = rgba(TR.water, 0.8); ctx.fill(); text(ctx, lab, 1500, gy + 6, fTekst(36, 600), C.text, 'left'); });
      gauge(220, 0.18, 'bovenin: lage druk', q.on('lager', 1)); gauge(760, 0.7, 'onderin: hogere druk', q.on('onderin', 1));
      tag(ctx, 'het water staat onder spanning', 1260, 480, C.goud, fade(q, 'spanning', 'stroomt'));
      laag(ctx, q.on('stroomt', 1), () => { pijl(ctx, 1260, 680, 1260, 320, TR.water, 1, 6); text(ctx, 'van hoge naar lage druk', 1300, 510, fTekst(36, 600), C.text, 'left'); });
    });
    laag(ctx, pD.in, () => {
      const gx = 300, gy = 840, hpx = 680, mm = (m) => gy - m / 120 * hpx;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, mm(120)); ctx.stroke();
      for (let m = 0; m <= 120; m += 20) { ctx.beginPath(); ctx.moveTo(gx - 10, mm(m)); ctx.lineTo(gx, mm(m)); ctx.stroke(); text(ctx, m + ' m', gx - 18, mm(m) + 10, fTekst(28), C.text2, 'right'); }
      ctx.fillStyle = PL.aardeR; ctx.fillRect(gx, gy, 1300, 6);
      const tx = 820, top = mm(116); ctx.fillStyle = PL.bast; ctx.fillRect(tx - 16, top + 60, 32, gy - top - 60);
      ctx.fillStyle = '#3E7350'; ctx.beginPath(); ctx.moveTo(tx, top); for (let k = 0; k <= 8; k++) { const yy = top + k * (gy - top - 120) / 8; const ww = 40 + k * 14; ctx.lineTo(tx + ww, yy + 30); ctx.lineTo(tx + ww * 0.5, yy + 30); } ctx.lineTo(tx - 10, gy - 120); for (let k = 8; k >= 0; k--) { const yy = top + k * (gy - top - 120) / 8; const ww = 40 + k * 14; ctx.lineTo(tx - ww * 0.5, yy + 30); ctx.lineTo(tx - ww, yy + 30); } ctx.closePath(); ctx.fill();
      const u = ramp(t, q.at('Zo', 2), 3); ctx.fillStyle = TR.water; ctx.fillRect(tx - 5, lerp(gy, top + 10, u), 10, gy - lerp(gy, top + 10, u));
      label(ctx, 'hoogste boom', '≈ 116 METER', tx + 10, top + 10, 1080, top + 30, q.on('honderd', 1), C.text, 'left');
      laag(ctx, q.on('worteldruk', 1), () => { roundRect(ctx, 1000, mm(5), 60, gy - mm(5), 6); ctx.fillStyle = C.goud; ctx.fill(); });
      tag(ctx, 'worteldruk alleen: een paar meter', 1420, 760, C.goud, q.on('worteldruk', 1));
      tag(ctx, 'cohesie + zuigkracht: tot in de top', 1420, 300, TR.water, q.on('hoogste', 1));
    });
  },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const x0 = 380, x1 = 1440, yX = 250, yZ = 480, mx = (x0 + x1) / 2, L = x1 - x0;
    const bron = q.on('bron', 1), pomp = q.on('pompt', 1), wIn = q.on('Water', 1), put = q.on('put', 1), uit = q.on('eruit', 1), wUit = q.on('Water', 2), stroom = q.on('sap', 1);
    horizontaal(ctx, mx, yX, () => houtvat(ctx, 0, -L / 2, L / 2, 70, { t, water: 1, n: 6, stroom: 60, ringen: 1 }));
    // let op: houtvat stroomt hier van rechts (wortel) naar links (blad)
    horizontaal(ctx, mx, yZ, () => zeefvat(ctx, 0, -L / 2, L / 2, 110, { t, n: 6, suiker: stroom, dir: 1, stroom: 110, hiPlaat: 0, druk: q.on('hoog', 1) }));
    laag(ctx, q.on('zeefvat', 1) * (1 - q.on('begeleidende', 1)), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x0 - 8, yZ - 66, L + 16, 132); });
    metaText(ctx, 'houtvat', x1 + 30, yX + 8, TR.water, 'left', 26); metaText(ctx, 'zeefvat', x1 + 30, yZ + 8, TR.suiker, 'left', 26);
    // begeleidende cel bij de bron
    const bc = q.on('begeleidende', 1);
    laag(ctx, bc, () => { roundRect(ctx, 420, yZ + 70, 260, 90, 18); shape(ctx, rgba(C.groen, 0.25), fade(q, 'begeleidende', 'Daardoor') > 0.5 ? C.goud : C.groen, 2.5); ctx.beginPath(); ctx.arc(470, yZ + 115, 18, 0, 6.283); shape(ctx, '#3E7A4E', C.groen, 1); });
    label(ctx, 'begeleidende cel', '', 680, yZ + 115, 820, yZ + 210, bc * (1 - q.on('put', 1)), C.groen, 'left');
    // bron en put
    laag(ctx, bron, () => { text(ctx, 'bron', 200, yZ - 20, fTitel(52), C.text, 'center'); metaText(ctx, 'blad', 200, yZ + 26, C.grain, 'center', 26); });
    laag(ctx, put, () => { text(ctx, 'put', 1660, yZ + 130, fTitel(52), C.text, 'center'); metaText(ctx, 'groeipunt · vrucht · wortel', 1660, yZ + 176, C.grain, 'center', 24); });
    // suiker de zeefvat in (bron)
    if (pomp > 0.01) { for (let k = 0; k < 3; k++) stroomDots(ctx, [[520 + k * 50, yZ + 110], [520 + k * 50, yZ + 30]], 2, t, 50, (x, y) => sDot(ctx, x, y, 9), k * 3, pomp);
      ctx.save(); ctx.globalAlpha *= pomp * (1 - stroom); for (let k = 0; k < Math.round(4 + 10 * ramp(t, q.at('pompt'), 4)); k++) { const w = wander(k, t, 5, 1); sDot(ctx, 400 + (k % 5) * 50 + w.x, yZ - 30 + Math.floor(k / 5) * 30 + w.y, 9); } ctx.restore(); }
    tag(ctx, 'osmotische waarde stijgt', 640, 680, TR.suiker, fade(q, 'osmotische', 'Water'));
    // water erin bij de bron, eruit bij de put
    if (wIn > 0.01) for (let k = 0; k < 3; k++) stroomDots(ctx, [[420 + k * 70, yX + 40], [420 + k * 70, yZ - 40]], 3, t, 80, (x, y) => wDot(ctx, x, y, 7), 20 + k * 3, wIn);
    if (wUit > 0.01) for (let k = 0; k < 3; k++) stroomDots(ctx, [[1250 + k * 70, yZ - 40], [1330 + k * 70, yX + 40]], 3, t, 80, (x, y) => wDot(ctx, x, y, 7), 40 + k * 3, wUit);
    if (uit > 0.01) for (let k = 0; k < 3; k++) stroomDots(ctx, [[1260 + k * 60, yZ + 30], [1540 + k * 30, yZ + 70]], 2, t, 60, (x, y) => sDot(ctx, x, y, 9), 60 + k * 3, uit);
    // drukmeters
    const meter = (x, v, lab, al) => laag(ctx, al, () => { roundRect(ctx, x, 700, 300, 54, 12); shape(ctx, rgba(C.bgSchema, 0.6), C.line, 1.5); roundRect(ctx, x + 6, 706, 288 * v, 42, 8); ctx.fillStyle = rgba(TR.suiker, 0.85); ctx.fill(); text(ctx, lab, x + 150, 810, fTekst(34, 600), C.text, 'center'); });
    meter(400, 0.9, 'hoge druk', q.on('hoog', 1)); meter(1140, 0.15, 'lage druk', q.on('laag', 1));
    laag(ctx, stroom, () => pijl(ctx, 740, 727, 1100, 727, TR.suiker, 1, 6));
    tag(ctx, 'ook hier: een drukverschil', 960, 110, C.goud, fade(q, 'drukverschil', 'drukstroomtheorie'));
    tag(ctx, 'drukstroomtheorie', 960, 110, C.goud, q.on('drukstroomtheorie', 1));
  },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const y0 = 360, zy0 = 560, zy1 = 640;
    stengelLengte(ctx, y0, 820, { t });
    horizontaal(ctx, 960, (zy0 + zy1) / 2, () => zeefvat(ctx, 0, -820, 820, zy1 - zy0, { t, n: 9, suiker: 1, stroom: 0, druk: 0 }));
    horizontaal(ctx, 960, 720, () => houtvat(ctx, 0, -820, 820, 70, { t, water: 0, n: 9 }));
    metaText(ctx, 'zeefvat', 1700, zy0 - 14, TR.suiker, 'center', 26);
    bladluis(ctx, 860, y0 - 70, 1.1, { t, stilet: [1020, (zy0 + zy1) / 2] });
    naamBij(ctx, 'monddeel', 'IN ÉÉN ZEEFVAT', 1000, 318, q.on('monddeel', 1), 'left', C.text);
    vraagteken(ctx, 1790, 250, q.on('zuigen', 1), 130);
  },

  s17(ctx, t, q) { bg(ctx, 'schema');
    const y0 = 360, zy0 = 560, zy1 = 640, mid = (zy0 + zy1) / 2;
    const los = ramp(t, q.at('los'), 1.4);
    stengelLengte(ctx, y0, 820, { t });
    horizontaal(ctx, 960, mid, () => zeefvat(ctx, 0, -820, 820, zy1 - zy0, { t, n: 9, suiker: 1, stroom: 40 * q.on('druk', 1), druk: q.on('druk', 1) }));
    horizontaal(ctx, 960, 720, () => houtvat(ctx, 0, -820, 820, 70, { t, water: 0, n: 9 }));
    const st = [1020, mid], top = [860 + 92 * 1.1, y0 - 70 + 30 * 1.1];
    const lx = lerp(0, -260, los), ly = lerp(0, -120, los);
    bladluis(ctx, 860 + lx, y0 - 70 + ly, 1.1, { t, stilet: [top[0] + lx + 20, top[1] + ly + 50], zwel: q.on('geperst', 1) * (1 - los), a: 1 - 0.7 * los });
    // stilet blijft achter na het lossnijden
    ctx.strokeStyle = '#D6D0B8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(los > 0.01 ? lerp(top[0], top[0] + 30, los) : top[0], los > 0.01 ? lerp(top[1], top[1] + 40, los) : top[1]); ctx.lineTo(st[0], st[1]); ctx.stroke();
    // sap omhoog de luis in / druppels uit het stilet
    if (los < 0.99) stroomDots(ctx, [st, top], 5, t, 70, (x, y) => sDot(ctx, x, y, 7), 7, q.on('druk', 1) * (1 - los));
    const tip = [top[0] + 30, top[1] + 40];
    if (q.on('druppelt', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('druppelt', 1); for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; ctx.fillStyle = rgba(TR.suiker, 0.9 * (1 - u)); ctx.beginPath(); ctx.ellipse(tip[0] + u * 6, tip[1] - 14 - u * 50, 8 + u * 4, 10 + u * 5, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
    tag(ctx, 'antwoord b: het sap staat onder druk', 1420, 200, C.goud, 1 - q.on('druppelt', 1));
    tag(ctx, 'sap druppelt nog uren na', 1420, 200, TR.suiker, q.on('druppelt', 1));
    klok(ctx, 1790, 270, 60, t * 1.5, '', q.on('uren', 1), C.text);
    laag(ctx, fade(q, 'druk', 'los'), () => { for (let k = 0; k < 4; k++) pijl(ctx, 700 + k * 110, mid, 770 + k * 110, mid, C.goud, 0.7, 3); });
  },

  s18(ctx, t, q) {
    const pB = wissel(q, 'Huidmondjes'), pC = wissel(q, 'middag'); bg(ctx, 'schema');
    laag(ctx, 1 - pB.uit, () => { bg(ctx, 'schema');
      schemaPlant(ctx, 900, 620, 0.85, { t, xyl: q.on('xyleem', 1), flo: q.on('floëem', 1), water: q.on('xyleem', 1), omlaag: q.on('floëem', 1), naarVrucht: q.on('floëem', 1), naarTop: q.on('floëem', 1), hi: { blad: fade(q, 'zuigkracht', 'floëem') } });
      tag(ctx, 'twee soorten vaten', 1450, 160, C.goud, fade(q, 'twee', 'xyleem'));
      regel(ctx, 'xyleem: water en mineralen omhoog', 1260, 300, q.on('xyleem', 1), TR.water, 36);
      regel(ctx, 'getrokken door de zuigkracht', 1260, 350, q.on('zuigkracht', 1), C.text, 32, 'left', 400);
      regel(ctx, 'floëem: suiker naar de hele plant', 1260, 460, q.on('floëem', 1), TR.suiker, 36);
      laag(ctx, fade(q, 'zuigkracht', 'floëem'), () => { for (let i = 0; i < 3; i++) { const p = plantPunt(900, 620, 0.85, plBladPt(i, 0.6)); pijl(ctx, p[0], p[1] - 30, p[0], p[1] - 110, C.goud, 1, 5); } });
    });
    laag(ctx, pB.in * (1 - pC.uit), () => { bg(ctx, 'schema');
      bladDoorsnede(ctx, 680, 430, 1, { t, co2: 1, damp: q.on('water', 2), hiStoma: 1 });
      tag(ctx, 'koolstofdioxide erin', 1640, 300, PL.co2, 1); tag(ctx, 'water eruit', 1640, 520, TR.water, q.on('water', 2)); });
    laag(ctx, pC.in, () => { const av = ramp(t, q.at('Avonds'), 1.4); kamer(ctx, av);
      const slap = clamp(ramp(t, q.at('zakte') - 0.8, 1.2) - ramp(t, q.at('Avonds') + 0.4, 1.4), 0, 1);
      potPlant(ctx, 960, 490, 1, slap, t); klok(ctx, 250, 270, 88, lerp(2, 8, av), av > 0.5 ? '20:00' : '14:00', 1, C.text);
      tag(ctx, 'meer verdamping dan opname', 960, 800, TR.water, 1 - ramp(t, q.at('Avonds'), 0.4));
      tag(ctx, 'tekort ingehaald', 960, 800, C.groen, ramp(t, q.at('Avonds') + 0.5, 0.5)); });
  },
};
