
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
// Wat word jij? · Farmacie 3 · Achter de balie — eigen tekeningen (20 okt 2026)

const MIDDEL = { ibuprofen: C.koraal, ace: C.paars, plas: C.teal, para: C.groen };
const LIJST = ['plastablet', 'ACE-remmer', 'bloeddrukpil (amlodipine)', 'bètablokker', 'maagbeschermer']; // gelijk aan film 1 (amlodipine)
const LIJST_KL = [C.teal, C.paars, C.oker, C.goud, C.groen];

// kast met doosjes achter de balie (achtergrond, gedempt)
function apotheekKast(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.55;
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#22324E', '#33466A', 2); const rows = 3, cols = [C.teal, C.koraal, C.oker, C.paars, C.groen, '#E8E2D4'];
  for (let r = 0; r < rows; r++) { const yy = y + (r + 1) * h / rows; ctx.fillStyle = '#3A4E72'; ctx.fillRect(x, yy - 8, w, 8);
    let xx = x + 16; let k = r * 7; while (xx < x + w - 50) { const bw = 34 + (hash(k) * 30 | 0), bh = 50 + (hash(k + 50) * 40 | 0); ctx.fillStyle = cols[k % cols.length]; ctx.fillRect(xx, yy - 8 - bh, bw, bh); ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(xx, yy - 8 - bh + 10, bw, 8); xx += bw + 8; k++; } }
  ctx.restore(); }
// groen apotheekkruis aan de wand
function apotheekKruis(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.groen; const b = 34 * s, l = 100 * s; roundRect(ctx, x - b / 2, y - l / 2, b, l, 6); ctx.fill(); roundRect(ctx, x - l / 2, y - b / 2, l, b, 6); ctx.fill(); ctx.restore(); }
// toonbank: blad op hoogte y, front tot de vloer
function balie(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#34486A'; ctx.fillRect(x + 10, y + 18, w - 20, 880 - y - 18); ctx.fillStyle = '#2A3B58'; ctx.fillRect(x + 10, y + 18, w - 20, 10);
  for (let i = 1; i < 4; i++) { ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(x + i * w / 4, y + 40, 3, 880 - y - 60); }
  roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9B08A', '#E0CCA6', 1.5); ctx.restore(); }

// medicijndoosje; (x,y) = midden onderkant
function doosje(ctx, x, y, w, h, col, lab = '', a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lift = hl * 14;
  if (hl > 0.01) { roundRect(ctx, x - w / 2 - 8, y - h - 8 - lift, w + 16, h + 16, 10); shape(ctx, rgba(col, 0.25 * hl), rgba(col, hl), 3); }
  roundRect(ctx, x - w / 2, y - h - lift, w, h, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h * 0.62 - lift, w, h * 0.22);
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - w / 2 + 10, y - h * 0.25 - lift, w * 0.5, 5);
  if (lab) text(ctx, lab, x, y - h - 18 - lift, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
// strip met tabletten (blister)
function strip(ctx, x, y, s, col, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -34, 140, 68, 8); shape(ctx, '#C8CED8', '#9AA3B2', 2); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { circ(ctx, -48 + i * 32, -14 + j * 28, 11, '#F2F2EE', rgba(col, 0.9), 3); }
  ctx.restore(); if (lab) regel(ctx, lab, x, y - 50 * s, a, C.text, 24, 'center', 700); }
// rond tablet met breukstreep
function tablet(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', col, Math.max(2, r * 0.22)); ctx.strokeStyle = rgba(col, 0.8); ctx.lineWidth = Math.max(1.5, r * 0.12); ctx.beginPath(); ctx.moveTo(x - r * 0.55, y); ctx.lineTo(x + r * 0.55, y); ctx.stroke(); ctx.restore(); }
// capsule
function capsule(ctx, x, y, s, col, a = 1, rot = -0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -46 * s, -20 * s, 92 * s, 40 * s, 20 * s); ctx.save(); ctx.clip(); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-46 * s, -20 * s, 92 * s, 40 * s); ctx.fillStyle = col; ctx.fillRect(-46 * s, -20 * s, 46 * s, 40 * s); ctx.restore(); roundRect(ctx, -46 * s, -20 * s, 92 * s, 40 * s, 20 * s); ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
// icoon van een middel (rond, met kleur) + naam eronder
function middelIcoon(ctx, x, y, soort, a = 1, naam = '', hl = 0) { if (a <= 0.01) return; const col = MIDDEL[soort]; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, 58, rgba(col, 0.18 + 0.15 * hl), col, 2.5 + 2 * hl); if (soort === 'plas') { tablet(ctx, x, y, 30, col); } else if (soort === 'ace') { capsule(ctx, x, y, 0.85, col); } else tablet(ctx, x, y, 30, col);
  ctx.restore(); if (naam) naamBij(ctx, naam, '', x, y + 100, a, 'center'); }

// monitor op de balie; (x,y) = voet; signaal 0..1 = rood bolletje
function monitor(ctx, x, y, a = 1, signaal = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 10, y - 50, 20, 50); ctx.fillRect(x - 50, y - 8, 100, 8);
  roundRect(ctx, x - 130, y - 220, 260, 175, 10); shape(ctx, '#2A3446', '#6A7488', 3); roundRect(ctx, x - 118, y - 208, 236, 151, 6); shape(ctx, '#DDE6F0', null);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = LIJST_KL[i]; ctx.fillRect(x - 104, y - 192 + i * 24, 12, 12); ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 84, y - 190 + i * 24, 110 + (i % 3) * 20, 8); }
  if (signaal > 0.01) { const p = 0.75 + 0.25 * Math.sin(t * 7); ctx.globalAlpha *= signaal; roundRect(ctx, x - 112, y - 74, 224, 14, 4); shape(ctx, rgba('#D8573F', 0.9), null); circ(ctx, x + 88, y - 186, 16 * p, '#D8573F'); text(ctx, '!', x + 88, y - 177, fTekst(24, 800), '#FFFFFF', 'center'); }
  ctx.restore(); }

