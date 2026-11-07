
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
// Wat word jij? · Diergeneeskunde — gedeelde tekenset voor de vier films (21 okt 2026)
// Dieren in zijaanzicht, kop naar rechts (kijk: -1 spiegelt). Anker (x, y) = midden onder de poten, op de grond. s = schaal (1 ≈ koe van 470 px lang).
// Een dier dat naar rechts kijkt, laat zijn LINKERflank zien (pens en lebmaag van de koe liggen links).

// gladde gesloten (of open) lijn door punten (midpuntmethode)
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');

// poot: van (x, y0) naar de grond (y = 0), met knie/hak-knik dx; hoef of voetje
function poot(ctx, x, y0, b, kleur, hoef, o = {}) { const { knik = 0, buig = 0, voet = 'hoef', hoefH = 14, smal = 0.42 } = o;
  const k = y0 * 0.45; ctx.beginPath(); ctx.moveTo(x - b * 0.62, y0); ctx.quadraticCurveTo(x - b * 0.5 + knik, k, x - b * smal + buig, -hoefH); ctx.lineTo(x + b * smal + buig, -hoefH); ctx.quadraticCurveTo(x + b * 0.5 + knik, k, x + b * 0.62, y0); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  if (voet === 'hoef') { roundRect(ctx, x - b * (smal + 0.1) + buig, -hoefH - 2, b * (smal + 0.1) * 2, hoefH + 2, 3); ctx.fillStyle = hoef; ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(x + buig + b * 0.15, -hoefH * 0.4, b * 0.62, hoefH * 0.55, 0, 0, 6.283); ctx.fillStyle = kleur; ctx.fill(); } }

function _start(ctx, x, y, s, kijk, a) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); }

// ---------- KOE (Holstein-bont) ----------
const KOE_ROMP = [[-205, -190], [-196, -222], [-150, -236], [-50, -230], [60, -236], [120, -244], [158, -228], [176, -196], [168, -150], [140, -112], [92, -98], [30, -94], [-50, -96], [-120, -100], [-172, -116], [-202, -150]];
const KOE_KOP = [[150, -232], [186, -246], [214, -238], [244, -206], [266, -168], [270, -142], [256, -126], [232, -128], [210, -150], [176, -170], [150, -186]];
// o: a, kijk, t, kauw (0..1 kaak), bont, uier, doorsnede (0..1: romp doorzichtig), staart (zwaai), horens, kalf
function koe(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kauw = 0, bont = true, uier = 1, doorsnede = 0, staart = 0.3, horens = true, kleur = '#F2EEE6', vlek = '#2A2622', binnen = null } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const romp = 1 - doorsnede * 0.72, rand = '#6A6258';
  // achterste poten (donkerder)
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -168, -130, 30, _dk(kleur, 0.18), '#3A3430', { knik: -14, smal: 0.36 }); poot(ctx, 104, -108, 28, _dk(kleur, 0.18), '#3A3430', { smal: 0.36 }); ctx.restore();
  // staart
  const zw = Math.sin(t * 1.4) * 10 * staart; ctx.save(); ctx.globalAlpha *= romp; ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-198, -214); ctx.quadraticCurveTo(-222 + zw * 0.3, -150, -214 + zw, -70); ctx.stroke(); ctx.beginPath(); ctx.ellipse(-214 + zw, -58, 9, 18, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.restore();
  // romp + nek + kop
  ctx.save(); ctx.globalAlpha *= romp; zacht(ctx, KOE_ROMP); ctx.fillStyle = kleur; ctx.fill();
  ctx.beginPath(); ctx.moveTo(110, -240); ctx.quadraticCurveTo(150, -250, 176, -236); ctx.lineTo(196, -170); ctx.quadraticCurveTo(170, -120, 128, -112); ctx.closePath(); ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_ROMP); ctx.clip(); ctx.fillStyle = vlek; [[-150, -190, 50, 38, 1], [-60, -215, 46, 30, 3], [30, -150, 58, 40, 5], [-110, -120, 30, 20, 7], [110, -200, 40, 34, 9]].forEach(([bx, by, rx, ry, sd]) => { blob(ctx, bx, by, rx, ry, 0.28, sd); ctx.fill(); }); ctx.restore(); }
  // uier
  if (uier > 0.01) { ctx.save(); ctx.globalAlpha *= uier; ctx.beginPath(); ctx.ellipse(-108, -94, 40, 24, 0, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); ctx.fillStyle = '#D89C90'; [-130, -112, -94].forEach(px => { roundRect(ctx, px - 4, -76, 8, 14, 3); ctx.fill(); }); ctx.restore(); }
  ctx.restore();
  if (binnen) binnen(ctx);
  // voorste poten
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -128, -118, 32, kleur, '#3A3430', { knik: -16, smal: 0.36 }); poot(ctx, 146, -108, 30, kleur, '#3A3430', { smal: 0.36 });
  // kop
  const kk = kauw * Math.sin(t * 9) * 3; zacht(ctx, KOE_KOP); ctx.fillStyle = kleur; ctx.fill();
  if (bont) { ctx.save(); zacht(ctx, KOE_KOP); ctx.clip(); ctx.fillStyle = vlek; blob(ctx, 196, -222, 36, 26, 0.2, 4); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(258, -142 + kk, 18, 20, 0.2, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); circ(ctx, 263, -150 + kk, 3.5, '#8A5A50');
  circ(ctx, 220, -196, 6.5, '#1A1612'); circ(ctx, 222, -198, 2, '#FFFFFF');
  ctx.beginPath(); ctx.ellipse(180, -232, 26, 10, -0.35, 0, 6.283); ctx.fillStyle = _dk(kleur, 0.08); ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke();
  if (horens) { ctx.beginPath(); ctx.moveTo(196, -240); ctx.quadraticCurveTo(204, -262, 222, -266); ctx.quadraticCurveTo(208, -252, 206, -238); ctx.closePath(); ctx.fillStyle = '#D8CBB0'; ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// koe in doorsnede: de vier maagdelen (u = 0..1 opbouw; nadruk: 'pens'|'net'|'boek'|'leb'|null). Coördinaten in koe-eenheden.
function koeMagen(ctx, u = 1, nadruk = null, t = 0, o = {}) { const { gas = 0, verschoven = 0 } = o; const A = (k) => clamp(u * 4 - k, 0, 1);
  // slokdarm
  ctx.save(); ctx.globalAlpha *= A(0); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; zacht(ctx, [[250, -150], [200, -170], [150, -178], [110, -186], [70, -190]], false); ctx.stroke(); ctx.restore();
  const dim = (k) => (nadruk && nadruk !== k ? 0.45 : 1);
  // pens: groot, links-achter
  ctx.save(); ctx.globalAlpha *= A(0) * dim('pens'); zacht(ctx, [[-160, -200], [-100, -214], [0, -212], [62, -196], [70, -150], [40, -116], [-40, -108], [-130, -114], [-168, -150]]); shape(ctx, '#7FA35A', '#A8C882', 2.5);
  ctx.save(); zacht(ctx, [[-160, -200], [-100, -214], [0, -212], [62, -196], [70, -150], [40, -116], [-40, -108], [-130, -114], [-168, -150]]); ctx.clip();
  for (let i = 0; i < 26; i++) { const px = -150 + hash(i * 3.1) * 210, py = -200 + hash(i * 7.7) * 85, an = hash(i) * 3 + t * 0.4; ctx.strokeStyle = '#C9DFA8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 10, py - Math.sin(an) * 10); ctx.lineTo(px + Math.cos(an) * 10, py + Math.sin(an) * 10); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // netmaag: rond, voor de pens
  ctx.save(); ctx.globalAlpha *= A(1) * dim('net'); ctx.beginPath(); ctx.ellipse(96, -168, 26, 24, 0, 0, 6.283); shape(ctx, '#B88A5A', '#D8AE7E', 2.5);
  ctx.strokeStyle = 'rgba(255,240,210,0.35)'; ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(78, -168 + i * 8); ctx.lineTo(114, -168 + i * 8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(96 + i * 8, -188); ctx.lineTo(96 + i * 8, -148); ctx.stroke(); } ctx.restore();
  // boekmaag
  ctx.save(); ctx.globalAlpha *= A(2) * dim('boek'); ctx.beginPath(); ctx.ellipse(118, -128, 20, 17, 0, 0, 6.283); shape(ctx, '#9A7AB0', '#BBA0D0', 2.5); ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(104, -128 + i * 5); ctx.lineTo(132, -128 + i * 5); ctx.stroke(); } ctx.restore();
  // lebmaag: langgerekt onderin; bij verschoven ligt hij omhoog naast de pens, vol gas
  ctx.save(); ctx.globalAlpha *= A(3) * dim('leb'); const vy = -verschoven * 70, vx = -verschoven * 40;
  zacht(ctx, [[110 + vx, -112 + vy], [70 + vx, -104 + vy], [10 + vx, -102 + vy], [-36 + vx, -110 + vy], [-20 + vx, -124 + vy], [40 + vx, -122 + vy], [96 + vx, -128 + vy]]); shape(ctx, '#D8826A', '#F0A890', 2.5);
  if (gas > 0.01) { ctx.save(); ctx.globalAlpha *= gas; ctx.beginPath(); ctx.ellipse(30 + vx, -121 + vy, 46, 9, 0, 0, 6.283); ctx.fillStyle = 'rgba(230,240,255,0.55)'; ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- PAARD (bruin, zwarte manen) ----------
const PAARD_ROMP = [[-190, -250], [-140, -272], [-40, -262], [60, -266], [118, -282], [150, -270], [162, -232], [150, -186], [120, -160], [60, -150], [-40, -150], [-120, -158], [-172, -176], [-196, -214]];
function paard(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, doorsnede = 0, kleur = '#9A5E38', manen = '#2A1C14', pijn = 0, binnen = null } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const romp = 1 - doorsnede * 0.72, hoef = '#2E2620', sch = Math.sin(t * 6) * pijn;
  ctx.save(); ctx.globalAlpha *= romp;
  poot(ctx, -164, -172, 24, _dk(kleur, 0.2), hoef, { knik: -16, smal: 0.3 }); poot(ctx, 108, -160, 22, _dk(kleur, 0.2), hoef, { buig: sch * 20, smal: 0.3 });
  // staart
  ctx.fillStyle = manen; zacht(ctx, [[-188, -252], [-214, -230], [-226, -170], [-220, -100], [-206, -96], [-206, -170], [-192, -224]]); ctx.fill();
  zacht(ctx, PAARD_ROMP); ctx.fillStyle = kleur; ctx.fill();
  // nek en kop
  zacht(ctx, [[96, -276], [150, -340], [196, -394], [222, -402], [246, -380], [282, -326], [294, -298], [284, -286], [262, -294], [236, -334], [210, -330], [180, -270], [160, -200], [120, -200]]); ctx.fill();
  ctx.fillStyle = manen; zacht(ctx, [[100, -280], [148, -344], [194, -398], [206, -404], [198, -376], [160, -330], [122, -282]]); ctx.fill();
  ctx.beginPath(); ctx.ellipse(208, -404, 7, 18, 0.4, 0, 6.283); ctx.fillStyle = kleur; ctx.fill();
  circ(ctx, 236, -364, 6, '#140E0A'); circ(ctx, 238, -366, 2, '#FFFFFF'); circ(ctx, 284, -300, 4, '#3A2418');
  ctx.restore();
  if (binnen) binnen(ctx);
  ctx.save(); ctx.globalAlpha *= romp; poot(ctx, -126, -168, 26, kleur, hoef, { knik: -18, smal: 0.3 }); poot(ctx, 146, -160, 24, kleur, hoef, { smal: 0.3 }); ctx.restore();
  ctx.restore(); }
// paard in doorsnede: kleine maag voor, dunne darm, grote blinde darm en dikke darm achter
function paardDarm(ctx, u = 1, nadruk = null, t = 0, o = {}) { const { slot = 0 } = o; const A = (k) => clamp(u * 4 - k, 0, 1); const dim = (k) => (nadruk && nadruk !== k ? 0.45 : 1);
  ctx.save(); ctx.globalAlpha *= A(0); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; zacht(ctx, [[270, -300], [220, -330], [170, -290], [130, -246], [104, -230]], false); ctx.stroke(); ctx.restore();
  // maag (klein)
  ctx.save(); ctx.globalAlpha *= A(0) * dim('maag'); ctx.beginPath(); ctx.ellipse(86, -222, 28, 22, -0.3, 0, 6.283); shape(ctx, '#D8826A', '#F0A890', 2.5);
  if (slot > 0.01) { ctx.save(); ctx.globalAlpha *= slot; circ(ctx, 106, -236, 9, '#E0B64A', '#F2D27A', 2); ctx.restore(); } ctx.restore();
  // dunne darm: kronkel
  ctx.save(); ctx.globalAlpha *= A(1) * dim('dunne'); ctx.strokeStyle = '#E8A890'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const f = i / 60, px = 70 - f * 110 + Math.sin(f * 18) * 18, py = -226 + f * 30 + Math.cos(f * 18) * 14; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore();
  // blinde darm (komma) + dikke darm (lussen)
  ctx.save(); ctx.globalAlpha *= A(2) * dim('blinde'); zacht(ctx, [[-60, -214], [-20, -220], [20, -206], [40, -178], [30, -160], [-10, -160], [-50, -172], [-80, -196]]); shape(ctx, '#7FA35A', '#A8C882', 2.5);
  ctx.save(); zacht(ctx, [[-60, -214], [-20, -220], [20, -206], [40, -178], [30, -160], [-10, -160], [-50, -172], [-80, -196]]); ctx.clip(); for (let i = 0; i < 14; i++) { const px = -70 + hash(i * 2.3) * 100, py = -210 + hash(i * 5.1) * 45, an = hash(i) * 3 + t * 0.4; ctx.strokeStyle = '#C9DFA8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 8 * Math.cos(an), py - 8 * Math.sin(an)); ctx.lineTo(px + 8 * Math.cos(an), py + 8 * Math.sin(an)); ctx.stroke(); } ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= A(3) * dim('dikke'); ctx.strokeStyle = '#8FB06A'; ctx.lineWidth = 16; ctx.lineCap = 'round'; zacht(ctx, [[-80, -196], [-140, -200], [-160, -176], [-120, -166], [-150, -224], [-178, -236], [-196, -232]], false); ctx.stroke(); ctx.restore(); }

// ---------- KAT (zittend of staand, cyperse grijs) ----------
function kat(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#8A8A86', streep = '#5E5E5A', ziek = 0, zit = true } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const st = Math.sin(t * 1.2) * 8;
  ctx.strokeStyle = kleur; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, -14); ctx.quadraticCurveTo(-100, -10, -96 + st, -70); ctx.stroke();
  if (zit) { zacht(ctx, [[-50, -10], [-56, -60], [-36, -110], [0, -130], [30, -120], [40, -80], [36, -20], [20, 0], [-30, 0]]); ctx.fillStyle = kleur; ctx.fill();
    ctx.fillStyle = kleur; roundRect(ctx, 8, -60, 16, 60, 8); ctx.fill(); roundRect(ctx, 28, -60, 16, 60, 8); ctx.fill();
    ctx.save(); zacht(ctx, [[-50, -10], [-56, -60], [-36, -110], [0, -130], [30, -120], [40, -80], [36, -20], [20, 0], [-30, 0]]); ctx.clip(); ctx.strokeStyle = streep; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-60, -90 + i * 22); ctx.quadraticCurveTo(-30, -84 + i * 22, -10, -98 + i * 22); ctx.stroke(); } ctx.restore(); }
  else { zacht(ctx, [[-70, -60], [-40, -78], [30, -76], [50, -60], [44, -40], [-60, -38]]); ctx.fillStyle = kleur; ctx.fill(); [[-56, -44], [-38, -44], [24, -46], [40, -46]].forEach(([px, py]) => { roundRect(ctx, px - 6, py, 12, -py, 6); ctx.fill(); }); }
  // kop
  const hx = zit ? 18 : 56, hy = zit ? -146 : -86; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(hx, hy, 34, 30, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.moveTo(hx - 28, hy - 14); ctx.lineTo(hx - 22, hy - 46); ctx.lineTo(hx - 4, hy - 26); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(hx + 4, hy - 28); ctx.lineTo(hx + 22, hy - 46); ctx.lineTo(hx + 28, hy - 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E8A8A0'; ctx.beginPath(); ctx.moveTo(hx + 22, hy - 2); ctx.lineTo(hx + 30, hy - 2); ctx.lineTo(hx + 26, hy + 4); ctx.closePath(); ctx.fill();
  const og = ziek > 0.5 ? 0.35 : 1; ctx.fillStyle = '#C9D85A'; ctx.beginPath(); ctx.ellipse(hx + 2, hy - 8, 6, 6 * og, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(hx + 20, hy - 8, 5, 5 * og, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#121212'; ctx.fillRect(hx + 1, hy - 8 - 5 * og, 2, 10 * og); ctx.fillRect(hx + 19, hy - 8 - 4 * og, 2, 8 * og);
  ctx.strokeStyle = '#D8D8D2'; ctx.lineWidth = 1.2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(hx + 28, hy + 4); ctx.lineTo(hx + 56, hy + 1 + i * 7); ctx.stroke(); }
  ctx.restore(); }

// ---------- HOND (collie: bruin met witte kraag) ----------
function hond(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#B07A3E', wit = '#F2EEE6' } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const st = Math.sin(t * 3) * 6; ctx.fillStyle = kleur;
  zacht(ctx, [[-110, -118], [-140, -96], [-150, -50], [-130 + st, -40], [-120, -90]]); ctx.fill();
  poot(ctx, -86, -80, 18, _dk(kleur, 0.2), '#2A2A2A', { voet: 'pootje', hoefH: 8 }); poot(ctx, 60, -80, 16, _dk(wit, 0.1), '#2A2A2A', { voet: 'pootje', hoefH: 8 });
  ctx.fillStyle = kleur; zacht(ctx, [[-118, -120], [-60, -136], [40, -134], [86, -126], [96, -96], [70, -72], [-40, -70], [-110, -80], [-124, -100]]); ctx.fill();
  ctx.fillStyle = wit; zacht(ctx, [[50, -146], [96, -168], [124, -120], [110, -84], [96, -64], [82, -76], [68, -66], [58, -100]]); ctx.fill();
  ctx.fillStyle = kleur; [[-100, -76], [-60, -70], [-20, -70], [20, -70]].forEach(([px, py]) => { ctx.beginPath(); ctx.moveTo(px - 8, py - 2); ctx.lineTo(px, py + 10); ctx.lineTo(px + 8, py - 2); ctx.closePath(); ctx.fill(); });
  poot(ctx, -70, -80, 18, kleur, '#2A2A2A', { voet: 'pootje', hoefH: 8 }); poot(ctx, 78, -80, 16, wit, '#2A2A2A', { voet: 'pootje', hoefH: 8 });
  // kop: smalle lange snuit
  ctx.fillStyle = kleur; zacht(ctx, [[78, -150], [100, -186], [126, -188], [156, -170], [190, -160], [194, -150], [164, -140], [120, -132], [92, -132]]); ctx.fill();
  ctx.fillStyle = wit; zacht(ctx, [[140, -166], [190, -160], [194, -150], [160, -142], [136, -148]]); ctx.fill(); circ(ctx, 192, -156, 5, '#1A1A1A');
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(100, -180); ctx.lineTo(96, -212); ctx.lineTo(116, -186); ctx.closePath(); ctx.fill(); ctx.fillStyle = _dk(kleur, 0.3); ctx.beginPath(); ctx.moveTo(106, -196); ctx.lineTo(96, -212); ctx.lineTo(110, -206); ctx.closePath(); ctx.fill();
  circ(ctx, 134, -168, 4.5, '#1A1410'); circ(ctx, 135, -169, 1.5, '#FFFFFF');
  ctx.restore(); }

// ---------- GEIT (wit, met baardje, horentjes, uier) ----------
function geit(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#ECE6DA', uier = 1, drachtig = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const hoef = '#3A3430', b = drachtig * 14; ctx.fillStyle = kleur;
  poot(ctx, -76, -96, 16, _dk(kleur, 0.15), hoef, { knik: -8 }); poot(ctx, 62, -96, 15, _dk(kleur, 0.15), hoef);
  ctx.fillStyle = kleur; zacht(ctx, [[-100, -150], [-60, -164], [30, -162], [80, -168], [96, -140], [88, -104], [40, -96 + b * 0.2], [-20, -94 - 0 + b], [-80, -100], [-104, -122]]); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-98, -154); ctx.lineTo(-112, -170); ctx.lineTo(-100, -146); ctx.closePath(); ctx.fill();
  if (uier > 0.01) { ctx.save(); ctx.globalAlpha *= uier; ctx.beginPath(); ctx.ellipse(-58, -92, 18, 12, 0, 0, 6.283); ctx.fillStyle = '#E8B4A8'; ctx.fill(); ctx.restore(); }
  poot(ctx, -62, -96, 16, kleur, hoef, { knik: -8 }); poot(ctx, 76, -96, 15, kleur, hoef);
  ctx.fillStyle = kleur; zacht(ctx, [[72, -160], [96, -200], [118, -214], [140, -200], [150, -176], [142, -162], [120, -168], [100, -150]]); ctx.fill();
  ctx.fillStyle = _dk(kleur, 0.25); ctx.beginPath(); ctx.moveTo(140, -168); ctx.lineTo(136, -140); ctx.lineTo(128, -166); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#B8A890'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(112, -212); ctx.quadraticCurveTo(100, -236, 86, -238); ctx.stroke();
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(100, -204, 14, 6, -0.6, 0, 6.283); ctx.fill(); circ(ctx, 126, -198, 4, '#1A1612');
  ctx.restore(); }

// ---------- VARKEN (roze, krulstaartje; staart: 1 = heel, 0.4 = gecoupeerd, wond: 0..1) ----------
function varken(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, kleur = '#F0B4A8', staart = 1, wond = 0, wroet = 0, hangStaart = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  const hoef = '#8A5A50', w = Math.sin(t * 5) * 4 * wroet;
  poot(ctx, -70, -70, 20, _dk(kleur, 0.15), hoef); poot(ctx, 66, -70, 20, _dk(kleur, 0.15), hoef);
  // staart
  if (staart > 0.01) { ctx.strokeStyle = _dk(kleur, 0.1); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-112, -118);
    if (hangStaart > 0.5) { ctx.quadraticCurveTo(-122, -100, -120, -100 + 40 * staart); } else { const L = 26 * staart; ctx.bezierCurveTo(-132, -128, -140, -128 + L * 0.2, -132, -118 + L * 0.3); if (staart > 0.6) ctx.bezierCurveTo(-124, -110, -138, -104, -142, -112); } ctx.stroke();
    if (wond > 0.01) { const ex = hangStaart > 0.5 ? -120 : -136, ey = hangStaart > 0.5 ? -100 + 40 * staart : -122 + 26 * staart * 0.3; circ(ctx, ex, ey, 6 * wond, '#C0392B'); } }
  ctx.fillStyle = kleur; zacht(ctx, [[-114, -110], [-90, -146], [-10, -156], [70, -150], [108, -126], [114, -96], [90, -70], [-30, -64], [-100, -72], [-118, -90]]); ctx.fill();
  poot(ctx, -52, -70, 20, kleur, hoef); poot(ctx, 84, -70, 20, kleur, hoef);
  // kop en snuit
  ctx.save(); ctx.translate(0, w); ctx.fillStyle = kleur; zacht(ctx, [[90, -144], [130, -150], [158, -126], [170, -104], [160, -92], [120, -90], [96, -104]]); ctx.fill();
  roundRect(ctx, 160, -122, 22, 32, 10); ctx.fillStyle = _dk(kleur, 0.12); ctx.fill(); circ(ctx, 172, -112, 3, '#8A5A50'); circ(ctx, 172, -100, 3, '#8A5A50');
  ctx.fillStyle = kleur; ctx.beginPath(); ctx.moveTo(110, -146); ctx.lineTo(128, -176); ctx.lineTo(140, -142); ctx.closePath(); ctx.fill(); ctx.fillStyle = _dk(kleur, 0.18); ctx.beginPath(); ctx.moveTo(118, -150); ctx.lineTo(128, -170); ctx.lineTo(134, -148); ctx.closePath(); ctx.fill();
  circ(ctx, 142, -124, 4, '#1A1612'); ctx.restore();
  ctx.restore(); }

// ---------- SCHAAP (wolbol) ----------
function schaapDg(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, wol = '#ECE6D8', kop = '#2E2A26' } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  poot(ctx, -50, -60, 12, '#2E2A26', '#1A1612'); poot(ctx, 50, -60, 12, '#2E2A26', '#1A1612');
  ctx.fillStyle = wol; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.arc(Math.cos(an) * 72, -112 + Math.sin(an) * 40, 26, 0, 6.283); ctx.fill(); } ctx.beginPath(); ctx.ellipse(0, -112, 76, 46, 0, 0, 6.283); ctx.fill();
  poot(ctx, -34, -60, 12, kop, '#1A1612'); poot(ctx, 66, -60, 12, kop, '#1A1612');
  ctx.fillStyle = kop; zacht(ctx, [[70, -140], [104, -156], [124, -132], [116, -112], [90, -112]]); ctx.fill(); ctx.beginPath(); ctx.ellipse(84, -146, 16, 6, -0.5, 0, 6.283); ctx.fill(); circ(ctx, 104, -138, 3, '#F2EEE6');
  ctx.restore(); }

// ---------- KIP ----------
function kip(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, kleur = '#E8DFCC', dood = 0 } = o; if (a <= 0.01) return; _start(ctx, x, y, s, kijk, a);
  if (dood > 0.5) ctx.globalAlpha *= 0.55;
  ctx.strokeStyle = '#D8A040'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -34); ctx.lineTo(-10, 0); ctx.moveTo(8, -34); ctx.lineTo(10, 0); ctx.stroke();
  ctx.fillStyle = kleur; zacht(ctx, [[-50, -70], [-30, -84], [20, -80], [40, -96], [52, -110], [62, -96], [50, -60], [20, -34], [-30, -36], [-56, -50]]); ctx.fill();
  ctx.fillStyle = _dk(kleur, 0.12); zacht(ctx, [[-60, -76], [-74, -104], [-50, -86]]); ctx.fill();
  ctx.fillStyle = '#C0392B'; zacht(ctx, [[44, -110], [48, -122], [54, -114], [58, -124], [62, -110]]); ctx.fill(); ctx.beginPath(); ctx.ellipse(60, -88, 4, 7, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#E0A43A'; ctx.beginPath(); ctx.moveTo(62, -102); ctx.lineTo(74, -98); ctx.lineTo(62, -94); ctx.closePath(); ctx.fill();
  if (dood > 0.5) { kruisje(ctx, 50, -100, 6, '#1A1612'); } else circ(ctx, 52, -100, 3, '#1A1612');
  ctx.restore(); }
