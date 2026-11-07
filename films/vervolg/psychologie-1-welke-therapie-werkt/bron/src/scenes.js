
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }

// ---------- tekeningen ----------
function figuur(ctx, x, y, h, col = '#5A6478', o = {}) { const { a = 1, jas = null, hoofd = '#C9A688' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 300; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-18, -110); ctx.moveTo(20, 0); ctx.lineTo(18, -110); ctx.stroke();
  roundRect(ctx, -48, -230, 96, 130, 30); shape(ctx, jas || col, null); circ(ctx, 0, -262, 34, hoofd); ctx.restore(); }
function bubbel(ctx, x, y, s2, col = '#F2F2EE', a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = Math.max(56, ctx.measureText(s2).width + 30); roundRect(ctx, x - w / 2, y - px - 12, w, px + 24, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 8, y + 12); ctx.lineTo(x, y + 26); ctx.lineTo(x + 8, y + 12); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 800), '#121A26', 'center'); ctx.restore(); }
function lijnenKaart(ctx, x, y, w, h, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 8; ctx.lineCap = 'butt';
  const base = y + h - 50, L = [h * 0.5, h * 0.62, h * 0.38]; ctx.beginPath(); ctx.moveTo(x + w * 0.16, base); ctx.lineTo(x + w * 0.16, base - h * 0.62); ctx.stroke();
  ['A', 'B', 'C'].forEach((l, i) => { const xx = x + w * (0.45 + i * 0.18); ctx.strokeStyle = i === 1 && hl > 0.5 ? C.groen : '#121A26'; ctx.beginPath(); ctx.moveTo(xx, base); ctx.lineTo(xx, base - L[i]); ctx.stroke(); text(ctx, l, xx, base + 36, fTekst(30, 800), '#121A26', 'center'); }); ctx.restore(); }
function stippen(ctx, x, y, n, k, col, a = 1, per = 10, r = 14, gap = 36) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap, r, i < k ? col : '#3A4458'); ctx.restore(); }
function balk(ctx, x, y, w, frac, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.005) { roundRect(ctx, x, y, Math.max(20, w * frac), 40, 10); shape(ctx, rgba(col, 0.75), col, 2); } if (label) regel(ctx, label, x, y - 14, 1, C.text, 24, 'left', 700); ctx.restore(); }
function schakelaars(ctx, x, y, n, aan, a = 1, max = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 40, n * 44 + 30, 150, 12); shape(ctx, '#3A3E46', '#6A7080', 2); for (let i = 0; i < n; i++) { const on = i < aan; roundRect(ctx, x + i * 44, y, 28, 50, 6); shape(ctx, on ? C.koraal : '#8A8E96', null); circ(ctx, x + i * 44 + 14, y - 16, 6, on ? '#F2C94C' : '#5A5E66'); if (i % 5 === 0 || i === n - 1) text(ctx, String(15 * (i + 1)), x + i * 44 + 14, y + 84, fTekst(16, 700), '#C9CED6', 'center'); } ctx.restore(); }
function marshmallow(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#E8E2D8'; ctx.fill(); ctx.fillStyle = '#F8F4EE'; ctx.fillRect(x - 28 * s, y - 36 * s, 56 * s, 36 * s); ctx.beginPath(); ctx.ellipse(x, y - 36 * s, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore(); }
function bord(ctx, x, y, s = 1, n = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 90 * s, 26 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); for (let i = 0; i < n; i++) marshmallow(ctx, x + (i - (n - 1) / 2) * 60 * s, y + 4 * s, s); ctx.restore(); }
function klokje(ctx, x, y, r, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.6); ctx.fill(); ctx.restore(); }
function stempel(ctx, x, y, s2, col, a = 1, rot = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.font = fTekst(40, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, -w / 2, -38, w, 70, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, s2, 0, 12, fTekst(40, 800), col, 'center'); ctx.restore(); }
function map_(ctx, x, y, a = 1, lab = 'archief') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 80, y); ctx.lineTo(x + 100, y + 20); ctx.lineTo(x + 240, y + 20); ctx.lineTo(x + 240, y + 180); ctx.lineTo(x, y + 180); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#F2EAD8'; ctx.fillRect(x + 20, y + 40, 200, 120); ctx.strokeStyle = '#9A8A6A'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + 36, y + 64 + i * 20); ctx.lineTo(x + 200 - (i % 2) * 40, y + 64 + i * 20); ctx.stroke(); } text(ctx, lab, x + 120, y + 214, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
function assen(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) metaText(ctx, xl, x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, yl, x, y - 16, C.text2, 'left', 18); }

function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
// Wat word jij? · Psychologie 6 · Welke therapie werkt? — scènes per alinea (v1.0, 16 okt 2026).
// Rode draad: jij (ik-perspectief: bureau en notitieboek) en Henk; Lotte en Sam als cliënten in H3. Look: Schema.

// ---------- eigen tekeningen ----------
function kamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#22314F'; ctx.fillRect(0, 0, W, 640); // wand
  ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 640); ctx.lineTo(W, 640); ctx.stroke();
  roundRect(ctx, 1500, 150, 300, 230, 8); shape(ctx, '#2C4A6E', rgba(C.line, 0.6), 2); // raam
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.beginPath(); ctx.moveTo(1650, 150); ctx.lineTo(1650, 380); ctx.moveTo(1500, 265); ctx.lineTo(1800, 265); ctx.stroke();
  // plant
  ctx.fillStyle = '#6A4A3A'; roundRect(ctx, 1600, 560, 90, 80, 10); ctx.fill();
  ctx.fillStyle = C.chloro; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(1645 + (i - 2) * 22, 530 - Math.abs(i - 2) * 14, 18, 46, (i - 2) * 0.35, 0, 6.283); ctx.fill(); }
  // stoel achter Henk
  roundRect(ctx, 1010, 470, 300, 230, 30); shape(ctx, '#4A3F5C', null);
  ctx.restore(); }
function bureau(ctx, a = 1, pen = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A4632'; ctx.beginPath(); ctx.moveTo(0, 790); ctx.lineTo(W, 790); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#6E573E'; ctx.fillRect(0, 790, W, 14);
  // notitieboek van 'jij'
  ctx.save(); ctx.translate(250, 800); ctx.rotate(-0.06); roundRect(ctx, 0, 0, 380, 90, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.strokeStyle = '#B8C4D4'; ctx.lineWidth = 2; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(20, 30 + i * 28); ctx.lineTo(360, 30 + i * 28); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  metaText(ctx, 'jij · psycholoog', 270, 780, C.grain, 'left', 26); }
function pil(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); roundRect(ctx, -34 * s, -14 * s, 68 * s, 28 * s, 14 * s); shape(ctx, col, lighten(col, 0.4), 1.5); ctx.fillStyle = rgba('#F2F2EE', 0.85); roundRect(ctx, 0, -14 * s, 34 * s, 28 * s, 14 * s); ctx.fill(); ctx.restore(); }
function oog(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.quadraticCurveTo(x, y - 30 * s, x + 40 * s, y); ctx.quadraticCurveTo(x, y + 30 * s, x - 40 * s, y); shape(ctx, '#F2F2EE', C.line, 1.5); const dx = Math.sin(t * 2.4) * 16 * s; circ(ctx, x + dx, y, 11 * s, C.teal); circ(ctx, x + dx, y, 5 * s, '#121A26'); ctx.restore(); }
function lampje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; const dx = Math.sin(t * 2.4) * 70 * s; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 80 * s, y); ctx.lineTo(x + 80 * s, y); ctx.stroke(); circ(ctx, x + dx, y, 10 * s, C.goud); ctx.restore(); }
function trapje(ctx, x, y, s, a = 1, k = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { roundRect(ctx, x + i * 34 * s, y - (i + 1) * 22 * s, 30 * s, (i + 1) * 22 * s, 4); shape(ctx, i < k ? rgba(C.groen, 0.7) : '#3A4458', null); } ctx.restore(); }
function gedachte(ctx, x, y, w, h, s2, a = 1, col = '#F2F2EE', px = 24) { wolk(ctx, x, y, w, h, s2, a, col, px); }
function spin(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 3 * s; ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) for (const d of [-1, 1]) { const an = (-0.9 + i * 0.55) * d + (d < 0 ? Math.PI : 0); const w = Math.sin(t * 6 + i) * 0.08; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an + w) * 16 * s, y + Math.sin(an + w) * 16 * s - 8 * s, x + Math.cos(an + w) * 26 * s, y + Math.sin(an + w) * 26 * s + 6 * s); ctx.stroke(); }
  circ(ctx, x, y, 9 * s, '#3A302A'); circ(ctx, x + 10 * s, y - 2 * s, 6 * s, '#3A302A'); ctx.restore(); }
function pot(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 110 * s, 100 * s, 110 * s, 14 * s); shape(ctx, rgba(C.er, 0.18), C.er, 2); roundRect(ctx, x - 54 * s, y - 124 * s, 108 * s, 18 * s, 4); shape(ctx, '#8A8E96', null); ctx.restore(); }
function fotolijst(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60 * s, y - 80 * s, 120 * s, 100 * s, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.restore(); }
function hand(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E3B998'; ctx.beginPath(); ctx.ellipse(x, y, 60 * s, 34 * s, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 4; i++) { roundRect(ctx, x - 50 * s + i * 26 * s, y - 64 * s, 20 * s, 44 * s, 10 * s); ctx.fill(); } ctx.restore(); }
function fiets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4 * s; circ(ctx, x - 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); circ(ctx, x + 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 28 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
function auto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 50 * s, 180 * s, 44 * s, 12 * s); shape(ctx, C.koraal, null); roundRect(ctx, x - 50 * s, y - 84 * s, 100 * s, 40 * s, 12 * s); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, x - 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); circ(ctx, x + 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); ctx.restore(); }
function mensje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - r * 1.15, r * 0.55, col); roundRect(ctx, x - r * 0.75, y - r * 0.5, r * 1.5, r * 1.3, r * 0.5); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function klokIcoon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba('#F2F2EE', 0.9), C.line, 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(t - 1.57) * r * 0.7, y + Math.sin(t - 1.57) * r * 0.7); ctx.moveTo(x, y); ctx.lineTo(x, y - r * 0.5); ctx.stroke(); ctx.restore(); }
function kruisIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 50 * s, 100 * s, 100 * s, 14 * s); shape(ctx, '#F2F2EE', C.line, 2); ctx.fillStyle = C.teal; ctx.fillRect(x - 10 * s, y - 32 * s, 20 * s, 64 * s); ctx.fillRect(x - 32 * s, y - 10 * s, 64 * s, 20 * s); ctx.restore(); }
// effectgrootte-meter: halve cirkel 0 .. 1,2
function meter(ctx, x, y, r, val, a = 1, labels = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ang = v => Math.PI + clamp(v / 1.2, 0, 1) * Math.PI;
  [[0, 0.2, '#3A4458'], [0.2, 0.5, rgba(C.teal, 0.35)], [0.5, 0.8, rgba(C.teal, 0.6)], [0.8, 1.2, rgba(C.teal, 0.9)]].forEach(([v0, v1, col]) => { ctx.beginPath(); ctx.arc(x, y, r, ang(v0), ang(v1)); ctx.arc(x, y, r - 34, ang(v1), ang(v0), true); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); });
  if (labels) [[0.2, 'klein'], [0.5, 'middel'], [0.8, 'groot']].forEach(([v, l]) => { const an = ang(v); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 40), y + Math.sin(an) * (r - 40)); ctx.lineTo(x + Math.cos(an) * (r + 8), y + Math.sin(an) * (r + 8)); ctx.stroke(); text(ctx, String(v).replace('.', ','), x + Math.cos(an) * (r + 40), y + Math.sin(an) * (r + 40) + 10, fTekst(28, 700), C.text, 'center'); metaText(ctx, l, x + Math.cos(an) * (r + 40), y + Math.sin(an) * (r + 40) + 42, C.text2, 'center', 22); });
  if (val !== null) { const an = ang(val); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 50), y + Math.sin(an) * (r - 50)); ctx.stroke(); circ(ctx, x, y, 12, C.goud); }
  ctx.restore(); }
