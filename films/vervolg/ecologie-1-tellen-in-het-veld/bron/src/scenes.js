
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
// ===== Wat word jij? · Ecologie en natuurbeheer — gedeelde reeksobjecten (aangemaakt 25 okt 2026 door de bouwhelper van film 3) =====
// Plak na lib_bio.js en vóór het eigen teken-bestand. Andere films van de reeks breiden dit bestand uit: bestaande functies niet veranderen.
// Kleuren volgens de reeksbrief: groen = plant, heide, gras, gewas · oker = bodem, mest · teal = water · koraal = let op · paars ALLEEN DNA · goud = focus.
// Heide krijgt daarom geen C.paars maar een gedempte heidetint (KL_HEIDE*), los van de betekeniskleuren.
const KL_HEIDE = '#5E4E62', KL_HEIDE_L = '#7E6A80', KL_HEIDEBLOEM = '#B48AAE', KL_HEIDEBLOEM_D = '#946C90';
const KL_BOS = '#2F5A40', KL_BOS_L = '#3E6E4A', KL_AKKER = '#7A6A40', KL_AKKER_L = '#9A8A56', KL_ZAND = '#D8C49A', KL_ZAND_D = '#BFA878';
const KL_BOUWVOOR = '#3A2E26', KL_BOUWVOOR_L = '#4E3E32', KL_WEG = '#4A5264', KL_LAND = '#26385A';

// vloeiende gesloten (of open) vorm door punten: kwadratische bogen door de middens
function ecPad(ctx, P, dicht = true) { const n = P.length; ctx.beginPath(); if (n < 3) { ctx.moveTo(P[0][0], P[0][1]); if (n > 1) ctx.lineTo(P[1][0], P[1][1]); return; }
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]); for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function ecRng(seed) { let a = (seed * 9301 + 49297) >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }
function ecA(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- STRUIKHEI (Calluna vulgaris) ----------
// Recept: dwergstruik 20–50 cm, sterk vertakt vanaf een houtige voet; stengels bruin, schuin omhoog; blaadjes schubvormig, heel klein, in vier rijen
// (op deze schaal: korte groene streepjes langs de twijgen); bloemen klein, roze-lila, in lange eenzijdige trossen aan het bovenste deel van de twijgen.
// Bekende fouten: een paarse bol zonder takken; bloemen los naast de plant. Bron: Heukels' Flora (beschrijving Calluna), Natura 2000-profiel H4030.
// x, y = voet op de grond; h = hoogte in px; o.bloei 0..1; o.seed variant; o.jong = kleiner, minder vertakt (jonge heide).
function struikhei(ctx, x, y, h, o = {}) { const { a = 1, bloei = 1, seed = 1, jong = 0 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const R = ecRng(seed * 31 + 7), nS = jong ? 3 : 5, tips = [];
  for (let i = 0; i < nS; i++) { const an = -Math.PI / 2 + (i - (nS - 1) / 2) * (0.32 + R() * 0.12), L = h * (0.75 + R() * 0.3);
    const bx = x + (i - (nS - 1) / 2) * h * 0.04, ex = bx + Math.cos(an) * L, ey = y + Math.sin(an) * L, mx = bx + Math.cos(an) * L * 0.45 + (R() - 0.5) * h * 0.08, my = y + Math.sin(an) * L * 0.45;
    ctx.strokeStyle = '#6A4E3C'; ctx.lineWidth = Math.max(1.2, h * 0.035); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    // zijtwijgjes
    for (let k = 0; k < (jong ? 1 : 2); k++) { const u = 0.45 + k * 0.2, px = lerp(bx, ex, u), py = lerp(y, ey, u), sa = an + (k % 2 ? 0.55 : -0.55), sl = L * 0.35;
      const qx = px + Math.cos(sa) * sl, qy = py + Math.sin(sa) * sl; ctx.lineWidth = Math.max(1, h * 0.022); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke(); tips.push([px, py, qx, qy]); }
    tips.push([mx, my, ex, ey]); }
  // blaadjes: korte groene streepjes langs de twijgen
  ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(1, h * 0.02);
  tips.forEach(([x0, y0, x1, y1]) => { for (let k = 1; k < 6; k++) { const u = k / 6, px = lerp(x0, x1, u), py = lerp(y0, y1, u), d = (k % 2 ? 1 : -1) * h * 0.035; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + d, py - h * 0.03); ctx.stroke(); } });
  // bloemtrossen aan het bovenste deel van de twijgen (eenzijdig)
  if (bloei > 0.01) { ctx.globalAlpha *= bloei; tips.forEach(([x0, y0, x1, y1], j) => { for (let k = 0; k < 6; k++) { const u = 0.45 + k * 0.1, px = lerp(x0, x1, u), py = lerp(y0, y1, u);
    circ(ctx, px + h * 0.03, py, Math.max(1.2, h * 0.032), (k + j) % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D); } }); }
  ctx.restore(); }

// ---------- GRASPOL ----------
// Pol van een snel gras (bv. pijpenstrootje, gestreepte witbol): smalle bladeren vanuit één voet, de buitenste buigen over. o.rijk = hoger en voller (rijke grond).
function grasPol(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, kl = '#8FB860', n = 9 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const R = ecRng(seed * 17 + 3);
  for (let i = 0; i < n; i++) { const u = (i / (n - 1)) * 2 - 1, L = h * (0.7 + R() * 0.35), bx = x + u * h * 0.08, ex = x + u * h * (0.55 + R() * 0.2), ey = y - L * (1 - Math.abs(u) * 0.35);
    ctx.strokeStyle = i % 3 ? kl : _ecMix(kl, '#2A3A28', 0.25); ctx.lineWidth = Math.max(1.2, h * 0.035); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(x + u * h * 0.12, y - L * 0.8, ex, ey); ctx.stroke(); }
  ctx.restore(); }
function _ecMix(a, b, k) { const p = s => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)]; const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); }

// rij heide langs een grondlijn (landschap, Schema-look): struikheiplanten in varianten, geschaald 80–120 %, niet gelijk verdeeld
function heideRij(ctx, x0, x1, y, h, o = {}) { const { a = 1, seed = 3, bloei = 1, jong = 0 } = o; if (a <= 0.01) return; const R = ecRng(seed); let x = x0 + R() * h * 0.4;
  while (x < x1) { struikhei(ctx, x, y, h * (0.8 + R() * 0.4), { a, bloei, seed: Math.floor(R() * 99), jong }); x += h * (0.45 + R() * 0.45); } }

// ---------- TAPUIT (Oenanthe oenanthe), man in broedkleed ----------
// Recept (Natura 2000-profiel A277; Sovon/Vogelbescherming 2014; veldgidsmaten): 14,5–16 cm, slank, rechtop op een paaltje of steen; lange zwarte poten
// (loopbeen ± 27 mm), dunne zwarte snavel ± 13 mm. Kruin en rug blauwgrijs, zwart masker van snavel door het oog, witte wenkbrauwstreep,
// keel en borst warm bleekoranje, buik wit, vleugels zwart; stuit wit; staart wit met een zwarte eindband (omgekeerde T).
// Eenheid 1 = 1 mm; x, y = grondpunt (bovenkant paaltje); s = px per mm. Bekende fouten: korte poten (lijkt op roodborst), dikke vinkensnavel, staart te lang.
function tapuit(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, wip = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const grijs = '#9AA6B4', grijsD = '#7E8A98', zwart = '#202024', zwartL = '#3A3A42', oranje = '#E6C49C', wit = '#F2EFE8', rand = '#5A6270';
  const bob = wip * Math.sin(t * 9) * 3; // staartwippen (typisch gedrag), klein
  // poten: zwart, lang; tenen plat op de grond
  ctx.strokeStyle = zwart; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-4, -44); ctx.lineTo(-7, -2); ctx.moveTo(4, -44); ctx.lineTo(5, -2); ctx.stroke();
  ctx.lineWidth = 1.8; for (const fx of [-7, 5]) { ctx.beginPath(); ctx.moveTo(fx - 7, 0); ctx.lineTo(fx + 9, 0); ctx.moveTo(fx, -1); ctx.lineTo(fx + 7, -1); ctx.stroke(); }
  // staart: korte waaier schuin omlaag, wit met zwarte eindband
  ctx.save(); ctx.translate(-36, -54); ctx.rotate(0.62 + bob * 0.02); ecPad(ctx, [[0, -7], [46, -9], [52, 0], [46, 9], [0, 7]]); ctx.fillStyle = wit; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.save(); ctx.clip(); ctx.fillStyle = zwart; ctx.fillRect(30, -12, 30, 24); ctx.fillRect(10, -2, 40, 4); ctx.restore(); ctx.restore();
  // lijf: rechtop (± 35°), borst vol
  const L = [[30, -78], [32, -62], [24, -48], [8, -40], [-12, -40], [-30, -48], [-40, -60], [-34, -74], [-18, -88], [2, -96], [20, -94]];
  ecPad(ctx, L); ctx.fillStyle = grijs; ctx.fill(); ctx.save(); ctx.clip();
  ctx.fillStyle = wit; ecPad(ctx, [[40, -70], [20, -50], [-10, -36], [-50, -40], [-50, -20], [40, -20]]); ctx.fill(); // buik
  ctx.fillStyle = oranje; ecPad(ctx, [[40, -100], [36, -66], [18, -56], [0, -64], [10, -90]]); ctx.fill(); // borst
  ctx.fillStyle = wit; ctx.beginPath(); ctx.ellipse(-38, -58, 9, 10, 0, 0, 6.283); ctx.fill(); // witte stuit
  ctx.restore(); ecPad(ctx, L); ctx.strokeStyle = rand; ctx.lineWidth = 1.4; ctx.stroke();
  // vleugel: zwart, gevouwen langs de flank, punt tot over de stuit
  const V = [[16, -86], [8, -70], [-10, -58], [-38, -52], [-30, -64], [-12, -78], [4, -88]]; ecPad(ctx, V); ctx.fillStyle = zwart; ctx.fill(); ctx.strokeStyle = zwartL; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.strokeStyle = rgba('#8A8A92', 0.6); ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-4 - i * 7, -70 + i * 3); ctx.lineTo(-20 - i * 6, -58 + i * 1.5); ctx.stroke(); }
  // kop
  ctx.save(); ctx.translate(26, -102);
  const K = [[-14, 8], [-12, -6], [-2, -14], [10, -13], [17, -6], [18, 4], [12, 12], [-2, 14]]; ecPad(ctx, K); ctx.fillStyle = grijs; ctx.fill(); ctx.save(); ctx.clip();
  ctx.fillStyle = oranje; ctx.fillRect(-20, 6, 50, 20); // keel
  ctx.fillStyle = wit; ecPad(ctx, [[-10, -6], [4, -9], [20, -6], [20, -3], [4, -5], [-10, -2]]); ctx.fill(); // wenkbrauwstreep
  ctx.fillStyle = zwart; ecPad(ctx, [[20, -3], [20, 4], [6, 6], [-8, 6], [-10, 0], [2, -3]]); ctx.fill(); // masker
  ctx.restore(); ecPad(ctx, K); ctx.strokeStyle = rand; ctx.lineWidth = 1.3; ctx.stroke();
  // snavel: dun, recht, zwart
  ctx.fillStyle = zwart; ctx.beginPath(); ctx.moveTo(16, -2.5); ctx.lineTo(30, 0.2); ctx.lineTo(16, 2.6); ctx.closePath(); ctx.fill();
  // oog in het masker: donker met een lichte rand
  circ(ctx, 8, 0, 2.6, '#0C0C0E', '#5A5A62', 0.8); circ(ctx, 8.8, -0.8, 0.7, '#C8CCD4');
  ctx.restore();
  ctx.restore(); }
