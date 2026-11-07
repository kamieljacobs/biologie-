
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
// =====================================================================================
// lib_bio.js — gedeelde tekenbibliotheek voor de films (prompt v8, C7 + C9 Tekenrecepten)
// Eerst gebruikt: Geslachtsorganen en puberteit 1.1 en Wat zit er in je eten? 1.1 (22 okt 2026).
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease, shape, roundRect, text.
// Elk object: recept (verhoudingen, bron) + bekende fouten in het commentaar erboven.
// Een film kopieert dit bestand naar bron/src/ en plakt het na lib_cast.js in de pagina.
// =====================================================================================

const BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
const _bioPolyCache = {};

// ---------- kleine helpers ----------
function bioPad(ctx, pts, closed = false) { // Catmull-Rom door punten
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]);
  const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}
function bioPunt(pts, u) { // punt + richting op fractie u (0..1) van een polylijn
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function bioDicht(pts, n = 80) { // gladde, gelijk verdeelde punten langs een pad
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  out.push(pts[m - 1]); return out;
}

// =====================================================================================
// HOOFD MET HERSENEN, zijaanzicht (mediane doorsnede), kijkt naar rechts.
// Recept: hoofdlengte ≈ 1,2× hersenlengte; grote hersenen ≈ 2/3 van de schedel; kleine hersenen achter-onder,
// ≈ 1/8 van het volume; hypothalamus onder de thalamus, vóór de hersenstam; hypofyse (± 1 cm, erwt) hangt aan
// een steeltje in het Turkse zadel (botkuiltje) recht boven de neusholte; hersenbalk als C-band boven de thalamus.
// Bron: Gray's Anatomy (mediaan sagittaal), Kenhub 'Hypothalamus'. Bekende fouten: hypofyse los zwevend of
// náást de hersenen; hersenen als ovaal zonder kleine hersenen en hersenstam; hypothalamus achterin.
// Ontwerpcoördinaten: hoofd ± 470 breed × 600 hoog, oorsprong = hypothalamus.
// =====================================================================================
function hoofdHersenen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, hthCol = BIO.klier, hypCol = BIO.klier, huid = BIO.huid, gloed = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  if (a <= 0.01) return { hth: P(0, 0), hyp: P(8, 64), steel: P(4, 34) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hoofd + hals (profiel naar rechts: voorhoofd, neus, lippen, kin)
  const HOOFD = [[-60, 330], [-70, 250], [-120, 190], [-205, 120], [-245, 10], [-240, -110], [-190, -215], [-90, -280], [30, -290], [140, -250], [205, -170],
    [225, -90], [228, -30], [244, 10], [272, 60], [262, 78], [246, 84], [252, 106], [244, 122], [252, 138], [240, 160], [222, 182], [196, 196], [150, 200], [120, 240], [110, 330]];
  ctx.beginPath(); bioPad(ctx, HOOFD, false); ctx.lineTo(-60, 330); ctx.closePath();
  shape(ctx, rgba(huid, 0.22), rgba(huid, 0.85), 2.5);
  // schedel (binnenrand) als dunne botlijn
  ctx.beginPath(); bioPad(ctx, [[-200, 110], [-225, 0], [-218, -110], [-170, -200], [-80, -258], [30, -266], [130, -228], [190, -150], [204, -70], [190, -10], [150, 30]], false);
  ctx.strokeStyle = rgba(BIO.bot, 0.55); ctx.lineWidth = 8; ctx.stroke();
  // Turks zadel (botkuiltje voor de hypofyse) en neusholte erboven/ervoor
  ctx.beginPath(); ctx.moveTo(-30, 70); ctx.quadraticCurveTo(-18, 100, 10, 98); ctx.quadraticCurveTo(36, 96, 44, 66); ctx.strokeStyle = rgba(BIO.bot, 0.75); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[60, 50], [140, 40], [215, 50], [232, 90], [200, 120], [120, 118], [70, 100]], true); ctx.fillStyle = rgba('#0D1420', 0.35); ctx.fill();
  // grote hersenen
  const GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
  ctx.beginPath(); bioPad(ctx, GROOT, true); shape(ctx, rgba(BIO.brein, 0.9), BIO.breinS, 2);
  // windingen (gyri) als zachte groeven, binnen de grote hersenen
  ctx.save(); ctx.beginPath(); bioPad(ctx, GROOT, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = 3;
  const GROEF = [[[-190, -60], [-150, -80], [-170, -130]], [[-120, -210], [-100, -160], [-60, -175], [-40, -130]], [[0, -235], [10, -190], [50, -200], [60, -150]],
    [[110, -215], [100, -170], [130, -150]], [[165, -110], [130, -100], [140, -60]], [[-170, 30], [-140, 0], [-100, 20]], [[-70, -110], [-30, -90], [10, -110], [50, -95], [90, -120]],
    [[-185, -150], [-150, -150]], [[150, -40], [120, -30]]];
  GROEF.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
  ctx.restore();
  // hersenbalk (C-vormige band)
  ctx.beginPath(); bioPad(ctx, [[-120, -10], [-130, -60], [-80, -95], [20, -100], [100, -80], [125, -45], [105, -30], [70, -55], [10, -68], [-70, -62], [-100, -35], [-95, -5]], true);
  shape(ctx, rgba(BIO.wit, 0.9), rgba(BIO.breinS, 0.8), 1.5);
  // thalamus
  ctx.beginPath(); ctx.ellipse(-10, -28, 46, 26, -0.1, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.75), BIO.breinD, 1.5);
  // kleine hersenen met boompje (arbor vitae)
  const KLEIN = [[-110, 60], [-150, 70], [-200, 80], [-210, 130], [-170, 175], [-110, 170], [-80, 130], [-85, 85]];
  ctx.beginPath(); bioPad(ctx, KLEIN, true); shape(ctx, rgba(BIO.brein, 0.95), BIO.breinS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KLEIN, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.wit, 0.8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-88, 112); ctx.lineTo(-130, 118); ctx.stroke(); for (let k = 0; k < 5; k++) { const an = 2.35 + k * 0.38; const bx = -112 - k * 4, by = 116; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.cos(an) * 40, by + Math.sin(an) * 28, bx + Math.cos(an) * 78, by + Math.sin(an) * 52); ctx.stroke(); ctx.lineWidth = 1.6; for (const sd of [-0.3, 0.3]) { ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * 45, by + Math.sin(an) * 30); ctx.lineTo(bx + Math.cos(an + sd) * 74, by + Math.sin(an + sd) * 50); ctx.stroke(); } }
  ctx.restore();
  // hersenstam (middenhersenen, brug, verlengde merg) naar het ruggenmerg
  ctx.beginPath(); bioPad(ctx, [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]], true);
  shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  // hypothalamus (onder de thalamus, vóór de hersenstam) + gloed
  if (hth > 0.01 && gloed) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90); g.addColorStop(0, rgba(hthCol, 0.5 * hth)); g.addColorStop(1, rgba(hthCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); bioPad(ctx, [[-26, -6], [10, -14], [36, -2], [30, 18], [4, 22], [-20, 14]], true); shape(ctx, rgba(hthCol, 0.35 + 0.6 * Math.max(hth, 0.25)), lighten(hthCol, 0.25), 2);
  // steeltje (infundibulum) en hypofyse in het Turkse zadel
  ctx.strokeStyle = lighten(hthCol, 0.15); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(10, 18); ctx.quadraticCurveTo(12, 40, 6, 58); ctx.stroke();
  if (hyp > 0.01 && gloed) { const g = ctx.createRadialGradient(8, 72, 0, 8, 72, 60); g.addColorStop(0, rgba(hypCol, 0.5 * hyp)); g.addColorStop(1, rgba(hypCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(8, 72, 60, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(8, 74, 24, 17, 0, 0, 6.283); shape(ctx, rgba(hypCol, 0.35 + 0.6 * Math.max(hyp, 0.25)), lighten(hypCol, 0.25), 2);
  ctx.strokeStyle = rgba('#0D1420', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4, 58); ctx.lineTo(6, 90); ctx.stroke(); // voor- en achterkwab
  // oog (in profiel) voor herkenning
  ctx.beginPath(); ctx.ellipse(204, 22, 13, 8, 0, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fill(); ctx.beginPath(); ctx.arc(212, 22, 5, 0, 6.283); ctx.fillStyle = '#2A1E18'; ctx.fill();
  ctx.restore();
  return { hth: P(0, 0), hyp: P(8, 74), steel: P(8, 40) };
}

// =====================================================================================
// BLOEDVAT met stroom. Recept: rode bloedcel = ingedeukte schijf, 7–8 µm breed, ± 2 µm dik; van opzij een
// halter, van boven een schijf met lichter midden; ze kantelen in de stroom en vervormen in een haarvat
// (± 5–8 µm, één voor één). Hormonen veel kleiner: stipjes die meestromen. Bekende fouten: bloedcellen als
// bollen; stroom met constante snelheid zonder spreiding.
// pts = pad (ontwerpcoördinaten op het scherm), r = halve binnendiameter.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-r * 0.9, -r * 0.85); ctx.quadraticCurveTo(r * 1.3, 0, -r * 0.9, r * 0.85); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.9, -r * 0.85); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}

// =====================================================================================
// ZENUWCEL (neuron). Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die
// zich als een boom vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon
// vanuit een kegeltje, lang en overal even dik, eindigt in vertakkingen met knopjes (synaps).
// Bron: Kandel, Principles of Neural Science, fig. 2-1. Bekende fouten: ster met gelijke armen; axon dat
// dunner wordt; geen kern.
// =====================================================================================
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6 } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 18 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    if (puls >= 0 && puls <= 1) { const [qx, qy] = bioPunt(pts, puls); const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 26 * s); g.addColorStop(0, rgba(pulsCol, 0.9)); g.addColorStop(1, rgba(pulsCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 26 * s, 0, 6.283); ctx.fill(); }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
}

// =====================================================================================
// VETCEL en VETWEEFSEL. Recept: witte vetcel 50–150 µm; één grote vetdruppel vult ± 90 % van de cel;
// cytoplasma als dun randje; kern platgedrukt (sikkel) tegen de rand. In weefsel drukken de cellen tegen
// elkaar tot veelhoeken met afgeronde hoeken (Voronoi-patroon, 80–120 % grootteverschil), haarvaten ertussen.
// Bron: Junqueira's Basic Histology, h. 6. Bekende fouten: raster van gelijke rondjes; kern in het midden.
// =====================================================================================
function _bioCellen(key, w, h, d, seed) { // Voronoi-cellen in een rechthoek (gecachet)
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const cs = []; const cols = Math.max(2, Math.round(w / d)), rows = Math.max(2, Math.round(h / (d * 0.87)));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cs.push([(c + 0.5 + (r % 2 ? 0.5 : 0) - 0.5 * (cols > 1 ? 0 : 0)) * w / cols - w / 2 + (hash(seed + r * 31 + c * 7) - 0.5) * d * 0.45, (r + 0.5) * h / rows - h / 2 + (hash(seed + r * 17 + c * 13) - 0.5) * d * 0.4]);
  const polys = cs.map((p, i) => { const pts = []; for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.75;
      cs.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); const proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); });
      best = Math.max(0, best - 3); pts.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts }; });
  _bioPolyCache[key] = polys; return polys;
}
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.55), rgba(BIO.cyto, 0.9), 1.5);
  // vetdruppel: dezelfde vorm iets kleiner
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  const druppel = omtrek.map(p => [cx + (p[0] - cx) * 0.86, cy + (p[1] - cy) * 0.86]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.85), rgba(BIO.vetS, 0.9), 1.2);
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(cx, cy); ctx.restore(); }
  // kern: sikkel tegen de rand (op de punt van de omtrek rechtsonder)
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * rr * 0.93, cy + Math.sin(an) * rr * 0.93, Math.max(4, rr * 0.18), Math.max(2, rr * 0.06), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.9), BIO.kernL, 1);
  ctx.restore();
}
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  if (haarvat) bloedvat(ctx, [[x - w / 2 - 20, y + h * 0.1], [x - w * 0.15, y - h * 0.05], [x + w * 0.2, y + h * 0.08], [x + w / 2 + 20, y - h * 0.02]], 5, t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' });
  ctx.restore();
  ctx.restore();
}

// =====================================================================================
// ZAADCEL. Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat (peddel); acrosoomkap over 40–70 % van de
// kop; middenstuk ± 5 µm, iets dikker; staart ± 45 µm → hele cel ± 55 µm, staart ± 10× de koplengte. Een golf
// loopt van kop naar staart (golflengte ± 0,4 staart, uitslag groeit naar het eind), de kop draait om zijn as
// (wordt afwisselend smal en breed). Slag ± 10–15 per seconde; in films vertraagd. Bron: WHO-laborhandboek
// sperma 2021, fig. 2.x. Bekende fouten: kikkervisje met korte staart; staart die alleen achteraan zwaait.
// Oorsprong = midden van de kop; ang = zwemrichting.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s; // px per µm
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = 4.6 * U, kopB = 3 * U * (0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)));
  const midL = 5 * U, staartL = 45 * U, golf = 0.42 * staartL;
  const ph = t * slag * 6.283;
  const pts = []; for (let i = 0; i <= 60; i++) { const d = (i / 60) * (midL + staartL); const amp = (0.4 + 3.2 * Math.pow(d / (midL + staartL), 1.2)) * U;
    pts.push([-kopL * 0.5 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  // staart (eind dunner), middenstuk dikker
  for (let i = 1; i < pts.length; i++) { const d = i / 60 * (midL + staartL); ctx.strokeStyle = col; ctx.lineWidth = d < midL ? 1.25 * U : Math.max(0.6, lerp(0.75 * U, 0.25 * U, (d - midL) / staartL));
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }
  // kop (peddel) + acrosoomkap
  ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.12, 0, kopL * 0.42, kopB * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.65); ctx.fill(); ctx.restore();
  ctx.restore();
}

// =====================================================================================
// EICEL (in de follikel) en EIERSTOK in doorsnede. Recept: eierstok ± 3 × 2 × 1 cm (amandel); schors (buitenste
// derde) vol primordiale follikels (eicel met één laag platte cellen), merg in het midden met bloedvaten die
// via de hilus binnenkomen. Rijping: primaire follikel (één laag kubische cellen) → secundaire (meerdere lagen)
// → follikel met holte (antrum), eicel op een heuveltje (cumulus) → Graafse follikel 18–25 mm (zo groot dat hij
// uitpuilt). Eisprong: wand scheurt aan het oppervlak, eicel met stralenkrans komt vrij, wat overblijft wordt
// het gele lichaam (gele, geplooide wand). Groottes niet op schaal (follikels vergroot). Bron: Junqueira h. 22;
// Sadler, Langman's Embryology h. 2. Bekende fouten: eicellen als losse stipjes; eisprong als puntje dat wegvliegt.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (krans) for (let k = 0; k < 18; k++) { const an = k / 18 * 6.283; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5, r * 0.24, 0, 6.283); shape(ctx, rgba('#E6C9A8', 0.65), rgba('#B88A60', 0.6), 1); }
  ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.35), rgba('#F6EEDC', 0.8), 1.5); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill();
  ctx.restore();
}
function follikel(ctx, x, y, f, o = {}) { // f: 0 primordiaal → 1 Graaf; schaalgrootte via o.R (straal bij f=1)
  const { a = 1, R = 120, scheur = 0, seed = 0, eicel = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = lerp(o.klein ? 7.5 : 9, R, Math.pow(f, 1.6)); const ei = lerp(4, Math.max(10, R * 0.12), Math.min(1, f * 2.2));
  // theca (buitenste ring) vanaf secundair
  if (f > 0.3) { ctx.beginPath(); ctx.arc(x, y, r + 6 + 4 * f, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.25 * f), rgba('#C98A6A', 0.5 * f), 1.5); }
  // granulosacellen
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.75), rgba('#C9966A', 0.9), 1.2);
  // celkorrels in de granulosa (één laag plat → meerdere lagen)
  const nRing = o.klein ? 6 : Math.round(lerp(8, 34, Math.min(1, f * 1.4))); const lagen = f < 0.15 ? 1 : f < 0.4 ? 2 : 3;
  for (let L = 0; L < lagen; L++) for (let k = 0; k < nRing; k++) { const an = k / nRing * 6.283 + L * 0.3 + seed; const rr = r * (0.88 - L * 0.1); const cr = Math.max(1.4, r * 0.06);
    ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (f < 0.1 ? 1.6 : 1), cr * (f < 0.1 ? 0.6 : 1), an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.55); ctx.fill(); }
  // antrum (vochtholte) vanaf f > 0.45, eicel op de cumulus aan één kant
  let ex = x, ey = y;
  if (f > 0.45) { const af = clamp((f - 0.45) / 0.55, 0, 1); const ar = r * lerp(0.2, 0.8, af);
    ctx.beginPath(); ctx.arc(x + r * 0.08 * af, y - r * 0.05 * af, ar, 0, 6.283); shape(ctx, rgba('#E9F0F4', 0.55), rgba('#BFD0DA', 0.7), 1);
    ex = x - r * 0.55 * af; ey = y + r * 0.35 * af;
    ctx.beginPath(); ctx.arc(ex, ey, ei * 2.2, 0, 6.283); ctx.fillStyle = rgba('#E2B88E', 0.85); ctx.fill(); }
  if (eicel && scheur < 0.5) eicelEcht(ctx, ex, ey, ei, 1, f > 0.6);
  ctx.restore(); return [ex, ey, ei];
}
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 160, groei = 0, eis = 0, geel = 0, t = 0, winnaar = 3 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; const w = 1 + 0.03 * Math.sin(an * 3 + 1) + 0.02 * Math.sin(an * 7); return [x + Math.cos(an) * rx * w, y + Math.sin(an) * ry * w]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.32), lighten('#C98A6A', 0.25), 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  // merg: lichter, met bloedvaten vanaf de hilus (onderkant)
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.08, rx * 0.5, ry * 0.42, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.35); ctx.fill();
  const vat = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  [[-0.05, 1], [0.05, 1]].forEach(([dx], i) => { const c = i ? rgba(BIO.ader, 0.7) : rgba(BIO.bloed, 0.75);
    vat([[x + dx * rx, y + ry * 1.05], [x + dx * rx * 1.4, y + ry * 0.5], [x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.5 * rx, y - ry * 0.1]], c, 5);
    vat([[x + dx * rx * 1.4, y + ry * 0.5], [x + 0.3 * rx + i * 20, y + ry * 0.1], [x + 0.55 * rx, y - ry * 0.15]], c, 4);
    vat([[x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.1 * rx, y - ry * 0.35]], c, 3); });
  ctx.restore();
  // primordiale follikels in de schors (buitenste derde), niet in het merg
  for (let i = 0; i < n; i++) { const an = hash(i * 3 + 1) * 6.283, rr = lerp(0.68, 0.93, hash(i * 3 + 2)); follikel(ctx, x + Math.cos(an) * rx * rr, y + Math.sin(an) * ry * rr, 0, { R: ry * 0.5, seed: i, a: 0.8, klein: true }); }
  // groepje dat rijpt; één wint, de rest gaat te gronde
  const grp = [[-0.45, -0.38], [-0.2, 0.48], [0.18, -0.52], [0.5, -0.12], [-0.6, 0.22]];
  let uit = null;
  grp.forEach(([gx, gy], i) => { const win = i === winnaar; const g = groei * (win ? 1 : 0.5) * (win ? 1 : 1 - eis); if (g <= 0.01 || (win && geel > 0.5)) return;
    const px = x + gx * rx * (win ? 0.95 : 1), py = y + gy * ry * (win ? 0.95 : 1);
    const p = follikel(ctx, px, py, win ? g : g * 0.55, { R: ry * 0.42, seed: i, a: win ? 1 : 1 - eis * 0.7, scheur: win ? eis : 0 });
    if (win) uit = { x: px, y: py, ei: p }; });
  // eisprong: wand scheurt aan de rand, eicel met stralenkrans + vocht komt vrij
  if (uit && eis > 0.01) { const an = Math.atan2(uit.y - y, uit.x - x); const sx = x + Math.cos(an) * rx * 1.02, sy = y + Math.sin(an) * ry * 1.02;
    ctx.save(); ctx.globalAlpha *= clamp(eis * 3, 0, 1); ctx.strokeStyle = rgba('#E9F0F4', 0.6); ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { const sp = an + (k - 2) * 0.25; const d = eis * 90; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(sp) * d, sy + Math.sin(sp) * d); ctx.stroke(); } ctx.restore();
    const e = ease(eis); eicelEcht(ctx, lerp(uit.ei[0], sx + Math.cos(an) * 110, e), lerp(uit.ei[1], sy + Math.sin(an) * 110, e), uit.ei[2] * 1.4, 1, true); }
  if (geel > 0.01) { const [gx, gy] = grp[winnaar]; const px = x + gx * rx * 0.95, py = y + gy * ry * 0.95; ctx.save(); ctx.globalAlpha *= geel;
    ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const rr = ry * 0.32 * (1 + 0.08 * Math.sin(an * 9)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba('#E8C25A', 0.75), '#C99A3A', 2); ctx.restore(); }
  ctx.restore(); return uit;
}

// =====================================================================================
// BAARMOEDERWAND met slijmvlies (uitsnede, holte boven). Recept: spierlaag (myometrium) 1–2 cm, glad spierweefsel;
// slijmvlies 1 mm na de menstruatie → 5–7 mm (soms tot 10) rond de eisprong en daarna; basale laag blijft, de
// functionele laag erboven groeit en laat los. Klieren: rechte buisjes die later kronkelen (zaagtand); spiraal-
// slagaders lopen kronkelend omhoog. Bij de menstruatie knijpen de spiraalslagaders dicht, de functionele laag
// laat in stukjes los met bloed. Bron: Junqueira h. 22; Guyton h. 82. Bekende fouten: slijmvlies als vlak blokje;
// eicel in het menstruatiebloed.
// dikte 0..1 (0,15 ≈ 1 mm, 1 ≈ 7 mm), los 0..1 (afstoten).
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const spierH = h * 0.42, basaal = h * 0.06, fmax = h * 0.5; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH; // ys = top spier, yf = oppervlak
  const golf = (xx, amp, k) => amp * Math.sin(xx / w * 6.283 * k + seed);
  // spierlaag: spoelvormige vezels in banen
  roundRect(ctx, x - w / 2, ys, w, spierH, 10); shape(ctx, rgba(BIO.spier, 0.55), rgba(BIO.spierL, 0.6), 1.5);
  ctx.save(); roundRect(ctx, x - w / 2, ys, w, spierH, 10); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.55); ctx.lineWidth = 2;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 14; c++) { const cx = x - w / 2 + (c + (r % 2) * 0.5) * w / 13, cy = ys + 14 + r * (spierH - 20) / 6; ctx.beginPath(); ctx.ellipse(cx, cy, w / 32, 3.2, 0.08 * Math.sin(c + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // basale laag
  ctx.fillStyle = rgba(BIO.slijmD, 0.75); ctx.fillRect(x - w / 2, yba, w, basaal);
  // functionele laag (met golvend oppervlak), losraken = brokken die omhoog drijven
  const opp = []; for (let i = 0; i <= 40; i++) { const xx = x - w / 2 + i / 40 * w; opp.push([xx, yf + golf(xx, 6 * dikte, 3)]); }
  const vastFrac = 1 - clamp(los, 0, 1);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, yba); for (const p of opp) ctx.lineTo(p[0], lerp(yba, p[1], vastFrac)); ctx.lineTo(x + w / 2, yba); ctx.closePath();
  ctx.fillStyle = rgba(BIO.slijm, 0.7); ctx.fill(); ctx.clip();
  // klieren: rechte buisjes → kronkelend
  const nk = 9; for (let k = 0; k < nk; k++) { const kx = x - w / 2 + (k + 0.5) * w / nk; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const u = i / 20; const yy = lerp(yba, yf - 10, u); const zx = Math.sin(u * 14 + k) * 7 * kronkel * dikte; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke();
    ctx.strokeStyle = rgba(BIO.slijmD, 0.6); ctx.lineWidth = 2; ctx.stroke(); }
  // spiraalslagaders
  for (let k = 0; k < 5; k++) { const kx = x - w / 2 + (k + 1) * w / 6 + 20; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - los * 0.5)); ctx.lineWidth = 3.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys + 10, yf + 10, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
  ctx.restore();
  // oppervlakte-epitheel
  ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 3; ctx.beginPath(); opp.forEach((p, i) => { const yy = lerp(yba, p[1], vastFrac); i ? ctx.lineTo(p[0], yy) : ctx.moveTo(p[0], yy); }); ctx.stroke();
  // afstoten: brokken functionele laag + bloed drijven de holte in (omhoog)
  if (los > 0.01) { for (let k = 0; k < 12; k++) { const bx = x - w / 2 + (k + 0.5) * w / 12 + (hash(k + 5) - 0.5) * 30; const lift = los * (40 + 80 * hash(k + 9)); const bw = w / 14, bh = fH * 0.6 * (0.6 + 0.4 * hash(k));
      ctx.save(); ctx.globalAlpha *= clamp(1.3 - los, 0, 1); ctx.beginPath(); ctx.ellipse(bx, yba - bh / 2 - lift, bw / 2, bh / 2, (hash(k) - 0.5) * 0.6, 0, 6.283); shape(ctx, rgba(BIO.slijm, 0.75), rgba(BIO.bloed, 0.7), 1.5); ctx.restore();
      ctx.beginPath(); ctx.arc(bx + 12, yba - lift * 0.7, 5, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.8 * los); ctx.fill(); } }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}

// =====================================================================================
// MOLECULEN (voeding). Kleurtaal van de reeks: koolhydraat V.kh (zeshoek), eiwit V.ew (kraal), vet V.vt.
// ZETMEEL: amylose = keten van glucoseringen die een spiraal vormt, ± 6 glucose per winding (helix, linksdraaiend
// gezien langs de as, in 2D: een golf met diepte; ringen achteraan kleiner en donkerder). Bij vertering wikkelt
// de keten zich af en knippen enzymen hem in losse glucose. Bron: Berg, Biochemistry h. 11. Bekende fout: een rechte
// rij zeshoeken (dat is eerder cellulose).
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; /* spreid: hoe ver de losse glucose uit elkaar gaat (1 = 3,7 r per stuk) */ ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: (p[2] + pos[i - 1][2]) / 2 - 0.01, lijn: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { const lf = 1 - clamp(los / 0.6, 0, 1);
    if (it.lijn) { if (lf <= 0.01) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.save(); ctx.globalAlpha *= lf * (0.55 + 0.45 * (it.z + 1) / 2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); return; }
    const p = pos[it.ring]; const k = 0.66 + 0.4 * (p[2] + 1) / 2; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * (p[2] + 1) / 2; hexagon(ctx, p[0], p[1], r * k, p[2] < -0.3 ? lighten(fill, -0.18) : fill, lighten(fill, 0.35)); ctx.restore(); });
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
// CELLULOSE: rechte ketens van glucose, elke volgende ring omgekeerd (β-1,4); ketens liggen evenwijdig en zijn
// met waterstofbruggen (stippellijntjes) tot een vezeltje gebonden. Bekende fout: losse groene bolletjes.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, col = (typeof V !== 'undefined' ? V.vezel : C.groen) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const dy = r * 2.1;
  for (let k = 0; k < ketens - 1; k++) { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(i * r * 2.2, k * dy + r * 0.6); ctx.lineTo(i * r * 2.2 + r * 0.4, (k + 1) * dy - r * 0.6); ctx.stroke(); } ctx.setLineDash([]); }
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.6; ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(off, k * dy); ctx.lineTo(off + (n - 1) * r * 2.2, k * dy); ctx.stroke();
    for (let i = 0; i < n; i++) hexagon(ctx, off + i * r * 2.2, k * dy + (i % 2 ? 1.5 : -1.5), r, rgba(col, 0.8), lighten(col, 0.3), 1.1, i % 2 ? Math.PI / 6 : 0); }
  ctx.restore();
}
// EIWIT dat vouwt. Recept: keten van aminozuren (kralen) vouwt in stukken: eerst α-helices (strakke spiraal,
// 3,6 aminozuren per winding) en β-strengen (zigzag, naast elkaar met waterstofbruggen), daarna de hele keten
// tot een compacte kluwen (tertiaire structuur). Vouwen is een morph, geen wissel. Bekende fout: een bol.
function _eiwitVorm(n, s) { // doelvorm: helix – lus – streng ⇄ streng (haarspeld) – lus – helix – staart; ± 320 × 200 bij s=1
  // Eén doorlopende gids; elk stuk heeft een soort. Helix: kleine as-stap + zijwaartse golf (3,6 per winding); streng: gestrekt.
  const G = [['h', [[-150, -86], [-84, -10]]], ['l', [[-84, -10], [-70, 34], [-30, 62]]], ['s', [[-30, 62], [100, 62]]], ['l', [[100, 62], [136, 40], [100, 16]]],
    ['s', [[100, 16], [-10, 16]]], ['l', [[-10, 16], [-44, -10], [-20, -50]]], ['h', [[-20, -50], [110, -86]]], ['l', [[110, -86], [156, -64], [164, -20], [150, 20]]]];
  const dense = []; G.forEach(([tp, pts]) => bioDicht(pts, 60).forEach(q => dense.push([q[0], q[1], tp])));
  const out = []; let acc = 1e9, hp = 0, prev = null;
  for (let i = 1; i < dense.length && out.length < n; i++) { const a2 = dense[i - 1], b = dense[i]; acc += Math.hypot(b[0] - a2[0], b[1] - a2[1]);
    const stap = b[2] === 'h' ? 9 : 26; if (acc < stap) continue; acc = 0; const an = Math.atan2(b[1] - a2[1], b[0] - a2[0]);
    let w = 0, z = 0, ax = 0; if (b[2] === 'h') { const ph = hp / 3.6 * 6.283; w = Math.sin(ph) * 20; z = Math.cos(ph); ax = z * 12; hp++; } else hp = 0;
    out.push([(b[0] + Math.cos(an) * ax - Math.sin(an) * w) * s, (b[1] + Math.sin(an) * ax + Math.cos(an) * w) * s, z]); }
  while (out.length < n) { const q = out[out.length - 1]; out.push([q[0] - 18 * s, q[1] + 18 * s, 0]); }
  return out;
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0 } = o; if (a <= 0.01) return; const n = kinds.length;
  const doel = _eiwitVorm(n, s); const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const pts = doel.map((d, i) => { const seg = (i < 10 || (i > 22 && i < 34)) ? 0 : 0.3; const f = ease(clamp((fold - seg) / (1 - seg), 0, 1)); const w = wander(i + 900, t, r * 0.15, 0.6); return [cx + lerp(begin[i][0], d[0], f) + w.x, cy + lerp(begin[i][1], d[1], f) + w.y, (d[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a;
  if (fold > 0.85) { ctx.save(); ctx.globalAlpha *= (fold - 0.85) / 0.15; ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]); for (let i = 0; i < 6; i++) { const p = pts[13 + i], q2 = pts[25 - i]; if (p && q2) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); } } ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2.2; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]).forEach(i => { const p = pts[i]; ctx.save(); ctx.globalAlpha *= 0.75 + 0.25 * (p[2] + 1) / 2; bead(ctx, p[0], p[1], r * (0.82 + 0.18 * (p[2] + 1) / 2), kinds[i], { ess }); ctx.restore(); });
  ctx.restore(); return pts;
}
// MEMBRAAN: dubbele laag fosfolipiden langs een boog (een cel is rond). Kop (rond) + twee staarten ± 2× de kop-
// diameter, staarten naar binnen; een eiwit steekt aan beide kanten uit. Staarten in vetkleur: het is vet.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const blad = (Rk, naarBinnen) => { for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); if (eiwitten.some(e => Math.abs(an - e) * R < kr * 3.2)) continue;
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = naarBinnen ? -1 : 1; const tx = -uy, ty = ux;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * sd * kr * 0.6, hy + uy * d * sl * 0.5 + ty * sd * kr * 0.6, hx + ux * d * sl + tx * sd * kr * 0.35, hy + uy * d * sl + ty * sd * kr * 0.35); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, lighten(kop, 0.3), 1); } };
  blad(R + sl + gap, true); blad(R - sl - gap, false);
  eiwitten.forEach(e => { const ux = Math.cos(e), uy = Math.sin(e); ctx.save(); ctx.translate(cx + ux * R, cy + uy * R); ctx.rotate(e); ctx.beginPath(); bioPad(ctx, [[-sl * 1.6, -kr * 2.2], [0, -kr * 2.8], [sl * 1.6, -kr * 2.2], [sl * 1.7, kr * 1.8], [0, kr * 2.6], [-sl * 1.7, kr * 1.8]], true); shape(ctx, rgba(eiwitCol, 0.95), lighten(eiwitCol, 0.3), 1.5); ctx.restore(); });
  ctx.restore();
}
// CEL (rond) met membraan, kern (± 1/3 van de diameter, niet in het midden), mitochondriën en rustige textuur.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, s = 1, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.55); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14 * s, 0, 6.283); ctx.clip();
  for (let i = 0; i < 90; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)) * r; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 1.6 * s, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (organellen) { const kx = cx + r * 0.18, ky = cy - r * 0.12; nucleus(ctx, kx, ky, r * 0.33, 1, t);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.9, rr = r * 0.65; mitochondrion(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(36, r * 0.26), an + 1.2, 1, 4, t); } }
  ctx.restore();
  membraanBoog(ctx, cx, cy, r - 7 * s, a0, a1, { s: s * 0.7, eiwitten });
  ctx.restore();
}

// =====================================================================================
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten steken in vlucht
// voorbij de staart uit; bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const rug = '#7E6248', buik = '#E9DCC6', vlek = '#4E3A28';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  vleugel(true);
  // poten steken voorbij de staart uit
  ctx.strokeStyle = '#2E2E2E'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-34, 9); ctx.lineTo(-96, 15); ctx.moveTo(-34, 11); ctx.lineTo(-94, 20); ctx.stroke();
  // staart
  ctx.beginPath(); ctx.moveTo(-60, -5); ctx.lineTo(-86, -7); ctx.lineTo(-88, 5); ctx.lineTo(-60, 7); ctx.closePath(); shape(ctx, '#CDB898', '#7E6248', 1);
  ctx.strokeStyle = rgba(vlek, 0.6); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-70 - k * 6, -6); ctx.lineTo(-70 - k * 6, 6); ctx.stroke(); }
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(vlek, 0.7); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, '#B89A78', '#D9C2A4', 1);
  ctx.strokeStyle = '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  ctx.strokeStyle = '#2E2A26'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(82, -5); ctx.quadraticCurveTo(116, -3, 144, -12); ctx.stroke();
  ctx.strokeStyle = '#D99A90'; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(82, -5); ctx.lineTo(100, -4); ctx.stroke();
  vleugel(false);
  ctx.restore();
}

// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, streep = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, streep * 0.45, h);
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3 }); }

// =====================================================================================
// LEVER (vooraanzicht). Recept: grootste klier (± 1,5 kg); grote rechterkwab (links op het scherm), smallere
// linkerkwab die over de maag reikt; scherpe onderrand, bolle bovenkant tegen het middenrif; sikkelvormig band
// tussen de kwabben; galblaas als groen peertje onder de rechterkwab. Rood-bruin. Bron: Gray's Anatomy.
// Bekende fout: bruine vlek.
// =====================================================================================
function leverVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, gloed = 0, gal = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const V0 = [[-190, -40], [-150, -95], [-60, -115], [40, -105], [130, -80], [195, -55], [210, -40], [170, -20], [90, 5], [20, 30], [-40, 70], [-110, 95], [-170, 80], [-200, 30]];
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = BIO.leverL; ctx.shadowBlur = 40 * gloed; }
  ctx.beginPath(); bioPad(ctx, V0, true); shape(ctx, BIO.lever, BIO.leverL, 2.5); if (gloed > 0.01) ctx.restore();
  ctx.strokeStyle = rgba(BIO.leverL, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(5, -108); ctx.quadraticCurveTo(0, -40, -15, 40); ctx.stroke(); // sikkelband
  ctx.fillStyle = rgba('#F2C0A8', 0.12); ctx.beginPath(); ctx.ellipse(-90, -50, 70, 26, -0.2, 0, 6.283); ctx.fill(); // glans
  if (gal) { ctx.beginPath(); bioPad(ctx, [[-70, 60], [-58, 82], [-62, 110], [-80, 118], [-94, 104], [-88, 78]], true); shape(ctx, BIO.gal, lighten(BIO.gal, 0.3), 1.5); }
  ctx.restore();
}

// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const N = 120; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(xx => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)));
  const dk = xs.map((xx, i) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1)));
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.32, rgba('#C98A86', 0.8));           // slijmvlies
    band(0.32, 0.45, rgba('#8A6A6A', 0.6));        // bindweefsel
    band(0.45, 0.78, rgba(BIO.spier, 0.75));       // kringspier
    band(0.78, 0.96, rgba(BIO.spierL, 0.55));      // lengtespier
    band(0.96, 1.0, rgba('#E6D0C8', 0.7));         // buitenvlies
    // slijmvlies-oppervlak: plooien met kliergaatjes (of vlokken)
    ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
    xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - (vlokken ? Math.max(0, Math.sin(xx * 0.12)) * 9 : Math.abs(Math.sin(xx * 0.06)) * 4)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.strokeStyle = rgba('#7A4A4A', 0.6); ctx.lineWidth = 2; for (let i = 3; i < N; i += 4) { const yy = yc + kant * ri[i]; ctx.beginPath(); ctx.moveTo(xs[i], yy); ctx.lineTo(xs[i], yy + kant * dk[i] * 0.24); ctx.stroke(); } // klieren
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#5A2A26', 0.5); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.615); ctx.beginPath(); ctx.ellipse(xs[i], yy, 3.5, dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.83, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  }
  ctx.restore(); return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
}
// ENZYM met actieve plek (goud). Recept: eiwit-kluwen met een holte die precies past bij één substraat; bij
// binden sluit de holte een beetje (induced fit). Een substraat dat niet past (cellulose voor amylase) glijdt eraf.
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, sluit = 0, col = C.enzym, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const pts = []; for (let k = 0; k < 28; k++) { const u = k / 28 * 6.283; let rr = r * (1 + 0.08 * Math.sin(u * 5 + seed) + 0.05 * Math.sin(u * 9));
      const d = Math.abs(((u + Math.PI) % 6.283) - Math.PI); if (d < 0.5) rr *= lerp(0.45, 0.62, sluit) + (d / 0.5) * lerp(0.55, 0.38, sluit); pts.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, col, lighten(col, 0.3), 1.5);
  ctx.strokeStyle = rgba(lighten(col, 0.35), 0.55); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, [[-r * 0.6, -r * 0.2], [-r * 0.2, -r * 0.55], [r * 0.1, -r * 0.2], [-r * 0.25, r * 0.15], [-r * 0.1, r * 0.5]], false); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.28, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  ctx.restore();
}

// =====================================================================================
// ===== Toegevoegd 22 okt 2026 voor Sekse, gender en diversiteit 1.1 =====
// ==============================================================================
// ECHO van ± 20 weken (2D, sagittaal profiel). Recept: waaiervormig beeld (sector ± 70°), zwart = vocht
// (vruchtwater), grijs korrelig = weke delen, helder wit = bot en grensvlakken. Bij 20 weken: schedel als heldere
// ring, profiel (voorhoofd, neusbotje, lippen, kin), wervelkolom als dubbele rij heldere kraaltjes langs de rug,
// ribben als korte heldere streepjes, hart in de borst (± 2 cm) dat zichtbaar klopt (± 140/min), armpje met
// handje vaak bij het gezicht. Baarmoederwand als heldere band aan de rand. Bron: ISUOG-richtlijn 20-wekenecho;
// RIVM 'Het 20 wekenonderzoek'. Bekende fouten: losse ellipsen; kind 'getekend' met lijnen i.p.v. echo-korrel.
// (x, y) = top van de waaier (transducer); R = diepte; o.hl = {hoofd, armen, hart} 0..1 oplichten; t = tijd.
function _echoKorrel(ctx, pts, n, seed, helder, r = 1.6) { for (let i = 0; i < n; i++) { const p = pts(hash(seed + i * 3), hash(seed + i * 3 + 1)); if (!p) continue; const v = hash(seed + i * 3 + 2); ctx.fillStyle = `rgba(${helder},${helder},${helder + 6},${0.18 + 0.5 * v})`; ctx.fillRect(p[0], p[1], r + v * 1.6, r * 0.7 + v); } }
function echoBeeld(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, hl = {}, s = 1, open = 1.22 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const a0 = Math.PI / 2 - open / 2, a1 = Math.PI / 2 + open / 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.fillStyle = '#050608'; ctx.fill(); ctx.save(); ctx.clip();
  // baarmoederwand: heldere korrelige band onderaan en bovenaan
  const band = (r0, r1, n, sd) => _echoKorrel(ctx, (u, v) => { const an = lerp(a0, a1, u), rr = lerp(r0, r1, v); return [x + Math.cos(an) * rr, y + Math.sin(an) * rr]; }, n, sd, 150);
  band(R * 0.06, R * 0.16, 500, 11); band(R * 0.86, R * 0.99, 700, 17);
  // kind: lokaal stelsel, midden (cx, cy), schaal k; hoofd links, rug boven, gezicht naar links-onder
  const cx = x + R * 0.04, cy = y + R * 0.52, k = R / 520 * s; const P = (px, py) => [cx + px * k, cy + py * k];
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const romp = [[-40, -62], [60, -74], [170, -60], [250, -20], [262, 40], [215, 88], [120, 98], [20, 92], [-40, 70]];
  const hoofd = [[-100, -100], [-30, -86], [-10, -30], [-30, 40], [-80, 78], [-128, 84], [-150, 70], [-170, 52], [-176, 34], [-196, 22], [-188, 4], [-200, -6], [-206, -30], [-196, -66], [-160, -96]];
  for (const [vorm, dicht] of [[romp, 900], [hoofd, 800]]) { ctx.beginPath(); bioPad(ctx, vorm, true); ctx.fillStyle = 'rgba(70,74,80,0.55)'; ctx.fill(); ctx.save(); ctx.clip(); const xs = vorm.map(p => p[0]), ys = vorm.map(p => p[1]), mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
    _echoKorrel(ctx, (u, v) => [lerp(mx, Mx, u), lerp(my, My, v)], dicht, vorm === romp ? 31 : 37, 120, 2.2); ctx.restore(); }
  const bot = (pts, w, al) => { ctx.strokeStyle = `rgba(236,238,242,${al})`; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const lh = (n) => 0.75 + 0.25 * (hl[n] || 0);
  // schedel (heldere ring) + profiel
  ctx.save(); ctx.globalAlpha *= lh('hoofd'); bot([[-196, -66], [-160, -96], [-100, -100], [-40, -80], [-18, -30], [-34, 30], [-80, 70]], 7, 0.9);
  bot([[-206, -30], [-200, -8], [-188, 4], [-196, 22], [-176, 34], [-170, 52], [-150, 70]], 4, 0.75); bot([[-196, 12], [-186, 6]], 5, 0.95); // neusbotje
  ctx.beginPath(); ctx.ellipse(-150, -20, 13, 10, 0, 0, 6.283); ctx.fillStyle = 'rgba(10,10,12,0.9)'; ctx.fill(); bot([[-118, 40], [-90, 60], [-60, 66]], 5, 0.7); // oogkas, kaak
  if ((hl.hoofd || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.hoofd * 0.45; ctx.beginPath(); bioPad(ctx, hoofd, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } ctx.restore();
  // wervelkolom en ribben
  for (let i = 0; i < 20; i++) { const u = i / 19, px = lerp(-24, 236, u), py = -58 - 16 * Math.sin(u * 3) + u * 40; for (const d of [0, 12]) { ctx.fillStyle = 'rgba(236,238,242,0.85)'; ctx.fillRect(px - 4, py + d, 8, 6); } }
  for (let i = 0; i < 6; i++) bot([[20 + i * 22, -48], [12 + i * 22, 0], [22 + i * 22, 50]], 3, 0.35);
  // hart: kloppende vierkamer-vorm in de borst
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.3)) ** 2, hh = 1 + 0.12 * slag;
  ctx.save(); ctx.translate(70, 22); ctx.scale(hh, hh); ctx.globalAlpha *= lh('hart'); ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, -0.4, 0, 6.283); ctx.fillStyle = 'rgba(8,8,10,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,222,228,0.9)'; ctx.lineWidth = 4; ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 4); ctx.lineTo(26, -6); ctx.moveTo(0, -22); ctx.lineTo(4, 22); ctx.stroke();
  if ((hl.hart || 0) > 0.01) { ctx.globalAlpha *= hl.hart; ctx.beginPath(); ctx.ellipse(0, 0, 40, 34, -0.4, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore();
  // armpje met handje bij het gezicht
  ctx.save(); ctx.globalAlpha *= lh('armen'); const arm = [[-20, 46], [-60, 104], [-120, 108], [-160, 92]]; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = 'rgba(80,84,92,0.9)'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.stroke();
  bot([[-22, 50], [-58, 100]], 5, 0.85); bot([[-64, 104], [-118, 106]], 4, 0.8); for (let f = 0; f < 4; f++) bot([[-156, 86 + f * 5], [-176, 80 + f * 7]], 3, 0.7);
  if ((hl.armen || 0) > 0.01) { ctx.globalAlpha *= hl.armen * 0.6; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = C.goud; ctx.lineWidth = 36; ctx.globalAlpha *= 0.35; ctx.stroke(); } ctx.restore();
  bot([[200, 70], [270, 110], [300, 90]], 5, 0.6); // dijbeen/been aan de rand
  ctx.restore();
  // schaduw en diepteverloop
  const g = ctx.createRadialGradient(x, y, R * 0.2, x, y, R); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(x - R, y, 2 * R, R);
  ctx.restore(); ctx.strokeStyle = 'rgba(120,128,140,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.stroke();
  ctx.restore(); return { hart: P(70, 22), hoofd: P(-110, -10), arm: P(-120, 106) };
}

// EMBRYO van ± 6 weken na de bevruchting (Carnegie-stadium 15–17, kop-romplengte ± 7–12 mm), zijaanzicht.
// Recept: C-vormig; groot hoofd (± de helft van de lengte) met voorhersenblaas; oog als donker pigmentringetje met
// lens; oorputje achter de kieuwbogen; 3 kieuwboogjes onder het hoofd; grote hartbult en daaronder de leverbult;
// armknop (al een peddel) ter hoogte van het hart, kleinere beenknop lager; rij somieten (blokjes) langs de rug;
// staartje dat naar binnen krult. Huid doorzichtig, roze. De aanleg van de geslachtsklieren ligt binnenin tegen de
// achterwand van de buikholte (genitale lijst, naast de oernier). Bron: Sadler, Langman's Embryology h. 6 en 16;
// Virtual Human Embryo (Carnegie 16). Bekende fouten: kommavorm met een stip; ledematen als vingers; aanleg buiten op het lijf.
// Oorsprong = midden; ± 300 × 400 bij s = 1. o.glow = aanleg laten oplichten.
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#C9877A', diep = '#D69A8A';
  const lijf = [[-70, -170], [20, -208], [104, -182], [150, -112], [160, -24], [150, 58], [118, 124], [72, 166], [28, 182], [-8, 166], [-34, 128], [-52, 78], [-70, 30], [-98, -14], [-90, -52], [-108, -72], [-124, -112], [-112, -152]];
  // staart
  ctx.strokeStyle = huid; ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, [[30, 176], [-14, 196], [-44, 182], [-50, 156]], false); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, [[-44, 182], [-56, 156], [-46, 136]], false); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, rgba(huid, 0.96), rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  // voorhersenblaas en hersenblazen als zachtere vlakken
  ctx.fillStyle = rgba('#F6CDBC', 0.8); ctx.beginPath(); ctx.ellipse(-30, -150, 70, 50, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -150, 52, 44, 0.4, 0, 6.283); ctx.fill();
  // hart (klopt) en lever door de huid
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2; ctx.fillStyle = rgba('#C8463C', 0.55 + 0.2 * slag); ctx.beginPath(); ctx.ellipse(-62, -18, 34 + 3 * slag, 30 + 3 * slag, 0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = rgba('#9A3E36', 0.4); ctx.beginPath(); ctx.ellipse(-44, 46, 34, 36, 0, 0, 6.283); ctx.fill();
  // somieten langs de rug
  const rug = bioDicht([[96, -150], [138, -80], [146, 0], [132, 74], [100, 136], [56, 168]], 26); rug.forEach((p, i) => { if (i % 1) return; const q = rug[Math.min(rug.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an) * 14, p[1] + Math.cos(an) * 14); ctx.rotate(an); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.6), null); ctx.restore(); });
  // aanleg geslachtsklier: langwerpige lijst tegen de achterwand van de buik
  const gp = [[86, 30], [96, 70], [90, 108]]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 10; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwboogjes
  ctx.strokeStyle = rand; ctx.lineWidth = 3; [[-112, -96, 26], [-104, -74, 22], [-94, -56, 17]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx + 24, by, r, 2.4, 3.9); ctx.stroke(); });
  // oog en oorputje
  _bioCirc(ctx, -66, -128, 15, rgba('#5A3A34', 0.85)); _bioCirc(ctx, -66, -128, 7, rgba('#F6E6DC', 0.9)); ctx.beginPath(); ctx.arc(-6, -96, 7, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke();
  // armknop (peddel) en beenknop
  ctx.save(); ctx.translate(14, 12); ctx.rotate(1.9); ctx.beginPath(); ctx.ellipse(28, 0, 40, 22, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.save(); ctx.translate(58, 128); ctx.rotate(2.3); ctx.beginPath(); ctx.ellipse(22, 0, 30, 17, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.restore();
}

// ZAADBAL in doorsnede. Recept: stevig kapsel (tunica albuginea); vanuit het mediastinum (één zijde) lopen tussen-
// schotten naar binnen die ± 250 lobjes maken; elk lobje vol opgerolde zaadbuisjes, in doorsnede ronde buisjes
// (± 0,2 mm) met een wand van Sertolicellen en zaadcellen in wording (rijper naar het midden) en staartjes in de
// holte; daartussen bindweefsel met groepjes Leydigcellen (maken testosteron) bij haarvaten. Bron: Junqueira h. 21.
// Bekende fouten: golflijnen of blokjes; buisjes als lege ringen.
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0, col = C.teal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), lighten(col, 0.2), Math.max(2.5, rx * 0.035)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const bx = x + px, by = y + py, r = rb * (0.92 + 0.12 * hash(i + 3));
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#1A2232', 0.75); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283; _bioCirc(ctx, x + px + Math.cos(an) * rb * 1.08, y + py + Math.sin(an) * rb * 1.08, Math.max(1.5, rb * 0.16), rgba(C.goud, 0.85 * leydig)); });
  ctx.restore(); ctx.restore();
}

// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // bloedvaten en urineleider bij de hilus (rechts)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(60, -16); ctx.lineTo(150, -24); ctx.stroke(); ctx.strokeStyle = '#4A6CA8'; ctx.beginPath(); ctx.moveTo(60, 8); ctx.lineTo(150, 6); ctx.stroke();
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(56, 30); ctx.quadraticCurveTo(80, 90, 70, 190); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#9E4A3E', '#D88E7A', 3); ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.9); for (let k = 0; k < 8; k++) { const an = Math.PI * 0.62 + k * 0.32; const bx = 66 + Math.cos(an) * 38, by = Math.sin(an) * 64 * 1.1; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(44, 0); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = rgba('#E8D9A0', 0.85); ctx.beginPath(); ctx.ellipse(46, 4, 16, 30, 0, 0, 6.283); ctx.fill(); ctx.restore();
  // bijnier op de bovenpool
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const g = glow * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, rgba('#E2B64A', 0.75 + 0.25 * g), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); ctx.fillStyle = rgba('#8A4A3A', 0.85); ctx.fill();
  if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * 0.6; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { bijnier: [x + 4 * s, y - 140 * s] };
}

// KIP (leghen), zijaanzicht naar rechts. Recept: romp eivormig en schuin (achter hoger), ± 2,5× de koplengte; staart-
// veren steil omhoog; hals met halsveren die over de schouder vallen; kleine kop; enkelvoudige kam met 5 punten, lellen
// onder de snavel, oorlel; gele, korte snavel; vleugel tegen de romp; poten geel geschubd, 3 tenen naar voren, 1 naar
// achter. Kleur: roodbruin met donkerdere vleugel en staart. Bron: foto's leghen (ISA Brown). Bekende fouten: bolletje
// met cirkelkop; kam als twee rondjes.
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A', pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6;
  ctx.strokeStyle = poot; ctx.lineWidth = 7; [[-6, 52], [22, 52]].forEach(([px, py], i) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2, py + 54); ctx.stroke(); ctx.lineWidth = 4; [[-22, 6], [0, 10], [20, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px + 2 + dx, py + 54 + dy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px - 12, py + 50); ctx.stroke(); ctx.lineWidth = 7; });
  ctx.beginPath(); bioPad(ctx, [[-120, -78], [-104, -128], [-78, -150], [-64, -112], [-56, -60]], true); shape(ctx, _bioDonker(kleur, 0.45), null); // staart
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null); // romp
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null); // vleugel
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76, -64); ctx.rotate(pik * 0.02);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null); // hals
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null); // kop
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null); // snavel
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill(); // kam
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); // lel + oorlel
  _bioCirc(ctx, 30, -70, 4.2, '#E8A040'); _bioCirc(ctx, 31, -70, 2.2, '#121A26');
  ctx.restore(); ctx.restore();
}
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }

// ZEESCHILDPAD (onechte karetschildpad), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig, ± 1 m;
// 5 middelste schilden (vertebraal), 5 paar ribschilden, rand van kleine schilden; voorvinnen lang en sikkel-
// vormig (± 1/2 van de schildlengte), achtervinnen kort en rond; kop groot met snavel en schubben. Roodbruin.
// Legt ± 100 eieren (pingpongbal, ± 4 cm) in een kuil in het zand; temperatuur van het nest bepaalt de sekse
// (warmer dan ± 29 °C vooral vrouwtjes). Bron: NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met
// pootjes en een bolle koepel. o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A';
  for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(-0.25 + vin * 0.35); ctx.beginPath(); bioPad(ctx, [[40, -40], [120, -66], [178, -40], [190, -6], [140, -10], [60, -6]], true); shape(ctx, huid, schub, 2); ctx.restore();
    ctx.save(); ctx.scale(sx, 1); ctx.beginPath(); bioPad(ctx, [[40, 80], [80, 96], [92, 124], [64, 128], [30, 104]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, [[-22, -96], [-30, -128], [-16, -158], [16, -158], [30, -128], [22, -96]], true); shape(ctx, huid, schub, 2); _bioCirc(ctx, -16, -136, 4, '#2A1C16'); _bioCirc(ctx, 16, -136, 4, '#2A1C16');
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-96, -54, -12, 32, 76, 120];
  for (let i = 0; i < 5; i++) { ctx.beginPath(); bioPad(ctx, [[-22, vy[i]], [22, vy[i]], [26, (vy[i] + vy[i + 1]) / 2], [22, vy[i + 1]], [-22, vy[i + 1]], [-26, (vy[i] + vy[i + 1]) / 2]], true); ctx.stroke(); }
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx * 26, vy[i] + 20); ctx.lineTo(sx * 92, vy[i] + 20 + i * 4); ctx.stroke(); }
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); const [px, py] = p; ctx.lineTo(px * 0.86, py * 0.86); } ctx.stroke();
  ctx.restore(); ctx.restore();
}
// eieren in een nestkuil in het zand (pingpongbal-groot, wit, iets ingedeukt)
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
  for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
  ctx.restore(); }

// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]];
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [224, 6], [246, 4], [266, 2], [284, 1]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(tx - 3, ty); ctx.lineTo(tx, ty + (i % 2 ? -8 : 9)); ctx.lineTo(tx + 3, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(170, 8); ctx.quadraticCurveTo(240, 6, 298, -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, -30, 13, 9, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 160, -30, 6, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(159, -35, 2, 10);
  _bioCirc(ctx, 292, -14, 3.5, '#1A1410');
  ctx.restore();
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: zaadbalweefsel, T-helpercel, hiv, bacterie
// =====================================================================================
// =====================================================================================
// obj_man_afweer.js — objecten voor lib_bio.js: zaadbalweefsel, T-helpercel, hiv-deeltje, staafbacterie.
// Vereist: lib_bio.js (BIO, bioPad, bloedvat) en lib.js-hulpjes (C, rgba, lighten, hash, clamp, lerp, ease,
// shape, roundRect). Stijl: vlakke vullingen, rand 1–2 px lichter, geen tekst, alles deterministisch via hash(),
// animatie alleen via t (seconden).
// =====================================================================================

// =====================================================================================
// ZAADBALWEEFSEL (doorsnede testis, lichtmicroscoop). Recept (mens): zaadbuisjes rond, diameter 180–200 µm;
// wand = basale membraan + 1–2 lagen platte peritubulaire (myoïde) cellen, samen ± 4–6 µm; kiemepitheel 60–80 µm
// dik, lumen ± 40–60 µm. Sertolicellen ± 1 per 25–30 µm omtrek: hoge zuil van basale membraan tot lumen, bleek
// cytoplasma, kern bij de basis (± 9 × 6 µm, bleek, ovaal/peervormig, groot kernlichaampje), lange as radiaal.
// Van buiten naar binnen: spermatogonia op de basale membraan (kern ± 6–7 µm, donker), primaire spermatocyten
// in de middenlaag (cel 15–18 µm, grootste kernen ± 10 µm, chromatine als draden), ronde spermatiden (cel ± 8 µm,
// kern ± 5 µm, bleek), langgerekte spermatiden aan het lumen (kop ± 5 × 2,5 µm, kop naar de basis), staarten in
// het lumen. Interstitium smal; Leydigcellen (15–20 µm, veelhoekig, eosinofiel = warm/oker, ronde kern ± 6 µm,
// excentrisch) in groepjes bij een haarvat (Ø 6–8 µm, rode bloedcellen 7,5 µm). Schaal hier ± 1,5 px/µm bij
// w = 720, h = 420. Weinig productie: kiemepitheel dunner, minder spermatiden en staarten, lumen wijder.
// Bron: Junqueira's Basic Histology h. 21 (fig. 21-3/21-5); Ross & Pawlina, Histology h. 22.
// Bekende fouten: buisje als ring met stipjes; Sertolicellen als losse bolletjes; spermatocyten even groot als
// spermatogonia; Leydigcellen ín het buisje; zaadcellen met kop naar het lumen; honingraat van buisjes.
// =====================================================================================
const _ZB_BUIS = [ // [x, y, R] in ontwerpcoördinaten (frame 720 × 420, oorsprong = midden)
  [-240, 10, 140], [80, -122, 138], [62, 192, 136], [372, 48, 140], [-330, -252, 120], [-272, 288, 115], [332, -255, 110]
];
const _ZB_CAP = [[-120, -250], [-96, -92], [-62, 12], [-80, 138], [-112, 250]]; // haarvat tussen buisje 0, 1 en 2
function _zbBuis(ctx, cx, cy, R, p, t, sd, hlS, info) {
  const rb = R - 6, rl = R * lerp(0.56, 0.32, p), dik = rb - rl; // basale membraan → lumen
  const ring = u => rb - u * dik;
  // wand: basale membraan + platte peritubulaire cellen
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); shape(ctx, rgba('#B07A68', 0.45), rgba('#D9A894', 0.8), 1.5);
  ctx.beginPath(); ctx.arc(cx, cy, rb, 0, 6.283); shape(ctx, rgba('#D8C9A8', 0.16), rgba('#E8D8C0', 0.55), 1);
  for (let k = 0; k < 11; k++) { const an = (k + hash(sd + k * 3.1)) / 11 * 6.283;
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * (R - 3), cy + Math.sin(an) * (R - 3), 7, 1.8, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.95); ctx.fill(); }
  // lumen
  ctx.beginPath(); ctx.arc(cx, cy, rl, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.55); ctx.fill();
  // Sertolicellen: zuilen van basis tot lumen
  const nS = Math.max(9, Math.round(6.283 * R / 70)); const sAng = [];
  for (let k = 0; k < nS; k++) sAng.push((k + 0.25 * (hash(sd + k * 7.7) - 0.5)) / nS * 6.283 + hash(sd) * 6.283);
  const col = rgba('#EFE3C4', 0.24 + 0.32 * hlS), colE = rgba('#F6ECD2', 0.4 + 0.45 * hlS);
  sAng.forEach((th, k) => {
    const L = [], Rr = [];
    for (let i = 0; i <= 7; i++) { const u = i / 7, r = lerp(rb, rl - 2, u); const half = lerp(8, 3.2, u);
      const w1 = half + 1.8 * Math.sin(u * 9 + k), w2 = half + 1.8 * Math.sin(u * 8 + k * 2.3 + 1);
      L.push([cx + Math.cos(th - w1 / r) * r, cy + Math.sin(th - w1 / r) * r]); Rr.unshift([cx + Math.cos(th + w2 / r) * r, cy + Math.sin(th + w2 / r) * r]); }
    if (hlS > 0.01) { ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); ctx.strokeStyle = rgba('#F6ECD2', 0.22 * hlS); ctx.lineWidth = 6; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); shape(ctx, col, colE, 1);
  });
  // kiemcellen (tussen de zuilen); ringen met vaste plaatsen, productie dunt uit
  const vrij = (an, r, half) => sAng.every(th => { let d = Math.abs(((an - th) % 6.283 + 9.425) % 6.283 - 3.1416); return d * r > 8 + half; });
  const cel = (x, y, cr, kr, kf, ke) => { ctx.beginPath(); ctx.arc(x, y, cr, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1); ctx.beginPath(); ctx.arc(x, y, kr, 0, 6.283); shape(ctx, kf, ke, 1); };
  // spermatogonia op de basale membraan
  { const r = rb - 6.5, n = Math.floor(6.283 * r / 15);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 1.3)) / n * 6.283; if (!vrij(an, r, 2)) continue; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
      ctx.beginPath(); ctx.ellipse(x, y, 7.5, 6, an, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1);
      ctx.beginPath(); ctx.ellipse(x, y, 5, 4, an + Math.PI / 2, 0, 6.283); shape(ctx, '#5A4888', (C.nucEdge || '#A392D6'), 1); } }
  // primaire spermatocyten: grootste kernen, chromatinedraden
  { const r = ring(0.31), n = Math.floor(6.283 * r / 24);
    for (let i = 0; i < n; i++) { const an = (i + 0.5 + 0.3 * hash(sd + i * 2.9)) / n * 6.283; if (!vrij(an, r, 6) || hash(sd + i * 5.3 + 1) > 0.45 + 0.55 * p) continue;
      const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r; cel(x, y, 11, 7.5, rgba((C.nucFill || '#6E5A9E'), 0.95), (C.nucEdge || '#A392D6'));
      ctx.strokeStyle = rgba('#D4C8F0', 0.75); ctx.lineWidth = 1.1; ctx.lineCap = 'round';
      for (let d = 0; d < 3; d++) { const h = k => hash(sd + i * 11 + d * 3 + k) - 0.5; ctx.beginPath(); ctx.moveTo(x + h(1) * 9, y + h(2) * 9); ctx.quadraticCurveTo(x + h(3) * 12, y + h(4) * 12, x + h(5) * 9, y + h(6) * 9); ctx.stroke(); } } }
  // ronde spermatiden (twee rijen)
  [[0.6, 12], [0.76, 11.5]].forEach(([u, sp], ri) => { const r = ring(u), n = Math.floor(6.283 * r / sp);
    for (let i = 0; i < n; i++) { const an = (i + ri * 0.5 + 0.25 * hash(sd + i * 3.7 + ri)) / n * 6.283; if (!vrij(an, r, 1) || hash(sd + i * 4.1 + ri * 9 + 2) > Math.pow(p, 1.4)) continue;
      cel(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 5.8, 3.4, rgba((C.purpleL || '#BBAFE0'), 0.9), lighten((C.purpleL || '#BBAFE0'), 0.3)); } });
  // langgerekte spermatiden: kop naar de basis, staart het lumen in
  { const r = rl + 6, n = Math.floor(6.283 * r / 7.5);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 6.1)) / n * 6.283; if (hash(sd + i * 8.3 + 3) > Math.pow(p, 1.6)) continue;
      const ri = r + (hash(sd + i * 2.2) - 0.5) * 6, x = cx + Math.cos(an) * ri, y = cy + Math.sin(an) * ri;
      const sw = (hash(sd + i) - 0.5) * 2, tl = rl * (0.4 + 0.3 * hash(sd + i * 9.9)), pts = [];
      for (let k = 0; k <= 6; k++) { const rr = ri - 3 - k * tl / 6; const aa = an + sw * k * 0.035 + Math.sin(t * 2.4 + k * 1.3 + i) * 0.006 * k * k / 3; pts.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); }
      ctx.beginPath(); bioPad(ctx, pts); ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.42); ctx.lineWidth = 0.9; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, y, 4, 1.7, an + (hash(sd + i * 3.3) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#4A3A78', (C.nucEdge || '#A392D6'), 0.8); } }
  // Sertolikernen bovenop (bleek, groot kernlichaampje)
  sAng.forEach(th => { const r = rb - 13, x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r;
    ctx.beginPath(); ctx.ellipse(x, y, 7, 4.3, th, 0, 6.283); shape(ctx, rgba('#CFC3E6', 0.85 + 0.15 * hlS), '#E6DCF5', 1);
    ctx.beginPath(); ctx.arc(x - Math.cos(th) * 1.2, y - Math.sin(th) * 1.2, 1.7, 0, 6.283); ctx.fillStyle = (C.nucFill || '#6E5A9E'); ctx.fill();
    info.sertoli.push([x, y, th]); });
}
function zaadbalWeefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, t = 0, leydig = 0, sertoli = 0, testo = 0, inhibine = 0, productie = 1, seed = 0 } = o;
  const s = Math.min(w / 720, h / 420); const S = (px, py) => [x + px * s, y + py * s];
  const BUIS = _ZB_BUIS, CAP = _ZB_CAP;
  // Leydigcellen: twee groepjes in de driehoeken tussen de buisjes, veelhoekig tegen elkaar gedrukt
  const kandidaat = [];
  [[-22, 32, 9], [182, 40, 6]].forEach(([gx, gy, n], g) => { for (let i = 0; i < n + 6; i++) { const rr = 13 * Math.sqrt(i + 0.5), an = i * 2.39996 + seed + g;
    const px = gx + Math.cos(an) * rr, py = gy + Math.sin(an) * rr * 1.1;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 9)) continue;
    if (CAP.some(c => Math.hypot(px - c[0], py - c[1]) < 17) || Math.hypot(px - 205, py - 62) < 22) continue;
    if (kandidaat.filter(k => k.g === g).length < n) kandidaat.push({ x: px, y: py, g, m: 12.5 * (0.88 + 0.24 * hash(seed + i * 3 + g * 50)) }); } });
  const leyd = kandidaat.map((c, i) => { const pts = [];
    for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = c.m;
      kandidaat.forEach((q, j) => { if (j === i) return; const dx = q.x - c.x, dy = q.y - c.y, dd = Math.hypot(dx, dy), pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr - 1.5); });
      BUIS.forEach(([bx, by, bR]) => { const fx = c.x - bx, fy = c.y - by, B = fx * ux + fy * uy, Cq = fx * fx + fy * fy - (bR + 3) * (bR + 3), D = B * B - Cq; if (D > 0) { const tt = -B - Math.sqrt(D); if (tt > 0) best = Math.min(best, tt); } });
      pts.push([c.x + ux * Math.max(4, best), c.y + uy * Math.max(4, best)]); }
    return { c, pts }; });
  const ret = { leydig: S(-22, 32), sertoli: S(0, 0), haarvat: S(CAP[2][0], CAP[2][1]), buisjes: BUIS.map(([bx, by, bR]) => [x + bx * s, y + by * s, bR * s]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 28 * s); ctx.clip();
  ctx.translate(x, y); ctx.scale(s, s); const W = w / s, H = h / s;
  // interstitium: los bindweefsel met een paar fibroblastkernen en vezels
  ctx.fillStyle = rgba('#7A4A3A', 0.3); ctx.fillRect(-W / 2, -H / 2, W, H);
  ctx.strokeStyle = rgba('#E8C8B0', 0.1); ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) { const px = (hash(seed + i * 9.1) - 0.5) * W, py = (hash(seed + i * 4.7) - 0.5) * H;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 8)) continue; const an = hash(seed + i * 2.2) * 3.14;
    ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 14, py - Math.sin(an) * 14); ctx.quadraticCurveTo(px + 4, py - 4, px + Math.cos(an) * 14, py + Math.sin(an) * 14); ctx.stroke();
    if (i % 3 === 0) { ctx.beginPath(); ctx.ellipse(px, py, 5.5, 1.6, an, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); } }
  // zaadbuisjes
  const info = { sertoli: [] }; const sPerBuis = [];
  BUIS.forEach(([bx, by, bR], i) => { const st = info.sertoli.length; _zbBuis(ctx, bx, by, bR, clamp(productie, 0, 1), t, seed * 97 + i * 31 + 5, sertoli, info); sPerBuis.push(info.sertoli.slice(st)); });
  // haarvat (lengtedoorsnede) + klein haarvat in doorsnede bij groepje 2
  bloedvat(ctx, CAP, 6, t, { n: 5, speed: 0.05, haarvat: true });
  ctx.beginPath(); ctx.arc(205, 62, 9, 0, 6.283); shape(ctx, '#3A1A22', rgba(BIO.vaatwand, 0.9), 3); rodeBloedcel(ctx, 205, 62, 5.5, 0.4, 0, 0.95);
  // Leydigcellen
  leyd.forEach(({ c, pts }, i) => {
    if (leydig > 0.01) { ctx.beginPath(); bioPad(ctx, pts, true); ctx.strokeStyle = rgba((C.gold || '#E0B64A'), 0.28 * leydig); ctx.lineWidth = 7; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, lighten('#B8894A', 0.18 * leydig), lighten((C.ochre || '#C9A35C'), 0.35 + 0.3 * leydig), 1.3);
    for (let k = 0; k < 2; k++) { const an = hash(seed + i * 5 + k) * 6.283; ctx.beginPath(); ctx.arc(c.x + Math.cos(an) * 6, c.y + Math.sin(an) * 6, 1.6, 0, 6.283); ctx.fillStyle = rgba('#F6E2B0', 0.55); ctx.fill(); } // vetdruppeltjes
    const kx = c.x + (hash(seed + i * 7) - 0.5) * 4, ky = c.y + (hash(seed + i * 8) - 0.5) * 4;
    ctx.beginPath(); ctx.arc(kx, ky, 4.6, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1);
    ctx.beginPath(); ctx.arc(kx + 1, ky - 0.8, 1.2, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); });
  // anker Sertoli: zuil van buisje 0 die naar het interstitium kijkt
  { let best = null, bd = 1e9; sPerBuis[0].forEach(q => { const d = Math.hypot(q[0] + 22, q[1] - 32); if (d < bd) { bd = d; best = q; } }); if (best) ret.sertoli = S(best[0], best[1]); }
  // deeltjes
  const capPts = bioDicht(CAP, 12);
  const naCap = (px, py) => { let b = capPts[0], bd = 1e9; capPts.forEach(q => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < bd) { bd = d; b = q; } }); return b; };
  const deeltje = (sx, sy, tx, ty, u, col, i) => { const e = ease(u), al = Math.sin(Math.PI * u);
    const px = lerp(sx, tx, e) + Math.sin(u * 6 + i) * 3, py = lerp(sy, ty, e) + Math.cos(u * 5 + i) * 3;
    ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.globalAlpha *= al; shape(ctx, col, lighten(col, 0.4), 1); ctx.globalAlpha /= al || 1; };
  if (testo > 0.01 && leyd.length) { const n = Math.round(40 * testo); ctx.save(); ctx.globalAlpha *= Math.min(1, testo * 2);
    for (let i = 0; i < n; i++) { const L = leyd[Math.floor(hash(seed + i * 1.7) * leyd.length)].c; const u = ((t * 0.22 * (0.8 + 0.4 * hash(i * 3.3)) + hash(i * 5.9)) % 1 + 1) % 1;
      let tx, ty; if (hash(i * 7.1 + 2) < 0.62) { let bb = BUIS[0], bd = 1e9; BUIS.forEach(B => { const d = Math.hypot(L.x - B[0], L.y - B[1]) - B[2]; if (d < bd) { bd = d; bb = B; } });
        const an = Math.atan2(L.y - bb[1], L.x - bb[0]) + (hash(i * 2.3) - 0.5) * 0.5; tx = bb[0] + Math.cos(an) * (bb[2] - 30); ty = bb[1] + Math.sin(an) * (bb[2] - 30); }
      else { const q = naCap(L.x, L.y); tx = q[0] + (hash(i) - 0.5) * 30; ty = q[1] + (hash(i + 1) - 0.5) * 30; }
      deeltje(L.x, L.y, tx, ty, u, (C.purple || '#8C7BBF'), i); } ctx.restore(); }
  if (inhibine > 0.01) { const n = Math.round(18 * inhibine); ctx.save(); ctx.globalAlpha *= Math.min(1, inhibine * 2);
    const bron = []; [0, 1, 2].forEach(b => { const [bx, by] = BUIS[b]; const q = naCap(bx, by); const dir = Math.atan2(q[1] - by, q[0] - bx);
      sPerBuis[b].forEach(sv => { let d = Math.abs(((sv[2] - dir) % 6.283 + 9.425) % 6.283 - 3.1416); if (d < 0.5) bron.push(sv); }); });
    for (let i = 0; i < n && bron.length; i++) { const sv = bron[Math.floor(hash(seed + i * 2.9 + 40) * bron.length)]; const u = ((t * 0.2 * (0.8 + 0.4 * hash(i * 4.4 + 9)) + hash(i * 6.6 + 3)) % 1 + 1) % 1;
      const q = naCap(sv[0], sv[1]); deeltje(sv[0], sv[1], q[0], q[1], u, (C.purpleD || '#675694'), i + 100); } ctx.restore(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// T-HELPERCEL (CD4+-lymfocyt). Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets
// excentrisch, donker (veel heterochromatine); smalle cytoplasmarand (dikste kant ± 20 % van de straal) met
// 2–3 mitochondriën. CD4 = transmembraaneiwit, steekt in het echt ± 7 nm uit (veel te klein om te zien):
// hier sterk vergroot als knopje op een steeltje (± 13 % van de straal), loodrecht op het membraan, gelijkmatig
// verdeeld (± elke 28 px omtrek). Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12 (lymfocyt).
// Bekende fouten: kleine kern in het midden met veel cytoplasma (dat is een monocyt); receptoren als
// losse stipjes naast de cel; receptoren schuin of ongelijk verdeeld.
// Oorsprong = midden van de cel, r = straal in px.
// =====================================================================================
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0 } = o;
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.28, 0, 6.283); ctx.strokeStyle = rgba((C.tealL || '#9ED0EA'), 0.11 * hl); ctx.lineWidth = r * 0.22; ctx.stroke(); }
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = lighten((C.green || '#7FC48F'), 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + ux * (r + st + kn * 0.7), y + uy * (r + st + kn * 0.7), kn * 1.15, kn * 0.9, an, 0, 6.283); shape(ctx, (C.green || '#7FC48F'), lighten((C.green || '#7FC48F'), 0.4), 1); }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, lighten('#2F5E78', 0.12 * hl), lighten((C.tealL || '#9ED0EA'), 0.2 * hl), Math.max(1.5, r * 0.022));
  // mitochondriën in de dikste kant van de rand
  for (let k = 0; k < 3; k++) { const an = Math.PI * 0.82 + (k - 1) * 0.42, rr = r * 0.88, L = r * 0.17, B = r * 0.065;
    ctx.save(); ctx.translate(x + Math.cos(an) * rr, y + Math.sin(an) * rr); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, (C.mitoFill || '#D88E7A'), (C.mitoEdge || '#F0B8A6'), 1);
    ctx.beginPath(); ctx.moveTo(-L * 0.28, 0); ctx.lineTo(L * 0.28, 0); ctx.strokeStyle = rgba((C.mitoEdge || '#F0B8A6'), 0.8); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); }
  // kern: groot, rond, donkere chromatinevlekken
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), Math.max(1.2, r * 0.018));
  ctx.fillStyle = rgba('#3E2E66', 0.45);
  for (let i = 0; i < 9; i++) { const an = hash(i * 2.1 + 5) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.72;
    ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// HIV-DEELTJE. Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel (twee lijnen);
// 8–14 envelopspikes (gp41-steel in de membraan + gp120-trimeer als knop), ± 10–14 nm hoog = ± 20 % van de
// straal, loodrecht en gelijkmatig verspreid; binnenin kegelvormig capside (p24) ± 100 nm lang, breed eind
// ± 50 nm, smal eind ± 20 nm (≈ 1,3 r lang), met twee RNA-strengen (enkelstrengs, ± 9,7 kb elk) vooral in het
// brede eind. Fusie: na binding aan CD4 + corecepor versmelt de envelop met het celmembraan; het deeltje opent
// aan de onderkant, wordt een koepel en loopt over in de membraan; capside zakt naar de opening.
// Bron: Briggs & Kräusslich 2011 (J Mol Biol, cryo-ET HIV); Zhu e.a. 2006 (Nature, spikes per virion ± 14).
// Bekende fouten: stekelbol met tientallen lange spikes; rond capside; spikes zonder steel die los zweven;
// DNA in plaats van RNA.
// Oorsprong = midden; r = straal envelop in px; fuseer-membraan ligt op y + r (raaklijn onderkant).
// =====================================================================================
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12 } = o; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba((C.coral || '#E07A5F'), 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    ctx.beginPath(); ctx.moveTo(px - nx * r * 0.05, py - ny * r * 0.05); ctx.lineTo(px + nx * r * 0.14, py + ny * r * 0.14); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.2); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h]) => { ctx.beginPath(); ctx.arc(px + nx * r * h + tx * sd * ks * 0.95, py + ny * r * h + ty * sd * ks * 0.95, ks, 0, 6.283); shape(ctx, (C.coralL || '#F0A88F'), lighten((C.coralL || '#F0A88F'), 0.35), 1); });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = (C.ink || '#F2F2EE'); ctx.lineWidth = Math.max(1, r * 0.022);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// STAAFBACTERIE (bacil, doorsnede-aanzicht). Recept: ± 1 µm breed × 2–3 µm lang (hier breedte = L / 2,5),
// uiteinden halfrond. Celwand (peptidoglycaan; Gram-positief 20–80 nm = 2–8 % van de breedte) hier vergroot tot
// ± 8 % zodat hij als dikke laag leest, buiten het dunne celmembraan met een smalle spleet ertussen (twee
// duidelijke lagen). Nucleoïde = één ringvormig DNA-molecuul, sterk opgekruld, als kluwen in het midden zonder
// kernmembraan. Ribosomen 20 nm, ± 10 000–20 000 per cel: hier veel kleine stipjes, buiten de nucleoïde.
// Flagel ± 20 nm dik, 5–10 µm lang (2–4 × de cel), schroefvormig, verankerd in wand + membraan (basaal
// lichaam) aan een pool. Antibiotica (bijv. penicilline) remmen de opbouw van de wand: gaten in de wand, het
// membraan puilt door een gat naar buiten (blaasje) en scheurt door de osmotische druk → inhoud lekt weg.
// Bron: Brock Biology of Microorganisms h. 2; Madigan e.a. fig. 2.x (penicilline-lysis).
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; ribosomen als grote bollen; flagel als
// los haartje naast de cel.
// Oorsprong = midden; L = lengte in px; o.rot = draaiing.
// =====================================================================================
function bacterieCel(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, hlRibo = 0, flagel = false } = o; const ab = clamp(antibiotica, 0, 1);
  const hw = L / 5, ww = hw * 0.16, half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  // omtrek (capsule) met normalen, gelijk verdeeld
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  // blaasje: membraan puilt door een wandgat bovenaan (x0)
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.1, ky = 0;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - 3).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // flagel aan de linkerpool (achter de cel getekend)
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 80; i++) { const u = i / 80, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.75); ctx.lineWidth = Math.max(1.4, hw * 0.05); ctx.stroke(); }
  // cytoplasma
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba((C.green || '#7FC48F'), 0.16); ctx.fill();
  // ribosomen
  const nr = Math.round(L * L / 900 + 40); const rr = Math.max(1.3, hw * 0.045);
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + 1) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4;
    if (Math.pow((px - kx) / (half * 0.85 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.5), 2) < 1) continue;
    if (hlRibo > 0.01) { ctx.beginPath(); ctx.arc(px, py, rr * 2.4, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 0.18 * hlRibo); ctx.fill(); }
    ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fillStyle = lighten((C.gold || '#E0B64A'), 0.3 * hlRibo); ctx.fill(); }
  ctx.restore();
  // nucleoïde: opgekruld ring-DNA
  ctx.beginPath(); const nl = 220; for (let i = 0; i <= nl; i++) { const u = i / nl * 6.283; const bx = Math.cos(u) * half * 0.7, by = Math.sin(u) * hw * 0.3; const cr = hw * (0.13 + 0.05 * Math.sin(u * 3));
    const px = kx + bx + Math.cos(u * 23) * cr, py = ky + by + Math.sin(u * 23) * cr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.strokeStyle = rgba((C.purpleL || '#BBAFE0'), 0.95); ctx.lineWidth = Math.max(1.1, hw * 0.035); ctx.stroke();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = (C.mem || '#AFC0D0'); ctx.lineWidth = Math.max(1.3, hw * 0.04);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    // inhoud lekt weg
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 1 - u); ctx.fill(); } }
  // celwand: dikke band, met gaten bij antibiotica
  const wand = omtrek(hw - ww / 2, 96); const wc = lighten('#6FA27C', 0.25 * hlWand);
  if (hlWand > 0.01) { ctx.beginPath(); bioPad(ctx, wand.map(q => q.p), true); ctx.strokeStyle = rgba((C.greenL || '#B4DFBB'), 0.22 * hlWand); ctx.lineWidth = ww + 10; ctx.stroke(); }
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  ctx.lineCap = 'round';
  for (const pass of [[lighten(wc, 0.45), ww + 2.4], [wc, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  // basaal lichaam van de flagel
  if (flagel) { ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.ink2, (C.ink || '#F2F2EE'), 1); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: aanleg geslachtsorganen, eileider, zwangerschapstest
// =====================================================================================
// =====================================================================================
// obj_aanleg_eileider_test.js — nieuwe objecten voor lib_bio.js (aanleg geslachtsorganen, eileider, zwangerschapstest)
// Zelfde stijl als lib_bio.js: recept + bron + bekende fouten boven elk object; (ctx, x, y, ..., o = {});
// deterministisch (alleen hash), animatie via t (s), geeft ankerpunten in schermcoördinaten terug.
// =====================================================================================

function _bioMix(c1, c2, f) { // twee #hex-kleuren mengen → 'rgb()'
  const p = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(c1), B = p(c2); f = clamp(f, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], f))},${Math.round(lerp(A[1], B[1], f))},${Math.round(lerp(A[2], B[2], f))})`;
}
function _bioMixA(c1, c2, f, al) { const s = _bioMix(c1, c2, f); return s.replace('rgb(', 'rgba(').replace(')', `,${al})`); }

// =====================================================================================
// AANLEG GESLACHTSORGANEN (inwendig), embryo week 6–7, ongedifferentieerd stadium, vooraanzicht, symmetrisch.
// Recept (Sadler, Langman's Medical Embryology h. 16, fig. 16.24–16.32; Moore, The Developing Human h. 12):
// - Gonade = genitale lijst: langgerekte richel mediaal van de oernier (mesonephros), lengte ± 3–4× de breedte,
//   hoog in de buik (ter hoogte van de onderste borst-/bovenste lendenwervels). Hier 44 × 140 px.
// - Wolff-buis (ductus mesonephricus) loopt lateraal in de oernier omlaag en mondt uit in de sinus urogenitalis.
// - Müller-buis (ductus paramesonephricus) ontstaat als instulping van het coeloomepitheel LATERAAL van de
//   Wolff-buis, opent boven met een trechter in de buikholte, loopt omlaag, kruist dan VENTRAAL (vóór) de Wolff-buis
//   naar mediaal; beide Müller-buizen versmelten in de middellijn (uterovaginaal kanaal) en raken de achterwand van
//   de sinus (Müller-heuveltje) tussen de twee Wolff-uitmondingen.
// - Man (SRY → testis, AMH, testosteron): testis ronder (± 4 × 3 cm volwassen, verhouding 1,3 : 1), zakt iets;
//   bovenste oerniertubuli + Wolff-buis → ductuli efferentes + bijbal (sterk gekronkelde buis tegen de laterale/
//   achterkant van de testis, kop boven, staart onder); rest van de Wolff-buis → zaadleider (dikke spierwand);
//   zaadblaasje = knop uit de zaadleider vlak boven de sinus (week 10); Müller-buizen verdwijnen door AMH.
// - Vrouw (geen AMH, geen testosteron): eierstok amandelvormig (± 3 × 1,5 cm volwassen, 2 : 1) met follikels;
//   bovenste Müller-deel → eileider met trechter en fimbriae; versmolten onderste deel → baarmoeder + bovenste deel
//   vagina (peervorm in de middellijn, fundus boven); Wolff-buizen verdwijnen (resten: Gartner).
// Ontwerpcoördinaten: ± 360 × 440, oorsprong in het midden; sinus onderaan in het midden.
// Bekende fouten: gonaden onderaan naast de sinus; Müller-buis mediaal van de Wolff-buis over de hele lengte;
// Müller-buizen die gescheiden in de sinus uitkomen; bijbal als losse bol; baarmoeder als driehoek los van de buizen;
// beide buizenparen tegelijk volgroeid laten (in elk geslacht verdwijnt er één).
// =====================================================================================
function aanlegGeslacht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, man = 0, vrouw = 0, hlWolff = 0, hlMuller = 0, hlGonade = 0 } = o;
  const m = ease(clamp(man, 0, 1)), v = ease(clamp(vrouw, 0, 1));
  const P = (px, py) => [x + px * s, y + py * s];
  const mix3 = (i, mm, ff) => i + (mm - i) * m + (ff - i) * v;
  const mixPts = (I, Mm, F) => I.map((p, k) => [mix3(p[0], Mm[k][0], F[k][0]), mix3(p[1], Mm[k][1], F[k][1])]);
  const COL_W = (C.purple || '#8C7BBF'), COL_M = '#D9868A', COL_G = '#C98A6A', COL_S = '#8FA6B8';
  // gonade
  const g = { cx: mix3(82, 80, 88), cy: mix3(-112, -62, -100), rx: mix3(22, 38, 24), ry: mix3(70, 50, 50), rot: mix3(0.06, 0.1, 0.32) };
  const gM = { cx: 80, cy: -62, rx: 38, ry: 50, rot: 0.1 }; // eindstand testis (voor de bijbal)
  const opT = (G, th, dr = 0) => { const lx = Math.cos(th) * (G.rx + dr), ly = Math.sin(th) * (G.ry + dr * 0.8); const c = Math.cos(G.rot), sn = Math.sin(G.rot); return [G.cx + lx * c - ly * sn, G.cy + lx * sn + ly * c]; };
  // Wolff (rechts): ongedifferentieerd / man (bijbal + zaadleider) / vrouw (= ongedifferentieerd, verdwijnt)
  const W_I = [[124, -206], [132, -150], [134, -80], [132, -10], [124, 50], [100, 105], [60, 150], [26, 184], [16, 202]];
  const W_M = [opT(gM, -1.2, 8), opT(gM, -0.6, 9), opT(gM, 0, 9), opT(gM, 0.9, 8), [124, 40], [106, 100], [62, 148], [26, 184], [16, 202]];
  const wolff = mixPts(W_I, W_M, W_I);
  // Müller (rechts): trechter boven lateraal, kruist ventraal naar mediaal
  const M_I = [[162, -202], [164, -140], [162, -70], [156, 0], [144, 55], [112, 96], [66, 132], [24, 156], [6, 166]];
  const M_F = [[116, -160], [148, -164], [170, -128], [174, -62], [156, 0], [122, 34], [88, 46], [62, 52], [44, 52]]; // eileider boogt over de eierstok
  const muller = mixPts(M_I, M_I, M_F);
  // middellijn: versmolten Müller-deel (rechterhelft) → peervormige baarmoeder + bovenste vagina
  const U_I = [[0, 156], [6, 157], [9, 161], [9, 168], [9, 175], [9, 182], [9, 188], [9, 195], [9, 202]];
  const U_F = [[0, 24], [32, 28], [52, 46], [55, 82], [44, 118], [26, 142], [18, 158], [16, 180], [16, 202]];
  const uterus = mixPts(U_I, U_I, U_F);
  const ret = { gonade: P(g.cx, g.cy), wolff: (() => { const q = bioPunt(bioDicht(wolff, 12), 0.5); return P(q[0], q[1]); })(),
    muller: (() => { const q = bioPunt(bioDicht(muller, 12), 0.5); return P(q[0], q[1]); })(), sinus: P(0, 214) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const both = (fn) => { fn(1); ctx.save(); ctx.scale(-1, 1); fn(-1); ctx.restore(); };
  const lijn = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const buisVul = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const rand = (pts, col, lw, al) => { ctx.strokeStyle = lighten(col, 0.4); ctx.globalAlpha *= al; ctx.lineWidth = lw + 2.4; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.globalAlpha /= al; };

  // sinus urogenitalis (onder, midden)
  ctx.beginPath(); bioPad(ctx, [[-56, 212], [-40, 198], [0, 194], [40, 198], [56, 212], [40, 230], [0, 236], [-40, 230]], true); shape(ctx, rgba(COL_S, 0.55), lighten(COL_S, 0.35), 2);
  // oernier (mesonephros): vaag, verdwijnt in beide richtingen grotendeels
  const meso = 1 - 0.85 * Math.max(m, v);
  both(() => { ctx.beginPath(); ctx.ellipse(128, -98, 30, 104, 0.02, 0, 6.283); shape(ctx, rgba('#B9A6C9', 0.14 * meso), rgba('#B9A6C9', 0.3 * meso), 1.5);
    ctx.strokeStyle = rgba('#B9A6C9', 0.35 * meso); ctx.lineWidth = 2; // oerniertubuli
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 26; ctx.beginPath(); ctx.moveTo(131, yy); ctx.bezierCurveTo(118, yy - 6, 122, yy + 10, 108, yy + 6); ctx.stroke(); } });

  // gonaden
  both(() => {
    const p = Math.max(0.6, 1 + 0.7 * v); // amandel: puntiger uiteinden
    const omtrek = []; for (let k = 0; k < 40; k++) { const th = k / 40 * 6.283; const cx = Math.cos(th), sy = Math.sin(th);
      const lx = Math.sign(cx) * Math.pow(Math.abs(cx), p) * g.rx, ly = sy * g.ry; const c = Math.cos(g.rot), sn = Math.sin(g.rot); omtrek.push([g.cx + lx * c - ly * sn, g.cy + lx * sn + ly * c]); }
    if (hlGonade > 0.01) { ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.strokeStyle = rgba('#E8C2AE', 0.28 * hlGonade); ctx.lineWidth = 16; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(COL_G, 0.85), lighten(COL_G, 0.3), 2 + 1.5 * m);
    // testis: zaadstrengen (kronkelende strengen naar het rete aan de achter-bovenkant)
    if (m > 0.02) { ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip(); ctx.strokeStyle = rgba('#8E5A44', 0.55 * m); ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) { const th = 1.9 + k * 0.42; const A = opT(g, th, -4), B = opT(g, -0.9, -g.rx * 0.6); ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        ctx.bezierCurveTo(lerp(A[0], B[0], 0.3) + 6, lerp(A[1], B[1], 0.3) - 6, lerp(A[0], B[0], 0.7) - 6, lerp(A[1], B[1], 0.7) + 6, B[0], B[1]); ctx.stroke(); }
      ctx.restore(); }
    // eierstok: follikels (stipjes in de schors)
    if (v > 0.02) { for (let k = 0; k < 13; k++) { const th = hash(k * 7 + 1) * 6.283, rr = lerp(0.45, 0.78, hash(k * 7 + 2)); const q = [Math.cos(th) * g.rx * rr, Math.sin(th) * g.ry * rr];
        const c = Math.cos(g.rot), sn = Math.sin(g.rot); const fx = g.cx + q[0] * c - q[1] * sn, fy = g.cy + q[0] * sn + q[1] * c; const fr = 2.2 + 2.4 * hash(k * 7 + 3);
        ctx.beginPath(); ctx.arc(fx, fy, fr * v, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.8 * v), rgba('#E2B88E', 0.9 * v), 1); } }
  });

  // Wolff-buizen (achter de Müller-buizen)
  const wAl = 1 - 0.85 * v, wLw = 5 + 2.5 * m - 2.5 * v;
  both(() => {
    if (hlWolff > 0.01) lijn(wolff, '#BBAFE0', wLw + 14, 0.28 * hlWolff * wAl);
    rand(wolff, COL_W, wLw, wAl); buisVul(wolff, COL_W, wLw, wAl);
    if (m > 0.02) { // bijbal: band + kronkelende buis tegen de laterale kant van de testis
      const B = [], K = []; for (let i = 0; i <= 60; i++) { const th = lerp(-1.25, 0.95, i / 60); const p0 = opT(g, th, 8), p1 = opT(g, th, 9 + 5.5 * Math.sin(i * 1.9)); B.push(p0); K.push(p1); }
      ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = lighten(COL_W, 0.4); ctx.lineWidth = 17; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba(COL_W, 1); ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba('#5E4E8C', 0.9); ctx.lineWidth = 2; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // ductuli efferentes van testis naar bijbalkop
      ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { const th = -1.15 + k * 0.17; const A = opT(g, th, -6), Bq = opT(g, th, 4); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bq[0], Bq[1]); ctx.stroke(); }
      // zaadblaasje: knop uit de zaadleider vlak boven de sinus
      const q = bioPunt(bioDicht(wolff, 12), 0.88); ctx.translate(q[0], q[1]); ctx.rotate(q[2] + 2.2); const sz = m;
      ctx.beginPath(); bioPad(ctx, [[0, -4 * sz], [10 * sz, -7 * sz], [20 * sz, -4 * sz], [26 * sz, 0], [20 * sz, 5 * sz], [10 * sz, 7 * sz], [0, 4 * sz]], true); shape(ctx, rgba('#A797D4', 0.95), lighten(COL_W, 0.45), 1.5);
      ctx.restore(); }
  });

  // Müller-buizen (vóór de Wolff-buizen) + trechter/fimbriae + baarmoeder
  const mAl = 1 - 0.9 * m, mLw = 5 - 2.6 * m + 1.2 * v;
  ctx.save(); ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  both(() => {
    if (hlMuller > 0.01) lijn(muller, '#F0B8BA', mLw + 14, 0.28 * hlMuller * mAl);
    rand(muller, COL_M, mLw, mAl); buisVul(muller, COL_M, mLw, mAl);
  });
  ctx.restore();
  both((sd) => { // trechter met (bij de vrouw) fimbriae
    const p0 = muller[0], p1 = muller[1]; let ex = p0[0] - p1[0], ey = p0[1] - p1[1]; const d = Math.hypot(ex, ey); ex /= d; ey /= d;
    if (v > 0.02) { const an = Math.atan2(ey, ex) + 0.6; ex = lerp(ex, Math.cos(an), v); ey = lerp(ey, Math.sin(an), v); const dd = Math.hypot(ex, ey); ex /= dd; ey /= dd; } // trechter naar de eierstok
    const qx = -ey, qy = ex; const rw = 8 + 6 * v, bw = mLw / 2;
    ctx.save(); ctx.globalAlpha *= mAl;
    const bx = p0[0] - ex * 12, by = p0[1] - ey * 12, rx0 = p0[0] + ex * 4, ry0 = p0[1] + ey * 4;
    // fimbriae (vingers rond de rand, wiegen zacht)
    if (v > 0.02) { const nf = 9; for (let k = 0; k < nf; k++) { const f = k / (nf - 1) - 0.5; const sx = rx0 + qx * rw * f * 2, sy = ry0 + qy * rw * f * 2;
        const an = Math.atan2(ey, ex) + f * 2.4 + 0.12 * Math.sin(t * 1.3 + k * 0.9) * sd; const len = (11 + 7 * hash(k + 11)) * v;
        const mx = sx + Math.cos(an) * len * 0.55 + Math.cos(an + 1.57) * 2, my = sy + Math.sin(an) * len * 0.55 + Math.sin(an + 1.57) * 2;
        for (const [col, lw] of [[lighten(COL_M, 0.4), 5.4], [COL_M, 3.2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, sx + Math.cos(an) * len, sy + Math.sin(an) * len); ctx.stroke(); } } }
    ctx.beginPath(); ctx.moveTo(bx + qx * bw, by + qy * bw); ctx.quadraticCurveTo(p0[0] + qx * bw * 1.2, p0[1] + qy * bw * 1.2, rx0 + qx * rw, ry0 + qy * rw);
    ctx.lineTo(rx0 - qx * rw, ry0 - qy * rw); ctx.quadraticCurveTo(p0[0] - qx * bw * 1.2, p0[1] - qy * bw * 1.2, bx - qx * bw, by - qy * bw); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 1.5);
    ctx.beginPath(); ctx.ellipse(rx0, ry0, rw * 0.85, 3, Math.atan2(qy, qx), 0, 6.283); ctx.fillStyle = rgba('#5A2E36', 0.7); ctx.fill(); // opening naar de buikholte
    ctx.restore();
  });
  // versmolten middendeel: uterovaginaal kanaal → baarmoeder (peer) + bovenste vagina
  const UO = uterus.concat(uterus.slice(1).reverse().map(p => [-p[0], p[1]])).slice(0, -1);
  const full = uterus.slice().reverse().map(p => [-p[0], p[1]]).concat(uterus.slice(1));
  ctx.save(); ctx.globalAlpha *= mAl; ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  if (hlMuller > 0.01) { ctx.beginPath(); bioPad(ctx, full, false); ctx.strokeStyle = rgba('#F0B8BA', 0.28 * hlMuller); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, full, false); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 2);
  ctx.setLineDash([]);
  if (v > 0.02) { // baarmoederholte (driehoek) + baarmoederhalskanaal
    ctx.beginPath(); bioPad(ctx, [[0, lerp(150, 44, v)], [lerp(4, 30, v), lerp(152, 46, v)], [lerp(3, 10, v), lerp(160, 104, v)], [0, lerp(165, 130, v)], [lerp(-3, -10, v), lerp(160, 104, v)], [lerp(-4, -30, v), lerp(152, 46, v)]], true);
    ctx.fillStyle = rgba('#7A3A44', 0.55 * v); ctx.fill();
    ctx.strokeStyle = rgba('#7A3A44', 0.55 * v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, lerp(165, 128, v)); ctx.lineTo(0, 200); ctx.stroke(); }
  else { ctx.strokeStyle = rgba('#7A3A44', 0.45); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(0, 200); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// EILEIDER, lengtedoorsnede, horizontaal: links (x0) trechter met fimbriae open naar de eierstok, rechts (x1) de
// smalle isthmus naar de baarmoeder.
// Recept (Junqueira, Basic Histology h. 22; Sadler h. 2–3; Wheater's Functional Histology):
// - Lengte 10–12 cm: trechter (infundibulum) met fimbriae ± 1–2 cm (hier 0–9 %), ampulla ± 2/3 (hier tot ± 70 %),
//   isthmus ± 2–3 cm (laatste 30 %), dan het intramurale deel in de baarmoederwand (niet getekend).
// - Buitendiameter ampulla ± 1 cm, isthmus ± 2–4 mm (hier 0,42×); trechter loopt wijd uit (hier 1,3×).
// - Wand: slijmvlies (eenlagig cilinderepitheel met trilhaarcellen + secretoire 'peg'-cellen, losse lamina
//   propria), spierlaag (binnen circulair, buiten longitudinaal glad spierweefsel; in de ampulla dun, ± 13 % van de
//   straal; in de isthmus dik, ± 40 %), sereus vlies buiten.
// - Slijmvliesplooien: lange, sterk vertakte lengteplooien die een doolhof vormen; in de ampulla veel en hoog
//   (± 55 % van de binnenstraal), in de isthmus weinig en laag, het lumen daar nauw.
// - Trilharen slaan richting baarmoeder (effectieve slag snel, terugslag langzaam), metachrone golf; meeste
//   trilhaarcellen in trechter en ampulla. Bevruchting in de ampulla.
// - Ontsteking (salpingitis, vaak chlamydia): wand en plooien zwellen (oedeem), roder (hyperemie), ontstekingscellen.
//   Litteken: bindweefsel (collageen) vervangt het slijmvlies, plooien verkleven, lumen vernauwt tot bijna dicht →
//   zaadcellen komen er nog net door, het (grotere) embryo niet: buitenbaarmoederlijke zwangerschap/onvruchtbaarheid.
// Bekende fouten: eileider als glad buisje zonder plooien; trilharen die alle kanten op of richting eierstok slaan;
// trechter dicht; isthmus even wijd als de ampulla; litteken als losse bal in het lumen.
// Geeft lumen(u) → [x, y, halve vrije breedte] (tussen de plooitoppen; met litteken).
// =====================================================================================
function eileiderLangs(ctx, x0, x1, y, h, o = {}) {
  const { a = 1, t = 0, ontsteking = 0, litteken = 0, plek = 0.55, trilharen = 1 } = o;
  const L = x1 - x0, H = h / 2, k = H / 90; // k: schaal t.o.v. h = 180
  const X = (u) => x0 + u * L;
  const prof = (u) => {
    const s = ease((u - 0.6) / 0.18); const fl = Math.max(0, 1 - u / 0.09), flare = fl * fl;
    const b = clamp(ontsteking, 0, 1) * Math.exp(-Math.pow((u - 0.5) / 0.12, 2));
    const c = clamp(litteken, 0, 1) * Math.exp(-Math.pow((u - plek) / 0.028, 2));
    const Ho = H * (lerp(1, 0.42, s) + 0.3 * flare + 0.16 * b);
    const mt = Ho * lerp(0.13, 0.56, s) * lerp(1, 0.3, flare) * (1 + 0.25 * b);
    const Hm = Ho - mt; const mu = H * (0.07 + 0.06 * b) * lerp(1, 0.8, s); const He = Hm - mu;
    const fh = Math.min(He - 3 * k, He * lerp(0.64, 0.36, s) * lerp(1, 0.55, flare) * (1 + 0.35 * b)) * (1 - 0.8 * c);
    const Hsc = lerp(He, 1.4 * k, c); // binnenrand littekenweefsel
    return { s, b, c, flare, Ho, Hm, He, fh, Hsc, Hf: Math.min(He - fh, Hsc) };
  };
  const lumen = (u) => { const p = prof(clamp(u, 0, 1)); return [X(clamp(u, 0, 1)), y, p.Hf]; };
  if (a <= 0.01) return { lumen };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const N = 160, U = Array.from({ length: N + 1 }, (_, i) => i / N), PR = U.map(prof);
  const SP = BIO.spier, SPL = BIO.spierL, SL = BIO.slijm, RED = '#C2453E';
  const band = (sd, kA, kB) => { ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i][kA]; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); });
    for (let i = N; i >= 0; i--) ctx.lineTo(X(U[i]), y + sd * PR[i][kB]); ctx.closePath(); };
  // lumen (vocht) iets donkerder dan de achtergrond
  const i0 = Math.round(0.09 * N); // trechter open: geen vocht-vlak vóór de trechter
  ctx.beginPath(); for (let i = i0; i <= N; i++) { const yy = y - PR[i].He; i > i0 ? ctx.lineTo(X(U[i]), yy) : ctx.moveTo(X(U[i]), yy); } for (let i = N; i >= i0; i--) ctx.lineTo(X(U[i]), y + PR[i].He); ctx.closePath();
  ctx.fillStyle = rgba('#0D1420', 0.32); ctx.fill();
  for (const sd of [-1, 1]) {
    // spierlaag
    band(sd, 'Ho', 'Hm'); shape(ctx, rgba(SP, 0.62), rgba(SPL, 0.7), 1.5);
    ctx.save(); band(sd, 'Ho', 'Hm'); ctx.clip();
    ctx.strokeStyle = rgba(SPL, 0.5); ctx.lineWidth = 1.6 * k; // buiten longitudinaal: lange spoelvormige vezels
    for (let xx = x0 + 6; xx < x1; xx += 30 * k) { const u = (xx - x0) / L, p = prof(u); const yy = y + sd * lerp(p.Ho, p.Hm, 0.22); ctx.beginPath(); ctx.ellipse(xx + (hash(xx) - 0.5) * 8, yy, 13 * k, 1.8 * k, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = rgba(SPL, 0.45); // binnen circulair: dwars getroffen vezels (puntjes), meer rijen waar de laag dik is
    for (let xx = x0 + 4; xx < x1; xx += 9 * k) { const u = (xx - x0) / L, p = prof(u); const mt = p.Ho - p.Hm; const rows = Math.max(1, Math.floor(mt * 0.55 / (6 * k)));
      for (let r = 0; r < rows; r++) { const f = 0.5 + (r + 0.5) / rows * 0.42; ctx.beginPath(); ctx.ellipse(xx + (r % 2) * 4 * k, y + sd * lerp(p.Ho, p.Hm, f), 2.2 * k, 1.5 * k, 0, 0, 6.283); ctx.fill(); } }
    ctx.restore();
    // sereus vlies
    ctx.strokeStyle = rgba('#E8D8DE', 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * (PR[i].Ho + 1.5); i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke();
    // slijmvlies (basis)
    band(sd, 'Hm', 'He'); ctx.fillStyle = rgba(SL, 0.8); ctx.fill();
    // ontsteking: wand roder (vlakke stroken, geen verloop)
    if (ontsteking > 0.01) { ctx.save(); band(sd, 'Ho', 'He'); ctx.clip(); for (let xx = Math.floor(x0); xx < x1; xx += 3) { const p = prof((xx - x0) / L); if (p.b < 0.01) continue; ctx.fillStyle = rgba(RED, 0.42 * p.b); ctx.fillRect(xx, y - H * 2, 3, H * 4); } ctx.restore(); }
  }
  // plooien: veel, hoog en vertakt in de ampulla; weinig en laag in de isthmus
  const plooien = [];
  for (const sd of [-1, 1]) { let xx = X(0.03) + (sd > 0 ? 9 * k : 0), i = 0;
    while (xx < x1 - 6) { const u = (xx - x0) / L, p = prof(u); const hh = p.fh * (0.72 + 0.28 * hash(i * 13 + sd * 7));
      if (hh > 2) { const by = y + sd * (p.He + 2), ty = by - sd * hh; const lean = (hash(i * 5 + sd) - 0.5) * hh * 0.35;
        const trunk = [[xx, by], [xx + lean * 0.3, lerp(by, ty, 0.35)], [xx + lean * 0.7 + (hash(i + 3) - 0.5) * 4 * k, lerp(by, ty, 0.7)], [xx + lean, ty]];
        const tak = []; const nt = p.s < 0.5 ? (hash(i * 3 + 1) < 0.75 ? 1 + (hash(i * 3 + 2) < 0.5 ? 1 : 0) : 0) : (hash(i * 3 + 1) < 0.25 ? 1 : 0);
        for (let j = 0; j < nt; j++) { const f = 0.35 + 0.25 * j + 0.1 * hash(i * 9 + j); const r0 = [lerp(trunk[0][0], trunk[3][0], f), lerp(by, ty, f)]; const dir = (j % 2 ? 1 : -1) * (hash(i + j * 17) < 0.5 ? 1 : -1);
          const ln = hh * (0.32 + 0.15 * hash(i * 7 + j)); const an = 0.75; const e = [r0[0] + dir * Math.sin(an) * ln, r0[1] - sd * Math.cos(an) * ln];
          tak.push([r0, [lerp(r0[0], e[0], 0.5) + dir * 2, lerp(r0[1], e[1], 0.5) + sd * 2], e]); }
        plooien.push({ trunk, tak, w: lerp(9, 7, p.s) * k * (1 + 0.55 * p.b), col: _bioMix(SL, '#C8504A', p.b * 0.75), sd, u }); }
      xx += H * lerp(0.27, 0.85, p.s) * (0.8 + 0.4 * hash(i * 11 + sd * 3)); i++; } }
  const strokeP = (pts, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  plooien.forEach(pl => { const e = lighten(pl.col.replace(/rgb\((\d+),(\d+),(\d+)\)/, (q, r, g, b) => '#' + [r, g, b].map(n => (+n).toString(16).padStart(2, '0')).join('')), 0.35); strokeP(pl.trunk, pl.w + 2.4, e); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75 + 2.4, e)); });
  plooien.forEach(pl => { strokeP(pl.trunk.slice(0, 2), pl.w * 1.7 + 2.4, lighten('#D58A8A', 0.35)); });
  plooien.forEach(pl => { strokeP(pl.trunk, pl.w, pl.col); strokeP(pl.trunk.slice(0, 2), pl.w * 1.7, pl.col); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75, pl.col)); }); // plooi breder aan de voet
  plooien.forEach(pl => { const cc = rgba('#9E4A44', 0.45); strokeP(pl.trunk.slice(0, 3).concat([[lerp(pl.trunk[2][0], pl.trunk[3][0], 0.5), lerp(pl.trunk[2][1], pl.trunk[3][1], 0.5)]]), pl.w * 0.28, cc); pl.tak.forEach(tk => strokeP(tk.slice(0, 2), pl.w * 0.22, cc)); });
  // epitheelrand van de basis
  for (const sd of [-1, 1]) { ctx.strokeStyle = rgba('#F2C4BC', 0.75); ctx.lineWidth = 2; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i].He; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke(); }
  // fimbriae aan de trechterrand (vingers die zacht wiegen)
  const fim = [];
  for (const sd of [-1, 1]) { const p0 = prof(0); for (let j = 0; j < 6; j++) { const u0 = 0.004 + 0.012 * j; const pj = prof(u0); const bx = X(u0), by = y + sd * lerp(pj.He, pj.Hm, 0.4);
      const len = (38 + 22 * hash(j * 3 + (sd > 0 ? 50 : 0))) * k; const an0 = Math.PI - sd * (0.1 + 0.13 * j) * (j % 2 ? 1 : 0.7);
      const pts = []; for (let q = 0; q <= 6; q++) { const f = q / 6; const an = an0 + sd * 0.35 * f * f + 0.12 * Math.sin(t * 0.9 + j * 1.3 + f * 2) * f; const prev = q ? pts[q - 1] : [bx, by]; pts.push(q ? [prev[0] + Math.cos(an) * len / 6, prev[1] + Math.sin(an) * len / 6] : [bx, by]); }
      fim.push({ pts, w0: (11 - j * 0.6) * k, sd }); } }
  const fimPoly = (f) => { const l = [], r = []; f.pts.forEach((p, q) => { const nx = f.pts[Math.min(q + 1, 6)], pv = f.pts[Math.max(q - 1, 0)]; let dx = nx[0] - pv[0], dy = nx[1] - pv[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const w = f.w0 * lerp(1, 0.35, q / 6) / 2; l.push([p[0] - dy * w, p[1] + dx * w]); r.push([p[0] + dy * w, p[1] - dx * w]); }); return l.concat(r.reverse()); };
  fim.forEach(f => { ctx.beginPath(); bioPad(ctx, fimPoly(f), true); shape(ctx, rgba(SL, 0.92), lighten(SL, 0.35), 1.6); strokeP(f.pts.slice(0, 5), f.w0 * 0.22, rgba('#9E4A44', 0.4)); });
  // trilharen: effectieve slag snel richting baarmoeder (+x), terugslag langzaam; golf loopt naar rechts
  if (trilharen > 0.01) {
    const cl = 5.5 * Math.max(0.7, k); const beat = (xx) => { let ph = ((xx * 0.05 - t * 5.5) / 6.283) % 1; if (ph < 0) ph += 1; return ph < 0.3 ? lerp(-0.55, 0.75, ease(ph / 0.3)) : lerp(0.75, -0.55, ease((ph - 0.3) / 0.7)); };
    ctx.save(); ctx.globalAlpha *= clamp(trilharen, 0, 1); ctx.strokeStyle = rgba('#F6E8E2', 0.7); ctx.lineWidth = 1.1; ctx.beginPath();
    const tril = (rx, ry, nx, ny, axis) => { let tx = -ny, ty = nx; if (tx < 0 || (Math.abs(tx) < 0.2 && (axis - ry) * ty < 0)) { tx = -tx; ty = -ty; } const th = beat(rx);
      const dx = nx * Math.cos(th) + tx * Math.sin(th), dy = ny * Math.cos(th) + tx * 0 + ty * Math.sin(th);
      ctx.moveTo(rx, ry); ctx.quadraticCurveTo(rx + nx * cl * 0.6, ry + ny * cl * 0.6, rx + dx * cl, ry + dy * cl); };
    const langs = (pts, w, sd, stap) => { const D = bioDicht(pts, 6); let acc = 0; for (let q = 1; q < D.length; q++) { const dx = D[q][0] - D[q - 1][0], dy = D[q][1] - D[q - 1][1], d = Math.hypot(dx, dy); acc += d; if (acc < stap || d < 1e-6) continue; acc = 0;
        if (hash(Math.round(D[q][0] * 3 + D[q][1])) < 0.22) continue; // secretoire cel zonder trilharen
        for (const zz of [-1, 1]) { const nx = -dy / d * zz, ny = dx / d * zz; tril(D[q][0] + nx * (w / 2 + 1), D[q][1] + ny * (w / 2 + 1), nx, ny, y); } } };
    for (const sd of [-1, 1]) for (let xx = x0 + 3; xx < x1; xx += 5 * Math.max(0.8, k)) { const p = prof((xx - x0) / L); if (hash(Math.round(xx) * 7 + sd) < 0.25 + 0.15 * p.s) continue; tril(xx, y + sd * (p.He + 1), 0, -sd, y); }
    plooien.forEach(pl => { langs(pl.trunk, pl.w, pl.sd, 5.5 * k); pl.tak.forEach(tk => langs(tk, pl.w * 0.75, pl.sd, 6 * k)); });
    fim.forEach(f => langs(f.pts.slice(2), f.w0 * 0.55, f.sd, 9 * k));
    ctx.stroke(); ctx.restore();
  }
  // ontsteking: wijde vaatjes in het slijmvlies + ontstekingscellen in het lumen
  if (ontsteking > 0.01) { for (let j = 0; j < 14; j++) { const u = 0.36 + 0.28 * hash(j * 3 + 1), p = prof(u); if (p.b < 0.05) continue; const sd = j % 2 ? 1 : -1;
      ctx.strokeStyle = rgba(RED, 0.8 * p.b); ctx.lineWidth = 2.6 * k; ctx.beginPath(); const xx = X(u), yy = y + sd * lerp(p.He, p.Hm, 0.5); ctx.moveTo(xx - 14 * k, yy); ctx.bezierCurveTo(xx - 5 * k, yy - 4 * k, xx + 5 * k, yy + 4 * k, xx + 14 * k, yy); ctx.stroke(); }
    for (let j = 0; j < 9; j++) { const u = 0.4 + 0.2 * hash(j * 5 + 2), p = prof(u); if (p.b < 0.1) continue; const xx = X(u), yy = y + (hash(j * 5 + 3) - 0.5) * 1.4 * p.Hf; const r = 4.5 * k;
      ctx.save(); ctx.globalAlpha *= p.b; ctx.beginPath(); ctx.arc(xx, yy, r, 0, 6.283); shape(ctx, rgba('#E8ECF0', 0.85), '#FFFFFF', 1); ctx.fillStyle = rgba((C.purple || '#8C7BBF'), 0.85);
      for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(xx + Math.cos(q * 2.1 + j) * r * 0.4, yy + Math.sin(q * 2.1 + j) * r * 0.4, r * 0.3, 0, 6.283); ctx.fill(); } ctx.restore(); } }
  // litteken: bindweefsel vanuit de wand dat het lumen vernauwt
  if (litteken > 0.01) { const ua = clamp(plek - 0.08, 0, 1), ub = clamp(plek + 0.08, 0, 1); const M = 60;
    for (const sd of [-1, 1]) { const outer = [], inner = []; for (let i = 0; i <= M; i++) { const u = lerp(ua, ub, i / M), p = prof(u); outer.push([X(u), y + sd * (p.Hm - 1)]); inner.push([X(u), y + sd * lerp(p.Hm - 1, 1.4 * k, p.c)]); } // dikte → 0 aan de randen
      ctx.beginPath(); outer.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let i = M; i >= 0; i--) ctx.lineTo(inner[i][0], inner[i][1]); ctx.closePath();
      shape(ctx, rgba('#D9CFC2', 0.95), null); ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#A8988A', 0.55); ctx.lineWidth = 1.4; // collageenvezels
      for (let r = 1; r < 7; r++) { ctx.beginPath(); for (let i = 0; i <= M; i++) { const f = r / 7; const yy = lerp(outer[i][1], inner[i][1], f) + Math.sin(i * 0.9 + r * 2) * 1.5; i ? ctx.lineTo(outer[i][0], yy) : ctx.moveTo(outer[i][0], yy); } ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = rgba('#F2ECE4', 0.85); ctx.lineWidth = 1.6; ctx.beginPath(); inner.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); } }
  // snijvlak rechts (naar de baarmoeder)
  const pe = prof(1); ctx.strokeStyle = rgba('#E8D8DE', 0.5); ctx.lineWidth = 1.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x1, y + sd * pe.Ho); ctx.lineTo(x1, y + sd * pe.He); ctx.stroke(); }
  ctx.restore();
  return { lumen };
}

// =====================================================================================
// ZWANGERSCHAPSTEST (lateral-flow test), horizontaal: zuigstaafje links, plastic behuizing, ovaal uitleesvenster,
// duimgreep rechts. Recept: echte test ± 13–15 cm × 2 cm (hier 640 × 120 px, verhouding ± 5,3 : 1); zuiggedeelte
// ± 3–4 cm, iets smaller dan de behuizing; venster ± 1/4 van de lengte, in het midden; daarin een witte strook
// (nitrocellulose) met eerst de testlijn T (antistoffen tegen hCG) en daarna de controlelijn C (vangt de losse
// gekleurde antistof). Urine trekt door capillaire werking van links naar rechts: zuigstaaf → strook → zuigkussen
// achter het venster. Een roze/paarse waas (gekleurde antistof-goudkorrels) trekt over de strook; lijnen verschijnen
// pas als het vochtfront ze voorbij is. Lijnkleur roze-paars (colloïdaal goud). Bron: FDA 'Pregnancy tests';
// Koczula & Gallotta 2016 (Lateral flow assays). Bekende fouten: lijnen al zichtbaar vóór de urine er is;
// C-lijn vóór de T-lijn (C ligt verst van de urine); venster aan de duimkant.
// Ontwerpcoördinaten ± 640 × 120, oorsprong in het midden.
// =====================================================================================
function zwangerschapstest(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, urine = 0, T = 0, Cl = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const VX0 = -70, VX1 = 120, VH = 22, XT = 2, XC = 62, STR = 13;
  const ret = { tip: P(-320, 0), venster: [...P(VX0, -VH), ...P(VX1, VH)], T: P(XT, 0), C: P(XC, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const u = clamp(urine, 0, 1); // vochtfront: 0–0,35 zuigstaaf, 0,35–0,45 onder de behuizing, 0,45–1 door het venster
  const xf = u < 0.35 ? lerp(-326, -190, u / 0.35) : u < 0.45 ? lerp(-190, VX0, (u - 0.35) / 0.1) : lerp(VX0, VX1 + 30, (u - 0.45) / 0.55);
  const front = (yy) => xf + 3 * Math.sin(yy * 0.25 + t * 2.0) + 2 * Math.sin(yy * 0.6 - t * 1.3);
  const nat = (pathFn, y0, y1, col, al) => { if (u <= 0.001) return; ctx.save(); pathFn(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-340, y0); for (let yy = y0; yy <= y1; yy += 2) ctx.lineTo(front(yy), yy); ctx.lineTo(-340, y1); ctx.closePath(); ctx.fillStyle = rgba(col, al); ctx.fill(); ctx.restore(); };
  // zuigstaafje (steekt links uit)
  const wick = () => { ctx.beginPath(); roundRect(ctx, -320, -32, 130, 64, 14); };
  wick(); shape(ctx, '#E6E2EC', '#FFFFFF', 1.5);
  ctx.save(); wick(); ctx.clip(); ctx.strokeStyle = rgba('#B8B2C4', 0.45); ctx.lineWidth = 1.2; for (let k = 0; k < 7; k++) { const yy = -26 + k * 8.6; ctx.beginPath(); ctx.moveTo(-318, yy); ctx.bezierCurveTo(-280, yy + 2, -240, yy - 2, -190, yy + 1); ctx.stroke(); } ctx.restore();
  nat(wick, -34, 34, '#D8C25A', 0.38);
  // behuizing
  const HUIS = [[-212, -40], [-160, -50], [-60, -56], [120, -57], [250, -55], [300, -48], [318, -26], [320, 0], [318, 26], [300, 48], [250, 55], [120, 57], [-60, 56], [-160, 50], [-212, 40], [-222, 0]];
  ctx.beginPath(); bioPad(ctx, HUIS, true); shape(ctx, '#D9DFE7', '#F4F7FA', 2);
  ctx.beginPath(); bioPad(ctx, HUIS.map(([px, py]) => [px * 0.97 + 4, py * 0.8]), true); ctx.strokeStyle = rgba('#AEB8C6', 0.6); ctx.lineWidth = 1.5; ctx.stroke(); // naad
  // venster: verdiepte rand, witte strook, lijnen
  const venster = (r = 0) => { ctx.beginPath(); roundRect(ctx, VX0 - r, -VH - r, VX1 - VX0 + 2 * r, 2 * VH + 2 * r, VH + r); };
  venster(6); shape(ctx, '#C3CBD6', '#EEF2F6', 1.5);
  venster(); ctx.fillStyle = '#5E6878'; ctx.fill();
  const strook = () => { ctx.beginPath(); ctx.rect(VX0, -STR, VX1 - VX0, 2 * STR); };
  ctx.save(); venster(); ctx.clip(); strook(); ctx.fillStyle = '#F4F2EE'; ctx.fill();
  nat(strook, -STR, STR, '#C9C4BA', 0.35); // natte strook iets grijzer
  if (u > 0.001) { ctx.save(); strook(); ctx.clip(); const wb = 46; // roze waas vlak achter het front
    for (let yy = -STR; yy < STR; yy += 2) { const fx = front(yy); const fade = clamp((VX1 + 30 - xf) / 40, 0, 1); ctx.fillStyle = rgba('#D88AB4', 0.32 * fade); ctx.fillRect(fx - wb, yy, wb, 2); } ctx.restore(); }
  const lijn = (lx, k) => { const zicht = clamp((xf - lx - 4) / 22, 0, 1) * clamp(k, 0, 1); if (zicht <= 0.01) return; ctx.fillStyle = rgba('#B4407E', 0.92 * zicht); ctx.fillRect(lx - 3.5, -STR, 7, 2 * STR); };
  lijn(XT, T); lijn(XC, Cl);
  ctx.restore();
  venster(); ctx.strokeStyle = rgba('#3E4858', 0.7); ctx.lineWidth = 2; ctx.stroke();
  // duimgreep: ovale holte met ribbels
  ctx.beginPath(); ctx.ellipse(238, 0, 54, 34, 0, 0, 6.283); shape(ctx, '#CDD4DE', '#EEF2F6', 1.5);
  ctx.strokeStyle = rgba('#9EA9B8', 0.75); ctx.lineWidth = 2.4; for (let k = -3; k <= 3; k++) { const xx = 238 + k * 13; const hh = 30 * Math.sqrt(Math.max(0, 1 - Math.pow((xx - 238) / 54, 2))) - 5; ctx.beginPath(); ctx.moveTo(xx, -hh); ctx.quadraticCurveTo(xx + 3, 0, xx, hh); ctx.stroke(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: placenta in doorsnede, vlok vergroot
// =====================================================================================
// =====================================================================================
// obj_placenta.js — placenta (doorsnede) en één vlok vergroot, voor lib_bio.js (prompt v8, C9 Tekenrecepten)
// Vereist: lib_bio.js (BIO, bioDicht, bioPunt, bioPad) en de globale hulpjes C, rgba, lighten, hash, clamp, lerp,
// ease, shape, roundRect. Kleurtaal zuurstof: zuurstofrijk bloed rood (BIO.bloed), zuurstofarm FOETAAL bloed
// blauwpaars (PLAC.arm), zuurstofarm MOEDERLIJK bloed in de aders blauw (BIO.ader).
// =====================================================================================

const PLAC = {
  arm: '#7E5EA8',      // zuurstofarm foetaal bloed (navelstrengslagaders, chorionslagaders, begin haarvatlus)
  vlok: '#D7A596',     // vlokweefsel (bindweefselkern), lichtroze-beige
  syn: '#E8C27E',      // syncytiotrofoblast: goudgetinte buitenlaag
  synD: '#B8924E',
  chorion: '#CDB4BC',  // chorionplaat (bindweefsel)
  amnion: '#E9DDE4',
  streng: '#D8CDD6',   // navelstreng (gelei van Wharton)
  meer: '#C2453E',     // moederbloed in de intervilleuze ruimte (met lage dekking)
  lumen: '#3A1A22'
};
function _plMix(h1, h2, u) { // twee hex-kleuren mengen, vlakke kleur (geen verloop)
  const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(h1), B = p(h2); u = clamp(u, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], u))},${Math.round(lerp(A[1], B[1], u))},${Math.round(lerp(A[2], B[2], u))})`;
}
function _plCel(ctx, x, y, r, an, kant, col) { // rode bloedcel (ingedeukte schijf) met eigen kleur
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const ry = r * lerp(1, 0.34, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, col, lighten(col[0] === '#' ? col : '#C2453E', 0.25), Math.max(0.8, r * 0.09));
  ctx.beginPath(); ctx.ellipse(0, 0, r * (kant > 0.8 ? 0.3 : 0.45), ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#3A0E1E', 0.3); ctx.fill();
  ctx.restore();
}
function _plLijn(ctx, P, off, lw, col, g = 1) { // polylijn met zijwaartse verschuiving (off, in px) tot fractie g
  const n = Math.max(2, Math.ceil(P.length * clamp(g, 0, 1))); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; const an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const q = [P[i][0] - Math.sin(an) * off, P[i][1] + Math.cos(an) * off]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
  ctx.stroke();
}

// =====================================================================================
// PLACENTA, DOORSNEDE (stuk uit het midden, foetale kant boven, baarmoederwand onder).
// Recept (Sadler, Langman's Medical Embryology h. 8 'Placenta'; Junqueira h. 22; Benirschke 'Pathology of the
// Human Placenta'): voldragen placenta schijf van 15–25 cm doorsnede en 2–3 cm dik, 500–600 g. Lagen van boven
// naar onder: amnion (dun vlies) – chorionplaat (± 1 mm, met de chorionvaten) – intervilleuze ruimte met de
// vlokkenbomen (± 2 cm) – basale plaat / decidua basalis (± 1 mm) – spierlaag. Septa (placentasepta) steken
// vanuit de basale plaat omhoog maar bereiken de chorionplaat NIET; ze verdelen de placenta in 15–20 kwabben
// (cotyledonen). Per kwab één (of enkele) stamvlok uit de chorionplaat, die zich 3–4× vertakt (stamvlok ± 150 µm,
// intermediaire vlok ± 80 µm, eindvlokjes 40–80 µm, elk met een haarvatlus); enkele hechtvlokken lopen door tot
// in de basale plaat. De vlokkenboom vormt een klok met een vlokarm midden (centrale holte) recht boven de
// opening van een spiraalslagader. Ongeveer 80–100 spiraalslagaders (verbreed, trechtervormige monding) spuiten
// moederbloed omhoog tot tegen de chorionplaat; het zakt langs de vlokken terug en loopt via aderopeningen in de
// basale plaat (bij de septa) weg. Intervilleuze ruimte ± 150 ml, 2–3× per minuut ververst. Navelstreng: 2
// slagaders (zuurstofarm, van het kind naar de placenta) die spiraalsgewijs om 1 ader (zuurstofrijk, naar het
// kind) draaien, in gelei van Wharton; meestal iets uit het midden aangehecht. Moederbloed en kindbloed mengen
// niet: er ligt altijd vlokweefsel tussen.
// Hier: 5 kwabben van elk 260 breed in een stuk van 1300 × 560 (ontwerpcoördinaten, oorsprong = midden).
// Lagen verticaal ± 2,5× overdreven t.o.v. de breedte (anders is de vlokkenboom onleesbaar). Rode bloedcellen in
// het overzicht ± 2× te groot (r 3,5) zodat de stroom zichtbaar is; vlokdiktes onderling wel in verhouding.
// Bekende fouten: moederbloed dat in de vlokvaten stroomt (mengen); vlokken als losse vingers zonder boom;
// septa die tot de chorionplaat lopen; navelstrengslagaders rood getekend in een zuurstofverhaal (ze voeren
// zuurstofarm bloed); vlokken die nergens vastzitten (geen hechtvlokken); aders zonder afvoer; spiraalslagader
// als rechte buis zonder trechter.
// =====================================================================================
const _PL = { yAm: -188, yCh0: -184, yCh1: -150, yBas: 170, yMy: 232, yOnder: 280, kw: 260, nKw: 5 };
function _plBomen() {
  if (_bioPolyCache.placentaBomen) return _bioPolyCache.placentaBomen;
  const segs = [], toppen = [], stammen = [];
  const binnen = (x, y, cx) => [clamp(x, cx - 112, cx + 112), clamp(y, _PL.yCh1 + 14, _PL.yBas - 6)];
  const seg = (x0, y0, ang, len, w, d, sd, cx, extra = {}) => {
    const bend = (hash(sd * 3.1 + 7) - 0.5) * 0.5;
    let [x1, y1] = binnen(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len, cx);
    const mx = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * len * bend * 0.3, my = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * len * bend * 0.3;
    const P = []; for (let i = 0; i <= 10; i++) { const u = i / 10; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); }
    const s = Object.assign({ P, w, d, leaf: false, cx }, extra); segs.push(s); return s;
  };
  // zijtakken (intermediaire vlokken → eindvlokjes) aan een segment
  const takken = (s, sd, n, maxD) => {
    for (let k = 0; k < n; k++) { const f = 0.35 + 0.5 * (k + hash(sd + k * 5)) / n; const [px, py, an] = bioPunt(s.P, f);
      const kant = (k + Math.floor(hash(sd * 2 + 1) * 2)) % 2 ? 1 : -1; const ang = an + kant * (0.7 + 0.5 * hash(sd + k * 11));
      const d = s.d + 1; const len = (d === 2 ? 52 : 30) * (0.8 + 0.4 * hash(sd + k * 13)); const w = Math.max(7, s.w * 0.64);
      const c = seg(px, py, ang, len, w, d, sd * 7 + k, s.cx, { pw: s.w });
      if (d < maxD) takken(c, sd * 7 + k + 3, 2, maxD); else { c.leaf = true; const e = c.P[10]; toppen.push([e[0], e[1], w * 0.85]); } }
  };
  for (let k = 0; k < _PL.nKw; k++) {
    const cx = (k - (_PL.nKw - 1) / 2) * _PL.kw; const sx = cx + (hash(k * 9 + 1) - 0.5) * 30, sd = 100 + k * 37;
    // stamvlok uit de chorionplaat naar beneden, splitst in twee armen (klokvorm rond de centrale holte)
    const stam = seg(sx, _PL.yCh1 - 4, Math.PI / 2 + (hash(sd) - 0.5) * 0.15, 92, 24, 0, sd, cx); stammen.push([sx, cx]);
    takken(stam, sd + 1, 2, 3);
    for (const z of [-1, 1]) {
      const e = stam.P[10]; const arm = seg(e[0], e[1], Math.PI / 2 - z * 0.62, 118, 17, 1, sd + z * 5, cx, { pw: 10 });
      takken(arm, sd + z * 13, 3, 3);
      // hechtvlok: loopt door tot in de basale plaat (verankering)
      const a2 = arm.P[10]; const tx = cx + z * (88 + 14 * hash(sd + z)); const hecht = seg(a2[0], a2[1], Math.atan2(_PL.yBas + 8 - a2[1], tx - a2[0]), Math.hypot(_PL.yBas + 8 - a2[1], tx - a2[0]), 13, 2, sd + z * 17, cx, { anker: true, pw: 10 });
      hecht.P[10] = [tx, _PL.yBas + 8];
      takken(hecht, sd + z * 19, 2, 3);
    }
  }
  segs.sort((A, B) => A.d - B.d);
  return (_bioPolyCache.placentaBomen = { segs, toppen, stammen });
}

function placentaDoorsnede(ctx, x, y, w = 1300, h = 560, o = {}) {
  const { a = 1, t = 0, vlokken = 1, moederbloed = 1, navel = 1, focus = -1, kind = null, kleurO2 = true } = o;
  const S = w / 1300, Sy = h / 560, P = (lx, ly) => [x + lx * S, y + ly * Sy];
  const B = _plBomen(); const midTop = B.toppen.reduce((best, p) => (Math.hypot(p[0] - 40, p[1] + 10) < Math.hypot(best[0] - 40, best[1] + 10) ? p : best), B.toppen[0]);
  const NAV = [-70, _PL.yAm];
  const ret = { navel: P(NAV[0], NAV[1]), vlokTop: P(midTop[0], midTop[1]), moederbloed: P(-30, 60), slagader: P(0, _PL.yBas), wand: P(0, (_PL.yBas + _PL.yOnder) / 2),
    toppen: B.toppen.map(p => P(p[0], p[1])) };
  if (a <= 0.01) return ret;
  const ARM = kleurO2 ? PLAC.arm : BIO.bloed, RIJK = kleurO2 ? BIO.bloed : BIO.ader; // kleurO2 false = anatomisch (slagader rood, ader blauw), zoals castNavelstreng // navelstreng: slagaders ARM, ader RIJK
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -650, R = 650; const kws = Array.from({ length: _PL.nKw }, (_, k) => (k - (_PL.nKw - 1) / 2) * _PL.kw);

  // ---- 1. intervilleuze ruimte (leeg = donker) en moederbloed dat van onder vult --------------------
  ctx.fillStyle = rgba('#0F1724', 0.55); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
  const mb = clamp(moederbloed, 0, 1), peil = lerp(_PL.yBas, _PL.yCh1, ease(mb));
  ctx.save(); ctx.beginPath(); ctx.rect(L, peil, R - L, _PL.yBas - peil); ctx.clip();
  if (mb > 0.01) {
    ctx.fillStyle = rgba(PLAC.meer, 0.3); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
    // straal: vlakke, iets lichtere fontein boven elke slagadermonding (zelfde vorm als de stroombanen)
    kws.forEach(cx => { ctx.beginPath(); ctx.moveTo(cx - 12, _PL.yBas); ctx.bezierCurveTo(cx - 10, 40, cx - 30, -100, cx - 90, -138); ctx.lineTo(cx + 90, -138); ctx.bezierCurveTo(cx + 30, -100, cx + 10, 40, cx + 12, _PL.yBas); ctx.closePath(); ctx.fillStyle = rgba('#E07A6A', 0.16 * mb); ctx.fill(); });
    // stroom per kwab: straal omhoog uit de spiraalslagader, langs de chorionplaat opzij, langs de vlokken terug naar de aderopening
    kws.forEach((cx, k) => { for (const z of [-1, 1]) {
      const pad = bioDicht([[cx, _PL.yBas + 2], [cx + z * 4, 40], [cx + z * 12, -80], [cx + z * 55, -132], [cx + z * 112, -110], [cx + z * 120, 0], [cx + z * 116, 100], [cx + z * 108, _PL.yBas + 2]], 12);
      const n = Math.round(14 * mb); for (let i = 0; i < n; i++) { const sd = k * 97 + (z + 1) * 31 + i * 3.7;
        const u0 = ((t * 0.07 * (0.8 + 0.4 * hash(sd)) + hash(sd + 1)) % 1 + 1) % 1; const u = 1 - Math.pow(1 - u0, 1.8); // snel uit de monding, daarna trager
        const [px, py, an] = bioPunt(pad, u); const sp = (hash(sd + 2) - 0.5) * lerp(6, 46, Math.min(1, u * 3));
        _plCel(ctx, px - Math.sin(an) * sp, py + Math.cos(an) * sp, 3.5, an + t * (0.5 + hash(sd + 3)), 0.5 + 0.5 * Math.sin(t * 1.5 + i), BIO.bloed); } } });
    // rustig drijvende cellen in de meren
    for (let i = 0; i < Math.round(60 * mb); i++) { const bx = L + 10 + hash(i * 5.3 + 2) * (R - L - 20), by = _PL.yCh1 + 14 + hash(i * 5.3 + 3) * (_PL.yBas - _PL.yCh1 - 28);
      _plCel(ctx, bx + Math.sin(t * 0.4 + i) * 6, by + ((t * 4 * (0.5 + hash(i + 9))) % 20) - 10, 3.5, i + t * 0.3, 0.5 + 0.5 * Math.sin(t + i * 2), BIO.bloed); }
  }
  ctx.restore();

  // ---- 2. basale plaat (decidua basalis) met septa, en spierlaag ----------------------------------
  // spierlaag (context, halve detailmaat)
  ctx.fillStyle = rgba(BIO.spier, 0.5); ctx.fillRect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy);
  ctx.save(); ctx.beginPath(); ctx.rect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.4); ctx.lineWidth = 1.5;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) { ctx.beginPath(); ctx.ellipse(L + (c + (r % 2) * 0.5) * 62, _PL.yMy + 10 + r * 15, 26, 3, 0.05 * Math.sin(c * 3 + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // decidua basalis + septa (wiggen omhoog tot ± 2/3 van de hoogte, niet tot de chorionplaat)
  const basPad = () => { ctx.beginPath(); ctx.moveTo(L, _PL.yMy); ctx.lineTo(L, _PL.yBas);
    for (let k = 0; k < _PL.nKw - 1; k++) { const sx = (kws[k] + kws[k + 1]) / 2, top = -10 - 30 * hash(k * 3 + 5);
      ctx.lineTo(sx - 34, _PL.yBas); ctx.bezierCurveTo(sx - 16, _PL.yBas - 30, sx - 16, top + 30, sx - 9, top + 6); ctx.quadraticCurveTo(sx, top - 8, sx + 9, top + 6); ctx.bezierCurveTo(sx + 16, top + 30, sx + 16, _PL.yBas - 30, sx + 34, _PL.yBas); }
    ctx.lineTo(R, _PL.yBas); ctx.lineTo(R, _PL.yMy); ctx.closePath(); };
  basPad(); shape(ctx, _plMix('#1A2740', BIO.slijm, 0.72), null);
  // deciduacellen (grote bleke cellen), rustig
  ctx.save(); basPad(); ctx.clip(); ctx.strokeStyle = rgba('#F6E2D6', 0.22); ctx.lineWidth = 1.2;
  for (let i = 0; i < 70; i++) { const cx2 = L + hash(i * 3.3) * (R - L), cy2 = _PL.yBas + 6 + hash(i * 3.3 + 1) * (_PL.yMy - _PL.yBas - 10); ctx.beginPath(); ctx.ellipse(cx2, cy2, 9, 6, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // bovenrand basale plaat lichter
  ctx.save(); basPad(); ctx.clip(); basPad(); ctx.strokeStyle = rgba('#F6E2D6', 0.7); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();

  // moederlijke aders: twee openingen aan weerszijden van elk septum (en aan de randen), die onder het septum samenkomen
  // en schuin door de spierlaag weglopen (blauw, zuurstofarm moederbloed). Dunner dan de spiraalslagaders.
  const septX = [L - 0, ...kws.slice(0, -1).map((c, k) => (c + kws[k + 1]) / 2), R];
  septX.forEach((sx, k) => { const opn = [sx - 40, sx + 40].filter(ox => ox > L + 6 && ox < R - 6); const vx = clamp(sx, L + 14, R - 14), vy = _PL.yMy - 6;
    opn.forEach(ox => { ctx.beginPath(); bioPad(ctx, [[ox, _PL.yBas - 1], [lerp(ox, vx, 0.35), _PL.yBas + 26], [vx, vy]], false); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 7; ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(vx, vy); ctx.quadraticCurveTo(vx + 4, _PL.yMy + 24, vx + 14, _PL.yOnder + 4); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 12; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 9; ctx.stroke();
    opn.forEach(ox => { ctx.beginPath(); ctx.ellipse(ox, _PL.yBas, 7, 2.5, 0, 0, 6.283); ctx.fillStyle = rgba(PLAC.lumen, 0.9); ctx.fill(); }); });
  // spiraalslagaders: kronkelend omhoog door spierlaag en decidua, trechtervormige monding midden onder elke kwab
  kws.forEach((cx, k) => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(_PL.yOnder + 4, _PL.yBas + 4, u); pts.push([cx + Math.sin(u * 6.283 * 2.2 + k) * 11 * (1 - u * 0.8), yy]); }
    for (const [lw, col] of [[12, lighten(BIO.bloed, 0.3)], [9, BIO.bloed]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(cx - 6, _PL.yBas + 18); ctx.quadraticCurveTo(cx - 7, _PL.yBas + 4, cx - 15, _PL.yBas - 1); ctx.lineTo(cx + 15, _PL.yBas - 1); ctx.quadraticCurveTo(cx + 7, _PL.yBas + 4, cx + 6, _PL.yBas + 18); ctx.closePath();
    shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.3), 1.5);
    // bloed in de slagader stroomt omhoog (alleen als moederbloed aan staat)
    if (mb > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4 + k * 0.13) % 1); const [px, py] = bioPunt(pts, u); ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.fillStyle = rgba('#F2C0B4', 0.75 * mb); ctx.fill(); } });

  // ---- 3. vlokkenbomen (groeien uit de chorionplaat) ------------------------------------------------
  const vk = clamp(vlokken, 0, 1); const gD = d => clamp(vk * 4.2 - d, 0, 1);
  const zicht = B.segs.filter(s => gD(s.d) > 0.01);
  const deel = (s) => { const g = gD(s.d); const n = Math.max(2, Math.round(s.P.length * g)); const Q = s.P.slice(0, n); if (g < 1) { const [px, py] = bioPunt(s.P, g); Q[Q.length - 1] = [px, py]; } return Q; };
  const streep = (Q, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
  // rand (goudgetinte syncytiotrofoblast) en dan het weefsel
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w + 3.5, PLAC.syn); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85 + 1.75, 0, 6.283); ctx.fillStyle = PLAC.syn; ctx.fill(); }
    if (s.anker && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.moveTo(e[0] - 18, _PL.yBas + 2); ctx.quadraticCurveTo(e[0] - 6, e[1] - 16, e[0], e[1] - 22); ctx.quadraticCurveTo(e[0] + 6, e[1] - 16, e[0] + 18, _PL.yBas + 2); ctx.closePath(); shape(ctx, PLAC.vlok, PLAC.syn, 1.75); } });
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w, PLAC.vlok); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85, 0, 6.283); ctx.fillStyle = PLAC.vlok; ctx.fill(); } });
  // foetale vaten in de vlokken: slagader (zuurstofarm) en ader (zuurstofrijk) naast elkaar, eindvlokjes met een haarvatlus
  zicht.forEach(s => { let Q = deel(s); const lw = Math.max(1.4, s.w * 0.17); const pw = (s.pw || 0) * 0.5; if (pw) { const q0 = Q[0]; const k0 = Q.findIndex(p => Math.hypot(p[0] - q0[0], p[1] - q0[1]) >= pw); Q = k0 > 0 ? Q.slice(k0 - 1) : Q.slice(-2); } // vaten van een zijtak beginnen aan de rand van de moedertak
    if (Q.length < 2) return; _plLijn(ctx, Q, -s.w * 0.2, lw, ARM); _plLijn(ctx, Q, s.w * 0.2, lw, RIJK);
    if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1], q = Q[Q.length - 2]; const an = Math.atan2(e[1] - q[1], e[0] - q[0]); const rr = s.w * 0.42;
      ctx.lineWidth = lw; ctx.strokeStyle = ARM; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an + Math.PI / 2, an + Math.PI * 1.5, true); ctx.stroke();
      ctx.strokeStyle = RIJK; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an - Math.PI / 2, an + Math.PI / 2, false); ctx.stroke(); } });
  if (focus >= 0 && focus < B.toppen.length && vk > 0.95) { const [fx, fy, fr] = B.toppen[focus]; ctx.beginPath(); ctx.arc(fx, fy, fr + 7, 0, 6.283); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3 / S; ctx.stroke(); }

  // ---- 4. chorionplaat met amnion en chorionvaten ---------------------------------------------------
  ctx.fillStyle = PLAC.chorion; ctx.fillRect(L, _PL.yCh0, R - L, _PL.yCh1 - _PL.yCh0);
  ctx.strokeStyle = lighten(PLAC.chorion, 0.3); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(L, _PL.yCh1); ctx.lineTo(R, _PL.yCh1); ctx.stroke();
  ctx.fillStyle = PLAC.amnion; ctx.fillRect(L, _PL.yAm, R - L, 5);
  // chorionvaten: vanaf de navelstrengaanhechting naar links en rechts, dunner naar buiten, met een tak omlaag in elke stamvlok
  const vatW = dx => Math.max(2.5, 9 - Math.abs(dx) / 85);
  for (const [vy, col] of [[-176, ARM], [-160, RIJK]]) {
    for (const z of [-1, 1]) { const xEnd = z < 0 ? L : R; const n = 30;
      for (let i = 0; i < n; i++) { const xa = lerp(NAV[0], xEnd, i / n), xb = lerp(NAV[0], xEnd, (i + 1) / n); ctx.strokeStyle = col; ctx.lineWidth = vatW(xa - NAV[0]); ctx.beginPath(); ctx.moveTo(xa, vy + Math.sin(xa / 70) * 2); ctx.lineTo(xb, vy + Math.sin(xb / 70) * 2); ctx.stroke(); } }
    if (vk > 0.01) B.stammen.forEach(([sx]) => { ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, vatW(sx - NAV[0]) * 0.8); const off = col === ARM ? -5 : 5; ctx.beginPath(); ctx.moveTo(sx + off * 2.2, vy + Math.sin(sx / 70) * 2); ctx.quadraticCurveTo(sx + off, vy + 8, sx + off * 0.95, _PL.yCh1 + 2); ctx.stroke(); });
  }

  // ---- 5. navelstreng: van de aanhechting naar boven (kind buiten beeld) of naar o.kind --------------
  // Navelstreng ± 1,5–2 cm dik (hier 34 = op de schaal van de lagen), 2 slagaders draaien spiraalsgewijs om 1 ader.
  const nv = clamp(navel, 0, 1);
  if (nv > 0.01) { const eind = kind ? [(kind[0] - x) / S, (kind[1] - y) / Sy] : [NAV[0] - 120, -420]; const sw = 34;
    const ex = lerp(NAV[0], eind[0], nv), ey = lerp(NAV[1] - 20, eind[1], nv);
    ctx.save(); ctx.globalAlpha *= clamp(nv * 4, 0, 1);
    // aanhechting: verbreed voetje op het amnion
    ctx.beginPath(); ctx.moveTo(NAV[0] - 42, _PL.yAm + 1); ctx.bezierCurveTo(NAV[0] - 22, _PL.yAm - 2, NAV[0] - 17, _PL.yAm - 10, NAV[0] - 17, _PL.yAm - 26); ctx.lineTo(NAV[0] + 17, _PL.yAm - 26); ctx.bezierCurveTo(NAV[0] + 17, _PL.yAm - 10, NAV[0] + 22, _PL.yAm - 2, NAV[0] + 42, _PL.yAm + 1); ctx.closePath(); shape(ctx, PLAC.streng, null);
    if (!kleurO2) { castNavelstreng(ctx, NAV[0], NAV[1] - 20, ex, ey, t, 1, sw); }
    else { const d = Math.hypot(ex - NAV[0], ey - NAV[1] + 20) || 1, nx = -(ey - NAV[1] + 20) / d, ny = (ex - NAV[0]) / d; const N = 60;
      const pts = []; for (let i = 0; i <= N; i++) { const u = i / N, wv = Math.sin(u * 5 + t * 0.8) * 14 * Math.sin(u * Math.PI); pts.push([lerp(NAV[0], ex, u) + nx * wv, lerp(NAV[1] - 20, ey, u) + ny * wv]); }
      pts.unshift([NAV[0], NAV[1] - 2]);
      streep(pts, sw + 3, lighten(PLAC.streng, 0.35)); streep(pts, sw, PLAC.streng);
      const draai = d / 70; // ± één winding per 70 px
      const spiraal = (ph, voor) => { ctx.strokeStyle = ARM; ctx.lineWidth = sw * 0.2;
        for (let i = 1; i < pts.length - 1; i++) { const u = i / (pts.length - 1), u2 = (i + 1) / (pts.length - 1); const c1 = Math.cos(u * draai * 6.283 + ph); if ((c1 >= 0) !== voor) continue;
          const p = pts[i], q = pts[i + 1]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const o1 = Math.sin(u * draai * 6.283 + ph) * sw * 0.3, o2 = Math.sin(u2 * draai * 6.283 + ph) * sw * 0.3;
          ctx.beginPath(); ctx.moveTo(p[0] - Math.sin(an) * o1, p[1] + Math.cos(an) * o1); ctx.lineTo(q[0] - Math.sin(an) * o2, q[1] + Math.cos(an) * o2); ctx.stroke(); } };
      ctx.save(); ctx.globalAlpha *= 0.55; spiraal(0, false); spiraal(Math.PI, false); ctx.restore();
      _plLijn(ctx, pts, 0, sw * 0.3, RIJK);
      spiraal(0, true); spiraal(Math.PI, true); }
    ctx.restore();
  }
  ctx.restore(); return ret;
}

// =====================================================================================
// EÉN VLOK VERGROOT (eindvlokje, voldragen placenta), moederbloed links, vlok rechts met het oppervlak naar links.
// Recept (Junqueira h. 22; Sadler h. 8; Benirschke h. 7 'Terminal villi'): eindvlokje 40–80 µm dik. Van buiten
// naar binnen: microvilli (borstelzoom, ± 1 µm lang) – syncytiotrofoblast: één doorlopende laag zonder celgrenzen
// met veel kernen, 2–10 µm dik; boven een haarvat dunner (± 1–2 µm) en daar zonder kernen (vasculosyncytiale
// membraan), de kernen liggen in groepjes elders (syncytiële knopen) – enkele cytotrofoblastcellen (bij voldragen
// placenta schaars) – basaalmembraan – bindweefselkern (stroma) met fibroblasten – foetaal haarvat (sinusoïdaal
// verwijd, 10–30 µm) met dun endotheel (± 0,5 µm) dat tegen de trofoblast aandrukt. Totale barrière moederbloed →
// kindbloed aan het eind van de zwangerschap ± 2–4 µm (vroeg 20–30 µm). Rode bloedcel 7,5 µm.
// Hier: schaal ± 3 px/µm (rode bloedcel r 11 = 7,5 µm); barrière over het haarvat 9 + 3 + 3 = 15 px (± 5 µm,
// iets ruimer dan 2–4 µm zodat de lagen zichtbaar blijven), dus dunner dan één rode bloedcel. Haarvatlumen 44 px
// (± 15 µm). Foetaal bloed komt blauwpaars binnen (boven) en verlaat de lus rood (onder).
// Bekende fouten: dikke barrière (dikker dan een bloedcel); losse trofoblastcellen met celgrenzen aan de buitenkant
// (het syncytium is één laag); haarvat midden in de vlok in plaats van vlak onder het oppervlak; moeder- en
// kindbloed die elkaar raken; kernen in het dunne deel boven het haarvat.
// =====================================================================================
function vlokVergroot(ctx, x, y, w = 900, h = 520, o = {}) {
  const { a = 1, t = 0, laag = 0 } = o;
  const S = w / 900, Sy = h / 520;
  const X0 = -160, HV = 212, SYN_D = 9, SYN_K = 22, GAP = 3, ENDO = 3, LUM = 22;
  const opp = yy => X0 + 150 * Math.pow(Math.min(1, Math.abs(yy) / HV), 6);        // buitenoppervlak (ontwerpcoörd.)
  const dik = yy => lerp(SYN_D, SYN_K, clamp((Math.abs(yy) - 120) / 50, 0, 1));     // syncytium dun boven het haarvat
  const kapC = yy => opp(yy) + dik(yy) + GAP + ENDO + LUM;                          // haarvat-middellijn
  const ret = { barriereX: yy => x + (opp((yy - y) / Sy) + (SYN_D + GAP + ENDO) / 2) * S, moederX: x + (X0 - 170) * S, kindX: yy => x + kapC((yy - y) / Sy) * S,
    y0: y - 115 * Sy, y1: y + 115 * Sy };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -450, R = 450, T = -260, Bn = 260;
  ctx.save(); roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.clip();
  // moederbloed (vult alles buiten de vlok)
  ctx.fillStyle = _plMix('#1A2740', PLAC.meer, 0.34); ctx.fillRect(L, T, R - L, Bn - T);
  // vlokomtrek
  const omtrek = (inset) => { const pts = []; for (let i = 0; i <= 60; i++) { const yy = lerp(-HV + inset, HV - inset, i / 60); pts.push([opp(yy) + inset, yy]); } return pts; };
  const vlokPad = (inset) => { const O = omtrek(inset); ctx.beginPath(); ctx.moveTo(R + 10, -HV + inset); O.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(R + 10, HV - inset); ctx.closePath(); };
  // moederlijke rode bloedcellen: drijven langzaam langs het oppervlak omlaag (achter de microvilli, vóór de vlok niet)
  for (let i = 0; i < 26; i++) { const sp = 14 + 10 * hash(i * 3 + 1); const yy = ((hash(i * 3 + 2) * 620 + t * sp) % 620) - 310;
    let xx = L + 20 + hash(i * 3 + 3) * 300 + Math.sin(t * 0.5 + i) * 8; if (Math.abs(yy) < HV + 14) xx = Math.min(xx, opp(yy) - 26); else xx = L + 20 + hash(i * 3 + 3) * 840;
    _plCel(ctx, xx, yy, 11, i * 1.3 + t * 0.25 * (hash(i) - 0.5), 0.5 + 0.5 * Math.sin(t * 0.8 + i * 1.9), BIO.bloed); }
  // microvilli (borstelzoom, ± 1 µm) langs het hele oppervlak naar het moederbloed
  { const O = omtrek(0); const full = [[R + 10, -HV], ...O.slice().reverse().map(p => [p[0], -p[1]]).reverse(), [R + 10, HV]]; // linkerkant
    const top = []; for (let xx = R; xx > opp(-HV + 1); xx -= 7) top.push([xx, -HV, 0, -1]); const bot = []; for (let xx = opp(HV - 1); xx < R; xx += 7) bot.push([xx, HV, 0, 1]);
    const zij = []; const D = bioDicht(O, 6); let acc = 0; for (let i = 1; i < D.length; i++) { acc += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); if (acc < 4.5) continue; acc = 0; const dx = D[i][0] - D[i - 1][0], dy = D[i][1] - D[i - 1][1], nn = Math.hypot(dx, dy) || 1; zij.push([D[i][0], D[i][1], -dy / nn, dx / nn]); }
    ctx.strokeStyle = rgba(PLAC.syn, 0.85); ctx.lineWidth = 2; [...top, ...zij, ...bot].forEach((m, i) => { const lm = 6 + 2 * hash(i); ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.lineTo(m[0] + m[2] * lm, m[1] + m[3] * lm); ctx.stroke(); }); }
  // syncytiotrofoblast (goudgetint, doorlopend)
  vlokPad(0); shape(ctx, PLAC.syn, lighten(PLAC.syn, 0.35), 2);
  // bindweefselkern (stroma)
  const binnenPad = () => { ctx.beginPath(); ctx.moveTo(R + 10, -HV + SYN_K); for (let i = 0; i <= 80; i++) { const yy = lerp(-HV + SYN_K, HV - SYN_K, i / 80); ctx.lineTo(opp(yy) + dik(yy) + (Math.abs(yy) > HV - 40 ? (Math.abs(yy) - HV + 40) * 0.0 : 0), yy); } ctx.lineTo(R + 10, HV - SYN_K); ctx.closePath(); };
  binnenPad(); shape(ctx, _plMix('#1A2740', PLAC.vlok, 0.62), rgba('#F2E6DA', 0.5), 1.5); // lichte lijn = basaalmembraan
  // kernen van het syncytium: alleen in het dikke deel, in groepjes (syncytiële knopen)
  const kernen = [[-198, 4], [-184, 2], [-172, 3], [-150, 1], [150, 2], [168, 4], [190, 3], [-130, 1], [132, 1]];
  kernen.forEach(([yy0, n], g) => { for (let k = 0; k < n; k++) { const yy = yy0 + (k - (n - 1) / 2) * 11 * Math.sign(yy0); const xx = opp(yy) + dik(yy) * 0.5;
    ctx.beginPath(); ctx.ellipse(xx, yy, 6.5, 4, Math.atan2(1, (opp(yy + 1) - opp(yy - 1)) / 2) , 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); } });
  // twee cytotrofoblastcellen onder het syncytium (schaars bij voldragen placenta)
  for (const yy of [-150, 148]) { const xx = opp(yy) + dik(yy) + 9; ctx.beginPath(); ctx.ellipse(xx, yy, 9, 14, 0.15 * Math.sign(yy), 0, 6.283); shape(ctx, _plMix('#1A2740', PLAC.syn, 0.6), rgba(PLAC.syn, 0.8), 1.2);
    ctx.beginPath(); ctx.arc(xx + 1, yy, 4.5, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // fibroblasten in de kern (langgerekte kernen), rustig
  ctx.save(); binnenPad(); ctx.clip();
  [[110, -60, 0.4], [250, 20, -0.3], [330, -120, 0.2], [180, 100, -0.5], [390, 90, 0.6], [60, -10, 1.2], [300, 190, 0.1], [240, -190, -0.2]].forEach(([fx, fy, fa]) => {
    ctx.beginPath(); ctx.ellipse(fx, fy, 16, 4.5, fa, 0, 6.283); shape(ctx, rgba((C.nucFill || '#6E5A9E'), 0.75), rgba((C.nucEdge || '#A392D6'), 0.6), 1);
    ctx.strokeStyle = rgba('#F2E6DA', 0.25); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx - Math.cos(fa) * 34, fy - Math.sin(fa) * 34); ctx.lineTo(fx + Math.cos(fa) * 34, fy + Math.sin(fa) * 34); ctx.stroke(); });
  // foetale haarvatlus: binnen rechtsboven, langs het oppervlak omlaag, rechtsonder weer weg
  const rv = [[R + 20, -148], [120, -150], [-40, -152], [kapC(-110) + 22, -128]]; for (let yy = -100; yy <= 100; yy += 25) rv.push([kapC(yy), yy]); rv.push([kapC(110) + 22, 128], [-40, 152], [120, 150], [R + 20, 148]);
  const K = bioDicht(rv, 14);
  const pad = () => { ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  pad(); ctx.strokeStyle = rgba('#F2D8D0', 0.9); ctx.lineWidth = 2 * (LUM + ENDO); ctx.stroke();      // endotheel (dunne wand)
  pad(); ctx.strokeStyle = PLAC.lumen; ctx.lineWidth = 2 * LUM; ctx.stroke();                         // lumen
  // lumen getint naar zuurstofgehalte: blauwpaars binnen, rood bij het verlaten (vlakke stukken, kleurwissel halverwege de barrière)
  const kN = K.length - 1, stuk = (u0, u1, col) => { ctx.beginPath(); for (let i = Math.round(u0 * kN); i <= Math.round(u1 * kN); i++) i === Math.round(u0 * kN) ? ctx.moveTo(K[i][0], K[i][1]) : ctx.lineTo(K[i][0], K[i][1]); ctx.strokeStyle = col; ctx.lineWidth = 2 * LUM; ctx.lineCap = 'butt'; ctx.stroke(); ctx.lineCap = 'round'; };
  stuk(0, 0.42, _plMix(PLAC.lumen, PLAC.arm, 0.4)); stuk(0.42, 0.58, _plMix(PLAC.lumen, '#A0517A', 0.4)); stuk(0.58, 1, _plMix(PLAC.lumen, BIO.bloed, 0.4));
  // endotheelkernen (afgeplat) in het diepe deel
  for (const [u, sd] of [[0.12, 1], [0.88, -1]]) { const [ex, ey, an] = bioPunt(K, u); ctx.beginPath(); ctx.ellipse(ex - Math.sin(an) * (LUM + 1) * sd, ey + Math.cos(an) * (LUM + 1) * sd, 9, 3, an, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // foetale rode bloedcellen in de lus, kleur paars → rood terwijl ze langs de barrière gaan
  for (let i = 0; i < 16; i++) { const u = ((t * 0.045 * (0.85 + 0.3 * hash(i + 40)) + i / 16) % 1 + 1) % 1; const [px, py, an] = bioPunt(K, u); const off = (hash(i + 41) - 0.5) * LUM * 0.7;
    const m = clamp((u - 0.32) / 0.4, 0, 1); _plCel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, 11, an + Math.PI / 2 + 0.5 * Math.sin(t + i), 0.55 + 0.4 * Math.sin(t * 0.9 + i), _plMix(PLAC.arm, BIO.bloed, m)); }
  ctx.restore();
  // dunne barrière markeren (goud): van het oppervlak tot het haarvatlumen, over het rechte stuk
  if (laag > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(laag, 0, 1); const ys = [], n = 50; for (let i = 0; i <= n; i++) ys.push(lerp(-118, 118, i / n));
    ctx.beginPath(); ys.forEach((yy, i) => i ? ctx.lineTo(opp(yy) - 2, yy) : ctx.moveTo(opp(yy) - 2, yy)); for (let i = n; i >= 0; i--) ctx.lineTo(kapC(ys[i]) - LUM + 1, ys[i]); ctx.closePath();
    ctx.fillStyle = rgba(C.goldL || '#F0D58A', 0.75); ctx.fill(); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke();
    for (const yy of [-118, 118]) { ctx.beginPath(); ctx.moveTo(opp(yy) - 14, yy); ctx.lineTo(kapC(yy) - LUM + 12, yy); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: hersenen vooraanzicht, vrouwelijke organen (ook zwanger), geel lichaam
// =====================================================================================
// =====================================================================================
// obj_vrouw_brein.js — nieuwe objecten voor lib_bio.js (22 okt 2026): hersenen vooraanzicht + kijkje in het hoofd,
// vrouwelijke geslachtsorganen vooraanzicht (ook zwanger) + kijkje in de buik, geel lichaam (corpus luteum).
// Zelfde regels als lib_bio.js: vlakke vullingen met iets lichtere rand, geen tekst, deterministisch (hash),
// animatie via t, ankerpunten terug in schermcoördinaten.
// =====================================================================================

function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbTab(tab, u) { if (u <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) { const [u0, v0] = tab[i - 1], [u1, v1] = tab[i]; return lerp(v0, v1, (u - u0) / (u1 - u0)); } return tab[tab.length - 1][1]; }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function _vbVenster(ctx, x, y, rx, ry, a = 0.72) { // zacht donker venster: gestapelde vlakke ellipsen (geen verloop)
  const n = 7; for (let i = 0; i < n; i++) { const f = 1 + (n - 1 - i) * 0.035; ctx.beginPath(); ctx.ellipse(x, y, rx * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a / n * 1.6); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a * 0.55); ctx.fill();
}

// =====================================================================================
// HERSENEN VOORAANZICHT (zoals ze in een hoofd van voren liggen; 'röntgenblik' op de middellijn).
// Recept (1 cm ≈ 8,6 px bij s = 1): breedte ± 14 cm → 120 px; kruin tot hypothalamus ± 8 cm → 68 px;
// hypothalamus → hypofyse ± 1,2 cm (steeltje); hypofyse ± 1,2 × 0,8 cm (erwt, iets vergroot getekend: 12 × 9 px);
// twee hersenhelften met diepe lengtegroeve (fissura longitudinalis) tot de hersenbalk; voorhoofdskwabben rusten
// op de oogkasdaken (onderrand ± 0,7 cm boven de hypothalamus); slaapkwabben hangen lager aan de zijkant (onderrand
// ± 2 cm onder de hypothalamus, in de middelste schedelgroeve), gescheiden door de Sylvius-groeve; hypothalamus
// tussen de slaapkwabben, onder/achter de voorhoofdskwabben; hersenstam (brug ± 2,5 cm breed, verlengde merg
// ± 1,5 cm) loopt in het midden omlaag; kleine hersenen gluren naast het verlengde merg onder de slaapkwabben.
// Bron: Gray's Anatomy fig. 'brain, anterior view' / coronaal; Sobotta deel 3. Bekende fouten: hypofyse los onder
// het hele brein of in de keel; slaapkwabben even hoog als de voorhoofdskwabben; brein als twee ovalen zonder
// hersenstam. Ontwerpcoördinaten: oorsprong = hypothalamus; o.rek rekt verticaal (stripfiguren hebben een hoger hoofd).
// =====================================================================================
function breinVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, rek = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s * rek];
  const uit = { hth: P(0, 0), hyp: P(0, 12) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * rek); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s; // lijndikte in schermpixels
  // kleine hersenen (achter, naast het verlengde merg)
  for (const d of [-1, 1]) { ctx.beginPath(); bioPad(ctx, [[d * 8, 22], [d * 22, 16], [d * 44, 22], [d * 48, 32], [d * 36, 41], [d * 16, 40], [d * 7, 32]], true); shape(ctx, _vbMix(BIO.brein, '#1A2740', 0.35), _vbMix(BIO.breinS, '#1A2740', 0.2), L(1.3));
    ctx.strokeStyle = rgba(BIO.breinD, 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(d * 12, 25 + k * 5); ctx.quadraticCurveTo(d * 30, 22 + k * 6, d * 44, 27 + k * 4); ctx.stroke(); } }
  // hersenstam: middenhersenen → brug (breder) → verlengde merg → ruggenmerg
  const STAM = [[-8, -2], [-11, 6], [-12, 14], [-10, 22], [-7, 30], [-6, 40], [-5, 52], [5, 52], [6, 40], [7, 30], [10, 22], [12, 14], [11, 6], [8, -2]];
  ctx.beginPath(); bioPad(ctx, STAM, true); shape(ctx, _vbMix(BIO.breinS, '#1A2740', 0.1), BIO.breinS, L(1.3));
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = L(1); ctx.beginPath(); ctx.moveTo(-10, 21); ctx.quadraticCurveTo(0, 24, 10, 21); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 23); ctx.lineTo(0, 50); ctx.stroke();
  // grote hersenen: rechter helft (x > 0) ontworpen, links gespiegeld
  const HELFT = [[1.5, -67], [18, -68], [36, -62], [50, -50], [58, -33], [60, -14], [58, 2], [52, 13], [43, 19], [34, 17], [29, 9], [30, 1], [37, -5], [28, -8], [15, -8], [5, -7], [1.5, -10]];
  const GROEVEN = [[[8, -60], [20, -55], [16, -46], [28, -40]], [[34, -58], [40, -48], [50, -44]], [[10, -36], [22, -30], [18, -20], [30, -16]], [[38, -34], [48, -26], [44, -16], [54, -10]],
    [[6, -20], [12, -14], [22, -12]], [[40, 4], [48, 8], [50, -2]], [[33, -2], [44, -8], [56, -6]]]; // laatste = Sylvius-groeve
  for (const d of [-1, 1]) {
    const pts = HELFT.map(([px, py]) => [d * px, py]);
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, BIO.brein, lighten(BIO.brein, 0.22), L(1.6));
    ctx.save(); ctx.beginPath(); bioPad(ctx, pts, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = L(1.4);
    GROEVEN.forEach((g, i) => { ctx.lineWidth = L(i === GROEVEN.length - 1 ? 2 : 1.4); ctx.beginPath(); bioPad(ctx, g.map(([px, py]) => [d * px, py]), false); ctx.stroke(); });
    ctx.restore();
  }
  // lengtegroeve tussen de helften
  ctx.strokeStyle = rgba(BIO.breinD, 0.9); ctx.lineWidth = L(1.6); ctx.beginPath(); ctx.moveTo(0, -66); ctx.lineTo(0, -10); ctx.stroke();
  // hypothalamus (middellijn, tussen de slaapkwabben) + steeltje + hypofyse
  _vbGloed(ctx, 0, 0, 22, BIO.klier, hth);
  ctx.beginPath(); bioPad(ctx, [[-7, -3], [0, -5], [7, -3], [6, 3], [0, 5], [-6, 3]], true); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.25 + 0.75 * hth), lighten(hth > 0.3 ? BIO.klier : BIO.breinS, 0.25), L(1.2));
  ctx.strokeStyle = _vbMix(BIO.breinS, BIO.klier, 0.3 + 0.7 * Math.max(hth, hyp)); ctx.lineWidth = Math.max(2.2, 3 * s) / s; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0.5, 8); ctx.stroke();
  _vbGloed(ctx, 0, 12, 18, BIO.klier, hyp);
  ctx.beginPath(); ctx.ellipse(0, 12, 6, 4.5, 0, 0, 6.283); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.35 + 0.65 * hyp), lighten(BIO.klier, 0.2), L(1.2));
  ctx.restore();
  return uit;
}

// KIJKJE IN HET HOOFD van een castpersonage (vooraanzicht). hoofd = { x, y, r } uit persoon(...).hoofd.
// Plaatsing: hypofyse op ooghoogte (achter de neuswortel), kruin net onder de schedeldak/haarlijn (± 0,65 hh boven
// de ogen), brein ± 0,8 hh breed (net binnen het gezicht). Stripkoppen zijn smaller dan echt: rek = 1,18 (verticaal).
function hoofdKijkje(ctx, hoofd, o = {}) {
  const { a = 1 } = o; const hh = hoofd.r / 0.55; const s = 0.8 * hh / 120, rek = 1.18;
  const eyeY = hoofd.y + hh * 0.02; const hy = eyeY - 12 * s * rek;
  if (a <= 0.01) return { hth: [hoofd.x, hy], hyp: [hoofd.x, eyeY] };
  ctx.save(); ctx.globalAlpha *= a;
  _vbVenster(ctx, hoofd.x, hoofd.y - hh * 0.24, hh * 0.5, hh * 0.52, 0.8);
  const r = breinVoor(ctx, hoofd.x, hy, s, Object.assign({}, o, { a: 1, rek }));
  ctx.restore(); return r;
}

// =====================================================================================
// BAARMOEDER MET EILEIDERS EN EIERSTOKKEN, vooraanzicht (frontale doorsnede van de baarmoeder).
// Recept (1 cm ≈ 21 px bij s = 1): niet zwanger peervormig, ± 7,5 cm lang (± 160 px incl. baarmoederhals) en
// ± 5 cm breed (110 px); hals ± 3 cm lang, 2,5 cm breed met nauw kanaal; wand (spier) ± 1,5 cm dik; holte in
// vooraanzicht een driehoekige spleet met slijmvlies; eierstokken amandelvormig ± 3 × 1,5 cm, ± 2 cm naast de
// baarmoeder, met eierstokband aan de baarmoeder net onder de eileider; eileiders ± 10 cm, vanuit de bovenhoeken
// eerst smal (isthmus), dan wijder (ampulla), boog over de eierstok, trechter met franjes (fimbriae) over de
// buitenpool van de eierstok. Zwanger (z = maand/9): lengte 12 cm (3 mnd, net boven het schaambeen), 22 cm
// (5 mnd, fundus bij de navel), 35 cm (9 mnd, tot de ribben); breedte tot ± 25 cm; wand dunner (± 0,5–1 cm);
// eierstokken en eileiders schuiven mee omhoog en naar opzij. Vrucht (CRL): 6 wk 0,4 cm, 12 wk 5,4, 20 wk 16,
// 28 wk 25, 40 wk 36 cm; vruchtwater in de holte; moederkoek bovenaan in de wand.
// Bron: Gray's Anatomy (female pelvis); Sobotta deel 2; Williams Obstetrics (fundushoogte). Bekende fouten:
// eileiders recht als armpjes; eierstokken aan de eileiders vast; baarmoeder hoog in de buik als niet zwanger;
// zwangere baarmoeder als ballon zonder hals; kind dat zweeft zonder navelstreng.
// Oorsprong (x, y) = uitwendige baarmoedermond (onderkant hals): de baarmoeder groeit vanuit het bekken omhoog.
// =====================================================================================
const _VB_LEN = [[0, 7.5], [0.15, 8.5], [0.33, 12], [0.55, 22], [0.8, 30], [1, 35]];
const _VB_BR = [[0, 5], [0.15, 5.8], [0.33, 9.5], [0.55, 15], [0.8, 21], [1, 25]];
const _VB_CRL = [[0, 0], [0.13, 0], [0.15, 0.4], [0.2, 1.6], [0.3, 5.4], [0.4, 11.6], [0.5, 16], [0.6, 21], [0.7, 25], [0.8, 29], [0.9, 32], [1, 36]];
function _vbBaarmoederVorm(z, bk = 1) { // geeft buiten- en binnencontour (ontwerpeenheden, oorsprong = baarmoedermond)
  const cm = 21, Lc = 3 * cm, Wc = 2.5 * cm; const Lt = _vbTab(_VB_LEN, z) * cm, W = _vbTab(_VB_BR, z) * cm * bk;
  const yb0 = -Lc + 6, yT = -Lt, yc = (yb0 + yT) / 2, ry = (yb0 - yT) / 2, rx = W / 2; const kz = clamp(z / 0.6, 0, 1);
  const wand = lerp(1.5 * cm, 0.75 * cm, clamp(z / 0.5, 0, 1));
  const taper = (u) => lerp(lerp(0.5, 0.93, kz), 1, Math.sin(Math.min(1, u * 1.35) * 1.5708)); // peer → ei
  const rand = (rxx, ryy, ycc, minX) => { const R = [], N = 26; for (let i = 0; i <= N; i++) { const f = i / N * Math.PI; const u = (1 - Math.cos(f)) / 2;
      let px = Math.sin(f) * rxx * taper(u); if (minX && u < 0.5) px = Math.max(px, minX * (1 - u * 0.4)); R.push([px, ycc + Math.cos(f) * ryy]); } return R; };
  const rechts = rand(rx, ry, yc, Wc / 2 + 4); const buiten = [[Wc * 0.38, 0], [Wc * 0.5, -Lc * 0.5], ...rechts.slice(1), ...rechts.slice(1, -1).reverse().map(([px, py]) => [-px, py]), [-Wc * 0.5, -Lc * 0.5], [-Wc * 0.38, 0]];
  // binnen: holte (ovaal bij zwangerschap, driehoekige spleet als niet zwanger)
  const rxi = Math.max(4, rx - wand), ryi = Math.max(4, ry - wand), yci = yc - wand * 0.15; const ovaal = [];
  const N = 40; for (let i = 0; i < N; i++) { const f = i / N * 6.283; const u = (1 - Math.cos(f)) / 2; ovaal.push([Math.sin(f) * rxi * taper(u), yci + Math.cos(f) * ryi]); }
  const tri = []; const cx0 = rx * 0.7, cyT = yT + wand * 0.9, apY = yb0 - 4; // hoeken: links-boven, rechts-boven, punt onder
  for (let i = 0; i < N; i++) { const f = i / N; let px, py; // zelfde volgorde als ovaal: start onder, rechtsom via rechts omhoog
    if (f < 0.4) { const u = f / 0.4; px = lerp(0, cx0, u) - Math.sin(u * Math.PI) * 4; py = lerp(apY, cyT, u); }
    else if (f < 0.6) { const u = (f - 0.4) / 0.2; px = lerp(cx0, -cx0, u); py = cyT + Math.sin(u * Math.PI) * 6; }
    else { const u = (f - 0.6) / 0.4; px = lerp(-cx0, 0, u) + Math.sin(u * Math.PI) * 4; py = lerp(cyT, apY, u); } tri.push([px, py]); }
  const kh = clamp((z - 0.08) / 0.1, 0, 1); const holte = tri.map((p, i) => [lerp(p[0] * 0.5 + p[0] * 0.5 * (1 - kh), ovaal[i][0], kh), lerp(p[1], ovaal[i][1], kh)]);
  const hoek = rand(rx, ry, yc, 0)[19]; // bovenhoek (u ≈ 0,8): oorsprong eileider
  return { buiten, holte, rx, ry, yc, yT, Lc, Wc, rxi, ryi, yci, wand, hoek, cm, kh, maxX: Math.max(...rechts.map(p => p[0])) };
}
function vrouwOrganenVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, zwanger = 0, foetus = 0, hlEierstok = 0, hlBaarmoeder = 0, placenta = true, breed = 1 } = o;
  const z = clamp(zwanger, 0, 1); const V = _vbBaarmoederVorm(z, breed); const S = (px, py) => [x + px * s, y + py * s];
  // eierstok-plaats: naast de baarmoeder, schuift mee omhoog en naar buiten
  const H = V.hoek; const ox = Math.max(H[0] + lerp(95, 60, z), V.maxX + 48), oy = H[1] + lerp(48, 80, z);
  const fs0 = _vbTab(_VB_CRL, z) * V.cm / 286; const fs = Math.min(fs0, V.ryi * 2 * 0.86 / 300, V.rxi * 2 * 0.86 / 145);
  const frot = Math.PI + lerp(0.5, 0.08, clamp((z - 0.3) / 0.4, 0, 1)); const fx = -(5 * Math.cos(frot) + 10 * Math.sin(frot)) * fs, fy = V.yci - (5 * Math.sin(frot) - 10 * Math.cos(frot)) * fs;
  const uit = { baarmoeder: { x: x, y: y + V.yc * s, rx: V.rx * s, ry: V.ry * s }, eierstokL: S(-ox, oy), eierstokR: S(ox, oy), cervix: S(0, 0), foetus: S(fx, fy) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s;
  const SPIER = '#C98088', SPIERL = '#E3A6AC', SLIJM = '#E7AAB0', EI = '#E3BBA2', EIL = '#F2D6C4';
  // schede (bovenste stuk), achter de hals
  ctx.beginPath(); bioPad(ctx, [[-26, -14], [-30, 30], [-27, 70], [27, 70], [30, 30], [26, -14]], false); ctx.fillStyle = rgba(SPIER, 0.45); ctx.fill();
  ctx.strokeStyle = rgba(SPIERL, 0.5); ctx.lineWidth = L(1.2); ctx.beginPath(); ctx.moveTo(-28, 20); ctx.lineTo(-27, 70); ctx.moveTo(28, 20); ctx.lineTo(27, 70); ctx.stroke();
  ctx.fillStyle = rgba('#5A2A36', 0.5); ctx.beginPath(); ctx.ellipse(0, 40, 9, 30, 0, 0, 6.283); ctx.fill();
  // eierstokken + eierstokbanden + eileiders (beide kanten)
  for (const d of [-1, 1]) {
    const cx0 = d * H[0], cy0 = H[1];
    ctx.strokeStyle = rgba(SPIERL, 0.7); ctx.lineWidth = L(3); ctx.beginPath(); ctx.moveTo(d * (H[0] - 6), H[1] + 14); ctx.quadraticCurveTo(d * (H[0] + ox) / 2, oy - 6, d * (ox - 28), oy); ctx.stroke(); // eierstokband
    _vbGloed(ctx, d * ox, oy, 70, BIO.klier, hlEierstok);
    ctx.save(); ctx.translate(d * ox, oy); ctx.rotate(d * lerp(0.35, 0.9, z));
    ctx.beginPath(); bioPad(ctx, [[-32, 0], [-22, -14], [4, -17], [28, -10], [33, 2], [22, 14], [-4, 16], [-26, 11]], true); shape(ctx, EI, hlEierstok > 0.3 ? lighten(BIO.klier, 0.2) : EIL, L(1.5));
    ctx.fillStyle = rgba('#F6EBDD', 0.7); [[-14, -4, 4], [6, 5, 5.5], [18, -5, 3], [-4, -8, 2.5], [-20, 6, 2.5]].forEach(([fx2, fy2, fr]) => { ctx.beginPath(); ctx.arc(fx2, fy2, fr, 0, 6.283); ctx.fill(); }); // follikeltjes
    ctx.restore();
    // eileider: isthmus → ampulla → trechter met franjes over de buitenpool
    const dx = ox - H[0]; const pad = [[H[0] - 4, H[1] + 2], [H[0] + dx * 0.4, H[1] - 6], [H[0] + dx * 0.9, H[1] - 14], [ox + 35, H[1] - 6 + (oy - H[1]) * 0.05], [ox + 60, oy - 22], [ox + 54, oy + 4]];
    const P2 = bioDicht(pad, 12).map(([px, py]) => [d * px, py]);
    for (let i = 1; i < P2.length; i++) { const u = i / P2.length; ctx.strokeStyle = SPIER; ctx.lineWidth = lerp(5, 11, Math.pow(u, 1.3)); ctx.beginPath(); ctx.moveTo(P2[i - 1][0], P2[i - 1][1]); ctx.lineTo(P2[i][0], P2[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(SPIERL, 0.85); ctx.lineWidth = L(1.2); ctx.beginPath(); P2.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
    const [ex, ey] = P2[P2.length - 1];
    for (let k = 0; k < 7; k++) { const an = lerp(1.45, 3.3, k / 6) + Math.sin(t * 1.5 + k) * 0.06; const an2 = d > 0 ? an : Math.PI - an; const len = 18 + 6 * hash(k + 3);
      ctx.strokeStyle = SPIER; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + Math.cos(an2) * len * 0.6 + d * 3, ey + Math.sin(an2) * len * 0.6, ex + Math.cos(an2) * len, ey + Math.sin(an2) * len); ctx.stroke();
      ctx.fillStyle = SPIERL; ctx.beginPath(); ctx.arc(ex + Math.cos(an2) * len, ey + Math.sin(an2) * len, 1.8, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#5A2A36', 0.6); ctx.beginPath(); ctx.ellipse(ex, ey + 2, 5, 3, 0, 0, 6.283); ctx.fill(); // trechteropening
  }
  // baarmoeder (spierwand)
  if (hlBaarmoeder > 0.01) { ctx.save(); ctx.shadowColor = rgba(BIO.klier, 0.8 * hlBaarmoeder); ctx.shadowBlur = 40 * hlBaarmoeder; ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.fillStyle = SPIER; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, V.buiten, true); shape(ctx, SPIER, hlBaarmoeder > 0.3 ? lighten(BIO.klier, 0.2) : SPIERL, L(2));
  // spiervezel-tekening (rustig, enkele bogen in de wand)
  ctx.save(); ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.clip(); ctx.strokeStyle = rgba('#A9606A', 0.45); ctx.lineWidth = L(1.2);
  for (let k = 1; k <= 3; k++) { const f = k / 4; ctx.beginPath(); ctx.ellipse(0, V.yci, V.rxi + V.wand * f, V.ryi + V.wand * f, 0, 3.6, 5.8); ctx.stroke(); } ctx.restore();
  // halskanaal
  ctx.strokeStyle = '#6A3240'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, -V.Lc + 4); ctx.stroke();
  ctx.fillStyle = '#6A3240'; ctx.beginPath(); ctx.ellipse(0, -V.Lc * 0.5, 4.5, V.Lc * 0.3, 0, 0, 6.283); ctx.fill();
  // holte: slijmvlies + (bij zwangerschap) vruchtwater
  ctx.beginPath(); bioPad(ctx, V.holte, true); shape(ctx, V.kh > 0.3 ? '#6E8C92' : '#6A3240', SLIJM, Math.max(3, V.wand * 0.18));
  if (V.kh > 0.3) { ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.fillStyle = rgba('#CFE6E2', 0.18); ctx.fill(); }
  if (z > 0.25 && placenta) { // moederkoek tegen de bovenwand (rechtsboven), met navelstreng
    const pk = clamp((z - 0.25) / 0.15, 0, 1); ctx.save(); ctx.globalAlpha *= pk; ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const pcx = V.rxi * 0.62, pcy = V.yci - V.ryi * 0.72; ctx.beginPath(); ctx.ellipse(pcx, pcy, V.rxi * 0.5, V.ryi * 0.3, -0.75, 0, 6.283); shape(ctx, '#A8464E', '#C9666C', L(1.5));
    ctx.strokeStyle = rgba('#7A2A36', 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(pcx - V.rxi * 0.05, pcy + V.ryi * 0.05, V.rxi * (0.22 + k * 0.05), 3.2, 4.0); ctx.stroke(); }
    ctx.restore(); }
  // vrucht
  if (foetus > 0.01 && fs > 0.0005 && V.kh > 0.3) {
    ctx.save(); ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const f = castFoetus(ctx, fx, fy, fs, { alpha: foetus, rot: frot });
    if (z > 0.25 && placenta) castNavelstreng(ctx, V.rxi * 0.48, V.yci - V.ryi * 0.55, f.navel.x, f.navel.y, t, foetus * clamp((z - 0.25) / 0.15, 0, 1), Math.max(3, fs * 22));
    ctx.restore(); }
  ctx.restore();
  return uit;
}

// KIJKJE IN DE BUIK van een castpersonage getekend met persoon(ctx, id, x, y, h, { outfit: 'zwanger', zwanger }).
// Plaatsing (stripmaten van lib_cast.js, hh = kophoogte): baarmoedermond achter het schaambeen (heupY + 0,22 hh,
// waar de benen beginnen); niet zwanger blijft de baarmoeder in het bekken (± 0,25 hh hoog). Schaal zó dat de
// voldragen baarmoeder (35 cm) tot de bovenrand van de stripbuik reikt (onder de ribbenboog); bij 5 mnd staat de
// fundus dan rond de taille/navel. De stripbuik is breder dan echt: o.breed rekt alléén de baarmoederwand in de
// breedte mee (tot ± 80 % van de buikbreedte), het kind en de eierstokken blijven op echte verhouding.
function buikKijkje(ctx, id, x, y, h, zwanger = 0, o = {}) {
  const { a = 1, kijk = 1 } = o; const P = CAST[id] || {}; const hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45;
  const z = clamp(zwanger, 0, 1); const b = castBuik(id, x, y, h, z, kijk); const cx = x + (P.krom ? hh * 0.15 : 0);
  const ux = lerp(cx, b.x, 0.6), uy = heupY + hh * 0.22; const s = 1.36 * hh / 735;
  const V0 = _vbBaarmoederVorm(z); const wil = Math.min(2 * b.rx * 0.8, (-V0.yT - V0.Lc) * s * 0.82), heeft = 2 * V0.maxX * s; const breed = lerp(1, Math.max(1, wil / heeft), ease(clamp((z - 0.2) / 0.5, 0, 1)));
  const V = _vbBaarmoederVorm(z, breed); const opt = Object.assign({}, o, { a: 1, zwanger: z, breed });
  if (a <= 0.01) return vrouwOrganenVoor(ctx, ux, uy, s, Object.assign(opt, { a: 0 }));
  ctx.save(); ctx.globalAlpha *= a;
  const half = Math.max(V.maxX + 120, V.hoek[0] + 200) * s; const yTop = uy + V.yT * s - hh * 0.08, yBot = uy + hh * 0.12;
  _vbVenster(ctx, ux, (yTop + yBot) / 2, Math.max(half, hh * 0.42), (yBot - yTop) / 2 + hh * 0.05, 0.78);
  const r = vrouwOrganenVoor(ctx, ux, uy, s, opt);
  ctx.restore(); return r;
}

// =====================================================================================
// GEEL LICHAAM (corpus luteum) in doorsnede, en zijn verval tot wit lichaam (corpus albicans).
// Recept: 1,5–2,5 cm groot (kan tot 3 cm); sterk geplooide, dikke gele wand van grote veelhoekige luteïnecellen
// (granulosa-luteïnecellen ± 30–50 µm, ronde kern, lichtgeel vetrijk cytoplasma) met tussen de plooien schotten
// van theca-weefsel (kleinere theca-luteïnecellen) waarlangs haarvaten naar binnen groeien; in het midden het
// bloedstolsel/de holte van de gesprongen follikel (rood-bruin, fibrinedraden, later bindweefsel); dun kapsel
// erbuiten. Zonder hCG na ± 10–14 dagen verval: krimpt, verliest kleur, wordt een klein wit hyalien litteken
// (corpus albicans, enkele mm) met golvende rand. LH-receptoren (G-eiwitgekoppeld) op het celmembraan van de
// luteïnecellen. Bron: Junqueira h. 22 'Corpus luteum'; Ross & Pawlina h. 23. Bekende fouten: geel lichaam als
// egale gele bol of ring zonder plooien; cellen als kleine stipjes; litteken dat geel blijft.
// Ontwerpeenheden: straal 100 (r = straal op het scherm).
// =====================================================================================
const _VB_SEP = 7, _VB_F0 = 0.45; // aantal plooien; fase zodat het midden van een kwab rechts ligt (θ = 0)
function _vbRo(th) { const ph = _VB_SEP * (th - _VB_F0); return 90 - 24 * Math.pow((1 + Math.cos(ph)) / 2, 8) + 1.5 * Math.sin(th * 3); }
function _vbRi(th) { const ph = _VB_SEP * (th - _VB_F0); return 48 + 13 * Math.pow((1 + Math.cos(ph)) / 2, 2) + 2 * Math.sin(th * 5 + 1); }
function _vbLuteine() { // Voronoi-cellen in de wand (gecachet)
  if (_bioPolyCache.vbLuteine) return _bioPolyCache.vbLuteine;
  const seeds = []; const d = 9;
  for (let rho = 50; rho < 92; rho += d * 0.86) { const n = Math.round(6.283 * rho / d); for (let k = 0; k < n; k++) { const th = (k + (Math.round(rho) % 2) * 0.5) / n * 6.283 + (hash(rho * 7 + k) - 0.5) * 0.4 * d / rho; const rr = rho + (hash(rho * 3 + k * 11) - 0.5) * d * 0.4;
      if (rr > _vbRi(th) + 2 && rr < _vbRo(th) - 2) seeds.push([Math.cos(th) * rr, Math.sin(th) * rr]); } }
  const polys = seeds.map((p, i) => { const pts = []; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.8;
      seeds.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); if (dd > d * 2.5) return; const pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr); });
      best = Math.max(0, best - 0.9); pts.push([p[0] + ux * best, p[1] + uy * best]); } return { c: p, pts }; });
  let hi = 0, bx = -1e9; polys.forEach((c, i) => { const th = Math.atan2(c.c[1], c.c[0]); if (Math.abs(th) < 0.2 && c.c[0] > bx) { bx = c.c[0]; hi = i; } });
  return (_bioPolyCache.vbLuteine = { polys, hi });
}
function geelLichaam(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, leef = 1, hl = 0, receptoren = 0 } = o;
  const lv = clamp(leef, 0, 1), sc = lerp(0.32, 1, ease(lv)), k = r / 100 * sc; const L = (px) => px / k;
  const { polys, hi } = _vbLuteine(); const H = polys[hi];
  const omtrek = (f, n = 120) => { const R = []; for (let i = 0; i < n; i++) { const th = i / n * 6.283; R.push([Math.cos(th) * f(th), Math.sin(th) * f(th)]); } return R; };
  // buitenste membraanpunt van de gemarkeerde cel (meest rechtse punt van de gladde omtrek)
  const celPad = bioDicht([...H.pts, H.pts[0], H.pts[1]], 6).slice(6); let mp = celPad[0]; celPad.forEach(p => { if (p[0] > mp[0]) mp = p; });
  const uit = { cel: [x + mp[0] * k, y + mp[1] * k], r: r * sc };
  if (a <= 0.01) return uit;
  const geel = lv, ka = clamp((lv - 0.12) / 0.55, 0, 1), alb = clamp((0.6 - lv) / 0.5, 0, 1);
  const kl = (h1, wit = '#E4DED2') => _vbMix(h1, wit, 1 - geel);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  _vbGloed(ctx, 0, 0, 125, BIO.klier, hl);
  const KAPSEL = omtrek(th => 96 + 1.2 * Math.sin(th * 4 + 0.5)), WAND_O = omtrek(_vbRo), WAND_I = omtrek(_vbRi);
  if (ka > 0.01) {
    ctx.save(); ctx.globalAlpha *= ka;
    // kapsel + theca (schotten tussen de plooien)
    ctx.beginPath(); bioPad(ctx, KAPSEL, true); shape(ctx, kl('#C98A6A'), lighten(kl('#D9A080'), 0.15), L(1.6));
    ctx.fillStyle = rgba(kl('#9C6A4A'), 0.35); for (let i = 0; i < 110; i++) { const th = hash(i * 3 + 7) * 6.283, rr = lerp(_vbRo(th) + 2, 94, hash(i * 3 + 8)); ctx.beginPath(); ctx.ellipse(Math.cos(th) * rr, Math.sin(th) * rr, 1.5, 1, th, 0, 6.283); ctx.fill(); }
    // centrale holte met stolsel
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.fillStyle = kl('#7E3236', '#D8D0C4'); ctx.fill();
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.clip();
    ctx.strokeStyle = rgba(kl('#E0A0A0'), 0.45); ctx.lineWidth = L(1); for (let i = 0; i < 14; i++) { const a0 = hash(i + 40) * 6.283, a1 = a0 + 1 + hash(i + 41) * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a0) * 50, Math.sin(a0) * 50); ctx.quadraticCurveTo((hash(i + 42) - 0.5) * 40, (hash(i + 43) - 0.5) * 40, Math.cos(a1) * 50, Math.sin(a1) * 50); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const an = hash(i * 5 + 60) * 6.283, rr = Math.sqrt(hash(i * 5 + 61)) * 42; ctx.beginPath(); ctx.ellipse(Math.cos(an) * rr, Math.sin(an) * rr, 2.2, 1.4, an, 0, 6.283); ctx.fillStyle = rgba(kl('#C2453E'), 0.7); ctx.fill(); }
    ctx.restore();
    // gele wand: luteïnecellen
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_O, true); bioPad(ctx, WAND_I.slice().reverse(), true); ctx.clip('evenodd');
    ctx.fillStyle = kl('#D9A84A'); ctx.fillRect(-100, -100, 200, 200);
    polys.forEach((c, i) => { if (i === hi && receptoren > 0.01) return; ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, kl('#EDCB6A'), kl('#F6E2A0'), L(0.8));
      ctx.beginPath(); ctx.arc(c.c[0] + (hash(i) - 0.5) * 1.5, c.c[1] + (hash(i + 1) - 0.5) * 1.5, 1.7, 0, 6.283); ctx.fillStyle = rgba(_vbMix('#6E5A9E', '#BDB4A8', 1 - geel), 0.85); ctx.fill(); });
    ctx.restore();
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.strokeStyle = kl('#C9963A'); ctx.lineWidth = L(1.4); ctx.stroke();
    // haarvaten: vanuit het kapsel langs de schotten naar binnen, met zijtakjes de kwabben in
    ctx.strokeStyle = rgba(kl('#C2453E'), 0.9); for (let sp = 0; sp < _VB_SEP; sp++) { const th = _VB_F0 + sp * 6.283 / _VB_SEP; const r0 = 95, r1 = _vbRi(th) + 1;
      ctx.lineWidth = L(1.6); ctx.beginPath(); bioPad(ctx, [[Math.cos(th) * r0, Math.sin(th) * r0], [Math.cos(th + 0.03) * lerp(r0, r1, 0.5), Math.sin(th + 0.03) * lerp(r0, r1, 0.5)], [Math.cos(th) * r1, Math.sin(th) * r1]], false); ctx.stroke();
      ctx.lineWidth = L(1); for (const sd of [-1, 1]) for (let b = 0; b < 2; b++) { const t0 = th + sd * (0.12 + b * 0.16), rr0 = _vbRo(t0) - 1, rr1 = lerp(rr0, _vbRi(t0), 0.55 + 0.3 * hash(sp * 4 + b + (sd > 0 ? 2 : 0)));
        ctx.beginPath(); ctx.moveTo(Math.cos(t0) * (rr0 + 3), Math.sin(t0) * (rr0 + 3)); ctx.quadraticCurveTo(Math.cos(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.sin(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.cos(t0 + sd * 0.02) * rr1, Math.sin(t0 + sd * 0.02) * rr1); ctx.stroke(); } }
    // gemarkeerde cel met LH-receptoren
    if (receptoren > 0.01) {
      ctx.beginPath(); bioPad(ctx, H.pts, true); shape(ctx, kl('#F2D27A'), (C.teal || '#5BA4C9'), L(1.6));
      ctx.beginPath(); ctx.arc(H.c[0], H.c[1], 1.9, 0, 6.283); ctx.fillStyle = '#6E5A9E'; ctx.fill();
      const celRing = [...celPad, celPad[0]], nr = 12; ctx.lineWidth = L(1);
      for (let j = 0; j < nr; j++) { const vis = clamp(receptoren * nr * 1.2 - j * 0.9, 0, 1); if (vis <= 0) continue; const q = bioPunt(celRing, (j + 0.5) / nr); const p1 = [q[0], q[1]];
        let nx = Math.sin(q[2]), ny = -Math.cos(q[2]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl; if (nx * (p1[0] - H.c[0]) + ny * (p1[1] - H.c[1]) < 0) { nx = -nx; ny = -ny; }
        const len = 2.8 * vis + 0.15 * Math.sin(t * 3 + j); ctx.strokeStyle = (C.tealL || '#9ED0EA'); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p1[0] + nx * len, p1[1] + ny * len); ctx.stroke();
        ctx.beginPath(); ctx.arc(p1[0] + nx * (len + 0.6), p1[1] + ny * (len + 0.6), 0.95 * vis, 0, 6.283); shape(ctx, (C.teal || '#5BA4C9'), (C.tealL || '#9ED0EA'), L(0.8)); }
    }
    ctx.restore();
  }
  // wit lichaam (litteken): golvend, wit, vezelig
  if (alb > 0.01) {
    ctx.save(); ctx.globalAlpha *= alb; const AL = omtrek(th => 86 * (1 + 0.1 * Math.sin(th * 7 + 0.4) + 0.05 * Math.sin(th * 13 + 1)));
    ctx.beginPath(); bioPad(ctx, AL, true); shape(ctx, '#E4DED2', '#F4F0E8', L(1.6));
    ctx.strokeStyle = rgba('#B8AE9E', 0.6); ctx.lineWidth = L(1.1);
    for (let k2 = 1; k2 <= 3; k2++) { const R2 = omtrek(th => 86 * (1 - k2 * 0.22) * (1 + 0.14 * Math.sin(th * 7 + 0.4 + k2) + 0.05 * Math.sin(th * 11)), 60); ctx.beginPath(); bioPad(ctx, R2, true); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  return uit;
}
// =====================================================================================
// EILEIDER in lengtedoorsnede, variant met as en lumen-functie (22 okt 2026, Anticonceptie, soa's en voortplantings-
// techniek). Naast eileiderLangs (Van bevruchting tot baby); gebruik bij nieuwe films bij voorkeur één van de twee. Recept: ± 10–12 cm lang; vanaf de baarmoeder isthmus (smal, lumen ± 1 mm, dikke spierwand) → ampulla
// (wijd, ± 1 cm, dunne wand, sterk geplooid slijmvlies; hier vindt de bevruchting plaats) → trechter met franjes
// (fimbriae) die over de eierstok liggen. Slijmvlies met trilhaarcellen die naar de baarmoeder slaan, plus
// spiercontracties. Ontsteking (salpingitis, vooral chlamydia/gonorroe): wand rood en gezwollen, plooien plakken
// aan elkaar, daarna littekens (fibrose) die het lumen vernauwen of afsluiten → eicel/embryo blijft steken
// (buitenbaarmoederlijke zwangerschap of onvruchtbaarheid). Bron: Junqueira h. 22; Sadler h. 2; RIVM chlamydia.
// Bekende fouten: een rechte buis van gelijke dikte; franjes als losse streepjes zonder trechter.
// x0 = baarmoederkant (links), x1 = trechterkant (rechts), yc = as. o: ontst 0..1, litteken 0..1, t, eicel (0..1 = plek
// langs de buis van rechts naar links), dicht 0..1 (volledig afgesloten), trilhaar (toon trilharen).
// Geeft { lumen(u) → [x, y, straal] } terug (u = 0 baarmoeder … 1 trechter).
// =====================================================================================
function eileiderDoorsnede(ctx, x0, x1, yc, o = {}) {
  const { a = 1, t = 0, ontst = 0, litteken = 0, trilhaar = 1, s = 1, franjes = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = x1 - x0; const zw = 1 + 0.18 * ontst;
  const buiten = (u) => lerp(46, 120, Math.pow(u, 1.25)) * s * zw; // halve dikte buitenwand
  const lumen = (u) => Math.max(4 * s, lerp(8, 82, Math.pow(u, 1.4)) * s * (1 - 0.25 * ontst)); // halve wijdte lumen
  const yAs = (u) => yc + Math.sin(u * 5.2) * 10 * s;
  const N = 80; const top = [], bot = [], lt = [], lb = [];
  for (let i = 0; i <= N; i++) { const u = i / N, x = x0 + u * L, y = yAs(u); top.push([x, y - buiten(u)]); bot.push([x, y + buiten(u)]); lt.push([x, y - lumen(u)]); lb.push([x, y + lumen(u)]); }
  const wandCol = ontst > 0.01 ? _mixHex(BIO.spier, '#D2453A', 0.45 * ontst) : BIO.spier;
  // spierwand
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  shape(ctx, rgba(wandCol, 0.7), rgba(BIO.spierL, 0.8), 2);
  // kringspiervezels (dwars) in de wand
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.45); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const u = k / 70, x = x0 + u * L, y = yAs(u); ctx.beginPath(); ctx.moveTo(x, y - buiten(u) + 4); ctx.lineTo(x + 6, y - lumen(u) - 6); ctx.moveTo(x, y + buiten(u) - 4); ctx.lineTo(x + 6, y + lumen(u) + 6); ctx.stroke(); } ctx.restore();
  // slijmvlies met plooien (vingers het lumen in), sterker geplooid in de ampulla
  const slijmCol = ontst > 0.01 ? _mixHex(BIO.slijm, '#E0503F', 0.6 * ontst) : BIO.slijm;
  ctx.beginPath(); lt.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(lb[i][0], lb[i][1]); ctx.closePath(); ctx.fillStyle = rgba('#2E1E2A', 0.9); ctx.fill();
  const plooi = (sd) => { const nP = 30; for (let k = 0; k < nP; k++) { const u = 0.03 + (k + 0.5) / nP * 0.94, x = x0 + u * L, y = yAs(u); const lr = lumen(u); const lenF = lerp(0.35, 0.78, u) * (0.75 + 0.5 * hash(k * 5 + (sd > 0 ? 1 : 2))) * (1 + 0.2 * ontst); const w = (L / nP) * 0.62;
      const by = y + sd * (lr + 2 * s), ty = y + sd * lr * (1 - lenF), lean = (hash(k * 3 + 7) - 0.5) * w * 0.8;
      const pts = [[x - w, by], [x - w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x - w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x + w, by]];
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.closePath(); shape(ctx, rgba(slijmCol, 0.9), rgba(BIO.slijmD, 0.75), 1.2);
      if (u > 0.55 && lenF > 0.5) { ctx.beginPath(); ctx.ellipse(x + lean * 0.4, lerp(by, ty, 0.6), w * 0.18, lr * lenF * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.slijmD, 0.25); ctx.fill(); }
      if (trilhaar > 0.01) { ctx.save(); ctx.globalAlpha *= trilhaar; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 1.3; for (let c = 0; c < 4; c++) { const v = (c + 0.5) / 4; const p = bioPunt(pts, v); const sl = Math.sin(t * 9 + k * 0.7 + c) * 0.5 + 0.5; const nx = -sd * 0.0, dx = -(5 + 5 * sl) * s, dy = -sd * (4 + 3 * (1 - sl)) * s;
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[0] + dx * 0.3, p[1] + dy, p[0] + dx, p[1] + dy * 0.7); ctx.stroke(); } ctx.restore(); } } };
  plooi(-1); plooi(1);
  // trechter met franjes
  if (franjes > 0.01) { const ue = 1, xe = x1, ye = yAs(ue), R = buiten(ue); ctx.save(); ctx.globalAlpha *= franjes; for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31; const len = (70 + 22 * Math.sin(k * 1.7)) * s; const wob = Math.sin(t * 1.4 + k) * 6 * s;
      const sx = xe - 6 * s, sy = ye + Math.sin(an) * R * 0.9; const ex = sx + Math.cos(an) * len + 20 * s, ey = sy + Math.sin(an) * len * 0.8 + wob;
      ctx.strokeStyle = rgba(wandCol, 0.8); ctx.lineWidth = 15 * s; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + 10 * s, (sy + ey) / 2 - wob, ex, ey); ctx.stroke();
      ctx.strokeStyle = rgba(slijmCol, 0.9); ctx.lineWidth = 7 * s; ctx.stroke(); } ctx.restore(); }
  // littekens: lichte vezelbanden die het lumen dichtknijpen
  if (litteken > 0.01) { const plekken = [0.28, 0.5, 0.66]; plekken.forEach((u0, i) => { const g = clamp(litteken * 1.6 - i * 0.3, 0, 1); if (g <= 0.01) return; const x = x0 + u0 * L, y = yAs(u0), lr = lumen(u0);
      ctx.save(); ctx.globalAlpha *= g; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 34 * s, y + sd * (lr + 10 * s)); ctx.quadraticCurveTo(x, y + sd * lr * (1 - 1.05 * g), x + 34 * s, y + sd * (lr + 10 * s)); ctx.lineTo(x + 34 * s, y + sd * buiten(u0) * 0.9); ctx.lineTo(x - 34 * s, y + sd * buiten(u0) * 0.9); ctx.closePath(); shape(ctx, rgba('#EDE2DA', 0.92), '#C9B8AE', 1.5);
          ctx.strokeStyle = rgba('#B8A498', 0.8); ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const yy = y + sd * (lr * (1 - g * 0.9) + 8 * s + k * 9 * s); ctx.beginPath(); ctx.moveTo(x - 26 * s, yy); ctx.bezierCurveTo(x - 8 * s, yy - 5 * s, x + 8 * s, yy + 5 * s, x + 26 * s, yy); ctx.stroke(); } } ctx.restore(); }); }
  ctx.restore();
  return { lumen: (u) => [x0 + u * L, yAs(u), lumen(u)], buiten: (u) => buiten(u) };
}
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }

// =====================================================================================
// BACTERIËN VAN SOA'S (22 okt 2026). Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten naar
//   elkaar, samen ± 1,5 × 0,8 µm; vaak ín witte bloedcellen in pus. Bron: CDC; Murray, Medical Microbiology h. 22.
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; insluitsel (inclusion) naast de kern vol kleine
//   deeltjes (elementaire lichaampjes ± 0,3 µm, grotere reticulaire lichaampjes); de cel barst en de deeltjes
//   besmetten nieuwe cellen. Bron: idem h. 34.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen, draait als
//   een kurkentrekker. Bron: idem h. 35.
// BACTERIE GROOT: celwand + celmembraan, cytoplasma met ribosomen, DNA als één lus (nucleoïd) en een plasmide;
//   aangrijpingspunten van antibiotica: celwand (penicillines/ceftriaxon) en ribosomen (azitromycine, doxycycline).
// Bekende fouten: alle bacteriën als dezelfde staafjes; bacterie als leeg ovaal.
// =====================================================================================
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) { // lichaamscel met een chlamydia-insluitsel; barst = 0..1 (deeltjes komen vrij)
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BIO.cyto, 0.22), rgba(BIO.cyto, 0.75), 2.5);
  ctx.beginPath(); ctx.ellipse(x + r * 0.35, y - r * 0.2, r * 0.3, r * 0.26, 0.3, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.55), BIO.kernL, 1.5);
  const ir = r * lerp(0.15, 0.5, groei); const ix = x - r * 0.22, iy = y + r * 0.12;
  ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); shape(ctx, rgba('#E8D9A0', 0.18), rgba('#E8D9A0', 0.7), 1.5);
  const n = Math.round(lerp(4, 46, groei)); for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, rr = Math.sqrt(hash(k * 7 + 2)) * ir * 0.85; const out = barst * (40 + 60 * hash(k)) ; const px = ix + Math.cos(an) * (rr + out), py = iy + Math.sin(an) * (rr + out);
    ctx.beginPath(); ctx.arc(px, py, k % 5 === 0 ? 4 : 2.6, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = dood > 0.5 ? '#6A7488' : col; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.beginPath(); const ph = dood > 0.5 ? 0 : t * 6;
  for (let i = 0; i <= 120; i++) { const u = i / 120, xx = (u - 0.5) * len, yy = Math.sin(u * n * 6.283 - ph) * len * 0.045; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
}
function bacterieGroot(ctx, x, y, w, h, o = {}) { // staafbacterie in doorsnede; wandKapot 0..1 (antibioticum op de celwand), riboHl 0..1
  const { a = 1, t = 0, wandKapot = 0, riboHl = 0, col = C.koraal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = (inset) => { roundRect(ctx, x - w / 2 + inset, y - h / 2 + inset, w - 2 * inset, h - 2 * inset, h / 2 - inset); };
  // celwand (dik), met gaten als het antibioticum werkt
  pad(0); ctx.lineWidth = 9; ctx.strokeStyle = rgba(col, 0.9); if (wandKapot > 0.01) ctx.setLineDash([lerp(400, 26, wandKapot), lerp(0, 18, wandKapot)]); ctx.stroke(); ctx.setLineDash([]);
  pad(9); ctx.fillStyle = rgba(col, 0.16); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = rgba('#F2E6C8', 0.7); ctx.stroke(); // celmembraan
  // DNA-lus (nucleoïd): één gesloten, kronkelende lus
  ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 90; i++) { const an = i / 90 * 6.283; const rr = 1 + 0.18 * Math.sin(an * 7 + 1) + 0.1 * Math.sin(an * 13); const px = x - w * 0.05 + Math.cos(an) * w * 0.18 * rr, py = y + Math.sin(an) * h * 0.26 * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // plasmide
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.12, w * 0.045, h * 0.09, 0.4, 0, 6.283); ctx.stroke();
  // ribosomen
  for (let k = 0; k < 34; k++) { const px = x - w * 0.42 + hash(k * 3 + 1) * w * 0.84, py = y - h * 0.32 + hash(k * 3 + 2) * h * 0.64; if (Math.abs(px - (x - w * 0.05)) < w * 0.2 && Math.abs(py - y) < h * 0.3) continue;
    ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex('#C9B896', '#E0B64A', riboHl) : rgba('#C9B896', 0.85); ctx.fill(); }
  ctx.restore(); return { wand: (an) => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] };
}

// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom (wordt de placenta); binnenste celmassa (embryoblast) als klompje ronde cellen aan één
// kant (wordt het kind); holte vol vocht (blastocoel). Bij PGT haalt de arts 5–10 cellen uit de trofoblast aan de
// kant tegenover de binnenste celmassa. Bron: Sadler h. 3; ESHRE PGT-consortium. Bekende fout: ring van gelijke
// rondjes zonder verschil tussen buitenlaag en celmassa.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (zona > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.12 * zona), rgba('#F6EEDC', 0.75 * zona), Math.max(2, r * 0.05)); }
  ctx.beginPath(); ctx.arc(x, y, r * 0.95, 0, 6.283); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  // trofoblast: platte cellen langs de rand
  const n = 22; for (let k = 0; k < n; k++) { const an = k / n * 6.283; const d = Math.abs(Math.atan2(Math.sin(an - (icm + Math.PI)), Math.cos(an - (icm + Math.PI)))); if (gat > 0.01 && d < 0.35 * gat) continue;
    const cx = x + Math.cos(an) * r * 0.88, cy = y + Math.sin(an) * r * 0.88; ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.16, r * 0.065, an + Math.PI / 2, 0, 6.283);
    shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', 1.2); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.05, r * 0.03, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); }
  // binnenste celmassa
  const ix = x + Math.cos(icm) * r * 0.55, iy = y + Math.sin(icm) * r * 0.55; const P = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  P.forEach(([u, v], i) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', 1.2); ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); });
  ctx.restore(); return { icm: [ix, iy], tegenover: [x + Math.cos(icm + Math.PI) * r * 0.9, y + Math.sin(icm + Math.PI) * r * 0.9] };
}
// Wat word jij? · Bio-informatica 2 · Miljoenen varianten: welke maakt ziek? — eigen tekeningen (fase A, 25 okt 2026)
// Look: Schema met cast. Het kind komt nooit in beeld: dossiermap, kindertekening, stamboomschema.
// Reeksobject 'scherm met code / sequenties': letterlijk overgenomen uit teken_bi1.js (blok hieronder); scherm(), tegel(), varRij(), rolLijst() zijn de eigen laag erop.
// =====================================================================================================
// REEKSOBJECT 'SCHERM MET CODE / SEQUENTIES' (vastgelegd door film 1; films 2–4 kopiëren dit blok letterlijk)
// =====================================================================================================
// Gebruiksnoot
//   Vereist: lib.js (C, rgba, lighten, clamp, lerp, ease, shape, roundRect, text, fTekst, fMeta, metaText) en circ().
//   Kopieer alles van hier tot '— einde reeksobject —' bovenaan de eigen teken_<d>.js. Niets in dit blok aanpassen;
//   wil een film iets extra, dan via de opties of in een eigen functie eronder.
//
//   codeScherm(ctx, x, y, w, h, regels, o)   donker editorvenster met tabbalk; geeft geometrie terug.
//       regels  array met regels Python (strings); syntax in de betekeniskleuren (sleutelwoord goud, "tekst" paars,
//               getal teal, # commentaar grijs, rest wit). Regelnummers links.
//       o.tab   naam in de tab (bv. 'vertaal.py', 'barcode_sushi.fasta', 'BLAST · resultaten'), hoofdletters zoals gegeven
//       o.a     doorzichtigheid · o.px  lettergrootte code (36) · o.zicht  aantal zichtbare regels (breuk = laatste fadet in)
//       o.hl    index (of lijst) van de regel(s) die de stem beschrijft (goud randje links, volle sterkte); andere regels naar 35 %
//       o.dim   0..1 hoe sterk de andere regels dimmen (standaard 1 als hl gezet is)
//       o.cursor {regel, kol} knipperende gouden cursor (alleen als er getypt wordt) · o.t  tijd voor het knipperen
//       o.merk  [{regel, van, tot, a}] gouden kader om tekens van..tot (bv. len(mrna)) · o.fout  [{regel, van, tot, a}] koraal kader
//       o.inhoud function(B) tekent eigen inhoud in het venster in plaats van code (B = {x, y, w, h}, al geclipt)
//       terug: {binnen:{x,y,w,h}, regelY(i) (basislijn), kolX(k) (linkerrand teken k), cw (tekenbreedte), lh}
//   sequentieRij(ctx, x, y, seq, o)          rij lettertegels; x = midden eerste tegel, y = midden van de rij.
//       basen in de vaste tinten van de DNA-reeks (A, T lichte tegel met donkere letter; C, G donkere tegel met lichte letter);
//       o.rna  U en de RNA-tinten (teal) · o.s  schaal (1 = tegel 44 × 52, letter 40 px bold) · o.dx  afstand
//       o.zicht aantal zichtbare tegels · o.mark(i) → kleur of null (koraal rand bij verschil) · o.hl(i) → 0..1 gouden rand
//       o.alpha(i) → 0..1 per tegel · o.fadeX, o.fadeW  rij loopt rustig uit (vervaagt rechts) · o.letters false = alleen kleur
//       '-' tekent een gat: leeg tegeltje met gestippelde rand en een streepje. Letters onder 28 px vallen vanzelf weg.
//       terug: array met de x van elke tegel.
//   uitlijning(ctx, x, y, boven, onder, o)  twee rijen onder elkaar met streepjes bij gelijke letters, koraal rand bij verschil;
//       o.kol  aantal kolommen dat al vergeleken is (letter voor letter) · o.streep 0..1 · o.klopt 0..1 (streepjes worden groen)
//       o.score 0..1 scoreregel eronder (+1 groen, −1 koraal) · o.s, o.dx zoals sequentieRij · o.namen ['stukje 1','stukje 2']
//       terug: {xs, y1, y2, gelijk, anders, gaten, scoreY}
//   aaKralen(ctx, x, y, letters, o)          aminozuren als okerkleurige kralen aan een keten, met de eenletterscode erop;
//       o.r straal (32) · o.dx · o.zicht · o.fout true = koraal rand (verkeerde aminozuren) · o.hl index met gouden rand
//   resultatenLijst(ctx, x, y, w, rijen, o)  BLAST-uitslag, max. drie regels {soort, gelijk, toeval, best, verdacht};
//       koppen 'soort', 'gelijk', 'toeval' in Meta; o.zicht · o.kolHl 'gelijk'|'toeval' (goud kader om die kolom) · o.haak 0..1
//   Kleuren: SCR (venster), BASE_KL / BASE_LT (DNA), RNA_KL / RNA_LT (RNA), AA_KL (aminozuren) — gelijk aan de DNA-reeks.
//   Nooit: een muur van tekst (code 4–8 regels, rij 20–40 tegels), echte NCBI-schermen of logo's, Engelse menu's.
// =====================================================================================================
const SCR = { vul: '#121A26', rand: '#8FA0B5', tab: '#0D1420', nr: '#9AA3B2', kw: '#E0B64A', str: '#8C7BBF', num: '#5BA4C9', com: '#9AA3B2', txt: '#F2F2EE' };
const BASE_KL = { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' }, BASE_LT = { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
const RNA_KL = { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, RNA_LT = { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' };
const AA_KL = ['#C9A35C', '#B08A5C', '#D9B97A', '#9C7A4A', '#E0C98F'];
const _PY_KW = new Set(['for', 'in', 'range', 'len', 'print', 'def', 'return', 'if', 'else', 'elif', 'while', 'import', 'from', 'and', 'or', 'not', 'True', 'False', 'None']);
function _pyTokens(s) { const out = []; let i = 0;
  while (i < s.length) { const c = s[i];
    if (c === '#') { out.push([i, s.slice(i), 'com']); break; }
    if (c === '"' || c === "'") { let j = s.indexOf(c, i + 1); if (j < 0) j = s.length - 1; out.push([i, s.slice(i, j + 1), 'str']); i = j + 1; continue; }
    if (/[0-9]/.test(c) && !/[A-Za-z_]/.test(s[i - 1] || '')) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; out.push([i, s.slice(i, j), 'num']); i = j; continue; }
    if (/[A-Za-z_]/.test(c)) { let j = i; while (j < s.length && /[A-Za-z_0-9]/.test(s[j])) j++; const w = s.slice(i, j); out.push([i, w, _PY_KW.has(w) ? 'kw' : 'txt']); i = j; continue; }
    out.push([i, c, 'txt']); i++; }
  return out; }
function codeScherm(ctx, x, y, w, h, regels = [], o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null;
  const px = o.px || 36, lh = o.lh || Math.round(px * 1.42), nrs = o.nrs !== false, hls = o.hl == null ? [] : [].concat(o.hl), dim = o.dim == null ? (hls.length ? 1 : 0) : o.dim;
  const zicht = o.zicht == null ? Infinity : o.zicht, tb = 54;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, SCR.vul, null);
  ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = SCR.tab; ctx.fillRect(x, y, w, tb); ctx.restore();
  if (o.tab) { ctx.font = fMeta(28); ctx.letterSpacing = '1px'; const tw = ctx.measureText(o.tab).width + 48;
    ctx.beginPath(); ctx.moveTo(x + 16, y + tb); ctx.lineTo(x + 16, y + 18); ctx.arcTo(x + 16, y + 10, x + 24, y + 10, 8); ctx.lineTo(x + 8 + tw, y + 10); ctx.arcTo(x + 16 + tw, y + 10, x + 16 + tw, y + 18, 8); ctx.lineTo(x + 16 + tw, y + tb); ctx.closePath();
    ctx.fillStyle = SCR.vul; ctx.fill(); ctx.strokeStyle = rgba(SCR.rand, 0.6); ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = C.text2; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(o.tab, x + 40, y + tb - 13); ctx.letterSpacing = '0px'; }
  roundRect(ctx, x, y, w, h, 12); ctx.strokeStyle = SCR.rand; ctx.lineWidth = 1; ctx.stroke();
  ctx.font = `500 ${px}px ${F.meta}`; const cw = ctx.measureText('M').width;
  const B = { x: x + (nrs ? 104 : 36), y: y + tb + 22, w: w - (nrs ? 104 : 36) - 28, h: h - tb - 34 };
  const regelY = (i) => B.y + px * 0.86 + i * lh, kolX = (k) => B.x + k * cw;
  if (o.inhoud) { ctx.save(); ctx.beginPath(); ctx.rect(x + 1, y + tb, w - 2, h - tb - 1); ctx.clip(); o.inhoud({ x: x + 24, y: y + tb + 12, w: w - 48, h: h - tb - 24 }); ctx.restore(); }
  for (let i = 0; i < regels.length; i++) { const fa = clamp(zicht - i, 0, 1); if (fa <= 0.01) break;
    const isHl = hls.includes(i), la = fa * (hls.length && !isHl ? lerp(1, 0.35, dim) : 1), yy = regelY(i);
    ctx.save(); ctx.globalAlpha *= la;
    if (nrs) { ctx.font = fMeta(28); ctx.fillStyle = SCR.nr; ctx.textAlign = 'right'; ctx.fillText(String(i + 1), x + 72, yy); }
    ctx.font = `500 ${px}px ${F.meta}`; ctx.textAlign = 'left'; ctx.beginPath(); ctx.rect(B.x - 4, y + tb, x + w - 14 - (B.x - 4), h - tb); ctx.clip();
    for (const [k, s, soort] of _pyTokens(regels[i])) { ctx.fillStyle = SCR[soort]; ctx.fillText(s, kolX(k), yy); }
    ctx.restore();
    if (isHl && dim > 0.01) { ctx.save(); ctx.globalAlpha *= fa * dim; ctx.fillStyle = C.goud; ctx.fillRect(x + (nrs ? 86 : 14), yy - px * 0.9, 4, lh * 0.92); ctx.restore(); } }
  const kader = (lijst, col) => { for (const m of (lijst || [])) { const ma = m.a == null ? 1 : m.a; if (ma <= 0.01) continue; const yy = regelY(m.regel);
      ctx.save(); ctx.globalAlpha *= ma; roundRect(ctx, kolX(m.van) - 5, yy - px * 0.95, (m.tot - m.van) * cw + 10, px * 1.3, 6); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } };
  kader(o.merk, C.goud); kader(o.fout, C.koraal);
  if (o.cursor) { const on = Math.sin((o.t || 0) * 6.3) > -0.2; if (on) { const yy = regelY(o.cursor.regel); ctx.fillStyle = C.goud; ctx.fillRect(kolX(o.cursor.kol) + 2, yy - px * 0.85, cw * 0.55, px * 1.05); } }
  ctx.restore();
  return { binnen: B, regelY, kolX, cw, lh, px }; }
function sequentieRij(ctx, x, y, seq, o = {}) {
  const a = o.a == null ? 1 : o.a, s = o.s || 1, w = (o.w || 44) * s, h = (o.h || 52) * s, dx = o.dx || w + 6 * s, px = Math.round((o.px || 40) * s);
  const rna = !!o.rna, KL = rna ? RNA_KL : BASE_KL, LT = rna ? RNA_LT : BASE_LT, letters = o.letters !== false && px >= 28;
  const zicht = o.zicht == null ? Infinity : o.zicht, xs = [];
  if (a <= 0.01) { for (let i = 0; i < seq.length; i++) xs.push(x + i * dx); return xs; }
  ctx.save(); ctx.globalAlpha *= a; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 0; i < seq.length; i++) { const xi = x + i * dx; xs.push(xi); let fa = clamp(zicht - i, 0, 1); if (o.alpha) fa *= o.alpha(i);
    if (o.fadeX != null && xi > o.fadeX) fa *= clamp(1 - (xi - o.fadeX) / (o.fadeW || 200), 0, 1);
    if (fa <= 0.01) continue; const ch = seq[i]; ctx.save(); ctx.globalAlpha *= fa;
    if (ch === '-') { roundRect(ctx, xi - w / 2, y - h / 2, w, h, 8 * s); ctx.setLineDash([5 * s, 4 * s]); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(xi - w * 0.22, y); ctx.lineTo(xi + w * 0.22, y); ctx.lineWidth = 3 * s; ctx.lineCap = 'round'; ctx.stroke(); }
    else { const f = KL[ch] || C.fill, mk = o.mark ? o.mark(i) : null; roundRect(ctx, xi - w / 2, y - h / 2, w, h, 8 * s); shape(ctx, f, mk || lighten(f, 0.3), mk ? 3.5 : 1);
      if (letters) { ctx.font = fTekst(px, 700); ctx.fillStyle = LT[ch] || C.text; ctx.fillText(ch, xi, y + 2 * s); } }
    const hk = o.hl ? o.hl(i) : 0; if (hk > 0.01) { ctx.globalAlpha *= hk; roundRect(ctx, xi - w / 2 - 4, y - h / 2 - 4, w + 8, h + 8, 10 * s); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
    ctx.restore(); }
  ctx.restore(); return xs; }
function uitlijning(ctx, x, y, boven, onder, o = {}) {
  const a = o.a == null ? 1 : o.a, s = o.s || 1, h = (o.h || 52) * s, dx = o.dx || (o.w || 44) * s + 6 * s, tussen = (o.tussen || 40) * s;
  const kol = o.kol == null ? Infinity : o.kol, streep = o.streep == null ? 1 : o.streep, klopt = o.klopt || 0, y2 = y + h + tussen;
  const n = Math.max(boven.length, onder.length); let gelijk = 0, anders = 0, gaten = 0; const soort = [];
  for (let i = 0; i < n; i++) { const p = boven[i], q = onder[i]; let k = null; if (p && q) { if (p === '-' || q === '-') { k = 'gat'; gaten++; } else if (p === q) { k = 'gelijk'; gelijk++; } else { k = 'anders'; anders++; } } soort.push(k); }
  const xs = []; for (let i = 0; i < n; i++) xs.push(x + i * dx);
  if (a <= 0.01) return { xs, y1: y, y2, gelijk, anders, gaten, scoreY: y2 + h / 2 + 52 * s };
  ctx.save(); ctx.globalAlpha *= a;
  const mis = (i) => (i < kol && soort[i] === 'anders') ? C.koraal : null, opts = Object.assign({}, o, { a: 1, mark: mis });
  sequentieRij(ctx, x, y, boven, Object.assign({}, opts, { alpha: o.alpha1 })); sequentieRij(ctx, x, y2, onder, Object.assign({}, opts, { alpha: o.alpha2 }));
  if (o.namen) { metaText(ctx, o.namen[0], x - dx * 0.5 - 18, y + 10, C.text2, 'right', 28); metaText(ctx, o.namen[1], x - dx * 0.5 - 18, y2 + 10, C.text2, 'right', 28); }
  if (streep > 0.01) { ctx.save(); ctx.globalAlpha *= streep; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { if (soort[i] !== 'gelijk') continue; const f = clamp(kol - i, 0, 1); if (f <= 0.01) continue;
      ctx.strokeStyle = klopt > 0.5 ? C.groen : C.line; ctx.globalAlpha = a * streep * f; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xs[i], y + h / 2 + 7 * s); ctx.lineTo(xs[i], y2 - h / 2 - 7 * s); ctx.stroke(); }
    ctx.restore(); }
  const scoreY = y2 + h / 2 + 52 * s;
  if (o.score > 0.01) { ctx.save(); ctx.globalAlpha *= o.score; for (let i = 0; i < n; i++) { if (!soort[i]) continue; const f = clamp((o.scoreKol == null ? Infinity : o.scoreKol) - i, 0, 1); if (f <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= f; text(ctx, soort[i] === 'gelijk' ? '+1' : '−1', xs[i], scoreY, fMeta(28), soort[i] === 'gelijk' ? C.groen : C.koraal, 'center'); ctx.restore(); } ctx.restore(); }
  ctx.restore(); return { xs, y1: y, y2, gelijk, anders, gaten, scoreY }; }
function aaKralen(ctx, x, y, letters, o = {}) {
  const a = o.a == null ? 1 : o.a, r = o.r || 32, dx = o.dx || r * 2.6, zicht = o.zicht == null ? Infinity : o.zicht, xs = [];
  for (let i = 0; i < letters.length; i++) xs.push(x + i * dx); if (a <= 0.01) return xs;
  ctx.save(); ctx.globalAlpha *= a; const nz = Math.min(letters.length, Math.ceil(zicht));
  if (nz > 1) { ctx.strokeStyle = '#8A7550'; ctx.lineWidth = Math.max(3, r * 0.16); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs[0], y); ctx.lineTo(xs[0] + (Math.min(zicht, letters.length) - 1) * dx, y); ctx.stroke(); }
  for (let i = 0; i < nz; i++) { const f = clamp(zicht - i, 0, 1); if (f <= 0.01) continue; const L = letters[i], c = AA_KL[(L.charCodeAt(0) * 7) % AA_KL.length];
    ctx.save(); ctx.globalAlpha *= f; const rr = r * (0.6 + 0.4 * ease(f)); circ(ctx, xs[i], y, rr, c, o.fout ? C.koraal : lighten(c, 0.35), o.fout ? 4 : 1.5);
    if (i === o.hl) circ(ctx, xs[i], y, rr + 7, null, C.goud, 3);
    if (r >= 24) text(ctx, L, xs[i], y + r * 0.38, fTekst(Math.round(r * 1.1), 700), '#121A26', 'center'); ctx.restore(); }
  ctx.restore(); return xs; }
function resultatenLijst(ctx, x, y, w, rijen, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null; const zicht = o.zicht == null ? Infinity : o.zicht, rh = 76;
  const cG = x + w * 0.66, cT = x + w * 0.92; ctx.save(); ctx.globalAlpha *= a;
  metaText(ctx, 'soort', x, y, C.text2, 'left', 28); metaText(ctx, 'gelijk', cG, y, C.text2, 'right', 28); metaText(ctx, 'toeval', cT, y, C.text2, 'right', 28);
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + 18); ctx.lineTo(x + w, y + 18); ctx.stroke();
  const rowY = (i) => y + 72 + i * rh;
  for (let i = 0; i < rijen.length; i++) { const f = clamp(zicht - i, 0, 1); if (f <= 0.01) continue; const R = rijen[i], yy = rowY(i);
    ctx.save(); ctx.globalAlpha *= f;
    if (R.verdacht) { roundRect(ctx, x - 16, yy - 46, w + 32, 64, 10); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); }
    text(ctx, R.soort, x, yy, fTekst(36, R.best ? 700 : 600), R.best ? C.groen : C.text, 'left');
    text(ctx, R.gelijk, cG, yy, fTekst(36, 700), R.best ? C.groen : C.text, 'right');
    text(ctx, R.toeval, cT, yy, fTekst(36, 600), C.text2, 'right'); ctx.restore(); }
  const hlK = (naam, cx, al) => { roundRect(ctx, cx - 190, y - 40, 210, 60 + Math.min(rijen.length, zicht) * rh, 12); ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  if (o.kolHl === 'gelijk' && (o.kolA == null || o.kolA > 0.01)) hlK('gelijk', cG + 10, o.kolA == null ? 1 : o.kolA);
  if (o.kolHl === 'toeval' && (o.kolA == null || o.kolA > 0.01)) hlK('toeval', cT + 10, o.kolA == null ? 1 : o.kolA);
  const bi = rijen.findIndex(R => R.best); if (bi >= 0 && o.haak > 0.01) { const yy = rowY(bi); ctx.save(); ctx.globalAlpha *= o.haak; ctx.strokeStyle = C.groen; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 24, yy - 40); ctx.lineTo(x - 38, yy - 40); ctx.lineTo(x - 38, yy + 10); ctx.lineTo(x - 24, yy + 10); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { rowY, cG, cT }; }
// — einde reeksobject —

function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// opeenvolgende fasen: elke fase verdwijnt als de volgende komt (eerst weg, dan nieuw)
function fasen(q, cues, d = 0.6) { const on = cues.map(c => c ? q.on(c[0], c[1] || 1, d) : 1); return on.map((v, i) => v * (i + 1 < on.length ? 1 - on[i + 1] : 1)); }
function zacht(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
const MONO = (px, w = 500) => `${w} ${px}px ${F.meta}`;

// ---------------- reeksobject: scherm met code / sequenties ----------------
const BASE_K = BASE_KL, BASE_L = BASE_LT; // reeksobject-tinten
function scherm(ctx, x, y, w, h, tab, o = {}) { const a = o.a == null ? 1 : o.a; const B = { x: x + 24, y: y + 66, w: w - 48, h: h - 78 }; if (a <= 0.01) return B;
  codeScherm(ctx, x, y, w, h, [], { tab, a, inhoud: () => {} }); return B; }
function tegel(ctx, x, y, b, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const w = o.w || 44, h = o.h || 52, c = BASE_K[b] || C.fill;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 8); shape(ctx, c, o.rand || lighten(c, 0.3), o.rand ? 4 : 1.2);
  ctx.font = MONO(o.px || 36, 700); ctx.fillStyle = BASE_L[b] || C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b, x, y + 2); ctx.restore(); }
// één regel in de variantenlijst: chromosoom · plek · referentie → meisje
function varRij(ctx, x, y, chr, plek, ref, alt, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (o.hl) { roundRect(ctx, x - 12, y - 30, o.w || 640, 60, 8); shape(ctx, rgba(C.goud, 0.14 * o.hl), rgba(C.goud, o.hl), 2); ctx.fillStyle = C.goud; ctx.fillRect(x - 12, y - 30, 4, 60); }
  ctx.font = MONO(30); ctx.fillStyle = C.text2; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(chr, x, y + 2);
  ctx.fillStyle = C.text; ctx.fillText(plek, x + 110, y + 2);
  tegel(ctx, x + 400, y, ref, { w: 40, h: 46, px: 30 }); ctx.fillStyle = C.text2; ctx.font = fTekst(30, 600); ctx.textAlign = 'center'; ctx.fillText('→', x + 452, y + 2); tegel(ctx, x + 504, y, alt, { w: 40, h: 46, px: 30, rand: o.altRand });
  ctx.restore(); }
function rijData(i) { const ch = 1 + Math.floor(hash(i * 3.7 + 1) * 22), p = Math.floor(1e6 + hash(i * 5.3 + 2) * 1.4e8), B = 'ACGT', r = B[Math.floor(hash(i * 1.9 + 3) * 4)]; let al = B[Math.floor(hash(i * 2.3 + 4) * 4)]; if (al === r) al = B[(B.indexOf(r) + 2) % 4];
  return ['chr' + ch, p.toLocaleString('nl-NL').replace(/\./g, ' '), r, al]; }
// rollende variantenlijst in een schermvak; off = hoeveel regels er al voorbij zijn
function rolLijst(ctx, box, off, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const lh = 62; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(box.x - 14, box.y, box.w + 28, box.h); ctx.clip();
  const i0 = Math.floor(off), fr = off - i0, n = Math.ceil(box.h / lh) + 1;
  for (let k = 0; k < n; k++) { const i = i0 + k, d = rijData(i + (o.seed || 0)); varRij(ctx, box.x + 10, box.y + 34 + (k - fr) * lh, d[0], d[1], d[2], d[3], { hl: o.hl && o.hl(i) || 0, w: box.w - 4 }); }
  ctx.restore(); }
function kolomKoppen(ctx, box, a = 1) { metaA(ctx, 'chromosoom · plek', box.x + 10, box.y - 4, a, C.text2, 'left', 28); metaA(ctx, 'ref. → meisje', box.x + 380, box.y - 4, a, C.text2, 'left', 28); }

// ---------------- spreekkamer (lijntekening, nieuw) ----------------
function spreekkamer(ctx, o = {}) { const { a = 1, x0 = 300, x1 = 1060, top = 640, map = 1, tekening = 1, stoelen = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 800); ctx.lineTo(W - 60, 800); ctx.stroke(); // vloer
  if (stoelen) for (const sx of [x0 - 70, x1 + 70]) { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; const d = sx < x0 ? -1 : 1; ctx.beginPath(); ctx.moveTo(sx + d * 40, 560); ctx.lineTo(sx + d * 40, 800); ctx.moveTo(sx - d * 40, 700); ctx.lineTo(sx - d * 40, 800); ctx.moveTo(sx - d * 44, 700); ctx.lineTo(sx + d * 44, 700); ctx.stroke(); }
  roundRect(ctx, x0, top, x1 - x0, 18, 6); shape(ctx, '#5A6A84', '#AFC0D0', 2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 + 30, top + 18); ctx.lineTo(x0 + 30, 800); ctx.moveTo(x1 - 30, top + 18); ctx.lineTo(x1 - 30, 800); ctx.stroke();
  if (tekening > 0.01) kinderTekening(ctx, x0 + 120, top - 8, 1, tekening);
  if (map > 0.01) dossierMap(ctx, x1 - 230, top - 8, 1, map);
  ctx.restore(); }
// dichte dossiermap op tafel (zijaanzicht van bovenaf gekanteld), zonder naam
function dossierMap(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(90, 0); ctx.lineTo(110, -34); ctx.lineTo(-70, -34); ctx.closePath(); shape(ctx, C.oker, lighten(C.oker, 0.3), 1.5);
  ctx.fillStyle = '#F2EEE4'; ctx.beginPath(); ctx.moveTo(-80, -6); ctx.lineTo(84, -6); ctx.lineTo(100, -30); ctx.lineTo(-62, -30); ctx.closePath(); ctx.globalAlpha *= 0.35; ctx.fill(); ctx.restore(); }
// kindertekening: blad met huisje en zon, plat op tafel
function kinderTekening(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-80, 0); ctx.lineTo(80, 0); ctx.lineTo(96, -40); ctx.lineTo(-64, -40); ctx.closePath(); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5);
  ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#D8573F'; ctx.beginPath(); ctx.moveTo(-34, -8); ctx.lineTo(-30, -24); ctx.lineTo(-6, -24); ctx.lineTo(-10, -8); ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-34, -24); ctx.lineTo(-16, -34); ctx.lineTo(-2, -24); ctx.stroke(); ctx.strokeStyle = '#E0B64A'; ctx.beginPath(); ctx.ellipse(48, -26, 9, 5, 0, 0, 6.283); ctx.stroke();
  for (let i = 0; i < 6; i++) { const an = i * 1.05; ctx.beginPath(); ctx.moveTo(48 + Math.cos(an) * 13, -26 + Math.sin(an) * 7); ctx.lineTo(48 + Math.cos(an) * 19, -26 + Math.sin(an) * 10); ctx.stroke(); }
  ctx.strokeStyle = '#5FA86E'; ctx.beginPath(); ctx.moveTo(-60, -6); ctx.lineTo(70, -6); ctx.stroke(); ctx.restore(); }
// staande kaart op tafel: groot, zodat je de tekening herkent (cold open)
function kinderTekeningGroot(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.06);
  roundRect(ctx, -130, -100, 260, 200, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#D8573F'; ctx.beginPath(); ctx.moveTo(-90, 60); ctx.lineTo(-86, -4); ctx.lineTo(-10, -2); ctx.lineTo(-14, 62); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-100, 0); ctx.lineTo(-48, -48); ctx.lineTo(2, 0); ctx.stroke();
  ctx.strokeStyle = '#5BA4C9'; ctx.strokeRect(-70, 14, 22, 22); ctx.strokeStyle = '#8C5A3A'; ctx.strokeRect(-38, 26, 16, 34);
  ctx.strokeStyle = '#E0B64A'; ctx.beginPath(); ctx.arc(70, -50, 22, 0, 6.283); ctx.stroke(); for (let i = 0; i < 8; i++) { const an = i * 0.785; ctx.beginPath(); ctx.moveTo(70 + Math.cos(an) * 30, -50 + Math.sin(an) * 30); ctx.lineTo(70 + Math.cos(an) * 42, -50 + Math.sin(an) * 42); ctx.stroke(); }
  ctx.strokeStyle = '#5FA86E'; ctx.beginPath(); ctx.moveTo(-118, 66); ctx.quadraticCurveTo(0, 56, 118, 68); ctx.stroke();
  ctx.strokeStyle = '#8C7BBF'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(50, 30, 10, 0, 6.283); ctx.moveTo(50, 40); ctx.lineTo(50, 66); ctx.moveTo(36, 50); ctx.lineTo(64, 50); ctx.stroke(); // poppetje getekend door het kind
  ctx.restore(); }

// ---------------- stamboomschema (stijl Erfelijkheid 6) ----------------
// vierkant = vader, rondje = moeder, ingekleurd rondje = het meisje (aangedaan). streep: {v:[..], m:[..], k:[..]} gekleurde streepjes per persoon.
function stamboom(ctx, x, y, s = 1, o = {}) { const { a = 1, aO = 1, aK = 1, leeftijd = '4 jaar', labels = 0, gezond = 0, streep = null, kruisV = 0, rec = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const r = 46, vx = -150, mx = 150, ky = 200;
  zacht(ctx, aO, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vx + r, 0); ctx.lineTo(mx - r, 0); ctx.stroke();
    roundRect(ctx, vx - r, -r, 2 * r, 2 * r, 4); shape(ctx, C.bgSchema, C.text, 3); circ(ctx, mx, 0, r, C.bgSchema, C.text, 3);
    if (labels > 0.01) { metaA(ctx, 'vader', vx, -r - 18, labels, C.text2, 'center', Math.round(28 / s)); metaA(ctx, 'moeder', mx, -r - 18, labels, C.text2, 'center', Math.round(28 / s)); }
    if (gezond > 0.01) { regel(ctx, 'gezond', 0, -16, gezond, C.groen, 30, 'center', 700); } });
  zacht(ctx, aK, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, ky - r); ctx.stroke();
    circ(ctx, 0, ky, r, C.paars, C.text, 3); if (leeftijd) metaA(ctx, leeftijd, r + 22, ky + 10, 1, C.text2, 'left', Math.round(28 / s)); });
  if (streep) { const rij = (xx, yy, arr) => arr.forEach((c, i) => { if (!c || (c.a != null && c.a <= 0.01)) return; const bx = xx - (arr.length - 1) * 13 + i * 26; zacht(ctx, c.a == null ? 1 : c.a, () => { roundRect(ctx, bx - 6, yy, 12, 40, 4); shape(ctx, c.col, lighten(c.col, 0.3), 1.2); if (c.kruis) kruis(ctx, bx, yy + 20, 16, c.kruis); if (c.ring) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, bx - 11, yy - 5, 22, 50, 6); ctx.globalAlpha *= c.ring; ctx.stroke(); } }); });
    zacht(ctx, aO, () => { rij(vx, r + 22, streep.v || []); rij(mx, r + 22, streep.m || []); }); zacht(ctx, aK, () => rij(0, ky + r + 22, streep.k || [])); }
  ctx.restore(); }

// ---------------- bloed, sequencer, referentiegenoom ----------------
function buisje(ctx, x, y, lab, a = 1, vul = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 110, 44, 140, 20); shape(ctx, rgba('#AFC0D0', 0.12), '#AFC0D0', 2);
  ctx.save(); roundRect(ctx, x - 22, y - 110, 44, 140, 20); ctx.clip(); ctx.fillStyle = rgba(C.koraal, 0.85); ctx.fillRect(x - 22, y + 30 - 100 * vul, 44, 100 * vul); ctx.restore();
  roundRect(ctx, x - 26, y - 128, 52, 26, 6); shape(ctx, '#8C7BBF', null); roundRect(ctx, x - 20, y - 70, 40, 34, 4); shape(ctx, '#F2EEE4', null);
  regel(ctx, lab, x, y + 76, 1, C.text, 32, 'center', 600); ctx.restore(); }
function sequencer(ctx, x, y, a = 1, t = 0, loopt = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 110, y - 130, 220, 260, 18); shape(ctx, '#2A3A58', C.line, 2);
  roundRect(ctx, x - 80, y - 100, 160, 70, 8); shape(ctx, C.bgMicro, rgba(C.line, 0.6), 1.5); for (let i = 0; i < 4; i++) { const w = 30 + 90 * hash(i + Math.floor(t * 3 * loopt)); ctx.fillStyle = rgba(C.paars, 0.8); ctx.fillRect(x - 66, y - 88 + i * 14, w, 6); }
  roundRect(ctx, x - 60, y + 20, 120, 24, 8); shape(ctx, C.kast, rgba(C.line, 0.6), 1.5); circ(ctx, x + 70, y + 90, 10, loopt > 0.5 && Math.sin(t * 6) > 0 ? C.groen : '#3A4458');
  ctx.restore(); }
// kort leesstukje (read): reeks basen als gekleurde streepjes
function leesStukje(ctx, x, y, n, seed, a = 1, w = 12) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const B = 'ACGT'; for (let i = 0; i < n; i++) { ctx.fillStyle = BASE_K[B[Math.floor(hash(seed * 13 + i) * 4)]]; ctx.fillRect(x + i * w, y - 7, w - 2, 14); } ctx.restore(); }
function referentie(ctx, x0, x1, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - 9, x1 - x0, 18, 9); shape(ctx, '#5A6478', '#8FA0B5', 1.5); ctx.restore(); }

// ---------------- trechter met drie filters (nieuw, voor de bibliotheek) ----------------
const TR_NAMEN = ['verandert het eiwit?', 'zeldzaam?', 'past bij de familie?'];
function trechter(ctx, cx, y, o = {}) { const { a = 1, s = 1, lagen = [1, 1, 1], hl = -1, aantal = ['ruim 4 000 000', 'ongeveer 10 000', 'een paar honderd', '1'], aA = [1, 0, 0, 0], uit = 0, namen = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, y); ctx.scale(s, s);
  const Wd = [500, 360, 230, 110], bh = 150;
  if (aA[0] > 0.01) regel(ctx, aantal[0], 0, -26, aA[0], C.text, Math.round(Math.max(40, 36 / s)), 'center', 700);
  for (let i = 0; i < 3; i++) { const v = lagen[i]; if (v <= 0.01) continue; zacht(ctx, v, () => { const y0 = i * (bh + 14), w0 = Wd[i], w1 = Wd[i + 1], on = i === hl;
      ctx.beginPath(); ctx.moveTo(-w0 / 2, y0); ctx.lineTo(w0 / 2, y0); ctx.lineTo(w1 / 2, y0 + bh); ctx.lineTo(-w1 / 2, y0 + bh); ctx.closePath(); shape(ctx, on ? rgba(C.goud, 0.18) : rgba(C.fill, 0.75), on ? C.goud : C.line, on ? 3 : 1.5);
      // zeefgaatjes
      ctx.fillStyle = rgba(on ? C.goud : C.line, 0.45); for (let k = 0; k < 7; k++) circ(ctx, -w1 / 2 + 14 + k * (w1 - 28) / 6, y0 + bh - 18, 4, ctx.fillStyle);
      if (namen > 0.01) { ctx.save(); ctx.globalAlpha *= namen; metaText(ctx, 'filter ' + (i + 1), 0, y0 + 50, on ? C.goud : C.text2, 'center', Math.round(28 / s)); const nm = TR_NAMEN[i], breed = lerp(w0, w1, 0.65) - 24; let px = Math.round(36 / s); ctx.font = fTekst(px, 600); const bw = ctx.measureText(nm).width; if (bw > breed) px = Math.max(Math.round(28 / s), Math.floor(px * breed / bw)); text(ctx, nm, 0, y0 + 98, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
      if (aA[i + 1] > 0.01) regel(ctx, aantal[i + 1], Wd[i] / 2 + 30, y0 + bh - 10, aA[i + 1], i === 2 ? C.goud : C.text, Math.round(36 / s), 'left', 700); }); }
  if (uit > 0.01) zacht(ctx, uit, () => { const yy = 3 * (bh + 14) + 30; roundRect(ctx, -8, yy, 16, 48, 5); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.5); });
  ctx.restore(); }

// ---------------- codon → aminozuur (zoals Mutaties) ----------------
function aaKraal(ctx, x, y, r, lab, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, col, lighten(col, 0.35), 1.5); if (lab) text(ctx, lab, x, y + r * 0.36, fTekst(Math.round(r * 0.95), 700), C.bgMicro, 'center'); ctx.restore(); }
function stopKraal(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 8; k++) { const an = k / 8 * 6.283 + 0.39; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 1.5); text(ctx, 'stop', x, y + 9, fTekst(26, 800), C.bgMicro, 'center'); ctx.restore(); }
function codonRij(ctx, x, y, cod, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; for (let i = 0; i < 3; i++) tegel(ctx, x + i * 50, y, cod[i], { a, rand: o.mark === i ? C.koraal : null }); }

// ---------------- databankkast met telpoppetjes ----------------
function telpop(ctx, x, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(x, y - h * 0.82, h * 0.16, 0, 6.283); ctx.fill(); roundRect(ctx, x - h * 0.22, y - h * 0.62, h * 0.44, h * 0.62, h * 0.16); ctx.fill(); ctx.restore(); }
function databank(ctx, x, y, o = {}) { const { a = 1, aan = -1, aanA = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 620, 250, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  for (let r = 0; r < 2; r++) { ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 20, y + 120 + r * 0); ctx.lineTo(x + 600, y + 120); ctx.stroke(); }
  for (let i = 0; i < 10; i++) { const px = x + 70 + (i % 5) * 120, py = y + 105 + Math.floor(i / 5) * 118; const on = i === aan ? aanA : 0; telpop(ctx, px, py, 84, on > 0.5 ? C.goud : C.mens, 1); }
  ctx.restore(); }

// ---------------- vijfvaksschaal (nieuw, voor de bibliotheek) ----------------
const VV = [['onschuldig', ''], ['waarschijnlijk', 'onschuldig'], ['onbekende', 'betekenis'], ['waarschijnlijk', 'ziekmakend'], ['ziekmakend', '']];
const VV_K = [C.groen, '#B4D9BC', '#8A93A3', '#EDB6A6', C.koraal];
function vijfvak(ctx, x, y, o = {}) { const { a = 1, bw = 280, h = 110, streep = -1, aStreep = 0, hl = -1, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 5; i++) { const xx = x + i * (bw + 12), on = i === hl; roundRect(ctx, xx, y, bw, h, 12); shape(ctx, rgba(VV_K[i], on ? 0.55 : 0.28), on ? C.goud : VV_K[i], on ? 4 : 2);
    if (labels > 0.01) { regel(ctx, VV[i][0], xx + bw / 2, y + h + 46, labels, C.text, 34, 'center', 600); if (VV[i][1]) regel(ctx, VV[i][1], xx + bw / 2, y + h + 86, labels, C.text, 34, 'center', 600); } }
  if (aStreep > 0.01 && streep >= 0) zacht(ctx, aStreep, () => { const sx = x + streep * (bw + 12) + bw / 2; roundRect(ctx, sx - 9, y + 18, 18, h - 36, 5); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.5); });
  ctx.restore(); }

// ---------------- wereldbol (bibliotheek: aarde uit Van molecuul tot biosfeer) met vaste stand en stippen ----------------
function bolPunt(cx, cy, r, lon, lat, lonC = 12, latC = 22) { const d = Math.PI / 180, dl = (lon - lonC) * d, la = lat * d, lc = latC * d;
  const zx = Math.cos(la) * Math.sin(dl), zy = Math.cos(lc) * Math.sin(la) - Math.sin(lc) * Math.cos(la) * Math.cos(dl), vis = Math.sin(lc) * Math.sin(la) + Math.cos(lc) * Math.cos(la) * Math.cos(dl);
  return { x: cx + r * zx, y: cy - r * zy, zicht: vis > 0.05 }; }
function aardeVast(ctx, x, y, r, a = 1, lonC = 12, latC = 22) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sc = Math.min(1, 300 / r), R = Math.round(r * sc);
  const img = aardeBeeld(R, lonC, latC, lonC + 40); ctx.imageSmoothingEnabled = true; ctx.drawImage(img, x - r, y - r, 2 * r, 2 * r);
  ctx.strokeStyle = 'rgba(160,205,255,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function artsIcoon(ctx, x, y, s = 1, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 30 * s, y - 30 * s, 60 * s, 60 * s, 12 * s); shape(ctx, '#F2EEE4', hl > 0.5 ? C.goud : '#B8B0A0', hl > 0.5 ? 4 : 2);
  ctx.fillStyle = C.teal; ctx.fillRect(x - 6 * s, y - 20 * s, 12 * s, 40 * s); ctx.fillRect(x - 20 * s, y - 6 * s, 40 * s, 12 * s); ctx.restore(); }

// ---------------- kalender 'over een paar jaar' ----------------
function jaarKalender(ctx, x, y, s = 1, a = 1, blad = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 2; k >= 0; k--) { const off = k * 14; roundRect(ctx, -130 + off, -110 - off, 260, 230, 14); shape(ctx, k ? '#C9C2B4' : '#F2EEE4', '#B8B0A0', 2); }
  ctx.fillStyle = C.koraal; ctx.fillRect(-130, -110, 260, 50); for (const kx of [-70, 70]) { roundRect(ctx, kx - 8, -128, 16, 36, 6); shape(ctx, '#8FA0B5', null); }
  ctx.fillStyle = '#9A9284'; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) ctx.fillRect(-104 + c * 38, -36 + r * 36, 22, 16);
  if (blad > 0.01) { ctx.save(); ctx.globalAlpha *= blad; circ(ctx, 86, 92, 26, null, C.goud, 5); ctx.restore(); }
  ctx.restore(); }

// ---------------- GWAS: stipjesgrafiek langs de chromosomen (nieuw, voor de bibliotheek) ----------------
const MH = (() => { const P = []; for (let i = 0; i < 2600; i++) { const ch = Math.floor(i / 2600 * 22), u = Math.max(1e-6, hash(i * 1.37 + 9)); P.push([i / 2600 + 0.004 * (hash(i * 4.1) - 0.5), -Math.log10(u), ch]); } return P; })();
function manhattan(ctx, x, y, w, h, o = {}) { const { a = 1, u = 1, laag = 0, hoog = 0, boven = 0, ymax = 9, toren = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba('#FFFFFF', 0.03); for (let k = 1; k <= 4; k++) ctx.fillRect(x, y + h - k * h / 4.5, w, 1);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  metaText(ctx, 'chromosoom 1 … 22', x + w, y + h + 40, C.text2, 'right', 28); metaText(ctx, '↑ sterker verband', x + 10, y - 14, C.text2, 'left', 28);
  const Y = (v) => y + h - Math.min(v, ymax) / ymax * h, n = Math.floor(MH.length * u), yl = Y(1.3);
  for (let i = 0; i < n; i++) { const [px, v, ch] = MH[i], sx = x + 8 + px * (w - 16), sy = Y(v); const up = laag > 0.5 && v > 1.3 && boven > 0;
    ctx.fillStyle = up ? rgba(C.koraal, 0.4 + 0.6 * boven) : (ch % 2 ? '#7E8AA0' : C.teal); ctx.fillRect(sx - 2.5, sy - 2.5, 5, 5); }
  if (toren > 0.01) zacht(ctx, toren, () => { const tx = x + 8 + 0.62 * (w - 16); for (let k = 0; k < 40; k++) { const dx = (hash(k * 3.3) - 0.5) * 30, v = 1 + 8.2 * Math.exp(-Math.pow(dx / 9, 2)) * hash(k * 7.7 + 1); ctx.fillStyle = v > 7.3 ? C.goud : C.teal; ctx.fillRect(tx + dx - 2.5, Y(v) - 2.5, 5, 5); } });
  if (laag > 0.01) zacht(ctx, laag, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(x, yl); ctx.lineTo(x + w, yl); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'grens 0,05', x + w + 14, yl + 10, C.koraal, 'left', 28); });
  if (hoog > 0.01) zacht(ctx, hoog, () => { const yh = Y(7.3); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yh); ctx.lineTo(x + w, yh); ctx.stroke(); metaText(ctx, '0,05 / 1 000 000', x + w + 14, yh + 10, C.groen, 'left', 28); });
  metaText(ctx, 'schematisch', x + w, y + h + 84, C.text2, 'right', 28);
  ctx.restore(); }

// ---------------- DNA-strook met genen en plekken ----------------
function dnaStrook(ctx, x, y, w, o = {}) { const { a = 1, genen = [], plekken = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - 10, w, 20, 10); shape(ctx, rgba(C.paars, 0.3), rgba(C.paars, 0.7), 1.5);
  genen.forEach(([g0, g1, nm, ga]) => zacht(ctx, ga == null ? 1 : ga, () => { roundRect(ctx, x + g0 * w, y - 22, (g1 - g0) * w, 44, 10); shape(ctx, rgba(C.paars, 0.75), lighten(C.paars, 0.35), 2); if (nm) regel(ctx, nm, x + (g0 + g1) / 2 * w, y + 8, 1, C.text, 28, 'center', 700); }));
  plekken.forEach(p => zacht(ctx, p.a == null ? 1 : p.a, () => { const px = x + p.x * w; roundRect(ctx, px - 6, y - 34, 12, 68, 4); shape(ctx, p.col || C.goud, lighten(p.col || C.goud, 0.3), 1.2); }));
  ctx.restore(); }

// ---------------- polygene risicoscore als balk van kleine blokjes (nieuw, voor de bibliotheek) ----------------
function scoreBalk(ctx, x, y, w, o = {}) { const { a = 1, u = 1, n = 60, h = 64 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); let xx = x + 6; const tot = Array.from({ length: n }, (_, i) => 0.4 + hash(i * 2.9 + 5)).reduce((p, c) => p + c, 0);
  for (let i = 0; i < n; i++) { const bw = (0.4 + hash(i * 2.9 + 5)) / tot * (w - 12); const k = clamp(u * n - i, 0, 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; ctx.fillStyle = i % 3 === 0 ? '#6C5BA8' : i % 3 === 1 ? '#9F90D4' : '#8C7BBF'; ctx.fillRect(xx + 1, y + 8 + (1 - k) * 30, Math.max(1, bw - 2), h - 16); ctx.restore(); } xx += bw; }
  ctx.restore(); }
// verdeling van de scores van anderen, met 'jij'
function scoreVerdeling(ctx, x, y, w, h, o = {}) { const { a = 1, jij = 0.72, aJ = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, v = Math.exp(-Math.pow((u - 0.5) / 0.17, 2) / 2); i ? ctx.lineTo(x + u * w, y + h - v * h * 0.9) : ctx.moveTo(x + u * w, y + h - v * h * 0.9); } ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); shape(ctx, rgba(C.paars, 0.25), C.paars, 2);
  metaText(ctx, 'lager', x, y + h + 40, C.text2, 'left', 28); metaText(ctx, 'hoger', x + w, y + h + 40, C.text2, 'right', 28); metaText(ctx, 'scores van anderen', x + w / 2, y - 16, C.text2, 'center', 28);
  if (aJ > 0.01) zacht(ctx, aJ, () => { const jx = x + jij * w; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(jx, y + 20); ctx.lineTo(jx, y + h); ctx.stroke(); regel(ctx, 'jij', jx, y + 8, 1, C.goud, 34, 'center', 700); });
  ctx.restore(); }

// ---------------- gang van de afdeling (lijntekening) ----------------
function afdelingGang(ctx, a = 1, deuren = [720, 1500]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 800); ctx.lineTo(W - 60, 800); ctx.stroke();
  ctx.strokeStyle = rgba('#AFC0D0', 0.55); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 560); ctx.lineTo(W - 60, 560); ctx.stroke(); // leuning
  for (const dx of deuren) { roundRect(ctx, dx, 330, 190, 470, 6); shape(ctx, rgba('#5A6A84', 0.35), rgba('#AFC0D0', 0.55), 2); roundRect(ctx, dx + 50, 380, 90, 110, 6); shape(ctx, rgba('#9FC3E8', 0.2), rgba('#AFC0D0', 0.55), 2); circ(ctx, dx + 160, 580, 8, rgba('#AFC0D0', 0.7)); }
  ctx.restore(); }
function hartje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -30, -55, 0, -25); ctx.bezierCurveTo(30, -55, 60, -10, 0, 30); ctx.closePath(); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 2); ctx.restore(); }

// ---------------- recap: opleidingen en werkplekken ----------------
// tweeRegels = true: naam en waar zijn samen de naam (twee regels vet), voor lange opleidingsnamen
function opleiding(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal, tweeRegels = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 28);
  const pxN = (s2) => { ctx.font = fTekst(36, 700); return ctx.measureText(s2).width > w - 52 ? 32 : 36; };
  text(ctx, naam, x + 26, y + 88, fTekst(pxN(naam), 700), C.text, 'left');
  if (tweeRegels) text(ctx, waar, x + 26, y + 130, fTekst(pxN(waar), 700), C.text, 'left'); else text(ctx, waar, x + 26, y + 130, fTekst(30, 600), C.text2, 'left'); ctx.restore(); }
function werkIcoon(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 60, 120, 120, 18); shape(ctx, rgba(C.fill, 0.7), C.line, 2);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'ziekenhuis') { ctx.strokeRect(x - 34, y - 26, 68, 58); ctx.fillStyle = C.koraal; ctx.fillRect(x - 5, y - 18, 10, 30); ctx.fillRect(x - 15, y - 8, 30, 10); ctx.beginPath(); ctx.moveTo(x - 40, y - 26); ctx.lineTo(x, y - 44); ctx.lineTo(x + 40, y - 26); ctx.stroke(); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 10, y - 38); ctx.lineTo(x - 10, y - 8); ctx.lineTo(x - 32, y + 32); ctx.lineTo(x + 32, y + 32); ctx.lineTo(x + 10, y - 8); ctx.lineTo(x + 10, y - 38); ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.7); ctx.beginPath(); ctx.moveTo(x - 22, y + 14); ctx.lineTo(x + 22, y + 14); ctx.lineTo(x + 30, y + 30); ctx.lineTo(x - 30, y + 30); ctx.fill(); }
  if (soort === 'bedrijf') { ctx.beginPath(); ctx.moveTo(-40 + x, 34 + y); ctx.lineTo(-40 + x, -6 + y); ctx.lineTo(-14 + x, 8 + y); ctx.lineTo(-14 + x, -6 + y); ctx.lineTo(12 + x, 8 + y); ctx.lineTo(12 + x, -34 + y); ctx.lineTo(28 + x, -34 + y); ctx.lineTo(28 + x, -6 + y); ctx.lineTo(40 + x, -6 + y); ctx.lineTo(40 + x, 34 + y); ctx.closePath(); ctx.stroke(); }
  ctx.restore(); }

// ---------------- wereldbol: letterlijk overgenomen uit cellen/van-molecuul-tot-biosfeer (bibliotheek, Natural Earth) ----------------
// ---------- aarde: echte wereldbol met continenten (22 okt 2026) ----------
// Landvormen: Natural Earth 1:50m (publiek domein, via world-atlas), vereenvoudigd tot ±0,2°, delta-gecodeerd in tienden van graden.
const AARDE_LAND = '1432,-120,6,-23,7,1,8,-7,1,-15,5,-5,5,-21,24,-13,9,-21,3,-2,1,4,6,-2,1,-11,10,-6,14,-19,-1,-12,5,-15,-7,-27,-4,-10,-12,-12,-11,-22,-3,-17,-20,-4,-10,-8,-7,0,2,-4,-10,6,1,3,-8,-1,4,2,-2,2,-14,-9,-21,4,-16,12,-1,8,-7,8,3,0,0,2,-11,-2,3,6,-4,8,-4,-9,-8,-1,1,3,4,0,5,13,-1,10,-6,-10,-8,-4,-5,-7,1,-3,-4,1,-5,3,3,0,-2,6,-5,7,-4,1,-1,7,-31,10,-52,-8,-17,-7,-7,-9,-36,-1,-20,-11,-14,1,-15,7,0,8,4,-1,3,4,0,15,-6,11,-2,15,-17,29,6,-3,-4,9,3,-5,5,-2,-8,19,6,25,1,-6,6,7,20,11,7,0,36,11,13,15,0,10,7,7,6,-11,3,6,-4,4,1,3,12,-2,-4,1,2,4,-2,4,7,1,-3,2,6,1,-2,4,4,4,1,-2,3,0,1,5,5,-2,3,5,6,-3,7,-7,-1,-6,5,5,10,-3,2,3,-4,4,12,20,3,-2,4,5,1,-2,13,2,0,5,-7,4,30,-10,9,4,-2,-4,4,-2,4,4,4,-3,-4,-9,-6,-1,1,-6,-5,-10,27,-18,8,-2,2,-4,13,-3,9,15,1,23,7,29,4,2,3,-11,3,-2;216,786,19,-4,-4,-2,18,-2,-21,-5,-4,0,3,3,-18,-1,8,4,-15,6,14,1;-981,-719,-1,-2,6,2,3,-3,4,3,8,0,-9,-3,14,1,0,-3,-5,-2,-62,5,42,2;-1800,715,25,-2,-19,-4,3582,-1,-1,3,12,4,-3599,0;1519,-43,5,0,-3,-12,-16,-8,-8,0,-14,6,15,2,3,5,1,-5,5,0,10,6,-1,7,3,-1;1273,-84,-19,-9,-10,-8,-8,-2,1,7,15,10,21,2;1450,-408,13,-4,19,3,1,-13,-1,2,-2,-3,0,-9,-7,4,-4,-8,-9,1,2,2,-7,4,-3,7,3,-2,-7,10,-1,7,3,-1;965,811,14,-3,-8,-2,3,-3,-2,-1,-35,-2,-22,4,13,2,5,2,-7,0,8,2,18,3,13,-2;977,802,3,-2,-3,-2,9,3,15,-3,-4,-5,-7,0,9,-3,-5,-2,-44,3,-19,4,19,6,27,1;1029,793,-5,-5,14,3,13,-3,2,-3,-60,-5,23,13,13,0;1401,758,7,-2,7,5,39,-6,-14,-5,-12,3,1,4,-6,0,-1,-3,9,-4,-34,0,-6,-3,-21,5,3,1,0,4,15,5,13,-4;1468,754,40,-2,-10,-4,-15,0,-22,4,3,4,4,-2;1733,-349,10,-3,5,-11,-1,-5,8,-4,0,7,6,-11,12,-4,7,4,5,-1,-6,-15,-8,0,-3,-10,-15,-14,-7,3,6,11,-14,9,8,5,3,10,-3,7,3,0,-4,2,-3,4,2,-1,0,4,-5,3,2,-5,-7,9,2,2,-2,-2,-3,3,-4,7,3,1,3,-5;1731,-413,12,3,-3,-2,4,1,-3,-3,2,-3,-17,-16,5,-6,-11,2,2,-2,-10,-4,-4,-16,-17,-7,-26,6,5,3,-3,2,5,1,-2,3,14,10,26,12,13,21,6,3,-2,-2,4,-6;1260,93,6,-21,-4,-3,0,-6,-5,10,-3,-6,3,-7,-4,-4,-1,5,-3,-2,-8,5,1,10,-5,4,-3,-4,-8,4,-5,-9,-2,2,3,8,12,8,5,-3,-1,-4,9,6,2,4,6,0,0,8,5,-5;1211,186,7,-3,5,2,-1,-8,3,-6,-11,-18,4,-11,4,-3,4,4,5,-6,2,4,5,-3,-3,-2,3,-5,3,-1,0,-4,-15,13,0,-7,-8,7,-5,-3,-7,2,3,8,-3,3,-2,-4,-3,4,-3,14,6,-2,2,24,5,1;1335,-7,6,-1,1,-15,9,-10,4,0,9,10,15,8,66,-23,13,-10,-1,-6,21,-9,0,-4,-9,-2,12,-12,5,-10,6,1,1,-5,7,-2,-1,-3,10,-2,-6,-5,-25,6,-18,20,-15,5,-4,-2,-4,3,2,-4,-4,-1,1,-2,-14,0,12,-6,-8,-5,-15,1,-11,10,1,3,-12,-4,2,7,-4,3,5,1,-6,3,3,0,-6,12,-10,8,-21,4,-5,4,2,2,-9,1,-3,3,1,4,-4,-8,-4,-2,-2,8,-8,4,12,5,5,-2,2,5,-16,-1,-4,6,-9,2,3,5,12,6,10,-4;1249,10,-5,-5,-6,-2,-32,2,-4,-2,-1,-9,6,-8,5,1,4,5,16,2,2,-2,-20,-11,9,-10,0,-7,6,-8,-13,-4,0,7,-7,6,2,7,-4,1,-4,-2,1,-27,-8,0,-2,3,2,13,-1,5,-6,0,-1,8,5,8,2,10,3,0,-1,8,6,11,3,-1,5,4,27,-5,12,9,2,-2,-3,-5;1074,-60,9,-3,4,-5,17,-1,4,5,17,-5,5,-8,14,-1,2,-10,-13,5,-18,0,-50,9,0,3,-12,4,8,8,13,-1;965,52,10,0,8,-11,14,-9,8,-10,4,-3,1,4,14,-15,5,-1,1,-3,-5,-2,8,3,4,-2,-3,-9,10,-5,4,-10,-1,-5,7,2,6,-7,-3,-27,-11,3,0,-4,-30,27,-13,24,-11,12,-6,15,-9,5,-7,12,-16,13,-1,7,12,-4;1168,67,4,2,5,-6,-2,-4,5,2,0,-4,13,-3,-2,-3,-8,-1,2,-6,-10,-3,3,-4,-7,-1,10,-13,-3,-3,12,-10,-5,-2,-6,3,-4,-9,1,-10,-7,-4,-2,2,-4,-8,2,-6,-5,-12,-13,-6,-4,10,-6,-3,-7,6,-2,-4,-9,-3,-2,7,-14,-1,-3,17,-9,9,0,19,5,5,16,-6,-2,2,5,11,15,5,10,14,14,4,0,4,5,2,9,14,0,-3;678,762,-64,-9,-17,-7,-12,-1,1,-3,-20,-9,-23,1,-5,4,23,7,-5,1,9,4,-6,2,7,-1,46,12,33,1,32,6,12,-3,-11,-5;553,733,11,-1,-10,-7,-1,-6,12,-8,11,-4,-39,1,-3,1,2,2,6,0,-8,4,-16,0,-4,3,2,3,10,2,3,4,-3,1,8,1,-2,3,21,1;1428,544,5,-14,-1,-11,15,-33,-6,6,-10,0,-5,-15,10,-13,-2,-4,-1,6,-7,1,-5,-8,-3,6,4,15,-3,7,3,25,-5,11,1,10,7,1,2,5,-4,4,5,1;1438,441,9,-2,7,4,-3,-6,2,-4,5,1,-18,-5,-8,-9,-13,6,-9,-3,-5,3,-2,-3,9,-5,-12,-3,-1,11,5,4,0,3,10,0,4,12,-1,9,2,1,19,-14;1412,414,3,0,5,-20,-5,-10,-5,-3,0,-10,-4,-9,3,-5,-5,-5,-6,-2,3,6,-3,1,-1,-6,-4,2,-4,-7,-2,5,-5,-5,-11,0,2,2,-4,-1,-1,4,-3,-4,4,-4,-12,-8,-6,5,3,6,-7,2,-24,-5,-2,-5,-12,2,1,4,19,11,30,1,9,18,5,1,-4,-4,3,-3,11,4,15,17,2,18,4,5,3,-4,4,1,1,3,-4,1,1,2,3,-1;1344,343,3,-5,-5,-6,-6,3,-8,-7,-4,6,-4,-1,9,8,15,2;1312,336,5,0,-2,-3,4,0,1,-4,-7,-15,-6,-4,1,7,-2,-5,-5,2,4,14,-3,4,1,-5,-5,-1,-1,5,3,-2,-4,3,11,7,5,-3;1210,226,-3,-6,-6,11,0,6,9,13,6,3,3,-3,-9,-24;1109,200,1,-3,-10,-13,-5,-2,-8,3,0,8,6,6,16,1;800,98,7,-4,12,-21,-3,-9,-9,-4,-6,2,-2,6,-2,14,4,14,3,-1,-4,3;495,-124,4,-7,5,-25,-2,-4,-5,5,1,-10,-4,-18,-22,-65,-21,-7,-11,5,-7,26,2,10,9,15,-4,25,5,12,17,5,2,-2,1,4,4,3,2,-2,3,6,1,-2,5,3,-1,10,9,4,0,8,4,4,3,-3;-1591,-798,-52,6,10,5,9,-1,33,-10;-703,-797,-14,1,2,5,48,7,-36,-13;-452,-788,17,-1,6,-7,-2,-3,-6,-1,2,-2,-63,-6,-46,0,10,7,11,0,20,6,-4,2,3,5,13,8,23,2,22,-2,8,-3,-1,-2,-13,-3;-597,-803,-1,-4,-8,-2,-62,6,52,0,4,0,-5,3,11,3,9,-2,-1,-2,5,-1,-4,-1;-701,-692,18,-17,1,-9,-10,-7,-36,-1,-3,2,4,1,25,1,-15,-1,-2,2,11,2,-15,3,-15,-2,3,-2,-5,-2,-14,4,11,4,8,-2,0,3,13,0,-8,1,3,1,28,0,0,2,-13,2,16,3,-21,3,0,7,-4,2,17,4,3,-4;-692,-527,6,0,4,-4,-3,-2,12,-7,21,-7,-13,-3,-54,4,11,3,5,-2,-6,4,4,5,1,-4,-2,0,4,-3,12,-1,-12,5,8,5,-11,2,4,3,-3,1,12,1;-818,232,20,-3,56,-27,-35,-3,6,5,-1,2,-9,2,-6,8,-31,6,-3,2,4,1,-1,2,-9,0,-21,-9,5,3,3,6,22,5;209,802,14,-2,2,4,5,1,3,-1,-2,-2,13,2,28,-5,-16,-5,-27,-2,-30,3,9,2,-25,2,6,1,-10,1,14,0,-1,2,6,-1,-2,3,13,-3;168,799,10,-1,-1,-4,7,2,4,-2,-1,-1,19,-2,8,-4,-22,-3,-25,-18,-27,9,29,4,-28,-1,-4,2,33,4,-5,1,3,2,-14,-2,0,3,-7,-1,-3,-2,2,-1,-15,-2,-17,8,10,0,-4,0,0,3,-8,-2,-5,7,30,1,-11,-3,14,-3,6,5,17,-8,-5,7,4,3,6,-1;96,409,0,-17,-10,-3,-4,20,10,4,4,-4;156,382,-5,-7,0,-8,-27,11,3,4,11,-2,18,2;-527,699,8,-3,-17,-3,-13,4,6,2,-5,2,4,2,17,-4;-1272,506,17,-3,22,-19,-16,3,-2,1,3,4,-7,-3,-4,5,-7,0,5,3,-18,4,0,3,4,2,-6,-1,-2,3,11,-2;-720,197,10,2,10,-2,3,-4,5,0,-4,-2,12,-6,-3,-3,-6,2,-17,-1,-4,-7,-7,6,-18,-2,-6,4,1,2,21,0,-5,5,1,3,-7,4,14,-1;-496,-2,12,-1,-4,-11,-17,-4,-3,9,2,6,10,1;-31,585,-10,-9,20,1,3,-2,-8,-9,-7,-2,6,-1,-11,-2,12,-1,9,-4,5,-9,11,-6,2,-5,-8,1,10,-4,-3,-4,17,-1,-1,-7,-12,-6,10,-3,-12,-4,-32,-1,-7,-5,-5,2,-14,-3,14,11,11,0,7,5,-9,-3,-19,3,12,8,-1,4,-6,-1,4,3,16,2,-4,2,3,6,-8,4,6,5,-20,-2,-2,2,5,5,-2,4,3,0,-2,3,-4,-3,1,3,-6,-9,5,15,-5,-3,-4,2,4,2,0,8,5,2,-2,2,4,5,19,-1;-72,551,11,1,4,-4,-2,-2,4,-1,-8,-5,3,-11,-3,-7,-30,-7,-8,1,5,3,-7,-1,4,3,-5,1,16,5,-11,-1,10,6,-12,2,5,4,-5,5,16,-1,4,4,-7,1,5,4,6,2,0,-3,4,4,3,-2,-2,-1;-1800,690,47,-13,-1,-3,6,-1,-1,-7,8,-1,0,-3,3,2,-7,7,8,0,5,0,-1,-3,8,2,-5,1,12,-2,12,-7,8,-1,-9,-5,-7,2,3,-3,-17,2,6,-2,-5,-3,5,-2,-9,-2,7,-4,-8,-1,-1,2,-4,-1,-17,4,-7,7,-23,0,-5,5,4,4,-12,-2,-1,-3,4,-4,-6,-4,3598,-1,-13,-4,-16,5,-6,-1,8,-2,-10,2,-16,-3,16,2,2,-2,-2,-1,13,2,3,-5,5,1,5,-6,-2,-2,11,-8,-5,-5,-21,5,2,-2,-43,-11,-23,-11,-2,-4,-12,6,-7,0,-13,-2,-9,-5,1,6,-14,-7,-6,3,-9,-2,-2,-6,-13,-12,4,-4,3,2,5,-1,-4,-6,5,-10,-5,-1,-2,1,4,3,-3,0,-6,-4,-4,-6,4,-7,-20,-6,-3,-4,2,-7,-15,-1,0,-6,-4,-6,-14,-8,-11,42,4,15,8,6,1,5,14,2,38,25,16,4,5,14,12,1,-10,3,-11,-1,-2,-10,-7,1,-22,-11,2,4,-6,0,5,9,-32,-2,-28,-19,-2,-3,11,-3,-39,-3,-2,2,11,2,-26,5,-8,-3,2,-1,-3,-1,-22,2,-5,-3,-4,2,-30,-2,-73,-43,6,-3,9,0,-1,-8,10,5,-4,-2,5,-2,-5,-4,12,5,0,-5,2,8,11,0,16,-10,-6,-2,7,-9,-10,-14,1,-7,-5,-17,-46,-46,-23,-11,-9,2,0,4,-5,0,-20,-16,-1,-8,-21,-11,-2,-6,9,-5,11,-16,2,-12,-4,-7,-15,-2,-4,-5,-1,3,-7,-5,-2,9,5,7,-3,8,-3,1,8,1,-4,9,-8,2,-4,-3,-4,2,2,2,-5,0,9,6,-4,1,2,7,-8,1,-2,4,-32,-13,6,7,-5,1,10,10,-5,5,-6,-1,-22,-17,-12,-1,-1,-7,12,-4,2,-8,7,0,10,6,19,-4,-4,-6,-4,2,-11,-4,-2,-5,-4,1,1,-2,-11,-12,11,-5,6,-16,10,-9,-14,3,-5,-2,7,1,12,-11,-17,-7,11,1,8,-4,-6,-4,5,0,-1,-4,-5,0,2,-8,-9,-3,-6,-13,-5,1,3,-5,-8,-2,5,-1,0,-6,-4,1,1,-3,-6,-6,-9,-1,3,-3,-7,-6,-5,0,-4,-7,-18,-1,-4,-5,-8,8,0,-9,-31,-9,-2,-4,3,-4,-2,-2,-4,0,-2,6,2,6,-4,2,-4,-3,-5,5,-14,-10,-5,1,-11,-20,9,-11,-1,-1,24,-24,6,-28,-2,0,-2,-13,-17,-9,-3,3,-1,-3,-3,1,0,-6,-5,3,5,-6,-8,4,4,-6,-11,-8,-3,0,2,15,-7,4,-7,1,-1,5,-3,-2,-6,13,-9,5,-8,0,1,7,-10,0,0,-12,-8,-19,1,-10,5,0,6,-21,11,-3,17,-16,2,-24,8,-15,-2,2,-5,-3,-22,16,-6,11,-6,24,-14,19,-4,-1,4,20,-2,-1,0,6,4,10,-3,0,0,15,-8,17,-1,17,-3,-1,-6,9,0,-7,-4,-2,-2,3,1,-4,-9,-7,-1,4,-1,-3,-3,4,-2,-3,0,6,-5,-5,4,16,-6,17,-1,-4,-4,5,5,0,-3,5,-6,0,0,5,-3,-2,-5,6,-4,15,-4,6,-6,-3,-3,10,-3,-1,3,-2,0,-9,-4,-6,-2,7,-4,-7,-1,5,-1,-6,-3,4,0,-4,-4,-1,-1,5,0,-4,-5,-1,-2,8,3,-3,-3,-3,-10,-6,-1,-9,-6,-4,-10,-1,2,-2,-13,-13,-17,-12,-1,-5,-10,-3,-3,-5,-7,-1,-2,-6,2,-16,-2,1,2,-2,-6,-21,1,-10,-5,0,-4,-7,5,-4,-10,-1,-3,-7,-6,-3,-9,8,-3,10,-30,66,-5,26,2,2,-3,5,2,9,-3,8,5,3,-6,-1,3,5,-6,1,-2,-11,-10,-5,-5,1,-15,15,12,3,3,5,-8,-3,-9,3,-4,5,4,3,-6,-3,0,3,-6,0,-12,17,-17,-4,-6,2,-27,-3,-36,6,-5,1,-6,13,-21,-6,-30,14,-15,23,-5,-2,-6,5,-2,-5,-8,0,1,-4,-4,-2,4,0,7,-17,14,-10,-2,-6,7,-12,3,11,3,2,2,-3,-2,-16,8,-3,20,2,23,22,0,-14,2,-5,6,-6,16,-4,10,-12,-13,-19,-3,2,-3,-4,-1,-12,-10,-2,-4,-8,-9,-2,-4,-8,-25,-5,-4,-8,-28,-11,-7,-5,-48,-15,-4,1,-3,6,-5,19,1,13,-5,9,-6,6,-9,18,-15,12,-2,16,-6,11,-10,6,-3,10,-20,27,-6,1,4,15,-8,-18,-10,8,-7,13,2,-10,8,-10,17,-34,6,-6,-3,-1,2,-9,11,-8,5,-10,2,-23,11,-7,9,-26,3,-4,1,4,13,-9,22,-22,-1,-4,-8,-5,7,1,11,-11,6,-1,25,8,27,3,7,5,5,-2,-3,-14,4,0,-5,-1,-1,-9,-28,-49,-20,-20,-23,-16,-23,-28,-12,-8,-10,-20,-4,-14,7,-9,-2,-14,4,-16,9,-7,-2,-22,4,-19,-10,-16,-23,-12,-11,-12,-15,-10,-3,1,7,-27,2,3,0,-2,-1,-19,-4,-5,-22,-9,-2,-4,2,-3,2,2,-1,-7,-5,-17,-11,-9,-13,-19,-21,-18,-23,-9,-30,0,-26,-8,-12,4,0,3,-4,-1,0,5,-5,9,4,3,-1,8,-15,27,-14,16,-3,11,-5,39,-27,44,0,22,8,24,11,13,1,10,-8,21,4,6,-11,23,8,2,-9,1,-4,12,-22,22,-6,11,5,-3,-8,10,6,2,1,7,6,-1,-7,4,3,0,-2,5,5,20,-2,10,-7,0,-1,5,-6,3,0,-3,-12,1,-2,-3,-1,3,1,-3,-8,-1,-6,5,0,7,-3,0,3,1,-11,7,-9,1,2,2,-24,-5,-33,-13,-12,3,2,0,-2,2,-1,-2,-11,2,-31,-9,-16,7,-34,23,0,4,-8,6,4,2,-3,0,1,3,-6,6,0,4,-17,13,0,3,3,1,-4,2,4,2,-8,-2,-9,7,4,1,-4,0,1,8,13,1,-10,-1,-2,6,-9,8,9,9,6,22,-5,15,3,8,-7,9,-2,-2,2,10,10,19,10,9,5,16,8,4,7,12,13,4,14,11,5,7,-1,13,6,12,7,7,16,7,10,18,6,1,7,-7,16,2,2,-3,9,0,32,14,25,4,15,-3,12,5,14,-2,18,4,5,-1,2,-5,6,4,1,-2,-6,-6,6,-11,-10,-10,2,-5,20,-8,10,0,19,-5,5,-10,21,-5,11,-6,11,5,1,14,16,7,14,-3,2,-4,16,-2,3,-5,16,0,23,-7,20,8,8,-1,2,-2,-3,0,3,-2,16,0,8,5,15,29,-2,18,4,5,-8,-2,-7,2,-10,-6,-9,-2,-16,8,-6,1,-2,-6,-7,-1,-7,5,-15,0,7,3,-9,0,2,2,-4,5,1,3,-9,3,1,3,3,-3,4,2,-3,2,2,2,-3,4,2,3,-8,-1,1,5,5,4,23,0,0,2,8,1,-7,2,0,3,22,-1,20,9,17,1,14,-8,20,-4,19,1,11,4,4,6,-4,7,-48,25,3,2,7,0,3,6,6,1,-7,5,7,1,8,3,-1,3,-34,-7,-7,-5,1,3,-3,-2,1,-5,5,-4,11,1,-2,-3,-9,0,-16,-7,-5,2,2,5,-11,3,11,7,-18,2,2,1,-4,2,10,0,-6,0,-2,6,1,-5,-11,-1,-6,-7,-6,-2,0,-9,-7,2,-3,-15,-5,-1,-6,-9,7,-9,9,-4,-1,-2,-15,0,-13,-9,6,5,-17,4,-13,-3,5,-6,-6,2,2,-3,-13,5,0,-5,7,-8,-4,1,2,-3,-5,-1,14,-6,1,-5,-11,1,5,-4,-8,0,5,-11,-5,4,-2,-4,-4,6,-4,-1,0,5,-6,5,7,4,10,-3,4,1,-8,3,-13,0,-3,5,3,1,-8,3,-10,11,3,14,-26,12,7,-1,-8,5,-9,1,-8,7,3,1,-10,10,-6,-5,-4,7,3,1,-6,2,-9,-4,1,-12,12,-6,9,-14,17,-3,-3,-4,26,-13,-2,-4,-4,5,-10,2,-4,-8,6,-3,1,-4,-6,-2,-5,-9,-5,1,6,9,-5,11,-46,24,-6,6,-3,9,-14,5,-27,-13,-20,5,-8,-4,-3,-4,2,-9,-25,-11,2,-1,-12,-12,5,-7,-7,-5,-2,-7,-9,-2,-5,-6,-23,-1,-12,-7,-8,6,2,3,-7,4,-21,-3,1,14,2,0,-6,3,5,4,-7,-3,8,20,0,15,-5,9,15,6,57,-5,5,3,4,19,6,-5,-7,7,1,6,-10,6,0,4,4,-1,-26,6,-4,2,5,3,-5,2,15,3,5,-3,13,2,-5,10,6,0,2,-3,15,0,-2,3,12,4,4,8,24,5,-7,1,8,0,-3,4,8,10,7,4,17,0,0,4,4,0,9,-3,1,5,12,-3,-12,7,4,2,-3,8,-6,3,1,10,10,1,-1,3,-8,-2,3,3,20,6,-3,-11,6,-2,-13,-9,-1,-5,5,-3,-1,-2,11,-1,-1,-4,5,-1,16,5,16,-8,-8,5,6,-2,37,9,13,-4,17,12,-5,-6,6,-1,-2,17,7,10,9,1,10,-7,8,3,1,11,-7,0,-3,8,20,4,24,-2,2,4,21,1,-16,5,-1,3,-20,-3,1,2,-36,-8,2,2,-3,2,-4,-2,1,4,-12,2,2,10,-5,10,4,6,8,1,23,15,8,2,-1,5,-7,4,-22,0,-10,-6,2,-2,-5,-3,4,-3,-7,-6,-34,-14,2,-3,-5,-6,1,-9,8,-1,10,-8,-10,-4,6,0,-3,-3,-21,-5,7,-1,-2,-1,-2,-13,-5,-9,-12,0,-6,-4,0,-4,-9,-1,-4,1,1,3,-5,6,3,0,1,3,-17,18,-1,6,3,1,-6,1,-2,6,-4,-8,-6,1,-14,-10,-15,0,-11,5,0,4,8,0,-5,1,5,4,-12,-3,0,4,10,2,-5,1,4,3,9,3,-8,-2,-11,-7,1,5,5,0,-6,3,5,3,-5,-1,-1,4,20,0,6,2,-2,2,-2,-2,-21,0,-1,2,3,1,-4,4,18,0,-16,3,15,2,-5,0,3,2,17,1,-14,0,9,4,10,-3,-4,4,5,4,21,-1,6,5,-13,-5,-5,3,19,9,-2,1,2,2,12,2,-6,2,9,6,-2,1,12,2,-9,-1,1,4,8,2,-3,1,4,2,13,1,-10,1,6,3,6,-3,-3,5,-5,0,12,4,3,-3,-1,4,14,1,-11,1,16,7,2,3,6,-2,-3,2,11,3,-1,-4,7,5,-2,-6,6,2,-1,4,14,-1,-6,4,13,2,7,-4,14,10,10,-2,-8,-7,15,8,2,0,-1,-5,9,4,-2,2,8,0,3,-1,-5,-2,4,0,-1,-5,6,7,21,-5,-21,-3,9,-4,18,0,5,3,10,-3,-8,0,2,-2,11,-1,-4,-3,6,2,22,-1,51,-15,4,-5,-2,-4,-25,-7,-68,11,28,-12,-3,-6,6,-10,24,-6,7,3,-15,7,3,4,29,-6,6,2,-6,8,24,9,19,-5,3,9,-6,4,4,10,-9,4,26,-2,8,-7,-18,-4,16,-6,12,2,2,6,9,1,0,2,32,6,4,-1,3,1,-4,1,15,4,7,0,-7,-1,1,-5,-6,-1,16,-1,5,4,17,0,20,4,3,-3,-3,-3,6,0,2,3,10,3,-7,6,7,2,33,-3,43,-12,6,7,-6,0,-9,6,-7,0,4,11,-6,1,-1,3,17,6,11,13,21,-1,13,-2,-2,-7,-7,-5,8,-5,-1,-20,10,-5,-5,-7,-17,-8,1,-3,-25,1,10,-4,21,-1,27,15,-4,6,7,5,14,1,7,-5,0,-7,17,-2,-13,2,1,4,3,1,-3,6,-17,3,-22,0,-2,6,7,8,-12,8,19,7,-2,7,8,-2,1,-3,-4,-3,2,-3,-2,-3,4,-1,33,-4,-26,7,-4,3,22,0,-8,3,11,2,32,-7,14,0,-8,-4,-1,-7,0,-2,4,5,4,0,-3,-7,4,-1,6,4,-5,6,3,6,-27,8,0,4,-4,3,2,4,63,3,-11,-5,9,-3,-8,4,17,3,-16,5,12,1,-14,2,12,2,5,2,-5,2,71,7,-12,0,4,2,32,-2,22,3,11,-2,-3,-2,3,3,-9,4,27,-1,-7,2,1,4,30,7,21,-3,-19,-3,32,-2,-10,-4,47,2,15,-3,1,-3,6,2,6,-4,-3,-3,-11,2,12,-3,-8,-5,-56,-14,-22,-8,57,9,-11,0,6,3,12,0,-3,0,2,-2,7,-1,9,2,5,-6,-3,-5,5,-2,-5,2,7,5,-4,2,6,1,44,0,4,-1,-5,-3,13,-2,28,-1,11,3,-2,4,11,2,46,-7,-5,-2,7,-2,-9,-2,9,-1,0,-3,-16,3,12,-6,3,1,3,-2,-7,0,10,-6,12,-4,17,12,10,-5,24,2,18,-5,4,2,-4,1,3,2,18,-1,-6,5,8,2,-11,1,20,3,-3,3,55,-5,-20,-2,25,1,-7,-4,1,2,-4,1,0,-3,-7,0,1,-2,21,6,22,-1,5,-3,-10,-2,16,-2,-5,-3,15,1,9,-5,34,3,28,-2,12,-4,-1,-7,11,-2,4,-7,-4,-4,7,4,-1,5,17,3,37,-2,10,2,17,-9,9,0,5,3,-8,5,3,5,54,-2,40,-9,-3599,0;-155,662,9,2,-5,-3,7,-3,-1,-2,9,-1,0,-5,-13,-7,-38,-9,-25,5,-15,-1,0,3,12,3,-6,-1,5,3,-24,3,21,1,-6,2,7,2,-27,1,12,3,-5,0,3,4,11,-3,-5,3,4,1,-6,0,2,1,15,-4,0,-3,-3,0,6,-4,3,3,3,0,3,5,7,-3,1,3,6,1,7,-5,-2,5,7,-2,11,2,3,3,7,-3;-866,710,18,0,1,6,-12,4,6,2,10,-2,-14,7,4,3,10,-2,-12,3,21,5,18,1,13,-9,-9,-5,6,2,-3,-6,10,3,-2,1,3,1,12,-5,-3,2,2,3,12,-2,-9,4,11,1,21,-3,1,-2,-8,-5,16,3,-9,-3,5,0,-3,-5,11,6,-3,-4,5,2,5,-3,-1,2,4,2,13,-2,4,-3,-14,-4,19,3,-12,-7,6,1,-1,-4,8,6,14,1,8,-3,-17,-5,13,2,-2,-2,3,-1,6,4,9,-5,-21,-3,26,-2,-23,-2,12,0,-1,-3,-14,1,26,-4,-3,-2,1,-2,7,2,-2,-5,5,3,5,-4,5,3,-1,-2,12,-2,-9,-2,17,-2,-7,-4,16,2,8,-4,-8,0,5,-2,-3,-1,-7,1,6,-4,-6,0,2,-2,-3,-2,-8,3,-1,-10,-7,3,0,2,-3,-3,-8,7,10,5,-14,-3,1,2,-13,4,-3,0,1,-3,-7,2,5,-6,-13,3,5,-1,3,-5,8,-2,-2,-1,6,-5,13,-1,-1,-2,4,-1,-5,-1,12,-6,-3,-5,-5,6,5,-9,-5,0,1,-3,-28,11,1,-3,-11,4,29,-16,-3,-3,-50,12,-7,3,6,2,-11,2,-10,6,2,2,-8,-2,-6,4,-2,0,2,-3,-22,-3,-11,3,-1,4,8,6,15,-3,3,-4,-3,5,22,2,-8,7,22,11,-11,11,-5,0,0,3,-11,1,2,2,-19,-3,0,3,9,2,-8,3,3,2,-9,-1,2,2,-7,0,-2,4,-13,4,-3,-2,6,-4,-28,1,7,-4,-79,8,-7,6,24,-1,-27,5,-2,4,3,3,-2,2,7,7,15,6,27,1,-17,-10,5,-9,12,-5,-16,-4;-695,830,31,-1,-21,-2,49,1,4,-3,19,-2,-74,-10,39,1,-48,-10,-11,1,4,-3,-18,-1,15,0,-8,-3,-30,1,10,-4,-35,0,24,-4,-41,0,42,-4,-20,-2,12,-2,-8,-3,-20,-1,-1,-4,-4,-1,-32,1,4,-1,-5,-2,23,0,15,-3,-3,-3,-24,-4,-3,3,-15,2,3,-2,-20,2,-1,-3,-8,-1,-14,3,-19,-2,-1,4,0,-4,-11,1,1,3,27,4,-10,3,-3,2,3,1,31,-4,20,5,-22,-4,-6,4,13,3,-7,0,1,3,-8,-4,-6,0,3,2,-17,-1,8,6,50,2,-26,0,8,1,-28,7,-1,5,28,-1,32,-6,-25,7,61,6,-18,1,18,4,-41,-7,-41,-2,-13,2,31,4,-44,-4,-15,2,43,4,-47,-3,-3,2,7,1,-5,0,21,2,-41,1,36,5,31,-1,-16,2,17,2,55,-5,-30,5,16,2,-2,2,23,-1,-12,2,39,-4,4,1,-15,4,44,-3,-7,2,6,2,33,-1;-943,718,13,-5,0,-4,14,-7,-7,0,-2,-1,5,-1,-9,-3,25,-2,-8,-2,7,-4,-1,-4,4,-2,9,10,13,-5,2,-5,-5,0,0,-4,9,-7,8,3,9,12,8,1,-2,0,2,3,-5,1,-1,6,31,-2,-4,-1,14,-3,-6,-3,7,-2,-13,-3,13,-9,-2,-4,-19,-7,-11,6,-6,-1,9,-2,3,-5,-28,3,7,-4,-15,-8,-23,6,-16,1,44,-8,-11,-10,-19,-1,1,-1,-3,0,0,-3,-6,-1,-29,5,1,-2,29,-6,-1,-3,-16,-2,5,-2,-7,-1,-2,-2,3,-1,-7,2,3,-2,-7,-3,3,-1,-15,-13,-2,-14,7,-4,0,-4,2,4,9,0,8,-14,-4,-4,22,3,49,-16,5,-3,-2,-2,15,2,15,-2,1,-21,7,-6,-2,-2,11,-4,3,-4,-5,-3,8,2,8,-5,-4,5,4,3,4,-4,2,3,-3,3,6,5,-7,14,1,3,-7,7,19,6,13,11,-4,14,-16,9,8,10,4,-1,0,4,-3,1,0,7,-6,0,7,8,-5,2,-1,5,7,3,28,-5,9,4,10,-4,-1,-3,6,0,0,-2,6,0,-3,-2,5,-2,19,-2,-2,-9,-10,-1,10,-1,0,-6,4,0,-2,-4,-7,-1,18,-1,0,-5,-6,-3,10,6,-1,-4,3,3,1,-4,13,8,4,-4,0,4,6,3,-3,1,2,3,5,-1,-4,4,4,0,2,5,3,0,-3,-3,5,1,5,-6,-1,-1,5,-2,-6,-1,8,0,3,-4,-6,-4,9,2,-7,-5,13,-1,0,-3,-5,-1,12,-5,-1,-3,-11,1,11,-4,-3,-2,3,0,-1,-2,12,-2,1,-3,-4,-4,8,2,4,-1,-4,-4,5,4,19,-6,-30,-9,3,-2,-2,-2,24,8,-4,1,9,0,3,-4,-4,-2,2,-1,8,3,5,-3,2,-9,-5,-1,6,0,-3,-1,3,-2,-13,-7,-15,-2,-16,-10,-64,-1,-9,-9,-9,-1,-14,-10,-13,3,11,-3,-1,-5,-13,-9,-30,-13,3,-2,-7,-3,11,4,4,6,27,10,23,16,27,7,12,-4,-2,-1,2,-4,-10,-4,-14,0,20,-3,-6,-6,5,0,3,-9,17,-6,8,3,10,-6,-26,-8,-7,0,-12,-10,-6,3,2,8,-2,-1,17,8,3,-3,7,4,-15,0,6,4,-3,1,-13,-7,-1,2,-4,-3,-7,1,1,-4,-11,-4,-3,1,-1,-2,-3,3,-4,-6,-10,-2,-6,-10,2,-2,-4,-3,6,-5,4,0,-1,3,2,-4,-13,-2,-2,3,-1,-4,-14,-1,-11,-5,0,4,-3,-7,3,-1,-1,-6,-8,-9,-6,6,4,5,-4,-2,5,-14,-9,-12,2,8,-6,7,4,8,-7,-2,2,-9,-3,1,4,-4,-9,3,2,5,-3,-5,10,-5,-2,-2,-6,5,8,-6,-2,-3,-3,2,5,-4,-10,2,13,-4,5,-11,-4,9,1,-6,-9,1,0,-2,6,0,0,-3,3,1,-4,-4,-8,1,5,-2,-5,-3,6,-2,-10,-1,-5,-8,-1,3,0,-3,-8,-2,-11,-10,-7,-2,0,-2,-2,1,1,-2,-7,-10,1,-14,13,-30,-5,-16,-6,-1,2,2,-9,8,0,6,-2,-1,0,4,-3,-1,-4,6,3,3,-4,0,1,11,-13,12,-13,-4,-3,6,-16,0,2,3,-10,-4,2,1,-2,4,-1,-3,-22,-1,1,-3,8,0,-3,-4,7,-4,-2,-2,-10,5,1,-4,-7,0,-11,7,-4,-2,-15,1,0,3,-1,-3,-9,-3,3,1,-5,2,1,-3,-10,-8,-7,1,2,-2,-8,-4,-2,-8,-4,2,7,-15,-8,-34,6,-10,-1,-3,-4,7,2,-4,17,-28,14,-6,21,5,9,-2,2,1,-1,3,7,5,3,16,19,6,15,0,2,-6,-9,-14,3,0,-5,-13,-1,5,-4,-4,3,-2,-2,-16,-6,-7,8,-2,31,3,16,-8,2,-9,-7,-30,18,-24,3,1,-1,1,8,-3,15,8,5,-1,13,-4,10,-12,-1,7,13,8,2,12,6,5,5,-1,-1,-2,3,5,8,0,17,11,5,-4,-9,-4,4,-9,-5,-9,5,-8,4,2,1,5,-4,13,17,5,-5,4,3,3,4,-7,12,-3,3,-7,19,1,11,-5,14,4,-6,1,24,1,-10,-2,2,-4,2,1,2,-4,2,2,4,-4,1,3,8,-5,-4,-8,-4,0,3,-2,11,2,14,-9,3,-4,-2,-9,3,5,4,-1,8,-6,0,-7,2,5,11,-3,1,3,14,-1,3,-1,-1,-4,4,4,9,-4,9,-10,2,2,1,-5,2,2,3,-2,5,-20,7,-4,1,-5,-14,-13,-7,-13,-7,-2,8,0,10,7,5,-11,11,3,-3,-10,4,8,8,4,3,8,7,1,19,-8,2,-3,2,2,4,-2,-1,-6,4,-1,-3,-8,5,7,0,-3,8,4,19,-5,15,0,28,-20,17,-3,7,-18,0,-10,-5,-12,-21,-21,-8,-15,-7,0,-3,-49,-4,-6,-2,-13,-12,-16,0,-8,-7,-3,-3,-6,-12,2,0,-3,-14,-1,0,-2,-9,-5,-14,-4,-13,-12,-5,0,3,-2,-3,-7,1,-9,-2,-14,-9,-8,-12,-19,-11,-8,-1,3,8,3,7,11,-7,4,0,-8,-7,-6,-7,-17,-15,-16,-20,-2,-16,4,-6,8,2,12,-3,-18,13,-11,-2,-5,7,-5,0,-6,-8,-11,-7,-3,-29,-6,-12,2,2,-6,-3,-15,-12,-3,-15,3,1,-12,6,-3,6,3,2,-6,-14,0,7,-3,-10,-6,-3,-14,-13,-3,-7,-8,8,-9,9,-2,1,-4,-4,-2,4,-1,-17,-11,-4,-10,-4,-1,-4,3,-3,-2,6,-2,-10,-8,3,-5,-4,-1,5,-1,6,-6,-8,1,-16,-6,-2,-10,-3,-1,-11,5,5,2,1,-3,6,7,-13,-7,-6,3,4,4,12,2,-12,1,-4,-6,-5,3,5,3,-9,-1,-3,5,15,2,1,-5,2,1,0,6,-7,2,6,-3,-9,-2,-7,3,3,4,-9,2,-3,4,4,0,1,3,8,-5,1,4,-3,-3,-2,2,2,1,-6,3,6,2,-3,4,5,0,-3,2,2,4,-5,-4,1,8,3,1,-5,0,-1,5,12,-1,-3,4,-5,-3,-5,3,6,1,-4,2,3,2,-1,4,-7,1,0,2,-5,-2,1,-2,-3,2,8,5,-2,3,9,1,2,4,0,-7,-4,-1,7,4,-1,-8,1,11,8,0,-5,4,7,5,-6,4,5,12,0,7,4,-1,-4,5,5,4,-12,-3,-5,7,8,19,-5,19,5,1,10,21,7,24,-2,19,4,11,-2,8,9,26,2,27,-2,3,5,18,-3,31,-11,11,-36,19,-8,8,-5,7,2,5,-14,21,-12,27,-12,18,-11,7,2,5,-4,9,16,21,-1,5,-1,-4,-1,1,-3,-3,-7,5,1,11,6,5,-2,2,5,6,-1,6,12,4,-1,4,4,2,0,6,8,3,7,12,-4,3,2,5,-2,8,3,3,-2,8,-10,15,3,3,3,-3,-16,9,-11,-8,5,-7,-8,-3,-3,7,-2,-3,-4,5,-10,2,-2,-2,-4,6,0,-3,-3,1,-1,7,-16,11,4,-5,-2,-2,-5,3,-1,12,-20,18,4,0,-2,5,-10,-2,-29,8,-30,23,4,-3,-9,4,1,-2,-17,-5,-43,15,-11,8,-15,3,-21,17,-2,4,4,2,-2,2,3,7,-6,11,-17,19,-5,1,-3,5,3,0,-10,4,1,2,-4,-1,0,9,-12,8,0,6,-12,6,-10,15,-3,12,-8,4,-11,3,3,-17,17,-18,10,-17,3,0,9,-24,3,-2,1,2,9,-8,-6,-6,-4,7,-17,12,-3,14,-8,7,-4,-2,-14,10,9,0,-2,2,3,5,-17,14,-18,35,-10,7,-21,6,0,5,-13,12,1,6,-7,6,1,3,3,-3,-2,5,8,1,-15,-1,-7,9,-1,9,-6,6,3,11,-4,13,4,9,1,25,8,0,-9,1,2,4,-2,2,3,1,-3,0,-6,14,19,-3,1,-2,-4,-5,6,5,-1,-6,-4,-2,4,0,4,9,-5,4,2,4,-7,3,3,3,-4,-1,1,4,-3,-3,-4,1,-1,2,4,0,-3,0,0,5,-2,-4,-6,2,-4,4,2,5,-2,-4,-10,0,-3,1,5,1,-6,0,0,4,-6,-2,-6,3,3,4,7,1,-11,0,0,5,4,2,7,-3,-5,4,2,3,-11,-10,-3,4,5,3,-4,-1,2,5,-3,-1,-8,7,3,2,10,-4,-8,3,2,3,-5,-1,-6,-5,-7,4,7,5,-8,2,8,11,-2,1,-2,-5,0,8,0,-6,-5,-6,-5,5,3,1,-3,8,-11,-5,5,6,-19,10,-1,4,5,0,-4,2,3,1,-8,2,1,4,-3,-3,-5,2,-7,10,3,-12,-8,2,-1,4,2,1,-4,1,0,-2,-8,2,9,-5,-5,-3,-32,13,3,5,2,-4,3,2,-4,2,-10,-3,-10,4,-27,-1,-8,3,2,4,-12,-2,2,2,-9,0,0,4,3,0,-16,-2,1,3,-8,-4,3,-1,-3,-2,6,0,-4,-5,-10,1,-2,-3,-21,-6,-2,2,9,4,-9,0,5,9,10,3,13,-1,-10,3,5,3,-34,-12,3,-3,-15,-8,8,-4,-30,-14,-2,-4,-18,-6,-1,-3,-27,-7,-3,2,-6,-5,-5,1,-7,-4,0,3,16,8,14,-1,-2,2,2,3,28,12,-1,6,4,1,-3,2,7,7,-14,-5,-3,3,4,1,-7,0,-2,-6,-14,7,-17,-5,5,5,-4,0,2,5,-6,7,5,4,-8,-4,1,-3,-13,-2,-15,7,6,4,11,-3,3,2,-5,1,3,0,-15,0,2,2,-7,0,-6,6,10,8,4,0,0,4,4,3,11,-2,10,5,14,2,-1,6,-5,1,6,4,-9,0,-9,-4,-5,3,1,-3,-30,2,-8,6,7,1,-19,4,36,9,9,0,-4,-4,3,-1,27,1,-9,2,-6,4,1,1,8,-4,14,-1,-17,3,2,3,-18,1,-6,5,-27,8,4,0,2,5,23,1,20,13,18,3,2,-3,5,2,-7,1,4,2,18,1,14,5,9,-3,-4,-3,8,3,10,-3,19,0,-2,-1,6,-2,87,-4,79,-14,-6,4,15,6,5,-2,-3,-2,35,8,12,0,-32,-8,-7,-5,3,-1,13,7,7,1,1,-3,9,5,12,3,-3,-2,3,0,12,5,-5,1,2,2,25,-12,9,8,5,-5,-2,-3,22,4,49,-9,22,0,10,-5,-11,-3,-3,-2,3,-1,27,-1,23,3,21,-7,-5,-2,12,-7,-4,6,5,-1,-8,9,23,8,-26,-5,-4,2,4,3,21,3,17,-8,10,0,12,-4,34,0,5,1,-2,3,11,-5,3,3,-10,0,-4,5,8,1,14,-2,-3,-3,7,2,-4,-7,10,-5,-10,0,6,-4,-2,3,6,0,1,4,-4,4,2,3,21,6,-5,4,-7,-2,5,3,-2,2,9,1,-27,4,-4,5,6,4,-5,0,-1,4,9,2,2,2,-5,1,7,3,9,-1;-935,750,-1,-3,-9,-1,-21,5,17,5,10,-2,4,-4;-1000,739,29,-1,-5,-3,3,-1,-11,-4,19,-3,0,-3,-3,-1,2,-5,-10,-2,-7,3,1,-5,-10,0,-14,8,-21,5,5,4,9,-4,12,2,-4,3,7,0,-17,3,10,-1,-5,4,10,1;-849,653,4,2,24,-9,4,-4,-2,-2,11,1,5,-3,-7,-3,-23,6,-21,-10,-4,6,-14,-1,9,5,-1,5,6,12,6,0,3,-5;-757,683,6,-2,-3,-7,-15,-2,-4,5,6,6,10,0;-795,737,23,-2,11,-6,-37,-1,-10,5,0,4,13,0;-977,765,2,-4,-4,-3,6,-4,-6,0,2,-2,-3,-2,-23,0,-2,2,4,0,-6,2,15,3,-36,-1,7,3,11,-1,-11,5,3,2,19,-6,-2,2,6,0,-13,4,19,0,2,2,10,-2;-1034,793,8,-4,9,2,17,-4,10,-7,-10,-2,-11,4,-37,2,-1,2,15,1,-8,1,3,1,-3,1,-7,-2,2,2,-9,1,2,2,20,0;-919,811,13,-5,14,-1,3,-3,12,2,-2,-3,9,-2,-3,-3,17,0,6,-3,-26,-6,-4,3,-3,-3,3,-2,-7,1,-1,-4,-12,4,5,-4,-32,2,8,1,-14,1,-9,4,29,4,-38,-1,-6,2,13,2,-15,0,-9,4,25,1,-21,1,8,1,-6,2,3,1,20,-1,-16,2,22,3,-9,2,23,-2;-943,769,11,-1,-3,-4,22,3,8,-2,-9,0,21,-2,-21,-1,21,-4,-3,-2,7,-1,3,2,26,-3,38,4,25,-4,2,-1,-9,-3,10,-1,-25,-4,-16,4,0,-3,-9,-1,-40,0,-1,3,-11,-2,-20,1,-8,6,2,5,-9,6,-22,-1,-16,4,11,4,15,-2;-962,785,13,-1,-4,-2,4,-1,-21,-3,-7,3,8,1,-11,1,-3,5,21,-3;-1105,781,9,0,-13,-3,8,-1,-6,-3,-17,0,-8,1,-1,3,28,3;-1156,774,-7,-3,5,-2,-5,0,4,-2,-13,-4,-8,1,1,4,-9,-3,2,-1,-4,-3,-6,2,1,-3,-4,-1,-9,3,-16,-3,-5,2,38,12,35,1;-1083,761,14,-4,2,3,11,-1,1,-2,-5,-6,-28,0,-37,-7,-18,3,32,6,-26,-2,-2,2,4,1,-5,0,-5,-3,-12,-1,-19,3,25,4,-21,-1,22,3,-17,1,19,2,-10,1,8,2,23,-3,16,-7,20,0,2,2,-10,2,5,2,-9,3,15,4,3,-1,-1,-1,5,-4,-2,-1;-932,742,28,-4,-17,-10,-21,0,7,-3,-5,-5,-12,0,-4,17,9,0,-5,2,2,1,18,2;-974,696,21,-8,-13,-3,-28,4,-1,2,10,2,0,3,5,-1,-2,3,8,-2;-1145,726,17,4,15,-3,-4,-4,15,4,-5,3,7,0,12,-4,10,-10,5,3,-9,13,17,0,11,-4,10,-12,-1,-5,34,-10,2,-3,-25,-1,4,-2,-1,-3,9,3,4,-3,-11,-4,-22,1,-16,5,-7,-4,-21,-3,-36,-2,-6,7,-28,2,-7,7,56,2,-22,4,-38,-1,-7,4,30,5,-26,-1,-3,1,5,2,-13,1,8,5,-2,2,18,6,23,2,2,-3,-4,-4;-1197,741,22,1,21,-7,-37,-9,-11,-4,-4,-7,-25,-4,-9,6,-18,3,20,18,-9,5,32,2,18,-4;-555,515,-5,-2,2,-3,-10,-14,6,5,7,-1,-6,-4,9,-1,-2,-4,9,4,9,-2,-6,-5,5,-1,-4,-3,11,2,-9,-6,3,0,-3,-2,2,-2,8,5,-3,-6,4,3,1,-3,-4,-8,-5,-1,0,5,-6,-2,3,5,-3,5,-3,-5,-13,-5,10,8,-45,-1,0,3,10,6,-9,1,5,0,3,5,4,-1,-2,4,4,1,-1,2,9,13,10,6,5,-1;-300,836,42,-3,-62,-3,69,2,34,-5,-14,-4,-68,-2,48,-1,8,-3,30,4,1,-5,-19,-8,35,8,21,-2,14,4,19,0,28,-3,-54,-9,9,-2,-6,-1,-37,-3,8,-3,0,-4,4,-1,-21,-5,1,-1,-7,-9,22,0,-12,-1,2,-2,21,-1,1,-4,-43,-2,27,-6,5,-6,-1,-3,-27,-1,12,0,1,-5,9,4,7,-7,-18,-2,-9,1,2,3,-2,1,-3,-5,19,-3,-2,-3,-17,-2,-32,6,7,-4,-13,-2,-12,1,8,-2,-11,-1,35,3,21,-5,-3,-8,-18,4,-5,5,-21,-3,19,2,1,-3,-4,-3,31,-6,-5,-3,7,1,3,-10,-9,0,0,4,-3,-5,-6,1,-13,7,-25,4,13,-1,1,-3,-27,-2,3,-3,-10,-3,25,1,-10,-4,2,-1,19,4,32,-4,-16,-3,-26,-10,-45,-6,-13,3,1,-4,-10,-4,-14,-12,-13,0,3,-3,-22,-5,-2,1,7,6,-9,1,4,-1,-3,-4,-4,1,3,-3,-20,-1,5,-3,-14,-3,9,-5,-14,-2,10,-2,1,-4,-9,-6,-8,1,6,-2,-3,-3,-10,0,7,-1,1,-7,-5,-2,3,-1,-7,-11,-9,1,7,-2,1,-3,-9,-1,3,-1,-2,-1,-5,1,2,4,-4,-3,-8,2,6,5,-12,-1,1,6,-10,-4,-13,0,4,2,-6,0,-9,6,-1,3,6,2,-8,-1,0,2,-7,3,5,5,-6,-2,-11,12,12,2,-14,0,10,5,7,-3,-1,3,-9,5,3,-4,-12,-6,-6,11,14,5,-15,-3,-6,1,1,4,-3,0,22,9,-24,-7,2,4,10,3,-13,1,-1,4,13,4,19,-3,-6,2,2,1,-13,0,-14,-3,5,7,16,-1,4,3,-22,-1,4,3,19,0,3,2,-4,-1,1,4,8,1,-8,0,8,8,-20,1,-22,6,38,-3,-11,6,8,0,-20,2,1,3,11,2,-16,-1,3,2,-6,6,-2,-1,4,-4,-5,-4,-16,1,8,8,-8,-2,3,2,-3,1,9,4,-10,1,4,3,-8,3,3,2,-4,3,-10,0,9,4,-23,9,3,1,-2,2,-48,7,-37,-2,2,-2,-15,1,-12,3,14,3,-31,4,48,2,1,3,-31,-1,-11,2,4,1,-27,4,12,4,58,6,10,8,6,1,-26,0,-4,1,2,2,25,6,15,-1,-2,2,2,1,16,-1,3,3,-1,3,8,2,38,-5,-27,6,48,4,8,-2,1,-5,6,2,0,4,35,-4,-14,5,9,1,53,-7,4,7,-13,2,42,1,-47,1,-4,1,3,1,58,2,22,-3,3,2,-8,2,10,1,77,1;-1800,-844,235,-8,-10,3,9,1,-85,4,13,1,-9,1,6,3,-37,1,-64,10,148,-7,60,9,4,2,-17,5,7,2,-30,4,89,4,-25,5,25,5,-80,12,-4,1,3,0,19,3,-35,2,-7,3,3,6,34,1,51,-7,15,3,-6,2,2,2,29,-4,-1,2,3,1,-5,1,4,1,-1,3,-40,3,14,3,29,-3,-10,3,4,2,37,4,14,-2,-3,2,15,3,31,0,12,5,139,0,28,3,35,-1,6,6,11,-2,-3,-3,5,-1,-8,-5,24,2,-1,5,6,1,10,-3,-12,-7,83,1,21,-3,24,2,-19,3,4,4,-12,0,-15,9,39,0,-40,3,-5,5,3,1,7,-1,0,-2,60,-3,55,0,21,6,6,-1,-2,-4,26,0,36,-7,9,2,1,5,9,-2,-1,5,16,-6,19,0,-1,-3,82,7,11,3,9,7,-19,27,17,2,-4,3,6,7,-3,2,4,4,-8,1,0,4,5,2,5,-4,0,6,7,1,0,3,5,3,8,0,-1,3,8,2,-3,2,3,3,7,-1,0,2,15,3,7,5,35,9,6,-4,-15,-2,-7,-4,2,-3,-12,1,-21,-9,3,-3,-5,-3,17,0,-4,-4,-17,1,1,-5,-12,4,-3,-4,3,-2,-9,1,-3,-4,2,-1,-7,-1,-1,-7,8,0,-7,-2,5,-1,-2,-2,11,-2,2,3,10,1,-8,-3,17,-14,-4,-3,9,-1,-5,-4,7,0,3,-3,-10,-5,8,1,2,-2,-13,-2,16,-1,0,-3,-6,-2,13,-4,-9,-3,-11,2,12,-6,-10,-3,8,-1,-8,-2,10,1,-2,-3,-12,1,3,-4,-5,-2,-8,3,0,-2,-7,-1,7,-2,-11,-1,9,-2,-68,-12,-70,1,15,-8,28,-3,-19,-5,-68,4,42,-6,-5,-3,-24,-1,-35,8,6,-4,-5,0,1,-2,27,-9,8,2,39,-1,2,-2,-6,-3,-31,-1,33,-1,13,-8,44,3,51,-9,32,-1,-37,-4,12,-4,44,2,-22,-3,15,-5,-2,-4,19,-1,37,10,51,5,44,1,3,-3,-5,-3,15,1,13,1,26,11,23,3,16,-2,77,9,59,2,-64,4,-6,5,-36,0,-20,3,0,3,21,11,52,10,106,10,-5,2,14,8,17,0,11,5,-16,0,3,1,-6,2,1,2,8,3,14,0,-1,4,28,3,5,6,-13,4,15,-2,8,5,-3,2,11,-3,6,-5,9,2,-1,7,19,1,3,-2,-5,-4,50,0,6,-4,24,7,66,5,6,3,26,-6,14,7,7,-2,26,2,17,-4,9,3,0,-5,4,-2,17,1,6,5,13,-5,10,4,8,-5,17,-1,61,10,4,4,-4,7,9,2,7,0,-4,-4,8,0,8,-6,24,0,11,-5,13,14,62,12,2,3,8,-1,-3,-2,4,-1,7,0,2,-3,8,8,-7,2,21,-2,-3,8,34,5,16,-1,17,-5,0,-2,-9,1,4,-3,-7,-3,4,-1,14,3,17,-5,103,-3,4,-7,-5,-2,1,-5,-7,-2,2,-5,-9,1,-9,-5,19,-1,-27,-27,8,-2,7,2,0,3,4,3,12,1,17,8,5,8,15,10,23,0,22,7,12,9,43,6,12,5,76,6,73,-1,33,7,68,-10,11,4,3,4,22,3,25,-10,-16,-4,0,-2,62,4,-11,-4,68,10,16,-7,15,0,11,8,33,2,9,-4,11,4,73,-9,10,1,9,-2,-6,-8,20,3,11,-8,38,0,4,-4,20,0,6,5,16,-7,43,-5,16,-13,8,-2,-2,6,7,1,6,-3,43,-2,26,-8,2,2,5,-5,-9,-2,2,-5,-18,2,14,-3,-3,-4,-30,2,12,-5,-24,-5,-2,5,-3,0,0,-6,6,-6,-20,2,-10,-8,-15,-1,13,-2,6,-3,-4,-4,4,-3,-4,-5,7,0,13,-9,-4,-3,14,2,17,-7,-45,-2,-9,4,-2,-2,5,-3,-11,-1,-4,-1,1,-2,-6,-2,3,-1,-4,-2,7,-1,-20,-4,20,0,2,-3,-5,-1,4,-1,-2,-4,31,-8,-23,-4,34,1,39,-7,-9,-1,4,-2,115,-9,-3596,-1';
const AARDE = { tex: null, wolk: null, cache: {} };
function aardeTextuur() { if (AARDE.tex) return AARDE.tex;
  const TW = 2048, TH = 1024, cv = document.createElement('canvas'); cv.width = TW; cv.height = TH; const g = cv.getContext('2d');
  const X = (lon) => (lon + 180) / 360 * TW, Y = (lat) => (90 - lat) / 180 * TH;
  const og = g.createLinearGradient(0, 0, 0, TH); og.addColorStop(0, '#16325C'); og.addColorStop(0.5, '#1F5A96'); og.addColorStop(1, '#16325C'); g.fillStyle = og; g.fillRect(0, 0, TW, TH);
  const polys = AARDE_LAND.split(';').map(r => { const n = r.split(',').map(Number), pts = []; let x = 0, y = 0; for (let i = 0; i < n.length; i += 2) { x += n[i]; y += n[i + 1]; pts.push([x / 10, y / 10]); } return pts; });
  polys.forEach(p => { for (let i = 1; i < p.length; i++) { const d = p[i][0] - p[i - 1][0]; if (d > 180) p[i][0] -= 360 * Math.round(d / 360); else if (d < -180) p[i][0] += 360 * Math.round(-d / 360); } }); // over de datumgrens: doorlopend maken
  const pad = () => { g.beginPath(); for (const p of polys) for (const off of [-360, 0, 360]) { p.forEach(([lo, la], i) => i ? g.lineTo(X(lo + off), Y(la)) : g.moveTo(X(lo + off), Y(la))); g.closePath(); } };
  g.save(); pad(); g.strokeStyle = 'rgba(70,150,200,0.35)'; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke(); g.restore();
  g.save(); pad(); g.clip();
  const lg = g.createLinearGradient(0, 0, 0, TH); [[0, '#E8EEF2'], [0.1, '#DCE4E8'], [0.15, '#6E7F5A'], [0.2, '#3F6B3A'], [0.3, '#4F7A3C'], [0.38, '#8A8A50'], [0.45, '#4C7D34'], [0.5, '#3E7A30'], [0.56, '#4C7D34'], [0.63, '#8E8A55'], [0.7, '#5D7F3E'], [0.84, '#7A8C6A'], [0.88, '#E8EEF2'], [1, '#F2F5F7']].forEach(([o, c]) => lg.addColorStop(o, c)); g.fillStyle = lg; g.fillRect(0, 0, TW, TH);
  const vlek = (lon, lat, rx, ry, col, a) => { const x = X(lon), y = Y(lat), sx = rx / 360 * TW, sy = ry / 180 * TH; g.save(); g.translate(x, y); g.scale(1, sy / sx); const rg = g.createRadialGradient(0, 0, 0, 0, 0, sx); rg.addColorStop(0, col); rg.addColorStop(0.45, col + 'B0'); rg.addColorStop(1, col + '00'); g.globalAlpha = a; g.fillStyle = rg; g.beginPath(); g.arc(0, 0, sx, 0, 6.283); g.fill(); g.restore(); };
  const ZAND = '#D2B27A', STEP = '#A89A62', ROTS = '#9C7E5A', OER = '#2F6A2A';
  [[10, 22, 28, 9, ZAND, 1], [-5, 20, 14, 7, ZAND, 0.9], [25, 24, 10, 6, ZAND, 1], [45, 23, 12, 9, ZAND, 1], [55, 29, 9, 5, ROTS, 0.6], [65, 31, 8, 4, STEP, 0.45], [100, 42, 16, 5, STEP, 0.5], [85, 39, 9, 3, ZAND, 0.6], [62, 44, 10, 5, STEP, 0.4],
   [133, -25, 14, 9, ZAND, 1], [122, -24, 8, 7, ROTS, 0.9], [20, -24, 8, 7, STEP, 0.9], [16, -26, 4, 6, ZAND, 0.9], [-112, 35, 9, 7, ROTS, 0.8], [-104, 40, 6, 9, STEP, 0.45], [-70, -24, 3, 9, ZAND, 0.9], [-67, -42, 4, 7, STEP, 0.8], [45, 5, 6, 6, STEP, 0.4], [-40, -8, 6, 6, STEP, 0.3],
   [-62, -4, 16, 9, OER, 0.9], [22, 0, 10, 6, OER, 0.8], [110, 0, 14, 6, OER, 0.7], [140, -5, 6, 4, OER, 0.7], [90, 60, 50, 8, '#3D5E36', 0.6], [-100, 56, 30, 7, '#3D5E36', 0.6]].forEach(v => vlek(...v));
  vlek(-41, 73, 26, 14, '#EEF3F6', 1); vlek(-41, 66, 14, 8, '#EEF3F6', 0.8); g.fillStyle = '#EEF3F6'; g.fillRect(0, Y(-62), TW, TH);
  g.restore();
  g.save(); pad(); g.clip(); for (let i = 0; i < 9000; i++) { const x = hash(i * 3.1) * TW, y = hash(i * 7.7 + 1) * TH, r = 1 + hash(i * 1.3 + 2) * 3; g.fillStyle = hash(i + 5) > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'; g.fillRect(x, y, r, r); } g.restore();
  const zi = g.createLinearGradient(0, 0, 0, TH); zi.addColorStop(0, 'rgba(235,242,246,0.95)'); zi.addColorStop(0.07, 'rgba(235,242,246,0.5)'); zi.addColorStop(0.11, 'rgba(235,242,246,0)'); zi.addColorStop(0.9, 'rgba(235,242,246,0)'); zi.addColorStop(0.95, 'rgba(235,242,246,0.6)'); zi.addColorStop(1, 'rgba(235,242,246,0.95)'); g.fillStyle = zi; g.fillRect(0, 0, TW, TH);
  AARDE.tex = g.getImageData(0, 0, TW, TH); AARDE.tw = TW; AARDE.th = TH;
  const CW = 512, CH = 256, wd = new Float32Array(CW * CH);
  const vn = (x, y, s) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, h = (a, b) => hash(((a % s) + s) % s * 131 + b * 977 + s), sm = u => u * u * (3 - 2 * u); return lerp(lerp(h(xi, yi), h(xi + 1, yi), sm(fx)), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), sm(fx)), sm(fy)); };
  for (let j = 0; j < CH; j++) { const lat = 90 - (j + 0.5) / CH * 180, band = 0.35 * Math.exp(-Math.pow((Math.abs(lat) - 52) / 14, 2)) + 0.22 * Math.exp(-Math.pow(lat / 7, 2)) - 0.12 * Math.exp(-Math.pow((Math.abs(lat) - 25) / 8, 2));
    for (let i = 0; i < CW; i++) { let v = 0, amp = 0.5, f = 8; for (let o = 0; o < 4; o++) { v += amp * vn(i / CW * f + j * 0.004 * f, j / CH * f * 0.55, f); amp *= 0.5; f *= 2; } wd[j * CW + i] = clamp((v + band - 0.6) * 2.4, 0, 0.72); } }
  AARDE.wolk = wd; AARDE.cw = CW; AARDE.ch = CH; return AARDE.tex; }
function aardeBeeld(R, lonC, latC, wolkLon) {
  aardeTextuur(); const D = Math.ceil(R * 2), key = D + '|' + latC; let c = AARDE.cache[key];
  if (!c) { const lat = new Float32Array(D * D), lon = new Float32Array(D * D), sh = new Float32Array(D * D), rim = new Float32Array(D * D), cp = Math.cos(latC * Math.PI / 180), sp = Math.sin(latC * Math.PI / 180);
    const L = [-0.55, 0.45, 0.70], Ln = Math.hypot(...L); L[0] /= Ln; L[1] /= Ln; L[2] /= Ln;
    for (let j = 0; j < D; j++) for (let i = 0; i < D; i++) { const u = (i + 0.5 - R) / R, v = (R - j - 0.5) / R, d2 = u * u + v * v, k = j * D + i; if (d2 > 1) { lat[k] = NaN; continue; } const z = Math.sqrt(1 - d2);
      lat[k] = Math.asin(clamp(v * cp + z * sp, -1, 1)) * 180 / Math.PI; lon[k] = Math.atan2(u, z * cp - v * sp) * 180 / Math.PI;
      const nl = u * L[0] + v * L[1] + z * L[2]; sh[k] = 0.18 + 0.95 * Math.max(0, nl) + 0.1 * Math.pow(Math.max(0, nl), 24); rim[k] = clamp((Math.sqrt(d2) - 0.86) / 0.14, 0, 1) * clamp(1 - Math.sqrt(d2), 0, 1) * 4; }
    c = AARDE.cache[key] = { lat, lon, sh, rim, cv: document.createElement('canvas'), D }; c.cv.width = c.cv.height = D; c.cx = c.cv.getContext('2d'); c.img = c.cx.createImageData(D, D); }
  const T = AARDE.tex.data, TW = AARDE.tw, TH = AARDE.th, Wd = AARDE.wolk, CW = AARDE.cw, CH = AARDE.ch, o = c.img.data;
  for (let k = 0; k < D * D; k++) { const la = c.lat[k], p = k * 4; if (la !== la) { o[p + 3] = 0; continue; }
    let lo = c.lon[k] + lonC; lo = ((lo + 180) % 360 + 360) % 360; const tx = Math.min(TW - 1, lo / 360 * TW | 0), ty = Math.min(TH - 1, (90 - la) / 180 * TH | 0), q = (ty * TW + tx) * 4;
    let wl = c.lon[k] + wolkLon; wl = ((wl + 180) % 360 + 360) % 360; const wa = Wd[Math.min(CH - 1, (90 - la) / 180 * CH | 0) * CW + Math.min(CW - 1, wl / 360 * CW | 0)];
    const s = c.sh[k], r0 = T[q] * (1 - wa) + 245 * wa, g0 = T[q + 1] * (1 - wa) + 248 * wa, b0 = T[q + 2] * (1 - wa) + 250 * wa, rm = c.rim[k];
    o[p] = Math.min(255, r0 * s + rm * 60); o[p + 1] = Math.min(255, g0 * s + rm * 110); o[p + 2] = Math.min(255, b0 * s + rm * 190); o[p + 3] = 255; }
  c.cx.putImageData(c.img, 0, 0); return c.cv; }
// Wat word jij? · Bio-informatica 2 · Miljoenen varianten: welke maakt ziek? — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Sam, meeloopweek, eigen kleren; Dr. Kim, klinisch geneticus, outfit gewoon).
// Het kind komt nooit in beeld (dossiermap, kindertekening, stamboomschema). Geen ziekenhuisbed, geen spuiten.
// Ouders in H3: Anouk (moeder, 34) en Milan (vader, 36), figuranten uit lib_cast.js (Kamiel 25 okt 2026); aan tafel, zittend, met Dr. Kim aan het hoofdeinde.
const TRX = 560, TRY = 220, TRS = 0.85; // trechter in hoofdstuk 2

function samKim(ctx, t, o = {}) { const { xs = 200, xk = 420, h = 420, a = 1, poseS = 'staan', poseK = 'staan', uitS = 'neutraal', uitK = 'neutraal', kijkS = 1, kijkK = 1, namen = 1 } = o; if (a <= 0.01) return;
  persoon(ctx, 'sam', xs, 800, h, { t, a, pose: poseS, uit: uitS, kijk: kijkS });
  persoon(ctx, 'kim', xk, 800, h, { t, a, pose: poseK, uit: uitK, kijk: kijkK, outfit: 'gewoon' });
  if (namen > 0.01) { const sep = xk - xs < 300; naamBij(ctx, 'Sam', sep ? '' : 'meeloopweek', xs, 800 - h * 1.04 - 40, a * namen, 'center'); naamBij(ctx, 'Dr. Kim', 'klinisch geneticus', xk, 800 - h * 1.02 - 40, a * namen, 'center'); } }
// harde wissel tussen twee beelden rond een woord: eerst het oude weg, dan het nieuwe (geen spookachtige mensen)
function wissel(q, w, n = 1, d = 0.3) { const tw = q.at(w, n); return [1 - ramp(q.localT, tw - d - 0.05, d), ramp(q.localT, tw, d)]; }
// uitslaggesprek: de ouders zitten achter de tafel (vooraanzicht), Dr. Kim van opzij aan het hoofdeinde; op 'hand' legt Anouk haar hand op die van Milan
const TAFEL = 640;
function gesprek(ctx, t, o = {}) { const { a = 1, hand = 0, uitM = 'neutraal', uitV = 'neutraal', uitK = 'neutraal', xm = 450, xv = 620, xk = 1020, h = 430 } = o; if (a <= 0.01) return;
  spreekkamer(ctx, { a, x0: 330, x1: 1130, top: TAFEL, map: 1, tekening: 0, stoelen: false }); // map onder Kims handen
  const rV = persoon(ctx, 'milan', xv, 800, h, { t, a, pose: 'zit', stoel: true, tafel: TAFEL, uit: uitV, kijk: 1 });
  persoon(ctx, 'anouk', xm, 800, h, { t, a, pose: 'zit', stoel: true, tafel: TAFEL, uit: uitM, kijk: 1, handOpHand: hand > 0.5 && rV.handL ? rV.handL : null });
  persoon(ctx, 'kim', xk, 800, h, { t, a, zij: true, kijk: -1, pose: 'zit', stoel: true, tafel: TAFEL, outfit: 'gewoon', uit: uitK });
  spreekkamer(ctx, { a, x0: 330, x1: 1130, top: TAFEL, map: 0, tekening: 0, stoelen: false }); // tafelblad vóór de mensen
  naamBij(ctx, 'Dr. Kim', '', xk, 300, a, 'center'); metaA(ctx, 'de ouders', (xm + xv) / 2, 300, a, C.grain, 'center', 28); }
function tijdKaartje(ctx, s2, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 50; ctx.letterSpacing = '0px';
  roundRect(ctx, x - w / 2, y - 42, w, 60, 30); shape(ctx, rgba(C.goud, 0.14), C.goud, 1.5); metaText(ctx, s2, x, y - 2, C.goud, 'center', 28); ctx.restore(); }
function teller(ctx, x, y, u, a = 1, px = 44) { if (a <= 0.01) return; const n = Math.round(4100000 * ease(u)); regel(ctx, n.toLocaleString('nl-NL').replace(/\./g, ' ') + (u >= 0.999 ? '+' : '') + ' varianten', x, y, a, C.goud, px, 'right', 700); }

Object.assign(SCENES, {
  title(ctx, t) {
    trechter(ctx, 1650, 300, { s: 0.6, lagen: [1, 1, 1], aA: [1, 0, 0, 0], uit: 1, namen: 0, aantal: ['ruim 4 000 000', '', '', ''] });
    metaA(ctx, 'blijft er één over?', 1650, 720, 1, C.grain, 'center', 28);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    spreekkamer(ctx, { x0: 140, x1: 980, top: 640, tekening: 0, map: 1, stoelen: false });
    kinderTekeningGroot(ctx, 360, 545, 0.72);
    const K = q.on('meisje', 1, 0.5), O = q.on('ouders', 1, 0.5);
    stamboom(ctx, 560, 160, 0.72, { aO: 0.35 + 0.65 * O, aK: 1, labels: O, leeftijd: '4 jaar' });
    zacht(ctx, K * (1 - O), () => { circ(ctx, 560, 160 + 144, 46, null, C.goud, 3); });
    const box = scherm(ctx, 1080, 110, 780, 690, 'varianten · meisje');
    const tD = q.at('DNA', 1), tM = q.at('miljoenen', 1); const rol = t < tD ? 0 : (t < tM ? (t - tD) * 1.2 : (tM - tD) * 1.2 + (t - tM) * 9);
    kolomKoppen(ctx, { x: box.x, y: box.y + 20 }); rolLijst(ctx, { x: box.x, y: box.y + 30, w: box.w, h: box.h - 110 }, rol, { a: 1 });
    teller(ctx, 1830, 778, clamp((t - tM) / 2.5, 0, 1), q.on('miljoenen', 1, 0.4), 40);
    vraagteken(ctx, 1000, 330, q.on('variant', 1), 120); },

  // ---------- H1 van sequencer naar variantenlijst ----------
  s03(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 190, xk: 420, h: 420, poseK: q.on('lezen', 1) > 0.5 && q.on('computer', 1) < 0.5 ? 'wijs' : 'staan' });
    const L = q.on('gelezen', 1, 0.5), R = q.on('computer', 1, 0.6);
    [['kind', 640], ['vader', 780], ['moeder', 920]].forEach(([lb, x], i) => buisje(ctx, x, 470, lb, 1, 1 - 0.5 * L));
    sequencer(ctx, 1150, 400, 1, t, L);
    naamBij(ctx, 'machine leest het DNA', 'in korte stukjes', 1150, 222, L, 'center');
    // korte stukjes stromen uit de machine en schuiven daarna op hun plek tegen het referentiegenoom
    const tR = q.at('computer', 1);
    for (let i = 0; i < 12; i++) { const n = 6 + Math.floor(hash(i * 3.1) * 4), sx = 1290 + (i % 3) * 30, sy = 300 + i * 18; const doelX = 700 + hash(i * 7.7) * 1000, doelY = 640 - 26 - (i % 3) * 22;
      const vrij = clamp((t - q.at('stukjes', 1) - i * 0.12) / 0.8, 0, 1) * L; const plek = ease(clamp((t - tR - 0.6 - i * 0.15) / 1.2, 0, 1));
      const fx = lerp(sx + vrij * (180 + hash(i) * 200), doelX, plek), fy = lerp(sy + vrij * (hash(i + 3) - 0.5) * 120, doelY, plek); leesStukje(ctx, fx, fy, n, i, vrij); }
    referentie(ctx, 700, 1820, 660, R);
    naamBij(ctx, 'referentiegenoom', 'afgesproken voorbeeldgenoom', 1260, 720, q.on('referentiegenoom', 1), 'center'); },

  s04(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 200, xk: 410, h: 420, poseS: q.on('ziek', 1) > 0.5 ? 'wijsOmhoog' : 'staan', uitS: q.on('ziek', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    const box = scherm(ctx, 640, 110, 1220, 690, 'varianten · meisje');
    const P = fasen(q, [null, ['lijst', 1]], 0.5);
    zacht(ctx, P[0], () => { const ref = 'ACGTTAGCCTAG', mei = 'ACGTTGGCCTAG';
      metaA(ctx, 'referentie', box.x + 10, box.y + 90, 1, C.text2, 'left', 28); metaA(ctx, 'meisje', box.x + 10, box.y + 230, 1, C.text2, 'left', 28);
      for (let i = 0; i < 12; i++) { const x = box.x + 280 + i * 62; tegel(ctx, x, box.y + 80, ref[i]); const d = ref[i] !== mei[i]; tegel(ctx, x, box.y + 220, mei[i], { rand: d && q.on('afwijkt', 1) > 0.5 ? C.koraal : null });
        if (!d) { ctx.fillStyle = rgba(C.line, 0.8); ctx.fillRect(x - 1.5, box.y + 116, 3, 66); } }
      naamBij(ctx, 'variant', 'een plek die afwijkt', box.x + 280 + 5 * 62, box.y + 330, ramp(t, q.at('variant', 1) - 0.3, 0.6), 'center', C.koraal); });
    zacht(ctx, P[1], () => { kolomKoppen(ctx, { x: box.x, y: box.y + 20 }); rolLijst(ctx, { x: box.x, y: box.y + 30, w: 900, h: box.h - 110 }, (t - q.at('lijst', 1)) * 7 + 20, { seed: 50 }); });
    teller(ctx, 1830, 778, clamp((t - q.at('lijst', 1)) / 2.2, 0, 1), P[1], 40);
    vraagteken(ctx, 1700, 330, q.on('denk', 1), 120); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ieder mens verschilt zoveel');
    const P = fasen(q, [null, ['meeste', 1]], 0.5);
    zacht(ctx, P[0], () => { [['jij', 360], ['je buurman', 1060]].forEach(([nm, x], k) => { const box = scherm(ctx, x, 220, 600, 520, 'varianten · ' + nm);
        rolLijst(ctx, { x: box.x - 10, y: box.y + 10, w: 580, h: 340 }, t * 3 + k * 40, { seed: 300 + k * 900 }); regel(ctx, '4 à 5 miljoen', x + 300, 700, q.on('vier', 1), C.goud, 44, 'center', 700); });
      metaA(ctx, 'ieder mens · gemeten', 960, 800, q.on('mens', 1), C.grain, 'center', 28); });
    zacht(ctx, P[1], () => {
      dnaStrook(ctx, 200, 340, 700, { genen: [[0.05, 0.35, 'gen'], [0.65, 0.95, 'gen']], plekken: [{ x: 0.5, col: C.text2 }] });
      naamBij(ctx, 'tussen twee genen', 'doet niets', 550, 450, 1, 'center', C.text2);
      codonRij(ctx, 1150, 300, 'GAG'); regel(ctx, '→', 1335, 312, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1400, 300, 'GAA', { mark: 2 }); aaKraal(ctx, 1200, 400, 34, 'E'); aaKraal(ctx, 1450, 400, 34, 'E');
      naamBij(ctx, 'zelfde aminozuur', 'doet niets', 1325, 500, 1, 'center', C.text2);
      stempel(ctx, 960, 660, 'een verschil, geen fout', C.groen, q.on('verschil', 2), -0.05); }); },

  // ---------- H2 filteren ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    samKim(ctx, t, { xs: 110, xk: 270, h: 380, namen: 0, poseS: q.on('vraagt', 1) > 0.5 && q.on('filtert', 1) < 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Sam', '', 110, 360, 1, 'center'); naamBij(ctx, 'Dr. Kim', '', 270, 360, 1, 'center');
    const F = q.on('filtert', 1, 0.6), E1 = q.on('één', 1);
    trechter(ctx, TRX, TRY, { s: TRS, lagen: [F, F, F], namen: q.on('algoritme', 1), hl: E1 > 0.5 ? 0 : -1, aA: [1, q.on('tienduizend', 1), 0, 0] });
    naamBij(ctx, 'algoritme', 'een vast stappenplan', TRX, 800, q.on('algoritme', 1), 'center');
    const A = q.on('aminozuur', 1), S = q.on('stopcodon', 1);
    zacht(ctx, A, () => { codonRij(ctx, 1260, 300, 'GAG'); regel(ctx, '→', 1440, 312, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1500, 300, 'GTG', { mark: 1 }); aaKraal(ctx, 1310, 400, 34, 'E'); aaKraal(ctx, 1550, 400, 34, 'V', 1, C.goud);
      naamBij(ctx, 'ander aminozuur', '', 1430, 500, 1, 'center'); });
    zacht(ctx, S, () => { codonRij(ctx, 1260, 590, 'CAG'); regel(ctx, '→', 1440, 602, 1, C.text2, 40, 'center', 700); codonRij(ctx, 1500, 590, 'TAG', { mark: 0 }); aaKraal(ctx, 1310, 690, 34, 'Q'); stopKraal(ctx, 1550, 690, 36);
      naamBij(ctx, 'stopcodon', 'eiwit stopt te vroeg', 1430, 790, 1, 'center'); }); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    trechter(ctx, TRX, TRY, { s: TRS, hl: 1, aA: [1, 1, q.on('honderd', 2), 0] });
    const D = q.on('databank', 1), T = q.on('tien', 1), G = q.on('gewoon', 1);
    databank(ctx, 1170, 230, { a: D, aan: 3, aanA: T });
    naamBij(ctx, 'databank', 'dna van honderdduizenden mensen', 1480, 540, D, 'center');
    zacht(ctx, T, () => { roundRect(ctx, 1290, 620, 12, 48, 4); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.2); regel(ctx, '1 op de 10', 1330, 660, 1, C.text, 40, 'left', 700); });
    kruis(ctx, 1296, 644, 30, G); regel(ctx, 'te gewoon', 1330, 720, G, C.koraal, 36, 'left', 700); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    trechter(ctx, TRX, TRY, { s: TRS, hl: 2, aA: [1, 1, 1, 0] });
    const G = q.on('gezond', 1), V = q.on('eiwitvarianten', 1);
    const s = (col, a) => ({ col, a });
    stamboom(ctx, 1480, 300, 0.95, { labels: 1, gezond: G, leeftijd: '', streep: { v: [s(C.teal, V), s(C.teal, V), s(C.teal, V)], m: [s(C.oker, V), s(C.oker, V), s(C.oker, V)], k: [s(C.teal, V), s(C.oker, V)] } }); // alleen geërfde streepjes: het eigen streepje komt pas na de vraag (s11/s12)
    vraagteken(ctx, 1560, 600, V * (1 - q.on('denk', 1)), 80);
    vraagteken(ctx, 1780, 600, q.on('denk', 1), 120); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: één of twee');
    dim(ctx, () => trechter(ctx, TRX, TRY, { s: TRS, hl: 2, aA: [0, 0, 0, 0] }));
    const Z = q.on('zaadcel', 1), E = q.on('eicel', 1);
    // t = 0: het kind-rondje met tientallen kleine nieuwe streepjes; op 'zaadcel' maakt het plaats voor de geslachtscellen
    zacht(ctx, 1 - Z, () => { circ(ctx, 1200, 400, 70, C.paars, C.text, 3); metaA(ctx, 'kind', 1200, 300, 1, C.text2, 'center', 28);
      for (let i = 0; i < 40; i++) { const col = i % 10, rij = Math.floor(i / 10), u = clamp(t * 1.5 - i * 0.03, 0, 1); zacht(ctx, u, () => { roundRect(ctx, 1320 + col * 26, 350 + rij * 34, 8, 26, 3); shape(ctx, C.text2, null); }); }
      regel(ctx, 'tientallen nieuwe veranderingen', 1430, 530, 1, C.text, 36, 'center', 700); });
    zaadcelEcht(ctx, 1240, 300, 0, t, 2.2, { a: Z });
    for (let i = 0; i < 3; i++) zacht(ctx, Z, () => { roundRect(ctx, 1240 - 9 + i * 7, 289, 4, 22, 2); shape(ctx, C.goud, null); }); // op de zaadcelkop
    naamBij(ctx, 'zaadcel', 'meestal hier', 1240, 380, Z, 'center');
    eicelEcht(ctx, 1240, 560, 70, E);
    zacht(ctx, E, () => { roundRect(ctx, 1235, 545, 10, 34, 3); shape(ctx, C.goud, null); });
    naamBij(ctx, 'eicel', '', 1240, 706, E, 'center');
    chip(ctx, 'in de eiwitcode: meestal 1 of 2', 1600, 650, C.goud, q.on('eiwitcode', 1), 30);
    const B = q.on('bevruchte', 1, 0.8);
    pijl(ctx, 1340, 440, 1460, 440, C.line, B, 3, 14);
    zacht(ctx, B, () => { circ(ctx, 1560, 440, 70, rgba(C.oker, 0.2), C.oker, 2); roundRect(ctx, 1555, 420, 12, 40, 4); shape(ctx, C.goud, lighten(C.goud, 0.3), 1.2); });
    naamBij(ctx, 'de novo', 'nieuw', 1560, 560, q.on('novo', 1), 'center', C.goud);
    const EC = q.on('elke', 1, 0.8);
    zacht(ctx, EC, () => { pijl(ctx, 1640, 440, 1690, 440, C.line, 1, 3, 12); for (let k = 0; k < 7; k++) { const an = k / 7 * 6.283, cx = 1780 + (k ? Math.cos(an) * 56 : 0), cy = 440 + (k ? Math.sin(an) * 56 : 0); circ(ctx, cx, cy, 28, rgba(C.oker, 0.2), C.oker, 1.5); ctx.fillStyle = C.goud; ctx.fillRect(cx - 3, cy - 10, 6, 20); } });
    naamBij(ctx, 'elke cel', '', 1780, 560, EC, 'center'); },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const P = fasen(q, [null, ['recessieve', 1], ['ongeveer', 1], ['meisje', 1]], 0.5);
    trechter(ctx, TRX, TRY, { s: TRS, hl: P[3] > 0.5 ? -1 : 2, aA: [1, 1, 1, q.on('meisje', 1)], aantal: ['ruim 4 000 000', 'ongeveer 10 000', 'een paar honderd', '1 over'], uit: q.on('over', 1) });
    const s = (col, o = {}) => Object.assign({ col }, o);
    zacht(ctx, P[0], () => { const X = q.on('valt', 1); stamboom(ctx, 1480, 280, 0.95, { labels: 1, gezond: 1, leeftijd: '', streep: { v: [s(C.teal), s(C.koraal, { ring: 1 })], m: [s(C.oker)], k: [s(C.koraal, { ring: 1, kruis: X })] } });
      regel(ctx, 'valt meestal af', 1480, 700, X, C.koraal, 36, 'center', 700); });
    zacht(ctx, P[1], () => { stamboom(ctx, 1480, 280, 0.95, { labels: 1, gezond: 1, leeftijd: '', streep: { v: [s(C.teal, { ring: 1 })], m: [s(C.oker, { ring: 1 })], k: [s(C.teal, { ring: 1 }), s(C.oker, { ring: 1 })] } });
      naamBij(ctx, 'recessief', 'twee in één gen · één van elke ouder', 1480, 700, 1, 'center', C.goud); });
    zacht(ctx, P[2], () => { for (let i = 0; i < 3; i++) telpop(ctx, 1320 + i * 150, 480, 150, i === 0 ? C.goud : C.mens, 1); regel(ctx, 'ongeveer 1 op 3: oorzaak gevonden', 1470, 590, 1, C.text, 36, 'center', 700); regel(ctx, 'bij de rest nog niet', 1470, 645, q.on('rest', 1), C.text2, 34, 'center', 600); });
    zacht(ctx, P[3], () => { const box = scherm(ctx, 1110, 260, 750, 300, 'na de filters'); varRij(ctx, box.x + 20, box.y + 70, 'chr6', '43 512 907', 'C', 'T', { hl: 1, w: 700 });
      naamBij(ctx, 'de novo', 'gen actief in hersencellen', 1485, box.y + 190, q.on('hersencellen', 1), 'center', C.goud); }); },

  // ---------- H3 een variant met onbekende betekenis ----------
  s13(ctx, t, q) { bg(ctx, 'schema');
    const K = q.on('klassen', 1, 0.6), M = q.on('midden', 1, 1.0);
    dnaStrook(ctx, 560, 210, 800, { genen: [[0.38, 0.62, '']], plekken: [{ x: 0.5, a: 1 - M }] }); naamBij(ctx, 'gen', '', 860, 170, 1 - K, 'center');
    vraagteken(ctx, 1460, 250, q.on('ziektegen', 1) * (1 - K), 100); naamBij(ctx, 'weinig onderzocht', '', 960, 300, q.on('weinig', 1) * (1 - K), 'center', C.text2);
    vijfvak(ctx, 186, 360, { a: K, bw: 300, hl: M > 0.5 ? 2 : -1, streep: 2, aStreep: M });
    zacht(ctx, (1 - M) * K * q.on('midden', 1, 0.01), () => {});
    // het streepje valt van het gen in het middelste vak
    const fx = 960, fy = lerp(210, 415, ease(M)); if (M > 0.01 && M < 0.99) zacht(ctx, 1, () => { roundRect(ctx, fx - 6, fy - 34, 12, 68, 4); shape(ctx, C.goud, null); });
    chip(ctx, '= onduidelijke uitslag', 960, 700, C.text2, q.on('onduidelijke', 1), 34); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const [W1, W2] = wissel(q, 'weken');
    zacht(ctx, W1, () => { vijfvak(ctx, 700, 200, { bw: 200, h: 80, hl: 2, streep: 2, aStreep: 1, labels: 0 }); regel(ctx, 'onbekende betekenis', 1240, 340, 1, C.text2, 32, 'center', 600);
      samKim(ctx, t, { xs: 520, xk: 860, h: 430, poseS: 'denk', kijkK: -1 }); });
    if (W2 > 0.01) zacht(ctx, W2, () => {
      tijdKaartje(ctx, 'een paar weken later', 960, 120, 1);
      const V = q.on('vader', 1), Wt = q.on('wacht', 1);
      gesprek(ctx, t, { hand: Wt, uitM: 'ernstig', uitV: V > 0.5 && Wt < 0.5 ? 'praat' : 'ernstig', uitK: 'ernstig' });
      metaA(ctx, 'zonder Sam · privé', 1500, 420, q.on('privé', 1), C.text2, 'center', 28);
      vraagteken(ctx, 1600, 600, q.on('denk', 1), 120); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: nog onduidelijk, nu niets op beslissen');
    const [Z1, Z] = wissel(q, 'zegt');
    zacht(ctx, Z1, () => { stempel(ctx, 960, 330, 'overblijven ≠ bewijs', C.koraal, 0.3 + 0.7 * q.on('Overblijven', 1), -0.04); regel(ctx, 'geen diagnose', 960, 440, q.on('diagnose', 1), C.text, 40, 'center', 700);
      const B = q.on('behandeling', 1), F = q.on('familie', 1);
      zacht(ctx, B, () => { roundRect(ctx, 560, 540, 130, 70, 35); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); ctx.fillStyle = rgba(C.oker, 0.8); ctx.fillRect(625, 540, 65, 70); kruis(ctx, 625, 575, 50, 1); naamBij(ctx, 'geen behandeling', '', 625, 680, 1, 'center'); });
      zacht(ctx, F, () => { buisje(ctx, 1290, 620, '', 1, 0.5); kruis(ctx, 1290, 560, 50, 1); naamBij(ctx, 'familie niet testen', 'voor de eigen gezondheid', 1290, 740, 1, 'center'); }); });
    if (Z > 0.01) zacht(ctx, Z, () => {
      gesprek(ctx, t, { hand: 1, uitM: 'ernstig', uitV: 'ernstig', uitK: q.on('niets', 1) > 0.5 ? 'ernstig' : 'praat' });
      vink_(ctx, 1300, 330, 26, q.on('weten', 1)); regel(ctx, 'nog niet bekend', 1350, 345, q.on('weten', 1), C.groen, 40, 'left', 700);
      kruis(ctx, 1300, 450, 24, q.on('niets', 1)); regel(ctx, 'niets gevonden', 1350, 465, q.on('niets', 1), C.koraal, 40, 'left', 700); }); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    const P = fasen(q, [null, ['Radboudumc', 1], ['anders', 1], ['ouders', 1]], 0.5);
    zacht(ctx, P[0], () => { const R = 300, cx = 960, cy = 450, lonC = -25, latC = 22; aardeVast(ctx, cx, cy, R, 1, lonC, latC);
      const pts = [[5.8, 51.8], [-71, 42.3], [-46.6, -23.5]].map(([lo, la]) => bolPunt(cx, cy, R, lo, la, lonC, latC));
      const on = [q.on('lab', 1), q.on('elders', 1), q.on('Drie', 1)];
      for (let i = 1; i < 3; i++) zacht(ctx, on[i], () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); ctx.quadraticCurveTo((pts[0].x + pts[i].x) / 2, Math.min(pts[0].y, pts[i].y) - 80, pts[i].x, pts[i].y); ctx.stroke(); ctx.setLineDash([]); });
      pts.forEach((p, i) => artsIcoon(ctx, p.x, p.y, 1, on[i], i === 2 ? q.on('Drie', 1) : 0));
      naamBij(ctx, 'koppelsite', 'artsen met hetzelfde gen', 960, 820, on[0], 'center');
      regel(ctx, 'zelfde gen, zelfde klachten', 1310, 240, q.on('Drie', 1), C.goud, 36, 'left', 700); regel(ctx, 'moeilijk toeval', 1310, 290, q.on('toeval', 1), C.text, 34, 'left', 600); });
    zacht(ctx, P[1], () => { metaA(ctx, 'radboudumc · kinderen zonder diagnose', 960, 260, 1, C.grain, 'center', 28); tijdKaartje(ctx, 'vijf jaar later', 960, 350, q.on('jaar', 1));
      for (let i = 0; i < 10; i++) telpop(ctx, 610 + i * 78, 560, 120, i < 3 && q.on('alsnog', 1) > 0.5 ? C.goud : C.mens, 1);
      regel(ctx, 'bijna een derde: alsnog een diagnose', 960, 660, q.on('alsnog', 1), C.goud, 40, 'center', 700); });
    zacht(ctx, P[2], () => { const L = q.on('onschuldig', 1, 1.2); vijfvak(ctx, 330, 340, { bw: 240, h: 100, hl: -1 });
      // zes neutrale grijze streepjes (niet de variant van het meisje): de meeste schuiven naar (waarschijnlijk) onschuldig, één blijft, één gaat naar rechts
      const doel = [0, 0, 1, 0, 2, 3], mid = 330 + 2 * 252 + 120; doel.forEach((d, i) => { const x0 = mid - 75 + i * 30, x1 = 330 + d * 252 + 120 - 30 + (i % 3) * 30, sx = lerp(x0, x1, ease(clamp(L * 1.3 - i * 0.06, 0, 1))); roundRect(ctx, sx - 6, 362, 12, 56, 4); shape(ctx, '#C9CED6', '#8FA0B5', 1.2); });
      regel(ctx, 'veel varianten met onbekende betekenis: later onschuldig', 960, 700, L, C.groen, 36, 'center', 700); });
    zacht(ctx, P[3], () => { jaarKalender(ctx, 760, 430, 1.1, 1, q.on('nieuwe', 1)); regel(ctx, 'over een paar jaar', 1020, 400, 1, C.text, 40, 'left', 700); regel(ctx, 'nieuwe analyse?', 1020, 460, q.on('nieuwe', 1), C.goud, 40, 'left', 700); metaA(ctx, 'de ouders kiezen zelf', 1020, 530, q.on('kiezen', 1), C.grain, 'left', 28); }); },

  // ---------- H4 GWAS en risicoscores ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    const [G1, G] = wissel(q, 'GWAS');
    zacht(ctx, G1, () => { afdelingGang(ctx, 1, [1640]); samKim(ctx, t, { xs: 330, xk: 700, h: 440, poseS: q.on('hartziekte', 1) > 0.5 && q.on('schudt', 1) < 0.5 ? 'denk' : 'staan', kijkK: -1, uitS: q.on('hartziekte', 1) > 0.5 && q.on('schudt', 1) < 0.5 ? 'verbaasd' : 'neutraal' });
      hartje(ctx, 400, 190, 0.8, q.on('hartziekte', 1)); regel(ctx, '1 variant?', 450, 205, q.on('variant', 1), C.text, 38, 'left', 700); kruis(ctx, 700, 190, 24, q.on('schudt', 1));
      const V = q.on('veel', 1); dnaStrook(ctx, 960, 230, 880, { a: V, plekken: Array.from({ length: 22 }, (_, i) => ({ x: 0.03 + i * 0.044 + 0.01 * hash(i), a: clamp((t - q.at('veel', 1)) * 4 - i * 0.15, 0, 1), col: C.koraal })) });
      naamBij(ctx, 'heel veel varianten', 'elk een klein effect', 1400, 330, V, 'center'); });
    zacht(ctx, G, () => { tag(ctx, 'GWAS · genoombrede associatiestudie', 960, 170, C.goud, 1, 'center', 40);
      const M = q.on('vergelijkt', 1), L = q.on('letter', 1);
      for (let g = 0; g < 2; g++) zacht(ctx, M, () => { const x0 = g ? 1080 : 260; regel(ctx, g ? 'zonder hartziekte' : 'met hartziekte', x0 + 290, 300, 1, g ? C.text : C.koraal, 36, 'center', 700);
        for (let i = 0; i < 12; i++) { const px = x0 + 40 + (i % 6) * 100, py = 440 + Math.floor(i / 6) * 190; telpop(ctx, px, py, 100, g ? C.mens : rgba(C.koraal, 0.85), 1); const isG = g ? [1, 4, 6, 9, 11].includes(i) : [0, 2, 3, 5, 7, 8, 10].includes(i); tegel(ctx, px, py + 40, isG ? 'G' : 'A', { w: 36, h: 42, px: 28, a: L, rand: isG && L > 0.5 ? C.goud : null }); } });
      metaA(ctx, 'vaker G bij de zieken', 960, 830, q.on('zieken', 1), C.goud, 'center', 28); }); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    const u = clamp((t - 0.2) / 3.5, 0.05, 1);
    manhattan(ctx, 220, 220, 1380, 520, { u });
    regel(ctx, '≈ 1 000 000 tests', 1600, 180, q.on('miljoen', 1), C.goud, 40, 'right', 700);
    metaA(ctx, 'zoals in toeval of echt?', 220, 160, q.on('Toeval', 1) * (1 - q.on('Stel', 1)), C.grain, 'left', 28);
    regel(ctx, 'stel: geen enkele plek doet iets', 220, 160, q.on('Stel', 1), C.text, 36, 'left', 700);
    vraagteken(ctx, 1760, 460, q.on('denk', 1), 120); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer vijftigduizend');
    const P = fasen(q, [null, ['treffer', 1]], 0.5);
    zacht(ctx, P[0], () => { const H = q.on('strengere', 1);
      manhattan(ctx, 220, 260, 1300, 480, { laag: q.on('Nul', 1) * (1 - H * 0.6), boven: q.on('Nul', 1) * (1 - H), hoog: H });
      zacht(ctx, q.on('keer', 1) * (1 - H * 0.7), () => { roundRect(ctx, 1020, 180, 840, 70, 14); shape(ctx, rgba(C.bgSchema, 0.94), C.koraal, 2); regel(ctx, '0,05 × 1 000 000 = 50 000', 1440, 230, 1, C.text, 44, 'center', 700); }); });
    zacht(ctx, P[1], () => { manhattan(ctx, 220, 220, 900, 380, { hoog: 1, toren: 1, u: 1 });
      const N = q.on('maar', 1); dnaStrook(ctx, 1220, 420, 620, { genen: [[0.55, 0.9, 'gen', 1]], plekken: [{ x: 0.3, col: C.goud }, { x: 0.68, col: C.koraal, a: N }] });
      naamBij(ctx, 'treffer', 'gemeten plek', 1406, 520, 1, 'center', C.goud); naamBij(ctx, 'oorzaak', 'de buurman', 1640, 520, N, 'center', C.koraal);
      zacht(ctx, N, () => boogPijlBi2(ctx, 1406, 370, 1640, 370, C.koraal)); }); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    const S = q.on('risicoscore', 1), V = q.on('vergelijkt', 1);
    scoreBalk(ctx, 260, 230, 1400, { u: clamp((t - 0.3) / 3.2, 0, 1) });
    naamBij(ctx, 'polygene risicoscore', 'veel kleine effecten opgeteld', 960, 360, S, 'center');
    scoreVerdeling(ctx, 460, 470, 1000, 240, { a: V, aJ: q.on('aanleg', 1) });
    chip(ctx, 'een kans, geen diagnose', 960, 830, C.groen, q.on('kans', 1), 32);
    vraagteken(ctx, 1700, 560, q.on('denk', 1), 120); },

  s24(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: minder goed dan bij Europese voorouders');
    const P = fasen(q, [null, ['buurman', 1]], 0.5);
    zacht(ctx, P[0], () => { const R = 280, cx = 960, cy = 500, lonC = 15, latC = 25; aardeVast(ctx, cx, cy, R, 1, lonC, latC);
      [[10, 50, 46], [-90, 40, 18], [105, 35, 18], [20, 0, 9], [-60, -15, 8]].forEach(([lo, la, r], i) => { const p = bolPunt(cx, cy, R, lo, la, lonC, latC); if (p.zicht) zacht(ctx, clamp((t - q.at('deelnemers', 1) - i * 0.2) / 0.5, 0, 1), () => circ(ctx, p.x, p.y, r, rgba(C.goud, 0.75), C.goud, 2)); });
      naamBij(ctx, 'de meeste deelnemers', 'europese voorouders', 1290, 300, q.on('Europese', 1), 'left', C.goud);
      regel(ctx, 'risicoscore: minder betrouwbaar bij niet-Europese afkomst', 960, 840, q.on('deelnemers', 1), C.text, 36, 'center', 700); });
    zacht(ctx, P[1], () => { [['Europese voorouders', 330, true], ['Afrikaanse voorouders', 600, false]].forEach(([nm, y, vast]) => {
        regel(ctx, nm, 240, y + 12, q.on('afkomst', 1) || (vast ? 1 : 0), C.text, 36, 'left', 700); const a = vast ? 1 : q.on('afkomst', 1);
        dnaStrook(ctx, 700, y, 1000, { a, genen: [[0.5, 0.75, 'gen']], plekken: [{ x: 0.25, col: C.goud }, { x: 0.58, col: C.koraal }] });
        zacht(ctx, a, () => { const x1 = 700 + 250, x2 = 700 + 580; ctx.strokeStyle = vast ? C.groen : C.koraal; ctx.lineWidth = 3; if (!vast) ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(x1, y - 44); ctx.lineTo(x1, y - 64); ctx.lineTo(x2, y - 64); ctx.lineTo(x2, y - 44); ctx.stroke(); ctx.setLineDash([]); if (!vast) kruis(ctx, (x1 + x2) / 2, y - 64, 18, 1); }); });
      naamBij(ctx, 'gemeten plek', '', 950, 410, 1, 'center', C.goud); naamBij(ctx, 'oorzaak', '', 1280, 410, 1, 'center', C.koraal);
      chip(ctx, 'leefstijl telt mee', 960, 820, C.groen, q.on('leefstijl', 1), 32); }); },

  // ---------- Recap ----------
  s25(ctx, t, q) { bg(ctx, 'schema');
    const l1 = q.on('eiwit', 1), l2 = q.on('zeldzaam', 1), l3 = q.on('familie', 1);
    trechter(ctx, 450, 200, { s: 0.8, lagen: [1, 1, 1], hl: l3 > 0.5 ? 2 : l2 > 0.5 ? 1 : l1 > 0.5 ? 0 : -1, aA: [1, 0, 0, q.on('één', 1)], aantal: ['ruim 4 000 000', '', '', 'soms 1'], uit: q.on('één', 1) });
    const B = q.on('bewijs', 1);
    vijfvak(ctx, 900, 230, { a: B, bw: 120, h: 70, hl: 2, streep: 2, aStreep: 1, labels: 0 }); regel(ctx, 'overblijven ≠ bewijs', 1220, 380, B, C.koraal, 36, 'center', 700);
    jaarKalender(ctx, 1700, 300, 0.55, q.on('weet', 1), 1); regel(ctx, 'eerlijk: nog niet bekend', 1220, 430, q.on('eerlijk', 1), C.text2, 32, 'center', 600);
    const K = q.on('kansen', 1); scoreBalk(ctx, 900, 590, 940, { a: K, u: clamp((t - q.at('kansen', 1)) / 1.5, 0, 1) }); naamBij(ctx, 'veelvoorkomende ziekten', 'kleine kansen opgeteld', 1370, 710, K, 'center'); },

  s26(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'sam', 180, 800, 400, { t, kijk: 1, uit: 'blij' }); naamBij(ctx, 'Sam', '', 180, 360, 1, 'center');
    const KG = q.on('Klinisch', 1, 0.6);
    zacht(ctx, 1 - KG, () => { opleiding(ctx, 420, 150, 620, 'hbo · vier jaar', 'Bio-informatica', 'HAN · Nijmegen', q.on('hbo', 1), C.teal);
      opleiding(ctx, 420, 360, 620, 'wo-bachelor · Radboud', 'Biologie of', 'Moleculaire Levenswetenschappen', q.on('bachelor', 1), C.paars, true);
      pijl(ctx, 1060, 435, 1140, 435, C.line, q.on('master', 1), 3, 14);
      opleiding(ctx, 1160, 360, 620, 'master', 'Bioinformatics (and Systems Biology)', 'Wageningen', q.on('master', 1), C.paars);
      [['ziekenhuis', 700], ['instituut', 1000], ['bedrijf', 1300]].forEach(([s2, x], i) => { const a = clamp((t - q.at('werkt', 1) - i * 0.5) / 0.4, 0, 1); werkIcoon(ctx, x, 660, s2, a); regel(ctx, ['ziekenhuis', 'onderzoeksinstituut', 'bedrijf'][i], x, 760, a, C.text2, 28, 'center', 600); }); });
    zacht(ctx, KG, () => { persoon(ctx, 'kim', 1500, 800, 440, { t, kijk: -1, outfit: 'gewoon', uit: 'blij' }); naamBij(ctx, 'Dr. Kim', 'klinisch geneticus', 1500, 300, 1, 'center');
      opleiding(ctx, 420, 250, 760, 'arts', 'Geneeskunde', 'eerst arts worden', q.on('geneeskunde', 1), C.teal);
      opleiding(ctx, 420, 460, 760, 'vervolgopleiding · vier jaar', 'Klinisch geneticus', 'na geneeskunde', q.on('vervolgopleiding', 1), C.goud); }); },
});

function boogPijlBi2(ctx, x1, y1, x2, y2, col) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 70; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.restore(); const an = Math.atan2(y2 - my, x2 - mx); pijl(ctx, x2 - Math.cos(an) * 2, y2 - Math.sin(an) * 2, x2, y2, col, 1, 4, 18); }
