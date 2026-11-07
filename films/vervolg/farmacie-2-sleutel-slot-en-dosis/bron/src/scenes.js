
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
// Wat word jij? · Farmacie 2 · Sleutel, slot en dosis — eigen tekeningen (20 okt 2026)

const KL = { receptor: C.teal, enzym: C.paars, transport: C.groen, ion: C.oker, ibu: C.goud, morf: C.koraal, nal: C.groen, cyto: '#24395A' };
function lichtHex(hex, k) { const n = parseInt(hex.slice(1), 16); const c = (v) => Math.round(v + (255 - v) * k).toString(16).padStart(2, '0'); return '#' + c(n >> 16) + c((n >> 8) & 255) + c(n & 255); }
const ef = (u) => u * u * (3 - 2 * u); // zachte overgang

// gevouwen keten: slingerlijn binnen het huidige pad (clip), leest als een opgevouwen eiwitketen
function ketenVulling(ctx, x0, y0, w, h, col, lw = 3) { ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(col, 0.55); ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); const rij = 15; let dir = 1, first = true;
  for (let yy = y0 + 8; yy < y0 + h - 4; yy += rij) { const xa = dir > 0 ? x0 + 6 : x0 + w - 6, xb = dir > 0 ? x0 + w - 6 : x0 + 6; const n = 8;
    for (let k = 0; k <= n; k++) { const xx = xa + (xb - xa) * k / n, wob = Math.sin(k * 1.7 + yy * 0.13) * 4; if (first) { ctx.moveTo(xx, yy + wob); first = false; } else ctx.lineTo(xx, yy + wob); }
    ctx.quadraticCurveTo(xb + dir * 10, yy + rij / 2, xb, yy + rij); dir = -dir; }
  ctx.stroke(); ctx.restore(); }
// pad met afgeronde hoeken door een lijst punten
function rondPad(ctx, P, r = 10) { ctx.beginPath(); const n = P.length; for (let i = 0; i < n; i++) { const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n];
    const m1 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]; if (i === 0) ctx.moveTo(m1[0], m1[1]); ctx.arcTo(p1[0], p1[1], (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, r); } ctx.closePath(); }
function eiwitVorm(ctx, P, col, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const xs = P.map(p => p[0]), ys = P.map(p => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = rgba(C.goud, 0.9 * gloed); ctx.shadowBlur = 30 * gloed; rondPad(ctx, P, 9); ctx.fillStyle = rgba(col, 0.6); ctx.fill(); ctx.restore(); }
  rondPad(ctx, P, 9); ctx.fillStyle = rgba(lichtHex(col, 0.15 * gloed), 0.42 + 0.2 * gloed); ctx.fill(); rondPad(ctx, P, 9); ketenVulling(ctx, x0, y0, w, h, lichtHex(col, 0.45));
  rondPad(ctx, P, 9); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); }

// ---- de vier doelwitten (lokale coördinaten: membraan op y = 0, buiten = negatieve y), s = schaal
// receptor met V-vormig slot aan de buitenkant
function receptor(ctx, s = 1, a = 1, gloed = 0, col = KL.receptor) { eiwitVorm(ctx, [[-36, 44], [-38, -56], [-16, -58], [0, -30], [16, -58], [38, -56], [36, 44], [0, 52]].map(([x, y]) => [x * s, y * s]), col, a, gloed); }
// transporteiwit: twee helften met een kanaal; glucose (zeshoek) gaat erdoor (u 0..1)
function zeshoek(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.5236; ctx[k ? 'lineTo' : 'moveTo'](x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }
function transporteiwit(ctx, s = 1, a = 1, u = 0) { if (a <= 0.01) return; for (const k of [-1, 1]) eiwitVorm(ctx, [[k * 12, -54], [k * 46, -50], [k * 50, 0], [k * 44, 50], [k * 12, 54], [k * 16, 0]].map(([x, y]) => [x * s, y * s]), KL.transport, a);
  if (u > 0) zeshoek(ctx, 0, (-90 + 190 * (u % 1)) * s, 13 * s, C.text, a * clamp(Math.sin((u % 1) * Math.PI) * 3, 0, 1)); }
// ionkanaal: vier staafjes met een smalle porie; ionen (+) gaan erdoor
function ionkanaal(ctx, s = 1, a = 1, t = 0) { if (a <= 0.01) return; [-44, -22, 22, 44].forEach((dx, i) => eiwitVorm(ctx, [[dx - 10, -48], [dx + 10, -48], [dx + 11, 48], [dx - 11, 48]].map(([x, y]) => [x * s, y * s]), KL.ion, a));
  ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, y = (-110 + 230 * u) * s; const al = clamp(Math.sin(u * Math.PI) * 2, 0, 1); circ(ctx, 0, y, 8 * s, rgba('#F2F2EE', 0.85 * al)); text(ctx, '+', 0, y + 5 * s, fTekst(14 * s, 800), rgba('#121A26', al), 'center'); } ctx.restore(); }
// enzym: kluwen met een rechthoekig zakje (actieve plaats) aan de bovenkant; blok 0..1 = ibuprofen zit erin
function enzym(ctx, x, y, s = 1, a = 1, blok = 0, col = KL.enzym) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y);
  eiwitVorm(ctx, [[-60, -30], [-18, -40], [-17, -12], [17, -12], [18, -40], [60, -30], [66, 18], [30, 46], [-30, 46], [-66, 18]].map(([px, py]) => [px * s, py * s]), col, a);
  if (blok > 0.01) ibuBlok(ctx, 0, (-26 - (1 - blok) * 90) * s, s, a * clamp(blok * 3, 0, 1)); ctx.restore(); }
function ibuBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 15 * s, y - 14 * s, 30 * s, 30 * s, 5 * s); shape(ctx, KL.ibu, lichtHex(KL.ibu, 0.4), 2); ctx.restore(); }
// pijn- en ontstekingsstofje (klein zigzagketentje)
function pijnStofje(ctx, x, y, s = 1, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k < 5; k++) ctx[k ? 'lineTo' : 'moveTo'](x + (k - 2) * 9 * s, y + (k % 2 ? -6 : 6) * s); ctx.stroke(); ctx.restore(); }

// cel met rond membraan; geeft functie terug die een punt + rotatie op het membraan geeft
function celRond(ctx, cx, cy, rx, ry, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(KL.cyto, 0.85); ctx.fill();
  for (let i = 0; i < 26; i++) { const w = wander(i, t, 10, 0.2), an = hash(i * 5) * 6.283, rr = Math.sqrt(hash(i * 9 + 2)) * 0.82; circ(ctx, cx + Math.cos(an) * rx * rr + w.x, cy + Math.sin(an) * ry * rr + w.y, 2.2, rgba('#C9D6E6', 0.22)); }
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, rx - 12, ry - 12, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
function opMembraan(cx, cy, rx, ry, th) { const x = cx + Math.cos(th) * (rx - 6), y = cy + Math.sin(th) * (ry - 6); const nx = Math.cos(th) / rx, ny = Math.sin(th) / ry; return { x, y, rot: Math.atan2(nx, -ny) }; }
function opPlek(ctx, p, fn) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); fn(); ctx.restore(); }

// stuk membraan als boog (deel van een grote cirkel), buiten = boven
function membraanBoog(ctx, x, y, w, a = 1, R = 2200) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.asin(w / 2 / R);
  ctx.beginPath(); ctx.arc(x, y + R, R + 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.arc(x, y + R, R - 12, -Math.PI / 2 + an, -Math.PI / 2 - an, true); ctx.closePath(); ctx.fillStyle = rgba(C.er, 0.18); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y + R, R + 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y + R, R - 12, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y + R, R - 13, -Math.PI / 2 - an, -Math.PI / 2 + an); ctx.lineTo(x + w / 2, y + 260); ctx.lineTo(x - w / 2, y + 260); ctx.closePath(); ctx.fillStyle = rgba(KL.cyto, 0.6); ctx.fill(); ctx.restore(); }
