// Gedrag 3 · Baltsen en kiezen — scènes per alinea (v1.0, 15 okt 2026). Pauw, widavogels (Andersson), stekelbaarsbalts als actie-reactieketen.

const ROOD = '#D8503C', ZILVER = '#AFC0C8', RUG = '#5E7A6A', WATER = '#1E3A4A', ZAND = '#8C7A5A', PLANT = '#4E8F5E', POSTROOD = '#C8392B';

function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- stekelbaars (zijaanzicht, kop rechts) ----------
function stekelbaars(ctx, x, y, s, o = {}) { const { rood = 0, dreig = 0, a = 1, flip = 1, t = 0, oogkleur = '#7FC4E0' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  const sw = Math.sin(t * 8) * 0.08; // staart wiebelt
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-128, -22 + sw * 60); ctx.lineTo(-122, 0); ctx.lineTo(-128, 22 + sw * 60); ctx.closePath(); shape(ctx, RUG, null);
  ctx.beginPath(); ctx.moveTo(-95, 0); ctx.quadraticCurveTo(-30, -48, 60, -18); ctx.quadraticCurveTo(96, -6, 100, 4); ctx.quadraticCurveTo(80, 26, 20, 28); ctx.quadraticCurveTo(-50, 26, -95, 0); ctx.closePath(); shape(ctx, ZILVER, null);
  // rug donker
  ctx.save(); ctx.clip(); ctx.fillStyle = RUG; ctx.fillRect(-100, -60, 210, 44);
  if (rood > 0.01) { ctx.fillStyle = rgba(ROOD, rood); ctx.beginPath(); ctx.ellipse(40, 22, 70, 22, 0, 0, 6.283); ctx.fill(); }
  ctx.restore();
  // drie rugstekels + buikstekel
  ctx.strokeStyle = '#3E5A4A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [bx, len] of [[30, 30], [5, 26], [-40, 14]]) { const an = -Math.PI / 2 - 0.9 * (1 - dreig); ctx.beginPath(); ctx.moveTo(bx, -26); ctx.lineTo(bx + Math.cos(an) * len, -26 + Math.sin(an) * len); ctx.stroke(); }
  { const an = Math.PI / 2 + 0.9 * (1 - dreig); ctx.beginPath(); ctx.moveTo(10, 26); ctx.lineTo(10 + Math.cos(an) * 20, 26 + Math.sin(an) * 20); ctx.stroke(); }
  circ(ctx, 72, -6, 9, '#F2F2EE'); circ(ctx, 74, -6, 5, '#121A26'); circ(ctx, 72, -6, 9, null, oogkleur, 2);
  ctx.restore(); }
function aquarium(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 8); shape(ctx, rgba(WATER, 0.9), '#9FB8C8', 4); ctx.fillStyle = ZAND; ctx.fillRect(x + 4, y + h - 40, w - 8, 36);
  for (let i = 0; i < 6; i++) { const px = x + 30 + i * (w - 60) / 5; ctx.strokeStyle = PLANT; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, y + h - 30); ctx.quadraticCurveTo(px + 20, y + h - 110, px - 6, y + h - 150 - (i % 2) * 40); ctx.stroke(); }
  ctx.restore(); }
function nest(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 60, 24, 0, Math.PI, 0); shape(ctx, '#6B8A4A', '#4E6A3A', 2); circ(ctx, x + 50, y - 8, 10, '#1E3A4A'); ctx.restore(); }

