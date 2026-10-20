
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
// Wat word jij? · Farmacie en Verpleegkunde 1 · Van pil tot plek en weer terug — eigen tekeningen (20 okt 2026)

const PIL = { bd: '#E07A8F', bdR: '#F4A6B4', pa: '#F2F2EE', paR: '#C9CED6', sim: '#C9A35C', nitro: '#E0B64A' };

// capsule (bloeddrukpil): twee helften
function capsule(ctx, x, y, s = 1, c1 = PIL.bd, c2 = '#F2F2EE', rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.save(); ctx.clip(); ctx.fillStyle = c1; ctx.fillRect(-26, -11, 26, 22); ctx.fillStyle = c2; ctx.fillRect(0, -11, 26, 22); ctx.restore();
  roundRect(ctx, -26, -11, 52, 22, 11); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 1.5 / s; ctx.stroke(); ctx.restore(); }
// rond tablet (paracetamol) met breukgleuf
function tablet(ctx, x, y, r = 12, a = 1, col = PIL.pa) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, col, PIL.paR, 1.5); ctx.strokeStyle = PIL.paR; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y); ctx.lineTo(x + r * 0.6, y); ctx.stroke(); ctx.restore(); }
// strip paracetamol (blister met n tabletten)
function blister(ctx, x, y, n = 4, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 70, n * 46 + 16, 8); shape(ctx, '#C9D2DE', '#8FA0B5', 2);
  for (let i = 0; i < n; i++) { circ(ctx, x + 35, y + 31 + i * 46, 18, rgba('#FFFFFF', 0.35), '#8FA0B5', 1.5); tablet(ctx, x + 35, y + 31 + i * 46, 12); } ctx.restore(); }

// pillendoos: 7 dagen × 3 momenten; bd = aantal dagen met een bloeddrukpil (ochtend, mag fractie), pa = paracetamol-vakjes (per dag ochtend/middag/avond)
const DAGEN = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
function pillendoos(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { bd = 0, pa = 0, labels = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const cw = w / 7, rh = cw * 0.66, h = rh * 3;
  roundRect(ctx, x - 10, y - 44, w + 20, h + 56, 14); shape(ctx, '#3E6E9A', '#5B8CC9', 2);
  DAGEN.forEach((d, i) => text(ctx, d, x + cw * (i + 0.5), y - 12, fTekst(24, 700), '#E8EEF4', 'center'));
  for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const cx = x + i * cw + 4, cy = y + r * rh + 4; roundRect(ctx, cx, cy, cw - 8, rh - 8, 8); shape(ctx, rgba('#DDE8F2', 0.85), '#9AB4CC', 1.5);
    const mx = cx + (cw - 8) / 2, my = cy + (rh - 8) / 2;
    if (r === 0) { const f = clamp(bd - i, 0, 1); if (f > 0.01) capsule(ctx, mx - 8 * (pa > 0 ? 1 : 0), my - (1 - f) * 30, cw / 110, PIL.bd, '#F2F2EE', 0.5, f); }
    const fp = clamp(pa - i, 0, 1); if (fp > 0.01) tablet(ctx, mx + (r === 0 ? 14 : 0), my - (1 - fp) * 30, cw / 7.5, fp); }
  if (labels) ['ochtend', 'middag', 'avond'].forEach((s2, r) => metaText(ctx, s2, x - 22, y + r * rh + rh / 2 + 8, C.text2, 'right', 18));
  ctx.restore(); }

// tafel (bovenblad + voorkant) die de benen afdekt
function tafel(ctx, y = 650, x0 = 260, x1 = 1660) { ctx.fillStyle = '#7A5C44'; roundRect(ctx, x0, y, x1 - x0, 22, 6); ctx.fill(); ctx.fillStyle = '#5E4636'; ctx.fillRect(x0 + 20, y + 22, x1 - x0 - 40, 880 - y - 22); ctx.fillStyle = rgba('#000000', 0.12); ctx.fillRect(x0 + 20, y + 22, x1 - x0 - 40, 10); }

// maag (vooraanzicht): bonenvorm met slokdarm bovenaan en uitgang rechtsonder
function maag(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-30, -190); ctx.lineTo(10, -190); ctx.lineTo(20, -120); ctx.bezierCurveTo(60, -100, 130, -60, 120, 20); ctx.bezierCurveTo(110, 70, 150, 90, 200, 80);
  ctx.lineTo(205, 125); ctx.bezierCurveTo(120, 150, 40, 170, -40, 150); ctx.bezierCurveTo(-150, 120, -170, -10, -120, -90); ctx.bezierCurveTo(-90, -130, -40, -120, -30, -190); ctx.closePath();
  shape(ctx, rgba('#D99A8A', 0.35), '#E3A89A', 3); ctx.strokeStyle = rgba('#E3A89A', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.quadraticCurveTo(-20, 40, 100, 100); ctx.stroke(); ctx.restore(); }
// dunne darm als kronkelende buis (vier rijen met bochten)
function dunneDarm(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(-170, -105); for (let k = 0; k < 4; k++) { const yy = -105 + k * 70; if (k % 2 === 0) { ctx.lineTo(140, yy); if (k < 3) ctx.arc(140, yy + 35, 35, -Math.PI / 2, Math.PI / 2, false); } else { ctx.lineTo(-140, yy); if (k < 3) ctx.arc(-140, yy + 35, 35, -Math.PI / 2, Math.PI / 2, true); } } ctx.lineTo(-180, 105); };
  pad(); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 46; ctx.stroke(); pad(); ctx.strokeStyle = '#E8B4A6'; ctx.lineWidth = 32; ctx.stroke(); ctx.restore(); }

// een rij darmcellen langs een cirkelboog (de darm is rond): centrum (cx, cy), binnenrand R (darmholte), diepte d
function darmBoog(ctx, cx, cy, R, a0, a1, n, d = 200, a = 1, o = {}) { if (a <= 0.01) return; const { bloed = true, mv = true } = o; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const da = (a1 - a0) / n, gap = 0.004;
  if (bloed) { ctx.beginPath(); ctx.arc(cx, cy, R + d + 34, a0, a1); ctx.arc(cx, cy, R + d + 96, a1, a0, true); ctx.closePath(); shape(ctx, rgba('#B23A3A', 0.35), rgba('#D8573F', 0.7), 2); }
  for (let i = 0; i < n; i++) { const b0 = a0 + i * da + gap, b1 = b0 + da - 2 * gap;
    const sec = (r0, r1, g) => { ctx.beginPath(); ctx.arc(cx, cy, r0 + g, b0 + g / R, b1 - g / R); ctx.arc(cx, cy, r1 - g, b1 - g / R, b0 + g / R, true); ctx.closePath(); };
    sec(R, R + d, 0); shape(ctx, rgba('#D99A8A', 0.22), C.er, 2.5); sec(R, R + d, 7); ctx.strokeStyle = rgba(C.er, 0.55); ctx.lineWidth = 1.2; ctx.stroke();
    if (mv) { ctx.strokeStyle = rgba(C.er, 0.7); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let k = 1; k < 8; k++) { const an = b0 + (b1 - b0) * k / 8; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); ctx.lineTo(cx + Math.cos(an) * (R - 22), cy + Math.sin(an) * (R - 22)); ctx.stroke(); } }
    const am = (b0 + b1) / 2, kr = R + d * 0.6; ctx.beginPath(); ctx.ellipse(cx + Math.cos(am) * kr, cy + Math.sin(am) * kr, 22, 26, am, 0, 6.283); shape(ctx, rgba(C.kern, 0.7), C.kernR, 1.2); }
  ctx.restore(); }
