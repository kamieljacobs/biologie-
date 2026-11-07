
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
const SCENES = {};
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
// Wat word jij? · Psychologie 2 / Neurowetenschappen · Kijken in een denkend brein — eigen tekeningen (v1.0, 20 okt 2026).
// Rode draad: het methodenbord (WAAR · WANNEER · OORZAAK?). Elke rij komt erbij, het bord wordt nooit vervangen.

// ---------- methodenbord ----------
// rows: [{n, waar (0..1), wanneer (0..1), oorzaak: 'ja'|'nee'|'?', a (0..1), hi (0..1)}]
const BORD_RIJEN = {
  laesie:  { n: 'laesie',        waar: 0.5,  wanneer: 0.05, oorzaak: 'ja?' },
  cel:     { n: 'elektrode bij één cel', waar: 0.95, wanneer: 0.97, oorzaak: 'nee' },
  eeg:     { n: 'EEG',           waar: 0.22, wanneer: 0.95, oorzaak: 'nee' },
  fmri:    { n: 'fMRI',          waar: 0.8,  wanneer: 0.2,  oorzaak: 'nee' },
  tms:     { n: 'TMS',           waar: 0.55, wanneer: 0.85, oorzaak: 'ja' },
  opto:    { n: 'optogenetica',  waar: 0.95, wanneer: 0.97, oorzaak: 'ja' }
};
function methodenBord(ctx, x, y, s, rij, a = 1, o = {}) { if (a <= 0.01) return; const { hi = null, groei = {} } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 840, 120 + rij.length * 92, 16); shape(ctx, rgba(C.fill, 0.75), C.line, 1.5);
  metaText(ctx, 'METHODE', 28, 52, C.grain, 'left', 28); metaText(ctx, 'WAAR', 330, 52, C.grain, 'left', 28); metaText(ctx, 'WANNEER', 500, 52, C.grain, 'left', 28); metaText(ctx, 'OORZAAK?', 672, 52, C.grain, 'left', 28);
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(20, 74); ctx.lineTo(820, 74); ctx.stroke();
  rij.forEach((k, i) => { const R = BORD_RIJEN[k]; if (!R) return; const g = groei[k] == null ? 1 : groei[k]; if (g <= 0.01) return; const yy = 120 + i * 92; ctx.save(); ctx.globalAlpha *= Math.min(1, g * 1.5);
    const on = hi === k; if (on) { roundRect(ctx, 10, yy - 46, 820, 80, 10); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); }
    text(ctx, R.n, 28, yy + 6, fTekst(R.n.length > 14 ? 26 : 32, 700), on ? C.goud : C.text, 'left');
    const bar = (bx, v, col) => { roundRect(ctx, bx, yy - 14, 130, 22, 8); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1); const w = 130 * v * clamp(g * 1.4 - 0.3, 0, 1); if (w > 16) { roundRect(ctx, bx, yy - 14, w, 22, 8); shape(ctx, rgba(col, 0.8), col, 1.5); } };
    bar(330, R.waar, C.teal); bar(500, R.wanneer, C.oker);
    const oz = R.oorzaak, oa = clamp(g * 2 - 1, 0, 1); if (oa > 0.01) { ctx.save(); ctx.globalAlpha *= oa;
      if (oz === 'nee') { kruis(ctx, 740, yy - 4, 30, 1, C.koraal); }
      else if (oz === 'ja') { vink_(ctx, 740, yy - 4, 34, 1, C.groen); }
      else { vink_(ctx, 730, yy - 4, 28, 1, rgba(C.groen, 0.7)); text(ctx, '?', 762, yy + 8, fTekst(30, 800), C.groen, 'left'); }
      ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); }

// ---------- hersenen van boven / zij ----------
// gebruikt brein() uit de therapiefilm (zijaanzicht, voorkant links) voor de basisvorm
function vlek(ctx, x, y, r, col, a = 1, t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const p = 1 + puls * 0.08 * Math.sin(t * 5); ctx.beginPath(); ctx.ellipse(x, y, r * p, r * 0.75 * p, 0.2, 0, 6.283); shape(ctx, rgba(col, 0.75), lighten(col, 0.35), 2); ctx.restore(); }
// schets van de schedel met de baan van de staaf (Gage), voorkant links
function schedelStaaf(ctx, x, y, s, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, 60); ctx.bezierCurveTo(-200, -120, -60, -230, 60, -215); ctx.bezierCurveTo(190, -200, 230, -60, 200, 40); ctx.bezierCurveTo(190, 100, 140, 120, 120, 150); ctx.lineTo(60, 160); ctx.lineTo(40, 210); ctx.lineTo(-60, 210); ctx.bezierCurveTo(-110, 200, -150, 160, -170, 60); ctx.closePath(); shape(ctx, '#E8E2D2', '#B8B0A0', 2.5);
  // oogkas
  ctx.beginPath(); ctx.ellipse(-110, 10, 34, 26, 0, 0, 6.283); shape(ctx, '#3A3550', null);
  // staaf: van onder de wang schuin omhoog door de voorkant van de schedel
  const x0 = -150, y0 = 300, x1 = 60, y1 = -300; const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u);
  ctx.strokeStyle = '#6E6A66'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe, ye); ctx.stroke();
  ctx.strokeStyle = '#9A958E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 - 4, y0); ctx.lineTo(xe - 4, ye); ctx.stroke();
  ctx.restore(); }

// ---------- lab en apparaten ----------
// EEG-kap: elektroden als stipjes op een halve boog boven een hoofd op (x, y = kruin)
function eegKap(ctx, x, y, r, a = 1, t = 0, act = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y + r * 0.85, r, Math.PI * 1.08, Math.PI * 1.92); ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < 9; i++) { const an = Math.PI * (1.12 + i * 0.095); const px = x + Math.cos(an) * r, py = y + r * 0.85 + Math.sin(an) * r; const on = act > 0 && (Math.sin(t * 3 + i) > 0.3); circ(ctx, px, py, 9, on ? C.teal : '#AFC0D0', '#121A26', 1.5); }
  ctx.restore(); }
// golflijn (EEG-spoor): freq in Hz, amp in px, piek = extra uitslag rond tPiek (s)
function golf(ctx, x, y, w, amp, a = 1, o = {}) { if (a <= 0.01) return; const { freq = 10, t = 0, col = C.teal, piek = 0, tPiek = 0.6, seed = 1, schaal = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i <= w; i += 3) { const tt = i / w * schaal; let v = Math.sin((tt + t * 0.25) * freq * 6.283) * 0.6 + Math.sin((tt * 3.7 + seed) * freq * 2.1) * 0.25 + (hash(Math.floor(i / 3) + seed * 97) - 0.5) * 0.35; if (piek) v -= piek * Math.exp(-Math.pow((tt - tPiek) / 0.05, 2)) * 2.2; const py = y + v * amp; if (i === 0) ctx.moveTo(x + i, py); else ctx.lineTo(x + i, py); }
  ctx.stroke(); ctx.restore(); }
// één neuron met elektrode; spikes = pulsjes langs het axon
function neuronElektrode(ctx, x, y, s, a = 1, t = 0, vuurt = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round';
  [[-1.1, 120], [-2.3, 110], [-2.9, 90], [2.6, 100], [-0.5, 90]].forEach(([an, l]) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(an) * l * 0.5 + 10, Math.sin(an) * l * 0.5 - 10, Math.cos(an) * l, Math.sin(an) * l); ctx.stroke(); });
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(120, 30, 220, -20, 380, 20); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 44, 36, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.3), C.teal, 2.5);
  if (vuurt > 0.01) { for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k * 0.33) % 1); const px = lerp(40, 380, u), py = Math.sin(u * 3.2) * 12; circ(ctx, px, py, 9, rgba(C.goud, vuurt), lighten(C.goud, 0.4), 1.5); } }
  // elektrode: dunne naald van rechtsboven naar de cel
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(260, -260); ctx.lineTo(48, -30); ctx.stroke(); roundRect(ctx, 250, -300, 40, 60, 6); shape(ctx, '#8A8E96', null);
  ctx.restore(); }
// spike-spoor: verticale streepjes op tijden (s) binnen venster w
function spikeSpoor(ctx, x, y, w, tijden, a = 1, nu = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; tijden.forEach(tt => { if (tt > nu) return; const px = x + tt * w; ctx.beginPath(); ctx.moveTo(px, y + 10); ctx.lineTo(px, y - 46); ctx.stroke(); }); ctx.restore(); }
// lichtstreepje op een scherm, onder hoek an (rad)
function streepScherm(ctx, x, y, s, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 70 * s, 180 * s, 140 * s, 8); shape(ctx, '#121A26', C.line, 2); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#F2F2EE'; roundRect(ctx, -50 * s, -6 * s, 100 * s, 12 * s, 4); ctx.fill(); ctx.restore(); }
// MRI-scanner van opzij: ring + bed; inhoud = callback die tekent wat er op het bed ligt
function scanner(ctx, x, y, s, a = 1, bedIn = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -560, 120, 1100, 40, 12); shape(ctx, '#3A4A66', rgba(C.line, 0.7), 1.5); // bed
  roundRect(ctx, -160, -230, 380, 420, 60); shape(ctx, '#C9D2DE', '#8FA0B5', 2.5); // ring
  ctx.beginPath(); ctx.ellipse(30, 0, 120, 150, 0, 0, 6.283); shape(ctx, '#1A2740', '#8FA0B5', 2);
  metaText(ctx, 'MRI-SCANNER', 30, -260, C.grain, 'center', 28);
  ctx.restore(); }
// bloedvat met rode bloedcellen; zuurstofrijk (koraal, vol) vs zuurstofarm (donkerder); stroom = extra toevoer
function bloedvat(ctx, x, y, w, a = 1, t = 0, extra = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 60, w, 120, 60); shape(ctx, rgba(C.koraal, 0.12), rgba(C.koraal, 0.7), 2);
  const n = 10 + Math.round(extra * 8); for (let i = 0; i < n; i++) { const u = ((t * (0.08 + extra * 0.12) + hash(i + 11)) % 1); const px = x + 40 + u * (w - 80), py = y + (hash(i + 40) - 0.5) * 70; const rijk = hash(i + 77) < 0.55 + extra * 0.35; ctx.beginPath(); ctx.ellipse(px, py, 22, 13, 0, 0, 6.283); shape(ctx, rijk ? C.koraal : '#7A3B4A', lighten(rijk ? C.koraal : '#7A3B4A', 0.3), 1.5); }
  ctx.restore(); }
// raster van blokjes (voxels) over een vlak
function voxelRaster(ctx, x, y, w, h, n, a = 1, kleur = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = w / n, dy = h / Math.round(n * h / w); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1;
  for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.moveTo(x + i * dx, y); ctx.lineTo(x + i * dx, y + h); ctx.stroke(); }
  for (let j = 0; j * dy <= h + 0.1; j++) { ctx.beginPath(); ctx.moveTo(x, y + j * dy); ctx.lineTo(x + w, y + j * dy); ctx.stroke(); }
  if (kleur) kleur.forEach(([i, j, col, aa]) => { ctx.save(); ctx.globalAlpha *= aa; ctx.fillStyle = col; ctx.fillRect(x + i * dx + 1, y + j * dy + 1, dx - 2, dy - 2); ctx.restore(); });
  ctx.restore(); }
// zalm in zijaanzicht (Macro-silhouet), kop rechts
function zalm(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, 0); ctx.lineTo(-290, -50); ctx.lineTo(-280, 0); ctx.lineTo(-290, 50); ctx.closePath(); shape(ctx, '#8C9AAE', '#B8C0D0', 1.5);
  ctx.beginPath(); ctx.moveTo(-230, 0); ctx.bezierCurveTo(-150, -80, 120, -95, 230, -10); ctx.bezierCurveTo(240, 0, 240, 10, 230, 18); ctx.bezierCurveTo(120, 80, -150, 70, -230, 0); ctx.closePath(); shape(ctx, '#9AA8BC', '#C8D0DC', 1.5);
  ctx.beginPath(); ctx.moveTo(-100, 10); ctx.bezierCurveTo(0, 40, 120, 30, 200, 12); ctx.lineTo(200, 22); ctx.bezierCurveTo(100, 60, -20, 60, -100, 10); ctx.closePath(); ctx.fillStyle = '#E3A08A'; ctx.fill(); // roze buik
  ctx.beginPath(); ctx.moveTo(-20, -62); ctx.lineTo(30, -110); ctx.lineTo(60, -66); ctx.closePath(); shape(ctx, '#8C9AAE', null);
  circ(ctx, 190, -8, 5, '#121A26'); ctx.restore(); }