function kruisje(ctx, x, y, r, col) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); }

// ---------- kleine voorwerpen ----------
// telefoon met melding
function telefoon(ctx, x, y, s = 1, a = 1, melding = '', u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -130, 140, 260, 20); shape(ctx, '#1C2230', '#5A6478', 3); roundRect(ctx, -60, -114, 120, 228, 10); shape(ctx, '#26324A', null);
  if (melding && u > 0.01) { ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, -54, -96 + (1 - u) * -20, 108, 70, 10); shape(ctx, '#F2EEE4', null); ctx.font = fTekst(15, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, melding, -46, -72, 92, 18); ctx.restore(); }
  ctx.restore(); }
// sensor (halsband met kastje)
function halsband(ctx, x, y, s = 1, a = 1, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#3A6EA5'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(0, 0, 16, 36, 0.3, 0, 6.283); ctx.stroke(); roundRect(ctx, -12, 26, 24, 22, 4); shape(ctx, '#E0B64A', '#F2D27A', 1.5); if (puls > 0.01) { ctx.strokeStyle = rgba(C.goud, puls); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 37, 20 + puls * 18, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// stethoscoopkop met geluidsgolfjes (stil = 0 golfjes)
function luisteren(ctx, x, y, a = 1, golf = 1, t = 0, tekst = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 16, '#9AA3B2', '#D4D8DE', 3);
  if (golf > 0.01) { ctx.strokeStyle = rgba(C.goud, golf); ctx.lineWidth = 3; for (let i = 1; i <= 3; i++) { const r = 24 + i * 16 + ((t * 30) % 16); ctx.beginPath(); ctx.arc(x, y, r, -0.7, 0.7); ctx.stroke(); } }
  if (tekst) tag(ctx, tekst, x + 140, y + 14, C.goud, 1, 'center', 26); ctx.restore(); }
// tablet (pil) met breuklijn; half = 0..1 (helft weg)
function tablet(ctx, x, y, r, a = 1, half = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); if (half > 0.5) ctx.arc(x, y, r, Math.PI / 2, Math.PI * 1.5); else ctx.arc(x, y, r, 0, 6.283); ctx.closePath(); shape(ctx, '#F2F2EE', '#B8C0CC', 2); ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke(); ctx.restore(); }
// gewone hartslag-kaart: rij soorten met waarde en een balkje
function hartTabel(ctx, x, y, rijen, a = 1, nu = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  rijen.forEach(([naam, waarde, frac, col], i) => { const f = clamp(nu * rijen.length - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const yy = y + i * 86;
    regel(ctx, naam, x, yy, 1, C.text, 34, 'left', 600); roundRect(ctx, x + 220, yy - 30, 560, 36, 10); shape(ctx, '#2A3446', null); roundRect(ctx, x + 220, yy - 30, 560 * frac, 36, 10); shape(ctx, rgba(col, 0.7), col, 2); regel(ctx, waarde, x + 800, yy, 1, col, 32, 'left', 700); ctx.restore(); }); ctx.restore(); }

// ---------- arm/poot met homologe botten (mens, hond, paard) ----------
// kleur: opperarm goud, spaakbeen/ellepijp teal, pols/middenhand koraal, vingers paars. h = hoogte in px.
function armBotten(ctx, soort, x, y, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const k = h / 400; ctx.scale(k, k);
  const bot = (x1, y1, x2, y2, w, col, f) => { if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); circ(ctx, x1, y1, w * 0.7, col); circ(ctx, x2, y2, w * 0.7, col); ctx.restore(); };
  const F = (i) => clamp(u * 4 - i, 0, 1);
  if (soort === 'mens') { bot(0, 0, 0, 150, 24, C.goud, F(0)); bot(-8, 160, -14, 290, 14, C.teal, F(1)); bot(10, 160, 14, 290, 14, C.teal, F(1)); bot(0, 300, 0, 330, 20, C.koraal, F(2)); [-24, -10, 4, 18, 30].forEach((dx, i) => bot(dx * 0.6, 336, dx * (i === 0 ? 1.8 : 1.1), 400, 7, C.paars, F(3))); }
  if (soort === 'hond') { bot(0, 0, 20, 130, 22, C.goud, F(0)); bot(20, 140, 6, 270, 13, C.teal, F(1)); bot(30, 140, 18, 270, 11, C.teal, F(1)); bot(12, 280, 18, 320, 16, C.koraal, F(2)); [-8, 4, 16, 28].forEach(dx => bot(18 + dx * 0.4, 326, 30 + dx, 392, 7, C.paars, F(3))); }
  if (soort === 'paard') { bot(0, 0, 30, 100, 26, C.goud, F(0)); bot(30, 110, 22, 230, 18, C.teal, F(1)); bot(22, 240, 22, 262, 18, C.koraal, F(2)); bot(22, 272, 22, 360, 14, C.koraal, F(2)); bot(22, 370, 26, 396, 12, C.paars, F(3)); ctx.save(); ctx.globalAlpha *= F(3); roundRect(ctx, 8, 390, 40, 14, 4); ctx.fillStyle = '#3A3430'; ctx.fill(); ctx.restore(); }
  ctx.restore(); }

// ---------- schema's ----------
// kalender/klok van 21 dagen met een smal tochtvak; p = positie 0..1 van de wijzer
function cyclusKlok(ctx, x, y, r, a = 1, p = 0, o = {}) { const { dagen = 21, tocht = [0, 0.5], label = 'tochtig' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#22304C', C.line, 2); for (let d = 0; d < dagen; d++) { const an = -Math.PI / 2 + d / dagen * 6.283; ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 14), y + Math.sin(an) * (r - 14)); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); }
  const a0 = -Math.PI / 2 + tocht[0] / dagen * 6.283, a1 = -Math.PI / 2 + tocht[1] / dagen * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 4, a0, a1 + 0.04); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fill();
  const an = -Math.PI / 2 + p * 6.283; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 24), y + Math.sin(an) * (r - 24)); ctx.stroke(); circ(ctx, x, y, 8, C.goud);
  regel(ctx, dagen + ' dagen', x, y + r + 44, 1, C.text2, 28, 'center', 600); ctx.restore(); }
// staafjes: stappen per dag, met piek op dag 'piek'
function stappenStaaf(ctx, x, y, w, h, a = 1, nu = 1, piek = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14, bw = w / n;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let i = 0; i < n; i++) { const f = clamp(nu * n - i, 0, 1); if (f <= 0) continue; const v = i === piek ? 1 : 0.28 + hash(i * 4.1) * 0.08; const bh = h * v * f; roundRect(ctx, x + i * bw + 4, y - bh, bw - 8, bh, 4); shape(ctx, i === piek ? C.koraal : rgba(C.teal, 0.7), null); }
  metaText(ctx, 'STAPPEN PER DAG', x, y + 36, C.text2, 'left', 20); ctx.restore(); }
// rietje sperma
function rietje(ctx, x, y, s = 1, a = 1, rot = 0, col = '#5BA4C9') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -70, -6, 140, 12, 6); shape(ctx, col, _lt(col, 0.3), 1.5); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-70, -6, 14, 12); ctx.restore(); }
// vat met vloeibare stikstof (damp)
function stikstofVat(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -220, 180, 220, 30); shape(ctx, '#8A96A8', '#C4CCD8', 2); roundRect(ctx, -40, -250, 80, 40, 10); shape(ctx, '#6A7688', '#C4CCD8', 2);
  for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i * 0.2) % 1; ctx.fillStyle = `rgba(230,240,255,${0.35 * (1 - ph)})`; ctx.beginPath(); ctx.arc(-20 + i * 10 + Math.sin(ph * 6 + i) * 12, -260 - ph * 90, 14 + ph * 16, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// echoscherm met kegel; vrucht met kloppend hartje
function echoScherm(ctx, x, y, w, h, a = 1, t = 0, vrucht = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 16, y - 16, w + 32, h + 32, 14); shape(ctx, '#2A2E36', '#5A6070', 2); roundRect(ctx, x, y, w, h, 6); shape(ctx, '#05070A', null);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x + w / 2, y + 14); ctx.arc(x + w / 2, y + 14, h * 0.92, Math.PI / 2 - 0.65, Math.PI / 2 + 0.65); ctx.closePath(); ctx.clip();
  for (let i = 0; i < 900; i++) { const px = x + hash(i * 1.3) * w, py = y + hash(i * 2.7) * h; ctx.fillStyle = `rgba(200,205,210,${0.06 + hash(i * 5.3) * 0.18})`; ctx.fillRect(px, py, 2, 2); }
  const cx = x + w / 2, cy = y + h * 0.58; ctx.fillStyle = '#05070A'; ctx.beginPath(); ctx.ellipse(cx, cy, w * 0.22, h * 0.17, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = 'rgba(220,225,230,0.6)'; ctx.lineWidth = 3; ctx.stroke();
  if (vrucht > 0.01) { ctx.globalAlpha *= vrucht; ctx.fillStyle = 'rgba(220,225,230,0.75)'; ctx.beginPath(); ctx.ellipse(cx - 10, cy + 6, w * 0.08, h * 0.05, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(cx + w * 0.07, cy - 6, h * 0.045, 0, 6.283); ctx.fill();
    const hb = 0.5 + 0.5 * Math.max(0, Math.sin(t * 13)); circ(ctx, cx - 4, cy + 2, 4 + hb * 4, `rgba(255,255,255,${0.5 + hb * 0.5})`); }
  ctx.restore(); ctx.restore(); }
// kalf in de baarmoeder: 'voor' = voorpoten + kop naar buiten (zolen omlaag), 'achter' = achterpoten (zolen omhoog)
function kalfLigging(ctx, x, y, s, ligging = 'voor', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 140, 0, 0, 6.283); shape(ctx, rgba('#C98A7A', 0.25), '#C98A7A', 3); ctx.beginPath(); ctx.moveTo(220, -30); ctx.lineTo(320, -24); ctx.moveTo(220, 30); ctx.lineTo(320, 24); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 3; ctx.stroke();
  const k = '#A8784E'; ctx.fillStyle = k;
  if (ligging === 'voor') { zacht(ctx, [[-170, -40], [-60, -80], [60, -60], [120, -20], [110, 40], [-20, 70], [-160, 50]]); ctx.fill(); zacht(ctx, [[110, -40], [190, -36], [220, -12], [196, 10], [120, 10]]); ctx.fill(); circ(ctx, 180, -24, 5, '#1A1410');
    ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(100, 20); ctx.lineTo(240, 18); ctx.moveTo(100, 40); ctx.lineTo(250, 34); ctx.stroke(); ctx.fillStyle = '#3A3430'; roundRect(ctx, 238, 8, 22, 20, 4); ctx.fill(); roundRect(ctx, 248, 24, 22, 20, 4); ctx.fill(); }
  else { zacht(ctx, [[170, -40], [60, -80], [-60, -60], [-120, -20], [-110, 40], [20, 70], [160, 50]]); ctx.fill(); zacht(ctx, [[-110, -40], [-190, -36], [-220, -12], [-196, 10], [-120, 10]]); ctx.fill(); circ(ctx, -180, -24, 5, '#1A1410');
    ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -30); ctx.lineTo(240, -18); ctx.moveTo(150, -10); ctx.lineTo(250, -2); ctx.stroke(); ctx.fillStyle = '#3A3430'; roundRect(ctx, 238, -32, 22, 20, 4); ctx.fill(); roundRect(ctx, 248, -16, 22, 20, 4); ctx.fill(); }
  ctx.restore(); }