function klok(ctx, cx, cy, r, a = 1) { klokIcoon(ctx, cx, cy, r, a, 0.8); }

// overzichtskaarten H1 en recap
const KAARTEN = [
  { id: 'cgt', t: 'CGT', m: 'gedachten en gedrag', l: 'klopt die gedachte?', w: 'Cognitieve' },
  { id: 'exp', t: 'exposure', m: 'angst', l: 'stap voor stap', w: 'Exposure' },
  { id: 'emdr', t: 'EMDR', m: 'herinneringen', l: 'ogen volgen een lampje', w: 'EMDR' },
  { id: 'med', t: 'medicatie', m: 'lichaam', l: 'voorgeschreven door een arts', w: 'medicatie' },
  { id: 'act', t: 'ACT', m: 'omgaan met gedachten', l: 'opmerken en toch doen', w: 'ACT' },
  { id: 'ipt', t: 'interpersoonlijk', m: 'relaties', l: 'ruzie, verlies, verhuizen', w: 'Interpersoonlijke' },
  { id: 'pd', t: 'psychodynamisch', m: 'patronen van vroeger', l: 'waar komt het vandaan?', w: 'Psychodynamische' },
  { id: 'sch', t: 'schematherapie', m: 'oude overtuigingen', l: '"ik ben niet goed genoeg"', w: 'Schematherapie' },
  { id: 'sys', t: 'systeemtherapie', m: 'mensen om je heen', l: 'het gezin komt mee', w: 'Systeemtherapie' },
  { id: 'onl', t: 'online zelfhulp', m: 'vorm', l: 'app + af en toe contact', w: 'online' },
  { id: 'vak', t: 'vaktherapie', m: 'vorm', l: 'beeldend, muziek, beweging', w: 'vaktherapie' },
];
function kaartIcoon(ctx, id, x, y, a, t, act) { const s = 0.8;
  if (id === 'cgt') { gedachte(ctx, x - 70, y - 40, 150, 60, 'mislukt toch', a, '#F2F2EE', 18); if (act) kruis(ctx, x + 66, y - 4, 14, a * 0.9); }
  else if (id === 'exp') trapje(ctx, x - 64, y + 34, s, a, act ? 1 + Math.floor((t * 0.8) % 4) : 4);
  else if (id === 'emdr') { oog(ctx, x, y - 10, 0.9, a, act ? t : 0); lampje(ctx, x, y + 34, 0.7, a, act ? t : 0); }
  else if (id === 'med') { pil(ctx, x - 20, y, 1, a); pil(ctx, x + 36, y + 14, 0.8, a); }
  else if (id === 'act') { gedachte(ctx, x - 90, y - 46, 110, 50, 'eng!', a * 0.6, '#F2F2EE', 18); pijl(ctx, x - 10, y + 20, x + 70, y + 20, C.groen, a, 4, 12); }
  else if (id === 'ipt') { mensje(ctx, x - 34, y + 30, 24, '#B08A5C', a); mensje(ctx, x + 34, y + 30, 24, '#8C7BBF', a); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x - 10, y + 4); ctx.lineTo(x + 10, y + 4); ctx.stroke(); ctx.restore(); }
  else if (id === 'pd') { pijl(ctx, x + 70, y + 10, x - 50, y + 10, C.text2, a, 4, 14); circ(ctx, x + 76, y + 10, 10, rgba(C.goud, a)); circ(ctx, x - 70, y + 10, 10, rgba(C.text2, a * 0.6)); }
  else if (id === 'sch') { roundRect(ctx, x - 70, y - 30, 140, 70, 10); ctx.save(); ctx.globalAlpha *= a; shape(ctx, rgba(C.paars, 0.25), C.paars, 1.5); ctx.restore(); }
  else if (id === 'sys') { [-48, -16, 16, 48].forEach((dx, i) => mensje(ctx, x + dx, y + 34, i % 3 ? 18 : 22, ['#B08A5C', '#7FA3C9', '#C9A35C', '#8C7BBF'][i], a)); }
  else if (id === 'onl') { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 28, y - 46, 56, 96, 10); shape(ctx, '#2A2F3E', C.line, 2); roundRect(ctx, x - 20, y - 34, 40, 64, 4); shape(ctx, rgba(C.teal, 0.5), null); ctx.restore(); }
  else if (id === 'vak') { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 60, y + 20); ctx.bezierCurveTo(x - 30, y - 40, x + 10, y + 50, x + 60, y - 20); ctx.stroke(); text(ctx, '♪', x + 40, y + 40, fTekst(40, 700), C.text2, 'center'); ctx.restore(); }
}
function kaart(ctx, k, x, y, w, h, a, act, t) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, act ? rgba(C.goud, 0.10) : rgba(C.fill, 0.6), act ? C.goud : rgba(C.line, 0.6), act ? 2.5 : 1.2);
  text(ctx, k.t, x + 24, y + 52, fTekst(32, 700), C.text, 'left'); metaText(ctx, k.m, x + 24, y + 118, act ? C.goud : C.grain, 'left', 22);
  text(ctx, k.l, x + 24, y + h - 22, fTekst(26, 600), act ? C.text : C.text2, 'left');
  ctx.save(); ctx.translate(x + w - 78, y + 56); ctx.scale(0.7, 0.7); kaartIcoon(ctx, k.id, 0, 0, 1, t, act); ctx.restore(); ctx.restore(); }

