// Ecologie 4 · Ingrijpen of laten gaan? — scènes per alinea (v1.0, 18 okt 2026). Opa Henk en Noor in de moestuin; monocultuur, spuiten en resistentie; sluipwesp in de kas, Aziatisch lieveheersbeestje, rietpad; geïntegreerde bestrijding, bloemrand, strokenteelt; heide, maaien, ecoduct; voedselweb; Veluwemeer van helder naar troebel; vwo: twee omslagpunten.

// ---------- algemene helpers (zelfde stijl als Voortplanting 4 / Gedrag 12) ----------
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - kop * 0.6 * Math.cos(an), y2 - kop * 0.6 * Math.sin(an)); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function boogPijl(ctx, x1, y1, x2, y2, bocht, col, a = 1, lw = 4) { if (a <= 0.01) return; const mx = (x1 + x2) / 2 - (y2 - y1) * bocht, my = (y1 + y2) / 2 + (x2 - x1) * bocht; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.restore(); const an = Math.atan2(y2 - my, x2 - mx); pijl(ctx, x2 - Math.cos(an) * 2, y2 - Math.sin(an) * 2, x2, y2, col, a, lw, 18); }
function paneel(ctx, x, y, w, h, titel, a = 1, col = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), col, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 46, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function tekstBlok(ctx, s, x, y, maxW, px = 26, col = C.text, a = 1, lh = 1.3, w = 600) { if (a <= 0.01) return y; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, w); ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; const yy = wrap(ctx, s, x, y, maxW, px * lh); ctx.restore(); return yy; }
function fasen(q, cues, d = 0.7) { const on = cues.map(c => c ? q.on(c[0], c[1] || 1, d) : 1); return on.map((v, i) => v * (i + 1 < on.length ? 1 - on[i + 1] : 1)); }
function grond(ctx, y, a = 1, col = '#3A5540') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(col, 0.55); ctx.fillRect(40, y, W - 80, CAPTION_Y - 10 - y); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke(); ctx.restore(); }
const PLAAG = C.koraal, VIJAND = C.groen, GIF = '#B48CE0';

// ---------- insecten (kop naar boven, -y) ----------
function luis(ctx, x, y, s = 1, o = {}) { const { a = 1, col = '#3B3A44', rand = '#A8A8B8', rot = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = rand; ctx.lineWidth = 1.4; for (const sx of [-1, 1]) for (const yy of [-3, 2, 7]) { ctx.beginPath(); ctx.moveTo(sx * 6, yy); ctx.lineTo(sx * 13, yy + 4 + Math.sin(t * 6 + yy) * 0.8); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-2, -12); ctx.quadraticCurveTo(-9, -22, -12, -24); ctx.moveTo(2, -12); ctx.quadraticCurveTo(9, -22, 12, -24); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 3, 8, 11, 0, 0, 6.283); shape(ctx, col, rand, 1.4); circ(ctx, 0, -10, 4.5, col, rand, 1.2);
  ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-4, 10); ctx.lineTo(-6, 15); ctx.moveTo(4, 10); ctx.lineTo(6, 15); ctx.stroke(); ctx.restore(); }
function lieveheer(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'twee', rot = 0, t = 0, loop = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const rood = soort === 'azie' ? '#E8892A' : '#D8382C'; ctx.strokeStyle = '#141418'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
  for (const sx of [-1, 1]) for (const [yy, k] of [[-6, 0], [3, 1], [12, 2]]) { const sw = loop ? Math.sin(t * 12 + k * 2 + (sx > 0 ? 3 : 0)) * 3 : 0; ctx.beginPath(); ctx.moveTo(sx * 14, yy); ctx.lineTo(sx * 24, yy + 4 + sw); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 2, 21, 0, 6.283); shape(ctx, rood, '#141418', 2);
  ctx.strokeStyle = '#141418'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 23); ctx.stroke();
  const stip = (px, py, r) => circ(ctx, px, py, r, '#141418');
  if (soort === 'azie') { [[-9, -2, 2.6], [9, -2, 2.6], [-13, 7, 2.4], [13, 7, 2.4], [-5, 10, 2.6], [5, 10, 2.6], [-9, 16, 2.4], [9, 16, 2.4], [-15, -4, 2], [15, -4, 2], [-4, 2, 2.2], [4, 2, 2.2], [-11, 13, 1.8], [11, 13, 1.8], [-3, 18, 2], [3, 18, 2]].forEach(([px, py, r]) => stip(px, py, r)); }
  else { stip(-9, 6, 5.5); stip(9, 6, 5.5); }
  ctx.beginPath(); ctx.ellipse(0, -14, 15, 7.5, 0, Math.PI, 0); ctx.closePath(); shape(ctx, soort === 'azie' ? '#F2EEE4' : '#141418', '#141418', 1.5);
  if (soort === 'azie') { ctx.strokeStyle = '#141418'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-6, -15); ctx.lineTo(-3, -20); ctx.lineTo(0, -16); ctx.lineTo(3, -20); ctx.lineTo(6, -15); ctx.stroke(); }
  else { circ(ctx, -10, -15, 2.5, '#F2EEE4'); circ(ctx, 10, -15, 2.5, '#F2EEE4'); }
  ctx.beginPath(); ctx.ellipse(0, -21, 7, 4.5, 0, Math.PI, 0); ctx.closePath(); shape(ctx, '#141418', null); circ(ctx, -4, -22, 1.4, '#F2EEE4'); circ(ctx, 4, -22, 1.4, '#F2EEE4');
  ctx.restore(); }
function sluipwesp(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, t = 0, vlieg = 0, boor = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const fl = vlieg ? 0.6 + 0.4 * Math.sin(t * 60) : 1; ctx.fillStyle = rgba('#DDEBF5', 0.5); ctx.strokeStyle = rgba('#DDEBF5', 0.8); ctx.lineWidth = 1; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 15, 2, 19 * fl, 7, sx * 0.35, 0, 6.283); ctx.fill(); ctx.stroke(); }
  ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 1.5; for (const sx of [-1, 1]) for (const yy of [-2, 3, 8]) { ctx.beginPath(); ctx.moveTo(sx * 3, yy); ctx.lineTo(sx * 13, yy + 7); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 18, 6, 11, 0, 0, 6.283); shape(ctx, '#E0C04A', '#2A2A30', 1.2); ctx.beginPath(); ctx.ellipse(0, 1, 5, 7, 0, 0, 6.283); shape(ctx, '#2A2A30', null); circ(ctx, 0, -9, 4.5, '#2A2A30');
  ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-2, -12); ctx.quadraticCurveTo(-10, -24, -15, -30); ctx.moveTo(2, -12); ctx.quadraticCurveTo(10, -24, 15, -30); ctx.stroke();
  if (boor > 0.01) { ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 28); ctx.lineTo(0, 28 + 12 * boor); ctx.stroke(); }
  ctx.restore(); }
function witteVlieg(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, -6); ctx.quadraticCurveTo(sx * 18, -4, sx * 13, 16); ctx.quadraticCurveTo(sx * 4, 14, 0, 10); ctx.closePath(); shape(ctx, '#F4F4EE', '#9AA3B2', 1.2); }
  circ(ctx, 0, -8, 3.5, '#E8D86A', '#9AA3B2', 1); ctx.restore(); }
function vliegLarve(ctx, x, y, s = 1, o = {}) { const { a = 1, zwart = 0, ei = 0, wesp = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 22, 14, 0, 0, 6.283); shape(ctx, '#D8E6B0', '#A8B880', 1.5);
  if (zwart > 0.01) { ctx.save(); ctx.globalAlpha *= zwart; ctx.beginPath(); ctx.ellipse(0, 0, 22, 14, 0, 0, 6.283); shape(ctx, '#2A2A30', '#555', 1.5); ctx.restore(); }
  if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei * (1 - wesp); ctx.beginPath(); ctx.ellipse(2, 1, 5, 3, 0.3, 0, 6.283); shape(ctx, '#F2EEE4', '#C9B896', 1); ctx.restore(); }
  if (wesp > 0.01) { ctx.save(); ctx.globalAlpha *= wesp; ctx.strokeStyle = '#F2EEE4'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 10; i++) { const u = i / 10; const px = -12 + 24 * u, py = Math.sin(u * 6) * 3; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function bij(ctx, x, y, s, ang = 0, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = 0.8 + 0.2 * Math.sin(t * 70); ctx.fillStyle = rgba('#DDEBF5', 0.55); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 15, -2, 17 * fl, 8, sx * 0.55, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 20, 11, 18, 0, 0, 6.283); shape(ctx, '#E0B64A', '#5A4010', 1.5); ctx.strokeStyle = '#3A2A10'; ctx.lineWidth = 3.5; for (const yy of [14, 22, 30]) { ctx.beginPath(); ctx.moveTo(-9.5, yy); ctx.lineTo(9.5, yy); ctx.stroke(); }
  circ(ctx, 0, -4, 9, '#7A5A2A'); circ(ctx, 0, -16, 7, '#3A2A14'); ctx.strokeStyle = '#3A2A14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, -21); ctx.lineTo(-9, -31); ctx.moveTo(3, -21); ctx.lineTo(9, -31); ctx.stroke(); ctx.restore(); }
function zweefvlieg(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const fl = 0.8 + 0.2 * Math.sin(t * 70); ctx.fillStyle = rgba('#DDEBF5', 0.5); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 16, 2, 18 * fl, 7, sx * 0.3, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 16, 8, 16, 0, 0, 6.283); shape(ctx, '#E8C040', '#2A2A30', 1.2); ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 3; for (const yy of [8, 16, 24]) { ctx.beginPath(); ctx.moveTo(-7, yy); ctx.lineTo(7, yy); ctx.stroke(); }
  circ(ctx, 0, -2, 6.5, '#4A4A30'); circ(ctx, 0, -12, 6.5, '#8A3A2A'); ctx.restore(); }
function coloradokever(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 3; for (const sx of [-1, 1]) for (const yy of [-6, 4, 14]) { ctx.beginPath(); ctx.moveTo(sx * 16, yy); ctx.lineTo(sx * 28, yy + 6); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 6, 20, 26, 0, 0, 6.283); shape(ctx, '#EED890', '#8A7A40', 2); ctx.save(); ctx.clip(); ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 3.5; for (const sx of [-1, 1]) for (const k of [4, 10, 16]) { ctx.beginPath(); ctx.moveTo(sx * k, -18); ctx.lineTo(sx * k, 32); ctx.stroke(); } ctx.restore();
  ctx.beginPath(); ctx.ellipse(0, -22, 13, 8, 0, 0, 6.283); shape(ctx, '#E0A040', '#8A6A30', 1.5); circ(ctx, -4, -22, 2, '#2A2A30'); circ(ctx, 4, -22, 2, '#2A2A30'); ctx.restore(); }
// ---------- planten ----------
function tuinboon(ctx, x, yG, h, o = {}) { const { a = 1, luizen = 0, t = 0, seed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5F9A4E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, yG); ctx.lineTo(x + 4, yG - h); ctx.stroke();
  for (let i = 0; i < 6; i++) { const yy = yG - h * (0.12 + i * 0.14), sx = i % 2 ? 1 : -1, l = 46 - i * 4; ctx.save(); ctx.translate(x + 2, yy); ctx.rotate(sx * (0.9 + 0.1 * Math.sin(t * 1.2 + i + seed))); ctx.beginPath(); ctx.ellipse(0, -l / 2, l * 0.32, l / 2, 0, 0, 6.283); shape(ctx, '#7FB06A', '#5F9A4E', 1.5); ctx.restore(); if (i < 3) { circ(ctx, x + 2 + sx * 10, yy - 6, 6, '#F2EEE4', '#2A2A30', 1.5); } }
  const n = Math.round(luizen * 22); for (let k = 0; k < n; k++) { const u = hash(k * 7 + seed * 31); luis(ctx, x + 4 + (hash(k * 3 + seed) - 0.5) * 12, yG - h * (0.62 + 0.36 * u), 0.55, { rot: (hash(k + seed) - 0.5) * 0.8 }); }
  ctx.restore(); }
