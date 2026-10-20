// Afweer 2 · Antistoffen op maat — scènes per alinea.
// Versie 1.1 (20 okt 2026): beeld na feedback Kamiel. Castpersonages (Noor en de jongste, getekend als Teun uit het castboek),
// antigenen met de basis óp het oppervlak en loodrecht naar buiten, receptoren en antistoffen als Y met een 'slot'
// dat precies om het antigeen past, en processen die echt gebeuren (aanmeren, delen, uitstoten, binden, opeten).
grainCanvas = document.createElement('canvas'); grainCanvas.width = 1; grainCanvas.height = 1; // geen korrels (beeldafspraak)

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (!s || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
// één tekstbalk tegelijk: de vorige verdwijnt snel, dan komt de nieuwe (uit film 1; een lege tekst = balk weg)
function wissel(ctx, q, rij, x, y) { let k = -1; rij.forEach((r, i) => { if (q.on(r[1], r[2] || 1) > 0) k = i; }); if (k < 0) return; const u = q.on(rij[k][1], rij[k][2] || 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][3], 1 - u / 0.4); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][3], (u - 0.35) / 0.65); }
const VIR = '#E07A5F', BCOL = '#5BA4C9', TCOL = '#7FC48F', AS = '#E0B64A', WIT = '#D8DCE2', EIGEN = '#8C7BBF', BEEN = '#E6D8A8', LYMF = '#7FC48F', GRIEP = '#C9708F', BACT = '#E07A5F', MERG = '#B5574A';
const bump = u => Math.sin(Math.PI * clamp(u, 0, 1));
const rotV = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

// ---------- vormpjes ----------
function vormPad(ctx, k, s) { ctx.beginPath();
  if (k === 0) { ctx.moveTo(-s, s * 0.8); ctx.lineTo(0, -s); ctx.lineTo(s, s * 0.8); ctx.closePath(); }
  else if (k === 1) { ctx.rect(-s * 0.85, -s * 0.85, s * 1.7, s * 1.7); }
  else if (k === 2) { ctx.arc(0, 0, s, 0, 6.283); }
  else if (k === 3) { ctx.moveTo(0, -s * 1.1); ctx.lineTo(s, 0); ctx.lineTo(0, s * 1.1); ctx.lineTo(-s, 0); ctx.closePath(); }
  else if (k === 4) { for (let i = 0; i < 6; i++) { const an = i * 1.047; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * s, Math.sin(an) * s); } ctx.closePath(); }
  else if (k === 5) { ctx.moveTo(-s, s); ctx.lineTo(-s, -s * 0.2); ctx.lineTo(0, -s); ctx.lineTo(s, -s * 0.2); ctx.lineTo(s, s); ctx.closePath(); }
  else { ctx.moveTo(-s, s); ctx.lineTo(-s * 0.3, -s); ctx.lineTo(s, -s * 0.4); ctx.lineTo(s * 0.6, s); ctx.closePath(); } }
const VORMKL = ['#F2C0A8', '#9FD6C8', '#F0D78C', '#C9B8F0', '#F2A8B8', '#A8C8F2', '#D8E6A0'];

// ---------- geometrie: punt + buitennormaal op een blob (zelfde formule als blob() in lib.js) ----------
function blobPt(x, y, rx, ry, wob, seed, t, an) { const f = a => 1 + wob * (Math.sin(a * 3 + seed) * 0.5 + Math.sin(a * 5 + seed * 2 + t * 0.3) * 0.3); const p = a => [x + Math.cos(a) * rx * f(a), y + Math.sin(a) * ry * f(a)];
  const [px, py] = p(an), [ax, ay] = p(an - 0.01), [bx, by] = p(an + 0.01); const tx = bx - ax, ty = by - ay, L = Math.hypot(tx, ty) || 1; return [px, py, ty / L, -tx / L]; }

// ---------- antigeen: gevuld vormpje, basis óp het oppervlak, punt loodrecht naar buiten (normaal nx, ny) ----------
function agMidden(x, y, nx, ny, s) { return [x + nx * s * 0.85, y + ny * s * 0.85]; }
function antigeen(ctx, x, y, nx, ny, k, s = 12, a = 1, col = null) { if (a <= 0.01) return; const [cx, cy] = agMidden(x, y, nx, ny, s); ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.rotate(Math.atan2(ny, nx) + 1.571); vormPad(ctx, k, s); ctx.fillStyle = col || VORMKL[k % VORMKL.length]; ctx.fill(); ctx.restore(); }
// slot: holle omtrek van vormpje k rond (cx, cy), punt in richting (dx, dy); een antigeen met dezelfde stand past er precies in
function slot(ctx, cx, cy, dx, dy, k, s, col, lw = 3, glow = 0) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.atan2(dy, dx) + 1.571); ctx.scale(1.3, 1.3); vormPad(ctx, k, s); ctx.restore(); ctx.strokeStyle = glow > 0.01 ? lighten(col, 0.55 * glow) : col; ctx.lineWidth = lw + 2.5 * glow; ctx.stroke(); }

// ---------- receptor van een B-cel: Y met de voet op het membraan en een slot aan elke arm ----------
function yGeo(x, y, nx, ny, s) { const jx = x + nx * s, jy = y + ny * s; const tips = []; for (const d of [-0.55, 0.55]) { const [dx, dy] = rotV(nx, ny, d); const bx = jx + dx * s * 0.9, by = jy + dy * s * 0.9, c = s * 0.5; tips.push({ bx, by, dx, dy, cx: bx + dx * c * 1.25, cy: by + dy * c * 1.25, c }); } return { jx, jy, tips }; }
function receptorY(ctx, x, y, nx, ny, k, s, col = BCOL, a = 1, glow = 0) { if (a <= 0.01) return; const g = yGeo(x, y, nx, ny, s); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = glow > 0.01 ? lighten(col, 0.4 * glow) : col; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, s * 0.16);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(g.jx, g.jy); for (const p of g.tips) { ctx.moveTo(g.jx, g.jy); ctx.lineTo(p.bx, p.by); } ctx.stroke();
  for (const p of g.tips) slot(ctx, p.cx, p.cy, -p.dx, -p.dy, k, p.c, col, Math.max(2, s * 0.11), glow); ctx.restore(); }

// ---------- antistof: gouden Y (s = schaal, 1 ≈ 100 px hoog; armen wijzen bij hoek 0 omhoog); k = vorm van de bindplaatsen ----------
function antistof(ctx, x, y, s = 1, ang = 0, a = 1, col = AS, k = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 0); ctx.lineTo(-32, -42); ctx.moveTo(0, 0); ctx.lineTo(32, -42); ctx.stroke();
  if (k == null) { ctx.fillStyle = lighten(col, 0.45); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 36, -47, 9, 0, 6.283); ctx.fill(); } }
  else for (const sx of [-1, 1]) { const dx = sx * 0.606, dy = -0.795; slot(ctx, sx * 32 + dx * 15, -42 + dy * 15, -dx, -dy, k, 11, col, 5); }
  ctx.restore(); }
// antistof die met één bindplaats óp een antigeen zit. (x, y) = voet van het antigeen, (nx, ny) = normaal, sa = grootte van het antigeen.
// off = afstand nog vóór het binden (invliegen), vlag = gloed aan de steel ('vlaggetje' voor fagocyten)
function antistofOp(ctx, x, y, nx, ny, k, sa, s, a = 1, kant = 1, o = {}) { if (a <= 0.01) return; const { col = AS, off = 0, vlag = 0 } = o; let [cx, cy] = agMidden(x, y, nx, ny, sa); cx += nx * off; cy += ny * off;
  ctx.save(); ctx.globalAlpha *= a; const L = 52 * s; const ex = cx + nx * sa * 1.3, ey = cy + ny * sa * 1.3; const [ux, uy] = rotV(nx, ny, 0.5 * kant);
  const jx = ex + ux * L, jy = ey + uy * L; const [mx, my] = rotV(ux, uy, -0.65 * kant), [ox, oy] = rotV(-ux, -uy, -1.3 * kant);
  const sx = jx + mx * L * 0.95, sy = jy + my * L * 0.95, fx = jx + ox * L, fy = jy + oy * L;
  if (vlag > 0.01) { const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 26 * s + 14); g.addColorStop(0, rgba(AS, 0.85 * vlag)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 26 * s + 14, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, 12 * s); ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(jx, jy); ctx.lineTo(fx, fy); ctx.moveTo(jx, jy); ctx.lineTo(sx, sy); ctx.stroke();
  ctx.fillStyle = lighten(col, 0.45); ctx.beginPath(); ctx.arc(fx, fy, Math.max(2.5, 8 * s), 0, 6.283); ctx.fill();
  slot(ctx, cx, cy, nx, ny, k, sa, col, Math.max(2, 5 * s)); ctx.restore(); }