// TMS-spoel: acht-vormige spoel aan een handvat
function spoel(ctx, x, y, s, a = 1, puls = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -14, -200, 28, 150, 10); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  [-58, 58].forEach(dx => { ctx.beginPath(); ctx.arc(dx, 0, 56, 0, 6.283); shape(ctx, '#3A4458', '#AFC0D0', 3); ctx.beginPath(); ctx.arc(dx, 0, 30, 0, 6.283); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.stroke(); });
  if (puls > 0.01) { for (let k = 1; k <= 3; k++) { ctx.save(); ctx.globalAlpha *= puls * (1 - k * 0.25) * (0.6 + 0.4 * Math.sin(t * 8 - k)); ctx.beginPath(); ctx.ellipse(0, 70 + k * 26, 90 - k * 18, 16, 0, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }
// muis van opzij met lichtvezel op de kop
function muis(ctx, x, y, s, a = 1, licht = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20, -200, -30, -240, -10); ctx.stroke(); // staart
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A');
  // lichtvezel
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(110, -46); ctx.bezierCurveTo(120, -160, 40, -220, -40, -300); ctx.stroke(); roundRect(ctx, 100, -58, 22, 16, 4); shape(ctx, '#8A8E96', null);
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht * (0.7 + 0.3 * Math.sin(t * 9)); circ(ctx, 111, -40, 16, rgba(C.teal, 0.6)); ctx.restore(); }
  ctx.restore(); }
// lichtgevoelig kanaaltje in een membraan: open = ionen erdoor
function lichtKanaal(ctx, x, y, s, open = 0, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 700, 700, -Math.PI / 2 - 0.47, -Math.PI / 2 + 0.47); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 740, 700, -Math.PI / 2 - 0.47, -Math.PI / 2 + 0.47); ctx.stroke();
  const g = 18 + open * 26; roundRect(ctx, -g - 40, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5); roundRect(ctx, g, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5);
  if (open > 0.05) { for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k * 0.25) % 1; circ(ctx, Math.sin(k * 2) * 6, lerp(-110, 150, u), 9, rgba(C.goud, open), lighten(C.goud, 0.4), 1); } }
  ctx.restore(); }
function fiets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4 * s; circ(ctx, x - 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); circ(ctx, x + 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 28 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
function auto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 50 * s, 180 * s, 44 * s, 12 * s); shape(ctx, C.koraal, null); roundRect(ctx, x - 50 * s, y - 84 * s, 100 * s, 40 * s, 12 * s); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, x - 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); circ(ctx, x + 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); ctx.restore(); }
function gezichtIcoon(ctx, x, y, s, a = 1, id = 'noor') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 44 * s, y - 50 * s, 88 * s, 100 * s, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.beginPath(); ctx.rect(x - 40 * s, y - 46 * s, 80 * s, 92 * s); ctx.clip(); const L = (CAST[id] && CAST[id].lengte) || 1; persoon(ctx, id, x, y + s * (360 * L - 44), 360 * s, {}); ctx.restore(); }
function vraagKaartje(ctx, x, y, w, tekst, a = 1, stempelT = '', stCol = C.koraal, goed = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 90, 12); shape(ctx, '#F2EEE4', goed ? C.groen : '#B8B0A0', goed ? 3 : 2); ctx.font = fTekst(28, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, tekst, x + 20, y + 38, w - 40, 32); ctx.restore(); if (stempelT) stempel(ctx, x + w - 90, y + 70, stempelT, stCol, a); }
function document_(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20 * s, y - 26 * s, 40 * s, 52 * s, 4); shape(ctx, '#F2EEE4', col, 2); ctx.fillStyle = col; ctx.fillRect(x - 12 * s, y - 14 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y - 2 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y + 10 * s, 16 * s, 4 * s); ctx.restore(); }
// Binnen de grenzen — tekeningen, overgenomen uit Ecologie 3 (Eén aarde) en 4 (Ingrijpen of laten gaan?), aangevuld
const PLAAG = C.koraal, VIJAND = C.groen;
function bij(ctx, x, y, s, ang = 0, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = 0.8 + 0.2 * Math.sin(t * 70); ctx.fillStyle = rgba('#DDEBF5', 0.55); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 15, -2, 17 * fl, 8, sx * 0.55, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 20, 11, 18, 0, 0, 6.283); shape(ctx, '#E0B64A', '#5A4010', 1.5); ctx.strokeStyle = '#3A2A10'; ctx.lineWidth = 3.5; for (const yy of [14, 22, 30]) { ctx.beginPath(); ctx.moveTo(-9.5, yy); ctx.lineTo(9.5, yy); ctx.stroke(); }
  circ(ctx, 0, -4, 9, '#7A5A2A'); circ(ctx, 0, -16, 7, '#3A2A14'); ctx.strokeStyle = '#3A2A14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, -21); ctx.lineTo(-9, -31); ctx.moveTo(3, -21); ctx.lineTo(9, -31); ctx.stroke(); ctx.restore(); }
function zweefvlieg(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const fl = 0.8 + 0.2 * Math.sin(t * 70); ctx.fillStyle = rgba('#DDEBF5', 0.5); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 16, 2, 18 * fl, 7, sx * 0.3, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 16, 8, 16, 0, 0, 6.283); shape(ctx, '#E8C040', '#2A2A30', 1.2); ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 3; for (const yy of [8, 16, 24]) { ctx.beginPath(); ctx.moveTo(-7, yy); ctx.lineTo(7, yy); ctx.stroke(); }
  circ(ctx, 0, -2, 6.5, '#4A4A30'); circ(ctx, 0, -12, 6.5, '#8A3A2A'); ctx.restore(); }
function bloem(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = i / 5 * 6.283; circ(ctx, x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.5, col); } circ(ctx, x, y, r * 0.38, '#F0D060'); ctx.restore(); }
function berk(ctx, x, yG, h, a = 1) { if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E8E4DA'; ctx.fillRect(x - h * 0.03, yG - h, h * 0.06, h); ctx.fillStyle = '#2A2A30'; for (let i = 1; i < 6; i++) ctx.fillRect(x - h * 0.03, yG - h * i / 6, h * 0.04, 3); ctx.beginPath(); ctx.ellipse(x, yG - h * 0.75, h * 0.22, h * 0.32, 0, 0, 6.283); shape(ctx, rgba('#9CC86A', 0.9), '#7FA855', 1.5); ctx.restore(); }
function den(ctx, x, yG, h, a = 1) { if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A3A'; ctx.fillRect(x - h * 0.03, yG - h * 0.5, h * 0.06, h * 0.5); ctx.beginPath(); ctx.ellipse(x, yG - h * 0.72, h * 0.24, h * 0.24, 0, 0, 6.283); shape(ctx, '#3E6E4A', '#2E5A3A', 1.5); ctx.restore(); }
function vogel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(t * 8) * 10; ctx.strokeStyle = '#D8CDB0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-28, -6 - f); ctx.quadraticCurveTo(-12, -14, 0, 0); ctx.quadraticCurveTo(12, -14, 28, -6 - f); ctx.stroke(); ctx.restore(); }
function vis(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, col = '#B8B0A0', t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const zw = Math.sin(t * 5) * 6;
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-56, -16 + zw); ctx.lineTo(-56, 16 + zw); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.beginPath(); ctx.ellipse(0, 0, 40, 20, 0, 0, 6.283); shape(ctx, col, lighten(col, 0.3), 1.5); circ(ctx, 26, -4, 3.5, '#121A26'); ctx.restore(); }
function grond(ctx, y, a = 1, col = '#3A5540') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(col, 0.55); ctx.fillRect(40, y, W - 80, CAPTION_Y - 10 - y); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke(); ctx.restore(); }
function boogPijl(ctx, x1, y1, x2, y2, bocht, col, a = 1, lw = 4) { if (a <= 0.01) return; const mx = (x1 + x2) / 2 - (y2 - y1) * bocht, my = (y1 + y2) / 2 + (x2 - x1) * bocht; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.restore(); const an = Math.atan2(y2 - my, x2 - mx); pijl(ctx, x2 - Math.cos(an) * 2, y2 - Math.sin(an) * 2, x2, y2, col, a, lw, 18); }
function tekstBlok(ctx, s, x, y, maxW, px = 26, col = C.text, a = 1, lh = 1.3, w = 600) { if (a <= 0.01) return y; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, w); ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; const yy = wrap(ctx, s, x, y, maxW, px * lh); ctx.restore(); return yy; }
function fasen(q, cues, d = 0.7) { const on = cues.map(c => c ? q.on(c[0], c[1] || 1, d) : 1); return on.map((v, i) => v * (i + 1 < on.length ? 1 - on[i + 1] : 1)); }
function lijn(ctx, pts, col, u = 1, lw = 4, a = 1, dash = null) { if (a <= 0.01 || u <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); const n = Math.max(1, Math.floor((pts.length - 1) * clamp(u, 0, 1))); ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore(); return pts[n]; }
function graspol(ctx, x, y, h, a = 1, col = '#8FB860') { if (a <= 0.01 || h < 1) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x + i * 3, y); ctx.quadraticCurveTo(x + i * 5, y - h * 0.6, x + i * 9, y - h); ctx.stroke(); } ctx.restore(); }
function rund(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, eet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const k = '#A8643A';
  ctx.strokeStyle = '#6A3A20'; ctx.lineWidth = 10; for (const lx of [-40, -22, 26, 42]) { ctx.beginPath(); ctx.moveTo(lx, 14); ctx.lineTo(lx, 50); ctx.stroke(); }
  roundRect(ctx, -60, -30, 120, 54, 24); shape(ctx, k, '#7A4428', 2); ctx.strokeStyle = '#C88A5A'; ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 9, 14); ctx.lineTo(-48 + i * 9, 26); ctx.stroke(); }
  const hy = eet ? 18 + 5 * Math.sin(t * 3) : -14; ctx.beginPath(); ctx.ellipse(70, hy, 18, 16, 0.2, 0, 6.283); shape(ctx, k, '#7A4428', 2); ctx.strokeStyle = '#E8DCC0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(62, hy - 12); ctx.quadraticCurveTo(50, hy - 30, 40, hy - 26); ctx.moveTo(76, hy - 12); ctx.quadraticCurveTo(90, hy - 30, 100, hy - 24); ctx.stroke(); ctx.restore(); }
function schaap(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, eet = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 6; for (const lx of [-24, -10, 14, 26]) { ctx.beginPath(); ctx.moveTo(lx, 10); ctx.lineTo(lx, 40); ctx.stroke(); }
  for (let i = 0; i < 9; i++) circ(ctx, -30 + (i % 5) * 15, -6 + Math.floor(i / 5) * 16 + (i % 2) * 3, 14, '#EDE8DC', '#C8C0B0', 1.2);
  const hy = eet ? 14 + 6 * Math.sin(t * 3) : -12; ctx.beginPath(); ctx.ellipse(48, hy, 11, 16, -0.6, 0, 6.283); shape(ctx, '#2A2A30', null); circ(ctx, 50, hy - 6, 2, '#F2EEE4'); ctx.restore(); }