// virus met spikes (sleutel) en cel met receptoren (slot); past = true/false
function virusDg(ctx, x, y, r, a = 1, col = C.koraal, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283 + t * 0.2; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * (r + 14), y + Math.sin(an) * (r + 14)); ctx.stroke(); circ(ctx, x + Math.cos(an) * (r + 16), y + Math.sin(an) * (r + 16), 5, col); } circ(ctx, x, y, r, rgba(col, 0.35), col, 3); ctx.restore(); }
// celoppervlak (stukje van een cirkel) met receptoren; vorm 'rond' of 'hoek'
function celRand(ctx, cx, cy, R, an0, an1, vorm, a = 1, col = C.teal, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, R, an0, an1); ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, R - 14, an0, an1); ctx.strokeStyle = rgba(col, 0.4); ctx.lineWidth = 6; ctx.stroke();
  for (let k = 0; k < 5; k++) { const an = an0 + (k + 0.5) / 5 * (an1 - an0), px = cx + Math.cos(an) * (R + 6), py = cy + Math.sin(an) * (R + 6); ctx.save(); ctx.translate(px, py); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = C.goud; if (vorm === 'rond') { ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(-12, -22); ctx.arc(0, -22, 12, Math.PI, 0, true); ctx.lineTo(12, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.arc(0, -24, 6, 0, 6.283); ctx.fill(); } else { ctx.fillRect(-12, -26, 24, 26); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.moveTo(-6, -26); ctx.lineTo(0, -16); ctx.lineTo(6, -26); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
// staafgrafiek in een paneel: waarden 0..1, labels onder
function staafGrafiek(ctx, x, y, w, h, waarden, labels, a = 1, nu = 1, col = C.koraal, titel = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = waarden.length, bw = w / n;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  waarden.forEach((v, i) => { const f = clamp(nu * n - i, 0, 1); if (f <= 0) return; const bh = h * v * f; roundRect(ctx, x + i * bw + bw * 0.18, y - bh, bw * 0.64, bh, 6); shape(ctx, rgba(Array.isArray(col) ? col[i] : col, 0.75), Array.isArray(col) ? col[i] : col, 2); if (labels[i]) regel(ctx, labels[i], x + i * bw + bw / 2, y + 36, 1, C.text2, 24, 'center', 600); });
  if (titel) metaText(ctx, titel, x, y - h - 20, C.text2, 'left', 20); ctx.restore(); }
// kaartje met kopje (voor rijtjes oorzaken/maatregelen)
function kaartje(ctx, x, y, w, s2, col = C.teal, a = 1, px = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 700); const h = px + 40; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + h / 2 + px * 0.35, fTekst(px, 700), C.text, 'center'); ctx.restore(); }
// stal: eenvoudige schuur met dak (achtergrond)
function stal(ctx, x, y, w, h, a = 1, o = {}) { const { kleur = '#3A4660', dak = '#2A3348' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = kleur; ctx.fillRect(x, y - h, w, h); ctx.fillStyle = dak; ctx.beginPath(); ctx.moveTo(x - 30, y - h); ctx.lineTo(x + w / 2, y - h - h * 0.45); ctx.lineTo(x + w + 30, y - h); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 2; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 12, y - h); ctx.lineTo(x + i * w / 12, y); ctx.stroke(); } ctx.restore(); }
// grondlijn met stro
function stro(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(201,163,92,0.35)'; ctx.fillRect(x, y, w, 24); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 2; for (let i = 0; i < w / 9; i++) { const px = x + hash(i * 1.7) * w, an = hash(i * 3.3) * 1.4 - 0.7; ctx.beginPath(); ctx.moveTo(px, y + 4 + hash(i) * 16); ctx.lineTo(px + Math.cos(an) * 22, y + 4 + hash(i) * 16 + Math.sin(an) * 8); ctx.stroke(); } ctx.restore(); }
// Bestaat dit echt? — dierenbibliotheek volgens Part C9 (tekenrecept Dieren), 22 okt 2026
// Elk dier: f(ctx, x, y, s, o). Anker (x, y) = midden onder het dier; kop naar rechts (kijk: -1 spiegelt).
// Redelijk realistisch maar vlak getekend: echte verhoudingen, echt oog, 2–3 kenmerken met detail, geen verlopen.

function _bd(ctx, x, y, s, kijk = 1, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s * kijk, s); }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
// echt dierenoog: iris in eigen kleur, pupil in de juiste vorm, één klein lichtpuntje
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
// patroon binnen een vorm (vlekken, rimpels): eerst clippen op P
function binnen(ctx, P, fn) { ctx.save(); zacht(ctx, P); ctx.clip(); fn(); ctx.restore(); }

// ================= 1. BEERDIERTJE (Micro) =================
// Ramazzottius/Hypsibius-achtig: tonvormig lijf ±4:1, 5 segmenten, 4 paar stompe poten met klauwtjes (4e paar achteraan, naar achter), kop met snuit en 2 oogvlekjes.
// o: t (lopen), tun 0..1 (opgerold tot tonnetje), kijk, a
function beerdiertje(ctx, x, y, s = 1, o = {}) { const { t = 0, tun = 0, kijk = 1, a = 1, darm = '#7A8A4A' } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const L = lerp(1, 0.56, tun), Hh = lerp(1, 1.08, tun); ctx.scale(L, Hh);
  const huid = '#D8B88E', rand = '#F0D8B4', donker = '#A88660';
  // poten (ver = donker, eerst)
  const potX = [130, 40, -50], ph = [0, 2.1, 4.2];
  const poot_ = (px, py, ang, len, ver, fase) => { const sw = Math.sin(t * 5 + fase) * 0.22 * (1 - tun); const an = ang + sw; const k = 1 - tun * 0.85;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an); const col = ver ? donker : huid;
    roundRect(ctx, -17, -6, 34, len * k + 6, 15); ctx.fillStyle = col; ctx.fill(); if (!ver) { ctx.strokeStyle = rand; ctx.lineWidth = 1.5; ctx.stroke(); }
    if (k > 0.3) { ctx.strokeStyle = ver ? '#5A4630' : '#4A3A28'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = -1; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 6 - 2, len * k - 2); ctx.quadraticCurveTo(i * 8 + 4, len * k + 14, i * 9 + 12, len * k + 10); ctx.stroke(); } }
    ctx.restore(); };
  potX.forEach((px, i) => poot_(px + 18, -62, 0.18, 46, true, ph[i] + 3.1)); poot_(-150, -78, 0.9, 40, true, 1);
  // lijf
  const R = [[-175, -95], [-150, -150], [-95, -178], [-30, -186], [40, -184], [105, -172], [158, -146], [190, -112], [206, -78], [198, -56], [160, -48], [100, -44], [20, -42], [-60, -44], [-130, -50], [-178, -66]];
  vul(ctx, R, huid, rand, 2.5);
  binnen(ctx, R, () => { // darm met voedsel (doorschijnend) en segmentplooien
    ctx.globalAlpha *= 0.55; vul(ctx, [[-120, -100], [-60, -128], [40, -132], [120, -118], [150, -100], [110, -84], [20, -82], [-80, -84]], darm); ctx.globalAlpha /= 0.55;
    ctx.strokeStyle = donker; ctx.lineWidth = 2.5; [-120, -60, 0, 60, 118].forEach((sx, i) => { ctx.beginPath(); ctx.moveTo(sx - 6, -190); ctx.quadraticCurveTo(sx + 14, -120, sx - 4, -40); ctx.stroke(); });
    ctx.fillStyle = 'rgba(255,240,215,0.35)'; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(-160 + hash(i * 3.1) * 340, -175 + hash(i * 5.7) * 120, 3 + hash(i) * 4, 0, 6.283); ctx.fill(); } });
  // snuit (mondkegel) en oogvlekjes
  vul(ctx, [[188, -104], [216, -96], [226, -82], [214, -70], [196, -70]], rand, donker, 1.5);
  circ(ctx, 172, -128, 5.5, '#2A1C14'); circ(ctx, 158, -124, 4, 'rgba(42,28,20,0.55)');
  potX.forEach((px, i) => poot_(px, -56, -0.06, 50, false, ph[i])); poot_(-168, -70, 1.05, 44, false, 0.5);
  if (tun > 0.05) { ctx.globalAlpha *= tun; ctx.strokeStyle = donker; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { const sx = -150 + i * 50; ctx.beginPath(); ctx.moveTo(sx, -175); ctx.quadraticCurveTo(sx + 8 + hash(i) * 10, -110, sx - 4, -50); ctx.stroke(); } }
  ctx.restore(); }

// ================= 2. AXOLOTL (Macro, onder water) =================
// Leucistisch roze (o.kleur 'wild' = donker olijf). Kop ±1/5 van de lengte, staart ±45% met vinzoom vanaf de nek,
// 3 paar uitwendige kieuwen met veertjes, klein lidloos oog, 4 vingers voor / 5 tenen achter.
// o: t, kleur, poot (0..1 groei van de voorpoot: regeneratie), kijk, a
function axolotl(ctx, x, y, s = 1, o = {}) { const { t = 0, kleur = 'roze', poot = 1, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = kleur === 'roze' ? '#EEC3BC' : '#5E6648', buik = kleur === 'roze' ? '#F6D8D2' : '#8A8E6E', rand = kleur === 'roze' ? '#D9A49C' : '#454C36', kieuw = kleur === 'roze' ? '#D96A7A' : '#7A4A52';
  const golf = (u) => Math.sin(t * 2.2 - u * 3) * 6;
  const potenTek = (ver) => { const col = ver ? _dk(huid, 0.18) : huid; // achterpoot en voorpoot, naar onder en opzij
    const vp = (px, py, len, n, sch, rot) => { ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.scale(sch, sch); roundRect(ctx, -9, 0, 18, len * 0.55, 8); ctx.fillStyle = col; ctx.fill(); ctx.translate(0, len * 0.55); ctx.rotate(0.9); roundRect(ctx, -8, -4, 16, len * 0.5, 7); ctx.fill();
      ctx.translate(0, len * 0.5); for (let i = 0; i < n; i++) { const an = -0.9 + i * (1.8 / (n - 1)); ctx.save(); ctx.rotate(an); roundRect(ctx, -3, 0, 6, 15, 3); ctx.fill(); ctx.restore(); } ctx.restore(); };
    if (ver) { vp(-70, -44, 60, 5, 1, 0.6); vp(118, -40, 54, 4, 1, 0.5); } else { vp(-88, -38, 64, 5, 1, 0.35); if (poot > 0.02) vp(100, -34, 58, 4, poot, 0.25); } };
  potenTek(true);
  // staart met vin
  const VIN = [[-60, -86], [-140, -104 + golf(0.3)], [-220, -96 + golf(0.6)], [-290, -70 + golf(0.9)], [-300, -58 + golf(1)], [-280, -40 + golf(0.9)], [-210, -24 + golf(0.6)], [-130, -26 + golf(0.3)], [-60, -38]];
  ctx.globalAlpha *= 0.8; vul(ctx, VIN, _lt(huid, 0.15), rand, 1.5); ctx.globalAlpha /= 0.8;
  vul(ctx, [[110, -98], [40, -102], [-40, -98]], null, rand, 1.5, false); // rugvin-zoom
  const LIJF = [[-280, -62 + golf(1)], [-200, -74 + golf(0.6)], [-120, -82 + golf(0.3)], [-40, -86], [40, -88], [110, -90], [150, -98], [190, -104], [228, -96], [248, -78], [244, -58], [222, -42], [180, -36], [120, -32], [40, -30], [-50, -32], [-130, -42 + golf(0.3)], [-210, -50 + golf(0.6)]];
  vul(ctx, LIJF, huid, rand, 2);
  binnen(ctx, LIJF, () => { vul(ctx, [[-200, -44], [-60, -40], [80, -38], [200, -40], [240, -52], [240, 0], [-220, 0]], buik);
    if (kleur === 'wild') { ctx.fillStyle = 'rgba(30,34,22,0.5)'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-260 + hash(i * 2.3) * 500, -100 + hash(i * 4.1) * 60, 3 + hash(i) * 5, 0, 6.283); ctx.fill(); } }
    ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const sx = -40 + i * 16; ctx.beginPath(); ctx.moveTo(sx, -84); ctx.lineTo(sx + 2, -40); ctx.stroke(); } });
  // mond (licht omhoog lopende mondlijn, geen lach) en oog
  lijn(ctx, [[246, -66], [226, -60], [196, -60]], _dk(huid, 0.35), 2.5);
  dierOog(ctx, 208, -86, 7, kleur === 'roze' ? '#3A1E22' : '#C9A35C', { pupil: kleur === 'roze' ? 'vol' : 'rond', rand: _dk(huid, 0.2) });
  // kieuwen: 3 stelen per kant met veertjes
  [[-0.95, 66], [-1.35, 74], [-1.75, 62]].forEach(([an0, len], i) => { const ax = 150 - i * 6, ay = -92 + i * 10; const an = an0 + Math.sin(t * 1.6 + i) * 0.06 - 0.5;
    const ex = ax + Math.cos(an + Math.PI) * len * -1, ey = ay + Math.sin(an) * len;
    const p = [[ax, ay], [ax - len * 0.45, ay - len * 0.55 + i * 18], [ax - len * 0.95, ay - len * 0.7 + i * 30]];
    lijn(ctx, p, kieuw, 7); const n = 9; for (let k = 1; k <= n; k++) { const u = k / (n + 1); const qx = lerp(lerp(p[0][0], p[1][0], u), lerp(p[1][0], p[2][0], u), u), qy = lerp(lerp(p[0][1], p[1][1], u), lerp(p[1][1], p[2][1], u), u);
      ctx.strokeStyle = _lt(kieuw, 0.15); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(qx - 4, qy - 13 - (1 - u) * 4); ctx.moveTo(qx, qy); ctx.lineTo(qx - 10, qy + 8); ctx.stroke(); } });
  potenTek(false);
  ctx.restore(); }