// ---------- extra helpers film 3 ----------
const PAUWB = '#1E6A8C', PAUWG = '#2E8A6A', VEER = '#4E8A3E', VOS = '#D8702C', WIDA = '#1A1A1E', WIDAR = '#E0702C';
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function weide(ctx) { ctx.fillStyle = '#7FA8C8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#9FC0D8'; ctx.fillRect(0, 300, W, 120); ctx.fillStyle = '#4E7A52'; ctx.fillRect(0, 400, W, H - 400); ctx.fillStyle = rgba('#2E4A34', 0.5); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(120 + i * 230, 410, 160, 50, 0, Math.PI, 0); ctx.fill(); } }
function denkwolk(ctx, x, y, w, h, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.95), null); circ(ctx, x + 20, y + h + 14, 12, rgba('#F2F2EE', 0.95)); circ(ctx, x - 6, y + h + 40, 7, rgba('#F2F2EE', 0.95)); ctx.font = fTekst(30, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; ctx.fillText(s, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }
// pauw: open = 0 (sleep dicht) .. 1 (waaier), kop rechts
function pauw(ctx, x, y, s, o = {}) { const { a = 1, open = 1, t = 0, flip = 1, tril = 0, glans = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  const n = 26, R = 330; const sh = Math.sin(t * 30) * 0.012 * tril;
  if (open > 0.02) { for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + (i / (n - 1) - 0.5) * Math.PI * 1.05 * open + sh; const ex = -30 + Math.cos(an) * R, ey = -40 + Math.sin(an) * R;
      ctx.strokeStyle = rgba(VEER, 0.9); ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -40); ctx.lineTo(ex, ey); ctx.stroke();
      for (const f of [0.55, 0.8, 1]) { const px = -30 + Math.cos(an) * R * f, py = -40 + Math.sin(an) * R * f; ctx.beginPath(); ctx.ellipse(px, py, 22, 16, an, 0, 6.283); shape(ctx, rgba('#C8A23A', glans), null); circ(ctx, px, py, 11, rgba('#2E7A9A', glans)); circ(ctx, px, py, 6, '#14243A'); } } }
  else { ctx.fillStyle = VEER; ctx.beginPath(); ctx.moveTo(-60, -10); ctx.quadraticCurveTo(-260, 10, -380, 40); ctx.lineTo(-370, 70); ctx.quadraticCurveTo(-240, 50, -50, 30); ctx.closePath(); ctx.fill(); }
  ctx.strokeStyle = '#8A7A6A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-10, 40); ctx.lineTo(-16, 110); ctx.moveTo(20, 40); ctx.lineTo(26, 110); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 52, -0.2, 0, 6.283); shape(ctx, PAUWB, null);
  ctx.strokeStyle = PAUWB; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(40, -20); ctx.quadraticCurveTo(70, -70, 62, -120); ctx.stroke();
  circ(ctx, 64, -128, 20, PAUWB); ctx.beginPath(); ctx.moveTo(80, -132); ctx.lineTo(102, -124); ctx.lineTo(80, -118); ctx.closePath(); shape(ctx, '#C9B8A0', null); circ(ctx, 70, -132, 4, '#121A26'); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(62, -138, 18, 3);
  ctx.strokeStyle = PAUWB; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(60, -146); ctx.lineTo(48 + i * 8, -176); ctx.stroke(); circ(ctx, 48 + i * 8, -178, 4, PAUWB); }
  ctx.restore(); }