// groot scherm met de medicatielijst; o: lijst, nieuw, scan (0..5), signaal, hl (regelindices)
function medScherm(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { lijst = 1, nieuw = 0, scan = -1, signaal = 0, hl = [], t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 16, y - 16, w + 32, h + 32, 18); shape(ctx, '#2A3446', '#6A7488', 3); roundRect(ctx, x, y, w, h, 10); shape(ctx, '#E6EDF5', null);
  ctx.fillStyle = '#C9D4E2'; ctx.fillRect(x, y, w, 64); text(ctx, 'Opa Henk · 71 jaar · medicatie', x + 30, y + 43, fTekst(30, 700), '#1A2740', 'left');
  const rh = 64, y0 = y + 90;
  LIJST.forEach((s2, i) => { const al = clamp(lijst * 6 - i, 0, 1); if (al <= 0) return; ctx.save(); ctx.globalAlpha *= al; const yy = y0 + i * rh; const isH = hl.includes(i) ? signaal : 0;
    if (isH > 0.01) { roundRect(ctx, x + 14, yy - 6, w - 28, rh - 8, 8); shape(ctx, rgba('#D8573F', 0.18 * isH), rgba('#D8573F', isH), 2.5); }
    if (Math.abs(scan - i) < 0.5) { roundRect(ctx, x + 14, yy - 6, w - 28, rh - 8, 8); shape(ctx, rgba(C.teal, 0.25), null); }
    ctx.fillStyle = LIJST_KL[i]; roundRect(ctx, x + 30, yy + 8, 30, 30, 6); ctx.fill(); text(ctx, s2, x + 80, yy + 35, fTekst(30, 600), '#1A2740', 'left'); text(ctx, '1× per dag', x + w - 40, yy + 35, fTekst(24, 500), '#5A6478', 'right'); ctx.restore(); });
  if (nieuw > 0.01) { const yy = y0 + 5 * rh + 10, dx = (1 - ease(nieuw)) * 80; ctx.save(); ctx.globalAlpha *= clamp(nieuw * 2, 0, 1); roundRect(ctx, x + 14 + dx, yy - 6, w - 28, rh - 4, 8); shape(ctx, signaal > 0.01 ? rgba('#D8573F', 0.22 * signaal + 0.05) : rgba(C.goud, 0.2), signaal > 0.01 ? '#D8573F' : C.goud, 3);
    tablet(ctx, x + 45 + dx, yy + 25, 15, C.koraal); text(ctx, 'ibuprofen 400 mg', x + 80 + dx, yy + 36, fTekst(30, 800), '#1A2740', 'left'); text(ctx, 'NIEUW', x + w - 40 + dx, yy + 36, fTekst(24, 800), '#A8402F', 'right'); ctx.restore(); }
  if (signaal > 0.01) { ctx.save(); ctx.globalAlpha *= signaal; const p = 1 + 0.08 * Math.sin(t * 6); roundRect(ctx, x + w - 330, y + 10, 300, 44, 10); shape(ctx, '#D8573F', null); text(ctx, '⚠  SIGNAAL', x + w - 180, y + 42, fTekst(28, 800), '#FFFFFF', 'center'); ctx.restore(); }
  ctx.restore(); }

// glomerulus (schematisch): aanvoerend vaatje links onder, afvoerend links boven, kluwen in het kapsel, voorurine naar rechts.
// o: knijp 0..1 (ibuprofen), open 0..1 (ACE-remmer), droog 0..1 (plastablet), druk 0..1, t
function glomerulus(ctx, cx, cy, s, a = 1, o = {}) { if (a <= 0.01) return; const { knijp = 0, open = 0, droog = 0, druk = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(s, s);
  const wA = 46 * (1 - 0.55 * knijp), wE = 30 * (1 + 0.75 * open);
  // kapsel van Bowman (bekervorm, open aan de linkerkant)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(20, 0, 180, -2.55, 2.55); ctx.stroke();
  ctx.fillStyle = rgba(C.teal, 0.10); ctx.beginPath(); ctx.arc(20, 0, 172, -2.55, 2.55); ctx.closePath(); ctx.fill();
  // afvoer voorurine naar rechts
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(196, -30); ctx.lineTo(430, -30); ctx.moveTo(196, 30); ctx.lineTo(430, 30); ctx.stroke(); ctx.fillStyle = rgba(C.teal, 0.10); ctx.fillRect(196, -24, 234, 48);
  // vaatjes
  const vat = (pts, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); };
  const PA = [[-470, 100], [-260, 70], [-110, 30]], PE = [[-110, -30], [-260, -70], [-470, -100]];
  vat(PA, wA + 8, '#7A2E2E'); vat(PA, wA, '#C24A42'); vat(PE, wE + 8, '#7A2E2E'); vat(PE, wE, '#B0443E');
  // kluwen: lussen haarvaatjes
  const lus = (k) => { const an = k * 1.05 + 0.3; return [20 + Math.cos(an) * 62, Math.sin(an) * 62]; };
  ctx.strokeStyle = '#7A2E2E'; ctx.lineWidth = 22; for (let k = 0; k < 6; k++) { const [lx, ly] = lus(k); ctx.beginPath(); ctx.ellipse(lx, ly, 62, 40, k * 1.05 + 0.3, 0, 6.283); ctx.stroke(); }
  ctx.strokeStyle = '#D0574C'; ctx.lineWidth = 14; for (let k = 0; k < 6; k++) { const [lx, ly] = lus(k); ctx.beginPath(); ctx.ellipse(lx, ly, 62, 40, k * 1.05 + 0.3, 0, 6.283); ctx.stroke(); }
  // bloedcellen: dichtheid daalt bij weinig vocht en een knijpend aanvoerend vaatje
  const nA = Math.round(9 * (1 - 0.35 * droog) * (1 - 0.4 * knijp));
  particleFlow(ctx, [[-470, 100], [-260, 70], [-110, 30], [-40, 10]], nA, t, 120 * (1 - 0.3 * knijp), '#F2B0A6', Math.max(4, wA * 0.2), 3);
  particleFlow(ctx, [[-40, -10], [-110, -30], [-260, -70], [-470, -100]], Math.round(nA * 0.8), t, 140 * (1 + 0.4 * open), '#F2B0A6', Math.max(4, wE * 0.24), 21);
  for (let k = 0; k < 6; k++) { const ph = (t * 0.5 + k / 6) % 1, [lx, ly] = lus(k), an = ph * 6.283; circ(ctx, lx + Math.cos(an) * 62 * Math.cos(k * 1.05 + 0.3) - Math.sin(an) * 40 * Math.sin(k * 1.05 + 0.3), ly + Math.cos(an) * 62 * Math.sin(k * 1.05 + 0.3) + Math.sin(an) * 40 * Math.cos(k * 1.05 + 0.3), 5, '#F2B0A6'); }
  // voorurine: druppels uit de kluwen naar rechts, aantal volgt de druk
  const nD = Math.round(14 * clamp(druk, 0, 1));
  for (let k = 0; k < nD; k++) { const ph = (t * 0.35 + hash(k + 7)) % 1, an = hash(k + 3) * 6.283; const sx = 20 + Math.cos(an) * 110, sy = Math.sin(an) * 110; let x2, y2;
    if (ph < 0.5) { const u = ph / 0.5; x2 = lerp(sx, 200, u); y2 = lerp(sy, (hash(k) - 0.5) * 30, u); } else { const u = (ph - 0.5) / 0.5; x2 = 200 + u * 220; y2 = (hash(k) - 0.5) * 30; }
    ctx.fillStyle = rgba(C.teal, 0.9); ctx.beginPath(); ctx.arc(x2, y2, 7, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// drukmeter: halve wijzerplaat, v 0..1
function drukmeter(ctx, x, y, r, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  [[0, 0.33, '#D8573F'], [0.33, 0.6, C.oker], [0.6, 1, C.groen]].forEach(([u0, u1, col]) => { ctx.strokeStyle = col; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.arc(x, y, r, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI); ctx.stroke(); });
  const an = Math.PI + clamp(v, 0, 1) * Math.PI; ctx.strokeStyle = C.text; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.85, y + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, x, y, 12, C.text);
  ctx.restore(); }

// hart dat zwaarder moet pompen (last 0..1)
function hart(ctx, x, y, s, a = 1, t = 0, last = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const p = 1 + 0.05 * Math.sin(t * (6 + 4 * last)) + 0.06 * last; ctx.translate(x, y); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 90); ctx.bezierCurveTo(-150, -10, -110, -130, 0, -60); ctx.bezierCurveTo(110, -130, 150, -10, 0, 90); ctx.closePath(); shape(ctx, last > 0.5 ? '#C24A42' : '#D0574C', lighten('#D0574C', 0.3), 3);
  ctx.strokeStyle = rgba('#7A2E2E', 0.7); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-6, -50); ctx.quadraticCurveTo(10, 10, -10, 60); ctx.stroke(); ctx.restore(); }