function boogY(x, x0, y0, R = 2200) { return y0 + R - Math.sqrt(R * R - (x - x0) * (x - x0)); }
function boogRot(x, x0, R = 2200) { return Math.asin((x - x0) / R); }

// stofjes die op het V-slot passen: agonist (sleutel die opent) en antagonist (sleutel die vastzit, met dikke kop)
function ligand(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const col = soort === 'ag' ? KL.morf : KL.nal;
  ctx.beginPath(); if (soort === 'ag') { ctx.moveTo(-14, -28); ctx.lineTo(0, 0); ctx.lineTo(14, -28); ctx.lineTo(24, -40); ctx.quadraticCurveTo(0, -56, -24, -40); }
  else { ctx.moveTo(-14, -28); ctx.lineTo(0, 0); ctx.lineTo(14, -28); ctx.lineTo(40, -34); ctx.lineTo(44, -62); ctx.lineTo(10, -70); ctx.lineTo(-30, -66); ctx.lineTo(-42, -40); }
  ctx.closePath(); shape(ctx, rgba(col, 0.85), lichtHex(col, 0.4), 2.5); ctx.restore(); }
// hangslot met sleutel: open (agonist) of dicht met vastgelopen sleutel (antagonist)
function hangslot(ctx, x, y, s, open, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 9; ctx.beginPath(); if (open) ctx.arc(-26, -40, 26, Math.PI, 0); else ctx.arc(0, -40, 26, Math.PI, 0); ctx.moveTo(open ? 0 : 26, -40); ctx.lineTo(open ? 0 : 26, -20); if (!open) { ctx.moveTo(-26, -40); ctx.lineTo(-26, -20); } else { ctx.moveTo(-52, -40); ctx.lineTo(-52, -26); } ctx.stroke();
  roundRect(ctx, -40, -22, 80, 66, 10); shape(ctx, '#8C939E', '#C9CED6', 2); circ(ctx, 0, 6, 8, '#2A3446');
  ctx.save(); ctx.translate(0, 6); ctx.rotate(open ? 1.2 : 0); ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 60); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 76, 16, 0, 6.283); ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); ctx.restore(); }

// ademhalingsspoor; f 0..1 = traag → normaal
function ademSpoor(ctx, x, y, w, h, f, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - h / 2 - 50, w + 40, h + 90, 14); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); metaText(ctx, 'ADEMHALING', x, y - h / 2 - 16, C.grain, 'left', 20);
  ctx.strokeStyle = f > 0.5 ? C.groen : C.koraal; ctx.lineWidth = 3.5; ctx.beginPath(); const cyc = lerp(1.6, 5, f), amp = lerp(0.35, 0.9, f);
  for (let i = 0; i <= w; i += 3) { const v = Math.sin((i / w * cyc - t * cyc * 0.12) * 6.283) * amp; ctx[i ? 'lineTo' : 'moveTo'](x + i, y - v * h / 2 + h * 0.05); } ctx.stroke(); ctx.restore(); }

// ---- grafiek: dosis tegen effect ----
// curve: K = halve-effectdosis (zelfde eenheid als xmax), n = steilheid; draw 0..1 = tot waar getekend
function effectV(d, K, n = 1) { return d <= 0 ? 0 : Math.pow(d, n) / (Math.pow(d, n) + Math.pow(K, n)); }
function grafAssen(ctx, x, y, w, h, a = 1, xl = 'DOSIS', yl = 'EFFECT') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  pijl(ctx, x, y + 10, x, y - 6, C.line, 1, 2.5, 14); pijl(ctx, x + w - 10, y + h, x + w + 6, y + h, C.line, 1, 2.5, 14); metaText(ctx, xl, x + w, y + h + 40, C.text2, 'right', 22); metaText(ctx, yl, x - 10, y - 24, C.text2, 'left', 22); ctx.restore(); }
function curve(ctx, x, y, w, h, xmax, K, n, col, draw = 1, a = 1, lw = 6, top = 1) { if (a <= 0.01 || draw <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const N = 160; for (let i = 0; i <= N * draw; i++) { const d = i / N * xmax; const px = x + i / N * w, py = y + h - effectV(d, K, n) * h * 0.86 * top; ctx[i ? 'lineTo' : 'moveTo'](px, py); } ctx.stroke(); ctx.restore(); }
function curvePunt(x, y, w, h, xmax, K, n, d, top = 1) { return [x + d / xmax * w, y + h - effectV(d, K, n) * h * 0.86 * top]; }

// tablet (wit, met breukgleuf) en doordrukstrip
function tablet(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, 6.283); shape(ctx, '#F4F2EC', '#BFC5CE', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -r * 0.5); ctx.lineTo(0, r * 0.5); ctx.stroke(); ctx.restore(); }
function strip(ctx, x, y, s, leeg = 0, a = 1, naam = 'IBUPROFEN 400 mg') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -130, -70, 260, 140, 12); shape(ctx, '#C9D2DC', '#E8EEF4', 2);
  for (let i = 0; i < 10; i++) { const px = -96 + (i % 5) * 48, py = -26 + Math.floor(i / 5) * 56; ctx.beginPath(); ctx.ellipse(px, py, 19, 14, 0, 0, 6.283); shape(ctx, i < leeg ? '#9AA6B4' : '#EEF2F6', '#AEB8C4', 1.5); if (i >= leeg) tablet(ctx, px, py, 13, 1); else { ctx.strokeStyle = '#7A8696'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px - 10, py - 4); ctx.lineTo(px + 6, py + 6); ctx.stroke(); } }
  text(ctx, naam, 0, 64, fTekst(15, 800), '#3A4458', 'center'); ctx.restore(); }