function vos(ctx, x, y, s, o = {}) { const { a = 1, t = 0, flip = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s);
  ctx.fillStyle = VOS; ctx.beginPath(); ctx.moveTo(-90, -10); ctx.quadraticCurveTo(-170, -30 + Math.sin(t * 2) * 8, -200, 10); ctx.quadraticCurveTo(-150, 10, -90, 14); ctx.fill(); circ(ctx, -196, 8, 10, '#F2F2EE');
  ctx.fillStyle = VOS; ctx.beginPath(); ctx.ellipse(-20, 0, 90, 34, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#3A2A20'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (const lx of [-70, -40, 20, 50]) { ctx.beginPath(); ctx.moveTo(lx, 20); ctx.lineTo(lx + Math.sin(t * 4 + lx) * 6, 66); ctx.stroke(); }
  ctx.fillStyle = VOS; ctx.beginPath(); ctx.moveTo(60, -20); ctx.lineTo(130, -6); ctx.lineTo(70, 20); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(70, -20); ctx.lineTo(78, -50); ctx.lineTo(92, -18); ctx.closePath(); ctx.fill(); circ(ctx, 100, -10, 4, '#121A26'); circ(ctx, 130, -6, 5, '#121A26');
  ctx.restore(); }
function eicel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#E8C9A8', 0.85), '#C9A27A', 3); circ(ctx, x, y, r * 0.28, rgba('#B8805A', 0.8)); ctx.restore(); }
function zaadcel(ctx, x, y, s, an, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 9, 6, 0, 0, 6.283); shape(ctx, '#DDE6EE', null); ctx.strokeStyle = '#DDE6EE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-9, 0); for (let i = 1; i <= 10; i++) ctx.lineTo(-9 - i * 4, Math.sin(t * 14 + i) * 3); ctx.stroke(); ctx.restore(); }
function hert(ctx, x, y, s, flip = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * flip, s); ctx.fillStyle = '#8A5A3A'; ctx.beginPath(); ctx.ellipse(-60, 30, 90, 46, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(60, -20); ctx.lineTo(90, 20); ctx.lineTo(30, 40); ctx.closePath(); ctx.fill(); circ(ctx, 62, -6, 4, '#121A26');
  ctx.strokeStyle = '#D8C8A8'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(50, -24); ctx.quadraticCurveTo(80, -80, 120, -100); ctx.moveTo(70, -60); ctx.lineTo(100, -50); ctx.moveTo(86, -80); ctx.lineTo(116, -78); ctx.moveTo(40, -24); ctx.quadraticCurveTo(50, -90, 80, -120); ctx.moveTo(52, -80); ctx.lineTo(30, -96); ctx.stroke();
  ctx.strokeStyle = '#5A3A26'; ctx.lineWidth = 10; for (const lx of [-110, -80, -30, -10]) { ctx.beginPath(); ctx.moveTo(lx, 60); ctx.lineTo(lx, 130); ctx.stroke(); } ctx.restore(); }
// widavogel met staartlengte L (px)
function wida(ctx, x, y, s, L, o = {}) { const { a = 1, t = 0, knip = 0, plak = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6A4A'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-90, 46); ctx.lineTo(90, 46); ctx.stroke();
  const sw = Math.sin(t * 1.5) * 0.04; ctx.strokeStyle = WIDA; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, 16); ctx.bezierCurveTo(-50, 16 + L * 0.35, -70 + sw * L, 16 + L * 0.7, -60 + sw * L, 16 + L); ctx.stroke();
  if (plak > 0.01) { ctx.save(); ctx.globalAlpha *= plak; circ(ctx, -50, 16 + L * 0.42, 8, C.goud); ctx.restore(); }
  if (knip > 0.01) { ctx.save(); ctx.globalAlpha *= knip; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(-74, 16 + L + 6); ctx.lineTo(-40, 16 + L + 6); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 38, 26, -0.3, 0, 6.283); shape(ctx, WIDA, null); ctx.beginPath(); ctx.ellipse(-4, -6, 16, 9, -0.3, 0, 6.283); shape(ctx, WIDAR, null);
  circ(ctx, 30, -26, 17, WIDA); ctx.beginPath(); ctx.moveTo(42, -30); ctx.lineTo(58, -24); ctx.lineTo(42, -18); ctx.closePath(); shape(ctx, '#C9C2B2', null); circ(ctx, 34, -30, 3, '#F2F2EE');
  ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-4, 22); ctx.lineTo(-6, 46); ctx.moveTo(8, 22); ctx.lineTo(10, 46); ctx.stroke(); ctx.restore(); }
function grootNest(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 230, 80, 0, 0, 6.283); shape(ctx, '#5E7A3E', '#3E5A2A', 3); ctx.strokeStyle = rgba('#8AA05A', 0.7); ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x - 200 + i * 50, y - 50 + (i % 2) * 20); ctx.lineTo(x - 170 + i * 50, y + 40); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(x - 200, y, 26, 40, 0, 0, 6.283); shape(ctx, '#1E3A4A', null); ctx.restore(); }
function nestje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 24 * s, 12 * s, 0, 0, Math.PI); shape(ctx, '#B8A26A', '#8A7A4A', 2); ctx.restore(); }
// vrouwtje stekelbaars: zilver, dikke buik, kop omhoog
function vrouwtje(ctx, x, y, s, o = {}) { const { a = 1, t = 0, flip = 1, dik = 1, kop = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.45 * kop * flip); stekelbaars(ctx, 0, 0, s, { rood: 0, t, flip });
  if (dik > 0.01) { ctx.save(); ctx.scale(s * flip, s); ctx.beginPath(); ctx.ellipse(20, 26, 62, 18 * dik, 0, 0, Math.PI); shape(ctx, '#D8E2E6', null); ctx.restore(); }
  ctx.restore(); }
