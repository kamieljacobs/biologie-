
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
// Examenbespreking vwo 2018-II — gedeelde examen-UI (20 okt 2026). Gebruikt door alle scènes.
// Vaste beeldtaal per vraag:
//  vraagChip   = linksboven 'VRAAG 7 · 2P' (staat de hele vraag in beeld)
//  vraagKaart  = werkwoord in goud + kern van de vraag (kort, geen ondertitel herhalen)
//  punten      = puntenschakels: genummerde vakjes die oplichten met een vinkje als dat scorepunt genoemd wordt
//  opties      = meerkeuze A–D: foute opties worden doorgestreept/gedimd, de goede krijgt een groene rand
//  welNiet     = rijen met een bewering en een stempel WEL (groen) of NIET (koraal)
//  examenKader = papierachtig paneel voor een nagetekende examenfiguur ('afbeelding 2')

const EX = { papier: '#22324E', papierR: '#3A4E72', inkt: C.text, dim: C.text2 };

function vraagChip(ctx, nr, p, a = 1, x = 70, y = 92) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const s1 = 'VRAAG ' + nr, s2 = p ? (p === 'mc' ? 'MEERKEUZE · 2P' : p + 'P') : '';
  ctx.font = fMeta(30); ctx.letterSpacing = '3px'; const w1 = ctx.measureText(s1).width; ctx.font = fMeta(26); const w2 = s2 ? ctx.measureText(s2).width : 0; ctx.letterSpacing = '0px';
  const w = w1 + (s2 ? w2 + 52 : 0) + 48; roundRect(ctx, x, y - 44, w, 62, 31); shape(ctx, rgba(C.goud, 0.16), C.goud, 2);
  metaText(ctx, s1, x + 24, y, C.text, 'left', 30); if (s2) { circ(ctx, x + 24 + w1 + 24, y - 12, 4, C.goud); metaText(ctx, s2, x + 24 + w1 + 44, y, C.goud, 'left', 26); }
  ctx.restore(); }

// contextlabel rechtsboven (welke context we bespreken)
function contextChip(ctx, s, a = 1) { if (a <= 0.01) return; metaA_(ctx, s, W - 70, 82, a, C.text2, 'right', 22); }
function metaA_(ctx, s, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, col, al, px); ctx.restore(); }

// werkwoord + kern; (x,y) = linksboven van de kaart; breedte w
function vraagKaart(ctx, werkwoord, kern, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const px = o.px || 40; ctx.font = fTekst(px, 600); const lines = splitRegels(ctx, kern, w - 80); const h = 110 + lines.length * (px + 12);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(EX.papier, 0.92), EX.papierR, 2);
  ctx.fillStyle = C.goud; roundRect(ctx, x, y, 10, h, 5); ctx.fill();
  text(ctx, werkwoord, x + 40, y + 70, fTitel(46), C.goud, 'left');
  lines.forEach((l, i) => text(ctx, l, x + 40, y + 70 + 58 + i * (px + 12), fTekst(px, 500), C.text, 'left'));
  ctx.restore(); return h; }
function splitRegels(ctx, s, maxW) { const words = s.split(' '); const out = []; let line = ''; for (const wd of words) { const t2 = line ? line + ' ' + wd : wd; if (ctx.measureText(t2).width > maxW && line) { out.push(line); line = wd; } else line = t2; } if (line) out.push(line); return out; }

// puntenschakels; items = [{t:'tekst', a: 0..1 (zichtbaar), v: 0..1 (vinkje)}]; (x,y) = linksboven; vakken onder elkaar
function punten(ctx, items, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 34, gap = o.gap || 22; let yy = y;
  items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, it.t, w - 170); const h = 40 + L.length * (px + 10);
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const v = it.v || 0;
      roundRect(ctx, x, yy, w, h, 16); shape(ctx, rgba(v > 0.5 ? C.groen : EX.papier, v > 0.5 ? 0.14 : 0.9), v > 0.5 ? C.groen : EX.papierR, v > 0.5 ? 3 : 2);
      circ(ctx, x + 50, yy + h / 2, 30, v > 0.5 ? C.groen : 'rgba(0,0,0,0)', v > 0.5 ? C.groen : C.goud, 3);
      text(ctx, it.p || '1p', x + 50, yy + h / 2 + 10, fMeta(24), v > 0.5 ? '#121A26' : C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 108, yy + 20 + px + k * (px + 10) - 4, fTekst(px, 600), C.text, 'left'));
      if (v > 0.01) vink_(ctx, x + w - 46, yy + h / 2, 18, v); ctx.restore(); }
    yy += h + gap; });
  ctx.restore(); return yy; }

// meerkeuze; opts = ['tekst A', ...]; st = {weg:[0..1 per optie], goed: index, g: 0..1, a:[0..1 per optie]}
function opties(ctx, opts, x, y, w, st = {}, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 34; let yy = y;
  opts.forEach((s, i) => { const ia = st.a ? st.a[i] : 1; ctx.font = fTekst(px, 500); const L = splitRegels(ctx, s, w - 130); const h = 30 + L.length * (px + 10);
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const weg = st.weg ? (st.weg[i] || 0) : 0, goed = st.goed === i ? (st.g || 0) : 0;
      ctx.globalAlpha *= 1 - 0.55 * weg;
      roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(goed > 0.5 ? C.groen : EX.papier, goed > 0.5 ? 0.16 : 0.85), goed > 0.5 ? C.groen : EX.papierR, goed > 0.5 ? 3.5 : 2);
      text(ctx, 'ABCDEF'[i], x + 42, yy + 18 + px - 4, fTitel(px + 4), goed > 0.5 ? C.groen : C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 90, yy + 16 + px - 4 + k * (px + 10), fTekst(px, 500), C.text, 'left'));
      if (weg > 0.01) { ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 80, yy + h / 2); ctx.lineTo(x + 80 + (w - 110) * clamp(weg * 1.2, 0, 1), yy + h / 2); ctx.stroke(); }
      if (goed > 0.01) vink_(ctx, x + w - 40, yy + h / 2, 16, goed); ctx.restore(); }
    yy += h + 16; });
  ctx.restore(); return yy; }

// wel/niet-rijen; rows = [{t, v:'wel'|'niet', a, s (0..1 stempel)}]
function welNiet(ctx, rows, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const px = o.px || 32; let yy = y;
  rows.forEach((r, i) => { const ia = r.a == null ? 1 : r.a; ctx.font = fTekst(px, 500); const L = splitRegels(ctx, r.t, w - 290); const h = Math.max(96, 30 + L.length * (px + 10));
    if (ia > 0.01) { ctx.save(); ctx.globalAlpha *= ia; const hl = r.hl || 0;
      roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(EX.papier, 0.88), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2);
      text(ctx, String(i + 1), x + 40, yy + h / 2 + 14, fTitel(40), C.goud, 'center');
      L.forEach((l, k) => text(ctx, l, x + 84, yy + h / 2 - (L.length - 1) * (px + 10) / 2 + 11 + k * (px + 10), fTekst(px, 500), C.text, 'left'));
      const s = r.s || 0; if (s > 0.01) { const col = r.v === 'wel' ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= s; const sc = 1.25 - 0.25 * ease(s); ctx.translate(x + w - 110, yy + h / 2); ctx.scale(sc, sc); ctx.rotate(-0.08);
        roundRect(ctx, -82, -34, 164, 68, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, r.v.toUpperCase(), 0, 14, fTekst(38, 800), col, 'center'); ctx.restore(); }
      ctx.restore(); }
    yy += h + 14; });
  ctx.restore(); return yy; }

// kader voor een nagetekende examenfiguur; titel als 'AFBEELDING 2'
function examenKader(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(EX.papier, 0.75), EX.papierR, 2);
  if (titel) metaText(ctx, titel, x + 28, y + 44, C.text2, 'left', 22); ctx.restore(); }

// antwoordregel ('Antwoord B') linksboven onder de vraagchip
function antwoordLabel(ctx, s, a = 1, x = 70, y = 172) { regel(ctx, s, x, y, a, C.groen, 44, 'left', 800); }

// tipkaartje met lampje; (x,y) = linksboven
function tipKaart(ctx, s, x, y, w, a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, s, w - 150); const h = 50 + L.length * (px + 10);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.teal, 0.14), C.teal, 2.5); lampje(ctx, x + 62, y + h / 2, 1);
  metaText(ctx, 'TIP', x + 118, y + 40, C.teal, 'left', 20); L.forEach((l, k) => text(ctx, l, x + 118, y + 40 + px + 6 + k * (px + 10), fTekst(px, 600), C.text, 'left')); ctx.restore(); return h; }
function lampje(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y - 8, 24, Math.PI * 0.8, Math.PI * 2.2); ctx.lineTo(x + 10, y + 22); ctx.lineTo(x - 10, y + 22); ctx.closePath(); shape(ctx, rgba(C.goud, 0.85), C.goud, 2); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 11, y + 24, 22, 6); ctx.fillRect(x - 9, y + 33, 18, 5); ctx.restore(); }

// waarschuwing ('levert geen punt op'); rood randje met kruis
function valkuil(ctx, s, x, y, w, a = 1, px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, s, w - 140); const h = 44 + L.length * (px + 10);
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2.5); kruis(ctx, x + 56, y + h / 2, 16, 1);
  metaText(ctx, 'GEEN PUNT', x + 104, y + 38, C.koraal, 'left', 20); L.forEach((l, k) => text(ctx, l, x + 104, y + 36 + px + 6 + k * (px + 10), fTekst(px, 600), C.text, 'left')); ctx.restore(); return h; }

// ketting: schakels van links naar rechts; items=[{t, a}] ; (x,y) = midden links
function ketting(ctx, items, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = items.length, gap = 70, bw = (w - gap * (n - 1)) / n, px = o.px || 30;
  items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; const bx = x + i * (bw + gap); if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia; ctx.font = fTekst(px, 600); const L = splitRegels(ctx, it.t, bw - 40); const h = 40 + L.length * (px + 8);
    roundRect(ctx, bx, y - h / 2, bw, h, h / 2 > 50 ? 26 : h / 2); shape(ctx, rgba(it.col || C.goud, 0.14), it.col || C.goud, 2.5);
    L.forEach((l, k) => text(ctx, l, bx + bw / 2, y - (L.length - 1) * (px + 8) / 2 + px * 0.36 + k * (px + 8), fTekst(px, 600), C.text, 'center'));
    if (i < n - 1) pijl(ctx, bx + bw + 10, y, bx + bw + gap - 10, y, C.line, 1, 4, 16); ctx.restore(); });
  ctx.restore(); }
// Examenbespreking vwo 2018-II — tekenfuncties deel a (opening, leesgewoontes, De lauwbloedige koningsvis). Prefix a_.

// zichtbaar venster: in vanaf t0, weg vóór t1 (zo staan twee balken nooit tegelijk)
function a_win(t, t0, t1 = Infinity, d = 0.4) { return Math.min(ramp(t, t0, d), 1 - ramp(t, t1 - d, d)); }
function a_alpha(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function a_mixC(h1, h2, k) { k = clamp(k, 0, 1); const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1); }
const A_KOUD = '#4F8FD0', A_WARM = '#E0644A';
function a_tempKleur(u) { return a_mixC(A_KOUD, A_WARM, u); }
const A_CTX = 'DE LAUWBLOEDIGE KONINGSVIS';

// ---------- opening ----------
function a_tafel(ctx, x, y, w, s = 1) { // examentafel in perspectief: blad + poten; (x,y) = midden voorkant blad
  const d = 26 * s; ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2 - 14 * s, y - d); ctx.lineTo(x - w / 2 + 14 * s, y - d); ctx.closePath(); shape(ctx, '#B89468', '#8C6E4C', 1.5);
  ctx.fillStyle = '#8C6E4C'; ctx.fillRect(x - w / 2, y, w, 8 * s); ctx.fillStyle = '#5A6478'; const ph = 92 * s; ctx.fillRect(x - w / 2 + 8 * s, y + 8 * s, 6 * s, ph); ctx.fillRect(x + w / 2 - 14 * s, y + 8 * s, 6 * s, ph); ctx.restore(); }
function a_boekje(ctx, x, y, s = 1, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(50, -22); ctx.lineTo(-50, -22); ctx.closePath(); shape(ctx, '#F2EEE4', '#B8B2A4', 1.5);
  ctx.strokeStyle = '#8A8E96'; ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 3, -6 - i * 5); ctx.lineTo(36 - i * 3, -6 - i * 5); ctx.stroke(); }
  if (open > 0.01) { ctx.strokeStyle = '#121A26'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -22); ctx.stroke(); }
  ctx.restore(); }
function a_wandklok(ctx, x, y, r, uur, a = 1, sector = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r + 8, '#3A4E72'); circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3);
  if (sector > 0.01) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 8, -Math.PI / 2 + 1.5 / 12 * 6.283, -Math.PI / 2 + (1.5 + 3 * sector) / 12 * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.55); ctx.fill(); }
  ctx.strokeStyle = '#3A4458'; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.lineWidth = i % 3 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * (r - 6), y - Math.cos(an) * (r - 6)); ctx.lineTo(x + Math.sin(an) * (r - (i % 3 ? 14 : 20)), y - Math.cos(an) * (r - (i % 3 ? 14 : 20))); ctx.stroke(); }
  const ah = uur / 12 * 6.283, am = (uur % 1) * 6.283; ctx.lineCap = 'round'; ctx.strokeStyle = '#121A26'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5); ctx.stroke();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(am) * r * 0.78, y - Math.cos(am) * r * 0.78); ctx.stroke(); circ(ctx, x, y, 6, '#121A26'); ctx.restore(); }
// examenzaal links (tot x≈1120): wand, klok, rijen tafels, Noor vooraan
function a_zaal(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#22324E'; ctx.fillRect(0, 0, 1180, 470); ctx.fillStyle = '#1F2D47'; ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(1180, 470); ctx.lineTo(1180, 880); ctx.lineTo(0, 880); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#3A4E72'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(1180, 470); ctx.stroke();
  // bord met 'stilte'
  roundRect(ctx, 380, 120, 420, 170, 10); shape(ctx, '#2C4A3E', '#5A6478', 4); text(ctx, 'Biologie vwo', 590, 190, fTekst(36, 600), '#E8E8E0', 'center'); text(ctx, '13.30 – 16.30 uur', 590, 245, fTekst(30, 500), '#C9D2C8', 'center');
  a_wandklok(ctx, 960, 210, 82, o.uur == null ? 1.5 : o.uur, 1, o.sector || 0);
  // rijen tafels (achter klein, voor groot)
  const rijen = [[520, 0.55, 5], [600, 0.72, 4], [700, 0.92, 4]];
  rijen.forEach(([y, s, n], ri) => { for (let i = 0; i < n; i++) { const x = 590 + (i - (n - 1) / 2) * 300 * s * (ri === 2 ? 1.25 : 1); if (ri === 2 && i === 1) continue; a_tafel(ctx, x, y, 200 * s, s); a_boekje(ctx, x, y - 6 * s, s * 0.8, 1); } });
  // Noor aan de voorste tafel
  const nx = 590 - 0.5 * 300 * 0.92 * 1.25; persoon(ctx, 'noor', nx, 860, 420, { t, kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  a_tafel(ctx, nx, 700, 230, 1.0); a_boekje(ctx, nx + 10, 694, 1, 1, 1);
  ctx.restore(); }
function a_teller(ctx, x, y, n, label, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, String(n), x, y, fTitel(120), col, 'right'); metaText(ctx, label, x + 24, y - 12, C.text, 'left', 34); ctx.restore(); }

// contextkaartjes (s02)
function a_kaart(ctx, x, y, w, h, nr, titel, a = 1, hl = 0, icoon) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = (1 - ease(a)) * 30; ctx.translate(0, dy);
  roundRect(ctx, x, y, w, h, 20); shape(ctx, rgba(EX.papier, 0.92), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2);
  metaText(ctx, 'CONTEXT ' + nr, x + 26, y + 46, C.goud, 'left', 22);
  if (icoon) { ctx.save(); ctx.beginPath(); ctx.rect(x + 6, y + 60, w - 12, 230); ctx.clip(); icoon(x + w / 2, y + 180); ctx.restore(); }
  ctx.font = fTekst(30, 600); const L = splitRegels(ctx, titel, w - 44); L.forEach((l, i) => text(ctx, l, x + 22, y + 340 + i * 38, fTekst(30, 600), C.text, 'left'));
  ctx.restore(); }
function a_eilandje(ctx, x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); // eilandje van Langerhans tussen klierweefsel
  for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283; circ(ctx, Math.cos(an) * 105, Math.sin(an) * 80, 22, '#C98A6A', '#A87058', 1.5); }
  blob(ctx, 0, 0, 78, 64, 0.06, 3, t); shape(ctx, '#E8C78A', '#C9A35C', 2);
  for (let i = 0; i < 14; i++) { const an = hash(i * 3) * 6.283, d = Math.sqrt(hash(i * 5)) * 52; circ(ctx, Math.cos(an) * d, Math.sin(an) * d * 0.8, 9, i % 4 ? '#7FC48F' : '#5BA4C9'); }
  ctx.restore(); }
function a_waterstof(ctx, x, y, s = 1, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(-80 + i * 40, 40 + (i % 2) * 22); ctx.rotate(0.4 * (i % 3 - 1)); roundRect(ctx, -26, -11, 52, 22, 11); shape(ctx, '#7FC48F', '#5FA86E', 1.5); ctx.restore(); }
  for (let i = 0; i < 4; i++) { const yy = ((t * 30 + i * 30) % 120); const bx = -50 + i * 34, by = 10 - yy; ctx.globalAlpha *= 1; circ(ctx, bx, by, 14, rgba(C.teal, 0.25), C.teal, 2); circ(ctx, bx + 16, by - 4, 14, rgba(C.teal, 0.25), C.teal, 2); }
  text(ctx, 'H₂', 70, -60, fTekst(40, 700), C.teal, 'center'); ctx.restore(); }
function a_muisje(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-100, 20); ctx.bezierCurveTo(-170, 30, -170, -30, -210, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 105, 58, 0, 0, 6.283); shape(ctx, '#9A8270', '#B8A090', 1.5);
  ctx.beginPath(); ctx.ellipse(100, -8, 52, 38, -0.2, 0, 6.283); shape(ctx, '#9A8270', '#B8A090', 1.5);
  circ(ctx, 84, -46, 22, '#C9A6A0', '#B8A090', 1.5); circ(ctx, 120, -16, 5, '#121A26'); circ(ctx, 152, -2, 6, '#C98A8A'); ctx.restore(); }

// ---------- leesgewoontes ----------
// nagetekende vraagregel in examenstijl; hl = {p, ww} 0..1 omcirkelen
function a_vraagRegel(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 210, 14); shape(ctx, '#EDEAE2', '#B8B2A4', 2);
  const pp = o.p || '2p', nr = o.nr || '1'; text(ctx, pp, x + 50, y + 82, fTekst(36, 600), '#3A4458', 'left'); text(ctx, nr, x + 140, y + 82, fTekst(36, 800), '#121A26', 'left');
  const ww = o.ww || 'Leg uit', rest = o.rest || ['dat het voor kleine vissoorten, door hun grotere', 'oppervlakte-inhoudverhouding, ongunstig is om endotherm te zijn.'];
  ctx.font = fTekst(36, 500); const wW = ctx.measureText(ww).width; text(ctx, ww, x + 200, y + 82, fTekst(36, 500), '#121A26', 'left'); text(ctx, rest[0], x + 200 + wW + 10, y + 82, fTekst(36, 500), '#121A26', 'left');
  if (rest[1]) text(ctx, rest[1], x + 200, y + 136, fTekst(36, 500), '#121A26', 'left');
  ctx.lineWidth = 5; ctx.strokeStyle = C.koraal;
  if (o.hp > 0.01) { ctx.save(); ctx.globalAlpha *= o.hp; ctx.beginPath(); ctx.ellipse(x + 70, y + 70, 44, 36, 0, -1.6, -1.6 + 6.283 * clamp(o.hp * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); }
  if (o.hw > 0.01) { ctx.save(); ctx.globalAlpha *= o.hw; ctx.beginPath(); ctx.ellipse(x + 200 + wW / 2, y + 70, wW / 2 + 22, 34, 0, -1.6, -1.6 + 6.283 * clamp(o.hw * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { wW }; }
// lege antwoordvakjes: n vakjes, k gevuld
function a_vakjes(ctx, x, y, n, a = 1, vul = [], ba = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const xx = x + i * 190; ctx.save(); ctx.globalAlpha *= ba[i] == null ? 1 : ba[i]; roundRect(ctx, xx, y, 160, 110, 16); const v = vul[i] || 0; shape(ctx, rgba(v > 0.5 ? C.groen : EX.papier, v > 0.5 ? 0.16 : 0.9), v > 0.5 ? C.groen : C.goud, 2.5);
    text(ctx, (i + 1) + 'p', xx + 80, y + 70, fMeta(34), v > 0.5 ? C.groen : C.goud, 'center'); ctx.restore(); } ctx.restore(); }
function a_wwKaart(ctx, x, y, w, ww, sub, a = 1, hl = 0, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 170, 18); shape(ctx, rgba(EX.papier, 0.92), hl > 0.5 ? col : EX.papierR, hl > 0.5 ? 3.5 : 2);
  text(ctx, ww, x + w / 2, y + 74, fTitel(48), col, 'center'); text(ctx, sub, x + w / 2, y + 130, fTekst(30, 500), C.text2, 'center'); ctx.restore(); }
// contexttekst met gemarkeerde zin (examenstijl)
function a_contextTekst(ctx, x, y, w, mark = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 360, 14); shape(ctx, '#EDEAE2', '#B8B2A4', 2);
  const regels = ['Net als zeehonden en pinguïns hebben ook koningsvissen een', 'onderhuidse vetlaag om warmteverlies in koud water te reduceren.', 'Vissen hebben echter een enorm ‘warmtelek’ in de kieuwen, waar het', 'bloed door een haarvatennet in nauw contact komt met het koude water.', 'Zonder aanpassingen zouden endotherme vissen hierdoor het overgrote', 'deel van de geproduceerde warmte verliezen.'];
  regels.forEach((r, i) => { const yy = y + 64 + i * 50; if ((i === 2 || i === 3) && mark > 0.01) { ctx.font = fTekst(32, 500); const ww = ctx.measureText(r).width; ctx.fillStyle = rgba('#F2D24A', 0.75 * mark); const x0 = x + 40, sx = i === 2 ? x0 + ctx.measureText('Vissen hebben echter een ').width : x0; ctx.fillRect(sx - 4, yy - 30, (x0 + ww - sx + 8) * clamp(mark * 1.4 - (i === 3 ? 0.4 : 0), 0, 1), 42); }
    text(ctx, r, x + 40, yy, fTekst(32, 500), '#2A3446', 'left'); });
  ctx.restore(); }

// ---------- koningsvis ----------
function a_visPad(ctx) { ctx.beginPath(); ctx.moveTo(214, 2); ctx.bezierCurveTo(196, -128, -60, -178, -160, -98); ctx.bezierCurveTo(-200, -62, -222, -28, -238, -16); ctx.lineTo(-238, 16); ctx.bezierCurveTo(-222, 28, -200, 62, -160, 98); ctx.bezierCurveTo(-60, 178, 196, 132, 214, 2); ctx.closePath(); }
// koningsvis (Lampris guttatus) zijaanzicht, kop rechts; o.warm 0..1 = warmtegloed; o.zwem = vinslag; o.hlVin = borstvin oplichten
function a_koningsvis(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
  const vin = '#D8473A', vinD = '#B5372C', slag = Math.sin(t * 3.2) * (o.zwem == null ? 1 : o.zwem);
  // staart
  ctx.beginPath(); ctx.moveTo(-232, -14); ctx.quadraticCurveTo(-262, -50, -312, -100); ctx.quadraticCurveTo(-292, -30, -284, 0); ctx.quadraticCurveTo(-292, 30, -312, 100); ctx.quadraticCurveTo(-262, 50, -232, 14); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // rugvin: hoog en sikkelvormig voor, laag naar achter
  ctx.beginPath(); ctx.moveTo(70, -140); ctx.quadraticCurveTo(40, -230, -30, -282); ctx.quadraticCurveTo(-10, -200, -40, -150); ctx.quadraticCurveTo(-120, -128, -205, -62); ctx.lineTo(-180, -78); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // buikvinnen
  ctx.beginPath(); ctx.moveTo(40, 140); ctx.quadraticCurveTo(10, 210, -50, 248); ctx.quadraticCurveTo(-10, 180, -10, 138); ctx.closePath(); shape(ctx, vin, vinD, 2);
  ctx.beginPath(); ctx.moveTo(-80, 128); ctx.quadraticCurveTo(-140, 120, -205, 64); ctx.lineTo(-180, 82); ctx.closePath(); shape(ctx, vin, vinD, 2);
  // lijf
  a_visPad(ctx); const gr = ctx.createLinearGradient(0, -170, 0, 170); gr.addColorStop(0, '#46608E'); gr.addColorStop(0.45, '#8C93B4'); gr.addColorStop(0.8, '#D8A2A6'); gr.addColorStop(1, '#E8BCB4'); ctx.fillStyle = gr; ctx.fill();
  ctx.save(); a_visPad(ctx); ctx.clip();
  for (let i = 0; i < 60; i++) { const px = -220 + hash(i * 7 + 1) * 420, py = -150 + hash(i * 7 + 2) * 300; circ(ctx, px, py, 4 + 5 * hash(i * 7 + 3), 'rgba(245,245,240,0.85)'); }
  const w = o.warm || 0; if (w > 0.01) { const rg = ctx.createRadialGradient(-10, 0, 20, -10, 0, 230); rg.addColorStop(0, rgba(A_WARM, 0.75 * w)); rg.addColorStop(0.75, rgba(A_WARM, 0.45 * w)); rg.addColorStop(1, rgba(A_WARM, 0.1 * w)); ctx.fillStyle = rg; ctx.fillRect(-260, -200, 520, 400); }
  if (o.vlek) o.vlek(ctx);
  ctx.restore();
  a_visPad(ctx); ctx.strokeStyle = '#C8D0DC'; ctx.lineWidth = 2; ctx.stroke();
  // kieuwdeksel
  ctx.strokeStyle = 'rgba(40,50,70,0.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(205, 6, 120, Math.PI * 0.72, Math.PI * 1.25); ctx.stroke();
  // borstvin (horizontaal, sikkel) met slag
  ctx.save(); ctx.translate(70, -6); ctx.rotate(0.12 * slag); const hv = o.hlVin || 0;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-80, -50, -170, -36); ctx.quadraticCurveTo(-90, -6, 0, 14); ctx.closePath(); shape(ctx, hv > 0.01 ? a_mixC(vin, '#F2C94C', hv * 0.6) : vin, hv > 0.5 ? C.goud : vinD, hv > 0.5 ? 4 : 2); ctx.restore();
  // oog en bek
  circ(ctx, 150, -34, 24, '#E0B64A', '#8C6A2A', 2); circ(ctx, 152, -34, 13, '#121A26'); circ(ctx, 147, -39, 4, '#F2F2EE');
  ctx.strokeStyle = vinD; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(214, 4); ctx.quadraticCurveTo(200, 14, 186, 10); ctx.stroke();
  ctx.restore(); }
function a_water(ctx, x, y, w, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1F4A7A'); g.addColorStop(1, '#0F2340'); ctx.fillStyle = g; ctx.fill();
  ctx.save(); roundRect(ctx, x, y, w, h, 22); ctx.clip(); for (let i = 0; i < 5; i++) { const xx = x + w * (0.1 + i * 0.2) + Math.sin(t * 0.4 + i) * 30; const gg = ctx.createLinearGradient(xx, y, xx + 120, y + h); gg.addColorStop(0, 'rgba(160,200,240,0.10)'); gg.addColorStop(1, 'rgba(160,200,240,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx + 70, y); ctx.lineTo(xx + 260, y + h); ctx.lineTo(xx + 140, y + h); ctx.closePath(); ctx.fill(); } ctx.restore();
  ctx.restore(); }
function a_thermo(ctx, x, y, h, frac, waarde, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 16, y - h, 32, h, 16); shape(ctx, '#EDEAE2', '#9AA3B2', 2); circ(ctx, x, y + 10, 28, col, '#9AA3B2', 2);
  roundRect(ctx, x - 8, y - h * frac, 16, h * frac + 12, 8); ctx.fillStyle = col; ctx.fill(); text(ctx, waarde, x, y - h - 26, fTekst(44, 700), C.text, 'center'); ctx.restore(); }
// golvende warmtepijl
function a_warmtePijl(ctx, x, y, nx, ny, len, a = 1, t = 0, col = A_WARM, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ph = (t * 0.8) % 1; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; const px = -ny, py = nx;
  ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, d = u * len, wv = Math.sin(u * 9 - t * 6) * 7; const xx = x + nx * d + px * wv, yy = y + ny * d + py * wv; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  const ex = x + nx * (len + 4), ey = y + ny * (len + 4); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ex + nx * 14, ey + ny * 14); ctx.lineTo(ex + px * 11, ey + py * 11); ctx.lineTo(ex - px * 11, ey - py * 11); ctx.closePath(); ctx.fill(); ctx.restore(); }

// myoglobine: kleine opgevouwen keten met rood heemschijfje; o2 = 0..1 geladen
function a_o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 8 * s, y, 10 * s, '#7FD0E8', '#3E9AB8', 2); circ(ctx, x + 8 * s, y, 10 * s, '#7FD0E8', '#3E9AB8', 2); ctx.restore(); }
function a_myoglobine(ctx, x, y, s = 1, a = 1, seed = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B87AB0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 26; i++) { const an = i * 0.95 + seed, r = 14 + 12 * Math.sin(i * 1.7 + seed); const xx = Math.cos(an) * r, yy = Math.sin(an) * r * 0.85; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (let i = 0; i <= 26; i += 3) { const an = i * 0.95 + seed, r = 14 + 12 * Math.sin(i * 1.7 + seed); circ(ctx, Math.cos(an) * r, Math.sin(an) * r * 0.85, 4.5, '#D8A0D0'); }
  roundRect(ctx, -9, -16, 18, 12, 3); shape(ctx, '#C8302C', '#8A1E1A', 1.5); ctx.restore(); }
// spiercel (lang, afgeronde uiteinden, dwarsstrepen); knijp 0..1
function a_spiercel(ctx, x, y, w, h, a = 1, knijp = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ww = w * (1 - 0.06 * knijp), hh = h * (1 + 0.08 * knijp);
  roundRect(ctx, x - ww / 2, y - hh / 2, ww, hh, hh / 2); shape(ctx, '#6E2A32', '#C9707A', 3);
  ctx.save(); roundRect(ctx, x - ww / 2, y - hh / 2, ww, hh, hh / 2); ctx.clip(); ctx.strokeStyle = 'rgba(200,110,120,0.22)'; ctx.lineWidth = 5; const n = 30; for (let i = 0; i < n; i++) { const xx = x - ww / 2 + (i + 0.5) * ww / n; ctx.beginPath(); ctx.moveTo(xx, y - hh / 2); ctx.lineTo(xx, y + hh / 2); ctx.stroke(); }
  for (let i = 0; i < 7; i++) circ(ctx, x - ww / 2 + hash(i * 3 + 1) * ww, y - hh / 2 + hash(i * 3 + 2) * hh, 2, 'rgba(240,200,200,0.25)'); ctx.restore(); ctx.restore(); }
function a_haarvat(ctx, x, y, w, a = 1, t = 0, stroom = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, w, 68, 34); shape(ctx, 'rgba(224,122,95,0.18)', C.koraal, 3);
  for (let i = 0; i < 9; i++) { const xx = x + ((i / 9 * w + t * 120 * stroom) % w); ctx.save(); ctx.translate(xx, y); ctx.scale(1, 0.62); circ(ctx, 0, 0, 24, '#C8302C', '#8A1E1A', 2); circ(ctx, 0, 0, 10, '#A82422'); ctx.restore(); } ctx.restore(); }

// tabel 1 nagetekend; hl = {rij: index 0..4 → 0..1}, cel = [{r,k,a}]
const A_TAB = [['borstvinspier', '13,8 ± 1,5', '3,8 ± 0,8', '22'], ['hart', '13,2 ± 1,7', '3,2 ± 0,7', '21'], ['schedel', '16,1 ± 3,9', '6,0 ± 3,0', '22'], ['buikholte', '13,5 ± 1,6', '3,5 ± 1,0', '19'], ['borstvinspier', '14,4 ± 0,4', '4,8 ± 1,2', '4']];
function a_tabel(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const cw = [300, 320, 330, 180], W0 = cw.reduce((p, c) => p + c, 0), rh = 58; const kx = [0]; cw.forEach((c, i) => kx.push(kx[i] + c));
  roundRect(ctx, -30, -90, W0 + 60, 640, 18); shape(ctx, rgba(EX.papier, 0.75), EX.papierR, 2); metaText(ctx, 'TABEL 1', 0, -44, C.text2, 'left', 22);
  const kop = [['lichaamsgebied'], ['gem. temperatuur (°C)', '± standaardafwijking'], ['verschil met zeewater (°C)', '± standaardafwijking'], ['aantal', 'vissen']];
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(0, 0, W0, 100);
  kop.forEach((k, i) => k.forEach((l, j) => text(ctx, l, kx[i] + 16, 40 + j * 36, fTekst(26, j ? 500 : 700), j ? C.text2 : C.text, 'left')));
  const rijY = (r) => r < 4 ? 160 + r * rh : 160 + 4 * rh + 60; const ra = o.rij || [];
  [[100, 'aan dek gemeten koningsvissen'], [160 + 4 * rh, 'vrij zwemmend, met datarecorder']].forEach(([yy, s2]) => { ctx.fillStyle = 'rgba(143,160,181,0.12)'; ctx.fillRect(kx[1], yy, W0 - kx[1], 52); ctx.strokeRect(0, yy, W0, 52); text(ctx, s2, kx[1] + 16, yy + 36, fTekst(26, 700), C.text, 'left'); });
  A_TAB.forEach((row, r) => { const yy = rijY(r) - 4; const ia = (o.rijA || [1, 1, 1, 1, 1])[r]; if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia;
    const h = ra[r] || 0; if (h > 0.01) { roundRect(ctx, -10, yy - 4, W0 + 20, rh, 10); shape(ctx, rgba(C.goud, 0.18 * h), rgba(C.goud, h), 2.5); }
    row.forEach((c, k) => text(ctx, c, kx[k] + 16, yy + 38, fTekst(32, k ? 500 : 600), C.text, 'left')); ctx.restore(); });
  ctx.strokeStyle = C.line; ctx.strokeRect(0, 100, W0, 160 + 4 * rh - 100 - 4 + 4); ctx.strokeRect(0, 160 + 4 * rh, W0, 120);
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(kx[i], 0); ctx.lineTo(kx[i], 100); ctx.moveTo(kx[i], 152); ctx.lineTo(kx[i], 160 + 4 * rh); ctx.moveTo(kx[i], 212 + 4 * rh); ctx.lineTo(kx[i], 280 + 4 * rh); ctx.stroke(); }
  (o.cel || []).forEach(c => { if (c.a <= 0.01) return; const yy = rijY(c.r) - 4; ctx.save(); ctx.globalAlpha *= c.a; ctx.strokeStyle = c.col || C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx[c.k] + (c.cx || 90), yy + 26, (c.rx || 100), 32, 0, 0, 6.283 * clamp(c.a * 1.1, 0, 1)); ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// afbeelding 2: diagram met twee y-assen (temperatuur links, diepte rechts, diepte-as naar beneden)
//const A_L1old = [[15, 13.6], [30, 13.9], [50, 14.3], [70, 14.5], [90, 14.5], [110, 14.2], [130, 13.9], [150, 13.6], [170, 13.4], [190, 13.2], [200, 13.1]];
const A_L3 = [[15,12],[18,11.8],[21,13.5],[24,14.2],[27,13.6],[30,12.2],[33,13.3],[36,14],[39,14.6],[41,13.6],[44,14.4],[46,13.4],[49,14.7],[52,13.6],[55,14.3],[58,14.5],[61,14.2],[63,13.8],[65,12.8],[67,10.5],[69,8.5],[70,7.2],[72,8.4],[74,7.8],[76,8.6],[78,7.5],[80,4.1],[82,5.5],[84,7],[87,7.3],[89,8],[91,9.1],[93,8.2],[95,8.8],[97,8.3],[99,9.3],[101,8.4],[103,9],[105,8.7],[107,9.1],[110,8.8],[113,9.1],[116,8.7],[118,9.2],[120,8.1],[124,8.5],[128,8.3],[132,8.6],[136,8.4],[140,8.5],[144,8],[148,8.3],[152,7.5],[156,7.9],[160,8.6],[164,8.8],[168,8.3],[172,8.6],[176,8.1],[180,8.6],[184,8.3],[188,7.8],[192,7.6],[196,7.8],[200,7.9]];
const A_L1 = [[15,13.6],[30,13.9],[50,14.3],[70,14.5],[90,14.5],[110,14.2],[130,13.9],[150,13.6],[170,13.4],[190,13.2],[200,13.1]];
const A_L2 = A_L3.filter(p => p[0] <= 63).map(p => [p[0], p[1] + 0.15]).concat([[65,14],[67,13.2],[69,11.6],[71,10.8],[73,10.4],[75,10.9],[77,10.6],[80,9.8],[84,9.7],[88,10.2],[92,10.4],[100,10.5],[110,10.5],[120,10.4],[130,10.3],[140,10.5],[150,10.4],[160,10.2],[170,10.4],[180,10.3],[190,10],[200,9.9]]);
function a_grafiek(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (m) => x + m / 200 * w, Y = (v) => y + h - (v - 2) / 16 * h; const dl = o.lijn || [1, 1, 1], hl = o.hl || [0, 0, 0], dim = o.dim || [0, 0, 0];
  examenKader(ctx, x - 150, y - 110, w + 330, h + 230, 'AFBEELDING 2', 1);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
  for (let v = 2; v <= 18; v += 2) { ctx.beginPath(); ctx.moveTo(x - 10, Y(v)); ctx.lineTo(x, Y(v)); ctx.stroke(); text(ctx, String(v), x - 18, Y(v) + 9, fTekst(26, 500), C.text, 'right'); }
  const da = o.diepteAs == null ? 1 : o.diepteAs; ctx.save(); ctx.globalAlpha *= da; for (let d = 0; d <= 100; d += 20) { const yy = Y(18 - d * 0.144); ctx.beginPath(); ctx.moveTo(x + w, yy); ctx.lineTo(x + w + 10, yy); ctx.stroke(); text(ctx, String(d), x + w + 18, yy + 9, fTekst(26, 500), C.text, 'left'); }
  ctx.save(); ctx.translate(x + w + 92, y + 120); ctx.rotate(Math.PI / 2); text(ctx, 'diepte (m)', 0, 0, fTekst(26, 600), C.teal, 'center'); ctx.restore();
  const ap = o.pijlD || 0; if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; pijl(ctx, x + w + 92, y + 210, x + w + 92, y + 210 + 130 * ease(ap), C.teal, 1, 5, 18); ctx.restore(); }
  ctx.restore();
  ctx.save(); ctx.translate(x - 84, y + h / 2); ctx.rotate(-Math.PI / 2); text(ctx, 'temperatuur (°C)', 0, 0, fTekst(26, 600), C.koraal, 'center'); ctx.restore();
  ['19:00', '19:40', '20:20', '21:00', '21:40', '22:20'].forEach((s2, i) => text(ctx, s2, X(i * 40), y + h + 38, fTekst(26, 500), C.text, 'center')); text(ctx, 'tijd van de dag', x + w, y + h + 80, fTekst(24, 500), C.text2, 'right');
  const lijnen = [[A_L1, [3, 9], '#F2F2EE'], [A_L2, [16, 10], '#F2F2EE'], [A_L3, [], '#F2F2EE']]; const kl = o.kleur || [null, null, null];
  lijnen.forEach(([pts, dash, col], i) => { const u = dl[i]; if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= 1 - 0.7 * dim[i]; ctx.setLineDash(dash); ctx.strokeStyle = kl[i] || col; ctx.lineWidth = 3.5 + 3 * hl[i]; ctx.lineJoin = 'round';
    const mx = pts[0][0] + (200 - pts[0][0]) * u; ctx.beginPath(); let first = true; for (let k = 0; k < pts.length; k++) { let [m, v] = pts[k]; if (m > mx) { const [m0, v0] = pts[k - 1]; v = v0 + (v - v0) * (mx - m0) / (m - m0); m = mx; } first ? ctx.moveTo(X(m), Y(v)) : ctx.lineTo(X(m), Y(v)); first = false; if (m >= mx) break; } ctx.stroke(); ctx.restore(); });
  const nr = [[160, 14.9], [160, 11.6], [160, 9.9]]; nr.forEach(([m, v], i) => { if (dl[i] < 0.99) return; ctx.save(); ctx.globalAlpha *= 1 - 0.7 * dim[i]; circ(ctx, X(m), Y(v) - 4, 20, '#22324E', hl[i] > 0.5 ? C.goud : '#F2F2EE', hl[i] > 0.5 ? 3.5 : 2); text(ctx, String(i + 1), X(m), Y(v) + 6, fTekst(28, 700), hl[i] > 0.5 ? C.goud : C.text, 'center'); ctx.restore(); });
  ctx.restore(); return { X, Y }; }

// afbeelding 3: kieuwboog (halfrond) met kieuwplaatjes, vetweefsel en wondernet
function a_kieuwboog(ctx, x, y, R, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  const a0 = -1.85, a1 = 1.85; // C-vorm, open naar links
  // kieuwplaatjes
  for (let k = 0; k <= 90; k++) { const an = a0 + (a1 - a0) * k / 90; const r0 = R + 26, r1 = R + 120 + 10 * Math.sin(k * 0.9); ctx.strokeStyle = k % 2 ? '#D86A6A' : '#C25858'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); ctx.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.stroke(); }
  if ((o.hlPl || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlPl; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, R + 134, a0, a1); ctx.stroke(); ctx.restore(); }
  // kieuwboog (bot)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 40; ctx.beginPath(); ctx.arc(x, y, R, a0, a1); ctx.stroke();
  if ((o.hlBoog || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.hlBoog; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, R + 22, a0, a1); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, R - 22, a0, a1); ctx.stroke(); ctx.restore(); }
  // vetweefsel: gele laag rond de boog (binnenkant)
  const v = o.vet == null ? 1 : o.vet; if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.strokeStyle = '#F0D27A'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, R - 32, a0 + 0.05, a1 - 0.05); ctx.stroke();
    for (let k = 0; k < 40; k++) { const an = a0 + 0.1 + (a1 - a0 - 0.2) * k / 39; circ(ctx, x + Math.cos(an) * (R - 32), y + Math.sin(an) * (R - 32), 6, '#F8E4A8'); } ctx.restore(); }
  // wondernet: kluwen van rode en blauwe vaatjes in de boog
  const wn = o.wondernet == null ? 1 : o.wondernet; if (wn > 0.01) { ctx.save(); ctx.globalAlpha *= wn; ctx.lineWidth = 3;
    for (let j = 0; j < 6; j++) { ctx.strokeStyle = j % 2 ? A_KOUD : A_WARM; ctx.beginPath(); for (let k = 0; k <= 80; k++) { const an = a0 + 0.12 + (a1 - a0 - 0.24) * k / 80, rr = R + 12 * Math.sin(k * 0.8 + j * 1.05 + t * (j % 2 ? -1 : 1) * 0.6); const xx = x + Math.cos(an) * rr, yy = y + Math.sin(an) * rr; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); }

// tegenstroom in het wondernet: twee vaten naast elkaar; o.fase: warm, koud, stroom, warmte, terug, aankomst, verlies
function a_tegenstroom(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const x0 = 330, x1 = 1330, yA = 380, yB = 540, gap = 160; // aanvoer boven (naar rechts), terug onder (naar links)
  // lichaam links, water + kieuwplaatjes rechts
  roundRect(ctx, 60, 250, 250, 420, 30); shape(ctx, rgba(A_WARM, 0.18), rgba(A_WARM, 0.7), 2);
  const wa = o.water == null ? 1 : o.water; roundRect(ctx, 1450, 230, 400, 460, 30); const g = ctx.createLinearGradient(1450, 0, 1850, 0); g.addColorStop(0, '#1F4A7A'); g.addColorStop(1, '#0F2340'); ctx.fillStyle = g; ctx.fill();
  // vetlaag rond het wondernet
  const v = o.vet || 0; if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x0 + 140, yA - 80, x1 - x0 - 180, yB - yA + 160, 60); ctx.strokeStyle = '#F0D27A'; ctx.lineWidth = 20; ctx.stroke(); ctx.restore(); }
  // temperatuur langs de vaten: aanvoer koelt af van 1 → 0.15 over het wondernet; terug warmt op van 0 → 0.85
  const sA = (u) => 1 - 0.85 * clamp((u - 0.15) / 0.75, 0, 1), sB = (u) => 0.85 * (1 - clamp((u - 0.15) / 0.75, 0, 1)); // u = 0 links .. 1 rechts
  const kleur = o.kleur == null ? 1 : o.kleur; // 0 = alles grijs
  const vat = (y, f, ff) => { const n = 60; for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 1) / n; ctx.strokeStyle = kleur > 0.01 ? a_mixC('#8A93A6', a_tempKleur(f((u0 + u1) / 2)), kleur * ff) : '#8A93A6'; ctx.lineWidth = 44; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(x0 + (x1 - x0) * u0, y); ctx.lineTo(x0 + (x1 - x0) * u1 + 1, y); ctx.stroke(); } };
  vat(yA, sA, o.kA == null ? 1 : o.kA); vat(yB, sB, o.kB == null ? 1 : o.kB);
  // verbinding links (lichaam) en lus door kieuwplaatjes rechts
  ctx.lineWidth = 44; ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(1), kleur * (o.kA == null ? 1 : o.kA)); ctx.beginPath(); ctx.moveTo(310, yA); ctx.lineTo(x0, yA); ctx.stroke();
  ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(0.85), kleur * (o.kB == null ? 1 : o.kB)); ctx.beginPath(); ctx.moveTo(310, yB); ctx.lineTo(x0, yB); ctx.stroke();
  ctx.strokeStyle = a_mixC('#8A93A6', a_tempKleur(0.08), kleur); ctx.beginPath(); ctx.moveTo(x1, yA); ctx.lineTo(1560, yA); ctx.arc(1560, (yA + yB) / 2, (yB - yA) / 2, -Math.PI / 2, Math.PI / 2); ctx.lineTo(x1, yB); ctx.stroke();
  // kieuwplaatjes (kam) op de lus in het water
  for (let k = 0; k < 13; k++) { const an = -Math.PI / 2 + Math.PI * k / 12, r0 = (yB - yA) / 2 + 24, r1 = r0 + 110; ctx.strokeStyle = '#D86A6A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1560 + Math.cos(an) * r0, (yA + yB) / 2 + Math.sin(an) * r0); ctx.lineTo(1560 + Math.cos(an) * r1, (yA + yB) / 2 + Math.sin(an) * r1); ctx.stroke(); }
  // stroming: bloedcellen
  const st = o.stroom || 0; if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; const L = x1 - x0; for (let i = 0; i < 14; i++) { const uA = ((i / 14 + t * 0.07) % 1), uB = 1 - ((i / 14 + 0.035 + t * 0.07) % 1);
      ctx.save(); ctx.translate(x0 + L * uA, yA); ctx.scale(1, 0.7); circ(ctx, 0, 0, 14, '#F2F2EE', null); ctx.restore(); pijl(ctx, x0 + L * uA - 6, yA, x0 + L * uA + 10, yA, '#121A26', 0.5, 3, 9);
      ctx.save(); ctx.translate(x0 + L * uB, yB); ctx.scale(1, 0.7); circ(ctx, 0, 0, 14, '#F2F2EE', null); ctx.restore(); pijl(ctx, x0 + L * uB + 6, yB, x0 + L * uB - 10, yB, '#121A26', 0.5, 3, 9); } ctx.restore();
    pijl(ctx, 380, yA - 50, 520, yA - 50, C.text, st, 4, 16); pijl(ctx, 1280, yB + 50, 1140, yB + 50, C.text, st, 4, 16); }
  // warmte van boven naar onder
  const wo = o.warmte || 0; if (wo > 0.01) for (let i = 0; i < 7; i++) { const xx = x0 + 180 + i * 120, u = (xx - x0) / (x1 - x0); a_warmtePijl(ctx, xx, yA + 30, 0, 1, gap - 72, wo * (0.4 + 0.6 * sA(u)), t + i * 0.3, A_WARM, 4); }
  // warmte terug het lichaam in
  const tr = o.terug || 0; if (tr > 0.01) { a_warmtePijl(ctx, 320, yB, -1, 0, 110, tr, t, A_WARM, 6); }
  // klein verlies aan het water
  const vl = o.verlies || 0; if (vl > 0.01) for (let i = 0; i < 3; i++) { const an = -0.6 + i * 0.6; a_warmtePijl(ctx, 1560 + Math.cos(an) * 175, 460 + Math.sin(an) * 175, Math.cos(an), Math.sin(an), 30, vl * 0.8, t + i, '#E0907A', 3); }
  ctx.restore(); }

// cladogram afbeelding 4: (Lampris immaculatus, (lijn 1, ((lijn 2, lijn 3), (lijn 4, lijn 5))))
function a_cladogram(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const tipX = 760; const Y = { l5: 60, l4: 180, l3: 320, l2: 450, l1: 520, lm: 590 };
  const N = { root: [60, 555], n1: [160, 470], n2: [300, 320], n23: [390, 385], n45: [560, 120] }; N.root[1] = (Y.lm + N.n1[1]) / 2; N.n1[1] = (Y.l1 + N.n2[1]) / 2; N.n2[1] = (N.n23[1] + N.n45[1]) / 2; N.n23[1] = (Y.l2 + Y.l3) / 2; N.n45[1] = (Y.l4 + Y.l5) / 2;
  const hl = o.hl || {}, col = (k) => hl[k] > 0.5 ? C.goud : '#E8E8E0', lw = (k) => hl[k] > 0.5 ? 6 : 3.5;
  const tak = (nx, ny, cy, key) => { ctx.strokeStyle = col(key); ctx.lineWidth = lw(key); ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nx, cy); ctx.stroke(); };
  const hor = (x1, x2, yy, key) => { ctx.strokeStyle = col(key); ctx.lineWidth = lw(key); ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.stroke(); };
  ctx.lineCap = 'round';
  hor(0, N.root[0], N.root[1], 'root');
  tak(N.root[0], N.root[1], Y.lm, 'lm'); hor(N.root[0], tipX, Y.lm, 'lm');
  tak(N.root[0], N.root[1], N.n1[1], 'k'); hor(N.root[0], N.n1[0], N.n1[1], 'k');
  tak(N.n1[0], N.n1[1], Y.l1, 'l1'); hor(N.n1[0], tipX, Y.l1, 'l1');
  tak(N.n1[0], N.n1[1], N.n2[1], 'g'); hor(N.n1[0], N.n2[0], N.n2[1], 'g');
  tak(N.n2[0], N.n2[1], N.n23[1], 'g23'); hor(N.n2[0], N.n23[0], N.n23[1], 'g23');
  tak(N.n2[0], N.n2[1], N.n45[1], 'g45'); hor(N.n2[0], N.n45[0], N.n45[1], 'g45');
  tak(N.n23[0], N.n23[1], Y.l2, 'l2'); hor(N.n23[0], tipX, Y.l2, 'l2'); tak(N.n23[0], N.n23[1], Y.l3, 'l3'); hor(N.n23[0], tipX, Y.l3, 'l3');
  tak(N.n45[0], N.n45[1], Y.l4, 'l4'); hor(N.n45[0], tipX, Y.l4, 'l4'); tak(N.n45[0], N.n45[1], Y.l5, 'l5'); hor(N.n45[0], tipX, Y.l5, 'l5');
  // bundeltjes (veel individuen) bij de lijnen
  const bund = { l5: [10, 46], l4: [3, 16], l3: [16, 70], l2: [1, 0], l1: [2, 8] };
  Object.entries(bund).forEach(([k, [n, hh]]) => { if (n < 2) return; ctx.strokeStyle = rgba(hl[k] > 0.5 ? C.goud : '#E8E8E0', 0.7); ctx.lineWidth = 1.5; for (let i = 0; i < n; i++) { const yy = Y[k] - hh / 2 + hh * i / (n - 1); ctx.beginPath(); ctx.moveTo(tipX - 30, Y[k]); ctx.lineTo(tipX - 10, yy); ctx.lineTo(tipX + 4, yy); ctx.stroke(); } });
  const lab = { l5: 'lijn 5', l4: 'lijn 4', l3: 'lijn 3', l2: 'lijn 2', l1: 'lijn 1' };
  Object.entries(lab).forEach(([k, s2]) => text(ctx, s2, tipX + 30, Y[k] + 11, fTekst(32, 600), hl[k] > 0.5 ? C.goud : C.text, 'left'));
  text(ctx, 'Lampris immaculatus', tipX + 30, Y.lm + 11, 'italic 600 32px ' + F.tekst, hl.lm > 0.5 ? C.goud : C.text, 'left');
  // splitsingspunten
  const np = o.nodes || {}; Object.entries(np).forEach(([k, v]) => { if (v <= 0.01) return; const [nx, ny] = N[k]; ctx.save(); ctx.globalAlpha *= v; circ(ctx, nx, ny, 14, C.goud, '#121A26', 2); ctx.restore(); });
  ctx.restore(); return { N, Y, tipX }; }

// kleine iconen voor vraag 8
function a_walvis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(170, 0); ctx.bezierCurveTo(170, -70, 40, -80, -60, -50); ctx.bezierCurveTo(-120, -30, -170, -20, -200, -10); ctx.lineTo(-200, 8); ctx.bezierCurveTo(-140, 30, -40, 60, 60, 55); ctx.bezierCurveTo(140, 50, 170, 30, 170, 0); ctx.closePath(); shape(ctx, '#5A6E8C', '#8FA0B5', 2);
  ctx.beginPath(); ctx.moveTo(-195, 0); ctx.lineTo(-250, -40); ctx.quadraticCurveTo(-230, 0, -250, 40); ctx.closePath(); shape(ctx, '#5A6E8C', '#8FA0B5', 2);
  circ(ctx, 120, -10, 6, '#121A26'); ctx.restore(); }
function a_longen(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -10); ctx.moveTo(0, -10); ctx.lineTo(-20, 5); ctx.moveTo(0, -10); ctx.lineTo(20, 5); ctx.stroke();
  [-1, 1].forEach(d => { ctx.beginPath(); ctx.ellipse(d * 42, 20, 34, 56, d * 0.15, 0, 6.283); shape(ctx, '#E59A9A', '#C97A7A', 2); }); ctx.restore(); }
function a_bloem(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke();
  for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 30, Math.sin(an) * 30, 26, 14, an, 0, 6.283); shape(ctx, '#C98AC0', '#A86AA0', 1.5); } circ(ctx, 0, 0, 16, '#E0B64A');
  const bx = 70 + Math.sin(t * 2) * 12, by = -60 + Math.cos(t * 3) * 8; ctx.beginPath(); ctx.ellipse(bx, by, 22, 14, 0, 0, 6.283); shape(ctx, '#E0B64A', '#121A26', 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 4; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(bx + k * 8, by - 13); ctx.lineTo(bx + k * 8, by + 13); ctx.stroke(); }
  ctx.fillStyle = 'rgba(220,235,245,0.7)'; ctx.beginPath(); ctx.ellipse(bx - 4, by - 20, 12, 8, -0.5, 0, 6.283); ctx.fill(); ctx.restore(); }

// toewijzing lijnen → grootheden (vraag 5); st = [{a (rij zichtbaar), v (grootheid ingevuld), g (groen)}]
const A_GROOT = ['borstvinspier', 'watertemperatuur', 'zwemdiepte'];
function a_toewijzing(ctx, x, y, w, st, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  st.forEach((s, i) => { const ia = s.a == null ? 1 : s.a; if (ia <= 0.01) return; ctx.save(); ctx.globalAlpha *= ia; const yy = y + i * 104, g = s.g || 0, hl = s.hl || 0;
    roundRect(ctx, x, yy, w, 86, 16); shape(ctx, rgba(g > 0.5 ? C.groen : EX.papier, g > 0.5 ? 0.16 : 0.9), g > 0.5 ? C.groen : (hl > 0.5 ? C.goud : EX.papierR), g > 0.5 || hl > 0.5 ? 3 : 2);
    circ(ctx, x + 46, yy + 43, 24, '#22324E', '#F2F2EE', 2); text(ctx, String(i + 1), x + 46, yy + 54, fTekst(30, 700), C.text, 'center');
    const v = s.v || 0; if (v < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - v; text(ctx, '?', x + 100, yy + 56, fTitel(38), C.goud, 'left'); ctx.restore(); }
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; text(ctx, A_GROOT[i], x + 96 + (1 - ease(v)) * 30, yy + 54, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); }
// Examenbespreking vwo 2018-II — tekeningen deel b (s27–s43 eilandjes, s65–s69 waterstofgas, s86–s87 slot). 20 okt 2026.
// Alle namen met prefix b_ (gedeelde film, vier makers).
const b_CE = 'Nieuwe eilandjes voor de alvleesklier', b_CW = 'Biologische productie van waterstofgas', b_CN = 'Wat neem je mee?';
const b_BETA = '#E2B45C', b_BETAR = '#F2D08A', b_ALFA = '#7FC48F', b_TC = '#7FC48F', b_THY = '#E8A0B0', b_BLOED = '#B5574A', b_BLOEDL = '#D88A7E',
  b_GEL = '#5BA4C9', b_AS = '#8FB8E8', b_COMP = '#C9B8F0', b_PURPER = '#A070C8', b_CO2C = '#4A5160', b_O = '#E07A5F', b_NAD = '#5BA4C9', b_NADH = '#E0B64A';
const b_fa = (a) => clamp(a, 0, 1);
function b_A(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel voor één regel tekst/tag tegelijk: rij = [[tekst, tijd, kleur]]; oude weg, dan nieuwe
function b_wisselTag(ctx, t, rij, x, y, px = 32) { let k = -1; rij.forEach((r, i) => { if (t >= r[1]) k = i; }); if (k < 0) return; const u = clamp((t - rij[k][1]) / 0.7, 0, 1);
  if (k > 0 && u < 0.4) tag(ctx, rij[k - 1][0], x, y, rij[k - 1][2], 1 - u / 0.4, 'center', px); if (u > 0.35) tag(ctx, rij[k][0], x, y, rij[k][2], (u - 0.35) / 0.65, 'center', px); }

// ---------- kleine voorwerpen ----------
function b_glucosemeter(ctx, x, y, s = 1, val = '', a = 1, alarm = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.12);
  roundRect(ctx, -34, -58, 68, 100, 14); shape(ctx, '#3E4A63', '#AFC0D0', 2.5); roundRect(ctx, -24, -46, 48, 36, 6); shape(ctx, alarm > 0.5 ? rgba(C.koraal, 0.5) : '#18233A', null);
  if (val) text(ctx, val, 0, -20, fTekst(20, 800), alarm > 0.5 ? '#FFFFFF' : C.teal, 'center'); circ(ctx, 0, 14, 9, '#2A3446', '#8FA0B5', 2); roundRect(ctx, -6, 42, 12, 14, 3); shape(ctx, '#C9D2DE', null); ctx.restore(); }
function b_pen(ctx, x, y, s = 1, a = 1, ang = -0.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -70, -11, 120, 22, 10); shape(ctx, '#E6E1D3', '#9AA3B2', 2); roundRect(ctx, -20, -8, 34, 16, 4); shape(ctx, rgba(C.goud, 0.8), null); roundRect(ctx, 50, -6, 18, 12, 3); shape(ctx, '#9AA3B2', null);
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(68, 0); ctx.lineTo(86, 0); ctx.stroke(); roundRect(ctx, -84, -8, 16, 16, 4); shape(ctx, '#5BA4C9', null); ctx.restore(); }
function b_pomp(ctx, x, y, s = 1, a = 1, t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -46, -30, 92, 60, 12); shape(ctx, '#5B6B88', '#C9D2DE', 2.5); roundRect(ctx, -34, -20, 46, 26, 5); shape(ctx, '#18233A', null);
  text(ctx, 'U/h', -11, -1, fTekst(14, 700), C.teal, 'center'); circ(ctx, 28, -6, 8, '#3A4660', '#AFC0D0', 1.5); circ(ctx, 28, 14, 5, puls > 0.5 && (t * 2 % 1) < 0.5 ? C.goud : '#3A4660');
  ctx.restore(); }
function b_weegschaal(ctx, x, y, w, kg, a = 1, rood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 26, w, 34, 12); shape(ctx, '#C9D2DE', '#8FA0B5', 2);
  roundRect(ctx, x - 52, y - 72, 104, 40, 8); shape(ctx, '#18233A', '#8FA0B5', 2); text(ctx, kg.toFixed(1).replace('.', ',') + ' kg', x, y - 43, fTekst(24, 800), rood > 0.5 ? C.koraal : C.teal, 'center');
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 32); ctx.lineTo(x, y - 26); ctx.stroke(); ctx.restore(); }
function b_co2(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  circ(ctx, -15, 0, 9, b_O, lighten(b_O, 0.3), 1.5); circ(ctx, 15, 0, 9, b_O, lighten(b_O, 0.3), 1.5); circ(ctx, 0, 0, 11, '#6A7282', '#AFB6C2', 1.5); ctx.restore(); }
function b_h2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -7, 0, 8, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 7, 0, 8, '#E6EEF8', '#AFC0D0', 1.5); ctx.restore(); }
function b_insuline(ctx, x, y, r = 9, a = 1) { hormoonVorm(ctx, x, y, r, 'insuline', a); }
function b_antistof(ctx, x, y, s = 1, rot = 0, a = 1, col = b_AS) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-16, -20); ctx.moveTo(0, 0); ctx.lineTo(16, -20); ctx.stroke(); ctx.strokeStyle = lighten(col, 0.4); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-10, -6); ctx.lineTo(-20, -18); ctx.moveTo(10, -6); ctx.lineTo(20, -18); ctx.stroke(); ctx.restore(); }
function b_complement(ctx, x, y, s = 1, a = 1, col = b_COMP) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); for (const [dx, dy] of [[-8, 4], [8, 4], [0, -9]]) circ(ctx, dx, dy, 9, rgba(col, 0.85), lighten(col, 0.3), 1.5); ctx.restore(); }

// ---------- T-cel met receptoren (loodrecht op het membraan); vorm = vorm van het kommetje ----------
function b_receptorTip(ctx, k, vorm) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -9 * k);
  if (vorm === 'vierkant') { ctx.moveTo(-9 * k, -20 * k); ctx.lineTo(-9 * k, -9 * k); ctx.lineTo(9 * k, -9 * k); ctx.lineTo(9 * k, -20 * k); }
  else if (vorm === 'drie') { ctx.moveTo(-10 * k, -21 * k); ctx.lineTo(0, -9 * k); ctx.lineTo(10 * k, -21 * k); }
  else { ctx.moveTo(-10 * k, -20 * k); ctx.quadraticCurveTo(-10 * k, -8 * k, 0, -8 * k); ctx.quadraticCurveTo(10 * k, -8 * k, 10 * k, -20 * k); }
  ctx.stroke(); }
function b_tcel(ctx, x, y, r, t = 0, o = {}) { const { a = 1, vorm = 'rond', gloed = 0, kapot = 0, seed = 3, col = b_TC } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.65 * kapot);
  // lymfocyt: ronde cel, grote kern, een paar Y-vormige receptoren loodrecht op het membraan
  if (gloed > 0.01) { const g = ctx.createRadialGradient(x, y, r, x, y, r * 2.1); g.addColorStop(0, rgba(o.gloedKl || col, 0.4 * gloed)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.fill(); }
  const k = Math.max(0.5, r / 50), n = 4, st = Math.max(12, r * 0.42), arm = Math.max(10, r * 0.34), rc = vorm === 'vierkant' ? C.goud : col;
  ctx.strokeStyle = rc; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(3, 4 * k);
  for (let i = 0; i < n; i++) { const an = -0.6 + i * 6.283 / n + seed * 0.35; ctx.save(); ctx.translate(x + Math.cos(an) * r * 0.97, y + Math.sin(an) * r * 0.95); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -st); ctx.moveTo(0, -st); ctx.lineTo(-arm * 0.8, -st - arm); ctx.moveTo(0, -st); ctx.lineTo(arm * 0.8, -st - arm); ctx.stroke();
    for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * arm * 0.8, -st - arm); ctx.scale(0.5 * k, 0.5 * k); b_receptorTip(ctx, 1, vorm); ctx.restore(); } ctx.restore(); }
  blob(ctx, x, y, r, r * 0.96, 0.03, seed, t); shape(ctx, rgba(col, 0.28 + 0.15 * gloed), col, 2.5);
  circ(ctx, x + r * 0.04, y, r * 0.66, rgba(C.kern, 0.75), C.kernR, 1.8);
  if (kapot > 0.01) { ctx.strokeStyle = rgba('#121A26', 0.8 * kapot); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - r * 0.5, y - r * 0.7); ctx.lineTo(x - r * 0.1, y); ctx.lineTo(x - r * 0.4, y + r * 0.7); ctx.stroke(); }
  ctx.restore(); }

// ---------- verbranding van waterstofgas: H2 + O2 -> vlam -> H2O (groot en centraal) ----------
function b_o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -9, 0, 10, '#E8806E', '#F2A898', 1.5); circ(ctx, 9, 0, 10, '#E8806E', '#F2A898', 1.5); ctx.restore(); }
function b_h2o(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); circ(ctx, -15, 14, 7, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 15, 14, 7, '#E6EEF8', '#AFC0D0', 1.5); circ(ctx, 0, -2, 11, '#E8806E', '#F2A898', 1.5); ctx.restore(); }
function b_vlam(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  [[1, C.koraal, 0.75], [0.72, C.goud, 0.85], [0.42, '#FFF3C8', 0.95]].forEach(([k, col, al], i) => { const f = 1 + 0.08 * Math.sin(t * 9 + i * 2), w = 1 + 0.06 * Math.sin(t * 7 + i);
    ctx.beginPath(); ctx.moveTo(0, 70 * k); ctx.bezierCurveTo(-70 * k * w, 40 * k, -50 * k, -20 * k, -8 * k, -95 * k * f); ctx.bezierCurveTo(0, -50 * k, 14 * k, -50 * k, 24 * k, -30 * k); ctx.bezierCurveTo(60 * k, -10 * k, 70 * k * w, 40 * k, 0, 70 * k); ctx.closePath(); shape(ctx, rgba(col, al), null, 0); });
  ctx.restore(); }
function b_verbranding(ctx, t, cx, cy, o = {}) { const { a = 1, vb = 0, wa = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const e = ease(clamp(vb, 0, 1)); const hs = 3.4;
  for (let i = 0; i < 2; i++) { const w = wander(i + 90, t, 10, 0.6); b_h2(ctx, lerp(cx - 430, cx - 70, e) + w.x, lerp(cy - 80 + i * 160, cy - 20 + i * 40, e) + w.y, hs, 1 - wa); }
  { const w = wander(95, t, 10, 0.6); b_o2(ctx, lerp(cx + 430, cx + 70, e) + w.x, cy + w.y, hs, 1 - wa); }
  if (vb > 0.3) b_vlam(ctx, cx, cy - 20, 1.7 * clamp((vb - 0.3) / 0.5, 0, 1) * (1 - wa), t, 1 - wa);
  if (wa > 0.01) { b_h2o(ctx, cx - 120, cy, 3.2, wa); b_h2o(ctx, cx + 120, cy, 3.2, wa); }
  ctx.restore(); }

// ---------- alvleesklier en eilandje van Langerhans ----------
function b_alvleesklier(ctx, x, y, s = 1, a = 1, o = {}) { const { hl = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, -10); ctx.bezierCurveTo(-200, -70, -110, -90, -70, -50); ctx.bezierCurveTo(-20, -30, 60, -46, 130, -40); ctx.bezierCurveTo(190, -36, 214, -10, 196, 8); ctx.bezierCurveTo(170, 30, 80, 14, 20, 26); ctx.bezierCurveTo(-40, 38, -80, 70, -130, 56); ctx.bezierCurveTo(-180, 44, -160, 20, -170, -10); ctx.closePath();
  shape(ctx, rgba('#D9A06A', 0.35), '#E2B88A', 3);
  ctx.save(); ctx.clip(); for (let i = 0; i < 40; i++) { const px = -170 + hash(i * 5) * 360, py = -60 + hash(i * 5 + 1) * 120; circ(ctx, px, py, 9 + 5 * hash(i * 5 + 2), rgba('#E2B88A', 0.16)); } ctx.restore();
  for (let i = 0; i < 7; i++) { const px = -120 + i * 45 + 10 * Math.sin(i * 3), py = -8 + 14 * Math.sin(i * 1.7); circ(ctx, px, py, 7, rgba(b_BETA, 0.85), b_BETAR, 1.5); }
  if (hl > 0.01) { const p = 1 + 0.08 * Math.sin(t * 4); circ(ctx, 15, -1, 22 * p, null, rgba(C.goud, hl), 4); }
  ctx.restore(); }
// eilandje (close-up in een cirkel): bètacellen (oker) en alfacellen (groen) rond een haarvat; insuline gaat het bloed in
// o: {ins 0..1, tc 0..1 (T-cellen vallen aan), kapot 0..1 (alle bètacellen weg), gluca 0..1 (alfacellen geven glucagon af)}
const b_EIL = (() => { const P = []; let i = 0; while (P.length < 22 && i < 400) { i++; const an = hash(i * 7 + 1) * 6.283, d = 0.18 + Math.sqrt(hash(i * 7 + 2)) * 0.62; const px = Math.cos(an) * d, py = Math.sin(an) * d * 0.9;
  const cy = 0.1 - px * 0.08; if (Math.abs(py - cy) < 0.14) continue; if (P.some(p => Math.hypot(p[0] - px, p[1] - py) < 0.2)) continue; P.push([px, py, P.length % 5 === 4 ? 'a' : 'b']); } return P; })();
function b_haarvatPunt(x, y, r, u) { const p0 = [x - r * 1.1, y + r * 0.2], p1 = [x - r * 0.3, y - r * 0.1], p2 = [x + r * 0.35, y + r * 0.25], p3 = [x + r * 1.1, y - r * 0.05]; const m = 1 - u;
  return [m * m * m * p0[0] + 3 * m * m * u * p1[0] + 3 * m * u * u * p2[0] + u * u * u * p3[0], m * m * m * p0[1] + 3 * m * m * u * p1[1] + 3 * m * u * u * p2[1] + u * u * u * p3[1]]; }
function b_eiland(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, tc = 0, kapot = 0, gluca = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#1C2638'; ctx.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4);
  for (let i = 0; i < 30; i++) { const px = x - r + hash(i * 9 + 3) * 2 * r, py = y - r + hash(i * 9 + 4) * 2 * r; circ(ctx, px, py, r * 0.09, rgba('#D9A06A', 0.08), rgba('#D9A06A', 0.18), 1); }
  blob(ctx, x, y, r * 0.86, r * 0.78, 0.05, 5, t); shape(ctx, rgba(b_BETA, 0.07), rgba(b_BETAR, 0.6), 2);
  // haarvat
  ctx.strokeStyle = rgba(b_BLOED, 0.55); ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const p = b_haarvatPunt(x, y, r, k / 30); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
  for (let k = 0; k < 7; k++) { const u = (t * 0.12 + k / 7) % 1, p = b_haarvatPunt(x, y, r, u); ctx.beginPath(); ctx.ellipse(p[0], p[1], r * 0.045, r * 0.03, 0.3, 0, 6.283); ctx.fillStyle = b_BLOEDL; ctx.fill(); }
  // cellen
  b_EIL.forEach((c, i) => { const cx = x + c[0] * r, cy = y + c[1] * r, cr = r * 0.095; const isA = c[2] === 'a';
    let kp = 0; if (!isA) { const tgt = i % 3 === 0 ? clamp((tc - 0.55 - (i % 6) * 0.03) / 0.35, 0, 1) : 0; kp = Math.max(tgt, clamp(kapot * 1.3 - (i % 4) * 0.1, 0, 1)); }
    ctx.save(); ctx.globalAlpha *= 1 - 0.8 * kp; const col = isA ? b_ALFA : b_BETA, cr2 = cr * (1 - 0.35 * kp);
    ctx.beginPath(); for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283 + i; const rr = cr2 * (1 + 0.12 * Math.sin(k * 2.3 + i)); k ? ctx.lineTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr) : ctx.moveTo(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr); } ctx.closePath();
    shape(ctx, rgba(col, 0.32 + (isA ? 0.3 * gluca : 0)), kp > 0.5 ? rgba('#8A8F9A', 0.8) : col, 2); circ(ctx, cx, cy, cr2 * 0.38, rgba(C.kern, 0.7), C.kernR, 1);
    if (kp > 0.3) for (let f = 0; f < 4; f++) circ(ctx, cx + Math.cos(f * 1.6 + i) * cr * (0.8 + kp), cy + Math.sin(f * 1.6 + i) * cr * (0.8 + kp), 3, rgba('#9AA3B2', kp));
    ctx.restore();
    // insuline: uit de bètacel naar het haarvat en mee met het bloed
    if (!isA && ins > 0.01 && kp < 0.9) for (let m = 0; m < 2; m++) { const ph = (t * 0.28 + hash(i * 3 + m * 11)) % 1; const uu = clamp((c[0] + 1.1) / 2.2, 0, 1); const hp = b_haarvatPunt(x, y, r, uu);
      let px, py; if (ph < 0.5) { const e = ease(ph / 0.5); px = lerp(cx, hp[0], e); py = lerp(cy, hp[1], e); } else { const hp2 = b_haarvatPunt(x, y, r, Math.min(1, uu + (ph - 0.5) * 0.9)); px = hp2[0]; py = hp2[1]; }
      b_insuline(ctx, px, py, r * 0.03, ins * (1 - kp) * Math.min(1, ph * 6)); }
    if (isA && gluca > 0.01) for (let m = 0; m < 2; m++) { const ph = (t * 0.3 + hash(i * 5 + m * 7)) % 1; const uu = clamp((c[0] + 1.1) / 2.2, 0, 1); const hp = b_haarvatPunt(x, y, r, Math.min(1, uu + ph * 0.5)); const e = ease(Math.min(1, ph * 2));
      hormoonVorm(ctx, lerp(cx, hp[0], e), lerp(cy, hp[1], e), r * 0.032, 'glucagon', gluca * Math.min(1, ph * 6), C.groen); }
  });
  // T-cellen die de bètacellen aanvallen
  if (tc > 0.01) { const doelen = b_EIL.map((c, i) => [c, i]).filter(([c, i]) => c[2] === 'b' && i % 3 === 0).slice(0, 4);
    doelen.forEach(([c, i], k) => { const an = Math.atan2(c[1], c[0]); const sx = x + Math.cos(an) * r * 1.35, sy = y + Math.sin(an) * r * 1.35; const ex = x + c[0] * r + Math.cos(an) * r * 0.16, ey = y + c[1] * r + Math.sin(an) * r * 0.16;
      const u = ease(clamp(tc * 1.6 - k * 0.12, 0, 1)); b_tcel(ctx, lerp(sx, ex, u), lerp(sy, ey, u), r * 0.11, t, { vorm: 'vierkant', seed: k + 2, gloed: clamp(tc * 2 - 1, 0, 1) }); }); }
  ctx.restore(); }
function b_zoomRing(ctx, x, y, r, a, fn, col = b_BETAR) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); fn(); ctx.restore(); circ(ctx, x, y, r, null, col, 3); ctx.restore(); }

// ---------- thymus ----------
function b_thymus(ctx, x, y, s = 1, a = 1, o = {}) { const { ins = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 8, -120); ctx.bezierCurveTo(sx * 70, -130, sx * 100, -40, sx * 92, 40); ctx.bezierCurveTo(sx * 86, 110, sx * 50, 140, sx * 10, 120); ctx.bezierCurveTo(sx * 0, 60, sx * 4, -40, sx * 8, -120); ctx.closePath(); shape(ctx, rgba(b_THY, 0.22), b_THY, 3);
    for (let k = 0; k < 6; k++) { const py = -90 + k * 38, px = sx * (40 + 14 * Math.sin(k * 1.9)); ctx.beginPath(); ctx.ellipse(px, py, 26, 17, 0.2 * sx, 0, 6.283); ctx.strokeStyle = rgba(b_THY, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
      if (ins > 0.01) { const ph = (t * 0.6 + k * 0.37 + (sx > 0 ? 0.5 : 0)) % 1; b_insuline(ctx, px + Math.cos(ph * 6.283) * 10, py + Math.sin(ph * 6.283) * 6, 6, ins * (0.5 + 0.5 * Math.sin(ph * 3.14))); } } }
  ctx.restore(); }
// thymuscel die lichaamseigen stukjes (hier insuline, goud) op het oppervlak laat zien: basis op de wand, loodrecht naar buiten
function b_thymusCel(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.95, 0.04, 7, t); shape(ctx, rgba(b_THY, 0.22), b_THY, 3); circ(ctx, x - r * 0.1, y + r * 0.05, r * 0.42, rgba(C.kern, 0.6), C.kernR, 1.5);
  for (let i = 0; i < n; i++) { const an = i * 6.283 / n + 0.2, nx = Math.cos(an), ny = Math.sin(an); const bx = x + nx * r, by = y + ny * r * 0.95;
    ctx.save(); ctx.globalAlpha *= ins; ctx.strokeStyle = b_THY; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + nx * 14, by + ny * 14); ctx.stroke();
    ctx.translate(bx + nx * 24, by + ny * 24); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -9, -9, 18, 18, 4); shape(ctx, rgba(C.goud, 0.9), lighten(C.goud, 0.3), 1.5); ctx.restore(); }
  ctx.restore(); }

// ---------- cellen en bloed ----------
// bloedvat: horizontale band met stromende rode bloedcellen
function b_bloedvat(ctx, x0, x1, y, h, t, a = 1, o = {}) { const { snel = 60, n = 10 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, x1 - x0, h, h / 2); shape(ctx, rgba(b_BLOED, 0.2), null); ctx.strokeStyle = rgba(b_BLOEDL, 0.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + h / 2, y - h / 2); ctx.lineTo(x1 - h / 2, y - h / 2); ctx.moveTo(x0 + h / 2, y + h / 2); ctx.lineTo(x1 - h / 2, y + h / 2); ctx.stroke();
  const L = x1 - x0 - h; for (let i = 0; i < n; i++) { const px = x0 + h / 2 + ((t * snel + hash(i * 3) * L) % L), py = y + (hash(i * 3 + 1) - 0.5) * h * 0.55; ctx.beginPath(); ctx.ellipse(px, py, h * 0.13, h * 0.08, 0.4 * Math.sin(i), 0, 6.283); ctx.fillStyle = rgba(b_BLOEDL, 0.75); ctx.fill(); }
  ctx.restore(); }
// lichaamscel met glucosetransporter, mitochondrion, vetdruppel en eiwitketen
// o: {ins (insulinereceptor bezet), opname 0..1, vet 0..1 (1=vol), eiwit 0..1 (1=heel), brand 0..1 (verbranding zichtbaar), honger 0..1}
function b_lichaamscel(ctx, x, y, r, t, o = {}) { const { a = 1, ins = 1, opname = 1, vet = 1, eiwit = 1, brand = 0, honger = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.86, 0.03, 3, t); shape(ctx, rgba(HK.cel, 0.12), rgba(HK.cel, 0.9), 3); blob(ctx, x, y, r - 9, r * 0.86 - 9, 0.03, 3, t); ctx.strokeStyle = rgba(HK.cel, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
  for (let i = 0; i < 26; i++) { const an = hash(i * 13) * 6.283, d = Math.sqrt(hash(i * 13 + 1)) * r * 0.75; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d * 0.86, 2, rgba(HK.cel, 0.25)); }
  circ(ctx, x + r * 0.42, y + r * 0.22, r * 0.2, rgba(C.kern, 0.55), C.kernR, 1.5);
  mitochondrion(ctx, x - r * 0.05, y + r * 0.42, r * 0.42, -0.2, 1, 5, t);
  if (brand > 0.01) { for (let k = 0; k < 4; k++) { const ph = (t * 1.3 + k / 4) % 1; circ(ctx, x - r * 0.05 + (k - 1.5) * 16, y + r * 0.42 - 26 - ph * 30, 5 * (1 - ph), rgba(C.koraal, brand * (1 - ph))); } }
  // vetdruppel
  const vr = r * 0.2 * Math.sqrt(Math.max(0.05, vet)); circ(ctx, x - r * 0.45, y + r * 0.05, vr, rgba('#E8C66A', 0.55), '#F0D88A', 2);
  // eiwitketen (kralen); breekt bij afbraak
  for (let k = 0; k < 9; k++) { const brk = k >= Math.round(9 * eiwit); const px = x + r * 0.05 + k * r * 0.07 + (brk ? (k % 2 ? 8 : -6) * (1 - eiwit) * 3 : 0), py = y - r * 0.2 + Math.sin(k * 1.2) * r * 0.06 + (brk ? (k % 3 - 1) * 14 * (1 - eiwit) : 0);
    circ(ctx, px, py, r * 0.035, rgba(['#7FC48F', '#E07A5F', '#8C7BBF'][k % 3], brk ? 0.5 : 0.9), null); }
  // insulinereceptor + glucosekanaal bovenaan
  const kx = x - r * 0.15, ky = y - r * 0.86 + 4; roundRect(ctx, kx - 13, ky - 16, 26, 32, 6); shape(ctx, rgba(C.teal, 0.35 + 0.5 * opname), C.teal, 2);
  receptor(ctx, x + r * 0.32, y - r * 0.82, -Math.PI / 2 - 0.25, 'insuline', ins, 1, 0.9);
  if (honger > 0.01) { b_A(ctx, honger, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); blob(ctx, x, y, r + 12, r * 0.86 + 12, 0.03, 3, t); ctx.stroke(); ctx.setLineDash([]); }); }
  ctx.restore(); return { kanaal: { x: kx, y: ky } }; }

// ---------- ADH en nier ----------
// verzamelbuis (beige) naast een haarvat (rood); ADH zet waterkanaaltjes in; water stroomt terug naar het bloed
function b_verzamelbuis(ctx, x, y, h, t, o = {}) { const { a = 1, adh = 0, res = 0.2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const bx = x - 70, vx = x + 70; roundRect(ctx, bx - 38, y - h / 2, 76, h, 34); shape(ctx, rgba('#E6D8A8', 0.16), '#E6D8A8', 4);
  roundRect(ctx, vx - 26, y - h / 2, 52, h, 24); shape(ctx, rgba(b_BLOED, 0.25), b_BLOEDL, 3);
  for (let i = 0; i < 6; i++) { const py = y - h / 2 + 30 + ((t * 70 + i * h / 6) % (h - 60)); circ(ctx, bx + 6 * Math.sin(i * 2), py, 5, rgba(C.teal, 0.7)); }
  for (let i = 0; i < 5; i++) { const py = y + h / 2 - 30 - ((t * 60 + i * h / 5) % (h - 60)); ctx.beginPath(); ctx.ellipse(vx, py, 11, 7, 0.3, 0, 6.283); ctx.fillStyle = rgba(b_BLOEDL, 0.7); ctx.fill(); }
  // waterkanaaltjes in de wand
  for (let k = 0; k < 5; k++) { const py = y - h / 2 + 60 + k * (h - 120) / 4; const on = clamp(adh * 5 - k, 0, 1); roundRect(ctx, bx + 30, py - 9, 16, 18, 4); shape(ctx, rgba(C.teal, 0.2 + 0.7 * on), rgba(C.teal, 0.4 + 0.6 * on), 1.5);
    const n = Math.round(1 + res * 3); for (let m = 0; m < n; m++) { const ph = (t * 0.9 + m / n + k * 0.13) % 1; circ(ctx, lerp(bx + 10, vx - 14, ph), py + Math.sin(ph * 6) * 4, 5, rgba(C.teal, (0.2 + 0.8 * res) * Math.sin(ph * Math.PI))); } }
  ctx.restore(); }
function b_beker(ctx, x, y, w, h, niveau, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = h * clamp(niveau, 0, 1);
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.lineTo(x + w / 2, y - h); ctx.closePath(); ctx.fillStyle = rgba('#AFC0D0', 0.1); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#E6CF6A', 0.6); ctx.fillRect(x - w / 2, y - lh, w, lh); ctx.restore();
  ctx.strokeStyle = '#C9D2DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 6, y - k * h / 4); ctx.lineTo(x - w / 2 + 22, y - k * h / 4); ctx.stroke(); }
  if (label) text(ctx, label, x, y + 36, fTekst(26, 700), C.text2, 'center'); ctx.restore(); }
// hersenen met hypothalamus en hypofyse (zijaanzicht, voorkant links)
function b_brein(ctx, x, y, s, a = 1, o = {}) { const { hyp = 0, t = 0 } = o; if (a <= 0.01) return; brein(ctx, x, y, s, a, {});
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const p = 1 + 0.1 * Math.sin(t * 5) * hyp;
  if (hyp > 0.01) { circ(ctx, 20, 92, 46 * p, rgba(C.goud, 0.18 * hyp)); }
  ctx.beginPath(); ctx.ellipse(20, 92, 30, 18, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.25 + 0.5 * hyp), C.goud, 3);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(20, 108); ctx.lineTo(24, 138); ctx.stroke(); circ(ctx, 26, 150, 16, rgba(C.goud, 0.4 + 0.4 * hyp), C.goud, 3);
  ctx.restore(); }

// ---------- afbeelding 1 (insulineactiviteit, uit pdf o-08) ----------
const b_AF1_SNEL = [[0, 2, 4.45, 0.88], [4.4, 7.25, 10.1, 0.63], [10.05, 12.3, 14.6, 1.0]];
const b_AF1_LANG = [[0, 7.9, 16.6, 0.37], [12, 18, 24, 0.30]];
function b_boog(ctx, X, Y, b, prog) { const [t0, tp, t1, hp] = b; const N = 60; ctx.beginPath(); for (let k = 0; k <= N; k++) { const tt = t0 + (t1 - t0) * k / N * prog; const v = tt <= tp ? hp * Math.sin(Math.PI / 2 * (tt - t0) / (tp - t0)) : hp * Math.sin(Math.PI / 2 * (t1 - tt) / (t1 - tp)); k ? ctx.lineTo(X(tt), Y(Math.max(0, v))) : ctx.moveTo(X(tt), Y(Math.max(0, v))); } ctx.stroke(); }
function b_afb1(ctx, x, y, w, h, o = {}) { const { a = 1, snel = 1, lang = 1, ax = 1, hl = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const gx = x + 90, gw = w - 140, base = y + h - 170, top = y + 80; const X = (hr) => gx + gw * hr / 24, Y = (v) => base - (base - top) * v;
  ctx.save(); ctx.globalAlpha *= ax; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, top - 10); ctx.lineTo(gx, base); ctx.lineTo(gx + gw, base); ctx.stroke();
  metaText(ctx, 'insulineactiviteit', gx + gw, top - 30, C.text2, 'right', 18);
  ['08:00', '12:00', '16:00', '20:00', '24:00', '04:00', '08:00'].forEach((s, i) => { ctx.beginPath(); ctx.moveTo(X(i * 4), base); ctx.lineTo(X(i * 4), base + 8); ctx.stroke(); text(ctx, s, X(i * 4), base + 36, fTekst(24, 600), C.text2, 'center'); });
  metaText(ctx, 'tijdstip →', gx + gw, base + 72, C.text2, 'right', 18);
  text(ctx, 'ontbijt', X(0), base + 140, fTekst(22, 600), C.text2, 'center'); text(ctx, 'lunch', X(4.33), base + 140, fTekst(22, 600), C.text2, 'center'); text(ctx, 'avondeten', X(10), base + 140, fTekst(22, 600), C.text2, 'center'); ctx.restore();
  // injectiepijltjes: doorgetrokken = snelwerkend (goud), gestippeld = langzaam werkend (teal)
  [0, 4.33, 10].forEach((hr, i) => { const pa = clamp(snel * 4 - i * 0.6, 0, 1); b_A(ctx, pa, () => pijl(ctx, X(hr), base + 108, X(hr), base + 52, C.goud, 1, 3, 12)); });
  [0, 12].forEach((hr, i) => { const pa = clamp(lang * 3 - i * 0.6, 0, 1); const xx = X(hr) + (hr === 0 ? 16 : 0); b_A(ctx, pa, () => { ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, base + 108); ctx.lineTo(xx, base + 60); ctx.stroke(); ctx.restore(); pijl(ctx, xx, base + 62, xx, base + 52, C.teal, 1, 3, 12); }); });
  ctx.lineCap = 'round'; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; b_AF1_SNEL.forEach((b, i) => { const p = clamp(snel * 3 - i, 0, 1); if (p > 0.001) { ctx.save(); if (hl >= 0 && hl !== i) ctx.globalAlpha *= 0.35; b_boog(ctx, X, Y, b, p); ctx.restore(); } });
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4.5; ctx.setLineDash([14, 10]); b_AF1_LANG.forEach((b, i) => { const p = clamp(lang * 2 - i, 0, 1); if (p > 0.001) b_boog(ctx, X, Y, b, p); }); ctx.setLineDash([]);
  ctx.restore(); return { X, Y, base, top }; }
// schets bloedglucose over 24 uur (geen examenfiguur): overdag schommelend, 's nachts te laag, vroeg in de ochtend stijgend
function b_glucWaarde(hr) { const pts = [[0, 6.5], [2, 9], [4.4, 6.2], [6.5, 8.6], [10, 6], [12, 8.5], [15, 6], [17.5, 4.2], [19, 3.6], [21, 4.6], [24, 7.6]]; for (let i = 1; i < pts.length; i++) if (hr <= pts[i][0]) { const [a0, b0] = pts[i - 1], [a1, b1] = pts[i]; const u = (hr - a0) / (a1 - a0); return lerp(b0, b1, (1 - Math.cos(u * Math.PI)) / 2); } return 7.6; }
function b_glucSchets(ctx, X, y, h, prog, o = {}) { const { a = 1, laag = 0, stijg = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const Y = (v) => y + h - h * (v - 2) / 9;
  ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fillRect(X(16), y - 10, X(23) - X(16), h + 20);
  ctx.strokeStyle = rgba(C.groen, 0.5); ctx.setLineDash([6, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0), Y(4)); ctx.lineTo(X(24), Y(4)); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.beginPath(); const N = 120; for (let k = 0; k <= N * prog; k++) { const hr = 24 * k / N; k ? ctx.lineTo(X(hr), Y(b_glucWaarde(hr))) : ctx.moveTo(X(hr), Y(b_glucWaarde(hr))); } ctx.stroke();
  if (laag > 0.01) { circ(ctx, X(19), Y(3.6), 22, null, rgba(C.teal, laag), 4); }
  if (stijg > 0.01) { ctx.save(); ctx.globalAlpha *= stijg; pijl(ctx, X(21.2), Y(4.2), X(23.6), Y(7.6) - 6, C.goud, 1, 5, 18); ctx.restore(); }
  metaText(ctx, 'bloedglucose (schets)', X(0), y - 18, C.text2, 'left', 18); ctx.restore(); return Y; }
function b_maan(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0.6, 5.7); ctx.arc(x + r * 0.45, y - r * 0.15, r * 0.8, 5.2, 1.1, true); ctx.closePath(); ctx.fillStyle = '#E6E1D3'; ctx.fill(); ctx.restore(); }

// ---------- afbeelding 2 (insulinepompje, uit pdf o-09) ----------
// afgifte in pdf-pixels boven de nul (19 = basaal), tijden in uren na 08:00
const b_AF2_STAP = [[-0.2, 38], [0.22, 157], [0.55, 19], [4.03, 113], [4.28, 19], [10.07, 58], [12.0, 19], [18.85, 38], [24, 38]];
const b_AF2_GLUC = [[0, 5.0], [0.9, 6.9], [1.85, 8.6], [2.8, 7.4], [4.0, 6.3], [5.2, 7.4], [6.35, 7.9], [8.15, 7.4], [10.1, 6.4], [11.2, 7.8], [12.15, 8.8], [13.4, 8.2], [14.8, 7.1], [17, 5.5], [20.3, 5.05], [24, 5.0]];
function b_afgifte(hr) { let v = 38; for (const [h0, val] of b_AF2_STAP) if (hr >= h0) v = val; return v; }
// o: lijn 0..1 (afgiftelijn van links naar rechts), bolus 0..1 (hoogte maaltijdbolussen), gluc 0..1, onder (alpha onderste grafiek), dimTop/dimBot,
//    hlL/hlA (oppervlak lunch/avondeten), hlN (basaalverhoging vanaf 03:00), lijn10, ochtend, maat (hoogte × tijd)
function b_afb2(ctx, x, y, w, o = {}) { const { a = 1, lijn = 1, bolus = 1, gluc = 1, onder = 1, hlL = 0, hlA = 0, hlN = 0, lijn10 = 0, ochtend = 0, maat = 0, dimTop = 0, dimBot = 0, t = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const gx = x + 96, gw = w - 130, X = (hr) => gx + gw * clamp(hr, -0.2, 24) / 24;
  const t0 = y + 40, t1 = y + 210, Yt = (v) => t1 - (t1 - t0) * v / 165;
  const b0 = y + 310, b1 = y + 570, Yb = (v) => b1 - (b1 - b0) * v / 20;
  const av = (hr) => { const v = b_afgifte(hr); return (hr > 0.1 && hr < 18.8 && v > 19) ? 19 + (v - 19) * bolus : v; };
  // bovenste grafiek
  ctx.save(); ctx.globalAlpha *= 1 - 0.65 * dimTop; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, t0 - 6); ctx.lineTo(gx, t1 + 20); ctx.lineTo(gx + gw, t1 + 20); ctx.stroke();
  for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(X(i * 4), t1 + 20); ctx.lineTo(X(i * 4), t1 + 28); ctx.stroke(); }
  metaText(ctx, 'insuline-afgifte', gx + gw, t0 + 6, C.text2, 'right', 18);
  text(ctx, 'ontbijt', X(0.3), t1 + 56, fTekst(22, 600), C.text2, 'center'); text(ctx, 'lunch', X(4.15), t1 + 56, fTekst(22, 600), C.text2, 'center'); text(ctx, 'avondeten', X(11), t1 + 56, fTekst(22, 600), C.text2, 'center');
  const vlak = (h0, h1, col, u) => { if (u <= 0.01) return; const yy = Yt(av((h0 + h1) / 2)); ctx.save(); ctx.globalAlpha *= u; ctx.fillStyle = rgba(col, 0.5); ctx.fillRect(X(h0), yy, X(h1) - X(h0), t1 - yy); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.strokeRect(X(h0), yy, X(h1) - X(h0), t1 - yy); ctx.restore(); };
  vlak(4.03, 4.28, C.goud, hlL); vlak(10.07, 12.0, C.koraal, hlA);
  if (hlN > 0.01) { ctx.save(); ctx.globalAlpha *= hlN; ctx.fillStyle = rgba(C.teal, 0.3); ctx.fillRect(X(18.85), Yt(38), X(24) - X(18.85), t1 - Yt(38)); ctx.restore(); }
  if (lijn > 0.001) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineJoin = 'miter'; ctx.beginPath(); const hEnd = -0.2 + 24.2 * lijn; let py0 = null;
    for (let k = 0; k <= 968; k++) { const hr = -0.2 + 0.025 * k; if (hr > hEnd) break; const px = X(hr), py = Yt(av(hr)); if (py0 === null) ctx.moveTo(px, py); else if (py !== py0) { ctx.lineTo(px, py0); ctx.lineTo(px, py); } else ctx.lineTo(px, py); py0 = py; } ctx.stroke(); }
  if (hlN > 0.01) { const p = 1 + 0.08 * Math.sin(t * 4); circ(ctx, X(18.85), Yt(28), 24 * p, null, rgba(C.teal, hlN), 4); }
  if (maat > 0.01) { ctx.save(); ctx.globalAlpha *= maat; const xa = X(10.07), xb = X(12.0), ya = Yt(58); ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(xa, t1 + 6); ctx.lineTo(xb, t1 + 6); ctx.moveTo(xa, t1); ctx.lineTo(xa, t1 + 12); ctx.moveTo(xb, t1); ctx.lineTo(xb, t1 + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xb + 14, ya); ctx.lineTo(xb + 14, t1); ctx.moveTo(xb + 8, ya); ctx.lineTo(xb + 20, ya); ctx.moveTo(xb + 8, t1); ctx.lineTo(xb + 20, t1); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // onderste grafiek
  if (onder > 0.01) { ctx.save(); ctx.globalAlpha *= onder * (1 - 0.65 * dimBot); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, b0 - 10); ctx.lineTo(gx, b1); ctx.lineTo(gx + gw, b1); ctx.stroke();
    [0, 5, 10, 15, 20].forEach(v => { ctx.beginPath(); ctx.moveTo(gx - 8, Yb(v)); ctx.lineTo(gx, Yb(v)); ctx.stroke(); text(ctx, String(v), gx - 16, Yb(v) + 8, fTekst(22, 600), C.text2, 'right'); });
    ['08:00', '12:00', '16:00', '20:00', '24:00', '04:00', '08:00'].forEach((s, i) => { ctx.beginPath(); ctx.moveTo(X(i * 4), b1); ctx.lineTo(X(i * 4), b1 + 8); ctx.stroke(); text(ctx, s, X(i * 4), b1 + 34, fTekst(22, 600), C.text2, 'center'); });
    metaText(ctx, 'bloedglucose (mmol/L)', gx + 18, b0 - 4, C.text2, 'left', 18);
    ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(gx, Yb(7.1)); ctx.lineTo(gx + gw, Yb(7.1)); ctx.stroke(); ctx.setLineDash([]);
    if (ochtend > 0.01) { ctx.save(); ctx.globalAlpha *= ochtend; ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(X(18.85), b0, X(24) - X(18.85), b1 - b0); ctx.restore(); }
    if (gluc > 0.001) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; const P = gladC(b_AF2_GLUC.map(([h, v]) => [X(h), Yb(v)])); const m = Math.max(2, Math.round(P.length * gluc));
      ctx.beginPath(); for (let k = 0; k < m; k++) k ? ctx.lineTo(P[k][0], P[k][1]) : ctx.moveTo(P[k][0], P[k][1]); ctx.stroke();
      if (ochtend > 0.01) { ctx.save(); ctx.globalAlpha *= ochtend; ctx.strokeStyle = C.groen; ctx.lineWidth = 7; ctx.beginPath(); let f = true; for (const p of P) if (p[0] >= X(18.85)) { f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); f = false; } ctx.stroke(); ctx.restore(); } }
    if (lijn10 > 0.01) { ctx.save(); ctx.globalAlpha *= lijn10; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.moveTo(gx, Yb(10)); ctx.lineTo(gx + gw, Yb(10)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '10', gx + gw + 8, Yb(10) + 8, fTekst(24, 800), C.koraal, 'left'); ctx.restore(); }
    ctx.restore(); }
  ctx.restore(); return { X, Yt, Yb, t0, t1, b0, b1, gx, gw }; }

// ---------- gelcapsule ('theezakje') ----------
function b_theezakje(ctx, x, y, w, h, t, o = {}) { const { a = 1, cellen = 1, porie = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rand = (yy, dir) => { for (let k = 0; k <= 14; k++) { const px = x - w / 2 + w * k / 14, py = yy + (k % 2 ? 9 : 0) * dir; k ? ctx.lineTo(px, py) : ctx.lineTo(px, py); } };
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); rand(y - h / 2, -1); ctx.lineTo(x + w / 2, y + h / 2); for (let k = 14; k >= 0; k--) { const px = x - w / 2 + w * k / 14, py = y + h / 2 + (k % 2 ? 9 : 0); ctx.lineTo(px, py); } ctx.closePath();
  shape(ctx, rgba(b_GEL, 0.2), rgba(b_GEL, 0.95), 3.5);
  ctx.save(); ctx.clip(); for (let i = 0; i < 70; i++) { const px = x - w / 2 + hash(i * 3 + 7) * w, py = y - h / 2 + hash(i * 3 + 8) * h; circ(ctx, px, py, 2.2 + porie * 2, rgba('#0D1420', 0.4)); } ctx.restore();
  if (cellen > 0.01) { for (let i = 0; i < 9; i++) { const cx = x - w * 0.3 + (i % 3) * w * 0.3 + Math.sin(i * 2.1) * w * 0.04, cy = y - h * 0.26 + Math.floor(i / 3) * h * 0.26 + Math.cos(i * 1.7) * h * 0.04, cr = Math.min(w, h) * 0.085;
    ctx.save(); ctx.globalAlpha *= clamp(cellen * 9 - i, 0, 1); circ(ctx, cx, cy, cr, rgba(b_BETA, 0.45), b_BETA, 2); circ(ctx, cx, cy, cr * 0.4, rgba(C.kern, 0.7), null); ctx.restore(); } }
  ctx.restore(); }
function b_stamcel(ctx, x, y, r, t, a = 1, diff = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = diff > 0.5 ? b_BETA : '#B8A8E0'; blob(ctx, x, y, r, r * 0.94, 0.05, 4, t); shape(ctx, rgba(col, 0.35), col, 2.5); circ(ctx, x, y, r * 0.48, rgba(C.kern, 0.7), C.kernR, 1.5);
  if (diff > 0.5) for (let k = 0; k < 5; k++) b_insuline(ctx, x + Math.cos(k * 1.3 + 0.5) * r * 0.72, y + Math.sin(k * 1.3 + 0.5) * r * 0.66, r * 0.09, (diff - 0.5) * 2); ctx.restore(); }
// huid in doorsnede: opperhuid, lederhuid, onderhuids vet
function b_huid(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const e = y + 50, d = y + 50 + h * 0.32;
  ctx.fillStyle = '#C99A78'; ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= 20; k++) ctx.lineTo(x + w * k / 20, y + Math.sin(k * 1.3) * 4); ctx.lineTo(x + w, e); ctx.lineTo(x, e); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#9C6E58'; ctx.fillRect(x, e, w, d - e); ctx.fillStyle = '#6E5444'; ctx.fillRect(x, d, w, y + h - d);
  ctx.save(); ctx.beginPath(); ctx.rect(x, d, w, y + h - d); ctx.clip(); for (let i = 0; i < 26; i++) { const px = x + (i % 9) * w / 8 + (Math.floor(i / 9) % 2) * w / 16, py = d + 40 + Math.floor(i / 9) * 70; ctx.beginPath(); ctx.ellipse(px, py, 46, 32, 0, 0, 6.283); shape(ctx, rgba('#F0D88A', 0.25), rgba('#F0D88A', 0.5), 1.5); } ctx.restore();
  ctx.strokeStyle = b_BLOEDL; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, d + 10); ctx.bezierCurveTo(x + w * 0.3, d - 20, x + w * 0.6, d + 30, x + w, d); ctx.stroke(); ctx.restore(); return { e, d }; }
// gelwand met poriën (verticaal); x = midden van de wand, ys = y-posities van de poriën
function b_gelWand(ctx, x, y0, y1, dik, ys, pr, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(b_GEL, 0.35); ctx.strokeStyle = b_GEL; ctx.lineWidth = 3; let yy = y0;
  const stukken = []; ys.forEach(py => { stukken.push([yy, py - pr]); yy = py + pr; }); stukken.push([yy, y1]);
  stukken.forEach(([a0, a1]) => { if (a1 - a0 < 2) return; roundRect(ctx, x - dik / 2, a0, dik, a1 - a0, 8); ctx.fill(); ctx.stroke(); });
  for (let i = 0; i < 40; i++) { const py = y0 + hash(i * 5) * (y1 - y0); if (ys.some(p => Math.abs(p - py) < pr + 6)) continue; circ(ctx, x - dik / 2 + 8 + hash(i * 5 + 1) * (dik - 16), py, 2.5, rgba('#0D1420', 0.45)); }
  ctx.restore(); }

// ---------- reactoren (afbeelding 1 van de waterstofcontext, uit pdf o-16) ----------
const b_RX = (px) => 170 + (px - 210) * 1.85, b_RY = (py) => 150 + (py - 680) * 1.75;
function b_rLijn(ctx, pts, col = C.line, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(b_RX(px), b_RY(py)) : ctx.moveTo(b_RX(px), b_RY(py))); ctx.stroke(); }
function b_pompje(ctx, px, py, dir, a = 1) { const x = b_RX(px), y = b_RY(py); circ(ctx, x, y, 21, '#1E2A40', C.line, 2.5); ctx.beginPath(); if (dir > 0) { ctx.moveTo(x, y - 11); ctx.lineTo(x + 10, y + 8); ctx.lineTo(x - 10, y + 8); } else { ctx.moveTo(x, y + 11); ctx.lineTo(x + 10, y - 8); ctx.lineTo(x - 10, y - 8); } ctx.closePath(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); }
function b_fles(ctx, x0, x1, nx0, nx1, a = 1) { ctx.beginPath(); ctx.moveTo(b_RX(nx0), b_RY(808)); ctx.lineTo(b_RX(nx0), b_RY(858)); ctx.lineTo(b_RX(x0), b_RY(886)); ctx.lineTo(b_RX(x0), b_RY(1040)); ctx.lineTo(b_RX(x1), b_RY(1040)); ctx.lineTo(b_RX(x1), b_RY(886)); ctx.lineTo(b_RX(nx1), b_RY(858)); ctx.lineTo(b_RX(nx1), b_RY(808)); ctx.strokeStyle = C.text2; ctx.lineWidth = 3.5; ctx.stroke(); }
function b_reactoren(ctx, t, o = {}) { const { a = 1, r1 = 1, r2 = 1, gas = 1, scheider = 1, bio = 1, licht = 1, pomp = 1, hl1 = 0, hl2 = 0, belT = 1, schil = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // vloeistof
  b_A(ctx, r1, () => { ctx.fillStyle = rgba('#8FA0B5', 0.22); ctx.fillRect(b_RX(427), b_RY(886), b_RX(569) - b_RX(427), b_RY(1040) - b_RY(886)); ctx.fillStyle = rgba(C.oker, 0.22); ctx.fillRect(b_RX(427), b_RY(997), b_RX(569) - b_RX(427), b_RY(1040) - b_RY(997));
    ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(b_RX(427), b_RY(997)); ctx.lineTo(b_RX(569), b_RY(997)); ctx.stroke(); ctx.setLineDash([]);
    b_fles(ctx, 427, 569, 452, 542); if (hl1 > 0.01) { ctx.save(); ctx.globalAlpha *= hl1; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.strokeRect(b_RX(427) - 10, b_RY(886) - 10, b_RX(569) - b_RX(427) + 20, b_RY(1040) - b_RY(886) + 20); ctx.restore(); }
    text(ctx, 'organische', b_RX(498), b_RY(935), fTekst(24, 600), C.text, 'center'); text(ctx, 'stoffen', b_RX(498), b_RY(955), fTekst(24, 600), C.text, 'center');
    pijl(ctx, b_RX(498), b_RY(962), b_RX(498), b_RY(992), C.text2, 1, 2.5, 10);
    text(ctx, 'organische zuren', b_RX(498), b_RY(1023), fTekst(22, 600), C.text, 'center');
    text(ctx, 'Reactor 1', b_RX(498), b_RY(1062), fTekst(26, 800), C.text, 'center');
    for (let i = 0; i < 9; i++) { const w = wander(i + 20, t, 18, 0.7); bacterie(ctx, b_RX(440 + (i % 3) * 45 + 10) + w.x, b_RY(900 + Math.floor(i / 3) * 34) + w.y, 0.45, i * 0.8 + Math.sin(t + i) * 0.3, 0.75, C.koraal); }
    if (schil > 0.01) for (let i = 0; i < 5; i++) { const ph = (t * 0.25 + i / 5) % 1; ctx.save(); ctx.globalAlpha *= schil * Math.min(1, (1 - ph) * 3); ctx.translate(b_RX(450) + Math.sin(i * 2) * 20, lerp(b_RY(905), b_RY(990), ph)); ctx.rotate(i + ph * 2); roundRect(ctx, -14, -5, 28, 10, 5); shape(ctx, '#B08A5C', '#D2B48C', 1.5); ctx.restore(); } });
  b_A(ctx, r2, () => { ctx.fillStyle = rgba('#8FA0B5', 0.22); ctx.fillRect(b_RX(614), b_RY(886), b_RX(757) - b_RX(614), b_RY(1040) - b_RY(886)); b_fles(ctx, 614, 757, 640, 732);
    if (hl2 > 0.01) { ctx.save(); ctx.globalAlpha *= hl2; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.strokeRect(b_RX(614) - 10, b_RY(886) - 10, b_RX(757) - b_RX(614) + 20, b_RY(1040) - b_RY(886) + 20); ctx.restore(); }
    text(ctx, 'organische', b_RX(686), b_RY(970), fTekst(24, 600), C.text, 'center'); text(ctx, 'zuren', b_RX(686), b_RY(995), fTekst(24, 600), C.text, 'center');
    text(ctx, 'Reactor 2', b_RX(686), b_RY(1062), fTekst(26, 800), C.text, 'center');
    for (let i = 0; i < 9; i++) { const w = wander(i + 40, t, 18, 0.7); bacterie(ctx, b_RX(628 + (i % 3) * 50 + 10) + w.x, b_RY(905 + Math.floor(i / 3) * 44) + w.y + (i > 2 && i < 6 ? 30 : 0), 0.45, i * 0.9 + Math.sin(t + i) * 0.3, 0.75, b_PURPER); } });
  // gaskappen en leidingen
  b_A(ctx, gas, () => { for (const [cx, rr] of [[497, r1], [685, r2]]) { if (rr <= 0.01) continue; ctx.save(); ctx.globalAlpha *= rr; b_rLijn(ctx, [[cx, 750], [cx, 835]], C.line, 3); b_rLijn(ctx, [[cx - 14, 857], [cx, 835], [cx + 14, 857]], C.line, 3);
      text(ctx, 'H₂ + CO₂', b_RX(cx), b_RY(877), fTekst(24, 700), C.text, 'center'); pijl(ctx, b_RX(cx), b_RY(cx === 497 ? 925 : 950), b_RX(cx), b_RY(884), C.text2, 1, 2, 9);
      // belletjes die opstijgen naar de gasopvang
      for (let k = 0; k < 4; k++) { const ph = (t * 0.35 + k / 4 + (cx > 600 ? 0.5 : 0)) % 1; const py = lerp(b_RY(845), b_RY(752), ph); ctx.save(); ctx.globalAlpha *= rr * belT * Math.sin(ph * Math.PI); if (k % 2) b_h2(ctx, b_RX(cx) + 0, py, 0.7); else b_co2(ctx, b_RX(cx), py, 0.6); ctx.restore(); }
      for (let k = 0; k < 5; k++) { const ph = (t * 0.5 + k / 5 + (cx > 600 ? 0.3 : 0)) % 1; circ(ctx, b_RX(cx - 30 + k * 15), lerp(b_RY(1030), b_RY(890), ph), 4, rgba('#E6EEF8', 0.6 * rr * belT * Math.sin(ph * Math.PI))); } ctx.restore(); }
    ctx.fillStyle = '#1E2A40'; ctx.fillRect(b_RX(465), b_RY(686), b_RX(723) - b_RX(465), b_RY(750) - b_RY(686)); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.strokeRect(b_RX(465), b_RY(686), b_RX(723) - b_RX(465), b_RY(750) - b_RY(686));
    text(ctx, 'GASOPVANG', b_RX(594), b_RY(725), fTekst(26, 600), C.text, 'center'); b_pompje(ctx, 497, 781, 1); b_A(ctx, r2, () => b_pompje(ctx, 685, 781, 1)); });
  b_A(ctx, scheider, () => { b_rLijn(ctx, [[723, 718], [791, 718]]); b_rLijn(ctx, [[803, 730], [803, 815]]); b_pompje(ctx, 803, 718, -1);
    ctx.fillStyle = '#1E2A40'; ctx.fillRect(b_RX(783), b_RY(815), b_RX(954) - b_RX(783), b_RY(855) - b_RY(815)); ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.strokeRect(b_RX(783), b_RY(815), b_RX(954) - b_RX(783), b_RY(855) - b_RY(815));
    text(ctx, 'GASSCHEIDER', b_RX(868), b_RY(843), fTekst(24, 600), C.text, 'center'); pijl(ctx, b_RX(954), b_RY(834), b_RX(1003), b_RY(834), C.line, 1, 3, 12); pijl(ctx, b_RX(868), b_RY(855), b_RX(868), b_RY(893), C.line, 1, 3, 12);
    roundRect(ctx, b_RX(1005), b_RY(818), b_RX(1054) - b_RX(1005), b_RY(851) - b_RY(818), 4); shape(ctx, rgba(C.text2, 0.35), C.text2, 2); text(ctx, 'CO₂', b_RX(1030), b_RY(843), fTekst(24, 700), C.text, 'center');
    roundRect(ctx, b_RX(848), b_RY(895), b_RX(890) - b_RX(848), b_RY(928) - b_RY(895), 4); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); text(ctx, 'H₂', b_RX(869), b_RY(920), fTekst(24, 700), C.text, 'center'); });
  // biomassa
  b_A(ctx, bio, () => { roundRect(ctx, b_RX(219), b_RY(792), b_RX(323) - b_RX(219), b_RY(824) - b_RY(792), 4); shape(ctx, rgba('#B08A5C', 0.45), '#D2B48C', 2); text(ctx, 'biomassa', b_RX(271), b_RY(816), fTekst(24, 600), C.text, 'center');
    b_rLijn(ctx, [[323, 808], [450, 808], [450, 905]]); });
  // overloop van reactor 1 naar 2
  b_A(ctx, pomp, () => { b_rLijn(ctx, [[569, 1040], [592, 1040], [592, 808], [637, 808], [637, 905]]); b_pompje(ctx, 592, 948, 1);
    for (let k = 0; k < 4; k++) { const ph = (t * 0.22 + k / 4) % 1; const L = [[569, 1035], [592, 1035], [592, 808], [637, 808], [637, 900]].map(([px, py]) => [b_RX(px), b_RY(py)]); const p = padPunt(L, ph, false); circ(ctx, p[0], p[1], 5, rgba(C.oker, 0.85)); } });
  // licht
  b_A(ctx, licht, () => { ctx.save(); ctx.translate(b_RX(820), b_RY(980)); ctx.beginPath(); ctx.moveTo(-90, 6); ctx.lineTo(-40, -8); ctx.lineTo(-36, 2); ctx.lineTo(10, -12); ctx.lineTo(6, 0); ctx.lineTo(52, -8); ctx.lineTo(4, 12); ctx.lineTo(0, 2); ctx.lineTo(-44, 14); ctx.lineTo(-40, 4); ctx.closePath(); shape(ctx, rgba(C.goud, 0.55), C.goud, 2); ctx.restore();
    text(ctx, 'licht', b_RX(882), b_RY(988), fTekst(26, 600), C.text, 'left');
    for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; ctx.save(); ctx.globalAlpha *= 0.6 * Math.sin(ph * Math.PI); pijl(ctx, b_RX(770) - ph * 30, b_RY(960 + k * 22), b_RX(770) - ph * 30 - 30, b_RY(960 + k * 22), C.goud, 1, 2.5, 8); ctx.restore(); } });
  ctx.restore(); }

// ---------- aardappel, plantencel, polysachariden ----------
function b_aardappel(ctx, x, y, s = 1, a = 1, o = {}) { const { schil = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 130, 92, -0.15, 0, 6.283); shape(ctx, '#E8D49A', '#B08A5C', 10);
  for (const [px, py] of [[-60, -30], [40, -50], [70, 30], [-20, 50]]) { circ(ctx, px, py, 6, rgba('#8C5A3A', 0.6)); }
  if (schil > 0.01) { ctx.save(); ctx.globalAlpha *= schil; ctx.strokeStyle = '#B08A5C'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, -40); ctx.bezierCurveTo(190, -60, 230, 10, 200, 60); ctx.bezierCurveTo(180, 100, 240, 130, 270, 110); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
function b_ketenRecht(ctx, x, y, n, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (n - 1) * r * 1.9, y); ctx.stroke(); for (let i = 0; i < n; i++) hexagon(ctx, x + i * r * 1.9, y, r, rgba(col, 0.45), col, 1.5, i % 2 ? Math.PI / 6 : 0); ctx.restore(); }
function b_ketenVertakt(ctx, x, y, r, col, a = 1, dicht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = r * 1.9, pts = [];
  for (let i = 0; i < 8; i++) pts.push([x + i * d, y + Math.sin(i * 0.9) * r * 0.6]);
  const tak = dicht ? [[1, -1], [3, 1], [4, -1], [6, 1], [2, 1]] : [[2, -1], [5, 1]]; for (const [bi, dir] of tak) for (let k = 1; k <= 3; k++) pts.push([x + bi * d + k * d * 0.55, y + dir * k * d * 0.8]);
  ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth = 2; ctx.beginPath(); pts.slice(0, 8).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); for (const p of pts) hexagon(ctx, p[0], p[1], r, rgba(col, 0.45), col, 1.5, 0); ctx.restore(); }
function b_plantcel(ctx, x, y, w, h, t, o = {}) { const { a = 1, wand = 0, zetmeel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 26); ctx.strokeStyle = wand > 0.5 ? C.groen : rgba(C.groen, 0.7); ctx.lineWidth = 18; ctx.stroke();
  ctx.save(); roundRect(ctx, x - w / 2 - 9, y - h / 2 - 9, w + 18, h + 18, 32); roundRect(ctx, x - w / 2 + 9, y - h / 2 + 9, w - 18, h - 18, 18); ctx.clip('evenodd'); ctx.strokeStyle = rgba('#DFF2D8', 0.35 + 0.4 * wand); ctx.lineWidth = 2;
  for (let k = -20; k < 40; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + k * 22, y - h / 2 - 10); ctx.lineTo(x - w / 2 + k * 22 - 160, y + h / 2 + 10); ctx.stroke(); } ctx.restore();
  if (wand > 0.01) { ctx.save(); ctx.globalAlpha *= wand * 0.5; roundRect(ctx, x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, 34); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  roundRect(ctx, x - w / 2 + 14, y - h / 2 + 14, w - 28, h - 28, 16); shape(ctx, rgba(HK.cel, 0.1), rgba(HK.cel, 0.6), 2);
  circ(ctx, x + w * 0.28, y - h * 0.22, h * 0.12, rgba(C.kern, 0.55), C.kernR, 1.5);
  for (let i = 0; i < 7; i++) { const cx = x - w * 0.3 + (i % 4) * w * 0.17, cy = y - h * 0.05 + Math.floor(i / 4) * h * 0.26 + Math.sin(i) * 10, rr = h * (0.08 + 0.02 * hash(i));
    ctx.beginPath(); ctx.ellipse(cx, cy, rr * 1.2, rr, i, 0, 6.283); shape(ctx, rgba('#F2EEDC', 0.45 + 0.4 * zetmeel), zetmeel > 0.5 ? '#FFFFFF' : '#D8D2BC', 2);
    ctx.beginPath(); ctx.ellipse(cx, cy, rr * 0.6, rr * 0.5, i, 0, 6.283); ctx.strokeStyle = rgba('#B8B09A', 0.7); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore(); }

// ---------- NAD-kringloop ----------
function b_nadToken(ctx, x, y, s, plus, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(22 * s, 800); const lab = plus ? 'NAD⁺' : 'NADH'; const w = ctx.measureText(lab).width + 22 * s;
  roundRect(ctx, x - w / 2, y - 18 * s, w, 36 * s, 18 * s); shape(ctx, rgba(plus ? b_NAD : b_NADH, 0.3), plus ? b_NAD : b_NADH, 2.5); text(ctx, lab, x, y + 8 * s, fTekst(22 * s, 800), C.text, 'center'); ctx.restore(); }
function b_pyro(ctx, x, y, s = 1, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 6 * s); ctx.lineTo(x, y - 6 * s); ctx.lineTo(x + 20 * s, y + 6 * s); ctx.stroke(); for (const [dx, dy] of [[-20, 6], [0, -6], [20, 6]]) circ(ctx, x + dx * s, y + dy * s, 7 * s, rgba(col, 0.6), col, 1.5); ctx.restore(); }
function b_hydrogenase(ctx, x, y, s = 1, a = 1, t = 0, act = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const r = 50 + 6 * Math.sin(an * 5 + 1) + (an > 5.6 || an < 0.7 ? -22 : 0); k ? ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.8) : ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r * 0.8); } ctx.closePath(); shape(ctx, rgba('#7A8BA8', 0.5), '#AFC0D0', 2.5);
  ctx.restore(); }

// ---------- leefwijze-raster ----------
function b_raster(ctx, x, y, w, h, o = {}) { const { a = 1, rij = 0, kol = 0, fotoK = 0, heteroK = 0, goed = 0, lab = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hx = x + 230, hy = y + 120, cw = (w - 230) / 2, ch = (h - 120) / 2;
  const cellen = [['chemo-autotroof', 'A', 0, 0], ['chemo-heterotroof', 'B', 0, 1], ['foto-autotroof', 'C', 1, 0], ['foto-heterotroof', 'D', 1, 1]];
  // koppen
  const kop = (s, sub, cx, cy, hl, wz) => { roundRect(ctx, cx - wz / 2, cy - 44, wz, 88, 14); shape(ctx, rgba(hl > 0.5 ? C.goud : EX.papier, hl > 0.5 ? 0.18 : 0.85), hl > 0.5 ? C.goud : EX.papierR, hl > 0.5 ? 3 : 2); text(ctx, s, cx, cy - 2, fTekst(32, 700), C.text, 'center'); metaText(ctx, sub, cx, cy + 28, C.text2, 'center', 16); };
  kop('auto', 'koolstof uit CO₂', hx + cw / 2, y + 56, kol, cw - 20); kop('hetero', 'koolstof uit org. stof', hx + cw * 1.5, y + 56, kol, cw - 20);
  kop('chemo', 'energie uit stoffen', x + 110, hy + ch / 2, rij, 210); kop('foto', 'energie uit licht', x + 110, hy + ch * 1.5, rij, 210);
  cellen.forEach(([s, L, r, k]) => { const cx = hx + k * cw, cy = hy + r * ch; const uit = (r === 0 ? fotoK : 0) + (k === 0 && r === 1 ? heteroK : 0); const isD = L === 'D';
    ctx.save(); ctx.globalAlpha *= 1 - 0.7 * clamp(uit, 0, 1); roundRect(ctx, cx + 10, cy + 10, cw - 20, ch - 20, 16); shape(ctx, rgba(isD && goed > 0.5 ? C.groen : EX.papier, isD && goed > 0.5 ? 0.18 : 0.75), isD && goed > 0.5 ? C.groen : EX.papierR, isD && goed > 0.5 ? 4 : 2);
    text(ctx, L, cx + 50, cy + 68, fTitel(44), isD && goed > 0.5 ? C.groen : C.goud, 'center'); text(ctx, s, cx + cw / 2 + 20, cy + ch / 2 + 12, fTekst(32, 600), C.text, 'center');
    if (uit > 0.01) { ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 40, cy + ch / 2 + 2); ctx.lineTo(cx + 40 + (cw - 80) * clamp(uit * 1.2, 0, 1), cy + ch / 2 + 2); ctx.stroke(); }
    if (isD && goed > 0.01) vink_(ctx, cx + cw - 50, cy + 52, 18, goed); ctx.restore(); });
  ctx.restore(); }

// ---------- kringloop: aardappelplant, lucht, fossiel ----------
function b_plant(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const [dx, hh] of [[-30, 170], [0, 210], [32, 160]]) { ctx.beginPath(); ctx.moveTo(dx * 0.3, 0); ctx.quadraticCurveTo(dx, -hh * 0.5, dx * 1.3, -hh); ctx.stroke();
    for (let k = 1; k <= 3; k++) { const ly = -hh * k / 3.4, lx = dx * (0.3 + 0.9 * k / 3.4); for (const side of [-1, 1]) { ctx.save(); ctx.translate(lx, ly); ctx.rotate(side * 0.9 + Math.sin(t + k) * 0.05); ctx.beginPath(); ctx.ellipse(side * 26, 0, 28, 13, 0, 0, 6.283); shape(ctx, rgba('#5FA86E', 0.75), '#8FD49C', 1.5); ctx.restore(); } } }
  ctx.strokeStyle = '#8C6A44'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-50, 50); ctx.moveTo(0, 0); ctx.lineTo(55, 46); ctx.moveTo(0, 0); ctx.lineTo(0, 60); ctx.stroke();
  for (const [px, py] of [[-58, 58], [62, 54], [0, 74]]) { ctx.beginPath(); ctx.ellipse(px, py, 30, 21, 0.3, 0, 6.283); shape(ctx, '#E8D49A', '#B08A5C', 4); }
  ctx.restore(); }
function b_olie(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < 4; k++) { ctx.fillStyle = ['#5A4636', '#4A3A2E', '#3E3128', '#33281F'][k]; ctx.fillRect(x, y + k * h / 4, w, h / 4 + 1); }
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h * 0.62, w * 0.3, h * 0.16, 0, 0, 6.283); shape(ctx, '#121212', '#3A3A3A', 2); ctx.restore(); }

// ---------- slot: examenboekje, atlas ----------
function b_boekje(ctx, x, y, s = 1, a = 1, ang = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -40, -54, 80, 108, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#2B3F66'; ctx.fillRect(-40, -54, 80, 22); ctx.fillStyle = '#9AA3B2'; for (let k = 0; k < 4; k++) ctx.fillRect(-28, -18 + k * 14, 56 - (k % 2) * 16, 5); ctx.restore(); }
function b_atlas(ctx, x, y, s = 1, a = 1, t = 0, open = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -330, -210, 660, 420, 18); shape(ctx, '#2B3F66', '#5B6B88', 4); for (const sx of [-1, 1]) { roundRect(ctx, sx > 0 ? 8 : -318, -196, 310, 392, 10); shape(ctx, '#F2EEE4', '#C9C2B0', 2); }
  ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -200); ctx.lineTo(0, 200); ctx.stroke();
  text(ctx, 'EXAMENATLAS', -163, -150, fTekst(28, 800), '#2B3F66', 'center');
  for (let k = 0; k < 6; k++) { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(-280, -110 + k * 44, 120 - (k % 3) * 20, 8); const bw = (60 + 140 * hash(k * 7 + 1)) * open; ctx.fillStyle = rgba([C.teal, C.goud, C.koraal, C.groen, C.paars, C.oker][k], 0.85); ctx.fillRect(-140, -118 + k * 44, bw, 22); }
  for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const v = hash(r * 13 + c * 7 + 3); const on = clamp(open * 12 - (r + c) * 0.6, 0, 1); circ(ctx, 50 + c * 28, -140 + r * 44, 9, rgba([C.teal, C.goud, C.koraal][Math.floor(v * 3)], (0.25 + 0.7 * v) * on)); }
  ctx.restore(); }
// Examenbespreking vwo 2018-II · context 'Een bijzondere band tussen grootvader en kleinkind' (vragen 16–26) — eigen tekeningen helper c (21 okt 2026)
const c_CTX = 'Grootvader en kleinkind';
const c_na = (q, t, w, n = 1, dl = 0, d = 0.6) => ramp(t, q.at(w, n) + dl, d);
const c_KL = { gezond: C.teal, mut: C.koraal, pre: C.goud, chrom: '#CFC6E8', chromR: '#8C7BBF' };

// ---------- personages ----------
// Opa Henk met wandelstok; beef = 0..1 trillende hand
function c_henk(ctx, x, y, h, o = {}) { const t = o.t || 0, beef = o.beef || 0;
  persoon(ctx, 'henk', x, y, h, { t, a: o.a, uit: o.uit || 'neutraal', pose: 'vasthouden', kijk: o.kijk || 1,
    hold: (c2, hx, hy) => { const jx = beef * 3 * Math.sin(t * 38), jy = beef * 2 * Math.cos(t * 31);
      c2.save(); c2.strokeStyle = '#7A5A3E'; c2.lineWidth = h * 0.022; c2.lineCap = 'round';
      c2.beginPath(); c2.moveTo(hx + jx - h * 0.05, hy + jy - h * 0.02); c2.quadraticCurveTo(hx + jx - h * 0.05, hy + jy - h * 0.07, hx + jx, hy + jy - h * 0.05); c2.lineTo(hx + jx + h * 0.004, hy + jy); c2.lineTo(hx + h * 0.03, y - 2); c2.stroke();
      if (beef > 0.01) { c2.globalAlpha *= beef; c2.strokeStyle = rgba(C.goud, 0.85); c2.lineWidth = 3; for (const s of [-1, 1]) for (let k = 0; k < 2; k++) { const r = h * (0.07 + k * 0.035); c2.beginPath(); c2.arc(hx + jx, hy + jy - h * 0.03, r, s > 0 ? -0.5 : Math.PI - 0.5, s > 0 ? 0.5 : Math.PI + 0.5); c2.stroke(); } }
      c2.restore(); } }); }

// ---------- chromosomen (afbeelding 4) ----------
// knobs: {tl, tr, bl, br} = insnoering (fragiele plek) aan dat uiteinde; s = schaal (hoogte ± 300*s)
function c_chromosoom(ctx, cx, cy, s, knobs = {}, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s);
  const col = o.col || c_KL.chrom, rand = o.rand || c_KL.chromR, lw = 42;
  for (const side of [-1, 1]) { const top = side < 0 ? knobs.tl : knobs.tr, bot = side < 0 ? knobs.bl : knobs.br; const hl = side < 0 ? (o.hlL || 0) : (o.hlR || 0);
    const P = (u) => { // u: 0 = top, 1 = bottom; via centromeer (y=0)
      const y0 = -112, y1 = 172; const y = y0 + (y1 - y0) * u; const xc = side * (4 + 22 * Math.pow(Math.abs(y) / (y < 0 ? 112 : 172), 1.3) * (y < 0 ? 0.95 : 1.45)); return [xc, y]; };
    const u0 = top ? 0.12 : 0, u1 = bot ? 0.9 : 1;
    const pad = (fn) => { ctx.beginPath(); for (let k = 0; k <= 30; k++) { const u = u0 + (u1 - u0) * k / 30; const [px, py] = P(u); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } fn(); };
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; pad(() => { ctx.strokeStyle = rgba(o.hlCol || C.goud, 0.55); ctx.lineWidth = lw + 22; ctx.stroke(); }); ctx.restore(); }
    pad(() => { ctx.strokeStyle = rand; ctx.lineWidth = lw + 5; ctx.stroke(); }); pad(() => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); });
    const knob = (u, dir) => { const [px, py] = P(u); const [nx, ny] = P(u + dir * 0.055); const kx = nx, ky = ny + dir * 4;
      if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; circ(ctx, kx, ky, 31, rgba(o.hlCol || C.goud, 0.55)); ctx.restore(); }
      ctx.strokeStyle = rand; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(kx, ky); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke();
      circ(ctx, kx, ky, 21, col, rand, 2.5); if (o.fragiel) { ctx.save(); ctx.globalAlpha *= o.fragiel; circ(ctx, (px + kx) / 2, (py + ky) / 2, 26, null, C.goud, 4); ctx.restore(); } };
    if (top) knob(u0, -1); if (bot) knob(u1, 1); }
  // centromeer-insnoering
  ctx.fillStyle = rgba('#000000', 0.12); ctx.beginPath(); ctx.ellipse(0, 0, 16, 7, 0, 0, 6.283); ctx.fill();
  ctx.restore(); }

// ---------- afbeelding 3: ideogram van het X-chromosoom ----------
const c_BANDEN = [[190, 215, 5], [216, 231, 3], [232, 263, 5], [264, 278, 3], [279, 305, 5], [306, 314, 3], [315, 326, 5], [327, 344, 1], [345, 350, 5], [351, 374, 1], [375, 400, 5], [401, 424, 3], [425, 447, 5], [448, 463, 4], [464, 478, 4],
  [481, 495, 4], [496, 506, 6], [507, 524, 3], [525, 552, 6], [553, 566, 3], [567, 579, 6], [580, 604, 1], [605, 610, 6], [611, 638, 1], [639, 644, 6], [645, 666, 3], [667, 689, 5], [690, 703, 3], [704, 720, 5], [721, 745, 3], [746, 770, 5], [771, 810, 1], [811, 857, 5], [858, 876, 3], [877, 883, 5], [884, 906, 1], [907, 946, 5]];
const c_LOCI = [['p22.33', 204], ['p22.32', 226], ['p22.31', 247], ['p22.2', 269], ['p22.13', 290], ['p22.11', 320], ['p21.2', 347], ['p11.4', 380], ['p11.3', 407], ['p11.23', 428], ['p11.22', 452], ['p11.1', 475],
  ['q11.2', 500], ['q13.1', 530], ['q13.2', 555], ['q21.1', 585], ['q21.2', 607], ['q21.31', 629], ['q21.33', 652], ['q22.1', 673], ['q22.2', 696], ['q23', 727], ['q24', 750], ['q25', 777], ['q26.1', 816], ['q26.3', 845], ['q27.1', 866], ['q27.3', 889], ['q28', 912]];
function c_ideogram(ctx, x0, x1, y, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (v) => x0 + (v - 190) * (x1 - x0) / (946 - 190), cen = (X(478) + X(481)) / 2;
  const grijs = { 1: '#2A2633', 3: '#6E6880', 4: '#A8A2B8', 5: '#CFC9DC', 6: '#E8E4F0' };
  const omtrek = (fn) => { ctx.save(); ctx.beginPath(); roundRect(ctx, x0, y - h / 2, cen - 4 - x0, h, h / 2); roundRect(ctx, cen + 4, y - h / 2, x1 - cen - 4, h, h / 2); fn(); ctx.restore(); };
  omtrek(() => { ctx.clip(); const r = o.reveal == null ? 1 : o.reveal; c_BANDEN.forEach(([b0, b1, g]) => { if ((b0 - 190) / 756 > r) return; ctx.fillStyle = grijs[g] || grijs[5]; ctx.fillRect(X(b0), y - h / 2, X(b1 + 1) - X(b0) + 0.5, h); }); });
  ctx.strokeStyle = '#E8E4F0'; ctx.lineWidth = 2.5; roundRect(ctx, x0, y - h / 2, cen - 4 - x0, h, h / 2); ctx.stroke(); roundRect(ctx, cen + 4, y - h / 2, x1 - cen - 4, h, h / 2); ctx.stroke();
  // armen oplichten
  if (o.p > 0.01) { ctx.save(); ctx.globalAlpha *= o.p; roundRect(ctx, x0 - 6, y - h / 2 - 6, cen - x0 + 2, h + 12, h / 2 + 6); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  if (o.q > 0.01) { ctx.save(); ctx.globalAlpha *= o.q; roundRect(ctx, cen + 2, y - h / 2 - 6, x1 - cen + 4, h + 12, h / 2 + 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  // loci
  const la = o.loci == null ? 1 : o.loci; if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; c_LOCI.forEach(([n, v]) => { const xx = X(v), hit = n === 'q27.3' ? (o.hit || 0) : 0; const col = hit > 0.5 ? C.goud : C.text2;
      ctx.strokeStyle = col; ctx.lineWidth = hit > 0.5 ? 3 : 1.5; ctx.beginPath(); ctx.moveTo(xx, y - h / 2 - 4); ctx.lineTo(xx, y - h / 2 - 22); ctx.stroke(); ctx.fillStyle = col; ctx.fillRect(xx - 3, y - h / 2 - 26, 6, 6);
      ctx.save(); ctx.translate(xx + 7, y - h / 2 - 34); ctx.rotate(-Math.PI / 2); text(ctx, n, 0, 0, fTekst(hit > 0.5 ? 30 : 21, hit > 0.5 ? 800 : 500), hit > 0.5 ? C.goud : C.text, 'left'); ctx.restore(); }); ctx.restore(); }
  if (o.hit > 0.01) { const xx = X(889); ctx.save(); ctx.globalAlpha *= o.hit; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, xx - 14, y - h / 2 - 8, 28, h + 16, 8); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { X, cen }; }

// ---------- afbeelding 2: stamboom ----------
const c_PERS = [['I-1', 455, 'm', 'n', '25'], ['I-2', 608, 'f', 'p', '30/70'],
  ['II-1', 379, 'm', 'p', '120'], ['II-2', 455, 'f', 'n', '23/32'], ['II-3', 532, 'f', 'n', '25/30'], ['II-4', 608, 'm', 'p', '85'], ['II-5', 685, 'f', 'n', '17/30'],
  ['III-1', 303, 'f', 'p', '28/132'], ['III-2', 379, 'm', 'n', '30'], ['III-3', 455, 'f', 'p', '32/126'], ['III-4', 608, 'm', 'n', '30'], ['III-5', 647, 'm', 'n', '17'], ['III-6', 685, 'm', 'n', '32'], ['III-7', 762, 'f', 'p', '17/85'],
  ['IV-1', 303, 'm', 'n', '28'], ['IV-2', 379, 'f', 'v', '30/252'], ['IV-3', 455, 'm', 'n', '32'], ['IV-4', 570, 'm', 'v', '272'], ['IV-5', 608, 'm', 'n', '29'], ['IV-6', 685, 'f', 'p', '37/100'], ['IV-7', 723, 'm', 'n', '17'], ['IV-8', 762, 'm', 'n', '30'], ['IV-9', 838, 'f', 'v', '32/257'],
  ['V-1', 303, 'f', 'n', '28/30'], ['V-2', 379, 'm', 'v', '406'], ['V-3', 608, 'f', 'n', '29/32'], ['V-4', 685, 'm', 'n', '32'], ['V-5', 762, 'f', 'n', '30/32'], ['V-6', 838, 'm', 'v', '278']];
const c_GEN = { I: 700, II: 803, III: 905, IV: 1008, V: 1110 };
// gezinnen: [ouder1, ouder2, dalingX, kinderen]
const c_FAM = [['I-1', 'I-2', 532, ['II-1', 'II-3', 'II-4']], ['II-1', 'II-2', 417, ['III-1', 'III-3']], ['II-4', 'II-5', 647, ['III-4', 'III-5', 'III-7']], ['III-2', 'III-3', 417, ['IV-2', 'IV-3']],
  ['III-6', 'III-7', 723, ['IV-4', 'IV-6', 'IV-7', 'IV-9']], ['IV-1', 'IV-2', 341, ['V-1', 'V-2']], ['IV-5', 'IV-6', 647, ['V-3', 'V-4']], ['IV-8', 'IV-9', 800, ['V-5', 'V-6']]];
const c_P = {}; c_PERS.forEach(([id, x, sex, st, num]) => { const g = id.split('-')[0]; c_P[id] = { id, x, y: c_GEN[g], sex, st, num, g, n: id.split('-')[1] }; });
function c_stamMap(o) { const ox = o.ox == null ? 150 : o.ox, oy = o.oy == null ? 150 : o.oy, sx = o.sx || 1.6, sy = o.sy || 1.4; return { X: (x) => ox + (x - 260) * sx, Y: (y) => oy + (y - 660) * sy, sx, sy }; }
// pad van ouder naar kind via de lijnen van de stamboom (in broncoördinaten)
function c_pad(ouder, kind) { const f = c_FAM.find((F) => (F[0] === ouder || F[1] === ouder) && F[3].includes(kind)); if (!f) return []; const p = c_P[ouder], k = c_P[kind]; const sib = k.y - 40;
  return [[p.x, p.y], [f[2], p.y], [f[2], sib], [k.x, sib], [k.x, k.y]]; }
function c_stamboom(ctx, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const M = c_stamMap(o), { X, Y } = M; const gens = ['I', 'II', 'III', 'IV', 'V'];
  const bouw = o.bouw == null ? 5 : o.bouw; const gA = (g) => clamp(bouw - gens.indexOf(g), 0, 1); const hl = o.hl || {}, dimP = o.dim || {}, ring = o.ring || {}, numRing = o.numRing || {}; const sz = o.sz || 30, px = o.px || 24;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  // generatielabels
  gens.forEach((g) => { const ga = gA(g); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga * (o.genHl && o.genHl[g] ? 1 : 0.85); text(ctx, g, X(222), Y(c_GEN[g]) + 10, fTitel(30), o.genHl && o.genHl[g] > 0.5 ? C.goud : C.text2, 'center'); ctx.restore(); } });
  // lijnen
  ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 2.5;
  c_FAM.forEach(([p1, p2, dx, kids]) => { const A = c_P[p1], B = c_P[p2]; const ga1 = gA(A.g), ga2 = gA(kids.length ? c_P[kids[0]].g : A.g); if (ga1 <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= ga1; ctx.beginPath(); ctx.moveTo(X(Math.min(A.x, B.x)) + sz / 2, Y(A.y)); ctx.lineTo(X(Math.max(A.x, B.x)) - sz / 2, Y(A.y)); ctx.stroke(); ctx.restore();
    if (ga2 <= 0.01) return; ctx.save(); ctx.globalAlpha *= ga2; const sib = c_P[kids[0]].y - 40; const xs = kids.map((k) => c_P[k].x);
    ctx.beginPath(); ctx.moveTo(X(dx), Y(A.y)); ctx.lineTo(X(dx), Y(sib)); ctx.moveTo(X(Math.min(dx, ...xs)), Y(sib)); ctx.lineTo(X(Math.max(dx, ...xs)), Y(sib)); kids.forEach((k) => { ctx.moveTo(X(c_P[k].x), Y(sib)); ctx.lineTo(X(c_P[k].x), Y(c_P[k].y) - sz / 2); }); ctx.stroke(); ctx.restore(); });
  // oplichtende paden
  (o.paden || []).forEach((P) => { const u = P.u == null ? 1 : P.u; if (u <= 0.01 || !P.pts.length) return; const pts = P.pts.map(([x, y]) => [X(x), Y(y)]); let L = 0; const segs = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); L += l; }
    let rest = L * clamp(u, 0, 1); ctx.save(); ctx.globalAlpha *= P.a == null ? 1 : P.a; for (const [lw, al] of [[14, 0.28], [6, 1]]) { ctx.strokeStyle = rgba(P.col || C.goud, al); ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let r2 = rest;
      for (let i = 1; i < pts.length && r2 > 0; i++) { const l = segs[i - 1], f = Math.min(1, r2 / l); ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); r2 -= l; } ctx.stroke(); } ctx.restore(); });
  // symbolen
  c_PERS.forEach(([id]) => { const p = c_P[id], ga = gA(p.g); if (ga <= 0.01) return; const x = X(p.x), y = Y(p.y); const d = dimP[id] || 0, h = hl[id] || 0;
    ctx.save(); ctx.globalAlpha *= ga * (1 - 0.6 * d);
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; const col = (o.hlCol && o.hlCol[id]) || C.goud; if (p.sex === 'm') { roundRect(ctx, x - sz / 2 - 9, y - sz / 2 - 9, sz + 18, sz + 18, 8); } else { ctx.beginPath(); ctx.arc(x, y, sz / 2 + 10, 0, 6.283); } ctx.fillStyle = rgba(col, 0.3); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.stroke(); ctx.restore(); }
    const fill = p.st === 'v' ? c_ZWARTV : c_LICHT; ctx.lineWidth = 3; ctx.strokeStyle = p.st === 'v' ? '#E6E9EF' : '#9AA3B2';
    if (p.sex === 'm') { ctx.beginPath(); ctx.rect(x - sz / 2, y - sz / 2, sz, sz); } else { ctx.beginPath(); ctx.arc(x, y, sz / 2, 0, 6.283); } ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
    if (p.st === 'p') circ(ctx, x, y, 6, c_ZWARTV);
    const pulse = (o.pulse && o.pulse[p.st]) || 0; if (pulse > 0.01) { ctx.save(); ctx.globalAlpha *= pulse * (0.55 + 0.45 * Math.sin((o.t || 0) * 5)); ctx.strokeStyle = p.st === 'v' ? C.koraal : C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, sz * 0.95, 0, 6.283); ctx.stroke(); ctx.restore(); }
    text(ctx, p.n, x, y - sz / 2 - 9, fTekst(px - 2, 500), C.text2, 'center');
    const nr = numRing[id] || 0; if (nr > 0.01) { ctx.save(); ctx.globalAlpha *= nr; ctx.font = fTekst(px, 700); const w = ctx.measureText(p.num).width + 22; roundRect(ctx, x - w / 2, y + sz / 2 + 6, w, px + 14, (px + 14) / 2); ctx.fillStyle = rgba((o.numCol && o.numCol[id]) || C.goud, 0.25); ctx.fill(); ctx.strokeStyle = (o.numCol && o.numCol[id]) || C.goud; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); }
    text(ctx, p.num, x, y + sz / 2 + px + 9, fTekst(px, nr > 0.5 ? 800 : 500), nr > 0.5 ? C.text : '#DCE0E8', 'center');
    const r = ring[id] || 0; if (r > 0.01) { ctx.save(); ctx.globalAlpha *= r; ctx.strokeStyle = (o.ringCol && o.ringCol[id]) || C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, y + 8, sz * 1.25 + 8, sz * 1.5 + 6, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(r * 1.2, 0, 1)); ctx.stroke(); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); return M; }
const c_ZWARTV = '#05070C', c_LICHT = '#EEF0F4'; // symbolen zoals in het examen: wit, met stip (premutatie) of zwart (volledige mutatie)
function c_legenda(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 420, 132, 16); shape(ctx, rgba(EX.papier, 0.85), EX.papierR, 2);
  circ(ctx, x + 40, y + 42, 15, c_LICHT, '#9AA3B2', 3); circ(ctx, x + 40, y + 42, 6, c_ZWARTV); ctx.beginPath(); ctx.rect(x + 66, y + 27, 30, 30); shape(ctx, c_LICHT, '#9AA3B2', 3); circ(ctx, x + 81, y + 42, 6, c_ZWARTV);
  text(ctx, 'premutatie', x + 120, y + 52, fTekst(30, 600), C.text, 'left');
  circ(ctx, x + 40, y + 96, 15, c_ZWARTV, '#E6E9EF', 3); ctx.beginPath(); ctx.rect(x + 66, y + 81, 30, 30); shape(ctx, c_ZWARTV, '#E6E9EF', 3);
  text(ctx, 'volledige mutatie', x + 120, y + 106, fTekst(30, 600), C.text, 'left'); ctx.restore(); }

// ---------- mRNA, eiwitketens ----------
function c_mrna(ctx, x0, x1, y, a = 1, t = 0, seed = 0, amp = 6, col = C.goud, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = Math.max(8, Math.round((x1 - x0) / 6)); for (let k = 0; k <= n; k++) { const u = k / n, x = x0 + (x1 - x0) * u, yy = y + amp * Math.sin(u * 9 + seed + t * 1.3) + amp * 0.5 * Math.sin(u * 23 + seed * 2); k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); ctx.restore(); }
// kort sliertje mRNA (afbeelding 1)
function c_sliert(ctx, x, y, L, rot, a = 1, t = 0, seed = 0, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); c_mrna(ctx, -L / 2, L / 2, 0, a, t, seed, 5, col, 2.6); ctx.restore(); }
// eiwit als kralenketting die opvouwt (fold 0 = gestrekt, 1 = kluwen)
function c_kluwen(ctx, x, y, r, col, a = 1, fold = 1, seed = 0, n = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pts = [];
  for (let k = 0; k < n; k++) { const sx = (k - (n - 1) / 2) * r * 0.9, sy = 0; const an = k * 1.9 + seed, rr = r * (0.35 + 0.55 * ((k * 7 + seed * 3) % 5) / 4); const fx = Math.cos(an) * rr, fy = Math.sin(an) * rr; pts.push([x + lerp(sx, fx, fold), y + lerp(sy, fy, fold)]); }
  ctx.strokeStyle = _donker(col, 0.25); ctx.lineWidth = r * 0.22; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], k) => k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
  pts.forEach(([px, py]) => circ(ctx, px, py, r * 0.3, col, _donker(col, 0.3), 1.2)); ctx.restore(); }
function c_ribosoom(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y + 14 * s, 50 * s, 30 * s, 0, 0, 6.283); shape(ctx, rgba('#B8A6E0', 0.9), '#D6CCF2', 2); ctx.beginPath(); ctx.ellipse(x, y - 22 * s, 36 * s, 22 * s, 0, 0, 6.283); shape(ctx, rgba('#9C88CF', 0.92), '#D6CCF2', 2); ctx.restore(); }

// ---------- leesraam (vraag 16) ----------
const c_AA = { AUG: 'Met', GCA: 'Ala', UUC: 'Phe', GGA: 'Gly', CUC: 'Leu', AAG: 'Lys', CGG: 'Arg', CGU: 'Arg', UCG: 'Ser', GAC: 'Asp', UCA: 'Ser' };
// seq: string met kleine letters voor ingevoegde nucleotiden; st: per codon 'g' (gelijk), 'x' (extra aminozuur), 'a' (anders gelezen)
function c_leesrij(ctx, x0, y, seq, st, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = o.dx || 34, t = o.t || 0; const N = seq.length, nC = Math.floor(N / 3);
  const lees = o.lees == null ? 1 : o.lees, ins = o.ins == null ? 1 : o.ins, rood = o.rood == null ? 1 : o.rood;
  if (o.label) text(ctx, o.label, x0 - 24, y + 14, fTekst(30, 700), o.labelCol || C.text2, 'right');
  let pos = 0; const xs = []; for (let i = 0; i < N; i++) { const ch = seq[i], isIns = ch !== ch.toUpperCase(); xs.push(x0 + pos * dx + dx / 2); pos += isIns ? ease(ins) : 1; }
  c_mrna(ctx, x0 - 14, x0 + pos * dx + 10, y + 20, 1, t, o.seed || 0, 3, '#E8D9A8', 2.4);
  const colOf = (s) => s === 'x' ? C.goud : s === 'a' ? (rood > 0.5 ? C.koraal : C.teal) : C.teal;
  for (let c = 0; c < nC; c++) { const ca = clamp(lees * nC - c, 0, 1); if (ca <= 0.01) continue; const xa = xs[c * 3] - dx / 2 + 3, xb = xs[c * 3 + 2] + dx / 2 - 3; const aa = c_AA[seq.slice(c * 3, c * 3 + 3).toUpperCase()] || '?'; const col = colOf(st[c]);
    ctx.save(); ctx.globalAlpha *= ca; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xa, y + 32); ctx.lineTo(xa, y + 42); ctx.lineTo(xb, y + 42); ctx.lineTo(xb, y + 32); ctx.stroke();
    const bx = (xa + xb) / 2, by = y + 84; if (c > 0) { const pb = (xs[(c - 1) * 3] + xs[(c - 1) * 3 + 2]) / 2; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(pb + 30, by); ctx.lineTo(bx - 30, by); ctx.stroke(); }
    roundRect(ctx, bx - 34, by - 20, 68, 40, 20); shape(ctx, rgba(col, 0.28), col, 2.5); text(ctx, aa, bx, by + 9, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
  if ((o.rib || 0) > 0.01 && lees > 0.001 && lees < 1) { const c = clamp(lees * nC - 0.5, 0, nC - 1); const ci = Math.floor(c), f = c - ci, cj = Math.min(nC - 1, ci + 1); const mid = (k) => (xs[k * 3] + xs[k * 3 + 2]) / 2; const xr = lerp(mid(ci), mid(cj), ease(f));
    ctx.save(); ctx.globalAlpha *= 0.4 * o.rib; c_ribosoom(ctx, xr, y + 12, 0.9, 1); ctx.restore(); }
  for (let i = 0; i < N; i++) { const ch = seq[i], isIns = ch !== ch.toUpperCase(); const la = isIns ? ins : 1; if (la <= 0.01) continue; const c = Math.floor(i / 3); const anders = c < nC && st[c] === 'a' && rood > 0.5 && lees * nC > c + 0.5;
    ctx.save(); ctx.globalAlpha *= la; text(ctx, ch.toUpperCase(), xs[i], y + 10 - (isIns ? (1 - ins) * 40 : 0), fMeta(28), isIns ? C.goud : anders ? C.koraal : C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- afbeelding 1 ----------
function c_genBalk(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = x1 - x0;
  const ex = []; for (let i = 0; i < 17; i++) ex.push(i); const X = (u) => x0 + L * u;
  // exon 1 met CGG
  const w1 = L * 0.11; roundRect(ctx, x0, y - 22, w1, 44, 22); shape(ctx, '#C9CED8', '#F2F2EE', 2); roundRect(ctx, x0 + 10, y - 16, w1 * 0.45, 32, 12); shape(ctx, rgba(C.goud, 0.7), C.goud, 1.5);
  text(ctx, 'CGG', x0 + 10 + w1 * 0.225, y + 8, fMeta(18), '#121A26', 'center'); text(ctx, '1', x0 + w1 * 0.78, y + 8, fTekst(22, 700), '#121A26', 'center');
  let xx = x0 + w1 + 14; const rest = x1 - xx - 30; const ws = [1, 1, 1, 1, 1, 1, 1, 1.6, 1, 1, 1, 1, 1, 1, 1, 1.6]; const tot = ws.reduce((s, v) => s + v, 0) + 15 * 0.5;
  ws.forEach((w, i) => { const bw = rest * w / tot; roundRect(ctx, xx, y - 18, bw, 36, 10); shape(ctx, '#C9CED8', '#F2F2EE', 1.5); text(ctx, String(i + 2), xx + bw / 2, y + 8, fTekst(bw > 30 ? 20 : 16, 700), '#121A26', 'center'); xx += bw + rest * 0.5 / tot; });
  metaText(ctx, 'ATG', x0 + w1 * 0.6, y - 34, C.text2, 'center', 18); metaText(ctx, 'TAA', xx - rest * 1.6 / tot / 2 - rest * 0.5 / tot, y - 34, C.text2, 'center', 18); text(ctx, '3′ UTR', x1 + 4, y + 8, fTekst(22, 500), C.text2, 'left');
  ctx.restore(); return { e1: x0 + w1 * 0.3 }; }
function c_cggStaaf(ctx, x, y, w, frac, a = 1, methyl = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 24, w, 48, 24); shape(ctx, '#C9CED8', '#F2F2EE', 2);
  const cw = (w - 30) * frac; roundRect(ctx, x - w / 2 + 12, y - 18, cw, 36, 14); shape(ctx, rgba(C.goud, 0.75), C.goud, 1.5); ctx.save(); roundRect(ctx, x - w / 2 + 12, y - 18, cw, 36, 14); ctx.clip(); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; for (let k = 0; k < cw / 9; k++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 12 + k * 9, y + 18); ctx.lineTo(x - w / 2 + 22 + k * 9, y - 18); ctx.stroke(); } ctx.restore();
  text(ctx, 'CGG', x - w / 2 + 12 + cw / 2, y + 8, fMeta(20), '#121A26', 'center');
  if (methyl > 0.01) { const n = 7; for (let k = 0; k < n; k++) { const mx = x - w / 2 + 24 + k * (w - 48) / (n - 1), d = clamp(methyl * 1.6 - k * 0.09, 0, 1); if (d <= 0.01) continue; const my = y - 24 - 20 - (1 - ease(d)) * 18; ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(mx, y - 24); ctx.lineTo(mx, my + 7); ctx.stroke(); circ(ctx, mx, my, 7, C.koraal, '#F2F2EE', 2); ctx.restore(); } }
  ctx.restore(); }
function c_pijlOmlaag(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text2; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 9, y - 18); ctx.lineTo(x - 9, y); ctx.lineTo(x - 18, y); ctx.lineTo(x, y + 18); ctx.lineTo(x + 18, y); ctx.lineTo(x + 9, y); ctx.lineTo(x + 9, y - 18); ctx.closePath(); ctx.stroke(); ctx.restore(); }

// ---------- DNA met promotor, methylering, RNA-polymerase (vraag 17) ----------
function c_promotorDNA(ctx, x0, x1, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0; const pA = x0 + (x1 - x0) * 0.16, pB = x0 + (x1 - x0) * 0.4;
  // promotor- en genvlak
  roundRect(ctx, pA, y - 34, pB - pA, 68, 12); shape(ctx, rgba(C.oker, 0.18), rgba(C.oker, 0.7), 2); roundRect(ctx, pB + 8, y - 34, x1 - pB - 30, 68, 12); shape(ctx, rgba(C.teal, 0.12), rgba(C.teal, 0.6), 2);
  // twee strengen
  for (const s of [-1, 1]) { ctx.strokeStyle = s < 0 ? '#AFC0D0' : '#8FA0B5'; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 80; k++) { const u = k / 80, x = x0 + (x1 - x0) * u; const yy = y + s * 14 * Math.cos(u * 26); k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
  ctx.strokeStyle = rgba('#C9CED8', 0.5); ctx.lineWidth = 2; for (let k = 0; k < 60; k++) { const u = (k + 0.5) / 60, x = x0 + (x1 - x0) * u, h = 14 * Math.cos(u * 26); ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y + h); ctx.stroke(); }
  naamBij(ctx, 'promotor', null, (pA + pB) / 2, y + 82, o.lab == null ? 1 : o.lab, 'center'); naamBij(ctx, 'FMR1-gen', null, (pB + x1) / 2, y + 82, o.lab == null ? 1 : o.lab, 'center');
  // methylgroepen
  const m = o.methyl || 0; if (m > 0.01) { const n = 6; for (let k = 0; k < n; k++) { const mx = pA + 24 + k * (pB - pA - 48) / (n - 1), d = clamp(m * 1.6 - k * 0.1, 0, 1); if (d <= 0.01) continue; const top = k % 2 ? -1 : 1; const my = y - top * (40 + (1 - ease(d)) * 70) ; ctx.save(); ctx.globalAlpha *= d; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(mx, y - top * 14); ctx.lineTo(mx, my); ctx.stroke(); circ(ctx, mx, my - top * 10, 12, C.koraal, '#F2F2EE', 2); text(ctx, 'CH₃', mx, my - top * 10 - top * 30 + (top > 0 ? 0 : 10), fTekst(18, 700), C.koraal, 'center'); ctx.restore(); } }
  // RNA-polymerase: komt aan, botst en wijkt terug
  const pol = o.pol || 0; if (pol > 0.01) { const bots = o.bots || 0; const target = pA + (pB - pA) * 0.5; let px = lerp(x0 - 120, target - 60, ease(clamp(pol, 0, 1))); px -= 90 * Math.sin(Math.min(1, bots) * Math.PI) * 0.5 + 60 * ease(bots); const py = y - 6 - 70 * ease(bots);
    ctx.save(); ctx.globalAlpha *= Math.min(1, pol * 2); ctx.beginPath(); ctx.ellipse(px, py, 74, 52, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.85), lighten(C.teal, 0.4), 2.5); text(ctx, 'RNA-polymerase', px, py + 8, fTekst(20, 700), '#121A26', 'center'); ctx.restore(); }
  ctx.restore(); return { pA, pB }; }

// ---------- zenuwcel-klont en hersenen ----------
function c_klont(ctx, x, y, s, a = 1, t = 0, seed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let k = 0; k < 5; k++) c_sliert(ctx, x + Math.cos(k * 1.3 + seed) * 12 * s, y + Math.sin(k * 1.7 + seed) * 10 * s, 34 * s, k * 0.9 + seed, 1, t, k + seed);
  for (let k = 0; k < 4; k++) circ(ctx, x + Math.cos(k * 1.6 + 0.4 + seed) * 16 * s, y + Math.sin(k * 1.6 + 0.4 + seed) * 13 * s, 7 * s, '#8A8E9A', '#B8BCC6', 1.2); ctx.restore(); }

// ---------- cellen en X-inactivatie ----------
function c_xje(ctx, x, y, s, col, a = 1, inact = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const k = 1 - 0.55 * ease(inact); ctx.scale(s * k, s * k); ctx.rotate(inact * 0.6);
  const c2 = inact > 0.5 ? '#6A6E7A' : col; ctx.strokeStyle = c2; ctx.lineCap = 'round'; ctx.lineWidth = 9 + 6 * inact; ctx.beginPath(); ctx.moveTo(-12, -18); ctx.quadraticCurveTo(-1, 0, -13, 24); ctx.moveTo(12, -18); ctx.quadraticCurveTo(1, 0, 13, 24); ctx.stroke(); ctx.restore(); }
function c_cel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, o.fill || rgba('#3A4E72', 0.75), o.rand || '#AFC0D0', 2.5);
  if (o.kern !== false) { ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 6.283); shape(ctx, rgba(C.kern, 0.55), C.kernR, 1.5); }
  ctx.restore(); }
// weefsel als mozaïek: frac = deel van de cellen waarin het gemuteerde X actief is; kies = 0..1 (cellen 'kiezen')
function c_weefsel(ctx, x, y, cols, rows, frac, kies, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = o.r || 30, gap = r * 2 + 6, seed = o.seed || 1; const n = cols * rows; const idx = [];
  for (let i = 0; i < n; i++) idx.push(i); idx.sort((p, q2) => hash(p * 13 + seed) - hash(q2 * 13 + seed)); const mutSet = new Set(idx.slice(0, Math.round(n * frac)));
  for (let i = 0; i < n; i++) { const cx = x + (i % cols) * gap + ((Math.floor(i / cols) % 2) ? r : 0), cy = y + Math.floor(i / cols) * gap * 0.9; const d = clamp(kies * 1.5 - hash(i * 7 + seed) * 0.5, 0, 1); const mut = mutSet.has(i);
    const col = mut ? C.koraal : C.teal; const pulse = mut && o.puls ? o.puls * (0.5 + 0.5 * Math.sin((o.t || 0) * 5 + i)) : 0;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = d > 0.01 ? rgba(col, 0.2 + 0.45 * d + 0.2 * pulse) : rgba('#3A4E72', 0.7); ctx.fill(); ctx.strokeStyle = d > 0.5 ? col : '#8FA0B5'; ctx.lineWidth = 2; ctx.stroke();
    if (d < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - d; circ(ctx, cx, cy, r * 0.45, rgba(C.kern, 0.6)); ctx.restore(); }
    if (d > 0.01) { ctx.save(); ctx.globalAlpha *= d; c_xje(ctx, cx - r * 0.25, cy, 0.5, mut ? C.koraal : C.teal, 1, 0); c_xje(ctx, cx + r * 0.38, cy + 2, 0.5, mut ? C.teal : C.koraal, 1, 1); ctx.restore(); } }
  ctx.restore(); return { w: cols * gap + r, h: rows * gap * 0.9 }; }
function c_meter(ctx, x, y, w, frac, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 30, 15); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.01) { roundRect(ctx, x, y, Math.max(30, w * frac), 30, 15); shape(ctx, rgba(col, 0.8), col, 2); } if (label) text(ctx, label, x + w + 18, y + 25, fTekst(30, 700), col, 'left'); ctx.restore(); }

// ---------- gel (afbeelding 5) ----------
const c_LANES = { marker: 277, 1: 315, 2: 348, 3: 380, 4: 415, 5: 452, 6: 490, 7: 527, 8: 560, 9: 594, 10: 630, 11: 666, 12: 704 };
// banden: [laan, y, sterkte, dikte]; vlekken: [laan, y0, y1, sterkte]
const c_BANDJES = [[1, 389, 1, 9], [2, 389, 0.2, 7], [4, 389, 0.95, 9], [6, 340, 0.8, 8], [6, 376, 0.85, 8], [7, 389, 1, 12], [9, 352, 0.95, 9], [9, 389, 0.9, 8], [11, 370, 1, 11], [12, 377, 0.45, 6], [12, 389, 0.5, 7], [4, 288, 0.3, 10], [5, 275, 0.25, 10], [10, 265, 0.5, 10]];
const c_VLEKKEN = [[3, 184, 295, 0.22], [5, 182, 292, 0.22], [8, 182, 280, 0.22], [10, 182, 300, 0.25], [4, 276, 300, 0.15], [6, 282, 325, 0.15], [9, 285, 335, 0.15]];
const c_MARKER = [[214, 1, 12], [222, 1, 8], [231, 0.9, 5], [250, 0.85, 5], [261, 0.85, 5], [296, 0.8, 5], [307, 0.8, 5], [330, 0.75, 5], [351, 0.9, 7], [372, 0.75, 5], [391, 0.85, 6]];
function c_gel(ctx, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const gx0 = o.x0 || 150, gx1 = o.x1 || 1190, gy0 = o.y0 || 230, gy1 = o.y1 || 800; const X = (v) => gx0 + (v - 250) * (gx1 - gx0) / (735 - 250), Y = (v) => gy0 + (v - 172) * (gy1 - gy0) / (402 - 172);
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, gx0, gy0, gx1 - gx0, gy1 - gy0, 10); shape(ctx, '#1F2A3A', '#5A6A82', 2);
  const lw = (X(36) - X(0)) * 0.78; const hl = o.hl || {}, dimL = o.dim || {}, bandA = o.banden == null ? 1 : o.banden;
  // putjes + laannummers
  Object.entries(c_LANES).forEach(([k, v]) => { const x = X(v); roundRect(ctx, x - lw / 2, Y(176), lw, 8, 3); shape(ctx, '#0E141E', '#3A4A62', 1); const h = hl[k] || 0;
    if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; roundRect(ctx, x - lw / 2 - 8, gy0 + 6, lw + 16, gy1 - gy0 - 12, 10); ctx.fillStyle = rgba((o.hlCol && o.hlCol[k]) || C.goud, 0.12); ctx.fill(); ctx.strokeStyle = (o.hlCol && o.hlCol[k]) || C.goud; ctx.lineWidth = 3.5; ctx.stroke(); ctx.restore(); }
    text(ctx, k === 'marker' ? 'marker' : k, x, gy0 - 18, fTekst(k === 'marker' ? 24 : 32, h > 0.5 ? 800 : 600), h > 0.5 ? ((o.hlCol && o.hlCol[k]) || C.goud) : C.text, 'center'); });
  const glow = (x, y, w, h, s) => { const g = ctx.createLinearGradient(0, y - h, 0, y + h); g.addColorStop(0, 'rgba(230,240,255,0)'); g.addColorStop(0.5, `rgba(230,240,255,${0.9 * s})`); g.addColorStop(1, 'rgba(230,240,255,0)'); ctx.fillStyle = g; roundRect(ctx, x - w / 2, y - h, w, 2 * h, h * 0.8); ctx.fill(); };
  ctx.save(); ctx.globalAlpha *= bandA;
  c_MARKER.forEach(([y, s, h]) => glow(X(277), Y(y), lw * 1.05, h * 1.4, s));
  c_VLEKKEN.forEach(([l, y0, y1, s]) => { const x = X(c_LANES[l]); ctx.save(); ctx.globalAlpha *= 1 - 0.75 * (dimL[l] || 0); const g = ctx.createLinearGradient(0, Y(y0), 0, Y(y1)); g.addColorStop(0, 'rgba(230,240,255,0)'); g.addColorStop(0.3, `rgba(230,240,255,${s})`); g.addColorStop(0.8, `rgba(230,240,255,${s})`); g.addColorStop(1, 'rgba(230,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - lw / 2 + 4, Y(y0), lw - 8, Y(y1) - Y(y0)); ctx.restore(); });
  c_BANDJES.forEach(([l, y, s, h]) => { ctx.save(); ctx.globalAlpha *= 1 - 0.75 * (dimL[l] || 0); glow(X(c_LANES[l]), Y(y), lw * 0.9, h * 1.5, s); ctx.restore(); });
  ctx.restore();
  // zones
  const za = o.zones == null ? 1 : o.zones; if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; ctx.setLineDash([12, 9]); ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 2.5; [178, 322, 377].forEach((v) => { ctx.beginPath(); ctx.moveTo(gx0, Y(v)); ctx.lineTo(gx1 + 20, Y(v)); ctx.stroke(); }); ctx.setLineDash([]);
    const zl = [[178, 318, 'volledige mutatie', '≥ 200', C.koraal, 'v'], [324, 375, 'premutatie', '50–199', C.goud, 'p'], [379, 402, 'normaal', '< 50', C.teal, 'n']];
    zl.forEach(([y0, y1, n, r, col, k]) => { const zh = (o.zoneHl && o.zoneHl[k]) || 0; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx1 + 30, Y(y0) + 4); ctx.lineTo(gx1 + 42, Y(y0) + 4); ctx.lineTo(gx1 + 42, Y(y1) - 4); ctx.lineTo(gx1 + 30, Y(y1) - 4); ctx.stroke();
      const ym = (Y(y0) + Y(y1)) / 2; text(ctx, n, gx1 + 58, ym - (y1 - y0 < 40 ? 4 : 6), fTekst(30, zh > 0.5 ? 800 : 700), col, 'left'); text(ctx, r + ' herhalingen', gx1 + 58, ym + 28, fTekst(24, 500), C.text2, 'left'); }); ctx.restore(); }
  ctx.restore(); return { X, Y, lw }; }

// ---------- PCR ----------
function c_dnaStukje(ctx, x, y, w, a = 1, nieuw = 1, sep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - w / 2, y - 7 - sep); ctx.lineTo(x + w / 2, y - 7 - sep); ctx.stroke();
  if (nieuw > 0.01) { ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(x - w / 2, y + 7 + sep); ctx.lineTo(x - w / 2 + w * clamp(nieuw, 0, 1), y + 7 + sep); ctx.stroke();
    ctx.strokeStyle = rgba('#C9CED8', 0.45); ctx.lineWidth = 2; for (let k = 0; k < w * nieuw / 12; k++) { const xx = x - w / 2 + 6 + k * 12; ctx.beginPath(); ctx.moveTo(xx, y - 4 - sep); ctx.lineTo(xx, y + 4 + sep); ctx.stroke(); } }
  ctx.restore(); }

// ---------- synaps (afbeelding 6) ----------
function c_glu(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#E8D9A8'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 9 * s, y + 4 * s); ctx.lineTo(x, y - 4 * s); ctx.lineTo(x + 9 * s, y + 4 * s); ctx.stroke(); circ(ctx, x - 9 * s, y + 4 * s, 5 * s, C.goud); circ(ctx, x, y - 4 * s, 5 * s, C.goud); circ(ctx, x + 9 * s, y + 4 * s, 5 * s, C.goud); ctx.restore(); }
function c_ampa(ctx, x, y, an, s = 1, col = C.groen, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  for (const d of [-1, 1]) { roundRect(ctx, d * 12 - 9, -30, 18, 60, 8); shape(ctx, col, lighten(col, 0.35), 2); } ctx.fillStyle = rgba('#121A26', 0.5); ctx.fillRect(-3, -30, 6, 60); ctx.restore(); }
function c_mglur(ctx, x, y, an, s = 1, bind = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s);
  roundRect(ctx, -16, -22, 32, 52, 10); shape(ctx, C.paars, lighten(C.paars, 0.35), 2); ctx.beginPath(); ctx.arc(0, -36, 20, Math.PI * 1.1, Math.PI * 1.9 + Math.PI, false); ctx.beginPath(); ctx.moveTo(-20, -30); ctx.quadraticCurveTo(-24, -58, -6, -60); ctx.lineTo(-6, -44); ctx.lineTo(6, -44); ctx.lineTo(6, -60); ctx.quadraticCurveTo(24, -58, 20, -30); ctx.closePath(); shape(ctx, C.paars, lighten(C.paars, 0.35), 2);
  if (bind > 0.01) { c_glu(ctx, 0, -52 - (1 - ease(bind)) * 60, 0.9, bind); if (bind > 0.95) { ctx.save(); ctx.globalAlpha *= 0.5; circ(ctx, 0, -10, 30, rgba(C.goud, 0.25)); ctx.restore(); } }
  ctx.restore(); }
// mode: 'normaal' | 'fxs'; st: {glu, bind, synth, fmrp, weg, t, labels, ampaHl}
function c_synaps(ctx, cx, cy, s, mode, st = {}) { const a = st.a == null ? 1 : st.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s); const t = st.t || 0;
  // presynaptisch eindknopje (van boven)
  ctx.beginPath(); ctx.moveTo(-120, -330); ctx.bezierCurveTo(-130, -260, -230, -230, -210, -160); ctx.bezierCurveTo(-190, -95, 190, -95, 210, -160); ctx.bezierCurveTo(230, -230, 130, -260, 120, -330); ctx.closePath(); shape(ctx, '#2E3F62', '#AFC0D0', 2.5);
  const gluP = [[-80, -250], [-20, -270], [40, -245], [95, -220], [-110, -190], [-40, -200], [20, -185], [80, -170], [-60, -150], [10, -145]];
  gluP.forEach(([gx, gy], i) => c_glu(ctx, gx + wander(i, t, 4, 0.8).x, gy + wander(i, t, 4, 0.8).y, 1.1, 1));
  // postsynaptisch: gebogen membraan (koepel)
  const M = (u) => { const x = -330 + 660 * u; const y = -40 + 260 * Math.pow(Math.abs(u - 0.5) * 2, 2.2); return [x, y]; };
  const Mn = (u) => { const [x1, y1] = M(u - 0.005), [x2, y2] = M(u + 0.005); return Math.atan2(y2 - y1, x2 - x1); };
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [x, y] = M(k / 60); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.lineTo(330, 330); ctx.lineTo(-330, 330); ctx.closePath(); shape(ctx, '#33476E', null);
  for (const off of [0, 9]) { ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [x, y] = M(k / 60); k ? ctx.lineTo(x, y + off) : ctx.moveTo(x, y + off); } ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2.5; ctx.stroke(); }
  // glutamaat afgegeven in de spleet
  const g = st.glu || 0; if (g > 0.01) { for (let i = 0; i < 4; i++) { const tx = -150 + (i - 1.5) * 50, d = clamp(g * 1.5 - i * 0.15, 0, 1); if (d <= 0.01) continue; c_glu(ctx, lerp(-60 + i * 30, tx, d) + wander(i + 20, t, 6, 1).x * (1 - d), lerp(-130, -95, d), 1.1, d * (1 - (st.bind || 0))); } }
  // mGluR5
  const [mx, my] = M(0.27); c_mglur(ctx, mx, my + 4, Mn(0.27), 1, st.bind || 0, 1);
  // AMPA-receptoren
  const amp = [0.58, 0.66, 0.74]; const weg = mode === 'fxs' ? (st.weg == null ? 1 : st.weg) : 0; const binnen = [[110, 150], [175, 225], [0, 0]];
  amp.forEach((u, i) => { const [ax, ay] = M(u); let x = ax, y = ay + 5, an = Mn(u); if (i < 2 && weg > 0.01) { const e = ease(weg); x = lerp(ax, binnen[i][0], e); y = lerp(ay + 5, binnen[i][1], e); an = lerp(an, 0.3 + i * 0.4, e); }
    if (st.ampaHl > 0.01 && (i === 2 || weg < 0.5)) { ctx.save(); ctx.globalAlpha *= st.ampaHl; circ(ctx, x, y, 42, rgba(C.groen, 0.22)); ctx.restore(); }
    c_ampa(ctx, x, y, an, 1, C.groen, 1); });
  // eiwitsynthese: mRNA met ribosomen, eiwitketens
  const sy = st.synth || 0; c_mrna(ctx, -230, -60, 140, 1, t, 2, 4, C.goud, 2.6);
  [-200, -145, -90].forEach((rx, i) => { ctx.save(); ctx.globalAlpha *= 0.9; ctx.beginPath(); ctx.ellipse(rx, 136, 17, 12, 0, 0, 6.283); shape(ctx, '#9C88CF', '#D6CCF2', 1.5); ctx.restore(); if (sy > 0.01) c_kluwen(ctx, rx + 4, 106 - 8 * sy, 14, C.oker, clamp(sy * 1.4 - i * 0.15, 0, 1), clamp(sy * 1.2 - 0.2, 0, 1), i, 6); });
  // pijlen
  ctx.save(); ctx.globalAlpha *= st.pijlen == null ? 1 : st.pijlen; pijl(ctx, mx, my + 40, -145, 76, '#C9CED8', 1, 3.5, 14);
  const fm = st.fmrp || 0; const rem = mode === 'normaal';
  pijl(ctx, -40, 136, 130, 136, '#C9CED8', 1, 3.5, 14); ctx.strokeStyle = '#C9CED8'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(150, -10); ctx.lineTo(150, mode === 'fxs' ? 260 : 120); ctx.stroke(); if (mode === 'fxs') pijl(ctx, 150, 230, 150, 268, '#C9CED8', 1, 3.5, 14); else pijl(ctx, 150, 90, 150, 124, '#C9CED8', 1, 3.5, 14);
  ctx.restore();
  // FMRP-rem (normaal) of ontbreekt (fxs)
  if (rem && fm > 0.01) { ctx.save(); ctx.globalAlpha *= fm; c_kluwen(ctx, 45, 58, 18, C.teal, 1, 1, 4, 8); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(45, 78); ctx.lineTo(45, 124); ctx.moveTo(28, 124); ctx.lineTo(62, 124); ctx.stroke(); ctx.restore(); }
  if (!rem && fm > 0.01) { ctx.save(); ctx.globalAlpha *= fm; ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(45, 58, 24, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); kruis(ctx, 45, 58, 14, 1, C.koraal); ctx.restore(); }
  ctx.restore();
  // namen (buiten de transformatie, direct bij het onderdeel)
  const la = (st.labels || 0) * a; if (la > 0.01) { const P = (x, y) => [cx + x * s, cy + y * s]; let p;
    p = P(-215, -265); naamBij(ctx, 'glutamaat', null, p[0], p[1], la * (st.lGlu == null ? 1 : st.lGlu), 'right');
    p = P(mx - 40, my - 30); naamBij(ctx, 'mGluR5', null, p[0], p[1], la * (st.lM == null ? 1 : st.lM), 'right');
    p = P(265, -10); naamBij(ctx, 'AMPA', null, p[0], p[1], la * (st.lA == null ? 1 : st.lA), 'left');
    p = P(-145, 200); naamBij(ctx, 'eiwitsynthese', null, p[0], p[1], la * (st.lE == null ? 1 : st.lE), 'center');
    if (mode === 'normaal') { p = P(75, 50); naamBij(ctx, 'FMRP', null, p[0], p[1], la * fm, 'left', C.teal); } }
}

// ---------- muis (vraag 26) ----------
function c_muis(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0, beef = o.beef || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + beef * 2.5 * Math.sin(t * 30), y); ctx.scale(s * (o.kijk || 1), s);
  ctx.strokeStyle = '#D9A0A0'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-95, 10); ctx.bezierCurveTo(-170, 30, -190, -40, -235, -12 + 6 * Math.sin(t * 2)); ctx.stroke();
  for (const fx of [-50, 50]) { ctx.fillStyle = '#E7B9B4'; ctx.beginPath(); ctx.ellipse(fx, 50, 15, 7, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(0, 0, 105, 58, 0, 0, 6.283); shape(ctx, '#C9C2BA', '#E6E0D8', 2); ctx.beginPath(); ctx.ellipse(-10, 18, 80, 30, 0, 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.fill();
  ctx.beginPath(); ctx.moveTo(70, -40); ctx.quadraticCurveTo(150, -40, 172, 2); ctx.quadraticCurveTo(140, 30, 70, 30); ctx.closePath(); shape(ctx, '#C9C2BA', '#E6E0D8', 2);
  circ(ctx, 88, -50, 24, '#E7B9B4', '#E6E0D8', 2); circ(ctx, 88, -50, 13, '#D69A96'); circ(ctx, 128, -14, 5.5, '#121A26'); circ(ctx, 130, -16, 1.8, '#FFFFFF'); circ(ctx, 172, 1, 6, '#D98080');
  ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = 1.5; for (const d of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(160, 4); ctx.lineTo(205, 2 + d * 12); ctx.stroke(); }
  ctx.restore(); }
function c_genKaartje(ctx, x, y, a = 1, uit = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 92, y - 30, 184, 60, 30); shape(ctx, rgba(EX.papier, 0.92), uit > 0.5 ? C.koraal : C.teal, 2.5);
  text(ctx, 'FMR1-gen', x, y + 10, fTekst(28, 700), C.text, 'center'); if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 80, y + 4); ctx.lineTo(x - 80 + 160 * clamp(uit * 1.3, 0, 1), y - 2); ctx.stroke(); ctx.restore(); } ctx.restore(); }
function c_flesje(ctx, x, y, s = 1, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -26, -50, 52, 80, 12); shape(ctx, rgba(col, 0.3), lighten(col, 0.3), 2.5); roundRect(ctx, -14, -68, 28, 20, 4); shape(ctx, '#C9CED8', null); ctx.fillStyle = rgba(col, 0.75); roundRect(ctx, -22, -14, 44, 40, 8); ctx.fill(); ctx.restore(); }
// Examenbespreking vwo 2018-II — tekenfuncties deel d (Wat te doen aan de muizenplagen?, vragen 31–38). Prefix d_.

const D_CTX = 'WAT TE DOEN AAN DE MUIZENPLAGEN?';
const D_GRAS = '#5FA86E', D_GRASD = '#3F7A4E', D_DROOG = '#A8955E', D_GROND = '#4A3626', D_GRONDD = '#3A2A1E', D_GANG = '#21160E', D_WATER = '#2E6FBF';
function d_win(t, t0, t1 = Infinity, d = 0.4) { return Math.min(ramp(t, t0, d), 1 - ramp(t, t1 - d, d)); }
function d_al(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function d_mix(h1, h2, k) { k = clamp(k, 0, 1); const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return `rgb(${c(16)},${c(8)},${c(0)})`; }
function d_ring(ctx, x, y, r, a, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + 6.283 * ease(a)); ctx.stroke(); ctx.restore(); }

// ---------- veldmuis (getekend: gedrongen, korte staart, kleine oortjes) ; (x,y) = grond onder het midden; kijk 1 = naar rechts ----------
function d_veldmuis(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round';
  const bob = loop ? Math.abs(Math.sin(t * 10)) * 3 : 0; ctx.translate(0, -bob);
  ctx.strokeStyle = '#6E5440'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-70, -30); ctx.quadraticCurveTo(-96, -26, -110, -14 + Math.sin(t * 3) * 3); ctx.stroke();
  [[-42, 0], [-12, 1], [28, 1.5], [52, 0.5]].forEach(([fx, i]) => { const dx = Math.sin(t * 10 + i * Math.PI) * 9 * loop; ctx.beginPath(); ctx.ellipse(fx + dx, -3 + bob, 13, 6, 0, 0, 6.283); ctx.fillStyle = '#C9A08A'; ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(-6, -42, 76, 44, 0, 0, 6.283); ctx.fillStyle = '#8B6B4E'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.ellipse(4, -8, 70, 22, 0, 0, 6.283); ctx.fillStyle = '#C2A584'; ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#6E5238'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const fx = -60 + i * 20; ctx.beginPath(); ctx.moveTo(fx, -70 + Math.abs(i - 2.5) * 4); ctx.lineTo(fx + 8, -60 + Math.abs(i - 2.5) * 4); ctx.stroke(); }
  const tw = Math.sin(t * 9) * 1.2;
  ctx.beginPath(); ctx.ellipse(58, -48, 40, 34, 0.15, 0, 6.283); ctx.fillStyle = '#8B6B4E'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(88, -38 + tw, 20, 16, 0.2, 0, 6.283); ctx.fillStyle = '#937458'; ctx.fill();
  circ(ctx, 46, -80, 14, '#7A5A40'); circ(ctx, 47, -79, 7.5, '#C99A88');
  circ(ctx, 80, -58, 6, '#121A26'); circ(ctx, 82, -60, 2, '#FFFFFF');
  circ(ctx, 106, -40 + tw, 5.5, '#C98A8A');
  ctx.strokeStyle = 'rgba(240,232,220,0.65)'; ctx.lineWidth = 1.6; [[-10], [0], [10]].forEach(([dy]) => { ctx.beginPath(); ctx.moveTo(98, -38 + tw); ctx.lineTo(134, -40 + dy * 1.2 + tw); ctx.stroke(); });
  ctx.restore(); }
// telmuisje (heel klein, voor aantallen in een veldje)
function d_muisje(ctx, x, y, s, a = 1, k = 1, t = 0) { d_veldmuis(ctx, x, y, s, a, t, { kijk: k }); }

// ---------- grasland in doorsnede ; kaal 0..1, water 0..1 ----------
function d_grasland(ctx, x, y, w, h, o = {}) { const { kaal = 0, t = 0, a = 1, water = 0, gangen = kaal, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip(); const sy = y + h * 0.5;
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = D_GROND; ctx.fillRect(x, sy, w, h); ctx.fillStyle = D_GRONDD; ctx.fillRect(x, sy + h * 0.32, w, h);
  // gangen + nestkamers
  if (gangen > 0.01) { ctx.save(); ctx.globalAlpha *= gangen; ctx.strokeStyle = water > 0.3 ? d_mix(D_GANG, D_WATER, water) : D_GANG; ctx.lineWidth = 15; ctx.lineCap = 'round';
    for (let i = 0; i < 4; i++) { const gx = x + w * (0.12 + i * 0.24) + hash(seed + i) * 30; ctx.beginPath(); ctx.moveTo(gx, sy); ctx.bezierCurveTo(gx + 20, sy + h * 0.15, gx + 70, sy + h * 0.12, gx + 120, sy + h * (0.2 + 0.1 * hash(i + 4))); ctx.lineTo(gx + w * 0.2, sy + h * 0.16); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(gx + 120, sy + h * (0.2 + 0.1 * hash(i + 4)) + 10, 30, 16, 0, 0, 6.283); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); }
    ctx.restore(); }
  // gras
  const N = Math.floor(w / 8);
  for (let i = 0; i < N; i++) { const r = hash(i * 3.1 + seed); if (r < kaal * 0.88) continue; const bx = x + (i + hash(i + 9)) * w / N, hh = (34 + hash(i + 17) * 34) * (1 - 0.7 * kaal); const sw = Math.sin(t * 1.6 + i * 0.5) * 4;
    ctx.strokeStyle = d_mix(i % 3 ? D_GRAS : D_GRASD, D_DROOG, kaal * 1.1); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(bx, sy + 2); ctx.quadraticCurveTo(bx + 2, sy - hh * 0.6, bx + 6 + sw, sy - hh); ctx.stroke(); }
  // gaten aan het oppervlak
  if (gangen > 0.01) { ctx.save(); ctx.globalAlpha *= gangen; for (let i = 0; i < 9; i++) { const hx = x + w * (0.06 + i * 0.11) + hash(i + 30) * 20; ctx.beginPath(); ctx.ellipse(hx, sy + 3, 16, 7, 0, 0, 6.283); ctx.fillStyle = '#140D08'; ctx.fill(); } ctx.restore(); }
  if (water > 0.01) { const lev = h * 0.18 * water; ctx.fillStyle = rgba(D_WATER, 0.6); ctx.fillRect(x, sy - lev, w, lev + 4); ctx.strokeStyle = rgba('#9CC8F0', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, sy - lev + Math.sin(xx * 0.05 + t * 2) * 3); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); return sy; }

// ---------- assen met labels (eigen, groter dan assen()) ----------
function d_assen(ctx, x, y, w, h, xl, yl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
  if (xl) text(ctx, xl, x + w, y + h + 40, fTekst(26, 600), C.text2, 'right'); if (yl) text(ctx, yl, x + 14, y - 18, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }
// lijn fn(s)->0..1 over [s0,u]
function d_lijn(ctx, x, y, w, h, fn, u, col, o = {}) { const s0 = o.s0 || 0; if (u <= s0 + 0.001) return; ctx.save(); if (o.a != null) ctx.globalAlpha *= o.a; ctx.strokeStyle = col; ctx.lineWidth = o.lw || 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath(); const n = 120; for (let i = 0; i <= n; i++) { const s = s0 + (u - s0) * i / n; const px = x + w * s, py = y + h - h * clamp(fn(s), -0.02, 1.05); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

// ---------- populatie door het jaar (jan..dec) ----------
const D_MND = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
function d_jaarFn(s) { const m = s * 12; if (m < 3) return 0.1 - 0.02 * m / 3; if (m < 10.6) return 0.08 + 0.86 * Math.pow((m - 3) / 7.6, 2.3); return 0.94 - 0.7 * Math.pow((m - 10.6) / 1.4, 1.3); }
function d_jaar(ctx, x, y, w, h, u, o = {}) { const { a = 1, hl = {}, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const banden = [['winter', 0, 2, C.teal], ['voorjaar', 2, 5, C.groen], ['zomer', 5, 8, C.goud], ['najaar', 8, 11, C.oker], ['winter', 11, 12, C.teal]];
  banden.forEach(([n, m0, m1, col], i) => { const k = hl[n] || 0; roundRect(ctx, x + w * m0 / 12 + 2, y, w * (m1 - m0) / 12 - 4, h, 10); shape(ctx, rgba(col, 0.06 + 0.12 * k), null); if (i < 4 && k > 0.01) d_al(ctx, k, () => text(ctx, n, x + w * (m0 + m1) / 24, y + 44, fTekst(32, 700), col, 'center')); });
  d_assen(ctx, x, y, w, h, '', 'aantal veldmuizen');
  D_MND.forEach((m, i) => text(ctx, m, x + w * (i + 0.5) / 12, y + h + 36, fTekst(24, 500), C.text2, 'center'));
  d_lijn(ctx, x, y, w, h, d_jaarFn, u, C.koraal, { lw: 7 });
  if (u > 0.01 && u < 0.999) { const px = x + w * u, py = y + h - h * d_jaarFn(u); circ(ctx, px, py, 10, C.koraal); }
  ctx.restore(); }

// ---------- J-curve-diagram vraag 32 (april..november, 0..7000) ----------
// m = maand-index: 0 = begin april, 1 = begin mei, 3 = begin juli, 7 = begin november, 8 = eind november
function d_N1(m) { return 10 * Math.pow(600, (m - 1) / 6); }
function d_N2(m) { return 42 * Math.pow(600, (m - 3) / 6); }
const D_JM = ['april', 'mei', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov'];
function d_jdiag(ctx, x, y, w, h, o = {}) { const { a = 1, u1 = 0, u2 = 0, mk = [], hl1 = 0, hl2 = 0, water = 0, t = 0, legenda = 1, dim1 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = (m) => x + w * m / 8, Y = (n) => y + h - h * n / 7000;
  // raster
  ctx.strokeStyle = rgba(C.line, 0.13); ctx.lineWidth = 1; for (let i = 0; i <= 32; i++) { ctx.beginPath(); ctx.moveTo(x + w * i / 32, y); ctx.lineTo(x + w * i / 32, y + h); ctx.stroke(); } for (let i = 0; i <= 28; i++) { ctx.beginPath(); ctx.moveTo(x, y + h * i / 28); ctx.lineTo(x + w, y + h * i / 28); ctx.stroke(); }
  ctx.strokeStyle = rgba(C.line, 0.3); for (let i = 0; i <= 7; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 1000)); ctx.lineTo(x + w, Y(i * 1000)); ctx.stroke(); }
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; roundRect(ctx, X(3) - 4, y, w / 8 * 0.18, h, 6); shape(ctx, rgba(D_WATER, 0.35), rgba('#9CC8F0', 0.7), 2); ctx.restore(); }
  d_assen(ctx, x, y, w, h, '', 'aantal veldmuizen');
  for (let i = 0; i <= 7; i++) text(ctx, String(i * 1000), x - 14, Y(i * 1000) + 9, fTekst(24, 500), C.text2, 'right');
  D_JM.forEach((m, i) => text(ctx, m, X(i + 0.5), y + h + 36, fTekst(24, 500), C.text2, 'center'));
  const curve = (fn, m0, m1, u, col, dash, lw) => { if (u <= 0.001) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const me = m0 + (m1 - m0) * clamp(u, 0, 1); for (let i = 0; i <= 140; i++) { const m = m0 + (me - m0) * i / 140; const px = X(m), py = Y(fn(m)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); };
  const c1 = d_mix(C.koraal, '#6A7488', dim1);
  if (hl1 > 0.01) curve(d_N1, 1, 7, u1, rgba(C.koraal, 0.3 * hl1), null, 20);
  if (hl2 > 0.01) curve(d_N2, 3, 7, u2, rgba(C.teal, 0.3 * hl2), null, 20);
  curve(d_N1, 1, 7, u1, c1, null, 6);
  curve(d_N2, 3, 7, u2, C.teal, [16, 12], 6);
  if (u1 > 0.001 && u1 < 0.999) { const m = 1 + 6 * u1; circ(ctx, X(m), Y(d_N1(m)), 9, C.koraal); }
  if (u2 > 0.001 && u2 < 0.999) { const m = 3 + 4 * u2; circ(ctx, X(m), Y(d_N2(m)), 9, C.teal); }
  mk.forEach((p) => { if ((p.a || 0) <= 0.01) return; const px = X(p.m), py = Y(p.n); d_al(ctx, p.a, () => { circ(ctx, px, py, 9, p.col || C.goud); d_ring(ctx, px, py, 22, p.a, p.col || C.goud); if (p.t) naamBij(ctx, p.t, null, px + (p.dx || 30), py + (p.dy || -26), 1, p.al || 'left', p.col || C.goud); }); });
  if (legenda > 0.01) d_al(ctx, legenda, () => { const lx = x + 30, ly = y + 40; ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 60, ly); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(lx, ly + 42); ctx.lineTo(lx + 60, ly + 42); ctx.stroke(); ctx.restore();
    text(ctx, 'zonder ingreep', lx + 76, ly + 9, fTekst(26, 600), C.text, 'left'); text(ctx, 'met ingreep', lx + 76, ly + 51, fTekst(26, 600), C.text, 'left'); });
  ctx.restore(); return { X, Y }; }
// inzoomvenster op de knik in juli (mei..aug, 0..200)
function d_jzoom(ctx, x, y, w, h, o = {}) { const { a = 1, u1 = 1, u2 = 1, mk80 = 0, mk40 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.save(); ctx.globalAlpha *= Math.min(1, a * 6);
  roundRect(ctx, x - 20, y - 70, w + 70, h + 130, 18); shape(ctx, '#16223A', C.goud, 2.5); ctx.restore(); ctx.globalAlpha *= a; metaText(ctx, 'ingezoomd · mei – aug', x, y - 30, C.goud, 'left', 22);
  const m0 = 1, m1 = 5, N1 = 200, X = (m) => x + w * (m - m0) / (m1 - m0), Y = (n) => y + h - h * n / N1;
  ctx.strokeStyle = rgba(C.line, 0.25); ctx.lineWidth = 1; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 50)); ctx.lineTo(x + w, Y(i * 50)); ctx.stroke(); text(ctx, String(i * 50), x - 12, Y(i * 50) + 8, fTekst(22, 500), C.text2, 'right'); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ['mei', 'juni', 'juli', 'aug'].forEach((m, i) => text(ctx, m, X(1.5 + i), y + h + 32, fTekst(22, 500), C.text2, 'center'));
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - 4, w, h + 4); ctx.clip();
  const cur = (fn, a0, a1, u, col, dash) => { if (u <= 0.001) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const me = a0 + (a1 - a0) * u; for (let i = 0; i <= 80; i++) { const m = a0 + (me - a0) * i / 80; i ? ctx.lineTo(X(m), Y(fn(m))) : ctx.moveTo(X(m), Y(fn(m))); } ctx.stroke(); ctx.restore(); };
  cur(d_N1, 1, 5, u1, C.koraal); cur(d_N2, 3, 5, u2, C.teal, [14, 10]);
  if (u2 > 0.01) { ctx.save(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(3), Y(84)); ctx.lineTo(X(3), Y(42)); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (mk80 > 0.01) d_al(ctx, mk80, () => { circ(ctx, X(3), Y(84), 9, C.koraal); d_ring(ctx, X(3), Y(84), 22, mk80, C.koraal); naamBij(ctx, '≈ 80', null, X(3) - 34, Y(84) - 22, 1, 'right', C.koraal); });
  if (mk40 > 0.01) d_al(ctx, mk40, () => { circ(ctx, X(3), Y(42), 9, C.teal); d_ring(ctx, X(3), Y(42), 22, mk40, C.teal); naamBij(ctx, '≈ 40', null, X(3) + 34, Y(42) + 34, 1, 'left', C.teal); });
  ctx.restore(); }

// ---------- staafdiagram afbeelding 3 (nagetekend uit o-20.png) ----------
const D_STAAF = [[null, null, 12, 9], [null, 15, 9, 27], [3, null, 12, 30], [2, 3, 19, 53], [null, null, 30, 72], [null, 17, 35, 72]];
const D_STAAF_X = ['0-20', '20-40', '40-60', '60-80', '80-100', '100-120'];
const D_OPEN = [['0-15 m', '#2F6B57'], ['15-30 m', '#4F9A86'], ['30-300 m', '#A8C77A'], ['300-900 m', '#E8C45E']];
function d_staaf(ctx, x, y, w, h, o = {}) { const { a = 1, grow = 1, hlG = -1, hlA = 0, hlK = -1, hlKA = 0, rings = [], spread = 0, nul = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const Y = (v) => y + h - h * v / 80, gw = w / 6, bw = gw * 0.17;
  ctx.strokeStyle = rgba(C.line, 0.28); ctx.lineWidth = 1.5; for (let i = 1; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(x, Y(i * 10)); ctx.lineTo(x + w, Y(i * 10)); ctx.stroke(); }
  for (let i = 0; i <= 8; i++) text(ctx, String(i * 10), x - 14, Y(i * 10) + 9, fTekst(24, 500), C.text2, 'right');
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  text(ctx, '% schademeldingen', x + 14, y - 22, fTekst(26, 600), C.text2, 'left');
  D_STAAF.forEach((g, gi) => { const gx = x + gw * gi + gw / 2; const dimG = hlG >= 0 && gi !== hlG ? hlA : 0;
    if (hlG === gi && hlA > 0.01) d_al(ctx, hlA, () => { roundRect(ctx, gx - gw / 2 + 6, y - 4, gw - 12, h + 8, 12); shape(ctx, rgba(C.goud, 0.1), C.goud, 2.5); });
    text(ctx, D_STAAF_X[gi] + ' cm', gx, y + h + 36, fTekst(24, hlG === gi && hlA > 0.5 ? 700 : 500), hlG === gi && hlA > 0.5 ? C.goud : C.text2, 'center');
    g.forEach((v, bi) => { const bx = gx + (bi - 2) * bw; if (v == null) { if (nul > 0.01 && gi === hlG && bi < 2) d_al(ctx, nul, () => text(ctx, '0', bx + bw / 2, Y(0) - 12, fTekst(26, 800), C.koraal, 'center')); return; }
      const gr = clamp(grow * 6 - gi, 0, 1); const vh = v * ease(gr); if (vh <= 0.05) return; const dimK = hlK >= 0 && bi !== hlK ? hlKA : 0; const dm = Math.max(dimG, dimK);
      ctx.save(); ctx.globalAlpha *= 1 - 0.72 * dm; ctx.beginPath(); ctx.rect(bx + 2, Y(vh), bw - 4, Y(0) - Y(vh)); shape(ctx, D_OPEN[bi][1], '#0E1626', 1.5); ctx.restore(); });
  });
  rings.forEach((r) => { if ((r.a || 0) <= 0.01) return; const v = D_STAAF[r.g][r.b]; const bx = x + gw * r.g + gw / 2 + (r.b - 1.5) * bw; d_ring(ctx, bx, Y(v) - 4, 26, r.a, r.col || C.goud); if (r.t) d_al(ctx, r.a, () => naamBij(ctx, r.t, null, bx + (r.dx || 34), Y(v) + (r.dy || -10), 1, r.al || 'left', r.col || C.goud)); });
  if (spread > 0.01 && hlG >= 0) d_al(ctx, spread, () => { const gx = x + gw * hlG + gw / 2 - gw * 0.5 + 4; const top = Y(D_STAAF[hlG][3]); pijl(ctx, gx, Y(0) - 6, gx, top + 6 + (Y(0) - top) * (1 - ease(spread)), C.goud, 1, 5, 18); pijl(ctx, gx, top + 6, gx, top + 7, C.goud, 1, 5, 18); });
  // legenda
  const ly = y + h + 84; text(ctx, 'openheid:', x, ly + 8, fTekst(26, 600), C.text2, 'left');
  D_OPEN.forEach(([n, col], i) => { const lx = x + 140 + (i % 2) * 230, ly2 = ly + Math.floor(i / 2) * 40; const dk = hlK >= 0 && i !== hlK ? hlKA : 0; d_al(ctx, 1 - 0.6 * dk, () => { ctx.beginPath(); ctx.rect(lx, ly2 - 14, 30, 26); shape(ctx, col, '#0E1626', 1.5); text(ctx, n, lx + 40, ly2 + 8, fTekst(24, 600), C.text, 'left'); }); });
  text(ctx, 'drooglegging →', x + w, ly + 8, fTekst(24, 600), C.text2, 'right');
  ctx.restore(); }

// ---------- Nederland in zeshoeken ----------
const D_NL = [[3.37, 51.37], [3.9, 51.22], [4.3, 51.37], [4.8, 51.45], [5.1, 51.43], [5.5, 51.28], [5.85, 51.15], [5.68, 50.85], [5.75, 50.76], [6.02, 50.78], [6.08, 51.0], [5.95, 51.22], [6.2, 51.5], [5.95, 51.8], [6.2, 51.87], [6.8, 51.95], [6.75, 52.1], [7.05, 52.25], [6.95, 52.45], [6.7, 52.52], [7.05, 52.65], [7.2, 53.0], [7.2, 53.25], [6.9, 53.38], [6.2, 53.42], [5.6, 53.4], [5.15, 53.2], [5.4, 52.95], [5.25, 52.85], [5.05, 52.75], [5.1, 52.95], [4.75, 52.95], [4.6, 52.5], [4.4, 52.2], [4.0, 51.95], [3.6, 51.6], [3.45, 51.5]];
function d_nlKaart(ctx, x, y, s, o = {}) { const { a = 1, hex = 1, rood = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = (lo, la) => [x + (lo - 3.3) * 160 * s, y + (53.5 - la) * 260 * s]; const pad = new Path2D(); D_NL.forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? pad.lineTo(px, py) : pad.moveTo(px, py); }); pad.closePath();
  ctx.fillStyle = rgba(C.groen, 0.12); ctx.fill(pad); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke(pad);
  const r = 13 * s, dx = r * Math.sqrt(3), dy = r * 1.5; let k = 0;
  for (let j = 0; j < 60; j++) for (let i = 0; i < 60; i++) { const cx = x + i * dx + (j % 2) * dx / 2, cy = y + j * dy; if (cx > x + 680 * s || cy > y + 780 * s) continue; if (!ctx.isPointInPath(pad, cx, cy)) continue; k++;
    const vis = clamp(hex * 1.6 - (cy - y) / (780 * s) * 0.6, 0, 1); if (vis <= 0.01) continue; const isR = hash(k * 1.7) < 0.28 && rood > 0.01;
    ctx.save(); ctx.globalAlpha *= vis; ctx.beginPath(); for (let q = 0; q < 6; q++) { const an = Math.PI / 6 + q * Math.PI / 3; const px = cx + Math.cos(an) * r * 0.94, py = cy + Math.sin(an) * r * 0.94; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
    shape(ctx, isR ? d_mix('#2A3A58', C.koraal, rood) : '#2A3A58', rgba(C.line, 0.55), 1.2); ctx.restore(); }
  ctx.restore(); }
// openheid: oog met zichtlijn; dicht (struiken) of open
function d_openheid(ctx, x, y, w, o = {}) { const { a = 1, u = 1, open = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = D_GRAS; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x + 30, y - 60, 26, 15, 0, 0, 6.283); shape(ctx, '#F2F2EE', C.line, 2); circ(ctx, x + 36, y - 60, 9, '#2A3A58'); circ(ctx, x + 38, y - 62, 3, '#FFF');
  const reik = open ? w - 90 : 170; ctx.save(); ctx.setLineDash([10, 9]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 62, y - 60); ctx.lineTo(x + 62 + reik * ease(u), y - 60); ctx.stroke(); ctx.restore();
  if (!open) { d_struik(ctx, x + 250, y, 1.1); d_struik(ctx, x + 330, y, 0.9); d_boompje(ctx, x + 420, y, 0.9); }
  ctx.restore(); }
function d_struik(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-28, -34, 30], [0, -52, 36], [30, -34, 30], [12, -24, 26], [-14, -22, 24]].forEach(([dx, dy, r], i) => circ(ctx, x + dx * s, y + dy * s, r * s, i % 2 ? '#3F7A4E' : '#4C8C5A')); ctx.restore(); }
function d_boompje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6A4A32'; ctx.fillRect(x - 7 * s, y - 70 * s, 14 * s, 70 * s); [[0, -110, 48], [-34, -84, 34], [34, -84, 34], [0, -140, 34]].forEach(([dx, dy, r], i) => circ(ctx, x + dx * s, y + dy * s, r * s, i % 2 ? '#3A7048' : '#47855A')); ctx.restore(); }
// bodemprofiel met drooglegging
function d_profiel(ctx, x, y, w, h, o = {}) { const { a = 1, diep = 0.55, pijlA = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); ctx.save(); ctx.clip(); ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h); const sy = y + 60; ctx.fillStyle = D_GROND; ctx.fillRect(x, sy, w, h);
  const gy = sy + (h - 70) * diep; ctx.fillStyle = rgba(D_WATER, 0.55); ctx.fillRect(x, gy, w, h); ctx.strokeStyle = '#9CC8F0'; ctx.lineWidth = 3; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 8) ctx.lineTo(xx, gy + Math.sin(xx * 0.06 + t * 2) * 2.5); ctx.stroke();
  for (let i = 0; i < w / 9; i++) { const bx = x + i * 9 + 3; ctx.strokeStyle = i % 3 ? D_GRAS : D_GRASD; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, sy); ctx.lineTo(bx + 3, sy - 16 - hash(i) * 14); ctx.stroke(); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 14); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke();
  if (pijlA > 0.01) d_al(ctx, pijlA, () => { const px = x + w * 0.62; pijl(ctx, px, sy + 6, px, gy - 6, C.goud, 1, 5, 16); pijl(ctx, px, gy - 6, px, sy + 6, C.goud, 1, 5, 16);
    naamBij(ctx, 'drooglegging', null, px + 22, (sy + gy) / 2 + 12, 1, 'left', C.goud); naamBij(ctx, 'maaiveld', null, x + 18, sy - 22, 1, 'left'); naamBij(ctx, 'grondwater', null, x + 18, gy + 50, 1, 'left', '#9CC8F0'); });
  ctx.restore(); }

// ---------- dieren ----------
function d_vos(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // staart
  const zw = Math.sin(t * 2) * 6; ctx.beginPath(); ctx.moveTo(-70, -88); ctx.bezierCurveTo(-130, -100, -190, -70 + zw, -215, -40 + zw); ctx.bezierCurveTo(-180, -40 + zw, -120, -50, -70, -62); ctx.closePath(); ctx.fillStyle = '#C8692E'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-190, -56 + zw); ctx.bezierCurveTo(-200, -50 + zw, -210, -46 + zw, -215, -40 + zw); ctx.bezierCurveTo(-200, -38 + zw, -190, -42 + zw, -182, -46 + zw); ctx.closePath(); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  // poten
  [[-50, 0], [-30, 1], [48, 1], [68, 0]].forEach(([px, i]) => { const sw = Math.sin(t * 9 + i * Math.PI) * 12 * loop; ctx.strokeStyle = '#2E221C'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(px, -70); ctx.lineTo(px + sw, -4); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, -84, 92, 36, 0, 0, 6.283); ctx.fillStyle = '#D8783A'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(70, -70, 26, 22, 0, 0, 6.283); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  // kop
  ctx.beginPath(); ctx.moveTo(70, -120); ctx.quadraticCurveTo(100, -150, 130, -126); ctx.lineTo(176, -104); ctx.quadraticCurveTo(170, -92, 140, -92); ctx.quadraticCurveTo(100, -84, 78, -96); ctx.closePath(); ctx.fillStyle = '#D8783A'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(130, -100); ctx.lineTo(176, -104); ctx.quadraticCurveTo(168, -92, 140, -92); ctx.closePath(); ctx.fillStyle = '#F2EEE6'; ctx.fill();
  circ(ctx, 178, -104, 6, '#1A1412');
  [[86, -134, 92, -176, 112, -140], [104, -138, 118, -178, 128, -132]].forEach(([a1, b1, a2, b2, a3, b3]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.lineTo(a2, b2); ctx.lineTo(a3, b3); ctx.closePath(); ctx.fillStyle = '#B85A26'; ctx.fill(); ctx.beginPath(); ctx.moveTo(a2, b2); ctx.lineTo(a2 + (a1 - a2) * 0.35, b2 + (b1 - b2) * 0.35); ctx.lineTo(a2 + (a3 - a2) * 0.35, b2 + (b3 - b2) * 0.35); ctx.closePath(); ctx.fillStyle = '#2E221C'; ctx.fill(); });
  ctx.beginPath(); ctx.ellipse(126, -118, 6, 3.5, -0.3, 0, 6.283); ctx.fillStyle = '#1A1412'; ctx.fill();
  ctx.restore(); }
function d_wezel(ctx, x, y, s, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const k = o.kijk || 1, loop = o.loop || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const golf = loop ? Math.sin(t * 8) * 6 : 0;
  ctx.strokeStyle = '#8A5A30'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-96, -26); ctx.quadraticCurveTo(-125, -30, -140, -18); ctx.stroke();
  [[-80, 0], [-62, 1], [46, 1], [62, 0]].forEach(([px, i]) => { const sw = Math.sin(t * 12 + i * Math.PI) * 8 * loop; ctx.strokeStyle = '#7A4E2A'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(px, -22); ctx.lineTo(px + sw, -3); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-100, -30); ctx.bezierCurveTo(-60, -58 - golf, 20, -58 + golf, 70, -44); ctx.quadraticCurveTo(84, -30, 70, -16); ctx.bezierCurveTo(20, -16, -60, -14, -100, -16); ctx.quadraticCurveTo(-112, -24, -100, -30); ctx.closePath(); ctx.fillStyle = '#9A6A3E'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-80, -18); ctx.bezierCurveTo(-30, -24, 30, -24, 70, -18); ctx.quadraticCurveTo(40, -14, -80, -15); ctx.closePath(); ctx.fillStyle = '#F2E6CC'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(86, -50, 26, 17, -0.15, 0, 6.283); ctx.fillStyle = '#9A6A3E'; ctx.fill(); ctx.beginPath(); ctx.ellipse(94, -40, 18, 7, -0.1, 0, 6.283); ctx.fillStyle = '#F2E6CC'; ctx.fill();
  circ(ctx, 76, -66, 8, '#8A5A30'); circ(ctx, 92, -55, 4, '#121A26'); circ(ctx, 112, -50, 4, '#2A1A12');
  ctx.restore(); }
function d_konijn(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -30, 40, 30, 0, 0, 6.283); ctx.fillStyle = '#A89A8A'; ctx.fill(); circ(ctx, -38, -36, 10, '#F2EEE6'); ctx.beginPath(); ctx.ellipse(36, -52, 20, 18, 0, 0, 6.283); ctx.fillStyle = '#A89A8A'; ctx.fill();
  [[30, -66, -0.3], [42, -68, 0.1]].forEach(([ex, ey, r]) => { ctx.beginPath(); ctx.ellipse(ex, ey - 22, 7, 24, r, 0, 6.283); ctx.fillStyle = '#9A8C7C'; ctx.fill(); }); circ(ctx, 44, -56, 3.5, '#121A26'); ctx.restore(); }
function d_vogeltje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, -24, 26, 18, -0.2, 0, 6.283); ctx.fillStyle = '#7A6A58'; ctx.fill(); circ(ctx, 22, -38, 13, '#7A6A58'); ctx.beginPath(); ctx.moveTo(33, -40); ctx.lineTo(46, -36); ctx.lineTo(33, -33); ctx.fillStyle = C.goud; ctx.fill(); circ(ctx, 25, -41, 3, '#121A26');
  ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(-44, -30); ctx.lineTo(-40, -16); ctx.closePath(); ctx.fillStyle = '#5E5040'; ctx.fill(); ctx.beginPath(); ctx.ellipse(-4, -26, 16, 9, -0.3, 0, 6.283); ctx.fillStyle = '#5E5040'; ctx.fill(); ctx.restore(); }
function d_kever(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#1A1A1A'; ctx.lineWidth = 3; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 10, -16); ctx.lineTo(i * 14, 0); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -22, 20, 15, 0, 0, 6.283); ctx.fillStyle = '#3A6A4A'; ctx.fill(); ctx.strokeStyle = '#1E3A28'; ctx.beginPath(); ctx.moveTo(0, -37); ctx.lineTo(0, -8); ctx.stroke(); circ(ctx, 22, -24, 8, '#22382A'); ctx.restore(); }
function d_bessen(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#4C7A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, -30); ctx.stroke(); [[-12, -22], [10, -24], [0, -10], [-6, -36], [12, -40]].forEach(([dx, dy]) => circ(ctx, dx, dy, 9, '#8A2E4A', '#5A1A30', 1.5)); ctx.restore(); }
// roofvogel (torenvalk); vlieg 0..1: 0 = zittend, 1 = vliegend met slaande vleugels
function d_valk(ctx, x, y, s, a = 1, t = 0, vlieg = 0, k = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineJoin = 'round';
  const fl = Math.sin(t * 9) * 0.9 * vlieg;
  ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-70, -6); ctx.lineTo(-66, 6); ctx.lineTo(-26, -6); ctx.closePath(); ctx.fillStyle = '#8A8A96'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -22, 38, 20, -0.15, 0, 6.283); ctx.fillStyle = '#B5653A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(6, -14, 26, 10, -0.15, 0, 6.283); ctx.fillStyle = '#E8D2B0'; ctx.fill();
  circ(ctx, 36, -40, 16, '#8A8A96'); ctx.beginPath(); ctx.moveTo(48, -42); ctx.quadraticCurveTo(60, -40, 52, -30); ctx.lineTo(48, -34); ctx.closePath(); ctx.fillStyle = '#E0B64A'; ctx.fill(); circ(ctx, 40, -44, 4, '#121A26'); circ(ctx, 41, -45, 1.4, '#FFF');
  ctx.save(); ctx.translate(-4, -30); ctx.rotate(-0.25 - fl * (vlieg > 0 ? 1 : 0) - 0.9 * vlieg); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-30, -10 - 40 * vlieg, -66, -14 - 40 * vlieg); ctx.lineTo(-40, 6); ctx.closePath(); ctx.fillStyle = '#9A5230'; ctx.fill();
  ctx.strokeStyle = '#3A2418'; ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-36 - i * 7, -6 - 30 * vlieg * (0.6 + i * 0.1)); ctx.lineTo(-46 - i * 6, -10 - 34 * vlieg * (0.6 + i * 0.1)); ctx.stroke(); } ctx.restore();
  if (vlieg < 0.5) { ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(4, -4); ctx.lineTo(4, 6); ctx.moveTo(14, -4); ctx.lineTo(14, 6); ctx.stroke(); }
  ctx.restore(); }
function d_nestkast(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#6A5A48'; ctx.fillRect(-8, -260, 16, 260); ctx.beginPath(); ctx.rect(-50, -350, 100, 96); shape(ctx, '#B08A5C', '#7A5E3C', 3);
  ctx.beginPath(); ctx.moveTo(-62, -346); ctx.lineTo(0, -386); ctx.lineTo(62, -346); ctx.closePath(); shape(ctx, '#7A5E3C', null); circ(ctx, 0, -306, 18, '#2A1C12'); ctx.restore(); }
function d_koe(ctx, x, y, s, a = 1, t = 0, k = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * k, s); ctx.lineCap = 'round';
  [[-70], [-46], [52], [74]].forEach(([px]) => { ctx.strokeStyle = '#E8E4DC'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(px, -70); ctx.lineTo(px, -8); ctx.stroke(); ctx.fillStyle = '#2A2A2A'; ctx.fillRect(px - 8, -10, 16, 10); });
  roundRect(ctx, -100, -150, 210, 96, 40); ctx.fillStyle = '#F2EEE6'; ctx.fill(); ctx.save(); roundRect(ctx, -100, -150, 210, 96, 40); ctx.clip(); [[-50, -130, 34, 26], [30, -100, 40, 30], [80, -146, 26, 20]].forEach(([ex, ey, rx, ry]) => { ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0.3, 0, 6.283); ctx.fillStyle = '#2A2A2A'; ctx.fill(); }); ctx.restore();
  ctx.beginPath(); ctx.ellipse(-20, -52, 20, 12, 0, 0, 6.283); ctx.fillStyle = '#E8A6A6'; ctx.fill();
  ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-98, -136); ctx.quadraticCurveTo(-120, -110, -112, -70 + Math.sin(t * 2) * 6); ctx.stroke();
  const nk = Math.sin(t * 1.3) * 4; ctx.save(); ctx.translate(122, -128 + nk); roundRect(ctx, -20, -26, 64, 56, 22); ctx.fillStyle = '#F2EEE6'; ctx.fill(); ctx.beginPath(); ctx.ellipse(-2, -20, 14, 10, 0, 0, 6.283); ctx.fillStyle = '#2A2A2A'; ctx.fill();
  roundRect(ctx, 14, 4, 34, 26, 12); ctx.fillStyle = '#E8B4B0'; ctx.fill(); circ(ctx, 18, -8, 4, '#121A26'); ctx.strokeStyle = '#D8D2C2'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -26); ctx.lineTo(-14, -40); ctx.moveTo(10, -26); ctx.lineTo(16, -40); ctx.stroke(); ctx.restore();
  ctx.restore(); }
function d_hooibaal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y - r, r, '#D8B864', '#B8964A', 3); ctx.strokeStyle = '#B8964A'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i < 60; i++) { const an = i * 0.35, rr = r * (1 - i / 64); i ? ctx.lineTo(x + Math.cos(an) * rr, y - r + Math.sin(an) * rr) : ctx.moveTo(x + rr, y - r); } ctx.stroke(); ctx.restore(); }
function d_trekker(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  // ploeg achter (links)
  ctx.strokeStyle = '#5A6070'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-80, -50); ctx.lineTo(-230, -50); ctx.stroke(); for (let i = 0; i < 3; i++) { const px = -110 - i * 50; ctx.beginPath(); ctx.moveTo(px, -50); ctx.lineTo(px - 10, -6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(px - 22, 0); ctx.quadraticCurveTo(px - 6, -14, px + 4, -2); ctx.fillStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.stroke(); }
  roundRect(ctx, -70, -110, 220, 60, 10); shape(ctx, '#3E8A4E', '#2C6A3A', 2); ctx.beginPath(); ctx.rect(-40, -200, 100, 92); shape(ctx, rgba('#9CC8F0', 0.35), '#2C6A3A', 6); ctx.fillStyle = '#2C6A3A'; ctx.fillRect(-46, -206, 112, 10); ctx.fillStyle = '#4A4E58'; ctx.fillRect(110, -150, 10, 40);
  const wiel = (cx, cy, r) => { circ(ctx, cx, cy, r, '#1E2228'); circ(ctx, cx, cy, r * 0.5, '#C9A35C'); ctx.strokeStyle = '#3A3E46'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r * 0.55, cy + Math.sin(an) * r * 0.55); ctx.lineTo(cx + Math.cos(an) * r * 0.95, cy + Math.sin(an) * r * 0.95); ctx.stroke(); } };
  wiel(-20, -50, 50); wiel(120, -32, 32); ctx.restore(); }
function d_korrels(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const kx = x + (hash(i) - 0.5) * 90 * s, ky = y - hash(i + 5) * 22 * s; ctx.beginPath(); ctx.ellipse(kx, ky, 9 * s, 5 * s, hash(i + 2) * 3, 0, 6.283); shape(ctx, '#4FB0A0', '#2E7A6E', 1.5); } ctx.restore(); }

// ---------- bloedvat met wondje: stolling (net) of bloeding ; net 0..1, bloed 0..1 ----------
function d_bloedvat(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, net = 0, bloed = 0, fibrinogeen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const top = y, bot = y + h, gx = x + w * 0.5, gw = 90; const boog = (xx) => Math.sin((xx - x) / w * Math.PI) * 14;
  // bloeding onder het wondje
  if (bloed > 0.01) { ctx.save(); for (let i = 0; i < 26; i++) { const r = hash(i * 2.3), u = clamp(bloed * 1.4 - r * 0.4, 0, 1); if (u <= 0) continue; const bx = gx + (hash(i + 7) - 0.5) * 300 * u, by = bot + boog(gx) + 18 + 90 * u * hash(i + 3); d_rbc(ctx, bx, by, 13, hash(i) * 3, 0.9); } ctx.restore();
    ctx.save(); ctx.globalAlpha *= bloed * 0.35; ctx.beginPath(); ctx.ellipse(gx, bot + boog(gx) + 60, 200 * bloed, 60 * bloed, 0, 0, 6.283); ctx.fillStyle = '#A8323A'; ctx.fill(); ctx.restore(); }
  // vatwand (licht gebogen), met opening onder
  ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, top - boog(xx)); for (let xx = x + w; xx >= x; xx -= 10) ctx.lineTo(xx, bot + boog(xx)); ctx.closePath(); ctx.fillStyle = 'rgba(120,30,40,0.25)'; ctx.fill();
  ctx.strokeStyle = '#D88E8E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 10) ctx.lineTo(xx, top - boog(xx)); ctx.stroke();
  ctx.beginPath(); for (let xx = x; xx <= gx - gw / 2; xx += 10) ctx.lineTo(xx, bot + boog(xx)); ctx.stroke(); ctx.beginPath(); for (let xx = gx + gw / 2; xx <= x + w; xx += 10) ctx.lineTo(xx, bot + boog(xx)); ctx.stroke();
  // rode bloedcellen stromen
  ctx.save(); ctx.beginPath(); ctx.rect(x, top - 30, w, h + 60); ctx.clip();
  for (let i = 0; i < 22; i++) { const sp = 90 + hash(i) * 40; const bx = x + ((hash(i + 1) * w + t * sp) % w), by = top + 18 + hash(i + 2) * (h - 36) + boog(bx) * 0.0; const trap = net > 0.5 && Math.abs(bx - gx) < 70 ? 1 : 0; d_rbc(ctx, trap ? gx + (hash(i) - 0.5) * 120 : bx, by + (bx > gx - 60 && bx < gx + 60 ? 0 : 0) + (bot - top) * 0 + boog(bx) * 0.5, 14, i, 1); }
  // fibrinogeen (staafjes) en fibrine (draden)
  if (fibrinogeen > 0.01) for (let i = 0; i < 18; i++) { const bx = x + ((hash(i + 40) * w + t * 70) % w), by = top + 20 + hash(i + 41) * (h - 40); const near = Math.max(0, 1 - Math.abs(bx - gx) / 160); if (net > 0.3 && near > 0.2) continue; ctx.save(); ctx.globalAlpha *= fibrinogeen; ctx.translate(bx, by); ctx.rotate(hash(i + 3) * 3 + t * 0.6); roundRect(ctx, -11, -3, 22, 6, 3); shape(ctx, '#E8D27A', null); ctx.restore(); }
  ctx.restore();
  if (net > 0.01) { ctx.save(); ctx.strokeStyle = '#F2E2A0'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const u = clamp(net * 1.6 - i * 0.05, 0, 1); if (u <= 0) continue; const x1 = gx - 110 + hash(i) * 220, y1 = bot + boog(gx) - 70 + hash(i + 9) * 40, x2 = gx - 110 + hash(i + 4) * 220, y2 = bot + boog(gx) + 26 - hash(i + 2) * 16; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2 + 20, (y1 + y2) / 2, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function d_rbc(ctx, x, y, r, rot = 0, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot * 0.3); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.8, 0, 0, 6.283); ctx.fillStyle = '#C8414A'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, r * 0.32, 0, 0, 6.283); ctx.fillStyle = '#A0303A'; ctx.fill(); ctx.restore(); }

// ---------- sloot in doorsnede met stikstof (vraag 35) ----------
// st = {gangen, o2, bact, poep, gras (1 = vol, 0 = aangevreten), opname, uitspoel, sloot (0..1 stikstof in de sloot)}
function d_sloot(ctx, x, y, w, h, st = {}, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sy = y + h * 0.36, dx0 = x + w * 0.72; roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip();
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h);
  // bodem met sloot rechts
  ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(dx0, sy); ctx.lineTo(dx0 + 70, sy + h * 0.3); ctx.lineTo(x + w - 20, sy + h * 0.3); ctx.lineTo(x + w + 30, sy - 10); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fillStyle = D_GROND; ctx.fill();
  const wl = sy + 26; ctx.beginPath(); ctx.moveTo(dx0 + 17, wl); ctx.lineTo(dx0 + 70, sy + h * 0.3); ctx.lineTo(x + w - 20, sy + h * 0.3); ctx.lineTo(x + w + 6, wl); ctx.closePath(); ctx.fillStyle = d_mix(D_WATER, '#4E8A5A', (st.sloot || 0) * 0.6); ctx.fill();
  // nitraatdeeltjes in de sloot
  const ns = Math.round((st.sloot || 0) * 14); for (let i = 0; i < ns; i++) { const px = dx0 + 70 + hash(i + 60) * (w * 0.2), py = wl + 20 + hash(i + 61) * (sy + h * 0.3 - wl - 30) + Math.sin(t * 2 + i) * 4; d_ion(ctx, px, py, 'NO₃⁻', C.teal, 0.9, 0.8); }
  // gangen
  const gA = st.gangen || 0; if (gA > 0.01) { ctx.save(); ctx.globalAlpha *= gA; ctx.strokeStyle = D_GANG; ctx.lineWidth = 16; ctx.lineCap = 'round'; [[0.1, 0.18], [0.32, 0.26], [0.52, 0.2]].forEach(([fx, d]) => { const gx = x + w * fx; ctx.beginPath(); ctx.moveTo(gx, sy); ctx.bezierCurveTo(gx + 20, sy + h * d, gx + 80, sy + h * d, gx + 150, sy + h * (d + 0.05)); ctx.stroke(); }); ctx.restore(); }
  // zuurstof de gangen in
  const o2 = st.o2 || 0; if (o2 > 0.01) for (let i = 0; i < 9; i++) { const k = i % 3, fx = [0.1, 0.32, 0.52][k], ph = (t * 0.5 + hash(i) ) % 1; const gx = x + w * fx + 10 + ph * 110, gy = sy + h * [0.18, 0.26, 0.2][k] * Math.min(1, ph * 2.2); d_al(ctx, o2 * (1 - ph * 0.3), () => { circ(ctx, gx, gy, 9, rgba('#BFE3FF', 0.35), '#BFE3FF', 2); }); }
  // bacteriën die ammonium -> nitraat maken
  const ba = st.bact || 0; if (ba > 0.01) for (let i = 0; i < 6; i++) { const bx = x + w * (0.14 + i * 0.08) + Math.sin(t + i) * 4, by = sy + h * (0.33 + 0.06 * (i % 2)); d_al(ctx, ba, () => { ctx.save(); ctx.translate(bx, by); ctx.rotate(i * 0.7); roundRect(ctx, -14, -6, 28, 12, 6); shape(ctx, rgba(C.groen, 0.85), '#3F7A4E', 1.5); ctx.restore(); }); }
  // poep op het oppervlak
  const pp = st.poep || 0; if (pp > 0.01) for (let i = 0; i < 7; i++) { const px = x + w * (0.06 + i * 0.09) + hash(i + 20) * 20; d_al(ctx, clamp(pp * 2 - i * 0.12, 0, 1), () => { ctx.beginPath(); ctx.ellipse(px, sy - 4, 7, 4, 0.3, 0, 6.283); ctx.fillStyle = '#2A1A10'; ctx.fill(); ctx.beginPath(); ctx.ellipse(px + 9, sy - 3, 6, 3.5, -0.2, 0, 6.283); ctx.fill(); }); }
  // gras met wortels
  const gr = st.gras == null ? 1 : st.gras; for (let i = 0; i < 60; i++) { const bx = x + 10 + i * (w * 0.7 - 20) / 60; const hh = (30 + hash(i + 3) * 34) * (0.25 + 0.75 * gr); ctx.strokeStyle = d_mix(i % 3 ? D_GRAS : D_GRASD, D_DROOG, 1 - gr); ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(bx, sy); ctx.lineTo(bx + 4, sy - hh); ctx.stroke(); }
  ctx.strokeStyle = rgba('#D8C8A0', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 12; i++) { const rx = x + 30 + i * (w * 0.68 - 40) / 12; ctx.beginPath(); ctx.moveTo(rx, sy); ctx.lineTo(rx - 8, sy + 40 * (0.4 + 0.6 * gr)); ctx.moveTo(rx, sy + 12); ctx.lineTo(rx + 10, sy + 34 * (0.4 + 0.6 * gr)); ctx.stroke(); }
  // ionen: ammonium -> nitraat, opname door wortels of uitspoeling naar de sloot
  const nIon = 10; for (let i = 0; i < nIon; i++) { const ph = (t * 0.12 + hash(i + 80)) % 1; const ix = x + w * (0.06 + 0.6 * hash(i + 81)); const iy = sy + h * (0.12 + 0.4 * hash(i + 82));
    const nitri = clamp((st.bact || 0) * 1.4 - hash(i) * 0.4, 0, 1); const naarSloot = (st.uitspoel || 0) > hash(i + 83);
    let px = ix, py = iy; if (naarSloot) { px = ix + (dx0 + 90 - ix) * ph; py = iy + (wl + 40 - iy) * ph * ph; } else if ((st.opname || 0) > hash(i + 84)) { py = iy - (iy - sy - 10) * ph; }
    d_ion(ctx, px, py, nitri > 0.5 ? 'NO₃⁻' : 'NH₄⁺', nitri > 0.5 ? C.teal : C.oker, 0.85, 0.75); }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); return { sy, dx0, wl }; }
function d_ion(ctx, x, y, s, col, a = 1, sc = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(20 * sc + 4, 700); const w = ctx.measureText(s).width + 16; roundRect(ctx, x - w / 2, y - 15 * sc, w, 30 * sc, 15 * sc); shape(ctx, rgba(col, 0.25), col, 1.5); text(ctx, s, x, y + 7 * sc, fTekst(20 * sc + 4, 700), C.text, 'center'); ctx.restore(); }

// ---------- landschap: open grasland -> afwisselend (heggen, bosjes, akkers) ----------
function d_landschap(ctx, x, y, w, h, het = 0, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); ctx.save(); ctx.clip();
  ctx.fillStyle = '#22324E'; ctx.fillRect(x, y, w, h); const hy = y + h * 0.3;
  ctx.fillStyle = '#3F6E48'; ctx.fillRect(x, hy, w, h); ctx.fillStyle = '#4A7E52'; ctx.beginPath(); ctx.moveTo(x, hy); for (let xx = x; xx <= x + w; xx += 40) ctx.lineTo(xx, hy + Math.sin(xx * 0.01) * 6); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
  if (het > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(het * 1.5, 0, 1);
    // akkerstroken
    [[0.08, 0.5, 0.26, 0.2], [0.6, 0.42, 0.22, 0.16]].forEach(([fx, fy, fw, fh]) => { ctx.beginPath(); ctx.rect(x + w * fx, y + h * fy, w * fw, h * fh); ctx.fillStyle = '#8C6A42'; ctx.fill(); ctx.strokeStyle = '#6E5030'; ctx.lineWidth = 2; for (let i = 1; i < 7; i++) { ctx.beginPath(); ctx.moveTo(x + w * fx, y + h * fy + h * fh * i / 7); ctx.lineTo(x + w * (fx + fw), y + h * fy + h * fh * i / 7); ctx.stroke(); } });
    ctx.restore();
    // heggen (rijen struiken) en bosjes
    const n = Math.floor(clamp(het, 0, 1) * 30); for (let i = 0; i < n; i++) { const hx = x + w * (0.04 + (i % 15) * 0.066), hy2 = i < 15 ? y + h * 0.46 : y + h * 0.78; d_struik(ctx, hx, hy2, 0.55); }
    const nb = Math.floor(clamp(het * 1.2 - 0.2, 0, 1) * 5); [[0.42, 0.62], [0.88, 0.7], [0.2, 0.42], [0.66, 0.4], [0.95, 0.95]].slice(0, nb).forEach(([fx, fy]) => { d_boompje(ctx, x + w * fx, y + h * fy, 0.6); d_boompje(ctx, x + w * fx + 40, y + h * fy + 10, 0.5); });
  }
  ctx.restore(); roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = EX.papierR; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
// menukaart van een rover: prooi-icoontjes in een rij
function d_menu(ctx, x, y, items, a = 1, step = 110) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; items.forEach((it, i) => { const ia = it.a == null ? 1 : it.a; if (ia <= 0.01) return; const px = x + i * step; d_al(ctx, ia, () => { circ(ctx, px, y - 30, 44, rgba(EX.papier, 0.9), it.hl ? C.goud : EX.papierR, it.hl ? 3.5 : 2);
    if (it.n === 'muis') d_veldmuis(ctx, px - 4, y, 0.3); else if (it.n === 'konijn') d_konijn(ctx, px - 4, y - 2, 0.62); else if (it.n === 'vogel') d_vogeltje(ctx, px - 2, y - 4, 0.82); else if (it.n === 'kever') d_kever(ctx, px - 4, y - 8, 0.95); else if (it.n === 'bes') d_bessen(ctx, px, y - 4, 0.9); }); }); ctx.restore(); }

// ---------- kleine populatiegrafiek in een paneel ----------
function d_miniGrafiek(ctx, x, y, w, h, lijnen, o = {}) { const { a = 1, xl = 'tijd', yl = 'aantal' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; d_assen(ctx, x, y, w, h, xl, yl);
  lijnen.forEach((L) => d_lijn(ctx, x, y, w, h, L.fn, L.u, L.col, { dash: L.dash, lw: L.lw || 6, a: L.a, s0: L.s0 })); ctx.restore(); }

// muizen op een rij in een veldje (aantal n, schuifelend)
function d_muizenRij(ctx, x, y, w, n, t, a = 1, s = 0.22) { if (a <= 0.01 || n <= 0) return; for (let i = 0; i < n; i++) { const fx = x + ((hash(i * 3.3) * w + wander(i, t, 10, 0.6).x) % w + w) % w; d_veldmuis(ctx, fx, y + (hash(i + 2) - 0.5) * 8, s, a * clamp(n - i, 0, 1), t + i, { kijk: hash(i + 5) > 0.5 ? 1 : -1 }); } }

// geploegde strook over een grasland (x0..x1) op maaiveld sy
function d_geploegd(ctx, x0, x1, sy, a = 1) { if (a <= 0.01 || x1 <= x0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A3E28'; ctx.fillRect(x0, sy - 18, x1 - x0, 22); ctx.strokeStyle = '#3A2818'; ctx.lineWidth = 3; for (let xx = x0 + 6; xx < x1; xx += 16) { ctx.beginPath(); ctx.moveTo(xx, sy - 16); ctx.quadraticCurveTo(xx + 6, sy - 24, xx + 12, sy - 14); ctx.stroke(); } ctx.restore(); }
// Examenbespreking vwo 2018-II — scènes deel a: opening (s01–s02), zo lees je een examenvraag (s04–s06), De lauwbloedige koningsvis (s07–s26).

function a_gewoonte(ctx, n, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) circ(ctx, 92 + i * 34, 76, 11, i < n ? C.goud : 'rgba(0,0,0,0)', C.goud, 2.5);
  metaText(ctx, 'GEWOONTE ' + n + ' · ' + s, 92 + 3 * 34 + 10, 86, C.text, 'left', 28); ctx.restore(); }
function a_vispunt(x, y, s, fx, fy) { return [x + fx * s, y + fy * s]; }
// warmtepijlen rond een ellips (vis), naar buiten
function a_warmteRond(ctx, x, y, rx, ry, n, len, a, t, lw = 4) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const an = (i + 0.5) / n * 6.283; const nx = Math.cos(an), ny = Math.sin(an); a_warmtePijl(ctx, x + nx * rx, y + ny * ry, nx, ny, len, a, t + i * 0.37, A_WARM, lw); } }
function a_krill(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#E8946A'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 14, 0.3, 3.6); ctx.stroke(); circ(ctx, 12, 6, 3, '#121A26'); ctx.restore(); }

Object.assign(SCENES, {
  // ---------- Opening ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const tUur = q.on('drie', 1, 1.5);
    a_zaal(ctx, t, { uur: 1.5 + 0.12 * Math.min(t, 20) / 20, sector: tUur, pose: t > q.at('gevraagd', 1) && t < q.at('antwoord', 1) ? 'denk' : 'staan', uit: t > q.at('antwoord', 1) ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Noor', '', 410, 400, q.on('Dit', 1, 0.5) * (1 - q.on('Achtendertig', 1)), 'center');
    metaA_(ctx, 'VWO · BIOLOGIE · 2018 · TIJDVAK 2', 1250, 150, q.on('examen', 1), C.goud, 'left', 26);
    a_teller(ctx, 1450, 300, Math.round(38 * q.on('Achtendertig', 1, 0.9)), 'vragen', q.on('Achtendertig', 1, 0.3));
    a_teller(ctx, 1450, 450, Math.round(70 * q.on('zeventig', 1, 0.9)), 'punten', q.on('zeventig', 1, 0.3));
    a_teller(ctx, 1450, 600, 3, 'uur', q.on('drie', 1, 0.3));
    // per vraag: vraag → stof → antwoord
    const st = [['vraag', 'gevraagd', C.goud], ['stof', 'stof', C.teal], ['antwoord', 'antwoord', C.groen]];
    st.forEach(([s2, w, col], i) => { const a = q.on(w, 1, 0.4); const x = 1250 + i * 210; a_alpha(ctx, a, () => { roundRect(ctx, x, 690, 170, 76, 38); shape(ctx, rgba(col, 0.16), col, 2.5); text(ctx, s2, x + 85, 739, fTekst(32, 700), C.text, 'center'); });
      if (i < 2) pijl(ctx, x + 176, 728, x + 204, 728, C.line, q.on(st[i + 1][1], 1, 0.4), 3, 12); });
    metaA_(ctx, 'ELKE VRAAG', 1250, 660, q.on('elke', 1), C.text2, 'left', 22); },

  s02(ctx, t, q) { bg(ctx, 'schema'); metaA_(ctx, 'VIJF CONTEXTEN', W / 2, 140, q.on('Vijf', 1, 0.4), C.goud, 'center', 30);
    const cues = ['lauwbloedige', 'eilandjes', 'erfelijke', 'waterstofgas', 'muizenplagen'];
    const titels = ['De lauwbloedige koningsvis', 'Nieuwe eilandjes voor de alvleesklier', 'Een bijzondere band tussen grootvader en kleinkind', 'Biologische productie van waterstofgas', 'Wat te doen aan de muizenplagen?'];
    const iconen = [(x, y) => a_koningsvis(ctx, x, y + 10, 0.38, { t, warm: 0.5 }), (x, y) => a_eilandje(ctx, x, y + 10, 0.85, t), (x, y) => { persoon(ctx, 'henk', x - 50, y + 105, 210, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'kind', x + 60, y + 105, 140, { t, kijk: -1, uit: 'blij' }); }, (x, y) => a_waterstof(ctx, x, y + 20, 1, t), (x, y) => a_muisje(ctx, x + 20, y + 20, 0.62)];
    const w = 330, gap = 24, x0 = (W - (5 * w + 4 * gap)) / 2;
    titels.forEach((s2, i) => { const a = q.on(cues[i], 1, 0.5); const nu = i < 4 ? t >= q.at(cues[i], 1) && t < q.at(cues[i + 1], 1) : t >= q.at(cues[i], 1); a_kaart(ctx, x0 + i * (w + gap), 200, w, 480, i + 1, s2, a, nu ? 1 : 0, iconen[i]); }); },

  // ---------- Zo lees je een examenvraag ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 1, 'PUNTEN', q.on('eerste', 1, 0.4));
    const mc = ramp(t, q.at('meerkeuze', 1) + 0.25, 0.4);
    a_vraagRegel(ctx, 160, 150, 1600, { a: ramp(t, 0.2, 0.6), hp: q.on('aantal', 1, 0.8) });
    const vk = q.on('Twee', 1, 0.4) * (1 - ramp(t, q.at('Bij', 1), 0.25)), d3 = q.on('Drie', 2, 0.4), d1 = t > q.at('dingen', 1) + 0.3 ? 1 : 0, d2 = t > q.at('dingen', 1) + 0.8 ? 1 : 0, e3 = t > q.at('dingen', 2) + 0.3 ? 1 : 0;
    a_vakjes(ctx, 160, 440, 3, vk, [d1, d2, e3], [1, 1, d3]); const v2 = vk, v3 = 0;
    metaA_(ctx, '= dingen in je antwoord', 160, 610, Math.max(v2, v3), C.text2, 'left', 24);
    // meerkeuze en wel/niet: altijd 2p
    a_alpha(ctx, mc, () => { a_wwKaart(ctx, 160, 440, 520, 'A  B  C  D', 'meerkeuze', 1); a_wwKaart(ctx, 740, 440, 520, 'wel / niet', 'drie beweringen', q.on('niet', 1, 0.5)); });
    const al = q.on('altijd', 1, 0.5); stempel(ctx, 600, 470, '2p', C.goud, al, -0.12); stempel(ctx, 1180, 470, '2p', C.goud, al * q.on('niet', 1, 0.5), -0.12);
    metaA_(ctx, 'telt niet als dingen', 160, 670, q.on('geldt', 1, 0.5), C.koraal, 'left', 24); },

  s05(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 2, 'WERKWOORD', q.on('tweede', 1, 0.4));
    a_vraagRegel(ctx, 160, 150, 1600, { a: ramp(t, 0.2, 0.6), hw: q.on('werkwoord', 1, 0.8) });
    const hN = t >= q.at('noem', 1) && t < q.at('Leg', 1) ? 1 : 0, hL = t >= q.at('Leg', 1) ? 1 : 0;
    a_wwKaart(ctx, 160, 410, 500, 'Noem', 'naam of feit', q.on('noem', 1, 0.5), hN, C.teal);
    a_wwKaart(ctx, 710, 410, 500, 'Leg uit', 'keten', q.on('Leg', 1, 0.5), hL); a_wwKaart(ctx, 1260, 410, 500, 'Verklaar', 'keten', q.on('verklaar', 1, 0.5), hL);
    const b = q.on('begin', 1, 0.4), e = q.on('eind', 1, 0.4);
    const dimB = b * (1 - e), dimE = e; // alleen begin → middelste en laatste weg; alleen eind → eerste en middelste weg
    ketting(ctx, [{ t: 'oorzaak', a: q.on('oorzaak', 1, 0.5) * (1 - 0.75 * dimE) }, { t: 'tussenstap', a: q.on('tussenstap', 1, 0.5) * (1 - 0.75 * Math.max(dimB, dimE)), col: C.teal }, { t: 'gevolg uit de vraag', a: q.on('gevolg', 1, 0.5) * (1 - 0.75 * dimB), col: C.groen }], 220, 720, 1480, 1, { px: 34 });
    kruis(ctx, 960, 650, 22, q.on('mist', 1, 0.4)); },

  s06(ctx, t, q) { bg(ctx, 'schema'); a_gewoonte(ctx, 3, 'TEKST LEZEN', q.on('derde', 1, 0.4)); const kl = q.on('Reken', 1, 0.6);
    a_contextTekst(ctx, 120, 160, 1150, q.on('zin', 1, 1.6), ramp(t, 0.6, 0.6));
    ketting(ctx, [{ t: 'oorzaak', a: 0.5 }, { t: 'tussenstap', col: C.teal }, { t: 'gevolg', a: 0.5, col: C.groen }], 120, 640, 1150, q.on('tussenstap', 1, 0.5), { px: 32 });
    a_alpha(ctx, kl, () => { a_wandklok(ctx, 1590, 380, 170, 1.5 + 0.25 * clamp((t - q.at('Reken', 1)) / 6, 0, 1), 1, clamp((t - q.at('Reken', 1)) / 6, 0, 1) * 0.0139 * 6 + 0.0001);
      text(ctx, '≈ 2,5 min', 1590, 640, fTitel(60), C.goud, 'center'); text(ctx, 'per punt', 1590, 690, fTekst(34, 600), C.text, 'center'); metaA_(ctx, '70 punten · 180 minuten', 1590, 750, q.on('minuut', 1, 0.6), C.text2, 'center', 22); }); },

  // ---------- De lauwbloedige koningsvis ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX, ramp(t, 0.2)); a_water(ctx, 60, 130, 1800, 740, ramp(t, 0, 0.6), t);
    const w = q.on('warmer', 1, 1.2), en = q.on('endotherm', 1, 0.6); const fy = 500 + Math.sin(t * 0.9) * 8;
    a_koningsvis(ctx, 960, fy, 1.15, { t, a: ramp(t, 0.3, 0.8), warm: w * (0.75 + 0.25 * Math.sin(t * 2.4) * en), hlVin: q.on('borstvinnen', 1, 0.5) * (1 - w) });
    naamBij(ctx, 'koningsvis', 'Lampris guttatus', 1220, 260, q.on('koningsvis', 1, 0.5) * (1 - q.on('borstvinnen', 1)), 'left');
    naamBij(ctx, 'borstvin', '', 700, fy - 110, q.on('borstvinnen', 1, 0.5) * (1 - w), 'right');
    a_thermo(ctx, 240, 760, 300, 0.32, '9 °C', A_KOUD, w); metaA_(ctx, 'WATER', 240, 820, w, C.text2, 'center', 22);
    a_thermo(ctx, 1680, 760, 300, 0.55, '14 °C', A_WARM, w); metaA_(ctx, 'VIS', 1680, 820, w, C.text2, 'center', 22);
    a_alpha(ctx, en, () => { for (let i = 0; i < 6; i++) { const an = -0.9 + i * 0.36; a_warmtePijl(ctx, 960 + Math.cos(an) * 60, fy + Math.sin(an) * 50 - 10, Math.cos(an), Math.sin(an), 70, 0.8, t + i * 0.4); } });
    naamBij(ctx, 'endotherm', 'maakt zelf warmte', 960, 850, en, 'center'); },

  s08(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Leg uit', 'Waarom is endotherm zijn ongunstig voor kleine vissoorten?', 70, 170, 860, q.on('Leg', 1, 0.5));
    const k = q.on('kleine', 1, 0.6), o = q.on('oppervlakte', 1, 0.6);
    a_water(ctx, 1000, 170, 860, 640, ramp(t, 0.2, 0.6), t);
    a_koningsvis(ctx, 1330, 480, 0.62, { t, warm: 0.6, a: ramp(t, 0.3, 0.6) }); a_koningsvis(ctx, 1700, 500 + Math.sin(t * 2) * 6, 0.22, { t: t * 1.6, warm: 0.6, a: k });
    naamBij(ctx, 'groot', '', 1330, 790, k, 'center'); naamBij(ctx, 'klein', '', 1700, 600, k, 'center');
    a_alpha(ctx, o, () => { text(ctx, 'oppervlakte', 1720, 270, fTekst(34, 600), C.goud, 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1630, 284); ctx.lineTo(1810, 284); ctx.stroke(); text(ctx, 'inhoud', 1720, 322, fTekst(34, 600), C.goud, 'center'); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2);
    a_water(ctx, 60, 140, 1800, 730, 1, t); metaA_(ctx, 'KOUD WATER', 100, 190, ramp(t, 0.2), '#9CC0E8', 'left', 22);
    const vol = q.on('volume', 1, 0.8), opp = q.on('oppervlak', 1, 0.6), gr = q.on('gram', 1, 0.6), ve = q.on('verliest', 2, 1.5);
    const bx = 640, by = 470, sx = 1450, sy = 500;
    a_koningsvis(ctx, bx, by, 0.85, { t, warm: 0.25 + 0.55 * vol }); a_koningsvis(ctx, sx, sy, 0.3, { t: t * 1.5, warm: (0.25 + 0.55 * vol) * (1 - 0.6 * ve) });
    a_warmteRond(ctx, bx - 20, by, 200, 140, 10, 46, opp, t); a_warmteRond(ctx, sx - 8, sy, 72, 50, 8, 46 + 14 * ve, opp * (1 + 0 * ve), t, 4 + 2 * ve);
    naamBij(ctx, 'warmte maken', 'hele volume', bx, by + 215, vol * (1 - opp), 'center');
    balk(ctx, 440, 770, 400, 0.28 * gr, C.goud, 'oppervlak per gram', gr); balk(ctx, 1250, 770, 400, 0.85 * gr, C.goud, 'oppervlak per gram', gr);
    naamBij(ctx, 'verliest naar verhouding meer', '', sx, 680, ve, 'center', C.koraal); },

  s10(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 1, 2);
    const tip = q.on('Let', 1, 0.5);
    punten(ctx, [{ t: 'Kleine vis verliest door groot oppervlak naar verhouding meer warmte', a: q.on('Eén', 1, 0.5), v: q.on('warmte', 1, 0.4) },
      { t: 'Dus naar verhouding meer voedsel en energie nodig', a: q.on('Twee', 2, 0.5), v: q.on('energie', 1, 0.4) }], 70, 190, 1080, 1);
    a_alpha(ctx, q.on('ongunstige', 1, 0.5), () => { roundRect(ctx, 62, 332, 1096, 100, 20); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
    tipKaart(ctx, "Alleen ‘ze verliezen meer warmte’ is één punt. Het ongunstige is de energie.", 70, 560, 1080, tip);
    // rechts: kleine vis die warmte verliest en veel moet eten
    a_water(ctx, 1220, 190, 640, 560, 1, t); const fx = 1560, fy = 470 + Math.sin(t * 2) * 6;
    a_koningsvis(ctx, fx, fy, 0.42, { t: t * 1.5, warm: 0.6 }); a_warmteRond(ctx, fx - 10, fy, 100, 68, 8, 40, q.on('warmte', 1, 0.5), t);
    const vo = q.on('voedsel', 1, 0.6); for (let i = 0; i < 6; i++) { const ph = ((t * 0.35 + i / 6) % 1); a_krill(ctx, 1840 - ph * 200, fy - 60 + i * 22 + Math.sin(t * 3 + i) * 8, 0.9, vo * (1 - ph) * (ph > 0.05 ? 1 : ph * 20)); }
    naamBij(ctx, 'veel eten', '', 1720, 700, vo, 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Leg uit', 'Hoe helpt veel myoglobine de koningsvis bij het jagen?', 70, 170, 860, q.on('Leg', 1, 0.5));
    a_water(ctx, 1000, 170, 860, 640, ramp(t, 0.2, 0.6), t); const dr = q.on('donkerrood', 1, 0.8);
    a_koningsvis(ctx, 1450, 490, 0.85, { t, a: ramp(t, 0.3, 0.6), vlek: (c) => { if (dr <= 0.01) return; c.save(); c.globalAlpha *= dr; c.beginPath(); c.ellipse(40, 0, 120, 70, 0, 0, 6.283); c.fillStyle = 'rgba(110,20,30,0.85)'; c.fill(); c.restore(); } });
    naamBij(ctx, 'donkerrode spieren', 'veel myoglobine', 1450, 760, dr, 'center'); },

  s12(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2);
    const hard = q.on('hard', 1, 0.6), los = q.on('los', 1, 1.6), daal = q.on('daalt', 1, 1);
    a_haarvat(ctx, 200, 210, 1520, ramp(t, 0.2, 0.6), t); naamBij(ctx, 'bloed', 'hemoglobine', 420, 135, q.on('hemoglobine', 1, 0.5), 'left');
    const knijp = hard * (0.5 + 0.5 * Math.sin(t * 6)); a_spiercel(ctx, 960, 500, 1560, 300, ramp(t, 0, 0.6), knijp);
    naamBij(ctx, 'spiercel', '', 220, 700, ramp(t, 0.4, 0.6) * (1 - q.on('Het', 1)), 'left');
    const mito = [[420, 560], [760, 430], [1130, 570], [1480, 440]]; mito.forEach(([x, y], i) => mitochondrion(ctx, x, y, 110, i % 2 ? 0.3 : -0.2, q.on('Als', 3, 0.6), 4, t));
    const myo = [[320, 430], [560, 520], [640, 400], [930, 470], [1010, 580], [1270, 450], [1350, 560], [1620, 520]];
    const bind = q.on('bindt', 1, 0.8);
    myo.forEach(([x, y], i) => { a_myoglobine(ctx, x, y, 1.05, q.on('eiwit', 1, 0.6), i * 1.3, t);
      const d = clamp(los * 1.3 - i * 0.05, 0, 1); const [mx, my] = mito[Math.min(3, Math.floor(i / 2))]; const ox = lerp(x, mx, ease(d)), oy = lerp(y - 40, my, ease(d)) + Math.sin(d * 3.14) * -40;
      a_o2(ctx, ox, oy, 1, bind * (1 - clamp((d - 0.85) / 0.15, 0, 1))); });
    naamBij(ctx, 'myoglobine', '', 640, 345, q.on('eiwit', 1, 0.5) * (1 - q.on('voorraad', 1)), 'center');
    tag(ctx, 'O₂-voorraad', 960, 720, C.teal, q.on('voorraad', 1, 0.5) * (1 - q.on('Als', 3, 0.5)), 'center', 32);
    naamBij(ctx, 'mitochondrion', 'gebruikt O₂', 1480, 720, q.on('Als', 3, 0.5), 'center');
    a_alpha(ctx, daal, () => { metaText(ctx, 'ZUURSTOFDRUK', 1780, 300, C.text2, 'right', 20); balk(ctx, 1540, 326, 240, 0.85 - 0.6 * daal, C.teal, '', 1); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 2, 2);
    punten(ctx, [{ t: 'Myoglobine slaat extra O₂ op, die vrijkomt bij veel verbruik', a: q.on('antwoord', 1, 0.5), v: q.on('vrijkomt', 1, 0.4) },
      { t: 'Spieren dissimileren langer aeroob en maken meer energie vrij', a: q.on('Daardoor', 1, 0.5), v: q.on('energie', 1, 0.4) }], 70, 190, 1080, 1);
    tipKaart(ctx, 'Maak de keten af tot in de context: de vis kan langer jagen.', 70, 520, 1080, q.on('Tip', 1, 0.5));
    // jacht rechts
    a_water(ctx, 1220, 190, 640, 560, 1, t); const ch = q.on('prooi', 1, 1); const ph = (t * 0.25) % 1;
    const px = 1760 + Math.sin(t * 1.3) * 30, py = 360 + Math.sin(t * 0.9) * 50; a_koningsvis(ctx, px, py, 0.16, { t: t * 2, a: ch });
    a_koningsvis(ctx, lerp(1420, px - 170, 0.5 + 0.5 * Math.sin(t * 0.6) * ch * 0.4 + 0.1 * ch), lerp(500, py + 60, ch), 0.45, { t: t * (1 + ch), warm: 0.5 });
    naamBij(ctx, 'prooi', '', px, py - 70, ch, 'center'); naamBij(ctx, 'jaagt langer', '', 1540, 720, q.on('jagen', 1, 0.5), 'center', C.groen); },

  s14(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX);
    const rows = ['borstvinspier', 'hart', 'schedel', 'buikholte', 'datarecorder']; const ra = rows.map((w, i) => q.on(w, 1, 0.5));
    const nu = rows.map((w, i) => (t >= q.at(w, 1) && (i === 4 || t < q.at(rows[i + 1], 1))) ? 1 : 0);
    a_tabel(ctx, 110, 290, 0.95, { a: q.on('tabel', 1, 0.6), rijA: ra, rij: nu });
    a_water(ctx, 1270, 190, 600, 600, ramp(t, 0.3, 0.6), t); const X = 1570, Y = 480, s = 0.62;
    a_koningsvis(ctx, X, Y, s, { t, zwem: 0.4 });
    const plek = [[40, -8], [140, 70], [125, -80], [10, 68]]; plek.forEach(([fx, fy], i) => { const [px, py] = a_vispunt(X, Y, s, fx, fy); const a = ra[i]; if (a <= 0.01) return; circ(ctx, px, py, 12 + 6 * nu[i], C.goud, '#121A26', 2); });
    rows.slice(0, 4).forEach((w, i) => { const [px, py] = a_vispunt(X, Y, s, plek[i][0], plek[i][1]); naamBij(ctx, w, '', px, py + (i === 2 ? -26 : 48), nu[i] * ra[i], 'center'); });
    const dr = ra[4]; a_alpha(ctx, dr, () => { const [px, py] = a_vispunt(X, Y, s, -60, -120); roundRect(ctx, px - 30, py - 16, 60, 32, 8); shape(ctx, '#E0B64A', '#121A26', 2); circ(ctx, px + 18, py, 4, '#7FC48F'); });
    naamBij(ctx, 'datarecorder', '', X - 40, 270, dr, 'center'); },

  s15(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 3, 1, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'Waarom is de buikholte toch bijna even warm als de borstvinspier?', 70, 170, 900, q.on('Verklaar', 1, 0.5));
    punten(ctx, [{ t: 'Bloed vervoert warmte van de borstvinspieren naar de buikholte', a: q.on('antwoord', 1, 0.5), v: q.on('vervoert', 1, 0.4) },
      { t: 'Of: buikholte heeft groot volume en houdt warmte goed vast', p: 'of', a: q.on('Ook', 1, 0.5), v: q.on('volume', 1, 0.4) }], 70, 450, 900, 1, { px: 32 });
    a_water(ctx, 1030, 170, 830, 660, ramp(t, 0.2, 0.6), t); const X = 1490, Y = 480, s = 0.78;
    a_koningsvis(ctx, X, Y, s, { t, zwem: 0.6, vlek: (c) => { const p = q.on('borstvinspieren', 1, 0.5); if (p > 0.01) { c.save(); c.globalAlpha *= p * (0.7 + 0.3 * Math.sin(t * 4)); const g = c.createRadialGradient(40, -6, 5, 40, -6, 90); g.addColorStop(0, rgba(A_WARM, 0.95)); g.addColorStop(1, rgba(A_WARM, 0)); c.fillStyle = g; c.fillRect(-60, -100, 200, 190); c.restore(); }
      const bh = q.on('buikholte', 2, 0.5); if (bh > 0.01) { c.save(); c.globalAlpha *= bh; c.beginPath(); c.ellipse(0, 70, 80, 46, 0, 0, 6.283); c.fillStyle = rgba(A_WARM, 0.35 + 0.3 * q.on('vervoert', 1, 1)); c.fill(); c.strokeStyle = rgba('#F2F2EE', 0.6); c.setLineDash([8, 8]); c.lineWidth = 3; c.stroke(); c.restore(); }
      const bl = q.on('bloed', 1, 0.8); if (bl > 0.01) { c.save(); c.globalAlpha *= bl; c.strokeStyle = 'rgba(200,48,44,0.9)'; c.lineWidth = 9; c.beginPath(); c.ellipse(25, 32, 70, 52, 0.5, 0, 6.283); c.stroke(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 - t * 1.6; const xx = 25 + Math.cos(an) * 70, yy = 32 + Math.sin(an) * 52; const r = Math.cos(0.5), sn = Math.sin(0.5); circ(c, 25 + (xx - 25) * r - (yy - 32) * sn, 32 + (xx - 25) * sn + (yy - 32) * r, 7, '#F2C94C'); } c.restore(); } } });
    const [bx, by] = a_vispunt(X, Y, s, 40, -6), [hx, hy] = a_vispunt(X, Y, s, 0, 70);
    naamBij(ctx, 'borstvinspier', '13,8 °C', bx - 330, by - 40, q.on('borstvinspieren', 1, 0.5), 'center'); naamBij(ctx, 'buikholte', '13,5 °C', hx - 330, hy + 60, q.on('buikholte', 2, 0.5), 'center'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 4, 'mc', ramp(t, 0, 0.4));
    welNiet(ctx, [{ t: 'Naast de borstvinspier maakt nog een ander gebied veel warmte.', a: q.on('Eén', 1, 0.5), hl: t > q.at('Eén', 1) && t < q.at('Twee', 2) ? 1 : 0 },
      { t: 'Door de grote spreiding bij de schedel zijn die metingen niet valide.', a: q.on('Twee', 2, 0.5), hl: t > q.at('Twee', 2) && t < q.at('Welke', 1) ? 1 : 0 }], 70, 150, 960, 1);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 440, 960, { a: [0, 1, 2, 3].map(i => q.on('Welke', 1, 0.4 + i * 0.1)) }, 1);
    a_tabel(ctx, 1110, 290, 0.66, { a: ramp(t, 0.5, 0.6), rij: [0, 0, q.on('ander', 1, 0.5), 0, 0], cel: [{ r: 2, k: 1, cx: 150, rx: 120, a: q.on('spreiding', 1, 0.8) }] }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 4, 'mc');
    const u2 = q.on('Uitspraak', 2, 0.4);
    welNiet(ctx, [{ t: 'Naast de borstvinspier maakt nog een ander gebied veel warmte.', v: 'wel', s: q.on('Ondersteund', 1, 0.5), hl: t < q.at('Uitspraak', 2) ? 1 : 0 },
      { t: 'Door de grote spreiding bij de schedel zijn die metingen niet valide.', v: 'niet', s: q.on('ondersteund', 2, 0.5), hl: t > q.at('Uitspraak', 2) && t < q.at('antwoord', 1) ? 1 : 0 }], 70, 150, 960, 1);
    const w1 = q.on('Ondersteund', 1, 0.6), w2 = q.on('ondersteund', 2, 0.6), g = q.on('antwoord', 1, 0.5);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 440, 960, { weg: [w1, 0, w1, w2], goed: 1, g }, 1);
    const leer = q.on('Leer', 1, 0.5);
    a_tabel(ctx, 1110, 290, 0.66, { a: 1 - 0.6 * leer, rij: [q.on('borstvinspier', 1, 0.4) * (1 - u2), 0, q.on('schedel', 1, 0.4) * (1 - u2), 0, 0],
      cel: [{ r: 2, k: 1, cx: 50, rx: 60, a: q.on('zestien', 1, 0.6) * (1 - u2), col: C.goud }, { r: 0, k: 1, cx: 50, rx: 60, a: q.on('borstvinspier', 1, 0.6) * (1 - u2), col: C.goud }, { r: 2, k: 1, cx: 150, rx: 120, a: q.on('Spreiding', 1, 0.6) * (1 - leer) }] });
    tipKaart(ctx, 'Valide: je meet wat je wilt meten.', 1090, 700, 790, q.on('valide', 2, 0.5) * (1 - q.on('Spreiding', 1, 0.4)), 30);
    tipKaart(ctx, 'Valide = je meet het goede. Betrouwbaar = herhaalbaar, weinig toeval.', 1090, 700, 790, leer, 30); },

  s18(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 5, 1, ramp(t, 0, 0.4));
    const L = q.on('lijnen', 1, 1.5);
    a_grafiek(ctx, 280, 240, 960, 520, { a: ramp(t, 0.3, 0.6), lijn: [L, L, L], diepteAs: q.on('assen', 1, 0.5), pijlD: q.on('beneden', 1, 0.8) });
    const X = (m) => 280 + m / 200 * 960; // aanwijzingen
    a_alpha(ctx, q.on('temperatuur', 1, 0.4) * (1 - q.on('diepte', 1, 0.4)), () => { roundRect(ctx, 160, 230, 92, 540, 16); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('diepte', 1, 0.4) * (1 - q.on('Welke', 1, 0.4)), () => { roundRect(ctx, 1244, 230, 150, 540, 16); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('nul', 1, 0.5) * (1 - q.on('Welke', 1, 0.4)), () => { ctx.beginPath(); ctx.arc(1265, 240, 26, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
    a_toewijzing(ctx, 1460, 300, 410, [0, 1, 2].map(i => ({ a: q.on('Welke', 1, 0.4 + i * 0.15) })), 1); },

  s19(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 5, 1);
    const tip = q.on('Tip', 1, 0.5); const fase = (a, b) => (t >= q.at(a[0], a[1]) && t < q.at(b[0], b[1])) ? 1 : 0;
    const h1 = fase(['lijn', 2], ['lijn', 3]) || fase(['veertien', 2], ['tien', 3]) ? 1 : 0, h3 = fase(['lijn', 3], ['lijn', 4]), h2 = fase(['lijn', 4], ['Controleer', 1]) || fase(['tien', 3], ['antwoord', 1]) ? 1 : 0;
    const any = h1 || h2 || h3; const dim = [any && !h1 ? 1 : 0, any && !h2 ? 1 : 0, any && !h3 ? 1 : 0];
    const G = a_grafiek(ctx, 280, 240, 960, 520, { a: 1 - 0.85 * tip, hl: [h1, h2, h3], dim, diepteAs: 1 });
    a_alpha(ctx, h3 * (1 - tip), () => { roundRect(ctx, 1244, 230, 150, 540, 16); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.stroke(); });
    a_alpha(ctx, q.on('twintig', 1, 0.5) * h3, () => { ctx.beginPath(); ctx.ellipse(G.X(80), G.Y(4.6), 46, 56, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); text(ctx, 'duik', G.X(80) + 60, G.Y(4.6) + 50, fTekst(32, 700), C.goud, 'left'); });
    // controle met tabel 1: 14 en 10
    const c14 = q.on('veertien', 2, 0.5) * (1 - q.on('antwoord', 1, 0.5)), c10 = q.on('tien', 3, 0.5) * (1 - q.on('antwoord', 1, 0.5));
    a_alpha(ctx, c14 * (1 - tip), () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(14)); ctx.lineTo(G.X(200), G.Y(14)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '≈ 14', G.X(4), G.Y(14) - 12, fTekst(30, 700), C.goud, 'left'); });
    a_alpha(ctx, c10 * (1 - tip), () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(10)); ctx.lineTo(G.X(200), G.Y(10)); ctx.stroke(); ctx.setLineDash([]); text(ctx, '≈ 10', G.X(4), G.Y(10) + 36, fTekst(30, 700), C.goud, 'left'); });
    tag(ctx, '≈ 4–5 °C verschil, past bij tabel 1', 760, 200, C.goud, q.on('past', 1, 0.5) * (1 - q.on('antwoord', 1, 0.5)), 'center', 28);
    const g = q.on('antwoord', 1, 0.5);
    a_toewijzing(ctx, 1460, 300, 410, [{ v: q.on('borstvinspier', 1, 0.5), hl: h1, g }, { v: q.on('watertemperatuur', 1, 0.5), hl: h2, g }, { v: q.on('zwemdiepte', 1, 0.5), hl: h3, g }], 1);
    antwoordLabel(ctx, 'Antwoord', g * (1 - tip), 1460, 260);
    tipKaart(ctx, 'Twee y-assen? Zoek eerst uit welke as bij welke lijn hoort.', 280, 400, 1060, tip); },

  s20(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3, ramp(t, 0, 0.4));
    const lek = q.on('warmtelek', 1, 0.6), kb = q.on('kieuwbogen', 1, 0.8), lg = q.on('Leg', 1, 0.6);
    const X = 520, Y = 480, s = 0.8; a_alpha(ctx, 1 - lg, () => { a_water(ctx, 60, 170, 940, 640, 1, t); a_koningsvis(ctx, X, Y, s, { t, warm: 0.55, zwem: 0.5 });
      const [gx, gy] = a_vispunt(X, Y, s, 120, 20); for (let i = 0; i < 4; i++) { const an = -0.4 + i * 0.3; a_warmtePijl(ctx, gx + 20, gy + i * 18 - 20, Math.cos(an), Math.sin(an) + 0.4, 60, lek * (1 - 0.6 * kb), t + i * 0.5); }
      naamBij(ctx, 'kieuwen', 'warmtelek', gx, gy + 140, lek * (1 - kb), 'center');
      a_alpha(ctx, kb, () => { ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - 30); ctx.lineTo(1290, 180); ctx.moveTo(gx, gy + 30); ctx.lineTo(1290, 780); ctx.stroke(); circ(ctx, gx, gy, 30, null, C.goud, 3); }); });
    vraagKaart(ctx, 'Leg uit', 'Hoe beperkt het wondernet warmteverlies? Wat voegt het vet toe?', 70, 200, 900, lg);
    const kx = 1380, ky = 480; a_kieuwboog(ctx, kx, ky, 170, { a: kb, t, wondernet: q.on('wondernet', 1, 0.8), vet: q.on('vet', 1, 0.8), hlPl: q.on('kieuwplaatjes', 1, 0.5) * (1 - q.on('terugkomt', 1, 0.5)), hlBoog: kb * (1 - q.on('wondernet', 1, 0.5)) });
    naamBij(ctx, 'kieuwboog', '', 1270, 290, kb, 'right'); naamBij(ctx, 'kieuwplaatjes', '', 1640, 210, q.on('kieuwplaatjes', 1, 0.5), 'left');
    naamBij(ctx, 'wondernet', '', 1270, 690, q.on('wondernet', 1, 0.5), 'right'); naamBij(ctx, 'vetweefsel', '', kx - 10, ky + 12, q.on('vet', 1, 0.5), 'center'); },

  s21(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3);
    tag(ctx, 'tegenstroom', W / 2, 190, C.goud, q.on('tegenstroom', 1, 0.5) * (1 - q.on('warm', 1, 0.4)), 'center', 36);
    const kA = q.on('warm', 1, 0.6), kB = q.on('afgekoeld', 1, 0.6);
    a_tegenstroom(ctx, t, { a: ramp(t, 0.2, 0.6), kleur: Math.max(kA, kB), kA, kB, stroom: q.on('tegengestelde', 1, 0.6), warmte: q.on('geeft', 1, 0.6), terug: q.on('terug', 2, 0.6), verlies: q.on('weinig', 1, 0.6) });
    naamBij(ctx, 'naar de kieuwen', 'warm', 900, 315, kA, 'center'); naamBij(ctx, 'terug naar het lichaam', 'koud', 900, 640, kB, 'center');
    naamBij(ctx, 'lichaam', '', 185, 470, ramp(t, 0.4), 'center'); metaA_(ctx, 'KOUD WATER', 1850, 215, ramp(t, 0.4), '#9CC0E8', 'right', 22);
    naamBij(ctx, 'kieuwplaatjes', '', 1650, 740, q.on('kieuwplaatjes', 1, 0.5), 'center');
    naamBij(ctx, 'al afgekoeld', '', 1250, 315, q.on('aankomt', 1, 0.5), 'center', '#9CC0E8'); naamBij(ctx, 'wondernet', '', 760, 470, q.on('geeft', 1, 0.5), 'center'); },

  s22(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 6, 3);
    punten(ctx, [{ t: 'Bloed naar de kieuwen is warm, bloed terug is koud', a: q.on('Eén', 1, 0.5), v: q.on('koud', 1, 0.4) },
      { t: 'Wondernet: warmte gaat over van aanvoerend naar terugstromend bloed', a: q.on('Twee', 1, 0.5), v: q.on('terugstromende', 1, 0.4) },
      { t: 'Vet isoleert de kieuwboog: weinig warmteverlies', a: q.on('Drie', 3, 0.5), v: q.on('isoleert', 1, 0.4) }], 70, 160, 1100, 1, { px: 32 });
    valkuil(ctx, 'Temperatuurverschil niet genoemd: eerste punt kwijt.', 70, 690, 1100, q.on('Wie', 1, 0.5));
    a_kieuwboog(ctx, 1560, 470, 120, { a: ramp(t, 0.2, 0.6), t, vet: 1 }); naamBij(ctx, 'wondernet', '', 1470, 770, ramp(t, 0.5), 'center'); },

  s23(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2, ramp(t, 0, 0.4));
    const cl = q.on('cladogram', 1, 0.6), vijf = q.on('vijf', 1, 0.8), kleur = [C.goud, C.teal, C.koraal, C.groen, C.paars];
    a_alpha(ctx, ramp(t, 0.2, 0.6) * (1 - cl), () => { for (let i = 0; i < 48; i++) { const x = 170 + (i % 8) * 115, y = 240 + Math.floor(i / 8) * 95; const lijn = [0, 2, 2, 4, 2, 3, 4, 2, 1, 2, 4, 2][i % 12];
      a_koningsvis(ctx, x, y + Math.sin(t * 1.5 + i) * 4, 0.13, { t: t + i, zwem: 0.5 }); circ(ctx, x - 6, y + 50, 9, kleur[lijn], null, 0); ctx.save(); ctx.globalAlpha *= 1 - vijf; circ(ctx, x - 6, y + 50, 9, '#5A6478'); ctx.restore(); }
      metaText(ctx, '480 vissen · mtDNA', 170, 830, C.text2, 'left', 22); });
    const step = clamp((t - q.at('cladogram', 1)) / 2.4, 0, 1);
    a_cladogram(ctx, 110, 210, 0.82, { a: cl });
    welNiet(ctx, [{ t: 'L. immaculatus is de voorouder van alle koningsvissen', a: q.on('Drie', 1, 0.4) }, { t: 'Lijn 2 is meer verwant met 4 dan met 1', a: q.on('Drie', 1, 0.6) }, { t: 'Lijn 3 is meer verwant met 4 dan met 5', a: q.on('Drie', 1, 0.8) }], 1120, 170, 760, 1, { px: 30 }); },

  s24(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2);
    const sp = q.on('splitsingspunten', 1, 0.8), rec = q.on('recentere', 1, 0.6) * (1 - q.on('Alle', 1, 0.5)), ui = q.on('uiteinden', 2, 0.6);
    const hl = rec > 0.5 ? { l4: 1, l5: 1 } : {}; const C0 = a_cladogram(ctx, 360, 200, 0.95, { a: ramp(t, 0, 0.6), hl, nodes: { root: sp, n1: sp, n2: sp, n23: sp, n45: sp } });
    const sc = 0.95, px = (x) => 360 + x * sc, py = (y) => 200 + y * sc;
    a_alpha(ctx, rec, () => { circ(ctx, px(C0.N.n45[0]), py(C0.N.n45[1]), 30, null, C.goud, 4); naamBij(ctx, 'recente voorouder', '', px(C0.N.n45[0]) - 40, py(C0.N.n45[1]) - 40, 1, 'right', C.goud); });
    a_alpha(ctx, ui, () => { Object.values(C0.Y).forEach(y => circ(ctx, px(C0.tipX + 6), py(y), 10, C.groen)); pijl(ctx, px(0), 800, px(C0.tipX), 800, C.line, 1, 3, 16); metaText(ctx, 'VERLEDEN', px(0), 840, C.text2, 'left', 22); metaText(ctx, 'NU', px(C0.tipX), 840, C.groen, 'right', 22); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 7, 2);
    const at = (w, n = 1) => t >= q.at(w, n); let hl = {}, nodes = {};
    if (at('immaculatus') && !at('voorouder', 2)) hl = { lm: 1 };
    if (at('voorouder', 2) && !at('Bewering', 2)) nodes = { root: 1 };
    if (at('Volg') && !at('hoort')) hl = { l2: 1 };
    if (at('hoort') && !at('Samen')) { hl = { l2: 1, l3: 1, g23: 1 }; nodes = { n23: 1 }; }
    if (at('Samen') && !at('eerder')) { hl = { l2: 1, l3: 1, g23: 1, l4: 1, l5: 1, g45: 1 }; nodes = { n2: 1 }; }
    if (at('eerder') && !at('Wel')) { hl = { l1: 1 }; nodes = { n1: 1, n2: 1 }; }
    if (at('zustergroepen') && !at('dus', 2)) { hl = { l4: 1, l5: 1, g45: 1 }; nodes = { n45: 1 }; }
    if (at('dus', 2) && !at('Niet', 2)) { hl = { l3: 1, l4: 1, l5: 1 }; nodes = { n2: 1 }; }
    a_cladogram(ctx, 110, 210, 0.82, { hl, nodes });
    const b = (n) => (at('Bewering', n) && (n === 3 || !at('Bewering', n + 1))) ? 1 : 0;
    welNiet(ctx, [{ t: 'L. immaculatus is de voorouder van alle koningsvissen', v: 'niet', s: q.on('Niet', 1, 0.5), hl: b(1) }, { t: 'Lijn 2 is meer verwant met 4 dan met 1', v: 'wel', s: q.on('Wel', 1, 0.5), hl: b(2) }, { t: 'Lijn 3 is meer verwant met 4 dan met 5', v: 'niet', s: q.on('Niet', 2, 0.5), hl: b(3) }], 1120, 170, 760, 1, { px: 30 });
    naamBij(ctx, 'nu levende soort', '', 830, 745, (at('levende') && !at('voorouder', 2)) ? 1 : 0, 'left', C.goud);
    naamBij(ctx, 'voorouder', '', 160, 640, at('voorouder', 2) && !at('Bewering', 2) ? 1 : 0, 'center', C.goud); },

  s26(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, A_CTX); vraagChip(ctx, 8, 2, ramp(t, 0, 0.4));
    const r1 = q.on('Eén', 1, 0.4), r2 = q.on('Twee', 2, 0.4), r3 = q.on('Drie', 2, 0.4);
    welNiet(ctx, [{ t: 'Dan had hij longen en geen kieuwen, net als walvissen', v: 'wel', s: q.on('Wel', 1, 0.5), a: r1, hl: t > q.at('Eén', 1) && t < q.at('Twee', 2) ? 1 : 0 },
      { t: 'Er heeft co-evolutie plaatsgevonden', v: 'niet', s: q.on('Niet', 1, 0.5), a: r2, hl: t > q.at('Twee', 2) && t < q.at('Drie', 2) ? 1 : 0 },
      { t: 'Koningsvissen zijn een schakel tussen koudbloedige vissen en zoogdieren', v: 'niet', s: q.on('Niet', 2, 0.5), a: r3, hl: t > q.at('Drie', 2) ? 1 : 0 }], 70, 150, 1000, 1, { px: 30 });
    metaA_(ctx, 'IS DE KONINGSVIS UIT EEN ZOOGDIER GEËVOLUEERD?', 70, 620, ramp(t, 0.4, 0.6) * (1 - r1), C.goud, 'left', 24);
    // paneel rechts per reactie
    const p1 = r1 * (1 - r2), p2 = r2 * (1 - q.on('lijken', 1, 0.5)), p3 = q.on('lijken', 1, 0.5) * (1 - r3), p4 = r3;
    a_alpha(ctx, p1, () => { a_walvis(ctx, 1480, 300, 0.9, 1); a_longen(ctx, 1480, 310, 0.8, q.on('longen', 1, 0.5)); naamBij(ctx, 'walvis · zoogdier', 'longen', 1480, 420, 1, 'center');
      a_koningsvis(ctx, 1480, 640, 0.45, { t }); naamBij(ctx, 'koningsvis', 'kieuwen', 1480, 790, 1, 'center'); });
    a_alpha(ctx, p2, () => { a_bloem(ctx, 1460, 380, 1.3, 1, t); pijl(ctx, 1560, 640, 1700, 640, C.goud, 1, 4, 16); pijl(ctx, 1700, 680, 1560, 680, C.goud, 1, 4, 16); naamBij(ctx, 'co-evolutie', 'twee soorten beïnvloeden elkaar', 1480, 780, 1, 'center'); });
    a_alpha(ctx, p3, () => { a_koningsvis(ctx, 1320, 380, 0.4, { t, warm: 0.8 }); a_walvis(ctx, 1660, 380, 0.6, 1); const g = ctx.createRadialGradient(1660, 380, 10, 1660, 380, 140); g.addColorStop(0, rgba(A_WARM, 0.5)); g.addColorStop(1, rgba(A_WARM, 0)); ctx.fillStyle = g; ctx.fillRect(1500, 260, 320, 240);
      naamBij(ctx, 'convergente evolutie', 'los van elkaar endotherm', 1490, 600, q.on('convergente', 1, 0.5), 'center', C.goud); });
    a_alpha(ctx, p4, () => { // mini-stamboom: zoogdieren apart, koningsvis tussen de vissen
      ctx.strokeStyle = '#E8E8E0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1200, 640); ctx.lineTo(1260, 640); ctx.moveTo(1260, 520); ctx.lineTo(1260, 760); ctx.moveTo(1260, 760); ctx.lineTo(1560, 760); ctx.moveTo(1260, 520); ctx.lineTo(1400, 520); ctx.moveTo(1400, 470); ctx.lineTo(1400, 570); ctx.moveTo(1400, 470); ctx.lineTo(1560, 470); ctx.moveTo(1400, 570); ctx.lineTo(1560, 570); ctx.stroke();
      text(ctx, 'andere vissen', 1580, 480, fTekst(30, 600), C.text, 'left'); text(ctx, 'koningsvis', 1580, 580, fTekst(30, 700), C.goud, 'left'); text(ctx, 'zoogdieren', 1580, 770, fTekst(30, 600), C.text, 'left');
      circ(ctx, 1560, 570, 12, C.goud); naamBij(ctx, 'nu levend, geen schakel', '', 1500, 400, q.on('levende', 1, 0.5), 'center', C.goud); }); }
});
// Examenbespreking vwo 2018-II — scènes deel b: s27–s43 (Nieuwe eilandjes voor de alvleesklier, vragen 9–15),
// s65–s69 (Biologische productie van waterstofgas, vragen 27–30), s86–s87 (Wat neem je mee?). v1, 21 okt 2026.

function b_ruth(ctx, t, x, a, o = {}) { const an = persoon(ctx, 'lotte', x, o.voet || 860, o.h || 540, Object.assign({ t, kijk: 1, a }, o)); if (o.naam != null) naamBij(ctx, 'Ruth', '', x, (an.top || 300) - 22, a * o.naam, 'center'); return an; }
// schuif een tekening (getekend rond (960,480)) naar een andere plek en schaal: k = 0..1
function b_schuif(ctx, k, dx, dy, s, fn) { ctx.save(); const kk = ease(k); ctx.translate(960 + dx * kk, 480 + dy * kk); ctx.scale(lerp(1, s, kk), lerp(1, s, kk)); ctx.translate(-960, -480); fn(); ctx.restore(); }
const b_OPT10 = ['ADH neemt af · resorptie neemt af', 'ADH neemt af · resorptie neemt toe', 'ADH neemt toe · resorptie neemt af', 'ADH neemt toe · resorptie neemt toe'];
const b_OPT12 = ['Minder insuline, dus minder aerobe dissimilatie', 'Minder insuline, dus de lever slaat minder glucose op', 'Glucosegehalte gedaald, dus de alvleesklier maakt glucagon', 'Tijdens de slaap wordt minder glucose verbruikt'];
function b_citaat(ctx, x, y, w, a, hl) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 110, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  metaText(ctx, 'zin vlak voor de vraag', x + 26, y + 34, '#6A6458', 'left', 18);
  const s1 = '… een lage bloedglucosewaarde ', s2 = 'in de nacht', s3 = ' en het dageraadfenomeen …'; ctx.font = fTekst(32, 600); const w1 = ctx.measureText(s1).width, w2 = ctx.measureText(s2).width;
  if (hl > 0.01) { ctx.fillStyle = rgba(C.goud, 0.55 * hl); ctx.fillRect(x + 26 + 2, y + 52, (w1 + w2) * clamp(hl * 1.3, 0, 1), 44); }
  text(ctx, s1, x + 26, y + 86, fTekst(32, 600), '#1A2233', 'left'); text(ctx, s2, x + 26 + w1, y + 86, fTekst(32, 600), '#1A2233', 'left'); text(ctx, s3, x + 26 + w1 + w2, y + 86, fTekst(32, 500), '#6A6458', 'left'); ctx.restore(); }

Object.assign(SCENES, {
  // ================= Nieuwe eilandjes voor de alvleesklier =================
  s27(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE, q.on('tweede', 1, 0.5));
    const ra = q.on('Ruth', 1, 0.3); b_ruth(ctx, t, 300, ra, { pose: 'vasthouden', naam: 1, hold: (c, x, y) => b_glucosemeter(c, x + 12, y - 34, 0.95, '15,8', 1, q.on('diabetes', 1)) });
    const al = q.on('bètacellen', 1, 0.6), za = q.on('bètacellen', 1, 0.8), tc = ramp(t, q.at('afweersysteem', 1), Math.max(1, q.at('Zonder', 1) - q.at('afweersysteem', 1))), kp = q.on('Zonder', 1, 1.6);
    b_alvleesklier(ctx, 860, 600, 1.05, al, { hl: za, t }); naamBij(ctx, 'alvleesklier', '', 860, 700, al, 'center');
    if (za > 0.01) { ctx.save(); ctx.globalAlpha *= za; ctx.strokeStyle = rgba(b_BETAR, 0.5); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(876 + 22, 585); ctx.lineTo(1450 - 260, 470 - 150); ctx.moveTo(876 + 22, 615); ctx.lineTo(1450 - 250, 470 + 165); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    b_zoomRing(ctx, 1450, 470, 300, za, () => b_eiland(ctx, 1450, 470, 300, t, { ins: 1 - kp, tc, kapot: kp }));
    naamBij(ctx, 'eilandje van Langerhans', '', 1450, 820, q.on('Langerhans', 1), 'center', b_BETAR);
    naamBij(ctx, 'bètacellen maken insuline', '', 1450, 140, q.on('maken', 1) * (1 - q.on('Zonder', 1)), 'center', b_BETA);
    tag(ctx, 'auto-immuunziekte', 860, 300, C.koraal, q.on('auto', 1), 'center', 34); },

  s28(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 9, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waarom normale insulineproductie in de thymus nodig is', 70, 170, 860, q.on('Tijdens', 1, 0.6));
    const th = q.on('ontwikkeling', 1), ins = q.on('afgelezen', 1, 1) * (1 - 0.75 * q.on('minder', 1, 1));
    b_thymus(ctx, 1400, 470, 1.55, th, { ins, t }); naamBij(ctx, 'thymus', '', 1400, 740, th, 'center', b_THY);
    naamBij(ctx, 'insuline wordt hier ook gemaakt', '', 1400, 200, q.on('afgelezen', 1) * (1 - q.on('minder', 1)), 'center', C.goud);
    naamBij(ctx, 'diabetes type 1: minder insuline', '', 1400, 200, q.on('minder', 1) * (1 - q.on('Leg', 1)), 'center', C.koraal);
    if (q.on('Leg', 1) > 0.01) { const tcS = q.on('Leg', 1); for (let i = 0; i < 4; i++) { const an = i * 1.57 + 0.6 + t * 0.15; b_tcel(ctx, 1400 + Math.cos(an) * 240, 470 + Math.sin(an) * 200, 30, t, { a: tcS, vorm: ['rond', 'drie', 'vierkant', 'rond'][i], seed: i }); } } },

  s29(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 9, 2);
    const ph2 = q.on('antwoord', 1, 1);
    b_schuif(ctx, ph2, -440, 30, 0.82, () => {
      const cx = 960, cy = 480; const th = q.on('thymus', 1, 0.6);
      b_thymus(ctx, cx, cy, 2.35, th * 0.45); naamBij(ctx, 'thymus', '', cx - 330, 200, th, 'center', b_THY);
      const ins = q.on('lichaamseigen', 1, 0.8); b_thymusCel(ctx, cx, cy, 92, t, { a: q.on('eiwitten', 1, 0.6) > 0 ? 1 : q.on('Daar', 1), ins });
      naamBij(ctx, 'lichaamseigen eiwit (insuline)', '', cx + 330, cy + 230, q.on('eiwitten', 1) * (1 - ph2), 'left', C.goud);
      const re = q.on('reageren', 1, 1.4), op = q.on('opgeruimd', 1, 1.2), lr = q.on('leren', 1, 1.2);
      const vormen = ['rond', 'drie', 'vierkant', 'rond', 'drie', 'rond', 'drie'];
      vormen.forEach((v, i) => { const verschijn = ramp(t, q.at('T-cellen', 1) + i * 0.18, 0.4); const an = -Math.PI / 2 + i * 6.283 / 7 + 0.25; const w = wander(i + 5, t, 8, 0.6); let R = 280;
        const zelf = v === 'vierkant'; if (zelf) R = lerp(280, 150, re); else R = 280 + 40 * lr;
        const x = cx + Math.cos(an) * R + w.x, y = cy + Math.sin(an) * R * 0.92 + w.y;
        b_tcel(ctx, x, y, 40, t, { a: verschijn * (zelf ? 1 - 0.85 * op : 1), vorm: v, seed: i, gloed: zelf ? re * (1 - op) : lr * 0.6, gloedKl: zelf ? C.koraal : null, kapot: zelf ? op : 0 });
        if (zelf) kruis(ctx, x, y, 30, op * (1 - ph2)); });
      naamBij(ctx, 'T-cellen', '', cx + 340, cy + 10, ramp(t, q.at('T-cellen', 1), 0.5) * (1 - re), 'left', b_TC);
    });
    punten(ctx, [{ t: 'Insuline in de thymus: T-cellen die op insuline reageren, worden niet rijp', a: q.on('Eén', 1), v: q.on('rijp', 2) },
      { t: 'Dus geen aanval op de bètacellen (die insuline maken) in de alvleesklier', a: q.on('Twee', 2), v: q.on('niet', 2) }], 1020, 190, 840, ph2, { px: 32 });
    b_zoomRing(ctx, 1440, 700, 140, q.on('alvleesklier', 1), () => b_eiland(ctx, 1440, 700, 140, t, { ins: 1 }));
    naamBij(ctx, 'bètacellen blijven heel', '', 1440, 875 - 10, 0, 'center'); },

  s30(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 10, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'combinatie van ADH-afgifte en terugresorptie van water is juist?', 70, 170, 860, ramp(t, 0.3, 0.5));
    const gl = q.on('bloedsuikerspiegel', 1, 1.2); b_bloedvat(ctx, 140, 860, 560, 110, t, q.on('hoge', 1));
    for (let i = 0; i < 14; i++) { const ia = clamp(gl * 14 - i, 0, 1); const px = 200 + ((t * 40 + hash(i * 4) * 600) % 600), py = 560 + (hash(i * 4 + 1) - 0.5) * 60; glucoseDeeltje(ctx, px, py, 11, ia * q.on('hoge', 1)); }
    naamBij(ctx, 'veel glucose in het bloed', '', 500, 478, q.on('hoge', 1) * (1 - q.on('Neemt', 1)), 'center', C.teal);
    b_beker(ctx, 500, 810, 150, 150, lerp(0.75, 0.35, q.on('minder', 1, 1.2)), q.on('urine', 1), 'urine');
    hormoonVorm(ctx, 700, 750, 18, 'adh', q.on('ADH', 1)); naamBij(ctx, 'ADH', '', 730, 762, q.on('ADH', 1), 'left', C.goud);
    opties(ctx, b_OPT10, 1000, 190, 850, { a: [0, 1, 2, 3].map(i => ramp(t, q.at('Neemt', 1) + i * 0.25, 0.4)) }, 1, { px: 32 }); },

  s31(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 10, 'mc');
    const p2 = ramp(t, q.at('antwoord', 1) + 0.6, 0.6); const p1 = 1 - q.on('antwoord', 1, 0.5);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      // rechts: minder urine
      const ua = q.on('Begin', 1); b_beker(ctx, 1680, 720, 160, 220, lerp(0.75, 0.35, q.on('minder', 1, 1.2)), ua, 'urine');
      naamBij(ctx, 'gegeven: minder urine', '', 1680, 420, q.on('minder', 1) * (1 - q.on('Dan', 1)), 'center', C.goud);
      // midden: verzamelbuis in de nier, meer water terug naar het bloed
      const va = q.on('water', 1), adh = q.on('ADH', 1, 1.5), res = Math.max(0.15, q.on('teruggeresorbeerd', 1, 1.2));
      b_verzamelbuis(ctx, 1130, 450, 420, t, { a: va, adh, res }); naamBij(ctx, 'nier: water terug naar het bloed', '', 1130, 720, va, 'center', C.teal);
      // links: hypothalamus en hypofyse
      const ba = q.on('Waarom', 1), hy = q.on('hypothalamus', 1, 0.8); b_brein(ctx, 440, 420, 0.7, ba, { hyp: hy, t });
      naamBij(ctx, 'hypothalamus', '', 330, 452, hy, 'right', C.goud); naamBij(ctx, 'hypofyse', '', 480, 560, hy, 'left', C.goud);
      const ga = q.on('glucose', 1, 1); b_bloedvat(ctx, 150, 760, 730, 90, t, ga);
      for (let i = 0; i < 12; i++) { const px = 190 + ((t * 40 + hash(i * 7) * 520) % 520), py = 730 + (hash(i * 7 + 1) - 0.5) * 46; glucoseDeeltje(ctx, px, py, 10, ga * clamp(ga * 12 - i, 0, 1)); }
      naamBij(ctx, 'osmotische waarde ↑', '', 455, 810, q.on('osmotische', 1), 'center', C.teal);
      // ADH van de hypofyse via het bloed naar de nier
      const af = Math.max(q.on('ADH', 1) * 0.4, q.on('afgeven', 1)); if (af > 0.01) for (let k = 0; k < 7; k++) { const u = (t * 0.25 + k / 7) % 1; const px = lerp(460, 1040, u), py = 545 + Math.sin(u * Math.PI) * -150 * 0 + (u > 0.5 ? 0 : 0) + lerp(0, -80, Math.sin(u * Math.PI)); hormoonVorm(ctx, px, py, 13, 'adh', af * Math.sin(u * Math.PI)); }
      naamBij(ctx, 'meer ADH', '', 760, 430, q.on('ADH', 1) * (1 - q.on('Waarom', 1)) + q.on('afgeven', 1), 'center', C.goud);
      // terugredeneren: pijlen van rechts naar links
      b_A(ctx, q.on('Dan', 1), () => { ctx.save(); ctx.setLineDash([12, 10]); pijl(ctx, 1560, 300, 1290, 300, C.goud, 1, 4, 18); ctx.restore(); });
      b_A(ctx, q.on('doordat', 1), () => { ctx.save(); ctx.setLineDash([12, 10]); pijl(ctx, 960, 300, 720, 300, C.goud, 1, 4, 18); ctx.restore(); });
      ctx.restore(); }
    if (p2 > 0.01) { antwoordLabel(ctx, 'Antwoord D', p2);
      opties(ctx, b_OPT10, 300, 240, 1320, { weg: [0, 1, 2].map(i => ramp(t, q.at('antwoord', 1) + 1.3 + i * 0.25, 0.6)), goed: 3, g: p2 }, p2, { px: 34 });
      tipKaart(ctx, 'Staat de uitkomst al in de tekst? Redeneer dan terug.', 300, 660, 1320, q.on('Tip', 1)); } },

  s32(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 11, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waardoor Ruth zonder insuline afvalt, ondanks veel glucose in haar bloed', 70, 170, 860, q.on('Ruth', 1, 0.6));
    const ra = q.on('Ruth', 1, 0.3), af = q.on('afvallen', 1, 2.5); b_weegschaal(ctx, 1460, 860, 260, lerp(54, 49.5, af), ra, af);
    b_ruth(ctx, t, 1460, ra, { voet: 826, h: 520, naam: 1, uit: af > 0.6 ? 'bezorgd' : 'neutraal' });
    const ga = q.on('glucose', 1, 1); b_bloedvat(ctx, 120, 880, 640, 120, t, ga);
    for (let i = 0; i < 18; i++) { const px = 170 + ((t * 45 + hash(i * 5) * 660) % 660), py = 640 + (hash(i * 5 + 1) - 0.5) * 70; glucoseDeeltje(ctx, px, py, 11, ga * clamp(ga * 18 - i, 0, 1)); }
    naamBij(ctx, 'veel glucose in het bloed', '', 500, 555, ga, 'center', C.teal); },

  s33(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 11, 2);
    const ph2 = q.on('Twee', 1, 1); const zonder = q.on('Zonder', 1, 0.8);
    b_schuif(ctx, ph2, -470, 40, 0.7, () => {
      b_bloedvat(ctx, 360, 1560, 230, 110, t, 1); naamBij(ctx, 'bloed', '', 340, 242, 1 - ph2, 'right', b_BLOEDL);
      const ins = 1 - zonder; const opn = 1 - 0.85 * zonder; const kp = b_lichaamscel(ctx, 960, 600, 220, t, { ins, opname: opn, honger: q.on('brandstof', 1) * (1 - 0.5 * q.on('verbranden', 1)), vet: 1 - 0.7 * q.on('verbranden', 1, 3), eiwit: 1 - 0.6 * q.on('verbranden', 1, 3.5), brand: q.on('verbranden', 1) });
      // insuline in het bloed (alleen in het eerste stuk)
      for (let i = 0; i < 5; i++) { const px = 420 + ((t * 60 + i * 230) % 1100); b_insuline(ctx, px, 210 + 20 * Math.sin(i * 2), 9, ins); }
      // glucose: veel in het bloed; met insuline de cel in, zonder insuline blijft het buiten
      const n = 10 + Math.round(10 * zonder); for (let i = 0; i < n; i++) { const px = 400 + ((t * 50 + hash(i * 3) * 1120) % 1120), py = 230 + (hash(i * 3 + 1) - 0.5) * 66; glucoseDeeltje(ctx, px, py, 10, 1); }
      for (let k = 0; k < 4; k++) { const u = (t * 0.45 + k / 4) % 1; const sx = kp.kanaal.x, sy0 = 290, sy1 = 600; const py = lerp(sy0, sy1, u); glucoseDeeltje(ctx, sx + Math.sin(u * 6 + k) * 10 + (u > 0.45 ? (u - 0.45) * 60 : 0), py, 10, opn * (u < 0.85 ? 1 : (1 - u) / 0.15) * (u > 0.05 ? 1 : u / 0.05)); }
      naamBij(ctx, 'lichaamscel', '', 960, 860 - 8, 1 - ph2, 'center');
      naamBij(ctx, 'vet', '', 834, 630, q.on('vet', 1) * (1 - ph2), 'right', '#F0D88A'); naamBij(ctx, 'eiwit', '', 1060, 540, q.on('vet', 1) * (1 - ph2), 'center', C.groen);
      // urine
      const ua = q.on('urine', 1) * (1 - ph2); b_beker(ctx, 1720, 780, 140, 170, 0.45, ua, 'urine');
      for (let k = 0; k < 3; k++) { const u = (t * 0.35 + k / 3) % 1; glucoseDeeltje(ctx, lerp(1580, 1720, u), lerp(250, 700, u * u), 10, ua * Math.sin(u * Math.PI)); }
      const wa = q.on('valt', 1) * (1 - ph2); b_weegschaal(ctx, 300, 800, 220, lerp(54, 49.5, q.on('valt', 1, 2)), wa, 1);
    });
    naamBij(ctx, 'te weinig brandstof', '', 960, 360, q.on('brandstof', 1) * (1 - q.on('verbranden', 1)), 'center', C.koraal);
    punten(ctx, [{ t: 'Minder glucose de cellen in (of glucose verdwijnt met de urine)', a: q.on('Twee', 1), v: q.on('verdwijnt', 2) }, { t: 'Vet- en eiwitverbranding', a: q.on('voor', 2), v: q.on('eiwitverbranding', 1) }], 990, 200, 860, ph2, { px: 32 }); },

  s34(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    b_ruth(ctx, t, 280, q.on('Ruth', 1, 0.3), { naam: 1, pose: 'vasthouden', hold: (c, x, y) => b_pen(c, x + 10, y - 20, 0.9, q.on('spuit', 1)) });
    const ka = q.on('snelwerkende', 1, 0.6); examenKader(ctx, 560, 110, 1300, 500, 'AFBEELDING 1', ka);
    const G = b_afb1(ctx, 560, 110, 1300, 500, { a: ka, snel: ramp(t, q.at('snelwerkende', 1), 2.4), lang: ramp(t, q.at('langzaam', 1), 2.2) });
    naamBij(ctx, 'snelwerkend', '', G.X(2), G.Y(0.88) - 16, q.on('snelwerkende', 1, 1), 'center', C.goud);
    naamBij(ctx, 'langzaam werkend', '', G.X(18), G.Y(0.3) - 16, q.on('langzaam', 1, 1), 'center', C.teal);
    const sa = q.on('schommelt', 1, 0.6); if (sa > 0.01) { const Yg = b_glucSchets(ctx, G.X, 660, 180, ramp(t, q.at('schommelt', 1), 3), { a: sa, laag: q.on('Nachts', 1), stijg: q.on('stijgt', 1) });
      b_maan(ctx, G.X(19.6), 700, 18, q.on('Nachts', 1)); naamBij(ctx, 'te laag', '', G.X(18.3), Yg(4) + 38, q.on('laag', 1), 'right', C.teal);
      naamBij(ctx, 'dageraadfenomeen', '', G.X(24), 650, q.on('dageraadfenomeen', 1), 'right', C.goud); } },

  s35(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 12, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'verklaring past het best bij het dageraadfenomeen?', 70, 170, 1780, ramp(t, 0.3, 0.5));
    const ap = [ramp(t, q.at('minder', 1) - 0.6, 0.4), ramp(t, q.at('lever', 1) - 1.4, 0.4), ramp(t, q.at('gedaald', 1) - 1.0, 0.4), ramp(t, q.at('slaap', 1) - 1.0, 0.4)];
    opties(ctx, b_OPT12, 70, 380, 1780, { a: ap }, 1, { px: 34 }); },

  s36(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 12, 'mc');
    const p1 = 1 - q.on('antwoord', 1, 0.4), p2 = ramp(t, q.at('antwoord', 1) + 0.4, 0.5);
    if (p1 > 0.01) { ctx.save(); ctx.globalAlpha *= p1;
      b_citaat(ctx, 70, 150, 1200, q.on('Gebruik', 1), q.on('laag', 1, 1));
      const ea = q.on('lichaam', 1), gl = q.on('glucagon', 1, 1);
      b_zoomRing(ctx, 420, 560, 190, ea, () => b_eiland(ctx, 420, 560, 190, t, { ins: 0.15, gluca: gl }), C.groen);
      naamBij(ctx, 'alfacellen: glucagon', '', 420, 800, gl, 'center', C.groen); naamBij(ctx, 'eilandje', '', 420, 800, ea * (1 - gl), 'center', b_BETAR);
      for (let k = 0; k < 6; k++) { const u = (t * 0.32 + k / 6) % 1; hormoonVorm(ctx, lerp(620, 840, u), 560 + Math.sin(u * 6 + k) * 18, 12, 'glucagon', gl * Math.sin(u * Math.PI), C.groen); }
      const la = q.on('lever', 1), gg = q.on('glycogeen', 1, 3);
      cel(ctx, 1060, 560, 380, 260, { a: Math.max(la, gl * 0.4), naam: 'levercel', glyco: 1 - 0.75 * gg, col: C.oker });
      for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; glucoseDeeltje(ctx, lerp(1180, 1400, u), 560 + Math.sin(u * 5 + k) * 30 - u * 40, 11, gg * Math.sin(u * Math.PI)); }
      // grafiekje: 's nachts te laag, daarna stijging
      const ga = q.on('lichaam', 1); if (ga > 0.01) { ctx.save(); ctx.globalAlpha *= ga; const gx = 1430, gy = 380, gw = 420, gh = 300; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
        metaText(ctx, 'bloedglucose', gx, gy - 16, C.text2, 'left', 18); text(ctx, 'nacht', gx + gw * 0.3, gy + gh + 34, fTekst(24, 600), C.text2, 'center'); text(ctx, 'ochtend', gx + gw * 0.85, gy + gh + 34, fTekst(24, 600), C.text2, 'center');
        const st = q.on('stijging', 1, 1.5); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; if (u > 0.55 + 0.45 * st) break; const v = u < 0.55 ? 0.55 - 0.35 * Math.sin(u / 0.55 * Math.PI / 2) : 0.2 + 0.55 * ease((u - 0.55) / 0.45); k ? ctx.lineTo(gx + gw * u, gy + gh - gh * v) : ctx.moveTo(gx + gw * u, gy + gh - gh * v); } ctx.stroke();
        if (st > 0.01) pijl(ctx, gx + gw * 0.68, gy + gh * 0.62, gx + gw * 0.9, gy + gh * 0.32, C.goud, st, 4, 16); ctx.restore(); }
      ctx.restore(); }
    if (p2 > 0.01) { antwoordLabel(ctx, 'Antwoord C', p2);
      const vr = q.at('verklaren', 1); opties(ctx, b_OPT12, 70, 230, 1780, { weg: [0, 1, 3].reduce((o, i, k) => { o[i] = ramp(t, vr + k * 0.3, 0.6); return o; }, [0, 0, 0, 0]), goed: 2, g: q.on('antwoord', 1, 0.8) }, p2, { px: 34 });
      ketting(ctx, [{ t: 'glucagon', a: q.on('stijging', 2), col: C.groen }, { t: 'lever: glycogeen → glucose', a: ramp(t, q.at('stijging', 2) + 0.5, 0.6), col: C.oker }, { t: 'glucose stijgt', a: ramp(t, q.at('stijging', 2) + 1, 0.6), col: C.koraal }], 220, 720, 1480, p2); } },

  s37(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    const ra = q.on('Sinds', 1, 0.3); b_ruth(ctx, t, 270, ra, { naam: 1, pose: 'vasthouden', hold: (c, x, y) => b_pomp(c, x + 6, y - 10, 0.9, q.on('insulinepompje', 1), t, 1) });
    const ka = q.on('insulinepompje', 1, 0.6); examenKader(ctx, 520, 110, 1340, 740, 'AFBEELDING 2', ka);
    b_afb2(ctx, 540, 150, 1300, { a: ka, lijn: ramp(t, q.at('steeds', 1), 2.6), bolus: q.on('extra', 1, 1), onder: q.on('onderste', 1, 0.6), gluc: ramp(t, q.at('onderste', 1), 2.6), t });
    naamBij(ctx, 'maaltijdbolus', '', 540 + 96 + 1170 * 4.15 / 24, 150 + 40 - 8, q.on('maaltijd', 1) * (1 - q.on('onderste', 1) * 0.5), 'center', C.goud); },

  s38(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 13, 2, q.on('Vraag', 1, 0.4));
    examenKader(ctx, 40, 130, 1060, 730, 'AFBEELDING 2', 1);
    const d1 = q.on('Eén', 1), d2 = q.on('Twee', 2), d3 = q.on('Drie', 2);
    const r1 = d1 * (1 - d2), r2 = d2 * (1 - d3), r3 = d3;
    b_afb2(ctx, 50, 170, 1040, { lijn10: q.on('tien', 1) * (1 - d2), hlL: q.on('smalle', 1) * (1 - d3), hlA: q.on('breed', 1) * (1 - d3), maat: q.on('hoogte', 1) * (1 - d3), hlN: q.on('drie', 3) , ochtend: q.on('stijgt', 1), dimBot: r2, dimTop: r1, t });
    welNiet(ctx, [{ t: 'Glucose nooit boven 10 mmol/L', v: 'niet', a: d1, s: q.on('Niet', 1, 0.5), hl: r1 }, { t: 'Avondeten ± de helft van de insuline bij de lunch', v: 'niet', a: d2, s: q.on('Niet', 3, 0.5), hl: r2 }, { t: 'Pompje voorkomt het dageraadfenomeen', v: 'wel', a: d3, s: q.on('Wel', 1, 0.5), hl: r3 }], 1130, 150, 750, 1, { px: 28 });
    b_wisselTag(ctx, t, [['één vereenvoudigde dag', q.at('vereenvoudigde', 1), C.goud], ['hoeveelheid = hoogte × tijd', q.at('hoogte', 1), C.goud], ['avondeten: méér insuline', q.at('groter', 1), C.koraal], ['afgifte omhoog rond 03:00', q.at('drie', 3), C.teal]], 1505, 640, 30);
    if (t > q.at('Twee', 1) && t < q.at('Drie', 1)) { naamBij(ctx, 'lunch', '', 50 + 96 + 910 * 4.15 / 24, 220, q.on('smalle', 1), 'center', C.goud); naamBij(ctx, 'avondeten', '', 50 + 96 + 910 * 11 / 24, 290, q.on('breed', 1), 'center', C.koraal); } },

  s39(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 13, 2);
    const h1 = tipKaart(ctx, 'Wantrouw absolute woorden als nooit en altijd', 300, 190, 1320, q.on('Wantrouw', 1));
    tipKaart(ctx, 'Hoeveelheid uit afgifte per tijd = oppervlakte onder de lijn, niet de hoogte', 300, 340, 1320, q.on('hoeveelheid', 1));
    const sa = q.on('grafiek', 1); if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; const x0 = 620, y0 = 820, w = 700; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, 560); ctx.lineTo(x0, y0); ctx.lineTo(x0 + w, y0); ctx.stroke();
      metaText(ctx, 'afgifte', x0, 548, C.text2, 'left', 18); metaText(ctx, 'tijd →', x0 + w, y0 + 32, C.text2, 'right', 18);
      const op = q.on('oppervlakte', 1, 0.8), hg = q.on('hoogte', 1, 0.6);
      const blok = (bx, bw, bh, col) => { ctx.fillStyle = rgba(col, 0.15 + 0.4 * op); ctx.fillRect(bx, y0 - bh, bw, bh); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, y0); ctx.lineTo(bx, y0 - bh); ctx.lineTo(bx + bw, y0 - bh); ctx.lineTo(bx + bw, y0); ctx.stroke(); };
      blok(x0 + 90, 40, 220, C.goud); blok(x0 + 330, 260, 90, C.koraal);
      if (hg > 0.01) { kruis(ctx, x0 + 110, y0 - 250, 16, hg); vink_(ctx, x0 + 460, y0 - 130, 20, hg); }
      ctx.restore(); } },

  s40(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE);
    b_ruth(ctx, t, 260, q.on('genezing', 1, 0.3), { naam: 1, uit: 'blij' });
    const ka = q.on('capsule', 1, 0.8), hu = q.on('huid', 1, 1.6), ce = ramp(t, q.at('stamcellen', 1) + 0.4, 2.2);
    const sa = q.on('bètacellen', 1) * (1 - hu); const df = q.on('stamcellen', 1, 1);
    if (sa > 0.01) { b_stamcel(ctx, 700, 360, 60, t, sa, df); naamBij(ctx, df > 0.5 ? 'bètacel uit eigen stamcel' : 'stamcel', '', 700, 470, sa, 'center', df > 0.5 ? b_BETA : '#B8A8E0');
      for (let k = 0; k < 3; k++) { const u = clamp(ce * 3 - k, 0, 1); if (u > 0.01 && u < 0.99) b_stamcel(ctx, lerp(700, 1150, ease(u)), 360 + Math.sin(u * 3.14) * -60, 26, t, sa, 1); } }
    const huid = b_huid(ctx, 620, 560, 1220, 300, hu);
    const zx = lerp(1150, 1240, hu), zy = lerp(380, 790, hu), zw = lerp(400, 200, hu), zh = lerp(260, 110, hu);
    b_theezakje(ctx, zx, zy, zw, zh, t, { a: ka, cellen: ce });
    naamBij(ctx, 'theezakje van gel', '', zx, zy - zh / 2 - 26, q.on('theezakje', 1) * (1 - hu), 'center', b_GEL);
    naamBij(ctx, 'onder de huid', '', 640, 545, hu, 'left', '#E3B998');
    const be = q.on('beschermt', 1, 0.8); if (be > 0.01) { for (let k = 0; k < 3; k++) { const an = -2.6 + k * 0.9; const d = 160 + 30 * Math.abs(Math.sin(t * 1.8 + k)); b_tcel(ctx, zx + Math.cos(an) * d, zy + Math.sin(an) * d * 0.6 + 20, 26, t, { a: be, vorm: 'vierkant', seed: k }); } }
    naamBij(ctx, 'afweer kan er niet bij', '', zx + 120, 520, be, 'left', C.groen); },

  s41(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 14, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Noem', 'de stof die de minimale en het type stoffen dat de maximale poriegrootte bepaalt', 70, 170, 860, q.on('poriën', 1, 0.6));
    const wa = q.on('poriën', 1); const kl = q.on('klein', 1, 0.8), gr = q.on('groot', 1, 0.8); const pr = lerp(lerp(40, 14, kl), 90, gr) * (gr > 0.99 ? 1 : 1) - (gr > 0.99 ? 50 * q.on('Welke', 1, 1) : 0);
    if (wa > 0.01) { ctx.save(); ctx.globalAlpha *= wa; ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(1460, 190, 400, 600);
      for (let i = 0; i < 4; i++) b_stamcel(ctx, 1170 + (i % 2) * 70, 300 + i * 130, 44, t, 1, 1);
      b_gelWand(ctx, 1400, 190, 790, 80, [490], pr, 1);
      naamBij(ctx, 'bètacellen', '', 1205, 862 - 20, 1, 'center', b_BETA); naamBij(ctx, 'gel', '', 1400, 172, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 1660, 172, 1, 'center', b_BLOEDL);
      vraagteken(ctx, 1400, 520, q.on('Welke', 1) * 0.9, 90); ctx.restore(); }
    b_wisselTag(ctx, t, [['min?', q.at('minimale', 1), C.teal], ['max?', q.at('maximale', 1), C.koraal]], 1660, 520, 34); },

  s42(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 14, 2);
    const ys = [270, 410, 550, 690], pr = 17, wx = 620;
    ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(wx + 30, 170, 460, 640);
    for (let i = 0; i < 4; i++) b_stamcel(ctx, 300 + (i % 2) * 110, 300 + i * 120, 52, t, 1, 1);
    b_gelWand(ctx, wx, 170, 810, 60, ys, pr, 1);
    naamBij(ctx, 'bètacellen', '', 355, 820, 1, 'center', b_BETA); naamBij(ctx, 'gel', '', wx, 152, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 880, 152, 1, 'center', b_BLOEDL);
    // insuline eruit
    const ia = q.on('insuline', 1, 0.8); for (let k = 0; k < 10; k++) { const u = (t * 0.22 + k / 10) % 1; const py0 = 300 + (k % 4) * 120, pyp = ys[k % 4]; let px, py;
      if (u < 0.45) { const e = u / 0.45; px = lerp(360 + (k % 2) * 110, wx - 40, e); py = lerp(py0, pyp, e); } else if (u < 0.6) { px = lerp(wx - 40, wx + 40, (u - 0.45) / 0.15); py = pyp; } else { px = lerp(wx + 40, 1060, (u - 0.6) / 0.4); py = pyp + Math.sin(u * 9 + k) * 20; }
      b_insuline(ctx, px, py, 10, ia * Math.min(1, u * 8) * Math.min(1, (1 - u) * 6)); }
    naamBij(ctx, 'insuline', '', 880, 230, ia * (1 - q.on('antistoffen', 1)), 'center', C.goud);
    // antistoffen en complement: te groot, botsen tegen de poriën
    const aa = q.on('antistoffen', 1, 0.8), ca = q.on('complementeiwitten', 1, 0.8);
    for (let k = 0; k < 4; k++) { const u = (t * 0.35 + k / 4) % 1, d = Math.abs(Math.sin(u * Math.PI)); const px = wx + 54 + 260 * (1 - d), py = ys[k] + (k % 2 ? 8 : -8);
      b_antistof(ctx, px, py, 1.1, -Math.PI / 2, aa); if (ca > 0.01) b_complement(ctx, px + 150 + 120 * (1 - Math.abs(Math.sin(u * Math.PI + 1))), ys[k] + 40, 1, ca); }
    naamBij(ctx, 'antistof', '', 960, 330, aa * (1 - q.on('afweercellen', 1)), 'center', b_AS);
    naamBij(ctx, 'complement', '', 960, 610, ca * (1 - q.on('afweercellen', 1)), 'center', b_COMP);
    const fa = q.on('afweercellen', 1, 0.6); b_tcel(ctx, 940, 740, 70, t, { a: fa, vorm: 'vierkant' }); naamBij(ctx, 'afweercel', '', 1110, 760, fa, 'left', b_TC);
    punten(ctx, [{ t: 'Minimaal: insuline', a: q.on('insuline', 1), v: q.on('insulinemolecuul', 1) }, { t: 'Maximaal: antistoffen, cytokinen of complementeiwitten', a: q.on('antistoffen', 1), v: q.on('maximale', 1) }], 1140, 190, 720, 1, { px: 32 });
    valkuil(ctx, 'Afweercellen noemen: die zijn veel groter, en het gaat om stoffen', 1140, 560, 720, q.on('afweercellen', 1)); },

  s43(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CE); vraagChip(ctx, 15, 2, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Leg uit', 'waarom glucose zo snel mogelijk door de gel moet kunnen diffunderen', 70, 170, 880, q.on('Leg', 1, 0.6));
    const sa = q.on('gellaag', 1); const dik = lerp(140, 46, q.on('diffunderen', 1, 1.2)); const wx = 1340;
    if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; ctx.fillStyle = rgba(b_BLOED, 0.12); ctx.fillRect(wx + dik / 2, 190, 1850 - wx - dik / 2, 620);
      const op = q.on('opmerken', 1, 0.8); if (op > 0.01) { const g = ctx.createRadialGradient(1130, 500, 60, 1130, 500, 220); g.addColorStop(0, rgba(C.goud, 0.35 * op)); g.addColorStop(1, rgba(C.goud, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(1130, 500, 220, 0, 6.283); ctx.fill(); }
      b_stamcel(ctx, 1130, 500, 130, t, 1, 1); naamBij(ctx, 'bètacel', '', 1130, 690, 1, 'center', b_BETA);
      b_gelWand(ctx, wx, 190, 810, dik, [], 0, 1); naamBij(ctx, 'gel', '', wx, 172, 1, 'center', b_GEL); naamBij(ctx, 'bloed', '', 1690, 172, 1, 'center', b_BLOEDL);
      const st = q.on('stijging', 1, 1.2), nm = q.on('normaal', 1, 2); const n = Math.round(6 + 10 * st * (1 - 0.7 * nm));
      for (let i = 0; i < n; i++) { const w = wander(i + 30, t, 30, 0.6); glucoseDeeltje(ctx, wx + dik / 2 + 60 + hash(i * 5) * 380 + w.x, 230 + hash(i * 5 + 1) * 540 + w.y, 11, clamp((n - i), 0, 1)); }
      // glucose diffundeert door de gel; snelheid hangt af van de dikte
      const sp = 0.5 * 46 / dik; for (let k = 0; k < 4; k++) { const u = (t * sp + k / 4) % 1; glucoseDeeltje(ctx, lerp(wx + dik / 2 + 40, 1260, u), 380 + k * 70 + Math.sin(u * 8 + k) * 14, 10, Math.sin(u * Math.PI) * (0.4 + 0.6 * st)); }
      const ia = q.on('insuline', 1, 0.8); for (let k = 0; k < 6; k++) { const u = (t * 0.3 + k / 6) % 1; b_insuline(ctx, lerp(1250, 1800, u), 300 + k * 80 + Math.sin(u * 6) * 16, 11, ia * Math.sin(u * Math.PI)); }
      naamBij(ctx, 'te dik: glucose komt traag aan', '', 1580, 860 - 20, q.on('dik', 1) * (1 - q.on('diffunderen', 1)), 'center', C.koraal);
      ctx.restore(); }
    punten(ctx, [{ t: 'Bètacellen merken een glucosestijging snel op', a: q.on('Twee', 2), v: q.on('opmerken', 2) }, { t: 'Zo geven ze op tijd insuline af', a: q.on('Twee', 2), v: q.on('afgeven', 1) }], 70, 420, 880, 1, { px: 32 }); },

  // ================= Biologische productie van waterstofgas =================
  s65(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW, q.on('vierde', 1, 0.5));
    const ha = ramp(t, 0.3, 0.6) * (1 - q.on('eerste', 1, 0.4)); if (ha > 0.01) { const vb = q.on('verbranding', 1, 1.0), wa = q.on('water', 2, 0.7);
      b_verbranding(ctx, t, 960, 480, { a: ha, vb, wa });
      naamBij(ctx, 'waterstofgas (H₂)', '', 530, 700, q.on('Waterstofgas', 1) * (1 - vb) * ha, 'center', C.text);
      naamBij(ctx, 'zuurstof (O₂)', '', 1390, 700, q.on('verbranding', 1) * (1 - vb) * ha, 'center', C.text);
      naamBij(ctx, 'verbranding', '', 960, 700, vb * (1 - wa) * ha, 'center', C.koraal);
      naamBij(ctx, 'alleen water (H₂O)', '', 960, 700, wa * ha, 'center', C.teal);
      ctx.save(); ctx.globalAlpha *= vb * ha; text(ctx, '2 H₂ + O₂  →  2 H₂O', 960, 290, fTekst(54, 700), C.text, 'center'); ctx.restore(); }
    b_reactoren(ctx, t, { r1: q.on('eerste', 1), bio: q.on('aardappelschillen', 1), schil: q.on('aardappelschillen', 1), gas: q.on('waterstofgas', 2), r2: q.on('tweede', 1), pomp: q.on('zuren', 2), licht: q.on('licht', 1), scheider: q.on('meer', 1), belT: 1 }); },

  s66(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 27, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Noem', 'twee typen polysachariden in aardappelschillen', 70, 170, 820, q.on('Noem', 1, 0.6));
    const pc = q.on('Plantencellen', 1, 0.8); const aa = q.on('aardappelschillen', 1) * (1 - pc);
    b_aardappel(ctx, 1300, 450, 1.4, aa, { schil: 1 }); naamBij(ctx, 'aardappelschil', '', 1560, 640, aa, 'center', '#D2B48C');
    b_plantcel(ctx, 1360, 380, 600, 330, t, { a: pc, wand: q.on('cellulose', 1, 0.8), zetmeel: q.on('zetmeel', 1, 0.8) });
    naamBij(ctx, 'celwand', '', 1680, 600, q.on('cellulose', 1) * pc, 'left', C.groen); naamBij(ctx, 'zetmeelkorrels', '', 1360, 590, q.on('zetmeel', 1) * pc, 'center', '#F2EEDC');
    b_ketenRecht(ctx, 1010, 690, 8, 15, C.groen, q.on('cellulose', 1)); naamBij(ctx, 'cellulose', '', 1080, 770, q.on('cellulose', 1), 'left', C.groen);
    b_ketenVertakt(ctx, 1440, 690, 13, C.teal, q.on('zetmeel', 1), 0); naamBij(ctx, 'zetmeel', '', 1700, 770, q.on('zetmeel', 1), 'left', C.teal);
    punten(ctx, [{ t: 'Cellulose en zetmeel', a: q.on('antwoord', 1), v: q.on('zetmeel', 2) }], 70, 380, 820, 1, { px: 34 });
    tag(ctx, 'ook goed: amylose, amylopectine', 480, 560, C.groen, q.on('Amylose', 1), 'center', 30);
    valkuil(ctx, 'Glycogeen, chitine, lignine', 70, 620, 820, q.on('Glycogeen', 1)); },

  s67(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 28, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Wat is', 'het belang van NAD⁺ voor de bacterie?', 70, 170, 800, q.on('belang', 1, 0.6));
    const ra = q.on('hydrogenase', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; roundRect(ctx, 1050, 150, 720, 90, 14); shape(ctx, rgba(EX.papier, 0.9), EX.papierR, 2); text(ctx, 'H⁺ + NADH  →  H₂ + NAD⁺', 1410, 210, fTekst(40, 700), C.text, 'center'); ctx.restore(); }
    const cx = 1410, cy = 560, rx = 250, ry = 150; const kring = q.on('glycolyse', 1, 0.8); const op = q.on('Raakt', 1, 1) * (1 - q.on('antwoord', 1, 1)), stop = q.on('stopt', 1) * (1 - q.on('antwoord', 1, 1));
    if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring;
      ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]);
      // links: glycolyse (glucose → 2 pyrodruivenzuur), rechts: hydrogenase
      const lx = cx - rx - 150, hx = cx + rx + 110; roundRect(ctx, lx - 90, cy - 40, 180, 80, 20); shape(ctx, rgba(C.oker, 0.16 + 0.2 * q.on('elektronen', 1)), C.oker, 2.5); text(ctx, 'glycolyse', lx, cy + 10, fTekst(30, 700), C.text, 'center');
      b_hydrogenase(ctx, hx, cy, 0.9, 1 - 0.7 * op, t); text(ctx, 'hydrogenase', hx, cy + 108, fTekst(26, 700), C.text2, 'center'); kruis(ctx, hx, cy, 30, op);
      const loop = 1 - 0.95 * op; const gt = t * 0.25 * loop;
      for (let k = 0; k < 2; k++) { const u = (gt + k / 2) % 1; if (u < 0.5) hexagon(ctx, lerp(lx - 150, lx - 105, u / 0.5), cy, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); else { const e = (u - 0.5) / 0.5; b_pyro(ctx, lx - 30 - e * 40, cy + 60 + e * 90, 0.9, 1 - e); b_pyro(ctx, lx + 30 + e * 30, cy + 60 + e * 100, 0.9, 1 - e); } }
      if (stop > 0.01) { hexagon(ctx, lx - 125, cy, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); hexagon(ctx, lx - 160, cy + 6, 16, rgba(C.teal, 0.55), C.teal, 1.5, 0); stempel(ctx, lx, cy - 90, 'STOP', C.koraal, stop); }
      // NAD-tokens rond de kring; bij 'op' schuiven ze allemaal als NADH naar de hydrogenase toe en blijven staan
      for (let k = 0; k < 6; k++) { let an = (t * 0.6 * loop + k / 6 * 6.283) % 6.283; let fy = 1; if (op > 0.01) { an = lerp(an, 4.7 + (k >> 1) * 0.5, op); fy = op * (k % 2 ? 44 : 0); }
        const px = cx + Math.cos(an) * rx, py = cy + Math.sin(an) * ry + fy; const plus = an < Math.PI - 0.05 && op < 0.5; b_nadToken(ctx, px, py, 1, plus);
        if (!plus && an > 6.0 && op < 0.5) b_h2(ctx, hx + 20, cy - 60 - (an - 6.0) * 300, 1.1, 1 - (an - 6.0) / 0.28); }
      naamBij(ctx, 'neemt elektronen op', '', lx - 20, cy - 70, q.on('elektronen', 1) * (1 - q.on('Raakt', 1)), 'center', C.oker);
      ctx.restore(); }
    punten(ctx, [{ t: 'NAD⁺ komt weer vrij, dus de glycolyse (anaerobe dissimilatie) kan doorgaan', a: q.on('antwoord', 1), v: q.on('doorgaan', 1) }], 70, 420, 800, 1, { px: 32 });
    tag(ctx, 'zelfde principe: melkzuurgisting', 470, 700, C.teal, q.on('Hetzelfde', 1), 'center', 30); },

  s68(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 29, 'mc', q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Welke', 'leefwijze hebben de purperbacteriën in reactor 2?', 70, 170, 780, q.on('Welke', 1, 0.6));
    // reactor 2 met purperbacteriën, licht en organische zuren, geen CO2-opname
    const ra = q.on('purperbacteriën', 1); if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; const fx = 380, fy = 640;
      roundRect(ctx, fx - 150, fy - 140, 300, 260, 18); shape(ctx, rgba('#8FA0B5', 0.2), C.text2, 3);
      for (let i = 0; i < 8; i++) { const w = wander(i + 60, t, 14, 0.7); bacterie(ctx, fx - 100 + (i % 4) * 66 + w.x, fy - 70 + Math.floor(i / 4) * 110 + w.y, 0.7, i + Math.sin(t + i) * 0.3, 1, b_PURPER); }
      naamBij(ctx, 'purperbacteriën', '', fx, fy + 170, 1, 'center', b_PURPER);
      const la = q.on('licht', 1); zon(ctx, fx + 300, fy - 120, 34, la, t); for (let k = 0; k < 3; k++) pijl(ctx, fx + 250, fy - 90 + k * 30, fx + 165, fy - 60 + k * 40, C.goud, la, 3, 12);
      const ca = q.on('koolstofdioxide', 1); b_co2(ctx, fx + 290, fy + 60, 1.6, ca); kruis(ctx, fx + 290, fy + 60, 34, ca);
      const za = q.on('zuren', 1); for (let k = 0; k < 3; k++) b_pyro(ctx, fx - 230 + Math.sin(t + k) * 6, fy - 60 + k * 60, 1, za, C.oker); naamBij(ctx, 'organische zuren', '', fx - 230, fy - 120, za, 'center', C.oker);
      ctx.restore(); }
    b_raster(ctx, 900, 190, 950, 600, { a: q.on('Splits', 1), rij: q.on('Foto', 1) * (1 - q.on('Auto', 1)), kol: q.on('Auto', 1), fotoK: q.on('foto', 2, 0.8), heteroK: q.on('hetero', 2, 0.8), goed: q.on('antwoord', 1, 0.6) }); },

  s69(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CW); vraagChip(ctx, 30, 1, q.on('Vraag', 1, 0.4));
    vraagKaart(ctx, 'Verklaar', 'waarom het proces toch koolstofdioxideneutraal genoemd kan worden', 70, 170, 800, q.on('Toch', 1, 0.6));
    const la = q.on('beide', 1), fs = q.on('fossiele', 1, 1.2); const nLucht = 8 + Math.round(8 * q.on('fossiele', 1, 3));
    if (la > 0.01) { ctx.save(); ctx.globalAlpha *= la; roundRect(ctx, 960, 140, 880, 170, 26); shape(ctx, rgba(C.teal, 0.08), rgba(C.teal, 0.5), 2); metaText(ctx, 'lucht', 990, 180, C.text2, 'left', 20);
      for (let i = 0; i < nLucht; i++) { const w = wander(i + 80, t, 20, 0.5); b_co2(ctx, 1020 + hash(i * 3 + 2) * 780 + w.x, 220 + hash(i * 3 + 4) * 70 + w.y, 1, i < 8 ? 1 : clamp(fs * 3 - (i - 8) * 0.3, 0, 1), i); }
      ctx.restore(); }
    const pa = q.on('aardappelschillen', 1), ra = q.on('beide', 1); b_plant(ctx, 1080, 690, 1, pa, t); naamBij(ctx, 'aardappelplant', '', 1080, 840, pa, 'center', C.groen);
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; const fx = 1670, fy = 640; roundRect(ctx, fx - 100, fy - 90, 200, 180, 14); shape(ctx, rgba('#8FA0B5', 0.2), C.text2, 3); for (let i = 0; i < 5; i++) bacterie(ctx, fx - 60 + (i % 3) * 60, fy - 30 + Math.floor(i / 3) * 70, 0.55, i + t * 0.3, 1, C.koraal); ctx.restore(); naamBij(ctx, 'reactoren', '', 1670, 770, ra, 'center'); }
    // korte kringloop: lucht → plant (fotosynthese) → schillen → reactor → lucht
    const fa = q.on('fotosynthese', 1), sa = q.on('aardappelschillen', 1, 1), va = q.on('beide', 1, 1);
    const pad = (pts, a, col, n) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(col, 0.7); ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]); const e = pts[pts.length - 1], d = pts[pts.length - 2]; pijl(ctx, d[0], d[1], e[0], e[1], col, 1, 4, 16);
      for (let k = 0; k < n; k++) { const p = padPunt(pts, (t * 0.2 + k / n) % 1, false); b_co2(ctx, p[0], p[1], 0.8, 1); } ctx.restore(); };
    pad([[1150, 320], [1110, 420], [1090, 480]], fa, C.groen, 2); naamBij(ctx, 'fotosynthese', '', 1160, 420, fa, 'left', C.groen);
    if (sa > 0.01) { for (let k = 0; k < 2; k++) { const u = (t * 0.25 + k / 2) % 1; ctx.save(); ctx.globalAlpha *= sa; ctx.translate(lerp(1160, 1560, u), 700 - Math.sin(u * Math.PI) * 50); ctx.rotate(u * 3); roundRect(ctx, -16, -6, 32, 12, 6); shape(ctx, '#B08A5C', '#D2B48C', 1.5); ctx.restore(); } pijl(ctx, 1500, 700, 1560, 690, C.oker, sa, 3, 14); }
    pad([[1690, 540], [1720, 430], [1700, 320]], va, C.koraal, 2);
    if (fs > 0.01) { b_olie(ctx, 1280, 770, 260, 90, fs); naamBij(ctx, 'miljoenen jaren vast', '', 1410, 760, q.on('miljoenen', 1), 'center', C.text2); pad([[1410, 760], [1400, 520], [1400, 320]], fs, C.koraal, 3); }
    punten(ctx, [{ t: 'De CO₂ die vrijkomt, is kort ervoor opgenomen bij de fotosynthese', a: q.on('kort', 1), v: q.on('fotosynthese', 1) }], 70, 470, 800, 1, { px: 32 }); },

  // ================= Wat neem je mee? =================
  s86(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CN, q.on('leer', 1, 0.5));
    const na = Math.min(1, t / 0.4); const an = persoon(ctx, 'noor', 330, 860, 560, { t, a: na, uit: 'blij', pose: 'vasthouden', hold: (c, x, y) => b_boekje(c, x + 8, y - 20, 1.1, 1) });
    naamBij(ctx, 'Noor', '', 330, (an.top || 300) - 22, na, 'center'); vink_(ctx, 470, 230, 36, q.on('examen', 1, 0.6));
    const tips = [['Punten = aantal schakels in je antwoord', 'punten'], ['Wantrouw nooit en altijd', 'nooit'], ['Lees een stamboom, gel of grafiek eerst rustig', 'stamboom'], ['De tussenstap staat vaak al in de tekst', 'tussenstap']];
    let y = 160; tips.forEach(([s, w]) => { const h = tipKaart(ctx, s, 640, y, 1220, q.on(w, 1)); y += 128; }); },

  s87(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, b_CN);
    const an = persoon(ctx, 'noor', 330, 860, 560, { t, uit: 'lacht', pose: q.on('Succes', 1) > 0.5 ? 'zwaai' : 'staan' }); naamBij(ctx, 'Noor', '', 330, (an.top || 300) - 22, 1 - q.on('Examenatlas', 1), 'center');
    b_atlas(ctx, 1150, 470, 1.15, q.on('Examenatlas', 1, 0.6), t, ramp(t, q.at('onderwerpen', 1), 2)); }
});
// Examenbespreking vwo 2018-II · s44–s64 (Grootvader en kleinkind, vragen 16–26) — helper c
const c_ZWART = ['IV-2', 'IV-4', 'IV-9'];
const c_STAM = { ox: 110, oy: 190, sx: 1.5, sy: 1.36 };
function c_pts(...ids) { let out = []; for (let i = 1; i < ids.length; i++) { const p = c_pad(ids[i - 1], ids[i]); out = out.concat(i > 1 ? p.slice(1) : p); } return out; }
function c_tag(ctx, s, x, y, col, a = 1, px = 26) { tag(ctx, s, x, y, col, a, 'left', px); }

Object.assign(SCENES, {
  s44(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const kl = q.on('kleinkinderen', 1, 0.3), xch = q.on('X-chromosoom', 1, 0.8), her = q.on('herhalingen', 1, 0.8);
    c_henk(ctx, 330, 860, 470, { t, beef: q.on('bevingen', 1, 0.8), uit: q.at('denkvermogen') < t ? 'verbaasd' : 'neutraal', kijk: 1, a: q.on('Grootvaders', 1, 0.3) });
    naamBij(ctx, 'FXTAS', 'grootvader · vanaf 50 jaar', 330, 330, q.on('FXTAS', 1), 'center', C.goud);
    persoon(ctx, 'kind', 1590, 860, 300, { t, a: kl, uit: 'blij', kijk: -1 });
    naamBij(ctx, 'FXS', 'kleinkind · fragiele-X-syndroom', 1590, 500, q.on('FXS', 1), 'center', C.koraal);
    // X-chromosoom met fragiele plek
    c_chromosoom(ctx, 960, 330, 0.62, { bl: 1, br: 1 }, { a: xch, fragiel: q.on('mutatie', 1, 0.8) });
    naamBij(ctx, 'X-chromosoom', null, 960, 160, xch, 'center');
    naamBij(ctx, 'FMR1-gen', null, 1060, 470, q.on('FMR1-gen', 1), 'left', C.goud);
    // CGG-herhalingen groeien aan het begin van het gen
    if (her > 0.01) { ctx.save(); ctx.globalAlpha *= her; const n = Math.round(lerp(3, 9, q.on('CGG', 1, 2.5))); const bx = 960 - 4.5 * 78;
      roundRect(ctx, bx - 20, 620, 9 * 78 + 40, 70, 20); shape(ctx, rgba(EX.papier, 0.85), EX.papierR, 2);
      for (let i = 0; i < n; i++) { roundRect(ctx, bx + i * 78 + 4, 634, 70, 42, 10); shape(ctx, rgba(C.goud, 0.25), C.goud, 2); text(ctx, 'CGG', bx + i * 78 + 39, 664, fMeta(22), C.text, 'center'); }
      naamBij(ctx, 'begin van het FMR1-gen', null, 960, 740, 1, 'center', C.text2); ctx.restore(); }
  },

  s45(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 16, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'waardoor +2 nucleotiden vaak erger is dan +3', 70, 170, 1000, q.on('Vraag', 1, 0.4));
    const a2 = q.on('twee', 2, 0.5), a3 = q.on('drie', 1, 0.5);
    text(ctx, 'CGG CGG CGG', 1180, 260, fMeta(34), C.text, 'left');
    regel(ctx, '+ CG', 1180, 360, a2, C.koraal, 44, 'left', 800); if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; text(ctx, 'twee nucleotiden', 1330, 360, fTekst(30, 500), C.text2, 'left'); ctx.restore(); }
    regel(ctx, '+ CGG', 1180, 460, a3, C.goud, 44, 'left', 800); if (a3 > 0.01) { ctx.save(); ctx.globalAlpha *= a3; text(ctx, 'drie nucleotiden', 1360, 460, fTekst(30, 500), C.text2, 'left'); ctx.restore(); }
    vraagteken(ctx, 1600, 690, q.on('waardoor', 1, 0.5), 140);
  },

  s46(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 16, 2, 1);
    const ant = q.on('antwoord', 1, 0.8), x0 = 420;
    const r1 = 1 - ant, r2 = 1 - ant;
    // rij 1: normaal
    c_leesrij(ctx, x0, 230, 'AUGGCAUUCGGACUCAAG', ['g', 'g', 'g', 'g', 'g', 'g'], { a: q.on('ribosoom', 1, 0.5) * r1, lees: q.on('leest', 1, 5), rib: 1, t, label: 'normaal', seed: 1 });
    // rij 2: + 3
    c_leesrij(ctx, x0, 430, 'AUGGCAcggUUCGGACUCAAG', ['g', 'g', 'x', 'g', 'g', 'g', 'g'], { a: q.on('Komen', 1, 0.5) * r2, ins: q.on('drie', 2, 1), lees: q.on('codon', 2, 3), rib: 1, t, label: '+ 3', labelCol: C.goud, seed: 2 });
    if (r2 > 0.01) { naamBij(ctx, 'één aminozuur erbij', null, x0 + 7 * 34 + 10, 590, q.on('aminozuur', 1) * r2 * (1 - q.on('Komen', 2, 0.4)), 'center', C.goud); naamBij(ctx, 'de rest blijft gelijk', null, x0 + 21 * 34 + 40, 530, q.on('rest', 1) * r2 * (1 - q.on('Komen', 2, 0.4)), 'left', C.teal); }
    // rij 3: + 2 (schuift omhoog bij het antwoord)
    const y3 = lerp(630, 250, ant);
    c_leesrij(ctx, x0, y3, 'AUGGCAcgUUCGGACUCAAG', ['g', 'g', 'a', 'a', 'a', 'a'], { a: q.on('Komen', 2, 0.5), ins: q.on('twee', 1, 1), lees: q.on('schuift', 1, 3), rib: 1, rood: q.on('anders', 1, 0.6), t, label: '+ 2', labelCol: C.koraal, seed: 3 });
    naamBij(ctx, 'leesraam verschoven', null, x0 + 20 * 34 + 50, y3 + 96, q.on('anders', 1) * (1 - ant), 'left', C.koraal);
    punten(ctx, [{ t: 'Het leesraam verschuift: er ontstaan andere codons', v: q.on('verschuift', 1, 0.4) },
      { t: 'Andere aminozuren, dus een ander (mogelijk niet werkend) eiwit', a: q.on('Daardoor', 1, 0.5), v: q.on('eiwit', 1, 0.4) }], 260, 470, 1400, ant);
  },

  s47(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('Hoe', 1, 0.5); examenKader(ctx, 150, 140, 1620, 735, 'AFBEELDING 1', ka); if (ka < 0.01) return;
    ctx.save(); ctx.globalAlpha *= ka; const g = c_genBalk(ctx, 400, 1560, 230, 1);
    metaText(ctx, 'CGG', 200, 362, C.text2, 'left', 22); metaText(ctx, 'mRNA', 200, 560, C.text2, 'left', 22); metaText(ctx, 'FMRP', 200, 720, C.text2, 'left', 22); metaText(ctx, 'fenotype', 200, 842, C.text2, 'left', 22);
    const kol = [[560, q.on('gezonde', 1, 0.6), 0.22, 'normaal', '< 55'], [990, q.on('premutatie', 1, 0.6), 0.5, 'premutatie', '55–200'], [1420, q.on('Boven', 1, 0.6), 0.92, 'volledige mutatie', '> 200']];
    const met = q.on('gemethyleerd', 1, 0.6), mr = q.on('mRNA', 1, 1.2), klont = q.on('samenklontert', 1, 1.2);
    kol.forEach(([x, a, f, n, r], i) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.e1, 256); ctx.lineTo(lerp(g.e1, x, ease(a)), lerp(256, 322, ease(a))); ctx.stroke();
      c_cggStaaf(ctx, x, 350, 230, f, 1, i === 2 ? met : 0, t);
      text(ctx, n, x, 412, fTekst(28, 700), [C.teal, C.goud, C.koraal][i], 'center'); text(ctx, r, x, 446, fTekst(26, 500), C.text2, 'center');
      c_pijlOmlaag(ctx, x, 482, 1);
      if (i === 0) { for (let k = 0; k < 4; k++) c_sliert(ctx, x - 30 + (k % 2) * 50, 535 + k * 16, 70, 0.1 * (k - 1.5), 1, t, k); }
      if (i === 1) { const n2 = Math.round(lerp(4, 9, ease(mr))); for (let k = 0; k < n2; k++) { const kx = x - 50 + (k % 3) * 46, ky = 520 + Math.floor(k / 3) * 22; const cx2 = lerp(kx, x, ease(klont) * 0.5), cy2 = lerp(ky, 545, ease(klont) * 0.5); c_sliert(ctx, cx2, cy2, 64, 0.15 * (k % 3 - 1), 1, t, k + 3); }
        if (klont > 0.01) { ctx.save(); ctx.globalAlpha *= klont; for (let k = 0; k < 5; k++) circ(ctx, x - 40 + k * 20, 545 + (k % 2 ? 14 : -14), 7, '#8A8E9A', '#B8BCC6', 1.2); ctx.restore(); naamBij(ctx, 'RNA-eiwitklont', null, x + 90, 600, klont, 'left', C.goud); } }
      if (i === 2) { ctx.save(); ctx.globalAlpha *= met; kruis(ctx, x, 550, 30, 1, C.koraal); ctx.restore(); }
      c_pijlOmlaag(ctx, x, 640, i === 2 ? 0 : 1);
      if (i === 0) for (let k = 0; k < 7; k++) c_kluwen(ctx, x - 54 + (k % 4) * 36 + (Math.floor(k / 4) ? 18 : 0), 700 + Math.floor(k / 4) * 36, 9, C.teal, 1, 1, k, 6);
      if (i === 1) for (let k = 0; k < 3; k++) c_kluwen(ctx, x - 36 + k * 36, 715, 9, C.teal, 1, 1, k + 2, 6);
      text(ctx, ['normaal', 'soms FXTAS', '100% FXS'][i], x, 842, fTekst(28, 600), C.text, 'center');
      ctx.restore(); });
    naamBij(ctx, 'methylering', null, 1548, 362, met, 'left', C.koraal);
    ctx.restore();
  },

  s48(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 17, 1, 1);
    vraagKaart(ctx, 'Waardoor', 'wordt bij een volledige mutatie geen FMRP gevormd?', 70, 150, 1780, q.on('Waardoor', 1, 0.4));
    const d = q.on('Door', 2, 0.5); const m = q.on('methylering', 1, 1.6);
    c_promotorDNA(ctx, 160, 1180, 480, { a: d, methyl: m, pol: q.on('vindt', 1, 1.2), bots: q.on('transcriptie', 1, 1.0), t });
    naamBij(ctx, 'methylgroepen', null, 590, 390, m, 'left', C.koraal);
    // rechts: geen mRNA, geen translatie, geen FMRP
    const zm = q.on('Zonder', 1, 0.5); if (zm > 0.01) { ctx.save(); ctx.globalAlpha *= zm; c_mrna(ctx, 1320, 1520, 440, 1, t, 4, 7, rgba(C.goud, 0.5), 3); kruis(ctx, 1420, 440, 34, q.on('mRNA', 1, 0.4)); naamBij(ctx, 'geen mRNA', null, 1420, 520, 1, 'center');
      c_ribosoom(ctx, 1700, 440, 0.9, 0.7); kruis(ctx, 1700, 440, 34, q.on('translatie', 1, 0.4)); naamBij(ctx, 'geen FMRP', null, 1700, 520, q.on('translatie', 1), 'center', C.koraal); ctx.restore(); }
    punten(ctx, [{ t: 'Door methylering (van de promotor) geen transcriptie, dus zonder mRNA geen translatie', v: q.on('translatie', 1, 0.4) }], 160, 630, 1600, q.on('Door', 2, 0.6));
  },

  s49(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 18, 1, 1);
    vraagKaart(ctx, 'Verklaar', 'uitval van zenuwcellen in de kleine hersenen geeft symptomen', 70, 150, 940, q.on('Verklaar', 1, 0.5), { px: 36 });
    const bx = 1230, by = 400, bs = 1.0; brein(ctx, bx, by, bs, q.on('Vraag', 1, 0.6));
    const kh = q.on('kleine', 1, 0.6), cx = bx + 210 * bs, cy = by + 120 * bs;
    if (kh > 0.01) { ctx.save(); ctx.globalAlpha *= kh * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); ctx.ellipse(cx, cy, 84 * bs, 49 * bs, 0.2, 0, 6.283); shape(ctx, rgba(C.goud, 0.35), C.goud, 3); ctx.restore(); }
    naamBij(ctx, 'kleine hersenen', null, cx - 30, cy + 100, kh, 'center', C.goud);
    // zenuwcellen in de kleine hersenen: klonten en uitval
    const ui = q.on('Vallen', 1, 2.0), kl = q.on('RNA-eiwitklonten', 1, 1);
    for (let k = 0; k < 7; k++) { const nx = cx - 52 + (k % 4) * 34 + (k > 3 ? 16 : 0), ny = cy - 14 + (k > 3 ? 26 : 0); const uit = clamp(ui * 1.8 - (k % 3) * 0.3, 0, 1) * (k % 2 ? 1 : 0.0); circ(ctx, nx, ny, 6, uit > 0.5 ? '#4A4A58' : lighten(C.goud, 0.3), null); if (kl > 0.01 && k % 2) { ctx.save(); ctx.globalAlpha *= kl * (1 - uit); circ(ctx, nx + 5, ny - 5, 4, '#8A8E9A'); ctx.restore(); } }
    naamBij(ctx, 'RNA-eiwitklonten', 'giftig', 1250, 690, kl * (1 - q.on('coördineren', 1, 0.4)), 'center', C.text2);
    naamBij(ctx, 'coördineren bewegingen', null, cx - 30, cy + 140, q.on('coördineren', 1), 'center');
    const hb = q.on('bevingen', 1, 0.4); c_henk(ctx, 1680, 860, 380, { t, beef: hb, a: hb, uit: 'verbaasd', kijk: -1 });
    punten(ctx, [{ t: 'Kleine hersenen coördineren bewegingen: uitval geeft bevingen en motorische problemen', v: q.on('problemen', 1, 0.4) }], 70, 450, 940, q.on('coördineren', 1, 0.6), { px: 32 });
    tipKaart(ctx, 'Koppel het hersendeel aan een symptoom uit de tekst', 70, 690, 940, q.on('Koppel', 1, 0.5), 30);
  },

  s50(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 19, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'waardoor de ernst van FXTAS bij vrouwen verschilt', 70, 150, 900, q.on('Leg', 1, 0.5) + q.on('Vraag', 1, 0.4));
    const ca = q.on('Vrouwen', 1, 0.6), inact = q.on('uitgezet', 1, 1.4), will = q.on('willekeurig', 1, 0.6);
    persoon(ctx, 'lotte', 1110, 860, 360, { t, a: q.on('Vrouwen', 1, 0.3), kijk: 1 });
    [[1450, 1], [1760, 0]].forEach(([x, mutUit], i) => { const a = ca * (i ? q.on('elke', 1, 0.6) : 1); c_cel(ctx, x, 430, 135, a, { kern: true });
      if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; c_xje(ctx, x - 30, 430, 1.1, C.koraal, 1, mutUit ? inact : 0); c_xje(ctx, x + 32, 430, 1.1, C.teal, 1, mutUit ? 0 : inact); ctx.restore();
      naamBij(ctx, mutUit ? 'gemuteerde X uit' : 'gezonde X uit', null, x, 620, inact, 'center', mutUit ? C.teal : C.koraal); });
    naamBij(ctx, 'gemuteerd X', null, 1420, 270, q.on('gemuteerd', 1) * (1 - inact), 'center', C.koraal);
    naamBij(ctx, 'willekeurig', null, 1605, 220, will, 'center', C.goud);
  },

  s51(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 19, 2, 1);
    const lo = q.on('Let', 1, 0.5);
    punten(ctx, [{ t: 'Toeval: in elke zenuwcel wordt het gemuteerde of het gezonde X uitgezet', a: q.on('Eén', 1, 0.5), v: q.on('uitgezet', 1, 0.4) },
      { t: 'Dus per vrouw verschilt in hoeveel zenuwcellen het gemuteerde X actief is', a: q.on('Twee', 1, 0.5), v: q.on('actief', 1, 0.4) }], 70, 170, 900, 1, { px: 32 });
    valkuil(ctx, 'Alleen: het aantal herhalingen verschilt', 70, 600, 900, lo, 30);
    const k = q.on('toeval', 1, 2.5), wa = q.on('Eén', 1, 0.6);
    metaText(ctx, 'vrouw 1', 1170, 230, C.text2, 'center', 24); metaText(ctx, 'vrouw 2', 1600, 230, C.text2, 'center', 24);
    c_weefsel(ctx, 1030, 290, 5, 5, 0.24, k, wa, { r: 26, seed: 3, puls: q.on('actief', 1), t });
    c_weefsel(ctx, 1460, 290, 5, 5, 0.72, k, wa * q.on('verschilt', 1, 0.6), { r: 26, seed: 7, puls: q.on('actief', 1), t });
    const me = q.on('ernstiger', 1, 1.2);
    c_meter(ctx, 1050, 590, 260, 0.25 * ease(me), C.goud, 'mild', me); c_meter(ctx, 1480, 590, 260, 0.75 * ease(me), C.koraal, 'ernstig', me * q.on('verschilt', 1, 0.6));
    naamBij(ctx, 'gemuteerde X actief', null, 1460, 690, wa * q.on('actief', 1), 'center', C.koraal);
    naamBij(ctx, 'gezonde X actief', null, 1460, 740, wa * q.on('actief', 1), 'center', C.teal);
    tag(ctx, 'X-inactivatie', 1460, 820, C.goud, q.on('X-inactivatie', 1), 'center', 30);
  },

  s52(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('stamboom', 1, 0.5); examenKader(ctx, 40, 135, 1060, 745, 'AFBEELDING 2', ka);
    const st = q.on('stip', 1, 0.6), zw = q.on('zwart', 1, 0.6), on = q.on('Onder', 1, 0.6) * (1 - st);
    const nr = {}; if (on > 0.01) c_PERS.forEach(([id]) => nr[id] = on);
    const vb = q.on('vijfenvijftig', 1, 0.6) * (1 - q.on('persoon', 1, 0.5)); ['I-2', 'II-1', 'II-4'].forEach((id) => nr[id] = Math.max(nr[id] || 0, vb));
    const ii = q.on('II-1', 1, 0.5);
    c_stamboom(ctx, Object.assign({ a: ka, bouw: q.on('stamboom', 1, 3) * 5, t, pulse: { p: st * (1 - zw), v: zw * (1 - vb) }, numRing: nr, hl: { 'II-1': ii }, genHl: { II: ii } }, c_STAM));
    c_legenda(ctx, 1240, 300, st);
    if (vb > 0.01) { ctx.save(); ctx.globalAlpha *= vb; const M = c_stamMap(c_STAM); c_stamboom(ctx, Object.assign({ a: 1, paden: [{ pts: c_pts('I-2', 'II-1'), u: q.on('verandert', 1, 1) }, { pts: c_pad('I-2', 'II-4'), u: q.on('verandert', 1, 1) }], numRing: { 'I-2': 1, 'II-1': 1, 'II-4': 1 } }, c_STAM)); ctx.restore();
      ketting(ctx, [{ t: '70' }, { t: '120 of 85' }], 1240, 560, 560, vb, { px: 30 }); naamBij(ctx, 'het aantal verandert', null, 1520, 650, vb, 'center', C.goud); }
    if (ii > 0.01) { ctx.save(); ctx.globalAlpha *= ii; text(ctx, 'II-1', 1240, 610, fTitel(70), C.goud, 'left'); text(ctx, 'generatie II · persoon 1', 1240, 670, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
  },

  s53(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 20, 'mc', 1);
    const z = q.on('Zoek', 1, 0.5), g4 = q.on('vier', 1, 0.5), mo = q.on('moeder', 1, 0.6), g5 = q.on('vijf', 1, 0.6), va = q.on('vaders', 1, 0.6), ii1 = q.on('II-1', 1, 0.5), ii4 = q.on('II-4', 1, 0.5), eind = q.on('antwoord', 1, 0.6);
    const hl = {}, ring = {}, ringCol = {}, numRing = {}, numCol = {}, dim = {}, paden = [];
    const h4 = g4 * (1 - va); hl['IV-2'] = q.on('IV-2', 1, 0.4) * (1 - va); hl['IV-4'] = q.on('IV-4', 1, 0.4) * (1 - va); hl['IV-9'] = q.on('IV-9', 1, 0.4) * (1 - va);
    const hlCol = {}; c_ZWART.forEach((id) => hlCol[id] = C.koraal);
    const mm = mo * (1 - va); hl['III-3'] = mm; hl['III-7'] = mm; numRing['III-3'] = mm; numRing['III-7'] = mm;
    paden.push({ pts: c_pad('III-3', 'IV-2'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud }); paden.push({ pts: c_pad('III-7', 'IV-4'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud }); paden.push({ pts: c_pad('III-7', 'IV-9'), u: q.on('moeder', 1, 1.2), a: 1 - va, col: C.goud });
    // generatie V: telt niet mee
    ['V-2', 'V-6'].forEach((id) => { ring[id] = g5; ringCol[id] = C.koraal; }); hl['IV-2'] = Math.max(hl['IV-2'], g5 * (1 - va) * 0.8); hl['IV-9'] = Math.max(hl['IV-9'], g5 * (1 - va) * 0.8);
    // vaders
    hl['II-1'] = ii1 * (1 - ii4); numRing['II-1'] = ii1; numRing['III-1'] = q.on('132', 1, 0.4); numRing['III-3'] = Math.max(numRing['III-3'], q.on('126', 1, 0.4)); ['II-1', 'III-1', 'III-3'].forEach((id) => numCol[id] = C.teal);
    paden.push({ pts: c_pad('II-1', 'III-1'), u: q.on('dochters', 1, 1), col: C.teal }); paden.push({ pts: c_pad('II-1', 'III-3'), u: q.on('dochters', 1, 1), col: C.teal });
    hl['II-4'] = ii4; numRing['II-4'] = ii4; numRing['III-7'] = Math.max(numRing['III-7'], q.on('85', 2, 0.4)); numCol['II-4'] = C.teal; numCol['III-7'] = C.teal; paden.push({ pts: c_pad('II-4', 'III-7'), u: q.on('dochter', 2, 1), col: C.teal });
    hlCol['II-1'] = C.teal; hlCol['II-4'] = C.teal; c_ZWART.forEach((id) => hl[id] = Math.max(hl[id], eind));
    c_stamboom(ctx, Object.assign({ t, pulse: { v: z * (1 - g4) }, hl, hlCol, ring, ringCol, numRing, numCol, paden, genHl: { IV: h4 * (1 - g5), V: g5 * (1 - va) } }, c_STAM));
    // 'telt niet mee' bij V-2 en V-6
    const M = c_stamMap(c_STAM); const tn = q.on('tellen', 1, 0.5) * (1 - eind * 0);
    [['V-2', 1], ['V-6', 1]].forEach(([id]) => { const p = c_P[id]; c_tag(ctx, 'telt niet mee', M.X(p.x) + 34, M.Y(p.y) + 12, C.koraal, tn, 24); });
    // opties
    const weg = q.on('blijft', 1, 0.8);
    opties(ctx, ['alleen tijdens de vorming van eicellen', 'alleen tijdens de vorming van zaadcellen', 'tijdens de vorming van eicellen én van zaadcellen'], 1150, 170, 720, { weg: [0, weg, weg], goed: 0, g: q.on('antwoord', 1, 0.5) }, q.on('Vraag', 1, 0.4), { px: 30 });
    // samenvatting rechts
    const sa = mo * (1 - g5); if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; text(ctx, 'moeder: premutatie', 1160, 640, fTekst(34, 700), C.goud, 'left'); text(ctx, '→  kind: volledige mutatie', 1160, 690, fTekst(34, 700), C.koraal, 'left'); ctx.restore(); }
    const vb = va * (1 - eind); if (vb > 0.01) { ctx.save(); ctx.globalAlpha *= vb; text(ctx, 'vader: premutatie', 1160, 640, fTekst(34, 700), C.teal, 'left'); text(ctx, '→  dochter: premutatie', 1160, 690, fTekst(34, 700), C.teal, 'left'); ctx.restore(); }
  },

  s54(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 21, 3, 1);
    const gv = q.on('grootvader', 1, 0.5), kk = q.on('kleinkind', 1, 0.5);
    const hl = { 'II-1': gv, 'II-4': gv, 'IV-2': kk, 'IV-4': kk, 'IV-9': kk }, hlCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal };
    c_stamboom(ctx, Object.assign({ t, hl, hlCol }, c_STAM));
    vraagKaart(ctx, 'Beschrijf', 'stap voor stap: premutatie van een grootvader → volledige mutatie bij een kleinkind', 1150, 170, 720, q.on('Beschrijf', 1, 0.5) + q.on('Vraag', 1, 0.4), { px: 34 });
  },

  s55(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 21, 3, 1);
    const via = q.on('Via', 2, 0.6);
    const s1 = q.on('II-1', 1, 0.5), s2 = q.on('III-3', 1, 0.5), s3 = q.on('IV-2', 1, 0.5);
    const hl = { 'II-1': s1, 'III-3': s2, 'IV-2': s3, 'II-4': via, 'III-7': via, 'IV-4': via, 'IV-9': via };
    const hlCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal, 'II-4': C.teal, 'III-7': C.teal };
    const numRing = { 'II-1': q.on('120', 1, 0.4), 'III-3': q.on('126', 1, 0.4), 'IV-2': q.on('252', 1, 0.4), 'II-4': via, 'III-7': via, 'IV-4': via, 'IV-9': via };
    const numCol = { 'IV-2': C.koraal, 'IV-4': C.koraal, 'IV-9': C.koraal };
    const paden = [{ pts: c_pad('II-1', 'III-3'), u: q.on('geeft', 1, 1.6) }, { pts: c_pad('III-3', 'IV-2'), u: q.on('eicel', 1, 1.6), col: C.koraal },
      { pts: c_pad('II-4', 'III-7'), u: q.on('II-4', 1, 1.2), col: C.teal }, { pts: c_pad('III-7', 'IV-4'), u: q.on('IV-4', 1, 1.2), col: C.teal }, { pts: c_pad('III-7', 'IV-9'), u: q.on('IV-9', 1, 1.2), col: C.teal }];
    c_stamboom(ctx, Object.assign({ t, hl, hlCol, numRing, numCol, paden }, c_STAM));
    const k1 = 1 - via; ketting(ctx, [{ t: 'II-1 · 120', a: s1 }, { t: 'III-3 · 126', a: s2 }, { t: 'IV-2 · 252', a: s3, col: C.koraal }], 1140, 240, 740, q.on('Kies', 1, 0.4) * k1, { px: 28 });
    ketting(ctx, [{ t: 'II-4 · 85', col: C.teal }, { t: 'III-7 · 85', col: C.teal }, { t: 'IV-4 of IV-9', col: C.koraal }], 1140, 240, 740, q.on('kleinkinderen', 1, 0.6), { px: 26 });
    tag(ctx, 'ook goed', 1510, 345, C.groen, q.on('goed', 1, 0.5), 'center', 30);
    punten(ctx, [{ t: 'Grootvader geeft de premutatie door aan zijn dochter', a: q.on('Drie', 1, 0.5), v: q.on('dochter', 2, 0.4) },
      { t: 'Bij het doorgeven aan haar kind neemt het aantal toe', a: q.on('Drie', 1, 0.5), v: q.on('toe', 2, 0.4) },
      { t: 'Het kleinkind komt boven de 200 (252)', a: q.on('Drie', 1, 0.5), v: q.on('tweehonderd', 1, 0.4) }], 1140, 400, 740, 1, { px: 29, gap: 16 });
  },

  s56(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const ka = q.on('X-chromosoom', 1, 0.6); examenKader(ctx, 120, 140, 1680, 735, 'AFBEELDING 3', ka);
    const lng = q.on('lange', 1, 0.6), hit = q.on('Xq27.3', 1, 0.6);
    c_ideogram(ctx, 220, 1700, 430, 46, { a: ka, reveal: q.on('X-chromosoom', 1, 1.6), loci: q.on('FMR1-gen', 1, 0.8), hit, q: lng });
    naamBij(ctx, 'p · korte arm', null, 600, 500, lng * 0.8, 'center', C.text2); naamBij(ctx, 'q · lange arm', null, 1240, 500, lng, 'center', C.goud);
    naamBij(ctx, 'FMR1', null, 220 + (889 - 190) * 1480 / 756, 210, hit, 'center', C.goud);
    // gewoon chromosoom onder de microscoop, liggend zoals het ideogram (p links, q rechts)
    // rechtop zoals nr. 3 in s57: knik met bolletje aan het eind van q
    const ch = q.on('volledige', 1, 0.6), fr = ramp(t, q.at('microscoop', 1), 0.5);
    c_chromosoom(ctx, 960, 640, 0.8, { bl: 1, br: 1 }, { a: ch, fragiel: fr });
    if (ch > 0.01) { ctx.save(); ctx.globalAlpha *= ch; text(ctx, 'p', 900, 600, fTekst(30, 700), C.text2, 'center'); text(ctx, 'q', 892, 730, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }
    naamBij(ctx, 'insnoering', null, 1030, 800, fr, 'left', C.goud);
  },

  s57(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 22, 2, 1);
    vraagKaart(ctx, 'Noteer', 'welke X-chromosomen je ziet in een karyogram van IV-9', 70, 150, 1780, 1);
    const xs = [460, 710, 960, 1210, 1460], KN = [{}, { bl: 1 }, { bl: 1, br: 1 }, { tl: 1 }, { tl: 1, tr: 1 }];
    xs.forEach((x, i) => { const a = q.on('vijf', 1, 0.4 + i * 0.12); c_chromosoom(ctx, x, 560, 0.7, KN[i], { a }); regel(ctx, String(i + 1), x, 820, a, C.text, 40, 'center', 700); });
    tag(ctx, 'IV-9 · 32 / 257', 1660, 430, C.koraal, q.on('IV-9', 1, 0.5), 'center', 30);
  },

  s58(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 22, 2, 1);
    const xs = [250, 480, 710, 940, 1170], KN = [{}, { bl: 1 }, { bl: 1, br: 1 }, { tl: 1 }, { tl: 1, tr: 1 }];
    const g1 = q.on('nummer', 1, 0.5), lang = q.on('lange', 1, 0.6) * (1 - q.on('Bij', 1, 0.5)), af = q.on('vallen', 1, 0.6), bl = q.on('Blijven', 1, 0.5), zus = q.on('zusterchromatiden', 1, 0.6), al = q.on('alleen', 1, 0.6), ant = q.on('antwoord', 1, 0.6);
    xs.forEach((x, i) => { const weg = i >= 3 ? af : i === 1 ? al : 0; const hlb = i === 0 ? 0 : (i === 1 || i === 2) ? zus : 0;
      c_chromosoom(ctx, x, 470, 0.7, KN[i], { a: 1 - 0.55 * weg, hlL: i === 0 ? g1 : (i === 1 || i === 2) ? zus : 0, hlR: i === 0 ? g1 : i === 2 ? zus : 0, hlCol: i === 0 ? C.groen : C.goud });
      if (lang > 0.01) { ctx.save(); ctx.globalAlpha *= lang; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); roundRect(ctx, x - 70, 470 + 40, 140, 140, 20); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
      if (weg > 0.01) kruis(ctx, x, 470, 50 * ease(weg), weg);
      const goed = (i === 0 || i === 2) ? ant : 0; if (goed > 0.01) { ctx.save(); ctx.globalAlpha *= goed; ctx.beginPath(); ctx.ellipse(x, 480, 105, 200, 0, 0, 6.283); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
      regel(ctx, String(i + 1), x, 730, 1, (i === 0 && g1 > 0.5) || (i === 2 && ant > 0.5) ? C.groen : C.text, 40, 'center', 700); });
    naamBij(ctx, 'gewoon X', null, 250, 210, g1, 'center', C.groen);
    naamBij(ctx, 'lange arm', null, 710, 790, lang, 'center', C.goud);
    naamBij(ctx, 'korte arm', null, 1055, 210, af * (1 - bl), 'center', C.koraal);
    naamBij(ctx, 'twee zusterchromatiden', null, 595, 210, zus * (1 - ant), 'center', C.goud);
    tag(ctx, 'IV-9 · 32 en 257', 1600, 210, C.koraal, q.on('IV-9', 1, 0.5), 'center', 30);
    const vr = q.on('vrouw', 1, 0.5); if (vr > 0.01) { ctx.save(); ctx.globalAlpha *= vr; text(ctx, '32 → gewoon X', 1430, 300, fTekst(32, 600), C.teal, 'left'); text(ctx, '257 → gemuteerd X', 1430, 350, fTekst(32, 600), C.koraal, 'left'); ctx.restore(); }
    punten(ctx, [{ t: 'chromosoom 1', v: q.on('1', 2, 0.4), a: ant }, { t: 'chromosoom 3', v: q.on('3', 4, 0.4), a: ant }], 1430, 440, 420, 1, { px: 32 });
  },

  s59(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 23, 'mc', 1);
    regel(ctx, 'Waarop berust de PCR?', 70, 210, q.on('Waarop', 1, 0.5), C.text, 42, 'left', 700);
    opties(ctx, ['bepalen van de genexpressie', 'hybridiseren van RNA', 'op grootte scheiden van DNA-fragmenten', 'repliceren van DNA-fragmenten'], 70, 260, 860, { weg: [0, 0, q.on('Scheiden', 1, 0.8), 0], goed: 3, g: q.on('antwoord', 1, 0.5) }, q.on('Waarop', 1, 0.5), { px: 32 });
    // PCR: elke cyclus verdubbelt het stuk DNA
    const t0 = q.at('repliceren'), cyc = clamp((t - t0) / 1.6, 0, 4.2); const nC = Math.floor(cyc), f = cyc - nC; const n = Math.pow(2, nC); const pa = q.on('repliceren', 1, 0.5);
    if (pa > 0.01) { ctx.save(); ctx.globalAlpha *= pa; roundRect(ctx, 1010, 200, 840, 620, 22); shape(ctx, rgba(EX.papier, 0.6), EX.papierR, 2); metaText(ctx, 'PCR', 1040, 248, C.text2, 'left', 22);
      const cols = 4, w = 150; for (let i = 0; i < Math.min(16, n * 2); i++) { const isNew = i >= n; const k = isNew ? i - n : i; const src = k; const xx = 1110 + (i % cols) * 200, yy = 320 + Math.floor(i / cols) * 120;
        const sx = 1110 + (src % cols) * 200, sy = 320 + Math.floor(src / cols) * 120; if (isNew) { if (nC >= 4) continue; const m = ease(clamp(f * 1.4 - 0.2, 0, 1)); ctx.save(); ctx.globalAlpha *= m; c_dnaStukje(ctx, lerp(sx, xx, m), lerp(sy, yy, m), w, 1, 1, 0); ctx.restore(); }
        else c_dnaStukje(ctx, xx, yy, w, 1, 1, nC < 4 ? 6 * Math.sin(f * Math.PI) : 0); }
      text(ctx, (nC >= 4 ? 16 : n) + (n === 1 && nC < 4 ? ' stuk DNA' : ' kopieën'), 1440, 790, fTekst(34, 700), C.goud, 'center'); ctx.restore(); }
    naamBij(ctx, 'daarna: gelelektroforese', null, 500, 820, q.on('gelelektroforese', 1), 'center', C.text2);
  },

  s60(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 24, 'mc', 1);
    const ga = q.on('gel', 1, 0.6), wie = q.on('persoon', 1, 0.5);
    const hl = { 6: q.on('6', 1, 0.3), 7: q.on('7', 1, 0.3), 9: q.on('9', 1, 0.3), 11: q.on('11', 1, 0.3) };
    c_gel(ctx, { a: ga, x0: 110, x1: 990, y0: 230, y1: 820, banden: q.on('twaalf', 1, 1.2), zones: q.on('herhalingen', 1, 0.8), hl });
    const pa = q.on('groter', 1, 0.6); if (pa > 0.01) { pijl(ctx, 70, 800, 70, 260, C.goud, pa * ease(q.on('hoger', 1, 0.8) + 0.4), 4, 18); ctx.save(); ctx.globalAlpha *= pa; ctx.translate(52, 540); ctx.rotate(-Math.PI / 2); text(ctx, 'langer fragment', 0, 0, fTekst(26, 700), C.goud, 'center'); ctx.restore(); }
    opties(ctx, ['persoon 6', 'persoon 7', 'persoon 9', 'persoon 11'], 1460, 240, 400, {}, wie, { px: 32 });
    regel(ctx, 'man met FXTAS-risico?', 1460, 210, wie, C.text, 32, 'left', 700);
  },

  s61(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 24, 'mc', 1);
    const vr = q.on('vrouwen', 1, 0.6), p7 = q.on('Persoon', 1, 0.5), p11 = q.on('Persoon', 2, 0.5), pz = q.on('premutatie', 1, 0.6), nb = q.on('normale', 1, 0.6);
    const hl = { 6: q.on('6', 1, 0.4), 9: q.on('9', 1, 0.4), 7: p7, 11: p11 }, hlCol = { 6: C.koraal, 9: C.koraal, 7: C.koraal, 11: C.groen };
    c_gel(ctx, { x0: 110, x1: 990, y0: 230, y1: 820, hl, hlCol, dim: { 6: vr * 0.6, 9: vr * 0.6, 7: nb * 0.6 }, zoneHl: { p: pz, n: nb * (1 - p11) } });
    opties(ctx, ['persoon 6', 'persoon 7', 'persoon 9', 'persoon 11'], 1460, 240, 400, { weg: [vr, nb, vr, 0], goed: 3, g: q.on('antwoord', 1, 0.5) }, 1, { px: 32 });
    const s1 = q.on('Eén', 1, 0.5) * (1 - q.on('Twee', 3, 0.5)), s2 = q.on('Twee', 3, 0.5);
    regel(ctx, '1  man: één X → één bandje', 1460, 690, s1, C.text, 30, 'left', 700); regel(ctx, '2  premutatie', 1460, 690, s2, C.text, 30, 'left', 700);
  },

  s62(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1);
    const fx = q.on('FXS', 1, 1.0); const nx = lerp(960, 520, fx), ns = lerp(1.0, 0.78, fx), ny = lerp(480, 470, fx);
    const st = { t, glu: q.on('Glutamaat', 1, 1.2), bind: q.on('activeert', 1, 0.8), synth: q.on('aanmaak', 1, 1.5), fmrp: q.on('remt', 1, 0.6), labels: 1, lGlu: q.on('Glutamaat', 1), lM: q.on('mGluR5', 1), lA: q.on('AMPA', 1), lE: q.on('eiwitten', 1), ampaHl: q.on('receptoren', 1, 0.5) * (1 - q.on('Glutamaat', 1, 0.5)) + q.on('AMPA', 1, 0.5) * (1 - q.on('normale', 1, 0.5)), pijlen: q.on('activeert', 1, 0.8) };
    c_synaps(ctx, nx, ny, ns, 'normaal', Object.assign({ a: q.on('synaps', 1, 0.6) }, st));
    naamBij(ctx, 'normaal', null, nx, ny + 340 * ns, fx, 'center', C.teal);
    c_synaps(ctx, 1400, 470, 0.78, 'fxs', { a: fx, t, glu: 1, bind: 1, synth: 1, fmrp: q.on('ontbreekt', 1, 0.6), weg: q.on('ontbreekt', 1, 2.5), labels: 0 });
    naamBij(ctx, 'fragiele-X-syndroom', null, 1400, 470 + 340 * 0.78, fx, 'center', C.koraal);
    naamBij(ctx, 'geen FMRP', null, 1600, 400, q.on('ontbreekt', 1), 'left', C.koraal);
  },

  s63(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 25, 2, 1);
    const an = q.on('antwoord', 1, 0.6), tip = q.on('Tip', 1, 0.6);
    vraagKaart(ctx, 'Leg uit', 'waardoor de synaps bij FXS verzwakt', 70, 140, 1780, (q.on('Vraag', 1, 0.4)) * (1 - an));
    punten(ctx, [{ t: 'Normaal remt FMRP de eiwitten die na stimulering van mGluR5 worden gemaakt', v: q.on('gemaakt', 1, 0.4) },
      { t: 'Zonder FMRP halen die eiwitten de AMPA-receptoren uit het membraan', a: q.on('Twee', 2, 0.5), v: q.on('membraan', 1, 0.4) }], 70, 140, 1780, an * (1 - tip), { px: 30, gap: 14 });
    tipKaart(ctx, 'Wat remt wat? Wat gebeurt er als de rem wegvalt?', 70, 150, 1780, tip, 34);
    const sy = 590, sc = 0.6;
    c_synaps(ctx, 520, sy, sc, 'normaal', { t, glu: 1, bind: 1, synth: 1, fmrp: 1, labels: 0 });
    const rem = q.on('remt', 1, 0.5) * (1 - q.on('Twee', 2, 0.5)); if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem * (0.6 + 0.4 * Math.sin(t * 6)); circ(ctx, 520 + 45 * sc, sy + 90 * sc, 46 * sc, null, C.teal, 4); ctx.restore(); }
    naamBij(ctx, 'normaal', null, 520, sy + 290 * sc, 1, 'center', C.teal);
    const weg = q.on('halen', 1, 2.2);
    c_synaps(ctx, 1400, sy, sc, 'fxs', { t, glu: 1, bind: 1, synth: 1, fmrp: 1, weg, ampaHl: q.on('Minder', 1, 0.5) });
    naamBij(ctx, 'FXS', null, 1400, sy + 290 * sc, 1, 'center', C.koraal);
    naamBij(ctx, 'minder AMPA', null, 1400 + 200 * sc, sy - 40, q.on('Minder', 1), 'left', C.koraal);
  },

  s64(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, c_CTX, 1); vraagChip(ctx, 26, 2, 1);
    vraagKaart(ctx, 'Leg uit', 'hoe knock-out-muizen helpen bij het zoeken naar een medicijn', 70, 150, 900, q.on('Vraag', 1, 0.4) + q.on('Leg', 1, 0.4), { px: 36 });
    const mu = q.on('muizen', 1, 0.5), uit = q.on('uitgeschakeld', 1, 0.8), vs = q.on('verschijnselen', 1, 0.8), test = q.on('testen', 1, 0.8), verm = q.on('vermindert', 1, 2.0);
    c_genKaartje(ctx, 1420, 260, mu, uit);
    naamBij(ctx, 'geen FMRP', null, 1420, 350, q.on('FMRP', 1), 'center', C.koraal);
    c_muis(ctx, 1450, 560, 1.15, { a: mu, t, beef: vs * (1 - verm), kijk: -1 });
    c_meter(ctx, 1290, 700, 300, (0.8 * ease(vs)) * (1 - 0.65 * ease(verm)), verm > 0.5 ? C.groen : C.koraal, verm > 0.5 ? 'minder' : 'FXS', vs);
    c_flesje(ctx, 1080, 560 - 20 * Math.sin(Math.min(1, test) * Math.PI), 1.2, test * (1 - 0.0), C.groen);
    naamBij(ctx, 'stof testen', null, 1080, 660, test, 'center', C.groen);
    punten(ctx, [{ t: 'Bij deze muizen is het FMR1-gen uitgeschakeld (geen FMRP)', v: q.on('uitgeschakelde', 1, 0.4) }, { t: 'Op deze muizen test je of een stof de verschijnselen van FXS vermindert', v: q.on('stoffen', 1, 0.4) }], 70, 430, 900, q.on('Twee', 2, 0.5), { px: 30 });
  },
});
// Examenbespreking vwo 2018-II — scènes deel d: Wat te doen aan de muizenplagen? (s70–s85, vragen 31–38)
Object.assign(SCENES, {
  s70(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX, ramp(t, 0.2));
    const tV = q.at('voorjaar'); const a1 = d_win(t, 0.4, tV - 0.2, 0.5), a2 = ramp(t, tV - 0.1, 0.5);
    d_al(ctx, a1, () => {
      const g1 = ramp(t, q.at('context'), 0.7), g2 = ramp(t, q.at('kaal'), 0.7);
      d_grasland(ctx, 130, 190, 790, 400, { kaal: 0, t, a: g1, seed: 2 });
      naamBij(ctx, 'augustus', null, 160, 252, g1, 'left');
      d_grasland(ctx, 1000, 190, 790, 400, { kaal: g2 * 0.95, gangen: g2, t, a: ramp(t, q.at('graslanden') - 0.4, 0.6), seed: 5 });
      naamBij(ctx, 'maart', null, 1030, 252, ramp(t, q.at('graslanden') - 0.4, 0.6), 'left');
      // veldmuis loopt van het groene naar het kale land
      const ma = ramp(t, q.at('veldmuizen'), 0.3); const mx = lerp(260, 1560, (t - q.at('veldmuizen')) / 6);
      d_veldmuis(ctx, mx, 790, 0.95, ma, t, { loop: 1 });
      naamBij(ctx, 'veldmuis', null, mx, 650, ma, 'center');
    });
    d_al(ctx, a2, () => {
      const u = 0.4 * ramp(t, tV, 1.6) + 0.27 * ramp(t, q.at('zomer'), 1.4) + 0.25 * ramp(t, q.at('najaar'), 1.6);
      d_jaar(ctx, 260, 220, 1400, 520, u, { t, hl: { winter: ramp(t, q.at('winter'), 0.5) * (1 - ramp(t, q.at('zomer'), 0.5)) , voorjaar: ramp(t, tV, 0.5) * (1 - ramp(t, q.at('zomer'), 0.5)), zomer: ramp(t, q.at('zomer'), 0.5) * (1 - ramp(t, q.at('najaar'), 0.5)), najaar: ramp(t, q.at('najaar'), 0.5) } });
      if (u > 0.02) { const px = 260 + 1400 * u, py = 220 + 520 - 520 * d_jaarFn(u); d_veldmuis(ctx, px - 6, py - 14, 0.36, 1, t); }
    }); },

  s71(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 31, 1, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Noem', 'de vakterm voor de grens aan het aantal individuen in een gebied', 70, 190, 860, ramp(t, 0.3, 0.6));
    const tD = q.at('Draagkracht'), tV = q.at('Verzadigingspopulatie');
    punten(ctx, [{ t: 'draagkracht', a: ramp(t, tD - 0.2, 0.4), v: ramp(t, tD + 0.3, 0.4) }], 70, 540, 860);
    d_al(ctx, ramp(t, tV, 0.5), () => { regel(ctx, 'ook goed: verzadigingspopulatie', 70, 720, 1, C.groen, 34, 'left', 600); });
    // grafiek: populatie groeit en blijft onder de grens
    const gx = 1060, gy = 280, gw = 760, gh = 420, ga = ramp(t, 1.2, 0.6);
    d_al(ctx, ga, () => { examenKader(ctx, gx - 50, gy - 90, gw + 100, gh + 170, '', 1);
      const fn = (s) => 0.72 / (1 + Math.exp(-11 * (s - 0.38))), u = ramp(t, q.at('aantal'), 3.5);
      d_miniGrafiek(ctx, gx, gy, gw, gh, [{ fn, u, col: C.koraal }], { xl: 'tijd', yl: 'aantal veldmuizen' });
      const la = ramp(t, q.at('grens'), 0.5); const ly = gy + gh - gh * 0.72; d_al(ctx, la, () => { ctx.save(); ctx.setLineDash([16, 12]); ctx.strokeStyle = tD < t ? C.groen : C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx, ly); ctx.lineTo(gx + gw * ease(la), ly); ctx.stroke(); ctx.restore(); });
      const gl = ramp(t, tD, 0.5); if (gl > 0.01) d_al(ctx, gl, () => { ctx.save(); ctx.strokeStyle = rgba(C.groen, 0.28); ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(gx, ly); ctx.lineTo(gx + gw, ly); ctx.stroke(); ctx.restore(); });
      d_al(ctx, la * (1 - gl), () => vraagteken(ctx, gx + gw - 40, ly - 24, 1, 70));
      naamBij(ctx, 'draagkracht', null, gx + 40, ly - 22, gl, 'left', C.groen);
      if (u > 0.05) { const px = gx + gw * u, py = gy + gh - gh * fn(u); d_veldmuis(ctx, px - 4, py - 12, 0.32, 1, t); }
    }); },

  s72(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Schets', 'het verloop zonder én met ingreep (land begin juli onder water)', 70, 190, 760, ramp(t, 0.3, 0.6));
    const wa = ramp(t, q.at('onder') - 0.3, 0.6);
    d_al(ctx, wa, () => { const lv = ramp(t, q.at('onder'), 1.2) * (1 - ramp(t, q.at('populatie') + 0.6, 1.0)); d_grasland(ctx, 70, 540, 760, 300, { kaal: 0.1, gangen: 0.8, water: lv, t, seed: 3 });
      naamBij(ctx, 'begin juli', null, 100, 600, 1, 'left', '#9CC8F0'); });
    const da = ramp(t, 1.0, 0.6);
    const mk = [{ m: 1, n: 10, a: ramp(t, q.at('tien'), 0.5), t: '10', dy: -40, col: C.koraal }, { m: 7, n: 6000, a: ramp(t, q.at('zesduizend'), 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal },
      { m: 3, n: 84, a: ramp(t, q.at('halveert'), 0.5), t: '÷ 2', dx: -10, dy: -60, al: 'center', col: C.teal }];
    d_jdiag(ctx, 990, 200, 820, 520, { a: da, mk, water: ramp(t, q.at('water'), 0.6), legenda: ramp(t, q.at('Schets'), 0.5), t });
    d_al(ctx, ramp(t, q.at('Schets'), 0.5), () => { [[1, 7, C.koraal], [3, 7, C.teal]].forEach(([m0, m1, col], i) => { ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * Math.sin(t * 4 + i); vraagteken(ctx, 990 + 820 * (m1 - 0.2) / 8 - (i ? 0 : 50), 200 + 140 + i * 160 + (i ? 0 : 90), 1, 64); ctx.restore(); }); }); },

  s73(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2);
    const tR = q.at('razendsnel');
    const u1 = 0.62 * ramp(t, q.at('exponentieel'), tR - q.at('exponentieel') - 0.6) + 0.38 * ramp(t, tR - 0.4, 1.4);
    const u2 = ramp(t, q.at('groeit', 2), q.at('groot') - q.at('groeit', 2));
    const tJ = q.at('juli', 2), tN = q.at('november');
    const zA = d_win(t, tJ - 0.2, tN, 0.5);
    const mk = [{ m: 7, n: 6000, a: ramp(t, tN, 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal }, { m: 7, n: 3000, a: ramp(t, q.at('drieduizend'), 0.5), t: '± 3000', dx: -30, al: 'right', dy: 10, col: C.teal }];
    const D = d_jdiag(ctx, 380, 180, 1180, 560, { a: ramp(t, 0, 0.5), u1, u2, mk, legenda: 1 - zA, t, water: ramp(t, q.at('Halveer'), 0.5) * (1 - ramp(t, tN, 0.6)) });
    naamBij(ctx, 'J-curve', null, 380 + 1180 * 6.3 / 8 - 30, 180 + 120, ramp(t, q.at('J-curve'), 0.5) * (u1 > 0.95 ? 1 : 0.0) + 0 * 0, 'right', C.koraal);
    d_al(ctx, ramp(t, q.at('J-curve'), 0.5) * (u1 < 0.95 ? 1 : 0), () => regel(ctx, 'J-curve', 380 + 1180 * 0.55, 180 + 300, 1, C.koraal, 44, 'center', 700));
    d_al(ctx, ramp(t, q.at('half'), 0.5) * (1 - ramp(t, tJ - 0.4, 0.4)), () => { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 8]); const xx = 380 + 1180 * 6.6 / 8; ctx.beginPath(); ctx.moveTo(xx, D.Y(d_N1(6.6))); ctx.lineTo(xx, D.Y(d_N2(6.6))); ctx.stroke(); ctx.restore(); naamBij(ctx, 'half zo groot', null, xx - 20, (D.Y(d_N1(6.6)) + D.Y(0)) / 2, 1, 'right', C.goud); });
    d_jzoom(ctx, 520, 300, 520, 300, { a: zA, mk80: ramp(t, q.at('tachtig'), 0.5), mk40: ramp(t, q.at('veertig'), 0.5), u2: ramp(t, q.at('veertig') - 0.3, 0.6) }); },

  s74(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 32, 2);
    const tN = q.at('november'), tD = q.at('drieduizend'), tT = q.at('Tip', 2);
    const u1 = ramp(t, q.at('doorgetrokken'), tN - q.at('doorgetrokken') + 0.4), u2 = ramp(t, q.at('stippellijn'), tD - q.at('stippellijn') + 0.3);
    punten(ctx, [{ t: 'doorgetrokken J-curve: ± 10 in mei → 6000 in november', a: ramp(t, 0.8, 0.4), v: ramp(t, tN + 0.4, 0.4) },
      { t: 'stippellijn: begint in juli op de helft, eindigt rond 3000', a: ramp(t, q.at('Eén', 2) - 0.2, 0.4), v: ramp(t, tD + 0.4, 0.4) }], 70, 200, 860, 1, { px: 32 });
    tipKaart(ctx, 'In juli is de helft van een klein getal nog steeds klein.', 70, 520, 860, ramp(t, tT, 0.5), 32);
    const mk = [{ m: 1, n: 10, a: ramp(t, q.at('tien'), 0.5) * (1 - ramp(t, q.at('stippellijn'), 0.5)), t: '10', dy: -40, col: C.koraal }, { m: 7, n: 6000, a: ramp(t, tN, 0.5), t: '6000', dx: -30, al: 'right', dy: 10, col: C.koraal }, { m: 7, n: 3000, a: ramp(t, tD, 0.5), t: '± 3000', dx: -30, al: 'right', dy: 10, col: C.teal }];
    const zA = ramp(t, tT + 0.4, 0.5);
    d_jdiag(ctx, 1030, 200, 800, 520, { a: 1, u1, u2, mk, hl1: d_win(t, q.at('doorgetrokken'), q.at('Eén', 2)), hl2: d_win(t, q.at('stippellijn'), tT), legenda: 1 - zA, t });
    d_jzoom(ctx, 1130, 300, 440, 300, { a: zA, mk80: zA, mk40: zA });
    // fout: een diep gat in juli
    d_al(ctx, ramp(t, q.at('gat') - 0.6, 0.5), () => { const X = (m) => 1130 + 440 * (m - 1) / 4, Y = (n) => 300 + 300 - 300 * n / 200; ctx.save(); ctx.strokeStyle = rgba(C.koraal, 0.85); ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(X(3), Y(84)); ctx.lineTo(X(3), Y(3)); ctx.lineTo(X(3.6), Y(6)); ctx.stroke(); ctx.restore(); kruis(ctx, X(3) + 50, Y(30), 22, ramp(t, q.at('gat'), 0.4)); }); },

  s75(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 33, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'waarom afwachten kan helpen, en waarom onder water zetten de plaag het jaar erna erger kan maken', 70, 190, 900, ramp(t, 0.3, 0.6), { px: 36 });
    const a1 = ramp(t, q.at('afwachten'), 0.5), a2 = ramp(t, q.at('water'), 0.5);
    d_al(ctx, a1, () => { d_grasland(ctx, 1040, 190, 800, 270, { kaal: 0.9, gangen: 1, t, seed: 4 }); d_muizenRij(ctx, 1080, 315, 720, 14, t, 1, 0.24); naamBij(ctx, 'afwachten', null, 1066, 240, 1, 'left', C.goud); klokje(ctx, 1790, 240, 30, (t * 0.15) % 1, 1); });
    d_al(ctx, a2, () => { const lv = ramp(t, q.at('water'), 1.2); d_grasland(ctx, 1040, 510, 800, 270, { kaal: 0.9, gangen: 1, water: lv, t, seed: 6 }); naamBij(ctx, 'onder water', null, 1066, 560, 1, 'left', '#9CC8F0');
      d_al(ctx, ramp(t, q.at('volgend'), 0.5), () => { pijl(ctx, 1760, 760, 1760, 600, C.koraal, 1, 6, 22); vraagteken(ctx, 1712, 680, 1, 56); }); }); },

  s76(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 33, 2);
    const p1 = ramp(t, 0, 0.5), p2 = ramp(t, q.at('Twee') - 0.2, 0.5);
    // paneel 1: afwachten -> populatie stort vanzelf in
    d_al(ctx, p1, () => { const tS = q.at('stort'); const crash = ramp(t, tS, 2.5), win = ramp(t, q.at('winter'), 1.2);
      d_grasland(ctx, 70, 180, 860, 230, { kaal: 0.95, gangen: 1, t, seed: 4 });
      d_muizenRij(ctx, 100, 296, 800, Math.round(16 - 13 * crash), t, 1, 0.22);
      naamBij(ctx, 'hoge dichtheid', null, 96, 228, 1, 'left', C.goud);
      d_al(ctx, ramp(t, q.at('voedselgebrek'), 0.4) * (1 - win), () => { tag(ctx, 'voedselgebrek', 260, 380, C.koraal, 1, 'center', 26); tag(ctx, 'ziekte', 520, 380, C.koraal, ramp(t, q.at('ziekte'), 0.4), 'center', 26); });
      const fn = (s) => s < 0.45 ? 0.2 + 0.7 * Math.pow(s / 0.45, 1.8) : 0.9 - 0.8 * Math.pow(Math.min(1, (s - 0.45) / 0.4), 0.7) * (s < 0.85 ? 1 : 1) - 0.0;
      const u = 0.45 + 0.55 * ramp(t, tS, q.at('weinig') - tS + 0.5);
      d_miniGrafiek(ctx, 140, 470, 760, 160, [{ fn, u, col: C.koraal }], { xl: 'tijd', yl: 'aantal' });
      punten(ctx, [{ t: 'hoge dichtheid → vanzelf massale sterfte', v: ramp(t, q.at('weinig') + 0.2, 0.4) }], 70, 690, 860, 1, { px: 30 }); });
    d_al(ctx, p2, () => { const lv = ramp(t, q.at('water'), 1.0) * (1 - ramp(t, q.at('Die'), 1.2));
      d_grasland(ctx, 990, 180, 860, 230, { kaal: 0.95 - 0.8 * ramp(t, q.at('Die'), 2), gangen: 1, water: lv, t, seed: 7 });
      d_muizenRij(ctx, 1020, 296, 800, ramp(t, q.at('kleine'), 0.4) * 3 + Math.round(9 * ramp(t, q.at('harder'), 1.0)), t, 1, 0.22);
      naamBij(ctx, 'onder water', null, 1016, 228, 1 - ramp(t, q.at('Die'), 0.6), 'left', '#9CC8F0');
      d_al(ctx, ramp(t, q.at('voedsel', 2), 0.4), () => { tag(ctx, 'veel voedsel', 1200, 380, C.groen, 1, 'center', 26); tag(ctx, 'ruimte', 1440, 380, C.groen, ramp(t, q.at('ruimte'), 0.4), 'center', 26); });
      const fn2 = (s) => s < 0.25 ? 0.6 : s < 0.3 ? 0.6 - 0.5 * (s - 0.25) / 0.05 : 0.1 + 0.85 * Math.pow((s - 0.3) / 0.7, 1.6);
      const u = 0.3 * ramp(t, q.at('water'), 1.2) + 0.7 * ramp(t, q.at('overleven', 2), q.at('harder') - q.at('overleven', 2) + 0.6);
      d_miniGrafiek(ctx, 1060, 470, 760, 160, [{ fn: fn2, u, col: C.teal }], { xl: 'volgend jaar →', yl: 'aantal' });
      punten(ctx, [{ t: 'kleine populatie → betere overlevings- en voortplantingskansen', v: ramp(t, q.at('harder') + 0.2, 0.4) }], 990, 690, 860, 1, { px: 30 }); }); },

  s77(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 34, 'mc', ramp(t, 0, 0.4));
    const tK = q.at('Ken'), tT = q.at('Trombose'), tZ = q.at('Zonder');
    const f1 = d_win(t, 0.3, tK - 0.1, 0.5), f2 = d_win(t, tK, tT - 0.1, 0.5), f3 = ramp(t, tT, 0.5);
    // fase 1: vraag + muis met gifkorrels
    d_al(ctx, f1, () => { vraagKaart(ctx, 'Waaraan', 'sterven muizen door bromadiolon, dat vitamine K remt?', 70, 190, 860, 1);
      d_grasland(ctx, 1020, 220, 820, 420, { kaal: 0.4, gangen: 0.6, t, seed: 9 });
      d_korrels(ctx, 1480, 440, 1.3, ramp(t, q.at('Muizengif'), 0.5)); naamBij(ctx, 'bromadiolon', null, 1560, 335, ramp(t, q.at('bromadiolon'), 0.5), 'center', '#9FF0E0');
      d_veldmuis(ctx, lerp(1150, 1360, ramp(t, q.at('bromadiolon'), 1.6)), 440, 0.75, 1, t, { loop: 1 - ramp(t, q.at('bromadiolon') + 1.4, 0.3) });
      d_al(ctx, ramp(t, q.at('vitamine', 2), 0.5), () => ketting(ctx, [{ t: 'vitamine K' }, { t: 'trombine' }], 1060, 730, 740, 1, { px: 30 })); });
    // fase 2 en 3: de stollingsketen en het bloedvat
    const blok = ramp(t, tZ, 0.6);
    const kA = (w, n = 1) => ramp(t, q.at(w, n) - 0.1, 0.4);
    d_al(ctx, f2, () => {
      ketting(ctx, [{ t: 'vitamine K', a: kA('Vitamine', 3), col: blok > 0.5 ? C.koraal : C.goud }, { t: 'stollings­factoren', a: kA('stollingsfactoren') }, { t: 'trombine', a: kA('trombine', 2) },
        { t: 'fibrinogeen', a: kA('fibrinogeen'), col: C.oker }, { t: 'fibrine', a: kA('fibrine', 1) > 0 ? ramp(t, q.at('fibrine,') - 0.1, 0.4) : 0, col: C.oker }], 70, 250, 1780, 1, { px: 30 });
      // pijl van trombine naar de omzetting
      d_al(ctx, ramp(t, q.at('zet'), 0.4), () => naamBij(ctx, 'trombine zet om', null, 70 + (1780 - 280) / 5 * 3.5 + 280 + 14, 340, 1, 'center', C.goud));
      d_al(ctx, blok, () => { const kx = 70 + (1780 - 280) / 5 * 0.5; kruis(ctx, kx, 250, 34, 1); naamBij(ctx, 'bromadiolon', null, kx, 340, 1, 'center', C.teal);
        ctx.save(); ctx.globalAlpha *= 0.55; ctx.fillStyle = C.bgSchema; ctx.fillRect(70 + (1780 - 280) / 5 + 30, 180, 1780, 140); ctx.restore(); });
    });
    const bx = lerp(260, 1080, f3), by = lerp(440, 300, f3), bw = lerp(1400, 760, f3), bh = lerp(210, 170, f3);
    const net = ramp(t, q.at('draden'), 1.6) * (1 - blok), bloed = ramp(t, q.at('bloedingen') - 0.8, 2.5);
    d_bloedvat(ctx, bx, by, bw, bh, { a: Math.max(f2, f3) * ramp(t, q.at('fibrine,') - 0.6, 0.6), t, net, bloed, fibrinogeen: 1 });
    d_al(ctx, Math.max(f2, f3) * ramp(t, q.at('draden'), 0.5) * (bloed > 0.3 || blok < 0.5 ? 1 : 0), () => naamBij(ctx, bloed > 0.3 ? 'inwendige bloeding' : 'fibrinedraden', null, bx + bw / 2, by + bh + (bloed > 0.3 ? 200 : 90) * (f3 > 0.5 ? 1 : 1), 1, 'center', blok > 0.5 ? C.koraal : '#F2E2A0'));
    // fase 3: opties wegstrepen
    d_al(ctx, f3, () => { const tF = q.at('Fibrinogeen', 2);
      opties(ctx, ['trombose, minder fibrine', 'trombose, minder fibrinogeen', 'inwendige bloedingen, minder fibrine', 'inwendige bloedingen, minder fibrinogeen'], 70, 200, 960,
        { weg: [ramp(t, tT, 0.6), ramp(t, tT + 0.3, 0.6), 0, ramp(t, tF, 0.6)], goed: 2, g: ramp(t, q.at('antwoord'), 0.4) }, 1, { px: 32 }); }); },

  s78(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 35, 2, ramp(t, 0, 0.4));
    const t1 = q.at('Eén'), t2 = q.at('Twee', 2), t3 = q.at('Drie', 2);
    d_al(ctx, d_win(t, 0.3, t1 - 0.1, 0.5), () => vraagKaart(ctx, 'Welke', 'verklaringen voor meer stikstof in de sloot kunnen juist zijn?', 70, 190, 860, 1));
    const st = { sloot: 0.3 + 0.7 * ramp(t, q.at('stikstof'), 1.2), gangen: ramp(t, q.at('gegraaf'), 0.8), o2: ramp(t, q.at('zuurstof'), 0.8), bact: ramp(t, q.at('bacteriën'), 0.8),
      poep: ramp(t, q.at('poep'), 1.0), gras: 1 - 0.75 * ramp(t, q.at('aangevreten'), 1.0), opname: 0.7 - 0.6 * ramp(t, q.at('minder'), 1.0), uitspoel: 0.15 + 0.6 * ramp(t, q.at('spoelt'), 1.0) };
    d_sloot(ctx, 990, 190, 860, 600, st, t, ramp(t, 0.6, 0.6));
    d_al(ctx, ramp(t, q.at('sloten'), 0.5), () => naamBij(ctx, 'sloot', null, 1700, 250, 1, 'center', '#9CC8F0'));
    d_al(ctx, ramp(t, q.at('zeventig'), 0.5) * (1 - ramp(t, t1, 0.4)), () => regel(ctx, '+70% stikstof', 1700, 330, 1, C.koraal, 38, 'center', 800));
    const hl = (a, b) => d_win(t, a, b, 0.3);
    welNiet(ctx, [{ t: 'gegraaf → meer ammonificatie en nitrificatie', v: 'wel', a: ramp(t, t1, 0.4), s: ramp(t, q.at('Kan', 1), 0.4), hl: hl(t1, t2) },
      { t: 'poep en urine met stikstof', v: 'wel', a: ramp(t, t2, 0.4), s: ramp(t, q.at('Kan', 2), 0.4), hl: hl(t2, t3) },
      { t: 'aangevreten gras neemt minder nitraat op', v: 'wel', a: ramp(t, t3, 0.4), s: ramp(t, q.at('Kan', 3), 0.4), hl: hl(t3, q.at('Alle')) }], 70, 210, 880, ramp(t, t1 - 0.2, 0.4), { px: 32 });
    d_al(ctx, ramp(t, q.at('Alle'), 0.5), () => regel(ctx, 'alle drie wel → 2 punten', 70, 640, 1, C.groen, 38, 'left', 700));
    // namen bij wat er in de bodem gebeurt
    naamBij(ctx, 'zuurstof', null, 1080, 540, d_win(t, q.at('zuurstof'), t2), 'left', '#BFE3FF');
    naamBij(ctx, 'bacteriën', null, 1200, 640, d_win(t, q.at('bacteriën'), t2), 'left', C.groen);
    naamBij(ctx, 'poep en urine', null, 1060, 360, d_win(t, q.at('poep'), t3), 'left', C.oker);
    naamBij(ctx, 'uitspoeling', null, 1700, 330, d_win(t, q.at('spoelt'), 99), 'center', C.teal); },

  s79(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX);
    const hA = ramp(t, q.at('zeshoeken') - 0.3, 2.0), rA = ramp(t, q.at('muizenschade'), 1.0);
    d_nlKaart(ctx, 110, 180, 0.92, { a: ramp(t, 0.2, 0.6), hex: hA, rood: rA, t });
    naamBij(ctx, 'schade gemeld', null, 300, 840, rA, 'left', C.koraal);
    const oA = ramp(t, q.at('openheid'), 0.5);
    d_openheid(ctx, 900, 300, 900, { a: oA, u: ramp(t, q.at('openheid'), 1.2), open: 1 }); naamBij(ctx, 'open: je kijkt ver', null, 1800, 230, oA, 'right', C.goud);
    d_openheid(ctx, 900, 470, 900, { a: oA, u: ramp(t, q.at('openheid'), 1.2), open: 0 }); naamBij(ctx, 'gesloten: struiken en bomen', null, 1800, 400, oA, 'right', C.text);
    const dA = ramp(t, q.at('drooglegging') - 0.2, 0.5);
    d_profiel(ctx, 900, 540, 900, 290, { a: dA, diep: 0.25 + 0.5 * ramp(t, q.at('diep'), 1.5), pijlA: ramp(t, q.at('Drooglegging', 2), 0.5), t }); },

  s80(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 36, 'mc', ramp(t, 0, 0.4));
    const b1 = q.at('Bewering', 1), b2 = q.at('Bewering', 2);
    welNiet(ctx, [{ t: 'drooglegging is belangrijker dan openheid', a: ramp(t, b1, 0.4), hl: d_win(t, b1, b2, 0.3) },
      { t: 'schade in klein, beschut grasland wordt eerder opgemerkt', a: ramp(t, b2, 0.4), hl: ramp(t, b2, 0.3) }], 70, 200, 860, 1, { px: 30 });
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 490, 600, { a: [1, 1, 1, 1] }, ramp(t, q.at('grasland') + 0.2, 0.5), { px: 30 });
    examenKader(ctx, 1000, 170, 870, 670, 'AFBEELDING 3', ramp(t, 0.4, 0.5));
    d_staaf(ctx, 1110, 280, 720, 400, { a: ramp(t, 0.6, 0.5), grow: ramp(t, 0.8, 2.4) }); },

  s81(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 36, 'mc');
    const b2 = q.at('Bewering', 2), tA = q.at('antwoord'), tTip = q.at('Tip');
    welNiet(ctx, [{ t: 'drooglegging belangrijker dan openheid', v: 'niet', s: ramp(t, q.at('Niet', 1), 0.4), hl: d_win(t, 0, b2, 0.3) },
      { t: 'beschut grasland: schade eerder opgemerkt', v: 'niet', s: ramp(t, q.at('Niet', 3), 0.4), hl: d_win(t, b2, tA, 0.3) }], 70, 200, 640, 1, { px: 28 });
    const oA = d_win(t, tA - 0.3, tTip, 0.4), g = ramp(t, tA + 1.0, 0.4);
    opties(ctx, ['geen van beide', 'alleen 1', 'alleen 2', 'zowel 1 als 2'], 70, 520, 640, { weg: [0, g, ramp(t, tA + 1.2, 0.4), ramp(t, tA + 1.4, 0.4)], goed: 0, g }, oA, { px: 28 });
    tipKaart(ctx, 'Gaat het diagram wel over deze bewering?', 70, 540, 640, ramp(t, tTip, 0.5), 30);
    // diagram: spreiding binnen één drooglegging
    const hG = d_win(t, q.at('binnen'), b2, 0.5), r0 = d_win(t, q.at('gesloten'), b2, 0.4), r3 = d_win(t, q.at('open', 1), b2, 0.4), sp = d_win(t, q.at('verschil') - 0.4, b2, 0.6);
    const yA = d_win(t, q.at('meldingen', 2), q.at('zegt'), 0.4), kA = d_win(t, q.at('beschutte'), tA, 0.4);
    examenKader(ctx, 760, 170, 1110, 680, 'AFBEELDING 3', 1);
    d_staaf(ctx, 870, 280, 960, 400, { hlG: 4, hlA: hG, nul: r0, spread: sp, rings: [{ g: 4, b: 3, a: r3, t: '72%', dx: -40, al: 'right', dy: 0 }], hlK: 0, hlKA: kA * 0.9 });
    d_al(ctx, yA, () => { ctx.save(); roundRect(ctx, 870, 228, 250, 40, 10); shape(ctx, rgba(C.goud, 0.15), C.goud, 2.5); ctx.restore(); text(ctx, 'meldingen', 1150, 258, fTekst(28, 700), C.goud, 'left'); kruis(ctx, 1350, 248, 14, 1); text(ctx, 'snelheid opmerken', 1380, 258, fTekst(28, 600), C.text2, 'left'); });
    naamBij(ctx, '0–15 m: weinig meldingen', null, 1830, 262, kA, 'right', '#7FC4A8'); },

  s82(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 37, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Verklaar', 'welk type rover een afwisselend landschap aantrekt, en hoe dat een plaag voorkomt', 70, 190, 860, ramp(t, 0.3, 0.6), { px: 36 });
    const wA = ramp(t, q.at('wezel'), 0.3), vA = ramp(t, q.at('vos'), 0.3);
    d_al(ctx, ramp(t, q.at('Specialisten'), 0.5), () => { d_wezel(ctx, 1110, 400, 1.0, wA, t); naamBij(ctx, 'specialist', 'wezel', 1040, 260, 1, 'left', C.goud);
      d_menu(ctx, 1360, 400, [{ n: 'muis', a: ramp(t, q.at('prooisoorten'), 0.4), hl: 1 }], 1); });
    d_al(ctx, ramp(t, q.at('Generalisten'), 0.5), () => { d_vos(ctx, 1130, 660, 0.85, vA, t); naamBij(ctx, 'generalist', 'vos', 1040, 470, 1, 'left', C.goud);
      const ma = (i) => ramp(t, q.at('alles') - 0.2 + i * 0.15, 0.4); d_menu(ctx, 1360, 650, [{ n: 'muis', a: ma(0) }, { n: 'konijn', a: ma(1) }, { n: 'vogel', a: ma(2) }, { n: 'kever', a: ma(3) }, { n: 'bes', a: ma(4) }], 1, 100); });
    const lA = ramp(t, q.at('grasland') - 0.3, 0.5); const het = ramp(t, q.at('afwisselend'), q.at('bosjes') - q.at('afwisselend') + 0.6);
    d_landschap(ctx, 70, 520, 860, 330, het, t, lA); naamBij(ctx, het > 0.5 ? 'afwisselend landschap' : 'open grasland', null, 96, 572, lA, 'left');
    d_al(ctx, ramp(t, q.at('Welk'), 0.4), () => vraagteken(ctx, 860, 640, 1, 90)); },

  s83(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 37, 2);
    const tL = q.at('Let');
    punten(ctx, [{ t: 'afwisselend landschap: veel prooisoorten → generalisten', a: ramp(t, 0, 0.4), v: ramp(t, q.at('prooisoorten') + 0.3, 0.4) },
      { t: 'generalisten blijven bij weinig muizen en stappen over zodra de muizen toenemen', a: ramp(t, q.at('Twee') - 0.2, 0.4), v: ramp(t, q.at('vroeg') + 0.2, 0.4) }], 70, 200, 880, 1, { px: 32 });
    valkuil(ctx, 'schuilplaatsen of nestgelegenheid voor de rover', 70, 560, 880, ramp(t, tL, 0.5), 32);
    // rechts: afwisselend landschap met vos (blijft) en wezel (vertrekt)
    d_landschap(ctx, 1000, 190, 850, 280, 1, t, 1);
    const vx = 1180 + Math.sin(t * 0.5) * 60; d_vos(ctx, vx, 440, 0.5, 1, t, { loop: 0.6, kijk: Math.cos(t * 0.5) > 0 ? 1 : -1 });
    const ww = ramp(t, q.at('weg') - 0.2, 2.0); d_wezel(ctx, 1560 + 380 * ww, 450, 0.6, (1 - ww) * ramp(t, q.at('Specialisten') - 0.3, 0.4), t, { loop: ww > 0.01 ? 1 : 0 });
    naamBij(ctx, 'specialist trekt weg', null, 1830, 240, d_win(t, q.at('Specialisten'), tL + 2, 0.4), 'right', C.goud);
    // grafiek veldmuizen: zonder generalist / met generalist
    const u = ramp(t, q.at('Begint'), q.at('vroeg') - q.at('Begint') + 0.4);
    const zonder = (s) => 0.05 + 0.9 * Math.pow(s, 2.6), met = (s) => s < 0.35 ? zonder(s) : zonder(0.35) + 0.04 * Math.sin((s - 0.35) * 12) * 0.5;
    d_miniGrafiek(ctx, 1080, 530, 740, 230, [{ fn: zonder, u, col: '#6A7488', dash: [12, 10], lw: 5 }, { fn: met, u, col: C.teal }], { a: ramp(t, q.at('Begint') - 0.3, 0.5), xl: 'tijd', yl: 'veldmuizen' });
    naamBij(ctx, 'met vos', null, 1820, 740, ramp(t, q.at('remmen'), 0.5), 'right', C.teal); naamBij(ctx, 'zonder', null, 1700, 560, ramp(t, q.at('remmen'), 0.5), 'right', C.text2); },

  s84(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 38, 2, ramp(t, 0, 0.4));
    vraagKaart(ctx, 'Licht toe', 'nestkasten alleen preventief, omploegen alleen curatief', 70, 190, 860, ramp(t, 0.3, 0.6));
    // boer met koeien en hooi
    const bA = ramp(t, q.at('melkveehouder') - 0.1, 0.3);
    d_al(ctx, bA, () => { ctx.save(); ctx.strokeStyle = D_GRAS; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1000, 800); ctx.lineTo(1860, 800); ctx.stroke(); ctx.restore();
      d_koe(ctx, 1460, 800, 0.95, 1, t, -1); });
    persoon(ctx, 'bilal', 1110, 800, 400, { t, a: bA, outfit: 'zomer', pose: 'handenHeup', uit: 'blij', kijk: 1 });
    naamBij(ctx, 'melkveehouder', null, 1110, 370, bA, 'center');
    const hA = ramp(t, q.at('hooi') - 0.2, 0.4); d_hooibaal(ctx, 1700, 800, 70, hA); d_hooibaal(ctx, 1790, 800, 52, ramp(t, q.at('hooi'), 0.4));
    // twee maatregelen
    const n1 = ramp(t, q.at('nestkasten'), 0.5), n2 = ramp(t, q.at('omploegen'), 0.5);
    d_al(ctx, n1, () => { examenKader(ctx, 70, 520, 410, 330, '', 1); d_nestkast(ctx, 200, 820, 0.6); d_valk(ctx, 200 + 30 * (1 - ramp(t, q.at('roofvogels'), 1.0)), 820 - 224 - 120 * (1 - ramp(t, q.at('roofvogels'), 1.0)), 0.9, ramp(t, q.at('roofvogels') - 0.2, 0.4), t, 1 - ramp(t, q.at('roofvogels') + 0.6, 0.4), 1);
      naamBij(ctx, 'preventief', null, 300, 700, ramp(t, q.at('preventief'), 0.5), 'left', C.groen); });
    d_al(ctx, n2, () => { examenKader(ctx, 520, 520, 410, 330, '', 1); d_trekker(ctx, 760, 800, 0.62, 1, t); naamBij(ctx, 'curatief', null, 725, 610, ramp(t, q.at('curatief'), 0.5), 'center', C.koraal); }); },

  s85(ctx, t, q) { bg(ctx, 'schema'); contextChip(ctx, D_CTX); vraagChip(ctx, 38, 2);
    const tTw = q.at('Twee'), tL = q.at('Let');
    vraagKaart(ctx, 'Licht toe', 'nestkasten alleen preventief, omploegen alleen curatief', 70, 190, 880, ramp(t, 0.3, 0.5), { px: 32 });
    punten(ctx, [{ t: 'roofvogels houden alleen een kleine populatie in toom; ze zijn er niet meteen', a: ramp(t, 0, 0.4), v: ramp(t, q.at('laat') + 0.2, 0.4) },
      { t: 'omploegen: geen gras of hooi meer voor de koeien', a: ramp(t, tTw - 0.2, 0.4), v: ramp(t, q.at('koeien') + 0.2, 0.4) }], 70, 410, 880, 1, { px: 32 });
    valkuil(ctx, '"ik ploeg om als er veel muizen zijn"', 70, 700, 880, ramp(t, tL, 0.5), 32);
    // fase 1: nestkast, roofvogel komt pas later, de plaag is dan al te groot
    const f1 = d_win(t, 0.2, tTw - 0.1, 0.5), f2 = ramp(t, tTw, 0.5);
    d_al(ctx, f1, () => { const sy = d_grasland(ctx, 1000, 400, 850, 400, { kaal: 0.2 + 0.6 * ramp(t, q.at('plaag'), 1.2), gangen: 0.6, t, seed: 11 });
      d_nestkast(ctx, 1130, sy, 0.7); const va = ramp(t, q.at('zijn') - 0.3, 0.6), vl = 1 - ramp(t, q.at('zijn') + 0.4, 0.4);
      d_valk(ctx, 1130 + 40 * vl, sy - 270 - 160 * vl, 0.9, va, t, vl, 1);
      klokje(ctx, 1780, 260, 34, ramp(t, q.at('nestkasten'), q.at('zijn') - q.at('nestkasten')), ramp(t, q.at('nestkasten') - 0.2, 0.4));
      d_muizenRij(ctx, 1260, sy - 4, 560, Math.round(3 + 12 * ramp(t, q.at('plaag'), 1.6)), t, 1, 0.22);
      naamBij(ctx, 'te laat', null, 1600, 330, ramp(t, q.at('laat'), 0.4), 'center', C.koraal); });
    // fase 2: omploegen kost het grasland
    d_al(ctx, f2, () => { const sy = d_grasland(ctx, 1000, 400, 850, 400, { kaal: 0.9 * ramp(t, q.at('schade'), 1.0), gangen: 0.6, t, seed: 11 });
      const tx = lerp(1060, 1720, ramp(t, q.at('omploegen'), q.at('grasland') - q.at('omploegen') + 1.2)); d_geploegd(ctx, 1000, tx - 150, sy);
      d_trekker(ctx, tx, sy + 4, 0.6, 1, t);
      examenKader(ctx, 1000, 190, 850, 180, '', 1); d_koe(ctx, 1200, 350, 0.62, 1, t, 1); d_hooibaal(ctx, 1460, 350, 50, 1); d_hooibaal(ctx, 1560, 350, 40, 1);
      const k = ramp(t, q.at('geen'), 0.4); kruis(ctx, 1510, 290, 40, k); naamBij(ctx, 'geen gras of hooi', null, 1620, 300, k, 'left', C.koraal);
      naamBij(ctx, 'alleen als het grasland al verloren is', null, 1425, 860, ramp(t, q.at('verloren'), 0.5), 'center', C.goud); }); }
});