// paaltje met kaal zand en een konijnenhol (leefgebied van de tapuit); x, y = grond; s schaal (1 = paal 90 px)
function tapuitPaal(ctx, x, y, s = 1, o = {}) { const { a = 1, hol = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = KL_ZAND; ecPad(ctx, [[x - 170 * s, y + 4], [x - 120 * s, y - 14 * s], [x + 60 * s, y - 12 * s], [x + 190 * s, y + 4], [x + 120 * s, y + 18 * s], [x - 120 * s, y + 18 * s]]); ctx.fill();
  if (hol > 0.01) { ctx.save(); ctx.globalAlpha *= hol; ctx.fillStyle = '#2A2018'; ctx.beginPath(); ctx.ellipse(x + 110 * s, y - 2 * s, 20 * s, 11 * s, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = KL_ZAND_D; ctx.beginPath(); ctx.ellipse(x + 150 * s, y + 2 * s, 22 * s, 6 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  roundRect(ctx, x - 9 * s, y - 92 * s, 18 * s, 96 * s, 3 * s); shape(ctx, '#7A5E44', '#5A4430', 1.5); ctx.strokeStyle = '#5A4430'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - 5 * s, y - 92 * s + i * 22 * s); ctx.lineTo(x + 3 * s, y - 86 * s + i * 22 * s); ctx.stroke(); }
  ctx.restore(); return [x, y - 92 * s]; }

// ---------- LOOPKEVER (Carabidae), bovenaanzicht ----------
// Recept: kop met kaken en draadvormige sprieten (11 leden, hier als dunne lijn met knikjes), halsschild (pronotum), dekschilden met lengtegroeven;
// drie poten per kant, alle zes aan het borststuk (tussen halsschild en dekschilden); lengte 1–3 cm. o.zeldzaam = metaalglans (goudgroen, bv. Carabus nitens).
// x, y = midden; s = px per mm (lengte ± 20 mm); o.rot = richting (0 = naar rechts); o.t voor de stap (poten in driepootgang).
function loopkever(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0, t = 0, zeldzaam = false, kl = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  const k = kl || (zeldzaam ? '#5E8A4A' : '#3A3A40'), kL = zeldzaam ? '#C8B04A' : '#6A6A74', poot = zeldzaam ? '#2E3A26' : '#26262A';
  const ph = Math.sin(t * 12); ctx.strokeStyle = poot; ctx.lineWidth = 0.9;
  // poten (driepootgang: L1, R2, L3 tegelijk)
  [[2.5, 1], [0, -1], [-2.5, 1]].forEach(([px, f], i) => { for (const sd of [-1, 1]) { const sw = ph * f * sd * 1.6; ctx.beginPath(); ctx.moveTo(px, sd * 1.6); ctx.lineTo(px + 1.2 + sw * 0.5 - i * 1.4, sd * 4.6); ctx.lineTo(px + 2.4 + sw - i * 3, sd * 7.2); ctx.stroke(); } });
  // sprieten
  ctx.lineWidth = 0.6; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(9, sd * 1.2); ctx.quadraticCurveTo(12, sd * 3.4, 15.5, sd * 5.4); ctx.stroke(); }
  // dekschilden
  ecPad(ctx, [[1, -3.6], [-4, -4.6], [-9, -3.8], [-11.5, 0], [-9, 3.8], [-4, 4.6], [1, 3.6]]); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = kL; ctx.lineWidth = 0.6; ctx.stroke();
  ctx.strokeStyle = rgba('#000000', 0.35); ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(1, 0); ctx.lineTo(-11, 0); for (const v of [-2.4, 2.4]) { ctx.moveTo(0, v * 0.8); ctx.quadraticCurveTo(-5, v * 1.15, -10, v * 0.6); } ctx.stroke();
  // halsschild en kop met kaken
  ecPad(ctx, [[5.4, -2.6], [1.2, -3.2], [0.8, 0], [1.2, 3.2], [5.4, 2.6], [6, 0]]); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = kL; ctx.lineWidth = 0.6; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(7.8, 0, 2.3, 1.9, 0, 0, 6.283); ctx.fillStyle = k; ctx.fill(); ctx.stroke();
  ctx.strokeStyle = poot; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(9.6, -0.8); ctx.quadraticCurveTo(11, -0.6, 11.2, 0.2); ctx.moveTo(9.6, 0.8); ctx.quadraticCurveTo(11, 0.6, 11.2, -0.2); ctx.stroke();
  ctx.restore(); }

// ---------- NEDERLAND (omtrek, schematisch maar herkenbaar) ----------
// Omtrek uit lengte/breedtegraden (± 0,05°), projectie x = (lon − 3,3) · 0,616, y = (53,6 − lat); IJsselmeer en Waddenzee als water.
const NL_LONLAT = [[3.37, 51.37], [3.52, 51.44], [3.44, 51.54], [3.62, 51.62], [3.72, 51.72], [3.86, 51.82], [4.12, 51.98], [4.27, 52.12], [4.43, 52.28], [4.57, 52.46], [4.63, 52.7], [4.71, 52.9], [4.76, 52.96],
  [5.05, 52.93], [5.4, 53.08], [5.42, 53.2], [5.6, 53.32], [5.95, 53.4], [6.25, 53.41], [6.6, 53.44], [6.88, 53.45], [6.95, 53.33], [7.2, 53.24], [7.21, 53.0], [7.07, 52.65], [6.72, 52.62], [6.7, 52.48],
  [7.06, 52.42], [7.0, 52.23], [6.76, 52.1], [6.7, 51.92], [6.4, 51.83], [6.16, 51.88], [5.96, 51.8], [6.1, 51.66], [6.22, 51.5], [6.08, 51.23], [5.88, 51.05], [6.08, 50.84], [5.98, 50.76], [5.7, 50.76],
  [5.65, 50.84], [5.78, 51.08], [5.84, 51.16], [5.56, 51.27], [5.12, 51.43], [4.83, 51.42], [4.67, 51.44], [4.53, 51.48], [4.4, 51.37], [4.24, 51.37], [3.98, 51.22], [3.68, 51.27], [3.37, 51.3]];
const NL_IJSSEL = [[5.08, 52.64], [5.3, 52.6], [5.65, 52.6], [5.85, 52.62], [5.6, 52.82], [5.4, 52.95], [5.28, 53.0], [5.07, 52.92], [5.02, 52.72]];
function nlIn(pts, lo, la) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > la) !== (yj > la) && lo < (xj - xi) * (la - yi) / (yj - yi) + xi) c = !c; } return c; }
nlIn.land = (lo, la) => nlIn(NL_LONLAT, lo, la) && !nlIn(NL_IJSSEL, lo, la); // punt-in-veelhoek in lon/lat: onafhankelijk van de canvasschaal (isPointInPath faalde in de speler)
function nlXY(lon, lat) { return [(lon - 3.3) * 0.616, 53.6 - lat]; }
// x, y = linksboven; s = px per eenheid (1 eenheid ≈ 1 breedtegraad ≈ 111 km). Geeft {pad, xy} terug. o.vul, o.rand, o.stippen (aantal), o.stipA, o.pin [lon,lat], o.pinA
function nederland(ctx, x, y, s, o = {}) { const { a = 1, vul = rgba(C.groen, 0.14), rand = rgba(C.groen, 0.6), stippen = 0, stipA = 1, pin = null, pinA = 1, stipKl = C.goud } = o; const xy = (lon, lat) => { const [u, v] = nlXY(lon, lat); return [x + u * s, y + v * s]; };
  if (a <= 0.01) return { xy }; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); };
  pad(); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.beginPath(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  if (stippen > 0 && stipA > 0.01) { const R = ecRng(160); let n = 0, tries = 0; ctx.save(); ctx.globalAlpha *= stipA; pad();
    const ij = new Path2D(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
    while (n < stippen && tries < 6000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = xy(lo, la); if (nlIn.land(lo, la)) { (nederland._p = nederland._p || []).push([px, py]); n++; } } for (const [px, py] of (nederland._p || [])) circ(ctx, px, py, Math.max(2.2, s * 0.022), stipKl); nederland._p = []; // fix 25 okt: eerst alle punten zoeken, dan tekenen (circ begint een nieuw pad)
    ctx.restore(); }
  if (pin && pinA > 0.01) { const [px, py] = xy(pin[0], pin[1]); ctx.save(); ctx.globalAlpha *= pinA; circ(ctx, px, py, 11, C.goud, '#121A26', 2.5); ctx.restore(); }
  ctx.restore(); return { xy }; }

// ---------- KAART VAN HET REEKSGEBIED (fictief, Veluwe-achtig) ----------
// Vaste onderdelen (reeksbrief): heide met een ven in het midden, bos eromheen, snelweg rechts (noord-zuid) met een ecoduct,
// en rechtsonder een landbouwenclave met de maisakker die natuur wordt en een stal. Schema-look, geen echte topografie.
// x, y, w, h = kader. o: a, labels (0..1), natura (gouden rand + label rond de heide), akkerHl (gouden rand akker), akkerHeide (0..1 akker wordt heide),
// randHl (strook van de akker die aan de heide grenst), ecoductHl, venHl, t. Geeft de punten terug (P.heide, P.ven, P.akker, P.stal, P.ecoduct, P.bos, P.weg, P.rand).
function gebiedKaart(ctx, x, y, w, h, o = {}) { const { a = 1, labels = 0, natura = 0, akkerHl = 0, akkerHeide = 0, randHl = 0, ecoductHl = 0, venHl = 0, t = 0 } = o;
  // Schema-stijl (Kamiel 25 okt 2026, keuring film 3: 'kleuren lijken niet op onze stijl'): navy blijft zichtbaar, vlakken als doorschijnende tinten
  // van het C-palet met dunne lichtere randen, structuur met lijnen en stippels (naar waalKaart en nederland()). Groen = heide (fijne stippels) en bos
  // (donkerder tint, kruinen in lijn), teal = ven, oker = akker en stal, grijs = snelweg, groen = ecoduct. Geen paars of mauve.
  const X = u => x + u * w, Y = v => y + v * h, Q = (u, v) => [X(u), Y(v)], k = Math.max(0.6, Math.min(1.4, w / 700)), fN = Math.max(0.12, Math.min(1.6, w * h / (700 * 480)));
  const P = { heide: Q(0.4, 0.46), ven: Q(0.34, 0.4), akker: Q(0.69, 0.78), stal: Q(0.77, 0.9), ecoduct: Q(0.87, 0.36), bos: Q(0.12, 0.14), weg: Q(0.87, 0.75), rand: Q(0.62, 0.72) };
  if (a <= 0.01) return P; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x, y, w, h, 18); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  const vlak = (pts, fill, stroke, lw) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } };
  const HP = [Q(0.12, 0.38), Q(0.2, 0.2), Q(0.42, 0.16), Q(0.62, 0.22), Q(0.72, 0.4), Q(0.64, 0.62), Q(0.46, 0.74), Q(0.26, 0.7), Q(0.12, 0.56)];
  const AK = [Q(0.56, 0.64), Q(0.82, 0.6), Q(0.83, 1.02), Q(0.53, 1.02)];
  const MA = [Q(0.58, 0.67), Q(0.8, 0.65), Q(0.8, 0.86), Q(0.6, 0.88)];
  const wx = X(0.87), ww = w * 0.045;
  // bos: donkerder groene tint over het hele kader, kruinen als lijnrondjes (niet in heide, enclave of weg)
  ctx.fillStyle = rgba('#2F6A46', 0.3); ctx.fillRect(x, y, w, h);
  const inPoly = (pts, px, py) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; } return c; };
  const R = ecRng(41); ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 1.3 * k;
  for (let i = 0, nB = Math.round(150 * Math.sqrt(fN)); i < nB; i++) { const u = R(), v = R(), r = (0.016 + R() * 0.008) * w, px = X(u), py = Y(v); if (inPoly(HP, px, py) || inPoly(AK, px, py) || Math.abs(px - wx) < ww * 0.5 + r) continue;
    ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = rgba('#2F6A46', 0.35); ctx.fill(); ctx.stroke(); if (i % 3 === 0) { ctx.beginPath(); ctx.arc(px - r * 0.25, py - r * 0.2, r * 0.45, 3.4, 5.6); ctx.stroke(); } }
  // heide: lichte groene tint, dunne rand, fijne stippels (dopheide/struikhei als structuur, geen vlakke kleur)
  ecPad(ctx, HP); ctx.fillStyle = C.bgSchema; ctx.fill(); ecPad(ctx, HP); ctx.fillStyle = rgba(C.groen, 0.13); ctx.fill(); ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 1.6 * k; ctx.stroke();
  const stipVeld = (clipFn, u0, u1, v0, v1, n, seed) => { ctx.save(); clipFn(); ctx.clip(); const Rs = ecRng(seed); for (let i = 0; i < n; i++) { const px = X(u0 + Rs() * (u1 - u0)), py = Y(v0 + Rs() * (v1 - v0)); ctx.fillStyle = rgba(C.groen, i % 4 ? 0.6 : 0.95); ctx.beginPath(); ctx.arc(px, py, (1.2 + Rs() * 1.1) * k, 0, 6.283); ctx.fill(); } ctx.restore(); };
  stipVeld(() => ecPad(ctx, HP), 0.1, 0.74, 0.14, 0.76, Math.round(1100 * fN), 7);
  // ven: teal tint met lichtere rand en twee rimpellijnen
  ctx.beginPath(); ctx.ellipse(P.ven[0], P.ven[1], w * 0.07, h * 0.06, -0.3, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(C.teal, 0.24); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = 1.6 * k; ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.5); ctx.lineWidth = 1.2 * k; for (const d of [-0.2, 0.25]) { ctx.beginPath(); ctx.ellipse(P.ven[0] + d * w * 0.05, P.ven[1] + d * h * 0.06, w * 0.03, h * 0.012, -0.3, 0.3, 2.8); ctx.stroke(); }
  if (venHl > 0.01) ecA(ctx, venHl, () => { ctx.beginPath(); ctx.ellipse(P.ven[0], P.ven[1], w * 0.08, h * 0.072, -0.3, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  // landbouwenclave: zwakke okertint met dunne rand
  vlak(AK, C.bgSchema, null); vlak(AK, rgba(C.oker, 0.06), rgba(C.oker, 0.35), 1.2 * k);
  // de maisakker: okertint met ploegvoren als lijnen
  const maPad = () => { ctx.beginPath(); MA.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); };
  maPad(); ctx.fillStyle = rgba(C.oker, 0.16); ctx.fill(); ctx.save(); maPad(); ctx.clip(); ctx.strokeStyle = rgba(C.oker, 0.55); ctx.lineWidth = 1.3 * k;
  for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(X(0.56 + i * 0.016), Y(0.64)); ctx.lineTo(X(0.58 + i * 0.016), Y(0.9)); ctx.stroke(); }
  if (akkerHeide > 0.01) ecA(ctx, akkerHeide, () => { maPad(); ctx.fillStyle = C.bgSchema; ctx.fill(); maPad(); ctx.fillStyle = rgba(C.groen, 0.13); ctx.fill(); stipVeld(maPad, 0.58, 0.8, 0.65, 0.88, Math.round(280 * fN), 9); });
  if (randHl > 0.01) ecA(ctx, randHl, () => { ctx.fillStyle = rgba(C.goud, 0.3); ctx.beginPath(); ctx.moveTo(...MA[0]); ctx.lineTo(...Q(0.7, 0.66)); ctx.lineTo(...Q(0.66, 0.76)); ctx.lineTo(...Q(0.59, 0.77)); ctx.closePath(); ctx.fill(); });
  ctx.restore();
  maPad(); ctx.strokeStyle = akkerHl > 0.01 ? rgba(C.goud, akkerHl) : rgba(C.oker, 0.75); ctx.lineWidth = akkerHl > 0.01 ? 4 : 1.5 * k; ctx.stroke();
  // stal: lijnicoon in oker
  { const [sx, sy] = P.stal, sw = w * 0.05; ctx.beginPath(); ctx.moveTo(sx - sw, sy + sw * 0.5); ctx.lineTo(sx - sw, sy - sw * 0.2); ctx.lineTo(sx, sy - sw * 0.75); ctx.lineTo(sx + sw, sy - sw * 0.2); ctx.lineTo(sx + sw, sy + sw * 0.5); ctx.closePath();
    ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.fillStyle = rgba(C.oker, 0.18); ctx.fill(); ctx.strokeStyle = rgba(C.oker, 0.9); ctx.lineWidth = 1.6 * k; ctx.stroke();
    ctx.strokeRect(sx - sw * 0.25, sy, sw * 0.5, sw * 0.5); ctx.beginPath(); ctx.moveTo(sx - sw, sy - sw * 0.2); ctx.lineTo(sx + sw, sy - sw * 0.2); ctx.stroke(); }
  // snelweg: twee grijze bermlijnen met gestippelde middenstreep (rijdt mee met t)
  ctx.fillStyle = C.bgSchema; ctx.fillRect(wx - ww / 2, y, ww, h); ctx.fillStyle = rgba(C.line, 0.1); ctx.fillRect(wx - ww / 2, y, ww, h);
  ctx.strokeStyle = rgba(C.line, 0.75); ctx.lineWidth = 1.5 * k; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.moveTo(wx + s2 * ww / 2, y); ctx.lineTo(wx + s2 * ww / 2, y + h); ctx.stroke(); }
  ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 1.2 * k; ctx.setLineDash([10 * k, 10 * k]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(wx, y); ctx.lineTo(wx, y + h); ctx.stroke(); ctx.setLineDash([]);
  // ecoduct: groene tint, groene rand, stippels als begroeiing
  { const [ex, ey] = P.ecoduct, eh = h * 0.07, EP = [[ex - ww * 1.5, ey - eh], [ex + ww * 1.5, ey - eh * 1.15], [ex + ww * 1.5, ey + eh * 1.15], [ex - ww * 1.5, ey + eh]];
    vlak(EP, C.bgSchema, null); vlak(EP, rgba(C.groen, 0.22), ecoductHl > 0.01 ? rgba(C.goud, Math.max(0.5, ecoductHl)) : rgba(C.groen, 0.85), ecoductHl > 0.01 ? 4 : 1.6 * k);
    ctx.save(); vlak(EP); ctx.clip(); const Re = ecRng(23); for (let i = 0, nE = Math.round(40 * fN); i < nE; i++) { ctx.fillStyle = rgba(C.groen, 0.7); ctx.beginPath(); ctx.arc(ex + (Re() - 0.5) * ww * 3, ey + (Re() - 0.5) * eh * 2.2, 1.1 * k, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore();
  // Natura 2000: gouden rand om de heide
  if (natura > 0.01) ecA(ctx, natura, () => { ecPad(ctx, HP.map(([px, py]) => [P.heide[0] + (px - P.heide[0]) * 1.07, P.heide[1] + (py - P.heide[1]) * 1.07])); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([16, 10]); ctx.stroke(); ctx.setLineDash([]); });
  roundRect(ctx, x, y, w, h, 18); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  if (labels > 0.01) { naamBij(ctx, 'heide', '', X(0.3), Y(0.62), labels, 'center'); naamBij(ctx, 'ven', '', P.ven[0], P.ven[1] + 12, labels, 'center'); naamBij(ctx, 'bos', '', X(0.1), Y(0.9), labels, 'center');
    naamBij(ctx, 'akker', '', P.akker[0], P.akker[1] + 10, labels, 'center'); naamBij(ctx, 'ecoduct', '', P.ecoduct[0] - 40, P.ecoduct[1] - h * 0.11, labels, 'right'); }
  ctx.restore(); return P; }

// ---------- TELFORMULIER (klembord met rijen) ----------
// x, y = linksboven; w breedte; rijen = [[naam, waarde], …]; o.n = hoeveel rijen al ingevuld (mag een breuk zijn: de laatste rij schrijft zich in); o.kop
function telformulier(ctx, x, y, w, rijen, o = {}) { const { a = 1, n = rijen.length, kop = 'TELFORMULIER', px = 30, hl = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rh = px * 1.55, h = 110 + rijen.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#8A6A4A', '#6A4E36', 2); roundRect(ctx, x + 14, y + 26, w - 28, h - 40, 6); shape(ctx, '#F2EEE4', '#C8C0B0', 1.5);
  roundRect(ctx, x + w / 2 - 60, y + 6, 120, 34, 8); shape(ctx, '#9AA3B2', '#6A7282', 1.5);
  metaText(ctx, kop, x + 34, y + 80, '#5A6478', 'left', 22);
  rijen.forEach(([nm, val], i) => { const ry = y + 96 + i * rh; ctx.strokeStyle = '#C8C0B0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 30, ry + rh * 0.55); ctx.lineTo(x + w - 30, ry + rh * 0.55); ctx.stroke();
    const f = clamp(n - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; if (i === hl) { ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(x + 24, ry - rh * 0.35, w - 48, rh * 0.85); }
    text(ctx, nm, x + 36, ry + rh * 0.35, fTekst(px, 600), '#1A2740', 'left'); if (val) text(ctx, val, x + w - 36, ry + rh * 0.35, fTekst(px, 700), '#1A2740', 'right'); ctx.restore(); });
  ctx.restore(); return h; }

// ---------- MAISPLANT (Zea mays), zijaanzicht ----------
// Recept: 2–3 m hoog; één stevige stengel met knopen; 12–18 lange lintvormige bladeren afwisselend links en rechts, die halverwege overbuigen;
// bovenaan de mannelijke pluim (vertakt), halverwege in een bladoksel de kolf met schutbladen en een pluk 'baard' (stijlen). Bron: teelthandleiding mais (WUR/kennisakker), algemene plantenmorfologie.
// x, y = voet; h = hoogte in px; o.kolf (0/1), o.seed, o.t (heel licht wiegen), o.kl (bladkleur). Bekende fout: bladeren als stokjes; kolf los naast de stengel.
function maisPlant(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, t = 0, kolf = 1, kl = '#7FA855' } = o; if (a <= 0.01 || h < 4) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const R = ecRng(seed * 13 + 5), sway = Math.sin(t * 0.9 + seed) * h * 0.008, top = [x + sway * 2, y - h];
  const sx = u => lerp(x, top[0], u * u), sy = u => lerp(y, top[1], u);
  ctx.strokeStyle = '#8AA860'; ctx.lineWidth = Math.max(1.5, h * 0.018); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x, y - h * 0.5, top[0], top[1] + h * 0.06); ctx.stroke();
  const nB = 9; for (let i = 0; i < nB; i++) { const u = 0.12 + i * 0.085, px = sx(u), py = sy(u), d = i % 2 ? 1 : -1, L = h * (0.42 - Math.abs(i - 4) * 0.025) * (0.9 + R() * 0.2);
    const mx = px + d * L * 0.45, my = py - L * 0.38, ex = px + d * L * (0.85 + R() * 0.1), ey = py - L * 0.05 + L * 0.25 * R();
    ctx.fillStyle = i % 3 ? kl : _ecMix(kl, '#2A3A28', 0.2); ctx.beginPath(); ctx.moveTo(px, py + h * 0.006); ctx.quadraticCurveTo(mx, my - h * 0.012, ex, ey); ctx.quadraticCurveTo(mx, my + h * 0.02, px, py + h * 0.02); ctx.closePath(); ctx.fill(); }
  if (kolf) { const u = 0.47, px = sx(u), py = sy(u); ctx.save(); ctx.translate(px + h * 0.012, py); ctx.rotate(0.35); ctx.beginPath(); ctx.ellipse(h * 0.02, -h * 0.05, h * 0.022, h * 0.075, 0, 0, 6.283); ctx.fillStyle = '#9CB86A'; ctx.fill(); ctx.strokeStyle = '#6E8A48'; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = '#B88A5A'; ctx.lineWidth = Math.max(1, h * 0.004); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(h * 0.02, -h * 0.12); ctx.quadraticCurveTo(h * (0.02 + k * 0.01), -h * 0.15, h * (0.02 + k * 0.02), -h * 0.16); ctx.stroke(); } ctx.restore(); }
  // pluim
  ctx.strokeStyle = '#C8B878'; ctx.lineWidth = Math.max(1, h * 0.007); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + (k - 2) * 0.32; ctx.beginPath(); ctx.moveTo(top[0], top[1] + h * 0.05); ctx.quadraticCurveTo(top[0] + Math.cos(an) * h * 0.05, top[1] + Math.sin(an) * h * 0.05, top[0] + Math.cos(an) * h * 0.1, top[1] + Math.sin(an) * h * 0.06 + h * 0.03); ctx.stroke(); }
  ctx.restore(); }

// ===================================================================================================================
// Toegevoegd door de bouwhelper van film 1 (Tellen in het veld, 25 okt 2026). Bestaande functies hierboven niet veranderd.
// ===================================================================================================================

// ---------- WOLF, in de stijl van *Plek genoeg?* (Ecologie 1) ----------
// Overgenomen uit films/ecologie/plek-genoeg/index.html (D.quad met soort 'wolf', drawTail 'brush', drawHead, drawEar 'point', legPath),
// zelfde maten en kleuren (vacht #a7b4c8, donker #6b7891, licht #dfe5ee), zodat de wolf er in deze reeks hetzelfde uitziet.
// x, y = grondpunt onder het midden; s = schaal (s = 1: schofthoogte ± 104 px; naast een persoon van 420 px ≈ 1,70 m is s ≈ 1,9 op ware grootte).
// o: a, t, walk (0..1 benen zwaaien), kijk (±1), headUp (rad), col/dark/light (bv. camerabeeld), blur (px, camerabeeld)
const EC_WOLF = { bl: 118, bh: 46, legH: 58, legW: 12, chest: 1.18, neckL: 30, neckA: 0.62, neckW: 30, headL: 30, headH: 24, snoutL: 24, snoutH: 12, earL: 17, tailL: 62, col: '#a7b4c8', dark: '#6b7891', light: '#dfe5ee', step: 7 };
function _ecSmooth(ctx, pts) { const n = pts.length, m = i => [(pts[i % n][0] + pts[(i + 1) % n][0]) / 2, (pts[i % n][1] + pts[(i + 1) % n][1]) / 2]; ctx.beginPath(); const s0 = m(n - 1); ctx.moveTo(s0[0], s0[1]); for (let i = 0; i < n; i++) { const q = m(i); ctx.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); } ctx.closePath(); }
function _ecLeg(ctx, x0, y0, len, w, ang, bend, color) { const k = [x0 + Math.sin(ang) * len * 0.52, y0 + Math.cos(ang) * len * 0.52], a2 = ang + bend, f = [k[0] + Math.sin(a2) * len * 0.5, k[1] + Math.cos(a2) * len * 0.5];
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(k[0], k[1]); ctx.lineWidth = w; ctx.stroke(); ctx.beginPath(); ctx.moveTo(k[0], k[1]); ctx.lineTo(f[0], f[1]); ctx.lineWidth = w * 0.62; ctx.stroke(); ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; }
function wolfEc(ctx, x, y, s = 1, o = {}) { const sp = EC_WOLF, a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const t = o.t || 0, walk = o.walk || 0;
  ctx.save(); ctx.globalAlpha *= a; if (o.blur) ctx.filter = `blur(${o.blur}px)`; ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s);
  const col = o.col || sp.col, dark = o.dark || sp.dark, light = o.light || sp.light, L = sp.legH, BL = sp.bl, BH = sp.bh, top = -L - BH, fx = BL * 0.34, hx = -BL * 0.34;
  const ph = t * sp.step, A = 0.38 * clamp(walk * 2, 0, 1), sw = k => walk ? Math.sin(ph + k) * A : 0, bob = walk ? Math.abs(Math.sin(ph)) * 2.2 * clamp(walk * 2, 0, 1) : 0;
  ctx.translate(0, -bob); const legTop = -L - BH * 0.22;
  _ecLeg(ctx, fx - 4, legTop, L + BH * 0.22, sp.legW * 0.92, sw(Math.PI), -sw(Math.PI) * 0.6 - 0.05, dark);
  _ecLeg(ctx, hx - 4, legTop, L + BH * 0.22, sp.legW, sw(0) - 0.08, 0.22 - sw(0) * 0.3, dark);
  // staart: dik en hangend, donkere punt
  { const TL = sp.tailL, wag = Math.sin(t * 3) * 0.06 + (walk ? Math.sin(t * sp.step) * 0.05 : 0); ctx.save(); ctx.translate(hx - BL * 0.16, top + BH * 0.18); ctx.rotate(wag);
    const pts = [[6, -7], [-TL * 0.22, -5], [-TL * 0.42, TL * 0.16], [-TL * 0.56, TL * 0.5], [-TL * 0.56, TL * 0.84], [-TL * 0.44, TL * 0.98], [-TL * 0.32, TL * 0.82], [-TL * 0.26, TL * 0.5], [-TL * 0.12, TL * 0.24], [4, 12]];
    _ecSmooth(ctx, pts); ctx.fillStyle = col; ctx.fill(); ctx.save(); _ecSmooth(ctx, pts); ctx.clip(); ctx.beginPath(); ctx.ellipse(-TL * 0.44, TL * 0.96, TL * 0.2, TL * 0.16, 0.3, 0, 6.283); ctx.fillStyle = dark; ctx.fill(); ctx.restore(); ctx.restore(); }
  // romp met lichtere buik
  const ch = sp.chest, pts = [[-BL * 0.52, top + BH * 0.30], [-BL * 0.42, top + 2], [-BL * 0.1, top + 4], [BL * 0.22, top], [BL * 0.44, top + 2], [BL * 0.56, top + BH * 0.42], [BL * 0.46, top + BH * ch], [BL * 0.18, top + BH * 1.02], [-BL * 0.12, top + BH * 0.92], [-BL * 0.40, top + BH * 0.98], [-BL * 0.54, top + BH * 0.66]];
  _ecSmooth(ctx, pts); ctx.fillStyle = col; ctx.fill(); ctx.save(); _ecSmooth(ctx, pts); ctx.clip(); ctx.fillStyle = rgba(light.length === 7 ? light : '#dfe5ee', 0.32); ctx.beginPath(); ctx.ellipse(BL * 0.05, top + BH * 1.05, BL * 0.42, BH * 0.28, 0, 0, 6.283); ctx.fill(); ctx.restore();
  _ecLeg(ctx, fx + 4, legTop, L + BH * 0.22, sp.legW, sw(0), -sw(0) * 0.6 - 0.05, col);
  _ecLeg(ctx, hx + 4, legTop, L + BH * 0.22, sp.legW * 1.05, sw(Math.PI) - 0.08, 0.22 - sw(Math.PI) * 0.3, col);
  // nek en kop
  const na = sp.neckA + (o.headUp || 0), nx0 = BL * 0.42, ny0 = top + BH * 0.32, hxp = nx0 + Math.cos(na) * sp.neckL, hyp = ny0 - Math.sin(na) * sp.neckL;
  ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = sp.neckW; ctx.beginPath(); ctx.moveTo(nx0 - 4, ny0 + 4); ctx.lineTo(hxp, hyp); ctx.stroke(); ctx.lineCap = 'butt';
  ctx.save(); ctx.translate(hxp, hyp); ctx.rotate(0.32 + (o.headTilt || 0)); const HL = sp.headL, HH = sp.headH, sL = sp.snoutL, sH = sp.snoutH, EL = sp.earL;
  const oor = (ex, ey, kl, back) => { ctx.save(); ctx.translate(ex + (back ? -3 : 0), ey); ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(-EL * 0.42, 4); ctx.lineTo(-EL * 0.1, -EL); ctx.lineTo(EL * 0.38, 3); ctx.fill(); ctx.restore(); };
  oor(-HL * 0.2, -HH * 0.36, dark, true);
  ctx.beginPath(); ctx.ellipse(0, 0, HL * 0.52, HH * 0.5, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.moveTo(HL * 0.25, -HH * 0.36); ctx.quadraticCurveTo(HL * 0.25 + sL * 0.7, -sH * 0.62, HL * 0.25 + sL, -sH * 0.2); ctx.quadraticCurveTo(HL * 0.25 + sL * 1.04, sH * 0.4, HL * 0.25 + sL * 0.82, sH * 0.5); ctx.quadraticCurveTo(HL * 0.4, HH * 0.42, HL * 0.12, HH * 0.4); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); ctx.ellipse(HL * 0.25 + sL * 0.98, -sH * 0.12, 3.4, 3, 0, 0, 6.283); ctx.fillStyle = '#1c2230'; ctx.fill();
  const blink = Math.sin(t * 0.9 + 1) > 0.985 ? 0.2 : 1; ctx.beginPath(); ctx.ellipse(HL * 0.12, -HH * 0.12, 3, 3 * blink, 0, 0, 6.283); ctx.fillStyle = '#10131b'; ctx.fill();
  ctx.beginPath(); ctx.arc(HL * 0.12 + 0.9, -HH * 0.12 - 0.9, 0.9, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
  oor(-HL * 0.08, -HH * 0.4, col, false);
  ctx.restore(); ctx.restore(); }
// nachtelijk camerabeeld (infrarood, grijs) zoals in *Plek genoeg?*: kader met datumregel; o.n wolven, o.welp 0..1, o.t
function wildcameraBeeld(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, n = 2, welp = 0, regel = '02:14 · IR · CAM 3' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 10, y - 10, w + 20, h + 54, 6); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#3C4440'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#4A524C'; ctx.fillRect(x, y + h * 0.55, w, h * 0.45);
  for (let i = 0; i < 14; i++) { ctx.fillStyle = rgba('#28302C', 0.9); ctx.beginPath(); ctx.ellipse(x + i * w / 13, y + h * 0.48, w * 0.06, h * 0.1 + (i % 3) * h * 0.03, 0, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 30; i++) { ctx.fillStyle = rgba('#7A8274', 0.3); ctx.fillRect(x + hash(i) * w, y + h * 0.6 + hash(i + 40) * h * 0.38, 24 + hash(i + 9) * 30, 2); }
  const s = w / 640; const G = { col: '#b8bcbc', dark: '#7a7f82', light: '#e2e4e2', blur: 1.2 };
  if (n >= 1) wolfEc(ctx, x + w * 0.36, y + h * 0.9, s * 1.05, Object.assign({ t }, G));
  if (n >= 2) wolfEc(ctx, x + w * 0.72, y + h * 0.86, s * 0.95, Object.assign({ t: t + 1.3, kijk: -1, headUp: -0.15 }, G));
  if (welp > 0.01) wolfEc(ctx, x + w * 0.55, y + h * 0.93, s * 0.48, Object.assign({ t: t * 1.3 + 0.6, a: welp, headUp: 0.1 }, G));
  ctx.restore(); text(ctx, regel, x + 12, y + h + 32, fMeta(22), '#C8CCD0', 'left'); ctx.restore(); }

