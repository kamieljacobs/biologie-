
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
// Wat word jij? · Biomedische wetenschappen en Bio-informatica · Toeval of echt? — eigen tekeningen (24 okt 2026)
// Eén dataset door de hele film (nagerekend in reken/bereken.py): lengte in cm na vijf weken.
const MET = [39, 41, 41, 41, 42, 43, 44, 44, 46, 49];     // gemiddeld 43,0 · sd 2,91
const ZONDER = [35, 36, 38, 39, 40, 41, 41, 43, 43, 44];  // gemiddeld 40,0 · sd 3,02
const KL_MET = C.goud, KL_ZON = C.teal;
// willekeurige verdeling over 20 potjes (1 = met meststof), vast gekozen
const TOEWIJS = [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];
function potWaarden() { let im = 0, iz = 0; const mm = [4, 0, 7, 2, 9, 5, 1, 8, 3, 6], zz = [6, 2, 9, 0, 4, 7, 1, 5, 8, 3]; return TOEWIJS.map(v => v ? MET[mm[im++]] : ZONDER[zz[iz++]]); }
const POT_W = potWaarden();

// zaadbaar pseudotoeval
function rng32(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// husselen: permutatie k van de 20 lengtes; geeft {lab: [0/1 per pot], d: verschil met − zonder}
const _HUS = {};
function hussel(k) { if (_HUS[k]) return _HUS[k]; const r = rng32(1000 + k * 7919), idx = [...Array(20).keys()];
  for (let i = 19; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const lab = Array(20).fill(0); idx.slice(0, 10).forEach(i => lab[i] = 1); let sm = 0, sz = 0; POT_W.forEach((v, i) => lab[i] ? sm += v : sz += v);
  return (_HUS[k] = { lab, d: (sm - sz) / 10 }); }

// tomatenplant in een pot; voetY = onderkant pot; hcm = lengte plant in cm; s = px per cm; sticker 'met'/'zonder'
function tomaatPlant(ctx, x, voetY, hcm, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pw = o.pw || 54, ph = pw * 0.8, top = voetY - ph;
  // stengel
  const L = Math.max(4, hcm * s), sw = Math.sin(x * 0.37) * 6, tw = o.t ? Math.sin(o.t * 0.9 + x * 0.05) * 2.5 : 0;
  ctx.strokeStyle = '#5E9A4E'; ctx.lineWidth = Math.max(3, pw * 0.08); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, top + 2); ctx.quadraticCurveTo(x + sw, top - L * 0.5, x + sw * 0.4 + tw, top - L); ctx.stroke();
  // samengestelde bladeren langs de stengel
  const nb = Math.max(1, Math.round(L / (pw * 0.55)));
  for (let i = 0; i < nb; i++) { const f = (i + 0.7) / (nb + 0.4), yy = top - L * f, xx = x + sw * Math.sin(f * Math.PI) * 0.8 + tw * f, kant = i % 2 ? 1 : -1, bl = pw * (0.42 + 0.18 * (1 - f));
    ctx.strokeStyle = '#4E8A42'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + kant * bl, yy - bl * 0.35); ctx.stroke();
    for (let k = 0; k < 3; k++) { const u = (k + 1) / 3, lx = xx + kant * bl * u, ly = yy - bl * 0.35 * u; ctx.save(); ctx.translate(lx, ly); ctx.rotate(kant * (0.5 + k * 0.25) - 0.3); ctx.beginPath(); ctx.ellipse(0, -pw * 0.08, pw * 0.07 + 2, pw * 0.15 + 2, 0, 0, 6.283); shape(ctx, k === 2 ? '#7FC48F' : '#6DB07A', '#4E8A42', 1); ctx.restore(); } }
  // topje
  ctx.save(); ctx.translate(x + sw * 0.4 + tw, top - L); for (let k = -1; k <= 1; k++) { ctx.save(); ctx.rotate(k * 0.6); ctx.beginPath(); ctx.ellipse(0, -pw * 0.1, pw * 0.06 + 2, pw * 0.14 + 2, 0, 0, 6.283); shape(ctx, '#86CC92', '#4E8A42', 1); ctx.restore(); } ctx.restore();
  if (o.bloem && hcm > 30) { circ(ctx, x + sw * 0.6 + 10, top - L * 0.82, 5, '#F2C94C', '#C9A035', 1); circ(ctx, x + sw * 0.6 + 18, top - L * 0.78, 4, '#F2C94C', '#C9A035', 1); }
  // pot (terracotta) met aarde
  ctx.beginPath(); ctx.moveTo(x - pw / 2, top); ctx.lineTo(x + pw / 2, top); ctx.lineTo(x + pw * 0.38, voetY); ctx.lineTo(x - pw * 0.38, voetY); ctx.closePath(); shape(ctx, '#B8673E', '#8E4C2C', 1.5);
  roundRect(ctx, x - pw * 0.56, top - pw * 0.12, pw * 1.12, pw * 0.18, 4); shape(ctx, '#C97A4E', '#8E4C2C', 1.5);
  if (o.sticker) { const sc = o.sticker === 'met' ? KL_MET : '#E8ECF0', fs = Math.max(11, Math.round(pw * 0.25)); ctx.font = fTekst(fs, 800); const tw2 = ctx.measureText(o.sticker).width + 10;
    ctx.save(); ctx.globalAlpha *= (o.stA == null ? 1 : o.stA); roundRect(ctx, x - tw2 / 2, top + ph * 0.3, tw2, fs + 8, 4); shape(ctx, sc, null); text(ctx, o.sticker, x, top + ph * 0.3 + fs + 1, fTekst(fs, 800), '#1A2740', 'center'); ctx.restore(); }
  ctx.restore(); }