// waterdruppel
function druppel(ctx, x, y, r, col = C.teal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.quadraticCurveTo(x + r, y - r * 0.2, x + r * 0.95, y + r * 0.2); ctx.arc(x, y + r * 0.2, r * 0.95, 0, Math.PI); ctx.quadraticCurveTo(x - r, y - r * 0.2, x, y - r * 1.6); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore(); }
// zoutkorrel (kubusje)
function zoutje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.fillStyle = '#C8CED8'; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r * 0.4, y - r * 1.6); ctx.lineTo(x + r * 1.6, y - r * 1.6); ctx.lineTo(x + r, y - r); ctx.fill(); ctx.restore(); }

// dagbalk 7:00–23:00; uurX geeft de x van een uur
function uurX(x, w, u) { return x + (u - 7) / 16 * w; }
function dagBalk(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { nacht = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 16, w, 32, 16); shape(ctx, '#2A3A58', C.line, 1.5);
  [8, 12, 17, 22].forEach(u => { const xx = uurX(x, w, u); ctx.fillStyle = C.line; ctx.fillRect(xx - 1.5, y - 22, 3, 44); text(ctx, u + ':00', xx, y + 56, fTekst(24, 600), C.text2, 'center'); });
  zon(ctx, x - 60, y, 20, 1, 0); ctx.save(); ctx.globalAlpha *= 0.6 + 0.4 * nacht; ctx.beginPath(); ctx.arc(x + w + 60, y, 24, 0, 6.283); ctx.arc(x + w + 72, y - 8, 22, 0, 6.283, true); ctx.fillStyle = '#E8E2C8'; ctx.fill('evenodd'); ctx.restore(); ctx.restore(); }

// medicijnrol: rol links, strook zakjes naar rechts; u = uitgerold 0..1; gehad = aantal lege zakjes met vinkje
const ROL_LAB = ['ma 8:00', 'ma 14:00', 'ma 22:00', 'di 8:00', 'di 14:00', 'di 22:00'];
function medRol(ctx, x, y, a = 1, u = 1, gehad = 0, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const zw = 170, L = n * zw * clamp(u, 0, 1);
  for (let i = 0; i < n; i++) { const zx = x + 40 + i * zw; if (zx + zw > x + 40 + L + 1) break; const leeg = i < gehad;
    roundRect(ctx, zx + 4, y - 80, zw - 8, 160, 10); shape(ctx, rgba('#E6EDF5', leeg ? 0.35 : 0.9), '#AFC0D0', 2); ctx.strokeStyle = rgba('#5A6478', 0.6); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(zx + zw, y - 76); ctx.lineTo(zx + zw, y + 76); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, ROL_LAB[i % ROL_LAB.length], zx + zw / 2, y - 42, fTekst(26, 800), leeg ? C.text2 : '#1A2740', 'center');
    if (!leeg) { const k = i % 3 === 1 ? [C.teal] : (i % 3 === 0 ? [C.paars, C.oker, C.goud] : [C.goud]); k.forEach((col, j) => tablet(ctx, zx + zw / 2 + (j - (k.length - 1) / 2) * 40, y + 25, 15, col)); }
    else vink_(ctx, zx + zw / 2, y + 20, 26, 1, C.groen); }
  circ(ctx, x, y, 92, '#E6EDF5', '#AFC0D0', 3); for (let r = 80; r > 20; r -= 14) circ(ctx, x, y, r, null, rgba('#9AA3B2', 0.6), 2); circ(ctx, x, y, 18, '#5A6478');
  ctx.restore(); }