// ================= 5. OCTOPUS (Octopus vulgaris) =================
// 3/4-aanzicht: mantel achter de kop, oog met liggende rechthoekige pupil en gouden iris, 8 armen met twee rijen zuignappen.
// o.kleur (hex), o.vlek 0..1 (donkere chromatofoorvlekjes), o.papillen 0..1, t
function octopus(ctx, x, y, s = 1, o = {}) { const { t = 0, kleur = '#B0603E', vlek = 0.5, papillen = 0.4, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const licht = _lt(kleur, 0.35), donker = _dk(kleur, 0.3), nap = '#F0D8C8';
  const arm = (i, n, ver) => { const basis = -60 + i * 18, ang = -2.6 + i * 0.7; const len = 230 + hash(i) * 50; const pts = [];
    for (let k = 0; k <= 12; k++) { const u = k / 12; const kr = Math.sin(t * 1.3 + i * 1.7 + u * 3) * 0.5 * u + (i % 2 ? 1 : -1) * u * u * 1.4; const an = ang + kr; pts.push([basis * (1 - u) + Math.cos(an) * len * u, -70 + Math.sin(an) * len * u * 0.55 + u * 90]); }
    ctx.lineCap = 'round'; for (let k = 0; k < 12; k++) { const w = lerp(34, 5, k / 12); ctx.strokeStyle = ver ? donker : kleur; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(pts[k][0], pts[k][1]); ctx.lineTo(pts[k + 1][0], pts[k + 1][1]); ctx.stroke(); }
    if (!ver) for (let k = 2; k < 12; k++) { const r = lerp(7, 2, k / 12); const dx = pts[k + 1][0] - pts[k][0], dy = pts[k + 1][1] - pts[k][1], d = Math.hypot(dx, dy) || 1; const nx = -dy / d, ny = dx / d; const off = lerp(12, 2, k / 12);
      circ(ctx, pts[k][0] + nx * off, pts[k][1] + ny * off, r, nap, _dk(nap, 0.2), 1); circ(ctx, (pts[k][0] + pts[k + 1][0]) / 2 + nx * off * 0.6, (pts[k][1] + pts[k + 1][1]) / 2 + ny * off * 0.6, r * 0.8, nap, _dk(nap, 0.2), 1); } };
  [1, 3, 5, 7].forEach(i => arm(i, 8, true));
  vul(ctx, [[-90, -96], [70, -100], [96, -50], [56, -24], [20, -40], [-16, -18], [-52, -38], [-96, -30]], _dk(kleur, 0.08), licht, 1.5); // huidscherm tussen de armen
  // mantel (zak) schuin naar achter-boven, met kop
  const M = [[-40, -120], [-120, -200], [-150, -290], [-110, -350], [-30, -350], [30, -300], [60, -230], [70, -160], [50, -100], [0, -80], [-40, -90]];
  vul(ctx, M, kleur, licht, 2.5);
  binnen(ctx, M, () => { ctx.fillStyle = rgba('#3A1408', 0.55 * vlek); for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(-160 + hash(i * 2.9) * 240, -360 + hash(i * 1.3) * 280, 3 + hash(i * 5) * 7, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#F4D8C4', 0.5 * papillen); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-150 + hash(i * 7.1) * 220, -350 + hash(i * 3.3) * 260, 2 + hash(i) * 3, 0, 6.283); ctx.fill(); } });
  // oogheuvel en oog
  vul(ctx, [[10, -190], [52, -206], [78, -180], [70, -148], [36, -142], [12, -160]], kleur, licht, 2);
  dierOog(ctx, 46, -174, 17, '#D8B44A', { pupil: 'liggend', rand: _dk(kleur, 0.15) });
  // sifon
  vul(ctx, [[-50, -110], [-86, -118], [-96, -104], [-60, -96]], donker);
  [0, 2, 4, 6].forEach(i => arm(i, 8, false));
  ctx.restore(); }

// ================= 6. VOGELBEKDIER =================
// Zijaanzicht ±45 cm: platte, zachte snavel (leerachtig grijszwart), kop met oog én oor in één groef, gestroomlijnd bruin lijf,
// platte bever-achtige staart, voorvoeten met zwemvlies tot voorbij de nagels, achtervoet met spoor (mannetje).
function vogelbekdier(ctx, x, y, s = 1, o = {}) { const { t = 0, zwem = 0, spoor = 1, kijk = 1, a = 1, ogenDicht = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const vacht = '#6B4A32', buik = '#A88462', snavel = '#3A3A3C', snavelL = '#5A5A5E';
  const voet = (px, py, ver, voor) => { const col = ver ? _dk(vacht, 0.25) : _dk(vacht, 0.1); const sw = Math.sin(t * 4 + (voor ? 0 : 3) + (ver ? 3 : 0)) * (zwem ? 0.35 : 0.12);
    ctx.save(); ctx.translate(px, py); ctx.rotate(sw + (zwem ? (voor ? 0.9 : 1.2) : 0)); roundRect(ctx, -10, 0, 20, 30, 9); ctx.fillStyle = col; ctx.fill();
    if (voor) { vul(ctx, [[-22, 26], [26, 26], [34, 42], [12, 48], [-6, 48], [-28, 42]], ver ? '#2E2A28' : '#45403C'); ctx.strokeStyle = '#D8D0C0'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-18 + i * 10, 38); ctx.lineTo(-20 + i * 10, 46); ctx.stroke(); } }
    else { vul(ctx, [[-30, 24], [18, 22], [24, 34], [-36, 36]], ver ? '#2E2A28' : '#45403C'); if (spoor && !ver) { ctx.fillStyle = '#E8DCC0'; ctx.beginPath(); ctx.moveTo(12, 8); ctx.lineTo(28, 2); ctx.lineTo(14, 16); ctx.closePath(); ctx.fill(); } } ctx.restore(); };
  voet(-90, -44, true, false); voet(80, -40, true, true);
  // staart
  vul(ctx, [[-150, -78], [-215, -82], [-262, -70], [-270, -52], [-246, -38], [-196, -38], [-150, -48]], _dk(vacht, 0.15), _lt(vacht, 0.15), 2);
  const L = [[-160, -76], [-110, -100], [-30, -110], [50, -108], [110, -96], [150, -84], [176, -72], [180, -52], [160, -40], [100, -32], [20, -28], [-60, -30], [-130, -40], [-165, -56]];
  vul(ctx, L, vacht, _lt(vacht, 0.2), 2);
  binnen(ctx, L, () => { vul(ctx, [[-170, -46], [-80, -44], [40, -40], [140, -46], [190, -50], [190, 0], [-180, 0]], buik); ctx.strokeStyle = rgba('#2A1A10', 0.22); ctx.lineWidth = 1.6; for (let i = 0; i < 60; i++) { const px = -160 + hash(i * 1.7) * 330, py = -108 + hash(i * 2.9) * 60; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 8, py + 3); ctx.stroke(); } });
  // snavel: plat, breed, met lichtere rand en neusgaten bovenop
  vul(ctx, [[166, -82], [210, -88], [262, -86], [290, -74], [292, -60], [264, -54], [214, -54], [172, -58]], snavel, snavelL, 2);
  lijn(ctx, [[176, -68], [230, -70], [286, -66]], '#2A2A2C', 1.5); circ(ctx, 262, -80, 2.5, '#1A1A1A'); circ(ctx, 252, -80, 2.5, '#1A1A1A');
  // groef met oog en oor
  vul(ctx, [[140, -86], [162, -90], [170, -80], [150, -76]], _dk(vacht, 0.35)); dierOog(ctx, 156, -84, 4.5, '#1A1210', { dicht: ogenDicht, lid: _dk(vacht, 0.35) });
  voet(-70, -40, false, false); voet(100, -36, false, true);
  ctx.restore(); }

// ================= 7. NAAKTE MOLRAT =================
// ±9 cm, roze gerimpelde huid met enkele haartjes, knaagtanden buiten de lippen, piepkleine oogjes, korte pootjes, dunne staart (±1/3).
function molrat(ctx, x, y, s = 1, o = {}) { const { t = 0, kijk = 1, a = 1, kleur = '#E4B0A0', koningin = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = kleur, plooi = _dk(kleur, 0.22), poot = _dk(kleur, 0.08);
  const pootje = (px, ver, f) => { const sw = Math.sin(t * 8 + f) * 0.3; ctx.save(); ctx.translate(px, -30); ctx.rotate(sw * 0.4); roundRect(ctx, -9, 0, 18, 30, 8); ctx.fillStyle = ver ? plooi : poot; ctx.fill(); vul(ctx, [[-12, 26], [16, 24], [20, 32], [-14, 34]], ver ? plooi : _lt(poot, 0.15)); ctx.restore(); };
  pootje(-70, true, 3); pootje(90, true, 0);
  lijn(ctx, [[-150, -50], [-200, -44], [-240, -36 + Math.sin(t * 3) * 6]], plooi, 6);
  const lengte = 1 + koningin * 0.35; ctx.save(); ctx.scale(lengte, 1);
  const L = [[-150, -60], [-120, -100], [-40, -118], [50, -116], [120, -104], [160, -86], [178, -64], [176, -46], [150, -32], [60, -26], [-40, -26], [-120, -32], [-150, -44]];
  vul(ctx, L, huid, _lt(huid, 0.2), 2);
  binnen(ctx, L, () => { ctx.strokeStyle = plooi; ctx.lineWidth = 2.2; for (let i = 0; i < 16; i++) { const sx = -140 + i * 19; ctx.beginPath(); ctx.moveTo(sx + hash(i) * 6, -120); ctx.quadraticCurveTo(sx + 10, -74, sx - 2 + hash(i * 3) * 8, -24); ctx.stroke(); }
    ctx.strokeStyle = rgba('#F6E0D6', 0.7); ctx.lineWidth = 1; for (let i = 0; i < 14; i++) { const px = -130 + hash(i * 4.3) * 290, py = -110 + hash(i * 6.1) * 70; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 3, py - 12); ctx.stroke(); } });
  ctx.restore();
  // kop: stompe snuit, knaagtanden (2 boven, 2 onder) buiten de lippen, snorharen
  vul(ctx, [[150, -100], [192, -96], [214, -78], [212, -56], [190, -44], [160, -44]], huid, _lt(huid, 0.2), 2);
  ctx.fillStyle = '#E8D8A0'; roundRect(ctx, 204, -70, 10, 24, 3); ctx.fill(); roundRect(ctx, 202, -48, 9, 20, 3); ctx.fill(); ctx.strokeStyle = '#B8A060'; ctx.lineWidth = 1; ctx.stroke();
  circ(ctx, 182, -84, 2.5, '#2A1A16'); ctx.strokeStyle = rgba('#F6E8E0', 0.8); ctx.lineWidth = 1.2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(200, -66 + i * 4); ctx.lineTo(236, -76 + i * 9); ctx.stroke(); }
  pootje(-50, false, 0); pootje(110, false, 3);
  ctx.restore(); }

// ================= 8. ONSTERFELIJKE KWAL (Turritopsis dohrnii) =================
// Kwal ±4,5 mm: doorzichtig klokje met een felrode maag (manubrium) in het midden en tot ±90 tentakels langs de rand.
// o.puls (t), o.terug 0..1: klokje krimpt tot een bolletje (cyste). Poliep: poliep(ctx, …)
function kwalT(ctx, x, y, s = 1, o = {}) { const { t = 0, terug = 0, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a);
  const p = Math.sin(t * 3) * 0.06 * (1 - terug); const sw = lerp(1, 0.45, terug), sh = lerp(1.45, 0.7, terug);
  ctx.save(); ctx.scale(sw * (1 + p), sh * (1 - p));
  const n = 44; for (let i = 0; i < n; i++) { const u = i / (n - 1), bx = lerp(-118, 118, u), len = lerp(160, 40, terug) * (0.75 + hash(i) * 0.4); ctx.strokeStyle = rgba('#E8E2D0', 0.55 * (1 - terug * 0.8)); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(bx, 0);
    for (let k = 1; k <= 8; k++) { const v = k / 8; ctx.lineTo(bx + Math.sin(t * 1.5 + i + v * 4) * 10 * v + (bx * 0.12) * v, len * v); } ctx.stroke(); }
  const KLOK = [[-120, 2], [-118, -60], [-90, -118], [-40, -150], [0, -156], [40, -150], [90, -118], [118, -60], [120, 2], [80, -6], [0, -10], [-80, -6]];
  vul(ctx, KLOK, 'rgba(210,225,235,0.18)', 'rgba(230,240,248,0.75)', 2.5);
  ctx.strokeStyle = 'rgba(230,240,248,0.35)'; ctx.lineWidth = 1.5; [-60, -20, 20, 60].forEach(kx => { ctx.beginPath(); ctx.moveTo(kx * 1.6, -2); ctx.quadraticCurveTo(kx * 1.2, -110, 0, -128); ctx.stroke(); });
  // rode maag (kruisvormig manubrium) met gonaden
  vul(ctx, [[-22, -120], [22, -120], [34, -70], [26, -30], [8, -14], [-8, -14], [-26, -30], [-34, -70]], '#C8322E', '#E8705A', 2);
  vul(ctx, [[-30, -100], [-52, -60], [-34, -40]], 'rgba(220,90,60,0.6)'); vul(ctx, [[30, -100], [52, -60], [34, -40]], 'rgba(220,90,60,0.6)');
  ctx.restore(); ctx.restore(); }
// poliepkolonie: kruipende stolon op de bodem, met staande poliepjes (knotsje met tentakelkrans)
function poliep(ctx, x, y, s = 1, o = {}) { const { t = 0, groei = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a);
  lijn(ctx, [[-220, 0], [-120, -6], [0, 2], [120, -4], [220, 0]], '#B89A78', 7);
  [-170, -80, 20, 120, 200].forEach((px, i) => { const g = clamp(groei * 5 - i, 0, 1); if (g <= 0.01) return; const h = (110 + hash(i) * 50) * g; const sw = Math.sin(t + i) * 6;
    lijn(ctx, [[px, 0], [px + sw * 0.5, -h * 0.5], [px + sw, -h]], '#C9A882', 5); ctx.save(); ctx.translate(px + sw, -h); ctx.beginPath(); ctx.ellipse(0, -16, 12, 20, 0, 0, 6.283); ctx.fillStyle = '#E0806A'; ctx.fill();
      for (let k = 0; k < 12; k++) { const an = -Math.PI + k / 11 * Math.PI; ctx.strokeStyle = 'rgba(240,226,206,0.8)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 10, -24 + Math.sin(an) * 6); ctx.lineTo(Math.cos(an) * 30, -26 + Math.sin(an) * 22); ctx.stroke(); } ctx.restore(); });
  ctx.restore(); }

// ================= 9. BOMBARDEERKEVER (Brachinus) — bovenaanzicht =================
// Oranje kop en halsschild, blauwzwarte geribde dekschilden, lange antennes (11 leden), oranje poten.
// o.spuit 0..1 (straal uit de achterlijfspunt), o.richting (hoek van de straal), t
function bombardeerkever(ctx, x, y, s = 1, o = {}) { const { t = 0, spuit = 0, richting = Math.PI, a = 1, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, rot);
  const oranje = '#D9772E', oranjeL = '#F0A060', blauw = '#2A3A5E', blauwL = '#4A6A9A';
  // poten (3 paar), schuin naar buiten
  [[-20, -1], [30, -1], [70, -1]].forEach(([py], i) => { [-1, 1].forEach(z => { const sw = Math.sin(t * 9 + i * 2 + (z > 0 ? 3 : 0)) * 0.18; ctx.save(); ctx.translate(z * 30, py); ctx.rotate(z * (0.9 - i * 0.55) + sw); lijn(ctx, [[0, 0], [z * 40, -10], [z * 70, 8 + i * 6]], oranje, 6); ctx.restore(); }); });
  // straal
  if (spuit > 0.01) { ctx.save(); ctx.translate(0, 120); ctx.rotate(richting - Math.PI / 2); const L = 260 * spuit; for (let i = 0; i < 10; i++) { const u = ((t * 6 + i / 10) % 1); const r = lerp(6, 34, u); circ(ctx, Math.sin(i * 2.1) * 10 * u, L * u, r, rgba('#F4EED6', (1 - u) * 0.75)); } ctx.strokeStyle = rgba('#FFF6D8', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, L * 0.5); ctx.stroke(); ctx.restore(); }
  // dekschilden
  const E = [[-48, -10], [-56, 40], [-50, 100], [-24, 126], [0, 130], [24, 126], [50, 100], [56, 40], [48, -10], [0, -16]];
  vul(ctx, E, blauw, blauwL, 2.5); ctx.strokeStyle = rgba(blauwL, 0.6); ctx.lineWidth = 2; [-36, -24, -12, 12, 24, 36].forEach(rx => { ctx.beginPath(); ctx.moveTo(rx, -8); ctx.quadraticCurveTo(rx * 1.1, 60, rx * 0.5, 122); ctx.stroke(); }); ctx.strokeStyle = '#1A2238'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, 130); ctx.stroke();
  // halsschild en kop
  vul(ctx, [[-30, -12], [-36, -40], [-24, -62], [24, -62], [36, -40], [30, -12]], oranje, oranjeL, 2);
  vul(ctx, [[-22, -60], [-26, -84], [-12, -102], [12, -102], [26, -84], [22, -60]], oranje, oranjeL, 2);
  [-1, 1].forEach(z => { circ(ctx, z * 20, -86, 6, '#1A1410'); lijn(ctx, [[z * 8, -100], [z * 18, -116], [z * 12, -124]], '#7A3A18', 4); // kaken
    const P = [[z * 16, -96]]; for (let k = 1; k <= 11; k++) P.push([z * (16 + k * 9 + Math.sin(t * 2 + k * 0.3) * 2), -96 - k * 13 + k * k * 0.5]); lijn(ctx, P, oranje, 3.5); P.forEach((p, k) => k && circ(ctx, p[0], p[1], 3, oranjeL)); });
  ctx.restore(); }

// achtergrond: onderwaterwereld in Macro-look (vlak, lagen, geen verloop)
function onderWater(ctx, t = 0, o = {}) { const { bodem = '#3A4A3A', diep = '#14324A', midden = '#1C4560', licht = '#24587A' } = o;
  ctx.fillStyle = diep; ctx.fillRect(0, 0, W, H); ctx.fillStyle = midden; ctx.fillRect(0, 0, W, 360); ctx.fillStyle = licht; ctx.fillRect(0, 0, W, 140);
  ctx.strokeStyle = 'rgba(160,210,230,0.08)'; ctx.lineWidth = 60; for (let i = 0; i < 5; i++) { const x0 = 200 + i * 380 + Math.sin(t * 0.3 + i) * 30; ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0 - 260, 860); ctx.stroke(); }
  ctx.fillStyle = bodem; zacht(ctx, [[0, 760], [300, 730], [700, 750], [1100, 720], [1500, 745], [1920, 725], [1920, 1080], [0, 1080]]); ctx.fill();
  ctx.fillStyle = _lt(bodem, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.ellipse(hash(i * 3) * W, 770 + hash(i * 7) * 100, 10 + hash(i) * 24, 5 + hash(i) * 6, 0, 0, 6.283); ctx.fill(); } }
function bodemLand(ctx, o = {}) { const { lucht = C.bgMacroSky, heuvel = C.bgMacroHill, voor = C.bgMacroFront } = o; ctx.fillStyle = lucht; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = heuvel; zacht(ctx, [[0, 560], [400, 500], [900, 540], [1400, 490], [1920, 530], [1920, 1080], [0, 1080]]); ctx.fill(); ctx.fillStyle = voor; ctx.fillRect(0, 700, W, 380); }
// Bestaat dit echt? — dierenbibliotheek deel 2 (herzien na de eerste controle, 22 okt 2026)

// ================= 3. BIDSPRINKHAANKREEFT (Odontodactylus scyllarus) =================
// Eén doorlopend lijf (kopborst + 6 achterlijfsegmenten als banden) dat naar achter iets smaller wordt, staartwaaier eraan vast,
// steelogen met middenband, oranje antenneschubben, slagarm gevouwen als een bidsprinkhaan onder de kop (o.slag 0..1).
function bidsprinkhaankreeft(ctx, x, y, s = 1, o = {}) { const { t = 0, slag = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const groen = '#3F8E6A', groenL = '#7FC4A0', groenD = '#2A6A4E', oranje = '#E0603A', rood = '#C8402E', blauw = '#4A9AC8';
  const pootje = (px, ver, i) => { ctx.save(); ctx.translate(px, -46); ctx.rotate(0.15 + Math.sin(t * 3 + i + (ver ? 2 : 0)) * 0.06); lijn(ctx, [[0, 0], [-8, 24], [-2, 44]], ver ? _dk(oranje, 0.3) : oranje, ver ? 4.5 : 5.5); ctx.restore(); };
  [-6, 26, 58].forEach((px, i) => pootje(px + 8, true, i));
  // staartwaaier (telson + uropoden met blauw en oranje)
  vul(ctx, [[-196, -96], [-246, -128], [-276, -118], [-268, -92], [-226, -70]], blauw, '#8AC4E0', 2);
  vul(ctx, [[-196, -58], [-246, -40], [-276, -50], [-268, -74], [-226, -88]], blauw, '#8AC4E0', 2);
  circ(ctx, -250, -116, 6, oranje); circ(ctx, -250, -50, 6, oranje);
  vul(ctx, [[-190, -96], [-248, -92], [-262, -80], [-248, -68], [-190, -62]], groenD, groenL, 2);
  // lijf
  const L = [[-200, -98], [-150, -116], [-80, -124], [0, -126], [60, -124], [120, -118], [168, -106], [192, -86], [186, -62], [150, -50], [80, -44], [0, -44], [-80, -46], [-150, -52], [-200, -64]];
  vul(ctx, L, groen, groenL, 2.5);
  binnen(ctx, L, () => { ctx.strokeStyle = groenL; ctx.lineWidth = 3; [-160, -120, -80, -40, 0, 40].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -130); ctx.quadraticCurveTo(sx + 12, -86, sx, -40); ctx.stroke(); });
    ctx.strokeStyle = groenD; ctx.lineWidth = 2; [-156, -116, -76, -36, 4].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -128); ctx.quadraticCurveTo(sx + 12, -86, sx, -40); ctx.stroke(); });
    for (let i = 0; i < 30; i++) { const cx = 50 + hash(i * 1.9) * 140, cy = -124 + hash(i * 3.7) * 70; circ(ctx, cx, cy, 3 + hash(i * 7) * 3, '#1E3A2C'); circ(ctx, cx, cy, 1.4, '#9FD4B8'); }
    ctx.fillStyle = rgba('#000000', 0.12); ctx.fillRect(-210, -62, 420, 30); });
  // zwempootjes
  for (let i = 0; i < 5; i++) { const px = -170 + i * 40; lijn(ctx, [[px, -48], [px - 8 + Math.sin(t * 6 + i) * 4, -30]], _dk(oranje, 0.1), 4); }
  // kop (vooraan de kopborst): hier groeien ogen, voelsprieten en antenneschubben uit
  const KOP = [[150, -116], [184, -122], [208, -116], [222, -100], [218, -82], [196, -70], [168, -72]];
  vul(ctx, KOP, groen, groenL, 2.5); binnen(ctx, KOP, () => { for (let i = 0; i < 6; i++) circ(ctx, 160 + hash(i * 4.1) * 50, -112 + hash(i * 2.7) * 34, 3, '#1E3A2C'); });
  // antenneschub: oranje peddel, vast aan de zijkant van de kop
  vul(ctx, [[204, -98], [236, -120], [256, -114], [244, -94], [214, -86]], oranje, rood, 2);
  // voelsprieten: twee paar, beginnen aan de voorkant van de kop
  const zw = Math.sin(t * 2) * 6; lijn(ctx, [[214, -108], [252, -146], [310, -160 + zw]], '#E8C9A8', 2.5); lijn(ctx, [[216, -104], [262, -132], [326, -134 + zw]], '#E8C9A8', 2.5);
  lijn(ctx, [[218, -96], [270, -104], [340, -96 - zw * 0.6]], '#E8C9A8', 2); 
  // steelogen met middenband: stelen staan op de kop
  [[196, -116, 0], [186, -118, 1]].forEach(([ex, ey, i]) => { const ox = ex + 10 - i * 6, oy = ey - 30 + i * 4; lijn(ctx, [[ex, ey + 6], [ox, oy + 12]], groenD, 10); ctx.save(); ctx.translate(ox, oy); ctx.rotate(-0.2 + i * 0.25); ctx.beginPath(); ctx.ellipse(0, 0, 12, 16, 0, 0, 6.283); ctx.fillStyle = i ? '#3A6A8A' : '#5A8AAA'; ctx.fill(); ctx.fillStyle = '#C9B896'; ctx.fillRect(-12, -3, 24, 6); ctx.fillStyle = '#0C1014'; ctx.fillRect(-12, -1, 24, 2); ctx.restore(); });
  // slagarm: dij (merus) schuin naar voren-onder, knots erop teruggevouwen; bij de slag klapt de knots naar voren
  const sl = ease(slag); ctx.save(); ctx.translate(168, -60); ctx.rotate(0.55);
  roundRect(ctx, -10, -10, 58, 22, 10); ctx.fillStyle = groenD; ctx.fill(); ctx.strokeStyle = groenL; ctx.lineWidth = 2; ctx.stroke();
  ctx.translate(46, 0); ctx.rotate(lerp(-2.75, -0.55, sl));
  ctx.beginPath(); ctx.ellipse(32, 0, 34, 15, 0, 0, 6.283); ctx.fillStyle = rood; ctx.fill(); ctx.strokeStyle = '#F0A080'; ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, 66, 0, 11, '#F2D6C0', '#C88A70', 2); ctx.restore();
  [-6, 26, 58].forEach((px, i) => pootje(px, false, i));
  ctx.restore(); }