// ---------- POOTAFDRUK van een wolf ----------
// Recept: ovaal, ± 10–12 cm lang (groter dan bij de meeste honden), vier tenen met nagelafdruk, de twee middelste tenen steken ver naar voren;
// grote driehoekige voetzool. x, y = midden; s = px per cm; rot = looprichting (0 = omhoog). Bron: BIJ12/Wolvenmeldpunt (sporen herkennen).
function pootafdrukWolf(ctx, x, y, s = 3, rot = 0, o = {}) { const { a = 1, kl = '#3A3024', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = kl;
  ctx.beginPath(); ctx.moveTo(0, -0.6); ctx.bezierCurveTo(2.6, -0.4, 3.0, 2.2, 2.0, 3.2); ctx.quadraticCurveTo(0, 4.0, -2.0, 3.2); ctx.bezierCurveTo(-3.0, 2.2, -2.6, -0.4, 0, -0.6); ctx.fill();
  [[-1.0, -3.6, 0.95, 1.35], [1.0, -3.6, 0.95, 1.35], [-2.8, -1.6, 0.85, 1.1], [2.8, -1.6, 0.85, 1.1]].forEach(([tx, ty, rx, ry]) => { ctx.beginPath(); ctx.ellipse(tx, ty, rx, ry, tx * 0.08, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(tx * 1.05, ty - ry - 0.5, 0.25, 0.4, 0, 0, 6.283); ctx.fill(); });
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.ellipse(0, -0.4, 4.8, 6.0, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }

// ---------- HEIDEBLAUWTJE (Plebejus argus) ----------
// Recept (De Vlinderstichting, soortpagina; Bos e.a. *Dagvlinders van Nederland*): klein, spanwijdte 2,6–3,2 cm. Man boven blauw met een brede
// donkere rand en witte franje; onderkant grijsbruin met zwarte, wit omrande stippen en een rij oranje maantjes langs de achterrand, op de achtervleugel
// zwarte randvlekjes met blauwgroen glanzende kern. In rust: vleugels dicht boven het lijf (je ziet de onderkant). Sprieten met zwart-wit geringde schacht en knopje.
// Merken: met een stift een nummer op de onderkant van de achtervleugel (Ehrlich & Davidson 1960).
// x, y = midden van het lijf; s = px per mm. o.zij = zijaanzicht in rust (onderkant), anders bovenaanzicht vliegend; o.flap 0..1 (bovenaanzicht), o.nr (tekst op de vleugel),
// o.hl (gouden rand), o.rot, o.kijk. Bekende fouten: vlinder als twee driehoekjes zonder lijf; sprieten zonder knop; nummer op de bovenkant.
function heideblauwtje(ctx, x, y, s = 3, o = {}) { const { a = 1, zij = false, flap = 0.5, nr = '', hl = 0, rot = 0, kijk = 1, koraal = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const onder = '#B8AFA2', onderD = '#8E857A', blauw = '#6E8FD8', blauwD = '#4A66B0', rand = '#2A2A36', oranje = '#E0A050', franje = '#F2EFE8';
  if (zij) { // vleugels dicht, onderkant zichtbaar, lijf eronder, kop rechts
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.5; [[3, 4], [1, 5], [-1.5, 4.6]].forEach(([px, l]) => { ctx.beginPath(); ctx.moveTo(px, 1.2); ctx.lineTo(px + 0.8, 1.2 + l * 0.6); ctx.lineTo(px + 0.3, 1.2 + l); ctx.stroke(); });
    ctx.beginPath(); ctx.ellipse(0, 0.4, 7.5, 1.3, 0, 0, 6.283); ctx.fillStyle = '#3A3A44'; ctx.fill();
    ctx.beginPath(); ctx.arc(8.2, -0.1, 1.5, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(8.8, -1.2); ctx.quadraticCurveTo(10.5, -6, 11.4, -10); ctx.stroke(); ctx.beginPath(); ctx.ellipse(11.5, -10.4, 0.55, 0.9, 0.3, 0, 6.283); ctx.fillStyle = '#2A2A30'; ctx.fill();
    const VW = [[7, -0.4], [9.5, -9], [6, -14.5], [-2, -14], [-9, -10], [-10.5, -4], [-6.5, -0.6]]; ecPad(ctx, VW); ctx.fillStyle = onder; ctx.fill(); ctx.save(); ecPad(ctx, VW); ctx.clip();
    ctx.fillStyle = onderD; ecPad(ctx, [[8, -2], [9.5, -9], [6, -14.5], [2, -14], [1, -6], [3, -1]]); ctx.fill(); // voorvleugel iets donkerder
    for (let i = 0; i < 6; i++) { const px = -8 + i * 2.6, py = -2.4 - Math.sin(i * 0.5) * 0.6; circ(ctx, px, py, 0.95, oranje); circ(ctx, px, py + 1.4, 0.6, rand); circ(ctx, px, py + 1.4, 0.3, '#5AB8A8'); }
    [[-6, -8.5], [-2.5, -10.5], [1.5, -11.5], [5, -10], [-4, -6], [0.5, -7.5], [4.5, -6]].forEach(([px, py]) => { circ(ctx, px, py, 0.9, franje); circ(ctx, px, py, 0.55, rand); });
    if (koraal > 0.01) { ctx.fillStyle = rgba(C.koraal, 0.35 * koraal); ctx.fillRect(-12, -16, 24, 18); }
    ctx.restore(); ecPad(ctx, VW); ctx.strokeStyle = franje; ctx.lineWidth = 0.7; ctx.stroke();
    if (nr) { ctx.save(); ctx.scale(kijk, 1); ctx.font = `800 ${5.2}px ${F.tekst}`; ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; ctx.fillText(nr, -2.5 * kijk, -4.6); ctx.restore(); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ecPad(ctx, VW.map(([px, py]) => [px * 1.18, (py + 7) * 1.18 - 7])); ctx.strokeStyle = C.goud; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
  } else { // bovenaanzicht, vleugels open (flap 0 = plat, 1 = bijna dicht)
    const k = 1 - 0.75 * flap; ctx.save(); ctx.scale(k, 1);
    for (const d of [-1, 1]) { const VV = [[0.8 * d, -1], [8 * d, -9], [14 * d, -8], [13 * d, -2], [1 * d, 0.5]], AV = [[0.8 * d, 0.5], [11 * d, 1], [11.5 * d, 7], [6 * d, 10], [1 * d, 3.5]];
      for (const V of [AV, VV]) { ecPad(ctx, V); ctx.fillStyle = blauw; ctx.fill(); ctx.save(); ecPad(ctx, V); ctx.clip(); ctx.strokeStyle = rand; ctx.lineWidth = 2.6; ecPad(ctx, V); ctx.stroke(); ctx.strokeStyle = blauwD; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(1 * d, 0); ctx.lineTo(V[2][0] * 0.8, V[2][1] * 0.8); ctx.stroke(); ctx.restore(); ecPad(ctx, V); ctx.strokeStyle = franje; ctx.lineWidth = 0.6; ctx.stroke(); } }
    ctx.restore(); ctx.beginPath(); ctx.ellipse(0, 1.5, 1.1, 6.5, 0, 0, 6.283); ctx.fillStyle = '#2E2E3A'; ctx.fill(); ctx.beginPath(); ctx.arc(0, -5.6, 1.4, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 0.35; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0.4 * d, -6.6); ctx.quadraticCurveTo(2 * d, -10, 3.4 * d, -12.5); ctx.stroke(); circ(ctx, 3.5 * d, -12.8, 0.6, '#2A2A30'); }
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
    if (koraal > 0.01) { ctx.save(); ctx.globalAlpha *= koraal; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore(); }
  }
  ctx.restore(); }

// ---------- GROVE DEN (Pinus sylvestris) ----------
// Recept: 15–30 m; stam onderaan grijsbruin, bovenin oranjerood; kroon hoog, onregelmatig, in platte groepjes (schermvormig bij oude bomen);
// lange kale stam in het bos. x, y = voet; h = hoogte in px; o.seed. Bekende fout: kerstboomvorm (dat is een spar).
function groveDen(ctx, x, y, h, o = {}) { const { a = 1, seed = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = ecRng(seed * 7 + 2);
  const lean = (R() - 0.5) * h * 0.06, tx = x + lean; ctx.lineCap = 'round';
  ctx.strokeStyle = '#6A5444'; ctx.lineWidth = h * 0.045; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + lean * 0.3, y - h * 0.5, tx, y - h * 0.62); ctx.stroke();
  ctx.strokeStyle = '#B0644A'; ctx.lineWidth = h * 0.032; ctx.beginPath(); ctx.moveTo(x + lean * 0.4, y - h * 0.5); ctx.lineTo(tx, y - h * 0.86); ctx.stroke();
  const groep = [[0, -0.9, 0.2], [-0.16, -0.78, 0.15], [0.17, -0.74, 0.14], [-0.06, -0.66, 0.13], [0.1, -0.97, 0.1]];
  groep.forEach(([gx, gy, gr], i) => { const cx = tx + gx * h, cy = y + gy * h; if (i) { ctx.strokeStyle = '#8A5A44'; ctx.lineWidth = h * 0.012; ctx.beginPath(); ctx.moveTo(tx, cy + gr * h * 0.2); ctx.lineTo(cx, cy); ctx.stroke(); }
    ctx.fillStyle = i % 2 ? '#3E6A4A' : '#35603F'; ctx.beginPath(); ctx.ellipse(cx, cy, gr * h, gr * h * 0.42, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#4A7A55'; ctx.beginPath(); ctx.ellipse(cx - gr * h * 0.2, cy - gr * h * 0.12, gr * h * 0.6, gr * h * 0.2, 0, 0, 6.283); ctx.fill(); });
  ctx.restore(); }

// ---------- WILDCAMERA (cameraval) aan een boom ----------
// Recept: kastje ± 15 × 10 × 7 cm in camouflagekleur, ronde lens in het midden, eronder een veld infraroodleds en de bewegingssensor; met een band om de stam.
// x, y = midden; s = px per cm. o.ir 0..1 = leds gloeien (rood) bij een opname.
function wildcamera(ctx, x, y, s = 2, o = {}) { const { a = 1, ir = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3A3A30'; ctx.fillRect(-12, -1.5, 24, 3); // band
  roundRect(ctx, -5.5, -8, 11, 16, 2); shape(ctx, '#5E6248', '#3E4232', 0.5);
  ctx.fillStyle = '#4A4E38'; [[-3, -5, 2.2], [2.5, 3, 2.6], [-2, 5, 1.8]].forEach(([px, py, r]) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.6, 0.5, 0, 6.283); ctx.fill(); });
  circ(ctx, 0, -3.2, 2.2, '#1A1C22', '#8A8E7A', 0.4); circ(ctx, -0.6, -3.8, 0.5, '#5A6A8A');
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) circ(ctx, -2.4 + j * 1.6, 1.2 + i * 1.3, 0.45, ir > 0.01 ? rgba('#E05040', 0.4 + 0.6 * ir) : '#2A2C30');
  roundRect(ctx, -1.8, 5.4, 3.6, 1.6, 0.6); shape(ctx, '#C8CCD0', null);
  ctx.restore(); }

// ---------- KEUTEL van een wolf (nette tekening) ----------
// Recept: 2–4 cm dik, 15–25 cm lang, in 2–4 stukken met een gedraaid uiteinde; vaak zichtbaar haar en botsplintertjes van prooi; grijsbruin.
// Bron: BIJ12, 'Sporen van de wolf'; Wolven in Nederland (FREE Nature), sporenkaart. x, y = midden op de grond; s = px per cm. Geen bloed, geen prooi.
function wolfKeutel(ctx, x, y, s = 3, o = {}) { const { a = 1, rot = -0.08, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 1.6, 11, 1.2, 0, 0, 6.283); ctx.fill();
  const seg = [[-7.5, 0, 3.4, 1.5], [-2.2, -0.4, 2.9, 1.45], [2.8, 0.2, 2.6, 1.4], [7, -0.2, 2.2, 1.1]];
  seg.forEach(([sx, sy, rx, ry], i) => { ctx.beginPath(); ctx.ellipse(sx, sy, rx, ry, 0.05 * i, 0, 6.283); ctx.fillStyle = i % 2 ? '#6E6052' : '#625446'; ctx.fill(); ctx.strokeStyle = '#4A3E32'; ctx.lineWidth = 0.18; ctx.stroke(); });
  ctx.fillStyle = '#5A4C3E'; ctx.beginPath(); ctx.moveTo(8.8, -0.6); ctx.quadraticCurveTo(11.2, -0.6, 11.6, -1.6); ctx.quadraticCurveTo(10.6, 0.4, 8.8, 0.6); ctx.fill(); // gedraaid puntje
  ctx.strokeStyle = '#B8AC98'; ctx.lineWidth = 0.15; for (let i = 0; i < 14; i++) { const hx = -9 + hash(i * 3) * 17, hy = -1 + hash(i * 5) * 1.6; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 0.8 + hash(i) * 0.6, hy - 0.2); ctx.stroke(); } // haren
  ctx.fillStyle = '#E2DCCD'; [[-6, -0.6], [1.5, 0.4], [5, -0.5]].forEach(([bx, by]) => { ctx.beginPath(); ctx.ellipse(bx, by, 0.35, 0.18, 0.4, 0, 6.283); ctx.fill(); }); // botsplintertjes
  if (hl > 0.01) { ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.ellipse(0, 0, 13.5, 3.6, 0, 0, 6.283); ctx.stroke(); }
  ctx.restore(); }

// ---------- DNA-PROFIEL als streepjescode (paars = DNA) ----------
// Zoals in *DNA lezen*: per plek in het DNA een band op een andere hoogte (aantal herhalingen); hier per plek een streepje op een vaste rij.
// EC_PROFIEL[letter] = posities van de banden (0..1) per kolom; kolom = één plek in het DNA. x, y = linksboven; w, h; o.kl (tint van paars), o.leeg (grijs 'geen profiel')
const EC_PROFIEL = { A: [0.2, 0.62, 0.35, 0.8, 0.5, 0.28], B: [0.55, 0.3, 0.7, 0.42, 0.18, 0.66], C: [0.35, 0.78, 0.2, 0.6, 0.72, 0.45], D: [0.7, 0.45, 0.55, 0.22, 0.35, 0.8] };
const EC_PAARS = { A: '#A392D6', B: '#8C7BBF', C: '#6E5A9E', D: '#B9A8E8' };
function dnaProfiel(ctx, x, y, w, h, letter, o = {}) { const { a = 1, kl = EC_PAARS[letter] || C.paars, leeg = false, hl = 0, label = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#121A26', leeg ? '#5A6272' : rgba(kl, 0.9), hl > 0.01 ? 3 : 1.5);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, x - 5, y - 5, w + 10, h + 10, 11); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  const P = EC_PROFIEL[letter] || EC_PROFIEL.A, n = P.length, cw = (w - 16) / n;
  for (let i = 0; i < n; i++) { const cx = x + 8 + cw * (i + 0.5); ctx.strokeStyle = rgba('#8FA0B5', 0.18); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, y + 8); ctx.lineTo(cx, y + h - 8); ctx.stroke();
    if (!leeg) { const by = y + 10 + P[i] * (h - 20); ctx.fillStyle = kl; ctx.fillRect(cx - cw * 0.34, by - 3, cw * 0.68, 6); const by2 = y + 10 + ((P[i] + 0.37) % 1) * (h - 20); ctx.fillRect(cx - cw * 0.34, by2 - 3, cw * 0.68, 6); } }
  if (leeg) text(ctx, '—', x + w / 2, y + h / 2 + 10, fTekst(30, 700), '#5A6272', 'center');
  if (label && !leeg) text(ctx, letter, x + w / 2, y - 12, fTekst(32, 800), kl, 'center');
  ctx.restore(); }

// ---------- MONSTERBUISJE (keutel of water naar het lab) ----------
// x, y = onderkant midden; s = schaal (1 = 120 px hoog); o.inhoud 'keutel'|'water'|null, o.nr, o.dop (kleur)
function monsterBuisje(ctx, x, y, s = 1, o = {}) { const { a = 1, inhoud = 'keutel', nr = '', dop = '#E0B64A', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; roundRect(ctx, -26, -132, 52, 140, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  roundRect(ctx, -16, -104, 32, 104, 14); shape(ctx, rgba('#DCE5EC', 0.22), '#AFC0D0', 2);
  ctx.save(); roundRect(ctx, -16, -104, 32, 104, 14); ctx.clip();
  if (inhoud === 'keutel') { ctx.fillStyle = '#625446'; ctx.beginPath(); ctx.ellipse(0, -22, 11, 15, 0.2, 0, 6.283); ctx.fill(); ctx.fillStyle = rgba('#DCE5EC', 0.35); ctx.fillRect(-16, -60, 32, 60); }
  if (inhoud === 'water') { ctx.fillStyle = rgba(C.teal, 0.55); ctx.fillRect(-16, -70, 32, 70); }
  ctx.restore(); roundRect(ctx, -19, -122, 38, 20, 5); shape(ctx, dop, null);
  if (nr) { roundRect(ctx, -15, -88, 30, 26, 4); shape(ctx, '#F2EEE4', null); text(ctx, nr, 0, -68, fTekst(20, 800), '#1A2740', 'center'); }
  ctx.restore(); }

// ---------- MEETPLEKKEN OP NEDERLAND (toegevoegd door film 2, 25 okt 2026) ----------
// Stippen binnen de omtrek van nederland() (zelfde x, y, s), buiten het IJsselmeer; niet de echte plekken. n = aantal; o.a, o.kl, o.r, o.seed.
// (Losse functie, want nederland() met o.stippen tekent maar één stip: circ() vervangt het pad vóór isPointInPath.)
function nederlandStippen(ctx, x, y, s, n, o = {}) { const { a = 1, kl = C.goud, r = Math.max(2.2, s * 0.022), seed = 160 } = o; if (a <= 0.01 || n <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  const xy = (lon, lat) => { const [u, v] = nlXY(lon, lat); return [x + u * s, y + v * s]; }; const land = new Path2D(), ij = new Path2D();
  NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? land.lineTo(px, py) : land.moveTo(px, py); }); land.closePath();
  NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
  const R = ecRng(seed); let k = 0, tries = 0; while (k < n && tries < 8000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = xy(lo, la); if (nlIn.land(lo, la)) { circ(ctx, px, py, r, kl); k++; } }
  ctx.restore(); }

// ===== Toegevoegd door film 2 Stikstof (25 okt 2026): gebouwen in zijaanzicht, heideplanten, nestkast, ei, slakkenhuis, zeshoek =====
const KL_SCHETS = '#7E889A';            // grijs gestippeld schetsje (een voorgenomen project, geen keuze)
// ---------- ZESHOEKJES (Aerius rekent per zeshoekje van ± 1 hectare) ----------
function zeshoek(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
// ---------- STAL met silo, zijaanzicht (veehouderij; geen persoon, geen naam) ----------
// x = midden, y = grond, s = schaal (1 = stal ± 340 px breed). o.kelder = mestkelder zichtbaar (doorsnede), o.hl
function stalZij(ctx, x, y, s = 1, o = {}) { const { a = 1, kelder = 0, hl = 0, schets = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const wand = schets ? 'rgba(126,136,154,0.18)' : '#8A5A44', dak = schets ? 'rgba(126,136,154,0.25)' : '#5E4A40', lijn = schets ? KL_SCHETS : '#B88A6A';
  if (schets) ctx.setLineDash([10, 8]);
  // silo
  roundRect(ctx, 110, -300, 64, 300, 10); shape(ctx, schets ? wand : '#9AA3B2', schets ? lijn : '#C9CED6', 2); ctx.beginPath(); ctx.arc(142, -300, 32, Math.PI, 0); shape(ctx, schets ? wand : '#B8C0CA', schets ? lijn : '#C9CED6', 2);
  // stal: lage wanden, groot zadeldak, ventilatie in de nok
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(-170, -110); ctx.lineTo(100, -110); ctx.lineTo(100, 0); ctx.closePath(); shape(ctx, wand, lijn, 2);
  ctx.beginPath(); ctx.moveTo(-190, -104); ctx.lineTo(-35, -200); ctx.lineTo(120, -104); ctx.closePath(); shape(ctx, dak, lijn, 2);
  if (!schets) { ctx.fillStyle = '#3E2E26'; for (let i = 0; i < 5; i++) ctx.fillRect(-150 + i * 50, -86, 30, 26); ctx.fillStyle = '#4A3A30'; ctx.fillRect(-60, -60, 56, 60); }
  if (kelder > 0.01) ecA(ctx, kelder, () => { ctx.setLineDash([]); roundRect(ctx, -170, 4, 270, 46, 6); shape(ctx, '#5A4632', C.oker, 2); ctx.fillStyle = rgba(C.oker, 0.55); ctx.fillRect(-164, 22, 258, 24); });
  if (hl > 0.01) ecA(ctx, hl, () => { ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(-200, 8); ctx.lineTo(-200, -112); ctx.lineTo(-35, -212); ctx.lineTo(190, -112); ctx.lineTo(190, 8); ctx.closePath(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); });
  ctx.setLineDash([]); ctx.restore(); }
// ---------- FABRIEK met schoorsteen, zijaanzicht (geen naam, geen logo) ----------
function fabriekZij(ctx, x, y, s = 1, o = {}) { const { a = 1, schets = false, t = 0, rook = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const wand = schets ? 'rgba(126,136,154,0.18)' : '#5A6478', lijn = schets ? KL_SCHETS : '#8FA0B5'; if (schets) ctx.setLineDash([10, 8]);
  roundRect(ctx, 60, -330, 40, 330, 4); shape(ctx, wand, lijn, 2);
  ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(-130, -120); for (let i = 0; i < 3; i++) { ctx.lineTo(-130 + i * 60, -170); ctx.lineTo(-70 + i * 60, -120); } ctx.lineTo(130, -120); ctx.lineTo(130, 0); ctx.closePath(); shape(ctx, wand, lijn, 2);
  ctx.setLineDash([]); if (!schets) { ctx.fillStyle = '#3A4458'; for (let i = 0; i < 4; i++) ctx.fillRect(-110 + i * 56, -90, 34, 30); }
  ctx.restore(); }
// ---------- SNELWEG in dwarsdoorsnede met auto's en ecoduct (zijaanzicht) ----------
function snelwegZij(ctx, x0, x1, y, o = {}) { const { a = 1, t = 0, ecoduct = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = KL_WEG; ctx.fillRect(x0, y - 10, x1 - x0, 22); ctx.strokeStyle = rgba('#E8E4DA', 0.7); ctx.lineWidth = 2; ctx.setLineDash([22, 18]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); ctx.moveTo(x0, y + 1); ctx.lineTo(x1, y + 1); ctx.stroke(); ctx.setLineDash([]);
  if (ecoduct > 0.01) ecA(ctx, ecoduct, () => { const mx = (x0 + x1) / 2; ctx.beginPath(); ctx.moveTo(x0 + 10, y - 10); ctx.lineTo(x0 + 10, y - 120); ctx.lineTo(x1 - 10, y - 120); ctx.lineTo(x1 - 10, y - 10); ctx.lineTo(x1 - 40, y - 10); ctx.quadraticCurveTo(mx, y - 130, x0 + 40, y - 10); ctx.closePath(); shape(ctx, '#4E5A54', '#7FA870', 2);
    ctx.fillStyle = '#4E7A4A'; ctx.fillRect(x0 + 6, y - 134, x1 - x0 - 12, 16); for (let i = 0; i < 4; i++) struikhei(ctx, x0 + 30 + i * (x1 - x0 - 60) / 3, y - 132, 40, { seed: 60 + i, bloei: 0.6 }); });
  // auto's (klein, zijaanzicht), rijden langzaam
  const span = x1 - x0; for (let i = 0; i < 3; i++) { const cx = x0 + ((i * 0.37 + t * 0.06) % 1) * span, col = ['#C9CED6', '#7A8BA8', '#5A6478'][i];
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y - 60, span, 70); ctx.clip(); roundRect(ctx, cx - 30, y - 34, 60, 22, 8); shape(ctx, col, null); roundRect(ctx, cx - 16, y - 48, 34, 18, 6); shape(ctx, col, null); circ(ctx, cx - 18, y - 10, 7, '#1A1A1A'); circ(ctx, cx + 18, y - 10, 7, '#1A1A1A'); ctx.restore(); }
  ctx.restore(); }
// ---------- PLANTEN VAN DE HEIDE ----------
// TORMENTIL (Potentilla erecta): laag kruid 10–30 cm, dunne stengels, drietallige blaadjes (lijken vijftallig door steunblaadjes), gele bloempjes met VIER kroonbladen (± 1 cm).
// Bekende fout: vijf kroonbladen (dat is ganzerik). x, y = voet; h = hoogte px.
function tormentil(ctx, x, y, h, o = {}) { const { a = 1, seed = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const R = ecRng(seed * 13 + 5);
  for (let i = 0; i < 4; i++) { const an = -Math.PI / 2 + (i - 1.5) * 0.45 + (R() - 0.5) * 0.2, L = h * (0.7 + R() * 0.35), ex = x + Math.cos(an) * L, ey = y + Math.sin(an) * L;
    ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(1, h * 0.025); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(an) * L * 0.5 + (R() - 0.5) * h * 0.2, y + Math.sin(an) * L * 0.5, ex, ey); ctx.stroke();
    const lx = lerp(x, ex, 0.5), ly = lerp(y, ey, 0.5); for (let k = 0; k < 3; k++) { const la = an + (k - 1) * 0.7; ctx.beginPath(); ctx.ellipse(lx + Math.cos(la) * h * 0.07, ly + Math.sin(la) * h * 0.07, h * 0.07, h * 0.03, la, 0, 6.283); ctx.fillStyle = '#7A9A5A'; ctx.fill(); }
    const r = Math.max(2.5, h * 0.06); for (let k = 0; k < 4; k++) { const pa = k * Math.PI / 2 + 0.4; circ(ctx, ex + Math.cos(pa) * r * 0.75, ey + Math.sin(pa) * r * 0.75, r * 0.62, '#E8C840'); } circ(ctx, ex, ey, r * 0.35, '#C99A2A'); }
  ctx.restore(); }
// BRAAM (Rubus): bogen (ranken) van 1–2 m die overbuigen en weer wortelen, bladeren drie- tot vijftallig, getand; witte/roze bloemen, bramen. Hier: dichte struik van bogen.
function braam(ctx, x, y, h, o = {}) { const { a = 1, seed = 1, bes = 1 } = o; if (a <= 0.01 || h < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; const R = ecRng(seed * 7 + 11);
  const bogen = []; for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, L = h * (0.8 + R() * 0.5), top = [x + s * L * (0.25 + R() * 0.2), y - h * (0.75 + R() * 0.3)], end = [x + s * L * (0.7 + R() * 0.3), y - h * 0.05]; bogen.push([top, end]);
    ctx.strokeStyle = '#6A4A4A'; ctx.lineWidth = Math.max(1.5, h * 0.03); ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(top[0], top[1] - h * 0.2, end[0], end[1]); ctx.stroke(); }
  bogen.forEach(([top, end], i) => { for (let k = 0; k < 4; k++) { const u = 0.3 + k * 0.18, bx = lerp(x, end[0], u) + (top[0] - x) * Math.sin(u * Math.PI) * 0.4, by = lerp(y, end[1], u) - (y - top[1]) * Math.sin(u * Math.PI) * 1.05;
    for (let l = 0; l < 3; l++) { const la = -Math.PI / 2 + (l - 1) * 0.8 + i; ctx.beginPath(); ctx.ellipse(bx + Math.cos(la) * h * 0.06, by + Math.sin(la) * h * 0.06, h * 0.07, h * 0.04, la, 0, 6.283); ctx.fillStyle = l % 2 ? '#4E7A44' : '#5E8A4E'; ctx.fill(); }
    if (bes > 0.01 && (k + i) % 3 === 0) ecA(ctx, bes, () => { for (let m = 0; m < 4; m++) circ(ctx, bx + (m % 2) * 4 - 2, by + h * 0.08 + Math.floor(m / 2) * 4, Math.max(2, h * 0.018), '#3A2A3E'); }); } });
  ctx.restore(); }
// nestkast (koolmees: invlieggat ± 28 mm); x, y = midden; s (1 = ± 30 cm hoog ≈ 150 px)
function nestkast(ctx, x, y, s = 1, o = {}) { const { a = 1, open = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-52, -55); ctx.lineTo(52, -55); ctx.lineTo(52, 75); ctx.lineTo(-52, 75); ctx.closePath(); shape(ctx, '#9A7A54', '#B8966A', 2);
  ctx.save(); ctx.translate(-62, -60); ctx.rotate(-0.35 * open); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(124, -12); ctx.lineTo(124, 4); ctx.lineTo(0, 16); ctx.closePath(); shape(ctx, '#6A5038', '#8A6A4A', 2); ctx.restore();
  circ(ctx, 0, -10, 15, '#1E1610'); roundRect(ctx, -6, 18, 12, 18, 3); ctx.fillStyle = '#6A5038'; ctx.fill(); ctx.restore(); }
// ei van een koolmees (± 17 × 13 mm, wit met roodbruine spikkels); o.dun = dunne schaal (bleker, doorschijnend, schaal als dunne rand)
function ei(ctx, x, y, h, o = {}) { const { a = 1, dun = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = h * 0.76;
  const pad = (k) => { ctx.beginPath(); ctx.moveTo(x, y - h / 2 * k); ctx.bezierCurveTo(x + w / 2 * k * 1.1, y - h / 2 * k, x + w / 2 * k, y + h / 2 * k, x, y + h / 2 * k); ctx.bezierCurveTo(x - w / 2 * k, y + h / 2 * k, x - w / 2 * k * 1.1, y - h / 2 * k, x, y - h / 2 * k); ctx.closePath(); };
  pad(1); ctx.fillStyle = dun ? '#E6DCCC' : '#F6F0E6'; ctx.fill(); ctx.strokeStyle = dun ? '#C8B8A0' : '#9A8A70'; ctx.lineWidth = dun ? 1.5 : Math.max(3, h * 0.05); ctx.stroke();
  const R = ecRng(dun ? 3 : 8); for (let i = 0; i < 22; i++) { const u = R() * 6.283, v = Math.sqrt(R()) * 0.42; circ(ctx, x + Math.cos(u) * w * v, y + Math.sin(u) * h * v * 0.95 - h * 0.08, Math.max(1.5, h * 0.025), rgba('#9A4A30', dun ? 0.45 : 0.8)); }
  if (dun) { ctx.save(); pad(1); ctx.clip(); ctx.strokeStyle = rgba('#8A7A6A', 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - w * 0.1, y - h * 0.35); ctx.lineTo(x + w * 0.05, y - h * 0.15); ctx.lineTo(x - w * 0.02, y + h * 0.05); ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) ecA(ctx, hl, () => { pad(1.18); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); });
  ctx.restore(); }
// slakkenhuisje (zijaanzicht, spiraal); x, y = midden; r
function slakkenhuis(ctx, x, y, r, o = {}) { const { a = 1, slak = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (slak > 0.01) ecA(ctx, slak, () => { ctx.beginPath(); ctx.moveTo(x - r * 1.6, y + r * 0.95); ctx.quadraticCurveTo(x - r * 2.1, y + r * 0.2, x - r * 1.75, y - r * 0.15); ctx.lineTo(x - r * 1.5, y + r * 0.2); ctx.lineTo(x + r * 1.5, y + r * 0.95); ctx.closePath(); shape(ctx, '#8A7A66', '#A89880', 1.5); ctx.strokeStyle = '#8A7A66'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 1.75, y - r * 0.1); ctx.lineTo(x - r * 1.95, y - r * 0.7); ctx.moveTo(x - r * 1.6, y - r * 0.05); ctx.lineTo(x - r * 1.55, y - r * 0.65); ctx.stroke(); });
  circ(ctx, x, y, r, '#D8C49A', '#A8905A', 2); ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i / 60 * 6.283 * 2.3, rr = r * 0.95 * (1 - i / 66); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.restore(); }
// ---- uit bibliotheek/dieren/lib_dieren.js: dierOog + wolf_pop.js (goedgekeurde wolf) ----
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
// Wolf als uitknippop (cut-out rig), 23 okt 2026 — proef WOLFPOP.md
// Werkwijze: skelet uit gewrichtspunten op het ElevenLabs-modelblad (houding 1 = rust), delen getekend in de stijl van de
// samengestelde wolf op het uitknipvel (3 tonen: donker zadel, grijs-tan flank, creme buik/poten), elk deel aan één bot,
// romp/nek/staart met zachte gewichten over 2-3 botten (geen naad), poten als losse delen met ronde overlap.
// Houdingen = bothoeken gemeten op het modelblad (tabellen hieronder); lopen/draven = gangmodel met vaste steunvoet en 2-bots-IK.
// API: wolfPop(ctx, x, y, schaal, o)  x,y = midden onder het dier op de grond; schaal = px per cm (schofthoogte 80 cm).
//   o.houding: 'staan' | 'lopen' | 'draven' | 'zitten' | 'liggen' | 'huilen' (ook 'contact', 'passeer', 'draf' = modelblad 2-4)
//   o.t: 0-1 (cyclus bij lopen/draven), o.kijk: -1 spiegelt, o.a: dekking, o.wereld: true = dier schuift S*t mee (steunvoet staat stil)

// <<TABELLEN (gegenereerd door referentie/wolfpop/meet_houdingen.py; niet met de hand aanpassen)
const WP_K = 2.9750, WP_X0 = 168, WP_G0 = 300; // px op modelblad -> cm
const WP_BOTEN = [["rompV",null,"midrug","nekBasis"],["rompA",null,"midrug","kruis"],["nek","rompV","nekBasis","kop"],["kop","nek","kop","neus"],["kaak","kop","kaak","kin"],["scap","rompV","schoft","schouder"],["hum","scap","schouder","elleboog"],["rad","hum","elleboog","pols"],["mc","rad","pols","vkogel"],["vp","mc","vkogel","vteen"],["scapF","rompV","schoft","schouder"],["humF","scapF","schouder","elleboog"],["radF","humF","elleboog","pols"],["mcF","radF","pols","vkogel"],["vpF","mcF","vkogel","vteen"],["dij","rompA","heup","knie"],["schn","dij","knie","hak"],["mt","schn","hak","akogel"],["ap","mt","akogel","ateen"],["dijF","rompA","heup","knie"],["schnF","dijF","knie","hak"],["mtF","schnF","hak","akogel"],["apF","mtF","akogel","ateen"],["st0","rompA","staart0","staart1"],["st1","st0","staart1","staart2"],["st2","st1","staart2","staart3"]];
const WP_J = {"midrug":[2.353,-68.908],"nekBasis":[31.597,-68.908],"kop":[51.765,-81.345],"neus":[77.311,-71.261],"kaak":[63.193,-68.571],"kin":[73.277,-68.235],"schoft":[26.218,-73.95],"kruis":[-29.58,-68.908],"schouder":[39.328,-59.16],"elleboog":[27.563,-37.311],"pols":[27.899,-13.445],"vkogel":[31.597,-3.697],"vteen":[38.319,-1.008],"heup":[-28.908,-60.504],"knie":[-20.504,-37.983],"hak":[-37.311,-18.151],"akogel":[-35.63,-3.697],"ateen":[-28.908,-1.008],"staart0":[-34.958,-69.916],"staart1":[-42.353,-51.092],"staart2":[-46.387,-33.613],"staart3":[-45.042,-14.118],"elleboogF":[32.269,-36.975],"polsF":[33.277,-13.109],"vkogelF":[38.319,-3.697],"vteenF":[45.042,-1.008],"knieF":[-14.79,-41.345],"hakF":[-26.555,-18.151],"akogelF":[-24.202,-3.697],"ateenF":[-17.479,-1.008]};
const WP_HOUDING = {"staan":{"R":[2.35,-68.91],"A":{"rompV":0.0,"rompA":180.0,"nek":-31.7,"kop":21.5,"kaak":1.9,"scap":48.4,"hum":118.3,"rad":89.2,"mc":69.2,"vp":21.8,"dij":69.5,"schn":130.3,"mt":83.4,"ap":21.8,"scapF":48.4,"humF":113.6,"radF":80.4,"mcF":61.8,"vpF":21.8,"dijF":53.6,"schnF":117.3,"mtF":80.8,"apF":21.8,"st0":111.4,"st1":103.0,"st2":86.1}},"contact":{"R":[2.35,-63.87],"A":{"rompV":1.3,"rompA":-177.6,"nek":-41.4,"kop":12.8,"kaak":-6.9,"scap":49.8,"hum":104.7,"rad":51.8,"mc":43.3,"vp":15.4,"dij":49.1,"schn":99.2,"mt":41.3,"ap":18.4,"scapF":49.8,"humF":131.1,"radF":116.2,"mcF":70.0,"vpF":20.0,"dijF":94.3,"schnF":144.8,"mtF":84.0,"apF":20.0,"st0":113.8,"st1":113.5,"st2":116.3}},"passeer":{"R":[2.35,-64.2],"A":{"rompV":0.7,"rompA":-177.6,"nek":-39.8,"kop":12.1,"kaak":-7.5,"scap":49.1,"hum":137.1,"rad":72.7,"mc":149.6,"vp":153.4,"dij":45.3,"schn":103.6,"mt":51.7,"ap":17.7,"scapF":49.1,"humF":120.5,"radF":56.9,"mcF":67.2,"vpF":13.1,"dijF":96.6,"schnF":143.0,"mtF":78.1,"apF":20.9,"st0":113.5,"st1":115.4,"st2":111.7}},"draf":{"R":[2.35,-61.18],"A":{"rompV":2.6,"rompA":180.0,"nek":-16.7,"kop":10.0,"kaak":-9.6,"scap":51.1,"hum":150.9,"rad":62.4,"mc":159.0,"vp":156.5,"dij":37.1,"schn":99.9,"mt":39.8,"ap":17.1,"scapF":51.1,"humF":90.6,"radF":34.0,"mcF":49.1,"vpF":25.3,"dijF":77.8,"schnF":157.9,"mtF":112.4,"apF":126.9,"st0":123.9,"st1":120.4,"st2":111.3}},"zitten":{"R":[2.35,-34.29],"A":{"rompV":-58.1,"rompA":130.0,"nek":-58.8,"kop":4.4,"kaak":-15.2,"scap":-9.7,"hum":108.5,"rad":84.4,"mc":71.6,"vp":17.1,"dij":-100.3,"schn":68.6,"mt":4.0,"ap":13.1,"scapF":-9.7,"humF":102.1,"radF":78.5,"mcF":66.0,"vpF":16.3,"dijF":-95.8,"schnF":66.6,"mtF":5.1,"apF":14.0,"st0":165.1,"st1":6.4,"st2":4.0}},"liggen":{"R":[2.35,-22.52],"A":{"rompV":-8.0,"rompA":177.5,"nek":-60.6,"kop":7.6,"kaak":-12.0,"scap":40.4,"hum":83.0,"rad":-29.1,"mc":3.6,"vp":8.1,"dij":-0.0,"schn":160.1,"mt":6.2,"ap":8.4,"scapF":40.4,"humF":85.0,"radF":-37.0,"mcF":5.4,"vpF":7.1,"dijF":-26.4,"schnF":135.6,"mtF":6.2,"apF":8.4,"st0":107.0,"st1":9.9,"st2":-4.1}},"huilen":{"R":[2.35,-38.43],"A":{"rompV":-53.7,"rompA":131.2,"nek":-51.9,"kop":-58.3,"kaak":-59.6,"scap":-5.3,"hum":83.9,"rad":83.1,"mc":68.2,"vp":17.4,"dij":-60.6,"schn":83.7,"mt":2.2,"ap":16.7,"scapF":-5.3,"humF":92.6,"radF":79.3,"mcF":81.9,"vpF":17.4,"dijF":-61.8,"schnF":77.5,"mtF":3.4,"apF":17.5,"st0":62.2,"st1":-152.6,"st2":-171.7}},"drafvol":{"R":[2.35,-64.43],"A":{"rompV":4.6,"rompA":179.3,"nek":-10.1,"kop":19.3,"kaak":-0.4,"scap":53.1,"hum":89.7,"rad":29.0,"mc":26.6,"vp":11.3,"dij":121.3,"schn":158.8,"mt":125.2,"ap":122.5,"scapF":53.1,"humF":158.6,"radF":95.7,"mcF":160.3,"vpF":143.1,"dijF":37.4,"schnF":98.5,"mtF":46.6,"apF":8.5,"st0":158.3,"st1":149.3,"st2":144.8}},"snuffelen":{"R":[2.35,-64.56],"A":{"rompV":26.6,"rompA":-178.5,"nek":54.3,"kop":58.0,"kaak":38.4,"scap":75.0,"hum":175.2,"rad":81.4,"mc":69.4,"vp":22.4,"dij":43.4,"schn":111.8,"mt":58.8,"ap":16.9,"scapF":75.0,"humF":140.5,"radF":32.1,"mcF":42.0,"vpF":21.8,"dijF":65.9,"schnF":138.7,"mtF":74.1,"apF":25.0,"st0":94.4,"st1":114.3,"st2":105.6}}};
// TABELLEN>>

const WolfPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);

  // ---------- skelet ----------
  const BOT = {}, ORDE = [];
  for (const [n, par, j0, j1] of WP_BOTEN) {
    const v = sub(WP_J[j1], WP_J[j0]);
    BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: WP_J[j0] }; ORDE.push(n);
  }
  for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
  const ROOT0 = WP_J.midrug;

  // ---------- kleuren ----------
  const PAL = { zadel: '#4D4B48', grijsD: '#67635E', grijs: '#837E78', grijsL: '#A39C93', flank: '#9B8F7F', tan: '#B0976F',
    licht: '#C8BBA6', creme: '#E4DACA', neus: '#1D1B1A', klauw: '#24211F', oorbin: '#D8C7B1', pad: '#3B3633', mond: '#2A2220', tong: '#B86A64' };
  const NAVY = '#16213A';
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], 0.34, '#3E3A36');
  const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6'); // lichte randlijn om het silhouet
  const rand = (c) => mixHex(c, 0.42, '#0B111C');

  // ---------- tekenvormen: punten in px van modelblad houding 1, omgezet naar cm ----------
  const cm = (p) => [(p[0] - WP_X0) / WP_K, (p[1] - WP_G0) / WP_K];
  function hsh(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  // gesloten Catmull-Rom door de punten (punt met 3e waarde 1 = scherpe hoek), dicht bemonsterd; idx = index per controlepunt
  function spline(P) {
    const n = P.length, out = [], idx = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.8)); idx.push(out.length);
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u;
        const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); }
    }
    return { pts: out, idx };
  }
  // vachtpieken op een stuk van de omtrek: [i0, i1, hoogte, breedte, stroming(-1 = naar achter)]
  function pieken(S, spans, seed) {
    const pts = S.pts, n = pts.length; let area = 0;
    for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
    const sg = area > 0 ? 1 : -1; const vervang = [];
    spans.forEach(([i0, i1, amp, w, flow = -1], si) => {
      const a = S.idx[i0], b = S.idx[i1]; const seg = []; for (let i = a; ; i = (i + 1) % n) { seg.push(i); if (i === b) break; }
      const cum = [0]; for (let k = 1; k < seg.length; k++) cum.push(cum[k - 1] + len(sub(pts[seg[k]], pts[seg[k - 1]])));
      const tot = cum[cum.length - 1]; const at = (s) => { let k = 1; while (k < cum.length - 1 && cum[k] < s) k++; const u = (s - cum[k - 1]) / Math.max(1e-6, cum[k] - cum[k - 1]); const p = pts[seg[k - 1]], q = pts[seg[k]]; return [[p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u], sub(q, p)]; };
      const nieuw = []; let s = 0, j = 0;
      while (s < tot - 0.5) { const ww = w * (0.75 + 0.5 * hsh(seed * 31 + si * 7 + j)); const e = Math.min(tot, s + ww);
        const [p0] = at(s); const [pm, tg] = at((s + e) / 2); const tl = len(tg) || 1; const t = [tg[0] / tl, tg[1] / tl];
        const nrm = [sg * t[1], -sg * t[0]]; const lean = (t[0] * flow > 0 ? 1 : -1) * 0.7 * ww;
        const h = amp * (0.6 + 0.7 * hsh(seed * 17 + si * 13 + j * 3));
        const [p1] = at(e); const tip = [pm[0] + t[0] * lean + nrm[0] * h, pm[1] + t[1] * lean + nrm[1] * h];
        nieuw.push(p0, [p0[0] + (tip[0] - p0[0]) * 0.5 + nrm[0] * h * 0.16, p0[1] + (tip[1] - p0[1]) * 0.5 + nrm[1] * h * 0.16], tip, [tip[0] + (p1[0] - tip[0]) * 0.55 - nrm[0] * h * 0.08, tip[1] + (p1[1] - tip[1]) * 0.55 - nrm[1] * h * 0.08]); s = e; j++; }
      nieuw.push(at(tot)[0]); vervang.push({ a, b, nieuw });
    });
    // bouw nieuwe lijst: vervang segmenten (oplopend, zonder wrap-overlap)
    vervang.sort((p, q) => p.a - q.a); const res = []; let i = 0;
    const wrap = vervang.find(v => v.b < v.a);
    if (wrap) { i = wrap.b + 1; }
    const eind = wrap ? wrap.a : n;
    for (const v of vervang) { if (v === wrap) continue; while (i < v.a) res.push(pts[i++]); res.push(...v.nieuw); i = v.b + 1; }
    while (i < eind) res.push(pts[i++]); if (wrap) res.push(...wrap.nieuw);
    return res;
  }
  function open(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.8));
      for (let k = 0; k <= st; k++) { const u = k / st, u2 = u * u, u3 = u2 * u; out.push([(2 * u3 - 3 * u2 + 1) * a[0] + (u3 - 2 * u2 + u) * ta[0] + (-2 * u3 + 3 * u2) * b[0] + (u3 - u2) * tb[0], (2 * u3 - 3 * u2 + 1) * a[1] + (u3 - 2 * u2 + u) * ta[1] + (-2 * u3 + 3 * u2) * b[1] + (u3 - u2) * tb[1]]); } } return out; }
  function vorm(def, seed) { if (def.lijn) return open(def.p.map(cm)); const P = def.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; }); const S = spline(P);
    const spans = (def.t || []).map(([i0, i1, a, w, f]) => [i0, i1, a / WP_K, w / WP_K, f]); return spans.length ? pieken(S, spans, seed) : S.pts; }

  // ---- de delen (px op modelblad, houding 1) ----
  const DELEN = {
    romp: { skin: 'romp', lagen: [
      { c: 'flank', p: [[68, 90], [88, 77], [115, 71], [145, 70], [175, 69], [205, 66], [228, 62], [252, 62], [272, 72], [292, 96], [306, 122], [310, 148], [300, 166], [282, 176], [258, 180], [238, 177], [215, 169], [192, 160], [168, 153], [148, 147], [128, 144], [112, 156], [95, 178], [72, 182], [52, 165], [44, 135], [50, 105]],
        t: [[1, 7, 2, 20], [15, 20, 4, 16]] },
      { c: 'zadel', p: [[40, 100], [62, 78], [90, 66], [120, 62], [170, 60], [205, 57], [232, 54], [258, 56], [282, 70], [270, 92], [258, 108], [249, 124], [241, 143], [232, 128], [222, 112], [200, 108], [176, 105], [150, 108], [126, 105], [100, 109], [78, 119], [52, 128]],
        t: [[9, 21, 6, 17]] },
      { c: 'grijsD', p: [[226, 70], [262, 66], [272, 84], [262, 100], [252, 112], [246, 96], [236, 84]], t: [[3, 6, 5, 11]] },
      { c: 'creme', p: [[300, 112], [312, 140], [312, 170], [282, 182], [258, 186], [238, 185], [215, 178], [192, 168], [168, 160], [148, 154], [124, 150], [116, 140], [136, 135], [160, 140], [186, 145], [210, 148], [232, 148], [252, 147], [270, 140], [285, 128]],
        t: [[11, 19, 5, 16, 1]] },
    ] },
    staart: { skin: 'staart', lagen: [
      { c: 'grijs', p: [[56, 86], [72, 90], [74, 110], [68, 140], [62, 175], [60, 205], [56, 232], [48, 252], [37, 266], [28, 260], [19, 242], [14, 214], [16, 182], [22, 150], [34, 118], [46, 96]],
        t: [[3, 7, 3.5, 22, 1], [9, 14, 4, 22, 1]] },
      { c: 'zadel', p: [[56, 82], [44, 92], [30, 116], [18, 148], [11, 182], [10, 214], [22, 208], [30, 178], [38, 148], [48, 120], [60, 100]], t: [[6, 10, 4, 18, 1]] },
      { c: 'licht', p: [[74, 98], [78, 112], [72, 140], [66, 170], [58, 166], [62, 140], [66, 112]], t: [[4, 6, 4, 10, 1]] },
      { c: 'zadel', p: [[62, 224], [54, 248], [40, 270], [26, 266], [15, 246], [12, 220], [26, 228], [44, 230]], t: [[5, 7, 5, 11, 1]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'grijs', p: [[232, 66], [255, 52], [278, 40], [300, 30], [318, 27], [334, 40], [344, 62], [350, 88], [348, 100], [340, 114], [332, 132], [324, 150], [314, 170], [296, 174], [284, 160], [272, 140], [262, 118], [250, 98], [238, 82]],
        t: [[0, 4, 4.5, 16, -1], [10, 13, 6, 15, -1], [13, 18, 6, 15, -1]] },
      { c: 'zadel', p: [[226, 60], [252, 46], [278, 34], [300, 24], [320, 22], [330, 38], [308, 50], [290, 62], [274, 78], [260, 92], [244, 86]], t: [[5, 10, 6, 16, -1]] },
      { c: 'grijsL', p: [[266, 104], [282, 86], [300, 72], [318, 72], [326, 88], [314, 106], [298, 124], [282, 138], [272, 126]], t: [[3, 7, 5, 11, -1], [7, 0, 4, 11, -1]] },
      { c: 'creme', p: [[352, 86], [350, 100], [342, 114], [334, 132], [326, 150], [316, 172], [296, 176], [292, 160], [302, 144], [312, 126], [320, 110], [330, 96]], t: [[5, 8, 7, 12, -1], [8, 11, 5, 12, -1]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'grijsD', p: [[340, 46], [349, 22, 1], [357, 7, 1], [364, 24], [366, 48]] }] },
    kaak: { bot: 'kaak', lagen: [{ c: 'creme', p: [[346, 94], [366, 93], [384, 93], [391, 95], [384, 100], [366, 104], [350, 106], [338, 102]] }] },
    kop: { bot: 'kop', lagen: [
      { c: 'grijs', p: [[314, 36], [332, 30], [350, 33], [362, 45], [372, 57], [384, 67], [394, 76], [400, 84], [400, 90], [393, 94], [380, 94], [366, 95], [354, 100], [340, 105], [326, 101], [316, 90], [309, 74], [309, 54]],
        t: [[13, 17, 6, 10, -1]] },
      { c: 'grijsD', p: [[312, 34], [332, 28], [352, 31], [364, 44], [370, 54], [358, 51], [345, 47], [330, 46], [318, 52]] },
      { c: 'grijsL', p: [[360, 50], [376, 60], [392, 74], [398, 82], [388, 82], [374, 74], [362, 64], [352, 58]] },
      { c: 'creme', p: [[336, 64], [348, 66], [362, 72], [378, 80], [392, 86], [401, 88], [400, 91], [393, 95], [380, 95], [366, 96], [354, 101], [340, 106], [326, 102], [318, 88], [326, 74]], t: [[11, 14, 6, 10, -1]] },
      { c: 'creme', p: [[346, 49], [356, 48], [360, 52], [350, 54]] },
      { c: 'neus', p: [[388, 80], [396, 78], [402, 83], [401, 90], [394, 90], [388, 86]] },
    ] },
    oor: { bot: 'kop', lagen: [
      { c: 'grijsD', p: [[323, 48], [330, 26, 1], [338, 5, 1], [349, 22], [355, 44]] },
      { c: 'oorbin', p: [[331, 44], [335, 25], [338, 13, 1], [345, 25], [348, 42]] },
      { c: 'grijsL', lijn: 1.2, p: [[333, 40], [337, 28], [339, 18]] },
    ] },
    hum: { bot: 'hum', skin: 'hum', lagen: [
      { c: 'creme', p: [[292, 108], [306, 128], [302, 150], [286, 170], [268, 183], [250, 190], [238, 182], [244, 162], [258, 140], [274, 116]] },
      { c: 'flank', p: [[270, 104], [294, 106], [290, 130], [274, 152], [256, 172], [242, 182], [236, 170], [246, 150], [258, 128]], t: [[2, 5, 4, 12, -1]] },
      { c: 'licht', lijn: 1.2, p: [[246, 156], [240, 170], [242, 182]] },
    ] },
    rad: { bot: 'rad', lagen: [
      { c: 'creme', p: [[240, 176], [260, 170], [266, 188], [264, 214], [262, 240], [261, 256], [256, 266], [246, 266], [243, 250], [243, 226], [242, 202], [238, 190]] },
      { c: 'tan', p: [[258, 192], [266, 196], [264, 220], [262, 240], [259, 248], [259, 220], [257, 200]] },
    ] },
    mc: { bot: 'mc', lagen: [
      { c: 'creme', p: [[243, 254], [261, 251], [267, 274], [267, 290], [257, 293], [249, 286], [244, 268]] },
      { c: 'pad', p: [[238, 258], [243, 257], [244, 264], [239, 265]] },
    ] },
    vp: { bot: 'vp', voet: true, lagen: [
      { c: 'creme', p: [[250, 283], [264, 280], [277, 284], [286, 291], [288, 298], [282, 301], [260, 301], [251, 298], [248, 291]] },
    ] },
    dij: { bot: 'dij', skin: 'dij', lagen: [
      { c: 'flank', p: [[58, 106], [84, 99], [107, 106], [122, 125], [127, 147], [124, 167], [116, 183], [106, 193], [92, 193], [76, 185], [60, 171], [48, 153], [44, 130]] },
      { c: 'zadel', p: [[44, 100], [80, 92], [110, 98], [122, 110], [102, 114], [80, 113], [58, 120], [42, 126]], t: [[3, 7, 5, 13]] },
      { c: 'creme', p: [[39, 138], [43, 156], [55, 173], [73, 188], [92, 197], [80, 182], [64, 167], [53, 151], [48, 137]], t: [[4, 8, 4, 12, -1]] },
      { c: 'licht', lijn: 1.2, p: [[121, 132], [126, 150], [123, 168], [114, 184]] },
    ] },
    schn: { bot: 'schn', lagen: [
      { c: 'flank', p: [[98, 176], [120, 182], [117, 200], [100, 219], [82, 238], [69, 256], [55, 256], [49, 244], [48, 224], [52, 206], [62, 192], [80, 182]], t: [[7, 10, 4, 12, -1]] },
      { c: 'licht', lijn: 1.4, p: [[118, 190], [111, 208], [96, 224], [80, 240], [71, 252]] },
      { c: 'creme', p: [[42, 248], [45, 224], [49, 206], [58, 190], [70, 190], [62, 208], [58, 228], [57, 252], [50, 259]], t: [[0, 3, 4, 12, -1]] },
    ] },
    mt: { bot: 'mt', lagen: [{ c: 'creme', p: [[48, 240], [62, 241], [66, 260], [67, 282], [65, 292], [55, 292], [52, 272], [50, 256]] }] },
    ap: { bot: 'ap', voet: true, lagen: [{ c: 'creme', p: [[51, 283], [65, 280], [78, 284], [87, 291], [89, 298], [83, 301], [61, 301], [52, 298], [48, 291]] }] },
  };

  // poot-tekening (tenen, klauwen) in px: per voetdeel
  const TENEN = { vp: { teen: [[270, 290, 272, 300], [278, 289, 281, 300]], klauw: [[266, 300], [275, 300], [285, 299]] },
                  ap: { teen: [[71, 290, 73, 300], [79, 289, 82, 300]], klauw: [[67, 300], [76, 300], [86, 299]] } };

  // vormen voorbereiden (dicht bemonsterd, in cm, ruststand)
  const PREP = {};
  let seed = 1;
  for (const k in DELEN) { const d = DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, lagen: d.lagen.map(l => ({ c: l.c, lijn: l.lijn ? l.lijn / WP_K : 0, pts: vorm(l, seed++) })) }; }
  const TEEN = {}; for (const k in TENEN) TEEN[k] = { teen: TENEN[k].teen.map(([a, b, c, d]) => [cm([a, b]), cm([c, d])]), klauw: TENEN[k].klauw.map(cm) };
  const OOG = cm([356, 57]), OOGLIJN = [cm([345, 58]), cm([351, 53]), cm([361, 53]), cm([368, 58]), cm([360, 62]), cm([350, 61])];
  const MOND = [cm([366, 94]), cm([378, 94]), cm([389, 93])];

  // ---------- gewichten voor de buigzame delen ----------
  function projectie(v, keten) { // keten: lijst punten; geeft parameter u (segment + fractie)
    let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
  const GEW = {
    romp: (v) => { const w = sstep((v[0] - cm([130, 0])[0]) / (cm([215, 0])[0] - cm([130, 0])[0])); return [['rompV', w], ['rompA', 1 - w]]; },
    nek: (v) => { const u = projectie(v, [WP_J.nekBasis, WP_J.kop]); const wa = 1 - sstep((u + 0.35) / 1.05), wk = sstep((u - 0.68) / 0.42); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
    dij: (v) => { const u = projectie(v, [WP_J.heup, WP_J.knie]); const w = sstep((u - 0.25) / 0.85); return [['rompA', 1 - w], ['dij', w]]; },
    hum: (v) => { const u = projectie(v, [WP_J.schouder, WP_J.elleboog]); const w = sstep((u + 0.1) / 0.8); return [['scap', 1 - w], ['hum', w]]; },
    staart: (v) => { const u = projectie(v, [WP_J.staart0, WP_J.staart1, WP_J.staart2, WP_J.staart3]); const c = [['rompA', -0.35], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5]];
      let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 2.5) w = [['st2', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
  };
  for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

  // ---------- voorwaartse kinematica ----------
  function fk(R, A) { // A: hoeken in radialen (wereld); geeft draaipunten
    const piv = {};
    for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; }
    return piv;
  }
  const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
  function ik(p0, t, l1, l2, teken) {
    const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd));
    const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek];
  }
  const graden = (H) => { const A = {}; for (const n of ORDE) A[n] = (H.A[n] ?? BOT[n].A0 / RAD) * RAD; return A; };

  // ---------- gangmodel ----------
  // sleutelhoeken (graden, y omlaag; 90 = recht naar beneden). Stap: modelblad 2-3 + loopcyclus-plaat fasen 1-8; draf: modelblad 4 + plaat 10.
  const kurve = (K, u) => { u = Math.max(0, Math.min(1, u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const GANG = {
    lopen: { S: 82, f: 1.0, beta: 0.68, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 8, A: 6.5 }, bob: 0.7, nx: { V: 3, A: 5 }, basis: ['contact', 'passeer'], kop: [-4, -3],
      V: { metaS: [[0, 62], [0.5, 72], [0.82, 86], [1, 104]], metaZ: [[0, 104], [0.32, 128], [0.58, 116], [0.85, 70], [1, 62]],
           pootS: [[0, 21], [0.68, 21], [1, 72]], pootZ: [[0, 72], [0.3, 100], [0.6, 88], [0.86, 28], [1, 21]] },
      A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 110]], metaZ: [[0, 110], [0.35, 70], [0.62, 52], [0.86, 60], [1, 70]],
           pootS: [[0, 21], [0.62, 21], [1, 68]], pootZ: [[0, 68], [0.3, 92], [0.6, 52], [0.86, 26], [1, 21]] } },
    draven: { S: 118, f: 2.0, beta: 0.44, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: 13, A: 9 }, bob: 1.2, nx: { V: 6, A: 6 }, basis: ['draf', 'drafvol'], kop: [-4, -2],
      V: { metaS: [[0, 58], [0.5, 74], [0.8, 92], [1, 112]], metaZ: [[0, 112], [0.3, 160], [0.55, 150], [0.82, 40], [1, 58]],
           pootS: [[0, 21], [0.6, 21], [1, 80]], pootZ: [[0, 80], [0.3, 140], [0.6, 95], [0.85, 12], [1, 21]] },
      A: { metaS: [[0, 60], [0.5, 84], [0.8, 104], [1, 122]], metaZ: [[0, 122], [0.35, 70], [0.62, 48], [0.86, 47], [1, 60]],
           pootS: [[0, 21], [0.55, 21], [1, 110]], pootZ: [[0, 110], [0.3, 100], [0.6, 55], [0.86, 12], [1, 21]] } },
  };
  // rust: positie van de teen per poot (staan-tabel), t.o.v. het dier
  const REST_A = graden({ A: {} }), REST_P = fk(ROOT0, REST_A);
  const ST_A = graden(WP_HOUDING.staan), ST_P = fk([ROOT0[0], WP_HOUDING.staan.R[1]], ST_A);
  const TEENST = { V: eind(ST_P, ST_A, 'vp'), VF: eind(ST_P, ST_A, 'vpF'), A: eind(ST_P, ST_A, 'ap'), AF: eind(ST_P, ST_A, 'apF') };
  const TEEN0 = { V: TEENST.V, A: TEENST.A };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };
  const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } }; // kortste weg (rompA ligt rond ±180°)
  const ROMPNAMEN = ['rompV', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2'];

  // poten zetten: voeten = { L: { teen:[x,y], meta: graden, poot: graden } } -> hoeken via IK (elleboog naar achter, knie naar voren)
  function zetBenen(R, A, voeten, scapZwaai = {}) {
    let piv = fk(R, A); const rek = {};
    for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', zij = L.length > 1 ? 'F' : '';
      const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
      const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
      if (voor) { A['scap' + zij] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
        const [a1, a2, r] = ik(eind(piv, A, 'scap' + zij), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + zij] = a1; A['rad' + zij] = a2; rek[L] = r; }
      else { const [a1, a2, r] = ik(piv['dij' + zij], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + zij] = a1; A['schn' + zij] = a2; rek[L] = r; }
      A[nM + zij] = v.meta * RAD; A[nP + zij] = v.poot * RAD; v.kogel = kogel; }
    return rek;
  }
  // romp/kop/staart van een gang (mix g: 0 = stap, 1 = draf) op cyclus-tijd t
  function gangRomp(g, t) {
    const res = []; for (const s of ['lopen', 'draven']) { const G = GANG[s], H0 = WP_HOUDING[G.basis[0]], H1 = WP_HOUDING[G.basis[1]];
      const A = graden(H0), A1 = graden(H1), w = 0.5 - 0.5 * Math.cos(4 * Math.PI * t); mixA(A, A1, w, ROMPNAMEN);
      A.nek += G.kop[0] * RAD; A.kop += G.kop[1] * RAD; res.push({ A, y: H0.R[1] * (1 - w) + H1.R[1] * w }); }
    const A = res[0].A; mixA(A, res[1].A, g, ROMPNAMEN); const G = { bob: lerp(GANG.lopen.bob, GANG.draven.bob, g) };
    const y = lerp(res[0].y, res[1].y, g) + 1.8 + G.bob * Math.cos(4 * Math.PI * (t - 0.06)); // +1,8 cm: iets door de poten bij lopen (voorpoot bereikt de grond, rek < 1)
    A.rompV += 0.8 * RAD * Math.sin(4 * Math.PI * t); A.rompA -= 0.8 * RAD * Math.sin(4 * Math.PI * t);
    A.nek += 2.0 * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= 1.5 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
    A.st0 += 3 * RAD * Math.sin(2 * Math.PI * (t - 0.2)); A.st1 += 6 * RAD * Math.sin(2 * Math.PI * (t - 0.32)); A.st2 += 8 * RAD * Math.sin(2 * Math.PI * (t - 0.45));
    A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
    return { A, R: [ROOT0[0], y] };
  }
  const gpar = (g, k) => lerp(GANG.lopen[k], GANG.draven[k], g);
  const fasep = (g, L) => lerp(GANG.lopen.fase[L], GANG.draven.fase[L] + (L === 'VF' ? 1 : 0), g);
  const hoek = (g, L, kant, u) => { const k = L[0] === 'V' ? 'V' : 'A'; return lerp(kurve(GANG.lopen[k][kant], u), kurve(GANG.draven[k][kant], u), g); };

  // stateloos (voor storyboards): gang op t, met steunvoet stil t.o.v. de wereld
  function gang(soort, t) {
    const g = soort === 'draven' ? 1 : 0, G = GANG[soort]; const { A, R } = gangRomp(g, t);
    const halve = G.S * G.beta / 2, voeten = {}, scap = {};
    for (const L of ['A', 'AF', 'V', 'VF']) { const voor = L[0] === 'V', p = fr(t - G.fase[L]), steun = p < G.beta;
      const nx = TEENST[L][0] + G.nx[voor ? 'V' : 'A'], ty0 = TEENST[L][1]; let tx, ty, u;
      if (steun) { u = p / G.beta; tx = nx + halve * (1 - 2 * u); ty = ty0; }
      else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.55; tx = hermite(nx - halve, nx + halve, m, m, u);
        ty = ty0 - G.lift[voor ? 'V' : 'A'] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
      voeten[L] = { teen: [tx, ty], meta: hoek(g, L, steun ? 'metaS' : 'metaZ', u), poot: hoek(g, L, steun ? 'pootS' : 'pootZ', u), steun, u };
      if (voor) scap[L] = 9 * (tx - nx) / halve; }
    const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
    return { R, A, voeten };
  }

  // statische houding uit de tabel (met optionele borstverdieping en extra's)
  const BORST = { zitten: 1.08, huilen: 1.06 };
  function tabel(h, o = {}) {
    const H = WP_HOUDING[h] || WP_HOUDING.staan; const A = graden(H), R = [ROOT0[0], H.R[1]];
    if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
    if (h === 'huilen') A.kaak += 0.06 * Math.sin(2 * Math.PI * (o.t || 0));
    if (h === 'snuffelen') { A.rompV -= 7 * RAD; A.nek += 14 * RAD; A.kop += 16 * RAD; } // handmatig: de pop-nek is korter dan de nek op de AI-plaat; zo raakt de neus de grond
    if (h === 'snuffelen' && o.t) { A.kop += 4 * RAD * Math.sin(2 * Math.PI * o.t * 3); A.nek += 2 * RAD * Math.sin(2 * Math.PI * o.t * 3 + 1); }
    if (h === 'staan' && o.t) { A.st1 += 3 * RAD * Math.sin(2 * Math.PI * o.t); A.st2 += 5 * RAD * Math.sin(2 * Math.PI * o.t - 0.6); }
    if (o.bek != null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + o.bek;
    return { R, A, voeten: {}, borst: BORST[h] || 1, zit: ['zitten', 'liggen', 'huilen'].includes(h) };
  }
  function stand(o) {
    if (o.stand) return o.stand;
    const h = o.houding || 'staan';
    if (h === 'lopen' || h === 'draven') { const st = gang(h, fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
    return tabel(h, o);
  }

  // ---------- film: gesimuleerde reeks met gangwissel, stoppen en houdingswissels ----------
  // spec: { fps, duur, v(t) cm/s, g(t) 0-1, acties: [{t0, t1, h}] } -> frames [{stand, X}]
  function film(spec) {
    const fps = spec.fps || 24, N = Math.round(spec.duur * fps), dt = 1 / fps, frames = [];
    let X = 0, Phi = 0, rust = false, rustT = 0; const poot = {};
    const LEGS = ['A', 'AF', 'V', 'VF'];
    for (const L of LEGS) poot[L] = { steun: true, teenW: TEENST[L][0], vanX: 0, klaar: false };
    let laatste = null;
    for (let i = 0; i < N; i++) {
      const t = i * dt, v = spec.v(t), g = spec.g(t);
      // gang loopt door zolang er snelheid is of nog niet alle voeten neutraal staan
      if (!rust) {
        const f = v > 1 ? lerp(GANG.lopen.f, GANG.draven.f, g) : GANG.lopen.f, beta = gpar(g, 'beta'), S = v / f, halve = S * beta / 2;
        Phi += f * dt; X += v * dt;
        const tc = fr(Phi); const { A, R } = gangRomp(g, tc); const voeten = {}, scap = {};
        let allesKlaar = v <= 1;
        for (const L of LEGS) { const P = poot[L], voor = L[0] === 'V', p0 = fr(Phi - fasep(g, L)), steun = p0 < beta || (P.klaar && P.steun), p = steun && P.klaar ? Math.min(p0, beta * 0.5) : p0; // eenmaal neergezet na het stoppen: blijft staan
          const nx = TEENST[L][0] + (voor ? lerp(3, 6, g) : lerp(5, 6, g)) * Math.min(1, v / 40), ty0 = TEENST[L][1]; let tx, ty, u;
          if (steun) { if (!P.steun) { P.steun = true; P.klaar = v <= 1; } u = p / beta; tx = P.teenW - X; ty = ty0; }
          else { if (P.steun) { P.steun = false; P.vanX = P.teenW; } u = (p - beta) / (1 - beta);
            const resterend = (1 - u) * (1 - beta) / f, doel = X + v * resterend + nx + halve; const tw = lerp(P.vanX, doel, sstep(u));
            const stap = Math.abs(doel - P.vanX);
            const lift = (voor ? lerp(GANG.lopen.lift.V, GANG.draven.lift.V, g) : lerp(GANG.lopen.lift.A, GANG.draven.lift.A, g)) * Math.min(1, 0.15 + stap / 30);
            P.teenW = tw; tx = tw - X; ty = ty0 - lift * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
          voeten[L] = { teen: [tx, ty], meta: lerp(voor ? 69 : 83, hoek(g, L, steun ? 'metaS' : 'metaZ', u), steun ? Math.min(1, v / 30) : 1),
            poot: lerp(21, hoek(g, L, steun ? 'pootS' : 'pootZ', u), steun ? Math.min(1, v / 30) : 1), steun, u };
          if (voor) scap[L] = 9 * (tx - nx) / Math.max(10, halve) * Math.min(1, v / 40);
          if (!(steun && P.klaar)) allesKlaar = false; }
        // bij stilstand: romp naar de staan-tabel mengen
        const ws = 1 - Math.min(1, v / 40); const As = graden(WP_HOUDING.staan); mixA(A, As, ws, ROMPNAMEN); R[1] = lerp(R[1], WP_HOUDING.staan.R[1], ws);
        const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
        laatste = { R, A, voeten, borst: 1, zit: false };
        if (allesKlaar) { rust = true; rustT = t; for (const L of LEGS) poot[L].vast = [poot[L].teenW - X, TEENST[L][1]]; }
      } else {
        // houdingen na stilstand: tabellen mengen, voeten blijven staan (IK); bij zitten stappen de achtervoeten naar voren
        const tr = t - rustT; const act = (spec.acties || []).filter(a => tr >= a.t0); let H0 = 'staan', H1 = 'staan', w = 1, cur = null;
        if (act.length) { cur = act[act.length - 1]; const vorige = act.length > 1 ? act[act.length - 2].h : 'staan'; H0 = vorige; H1 = cur.h; w = sstep((tr - cur.t0) / (cur.t1 - cur.t0)); }
        const T0 = tabel(H0, { t: t * 0.4 }), T1 = tabel(H1, { t: t * 0.4 }); const A = T0.A; mixA(A, T1.A, w, ROMPNAMEN);
        const R = [ROOT0[0], lerp(T0.R[1], T1.R[1], w)]; const borst = lerp(T0.borst, T1.borst, w);
        // voeten: staande houdingen houden hun plek; zittende: voorvoeten blijven, achtervoeten naar de zit-plek (stap met boog)
        const zitW = (h) => ['zitten', 'huilen'].includes(h) ? 1 : 0; const z0 = zitW(H0), z1 = zitW(H1);
        const voeten = {};
        const ZT = tabel('zitten'); const ZP = fk(ZT.R, ZT.A);
        const zitTeen = (L) => { const n = L[0] === 'V' ? (L.length > 1 ? 'vpF' : 'vp') : (L.length > 1 ? 'apF' : 'ap'); return eind(ZP, ZT.A, n); };
        // zit-lichaam zo verschuiven dat zijn nabije voorvoet op de vaste voorvoet staat
        const dxZ = poot.V.vast[0] - zitTeen('V')[0];
        const zf = lerp(z0, z1, w); R[0] += dxZ * zf; R[1] += 1.2 * zf; // iets lager zodat de voorpoten de grond houden
        for (const L of LEGS) { const voor = L[0] === 'V'; const vast = poot[L].vast;
          const n = voor ? (L.length > 1 ? 'vpF' : 'vp') : (L.length > 1 ? 'apF' : 'ap'), nm = voor ? (L.length > 1 ? 'mcF' : 'mc') : (L.length > 1 ? 'mtF' : 'mt');
          const a0 = (z0 ? ZT : T0).A, a1 = (z1 ? ZT : T1).A;
          let teen = vast.slice(), meta = lerp(a0[nm], a1[nm], w) / RAD, pa = lerp(a0[n], a1[n], w) / RAD;
          if (!voor && z0 !== z1) { const doel = [zitTeen(L)[0] + dxZ, zitTeen(L)[1]]; const van = vast;
            const k = L === 'A' ? 0 : 0.18; const u = Math.max(0, Math.min(1, (w - k) / 0.45)); const uu = sstep(u);
            const a = z1 ? van : doel, b = z1 ? doel : van; teen = [lerp(a[0], b[0], uu), lerp(a[1], b[1], uu) - 5 * Math.sin(Math.PI * u)]; }
          else if (!voor && z0 && z1) teen = [zitTeen(L)[0] + dxZ, zitTeen(L)[1]];
          if (!voor && z1 && w >= 1) poot[L].vastZ = teen;
          voeten[L] = { teen, meta, poot: pa, steun: true }; }
        // voorpoten bij zitten: voet blijft, hoeken uit de tabel
        const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
        laatste = { R, A, voeten, borst, zit: zf > 0.5 };
      }
      frames.push({ stand: laatste, X });
    }
    return frames;
  }

  // ---------- tekenen ----------
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  function tekenDeel(ctx, k, M, ver, piv, A, modus = 'alles') {
    const D = PREP[k], pal = ver ? PALF : PAL;
    const tr = D.skin ? (l) => l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }) : null;
    ctx.save();
    if (!D.skin) { const b = BOT[D.bot]; ctx.translate(piv[D.bot][0], piv[D.bot][1]); ctx.rotate(A[D.bot] - b.A0); ctx.translate(-b.J0[0], -b.J0[1]); }
    const basis = tr ? tr(D.lagen[0]) : D.lagen[0].pts;
    if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[D.lagen[0].c]); ctx.lineWidth = 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
    pad(ctx, basis); ctx.fillStyle = pal[D.lagen[0].c]; ctx.fill();
    if (D.lagen.length > 1) { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < D.lagen.length; i++) { const L = D.lagen[i], P = tr ? tr(L) : L.pts;
      if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
      else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
    if (D.voet) { const T = TEEN[k]; ctx.strokeStyle = rand(pal.creme); ctx.lineWidth = 0.22; ctx.lineCap = 'round'; for (const [a, b] of T.teen) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      ctx.fillStyle = pal.klauw; for (const c of T.klauw) { ctx.beginPath(); ctx.moveTo(c[0] - 0.9, c[1] - 0.5); ctx.lineTo(c[0] + 1.3, c[1] + 0.25); ctx.lineTo(c[0] - 0.3, c[1] + 0.45); ctx.closePath(); ctx.fill(); } }
    if (k === 'kop') { // oog, ooglijn, mond
      ctx.fillStyle = '#2A2523'; pad(ctx, OOGLIJN); ctx.fill();
      if (typeof dierOog === 'function') { ctx.save(); ctx.translate(OOG[0], OOG[1]); ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, 4.0, '#C9932F'); ctx.restore(); } else { ctx.fillStyle = '#C9932F'; ctx.beginPath(); ctx.arc(OOG[0], OOG[1], 0.95, 0, 6.283); ctx.fill(); }
      ctx.strokeStyle = pal.mond; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.moveTo(MOND[0][0], MOND[0][1]); ctx.quadraticCurveTo(MOND[1][0], MOND[1][1] + 0.3, MOND[2][0], MOND[2][1]); ctx.stroke(); }
    ctx.restore();
  }
  // volgorde van achter naar voor: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, kop
  const VOLGORDE = [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['hum', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['staart'], ['rad'], ['mc'], ['vp'], ['romp'],
    ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['oorF'], ['kaak'], ['kop'], ['oor']];

  function teken(ctx, x, y, s, o = {}) {
    if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas) { // doorzichtig: eerst los tekenen, anders schemeren de overlappende delen door elkaar
      if ((o.a ?? 1) <= 0.01) return null; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
      k.setTransform(ctx.getTransform()); const st = teken(k, x, y, s, Object.assign({}, o, { a: 1 }));
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return st; }
    const st = stand(o); const { R, A } = st; const piv = fk(R, A); const borst = st.borst || 1;
    const dx = o.wereld && GANG[o.houding] ? GANG[o.houding].S * fr(o.t || 0) : 0;
    const M = {}; for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0;
      M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
    if (borst !== 1) for (const n of ['rompV', 'rompA']) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; // romp dikker (zitten)
      const f2 = 1 + (borst - 1) * 0.6; M[n] = (v) => { const vx = v[0] - j[0], vy0 = v[1] - j[1], vy = vy0 > 0 ? vy0 * borst : vy0 * f2; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx, 0);
    const open = A.kaak - A.kop - (BOT.kaak.A0 - BOT.kop.A0) > 0.02;
    if (st.zit) { ctx.beginPath(); ctx.rect(-300, -300, 600, 300.8); ctx.clip(); } // zitten/liggen: bil en staart worden op de grond platgedrukt, niets onder de grond
    const zit = st.zit; // dan ligt de achtervoet vóór de dij
    let VO = zit ? VOLGORDE.filter(([k, v]) => v || (k !== 'mt' && k !== 'ap')).flatMap(e => (e[0] === 'dij' && !e[1]) ? [e, ['mt'], ['ap']] : [e]) : VOLGORDE;
    const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A); // verre poot: elk bot met F-versie vervangen
    for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
    if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
    for (const [k, ver] of VO) { // eerst de lichte rand (alleen het buitensilhouet blijft zichtbaar)
      if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand');
      else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
    for (const [k, ver] of VO) {
      if (ver) tekenDeel(ctx, k, MF, true, pivF, AF);
      else { if (k === 'kaak' && open) { // open bek: donkere mondholte
          const p = piv.kaak, dk = A.kop - BOT.kop.A0, dj = A.kaak - BOT.kaak.A0; ctx.save(); ctx.translate(p[0], p[1]);
          ctx.fillStyle = PAL.mond; ctx.beginPath(); ctx.moveTo(-1.5, 0); ctx.lineTo(...rot([11.6, -1.0], dk)); ctx.lineTo(...rot([10.6, 0.6], dj)); ctx.closePath(); ctx.fill();
          ctx.fillStyle = PAL.tong; ctx.beginPath(); ctx.moveTo(0, 0.2); ctx.lineTo(...rot([7.5, -0.1], (dk + dj) / 2)); ctx.lineTo(...rot([6, 0.5], dj)); ctx.closePath(); ctx.fill(); ctx.restore(); }
        tekenDeel(ctx, k, M, false, piv, A); }
    }
    ctx.restore();
    return st;
  }
  // diagnose voor testvel: draaipunten en voeten in cm (t.o.v. x,y)
  function info(o = {}) { const st = stand(o); const piv = fk(st.R, st.A); const dx = o.wereld && GANG[o.houding] ? GANG[o.houding].S * fr(o.t || 0) : 0; return { piv, A: st.A, voeten: st.voeten, dx, eind: (n) => eind(piv, st.A, n) }; }
  // één deel in ruststand, verschoven (cm) — voor het uit-elkaar-testvel; geeft de draaipunten (cm) terug
  function deel(ctx, k, dx = 0, dy = 0) {
    const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
    if (k.endsWith('F')) tekenDeel(ctx, k.slice(0, -1), M, true, REST_P, REST_A); else tekenDeel(ctx, k, M, false, REST_P, REST_A); ctx.restore();
    const D = PREP[k.replace(/F$/, '')]; const bones = D.skin ? { romp: ['rompV', 'rompA'], nek: ['nek', 'kop'], staart: ['st0', 'st1', 'st2'], dij: ['dij'], hum: ['hum'] }[D.skin] : [D.bot];
    return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]);
  }
  return { teken, info, stand, fk, deel, film, gang, tabel, BOT, ORDE, PREP, GANG, PAL, REST_P, REST_A };
})();