// zak meststof (in de hand van Opa Henk)
function mestZak(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-34, -10); ctx.lineTo(34, -10); ctx.lineTo(40, 90); ctx.lineTo(-40, 90); ctx.closePath(); shape(ctx, '#3F7A55', '#2E5C40', 2);
  ctx.fillStyle = '#2E5C40'; ctx.fillRect(-34, -18, 68, 10); circ(ctx, 0, 34, 18, '#E0B64A'); ctx.strokeStyle = '#3F7A55'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 46); ctx.lineTo(0, 24); ctx.moveTo(0, 30); ctx.lineTo(-8, 22); ctx.moveTo(0, 34); ctx.lineTo(8, 26); ctx.stroke();
  text(ctx, 'GROEI+', 0, 76, fTekst(15, 800), '#F2F2EE', 'center'); ctx.restore(); }

// lengte-as (cm) van lo tot hi tussen x0 en x1
function asX(lo, hi, x0, x1) { return v => x0 + (v - lo) / (hi - lo) * (x1 - x0); }
function lengteAs(ctx, X, lo, hi, step, y, a = 1, label = 'lengte in centimeter') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(lo), y); ctx.lineTo(X(hi), y); ctx.stroke();
  for (let v = lo; v <= hi + 1e-6; v += step) { ctx.beginPath(); ctx.moveTo(X(v), y); ctx.lineTo(X(v), y + 10); ctx.stroke(); text(ctx, String(v).replace('.', ','), X(v), y + 38, fTekst(24, 600), C.text2, 'center'); }
  if (label) metaText(ctx, label, X(hi), y + 76, C.text2, 'right', 20); ctx.restore(); }
// stippen op een rij; dubbele waarden stapelen omhoog
function stipRij(ctx, X, vals, y, col, a = 1, r = 13) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tel = {};
  vals.forEach(v => { const k = Math.round(v * 2); tel[k] = (tel[k] || 0) + 1; circ(ctx, X(v), y - (tel[k] - 1) * (r * 2 + 3), r, rgba(col, 0.85), col, 2); }); ctx.restore(); }
function gemLijn(ctx, X, m, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(m), y - h); ctx.lineTo(X(m), y + 18); ctx.stroke(); ctx.restore(); }
const gem = v => v.reduce((p, q) => p + q, 0) / v.length;
const sdv = v => { const m = gem(v); return Math.sqrt(v.reduce((p, q) => p + (q - m) ** 2, 0) / (v.length - 1)); };
// band van de standaardafwijking rond het gemiddelde
function sdBand(ctx, X, m, s, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, X(m - s), y - h, X(m + s) - X(m - s), h + 16, 10); shape(ctx, rgba(col, 0.16), rgba(col, 0.7), 2); ctx.restore(); }

// exacte verdeling van het verschil bij alle 184 756 verdelingen van de stickers, per 0,2 cm van −6 tot +6 (reken/bereken.py)
const PERM_TEL = [0, 0, 0, 0, 0, 0, 5, 11, 37, 86, 142, 289, 430, 664, 986, 1306, 1783, 2325, 2835, 3613, 4245, 4987, 5861, 6472, 7260, 7993, 8365, 9069, 9301, 9451, 9724, 9451, 9301, 9069, 8365, 7993, 7260, 6472, 5861, 4987, 4245, 3613, 2835, 2325, 1783, 1306, 986, 664, 430, 289, 142, 86, 37, 11, 5, 0, 0, 0, 0, 0, 0];