// ================= 4. PISTOOLGARNAAL (Alpheus) =================
// Lijf ±3,5 cm, knalschaar ongeveer half zo lang als het lijf; het beweeglijke vingertje (dactylus) scharniert bovenaan
// de palm en heeft een plunjer die in een kuiltje van de vaste vinger past. o.open 0..1, o.bel 0..1
function pistoolgarnaal(ctx, x, y, s = 1, o = {}) { const { t = 0, open = 0, bel = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const lijf = '#E3A27A', licht = '#F4C8A8', band = '#B8664A', schaar = '#D0703E', schaarL = '#F0A070';
  for (let i = 0; i < 4; i++) { const px = -30 + i * 30; lijn(ctx, [[px, -48], [px - 6, -24], [px - 2, 0]], _dk(lijf, 0.2), 3.5); }
  vul(ctx, [[-170, -78], [-224, -104], [-244, -84], [-234, -58], [-176, -54]], licht, band, 2);
  const LIJF = [[-180, -76], [-140, -98], [-80, -110], [-10, -114], [50, -110], [100, -100], [128, -86], [124, -64], [84, -52], [20, -46], [-60, -46], [-130, -50], [-180, -58]];
  vul(ctx, LIJF, lijf, licht, 2);
  binnen(ctx, LIJF, () => { ctx.strokeStyle = band; ctx.lineWidth = 6; [-150, -110, -70, -30, 10].forEach(sx => { ctx.beginPath(); ctx.moveTo(sx, -120); ctx.quadraticCurveTo(sx + 10, -80, sx, -40); ctx.stroke(); }); });
  // oogkapje met de ogen eronder
  vul(ctx, [[86, -106], [118, -112], [138, -98], [126, -84], [94, -88]], _lt(lijf, 0.2), band, 1.5); circ(ctx, 116, -98, 6, 'rgba(20,10,8,0.55)');
  lijn(ctx, [[128, -100], [210, -150], [290, -140 + Math.sin(t * 2) * 8]], '#E8C9A8', 2); lijn(ctx, [[130, -94], [220, -118], [300, -96 + Math.sin(t * 2 + 1) * 8]], '#E8C9A8', 2);
  // knalschaar
  ctx.save(); ctx.translate(96, -66); lijn(ctx, [[0, 0], [30, -2], [52, 0]], schaar, 13);
  ctx.translate(52, 0);
  vul(ctx, [[0, -26], [50, -34], [110, -30], [130, -14], [176, 0], [180, 10], [130, 18], [70, 24], [8, 20], [-6, -2]], schaar, schaarL, 2); // palm + vaste vinger
  circ(ctx, 132, 2, 6, _dk(schaar, 0.35)); // kuiltje
  ctx.save(); ctx.translate(120, -24); ctx.rotate(-lerp(0, 1.25, ease(open)));
  vul(ctx, [[0, 0], [30, -4], [62, 6], [66, 18], [40, 18], [4, 14]], _dk(schaar, 0.08), schaarL, 2); circ(ctx, 14, 22, 6, _dk(schaar, 0.25)); ctx.restore(); // dactylus met plunjer
  if (bel > 0.01) { const r = 30 * Math.sin(Math.PI * clamp(bel, 0, 1)); circ(ctx, 196, 4, r, 'rgba(220,240,255,0.22)', 'rgba(230,245,255,0.85)', 2); }
  ctx.restore();
  ctx.restore(); }

// ================= 10. LIERVOGEL (Menura novaehollandiae), mannetje =================
// Fazantachtig bruin lijf, roodbruine vleugels, lange sterke grijze poten met grote tenen; staart langer dan het lijf:
// 2 lierveren (S-vormig, licht/donker gebandeerd, zwarte punt), 12 kantachtige draadveren, 2 smalle middenveren.
// o.toon 0..1: staart in rust naar achter → als zilveren sluier naar voren over rug en kop.
function liervogel(ctx, x, y, s = 1, o = {}) { const { t = 0, toon = 0, zing = 0, kijk = 1, a = 1 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const bruin = '#6E5038', bruinL = '#9A7A5A', grijs = '#5E6168', roest = '#A8643A';
  const u = ease(toon), B = [-70, -190];
  const veer = (kop, krom, len, soort, i) => { let ang = kop, px = B[0], py = B[1]; const P = [[px, py]]; const n = 14;
    for (let k = 1; k <= n; k++) { const v = k / n; ang += (soort === 'lier' ? krom * Math.cos(v * Math.PI) : krom) / n; px += Math.cos(ang) * len / n; py += Math.sin(ang) * len / n; P.push([px, py]); }
    if (soort === 'lier') { ctx.lineCap = 'butt'; for (let k = 0; k < n; k++) { ctx.strokeStyle = k === n - 1 ? '#1E1612' : (k % 2 ? '#7A5636' : '#E2CDA8'); ctx.lineWidth = lerp(9, 17, k / n); ctx.beginPath(); ctx.moveTo(P[k][0], P[k][1]); ctx.lineTo(P[k + 1][0], P[k + 1][1]); ctx.stroke(); } }
    else if (soort === 'draad') { lijn(ctx, P, rgba('#DCD8D0', 0.8), 1.4); ctx.strokeStyle = rgba('#CFCAC0', 0.45); ctx.lineWidth = 1; for (let k = 3; k < n; k++) { const [qx, qy] = P[k], dx = P[k][0] - P[k - 1][0], dy = P[k][1] - P[k - 1][1], d = Math.hypot(dx, dy) || 1; const nx = -dy / d * 9, ny = dx / d * 9; ctx.beginPath(); ctx.moveTo(qx + nx, qy + ny); ctx.lineTo(qx, qy); ctx.lineTo(qx - nx, qy - ny); ctx.stroke(); } }
    else lijn(ctx, P, '#3A2E26', 3); };
  const zw = (i) => u > 0.5 ? Math.sin(t * 9 + i) * 0.02 * u : 0; // trillen tijdens de baltsdans
  // draadveren en middenveren: rust = naar achter (iets omlaag), toon = omhoog en naar voren over de kop
  for (let i = 0; i < 12; i++) { const f = i / 11 - 0.5; veer(lerp(Math.PI - 0.42 + f * 0.14, -Math.PI / 2 + f * 1.5, u) + zw(i), lerp(-0.25, 1.2, u), 330 + hash(i) * 30, 'draad', i); }
  veer(lerp(Math.PI - 0.4, -Math.PI / 2 - 0.1, u), lerp(-0.25, 1.1, u), 340, 'mid', 30); veer(lerp(Math.PI - 0.44, -Math.PI / 2 + 0.1, u), lerp(-0.25, 1.1, u), 345, 'mid', 31);
  veer(lerp(Math.PI - 0.5, -Math.PI / 2 - 1.05, u) + zw(40), lerp(0.5, 1.6, u), 320, 'lier', 40); veer(lerp(Math.PI - 0.34, -Math.PI / 2 + 1.0, u) + zw(41), lerp(-0.6, 0.9, u), 320, 'lier', 41);
  // poten: loop (tarsus) schuin, 3 tenen naar voren en 1 naar achter
  [[-6, 0], [18, 1]].forEach(([px, i]) => { const col = i ? grijs : _dk(grijs, 0.2); lijn(ctx, [[px, -128], [px - 6, -70], [px + 4, -8]], col, 9); [[34, 4], [24, -2], [14, 6]].forEach(([dx, dy]) => lijn(ctx, [[px + 4, -6], [px + 4 + dx, dy]], col, 5)); lijn(ctx, [[px + 4, -6], [px - 16, 0]], col, 5); });
  [[-10, 1], [14, 0]].forEach(([px, i]) => { ctx.beginPath(); ctx.ellipse(px, -140, 26, 30, 0.2, 0, 6.283); ctx.fillStyle = i ? _dk(bruin, 0.2) : bruin; ctx.fill(); }); // dijen in de veren
  // lijf (borst omhoog), vleugel, kop
  const L = [[-90, -186], [-50, -224], [10, -238], [60, -246], [92, -270], [110, -298], [132, -312], [154, -306], [158, -288], [140, -270], [124, -244], [110, -206], [80, -164], [30, -136], [-30, -130], [-80, -150]];
  vul(ctx, L, bruin, bruinL, 2);
  binnen(ctx, L, () => { vul(ctx, [[60, -210], [110, -220], [100, -160], [40, -140]], '#8A7A6A'); vul(ctx, [[-70, -200], [-10, -226], [60, -214], [40, -170], [-40, -160]], roest);
    ctx.strokeStyle = rgba('#3A2414', 0.45); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 18, -214 + i * 2); ctx.quadraticCurveTo(-30 + i * 18, -190, -40 + i * 18, -164); ctx.stroke(); } });
  const sn = zing * 0.3; ctx.save(); ctx.translate(156, -296); vul(ctx, [[0, -5], [24, 0], [0, 1]], '#2A2420'); ctx.rotate(sn); vul(ctx, [[0, 1], [20, 3], [0, 5]], '#2A2420'); ctx.restore();
  dierOog(ctx, 138, -298, 5, '#1E1410', { rand: '#7A8494' });
  ctx.restore(); }
// Storyboard 'Bestaat dit echt?' — één keyframe per scène (22 okt 2026)
const OPT = (ctx, letter, tekst, x, y, w, kleur = C.line) => { roundRect(ctx, x, y, w, 96, 18); shape(ctx, rgba(C.fill, 0.7), kleur, 2); text(ctx, letter, x + 40, y + 62, fTekst(44, 800), C.goud, 'left'); text(ctx, tekst, x + 96, y + 62, fTekst(40, 500), C.text, 'left'); };
function vraagkaart(ctx, vraag, opties) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H);
  text(ctx, 'Wat denk je?', 140, 220, fTitel(76), C.text, 'left'); text(ctx, vraag, 140, 310, fTekst(48, 500), C.text2, 'left');
  opties.forEach((o, i) => OPT(ctx, 'ABC'[i], o, 140, 380 + i * 128, 1100));
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(140, 800); ctx.lineTo(140 + 1100 * 0.6, 800); ctx.stroke(); }
function hoofdstukTag(ctx, nr, naam) { metaText(ctx, `${nr} · ${naam}`, 80, 80, C.text2, 'left', 28); }
function laag(ctx, l) { const k = { B: ['BEGINNER', C.groen], M: ['BASIS', C.teal], G: ['GEVORDERD', C.paars] }[l]; if (!k) return; metaText(ctx, k[0], W - 80, 80, k[1], 'right', 26); }
function schaalBalk(ctx, px, label) { ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(80, 850); ctx.lineTo(80 + px, 850); ctx.moveTo(80, 840); ctx.lineTo(80, 860); ctx.moveTo(80 + px, 840); ctx.lineTo(80 + px, 860); ctx.stroke(); metaText(ctx, label, 80, 830, C.text2, 'left', 24); }
function microGrond(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 46; i++) circ(ctx, hash(i * 3.3) * W, hash(i * 7.1) * 860, 1.4 + hash(i) * 2.2, rgba(C.grain, 0.12)); }
function mosBlad(ctx, x, y, r, rot, col = '#4E7A44') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); vul(ctx, [[0, 0], [r * 0.35, -r * 0.4], [r * 0.2, -r], [0, -r * 1.1], [-r * 0.2, -r], [-r * 0.35, -r * 0.4]], col, _lt(col, 0.25), 2); lijn(ctx, [[0, -4], [0, -r]], _dk(col, 0.25), 2); ctx.restore(); }
function kaartje_(ctx, x, y, w, h, kop, regel2, col = C.line) { roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.75), col, 2); text(ctx, kop, x + 28, y + 56, fTekst(40, 700), C.text, 'left'); if (regel2) text(ctx, regel2, x + 28, y + 100, fTekst(30, 400), C.text2, 'left'); }
function helix(ctx, x, y, len, r, a = 1, t = 0) { ctx.save(); ctx.globalAlpha *= a; const n = 80, per = 10; // rechtsdraaiend: grote en kleine groef
  for (let s2 = 0; s2 < 2; s2++) { const off = s2 ? 2.2 : 0; ctx.strokeStyle = s2 ? '#A392D6' : C.paars; ctx.lineWidth = 7; ctx.beginPath(); for (let i = 0; i <= n; i++) { const u = i / n, ph = u * len / 130 * 6.283 + off + t; const px = x + u * len, py = y + Math.sin(ph) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  for (let i = 0; i < len / 14; i++) { const px = x + i * 14, ph = (i * 14) / 130 * 6.283 + t; const y1 = y + Math.sin(ph) * r, y2 = y + Math.sin(ph + 2.2) * r; ctx.strokeStyle = rgba('#C9B8F0', 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y1); ctx.lineTo(px, y2); ctx.stroke(); } ctx.restore(); }
function vis(ctx, x, y, s, kleur = '#9AB8C8', o = {}) { const { kijk = 1, verdoofd = 0 } = o; _bd(ctx, x, y, s, kijk, 1, verdoofd * 0.9); vul(ctx, [[-60, 0], [-20, -22], [30, -20], [60, -4], [56, 8], [20, 20], [-20, 18]], kleur, _lt(kleur, 0.3), 2); vul(ctx, [[-56, 0], [-90, -22], [-84, 0], [-90, 22]], _dk(kleur, 0.15)); dierOog(ctx, 38, -6, 6, '#C9A35C'); ctx.restore(); }
function rijstkorrel(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); ctx.beginPath(); ctx.ellipse(0, 0, 70 * s, 24 * s, 0, 0, 6.283); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.strokeStyle = '#C9C0A8'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
function steen(ctx, x, y, w, h, col = '#5A5E66') { vul(ctx, [[x - w / 2, y], [x - w * 0.45, y - h * 0.7], [x - w * 0.2, y - h], [x + w * 0.25, y - h * 0.95], [x + w * 0.5, y - h * 0.5], [x + w * 0.48, y]], col, _lt(col, 0.2), 2); }
function bosGrond(ctx) { ctx.fillStyle = '#1E2E4A'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 9; i++) { const x0 = i * 230 + 40; ctx.fillStyle = i % 2 ? '#24384A' : '#2A3E4C'; ctx.fillRect(x0, 0, 40 + hash(i) * 30, 760); } ctx.fillStyle = '#3A3226'; ctx.fillRect(0, 740, W, 340); ctx.fillStyle = '#4A3E2E'; for (let i = 0; i < 60; i++) { ctx.beginPath(); ctx.ellipse(hash(i * 3) * W, 760 + hash(i * 5) * 100, 14 + hash(i) * 14, 4, hash(i * 9), 0, 6.283); ctx.fill(); } }
function grondDoorsnede(ctx) { ctx.fillStyle = '#1E2E4A'; ctx.fillRect(0, 0, W, 180); ctx.fillStyle = '#3A5540'; ctx.fillRect(0, 160, W, 30); ctx.fillStyle = '#4A3A2C'; ctx.fillRect(0, 190, W, 890); ctx.fillStyle = '#56442F'; for (let i = 0; i < 70; i++) circ(ctx, hash(i * 2.1) * W, 200 + hash(i * 4.7) * 680, 3 + hash(i) * 6, '#56442F');
  ctx.fillStyle = '#2A2018'; zacht(ctx, [[60, 520], [500, 480], [900, 540], [1400, 500], [1860, 530], [1860, 700], [1400, 680], [900, 720], [500, 660], [60, 700]]); ctx.fill(); }
function cel(ctx, x, y, r, col = '#2A3A58', rand = '#8FA0B5') { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); }
function staafVergelijk(ctx, items, x, y, w) { const max = Math.max(...items.map(i => i[1])); items.forEach(([naam, v, col, lab], i) => { const yy = y + i * 120; text(ctx, naam, x, yy + 44, fTekst(38, 600), C.text, 'left'); roundRect(ctx, x + 300, yy, Math.max(14, (w - 300) * v / max), 60, 10); shape(ctx, rgba(col, 0.75), col, 2); { const bw = Math.max(14, (w - 300) * v / max); if (bw > w - 700) text(ctx, lab, x + 300 + bw - 24, yy + 44, fTekst(34, 700), C.bgSchema, 'right'); else text(ctx, lab, x + 320 + bw, yy + 44, fTekst(34, 600), col, 'left'); } }); }
function bel(ctx, x, y, r, a = 1) { circ(ctx, x, y, r, rgba('#DCEFFA', 0.18 * a), rgba('#E6F4FF', 0.85 * a), 3); circ(ctx, x - r * 0.35, y - r * 0.35, r * 0.15, rgba('#FFFFFF', 0.5 * a)); }
function tienDieren(ctx, t) {
  beerdiertje(ctx, 250, 390, 0.6, { t }); axolotl(ctx, 720, 390, 0.62, { t }); bidsprinkhaankreeft(ctx, 1180, 390, 0.62, { t }); pistoolgarnaal(ctx, 1640, 390, 0.62, { t, open: 0.5 });
  octopus(ctx, 230, 830, 0.42, { t }); vogelbekdier(ctx, 640, 660, 0.62, { t }); molrat(ctx, 1100, 660, 0.72, { t }); kwalT(ctx, 1600, 560, 0.5, { t });
  bombardeerkever(ctx, 760, 820, 0.5, { t, rot: 1.57 }); liervogel(ctx, 1260, 880, 0.55, { t, toon: 1 }); }

