// Transport 2 · Buizen onder druk — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[2], hair: '#2A1E18', shirt: '#5C6F8A', hairStyle: 'long' };
const DOCENT = { skin: SKINS[0], hair: '#9A9A9A', shirt: '#3E4E5E', hairStyle: 'short' };
const KLAS = [
  { x: 210, h: 372, o: { skin: SKINS[0], hair: '#8A5A30', shirt: '#7A8A9A', hairStyle: 'short' } },
  { x: 390, h: 392, o: { skin: SKINS[3], hair: '#1E1612', shirt: '#8A7A66', hairStyle: 'curly' } },
  { x: 570, h: 380, o: { skin: SKINS[1], hair: '#3A2A20', shirt: '#6A7468', hairStyle: 'bun' } },
  { x: 1530, h: 396, o: { skin: SKINS[4], hair: '#141010', shirt: '#6C7A88', hairStyle: 'short' } },
  { x: 1710, h: 376, o: { skin: SKINS[1], hair: '#5A3A22', shirt: '#9A8A70', hairStyle: 'long' } }];
function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(C.bgSchema, 0.9), null); roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const fade = (q, w1, w2, n1 = 1, n2 = 1) => q.on(w1, n1) * (1 - (w2 ? q.on(w2, n2) : 0));
function mixHex(a, b, k) { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); return '#' + [16, 8, 0].map(s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, k)).toString(16).padStart(2, '0')).join(''); }
const BLKL = (k) => mixHex(TR.rijk, TR.arm, k); // 0 = zuurstofrijk, 1 = zuurstofarm
function bonzendHart(ctx, x, y, r, t, bpm, a = 1) { if (a <= 0.01) return; const per = 60 / bpm, ph = (t % per) / per, k = Math.exp(-ph * 8); const s = r * (1 + 0.16 * k);
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + s * 0.9); ctx.bezierCurveTo(x - s * 1.6, y - s * 0.3, x - s * 0.7, y - s * 1.4, x, y - s * 0.45); ctx.bezierCurveTo(x + s * 0.7, y - s * 1.4, x + s * 1.6, y - s * 0.3, x, y + s * 0.9); ctx.closePath(); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 2);
  ctx.restore(); }
function dashLine(ctx, x0, y0, x1, y1, col = C.text, a = 1, lw = 2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([10, 10]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function dikPijl(ctx, x0, y0, x1, y1, col = C.goud, a = 1, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); ctx.beginPath(); ctx.moveTo(x1 - Math.cos(an - 0.5) * 22, y1 - Math.sin(an - 0.5) * 22); ctx.lineTo(x1, y1); ctx.lineTo(x1 - Math.cos(an + 0.5) * 22, y1 - Math.sin(an + 0.5) * 22); ctx.stroke(); ctx.restore(); }

// ---------- Macro: het schoolplein ----------
function schoolplein(ctx, t, o = {}) { const { zon = 1 } = o;
  ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H);
  if (zon > 0.01) { ctx.save(); ctx.globalAlpha *= zon; const sx = 1760, sy = 150; ctx.strokeStyle = rgba('#E8B04A', 0.75); ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * 0.12; ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * 80, sy + Math.sin(a) * 80); ctx.lineTo(sx + Math.cos(a) * 108, sy + Math.sin(a) * 108); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(sx, sy, 62, 0, 6.283); ctx.fillStyle = '#E8B04A'; ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#3A4864'; ctx.fillRect(80, 330, 1060, 330); ctx.fillStyle = '#2E3A52'; ctx.fillRect(60, 310, 1100, 26);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) { roundRect(ctx, 130 + c * 145, 380 + r * 125, 96, 84, 6); shape(ctx, '#4E6086', '#6E80A4', 2); }
  ctx.strokeStyle = rgba(C.text, 0.45); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 344); ctx.quadraticCurveTo(610, 430, 1160, 344); ctx.stroke();
  for (let i = 1; i < 14; i++) { const u = i / 14, x = lerp(60, 1160, u), y = (1 - u) * (1 - u) * 344 + 2 * u * (1 - u) * 430 + u * u * 344; ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x + 14, y); ctx.lineTo(x, y + 30); ctx.closePath(); ctx.fillStyle = i % 2 ? '#C9B896' : '#8FA0B5'; ctx.fill(); }
  ctx.fillStyle = '#4A5468'; ctx.fillRect(0, 660, W, H - 660); ctx.strokeStyle = rgba('#000000', 0.15); ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, 700 + i * 50); ctx.lineTo(W, 700 + i * 50); ctx.stroke(); }
}
function rugzak(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 48, y, 96, 72, 16); shape(ctx, '#5A4A3A', '#7A6A58', 2); roundRect(ctx, x - 30, y + 26, 60, 30, 8); shape(ctx, '#4A3C2E', '#7A6A58', 1.5); ctx.restore(); }
// zittende persoon (Macro): bank + persoon met gebogen benen naar rechts
function zittend(ctx, x, yVloer, h, o = {}) { const hh = h / 6.6; const zit = yVloer - hh * 2.2; const hip = zit - hh * 0.25;
  roundRect(ctx, x - hh * 2.2, zit, hh * 4.4, hh * 0.45, 10); shape(ctx, '#8C6A44', '#B08A5C', 2); ctx.fillStyle = '#6E5236'; ctx.fillRect(x - hh * 2, zit + hh * 0.45, hh * 0.35, yVloer - zit - hh * 0.45); ctx.fillRect(x + hh * 1.65, zit + hh * 0.45, hh * 0.35, yVloer - zit - hh * 0.45);
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, 0, 2 * h, hip + hh * 0.3); ctx.clip(); const r = person(ctx, x, hip + h - hh * 3.55, h, 1, o); ctx.restore();
  const tr = o.trousers || '#34425A'; ctx.lineCap = 'round'; ctx.strokeStyle = tr; ctx.lineWidth = hh * 0.62;
  for (const dx of [-hh * 0.25, hh * 0.2]) { ctx.beginPath(); ctx.moveTo(x + dx, hip + hh * 0.05); ctx.lineTo(x + dx + hh * 1.45, hip + hh * 0.05); ctx.lineTo(x + dx + hh * 1.5, yVloer - hh * 0.35); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x + dx + hh * 1.62, yVloer - hh * 0.14, hh * 0.4, hh * 0.17, 0, 0, 6.283); ctx.fillStyle = '#262C3A'; ctx.fill(); }
  return r; }

// ---------- bloedvaten ----------
// slagader/ader in lengte (Schema)
function vatH(ctx, x0, x1, y, r, o = {}) { const { a = 1, wand = 12, t = 0, v = 120, col = TR.rijk, ring = 0, seed = 0, dens = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - r - wand, x1 - x0, 2 * (r + wand), Math.min(r + wand, 24)); shape(ctx, TR.spier, TR.spierR, 1.5);
  ctx.fillStyle = C.bgSchema; ctx.fillRect(x0, y - r, x1 - x0, 2 * r); ctx.fillStyle = rgba(col, 0.28); ctx.fillRect(x0, y - r, x1 - x0, 2 * r);
  if (ring > 0.01) { ctx.save(); ctx.globalAlpha *= ring; ctx.strokeStyle = TR.spierR; ctx.lineWidth = 5; for (let x = x0 + 24; x < x1 - 10; x += 34) { ctx.beginPath(); ctx.moveTo(x, y - r - wand + 2); ctx.lineTo(x, y - r - 1); ctx.moveTo(x, y + r + 1); ctx.lineTo(x, y + r + wand - 2); ctx.stroke(); } ctx.restore(); }
  const L = x1 - x0 + 40, N = Math.round(dens * (x1 - x0) / 46 * (r / 30) ** 2), cr = Math.min(11, r * 0.42);
  ctx.save(); ctx.beginPath(); ctx.rect(x0, y - r, x1 - x0, 2 * r); ctx.clip();
  for (let i = 0; i < N; i++) { const px = x0 - 20 + ((hash(i * 7 + seed) * L + t * v) % L); const py = y + (hash(i * 3 + seed + 1) * 2 - 1) * Math.max(0, r - cr - 2); ctx.beginPath(); ctx.ellipse(px, py, cr, cr * 0.8, 0, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1); }
  ctx.restore(); ctx.restore(); }