// =======================================================================================
const SCENES = {
  title(ctx, t) { [0, 2, 1, 3].forEach((k, i) => kaart(ctx, KAARTEN[k], 1090 + (i % 2) * 400, 480 + Math.floor(i / 2) * 220, 370, 190, 1, false, t)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('anders', 1, 0.8), A = 1 - B;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; kamer(ctx, 1);
      persoon(ctx, 'henk', 1160, 800, 520, { uit: q.on('vraagt', 1) > 0.5 && q.on('tien', 1) < 0.5 ? 'praat' : 'bezorgd', pose: 'staan', kijk: -1, t });
      naamBij(ctx, 'Henk', 'cliënt', 1330, 330, q.on('Henk', 1));
      tag(ctx, 'al maanden somber', 1480, 450, C.text2, q.on('somber', 1) * (1 - q.on('vraagt', 1)), 'center', 28);
      const vr = q.on('vraagt', 1); if (vr > 0.01) bubbel(ctx, 1100, 210, 'welke therapie werkt het best voor mij?', '#F2F2EE', vr * (1 - q.on('tien', 1) * 0.6), 30);
      const opts = [['praten over je verleden', 'Praten'], ['gedachten veranderen', 'gedachten'], ['oefenen met wat je eng vindt', 'Oefenen'], ['pillen', 'pillen']];
      opts.forEach(([s2, w], i) => { const a = q.on(w, 1); if (a > 0.01) chip(ctx, s2, 470, 220 + i * 90, i === 3 ? C.oker : C.teal, a, 26); });
      regel(ctx, 'wel tien therapievormen', 470, 150, q.on('tien', 1), C.text2, 28, 'center', 700);
      bureau(ctx, 1, 0, t); vraagteken(ctx, 760, 900, q.on('zeg', 1) * (1 - B), 90); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const gx = 560, gy = 230, gw = 1000, gh = 520;
      assen(ctx, gx, gy, gw, gh, 'tijd →', 'somberheid'); metaText(ctx, 'start', gx, gy + gh + 36, C.text2, 'center', 20); metaText(ctx, '3 maanden', gx + gw, gy + gh + 36 + 30, C.text2, 'right', 20);
      const u = clamp((t - q.at('maanden', 2)) / 3, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40 * u; i++) { const x = i / 40; const y = 0.85 - 0.55 * ease(x); i ? ctx.lineTo(gx + x * gw, gy + gh - y * gh) : ctx.moveTo(gx + x * gw, gy + gh - y * gh); } ctx.stroke();
      const th = q.on('therapie', 2); if (th > 0.01) { ctx.save(); ctx.globalAlpha *= th; roundRect(ctx, gx + 20, gy + gh - 40, gw - 40, 26, 8); shape(ctx, rgba(C.groen, 0.25), C.groen, 1.5); regel(ctx, 'therapie', gx + gw / 2, gy + gh - 54, 1, C.groen, 26, 'center', 700); ctx.restore(); }
      persoon(ctx, 'henk', 300, 860, 380, { uit: q.on('beter', 1) > 0.5 ? 'blij' : 'bezorgd', pose: 'staan', kijk: 1, t, a: q.on('man', 1) });
      tag(ctx, 'veel beter', gx + gw - 60, gy + gh - 0.3 * gh - 50, C.groen, q.on('beter', 1), 'center', 28);
      vraagteken(ctx, gx + gw / 2, gy + 120, q.on('gewerkt', 1), 130); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('landschap', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; regel(ctx, 'Antwoord b', W / 2, 280, 1, C.groen, 44, 'center', 800);
      gedachte(ctx, W / 2 - 330, 360, 660, 140, 'misschien was hij ook zonder therapie opgeknapt', q.on('Misschien', 1), '#F2F2EE', 30); metaText(ctx, 'daarover: hoofdstuk 2', W / 2, 620, C.grain, 'center', 26); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'Waar richten therapieën zich op?', 120, 140, 1, C.text, 40, 'left', 700);
      const cw = 400, ch = 190, gapx = 28, gapy = 22, x0 = (W - 4 * cw - 3 * gapx) / 2, y0 = 180;
      let actief = -1; KAARTEN.forEach((k, i) => { if (q.at(k.w, 1) <= t) actief = i; });
      KAARTEN.forEach((k, i) => { const a = q.on(k.w, 1); if (a <= 0.01) return; const col = i % 4, row = Math.floor(i / 4); kaart(ctx, k, x0 + col * (cw + gapx), y0 + row * (ch + gapy), cw, ch, a * (i === actief ? 1 : 0.55), i === actief, t); });
      const w1 = q.on('Waarom', 1) * (1 - q.on('medicatie', 1)); chip(ctx, 'hoe EMDR werkt: nog niet zeker', 960, 840, C.koraal, w1, 30);
      chip(ctx, 'en nog veel meer vormen', 960, 830, C.text2, q.on('meer', 1) * (1 - q.on('ACT', 1)), 26);
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Daarom', 1, 0.8), pC = q.on('effectgrootte', 1, 0.8), pD = q.on('toevallig', 1, 0.8), pE = q.on('wachtlijstgroep', 1, 0.8);
    const A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC * (1 - pD), A4 = pD * (1 - pE), A5 = pE;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const gx = 420, gy = 220, gw = 1080, gh = 440; assen(ctx, gx, gy, gw, gh, 'tijd →', 'somberheid');
      const sl = q.on('slechtst', 1); circ(ctx, gx + 30, gy + gh - 0.9 * gh, 12, rgba(C.koraal, sl)); regel(ctx, 'hulp zoeken: op het slechtste moment', gx + 60, gy + gh - 0.9 * gh - 24, sl, C.koraal, 26, 'left', 700);
      const u = clamp((t - q.at('vanzelf', 1)) / 2.5, 0, 1); if (u > 0) { ctx.strokeStyle = C.text2; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); for (let i = 0; i <= 40 * u; i++) { const x = i / 40; const y = 0.9 - 0.3 * ease(x); i ? ctx.lineTo(gx + 30 + x * (gw - 60), gy + gh - y * gh) : ctx.moveTo(gx + 30, gy + gh - y * gh); } ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'zonder therapie: bij een deel iets beter', gx + gw - 30, gy + gh - 0.6 * gh + 50, q.on('vanzelf', 1), C.text2, 24, 'right', 700); }
      chip(ctx, 'afwachten is niet verstandig', 760, 780, C.koraal, q.on('afwachten', 1), 26);
      tag(ctx, 'placebo-effect: verwachten dat je beter wordt, helpt al', 1180, 860 - 10, C.goud, q.on('placebo', 1), 'center', 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'een eerlijk onderzoek', W / 2, 150, 1, C.text, 34, 'center', 700); metaText(ctx, 'gerandomiseerd onderzoek (RCT)', W / 2, 196, C.grain, 'center', 22);
      const s = q.on('lot', 1, 1.2), g = q.on('gemiddeld', 1), up = q.on('therapiegroep', 1, 1.5);
      for (let i = 0; i < 24; i++) { const grp = i % 2, sx = 860 + (i % 6) * 40, sy = 330 + Math.floor(i / 6) * 60; const tx = (grp ? 1180 : 420) + (Math.floor(i / 2) % 4) * 70, ty = 360 + Math.floor(Math.floor(i / 2) / 4) * 70 - (grp ? 0 : up * 60 * (0.6 + 0.4 * hash(i)));
        const col = ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i % 4]; mensje(ctx, lerp(sx, tx, s), lerp(sy, ty, s), 18, col, 1); }
      paneel(ctx, 380, 280, 360, 300, '', s); paneel(ctx, 1140, 280, 360, 300, '', s);
      regel(ctx, 'therapie', 560, 640, s, C.groen, 30, 'center', 700); regel(ctx, 'geen therapie', 1320, 640, s, C.text2, 30, 'center', 700);
      chip(ctx, 'het lot bepaalt de groep', W / 2, 260, C.goud, s * (1 - g), 24); chip(ctx, 'groepen lijken gemiddeld op elkaar', W / 2, 760, C.text2, g * (1 - up), 26);
      tag(ctx, 'meer opgeknapt? waarschijnlijk door de therapie', W / 2, 760, C.groen, up, 'center', 28); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'effectgrootte', 140, 150, 1, C.text, 36, 'left', 700);
      const V = q.on('vuistregel', 1, 0.8);
      if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; const bx = 260, by = 640, bw = 760; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
        const curve = (mu, col, a) => { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const x = i / 80; const y = Math.exp(-((x - mu) ** 2) / (2 * 0.12 ** 2)); i ? ctx.lineTo(bx + x * bw, by - y * 300) : ctx.moveTo(bx + x * bw, by - y * 300); } ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); };
        curve(0.38, C.text2, 1); curve(0.58, C.groen, 1); regel(ctx, 'controlegroep', bx + 0.3 * bw, by + 44, 1, C.text2, 24, 'center', 700); regel(ctx, 'therapiegroep', bx + 0.66 * bw, by + 44, 1, C.groen, 24, 'center', 700);
        const d = q.on('verschil', 2); pijl(ctx, bx + 0.38 * bw, by - 330, bx + 0.58 * bw, by - 330, C.goud, d, 4, 14); regel(ctx, 'verschil', bx + 0.48 * bw, by - 350, d, C.goud, 24, 'center', 700);
        const sp = q.on('onderling', 1); ctx.save(); ctx.globalAlpha *= sp; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 0.26 * bw, by - 150); ctx.lineTo(bx + 0.50 * bw, by - 150); ctx.stroke(); regel(ctx, 'spreiding', bx + 0.38 * bw, by - 168, 1, C.teal, 22, 'center', 700); ctx.restore();
        const f = q.on('deelt', 1); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, 1160, 300, 600, 220, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, 'verschil', 1460, 380, fTekst(40, 700), C.goud, 'center'); ctx.fillStyle = C.text; ctx.fillRect(1290, 400, 340, 4); text(ctx, 'spreiding', 1460, 460, fTekst(40, 700), C.teal, 'center'); ctx.restore(); }
        chip(ctx, 'zo vergelijk je studies met verschillende vragenlijsten', 1460, 600, C.text2, q.on('vragenlijsten', 1), 22); ctx.restore(); }
      if (V > 0.01) { const val = q.on('klein', 1) > 0 ? (q.on('groot', 4) > 0.5 ? 0.8 : q.on('middelgroot', 1) > 0.5 ? 0.5 : 0.2) : null; meter(ctx, W / 2, 680, 340, val, V, 1); metaText(ctx, 'vuistregel (Cohen)', W / 2, 780, C.grain, 'center', 22); } ctx.restore(); }
    if (A4 > 0.01) { ctx.save(); ctx.globalAlpha *= A4; regel(ctx, 'meta-analyse: alle studies samen', 140, 150, 1, C.text, 36, 'left', 700);
      const ax = 560, aw = 800; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax, 720); ctx.lineTo(ax + aw, 720); ctx.stroke(); [0, 0.5, 1].forEach(v => text(ctx, String(v).replace('.', ','), ax + v / 1.2 * aw, 760, fTekst(24, 600), C.text2, 'center')); metaText(ctx, 'effectgrootte', ax + aw, 800, C.text2, 'right', 20);
      for (let i = 0; i < 9; i++) { const v = clamp(0.6 + (hash(i * 5 + 3) - 0.5) * 0.9, 0.05, 1.15), y = 240 + i * 46, w = 60 + hash(i * 7) * 120; const a = clamp((t - q.at('toevallig', 1) - i * 0.15) * 3, 0, 1); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax + v / 1.2 * aw - w, y); ctx.lineTo(ax + v / 1.2 * aw + w, y); ctx.stroke(); circ(ctx, ax + v / 1.2 * aw, y, 8, C.teal); ctx.restore(); }
      const m = q.on('analyse', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; const x = ax + 0.6 / 1.2 * aw, y = 680; ctx.beginPath(); ctx.moveTo(x - 40, y); ctx.lineTo(x, y - 18); ctx.lineTo(x + 40, y); ctx.lineTo(x, y + 18); ctx.closePath(); shape(ctx, C.goud, null); regel(ctx, 'samen: één schatting', x + 70, y + 10, 1, C.goud, 26, 'left', 700); ctx.restore(); } ctx.restore(); }
    if (A5 > 0.01) { ctx.save(); ctx.globalAlpha *= A5; regel(ctx, 'maar: vergeleken met wie?', W / 2, 160, 1, C.text, 40, 'center', 700);
      paneel(ctx, 280, 240, 600, 480, '', 1); regel(ctx, 'wachtlijstgroep', 580, 300, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 400 + i * 120, 560, 30, ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i], 1); klokIcoon(ctx, 580, 410, 50, 1, t * 0.5); regel(ctx, 'wacht af', 580, 670, 1, C.text2, 26, 'center', 700);
      const z = q.on('zorg', 1); paneel(ctx, 1040, 240, 600, 480, '', z); ctx.save(); ctx.globalAlpha *= z; regel(ctx, 'gewone zorg', 1340, 300, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 1160 + i * 120, 560, 30, ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i], 1); kruisIcoon(ctx, 1340, 410, 0.9, 1); regel(ctx, 'bijv. gesprekken bij de huisarts', 1340, 670, 1, C.text2, 26, 'center', 700); ctx.restore();
      vraagteken(ctx, W / 2, 520, q.on('sterkst', 1), 120); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const A = 1 - q.on('140', 1, 0.4), B = ramp(t, q.at('140', 1) + 0.4, 0.5);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; regel(ctx, 'Antwoord a', W / 2, 200, 1, C.groen, 44, 'center', 800);
      paneel(ctx, 280, 260, 600, 420, '', 1); regel(ctx, 'wachtlijst', 580, 320, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 400 + i * 120, 560 - (i === 1 ? 30 : 0) * q.on('minder', 1), 30, '#7FA3C9', 1); regel(ctx, 'knappen minder op', 580, 640, q.on('minder', 1), C.text2, 26, 'center', 700);
      paneel(ctx, 1040, 260, 600, 420, '', 1); regel(ctx, 'gewone zorg', 1340, 320, 1, C.text, 32, 'center', 700); for (let i = 0; i < 4; i++) mensje(ctx, 1160 + i * 120, 560 - (i % 2 ? 50 : 20) * q.on('beetje', 1), 30, '#7FA3C9', 1); regel(ctx, 'helpt zelf ook een beetje', 1340, 640, q.on('beetje', 1), C.groen, 26, 'center', 700); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'therapie bij depressie: effectgrootte', 140, 150, 1, C.text, 34, 'left', 700); metaText(ctx, 'meta-analyse · Cuijpers e.a. 2024', 140, 196, C.grain, 'left', 22);
      const bx = 420, bw = 1200, sc = v => v / 1.2 * bw; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, 640); ctx.lineTo(bx + bw, 640); ctx.stroke(); [0, 0.2, 0.5, 0.8, 1.2].forEach(v => { text(ctx, String(v).replace('.', ','), bx + sc(v), 680, fTekst(24, 600), C.text2, 'center'); });
      const r1 = q.on('haalde', 1, 1.2), r2 = q.on('gewone', 3, 1.2);
      regel(ctx, 'tegen wachtlijst · ruim 140 studies', bx, 290, 1, C.text, 26, 'left', 700); roundRect(ctx, bx, 310, Math.max(10, sc(0.95) * r1), 70, 10); shape(ctx, rgba(C.koraal, 0.75), C.koraal, 2); regel(ctx, '≈ 0,95', bx + sc(0.95) + 20, 360, r1, C.koraal, 34, 'left', 800);
      const z = q.on('200', 1); ctx.save(); ctx.globalAlpha *= z; regel(ctx, 'tegen gewone zorg · bijna 200 studies', bx, 450, 1, C.text, 26, 'left', 700); roundRect(ctx, bx, 470, Math.max(10, sc(0.63) * r2), 70, 10); shape(ctx, rgba(C.teal, 0.75), C.teal, 2); regel(ctx, '≈ 0,6', bx + sc(0.63) + 20, 520, r2, C.teal, 34, 'left', 800); ctx.restore();
      tag(ctx, 'tegen een wachtlijst lijkt het effect ±1,5× zo groot', 960, 760, C.goud, q.on('anderhalf', 1) * (1 - q.on('beste', 1)), 'center', 28);
      tag(ctx, 'gewone zorg: nog steeds middelgroot tot groot · beste studies: wat lager', 960, 760, C.groen, q.on('beste', 1), 'center', 26); ctx.restore(); } },

  // ---------- H3 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Henk', 1, 0.8), pC = q.on('Zulke', 2, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const sa = q.on('Sam', 1);
      paneel(ctx, 100, 140, 820, 680, '', 1); persoon(ctx, 'lotte', 260, 780, 420, { uit: 'blij', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Lotte', 'bang voor spinnen', 150, 210, 1);
      regel(ctx, 'exposure', 620, 230, q.on('exposure', 1), C.goud, 34, 'center', 700);
      angstLadder(ctx, 470, 640, 0.8, 4, q.on('exposure', 1), t);
      chip(ctx, 'vaak een paar sessies genoeg', 520, 780, C.groen, q.on('sessies', 1), 22);
      ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * sa; paneel(ctx, 1000, 140, 820, 680, '', sa); ctx.restore();
      if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; persoon(ctx, 'sam', 1160, 780, 430, { uit: 'bezorgd', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Sam', 'nare herinneringen', 1050, 210, 1);
        gedachte(ctx, 1320, 240, 440, 200, '', q.on('ongeluk', 1), '#F2F2EE'); fiets(ctx, 1470, 360, 0.9, q.on('ongeluk', 1)); auto(ctx, 1620, 390, 0.6, q.on('ongeluk', 1));
        const tr = q.on('trauma', 1); if (tr > 0.01) { ctx.save(); ctx.globalAlpha *= tr; roundRect(ctx, 1320, 560, 210, 80, 12); shape(ctx, rgba(C.fill, 0.8), C.goud, 2); text(ctx, 'EMDR', 1425, 614, fTekst(34, 700), C.text, 'center'); text(ctx, '≈', 1580, 616, fTitel(56), C.goud, 'center'); roundRect(ctx, 1630, 560, 170, 80, 12); shape(ctx, rgba(C.fill, 0.8), C.goud, 2); text(ctx, 'CGT', 1715, 614, fTekst(34, 700), C.text, 'center'); metaText(ctx, 'traumagericht', 1715, 680, C.grain, 'center', 18); metaText(ctx, 'ongeveer even goed', 1560, 730, C.grain, 'center', 22); ctx.restore(); } ctx.restore(); }
      ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; persoon(ctx, 'henk', 230, 820, 460, { uit: 'denkt', pose: 'staan', kijk: 1, t }); naamBij(ctx, 'Henk', 'somber (depressie)', 120, 220, 1);
      regel(ctx, 'beter dan wachtlijst of gewone zorg', 500, 160, 1, C.text2, 26, 'left', 700); metaText(ctx, 'effectgrootte (globaal)', 500, 196, C.grain, 'left', 20);
      const rows = [['CGT', 0.62, 'CGT', C.groen, 0, 2], ['interpersoonlijke therapie', 0.6, 'interpersoonlijke', C.groen, 0, 1], ['psychodynamische therapie', 0.58, 'psychodynamische', C.groen, 0, 1], ['online zelfhulp (begeleid)', 0.58, 'online', C.groen, 0, 1], ['ACT · minder vaak onderzocht', 0.5, 'ACT', C.groen, 1, 1]];
      rows.forEach(([l, v, w, col, dash, n], i) => { const a = q.on(w, n); if (a <= 0.01) return; const y = 250 + i * 86; ctx.save(); ctx.globalAlpha *= a; regel(ctx, l, 500, y + 22, 1, C.text, 26, 'left', 600); roundRect(ctx, 920, y - 6, 560 * v / 0.7 * clamp((t - q.at(w, n)) * 1.5, 0, 1), 40, 8); if (dash) { ctx.setLineDash([10, 8]); shape(ctx, rgba(col, 0.25), col, 2); ctx.setLineDash([]); } else shape(ctx, rgba(col, 0.6), col, 2); ctx.restore(); });
      tag(ctx, 'onderling weinig verschil', 1200, 704, C.goud, q.on('Onderling', 1) * (1 - q.on('Antidepressiva', 1)), 'center', 26);
      const ad = q.on('Antidepressiva', 1); if (ad > 0.01) { ctx.save(); ctx.globalAlpha *= ad; roundRect(ctx, 500, 690, 1300, 190 - 10, 14); shape(ctx, rgba(C.bgSchema, 0.96), C.line, 1.5); pil(ctx, 580, 760, 1, 1); regel(ctx, 'antidepressiva > nep-pil', 640, 770, 1, C.text, 28, 'left', 700);
        regel(ctx, 'korte termijn: ≈ therapie', 1060, 750, q.on('korte', 1), C.text, 26, 'left', 600); regel(ctx, 'na therapie: minder vaak terugval', 1060, 794, q.on('terug', 1), C.groen, 26, 'left', 700); regel(ctx, 'samen: vaak nog iets beter', 1060, 838, q.on('samen', 1), C.goud, 26, 'left', 700); ctx.restore(); }
      ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'bij depressie: heel verschillende therapieën, vaak ongeveer even goed', W / 2, 200, 1, C.text, 36, 'center', 700);
      [0, 5, 4, 6].forEach((k, i) => kaart(ctx, KAARTEN[k], 150 + i * 420, 290, 380, 190, 1, false, t)); vraagteken(ctx, W / 2, 680, q.on('verklaring', 1), 140); ctx.restore(); } },

  s19(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Toch', 1, 0.8), pC = q.on('Omdat', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Antwoord a: iets wat ze gemeen hebben', 120, 140, 1, C.groen, 36, 'left', 700); metaText(ctx, 'een veelgenoemde verklaring', 120, 184, C.grain, 'left', 22);
      const B2 = q.on('band', 1, 0.8);
      if (B2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B2; const cx = W / 2, cy = 520; circ(ctx, cx, cy, 160, rgba(C.goud, 0.12), C.goud, 2.5); text(ctx, 'gemeenschappelijk', cx, cy + 10, fTekst(30, 700), C.goud, 'center');
        [['een uitleg die je gelooft', 'uitleg', -2.5], ['een plan', 'plan', -0.6], ['hoop', 'hoop', 0.6], ['samenwerken met een therapeut', 'therapeut', 2.5]].forEach(([l, w, an]) => { const a = q.on(w, 1); const x = cx + Math.cos(an) * 430, y = cy + Math.sin(an) * 230; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * 165, cy + Math.sin(an) * 165); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); chip(ctx, l, x, y + 14, C.text2, a, 28); }); ctx.restore(); }
      if (B2 > 0.01) { ctx.save(); ctx.globalAlpha *= B2; const gx = 280, gy = 250, gw = 820, gh = 520; assen(ctx, gx, gy, gw, gh, 'band met de therapeut →', 'resultaat');
        for (let i = 0; i < 70; i++) { const u = hash(i * 3 + 21), v = clamp(0.5 + 0.28 * (u - 0.5) + (hash(i * 3 + 22) - 0.5) * 0.75, 0.04, 0.96); circ(ctx, gx + 20 + u * (gw - 40), gy + gh - v * gh, 7, rgba(C.teal, 0.85)); }
        ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.64); ctx.lineTo(gx + gw, gy + gh * 0.36); ctx.stroke();
        chip(ctx, 'bijna 300 studies · ruim 30.000 cliënten', 1480, 320, C.text2, q.on('driehonderd', 1), 24); tag(ctx, 'verband: matig (r ≈ 0,28)', 1480, 440, C.goud, q.on('matig', 1), 'center', 28);
        const an = q.on('andersom', 1); if (an > 0.01) { ctx.save(); ctx.globalAlpha *= an; regel(ctx, 'band', 1300, 600, 1, C.text, 30, 'center', 700); regel(ctx, 'opknappen', 1680, 600, 1, C.text, 30, 'center', 700); pijl(ctx, 1370, 572, 1580, 572, C.text2, 1, 4, 14); pijl(ctx, 1580, 610, 1370, 610, C.koraal, 1, 4, 14); metaText(ctx, 'of andersom?', 1480, 670, C.koraal, 'center', 22); ctx.restore(); } ctx.restore(); } ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'toch werkt niet alles even goed voor elke klacht', 120, 140, 1, C.text, 36, 'left', 700);
      const rows = [['fobie', 'exposure', 'duidelijk beter dan alleen praten', 'sterk onderbouwd', C.groen, 'fobie'], ['borderline-stoornis', 'schematherapie', '88 mensen, na 3 jaar ±2× zo vaak hersteld', 'één onderzoek', C.goud, 'borderline'], ['kind of jongere + gezin', 'systeemtherapie', 'vooral onderzocht bij kinderen en jongeren', 'goed onderzocht', C.groen, 'Systeemtherapie'], ['?', 'vaktherapie', 'nog weinig sterke studies', 'onzeker', C.text2, 'vaktherapie']];
      rows.forEach(([k, th, l, niv, col, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; const y = 220 + i * 150; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120, y, 1680, 126, 14); shape(ctx, rgba(C.fill, 0.5), rgba(C.line, 0.6), 1.2); text(ctx, k, 160, y + 74, fTekst(32, 700), C.text2, 'left'); pijl(ctx, 500, y + 63, 580, y + 63, C.line, 1, 3, 12); text(ctx, th, 610, y + 74, fTekst(34, 700), C.text, 'left'); text(ctx, l, 960, y + 74, fTekst(26, 600), C.text2, 'left'); tag(ctx, niv, 1660, y + 76, col, 1, 'center', 22); ctx.restore(); });
      chip(ctx, 'weinig onderzoek ≠ werkt niet', 960, 858, C.text2, q.on('betekent', 1), 24); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'meten tijdens de behandeling', 120, 140, 1, C.text, 36, 'left', 700);
      const gx = 300, gy = 240, gw = 1100, gh = 460; assen(ctx, gx, gy, gw, gh, 'weken →', 'klachten (vragenlijst)'); const pts = [0.85, 0.83, 0.84, 0.82, 0.62, 0.5, 0.42]; const adj = 3.5;
      pts.forEach((v, i) => { const a = clamp((t - q.at('vragenlijst', 1) - i * 0.3) * 3, 0, 1); circ(ctx, gx + 60 + i * 160, gy + gh - v * gh, 12, rgba(i < 4 ? C.koraal : C.groen, a)); });
      const ap = q.on('aanpak', 1); if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(gx + 60 + adj * 160, gy - 10); ctx.lineTo(gx + 60 + adj * 160, gy + gh); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'aanpak aangepast', gx + 60 + adj * 160 + 20, gy + 20, 1, C.goud, 28, 'left', 700); ctx.restore(); }
      chip(ctx, 'helpt het niet? pas de aanpak aan', 1620, 400, C.text2, q.on('Helpt', 2), 22); ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('master', 1, 0.8), pC = q.on('vertrouwt', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; kamer(ctx, 1); persoon(ctx, 'henk', 1160, 800, 520, { uit: q.on('band', 1) > 0.5 ? 'blij' : 'neutraal', pose: 'staan', kijk: -1, t });
      tag(ctx, 'niet één beste therapie voor iedereen', 600, 200, C.text2, q.on('iedereen', 1), 'center', 26);
      [['goed onderzocht bij depressie', 'onderzocht'], ['past bij Henk', 'past'], ['meten of het helpt', 'meet'], ['werken aan een goede band', 'band']].forEach(([l, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 260, 280 + i * 100, 640, 76, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 1.5); vink_(ctx, 310, 318 + i * 100, 18, 1); text(ctx, l, 350, 330 + i * 100, fTekst(30, 700), C.text, 'left'); ctx.restore(); });
      bureau(ctx, 1, 0, t); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'de route naar behandelaar', 120, 140, 1, C.text, 36, 'left', 700);
      const steps = [['bachelor + master psychologie', 'master', C.paars], ['psycholoog', 'psycholoog', C.teal], ['werkervaring', 'werkervaring', C.text2], ['GZ-opleiding · 2 jaar', 'GZ', C.goud], ['GZ-psycholoog: zelfstandig behandelen', 'GZ', C.groen]];
      steps.forEach(([l, w, col], i) => { const a = q.on(w, 1) * (i === 4 ? clamp((t - q.at('GZ', 1) - 0.8) * 2, 0, 1) : 1); if (a <= 0.01) return; const x = 120 + i * 350, y = 330; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 310, 150, 16); shape(ctx, rgba(col, 0.15), col, 2); ctx.font = fTekst(28, 700); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, l, x + 22, y + 56, 270, 36); if (i < 4) pijl(ctx, x + 315, y + 75, x + 345, y + 75, C.line, 1, 3, 10); ctx.restore(); });
      const ps = q.on('psychiater', 1); if (ps > 0.01) { ctx.save(); ctx.globalAlpha *= ps; roundRect(ctx, 120, 580, 1680, 140, 16); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); text(ctx, 'psychiater', 160, 640, fTekst(34, 700), C.text, 'left'); text(ctx, 'opleiding geneeskunde → arts → psychiater', 160, 690, fTekst(26, 600), C.text2, 'left'); pil(ctx, 1220, 650, 1, q.on('medicijnen', 1)); regel(ctx, 'mag medicijnen voorschrijven', 1280, 660, q.on('medicijnen', 1), C.oker, 26, 'left', 700); ctx.restore(); } ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; roundRect(ctx, 360, 300, 1200, 360, 22); shape(ctx, rgba(C.fill, 0.6), C.goud, 2); text(ctx, 'Zit je zelf ergens mee?', W / 2, 410, fTitel(56), C.text, 'center');
      text(ctx, 'Praat erover met iemand die je vertrouwt,', W / 2, 500, fTekst(36, 600), C.text, 'center'); text(ctx, 'met je mentor of met je huisarts.', W / 2, 552, fTekst(36, 600), C.text, 'center'); ctx.restore(); } },
};