// punt op een cirkel
const opBoog = (cx, cy, R, an) => [cx + Math.cos(an) * R, cy + Math.sin(an) * R];
const hoekVoorX = (cx, cy, R, x) => Math.PI / 2 - Math.asin((x - cx) / R); // hoek (onderkant van de cirkel) bij een gegeven x

// dubbel laagje vet (fosfolipiden) langs een boog; koppen = bolletjes, staarten = lijntjes naar het midden
function dubbelLaag(ctx, cx, cy, R, a0, a1, dik = 110, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, R + 12, a0, a1); ctx.arc(cx, cy, R + dik - 12, a1, a0, true); ctx.closePath(); ctx.fillStyle = rgba(C.oker, 0.16); ctx.fill();
  const n = Math.round((a1 - a0) * R / 26); ctx.lineCap = 'round';
  for (let i = 0; i <= n; i++) { const an = a0 + (a1 - a0) * i / n, w = Math.sin(t * 1.3 + i * 0.7) * 1.5;
    for (const [r0, r1] of [[R, R + dik * 0.46], [R + dik, R + dik * 0.54]]) { const [hx, hy] = opBoog(cx, cy, r0 + w, an); ctx.strokeStyle = rgba(C.oker, 0.85); ctx.lineWidth = 2.5;
      for (const off of [-0.0035, 0.0035]) { const [p, q2] = opBoog(cx, cy, r0 + (r1 > r0 ? 8 : -8), an + off), [e, f] = opBoog(cx, cy, r1, an + off * 1.4); ctx.beginPath(); ctx.moveTo(p, q2); ctx.lineTo(e, f); ctx.stroke(); }
      circ(ctx, hx, hy, 10, '#E8C27A', '#F2D8A0', 1.2); } }
  ctx.restore(); }

// vetoplosbare stof: zigzagketen (oker); wateroplosbare stof: blauwgroene ring met watermoleculen eromheen
function vetStof(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#F0C060'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const px = -50 + i * 20, py = i % 2 ? -8 : 8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); hexagon(ctx, 62, 0, 16, rgba('#F0C060', 0.4), '#F0C060', 3); ctx.restore(); }
function waterStof(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  hexagon(ctx, -14, 0, 18, rgba(C.teal, 0.45), C.teal, 3); hexagon(ctx, 18, 0, 18, rgba(C.teal, 0.45), C.teal, 3, 0);
  for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + t * 0.6, r = 46; circ(ctx, Math.cos(an) * r * 1.2, Math.sin(an) * r, 6, rgba('#8FC4E8', 0.8)); } ctx.restore(); }

// lever (vooraanzicht) en hart
function leverVorm(ctx, x, y, s = 1, a = 1, dimK = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - dimK * 0.6); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-210, -40); ctx.bezierCurveTo(-200, -120, -40, -130, 120, -110); ctx.bezierCurveTo(220, -95, 240, -50, 200, -20); ctx.bezierCurveTo(140, 30, 40, 80, -60, 110); ctx.bezierCurveTo(-170, 130, -220, 60, -210, -40); ctx.closePath();
  shape(ctx, rgba('#8C3A30', 0.75), '#C0605A', 3); ctx.strokeStyle = rgba('#E09A90', 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-10, -120); ctx.quadraticCurveTo(10, -20, -30, 100); ctx.stroke(); ctx.restore(); }
function hart(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; const p = 1 + 0.04 * Math.max(0, Math.sin(t * 6)); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-90, 0, -80, -70, -35, -70); ctx.bezierCurveTo(-10, -70, 0, -50, 0, -40); ctx.bezierCurveTo(0, -50, 10, -70, 35, -70); ctx.bezierCurveTo(80, -70, 90, 0, 0, 60); ctx.closePath(); shape(ctx, rgba('#D8573F', 0.8), '#F08A70', 2.5); ctx.restore(); }
// klein molecuul (twee ringen); geknipt = twee losse stukjes die uit elkaar drijven
function molecuul(ctx, x, y, s = 1, col = PIL.bd, a = 1, knip = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = knip * 16;
  if (knip < 0.05) { ctx.strokeStyle = col; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 9 * s, y); ctx.lineTo(x + 9 * s, y); ctx.stroke(); }
  hexagon(ctx, x - 11 * s - d, y - d * 0.4, 9 * s, rgba(col, knip > 0.05 ? 0.25 : 0.6), knip > 0.05 ? rgba(C.text2, 0.7) : col, 2); hexagon(ctx, x + 11 * s + d, y + d * 0.4, 9 * s, rgba(col, knip > 0.05 ? 0.25 : 0.6), knip > 0.05 ? rgba(C.text2, 0.7) : col, 2); ctx.restore(); }
// positie langs een polylijn, u 0..1
function padPos(path, u) { const L = []; let tot = 0; for (let i = 1; i < path.length; i++) { const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); L.push(d); tot += d; }
  let d = clamp(u, 0, 1) * tot, i = 0; while (i < L.length - 1 && d > L[i]) { d -= L[i]; i++; } const f = L[i] ? d / L[i] : 0; return [lerp(path[i][0], path[i + 1][0], f), lerp(path[i][1], path[i + 1][1], f)]; }
function vat(ctx, path, col, lw = 26, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.strokeStyle = rgba(col, 0.45); ctx.lineWidth = lw; ctx.stroke(); ctx.strokeStyle = rgba(col, 0.9); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// raster van 100 moleculen; weg = hoeveel er afgebroken zijn (grijs)
function honderd(ctx, x, y, weg, a = 1, col = PIL.bd, gap = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 100; i++) { const px = x + (i % 10) * gap, py = y + Math.floor(i / 10) * gap, k = clamp(weg - (99 - i), 0, 1); // de laatste in de lijst gaan eerst weg (onderaan)
    if (k > 0.5) { hexagon(ctx, px, py, 9, rgba(C.text2, 0.12), rgba(C.text2, 0.45), 1.5); } else hexagon(ctx, px, py, 11, rgba(col, 0.6), col, 1.8); }
  ctx.restore(); }

// spuitbus nitroglycerine (oromucosaal)
function sprayFles(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -34, -40, 68, 150, 14); shape(ctx, '#C9503C', '#E07A5F', 2); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-34, 0, 68, 50); ctx.fillStyle = '#C9503C'; ctx.fillRect(-22, 18, 44, 6);
  roundRect(ctx, -14, -78, 28, 40, 6); shape(ctx, '#E8E2D8', '#B8B0A0', 2); roundRect(ctx, -6, -74, 34, 12, 4); shape(ctx, '#E8E2D8', '#B8B0A0', 1.5); ctx.restore(); }