function wolfPop(ctx, x, y, schaal = 5, o = {}) { return WolfPop.teken(ctx, x, y, schaal, o); }

// ---- integratie: de bestaande aanroep wolf(ctx, x, y, s, o) tekent voortaan de pop (zelfde maat: s = px per cm, schofthoogte 80 cm) ----
// o-velden van dieren_zoog.js: houding ('staan'|'lopen'|'draven'|'zitten'|'liggen'|'huilen'|'snuffelen'|'grazen'), t, kijk, a, kopHoek, nekHoek, bek.
function wolf(ctx, x, y, s, o = {}) { const h = { grazen: 'snuffelen', vechten: 'staan' }[o.houding] || o.houding || 'staan';
  return WolfPop.teken(ctx, x, y, s, Object.assign({}, o, { houding: h })); }

// Wat word jij? · Ecologie en natuurbeheer · film 1 Tellen in het veld — eigen tekeningen (fase A, 25 okt 2026)
// Reeksobjecten (wolf zoals in Plek genoeg?, heideblauwtje, keutel, wildcamera, DNA-profiel, buisje, grove den, gebiedskaart, Nederland, struikhei)
// staan in /home/claude/hw/ec_reeks.js; hier alleen wat alleen deze film nodig heeft.
// Schaal in de veldscènes: persoon 430 px ≈ 1,70 m → ± 250 px per meter (heideplant 30 cm ≈ 75 px; vlinder ± 3 cm wordt in een zoom getoond).
// Kleuren: groen = heide/plant, oker = bodem, teal = water, koraal = let op, paars ALLEEN DNA, goud = focus.

