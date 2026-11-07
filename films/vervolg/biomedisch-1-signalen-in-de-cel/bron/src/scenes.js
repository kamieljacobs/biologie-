
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
// Wat word jij? · Biomedische wetenschappen 1 · Signalen in de cel — eigen tekeningen (24 okt 2026)
// Moleculen volgens BEELDAFSPRAKEN: eiwitten als kralenketting die opgevouwen is, ATP = base + suiker + drie fosfaatgroepen,
// celmembraan gebogen (stuk van een cirkel) als dubbele laag fosfolipiden, inhoud blijft binnen het membraan.

const SB = { fosfaat: '#E8A23A', fosfaatR: '#F6CB7E', camp: '#7FC4B8', campR: '#B5E3DA', rem: '#E07A5F', kinase: '#C9A35C', aan: '#F2D27A', ras: '#8C7BBF', bcr: '#5BA4C9', abl: '#E07A5F', pil: '#F2F2EE' };

// ---------- gebogen membraan ----------
// punt op de cirkel boven: y bij x; hoek (raaklijn) bij x
function arcY(cx, cy, R, x) { return cy - Math.sqrt(Math.max(0, R * R - (x - cx) * (x - cx))); }
function arcHoek(cx, cy, R, x) { return Math.asin(clamp((x - cx) / R, -1, 1)); }
// celinhoud onder de boog (cytoplasma): zacht vlak met weinig, kleine rustige deeltjes
function celBinnen(ctx, cx, cy, R, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, R - 30, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill(); ctx.clip();
  for (let i = 0; i < 70; i++) { const x = hash(i * 7 + 1) * W, y = hash(i * 7 + 2) * 900; const w = wander(i + 300, t, 6, 0.3); ctx.beginPath(); ctx.arc(x + w.x, y + w.y, 2.2, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.13); ctx.fill(); }
  ctx.restore(); }
// dubbele laag fosfolipiden langs de boog; gaten (x-posities) waar een eiwit doorheen steekt
function membraan(ctx, cx, cy, R, x0, x1, o = {}) { const { a = 1, gaten = [], gat = 46 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 8, d = 28, step = 19; const n = Math.floor((x1 - x0) / step);
  for (let k = 0; k <= n; k++) { const x = x0 + k * step; if (gaten.some(g => Array.isArray(g) ? Math.abs(g[0] - x) < g[1] : Math.abs(g - x) < gat)) continue; const an = arcHoek(cx, cy, R, x) - Math.PI / 2; const ux = Math.cos(an), uy = Math.sin(an); const yb = arcY(cx, cy, R, x);
    for (const [rr, inw] of [[d, 1], [-d, -1]]) { const hx = x + ux * rr, hy = yb + uy * rr; ctx.strokeStyle = V.vt; ctx.lineWidth = 2.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx - uy * sd * 3, hy + ux * sd * 3); ctx.lineTo(hx - ux * inw * (d - 5) - uy * sd * 3.5, hy - uy * inw * (d - 5) + ux * sd * 3.5); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, C.er, lighten(C.er, 0.3), 1); } }
  ctx.restore(); }

// ---------- eiwit als kralenketting ----------
function _kralen(ctx, pts, r, kleur, o = {}) { const { gloed = 0, lijn = null } = o; ctx.save();
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed * 0.55; ctx.strokeStyle = SB.aan; ctx.lineWidth = r * 3.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
  ctx.strokeStyle = lijn || lighten(kleur, 0.35); ctx.lineWidth = 2.2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  pts.forEach((p, i) => { const tint = [0, 0.15, 0.3, -0.12][i % 4]; ctx.beginPath(); if (i % 5 === 3) roundRect(ctx, p[0] - r * 0.9, p[1] - r * 0.9, r * 1.8, r * 1.8, r * 0.4); else ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, tint >= 0 ? lighten(kleur, tint) : _mix(kleur, 0.2), lighten(kleur, 0.45), 1.1); });
  ctx.restore(); }
// opgevouwen kluwen (kinase, enzym): keten van n kralen, compact gevouwen; aan 0..1 = gloed; P = aantal fosfaatgroepen erop
function kluwen(ctx, x, y, R, o = {}) { const { a = 1, n = 26, seed = 1, kleur = SB.kinase, aan = 0, P = 0, t = 0, zak = false, vorm = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = R * 0.16, pts = []; for (let i = 0; i < n; i++) { const th = i / (n - 1) * 6.283 * 1.15 + seed; const rr = R * (0.35 + 0.55 * Math.abs(Math.sin(i * 0.9 + seed * 1.7))) * (1 + 0.06 * vorm * Math.sin(i)); const w = wander(i + seed * 40, t, r * 0.12, 0.5);
    pts.push([x + Math.cos(th * 1.3 + vorm * 0.35) * rr * 0.95 + w.x, y + Math.sin(th * 1.7) * rr * 0.8 + w.y]); }
  _kralen(ctx, pts, r, kleur, { gloed: aan });
  if (zak) { ctx.beginPath(); ctx.arc(x + R * 0.55, y - R * 0.1, R * 0.32, 0, 6.283); ctx.fillStyle = rgba(C.bgMicro, 0.85); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]); }
  for (let k = 0; k < P; k++) fosfaat(ctx, x - R * 0.7 + k * R * 0.5, y - R * 0.95, R * 0.22, 1);
  ctx.restore(); }

// ---------- kleine moleculen ----------
function fosfaat(ctx, x, y, r = 13, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, SB.fosfaat, SB.fosfaatR, 1.5); text(ctx, 'P', x, y + r * 0.42, fTekst(r * 1.2, 800), '#3A2410', 'center'); ctx.restore(); }
function _vijfhoek(ctx, x, y, r, fill, stroke) { ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; i ? ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r) : ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, fill, stroke, 1.5); }
// ATP: base (zes- + vijfring) – suiker (vijfring) – staart van nP fosfaatgroepen; los = de laatste fosfaat springt naar (lx, ly)
function atp(ctx, x, y, s = 1, o = {}) { const { a = 1, nP = 3, los = 0, lx = 0, ly = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = 16 * s; hexagon(ctx, x - r * 3.2, y, r, rgba(C.paars, 0.6), C.paars, 1.5); _vijfhoek(ctx, x - r * 1.75, y - r * 0.2, r * 0.85, rgba(C.paars, 0.6), C.paars);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * 0.9, y); ctx.lineTo(x - r * 0.1, y); ctx.stroke(); _vijfhoek(ctx, x + r * 0.6, y, r * 0.85, rgba(C.oker, 0.55), C.oker);
  for (let k = 0; k < nP; k++) { let px = x + r * 2.2 + k * r * 1.75, py = y; const laatste = k === nP - 1;
    if (laatste && los > 0.01) { const u = ease(los); px = lerp(px, lx, u); py = lerp(py, ly, u) - Math.sin(u * Math.PI) * 60 * s; } else { ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(px - r * 1.75 + r * 0.7, py); ctx.lineTo(px - r * 0.7, py); ctx.stroke(); }
    fosfaat(ctx, px, py, r * 0.72, 1); }
  ctx.restore(); }
