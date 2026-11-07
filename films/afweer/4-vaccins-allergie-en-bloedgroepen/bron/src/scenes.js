// Afweer 4 · Vaccins, allergie en bloedgroepen — scènes per alinea. Versie 1.1 (20 okt 2026): beeld na feedback Kamiel.
const PERSON_LOOK = { skin: SKINS[1], hair: '#6B3F22', shirt: '#7A9A5E', hairStyle: 'long' };

function tag(ctx, s, x, y, col, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); const w = ctx.measureText(s).width + 44; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - 40, w, 56, 28); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(36, 600), C.text, 'center'); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 34, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
const VIR = '#E07A5F', BCOL = '#5BA4C9', TCOL = '#7FC48F', AS = '#E0B64A', WIT = '#D8DCE2', EIGEN = '#8C7BBF', BEEN = '#E6D8A8', LYMF = '#7FC48F';

function vormPad(ctx, k, s) { ctx.beginPath();
  if (k === 0) { ctx.moveTo(-s, s * 0.8); ctx.lineTo(0, -s); ctx.lineTo(s, s * 0.8); ctx.closePath(); }
  else if (k === 1) { ctx.rect(-s * 0.85, -s * 0.85, s * 1.7, s * 1.7); }
  else if (k === 2) { ctx.arc(0, 0, s, 0, 6.283); }
  else if (k === 3) { ctx.moveTo(0, -s * 1.1); ctx.lineTo(s, 0); ctx.lineTo(0, s * 1.1); ctx.lineTo(-s, 0); ctx.closePath(); }
  else if (k === 4) { for (let i = 0; i < 6; i++) { const an = i * 1.047; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(an) * s, Math.sin(an) * s); } ctx.closePath(); }
  else if (k === 5) { ctx.moveTo(-s, s); ctx.lineTo(-s, -s * 0.2); ctx.lineTo(0, -s); ctx.lineTo(s, -s * 0.2); ctx.lineTo(s, s); ctx.closePath(); }
  else { ctx.moveTo(-s, s); ctx.lineTo(-s * 0.3, -s); ctx.lineTo(s, -s * 0.4); ctx.lineTo(s * 0.6, s); ctx.closePath(); } }
const VORMKL = ['#F2C0A8', '#9FD6C8', '#F0D78C', '#C9B8F0', '#F2A8B8', '#A8C8F2', '#D8E6A0'];
function sleutel(ctx, x, y, k, s = 12, ang = 0, a = 1, col = BCOL, glow = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, s * 2.4); ctx.lineTo(0, s * 1.2); ctx.stroke();
  ctx.save(); ctx.scale(1.25, 1.25); vormPad(ctx, k, s); ctx.restore(); ctx.strokeStyle = glow > 0.01 ? lighten(col, 0.5 * glow) : col; ctx.lineWidth = 3.5 + 3 * glow; ctx.stroke(); ctx.restore(); }
function bCel(ctx, x, y, r, k, t = 0, o = {}) { const { a = 1, col = BCOL, rec = 1, n = 8, glow = 0, seed = 2, label = '', soort = 'b' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2); g.addColorStop(0, rgba(AS, 0.35 * glow)); g.addColorStop(1, rgba(AS, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, 6.283); ctx.fill(); }
  if (rec > 0.01 && soort !== 'plasma') for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.3; sleutel(ctx, x + Math.cos(an) * r * 1.25, y + Math.sin(an) * r * 1.25, k, r * 0.13, an + 1.571, rec, col, glow); }
  blob(ctx, x, y, r, r * 0.95, 0.06, seed, t); shape(ctx, rgba(col, soort === 'geheugen' ? 0.45 : 0.28), col, 2.5);
  if (soort === 'plasma') { ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x + r * 0.25, y, r * (0.35 + i * 0.13), -1.6, 1.6); ctx.stroke(); } circ(ctx, x - r * 0.5, y, r * 0.28, rgba(C.kern, 0.6), C.kernR, 1.2); }
  else circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (soort === 'geheugen') { ctx.fillStyle = C.goud; ctx.font = fTekst(Math.round(r * 0.6), 700); ctx.textAlign = 'center'; ctx.fillText('★', x, y + r * 0.22); }
  if (label) text(ctx, label, x, y + r * 1.5 + 34, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function antistof(ctx, x, y, s = 1, ang = 0, a = 1, col = AS) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(0, 0); ctx.moveTo(0, 0); ctx.lineTo(-32, -42); ctx.moveTo(0, 0); ctx.lineTo(32, -42); ctx.stroke();
  ctx.fillStyle = lighten(col, 0.45); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 36, -47, 9, 0, 6.283); ctx.fill(); } ctx.restore(); }