function plantTop(ctx, x, y, r, col = '#6FA85E', a = 1, rand = '#4F8A40') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = i / 5 * 6.283 + 0.3; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.45, y + Math.sin(an) * r * 0.45, r * 0.55, r * 0.3, an, 0, 6.283); shape(ctx, col, rand, 1.2); } circ(ctx, x, y, r * 0.22, lighten(col, 0.2)); ctx.restore(); }
function bloem(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = i / 5 * 6.283; circ(ctx, x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.5, col); } circ(ctx, x, y, r * 0.38, '#F0D060'); ctx.restore(); }
function berk(ctx, x, yG, h, a = 1) { if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E8E4DA'; ctx.fillRect(x - h * 0.03, yG - h, h * 0.06, h); ctx.fillStyle = '#2A2A30'; for (let i = 1; i < 6; i++) ctx.fillRect(x - h * 0.03, yG - h * i / 6, h * 0.04, 3); ctx.beginPath(); ctx.ellipse(x, yG - h * 0.75, h * 0.22, h * 0.32, 0, 0, 6.283); shape(ctx, rgba('#9CC86A', 0.9), '#7FA855', 1.5); ctx.restore(); }
function den(ctx, x, yG, h, a = 1) { if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A3A'; ctx.fillRect(x - h * 0.03, yG - h * 0.5, h * 0.06, h * 0.5); ctx.beginPath(); ctx.ellipse(x, yG - h * 0.72, h * 0.24, h * 0.24, 0, 0, 6.283); shape(ctx, '#3E6E4A', '#2E5A3A', 1.5); ctx.restore(); }
function heideStruik(ctx, x, y, s, a = 1, k = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const px = x + (i - 2) * 12 * s, py = y - (6 + 8 * hash(i + k * 5)) * s; circ(ctx, px, py, 9 * s, i % 2 ? '#9C6AA8' : '#B884C0'); } ctx.restore(); }
function graspol(ctx, x, y, h, a = 1, col = '#8FB860') { if (a <= 0.01 || h < 1) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x + i * 3, y); ctx.quadraticCurveTo(x + i * 5, y - h * 0.6, x + i * 9, y - h); ctx.stroke(); } ctx.restore(); }
function suikerriet(ctx, x, yG, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B8B860'; ctx.lineWidth = 12; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(x, yG); ctx.lineTo(x + 6, yG - h); ctx.stroke(); ctx.strokeStyle = '#8A8A40'; ctx.lineWidth = 3; for (let i = 1; i < 7; i++) { const yy = yG - h * i / 7; ctx.beginPath(); ctx.moveTo(x - 6 + 6 * i / 7, yy); ctx.lineTo(x + 6 + 6 * i / 7, yy); ctx.stroke(); }
  ctx.strokeStyle = '#7FA855'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const sx = i % 2 ? 1 : -1, yy = yG - h * (0.7 + i * 0.09); ctx.beginPath(); ctx.moveTo(x + 6, yy); ctx.quadraticCurveTo(x + sx * 70, yy - 50 + Math.sin(t + i) * 4, x + sx * 120, yy + 10); ctx.stroke(); } ctx.restore(); }
function kever(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, larve = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (larve) { ctx.strokeStyle = '#E8E0C8'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 14, 0.6, 5.2); ctx.stroke(); circ(ctx, 14 * Math.cos(5.2), 14 * Math.sin(5.2), 7, '#B8783A'); ctx.restore(); return; }
  ctx.strokeStyle = '#2A2016'; ctx.lineWidth = 2.5; for (const sx of [-1, 1]) for (const yy of [-4, 4, 12]) { ctx.beginPath(); ctx.moveTo(sx * 10, yy); ctx.lineTo(sx * 19, yy + 5); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 4, 12, 17, 0, 0, 6.283); shape(ctx, '#8A6A4A', '#4A3420', 1.5); ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 20); ctx.stroke(); circ(ctx, 0, -14, 6, '#4A3420'); ctx.restore(); }
// ---------- gewervelden ----------
function rietpad(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, dood = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const huid = '#9A7A4A', d = '#6A5030';
  ctx.beginPath(); ctx.ellipse(-30, 18, 26, 14, 0.3, 0, 6.283); shape(ctx, d, null); ctx.beginPath(); ctx.ellipse(30, 22, 14, 10, -0.4, 0, 6.283); shape(ctx, d, null);
  const br = 1 + 0.03 * Math.sin(t * 3); ctx.beginPath(); ctx.ellipse(0, 0, 62 * br, 36 * br, -0.08, 0, 6.283); shape(ctx, huid, d, 2.5);
  ctx.beginPath(); ctx.ellipse(46, -16, 30, 20, 0.15, 0, 6.283); shape(ctx, huid, d, 2.5); ctx.beginPath(); ctx.ellipse(28, -22, 16, 9, 0.2, 0, 6.283); shape(ctx, '#B89A62', d, 2);
  for (let i = 0; i < 14; i++) circ(ctx, -46 + hash(i) * 80, -20 + hash(i + 9) * 36, 3 + 2 * hash(i + 3), '#7A5C34');
  circ(ctx, 52, -28, 7, '#E0B64A', d, 1.5); ctx.fillStyle = '#121A26'; ctx.fillRect(47, -29, 10, 2.5);
  ctx.strokeStyle = d; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(56, -8); ctx.quadraticCurveTo(66, -4, 74, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(46, 26, 9, 18, 0.3, 0, 6.283); shape(ctx, d, null);
  if (dood > 0.01) kruis(ctx, 0, 0, 30, dood); ctx.restore(); }
function varaan(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#7A7A52';
  ctx.strokeStyle = k; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-120, -6, -170, 14); ctx.stroke(); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-170, 14); ctx.lineTo(-200, 24); ctx.stroke();
  ctx.lineWidth = 7; for (const [lx, d] of [[-40, 1], [30, -1]]) { ctx.beginPath(); ctx.moveTo(lx, 6); ctx.lineTo(lx + d * 12, 30); ctx.lineTo(lx + d * 22, 32); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-10, 0, 62, 16, 0, 0, 6.283); shape(ctx, k, '#5A5A3A', 2); ctx.beginPath(); ctx.ellipse(66, -6, 26, 10, -0.15, 0, 6.283); shape(ctx, k, '#5A5A3A', 2); circ(ctx, 72, -10, 3, '#121A26');
  for (let i = 0; i < 9; i++) circ(ctx, -60 + i * 13, -4 + (i % 2) * 6, 3, '#C8C090'); ctx.restore(); }
function buidelmarter(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#8A5A3A';
  ctx.strokeStyle = k; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, -4); ctx.quadraticCurveTo(-80, -30, -100, -10); ctx.stroke();
  ctx.lineWidth = 7; for (const lx of [-26, 24]) { ctx.beginPath(); ctx.moveTo(lx, 10); ctx.lineTo(lx, 30); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 44, 22, 0, 0, 6.283); shape(ctx, k, '#6A4028', 2); ctx.beginPath(); ctx.moveTo(34, -14); ctx.quadraticCurveTo(60, -20, 76, -2); ctx.quadraticCurveTo(56, 8, 34, 8); ctx.closePath(); shape(ctx, k, '#6A4028', 2); circ(ctx, 50, -14, 6, k, '#6A4028', 2); circ(ctx, 58, -6, 2.5, '#121A26'); circ(ctx, 76, -2, 2.5, '#2A2A30');
  [[-24, -8], [-8, -12], [8, -6], [-16, 6], [4, 6], [20, -12]].forEach(([px, py]) => circ(ctx, px, py, 4, '#F2EEE4')); ctx.restore(); }
function slang(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#4A4A40'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, px = -110 + 200 * u, py = Math.sin(u * 9 + t * 2) * 16; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, px = -110 + 200 * u, py = Math.sin(u * 9 + t * 2) * 16 + 4; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); const ey = Math.sin(9 + t * 2) * 16; ctx.beginPath(); ctx.ellipse(96, ey, 14, 9, 0, 0, 6.283); shape(ctx, '#4A4A40', null); circ(ctx, 102, ey - 3, 2.5, '#E0B64A'); ctx.restore(); }
function schaap(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, eet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 6; for (const lx of [-24, -10, 14, 26]) { ctx.beginPath(); ctx.moveTo(lx, 10); ctx.lineTo(lx, 40); ctx.stroke(); }
  for (let i = 0; i < 9; i++) circ(ctx, -30 + (i % 5) * 15, -6 + Math.floor(i / 5) * 16 + (i % 2) * 3, 14, '#EDE8DC', '#C8C0B0', 1.2);
  const hy = eet ? 14 + 6 * Math.sin(t * 3) : -12; ctx.beginPath(); ctx.ellipse(48, hy, 11, 16, -0.6, 0, 6.283); shape(ctx, '#2A2A30', null); circ(ctx, 50, hy - 6, 2, '#F2EEE4'); ctx.restore(); }
function rund(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, eet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const k = '#A8643A';
  ctx.strokeStyle = '#6A3A20'; ctx.lineWidth = 10; for (const lx of [-40, -22, 26, 42]) { ctx.beginPath(); ctx.moveTo(lx, 14); ctx.lineTo(lx, 50); ctx.stroke(); }
  roundRect(ctx, -60, -30, 120, 54, 24); shape(ctx, k, '#7A4428', 2); ctx.strokeStyle = '#C88A5A'; ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 9, 14); ctx.lineTo(-48 + i * 9, 26); ctx.stroke(); }
  const hy = eet ? 18 + 5 * Math.sin(t * 3) : -14; ctx.beginPath(); ctx.ellipse(70, hy, 18, 16, 0.2, 0, 6.283); shape(ctx, k, '#7A4428', 2); ctx.strokeStyle = '#E8DCC0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(62, hy - 12); ctx.quadraticCurveTo(50, hy - 30, 40, hy - 26); ctx.moveTo(76, hy - 12); ctx.quadraticCurveTo(90, hy - 30, 100, hy - 24); ctx.stroke(); ctx.restore(); }
function vis(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, col = '#B8B0A0', t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const zw = Math.sin(t * 5) * 6;
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-56, -16 + zw); ctx.lineTo(-56, 16 + zw); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.beginPath(); ctx.ellipse(0, 0, 40, 20, 0, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1.5); circ(ctx, 26, -4, 3.5, '#121A26'); ctx.restore(); }
function vogel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(t * 8) * 10; ctx.strokeStyle = '#D8CDB0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-28, -6 - f); ctx.quadraticCurveTo(-12, -14, 0, 0); ctx.quadraticCurveTo(12, -14, 28, -6 - f); ctx.stroke(); ctx.restore(); }
// ---------- decor ----------
function kas(ctx, x, y, w, h, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + h * 0.35); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w, y + h * 0.35); ctx.lineTo(x + w, y + h); ctx.closePath(); shape(ctx, rgba('#BFE0F0', 0.12), '#BFD8E8', 3);
  ctx.strokeStyle = rgba('#BFD8E8', 0.6); ctx.lineWidth = 1.5; for (let i = 1; i < 6; i++) { const px = x + w * i / 6; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y + h * 0.35 * (1 - Math.abs(px - x - w / 2) / (w / 2)) + (Math.abs(px - x - w / 2) / (w / 2)) * h * 0.35 * 0 + (1 - Math.abs(px - x - w / 2) / (w / 2)) * 0 + (Math.abs(px - (x + w / 2)) / (w / 2)) * h * 0.35 - 0); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x, y + h * 0.6); ctx.lineTo(x + w, y + h * 0.6); ctx.stroke();
  if (open > 0.01) { ctx.fillStyle = C.bgSchema; ctx.fillRect(x + w - 6, y + h - 120, 12, 120 * open); }
  ctx.restore(); }