function aarde(ctx, x, y, r, a = 1, frac = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (frac < 1) { ctx.beginPath(); ctx.rect(x - r - 4, y - r - 4, (2 * r + 8) * frac, 2 * r + 8); ctx.clip(); }
  circ(ctx, x, y, r, '#2E6FBF'); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#5FA86E';
  [[-0.35, -0.3, 0.42, 0.3, 1], [0.3, -0.05, 0.3, 0.45, 2], [-0.2, 0.45, 0.3, 0.2, 3], [0.45, -0.55, 0.25, 0.18, 4]].forEach(([dx, dy, rx, ry, s]) => { blob(ctx, x + dx * r, y + dy * r, rx * r, ry * r, 0.25, s); ctx.fill(); });
  ctx.fillStyle = rgba('#000000', 0.18); ctx.beginPath(); ctx.arc(x + r * 0.35, y + r * 0.2, r * 1.05, 0, 6.283); ctx.arc(x, y, r * 1.6, 0, 6.283, true); ctx.fill(); ctx.restore(); ctx.strokeStyle = '#9FC3E8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore();
  if (frac < 1 && a > 0.01) { ctx.save(); ctx.globalAlpha *= a * 0.5; ctx.setLineDash([8, 8]); ctx.strokeStyle = '#9FC3E8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); } }
function appel(ctx, x, y, s = 1, a = 1, col = '#D8573F') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x - 9 * s, y, 20 * s, 0, 6.283); ctx.arc(x + 9 * s, y, 20 * s, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#6A4A2A'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x, y - 16 * s); ctx.lineTo(x + 3 * s, y - 30 * s); ctx.stroke(); ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.ellipse(x + 12 * s, y - 26 * s, 9 * s, 5 * s, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); }
function boom(ctx, x, y, s = 1, a = 1, col = '#4F8F5A') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A3A'; ctx.fillRect(x - 7 * s, y - 50 * s, 14 * s, 50 * s); blob(ctx, x, y - 80 * s, 42 * s, 46 * s, 0.12, x * 0.01); shape(ctx, col, lighten(col, 0.25), 1.5); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }
function wolkje(ctx, x, y, s = 1, a = 1, col = '#C9CED6') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; [[-40, 6, 34], [0, -10, 44], [42, 4, 32]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 6.283); ctx.fill(); }); ctx.fillRect(x - 70 * s, y + 6 * s, 140 * s, 30 * s); ctx.restore(); }
function huisje(ctx, x, y, s = 1, a = 1, col = '#C9A35C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.fillRect(x - 50 * s, y - 70 * s, 100 * s, 70 * s); ctx.fillStyle = '#B8504A'; ctx.beginPath(); ctx.moveTo(x - 62 * s, y - 70 * s); ctx.lineTo(x, y - 120 * s); ctx.lineTo(x + 62 * s, y - 70 * s); ctx.fill(); ctx.fillStyle = '#F2C94C'; ctx.fillRect(x - 30 * s, y - 52 * s, 22 * s, 20 * s); ctx.restore(); }
function fabriek(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(x - 90 * s, y); ctx.lineTo(x - 90 * s, y - 70 * s); ctx.lineTo(x - 50 * s, y - 100 * s); ctx.lineTo(x - 50 * s, y - 70 * s); ctx.lineTo(x - 10 * s, y - 100 * s); ctx.lineTo(x - 10 * s, y - 70 * s); ctx.lineTo(x + 90 * s, y - 70 * s); ctx.lineTo(x + 90 * s, y); ctx.fill(); ctx.fillRect(x + 40 * s, y - 170 * s, 26 * s, 100 * s); ctx.restore(); }
function koe(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E8E2D8'; [[-70, 0], [-40, 0], [40, 0], [70, 0]].forEach(([dx]) => { ctx.fillRect(x + dx * s - 7 * s, y - 60 * s, 14 * s, 60 * s); }); roundRect(ctx, x - 95 * s, y - 135 * s, 190 * s, 85 * s, 36 * s); shape(ctx, '#E8E2D8', '#B8B2A8', 2); ctx.fillStyle = '#3A3530'; blob(ctx, x - 30 * s, y - 110 * s, 30 * s, 20 * s, 0.25, 2); ctx.fill(); blob(ctx, x + 40 * s, y - 80 * s, 22 * s, 16 * s, 0.25, 5); ctx.fill(); roundRect(ctx, x + 85 * s, y - 160 * s, 60 * s, 70 * s, 22 * s); shape(ctx, '#E8E2D8', '#B8B2A8', 2); roundRect(ctx, x + 112 * s, y - 118 * s, 40 * s, 30 * s, 12 * s); shape(ctx, '#E8A8A0', null); circ(ctx, x + 108 * s, y - 140 * s, 5 * s, '#121A26'); ctx.restore(); }
function tafel(ctx, x, y, w) { roundRect(ctx, x - w / 2, y, w, 24, 6); shape(ctx, '#8A6A44', '#6A4E30', 2); ctx.fillStyle = '#6A4E30'; ctx.fillRect(x - w / 2 + 30, y + 24, 18, 190); ctx.fillRect(x + w / 2 - 48, y + 24, 18, 190); }
function golfPijl(ctx, x1, y1, x2, y2, col, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L; ctx.beginPath(); for (let d = 0; d <= L - 18; d += 4) { const o = Math.sin(d / 14 - t * 6) * 9; const px = x1 + ux * d - uy * o, py = y1 + uy * d + ux * o; d ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); pijl(ctx, x2 - ux * 20, y2 - uy * 20, x2, y2, col, a, 4, 16); }
function balk(ctx, x, y, w, frac, col, label, a = 1, hh = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, hh, 10); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.002) { roundRect(ctx, x, y, Math.max(12, w * frac), hh, 10); shape(ctx, rgba(col, 0.75), col, 2); } if (label) regel(ctx, label, x, y - 14, 1, C.text, 24, 'left', 700); ctx.restore(); }
function molCO2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 17 * s, y, 10 * s, C.koraal); circ(ctx, x + 17 * s, y, 10 * s, C.koraal); circ(ctx, x, y, 12 * s, '#3A3A3A', '#9AA3B2', 1.5); ctx.restore(); }
function tijdas(ctx, x0, x1, y, j0, j1, a = 1, stappen = 10) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); for (let j = j0; j <= j1; j += stappen) { const px = x0 + (j - j0) / (j1 - j0) * (x1 - x0); ctx.beginPath(); ctx.moveTo(px, y - 8); ctx.lineTo(px, y + 8); ctx.stroke(); text(ctx, String(j), px, y + 40, fTekst(24, 600), C.text2, 'center'); } ctx.restore(); return (j) => x0 + (j - j0) / (j1 - j0) * (x1 - x0); }
function stempel(ctx, x, y, s2, col, a = 1, rot = -0.15, px = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, -w / 2, -px + 2, w, px * 1.75, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, s2, 0, px * 0.3, fTekst(px, 800), col, 'center'); ctx.restore(); }
function plantje(ctx, x, y, s = 1, a = 1, col = '#5FA86E') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 40 * s); ctx.stroke(); ctx.fillStyle = col; [[-1, 16], [1, 28]].forEach(([d, h]) => { ctx.beginPath(); ctx.ellipse(x + d * 12 * s, y - h * s, 13 * s, 6 * s, d * 0.5, 0, 6.283); ctx.fill(); }); ctx.restore(); }
function gras(ctx, x, y, w, h, a = 1, col = '#7FA85A') { if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; for (let i = 0; i < w / 9; i++) { const px = x + i * 9 + hash(i) * 6; ctx.beginPath(); ctx.moveTo(px, y); ctx.quadraticCurveTo(px + 6, y - h * 0.6, px + (hash(i + 9) - 0.5) * 18, y - h * (0.7 + 0.3 * hash(i + 4))); ctx.stroke(); } ctx.restore(); }
function vliegtuig(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9CED6'; roundRect(ctx, x - 70 * s, y - 10 * s, 140 * s, 20 * s, 10 * s); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 10 * s, y); ctx.lineTo(x - 40 * s, y + 50 * s); ctx.lineTo(x + 5 * s, y + 50 * s); ctx.lineTo(x + 25 * s, y); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 60 * s, y); ctx.lineTo(x - 75 * s, y - 30 * s); ctx.lineTo(x - 55 * s, y - 30 * s); ctx.lineTo(x - 40 * s, y); ctx.fill(); ctx.restore(); }
function kever(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, larve = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (larve) { ctx.strokeStyle = '#E8E0C8'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 14, 0.6, 5.2); ctx.stroke(); circ(ctx, 14 * Math.cos(5.2), 14 * Math.sin(5.2), 7, '#B8783A'); ctx.restore(); return; }
  ctx.strokeStyle = '#2A2016'; ctx.lineWidth = 2.5; for (const sx of [-1, 1]) for (const yy of [-4, 4, 12]) { ctx.beginPath(); ctx.moveTo(sx * 10, yy); ctx.lineTo(sx * 19, yy + 5); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 4, 12, 17, 0, 0, 6.283); shape(ctx, '#8A6A4A', '#4A3420', 1.5); ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 20); ctx.stroke(); circ(ctx, 0, -14, 6, '#4A3420'); ctx.restore(); }
// Binnen de grenzen — eigen tekeningen (bestuivers, gewassen, rivier, aardsystemen, planetaire grenzen, ozonlaag)

// ---------- bestuivers (kop naar boven tenzij ang) ----------
function hommel(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, ang = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = Math.sin(t * 40) * 0.25; ctx.fillStyle = rgba('#C8D4E4', 0.55); ctx.strokeStyle = rgba('#E6EEF8', 0.7); ctx.lineWidth = 1;
  for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * (0.5 + fl)); ctx.beginPath(); ctx.ellipse(d * 22, -6, 22, 10, 0, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 14, 20, 24, 0, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#E8C04A'; ctx.fillRect(-22, -2, 44, 10); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-22, 26, 44, 14); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0, -10, 16, 13, 0, 0, 6.283); ctx.fillStyle = '#E8C04A'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -24, 10, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.strokeStyle = 'rgba(242,238,230,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 18; i++) { const an = i / 18 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 18, 14 + Math.sin(an) * 22); ctx.lineTo(Math.cos(an) * 22, 14 + Math.sin(an) * 26); ctx.stroke(); }
  ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -32); ctx.lineTo(-10, -44); ctx.moveTo(4, -32); ctx.lineTo(10, -44); ctx.stroke(); ctx.restore(); }
function wildeBij(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, ang = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const fl = Math.sin(t * 46) * 0.25; ctx.fillStyle = rgba('#C8D4E4', 0.5); for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * (0.6 + fl)); ctx.beginPath(); ctx.ellipse(d * 16, -4, 16, 7, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 12, 11, 17, 0, 0, 6.283); ctx.fillStyle = '#C9683A'; ctx.fill(); ctx.strokeStyle = '#E8955E'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -6, 9, 8, 0, 0, 6.283); ctx.fillStyle = '#4A3A30'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -16, 6.5, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill();
  ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-3, -21); ctx.lineTo(-7, -30); ctx.moveTo(3, -21); ctx.lineTo(7, -30); ctx.stroke(); ctx.restore(); }
function vlinder(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, col = '#E07A5F' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = 0.55 + 0.45 * Math.abs(Math.cos(t * 6));
  for (const d of [-1, 1]) { ctx.save(); ctx.scale(d * k, 1); ctx.beginPath(); ctx.ellipse(16, -10, 18, 14, -0.4, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.ellipse(12, 12, 12, 10, 0.4, 0, 6.283); ctx.fill(); ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.arc(20, -12, 3.5, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#2A2420'; roundRect(ctx, -3, -18, 6, 36, 3); ctx.fill(); ctx.restore(); }

// ---------- gewassen ----------
function graanaar(ctx, x, yG, h, a = 1, t = 0, wind = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); const b = Math.sin(t * 1.6 + x * 0.01) * 0.08 * wind;
  ctx.rotate(b); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(4, -h * 0.5, 0, -h * 0.7); ctx.stroke();
  for (let i = 0; i < 7; i++) { const yy = -h * 0.7 - i * h * 0.045; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 7, yy, 6, 11, d * 0.35, 0, 6.283); ctx.fillStyle = '#D9B866'; ctx.fill(); ctx.strokeStyle = '#B08A3C'; ctx.lineWidth = 1; ctx.stroke(); } }
  ctx.strokeStyle = '#D9B866'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo((i % 2 ? 7 : -7), -h * 0.73 - i * h * 0.045); ctx.lineTo((i % 2 ? 22 : -22), -h * 0.85 - i * h * 0.05); ctx.stroke(); }
  ctx.restore(); }
function aardbei(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-30, 10, -26, -20, 0, -18); ctx.bezierCurveTo(26, -20, 30, 10, 0, 30); ctx.fillStyle = '#D8463F'; ctx.fill(); ctx.strokeStyle = '#F07A6A'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = '#F2D27A'; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.ellipse(-12 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4, -6 + Math.floor(i / 4) * 11, 1.6, 2.4, 0, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#5FA86E'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.rotate(-1.1 + i * 0.55); ctx.beginPath(); ctx.ellipse(0, -22, 5, 11, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
function amandel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -26); ctx.bezierCurveTo(20, -14, 18, 18, 0, 26); ctx.bezierCurveTo(-18, 18, -20, -14, 0, -26); ctx.fillStyle = '#B07A4C'; ctx.fill(); ctx.strokeStyle = '#D9A272'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.strokeStyle = 'rgba(80,50,30,.45)'; ctx.beginPath(); ctx.moveTo(-4, -16); ctx.quadraticCurveTo(-8, 0, -3, 16); ctx.moveTo(5, -12); ctx.quadraticCurveTo(7, 0, 4, 14); ctx.stroke(); ctx.restore(); }
function koffie(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 30, -16 * d, 18, 8, d * 0.5, 0, 6.283); ctx.fill(); }
  [[-12, 8], [0, 12], [12, 8], [-6, -4], [6, -4]].forEach(([bx, by], i) => { ctx.beginPath(); ctx.arc(bx, by, 8, 0, 6.283); ctx.fillStyle = i % 2 ? '#B8322E' : '#D8463F'; ctx.fill(); ctx.strokeStyle = '#F07A6A'; ctx.lineWidth = 1; ctx.stroke(); }); ctx.restore(); }
