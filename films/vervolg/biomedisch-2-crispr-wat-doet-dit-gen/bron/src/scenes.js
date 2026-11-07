
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
// Wat word jij? · Biomedische wetenschappen 2 · CRISPR: wat doet dit gen? — eigen tekeningen (24 okt 2026)
// Dieren (muis, zebravis, worm) zelf getekend in filmstijl; geen grijze poppetjes behalve telpoppetjes in een groep.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// ---------- tuin ----------
// tomatenplant met stok en touw; r = rijpheid 0..1
function tomatenplant(ctx, x, yBase, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yBase); ctx.scale(s, s);
  ctx.strokeStyle = '#8A6A4A'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(26, -360); ctx.stroke();  // stok
  ctx.strokeStyle = '#4E7A46'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 0); for (let i = 0; i <= 10; i++) { const u = i / 10; ctx.lineTo(Math.sin(u * 2.4) * 16, -u * 340); } ctx.stroke();
  for (let i = 0; i < 5; i++) { const yy = -70 - i * 62, dir = i % 2 ? 1 : -1, sw = Math.sin(t * 0.7 + i) * 3;
    ctx.strokeStyle = '#4E7A46'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(dir * 56, yy - 16 + sw); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(dir * 62, yy - 20 + sw, 34, 16, dir * -0.25, 0, 6.283); shape(ctx, '#568A4E', '#6EA862', 2); }
  circ(ctx, -42, -150, 20, '#C9503C', '#E07A5F', 2); circ(ctx, -16, -118, 16, '#C9503C', '#E07A5F', 2); circ(ctx, 56, -236, 18, '#C9503C', '#E07A5F', 2);
  // touwtje om stok en stengel
  ctx.strokeStyle = '#D8C8A8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -236); ctx.bezierCurveTo(8, -244, 18, -228, 26, -236); ctx.stroke();
  ctx.restore(); }