// cAMP: suiker met één fosfaatgroep die er een ring mee vormt, plus de base
function camp(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = 12 * s;
  hexagon(ctx, x - r * 2, y - r * 0.4, r * 0.8, rgba(C.paars, 0.6), C.paars, 1.2); _vijfhoek(ctx, x, y, r * 0.8, rgba(SB.camp, 0.55), SB.camp);
  ctx.strokeStyle = SB.campR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + r * 0.6, y - r * 0.5); ctx.quadraticCurveTo(x + r * 1.6, y - r * 0.8, x + r * 1.7, y); ctx.quadraticCurveTo(x + r * 1.6, y + r * 0.8, x + r * 0.6, y + r * 0.6); ctx.stroke();
  fosfaat(ctx, x + r * 1.75, y, r * 0.6, 1); ctx.restore(); }
function glucose(ctx, x, y, r = 12, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(C.teal, 0.55), C.teal, 1.3); ctx.restore(); }

// ---------- receptor met zeven helices door het membraan (adrenalinereceptor) ----------
// lokaal: membraan horizontaal op y=0, buiten = negatief; vorm 0..1 = vormverandering na binden (binnenlussen zakken en kantelen)
function receptor7(ctx, x, y, ang, s = 1, o = {}) { const { a = 1, vorm = 0, bind = 0, t = 0, gloed = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const pts = []; const H = 40; const xs = [-96, -64, -32, 0, 32, 64, 96];
  pts.push([-140, -78], [-118, -62]);
  xs.forEach((hx, i) => { const op = i % 2 === 0; const sh = vorm * (i >= 4 ? 14 : -6); for (let k = 0; k <= 4; k++) { const f = k / 4; const yy = op ? lerp(-H, H, f) : lerp(H, -H, f); pts.push([hx + sh * (yy + H) / (2 * H) + Math.sin(f * 6.283) * 5, yy]); }
    if (i < 6) { const binnen = op; const lus = binnen ? H + 20 + (i === 4 ? vorm * 34 : 0) : -H - 18; pts.push([hx + 16 + (binnen && i === 4 ? vorm * 10 : 0), lus]); } });
  pts.push([110 + vorm * 18, H + 30 + vorm * 30], [96 + vorm * 30, H + 56 + vorm * 40], [70 + vorm * 40, H + 70 + vorm * 46]);
  _kralen(ctx, pts, 9, '#AFC0D0', { gloed: gloed });
  if (bind > 0.01) { const d = 150 * (1 - ease(bind)); hormoonVorm(ctx, -6, -62 - d, 18, 'adrenaline', Math.min(1, bind * 3)); }
  ctx.restore(); }
// groeifactorreceptor: één keer door het membraan, binnen een kinasekluwen; P = fosfaatgroepen
function receptorRTK(ctx, x, y, ang, s = 1, o = {}) { const { a = 1, P = 0, aan = 0, t = 0, seed = 3, ligand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const pts = []; for (let k = 0; k < 6; k++) pts.push([Math.sin(k * 1.3 + seed) * 22, -120 + k * 14]); for (let k = 0; k < 6; k++) pts.push([Math.sin(k * 0.9) * 4, -46 + k * 18]);
  _kralen(ctx, pts, 9, '#AFC0D0', {}); kluwen(ctx, 0, 110, 46, { seed, kleur: SB.kinase, aan, t });
  for (let k = 0; k < P; k++) fosfaat(ctx, -36 + k * 36, 168, 13, 1);
  if (ligand > 0.01) { const d = 120 * (1 - ease(ligand)); hormoonVorm(ctx, 0, -130 - d, 16, 'groei', Math.min(1, ligand * 3), C.groen); }
  ctx.restore(); }

// ---------- schakelaar (Ras) ----------
function rasSchakel(ctx, x, y, aan, a = 1, o = {}) { if (a <= 0.01) return; const { vast = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  kluwen(ctx, x, y, 40, { seed: 7, kleur: SB.ras, aan, t, n: 20 });
  const bx = x + 64, by = y - 22; roundRect(ctx, bx, by, 72, 40, 20); shape(ctx, aan > 0.5 ? rgba(C.groen, 0.85) : '#3A4458', C.line, 2); circ(ctx, bx + (aan > 0.5 ? 52 : 20), by + 20, 15, '#F2F2EE');
  if (vast > 0.01) { ctx.save(); ctx.globalAlpha *= vast; const lx = bx + 92, ly = by + 2; roundRect(ctx, lx, ly + 14, 32, 26, 5); shape(ctx, C.koraal, null); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(lx + 16, ly + 14, 11, Math.PI, 0); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ---------- kern met DNA-draden en transcriptiefactor ----------
function kernDNA(ctx, x, y, r, o = {}) { const { a = 1, tf = 0, aan = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blob(ctx, x, y, r, r * 0.9, 0.03, 4, 0); shape(ctx, rgba(C.kern, 0.5), C.kernR, 2.5);
  ctx.save(); blob(ctx, x, y, r - 10, r * 0.9 - 10, 0.03, 4, 0); ctx.clip(); ctx.strokeStyle = rgba(C.kernR, 0.75); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = i / 40; const xx = x - r + f * 2 * r, yy = y - r * 0.5 + k * r * 0.33 + Math.sin(f * 9 + k * 2 + t * 0.4) * 14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore();
  if (aan > 0.01) { ctx.save(); ctx.globalAlpha *= aan; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const f = i / 12; const xx = x - r * 0.1 + f * r * 0.7, yy = y - r * 0.17 + Math.sin((0.45 + f * 0.35) * 9 + 1 * 2 + t * 0.4) * 14; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
  if (tf > 0.01) kluwen(ctx, x - r * 0.2, y - r * 0.2, 26, { a: tf, seed: 11, kleur: C.groen, n: 14, aan, t });
  ctx.restore(); }
// cel die deelt: u 0..1 = insnoeren en twee cellen
function delendeCel(ctx, x, y, r, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = r * 0.95 * ease(u);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sd * d, y, r * (1 - 0.3 * ease(u)), 0, 6.283); shape(ctx, rgba('#C9B896', 0.18), '#C9B896', 2.5); circ(ctx, x + sd * d, y, r * 0.32, rgba(C.kern, 0.6), C.kernR, 1.5); } ctx.restore(); }
// witte bloedcel met gelobde kern
function witteCel(ctx, x, y, r, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) circ(ctx, x, y, r * 1.35, rgba(C.koraal, 0.18 * gloed)); circ(ctx, x, y, r, rgba('#E6E1F0', 0.35), '#D6D0E6', 2);
  ctx.fillStyle = rgba(C.paars, 0.75); [[-0.3, -0.1], [0.05, 0.15], [0.3, -0.12]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, r * 0.26, r * 0.2, dx, 0, 6.283); ctx.fill(); }); ctx.restore(); }
// bloedplaatje (schijfje met korrels)
function bloedplaatje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.55, 0.3, 0, 6.283); shape(ctx, '#C9A0B8', '#E3C2D4', 1.5); for (let i = 0; i < 4; i++) circ(ctx, x - r * 0.4 + i * r * 0.27, y + (i % 2 ? 2 : -2), 2.5, '#8A5A7A'); ctx.restore(); }
// chromosoom: staafje met insnoering (centromeer); delen [kleur, lengte] van boven naar onder
function chromosoom(ctx, x, y, w, delen, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; let yy = y;
  delen.forEach(([col, L, cen], i) => { roundRect(ctx, x - w / 2, yy, w, L, w * 0.45); shape(ctx, rgba(col, 0.8), lighten(col, 0.3), 2); yy += L + (cen ? 6 : 0); });
  if (label) text(ctx, label, x, y - 22, fTekst(30, 700), C.text, 'center'); ctx.restore(); }