// tong (zijaanzicht) met bloedvaatjes aan de onderkant
function tongSchema(ctx, x, y, s = 1, a = 1, vaatjes = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // onderkaak / mondbodem
  ctx.beginPath(); ctx.moveTo(-260, 40); ctx.bezierCurveTo(-250, 150, 150, 170, 240, 60); ctx.lineTo(240, 110); ctx.bezierCurveTo(150, 220, -250, 210, -280, 80); ctx.closePath(); shape(ctx, rgba('#D99A8A', 0.3), '#C98A7A', 2.5);
  // tong (punt naar links, iets opgetild)
  ctx.beginPath(); ctx.moveTo(-230, -30); ctx.bezierCurveTo(-240, -110, -60, -140, 120, -110); ctx.bezierCurveTo(230, -90, 260, -10, 230, 40); ctx.bezierCurveTo(120, 60, 0, 30, -80, 30); ctx.bezierCurveTo(-170, 30, -220, 20, -230, -30); ctx.closePath(); shape(ctx, '#E39A98', '#F2B8B4', 3);
  ctx.strokeStyle = rgba('#B86A68', 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-180, -60); ctx.quadraticCurveTo(0, -100, 200, -50); ctx.stroke();
  if (vaatjes > 0.01) { ctx.globalAlpha *= vaatjes; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const x0 = -170 + i * 40, yy = 60 + (i % 3) * 14; ctx.strokeStyle = i % 2 ? '#5B7FC9' : '#D8573F'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.bezierCurveTo(x0 + 15, yy + 30, x0 + 35, yy + 10, x0 + 30, yy + 50); ctx.stroke(); } }
  ctx.restore(); }
function pleister(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -70, -50, 140, 100, 20); shape(ctx, '#E8D6B8', '#C9B48E', 2); roundRect(ctx, -36, -30, 72, 60, 10); shape(ctx, '#F2EEE4', '#C9B48E', 1.5); ctx.restore(); }
function injectie(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5); ctx.scale(s, s);
  roundRect(ctx, -70, -16, 120, 32, 6); shape(ctx, rgba('#DDE8F2', 0.6), '#9AB4CC', 2); ctx.fillStyle = rgba(C.teal, 0.6); ctx.fillRect(-20, -12, 66, 24); ctx.fillStyle = '#9AB4CC'; ctx.fillRect(-100, -4, 32, 8); ctx.fillRect(-106, -18, 8, 36);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(110, 0); ctx.stroke(); ctx.restore(); }
function zetpil(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, -22); ctx.lineTo(20, -22); ctx.quadraticCurveTo(70, -20, 76, 0); ctx.quadraticCurveTo(70, 20, 20, 22); ctx.lineTo(-50, 22); ctx.closePath(); shape(ctx, '#F2EAD0', '#C9B48E', 2); ctx.restore(); }

// bloedspiegelgrafiek: x0,y0 = linksboven van het plotvlak; o.curves = [{f, col, u, lw, a}], o.grens, o.xmax, o.ymax, o.xt (ticks), o.xlab
function spiegelGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, xmin = 0, xmax = 8, ymax = 100, xfmt = v => String(v), xt = [], yt = [], xlab = 'tijd (uur)', ylab = 'bloedspiegel', curves = [], grens = null, grensA = 0, grensLab = 'werkt', yHi = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const X = v => x + (v - xmin) / (xmax - xmin) * w, Y = v => y + h - v / ymax * h;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 20, y + h); ctx.stroke();
  for (const v of xt) { ctx.beginPath(); ctx.moveTo(X(v), y + h); ctx.lineTo(X(v), y + h + 10); ctx.stroke(); text(ctx, xfmt(v), X(v), y + h + 42, fTekst(28, 600), C.text2, 'center'); }
  for (const v of yt) { ctx.beginPath(); ctx.moveTo(x - 10, Y(v)); ctx.lineTo(x, Y(v)); ctx.stroke(); text(ctx, String(v), x - 18, Y(v) + 10, fTekst(28, 600), C.text2, 'right'); }
  metaText(ctx, xlab, x + w + 20, y + h + 84, C.grain, 'right', 22); metaText(ctx, ylab, x, y - 40, yHi > 0.5 ? C.goud : C.grain, 'left', 24);
  if (grens != null && grensA > 0.01) { ctx.save(); ctx.globalAlpha *= grensA; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(grens)); ctx.lineTo(x + w, Y(grens)); ctx.stroke(); ctx.setLineDash([]); text(ctx, grensLab, x + w + 14, Y(grens) + 10, fTekst(26, 700), C.groen, 'left'); ctx.restore(); }
  for (const c of curves) { const u = c.u == null ? 1 : c.u, ca = c.a == null ? 1 : c.a; if (u <= 0.001 || ca <= 0.01) continue; ctx.save(); ctx.globalAlpha *= ca; ctx.strokeStyle = c.col; ctx.lineWidth = c.lw || 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    const xa = c.x0 == null ? xmin : c.x0, x1 = xa + ((c.x1 == null ? xmax : c.x1) - xa) * u, N = 400; let last; for (let i = 0; i <= N; i++) { const xv = xa + (x1 - xa) * i / N, yv = c.f(xv); const px = X(xv), py = Y(clamp(yv, 0, ymax * 1.05)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); last = [px, py]; } ctx.stroke();
    if (c.punt && u < 0.999) circ(ctx, last[0], last[1], 8, c.col); ctx.restore(); }
  ctx.restore(); return { X, Y }; }

// nier met bloed erin en urine (druppels) eruit; uit = 0..1 hoeveel er wordt uitgescheiden
function nierFilter(ctx, x, y, s = 1, a = 1, t = 0, uit = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  vat(ctx, [[x - 260 * s, y - 40 * s], [x - 40 * s, y - 10 * s]], '#D8573F', 22 * s); vat(ctx, [[x - 40 * s, y + 20 * s], [x - 260 * s, y + 50 * s]], '#5B7FC9', 22 * s);
  nierVorm(ctx, x, y, 2.6 * s, -1, 1);
  ctx.strokeStyle = '#E0C860'; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 40 * s); ctx.quadraticCurveTo(x - 20 * s, y + 140 * s, x + 10 * s, y + 200 * s); ctx.stroke();
  for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; if (hash(i * 7 + 3) > uit) continue; const [px, py] = padPos([[x - 260 * s, y - 40 * s], [x - 60 * s, y - 12 * s], [x - 20 * s, y + 60 * s], [x - 10 * s, y + 140 * s], [x + 10 * s, y + 200 * s]], ph); molecuul(ctx, px, py, 0.8 * s, PIL.bd, 1); }
  ctx.restore(); }
// grapefruit (doorsnede)
function grapefruit(ctx, x, y, r = 70, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2B04A', '#E0943A', 3); circ(ctx, x, y, r * 0.86, '#F08A70', null);
  ctx.strokeStyle = '#FBD3C4'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.86, y + Math.sin(an) * r * 0.86); ctx.stroke(); } circ(ctx, x, y, r * 0.1, '#FBD3C4'); ctx.restore(); }
