// Afweer 1 · De eerste verdediging — scènes per alinea.
const PERSON_LOOK = { skin: SKINS[1], hair: '#6B3F22', shirt: '#7A9A5E', hairStyle: 'long' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
grainCanvas = document.createElement('canvas'); grainCanvas.width = 1; grainCanvas.height = 1; // geen korrels (beeldafspraak)
const BACT = '#E07A5F', FLORA = '#7FC48F', WIT = '#D8DCE2', HIST = '#C9A35C', BLD = '#B5574A', VOCHTK = '#5BA4C9', HUID = '#E8C2A4', HOORN = '#E6D8A8', PUS = '#E6E1A0';

// ---------- figuren ----------
// antigeen: driehoekje met de basis óp het oppervlak en de punt naar buiten (normaal nx, ny)
function antigeen(ctx, x, y, nx, ny, k = 1, a = 1, col = '#F2C0A8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tx = -ny, ty = nx, b = 5.5 * k, h = 8 * k;
  ctx.beginPath(); ctx.moveTo(x - tx * b, y - ty * b); ctx.lineTo(x + nx * h, y + ny * h); ctx.lineTo(x + tx * b, y + ty * b); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// bacterie: staafje met antigenen rondom, allemaal loodrecht op de wand
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0, kl = BACT, ag = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (ag > 0.01 && kl === BACT) { for (const px of [-12, 0, 12]) { antigeen(ctx, px, -11, 0, -1, 1, ag); antigeen(ctx, px + 6, 11, 0, 1, 1, ag); } for (const [cx, an] of [[15, -0.7], [15, 0.7], [-15, Math.PI - 0.7], [-15, Math.PI + 0.7]]) antigeen(ctx, cx + Math.cos(an) * 11, Math.sin(an) * 11, Math.cos(an), Math.sin(an), 1, ag); }
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, kl === BACT ? '#B9614D' : rgba(kl, 0.75), lighten(kl, 0.3), 1.5 / s);
  ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.bezierCurveTo(-4, -5, 4, 5, 12, 0); ctx.stroke();
  ctx.restore(); }
// dendritische cel: lijf met lange, golvende uitlopers (eerst alle randen, dan alle vlakken: één omtrek)
const DC_VUL = '#7F858D';
function dendritischeCel(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 1, ag = 0, nAg = 6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const armen = []; for (let i = 0; i < 7; i++) { const an0 = i * 0.9 + 0.3 + 0.12 * Math.sin(t * 0.7 + i), L = r * (1.1 + 0.7 * hash(i * 5)) * arm; const pts = []; for (let k = 0; k <= 14; k++) { const u = k / 14, d = r * 0.6 + L * u, wob = Math.sin(u * 5 + t * 1.6 + i * 2) * 0.22 * u; pts.push([x + Math.cos(an0 + wob) * d, y + Math.sin(an0 + wob) * d, (1 - u) * r * 0.32 + 3]); } armen.push(pts); }
  const pad = (pts) => { ctx.beginPath(); const L = [], R = []; pts.forEach((p, k) => { const q = pts[Math.min(k + 1, pts.length - 1)], pr = pts[Math.max(k - 1, 0)]; const dx = q[0] - pr[0], dy = q[1] - pr[1], n = Math.hypot(dx, dy) || 1; L.push([p[0] - dy / n * p[2], p[1] + dx / n * p[2]]); R.push([p[0] + dy / n * p[2], p[1] - dx / n * p[2]]); }); ctx.moveTo(L[0][0], L[0][1]); L.forEach(p => ctx.lineTo(p[0], p[1])); R.reverse().forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); };
  const lijf = () => blob(ctx, x, y, r, r * 0.92, 0.07, 9, t);
  ctx.strokeStyle = WIT; ctx.lineWidth = 5; ctx.lineJoin = 'round'; if (arm > 0.02) armen.forEach(p => { pad(p); ctx.stroke(); }); lijf(); ctx.stroke();
  ctx.fillStyle = DC_VUL; if (arm > 0.02) armen.forEach(p => { pad(p); ctx.fill(); }); lijf(); ctx.fill();
  circ(ctx, x - r * 0.25, y - r * 0.1, r * 0.3, rgba(C.kern, 0.75), C.kernR, 1.5);
  for (let i = 0; i < nAg; i++) { const an = -1.9 + i * 0.62, rr = r * 0.97; antigeen(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, Math.cos(an), Math.sin(an), 2.3, clamp(ag * nAg - i, 0, 1)); }
  ctx.restore(); }
// T-cel: rond, groen, met een receptor in een vaste vorm (0 = past bij het driehoekje)
function tCel(ctx, x, y, r, vorm, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (gloed > 0.01) { const g = ctx.createRadialGradient(x, y, r, x, y, r * 2.6); g.addColorStop(0, rgba(C.groen, 0.55 * gloed)); g.addColorStop(1, rgba(C.groen, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, 6.283); ctx.fill(); }
  circ(ctx, x, y, r, rgba(C.groen, 0.35 + 0.35 * gloed), C.groen, 2); circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.7), C.kernR, 1);
  ctx.fillStyle = C.groen; ctx.save(); ctx.translate(x - r, y); ctx.beginPath();
  if (vorm === 0) { ctx.moveTo(-14, -9); ctx.lineTo(-14, 9); ctx.lineTo(-4, 9); ctx.lineTo(-11, 0); ctx.lineTo(-4, -9); ctx.closePath(); }
  else if (vorm === 1) { ctx.rect(-14, -9, 4, 18); ctx.rect(-10, -9, 6, 4); ctx.rect(-10, 5, 6, 4); }
  else { ctx.moveTo(-4, -10); ctx.lineTo(-14, -10); ctx.lineTo(-14, 10); ctx.lineTo(-4, 10); ctx.arc(-4, 0, 6, 1.57, -1.57, true); ctx.closePath(); }
  ctx.fill(); ctx.restore(); ctx.restore(); }