// tabletje
function tabletje(ctx, x, y, s = 1, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (gloed > 0.01) circ(ctx, x, y, 30 * s, rgba(C.goud, 0.25 * gloed));
  ctx.beginPath(); ctx.ellipse(x, y, 20 * s, 12 * s, 0, 0, 6.283); shape(ctx, SB.pil, '#C8CCD4', 2); ctx.strokeStyle = '#B8BCC6'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y - 10 * s); ctx.lineTo(x, y + 10 * s); ctx.stroke(); ctx.restore(); }
// remmer als klein molecuul (ringen) dat in de ATP-plek past
function remmer(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x - 20 * s, y, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); hexagon(ctx, x + 4 * s, y + 8 * s, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); hexagon(ctx, x + 28 * s, y, 13 * s, rgba(SB.pil, 0.8), C.goud, 2); ctx.restore(); }

// ---------- ontbijttafel (vóór de personages tekenen) ----------
function ontbijtTafel(ctx, x, y, w, a = 1, o = {}) { const { pil = 1, gloed = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 24, 6); shape(ctx, '#8C6A4A', '#A8865E', 2); ctx.fillStyle = '#6E5238'; ctx.fillRect(x + 30, y + 24, 22, 880 - y - 24); ctx.fillRect(x + w - 52, y + 24, 22, 880 - y - 24);
  // bord met boterham, koffiemok met damp, glas water
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y - 6, 80, 14, 0, 0, 6.283); shape(ctx, '#E6E9EE', '#B8C0CC', 2); roundRect(ctx, x + w * 0.3 - 46, y - 26, 92, 16, 6); shape(ctx, '#D9B074', '#B88A50', 1.5);
  const mx = x + w * 0.62; roundRect(ctx, mx - 30, y - 70, 60, 64, 10); shape(ctx, '#C9654B', '#E08A70', 2); ctx.strokeStyle = '#C9654B'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(mx + 34, y - 40, 15, -1.2, 1.2); ctx.stroke();
  ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = 0; k < 2; k++) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const yy = y - 84 - i * 9, xx = mx - 10 + k * 18 + Math.sin(i * 0.9 + t * 2 + k) * 6; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  roundRect(ctx, x + w * 0.8 - 22, y - 80, 44, 76, 6); shape(ctx, rgba('#CFE4F0', 0.25), '#AFC0D0', 2); ctx.fillStyle = rgba('#BFD8E6', 0.35); ctx.fillRect(x + w * 0.8 - 20, y - 50, 40, 44);
  tabletje(ctx, mx - 70, y - 10, 1, pil, gloed);
  ctx.restore(); }

// ---------- overleving: twee staven ----------
function overleving(ctx, x, y, w, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [['vroeger', 'na 5 jaar', '± 5 op 10', 0.5, C.text2, u1], ['met het tabletje', 'na 5 jaar', '± 9 op 10', 0.89, C.groen, u2], ['met het tabletje', 'na 10 jaar', 'ruim 8 op 10', 0.83, C.groen, u2]].forEach(([n, tijd, s2, v, col, u], i) => { const yy = y + i * 130; if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= clamp(u * 3, 0, 1);
    text(ctx, n, x, yy, fTekst(30, 700), C.text, 'left'); text(ctx, tijd, x + w * 0.52, yy, fTekst(30, 800), C.goud, 'left'); roundRect(ctx, x, yy + 20, w, 44, 10); shape(ctx, '#2A3446', C.line, 1.5); const ww = w * v * ease(u); if (ww > 4) { roundRect(ctx, x, yy + 20, ww, 44, 10); shape(ctx, rgba(col, 0.7), col, 2); }
    text(ctx, s2, x + w, yy, fTekst(28, 700), C.text, 'right'); ctx.restore(); });
  metaText(ctx, 'NOG IN LEVEN', x, y - 54, C.grain, 'left', 24); ctx.restore(); }
// telpoppetjes (1 op 5)
function popjeB(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// ---------- overgenomen uit engine/scenes.js (Geneeskunde 4): labMicroscoop, labTafel ----------
function labMicroscoop(ctx, x, y, s = 1, a = 1, kant = -1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * -kant, s);
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446';
  roundRect(ctx, -110, -34, 220, 34, 10); shape(ctx, body, rand, 2.5); if (licht > 0.01) circ(ctx, -20, -40, 14, rgba('#FFF4C8', 0.9 * licht));
  ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(70, -34); ctx.lineTo(70, -250); ctx.quadraticCurveTo(70, -300, 20, -300); ctx.lineTo(-10, -300); ctx.lineTo(-10, -262); ctx.lineTo(30, -262); ctx.lineTo(40, -250); ctx.closePath(); shape(ctx, body, rand, 2.5);
  roundRect(ctx, -100, -128, 160, 14, 4); shape(ctx, donker, rand, 2); roundRect(ctx, -40, -116, 30, 16, 3); shape(ctx, body, rand, 1.5);
  roundRect(ctx, -66, -134, 80, 6, 2); shape(ctx, rgba('#DCEBF4', 0.8), null);
  ctx.fillStyle = '#5A6478'; [-44, -22].forEach((ox, i) => { roundRect(ctx, ox - 8, -230, 16, 46 + i * 12, 4); ctx.fill(); });
  roundRect(ctx, -60, -262, 100, 40, 10); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(-40, -262); ctx.rotate(-0.6); roundRect(ctx, -14, -80, 28, 80, 6); shape(ctx, donker, rand, 2); roundRect(ctx, 16, -76, 26, 76, 6); shape(ctx, donker, rand, 2); ctx.restore();
  circ(ctx, 56, -90, 18, body, rand, 2.5); circ(ctx, 56, -90, 8, rand);
  ctx.restore(); }
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// AMP: wat er van cAMP overblijft als een enzym de ring openknipt (base + suiker + één fosfaatgroep)
function amp(ctx, x, y, s = 1, a = 1) { atp(ctx, x, y, s, { a, nP: 1 }); }
// het laatste enzym van de cascade (glycogeenfosforylase): andere kleur dan de kinasen
const SB_AFBRAAK = '#6FA8C9';

// ---------- hele ronde cel (sig-3, 25 okt 2026): dubbele laag fosfolipiden rondom; 'binnen' = andere cirkel waarbinnen het membraan wegvalt (delen)
function ringMembraan(ctx, cx, cy, R, o = {}) { const { a = 1, gaten = [], niet = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 5, d = 15, n = Math.floor(2 * Math.PI * R / 12);
  for (let k = 0; k < n; k++) { const an = k / n * 2 * Math.PI; if (gaten.some(g => Math.abs(Math.atan2(Math.sin(an - g), Math.cos(an - g))) * R < 26)) continue; const ux = Math.cos(an), uy = Math.sin(an);
    for (const [rr, inw] of [[R + d, 1], [R - d, -1]]) { const hx = cx + ux * rr, hy = cy + uy * rr; if (niet && Math.hypot(hx - niet[0], hy - niet[1]) < niet[2]) continue; ctx.strokeStyle = V.vt; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - ux * inw * (d - 4), hy - uy * inw * (d - 4)); ctx.stroke();
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, C.er, lighten(C.er, 0.3), 1); } }
  ctx.restore(); }