// antistof als brug tussen twee antigenen (samenklonteren); A en B = [voetx, voety, nx, ny]
function antistofBrug(ctx, A, B, k, sa, s, a = 1, kant = 1) { if (a <= 0.01) return; const [ax, ay] = agMidden(A[0], A[1], A[2], A[3], sa), [bx, by] = agMidden(B[0], B[1], B[2], B[3], sa);
  const e1x = ax + A[2] * sa * 1.3, e1y = ay + A[3] * sa * 1.3, e2x = bx + B[2] * sa * 1.3, e2y = by + B[3] * sa * 1.3; const dx = e2x - e1x, dy = e2y - e1y, d = Math.hypot(dx, dy) || 1, dd = d / 2;
  const L = Math.max(52 * s, dd * 1.15), h = Math.sqrt(Math.max(0, L * L - dd * dd)); const px = -dy / d * kant, py = dx / d * kant; const jx = (e1x + e2x) / 2 + px * h, jy = (e1y + e2y) / 2 + py * h;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = AS; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, 12 * s); ctx.beginPath(); ctx.moveTo(e1x, e1y); ctx.lineTo(jx, jy); ctx.lineTo(e2x, e2y); ctx.moveTo(jx, jy); ctx.lineTo(jx + px * L * 0.9, jy + py * L * 0.9); ctx.stroke();
  slot(ctx, ax, ay, A[2], A[3], k, sa, AS, 3); slot(ctx, bx, by, B[2], B[3], k, sa, AS, 3); ctx.restore(); }

// ---------- virus: envelop met capside, uitsteeksels met antigenen rondom; ast(i) = antistof op uitsteeksel i (0..1) ----------
function virusN(ks, o = {}) { return o.n || Math.max(10, ks.length * 5); }
function virusAg(x, y, r, n, rot, i) { const an = rot + i * 6.283 / n, nx = Math.cos(an), ny = Math.sin(an); return [x + nx * r * 1.2, y + ny * r * 1.2, nx, ny]; }
function virus(ctx, x, y, r, ks, t = 0, o = {}) { const { a = 1, col = VIR, rot = 0, ast = null, ag = r * 0.17, ks2 = null, mix = 0, vliegin = null, kant = null } = o; if (a <= 0.01) return; const n = virusN(ks, o); ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const [px, py, nx, ny] = virusAg(x, y, r, n, rot, i); ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = Math.max(2, r * 0.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + nx * r * 0.95, y + ny * r * 0.95); ctx.lineTo(px, py); ctx.stroke();
    const k = ks[i % ks.length]; if (ks2) { antigeen(ctx, px, py, nx, ny, k, ag, 1 - mix); antigeen(ctx, px, py, nx, ny, ks2[i % ks2.length], ag, mix); } else antigeen(ctx, px, py, nx, ny, k, ag); }
  circ(ctx, x, y, r, rgba(col, 0.8), lighten(col, 0.3), 2);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot * 0.5); ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.52; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * r * 0.58, Math.sin(an) * r * 0.58); } ctx.closePath(); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.45); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); for (let k = 0; k <= 24; k++) { const u = k / 24, an = u * 9.5, rr = r * (0.12 + 0.28 * u); ctx[k ? 'lineTo' : 'moveTo'](Math.cos(an) * rr, Math.sin(an) * rr); } ctx.stroke(); ctx.restore();
  if (ast) for (let i = 0; i < n; i++) { const v = ast(i); if (v <= 0.01) continue; const [px, py, nx, ny] = virusAg(x, y, r, n, rot, i); antistofOp(ctx, px, py, nx, ny, ks[i % ks.length], ag, r * 0.0062, Math.min(1, v * 3), kant ? kant(i) : (i % 2 ? 1 : -1), { off: vliegin ? (1 - v) * vliegin : 0 }); }
  ctx.restore(); }
// waar moet een virus staan zodat uitsteeksel 0 precies in een slot zit (slot = {cx, cy, dx, dy})
function virusDock(sl, r, ag) { const ux = -sl.dx, uy = -sl.dy; const d = r * 1.2 + ag * 0.85; return { x: sl.cx - ux * d, y: sl.cy - uy * d, rot: Math.atan2(uy, ux) }; }

// ---------- B-cel (of plasmacel/geheugencel): blob met ronde kern en Y-receptoren ----------
function bCel(ctx, x, y, r, k, t = 0, o = {}) { const { a = 1, col = BCOL, rec = 1, n = 8, glow = 0, seed = 2, label = '', soort = 'b', rot = 0.3, rs = r * 0.28 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2); g.addColorStop(0, rgba(AS, 0.35 * glow)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, 6.283); ctx.fill(); }
  const rr = soort === 'plasma' ? r * 1.12 : r; blob(ctx, x, y, rr, rr * 0.95, 0.04, seed, t); shape(ctx, rgba(col, soort === 'geheugen' ? 0.45 : 0.28), col, 2.5);
  if (soort === 'plasma') { ctx.save(); blob(ctx, x, y, rr, rr * 0.95, 0.04, seed, t); ctx.clip(); ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = Math.max(1.5, r * 0.025); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(x - r * 0.45, y, r * (0.42 + i * 0.13), -1.05, 1.05); ctx.stroke(); } ctx.restore(); circ(ctx, x - r * 0.55, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2); }
  else circ(ctx, x, y, r * 0.52, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (rec > 0.01 && soort !== 'plasma') for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n; const [px, py, nx, ny] = blobPt(x, y, r, r * 0.95, 0.04, seed, t, an); receptorY(ctx, px, py, nx, ny, k, rs, col, rec, glow); }
  if (soort === 'geheugen') { ctx.fillStyle = C.goud; ctx.font = fTekst(Math.round(r * 0.6), 700); ctx.textAlign = 'center'; ctx.fillText('★', x, y + r * 0.22); }
  if (label) text(ctx, label, x, y + r + (rec > 0.01 && soort !== 'plasma' ? rs * 3.1 : 0) + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// slot van receptor 0 (arm 2) van een B-cel: {cx, cy, dx, dy, c}
function bSlot(x, y, r, seed, t, rot, rs = r * 0.28) { const [px, py, nx, ny] = blobPt(x, y, r, r * 0.95, 0.04, seed, t, rot); const p = yGeo(px, py, nx, ny, rs).tips[1]; return p; }
// waar moet een B-cel staan zodat het slot van receptor 0 precies om antigeen A zit (A = [voetx, voety, nx, ny], grootte sa)
function bDock(A, sa, r, seed, t, rs = r * 0.28) { const [ax, ay] = agMidden(A[0], A[1], A[2], A[3], sa); const [nx0, ny0] = rotV(-A[2], -A[3], -0.55); const rot = Math.atan2(ny0, nx0); const p = bSlot(0, 0, r, seed, t, rot, rs); return { x: ax - p.cx, y: ay - p.cy, rot }; }

// ---------- T-helpercel: groene blob met T-celreceptoren (één slot per receptor) ----------
function tGeo(px, py, nx, ny, rs) { const c = rs * 0.45; const bx = px + nx * rs * 0.7, by = py + ny * rs * 0.7; return { bx, by, c, cx: bx + nx * c * 1.25, cy: by + ny * c * 1.25 }; }
function tCel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, label = '', k = 3, rot = 0, n = 6, glow = 0, rs = r * 0.32, seed = 5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.2); g.addColorStop(0, rgba(TCOL, 0.45 * glow)); g.addColorStop(1, rgba(TCOL, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, 6.283); ctx.fill(); }
  blob(ctx, x, y, r, r * 0.95, 0.04, seed, t); shape(ctx, rgba(TCOL, 0.3), TCOL, 2.5); circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n; const [px, py, nx, ny] = blobPt(x, y, r, r * 0.95, 0.04, seed, t, an); const g = tGeo(px, py, nx, ny, rs); ctx.strokeStyle = TCOL; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2.5, rs * 0.16); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(g.bx, g.by); ctx.stroke(); slot(ctx, g.cx, g.cy, -nx, -ny, k, g.c, TCOL, Math.max(2, rs * 0.11), glow); }
  if (label) text(ctx, label, x, y + r + rs * 1.8 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function tDock(cx, cy, nbx, nby, sa, r, seed, t, rs = r * 0.32) { const rot = Math.atan2(-nby, -nbx); const [px, py, nx, ny] = blobPt(0, 0, r, r * 0.95, 0.04, seed, t, rot); const g = tGeo(px, py, nx, ny, rs); return { x: cx - g.cx, y: cy - g.cy, rot, rs: sa / 0.45 }; }
// MHC: wit bakje op het membraan met een stukje antigeen erin (antigeenpresentatie)
function mhc(ctx, x, y, nx, ny, k, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tx = -ny, ty = nx; ctx.strokeStyle = WIT; ctx.lineWidth = Math.max(3, s * 0.35); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x - tx * s * 1.25 + nx * s * 1.7, y - ty * s * 1.25 + ny * s * 1.7); ctx.lineTo(x - tx * s * 1.25, y - ty * s * 1.25); ctx.lineTo(x + tx * s * 1.25, y + ty * s * 1.25); ctx.lineTo(x + tx * s * 1.25 + nx * s * 1.7, y + ty * s * 1.25 + ny * s * 1.7); ctx.stroke();
  antigeen(ctx, x + nx * s * 0.25, y + ny * s * 0.25, nx, ny, k, s * 0.75); ctx.restore(); }