function mosVeld(ctx) { for (let st = 0; st < 9; st++) { const x0 = 80 + st * 220 + hash(st) * 60, h0 = 300 + hash(st * 3) * 160; const kr = (hash(st * 7) - 0.5) * 0.5; ctx.strokeStyle = '#3E5E36'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, 1080); ctx.quadraticCurveTo(x0 + kr * 120, 1080 - h0 / 2, x0 + kr * 200, 1080 - h0); ctx.stroke();
  for (let k = 0; k < 9; k++) { const u = k / 9, px = x0 + kr * 200 * u * u, py = 1080 - h0 * u; [-1, 1].forEach(z => mosBlad(ctx, px, py, 70 - u * 30, z * (0.9 - u * 0.4), k % 2 ? '#4E7A44' : '#5A8A4E')); } } }
function slakkenhuis(ctx, x, y, r) { vul(ctx, [[x - r, y], [x - r * 0.9, y - r * 0.8], [x - r * 0.2, y - r * 1.1], [x + r * 0.7, y - r * 0.8], [x + r, y - r * 0.1], [x + r * 0.8, y]], '#B8946A', '#D8B48A', 2); const P = []; for (let k = 0; k < 40; k++) { const an = k * 0.32, rr = r * 0.8 * (1 - k / 44); P.push([x + Math.cos(an) * rr, y - r * 0.5 + Math.sin(an) * rr * 0.8]); } lijn(ctx, P, '#7A5A38', 4); }

// Bijzondere dieren 1 · Bestaat dit echt? — scènes per alinea (v1.0, 22 okt 2026)
// Dieren uit teken_bd1.js/teken_bd1b.js (Part C9-recepten); keyframes goedgekeurd in de storyboardkeuring.
const U = (t, t0, d = 0.8) => ease((t - t0) / d);
function oordeel(ctx, s2, a, col = C.goud) { stempel(ctx, 1600, 200, s2, col, a, -0.12); }
function kaartIn(ctx, a, x, y, w, h, kop, r2, col) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 20); kaartje_(ctx, x, y, w, h, kop, r2, col); ctx.restore(); }
function vertraagd(ctx, s2, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, 80, 860, C.goud, 'left', 26); ctx.restore(); }
function ruimteRaket(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); vul(ctx, [[0, -120], [30, -60], [30, 60], [-30, 60], [-30, -60]], '#C8CCD4', '#E8ECF2', 2); vul(ctx, [[30, 20], [56, 70], [30, 60]], C.koraal); vul(ctx, [[-30, 20], [-56, 70], [-30, 60]], C.koraal); circ(ctx, 0, -40, 12, '#3A6A8A', '#AFC0D0', 2); ctx.restore(); }
function sterren(ctx, a = 1) { for (let i = 0; i < 60; i++) circ(ctx, hash(i * 2.3) * W, hash(i * 5.1) * 860, 1 + hash(i) * 1.6, rgba('#F2F2EE', 0.5 * a)); }