function fagocyt(ctx, x, y, r, t, o = {}) { const { a = 1, arm = 0, tx = x + r * 2, ty = y, seed = 3, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (arm > 0.01) { const an = Math.atan2(ty - y, tx - x); for (const d of [-0.45, 0.45]) { const ex = x + Math.cos(an + d) * r * (1 + 0.9 * arm), ey = y + Math.sin(an + d) * r * (1 + 0.9 * arm); ctx.beginPath(); ctx.moveTo(x + Math.cos(an + d * 2.2) * r * 0.8, y + Math.sin(an + d * 2.2) * r * 0.8); ctx.quadraticCurveTo(ex, ey, x + Math.cos(an) * r * (1 + 1.1 * arm), y + Math.sin(an) * r * (1 + 1.1 * arm)); ctx.lineTo(x, y); ctx.closePath(); ctx.fillStyle = rgba(WIT, 0.55); ctx.fill(); } }
  blob(ctx, x, y, r, r * 0.9, 0.08, seed, t); shape(ctx, rgba(WIT, 0.55), WIT, 2.5);
  for (const [dx, dy] of [[-0.25, -0.1], [0.05, 0.15], [0.3, -0.05]]) circ(ctx, x + dx * r, y + dy * r, r * 0.17, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (label) text(ctx, label, x, y + r + 40, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
function vonk(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { const an = i * 0.785 + t; const r0 = 14, r1 = 30 + 6 * Math.sin(t * 4 + i); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); } ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }


const TK = '#3E9E6A', RNAK = '#F0D78C', MHCK = '#C9D2DE';
function lCel(ctx, x, y, r, t, o = {}) { const { a = 1, geinf = 0, toon = 0, eigenToon = 0, kapot = 0, nieuw = 0, gaatjes = 0, col = EIGEN, seed = 4, mhc = 0, mhcCol = MHCK } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kapot > 0.01) { for (let i = 0; i < 9; i++) { const an = i * 0.7 + hash(i) * 0.4; const d = r * (0.3 + 0.9 * kapot * hash(i * 5)); ctx.save(); ctx.globalAlpha *= 1 - 0.6 * kapot; blob(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * (0.45 - 0.25 * kapot), r * (0.4 - 0.22 * kapot), 0.1, i, t); shape(ctx, rgba(col, 0.3), col, 2); ctx.restore(); } ctx.restore(); return; }
  blob(ctx, x, y, r, r * 0.9, 0.04, seed, t); shape(ctx, rgba(col, 0.2), col, 2.5); circ(ctx, x - r * 0.15, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  if (geinf > 0.01) { ctx.save(); ctx.globalAlpha *= geinf; ctx.strokeStyle = RNAK; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = x - r * 0.3 + u * r * 0.3, py = y + Math.sin(u * 14 + t * 2) * r * 0.08; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  const nv = Math.round(10 * nieuw); for (let i = 0; i < nv; i++) { const an = hash(i * 9) * 6.283, d = r * (0.45 + 0.35 * hash(i * 4)); virus(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.9, r * 0.07, [3], t, { rot: i }); }
  const n = 10; for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.2; const px = x + Math.cos(an) * r * 1.0, py = y + Math.sin(an) * r * 0.9; const vir = i % 2 === 0;
    const al = vir ? toon : eigenToon; if (al > 0.01 || mhc > 0.01) { ctx.save(); ctx.translate(px, py); ctx.rotate(an + 1.571); ctx.globalAlpha *= Math.max(al, mhc); ctx.strokeStyle = mhcCol; ctx.lineWidth = 4; ctx.beginPath(); if (mhcCol === MHCK) { ctx.moveTo(-11, 6); ctx.lineTo(-11, -10); ctx.moveTo(11, 6); ctx.lineTo(11, -10); } else { ctx.moveTo(-12, 6); ctx.lineTo(-4, -12); ctx.moveTo(12, 6); ctx.lineTo(4, -12); } ctx.stroke(); ctx.globalAlpha *= al / Math.max(al, mhc, 0.01); ctx.fillStyle = vir ? VIR : EIGEN; roundRect(ctx, -8, -16, 16, 12, 4); ctx.fill(); ctx.restore(); } }
  if (gaatjes > 0.01) for (let i = 0; i < 5; i++) { const an = -0.6 + i * 0.3; circ(ctx, x + Math.cos(an) * r * 0.97, y + Math.sin(an) * r * 0.87, 9, rgba(C.bgMicro, gaatjes), rgba(TK, gaatjes), 2); }
  ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1, ang = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -60, -24, 120, 48, 24); shape(ctx, '#E6E1D3', '#9AA3B2', 2); ctx.fillStyle = C.koraal; roundRect(ctx, 0, -24, 60, 48, 24); ctx.fill(); ctx.fillRect(0, -24, 20, 48); ctx.restore(); }
const HIST = '#C9A35C', BLD = '#B5574A', VOCHTK = '#5BA4C9';
function rodeBC(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C9483E', '#E07A6E', 1.2); ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18); ctx.fill(); ctx.restore(); }
function mestcel(ctx, x, y, r, a = 1, los = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.85, 0.05, 7, t); shape(ctx, rgba(HIST, 0.25), HIST, 2); circ(ctx, x, y, r * 0.3, rgba(C.kern, 0.6), C.kernR, 1.2);
  for (let i = 0; i < 10; i++) { const an = hash(i) * 6.283, rr = r * (0.45 + 0.3 * hash(i * 3)); const out = los * (0.6 + 1.6 * ((t * 0.3 + hash(i * 7)) % 1)); circ(ctx, x + Math.cos(an) * (rr + out * r), y + Math.sin(an) * (rr + out * r), 4.5, rgba(HIST, 0.9 * (1 - Math.min(1, out * 0.35)))); }
  ctx.restore(); }
function haarvat(ctx, x0, x1, y, w, t, o = {}) { const { lek = 0, wbc = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 * w;
  ctx.fillStyle = rgba(BLD, 0.25 + 0.15 * (w - 1)); ctx.fillRect(x0, y - h, x1 - x0, 2 * h); ctx.strokeStyle = lighten(BLD, 0.2); ctx.lineWidth = 4; if (lek > 0.01) ctx.setLineDash([26, 10 * lek + 2]); ctx.beginPath(); ctx.moveTo(x0, y - h); ctx.lineTo(x1, y - h); ctx.moveTo(x0, y + h); ctx.lineTo(x1, y + h); ctx.stroke(); ctx.setLineDash([]);
  const n = Math.round(6 + 6 * (w - 1)); for (let i = 0; i < n; i++) { const v = (t * 0.15 * (1 + 0.6 * (w - 1)) + i / n) % 1; rodeBC(ctx, lerp(x0, x1, v), y + (hash(i) - 0.5) * h * 1.1, 15); }
  for (let i = 0; i < 8; i++) { const v = (t * 0.25 + i / 8) % 1; circ(ctx, x0 + hash(i * 3) * (x1 - x0), y - h - v * 140 * lek, 5, rgba(VOCHTK, 0.8 * lek * (1 - v))); }
  ctx.restore(); }

function antiY(ctx, x, y, s, ang, k, a = 1) { antistof(ctx, x, y, s, ang, a, k === 'A' ? KA : k === 'B' ? KB : KD); }
function spuit(ctx, x, y, s = 1, ang = -0.6, a = 1, vul = '#9FC3E0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -90, -18, 150, 36, 6); shape(ctx, rgba('#E6E1D3', 0.5), '#E6E1D3', 2); ctx.fillStyle = rgba(vul, 0.7); ctx.fillRect(-60, -14, 110, 28); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-120, -6, 30, 12); ctx.fillRect(-126, -22, 8, 44); ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(120, 0); ctx.stroke(); ctx.restore(); }
function stuifmeel(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const an = i * 0.449 + t * 0.2; ctx.strokeStyle = POL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.stroke(); } circ(ctx, x, y, r, rgba(POL, 0.7), lighten(POL, 0.3), 2); ctx.restore(); }
function immuunTabel(ctx, x, y, cells, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = 380, ch = 110;
  regel(ctx, 'natuurlijk', x + cw * 1.5, y - 20, 1, C.text2, 28, 'center', 700); regel(ctx, 'kunstmatig', x + cw * 2.5, y - 20, 1, C.text2, 28, 'center', 700);
  ['actief', 'passief'].forEach((r, i) => { regel(ctx, r, x + cw - 20, y + ch * i + 66, 1, C.text2, 28, 'right', 700); for (let j = 0; j < 2; j++) { roundRect(ctx, x + cw * (1 + j) + 6, y + ch * i + 6, cw - 12, ch - 12, 12); shape(ctx, rgba(C.fill, 0.6), rgba(C.line, 0.5), 1.5); const c = cells[i * 2 + j]; if (c && c[1] > 0.01) regel(ctx, c[0], x + cw * (1.5 + j), y + ch * i + 66, c[1], c[2] || C.text, 28, 'center', 700); } });
  ctx.restore(); }
function prikCurve(s) { const p = s < 0.3 ? 0 : (s < 2 ? 12 * Math.exp(-Math.pow((s - 2) / 0.7, 2)) : 3 + 9 * Math.exp(-(s - 2) * 0.9)); if (s < 6) return p; const sec = s < 6.8 ? Math.max(3, 100 * Math.exp(-Math.pow((s - 6.8) / 0.35, 2))) : 25 + 75 * Math.exp(-(s - 6.8) * 0.5); return sec; }
function serumCurve(s) { return s < 0.15 ? 600 * s : 90 * Math.exp(-(s - 0.15) * 0.22); }

// ===== versie 1.1 (20 okt 2026): helpers uit film 1 + nieuwe procesfiguren =====
grainCanvas = document.createElement('canvas'); grainCanvas.width = 1; grainCanvas.height = 1; // geen korrels (beeldafspraak)
const BACT = VIR;
// antigeen (film 1): driehoekje met de basis óp het oppervlak en de punt naar buiten (normaal nx, ny)
function antigeen(ctx, x, y, nx, ny, k = 1, a = 1, col = '#F2C0A8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tx = -ny, ty = nx, b = 5.5 * k, h = 8 * k;
  ctx.beginPath(); ctx.moveTo(x - tx * b, y - ty * b); ctx.lineTo(x + nx * h, y + ny * h); ctx.lineTo(x + tx * b, y + ty * b); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// bacterie (film 1): staafje met antigenen rondom, allemaal loodrecht op de wand
function bacterie(ctx, x, y, s = 1, ang = 0, a = 1, kapot = 0, kl = BACT, ag = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.7 * kapot); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if (ag > 0.01 && kl === BACT) { for (const px of [-12, 0, 12]) { antigeen(ctx, px, -11, 0, -1, 1, ag); antigeen(ctx, px + 6, 11, 0, 1, 1, ag); } for (const [cx, an] of [[15, -0.7], [15, 0.7], [-15, Math.PI - 0.7], [-15, Math.PI + 0.7]]) antigeen(ctx, cx + Math.cos(an) * 11, Math.sin(an) * 11, Math.cos(an), Math.sin(an), 1, ag); }
  roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, kl === BACT ? '#B9614D' : rgba(kl, 0.75), lighten(kl, 0.3), 1.5 / s);
  ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.bezierCurveTo(-4, -5, 4, 5, 12, 0); ctx.stroke();
  ctx.restore(); }
// punt van een antigeen bovenop de bacterie (i = 0, 1, 2), in wereldcoördinaten, met de normaal
function bactTop(x, y, s, ang, i) { const lx = -12 + i * 12, ly = -19, c = Math.cos(ang), sn = Math.sin(ang); return { x: x + (lx * c - ly * sn) * s, y: y + (lx * sn + ly * c) * s, nx: sn, ny: -c }; }
// T-cel (film 1): rond, met een receptor in een vaste vorm (0 = past bij het driehoekje); col en rot (receptor wijst naar -x na draaien) toegevoegd
function tCel(ctx, x, y, r, vorm, a = 1, gloed = 0, col = C.groen, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (gloed > 0.01) { const g = ctx.createRadialGradient(x, y, r, x, y, r * 2.6); g.addColorStop(0, rgba(col, 0.55 * gloed)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, 6.283); ctx.fill(); }
  circ(ctx, x, y, r, rgba(col, 0.35 + 0.35 * gloed), col, 2); circ(ctx, x, y, r * 0.55, rgba(C.kern, 0.7), C.kernR, 1);
  ctx.fillStyle = col; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.translate(-r, 0); ctx.scale(r / 40, r / 40); ctx.beginPath();
  if (vorm === 0) { ctx.moveTo(-14, -9); ctx.lineTo(-14, 9); ctx.lineTo(-4, 9); ctx.lineTo(-11, 0); ctx.lineTo(-4, -9); ctx.closePath(); }
  else if (vorm === 1) { ctx.rect(-14, -9, 4, 18); ctx.rect(-10, -9, 6, 4); ctx.rect(-10, 5, 6, 4); }
  else { ctx.moveTo(-4, -10); ctx.lineTo(-14, -10); ctx.lineTo(-14, 10); ctx.lineTo(-4, 10); ctx.arc(-4, 0, 6, 1.57, -1.57, true); ctx.closePath(); }
  ctx.fill(); ctx.restore(); ctx.restore(); }
// één tekstbalk tegelijk (film 1)
function wissel(ctx, q, rij, x, y) { let k = -1; rij.forEach((r, i) => { if (q.on(r[1], r[2] || 1) > 0) k = i; }); if (k < 0) return; const u = q.on(rij[k][1], rij[k][2] || 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][3], 1 - u / 0.4); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][3], (u - 0.35) / 0.65); }

// vormpje (A, B, D, virus-eiwit …) met de basis óp het oppervlak (x, y) en de punt langs de normaal
const OPP_OFF = [0.8, 0.85, 1, 1.1, 1, 1, 1], TIP = [1.8, 1.7, 2, 2.2, 2, 2, 2];
function opp(ctx, x, y, nx, ny, k, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const o = OPP_OFF[k] * s; ctx.translate(x + nx * o, y + ny * o); ctx.rotate(Math.atan2(ny, nx) + 1.5708); vormPad(ctx, k, s); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// normaal op een ellips (rx, ry) bij hoek an
function ellN(rx, ry, an) { let nx = Math.cos(an) / rx, ny = Math.sin(an) / ry; const L = Math.hypot(nx, ny); return [nx / L, ny / L]; }
// antistof die met een bindplaats (armpunt) precies óp de punt (tx, ty) van een antigeen zit; u = 0 ver weg … 1 gebonden
function bindY(ctx, tx, ty, nx, ny, sc, col = AS, a = 1, u = 1, arm = 1) { if (a <= 0.01) return; const d = (1 - u) * 200; const bx = tx + nx * (9 * sc + d), by = ty + ny * (9 * sc + d); const ang = Math.atan2(-nx, ny) + (1 - u) * 0.9;
  const ax = 36 * arm * sc, ay = -47 * sc, c = Math.cos(ang), s = Math.sin(ang); antistof(ctx, bx - (ax * c - ay * s), by - (ax * s + ay * c), sc, ang, a, col); }
// antistof met de steel óp een celoppervlak (IgE op de mestcel), armen naar buiten; geeft de twee armpunten terug
function ySteel(ctx, x, y, nx, ny, sc, a = 1, col = AS) { const cx = x + nx * 50 * sc, cy = y + ny * 50 * sc; antistof(ctx, cx, cy, sc, Math.atan2(nx, -ny), a, col);
  return [[cx + nx * 47 * sc - ny * 36 * sc, cy + ny * 47 * sc + nx * 36 * sc], [cx + nx * 47 * sc + ny * 36 * sc, cy + ny * 47 * sc - nx * 36 * sc]]; }
// antistof als brug tussen twee bindplaatsen p1 en p2 (agglutinatie): elke arm op een antigeen van een andere cel
function brugY(ctx, p1, p2, col, a = 1, kant = 1) { if (a <= 0.01) return; const dx = p2[0] - p1[0], dy = p2[1] - p1[1], L = Math.hypot(dx, dy) || 1, sc = L / 72, ang = Math.atan2(dy, dx) + (kant < 0 ? 0 : 0);
  const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2, s = Math.sin(ang), c = Math.cos(ang); const k = kant; antistof(ctx, mx - k * 47 * sc * s, my + k * 47 * sc * c, sc, ang + (k < 0 ? Math.PI : 0), a, col); }

// virus: bolletje met steeltjes; op elk steeltje een antigeen met de basis erop en de punt naar buiten; binnenin een slierje RNA
function virus(ctx, x, y, r, ks, t = 0, o = {}) { const { a = 1, col = VIR, rot = 0, ast = null, agA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.max(10, ks.length * 5), s = r * 0.12;
  for (let i = 0; i < n; i++) { const an = rot + i * 6.283 / n, c = Math.cos(an), sn = Math.sin(an); ctx.strokeStyle = lighten(col, 0.25); ctx.lineWidth = Math.max(2, r * 0.07); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + c * r, y + sn * r); ctx.lineTo(x + c * r * 1.16, y + sn * r * 1.16); ctx.stroke();
    const k = ks[i % ks.length]; opp(ctx, x + c * r * 1.16, y + sn * r * 1.16, c, sn, k, s, VORMKL[k % VORMKL.length], agA); }
  circ(ctx, x, y, r, rgba(col, 0.78), lighten(col, 0.3), 2);
  ctx.strokeStyle = rgba(RNAK, 0.75); ctx.lineWidth = Math.max(1.5, r * 0.035); ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, aa = u * 10 + rot * 2, rr = r * (0.12 + 0.5 * u); const px = x + Math.cos(aa) * rr, py = y + Math.sin(aa) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (ast) for (let i = 0; i < n; i++) { const v = ast(i); if (v <= 0.01) continue; const an = rot + i * 6.283 / n, c = Math.cos(an), sn = Math.sin(an), k = ks[i % ks.length], tip = r * 1.16 + TIP[k] * s; bindY(ctx, x + c * tip, y + sn * tip, c, sn, r * 0.006, AS, v, 1); }
  ctx.restore(); }

// ---------- bloedgroepen ----------
const KA = '#5B9BEA', KB = '#D9A21E', KD = '#2DB585', RBC = '#C9483E', POL = '#E8C547';
// plekken van de antigenen op een rode bloedcel (ellips r × 0.92 r): basis, normaal, punt
function rbcPunten(x, y, r, typ, rh) { const ks = []; if (typ.includes('A')) ks.push([0, KA]); if (typ.includes('B')) ks.push([1, KB]); if (rh) ks.push([2, KD]); const out = []; if (!ks.length) return out; const n = 12, s = r * 0.1;
  for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.13, [nx, ny] = ellN(r, r * 0.92, an), [k, col] = ks[i % ks.length]; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r * 0.92; out.push({ x: px, y: py, nx, ny, k, col, s, tx: px + nx * TIP[k] * s, ty: py + ny * TIP[k] * s }); } return out; }