// ===================== v3 (16 okt 2026): verdiepingen =====================
// trapje met de vier stappen van Lotte (foto, pot, tafel, hand); k = aantal actieve stappen
function angstLadder(ctx, x, y, s, k, a = 1, t = 0, labels = ['foto', 'pot', 'tafel', 'hand']) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 4; i++) { const xx = x + i * 150 * s, yy = y - i * 110 * s, on = i < k; roundRect(ctx, xx - 60 * s, yy, 120 * s, 28 * s, 6); shape(ctx, on ? rgba(C.groen, 0.55) : '#3A4458', on ? C.groen : null, 1.5);
    ctx.save(); ctx.globalAlpha *= on ? 1 : 0.4;
    if (i === 0) { fotolijst(ctx, xx, yy - 14 * s, 0.75 * s, 1); spin(ctx, xx, yy - 64 * s, 0.6 * s, 1, 0); }
    if (i === 1) { pot(ctx, xx, yy - 4 * s, 0.75 * s, 1); spin(ctx, xx, yy - 46 * s, 0.7 * s, 1, t); }
    if (i === 2) { ctx.fillStyle = '#8A6A44'; ctx.fillRect(xx - 56 * s, yy - 14 * s, 112 * s, 10 * s); spin(ctx, xx, yy - 30 * s, 0.75 * s, 1, t); }
    if (i === 3) { hand(ctx, xx, yy - 26 * s, 0.7 * s, 1); spin(ctx, xx, yy - 62 * s, 0.7 * s, 1, t); }
    ctx.restore(); metaText(ctx, labels[i], xx, yy + 60 * s, on ? C.groen : C.grain, 'center', 20); }
  ctx.restore(); }
