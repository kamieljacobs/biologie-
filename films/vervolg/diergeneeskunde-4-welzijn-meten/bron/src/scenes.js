
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
    ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -30); ctx.lineTo(240, -18); ctx.moveTo(150, -10); ctx.lineTo(250, -2); ctx.stroke(); ctx.fillStyle = '#3A3430'; roundRect(ctx, 238, -32, 22, 20, 4); ctx.fill(); roundRect(ctx, 248, -16, 22, 20, 4); ctx.fill(); ctx.strokeStyle = k; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(150, -30); ctx.lineTo(196, -24); ctx.stroke(); ctx.strokeStyle = '#F2D27A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(196, -24, 16, 0, 6.283); ctx.stroke(); ctx.strokeStyle = '#D8826A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(40, 60); ctx.quadraticCurveTo(80, 120, 140, 128); ctx.stroke(); }
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
// Wat word jij? · Diergeneeskunde 4 · Welzijn meten — eigen tekeningen (21 okt 2026). Gebruikt de gedeelde dieren uit teken_dg0.js.

// varkenshok: betonvloer met spijlen achter; stro = 0..1 (verrijking)
function varkensHok(ctx, x, y, w, h, a = 1, o = {}) { const { stroA = 0, touw = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x, y - h, w, h); ctx.fillStyle = '#5A6070'; ctx.fillRect(x, y - 8, w, 30); ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 2; for (let i = 0; i < w / 40; i++) { ctx.beginPath(); ctx.moveTo(x + i * 40, y - 6); ctx.lineTo(x + i * 40, y + 20); ctx.stroke(); }
  ctx.strokeStyle = '#8A96A8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - h * 0.62); ctx.lineTo(x + w, y - h * 0.62); ctx.moveTo(x, y - h * 0.3); ctx.lineTo(x + w, y - h * 0.3); ctx.stroke(); for (let i = 0; i <= w / 90; i++) { ctx.beginPath(); ctx.moveTo(x + i * 90, y - h * 0.68); ctx.lineTo(x + i * 90, y); ctx.stroke(); }
  if (stroA > 0.01) stro(ctx, x, y - 10, w, stroA);
  if (touw > 0.01) { ctx.save(); ctx.globalAlpha *= touw; ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 7; for (let k = 0; k < 2; k++) { const tx = x + w * (0.3 + k * 0.4); ctx.beginPath(); ctx.moveTo(tx, y - h * 0.62); ctx.quadraticCurveTo(tx + 10, y - h * 0.4, tx - 4, y - h * 0.2); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
// vijf vakjes (vijf vrijheden); aan = 0..5 hoeveel zichtbaar
function vijfVakjes(ctx, x, y, w, labels, aan, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w / 5;
  labels.forEach((l, i) => { const f = clamp(aan - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x + i * bw + 8, y, bw - 16, 150, 14); shape(ctx, rgba(col, 0.14), col, 2); ctx.font = fTekst(26, 700); ctx.fillStyle = C.text; ctx.textAlign = 'center'; const reg = l.split('\n'); reg.forEach((r, k) => ctx.fillText(r, x + i * bw + bw / 2, y + 62 + k * 32 - (reg.length - 1) * 16)); ctx.textAlign = 'left'; ctx.restore(); });
  ctx.restore(); }
// vijf domeinen: vier vakken die naar een vijfde (gevoel) wijzen
function vijfDomeinen(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = [['voeding', C.oker], ['omgeving', C.groen], ['gezondheid', C.koraal], ['gedrag', C.paars]];
  L.forEach(([n, col], i) => { const f = clamp(u * 5 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const bx = x - 600 + i * 300; kaartje(ctx, bx, y, 260, n, col, 1, 30); pijl(ctx, bx + 130, y + 80, x + (bx + 130 - x) * 0.25, y + 200, col, 1, 4, 14); ctx.restore(); });
  const f = clamp(u * 5 - 4, 0, 1); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x - 260, y + 210, 520, 100, 24); shape(ctx, rgba(C.goud, 0.2), C.goud, 3); regel(ctx, 'hoe voelt het dier zich?', x, y + 274, 1, C.goud, 38, 'center', 800); ctx.restore(); }
  ctx.restore(); }
// paard dat in de kribbe bijt (kop + rand)
function kribbeBijter(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const k = '#9A5E38', b = Math.max(0, Math.sin(t * 3)) * 8;
  ctx.fillStyle = '#6B4A30'; ctx.fillRect(60, -40, 200, 40); ctx.fillStyle = '#5A3E28'; ctx.fillRect(60, -46, 200, 10);
  ctx.save(); ctx.translate(0, b); ctx.fillStyle = k; zacht(ctx, [[-160, -240], [-100, -230], [-30, -170], [40, -90], [80, -60], [96, -40], [70, -30], [20, -60], [-60, -120], [-140, -150], [-180, -190]]); ctx.fill();
  ctx.fillStyle = '#2A1C14'; zacht(ctx, [[-170, -236], [-110, -232], [-70, -200], [-120, -210]]); ctx.fill(); circ(ctx, 0, -130, 6, '#140E0A'); ctx.restore();
  ctx.restore(); }
// kalf met tong (tongrollen)
function kalfTong(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; koe(ctx, x, y, s, { a, t, uier: 0, horens: false, bont: true });
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const r = Math.sin(t * 4); ctx.strokeStyle = '#E07A8A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(262, -134); ctx.bezierCurveTo(290, -130 + r * 10, 292, -110 - r * 12, 276, -112); ctx.stroke(); ctx.restore(); }
// ijsbeer die heen en weer loopt (positie p 0..1)
function ijsbeer(ctx, x, y, s = 1, a = 1, kijk = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); const k = '#ECE8DE';
  ctx.fillStyle = _dk(k, 0.12); [[-70, -60], [50, -60]].forEach(([px, py]) => { roundRect(ctx, px - 14, py, 28, -py, 10); ctx.fill(); });
  ctx.fillStyle = k; zacht(ctx, [[-110, -80], [-80, -130], [20, -136], [80, -120], [110, -96], [100, -60], [-90, -56]]); ctx.fill(); [[-50, -60], [74, -60]].forEach(([px, py]) => { roundRect(ctx, px - 15, py, 30, -py, 10); ctx.fill(); });
  zacht(ctx, [[90, -120], [130, -126], [160, -104], [150, -88], [110, -86]]); ctx.fill(); circ(ctx, 158, -100, 5, '#1A1612'); circ(ctx, 132, -112, 3, '#1A1612'); circ(ctx, 112, -128, 8, k); ctx.restore(); }
// cortisolbron: icoon speeksel (druppel), mest (hoopje), haar (lok)
function bronIcoon(ctx, soort, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'speeksel') { ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(40, 0, 0, 30); ctx.quadraticCurveTo(-40, 0, 0, -60); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fill(); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.stroke(); }
  if (soort === 'mest') { ctx.fillStyle = '#6B4A30'; [[0, 20, 50, 18], [0, 0, 38, 16], [0, -18, 24, 14]].forEach(([px, py, rx, ry]) => { ctx.beginPath(); ctx.ellipse(px, py, rx, ry, 0, 0, 6.283); ctx.fill(); }); }
  if (soort === 'haar') { ctx.strokeStyle = '#B88A5A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 7, 30); ctx.quadraticCurveTo(-20 + i * 6, -10, -10 + i * 5 + Math.sin(i) * 10, -50); ctx.stroke(); } }
  ctx.restore(); }
// stalfront A (nieuw, licht) of B (oud)
function melkStal(ctx, x, y, w, h, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const nieuw = soort === 'A';
  stal(ctx, x, y, w, h, 1, { kleur: nieuw ? '#4A6080' : '#4A4034', dak: nieuw ? '#3A4C66' : '#3A3228' });
  if (nieuw) { ctx.fillStyle = 'rgba(242,214,122,0.35)'; ctx.fillRect(x + 20, y - h + 20, w - 40, 30); } else { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 30, y - h + 40, 40, 20); ctx.fillRect(x + w - 90, y - h + 70, 50, 14); }
  regel(ctx, 'stal ' + soort, x + w / 2, y - h - h * 0.45 - 20, 1, nieuw ? C.teal : C.oker, 40, 'center', 800); regel(ctx, nieuw ? 'nieuw · licht · ruim' : 'oud · krapper', x + w / 2, y + 44, 1, C.text2, 26, 'center', 600); ctx.restore(); }
// scorekaartje met getal (bv. kreupelheid 1–5)
function scoreKaart(ctx, x, y, titel, waarde, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 110, y - 70, 220, 120, 16); shape(ctx, rgba(col, 0.16), col, 2); regel(ctx, titel, x, y - 30, 1, C.text2, 22, 'center', 700); regel(ctx, waarde, x, y + 30, 1, col, 48, 'center', 800); ctx.restore(); }
// afstand-maatlat tussen twee x-posities
function afstandLat(ctx, x1, x2, y, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(x1, y - 14); ctx.lineTo(x1, y + 14); ctx.moveTo(x2, y - 14); ctx.lineTo(x2, y + 14); ctx.stroke(); regel(ctx, label, (x1 + x2) / 2, y - 22, 1, C.goud, 28, 'center', 700); ctx.restore(); }
// tafel met gezondheidsplan
function planTafel(ctx, x, y, a = 1, vinkjes = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x - 220, y - 12, 440, 22); ctx.fillRect(x - 200, y + 10, 16, 150); ctx.fillRect(x + 184, y + 10, 16, 150);
  roundRect(ctx, x - 90, y - 140, 180, 128, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'gezondheidsplan', x, y - 108, fTekst(20, 800), '#1A2740', 'center');
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 50, y - 76 + i * 24); ctx.lineTo(x + 60, y - 76 + i * 24); ctx.stroke(); if (vinkjes > i) vink_(ctx, x - 70, y - 78 + i * 24, 8, 1); } ctx.restore(); }
// hete tang (couperen)
function heteTang(ctx, x, y, s = 1, a = 1, gloed = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.4);
  roundRect(ctx, -120, -10, 140, 20, 8); shape(ctx, '#3A3F4E', '#5A6070', 2); roundRect(ctx, 20, -7, 70, 14, 4); shape(ctx, '#8A96A8', null);
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed * (0.7 + 0.3 * Math.sin(t * 6)); circ(ctx, 92, 0, 14, rgba(C.koraal, 0.6)); circ(ctx, 92, 0, 7, C.goud); ctx.restore(); } ctx.restore(); }
// weegschaal met vier belangen (pannen links/rechts met labels)
function belangen(ctx, x, y, a = 1, al = [1, 1, 1, 1], t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tilt = Math.sin(t * 0.8) * 0.05;
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 6, y - 220, 12, 220); roundRect(ctx, x - 80, y - 6, 160, 18, 6); ctx.fill(); ctx.save(); ctx.translate(x, y - 220); ctx.rotate(tilt); ctx.fillRect(-340, -6, 680, 12);
  [[-300, ['het dier', C.groen], ['de regels', C.teal]], [300, ['de veehouder', C.oker], ['de samenleving', C.paars]]].forEach(([px, l1, l2], k) => { ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px - 120, 120); ctx.moveTo(px, 0); ctx.lineTo(px + 120, 120); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, 124, 130, 18, 0, 0, Math.PI); ctx.fillStyle = '#9AA3B2'; ctx.fill();
    [l1, l2].forEach(([n, col], i) => { const f = al[[[0, 2], [1, 3]][k][i]]; if (f > 0.01) tag(ctx, n, px, 104 - i * 62, col, f, 'center', 30); }); });
  ctx.restore(); ctx.restore(); }