// lymfeknoop: boonvorm met kapsel, lichtere follikels en een uitgaand lymfevat
function lymfeknoop(ctx, x, y, rx, ry, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const boon = (k) => { ctx.beginPath(); ctx.moveTo(x - rx * k, y); ctx.bezierCurveTo(x - rx * k, y - ry * 1.3 * k, x + rx * k, y - ry * 1.3 * k, x + rx * k, y); ctx.bezierCurveTo(x + rx * k, y + ry * 1.25 * k, x + rx * 0.25 * k, y + ry * 1.1 * k, x, y + ry * 0.62 * k); ctx.bezierCurveTo(x - rx * 0.25 * k, y + ry * 1.1 * k, x - rx * k, y + ry * 1.25 * k, x - rx * k, y); ctx.closePath(); };
  ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(x, y + ry * 0.7); ctx.bezierCurveTo(x, y + ry * 1.2, x + 40, y + ry * 1.5, x + 30, y + ry * 1.9); ctx.stroke();
  boon(1); shape(ctx, '#1E2E2A', rgba(C.groen, 0.8), 3); boon(0.86); ctx.strokeStyle = rgba(C.groen, 0.25); ctx.lineWidth = 2; ctx.stroke();
  for (const [fx, fy] of [[-0.62, -0.25], [-0.25, -0.62], [0.2, -0.66], [0.6, -0.3]]) { ctx.beginPath(); ctx.ellipse(x + fx * rx, y + fy * ry, rx * 0.17, ry * 0.2, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.14), null); }
  ctx.restore(); }
// Noor tot de heupen in beeld, met een kijkje in de romp (luchtpijp, maag, darmen)
const BUIK = { x: 620, voet: 1300, h: 1300 };
function noorBuik(ctx, t, o = {}) { const { a = 1, uit = 'neutraal', luchtpijp = 1, maag = 0, darm = 1, darmA = 0.6 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  persoon(ctx, 'noor', BUIK.x, BUIK.voet, BUIK.h, { uit, t, outfit: 'zomer' }); const x = BUIK.x;
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, 560, 168, 230, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.42); ctx.fill(); ctx.restore();
  if (luchtpijp > 0.01) { ctx.save(); ctx.globalAlpha *= luchtpijp; ctx.strokeStyle = '#9FC3E0'; ctx.lineCap = 'round'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(x, 265); ctx.lineTo(x, 420); ctx.moveTo(x, 410); ctx.quadraticCurveTo(x - 20, 440, x - 70, 470); ctx.moveTo(x, 410); ctx.quadraticCurveTo(x + 20, 440, x + 70, 470); ctx.stroke(); ctx.strokeStyle = rgba('#1A2740', 0.5); ctx.lineWidth = 3; for (let yy = 285; yy < 405; yy += 18) { ctx.beginPath(); ctx.moveTo(x - 9, yy); ctx.lineTo(x + 9, yy); ctx.stroke(); } ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * maag; ctx.beginPath(); ctx.moveTo(x + 15, 470); ctx.bezierCurveTo(x + 120, 470, x + 130, 560, x + 70, 590); ctx.bezierCurveTo(x + 20, 610, x - 10, 580, x + 30, 560); ctx.bezierCurveTo(x + 70, 540, x + 50, 500, x + 15, 495); ctx.closePath(); shape(ctx, rgba(C.goud, 0.15 + 0.3 * maag), C.goud, 2 + maag); ctx.restore();
  if (darm > 0.01) { const pts = DARM_PTS.map(p => [x + p[0] * 0.55, 660 + p[1] * 0.5]); ctx.save(); ctx.globalAlpha *= darmA; buisPad(ctx, pts, 26, 1, V.neutraal, C.fill, { seed: 2, glad: true }); ctx.restore(); }
  ctx.restore(); }
function florapos(i, t) { const w = wander(i, t, 5, 0.6); return [BUIK.x - 75 + hash(i * 5) * 150 + w.x, 600 + hash(i * 9) * 130 + w.y]; }
// één tekstbalk tegelijk: de vorige verdwijnt snel, dan komt de nieuwe (geen over elkaar heen lopende teksten)
function wissel(ctx, q, rij, x, y) { let k = -1; rij.forEach((r, i) => { if (q.on(r[1], r[2] || 1) > 0) k = i; }); if (k < 0) return; const u = q.on(rij[k][1], rij[k][2] || 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][3], 1 - u / 0.4); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][3], (u - 0.35) / 0.65); }
// hersenen in zijaanzicht met de hypothalamus als gloeiend punt
function brein(ctx, x, y, s, a = 1, gloed = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, 30); ctx.bezierCurveTo(-140, -60, -60, -110, 10, -100); ctx.bezierCurveTo(90, -105, 140, -40, 125, 25); ctx.bezierCurveTo(118, 55, 80, 60, 60, 52); ctx.bezierCurveTo(30, 60, -10, 50, -40, 55); ctx.bezierCurveTo(-80, 62, -115, 58, -120, 30); ctx.closePath(); shape(ctx, rgba('#C98A9A', 0.22), '#D9A3B0', 2.5);
  ctx.strokeStyle = rgba('#D9A3B0', 0.45); ctx.lineWidth = 2; for (const [a1, b1, a2, b2] of [[-90, -40, -30, -70], [-60, 0, 20, -40], [30, -80, 70, -20], [-20, 20, 60, 10]]) { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.quadraticCurveTo((a1 + a2) / 2, b1 - 25, a2, b2); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(85, 62, 38, 24, 0.2, 0, 6.283); shape(ctx, rgba('#C98A9A', 0.25), '#D9A3B0', 2); roundRect(ctx, 22, 50, 22, 70, 10); shape(ctx, rgba('#C98A9A', 0.25), '#D9A3B0', 2);
  const g = ctx.createRadialGradient(5, 42, 2, 5, 42, 40); g.addColorStop(0, rgba(C.goud, 0.5 + 0.4 * gloed * (0.7 + 0.3 * Math.sin(t * 5)))); g.addColorStop(1, rgba(C.goud, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(5, 42, 40, 0, 6.283); ctx.fill(); circ(ctx, 5, 42, 11, C.goud, null);
  ctx.restore(); }
// thermostaatknop: schaal 35–42 °C over 270°, gouden wijzer = instelling, koraal boog = lichaamstemperatuur
function thermostaat(ctx, x, y, r, inst, lich, a = 1, gevaar = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const A0 = Math.PI * 0.75, SW = Math.PI * 1.5, ang = v => A0 + clamp((v - 35) / 7, 0, 1) * SW;
  circ(ctx, x, y + 6, r + 6, rgba('#000000', 0.25)); circ(ctx, x, y, r, '#202D44', C.line, 3); circ(ctx, x, y, r * 0.62, '#16203A', rgba(C.line, 0.5), 2);
  if (gevaar > 0.01) { ctx.strokeStyle = rgba('#E0503E', 0.8 * gevaar); ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(x, y, r * 0.84, ang(41), ang(42)); ctx.stroke(); }
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r * 0.72, ang(35), ang(42)); ctx.stroke();
  ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.arc(x, y, r * 0.72, ang(35), ang(lich)); ctx.stroke(); ctx.lineCap = 'butt';
  for (let v = 35; v <= 42.01; v += 0.5) { const an = ang(v), l = v % 1 === 0 ? 14 : 7; ctx.strokeStyle = rgba(C.text, v % 1 === 0 ? 0.8 : 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 4), y + Math.sin(an) * (r - 4)); ctx.lineTo(x + Math.cos(an) * (r - 4 - l), y + Math.sin(an) * (r - 4 - l)); ctx.stroke(); }
  for (const v of [36, 38, 40, 42]) { const an = ang(v); text(ctx, String(v), x + Math.cos(an) * (r + 26), y + Math.sin(an) * (r + 26) + 8, fTekst(22, 600), C.text2, 'center'); }
  const ai = ang(inst); ctx.save(); ctx.translate(x + Math.cos(ai) * (r - 2), y + Math.sin(ai) * (r - 2)); ctx.rotate(ai); ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(4, -11); ctx.lineTo(4, 11); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore();
  text(ctx, lich.toFixed(1).replace('.', ',') + '°', x, y - 2, fTitel(46), C.koraal, 'center'); metaText(ctx, 'INGESTELD ' + inst.toFixed(1).replace('.', ',') + '°', x, y + 28, C.goud, 'center', 15);
  ctx.restore(); }