const mhcStuk = (x, y, nx, ny, s) => agMidden(x + nx * s * 0.25, y + ny * s * 0.25, nx, ny, s * 0.75);

// ---------- bacterie (uit film 1): staafje met antigenen rondom, loodrecht op de wand; ast(i) = antistof op antigeen i ----------
const BAG = [[-12, -11, 0, -1], [0, -11, 0, -1], [12, -11, 0, -1], [-6, 11, 0, 1], [6, 11, 0, 1], [18, 11, 0, 1], ...[[15, -0.7], [15, 0.7], [-15, Math.PI - 0.7], [-15, Math.PI + 0.7]].map(([cx, an]) => [cx + Math.cos(an) * 11, Math.sin(an) * 11, Math.cos(an), Math.sin(an)])];
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0, kl = BACT, ag = 1, o = {}) { if (a <= 0.01) return; const { ast = null, vlag = 0 } = o; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (ag > 0.01 && kl === BACT) BAG.forEach(([px, py, nx, ny]) => antigeen(ctx, px, py, nx, ny, 0, 4.6, ag));
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, kl === BACT ? '#B9614D' : rgba(kl, 0.75), lighten(kl, 0.3), 1.5 / s);
  ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.bezierCurveTo(-4, -5, 4, 5, 12, 0); ctx.stroke();
  if (ast) BAG.forEach(([px, py, nx, ny], i) => { const v = ast(i); if (v > 0.01) antistofOp(ctx, px, py, nx, ny, 0, 4.6, 0.2, v, i % 2 ? 1 : -1, { vlag }); });
  ctx.restore(); }

// ---------- fagocyt (uit film 1) ----------
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '', kern = 'lobben' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, 0.08, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  if (kern === 'rond') circ(ctx, x - 0.35 * r, y - 0.25 * r, r * 0.26, rgba(C.kern, 0.6), C.kernR, 1.2); else for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
// lichaamscel met eigen antigenen rondom (loodrecht)
function eigenCel(ctx, x, y, rx, ry, t, o = {}) { const { a = 1, k = 4, s = 13, n = 12, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, rx, ry, 0.04, seed, t); shape(ctx, rgba(EIGEN, 0.25), EIGEN, 2.5); circ(ctx, x, y, Math.min(rx, ry) * 0.36, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < n; i++) { const [px, py, nx, ny] = blobPt(x, y, rx, ry, 0.04, seed, t, i * 6.283 / n + 0.2); antigeen(ctx, px, py, nx, ny, k, s); } ctx.restore(); }
function eigenAg(x, y, rx, ry, t, n, i, seed = 4) { return blobPt(x, y, rx, ry, 0.04, seed, t, i * 6.283 / n + 0.2); }
// lymfeknoop (uit film 1): boonvorm met kapsel, follikels en een uitgaand lymfevat (uitL = lengte van dat vat)
function lymfeknoop(ctx, x, y, rx, ry, a = 1, uitL = 1.9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const boon = (k) => { ctx.beginPath(); ctx.moveTo(x - rx * k, y); ctx.bezierCurveTo(x - rx * k, y - ry * 1.3 * k, x + rx * k, y - ry * 1.3 * k, x + rx * k, y); ctx.bezierCurveTo(x + rx * k, y + ry * 1.25 * k, x + rx * 0.25 * k, y + ry * 1.1 * k, x, y + ry * 0.62 * k); ctx.bezierCurveTo(x - rx * 0.25 * k, y + ry * 1.1 * k, x - rx * k, y + ry * 1.25 * k, x - rx * k, y); ctx.closePath(); };
  ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x, y + ry * 0.7); ctx.bezierCurveTo(x, y + ry * 1.2, x + 40, y + ry * (uitL - 0.4), x + 30, y + ry * uitL); ctx.stroke();
  boon(1); shape(ctx, '#1E2E2A', rgba(C.groen, 0.8), 3); boon(0.86); ctx.strokeStyle = rgba(C.groen, 0.25); ctx.lineWidth = 2; ctx.stroke();
  for (const [fx, fy] of [[-0.62, -0.25], [-0.25, -0.62], [0.2, -0.66], [0.6, -0.3]]) { ctx.beginPath(); ctx.ellipse(x + fx * rx, y + fy * ry, rx * 0.17, ry * 0.2, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.14), null); }
  ctx.restore(); }
function vonk(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const an = i * 0.785 + t; const r0 = 14, r1 = 30 + 6 * Math.sin(t * 4 + i); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); } ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
// pijpbeen in doorsnede met rood beenmerg; geeft het punt terug waar nieuwe B-cellen het merg verlaten
function bot(ctx, x, y, L, ang, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); const w = 92;
  const vormen = () => { const p = []; p.push(() => roundRect(ctx, -L / 2, -w / 2, L, w, w / 2)); for (const sx of [-1, 1]) for (const sy of [-1, 1]) p.push(() => { ctx.beginPath(); ctx.arc(sx * L / 2, sy * 40, 62, 0, 6.283); }); return p; };
  ctx.strokeStyle = '#B9A878'; ctx.lineWidth = 7; vormen().forEach(f => { f(); ctx.stroke(); }); ctx.fillStyle = '#E6D8A8'; vormen().forEach(f => { f(); ctx.fill(); });
  roundRect(ctx, -L / 2 + 30, -w / 2 + 16, L - 60, w - 32, (w - 32) / 2); shape(ctx, rgba(MERG, 0.9), '#8C3E34', 2);
  for (const sx of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.arc(sx * L / 2, 0, 78, 0, 6.283); ctx.clip(); ctx.fillStyle = '#C98A7A'; ctx.fillRect(sx * L / 2 - 90, -90, 180, 180); ctx.fillStyle = '#E6D8A8'; for (let i = 0; i < 14; i++) circ(ctx, sx * L / 2 + (hash(i * 3 + sx) - 0.5) * 120, (hash(i * 7 + sx) - 0.5) * 120, 7 + 6 * hash(i), '#E6D8A8'); ctx.restore(); }
  for (let i = 0; i < 16; i++) circ(ctx, -L / 2 + 50 + hash(i * 5) * (L - 100), (hash(i * 9) - 0.5) * (w - 44), 5, rgba('#F2C0A8', 0.55 + 0.3 * Math.sin(t * 2 + i)));
  ctx.restore(); }

// ---------- woonkamer met Noor en haar broertje (castboek: Noor + het kind) ----------
function kamer(ctx, t, o = {}) { const { sam = 1, noorUit = 'neutraal', samUit = 'bezorgd', bal = 1 } = o;
  ctx.fillStyle = '#3B3552'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#4A4262'; ctx.fillRect(0, 0, W, 90); ctx.fillStyle = '#5A4636'; ctx.fillRect(0, 760, W, H - 760);
  roundRect(ctx, 1240, 150, 380, 300, 10); shape(ctx, '#2A3A58', '#8FA0B5', 4); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1430, 150); ctx.lineTo(1430, 450); ctx.moveTo(1240, 300); ctx.lineTo(1620, 300); ctx.stroke();
  roundRect(ctx, 150, 480, 900, 200, 40); shape(ctx, '#7A5A8C', '#5A4068', 3); roundRect(ctx, 110, 560, 120, 220, 40); shape(ctx, '#86659A', '#5A4068', 3); roundRect(ctx, 970, 560, 120, 220, 40); shape(ctx, '#86659A', '#5A4068', 3); roundRect(ctx, 200, 640, 820, 110, 30); shape(ctx, '#8E6CA2', '#5A4068', 3);
  ctx.fillStyle = rgba('#000000', 0.18); ctx.beginPath(); ctx.ellipse(560, 905, 360, 18, 0, 0, 6.283); ctx.fill();
  persoon(ctx, 'noor', 420, 900, 480, { uit: noorUit, pose: bal > 0.5 ? 'vasthouden' : 'staan', t, hold: bal > 0.5 ? (c, hx, hy) => { circ(c, hx + 6, hy + 26, 34, '#E07A5F', '#F2C0A8', 3); c.strokeStyle = '#F2F2EE'; c.lineWidth = 4; c.beginPath(); c.arc(hx + 6, hy + 26, 34, -0.6, 0.9); c.stroke(); } : null });
  if (sam > 0.01) { const P = persoon(ctx, 'kind', 760, 900, 300, { uit: samUit, t, a: sam, kijk: -1 });
    // waterpokken: rode vlekjes op gezicht, handen en onderbenen (niet op de kleding)
    ctx.save(); ctx.globalAlpha *= sam; const hh = 300 / 5.3, hd = P.hoofd;
    for (let i = 0; i < 9; i++) { const an = hash(i * 7) * 6.283, d = Math.sqrt(hash(i * 3)) * 0.62; circ(ctx, hd.x + Math.cos(an) * hd.r * d * 0.9, hd.y + hd.r * 0.15 + Math.sin(an) * hd.r * d * 0.75, 3.6, '#D8403A'); }
    for (const hnd of [P.handR, P.handL]) if (hnd) for (let i = 0; i < 2; i++) circ(ctx, hnd.x + (hash(i * 13 + hnd.x) - 0.5) * 14, hnd.y + (hash(i * 17) - 0.5) * 10, 3.4, '#D8403A');
    const heupY = 900 - 300 + hh * 3.45, kn = heupY + (900 - heupY) * 0.42; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) circ(ctx, 760 + s * hh * 1.32 * 0.24 + s * hh * 0.04 + (hash(i * 5 + s) - 0.5) * 8, kn + hh * 0.2 + i * hh * 0.3, 3.4, '#D8403A');
    ctx.restore(); } }