// kribbe (houten voerbak) met een paard dat erin bijt: kop van het paard op de rand, korte schok
function kribbe(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const by = y - 230; ctx.fillStyle = '#6B4A30'; ctx.fillRect(x - 10, by, 160, 70); ctx.fillStyle = '#5A3E28'; ctx.fillRect(x - 16, by - 8, 172, 14); ctx.fillStyle = '#4A3424'; ctx.fillRect(x + 10, by + 70, 14, y - by - 70); ctx.fillRect(x + 120, by + 70, 14, y - by - 70);
  const b = Math.max(0, Math.sin(t * 4)); ctx.strokeStyle = rgba(C.goud, 0.8 * b); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x - 6, by - 4, 18 + i * 12, -2.4, -0.8); ctx.stroke(); } ctx.restore(); }
// Wat word jij? · Diergeneeskunde 4 · Welzijn meten — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Dierenarts Mila in staloverall, stagiaire Lotte).
// Rode draad: staartbijten in een varkensstal.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// drie varkens in een hok; bijt = 0..1 (eerste varken bijt in de staart van het tweede)
function varkensGroep(ctx, x, y, s, t, o = {}) { const { bijt = 0, wond = 0, stroA = 0, rustig = 0 } = o;
  varken(ctx, x + 330 * s, y, s, { t, kijk: -1, wroet: rustig }); varken(ctx, x, y, s, { t, wond, staart: 1, hangStaart: wond > 0.5 ? 1 : 0 });
  const dx = (rustig > 0.5 ? -330 : -322) * s + Math.sin(t * 7) * 4 * bijt; varken(ctx, x + dx - 40 * s * (1 - bijt), y + (rustig > 0.5 ? 0 : 12 * s * bijt), s, { t, wroet: rustig }); }