function tomaat(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 4, 26, 22, 0, 0, 6.283); ctx.fillStyle = '#E0503C'; ctx.fill(); ctx.strokeStyle = '#F2846E'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(0, -16); ctx.rotate(i / 5 * 6.283); ctx.beginPath(); ctx.ellipse(0, -6, 3, 8, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
function bloesemTak(ctx, x, y, s = 1, o = {}) { const { a = 1, bloei = 1, vrucht = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#6A4A34'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-260, 60); ctx.quadraticCurveTo(-60, 10, 200, -40); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60, 22); ctx.quadraticCurveTo(-10, -60, 40, -110); ctx.moveTo(90, -18); ctx.quadraticCurveTo(140, 30, 170, 80); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; [[-140, 40, 0.5], [-30, -30, -0.8], [120, -40, 0.2], [170, 40, 1.2], [0, -80, -1]].forEach(([bx, by, r]) => { ctx.save(); ctx.translate(bx, by); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 26, 11, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  const spots = [[-180, 30], [-90, 10], [40, -110], [-10, -40], [200, -40], [170, 80], [100, -30]];
  spots.forEach(([bx, by], i) => { if (vrucht > 0.01) appel(ctx, bx, by + 18, 0.55 * vrucht, 1); if (bloei > 0.01) { ctx.save(); ctx.globalAlpha *= bloei * (1 - vrucht); for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 + i; ctx.beginPath(); ctx.ellipse(bx + Math.cos(an) * 11, by + Math.sin(an) * 11, 10, 8, an, 0, 6.283); ctx.fillStyle = '#F6E4EA'; ctx.fill(); ctx.strokeStyle = '#E8B4C2'; ctx.lineWidth = 1; ctx.stroke(); } ctx.beginPath(); ctx.arc(bx, by, 5, 0, 6.283); ctx.fillStyle = '#E0B64A'; ctx.fill(); ctx.restore(); } });
  ctx.restore(); }

// ---------- Lottes ontbijt ----------
function ontbijt(ctx, x, y, a = 1, o = {}) { const { appelA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 300, y, 600, 26, 8); shape(ctx, '#8C6A4A', '#B08A68', 1.5); ctx.fillStyle = '#6A4E36'; ctx.fillRect(x - 270, y + 26, 18, 140); ctx.fillRect(x + 252, y + 26, 18, 140);
  ctx.beginPath(); ctx.ellipse(x - 150, y - 6, 90, 18, 0, 0, 6.283); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5);
  roundRect(ctx, x - 205, y - 40, 110, 34, 14); shape(ctx, '#C99A5C', '#E0BC84', 1.2); roundRect(ctx, x - 190, y - 34, 80, 22, 10); shape(ctx, '#EAD4A8', null);
  ctx.beginPath(); ctx.ellipse(x + 40, y - 6, 70, 14, 0, 0, 6.283); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); aardbei(ctx, x + 15, y - 26, 0.7); aardbei(ctx, x + 60, y - 22, 0.6);
  roundRect(ctx, x + 150, y - 70, 60, 70, 8); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x + 214, y - 36, 14, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#4A2E1C'; ctx.fillRect(x + 156, y - 62, 48, 8);
  appel(ctx, x + 260, y - 30, 1.1, appelA); ctx.restore(); }