// spreadsheet-venster met twee kolommen en één formulecel
function spreadsheet(ctx, x, y, a = 1, fA = 1, rA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cw = [56, 150, 150], rh = 34, w = cw[0] + cw[1] + cw[2];
  roundRect(ctx, x - 10, y - 50, w + 20, rh * 13 + 70, 12); shape(ctx, '#F4F5F2', '#B8BEC6', 2); roundRect(ctx, x - 10, y - 50, w + 20, 36, 12); shape(ctx, '#3F7A55', null); ctx.fillStyle = '#3F7A55'; ctx.fillRect(x - 10, y - 30, w + 20, 16);
  const kop = ['', 'A', 'B'];
  for (let r = 0; r < 13; r++) { let cx = x; for (let c = 0; c < 3; c++) { ctx.strokeStyle = '#C8CDD3'; ctx.lineWidth = 1; ctx.strokeRect(cx, y + r * rh, cw[c], rh); if (r === 0 || c === 0) { ctx.fillStyle = '#E2E6EA'; ctx.fillRect(cx + 1, y + r * rh + 1, cw[c] - 2, rh - 2); }
      let s2 = ''; if (r === 0) s2 = kop[c]; else if (c === 0) s2 = String(r); else if (r === 1) s2 = c === 1 ? 'met' : 'zonder'; else if (r <= 11) s2 = String(c === 1 ? MET[r - 2] : ZONDER[r - 2]);
      if (s2) text(ctx, s2, c === 0 || r === 0 ? cx + cw[c] / 2 : cx + cw[c] - 14, y + r * rh + 24, fTekst(20, r === 1 || r === 0 || c === 0 ? 700 : 500), r === 1 ? (c === 1 ? '#8E6A12' : '#2F6E8E') : '#1A2740', c === 0 || r === 0 ? 'center' : 'right'); cx += cw[c]; } }
  // formulecel B12 + uitkomst
  const fy = y + 12 * rh; if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA; ctx.strokeStyle = '#3F7A55'; ctx.lineWidth = 3; ctx.strokeRect(x + cw[0], fy, cw[1] + cw[2], rh);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x + cw[0] + 2, fy + 2, cw[1] + cw[2] - 4, rh - 4); text(ctx, rA > 0.5 ? '0,036' : '=T.TEST(A2:A11;B2:B11;2;2)', rA > 0.5 ? x + w - 14 : x + cw[0] + 8, fy + 24, fTekst(rA > 0.5 ? 22 : 17, 700), '#1A2740', rA > 0.5 ? 'right' : 'left'); ctx.restore(); }
  ctx.restore(); }
// codevenster; regels = [[tekst, kleur]]
function codeVenster(ctx, x, y, w, regels, a = 1, n = 99) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = 40, h = regels.length * lh + 70;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0F1622', '#3A4A64', 2); [C.koraal, C.goud, C.groen].forEach((c, i) => circ(ctx, x + 24 + i * 22, y + 22, 7, c));
  regels.forEach(([s2, col], i) => { if (i < n) text(ctx, s2, x + 22, y + 74 + i * lh, `500 21px "JetBrains Mono", "DejaVu Sans Mono", monospace`, col || '#D8DEE6', 'left'); }); ctx.restore(); }
// laptop (achterkant naar de kijker is lastig; vooraanzicht met scherm)
function genRaster(ctx, x, y, cols, rows, sz, gap, lit, a = 1, t = 0, o2 = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c, on = lit(i);
  roundRect(ctx, x + c * (sz + gap), y + r * (sz + gap), sz, sz, 3); shape(ctx, on ? rgba(o2, 0.9) : "#33425E", on ? o2 : null, 1); } ctx.restore(); }

// muis zonder lichtvezel (review MOET 1): gewone proefmuis in zijaanzicht, snuit rechts
function proefMuis(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20 + Math.sin(t * 2) * 6, -200, -30, -240, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A');
  ctx.strokeStyle = '#8A8078'; ctx.lineWidth = 6; [[-60, 1], [50, 1]].forEach(([px]) => { ctx.beginPath(); ctx.moveTo(px, 50); ctx.lineTo(px + 6, 66); ctx.stroke(); });
  ctx.restore(); }
// petrischaal met cellen (bovenaanzicht)
function petriCellen(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, 'rgba(220,230,240,0.18)', '#C8D4E0', 3);
  ctx.beginPath(); ctx.ellipse(x, y - 4, r * 0.92, r * 0.36, 0, 0, 6.283); shape(ctx, 'rgba(232,180,160,0.35)', null);
  for (let i = 0; i < 16; i++) { const an = hash(i * 1.7) * 6.283, d = Math.sqrt(hash(i * 2.3)) * 0.8, cx = x + Math.cos(an) * r * 0.85 * d, cy = y - 4 + Math.sin(an) * r * 0.32 * d;
    ctx.beginPath(); ctx.ellipse(cx, cy, 13, 7, an, 0, 6.283); shape(ctx, '#E8C0B0', '#B8806A', 1.2); circ(ctx, cx, cy, 3, '#8A5A6A'); }
  ctx.restore(); }