// rode bloedcel met antigenen rondom, loodrecht op het membraan; kapot = membraan scheurt en de inhoud lekt weg
function rbcAg(ctx, x, y, r, typ, o = {}) { const { a = 1, rh = false, kapot = 0, ag = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kapot > 0.01) for (let i = 0; i < 12; i++) { const an = hash(i * 7 + r) * 6.283, d = r * (0.6 + 1.2 * kapot * hash(i * 3 + 1)); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.92, r * 0.07 * (1 + hash(i)), rgba(RBC, 0.7 * Math.min(1, kapot * 2) * (1 - 0.6 * kapot))); }
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.92, 0, 0, 6.283); ctx.fillStyle = rgba(RBC, 1 - 0.8 * kapot); ctx.fill(); ctx.strokeStyle = '#E07A6E'; ctx.lineWidth = 2; if (kapot > 0.01) ctx.setLineDash([r * 0.5, r * 0.25 * kapot + 1]); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.ellipse(x, y, r * 0.45, r * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.18 * (1 - kapot)); ctx.fill();
  if (ag > 0.01) rbcPunten(x, y, r, typ, rh).forEach(p => opp(ctx, p.x, p.y, p.nx, p.ny, p.k, p.s, p.col, ag * (1 - 0.5 * kapot)));
  ctx.restore(); }
// het antigeen van cel 1 dat het meest naar cel 2 wijst (voor een brug)
function naarElkaar(p1s, x2, y2) { let best = null, bd = -9; for (const p of p1s) { const dx = x2 - p.x, dy = y2 - p.y, L = Math.hypot(dx, dy), d = (p.nx * dx + p.ny * dy) / L; if (d > bd) { bd = d; best = p; } } return best; }
function bruggen(ctx, cellen, r, typ, col, a, maxD) { if (a <= 0.01) return; for (let i = 0; i < cellen.length; i++) for (let j = i + 1; j < cellen.length; j++) { const [x1, y1] = cellen[i], [x2, y2] = cellen[j]; if (Math.hypot(x2 - x1, y2 - y1) > maxD) continue;
  const p = naarElkaar(rbcPunten(x1, y1, r, typ, false), x2, y2), q2 = naarElkaar(rbcPunten(x2, y2, r, typ, false), x1, y1); if (!p || !q2) continue; const sc = Math.hypot(q2.tx - p.tx, q2.ty - p.ty) / 72;
  brugY(ctx, [p.tx + p.nx * 9 * sc, p.ty + p.ny * 9 * sc], [q2.tx + q2.nx * 9 * sc, q2.ty + q2.ny * 9 * sc], col, a, ((i + j) % 2) ? 1 : -1); } }
function antiY(ctx, x, y, s, ang, k, a = 1) { antistof(ctx, x, y, s, ang, a, k === 'A' ? KA : k === 'B' ? KB : KD); }
const KCOL = { A: KA, B: KB, D: KD };

// ---------- personages ----------
// GGD-prikpost: Dr. Kim (links) geeft Noor (rechts) een prik in de bovenarm
function prikpost(ctx, t, o = {}) { const { prik = 0, kaart = 0, noorX = 1060, uitN = 'neutraal', uitK = 'blij' } = o;
  ctx.fillStyle = '#3A4A5C'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#56606E'; ctx.fillRect(0, 760, W, H - 760); ctx.fillStyle = rgba('#FFFFFF', 0.06); ctx.fillRect(0, 300, W, 12);
  roundRect(ctx, 160, 160, 420, 150, 10); shape(ctx, '#2A3A58', '#8FA0B5', 3); regel(ctx, 'GGD · prikpost', 370, 250, 1, C.text2, 30, 'center', 700);
  roundRect(ctx, 140, 560, 380, 30, 6); shape(ctx, '#8C6A44', '#6B4E3A', 2); ctx.fillStyle = '#6B4E3A'; ctx.fillRect(170, 590, 14, 170); ctx.fillRect(476, 590, 14, 170);
  roundRect(ctx, 200, 510, 90, 50, 8); shape(ctx, '#E6E1D3', '#9AA3B2', 2); circ(ctx, 380, 540, 18, '#F2F2EE', '#9AA3B2', 2);
  const k = persoon(ctx, 'kim', 640, 900, 500, { uit: uitK, t, pose: 'vasthouden' });
  persoon(ctx, 'noor', noorX, 900, 470, { uit: uitN, t, kijk: -1 });
  const hand = k.handR || { x: 870, y: 600 }, doelX = noorX - 62, doelY = 600; // bovenarm van Noor
  const tip = 66, sx = lerp(hand.x + 20, doelX - tip, prik), sy = lerp(hand.y, doelY, prik); spuit(ctx, sx, sy, 0.55, 0, 1);
  if (kaart > 0.01) { ctx.save(); ctx.globalAlpha *= kaart; ctx.translate(noorX + 270, 520); ctx.rotate(0.08); roundRect(ctx, -150, -80, 300, 160, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); text(ctx, 'tweede prik', 0, -20, fTekst(30, 700), '#1A2740', 'center'); text(ctx, 'over een half jaar', 0, 26, fTekst(26, 600), '#1A2740', 'center'); ctx.restore(); }
}
// telpoppetje voor de groepsimmuniteit (pictogram, mag volgens de beeldafspraken)
function poppetje(ctx, x, y, s, col, a = 1, schild = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - 26 * s, 11 * s, col); roundRect(ctx, x - 12 * s, y - 12 * s, 24 * s, 34 * s, 10 * s); ctx.fillStyle = col; ctx.fill();
  if (schild > 0.01) { ctx.globalAlpha *= schild; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 4 * s, 30 * s, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// Dr. Kim (gewone kleren) als zwangere moeder, met een kijkje in de buik: baarmoeder, placenta, baby
function moederBuik(ctx, x, voet, h, t, o = {}) { const { a = 1, baby = 1, uit = 'neutraal', babyA = 1 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const r = persoon(ctx, 'kim', x, voet, h, { outfit: 'gewoon', uit, t }); const hh = h * 1.02 / 6.1, top = voet - h * 1.02, by = top + 2.95 * hh;
  ctx.beginPath(); ctx.ellipse(x, by, 0.86 * hh, 0.82 * hh, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.55); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, by + 0.05 * hh, 0.74 * hh, 0.66 * hh, 0, 0, 6.283); shape(ctx, rgba('#E8A0B0', 0.22), '#E8A0B0', 2.5);
  const px = x + 0.42 * hh, py = by - 0.42 * hh; ctx.strokeStyle = '#B5574A'; ctx.lineWidth = 0.16 * hh; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, by + 0.05 * hh, 0.6 * hh, -1.35, -0.35); ctx.stroke();
  if (baby * babyA > 0.01) { ctx.save(); ctx.globalAlpha *= baby * babyA; const hb = 1.45 * hh, u = hb / 10; ctx.strokeStyle = '#D98A9A'; ctx.lineWidth = 0.05 * hh; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(x + 0.3 * hh, by + 0.1 * hh, x + 0.12 * hh, by + 0.12 * hh); ctx.stroke(); persoon(ctx, 'baby', x + 0.08 * hh, by + 0.05 * hh + 1.7 * u, hb, { t, uit: 'slaapt' }); ctx.restore(); }
  ctx.restore(); return { placenta: { x: px, y: py }, hh, buik: { x, y: by }, top, hoofd: r.hoofd, arm: { x: x - 0.4 * 1.95 * hh - 0.1 * hh, y: top + 1.95 * hh } }; }
// bloedzak met alleen rode bloedcellen
function bloedzak(ctx, x, y, s, a = 1, t = 0, tekst = 'O · rode bloedcellen') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 160); ctx.quadraticCurveTo(0, 230, 60, 250); ctx.stroke();
  roundRect(ctx, -110, -170, 220, 340, 34); shape(ctx, rgba('#E6E1D3', 0.25), '#E6E1D3', 3); roundRect(ctx, -20, -200, 40, 34, 10); shape(ctx, null, '#E6E1D3', 3);
  ctx.save(); roundRect(ctx, -102, -90, 204, 252, 28); ctx.clip(); ctx.fillStyle = rgba(RBC, 0.55); ctx.fillRect(-110, -90, 220, 260); for (let i = 0; i < 16; i++) { const px = -80 + hash(i * 3) * 160, py = -60 + hash(i * 5) * 200 + 4 * Math.sin(t + i); rodeBC(ctx, px, py, 15); } ctx.restore();
  roundRect(ctx, -96, -158, 192, 64, 8); shape(ctx, '#F2F2EE', null); text(ctx, 'O', 0, -130, fTekst(26, 700), '#1A2740', 'center'); text(ctx, 'rode bloedcellen', 0, -104, fTekst(18, 700), '#1A2740', 'center'); ctx.restore(); }