function tuinGrond(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A3528'; ctx.beginPath(); ctx.moveTo(0, 896); ctx.quadraticCurveTo(960, 862, 1920, 896); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- stamboom en balken ----------
// vierkant (man) of cirkel (vrouw) met naam eronder; ziek = gevuld
function stamFig(ctx, x, y, r, man, ziek, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const fill = ziek ? rgba(C.koraal, 0.75) : rgba(C.fill, 0.5), lijn = ziek ? C.koraal : C.line;
  if (man) { roundRect(ctx, x - r, y - r, r * 2, r * 2, 6); shape(ctx, fill, lijn, 3); } else { circ(ctx, x, y, r, fill, lijn, 3); }
  if (naam) regel(ctx, naam, x, y + r + 40, 1, C.text, 30, 'center', 600); ctx.restore(); }

// cholesterolbalk met waarde; u 0..1 = vulling, hoog = koraal
function cholBalk(ctx, x, y, w, frac, lab, a = 1, col = C.koraal, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 44;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#2A3446', C.line, 1.5);
  const ww = w * frac * clamp(u, 0, 1); if (ww > 3) { roundRect(ctx, x, y, ww, h, 10); shape(ctx, rgba(col, 0.6), col, 2); }
  if (lab) regel(ctx, lab, x, y - 14, 1, C.text2, 26, 'left', 600); ctx.restore(); }

// ---------- DNA ----------
// recht stuk dubbele streng met basen; mark = index van de afwijkende base (-1 = geen)
function dnaStuk(ctx, x, y, w, n, a = 1, mark = -1, knip = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const dx = w / n, amp = 22;
  ctx.strokeStyle = C.er; ctx.lineWidth = 5;
  for (const sgn of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= n * 4; i++) { const u = i / (n * 4), xx = x + u * w, yy = y + sgn * (amp + Math.sin(u * 7) * 4); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  for (let i = 0; i < n; i++) { const xx = x + dx * (i + 0.5), af = i === mark; ctx.strokeStyle = af ? C.goud : rgba(C.er, 0.75); ctx.lineWidth = af ? 7 : 4;
    ctx.beginPath(); ctx.moveTo(xx, y - amp + 2); ctx.lineTo(xx, y + amp - 2); ctx.stroke(); if (af) circ(ctx, xx, y, 11, C.goud); }
  if (knip > 0.01) { const kx = mark >= 0 ? x + dx * (mark + 0.5) : x + w / 2; ctx.save(); ctx.globalAlpha *= knip; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(kx, y - amp - 26); ctx.lineTo(kx, y + amp + 26); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// gids-RNA: korte enkele kronkelende streng met een koppelvlak
function gidsRna(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const u = i / 40, xx = -90 + u * 180, yy = Math.sin(u * 9) * 14 - u * 10; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (let i = 0; i < 7; i++) { const xx = -78 + i * 26; ctx.strokeStyle = rgba(C.paars, 0.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, Math.sin((i / 7) * 9) * 14 - 2); ctx.lineTo(xx, Math.sin((i / 7) * 9) * 14 + 18); ctx.stroke(); }
  ctx.restore(); }

// Cas9: hoekig eiwitlichaam met een spleet waar het DNA in past
function cas9(ctx, x, y, s = 1, a = 1, dicht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const g = 30 - dicht * 16;
  ctx.beginPath(); ctx.moveTo(-96, -86); ctx.bezierCurveTo(-30, -112, 60, -104, 96, -58); ctx.bezierCurveTo(108, -32, 86, -g, 40, -g); ctx.lineTo(-54, -g); ctx.bezierCurveTo(-96, -g - 6, -110, -54, -96, -86); ctx.closePath(); shape(ctx, '#6E7FA0', '#AFC0D0', 3);
  ctx.beginPath(); ctx.moveTo(-96, 86); ctx.bezierCurveTo(-30, 112, 60, 104, 96, 58); ctx.bezierCurveTo(108, 32, 86, g, 40, g); ctx.lineTo(-54, g); ctx.bezierCurveTo(-96, g + 6, -110, 54, -96, 86); ctx.closePath(); shape(ctx, '#5F6F8E', '#AFC0D0', 3);
  ctx.restore(); }

// ---------- modelorganismen ----------
// gistcel: ovaal met kern en een knop die uitgroeit (budding)
function gistcel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kn = 26 + Math.sin(t * 0.8) * 6;
  ctx.beginPath(); ctx.ellipse(72, -56, kn, kn * 0.92, 0, 0, 6.283); shape(ctx, 'rgba(201,163,92,0.3)', C.oker, 3);
  ctx.beginPath(); ctx.ellipse(0, 0, 90, 76, 0, 0, 6.283); shape(ctx, 'rgba(201,163,92,0.28)', C.oker, 3.5);
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 86, 72, 0, 0, 6.283); ctx.clip();
  circ(ctx, -16, 6, 30, rgba(C.kern, 0.6), C.kernR, 2.5);
  for (let i = 0; i < 7; i++) { const w = wander(i, t, 5, 0.5); circ(ctx, -60 + (i * 23) % 120, -40 + (i * 31) % 80 + w.y, 4, rgba(C.ribo, 0.55)); } ctx.restore();
  ctx.restore(); }

// worm C. elegans: slanke doorzichtige buis met celkernen, zacht golvend
function worm(ctx, x, y, len = 520, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([-len / 2 + u * len, Math.sin(u * 6.6 + t * 1.6) * 30 * (0.35 + u * 0.65)]); }
  const dik = u => 6 + 16 * Math.sin(Math.PI * Math.min(1, Math.max(0.04, u)) ** 0.75);
  ctx.beginPath(); pts.forEach(([px, py], i) => { const u = i / 60; i ? ctx.lineTo(px, py - dik(u)) : ctx.moveTo(px, py - dik(u)); });
  for (let i = pts.length - 1; i >= 0; i--) { const u = i / 60; ctx.lineTo(pts[i][0], pts[i][1] + dik(u)); } ctx.closePath();
  shape(ctx, 'rgba(216,226,214,0.22)', '#D8E2D6', 3);
  for (let i = 3; i < 58; i += 4) { const u = i / 60; circ(ctx, pts[i][0], pts[i][1] + ((i % 8) ? -6 : 7), 5.5, rgba(C.kern, 0.7)); }
  ctx.restore(); }

// zebravisembryo: dooierbol met doorzichtig lijfje en staart; hart = kloppend stipje
function zebravisEmbryo(ctx, x, y, s = 1, a = 1, t = 0, hart = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // chorion (doorzichtig eihulsje)
  circ(ctx, 0, 0, 148, 'rgba(175,192,208,0.10)', 'rgba(175,192,208,0.5)', 2.5);
  // dooier
  circ(ctx, -6, 30, 72, 'rgba(224,182,74,0.5)', C.goud, 3);
  // lijfje over de dooier + staart
  ctx.beginPath(); ctx.moveTo(-70, -16); ctx.bezierCurveTo(-30, -62, 40, -58, 74, -20);
  ctx.bezierCurveTo(100, 4, 118, 34, 128, 62); ctx.bezierCurveTo(112, 46, 92, 36, 74, 34);
  ctx.bezierCurveTo(40, 22, -24, 26, -70, 4); ctx.closePath(); shape(ctx, 'rgba(216,226,214,0.3)', '#D8E2D6', 3);
  // oog
  circ(ctx, -52, -14, 20, 'rgba(242,242,238,0.5)', '#D8E2D6', 2); circ(ctx, -52, -14, 10, '#121A26');
  // somieten
  ctx.strokeStyle = 'rgba(216,226,214,0.6)'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { const u = i / 7; ctx.beginPath(); ctx.moveTo(10 + u * 96, -12 + u * 40); ctx.lineTo(16 + u * 96, 14 + u * 38); ctx.stroke(); }
  // staartslag
  ctx.save(); ctx.translate(128, 62); ctx.rotate(Math.sin(t * 5) * 0.2); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(28, -16); ctx.lineTo(24, 14); ctx.closePath(); shape(ctx, 'rgba(216,226,214,0.35)', '#D8E2D6', 2); ctx.restore();
  // kloppend hart
  if (hart > 0.01) { const p = 1 + 0.3 * Math.sin(t * 7); ctx.save(); ctx.globalAlpha *= hart; circ(ctx, -14, 2, 13 * p, rgba(C.koraal, 0.85), C.koraal, 2); ctx.restore(); }
  ctx.restore(); }

// muis in filmstijl, zijaanzicht naar rechts; knock = knock-outmerk (gouden stip op de flank)
function muisje(ctx, x, yBase, s = 1, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const { kijk = 1, knock = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, yBase); ctx.scale(s * kijk, s);
  const sn = Math.sin(t * 2.4) * 2;
  // staart
  ctx.strokeStyle = '#C9A08E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-104, -54); ctx.bezierCurveTo(-170, -46, -196, -96, -238, -80 + sn * 3); ctx.stroke();
  // achterpoot
  ctx.strokeStyle = '#B9ADA4'; ctx.lineWidth = 13; ctx.beginPath(); ctx.moveTo(-54, -34); ctx.lineTo(-62, -4); ctx.lineTo(-34, -2); ctx.stroke();
  // lichaam
  ctx.beginPath(); ctx.moveTo(-106, -56); ctx.bezierCurveTo(-92, -128, -10, -148, 58, -118); ctx.bezierCurveTo(96, -104, 112, -76, 104, -46);
  ctx.bezierCurveTo(60, -16, -50, -14, -106, -56); ctx.closePath(); shape(ctx, '#C4BAB1', '#DCD5CE', 2.5);
  // kop
  ctx.beginPath(); ctx.moveTo(60, -118); ctx.bezierCurveTo(104, -124, 146, -104, 156, -78); ctx.bezierCurveTo(160, -62, 136, -44, 108, -46); ctx.bezierCurveTo(76, -50, 58, -84, 60, -118); ctx.closePath(); shape(ctx, '#C4BAB1', '#DCD5CE', 2.5);
  // oor, oog, snuit, snorharen
  circ(ctx, 78, -126, 25, '#D4A9A2', '#DCD5CE', 2.5); circ(ctx, 78, -126, 13, 'rgba(180,130,124,0.75)');
  circ(ctx, 118, -92, 6.5, '#121A26'); circ(ctx, 155, -70, 6, '#C98A8A');
  ctx.strokeStyle = 'rgba(242,242,238,0.75)'; ctx.lineWidth = 2; for (let i = -1; i < 2; i++) { ctx.beginPath(); ctx.moveTo(150, -72); ctx.lineTo(192, -72 + i * 16 + sn); ctx.stroke(); }
  // voorpoot
  ctx.strokeStyle = '#B9ADA4'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(62, -46); ctx.lineTo(70, -8); ctx.lineTo(94, -4); ctx.stroke();
  if (knock > 0.01) { ctx.save(); ctx.globalAlpha *= knock; circ(ctx, -20, -86, 16, rgba(C.goud, 0.8), C.goud, 2); ctx.restore(); }
  ctx.restore(); }

// kaartje onder een modelorganisme: waarvoor je hem kiest
function modelKaart(ctx, x, y, w, titel, regelTekst, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 104, 14); shape(ctx, rgba(col, 0.12), rgba(col, 0.6), 2);
  regel(ctx, titel, x, y + 42, 1, C.text, 32, 'center', 700); regel(ctx, regelTekst, x, y + 80, 1, C.text2, 26, 'center', 500); ctx.restore(); }