const FLOOR = 840;                  // voetlijn personen
const VELD = { outfit: 'veld' };
// Daan met nitrilhandschoenen bij het oprapen van de keutel: tijdelijke garderobe-variant van 'veld' (alleen in deze film, niet in lib_cast)
if (typeof CAST !== 'undefined' && CAST.daan && CAST.daan.garderobe && CAST.daan.garderobe.veld && !CAST.daan.garderobe.veldHand)
  CAST.daan.garderobe.veldHand = Object.assign({}, CAST.daan.garderobe.veld, { accessoire: ['bril', 'sproeten', 'handschoenen'] });
function daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.voet || FLOOR, o.h || 430, Object.assign({ t, uit: 'neutraal', kijk: 1 }, VELD, o)); }
function bas(ctx, x, t, o = {}) { return persoon(ctx, 'bas', x, o.voet || FLOOR, o.h || 430, Object.assign({ t, uit: 'neutraal', kijk: -1 }, VELD, o)); }
// de vrijwilliger in H2: figurant zonder naam (castboek: Mevrouw Jansen, garderobe 'buiten')
function vrijwilliger(ctx, x, t, o = {}) { return persoon(ctx, 'buurvrouw', x, o.voet || FLOOR, o.h || 410, Object.assign({ t, uit: 'neutraal', kijk: 1, outfit: 'buiten' }, o)); }