// telpoppetje (alleen in groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// tegel met een reden om medicijnen anders te nemen
function redenTegel(ctx, x, y, soort, lab, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = hl > 0.5 ? C.goud : C.teal;
  roundRect(ctx, x - 90, y - 90, 180, 180, 18); shape(ctx, rgba(col, 0.12 + 0.12 * hl), rgba(col, 0.6 + 0.4 * hl), 2 + 2 * hl); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'vergeten') { roundRect(ctx, x - 50, y - 50, 100, 100, 10); shape(ctx, '#F2EEE4', null); ctx.fillStyle = C.koraal; ctx.fillRect(x - 50, y - 50, 100, 24); text(ctx, '?', x, y + 38, fTitel(60), '#1A2740', 'center'); }
  else if (soort === 'bijwerking') { tablet(ctx, x - 22, y + 18, 28, C.oker); ctx.beginPath(); ctx.moveTo(x + 34, y - 58); ctx.lineTo(x + 74, y + 10); ctx.lineTo(x - 6, y + 10); ctx.closePath(); shape(ctx, C.goud, null); text(ctx, '!', x + 34, y + 2, fTekst(44, 800), '#1A2740', 'center'); }
  else if (soort === 'verschil') { text(ctx, '=', x, y + 30, fTekst(110, 800), C.text, 'center'); tablet(ctx, x - 52, y - 46, 16, C.paars); tablet(ctx, x + 52, y - 46, 16, C.paars); }
  else if (soort === 'wc') { ctx.fillStyle = '#F2F2EE'; roundRect(ctx, x - 40, y - 62, 34, 70, 6); ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 8, y + 8, 50, 16, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(x - 30, y + 10); ctx.quadraticCurveTo(x - 20, y + 62, x + 20, y + 62); ctx.lineTo(x + 30, y + 30); ctx.lineTo(x + 50, y + 14); ctx.fill(); druppel(ctx, x + 50, y - 44, 12, C.teal); }
  ctx.restore(); if (lab) regel(ctx, lab, x, y + 132, a, C.text, 28, 'center', 700); }

// denkwolk
function denkWolk(ctx, x, y, w, h, a = 1, dx = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3D5C';
  for (let k = 0; k < 9; k++) { const an = k / 9 * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * w * 0.36, y + Math.sin(an) * h * 0.3, w * 0.2, h * 0.26, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, w * 0.46, h * 0.42, 0, 0, 6.283); ctx.fill(); circ(ctx, x + dx * w * 0.32, y + h * 0.6, 14, '#2E3D5C'); circ(ctx, x + dx * w * 0.4, y + h * 0.78, 9, '#2E3D5C'); ctx.restore(); }
// bloemetje en tuin
function bloem(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 70 * s); ctx.stroke(); ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.ellipse(x + 14 * s, y - 30 * s, 14 * s, 6 * s, -0.5, 0, 6.283); ctx.fill();
  for (let k = 0; k < 5; k++) { const an = k * 1.2566; circ(ctx, x + Math.cos(an) * 14 * s, y - 70 * s + Math.sin(an) * 14 * s, 10 * s, col); } circ(ctx, x, y - 70 * s, 8 * s, C.goud); ctx.restore(); }
function schepje(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate((ang || 0) - Math.PI / 2); ctx.fillStyle = '#8C5A3A'; ctx.fillRect(-5, -10, 10, 70); ctx.fillStyle = '#9AA3B2'; ctx.beginPath(); ctx.moveTo(-18, 60); ctx.lineTo(18, 60); ctx.lineTo(10, 110); ctx.lineTo(0, 120); ctx.lineTo(-10, 110); ctx.closePath(); ctx.fill(); ctx.restore(); }
function tasje(ctx, x, y) { ctx.save(); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y + 14, 16, Math.PI, 0); ctx.stroke(); roundRect(ctx, x - 34, y + 14, 68, 70, 8); shape(ctx, '#E6E1D3', '#C8C2B2', 2); apotheekKruis(ctx, x, y + 50, 0.28); ctx.restore(); }
// envelop
function envelop(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 50 * s, y - 34 * s, 100 * s, 68 * s, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 50 * s, y - 34 * s); ctx.lineTo(x, y + 6 * s); ctx.lineTo(x + 50 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
// lijst op papier (vijf medicijnen); vink = aantal vinkjes, weg = index doorgestreept (0..1)
function lijstPapier(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { vink = 0, dubbel = 0, weg = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const rh = 54, h = 5 * rh + 70;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'medicijnen Henk', x + 30, y + 46, fTekst(28, 800), '#1A2740', 'left');
  LIJST.forEach((s2, i) => { const yy = y + 70 + i * rh; ctx.fillStyle = LIJST_KL[i]; roundRect(ctx, x + 30, yy + 10, 24, 24, 5); ctx.fill(); ctx.save(); ctx.globalAlpha *= i === 4 ? 1 - 0.55 * weg : 1; text(ctx, s2, x + 70, yy + 32, fTekst(28, 600), '#1A2740', 'left'); ctx.restore();
    const vk = clamp(vink - i, 0, 1); if (vk > 0.01 && !(i === 4 && weg > 0.5)) vink_(ctx, x + w - 40, yy + 20, 14, vk, '#3E8A55');
    if (i === 4 && weg > 0.01) { ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 64, yy + 22); ctx.lineTo(x + 64 + (w - 100) * ease(weg), yy + 22); ctx.stroke(); }
    if (dubbel > 0.01 && (i === 2 || i === 3)) { ctx.save(); ctx.globalAlpha *= dubbel * (0.6 + 0.4 * Math.sin(t * 6)); roundRect(ctx, x + 14, yy + 2, w - 28, rh - 6, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }
// tafel (blad + poten), voor de personen getekend
function tafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x + 30, y + 20, 16, 880 - y - 20); ctx.fillRect(x + w - 46, y + 20, 16, 880 - y - 20); roundRect(ctx, x, y, w, 26, 6); shape(ctx, '#C9A35C', '#E0C27E', 1.5); ctx.fillStyle = '#8C6A44'; ctx.fillRect(x + 10, y + 26, w - 20, 14); ctx.restore(); }
// ziekenhuisbedje (icoon)
function bedje(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.fillRect(-30, -24, 6, 40); ctx.fillRect(24, -10, 6, 26); roundRect(ctx, -30, -6, 60, 12, 4); ctx.fill(); circ(ctx, -14, -16, 8, col); roundRect(ctx, -4, -20, 30, 14, 5); ctx.fill(); ctx.restore(); }
// nier (boonvorm, klein icoon)
function niertje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(10, -60); ctx.bezierCurveTo(70, -70, 80, 60, 10, 60); ctx.bezierCurveTo(-30, 60, -30, 20, -10, 10); ctx.bezierCurveTo(-20, 0, -20, -10, -10, -14); ctx.bezierCurveTo(-30, -24, -30, -58, 10, -60); ctx.closePath(); shape(ctx, '#A8524A', '#D07A70', 3); ctx.restore(); }
// jaarblokken voor een opleiding
function jaarBlokken(ctx, x, y, n, col, a = 1, u = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const al = clamp(u * n - i, 0, 1); if (al <= 0) continue; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x + i * 112, y, 100, 70, 10); shape(ctx, rgba(col, 0.35), col, 2); text(ctx, String(i + 1), x + i * 112 + 50, y + 47, fTekst(30, 800), C.text, 'center'); ctx.restore(); }
  if (lab) regel(ctx, lab, x + n * 56 - 6, y + 110, a * clamp(u * 1.5, 0, 1), C.text2, 26, 'center', 700); ctx.restore(); }