function weegschaal(ctx, x, y, tilt, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 180); ctx.moveTo(x - 60, y + 180); ctx.lineTo(x + 60, y + 180); ctx.stroke(); const an = 0.25 * tilt, dx = Math.cos(an) * 200, dy = Math.sin(an) * 200; ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x + dx, y + dy); ctx.stroke(); for (const [k, px, py] of [[-1, x - dx, y - dy], [1, x + dx, y + dy]]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 50, py + 60); ctx.lineTo(px + 50, py + 60); ctx.closePath(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); return [[x - dx, y - dy + 60], [x + dx, y + dy + 60]]; }

// actie-reactieketen stekelbaars
const KETEN = [['v', 'vrouwtje met dikke buik', ['dikke', 1]], ['m', 'zigzagdans', ['zigzagdans', 1]], ['v', 'zwemt met kop omhoog naar hem toe', ['omhoog', 1]], ['m', 'zwemt naar het nest', ['nest', 1]], ['v', 'volgt', ['volgt', 1]], ['m', 'wijst de ingang aan', ['ingang', 1]], ['v', 'kruipt in het nest', ['kruipt', 1]], ['m', 'trilt tegen haar staartwortel', ['trillende', 1]], ['v', 'legt eieren', ['legt', 1]], ['v', 'zwemt weg', ['weg', 1]], ['m', 'bevrucht de eieren', ['bevrucht', 1]]];
function keten(ctx, q, x0, y0, rowH, o = {}) { const { a = 1, alle = 0, hl = -1, w = 560, gap = 260, px = 26 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  regel(ctx, 'mannetje', x0 + w / 2, y0 - 24, 1, ROOD, 28, 'center', 700); regel(ctx, 'vrouwtje', x0 + w + gap + w / 2, y0 - 24, 1, C.teal, 28, 'center', 700);
  let prev = null; KETEN.forEach(([wie, s, [cw, cn]], i) => { const al = alle ? 1 : q.on(cw, cn); if (al <= 0.01) { prev = null; return; } const x = wie === 'm' ? x0 : x0 + w + gap, y = y0 + i * rowH; ctx.save(); ctx.globalAlpha *= al; const col = wie === 'm' ? ROOD : C.teal; roundRect(ctx, x, y, w, rowH - 12, 10); shape(ctx, rgba(col, hl === i ? 0.3 : 0.12), col, hl === i ? 3 : 1.5); text(ctx, s, x + w / 2, y + (rowH - 12) / 2 + px * 0.36, fTekst(px, 600), C.text, 'center');
    if (prev) { const [pw, py] = prev; const fx = pw === 'm' ? x0 + w : x0 + w + gap, tx = wie === 'm' ? x0 + w : x0 + w + gap; if (pw !== wie) pijl(ctx, fx + (pw === 'm' ? 8 : -8), py + (rowH - 12) / 2, tx + (wie === 'm' ? 8 : -8), y + (rowH - 12) / 2, C.goud, 1, 3, 14); else pijl(ctx, (wie === 'm' ? x0 : x0 + w + gap) + w / 2, py + rowH - 12, (wie === 'm' ? x0 : x0 + w + gap) + w / 2, y, C.goud, 1, 3, 12); }
    ctx.restore(); prev = [wie, y]; });
  ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { pauw(ctx, 1450, 640, 0.95, { open: 1, t, tril: 0.5 + 0.5 * Math.sin(t * 0.8) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { weide(ctx); const sp = q.on('spreidt', 1, 2.0);
    pauw(ctx, 820, 700, 1.1, { open: sp, t, tril: q.on('Prachtig', 1) });
    tag(ctx, '± 200 veren · ± 150 ogen', 820, 200, C.goud, q.on('tweehonderd', 1) * (1 - q.on('Maar', 1)));
    // energie
    if (q.on('energie', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('energie', 1) * (1 - q.on('Waarom', 1)); roundRect(ctx, 1320, 200, 300, 60, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 2); const lv = 1 - 0.7 * clamp((t - q.at('energie')) / 2.5, 0, 1); ctx.fillStyle = lv > 0.4 ? C.groen : C.koraal; ctx.fillRect(1328, 208, 284 * lv, 44); regel(ctx, 'kost energie om te groeien', 1470, 310, 1, C.text, 28, 'center', 700); ctx.restore(); }
    tag(ctx, 'valt op', 820, 250, C.koraal, q.on('valt', 1) * (1 - q.on('vos', 1)));
    const vx = lerp(2200, 1600, q.on('vos', 1, 2.2)); vos(ctx, vx, 820, 1.1, { t, a: q.on('vos', 1) });
    vraagteken(ctx, 1500, 450, q.on('Waarom', 1), 130); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const gc = q.on('geslachtscellen', 1, 0.8), dr = q.on('Daarom', 1, 0.8);
    if (gc < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - gc;
      regel(ctx, 'Charles Darwin', 140, 140, q.on('Darwin', 1), C.text, 40, 'left', 700);
      card(ctx, 200, 260, 700, 260, 'natuurlijke selectie', 'kenmerken die helpen overleven', q.on('Natuurlijke', 1), C.groen);
      card(ctx, 1020, 260, 700, 260, 'seksuele selectie', 'kenmerken die helpen om te paren, ook als ze de overleving wat kleiner maken', q.on('seksuele', 1), C.paars);
      kruis(ctx, 550, 640, 40, q.on('niet.', 1)); pauw(ctx, 550, 760, 0.35, { open: 1, t, a: q.on('pauwenstaart', 1) });
      pauw(ctx, 1370, 760, 0.35, { open: 1, t, a: q.on('seksuele', 1) }); vink_(ctx, 1560, 650, 26, q.on('seksuele', 1));
      tag(ctx, 'antwoord b: hennen kiezen hanen met een indrukwekkende staart', 960, 140, C.goud, q.on('Antwoord', 1));
      ctx.restore(); }
    if (gc > 0.01 && dr < 0.99) { ctx.save(); ctx.globalAlpha *= gc * (1 - dr);
      regel(ctx, 'geslachtscellen', 140, 140, 1, C.text, 40, 'left', 700);
      eicel(ctx, 420, 400, 140, q.on('eicellen', 1)); regel(ctx, 'eicel: groot, weinig', 420, 600, q.on('eicellen', 1), C.text, 30, 'center', 700);
      const zc = q.on('zaadcellen', 1); for (let i = 0; i < 40; i++) { const zx = 820 + ((i * 97) % 520) + Math.sin(t * 1.5 + i) * 12, zy = 280 + ((i * 53) % 260); zaadcel(ctx, zx, zy, 1.2, Math.sin(i) * 0.4, t, zc); } regel(ctx, 'zaadcellen: klein, miljoenen', 1080, 600, zc, C.text, 30, 'center', 700);
      tag(ctx, 'broeden, dragen, zogen', 420, 720, C.teal, q.on('zorgt', 1));
      const inv = q.on('investeert', 1, 1.2); if (inv > 0.01) { const [L, R] = weegschaal(ctx, 1560, 420, -inv, inv); ctx.save(); ctx.globalAlpha *= inv; eicel(ctx, L[0], L[1] - 30, 34); zaadcel(ctx, R[0], R[1] - 14, 1.4, 0, t); regel(ctx, 'vrouwtje investeert meer', 1560, 700, 1, C.goud, 28, 'center', 700); ctx.restore(); }
      tag(ctx, 'een slechte keuze is duur', 1560, 820, C.koraal, q.on('slechte', 1));
      ctx.restore(); }
    if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; tag(ctx, 'vrouwtjes zijn kieskeurig · mannetjes moeten opvallen', 960, 150, C.goud, 1);
      const v = q.on('vechten', 1, 0.8), clash = Math.max(0, Math.sin(t * 3)) * 20 * v; hert(ctx, 360 + clash, 520, 1.3, 1, v); hert(ctx, 900 - clash, 520, 1.3, -1, v); regel(ctx, 'vechten', 630, 820, v, C.text, 32, 'center', 700);
      pauw(ctx, 1460, 640, 0.6, { open: q.on('showen', 1), t, tril: 1, a: q.on('showen', 1) }); regel(ctx, 'showen', 1460, 820, q.on('showen', 1), C.text, 32, 'center', 700); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'widavogel · staart tot een halve meter', 140, 140, 1, C.text2, 28, 'left', 600);
    const kort = q.on('korter', 1, 1.2), lang = q.on('lange', 1, 1.2), ctrl = q.on('derde', 1);
    wida(ctx, 420, 320, 1.1, lerp(380, 120, kort), { t, a: 1, knip: kort * (1 - q.on('nesten', 1)) }); regel(ctx, 'korter geknipt', 420, 860, kort, C.koraal, 30, 'center', 700);
    wida(ctx, 960, 320, 1.1, 380, { t, a: ctrl, plak: ctrl }); regel(ctx, 'doorgeknipt en teruggeplakt', 960, 860, ctrl, C.text2, 30, 'center', 700);
    wida(ctx, 1500, 320, 1.1, lerp(380, 520, lang), { t, a: q.on('plakte', 1), plak: lang }); regel(ctx, 'verlengd', 1500, 860, lang, C.groen, 30, 'center', 700);
    vraagteken(ctx, 960, 250, q.on('Wat', 1), 100); tag(ctx, 'meeste nesten in het territorium?', 960, 140, C.goud, q.on('nesten', 1) * (1 - q.on('Wat', 1))); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const dk = q.on('denkt', 1, 0.8);
    if (dk < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - dk;
      const groei = q.on('meeste', 1, 1.5); const D = [['kort', 120, 0.5, C.koraal, 420], ['controle', 380, 1.3, C.text2, 960], ['verlengd', 520, 2.2, C.groen, 1500]];
      D.forEach(([nm, L, v, col, x]) => { wida(ctx, x - 140, 300, 0.7, L * 0.7, { t }); const hgt = v * 160 * groei; roundRect(ctx, x + 10, 780 - hgt, 120, hgt, 8); shape(ctx, rgba(col, 0.5), col, 2); for (let k = 0; k < Math.round(v * 2 * groei); k++) nestje(ctx, x + 70, 770 - k * 70, 1.2, 1); regel(ctx, nm, x + 70, 830, 1, col, 28, 'center', 700); });
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 780); ctx.lineTo(1700, 780); ctx.stroke(); metaText(ctx, 'nesten per mannetje (schematisch)', 300, 170, C.text2, 'left', 20);
      tag(ctx, 'knippen en plakken zelf: geen verschil', 1030, 230, C.text2, q.on('knippen', 1)); tag(ctx, 'het ligt aan de staartlengte', 1030, 140, C.goud, q.on('lengte', 1));
      ctx.restore(); }
    if (dk > 0.01) { ctx.save(); ctx.globalAlpha *= dk; denkwolk(ctx, 260, 200, 520, 150, 'ik kies de mooiste', 1); kruis(ctx, 520, 275, 60, q.on('mooiste', 1));
      // prikkelsterkte tegen staartlengte
      const pr = q.on('prikkel', 1); if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; const x = 1000, y = 260, w = 640, h = 360; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); const pg = clamp((t - q.at('langer')) / 2, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + h - 30); ctx.lineTo(x + w * pg, y + h - 30 - (h - 60) * pg); ctx.stroke(); metaText(ctx, 'staartlengte →', x + w, y + h + 34, C.text2, 'right', 20); metaText(ctx, 'sterkte van de prikkel', x, y - 18, C.text2, 'left', 20); ctx.restore(); }
      tag(ctx, 'meer jongen die overleefden', 520, 600, C.groen, q.on('overleefden', 1)); tag(ctx, 'voorkeur erfelijk doorgegeven', 520, 700, C.paars, q.on('erfelijk', 1));
      wida(ctx, 1320, 720, 0.55, 300, { t, a: pr }); ctx.restore(); } },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const tb = q.on('Tinbergen', 1, 0.8), vroeg = 1 - q.on('dikke', 1, 0.8);
    regel(ctx, 'balts: een vast ritueel', 140, 140, vroeg, C.text, 40, 'left', 700);
    if (vroeg > 0.01) { ctx.save(); ctx.globalAlpha *= vroeg; aquarium(ctx, 560, 300, 800, 460, 1); stekelbaars(ctx, 820 + Math.sin(t) * 40, 520, 1, { rood: 1, t }); nest(ctx, 1150, 720, 1); ctx.restore(); }
    keten(ctx, q, 300, 210, 58, { a: (1 - vroeg) * (1 - 0.82 * tb), hl: -1, w: 560, gap: 200, px: 24 });
    // kleine vissen naast de keten
    if (vroeg < 0.99 && tb < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - vroeg) * (1 - tb); stekelbaars(ctx, 170, 420 + Math.sin(t * 2) * 10, 0.6, { rood: 1, t, flip: 1, dreig: 0.3 }); vrouwtje(ctx, 1750, 420, 0.6, { t, flip: -1, dik: 1, kop: q.on('omhoog', 1) }); ctx.restore(); }
    tag(ctx, 'actie-reactieketen', 960, 880 - 0, C.goud, q.on('actie-reactieketen', 1) * (1 - tb));
    if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; ctx.fillStyle = rgba(C.bgSchema, 0.5); ctx.fillRect(0, 0, W, CAPTION_Y);
      grootNest(ctx, 960, 650); ctx.save(); ctx.translate(960, 640); ctx.scale(2.6, 2.6); ctx.translate(-960, -640); vrouwtje(ctx, 960, 618, 0.45, { t, flip: 1, dik: 1 }); ctx.restore();
      stekelbaars(ctx, 1500, 400, 0.9, { rood: 1, t, a: 1 - q.on('weg', 2) * 0.6 }); kruis(ctx, 1500, 400, 70, q.on('weg', 2));
      const tk = q.on('tikte', 1); if (tk > 0.01) { const tap = Math.max(0, Math.sin(t * 9)) * 18; ctx.save(); ctx.globalAlpha *= tk; ctx.strokeStyle = rgba('#CFE8F4', 0.9); ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(400, 300); ctx.lineTo(720 - tap, 600 - tap * 0.6); ctx.stroke(); ctx.restore(); regel(ctx, 'glazen staafje', 420, 270, tk, C.text, 30, 'left', 700); }
      vraagteken(ctx, 1500, 700, q.on('deed', 1), 110); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const rit = q.on('ritueel', 1, 0.8);
    if (rit < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - rit; grootNest(ctx, 960, 650); ctx.save(); ctx.translate(960, 640); ctx.scale(2.6, 2.6); ctx.translate(-960, -640); vrouwtje(ctx, 960, 618, 0.45, { t, flip: 1, dik: 1 - q.on('genoeg', 1, 2) * 0.8 }); ctx.restore();
      const ei = q.on('genoeg', 1, 2.5); for (let i = 0; i < 14; i++) { const al = clamp(ei * 14 - i, 0, 1); if (al > 0) circ(ctx, 800 + (i % 7) * 50, 690 + Math.floor(i / 7) * 34, 13, rgba('#F0D88A', al), rgba('#B89A4A', al), 1.5); }
      tag(ctx, 'de prikkel telt, niet wie hem geeft', 960, 200, C.goud, q.on('telt', 1)); ctx.restore(); }
    if (rit > 0.01) { ctx.save(); ctx.globalAlpha *= rit; regel(ctx, 'waarom een ritueel?', 960, 160, 1, C.text, 40, 'center', 700);
      [['soort', 1, 'soortherkenning', 'geen paring met een verkeerde soort', C.teal], ['stemt', 1, 'afstemming', 'tegelijk klaar om te paren · zaadcellen vlak na de eitjes', C.groen], ['gezond', 1, 'kwaliteit tonen', 'hoe gezond en sterk is het dier?', C.goud]].forEach(([w, n, nm, s, col], i) => { const a = q.on(w, n); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = 160 + i * 540; roundRect(ctx, x, 260, 500, 330, 16); shape(ctx, rgba(col, 0.12), col, 2); text(ctx, nm, x + 30, 330, fTekst(36, 700), col, 'left'); ctx.font = fTekst(30, 600); ctx.fillStyle = C.text; wrap(ctx, s, x + 30, 400, 440, 42); ctx.restore(); });
      tag(ctx, 'bevruchting buiten het lichaam', 960, 720, C.text2, q.on('bevruchting', 1)); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'handicapprincipe', 140, 140, 1, C.paars, 40, 'left', 700);
    const ge = q.on('gezond', 1), zw = q.on('zwak', 1);
    pauw(ctx, 520, 640, 0.6, { open: 1, t, tril: 1, a: ge }); regel(ctx, 'gezond en sterk', 520, 820, ge, C.groen, 30, 'center', 700); vink_(ctx, 700, 400, 26, ge);
    pauw(ctx, 1300, 680, 0.45, { open: 0.75, t, a: zw, glans: 0.35 }); regel(ctx, 'zwak', 1300, 820, zw, C.koraal, 30, 'center', 700); vos(ctx, lerp(2100, 1680, q.on('gepakt', 1, 1.5)), 760, 0.8, { t, a: q.on('gepakt', 1) });
    if (q.on('energie', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('energie', 1); roundRect(ctx, 1150, 260, 300, 50, 10); shape(ctx, rgba(C.fill, 0.7), C.line, 2); ctx.fillStyle = C.koraal; ctx.fillRect(1156, 266, 50, 38); regel(ctx, 'te weinig energie', 1300, 350, 1, C.text2, 26, 'center', 600); ctx.restore(); }
    tag(ctx, 'duur signaal = eerlijk signaal', 960, 200, C.goud, q.on('eerlijk', 1)); tag(ctx, 'mooiere staart: gemiddeld gezonder', 960, 880, C.text2, q.on('aanwijzingen', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const pw = 400, gap = 40, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 220, ph = 520;
    const panel = (i, titel, a, draw) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = x0 + i * (pw + gap); roundRect(ctx, x, y0, pw, ph, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); regel(ctx, titel, x + pw / 2, y0 + 50, 1, C.text, 28, 'center', 700); ctx.save(); ctx.beginPath(); ctx.rect(x, y0 + 60, pw, ph - 60); ctx.clip(); draw(x); ctx.restore(); ctx.restore(); };
    panel(0, 'seksuele selectie', q.on('pauw', 1), (x) => pauw(ctx, x + 200, 600, 0.45, { open: 1, t, tril: 1 }));
    panel(1, 'vrouwtje investeert meer', q.on('kieskeurig', 1), (x) => { eicel(ctx, x + 130, 480, 70); for (let i = 0; i < 8; i++) zaadcel(ctx, x + 250 + (i % 3) * 40, 420 + i * 20, 1, 0, t); });
    panel(2, 'kiezen op staartlengte', q.on('widavogels', 1), (x) => { [[0.5, C.koraal], [1.3, C.text2], [2.2, C.groen]].forEach(([v, col], i) => { roundRect(ctx, x + 60 + i * 100, 680 - v * 140, 80, v * 140, 6); shape(ctx, rgba(col, 0.5), col, 2); }); });
    panel(3, 'actie-reactieketen', q.on('keten', 1), (x) => { ['dikke buik', 'zigzagdans', 'volgt', 'naar het nest', 'eieren'].forEach((s, i) => { const yy = 320 + i * 80, xx = x + (i % 2 ? 210 : 40); roundRect(ctx, xx, yy, 150, 54, 8); shape(ctx, rgba(i % 2 ? C.teal : ROOD, 0.15), i % 2 ? C.teal : ROOD, 1.5); text(ctx, s, xx + 75, yy + 34, fTekst(20, 600), C.text, 'center'); }); });
    tag(ctx, 'zelfde soort · tegelijk klaar om te paren', 960, 850, C.goud, q.on('partners', 1)); },
};