function ec1Antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function mono(ctx, s2, x, y, a = 1, col = C.text, px = 64, al = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, `600 ${px}px ${F.meta}`, col, al); ctx.restore(); }

// ---------- landschap (alleen onder scènes die echt in het veld spelen) ----------
// grondstrook met heide; o.zand = kaal zandpad links-rechts; o.bloei
function heideGrond(ctx, o = {}) { const { a = 1, y = FLOOR - 10, bloei = 1, zand = 0, seed = 5, x0 = -40, x1 = W + 40 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2E3A36'; ctx.fillRect(0, y, W, CAPTION_Y - y + 20);
  if (zand > 0.01) { ctx.save(); ctx.globalAlpha *= zand; ctx.fillStyle = KL_ZAND_D; ecPad(ctx, [[x0, y + 10], [W * 0.3, y + 2], [W * 0.7, y + 6], [x1, y + 12], [x1, y + 60], [x0, y + 60]]); ctx.fill(); ctx.restore(); }
  heideRij(ctx, x0, x1, y + 4, 70, { seed, bloei });
  ctx.restore(); }
// rij grove dennen als bosrand op de achtergrond (zacht, 70 %)
function bosrand(ctx, o = {}) { const { a = 1, y = FLOOR - 6, x0 = 0, x1 = W, h = 520, seed = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.7; const R = ecRng(seed); let x = x0 + 40;
  while (x < x1) { groveDen(ctx, x, y, h * (0.8 + R() * 0.35), { seed: Math.floor(R() * 50) }); x += 120 + R() * 140; } ctx.restore(); }
// ven (teal) met oever
function ven(ctx, x, y, rx, ry, o = {}) { const { a = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, rx + 18, ry + 8, 0, 0, 6.283); ctx.fillStyle = KL_ZAND_D; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.7), C.teal, 2);
  ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - rx * 0.5 + i * rx * 0.3, y - ry * 0.2 + i * 6); ctx.lineTo(x - rx * 0.3 + i * rx * 0.3, y - ry * 0.2 + i * 6); ctx.stroke(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.beginPath(); ctx.ellipse(x, y, rx + 26, ry + 14, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// geel nummerbordje (tentje) bij een gevonden spoor
function ecBordje(ctx, x, y, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y); ctx.lineTo(x - 14, y - 50); ctx.lineTo(x + 14, y - 50); ctx.lineTo(x + 26, y); ctx.closePath(); shape(ctx, '#E6C64A', '#B89A2A', 2);
  text(ctx, String(n), x, y - 14, fTekst(28, 800), '#1A1A1A', 'center'); ctx.restore(); }

// ---------- dingen in de hand (o.hold van persoon: x, y = hand, ang = richting onderarm) ----------
function holdNet(ctx, x, y, ang) { ctx.save(); ctx.lineCap = 'round'; const ex = x + 150, ey = y - 230; ctx.strokeStyle = '#B89A6A'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x - 20, y + 30); ctx.lineTo(ex, ey); ctx.stroke();
  ctx.save(); ctx.translate(ex + 40, ey - 30); ctx.rotate(0.5); ctx.beginPath(); ctx.ellipse(0, 0, 58, 22, 0, 0, 6.283); ctx.strokeStyle = '#C8CCD0'; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-56, 4); ctx.quadraticCurveTo(-10, 110, 10, 120); ctx.quadraticCurveTo(40, 100, 56, 4); ctx.fillStyle = rgba('#E8ECEF', 0.22); ctx.fill(); ctx.strokeStyle = rgba('#E8ECEF', 0.5); ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = rgba('#E8ECEF', 0.25); ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 20, 10); ctx.lineTo(i * 6 + 10, 112); ctx.stroke(); } ctx.restore(); ctx.restore(); }
function holdKlembord(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 10, y - 40); ctx.rotate(-0.15); roundRect(ctx, -34, -46, 68, 92, 6); shape(ctx, '#8A6A4A', '#6A4E36', 2); roundRect(ctx, -28, -38, 56, 78, 3); shape(ctx, '#F2EEE4', null);
  ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-20, -24 + i * 14); ctx.lineTo(20, -24 + i * 14); ctx.stroke(); } roundRect(ctx, -14, -52, 28, 12, 3); shape(ctx, '#9AA3B2', null); ctx.restore(); }
function holdFles(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 6, y - 6); roundRect(ctx, -16, -70, 32, 80, 8); shape(ctx, rgba('#DCE5EC', 0.3), '#AFC0D0', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-14, -40, 28, 48); roundRect(ctx, -10, -84, 20, 16, 3); shape(ctx, '#5B8CC9', null); ctx.restore(); }
function holdBuisje(ctx, x, y, ang) { monsterBuisje(ctx, x + 4, y + 10, 0.55, { inhoud: 'keutel' }); }
function holdBoekje(ctx, x, y, ang) { ctx.save(); ctx.translate(x + 4, y - 20); ctx.rotate(-0.2); roundRect(ctx, -36, -26, 72, 52, 4); shape(ctx, '#3E6A8A', '#2E5272', 2); roundRect(ctx, -30, -22, 60, 44, 2); shape(ctx, '#F2EEE4', null); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 1.5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-24, -12 + i * 10); ctx.lineTo(22, -12 + i * 10); ctx.stroke(); } ctx.restore(); }

// ---------- UI-kaartjes ----------
function defKaart(ctx, term, def, x, y, w, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(32, 400); const words = def.split(' '); const L = []; let l = '';
  for (const wd of words) { const tt = l ? l + ' ' + wd : wd; if (ctx.measureText(tt).width > w - 60 && l) { L.push(l); l = wd; } else l = tt; } if (l) L.push(l);
  const h = 96 + L.length * 42; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.85), rgba(col, 0.8), 2); ctx.fillStyle = col; ctx.fillRect(x, y + 16, 6, h - 32);
  text(ctx, term, x + 30, y + 54, fTekst(40, 700), col, 'left'); L.forEach((s2, i) => text(ctx, s2, x + 30, y + 100 + i * 42, fTekst(32, 400), C.text, 'left')); ctx.restore(); return h; }
function kaartjeEc(ctx, x, y, w, h, kop, sub, o = {}) { const { a = 1, col = C.goud, hl = 0, px = 32 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.85), hl > 0.01 ? C.goud : rgba(col, 0.7), hl > 0.01 ? 3 : 1.5);
  text(ctx, kop, x + 24, y + (sub ? 46 : h / 2 + px * 0.35), fTekst(px, 700), C.text, 'left'); if (sub) { ctx.save(); ctx.font = fMeta(22); ctx.letterSpacing = '2px'; ctx.fillStyle = C.grain; ctx.textAlign = 'left'; ctx.fillText(sub.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + 24, y + 84); ctx.restore(); } ctx.restore(); }
function verhoudingBalk(ctx, x, y, w, frac, label, rechts, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 46, 10); shape(ctx, '#2A3446', C.line, 1.5);
  if (frac > 0.005) { roundRect(ctx, x, y, Math.max(20, w * frac), 46, 10); shape(ctx, rgba(col, 0.7), col, 2); }
  for (let i = 1; i < 5; i++) { ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + w * i / 5, y + 6); ctx.lineTo(x + w * i / 5, y + 40); ctx.stroke(); }
  if (label) text(ctx, label, x - 20, y + 34, fTekst(32, 700), C.text, 'right'); if (rechts) text(ctx, rechts, x + w + 20, y + 34, fTekst(32, 700), C.text, 'left'); ctx.restore(); }
// raster van n vlindertjes (bovenaanzicht, klein); goud = indices met goud kader (gemerkt), koraal = indices koraal (nieuw, ongemerkt)
function vlinderRaster(ctx, x, y, n, per, gap, o = {}) { const { a = 1, goud = [], koraal = [], t = 0, s = 1.5, dim = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const px = x + (i % per) * gap, py = y + Math.floor(i / per) * gap, fl = 0.35 + 0.25 * Math.sin(t * 6 + i * 1.7);
    ctx.save(); if (dim.includes(i)) ctx.globalAlpha *= 0.35; heideblauwtje(ctx, px, py, s, { flap: fl, hl: goud.includes(i) ? 1 : 0, koraal: koraal.includes(i) ? 1 : 0 }); ctx.restore(); } ctx.restore(); }
function loep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#DCE5EC', 0.12), '#C8CCD0', 5); ctx.strokeStyle = '#8A6A4A'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.5, y + r * 1.5); ctx.stroke(); ctx.restore(); }
// 'dicht': ring om het gebied met een slot (niemand erbij, niemand weg)
function dichtIcoon(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(C.groen, 0.12), C.groen, 3);
  heideRij(ctx, x - r * 0.7, x + r * 0.7, y + r * 0.35, r * 0.5, { seed: 11 }); for (const d of [-1, 1]) { pijl(ctx, x + d * (r + 90), y, x + d * (r + 14), y, C.koraal, 1, 4, 14); kruis(ctx, x + d * (r + 52), y - 34, 12, 1); } ctx.restore(); }

// ---------- H2: telroute, doos, proefvlak, index ----------
// telroute van bovenaf langs de bosrand, in stukken van 50 m; o.k = 0..1 positie van de teller, o.doos, o.bloemen (alternatieve route), o.nieuw 0..1
function routeKaart(ctx, x, y, w, h, o = {}) { const { a = 1, k = 0, doos = 0, stukken = 1, bloemen = 0, nieuw = 0, hlStuk = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); ctx.fillStyle = '#2E3A36'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  ctx.fillStyle = KL_BOS; ctx.fillRect(x, y, w, h * 0.38); const R = ecRng(21); for (let i = 0; i < 60; i++) circ(ctx, x + R() * w, y + R() * h * 0.36, 14 + R() * 12, i % 3 ? KL_BOS_L : '#356249');
  ctx.fillStyle = KL_HEIDE; ctx.fillRect(x, y + h * 0.5, w, h * 0.5); const R2 = ecRng(5); for (let i = 0; i < 90; i++) circ(ctx, x + R2() * w, y + h * 0.52 + R2() * h * 0.46, 2 + R2() * 2, i % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D);
  if (bloemen > 0.01) { ctx.save(); ctx.globalAlpha *= bloemen; const R3 = ecRng(8); for (let i = 0; i < 26; i++) { const bx = x + w * (0.35 + R3() * 0.3), by = y + h * (0.74 + R3() * 0.2); for (let j = 0; j < 5; j++) circ(ctx, bx + Math.cos(j * 1.26) * 5, by + Math.sin(j * 1.26) * 5, 3.5, '#E8D27A'); circ(ctx, bx, by, 3, '#C8823A'); } ctx.restore(); }
  ctx.restore();
  const ry = y + h * 0.44, x0 = x + 50, x1 = x + w - 50; ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, ry); ctx.lineTo(x1, ry); ctx.stroke();
  if (stukken > 0.01) { ctx.save(); ctx.globalAlpha *= stukken; const n = 10; for (let i = 0; i <= n; i++) { const sx = lerp(x0, x1, i / n); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, ry - 16); ctx.lineTo(sx, ry + 16); ctx.stroke(); }
    if (hlStuk >= 0) { const sx = lerp(x0, x1, hlStuk / n); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(sx, ry); ctx.lineTo(sx + (x1 - x0) / n, ry); ctx.stroke(); } ctx.restore(); }
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(x0, ry); ctx.bezierCurveTo(x + w * 0.3, ry, x + w * 0.35, y + h * 0.84, x + w * 0.5, y + h * 0.84); ctx.bezierCurveTo(x + w * 0.65, y + h * 0.84, x + w * 0.7, ry, x1, ry); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  const px = lerp(x0, x1, k); circ(ctx, px, ry, 12, C.goud, '#121A26', 2.5);
  if (doos > 0.01) { ctx.save(); ctx.globalAlpha *= doos; const d = (x1 - x0) / 10 * 0.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.strokeRect(px, ry - d / 2, d, d); ctx.setLineDash([]); ctx.fillStyle = rgba(C.goud, 0.15); ctx.fillRect(px, ry - d / 2, d, d); ctx.restore(); }
  ctx.restore(); return { ry, x0, x1, px }; }
// denkbeeldige doos in perspectief vóór de teller: voorvlak (x, y onderkant links) w × h, diepte dx, dy
function telDoos(ctx, x, y, w, h, dx, dy, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([12, 8]);
  ctx.fillStyle = rgba(C.goud, 0.07); ctx.beginPath(); ctx.moveTo(x + dx, y - dy); ctx.lineTo(x + w + dx, y - dy); ctx.lineTo(x + w + dx, y - h - dy); ctx.lineTo(x + dx, y - h - dy); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = rgba(C.goud, 0.08); ctx.beginPath(); ctx.rect(x, y - h, w, h); ctx.fill(); ctx.stroke();
  for (const [px, py] of [[x, y], [x + w, y], [x + w, y - h], [x, y - h]]) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + dx, py - dy); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// klokjesgentiaan (Gentiana pneumonanthe): rechte stengel 15–40 cm, smalle tegenoverstaande blaadjes, blauwe klokken bovenaan; eitjes van het gentiaanblauwtje als witte stipjes op de knoppen
function klokjesgentiaan(ctx, x, y, h, o = {}) { const { a = 1, eitjes = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = '#6E8A52'; ctx.lineWidth = Math.max(2, h * 0.025); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h * 0.82); ctx.stroke();
  for (let i = 0; i < 5; i++) { const py = y - h * (0.12 + i * 0.13); for (const d of [-1, 1]) { ctx.fillStyle = '#7FA060'; ctx.beginPath(); ctx.ellipse(x + d * h * 0.07, py - h * 0.02, h * 0.075, h * 0.018, d * -0.5, 0, 6.283); ctx.fill(); } }
  [[0, 0.92], [-0.08, 0.8], [0.08, 0.76]].forEach(([dx, dy], i) => { const bx = x + dx * h, by = y - dy * h; ctx.save(); ctx.translate(bx, by); ctx.rotate(dx * 3); ctx.beginPath(); ctx.moveTo(-h * 0.04, h * 0.06); ctx.lineTo(-h * 0.05, -h * 0.05); ctx.lineTo(-h * 0.02, -h * 0.08); ctx.lineTo(0, -h * 0.05); ctx.lineTo(h * 0.02, -h * 0.08); ctx.lineTo(h * 0.05, -h * 0.05); ctx.lineTo(h * 0.04, h * 0.06); ctx.closePath(); shape(ctx, '#4A6AC0', '#6A8AE0', 1.5);
    if (eitjes > 0.01) { ctx.globalAlpha *= eitjes; for (let k = 0; k < 3; k++) circ(ctx, -h * 0.02 + k * h * 0.02, h * (0.0 + (k % 2) * 0.02), Math.max(2, h * 0.012), '#F2F2EE'); } ctx.restore(); });
  ctx.restore(); }
function proefvlak(ctx, x, y, s, o = {}) { const { a = 1, eitjes = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3A36'; ctx.fillRect(x, y, s, s);
  const R = ecRng(13); for (let i = 0; i < 30; i++) circ(ctx, x + 8 + R() * (s - 16), y + 8 + R() * (s - 16), 2 + R() * 2, i % 2 ? KL_HEIDEBLOEM : KL_HEIDEBLOEM_D);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x, y, s, s); for (const [px, py] of [[x, y], [x + s, y], [x + s, y + s], [x, y + s]]) { roundRect(ctx, px - 5, py - 5, 10, 10, 2); shape(ctx, '#C8A06A', null); }
  [[0.3, 0.75], [0.62, 0.55], [0.78, 0.9]].forEach(([u, v], i) => klokjesgentiaan(ctx, x + u * s, y + v * s, s * 0.42, { eitjes }));
  metaA(ctx, '10 × 10 M', x + s / 2, y + s + 34, 1, C.grain, 'center', 24); ctx.restore(); }
// CBS-vlinderindex dagvlinders (54 soorten), 1992 = 100: waarneming, trend en onzekerheid van de trend. Bron: CBS, 'Steeds minder vlinders …', 23 april 2025 (tabel bij de grafiek).
const VLINDER_JAAR = Array.from({ length: 33 }, (_, i) => 1992 + i);
const VLINDER_WAARN = [105.17, 95.85, 70.94, 97.51, 89.19, 81.7, 83.65, 63.53, 81.83, 58.02, 71, 84.86, 60.52, 66.46, 62.89, 51.94, 49.07, 79.41, 83.45, 75.69, 48.06, 71.41, 78.3, 60.85, 57.26, 72.44, 66.89, 55.87, 52.95, 50.88, 59.71, 46.85, 40.83];
const VLINDER_TREND = [100, 95.05, 90.58, 86.52, 82.89, 79.62, 76.68, 74.08, 71.83, 69.74, 67.77, 66.08, 64.85, 64.26, 64.2, 64.35, 64.39, 64.72, 65.61, 66.5, 66.79, 66.68, 66.55, 66.07, 64.94, 63.24, 61.23, 58.9, 56.28, 53.4, 50.33, 47.13, 43.85];
const VLINDER_LO = [90.17, 87.38, 84.65, 81.85, 79.01, 76.11, 73.35, 70.82, 68.62, 66.67, 64.84, 63.2, 61.95, 61.45, 61.47, 61.57, 61.54, 61.99, 63.05, 63.89, 64.15, 64.13, 64.06, 63.65, 62.62, 61.07, 59.25, 57.11, 54.58, 51.69, 48.46, 44.96, 41.35];
const VLINDER_HI = [110.74, 103.19, 96.94, 91.54, 87.1, 83.44, 80.31, 77.62, 75.31, 73.09, 70.97, 69.18, 67.9, 67.24, 67.05, 67.19, 67.27, 67.49, 68.3, 69.23, 69.59, 69.39, 69.14, 68.56, 67.34, 65.46, 63.25, 60.74, 58.02, 55.16, 52.28, 49.36, 46.48];
// o.punten 0..1 (waarnemingen), o.trend 0..1 (lijn tekent zich), o.band 0..1, o.hl2024, o.klein (mini-versie zonder jaartallen), o.lijnKl
function indexGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, punten = 1, trend = 0, band = 0, hl2024 = 0, klein = false, ymax = 120 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = i => x + (i / 32) * w, Y = v => y + h - (v / ymax) * h;
  ctx.strokeStyle = rgba('#FFFFFF', 0.03); ctx.lineWidth = 1; for (let v = 20; v <= ymax; v += 20) { ctx.beginPath(); ctx.moveTo(x, Y(v)); ctx.lineTo(x + w, Y(v)); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const px = klein ? 22 : 28; [0, 50, 100].forEach(v => { text(ctx, String(v), x - 14, Y(v) + 9, fMeta(px), C.text2, 'right'); });
  if (!klein) [0, 8, 18, 28, 32].forEach(i => text(ctx, String(VLINDER_JAAR[i]), X(i), y + h + 40, fMeta(px), C.text2, 'center'));
  else { text(ctx, '1992', X(0), y + h + 30, fMeta(px), C.text2, 'center'); text(ctx, '2024', X(32), y + h + 30, fMeta(px), C.text2, 'center'); }
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(x, Y(100)); ctx.lineTo(x + w, Y(100)); ctx.stroke(); ctx.setLineDash([]);
  if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; ctx.beginPath(); VLINDER_HI.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); for (let i = 32; i >= 0; i--) ctx.lineTo(X(i), Y(VLINDER_LO[i])); ctx.closePath(); ctx.fillStyle = rgba(C.groen, 0.28); ctx.fill(); ctx.restore(); }
  if (punten > 0.01) { const n = Math.round(punten * 33); for (let i = 0; i < n; i++) circ(ctx, X(i), Y(VLINDER_WAARN[i]), klein ? 4 : 6, i === 32 && hl2024 > 0.01 ? C.koraal : rgba(C.text2, 0.9)); }
  if (hl2024 > 0.01) { ctx.save(); ctx.globalAlpha *= hl2024; ctx.beginPath(); ctx.arc(X(32), Y(VLINDER_WAARN[32]), 16, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (trend > 0.01) { const n = trend * 32; ctx.strokeStyle = C.groen; ctx.lineWidth = klein ? 3 : 5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= Math.floor(n); i++) i ? ctx.lineTo(X(i), Y(VLINDER_TREND[i])) : ctx.moveTo(X(i), Y(VLINDER_TREND[i]));
    if (n < 32) { const i = Math.floor(n), f = n - i; ctx.lineTo(lerp(X(i), X(i + 1), f), lerp(Y(VLINDER_TREND[i]), Y(VLINDER_TREND[i + 1]), f)); } ctx.stroke(); }
  ctx.restore(); return { X, Y }; }