// ---------- rivier bij Nijmegen (bovenaanzicht, schematisch) ----------
function waalKaart(ctx, X, Y, Wd, Hd, o = {}) { const { a = 1, geul = 0, hoog = 0, t = 0, natuur = 0, lab = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, X, Y, Wd, Hd, 16); shape(ctx, '#2F4A3A', C.line, 1.5); ctx.save(); roundRect(ctx, X, Y, Wd, Hd, 16); ctx.clip();
  const rv = (u) => Y + Hd * 0.62 - Math.sin(u * Math.PI) * Hd * 0.16; // de Waal maakt een bocht
  const gv = (u) => rv(u) - Hd * 0.2 * Math.sin(Math.PI * clamp((u - 0.15) / 0.7, 0, 1)); // nevengeul aan de noordkant (Lent)
  // Nijmegen (zuid) en Lent (noord)
  const huis = (hx, hy, s) => { ctx.fillStyle = '#6A6E7A'; ctx.fillRect(hx - 12 * s, hy - 14 * s, 24 * s, 14 * s); ctx.fillStyle = '#9A5A48'; ctx.beginPath(); ctx.moveTo(hx - 15 * s, hy - 14 * s); ctx.lineTo(hx, hy - 26 * s); ctx.lineTo(hx + 15 * s, hy - 14 * s); ctx.closePath(); ctx.fill(); };
  for (let i = 0; i < 22; i++) huis(X + 40 + (i % 11) * (Wd - 80) / 10.5, Y + Hd - 50 - Math.floor(i / 11) * 40 + (i % 3) * 4, 1.2);
  for (let i = 0; i < 10; i++) huis(X + 50 + i * (Wd - 100) / 9.5, Y + 60 + (i % 2) * 6, 1.1);
  const pad = (f, w, col) => { ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50, px = X - 20 + u * (Wd + 40), py = f(u); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
  if (hoog > 0.01) { ctx.save(); ctx.globalAlpha *= hoog * 0.5; pad(rv, 40 + 120 * hoog, '#2E6FBF'); ctx.restore(); }
  pad(rv, 42, '#2E6FBF');
  if (geul > 0.01) { ctx.save(); ctx.globalAlpha *= geul; pad(gv, 22 + 16 * hoog, '#3A86D4');
    if (natuur > 0.01) { ctx.globalAlpha *= natuur; for (let k = 0; k < 14; k++) { const u = 0.22 + 0.56 * k / 14; const px = X - 20 + u * (Wd + 40), py = (rv(u) + gv(u)) / 2 + ((k % 3) - 1) * 6; ctx.fillStyle = k % 4 ? '#5FA86E' : '#7FC48F'; ctx.beginPath(); ctx.arc(px, py, 8 + (k % 2) * 3, 0, 6.283); ctx.fill(); } }
    ctx.restore(); }
  ctx.fillStyle = 'rgba(242,242,238,.6)'; for (let k = 0; k < 14; k++) { const u = ((t * 0.05 + k / 14) % 1), px = X - 20 + u * (Wd + 40), py = rv(u); ctx.fillRect(px - 10, py - 2, 20, 4); if (geul > 0.5 && hoog > 0.3 && u > 0.2 && u < 0.8) ctx.fillRect(px - 8, gv(u) - 2, 16, 4); }
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 9; ctx.lineCap = 'butt'; const bxx = X + Wd * 0.38; ctx.beginPath(); ctx.moveTo(bxx, Y + 60); ctx.lineTo(bxx, Y + Hd - 100); ctx.stroke();
  ctx.restore();
  if (lab > 0.01) { naamBij(ctx, 'Nijmegen', null, X + Wd - 30, Y + Hd - 104, lab, 'right'); naamBij(ctx, 'Lent', null, X + Wd - 30, Y + 84, lab, 'right'); naamBij(ctx, 'Waal', null, X + Wd * 0.12, rv(0.12) + 12, lab, 'center', C.text); }
  ctx.restore(); }

// ---------- insectenval (malaiseval, tentje) ----------
function insectenval(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(242,242,238,.18)'; ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.lineTo(-90, -150); ctx.lineTo(110, -170); ctx.lineTo(120, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(0, 0); ctx.stroke(); ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.moveTo(-90, -150); ctx.lineTo(110, -170); ctx.lineTo(110, -155); ctx.lineTo(-90, -135); ctx.closePath(); ctx.fill();
  roundRect(ctx, 104, -200, 26, 44, 6); shape(ctx, rgba(C.teal, 0.4), '#C9CED6', 1.5);
  ctx.strokeStyle = 'rgba(201,206,214,.35)'; ctx.lineWidth = 1; for (let k = -100; k < 120; k += 18) { ctx.beginPath(); ctx.moveTo(k, -150 - (k + 90) * 0.1); ctx.lineTo(k + (k < 0 ? -12 : 4), 0); ctx.stroke(); }
  ctx.restore(); naamBij(ctx, 'insectenval', null, x, yG + 40, a, 'center', C.text); }

// ---------- grafiek: Living Planet Index (gemiddelde, 1970 = 100 %) ----------
const LPI = [[1970, 1], [1975, 0.93], [1980, 0.86], [1985, 0.78], [1990, 0.69], [1995, 0.6], [2000, 0.52], [2005, 0.45], [2010, 0.37], [2015, 0.31], [2020, 0.27]];

// ---------- de aarde als vier sferen ----------
function sferen(ctx, x, y, r, o = {}) { const { a = 1, atmo = 1, hydro = 1, litho = 1, bio = 1, hl = null, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const A = (k, v) => v * (hl && hl !== k ? 0.3 : 1);
  if (atmo > 0.01) { ctx.save(); ctx.globalAlpha *= A('atmo', atmo); ctx.beginPath(); ctx.arc(x, y, r * 1.3, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); for (let k = 0; k < 5; k++) wolkje(ctx, x + Math.cos(k * 1.26 - 1.2 + t * 0.05) * r * 1.2, y + Math.sin(k * 1.26 - 1.2 + t * 0.05) * r * 1.2, 0.32, 1); ctx.restore(); }
  // lithosfeer: gesteente in doorsnede
  ctx.save(); ctx.globalAlpha *= A('litho', litho); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#7A5A3C'; ctx.fill(); ctx.strokeStyle = '#B08A68'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, r * 0.6, 0, 6.283); ctx.fillStyle = '#A8643C'; ctx.fill(); ctx.beginPath(); ctx.arc(x, y, r * 0.28, 0, 6.283); ctx.fillStyle = '#D89A4C'; ctx.fill(); ctx.restore();
  // hydrosfeer: oceaan als schil aan het oppervlak (linkerkant)
  if (hydro > 0.01) { ctx.save(); ctx.globalAlpha *= A('hydro', hydro); ctx.beginPath(); ctx.arc(x, y, r + 26, Math.PI * 0.55, Math.PI * 1.45); ctx.arc(x, y, r - 4, Math.PI * 1.45, Math.PI * 0.55, true); ctx.closePath(); ctx.fillStyle = '#2E6FBF'; ctx.fill(); ctx.strokeStyle = '#6FA4E0'; ctx.lineWidth = 2; ctx.stroke();
    for (let k = 0; k < 3; k++) { const an = Math.PI * (0.8 + k * 0.2); vis(ctx, x + Math.cos(an) * (r + 11), y + Math.sin(an) * (r + 11), 0.32, {}); } ctx.restore(); }
  // biosfeer: bos op het land (rechterkant)
  if (bio > 0.01) { ctx.save(); ctx.globalAlpha *= A('bio', bio); for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31, bx = x + Math.cos(an) * r, by = y + Math.sin(an) * r; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = '#5A4030'; ctx.fillRect(-3, -14, 6, 14); ctx.fillStyle = '#4F8F5A'; ctx.beginPath(); ctx.ellipse(0, -24, 14, 13, 0, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }

// ---------- planetaire grenzen als rad ----------
// waarden: 0..1 = binnen veilig, >1 = overschreden (schematisch, naar Planetary Health Check 2025)
const GRENZEN = [
  ['biosfeer', 2.2], ['landgebruik', 1.5], ['zoet water', 1.45], ['stikstof en fosfor', 2.1], ['nieuwe stoffen', 2.0],
  ['oceaanverzuring', 1.15], ['klimaat', 1.6], ['ozonlaag', 0.55], ['fijnstof', 0.8]];
function grenzenRad(ctx, x, y, R, o = {}) { const { a = 1, grow = 1, toon = 9, hl = [], labels = 1, schaal = 1, hlA = 1 } = o; const HL = Array.isArray(hl) ? hl : (hl >= 0 ? [hl] : []); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 9, gap = 0.035, rin = R * 0.18;
  // veilige zone
  ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.14); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.stroke();
  GRENZEN.forEach(([nm, v], i) => { if (i >= toon) return; const a0 = -Math.PI / 2 + i / n * 6.283 + gap, a1 = -Math.PI / 2 + (i + 1) / n * 6.283 - gap; const vv = typeof grow === 'number' ? Math.min(v, 0.9) + (v - Math.min(v, 0.9)) * clamp((grow - 0.4) / 0.6, 0, 1) : v; const g0 = Math.min(1, grow / 0.4); const rr = vv <= 1 ? rin + (R - rin) * vv * g0 : R + (R - rin) * 0.5 * (vv - 1); const over = v > 1;
    ctx.save(); ctx.globalAlpha *= (HL.length && !HL.includes(i)) ? 1 - 0.65 * hlA : 1;
    ctx.beginPath(); ctx.arc(x, y, rin, a0, a1); ctx.arc(x, y, Math.max(rin + 2, Math.min(rr, R)), a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.groen, 0.55); ctx.fill(); ctx.strokeStyle = C.groen; ctx.lineWidth = 1.5; ctx.stroke();
    if (rr > R) { ctx.beginPath(); ctx.arc(x, y, R, a0, a1); ctx.arc(x, y, rr, a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.6); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.stroke(); }
    if (labels > 0.01) { const am = (a0 + a1) / 2, lr = Math.max(R, rr) + 40, lx = x + Math.cos(am) * lr, ly = y + Math.sin(am) * lr; ctx.save(); ctx.globalAlpha *= labels; text(ctx, nm, lx, ly + 10, fTekst(30, 600), over && grow > 0.95 ? C.koraal : C.text, Math.cos(am) > 0.25 ? 'left' : Math.cos(am) < -0.25 ? 'right' : 'center'); ctx.restore(); }
    ctx.restore(); });
  ctx.beginPath(); ctx.arc(x, y, rin, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); aarde(ctx, x, y, rin * 0.82, 1);
  ctx.restore(); }

// ---------- ozonlaag boven Antarctica (bovenaanzicht) ----------
function ozonKaart(ctx, x, y, r, gat, a = 1, jaar = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#2E6FBF'; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283, rr = r * (0.46 + 0.07 * Math.sin(an * 3) + 0.05 * Math.cos(an * 5)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.fillStyle = '#E8EDF2'; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.groen, 0.22); ctx.fill();
  if (gat > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 0.64 * gat, r * 0.56 * gat, 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.45); ctx.fill(); ctx.strokeStyle = C.paars; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.setLineDash([]);
    if (gat > 0.35) naamBij(ctx, 'ozongat', null, x, y - r * 0.56 * gat - 14, Math.min(1, (gat - 0.35) * 4), 'center', C.paars); }
  if (jaar) metaText(ctx, jaar, x, y + r + 44, C.grain, 'center', 30);
  ctx.restore(); }
function spuitbus(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -50, 52, 110, 8); shape(ctx, '#9AA3B2', '#C9CED6', 1.5); ctx.beginPath(); ctx.moveTo(-26, -50); ctx.quadraticCurveTo(0, -78, 26, -50); ctx.closePath(); shape(ctx, '#C9CED6', '#E8EDF2', 1.2);
  roundRect(ctx, -9, -86, 18, 14, 3); shape(ctx, '#5A6478', '#9AA3B2', 1); ctx.fillStyle = '#5A6478'; ctx.fillRect(9, -82, 10, 5);
  ctx.fillStyle = 'rgba(232,237,242,.5)'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(30 + k * 9, -80 - (k % 3 - 1) * 8 * (k / 7 + 0.3), 3 + k * 1.1, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#E07A5F'; ctx.fillRect(-26, -10, 52, 26); ctx.restore(); }
function koelkast(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -150, 100, 300, 12); shape(ctx, '#E8EDF2', '#9AA3B2', 2); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-50, -50); ctx.lineTo(50, -50); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(34, -120); ctx.lineTo(34, -80); ctx.moveTo(34, -20); ctx.lineTo(34, 40); ctx.stroke(); ctx.restore(); }

// ---------- regenwoud (Macro) ----------
function regenwoud(ctx, X, yG, Wd, o = {}) { const { a = 1, kap = 0, droog = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14;
  for (let i = 0; i < n; i++) { const bx = X + (i + 0.5) * Wd / n + (hash(i * 7) - 0.5) * 20, h = 170 + hash(i * 3) * 90; const weg = kap > (i / n) * 1.0 && i % 3 !== 0;
    if (weg) { ctx.fillStyle = '#6A4E36'; roundRect(ctx, bx - 10, yG - 24, 20, 24, 3); ctx.fill(); continue; }
    ctx.fillStyle = '#5A4030'; ctx.fillRect(bx - 7, yG - h * 0.55, 14, h * 0.55);
    const kleur = droog > 0.01 ? `rgb(${Math.round(lerp(79, 160, droog))},${Math.round(lerp(143, 130, droog))},${Math.round(lerp(90, 70, droog))})` : '#4F8F5A';
    ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(bx, yG - h * 0.62, 46, 34, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(bx - 26, yG - h * 0.5, 30, 22, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(bx + 28, yG - h * 0.52, 30, 22, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = '#6A5A40'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X, yG); ctx.lineTo(X + Wd, yG); ctx.stroke(); ctx.restore(); }
function co2Pijl(ctx, x, y1, y2, a = 1, op = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; pijl(ctx, x, y1, x, y2, op ? C.groen : C.koraal, 1, 6, 20); regel(ctx, 'CO₂', x + 18, (y1 + y2) / 2 + 10, 1, op ? C.groen : C.koraal, 32, 'left', 700); ctx.restore(); }
function lpiGrafiek(ctx, X, Y, Wd, Hd, u = 1, o = {}) { const { a = 1, punt = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  paneel(ctx, X, Y, Wd, Hd, '', 1); const gx = X + 140, gy = Y + 50, gw = Wd - 360, gh = Hd - 150;
  assen(ctx, gx, gy, gw, gh, '', ''); ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1; for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(gx, gy + gh - gh * k / 4); ctx.lineTo(gx + gw, gy + gh - gh * k / 4); ctx.stroke(); }
  [0, 50, 100].forEach(v => metaText(ctx, v + '%', gx - 16, gy + gh - gh * v / 100 + 10, C.text, 'right', 32));
  [1970, 1995, 2020].forEach(j => metaText(ctx, String(j), gx + gw * (j - 1970) / 50, gy + gh + 44, C.text, 'center', 32));
  const P = LPI.map(([j, v]) => [gx + gw * (j - 1970) / 50, gy + gh - gh * v]); const n = Math.max(1, Math.round(u * (P.length - 1)));
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= n; i++) i ? ctx.lineTo(P[i][0], P[i][1]) : ctx.moveTo(P[i][0], P[i][1]); ctx.stroke();
  if (punt > 0.01) { const [px, py] = P[P.length - 1]; ctx.save(); ctx.globalAlpha *= punt; circ(ctx, px, py, 10, C.koraal); regel(ctx, '−73 %', px + 24, py + 14, 1, C.koraal, 48, 'left', 700); metaText(ctx, 'gemiddeld', px + 26, py + 52, C.koraal, 'left', 28); ctx.restore(); }
  ctx.restore(); }

function maisPlant(ctx, x, yG, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#7FA85A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, yG); ctx.lineTo(x, yG - h); ctx.stroke();
  ctx.fillStyle = '#7FA85A'; for (let k = 0; k < 4; k++) { const yy = yG - h * (0.25 + k * 0.17), d = k % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + d * 70, yy - 30, x + d * 90, yy + 20); ctx.quadraticCurveTo(x + d * 50, yy - 10, x, yy + 8); ctx.closePath(); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x + 16, yG - h * 0.5, 12, 34, 0.3, 0, 6.283); ctx.fillStyle = '#E8C04A'; ctx.fill(); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#D9B866'; ctx.lineWidth = 2; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(x, yG - h); ctx.lineTo(x + k * 12, yG - h - 40); ctx.stroke(); } ctx.restore(); }
function rijstPluim(ctx, x, yG, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#9AB86A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, yG); ctx.quadraticCurveTo(x + 6, yG - h * 0.6, x + 40, yG - h * 0.85); ctx.stroke();
  ctx.fillStyle = '#D9C27A'; for (let k = 0; k < 12; k++) { const u = k / 12, px = x + 40 + u * 50, py = yG - h * 0.85 + u * u * 120; ctx.beginPath(); ctx.ellipse(px, py, 5, 9, 0.5, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = '#9AB86A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yG - h * 0.3); ctx.quadraticCurveTo(x - 50, yG - h * 0.6, x - 60, yG - h * 0.75); ctx.stroke(); ctx.restore(); }
function heideStruikje(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s); ctx.fillStyle = '#4A5A3A'; ctx.beginPath(); ctx.ellipse(0, -14, 34, 16, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#B07AC8'; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.arc(-26 + (k % 7) * 9, -18 - Math.floor(k / 7) * 9 - Math.abs(k % 7 - 3) * -1, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
function gifvat(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -60, 80, 120, 10); shape(ctx, '#C9A35C', '#E0C890', 2); ctx.strokeStyle = '#8C6A4A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -20); ctx.lineTo(40, -20); ctx.moveTo(-40, 24); ctx.lineTo(40, 24); ctx.stroke();
  ctx.fillStyle = '#2A2420'; ctx.beginPath(); ctx.arc(0, 2, 12, 0, 6.283); ctx.fill(); ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.arc(-4, 0, 3, 0, 6.283); ctx.arc(4, 0, 3, 0, 6.283); ctx.fill(); ctx.fillStyle = '#7FC48F'; ctx.beginPath(); ctx.ellipse(10, 70, 40, 8, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
function vlam(ctx, x, yG, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.45, f = Math.sin(t * 9 + x) * 0.08;
  ctx.fillStyle = 'rgba(154,163,178,.35)'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(x + Math.sin(t + k) * 14, yG - h - 30 - k * 30, 16 + k * 6, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = '#E07A5F'; ctx.beginPath(); ctx.moveTo(x - w, yG); ctx.bezierCurveTo(x - w * 1.1, yG - h * 0.5, x - w * 0.2, yG - h * 0.6, x + w * f, yG - h); ctx.bezierCurveTo(x + w * 0.4, yG - h * 0.6, x + w * 1.1, yG - h * 0.5, x + w, yG); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.moveTo(x - w * 0.5, yG); ctx.bezierCurveTo(x - w * 0.6, yG - h * 0.3, x, yG - h * 0.4, x, yG - h * 0.6); ctx.bezierCurveTo(x + w * 0.2, yG - h * 0.4, x + w * 0.6, yG - h * 0.3, x + w * 0.5, yG); ctx.closePath(); ctx.fill(); ctx.restore(); }
// Binnen de grenzen — scènes per alinea (v1.0, 21 okt 2026)
const LOTTE = 'lotte';
function antwoord(ctx, s, a = 1) { regel(ctx, s, 120, 150, a, C.groen, 40, 'left', 700); }
function wisselTekst(ctx, items, q, x, y, col = C.goud, px = 32) { // één tekstbalk tegelijk: [woord, n, tekst]
  for (let i = 0; i < items.length; i++) { const [w, n, s] = items[i]; const aan = q.on(w, n, 0.4); const uit = i + 1 < items.length ? q.on(items[i + 1][0], items[i + 1][1], 0.3) : 0; tag(ctx, s, x, y, col, aan * (1 - uit), 'center', px); } }
function kolom(ctx, x, y, w, h, titel, sub, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.5), col, 2); regel(ctx, titel, x + w / 2, y + 56, 1, col, 40, 'center', 700); metaText(ctx, sub, x + w / 2, y + 96, C.grain, 'center', 26); ctx.restore(); }
function bijenkast(ctx, x, yG, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yG); ctx.scale(s, s);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -60, -40 - i * 44, 120, 42, 4); shape(ctx, i % 2 ? '#C9A35C' : '#B08A5C', '#E0C890', 1.5); }
  ctx.fillStyle = '#8C6A4A'; ctx.beginPath(); ctx.moveTo(-72, -172); ctx.lineTo(72, -172); ctx.lineTo(60, -150); ctx.lineTo(-60, -150); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#2A2420'; ctx.fillRect(-20, -14, 40, 8); ctx.restore(); }
function thermo(ctx, x, y, h, frac, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 12, y - h, 24, h, 12); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.fillStyle = col; roundRect(ctx, x - 6, y - h * frac, 12, h * frac - 6, 6); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, 20, 0, 6.283); ctx.fill(); ctx.restore(); }
function mensIcoon(ctx, x, y, s = 1, col = '#9AA3B2', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 22 * s, 9 * s, 0, 6.283); ctx.fill(); roundRect(ctx, x - 10 * s, y - 11 * s, 20 * s, 26 * s, 8 * s); ctx.fill(); ctx.restore(); }
function pil(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s); roundRect(ctx, -34, -14, 68, 28, 14); shape(ctx, '#E8EDF2', '#9AA3B2', 1.5); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(20, -14); ctx.arcTo(34, -14, 34, 0, 14); ctx.arcTo(34, 14, 20, 14, 14); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
function druppel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -34); ctx.bezierCurveTo(16, -10, 24, 4, 24, 14); ctx.arc(0, 14, 24, 0, Math.PI); ctx.bezierCurveTo(-24, 4, -16, -10, 0, -34); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); ctx.restore(); }
function boomstam(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 3; i++) { roundRect(ctx, -60 + i * 8, -30 + i * 22, 120, 22, 11); shape(ctx, '#8C5A3A', '#B08A68', 1.5); ctx.beginPath(); ctx.ellipse(60 + i * 8, -19 + i * 22, 8, 11, 0, 0, 6.283); shape(ctx, '#C9A35C', '#8C5A3A', 1); } ctx.restore(); }
function pad_(ctx, x1, x2, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 10; ctx.setLineDash([2, 14]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y); ctx.quadraticCurveTo((x1 + x2) / 2, y - 30, x2, y); ctx.stroke(); ctx.restore(); }
function lus(ctx, cx, cy, r, labels, act, a = 1, t = 0) { // terugkoppelingslus: labels rond een cirkel, pijlen ertussen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = labels.length;
  for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / n * 6.283, an2 = -Math.PI / 2 + (i + 1) / n * 6.283; const u = clamp(act * n - i, 0, 1);
    if (u > 0.01) { const x1 = cx + Math.cos(an + 0.35) * r, y1 = cy + Math.sin(an + 0.35) * r, x2 = cx + Math.cos(an2 - 0.35) * r, y2 = cy + Math.sin(an2 - 0.35) * r; ctx.save(); ctx.globalAlpha *= u; boogPijl(ctx, x1, y1, x2, y2, 0.25, C.koraal, 1, 5); ctx.restore(); }
    const ua = clamp(act * n - i + 1, 0, 1); const lx = cx + Math.cos(an) * r, ly = cy + Math.sin(an) * r; tag(ctx, labels[i], lx, ly + 14, i === 0 ? C.koraal : C.goud, ua, 'center', 30); }
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { bloesemTak(ctx, 1500, 560, 1.15, { bloei: 1 }); hommel(ctx, 1380 + Math.sin(t * 0.9) * 30, 420 + Math.cos(t * 1.3) * 18, 1.4, { t }); wildeBij(ctx, 1700 + Math.cos(t * 0.7) * 24, 360, 1.3, { t, ang: 0.3 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const vd = q.on('verdwijnen', 1, 1.2);
    ontbijt(ctx, 760, 700, 1, {}); persoon(ctx, LOTTE, 300, 860, 470, { t, uit: q.on('slecht', 1) > 0.5 ? 'verbaasd' : 'blij', pose: q.on('vraagt', 1) > 0.5 ? 'denk' : 'staan', kijk: 1 });
    naamBij(ctx, 'appel', null, 1020, 760, q.on('appel', 1) * (1 - q.on('bloesem', 1)), 'center', C.koraal);
    const zm = q.on('bloesem', 1, 0.8); zoomCircle(ctx, 1460, 380, 300, 1020, 660, 'appelbloesem · vergroot', zm, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1160, 80, 600, 600); bloesemTak(ctx, 1480, 420, 1.05, { bloei: 1 });
      hommel(ctx, 1500 + Math.sin(t) * 40, 300 + Math.cos(t * 1.3) * 20, 1.5, { t, a: 1 - vd }); wildeBij(ctx, 1380 + Math.cos(t * 0.8) * 30, 470, 1.4, { t, a: 1 - vd, ang: 0.4 }); bij(ctx, 1640, 380 + Math.sin(t * 1.1) * 20, 1.3, -0.3, { t, a: 1 - vd }); });
    tag(ctx, 'het gaat slecht met de bijen', 860, 200, C.koraal, q.on('slecht', 1) * (1 - vd), 'center', 30);
    vraagteken(ctx, 1460, 400, vd * q.on('denk', 1, 0.4) + 0 * vd, 160); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: graan blijft', 1 - q.on('Maar', 1));
    const [A, B] = fasen(q, [null, ['Zonder', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const g = q.on('Tarwe', 1); paneel(ctx, 110, 220, 640, 600, 'zelf of door de wind', g);
      for (let i = 0; i < 3; i++) graanaar(ctx, 180 + i * 50, 780, 420 + (i % 3) * 30, g, t, 1); rijstPluim(ctx, 400, 780, 380, g, t); maisPlant(ctx, 620, 780, 380, g);
      { const wa = q.on('wind', 1); if (wa > 0.01) { pijl(ctx, 160, 330, 420, 330, C.teal, wa, 5, 18); metaText(ctx, 'wind', 290, 310, C.teal, 'center', 28 * 1); } }
      [['tarwe', 230], ['rijst', 430], ['maïs', 620]].forEach(([w, x]) => chip(ctx, w, x, 840 - 40, C.oker, q.on(w, 1), 26));
      const bb = q.on('baat', 1); paneel(ctx, 820, 220, 990, 600, 'baat bij bestuivers', bb, C.groen);
      const vr = [['appels', (x, y) => appel(ctx, x, y, 1.6)], ['aardbeien', (x, y) => aardbei(ctx, x, y, 1.8)], ['amandelen', (x, y) => amandel(ctx, x, y, 1.8)], ['koffie', (x, y) => koffie(ctx, x, y, 1.7)]];
      vr.forEach(([w, f], i) => { const u = Math.max(0.3 * bb, q.on(w, 1, 0.5)); if (u < 0.01) return; ctx.save(); ctx.globalAlpha *= u; f(960 + i * 230, 470); regel(ctx, w, 960 + i * 230, 620, 1, C.text, 32, 'center', 600); ctx.restore(); });
      if (bb > 0.01) { hommel(ctx, 1000 + Math.sin(t * 0.8) * 300 + 300, 340 + Math.cos(t * 1.4) * 30, 1, { t, a: bb }); }
      regel(ctx, 'soms een beetje, soms heel veel', 1315, 730, q.on('Soms', 1), C.text2, 30, 'center', 600); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; regel(ctx, 'wereldoogst in kilo’s', 960, 230, 1, C.text2, 34, 'center', 600);
      const k = q.on('kleiner', 1, 1.2); balk(ctx, 460, 300, 1000, 1, C.oker, 'met bestuivers', 1, 60); balk(ctx, 460, 440, 1000, 1 - 0.065 * k, C.oker, 'zonder bestuivers', 1, 60);
      tag(ctx, '5–8 % minder', 1560, 500, C.koraal, k, 'center', 30);
      const vt = q.on('vitamines', 1); if (vt > 0.01) { ctx.save(); ctx.globalAlpha *= vt; appel(ctx, 700, 700, 1.4); aardbei(ctx, 860, 700, 1.6); tomaat(ctx, 1020, 700, 1.5); amandel(ctx, 1180, 700, 1.6); tag(ctx, 'juist hier zitten veel vitamines', 960, 820, C.groen, 1, 'center', 30); ctx.restore(); } ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const [A, B, Cc] = fasen(q, [null, ['hommel', 2], ['Andere', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; bijenkast(ctx, 300, 760, 1.4, q.on('honingbijen', 1)); for (let k = 0; k < 4; k++) bij(ctx, 300 + Math.sin(t * 1.2 + k * 1.7) * 120, 440 + Math.cos(t + k * 2) * 60, 1.1, 0, { t, a: q.on('honingbijen', 1) });
      naamBij(ctx, 'honingbij', 'gehouden door imkers', 300, 830, q.on('imkers', 1), 'center', C.oker);
      const wb = q.on('wilde', 1); paneel(ctx, 620, 200, 1220, 600, 'ruim 350 soorten wilde bijen in Nederland', wb, C.groen);
      if (wb > 0.01) { ctx.save(); ctx.globalAlpha *= wb; for (let i = 0; i < 9; i++) { const x = 720 + (i % 5) * 150 + (Math.floor(i / 5) % 2) * 70, y = 340 + Math.floor(i / 5) * 150; i % 3 === 0 ? hommel(ctx, x, y, 1.3, { t: t + i }) : wildeBij(ctx, x, y, 1.6 + (i % 2) * 0.2, { t: t + i, ang: (i % 3 - 1) * 0.3 }); } ctx.restore(); }
      naamBij(ctx, 'ook hommels', null, 720, 660, q.on('hommels', 1), 'left', C.goud);
      const zv = q.on('zweefvliegen', 1); zweefvlieg(ctx, 1500, 360, 1.3, { t, a: zv }); vlinder(ctx, 1640, 520, 1.3, { t, a: q.on('vlinders', 1) }); kever(ctx, 1500, 650, 1.2, { a: q.on('kevers', 1) });
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; for (let k = 0; k < 3; k++) wolkje(ctx, 600 + k * 360, 220 + (k % 2) * 30, 1.4, 1); thermo(ctx, 1700, 560, 260, 0.25, C.teal, 1); metaText(ctx, 'koud en bewolkt', 1700, 640, C.teal, 'center', 28);
      hommel(ctx, 820 + Math.sin(t * 0.7) * 160, 480 + Math.cos(t) * 40, 1.6, { t }); naamBij(ctx, 'hommel: vliegt', null, 820, 640, 1, 'center', C.goud);
      bijenkast(ctx, 1300, 760, 1.2, 1); naamBij(ctx, 'honingbij: blijft thuis', null, 1300, 830, q.on('thuis', 1), 'center', C.text2); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; [['#E07A5F', 360], ['#8C7BBF', 760], ['#E0B64A', 1160], ['#5BA4C9', 1560]].forEach(([c, x], i) => { bloem(ctx, x, 520, 60, c, 1); });
      bij(ctx, 360, 420, 1.2, 0, { t }); wildeBij(ctx, 760, 420, 1.3, { t }); wildeBij(ctx, 1160, 420, 1.3, { t: t + 1, ang: 0.3 }); hommel(ctx, 1560, 420, 1.1, { t });
      kruis(ctx, 760, 300, 22, 1, C.text2); kruis(ctx, 1160, 300, 22, 1, C.text2); metaText(ctx, 'honingbij slaat over', 960, 260, C.text2, 'center', 26); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const gx = 360, gy = 250, gh = 460;
    const st = q.on('Onderzoekers', 1); paneel(ctx, 120, 150, 1100, 720, 'vruchtzetting in boomgaarden (schematisch)', st);
    if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; assen(ctx, gx, gy, 780, gh, '', '');
      const bars = [['weinig wilde', 0.42, 1], ['veel wilde', 0.78, q.on('Dan', 1, 1.2)]]; bars.forEach(([n, v, u], i) => { const x = gx + 140 + i * 360, hh = gh * v * ease(u); roundRect(ctx, x, gy + gh - hh, 180, hh, 10); shape(ctx, rgba(C.groen, 0.45), C.groen, 2); metaText(ctx, n, x + 90, gy + gh + 40, C.text2, 'center', 26); const wk = i ? 6 : 2; for (let k = 0; k < wk; k++) { const xx = x + 30 + (k % 3) * 60, yy = gy + gh - hh - 40 - Math.floor(k / 3) * 54; k % 3 === 1 ? hommel(ctx, xx, yy, 0.75, { t: t + k, a: u }) : wildeBij(ctx, xx, yy, 1.1, { t: t + k, a: u, ang: (k % 2) * 0.3 }); } for (let k = 0; k < 2; k++) bij(ctx, x + 60 + k * 60, gy + gh + 80, 0.9, 0, { t: t + k }); });
      metaText(ctx, 'onder elke staaf evenveel honingbijen', gx + 390, gy + gh + 140, C.oker, 'center', 26); ctx.restore(); }
    const tw = q.on('twee', 1); paneel(ctx, 1280, 170, 520, 300, '', tw, C.goud); if (tw > 0.01) { regel(ctx, '2×', 1540, 300, tw, C.goud, 96, 'center', 800); regel(ctx, 'groter effect dan honingbijen', 1540, 380, tw, C.text, 28, 'center', 600); }
    const be = q.on('betrouwbaardere', 1); if (be > 0.01) { haak(ctx, 1290, 1790, 520, 'meer soorten = betrouwbaardere oogst', C.groen, be); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'biodiversiteit', 960, 150, C.goud, q.on('biodiversiteit', 1), 'center', 40); { const v = 1 - q.on('genen', 1); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; hommel(ctx, 700, 450, 1.4, { t }); wildeBij(ctx, 900, 520, 1.5, { t }); vlinder(ctx, 1100, 430, 1.5, { t }); bloem(ctx, 1260, 560, 50, C.koraal, 1); appel(ctx, 820, 640, 1.4); den(ctx, 1420, 700, 220); bloem(ctx, 600, 620, 40, C.paars, 1); ctx.restore(); } }
    const pw = 520, x0 = 120, y0 = 230; const cols = [['genen', 'binnen een soort', 'genen'], ['soorten', 'aantal verschillende', 'aantal'], ['ecosystemen', 'bos, heide, rivier', 'ecosystemen']];
    cols.forEach(([titel, sub, w], i) => { const a = q.on(w, 1); kolom(ctx, x0 + i * (pw + 60), y0, pw, 560, titel, sub, [C.paars, C.groen, C.teal][i], a); });
    const a1 = q.on('genen', 1); if (a1 > 0.01) { ['#D8573F', '#E8C04A', '#7FC48F', '#B8322E', '#E07A5F'].forEach((c, k) => appel(ctx, x0 + 90 + (k % 3) * 170, 470 + Math.floor(k / 3) * 160, 1.3, a1 * q.on('appelrassen', 1, 0.4 + k * 0.2), c)); }
    const a2 = q.on('soorten', 1); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; hommel(ctx, x0 + pw + 60 + 130, 460, 1, { t }); wildeBij(ctx, x0 + pw + 60 + 390, 460, 1.2, { t }); vlinder(ctx, x0 + pw + 60 + 130, 650, 1.2, { t }); bloem(ctx, x0 + pw + 60 + 390, 650, 46, C.koraal, 1); ctx.restore(); }
    const a3 = q.on('ecosystemen', 1); if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; const X = x0 + 2 * (pw + 60); den(ctx, X + 110, 520, 160); boom(ctx, X + 200, 520, 0.7, 1); metaText(ctx, 'bos', X + 150, 560, C.grain, 'center', 26); for (let k = 0; k < 3; k++) heideStruikje(ctx, X + 320 + k * 70, 520, 1.5, 1); metaText(ctx, 'heide', X + 390, 560, C.grain, 'center', 26);
      ctx.fillStyle = '#2E6FBF'; ctx.beginPath(); ctx.moveTo(X + 40, 680); ctx.quadraticCurveTo(X + 260, 620, X + 480, 690); ctx.lineTo(X + 480, 730); ctx.quadraticCurveTo(X + 260, 660, X + 40, 720); ctx.closePath(); ctx.fill(); metaText(ctx, 'rivier', X + 260, 770, C.grain, 'center', 26); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'ecosysteemdienst: wat de mens uit de natuur haalt', 960, 140, C.goud, q.on('ecosysteemdienst', 1), 'center', 32);
    const pw = 520, x0 = 120, y0 = 210; const L = q.on('levert', 1), R = q.on('regelen', 1), B = q.on('beleving', 1);
    const D3 = 0.25 * q.on('drie', 1); kolom(ctx, x0, y0, pw, 600, 'leveren', 'productie', C.oker, Math.max(D3, L)); kolom(ctx, x0 + pw + 60, y0, pw, 600, 'regelen', 'regulatie', C.teal, Math.max(D3, R)); kolom(ctx, x0 + 2 * (pw + 60), y0, pw, 600, 'beleven', 'cultureel', C.groen, Math.max(D3, B));
    if (L > 0.01) { appel(ctx, x0 + 130, 440, 1.6, q.on('voedsel', 1)); boomstam(ctx, x0 + 370, 460, 1.1, q.on('hout', 1)); pil(ctx, x0 + 260, 640, 1.4, q.on('medicijnen', 1)); }
    if (R > 0.01) { const X = x0 + pw + 60; bloem(ctx, X + 140, 460, 44, C.koraal, q.on('bestuiven', 1)); bij(ctx, X + 140, 390, 1, 0, { t, a: q.on('bestuiven', 1) }); druppel(ctx, X + 380, 450, 1.6, q.on('zuivert', 1)); plantje(ctx, X + 260, 700, 1.6, q.on('koolstof', 1)); regel(ctx, 'CO₂', X + 340, 640, q.on('koolstof', 1), C.groen, 32, 'left', 700); pijl(ctx, X + 380, 600, X + 300, 660, C.groen, q.on('koolstof', 1), 4, 14); }
    if (B > 0.01) { const X = x0 + 2 * (pw + 60); pad_(ctx, X + 40, X + 480, 760, B); boom(ctx, X + 400, 600, 0.9, B); persoon(ctx, LOTTE, X + 200, 770, 360, { t, uit: 'blij', a: B, kijk: 1 }); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); const geul = q.on('nevengeul', 1, 1), hw = q.on('hoogwater', 1), rest = q.on('rest', 1);
    const hoog = Math.max(q.on('1995', 1, 0.8) * (1 - q.on('Daarom', 1)), hw * (1 - rest));
    waalKaart(ctx, 100, 170, 1180, 660, { geul, hoog, t, natuur: q.on('eiland', 1), lab: q.on('Waalbrug', 1) });
    persoon(ctx, LOTTE, 1500, 860, 420, { t, uit: q.on('denk', 1) > 0.5 ? 'denk' : 'blij', pose: q.on('denk', 1) > 0.5 ? 'denk' : 'staan', kijk: -1, a: 1 - q.on('1995', 1, 0.4) + q.on('rest', 1) });
    const ev = q.on('kwart', 1) * (1 - q.on('Daarom', 1)); paneel(ctx, 1340, 220, 500, 360, '1995 · hoogwater', ev, C.koraal);
    if (ev > 0.01) { for (let i = 0; i < 25; i++) mensIcoon(ctx, 1400 + (i % 5) * 90, 340 + Math.floor(i / 5) * 46, 0.8, '#9AA3B2', ev * ramp(q.localT, q.at('kwart', 1) + i * 0.03, 0.3)); ctx.save(); ctx.globalAlpha *= ev; metaText(ctx, '± 250.000 mensen', 1590, 620, C.koraal, 'center', 30); metaText(ctx, 'moesten weg', 1590, 656, C.koraal, 'center', 30); ctx.restore(); }
    tag(ctx, 'nevengeul · ± 3 km', 690, 140, C.teal, geul * (1 - hw), 'center', 30);
    const cm = q.on('dertig', 1); paneel(ctx, 1340, 220, 500, 300, '', cm * (1 - rest), C.teal); if (cm * (1 - rest) > 0.01) { ctx.save(); ctx.globalAlpha *= cm * (1 - rest); regel(ctx, '− 30 cm', 1590, 360, 1, C.teal, 80, 'center', 800); metaText(ctx, 'bijna · bij hoogwater', 1590, 440, C.text, 'center', 30); ctx.restore(); }
    tag(ctx, 'groen eiland: wandelen en zwemmen', 690, 140, C.groen, rest * (1 - q.on('Welke', 1)), 'center', 30);
    vraagteken(ctx, 690, 160, q.on('denk', 1), 110); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: regelen', 1);
    waalKaart(ctx, 120, 220, 1000, 560, { geul: 1, hoog: q.on('vangt', 1) * (1 - q.on('wandelen', 1)), t, natuur: 1 });
    const R = q.on('regelen', 1), B = q.on('beleving', 1);
    kolom(ctx, 1200, 220, 600, 250, 'regelen', 'water afvoeren', C.teal, R); kolom(ctx, 1200, 520, 600, 250, 'beleven', 'wandelen, zwemmen', C.groen, B);
    vink_(ctx, 1740, 330, 26, R); vink_(ctx, 1740, 630, 26, B); },

  // ---------- H3 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const g = q.on('volgen', 1); const u = clamp((q.localT - q.at('1970', 1)) / 4, 0, 1);
    lpiGrafiek(ctx, 160, 170, 1100, 640, Math.max(0.02, u), { a: Math.max(0.5, g), punt: q.on('73', 1) });
    paneel(ctx, 1320, 170, 480, 300, '', g, C.line); if (g > 0.01) { regel(ctx, '± 35.000', 1560, 290, g, C.text, 64, 'center', 800); metaText(ctx, 'populaties gewervelden', 1560, 350, C.grain, 'center', 26); metaText(ctx, 'LPI · 1970–2020', 1560, 400, C.text2, 'center', 26); }
    vraagteken(ctx, 1560, 700, q.on('denk', 1), 140); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: een gemiddelde', 1 - q.on('miljoen', 1));
    const sp = Math.max(0.6, q.on('Sommige', 1)); paneel(ctx, 140, 220, 1080, 600, 'enkele populaties (schematisch)', sp);
    if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; for (let i = 0; i < 12; i++) { const x = 200 + (i % 4) * 250, y = 330 + Math.floor(i / 4) * 160; const d = [0.6, -0.9, -0.5, 0.3, -0.95, -0.7, -0.2, 0.5, -0.8, -0.6, 0.1, -0.85][i]; ctx.strokeStyle = d > 0 ? C.groen : C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const yy = y + 40 - (k / 10) * d * 70 + Math.sin(k * 1.7 + i) * 8; k ? ctx.lineTo(x + k * 18, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } ctx.restore(); }
    const mj = q.on('miljoen', 1); paneel(ctx, 1280, 360, 540, 330, '', mj, C.koraal); if (mj > 0.01) { regel(ctx, '± 1 miljoen', 1550, 500, mj, C.koraal, 64, 'center', 800); metaText(ctx, 'soorten bedreigd · schatting', 1550, 560, C.grain, 'center', 26); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const rl = q.on('Rode', 1);
    paneel(ctx, 120, 200, 760, 620, 'wilde bijen in Nederland', q.on('wilde', 1));
    if (q.on('wilde', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('wilde', 1); for (let i = 0; i < 60; i++) { const rood = i < 33 && rl > 0.01; const x = 200 + (i % 10) * 64, y = 330 + Math.floor(i / 10) * 70; wildeBij(ctx, x, y, 0.7, { a: rood ? 1 - 0.55 * rl : 1 }); if (rood) { ctx.save(); ctx.globalAlpha *= rl; circ(ctx, x, y + 6, 26, null, C.koraal, 2.5); ctx.restore(); } } ctx.restore(); }
    naamBij(ctx, 'ruim de helft op de Rode Lijst', null, 500, 790, rl, 'center', C.koraal);
    const du = q.on('Duitsland', 1); paneel(ctx, 940, 200, 880, 620, 'vliegende insecten · 63 natuurgebieden', du);
    if (du > 0.01) { ctx.save(); ctx.globalAlpha *= du; insectenval(ctx, 1110, 760, 1.1, 1); for (let k = 0; k < 6; k++) zweefvlieg(ctx, 1080 + Math.sin(t + k) * 120, 360 + Math.cos(t * 1.3 + k) * 40 + (k % 3) * 30, 0.7, { t: t + k, a: 1 - q.on('gewicht', 1) * (k < 4 ? 1 : 0) });
      const g = q.on('gewicht', 1, 1.4); balk(ctx, 1380, 380, 400, 1, C.oker, '1989', 1, 50); balk(ctx, 1380, 500, 400, 1 - 0.76 * g, C.koraal, '2016', 1, 50); tag(ctx, '− 76 %', 1580, 660, C.koraal, g, 'center', 34); ctx.restore(); }
    tag(ctx, 'zelfs in natuurgebieden', 1380, 160, C.goud, q.on('relatief', 1), 'center', 28); },

  s16(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Wat is de grootste oorzaak?', 960, 300, q.on('Wat', 1), C.text, 64, 'center', 700);
    { const o = q.on('oorzaak', 1); thermo(ctx, 560, 660, 200, 0.8, C.koraal, o); gifvat(ctx, 960, 620, 1, o); huisje(ctx, 1320, 690, 1, o); ctx.save(); ctx.globalAlpha *= o; ctx.fillStyle = '#5A6478'; ctx.fillRect(1250, 690, 180, 10); ctx.restore(); boomstam(ctx, 1440, 680, 0.5, o); ['a', 'b', 'c'].forEach((l, i) => regel(ctx, l, [560, 960, 1340][i], 790, o, C.goud, 40, 'center', 700)); } vraagteken(ctx, 960, 820, q.on('denk', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: veranderd land- en zeegebruik', 1 - q.on('twee', 1));
    const [A, B] = fasen(q, [null, ['twee', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const u = clamp((q.localT - q.at('Bos', 1)) / 3.5, 0, 1); const Wd = 1640, X = 140, Y = 560;
      for (let i = 0; i < 16; i++) { const x = X + i * Wd / 16 + 50; const om = u > i / 16; if (!om) { i % 2 ? den(ctx, x, Y, 170) : boom(ctx, x, Y, 0.6, 1); } else if (i % 4 === 0) huisje(ctx, x, Y, 0.9, 1); else if (i % 4 === 1) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 50, Y - 10, 100, 10); } else { ctx.fillStyle = '#B08A3C'; for (let k = 0; k < 3; k++) ctx.fillRect(x - 40, Y - 30 + k * 10, 80, 4); } }
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + Wd, Y); ctx.stroke();
      const dk = q.on('kwart', 1); balk(ctx, 460, 680, 1000, 0.75 * ease(dk / 1), C.koraal, '', dk, 50); regel(ctx, '± 3/4 van het land is flink veranderd', 960, 660, dk, C.text, 34, 'center', 600); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const R = [['1', 'land- en zeegebruik', null, 1, 1], ['2', 'oogsten: jacht, visserij', 'twee', 1, 0.8], ['3', 'klimaatverandering', 'drie', 2, 0.6], ['4', 'vervuiling', 'vier', 1, 0.45], ['5', 'invasieve exoten', 'vijf', 1, 0.35]];
      R.forEach(([n, s, w, k, v], i) => { const a = w ? q.on(w, k) : 1; if (a < 0.01) return; const y = 220 + i * 120; regel(ctx, n, 230, y + 46, a, C.goud, 48, 'center', 800); roundRect(ctx, 300, y, 900 * v * ease(a), 64, 12); shape(ctx, rgba(i === 0 ? C.koraal : C.oker, 0.5), i === 0 ? C.koraal : C.oker, 2); regel(ctx, s, 330, y + 44, a, C.text, 32, 'left', 600); });
      tag(ctx, 'in zee: overbevissing op 1', 1520, 300, C.teal, q.on('overbevissing', 1), 'center', 28); vis(ctx, 1520, 400, 1.6, { a: q.on('overbevissing', 1) });
      tag(ctx, 'wordt steeds belangrijker', 1520, 520, C.koraal, q.on('belangrijker', 1), 'center', 28); pijl(ctx, 1260, 520, 1340, 470, C.koraal, q.on('belangrijker', 1), 4, 16);
      metaText(ctx, 'volgorde naar IPBES 2019 · balken niet op schaal', 960, 860, C.text2, 'center', 26); ctx.restore(); } },

  // ---------- H4 ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['regenwoud', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const hl = q.on('biosfeer', 1) > 0.5 ? 'bio' : q.on('lithosfeer', 1) > 0.5 ? 'litho' : q.on('hydrosfeer', 1) > 0.5 ? 'hydro' : q.on('atmosfeer', 1) > 0.5 ? 'atmo' : null;
      sferen(ctx, 760, 500, 270, { hl: q.on('verbonden', 1) > 0.5 ? null : hl, t });
      [['atmosfeer', 'lucht', C.teal, 1180, 260], ['hydrosfeer', 'water', '#6FA4E0', 1180, 400], ['lithosfeer', 'bodem en gesteente', C.oker, 1180, 540], ['biosfeer', 'alles wat leeft', C.groen, 1180, 680]].forEach(([n, s, c, x, y]) => naamBij(ctx, n, s, x + 220, y, q.on(n, 1), 'left', c));
      tag(ctx, 'alles hangt samen', 760, 140, C.goud, q.on('verbonden', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const kap = clamp((q.localT - q.at('Kap', 1)) / 3, 0, 1); regenwoud(ctx, 260, 700, 1400, { kap, t });
      const v = q.on('verdampt', 1); for (let k = 0; k < 3; k++) { ctx.save(); ctx.globalAlpha *= v; golfPijl(ctx, 500 + k * 400, 460, 500 + k * 400, 300, C.teal, 1, t); ctx.restore(); } ctx.save(); ctx.globalAlpha *= v; metaText(ctx, 'minder verdamping', 1560, 400, C.teal, 'center', 28); ctx.restore();
      wolkje(ctx, 960, 250, 1.6, q.on('regen', 1)); tag(ctx, 'minder regen', 960, 140, C.teal, q.on('regen', 1), 'center', 28);
      co2Pijl(ctx, 1740, 640, 300, q.on('koolstofdioxide', 1), false); ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = fasen(q, [null, ['2009', 1]]);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; paneel(ctx, 160, 200, 1600, 560, 'temperatuur op aarde (schematisch)', 1); const X = 260, Y = 480, Wd = 1400;
      const u = clamp((q.localT - 0.3) / 3, 0, 1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const x = X + i / 100 * Wd; const y = Y + (i < 12 ? 140 - i * 11 : Math.sin(i * 0.9) * 8 + Math.sin(i * 0.31) * 6) - (i > 96 ? (i - 96) * 9 : 0); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      metaText(ctx, 'ijstijd', X + 40, Y + 190, C.text2, 'left', 26); metaText(ctx, 'ruim 10.000 jaar geleden', X + 168, Y - 30, C.text2, 'left', 28); metaText(ctx, 'nu', X + Wd, Y + 230, C.text2, 'right', 26);
      tag(ctx, 'opvallend stabiel', X + Wd * 0.55, Y - 90, C.groen, q.on('stabiel', 1), 'center', 30);
      const lb = q.on('landbouw', 1); if (lb > 0.01) { graanaar(ctx, X + 400, Y + 150, 120, lb); huisje(ctx, X + 750, Y + 150, 0.9, q.on('dorpen', 1)); fabriek(ctx, X + 1100, Y + 160, 0.8, q.on('steden', 1)); }
      vraagteken(ctx, 960, 860, q.on('Hoeveel', 1), 0); tag(ctx, 'hoeveel kun je veranderen?', 960, 160, C.goud, q.on('Hoeveel', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; grenzenRad(ctx, 960, 500, 230, { grow: 0.4 * q.on('negen', 1, 1.5), labels: 0 }); tag(ctx, '2009 · negen planetaire grenzen', 960, 140, C.goud, 1, 'center', 32);
      naamBij(ctx, 'veilige zone', null, 1220, 330, q.on('veilige', 1), 'left', C.groen); const ib = q.on('Erbuiten', 1); if (ib > 0.01) { ctx.save(); ctx.globalAlpha *= ib; ctx.strokeStyle = C.koraal; ctx.setLineDash([10, 10]); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(960, 500, 330, 0, 6.283); ctx.stroke(); ctx.restore(); naamBij(ctx, 'grotere kans op plotselinge veranderingen', null, 960, 880 - 20, ib, 'center', C.koraal); } ctx.restore(); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const cues = [['biosfeer', 1], ['Landgebruik', 1], ['zoet', 1], ['stikstof', 1], ['nieuwe', 1], ['verzuring', 1], ['klimaatverandering', 1], ['ozonlaag', 1], ['fijnstof', 1]];
    const toon = cues.filter(([w, n]) => q.on(w, n, 0.2) > 0.5).length; const gr = 0.4 + 0.6 * q.on('zeven', 1, 1.5);
    const samen = q.on('Ontbossing', 1); grenzenRad(ctx, 960, 480, 190, { toon, grow: gr, hl: samen > 0.01 ? [0, 1, 2, 6] : (toon > 0 && toon < 9 ? [toon - 1] : []), hlA: samen > 0.01 ? samen : 0.6 });
    wisselTekst(ctx, [['leven', 1, 'leven en land'], ['stoffen', 1, 'stoffen'], ['lucht', 1, 'lucht'], ['zeven', 1, '2025: zeven van de negen overschreden'], ['inschatting', 1, 'een inschatting, met marges'], ['samen', 1, 'de grenzen hangen samen']], q, 960, 120, C.goud, 30);
    metaText(ctx, 'schematisch · naar Planetary Health Check 2025', 960, 870, C.text2, 'center', 26); },

  s22(ctx, t, q) { bg(ctx, 'schema'); grenzenRad(ctx, 760, 480, 190, { grow: 1, hl: [7], hlA: q.on('ozonlaag', 1) }); tag(ctx, 'ozonlaag: binnen de grens', 760, 140, C.groen, q.on('ozonlaag', 1), 'center', 30); vraagteken(ctx, 1500, 560, q.on('denk', 1), 150); },

  s24(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a: samen afspreken', 1 - q.on('tachtig', 1));
    const gatT = clamp((q.localT - q.at('gat', 1)) / 2, 0, 1); const herstel = clamp((q.localT - q.at('herstelt', 1)) / 6, 0, 1); const gat = 0.35 + 0.65 * gatT - 0.6 * herstel;
    ozonKaart(ctx, 520, 470, 260, gat, q.on('tachtig', 1), herstel > 0.5 ? 'rond 2066: naar verwachting dicht' : 'jaren tachtig');
    metaText(ctx, 'Antarctica, van boven', 520, 180, C.grain, 'center', 30);
    const cf = q.on('Cfk', 1); spuitbus(ctx, 1080, 520, 1.6, cf); koelkast(ctx, 1320, 560, 1, cf); tag(ctx, 'cfk’s breken ozon af', 1200, 300, C.paars, cf * (1 - q.on('1987', 1)), 'center', 30);
    stempel(ctx, 1520, 300, '1987 · Montreal', C.groen, q.on('1987', 1)); kruis(ctx, 1080, 520, 50, q.on('verboden', 1)); kruis(ctx, 1320, 560, 60, q.on('verboden', 1));
    haak(ctx, 1000, 1760, 720, 'samenwerken werkt', C.groen, q.on('samenwerken', 1)); },

  s25(ctx, t, q) { bg(ctx, 'schema'); grenzenRad(ctx, 480, 500, 160, { grow: 1, hl: [0, 6], hlA: q.on('kern', 1), labels: 0.9 });
    const ux = q.on('uitsterven', 1); paneel(ctx, 980, 190, 840, 330, 'hoe snel soorten uitsterven', ux, C.koraal);
    if (ux > 0.01) { ctx.save(); ctx.globalAlpha *= ux; balk(ctx, 1040, 290, 700, 0.03, C.oker, 'gemiddeld, 10 miljoen jaar', 1, 44); balk(ctx, 1040, 400, 700, ease(clamp((q.localT - q.at('tientallen', 1)) / 1.5, 0, 1)), C.koraal, 'nu: minstens tientallen tot honderden keren sneller', 1, 44); metaText(ctx, 'niet op schaal', 1780, 505, C.text2, 'right', 26); ctx.restore(); }
    const pg = q.on('plantengroei', 1); paneel(ctx, 980, 560, 840, 290, 'alle plantengroei', pg, C.groen);
    if (pg > 0.01) { ctx.save(); ctx.globalAlpha *= pg; for (let i = 0; i < 10; i++) plantje(ctx, 1060 + i * 72, 790, 1.1, 1); const mu = q.on('gebruikt', 1); ctx.save(); ctx.globalAlpha *= mu; roundRect(ctx, 1030, 650, 230, 160, 12); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.stroke(); ctx.restore(); regel(ctx, 'mens', 1145, 640, mu, C.koraal, 28, 'center', 700); regel(ctx, 'de rest van het leven', 1560, 640, q.on('rest', 1), C.groen, 28, 'center', 700); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); const kap = q.on('gekapt', 1, 2), br = q.on('brandde', 1), dr = q.on('droger', 1, 2);
    tag(ctx, 'zuidoosten van het Amazonegebied', 960, 140, C.goud, q.on('Amazonegebied', 1), 'center', 30);
    regenwoud(ctx, 200, 720, 1520, { kap: kap * 0.6, droog: dr, t });
    if (br > 0.01) for (let k = 0; k < 5; k++) vlam(ctx, 420 + k * 280, 720, 90 + (k % 2) * 30, br * (1 - 0.5 * dr), t);
    const kf = q.on('koolstof', 1); co2Pijl(ctx, 700, 260, 440, kf, true); co2Pijl(ctx, 1220, 460, 220, kf, false); ctx.save(); ctx.globalAlpha *= kf; metaText(ctx, 'opname', 700, 230, C.groen, 'center', 26); metaText(ctx, 'afgifte (groter)', 1220, 190, C.koraal, 'center', 26); ctx.restore();
    metaText(ctx, '2010–2018', 960, 830, C.grain, 'center', 28); vraagteken(ctx, 1600, 380, q.on('denk', 1), 130); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: sterker', 1 - q.on('heet', 1));
    const act = clamp((q.localT - q.at('Meer', 1)) / 7, 0, 1); lus(ctx, 760, 500, 250, ['meer CO₂', 'meer opwarming', 'droger bos', 'minder opname'], act, 1, t);
    const pt = q.on('positieve', 1); kolom(ctx, 1220, 300, 560, 360, 'positieve terugkoppeling', 'versterkend', C.koraal, pt); regel(ctx, 'positief = versterkend,', 1500, 500, q.on('betekent', 1), C.text, 32, 'center', 600); regel(ctx, 'niet ‘goed’', 1500, 550, q.on('betekent', 1), C.koraal, 32, 'center', 700); },

  s29(ctx, t, q) { bg(ctx, 'schema'); const mn = q.on('appels', 1); ontbijt(ctx, 760, 700, 1, { appelA: 1 - mn }); appel(ctx, 960, 676, 1, 1 - mn); appel(ctx, 1020, 676, 1, 1 - mn); appel(ctx, 1020, 670, 1.1, 1); persoon(ctx, LOTTE, 300, 860, 470, { t, uit: q.on('minder', 1) > 0.5 && q.localT < q.at('luxe', 1) ? 'verbaasd' : 'blij', pose: 'staan', kijk: 1 });
    { const pr = q.on('duurder', 1); if (pr > 0.01) { ctx.save(); ctx.globalAlpha *= pr; roundRect(ctx, 1080, 560, 120, 60, 10); shape(ctx, '#E8EDF2', '#9AA3B2', 2); regel(ctx, '€ ↑', 1140, 602, 1, C.koraal, 34, 'center', 800); ctx.restore(); } }
    wisselTekst(ctx, [['honger', 1, 'geen honger'], ['minder', 1, 'wel minder appels, minder vitamines'], ['duurder', 1, 'en een duurder ontbijt'], ['luxe', 1, 'biodiversiteit is geen luxe']], q, 760, 480, C.goud, 32);
    const hg = q.on('hangen', 1); if (hg > 0.01) { appel(ctx, 1380, 400, 1.4, hg); druppel(ctx, 1560, 400, 1.4, hg); thermo(ctx, 1720, 450, 120, 0.4, C.groen, hg); metaText(ctx, 'voedsel · water · klimaat', 1560, 520, C.grain, 'center', 28); } },

  s30(ctx, t, q) { bg(ctx, 'schema'); const pw = 410, gap = 30, x0 = (W - 4 * pw - 3 * gap) / 2, y0 = 170, ph = 620;
    const P = [['drie niveaus', 'genen · soorten · ecosystemen', 'onthouden', C.paars], ['diensten', 'leveren · regelen · beleven', 'Ecosysteemdiensten', C.teal], ['grootste oorzaak', 'land- en zeegebruik', 'oorzaak', C.koraal], ['negen grenzen', 'zeven overschreden', 'grenzen', C.groen]];
    P.forEach(([ti, sub, w, c], i) => { const a = q.on(w, 1); const x = x0 + i * (pw + gap); kolom(ctx, x, y0, pw, ph, ti, '', c, a); if (a < 0.01) return; ctx.save(); ctx.globalAlpha *= a; tekstBlok(ctx, sub, x + 30, y0 + 470, pw - 60, 28, C.text, 1, 1.3, 600);
      if (i === 0) { appel(ctx, x + 110, y0 + 230, 1.2); hommel(ctx, x + 300, y0 + 220, 0.9, { t }); den(ctx, x + 200, y0 + 400, 120); }
      if (i === 1) { bij(ctx, x + 110, y0 + 250, 1, 0, { t }); druppel(ctx, x + 300, y0 + 250, 1.2); persoon(ctx, LOTTE, x + 205, y0 + 440, 170, { t, uit: 'blij' }); }
      if (i === 2) { for (let k = 0; k < 5; k++) { k % 2 ? den(ctx, x + 70 + k * 70, y0 + 330, 110) : huisje(ctx, x + 70 + k * 70, y0 + 330, 0.6, 1); } }
      if (i === 3) grenzenRad(ctx, x + pw / 2, y0 + 290, 105, { grow: 1, labels: 0 });
      ctx.restore(); });
    tag(ctx, 'de ozonlaag: het kan ook goed gaan', 960, 880 - 30, C.groen, q.on('goede', 1), 'center', 28); },
});