// hersenen in zijaanzicht, voorkant links
function brein(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { amy = 0, pfc = 0, rem = 0, gloed = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-300, 40); ctx.bezierCurveTo(-330, -120, -170, -230, 10, -220); ctx.bezierCurveTo(200, -215, 320, -110, 300, 20); ctx.bezierCurveTo(290, 100, 220, 130, 150, 120); ctx.bezierCurveTo(100, 170, 20, 160, -40, 120); ctx.bezierCurveTo(-140, 140, -260, 120, -300, 40); ctx.closePath(); shape(ctx, '#3A3550', '#8C7BBF', 2.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.5); ctx.lineWidth = 2; [[-200, -120, -120, -40], [-60, -190, -20, -80], [80, -190, 60, -60], [180, -130, 200, -30], [-230, 20, -120, 40], [20, 40, 140, 30]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.quadraticCurveTo((a1 + a2) / 2 + 30, (b1 + b2) / 2, a2, b2); ctx.stroke(); });
  // cerebellum + hersenstam
  ctx.beginPath(); ctx.ellipse(210, 120, 80, 45, 0.2, 0, 6.283); shape(ctx, '#34304A', rgba('#8C7BBF', 0.7), 2); roundRect(ctx, 90, 110, 50, 130, 20); shape(ctx, '#34304A', rgba('#8C7BBF', 0.7), 2);
  if (pfc > 0.01) { ctx.save(); ctx.globalAlpha *= pfc; ctx.beginPath(); ctx.ellipse(-230, 40, 70, 50, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 2.5); ctx.restore(); }
  if (amy > 0.01) { ctx.save(); ctx.globalAlpha *= amy; const pulse = gloed ? 1 + 0.25 * Math.sin(t * 6) * gloed : 1; if (gloed) { circ(ctx, -40, 70, 40 * pulse, rgba(C.koraal, 0.18 * gloed)); circ(ctx, -40, 70, 62 * pulse, rgba(C.koraal, 0.08 * gloed)); } ctx.beginPath(); ctx.ellipse(-40, 70, 26, 18, 0, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 2); ctx.restore(); }
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-175, 60); ctx.quadraticCurveTo(-120, 100, -78, 72); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-74, 52); ctx.lineTo(-82, 92); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// synaps: zendend uiteinde boven, ontvangende cel onder
function synaps(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { n = 10, terug = 0, ssri = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-260, -320); ctx.lineTo(-120, -320); ctx.quadraticCurveTo(-120, -160, -230, -60); ctx.quadraticCurveTo(0, -10, 230, -60); ctx.quadraticCurveTo(120, -160, 120, -320); ctx.lineTo(260, -320); ctx.lineTo(260, -330); ctx.lineTo(-260, -330); ctx.closePath(); shape(ctx, rgba(C.teal, 0.25), C.teal, 2.5);
  ctx.beginPath(); ctx.moveTo(-300, 70); ctx.quadraticCurveTo(0, 30, 300, 70); ctx.lineTo(300, 200); ctx.lineTo(-300, 200); ctx.closePath(); shape(ctx, rgba(C.paars, 0.22), C.paars, 2.5);
  for (let i = 0; i < 5; i++) { const rx = -200 + i * 100; roundRect(ctx, rx - 18, 40 + Math.abs(i - 2) * 3, 36, 18, 6); shape(ctx, C.paars, null); }
  for (let i = 0; i < 4; i++) vesicle(ctx, -120 + i * 80, -150 + (i % 2) * 30, 18, 1);
  // heropname-pomp
  roundRect(ctx, 185, -95, 46, 30, 8); shape(ctx, '#7A8BA8', null); if (ssri > 0.01) { ctx.save(); ctx.globalAlpha *= ssri; roundRect(ctx, 190, -64, 36, 22, 6); shape(ctx, C.koraal, null); kruis(ctx, 208, -80, 26, 1, C.koraal); ctx.restore(); }
  for (let i = 0; i < n; i++) { const w = wander(i + 300, t, 22, 0.8); let px = -180 + hash(i * 3 + 7) * 360 + w.x, py = -10 + hash(i * 3 + 8) * 40 + w.y * 0.6;
    if (terug > 0 && i < 3) { const u = (t * 0.5 + i * 0.3) % 1; px = lerp(px, 208, u * terug); py = lerp(py, -80, u * terug); }
    circ(ctx, px, py, 8, C.goud, lighten(C.goud, 0.4), 1); }
  ctx.restore(); }
function document_(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20 * s, y - 26 * s, 40 * s, 52 * s, 4); shape(ctx, '#F2EEE4', col, 2); ctx.fillStyle = col; ctx.fillRect(x - 12 * s, y - 14 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y - 2 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y + 10 * s, 16 * s, 4 * s); ctx.restore(); }
function procentBalk(ctx, x, y, w, frac, colA, colB, label, a = 1, doel = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 56, 10); shape(ctx, rgba(colB, 0.35), colB, 1.5); if (frac > 0.005) { roundRect(ctx, x, y, w * frac, 56, 10); shape(ctx, rgba(colA, 0.75), colA, 2); } regel(ctx, label, x, y - 16, 1, C.text, 26, 'left', 700); regel(ctx, Math.round((doel ?? frac) * 100) + '%', x + w + 20, y + 40, 1, colA, 32, 'left', 800); ctx.restore(); }