// fagocyt: grijze blob met lobbige kern; arm = uitstulping richting (tx, ty) 0..1
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '', kern = 'lobben' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, 0.08, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  if (kern === 'rond') circ(ctx, x - 0.35 * r, y - 0.25 * r, r * 0.26, rgba(C.kern, 0.6), C.kernR, 1.2); else for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function rodeBC(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C9483E', '#E07A6E', 1.2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function mestcel(ctx, x, y, r, a = 1, los = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.85, 0.05, 7, t); shape(ctx, rgba(HIST, 0.25), HIST, 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < 10; i++) { const an = hash(i) * 6.283, rr = r * (0.45 + 0.3 * hash(i * 3)); const out = los * (0.6 + 1.6 * ((t * 0.3 + hash(i * 7)) % 1)); circ(ctx, x + Math.cos(an) * (rr + out * r), y + Math.sin(an) * (rr + out * r), 4.5, rgba(HIST, 0.9 * (1 - Math.min(1, out * 0.35)))); }
  ctx.restore(); }
// haarvat horizontaal met wijdte w (1 = normaal) en lekkendheid
function haarvat(ctx, x0, x1, y, w, t, o = {}) { const { lek = 0, wbc = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 * w;
  ctx.fillStyle = rgba(BLD, 0.25 + 0.15 * (w - 1)); ctx.fillRect(x0, y - h, x1 - x0, 2 * h); ctx.strokeStyle = lighten(BLD, 0.2); ctx.lineWidth = 4; if (lek > 0.01) ctx.setLineDash([26, 10 * lek + 2]); ctx.beginPath(); ctx.moveTo(x0, y - h); ctx.lineTo(x1, y - h); ctx.moveTo(x0, y + h); ctx.lineTo(x1, y + h); ctx.stroke(); ctx.setLineDash([]);
  const n = Math.round(6 + 6 * (w - 1)); for (let i = 0; i < n; i++) { const v = (t * 0.15 * (1 + 0.6 * (w - 1)) + i / n) % 1; rodeBC(ctx, lerp(x0, x1, v), y + (hash(i) - 0.5) * h * 1.1, 15); }
  for (let i = 0; i < 8; i++) { const v = (t * 0.25 + i / 8) % 1; circ(ctx, x0 + hash(i * 3) * (x1 - x0), y - h - v * 140 * lek, 5, rgba(VOCHTK, 0.8 * lek * (1 - v))); }
  ctx.restore(); }
function huidDoorsnede(ctx, x, y, w, t, o = {}) { const { a = 1, zuur = 0, schilfer = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 9; i++) { const yy = y + i * 10; const off = (i < 3 ? schilfer * ((t * 6) % 30) : 0); ctx.strokeStyle = rgba(HOORN, 0.9 - i * 0.06); ctx.lineWidth = 7; ctx.beginPath(); for (let k = 0; k < 7; k++) { const xx = x + k * w / 7 + (i % 2) * 30; ctx.moveTo(xx + 4, yy - (i === 0 ? off * 0.4 : 0)); ctx.lineTo(xx + w / 7 - 8, yy - (i === 0 ? off * 0.4 : 0)); } ctx.stroke(); }
  for (let i = 0; i < 10; i++) { const xx = x + 20 + i * (w - 40) / 9; circ(ctx, xx, y + 120, 18, rgba(HUID, 0.4), HUID, 1.5); }
  ctx.fillStyle = rgba(HUID, 0.12); ctx.fillRect(x, y + 150, w, 160); metaText(ctx, 'HOORNLAAG', x + w + 46, y + 40, HOORN, 'left', 20); metaText(ctx, 'LEVENDE HUIDCELLEN', x + w + 16, y + 128, HUID, 'left', 20);
  if (zuur > 0.01) for (let i = 0; i < 6; i++) { const xx = x + 40 + i * (w - 80) / 5; regel(ctx, 'H⁺', xx, y - 20 - 8 * Math.sin(t * 2 + i), zuur, C.goud, 24, 'center', 700); }
  ctx.restore(); }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1580, cy = 470;
    const u = (t * 0.15) % 1; fagocyt(ctx, cx, cy, 120, t, { arm: 0.6 + 0.3 * Math.sin(t), tx: cx + 260, ty: cy - 40 }); bacterie(ctx, cx + 230, cy - 40, 1.3, 0.3); bacterie(ctx, cx + 300, cy + 80, 1.1, -0.5); bacterie(ctx, cx - 260, cy + 140, 1, 1.2); },

  s01(ctx, t, q) { const nd = q.on('volgende', 1);
    ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 600, W, H - 600); ctx.fillStyle = '#4A7040'; for (let i = 0; i < 40; i++) ctx.fillRect(hash(i) * W, 600 + hash(i * 3) * 300, 4, 20);
    roundRect(ctx, 160, 520, 440, 40, 6); shape(ctx, '#B08A5C', '#8C6A44', 2);
    persoon(ctx, 'noor', 420, 960, 640, { outfit: 'zomer', uit: nd > 0.5 ? 'bezorgd' : 'neutraal', pose: nd > 0.5 ? 'denk' : 'staan', t });
    zoomCircle(ctx, 1220, 450, 330, 520, 560, nd > 0.5 ? 'de volgende dag' : '', q.on('splinter', 1), () => {
      ctx.fillStyle = '#2E3F55'; ctx.fillRect(880, 110, 700, 700);
      roundRect(ctx, 900, 380, 640, 160, 80); shape(ctx, SKINS[1], '#A87A5A', 3); roundRect(ctx, 1420, 400, 90, 120, 30); shape(ctx, '#E8C8B4', '#A87A5A', 2);
      if (nd > 0.01) { const g = ctx.createRadialGradient(1180, 460, 10, 1180, 460, 160); g.addColorStop(0, rgba('#E0503E', 0.7 * nd)); g.addColorStop(1, rgba('#E0503E', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(1180, 460, 170, 110 + 20 * nd, 0, 0, 6.283); ctx.fill(); ctx.save(); ctx.globalAlpha *= nd; ctx.strokeStyle = rgba('#E0503E', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1180, 455, 120, 92, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
      const out = ramp(t, q.at('trekt'), 1.2); if (nd < 0.5) { ctx.save(); ctx.translate(1180 - 70 * out, 420 - 160 * out); ctx.rotate(-0.6); ctx.fillStyle = '#8C5A3A'; ctx.fillRect(-6, -90, 12, 120); ctx.restore(); }
    });
    if (nd > 0.01) { regel(ctx, 'rood · warm · dik · pijn', 1220, 860, q.on('pijn', 1), C.koraal, 34, 'center', 700); }
    vraagteken(ctx, 1700, 300, q.on('Waarom', 1), 140);
  },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const pA = 1 - q.on('slijm', 1);
    if (pA > 0.01) { ctx.save(); ctx.globalAlpha *= pA; huidDoorsnede(ctx, 340, 360, 900, t, { zuur: q.on('zuur', 1), schilfer: q.on('afschilferen', 1) });
      for (let i = 0; i < 6; i++) { const u = (t * 0.2 + i / 6) % 1; bacterie(ctx, 380 + hash(i) * 820, 250 - 40 * Math.sin(u * 6.28 + i), 1, hash(i * 3) * 3, 1 - 0.3 * q.on('prettig', 1)); }
      tag(ctx, 'de huid: eerste muur', 790, 150, HOORN, q.on('muur', 1)); ctx.restore(); }
    if (1 - pA > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - pA; noorBuik(ctx, t, { maag: q.on('maag', 1), darmA: 0.5 + 0.3 * q.on('darmen', 1) });
      // slijm stroomt omhoog in de luchtpijp (trilharen), traanvocht bij het oog
      const sl = q.on('trilharen', 1); for (let i = 0; i < 5; i++) { const v = (t * 0.35 + i / 5) % 1; circ(ctx, BUIK.x + 4 * Math.sin(i * 2), lerp(410, 270, v), 6, rgba('#E6E1A0', 0.85 * sl * (1 - v))); }
      const ly = q.on('lysozym', 1); for (let i = 0; i < 3; i++) { const v = (t * 0.5 + i / 3) % 1; circ(ctx, BUIK.x - 42, 150 + v * 60, 5, rgba('#9FC3E0', ly * (1 - v))); }
      const pts = [['slijm en trilharen', 'luchtwegen', 850, 340, 'slijm', '#9FC3E0'], ['lysozym', 'traanvocht, speeksel', 770, 120, 'lysozym', '#AFC0D0'], ['maagzuur', 'zoutzuur', 850, 540, 'maag', C.goud], ['eigen bacteriën', 'huid en darmen', 850, 690, 'darmen', C.groen]];
      pts.forEach(([n, m, px, py, w, col]) => naamBij(ctx, n, m, px, py, q.on(w, 1), 'left', col));
      const fl = q.on('darmen', 1); for (let i = 0; i < 12; i++) { const [fx, fy] = florapos(i, t); bacterie(ctx, fx, fy, 0.42, hash(i) * 6 + 0.2 * Math.sin(t + i), fl * 0.9, 0, FLORA); }
      ctx.restore(); }
    tag(ctx, 'ongeveer net zoveel bacteriën als eigen cellen', 1330, 860, C.groen, q.on('ongeveer', 1));
  },
  s05(ctx, t, q) { bg(ctx, 'schema'); noorBuik(ctx, t, { darmA: 0.6 }); for (let i = 0; i < 12; i++) { const [fx, fy] = florapos(i, t); bacterie(ctx, fx, fy, 0.42, hash(i) * 6 + 0.2 * Math.sin(t + i), 0.9, 0, FLORA); }
    ctx.save(); ctx.translate(1250, 420); ctx.rotate(-0.4 + 0.05 * Math.sin(t * 1.5)); roundRect(ctx, -110, -40, 220, 80, 40); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -40, 110, 80, 40); ctx.fill(); ctx.restore(); regel(ctx, 'antibiotica', 1250, 540, 1, C.text, 32, 'center', 700);
    vraagteken(ctx, 1560, 520, q.on('Hoe', 1), 130); },
  s07(ctx, t, q) { bg(ctx, 'schema'); const d = ramp(t, q.at('onderscheid'), 2); noorBuik(ctx, t, { darmA: 0.6, uit: q.on('ruimte', 1) > 0.5 ? 'bezorgd' : 'neutraal' });
    for (let i = 0; i < 12; i++) { const [fx, fy] = florapos(i, t); bacterie(ctx, fx, fy, 0.42, hash(i) * 6, 0.9 * (1 - d * (i % 4 !== 0 ? 1 : 0)), 0, FLORA); }
    const sp = q.on('ruimte', 1); for (let i = 0; i < 9; i++) { const [fx, fy] = florapos(i + 30, t); bacterie(ctx, fx, fy, 0.42, hash(i * 2) * 6, sp * clamp(ramp(t, q.at('ruimte'), 3) * 9 - i, 0, 1)); }
    const sc = q.on('schimmels', 1); for (let i = 0; i < 6; i++) { const [fx, fy] = florapos(i + 60, t); ctx.save(); ctx.globalAlpha *= sc; circ(ctx, fx, fy, 9, rgba('#9AA3B2', 0.8), '#C9D2DE', 1); circ(ctx, fx + 9, fy - 6, 5, rgba('#9AA3B2', 0.8), '#C9D2DE', 1); ctx.restore(); }
    tag(ctx, 'antibiotica doden ook je nuttige bacteriën', 1330, 260, C.koraal, q.on('onderscheid', 1)); tag(ctx, 'schadelijke bacteriën krijgen ruimte', 1330, 380, BACT, q.on('ruimte', 1)); tag(ctx, 'schimmels: antibiotica doen niets', 1330, 500, '#9AA3B2', q.on('schimmels', 1)); },
  s08(ctx, t, q) { bg(ctx, 'micro');
    const ent = ramp(t, q.at('Bacteriën'), 2); ctx.strokeStyle = '#8C5A3A'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(300, 80); ctx.lineTo(300 + 220 * Math.min(1, ramp(t, 0.2, 1.5)), 80 + 260 * Math.min(1, ramp(t, 0.2, 1.5))); ctx.stroke(); huidDoorsnede(ctx, 120, 60, 600, t, { a: 0.5 });
    const fa = q.on('macrofagen', 1); const eat = ramp(t, q.at('omsluit'), 3), in2 = ramp(t, q.at('blaasje', 1), 2), lys = ramp(t, q.at('Lysosomen'), 2), brk = ramp(t, q.at('breken'), 2);
    const fx = 1050, fy = 540, bx = lerp(1300, fx + 55, in2), by = lerp(470, fy + 55, in2);
    for (let i = 0; i < 3; i++) bacterie(ctx, 420 + i * 90 + 220 * ent, 330 + i * 60, 1.2, i, ent * (i === 0 ? 0 : 1));
    fagocyt(ctx, fx, fy, 170, t, { a: fa, arm: eat * (1 - in2), tx: 1300, ty: 470, label: 'macrofaag (fagocyt)', kern: 'rond' });
    if (fa > 0.01) { bacterie(ctx, bx, by, 1.4, 0.4, fa, brk); if (in2 > 0.01) { ctx.save(); ctx.globalAlpha *= in2; ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx + 55, fy + 55, 48, 0, 6.283); ctx.stroke(); ctx.restore(); }
      for (let i = 0; i < 3; i++) { const an = i * 2.1 + 0.5; const rr = lerp(120, 58, lys); circ(ctx, fx + 55 + Math.cos(an) * rr, fy + 55 + Math.sin(an) * rr, 14, rgba(C.lyso, 0.7 * lys), C.lyso, 1.5); } }
    naamBij(ctx, 'schijnvoetjes', '', 1250, 380, q.on('schijnvoetjes', 1) * (1 - in2), 'left', WIT); naamBij(ctx, 'lysosomen', 'met enzymen', fx + 190, fy + 70, lys, 'left', C.lyso);
    tag(ctx, 'fagocytose', 1050, 140, C.goud, q.on('fagocytose', 1));
  },
  s09(ctx, t, q) { bg(ctx, 'micro'); fagocyt(ctx, 760, 520, 170, t, {}); bacterie(ctx, 1260, 480, 2, 0.3); regel(ctx, 'nieuwe bacterie', 1260, 600, 1, C.text2, 30, 'center'); vraagteken(ctx, 1010, 360, q.on('opeten', 1), 130); },
  s11(ctx, t, q) { bg(ctx, 'micro');
    const ec = q.on('eigen', 1), vr = q.on('herkent', 1);
    ctx.save(); ctx.globalAlpha *= ec; roundRect(ctx, 260, 360, 300, 200, 60); shape(ctx, rgba(C.teal, 0.2), C.teal, 2); ctx.fillStyle = C.teal; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(300 + i * 55, 360, 10, Math.PI, 0); ctx.fill(); } regel(ctx, 'jouw cel: jouw vormpjes', 410, 610, 1, C.teal, 30, 'center', 700); ctx.restore();
    ctx.save(); ctx.globalAlpha *= vr; for (let i = 0; i < 3; i++) bacterie(ctx, 1320 + i * 110, 380 + i * 90, 2, 0.2 * i); regel(ctx, 'bacteriën: gedeelde vormpjes', 1430, 680, 1, BACT, 30, 'center', 700); ctx.restore();
    fagocyt(ctx, 860, 480, 150, t, { arm: q.on('vreemd', 1) * 0.8, tx: 1320, ty: 380 });
    tag(ctx, 'dit is vreemd', 1100, 200, BACT, q.on('vreemd', 1) * (1 - q.on('aspecifieke', 1)));
    tag(ctx, 'aspecifieke afweer: snel, altijd klaar, niet op maat', 960, 820, C.goud, q.on('aspecifieke', 1)); tag(ctx, 'geen geheugen', 960, 200, C.text2, q.on('onthoudt', 1));
  },
  s12(ctx, t, q) { bg(ctx, 'micro');
    // 1 de dendritische cel pakt een bacterie, knipt hem in stukjes en zet die op haar oppervlak; 2 reist via een lymfevat; 3 in de lymfeknoop past één T-helpercel
    const dc0 = q.on('dendritische', 1), opp = ramp(t, q.at('oppervlak'), 2.5), kn = ramp(t, q.at('stukjes'), 1.6), rs = ramp(t, q.at('reizen'), 4.5), pas = q.on('passen', 1), spec = q.on('specifieke', 1);
    const vat = [[470, 560], [760, 690], [1080, 640], [1340, 500]]; const vp = (u) => { const n = vat.length - 1, k = Math.min(n - 1, Math.floor(u * n)), f = u * n - k; return [lerp(vat[k][0], vat[k + 1][0], f), lerp(vat[k][1], vat[k + 1][1], f)]; };
    // lymfevat
    ctx.save(); ctx.globalAlpha *= q.on('lymfe', 1); ctx.strokeStyle = rgba(C.groen, 0.22); ctx.lineWidth = 70; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); vat.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = rgba('#121A26', 1); ctx.lineWidth = 60; ctx.stroke(); ctx.strokeStyle = rgba(C.groen, 0.08); ctx.stroke(); ctx.restore();
    const ln = q.on('lymfeknoop', 1); lymfeknoop(ctx, 1520, 470, 300, 230, ln);
    if (ln > 0.01) naamBij(ctx, 'lymfeknoop', '', 1760, 790, ln, 'center', C.groen);
    // T-helpercellen in de knoop: alleen nr. 0 past
    const T = [[1600, 330, 1], [1720, 450, 2], [1660, 590, 0], [1500, 310, 2], [1760, 300, 1]]; let doel = null;
    T.forEach(([tx, ty, v], i) => { if (v === 0) { const m = ramp(t, q.at('passen'), 2); const px = lerp(tx, 1420, m), py = lerp(ty, 470, m); doel = [px, py]; tCel(ctx, px, py, 26, 0, ln, pas * 0.6 + spec * 0.4 * (0.6 + 0.4 * Math.sin(t * 4))); }
      else { const w = wander(i, t, 6, 0.5); tCel(ctx, tx + w.x, ty + w.y, 26, v, ln * (1 - 0.4 * pas)); } });
    if (spec > 0.01 && doel) for (let k = 0; k < 2; k++) { const an = -0.6 + k * 1.2; tCel(ctx, doel[0] + 90 + Math.cos(an) * 50 * spec, doel[1] + Math.sin(an) * 70 * spec, 24, 0, spec, 0.5); }
    if (q.on('helpercellen', 1) > 0.01 && doel) naamBij(ctx, 'T-helpercel', 'past precies', 1300, 780, q.on('helpercellen', 1) * (1 - spec * 0.6), 'left', C.groen);
    // dendritische cel
    const [px, py] = rs > 0 ? vp(rs) : [470, 450]; const dx = rs > 0 ? px : 470, dy = rs > 0 ? lerp(450, py, Math.min(1, rs * 4)) : 450; const sc = lerp(1, 0.6, rs);
    dendritischeCel(ctx, dx, dy, 110 * sc, t, { a: 1, arm: lerp(1, 0.45, rs), ag: opp });
    // de bacterie: wordt opgenomen, in stukjes geknipt, stukjes gaan naar het oppervlak
    const inn = ramp(t, q.at('knippen'), 1.5); if (opp < 1) { const bx = lerp(780, dx + 20, inn), by = lerp(330, dy + 10, inn); if (kn < 0.05) bacterie(ctx, bx, by, 1.6 * lerp(1, 0.7, inn), 0.4 + t * 0.2 * (1 - inn), dc0);
      else for (let k = 0; k < 4; k++) { const an = -1.9 + (k + 1) * 0.62 * 1.4, d = lerp(10, 100, opp) * sc; ctx.save(); ctx.globalAlpha *= 1 - opp; ctx.translate(dx + 20 * (1 - opp) + Math.cos(an) * d * opp + (k - 1.5) * 16 * kn * (1 - opp), dy + 10 * (1 - opp) + Math.sin(an) * d * opp); ctx.rotate(k); roundRect(ctx, -14, -9, 28, 18, 7); shape(ctx, '#B9614D', '#F2C0A8', 1.2); ctx.restore(); } }
    if (rs < 0.1) { naamBij(ctx, 'dendritische cel', '', 470, 700, dc0 * (1 - rs * 10), 'center', C.text);
      naamBij(ctx, 'antigeen', 'stukje van de bacterie', 560, 300, q.on('antigeen', 1) * (1 - rs * 10), 'left', '#F2C0A8'); }
    tag(ctx, 'antigeenpresentatie: het opsporingsbericht', 960, 130, '#F2C0A8', q.on('antigeenpresentatie', 1) * (1 - q.on('reizen', 1)));
    tag(ctx, 'een T-helpercel die precies past → specifieke afweer', 960, 130, C.groen, pas);
  },
  s13(ctx, t, q) { bg(ctx, 'micro');
    const w = 1 + 0.5 * ramp(t, q.at('wijder'), 2), lek = ramp(t, q.at('doorlaten'), 2), wbc = q.on('kruipen', 1);
    haarvat(ctx, 160, 1760, 700, w, t, { lek });
    mestcel(ctx, 520, 340, 70, 1, q.on('histamine', 1), t); naamBij(ctx, 'mestcel', 'geeft histamine af', 610, 330, q.on('mestcellen', 1), 'left', HIST);
    const sw = q.on('dik', 1); if (sw > 0.01) { ctx.save(); ctx.globalAlpha *= sw * 0.35; ctx.fillStyle = VOCHTK; ctx.beginPath(); ctx.ellipse(1100, 420, 520, 200, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    const ps = q.on('pus', 1); if (ps > 0.01) { ctx.save(); ctx.globalAlpha *= ps * (1 - 0.5 * q.on('antwoord', 1)); ctx.beginPath(); ctx.ellipse(1200, 320, 260, 90, 0, 0, 6.283); shape(ctx, rgba(PUS, 0.35), PUS, 2); regel(ctx, 'pus', 1200, 330, 1, C.text, 32, 'center', 700); ctx.restore(); }
    for (let i = 0; i < 4; i++) { const v = clamp(ramp(t, q.at('kruipen') + i * 0.8, 3), 0, 1); const x = 900 + i * 180, y = lerp(700, 360 + 30 * i, v); if (wbc > 0.01) fagocyt(ctx, x, y, 34, t, { a: wbc, seed: i }); }
    for (let i = 0; i < 5; i++) bacterie(ctx, 900 + i * 160, 300 + (i % 2) * 60, 0.6, i, 1, q.on('pus', 1));
    tag(ctx, 'wijder: meer bloed → rood en warm', 960, 130, BLD, q.on('wijder', 1) * (1 - q.on('doorlaten', 1)));
    tag(ctx, 'doorlaatbaarder: vocht lekt → dik', 960, 130, VOCHTK, q.on('doorlaten', 1) * (1 - q.on('pijn', 1)));
    tag(ctx, 'vocht en ontstekingsstoffen → pijn', 960, 130, C.koraal, q.on('pijn', 1) * (1 - q.on('kruipen', 1)));
    tag(ctx, 'neutrofielen kruipen het weefsel in', 960, 130, WIT, q.on('kruipen', 1) * (1 - q.on('geen', 1)));
    tag(ctx, 'rode bloedcellen blijven in het vat', 960, 130, BLD, q.on('geen', 1) * (1 - q.on('antwoord', 1)));
    tag(ctx, 'antwoord a: je lichaam doet het zelf', 960, 130, C.goud, q.on('antwoord', 1));
  },
  s14(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'koorts: vanaf ± 38 °C', 960, 300, q.on('achtendertig', 1), C.koraal, 44, 'center', 700);
    ctx.save(); ctx.translate(960, 560); roundRect(ctx, -30, -200, 60, 340, 30); shape(ctx, '#E6E1D3', '#9AA3B2', 3); circ(ctx, 0, 160, 60, C.koraal, '#9AA3B2', 3); ctx.fillStyle = C.koraal; ctx.fillRect(-14, -60 - 60 * Math.sin(t) * 0.2, 28, 220); ctx.restore(); vraagteken(ctx, 1300, 560, q.on('Waardoor', 1), 130); },
  s16(ctx, t, q) { bg(ctx, 'schema');
    const X = 300, Y = 250, Wg = 960, Hg = 380; const setp = s => s < 2 ? 37 : s < 12 ? 39 : 37; const lich = s => s < 2 ? 37 : s < 12 ? 39 - 2 * Math.exp(-(s - 2) * 0.6) : 37 + (lich(11.99) - 37) * Math.exp(-(s - 12) * 0.6);
    const u = 0.72 * ramp(t, q.at('thermostaat'), 16) + 0.28 * ramp(t, q.at('omlaag'), 6), sim = u * 16; const instG = 37 + 2 * ease((sim - 2) / 0.8) - 2 * ease((sim - 12) / 0.8);
    const yT = v => Y + Hg - (v - 35) * 6 / 42 * Hg;
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 16, ymax: 42, f: s => (setp(s) - 35) * 42 / 7, u, xticks: [], yticks: [], xlab: 'tijd', ylab: 'temperatuur', col: C.goud });
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 16, ymax: 42, f: s => (lich(s) - 35) * 42 / 7, u, xticks: [], yticks: [], col: C.koraal });
    regel(ctx, '39 °C', X - 20, yT(39) + 10, 1, C.text2, 26, 'right'); regel(ctx, '37 °C', X - 20, yT(37) + 10, 1, C.text2, 26, 'right');
    const lg = q.on('thermostaat', 1); ctx.save(); ctx.globalAlpha *= lg; ctx.lineWidth = 4; ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(X + 40, Y + 20); ctx.lineTo(X + 76, Y + 20); ctx.stroke(); ctx.strokeStyle = C.koraal; ctx.beginPath(); ctx.moveTo(X + 40, Y + 62); ctx.lineTo(X + 76, Y + 62); ctx.stroke(); ctx.restore();
    regel(ctx, 'instelling (thermostaat)', X + 90, Y + 30, lg, C.goud, 28); regel(ctx, 'lichaamstemperatuur', X + 90, Y + 72, lg, C.koraal, 28);
    // fase-icoontjes onder de grafiek: rillen en vaatjes nauwer, of zweten
    const kd = q.on('koud', 1) * (1 - q.on('trager', 1)), zw = q.on('zweten', 1) * (1 - q.on('nadelen', 1));
    if (kd > 0.01) { ctx.save(); ctx.globalAlpha *= kd; for (let i = 0; i < 3; i++) { const sx = 520 + i * 26 + 4 * Math.sin(t * 30 + i); ctx.strokeStyle = '#9FC3E0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, 720); ctx.lineTo(sx, 790); ctx.stroke(); } regel(ctx, 'rillen', 560, 830, 1, '#9FC3E0', 26, 'center', 700);
      ctx.strokeStyle = BLD; ctx.lineWidth = lerp(18, 8, q.on('nauwer', 1)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 755); ctx.lineTo(900, 755); ctx.stroke(); regel(ctx, 'vaatjes in de huid nauwer', 830, 830, 1, BLD, 26, 'center', 700); ctx.restore(); }
    if (zw > 0.01) { ctx.save(); ctx.globalAlpha *= zw; for (let i = 0; i < 6; i++) { const v = (t * 0.6 + i / 6) % 1; ctx.fillStyle = rgba(VOCHTK, 1 - v); ctx.beginPath(); const sx = 640 + i * 40, sy = 720 + v * 70; ctx.moveTo(sx, sy - 12); ctx.quadraticCurveTo(sx + 9, sy + 2, sx, sy + 6); ctx.quadraticCurveTo(sx - 9, sy + 2, sx, sy - 12); ctx.fill(); } regel(ctx, 'zweten', 740, 830, 1, VOCHTK, 26, 'center', 700); ctx.restore(); }
    // rechts: hersenen met hypothalamus + de thermostaatknop
    const hs = q.on('Witte', 1), ht = q.on('hypothalamus', 1); brein(ctx, 1630, 310, 1.05, hs, ht, t); naamBij(ctx, 'hypothalamus', '', 1640, 450, ht, 'center', C.goud);
    for (let i = 0; i < 8; i++) { const v = ((t - q.at('stoffen')) * 0.35 + i / 8) % 1; if (!(t > q.at('stoffen'))) break; const st = q.on('stoffen', 1) * (1 - q.on('koud', 1)); const sx = lerp(1400, 1636, v), sy = lerp(560, 355, v) + Math.sin(v * 9 + i) * 14; circ(ctx, sx, sy, 6, rgba(WIT, st * Math.sin(v * 3.14))); }
    thermostaat(ctx, 1640, 690, 145, instG, lich(sim), q.on('hypothalamus', 1), q.on('eenenveertig', 1));
    wissel(ctx, q, [['witte bloedcellen → stoffen → hypothalamus', 'Witte', 1, WIT], ['thermostaat hoger: je vindt jezelf te koud', 'koud', 1, '#9FC3E0'], ['ziekteverwekkers trager, afweer beter', 'trager', 1, C.groen], ['koorts is een deel van de afweer', 'Koorts', 1, C.goud], ['thermostaat omlaag: te warm → zweten', 'omlaag', 1, C.koraal], ['nadelen: energie, vocht · boven 41 °C gevaarlijk', 'nadelen', 1, C.koraal]], 880, 140);
  },
  s17(ctx, t, q) { ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 600, W, H - 600);
    persoon(ctx, 'noor', 420, 960, 640, { outfit: 'zomer', uit: q.on('opgeruimd', 1) > 0.5 ? 'blij' : 'denkt', t });
    const ch = [['histamine: vaatjes wijder → rood, warm', 'Histamine', 1, BLD], ['doorlaatbaarder: vocht en witte bloedcellen → dik', 'doorlaten', 1, VOCHTK], ['fagocyten ruimen op', 'ruimden', 1, WIT], ['afweer op maat: volgende film', 'maat', 1, C.goud]];
    ctx.fillStyle = rgba('#0B0F16', 0.5 * q.on('Histamine', 1)); ctx.fillRect(800, 150, 1060, 560);
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1330, 260 + i * 120, col, q.on(w, n)));
  },
};