const HUID4 = '#E8C2A4';
function hexPath(ctx, x, y, r) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.52; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); }

// eiwitketen (kralen) die uit een ribosoom komt en opvouwt; u = 0..1 lengte, f = opvouwen
function eiwitKeten(ctx, x, y, n, u, f, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const m = Math.floor(n * u); const pts = [];
  for (let i = 0; i < m; i++) { const lx = x - i * 14, ly = y - i * 4 + Math.sin(i * 0.9 + t) * 6; const an = i * 1.1, rr = 8 + i * 1.6; pts.push([lerp(lx, x - 40 + Math.cos(an) * rr, f), lerp(ly, y - 40 + Math.sin(an) * rr, f)]); }
  ctx.strokeStyle = rgba(VORMKL[0], 0.7); ctx.lineWidth = 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); pts.forEach((p, i) => circ(ctx, p[0], p[1], 6, i % 3 ? VORMKL[0] : lighten(VORMKL[0], 0.3))); ctx.restore(); }
// mRNA als dunne slier; breuk = in stukjes uiteen
function mrna(ctx, x, y, L, t, a = 1, breuk = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.8 * breuk); ctx.strokeStyle = RNAK; ctx.lineWidth = 4; ctx.lineCap = 'round'; const N = 40;
  for (let st = 0; st < 5; st++) { const dx = (st - 2) * 30 * breuk, dy = Math.sin(st * 2.3) * 40 * breuk; ctx.beginPath(); for (let i = 0; i <= N / 5; i++) { const k = st * N / 5 + i, u = k / N; const px = x + u * L + dx, py = y + Math.sin(u * 14 + t * 1.5) * 10 + dy; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
function ribosoom(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y - 14, 26, 16, 0, 0, 6.283); shape(ctx, '#9FC3E0', null); ctx.beginPath(); ctx.ellipse(x, y + 12, 20, 12, 0, 0, 6.283); shape(ctx, '#7FA8CC', null); ctx.restore(); }
// antistof die van (fx, fy) naar een plek met de steel op een oppervlak vliegt (u 0..1)
function yNaarSteel(ctx, fx, fy, x, y, nx, ny, sc, u, a = 1, col = AS) { if (a <= 0.01) return null; if (u >= 0.999) return ySteel(ctx, x, y, nx, ny, sc, a, col); const cx = x + nx * 50 * sc, cy = y + ny * 50 * sc;
  const e = ease(u), px = lerp(fx, cx, e), py = lerp(fy, cy, e) - Math.sin(e * 3.14) * 60; antistof(ctx, px, py, sc, Math.atan2(nx, -ny) + (1 - e) * 2.5, a * Math.min(1, u * 6), col); return null; }

const SCENES = {
  title(ctx, t) { bg(ctx, 'micro'); const cx = 1500, cy = 470;
    rbcAg(ctx, cx - 120, cy - 80, 80, 'A', { rh: true }); rbcAg(ctx, cx + 110, cy + 60, 80, 'B'); rbcAg(ctx, cx - 60, cy + 180, 70, 'O');
    for (let i = 0; i < 5; i++) { const u = (t * 0.1 + i / 5) % 1; antiY(ctx, cx + 260 - u * 140, cy - 200 + i * 80, 0.5, -1.2 + u, i % 2 ? 'A' : 'B', Math.min(1, (1 - u) * 3)); }
    spuit(ctx, cx - 300, cy - 230, 0.9, 0.5); },

  s01(ctx, t, q) { const w = q.on('Waarom', 1); prikpost(ctx, t, { prik: ramp(t, q.at('prik'), 1.5), kaart: q.on('kaartje', 1), uitN: w > 0.5 ? 'denkt' : 'neutraal' });
    vraagteken(ctx, 1060, 290, w, 140); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('vaccin', 1), p3 = q.on('recept', 1);
    if (1 - p2 > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - p2; const gh = q.on('geheugencellen', 1), nd = ramp(t, q.at('geheugencellen') + 0.4, 1.6);
      const vx = lerp(620, 1040, nd), vy = 450; virus(ctx, vx, vy, 90, [0], t, { rot: t * 0.05 });
      naamBij(ctx, 'antigenen', 'vormpjes op het virus', 560, 300, q.on('antigenen', 1) * (1 - gh), 'right', VORMKL[0]);
      bCel(ctx, 1320, 450, 110, 0, t, { soort: 'geheugen', a: gh, glow: nd, rot: 0 }); naamBij(ctx, 'geheugencel', 'receptor past op het antigeen', 1320, 660, gh, 'center', BCOL);
      ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3);
      spuit(ctx, 960, 210, 1.2, 0); regel(ctx, 'vaccin: antigenen, maar je wordt niet ziek', 960, 310, q.on('ziek', 2), C.text, 30, 'center', 700);
      const it = [['verzwakt', 'verzwakte', (x, y) => virus(ctx, x, y, 46, [0], t, { a: 0.5 })], ['gedood', 'gedode', (x, y) => { virus(ctx, x, y, 46, [0], t); kruis(ctx, x, y, 34, 1, C.text2); }],
        ['een stukje', 'stukje', (x, y) => { for (let i = 0; i < 3; i++) { const px = x - 50 + i * 50, py = y + 8 * Math.sin(t + i); ctx.strokeStyle = lighten(VIR, 0.25); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px, py + 18); ctx.lineTo(px, py); ctx.stroke(); opp(ctx, px, py, 0, -1, 0, 14, VORMKL[0]); } }],
        ['onschadelijk gif', 'gif', (x, y) => { for (let i = 0; i < 3; i++) { const px = x - 50 + i * 50; hexPath(ctx, px, y + 8 * Math.sin(t + i), 16); shape(ctx, rgba(C.paars, 0.5), C.paars, 2); } vink(ctx, x + 60, y - 50, 16); }],
        ['mRNA: recept', 'mRNA', (x, y) => mrna(ctx, x - 60, y, 120, t)]];
      it.forEach(([lab, w, dr], i) => { const x = 260 + i * 350, y = 560, al = q.on(w, 1); if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x - 150, y - 110, 300, 250, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); dr(x, y - 10); regel(ctx, lab, x, y + 110, 1, C.text, 28, 'center', 700); ctx.restore(); } });
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; const br = ramp(t, q.at('breken'), 1.5), dna = q.on('DNA', 1), mk = ramp(t, q.at('eiwit', 1), 2.5), opv = ramp(t, q.at('maken'), 1.5);
      const X = 900, Y = 470, R = 230; lCel(ctx, X, Y, R, t, { col: EIGEN });
      // kern met chromatine; bij 'DNA' licht hij op
      ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * dna; ctx.strokeStyle = C.kernR; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, px = X - 0.15 * R - 50 + u * 100, py = Y - 30 + k * 20 + Math.sin(u * 9 + k * 2 + t * 0.5) * 8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
      naamBij(ctx, 'DNA', 'blijft in de kern', X, Y + 0.9 * R + 64, dna, 'center', C.kernR);
      const mx = 960, my = 360; mrna(ctx, mx, my, 140, t, 1 - br * 0.2, br); naamBij(ctx, 'mRNA', 'recept', mx + 70, my - 50, (1 - br), 'center', RNAK);
      const rx = mx + 20 + 110 * mk; ribosoom(ctx, rx, my, mk > 0.01 ? 1 - br : 0); eiwitKeten(ctx, rx - 10, my + 40, 12, mk, opv, t, (1 - opv) * (mk > 0.01 ? 1 : 0));
      for (let i = 0; i < 9; i++) { const an = -1.25 + i * 0.7, [nx, ny] = ellN(R, R * 0.9, an), px = X + Math.cos(an) * R * 1.0, py = Y + Math.sin(an) * R * 0.9; ctx.strokeStyle = lighten(VIR, 0.25); ctx.lineWidth = 4; const g = clamp(opv * 9 - i * 0.6, 0, 1); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + nx * 18, py + ny * 18); ctx.stroke(); opp(ctx, px + nx * 18, py + ny * 18, nx, ny, 0, 16, VORMKL[0]); ctx.restore(); } }
      naamBij(ctx, 'eiwit van het virus', 'door je eigen cel gemaakt', 1180, 190, opv, 'left', VORMKL[0]);
      wissel(ctx, q, [['het recept wordt afgebroken', 'breken', 1, RNAK], ['het komt niet in je DNA', 'DNA', 1, C.groen]], 960, 850);
      ctx.restore(); }
  },
  s05(ctx, t, q) { bg(ctx, 'schema');
    const tb = q.on('kunstmatig', 1);
    if (1 - tb > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - tb;
      const ps = q.on('passende', 1), dl = ramp(t, q.at('vermenigvuldigd'), 3), gh = q.on('geheugencellen', 1); const n = 1 + Math.floor(dl * 7.99);
      // antigeen van het vaccin
      const ax = 960, ay = 250; for (let i = 0; i < 3; i++) { const px = ax - 40 + i * 40; opp(ctx, px, ay + 6 * Math.sin(t + i), 0, -1, 0, 16, VORMKL[0], 1 - dl); } regel(ctx, 'antigeen uit het vaccin', ax, ay + 60, 1 - dl, VORMKL[0], 24, 'center', 700);
      // B-cellen: vijf soorten receptoren, de passende (vorm 0) wordt gekozen en deelt
      const bk = [2, 0, 3, 1, 4]; bk.forEach((k, i) => { if (k === 0) return; bCel(ctx, 180 + i * 120, 470, 44, k, t, { seed: i, a: (1 - 0.75 * ps) * (1 - dl), n: 6 }); });
      for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4), x0 = 300, y0 = 470, x1 = 230 + c * 120, y1 = 420 + r * 130; const nieuw = i ? clamp(dl * 8 - i, 0, 1) : 1; bCel(ctx, lerp(x0, x1, ease(dl)), lerp(y0, y1, ease(dl)), 44, 0, t, { seed: i, glow: ps * (1 - dl * 0.5), soort: gh > 0.5 && (i === 2 || i === 5) ? 'geheugen' : 'b', a: nieuw, n: 6 }); }
      regel(ctx, 'B-cellen', 420, 330, q.on('B-cellen', 1), BCOL, 30, 'center', 700);
      // T-cellen: drie vormen, de passende (0) wordt gekozen en deelt
      [1, 2].forEach((v, i) => tCel(ctx, 1240 + i * 120, 470, 40, v, (1 - 0.75 * ps) * (1 - dl), 0, TK));
      for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4), x1 = 1180 + c * 120, y1 = 420 + r * 130, nieuw = i ? clamp(dl * 8 - i, 0, 1) : 1; tCel(ctx, lerp(1480, x1, ease(dl)), lerp(470, y1, ease(dl)), 40, 0, nieuw * q.on('T-cellen', 1), ps * (1 - dl * 0.5), TK); }
      regel(ctx, 'T-cellen', 1420, 330, q.on('T-cellen', 1), TK, 30, 'center', 700);
      naamBij(ctx, 'geheugencellen ★', '', 420, 760, gh * (1 - q.on('pijnlijke', 1)), 'center', C.goud);
      wissel(ctx, q, [['pijnlijke arm, wat koorts: je afweer aan het werk', 'pijnlijke', 1, C.koraal], ['actieve immunisatie: je maakt zelf de afweer', 'actieve', 1, C.goud]], 960, 800);
      ctx.restore(); }
    immuunTabel(ctx, 160, 340, [['infectie (waterpokken)', q.on('natuurlijk', 1)], ['vaccin', 1, C.goud], null, null], tb);
  },
  s06(ctx, t, q) { bg(ctx, 'schema'); const X = 260, Y = 230, Wg = 1080, Hg = 440;
    const u = 0.32 * ramp(t, q.at('eerste', 2), 4) + 0.68 * ramp(t, q.at('tweede', 3), 8);
    grafiek(ctx, X, Y, Wg, Hg, { xmax: 10, ymax: 110, f: prikCurve, u, xticks: [], yticks: [], xlab: 'tijd', ylab: 'hoeveelheid antistoffen', col: AS });
    spuit(ctx, X + 0.02 * Wg, Y + Hg + 60, 0.4, -1.571); regel(ctx, '1e prik', X + 0.02 * Wg + 30, Y + Hg + 70, 1, C.text2, 24); spuit(ctx, X + 0.6 * Wg, Y + Hg + 60, 0.4, -1.571, q.on('tweede', 3)); regel(ctx, '2e prik (dezelfde)', X + 0.6 * Wg + 30, Y + Hg + 70, q.on('tweede', 3), C.text2, 24);
    wissel(ctx, q, [['de tweede prik is meestal precies dezelfde', 'dezelfde', 1, C.text2], ['primaire reactie: traag en laag', 'primaire', 1, AS], ['secundaire reactie: snel, veel meer antistoffen', 'secundaire', 1, AS], ['bescherming voor jaren', 'jaren', 1, C.groen]], 960, 140);
    // geheugencellen: eerst een paar, na de tweede prik meer
    const g1 = q.on('geheugencellen', 1), g2 = q.on('geheugencellen', 2); regel(ctx, 'geheugencellen', 1640, 260, g1, C.goud, 28, 'center', 700);
    for (let i = 0; i < 9; i++) { const al = i < 3 ? g1 : clamp(g2 * 6 - (i - 3), 0, 1); bCel(ctx, 1540 + (i % 3) * 100, 340 + Math.floor(i / 3) * 110, 36, 0, t, { soort: 'geheugen', seed: i, a: al, n: 6 }); }
  },
  s07(ctx, t, q) { bg(ctx, 'schema');
    const hi = q.on('mazelen', 1); const cols = 16, rows = 7;
    for (let i = 0; i < cols * rows; i++) { const r = Math.floor(i / cols), c = i % cols; const x = 260 + c * 90, y = 230 + r * 85; const ziek0 = i === 50; const baby = i === 52 || i === 85; const vac = !baby && !ziek0 && (hi > 0.5 ? (hash(i * 3) < 0.95) : (hash(i * 3) < 0.4)); const dist = Math.hypot(c - 2, r - 3);
      const spread = (1 - hi) * ramp(t, 1.5, 3) * 6; const ziek = ziek0 || (!vac && dist < spread);
      poppetje(ctx, x, y + (baby ? 8 : 0), baby ? 0.65 : 1, ziek ? C.koraal : vac ? '#5B7FA0' : C.text2, 1, vac ? 1 : 0);
      if (baby && q.on("baby's", 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on("baby's", 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 34, 0, 6.283); ctx.stroke(); ctx.restore(); } }
    // bij 95 %: virusjes van de zieke ketsen af op de beschermde buren
    if (hi > 0.01) for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.3, u = (t * 0.5 + i / 6) % 1, d = 20 + 70 * Math.sin(u * 3.14); virus(ctx, 260 + 2 * 90 + Math.cos(an) * d, 230 + 3 * 85 - 4 + Math.sin(an) * d, 7, [0], t, { a: hi * 0.9 }); }
    wissel(ctx, q, [['te weinig gevaccineerd: de ziekte verspreidt zich', 'genoeg', 1, C.koraal], ['mazelen: ± 95 % gevaccineerd', 'mazelen', 1, C.teal], ["ook baby's en mensen met een zwakke afweer beschermd", 'beschermd', 1, C.goud], ['groepsimmuniteit', 'groepsimmuniteit', 1, C.groen]], 960, 140);
    poppetje(ctx, 320, 860, 0.8, '#5B7FA0', 1, 1); regel(ctx, 'gevaccineerd', 350, 868, 1, C.text2, 22); poppetje(ctx, 600, 860, 0.8, C.text2); regel(ctx, 'niet gevaccineerd', 630, 868, 1, C.text2, 22); poppetje(ctx, 920, 860, 0.8, C.koraal); regel(ctx, 'ziek', 950, 868, 1, C.text2, 22);
  },
  s08(ctx, t, q) { bg(ctx, 'schema');
    const wd = q.on('wond', 1), se = q.on('serum', 1), mt = ramp(t, q.at('kant-en-klare'), 2.5);
    persoon(ctx, 'bilal', 360, 900, 640, { outfit: 'sport', uit: wd > 0.5 ? 'bezorgd' : 'neutraal', t });
    const kx = 335, ky = 760; ctx.save(); ctx.globalAlpha *= wd; ctx.strokeStyle = '#8C2A2A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx - 16, ky - 6); ctx.lineTo(kx + 14, ky + 8); ctx.stroke(); ctx.restore();
    zoomCircle(ctx, 860, 450, 250, kx, ky, '', wd, () => { ctx.fillStyle = '#5A2E2E'; ctx.fillRect(560, 160, 600, 600); ctx.fillStyle = rgba(HUID4, 0.9); ctx.beginPath(); ctx.moveTo(560, 200); ctx.lineTo(760, 200); ctx.lineTo(840, 470); ctx.lineTo(880, 470); ctx.lineTo(960, 200); ctx.lineTo(1160, 200); ctx.lineTo(1160, 160); ctx.lineTo(560, 160); ctx.fill();
      const B = [[780, 520, 0.4], [880, 600, -0.6], [960, 480, 1.2], [700, 620, 2.2], [1010, 640, 0.1]]; B.forEach(([x, y, an], i) => { const s = 2.1, bx = x + 6 * Math.sin(t + i), by = y + 4 * Math.cos(t * 0.8 + i); bacterie(ctx, bx, by, s, an, q.on('vuile', 1)); for (let j = 0; j < 3; j++) { const p = bactTop(bx, by, s, an, j); bindY(ctx, p.x + p.nx * 8 * s, p.y + p.ny * 8 * s, p.nx, p.ny, 0.42, AS, se, clamp(mt * 1.6 - (i * 3 + j) * 0.04, 0, 1)); } }); });
    naamBij(ctx, 'diepe, vuile wond', 'tetanusbacteriën', 860, 760, wd, 'center', C.text);
    spuit(ctx, 1450, 300, 1.3, 0.3, se, AS); naamBij(ctx, 'serum', 'kant-en-klare antistoffen', 1460, 470, se, 'center', AS);
    tag(ctx, 'ze binden meteen', 1460, 620, C.goud, q.on('meteen', 1) * (1 - q.on('hoe', 1)));
    vraagteken(ctx, 1460, 700, q.on('hoe', 1), 120); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const p2 = q.on('baby', 1), p1 = 1 - p2; const X = 300, Y = 230, Wg = 1000, Hg = 400;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const u = ramp(t, q.at('weken'), 3);
      grafiek(ctx, X, Y, Wg, Hg, { xmax: 12, ymax: 100, f: serumCurve, u: 0.05 + 0.95 * u, xticks: [0, 2, 4, 6, 8, 10, 12], xfmt: v => v + ' wk', yticks: [], xlab: 'tijd na de injectie', ylab: 'antistoffen uit het serum', col: AS });
      const gc = q.on('geheugencel', 1); bCel(ctx, 1600, 330, 70, 0, t, { soort: 'geheugen', a: gc * 0.6 }); kruis(ctx, 1600, 330, 80, gc); naamBij(ctx, 'geen B-cel, geen geheugencel', '', 1600, 470, gc, 'center', C.koraal);
      tag(ctx, 'passieve immunisatie: meteen, maar tijdelijk', 960, 150, AS, q.on('passieve', 1));
      spuit(ctx, 1600, 620, 0.8, 0, q.on('tegelijk', 1)); regel(ctx, '+ meteen een vaccin', 1600, 700, q.on('tegelijk', 1), C.goud, 26, 'center', 700);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2; const pl = q.on('placenta', 1);
      const m = moederBuik(ctx, 330, 880, 640, t, { uit: 'blij' });
      if (m.placenta) for (let i = 0; i < 4; i++) { const u = (t * 0.3 + i / 4) % 1; antistof(ctx, lerp(m.placenta.x + 60, m.placenta.x - 10, u), lerp(m.placenta.y - 70, m.placenta.y + 40, u), 0.22, 2.6, Math.min(1, (1 - u) * 3) * pl); }
      naamBij(ctx, 'antistoffen via de placenta', 'en later via moedermelk', 560, 330, pl, 'left', AS);
      immuunTabel(ctx, 700, 520, [['infectie', 1], ['vaccin', 1, C.goud], ['placenta, moedermelk', pl, '#E8A0B0'], ['serum', 1, AS]], 1);
      ctx.restore(); }
  },
  s11(ctx, t, q) { ctx.fillStyle = '#7FA8CC'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#5E8A4E'; ctx.fillRect(0, 620, W, H - 620); for (let i = 0; i < 60; i++) { ctx.strokeStyle = '#4A7040'; ctx.lineWidth = 3; const x = hash(i) * W; ctx.beginPath(); ctx.moveTo(x, 640 + hash(i * 3) * 200); ctx.lineTo(x + 6, 600 + hash(i * 3) * 200); ctx.stroke(); }
    for (let i = 0; i < 9; i++) { const x = 900 + i * 110, y = 640 + hash(i * 4) * 60; ctx.strokeStyle = '#4A7040'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y + 120); ctx.quadraticCurveTo(x + 10, y + 40, x + 4, y - 60); ctx.stroke(); ctx.fillStyle = '#C9B060'; ctx.beginPath(); ctx.ellipse(x + 4, y - 80, 9, 28, 0.1, 0, 6.283); ctx.fill(); }
    const nz = q.on('niezen', 1), sn = Math.max(0, Math.sin((t - q.at('niezen')) * 2.2)) * (t > q.at('niezen') && t < q.at('niezen') + 3 ? 1 : 0);
    const r = persoon(ctx, 'lotte', 520, 900, 520, { outfit: 'zomer', uit: nz > 0.5 ? (sn > 0.5 ? 'verbaasd' : 'bezorgd') : 'neutraal', pose: nz > 0.5 ? 'denk' : 'staan', t });
    if (sn > 0.01 && r.hoofd) { ctx.save(); ctx.globalAlpha *= sn; for (let i = 0; i < 7; i++) circ(ctx, r.hoofd.x + 50 + i * 16, r.hoofd.y + 14 + (hash(i) - 0.5) * 30 * (1 + i * 0.2), 4, rgba('#E6F0FA', 0.8)); ctx.restore(); }
    for (let i = 0; i < 26; i++) { const u = (t * 0.05 + hash(i)) % 1; stuifmeel(ctx, 1500 - u * 900 + 300 * hash(i * 7), 200 + hash(i * 3) * 400 + 30 * Math.sin(t + i), 8, t, q.on('stuifmeel', 1)); }
    wissel(ctx, q, [['niezen · loopneus · jeukende ogen', 'niezen', 1, C.koraal], ['stuifmeel: eigenlijk onschuldig', 'onschuldig', 1, POL]], 960, 150);
    vraagteken(ctx, 960, 470, q.on('Wat', 1), 130); },

  s13(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('allergeen', 1), p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const X0 = 460, X1 = 1460, Y = 470;
      const g = ctx.createLinearGradient(X0, 0, X1, 0); g.addColorStop(0, rgba(C.teal, 0.6)); g.addColorStop(0.5, rgba(C.groen, 0.6)); g.addColorStop(1, rgba(C.koraal, 0.8)); roundRect(ctx, X0, Y - 14, X1 - X0, 28, 14); ctx.fillStyle = g; ctx.fill();
      regel(ctx, 'te zwak', X0, Y + 70, 1, C.text2, 30, 'center', 700); regel(ctx, 'normaal', 960, Y + 70, 1, C.text2, 30, 'center', 700); regel(ctx, 'te sterk', X1, Y + 70, 1, C.koraal, 30, 'center', 700);
      const zw = q.on('zwakke', 1), an = q.on('andersom', 1); const mx = lerp(lerp(960, X0, zw), X1, an); circ(ctx, mx, Y, 30, C.goud, '#FFFFFF', 3);
      wissel(ctx, q, [['antwoord c: een te sterke reactie', 'cee', 1, C.goud], ['een allergie is geen zwakke afweer', 'zwakke', 1, C.koraal]], 960, 300);
      ctx.restore(); }
    if (p2 > 0.01) { ctx.save(); ctx.globalAlpha *= p2;
      const vr = ramp(t, q.at('vreemd'), 1.6), pc = q.on('Plasmacellen', 1);
      const sx = lerp(260, 440, vr), sy = lerp(300, 340, vr); stuifmeel(ctx, sx, sy, 40, t, 1 - pc * 0.7); naamBij(ctx, 'allergeen', 'stuifmeel', 260, 400, 1 - vr, 'center', POL);
      bCel(ctx, 640, 470, 110, 2, t, { a: 1 - pc, glow: vr }); bCel(ctx, 640, 470, 110, 2, t, { soort: 'plasma', a: pc }); naamBij(ctx, pc > 0.5 ? 'plasmacel' : 'B-cel', '', 640, 650, 1, 'center', BCOL);
      const mc = q.on('mestcellen', 1), vz = ramp(t, q.at('vastzitten'), 3.5);
      mestcel(ctx, 1380, 470, 150, mc, 0, t); naamBij(ctx, 'mestcel', 'in je neus en ogen', 1380, 700, mc, 'center', HIST);
      for (let i = 0; i < 9; i++) { const an = -2.7 + i * 0.42, [nx, ny] = ellN(150, 127, an), bx = 1380 + Math.cos(an) * 150, by = 470 + Math.sin(an) * 127; yNaarSteel(ctx, 760, 470, bx, by, nx, ny, 0.38, clamp(vz * 1.8 - i * 0.09, 0, 1), pc); }
      for (let i = 0; i < 4; i++) { const u = (t * 0.35 + i / 4) % 1; antistof(ctx, 760 + u * 120, 470 + (i - 1.5) * 50 * u, 0.32, u * 3 + i, pc * (1 - vz) * Math.min(1, (1 - u) * 3)); }
      wissel(ctx, q, [['eerste contact: je merkt nog niets', 'eerste', 1, C.text2], ['je afweer ziet het allergeen als vreemd', 'vreemd', 1, POL], ['plasmacellen maken antistoffen', 'Plasmacellen', 1, BCOL], ['de antistoffen gaan vastzitten op mestcellen', 'vastzitten', 1, AS], ['mestcellen: ook bij de splinter (film 1)', 'splinter', 1, HIST]], 960, 170);
      ctx.restore(); }
  },
  s14(ctx, t, q) { bg(ctx, 'micro');
    const bi = ramp(t, q.at('bindt'), 2), hs = q.on('histamine', 1), wd = ramp(t, q.at('wijder'), 2), lk = ramp(t, q.at('lekken'), 2), ah = q.on('antihistaminica', 1);
    haarvat(ctx, 160, 1760, 720, 1 + 0.5 * wd * (1 - 0.6 * ah), t, { lek: lk * (1 - 0.8 * ah) });
    const MX = 900, MY = 380, R = 140; mestcel(ctx, MX, MY, R, 1, hs * (1 - ah * 0.8), t); const tips = [];
    for (let i = 0; i < 8; i++) { const an = -2.75 + i * 0.36, [nx, ny] = ellN(R, R * 0.85, an); tips.push(ySteel(ctx, MX + Math.cos(an) * R, MY + Math.sin(an) * R * 0.85, nx, ny, 0.36)); }
    for (const i of [1, 3, 5]) { const a1 = tips[i][1], a2 = tips[i + 1][0]; const tx = (a1[0] + a2[0]) / 2, ty = (a1[1] + a2[1]) / 2, d = Math.hypot(tx - MX, ty - MY), nx = (tx - MX) / d, ny = (ty - MY) / d; stuifmeel(ctx, tx + nx * (20 + 360 * (1 - bi)), ty + ny * (20 + 360 * (1 - bi)), 18, t); }
    if (ah > 0.01) { ctx.save(); ctx.globalAlpha *= ah; pil(ctx, 1450, 300, 1); naamBij(ctx, 'antihistaminicum', '', 1450, 400, 1, 'center', C.text); ctx.restore(); }
    naamBij(ctx, 'mestcel', '', MX + R + 30, MY + 80, 1, 'left', HIST); naamBij(ctx, 'histamine', '', MX - R - 40, MY + 120, hs * (1 - ah), 'right', HIST);
    wissel(ctx, q, [['volgend contact: het stuifmeel bindt aan de antistoffen', 'bindt', 1, POL], ['mestcellen geven histamine af', 'histamine', 1, HIST], ['haarvaten wijder en lekken vocht: loopneus, jeuk', 'wijder', 1, VOCHTK], ['antihistaminica blokkeren de werking van histamine', 'antihistaminica', 1, C.text2], ["pinda's, wespensteken: soms levensgevaarlijk", 'pinda', 1, C.koraal]], 960, 870);
  },
  s15(ctx, t, q) { bg(ctx, 'micro'); const BC = '#7FC4A8';
    ctx.beginPath(); ctx.ellipse(1000, 470, 380, 280, 0, 0, 6.283); shape(ctx, rgba(BC, 0.06), rgba(BC, 0.5), 2); naamBij(ctx, 'eilandje in de alvleesklier', 'cellen die insuline maken', 1000, 800, q.on('alvleesklier', 1), 'center', BC);
    const at = ramp(t, q.at('vallen'), 3);
    for (let i = 0; i < 7; i++) { const an = i * 0.9, d = i ? 170 : 0; lCel(ctx, 1000 + Math.cos(an) * d, 470 + Math.sin(an) * d * 0.75, 70, t, { col: BC, seed: i, mhc: 1, eigenToon: 1, kapot: i > 0 && i < 4 ? 0.8 * clamp((at - 0.6 - i * 0.08) / 0.3, 0, 1) : 0 }); }
    // uitgeschakelde afweercellen (grijs, verdwijnen) en een paar die ontsnappen
    const us = q.on('uitgeschakeld', 1); for (let i = 0; i < 4; i++) tCel(ctx, 220 + i * 90, 300 + (i % 2) * 70, 34, 0, us * (1 - us * 0.75), 0, C.text2);
    for (let i = 0; i < 3; i++) { const doel = i + 1, an = doel * 0.9, cx = 1000 + Math.cos(an) * 170, cy = 470 + Math.sin(an) * 170 * 0.75; const sx = 260 + i * 90, sy = 520 + i * 70; const ex = cx - Math.cos(an + 0.3) * 0 - 95, ey = cy; const px = lerp(sx, ex, at), py = lerp(sy, ey, at);
      tCel(ctx, px, py, 42, 0, q.on('ontsnappen', 1), at > 0.95 ? 0.6 + 0.4 * Math.sin(t * 6) : 0, TK, Math.PI);
      if (at > 0.95) vonk(ctx, px + 50, py, (at - 0.95) * 20, t); }
    naamBij(ctx, 'T-killercellen', '', 400, 760, q.on('T-killercellen', 1) * (1 - at), 'center', TK);
    wissel(ctx, q, [['auto-immuunziekte: je afweer ziet eigen cellen als vreemd', 'auto-immuunziekte', 1, C.koraal], ['normaal worden zulke afweercellen uitgeschakeld', 'uitgeschakeld', 1, C.text2], ['soms ontsnappen er een paar', 'ontsnappen', 1, TK], ['diabetes type 1: T-killercellen doden de insulinemakers', 'diabetes', 1, TK], ['levenslang insuline spuiten', 'spuiten', 1, C.goud]], 960, 130);
  },
  s16(ctx, t, q) { bg(ctx, 'micro');
    const ve = ramp(t, q.at('verbindt'), 2), ge = q.on('geeft', 1); const MX = 900, MY = 600, R = 220;
    mestcel(ctx, MX, MY, R, 1, ge, t); naamBij(ctx, 'mestcel', '', MX, MY + R + 20, 1, 'center', HIST);
    const ig = q.on('IgE', 1), tips = []; [-2.25, -1.85, -1.3, -0.9].forEach((an) => { const [nx, ny] = ellN(R, R * 0.85, an); tips.push(ySteel(ctx, MX + Math.cos(an) * R, MY + Math.sin(an) * R * 0.85, nx, ny, 0.7, ig)); });
    naamBij(ctx, 'IgE', 'steel vast op de mestcel', 1190, 300, q.on('steel', 1), 'left', AS);
    const a1 = tips[1][1], a2 = tips[2][0], mx = (a1[0] + a2[0]) / 2, my = (a1[1] + a2[1]) / 2 - 30;
    stuifmeel(ctx, mx, lerp(60, my, ve), 34, t, q.on('allergeen', 1)); naamBij(ctx, 'allergeen', 'verbindt twee IgE', mx - 60, lerp(60, my, ve) - 10, q.on('allergeen', 1), 'right', POL);
  },
  s17(ctx, t, q) { bg(ctx, 'micro');
    const g = [['A', 'antigeen', 1, 'A', ['B']], ['B', 'antigeen', 2, 'B', ['A']], ['AB', 'allebei', 1, 'AB', []], ['O', 'beide', 1, 'O', ['A', 'B']]];
    const pl = q.on('plasma', 1);
    g.forEach(([lab, w, n, typ, anti], i) => { const x = 330 + i * 420, al = q.on(w, n); if (al < 0.01) return; ctx.save(); ctx.globalAlpha *= al; rbcAg(ctx, x, 340, 100, typ); regel(ctx, 'bloedgroep ' + lab, x, 500, 1, C.text, 32, 'center', 700);
      ctx.globalAlpha *= pl; roundRect(ctx, x - 170, 560, 340, 240, 20); shape(ctx, rgba('#E8D27A', 0.12), rgba('#E8D27A', 0.5), 1.5); regel(ctx, 'plasma', x, 600, 1, C.text2, 22, 'center', 700);
      anti.forEach((k, j) => { for (let m = 0; m < 3; m++) antiY(ctx, x - 100 + m * 60 + j * 30, 660 + j * 50 + 10 * Math.sin(t + m), 0.4, 0.3 * Math.sin(m + j + t * 0.5), k); }); regel(ctx, anti.length ? 'anti-' + anti.join(' en anti-') : 'geen anti-A of anti-B', x, 788, 1, C.text2, 22, 'center', 700); ctx.restore(); });
    tag(ctx, 'al vanaf je eerste levensjaar', 960, 140, C.goud, q.on('levensjaar', 1));
  },
  s18(ctx, t, q) { bg(ctx, 'micro');
    const p2 = q.on('bepaal', 1), p3 = q.on('mag', 1); const p1 = 1 - p2;
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1; const kl = ramp(t, q.at('binden'), 3.5), kp = ramp(t, q.at('kapot'), 1.5);
      regel(ctx, 'ontvanger: bloedgroep A, met anti-B', 960, 150, 1, C.text, 30, 'center', 700);
      const far = [[400, 330], [600, 650], [900, 260], [1250, 690], [1480, 330], [1600, 600]], R = 52, cl = []; for (let i = 0; i < 6; i++) { const gx = 790 + (i % 3) * 170 + (Math.floor(i / 3) ? 85 : 0), gy = 380 + Math.floor(i / 3) * 150; cl.push([lerp(far[i][0], gx, kl), lerp(far[i][1], gy, kl)]); }
      cl.forEach(([x, y]) => rbcAg(ctx, x, y, R, 'B', { kapot: kp }));
      bruggen(ctx, cl, R, 'B', KB, clamp((kl - 0.85) / 0.15, 0, 1) * (1 - kp * 0.7), 180);
      for (let i = 0; i < 9; i++) { const x0 = 300 + hash(i * 5) * 1300, y0 = 250 + hash(i * 9) * 450; antiY(ctx, x0 + 20 * Math.sin(t + i), y0 + 15 * Math.cos(t * 0.8 + i), 0.4, i + t * 0.3, 'B', 1 - clamp((kl - 0.6) / 0.3, 0, 1)); }
      naamBij(ctx, 'rode bloedcellen van donor B', '', 600, 800, 1 - kl, 'center', KB); naamBij(ctx, 'anti-B verbindt de cellen', '', 1045, 640, clamp((kl - 0.85) / 0.15, 0, 1) * (1 - q.on('klonteren', 1)), 'center', KB);
      tag(ctx, 'ze klonteren samen, en gaan kapot', 1045, 760, C.koraal, q.on('klonteren', 1));
      ctx.restore(); }
    if (p2 * (1 - p3) > 0.01) { ctx.save(); ctx.globalAlpha *= p2 * (1 - p3); const dr = q.on('druppelt', 1), sk = ramp(t, q.at('kijkt'), 2.5), R = 26;
      [['anti-A', 'A', true], ['anti-B', 'B', false]].forEach(([lab, k, kl], i) => { const x = 700 + i * 520; circ(ctx, x, 470, 180, rgba('#E6E1D3', 0.08), '#C9D2DE', 3); regel(ctx, lab + '-serum', x, 720, 1, KCOL[k], 30, 'center', 700);
        const cel = []; for (let j = 0; j < 9; j++) { const gx = x - 100 + (j % 3) * 100, gy = 370 + Math.floor(j / 3) * 100; const KL = [[x - 75, 420], [x + 70, 440], [x - 5, 555]][Math.floor(j / 3)], an2 = (j % 3) * 2.094 + Math.floor(j / 3), cx2 = KL[0] + Math.cos(an2) * 47, cy2 = KL[1] + Math.sin(an2) * 47; cel.push(kl ? [lerp(gx, cx2, sk), lerp(gy, cy2, sk)] : [gx + 4 * Math.sin(t + j), gy]); }
        cel.forEach(([cx, cy]) => rbcAg(ctx, cx, cy, R, 'A'));
        if (kl) bruggen(ctx, cel, R, 'A', KA, clamp((sk - 0.8) / 0.2, 0, 1), 95);
        for (let j = 0; j < 6; j++) { const al = kl ? dr * (1 - sk) : dr; antiY(ctx, x - 120 + (j % 3) * 110 + 50, 330 + Math.floor(j / 3) * 260 + 10 * Math.sin(t + j), 0.26, j + t * 0.4, k, al); }
        const dy = lerp(180, 300, ramp(t, q.at('druppelt'), 1)); if (dr > 0.01 && dr < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - dr; ctx.beginPath(); ctx.ellipse(x, dy, 14, 20, 0, 0, 6.283); ctx.fillStyle = KCOL[k]; ctx.fill(); ctx.restore(); } });
      regel(ctx, 'welke bloedgroep heeft deze druppel bloed?', 960, 200, 1, C.text, 30, 'center', 700); tag(ctx, 'klontert met anti-A, niet met anti-B: bloedgroep A', 960, 840, KA, sk);
      ctx.restore(); }
    if (p3 > 0.01) { ctx.save(); ctx.globalAlpha *= p3; rbcAg(ctx, 500, 450, 100, 'A'); regel(ctx, 'ontvanger A', 500, 610, 1, C.text, 28, 'center', 700); rbcAg(ctx, 960, 450, 90, 'B'); kruis(ctx, 960, 450, 60); regel(ctx, 'donor B', 960, 610, 1, C.text, 28, 'center', 700); rbcAg(ctx, 1420, 450, 90, 'O'); vink(ctx, 1420, 450, 40, q.on('wel', 1)); regel(ctx, 'donor O', 1420, 610, 1, C.text, 28, 'center', 700); vraagteken(ctx, 1420, 280, q.on('Waarom', 1), 110); ctx.restore(); }
  },
  s20(ctx, t, q) { bg(ctx, 'micro');
    rbcAg(ctx, 500, 420, 120, 'O'); naamBij(ctx, 'rode bloedcel O', 'geen A, geen B', 500, 600, q.on('rode', 1), 'center', C.text);
    const on = q.on('ontvanger', 1); for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.4, d = 175 + 30 * Math.sin(t * 1.3 + i * 2); antiY(ctx, 500 + Math.cos(an) * d, 420 + Math.sin(an) * d * 0.92, 0.36, an - 1.571 + 0.5 * Math.sin(t + i), i % 2 ? 'A' : 'B', on * (1 - q.on('bloedbank', 1))); }
    const pl = q.on('plasma', 1); ctx.save(); ctx.globalAlpha *= pl * (1 - q.on('rode', 1) * 0.5); roundRect(ctx, 880, 260, 420, 260, 20); shape(ctx, rgba('#E8D27A', 0.12), rgba('#E8D27A', 0.5), 1.5); regel(ctx, 'plasma van O', 1090, 300, 1, C.text2, 24, 'center', 700); for (let m = 0; m < 4; m++) { antiY(ctx, 960 + m * 80, 380, 0.5, 0.2 * Math.sin(m + t), 'A'); antiY(ctx, 980 + m * 80, 460, 0.5, 0.2 * Math.cos(m + t), 'B'); } regel(ctx, 'wél anti-A en anti-B', 1090, 560, 1, C.koraal, 26, 'center', 700); ctx.restore();
    bloedzak(ctx, 1580, 410, 0.95, q.on('bloedbank', 1), t);
    wissel(ctx, q, [['antwoord b', 'bee', 1, C.goud], ['de antistoffen van de ontvanger hebben niets om op te binden', 'ontvanger', 1, C.groen], ['O: universele donor voor rode bloedcellen', 'universele', 1, C.goud]], 960, 780);
  },
  s21(ctx, t, q) { bg(ctx, 'micro');
    const rp = q.on('resuspositief', 1);
    rbcAg(ctx, 420, 360, 110, 'O', { rh: true, a: q.on('resusfactor', 1) }); regel(ctx, 'antigeen D: resuspositief', 420, 530, rp, KD, 28, 'center', 700); regel(ctx, '± 8 op de 10 mensen', 420, 570, q.on('acht', 1), C.text2, 24, 'center');
    const vz = q.on('vanzelf', 1); ctx.save(); ctx.globalAlpha *= q.on('anders', 1);
    roundRect(ctx, 800, 220, 460, 300, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); regel(ctx, 'anti-A, anti-B', 1030, 270, 1, C.text, 28, 'center', 700); for (let m = 0; m < 3; m++) { antiY(ctx, 900 + m * 60, 360 + 6 * Math.sin(t + m), 0.45, 0, 'A'); antiY(ctx, 1080 + m * 60, 360 + 6 * Math.cos(t + m), 0.45, 0, 'B'); } regel(ctx, 'heb je al, ook zonder contact', 1030, 480, 1, C.groen, 24, 'center', 700);
    roundRect(ctx, 1320, 220, 460, 300, 20); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.4), 1.5); regel(ctx, 'anti-D', 1550, 270, 1, C.text, 28, 'center', 700); for (let m = 0; m < 3; m++) antiY(ctx, 1480 + m * 60, 360 + 6 * Math.sin(t + m), 0.45, 0, 'D', ramp(t, q.at('binnenkrijgt'), 2)); regel(ctx, 'pas na contact met D', 1550, 480, vz, C.koraal, 24, 'center', 700); ctx.restore();
    const un = q.on('resusnegatief', 1); ctx.save(); ctx.globalAlpha *= un; rbcAg(ctx, 620, 720, 60, 'O'); regel(ctx, 'O resusnegatief: rode bloedcellen voor iedereen', 620, 830, 1, C.goud, 26, 'center', 700); rbcAg(ctx, 1300, 720, 60, 'AB', { rh: true, a: q.on('resuspositief', 3) }); regel(ctx, 'AB resuspositief: universele ontvanger', 1300, 830, q.on('resuspositief', 3), C.goud, 26, 'center', 700); ctx.restore();
  },
  s22(ctx, t, q) { bg(ctx, 'micro');
    const k2 = q.on('volgend', 1), bv = ramp(t, q.at('bevalling'), 2.5), ad = q.on('geheugencellen', 1), dp = ramp(t, q.at('placenta'), 2.5), bd = ramp(t, q.at('binden'), 2), ab = ramp(t, q.at('afgebroken'), 1.5);
    // links: eerste kind
    const m1 = moederBuik(ctx, 250, 860, 560, t, { babyA: 1 - bv * 0.6 }); naamBij(ctx, 'eerste kind', 'resuspositief', 250, 270, 1, 'center', C.text);
    zoomCircle(ctx, 640, 470, 190, m1.placenta.x, m1.placenta.y, 'bloed van de moeder', 1, () => { ctx.fillStyle = rgba(BLD, 0.25); ctx.fillRect(440, 270, 400, 400);
      for (let i = 0; i < 4; i++) rbcAg(ctx, 540 + (i % 2) * 190, 360 + Math.floor(i / 2) * 200, 30, 'O');
      for (let i = 0; i < 3; i++) rbcAg(ctx, lerp(460, 600 + i * 60, bv), lerp(470 + i * 40, 430 + (i % 2) * 70, bv), 30, 'O', { rh: true, a: bv });
      for (let i = 0; i < 5; i++) antiY(ctx, 560 + i * 40, 560 + (i % 2) * 30 + 6 * Math.sin(t + i), 0.3, i + t * 0.3, 'D', ad);
      bCel(ctx, 760, 330, 32, 2, t, { soort: 'geheugen', a: ad, n: 6 }); });
    naamBij(ctx, 'meestal gezond', '', 250, 900 - 10, q.on('last', 1) * (1 - k2), 'center', C.groen);
    // rechts: volgend kind
    ctx.save(); ctx.globalAlpha *= k2; const m2 = moederBuik(ctx, 1150, 860, 560, t, {}); naamBij(ctx, 'volgend kind', 'resuspositief', 1150, 270, 1, 'center', C.text);
    zoomCircle(ctx, 1600, 470, 190, m2.placenta.x, m2.placenta.y, 'placenta', 1, () => { ctx.fillStyle = rgba(BLD, 0.22); ctx.fillRect(1400, 270, 200, 400); ctx.fillStyle = rgba('#E8A0B0', 0.18); ctx.fillRect(1600, 270, 200, 400); ctx.strokeStyle = '#E8A0B0'; ctx.lineWidth = 6; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(1600, 270); ctx.lineTo(1600, 670); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'moeder', 1490, 400, fTekst(22, 700), C.text2, 'center'); text(ctx, 'kind', 1700, 400, fTekst(22, 700), '#E8A0B0', 'center');
      const cel = [[1700, 430], [1720, 580]]; cel.forEach(([x, y]) => rbcAg(ctx, x, y, 44, 'O', { rh: true, kapot: ab }));
      const pts = []; cel.forEach(([x, y]) => rbcPunten(x, y, 44, 'O', true).filter(p => p.nx < 0.2).slice(0, 3).forEach(p => pts.push(p)));
      pts.forEach((p, i) => { const u = clamp(dp * 1.3 - i * 0.05, 0, 1); if (bd < 0.01 || u < 1) { antistof(ctx, lerp(1450 + (i % 2) * 40, p.tx - 60, u), lerp(400 + i * 40, p.ty, u), 0.3, 1.2 + i, dp * (1 - ab), KD); } else bindY(ctx, p.tx, p.ty, p.nx, p.ny, 0.3, KD, 1 - ab, bd); }); });
    ctx.restore();
    tag(ctx, 'resusantagonisme', 1150, 140, C.koraal, q.on('resusantagonisme', 1));
  },
  s23(ctx, t, q) { bg(ctx, 'micro');
    spuit(ctx, 400, 220, 1.2, 0.3, q.on('anti-D', 1), KD); naamBij(ctx, 'anti-D-injectie', '', 400, 360, q.on('anti-D', 1), 'center', KD);
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 500); ctx.lineTo(760, 500); ctx.stroke(); for (const [x, s, w] of [[250, 'begin', ''], [520, '± 30 weken', 'dertigste'], [720, 'bevalling', 'bevalling']]) { circ(ctx, x, 500, 10, w ? rgba(KD, q.on(w, 1)) : C.line); regel(ctx, s, x, 550, w ? q.on(w, 1) : 1, C.text2, 24, 'center', 700); }
    const mk = ramp(t, q.at('markeren'), 2), op = ramp(t, q.at('opgeruimd'), 3);
    const cel = [[1100, 330], [1250, 330], [1400, 330], [1175, 500], [1325, 500]];
    cel.forEach(([x, y], i) => { const weg = clamp(op * 1.6 - (4 - i) * 0.15, 0, 1), xx = lerp(x, 1640, weg), yy = lerp(y, 420, weg); ctx.save(); ctx.globalAlpha *= 1 - weg; rbcAg(ctx, xx, yy, 50, 'O', { rh: true }); rbcPunten(xx, yy, 50, 'O', true).filter((p, j) => j % 4 === 0).forEach((p, j) => bindY(ctx, p.tx, p.ty, p.nx, p.ny, 0.24, KD, mk, clamp(mk * 1.5 - j * 0.15, 0, 1))); ctx.restore(); });
    fagocyt(ctx, 1700, 420, 100, t, { a: q.on('opgeruimd', 1), arm: op, tx: 1300, ty: 420 }); naamBij(ctx, 'fagocyt', '', 1700, 570, q.on('opgeruimd', 1), 'center', WIT);
    regel(ctx, 'rode bloedcellen van het kind, in het bloed van de moeder', 1260, 680, 1, C.text2, 24, 'center', 700);
    wissel(ctx, q, [['opgeruimd voordat haar afweer ze ziet', 'opgeruimd', 1, C.groen], ['geen geheugencellen: elke zwangerschap opnieuw', 'geheugencellen', 1, C.goud]], 1260, 800);
  },
  s24(ctx, t, q) { prikpost(ctx, t, { prik: ramp(t, q.at('prik', 3), 1.5), kaart: 0, uitN: q.on('jarenlang', 1) > 0.5 ? 'blij' : 'neutraal' });
    const ch = [['eerste prik: oefenen, geheugencellen', 'oefenen', 1, BCOL], ['tweede prik: snel, veel meer antistoffen', 'snel', 1, AS], ['jarenlang beschermd', 'jarenlang', 1, C.goud], ['antwoord b', 'antwoord', 1, C.goud]];
    const pn = q.on('oefenen', 1); ctx.fillStyle = rgba('#0B0F16', 0.8 * pn); roundRect(ctx, 1240, 340, 640, 400, 20); ctx.fill();
    ch.forEach(([s, w, n, col], i) => tag(ctx, s, 1560, 420 + i * 90, col, q.on(w, n)));
  },
  s25(ctx, t, q) { bg(ctx, 'schema');
    const pn = [['film 1 · de splinter', 'splinter', (x, y) => { fagocyt(ctx, x - 50, y, 60, t, { arm: 0.6, tx: x + 60, ty: y }); bacterie(ctx, x + 80, y, 1.6, 0.3); }], ['film 2 · de waterpokken', 'waterpokken', (x, y) => { bCel(ctx, x - 50, y, 50, 0, t, { glow: 0.5, n: 6 }); virus(ctx, x + 80, y, 30, [0], t); }], ['film 3 · de griep', 'griep', (x, y) => { lCel(ctx, x + 50, y, 60, t, { toon: 1, eigenToon: 1, geinf: 1 }); tCel(ctx, x - 90, y, 36, 0, 1, 0.4, TK, Math.PI); }], ['film 4 · het vaccin', 'vaccin', (x, y) => { persoon(ctx, 'noor', x - 40, y + 150, 300, { uit: 'blij', t }); spuit(ctx, x + 90, y - 20, 0.5, Math.PI); }]];
    pn.forEach(([lab, w, dr], i) => { const x = 300 + i * 440, y = 430, al = q.on(w, 1); ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * al; roundRect(ctx, x - 190, y - 170, 380, 380, 24); shape(ctx, rgba(C.fill, 0.6), al > 0.5 ? C.goud : rgba(C.line, 0.4), al > 0.5 ? 3 : 1.5); ctx.save(); roundRect(ctx, x - 190, y - 170, 380, 380, 24); ctx.clip(); dr(x, y - 10); ctx.restore(); regel(ctx, lab, x, y + 250, 1, C.text, 26, 'center', 700); ctx.restore(); });
    tag(ctx, 'dit was de laatste film', 960, 140, C.text2, q.on('laatste', 1) * (1 - q.on('splinter', 1)));
  },
  s26(ctx, t, q) { bg(ctx, 'micro');
    lCel(ctx, 600, 430, 150, t, { eigenToon: 1, mhc: 1 }); regel(ctx, 'eigen', 600, 640, 1, EIGEN, 32, 'center', 700); virus(ctx, 1320, 430, 100, [0], t, { rot: t * 0.05 }); regel(ctx, 'vreemd', 1320, 640, 1, VIR, 32, 'center', 700);
    regel(ctx, 'vormpjes op het oppervlak', 960, 200, q.on('vormpjes', 1), C.goud, 40, 'center', 700);
    wissel(ctx, q, [['allergie: te sterk, op iets onschuldigs', 'allergie', 1, POL], ['auto-immuunziekte: eigen als vreemd', 'auto-immuunziekte', 1, C.koraal], ['transfusie: de vormpjes moeten passen', 'transfusie', 1, RBC], ['probeer het zelf: Bloedgroepenlab', 'uitproberen', 1, C.goud]], 960, 780);
  },
};