// haarvat in lengte: wand van één laag platte cellen, rode bloedcellen in een rij
function haarvatH(ctx, x0, x1, y, r, o = {}) { const { a = 1, t = 0, v = 60, wand = 9, hiW = 0, gap = 78, rbc = 1, col = TR.rijk } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba(col, 0.16); ctx.fillRect(x0, y - r, x1 - x0, 2 * r);
  for (const sd of [-1, 1]) for (let x = x0, k = 0; x < x1 - 20; x += 150, k++) { const w = Math.min(146, x1 - x); const yy = sd < 0 ? y - r - wand : y + r;
    roundRect(ctx, x + 2, yy, w - 4, wand, wand / 2); shape(ctx, rgba(C.er, 0.45), C.er, 1.2);
    const nx = x + w / 2 + sd * 22; ctx.beginPath(); ctx.ellipse(nx, yy + wand / 2, Math.min(20, w / 4), wand * 0.62, 0, 0, 6.283); shape(ctx, rgba(C.er, 0.85), null);
    if (hiW > 0.01) { ctx.save(); ctx.globalAlpha *= hiW; roundRect(ctx, x + 2, yy, w - 4, wand, wand / 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } }
  if (rbc > 0.01) { ctx.save(); ctx.globalAlpha *= rbc; ctx.beginPath(); ctx.rect(x0, y - r, x1 - x0, 2 * r); ctx.clip(); const L = Math.ceil((x1 - x0 + 80) / gap) * gap; const rx = Math.min(r * 0.62, 24), ry = r - 3;
    for (let i = 0; i * gap < L; i++) { const px = x0 - 40 + ((i * gap + t * v) % L); ctx.beginPath(); ctx.ellipse(px, y, rx, ry, 0, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.beginPath(); ctx.ellipse(px, y, rx * 0.45, ry * 0.5, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.12); ctx.fill(); }
    ctx.restore(); }
  ctx.restore(); }
// weefselcellen rond een haarvat, met uitwisseling (Schema)
function uitwisseling(ctx, t, o = {}) { const { a = 1, o2 = 0, glu = 0, afval = 0, vocht = 0, v = 40, hiW = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Y = 470;
  const cells = []; for (let i = 0; i < 6; i++) { cells.push([250 + i * 284, 245]); cells.push([250 + i * 284 + 30, 695]); }
  for (const [cx, cy] of cells) { roundRect(ctx, cx - 120, cy - 78, 240, 156, 40); shape(ctx, rgba(C.mens, 0.16), rgba(C.mens, 0.7), 1.5); ctx.beginPath(); ctx.ellipse(cx - 30, cy + 6, 30, 24, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.35), rgba(C.mens, 0.7), 1.2); }
  haarvatH(ctx, 40, 1880, Y, 62, { t, v, wand: 14, gap: 120, hiW });
  const part = (n, seed, on, dir, draw) => { if (on <= 0.01) return; for (let i = 0; i < n; i++) { const c = cells[i % cells.length]; const p = (t * 0.22 + hash(i * 5 + seed)) % 1;
      const sx = c[0] - 60 + hash(i * 9 + seed) * 120, sy = Y + (c[1] < Y ? -1 : 1) * (10 + hash(i + seed) * 30), ex = c[0] + 30 + (hash(i * 3 + seed) - 0.5) * 120, ey = c[1] + (hash(i * 11 + seed) - 0.5) * 70;
      const u = ease(dir > 0 ? p : 1 - p); const al = on * Math.min(1, p * 6, (1 - p) * 6); draw(lerp(sx, ex, u), lerp(sy, ey, u), al); } };
  part(18, 3, o2, 1, (x, y, al) => { ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.283); shape(ctx, C.teal, lighten(C.teal, 0.4), 1.5); ctx.restore(); });
  part(14, 41, glu, 1, (x, y, al) => { ctx.save(); ctx.globalAlpha *= al; hexagon(ctx, x, y, 11, rgba(C.oker, 0.6), C.oker, 1.5, 0); ctx.restore(); });
  part(14, 77, afval, -1, (x, y, al) => { ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 7, y - 7, 14, 14, 3); shape(ctx, rgba(C.line, 0.6), C.text2, 1.5); ctx.restore(); });
  if (vocht > 0.01) for (let i = 0; i < 26; i++) { const p = (t * 0.3 + hash(i * 13)) % 1; const sd = i % 2 ? -1 : 1; const x = 120 + hash(i * 17) * 1680; const y = Y + sd * (62 + 14 + p * 70); ctx.save(); ctx.globalAlpha *= vocht * Math.min(1, (1 - p) * 3); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
// haarvatennet in een stukje weefsel
function haarvatNet(ctx, t, o = {}) { const { a = 1, hi = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const x0 = 200, y0 = 150, cols = 8, rows = 4, g = 30, cw = 170, ch = 135; const X = (c) => x0 + g + c * (cw + g), Yr = (r) => y0 + g + r * (ch + g);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { roundRect(ctx, X(c), Yr(r), cw, ch, 30); shape(ctx, rgba(C.mens, 0.14), rgba(C.mens, 0.6), 1.2); ctx.beginPath(); ctx.ellipse(X(c) + cw * 0.4, Yr(r) + ch * 0.5, 22, 18, 0, 0, 6.283); shape(ctx, rgba(C.mens, 0.32), null); }
  const xe = X(cols) - g / 2, ye = Yr(rows) - g / 2; const kx = (x) => clamp((x - x0) / (xe - x0), 0, 1);
  ctx.lineCap = 'round'; ctx.lineWidth = 9;
  for (let r = 0; r <= rows; r++) { const y = y0 + g / 2 + r * (ch + g); for (let x = x0 + g / 2; x < xe - 1; x += 40) { ctx.strokeStyle = BLKL(kx(x)); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.min(xe, x + 40), y); ctx.stroke(); } }
  for (let c = 0; c <= cols; c++) { const x = x0 + g / 2 + c * (cw + g); ctx.strokeStyle = BLKL(kx(x)); ctx.beginPath(); ctx.moveTo(x, y0 + g / 2); ctx.lineTo(x, ye); ctx.stroke(); }
  // aanvoer (kleinste slagader) en afvoer (kleine ader)
  ctx.lineWidth = 24; ctx.strokeStyle = TR.rijk; ctx.beginPath(); ctx.moveTo(60, y0 + g / 2); ctx.lineTo(x0 + g / 2, y0 + g / 2); ctx.stroke(); ctx.strokeStyle = TR.arm; ctx.beginPath(); ctx.moveTo(xe, ye); ctx.lineTo(1860, ye); ctx.stroke();
  for (let r = 0; r <= rows; r++) { const y = y0 + g / 2 + r * (ch + g); for (let k = 0; k < 7; k++) { const x = x0 + g / 2 + ((t * 26 + hash(k * 3 + r) * (xe - x0)) % (xe - x0 - g / 2)); ctx.beginPath(); ctx.arc(x, y, 4, 0, 6.283); ctx.fillStyle = lighten(BLKL(kx(x)), 0.35); ctx.fill(); } }
  if (hi > 0.01) { ctx.save(); ctx.globalAlpha *= hi; const cx = X(5), cy = Yr(2); roundRect(ctx, cx, cy, cw, ch, 30); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); dikPijl(ctx, cx + cw / 2, cy + ch - 12, cx + cw / 2, cy + ch + g / 2 - 4, C.goud, 1, 4); ctx.restore(); }
  ctx.restore(); return { x0, y0, xe, ye }; }

// ---------- vertakkende vaten (H1) ----------
const BOOM_E = (() => { const A = [600, 470], B = [[860, 295], [860, 675]], Cs = [[1110, 200], [1110, 390], [1110, 580], [1110, 770]];
  const e = [[[300, 470], A, 0, 40]]; B.forEach(b => e.push([A, b, 1, 26])); Cs.forEach((c, i) => e.push([B[i >> 1], c, 2, 16])); Cs.forEach(c => { e.push([c, [1400, c[1] - 40], 3, 9]); e.push([c, [1400, c[1] + 40], 3, 9]); }); return e; })();
const ORGANEN = ['hersenen', 'spieren', 'darmen', 'nieren'];
function bez(p0, p1, n = 28) { const out = []; const mx = (p0[0] + p1[0]) / 2; for (let i = 0; i <= n; i++) { const u = i / n, v = 1 - u; out.push([v * v * v * p0[0] + 3 * v * v * u * mx + 3 * v * u * u * mx + u * u * u * p1[0], v * v * v * p0[1] + 3 * v * v * u * p0[1] + 3 * v * u * u * p1[1] + u * u * u * p1[1]]); } return out; }
function subPts(pts, u) { const n = Math.max(1, Math.round((pts.length - 1) * clamp(u, 0, 1))); return pts.slice(0, n + 1); }
function boom(ctx, t, o = {}) { const { lv = [1, 1, 1, 1], flip = false, col = TR.rijk, a = 1, tw = t } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (p) => flip ? [W - p[0], p[1]] : p; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const order = flip ? [3, 2, 1, 0] : [0, 1, 2, 3];
  for (const L of order) for (const [p0, p1, l, w] of BOOM_E) { if (l !== L) continue; const u = lv[l]; if (u <= 0.01) continue; const pts = flip ? bez(X(p1), X(p0)) : bez(p0, p1); const D = subPts(pts, u);
    ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = w + 4; ctx.beginPath(); D.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
    if (u >= 0.99) particleFlow(ctx, pts, l < 2 ? 5 : 3, tw, 200 - l * 30, lighten(col, 0.45) === col ? col : (col === TR.rijk ? TR.rijkL : TR.armL), Math.max(3, w * 0.2), l * 10 + p1[1], 1); }
  ctx.restore(); }

// ---------- been met ader, kleppen en kuitspier (H3) ----------
// (X,Y) = bovenkant dij; c = kuitspier knijpt 0..1; off = verschuiving bloed omhoog; kO = [klep onder, klep boven] 0 dicht .. 1 open
function been(ctx, X, Y, s, o = {}) { const { a = 1, c = 0, off = 0, kO = [1, 1], hiK = 0, hiS = 0, hiA = 0 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(X, Y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-85, 0); ctx.bezierCurveTo(-85, 120, -70, 230, -62, 300); ctx.bezierCurveTo(-125, 380, -122, 500, -60, 600); ctx.lineTo(-48, 650); ctx.bezierCurveTo(-60, 690, -40, 705, 0, 705); ctx.lineTo(200, 705); ctx.bezierCurveTo(228, 705, 228, 670, 190, 662); ctx.lineTo(70, 625); ctx.bezierCurveTo(62, 500, 66, 400, 72, 300); ctx.bezierCurveTo(85, 220, 92, 120, 92, 0); ctx.closePath();
  shape(ctx, rgba(C.mens, 0.16), rgba(C.mens, 0.8), 2);
  ctx.strokeStyle = rgba('#E6E1D3', 0.35); ctx.lineWidth = 24; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(42, 320); ctx.lineTo(40, 610); ctx.stroke(); ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(28, 270); ctx.stroke();
  // kuitspier
  const top = 330 + 16 * c, bot = 610, hw = (y) => (34 + 20 * c) * Math.sin(Math.PI * clamp((y - top) / (bot - top), 0, 1));
  ctx.beginPath(); for (let y = top; y <= bot; y += 6) ctx.lineTo(-64 - hw(y) * 0.9, y); for (let y = bot; y >= top; y -= 6) ctx.lineTo(-64 + hw(y), y); ctx.closePath(); shape(ctx, TR.spier, hiS > 0.5 ? C.goud : TR.spierR, hiS > 0.5 ? 3 : 2);
  // ader
  const vx = -8, rv = (y) => { const k = Math.exp(-(((y - 470) / 110) ** 2)); return 14 * (1 - 0.5 * c * k); };
  const poly = () => { ctx.beginPath(); for (let y = 690; y >= -6; y -= 8) ctx.lineTo(vx - rv(y), y); for (let y = -6; y <= 690; y += 8) ctx.lineTo(vx + rv(y), y); ctx.closePath(); };
  poly(); shape(ctx, rgba(TR.arm, 0.55), hiA > 0.5 ? C.goud : lighten(TR.arm, 0.35), hiA > 0.5 ? 3 : 1.5);
  ctx.save(); poly(); ctx.clip(); for (let i = 0; i < 34; i++) { const y = 700 - ((hash(i * 5) * 720 + off) % 720); const x = vx + (hash(i * 7 + 2) - 0.5) * rv(y) * 1.1; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fillStyle = TR.armL; ctx.fill(); } ctx.restore();
  // kleppen (zakjes): open = langs de wand omhoog, dicht = punten in het midden
  for (const [i, yk] of [[0, 590], [1, 330]]) { const op = kO[i]; ctx.strokeStyle = hiK > 0.5 ? C.goud : TR.klep; ctx.lineWidth = 5; ctx.lineCap = 'round';
    for (const sd of [-1, 1]) { const bx = vx + sd * rv(yk), by = yk; const tx = lerp(vx + sd * 1.5, vx + sd * (rv(yk) - 3), op), ty = lerp(yk - 18, yk - 30, op); ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(lerp(bx, tx, 0.5), by - 4, tx, ty); ctx.stroke(); } }
  ctx.restore(); }
function beenPunt(X, Y, s, naam) { const P = { klepO: [-8, 590], klepB: [-8, 330], ader: [-8, 160], kuit: [-100, 470], top: [-8, 0] }; const p = P[naam]; return [X + p[0] * s, Y + p[1] * s]; }

// ---------- druk langs de route (H2) ----------
const RX0 = 200, RX1 = 1760; const RX = (u) => RX0 + u * (RX1 - RX0);
const ZONES = [[0, 0.14, ['aorta'], 40], [0.14, 0.30, ['slagaders'], 26], [0.30, 0.44, ['kleinste', 'slagaders'], 12], [0.44, 0.60, ['haarvaten'], 0], [0.60, 0.80, ['aders'], 24], [0.80, 0.95, ['holle', 'aders'], 40]];
function pl(pts, u) { for (let i = 1; i < pts.length; i++) if (u <= pts[i][0]) return lerp(pts[i - 1][1], pts[i][1], (u - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0])); return pts[pts.length - 1][1]; }
const routeP = (u) => pl([[0, 96], [0.14, 95], [0.30, 88], [0.44, 35], [0.60, 15], [0.80, 8], [0.95, 3], [1, 2]], u) + pl([[0, 20], [0.14, 19], [0.30, 15], [0.44, 0], [1, 0]], u) * Math.sin(u * 6.283 * 14);
const longP = (u) => pl([[0, 17], [0.3, 15], [0.44, 11], [0.6, 9], [1, 6]], u) + pl([[0, 7], [0.3, 5], [0.44, 0], [1, 0]], u) * Math.sin(u * 6.283 * 14);
const rcol = (u) => BLKL(clamp((u - 0.44) / 0.16, 0, 1));
function routeBand(ctx, y, o = {}) { const { a = 1, labels = 1, hi = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  roundRect(ctx, 120, y - 34, 70, 68, 12); shape(ctx, rgba(TR.rijk, 0.75), lighten(TR.rijk, 0.3), 1.5); metaText(ctx, 'LK', 155, y + 9, C.text, 'center', 24);
  roundRect(ctx, RX(0.955), y - 34, RX(1) - RX(0.955) + 10, 68, 12); shape(ctx, rgba(TR.arm, 0.8), lighten(TR.arm, 0.3), 1.5); metaText(ctx, 'RB', (RX(0.955) + RX(1) + 10) / 2, y + 9, C.text, 'center', 24);
  for (const [u0, u1, nm, w] of ZONES) { if (w > 0) { for (let k = 0; k < 10; k++) { const a0 = lerp(u0, u1, k / 10), a1 = lerp(u0, u1, (k + 1) / 10); ctx.strokeStyle = rcol((a0 + a1) / 2); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(RX(a0) - 0.5, y); ctx.lineTo(RX(a1) + 0.5, y); ctx.stroke(); } }
    else { for (let j = 0; j < 7; j++) { const dy = (j - 3) * 10; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const uu = lerp(u0, u1, k / 20); const yy = y + dy * Math.sin(Math.PI * k / 20) * 1.6; ctx.strokeStyle = rcol(uu); k ? ctx.lineTo(RX(uu), yy) : ctx.moveTo(RX(uu), yy); } ctx.stroke(); } }
    if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels; const cx = RX((u0 + u1) / 2); nm.forEach((s, i) => text(ctx, s, cx, y + 86 + i * 30 - (nm.length - 1) * 15, fTekst(28, 600), hi && hi.includes(nm.join(' ')) ? C.goud : C.text2, 'center')); ctx.restore(); }
    ctx.strokeStyle = rgba(C.bgSchema, 1); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(RX(u1), y - 26); ctx.lineTo(RX(u1), y + 26); ctx.stroke(); }
  ctx.restore(); }