// ---------- levercel met LDL-receptoren ----------
// Ronde levercel (uitsnede van een bol); rec = aantal receptoren, pcsk = PCSK9-eiwit dat er een meeneemt
function levercel(ctx, cx, cy, r, a = 1, t = 0, o = {}) { if (a <= 0.01) return; const { rec = 6, pak = -1, pakU = 0, binnen = 0, label = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, cx, cy, r, 'rgba(42,58,88,0.55)', C.er, 4); circ(ctx, cx, cy, r - 12, null, 'rgba(175,192,208,0.5)', 2);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14, 0, 6.283); ctx.clip();
  for (let i = 0; i < 10; i++) { const w = wander(i + 5, t, 6, 0.4); circ(ctx, cx - r * 0.6 + (i * 53) % (r * 1.2), cy - r * 0.5 + (i * 37) % (r * 1.0) + w.y, 3.5, 'rgba(201,184,150,0.4)'); }
  circ(ctx, cx + r * 0.22, cy + r * 0.22, r * 0.3, rgba(C.kern, 0.45), C.kernR, 2.5);
  if (binnen > 0.01) { ctx.save(); ctx.globalAlpha *= binnen; for (let i = 0; i < 5; i++) ldlDeeltje(ctx, cx - r * 0.42 + i * 26, cy - r * 0.18 + (i % 2) * 24, 0.8, 1); ctx.restore(); }
  ctx.restore();
  // receptoren loodrecht op het membraan
  for (let i = 0; i < rec; i++) { const an = -2.5 + i * (2.0 / Math.max(1, rec - 1));
    const pakt = i === pak, u = pakt ? clamp(pakU, 0, 1) : 0, rr = r - u * (r * 0.42);
    ldlReceptor(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, an, 1 - u * 0.55, pakt ? C.koraal : C.groen); }
  if (label) naamBij(ctx, 'levercel', '', cx, cy + r + 54, 1, 'center');
  ctx.restore(); }

// receptor: steel met een bakje, basis op de wand, punt naar buiten
function ldlReceptor(ctx, x, y, an, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(26, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(34, 0, 16, 1.9, -1.9); shape(ctx, null, col, 7); ctx.restore(); }

// LDL-deeltje: bolletje met een vetrand en een enkel apoproteïne-lusje
function ldlDeeltje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 15 * s, 'rgba(224,182,74,0.45)', C.goud, 2.5);
  ctx.strokeStyle = C.oker; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x, y, 15 * s, -1.0, 0.9); ctx.stroke(); ctx.restore(); }

// PCSK9-eiwit: kleine kluwen (keten die zich vouwt), geen bolletje
function pcsk9(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 44; i++) { const u = i / 44, an = u * 11 + Math.sin(t * 0.6) * 0.1, rr = 8 + 20 * Math.sin(u * 3.14); const xx = Math.cos(an) * rr, yy = Math.sin(an) * rr * 0.8; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.restore(); }