// Wat word jij? · Biomedische wetenschappen en Bio-informatica · Toeval of echt? — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Noor, Daan, Dr. Kim).
// Rode draad: Noor test de meststof van Opa Henk met twintig tomatenplantjes. Eén dataset (MET/ZONDER in teken_b4.js), nagerekend in reken/bereken.py.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fadeA(a, f) { return a * f; }
// twintig potjes in twee rijen; groei 0..1 (van jong plantje naar de gemeten lengte)
function potRijen(ctx, t, groei, stA, a = 1, x0 = 840, dx = 104, y1 = 540, y2 = 850, s = 4.4, pw = 54) { if (a <= 0.01) return;
  for (let i = 0; i < 20; i++) { const rij = i < 10 ? 0 : 1, x = x0 + (i % 10) * dx, v = POT_W[i], h = 8 + (v - 8) * ease(groei);
    tomaatPlant(ctx, x, rij ? y2 : y1, h, s, { a, pw, t, sticker: TOEWIJS[i] ? 'met' : 'zonder', stA, bloem: true }); } }

Object.assign(SCENES, {
  title(ctx, t) { for (let i = 0; i < 4; i++) tomaatPlant(ctx, 1240 + i * 150, 760, [40, 46, 37, 43][i], 5.2, { pw: 70, t, sticker: i % 2 ? 'met' : 'zonder', bloem: true }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const N = q.on('Noor', 1, 0.3), P = q.on('twintig', 1), G = clamp((t - q.at('weken', 1)) / 2.5, 0, 1);
    const Tp = 1 - P; for (let i = 0; i < 4; i++) tomaatPlant(ctx, 900 + i * 170, 860, [52, 60, 48, 56][i] - G * 0, 6, { pw: 80, t, a: Tp, bloem: true });
    persoon(ctx, 'henk', 250, 880, 420, { t, pose: 'vasthouden', kijk: 1, uit: q.at('Zie', 1) <= t ? 'lacht' : 'blij', hold: (c, x, y) => mestZak(c, x + 6, y - 6, 0.9) });
    naamBij(ctx, 'Opa Henk', 'nieuwe meststof', 140, 400, 1 - q.on('twintig', 1), 'left');
    persoon(ctx, 'noor', 560, 880, 400, { t, a: N, kijk: 1, uit: 'neutraal', pose: q.at('meet', 1) <= t ? 'wijs' : 'staan' });
    potRijen(ctx, t, G, q.on('toeval', 1), P);
    metaA(ctx, 'na vijf weken', 1310, 150, q.on('weken', 1), C.grain, 'center', 24);
    chip(ctx, 'met meststof: gemiddeld 43 cm', 400, 200, KL_MET, q.on('drieënveertig', 1), 28);
    chip(ctx, 'zonder: gemiddeld 40 cm', 400, 270, KL_ZON, q.on('veertig', 2), 28);
    tag(ctx, '3 cm langer', 400, 360, C.goud, q.on('langer', 1), 'center', 34);
    vraagteken(ctx, 700, 330, q.on('genoeg', 1), 110); },

  // ---------- H1 Spreiding ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: dat hangt af van de spreiding');
    const X = asX(20, 60, 300, 1700), yM = 430, yZ = 670, yA = 760;
    const kz = [38, 39, 39, 40, 40, 40, 40, 41, 41, 42], gz = [25, 29, 33, 37, 40, 42, 45, 47, 50, 52];
    const B = q.on('vijfentwintig', 1, 1.2), D = q.on('Noor', 1, 1.4);
    const mz = kz.map((v, i) => lerp(lerp(v, gz[i], B), ZONDER[i], D)), mm = kz.map((v, i) => lerp(lerp(v + 3, gz[i] + 3, B), MET[i], D));
    lengteAs(ctx, X, 20, 60, 5, yA, 1);
    regel(ctx, 'met', 120, yM + 10, 1, KL_MET, 32, 'left', 700); regel(ctx, 'zonder', 120, yZ + 10, 1, KL_ZON, 32, 'left', 700);
    const S = q.on('standaardafwijking', 1);
    sdBand(ctx, X, 43, sdv(mm), yM + 4, 110, KL_MET, S); sdBand(ctx, X, 40, sdv(mz), yZ + 4, 110, KL_ZON, S);
    const O = q.on('overlappen', 1); if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; ctx.fillStyle = rgba(C.koraal, 0.13); ctx.fillRect(X(39) - 14, yM - 120, X(44) - X(39) + 28, yZ - yM + 150); ctx.restore(); }
    gemLijn(ctx, X, 43, yM, 120, KL_MET, 1); gemLijn(ctx, X, 40, yZ, 120, KL_ZON, 1);
    const Pl = q.on('plantjes', 1); stipRij(ctx, X, mm, yM, KL_MET, Pl); stipRij(ctx, X, mz, yZ, KL_ZON, Pl);
    regel(ctx, 'gemiddeld 43', X(43) + 16, yM - 96, 1 - Pl, KL_MET, 26, 'left', 700); regel(ctx, 'gemiddeld 40', X(40) - 16, yZ - 96, 1 - Pl, KL_ZON, 26, 'right', 700);
    chip(ctx, '3 cm is hier veel', 1500, 230, C.groen, q.on('veel', 1) * (1 - B), 28);
    chip(ctx, '3 cm valt weg in de ruis', 1500, 230, C.koraal, q.on('ruis', 1) * (1 - q.on('spreiding', 1)), 28);
    naamBij(ctx, 'spreiding', '', X(57), yM - 150, q.on('spreiding', 1) * (1 - D), 'center');
    chip(ctx, 'standaardafwijking ≈ 3 cm', 1500, 230, C.goud, q.on('drie', 2) * D, 28);
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('kleinste', 1); circ(ctx, X(39), yM, 22, null, C.text, 4); ctx.restore(); ctx.save(); ctx.globalAlpha *= q.on('grootste', 1); circ(ctx, X(44), yZ, 22, null, C.text, 4); ctx.restore(); }
    regel(ctx, '39 cm', X(39), yM - 40, q.on('negenendertig', 1), C.text, 26, 'center', 700); regel(ctx, '44 cm', X(44), yZ - 40, q.on('grootste', 1), C.text, 26, 'center', 700); },

  // ---------- H2 Hoeveel plantjes? ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const X = asX(34, 46, 360, 1380);
    persoon(ctx, 'noor', 1660, 880, 400, { t, kijk: -1, uit: q.at('half', 1) <= t ? 'neutraal' : 'blij', pose: q.at('half', 1) <= t ? 'denk' : 'staan' });
    const paneelN = (n, y, a, seed, hl) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lengteAs(ctx, X, 34, 46, 2, y, 1, ''); regel(ctx, n + ' plantjes', 120, y - 20, 1, C.text, 30, 'left', 700);
      const k = Math.floor(Math.max(0, t) / 0.9), hist = [];
      for (let j = Math.max(0, k - 14); j <= k; j++) { const r = rng32(seed * 1000 + j); const vals = []; for (let i = 0; i < n; i++) { const u = r() + r() + r() + r() - 2; vals.push(40 + u * 3 * 1.22); } hist.push([vals, gem(vals)]); }
      hist.forEach(([vals, m], i) => { const last = i === hist.length - 1; if (!last) { ctx.strokeStyle = rgba(C.goud, 0.45); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(m), y - 46); ctx.lineTo(X(m), y - 10); ctx.stroke(); } });
      const [vals, m] = hist[hist.length - 1]; const imax = vals.indexOf(Math.max(...vals));
      vals.forEach((v, i) => circ(ctx, X(clamp(v, 34, 46)), y - 110, 12, rgba(C.teal, 0.8), i === imax && hl > 0.5 ? C.koraal : C.teal, i === imax && hl > 0.5 ? 5 : 2));
      ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(X(m), y - 70); ctx.lineTo(X(m), y - 6); ctx.stroke(); ctx.restore(); };
    paneelN(10, 680, 1, 2, 0); metaA(ctx, 'lengte in centimeter', X(46), 760, 1, C.text2, 'right', 18); paneelN(3, 380, q.on('drie', 1), 1, q.on('toevallig', 1));
    metaA(ctx, 'goud = gemiddelde van één herhaling', 360, 170, 1, C.grain, 'left', 22);
    tag(ctx, 'standaardfout = standaardafwijking / √n', 870, 800, C.goud, q.on('standaardfout', 1), 'center', 30);
    chip(ctx, 'Noor: 3 / √10 ≈ 1 cm', 1500, 300, C.teal, q.on('Bij', 1) * (1 - q.on('half', 1, 0.3)), 28);
    chip(ctx, 'half zo groot: hoeveel plantjes?', 1500, 300, C.goud, ramp(t, q.at('half', 1) + 0.3, 0.4), 28); vraagteken(ctx, 1660, 420, q.on('denk', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: veertig plantjes'); const P = q.on('Stel', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P;
      const gx = 260, gy = 260, gw = 1000, gh = 460, Xn = n => gx + (n - 1) / 59 * gw, Ys = s => gy + gh - s / 3 * gh;
      assen(ctx, gx, gy, gw, gh, '', 'standaardfout in centimeter'); metaA(ctx, 'aantal plantjes per groep', gx + gw, gy + gh + 72, 1, C.text2, 'right', 18);
      [10, 20, 30, 40, 50, 60].forEach(n => text(ctx, String(n), Xn(n), gy + gh + 30, fTekst(22, 600), C.text2, 'center')); [1, 2, 3].forEach(s => text(ctx, String(s), gx - 16, Ys(s) + 8, fTekst(22, 600), C.text2, 'right'));
      const cu = q.on('helpen', 1, 2); if (cu > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let n = 1; n <= 1 + 59 * cu; n += 0.5) { const s = Math.min(3, 3 / Math.sqrt(n)); n === 1 ? ctx.moveTo(Xn(n), Ys(s)) : ctx.lineTo(Xn(n), Ys(s)); } ctx.stroke(); }
      circ(ctx, Xn(10), Ys(3 / Math.sqrt(10)), 12, C.teal, '#fff', 2); regel(ctx, '10: ≈ 0,95 cm', Xn(10) + 24, Ys(0.95) - 18, 1, C.teal, 26, 'left', 700);
      const v = q.on('Vier', 1); circ(ctx, Xn(40), Ys(3 / Math.sqrt(40)), 12 * v, C.groen, '#fff', 2); regel(ctx, '40: ≈ 0,47 cm', Xn(40), Ys(0.47) - 30, v, C.groen, 26, 'center', 700);
      tag(ctx, '4 × zoveel → √4 = 2 → half zo groot', 1540, 300, C.groen, q.on('wortel', 1), 'center', 28);
      chip(ctx, 'elk extra plantje helpt minder', 1540, 420, C.text2, q.on('minder', 1), 26); chip(ctx, 'vooraf uitrekenen', 1540, 520, C.goud, q.on('vooraf', 1), 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; metaA(ctx, 'stel: de meststof scheelt echt 3 centimeter · 20 proeven', 160, 240, 1, C.grain, 'left', 24);
      const rij = (y, n, hits, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; regel(ctx, n + ' per groep', 160, y + 44, 1, C.text, 30, 'left', 700);
        for (let i = 0; i < 20; i++) { const ok = i < hits, x = 480 + i * 56; roundRect(ctx, x, y, 44, 60, 6); shape(ctx, ok ? rgba(C.groen, 0.3) : '#2A3446', ok ? C.groen : C.line, 2); if (ok) vink_(ctx, x + 22, y + 30, 12, 1); }
        regel(ctx, Math.round(hits / 20 * 100) + ' %', 1640, y + 44, 1, C.groen, 34, 'left', 700); ctx.restore(); };
      rij(330, 10, 11, q.on('tien', 1)); rij(470, 17, 16, q.on('zeventien', 1)); metaA(ctx, 'groen = significant verschil gevonden', 480, 590, q.on('tien', 1), C.groen, 'left', 20);
      const M = q.on('Onderzoek', 2); proefMuis(ctx, 760, 760, 0.55, M, t); tag(ctx, 'film: Onderzoek doen', 1180, 740, C.teal, M, 'center', 28); chip(ctx, 'te weinig dieren is ook onethisch', 1180, 820, C.text2, q.on('onethisch', 1), 24); ctx.restore(); } },

  // ---------- H3 Wat de p-waarde zegt ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const H = q.at('Hussel', 1), k = t > H ? Math.floor((t - H) / 0.55) : -1, hs = k >= 0 ? hussel(k) : null;
    tag(ctx, 'film: Onderzoek doen · Mendel', 1500, 150, C.teal, 1 - q.on('nulhypothese', 1), 'center', 26);
    tag(ctx, 'nulhypothese: de meststof doet niets', 960, 150, C.goud, q.on('nulhypothese', 1), 'center', 30);
    for (let i = 0; i < 20; i++) { const x = 330 + i * 66, lab = hs ? hs.lab[i] : TOEWIJS[i]; tomaatPlant(ctx, x, 480, POT_W[i], 3.4, { pw: 44, t, sticker: lab ? 'met' : 'zonder', stA: q.on('stickers', 1) }); }
    const X = d => 960 + d * 100, yb = 830, f = clamp((t - H) / 7, 0, 1), mx = 9724;
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(-6), yb); ctx.lineTo(X(6), yb); ctx.stroke();
    for (let d = -6; d <= 6; d += 2) text(ctx, (d > 0 ? '+' : '') + d, X(d), yb + 34, fTekst(22, 600), C.text2, 'center');
    metaA(ctx, 'verschil met − zonder in centimeter', X(6), yb + 64, 1, C.text2, 'right', 18);
    
    PERM_TEL.forEach((c, i) => { const d = (i - 30) * 0.2, h = c / mx * 250 * f; if (h < 0.5) return; const staart = Math.abs(d) >= 3 - 1e-9; ctx.fillStyle = staart && t >= q.at('vier', 1) ? C.koraal : rgba(C.teal, 0.75); ctx.fillRect(X(d) - 9, yb - h, 18, h); });
    if (hs && f < 1) { const yy = yb - 300; circ(ctx, X(hs.d), yy, 12, C.goud); }
    const N3 = q.on('drie', 1); if (N3 > 0.01) { ctx.save(); ctx.globalAlpha *= N3; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; [-3, 3].forEach(d => { ctx.beginPath(); ctx.moveTo(X(d), yb); ctx.lineTo(X(d), yb - 280); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); regel(ctx, 'Noor: +3', X(3) + 14, yb - 250, N3, C.goud, 26, 'left', 700); }
    chip(ctx, 'meestal dicht bij nul', 480, 680, C.teal, q.on('Meestal', 1) * (1 - q.on('vier', 1)), 26);
    chip(ctx, '≈ 4 op de 100: 3 cm of meer', 480, 680, C.koraal, q.on('vier', 1), 26);
    tag(ctx, 'p ≈ 0,04', 1660, 620, C.koraal, q.on('komma', 1), 'center', 40); vraagteken(ctx, 1660, 780, q.on('precies', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: zonder effect zelden zo\'n verschil'); const Fo = q.on('foutbalken', 1, 0.5), F = ramp(t, q.at('foutbalken', 1) + 0.5, 0.5);
    if (Fo < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Fo;
      roundRect(ctx, 260, 250, 1400, 170, 18); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); regel(ctx, 'p = kans op een verschil van minstens 3 cm', 960, 320, 1, C.text, 40, 'center', 700); regel(ctx, '(groter of kleiner), uitgerekend alsof de meststof niets doet', 960, 380, q.on('uitgerekend', 1), C.groen, 32, 'center', 600);
      const N = q.on('niet', 2); roundRect(ctx, 260, 470, 1400, 120, 18); shape(ctx, rgba(C.koraal, 0.1 * N), rgba(C.koraal, N), 2); regel(ctx, 'niet: de kans dat de meststof niets doet', 960, 545, N, C.koraal, 36, 'center', 700); kruis(ctx, 1600, 530, 24, N);
      chip(ctx, 'en ook niet: hoe groot het effect is', 960, 690, C.goud, q.on('kleine', 1), 28); ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const Y = v => 780 - (v - 30) * 25, gx = 300;
      assen(ctx, gx, 280, 620, 500, '', 'lengte in centimeter'); [30, 35, 40, 45, 50].forEach(v => text(ctx, String(v), gx - 14, Y(v) + 8, fTekst(22, 600), C.text2, 'right'));
      const ts = [q.at('spreiding', 1), q.at('standaardfout', 1), q.at('betrouwbaarheidsinterval', 1)], soort = t >= ts[2] ? 2 : t >= ts[1] ? 1 : t >= ts[0] ? 0 : -1;
      const hw = [[3.02, 2.91], [0.95, 0.92], [2.16, 2.08]], nm = ['± standaardafwijking', '± standaardfout', '95%-betrouwbaarheidsinterval'];
      [[40, KL_ZON, 'zonder', 480], [43, KL_MET, 'met', 740]].forEach(([m, col, lab, x], j) => { if (soort >= 0) { const h = hw[soort][j] * 25; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, Y(m) - h); ctx.lineTo(x, Y(m) + h); ctx.moveTo(x - 24, Y(m) - h); ctx.lineTo(x + 24, Y(m) - h); ctx.moveTo(x - 24, Y(m) + h); ctx.lineTo(x + 24, Y(m) + h); ctx.stroke(); }
        circ(ctx, x, Y(m), 16, col, '#fff', 2); text(ctx, lab, x, 830, fTekst(28, 700), col, 'center'); });
      if (soort >= 0) tag(ctx, nm[soort], 1180, 250, C.text2, 1, 'center', 26);
      const O = q.on('overlappen', 1); if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; ctx.fillStyle = rgba(C.koraal, 0.15); ctx.fillRect(400, Y(42.16), 440, Y(40.92) - Y(42.16)); ctx.restore(); chip(ctx, 'balken overlappen', 1180, 340, C.koraal, O, 26); }
      chip(ctx, 'en toch p ≈ 0,04', 1180, 420, C.goud, q.on('kleiner', 1), 26);
      const V = q.on('verschil', 3), Xd = d => 1080 + d * 100; if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; regel(ctx, 'het verschil: 3 cm', 1380, 540, 1, C.text, 32, 'center', 700);
        ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(Xd(-0.5), 700); ctx.lineTo(Xd(6.5), 700); ctx.stroke(); [0, 1, 2, 3, 4, 5, 6].forEach(d => text(ctx, String(d), Xd(d), 736, fTekst(22, 600), C.text2, 'center'));
        ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(Xd(0), 600); ctx.lineTo(Xd(0), 700); ctx.stroke(); ctx.setLineDash([]);
        const A = q.on('Alle', 1); roundRect(ctx, Xd(0.22), 630, Xd(5.78) - Xd(0.22), 30, 15); shape(ctx, rgba(C.goud, 0.2 + 0.35 * A), C.goud, 3); circ(ctx, Xd(3), 645, 14, C.goud, '#fff', 2);
        regel(ctx, '0,2', Xd(0.22), 612, 1, C.goud, 24, 'center', 700); regel(ctx, '5,8', Xd(5.78), 612, 1, C.goud, 24, 'center', 700); metaA(ctx, 'centimeter', Xd(6.5), 780, 1, C.text2, 'right', 18); ctx.restore(); }
      ctx.restore(); } },

  // ---------- H4 Zelf rekenen ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const Py = q.on('Python', 1), R = q.on('Allebei', 1);
    persoon(ctx, 'daan', 170, 880, 360, { t, kijk: 1, uit: R > 0.5 ? 'blij' : 'neutraal', pose: 'denk' }); persoon(ctx, 'noor', 420, 880, 380, { t, kijk: 1, uit: R > 0.5 ? 'blij' : 'neutraal', pose: 'wijs' });
    spreadsheet(ctx, 640, 240, q.on('spreadsheet', 1), q.on('formule', 1), R);
    codeVenster(ctx, 1110, 250, 720, [['from scipy import stats', C.paars], ['met = [39, 41, 41, 41, 42, 43, 44, 44, 46, 49]', KL_MET], ['zonder = [35, 36, 38, 39, 40, 41, 41, 43, 43, 44]', KL_ZON], ['round(stats.ttest_ind(met, zonder).pvalue, 3)', '#D8DEE6'], [R > 0.5 ? '0.036' : '', C.groen]], Py);
    chip(ctx, 'husselen gaf ≈ 0,04', 1470, 620, C.text2, q.on('husselen', 1), 26);
    tag(ctx, 't = verschil / wiebel ≈ 3 / 1,3 ≈ 2,3', 1470, 730, C.goud, q.on('vergelijkt', 1), 'center', 30); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    for (let i = 0; i < 4; i++) tomaatPlant(ctx, 1120 + i * 120, 880, [44, 41, 46, 40][i], 5, { pw: 60, t, sticker: i % 2 ? 'zonder' : 'met', bloem: true });
    persoon(ctx, 'henk', 1650, 880, 420, { t, kijk: -1, uit: 'blij', pose: 'staan' }); persoon(ctx, 'noor', 960, 880, 400, { t, kijk: 1, uit: 'blij', pose: 'wijs' });
    chip(ctx, 'past slecht bij "doet niets"', 480, 240, C.groen, 1, 28); chip(ctx, 'hoeveel? tussen 0,2 en 5,8 cm', 480, 320, C.goud, q.on('hoeveel', 1), 28);
    tag(ctx, 'spreiding', 480, 470, C.teal, q.on('spreiding', 1), 'center', 32); tag(ctx, 'aantal metingen', 480, 570, C.teal, q.on('aantal', 1), 'center', 32); tag(ctx, 'wat p echt zegt', 480, 670, C.teal, q.on('p-waarde', 1, 0.4), 'center', 32); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const BI = q.on('bio-informatica', 1);
    persoon(ctx, 'kim', 230, 880, 430, { t, kijk: 1, outfit: 'lab', uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 130, 400, 1 - BI * 0.5, 'left');
    proefMuis(ctx, 560, 660, 0.45, 1 - BI * 0.5, t); petriCellen(ctx, 760, 560, 80, (1 - BI * 0.5) * q.on('cellen', 1, 0.3), t);
    tag(ctx, 'Biomedische wetenschappen', 560, 300, C.teal, q.on('Biomedische', 2), 'center', 30); regel(ctx, 'universiteit · bachelor 3 jaar · dan een master', 560, 370, q.on('drie', 1), C.text2, 26, 'center', 600);
    tag(ctx, 'Bio-informatica', 1400, 230, C.paars, BI, 'center', 30);
    const G = q.on('twintigduizend', 1), L = q.on('verwacht', 1), S = q.on('strengere', 1);
    genRaster(ctx, 1000, 290, 40, 20, 16, 4, i => L > 0.5 && S < 0.5 && hash(i * 3.7) < 0.05, G, t);
    metaA(ctx, '1 vakje = 25 genen · 20 000 genen', 1000, 720, G, C.grain, 'left', 20);
    chip(ctx, '≈ 1000 × p < 0,05 door toeval', 1400, 790, C.koraal, L * (1 - S), 26); chip(ctx, 'strengere grens: door toeval nu ± 0', 1400, 790, C.groen, S * (1 - q.on('hbo', 1)), 26);
    regel(ctx, 'hbo · 4 jaar · master aan de universiteit', 1400, 790, q.on('hbo', 1), C.text2, 26, 'center', 600); }
});