function drukGrafiek(ctx, gy0, gy1, o = {}) { const { a = 1, u = 1, f = routeP, col = TR.rijkL, as = 1, dash = false, lw = 5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Y = (p) => gy1 - p / 130 * (gy1 - gy0);
  if (as) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(RX0, gy0); ctx.lineTo(RX0, gy1); ctx.lineTo(RX1, gy1); ctx.stroke();
    for (const v of [0, 40, 80, 120]) { const py = Y(v); ctx.beginPath(); ctx.moveTo(RX0 - 10, py); ctx.lineTo(RX0, py); ctx.stroke(); text(ctx, String(v), RX0 - 18, py + 10, fTekst(28), C.text2, 'right'); if (v) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.15); ctx.beginPath(); ctx.moveTo(RX0, py); ctx.lineTo(RX1, py); ctx.stroke(); ctx.restore(); } }
    metaText(ctx, 'druk (mmHg)', RX0, gy0 - 22, C.grain, 'left', 24); }
  if (u > 0) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash([14, 10]); ctx.beginPath(); const N = 500; for (let i = 0; i <= N * clamp(u, 0, 1); i++) { const uu = i / N; const px = RX(uu), py = Y(f(uu)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); return Y; }
function druppel(ctx, x, y, col, r = 16) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, col, C.goud, 4); ctx.restore(); }

// ---------- druk in de aorta tijdens één hartslag (u volgt hartFase) ----------
function aortaP(u) { u = ((u % 1) + 1) % 1; const d = (u - 0.63 + 1) % 1;
  if (d < 0.17) return 80 + 40 * Math.sin(Math.PI / 2 * d / 0.17);
  if (d < 0.25) return 120 - 22 * (d - 0.17) / 0.08;
  if (d < 0.28) return 98 - 4 * Math.sin(Math.PI * (d - 0.25) / 0.03);
  const v = (d - 0.28) / 0.72; return 80 + 18 * Math.pow(1 - v, 1.4); }
// windketel: stroom uit het hart, stroom naar de haarvaten, opgeslagen volume
const QH = (u) => { const f = ((u % 1) + 1) % 1; return f >= 0.63 && f < 0.88 ? Math.sin(Math.PI * (f - 0.63) / 0.25) : 0; };
const QMEAN = 0.25 * 2 / Math.PI;
const QC = (u) => QMEAN * (1 + 0.12 * Math.sin(6.283 * (u - 0.8)));
const WK = (() => { const N = 400, b = [], ch = []; let s = 0, h = 0; for (let i = 0; i <= N; i++) { const u = i / N; b.push(s); ch.push(h); s += (QH(u) - QC(u)) / N; h += QH(u) / N; } const mn = Math.min(...b), mx = Math.max(...b); return { b: b.map(v => (v - mn) / (mx - mn)), ch, N }; })();
const wkB = (u) => { const f = ((u % 1) + 1) % 1; return WK.b[Math.round(f * WK.N)]; };
const wkFh = (U) => Math.floor(U) * WK.ch[WK.N] + WK.ch[Math.round((((U % 1) + 1) % 1) * WK.N)];