// infuuszak met slang en lipide-bolletjes die wegdruppelen
function infuus(ctx, x, y, s = 1, a = 1, t = 0, stroom = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8A8E96'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -210); ctx.lineTo(0, -168); ctx.stroke();
  roundRect(ctx, -58, -168, 116, 196, 18); shape(ctx, 'rgba(91,164,201,0.22)', C.teal, 3);
  ctx.save(); roundRect(ctx, -54, -110, 108, 134, 14); ctx.clip(); ctx.fillStyle = 'rgba(91,164,201,0.3)'; ctx.fillRect(-54, -110, 108, 134);
  for (let i = 0; i < 6; i++) { const w = wander(i, t, 10, 0.5); circ(ctx, -30 + (i * 23) % 70, -84 + (i * 31) % 96 + w.y, 8, rgba(C.goud, 0.6), C.goud, 1.5); } ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(0, 108, 70, 140, 150, 160); ctx.stroke();
  if (stroom > 0.01) for (let i = 0; i < 5; i++) { const u = ((t * 0.5 + i * 0.2) % 1); const xx = 0 + (u < 0.5 ? 0 : (u - 0.5) * 300), yy = 28 + u * 132; circ(ctx, xx, yy, 7, rgba(C.goud, 0.8 * stroom), C.goud, 1.5); }
  ctx.restore(); }

// weegschaal-kaartje voor een afweging
function weegKaart(ctx, x, y, w, kop, tekst, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y, w, 150, 16); shape(ctx, rgba(col, 0.1), rgba(col, 0.55), 2);
  regel(ctx, kop, x, y + 46, 1, col, 30, 'center', 700);
  ctx.font = fTekst(26, 500); const words = tekst.split(' '); const lines = []; let cur = '';
  for (const wd of words) { if (ctx.measureText(cur + ' ' + wd).width > w - 44) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; } lines.push(cur);
  lines.slice(0, 3).forEach((l, i) => regel(ctx, l, x, y + 86 + i * 32, 1, C.text2, 26, 'center', 500)); ctx.restore(); }

// stap in de tijdlijn van de recap
function stapBol(ctx, x, y, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, 44, rgba(col, 0.15 + 0.3 * aan), rgba(col, 0.45 + 0.55 * aan), 3);
  regel(ctx, String(nr), x, y + 14, 1, C.text, 36, 'center', 800); regel(ctx, s2, x, y + 86, 1, C.text, 28, 'center', 600); ctx.restore(); }

// telpoppetje, alleen in groepen
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// spiegelt een tekening rond de verticale lijn x (voor een wijsarm de andere kant op); tekst niet hierin tekenen
function gespiegeld(ctx, x, fn) { ctx.save(); ctx.translate(2 * x, 0); ctx.scale(-1, 1); fn(); ctx.restore(); }
// touwtje tussen twee punten met een lichte doorhang
function touw(ctx, x1, y1, x2, y2, a = 1, zak = 18) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#D8C8A8'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + zak, x2, y2); ctx.stroke(); ctx.restore(); }
const TOUW_B2 = { kx: 398, ky: 716 };
// Wat word jij? · Biomedische wetenschappen 2 · CRISPR: wat doet dit gen? — scènes per alinea (v1.0, 24 okt 2026)
// Rode draad: hoog cholesterol in de familie van Opa Henk; van verband naar oorzaak naar behandeling.
// Elk beeld staat er op t = 0; alleen wat de stem noemt komt later erbij.