// ---------- H3: zoom in de keutel ----------
// darmwandcellen (los, rond, met kern) die in een keutel zitten
function darmcellen(ctx, cx, cy, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[-0.35, -0.2, 0.36], [0.32, -0.28, 0.32], [0.05, 0.32, 0.38], [-0.55, 0.42, 0.22], [0.62, 0.36, 0.24]].forEach(([u, v, s], i) => { const x = cx + u * r + Math.sin(t * 0.6 + i) * 3, y = cy + v * r + Math.cos(t * 0.5 + i) * 3, R = s * r;
    ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); shape(ctx, '#3A3530', '#9A8A78', 1.5); for (let k = 0; k < 8; k++) circ(ctx, x + (hash(i * 9 + k) - 0.5) * R * 1.3, y + (hash(i * 7 + k + 3) - 0.5) * R * 1.3, 1.5, rgba(C.grain, 0.15));
    ctx.beginPath(); ctx.arc(x + R * 0.12, y - R * 0.08, R * 0.36, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.2);
    ctx.strokeStyle = rgba(C.kernR, 0.7); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + R * (0.0 + k * 0.08), y - R * 0.2); ctx.quadraticCurveTo(x + R * 0.3, y - R * (0.05 - k * 0.08), x + R * 0.1, y + R * 0.12); ctx.stroke(); } });
  ctx.restore(); }
// stuk DNA (rechtsdraaiende dubbele helix, paars) van x0 naar x1 op hoogte y; o.herh = [[u0,u1],…] stukken met herhalingen (goud gemarkeerd), o.breuk (losse stukjes)
function ecDNA(ctx, x0, x1, y, r, o = {}) { const { a = 1, herh = [], fase = 0, hl = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const pitch = r * 3.4, N = Math.ceil((x1 - x0) / 3), P = (k, i) => { const x = x0 + i * 3, ph = (x - x0) / pitch * 6.283 + fase + (k ? 2.2 : 0); return [x, y + Math.sin(ph) * r, Math.cos(ph)]; };
  herh.forEach(([u0, u1]) => { ctx.fillStyle = rgba(C.goud, 0.18 * hl); ctx.fillRect(lerp(x0, x1, u0), y - r * 1.6, (u1 - u0) * (x1 - x0), r * 3.2); ctx.strokeStyle = rgba(C.goud, 0.8 * hl); ctx.lineWidth = 1.5; ctx.strokeRect(lerp(x0, x1, u0), y - r * 1.6, (u1 - u0) * (x1 - x0), r * 3.2);
    const n = Math.max(2, Math.round((u1 - u0) * 12)); ctx.strokeStyle = rgba(C.goud, 0.6 * hl); for (let k = 1; k < n; k++) { const xx = lerp(lerp(x0, x1, u0), lerp(x0, x1, u1), k / n); ctx.beginPath(); ctx.moveTo(xx, y - r * 1.6); ctx.lineTo(xx, y - r * 1.25); ctx.stroke(); } });
  const streng = (k, voor) => { ctx.strokeStyle = voor ? C.kernR : C.kern; ctx.lineWidth = Math.max(2, r * 0.32); ctx.beginPath(); let on = false; for (let i = 0; i <= N; i++) { const [x, yy, z] = P(k, i); if ((z >= 0) === voor) { on ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); on = true; } else on = false; } ctx.stroke(); };
  streng(0, false); streng(1, false); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = Math.max(1, r * 0.14); for (let x = x0; x <= x1; x += pitch / 5) { const i = Math.round((x - x0) / 3); const A = P(0, i), B = P(1, i); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); }
  streng(0, true); streng(1, true); ctx.restore(); }
// losse stukjes DNA in water (omgevings-DNA)
function dnaStukjes(ctx, cx, cy, rx, ry, n, a = 1, t = 0) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const w = wander(i, t, 10, 0.4), x = cx + (hash(i * 3) - 0.5) * rx * 2 + w.x, y = cy + (hash(i * 5 + 1) - 0.5) * ry * 2 + w.y, L = 80 + hash(i) * 60;
    ecDNA(ctx, x - L / 2, x + L / 2, y, 9, { a, fase: i }); } }

// ---------- H4: keet, laptop, kaartjes ----------
function keet(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324E'; ctx.fillRect(0, 100, W, 600); ctx.fillStyle = '#2C3B57'; ctx.fillRect(0, 700, W, 200);
  ctx.strokeStyle = rgba(C.line, 0.18); ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(i * 130, 100); ctx.lineTo(i * 130, 700); ctx.stroke(); }
  roundRect(ctx, 1560, 190, 260, 200, 8); shape(ctx, '#141E33', rgba(C.line, 0.5), 3); ctx.strokeStyle = rgba(C.line, 0.5); ctx.beginPath(); ctx.moveTo(1690, 190); ctx.lineTo(1690, 390); ctx.moveTo(1560, 290); ctx.lineTo(1820, 290); ctx.stroke(); circ(ctx, 1770, 230, 14, '#E8E2C8');
  ctx.restore(); }
function tafel(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6A5444'; ctx.fillRect(300, 690, 1320, 22); ctx.fillStyle = '#5A4636'; ctx.fillRect(300, 712, 1320, 60); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(340, 772, 18, 70); ctx.fillRect(1560, 772, 18, 70); ctx.restore(); }
function laptop(ctx, x, y, w, a = 1, scherm) { if (a <= 0.01) return; const h = w * 0.62; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h, w, h, 12); shape(ctx, '#3A4458', '#5A6478', 2); roundRect(ctx, x - w / 2 + 16, y - h + 16, w - 32, h - 32, 6); shape(ctx, '#121A26', null);
  ctx.beginPath(); ctx.moveTo(x - w / 2 - 40, y + 26); ctx.lineTo(x + w / 2 + 40, y + 26); ctx.lineTo(x + w / 2, y); ctx.lineTo(x - w / 2, y); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 2);
  if (scherm) { ctx.save(); roundRect(ctx, x - w / 2 + 16, y - h + 16, w - 32, h - 32, 6); ctx.clip(); scherm(x - w / 2 + 16, y - h + 16, w - 32, h - 32); ctx.restore(); } ctx.restore(); }
// staafjes wolven met DNA aangetoond (BIJ12): 2024 101, 2025 131
function wolvenStaven(ctx, x, y, w, h, o = {}) { const { a = 1, a24 = 1, a25 = 1, px = 34 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w * 0.26, sc = h / 150;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  [[0.22, 101, '2024', a24], [0.62, 131, '2025', a25]].forEach(([u, v, j, aa]) => { if (aa <= 0.01) return; ctx.save(); ctx.globalAlpha *= aa; const bx = x + w * u, bh = v * sc * aa; roundRect(ctx, bx, y + h - bh, bw, bh, 6); shape(ctx, rgba(C.paars, 0.55), C.paars, 2);
    text(ctx, String(v), bx + bw / 2, y + h - bh - 14, fTekst(px, 800), C.text, 'center'); text(ctx, j, bx + bw / 2, y + h + px + 6, fMeta(Math.max(22, px * 0.75)), C.text2, 'center'); ctx.restore(); });
  ctx.restore(); }
// 14 roedels in 2025 (ligging schematisch, verdeling volgens NOS 9 apr 2026: 7 Veluwe, 4 Drenthe, 2 Gelderse Vallei, 1 Utrechtse Heuvelrug); de eerste = het roedel van 2019
const EC_ROEDELS = [[5.86, 52.24], [5.98, 52.16], [5.70, 52.17], [5.80, 52.07], [5.66, 52.30], [5.93, 52.30], [5.62, 52.10],
  [6.58, 52.86], [6.33, 52.97], [6.22, 52.86], [6.45, 52.74], [5.53, 52.15], [5.47, 52.03], [5.33, 52.06]];
function bergKaartje(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.fill, 0.85), rgba(C.line, 0.7), 1.5);
  ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); const by = y + 150; [[0.18, 90], [0.42, 120], [0.68, 100], [0.88, 80]].forEach(([u, hh]) => { const bx = x + u * w; ctx.beginPath(); ctx.moveTo(bx - hh, by); ctx.lineTo(bx, by - hh); ctx.lineTo(bx + hh, by); ctx.closePath(); ctx.fillStyle = C.berg; ctx.fill(); ctx.beginPath(); ctx.moveTo(bx - hh * 0.25, by - hh * 0.75); ctx.lineTo(bx, by - hh); ctx.lineTo(bx + hh * 0.25, by - hh * 0.75); ctx.closePath(); ctx.fillStyle = C.bergTop; ctx.fill(); });
  ctx.fillStyle = '#2F4A3A'; ctx.fillRect(x, by, w, 10); ctx.restore();
  metaA(ctx, 'ROEMEENSE KARPATEN', x + 24, y + 196, 1, C.grain, 'left', 22);
  text(ctx, '≈ 70 wolven (49–89)', x + 24, y + 246, fTekst(38, 700), C.text, 'left');
  text(ctx, 'één studiegebied van ± 1400 km²', x + 24, y + 292, fTekst(28, 400), C.text, 'left');
  metaA(ctx, 'IOSIF E.A. 2025', x + 24, y + 336, 1, C.text2, 'left', 22); ctx.restore(); }
// werkplek-icoon (lijnicoon in een afgerond vierkant): 'beheer' (boom), 'provincie' (gebouw), 'instituut' (microscoop)
function werkplekIcoon(ctx, x, y, soort, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70, y - 70, 140, 140, 20); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'beheer') { ctx.beginPath(); ctx.moveTo(x, y + 44); ctx.lineTo(x, y + 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 36, y + 10); ctx.lineTo(x, y - 44); ctx.lineTo(x + 36, y + 10); ctx.closePath(); ctx.stroke(); }
  if (soort === 'provincie') { ctx.beginPath(); ctx.moveTo(x - 44, y - 14); ctx.lineTo(x, y - 44); ctx.lineTo(x + 44, y - 14); ctx.closePath(); ctx.stroke(); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x + i * 26, y - 6); ctx.lineTo(x + i * 26, y + 34); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 46, y + 42); ctx.lineTo(x + 46, y + 42); ctx.stroke(); }
  if (soort === 'instituut') { ctx.beginPath(); ctx.moveTo(x - 30, y + 44); ctx.lineTo(x + 34, y + 44); ctx.moveTo(x - 4, y + 44); ctx.lineTo(x - 4, y + 22); ctx.moveTo(x - 14, y + 22); ctx.quadraticCurveTo(x + 30, y + 14, x + 18, y - 22); ctx.stroke(); ctx.save(); ctx.translate(x - 4, y - 18); ctx.rotate(-0.5); ctx.strokeRect(-9, -30, 18, 46); ctx.restore(); }
  text(ctx, naam, x, y + 112, fTekst(28, 600), C.text, 'center'); ctx.restore(); }
// zonsondergang boven de heide (recap): lage zon en warme lucht in vlakke banden (geen verloop)
function avondHeide(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [['#2A3350', 120], ['#3A3A58', 360], ['#5A4458', 520], ['#7A5250', 640]].forEach(([c, y0]) => { ctx.fillStyle = c; ctx.fillRect(0, y0, W, 760 - y0); });
  ctx.beginPath(); ctx.arc(1540, 700, 70, Math.PI, 0); ctx.fillStyle = '#E8A060'; ctx.fill(); ctx.fillStyle = '#2E3A36'; ctx.fillRect(0, 700, W, 200); heideRij(ctx, -40, W + 40, 706, 70, { seed: 9 }); ctx.restore(); }
// telroutes als stippen in Nederland. (nederland() in ec_reeks.js test punten met isPointInPath zonder rekening te houden met de schaal van het canvas,
// waardoor in de speler maar één stip verschijnt; deze functie rekent de transformatie mee en laat nederland() ongemoeid.)
function nlStippen(ctx, M, n, o = {}) { const { a = 1, kl = C.goud, r = 4.5, seed = 160 } = o; if (a <= 0.01 || n <= 0) return; ctx.save(); ctx.globalAlpha *= a;
  const T = ctx.getTransform(), dev = (x, y) => [T.a * x + T.c * y + T.e, T.b * x + T.d * y + T.f];
  const nl = new Path2D(); NL_LONLAT.forEach(([lo, la], i) => { const [px, py] = M.xy(lo, la); i ? nl.lineTo(px, py) : nl.moveTo(px, py); }); nl.closePath();
  const ij = new Path2D(); NL_IJSSEL.forEach(([lo, la], i) => { const [px, py] = M.xy(lo, la); i ? ij.lineTo(px, py) : ij.moveTo(px, py); }); ij.closePath();
  const R = ecRng(seed); let k = 0, tries = 0; while (k < n && tries < 8000) { tries++; const lo = 3.4 + R() * 3.8, la = 50.8 + R() * 2.6, [px, py] = M.xy(lo, la), [dx, dy] = dev(px, py);
    if (ctx.isPointInPath(nl, dx, dy) && !ctx.isPointInPath(ij, dx, dy)) { circ(ctx, px, py, r, kl); k++; } }
  ctx.restore(); }

// ---------- WOLF uit de goedgekeurde dierenbibliotheek (hoofdsessie 25 okt 2026; vervangt wolfEc in deze film) ----------
// wolfBib(ctx, x, y, sEc, o): zelfde aanroep en maat als wolfEc (sEc = 1: schofthoogte ± 104 px), tekent wolf() uit lib_wolf.js
// (WolfPop, s = px per cm bij 80 cm schofthoogte). o: a, t (s), kijk, loop (0/1: lopen), draf, houding, ir (camerabeeld: grijs + wazig)
function wolfBib(ctx, x, y, sEc = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const houding = o.houding || (o.draf ? 'draven' : o.loop ? 'lopen' : 'staan'), f = houding === 'draven' ? 1.8 : 1.1;
  const fase = ((o.t || 0) * f) % 1;
  ctx.save(); if (o.ir) ctx.filter = 'grayscale(1) brightness(1.15) contrast(0.85) blur(1.1px)';
  wolf(ctx, x, y, sEc * 1.3, { houding, t: fase, kijk: o.kijk || 1, a, kopHoek: o.kopHoek || 0 });
  ctx.restore(); }
// camerabeeld zoals wildcameraBeeld (ec_reeks.js), maar met de bibliotheekwolf
function camBeeldEc1(ctx, x, y, w, h, o = {}) { const { a = 1, t = 0, n = 2, welp = 0, regel = '02:14 · IR · CAM 3' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 10, y - 10, w + 20, h + 54, 6); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#3C4440'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#4A524C'; ctx.fillRect(x, y + h * 0.55, w, h * 0.45);
  for (let i = 0; i < 14; i++) { ctx.fillStyle = rgba('#28302C', 0.9); ctx.beginPath(); ctx.ellipse(x + i * w / 13, y + h * 0.48, w * 0.06, h * 0.1 + (i % 3) * h * 0.03, 0, 0, 6.283); ctx.fill(); }
  for (let i = 0; i < 30; i++) { ctx.fillStyle = rgba('#7A8274', 0.3); ctx.fillRect(x + hash(i) * w, y + h * 0.6 + hash(i + 40) * h * 0.38, 24 + hash(i + 9) * 30, 2); }
  const s = w / 640;
  // stilstaande houdingen: een lopende wolf op één plek glijdt (C10.3); snuffelen en staan zijn bibliotheekhoudingen
  if (n >= 1) wolfBib(ctx, x + w * 0.34, y + h * 0.9, s * 1.05, { t, houding: 'snuffelen', ir: 1 });
  if (n >= 2) wolfBib(ctx, x + w * 0.74, y + h * 0.86, s * 0.95, { t: t + 0.4, kijk: -1, ir: 1 });
  if (welp > 0.01) wolfBib(ctx, x + w * 0.55, y + h * 0.93, s * 0.5, { t: t + 0.6, a: welp, ir: 1 });
  ctx.fillStyle = 'rgba(30,40,34,0.18)'; ctx.fillRect(x, y, w, h);
  ctx.restore(); text(ctx, regel, x + 12, y + h + 32, fMeta(22), '#C8CCD0', 'left'); ctx.restore(); }
// Wat word jij? · Ecologie en natuurbeheer · Tellen in het veld — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas, voorstel, outfit veld). Micro alleen binnen een zoomcirkel (DNA in de keutel, eDNA in het ven), paars = DNA.
// Decor (heide, bosrand) alleen onder scènes die echt in het veld spelen (cold open, H1-begin, H2-begin, H3 keutel, recap). Elke scène staat er op t = 0.