function doosje(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'twee', tekst = 'lieveheersbeestjes' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -46, -34, 92, 68, 8); shape(ctx, '#E8DCC0', '#B8A880', 2); lieveheer(ctx, 0, -6, 0.6, { soort }); ctx.fillStyle = '#5A4A30'; ctx.font = fTekst(11, 700); ctx.textAlign = 'center'; ctx.fillText(tekst, 0, 26); ctx.restore(); }
function spuitwolk(ctx, x, y, w, h, u, t, a = 1) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * u; for (let i = 0; i < 70; i++) { const px = x + hash(i * 3) * w + Math.sin(t * 2 + i) * 6, py = y + ((hash(i * 5) + t * 0.4) % 1) * h; circ(ctx, px, py, 2 + 2 * hash(i), rgba(GIF, 0.55)); } ctx.restore(); }
function spuitkop(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -30, 120, 40, 10); shape(ctx, '#6A7080', '#9AA3B2', 2); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-200, -16, 140, 10); for (const px of [-40, 0, 40]) { ctx.beginPath(); ctx.moveTo(px - 8, 10); ctx.lineTo(px + 8, 10); ctx.lineTo(px, 22); ctx.closePath(); shape(ctx, '#9AA3B2', null); } ctx.restore(); }
// grafiekje met assen
function assen(ctx, x, y, w, h, xl, yl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); pijl(ctx, x, y + 10, x, y - 6, C.line, 1, 2, 12); pijl(ctx, x + w - 10, y + h, x + w + 6, y + h, C.line, 1, 2, 12);
  regel(ctx, xl, x + w, y + h + 36, 1, C.text2, 22, 'right', 600); ctx.save(); ctx.translate(x - 16, y); ctx.rotate(-Math.PI / 2); regel(ctx, yl, 0, 0, 1, C.text2, 22, 'right', 600); ctx.restore(); ctx.restore(); }