Object.assign(SCENES, {
  title(ctx, t) { dnaStuk(ctx, 1180, 700, 620, 10, 1, 6, 0.4 + 0.25 * Math.sin(t * 0.9)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); tuinGrond(ctx, 1);
    tomatenplant(ctx, 440, 880, 1, 1, t);
    gespiegeld(ctx, 712, () => persoon(ctx, 'henk', 712, 880, 430, { t, pose: 'wijs', kijk: 1, uit: 'blij' }));
    persoon(ctx, 'kind', 250, 880, 250, { t, pose: 'wijs', kijk: 1, uit: 'blij' });
    touw(ctx, TOUW_B2.kx, TOUW_B2.ky, 466, 600, 1, 14); touw(ctx, 452, 596, 484, 604, 1, 4);
    naamBij(ctx, 'Opa Henk', '71 jaar', 720, 380, q.on('Henk', 1, 0.3), 'center');
    naamBij(ctx, 'Teun', '', 230, 580, q.on('Teun', 1, 0.3), 'center');
    // stamboom rechts: vader van Henk, Henk, Linda
    const H = q.on('hartinfarct', 1, 0.5), L = q.on('Linda', 1, 0.5);
    stamFig(ctx, 1080, 250, 32, true, q.on('vader', 1) > 0.5, 'vader van Henk', H);
    ctx.save(); ctx.globalAlpha *= H; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1080, 282); ctx.lineTo(1080, 390); ctx.stroke(); ctx.restore();
    stamFig(ctx, 1080, 422, 32, true, true, 'Henk', H);
    ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1080, 454); ctx.lineTo(1080, 562); ctx.stroke(); ctx.restore();
    stamFig(ctx, 1080, 594, 32, false, true, 'Linda', L);
    cholBalk(ctx, 1190, 402, 300, 0.92, 'cholesterol Henk', q.on('cholesterol', 1), C.koraal, clamp((t - q.at('cholesterol', 1)) * 1.4, 0, 1));
    cholBalk(ctx, 1190, 574, 300, 0.88, 'cholesterol Linda', q.on('cholesterol', 1, 1.4), C.koraal, clamp((t - q.at('cholesterol', 1)) * 1.2, 0, 1));
    // Dr. Kim met het gelezen DNA
    const K = q.on('Kim', 1, 0.4);
    if (K > 0.01) { gespiegeld(ctx, 1730, () => persoon(ctx, 'kim', 1730, 880, 420, { t, a: K, pose: 'vasthouden', kijk: 1, outfit: 'lab' })); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1760, 400, K, 'center'); }
    dnaStuk(ctx, 1150, 668, 430, 9, q.on('afwijking', 1, 0.5), 5);
    tag(ctx, 'bij allebei dezelfde afwijking', 1365, 758, C.goud, q.on('allebei', 1), 'center', 28);
    vraagteken(ctx, 890, 300, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een verband, nog geen oorzaak');
    // links: stamboom met de variant die meeloopt
    paneel(ctx, 120, 230, 760, 600, 'verband in een familie', 1);
    const rij = [[320, 330, true, true], [560, 330, false, false], [250, 540, false, true], [430, 540, true, false], [640, 540, true, true]];
    rij.forEach(([x, y, man, ziek], i) => stamFig(ctx, x, y, 30, man, ziek, '', 1));
    ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(350, 330); ctx.lineTo(530, 330); ctx.moveTo(440, 330); ctx.lineTo(440, 420); ctx.moveTo(250, 420); ctx.lineTo(640, 420); [250, 430, 640].forEach(x => { ctx.moveTo(x, 420); ctx.lineTo(x, 510); }); ctx.stroke(); ctx.restore();
    rij.forEach(([x, y, man, ziek]) => { if (ziek) circ(ctx, x, y + 52, 9, C.goud); });
    regel(ctx, 'de variant loopt mee met de ziekte', 500, 700, 1, C.text2, 28, 'center', 500);
    chip(ctx, 'of ligt hij er alleen dicht bij?', 500, 776, C.oker, q.on('meeliften', 1), 26);
    // rechts: meer families, en de vondst van 2003
    const M = q.on('families', 1, 0.6);
    for (let i = 0; i < 3; i++) { const a2 = M * clamp((t - q.at('families', 1)) * 1.6 - i * 0.5, 0, 1);
      paneel(ctx, 1000 + i * 290, 300 - i * 20, 240, 240, '', a2);
      stamFig(ctx, 1080 + i * 290, 380 - i * 20, 24, i % 2 === 0, true, '', a2); stamFig(ctx, 1160 + i * 290, 380 - i * 20, 24, i % 2 === 1, true, '', a2);
      stamFig(ctx, 1120 + i * 290, 480 - i * 20, 24, i % 2 === 0, true, '', a2); }
    metaA(ctx, 'FRANSE ONDERZOEKERS · HET JAAR 2003', 1000, 240, q.on('Franse', 1), C.grain, 'left', 26);
    dnaStuk(ctx, 1010, 690, 760, 12, q.on('vonden', 1, 0.6), 7);
    naamBij(ctx, 'PCSK9', 'het verdachte gen', 1390, 782, q.on('PCSK9', 1), 'center'); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'AMERIKAANSE ONDERZOEKERS · MENSEN MET EEN KAPOT PCSK9', 140, 200, 1, C.grain, 'left', 26);
    // twee groepen met hun cholesterolbalk
    paneel(ctx, 120, 250, 800, 420, 'gen werkt gewoon', 1);
    groep(ctx, 220, 420, 20, 10, 56, 15, () => '#5A6478', 1);
    cholBalk(ctx, 200, 540, 620, 0.9, 'LDL-cholesterol', 1, C.koraal, 1);
    paneel(ctx, 1000, 250, 800, 420, 'gen is kapot', q.on('kapot', 1, 0.5));
    groep(ctx, 1100, 420, 20, 10, 56, 15, () => '#5A6478', q.on('kapot', 1, 0.5));
    cholBalk(ctx, 1080, 540, 620, 0.65, 'LDL-cholesterol', q.on('kapot', 1, 0.5), C.groen, clamp((t - q.at('lager', 1)) * 1.4, 0, 1));
    chip(ctx, 'gemiddeld 28 procent lager', 1390, 636, C.groen, q.on('achtentwintig', 1), 28);
    chip(ctx, 'in 15 jaar bijna 90 procent minder hartziekte', 1390, 718, C.groen, q.on('hartziekte', 1), 28);
    // de stap die nog mist
    const D = q.on('draaien', 1, 0.5);
    regel(ctx, 'vergelijken is nog niet aantonen', 500, 730, q.on('vergelijken', 1), C.oker, 36, 'center', 700);
    if (D > 0.01) { tag(ctx, 'zelf het gen uitzetten en kijken', 500, 820, C.goud, D, 'center', 30); kruis(ctx, 1760, 806, 22, q.on('niet', 1)); regel(ctx, 'bij mensen mag dat niet', 1660, 818, q.on('niet', 1), C.koraal, 28, 'right', 600); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema');
    // vier modellen staan er vanaf t = 0; de kaartjes komen bij wat genoemd wordt
    gistcel(ctx, 300, 380, 1, 1, t); naamBij(ctx, 'gist', '', 300, 500, 1, 'center'); regel(ctx, 'een cel van 5 micrometer', 300, 540, 1, C.text2, 24, 'center', 500);
    worm(ctx, 790, 380, 360, 1, 1, t); naamBij(ctx, 'C. elegans', '', 790, 500, 1, 'center'); regel(ctx, 'worm van 1 millimeter', 790, 540, 1, C.text2, 24, 'center', 500);
    zebravisEmbryo(ctx, 1270, 370, 0.72, 1, t, 0.4); naamBij(ctx, 'zebravis', '', 1270, 500, 1, 'center'); regel(ctx, 'embryo van 1 millimeter', 1270, 540, 1, C.text2, 24, 'center', 500);
    muisje(ctx, 1740, 460, 0.58, 1, t); naamBij(ctx, 'muis', '', 1700, 500, 1, 'center'); regel(ctx, '9 centimeter lang', 1700, 540, 1, C.text2, 24, 'center', 500);
    modelKaart(ctx, 300, 600, 400, '6000 genen', 'bijna alle genen één voor één uit', q.on('zesduizend', 1, 0.6), C.oker);
    chip(ctx, 'bijna 1 op de 5 is nodig om te groeien', 300, 762, C.oker, q.on('vijf', 1), 26);
    modelKaart(ctx, 790, 600, 400, '959 lichaamscellen', 'van elke cel de afstamming bekend', q.on('negenhonderdnegenenvijftig', 1, 0.6), C.groen);
    chip(ctx, 'je ziet welke cel misgaat', 790, 762, C.groen, q.on('misgaat', 1), 26);
    regel(ctx, 'een modelorganisme: goed te houden en te veranderen', 1400, 700, q.on('modelorganisme', 1), C.text2, 30, 'center', 500); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    zebravisEmbryo(ctx, 660, 470, 1.45, 1, t, q.on('kloppend', 1, 0.6));
    naamBij(ctx, 'zebravisembryo', '', 660, 740, 1, 'center');
    regel(ctx, 'een orgaan zien terwijl het zich vormt', 1420, 360, q.on('orgaan', 1), C.text, 38, 'center', 700);
    chip(ctx, 'kloppend hart in een embryo', 1420, 460, C.koraal, q.on('hart', 1), 28);
    vraagteken(ctx, 1420, 680, q.on('denk', 1), 130); },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: een doorzichtig embryo');
    zebravisEmbryo(ctx, 400, 420, 1.1, 1, t, 1);
    naamBij(ctx, 'zebravisembryo', 'buiten de moeder, glashelder', 400, 620, 1, 'center');
    chip(ctx, 'je ziet het hart kloppen', 400, 700, C.koraal, q.on('kloppen', 1), 28);
    chip(ctx, '70 procent van onze genen heeft hier een tegenhanger', 400, 778, C.teal, q.on('zeventig', 1), 26);
    const M = q.on('muis', 1, 0.5);
    muisje(ctx, 1180, 450, 0.8, M, t);
    naamBij(ctx, 'muis', '', 1130, 536, M, 'center');
    regel(ctx, 'een lever zoals de onze', 1130, 576, M, C.text2, 26, 'center', 500);
    regel(ctx, 'bijna elk van onze genen heeft hier een tegenhanger', 1130, 614, q.on('tegenhanger', 2), C.teal, 26, 'center', 500);
    regel(ctx, 'geen kleine mens: elk model past bij een vraag', 1130, 250, q.on('kleine', 1), C.goud, 34, 'center', 700);
    weegKaart(ctx, 1130, 676, 720, 'dierproef in Nederland', 'een commissie weegt belang tegen ongerief, en vraagt of het met minder of zonder dieren kan', q.on('commissie', 1, 0.6), C.oker); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'CRISPR-CAS9 IN HET KORT', 140, 190, 1, C.grain, 'left', 26);
    dnaStuk(ctx, 300, 430, 1100, 16, 1, 9, q.on('knipt', 1, 0.5));
    gidsRna(ctx, 850, 300, 1, q.on('gids-RNA', 1, 0.5));
    naamBij(ctx, 'gids-RNA', '', 850, 220, q.on('gids-RNA', 1, 0.5), 'center'); regel(ctx, 'past op één plek in het DNA', 1080, 290, q.on('past', 1), C.text2, 26, 'left', 500);
    cas9(ctx, 850, 430, 1, q.on('Cas9', 1, 0.5), clamp((t - q.at('Cas9', 1)) * 1.2, 0, 1));
    naamBij(ctx, 'Cas9', 'knipt beide strengen', 1000, 560, q.on('Cas9', 1, 0.5), 'left');
    // reparatie gaat net niet goed -> gen werkt niet meer
    const R = q.on('repareert', 1, 0.5);
    if (R > 0.01) { dnaStuk(ctx, 300, 650, 1100, 16, R, -1); ctx.save(); ctx.globalAlpha *= R; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(900, 614); ctx.lineTo(940, 686); ctx.stroke(); ctx.restore();
      chip(ctx, 'reparatie net niet goed', 700, 760, C.koraal, R, 28); chip(ctx, 'dit gen werkt niet meer', 1180, 760, C.koraal, q.on('meer', 1), 28); }
    const K = q.on('muis', 1, 0.4);
    muisje(ctx, 1700, 560, 0.62, K, t, { knock: K }); naamBij(ctx, 'knock-outmuis', '', 1660, 620, K, 'center');
    regel(ctx, 'en wat meet je dan?', 1660, 300, q.on('meet', 1), C.goud, 34, 'center', 700); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    const P = q.on('PCSK9', 1, 0.5), pakU = clamp((t - q.at('pakt', 1)) / 2.2, 0, 1);
    levercel(ctx, 620, 500, 260, 1, t, { rec: 6, pak: P > 0.5 ? 2 : -1, pakU, binnen: q.on('binnen', 1, 0.8) });
    naamBij(ctx, 'LDL-receptor', '', 880, 320, q.on('receptoren', 1, 0.5), 'left'); regel(ctx, 'haalt cholesterol naar binnen', 880, 360, q.on('receptoren', 1, 0.5), C.text2, 26, 'left', 500);
    for (let i = 0; i < 4; i++) { const w = wander(i, t, 10, 0.5), f = q.on('cholesterol', 1, 0.8); ldlDeeltje(ctx, 300 + i * 56 + w.x, 300 + (i % 2) * 48 + w.y, 1, f); }
    tag(ctx, 'LDL-cholesterol in het bloed', 390, 230, C.goud, q.on('cholesterol', 1, 0.8), 'center', 26);
    if (P > 0.01) { pcsk9(ctx, 300, 650, 1, P, t); naamBij(ctx, 'PCSK9', '', 300, 730, P, 'center'); regel(ctx, 'laat een receptor afbreken', 300, 768, P, C.text2, 26, 'center', 500); }
    regel(ctx, 'meer PCSK9 is minder receptoren', 1420, 300, q.on('minder', 1), C.koraal, 36, 'center', 700);
    cholBalk(ctx, 1180, 400, 480, 0.9, 'cholesterol in het bloed', q.on('minder', 1), C.koraal, 1);
    const HK = q.on('Henk', 1, 0.5);
    tag(ctx, 'bij Henk en Linda: te veel PCSK9', 1420, 520, C.koraal, HK * (1 - q.on('Onderzoekers', 1, 0.5) * 0.6), 'center', 28);
    const U = q.on('uit', 2, 0.5);
    muisje(ctx, 1480, 700, 0.7, U, t, { knock: U }); naamBij(ctx, 'gen voor PCSK9 uit', 'in de lever', 1400, 796, U, 'center');
    vraagteken(ctx, 1790, 560, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder cholesterol');
    levercel(ctx, 440, 430, 200, 1, t, { rec: 8, binnen: clamp((t - 0.5) / 2.5, 0, 1) });
    chip(ctx, 'meer receptoren blijven zitten', 440, 756, C.groen, q.on('blijven', 1), 28);
    chip(ctx, 'meer cholesterol de cel in', 440, 834, C.groen, q.on('halen', 1), 28);
    metaA(ctx, 'HET JAAR 2014 · CRISPR IN DE LEVER VAN MUIZEN', 900, 200, q.on('2014', 1), C.grain, 'left', 26);
    const V = q.on('virus', 1, 0.5);
    muisje(ctx, 1030, 450, 0.62, V, t, { knock: V });
    chip(ctx, 'tot de helft van de genkopieën geraakt', 1400, 450, C.goud, q.on('helft', 1), 26);
    cholBalk(ctx, 900, 540, 820, 0.62, 'cholesterol 35 tot 40 procent lager', q.on('lager', 1), C.groen, clamp((t - q.at('lager', 1)) * 1.3, 0, 1));
    // drie controles
    const C1 = q.on('controlegroep', 1, 0.5), C2 = q.on('tweede', 1, 0.5), C3 = q.on('zoekt', 1, 0.3);
    weegKaart(ctx, 1010, 640, 420, 'controlegroep', 'alles behalve de knip zelf', C1, C.teal);
    weegKaart(ctx, 1470, 640, 420, 'tweede gids-RNA', 'elders in hetzelfde gen, zelfde resultaat', C2, C.teal);
    weegKaart(ctx, 1480, 230, 620, 'ergens anders geknipt?', 'nazoeken of Cas9 ook buiten het doelgen heeft geknipt', C3, C.oker); },

  // ---------- H4 ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    infuus(ctx, 420, 420, 1, 1, t, q.on('infuus', 1, 0.6));
    persoon(ctx, 'henk', 760, 880, 440, { t, pose: 'staan', kijk: -1, uit: 'neutraal' });
    naamBij(ctx, 'Opa Henk', '', 760, 400, 1, 'center'); regel(ctx, 'mensen zoals Henk', 760, 438, 1, C.text2, 26, 'center', 500);
    metaA(ctx, 'EUROPA · FEBRUARI VAN HET JAAR 2024', 1120, 200, q.on('februari', 1), C.grain, 'left', 26);
    weegKaart(ctx, 1360, 240, 600, 'eerste CRISPR-behandeling toegelaten', 'bij sikkelcelziekte en bij bètathalassemie', q.on('toegelaten', 1, 0.6), C.groen);
    groep(ctx, 1140, 560, 35, 12, 44, 13, () => '#5A6478', q.on('vijfendertig', 1, 0.6));
    chip(ctx, '35 patiënten, één infuus', 1360, 480, C.teal, q.on('vijfendertig', 1, 0.6), 28);
    cholBalk(ctx, 1120, 726, 660, 0.38, 'LDL bij de hoogste dosis: 62 procent lager', q.on('dosis', 1), C.groen, clamp((t - q.at('dosis', 1)) * 1.3, 0, 1));
    chip(ctx, 'weinig mensen, korte tijd: nog geen bewijs van langer leven', 1360, 830, C.oker, q.on('bewijs', 1), 26); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    infuus(ctx, 420, 400, 0.85, 1, t, 1);
    levercel(ctx, 980, 480, 200, 1, t, { rec: 7, binnen: 0.7 });
    dnaStuk(ctx, 860, 790, 480, 10, q.on('veranderd', 1, 0.5), 5);
    tag(ctx, 'DNA in levercellen veranderd', 1100, 866, C.goud, q.on('veranderd', 1, 0.5), 'center', 28);
    regel(ctx, 'en de kinderen van die patiënt?', 1540, 420, q.on('kinderen', 1), C.text, 36, 'center', 700);
    stamFig(ctx, 1460, 560, 30, false, false, '', q.on('kinderen', 1));
    stamFig(ctx, 1620, 560, 30, true, false, '', q.on('kinderen', 1));
    vraagteken(ctx, 1540, 710, q.on('denk', 1), 110); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: niet erfelijk');
    // links: somatisch, blijft bij de patiënt
    paneel(ctx, 120, 230, 820, 390, 'lichaamscel · somatisch', 1);
    levercel(ctx, 320, 400, 110, 1, t, { rec: 5, binnen: 0.6, label: 0 });
    naamBij(ctx, 'levercel', '', 320, 530, 1, 'center');
    stamFig(ctx, 620, 380, 30, true, false, 'patiënt', 1);
    stamFig(ctx, 820, 380, 28, false, false, 'kind', q.on('blijft', 1, 0.6));
    if (q.on('blijft', 1, 0.6) > 0.5) { kruis(ctx, 730, 380, 20, q.on('blijft', 1, 0.6)); }
    chip(ctx, 'blijft bij de patiënt zelf', 640, 540, C.groen, q.on('somatisch', 1), 26);
    // rechts: kiembaan, gaat door naar de generaties
    const KB = q.on('eicel', 1, 0.6);
    paneel(ctx, 1000, 230, 800, 390, 'eicel, zaadcel of embryo · kiembaan', KB);
    if (KB > 0.01) { ctx.save(); ctx.globalAlpha *= KB; circ(ctx, 1120, 400, 56, 'rgba(140,123,191,0.3)', C.paars, 3); circ(ctx, 1120, 400, 22, rgba(C.kern, 0.6), C.kernR, 2); ctx.restore();
      naamBij(ctx, 'eicel', '', 1120, 520, KB, 'center');
      for (let i = 0; i < 3; i++) { const a2 = KB * clamp((t - q.at('kind', 1)) * 1.4 - i * 0.5, 0, 1);
        stamFig(ctx, 1360 + i * 150, 400, 28, i % 2 === 0, true, '', a2); if (i) { ctx.save(); ctx.globalAlpha *= a2; pijl(ctx, 1300 + (i - 1) * 150, 400, 1332 + (i - 1) * 150, 400, C.line, 1, 3, 12); ctx.restore(); } }
      regel(ctx, 'in elke cel van het kind, en de generaties daarna', 1470, 470, q.on('generaties', 1), C.text2, 26, 'center', 500);
      stempel(ctx, 1400, 548, 'in Nederland verboden', C.koraal, q.on('Embryowet', 1), -0.08); }
    // drie afwegingen
    weegKaart(ctx, 420, 660, 540, 'geen toestemming', 'het kind dat het aangaat kan niet meebeslissen', q.on('toestemming', 1, 0.5), C.goud);
    weegKaart(ctx, 1000, 660, 540, 'niet terug te draaien', 'wat nu veilig lijkt, kan een generatie later anders uitpakken', q.on('uitpakken', 1, 0.5), C.goud);
    weegKaart(ctx, 1580, 660, 540, 'waar ligt de grens?', 'een ziekte voorkomen of een eigenschap uitkiezen', q.on('grens', 1, 0.5), C.goud);
    chip(ctx, 'ook somatisch: meer dan een miljoen euro per patiënt. Wie krijgt hem?', 960, 866, C.oker, q.on('miljoen', 1), 26); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); tuinGrond(ctx, 1);
    tomatenplant(ctx, 250, 880, 0.8, 1, t);
    persoon(ctx, 'henk', 420, 880, 400, { t, pose: 'staan', kijk: -1, uit: 'blij' });
    persoon(ctx, 'kind', 580, 880, 235, { t, pose: 'zwaai', kijk: -1, uit: 'lacht' });
    chip(ctx, 'een pil die zijn cholesterol verlaagt', 470, 320, C.teal, q.on('pil', 1), 26);
    stapBol(ctx, 1020, 450, 1, 'verband', 1, C.teal, t >= q.at('verband', 1) ? 1 : 0.35);
    stapBol(ctx, 1260, 450, 2, 'hypothese', 1, C.teal, t >= q.at('hypothese', 1) ? 1 : 0.35);
    stapBol(ctx, 1500, 450, 3, 'model', 1, C.teal, t >= q.at('model', 1) ? 1 : 0.35);
    stapBol(ctx, 1740, 450, 4, 'patiënt', 1, C.goud, t >= q.at('voorzichtig', 1) ? 1 : 0.35);
    [1020, 1260, 1500].forEach(x => pijl(ctx, x + 56, 450, x + 180, 450, C.line, 0.7, 3, 13));
    regel(ctx, 'elke keer dezelfde weg', 1380, 300, q.on('weg', 1, 0.5), C.text, 36, 'center', 700); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'kim', 380, 880, 460, { t, pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'biomedisch onderzoeker', 380, 360, 1, 'center');
    modelKaart(ctx, 1000, 260, 520, 'bachelor · 3 jaar', 'universiteit, Biomedische wetenschappen', q.on('bachelor', 1, 0.5), C.teal);
    modelKaart(ctx, 1600, 260, 520, 'master · 2 jaar', 'daarna', q.on('master', 1, 0.5), C.teal);
    ctx.save(); const pa = Math.min(q.on('master', 1, 0.5), 1); ctx.globalAlpha *= pa; pijl(ctx, 1270, 310, 1330, 310, C.line, 1, 4, 14); ctx.restore();
    chip(ctx, 'geen arts, maar onderzoeker', 1300, 470, C.goud, q.on('onderzoeker', 1), 30);
    regel(ctx, 'hoe ziektes ontstaan in cellen en moleculen', 1300, 550, q.on('moleculen', 1), C.text2, 30, 'center', 500);
    modelKaart(ctx, 1040, 640, 440, 'onderzoekslab', 'universiteit of instituut', q.on('onderzoekslab', 1, 0.5), C.groen);
    modelKaart(ctx, 1560, 640, 440, 'ziekenhuislab', 'in het ziekenhuis', q.on('ziekenhuislab', 1, 0.5), C.groen); }
});