// Wat word jij? · Farmacie 3 · Achter de balie — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk als patiënt; Apotheker Ravi; Dr. Kim als huisarts in H4).
// Rode draad: Opa Henk haalt zijn medicijnen op en vraagt er ibuprofen bij.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function schaal(ctx, x, y, s, fn) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
// apotheek: kast achter, Ravi achter de balie, monitor, doosjes; Henk ervoor (links)
function apotheek(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  apotheekKast(ctx, 820, 150, 940, 390); if (o.kruis !== false) apotheekKruis(ctx, 220, 230, 0.9, o.kruis == null ? 1 : o.kruis);
  persoon(ctx, 'ravi', 1440, 880, 530, { t, kijk: o.ravKijk || -1, uit: o.uitR || 'neutraal', pose: o.poseR || 'staan', a: o.ravi == null ? 1 : o.ravi });
  balie(ctx, 760, 600, 1020); monitor(ctx, 1680, 600, 1, o.signaal || 0, t);
  const d = o.doos == null ? 1 : o.doos; for (let i = 0; i < 5; i++) doosje(ctx, 920 + i * 120, 598, 72, 82, LIJST_KL[i], '', d * clamp(d * 5 - i, 0, 1), (o.hl || [])[i] || 0);
  persoon(ctx, 'henk', 560, 880, 430, { t, kijk: 1, uit: o.uitH || 'neutraal', pose: o.poseH || 'vasthouden', hold: o.tas === false ? null : (c, x, y) => tasje(c, x, y) });
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { apotheekKruis(ctx, 1640, 250, 1); for (let i = 0; i < 5; i++) doosje(ctx, 1240 + i * 100, 640, 72, 82, LIJST_KL[i]); strip(ctx, 1450, 760, 1, C.koraal); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const sig = q.on('aarzelt', 1);
    apotheek(ctx, t, { doos: q.on('vijf', 1, 1), hl: [q.on('plastablet', 1) * (1 - q.on('hartfalen', 1) * 0.5), q.on('ACE', 1) * (1 - q.on('hartfalen', 1) * 0.5)], signaal: sig,
      ravKijk: t > q.at('scherm', 1) ? 1 : -1, uitR: sig > 0.5 ? 'bezorgd' : 'neutraal', poseR: sig > 0.5 ? 'denk' : 'staan', uitH: q.on('knie', 1) > 0.5 && q.on('ibuprofen', 1) < 0.5 ? 'bezorgd' : 'neutraal' });
    naamBij(ctx, 'Opa Henk', '', 560, 410, q.on('Henk', 1, 0.4) * (1 - q.on('vijf', 1)), 'center');
    naamBij(ctx, 'plastablet', '', 920, 668, q.on('plastablet', 1), 'center'); naamBij(ctx, 'ACE-remmer', '', 1040, 724, q.on('ACE', 1), 'center');
    hart(ctx, 300, 360, 0.42, q.on('hartfalen', 1), t, 0.6); naamBij(ctx, 'hartfalen', '', 300, 450, q.on('hartfalen', 1), 'center');
    const kn = q.on('knie', 1) * (1 - q.on('ibuprofen', 1)); if (kn > 0.01) { for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; circ(ctx, 590, 790, 14 + ph * 46, null, rgba(C.koraal, kn * (1 - ph)), 4); } }
    strip(ctx, 300, 620, 0.8, C.groen, q.on('paracetamol', 1), ''); naamBij(ctx, 'paracetamol', '', 300, 560, q.on('paracetamol', 1), 'center');
    strip(ctx, 300, 790, 0.8, C.koraal, q.on('ibuprofen', 1)); naamBij(ctx, 'ibuprofen', '', 300, 735, q.on('ibuprofen', 1), 'center');
    naamBij(ctx, 'Apotheker Ravi', '', 1440, 370, q.on('Ravi', 1) * (1 - q.on('aarzelt', 1)), 'center');
    vraagteken(ctx, 1250, 135, q.on('Waarom', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a', 1 - q.on('Bovendien', 1)); const N = q.on('nier', 1, 0.8), B = q.on('Bovendien', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; const ts = q.at('kijkt', 1);
      medScherm(ctx, 240, 230, 900, 560, 1, { lijst: clamp((t - 0.3) / 1.2, 0, 1), nieuw: clamp((t - q.at('nieuw', 1)) / 0.8, 0, 1), scan: t > ts && t < q.at('gebruikt', 1) + 0.6 ? Math.floor((t - ts) * 2.2) % 5 : -1, signaal: q.on('signaal', 1), hl: [0, 1], t });
      tag(ctx, 'medicatiebewaking', 690, 190, C.goud, q.on('medicatiebewaking', 1), 'center', 32);
      persoon(ctx, 'ravi', 1520, 880, 480, { t, kijk: -1, pose: t > q.at('signaal', 1) ? 'wijs' : 'staan', uit: t > q.at('signaal', 1) ? 'bezorgd' : 'neutraal' }); ctx.restore(); }
    if (N > 0.01 && B < 0.99) { ctx.save(); ctx.globalAlpha *= N * (1 - B);
      const kn = q.on('knijpt', 1, 1.2), op = q.on('open', 1, 1.2), dr = q.on('vocht', 1, 1.2), Z = q.on('zakt', 1, 1.5);
      const druk = 1 - 0.1 * kn - 0.08 * op - 0.08 * dr - 0.5 * Z;
      glomerulus(ctx, 1100, 470, 1, 1, { knijp: kn, open: op, droog: dr, druk, t });
      naamBij(ctx, 'filtertjes', '', 1120, 245, q.on('filtertjes', 1), 'center');
      naamBij(ctx, 'aanvoerend vaatje', '', 930, 640, q.on('aanvoerend', 1), 'center', kn > 0.3 ? C.koraal : C.text); naamBij(ctx, 'afvoerend vaatje', '', 830, 320, q.on('afvoerend', 1), 'center', op > 0.3 ? C.paars : C.text);
      naamBij(ctx, 'naar de urine', '', 1420, 420, q.on('filtertjes', 1) * 0.9, 'center', C.text2);
      // drie middelen met hun pijl
      middelIcoon(ctx, 260, 300, 'ace', q.on('ACE', 1), 'ACE-remmer', op); pijl(ctx, 330, 320, 680, 382, C.paars, op, 5, 20);
      middelIcoon(ctx, 260, 470, 'plas', q.on('plastablet', 1), 'plastablet', dr); pijl(ctx, 330, 480, 610, 560, C.teal, dr, 5, 20);
      middelIcoon(ctx, 260, 660, 'ibuprofen', q.on('Ibuprofen', 1), 'ibuprofen', kn); pijl(ctx, 330, 650, 760, 572, C.koraal, kn, 5, 20);
      if (dr > 0.01) for (let k = 0; k < 6; k++) { const ph = (t * 0.45 + k / 6) % 1; druppel(ctx, 660 + k * 22 + ph * 10, 600 + ph * 200, 10, C.teal, dr * (1 - ph)); }
      const M = q.on('apart', 1); drukmeter(ctx, 1640, 250, 90, druk, M); naamBij(ctx, 'filterdruk', '', 1640, 300, M, 'center');
      tag(ctx, 'samen: nier filtert slecht', 1420, 720, C.koraal, q.on('slecht', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const zv = q.on('vasthouden', 1, 1.5), last = q.on('belast', 1, 1);
      middelIcoon(ctx, 330, 450, 'ibuprofen', 1, 'ibuprofen'); pijl(ctx, 420, 450, 640, 450, C.line, q.on('zout', 1), 4, 16);
      for (let k = 0; k < 10; k++) { const al = clamp(zv * 10 - k, 0, 1); const w = wander(k, t, 6, 0.5); if (k % 2) druppel(ctx, 760 + (k % 5) * 50 + w.x, 400 + Math.floor(k / 5) * 90 + w.y, 16, C.teal, al); else zoutje(ctx, 760 + (k % 5) * 50 + w.x, 410 + Math.floor(k / 5) * 90 + w.y, 12, al); }
      naamBij(ctx, 'zout en vocht blijven', '', 860, 620, q.on('zout', 1), 'center'); pijl(ctx, 1040, 450, 1260, 450, C.line, q.on('belast', 1), 4, 16);
      hart(ctx, 1420, 440, 0.75, q.on('belast', 1), t, last); naamBij(ctx, 'zwak hart', '', 1420, 600, q.on('zwak', 1), 'center');
      const O = q.on('ouderen', 1, 0.3); persoon(ctx, 'henk', 1700, 880, 400, { t, a: O, kijk: -1, uit: 'bezorgd' }); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('andere', 1), G = q.on('Hoeveel', 1, 0.8), W = q.on('plastablet', 1) * (1 - G);
    apotheek(ctx, t, { a: 1 - G, kruis: 0, doos: 1, hl: [A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7, A * (1 - G) * 0.7], ravKijk: -1, uitR: t < q.at('vaker', 1) ? 'praat' : 'blij', poseR: t < q.at('andere', 1) ? 'wijs' : 'staan', uitH: t > q.at('geeft', 1) ? 'bezorgd' : 'neutraal' });
    // ibuprofen gaat weg, paracetamol verdeeld over de dag
    const ib = 1 - q.on('paracetamol', 1, 0.8); strip(ctx, 300, 790, 0.8, C.koraal, Math.max(ib, 0) * (1 - G)); kruis(ctx, 300, 790, 34, q.on('gewone', 1) * ib);
    strip(ctx, 300, 790, 0.8, C.groen, q.on('paracetamol', 1) * (1 - G)); naamBij(ctx, 'paracetamol', '', 300, 735, q.on('paracetamol', 1) * (1 - A), 'center');
    const D = q.on('verdeeld', 1) * (1 - A); dagBalk(ctx, 170, 260, 540, D); [8, 12, 17, 22].forEach((u, i) => tablet(ctx, uurX(170, 540, u), 200, 20, C.groen, D * clamp((t - q.at('verdeeld', 1)) * 2.5 - i, 0, 1)));
    // Henk: plastablet overslaan op tuinclubdag
    denkWolk(ctx, 380, 250, 420, 230, W, 1); tablet(ctx, 300, 250, 30, C.teal, W); kruis(ctx, 300, 250, 40, q.on('overslaat', 1) * W); bloem(ctx, 440, 300, 0.9, C.koraal, q.on('tuinclub', 1) * W); bloem(ctx, 500, 290, 0.75, C.goud, q.on('tuinclub', 1) * W);
    naamBij(ctx, 'tuinclub', '', 470, 120, q.on('tuinclub', 1) * W, 'center');
    if (G > 0.01) { for (let i = 0; i < 20; i++) popje(ctx, 620 + (i % 10) * 76, 380 + Math.floor(i / 10) * 115, 24, '#5A6478', G * clamp((t - q.at('Hoeveel', 1)) * 6 - i * 0.3, 0, 1)); vraagteken(ctx, 960, 680, q.on('denk', 1), 110); } },

  // ---------- H3 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('plastablet', 1)); const P = q.on('plastablet', 1, 0.8), R = q.on('pillen', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; const hf = q.on('helft', 1, 1.2);
      for (let i = 0; i < 20; i++) popje(ctx, 620 + (i % 10) * 76, 300 + Math.floor(i / 10) * 115, 24, i % 2 && hf > 0.5 ? C.goud : '#5A6478', 1);
      regel(ctx, 'ongeveer de helft', 960, 470, hf, C.goud, 36, 'center', 800);
      tag(ctx, 'lui?', 1600, 330, C.koraal, q.on('luiheid', 1), 'center', 34); kruis(ctx, 1690, 310, 24, q.on('luiheid', 1, 0.4) * clamp((t - q.at('luiheid', 1) - 0.5) * 2, 0, 1));
      const prak = q.on('praktische', 1);
      redenTegel(ctx, 420, 650, 'vergeten', 'vergeten', q.on('vergeet', 1)); redenTegel(ctx, 780, 650, 'bijwerking', 'bijwerkingen', q.on('bijwerkingen', 1)); redenTegel(ctx, 1140, 650, 'verschil', 'geen verschil', q.on('verschil', 1)); redenTegel(ctx, 1500, 650, 'wc', 'vaak naar de wc', prak, prak);
      ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; const x0 = 300, w = 1200, y = 280; dagBalk(ctx, x0, y, w, 1, { nacht: q.on('nachts', 1) });
      const club = q.on('clubdagen', 1, 1); const tIn = lerp(8, 14.5, club), dur = 6;
      // tuinclub 9:00–14:00
      ctx.save(); ctx.globalAlpha *= q.on('plastablet', 1); roundRect(ctx, uurX(x0, w, 9), y - 150, uurX(x0, w, 14) - uurX(x0, w, 9), 64, 12); shape(ctx, rgba(C.groen, 0.18), C.groen, 2); bloem(ctx, uurX(x0, w, 9) + 40, y - 92, 0.6, C.koraal); regel(ctx, 'tuinclub', uurX(x0, w, 11.8), y - 106, 1, C.text, 28, 'center', 700); ctx.restore();
      // werking van de plastablet: vaak naar de wc
      const sh = q.on('paar', 1, 1); ctx.save(); ctx.globalAlpha *= sh; roundRect(ctx, uurX(x0, w, tIn), y - 14, uurX(x0, w, tIn + dur) - uurX(x0, w, tIn), 28, 14); shape(ctx, rgba(C.teal, 0.6), C.teal, 2);
      for (let k = 0; k < 4; k++) druppel(ctx, uurX(x0, w, tIn + 0.8 + k * 1.4), y + 90, 11, C.teal, 1); ctx.restore();
      tablet(ctx, uurX(x0, w, tIn), y - 50, 24, C.teal, 1); kruis(ctx, uurX(x0, w, 11), y - 118, 30, sh * (1 - club) * 0.9);
      naamBij(ctx, 'thuis', '', uurX(x0, w, 14.5), y + 140, q.on('thuis', 1), 'center');
      const L = q.on('vijf', 1); ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(uurX(x0, w, 17), y - 70); ctx.lineTo(uurX(x0, w, 17), y + 24); ctx.moveTo(uurX(x0, w, 17), y + 72); ctx.lineTo(uurX(x0, w, 17), y + 112); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      naamBij(ctx, 'uiterlijk 17:00', '', uurX(x0, w, 17) + 20, y + 150, L, 'left', C.koraal);
      if (R > 0.01) { medRol(ctx, 330, 690, R, clamp((t - q.at('zakje', 1) + 1.5) / 2.5, 0, 1), Math.floor(clamp((t - q.at('oogopslag', 1)) * 1.5, 0, 2))); naamBij(ctx, 'medicijnrol', '', 330, 820, q.on('rol', 1), 'center'); }
      persoon(ctx, 'henk', 1720, 880, 400, { t, kijk: -1, uit: 'blij' }); ctx.restore(); } },

  // ---------- H4 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('medicatiebeoordeling', 1);
    persoon(ctx, 'henk', 300, 880, 420, { t, a: q.on('mensen', 1, 0.3), kijk: 1, uit: 'neutraal' });
    persoon(ctx, 'ravi', 700, 880, 450, { t, kijk: t < q.at('mensen', 1) ? 1 : -1, uit: 'praat', pose: t > q.at('Werkt', 1) && t < q.at('nodig', 1) ? 'wijs' : 'staan' });
    persoon(ctx, 'kim', 1100, 880, 440, { t, a: q.on('bericht', 1, 0.3), kijk: -1, outfit: 'gewoon', uit: 'neutraal' });
    tafel(ctx, 150, 650, 1110, q.on('mensen', 1, 0.4));
    const ev = clamp((t - q.at('bericht', 1)) / 1.4, 0, 1); if (ev > 0 && ev < 1) envelop(ctx, lerp(760, 1050, ev), 420 - Math.sin(ev * Math.PI) * 120, 1, Math.min(1, (1 - ev) * 4));
    naamBij(ctx, 'Opa Henk', 'patiënt', 300, 380, q.on('patiënt', 1) * (1 - S), 'center'); naamBij(ctx, 'Apotheker Ravi', 'apotheker', 700, 352, q.on('apotheker', 1) * (1 - S), 'center'); naamBij(ctx, 'Dr. Kim', 'huisarts', 1100, 360, q.on('huisarts', 1) * (1 - S), 'center');
    lijstPapier(ctx, 1320, 230, 540, q.on('lijst', 1), { vink: clamp((t - q.at('Werkt', 1)) * 4, 0, 5), dubbel: q.on('dubbel', 1) * (1 - q.on('Kan', 1)), weg: clamp((t - q.at('nodig', 1) + 0.6) / 0.8, 0, 1), t });
    tag(ctx, 'medicatiebeoordeling', 700, 200, C.goud, S, 'center', 32); vraagteken(ctx, 1590, 740, q.on('doel', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b', 1 - q.on('apotheker', 1)); const A = q.on('apotheker', 1, 0.8);
    if (A < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - A; const cx = 520, cy = 500, R = 210, n = Math.round(clamp((t - q.at('meer', 1)) * 3 + 2, 2, 8));
      const P = []; for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / 8 * 6.283; P.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R]); }
      const L = q.on('kans', 1), K = q.on('elkaar', 1); ctx.lineWidth = 3; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { ctx.strokeStyle = rgba(K > 0.5 ? C.koraal : C.line, 0.55 * L); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); }
      const pa = q.on('patiënt', 1); if (pa > 0.01) { for (let i = 0; i < n; i++) { ctx.strokeStyle = rgba(C.koraal, 0.6 * pa); ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(cx, cy); ctx.stroke(); } gezichtIcoon(ctx, cx, cy, 1.1, pa, 'henk'); }
      P.forEach(([x, y], i) => tablet(ctx, x, y, 30, [C.teal, C.paars, C.oker, C.goud, C.groen, C.koraal, C.teal, C.paars][i], 1));
      // ziekenhuisopnames: 1 op 20
      const Z = q.on('twintig', 1), O = q.on('ziekenhuisopnames', 1);
      for (let i = 0; i < 20; i++) bedje(ctx, 1050 + (i % 10) * 76, 330 + Math.floor(i / 10) * 90, 1.1, i === 13 && O > 0.5 ? C.koraal : '#7A8496', Z * clamp((t - q.at('twintig', 1)) * 8 - i * 0.4, 0, 1));
      naamBij(ctx, 'acute ziekenhuisopnames', '', 1390, 260, Z, 'center');
      const V = q.on('helft', 1, 1.2); balk(ctx, 1050, 600, 690, 0.46 * V, C.groen, '', q.on('helft', 1, 0.4)); bedje(ctx, 1010, 620, 1, C.koraal, q.on('helft', 1, 0.4)); naamBij(ctx, 'bijna de helft te voorkomen', '', 1050, 700, q.on('voorkomen', 1), 'left', C.groen); ctx.restore(); }
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; persoon(ctx, 'ravi', 700, 880, 470, { t, kijk: 1, uit: 'praat', pose: t > q.at('advies', 1) ? 'wijs' : 'staan' });
      niertje(ctx, 560, 230, 0.8, q.on('lichaam', 1)); hart(ctx, 700, 210, 0.36, q.on('lichaam', 1), t, 0); tablet(ctx, 840, 220, 24, C.teal, q.on('medicijnen', 3)); capsule(ctx, 910, 250, 0.6, C.paars, q.on('medicijnen', 3));
      persoon(ctx, 'henk', 1250, 880, 430, { t, kijk: -1, uit: 'blij', a: q.on('vertaalt', 1, 0.3) }); tag(ctx, 'advies voor Henk', 1000, 330, C.goud, q.on('advies', 1), 'center', 30); ctx.restore(); } },

  // ---------- Recap ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = '#2F4A3A'; ctx.beginPath(); ctx.moveTo(0, 880); ctx.quadraticCurveTo(960, 700, 1920, 860); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.fill();
    zon(ctx, 1700, 170, 50, 1, t); [[300, C.koraal], [380, C.goud], [1250, C.paars], [1340, C.koraal], [1430, C.goud], [1520, C.koraal]].forEach(([x, col], i) => bloem(ctx, x, 830 - Math.sin(x / 1920 * Math.PI) * 60, 1.1, col));
    persoon(ctx, 'henk', 820, 870, 440, { t, kijk: 1, uit: 'blij', pose: 'vasthouden', hold: (c, x, y, an) => schepje(c, x, y, 0.4) });
    const D = q.on('verdeeld', 1); dagBalk(ctx, 260, 200, 900, q.on('paracetamol', 1)); [8, 12, 17, 22].forEach((u, i) => tablet(ctx, uurX(260, 900, u), 140, 18, C.groen, D * clamp((t - q.at('verdeeld', 1)) * 3 - i, 0, 1)));
    naamBij(ctx, 'paracetamol', '', 710, 300, q.on('paracetamol', 1), 'center');
    schaal(ctx, 1200, 470, 0.6, () => medRol(ctx, 0, 0, q.on('rol', 1), clamp((t - q.at('rol', 1)) / 1.2, 0, 1), 2, 4)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('farmacie', 1), M = q.on('master', 1), B = q.on('balie', 1);
    regel(ctx, 'apotheker', 160, 230, q.on('apotheker', 1), C.text, 44, 'left', 800); metaA(ctx, 'universiteit · 6 jaar', 160, 272, q.on('universiteit', 1), C.grain, 'left', 24);
    jaarBlokken(ctx, 160, 320, 3, C.teal, q.on('bachelor', 1), clamp((t - q.at('bachelor', 1)) * 2, 0, 1), 'bachelor farmacie'); jaarBlokken(ctx, 530, 320, 3, C.paars, M, clamp((t - q.at('master', 1)) * 2, 0, 1), 'master farmacie');
    regel(ctx, 'apothekersassistent', 160, 560, q.on('apothekersassistenten', 1), C.text, 44, 'left', 800); metaA(ctx, 'mbo · niveau 4', 160, 602, q.on('mbo', 1), C.grain, 'left', 24);
    jaarBlokken(ctx, 160, 650, 3, C.oker, q.on('mbo', 1), clamp((t - q.at('mbo', 1)) * 2, 0, 1), '');
    apotheekKast(ctx, 1080, 180, 760, 360, 1); persoon(ctx, 'ravi', 1420, 880, 520, { t, kijk: -1, uit: 'blij', a: 1 - q.on('apothekersassistenten', 1, 0.3) }); balie(ctx, 1080, 600, 760); monitor(ctx, 1700, 600, 1, 0, t); naamBij(ctx, 'apothekersassistent', 'aan de balie', 1460, 700, q.on('apothekersassistenten', 1), 'center');
    for (let i = 0; i < 3; i++) doosje(ctx, 1160 + i * 90, 598, 66, 76, LIJST_KL[i], '', B * clamp((t - q.at('balie', 1)) * 4 - i, 0, 1)); }
});