// ---- Sam op de bank, enkel ingezwachteld op een kussen ----
function bankSam(ctx, x, vloer, h, o = {}) { const { t = 0, uit = 'neutraal', pose = 'staan', hold = null, koel = 0, pijn = 0, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const hE = h * 1.04, hh = hE / 6.1, zit = vloer - hh * 2.1, heup = zit - hh * 0.15, Y = heup + hE * (2.65 / 6.1);
  // bank: rugleuning, zitting, armleuning
  roundRect(ctx, x - hh * 2.6, zit - hh * 2.7, hh * 4.6, hh * 2.9, 26); shape(ctx, '#5A4A6E', '#6E5C86', 2);
  roundRect(ctx, x - hh * 3.1, zit - hh * 1.3, hh * 0.9, hh * 2.6, 20); shape(ctx, '#665480', '#7A6896', 2);
  roundRect(ctx, x - hh * 2.4, zit, hh * 4.8, hh * 0.9, 18); shape(ctx, '#6E5C86', '#7E6C98', 2); ctx.fillStyle = '#3E3250'; ctx.fillRect(x - hh * 2.2, zit + hh * 0.9, hh * 0.3, vloer - zit - hh * 0.9); ctx.fillRect(x + hh * 1.9, zit + hh * 0.9, hh * 0.3, vloer - zit - hh * 0.9);
  // poef met kussen voor de enkel
  const px = x + hh * 3.35, pTop = heup + hh * 0.55; roundRect(ctx, px - hh * 0.85, pTop, hh * 1.7, vloer - pTop, 16); shape(ctx, '#7A6448', '#8C7658', 2); roundRect(ctx, px - hh * 0.95, pTop - hh * 0.32, hh * 1.9, hh * 0.42, 16); shape(ctx, '#C98A5C', '#DDA070', 2);
  // Sam zelf (bovenlijf), benen apart
  ctx.save(); ctx.beginPath(); ctx.rect(x - h, 0, 2 * h, heup + hh * 0.35); ctx.clip(); const r = persoon(ctx, 'sam', x, Y, h, { t, uit, pose, kijk: 1, outfit: 'sport', hold }); ctx.restore();
  const huid = '#7A5440', broek = '#2A2F3E'; ctx.lineCap = 'round';
  // achterste been: knie gebogen, voet op de vloer
  const k1 = [x + hh * 1.25, heup + hh * 0.05]; ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.4; ctx.beginPath(); ctx.moveTo(k1[0], k1[1]); ctx.lineTo(k1[0] + hh * 0.1, vloer - hh * 0.3); ctx.stroke();
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.ellipse(k1[0] + hh * 0.3, vloer - hh * 0.14, hh * 0.42, hh * 0.18, 0, Math.PI, 0); ctx.lineTo(k1[0] + hh * 0.72, vloer - hh * 0.04); ctx.lineTo(k1[0] - hh * 0.12, vloer - hh * 0.04); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = _donker(broek, 0.1); ctx.lineWidth = hh * 0.62; ctx.beginPath(); ctx.moveTo(x - hh * 0.2, heup + hh * 0.05); ctx.lineTo(k1[0] - hh * 0.35, heup + hh * 0.05); ctx.stroke(); ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(k1[0] - hh * 0.3, heup + hh * 0.05); ctx.lineTo(k1[0], k1[1]); ctx.stroke();
  // voorste been: gestrekt naar het kussen
  const k2 = [x + hh * 1.35, heup - hh * 0.05], enk = [px - hh * 0.15, pTop - hh * 0.38];
  ctx.strokeStyle = broek; ctx.lineWidth = hh * 0.62; ctx.beginPath(); ctx.moveTo(x + hh * 0.15, heup - hh * 0.05); ctx.lineTo(k2[0] - hh * 0.4, heup - hh * 0.06); ctx.stroke();
  ctx.strokeStyle = huid; ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(k2[0] - hh * 0.4, heup - hh * 0.06); ctx.lineTo(k2[0], k2[1]); ctx.lineTo(enk[0], enk[1]); ctx.stroke();
  // zwachtel om enkel en voet, voet omhoog
  const vt = [enk[0] + hh * 0.3, enk[1] - hh * 0.5]; ctx.strokeStyle = '#ECEAE4'; ctx.lineWidth = hh * 0.5; ctx.beginPath(); ctx.moveTo(enk[0] - hh * 0.55, enk[1] - hh * 0.02); ctx.lineTo(enk[0], enk[1]); ctx.lineTo(vt[0], vt[1]); ctx.stroke();
  ctx.strokeStyle = '#C9C4B8'; ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { const u = i / 5, bx = lerp(enk[0] - hh * 0.5, enk[0] + hh * 0.2, u), by = lerp(enk[1], enk[1] - hh * 0.3, u * u); ctx.beginPath(); ctx.moveTo(bx - hh * 0.12, by - hh * 0.2); ctx.lineTo(bx + hh * 0.14, by + hh * 0.2); ctx.stroke(); }
  ctx.fillStyle = huid; ctx.beginPath(); ctx.ellipse(vt[0] + hh * 0.04, vt[1] - hh * 0.12, hh * 0.15, hh * 0.13, 0.5, 0, 6.283); ctx.fill();
  if (koel > 0.01) { ctx.save(); ctx.globalAlpha *= koel; ctx.translate(enk[0] - hh * 0.1, enk[1] - hh * 0.32); ctx.rotate(-0.25); roundRect(ctx, -hh * 0.55, -hh * 0.22, hh * 1.1, hh * 0.44, 12); shape(ctx, '#6FB8E0', '#A8DCF4', 2.5); ctx.strokeStyle = rgba('#FFFFFF', 0.6); ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(k * hh * 0.25 - 6, -hh * 0.12); ctx.lineTo(k * hh * 0.25 + 6, hh * 0.12); ctx.stroke(); } ctx.restore(); }
  if (pijn > 0.01) { ctx.save(); ctx.globalAlpha *= pijn; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const an = -2.1 + k * 0.55, r0 = hh * 0.75 + Math.sin(t * 6 + k) * 5; ctx.beginPath(); ctx.moveTo(enk[0] + Math.cos(an) * r0, enk[1] + Math.sin(an) * r0); ctx.lineTo(enk[0] + Math.cos(an) * (r0 + 26), enk[1] + Math.sin(an) * (r0 + 26)); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); return Object.assign({}, r, { enkel: { x: enk[0], y: enk[1] } }); }
// bijzettafeltje
function tafeltje(ctx, x, vloer, w = 220, hgt = 210) { roundRect(ctx, x - w / 2, vloer - hgt, w, 22, 8); shape(ctx, '#8C6A44', '#A88258', 2); ctx.fillStyle = '#6E5236'; ctx.fillRect(x - w / 2 + 16, vloer - hgt + 22, 14, hgt - 22); ctx.fillRect(x + w / 2 - 30, vloer - hgt + 22, 14, hgt - 22); }
function glas(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 26, y - 90); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 26, y - 90); ctx.fillStyle = rgba('#CFE4F0', 0.12); ctx.fill(); ctx.fillStyle = rgba('#8CC4E8', 0.45); ctx.beginPath(); ctx.moveTo(x - 24, y - 55); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 24, y - 55); ctx.fill(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 26, y - 90); ctx.lineTo(x - 20, y); ctx.lineTo(x + 20, y); ctx.lineTo(x + 26, y - 90); ctx.stroke(); ctx.restore(); }

// ---- H3 ----
function bloedbuis(ctx, x, y, s, a = 1, vul = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-28, -120); ctx.lineTo(-28, 120); ctx.arc(0, 120, 28, Math.PI, 0, true); ctx.lineTo(28, -120); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#A8323A'; const top = lerp(150, -60, vul); ctx.fillRect(-28, top, 56, 200); ctx.fillStyle = rgba('#E8B04A', 0.35); ctx.fillRect(-28, top, 56, 14); ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-28, -120); ctx.lineTo(-28, 120); ctx.arc(0, 120, 28, Math.PI, 0, true); ctx.lineTo(28, -120); ctx.stroke(); roundRect(ctx, -36, -170, 72, 56, 10); shape(ctx, '#7A5AA8', '#9A7AC8', 2);
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-28, -60, 56, 70); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-20, -44 + i * 18); ctx.lineTo(16 - i * 8, -44 + i * 18); ctx.stroke(); } ctx.restore(); }
// balk bloedspiegel met twee grenzen; w = breedte; g1, g2 = grenzen (0..1); v = spiegel (0..1)
function spiegelBalk(ctx, x, y, w, g1, g2, v, a = 1, tl = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 54;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba(C.text2, 0.18), C.line, 1.5); ctx.fillStyle = rgba(C.groen, 0.45); ctx.fillRect(x + w * g1, y, w * (g2 - g1), h); ctx.fillStyle = rgba(C.koraal, 0.35); roundRect(ctx, x + w * g2, y, w * (1 - g2), h, 14); ctx.fill();
  ctx.strokeStyle = C.text; ctx.lineWidth = 4; for (const g of [g1, g2]) { ctx.beginPath(); ctx.moveTo(x + w * g, y - 18); ctx.lineTo(x + w * g, y + h + 18); ctx.stroke(); }
  if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; text(ctx, 'werkt niet', x + w * g1 / 2, y + h + 50, fTekst(26, 700), C.text2, 'center'); text(ctx, 'goed', x + w * (g1 + g2) / 2, y + h + 50, fTekst(26, 700), C.groen, 'center'); text(ctx, 'giftig', x + w * (g2 + 1) / 2, y + h + 50, fTekst(26, 700), C.koraal, 'center'); ctx.restore(); }
  const vx = x + w * v; ctx.fillStyle = '#A8323A'; ctx.beginPath(); ctx.moveTo(vx, y - 6); ctx.bezierCurveTo(vx - 22, y - 34, vx - 14, y - 58, vx, y - 70); ctx.bezierCurveTo(vx + 14, y - 58, vx + 22, y - 34, vx, y - 6); ctx.fill(); ctx.restore(); }