const SCENES = {
  title(ctx, t) { const p = Math.exp(-((t % 0.9) / 0.9) * 7);
    vatDoorsnede(ctx, 1330, 640, 'slagader', { s: 1.05, puls: p }); vatDoorsnede(ctx, 1600, 380, 'haarvat', { s: 1.6 }); vatDoorsnede(ctx, 1650, 770, 'ader', { s: 0.8 }); },

  s01(ctx, t, q) { schoolplein(ctx, t);
    const kB = q.on('bleek', 1, 1.2), kZ = q.on('zakt', 1, 0.8), kL = ramp(t, q.at('zakt') + 0.5, 1.2), kU = q.on('benen', 1, 1.0), kD = ramp(t, q.at('Even') - 0.3, 1.0);
    KLAS.forEach((p) => person(ctx, p.x, 860, p.h, 1 - 0.45 * kB, Object.assign({}, p.o, { armL: { a1: 0.1 }, armR: { a1: 0.1 } })));
    klok(ctx, 1400, 230, 62, 6 * ramp(t, q.at('half'), 1.4), 'een half uur', q.on('half', 1) * (1 - q.on('bleek', 1)));
    rugzak(ctx, 860, 790, kU);
    if (kD > 0.01) person(ctx, 730, 860, 440, kD, Object.assign({}, DOCENT, { armR: { a1: lerp(0.15, 0.95, kU), a2: lerp(0.08, 1.35, kU) }, armL: { a1: 0.15 } }));
    const sway = Math.sin(t * 2.6) * 0.05 * kB * (1 - kZ);
    const rot = sway + kL * Math.PI / 2 + 0.13 * kU, sq = kZ * (1 - kL) * 0.3, py = lerp(860, 818, kL) - 40 * kU;
    const skin = mixHex(SKINS[2], '#E2D6CC', 0.75 * kB * (1 - 0.6 * q.on('bij', 1, 1.5)));
    ctx.save(); ctx.translate(860, py); ctx.rotate(rot); ctx.scale(1, 1 - sq); person(ctx, 0, 0, 384, 1, { skin, armL: { a1: 0.1 + 0.3 * kZ }, armR: { a1: 0.1 + 0.3 * kZ } }); ctx.restore();
    vraagteken(ctx, 1080, 640, q.on('mis', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('slagader', 3), pC = q.on('spierlaag', 1), pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      bonzendHart(ctx, 230, 470, 46, t, 72, 1);
      boom(ctx, t, { lv: [ramp(t, q.at('aorta') - 0.6, 1.2), ramp(t, q.at('splitst'), 1), ramp(t, q.at('kleinere'), 1), ramp(t, q.at('tot'), 1)], tw: t + 0.1 * Math.sin(t * 7.4) });
      const ao = q.on('organen', 1); BOOM_E.filter(e => e[2] === 2).forEach((e, i) => { const y = e[1][1]; ctx.save(); ctx.globalAlpha *= ao; roundRect(ctx, 1420, y - 65, 330, 130, 24); shape(ctx, C.fill, C.line, 1.5); text(ctx, ORGANEN[i], 1600, y + 12, fTekst(34, 600), C.text, 'center'); ctx.restore(); });
      label(ctx, 'aorta', 'EEN SLAGADER', 470, 470, 470, 300, q.on('aorta', 1), C.goud);
      tag(ctx, 'steeds kleinere slagaders', 860, 860, C.text, q.on('kleinere', 1));
      ctx.restore(); }
    const pB2 = pB * (1 - pC);
    if (pB2 > 0.01) { ctx.save(); ctx.globalAlpha *= pB2; const X = 640, Y = 470, S = 2.1;
      const beat = t > q.at('hoge') ? Math.exp(-((t % 0.85) / 0.85) * 6) : 0;
      vatDoorsnede(ctx, X, Y, 'slagader', { s: S, puls: beat }); const R = 120 * S * (1 + 0.06 * beat), Rl = (120 * (1 + 0.06 * beat) - 62) * S;
      const w = q.on('dikke', 1); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w * (1 - q.on('hoge', 1) * 0.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(X, Y, R + 5, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.arc(X, Y, Rl - 3, 0, 6.283); ctx.stroke(); ctx.restore(); }
      label(ctx, 'dikke, stevige wand', '', X + Math.cos(-0.7) * (R - 6), Y + Math.sin(-0.7) * (R - 6), 1120, 210, q.on('dikke', 1), C.text);
      label(ctx, 'elastische vezels', '', X + Math.cos(-0.1) * 88 * S, Y + Math.sin(-0.1) * 88 * S, 1120, 400, q.on('elastische', 1), C.text);
      label(ctx, 'laag spieren', '', X + Math.cos(0.45) * 74 * S, Y + Math.sin(0.45) * 74 * S, 1120, 590, q.on('spieren', 1), C.text);
      label(ctx, 'bloed', 'HOGE DRUK', X + 40, Y + 30, 1120, 760, q.on('hoge', 1), TR.rijkL);
      if (beat > 0.02) { ctx.save(); ctx.globalAlpha *= beat; for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + 0.2; dikPijl(ctx, X + Math.cos(an) * 22, Y + Math.sin(an) * 22, X + Math.cos(an) * (Rl - 14), Y + Math.sin(an) * (Rl - 14), C.text, 1, 4); } ctx.restore(); }
      tag(ctx, 'bij elke hartslag rekt de wand mee', 960, 860, C.goud, q.on('opvangen', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      const n1 = q.on('nauwer', 1, 1.2), w1 = q.on('wijder', 1, 1.2); const r1 = lerp(30, 13, n1), r2 = lerp(30, 48, w1);
      vatH(ctx, 160, 1180, 300, r1, { t, v: 170, ring: 1, wand: 14, seed: 1 }); vatH(ctx, 160, 1180, 640, r2, { t, v: 170, ring: 1, wand: 14, seed: 7 });
      label(ctx, 'spierlaag', 'KRINGSPIEREN', 330, 300 - r1 - 7, 330, 170, q.on('spierlaag', 1) * (1 - q.on('nauwer', 1)), C.goud);
      tag(ctx, 'nauwer', 670, 220, C.goud, n1); tag(ctx, 'wijder', 670, 540 - (r2 - 30), C.goud, w1);
      const org = q.on('orgaan', 1); for (const [y, r, s] of [[300, r1, 'minder bloed'], [640, r2, 'meer bloed']]) { roundRect(ctx, 1260, y - 110, 400, 220, 30); shape(ctx, C.fill, C.line, 1.5); text(ctx, 'orgaan', 1460, y - 66, fTekst(32, 600), C.text2, 'center');
        const n = Math.round(4 + 26 * (r / 48) ** 2); for (let i = 0; i < n; i++) { const w = wander(i + y, t, 8, 0.7); ctx.beginPath(); ctx.arc(1300 + hash(i * 3 + y) * 320 + w.x, y - 30 + hash(i * 5 + y) * 120 + w.y, 9, 0, 6.283); shape(ctx, TR.rijk, lighten(TR.rijk, 0.3), 1); }
        tag(ctx, s, 1460, y + 160, C.text, q.on('verandert', 1)); }
      ctx.restore(); }
  },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('Juist', 1), pC = q.on('Bijna', 1), pA = 1 - pB; const Y = 470;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      vatH(ctx, 40, 470, Y, 80, { t, v: 110, wand: 26, seed: 3, dens: 0.8 });
      ctx.beginPath(); ctx.moveTo(468, Y - 106); ctx.bezierCurveTo(560, Y - 106, 560, Y - 43, 620, Y - 43); ctx.lineTo(620, Y + 43); ctx.bezierCurveTo(560, Y + 43, 560, Y + 106, 468, Y + 106); ctx.closePath(); shape(ctx, TR.spier, TR.spierR, 1.5);
      ctx.beginPath(); ctx.moveTo(468, Y - 80); ctx.bezierCurveTo(560, Y - 80, 560, Y - 34, 622, Y - 34); ctx.lineTo(622, Y + 34); ctx.bezierCurveTo(560, Y + 34, 560, Y + 80, 468, Y + 80); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(TR.rijk, 0.22); ctx.fill();
      haarvatH(ctx, 620, 1880, Y, 34, { t, v: 70, wand: 9, hiW: q.on('wand', 1) * (1 - q.on('Juist', 1)), gap: 84 });
      label(ctx, 'kleinste slagader', '', 250, Y - 106, 250, 220, q.on('kleinste', 1), C.text);
      label(ctx, 'haarvat', q.on('smal', 1) > 0.5 ? '5–10 micrometer breed' : '', 1240, Y + 43, 1240, 690, q.on('haarvaten', 1), C.goud);
      tag(ctx, 'rode bloedcellen één voor één', 1240, 830, C.text, q.on('één', 1));
      label(ctx, 'wand: één laag dunne cellen', '', 900, Y - 43, 900, 260, q.on('cellen', 2), C.goud);
      ctx.restore(); }
    const pB2 = pB * (1 - pC);
    if (pB2 > 0.01) { ctx.save(); ctx.globalAlpha *= pB2;
      uitwisseling(ctx, t, { o2: q.on('Zuurstof', 1), glu: q.on('glucose', 1), afval: q.on('Afvalstoffen', 1), v: 50 });
      tag(ctx, 'uitwisseling', 960, 120, C.goud, q.on('uitwisseling', 1));
      tag(ctx, 'zuurstof', 560, 870, C.teal, q.on('Zuurstof', 1)); tag(ctx, 'glucose', 960, 870, C.oker, q.on('glucose', 1)); tag(ctx, 'afvalstoffen', 1400, 870, C.line, q.on('Afvalstoffen', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC; haarvatNet(ctx, t, { hi: q.on('ligt', 1) });
      tag(ctx, 'elke cel ligt dicht bij een haarvat', 960, 870, C.goud, q.on('ligt', 1)); ctx.restore(); }
  },

  s06(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('heeft', 1), pC = q.on('veel', 1), pD = q.on('vervoert', 1), pE = q.on('Zuurstofarm', 2), pF = q.on('Meestal', 2);
    const A = 1 - pB, B = pB * (1 - pC), Cc = pC * (1 - pD), D = pD * (1 - pE), E = pE * (1 - pF), F = pF;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      boom(ctx, t, { flip: true, col: TR.arm, lv: [ramp(t, q.at('grotere'), 1), ramp(t, q.at('steeds'), 0.8), ramp(t, q.at('kleine'), 0.8), 1] });
      BOOM_E.filter(e => e[2] === 2).forEach((e) => { const y = e[1][1]; roundRect(ctx, 170, y - 65, 330, 130, 24); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
        ctx.strokeStyle = BLKL(0.6); ctx.lineWidth = 4; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = 190; x <= 480; x += 10) ctx.lineTo(x, y - 34 + k * 34 + 9 * Math.sin(x / 24 + k)); ctx.stroke(); } });
      text(ctx, 'haarvaten', 335, 120, fTekst(32, 600), C.text2, 'center');
      bonzendHart(ctx, 1690, 470, 46, t, 72, 1);
      label(ctx, 'kleine aders', '', W - 1110, 200, W - 1110, 120, q.on('kleine', 1), TR.armL);
      label(ctx, 'grotere aders', 'NAAR HET HART', W - 600, 470, W - 600, 320, q.on('grotere', 1), TR.armL);
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const beat = Math.exp(-((t % 0.85) / 0.85) * 6);
      vatDoorsnede(ctx, 560, 430, 'slagader', { s: 1.4, puls: beat });
      ctx.save(); ctx.translate(1300, 430); ctx.scale(1 + 0.03 * Math.sin(t * 1.6), 1 - 0.05 * Math.sin(t * 1.6)); vatDoorsnede(ctx, 0, 0, 'ader', { s: 1.4 }); ctx.restore();
      text(ctx, 'slagader', 560, 680, fTekst(40, 600), C.text, 'center'); text(ctx, 'ader', 1300, 680, fTekst(40, 600), C.text, 'center');
      metaText(ctx, 'dikke wand', 560, 720, C.grain, 'center', 26); metaText(ctx, 'dunne, slappe wand', 1300, 720, C.grain, 'center', 26);
      ctx.save(); ctx.globalAlpha *= q.on('dunne', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1300, 430, 214, 136, 0, 0, 6.283); ctx.stroke(); ctx.restore();
      tag(ctx, 'hoge druk', 560, 830, TR.rijkL, q.on('druk', 1)); tag(ctx, 'lage druk', 1300, 830, TR.armL, q.on('laag', 1));
      ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc;
      been(ctx, 760, 150, 0.98, { off: t * 45, kO: [1, 1], hiK: q.on('kleppen', 1) });
      const p1 = beenPunt(760, 150, 0.98, 'klepB'), p2 = beenPunt(760, 150, 0.98, 'klepO');
      label(ctx, 'kleppen', '', p1[0] + 16, p1[1] - 10, 1150, 400, q.on('kleppen', 1), C.goud); label(ctx, '', '', p2[0] + 16, p2[1] - 10, 1150, 400, q.on('kleppen', 1), C.goud);
      const pa = beenPunt(760, 150, 0.98, 'ader'); label(ctx, 'ader in je been', '', pa[0] + 14, pa[1], 1150, 220, q.on('benen', 1), TR.armL);
      dikPijl(ctx, pa[0], 150, pa[0], 70, C.text, q.on('benen', 1), 4);
      ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const X = 700, Y = 470, S = 0.75;
      const tL = q.at('longader'); const dr = t < tL - 0.2 ? -1 : lerp(0.55, 1, (t - tL) / 3.3);
      const L = lus(ctx, X, Y, S, { druppel: dr, druppelRonde: 'klein', hi: dr > 0.97 ? 'LA' : null });
      tag(ctx, 'holle aders: zuurstofarm', 1480, 300, TR.armL, q.on('zuurstofarm', 1) * (1 - q.on('longader', 1)));
      tag(ctx, 'longaders: zuurstofrijk', 1480, 300, TR.rijkL, q.on('longader', 1));
      const nh = q.on('toe', 1); tag(ctx, 'ader = vat naar het hart toe', 1480, 460, C.goud, nh);
      if (nh > 0.01) for (const pts of [L.klein, L.groot]) for (const u of [0.66, 0.84]) { const p = padPunt(pts, u, false), p2 = padPunt(pts, u + 0.035, false); dikPijl(ctx, p[0], p[1], p2[0], p2[1], C.goud, nh, 5); }
      ctx.restore(); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; const skin = SKINS[1];
      roundRect(ctx, 160, 370, 1000, 190, 95); shape(ctx, skin, lighten(skin, 0.15), 2); ctx.beginPath(); ctx.ellipse(1190, 465, 100, 88, 0, 0, 6.283); ctx.fillStyle = skin; ctx.fill();
      ctx.strokeStyle = rgba('#6F84A8', 0.85); ctx.lineWidth = 10; ctx.lineCap = 'round'; for (const [yy, ph] of [[425, 0], [505, 2]]) { ctx.beginPath(); for (let x = 230; x <= 1120; x += 10) ctx.lineTo(x, yy + 14 * Math.sin(x / 130 + ph)); ctx.stroke(); }
      label(ctx, 'ader', 'LIJKT BLAUW', 700, 425 + 14 * Math.sin(700 / 130), 700, 250, q.on('lijkt', 1), C.text);
      const tb = q.on('donkerrood', 1) * (1 - q.on('huid', 1)); if (tb > 0.01) { ctx.save(); ctx.globalAlpha *= tb; roundRect(ctx, 1480, 260, 90, 380, 40); shape(ctx, rgba(C.text, 0.08), C.line, 2); roundRect(ctx, 1486, 380, 78, 254, 36); ctx.fillStyle = TR.arm; ctx.fill(); text(ctx, 'zuurstofarm bloed', 1525, 700, fTekst(32, 600), C.text, 'center'); ctx.restore(); }
      tag(ctx, 'donkerrood, niet blauw', 1525, 800, TR.armL, q.on('blauw', 1) * (1 - q.on('huid', 1)));
      const z = q.on('huid', 1); if (z > 0.01) zoomCircle(ctx, 1520, 450, 230, 900, 425 + 14 * Math.sin(900 / 130), 'door de huid heen lijkt het blauw', z, () => { ctx.fillStyle = mixHex(skin, '#000000', 0.15); ctx.fillRect(1290, 220, 460, 460); ctx.fillStyle = skin; ctx.fillRect(1290, 220, 460, 90); ctx.fillStyle = rgba('#E6E1D3', 0.25); ctx.fillRect(1290, 310, 460, 60); vatDoorsnede(ctx, 1520, 500, 'ader', { s: 0.9 }); });
      ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F;
      const r2 = q.on('poortader', 1); ctx.save(); ctx.globalAlpha *= 1 - 0.6 * r2;
      const box = (x, s, col, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 150, 200, 300, 90, 20); shape(ctx, rgba(col, 0.2), col, 2); text(ctx, s, x, 258, fTekst(36, 600), C.text, 'center'); ctx.restore(); };
      box(420, 'slagader', TR.rijkL, q.on('slagader', 1)); box(960, 'haarvaten', BLKL(0.5), q.on('haarvaten', 2)); box(1500, 'ader', TR.armL, q.on('naar', 4));
      dikPijl(ctx, 580, 245, 800, 245, C.line, q.on('haarvaten', 2), 3); dikPijl(ctx, 1120, 245, 1340, 245, C.line, q.on('naar', 4), 3); ctx.restore();
      tag(ctx, 'één uitzondering: de poortader', 960, 440, C.goud, q.on('uitzondering', 1));
      if (r2 > 0.01) { ctx.save(); ctx.globalAlpha *= r2; const yy = 640;
        const net = (x0, nm, col) => { roundRect(ctx, x0, yy - 100, 300, 200, 26); shape(ctx, rgba(col, 0.18), col, 2); text(ctx, nm, x0 + 150, yy - 56, fTekst(34, 600), C.text, 'center'); ctx.strokeStyle = BLKL(0.5); ctx.lineWidth = 4; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = x0 + 20; x <= x0 + 280; x += 10) ctx.lineTo(x, yy - 6 + k * 30 + 8 * Math.sin(x / 22 + k)); ctx.stroke(); } metaText(ctx, 'haarvaten', x0 + 150, yy + 90 + 34, C.grain, 'center', 24); };
        net(160, 'darm', C.line); net(900, 'lever', C.bruin);
        ctx.strokeStyle = TR.arm; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(470, yy + 20); ctx.lineTo(890, yy + 20); ctx.stroke(); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(1210, yy + 20); ctx.lineTo(1430, yy + 20); ctx.stroke();
        text(ctx, 'poortader', 680, yy - 16, fTekst(34, 600), C.goud, 'center'); text(ctx, 'leverader', 1320, yy - 16, fTekst(28, 600), C.text2, 'center'); regel(ctx, '→ onderste holle ader', 1450, yy + 30, 1, C.text2, 30);
        const u = clamp((t - q.at('loopt')) / Math.max(1, q.at('lever') + 0.8 - q.at('loopt')), 0, 1); const P = [[200, yy + 20], [460, yy + 20], [900, yy + 20], [1200, yy + 20], [1420, yy + 20]];
        if (t > q.at('loopt') - 0.3) { const p = padPunt(P, u, false); druppel(ctx, p[0], p[1], TR.arm, 14); }
        ctx.restore(); }
      ctx.restore(); }
  },

  s07(ctx, t, q) { bg(ctx, 'schema'); const P = 2.2, t0 = q.at('samen'); const U = (tt) => 0.58 + (tt - t0) / P;
    const u = U(t); hart(ctx, 360, 470, 0.55, { f: hartFase(u), stroom: 1, t, peesdraden: 0.3 });
    metaText(ctx, 'vertraagd · schematisch', 60, CAPTION_Y - 30, C.text2, 'left', 26);
    const gx = 780, gw = 1040, gy = 200, gh = 440, Y = (p) => gy + gh - p / 140 * gh, span = 3 * P;
    const X = (tt) => gx + (tt - (t - span)) / span * gw;
    // fasebanden
    const sb = q.on('systole', 1), db = q.on('diastole', 1);
    for (let k = Math.floor(U(t - span)) - 1; k <= Math.floor(u) + 1; k++) { const ts0 = t0 + (k + 0.58 - 0.58) * P, ts1 = ts0 + 0.35 * P; const a0 = Math.max(gx, X(ts0)), a1 = Math.min(gx + gw, X(ts1)); const d1 = Math.min(gx + gw, X(ts0 + P));
      if (a1 > a0 && sb > 0.01) { ctx.fillStyle = rgba(TR.rijk, 0.16 * sb); ctx.fillRect(a0, gy, a1 - a0, gh); }
      if (d1 > Math.max(a1, gx) && db > 0.01) { ctx.fillStyle = rgba(C.line, 0.12 * db); ctx.fillRect(Math.max(a1, gx), gy, d1 - Math.max(a1, gx), gh); } }
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    for (const v of [0, 40, 80, 120]) { ctx.beginPath(); ctx.moveTo(gx - 10, Y(v)); ctx.lineTo(gx, Y(v)); ctx.stroke(); text(ctx, String(v), gx - 18, Y(v) + 10, fTekst(28), C.text2, 'right'); }
    metaText(ctx, 'druk in de aorta (mmHg)', gx, gy - 24, C.grain, 'left', 24); metaText(ctx, 'tijd →', gx + gw, gy + gh + 44, C.grain, 'right', 24);
    ctx.strokeStyle = TR.rijkL; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= 400; i++) { const tt = t - span + i / 400 * span; const px = X(tt), py = Y(aortaP(U(tt))); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(X(t), Y(aortaP(u)), 9, 0, 6.283); ctx.fill();
    regel(ctx, 'systole', gx + 20, gy + 44, sb, TR.rijkL, 32); regel(ctx, 'diastole', gx + 200, gy + 44, db, C.text2, 32);
    const bo = q.on('bovendruk', 1); dashLine(ctx, gx, Y(120), gx + gw, Y(120), C.goud, bo); regel(ctx, 'bovendruk', gx + gw - 10, Y(120) - 14, bo, C.goud, 32, 'right');
    const on = q.on('onderdruk', 1); dashLine(ctx, gx, Y(80), gx + gw, Y(80), C.goud, on); regel(ctx, 'onderdruk', gx + gw - 10, Y(80) + 40, on, C.goud, 32, 'right');
    const nn = q.on('nul', 1) * (1 - q.on('jongvolwassene', 1)); if (nn > 0.01) { ctx.save(); ctx.globalAlpha *= nn; dikPijl(ctx, gx + 60, Y(0) - 4, gx + 60, Y(78), C.goud, 1, 4); regel(ctx, 'niet tot nul', gx + 80, Y(40), 1, C.goud, 32); ctx.restore(); }
    // rekbare wand van de aorta
    const rw = q.on('rekbare', 1); if (rw > 0.01) { ctx.save(); ctx.globalAlpha *= rw; const r = 24 + (aortaP(u) - 80) / 40 * 18;
      roundRect(ctx, 140, 780 - r - 12, 500, 2 * r + 24, r + 12); shape(ctx, '#E6D9B8', '#F2E6C8', 1.5); ctx.fillStyle = C.bgSchema; ctx.fillRect(150, 780 - r, 480, 2 * r); ctx.fillStyle = rgba(TR.rijk, 0.6); ctx.fillRect(150, 780 - r, 480, 2 * r);
      metaText(ctx, 'aorta · rekbare wand', 390, 780 - r - 26, C.grain, 'center', 24); ctx.restore(); }
    const tg = q.on('honderdtwintig', 1); if (tg > 0.01) { ctx.save(); ctx.globalAlpha *= tg; roundRect(ctx, 1080, 720, 440, 140, 18); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 1.5); text(ctx, '120 / 80', 1300, 800, fTitel(64), C.text, 'center'); metaText(ctx, 'millimeter kwik (mmHg)', 1300, 842, C.grain, 'center', 24); ctx.restore(); }
  },

  s08(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('Leg', 1), pA = 1 - pB;
    const Pc = (tt) => { const tb = q.at('band'), td = q.at('dicht'), tl = q.at('los'); if (tt < tb) return 0; if (tt < td) return 165 * ease((tt - tb) / (td - tb)); if (tt < tl) return 165; return Math.max(40, 165 - 14.3 * (tt - tl)); };
    const aP = (tt) => aortaP(tt / 1.0 + 0.2);
    const open = (tt) => clamp((aP(tt) - Pc(tt)) / 14, 0, 1);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      // grafiek
      const gx = 760, gw = 1060, gy = 160, gh = 360, T0 = 2, T1 = 14.5, X = (tt) => gx + (tt - T0) / (T1 - T0) * gw, Y = (p) => gy + gh - p / 180 * gh;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      for (const v of [0, 40, 80, 120, 160]) { ctx.beginPath(); ctx.moveTo(gx - 10, Y(v)); ctx.lineTo(gx, Y(v)); ctx.stroke(); text(ctx, String(v), gx - 18, Y(v) + 10, fTekst(28), C.text2, 'right'); }
      metaText(ctx, 'druk (mmHg)', gx, gy - 22, C.grain, 'left', 24);
      const te = clamp(t, T0, T1); ctx.lineJoin = 'round';
      ctx.strokeStyle = TR.rijkL; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 500; i++) { const tt = T0 + i / 500 * (te - T0); i ? ctx.lineTo(X(tt), Y(aP(tt))) : ctx.moveTo(X(tt), Y(aP(tt))); } ctx.stroke();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const tt = T0 + i / 300 * (te - T0); i ? ctx.lineTo(X(tt), Y(Pc(tt))) : ctx.moveTo(X(tt), Y(Pc(tt))); } ctx.stroke();
      regel(ctx, 'druk in de slagader', gx + 300, gy - 22, 1, TR.rijkL, 30); regel(ctx, 'druk in de band', gx + 640, gy - 22, q.on('band', 1), C.goud, 30);
      const t1 = q.at('los') + 45 / 14.3, t2 = q.at('los') + 85 / 14.3;
      const m1 = q.on('bovendruk', 1); if (m1 > 0.01) { ctx.save(); ctx.globalAlpha *= m1; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(X(t1), Y(Pc(t1)), 10, 0, 6.283); ctx.fill(); regel(ctx, 'bovendruk', X(t1) + 18, Y(Pc(t1)) - 18, 1, C.text, 32); ctx.restore(); }
      const m2 = q.on('onderdruk', 1); if (m2 > 0.01) { ctx.save(); ctx.globalAlpha *= m2; ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(X(t2), Y(Pc(t2)), 10, 0, 6.283); ctx.fill(); regel(ctx, 'onderdruk', X(t2) + 18, Y(Pc(t2)) + 44, 1, C.text, 32); ctx.restore(); }
      // meter
      const mx = 330, my = 330, mr = 130; ctx.beginPath(); ctx.arc(mx, my, mr, 0, 6.283); shape(ctx, rgba(C.bgSchema, 0.95), C.text, 3);
      for (let v = 0; v <= 200; v += 20) { const an = Math.PI * 0.75 + v / 200 * Math.PI * 1.5; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx + Math.cos(an) * mr * 0.8, my + Math.sin(an) * mr * 0.8); ctx.lineTo(mx + Math.cos(an) * mr * 0.92, my + Math.sin(an) * mr * 0.92); ctx.stroke(); if (v % 40 === 0) text(ctx, String(v), mx + Math.cos(an) * mr * 0.62, my + Math.sin(an) * mr * 0.62 + 9, fTekst(24), C.text2, 'center'); }
      const pc = Pc(t), an = Math.PI * 0.75 + pc / 200 * Math.PI * 1.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(an) * mr * 0.78, my + Math.sin(an) * mr * 0.78); ctx.stroke();
      metaText(ctx, 'bloeddrukmeter', mx, my - mr - 22, C.grain, 'center', 24);
      // arm met band en slagader
      const ay = 720, skin = SKINS[1]; roundRect(ctx, 80, ay - 70, 1500, 140, 70); shape(ctx, rgba(skin, 0.35), rgba(skin, 0.9), 2);
      const o = open(t); const cx0 = 300, cx1 = 560; const k = clamp(Pc(t) / 165, 0, 1);
      ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(430, ay - 84); ctx.quadraticCurveTo(420, 520, mx, my + mr); ctx.stroke();
      ctx.lineCap = 'butt'; ctx.strokeStyle = TR.rijk; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(100, ay); ctx.lineTo(cx0, ay); ctx.stroke(); ctx.lineWidth = Math.max(1, 22 * (Pc(t) < 1 ? 1 : o)); ctx.beginPath(); ctx.moveTo(cx0, ay); ctx.lineTo(cx1, ay); ctx.stroke(); ctx.lineWidth = 22; ctx.globalAlpha *= 1; ctx.beginPath(); ctx.moveTo(cx1, ay); ctx.lineTo(1560, ay); ctx.stroke();
      // bloed achter de band: stroomt alleen als de slagader open is
      let F = 0; for (let tt = 0; tt < t; tt += 0.02) F += (Pc(tt) < 1 ? 1 : open(tt)) * 0.02;
      ctx.fillStyle = TR.rijkL; for (let i = 0; i < 18; i++) { const x = cx1 + ((hash(i * 3) * 1000 + F * 260) % 1000); ctx.beginPath(); ctx.arc(x, ay + (hash(i * 5) - 0.5) * 10, 6, 0, 6.283); ctx.fill(); }
      for (let i = 0; i < 5; i++) { const x = 100 + ((hash(i * 7) * 200 + t * 260) % 200); ctx.beginPath(); ctx.arc(x, ay + (hash(i) - 0.5) * 10, 6, 0, 6.283); ctx.fill(); }
      roundRect(ctx, cx0, ay - 80 - 10 * k, cx1 - cx0, 160 + 20 * k, 22); shape(ctx, rgba('#5A6A80', 0.92), '#8FA0B5', 2);
      label(ctx, 'band', '', 430, ay - 80, 620, 600, q.on('band', 1) * (1 - q.on('Komt', 1)), C.text);
      label(ctx, 'slagader', 'IN JE BOVENARM', 900, ay, 980, 600, q.on('slagader', 1) * (1 - q.on('Komt', 1)), TR.rijkL);
      tag(ctx, 'het eerste bloed komt erdoor', 1180, 600, C.text, q.on('eerste', 1) * (1 - q.on('Stroomt', 1)));
      tag(ctx, 'het bloed stroomt weer vrij', 1180, 600, C.text, q.on('Stroomt', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB; const per = 1.2, ay = 460, xh = 300, xp = 1420, vW = 2400;
      bonzendHart(ctx, 210, ay, 54, t, 60 / per, 1);
      const skin = SKINS[1]; roundRect(ctx, 980, ay - 80, 700, 160, 80); shape(ctx, rgba(skin, 0.3), rgba(skin, 0.9), 2);
      metaText(ctx, 'arm en pols', 1330, ay + 130, C.grain, 'center', 24);
      // slagader met drukgolf
      const kb = Math.floor(t / per), xb = xh + (t - kb * per) * vW; const rr = (x) => 16 + 12 * Math.exp(-(((x - xb) / 70) ** 2)) * (t - kb * per < 0.8 ? 1 : 0);
      ctx.beginPath(); for (let x = xh; x <= 1660; x += 8) ctx.lineTo(x, ay - rr(x) - 8); for (let x = 1660; x >= xh; x -= 8) ctx.lineTo(x, ay + rr(x) + 8); ctx.closePath(); shape(ctx, '#E6D9B8', '#F2E6C8', 1.5);
      ctx.beginPath(); for (let x = xh; x <= 1660; x += 8) ctx.lineTo(x, ay - rr(x)); for (let x = 1660; x >= xh; x -= 8) ctx.lineTo(x, ay + rr(x)); ctx.closePath(); ctx.fillStyle = rgba(TR.rijk, 0.55); ctx.fill();
      const gw = q.on('drukgolf', 1); if (gw > 0.01 && xb < 1660) { ctx.save(); ctx.globalAlpha *= gw; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(xb, ay, 60, 44, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      for (let i = 0; i < 14; i++) { const x = xh + ((hash(i * 3) * 1360 + t * 128) % 1360); ctx.beginPath(); ctx.arc(x, ay + (hash(i * 5) - 0.5) * 12, 6, 0, 6.283); ctx.fillStyle = TR.rijkL; ctx.fill(); }
      // vingers
      const feel = Math.exp(-(((xb - xp) / 90) ** 2)); for (const dx of [-40, 40]) { roundRect(ctx, xp + dx - 26, ay - 200 + 6 * feel, 52, 160, 26); shape(ctx, skin, lighten(skin, 0.2), 2); }
      if (feel > 0.05 && q.on('slag', 2) > 0.01) { ctx.save(); ctx.globalAlpha *= feel * q.on('slag', 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(xp, ay - 40, 70 + 30 * (1 - feel), 0, 6.283); ctx.stroke(); ctx.restore(); }
      tag(ctx, 'polsslag', xp, ay - 240, C.goud, q.on('polsslag', 1) * (1 - q.on('tiende', 1)));
      // de druppel: het bloed zelf
      const td = q.at('zelf', 1); if (t > td - 0.3) { const x = clamp(xh + (t - td) * 128, xh, 1640); druppel(ctx, x, ay, TR.rijk, 14); if (q.on('paar', 1) > 0.01) regel(ctx, 'het bloed: een paar seconden', x, ay + 90, q.on('paar', 1), C.text, 32, 'center'); }
      if (q.on('tiende', 1) > 0.01) regel(ctx, 'de golf: 0,1 seconde', xp, ay - 290, q.on('tiende', 1), C.goud, 32, 'center');
      tag(ctx, 'niet het bloed dat langs stroomt', 960, 820, C.koraal, q.on('niet', 1) * (1 - q.on('drukgolf', 1)));
      tag(ctx, 'een drukgolf in de wand van de slagader', 960, 820, C.goud, q.on('drukgolf', 1) * (1 - q.on('tiende', 1)));
      metaText(ctx, 'vertraagd · schematisch', 60, CAPTION_Y - 30, C.text2, 'left', 26);
      ctx.restore(); }
  },

  s09(ctx, t, q) { bg(ctx, 'schema'); const by = 190, gy0 = 380, gy1 = 780;
    const K = [[q.at('aorta') - 0.5, 0], [q.at('hoog'), 0.14], [q.at('kleinste'), 0.30], [q.at('haarvaten'), 0.44], [q.at('verder') + 0.5, 0.60], [q.at('holle'), 0.80], [q.at('nul'), 0.97]];
    let u = -1; if (t >= K[0][0]) { u = 0.97; for (let i = 1; i < K.length; i++) if (t < K[i][0]) { u = lerp(K[i - 1][1], K[i][1], (t - K[i - 1][0]) / (K[i][0] - K[i - 1][0])); break; } }
    const hz = q.on('grootste', 1) * (1 - q.on('drukverschil', 1));
    if (hz > 0.01) { ctx.fillStyle = rgba(C.goud, 0.12 * hz); ctx.fillRect(RX(0.30), by - 40, RX(0.44) - RX(0.30), gy1 - by + 40); }
    routeBand(ctx, by, { hi: hz > 0.5 ? ['kleinste slagaders'] : null });
    const Y = drukGrafiek(ctx, gy0, gy1, { u: Math.max(0, u) });
    drukGrafiek(ctx, gy0, gy1, { as: 0, f: longP, col: TR.armL, dash: true, lw: 4, u: ramp(t, q.at('kleine'), 2.5), a: q.on('kleine', 1) });
    if (u >= 0 && t < K[K.length - 1][0] + 0.4) { druppel(ctx, RX(u), by, rcol(u), 15); druppel(ctx, RX(u), Y(routeP(u)), rcol(u), 11); }
    tag(ctx, 'grootste daling', 1060, 470, C.goud, hz); if (hz > 0.01) dikPijl(ctx, 900, 480, RX(0.40), Y(routeP(0.37)) - 10, C.goud, hz, 3);
    tag(ctx, 'drukverschil: daardoor stroomt het bloed', 1240, 470, C.goud, q.on('drukverschil', 1) * (1 - q.on('kleine', 1)));
    const ar = q.on('linkerkamer', 1); if (ar > 0.01) { tag(ctx, 'hoog: linkerkamer', 360, 862, TR.rijkL, ar); dikPijl(ctx, 580, 845, lerp(580, 1340, ramp(t, q.at('naar'), 1.2)), 845, C.goud, ar, 5); tag(ctx, 'laag: rechterboezem', 1580, 862, TR.armL, q.on('rechterboezem', 1)); }
    tag(ctx, 'kleine bloedsomloop (longen): veel lager', 1240, 640, TR.armL, q.on('kleine', 1));
  },

  s10(ctx, t, q) { bg(ctx, 'schema'); routeBand(ctx, 300);
    for (const [u, l] of [[0.07, 'a'], [0.52, 'b'], [0.875, 'c']]) { const x = RX(u); ctx.save(); ctx.globalAlpha *= q.on('stroomt', 1); ctx.beginPath(); ctx.arc(x, 520, 46, 0, 6.283); shape(ctx, rgba(C.bgSchema, 0.95), C.goud, 3); text(ctx, l, x, 536, fTekst(44, 700), C.text, 'center'); dashLine(ctx, x, 474, x, 340, C.goud, 0.7, 2); ctx.restore(); }
    vraagteken(ctx, 960, 780, q.on('langzaamst', 1), 150);
  },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const pB = q.on('Maar', 1), pC = q.on('Samen', 1), pD = q.on('Vergelijk', 1), pE = q.on('Doordat', 1);
    const A = 1 - pB, B = pB * (1 - pC), Cc = pC * (1 - pD), D = pD * (1 - pE), E = pE;
    tag(ctx, 'antwoord b: in de haarvaten', 960, 120, C.goud, A * q.on('Antwoord', 1) * (1 - q.on('tuinslang', 1)));
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const hy = 470, du = q.on('duim', 1, 1.0);
      ctx.lineCap = 'round'; ctx.strokeStyle = '#6E7F78'; ctx.lineWidth = 56; ctx.beginPath(); ctx.moveTo(60, 760); ctx.bezierCurveTo(300, 760, 300, hy, 600, hy); ctx.lineTo(830, hy); ctx.stroke(); ctx.strokeStyle = '#8A9A92'; ctx.lineWidth = 3; ctx.stroke();
      const op = lerp(40, 10, du); ctx.save(); ctx.beginPath(); ctx.rect(860, 120, 1040, 740); ctx.clip();
      for (let i = 0; i < 46; i++) { const T = 1.1, p = (t * 1.1 + hash(i * 3)) % 1, v = lerp(300, 1150, du), ang = (hash(i * 7) - 0.5) * (0.5 - 0.42 * du) - 0.04; const tt = p * T;
        const x = 860 + v * Math.cos(ang) * tt, y = hy + (hash(i * 5) - 0.5) * op + v * Math.sin(ang) * tt + 0.5 * 650 * tt * tt; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.9); ctx.fill(); }
      ctx.restore();
      if (du > 0.01) { ctx.save(); ctx.globalAlpha *= du; roundRect(ctx, 800, hy - 92, 92, lerp(40, 70, du) + 4, 36); shape(ctx, SKINS[1], lighten(SKINS[1], 0.2), 2); roundRect(ctx, 820, hy - 70, 50, 18, 9); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fill(); ctx.restore(); }
      tag(ctx, 'tuinslang met je duim erop', 760, 300, C.text, q.on('tuinslang', 1));
      tag(ctx, 'bij één slang: smaller is sneller', 1340, 820, C.goud, q.on('smaller', 1));
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const all = q.on('verdeelt', 1, 1.2);
      vatH(ctx, 60, 520, 470, 38, { t, v: 380, wand: 12, seed: 5 });
      for (let i = 0; i < 24; i++) { const y = 180 + i * 25, one = i === 11; const al = one ? 1 : all; if (al <= 0.01) continue; const pts = bez([520, 470], [900, y], 20).concat([[1840, y]]);
        ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = one && all < 0.5 ? C.goud : rgba(TR.rijk, 0.85); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        particleFlow(ctx, pts, 4, t, 34, TR.rijkL, 5, i * 9, 1); ctx.restore(); }
      label(ctx, 'één haarvat', '', 1500, 455, 1500, 140, q.on('haarvat', 1) * (1 - all), C.goud);
      tag(ctx, 'miljarden haarvaten tegelijk', 1340, 862, C.goud, q.on('miljarden', 1));
      ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc;
      ctx.beginPath(); ctx.arc(430, 470, 12, 0, 6.283); ctx.fillStyle = TR.rijk; ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(430, 470, 26, 0, 6.283); ctx.stroke();
      label(ctx, 'aorta', 'DOORSNEDE', 430, 444, 430, 320, 1, C.text);
      const fl = ramp(t, q.at('Samen'), q.at('groot') - q.at('Samen')); const n = 50, cs = 620 / n;
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(900, 160, 620, 620); ctx.fillStyle = rgba(TR.rijk, 0.9);
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { if ((r * n + c) / (n * n) > fl) continue; ctx.beginPath(); ctx.arc(900 + (c + 0.5) * cs, 160 + (r + 0.5) * cs, cs * 0.36, 0, 6.283); ctx.fill(); }
      text(ctx, 'alle haarvaten samen', 1210, 130, fTekst(34, 600), C.text, 'center'); metaText(ctx, 'ongeveer op schaal', 1210, 830, C.grain, 'center', 24);
      tag(ctx, 'ongeveer 1000 ×', 640, 640, C.goud, q.on('duizend', 1));
      ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const cy = 470, lx = 1250, rx = 560, ry = 320;
      ctx.beginPath(); ctx.ellipse(lx, cy, rx, ry, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.16), rgba(C.teal, 0.7), 2); ctx.fillStyle = rgba(C.teal, 0.16); ctx.fillRect(0, cy - 40, 720, 80); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.beginPath(); ctx.moveTo(0, cy - 40); ctx.lineTo(706, cy - 40); ctx.moveTo(0, cy + 40); ctx.lineTo(706, cy + 40); ctx.stroke();
      const hwF = (x) => x < 700 ? 32 : Math.min(32 + (x - 700) * 1.3, ry * 0.86 * Math.sqrt(Math.max(0, 1 - ((x - lx) / rx) ** 2)));
      for (let i = 0; i < 90; i++) { const p = (t * 0.07 + hash(i * 3)) % 1; const x = p < 0.08 ? lerp(0, 700, p / 0.08) : lerp(700, 1780, (p - 0.08) / 0.92); const y = cy + (hash(i * 7) * 2 - 1) * hwF(x); ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.95); ctx.fill(); }
      label(ctx, 'snelle rivier', '', 360, cy - 40, 360, 300, q.on('rivier', 1), C.text); label(ctx, 'breed meer', '', 1250, cy - ry, 1250, 120, q.on('meer', 1), C.text);
      tag(ctx, 'hetzelfde water stroomt daar langzaam', 1250, 862, C.goud, q.on('langzaam', 1));
      ctx.restore(); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E;
      uitwisseling(ctx, t, { o2: 1, glu: 1, afval: 1, vocht: q.on('vocht', 1), v: 28 });
      tag(ctx, 'langzaam: tijd om stoffen uit te wisselen', 960, 120, C.goud, q.on('tijd', 1));
      tag(ctx, 'de bloeddruk duwt wat vocht naar buiten · film 4', 960, 870, C.teal, q.on('vocht', 1));
      ctx.restore(); }
  },

  s13(ctx, t, q) { bg(ctx, 'schema');
    const pA2 = q.on('volume', 1), pB = q.on('onderdruk', 1);
    const A1 = 1 - pA2, A2 = pA2 * (1 - pB);
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; routeBand(ctx, 330);
      for (const u of [0.07, 0.52, 0.875]) { const x = RX(u); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 270); ctx.lineTo(x, 390); ctx.stroke(); }
      tag(ctx, 'overal even veel bloed per seconde', 960, 620, C.goud, q.on('veel', 1)); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; const base = 780, area = 70 * 460;
      ctx.font = fTekst(40, 600); const p1 = 'volume per seconde = ', p2 = 'doorsnede', p3 = ' × snelheid'; const w1 = ctx.measureText(p1).width, w2 = ctx.measureText(p2).width, w3 = ctx.measureText(p3).width; const x0 = 960 - (w1 + w2 + w3) / 2;
      regel(ctx, p1, x0, 170, 1, C.text, 40); regel(ctx, p2, x0 + w1, 170, q.on('doorsnede', 1), C.goud, 40); regel(ctx, p3, x0 + w1 + w2, 170, q.on('snelheid', 1), C.goud, 40);
      const w = lerp(70, 1000, q.on('duizend', 1, 1.2)), h = lerp(460, area / 1000, q.on('klein', 1, 1.2));
      roundRect(ctx, 300, base - 460, 70, 460, 6); shape(ctx, rgba(TR.rijk, 0.55), TR.rijkL, 2); roundRect(ctx, 640, base - h, w, h, 6); shape(ctx, rgba(TR.rijk, 0.55), TR.rijkL, 2);
      text(ctx, 'aorta', 335, base + 50, fTekst(34, 600), C.text, 'center'); text(ctx, 'haarvaten samen', 640 + w / 2, base + 50, fTekst(34, 600), C.text, 'center');
      const da = q.on('doorsnede', 1); dikPijl(ctx, 640, base + 76, 640 + w, base + 76, C.goud, da * q.on('duizend', 1), 3); dikPijl(ctx, 260, base, 260, base - 460, C.goud, q.on('snelheid', 1), 3); regel(ctx, 'snelheid', 240, base - 230, q.on('snelheid', 1), C.goud, 30, 'right');
      metaText(ctx, 'niet op schaal', 1800, 300, C.grain, 'right', 24);
      tag(ctx, '1000 × zo groot → 1000 × zo langzaam', 1000, 262, C.goud, q.on('klein', 1));
      ctx.restore(); }
    if (pB > 0.01) { ctx.save(); ctx.globalAlpha *= pB;
      const tS1 = q.at('systole') - 0.3, tS2 = q.at('Tijdens'), tD2 = q.at('verder') + 0.5, Pf = 2.5;
      const UU = (tt) => tt < tS1 ? 0.6 - (tS1 - tt) / Pf : tt < tS2 - 0.5 ? 0.6 + 0.28 * (tt - tS1) / (tS2 - 0.5 - tS1) : tt < tS2 ? 0.88 : tt < tD2 ? 0.88 + 0.52 * (tt - tS2) / (tD2 - tS2) : 1.40 + (tt - tD2) / Pf;
      const U = UU(t), f = ((U % 1) + 1) % 1, b = wkB(U), qh = QH(U);
      // linkerkamer als pompkamer
      const sq = hartFase(U).ven; roundRect(ctx, 120, 300, 260, 240, 50); shape(ctx, TR.spier, TR.spierR, 2); roundRect(ctx, 150 + 30 * sq, 330 + 30 * sq, 200 - 30 * sq, 180 - 60 * sq, 36); ctx.fillStyle = TR.rijk; ctx.fill();
      text(ctx, 'linkerkamer', 250, 590, fTekst(30, 600), C.text, 'center');
      const op = hartFase(U).sl; ctx.strokeStyle = TR.klep; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(384, 420 + sd * 34); ctx.lineTo(lerp(400, 414, op), 420 + sd * lerp(4, 30, op)); ctx.stroke(); }
      // elastische aorta
      const r = (x) => 36 + 30 * b * lerp(1, 0.55, (x - 400) / 860);
      ctx.beginPath(); for (let x = 400; x <= 1260; x += 10) ctx.lineTo(x, 420 - r(x) - 16); for (let x = 1260; x >= 400; x -= 10) ctx.lineTo(x, 420 + r(x) + 16); ctx.closePath(); shape(ctx, '#E6D9B8', '#F2E6C8', 1.5);
      ctx.beginPath(); for (let x = 400; x <= 1260; x += 10) ctx.lineTo(x, 420 - r(x)); for (let x = 1260; x >= 400; x -= 10) ctx.lineTo(x, 420 + r(x)); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(TR.rijk, 0.45); ctx.fill();
      const Fh = wkFh(U), Fc = QMEAN * U; ctx.save(); ctx.beginPath(); for (let x = 400; x <= 1260; x += 10) ctx.lineTo(x, 420 - r(x)); for (let x = 1260; x >= 400; x -= 10) ctx.lineTo(x, 420 + r(x)); ctx.closePath(); ctx.clip();
      for (let i = 0; i < 40; i++) { const x0 = 400 + hash(i * 3) * 900; const sp = lerp(Fh, Fc, (x0 - 400) / 860); const x = 400 + ((hash(i * 3) * 900 + sp * 3600) % 900); ctx.beginPath(); ctx.arc(x, 420 + (hash(i * 5) * 2 - 1) * (r(x) - 10), 8, 0, 6.283); ctx.fillStyle = TR.rijkL; ctx.fill(); } ctx.restore();
      metaText(ctx, 'aorta · elastische wand', 830, 300 - 30 * b, C.grain, 'center', 24);
      // haarvaten
      for (let j = 0; j < 6; j++) { const y1 = 420 + (j - 2.5) * 34; const pts = [[1260, 420], [1420, y1], [1840, y1]]; ctx.strokeStyle = rgba(TR.rijk, 0.85); ctx.lineWidth = 5; ctx.beginPath(); pts.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
        for (let k = 0; k < 4; k++) { const d = ((hash(j * 4 + k) * 580 + Fc * 1400) % 580); const p = padPunt(pts, d / 580, false); ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, 6.283); ctx.fillStyle = TR.rijkL; ctx.fill(); } }
      text(ctx, 'haarvaten', 1640, 560, fTekst(30, 600), C.text, 'center');
      // rek en terugveren
      const db = wkB(U + 0.01) - b; const arr = clamp(Math.abs(db) * 40, 0, 1);
      if (arr > 0.02) for (const x of [600, 820, 1040]) for (const sd of [-1, 1]) { const y0 = 420 + sd * (r(x) + 22); if (db > 0) dikPijl(ctx, x, y0, x, y0 + sd * 40, C.goud, arr, 4); else dikPijl(ctx, x, y0 + sd * 40, x, y0, C.goud, arr, 4); }
      tag(ctx, 'systole: de wand rekt uit en slaat bloed op', 960, 150, TR.rijkL, q.on('systole', 1) * (1 - q.on('Tijdens', 1)));
      tag(ctx, 'diastole: de wand veert terug en duwt bloed verder', 960, 150, C.text, q.on('diastole', 1) * (1 - q.on('windketelwerking', 1)));
      tag(ctx, 'windketelwerking', 960, 150, C.goud, q.on('windketelwerking', 1));
      // stroomgrafieken
      const gr = (x, nm, fn, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const gy = 660, gh = 170, gw = 660; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x, gy + gh); ctx.lineTo(x + gw, gy + gh); ctx.stroke(); metaText(ctx, nm, x, gy - 18, C.grain, 'left', 24);
        ctx.strokeStyle = TR.rijkL; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const uu = U - 3 + i / 100; const py = gy + gh - fn(uu) * gh * 0.9; i ? ctx.lineTo(x + i / 300 * gw, py) : ctx.moveTo(x, py); } ctx.stroke();
        ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(x + gw, gy + gh - fn(U) * gh * 0.9, 8, 0, 6.283); ctx.fill(); ctx.restore(); };
      gr(160, 'stroom uit het hart: stotend', QH, q.on('stotende', 1)); gr(1100, 'stroom in de haarvaten: bijna gelijkmatig', (uu) => QC(uu), q.on('gelijkmatige', 1));
      metaText(ctx, 'vertraagd · schematisch', 60, CAPTION_Y - 22, C.text2, 'left', 24);
      ctx.restore(); }
  },

  s14(ctx, t, q) { bg(ctx, 'schema'); const X = 620, Yb = 150, S = 1.0;
    const tW = q.at('Loop'), tZ = q.at('Zakt'), tK = q.at('klappen'), tR = q.at('Spieren', 3), P = 1.4, st = 70;
    const fW = (dt) => dt <= 0 ? 0 : st * (Math.floor(dt / P) + ease(Math.min((dt % P) / (0.4 * P), 1)));
    let off = 0, c = 0, kO = [1, 1], hiK = q.on('kleppen', 1) * (1 - q.on('Spieren', 3));
    const walk = (dt) => { const ph = (dt % P) / P; c = ph < 0.4 ? Math.sin(Math.PI * ph / 0.4) : 0; kO = ph < 0.4 ? [0, 1] : [1, 0]; };
    if (t < tW) { off = 6 * Math.sin(t * 0.8); }
    else if (t < tZ) { off = fW(t - tW); walk(t - tW); }
    else if (t < tR) { const back = 18 * ease((t - tZ) / Math.max(0.5, tK - tZ)); off = fW(tZ - tW) - back; c = 0; kO = t < tK ? [1, 1] : [lerp(1, 0, ramp(t, tK, 0.3)), lerp(1, 0, ramp(t, tK, 0.3))]; hiK = Math.max(hiK, t > tK ? 1 : 0); }
    else { off = fW(tZ - tW) - 18 + fW(t - tR); walk(t - tR); }
    been(ctx, X, Yb, S, { c, off, kO, hiK, hiS: q.on('kuitspieren', 1) * (1 - q.on('kleppen', 1)), hiA: q.on('aders', 1) * (1 - q.on('kuitspieren', 1)) });
    const pt = (n) => beenPunt(X, Yb, S, n);
    tag(ctx, 'na de haarvaten: weinig druk', 1340, 200, C.text, q.on('weinig', 1) * (1 - q.on('aders', 1)));
    const up = q.on('omhoog', 1); dikPijl(ctx, pt('top')[0], 135, pt('top')[0], 60, C.goud, up, 5); vraagteken(ctx, pt('top')[0] + 80, 140, q.on('hart', 1) * (1 - q.on('aders', 1)), 90);
    label(ctx, 'ader', 'TUSSEN DE SPIEREN', pt('ader')[0] + 16, pt('ader')[1], 1060, 250, q.on('aders', 1), TR.armL);
    label(ctx, 'kuitspier', '', pt('kuit')[0] - 20, pt('kuit')[1], 300, 300, q.on('kuitspieren', 1), C.text);
    const kl = q.on('kleppen', 1); label(ctx, 'kleppen', 'ÉÉN KANT OP', pt('klepB')[0] + 16, pt('klepB')[1] - 12, 1060, 470, kl, C.goud); label(ctx, '', '', pt('klepO')[0] + 16, pt('klepO')[1] - 12, 1060, 470, kl, C.goud);
    regel(ctx, 'naar het hart', pt('top')[0] + 30, 92, q.on('hart', 2), C.goud, 32);
    tag(ctx, 'lopen: de kuitspier knijpt de ader samen', 1340, 700, C.text, q.on('knijpen', 1) * (1 - q.on('Zakt', 1)));
    tag(ctx, 'zakt het bloed terug? kleppen dicht', 1340, 700, C.goud, q.on('Zakt', 1) * (1 - q.on('Spieren', 1)));
    tag(ctx, 'spieren + kleppen = spierpomp', 1340, 700, C.goud, q.on('spierpomp', 1));
  },

  s15(ctx, t, q) { bg(ctx, 'schema'); const PX = 640, h = 560, hh = h / 6.6;
    const tM = q.at('Moet'), Lt = ramp(t, q.at('flauw'), 0.9) * (1 - ramp(t, tM, 0.8)), upL = q.on('benen', 2, 1.0) * (1 - ramp(t, tM, 0.8));
    const pool = clamp(0.6 * q.on('rekken', 1, 1.5) + 0.4 * q.on('hangen', 1, 1.5), 0, 1) * (1 - 0.5 * Lt - 0.4 * upL) * (1 - 0.7 * ramp(t, q.at('tenen'), 2));
    const sway = Math.sin(t * 3) * 0.05 * q.on('duizelig', 1) * (1 - Lt);
    const skin = mixHex(SKINS[2], '#E2D6CC', 0.7 * ramp(t, q.at('hersenen', 1), 2) * (1 - ramp(t, q.at('hersenen', 2), 2)));
    const lift = t > q.at('Beweeg') ? 10 * Math.max(0, Math.sin(t * 4.5)) : 0;
    const rot = -Lt * Math.PI / 2 - upL * 0.12 + sway, px = PX, py = lerp(860, 800, Lt) - 40 * upL - lift;
    rugzak(ctx, PX, 778, upL);
    ctx.save(); ctx.translate(px, py); ctx.rotate(rot); person(ctx, 0, 0, h, 1, { skin, armL: { a1: 0.12 }, armR: { a1: 0.12 } });
    const hipY = -h + hh * 3.55, hipW = hh * 1.5; ctx.lineCap = 'round';
    for (const s2 of [-1, 1]) { const lx = s2 * hipW * 0.24; ctx.strokeStyle = rgba(TR.arm, 0.5 + 0.45 * pool); ctx.lineWidth = 8 + 24 * pool; ctx.beginPath(); ctx.moveTo(lx, -hh * 0.55); ctx.lineTo(lx, hipY + hh * 0.3); ctx.stroke();
      const fl = Math.max(upL, lift > 0 ? 1 : 0, Lt * 0.6); if (fl > 0.01) for (let k = 0; k < 6; k++) { const yy = -hh * 0.6 - ((t * 120 + k * 52) % (hh * 2.4)); ctx.beginPath(); ctx.arc(lx, yy, 6, 0, 6.283); ctx.fillStyle = rgba(TR.armL, fl); ctx.fill(); } }
    bonzendHart(ctx, hh * 0.2, -h + hh * 2.05, 16, t, lerp(70, 100, q.on('sneller', 1)), 1);
    ctx.restore();
    const W2 = (lx, ly) => [px + lx * Math.cos(rot) - ly * Math.sin(rot), py + lx * Math.sin(rot) + ly * Math.cos(rot)];
    // A: stilstaan
    const A = 1 - q.on('warm', 1);
    tag(ctx, 'kuitspieren doen niets', 1440, 300, C.text, A * q.on('niets', 1)); tag(ctx, 'bloed blijft in je benen hangen', 1440, 420, TR.armL, A * q.on('hangen', 1));
    // B: warmte
    const Bw = q.on('warm', 1) * (1 - q.on('Meestal', 1));
    if (Bw > 0.01) { ctx.save(); ctx.globalAlpha *= Bw; ctx.strokeStyle = rgba('#E8B04A', 0.8); ctx.lineWidth = 5; for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + t * 0.12; ctx.beginPath(); ctx.moveTo(1760 + Math.cos(a) * 62, 150 + Math.sin(a) * 62); ctx.lineTo(1760 + Math.cos(a) * 86, 150 + Math.sin(a) * 86); ctx.stroke(); } ctx.beginPath(); ctx.arc(1760, 150, 48, 0, 6.283); ctx.fillStyle = '#E8B04A'; ctx.fill(); ctx.restore();
      const z = q.on('huid', 1); const src = W2(hh * 1.0, -h + hh * 3.2); if (z > 0.01) zoomCircle(ctx, 1300, 450, 210, src[0], src[1], 'een bloedvat in je huid', z * Bw, () => { ctx.fillStyle = mixHex(SKINS[2], '#000000', 0.1); ctx.fillRect(1090, 240, 420, 420); ctx.fillStyle = SKINS[2]; ctx.fillRect(1090, 240, 420, 70); const rr = lerp(22, 48, q.on('wijd', 1, 1.2)); ctx.beginPath(); ctx.arc(1300, 470, rr + 8, 0, 6.283); shape(ctx, TR.spier, TR.spierR, 1.5); ctx.beginPath(); ctx.arc(1300, 470, rr, 0, 6.283); ctx.fillStyle = TR.rijk; ctx.fill(); });
      tag(ctx, 'warm: de vaten in je huid staan wijd open', 1220, 862, C.text, q.on('open', 1) * Bw); }
    // C: het lichaam vangt het op
    const Cc = q.on('Meestal', 1) * (1 - q.on('minder', 1));
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; hartMeter(ctx, 1140, 180, lerp(70, 100, q.on('sneller', 1, 1.5)), t, q.on('hart', 1), 460);
      const ks = q.on('knijpen', 1, 1.2); for (const x of [1260, 1480]) { const rr = lerp(42, 22, ks); ctx.beginPath(); ctx.arc(x, 480, rr + 12, 0, 6.283); shape(ctx, TR.spier, TR.spierR, 2); ctx.beginPath(); ctx.arc(x, 480, rr, 0, 6.283); ctx.fillStyle = TR.rijk; ctx.fill(); }
      regel(ctx, 'kleine slagaders knijpen samen', 1370, 600, q.on('knijpen', 1), C.text, 32, 'center');
      tag(ctx, 'meestal vangt je lichaam dat op', 1370, 740, C.groen, q.on('vangt', 1) * (1 - q.on('Maar', 1)));
      tag(ctx, 'na lang staan in de warmte: niet genoeg', 1370, 740, C.koraal, q.on('altijd', 1));
      ctx.restore(); }
    // D: de keten
    const Dk = q.on('minder', 1) * (1 - q.on('Antwoord', 1));
    if (Dk > 0.01) { ctx.save(); ctx.globalAlpha *= Dk; const rows = [['minder bloed terug naar je hart', q.on('minder', 1), C.text], ['je hart pompt per slag minder weg', q.on('minder', 2), C.text], ['lagere druk naar je hoofd', q.on('zakt', 1), C.text], ['te weinig zuurstof in je hersenen', q.on('zuurstof', 1), C.text], ['duizelig, en je valt flauw', q.on('flauw', 1), C.koraal]];
      rows.forEach(([s, a, col], i) => { const y = 200 + i * 135; tag(ctx, s, 1100, y, col, a, 'left'); if (i) dikPijl(ctx, 1150, y - 112, 1150, y - 52, C.line, a, 3); }); ctx.restore(); }
    // drukmeter bij het hoofd
    const gm = q.on('hoofd', 1) * (1 - ramp(t, tM, 0.6)); if (gm > 0.01) { ctx.save(); ctx.globalAlpha *= gm; const lv = lerp(lerp(0.9, 0.4, q.on('zakt', 1, 2)), 0.85, q.on('hersenen', 2, 2));
      roundRect(ctx, 860, 320, 56, 280, 14); shape(ctx, rgba(C.bgSchema, 0.9), C.line, 1.5); roundRect(ctx, 866, 594 - 268 * lv, 44, 268 * lv, 10); ctx.fillStyle = TR.rijk; ctx.fill(); metaText(ctx, 'druk bij je hoofd', 888, 296, C.grain, 'center', 24); ctx.restore(); }
    // E: het antwoord
    const E = q.on('Antwoord', 1) * (1 - q.on('vallen', 1));
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; tag(ctx, 'antwoord b', 1100, 220, C.goud, 1, 'left'); regel(ctx, 'te weinig bloed terug naar het hart', 1100, 300, 1, C.text, 36);
      regel(ctx, 'niet a: er was genoeg zuurstof', 1100, 430, q.on('genoeg', 1), C.text2, 34); regel(ctx, 'niet c: het hart deed het gewoon', 1100, 490, q.on('gewoon', 1), C.text2, 34);
      tag(ctx, 'het probleem zat in het vervoer', 1100, 640, C.goud, q.on('vervoer', 1), 'left'); ctx.restore(); }
    // F: liggen
    const F = q.on('vallen', 1) * (1 - ramp(t, tM, 0.6));
    if (F > 0.01) { const hd = W2(0, -h + hh * 0.56), hr = W2(hh * 0.2, -h + hh * 2.05); dashLine(ctx, hd[0] - 40, hd[1], hr[0] + 60, hd[1], C.goud, F * q.on('hoogte', 1), 3);
      tag(ctx, 'hoofd even hoog als je hart', 1380, 300, C.goud, F * q.on('hoogte', 1)); tag(ctx, 'benen omhoog: bloed sneller terug', 1380, 440, TR.armL, F * q.on('benen', 2)); }
    // G: lang staan? beweeg
    const G = ramp(t, tM, 0.8); if (G > 0.01) { tag(ctx, 'beweeg je tenen, span je kuiten aan', 1380, 360, C.text, G * q.on('tenen', 1)); tag(ctx, 'de spierpomp blijft aan het werk', 1380, 500, C.goud, G * q.on('spierpomp', 1)); }
  },

  s16(ctx, t, q) { schoolplein(ctx, t, { zon: 0 });
    const bottle = (c, x, y) => { roundRect(c, x - 14, y - 70, 28, 80, 8); shape(c, rgba(C.teal, 0.55), lighten(C.teal, 0.3), 2); roundRect(c, x - 8, y - 84, 16, 16, 4); c.fillStyle = C.text2; c.fill(); };
    zittend(ctx, 420, 860, 400, { armR: { a1: 0.55, a2: -1.1, hold: (c, x, y) => bottle(c, x, y) }, armL: { a1: 0.2 } });
    ctx.save(); roundRect(ctx, 900, 110, 980, 740, 24); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5); ctx.restore();
    const R = 1 - q.on('klasgenoot', 1); if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R;
      const row = (y, kind, s, title, sub, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; vatDoorsnede(ctx, 1040, y, kind, { s, puls: kind === 'slagader' ? Math.exp(-((t % 0.85) / 0.85) * 6) : 0 }); text(ctx, title, 1180, y - 8, fTekst(38, 600), C.text, 'left'); regel(ctx, sub, 1180, y + 38, 1, C.text2, 30); ctx.restore(); };
      row(250, 'slagader', 0.6, 'slagader', 'dikke, elastische wand · hoge druk', q.on('Slagaders', 1));
      row(470, 'haarvat', 1.4, 'haarvat', 'één cellaag · langzaam · uitwisseling', q.on('haarvaten', 1));
      row(690, 'ader', 0.55, 'ader', 'lage druk · kleppen · spierpomp', q.on('Aders', 2)); ctx.restore(); }
    const K = q.on('klasgenoot', 1); if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      text(ctx, 'waarom viel ze flauw?', 960, 200, fTitel(48), C.text, 'left');
      const rows = [['spierpomp lag stil', q.on('stil', 1), C.text], ['warmte: vaten wijd', q.on('wijd', 1), C.text], ['bloed bleef in haar benen', q.on('hangen', 1), TR.armL], ['hersenen even te weinig bloed', q.on('hersenen', 1), C.koraal]];
      rows.forEach(([s, a, col], i) => { const y = 330 + i * 140; tag(ctx, s, 960, y, col, a, 'left'); if (i > 1) dikPijl(ctx, 1010, y - 112, 1010, y - 56, C.line, a, 3); }); ctx.restore(); }
  },
};