// staafje bloedspiegel (verticaal)
function spiegelStaaf(ctx, x, y, h, frac, col, lab, a = 1, max = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 70, h, 10); shape(ctx, '#2A3446', C.line, 1.5); const hh = h * clamp(frac, 0, 1); if (hh > 2) { roundRect(ctx, x, y + h - hh, 70, hh, 10); shape(ctx, rgba(col, 0.7), col, 2); }
  if (max != null) { ctx.setLineDash([8, 7]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 16, y + h - h * max); ctx.lineTo(x + 86, y + h - h * max); ctx.stroke(); ctx.setLineDash([]); }
  if (lab) text(ctx, lab, x + 35, y + h + 40, fTekst(26, 700), C.text2, 'center'); ctx.restore(); }
// bijsluiter (gevouwen papier) met een doorgestreepte grapefruit
function bijsluiter(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -140, 220, 280, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 6; i++) ctx.fillRect(-80, -110 + i * 22, 160 - (i % 3) * 30, 7); grapefruit(ctx, 0, 70, 46, 1); kruis(ctx, 0, 70, 44, 1); ctx.restore(); }
// medicijnkar (verpleegafdeling): kar met laatjes en bekertjes
function medicijnKar(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -300, 340, 280, 14); shape(ctx, '#DDE4EC', '#9AB4CC', 2.5);
  const kl = [C.teal, C.groen, C.oker, C.koraal]; for (let r = 0; r < 4; r++) for (let k = 0; k < 2; k++) { roundRect(ctx, -150 + k * 156, -280 + r * 64, 144, 52, 8); shape(ctx, '#F2F6FA', '#B8C8D8', 1.5); roundRect(ctx, -150 + k * 156 + 52, -262 + r * 64, 40, 10, 4); shape(ctx, kl[r], null); }
  roundRect(ctx, -190, -330, 380, 34, 10); shape(ctx, '#B8C8D8', '#9AB4CC', 2);
  for (let i = 0; i < 5; i++) { const bx = -140 + i * 70; ctx.beginPath(); ctx.moveTo(bx - 20, -370); ctx.lineTo(bx + 20, -370); ctx.lineTo(bx + 15, -330); ctx.lineTo(bx - 15, -330); ctx.closePath(); shape(ctx, rgba('#FFFFFF', 0.85), '#B8C8D8', 1.5); if (i % 2 === 0) tablet(ctx, bx - 4, -376, 7); else capsule(ctx, bx, -376, 0.45, PIL.bd, '#F2F2EE', 0.3); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(170, -300); ctx.lineTo(230, -340); ctx.stroke();
  circ(ctx, -130, 0, 20, '#3A4458', '#8FA0B5', 3); circ(ctx, 130, 0, 20, '#3A4458', '#8FA0B5', 3); ctx.restore(); }
// apotheekbalie
function balie(ctx, x0, x1, y = 640) { ctx.fillStyle = '#E8E2D4'; roundRect(ctx, x0, y, x1 - x0, 24, 6); ctx.fill(); ctx.fillStyle = '#3E6E7A'; ctx.fillRect(x0 + 14, y + 24, x1 - x0 - 28, 880 - y - 24); ctx.fillStyle = rgba('#FFFFFF', 0.15); ctx.fillRect(x0 + 14, y + 60, x1 - x0 - 28, 6); }
// icoontjes voor de route in de recap
function routeIcoon(ctx, soort, x, y, a = 1, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (0.35 + 0.65 * aan);
  if (soort === 'pil') capsule(ctx, x, y, 1.3, PIL.bd, '#F2F2EE', -0.4);
  else if (soort === 'darm') dunneDarm(ctx, x, y, 0.22);
  else if (soort === 'lever') leverVorm(ctx, x, y, 0.22);
  else if (soort === 'bloed') { ctx.beginPath(); ctx.moveTo(x, y - 32); ctx.bezierCurveTo(x + 28, y, x + 24, y + 30, x, y + 30); ctx.bezierCurveTo(x - 24, y + 30, x - 28, y, x, y - 32); shape(ctx, '#D8573F', '#F08A70', 2); }
  else if (soort === 'nier') nierVorm(ctx, x, y, 0.9, -1, 1);
  ctx.restore(); }
// Wat word jij? · Farmacie en Verpleegkunde · Van pil tot plek en weer terug — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Noor en Opa Henk aan tafel met de pillendoos; Apotheker Ravi in de recap).
// Rode draad: Noor vult de pillendoos van Opa Henk. 'De bloeddrukpil' = amlodipine (docentdeel).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
const PARA = C.teal;
// keuken: Noor en Opa Henk aan tafel met de pillendoos
function keuken(ctx, t, o = {}) { const { bd = 0, uitN = 'blij', uitH = 'neutraal', poseN = 'staan', poseH = 'staan', hold = null } = o;
  persoon(ctx, 'noor', 440, 880, 420, { t, kijk: 1, uit: uitN, pose: poseN, hold });
  persoon(ctx, 'henk', 1530, 880, 460, { t, kijk: -1, uit: uitH, pose: poseH });
  tafel(ctx, 650, 240, 1720); pillendoos(ctx, 700, 490, 520, o.doosA == null ? 1 : o.doosA, { bd }); }
// halveringscurves
const halfP = (x) => 100 * Math.pow(0.5, x / 2);
const bateman = (x) => 160 * (Math.exp(-0.3466 * x) - Math.exp(-2 * x));
const zaag = (d) => { let s = 0; for (let n = 0; n <= Math.floor(d + 1e-9); n++) s += 30 * Math.pow(0.5, (d - n) / 1.5); return s; };