function paraDoos(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#C9D2DC'; ctx.beginPath(); ctx.moveTo(-170, -110); ctx.lineTo(-130, -150); ctx.lineTo(210, -150); ctx.lineTo(170, -110); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#AEB8C4'; ctx.beginPath(); ctx.moveTo(170, -110); ctx.lineTo(210, -150); ctx.lineTo(210, 70); ctx.lineTo(170, 110); ctx.closePath(); ctx.fill();
  roundRect(ctx, -170, -110, 340, 220, 6); shape(ctx, '#F4F6F8', '#C9D2DC', 2); ctx.fillStyle = '#3E7BB8'; ctx.fillRect(-170, -110, 340, 52);
  text(ctx, 'PARACETAMOL', 0, -72, fTekst(32, 800), '#FFFFFF', 'center'); text(ctx, '500 mg · 20 tabletten', 0, -20, fTekst(22, 600), '#3A4458', 'center');
  if (hl > 0.01) { roundRect(ctx, -150, 12, 300, 64, 10); shape(ctx, rgba(C.goud, 0.35 * hl), rgba('#B8862A', hl), 3); }
  text(ctx, 'max. per dag', 0, 54, fTekst(30, 800), '#2A3446', 'center'); ctx.restore(); }
function lever(ctx, x, y, s, a = 1, schade = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, -40); ctx.bezierCurveTo(-150, -110, 40, -120, 170, -80); ctx.bezierCurveTo(200, -60, 160, -10, 110, 10); ctx.bezierCurveTo(40, 50, -60, 90, -120, 70); ctx.bezierCurveTo(-180, 50, -190, 0, -170, -40); ctx.closePath(); shape(ctx, '#8E3B32', '#B85A4A', 3);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5E221C', 0.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, -110); ctx.quadraticCurveTo(10, -20, -40, 80); ctx.stroke();
  if (schade > 0.01) for (let i = 0; i < 9; i++) { const px = -130 + hash(i * 7) * 260, py = -80 + hash(i * 11 + 3) * 140; ctx.beginPath(); ctx.ellipse(px, py, 22 * schade + 4, 16 * schade + 3, hash(i) * 3, 0, 6.283); ctx.fillStyle = rgba('#D9B26A', 0.75 * schade); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ---- H4 ----
// ronde inzoom (geen verbindingslijn): tekent fn binnen de cirkel
function inzoom(ctx, x, y, r, a, col, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = '#16233A'; ctx.fill(); ctx.save(); ctx.clip(); fn(); ctx.restore(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
// maagwand: rij cellen met slijmlaag erboven; dikte 0..1, schade 0..1
function maagwand(ctx, x, y, w, dikte, schade = 0, t = 0) { const n = 7, cw = w / n; for (let i = 0; i < n; i++) { const cx = x + i * cw; const kap = schade > 0.01 && (i === 3 || i === 4) ? schade : 0;
    roundRect(ctx, cx + 3, y + kap * 40, cw - 6, 150 - kap * 40, 14); shape(ctx, kap ? _mix('#D99A8A', kap * 0.5, '#8E3B32') : '#D99A8A', '#F0B8A6', 2); circ(ctx, cx + cw / 2, y + 100, 12, '#8C5A6A'); }
  if (dikte > 0.01) { const h = 70 * dikte; ctx.fillStyle = rgba(C.groen, 0.35); ctx.beginPath(); ctx.moveTo(x, y); for (let k = 0; k <= 20; k++) ctx.lineTo(x + w * k / 20, y - h - Math.sin(k * 1.3 + t) * 5 * dikte); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = rgba('#E8D06A', 0.35); for (let i = 0; i < 14; i++) { const w2 = wander(i, t, 20, 0.6); circ(ctx, x + hash(i * 3) * w + w2.x * 0.5, y - 120 - hash(i * 5) * 60 + w2.y, 5, rgba('#E8D06A', 0.5)); } }
// steroïdskelet (drie zeshoeken + vijfhoek); dubbel = extra dubbele binding in ring A (prednison)
function steroid(ctx, x, y, L, col, a = 1, dubbel = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  const hex = (cx, cy) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = -Math.PI / 2 + k * Math.PI / 3; ctx[k ? 'lineTo' : 'moveTo'](cx + Math.cos(an) * L, cy + Math.sin(an) * L); } ctx.closePath(); ctx.stroke(); };
  const A = [x, y], B = [x + Math.sqrt(3) * L, y], Cc = [B[0] + 0.866 * L, y - 1.5 * L]; hex(...A); hex(...B); hex(...Cc);
  const P = [Cc[0] + 0.866 * L + 0.688 * L, Cc[1]], R = 0.851 * L; ctx.beginPath(); [144, 72, 0, -72, -144].forEach((d, k) => { const an = d * Math.PI / 180; ctx[k ? 'lineTo' : 'moveTo'](P[0] + Math.cos(an) * R, P[1] - Math.sin(an) * R); }); ctx.closePath(); ctx.stroke();
  // zijgroepen (=O links, OH-staart rechts)
  ctx.beginPath(); ctx.moveTo(x - 0.866 * L, y + 0.5 * L); ctx.lineTo(x - 1.6 * L, y + 0.95 * L); ctx.stroke(); ctx.beginPath(); ctx.moveTo(P[0] + R * 0.3, P[1] - R * 0.95); ctx.lineTo(P[0] + R * 0.9, P[1] - R * 1.7); ctx.stroke();
  if (dubbel) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); const p1 = [x + Math.cos(-Math.PI / 2) * L * 0.75, y + Math.sin(-Math.PI / 2) * L * 0.75], p2 = [x + Math.cos(-Math.PI / 6) * L * 0.75, y + Math.sin(-Math.PI / 6) * L * 0.75]; ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.stroke(); }
  ctx.restore(); }
// cel met receptor binnenin (voor prednison); aan 0..1
function cortCel(ctx, x, y, r, a = 1, aan = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(KL.cyto, 0.9); ctx.fill(); ctx.strokeStyle = C.er; ctx.lineWidth = 3; ctx.stroke(); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r - 9, 0, 6.283); ctx.stroke();
  ctx.save(); ctx.translate(x - r * 0.15, y + r * 0.05); receptor(ctx, r / 150, 1, aan, C.paars); ctx.restore(); if (aan > 0.01) steroid(ctx, x - r * 0.15 - 12, y - r * 0.32, 6, C.goud, aan, true); ctx.restore(); }