Object.assign(SCENES, {
  // ---------- H2 verdieping: valkuilen ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('uitval', 1, 0.8), pC = q.on('valkuil', 2, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'valkuil 1: weten wat je krijgt', 120, 140, 1, C.text, 36, 'left', 700);
      paneel(ctx, 160, 220, 740, 520, '', 1); regel(ctx, 'medicijnonderzoek', 530, 280, 1, C.text, 30, 'center', 700);
      pil(ctx, 380, 420, 1.6, q.on('medicijn', 1)); regel(ctx, 'echt', 380, 500, q.on('medicijn', 1), C.text2, 24, 'center', 700); pil(ctx, 680, 420, 1.6, q.on('nep', 1)); regel(ctx, 'nep-pil', 680, 500, q.on('nep', 1), C.text2, 24, 'center', 700);
      const ni = q.on('Niemand', 1); regel(ctx, '? ?', 530, 600, ni, C.goud, 44, 'center', 800); tag(ctx, 'dubbelblind: deelnemer en arts weten het niet', 530, 690, C.groen, q.on('dubbelblind', 1), 'center', 24);
      const th = q.on('therapie', 1); paneel(ctx, 1020, 220, 740, 520, '', th); ctx.save(); ctx.globalAlpha *= th; regel(ctx, 'therapieonderzoek', 1390, 280, 1, C.text, 30, 'center', 700); mensje(ctx, 1240, 470, 46, '#7FA3C9', 1); mensje(ctx, 1540, 470, 46, '#B08A5C', 1); regel(ctx, 'cliënt weet het', 1240, 560, 1, C.koraal, 24, 'center', 700); regel(ctx, 'therapeut weet het', 1540, 560, 1, C.koraal, 24, 'center', 700);
      chip(ctx, 'wie de uitkomst meet, kan wél blind zijn', 1390, 670, C.groen, q.on('meet', 1), 24); ctx.restore(); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'valkuil 2: uitval', 120, 140, 1, C.text, 36, 'left', 700);
      const st = q.on('halverwege', 1, 1.2), bl = q.on('bleef', 1), it = q.on('ingeloot', 1);
      for (let i = 0; i < 12; i++) { const stop = i % 4 === 1 || i === 10; const x = 300 + (i % 6) * 120, y = 330 + Math.floor(i / 6) * 150; const gone = stop ? st : 0; const ok = !stop && i % 3 !== 2; mensje(ctx, x + gone * 40, y, 34, ok ? C.groen : (stop ? C.koraal : '#7FA3C9'), 1 - gone * 0.65 * (1 - it)); }
      regel(ctx, 'stoppen halverwege: bij hen hielp het niet', 660, 640, st * (1 - it), C.koraal, 26, 'center', 700);
      const yb = 300; ctx.save(); ctx.globalAlpha *= bl; roundRect(ctx, 1160, yb, 600, 150, 14); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); text(ctx, 'alleen wie bleef: 6 van 9 beter', 1190, yb + 62, fTekst(28, 700), C.text, 'left'); text(ctx, 'therapie lijkt te goed', 1190, yb + 110, fTekst(26, 600), C.koraal, 'left'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= it; roundRect(ctx, 1160, yb + 190, 600, 150, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); text(ctx, 'iedereen die werd ingeloot: 6 van 12', 1190, yb + 252, fTekst(28, 700), C.text, 'left'); text(ctx, 'eerlijker beeld', 1190, yb + 300, fTekst(26, 600), C.groen, 'left'); ctx.restore(); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'valkuil 3: wat je niet ziet', 120, 140, 1, C.text, 36, 'left', 700); metaText(ctx, 'antidepressiva · ingediend bij de Amerikaanse toezichthouder', 120, 184, C.grain, 'left', 22);
      const v = q.on('verzamelden', 1), h = q.on('helft', 1); for (let i = 0; i < 74; i++) { const x = 220 + (i % 10) * 70, y = 290 + Math.floor(i / 10) * 70; const a = clamp((t - q.at('verzamelden', 1) - i * 0.02) * 3, 0, 1) * v; document_(ctx, x, y, 0.9, h > 0.5 ? (i < 38 ? C.groen : C.text2) : C.line, a); }
      regel(ctx, 'ongeveer de helft duidelijk positief', 570, 860 - 20, h, C.groen, 28, 'center', 700);
      const ti = q.on('tijdschriften', 1); ctx.save(); ctx.globalAlpha *= ti; roundRect(ctx, 1150, 300, 520, 420, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, 'gepubliceerd', 1410, 360, fTekst(32, 700), C.text, 'center'); for (let i = 0; i < 3; i++) { roundRect(ctx, 1220 + i * 130, 420, 110, 150, 8); shape(ctx, '#F2EEE4', C.line, 2); } ctx.restore(); vraagteken(ctx, 1410, 680, q.on('gepubliceerde', 1), 110); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('therapie', 1, 0.8), pC = q.on('favoriete', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Antwoord b: bijna allemaal', 120, 140, 1, C.groen, 36, 'left', 700); metaText(ctx, 'Turner e.a. 2008 · antidepressiva', 120, 184, C.grain, 'left', 22);
      procentBalk(ctx, 260, 320, 1100, 0.51, C.groen, C.text2, 'alle ingediende onderzoeken: duidelijk positief', 1); procentBalk(ctx, 260, 500, 1100, 0.94 * q.on('94', 1, 1.2), C.groen, C.text2, 'gepubliceerde artikelen: positief', q.on('94', 1), 0.94);
      const la = q.on('la', 1); ctx.save(); ctx.globalAlpha *= la; roundRect(ctx, 1500, 660, 260, 140, 10); shape(ctx, '#6E573E', '#8A6A44', 2); roundRect(ctx, 1590, 690, 80, 18, 6); shape(ctx, '#C9A35C', null); for (let i = 0; i < 3; i++) document_(ctx, 1560 + i * 60, 640 - (i % 2) * 10, 0.8, C.text2, 1); regel(ctx, 'in de la', 1630, 850, 1, C.text2, 24, 'center', 700); ctx.restore();
      chip(ctx, 'of positiever opgeschreven', 760, 700, C.koraal, q.on('positiever', 1), 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'ook bij therapie', 120, 140, 1, C.text, 36, 'left', 700); metaText(ctx, 'Driessen e.a. 2015 · depressie · betaald door de Amerikaanse overheid', 120, 184, C.grain, 'left', 22);
      const k = q.on('kwart', 1); for (let i = 0; i < 55; i++) { const x = 200 + (i % 11) * 64, y = 290 + Math.floor(i / 11) * 76; document_(ctx, x, y, 0.85, i >= 42 && k > 0.5 ? C.koraal : C.groen, clamp((t - q.at('55', 1) - i * 0.015) * 3, 0, 1)); }
      regel(ctx, 'bijna een kwart: nooit gepubliceerd', 520, 720, k, C.koraal, 28, 'center', 700);
      const k2 = q.on('kwart', 2, 1.2); ctx.save(); ctx.globalAlpha *= q.on('mee', 1); regel(ctx, 'effectgrootte', 1200, 300, 1, C.text, 28, 'left', 700); roundRect(ctx, 1200, 330, 560 * 0.52 / 0.6, 50, 8); shape(ctx, rgba(C.teal, 0.25), C.teal, 1.5); roundRect(ctx, 1200, 330, 560 * lerp(0.52, 0.39, k2) / 0.6, 50, 8); shape(ctx, rgba(C.teal, 0.75), C.teal, 2); regel(ctx, 'gepubliceerd ≈ 0,52', 1200, 420, 1, C.text2, 24, 'left', 600); regel(ctx, 'alles samen ≈ 0,39', 1200, 460, k2, C.teal, 26, 'left', 700); ctx.restore();
      tag(ctx, 'publicatiebias', 1480, 600, C.goud, q.on('publicatiebias', 1), 'center', 34); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'en: de voorkeur van de onderzoeker', 120, 140, 1, C.text, 36, 'left', 700);
      persoon(ctx, 'kim', 420, 820, 460, { uit: 'blij', pose: 'wijs', kijk: 1, t }); kaart(ctx, KAARTEN[4], 620, 300, 380, 190, 1, true, t); ctx.save(); ctx.fillStyle = C.koraal; ctx.font = fTekst(64, 800); ctx.textAlign = 'center'; ctx.fillText('♥', 1040, 300); ctx.restore();
      chip(ctx, 'gemeten in tientallen overzichtsstudies (r ≈ 0,26)', 810, 580, C.text2, q.on('tientallen', 1), 24);
      [['onafhankelijke onderzoekers', 'onafhankelijke'], ['plan vooraf vastgelegd', 'plan']].forEach(([l, w], i) => { const a = q.on(w, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 1220, 320 + i * 120, 560, 90, 14); shape(ctx, rgba(C.groen, 0.12), C.groen, 1.5); vink_(ctx, 1270, 360 + i * 120, 18, 1); text(ctx, l, 1310, 375 + i * 120, fTekst(30, 700), C.text, 'left'); ctx.restore(); });
      tag(ctx, 'meest betrouwbaar', 1500, 620, C.goud, q.on('betrouwbaar', 1), 'center', 28); ctx.restore(); } },

  // ---------- H3 Een cirkel doorbreken ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('cognitieve', 1, 0.8), pC = q.on('Lotte', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    const cx = 1150, cy = 470, R0 = 260; const nodes = [['gedachte', '"het heeft toch geen zin"', -1.57, 'denkt'], ['gedrag', 'minder doen, minder mensen', 0.52, 'minder'], ['gevoel', 'nog somberder', 2.62, 'somberder']];
    const cirkel = (alpha, brk) => { if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; nodes.forEach(([n, l, an, w], i) => { const a = q.on(w, 1); const x = cx + Math.cos(an) * R0, y = cy + Math.sin(an) * R0; const an2 = nodes[(i + 1) % 3][2]; const a2 = q.on(nodes[(i + 1) % 3][3], 1); ctx.save(); ctx.globalAlpha *= Math.min(a, a2); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R0, an + 0.35, an2 - 0.35 + (an2 < an ? 6.283 : 0)); ctx.stroke(); const ea = an2 - 0.35 + (an2 < an ? 6.283 : 0); pijl(ctx, cx + Math.cos(ea - 0.05) * R0, cy + Math.sin(ea - 0.05) * R0, cx + Math.cos(ea) * R0, cy + Math.sin(ea) * R0, C.line, 1, 4, 18); ctx.restore();
        ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 170, y - 56, 340, 112, 16); shape(ctx, rgba(C.bgSchema, 0.96), brk && (i === 0 || i === 1) ? C.goud : C.line, brk && i < 2 ? 3 : 1.5); text(ctx, n, x, y - 10, fTekst(32, 700), C.text, 'center'); text(ctx, l, x, y + 30, fTekst(24, 600), C.text2, 'center'); ctx.restore(); }); ctx.restore(); };
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Henk: een cirkel die zichzelf in stand houdt', 120, 140, 1, C.text, 36, 'left', 700); persoon(ctx, 'henk', 330, 840, 480, { uit: 'bezorgd', pose: 'staan', kijk: 1, t, a: q.on('Henk', 1) }); tag(ctx, 'met pensioen, veel thuis', 330, 300, C.text2, q.on('pensioen', 1), 'center', 24); cirkel(1, 0); tag(ctx, 'gedachten, gevoel en gedrag beïnvloeden elkaar', cx, cy + 10, C.goud, q.on('cirkel', 1), 'center', 24); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'CGT: de cirkel op twee plekken doorbreken', 120, 140, 1, C.text, 36, 'left', 700); const sc = 0.62; ctx.save(); ctx.translate(-330, 60); ctx.scale(1, 1); cirkel(1 - q.on('Brits', 1) * 0.65, 1); ctx.restore();
      chip(ctx, 'klopt het echt dat niets zin heeft?', 820, 545, C.goud, q.on('onderzoekt', 1) * (1 - q.on('Brits', 1)), 24);
      const pl = q.on('plant', 1); ctx.save(); ctx.globalAlpha *= pl * (1 - q.on('Brits', 1) * 0.7); roundRect(ctx, 1260, 230, 520, 420, 16); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'agenda van Henk', 1520, 280, fTekst(30, 800), '#121A26', 'center'); ['ma · wandelen met de buurman', 'di · koffie bij Noor', 'wo · tuin: bonen zaaien', 'do · bibliotheek'].forEach((l, i) => { text(ctx, l, 1290, 350 + i * 70, fTekst(26, 700), '#2A2F3E', 'left'); vink_(ctx, 1740, 340 + i * 70, 14, clamp((t - q.at('plant', 1) - i * 0.6) * 2, 0, 1)); }); ctx.restore();
      tag(ctx, 'gedragsactivatie', 1520, 710, C.groen, q.on('gedragsactivatie', 1) * (1 - q.on('Brits', 1)), 'center', 30);
      const br = q.on('Brits', 1); if (br > 0.01) { ctx.save(); ctx.globalAlpha *= br; roundRect(ctx, 920, 230, 860, 470, 16); shape(ctx, rgba(C.bgSchema, 0.97), C.line, 1.5); text(ctx, 'Brits onderzoek · 440 volwassenen · na een jaar', 1350, 290, fTekst(28, 700), C.text, 'center');
        [['gedragsactivatie', 'beginnende hulpverleners', C.groen], ['CGT', 'psychotherapeuten', C.teal]].forEach(([l, w, col], i) => { const y = 360 + i * 150; text(ctx, l, 960, y + 20, fTekst(30, 700), C.text, 'left'); metaText(ctx, w, 960, y + 56, C.grain, 'left', 20); roundRect(ctx, 1300, y - 10, 400 * clamp((t - q.at('Brits', 1) - i * 0.4) * 1.5, 0, 1), 50, 10); shape(ctx, rgba(col, 0.6), col, 2); });
        regel(ctx, '≈ even goed', 1500, 660, q.on('psychotherapeuten', 1), C.goud, 34, 'center', 800); ctx.restore(); } ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'Lotte: angst bij een spin', 120, 140, 1, C.text, 36, 'left', 700); persoon(ctx, 'lotte', 300, 840, 470, { uit: q.on('rent', 1) > 0.5 ? 'neutraal' : 'bezorgd', pose: 'staan', kijk: 1, t }); ctx.save(); ctx.globalAlpha *= q.on('spin', 1); ctx.beginPath(); ctx.ellipse(560, 715, 110, 36, 0, 0, 6.283); ctx.fillStyle = '#D8DEE4'; ctx.fill(); ctx.restore(); spin(ctx, 560, 700, 2.4, q.on('spin', 1), t);
      const gx = 760, gy = 240, gw = 960, gh = 460; assen(ctx, gx, gy, gw, gh, 'tijd →', 'angst'); const sp = q.at('spin', 1), rn = q.at('rent', 1); const u = clamp((t - sp) / 4, 0, 1);
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60 * u; i++) { const x = i / 60; let v = 0.12; if (x > 0.15) v = 0.12 + 0.8 * ease((x - 0.15) / 0.15); if (x > 0.32 && t > rn) v = 0.92 - 0.75 * ease((x - 0.32) / 0.1); else if (x > 0.32) v = 0.92; i ? ctx.lineTo(gx + x * gw, gy + gh - v * gh) : ctx.moveTo(gx, gy + gh - v * gh); } ctx.stroke();
      regel(ctx, 'wegrennen: angst zakt meteen', gx + 0.45 * gw, gy + 380, q.on('zakt', 1), C.text2, 26, 'left', 700); chip(ctx, 'voelt als een oplossing', gx + 0.6 * gw, gy + 120, C.text2, q.on('oplossing', 1), 24);
      vraagteken(ctx, gx + 0.85 * gw, gy + 260, q.on('termijn', 1), 110); metaText(ctx, 'en op lange termijn?', gx + 0.85 * gw, gy + 320, C.goud, 'center', 22); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('exposure', 1, 0.8), pC = q.on('gewist', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Antwoord a: vermijden houdt angst in stand', 120, 140, 1, C.groen, 36, 'left', 700);
      const gx = 200, gy = 240, gw = 1500, gh = 440; assen(ctx, gx, gy, gw, gh, 'weken →', 'angst bij een spin'); for (let k = 0; k < 4; k++) { const x0 = gx + 80 + k * 360, pk = 0.75 + k * 0.05; const a = clamp((t - 1 - k * 1.1) * 1.5, 0, 1); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, gy + gh - 0.1 * gh); ctx.lineTo(x0 + 70, gy + gh - pk * gh); ctx.lineTo(x0 + 110, gy + gh - pk * gh); ctx.lineTo(x0 + 150, gy + gh - 0.12 * gh); ctx.stroke(); metaText(ctx, 'weg!', x0 + 90, gy + gh - pk * gh - 20, C.koraal, 'center', 18); ctx.restore(); }
      chip(ctx, 'leert: "dat was op het nippertje"', 760, 230, C.koraal, q.on('nippertje', 1), 24); chip(ctx, 'ontdekt nooit: de spin doet niets', 1300, 230, C.text2, q.on('ontdekt', 1), 24); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'exposure: precies het omgekeerde', 120, 140, 1, C.text, 36, 'left', 700);
      const k = (q.on('foto', 1) > 0.5 ? 1 : 0) + (q.on('pot', 1) > 0.5 ? 1 : 0) + (q.on('tafel', 1) > 0.5 ? 1 : 0) + (q.on('hand', 1) > 0.5 ? 1 : 0); angstLadder(ctx, 260, 660, 1, k, q.on('ladder', 1), t); metaText(ctx, 'van minst eng naar meest eng', 470, 760, C.grain, 'center', 22);
      const vw = q.on('verwacht', 1), uk = q.on('gebeurt', 1); ctx.save(); ctx.globalAlpha *= vw; roundRect(ctx, 1000, 220, 760, 170, 16); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); metaText(ctx, 'verwachting vooraf', 1030, 262, C.koraal, 'left', 22); text(ctx, '"hij springt op me af,', 1030, 312, fTekst(32, 700), C.text, 'left'); text(ctx, 'en ik word gek van angst"', 1030, 356, fTekst(32, 700), C.text, 'left'); ctx.restore();
      ctx.save(); ctx.globalAlpha *= uk; roundRect(ctx, 1000, 430, 760, 170, 16); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); metaText(ctx, 'wat er echt gebeurt', 1030, 472, C.groen, 'left', 22); text(ctx, 'de spin blijft zitten;', 1030, 522, fTekst(32, 700), C.text, 'left'); text(ctx, 'de angst is groot, maar te doen', 1030, 566, fTekst(32, 700), C.text, 'left'); ctx.restore();
      const vs = q.on('verschil', 1); ctx.save(); ctx.globalAlpha *= vs; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1790, 305); ctx.lineTo(1820, 305); ctx.lineTo(1820, 515); ctx.lineTo(1790, 515); ctx.stroke(); ctx.restore(); tag(ctx, 'groter verschil = meer leren', 1380, 680, C.goud, vs, 'center', 30); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'de oude angst wordt niet gewist', 120, 140, 1, C.text, 36, 'left', 700);
      const ox = 560, nx = 1360, y = 400; ctx.save(); roundRect(ctx, ox - 300, y - 110, 600, 220, 18); shape(ctx, rgba(C.koraal, 0.14), C.koraal, 2.5); metaText(ctx, 'oude herinnering', ox, y - 60, C.koraal, 'center', 22); text(ctx, 'spin = gevaar', ox, y + 20, fTekst(44, 800), C.text, 'center'); spin(ctx, ox + 200, y + 60, 0.9, 1, t); ctx.restore();
      const nw = q.on('nieuwe', 1); ctx.save(); ctx.globalAlpha *= nw; roundRect(ctx, nx - 300, y - 110, 600, 220, 18); shape(ctx, rgba(C.groen, 0.14), C.groen, 2.5); metaText(ctx, 'nieuwe herinnering', nx, y - 60, C.groen, 'center', 22); text(ctx, 'spinnen zijn meestal veilig', nx, y + 20, fTekst(40, 800), C.text, 'center'); ctx.restore();
      const sr = q.on('strijden', 1); ctx.save(); ctx.globalAlpha *= sr; text(ctx, '⇄', W / 2, y + 20, fTitel(80), C.goud, 'center'); ctx.restore();
      const tk = q.on('terugkomen', 1); ctx.save(); ctx.globalAlpha *= tk; [['nieuwe plek', 0], ['na lange tijd', 1]].forEach(([l, i]) => { roundRect(ctx, 360 + i * 420, 640, 360, 90, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, l, 540 + i * 420, 698, fTekst(30, 700), C.text, 'center'); }); regel(ctx, 'angst kan terugkomen', 750, 790, 1, C.koraal, 26, 'center', 700); ctx.restore();
      tag(ctx, 'oefenen op verschillende plekken, met verschillende spinnen', 1360, 700, C.groen, q.on('plekken', 1), 'center', 24); ctx.restore(); } },

  // ---------- H4 Brein ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('antidepressiva', 1, 0.8), A1 = 1 - pB, A2 = pB;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; const sc = q.on('hersenscans', 1, 0.8), bx = lerp(820, 620, sc), bs = lerp(1.45, 1.0, sc);
      metaText(ctx, 'schematisch · zijaanzicht, voorkant links', 120, 140, C.grain, 'left', 22);
      brein(ctx, bx, 470, bs, 1, { amy: q.on('amygdala', 1), pfc: q.on('prefrontale', 1), rem: q.on('afremmen', 1), gloed: q.on('alarm', 1) * (1 - q.on('uitdoving', 1) * 0.6), t });
      if (sc < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - sc; naamBij(ctx, 'amygdala', 'alarm bij gevaar · links en rechts', bx + 120, 470 + 205 * bs, q.on('amygdala', 1), 'left', C.koraal); naamBij(ctx, 'prefrontale schors', 'boven je ogen · kan remmen', bx - 230 * bs, 470 - 20 * bs, q.on('prefrontale', 1), 'center', C.teal);
        chip(ctx, 'hart sneller · spieren gespannen', 1560, 300, C.koraal, q.on('hart', 1), 24); tag(ctx, 'uitdoving: nieuw leren, niet vergeten', 1560, 400, C.groen, q.on('uitdoving', 2), 'center', 26); ctx.restore(); }
      if (sc > 0.01) { ctx.save(); ctx.globalAlpha *= sc; [['voor', 1], ['na', 0.3]].forEach(([l, g], i) => { const x = 1240 + i * 400; brein(ctx, x, 470, 0.55, 1, { amy: 1, gloed: g, t: t * 0 + 1.6 }); text(ctx, l + ' de behandeling', x, 640, fTekst(28, 700), C.text, 'center'); }); metaText(ctx, 'scans bij spinnenfobie: angstgebieden reageren minder op spinnen', 1440, 720, C.grain, 'center', 20);
        tag(ctx, 'leren verandert verbindingen tussen zenuwcellen', 960, 820, C.goud, q.on('verbindingen', 1), 'center', 28); ctx.restore(); } ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'antidepressiva: SSRI', 120, 140, 1, C.text, 36, 'left', 700); metaText(ctx, 'synaps · schematisch', 120, 184, C.grain, 'left', 22);
      const ss = q.on('remt', 2), lg = q.on('langer', 1); synaps(ctx, 760, 560, 1.15, 1, { n: Math.round(lerp(8, 18, lg)), terug: q.on('zendende', 1) * (1 - ss), ssri: ss, t });
      naamBij(ctx, 'zendende cel', '', 1080, 230, 1, 'left', C.teal); naamBij(ctx, 'ontvangende cel', '', 1130, 760, 1, 'left', C.paars); naamBij(ctx, 'serotonine', '', 330, 570, q.on('serotonine', 1), 'right', C.goud); naamBij(ctx, 'heropname', '', 1050, 430, q.on('zendende', 1), 'left', '#AFC0D0');
      chip(ctx, 'SSRI remt de heropname', 1500, 480, C.koraal, ss, 26);
      const ur = q.on('uren', 1); ctx.save(); ctx.globalAlpha *= ur; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1300, 640); ctx.lineTo(1820, 640); ctx.stroke(); circ(ctx, 1340, 640, 12, C.goud); text(ctx, 'uren: meer serotonine', 1340, 690, fTekst(26, 700), C.goud, 'left'); ctx.restore();
      vraagteken(ctx, 1700, 600, q.on('stemming', 1), 90); ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('Let', 1, 0.8), pC = q.on('idee', 2, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'Antwoord b: meestal pas na een paar weken', 120, 140, 1, C.groen, 36, 'left', 700);
      const gx = 260, gy = 240, gw = 1400, gh = 360; assen(ctx, gx, gy, gw, gh, 'tijd →', ''); [['uren', 0.04], ['1 week', 0.25], ['2 weken', 0.5], ['4 weken', 0.88]].forEach(([l, x]) => metaText(ctx, l, gx + x * gw, gy + gh + 36, C.text2, 'center', 20));
      ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.8); ctx.lineTo(gx + 0.04 * gw, gy + gh * 0.25); ctx.lineTo(gx + gw, gy + gh * 0.25); ctx.stroke(); regel(ctx, 'serotonine in de synaps', gx + 0.08 * gw, gy + gh * 0.25 - 20, 1, C.goud, 26, 'left', 700);
      const st = q.on('weken', 1); ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = C.groen; ctx.beginPath(); ctx.moveTo(gx, gy + gh * 0.9); ctx.bezierCurveTo(gx + 0.45 * gw, gy + gh * 0.9, gx + 0.55 * gw, gy + gh * 0.45, gx + gw, gy + gh * 0.4); ctx.stroke(); regel(ctx, 'stemming', gx + 0.8 * gw, gy + gh * 0.4 + 50, 1, C.groen, 26, 'left', 700); ctx.restore();
      const tk = q.on('tekort', 1); ctx.save(); ctx.globalAlpha *= tk; roundRect(ctx, 420, 700, 1080, 110, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, '"depressie = te weinig serotonine"', 960, 770, fTekst(36, 700), C.text, 'center'); kruis(ctx, 1450, 755, 34, q.on('overtuigend', 1)); ctx.restore(); chip(ctx, 'groot overzicht, 2022 (Moncrieff e.a.)', 1500, 660, C.text2, q.on('2022', 1), 22); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'twee verschillende vragen', 120, 140, 1, C.text, 36, 'left', 700);
      roundRect(ctx, 160, 240, 760, 420, 18); shape(ctx, rgba(C.groen, 0.1), C.groen, 2); text(ctx, 'werken antidepressiva?', 540, 310, fTekst(36, 800), C.text, 'center'); pil(ctx, 440, 420, 1.4, 1); text(ctx, '>', 540, 435, fTitel(64), C.groen, 'center'); pil(ctx, 640, 420, 1.4, 1, '#9AA3B2'); text(ctx, 'gemiddeld beter dan een nep-pil', 540, 530, fTekst(28, 700), C.groen, 'center'); text(ctx, 'verschil kleiner dan gepubliceerd', 540, 590, fTekst(26, 600), C.text2, 'center');
      const hw = q.on('overzicht', 2); ctx.save(); ctx.globalAlpha *= hw; roundRect(ctx, 1000, 240, 760, 420, 18); shape(ctx, rgba(C.goud, 0.08), C.goud, 2); text(ctx, 'hoe werken ze?', 1380, 310, fTekst(36, 800), C.text, 'center'); vraagteken(ctx, 1380, 520, 1, 160); text(ctx, 'nog niet precies bekend', 1380, 610, fTekst(28, 700), C.goud, 'center'); ctx.restore(); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'een idee: nieuwe verbindingen', 120, 140, 1, C.text, 36, 'left', 700);
      const g = clamp((t - q.at('verbindingen', 1)) / 4, 0, 1); for (let i = 0; i < 6; i++) { const x = 300 + (i % 3) * 300, y = 330 + Math.floor(i / 3) * 260; circ(ctx, x, y, 34, rgba(C.teal, 0.4), C.teal, 2); }
      ctx.strokeStyle = C.teal; ctx.lineWidth = 3; [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 4], [2, 5], [0, 4]].forEach(([a, b], k) => { const ax = 300 + (a % 3) * 300, ay = 330 + Math.floor(a / 3) * 260, bx = 300 + (b % 3) * 300, by = 330 + Math.floor(b / 3) * 260; const u = k < 4 ? 1 : clamp(g * 4 - (k - 4), 0, 1); if (u <= 0) return; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(lerp(ax, bx, u), lerp(ay, by, u)); ctx.stroke(); });
      stempel(ctx, 600, 760, 'hypothese', C.goud, q.on('hypothese', 1), -0.08);
      const al = q.on('allebei', 1); ctx.save(); ctx.globalAlpha *= al; brein(ctx, 1450, 520, 0.7, 1, { amy: 0.6, pfc: 0.6, t }); pijl(ctx, 1150, 300, 1330, 400, C.groen, 1, 5, 18); regel(ctx, 'therapie: leren', 1130, 280, 1, C.groen, 28, 'right', 700); pijl(ctx, 1150, 760, 1330, 640, C.oker, 1, 5, 18); regel(ctx, 'medicatie', 1130, 800, 1, C.oker, 28, 'right', 700); metaText(ctx, 'langs een andere weg', 1450, 760, C.grain, 'center', 22); ctx.restore(); ctx.restore(); } },

  // ---------- H5 verdieping ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const pB = q.on('stappen', 1, 0.8), pC = q.on('therapeut', 1, 0.8), A1 = 1 - pB, A2 = pB * (1 - pC), A3 = pC;
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; regel(ctx, 'lang niet iedereen knapt op', 120, 140, 1, C.text, 36, 'left', 700); metaText(ctx, 'depressie · na ongeveer twee maanden · Cuijpers e.a. 2021', 120, 184, C.grain, 'left', 22);
      [['therapie', 41, 'vier', C.groen, 0], ['gewone zorg', 17, 'twee', C.text2, 1]].forEach(([l, k, w, col, i]) => { const a = q.on(w, 1); if (a <= 0.01) return; const x0 = 200 + i * 820; ctx.save(); ctx.globalAlpha *= a; text(ctx, l, x0, 280, fTekst(32, 700), C.text, 'left'); stippen(ctx, x0 + 20, 340, 100, Math.round(k * clamp((t - q.at(w, 1)) * 1.5, 0, 1)), col, 1, 10, 13, 40); text(ctx, '≈ ' + k + ' van de 100 duidelijk beter', x0, 780, fTekst(28, 700), col, 'left'); ctx.restore(); });
      chip(ctx, 'ruim de helft: eerste behandeling niet genoeg', 960, 850, C.koraal, q.on('helft', 1) * (1 - q.on('tien', 3)), 26);
      chip(ctx, 'na herstel: de helft of meer binnen 10 jaar opnieuw', 960, 850, C.koraal, q.on('tien', 3), 26); ctx.restore(); }
    if (A2 > 0.01) { ctx.save(); ctx.globalAlpha *= A2; regel(ctx, 'zorg in stappen (Nederland)', 120, 140, 1, C.text, 36, 'left', 700);
      const st = [['huisarts + praktijkondersteuner', 'huisarts', C.teal], ['basis-GGZ: kortere behandeling', 'basis', C.groen], ['specialistische GGZ: ernstig of ingewikkeld', 'specialistische', C.paars]];
      st.forEach(([l, w, col], i) => { const a = q.on(w, 1); if (a <= 0.01) return; const x = 200 + i * 520, y = 640 - i * 160; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 500, 130, 14); shape(ctx, rgba(col, 0.15), col, 2); ctx.font = fTekst(28, 700); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, l, x + 24, y + 54, 450, 36); ctx.restore(); });
      const ho = q.on('hoger', 1); ctx.save(); ctx.globalAlpha *= ho; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(300, 630); ctx.lineTo(300, 385); ctx.lineTo(1215, 385); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, 1200, 385, 1236, 385, C.koraal, 1, 3, 14); regel(ctx, 'soms meteen hoger', 720, 365, 1, C.koraal, 24, 'center', 700); ctx.restore();
      const om = q.on('omlaag', 1); pijl(ctx, 1500, 330, 1500, 260, C.text2, om, 4, 14); pijl(ctx, 1560, 260, 1560, 330, C.text2, om, 4, 14); regel(ctx, 'omhoog en omlaag', 1530, 230, om, C.text2, 22, 'center', 700);
      const tv = q.on('terugval', 1); ctx.save(); ctx.globalAlpha *= tv; roundRect(ctx, 1260, 650, 500, 170, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'plan bij terugval', 1510, 700, fTekst(28, 800), '#121A26', 'center'); ['vroege signalen', 'wat doe ik dan?'].forEach((l, i) => text(ctx, '· ' + l, 1300, 750 + i * 40, fTekst(24, 700), '#2A2F3E', 'left')); ctx.restore(); ctx.restore(); }
    if (A3 > 0.01) { ctx.save(); ctx.globalAlpha *= A3; regel(ctx, 'en de therapeut zelf', 120, 140, 1, C.text, 36, 'left', 700); metaText(ctx, 'gemiddeld resultaat per therapeut · zelfde methode · indicatief', 120, 184, C.grain, 'left', 22);
      const vals = [0.48, 0.55, 0.6, 0.52, 0.66, 0.44, 0.58, 0.63]; vals.forEach((v, i) => { const x = 260 + i * 130, a = clamp((t - q.at('therapeut', 1) - i * 0.12) * 3, 0, 1); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 720 - v * 600, 80, v * 600, 8); shape(ctx, rgba(C.teal, i === 4 ? 0.85 : 0.45), C.teal, 1.5); mensje(ctx, x + 40, 790, 22, ['#B08A5C', '#7FA3C9', '#C9A688', '#8C7BBF'][i % 4], 1); ctx.restore(); });
      const pr = q.on('procent', 1); ctx.save(); ctx.globalAlpha *= pr; circ(ctx, 1500, 420, 150, rgba(C.fill, 0.7), C.line, 2); ctx.beginPath(); ctx.moveTo(1500, 420); ctx.arc(1500, 420, 150, -Math.PI / 2, -Math.PI / 2 + 0.05 * 6.283); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, '≈ 5%', 1500, 640, fTekst(44, 800), C.goud, 'center'); text(ctx, 'van de verschillen tussen cliënten', 1500, 690, fTekst(26, 600), C.text2, 'center'); ctx.restore();
      chip(ctx, 'voor één cliënt kan het veel uitmaken', 1500, 790, C.groen, q.on('uitmaken', 1), 24); chip(ctx, 'wat ze anders doen: nog onderzocht', 1500, 860, C.text2, q.on('onderzocht', 1), 22); ctx.restore(); } },
});