Object.assign(SCENES, {
  title(ctx, t) { pillendoos(ctx, 1100, 650, 620, 1, { bd: 7, labels: false }); tablet(ctx, 1500, 560, 22); capsule(ctx, 1600, 575, 1.6, PIL.bd, '#F2F2EE', -0.3); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('verschil', 1);
    keuken(ctx, t, { bd: clamp((t - q.at('bloeddrukpil', 1) - 0.3) * 2.4, 0, 7), doosA: q.on('pillendoos', 1), poseN: 'staan', uitH: V > 0.5 ? 'denkt' : 'neutraal', poseH: 'staan' });
    const nm = q.on('Noor', 1) * (1 - q.on('bloeddrukpil', 1)); naamBij(ctx, 'Noor', '', 440, 420, nm, 'center'); naamBij(ctx, 'Opa Henk', '', 1530, 400, nm, 'center');
    blister(ctx, 1290, 440, 4, q.on('paracetamol', 1));
    chip(ctx, 'bloeddrukpil · 1× per dag', 960, 380, PIL.bd, q.on('één', 1), 28); chip(ctx, 'paracetamol · tot 4× per dag', 1330, 300, PARA, q.on('vier', 1), 28);
    vraagteken(ctx, 960, 250, V, 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('binnenkomen', 1, 0.8), D = q.on('Daarvoor', 1, 0.8), M = q.on('membraan', 1, 0.8);
    antwoord(ctx, 'Antwoord b', 1 - B);
    laag(ctx, 1 - B, () => { capsule(ctx, 700, 470, 3, PIL.bd, '#F2F2EE', -0.3); tablet(ctx, 1220, 470, 44);
      naamBij(ctx, 'bloeddrukpil', 'traag opgeruimd', 700, 600, q.on('opruimt', 1), 'center'); naamBij(ctx, 'paracetamol', 'snel opgeruimd', 1220, 600, q.on('opruimt', 1), 'center');
      chip(ctx, 'niet: hoe sterk · wel: hoe snel weg', 960, 330, C.goud, q.on('lichaam', 1), 28); });
    // maag en darm
    laag(ctx, ramp(t, q.at('binnenkomen', 1) + 0.9, 0.6) * (1 - D), () => { maag(ctx, 700, 380, 1, 1); dunneDarm(ctx, 1200, 660, 0.9, 1);
      naamBij(ctx, 'maag', '', 940, 260, q.on('maag', 1), 'left'); naamBij(ctx, 'dunne darm', '', 1200, 520, q.on('darm.', 1), 'center');
      const tv = q.at('valt', 1), fall = clamp((t - tv + 0.4) / 0.8, 0, 1), split = clamp((t - tv - 0.4) / 1.2, 0, 1), go = clamp((t - q.at('opgenomen', 1)) / 1.8, 0, 1);
      if (split < 0.05) capsule(ctx, 700, lerp(100, 400, ease(fall)), 1.6, PIL.bd, '#F2F2EE', -0.3 + fall);
      else for (let i = 0; i < 12; i++) { const w = wander(i, t, 10, 0.6), sx = 700 + (hash(i * 3) - 0.5) * 180 * split + w.x, sy = 410 + (hash(i * 5) - 0.5) * 120 * split + w.y, tx = 1050 + (i % 6) * 60, ty = 590 + Math.floor(i / 6) * 140;
        molecuul(ctx, lerp(sx, tx, ease(go - (i % 4) * 0.05)), lerp(sy, ty, ease(go - (i % 4) * 0.05)), 1.1, PIL.bd, 1); } });
    // darmcellen in een boog (de darm is rond)
    const cx = 960, cy = 2450, R = 2000;
    laag(ctx, D * (1 - M), () => { darmBoog(ctx, cx, cy, R, -Math.PI / 2 - 0.39, -Math.PI / 2 + 0.39, 6, 170, 1);
      tag(ctx, 'film: Van darm naar bloed', 960, 110, C.teal, 1, 'center', 26); naamBij(ctx, 'darmcellen', '', 960, 360, 1, 'center'); naamBij(ctx, 'darmholte', '', 960, 640, 1, 'center'); naamBij(ctx, 'bloed', '', 1500, 230, 1, 'center');
      for (let i = 0; i < 8; i++) { const ph = (t * 0.25 + hash(i * 7)) % 1, an = -Math.PI / 2 + (hash(i * 11) - 0.5) * 0.6, r = R - 260 + ph * 480; const [x, y] = opBoog(cx, cy, r, an); molecuul(ctx, x, y, 1, PIL.bd, clamp(1.5 - Math.abs(ph - 0.5) * 3, 0, 1)); } });
    // het membraan: dubbel laagje vet
    const mx = 960, my = 2700, MR = 2200;
    laag(ctx, M, () => { dubbelLaag(ctx, mx, my, MR, -Math.PI / 2 - 0.4, -Math.PI / 2 + 0.4, 130, 1, t);
      naamBij(ctx, 'membraan', 'dubbel laagje vet', 1450, 330, q.on('vet.', 1), 'center'); naamBij(ctx, 'darmholte', '', 300, 800, 1, 'center'); naamBij(ctx, 'in de darmcel', '', 300, 300, 1, 'center');
      tag(ctx, 'film: Diffusie en osmose', 960, 110, C.teal, q.on('dubbel', 1), 'center', 26);
      const tv = q.at('vet', 2), uv = clamp((t - tv) / 2.4, 0, 1); vetStof(ctx, 760, lerp(800, 330, ease(uv)) + Math.sin(t * 2) * 4, 1, q.on('vet', 2, 0.3));
      naamBij(ctx, 'lost op in vet', '', 760 + 100, lerp(800, 330, ease(uv)) + 10, q.on('vet', 2), 'left', '#F0C060');
      const tw = q.at('water', 1), uw = clamp((t - tw) / 1.6, 0, 1), yw = uw < 0.6 ? lerp(830, 720, ease(uw / 0.6)) : lerp(720, 790, ease((uw - 0.6) / 0.4)); waterStof(ctx, 1250, yw, 1, q.on('water', 1, 0.3), t);
      naamBij(ctx, 'lost alleen op in water', '', 1335, yw + 12, q.on('water', 1), 'left', C.teal); kruis(ctx, 1250, 650, 22, q.on('slecht', 1));
      chip(ctx, 'een goed medicijn lost ook in vet op', 960, 220, C.goud, q.on('ontwerpt', 1), 28); }); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('nitroglycerine', 1);
    const path = [[430, 690], [470, 610], [500, 520], [560, 440], [700, 360], [880, 330], [1060, 330]];
    dunneDarm(ctx, 430, 690, 0.7, 1); vat(ctx, path.slice(0, 5), '#7A6AB8', 26, 1); vat(ctx, path.slice(4), '#D8573F', 26, 1); leverVorm(ctx, 700, 360, 0.85, 1); hart(ctx, 1130, 330, 0.8, 1, t);
    pijl(ctx, 1210, 330, 1330, 330, '#D8573F', q.on('rest', 1), 5, 18);
    naamBij(ctx, 'dunne darm', '', 430, 810, 1, 'center'); naamBij(ctx, 'poortader', '', 455, 520, q.on('eerst', 1), 'right'); naamBij(ctx, 'lever', '', 700, 505, q.on('lever.', 1), 'center'); naamBij(ctx, 'hart', '', 1130, 430, q.on('rest', 1), 'center');
    const E = q.on('enzymen', 1); [[640, 340], [730, 395], [800, 320]].forEach(([x, y], i) => enzym(ctx, x, y, 0.2, { soort: 'protease', a: E, rot: i * 1.1, t }));
    naamBij(ctx, 'enzymen', 'breken af', 700, 225, E * (1 - q.on('Bij', 1)), 'center');
    tag(ctx, 'film: De lever als fabriek', 960, 630, C.teal, q.on('enzymen', 1) * (1 - q.on('deel', 1)), 'center', 26);
    const frac = 0.4 * q.on('deel', 1, 1.2) + 0.55 * q.on('bijna', 1, 1.2), col = N > 0.5 ? PIL.nitro : PIL.bd;
    for (let k = 0; k < 16; k++) { const ph = (t * 0.16 + hash(k * 3 + 1)) % 1, weg = hash(k * 5 + 2) < frac; if (weg && ph > 0.55) { const f = (ph - 0.55) / 0.45; const [x, y] = padPos(path, 0.55); molecuul(ctx, x + (hash(k) - 0.5) * 80, y + (hash(k * 2) - 0.5) * 60, 1, col, 1 - f, clamp(f * 4, 0, 1)); }
      else { const [x, y] = padPos(path, ph); molecuul(ctx, x, y, 1, col, clamp(ph * 8, 0, 1) * clamp((1 - ph) * 8, 0, 1)); } }
    // van honderd moleculen komt een deel verder
    const G = q.on('deel', 1); metaA(ctx, 'van 100 moleculen komen verder:', 1380, 225, G, C.grain, 'left', 22);
    const weg = 40 * clamp((t - q.at('weg', 1)) / 1.5, 0, 1) + 55 * clamp((t - q.at('bijna', 1)) / 1.5, 0, 1); honderd(ctx, 1397, 270, weg, G, col);
    chip(ctx, 'nog ' + Math.round(100 - weg), 1550, 640, C.goud, G, 30);
    tablet(ctx, 200, lerp(190, 600, ease(clamp((t - q.at('Slik', 1)) / 1.2, 0, 1))), 26, N * (1 - q.on('in,', 1, 0.6) * 0.0), PIL.nitro); naamBij(ctx, 'nitroglycerine', 'bij pijn op de borst', 250, 205, N * (1 - q.on('Slik', 1)), 'left');
    vraagteken(ctx, 960, 200, q.on('patiënt', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('reden', 1, 0.8);
    antwoord(ctx, 'Antwoord c', 1 - P);
    laag(ctx, 1 - P, () => { const vaat = [[620, 690], [1000, 720], [1300, 640], [1420, 420], [1500, 320]];
      tongSchema(ctx, 680, 520, 1.3, 1, q.on('bloedvaten', 1), t); naamBij(ctx, 'tong', '', 600, 420, q.on('tong', 1), 'center');
      sprayFles(ctx, 1150, 300, 1, 1, -1.0); vat(ctx, vaat, '#D8573F', 20, q.on('bloed', 2)); hart(ctx, 1560, 250, 0.7, 1, t); naamBij(ctx, 'hart', '', 1680, 260, 1, 'left');
      leverVorm(ctx, 1640, 600, 0.38, 0.35); naamBij(ctx, 'lever', 'niet langs', 1640, 690, q.on('lever', 1), 'center', C.text2);
      naamBij(ctx, 'kleine bloedvaten', 'onder de tong', 330, 790, q.on('bloedvaten', 1), 'center');
      const sp = clamp((t - 0.2) / 2.2, 0, 1); for (let i = 0; i < 10; i++) { const u = (sp * 1.6 - i * 0.06); if (u <= 0 || u >= 1) continue; const [x, y] = padPos([[1090, 230], [880, 420], [700, 620]], u); circ(ctx, x + (hash(i) - 0.5) * 30, y + (hash(i * 3) - 0.5) * 30, 5, rgba(PIL.nitro, 0.8)); }
      const B = q.on('bloed', 2); for (let k = 0; k < 10; k++) { const ph = (t * 0.22 + hash(k * 9)) % 1; const [x, y] = padPos(vaat, ph); molecuul(ctx, x, y, 0.9, PIL.nitro, B * clamp(ph * 8, 0, 1) * clamp((1 - ph) * 8, 0, 1)); }
      klokje(ctx, 1560, 120, 34, clamp((t - q.at('minuten', 1)) / 1.5, 0, 0.08), q.on('minuten', 1)); chip(ctx, 'werkt binnen een paar minuten', 1290, 140, C.groen, q.on('werkt', 1), 26); });
    laag(ctx, P, () => { const I = [['onder de tong', '', q.on('reden', 1), 1], ['pleister', 'via de huid', q.on('pleisters', 1), 1], ['injectie', 'direct in het bloed', q.on('injecties', 1), 1], ['zetpil', 'deels', q.on('zetpillen', 1), 0.5]];
      I.forEach(([n, s2, a, v], i) => { const x = 330 + i * 420, y = 470; if (i === 0) sprayFles(ctx, x, y, 1, a, -0.3); else if (i === 1) pleister(ctx, x, y, 1.2, a); else if (i === 2) injectie(ctx, x, y, 1.3, a); else zetpil(ctx, x, y, 1.3, a);
        naamBij(ctx, n, s2, x, 650, a, 'center'); if (v === 1) vink_(ctx, x, 300, 26, a); else vink_(ctx, x, 300, 26, a, C.oker); });
      metaA(ctx, 'niet eerst langs de lever', 960, 210, q.on('reden', 1), C.grain, 'center', 26);
      haak(ctx, 160, 1760, 730, 'de weg bepaalt hoeveel er aankomt', C.goud, q.on('weg', 1)); }); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Stel', 1, 0.8);
    persoon(ctx, 'noor', 220, 880, 380, { t, kijk: 1, uit: 'denkt', pose: 'denk', a: q.on('Noor', 1, 0.3) });
    const gx = 520, gy = 250, gw = 1200, gh = 470;
    laag(ctx, 1 - S, () => { const u = clamp((t - q.at('stijgt', 1)) / 6.5, 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 100, xt: [0, 2, 4, 6, 8, 10, 12], curves: [{ f: bateman, col: q.on('paracetamol', 1) > 0.5 ? PARA : '#F2F2EE', u, punt: true }], yHi: q.on('bloedspiegel', 1) });
      chip(ctx, 'lever en nieren ruimen op', 1300, 330, C.oker, q.on('ruimen', 1), 26);
      const H = q.on('helft', 1); if (H > 0.01) { laag(ctx, H, () => { [3, 5].forEach(x => { circ(ctx, G.X(x), G.Y(bateman(x)), 9, C.goud); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(x), G.Y(bateman(x))); ctx.lineTo(G.X(x), gy + gh); ctx.stroke(); ctx.setLineDash([]); });
        pijl(ctx, G.X(3), gy + gh - 40, G.X(5) - 4, gy + gh - 40, C.goud, 1, 3, 14); pijl(ctx, G.X(5), gy + gh - 40, G.X(3) + 4, gy + gh - 40, C.goud, 1, 3, 14);
        text(ctx, 'de helft weg', G.X(5) + 24, G.Y(bateman(5)) - 14, fTekst(28, 700), C.goud, 'left'); }); }
      naamBij(ctx, 'halfwaardetijd', '', G.X(4), gy + gh - 64, q.on('halfwaardetijd', 1), 'center', C.goud);
      chip(ctx, '± 2 uur', G.X(4), gy + gh - 120, C.goud, q.on('twee', 1), 26);
      naamBij(ctx, 'paracetamol', '', G.X(1.6), G.Y(90), q.on('paracetamol', 1), 'left', PARA); });
    laag(ctx, S, () => { const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 110, xt: [0, 2, 4, 6, 8, 10, 12], yt: [25, 50, 100], curves: [] });
      const h = q.on('honderd', 1); circ(ctx, G.X(0), G.Y(100), 11 * h, PARA); naamBij(ctx, '100 eenheden', '', G.X(0) + 30, G.Y(100) + 10, h, 'left', PARA);
      const K = q.on('kwart', 1); if (K > 0.01) laag(ctx, K, () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(25)); ctx.lineTo(G.X(12), G.Y(25)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'een kwart', G.X(12) - 10, G.Y(25) - 16, fTekst(28, 700), C.goud, 'right'); });
      vraagteken(ctx, G.X(6), G.Y(60), q.on('hoeveel', 2), 110); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const Cc = q.on('bloeddrukpil', 1, 0.8), Dd = q.on('Slik', 1, 0.8);
    antwoord(ctx, 'Antwoord a', 1 - Cc);
    const gx = 520, gy = 250, gw = 1200, gh = 470;
    // B: halveren in stapjes, grens, opnieuw slikken
    laag(ctx, 1 - Cc, () => { const seg = (a0, a1, x0, x1) => lerp(x0, x1, ease((t - a0) / (a1 - a0)));
      let x1 = 0; if (t < q.at('weer', 1)) x1 = seg(q.at('twee', 1), q.at('weg', 1) + 0.3, 0, 2); else if (t < q.at('paar', 1)) x1 = seg(q.at('twee', 2), q.at('was', 1), 2, 4); else if (t < q.at('opnieuw', 1)) x1 = seg(q.at('zakt', 1), q.at('waarboven', 1), 4, 6); else x1 = seg(q.at('opnieuw', 1), q.at('opnieuw', 1) + 0.9, 6, 12);
      const f = (x) => halfP(x) + (x >= 6 ? halfP(x - 6) : 0);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 12, ymax: 110, xt: [0, 2, 4, 6, 8, 10, 12], yt: [25, 50, 100], curves: [{ f, col: PARA, u: x1 / 12, punt: true }], grens: 35, grensA: q.on('grens', 1), grensLab: 'werkt' });
      [[2, '50', q.on('helft', 1)], [4, '25', q.on('helft', 2)]].forEach(([x, s2, a]) => { if (a <= 0.01) return; laag(ctx, a, () => { circ(ctx, G.X(x), G.Y(halfP(x)), 10, C.goud); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(0), G.Y(halfP(x))); ctx.lineTo(G.X(x), G.Y(halfP(x))); ctx.lineTo(G.X(x), gy + gh); ctx.stroke(); ctx.setLineDash([]); text(ctx, s2, G.X(x) + 20, G.Y(halfP(x)) - 16, fTekst(32, 800), C.goud, 'left'); }); });
      naamBij(ctx, 'onder de grens', '', G.X(5.2), G.Y(35) + 60, q.on('onder', 1) * (1 - q.on('opnieuw', 1)), 'center', C.koraal);
      laag(ctx, q.on('opnieuw', 1), () => tablet(ctx, G.X(6), G.Y(118), 18)); });
    // C: paracetamol tegenover de bloeddrukpil (één dag)
    laag(ctx, Cc * (1 - Dd), () => { persoon(ctx, 'henk', 230, 880, 400, { t, kijk: 1, uit: 'neutraal', a: q.on('Henk', 1, 0.3) });
      const u = clamp((t - q.at('halfwaardetijd', 1)) / 2.4, 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 24, ymax: 110, xt: [0, 6, 12, 18, 24], curves: [{ f: halfP, col: PARA, a: 0.7 }, { f: (x) => 100 * Math.pow(0.5, x / 36), col: PIL.bd, u, punt: true }], grens: 35, grensA: 1, grensLab: 'werkt' });
      naamBij(ctx, 'paracetamol', '', G.X(2.6), G.Y(60), 1, 'left', PARA); naamBij(ctx, 'bloeddrukpil', 'halfwaardetijd ± 36 uur', G.X(17), G.Y(100), q.on('anderhalve', 1), 'center', PIL.bd);
      chip(ctx, 'de hele dag boven de grens', G.X(14), G.Y(45), PIL.bd, q.on('boven', 2), 26); });
    // D: elke dag een pil → zaagtand tot een vlak niveau
    laag(ctx, Dd, () => { const u = clamp((t - q.at('elke', 1)) / (q.at('verdwijnt', 1) - q.at('elke', 1) + 0.4), 0, 1);
      const G = spiegelGrafiek(ctx, gx, gy, gw, gh, { xmax: 10, ymax: 100, xt: [0, 2, 4, 6, 8, 10], xlab: 'tijd (dagen)', curves: [{ f: zaag, col: PIL.bd, u, punt: true }] });
      for (let n = 0; n <= 10 * u; n++) capsule(ctx, G.X(n), gy + gh + 124, 0.55, PIL.bd, '#F2F2EE', 0, 0.9);
      const S = q.on('stapelt', 1); naamBij(ctx, 'stapelt zich op', '', G.X(2.2), G.Y(70), S * (1 - q.on('evenveel', 1)), 'center', PIL.bd);
      const B = q.on('halfwaardetijden', 1); if (B > 0.01) laag(ctx, B, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G.X(0), gy - 4); ctx.lineTo(G.X(0), gy + 10); ctx.moveTo(G.X(0), gy + 3); ctx.lineTo(G.X(7), gy + 3); ctx.moveTo(G.X(7), gy - 4); ctx.lineTo(G.X(7), gy + 10); ctx.stroke(); text(ctx, '4 tot 5 halfwaardetijden', G.X(3.5), gy - 14, fTekst(28, 700), C.goud, 'center'); });
      const E = q.on('evenveel', 1); if (E > 0.01) laag(ctx, E, () => { ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.text, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(G.X(6.5), G.Y(66)); ctx.lineTo(G.X(10), G.Y(66)); ctx.stroke(); ctx.setLineDash([]); });
      naamBij(ctx, 'vlak niveau', 'erbij = eraf', G.X(8.4), G.Y(92), E, 'center');
      chip(ctx, 'na ± een week: volle werking', G.X(7), G.Y(30), C.groen, q.on('week', 1), 28); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('stoffen', 1, 0.8);
    laag(ctx, 1 - I, () => { const O = q.on('ouderen', 1); nierFilter(ctx, 560, 400, 0.9, 1, t, 1); naamBij(ctx, 'nier', 'filtert het bloed', 560, 700, 1 - O, 'center'); naamBij(ctx, 'jonge nier', '', 520, 700, O, 'center');
      laag(ctx, O, () => { nierFilter(ctx, 1120, 400, 0.9, 0.75, t, 0.3); }); naamBij(ctx, 'oudere nier', 'filtert minder', 1080, 700, O, 'center');
      naamBij(ctx, 'urine', '', 610, 620, q.on('urine', 1) * (1 - O), 'left', '#E0C860');
      const S = q.on('bloedspiegel', 1), L = q.on('lagere', 1, 1.2); metaA(ctx, 'bloedspiegel', 1530, 250, S, C.grain, 'center', 22);
      spiegelStaaf(ctx, 1420, 280, 340, 0.45, PIL.bd, 'jong', S); spiegelStaaf(ctx, 1580, 280, 340, lerp(0.45, 0.88, q.on('hoog', 1, 1.2)) - 0.4 * L, PIL.bd, 'oud', S, 0.7);
      laag(ctx, S, () => text(ctx, 'te hoog', 1690, 280 + 340 * 0.3 + 10, fTekst(26, 700), C.koraal, 'left')); chip(ctx, 'lagere dosis', 1615, 760, C.groen, L, 28); });
    laag(ctx, I, () => { const cx = 760, cy = 2300, R = 1900, d = 170, a0 = -Math.PI / 2 - 0.25, a1 = -Math.PI / 2 + 0.25, n = 4;
      darmBoog(ctx, cx, cy, R, a0, a1, n, d, q.on('darmwand', 1)); naamBij(ctx, 'darmwand', '', 760, 105, q.on('darmwand', 1), 'center');
      const Gs = q.on('Grapefruitsap', 1), Rm = q.on('remt', 1) * (1 - q.on('Hetzelfde', 1)), Tw = q.on('Hetzelfde', 1), Dw = q.on('darmwand', 1);
      for (let k = 0; k < n; k++) { const an = a0 + (a1 - a0) * (k + 0.5) / n, [ex, ey] = opBoog(cx, cy, R + d * 0.42, an); enzym(ctx, ex, ey, 0.22, { soort: 'protease', a: Dw, rot: an + Math.PI / 2, t }); kruis(ctx, ex, ey, 30, Rm); }
      naamBij(ctx, 'enzym', 'breekt af', 1290, 330, Dw, 'left');
      const cut = 0.7 * (1 - Rm) * (1 - Tw) + 0.45 * Tw;
      for (let k = 0; k < 14; k++) { const ph = (t * 0.2 + hash(k * 13)) % 1, an = a0 + (a1 - a0) * ((k % n) + 0.5 + (hash(k) - 0.5) * 0.3) / n, rE = R + d * 0.42, r = R - 300 + ph * (d + 380), weg = hash(k * 7 + 1) < cut, col = Tw > 0.5 && k % 2 ? C.teal : PIL.sim;
        if (weg && r > rE - 30) { const f = (r - rE + 30) / (R + d + 80 - rE); const [x, y] = opBoog(cx, cy, rE - 34, an); molecuul(ctx, x, y + 10, 1, col, Dw * (1 - f), clamp(f * 4, 0, 1)); }
        else { const [x, y] = opBoog(cx, cy, r, an); molecuul(ctx, x, y, 1, col, Dw * clamp(ph * 6, 0, 1) * clamp((1 - ph) * 6, 0, 1)); } }
      grapefruit(ctx, 190, 600, 70, Gs * (1 - Tw)); naamBij(ctx, 'grapefruitsap', '', 190, 720, Gs * (1 - Tw), 'center', '#F2B04A');
      if (Gs > 0.01) for (let i = 0; i < 8; i++) { const ph = (t * 0.3 + i / 8) % 1, [x, y] = padPos([[250, 580], [500, 520], [700, 470]], ph); circ(ctx, x + Math.sin(i * 3 + t) * 10, y + (hash(i) - 0.5) * 50, 6, rgba('#F2B04A', 0.8 * Gs * (1 - Tw) * q.on('remt', 1))); }
      capsule(ctx, 380, 800, 1.4, PIL.sim, PIL.sim, 0, q.on('cholesterolverlager', 1) * (1 - Tw)); naamBij(ctx, 'simvastatine', 'cholesterolverlager', 450, 800, q.on('simvastatine', 1) * (1 - Tw), 'left', PIL.sim);
      const M = q.on('meer', 1); metaA(ctx, 'simvastatine in het bloed', 1630, 250, M, C.grain, 'center', 22);
      spiegelStaaf(ctx, 1500, 290, 340, 0.24, PIL.sim, 'zonder sap', M); spiegelStaaf(ctx, 1680, 290, 340, 0.24 + (0.86 - 0.24) * q.on('meer', 1, 1.5), PIL.sim, 'met sap', M);
      bijsluiter(ctx, 1180, 740, 0.6, q.on('bijsluiter', 1) * (1 - Tw));
      chip(ctx, 'twee medicijnen · hetzelfde enzym', 760, 820, C.teal, Tw, 28); }); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('farmacokinetiek', 1);
    keuken(ctx, t, { bd: 7, uitN: 'blij', uitH: 'blij', poseN: 'vasthouden', hold: (c, x, y) => capsule(c, x, y - 6, 1, PIL.bd, '#F2F2EE', -0.4) });
    const R = [['pil', 'pillendoos'], ['darm', 'Opname'], ['lever', 'lever'], ['bloed', 'halfwaardetijd'], ['nier', 'nieren']];
    R.forEach(([s2, w], i) => { const x = 560 + i * 200, aan = q.on(w, 1); routeIcoon(ctx, s2, x, 180, 1, aan); if (i) pijl(ctx, x - 150, 180, x - 60, 180, C.line, 0.7, 3, 12); });
    ['opname', 'lever', 'halfwaardetijd', 'nieren'].forEach((s2, i) => regel(ctx, s2, 760 + i * 200, 262, q.on(['Opname', 'lever', 'halfwaardetijd', 'nieren'][i], 1), C.text2, 22, 'center', 700));
    chip(ctx, 'hoe vaak', 700, 350, C.goud, q.on('vaak', 1) * (1 - F), 26); chip(ctx, 'hoeveel', 960, 350, C.goud, q.on('hoeveel', 1) * (1 - F), 26); chip(ctx, 'op welke manier', 1220, 350, C.goud, q.on('manier', 1) * (1 - F), 26);
    regel(ctx, 'farmacokinetiek', 960, 360, F, C.goud, 52, 'center', 800); metaA(ctx, 'wat je lichaam met een medicijn doet', 960, 405, q.on('lichaam', 1), C.text2, 'center', 22); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Verpleegkundigen', 1);
    persoon(ctx, 'ravi', 420, 880, 470, { t, kijk: 1, uit: 'blij', pose: t > q.at('past', 1) && t < q.at('Verpleegkundigen', 1) ? 'wijs' : 'staan' }); balie(ctx, 160, 760, 650);
    naamBij(ctx, 'Apotheker Ravi', 'rekent elke dag', 420, 360, q.on('Apothekers', 1, 0.3) * (1 - q.on('nieren', 1)), 'center');
    laag(ctx, q.on('nieren', 1), () => { nierVorm(ctx, 620, 520, 0.9, -1, 1); text(ctx, '→', 680, 534, fTekst(44, 700), C.text2, 'left'); });
    chip(ctx, 'nieren minder goed → dosis aanpassen', 470, 300, C.oker, q.on('dosis', 1), 26);
    medicijnKar(ctx, 1150, 840, 1.1, V); naamBij(ctx, 'medicijnkar', 'verpleegkundige geeft medicijnen', 1150, 350, V, 'center');
    const O = [['farmacie', 'universiteit', 'farmacie'], ['apothekersassistent', 'mbo', 'apothekersassistent'], ['verpleegkunde', 'mbo of hbo', 'verpleegkunde.']];
    O.forEach(([n, s2, w], i) => { const a = q.on(w, 1); naamBij(ctx, n, s2, 1650, 470 + i * 120, a, 'center', C.teal); }); }
});