Object.assign(SCENES, {
  title(ctx, t) { varkensHok(ctx, 1000, 760, 800, 360, 1, { stroA: 1 }); varken(ctx, 1240, 760, 1.1, { t, wroet: 1 }); varken(ctx, 1560, 760, 1, { t, kijk: -1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); varkensHok(ctx, 760, 760, 1060, 380, 1);
    varkensGroep(ctx, 1260, 760, 0.95, t, { bijt: q.on('bijt', 1), wond: q.on('bloedt', 1) });
    persoon(ctx, 'mila', 300, 880, 420, { t, outfit: 'stal', uit: q.on('anders', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('anders', 1) > 0.5 ? 'denk' : 'staan' }); naamBij(ctx, 'Dierenarts Mila', '', 300, 400, q.on('Lotte', 1), 'center');
    persoon(ctx, 'lotte', 560, 880, 370, { t, uit: q.on('agressief', 1) > 0.5 ? 'praat' : 'neutraal', pose: q.on('agressief', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Lotte', 'stagiaire', 560, 455, q.on('Lotte', 1), 'center');
    bubbel(ctx, 800, 420, 'gewoon agressief!', '#F2F2EE', q.on('agressief', 1), 30); chip(ctx, 'staart bloedt', 1180, 520, C.koraal, q.on('bloedt', 1), 28);
    vraagteken(ctx, 1240, 300, q.on('vooral', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const O = q.on('Weinig', 1);
    regel(ctx, 'alarmsignaal', 960, 230, q.on('alarmsignaal', 1), C.koraal, 56, 'center', 800);
    varken(ctx, 380, 700, 1.25, { t, wroet: 1 }); stro(ctx, 120, 700, 520, q.on('wroeten', 1)); naamBij(ctx, 'wroeten en kauwen', 'wil een varken de hele dag', 380, 380, q.on('wroeten', 1), 'center');
    varkensHok(ctx, 760, 700, 440, 300, q.on('niets', 1)); varkensGroep(ctx, 1000, 700, 0.6, t, { bijt: q.on('elkaar', 1), wond: q.on('elkaar', 1) });
    kaartje(ctx, 1290, 300, 300, 'weinig ruimte', C.oker, O, 26); kaartje(ctx, 1290, 380, 300, 'slechte lucht', C.oker, q.on('lucht', 1), 26); kaartje(ctx, 1600, 300, 260, 'tocht', C.oker, q.on('tocht', 1), 26); kaartje(ctx, 1600, 380, 260, 'te weinig voer', C.oker, q.on('voer', 1), 26);
    chip(ctx, 'het bijtende varken: niet de oorzaak, wel het eerste dat je ziet', 960, 830, C.goud, q.on('oorzaak', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Tegenwoordig', 1, 0.8);
    regel(ctx, 'wat is welzijn?', 960, 220, q.on('welzijn', 1) * (1 - D), C.goud, 52, 'center', 800);
    const v = [q.on('honger', 1), q.on('ongemak', 1), q.on('pijn', 1), q.on('angst', 1), q.on('natuurlijk', 1)].reduce((s2, x) => s2 + x, 0);
    vijfVakjes(ctx, 160, 300, 1600, ['vrij van\nhonger en dorst', 'vrij van\nongemak', 'vrij van\npijn en ziekte', 'vrij van\nangst en stress', 'vrij om\nnatuurlijk gedrag'], v, 1 - D, C.teal); regel(ctx, 'de vijf vrijheden', 960, 520, q.on('vrijheden', 1) * (1 - D), C.teal, 40, 'center', 800);
    chip(ctx, 'vooral: wat een dier níet moet hebben', 960, 610, C.text2, q.on('lijst', 1) * (1 - D), 28);
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; varken(ctx, 400, 860, 0.7, { t, wroet: q.on('spelen', 1) }); chip(ctx, 'spelen · verkennen · rusten', 400, 640, C.groen, q.on('spelen', 1), 26);
      vijfDomeinen(ctx, 1150, 300, 1, clamp((t - q.at('Voeding', 1)) / 3, 0, 1) * q.on('Voeding', 1), t); ctx.restore(); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('stereotiep', 1);
    regel(ctx, 'meet wat het dier doet', 960, 220, Math.max(0.5, q.on('meet', 1)), C.goud, 48, 'center', 800); regel(ctx, 'stereotiep gedrag', 960, 300, S, C.text, 40, 'center', 800); regel(ctx, 'steeds hetzelfde, zonder doel', 960, 350, S, C.text2, 28, 'center', 600);
    paard(ctx, 330, 800, 0.85, { t, a: q.on('paard', 1) }); kribbe(ctx, 330 + 300 * 0.85, 800, q.on('paard', 1), t); naamBij(ctx, 'kribbebijten', 'paard', 400, 420, q.on('paard', 1), 'center');
    kalfTong(ctx, 900, 790, 0.5, q.on('kalf', 1), t); naamBij(ctx, 'tongrollen', 'kalf', 980, 460, q.on('kalf', 1), 'center');
    const p = (Math.sin(t * 0.9) + 1) / 2; ijsbeer(ctx, 1380 + p * 300, 790, 1.1, q.on('ijsbeer', 1), Math.cos(t * 0.9) > 0 ? 1 : -1); naamBij(ctx, 'heen en weer lopen', 'ijsbeer', 1540, 460, q.on('ijsbeer', 1), 'center');
    chip(ctx, 'vaak: lang niet kunnen doen waar het dier door gemotiveerd is', 960, 860, C.koraal, q.on('gemotiveerd', 1), 26); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('cortisol', 1);
    tag(ctx, 'film: Stress · cortisol', 960, 220, C.teal, Math.max(0.5, q.on('lichaam', 1)), 'center', 30);
    bronIcoon(ctx, 'speeksel', 420, 430, 1.4, q.on('speeksel', 1)); naamBij(ctx, 'speeksel', '', 420, 540, q.on('speeksel', 1), 'center');
    bronIcoon(ctx, 'mest', 960, 440, 1.4, q.on('mest', 1)); naamBij(ctx, 'mest', '', 960, 540, q.on('mest', 1), 'center');
    bronIcoon(ctx, 'haar', 1500, 430, 1.4, q.on('haar', 1)); naamBij(ctx, 'haar', 'maandenlang', 1500, 540, q.on('haar', 1), 'center');
    const P = q.on('pas', 1); if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; pijl(ctx, 700, 820, 700, 660, C.koraal, 1, 6, 20); regel(ctx, 'stress', 700, 860, 1, C.koraal, 32, 'center', 800); pijl(ctx, 1220, 820, 1220, 660, C.oker, q.on('paren', 1), 6, 20); regel(ctx, 'opwinding, paren', 1220, 860, q.on('paren', 1), C.oker, 32, 'center', 800); regel(ctx, 'cortisol ↑', 960, 640, 1, C.text, 36, 'center', 800); ctx.restore(); }
    chip(ctx, 'combineer meerdere signalen', 960, 300, C.goud, q.on('combineert', 1), 30); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); melkStal(ctx, 160, 700, 620, 280, 'A', q.on('A', 1)); melkStal(ctx, 1140, 700, 620, 280, 'B', q.on('B', 1));
    koe(ctx, 470, 700, 0.55, { t, a: q.on('A', 1) }); koe(ctx, 1450, 700, 0.55, { t, a: q.on('B', 1), kijk: -1 });
    persoon(ctx, 'mila', 960, 880, 400, { t, outfit: 'stal', pose: 'denk', uit: 'denkt', a: q.on('vergelijkt', 1, 0.3) }); vraagteken(ctx, 960, 330, q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const G = q.on('gang', 1), H = q.on('hakken', 1), V = q.on('vet', 1), A = q.on('langzaam', 1, 0.6);
    regel(ctx, 'kijk naar het dier zelf', 960, 220, Math.max(0.5, q.on('zelf', 1)), C.goud, 48, 'center', 800); const S0 = 1 - q.on('gang', 1); if (S0 > 0.01) { melkStal(ctx, 160, 700, 620, 260, 'A', S0); melkStal(ctx, 1140, 700, 620, 260, 'B', S0); kruis(ctx, 960, 520, 40, S0 * q.on('mooie', 1)); }
    if (A < 0.5) { ctx.save(); ctx.globalAlpha *= (1 - 2 * A) * (1 - S0);
      const lx = 200 + clamp((t - q.at('gang', 1)) / 4, 0, 1) * 500; koe(ctx, lx, 760, 0.6, { t, a: G }); scoreKaart(ctx, 400, 400, 'KREUPELHEID', q.on('kreupel', 1) > 0.5 ? '2 / 5' : '…', C.teal, G);
      scoreKaart(ctx, 960, 400, 'HAKKEN', H > 0.5 ? '1 plek' : '…', C.oker, H); scoreKaart(ctx, 1520, 400, 'CONDITIE', V > 0.5 ? 'goed' : '…', C.groen, V);
      koe(ctx, 1400, 760, 0.6, { t, a: V, kijk: -1 }); ctx.restore(); }
    if (A > 0.5) { ctx.save(); ctx.globalAlpha *= 2 * A - 1; const nad = clamp((t - q.at('langzaam', 1)) / 4, 0, 1); const mx = 520 + nad * 320;
      koe(ctx, 1420, 780, 0.75, { t, kijk: -1 }); persoon(ctx, 'mila', mx, 880, 400, { t, outfit: 'stal', pose: 'wijs', uit: 'neutraal' }); afstandLat(ctx, mx + 120, 1250, 520, 'vluchtafstand', q.on('afstand', 1));
      chip(ctx, 'zegt iets over hoe mensen met de dieren omgaan', 960, 360, C.goud, q.on('omgaan', 1), 28); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'vaste protocollen', 960, 230, C.teal, Math.max(0.5, q.on('protocollen', 1)), 'center', 34);
    melkStal(ctx, 160, 700, 620, 260, 'A', 1); melkStal(ctx, 1140, 700, 620, 260, 'B', 1); persoon(ctx, 'gerrit', 1820, 880, 360, { t, kijk: -1, uit: 'blij', a: q.on('kent', 1) });
    scoreKaart(ctx, 470, 570, 'KREUPEL', 'meer', C.koraal, q.on('vergelijken', 1)); scoreKaart(ctx, 1450, 570, 'KREUPEL', q.on('Soms', 1) > 0.5 ? 'minder' : '…', C.groen, q.on('vergelijken', 1));
    chip(ctx, 'de veehouder kent elke koe', 1450, 830, C.groen, q.on('kent', 1), 28); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('stro', 1);
    persoon(ctx, 'lotte', 260, 880, 360, { t, uit: 'neutraal' }); persoon(ctx, 'mila', 520, 880, 420, { t, outfit: 'stal', pose: 'wijs', uit: 'blij' }); planTafel(ctx, 900, 720, Math.max(0.5, q.on('verslag', 1)), q.on('gezondheidsplan', 1) * 3); persoon(ctx, 'gerrit', 1220, 880, 420, { t, kijk: -1, uit: 'blij', a: q.on('veehouder', 1, 0.4) }); naamBij(ctx, 'Gerrit', 'veehouder', 1220, 420, q.on('veehouder', 1), 'center');
    kaartje(ctx, 1400, 250, 440, 'kauwmateriaal', C.groen, M, 26); kaartje(ctx, 1400, 340, 440, 'ruimte', C.groen, q.on('ruimte', 1), 26); kaartje(ctx, 1400, 430, 440, 'ventilatie', C.groen, q.on('ventilatie', 1), 26); kaartje(ctx, 1400, 520, 440, 'rustige groepen', C.groen, q.on('rustigere', 1), 26);
    chip(ctx, 'volgende bezoek: werkt het?', 1620, 680, C.goud, q.on('volgende', 1), 28); naamBij(ctx, 'vast bedrijfsbezoek', '', 120, 220, q.on('bedrijfsbezoek', 1), 'left'); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('dierenarts', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - B;
    const kn = q.on('verwijderd', 1); varken(ctx, 600, 720, 0.85, { t, staart: kn > 0.5 ? 0.4 : 1 }); naamBij(ctx, 'big', 'kort na de geboorte', 640, 520, q.on('biggen', 1), 'center'); heteTang(ctx, 470 - 100 * (1 - kn), 660 + 60 * (1 - kn), 1.2, Math.max(q.on('tang', 1), kn), 1, t); naamBij(ctx, 'couperen', 'hete tang', 360, 440, q.on('couperen', 1), 'center');
    chip(ctx, 'minder bijten', 1300, 300, C.groen, q.on('vermindert', 1), 28); chip(ctx, 'maar: pijn', 1300, 370, C.koraal, q.on('pijn', 1), 28); chip(ctx, 'EU: niet als vaste gewoonte', 1300, 470, C.teal, q.on('Europese', 1), 28); chip(ctx, 'in Nederland: bijna alle biggen', 1300, 560, C.oker, q.on('Nederland', 1), 28);
    regel(ctx, 'signaal weg, probleem niet', 1300, 700, q.on('signaal', 1), C.goud, 40, 'center', 800); ctx.restore();
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'mila', 260, 880, 400, { t, outfit: 'stal', uit: 'denkt', pose: 'denk' }); belangen(ctx, 1100, 760, 1, [q.on('dier', 2), q.on('veehouder', 1), q.on('regels', 1), q.on('samenleving', 1)], t); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); varkensHok(ctx, 900, 760, 900, 360, 1, { stroA: 1, touw: 1 }); varkensGroep(ctx, 1300, 760, 0.85, t, { rustig: 1 });
    persoon(ctx, 'lotte', 360, 880, 380, { t, uit: 'blij' }); persoon(ctx, 'mila', 620, 880, 420, { t, outfit: 'stal', uit: 'blij', kijk: -1 });
    regel(ctx, 'geen probleem, maar een boodschap', 960, 220, q.on('boodschap', 1), C.goud, 44, 'center', 800); chip(ctx, 'meerdere signalen tegelijk', 1350, 300, C.teal, q.on('signalen', 1), 28); },
  s15(ctx, t, q) { bg(ctx, 'schema'); kaartje(ctx, 160, 260, 480, 'praktijk', C.teal, q.on('praktijk', 1), 34); kaartje(ctx, 720, 260, 480, 'overheid', C.oker, q.on('overheid', 1), 34); kaartje(ctx, 1280, 260, 480, 'hbo · dierhouderij', C.groen, q.on('hbo', 1), 34);
    regel(ctx, 'dierenarts', 400, 400, q.on('praktijk', 1), C.text2, 28, 'center', 600); regel(ctx, 'controle bij transport en slacht', 960, 400, q.on('geslacht', 1), C.text2, 28, 'center', 600); regel(ctx, 'bedrijf · adviseur · onderzoek', 1520, 400, q.on('adviseur', 1), C.text2, 28, 'center', 600);
    persoon(ctx, 'lotte', 760, 880, 320, { t, uit: 'blij' }); persoon(ctx, 'mila', 980, 880, 360, { t, uit: 'blij' }); persoon(ctx, 'gerrit', 1200, 880, 360, { t, uit: 'blij', kijk: -1, a: q.on('bedrijf', 1, 0.4) }); }
});