const EC_PROF8 = ['A', 'B', 'A', 'C', 'A', null, 'B', 'C'];   // acht keutels: zeven profielen (A ×3, B ×2, C ×2) en één zonder profiel
function profielRij(ctx, x0, y, o = {}) { const { a = 1, buisA = 1, profA = 1, gap = 200, s = 1, pw = 150, ph = 110, groep = 0, leegHl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  EC_PROF8.forEach((L, i) => { const x = x0 + i * gap; monsterBuisje(ctx, x, y, s, { a: buisA, nr: String(i + 1), inhoud: 'keutel' });
    const py = y + 40 * s; if (profA > 0.01) dnaProfiel(ctx, x - pw / 2, py, pw, ph, L || 'A', { a: profA * clamp(profA * 8 - i, 0, 1), leeg: !L, hl: !L ? leegHl : 0, kl: L ? EC_PAARS[L] : '#5A6272' }); });
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) {
    // rechts: wat de film telt — een gemerkte vlinder, een pootafdruk en een DNA-profiel
    heideblauwtje(ctx, 1500, 360, 9, { zij: true, nr: '17' });
    pootafdrukWolf(ctx, 1260, 650, 13, -0.25, { kl: '#8A7A62' });
    dnaProfiel(ctx, 1500, 560, 260, 170, 'A', { label: false });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    bosrand(ctx, { x1: 1250, seed: 4 }); groveDen(ctx, 1420, FLOOR - 4, 560, { seed: 9 });
    heideGrond(ctx, { zand: 1 });
    wildcamera(ctx, 1422, 610, 4, { ir: 0.5 + 0.5 * Math.sin(t * 2) > 0.9 ? 1 : 0 });
    naamBij(ctx, 'wildcamera', '', 1480, 600, q.on('Hoeveel', 1), 'left');
    pootafdrukWolf(ctx, 1080, 858, 4, -0.4, { kl: '#6A5A44', hl: q.on('wolf', 1) });
    const D = q.on('Daan', 1, 0.3), B = q.on('Ecoloog', 1, 0.3);
    daan(ctx, 430, t, { a: D, uit: q.on('wolf', 1) > 0.5 && q.on('Bas', 1) < 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Daan', 'stagiair', 430, 386, D, 'center');
    bas(ctx, 780, t, { a: B, uit: q.on('lacht', 1) > 0.5 && q.on('Hoeveel', 1) < 0.5 ? 'lacht' : 'neutraal' });
    naamBij(ctx, 'Bas', 'ecoloog', 780, 348, B, 'center');
    // kaart van het gebied: de wolf woont ergens in het bos
    const K = q.on('Veluwe', 1);
    const P = gebiedKaart(ctx, 1380, 120, 470, 300, { a: K });
    vraagteken(ctx, P.bos[0] + 60, P.bos[1] + 70, q.on('Hoeveel', 1), 90);
    vraagteken(ctx, 1080, 640, q.on('denk', 1), 110); },

  // ---------- H1 Vangen, merken, terugvangen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord c: ze lezen sporen');
    // het antwoord: sporen → verschillende profielen
    const S = 1 - q.on('Maar', 1, 0.5);
    ecA(ctx, S, () => { wolfKeutel(ctx, 560, 480, 14); naamBij(ctx, 'sporen', '', 560, 600, 1, 'center'); pijl(ctx, 800, 480, 960, 480, C.line, 1, 4, 16);
      ['A', 'B', 'C'].forEach((L, i) => dnaProfiel(ctx, 1010 + i * 260, 400, 220, 160, L, { a: q.on('verschillende', 1, 0.4 + i * 0.2) }));
      naamBij(ctx, 'verschillende dieren', '', 1360, 640, q.on('dieren', 1), 'center'); });
    // daarna op de heide: Daan met een vlindernet, vlinders boven de bloeiende heide
    const H = q.on('Maar', 1, 0.6);
    ecA(ctx, H, () => { bosrand(ctx, { seed: 6 }); heideGrond(ctx, { seed: 8 });
      for (let i = 0; i < 9; i++) { const w = wander(i, t, 60, 0.35); heideblauwtje(ctx, 900 + i * 110 + w.x, 600 + (i % 3) * 50 + w.y, 1.0, { flap: 0.5 + 0.4 * Math.sin(t * 9 + i) }); }
      daan(ctx, 360, t, { pose: 'vasthouden', hold: holdNet });
      naamBij(ctx, 'Daan', '', 360, 386, 1, 'center');
      metaA(ctx, 'HEIDEBLAUWTJES · ± 3 CM', 1340, 540, q.on('heide', 1), C.grain, 'center', 24); });
    defKaart(ctx, 'populatie', 'alle individuen van één soort in één gebied', 1080, 230, 720, q.on('populatie', 1));
    tag(ctx, 'niet tellen, maar schatten', 1440, 470, C.goud, q.on('schat', 1), 'center', 34); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    // 1 merken: één vlinder groot, nummertje op de onderkant van de vleugel
    const nrA = q.on('nummertje', 1, 0.8), vl = q.on('vliegen', 1, 1.2);
    heideblauwtje(ctx, 300, 380 - 40 * ease(vl), 8, { zij: true, nr: nrA > 0.5 ? '17' : '', hl: q.on('nummertje', 1) * (1 - vl) });
    metaA(ctx, 'VERGROOT', 300, 470, 1, C.grain, 'center', 24);
    naamBij(ctx, 'nummer met stift', 'onderkant vleugel', 420, 330, nrA * (1 - q.on('Twee', 1)), 'left');
    mono(ctx, '40 gemerkt', 300, 580, q.on('veertig', 1), C.goud, 52);
    // 2 tweede vangst: 30 vlinders, 6 gemerkt (goud omrand)
    const V2 = q.on('Twee', 1), Z = q.on('Zes', 1);
    metaA(ctx, 'TWEE DAGEN LATER · 30 GEVANGEN', 930, 262, V2, C.grain, 'center', 24);
    vlinderRaster(ctx, 740, 310, 30, 6, 76, { a: V2, t, goud: Z > 0.5 ? [2, 7, 13, 16, 22, 27] : [] });
    mono(ctx, '6 gemerkt', 930, 700, Z, C.goud, 44);
    // 3 de verhouding: zes van dertig = een vijfde, dus ook een vijfde van alle vlinders
    const R1 = q.on('vijfde', 1), R2 = q.on('Dus', 1), T = q.on('tweehonderd', 1);
    regel(ctx, 'tweede vangst', 1360, 330, R1, C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 1360, 350, 420, 6 / 30 * R1, null, null, R1);
    mono(ctx, '6 / 30 = 1/5', 1570, 450, R1, C.text, 36);
    regel(ctx, 'alle vlinders', 1360, 530, R2, C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 1360, 550, 420, 0.2 * R2, null, null, R2);
    mono(ctx, T > 0.5 ? '40 / 200 = 1/5' : '40 / ?  = 1/5', 1570, 650, R2, T > 0.5 ? C.groen : C.text, 36);
    // 4 de som op het scherm
    const SC = q.on('scherm', 1);
    if (SC > 0.01) { ctx.save(); ctx.globalAlpha *= SC; roundRect(ctx, 400, 745, 1120, 115, 18); shape(ctx, rgba(C.fill, 0.92), C.goud, 2); ctx.restore(); }
    mono(ctx, 'aantal ≈ 40 × 30 ÷ 6 = 200', 960, 824, SC, C.text, 62);
    tag(ctx, 'vangen, merken en terugvangen', 960, 175, C.goud, q.on('heet', 1), 'center', 34); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    // een gemerkte en een ongemerkte vlinder: even makkelijk te vangen?
    const sc = q.on('schuw', 1, 1.4);
    heideblauwtje(ctx, 560 - 230 * ease(sc), 420 + 10 * ease(sc), 7, { zij: true, nr: '17', koraal: sc });
    heideblauwtje(ctx, 1000, 420, 7, { zij: true });
    naamBij(ctx, 'gemerkt', '', 560, 540, 1 - sc, 'center'); naamBij(ctx, 'niet gemerkt', '', 1000, 540, 1, 'center');
    text(ctx, '=', 780, 400, fTitel(96), C.groen, 'center');
    ecA(ctx, 1 - sc, () => chip(ctx, 'even makkelijk te vangen', 780, 260, C.groen, q.on('makkelijk', 1), 30));
    tag(ctx, 'na het merken schuw', 330, 250, C.koraal, sc, 'center', 32);
    kruis(ctx, 780, 380, 40, sc);
    // de som met een onbekende
    const S = q.on('schatting', 1);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; roundRect(ctx, 520, 680, 880, 110, 18); shape(ctx, rgba(C.fill, 0.92), C.line, 1.5); ctx.restore(); }
    mono(ctx, '40 × 30 ÷ ?  = ?', 960, 756, S, C.text, 60);
    vraagteken(ctx, 1500, 460, q.on('denk', 1), 130); },

  s08(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord b: de schatting wordt te hoog');
    const D3 = q.on('drie', 1);
    metaA(ctx, 'TWEEDE VANGST · 30', 360, 250, 1, C.grain, 'center', 24);
    vlinderRaster(ctx, 180, 300, 30, 6, 72, { t, goud: D3 > 0.5 ? [2, 13, 22] : [2, 7, 13, 16, 22, 27] });
    mono(ctx, D3 > 0.5 ? '3 gemerkt' : '6 gemerkt', 360, 690, 1, D3 > 0.5 ? C.koraal : C.goud, 44);
    regel(ctx, 'lijkt gemerkt', 820, 330, q.on('lijkt', 1), C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 820, 350, 420, lerp(0.2, 0.1, q.on('lijkt', 1)), null, null, q.on('lijkt', 1), C.koraal);
    mono(ctx, '3 / 30 = 1/10', 1030, 450, q.on('lijkt', 1), C.text, 36);
    const S = q.on('som', 1);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; roundRect(ctx, 200, 740, 820, 110, 18); shape(ctx, rgba(C.fill, 0.92), C.koraal, 2); ctx.restore(); }
    mono(ctx, '40 × 30 ÷ 3 = 400', 610, 816, S, C.koraal, 60);
    tag(ctx, '2 × te veel', 1030, 560, C.koraal, q.on('twee', 1), 'center', 32);
    // nieuwe, ongemerkte vlinders erbij: hetzelfde effect
    const N = q.on('Nieuwe', 1, 1.6);
    for (let i = 0; i < 5; i++) { const w = wander(i + 20, t, 10, 0.5), tx = 1380 + (i % 3) * 90 + w.x, ty = 230 + Math.floor(i / 3) * 80 + w.y; heideblauwtje(ctx, lerp(2000, tx, ease(N)), lerp(140, ty, ease(N)), 1.5, { a: clamp(N * 3, 0, 1), flap: 0.4 + 0.3 * Math.sin(t * 8 + i), koraal: 1 }); }
    naamBij(ctx, 'nieuw, zonder nummer', '', 1500, 410, q.on('nummer', 1), 'center', C.koraal);
    dichtIcoon(ctx, 1500, 610, 105, q.on('dicht', 1));
    naamBij(ctx, 'dicht', 'niemand erbij, niemand weg', 1500, 780, q.on('dicht', 1), 'center'); },

  // ---------- H2 Elke week dezelfde route ----------
  s09(ctx, t, q) { bg(ctx, 'schema');
    bosrand(ctx, { x1: 1150, seed: 2 }); heideGrond(ctx, { seed: 12 });
    const V = q.on('vrijwilliger', 1, 0.3);
    daan(ctx, 250, t, { h: 420 }); naamBij(ctx, 'Daan', '', 250, 392, 1, 'center');
    vrijwilliger(ctx, 520, t, { a: V, pose: 'vasthouden', hold: holdKlembord });
    naamBij(ctx, 'vrijwilliger', '', 520, 390, V, 'center');
    // de denkbeeldige doos vóór haar
    const DZ = q.on('doos', 1);
    telDoos(ctx, 660, 840, 360, 300, 230, 110, DZ);
    naamBij(ctx, '5 m breed', '', 840, 878, q.on('breed', 1), 'center');
    naamBij(ctx, '5 m vooruit', '', 1110, 700, q.on('vooruit', 1), 'left');
    metaA(ctx, 'NIET OP SCHAAL', 1010, 405, DZ, C.grain, 'center', 22);
    for (let i = 0; i < 3; i++) { const w = wander(i + 3, t, 30, 0.4); heideblauwtje(ctx, 760 + i * 110 + w.x, 650 - (i % 2) * 60 + w.y, 0.6, { a: DZ, flap: 0.5 + 0.4 * Math.sin(t * 9 + i) }); }
    // de route van bovenaf, in stukken van vijftig meter
    const RT = q.on('route', 1), k = clamp((t - q.at('route', 1)) / 14, 0, 1);
    routeKaart(ctx, 1240, 130, 620, 260, { a: RT, k, stukken: q.on('vijftig', 1), doos: q.on('doos', 1), hlStuk: q.on('vijftig', 1) > 0.5 ? Math.min(9, Math.floor(k * 10)) : -1 });
    metaA(ctx, '1 STREEPJE = 50 M', 1550, 430, q.on('vijftig', 1), C.grain, 'center', 22);
    zon(ctx, 1330, 520, 28, q.on('mooi', 1), t); klokje(ctx, 1460, 520, 36, 7 / 12, q.on('overdag', 1)); metaA(ctx, '10–17 UUR', 1460, 600, q.on('overdag', 1), C.grain, 'center', 22);
    tag(ctx, 'transect', 1550, 690, C.goud, q.on('transect', 1), 'center', 40); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const NL = q.on('duizenden', 1, 0.8);
    const NLM = nederland(ctx, 110, 150, 205, { a: 1 }); nlStippen(ctx, NLM, Math.round(140 * NL));
    metaA(ctx, 'TELROUTES (SCHEMATISCH)', 360, 790, NL, C.grain, 'center', 22);
    kaartjeEc(ctx, 700, 170, 600, 110, 'Netwerk Ecologische Monitoring', 'vrijwilligers tellen', { a: q.on('Netwerk', 1) });
    pijl(ctx, 1000, 290, 1000, 340, C.line, q.on('Centraal', 1), 3, 14);
    kaartjeEc(ctx, 700, 350, 600, 110, 'CBS', 'rekent de tellingen om', { a: q.on('Centraal', 1) });
    // een index, geen totaal
    const IX = q.on('index', 1);
    indexGrafiek(ctx, 790, 540, 480, 200, { a: IX, punten: 1, klein: true });
    metaA(ctx, '1992 = 100', 1040, 520, IX, C.grain, 'center', 22);
    naamBij(ctx, 'index', 'geen totaal', 1300, 600, q.on('index', 1), 'left');
    // een proefvlak: alles tellen in een vast vierkant
    const PV = q.on('proefvlak', 1);
    proefvlak(ctx, 1500, 260, 300, { a: PV, eitjes: q.on('alles', 1) });
    naamBij(ctx, 'proefvlak', 'voorbeeld', 1650, 230, PV, 'center');
    naamBij(ctx, 'eitjes op klokjesgentiaan', '', 1650, 650, q.on('alles', 1), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    vrijwilliger(ctx, 360, t, { pose: q.on('bloemen', 1) > 0.5 ? 'wijs' : 'vasthouden', hold: q.on('bloemen', 1) > 0.5 ? null : holdKlembord, uit: 'blij' });
    naamBij(ctx, 'vrijwilliger', '', 360, 390, 1, 'center');
    routeKaart(ctx, 720, 200, 1000, 460, { a: 1, k: 0.5 + 0.5 * Math.sin(t * 0.4), stukken: 1, bloemen: q.on('bloemen', 1), nieuw: q.on('mooiere', 1, 1.2) });
    naamBij(ctx, 'vaste route', '', 900, 330, 1, 'center');
    naamBij(ctx, 'mooiere route', 'langs de bloemen', 1260, 700, q.on('mooiere', 1), 'center', C.koraal);
    vraagteken(ctx, 1815, 470, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord a: nee, dan stijgt de telling');
    // twee staafjes: zelfde aantal vlinders, langs de bloemen zie je er meer
    const B = q.on('bloemen', 1), M = q.on('vlinders', 1);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(180, 640); ctx.lineTo(820, 640); ctx.stroke();
    roundRect(ctx, 250, 640 - 180, 160, 180, 8); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); text(ctx, 'vaste route', 330, 690, fTekst(30, 600), C.text, 'center');
    if (B > 0.01) { const h = 180 + 170 * M; ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 560, 640 - h, 160, h, 8); shape(ctx, rgba(C.koraal, 0.45), C.koraal, 2); text(ctx, 'langs de bloemen', 640, 690, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    metaA(ctx, 'GETELD', 180, 250, 1, C.grain, 'left', 24);
    tag(ctx, 'meer gezien, niet meer vlinders', 500, 790, C.koraal, q.on('niet', 1), 'center', 32);
    stempel(ctx, 360, 360, 'vergelijking klopt niet', C.koraal, q.on('vergelijking', 1), -0.08);
    // wat elk jaar hetzelfde blijft
    const S = [['route', 1050], ['doos', 1300], ['weer', 1550]];
    S.forEach(([w, x], i) => { const a = q.on(w, w === 'doos' ? 2 : 1); ecA(ctx, a, () => { roundRect(ctx, x - 100, 200, 200, 170, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
      if (w === 'route') { ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 70, 280); ctx.lineTo(x + 70, 280); ctx.stroke(); for (let k = 0; k <= 4; k++) { ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 70 + k * 35, 268); ctx.lineTo(x - 70 + k * 35, 292); ctx.stroke(); } }
      if (w === 'doos') telDoos(ctx, x - 50, 320, 70, 70, 34, 24, 1);
      if (w === 'weer') { zon(ctx, x - 30, 275, 22, 1, t); klokje(ctx, x + 40, 280, 26, 7 / 12, 1); }
      text(ctx, w, x, 350, fTekst(30, 600), C.text, 'center'); vink_(ctx, x + 80, 210, 18, 1); }); });
    defKaart(ctx, 'monitoring', 'steeds op dezelfde manier herhaald meten, zodat je een verandering kunt zien', 960, 470, 860, q.on('monitoring', 1)); },

  // ---------- H3 Sporen in plaats van dieren ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    // 1 het camerabeeld: hoeveel tegelijk, welpen, maar niet welke
    const CAM = 1 - q.on('Daarvoor', 1, 0.6);
    ecA(ctx, CAM, () => { camBeeldEc1(ctx, 300, 170, 900, 500, { t, n: 2, welp: q.on('welpen', 1) });
      tag(ctx, 'hoeveel tegelijk', 1460, 300, C.goud, q.on('tegelijk', 1), 'center', 34);
      tag(ctx, 'welpen?', 1460, 400, C.goud, q.on('welpen', 1), 'center', 34);
      vraagteken(ctx, 610, 360, q.on('wélke', 1), 80); vraagteken(ctx, 960, 380, q.on('wélke', 1), 80);
      tag(ctx, 'welke wolf?', 1460, 520, C.koraal, q.on('wélke', 1), 'center', 34); });
    // 2 Daan raapt met handschoenen een keutel op
    const DA = q.on('Daarvoor', 1, 0.5);
    ecA(ctx, DA, () => { heideGrond(ctx, { zand: 1, seed: 14, x1: 900 }); ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 820, 1100, 80);
      wolfKeutel(ctx, 640, 852, 3.6, { hl: q.on('keutel', 1) * (1 - q.on('cellen', 1)) }); ecBordje(ctx, 740, 860, 1, 1);
      daan(ctx, 400, t, { outfit: 'veldHand', pose: 'vasthouden', hold: holdBuisje });
      naamBij(ctx, 'Daan', 'met handschoenen', 400, 386, 1, 'center');
      naamBij(ctx, 'keutel', '', 640, 800, q.on('keutel', 1), 'center'); });
    // 3 zoom: cellen uit de darmwand, met DNA (paars)
    const Z = q.on('poep', 1, 0.8), DN = q.on('DNA', 1, 0.8);
    zoomCircle(ctx, 1150, 400, 250, 640, 840, 'VERGROOT · CEL UIT DE DARMWAND', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(890, 140, 520, 520);
      darmcellen(ctx, 1150, 400, 230, 1 - DN * 0.85, t);
      if (DN > 0.01) ecDNA(ctx, 940, 1360, 400, 16, { a: DN, fase: t * 0.3, herh: [[0.12, 0.3], [0.45, 0.6], [0.74, 0.9]], hl: q.on('DNA-profiel', 1) }); });
    naamBij(ctx, 'DNA', '', 1150, 470, DN, 'center', C.kernR);
    // 4 het lab maakt een profiel; BIJ12 regelt het
    kaartjeEc(ctx, 1500, 170, 390, 110, 'lab in Wageningen', 'maakt het profiel', { a: q.on('lab', 1) });
    dnaProfiel(ctx, 1575, 340, 240, 150, 'A', { a: q.on('DNA-profiel', 1) });
    metaA(ctx, 'ZIE DNA LEZEN', 1695, 530, q.on('lezen', 1), C.grain, 'center', 22);
    kaartjeEc(ctx, 1500, 580, 390, 110, 'BIJ12', 'voor de provincies', { a: q.on('BIJ12', 1) }); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'ÉÉN MAAND · ACHT KEUTELS', 960, 200, 1, C.grain, 'center', 26);
    profielRij(ctx, 260, 420, { buisA: 1, profA: q.on('profielen', 1, 1.6) });
    vraagteken(ctx, 960, 790, q.on('Hoeveel', 1), 110); },

  s17(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord c: minstens drie');
    profielRij(ctx, 300, 300, { s: 0.8, pw: 140, ph: 100, gap: 190, leegHl: q.on('levert', 1) });
    chip(ctx, 'oud of nat: DNA valt uit elkaar', 1250, 500, C.koraal, q.on('natte', 1), 26);
    // drie wolven (A, B, C) en één die niets achterliet
    const W3 = q.on('drie', 1);
    ['A', 'B', 'C'].forEach((L, i) => { const x = 280 + i * 230, a = clamp(W3 * 3 - i, 0, 1); wolfBib(ctx, x, 720, 1.1, { a, t: t + i * 0.3, kijk: 1 }); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, L, x, 590, fTekst(36, 800), EC_PAARS[L], 'center'); ctx.restore(); } });
    const N = q.on('niets', 1); wolfBib(ctx, 980, 720, 1.1, { a: 0.35 * N, t: t + 0.5 }); vraagteken(ctx, 980, 600, N, 64);
    naamBij(ctx, 'niets gevonden', 'telt niet mee', 980, 790, N, 'center');
    haak(ctx, 200, 760, 760, 'minstens 3', C.groen, q.on('minimum', 1));
    // één jonge wolf die verder trekt: één profiel is genoeg
    const J = q.on('jonge', 1, 0.8), k = clamp((t - q.at('jonge', 1)) / 4.5, 0, 1);
    ecA(ctx, J, () => { const M = nederland(ctx, 1300, 450, 125, { a: 1 });
      const path = [[7.05, 52.35], [6.5, 52.3], [6.1, 52.15], [5.7, 52.2], [5.3, 52.05]].map(([lo, la]) => M.xy(lo, la));
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); const n = k * (path.length - 1); for (let i = 0; i <= Math.floor(n); i++) i ? ctx.lineTo(...path[i]) : ctx.moveTo(...path[i]);
      const i0 = Math.min(path.length - 2, Math.floor(n)), f = n - i0, cur = [lerp(path[i0][0], path[i0 + 1][0], f), lerp(path[i0][1], path[i0 + 1][1], f)]; ctx.lineTo(...cur); ctx.stroke(); ctx.setLineDash([]);
      wolfBib(ctx, cur[0], cur[1] - 4, 0.32, { t, loop: k < 1 ? 1 : 0, kijk: -1 });
      monsterBuisje(ctx, path[2][0], path[2][1] + 4, 0.4, { a: q.on('keutel', 3), dop: '#E0B64A' });
      dnaProfiel(ctx, 1640, 520, 150, 100, 'D', { a: q.on('achterlaat', 1) });
      stempel(ctx, 1715, 700, 'telt mee', C.groen, q.on('telt', 2), -0.1); }); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    // 1 een DNA-profiel als merkteken dat de wolf zelf achterlaat
    const TW = q.at('water', 1), E = 1 - clamp((t - (TW - 0.45)) / 0.3, 0, 1);
    ecA(ctx, E, () => {
      heideblauwtje(ctx, 280, 380, 7, { zij: true, nr: '17' }); naamBij(ctx, 'merkteken', 'met stift', 280, 520, 1, 'center');
      text(ctx, '≈', 470, 390, fTitel(90), C.goud, 'center');
      dnaProfiel(ctx, 560, 290, 220, 140, 'A', { hl: q.on('merkteken', 1) });
      naamBij(ctx, 'merkteken', 'laat de wolf zelf achter', 670, 520, q.on('merkteken', 1), 'center');
      const L = q.on('later', 1);
      dnaProfiel(ctx, 560, 590, 220, 140, 'A', { a: L, hl: q.on('teruggevangen', 1) });
      vink_(ctx, 830, 660, 26, q.on('teruggevangen', 1));
      tag(ctx, 'teruggevangen', 1000, 680, C.groen, q.on('teruggevangen', 1), 'center', 32);
      bergKaartje(ctx, 1200, 200, 620, 360, q.on('Roemeense', 1));
      metaA(ctx, 'GENETISCH VANGEN EN TERUGVANGEN', 1510, 610, q.on('Roemeense', 1), C.grain, 'center', 22); });
    // 2 water uit het ven: omgevings-DNA
    const V = clamp((t - (TW - 0.1)) / 0.35, 0, 1);
    ecA(ctx, V, () => { heideGrond(ctx, { seed: 15, x1: 1000 }); ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 800, 1000, 100);
      ven(ctx, 420, 760, 300, 70, { hl: q.on('ven', 2) });
      daan(ctx, 830, t, { pose: 'vasthouden', hold: holdFles }); naamBij(ctx, 'Daan', '', 830, 386, 1, 'center');
      const Z = q.on('omgevings-DNA', 1, 0.8);
      zoomCircle(ctx, 1420, 380, 240, 420, 740, 'VERGROOT · LOSSE STUKJES DNA IN WATER', q.on('zit', 1), () => { ctx.fillStyle = rgba(C.teal, 0.25); ctx.fillRect(1170, 130, 500, 500); dnaStukjes(ctx, 1420, 380, 130, 140, 6, 1, t); });
      naamBij(ctx, 'omgevings-DNA', '', 1420, 118, Z, 'center', C.kernR);
      kaartjeEc(ctx, 1220, 700, 400, 110, 'wel of niet hier: ja', '', { a: q.on('verraadt', 1), col: C.groen, px: 30 });
      ecA(ctx, q.on('hoeveel', 2), () => { roundRect(ctx, 1640, 700, 240, 110, 14); shape(ctx, rgba(C.fill, 0.85), C.koraal, 2); text(ctx, 'hoeveel?', 1700, 768, fTekst(30, 700), C.text, 'left'); kruis(ctx, 1672, 755, 14, 1); }); }); },

  // ---------- H4 Van telling naar trend ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); keet(ctx);
    daan(ctx, 600, t, { kijk: 1, uit: q.on('concluderen', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Daan', '', 600, 386, 1, 'center');
    bas(ctx, 1330, t, { outfit: 'gewoon' }); naamBij(ctx, 'Bas', '', 1330, 348, 1, 'center');
    tafel(ctx);
    laptop(ctx, 960, 690, 540, 1, (x, y, w, h) => { metaText(ctx, 'met DNA aangetoond · BIJ12', x + w / 2, y + 44, C.grain, 'center', 20);
      wolvenStaven(ctx, x + 60, y + 80, w - 120, h - 150, { a24: q.on('2024', 1), a25: q.on('2025', 1), px: 30 }); });
    vraagteken(ctx, 960, 270, q.on('concluderen', 1), 110); },

  s21(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord b: er is misschien meer gezocht');
    metaA(ctx, 'WOLVEN MET DNA AANGETOOND · BIJ12', 430, 240, 1, C.grain, 'center', 22);
    wolvenStaven(ctx, 150, 280, 560, 340, { px: 36 });
    chip(ctx, 'minstens 131', 560, 712, C.goud, q.on('minstens', 1), 30);
    loep(ctx, 860, 400, 60, q.on('Zoek', 1)); tag(ctx, 'meer gezocht?', 880, 560, C.koraal, q.on('Zoek', 1), 'center', 30);
    tag(ctx, 'meer monsters?', 880, 640, C.koraal, q.on('monsters', 1), 'center', 30);
    kaartjeEc(ctx, 150, 762, 640, 110, 'totaal: niet te zeggen', 'BIJ12', { a: q.on('zeggen', 1), col: C.koraal });
    // roedels: van één in 2019 naar naar schatting veertien
    const R = q.on('roedels', 1), V = q.on('veertien', 1), VL = q.on('Veluwe', 1);
    const M = nederland(ctx, 1150, 150, 230, { a: R });
    if (R > 0.01) EC_ROEDELS.forEach((p, i) => { const a = i === 0 ? R : clamp(V * 14 - i, 0, 1); if (a <= 0.01) return; const [x, y] = M.xy(p[0], p[1]); ctx.save(); ctx.globalAlpha *= a;
      circ(ctx, x, y, 11, rgba(C.groen, 0.25), i < 7 && VL > 0.5 ? C.goud : C.groen, 2.5); circ(ctx, x, y, 5, i < 7 && VL > 0.5 ? C.goud : C.groen); ctx.restore(); });
    mono(ctx, V > 0.5 ? '2025: 14 roedels' : '2019: 1 roedel', 1450, 120 + 0, R, C.text, 40);
    metaA(ctx, 'NAAR SCHATTING · LIGGING SCHEMATISCH', 1430, 840, V, C.grain, 'center', 20);
    naamBij(ctx, 'Veluwe', '7 roedels', 1600, 560, VL, 'left', C.goud); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'DAGVLINDERS · INDEX (1992 = 100) · CBS', 260, 170, 1, C.grain, 'left', 22);
    const G = indexGrafiek(ctx, 260, 210, 1160, 500, { punten: 1, hl2024: q.on('2024', 1), trend: q.on('richting', 1, 2.5), band: q.on('marge', 1) });
    naamBij(ctx, '2024: laagste jaar', '', G.X(32) - 10, G.Y(40.83) + 60, q.on('2024', 1), 'right', C.koraal);
    tag(ctx, 'één jaar is nog geen trend', 1660, 300, C.koraal, q.on('slecht', 1), 'center', 30);
    naamBij(ctx, 'trend', '', G.X(32) + 30, G.Y(43.85) - 10, q.on('richting', 1), 'left', C.groen);
    naamBij(ctx, 'marge', '', G.X(4) + 20, G.Y(96) - 30, q.on('marge', 1), 'left', C.groen);
    chip(ctx, 'ruim de helft minder', 1660, 470, C.groen, q.on('helft', 1), 30);
    kaartjeEc(ctx, 1500, 620, 340, 110, 'Toeval of echt?', 'film over de marge', { a: q.on('Toeval', 1) }); },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); avondHeide(ctx);
    daan(ctx, 380, t, { pose: 'vasthouden', hold: holdBoekje, uit: q.on('Toch', 1) > 0.5 ? 'blij' : 'neutraal' }); naamBij(ctx, 'Daan', '', 380, 386, 1, 'center');
    // drie kaartjes: wat Daan vandaag deed
    ecA(ctx, 1, () => { [[860, 'vangen en merken'], [1180, 'telroute'], [1500, 'DNA uit keutels']].forEach(([x, s2], i) => { roundRect(ctx, x, 150, 280, 200, 16); shape(ctx, rgba(C.fill, 0.9), i === 2 ? C.paars : C.line, i === 2 && q.on('DNA-profiel', 1) > 0.5 ? 3 : 1.5); text(ctx, s2, x + 140, 330, fTekst(26, 600), C.text, 'center'); });
      heideblauwtje(ctx, 1000, 270, 4, { zij: true, nr: '17' });
      ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1220, 250); ctx.lineTo(1420, 250); ctx.stroke(); telDoos(ctx, 1300, 268, 40, 40, 20, 14, 1);
      wolfKeutel(ctx, 1570, 260, 2.2); dnaProfiel(ctx, 1640, 190, 110, 100, 'A', { label: false }); });
    // het notitieboek
    const N = q.on('schrijft', 1);
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 760, 420, 1060, 220, 14); shape(ctx, '#F2EEE4', '#C8C0B0', 2);
      ctx.strokeStyle = '#C8C0B0'; ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(800, 500 + i * 60); ctx.lineTo(1780, 500 + i * 60); ctx.stroke(); }
      const k1 = clamp((t - q.at('schrijft', 1) - 0.6) / 2.5, 0, 1), k2 = clamp((t - q.at('getal', 1) + 0.3) / 1.4, 0, 1), s1 = 'minstens drie wolven in ons gebied.', s2 = 'Een getal is een schatting.';
      text(ctx, s1.slice(0, Math.round(s1.length * k1)), 810, 490, `italic 600 46px ${F.tekst}`, '#1A2740', 'left');
      text(ctx, s2.slice(0, Math.round(s2.length * k2)), 810, 560, `italic 600 46px ${F.tekst}`, '#1A2740', 'left'); ctx.restore(); }
    chip(ctx, 'elk nieuw profiel = een wolf', 1290, 720, C.paars, q.on('DNA-profiel', 1) * (1 - N), 30);
    chip(ctx, 'minstens zoveel', 1290, 800, C.goud, q.on('minstens', 1) * (1 - N), 30); },

  s24(ctx, t, q) { bg(ctx, 'schema');
    daan(ctx, 300, t, { pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Daan', '', 300, 386, 1, 'center');
    kaartjeEc(ctx, 620, 170, 560, 110, 'Bos- en natuurbeheer', 'hbo · Velp · 4 jaar', { a: q.on('hbo', 1) });
    kaartjeEc(ctx, 1240, 170, 560, 110, 'Biologie', 'wo-bachelor · Nijmegen', { a: q.on('biologie', 1) });
    kaartjeEc(ctx, 620, 310, 560, 110, 'Bos- en natuurbeheer', 'wo-bachelor · Wageningen', { a: q.on('Wageningen', 1) });
    kaartjeEc(ctx, 1240, 310, 560, 110, 'mbo', 'bij een groene school', { a: q.on('mbo', 1) });
    werkplekIcoon(ctx, 820, 600, 'beheer', 'natuurbeheerder', q.on('natuurbeheerder', 1));
    werkplekIcoon(ctx, 1210, 600, 'provincie', 'provincie', q.on('provincie', 1));
    werkplekIcoon(ctx, 1600, 600, 'instituut', 'onderzoeksinstituut', q.on('onderzoeksinstituut', 1, 0.4)); }
});