function lijn(ctx, pts, col, u = 1, lw = 4, a = 1, dash = null) { if (a <= 0.01 || u <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); const n = Math.max(1, Math.floor((pts.length - 1) * clamp(u, 0, 1))); ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore(); return pts[n]; }
// Australië (ruwe omtrek, genormaliseerd 0..1)
const AUS = [[0.05, 0.45], [0.12, 0.3], [0.28, 0.22], [0.36, 0.1], [0.46, 0.12], [0.5, 0.05], [0.6, 0.12], [0.66, 0.02], [0.72, 0.18], [0.8, 0.3], [0.88, 0.42], [0.96, 0.58], [0.94, 0.74], [0.84, 0.9], [0.72, 0.96], [0.62, 0.86], [0.5, 0.74], [0.38, 0.76], [0.22, 0.82], [0.08, 0.8], [0.02, 0.62]];
function australie(ctx, x, y, w, h, a = 1, front = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); AUS.forEach(([u, v], i) => i ? ctx.lineTo(x + u * w, y + v * h) : ctx.moveTo(x + u * w, y + v * h)); ctx.closePath(); shape(ctx, rgba(C.oker, 0.25), C.oker, 2.5);
  if (front > 0.01) { ctx.save(); ctx.clip(); const cx = x + 0.8 * w, cy = y + 0.3 * h; ctx.fillStyle = rgba(C.koraal, 0.5); ctx.beginPath(); ctx.ellipse(cx, cy, w * 0.62 * front, h * 0.5 * front, 0.5, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
// meer in doorsnede: troebel 0 = helder (waterplanten), 1 = troebel (algen, brasem)
function meer(ctx, x, y, w, h, troebel, t, o = {}) { const { a = 1, planten = 1 - troebel, brasem = troebel, fosfaat = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - 60, y + h); ctx.lineTo(x + 60, y + h); ctx.closePath(); ctx.save(); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, y + h); const c1 = troebel < 0.5 ? '#3A78B0' : '#4E7A3A', c2 = troebel < 0.5 ? '#1E4A78' : '#3A5A2A'; g.addColorStop(0, lighten(troebel < 0.5 ? '#3A78B0' : '#5E8A3E', 0)); g.addColorStop(1, '#1A3048'); ctx.fillStyle = '#244E7A'; ctx.fillRect(x, y, w, h); ctx.fillStyle = rgba('#6E9A3A', 0.75 * troebel); ctx.fillRect(x, y, w, h);
  // lichtbundels
  const diep = lerp(0.95, 0.18, troebel); ctx.fillStyle = rgba('#F2E8A0', 0.10); for (let i = 0; i < 5; i++) { const lx = x + w * (0.15 + i * 0.18); ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + 40, y); ctx.lineTo(lx + 70, y + h * diep); ctx.lineTo(lx + 30, y + h * diep); ctx.closePath(); ctx.fill(); }
  // algen
  const na = Math.round(220 * troebel); for (let i = 0; i < na; i++) { const w2 = wander(i, t, 8, 0.3); circ(ctx, x + hash(i * 2) * w + w2.x, y + hash(i * 2 + 1) * h * 0.85 + w2.y, 2.5 + 1.5 * hash(i), rgba('#9CD060', 0.7)); }
  // fosfaat
  const nf = Math.round(40 * fosfaat); for (let i = 0; i < nf; i++) { const w2 = wander(i + 300, t, 10, 0.4); const px = x + hash(i * 7) * w + w2.x, py = y + 20 + hash(i * 7 + 1) * (h - 40) + w2.y; circ(ctx, px, py, 4, C.goud); }
  // bodem
  ctx.fillStyle = '#5A4630'; ctx.beginPath(); ctx.moveTo(x, y + h - 30); for (let i = 0; i <= 20; i++) ctx.lineTo(x + w * i / 20, y + h - 30 + Math.sin(i * 1.7) * 6); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
  // waterplanten (kranswieren)
  if (planten > 0.01) { ctx.save(); ctx.globalAlpha *= planten; for (let i = 0; i < 14; i++) { const px = x + 90 + (w - 180) * i / 13 + (hash(i) - 0.5) * 30, hh = (h - 60) * (0.35 + 0.35 * hash(i + 4)) * planten; ctx.strokeStyle = '#5FB06A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + h - 30); const sw = Math.sin(t * 1.3 + i) * 8; ctx.quadraticCurveTo(px + sw, y + h - 30 - hh / 2, px + sw * 1.5, y + h - 30 - hh); ctx.stroke(); for (let k = 1; k < 5; k++) { const ky = y + h - 30 - hh * k / 5, kx = px + sw * k / 5 * 1.2; ctx.beginPath(); ctx.moveTo(kx - 12, ky - 6); ctx.lineTo(kx, ky); ctx.lineTo(kx + 12, ky - 6); ctx.stroke(); } } ctx.restore(); }
  // brasem + woelwolk
  if (brasem > 0.01) { for (let i = 0; i < 3; i++) { const bx = x + w * (0.25 + 0.25 * i) + Math.sin(t * 0.5 + i * 2) * 50, by = y + h - 70; ctx.save(); ctx.globalAlpha *= brasem * 0.5; for (let k = 0; k < 10; k++) circ(ctx, bx + (hash(k + i * 10) - 0.5) * 120, by + 20 - hash(k * 3 + i) * 50, 10 + 8 * hash(k), rgba('#8A7050', 0.6)); ctx.restore(); vis(ctx, bx, by, 0.9, { a: brasem, kijk: i % 2 ? -1 : 1, col: '#B0A070', t: t + i }); } }
  ctx.restore();
  ctx.strokeStyle = '#8FB0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + w + 20, y); ctx.stroke(); ctx.restore(); }
// voedselweb: knopen [x,y,kleur,label?], verbindingen [i,j]
function web(ctx, nodes, links, o = {}) { const { a = 1, weg = -1, wegA = 0, dood = [], doodA = 0, hl = [], hlA = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  links.forEach(([i, j], k) => { const gone = (i === weg || j === weg) ? wegA : 0; const dd = (dood.includes(i) || dood.includes(j)) ? doodA : 0; const h = hl.includes(k) ? hlA : 0; ctx.save(); ctx.globalAlpha *= (1 - 0.85 * Math.max(gone, dd)); ctx.strokeStyle = h > 0.01 ? C.goud : C.line; ctx.lineWidth = 2.5 + 3 * h; ctx.beginPath(); ctx.moveTo(nodes[i][0], nodes[i][1]); ctx.lineTo(nodes[j][0], nodes[j][1]); ctx.stroke(); ctx.restore(); });
  nodes.forEach(([nx, ny, col], i) => { const gone = i === weg ? wegA : 0, dd = dood.includes(i) ? doodA : 0; ctx.save(); ctx.globalAlpha *= 1 - 0.8 * Math.max(gone, dd); circ(ctx, nx, ny, 22, rgba(col, 0.35), col, 3); ctx.restore(); if (gone > 0.01) kruis(ctx, nx, ny, 18, gone); if (dd > 0.01) kruis(ctx, nx, ny, 18, dd, C.text2); });
  ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { tuinboon(ctx, 1640, 880, 520, { luizen: 0.8, t, seed: 3 }); lieveheer(ctx, 1655, 520 - Math.sin(t * 0.6) * 20, 1.6, { soort: 'azie', t, loop: 1 }); persoon(ctx, 'henk', 1820, 880, 400, { uit: 'denkt', pose: 'denk', kijk: -1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Vanaf', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; grond(ctx, 820, 1, '#5A4630');
      const lz = q.on('luizen', 1, 1.2) * (1 - 0.6 * q.on('eet', 1, 4)); [[1010, 360, 1], [1150, 420, 2], [1290, 380, 3]].forEach(([px, h, sd]) => tuinboon(ctx, px, 820, h, { luizen: lz, t, seed: sd }));
      const dz = q.on('doosje', 1);
      persoon(ctx, 'henk', 420, 840, 470, { uit: q.on('misgaan', 1) > 0.5 ? 'bezorgd' : (dz > 0.5 ? 'blij' : 'denkt'), pose: dz > 0.5 ? 'vasthouden' : 'staan', kijk: 1, t, hold: (c, hx, hy) => doosje(c, hx + 10, hy - 10, 1.2, { a: dz }) });
      persoon(ctx, 'noor', 700, 840, 440, { uit: q.on('bestrijding', 1) > 0.5 ? 'praat' : 'blij', pose: q.on('luizen', 1) > 0.5 && q.localT < q.at('Spuiten', 1) ? 'wijs' : 'staan', kijk: 1, t });
      const zm = q.on('zwarte', 1); zoomCircle(ctx, 1600, 360, 220, 1290, 520, 'tuinboon · vergroot', zm, () => { ctx.fillStyle = '#16233A'; ctx.fillRect(1380, 140, 440, 440); ctx.strokeStyle = '#5F9A4E'; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(1590, 600); ctx.lineTo(1610, 120); ctx.stroke();
        const eet = q.on('lieveheersbeestje', 2, 0.5); const weg = clamp((q.localT - q.at('eet', 1)) / 6, 0, 1); for (let k = 0; k < 16; k++) { if (k / 16 > 1 - weg * 0.75 && k < 12) continue; luis(ctx, 1590 + (hash(k * 5) - 0.5) * 50, 200 + k * 20, 1.25, { rot: (hash(k) - 0.5), t }); }
        lieveheer(ctx, 1600, lerp(600, 470 - 30 * weg, eet), 2.1, { a: eet, soort: 'twee', t, loop: 1 }); });
      naamBij(ctx, 'luizen', null, 1600, 700, zm * (1 - q.on('lieveheersbeestje', 2)), 'center', C.text); naamBij(ctx, 'lieveheersbeestje', null, 1600, 700, q.on('lieveheersbeestje', 2) * (1 - q.on('Dat', 1)), 'center', C.goud);
      tag(ctx, 'tientallen luizen per dag', 1600, 120, C.goud, q.on('tientallen', 1) * (1 - q.on('Dat', 1)), 'center', 28);
      tag(ctx, 'biologische bestrijding: natuurlijke vijand tegen een plaag', 1180, 120, C.groen, q.on('Dat', 1), 'center', 30);
      naamBij(ctx, 'plaag: luizen', null, 1600, 700, q.on('plaag', 1), 'center', PLAAG); naamBij(ctx, 'natuurlijke vijand: lieveheersbeestje', null, 1600, 750, q.on('vijand', 1), 'center', VIJAND);
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; kas(ctx, 140, 260, 640, 460, 1); regel(ctx, 'Nederland · vanaf 1996', 460, 220, 1, C.text2, 30, 'center', 700);
      for (let i = 0; i < 4; i++) plantTop(ctx, 240 + i * 140, 620, 40, '#6FA85E', 1);
      lieveheer(ctx, 460, 470, 2.4, { soort: 'azie', t, loop: 1, rot: Math.sin(t * 0.8) * 0.2 }); naamBij(ctx, 'uit Azië', null, 460, 560, q.on('Azië', 1), 'center', C.oker);
      const vg = q.on('meer', 2); paneel(ctx, 900, 230, 900, 470, 'luizen per dag (schematisch)', vg);
      if (vg > 0.01) { ctx.save(); ctx.globalAlpha *= vg; const bars = [['onze eigen soort', 'twee', 0.55], ['uit Azië', 'azie', 0.9]]; bars.forEach(([n, s, v], i) => { const by = 360 + i * 160; lieveheer(ctx, 990, by, 1.3, { soort: s }); roundRect(ctx, 1060, by - 30, 680 * v * ease((q.localT - q.at('meer', 2)) / 1.2), 60, 10); shape(ctx, rgba(s === 'azie' ? C.oker : C.koraal, 0.4), s === 'azie' ? C.oker : C.koraal, 2); regel(ctx, n, 1080, by + 72, 1, C.text2, 24, 'left', 600); }); ctx.restore(); }
      vraagteken(ctx, 1350, 840, q.on('denk', 1), 130); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['vraag', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; kas(ctx, 120, 300, 520, 420, 1, q.on('ontsnapte', 1)); const os = clamp((q.localT - q.at('ontsnapte', 1)) / 3, 0, 1);
      lieveheer(ctx, lerp(380, 700, os), lerp(560, 230, os) - Math.sin(os * 3.14) * 80, 1.8, { soort: 'azie', t, loop: 1, rot: lerp(0, 1.2, os) });
      const nm = q.on('2002', 1); paneel(ctx, 760, 180, 520, 300, '', nm, C.oker); regel(ctx, '2002 · Nijmegen', 1020, 260, nm, C.oker, 40, 'center', 700); regel(ctx, 'eerste in het wild', 1020, 320, nm * q.on('wild', 1), C.text, 32, 'center', 600);
      const nu = q.on('Nu', 1); paneel(ctx, 1320, 180, 520, 560, 'nu: vaak het gewoonst', nu, C.oker);
      if (nu > 0.01) for (let i = 0; i < 12; i++) { const az = i % 4 !== 3 && i < 11; lieveheer(ctx, 1420 + (i % 4) * 105, 330 + Math.floor(i / 4) * 130, 1.1, { a: nu * ramp(q.localT, q.at('Nu', 1) + i * 0.15, 0.4), soort: az ? 'azie' : (i % 2 ? 'twee' : 'twee'), t }); }
      vraagteken(ctx, 1580, 820, q.on('kon', 1), 90); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'Hoe ontstaat een plaag?', 960, 300, 1, C.text, 64, 'center', 700); for (let k = 0; k < 18; k++) luis(ctx, 560 + k * 46 + Math.sin(t + k) * 4, 520 + Math.sin(k * 1.3) * 40, 1.6, { t, a: ramp(q.localT, q.at('vraag', 1) + k * 0.08, 0.4), col: '#22222A', rand: '#E0E0EA' }); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const X = 110, Y = 150, AW = 1060, AH = 690; const mono = q.on('monocultuur', 1);
    ctx.save(); roundRect(ctx, X, Y, AW, AH, 14); shape(ctx, '#3A3020', '#6A5A40', 2); ctx.restore();
    for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) plantTop(ctx, X + 60 + c * 104, Y + 70 + r * 112, 36, '#6FA85E', ramp(q.localT, 0.2 + (r + c) * 0.03, 0.5));
    tag(ctx, 'monocultuur: één gewas', X + AW / 2, Y - 18, C.goud, mono, 'center', 30);
    const gl = q.on('luis', 1), groei = clamp((q.localT - q.at('luis', 1)) / 16, 0, 1); const nl = Math.round(gl * (8 + 150 * groei * groei));
    for (let k = 0; k < nl; k++) { const c = Math.floor(hash(k * 3) * 10), r = Math.floor(hash(k * 3 + 1) * 6); luis(ctx, X + 60 + c * 104 + (hash(k * 7) - 0.5) * 50, Y + 70 + r * 112 + (hash(k * 9) - 0.5) * 50, 0.95, { rot: hash(k) * 6, t, col: '#22222A', rand: '#E0E0EA' }); }
    tag(ctx, 'gedekte tafel', X + AW / 2, Y + AH + 50, PLAAG, q.on('gedekte', 1) * (1 - q.on('Natuurlijke', 1)), 'center', 28);
    const nv = q.on('Natuurlijke', 1); paneel(ctx, 1230, 150, 610, 330, 'natuurlijke vijanden vinden', nv, VIJAND);
    if (nv > 0.01) { ctx.save(); ctx.globalAlpha *= nv; lieveheer(ctx, 1320, 300, 1.3, { soort: 'twee', t }); sluipwesp(ctx, 1320, 410, 1.2, { t });
      bloem(ctx, 1480, 290, 22, '#E07AB0', q.on('nectar', 1)); kruis(ctx, 1480, 290, 26, q.on('nectar', 1)); regel(ctx, 'geen nectar', 1530, 300, q.on('nectar', 1), C.text, 28, 'left', 600);
      graspol(ctx, 1480, 430, 40, q.on('schuilen', 1)); kruis(ctx, 1480, 405, 26, q.on('schuilen', 1)); regel(ctx, 'geen schuilplek', 1530, 420, q.on('schuilen', 1), C.text, 28, 'left', 600); ctx.restore(); }
    tag(ctx, 'biodiversiteit: laag', 1535, 545, C.koraal, q.on('biodiversiteit', 1), 'center', 30);
    const gp = q.on('populatie', 1); paneel(ctx, 1230, 600, 610, 240, '', gp); if (gp > 0.01) { assen(ctx, 1300, 630, 500, 160, 'tijd', 'luizen', gp); const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([1300 + u * 500, 790 - 150 * Math.pow(u, 2.6)]); } lijn(ctx, pts, PLAAG, clamp((q.localT - q.at('populatie', 1)) / 2, 0, 1), 5, gp); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['eerste', 1], ['coloradokever', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; grond(ctx, 760, 1, '#5A4630'); for (let i = 0; i < 8; i++) tuinboon(ctx, 420 + i * 150, 760, 260, { luizen: 0.6 * (1 - q.on('snel', 1, 1.5)), t, seed: i });
      const sp = q.on('spuiten', 1); spuitkop(ctx, lerp(300, 1500, clamp((q.localT - 0.3) / 4, 0, 1)), 360, 1.3, sp); spuitwolk(ctx, 300, 400, 1300, 360, sp, t, 1);
      tag(ctx, 'werkt snel', 960, 160, C.groen, q.on('snel', 1), 'center', 32);
      ['1', '2', '3'].forEach((s, i) => chip(ctx, s, 1560 + i * 90, 250, C.koraal, q.on('drie', 1) * ramp(q.localT, q.at('drie', 1) + i * 0.25, 0.4), 34)); regel(ctx, 'problemen', 1650, 330, q.on('problemen', 1), C.text2, 30, 'center', 700); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; tag(ctx, '1 · resistentie', 960, 140, C.koraal, 1, 'center', 34);
      const cols = [['generatie 1', 170], ['na het spuiten', 760], ['na een paar jaar', 1350]]; const gold = new Set([5, 17, 26]);
      const pg = q.on('paar', 1), sp = q.on('overleven', 1), vo = q.on('voort', 1), jr = q.on('jaar', 1);
      cols.forEach(([n, cx], ci) => { const al = ci === 0 ? 1 : ci === 1 ? sp : jr; paneel(ctx, cx, 200, 520, 560, n, al); });
      for (let k = 0; k < 30; k++) { const px = 230 + (k % 6) * 80, py = 320 + Math.floor(k / 6) * 85; const g = gold.has(k); luis(ctx, px, py, 1.3, { col: g ? C.goud : '#3B3A44', rand: g ? '#F0D890' : '#A8A8B8', a: g ? 1 : 1, t: t + k }); }
      for (let k = 0; k < 30; k++) { const px = 820 + (k % 6) * 80, py = 320 + Math.floor(k / 6) * 85; const g = gold.has(k); if (sp < 0.01) continue; luis(ctx, px, py, 1.3, { col: g ? C.goud : '#3B3A44', rand: g ? '#F0D890' : '#A8A8B8', a: sp * (g ? 1 : 0.15), t: t + k }); if (!g) kruis(ctx, px, py, 10, sp * 0.5, C.text2); }
      if (vo > 0.01) { for (const k of gold) pijl(ctx, 820 + (k % 6) * 80 + 30, 320 + Math.floor(k / 6) * 85, 1380, 480, C.goud, vo * 0.5 * (1 - jr), 2, 10); }
      for (let k = 0; k < 30; k++) { const px = 1410 + (k % 6) * 80, py = 320 + Math.floor(k / 6) * 85; const g = k !== 9 && k !== 22; luis(ctx, px, py, 1.3, { col: g ? C.goud : '#3B3A44', rand: g ? '#F0D890' : '#A8A8B8', a: jr * ramp(q.localT, q.at('jaar', 1) + k * 0.03, 0.3), t: t + k }); }
      naamBij(ctx, 'erfelijk resistent', null, 430, 810, pg, 'center', C.goud);
      const wn = q.on('wennen', 1); paneel(ctx, 560, 790, 800, 90, '', wn); regel(ctx, 'wennen aan gif', 760, 848, wn, C.text2, 32, 'center', 600); kruis(ctx, 760, 836, 22, q.on('niet', 1)); regel(ctx, 'natuurlijke selectie', 1160, 848, q.on('selectie', 1), C.groen, 32, 'center', 700); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; coloradokever(ctx, 760, 480, 4.2); naamBij(ctx, 'coloradokever', null, 760, 700, 1, 'center', C.oker); tag(ctx, 'resistent tegen > 50 middelen', 1340, 500, C.koraal, q.on('vijftig', 1), 'center', 36); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['Daarna', 1], ['derde', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; tag(ctx, '2 · ook de vijanden gaan dood', 960, 160, C.koraal, 1, 'center', 34); spuitwolk(ctx, 200, 260, 1500, 500, 1, t, 0.7);
      [['lieveheersbeestjes', 'lieveheersbeestjes', 480], ['sluipwespen', 'sluipwespen', 960], ['bijen', 'bijen', 1440]].forEach(([w, n, px], i) => { const d = q.on(w, 1); const al = 1 - 0.6 * d; if (i === 0) lieveheer(ctx, px, 480, 2.4, { soort: 'twee', a: al, t }); else if (i === 1) sluipwesp(ctx, px, 480, 2.4, { a: al, t }); else bij(ctx, px, 470, 2.2, 0, { a: al, t }); kruis(ctx, px, 480, 50, d); naamBij(ctx, n, null, px, 640, ramp(q.localT, q.at(w, 1) - 0.4, 0.4), 'center', VIJAND); }); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 300, gy = 200, gw = 1300, gh = 560; assen(ctx, gx, gy, gw, gh, 'tijd', 'aantal', 1); const st = gx + gw * 0.22;
      ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = GIF; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(st, gy); ctx.lineTo(st, gy + gh); ctx.stroke(); ctx.restore(); regel(ctx, 'spuiten', st, gy - 14, 1, GIF, 26, 'center', 700);
      const L = [], V = []; for (let i = 0; i <= 60; i++) { const u = i / 60, x = gx + u * gw; let l, v; if (u < 0.22) { l = 0.45; v = 0.3; } else { const s2 = (u - 0.22) / 0.78; l = 0.05 + 0.9 * (1 - Math.exp(-s2 * 4)) * (1 - 0.15 * s2); v = 0.03 + 0.22 * Math.pow(s2, 1.8); } L.push([x, gy + gh - gh * l]); V.push([x, gy + gh - gh * v]); }
      const u = clamp((q.localT - q.at('Daarna', 1)) / 5, 0, 1); lijn(ctx, L, PLAAG, u, 5); lijn(ctx, V, VIJAND, u, 5);
      naamBij(ctx, 'luizen', null, gx + gw * 0.7, gy + gh - gh * 0.88 - 20, q.on('luizen', 1), 'center', PLAAG); naamBij(ctx, 'vijanden', null, gx + gw * 0.82, gy + gh - gh * 0.24 + 50, q.on('vijanden', 1), 'center', VIJAND);
      ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(PLAAG, 0.6); ctx.lineWidth = 2; ctx.globalAlpha *= q.on('groter', 1); ctx.beginPath(); ctx.moveTo(gx, gy + gh - gh * 0.45); ctx.lineTo(gx + gw, gy + gh - gh * 0.45); ctx.stroke(); ctx.restore(); tag(ctx, 'groter dan ervoor', gx + gw * 0.55, gy + 40, PLAAG, q.on('groter', 1), 'center', 28); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; tag(ctx, '3 · ophoping in de voedselketen', 960, 160, C.koraal, 1, 'center', 34); const keten = [['blad', 360], ['luis', 760], ['lieveheersbeestje', 1160], ['vogel', 1560]]; keten.forEach(([n, px], i) => { const al = ramp(q.localT, q.at('hopen', 1) + i * 0.4, 0.5); paneel(ctx, px - 150, 300, 300, 300, n, al); ctx.save(); ctx.globalAlpha *= al; for (let k = 0; k < [2, 5, 10, 18][i]; k++) circ(ctx, px - 90 + (k % 6) * 36, 420 + Math.floor(k / 6) * 40, 8, GIF); ctx.restore(); if (i) pijl(ctx, px - 250, 450, px - 160, 450, C.line, al, 3); });
      tag(ctx, 'meer in de film Eén aarde', 960, 720, C.goud, q.on('film', 1), 'center', 30); ctx.restore(); } },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const kz = q.on('Een', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - kz; kas(ctx, 200, 200, 900, 600, 1); for (let i = 0; i < 5; i++) { const px = 320 + i * 170; ctx.strokeStyle = '#5F9A4E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, 790); ctx.lineTo(px, 470); ctx.stroke(); for (let k = 0; k < 4; k++) plantTop(ctx, px + (k % 2 ? 30 : -30), 520 + k * 70, 26, '#6FA85E'); circ(ctx, px + 20, 600, 14, '#D84A3A'); circ(ctx, px - 22, 680, 13, '#D84A3A'); }
      for (let k = 0; k < 10; k++) witteVlieg(ctx, 300 + hash(k) * 700, 500 + hash(k + 5) * 250 + Math.sin(t * 2 + k) * 8, 1.1);
      const sw = q.on('sluipwespen', 1); for (let k = 0; k < 6; k++) { const w2 = wander(k, t, 60, 0.6); sluipwesp(ctx, 500 + k * 90 + w2.x, 380 + w2.y, 1.1, { a: sw, t, vlieg: 1 }); }
      naamBij(ctx, 'sluipwespen', null, 760, 330, sw, 'center', VIJAND); naamBij(ctx, 'witte vlieg', null, 650, 860, q.on('vlieg', 1), 'center', C.text); tag(ctx, 'kas', 650, 180, C.text2, 1, 'center', 26); ctx.restore();
    if (kz > 0.01) { ctx.save(); ctx.globalAlpha *= kz; paneel(ctx, 160, 170, 1000, 640, '', 1); regel(ctx, 'onderkant van een blad', 200, 225, 1, C.text2, 26, 'left', 700); ctx.fillStyle = rgba('#7FB06A', 0.25); ctx.beginPath(); ctx.ellipse(660, 520, 440, 230, 0, 0, 6.283); ctx.fill();
      const ei = q.on('ei', 1), wl = q.on('wesplarve', 1), zw = q.on('binnenuit', 1, 2); vliegLarve(ctx, 660, 560, 4.5, { ei, wesp: wl, zwart: zw * 0.85 }); naamBij(ctx, 'larve van witte vlieg', null, 660, 760, 1, 'center', C.text);
      const ld = ramp(q.localT, q.at('legt', 1) - 0.5, 1) * (1 - q.on('wesplarve', 1)); sluipwesp(ctx, 640, lerp(330, 410, ld), 3.0, { boor: ld, t, rot: 0.15 }); naamBij(ctx, 'sluipwesp', null, 840, 300, 1 - wl, 'left', VIJAND); naamBij(ctx, 'ei', null, 740, 520, ei * (1 - wl), 'left', C.goud); naamBij(ctx, 'wesplarve', null, 800, 520, wl, 'left', C.goud); ctx.restore(); }
    const tm = q.on('tomaten', 1); paneel(ctx, 1240, 170, 600, 400, 'biologisch bestreden', tm); ['tomaat', "paprika", 'komkommer'].forEach((n, i) => { const al = tm * ramp(q.localT, q.at('tomaten', 1) + i * 0.6, 0.4); regel(ctx, n, 1300, 290 + i * 80, al, C.text, 34, 'left', 600); regel(ctx, '± 100%', 1780, 290 + i * 80, al, C.groen, 34, 'right', 700); });
    tag(ctx, 'specialist: alleen witte vlieg', 1540, 680, C.groen, q.on('specialist', 1), 'center', 30); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['exoot', 1], ['tweestippelig', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; lieveheer(ctx, 480, 440, 4, { soort: 'azie', t, loop: 1, rot: Math.sin(t * 0.7) * 0.15 }); naamBij(ctx, 'Aziatisch lieveheersbeestje', null, 480, 640, 1, 'center', C.oker); tag(ctx, 'geen specialist', 480, 220, C.koraal, q.on('specialist', 1), 'center', 30);
      paneel(ctx, 900, 170, 900, 400, 'eet', q.on('eet', 1)); luis(ctx, 1000, 300, 1.6, { a: q.on('eet', 1) }); regel(ctx, 'luizen', 1050, 312, q.on('eet', 1), C.text, 30);
      regel(ctx, 'andere insecten', 1320, 312, q.on('insecten', 1), C.text, 30); const ex = q.on('eitjes', 1); for (let k = 0; k < 5; k++) { ctx.save(); ctx.globalAlpha *= ex; ctx.beginPath(); ctx.ellipse(990 + k * 18, 440, 6, 10, 0, 0, 6.283); shape(ctx, '#F0D060', '#B8A040', 1); ctx.restore(); }
      lieveheer(ctx, 1200, 440, 1.2, { soort: 'twee', a: q.on('larven', 1) }); regel(ctx, 'eitjes en larven van andere lieveheersbeestjes', 1270, 452, q.on('larven', 1), C.text, 26);
      const bu = q.on('buiten', 1); paneel(ctx, 900, 610, 430, 220, '', bu); regel(ctx, 'overleeft buiten', 1115, 700, bu, C.text, 32, 'center', 700); vink_(ctx, 1115, 765, 22, bu);
      const vv = q.on('vijanden', 1); paneel(ctx, 1370, 610, 430, 220, '', vv); regel(ctx, 'weinig eigen vijanden', 1585, 700, vv, C.text, 32, 'center', 700); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; paneel(ctx, 160, 180, 1600, 260, '', 1, C.oker); regel(ctx, 'exoot', 220, 270, 1, C.oker, 48, 'left', 700); tekstBlok(ctx, 'een soort die door de mens buiten zijn eigen verspreidingsgebied terechtkomt, en zich daar vestigt', 220, 340, 1480, 34, C.text, q.on('soort', 1));
      const mp = q.on('mens', 1); regel(ctx, 'Azië', 1500, 640, mp, C.text2, 34, 'center', 700); regel(ctx, 'Europa', 420, 640, mp, C.text2, 34, 'center', 700); boogPijl(ctx, 1420, 620, 520, 620, -0.15, C.oker, mp, 5); lieveheer(ctx, 970, 560 - 70 * Math.sin(clamp((q.localT - q.at('mens', 1)) / 3, 0, 1) * 3.14), 1.4, { soort: 'azie', a: mp }); regel(ctx, 'door de mens', 970, 740, mp, C.oker, 30, 'center', 600); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; lieveheer(ctx, 420, 420, 3.6, { soort: 'twee', t }); naamBij(ctx, 'tweestippelig lieveheersbeestje', 'inheems', 420, 610, 1, 'center', C.koraal);
      const gx = 820, gy = 220, gw = 600, gh = 380; assen(ctx, gx, gy, gw, gh, 'jaren', 'aantal', q.on('achteruit', 1)); const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([gx + u * gw, gy + gh * (0.2 + 0.65 * ease((u - 0.25) / 0.6))]); } lijn(ctx, pts, C.koraal, clamp((q.localT - q.at('achteruit', 1) + 0.5) / 2, 0, 1), 5, q.on('achteruit', 1));
      const dz = q.on('doosje', 1); doosje(ctx, 1640, 420, 2.4, { a: dz }); persoon(ctx, 'henk', 1640, 880, 300, { a: dz, uit: 'blij', kijk: -1, t }); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); grond(ctx, 780, 1, '#6A5A30'); for (let i = 0; i < 7; i++) suikerriet(ctx, 900 + i * 130, 780, 520 + (i % 3) * 30, 1, t + i);
    for (let i = 0; i < 5; i++) kever(ctx, 920 + i * 260 + (i % 2) * 20, 300 + (i % 3) * 30, 1.2, { a: q.on('kevers', 1), rot: 0.4 * (i % 2 ? 1 : -1) }); naamBij(ctx, 'kevers', null, 1500, 230, q.on('kevers', 1), 'center', C.oker);
    tag(ctx, '1935 · Australië', 420, 200, C.oker, q.on('1935', 1), 'center', 36); const hw = q.on('Hawaï', 1); regel(ctx, 'uit Hawaï', 420, 300, hw, C.text2, 30, 'center', 700);
    const n = q.on('honderd', 1); roundRect(ctx, 220, 560, 400, 210, 12); ctx.save(); ctx.globalAlpha *= n; shape(ctx, '#7A5A3A', '#A8805A', 3); ctx.restore(); for (let k = 0; k < 6; k++) rietpad(ctx, 280 + (k % 3) * 130, 610 + Math.floor(k / 3) * 90, 0.6, { a: n * ramp(q.localT, q.at('honderd', 1) + k * 0.15, 0.4), t: t + k });
    regel(ctx, '± 100 padden', 420, 820, n, C.text, 30, 'center', 700); naamBij(ctx, 'rietpadden', null, 420, 520, q.on('rietpadden', 1), 'center', C.oker); vraagteken(ctx, 760, 560, q.on('denk', 1), 130); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc, D] = fasen(q, [null, ['Nu', 1], ['giftig', 1], ['Zo', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; grond(ctx, 640, 1, '#6A5A30'); for (let i = 0; i < 5; i++) suikerriet(ctx, 260 + i * 150, 640, 480, 1, t + i);
      kever(ctx, 420, 200, 1.6, { a: q.on('hoog', 1) }); kever(ctx, 720, 230, 1.6, { a: q.on('hoog', 1), rot: 0.5 }); naamBij(ctx, 'kever: hoog in het riet', null, 570, 140, q.on('hoog', 1), 'center', C.oker);
      kever(ctx, 450, 760, 1.6, { larve: true, a: q.on('larve', 1) }); naamBij(ctx, 'larve in de grond', null, 560, 830, q.on('larve', 1), 'left', C.oker);
      rietpad(ctx, 1000, 600, 1.4, { t }); ctx.save(); ctx.globalAlpha *= q.on('bij', 1); ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1040, 600, 130, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.restore(); kruis(ctx, 900, 420, 26, q.on('bij', 1));
      const al = q.on('alles', 1); paneel(ctx, 1240, 200, 600, 400, 'eet wel', al); if (al > 0.01) { kever(ctx, 1340, 340, 1.1, { a: al }); luis(ctx, 1460, 340, 1.4, { a: al }); lieveheer(ctx, 1580, 340, 1.1, { a: al, soort: 'twee' }); bij(ctx, 1700, 330, 1, 0, { a: al, t }); regel(ctx, 'alles wat op de grond loopt', 1540, 480, al, C.text, 28, 'center', 600); } ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const fr = clamp((q.localT - q.at('Nu', 1)) / 3, 0, 1); australie(ctx, 360, 180, 900, 620, 1, 0.15 + 0.85 * fr); regel(ctx, 'Australië', 810, 520, 1, C.text2, 30, 'center', 700); tag(ctx, '> 200 miljoen rietpadden', 1530, 400, C.koraal, q.on('miljoen', 1), 'center', 34); rietpad(ctx, 1530, 560, 1.3, { t, a: q.on('rietpadden', 1) }); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; tag(ctx, 'giftig', 960, 170, C.koraal, 1, 'center', 34); rietpad(ctx, 960, 330, 1.1, { t }); [['Varanen', 'varaan', 420], ['buidelmarters', 'buidelmarter', 960], ['slangen', 'slang', 1500]].forEach(([w, n, px], i) => { const al = q.on(w, 1); if (i === 0) varaan(ctx, px + 40, 600, 1.4, { a: al }); else if (i === 1) buidelmarter(ctx, px, 600, 1.6, { a: al }); else slang(ctx, px, 600, 1.4, { a: al, t }); naamBij(ctx, n, null, px, 720, al, 'center', C.text); kruis(ctx, px + 60, 540, 22, q.on('dood', 1) * al, C.koraal); }); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; regel(ctx, 'Zo maakt een bestrijder het erger', 960, 210, 1, C.text, 44, 'center', 700); [['weinig vijanden', 'vijanden', 420], ['eet ook andere soorten', 'soorten', 960], ['nooit meer terug', 'terug', 1500]].forEach(([s2, w, px]) => { const al = q.on(w, 1); paneel(ctx, px - 250, 320, 500, 260, '', al, C.koraal); tekstBlok(ctx, s2, px - 210, 440, 420, 38, C.text, al, 1.2, 700); }); rietpad(ctx, 960, 720, 1.1, { t }); lieveheer(ctx, 1200, 730, 1.3, { soort: 'azie', t }); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'geïntegreerde bestrijding', 960, 140, C.groen, q.on('combineren', 1), 'center', 36);
    const st = [['1', 'voorkomen', 'minder vatbaar ras · wisselen van gewas', 'kiezen'], ['2', 'vroeg natuurlijke vijanden', 'werken het best als de plaag klein is', 'Natuurlijke'], ['3', 'spuiten alleen boven de grens', 'met een middel dat weinig andere soorten raakt', 'Spuiten']];
    st.forEach(([nr, k, s2, w], i) => { const al = q.on(w, 1), yy = 210 + i * 200; paneel(ctx, 120, yy, 960, 170, '', al, C.groen); text(ctx, nr, 180, yy + 110, fTitel(64), rgba(C.groen, al), 'center'); regel(ctx, k, 240, yy + 75, al, C.text, 36, 'left', 700); regel(ctx, s2, 240, yy + 128, al, C.text2, 28, 'left', 500); });
    lieveheer(ctx, 990, 495, 1.1, { a: q.on('Natuurlijke', 1), soort: 'twee', t }); sluipwesp(ctx, 1040, 470, 0.9, { a: q.on('Natuurlijke', 1), t });
    const gx = 1180, gy = 230, gw = 620, gh = 420, g = q.on('plaag', 1); assen(ctx, gx, gy, gw, gh, 'tijd', 'plaag', g);
    if (g > 0.01) { const pts = []; for (let i = 0; i <= 50; i++) { const u = i / 50; pts.push([gx + u * gw, gy + gh - gh * (0.1 + 0.5 * Math.pow(Math.sin(u * 3.14 * 0.9), 2) * (0.6 + 0.6 * u))]); } lijn(ctx, pts, PLAAG, clamp((q.localT - q.at('plaag', 1)) / 4, 0, 1), 5, g);
      const gr = q.on('grens', 1); ctx.save(); ctx.globalAlpha *= gr; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.38); ctx.lineTo(gx + gw, gy + gh * 0.38); ctx.stroke(); ctx.restore(); regel(ctx, 'grens', gx + gw - 10, gy + gh * 0.38 - 12, gr, C.goud, 26, 'right', 700); regel(ctx, 'pas hier spuiten', gx + gw - 10, gy + gh * 0.38 - 48, gr, C.text2, 24, 'right', 600); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); const X = 380, Y = 160, AW = 1000, AH = 640; const sk = q.on('strokenteelt', 1, 1.2);
    roundRect(ctx, X, Y, AW, AH, 12); shape(ctx, '#3A3020', '#6A5A40', 2);
    const kl = ['#6FA85E', '#C8B050', '#5E8FA8', '#A87A5E']; for (let r = 0; r < 8; r++) for (let c = 0; c < 9; c++) { const col = sk > 0.5 ? kl[c % 4] : '#6FA85E'; plantTop(ctx, X + 60 + c * 110, Y + 50 + r * 78, 26, col, 1); }
    tag(ctx, 'strokenteelt', X + AW / 2, Y - 14, C.goud, sk, 'center', 30);
    const br = q.on('bloemrand', 1); if (br > 0.01) { ctx.save(); ctx.globalAlpha *= br; roundRect(ctx, 120, Y, 220, AH, 12); shape(ctx, rgba(C.groen, 0.15), C.groen, 2); const kc = ['#E07AB0', '#F0D060', '#8C7BBF', '#F2F2EE', '#E07A5F']; for (let k = 0; k < 26; k++) { graspol(ctx, 150 + hash(k) * 160, Y + 40 + hash(k + 3) * (AH - 60), 24); bloem(ctx, 150 + hash(k * 2) * 160, Y + 30 + hash(k * 2 + 1) * (AH - 60), 12, kc[k % 5]); } ctx.restore(); naamBij(ctx, 'bloemrand', null, 230, Y + AH + 50, br, 'center', C.groen); }
    const ins = [['sluipwespen', 0], ['zweefvliegen', 1], ['lieveheersbeestjes', 2]]; ins.forEach(([w, i]) => { const al = q.on(w, 1); const w2 = wander(i, t, 40, 0.5); const px = 230 + w2.x, py = Y + 140 + i * 180 + w2.y; if (i === 0) sluipwesp(ctx, px, py, 1.4, { a: al, t, vlieg: 1 }); else if (i === 1) zweefvlieg(ctx, px, py, 1.5, { a: al, t }); else lieveheer(ctx, px, py, 1.4, { a: al, soort: 'twee', t }); });
    const nk = q.on('vijanden', 2); for (let k = 0; k < 8; k++) { const w2 = wander(k + 20, t, 30, 0.4); const px = X + 100 + (k % 4) * 240 + w2.x, py = Y + 120 + Math.floor(k / 4) * 360 + w2.y; if (k % 3 === 0) lieveheer(ctx, px, py, 0.9, { a: nk, soort: 'twee', t }); else if (k % 3 === 1) sluipwesp(ctx, px, py, 0.9, { a: nk, t }); else zweefvlieg(ctx, px, py, 0.9, { a: nk, t }); }
    const hw = q.on('Hoeksche', 1); paneel(ctx, 1420, 220, 420, 300, 'Hoeksche Waard', hw * (1 - sk), C.groen); tekstBlok(ctx, 'met bloemranden een paar jaar niet tegen luizen gespoten', 1450, 330, 360, 30, C.text, hw * (1 - sk));
    tag(ctx, 'vijanden om de hoek', 1610, 760, C.groen, nk, 'center', 28); },

  // ---------- H3 ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['graslanden', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, CAPTION_Y - 10); ctx.clip(); ctx.translate(960, 790); ctx.scale(1.45, 1.45); ctx.translate(-960, -760); grond(ctx, 760, 1, '#4A3A50'); const ds = clamp((q.localT - q.at('dicht', 1)) / 3, 0, 1), ge = clamp((q.localT - q.at('boompjes', 1)) / 2.5, 0, 1); const groei = ds * (1 - 0.85 * ge);
      for (let i = 0; i < 16; i++) heideStruik(ctx, 160 + i * 105, 760 - (i % 3) * 18, 1.4, 1, i);
      for (let i = 0; i < 10; i++) graspol(ctx, 210 + i * 170, 760, 60 * groei);
      [[360, 'b'], [700, 'd'], [1040, 'b'], [1380, 'd'], [1650, 'b']].forEach(([px, s2], i) => { const h = 260 * groei * (0.8 + 0.3 * hash(i)); if (s2 === 'b') berk(ctx, px, 760, h); else den(ctx, px, 760, h); });
      tag(ctx, 'zonder beheer: groeit dicht', 960, 160, C.text2, ds * (1 - q.on('schapen', 1)), 'center', 30);
      const sc = q.on('schapen', 1), rn = q.on('runderen', 1), veel = q.on('veel', 1); for (let i = 0; i < 3 + Math.round(veel * 5); i++) { const px = 320 + i * 190 + Math.sin(t * 0.3 + i) * 20; schaap(ctx, px, 700 + (i % 2) * 40, 1.2, { a: sc * (i < 3 ? 1 : veel), t: t + i, eet: 1, kijk: i % 2 ? -1 : 1 }); }
      rund(ctx, 1560, 680, 1.2, { a: rn, t, eet: 1, kijk: -1 }); const zz = q.on('zeldzame', 1); bloem(ctx, 1150, 740, 16, '#5BA4C9', 1 - 0.7 * zz); kruis(ctx, 1150, 740, 22, zz); ctx.restore(); tag(ctx, 'heide blijft open', 960, 160, C.groen, q.on('open', 1) * (1 - veel), 'center', 32);
      tag(ctx, 'te veel grazers: zeldzame planten weg, bodem vertrapt', 960, 160, C.koraal, veel, 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; grond(ctx, 720, 1, '#3A5540'); const mm = clamp((q.localT - q.at('maait', 1)) / 2, 0, 1), af = clamp((q.localT - q.at('af.', 1)) / 2, 0, 1), arm = q.on('arme', 1);
      for (let i = 0; i < 40; i++) { const px = 120 + i * 30; const cut = px < 120 + mm * 1200; graspol(ctx, px, 720, cut ? 24 : 220); }
      regel(ctx, 'maaien', 400, 470, q.on('maait', 1), C.text, 40, 'center', 700);
      const wx = lerp(900, 1750, af); roundRect(ctx, wx - 110, 560, 220, 110, 10); ctx.save(); ctx.globalAlpha *= q.on('voert', 1); shape(ctx, '#C8B050', '#8A7A30', 2); circ(ctx, wx - 60, 680, 22, '#3A3F4E', '#9AA3B2', 3); circ(ctx, wx + 60, 680, 22, '#3A3F4E', '#9AA3B2', 3); ctx.restore(); regel(ctx, 'maaisel afvoeren', 1300, 460, q.on('voert', 1), C.text, 34, 'center', 700);
      for (let k = 0; k < 8; k++) circ(ctx, wx - 80 + k * 22, 540 - (k % 2) * 14, 7, C.goud, null, 1); regel(ctx, 'voedingsstoffen weg', 1300, 510, q.on('voedingsstoffen', 1), C.goud, 28, 'center', 700);
      const kc = ['#E07AB0', '#F0D060', '#8C7BBF', '#5BA4C9']; for (let k = 0; k < 18; k++) bloem(ctx, 160 + k * 60, 680 - hash(k) * 30, 19, kc[k % 4], arm); naamBij(ctx, 'planten van arme grond', null, 640, 800, arm, 'center', C.groen); ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['exoten', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; ctx.fillStyle = rgba('#C8B050', 0.18); ctx.fillRect(120, 180, 1680, 640); for (let i = 0; i < 6; i++) { ctx.strokeStyle = rgba('#C8B050', 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(120, 220 + i * 110); ctx.lineTo(1800, 220 + i * 110); ctx.stroke(); }
      const gebieden = [[460, 500, 230], [1460, 500, 230]]; gebieden.forEach(([gx, gy, r]) => { blob(ctx, gx, gy, r, r * 0.8, 0.08, gx); shape(ctx, rgba(C.groen, 0.35), C.groen, 3); for (let k = 0; k < 9; k++) den(ctx, gx - 150 + (k % 3) * 150, gy - 60 + Math.floor(k / 3) * 80, 70); });
      ctx.fillStyle = '#4A4E5A'; ctx.fillRect(900, 180, 120, 640); ctx.strokeStyle = '#E8E4DA'; ctx.lineWidth = 4; ctx.setLineDash([24, 20]); ctx.beginPath(); ctx.moveTo(960, 180); ctx.lineTo(960, 820); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'weg', 960, 160, 1, C.text2, 24, 'center', 700);
      const uit = q.on('uit,', 1); for (let k = 0; k < 6; k++) circ(ctx, 380 + (k % 3) * 80, 470 + Math.floor(k / 3) * 70, 11, C.oker, null, 1); for (let k = 0; k < 6; k++) { ctx.save(); ctx.globalAlpha *= 1 - uit; circ(ctx, 1380 + (k % 3) * 80, 470 + Math.floor(k / 3) * 70, 11, C.oker); ctx.restore(); } kruis(ctx, 1460, 500, 30, uit * (1 - q.on('ecoducten', 1)));
      const nt = q.on('niemand', 1) * (1 - q.on('ecoducten', 1)); ctx.save(); ctx.globalAlpha *= nt; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(640, 500); ctx.lineTo(880, 500); ctx.stroke(); ctx.restore(); kruis(ctx, 900, 500, 20, nt);
      const ec = q.on('ecoducten', 1); if (ec > 0.01) { ctx.save(); ctx.globalAlpha *= ec; roundRect(ctx, 650, 455, 620, 90, 20); shape(ctx, rgba(C.groen, 0.7), C.groen, 3); for (let k = 0; k < 8; k++) graspol(ctx, 690 + k * 75, 515, 26); ctx.restore(); const mv = clamp((q.localT - q.at('ecoducten', 1)) / 3, 0, 1); circ(ctx, lerp(560, 1400, mv), 500, 11, C.oker); naamBij(ctx, 'ecoduct', null, 960, 610, ec, 'center', C.groen); }
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; grond(ctx, 760, 1, '#3A5540'); regel(ctx, 'Amerikaanse vogelkers (exoot)', 760, 200, 1, C.oker, 36, 'center', 700);
      const zg = q.on('afgezaagde', 1), ui = clamp((q.localT - q.at('lopen', 1)) / 2.5, 0, 1), vg = q.on('vogels', 1);
      ctx.fillStyle = '#7A5A3A'; ctx.fillRect(735, 760 - lerp(260, 40, zg), 50, lerp(260, 40, zg)); ctx.save(); ctx.globalAlpha *= 1 - zg; blob(ctx, 760, 420, 220, 160, 0.1, 3); shape(ctx, '#4E7A44', '#3E6A34', 2); for (let k = 0; k < 14; k++) circ(ctx, 640 + hash(k) * 240, 360 + hash(k + 4) * 140, 7, '#2A1A2A'); ctx.restore();
      if (ui > 0.01) for (let k = 0; k < 6; k++) { const an = -1.9 + k * 0.38; ctx.strokeStyle = '#6E9A4E'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(760, 722); ctx.lineTo(760 + Math.cos(an) * 160 * ui, 722 + Math.sin(an) * 160 * ui); ctx.stroke(); plantTop(ctx, 760 + Math.cos(an) * 160 * ui, 722 + Math.sin(an) * 160 * ui, 22 * ui, '#6E9A4E'); }
      naamBij(ctx, 'loopt weer uit', null, 1000, 600, ui, 'left', C.text); for (let k = 0; k < 3; k++) { const vx = lerp(1800, 1150 + k * 160, vg) + Math.sin(t + k) * 10; vogel(ctx, vx, 330 + k * 70, 1.4, vg, t + k); circ(ctx, vx - 10, 352 + k * 70, 6, '#2A1A2A', null, 1); } naamBij(ctx, 'nieuwe zaden', null, 1400, 600, vg, 'center', C.text);
      tag(ctx, 'jarenlang werk', 760, 860, C.goud, q.on('jarenlang', 1), 'center', 30); ctx.restore(); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['veerkracht', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const wv = q.on('Valt', 1), ov = q.on('overstappen', 1);
      paneel(ctx, 120, 170, 800, 560, 'weinig soorten', q.on('verschillende', 1)); paneel(ctx, 1000, 170, 800, 560, 'veel soorten', q.on('verschillende', 1));
      const n1 = [[520, 300, C.koraal], [520, 470, C.oker], [520, 640, C.groen]], l1 = [[0, 1], [1, 2]];
      web(ctx, n1, l1, { a: q.on('verschillende', 1), weg: 1, wegA: wv, dood: [0], doodA: ov });
      const n2 = [[1400, 280, C.koraal], [1180, 430, C.oker], [1400, 450, C.oker], [1620, 430, C.oker], [1130, 640, C.groen], [1300, 640, C.groen], [1480, 640, C.groen], [1660, 640, C.groen]], l2 = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7], [1, 6], [3, 5]];
      web(ctx, n2, l2, { a: q.on('verschillende', 1), weg: 2, wegA: wv, hl: [0, 2], hlA: ov });
      tag(ctx, 'meer verbindingen', 1400, 790, C.groen, q.on('verbindingen', 1) * (1 - ov), 'center', 28); tag(ctx, 'rover valt ook weg', 520, 790, C.koraal, ov, 'center', 28); tag(ctx, 'rover stapt over', 1400, 790, C.goud, ov, 'center', 28);
      tag(ctx, 'stabieler', 1400, 150, C.groen, q.on('stabieler', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; tag(ctx, 'veerkracht: hoe snel herstelt het na een verstoring?', 960, 150, C.groen, 1, 'center', 32); const gx = 300, gy = 240, gw = 1300, gh = 500; assen(ctx, gx, gy, gw, gh, 'tijd', 'ecosysteem', 1);
      const vs = q.on('verstoring', 1); const dx = gx + gw * 0.25; ctx.save(); ctx.globalAlpha *= vs; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dx, gy); ctx.lineTo(dx, gy + gh); ctx.stroke(); ctx.restore(); regel(ctx, 'droge zomer', dx, gy - 14, q.on('droge', 1), C.oker, 26, 'center', 700);
      const mk = (k) => { const p = []; for (let i = 0; i <= 60; i++) { const u = i / 60, x = gx + u * gw; let v = 0.8; if (u > 0.25) { const s2 = (u - 0.25) / 0.75; v = 0.8 - 0.5 * Math.exp(-s2 * k) ; } p.push([x, gy + gh - gh * v]); } return p; };
      const u = clamp((q.localT - q.at('verstoring', 1)) / 3, 0, 1); lijn(ctx, mk(10), C.groen, u, 5); lijn(ctx, mk(2.2), C.koraal, u, 5); naamBij(ctx, 'veel soorten: snel terug', null, gx + gw * 0.62, gy + gh - gh * 0.8 - 22, q.on('sneller', 1), 'center', C.groen); naamBij(ctx, 'weinig soorten', null, gx + gw * 0.5, gy + gh - gh * 0.45 + 60, q.on('sneller', 1), 'center', C.koraal); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); const fo = q.on('fosfaat', 1), om = q.on('sloeg', 1, 1.2); const groei = clamp((q.localT - q.at('fosfaat', 1)) / 6, 0, 1);
    const tr = Math.max(om, 0.12 * groei); meer(ctx, 140, 260, 1000, 480, tr, t, { planten: 1 - q.on('verdwenen', 1, 1.5) * 0.98 - 0.1 * groei * (1 - om), brasem: om, fosfaat: fo * (0.3 + 0.7 * groei) });
    regel(ctx, 'Veluwemeer', 640, 200, q.on('Veluwemeer', 1), C.text2, 34, 'center', 700); naamBij(ctx, 'waterplanten', null, 640, 690, q.on('waterplanten', 1) * (1 - om), 'center', C.groen);
    ctx.save(); ctx.globalAlpha *= fo; ctx.fillStyle = '#6A7080'; ctx.fillRect(1100, 220, 120, 24); ctx.restore(); naamBij(ctx, 'fosfaat uit rioolwater', null, 1180, 205, fo, 'center', C.goud);
    const gx = 1330, gy = 300, gw = 480, gh = 400, g = q.on('Lang', 1, 0.8); paneel(ctx, 1290, 230, 560, 560, '', Math.max(g, fo)); assen(ctx, gx, gy, gw, gh, 'jaren', '', Math.max(g, fo));
    const u = clamp((q.localT - q.at('fosfaat', 1)) / (q.at('sloeg', 1) + 1.5 - q.at('fosfaat', 1)), 0, 1); const P = [], Hd = []; for (let i = 0; i <= 50; i++) { const v = i / 50, x = gx + v * gw; P.push([x, gy + gh - gh * (0.1 + 0.7 * v)]); Hd.push([x, gy + gh - gh * (v < 0.75 ? 0.85 - 0.08 * v : 0.12)]); } lijn(ctx, P, C.goud, u * Math.max(g, fo) > 0 ? u : 0, 4, Math.max(g, fo)); lijn(ctx, Hd, '#8FC0E8', u, 5, Math.max(g, fo));
    regel(ctx, 'fosfaat', gx + gw * 0.5, gy + gh * 0.55 + 44, fo, C.goud, 26, 'left', 700); regel(ctx, 'helderheid', gx + 20, gy + gh * 0.15 - 16, fo, '#8FC0E8', 26, 'left', 700); tag(ctx, '± 1970: omslag', gx + gw * 0.72, gy + gh + 70, C.koraal, om, 'center', 28); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const sl = q.on('Stel', 1);
    const lus = (cx, cy, items, col, a) => { if (a <= 0.01) return; const R = 150; items.forEach(([s2, w], i) => { const an = -Math.PI / 2 + i * 2 * Math.PI / items.length; const al = a * q.on(w[0], w[1] || 1); const px = cx + Math.cos(an) * R, py = cy + Math.sin(an) * R; chip(ctx, s2, px, py + 10, col, al, 24); const an2 = an + 2 * Math.PI / items.length; boogPijl(ctx, cx + Math.cos(an + 0.45) * R, cy + Math.sin(an + 0.45) * R, cx + Math.cos(an2 - 0.45) * R, cy + Math.sin(an2 - 0.45) * R, -0.12, col, al * 0.8, 3); }); };
    const he = q.on('toestand', 1) * (1 - sl), tb = q.on('toestand', 1) * (1 - sl);
    paneel(ctx, 100, 150, 840, 640, '', he, '#8FC0E8'); regel(ctx, 'helder', 130, 200, he, '#8FC0E8', 30, 'left', 700); meer(ctx, 170, 560, 700, 200, 0, t, { a: he * 0.9 });
    lus(520, 380, [['waterplanten', ['waterplanten', 1]], ['bodem vast', ['vast', 1]], ['helder water', ['voedingsstoffen', 1]], ['veel licht', ['op.', 1]]], C.groen, he);
    paneel(ctx, 980, 150, 840, 640, '', tb, '#9CD060'); regel(ctx, 'troebel', 1010, 200, tb, '#9CD060', 30, 'left', 700); meer(ctx, 1050, 560, 700, 200, 1, t, { a: tb * 0.9 });
    lus(1400, 380, [['troebel water', ['troebel', 1]], ['weinig licht', ['licht', 1]], ['geen plantjes', ['plantjes', 1]], ['meer algen', ['plantjes', 1]]], '#9CD060', tb); chip(ctx, 'brasem woelt de bodem om', 1400, 640, C.oker, tb * q.on('Brasems', 1), 24);
    tag(ctx, 'positieve terugkoppeling', 960, 860, C.goud, q.on('positieve', 1) * (1 - sl), 'center', 30);
    if (sl > 0.01) { ctx.save(); ctx.globalAlpha *= sl; meer(ctx, 360, 260, 1200, 440, 1, t, { fosfaat: 0.5 }); tag(ctx, 'fosfaat terug tot vlak voor de omslag', 960, 190, C.goud, 1, 'center', 32); regel(ctx, 'weer helder?', 960, 800, q.on('helder', 2), C.text, 40, 'center', 700); vraagteken(ctx, 1640, 560, q.on('denk', 1), 130); ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Veluwemeer', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; meer(ctx, 140, 300, 820, 440, 1, t, { fosfaat: 0.5 }); naamBij(ctx, 'algen en brasems', null, 550, 790, q.on('algen', 1), 'center', '#9CD060');
      const bx = 1300, by = 220, bh = 560; paneel(ctx, 1080, 170, 740, 660, 'fosfaat', 1); roundRect(ctx, bx - 40, by + 40, 80, bh - 40, 16); shape(ctx, rgba(C.goud, 0.12), C.goud, 2);
      const mk = (frac, s2, col, a) => { if (a <= 0.01) return; const y = by + 40 + (bh - 40) * (1 - frac); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx - 60, y); ctx.lineTo(bx + 60, y); ctx.stroke(); ctx.restore(); regel(ctx, s2, bx + 80, y + 10, a, col, 28, 'left', 700); };
      mk(0.75, 'hier ging het mis', C.koraal, 1); mk(0.25, 'pas hier weer helder', C.groen, q.on('verder', 1));
      const lv = lerp(0.75, 0.25, clamp((q.localT - q.at('verder', 1)) / 2.5, 0, 1)); ctx.fillStyle = rgba(C.goud, 0.6); ctx.fillRect(bx - 30, by + 40 + (bh - 40) * (1 - lv), 60, (bh - 40) * lv); pijl(ctx, bx - 110, by + 150, bx - 110, by + 420, C.goud, q.on('omlaag', 1), 5); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'Veluwemeer', 960, 180, 1, C.text2, 36, 'center', 700); const xs = [300, 960, 1620];
      [['± 1970', 'troebel', 1, 'Veluwemeer'], ['jaren werk', 'minder fosfaat · doorspoelen · minder brasem', 0.5, 'minder'], ['± 1995', 'weer helder, kranswieren', 0, '1995']].forEach(([j, s2, tr, w], i) => { const al = q.on(w, 1); meer(ctx, xs[i] - 260, 300, 520, 260, tr, t, { a: al }); regel(ctx, j, xs[i], 620, al, C.oker, 36, 'center', 700); tekstBlok(ctx, s2, xs[i] - 250, 670, 500, 26, C.text, al); if (i) pijl(ctx, xs[i] - 330, 430, xs[i] - 280, 430, C.line, al, 4); });
      tag(ctx, 'omslagpunt', 960, 830, C.koraal, q.on('omslagpunt', 1) * (1 - q.on('terug', 1)), 'center', 30); tag(ctx, 'terug is moeilijker dan heen', 960, 830, C.goud, q.on('terug', 1), 'center', 30); ctx.restore(); } },

  s22(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['Wolderwijd', 1]]); const gx = 260, gy = 200, gw = 1100, gh = 560;
    const X = (p) => gx + p * gw, Y = (h) => gy + gh - h * gh; const pLo = 0.3, pHi = 0.72; const boven = (p) => 0.85 - 0.12 * p, onder = (p) => 0.25 - 0.1 * p;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; assen(ctx, gx, gy, gw, gh, 'fosfaat', 'helderheid', 1);
      const up = [], dn = []; for (let i = 0; i <= 40; i++) { const p = pHi * i / 40; up.push([X(p), Y(boven(p))]); } for (let i = 0; i <= 40; i++) { const p = 1 - (1 - pLo) * i / 40; dn.push([X(p), Y(onder(p))]); }
      const u1 = clamp((q.localT - q.at('Stijgt', 1)) / 4, 0, 1), u2 = clamp((q.localT - q.at('Daalt', 1)) / 3.5, 0, 1);
      lijn(ctx, up, '#8FC0E8', u1, 6); if (u1 >= 0.999) { pijl(ctx, X(pHi), Y(boven(pHi)), X(pHi), Y(onder(pHi)) - 4, C.koraal, q.on('troebel', 1), 5); lijn(ctx, [[X(pHi), Y(onder(pHi))], [X(1), Y(onder(1))]], '#9CD060', q.on('wordt.', 1), 6); }
      lijn(ctx, dn, '#9CD060', u2, 6); if (u2 >= 0.999) pijl(ctx, X(pLo), Y(onder(pLo)), X(pLo), Y(boven(pLo)) + 4, C.groen, q.on('lager', 1), 5);
      naamBij(ctx, 'hoog omslagpunt', null, X(pHi) + 20, Y(0.55), q.on('hoog', 1), 'left', C.koraal); naamBij(ctx, 'laag omslagpunt', null, X(pLo) - 20, Y(0.55), q.on('lager', 1), 'right', C.groen);
      const ds = q.on('Daartussen', 1); ctx.save(); ctx.globalAlpha *= ds * 0.25; ctx.fillStyle = C.goud; ctx.fillRect(X(pLo), gy, X(pHi) - X(pLo), gh); ctx.restore(); regel(ctx, 'helder óf troebel', (X(pLo) + X(pHi)) / 2, gy + 40, ds, C.goud, 30, 'center', 700);
      tag(ctx, 'hysterese', 1640, 400, C.paars, q.on('hysterese', 1), 'center', 40); regel(ctx, 'hangt af van de geschiedenis', 1640, 480, q.on('geschiedenis', 1), C.text2, 26, 'center', 600); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; assen(ctx, gx, gy, gw, gh, 'fosfaat', 'helderheid', 1); const up = [], dn = []; for (let i = 0; i <= 40; i++) { const p = pHi * i / 40; up.push([X(p), Y(boven(p))]); } for (let i = 0; i <= 40; i++) { const p = 1 - (1 - pLo) * i / 40; dn.push([X(p), Y(onder(p))]); } lijn(ctx, up, '#8FC0E8', 1, 5, 0.5); lijn(ctx, dn, '#9CD060', 1, 5, 0.5);
      const pw = 0.55; const du = q.on('helder', 3), tr = q.on('troebel', 4); const hy = lerp(onder(pw), boven(pw), du * (1 - tr)); circ(ctx, X(pw), Y(hy), 16, C.goud, '#F2F2EE', 3); regel(ctx, 'Wolderwijd 1991', X(pw), Y(onder(pw)) + 70, 1, C.oker, 30, 'center', 700);
      tag(ctx, '¾ van de vis weggevangen', 1640, 330, C.oker, q.on('weggevangen', 1), 'center', 28); tag(ctx, 'na een paar weken weer troebel', 1640, 430, C.koraal, tr, 'center', 28); tag(ctx, 'duwtje helpt pas bij het lage omslagpunt', 1000, 140, C.groen, q.on('duwtje', 1), 'center', 30); ctx.restore(); } },

  s23(ctx, t, q) { bg(ctx, 'schema'); const pw = 410, gap = 30, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 180, ph = 560;
    const kaart = [['plaag en spuiten', 'monocultuur'], ['vijand van ver weg', 'vijand', 2], ['natuur beheren', 'natuur'], ['omslagpunt', 'voorbij']];
    kaart.forEach(([n, w, nn], i) => { const al = q.on(w, nn || 1), x = x0 + i * (pw + gap); paneel(ctx, x, y0, pw, ph, n, al); if (al < 0.01) return; ctx.save(); ctx.globalAlpha *= al; const cx = x + pw / 2;
      if (i === 0) { for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) plantTop(ctx, x + 70 + c * 90, y0 + 150 + r * 90, 28); for (let k = 0; k < 12; k++) luis(ctx, x + 60 + hash(k) * 300, y0 + 130 + hash(k + 3) * 240, 0.7); spuitwolk(ctx, x + 40, y0 + 380, pw - 80, 120, q.on('Spuiten', 1), t); luis(ctx, cx, y0 + 470, 1.4, { col: C.goud, rand: '#F0D890', a: q.on('resistentie', 1) }); }
      if (i === 1) { lieveheer(ctx, cx - 70, y0 + 220, 1.8, { soort: 'azie', t }); rietpad(ctx, cx + 30, y0 + 400, 1, { t }); }
      if (i === 2) { for (let k = 0; k < 6; k++) heideStruik(ctx, x + 70 + k * 55, y0 + 300, 1); schaap(ctx, cx, y0 + 260, 1, { eet: 1, t }); roundRect(ctx, x + 50, y0 + 400, pw - 100, 60, 16); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); regel(ctx, 'ecoduct', cx, y0 + 500, 1, C.text2, 24, 'center', 600); }
      if (i === 3) { meer(ctx, x + 40, y0 + 120, pw - 80, 170, 0, t); meer(ctx, x + 40, y0 + 330, pw - 80, 170, 1, t); }
      ctx.restore(); });
    tag(ctx, 'stabiel en veerkrachtig', x0 + 2 * (pw + gap) + pw / 2, y0 + ph + 60, C.groen, q.on('veerkrachtig', 1), 'center', 26); tag(ctx, 'terug is moeilijk', x0 + 3 * (pw + gap) + pw / 2, y0 + ph + 60, C.koraal, q.on('terug', 1), 'center', 26); }
};