// ---------- grafiek primaire en secundaire reactie ----------
const GX = 300, GY = 210, GW = 1080, GH = 470;
function antiCurve(s) { if (s < 6) { if (s < 0.3) return 0; const g = Math.exp(-Math.pow((s - 2.1) / (s < 2.1 ? 0.75 : 0.9), 2)); return s < 2.1 ? 8 * g : 2 + 6 * g; } const sec = s < 6.9 ? 100 * Math.exp(-Math.pow((s - 6.9) / 0.38, 2)) : 10 + 90 * Math.exp(-(s - 6.9) * 0.5); return Math.max(2, sec); }
function afweerGrafiek(ctx, u, t, o = {}) { const { ziek = 0, tweede = 0, vraag = 0, prim = 0, sec = 0 } = o;
  if (ziek > 0.01) { ctx.save(); ctx.globalAlpha *= ziek; ctx.fillStyle = rgba(C.koraal, 0.14); const x0 = GX + 0.2 / 10 * GW, x1 = GX + 2.6 / 10 * GW; ctx.fillRect(x0, GY, x1 - x0, GH); regel(ctx, 'ziek', (x0 + x1) / 2, GY + 100, 1, C.koraal, 30, 'center', 700); ctx.restore(); }
  grafiek(ctx, GX, GY, GW, GH, { xmax: 10, ymax: 110, f: antiCurve, u, xticks: [0, 1, 2, 6, 7, 8], xfmt: v => v < 6 ? v + ' wk' : '+' + (v - 6) + ' wk', yticks: [], xlab: 'tijd', ylab: 'hoeveelheid antistoffen', col: AS });
  ctx.save(); ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 3; const bx = GX + 4.3 / 10 * GW; for (const d of [-8, 8]) { ctx.beginPath(); ctx.moveTo(bx + d - 8, GY + GH + 14); ctx.lineTo(bx + d + 8, GY + GH - 14); ctx.stroke(); } ctx.restore();
  regel(ctx, 'maanden of jaren later', bx, GY + GH + 90, 1, C.text2, 24, 'center');
  const vx = GX + 0.02 * GW; ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, GY + 30); ctx.lineTo(vx, GY + GH); ctx.stroke(); ctx.restore(); regel(ctx, '1e besmetting', vx + 12, GY + 40, 1, C.text2, 24, 'left');
  if (tweede > 0.01) { const x6 = GX + 6 / 10 * GW; ctx.save(); ctx.globalAlpha *= tweede; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x6, GY + 30); ctx.lineTo(x6, GY + GH); ctx.stroke(); ctx.setLineDash([]); regel(ctx, '2e besmetting', x6 - 12, GY + 40, 1, C.koraal, 24, 'right'); ctx.restore(); }
  naamBij(ctx, 'primaire afweerreactie', 'traag · laag', GX + 2.1 / 10 * GW, GY + GH - 8 / 110 * GH - 70, prim, 'center', AS);
  naamBij(ctx, 'secundaire afweerreactie', 'snel · veel hoger', GX + 7.2 / 10 * GW, GY + 60, sec, 'left', AS);
  vraagteken(ctx, GX + 7 / 10 * GW, GY + 260, vraag, 130);
}

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1500, cy = 470;
    bCel(ctx, cx, cy, 130, 3, t, { soort: 'plasma' });
    for (let i = 0; i < 9; i++) { const u = (t * 0.12 + i / 9) % 1; const an = -0.9 + (i % 5) * 0.45; antistof(ctx, cx + Math.cos(an) * (170 + u * 280), cy + Math.sin(an) * (170 + u * 280), 0.55, an + 1.571 + t * 0.2, Math.min(1, (1 - u) * 3)); }
    virus(ctx, cx - 330, cy + 230, 60, [3], t, { rot: 0.2 + t * 0.03, ast: i => i % 2 ? 1 : 0 }); },

  s01(ctx, t, q) { kamer(ctx, t, { noorUit: q.on('Hoe', 2) > 0.5 ? 'denkt' : q.on('speelt', 1) > 0.5 ? 'blij' : 'neutraal' });
    tag(ctx, 'Bram: waterpokken', 760, 500, C.koraal, q.on('vlekjes', 1) * (1 - q.on('Hoe', 2)));
    wissel(ctx, q, [['Noor had het al, toen ze klein was', 'klein', 1, BCOL], ['nu: niet ziek', 'niet', 1, C.groen]], 1430, 600);
    vraagteken(ctx, 420, 250, q.on('Hoe', 2), 140); },

  s04(ctx, t, q) { bg(ctx, 'micro');
    const pB = q.on('Weet', 1), pC = q.on('lymfocyten', 1); const pA = 1 - pB;
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA;
      fagocyt(ctx, 520, 440, 140, t, { arm: 0.5 + 0.2 * Math.sin(t), tx: 760, ty: 400, kern: 'lobben' }); bacterie(ctx, 760, 390, 1.6, 0.3); bacterie(ctx, 720, 590, 1.3, -0.6);
      regel(ctx, 'aspecifieke afweer', 520, 720, 1, WIT, 34, 'center', 700); regel(ctx, 'snel · niet precies · geen geheugen', 520, 770, q.on('snel', 1), C.text2, 28, 'center');
      ctx.save(); ctx.globalAlpha *= q.on('specifieke', 2); const sl = bSlot(1340, 450, 100, 2, t, 0, 30); const vd = virusDock(sl, 45, sl.c); const fit = ramp(t, q.at('specifieke', 2) + 0.4, 1.4);
      bCel(ctx, 1340, 450, 100, 2, t, { rot: 0, rs: 30, glow: fit > 0.95 ? 0.6 : 0 }); virus(ctx, vd.x + (1 - fit) * 260, vd.y - (1 - fit) * 120, 45, [2], t, { rot: vd.rot, ag: sl.c });
      regel(ctx, 'specifieke afweer', 1400, 720, 1, BCOL, 34, 'center', 700); regel(ctx, 'herkent precies', 1400, 770, 1, C.text2, 28, 'center'); ctx.restore();
      ctx.restore(); }
    if (pB * (1 - pC) > 0.01) { ctx.save(); ctx.globalAlpha *= pB * (1 - pC);
      virus(ctx, 620, 450, 140, [0, 3], t, { rot: t * 0.05 }); regel(ctx, 'virus', 620, 790, 1, VIR, 32, 'center', 700);
      naamBij(ctx, 'antigeen', 'vormpje, meestal een stukje eiwit', 620, 150, q.on('antigeen', 1), 'center', VORMKL[3]);
      const ei = q.on('eigen', 1); eigenCel(ctx, 1420, 470, 190, 170, t, { a: ei, k: 4, s: 15, n: 14 }); regel(ctx, 'eigen cel: eigen antigenen', 1420, 740, ei, EIGEN, 30, 'center', 700);
      tag(ctx, 'je afweer reageert alleen op vreemde antigenen', 960, 860, VIR, q.on('vreemd', 1));
      ctx.restore(); }
    if (pC > 0.01) { ctx.save(); ctx.globalAlpha *= pC;
      const one = 1 - q.on('Elke', 2);
      ctx.save(); ctx.globalAlpha *= one; const rc = q.on('receptoren', 1);
      bCel(ctx, 620, 450, 150, 0, t, { rot: 0, rs: 42, rec: rc, label: 'B-cel', glow: 0 });
      naamBij(ctx, 'receptor', 'eiwit dat op één vormpje past', 780, 210, rc, 'left', BCOL);
      const sl = bSlot(620, 450, 150, 2, t, 0, 42); const vd = virusDock(sl, 80, sl.c); const fit = ramp(t, q.at('sleutel'), 1.6);
      virus(ctx, lerp(1650, vd.x, fit), lerp(560, vd.y, fit), 80, [0], t, { rot: vd.rot, ag: sl.c, a: q.on('sleutel', 1) });
      vonk(ctx, sl.cx, sl.cy, q.on('slot', 1) * (1 - q.on('Elke', 2)), t);
      regel(ctx, 'past: sleutel ↔ slot', 1300, 760, q.on('slot', 1), C.goud, 32, 'center', 700);
      tag(ctx, 'lymfocyten: witte bloedcellen van de specifieke afweer', 960, 860, BCOL, 1 - rc); ctx.restore();
      const row = q.on('Elke', 2); ctx.save(); ctx.globalAlpha *= row; for (let i = 0; i < 6; i++) bCel(ctx, 260 + i * 280, 450, 80, i, t, { seed: i, rs: 26 }); tag(ctx, 'elke B-cel heeft zijn eigen sleutel', 960, 800, BCOL); ctx.restore();
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'micro'); virus(ctx, 1500, 380, 90, [3], t, { rot: t * 0.05 }); regel(ctx, 'waterpokkenvirus: nooit gezien', 1500, 640, 1, VIR, 30, 'center', 700);
    for (let i = 0; i < 4; i++) bCel(ctx, 230 + i * 250, 500, 76, [0, 1, 4, 5][i], t, { seed: i, rs: 24 }); vraagteken(ctx, 1180, 420, q.on('Hoe', 1), 130); },

  s07(ctx, t, q) { bg(ctx, 'micro');
    const geen = 1 - q.on('beenmerg', 1); if (geen > 0.01) { ctx.save(); ctx.globalAlpha *= geen;
      const sl = bSlot(640, 440, 130, 2, t, 0, 38); const vd = virusDock(sl, 80, sl.c); const ph = ((Math.max(0, t - 2.5)) % 2.6) / 2.6, dx = 70 + (1 - bump(ph)) * 260;
      bCel(ctx, 640, 440, 130, 0, t, { rot: 0, rs: 38 }); virus(ctx, vd.x + dx, vd.y, 80, [3], t, { rot: vd.rot, ag: sl.c * 1.05 });
      kruis(ctx, sl.cx + 45, sl.cy - 70, 26, q.on('veranderen', 1)); tag(ctx, 'een B-cel kan zijn sleutel niet veranderen', 960, 800, C.koraal, q.on('B-cel', 2)); ctx.restore(); }
    const bm = q.on('beenmerg', 1); if (bm > 0.01) { ctx.save(); ctx.globalAlpha *= bm;
      bot(ctx, 300, 470, 380, -1.25, t); naamBij(ctx, 'beenmerg', 'maakt steeds nieuwe B-cellen', 300, 790, 1, '#E89A8A', 'center');
      const sel = q.on('passende', 1), meer = q.on('verschillende', 1); const ks = meer > 0.01 ? [3, 1] : [3]; const VX = 1620, VY = 470, VR = 85, AG = 8; const n = virusN([3, 1]);
      virus(ctx, VX, VY, VR, ks, t, { rot: Math.PI, ag: AG, n });
      const stroom = (i, tt) => { const u = (tt * 0.055 + i / 12) % 1; return [lerp(380, 1450, u), 470 + (hash(i * 3) - 0.5) * 520 + 30 * Math.sin(tt * 0.8 + i), u]; };
      const t0 = q.at('passende'), t1 = q.at('verschillende');
      for (let i = 0; i < 12; i++) { const k = [0, 2, 5, 3, 6, 4, 1, 0, 1, 5, 2, 6][i]; const isHit = i === 3, isTwo = i === 8;
        let [x, y, u] = stroom(i, t); let aa = Math.min(1, u * 6, (1 - u) * 6), gl = 0, rot = 0.3;
        if ((isHit && t > t0) || (isTwo && t > t1)) { const tt = isHit ? t0 : t1, sp = stroom(i, tt), A = virusAg(VX, VY, VR, n, Math.PI, isHit ? 0 : 3), d = bDock(A, AG, 50, i, t, 16), m = ramp(t, tt, 1.6); x = lerp(sp[0], d.x, m); y = lerp(sp[1], d.y, m); rot = d.rot; aa = Math.max(aa, m); gl = m; if (m < 1) { rot = lerp(0.3, d.rot, m); } }
        else aa *= 1 - 0.6 * sel;
        bCel(ctx, x, y, 50, k, t, { seed: i, a: aa, rot, rs: 16, glow: gl }); }
      wissel(ctx, q, [['miljoenen soorten, al vóór de besmetting', 'miljoenen', 1, BCOL], ['niet op maat gemaakt, maar gekozen', 'maatwerk', 1, C.goud], ['veel antigenen per virus: er passen er een paar', 'omdat', 1, C.goud]], 960, 860);
      ctx.restore(); }
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const segs = [['V', 8, '#5BA4C9'], ['D', 4, '#8C7BBF'], ['J', 5, '#7FC48F']]; const pick = [3, 1, 2];
    const mix = ramp(t, q.at('genstukjes'), 2.5), plak = q.on('onnauwkeurig', 1), ei = q.on('stoffen', 1);
    regel(ctx, 'genstukjes in het DNA', 200, 230, 1, C.text2, 28);
    const tx = 640, ty = 500; let x = 200;
    segs.forEach(([n, cnt, col], si) => { for (let i = 0; i < cnt; i++) { const bx = x + i * 60; const chosen = i === pick[si];
        const m = chosen ? ramp(t, q.at('genstukjes') + si * 0.5, 1.5) : 0; const doel = tx + si * (100 + 6 * plak) + (si ? 8 * plak * Math.sin(si * 2) : 0);
        const px = lerp(bx, doel, m), py = lerp(270, ty, m), w = lerp(50, 100, m), h = lerp(60, 70, m); const a = chosen ? 1 : 1 - 0.65 * mix;
        ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, px, py, w, h, 8); shape(ctx, rgba(col, chosen ? 0.6 : 0.45), col, 2); text(ctx, n + (i + 1), px + w / 2, py + h * 0.66, fTekst(lerp(24, 28, m), 700), C.text, 'center'); ctx.restore();
        if (chosen && m > 0.01) { ctx.save(); ctx.globalAlpha *= 0.35 * (1 - m * 0.6); roundRect(ctx, bx, 270, 50, 60, 8); ctx.strokeStyle = col; ctx.setLineDash([5, 5]); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
      x += cnt * 60 + 50; });
    if (plak > 0.01) for (const jx of [tx + 100, tx + 206]) circ(ctx, jx + 3, ty + 35, 7, rgba(C.goud, plak), null);
    const kl = ramp(t, q.at('gecombineerd'), 1.2); arrow(ctx, 1000, 535, 1180, 535, C.line, kl, 3); bCel(ctx, 1380, 535, 92, 6, t, { a: kl, rs: 28, rec: ramp(t, q.at('gecombineerd') + 0.5, 1.5) });
    wissel(ctx, q, [['willekeurig gecombineerd', 'willekeurige', 1, C.goud], ['en onnauwkeurig aan elkaar geplakt', 'onnauwkeurig', 1, C.goud], ['> 1 miljard verschillende receptoren', 'miljard', 1, BCOL], ['', 'stoffen', 1, BCOL]], 760, 690);
    if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; ctx.fillStyle = rgba(C.bgSchema, 0.94); ctx.fillRect(0, 380, W, 520);
      const EX = 1180, EY = 620, n = 12; eigenCel(ctx, EX, EY, 120, 110, t, { k: 4, s: 12, n }); regel(ctx, 'eigen cel', EX, 830, 1, EIGEN, 28, 'center', 700);
      const A = eigenAg(EX, EY, 120, 110, t, n, 6); const d = bDock(A, 12, 80, 4, t, 24); const m = ramp(t, q.at('stoffen'), 1.4), dood = q.on('beenmerg', 1);
      bCel(ctx, lerp(560, d.x, m), lerp(620, d.y, m), 80 * (1 - 0.35 * dood), 4, t, { rot: lerp(0.3, d.rot, m), rs: 24 * (1 - 0.35 * dood), seed: 4, a: 1 - 0.55 * dood, glow: m * (1 - dood) * 0.5 });
      kruis(ctx, lerp(560, d.x, m), lerp(620, d.y, m), 70, dood); tag(ctx, 'past op eigen stoffen → uitgeschakeld', 960, 450, C.koraal, dood); ctx.restore(); }
  },

  s09(ctx, t, q) { bg(ctx, 'micro');
    const dik = q.on('dik', 1), cx = 1060, cy = 470; const rx = 470 + 45 * dik, ry = 280 + 26 * dik;
    // aanvoerend lymfevat met virussen
    const ix = cx - rx * 0.86, iy = cy - ry * 0.62; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = rgba(LYMF, 0.35); ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(40, 230); ctx.quadraticCurveTo(360, 200, ix, iy); ctx.stroke(); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 36; ctx.stroke(); ctx.restore();
    lymfeknoop(ctx, cx, cy, rx, ry, 1, 1.4); naamBij(ctx, 'lymfeknoop', '', cx + rx * 0.62, cy - ry * 1.08, 1, 'left', LYMF); naamBij(ctx, 'lymfevat', '', 70, 180, q.on('lymfevaten', 1), 'left', LYMF);
    const deel = ramp(t, q.at('delen'), 6), gen = deel * 4, fo = ramp(t, q.at('delen'), 1.2), pas = q.on('passen', 1), th = q.on('T-helpercel', 1), st = q.on('startsein', 1);
    // de passende B-cel (vorm 3) in het midden; andere B-cellen eromheen
    const MX = 1020, MY = 420, MR = 46, MRS = 16; const sl = bSlot(MX, MY, MR, 7, t, Math.PI * 0.85, MRS); const vd = virusDock(sl, 26, sl.c);
    const anders = [[760, 330, 0], [880, 250, 1], [1160, 250, 5], [1290, 340, 2], [840, 520, 6], [1210, 520, 4], [1350, 470, 0], [700, 450, 5], [1100, 600, 1]];
    if (fo < 0.99) anders.forEach(([x, y, k], i) => { const w = wander(i, t, 6, 0.4); bCel(ctx, x + w.x, y + w.y, 42, k, t, { seed: i, rs: 14, a: (1 - 0.5 * pas) * (1 - fo) }); });
    // virussen komen via het lymfevat binnen; één meert aan bij de passende B-cel
    const inV = ramp(t, q.at('lymfevaten'), 3.2);
    for (let i = 0; i < 3; i++) { const v = clamp(inV * 1.4 - i * 0.2, 0, 1); if (v <= 0) continue; const pth = u => { const a1 = 1 - u; return [a1 * a1 * 40 + 2 * a1 * u * 360 + u * u * ix, a1 * a1 * 230 + 2 * a1 * u * 200 + u * u * iy]; };
      let x, y, rot = t * 0.1 + i; if (i === 0) { const m = ramp(t, q.at('tegen'), 1.4); const [px, py] = pth(Math.min(1, v)); x = lerp(px, vd.x, m); y = lerp(py, vd.y, m); rot = m > 0.01 ? lerp(rot, vd.rot, m) : rot; if (m >= 1) rot = vd.rot; }
      else { const [px, py] = pth(Math.min(1, v)); x = v < 1 ? px : ix + 60 + i * 50; y = v < 1 ? py : iy + 40 + i * 40; }
      virus(ctx, x, y, 26, [3], t, { rot, ag: sl.c, a: 1 - fo }); }
    // T-helpercel komt erbij en geeft het startsein
    if (th > 0.01) { const tx0 = lerp(1500, MX + 92, th), ty0 = lerp(700, MY + 78, th); tCel(ctx, tx0, ty0, 40, t, { a: 1 - fo, k: 3, rot: Math.PI * 1.2, glow: st * (1 - fo), rs: 12 }); vonk(ctx, MX + 48, MY + 42, st * (1 - fo), t); }
    // klonale deling: de cel deelt zich steeds opnieuw (16 cellen)
    const fin = []; for (const [row, cnt] of [[0, 5], [1, 6], [2, 5]]) for (let c = 0; c < cnt; c++) fin.push([cx - (cnt - 1) * 46 + c * 92 - 40, 330 + row * 92]);
    fin.sort((p, r2) => Math.atan2(p[1] - 422, p[0] - 1020) - Math.atan2(r2[1] - 422, r2[0] - 1020));
    const posG = (g, i) => { const m = 1 << (4 - g); let sx = 0, sy = 0; for (let j = i * m; j < (i + 1) * m; j++) { sx += fin[j][0]; sy += fin[j][1]; } return g === 0 ? [MX, MY] : [sx / m, sy / m]; };
    if (deel <= 0.001) bCel(ctx, MX, MY, MR, 3, t, { seed: 7, rot: Math.PI * 0.85, rs: MRS, glow: pas });
    else { const g = Math.min(3, Math.floor(gen)), f = ease(clamp((gen - g) * 1.25, 0, 1)), nC = 1 << g;
      for (let i = 0; i < nC; i++) { const p0 = posG(g, i); for (const d of [0, 1]) { const p1 = posG(g + 1, 2 * i + d); const x = lerp(p0[0], p1[0], f), y = lerp(p0[1], p1[1], f); const rr = lerp(MR * 0.85, 34, (g + f) / 4); bCel(ctx, x, y, rr, 3, t, { seed: (2 * i + d) % 9, rs: rr * 0.32, glow: 0.35, rot: 0.3 + i }); } } }
    wissel(ctx, q, [['lymfeknopen worden vaak dik', 'dik', 1, LYMF], ['T-helpercel geeft het startsein', 'startsein', 1, TCOL], ['een kloon: allemaal dezelfde cellen', 'kloon', 1, BCOL], ['klonale selectie: kiezen, en vermenigvuldigen', 'klonale', 1, C.goud]], 960, 860);
  },
  s10(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('Plakken', 1), p3 = q.on('armen', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const px = 420, py = 470;
      bCel(ctx, px, py, 150, 3, t, { soort: 'plasma', label: 'plasmacel' });
      const sp = q.on('maken', 1), rate = q.on('tweeduizend', 1); const N = 10 + Math.round(16 * rate); const dimA = 1 - 0.8 * q.on('kopie', 1) * (1 - q.on('tweeduizend', 1));
      for (let i = 0; i < N; i++) { const u = (t * (0.11 + 0.14 * rate) + i / N) % 1; const an = -1.1 + hash(i * 3) * 2.2; antistof(ctx, px + Math.cos(an) * (175 + u * 650), py + Math.sin(an) * (175 + u * 400), 0.36, an + 1.571 + Math.sin(t * 0.8 + i) * 0.6, sp * Math.min(1, u * 8, (1 - u) * 3) * dimA); }
      const ko = q.on('kopie', 1) * (1 - q.on('letter', 1)); if (ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; ctx.fillStyle = rgba(C.bgMicro, 0.8); ctx.fillRect(960, 300, 760, 400);
        ctx.save(); ctx.beginPath(); ctx.arc(1180, 900, 340, -2.0, -1.14); ctx.lineTo(1180, 900); ctx.closePath(); ctx.fillStyle = rgba(BCOL, 0.22); ctx.fill(); ctx.restore(); ctx.strokeStyle = BCOL; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(1180, 900, 340, -2.0, -1.14); ctx.stroke();
        antistof(ctx, 1180, 495, 1.3, 0, 1, BCOL, 3); regel(ctx, 'receptor (vast op de B-cel)', 1180, 650, 1, BCOL, 28, 'center', 700); text(ctx, '=', 1350, 480, fTitel(70), C.text, 'center');
        const los = 6 * Math.sin(t * 1.3); antistof(ctx, 1530, 470 + los, 1.3, 0.08 * Math.sin(t), 1, AS, 3); regel(ctx, 'antistof (losse kopie)', 1530, 650, 1, AS, 28, 'center', 700);
        const pas = q.on('antigeen', 1); for (const sx of [-1, 1]) { const cxx = 1530 + sx * (32 + 0.606 * 15) * 1.3, cyy = 470 + los + (-42 - 0.795 * 15) * 1.3; ctx.save(); ctx.globalAlpha *= pas; ctx.translate(cxx, cyy - 60 * (1 - pas)); ctx.rotate(Math.atan2(0.795, -sx * 0.606) + 1.571); vormPad(ctx, 3, 11 * 1.3); ctx.fillStyle = VORMKL[3]; ctx.fill(); ctx.restore(); }
        ctx.restore(); }
      const y = q.on('letter', 1); if (y > 0.01) { ctx.save(); ctx.globalAlpha *= y; ctx.fillStyle = rgba(C.bgMicro, 0.8); ctx.fillRect(1000, 220, 720, 520); antistof(ctx, 1350, 540, 2.6, 0, 1, AS, 3);
        const bp = q.on('bindplaats', 1); naamBij(ctx, 'bindplaats', 'past op één antigeen', 1350 - 150, 330, bp, 'right', AS); naamBij(ctx, 'bindplaats', '', 1350 + 150, 330, bp, 'left', AS); ctx.restore(); }
      ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3);
      blob(ctx, 1520, 470, 230, 210, 0.04, 4, t); shape(ctx, rgba(EIGEN, 0.2), EIGEN, 2.5); circ(ctx, 1520, 470, 80, rgba(C.kern, 0.6), C.kernR, 1.2); regel(ctx, 'lichaamscel', 1520, 760, 1, EIGEN, 28, 'center', 700);
      for (let i = 0; i < 7; i++) { const [bx, by, nx, ny] = blobPt(1520, 470, 230, 210, 0.04, 4, t, Math.PI - 0.9 + i * 0.3); ctx.strokeStyle = EIGEN; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + nx * 14, by + ny * 14); ctx.stroke(); slot(ctx, bx + nx * 26, by + ny * 26, -nx, -ny, 3, 9, EIGEN, 3); }
      const cov = ramp(t, q.at('Plakken'), 2.4), nV = virusN([3]); const poging = bump(ramp(t, q.at('vastgrijpen') - 0.6, 2.4));
      virus(ctx, 760 + 300 * poging, 470, 110, [3], t, { rot: 0.15, ast: i => clamp(cov * nV - i, 0, 1), vliegin: 220 });
      kruis(ctx, 1200, 470, 38, q.on('vastgrijpen', 1) * poging);
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const kl = ramp(t, q.at('armen'), 3); const R = 50, AG = 8.5, n = virusN([3]);
      const pos = [[760, 370], [950, 320], [850, 540], [1050, 500], [1180, 340], [980, 690], [1220, 610]]; const far = [[400, 200], [1000, 120], [500, 720], [1550, 600], [1500, 200], [800, 840], [1650, 420]];
      const rots = pos.map((p, i) => i * 0.7); const P = pos.map((p, i) => [lerp(far[i][0], p[0], kl), lerp(far[i][1], p[1], kl)]);
      P.forEach(([x, y], i) => virus(ctx, x, y, R, [3], t, { rot: rots[i], ag: AG }));
      const near = (i, j) => { const an = Math.atan2(P[j][1] - P[i][1], P[j][0] - P[i][0]); const st = 6.283 / n; const idx = Math.round((an - rots[i]) / st); return virusAg(P[i][0], P[i][1], R, n, rots[i], idx); };
      const br = clamp((kl - 0.8) / 0.2, 0, 1); [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]].forEach(([i, j], m) => { if (Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1]) > 270) return; antistofBrug(ctx, near(i, j), near(j, i), 3, AG, 0.45, br, m % 2 ? 1 : -1); });
      ctx.restore(); }
    wissel(ctx, q, [['± 2000 antistoffen per seconde', 'tweeduizend', 1, AS], ['via bloed en weefselvocht overal heen', 'heen', 1, C.teal], ['humorale afweer', 'humorale', 1, AS], ['', 'Plakken', 1, AS], ['neutraliseren: het virus kan je cellen niet meer in', 'vastgrijpen', 1, AS], ['twee armen → ziekteverwekkers klonteren samen', 'klonteren', 1, AS]], 960, 860);
  },
  s11(ctx, t, q) { bg(ctx, 'micro'); bacterie(ctx, 900, 470, 3.2, 0, 1, 0, BACT, 1, { ast: i => i % 3 === 1 ? 0 : 1 }); vraagteken(ctx, 1400, 420, q.on('Wat', 1), 130); },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const t0 = q.at('opruimen'); const nadert = ramp(t, t0 - 0.3, 1.5), eat = ramp(t, t0 + 0.8, 1.3), inn = ramp(t, t0 + 1.8, 1.2), kap = ramp(t, t0 + 2.7, 1.6);
    const fx = lerp(1700, 1150, nadert), fy = 470; const bx = lerp(820, fx - 40, inn), by = lerp(450, fy, inn);
    const vlag = q.on('vlaggetje', 1) * (1 - inn) * (0.65 + 0.35 * Math.sin(t * 4));
    fagocyt(ctx, fx, fy, 170, t, { a: q.on('opruimen', 1), arm: eat * (1 - inn), tx: bx, ty: by, label: 'fagocyt', kern: 'lobben' });
    if (inn > 0.01) { ctx.save(); ctx.globalAlpha *= inn * (1 - kap); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(bx, by, 110, 70, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
    bacterie(ctx, bx, by, lerp(2.8, 1.6, inn), lerp(0, 0.4, inn), 1 - kap, kap, BACT, 1, { ast: () => 1, vlag });
    for (let i = 0; i < 3; i++) { const an = i * 2.1 + 0.5, rr = lerp(140, 70, kap); circ(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr * 0.7, 14, rgba(C.lyso, 0.7 * ramp(t, t0 + 2.4, 0.8) * (1 - kap * 0.5)), C.lyso, 1.5); }
    wissel(ctx, q, [['antistoffen doden zelf niets', 'doden', 1, C.koraal], ['ze markeren: hier zit iets vreemds', 'vlaggetje', 1, AS], ['fagocyten ruimen op', 'opruimen', 1, WIT]], 960, 860);
  },
  s14(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('stukjes', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const cx = 820, cy = 560, k = q.on('eiwitketens', 1), cv = q.on('constante', 1), va = q.on('variabele', 1), bp = q.on('bindplaatsen', 1);
      const HZ = '#C9963A', LI = '#F0D78C', VAR = '#5BA4C9';
      ctx.lineCap = 'round';
      const arm = (sx, col, lw, off) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(cx + off * sx, cy + 230); ctx.lineTo(cx + off * sx, cy); ctx.lineTo(cx + sx * (170 + off), cy - 220); ctx.stroke(); };
      for (const sx of [-1, 1]) { arm(sx, sx < 0 ? HZ : lighten(HZ, 0.12), 30, 18); ctx.strokeStyle = LI; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(cx + sx * 95, cy - 40); ctx.lineTo(cx + sx * 225, cy - 210); ctx.stroke();
        if (va > 0.01) { ctx.save(); ctx.globalAlpha *= va; ctx.strokeStyle = VAR; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(cx + sx * 160, cy - 165); ctx.lineTo(cx + sx * 215, cy - 235); ctx.stroke(); ctx.restore(); }
        if (bp > 0.01) { ctx.save(); ctx.globalAlpha *= bp; ctx.translate(cx + sx * (232 + 30 * (1 - bp)), cy - 262 - 40 * (1 - bp)); ctx.rotate(Math.atan2(70, sx * -55) - 1.571); vormPad(ctx, 3, 18); ctx.fillStyle = VORMKL[3]; ctx.fill(); ctx.restore(); } }
      naamBij(ctx, 'zware keten', '× 2', cx + 70, cy + 150, k, 'left', HZ); naamBij(ctx, 'lichte keten', '× 2', cx + 270, cy - 110, ramp(t, q.at('lichte'), 1), 'left', LI);
      if (cv > 0.01) { ctx.save(); ctx.globalAlpha *= cv * 0.6; ctx.strokeStyle = lighten(HZ, 0.5); ctx.lineWidth = 10; ctx.lineCap = 'round'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + 18 * sx, cy + 225); ctx.lineTo(cx + 18 * sx, cy); ctx.lineTo(cx + sx * (18 + 120), cy - 157); ctx.stroke(); } ctx.restore(); }
      naamBij(ctx, 'constant deel', 'gelijk binnen één klasse', cx - 60, cy + 130, cv, 'right', C.text2);
      naamBij(ctx, 'variabel deel', 'bindplaatsen · per kloon anders', cx - 280, cy - 215, va, 'right', VAR);
      regel(ctx, 'immunoglobuline', cx, 180, q.on('immunoglobuline', 1), AS, 34, 'center', 700);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const bx = 700, by = 470, BR = 150, seed = 2;
      bCel(ctx, bx, by, BR, 3, t, { label: 'B-cel', rot: Math.PI * 0.75, n: 4, rs: 34, seed });
      const pc = []; for (let i = 0; i < 3; i++) { const an = -0.45 + i * 0.45; const [px, py, nx, ny] = blobPt(bx, by, BR, BR * 0.95, 0.04, seed, t, an); const u = ramp(t, q.at('stukjes') + i * 0.35, 1); mhc(ctx, px - nx * 20 * (1 - u), py - ny * 20 * (1 - u), nx, ny, 3, 14, u); pc.push([px, py, nx, ny]); }
      naamBij(ctx, 'stukje antigeen', 'op het oppervlak', 900, 250, q.on('oppervlak', 1), 'left', VORMKL[3]);
      const [px, py, nx, ny] = pc[1]; const [scx, scy] = mhcStuk(px, py, nx, ny, 14); const d = tDock(scx, scy, nx, ny, 14 * 0.75, 100, 5, t, 14 * 0.75 / 0.45); const th = q.on('T-helpercel', 1), st = q.on('startsein', 1);
      tCel(ctx, lerp(1650, d.x, th), lerp(560, d.y, th), 100, t, { a: th, label: 'T-helpercel', k: 3, rot: d.rot, rs: d.rs, glow: st });
      vonk(ctx, scx + 30, scy - 70, st, t);
      ctx.save(); ctx.globalAlpha *= st * 0.5; const g = ctx.createRadialGradient(bx, by, BR * 0.6, bx, by, BR * 1.6); g.addColorStop(0, rgba(AS, 0.4)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, BR * 1.6, 0, 6.283); ctx.fill(); ctx.restore();
      wissel(ctx, q, [['T-helpercel past → startsein voor de B-cel', 'startsein', 1, TCOL], ['meer in film 3', 'Daarover', 1, TCOL]], 960, 860);
      ctx.restore(); }
  },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const gr = q.on('Kijk', 1);
    if (1 - gr > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - gr; const pl = q.on('plasmacellen', 1), gh = q.on('geheugencel', 1);
      for (let i = 0; i < 8; i++) { const x = 400 + i * 160, y = 450, isG = i >= 5, m = isG ? gh : pl;
        bCel(ctx, x, y, 52, 3, t, { seed: i, a: 1 - m, rs: 15 }); bCel(ctx, x, y, 52, 3, t, { seed: i, a: m, soort: isG ? 'geheugen' : 'plasma', rs: 15 });
        if (!isG && pl > 0.01) for (let j = 0; j < 3; j++) { const u = (t * 0.35 + j / 3 + i * 0.17) % 1, an = -1.571 + (hash(i * 5 + j) - 0.5) * 1.4; antistof(ctx, x + Math.cos(an) * (65 + u * 140), y + Math.sin(an) * (65 + u * 140), 0.28, an + 1.571 + t * 0.5 + j, pl * Math.min(1, u * 6, (1 - u) * 3)); } }
      regel(ctx, 'plasmacellen', 720, 600, pl, BCOL, 30, 'center', 700); regel(ctx, 'maken antistoffen', 720, 640, pl, C.text2, 24, 'center'); regel(ctx, 'geheugencellen ★', 1360, 600, gh, C.goud, 30, 'center', 700);
      tag(ctx, 'blijven jaren, soms je hele leven', 960, 760, C.goud, q.on('jaren', 1)); ctx.restore(); }
    if (gr > 0.01) { ctx.save(); ctx.globalAlpha *= gr; const u = 0.32 * ramp(t, q.at('eerste', 1), 9);
      afweerGrafiek(ctx, u, t, { ziek: q.on('Ondertussen', 1), tweede: q.on('opnieuw', 1), vraag: q.on('Hoe', 2), prim: q.on('primaire', 1) });
      wissel(ctx, q, [['pas na ± een week antistoffen', 'week', 1, AS], ['', 'Ondertussen', 1, AS]], 960, 130);
      ctx.restore(); }
  },
  s17(ctx, t, q) { bg(ctx, 'schema');
    const tab = q.on('afweren', 1);
    if (1 - tab > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - tab; const u = 0.32 + 0.68 * ramp(t, q.at('delen'), 6);
      afweerGrafiek(ctx, u, t, { ziek: 1, tweede: 1, prim: 1, sec: q.on('secundaire', 1) });
      wissel(ctx, q, [['geheugencellen ruimen niet zelf op', 'Misschien', 1, C.koraal], ['ze delen en worden plasmacellen', 'delen', 1, BCOL], ['immuun: het virus komt binnen, maar je wordt niet ziek', 'immuun', 1, C.groen]], 960, 130);
      ctx.restore(); }
    if (tab > 0.01) { ctx.save(); ctx.globalAlpha *= tab; const x0 = 360, cols = [860, 1340];
      fagocyt(ctx, cols[0], 250, 70, t); bCel(ctx, cols[1], 245, 56, 3, t, { rs: 16 });
      regel(ctx, 'fagocyten (aspecifiek)', cols[0], 380, 1, WIT, 30, 'center', 700); regel(ctx, 'B-cellen (specifiek)', cols[1], 380, 1, BCOL, 30, 'center', 700);
      const rows = [['wanneer klaar?', 'meteen', 'eerste keer: een week', 'Fagocyten', 'B-cellen'], ['herkennen', 'niets precies', 'precies passend', 'herkennen', 'passen'], ['geheugen', 'nee', 'ja', 'onthouden', 'onthouden']];
      rows.forEach(([n, a, b, wa, wb], i) => { const y = 480 + i * 100; regel(ctx, n, x0, y, q.on(wa, 1), C.text2, 30, 'left', 600); regel(ctx, a, cols[0], y, q.on(wa, 1), C.text, 32, 'center'); regel(ctx, b, cols[1], y, q.on(wb, i === 2 ? 2 : 1), C.text, 32, 'center'); });
      tag(ctx, 'antistoffen helpen de fagocyten', 960, 840, AS, q.on('helpen', 1));
      ctx.restore(); }
  },
  s18(ctx, t, q) { bg(ctx, 'micro'); virus(ctx, 560, 440, 90, [3], t, { rot: t * 0.05 }); regel(ctx, 'waterpokken', 560, 680, 1, VIR, 30, 'center', 700); vink(ctx, 560, 760, 30, q.on('immuun', 1));
    virus(ctx, 1300, 440, 90, [5], t, { rot: -t * 0.05, col: GRIEP }); regel(ctx, 'griep', 1300, 680, q.on('griep', 1), GRIEP, 30, 'center', 700); vraagteken(ctx, 1300, 260, q.on('Hoe', 1), 110); },
  s20(ctx, t, q) { bg(ctx, 'micro');
    const mu = ramp(t, q.at('veranderen'), 2.2), pw = q.on('waterpokkenvirus', 1); const BX = 500, BY = 450, BR = 120, RS = 36;
    ctx.save(); ctx.globalAlpha *= 1 - pw;
    const sl = bSlot(BX, BY, BR, 2, t, 0, RS); const vd = virusDock(sl, 90, sl.c); const pog = bump(ramp(t, q.at('minder') - 0.4, 2.6));
    bCel(ctx, BX, BY, BR, 5, t, { soort: 'geheugen', label: 'geheugencel', rot: 0, rs: RS });
    virus(ctx, lerp(vd.x + 420, vd.x + 34, pog), vd.y, 90, [5], t, { col: GRIEP, rot: vd.rot, ag: sl.c, ks2: [6], mix: mu });
    if (mu > 0.01 && mu < 1) { ctx.save(); ctx.globalAlpha *= bump(mu); circ(ctx, vd.x + 420, vd.y, 170, null, rgba(GRIEP, 0.7), 4); ctx.restore(); }
    regel(ctx, mu > 0.5 ? 'griep, dit jaar' : 'griep, vorig jaar', vd.x + 420, 740, 1, GRIEP, 30, 'center', 700);
    kruis(ctx, sl.cx + 40, sl.cy - 80, 30, q.on('minder', 1) * pog);
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= pw; const sl2 = bSlot(BX, BY, BR, 2, t, 0, RS); const vd2 = virusDock(sl2, 90, sl2.c); const fit = ramp(t, q.at('waterpokkenvirus') + 0.3, 1.8);
    bCel(ctx, BX, BY, BR, 3, t, { soort: 'geheugen', glow: fit > 0.95 ? 0.6 : 0, label: 'geheugencel', rot: 0, rs: RS });
    virus(ctx, lerp(vd2.x + 420, vd2.x, fit), vd2.y, 90, [3], t, { rot: vd2.rot, ag: sl2.c }); regel(ctx, 'waterpokken: verandert bijna niet', vd2.x + 420, 740, 1, VIR, 30, 'center', 700); vink(ctx, vd2.x + 20, vd2.y - 210, 34, q.on('verandert', 1));
    ctx.restore();
    wissel(ctx, q, [['mutaties: antigenen veranderen een beetje', 'mutaties', 1, GRIEP], ['de sleutel past net niet meer', 'minder', 1, C.koraal], ['', 'waterpokkenvirus', 1, VIR], ['daarom krijg je het maar één keer', 'één', 1, C.groen]], 960, 860);
  },
  s21(ctx, t, q) { const ad = q.on('addertje', 1); kamer(ctx, t, { noorUit: ad > 0.5 ? 'denkt' : q.on('antwoord', 1) > 0.5 ? 'blij' : 'neutraal' });
    const panel = q.on('Toen', 1); ctx.fillStyle = rgba('#0B0F16', 0.85 * panel); ctx.fillRect(1100, 120, 780, 680);
    const ch = [['vroeger: passende B-cellen gevonden', 'pasten', 1, BCOL], ['delen → antistoffen + geheugencellen', 'geheugencel', 1, AS], ['nu: geheugencellen → snel plasmacellen', 'Nu', 1, C.goud], ['virus komt binnen, maar is snel opgeruimd', 'opgeruimd', 1, C.groen]];
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1490, 220 + i * 110, col, q.on(w, n) * (1 - ad)));
    tag(ctx, 'antwoord a', 1490, 700, C.goud, q.on('antwoord', 1) * (1 - ad));
    const ch2 = [['het virus verstopt zich in zenuwcellen', 'zenuwcellen', 1, VIR], ['antistoffen kunnen daar niet bij', 'kunnen', 1, AS], ['later: gordelroos', 'gordelroos', 1, C.koraal], ['virus in cellen: T-cellen (film 3)', 'T-cellen', 1, TCOL]];
    ch2.forEach(([s, w, n, col], i) => tag(ctx, s, 1490, 200 + i * 90, col, q.on(w, n) * ad));
    // zenuwcel met het verstopte virus; antistoffen komen er niet bij
    const zc = q.on('zenuwcellen', 1) * ad; if (zc > 0.01) { ctx.save(); ctx.globalAlpha *= zc; const nx0 = 1400, ny0 = 650; ctx.strokeStyle = '#E6C27A'; ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) { const an = 2.0 + i * 0.45; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(nx0, ny0); ctx.quadraticCurveTo(nx0 + Math.cos(an) * 60, ny0 + Math.sin(an) * 50 + 10, nx0 + Math.cos(an) * 105, ny0 + Math.sin(an) * 75); ctx.stroke(); }
      ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(nx0 + 40, ny0); ctx.bezierCurveTo(nx0 + 160, ny0 - 20, nx0 + 260, ny0 + 30, nx0 + 420, ny0 + 5); ctx.stroke();
      blob(ctx, nx0, ny0, 62, 54, 0.06, 3, t); shape(ctx, rgba('#E6C27A', 0.35), '#E6C27A', 3); circ(ctx, nx0, ny0, 22, rgba(C.kern, 0.7), C.kernR, 1.2);
      for (let i = 0; i < 3; i++) virus(ctx, nx0 - 28 + i * 26, ny0 + 24 - (i % 2) * 8, 7, [3], t, { ag: 2.2, rot: i, n: 8 });
      const ka = q.on('kunnen', 1); for (let i = 0; i < 4; i++) { const an = -2.4 + i * 0.6, u = (t * 0.6 + i * 0.25) % 1, d = 95 + 25 * bump(u); antistof(ctx, nx0 + Math.cos(an) * d, ny0 + Math.sin(an) * d * 0.9, 0.26, an - 1.571, ka); }
      naamBij(ctx, 'zenuwcel', '', nx0 + 300, ny0 + 60, 1, 'center', '#E6C27A'); ctx.restore(); }
  },
};