Object.assign(SCENES, {
  title(ctx, t) { kwalT(ctx, 1500, 420, 1.5, { t }); beerdiertje(ctx, 1320, 820, 0.9, { t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { onderWater(ctx, t, { bodem: '#2E3A36' });
    const a1 = q.on('ruimte', 1), a2 = q.on('kreeft', 1), a3 = q.on('kever', 1), rest = q.on('bestaan', 1, 1.2);
    beerdiertje(ctx, 330, 390 + (1 - a1) * 40, 0.75, { t, a: a1 }); bidsprinkhaankreeft(ctx, 960, 400, 0.8, { t, a: a2, slag: clamp((t - q.at('slaat', 1)) * 4, 0, 1) * (1 - clamp((t - q.at('slaat', 1) - 0.6) * 2, 0, 1)) });
    bombardeerkever(ctx, 1560, 360, 0.65, { t, a: a3, rot: 1.57, spuit: clamp((t - q.at('spuit', 1)) * 2, 0, 1) * (1 - clamp((t - q.at('spuit', 1) - 1.4), 0, 1)), richting: Math.PI * 0.4 });
    axolotl(ctx, 380, 760, 0.6, { t, a: rest }); octopus(ctx, 860, 840, 0.38, { t, a: rest }); kwalT(ctx, 1260, 640, 0.5, { t, a: rest }); molrat(ctx, 1650, 780, 0.7, { t, a: rest });
    const st = q.on('overdreven', 1); if (st > 0.01) oordeel(ctx, 'klopt het?', st, C.goud); },

  // ---------- 1. Beerdiertje ----------
  s03(ctx, t, q) { microGrond(ctx); const z = U(t, 0, 3.5); ctx.save(); const k = lerp(0.35, 1, z); ctx.translate(960, 900); ctx.scale(k, k); ctx.translate(-960, -900); mosVeld(ctx); ctx.restore();
    beerdiertje(ctx, lerp(1300, 1000, U(t, 1.5, 4)), 740, 2.1 * z, { t, a: z });
    naamBij(ctx, 'beerdiertje', 'echt: ±0,5 mm', 1480, 380, q.on('halve', 1)); schaalBalk(ctx, 260, '0,1 mm (vergroot)');
    const c = q.on('onsterfelijk', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 620, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Beerdiertjes zijn onsterfelijk!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s05(ctx, t, q) { microGrond(ctx); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4) * (1 - q.on('raket', 1)));
    const tun = U(t, q.at('trekt', 1), 2.2); beerdiertje(ctx, 760, 620, 1.9, { t, tun });
    kaartIn(ctx, q.on('zevenendertig', 1), 140, 680, 420, 120, '37 °C', 'na een dag: de helft dood', C.koraal); naamBij(ctx, 'tonnetje', 'uitgedroogd', 820, 300, q.on('tonnetje', 1));
    kaartIn(ctx, q.on('diepgevroren', 1), 1200, 520, 420, 120, '30 jaar', 'diepgevroren in mos', C.teal);
    const r = q.on('raket', 1); if (r > 0.01) { sterren(ctx, r * 0.6); ruimteRaket(ctx, 1300, 330, 1, r); }
    kaartIn(ctx, q.on('ruimte', 1), 1200, 680, 420, 120, '10 dagen', 'in de ruimte', C.goud);
    const z = q.on('zonlicht', 1); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; circ(ctx, 1800, 120, 50, C.goud); for (let i = 0; i < 10; i++) { const an = i * 0.628; lijn(ctx, [[1800 + Math.cos(an) * 64, 120 + Math.sin(an) * 64], [1800 + Math.cos(an) * 90, 120 + Math.sin(an) * 90]], C.goud, 4); } ctx.restore(); naamBij(ctx, 'fel zonlicht', 'UV: bijna niemand overleefde', 1660, 230, z, 'right', C.koraal); } },
  s06(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('Droogt', 1), 2.5), op = U(t, q.at('water', 1), 2);
    const kracht = g * (1 - op); const cx = 760, cy = 460; cel(ctx, cx, cy, lerp(300, 270, kracht), '#22344E');
    for (let i = 0; i < 16; i++) { const a0 = hash(i * 3) * 6.283 + t * 0.15 * (1 - kracht), rr = hash(i * 5) * 210; const px = cx + Math.cos(a0) * rr, py = cy + Math.sin(a0) * rr; const P = []; for (let k = 0; k < 7; k++) P.push([px + Math.sin(k * 1.3 + i + t * (1 - kracht)) * 20 + k * 6, py + Math.cos(k * 0.9 + i) * 18]); lijn(ctx, P, rgba(C.oker, 1 - kracht * 0.6), 4); }
    if (kracht > 0.01) { ctx.save(); ctx.globalAlpha *= kracht; ctx.strokeStyle = rgba(C.oker, 0.85); ctx.lineWidth = 4; for (let i = 0; i < 26; i++) { const a0 = hash(i * 7) * 6.283, a1 = a0 + 1 + hash(i) * 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a0) * 260, cy + Math.sin(a0) * 260); ctx.lineTo(cx + Math.cos(a1) * 260, cy + Math.sin(a1) * 260); ctx.stroke(); } ctx.restore(); }
    for (let i = 0; i < 9; i++) { const a0 = hash(i * 11) * 6.283 + t * 0.4 * (1 - kracht), rr = hash(i * 13) * 190; circ(ctx, cx + Math.cos(a0) * rr, cy + Math.sin(a0) * rr, 14, '#7A8BA8', '#AFC0D0', 2); }
    naamBij(ctx, 'eiwitten', 'alleen bij beerdiertjes', 1120, 300, q.on('eiwitten', 1), 'left', C.oker); naamBij(ctx, 'gel', 'houdt alles op zijn plek', 1120, 470, q.on('gel', 1) * (1 - op), 'left', C.oker); naamBij(ctx, 'weer water', 'gel lost op', 1120, 640, op, 'left', C.teal);
    beerdiertje(ctx, 1500, 840, 0.6, { t, tun: kracht, a: 0.9 }); },
  s07(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('DNA', 1); helix(ctx, 460, 470, 1000, 70, 1, t * 0.6);
    const w = q.on('wolk', 1, 1.2); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.fillStyle = rgba('#7A8BA8', 0.28); zacht(ctx, [[420, 360], [800, 330], [1200, 350], [1500, 360], [1520, 590], [1200, 600], [800, 610], [420, 590]]); ctx.fill(); ctx.strokeStyle = rgba('#AFC0D0', 0.7); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    const s2 = q.on('straling', 1); for (let i = 0; i < 6; i++) { const x0 = 520 + i * 180, ph = ((t * 0.7 + i * 0.37) % 1); const yy = lerp(120, w > 0.5 ? 330 : 400, ph); pijl(ctx, x0 + 40 - ph * 40, yy - 80, x0 + 40 - ph * 40 - 10, yy, C.koraal, s2 * (1 - ph * 0.3), 4); }
    naamBij(ctx, 'straling', '', 520, 110, s2); naamBij(ctx, 'DNA', '', 300, 480, d, 'left', C.paars); naamBij(ctx, 'beschermwolk', 'een speciaal eiwit', 1530, 660, w, 'right');
    const m = q.on('Mos', 1) * (1 - d); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; bg(ctx, 'schema'); mosVeld(ctx); text(ctx, 'nat → droog → nat → droog', 960, 300, fTekst(48, 700), C.text, 'center'); ctx.restore(); } },

  // ---------- 2. Axolotl ----------
  s08(ctx, t, q) { onderWater(ctx, t); axolotl(ctx, lerp(1400, 980, U(t, 0, 3)), 700, 2.2, { t, poot: q.at('aan', 1) ? (t < q.at('af', 1) ? 1 : U(t, q.at('aan', 1), 3)) : 1 });
    naamBij(ctx, 'kieuwen', 'blijft een larve', 1180, 300, q.on('kieuwen', 1)); const v = q.on('vis', 1) * (1 - q.on('aan', 1)); vis(ctx, 1500, 560, 1.4, '#9AB8C8', { kijk: -1 }); if (v < 0.01 && t < q.at('vis', 1)) {}
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 700, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Hij kan alles teruggroeien!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s10(ctx, t, q) { onderWater(ctx, t); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); axolotl(ctx, 960, 640, 2.1, { t });
    [['poten', 'ja', 640, 820, 'Poten'], ['staart', 'ja', 300, 420, 'staart'], ['kieuwen', 'ja', 1180, 300, 'kieuwen'], ['hart, hersenen', 'stukjes', 200, 300, 'hart'], ['kop', 'nee', 1520, 420, 'kop']].forEach(([n, m, x, y, w]) => naamBij(ctx, n, m, x, y, q.on(w, 1), 'left', m === 'nee' ? C.koraal : C.groen)); },
  s11(ctx, t, q) { bg(ctx, 'schema'); const huid = '#EEC3BC'; const fase = [q.at('huidcellen', 1), q.at('blastema', 1), q.at('arm', 1), q.at('vingers', 1)];
    const x0 = 960, y0 = 760; ctx.save(); ctx.translate(x0, y0); roundRect(ctx, -60, -40, 120, 140, 26); ctx.fillStyle = huid; ctx.fill();
    const w1 = U(t, fase[0], 1.2); if (w1 > 0) { ctx.strokeStyle = rgba('#F6DCD6', w1); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -40, 60, Math.PI, Math.PI + Math.PI * w1); ctx.stroke(); }
    const b = U(t, fase[1] - 1.5, 1.5); if (b > 0) { ctx.beginPath(); ctx.ellipse(0, -60, 56 * b, 50 * b, 0, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
    const g = U(t, fase[2] - 0.4, 2.5); if (g > 0) { roundRect(ctx, -40, -60 - 260 * g, 80, 260 * g, 36); ctx.fillStyle = huid; ctx.fill(); }
    const v = U(t, fase[3] - 0.3, 1.5); if (v > 0) { for (let k = 0; k < 4; k++) { ctx.save(); ctx.translate(0, -60 - 250 * g); ctx.rotate(-0.6 + k * 0.4); roundRect(ctx, -10, -90 * v, 20, 90 * v, 10); ctx.fillStyle = huid; ctx.fill(); ctx.restore(); } }
    ctx.restore(); naamBij(ctx, 'wond dicht', 'geen korst, geen litteken', 1140, 760, q.on('korst', 1)); naamBij(ctx, 'afweercellen', 'ruimen op, geven startsein', 1140, 640, q.on('Afweercellen', 1), 'left', C.teal);
    for (let i = 0; i < 5; i++) { const a = q.on('Afweercellen', 1) * (1 - q.on('jong', 1)); circ(ctx, 860 + i * 50 + Math.sin(t * 2 + i) * 8, 700 + Math.cos(t * 1.7 + i) * 8, 14, rgba(C.teal, a), null); }
    naamBij(ctx, 'blastema', 'bultje delende cellen', 1140, 560, q.on('blastema', 1), 'left', C.koraal); naamBij(ctx, 'arm, hand, vingers', 'in volgorde', 1140, 330, q.on('arm', 1)); },
  s12(ctx, t, q) { bg(ctx, 'schema'); const c = q.on('pinkkant', 1), d = q.on('duimkant', 1);
    ctx.save(); ctx.translate(820, 520); ctx.beginPath(); ctx.ellipse(0, 0, 340, 210, 0, 0, 6.283); ctx.fillStyle = '#EEC3BC'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.55 * c); ctx.fillRect(-400, -260, 400, 520); ctx.fillStyle = rgba(C.oker, 0.55 * d); ctx.fillRect(0, -260, 400, 520); ctx.restore();
    for (let i = 0; i < 40; i++) circ(ctx, -300 + hash(i * 3) * 600, -170 + hash(i * 5) * 340, 12, rgba('#F6E0DA', 0.8), '#D9A49C', 1.5); ctx.restore();
    naamBij(ctx, 'pinkkant', 'ander gen aan', 520, 260, c, 'center', C.teal); naamBij(ctx, 'duimkant', '', 1120, 260, d, 'center', C.oker); naamBij(ctx, 'blastema', '', 820, 800, 1, 'center');
    const m = q.on('mensen', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; persoon(ctx, 'lotte', 1560, 820, 380, { t, uit: 'verbaasd' }); ctx.restore(); naamBij(ctx, 'zelfde genen', 'anders aangestuurd', 1560, 380, m, 'center'); }
    const w = q.on('wild', 1); if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); onderWater(ctx, t, { bodem: '#3A3A30', diep: '#2A3A3A', midden: '#34463E', licht: '#3E5446' }); axolotl(ctx, 960, 700, 1.4, { t, kleur: 'wild' }); ctx.restore(); kaartIn(ctx, q.on('moeilijk', 1), 160, 200, 760, 130, 'Bijna verdwenen', 'in het wild ernstig bedreigd', C.koraal); } },

  // ---------- 3. Bidsprinkhaankreeft ----------
  s13(ctx, t, q) { onderWater(ctx, t, { bodem: '#4A4A3A' }); const k = q.at('kapot', 1), sl = clamp((t - k + 0.5) * 5, 0, 1) * (1 - clamp((t - k) * 2, 0, 1));
    bidsprinkhaankreeft(ctx, lerp(500, 820, U(t, 0, 3)), 760, 2.0, { t, slag: sl }); const kap = t > k; if (!kap) slakkenhuis(ctx, 1480, 760, 110); else { for (let i = 0; i < 7; i++) { const u = clamp((t - k) * 1.2, 0, 1); vul(ctx, [[0, 0], [30, -10], [20, 20]].map(([a, b]) => [1480 + a + Math.cos(i) * 120 * u, 740 + b + Math.sin(i * 1.7) * 60 * u - 60 * u + 140 * u * u]), '#B8946A', '#D8B48A', 2); } }
    naamBij(ctx, 'knots', 'onder de kop', 1040, 860 - 40, q.on('knotsen', 1));
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 160, 760, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Zijn slag is sneller dan een kogel!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s15(ctx, t, q) { bg(ctx, 'schema'); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); text(ctx, 'Snelheid', 160, 260, fTekst(48, 700), C.text, 'left');
    const a = q.on('tachtig', 1), b = q.on('kogel', 1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, 'knots', 160, 384, fTekst(38, 600), C.text, 'left'); roundRect(ctx, 460, 340, 1300 * 80 / 1200, 60, 10); shape(ctx, rgba(C.koraal, 0.75), C.koraal, 2); text(ctx, '± 80 km/u', 460 + 1300 * 80 / 1200 + 20, 384, fTekst(34, 600), C.koraal, 'left'); ctx.restore(); }
    if (b > 0.01) { ctx.save(); ctx.globalAlpha *= b; const bw = (1600 - 300) * U(t, q.at('kogel', 1), 1.2); text(ctx, 'kogel', 160, 504, fTekst(38, 600), C.text, 'left'); roundRect(ctx, 460, 460, Math.max(14, bw), 60, 10); shape(ctx, rgba(C.line, 0.75), C.line, 2); if (bw > 900) text(ctx, 'meer dan 1000 km/u', 460 + bw - 24, 504, fTekst(34, 700), C.bgSchema, 'right'); ctx.restore(); }
    kaartIn(ctx, q.on('optrekken', 1), 160, 640, 980, 130, 'Optrekken: net zo heftig', 'topsnelheid binnen een paar duizendsten van een seconde', C.goud); },
  s16(ctx, t, q) { bg(ctx, 'schema'); const sp = U(t, q.at('spant', 1), 2.5), los = t > q.at('los', 1) ? clamp((t - q.at('los', 1)) * 6, 0, 1) : 0;
    bidsprinkhaankreeft(ctx, 640, 700, 1.7, { t, slag: los });
    ctx.save(); ctx.translate(1350, 470); const amp = lerp(30, 12, sp * (1 - los)), len = lerp(320, 220, sp * (1 - los)); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i < 9; i++) ctx.lineTo(-160 + i * len / 8, i % 2 ? -amp : amp); ctx.stroke();
    circ(ctx, -160 + len + 40, 0, 30, C.koraal); const palA = q.on('pal', 1); roundRect(ctx, -160 + len + 0, -70 + los * -40, 22, 50, 6); shape(ctx, rgba(C.teal, palA), null); ctx.restore();
    naamBij(ctx, 'veer', 'langzaam gespannen', 1200, 380, q.on('veer', 1)); naamBij(ctx, 'pal', 'houdt vast', 1490, 360, q.on('pal', 1), 'left', C.teal); naamBij(ctx, 'kruisboog', 'zelfde idee', 1200, 640, q.on('kruisboog', 1), 'left', C.goud); },
  s17(ctx, t, q) { onderWater(ctx, t, { bodem: '#4A4A3A' }); const t0 = q.at('dampbel', 1); const fase = clamp((t - t0 + 1) / 3, 0, 1);
    bidsprinkhaankreeft(ctx, 700, 760, 1.8, { t, slag: 1 }); const r = fase < 0.6 ? fase / 0.6 * 46 : 46 * (1 - (fase - 0.6) / 0.4); if (t > t0 - 1 && fase < 1) bel(ctx, 1090, 660, Math.max(2, r));
    if (fase >= 1 && t < t0 + 3) { for (let i = 0; i < 4; i++) { ctx.strokeStyle = rgba('#E6F4FF', 0.6 - i * 0.12); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1090, 660, 30 + i * 40 + (t - t0 - 2) * 80, 0, 6.283); ctx.stroke(); } }
    vertraagd(ctx, '1000× vertraagd', q.on('dampbel', 1)); naamBij(ctx, 'dampbel', 'lage druk, geen hitte', 1180, 560, q.on('cavitatie', 1)); stempel(ctx, 1400, 300, 'kookt niet', C.koraal, q.on('kookt', 1), -0.1);
    const v = q.on('knots', 2); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.translate(1550, 300); ctx.beginPath(); ctx.arc(0, 0, 150, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.clip(); for (let k = 0; k < 6; k++) { const yy = 90 - k * 36; ctx.save(); ctx.translate(0, yy); ctx.scale(1, 0.32); ctx.rotate(k * 0.45 + t * 0.1); ctx.strokeStyle = rgba(C.koraal, 0.45 + k * 0.09); ctx.lineWidth = 6; for (let i2 = -7; i2 <= 7; i2++) { ctx.beginPath(); ctx.moveTo(-160, i2 * 22); ctx.lineTo(160, i2 * 22); ctx.stroke(); } ctx.restore(); }
      const bx = U(t, q.at('barstje', 1), 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -140); let px = 0, py = -140; for (let k = 0; k < 6 * bx; k++) { px += (k % 2 ? 26 : -22); py += 34; ctx.lineTo(px, py); } ctx.stroke(); ctx.restore(); metaText(ctx, 'vezels in een spiraal', 1550, 480, C.goud, 'center', 24); } },

  // ---------- 4. Pistoolgarnaal ----------
  s18(ctx, t, q) { onderWater(ctx, t); pistoolgarnaal(ctx, 820, 720, 2.2, { t, open: U(t, 1, 1.5) }); vis(ctx, lerp(1900, 1640, U(t, 2, 4)), 600, 1.4, '#9AB8C8', { kijk: -1 });
    naamBij(ctx, 'knalschaar', 'half zo lang als het lijf', 1100, 470, q.on('schaar', 1)); schaalBalk(ctx, 300, '1 cm (vergroot)'); const h = q.on('hardste', 1); if (h > 0.01) { for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.goud, h * (0.5 - i * 0.12)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1240, 700, 60 + i * 40, -0.7, 0.7); ctx.stroke(); } } },
  s20(ctx, t, q) { onderWater(ctx, t); const t0 = q.at('Klapt', 1); const o = t < t0 ? 1 : 1 - clamp((t - t0) * 8, 0, 1); const bf = clamp((t - q.at('bel', 2)) / 2.5, 0, 1);
    pistoolgarnaal(ctx, 680, 720, 2.0, { t, open: o, bel: bf < 1 ? bf : 0 }); if (t > t0) { const jl = clamp((t - t0) * 2, 0, 1); ctx.strokeStyle = rgba('#E6F4FF', 0.7 * (1 - bf)); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1040, 726); ctx.lineTo(1040 + 200 * jl, 726); ctx.stroke(); }
    const kn = q.on('knal', 1); if (kn > 0.01) for (let i = 0; i < 5; i++) { ctx.strokeStyle = rgba('#E6F4FF', 0.6 - i * 0.1); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1180, 720, 80 + i * 60 + kn * 40, -0.6, 0.6); ctx.stroke(); }
    vis(ctx, 1600, 700, 1.4, '#9AB8C8', { kijk: -1, verdoofd: kn }); naamBij(ctx, 'straaltje water', '± 90 km/u', 1000, 520, q.on('straaltje', 1)); naamBij(ctx, 'bel', 'net als bij de kreeft', 1160, 900 - 60, q.on('bel', 2)); vertraagd(ctx, 'vertraagd', q.on('Klapt', 1)); },
  s21(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('schiet', 1); const o = t < t0 ? U(t, 0.5, 1.5) * 0.8 : 0.8 * (1 - clamp((t - t0) * 6, 0, 1)); const kl = q.on('Verliest', 1);
    ctx.save(); ctx.translate(-700, 300); pistoolgarnaal(ctx, 1000, 400, 4.0, { t, open: o, a: 1 - kl }); ctx.restore();
    naamBij(ctx, 'zuiger', 'op het vingertje', 1180, 290, q.on('zuiger', 1) * (1 - kl)); naamBij(ctx, 'kuiltje', 'in de schaar', 1340, 640, q.on('kuiltje', 1) * (1 - kl));
    if (kl > 0.01) { const g = U(t, q.at('groeit', 1), 3); ctx.save(); ctx.globalAlpha *= kl; ctx.translate(960, 640); vul(ctx, [[-260, 0], [-200, -60], [-60, -80], [60, -60], [120, -20], [60, 20], [-200, 20]], '#E3A27A', '#F4C8A8', 2); ctx.translate(120, -30); ctx.scale(lerp(0.4, 1.4, g), lerp(0.4, 1.4, g)); vul(ctx, [[0, -26], [50, -34], [110, -30], [130, -14], [176, 0], [180, 10], [130, 18], [70, 24], [8, 20], [-6, -2]], '#D0703E', '#F0A070', 2); ctx.restore(); naamBij(ctx, 'kleine schaar', 'groeit uit tot knalschaar', 960, 820, kl, 'center'); } },
  s22(ctx, t, q) { onderWater(ctx, t); const t0 = q.at('klapt', 1); const r = lerp(140, 8, clamp((t - t0 + 0.5) / 1.5, 0, 1)); bel(ctx, 960, 470, r); const f = q.on('flitsje', 1) * (1 - clamp((t - q.at('flitsje', 1) - 1.2), 0, 1));
    if (f > 0.01) { circ(ctx, 960, 470, 26, rgba('#FFF6D8', 0.9 * f)); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; lijn(ctx, [[960 + Math.cos(an) * 40, 470 + Math.sin(an) * 40], [960 + Math.cos(an) * 70, 470 + Math.sin(an) * 70]], rgba('#FFF6D8', 0.6 * f), 3); } }
    naamBij(ctx, 'misschien zo heet als de zon', 'schatting', 960, 700, q.on('zon', 1), 'center', C.goud); naamBij(ctx, 'flitsje licht', 'te zwak om te zien', 1200, 330, q.on('flitsje', 1)); vertraagd(ctx, 'sterk vertraagd', 1);
    const s = q.on('kolonie', 1); if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; ctx.fillStyle = rgba('#14324A', 0.92); ctx.fillRect(0, 0, W, 880); for (let i = 0; i < 9; i++) pistoolgarnaal(ctx, 200 + i * 190, 760 - (i % 2) * 60, 0.45, { t: t + i, open: (Math.sin(t * 3 + i) > 0.6) ? 1 : 0 }); ctx.restore(); naamBij(ctx, 'stoort sonar', 'van onderzeeboten', 960, 300, q.on('onderzeebootsonar', 1), 'center'); } },

  // ---------- 5. Octopus ----------
  s23(ctx, t, q) { onderWater(ctx, t); octopus(ctx, 760, 760, 1.4, { t }); const h = q.on('hond', 1); hond(ctx, lerp(2100, 1500, U(t, q.at('hond', 1), 2)), 760, 0.9, { t, a: h });
    naamBij(ctx, '500 miljoen zenuwcellen', '', 520, 220, q.on('vijfhonderd', 1)); naamBij(ctx, 'ongeveer even veel', '', 1380, 470, h); },
  s25(ctx, t, q) { onderWater(ctx, t); const k = U(t, q.at('kleur', 1), 1); const kl = '#' + [0xB0, 0x60, 0x3E].map((c, i) => Math.round(lerp(c, [0xC8, 0xB4, 0x8A][i], k)).toString(16).padStart(2, '0')).join('');
    octopus(ctx, 960, 780, 1.5, { t, kleur: kl, vlek: lerp(0.5, 0.9, k) }); const z = q.on('armen', 1);
    if (z > 0.01) for (let i = 0; i < 60; i++) { const an = hash(i * 3) * 3.4 + 2.9, rr = 120 + hash(i * 7) * 220; circ(ctx, 960 + Math.cos(an) * rr * 1.2, 700 + Math.abs(Math.sin(an)) * rr * 0.5 + 40, 4, rgba(C.goud, z * (0.5 + 0.5 * Math.sin(t * 3 + i)))); }
    naamBij(ctx, 'twee derde', 'in de armen', 1400, 820, q.on('derde', 1)); naamBij(ctx, 'hersenen', 'geven de opdracht', 1080, 300, q.on('hersenen', 1)); },
  s26(ctx, t, q) { bg(ctx, 'schema'); const sp = 0.5 + 0.5 * Math.sin((t - q.at('trekken', 1)) * 1.6); const o = t < q.at('trekken', 1) ? 0.2 : t < q.at('Laten', 1) ? lerp(0.2, 1, U(t, q.at('trekken', 1), 1.2)) : lerp(1, 0.2, U(t, q.at('Laten', 1), 1));
    const cx = 760; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; lijn(ctx, [[cx + Math.cos(an) * (50 + 150 * o), 470 + Math.sin(an) * (50 + 150 * o)], [cx + Math.cos(an) * 320, 470 + Math.sin(an) * 320]], '#D8A090', 5); }
    circ(ctx, cx, 470, 50 + 150 * o, '#B04A2E', '#E08A6A', 3); naamBij(ctx, 'kleurzakje', o > 0.6 ? 'open: grote vlek' : 'dicht: stipje', cx, 860 - 40, 1, 'center'); naamBij(ctx, 'spiertjes', '', 1100, 230, q.on('spiertjes', 1));
    const l = q.on('weerkaatsen', 1); if (l > 0.01) { ctx.save(); ctx.globalAlpha *= l; for (let i = 0; i < 6; i++) { roundRect(ctx, 1180, 400 + i * 40, 520, 26, 8); shape(ctx, i < 3 ? rgba(C.teal, 0.5 + i * 0.1) : rgba('#F2F2EE', 0.35), null); } ctx.restore(); naamBij(ctx, 'lagen die licht weerkaatsen', '', 1180, 690, l); } },
  s27(ctx, t, q) { bg(ctx, 'schema'); dierOog(ctx, 560, 440, 170, '#D8B44A', { pupil: 'liggend', rand: '#B0603E' }); naamBij(ctx, 'één soort lichtcel', 'waarschijnlijk kleurenblind', 560, 760, q.on('kleurenblind', 1), 'center');
    kaartIn(ctx, q.on('huid', 1), 1040, 300, 760, 130, 'Hypothese 1', 'zijn huid voelt zelf licht', C.paars); kaartIn(ctx, q.on('pupil', 1), 1040, 470, 760, 130, 'Hypothese 2', 'de vorm van zijn pupil helpt', C.paars); kaartIn(ctx, q.on('hypothesen', 1), 1040, 640, 760, 130, 'Nog niet bekend', 'onderzoekers zoeken het uit', C.line); },

  // ---------- 6. Vogelbekdier ----------
  s28(ctx, t, q) { bodemLand(ctx); ctx.fillStyle = '#24587A'; ctx.fillRect(0, 760, W, 320); const e = q.on('eend', 1), b = q.on('bever', 1), ei = q.on('eieren', 1);
    vogelbekdier(ctx, lerp(500, 900, U(t, 0, 3)), 740, 2.0, { t }); naamBij(ctx, 'snavel', 'als een eend', 1400, 560, e); naamBij(ctx, 'staart', 'als een bever', 300, 560, b);
    if (ei > 0.01) { ctx.save(); ctx.globalAlpha *= ei; ctx.beginPath(); ctx.ellipse(1520, 712, 26, 32, 0, 0, 6.283); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.beginPath(); ctx.ellipse(1576, 716, 24, 30, 0.2, 0, 6.283); ctx.fill(); ctx.restore(); naamBij(ctx, 'eieren', 'in een hol in de oever', 1460, 640, ei); }
    const g = q.on('gek', 1); if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.fillStyle = rgba(C.bgSchema, 0.85); ctx.fillRect(0, 0, W, 880); vogelbekdier(ctx, 960, 560, 1.8, { t }); for (let i = 0; i < 5; i++) { ctx.strokeStyle = '#C9B896'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1230, 470 + i * 14); ctx.lineTo(1260, 474 + i * 14); ctx.stroke(); } text(ctx, 'Europa, eind 18e eeuw: "nep!"', 960, 300, fTekst(48, 700), C.text, 'center'); ctx.restore(); } },
  s30(ctx, t, q) { bodemLand(ctx); vogelbekdier(ctx, 900, 760, 2.0, { t }); vogelbekdier(ctx, 1500, 790, 0.7, { t, kijk: -1, a: q.on('jongen', 1) });
    const m = q.on('melk', 1); for (let i = 0; i < 6; i++) circ(ctx, 820 + i * 30, 700 + (i % 2) * 8, 7, rgba('#F4F0E4', m)); naamBij(ctx, 'melk op de buik', 'geen tepels', 700, 880 - 60, q.on('tepels', 1), 'center'); naamBij(ctx, 'vacht', '', 760, 470, q.on('vacht', 1)); stempel(ctx, 1500, 260, 'zoogdier', C.groen, q.on('zoogdier', 1), -0.1); },
  s31(ctx, t, q) { onderWater(ctx, t); const d = q.on('dicht', 1); vogelbekdier(ctx, 760, 560, 1.9, { t, zwem: 1, ogenDicht: d });     pistoolgarnaal(ctx, 1500, 700, 0.6, { t }); const e = q.on('stroompje', 1);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; ctx.strokeStyle = rgba(C.teal, (0.7 - ph * 0.7) * Math.max(e, q.on('elektriciteit', 1) * 0.6)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1460, 640, 40 + ph * 320, Math.PI * 0.75, Math.PI * 1.25); ctx.stroke(); }
    naamBij(ctx, '40.000 zintuigcellen', 'voelen elektriciteit', 1000, 360, q.on('veertigduizend', 1)); naamBij(ctx, 'ogen, oren, neus dicht', '', 300, 330, d); },
  s32(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('voorouders', 1), 2.5);
    lijn(ctx, [[300, 800], [lerp(300, 960, g), lerp(800, 650, g)]], C.line, 6); if (g > 0.99) { const g2 = U(t, q.at('voorouders', 1) + 2.5, 1.5); lijn(ctx, [[960, 650], [lerp(960, 1600, g2), lerp(650, 300, g2)]], C.line, 6); lijn(ctx, [[960, 650], [lerp(960, 1600, g2), lerp(650, 760, g2)]], C.line, 6); lijn(ctx, [[1280, 475], [lerp(1280, 1600, g2), lerp(475, 520, g2)]], C.line, 6 * (g2 > 0.5 ? 1 : 0)); }
    const tak = q.on('tak', 1); vogelbekdier(ctx, 1700, 790, 0.45, { a: tak }); naamBij(ctx, 'eieren leggers', 'vogelbekdier, mierenegel', 1640, 840, tak, 'left', C.oker); naamBij(ctx, 'buideldieren', '', 1640, 540, tak); naamBij(ctx, 'placentadieren', 'mens, hond, muis', 1640, 300, tak);
    naamBij(ctx, 'voorouder', 'legde eieren, gaf al melk', 300, 860 - 40, q.on('voorouders', 1), 'left', C.goud); stempel(ctx, 700, 300, 'melk ouder dan tepels', C.groen, q.on('tepels', 1), -0.08);
    const s = q.on('spoor', 1); if (s > 0.01) { ctx.save(); ctx.globalAlpha *= s; ctx.fillStyle = rgba(C.bgSchema, 0.92); ctx.fillRect(0, 0, W, 880); vogelbekdier(ctx, 900, 700, 2.2, { t, spoor: 1 }); ctx.restore(); naamBij(ctx, 'giftige spoor', 'alleen het mannetje', 660, 830, s, 'left', C.koraal); } },

  // ---------- 7. Naakte molrat ----------
  s33(ctx, t, q) { grondDoorsnede(ctx); const m = U(t, 0, 2); molrat(ctx, lerp(700, 960, m), 660, 1.6, { t, koningin: q.on('koningin', 1) }); molrat(ctx, 420 - Math.sin(t * 0.5) * 30, 650, 1.0, { t, a: q.on('anderen', 1) }); molrat(ctx, 1500 + Math.sin(t * 0.4) * 30, 660, 1.0, { t, kijk: -1, a: q.on('anderen', 1) });
    naamBij(ctx, 'tanden', 'buiten de mond', 1260, 520, q.on('tanden', 1)); naamBij(ctx, 'koningin', 'krijgt als enige jongen', 920, 440, q.on('koningin', 1), 'center', C.goud);
    const c = q.on('internet', 1); if (c > 0.01) { ctx.save(); ctx.globalAlpha *= c; roundRect(ctx, 140, 230, 760, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Molratten krijgen nooit kanker!"', 170, 298, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 220, C.text2, 'left', 22); ctx.restore(); } },
  s35(ctx, t, q) { bg(ctx, 'schema'); oordeel(ctx, 'overdreven', q.on('Overdreven', 1, 0.4)); kaartIn(ctx, q.on('zelden', 1), 160, 200, 900, 130, 'Kanker: heel zelden', 'een paar gevallen, bij dieren ouder dan 20 jaar', C.koraal);
    const a = q.on('dertig', 1); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, 'Hoe oud ze worden', 160, 460, fTekst(44, 700), C.text, 'left'); const g = U(t, q.at('dertig', 1), 1.5); staafVergelijk(ctx, [['muis', 3, C.line, 'een paar jaar'], ['naakte molrat', 3 + 29 * g, C.groen, 'meer dan 30 jaar']], 160, 520, 1500); ctx.restore(); } },
  s36(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('suikerketen', 1, 1.5);
    for (let i = 0; i < 9; i++) { const cx = 520 + (i % 3) * 200, cy = 330 + Math.floor(i / 3) * 200; cel(ctx, cx, cy, 86, '#2A3A58'); circ(ctx, cx, cy, 30, C.kern, C.kernR, 2); }
    if (k > 0.01) for (let i = 0; i < 6; i++) { const P = []; const n = Math.floor(30 * k); for (let j = 0; j < Math.max(2, n); j++) P.push([400 + j * 30, 260 + i * 110 + Math.sin(j * 0.8 + i + t * 0.6) * 20]); lijn(ctx, P, rgba(C.oker, 0.8), 4); }
    const st = q.on('stoppen', 1); const dc = q.on('kanker', 2); if (dc > 0.01) { ctx.save(); ctx.globalAlpha *= dc; for (let i = 0; i < 7; i++) cel(ctx, 1500 + Math.cos(i) * 90 * dc, 470 + Math.sin(i * 1.3) * 90 * dc, 46, '#4A2A2A', C.koraal); ctx.restore(); naamBij(ctx, 'kanker', 'cellen gaan door met delen', 1500, 700, dc, 'center', C.koraal); }
    naamBij(ctx, 'lange suikerketens', 'hyaluronzuur', 1100, 230, k, 'left', C.oker); naamBij(ctx, 'vol? stop met delen', '', 1100, 830, st, 'left', C.groen); },
  s37(ctx, t, q) { grondDoorsnede(ctx); molrat(ctx, 760, 660, 1.6, { t }); for (let i = 0; i < 10; i++) { const ph = (t * 0.3 + i / 10) % 1; circ(ctx, 200 + i * 160, 600 - ph * 60, 6, rgba(C.teal, (1 - q.on('weinig', 1) * 0.8) * (1 - ph))); }
    naamBij(ctx, 'weinig zuurstof', '', 400, 470, q.on('weinig', 1), 'left', C.teal); kaartIn(ctx, q.on('achttien', 1), 1220, 560, 560, 130, '18 minuten', 'zonder zuurstof (proef)', C.teal); kaartIn(ctx, q.on('fructose', 1), 1220, 720, 560, 130, 'Brandstof: fructose', 'in plaats van glucose', C.oker); },

  // ---------- 8. Kwal ----------
  s38(ctx, t, q) { onderWater(ctx, t); kwalT(ctx, 860, 520 + Math.sin(t * 1.5) * 20, 2.0, { t }); const r = q.on('rijstkorrel', 1); rijstkorrel(ctx, lerp(2100, 1460, r), 520, 1.6); naamBij(ctx, 'rijstkorrel', 'zelfde schaal', 1400, 660, r); naamBij(ctx, 'maag', '', 960, 190, q.on('kwal', 1), 'left', C.koraal); schaalBalk(ctx, 200, '1 mm');
    const j = q.on('jong', 1); if (j > 0.01) stempel(ctx, 1520, 260, 'weer jong?', C.goud, j, -0.1); },
  s40(ctx, t, q) { onderWater(ctx, t); const eet = q.on('opgegeten', 1); kwalT(ctx, 760, 480, 1.6, { t, a: 1 - eet * 0.7 }); vis(ctx, lerp(1500, 1000, eet), 500, 2.0, '#B8C8A8', { kijk: -1 });
    kaartIn(ctx, q.on('lab', 1), 1260, 680, 560, 130, 'Alleen in het lab gezien', 'niet in de vrije natuur', C.line); },
  s41(ctx, t, q) { bg(ctx, 'schema'); const p = q.on('poliep', 1), k = q.on('kwalletjes', 1), b = q.on('bolletje', 1), n = q.on('nieuwe', 1);
    poliep(ctx, 480, 760, 0.7, { t, groei: p }); kwalT(ctx, lerp(700, 1440, k), lerp(600, 420, k), 0.9, { t, a: k }); pijl(ctx, 640, 520, 1240, 340, C.groen, k, 5);
    kwalT(ctx, 960, lerp(420, 740, b), 0.7, { t, terug: b, a: b }); pijl(ctx, 1420, 620, 1090, 720, C.goud, b, 5); pijl(ctx, 830, 760, 680, 760, C.goud, q.on('weer', 1), 5);
    naamBij(ctx, 'poliep', 'vast op de bodem', 420, 520, p); naamBij(ctx, 'kwal', '', 1560, 220, k); naamBij(ctx, 'bolletje', 'terug naar de bodem', 960, 860, b, 'center', C.goud); if (n > 0.01) for (let i = 0; i < 3; i++) kwalT(ctx, 360 + i * 120, lerp(560, 380, n), 0.35, { t: t + i, a: n }); },
  s42(ctx, t, q) { bg(ctx, 'schema'); const v = U(t, q.at('veranderen', 1), 2.5); const r = lerp(150, 0, v);
    ctx.save(); ctx.translate(960, 470); ctx.beginPath(); ctx.ellipse(0, 0, lerp(150, 190, v), lerp(150, 110, v), 0, 0, 6.283); ctx.fillStyle = lerp(0, 1, v) > 0.5 ? '#5A3A30' : '#2E4A6A'; ctx.fill(); ctx.strokeStyle = v > 0.5 ? C.koraal : C.teal; ctx.lineWidth = 3; ctx.stroke(); circ(ctx, 0, 0, 50, C.kern, C.kernR, 2); ctx.restore();
    naamBij(ctx, v < 0.5 ? 'cel van het klokje' : 'cel van de poliep', '', 960, 720, 1, 'center'); naamBij(ctx, 'transdifferentiatie', '', 960, 260, q.on('transdifferentiatie', 1), 'center', C.goud);
    const kl = q.on('klonen', 1); if (kl > 0.01) { for (let i = 0; i < 3; i++) kwalT(ctx, 1400 + i * 150, 420, 0.4, { t: t + i, a: kl }); naamBij(ctx, 'klonen', 'zelfde DNA', 1550, 640, kl, 'center', C.paars); } },

  // ---------- 9. Bombardeerkever ----------
  s43(ctx, t, q) { bodemLand(ctx, { voor: '#4A4232' }); steen(ctx, 1300, 780, 600, 260); const l = U(t, 0.5, 3); bombardeerkever(ctx, lerp(1150, 760, l), 760, 2.4, { t: t * (l < 1 ? 1 : 0.2), rot: 1.57 }); schaalBalk(ctx, 260, '1 cm (vergroot)');
    const p = q.on('plofje', 1); if (p > 0.01) { text(ctx, 'plof!', 400, 400, fTitel(72), rgba(C.goud, p), 'center'); } },
  s45(ctx, t, q) { bodemLand(ctx, { voor: '#4A4232' }); bombardeerkever(ctx, 760, 700, 2.4, { t: t + 0.3, rot: 1.57, spuit: q.on('gif', 1), richting: Math.PI * (0.45 + Math.sin(t * 0.8) * 0.08) }); naamBij(ctx, 'bijna 100 °C', '', 220, 640, q.on('honderd', 1), 'left', C.koraal);
    const pd = q.on('pad', 1); if (pd > 0.01) kaartIn(ctx, pd, 1180, 200, 660, 130, 'Pad spuugt hem uit', 'bij een verwante soort, de kever leeft nog', C.groen); },
  s46(ctx, t, q) { bg(ctx, 'schema'); ctx.beginPath(); ctx.ellipse(800, 470, 420, 220, 0, 0, 6.283); ctx.fillStyle = '#2A3A5E'; ctx.fill(); ctx.strokeStyle = '#4A6A9A'; ctx.lineWidth = 3; ctx.stroke();
    const k1 = q.on('mengsel', 1), k2 = q.on('enzymen', 1); ctx.beginPath(); ctx.ellipse(780, 470, 140, 100, 0, 0, 6.283); ctx.fillStyle = rgba(C.oker, 0.5 * k1); ctx.fill(); ctx.strokeStyle = C.oker; ctx.stroke(); ctx.beginPath(); ctx.ellipse(1080, 470, 80, 60, 0, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.5 * k2); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.stroke();
    const dr = clamp((t - q.at('Druppelt', 1)) / 1.2, 0, 1); if (dr > 0 && dr < 1) circ(ctx, lerp(900, 1050, dr), 470, 12, C.oker); const sp = q.on('spuit', 1); if (sp > 0.01) { lijn(ctx, [[1160, 470], [1160 + 220 * sp, 470]], '#F4EED6', 12); for (let i = 0; i < 4; i++) circ(ctx, 1380 + i * 40 * sp, 470 + Math.sin(t * 6 + i) * 10, 10 + i * 6, rgba('#F4EED6', 0.6 * sp)); }
    if (dr >= 1 && t < q.at('spuit', 1) + 1) circ(ctx, 1080, 470, 30 + Math.sin(t * 20) * 6, rgba('#FFF6D8', 0.6));
    naamBij(ctx, 'mengsel', 'twee stoffen', 780, 720, k1, 'center', C.oker); naamBij(ctx, 'kamer met enzymen', '', 1080, 300, k2, 'center', C.koraal); naamBij(ctx, 'bijna 100 °C', '', 1400, 400, q.on('honderd', 1), 'left', C.koraal); },
  s47(ctx, t, q) { bg(ctx, 'schema'); const g = U(t, q.at('honderden', 1), 4); assen(ctx, 200, 260, 1400, 400, 'tijd (duizendsten van een seconde)', 'druk');
    ctx.save(); ctx.beginPath(); ctx.rect(200, 200, 1400 * g, 500); ctx.clip(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 1400; i += 4) { const ph = (i / 70) % 1; ctx.lineTo(200 + i, 660 - (ph < 0.3 ? ph / 0.3 : 1 - (ph - 0.3) / 0.7) * 320); } ctx.stroke(); ctx.restore();
    naamBij(ctx, 'honderden pufjes per seconde', 'klepje dicht, open, dicht', 900, 820, q.on('honderden', 1), 'center');
    const st = q.on('Stap', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.fillStyle = rgba(C.bgSchema, 0.94); ctx.fillRect(0, 0, W, 880); [['stinkend goedje', 'veel loopkevers'], ['opslag', 'een reservoir'], ['enzymen', 'in bijna elke cel'], ['reactiekamer', 'heet en onder druk']].forEach(([a, b], i) => { kaartIn(ctx, U(t, q.at('Stap', 1) + i * 0.8, 0.6), 180 + i * 420, 400, 380, 130, a, b, C.groen); if (i < 3) pijl(ctx, 560 + i * 420, 465, 600 + i * 420, 465, C.goud, 1, 4); }); ctx.restore(); } },

  // ---------- 10. Liervogel ----------
  s48(ctx, t, q) { bosGrond(ctx); liervogel(ctx, lerp(600, 900, U(t, 0, 3)), 800, 1.6, { t, zing: q.on('na', 1) * (0.5 + 0.5 * Math.sin(t * 9)) }); naamBij(ctx, 'liervogel', 'Australië', 1240, 340, q.on('liervogel', 1));
    const z = q.on('kettingzaag', 1); if (z > 0.01) { ctx.save(); ctx.globalAlpha *= z; roundRect(ctx, 140, 160, 860, 110, 16); shape(ctx, '#F2F2EE', null); text(ctx, '"Liervogel doet kettingzaag na!"', 170, 228, fTekst(36, 700), '#1A2740', 'left'); metaText(ctx, 'internet', 160, 150, C.text2, 'left', 22); ctx.restore(); } },
  s50(ctx, t, q) { bosGrond(ctx); const g = q.on('gevangenschap', 1); for (let i = 0; i < 12; i++) { ctx.fillStyle = rgba('#5A5E66', g); ctx.fillRect(1100 + i * 60, 360, 8, 420); } ctx.fillStyle = rgba('#5A5E66', g); ctx.fillRect(1080, 380, 760, 8); ctx.fillRect(1080, 560, 760, 8);
    liervogel(ctx, 1400, 800, 1.2, { t, zing: 0.5 + 0.5 * Math.sin(t * 9) }); kaartIn(ctx, g, 160, 300, 760, 130, 'Alleen in gevangenschap', 'vogels die bouwlawaai hoorden', C.goud); kaartIn(ctx, q.on('wilde', 1), 160, 470, 760, 130, 'In het wild', 'niet bekend', C.line); },
  s51(ctx, t, q) { bosGrond(ctx); const toon = U(t, q.at('staart', 1), 2.2); liervogel(ctx, 960, 820, 1.6, { t, toon, zing: (1 - toon) * (0.5 + 0.5 * Math.sin(t * 9)) });
    naamBij(ctx, '3/4 van zijn zang', 'nagedaan', 300, 300, q.on('driekwart', 1)); naamBij(ctx, 'leert van oudere liervogels', '', 300, 420, q.on('oudere', 1)); naamBij(ctx, 'zilveren sluier', 'de staart', 1340, 230, q.on('sluier', 1)); },
  s52(ctx, t, q) { bosGrond(ctx); const w = q.on('weggaan', 1); liervogel(ctx, 1100, 820, 1.3, { t, toon: 1 }); liervogel(ctx, lerp(420, 260, w * (1 - q.on('blijft', 1))), 820, 0.95, { t, kijk: w > 0.5 && q.on('blijft', 1) < 0.5 ? -1 : 1 });
    const al = q.on('alarm', 1); [[1500, 260], [1640, 340], [1560, 440], [1720, 220]].forEach(([x, y], i) => { const a = clamp(al * 4 - i, 0, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; vul(ctx, [[x - 26, y], [x, y - 12], [x + 30, y - 4], [x + 6, y + 10]], '#8A7A6A'); text(ctx, '!', x + 40, y - 6, fTekst(44, 800), C.koraal, 'left'); ctx.restore(); });
    naamBij(ctx, 'nep-alarm', 'alsof er een roofdier is', 1500, 560, al, 'left', C.koraal); naamBij(ctx, 'vrouwtje', '', 300, 420, q.on('vrouwtje', 2)); naamBij(ctx, 'show', 'vrouwtjes kiezen', 1100, 120, q.on('show', 1), 'center'); stempel(ctx, 1500, 760, 'ontdekt in 2021', C.goud, q.on('2021', 1), -0.08); },

  // ---------- Slot ----------
  s53(ctx, t, q) { onderWater(ctx, t, { bodem: '#2E3A36' }); tienDieren(ctx, t); const v = q.on('gemeten', 1); if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; text(ctx, 'Wie heeft het gemeten? En hoe?', W / 2, 140, fTitel(72), C.text, 'center'); ctx.restore(); } },
});