function celHeel(ctx, cx, cy, R, o = {}) { const { a = 1, t = 0, gaten = [], niet = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill(); ctx.save(); ctx.clip();
  for (let i = 0; i < 50; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)) * R * 0.95; const w = wander(i + 400, t, 4, 0.3); ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr + w.x, cy + Math.sin(an) * rr + w.y, 2, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.13); ctx.fill(); }
  ctx.restore(); ringMembraan(ctx, cx, cy, R, { gaten, niet }); ctx.restore(); }
// kernporiën: openingen in de kernenvelop (op de rand van kernDNA, ellips r × 0.9r)
function kernPorien(ctx, x, y, r, hoeken, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hoeken.forEach(h => { const px = x + Math.cos(h) * r, py = y + Math.sin(h) * r * 0.9; circ(ctx, px, py, 8, '#2A3448'); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, py, 8, h + 1.9, h + 4.4); ctx.stroke(); }); ctx.restore(); }
// Wat word jij? · Biomedische wetenschappen · Signalen in de cel — scènes per alinea (v1.0, 24 okt 2026). Look: Schema en Micro, met cast (Opa Henk, Noor, Dr. Kim).
// Rode draad: het tabletje naast de koffie van Opa Henk.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// gebogen celrand (bovenkant van een grote ronde cel): middelpunt ver onder beeld
const MB = { cx: 960, cy: 2900, R: 2600 };
function celRand(ctx, t, o = {}) { const { a = 1, gaten = [] } = o; celBinnen(ctx, MB.cx, MB.cy, MB.R, a, t); membraan(ctx, MB.cx, MB.cy, MB.R, 40, 1880, { a, gaten }); }
function opRand(x, dy = 0) { return [x, arcY(MB.cx, MB.cy, MB.R, x) + dy, arcHoek(MB.cx, MB.cy, MB.R, x)]; }
// ontbijtscène: Henk en Noor aan tafel
function ontbijt(ctx, t, o = {}) { const { a = 1, uitH = 'blij', uitN = 'blij', pil = 1, gloed = 0, pose = 'staan' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  persoon(ctx, 'henk', 560, 880, 470, { t, uit: uitH, kijk: 1, pose }); persoon(ctx, 'noor', 1360, 880, 450, { t, uit: uitN, kijk: -1 });
  ontbijtTafel(ctx, 640, 640, 640, 1, { pil, gloed, t }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const [x, y, an] = opRand(1520); membraan(ctx, MB.cx, MB.cy, MB.R, 1300, 1800, { gaten: [[1520, 120]] }); receptor7(ctx, x, y, an, 1.1, { bind: 1, vorm: 0.5 + 0.5 * Math.sin(t * 1.2), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const Z = q.on('snappen', 1, 0.8);
    if (Z < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * Z, 0, 1); ontbijt(ctx, t, { gloed: q.on('tabletje', 1, 0.4) * (1 - q.on('hij', 1)) + q.on('tabletje', 2, 0.4) * (1 - q.on('toom', 1)) + q.on('remt', 1) });
      naamBij(ctx, 'Opa Henk', '', 400, 300, 1, 'center'); naamBij(ctx, 'Noor', 'kleindochter', 1500, 320, 1, 'center');
      // sig-8 (25 okt): één kaartje tegelijk boven Opa Henk, niet over de tafel
      tag(ctx, 'elke ochtend · al vier jaar', 400, 200, C.goud, q.on('ochtend', 1) * (1 - q.on('leukemie', 1, 0.4)), 'center', 28); tag(ctx, 'leukemie', 400, 200, C.koraal, q.on('leukemie', 1) * (1 - q.on('remt', 1, 0.4)), 'center', 28);
      tag(ctx, 'remt een eiwit in zijn cellen', 400, 200, C.goud, q.on('remt', 1), 'center', 28); ctx.restore(); }
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * Z - 1, 0, 1); celRand(ctx, t, { gaten: [960] }); const [x, y, an] = opRand(960); receptor7(ctx, x, y, an, 1, { t });
      naamBij(ctx, 'levercel', 'binnenkant', 300, 700, q.on('levercel', 1), 'center');
      for (let i = 0; i < 4; i++) { const w = wander(i, t, 20, 0.5); hormoonVorm(ctx, 300 + i * 130 + w.x, 250 + (i % 2) * 40 + w.y, 18, 'adrenaline', q.on('adrenaline', 1)); }
      naamBij(ctx, 'adrenaline', 'buiten de cel', 300, 150, q.on('adrenaline', 1), 'left');
      tag(ctx, 'lost op in water', 1400, 150, C.teal, q.on('water', 1), 'center', 26); tag(ctx, 'slecht in vet: het membraan', 1400, 225, C.oker, q.on('vet', 1), 'center', 26);
      glycogeenKeten(ctx, 1100, 760, 1.4, q.on('glycogeen', 1)); for (let i = 0; i < 10; i++) { const f = clamp((t - q.at('glucose', 1)) * 0.8 - i * 0.12, 0, 1); glucose(ctx, 1400 + (i % 5) * 60, 720 + Math.floor(i / 5) * 60 + (1 - f) * 20, 14, f); }
      naamBij(ctx, 'glycogeen', '', 1100, 850, q.on('glycogeen', 1), 'center'); vraagteken(ctx, 960, 560, q.on('Hoe', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: de receptor verandert van vorm', 1); const S = q.on('film', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * S, 0, 1); celRand(ctx, t, { gaten: [960] }); const [x, y, an] = opRand(960); const b = q.on('Bindt', 1, 1.2), v = clamp((t - q.at('verandert', 1)) / 1.5, 0, 1);
      receptor7(ctx, x, y, an, 1.25, { t, bind: Math.max(b, 0.001) > 0.01 ? b : 0, vorm: v, gloed: q.on('signaal', 1) });
      for (let i = 0; i < 3; i++) hormoonVorm(ctx, 400 + i * 170, 200 + (i % 2) * 40, 16, 'adrenaline', 1 - q.on('Bindt', 1) * (i === 1 ? 1 : 0));
      naamBij(ctx, 'membraan', 'dubbele laag vet', 1500, 520, q.on('vet', 1), 'center'); naamBij(ctx, 'receptor', 'eiwit: kralenketting', 1180, 200, q.on('receptor', 1), 'left');
      tag(ctx, 'buiten', 200, 290, C.text2, 1, 'left', 26); tag(ctx, 'binnen', 200, 760, C.text2, 1, 'left', 26);
      tag(ctx, 'vormverandering = signaal', 960, 860, C.goud, q.on('signaal', 1), 'center', 30); ctx.restore(); }
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * S - 1, 0, 1); tag(ctx, 'film: Post voor iedereen', 960, 250, C.teal, 1, 'center', 28);
      // links: membraanreceptor, rechts: steroïd door het membraan naar de kern
      paneel(ctx, 140, 310, 760, 470, 'receptor in het membraan'); paneel(ctx, 1020, 310, 760, 470, 'receptor in de cel');
      ctx.save(); ctx.beginPath(); ctx.rect(150, 360, 740, 410); ctx.clip(); membraan(ctx, 520, 1500, 1050, 150, 890, { gaten: [520] }); const [x1, y1, a1] = [520, arcY(520, 1500, 1050, 520), 0]; receptor7(ctx, x1, y1, a1, 0.9, { bind: 1, vorm: 1, t, gloed: 0.6 }); ctx.restore();
      klokje(ctx, 760, 700, 40, 0.08, q.on('seconden', 1)); regel(ctx, 'seconden', 690, 710, q.on('seconden', 1), C.text, 30, 'right', 700);
      ctx.save(); ctx.beginPath(); ctx.rect(1030, 360, 740, 410); ctx.clip(); membraan(ctx, 1400, 1500, 1050, 1030, 1770, {}); const u = clamp((t - q.at('steroïdhormonen', 1)) / 4, 0, 1);
      kernDNA(ctx, 1330, 660, 85, { aan: q.on('transcriptiefactor', 1), t }); const rc = q.on('receptor', 2), m = clamp((t - q.at('Samen', 1)) / 2, 0, 1); const hx = lerp(1620, 1560, u), hy = lerp(400, 560, u); const rx2 = lerp(1560, 1340, ease(m)), ry2 = lerp(570, 650, ease(m)); kluwen(ctx, rx2, ry2, 30, { a: rc, seed: 11, kleur: C.groen, n: 14, aan: u > 0.95 ? 1 : 0, t }); hormoonVorm(ctx, u > 0.95 ? rx2 + 20 : hx, u > 0.95 ? ry2 - 26 : hy, 14, 'cortisol', q.on('steroïdhormonen', 1)); ctx.restore();
      naamBij(ctx, 'steroïdhormoon', '', 1400, 760, q.on('steroïdhormonen', 1) * (1 - q.on('receptor', 2)), 'center'); naamBij(ctx, 'receptor in het cytoplasma', '', 1400, 760, q.on('receptor', 2) * (1 - q.on('kern', 1)), 'center'); naamBij(ctx, 'samen naar de kern', '', 1400, 760, q.on('kern', 1), 'center');
      klokje(ctx, 1700, 700, 40, 0.7, q.on('uren', 1)); regel(ctx, 'uren', 1640, 710, q.on('uren', 1), C.text, 30, 'right', 700); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'micro'); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); receptor7(ctx, rx, ry, ra, 0.8, { bind: 1, vorm: 1, gloed: 0.5, t });
    hormoonVorm(ctx, 360, 120, 1, 'adrenaline', 0); naamBij(ctx, 'adrenaline', 'eerste boodschapper', 420, 150, q.on('eerste', 1), 'left');
    const E = q.on('enzym', 1); const ex = 640, ey = arcY(MB.cx, MB.cy, MB.R, 640) + 90; kluwen(ctx, ex, ey, 54, { a: E, seed: 2, kleur: '#7A8BA8', aan: E, t }); naamBij(ctx, 'enzym', '', ex, ey + 100, E * (1 - q.on('kinase', 1)), 'center');
    // ATP → cAMP
    const A = q.on('ATP', 1); atp(ctx, 760, 560, 0.9, { a: A * (1 - q.on('cAMP', 1)) }); naamBij(ctx, 'ATP', '', 690, 620, A * (1 - q.on('cAMP', 1)), 'center');
    const nC = Math.floor(clamp((t - q.at('cAMP', 1)) * 3, 0, 18)); for (let i = 0; i < nC; i++) { const w = wander(i, t, 30, 0.6); const sp = clamp((t - q.at('verspreidt', 1)) / 3, 0, 1); camp(ctx, 760 + (i % 6) * 70 + w.x + sp * 60, 520 + Math.floor(i / 6) * 70 + w.y + sp * 60, 0.75, 1 - 0.6 * q.on('volgende', 1)); }
    naamBij(ctx, 'cAMP', 'tweede boodschapper', 1000, 470, q.on('tweede', 1) * (1 - q.on('volgende', 1)), 'left');
    // kinase met fosfaat
    const K = q.on('kinase', 1); const kx = 1240, ky = 700; const Zd = 1 - q.on('volgende', 1); kluwen(ctx, kx, ky, 58, { a: K * Zd, seed: 5, aan: q.on('kinase', 1), t }); naamBij(ctx, 'kinase', '', kx, ky + 110, K * (1 - q.on('volgende', 1)), 'center');
    const F = q.on('ATP', 2); const lu = clamp((t - q.at('zet', 3)) / 1.2, 0, 1); atp(ctx, 1385, 770, 0.75, { a: F * (1 - q.on('volgende', 1)), los: lu, lx: 1652, ly: 668 });
    kluwen(ctx, 1660, 720, 46, { a: F * (1 - q.on('volgende', 1)), seed: 9, kleur: '#9AA3B2', aan: q.on('gaat', 1) }); naamBij(ctx, 'ATP', '', 1390, 830, F * clamp(1 - lu * 2, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'eiwit', '', 1660, 640, F * clamp(1 - lu * 2, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'ADP', '', 1360, 830, F * clamp(lu * 2 - 1, 0, 1) * (1 - q.on('volgende', 1)), 'center'); naamBij(ctx, 'P op het eiwit: aan', '', 1660, 830, F * clamp(lu * 2 - 1, 0, 1) * (1 - q.on('volgende', 1)), 'center');
    // cascade (vanaf 'Zo')
    const Z = q.on('volgende', 1); if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; const st = [[1080, 360, 1], [1080, 470, 3], [1080, 590, 9]]; const nu = clamp((t - q.at('volgende', 1)) / 4, 0, 1);
      // niets: kolom met steeds meer actieve eiwitten
      const rij = [[1, 1], [6, 8], [24, 12]]; rij.forEach(([n, per], k) => { const f = clamp(nu * 3 - k, 0, 1); for (let i = 0; i < n; i++) { const xx = 1500 - (Math.min(n, per) - 1) * 21 + (i % per) * 42, yy = [400, 470, 545][k] + Math.floor(i / per) * 38; kluwen(ctx, xx, yy, k === 2 ? 15 : 17, { a: f * clamp(nu * 3 * n / 2 - i * 1.5 / 2 - k * n / 2, 0, 1), seed: k * 3 + i, n: 11, aan: f, kleur: k === 2 ? SB_AFBRAAK : SB.kinase }); } });
      regel(ctx, 'steeds meer', 1180, 490, clamp(nu * 3 - 1, 0, 1), C.goud, 30, 'right', 700); naamBij(ctx, 'enzym dat glycogeen afbreekt', '', 1500, 660, clamp(nu * 3 - 2, 0, 1), 'center');
      const gk = q.on('glycogeen', 1), g = clamp((t - q.at('glucose', 1)) / 4, 0, 1); glycogeenKeten(ctx, 1260, 770, 1.6, gk, 1 - 0.75 * g);
      for (let i = 0; i < 40; i++) { const f = clamp(g * 4 - i * 0.08, 0, 1); if (f <= 0) continue; const w = wander(i + 50, t, 8, 0.6); glucose(ctx, lerp(1330, 1480 + (i % 10) * 36, f) + w.x, lerp(770, 720 + Math.floor(i / 10) * 34, f) + w.y, 11, f); }
      naamBij(ctx, 'glycogeen', '', 1100, 790, gk, 'right');
      tag(ctx, 'versterking bij elke stap', 760, 860, C.goud, q.on('versterkt', 1) * (1 - q.on('miljoenen', 1, 0.3)), 'center', 30); tag(ctx, '1 adrenaline → miljoenen glucose', 760, 860, C.goud, q.on('miljoenen', 1), 'center', 30); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'micro'); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); const los = q.on('los', 1, 1.2); receptor7(ctx, rx, ry, ra, 0.8, { bind: 1 - los + 0.001 > 0.01 ? 1 - los : 0, vorm: 1 - los, t });
    if (los > 0.01) hormoonVorm(ctx, rx + los * 120, ry - 120 - los * 120, 16, 'adrenaline', 1 - los * 0.6);
    for (let i = 0; i < 14; i++) { const w = wander(i, t, 30, 0.6); camp(ctx, 760 + (i % 7) * 80 + w.x, 500 + Math.floor(i / 7) * 80 + w.y, 0.75, 1); } naamBij(ctx, 'cAMP', 'nog in de cel', 560, 470, q.on('cAMP', 1), 'left');
    for (let i = 0; i < 5; i++) kluwen(ctx, 860 + i * 160, 740, 34, { seed: i * 2, n: 14, aan: 1, P: 1, t }); naamBij(ctx, 'aangezette eiwitten', '', 1180, 840, q.on('aangezette', 1), 'center');
    vraagteken(ctx, 1700, 560, q.on('Hoe', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord c: afbreken en fosfaat eraf', 1); celRand(ctx, t, { gaten: [360] }); const [rx, ry, ra] = opRand(360); receptor7(ctx, rx, ry, ra, 0.8, { t });
    const af = clamp((t - q.at('breekt', 1)) / 3, 0, 1); kluwen(ctx, 600, 560, 50, { seed: 13, kleur: C.koraal, aan: 0.3, t }); naamBij(ctx, 'enzym breekt cAMP af', '', 600, 670, q.on('breekt', 1), 'center');
    for (let i = 0; i < 14; i++) { const w = wander(i, t, 30, 0.6); const k = clamp(af * 14 - i, 0, 1); const x0 = 760 + (i % 7) * 80 + w.x, y0 = 470 + Math.floor(i / 7) * 80 + w.y; if (k < 0.5) camp(ctx, x0, y0, 0.75, 1 - k * 2); else amp(ctx, x0 + (k - 0.5) * 60, y0 + (k - 0.5) * 30, 0.55, (k - 0.5) * 2 * (1 - 0.5 * q.on('Die', 1))); }
    naamBij(ctx, 'AMP', 'ring opengeknipt', 1420, 450, af > 0.5 ? q.on('breekt', 1) * (1 - q.on('halen', 1)) : 0, 'left');
    const fe = clamp((t - q.at('halen', 1)) / 3, 0, 1); const fx = 800 + fe * 640; kluwen(ctx, fx, 680, 26, { a: q.on('halen', 1) * (1 - q.on('knop', 1)), seed: 17, kleur: C.groen, n: 13, aan: 0.4, t }); naamBij(ctx, 'ander enzym', 'haalt fosfaat eraf', fx, 620, q.on('halen', 1) * (1 - q.on('knop', 1)), 'center');
    for (let i = 0; i < 5; i++) { const ex = 860 + i * 160, f = clamp((fx - ex + 40) / 80, 0, 1); kluwen(ctx, ex, 740, 34, { seed: i * 2, n: 14, aan: 1 - f, t }); if (f < 1) fosfaat(ctx, ex - 24, 700, 9, 1); else fosfaat(ctx, ex - 24 + 6, 760 + 40, 9, 0.6); }
    naamBij(ctx, 'fosfaat eraf: eiwit uit', '', 1180, 840, q.on('uit', 1), 'center');
    tag(ctx, 'alleen aan zolang er een nieuw signaal komt', 1200, 210, C.goud, q.on('zolang', 1), 'center', 30); },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('receptor', 1, 0.8);
    if (C2 < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * C2, 0, 1); paneel(ctx, 560, 230, 800, 560, 'schaafwond, vergroot'); ctx.fillStyle = '#B5574A'; ctx.beginPath(); ctx.ellipse(960, 600, 300, 70, 0, 0, 6.283); ctx.fill();
      for (let i = 0; i < 6; i++) bloedplaatje(ctx, 760 + i * 80, 600 + (i % 2) * 20, 22, q.on('bloedplaatjes', 1)); naamBij(ctx, 'bloedplaatjes', '', 960, 720, q.on('bloedplaatjes', 1), 'center');
      for (let i = 0; i < 8; i++) { const f = clamp((t - q.at('groeifactor', 1)) * 0.8 - i * 0.1, 0, 1); hormoonVorm(ctx, 800 + i * 45, 560 - f * 200, 12, 'groei', f, C.groen); } naamBij(ctx, 'groeifactor', '', 960, 330, q.on('groeifactor', 1), 'center'); ctx.restore(); }
    // sig-3 (25 okt): bij 'Het laatste kinase gaat de kern in' zoomt het beeld uit naar de hele ronde cel; de kern ligt binnenin, het derde kinase gaat door een kernporie
    const Zm = q.on('laatste', 1, 1.4), ez = ease(Zm), P0 = [350, 210], P1 = [793, 230];
    if (C2 > 0.01 && Zm < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(2 * C2 - 1, 0, 1) * (1 - Zm); ctx.translate(lerp(P0[0], P1[0], ez), lerp(P0[1], P1[1], ez)); ctx.scale(lerp(1, 0.3, ez), lerp(1, 0.3, ez)); ctx.translate(-P0[0], -P0[1]);
      const sam = clamp((t - q.at('tegen', 1)) / 1.5, 0, 1); const P = t > q.at('fosfaatgroepen', 1) + 0.6 ? 2 : 0; const xa = 300 - 40 * (1 - sam), xb = 400 + 40 * (1 - sam); celRand(ctx, t, { gaten: [[xa, 12], [xb, 12]] });
      const [x1, y1, a1] = opRand(xa), [x2, y2, a2] = opRand(xb); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, P, aan: P ? 1 : 0, ligand: q.on('groeifactor', 2), t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, P, aan: P ? 1 : 0, ligand: q.on('groeifactor', 2), t });
      naamBij(ctx, 'receptor = kinase', '', 360, 160, q.on('kinase', 1) * (1 - Zm), 'center');
      const R = q.on('Ras', 1); rasSchakel(ctx, 620, 560, q.on('Ras', 2) > 0.5 ? 1 : 0, R, { t }); naamBij(ctx, 'Ras', 'schakelaar', 560, 680, R * (1 - Zm), 'center');
      const ks = [[900, 540], [1080, 600], [1260, 540]]; ks.forEach(([x, y], k) => { const f = clamp((t - q.at('rij', 1)) * 1.2 - k * 0.7, 0, 1); kluwen(ctx, x, y, 44, { a: f, seed: 20 + k, aan: f, P: f > 0.8 ? 1 : 0, t }); if (k) pijl(ctx, ks[k - 1][0] + 50, ks[k - 1][1] + (k === 1 ? 20 : -20), x - 50, y + (k === 1 ? -20 : 20), C.goud, f, 3, 12); });
      pijl(ctx, 680, 540, 850, 540, C.goud, q.on('rij', 1), 3, 12); naamBij(ctx, 'drie kinasen', '', 1080, 700, q.on('drie', 1) * (1 - Zm), 'center'); ctx.restore(); }
    if (Zm > 0.01) { ctx.save(); ctx.globalAlpha *= Zm; ctx.translate(lerp(P0[0], P1[0], ez), lerp(P0[1], P1[1], ez)); const sc = lerp(1 / 0.3, 1, ez); ctx.scale(sc, sc); ctx.translate(-P1[0], -P1[1]);
      const CX = 960, CY = 500, CR = 320, KX = 1060, KY = 560, KR = 105, uitR = q.on('uit', 1), LZ = clamp((Zm - 0.75) / 0.25, 0, 1); const dv = ease(clamp((t - q.at('deelt', 1) - 0.5) / 2.2, 0, 1)), D0 = 1 - q.on('deelt', 1, 0.5);
      if (dv < 0.01) { celHeel(ctx, CX, CY, CR, { t, gaten: [-2.25, -2.0] });
        [-2.25, -2.0].forEach((h, k) => receptorRTK(ctx, CX + Math.cos(h) * CR, CY + Math.sin(h) * CR, h + Math.PI / 2, 0.3, { a: D0, seed: 3 + k, P: 2, aan: 1, ligand: 1, t }));
        ctx.save(); ctx.translate(870, 300); ctx.scale(0.45, 0.45); rasSchakel(ctx, 0, 0, 1, D0, { t }); ctx.restore(); naamBij(ctx, 'Ras', '', 900, 262, D0 * LZ, 'left');
        kernDNA(ctx, KX, KY, KR, { tf: q.on('transcriptiefactoren', 1), aan: q.on('Genen', 1), t }); kernPorien(ctx, KX, KY, KR, [-2.4, -1.4, -0.4, 0.6, 1.7, 2.7]);
        const ks = [[900, 360], [940, 405], [968, 448]]; ks.forEach(([x, y], k) => { let xx = x, yy = y; if (k === 2) { const m = clamp((t - q.at('kern', 1) + 0.3) / 1.6, 0, 1), pr = [KX + Math.cos(-2.4) * KR, KY + Math.sin(-2.4) * KR * 0.9]; if (m < 0.5) { xx = lerp(x, pr[0], ease(m * 2)); yy = lerp(y, pr[1], ease(m * 2)); } else { xx = lerp(pr[0], KX - 45, ease(m * 2 - 1)); yy = lerp(pr[1], KY - 20, ease(m * 2 - 1)); } }
          kluwen(ctx, xx, yy, 16, { a: D0, seed: 20 + k, n: 12, aan: 1 - 0.85 * uitR, P: 1, t }); });
        naamBij(ctx, 'receptoren', '', 720, 190, D0 * LZ, 'right'); naamBij(ctx, 'kern', 'met kernporiën', KX - 60, KY + KR + 30, LZ * D0 * (1 - q.on('Genen', 1)), 'center');
        naamBij(ctx, 'genen voor celdeling aan', '', 1320, 560, q.on('Genen', 1) * D0, 'left'); }
      else { const d = 250 * dv, r = lerp(CR, 240, dv); for (const sd of [-1, 1]) celHeel(ctx, CX + sd * d, CY, r, { t, niet: [CX - sd * d, CY, r - 22] }); for (const sd of [-1, 1]) kernDNA(ctx, lerp(KX, CX + sd * 270, dv), lerp(KY, CY + 20, dv), lerp(KR, 72, dv), { t }); }
      tag(ctx, 'de cel deelt', 960, 120, C.goud, q.on('deelt', 1) * (1 - q.on('korte', 1)), 'center', 28); tag(ctx, 'Ras zet zichzelf weer uit', 960, 120, C.text2, q.on('korte', 1), 'center', 26); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); celRand(ctx, t, { gaten: [[300, 12], [400, 12]] }); const [x1, y1, a1] = opRand(300), [x2, y2, a2] = opRand(400);
    const B = q.on('blokkeert', 1); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, t });
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 270, 250 - (1 - B) * 80, 160, 46, 12); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2.5); ctx.restore(); } naamBij(ctx, 'medicijn blokkeert de receptor', '', 450, 250, B, 'left');
    rasSchakel(ctx, 620, 560, 1, 1, { vast: q.on('steeds', 1), t }); naamBij(ctx, 'Ras', 'mutatie: blijft aan', 560, 680, q.on('mutatie', 1), 'center');
    [[900, 540], [1080, 600], [1260, 540]].forEach(([x, y], k) => kluwen(ctx, x, y, 44, { seed: 20 + k, aan: 0.6, t }));
    kernDNA(ctx, 1590, 610, 125, { t }); vraagteken(ctx, 1590, 860, q.on('verwacht', 1), 100); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de cellen blijven delen', 1); const P = q.on('ongeveer', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * P, 0, 1); celRand(ctx, t, { gaten: [[300, 12], [400, 12]] }); const [x1, y1, a1] = opRand(300), [x2, y2, a2] = opRand(400); receptorRTK(ctx, x1, y1, a1, 0.62, { seed: 3, t }); receptorRTK(ctx, x2, y2, a2, 0.62, { seed: 4, t });
      roundRect(ctx, 270, 250, 160, 46, 12); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2.5); rasSchakel(ctx, 620, 560, 1, 1, { vast: 1, t });
      const ks = [[900, 540], [1080, 600], [1260, 540]]; ks.forEach(([x, y], k) => kluwen(ctx, x, y, 44, { seed: 20 + k, aan: 1, P: 1, t })); kernDNA(ctx, 1590, 610, 125, { tf: 1, aan: 1, t });
      // sig-2 (25 okt): het defect zit in Ras; het signaal start ná de blokkade gewoon opnieuw (pulsen van Ras naar de kern)
      naamBij(ctx, 'defect in Ras', '', 620, 700, q.on('defect', 1, 0.4), 'center'); naamBij(ctx, 'medicijn', 'blokkeert de receptor', 450, 212, q.on('medicijn', 1, 0.4), 'left');
      const ST = q.on('start', 1, 0.4); if (ST > 0.01) { const pad = [[700, 560], ...ks, [1500, 600]]; for (let p = 0; p < 3; p++) { const u = ((t - q.at('start', 1)) * 0.45 + p / 3) % 1; const f = u * (pad.length - 1), i = Math.min(pad.length - 2, Math.floor(f)), r = f - i; circ(ctx, lerp(pad[i][0], pad[i + 1][0], r), lerp(pad[i][1], pad[i + 1][1], r) - 70, 11, rgba(C.goud, 0.9 * ST)); } } tag(ctx, 'route vast op aan', 1080, 820, C.koraal, q.on('vast', 1), 'center', 30);
      tag(ctx, 'film: Mutaties · proto-oncogen + mutatie = vastzittend gaspedaal', 1200, 200, C.teal, q.on('Mutaties', 1), 'center', 26); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * P - 1, 0, 1); metaA(ctx, 'MENSEN MET KANKER · RAS-MUTATIE', 200, 280, 1, C.grain, 'left', 26);
      for (let i = 0; i < 20; i++) popjeB(ctx, 260 + (i % 10) * 70, 420 + Math.floor(i / 10) * 110, 22, i % 5 === 0 ? C.koraal : '#5A6478', clamp((t - q.at('ongeveer', 1)) * 4 - i * 0.1, 0, 1));
      chip(ctx, 'ongeveer 1 op de 5', 590, 690, C.koraal, q.on('vijf', 1), 28);
      const O = q.on('onderzoeken', 1); paneel(ctx, 1120, 300, 640, 420, 'eerst onderzoeken', O); ctx.save(); ctx.globalAlpha *= O;
      ['receptor', 'Ras', 'kinasen', 'kern'].forEach((n, k) => { const yy = 400 + k * 70; roundRect(ctx, 1180, yy - 34, 360, 50, 10); shape(ctx, rgba(k === 1 ? C.koraal : C.fill, 0.5), k === 1 ? C.koraal : C.line, 2); text(ctx, n, 1210, yy, fTekst(28, 700), C.text, 'left'); if (k === 1) kruis(ctx, 1600, yy - 10, 14, 1); }); ctx.restore();
      tag(ctx, 'dan het medicijn kiezen', 1440, 790, C.goud, q.on('kiest', 1), 'center', 28); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('tabletje', 1, 0.8), D = q.on('Kim', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(1 - 2 * K, 0, 1); const u = clamp((t - q.at('uitgewisseld', 1)) / 2, 0, 1);
      metaA(ctx, 'IN DE BLOEDCELLEN VAN OPA HENK', 160, 220, 1, C.grain, 'left', 26);
      chromosoom(ctx, 300, 300, 46, [[C.teal, 110, 1], [C.teal, 200 - 30 * u], [C.koraal, 70 * u]], 1, '9');
      chromosoom(ctx, 480, 300, 38, [[C.koraal, 34, 1], [C.koraal, 96 - 70 * u], [C.teal, 30 * u]], 1, '22'); naamBij(ctx, 'Philadelphia-chromosoom', 'korter', 530, 330, u, 'left'); tabletje(ctx, 160, 300, 1.4, 1 - q.on('chromosoom', 1));
      const G = q.on('vast', 1); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; roundRect(ctx, 640, 460, 200, 50, 10); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 2); roundRect(ctx, 840, 460, 200, 50, 10); shape(ctx, rgba(C.teal, 0.6), C.teal, 2); text(ctx, 'BCR · 22', 740, 494, fTekst(24, 700), C.text, 'center'); text(ctx, 'ABL · 9', 940, 494, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
      naamBij(ctx, 'twee genen aan elkaar', 'fusiegen', 840, 570, G, 'center');
      kluwen(ctx, 840, 700, 56, { a: q.on('kinase', 1), seed: 31, kleur: '#B88A6A', aan: 1, P: 2, t }); naamBij(ctx, 'kinase dat nooit uitgaat', '', 840, 810, q.on('nooit', 1), 'center');
      for (let i = 0; i < 9; i++) { const f = clamp((t - q.at('witte', 1)) * 1.5 - i * 0.25, 0, 1); witteCel(ctx, 1260 + (i % 3) * 150, 340 + Math.floor(i / 3) * 150, 56, f, 1); }
      naamBij(ctx, 'witte bloedcellen blijven delen', '', 1410, 810, q.on('witte', 1), 'center'); tag(ctx, 'chronische myeloïde leukemie', 1410, 250, C.koraal, q.on('leukemie', 1), 'center', 28); ctx.restore(); }
    if (K > 0.01 && D < 0.99) { ctx.save(); ctx.globalAlpha *= clamp(2 * K - 1, 0, 1) * clamp(1 - 2 * D, 0, 1); const R = q.on('Zonder', 1);
      kluwen(ctx, 760, 520, 150, { seed: 31, kleur: '#B88A6A', aan: 1 - R * 0.85, zak: true, n: 34, t }); const ix = lerp(1250, 760 + 150 * 0.55, ease(clamp((t - q.at('past', 1)) / 2, 0, 1)));
      remmer(ctx, ix - 20, 520 - 150 * 0.1, 1.1, 1); naamBij(ctx, 'remmer uit het tabletje', '', 860, 300, 1, 'center'); naamBij(ctx, 'plek voor ATP', '', 860, 700, q.on('ATP', 1), 'center');
      atp(ctx, 1300, 700, 0.9, { a: q.on('ATP', 1) }); kruis(ctx, 1300, 700, 30, R); tabletje(ctx, 1480, 260, 1.2, 1, 0.6); naamBij(ctx, 'tabletje', 'veel groter dan het molecuul', 1480, 330, 1, 'center');
      tag(ctx, 'geen fosfaatgroepen meer: het signaal stopt', 960, 850, C.goud, R, 'center', 28); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(2 * D - 1, 0, 1); labTafel(ctx, 160, 640, 640, 1); labMicroscoop(ctx, 330, 640, 0.9, 1, -1, 1); persoon(ctx, 'kim', 620, 880, 470, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'lab' });
      naamBij(ctx, 'Dr. Kim', 'onderzoeker', 620, 330, 1, 'center');
      overleving(ctx, 1000, 400, 760, 1, Math.max(q.on('Vroeger', 1, 1.2), 0.0001) > 0.001 ? q.on('Vroeger', 1, 1.2) : 0, q.on('middel', 1, 1.5)); metaA(ctx, 'CHRONISCHE MYELOÏDE LEUKEMIE', 1000, 300, 1, C.text2, 'left', 22); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); ontbijt(ctx, t, { uitH: 'lacht', gloed: q.on('klein', 1) });
    const K = q.on('kettingreactie', 1); if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; roundRect(ctx, 560, 150, 800, 150, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 1.5);
      hormoonVorm(ctx, 620, 225, 16, 'adrenaline', 1); const L = ['receptor', 'cAMP', 'kinasen', 'glucose']; L.forEach((n, k) => { const x = 720 + k * 150; pijl(ctx, x - 50, 225, x - 14, 225, C.goud, 1, 3, 10); chip(ctx, n, x + 50, 236, C.goud, 1, 22); }); ctx.restore(); }
    tag(ctx, 'één stap blokkeren', 960, 350, C.koraal, q.on('blokkeert', 1), 'center', 28); },
  s15(ctx, t, q) { bg(ctx, 'schema'); labTafel(ctx, 160, 640, 700, 1); labMicroscoop(ctx, 330, 640, 0.9, 1, -1, 1); persoon(ctx, 'kim', 680, 880, 470, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'lab' });
    regel(ctx, 'Biomedische wetenschappen', 1340, 300, q.on('Biomedische', 1), C.text, 48, 'center', 800);
    tag(ctx, 'bachelor · 3 jaar · universiteit', 1340, 410, C.teal, q.on('drie', 1), 'center', 32); regel(ctx, 'o.a. Nijmegen en Leiden', 1340, 480, q.on('Nijmegen', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'master · 2 jaar', 1340, 590, C.teal, q.on('master', 1), 'center', 32); regel(ctx, 'onderzoeksstages in het lab', 1340, 660, q.on('onderzoeksstages', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'hoe werken signaalroutes, en waar gaan ze kapot?', 960, 190, C.goud, q.on('kapotgaan', 1), 'center', 30); }
});