// effecticoontjes
function suikerOmhoog(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = Math.round(3 + 5 * u); for (let i = 0; i < n; i++) zeshoek(ctx, x - 60 + (i % 4) * 40, y + 20 - Math.floor(i / 4) * 40, 15, C.text, 1); pijl(ctx, x + 110, y + 40, x + 110, y - 60, C.koraal, u, 6, 22); ctx.restore(); }
function huidLagen(ctx, x, y, w, dun = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = 1 - 0.6 * dun; roundRect(ctx, x, y, w, 26 * d, 6); shape(ctx, '#C99A7A', '#E0B494', 2); roundRect(ctx, x, y + 30 * d, w, 70 * d, 6); shape(ctx, '#B87E6A', '#D09888', 2); roundRect(ctx, x, y + 104 * d, w, 40, 6); shape(ctx, '#E8D6A8', '#F4E6C0', 2); ctx.restore(); }
function bot(ctx, x, y, s, broos = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#ECE4D0'; ctx.strokeStyle = '#C9BFA8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-90, -14); ctx.lineTo(90, -14); ctx.arc(104, -26, 22, Math.PI * 0.8, Math.PI * 2.2); ctx.arc(104, 26, 22, -Math.PI * 0.2, Math.PI * 1.2); ctx.lineTo(-90, 14); ctx.arc(-104, 26, 22, Math.PI * 0.2 - 0.4, Math.PI * 1.8); ctx.arc(-104, -26, 22, Math.PI * 0.8 - 1.4, Math.PI * 1.8 - 0.6); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (broos > 0.01) for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.ellipse(-80 + hash(i * 3) * 160, -8 + hash(i * 7) * 16, 4 + 4 * broos, 3 + 3 * broos, 0, 0, 6.283); ctx.fillStyle = rgba('#5A5040', 0.7 * broos); ctx.fill(); } ctx.restore(); }
function weegschaal(ctx, x, y, s, kant, a = 1, l = '', r = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, 120); ctx.moveTo(-80, 120); ctx.lineTo(80, 120); ctx.stroke(); const an = kant * 0.12; ctx.save(); ctx.translate(0, -150); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(260, 0); ctx.stroke(); ctx.restore(); circ(ctx, 0, -150, 14, '#E0B64A');
  for (const k of [-1, 1]) { const ex = k * 260 * Math.cos(an), ey = -150 + k * 260 * Math.sin(an); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 70, ey + 110); ctx.moveTo(ex, ey); ctx.lineTo(ex + 70, ey + 110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(ex, ey + 112, 90, 18, 0, 0, Math.PI); ctx.fillStyle = '#8C939E'; ctx.fill();
    text(ctx, k < 0 ? l : r, ex, ey + 175, fTekst(30, 800), k < 0 ? C.groen : C.koraal, 'center'); } ctx.restore(); }

// muis zonder implantaat (proefdier)
function muisKaal(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20, -200, -30, -240, -10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5); ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A'); ctx.restore(); }

// ---- recap ----
function schaaltje(ctx, x, y, r, a = 1, t = 0, kleur = C.teal, seed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 3); ctx.beginPath(); ctx.ellipse(x, y + 4, r * 0.88, r * 0.34, 0, 0, 6.283); ctx.fillStyle = rgba('#E8C8A0', 0.35); ctx.fill();
  for (let i = 0; i < 14; i++) { const an = hash(i * 3 + seed) * 6.283, rr = Math.sqrt(hash(i * 5 + seed)) * 0.75; circ(ctx, x + Math.cos(an) * r * rr, y + 4 + Math.sin(an) * r * 0.3 * rr, 7, rgba(kleur, 0.75), lighten(kleur, 0.3), 1.2); } ctx.restore(); }

// klok met wijzers; uren = verstreken uren (wijzers draaien mee)
function klok(ctx, x, y, r, uren, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 4); ctx.strokeStyle = '#3A4458'; ctx.lineCap = 'round';
  for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; ctx.lineWidth = k % 3 ? 2 : 4; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82); ctx.lineTo(x + Math.sin(an) * r * 0.92, y - Math.cos(an) * r * 0.92); ctx.stroke(); }
  const h0 = 2; const aH = (h0 + uren) / 12 * 6.283, aM = uren * 6.283; if (uren > 0.01) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, -Math.PI / 2 + h0 / 12 * 6.283, -Math.PI / 2 + aH); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.45); ctx.fill(); }
  ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(aH) * r * 0.5, y - Math.cos(aH) * r * 0.5); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(aM) * r * 0.75, y - Math.cos(aM) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#3A4458'); ctx.restore(); }
// Wat word jij? · Farmacie · Sleutel, slot en dosis — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Sam met een verzwikte enkel).
// Rode draad: Sam wil extra ibuprofen nemen.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// woonkamer: bank met Sam, tafeltje met strip en glas
function kamer(ctx, t, o = {}) { const v = 860; bankSam(ctx, 560, v, 460, { t, uit: o.uit || 'neutraal', pose: o.pose || 'staan', hold: o.hold || null, koel: o.koel || 0, pijn: o.pijn || 0 });
  tafeltje(ctx, 1330, v, 300, 230); strip(ctx, 1290, v - 262, 0.62, o.leeg == null ? 1 : o.leeg, 1); glas(ctx, 1430, v - 232, 1); }
// grafiekvak H2 (gedeeld door s05 en s07)
const G2 = { x: 240, y: 200, w: 1000, h: 400, xmax: 1000, K: 130, n: 1.5, K2: 13 };
function grafiekH2(ctx, o = {}) { const { a = 1, draw1 = 1, draw2 = 0, dosis = -1, hl400 = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const { x, y, w, h, xmax, K, n, K2 } = G2;
  grafAssen(ctx, x, y, w, h, 1, 'DOSIS (MG)', 'EFFECT');
  if (hl400 > 0.01) { const px = x + 400 / xmax * w; ctx.save(); ctx.globalAlpha *= hl400; ctx.setLineDash([10, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y + 30); ctx.stroke(); ctx.setLineDash([]); text(ctx, '400', px, y + h + 40, fTekst(28, 800), C.goud, 'center'); ctx.restore(); }
  curve(ctx, x, y, w, h, xmax, K, n, C.goud, draw1, 1, 6); curve(ctx, x, y, w, h, xmax, K2, n, C.teal, draw2, 1, 6);
  if (dosis >= 0) { const [px, py] = curvePunt(x, y, w, h, xmax, K, n, dosis); circ(ctx, px, py, 13, C.goud, '#FFF4D0', 3); }
  ctx.restore(); }
// rij enzymen onder de grafiek; bezet = aantal met een ibuprofenblokje
function enzymRij(ctx, x0, y, n, bezet, a = 1, gap = 128) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const b = clamp(bezet - i, 0, 1); enzym(ctx, x0 + i * gap, y, 0.82, a, ef(b)); } }

Object.assign(SCENES, {
  title(ctx, t) { const d = 520 + 440 * Math.sin(t * 0.5); grafAssen(ctx, 1220, 500, 520, 220, 0.9, 'DOSIS', 'EFFECT'); curve(ctx, 1220, 500, 520, 220, 1000, 130, 1.5, C.goud, 1, 1, 6);
    const [px, py] = curvePunt(1220, 500, 520, 220, 1000, 130, 1.5, d); circ(ctx, px, py, 12, C.goud, '#FFF4D0', 3); enzymRij(ctx, 1290, 830, 4, 4 * effectV(d, 130, 1.5) + 0.3, 1, 130); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const twee = q.on('twee', 1, 0.4);
    kamer(ctx, t, { uit: t > q.at('pijn', 1) ? 'verbaasd' : 'neutraal', pose: twee > 0.5 ? 'vasthouden' : 'staan', pijn: q.on('verzwikt', 1) * (1 - q.on('slikt', 1)) + q.on('pijn', 1), leeg: q.on('slikt', 1) > 0.5 ? 1 : 0,
      hold: twee > 0.5 ? (c, hx, hy) => { tablet(c, hx - 14, hy - 10, 18, twee, 0.3); tablet(c, hx + 16, hy - 4, 18, twee, -0.2); } : null });
    naamBij(ctx, 'Sam', 'enkel verzwikt', 300, 300, q.on('Sam', 1, 0.3));
    chip(ctx, '1 tablet · 400 mg', 1290, 470, C.goud, q.on('vierhonderd', 1), 30);
    klok(ctx, 1640, 300, 70, clamp((t - q.at('uur', 1)) / 1.5, 0, 1), q.on('uur', 1)); regel(ctx, '1 uur later', 1640, 420, q.on('uur', 1), C.text2, 30, 'center', 700);
    tag(ctx, '+ 2', 1000, 330, C.koraal, twee, 'center', 40);
    regel(ctx, '3 tabletten = 3 × zo goed?', 1330, 200, q.on('Helpen', 1), C.goud, 44, 'center', 800); vraagteken(ctx, 1000, 220, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('Ibuprofen', 1, 0.8), K = q.on('Knoeien', 1, 0.8), N = q.on('overdosis', 1, 0.8);
    // fase 1: cel met vier doelwitten
    laag(ctx, 1 - I, () => { antwoord(ctx, 'Antwoord b'); const cx = 960, cy = 540, rx = 560, ry = 290; celRond(ctx, cx, cy, rx, ry, q.on('aangrijpt', 1), t);
      const pR = opMembraan(cx, cy, rx, ry, -Math.PI / 2), pT = opMembraan(cx, cy, rx, ry, -Math.PI / 2 + 0.95), pI = opMembraan(cx, cy, rx, ry, -Math.PI / 2 - 0.95);
      const aR = q.on('receptor', 1, 0.4), aE = q.on('enzym', 1, 0.4), aT = q.on('transporteiwit', 1, 0.4), aI = q.on('ionkanaal', 1, 0.4);
      opPlek(ctx, pR, () => receptor(ctx, 1.25, aR, 0)); naamBij(ctx, 'receptor', '', pR.x + 70, pR.y - 30, aR);
      enzym(ctx, cx - 160, cy + 90, 1.3, aE, 0); naamBij(ctx, 'enzym', '', cx - 160, cy + 200, aE, 'center');
      opPlek(ctx, pT, () => transporteiwit(ctx, 1.25, aT, t * 0.35)); naamBij(ctx, 'transporteiwit', '', pT.x + 80, pT.y + 20, aT);
      opPlek(ctx, pI, () => ionkanaal(ctx, 1.25, aI, t)); naamBij(ctx, 'ionkanaal', '', pI.x - 80, pI.y + 20, aI, 'right');
      metaA(ctx, 'MEESTAL EEN EIWIT', 1700, 160, q.on('eiwit', 1), C.grain, 'right', 24); });
    // fase 2: ibuprofen legt het enzym stil
    laag(ctx, I * (1 - K), () => { const ib = q.at('zitten', 1), stil = q.at('stil', 1), b = ef(clamp((t - ib + 0.6) / 1.2, 0, 1));
      enzym(ctx, 760, 560, 2.6, 1, b); naamBij(ctx, 'enzym', 'maakt pijn- en ontstekingsstoffen', 760, 740, 1, 'center');
      naamBij(ctx, 'ibuprofen', '', 870, 470, b, 'left', C.goud);
      for (let i = 0; i < 9; i++) { const ph = ((t * 0.35 + i / 9) % 1);
        const mag = t - (ph / 0.35) < ib + 0.4; // alleen stofjes die vóór het blokkeren zijn gemaakt
        if (!mag) continue; const w = wander(i, t, 16, 0.6); pijnStofje(ctx, 1020 + ph * 460 + w.x, 470 - ph * 260 + w.y, 1.6, clamp(Math.sin(ph * Math.PI) * 2, 0, 1)); }
      regel(ctx, 'pijn en ontsteking', 1680, 220, q.on('pijn', 1), C.koraal, 32, 'center', 700); chip(ctx, 'ligt stil', 760, 830, C.goud, q.on('stil', 1), 30); });
    // fase 3: agonist en antagonist (herhaling)
    laag(ctx, K * (1 - N), () => { tag(ctx, 'film: Knoeien met de spleet', 960, 210, C.teal, 1, 'center', 28);
      membraanBoog(ctx, 960, 620, 1500, 1); const x1 = 600, x2 = 1320; const ag = ef(clamp((t - q.at('aanzetten', 1) + 0.6) / 1.2, 0, 1)), an = ef(clamp((t - q.at('blokkeren', 1) + 0.6) / 1.2, 0, 1));
      const y1 = boogY(x1, 960, 620), y2 = boogY(x2, 960, 620);
      ctx.save(); ctx.translate(x1, y1); ctx.rotate(boogRot(x1, 960)); receptor(ctx, 1.5, 1, ag > 0.95 ? 0.5 + 0.5 * Math.sin(t * 5) ** 2 : 0); ligand(ctx, 0, -45 - (1 - ag) * 220, 1.5, 'ag', ag > 0 ? 1 : 0); ctx.restore();
      ctx.save(); ctx.translate(x2, y2); ctx.rotate(boogRot(x2, 960)); receptor(ctx, 1.5, 1, 0); ligand(ctx, 0, -45 - (1 - an) * 220, 1.5, 'an', an > 0 ? 1 : 0); ctx.restore();
      hangslot(ctx, x1 + 250, 380, 1, true, KL.morf, q.on('agonist', 1)); hangslot(ctx, x2 + 250, 380, 1, false, KL.nal, q.on('antagonist', 1));
      naamBij(ctx, 'agonist', 'zet aan', x1, 780, q.on('agonist', 1), 'center'); naamBij(ctx, 'antagonist', 'blokkeert', x2, 780, q.on('antagonist', 1), 'center'); });
    // fase 4: naloxon verdringt morfine
    laag(ctx, N, () => { membraanBoog(ctx, 760, 560, 1180, 1); const xs = [420, 760, 1100]; const v = q.at('verdringt', 1);
      xs.forEach((x, i) => { const y = boogY(x, 760, 560), ro = boogRot(x, 760); const nIn = ef(clamp((t - v - i * 0.35 + 0.3) / 1.1, 0, 1)), mIn = q.on('morfine', 1, 0.6);
        ctx.save(); ctx.translate(x, y); ctx.rotate(ro); receptor(ctx, 1.25, 1, nIn < 0.3 ? 0.4 * mIn : 0);
        ligand(ctx, -nIn * 120, -38 - nIn * 200, 1.25, 'ag', mIn * (1 - nIn)); ligand(ctx, 0, -38 - (1 - nIn) * 260, 1.25, 'an', nIn > 0.02 ? 1 : 0); ctx.restore(); });
      naamBij(ctx, 'morfine', '', 360, 520, q.on('morfine', 1) * (1 - ef(clamp((t - v + 0.3) / 0.8, 0, 1))), 'right', KL.morf); naamBij(ctx, 'naloxon', '', 1170, 470, ef(clamp((t - v - 0.7 + 0.3) / 0.8, 0, 1)), 'left', KL.nal);
      ademSpoor(ctx, 1400, 420, 400, 150, ef(clamp((t - q.at('patiënt', 1) + 0.5) / 1.5, 0, 1)), t, q.on('overdosis', 1));
      chip(ctx, 'te traag', 1600, 620, C.koraal, q.on('overdosis', 1) * (1 - q.on('patiënt', 1)), 28); chip(ctx, 'weer gewoon', 1600, 620, C.groen, q.on('gewoon', 1), 28); }); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('stof', 1), t1 = q.at('bij', 2) + 0.3; const u = clamp((t - t0) / (t1 - t0), 0, 1); const d = 1000 * u * u;
    grafiekH2(ctx, { a: q.on('Hoe', 1), draw1: d / 1000, dosis: t < q.at('dosis', 1) ? d : -1, draw2: q.on('tweede', 1, 2), hl400: q.on('vierhonderd', 1) });
    enzymRij(ctx, 330, 790, 8, 8 * effectV(d, G2.K, G2.n) + 0.15, q.on('enzymen', 1), 126); metaA(ctx, 'ENZYMEN IN HET LICHAAM', 280, 690, q.on('enzymen', 1), C.grain, 'left', 22);
    chip(ctx, 'eerst snel omhoog', 1560, 300, C.goud, q.on('snel', 1), 28); chip(ctx, 'bijna alles bezet', 1560, 390, C.goud, q.on('bezet', 2), 28); chip(ctx, 'weinig erbij', 1560, 480, C.koraal, q.on('weinig', 1), 28);
    tag(ctx, 'ibuprofen', 1150, 236, C.goud, q.on('ibuprofen', 1), 'right', 28);
    tag(ctx, 'tweede pijnstiller', 330, 236, C.teal, q.on('tweede', 1), 'left', 28);
    const pa = q.on('tien', 1); if (pa > 0.01) { const yy = G2.y + G2.h - 0.43 * G2.h; const xa = G2.x + G2.K2 / G2.xmax * G2.w + 6, xb = G2.x + G2.K / G2.xmax * G2.w - 6; pijl(ctx, xb, yy, xa, yy, C.teal, pa, 4, 16); regel(ctx, '10 × minder', (xa + xb) / 2 + 150, yy + 60, pa, C.teal, 30, 'center', 800); }
    vraagteken(ctx, 1560, 640, q.on('denk', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const L = q.on('Farmacologen', 1, 0.8);
    laag(ctx, 1 - L, () => { grafiekH2(ctx, { draw2: 1 }); tag(ctx, 'ibuprofen', 1150, 236, C.goud, 1, 'right', 28); tag(ctx, 'tweede pijnstiller', 330, 236, C.teal, 1, 'left', 28);
      const yy = G2.y + G2.h - 0.43 * G2.h, xa = G2.x + G2.K2 / G2.xmax * G2.w + 6, xb = G2.x + G2.K / G2.xmax * G2.w - 6; pijl(ctx, xb, yy, xa, yy, C.teal, q.on('krachtiger', 1), 4, 16); regel(ctx, 'minder milligram nodig', (xa + xb) / 2 + 220, yy + 60, q.on('minder', 1), C.teal, 30, 'center', 800);
      const top = G2.y + G2.h - 0.86 * G2.h * effectV(1000, G2.K, G2.n); const m = q.on('ophoudt', 1); if (m > 0.01) { ctx.save(); ctx.globalAlpha *= m; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(G2.x, top - 14); ctx.lineTo(G2.x + G2.w + 40, top - 14); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
      chip(ctx, 'krachtiger per milligram', 1560, 330, C.teal, q.on('krachtiger', 1), 28); chip(ctx, 'niet beter', 1560, 420, C.koraal, q.on('beter', 1), 28); chip(ctx, 'maximaal effect: even hoog', 1560, 560, C.text, q.on('maximaal', 1), 28); });
    laag(ctx, L, () => { const a1 = q.on('cellen', 1), a2 = q.on('proefdieren', 1), a3 = q.on('daarna', 1, 0.4);
      schaaltje(ctx, 420, 540, 150, a1, t, C.teal, 1); schaaltje(ctx, 470, 610, 110, a1, t, C.teal, 7); naamBij(ctx, 'cellen', 'in schaaltjes', 440, 720, a1, 'center');
      pijl(ctx, 640, 560, 760, 560, C.line, a2, 4, 16); muisKaal(ctx, 960, 560, 1, a2); naamBij(ctx, 'proefdieren', '', 960, 720, a2, 'center');
      pijl(ctx, 1170, 560, 1290, 560, C.line, a3, 4, 16); persoon(ctx, 'bilal', 1440, 790, 420, { t, a: a3, uit: 'blij', kijk: -1 }); naamBij(ctx, 'mensen', 'vrijwilligers', 1600, 520, a3);
      metaA(ctx, 'FARMACOLOGEN METEN CURVES', 960, 290, q.on('meten', 1), C.grain, 'center', 26); }); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('penicilline', 1, 0.8);
    laag(ctx, 1 - P, () => { const x = 460, y = 220, w = 1000, h = 420; grafAssen(ctx, x, y, w, h, 1, 'DOSIS', 'EFFECT');
      curve(ctx, x, y, w, h, 1000, 150, 2.5, C.groen, 1, 1, 6); curve(ctx, x, y, w, h, 1000, 560, 3, C.koraal, q.on('tweede', 1, 1.5), 1, 6);
      regel(ctx, 'werkzaam', x + 270, y + 30, 1, C.groen, 32, 'center', 800); regel(ctx, 'schadelijk', x + w + 20, y + 120, q.on('schade', 1), C.koraal, 32, 'left', 800);
      const yy = y + h - 0.43 * h, xa = x + 150 / 1000 * w, xb = x + 560 / 1000 * w; const da = q.on('afstand', 1); pijl(ctx, (xa + xb) / 2, yy, xa + 8, yy, C.goud, da, 5, 18); pijl(ctx, (xa + xb) / 2, yy, xb - 8, yy, C.goud, da, 5, 18);
      regel(ctx, 'therapeutische breedte', (xa + xb) / 2, yy + 120, q.on('therapeutische', 1), C.goud, 36, 'center', 800); });
    laag(ctx, P, () => { const pan = (x, nm, Kw, Ks, a, an) => { if (a <= 0.01) return; laag(ctx, a, () => { const y = 260, w = 700, h = 380; grafAssen(ctx, x, y, w, h, 1, 'DOSIS', 'EFFECT'); curve(ctx, x, y, w, h, 1000, Kw, 2.5, C.groen, 1, 1, 5); curve(ctx, x, y, w, h, 1000, Ks, 3, C.koraal, 1, 1, 5);
        const yy = y + h - 0.43 * h, xa = x + Kw / 1000 * w, xb = x + Ks / 1000 * w; pijl(ctx, (xa + xb) / 2, yy, xa + 6, yy, C.goud, an, 4, 14); pijl(ctx, (xa + xb) / 2, yy, xb - 6, yy, C.goud, an, 4, 14); tag(ctx, nm, x + w / 2, 200, C.text, 1, 'center', 32); }); };
      pan(170, 'penicilline', 80, 860, 1, q.on('groot', 1)); chip(ctx, 'brede kloof', 520, 790, C.groen, q.on('groot', 1), 28);
      pan(1060, 'lithium', 330, 520, q.on('lithium', 1), q.on('dicht', 1)); chip(ctx, 'smalle kloof', 1410, 790, C.koraal, q.on('dicht', 1), 28); metaA(ctx, 'BIJ EEN BIPOLAIRE STOORNIS', 1410, 145, q.on('bipolaire', 1), C.grain, 'center', 22);
      vraagteken(ctx, 1410, 520, q.on('denk', 1) * 0.9, 100); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('paracetamol', 1, 0.8);
    laag(ctx, 1 - P, () => { bloedbuis(ctx, 330, 500, 1.3, 1, clamp(t / 1.2, 0, 1)); naamBij(ctx, 'bloedbuisje', 'naar het lab', 330, 760, 1, 'center');
      const v = 0.5 + 0.08 * Math.sin(t * 1.3); spiegelBalk(ctx, 640, 460, 1000, 0.35, 0.65, v, q.on('bloedspiegel', 1), q.on('grenzen', 1)); metaA(ctx, 'BLOEDSPIEGEL LITHIUM', 640, 340, q.on('bloedspiegel', 1), C.grain, 'left', 24); });
    laag(ctx, P, () => { paraDoos(ctx, 620, 500, 1.25, 1, q.on('dag', 1)); lever(ctx, 1380, 500, 1.4, q.on('lever', 1), q.on('ernstig', 1, 1.5)); naamBij(ctx, 'lever', '', 1380, 680, q.on('lever', 1), 'center');
      chip(ctx, 'veel meer dan het maximum', 1380, 300, C.koraal, q.on('maximum', 1), 28); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Prednison', 1, 0.8), Auit = q.on('arts', 1, 0.5), A = clamp((t - q.at('arts', 1) - 0.5) / 0.6, 0, 1);
    laag(ctx, 1 - R, () => { const S = persoon(ctx, 'sam', 330, 860, 600, { t, uit: 'neutraal', kijk: 1, outfit: 'sport' }); const hy = S.heup ? S.heup.y : 600;
      // maag op de romp en gewricht (enkel) gemarkeerd
      const mg = q.on('maag', 1); laag(ctx, mg, () => { ctx.beginPath(); ctx.ellipse(352, hy - 95, 36, 26, -0.4, 0, 6.283); shape(ctx, rgba('#E39A9A', 0.85), '#F4C0C0', 3); });
      const gw = q.on('slot', 1); laag(ctx, gw, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(352, 820, 34, 0, 6.283); ctx.stroke(); });
      inzoom(ctx, 860, 330, 170, gw, C.goud, () => { const b = q.on('remt', 1, 1); enzym(ctx, 860, 360, 1.7, 1, b); });
      naamBij(ctx, 'in het gewricht', 'pijn en ontsteking', 1050, 250, gw);
      inzoom(ctx, 1240, 620, 230, mg, '#E39A9A', () => { const dun = ef(clamp((t - q.at('lang', 1)) / 2.5, 0, 1)), sch = ef(clamp((t - q.at('beschadigd', 1)) / 1.2, 0, 1)); maagwand(ctx, 1010, 660, 460, (1 - 0.85 * dun) * q.on('beschermen', 1, 1), sch, t);
        enzym(ctx, 1240, 735, 1.0, 1, q.on('maag', 1, 1)); });
      naamBij(ctx, 'in de maagwand', 'beschermlaag', 1500, 470, mg);
      regel(ctx, 'hetzelfde slot, een andere plek', 1240, 170, gw, C.goud, 36, 'center', 800); });
    laag(ctx, R * (1 - Auit), () => { steroid(ctx, 230, 280, 34, C.goud, 1, true); naamBij(ctx, 'prednison', '', 300, 380, 1, 'center');
      steroid(ctx, 230, 510, 34, C.paars, q.on('cortisol', 1), false); naamBij(ctx, 'cortisol', 'film: Stress', 300, 610, q.on('cortisol', 1), 'center');
      const cr = q.on('receptor', 1), al = q.on('cellen', 1, 1.2); for (let i = 0; i < 8; i++) { const cx = 720 + (i % 4) * 230, cy = 290 + Math.floor(i / 4) * 230; cortCel(ctx, cx, cy, 95, cr * clamp(i < 1 ? 1 : al * 8 - (i - 1), 0, 1), ef(clamp((t - q.at('cellen', 1) - i * 0.12) / 0.6, 0, 1)), t); }
      metaA(ctx, 'RECEPTOR IN BIJNA ELKE CEL', 1065, 160, cr, C.grain, 'center', 24);
      suikerOmhoog(ctx, 760, 760, q.on('bloedsuiker', 1), q.on('stijgen', 1, 1)); regel(ctx, 'bloedsuiker', 800, 850, q.on('bloedsuiker', 1), C.text, 28, 'center', 700);
      huidLagen(ctx, 1040, 700, 200, q.on('dunner', 1, 1.5), q.on('huid', 1)); regel(ctx, 'huid', 1140, 850, q.on('huid', 1), C.text, 28, 'center', 700);
      bot(ctx, 1500, 760, 1.0, q.on('brozer', 1, 1.2), q.on('botten', 1)); regel(ctx, 'bot', 1500, 850, q.on('botten', 1), C.text, 28, 'center', 700); });
    laag(ctx, A, () => { weegschaal(ctx, 960, 480, 1.2, 0.3 * ef(clamp((t - q.at('kost', 1)) / 1.2, 0, 1)) - 0.3 * q.on('levert', 1), 1, q.on('levert', 1) > 0.5 ? 'opbrengst' : '', q.on('kost', 1) > 0.5 ? 'kosten' : '');
      metaA(ctx, 'DE ARTS WEEGT AF', 960, 220, 1, C.grain, 'center', 26); }); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); kamer(ctx, t, { uit: 'blij', koel: q.on('koelt', 1), leeg: q.on('één', 1) > 0.5 ? 2 : 1 });
    naamBij(ctx, 'Sam', 'koelt zijn enkel', 300, 300, 1 - q.on('farmacodynamiek', 1)); klok(ctx, 1640, 300, 70, 6 * clamp((t - q.at('zes', 1)) / 2, 0, 1), q.on('zes', 1)); regel(ctx, 'na 6 uur: 1 tablet', 1640, 420, q.on('zes', 1), C.text2, 30, 'center', 700);
    laag(ctx, q.on('medicijn', 1), () => { grafAssen(ctx, 1500, 560, 300, 140, 1, '', ''); curve(ctx, 1500, 560, 300, 140, 1000, 130, 1.5, C.goud, 1, 1, 4); }); regel(ctx, 'farmacodynamiek', 1340, 200, q.on('farmacodynamiek', 1), C.goud, 48, 'center', 800); },
  s13(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 330, 860, 470, { t, outfit: 'practicum', uit: 'blij', pose: 'wijs', kijk: 1, a: q.on('Farmacologen', 1, 0.3) });
    ctx.fillStyle = '#3A4458'; ctx.fillRect(480, 700, 760, 24); schaaltje(ctx, 620, 670, 90, 1, t, C.teal, 2); schaaltje(ctx, 850, 670, 90, q.on('aangrijpt', 1), t, C.paars, 5); schaaltje(ctx, 1080, 670, 90, q.on('dosis', 1), t, C.groen, 9);
    laag(ctx, q.on('dosis', 1), () => { grafAssen(ctx, 660, 260, 460, 230, 1, 'DOSIS', ''); curve(ctx, 660, 260, 460, 230, 1000, 130, 1.5, C.groen, 1, 1, 5); curve(ctx, 660, 260, 460, 230, 1000, 620, 3, C.koraal, q.on('schaden', 1, 1), 1, 5); });
    tag(ctx, 'farmacie', 1560, 330, C.teal, q.on('farmacie', 1), 'center', 34); regel(ctx, 'o.a. apotheker', 1560, 400, q.on('farmacie', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'farmaceutische wetenschappen', 1560, 540, C.teal, q.on('wetenschappen', 1), 'center', 34); regel(ctx, 'geneesmiddelonderzoek', 1560, 610, q.on('wetenschappen', 1), C.text2, 28, 'center', 600);
    metaA(ctx, 'UNIVERSITEIT', 1560, 720, q.on('universiteit', 1), C.grain, 'center', 26); }
});
