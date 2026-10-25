
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
// Wat word jij? · Forensisch onderzoek 2 · Hoe zeker is een match? — eigen tekeningen (25 okt 2026)
// Look: Schema. Rode draad: de balans die het SPOOR weegt (nooit de verdachte), met hypothese 1 links en hypothese 2 rechts.
// Kleuren: goud = focus (Erik in een mengsel, de ander bij overdracht), teal = Bilal / de bewoner, paars = DNA.
// Maten: keukenmes ± 30 cm (heft ± 11 cm); naast een persoon van 420 px (± 1,75 m) is het mes ± 72 px.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, d = 0.7) { return ease((t - t0) / d); }
const PAPIER = '#ECE6D8', INKT = '#1A2740', INKT2 = '#5A6478';
const KL_HEFT = '#6B4A34', KL_HEFT2 = '#57392A', KL_STAAL = '#C9CED6', KL_STAAL2 = '#9AA3B2', KL_METAAL = '#AFC0D0';

// ---------------------------------------------------------------------------------------------
// BALANS (weegschaal met twee schalen). (x, y) = draaipunt boven op de paal. s = schaal.
// o.tilt: 0 = in evenwicht, 1 = links (hypothese 1) helemaal omlaag. o.L / o.R = {naam, sub, kans, aN, aK}
// Namen staan direct onder de schaal (naamBij), de kans eronder. Bekende fout: schalen die met de balk mee kantelen.
function balans(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const tilt = clamp(o.tilt || 0, -1, 1);
  const th = -tilt * 0.3, L = 340 * s, hang = 170 * s, pw = 210 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // voet en paal
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 80 * s, y + 352 * s, 160 * s, 24 * s, 10 * s); shape(ctx, '#2A3A58', KL_METAAL, 2);
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(x, y + 352 * s); ctx.lineTo(x, y); ctx.stroke();
  ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, y + 340 * s); ctx.lineTo(x, y + 20 * s); ctx.stroke();
  // wijzer
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(th) * 90 * s, y - Math.cos(th) * 90 * s); ctx.stroke();
  // balk
  const ex = Math.cos(th) * L, ey = Math.sin(th) * L;
  ctx.strokeStyle = KL_METAAL; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke();
  circ(ctx, x, y, 16 * s, '#2A3A58', KL_METAAL, 3);
  const pan = (px, py, kant) => { // touwtjes + schaal, altijd recht naar beneden
    ctx.strokeStyle = rgba(KL_METAAL, 0.9); ctx.lineWidth = 2.2;
    const by = py + hang; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px + pw * 0.48, by); ctx.moveTo(px, py); ctx.lineTo(px, by - 6 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - pw * 0.52, by); ctx.quadraticCurveTo(px, by + 62 * s, px + pw * 0.52, by); ctx.closePath(); shape(ctx, '#2A3A58', KL_METAAL, 2.5);
    circ(ctx, px, py, 6 * s, KL_METAAL);
    const d = kant < 0 ? o.L : o.R; if (!d) return;
    if (d.vul) d.vul(ctx, px, by, s);
    naamBij(ctx, d.naam, d.sub || '', px, by + 78 * s, d.aN == null ? 1 : d.aN, 'center');
    if (d.kans) { const ak = d.aK == null ? 1 : d.aK; if (ak > 0.01) regel(ctx, d.kans, px, by + 78 * s + (d.sub ? 76 : 50), ak, d.kansKl || C.goud, 34, 'center', 800); } };
  pan(x - ex, y - ey, -1); pan(x + ex, y + ey, 1);
  if (o.titel) metaA(ctx, o.titel, x, y - 110 * s, o.aT == null ? 1 : o.aT, C.grain, 'center', o.titelPx || 26);
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// MES (keukenmes, van opzij, punt naar rechts). (x, y) = overgang heft-lemmet, len = totale lengte.
// heft ± 37 % van de lengte, met drie klinknagels; lemmet staal met snijkant onder en rugje boven.
function mes(ctx, x, y, len, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const rot = o.rot || 0;
  const hl = len * 0.37, bl = len * 0.63, hh = len * 0.085, bh = len * 0.12;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  // lemmet
  ctx.beginPath(); ctx.moveTo(0, -bh * 0.45); ctx.lineTo(bl * 0.82, -bh * 0.38); ctx.quadraticCurveTo(bl * 0.97, -bh * 0.3, bl, -bh * 0.05);
  ctx.quadraticCurveTo(bl * 0.7, bh * 0.62, 0, bh * 0.55); ctx.closePath(); shape(ctx, KL_STAAL, KL_STAAL2, 1.5);
  ctx.strokeStyle = rgba('#FFFFFF', 0.5); ctx.lineWidth = Math.max(1, len * 0.006); ctx.beginPath(); ctx.moveTo(len * 0.02, bh * 0.38); ctx.quadraticCurveTo(bl * 0.6, bh * 0.4, bl * 0.96, -bh * 0.02); ctx.stroke();
  // heft
  roundRect(ctx, -hl, -hh, hl + 4, hh * 2, hh * 0.8); shape(ctx, KL_HEFT, _mixHex(KL_HEFT, '#000000', 0.25), 1.5);
  ctx.fillStyle = KL_HEFT2; ctx.fillRect(-hl * 0.95, hh * 0.25, hl * 0.9, hh * 0.35);
  for (let i = 0; i < 3; i++) circ(ctx, -hl * (0.22 + i * 0.28), 0, Math.max(2, hh * 0.22), '#C9CED6', null);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-2, -bh * 0.5, 6, bh * 1.05); // bolster
  if (o.druppels) { for (const [u, v, r] of [[0.45, 0.1, 0.028], [0.62, 0.0, 0.02]]) circ(ctx, bl * u, bh * v, len * r * 0.5, rgba(C.koraal, 0.9)); }
  if (o.swab) { const sa = o.swab; ctx.save(); ctx.globalAlpha *= sa; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(bl * 0.55, bh * 0.05, bl * 0.2, bh * 0.42, 0, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  // DNA-stippen op het heft: o.stip = [{n, r, col, a}]
  if (o.stip) o.stip.forEach((st, k) => { const sa = st.a == null ? 1 : st.a; if (sa <= 0.01) return;
    for (let i = 0; i < st.n; i++) { const u = hash(i * 7 + k * 31 + (o.seed || 0)), v = hash(i * 13 + k * 17 + (o.seed || 0) + 3);
      circ(ctx, -hl * (0.08 + 0.84 * u), (v - 0.5) * hh * 1.3, st.r, rgba(st.col, 0.95 * sa), rgba('#121A26', 0.6 * sa), 1); } });
  ctx.restore();
}
// bewijszak: doorzichtige zak met rode strook, label en verzegeling; tekent het mes erin
function bewijszak(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, rgba('#DCE5EC', 0.12), rgba('#DCE5EC', 0.7), 2.5);
  ctx.fillStyle = rgba(C.koraal, 0.85); ctx.fillRect(x - w / 2 + 2, y - h / 2 + 2, w - 4, 22);
  mes(ctx, x - w * 0.12, y + h * 0.05, w * 0.78, { druppels: o.druppels, stip: o.stip, rot: -0.05 });
  roundRect(ctx, x + w * 0.12, y + h * 0.18, w * 0.34, h * 0.24, 6); shape(ctx, PAPIER, '#B8B0A0', 1.5);
  text(ctx, 'BEWIJS', x + w * 0.29, y + h * 0.31, fMeta(Math.max(18, h * 0.08)), INKT, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// KRANTENKNIPSEL (verzonnen krant, geen bestaande naam). (x, y) = linksboven.
function krantKnipsel(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { sub = 0, kopHl = 0, streep = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + w / 2, y + h / 2); ctx.rotate(o.rot || -0.015); ctx.translate(-w / 2, -h / 2);
  ctx.beginPath(); ctx.moveTo(0, 6); for (let i = 0; i <= 20; i++) ctx.lineTo(w * i / 20, (i % 2) * 5); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); shape(ctx, PAPIER, '#B8B0A0', 1.5);
  const k = w / 700;
  metaText(ctx, 'binnenland', 34 * k, 52 * k, INKT2, 'left', 22 * k);
  ctx.fillStyle = INKT; ctx.fillRect(34 * k, 66 * k, w - 68 * k, 2);
  text(ctx, 'DNA op mes:', 34 * k, 142 * k, fTitel(62 * k), INKT, 'left');
  text(ctx, '‘Hij was het’', 34 * k, 214 * k, fTitel(62 * k), INKT, 'left');
  if (kopHl > 0.01) { ctx.save(); ctx.globalAlpha *= kopHl; ctx.fillStyle = C.goud; ctx.fillRect(34 * k, 228 * k, 380 * k * kopHl, 6 * k); ctx.restore(); }
  if (sub > 0.01) { ctx.save(); ctx.globalAlpha *= sub; text(ctx, 'Inbraak: bewoner gewond, verdachte opgepakt', 34 * k, 276 * k, fTekst(30 * k, 700), INKT2, 'left'); ctx.restore(); }
  ctx.fillStyle = rgba(INKT2, 0.35); for (let c = 0; c < 2; c++) for (let i = 0; i < 4; i++) ctx.fillRect(34 * k + c * (w / 2 - 10 * k), 312 * k + i * 22 * k, (w / 2 - 50 * k) * (i === 3 ? 0.6 : 1), 8 * k);
  if (streep > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 8 * k; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(26 * k, 120 * k); ctx.lineTo(26 * k + (w - 52 * k) * streep, 120 * k + 60 * k * streep); ctx.stroke();
    if (streep > 0.5) { const s2 = (streep - 0.5) * 2; ctx.beginPath(); ctx.moveTo(26 * k, 196 * k); ctx.lineTo(26 * k + 420 * k * s2, 196 * k - 10 * k * s2); ctx.stroke(); } }
  ctx.restore();
}
// dossierkaart met pasfoto (castpersonage via gezichtIcoon)
function dossier(ctx, x, y, id, naam, rol, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const s = o.s || 1;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150 * s, y - 80 * s, 300 * s, 160 * s, 12); shape(ctx, PAPIER, '#B8B0A0', 2);
  gezichtIcoon(ctx, x - 90 * s, y, 1.25 * s, 1, id);
  text(ctx, naam, x - 20 * s, y - 14 * s, fTekst(36 * s, 700), INKT, 'left');
  text(ctx, rol.toUpperCase(), x - 20 * s, y + 26 * s, fMeta(22 * s), INKT2, 'left');
  ctx.restore();
}
// getypte notitie (officier van justitie): papier, kop in meta, tekst in mono die verschijnt (typ 0..1)
function notitie(ctx, x, y, w, kop, regels, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const typ = o.typ == null ? 1 : o.typ, px = o.px || 32;
  const h = 96 + regels.length * (px + 16);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0.012);
  roundRect(ctx, 0, 0, w, h, 8); shape(ctx, PAPIER, '#B8B0A0', 2);
  metaText(ctx, kop, 30, 50, INKT2, 'left', 22); ctx.fillStyle = rgba(INKT2, 0.5); ctx.fillRect(30, 64, w - 60, 2);
  const tot = regels.join('').length; let n = Math.floor(tot * typ);
  regels.forEach((r, i) => { const s2 = r.slice(0, Math.max(0, n)); n -= r.length; text(ctx, s2, 30, 112 + i * (px + 16), fMeta(px), INKT, 'left'); });
  if (o.kruis > 0.01) kruis(ctx, w / 2, h / 2, Math.min(w, h) * 0.32, o.kruis, C.koraal);
  ctx.restore(); return h;
}

// ---------------------------------------------------------------------------------------------
// DNA-PROFIEL als rij vakjes: per STR de naam (meta) en twee allelen. Echte locusnamen uit de PowerPlex Fusion 6C-kit.
const LOCI = [['D3S1358', '15 17'], ['vWA', '16 18'], ['D16S539', '11 12'], ['CSF1PO', '10 12'], ['TPOX', '8 11'], ['D8S1179', '13 14'],
              ['D21S11', '29 30'], ['D18S51', '14 16'], ['D2S441', '11 14'], ['D19S433', '13 14'], ['TH01', '6 9.3'], ['FGA', '21 24']];
const LOCI_GRIJS = [4, 7, 10];  // gaven geen uitslag (deelprofiel)
// (x, y) = linksboven; o.grijs 0..1 = de drie grijze vakken grijzen uit; o.amelo 0..1 = vak 'amelogenine X Y' licht op
function strProfiel(ctx, x, y, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { grijs = 0, amelo = 0, cw = 132, ch = 104, gap = 10, per = 6, toon = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  LOCI.forEach(([nm, al], i) => { const u = clamp(toon * LOCI.length - i, 0, 1); if (u <= 0.01) return;
    const cx = x + (i % per) * (cw + gap), cy = y + Math.floor(i / per) * (ch + gap); const g = LOCI_GRIJS.includes(i) ? grijs : 0;
    ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, cx, cy, cw, ch, 10); shape(ctx, g > 0.5 ? '#2A3040' : rgba(C.paars, 0.16), g > 0.5 ? rgba(C.line, 0.4) : rgba(C.paars, 0.8), 1.5);
    text(ctx, nm, cx + cw / 2, cy + 34, fMeta(22), g > 0.5 ? C.text2 : C.grain, 'center');
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; text(ctx, '—', cx + cw / 2, cy + 82, fTekst(36, 700), C.text2, 'center'); ctx.restore(); }
    if (g < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - g; text(ctx, al, cx + cw / 2, cy + 82, fTekst(36, 700), C.text, 'center'); ctx.restore(); }
    ctx.restore(); });
  // amelogenine (geslacht)
  const rows = Math.ceil(LOCI.length / per), ax = x, ay = y + rows * (ch + gap), aw = 2 * cw + gap;
  if (toon > 0.99) { roundRect(ctx, ax, ay, aw, ch * 0.8, 10); shape(ctx, rgba(C.paars, 0.1 + 0.15 * amelo), amelo > 0.5 ? C.goud : rgba(C.paars, 0.6), amelo > 0.5 ? 2.5 : 1.5);
    text(ctx, 'AMELOGENINE', ax + 20, ay + 34, fMeta(22), C.grain, 'left');
    text(ctx, 'X Y', ax + 20, ay + 72, fTekst(32, 700), C.text, 'left');
    if (amelo > 0.01) regel(ctx, 'man', ax + aw - 24, ay + 72, amelo, C.goud, 32, 'right', 800); }
  ctx.restore();
}
// beeldscherm (monitor) met inhoud via callback
function scherm(ctx, x, y, w, h, inhoud, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 16); shape(ctx, '#2A3446', '#5A6478', 2);
  roundRect(ctx, x, y, w, h, 8); shape(ctx, '#121A26', null);
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x + w / 2 - 20, y + h + 14, 40, 44); roundRect(ctx, x + w / 2 - 110, y + h + 56, 220, 16, 6); shape(ctx, '#3A4458', null);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); if (inhoud) inhoud(); ctx.restore();
  ctx.restore();
}
// labtafel (rand onderaan, zoals de werkbank in Laboratoriumtechniek)
function labtafel(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#3A4458', 0.85); ctx.fillRect(120, 790, 1680, 16); ctx.fillStyle = rgba('#2A3446', 0.6); ctx.fillRect(120, 806, 1680, 10); ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// NFI-SCHAAL (verbale schaal voor de likelihood ratio) als liniaal met zes vakken
const NFI = [['1 – 2', 'ongeveer even', 'waarschijnlijk'], ['2 – 10', 'iets', 'waarschijnlijker'], ['10 – 100', 'waarschijnlijker', ''],
             ['100 – 10.000', 'veel', 'waarschijnlijker'], ['10.000 – 1 miljoen', 'zeer veel', 'waarschijnlijker'], ['> 1 miljoen', 'extreem veel', 'waarschijnlijker']];
// o.hl = [a0..a5] (0..1 per vak: licht op), o.dim = sterkte van niet-genoemde vakken, o.wijs = index + o.aW: gouden pijl in dat vak met o.waarde
function nfiSchaal(ctx, x, y, w, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const hl = o.hl || [], gap = 8, bw = (w - 5 * gap) / 6, bh = o.bh || 150, dimA = o.dim == null ? 0.45 : o.dim;
  ctx.save(); ctx.globalAlpha *= a;
  NFI.forEach(([r, w1, w2], i) => { const u = hl[i] || 0, bx = x + i * (bw + gap);
    ctx.save(); ctx.globalAlpha *= dimA + (1 - dimA) * u;
    roundRect(ctx, bx, y, bw, bh, 10); shape(ctx, u > 0.5 ? rgba(C.goud, 0.14) : '#2A3A58', u > 0.5 ? C.goud : rgba(C.line, 0.7), u > 0.5 ? 2.5 : 1.5);
    text(ctx, r, bx + bw / 2, y + 38, fTekst(26, 600), C.text2, 'center');
    text(ctx, w1, bx + bw / 2, y + 88, fTekst(w1.length > 13 ? 28 : 32, 700), C.text, 'center');
    if (w2) text(ctx, w2, bx + bw / 2, y + 124, fTekst(24, 600), C.text2, 'center');
    ctx.restore(); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + bh + 14); ctx.lineTo(x + w, y + bh + 14); ctx.stroke();
  for (let i = 0; i <= 6; i++) { const tx = x + i * (bw + gap) - (i === 6 ? gap : 0) - (i > 0 && i < 6 ? gap / 2 : 0); ctx.beginPath(); ctx.moveTo(tx, y + bh + 6); ctx.lineTo(tx, y + bh + 24); ctx.stroke(); }
  if (o.wijs != null && (o.aW || 0) > 0.01) { const bx = x + o.wijs * (bw + gap) + bw * (o.wijsU == null ? 0.5 : o.wijsU); ctx.save(); ctx.globalAlpha *= o.aW;
    pijl(ctx, bx, y - 90, bx, y - 10, C.goud, 1, 5, 18); if (o.waarde) regel(ctx, o.waarde, bx, y - 104, 1, C.goud, 36, 'center', 800); ctx.restore(); }
  ctx.restore();
}

// ---------------------------------------------------------------------------------------------
// KAART VAN NEDERLAND (vereenvoudigde omtrek, lengte/breedte → px; IJsselmeer en Wadden weggelaten)
const NL = [[3.37, 51.37], [3.9, 51.21], [4.25, 51.37], [4.8, 51.5], [5.1, 51.43], [5.5, 51.3], [5.85, 51.15], [5.65, 50.85], [5.75, 50.76], [6.02, 50.75], [6.08, 50.92],
  [5.9, 51.05], [6.17, 51.2], [6.08, 51.42], [6.2, 51.6], [5.95, 51.8], [6.4, 51.85], [6.75, 51.92], [6.85, 52.12], [7.05, 52.25], [6.7, 52.45], [7.05, 52.62], [7.2, 53.0],
  [7.2, 53.24], [6.9, 53.38], [6.4, 53.43], [5.9, 53.38], [5.4, 53.2], [5.35, 53.05], [4.98, 52.92], [4.75, 52.96], [4.62, 52.45], [4.42, 52.18], [4.1, 52.0], [3.95, 51.85],
  [4.05, 51.74], [3.6, 51.62], [3.45, 51.52]];
function kaartNL(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const k = 160 * s;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  NL.forEach(([lo, la], i) => { const px = x + (lo - 5.3) * 0.62 * k, py = y + (52.1 - la) * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
  ctx.closePath(); shape(ctx, o.vul || '#2A3A58', o.rand || C.line, 2.5);
  ctx.restore();
}
// telpoppetje (alleen in een telling): eenvoudig pictogram
function telpop(ctx, x, y, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(x, y - h * 0.82, h * 0.16, 0, 6.283); ctx.fill(); roundRect(ctx, x - h * 0.22, y - h * 0.62, h * 0.44, h * 0.62, h * 0.16); ctx.fill(); ctx.restore(); }
// breuk: teller over noemer met streep; (x, y) = midden van de streep
function breuk(ctx, x, y, boven, onder, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const px = o.px || 56, w = o.w || 360, aB = o.aB == null ? 1 : o.aB, aO = o.aO == null ? 1 : o.aO;
  ctx.save(); ctx.globalAlpha *= a;
  regel(ctx, boven, x, y - 24, aB, o.kB || C.text, px, 'center', 800);
  ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke();
  regel(ctx, onder, x, y + px + 14, aO, o.kO || C.text, px, 'center', 800);
  if (o.subB) metaA(ctx, o.subB, x, y - px - 46, aB, C.grain, 'center', 22);
  if (o.subO) metaA(ctx, o.subO, x, y + px + 60, aO, C.grain, 'center', 22);
  ctx.restore();
}
// rechtbank als lijnicoon in een afgeronde rechthoek (Schema, mens-en-maatschappij)
function rechtbankIcoon(ctx, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -150, 300, 300, 24); shape(ctx, '#2A3A58', C.line, 2);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-100, -50); ctx.lineTo(0, -105); ctx.lineTo(100, -50); ctx.closePath(); ctx.stroke();
  for (let i = 0; i < 4; i++) { const px = -72 + i * 48; ctx.beginPath(); ctx.moveTo(px, -36); ctx.lineTo(px, 64); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-110, 80); ctx.lineTo(110, 80); ctx.moveTo(-96, -40); ctx.lineTo(96, -40); ctx.stroke();
  ctx.restore();
}
// klok met een wijzer die een stuk van de cirkel vult (minuten)
function klok(ctx, x, y, r, frac, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82); ctx.lineTo(x + Math.sin(an) * r * 0.92, y - Math.cos(an) * r * 0.92); ctx.stroke(); }
  if (frac > 0.001) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.55); ctx.fill(); }
  const an = frac * 6.283; ctx.strokeStyle = INKT; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(an) * r * 0.72, y - Math.cos(an) * r * 0.72); ctx.stroke(); circ(ctx, x, y, 6, INKT);
  ctx.restore(); }
// stripvak met dunne rand en een nummer
function stripVak(ctx, x, y, w, h, nr, a = 1, inhoud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#2A3A58', 0.75), C.line, 2); ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); if (inhoud) inhoud(); ctx.restore();
  metaText(ctx, String(nr), x + 22, y + 40, C.grain, 'left', 26); ctx.restore(); }
// eenvoudige fiets van opzij (wielen ± 70 cm: bij een persoon van 330 px ± 130 px)
function fietsZij(ctx, x, y, s) { ctx.save(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  circ(ctx, x - 70 * s, y - 42 * s, 42 * s, null, '#AFC0D0', 5 * s); circ(ctx, x + 70 * s, y - 42 * s, 42 * s, null, '#AFC0D0', 5 * s);
  ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(x - 70 * s, y - 42 * s); ctx.lineTo(x - 20 * s, y - 100 * s); ctx.lineTo(x + 45 * s, y - 100 * s); ctx.lineTo(x + 70 * s, y - 42 * s);
  ctx.moveTo(x - 20 * s, y - 100 * s); ctx.lineTo(x, y - 42 * s); ctx.lineTo(x + 45 * s, y - 100 * s); ctx.moveTo(x - 70 * s, y - 42 * s); ctx.lineTo(x, y - 42 * s); ctx.stroke();
  ctx.strokeStyle = '#AFC0D0'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 100 * s); ctx.lineTo(x - 26 * s, y - 116 * s); ctx.moveTo(x - 40 * s, y - 118 * s); ctx.lineTo(x - 12 * s, y - 118 * s);
  ctx.moveTo(x + 45 * s, y - 100 * s); ctx.lineTo(x + 50 * s, y - 126 * s); ctx.lineTo(x + 66 * s, y - 128 * s); ctx.stroke(); ctx.restore(); }
// tafeltje (van voren)
function tafel(ctx, x, y, w, h) { ctx.save(); roundRect(ctx, x - w / 2, y - h, w, 14, 5); shape(ctx, '#5A4A3E', '#7A6A5A', 1.5); ctx.fillStyle = '#4A3C32'; ctx.fillRect(x - w / 2 + 16, y - h + 14, 12, h - 14); ctx.fillRect(x + w / 2 - 28, y - h + 14, 12, h - 14); ctx.restore(); }
// brood op een plankje
function brood(ctx, x, y, s, gesneden = 0) { ctx.save(); roundRect(ctx, x - 80 * s, y - 10 * s, 160 * s, 12 * s, 4); shape(ctx, '#8C6A4A', null);
  ctx.beginPath(); ctx.ellipse(x - 10 * s, y - 34 * s, 58 * s, 26 * s, 0, Math.PI, 0); ctx.lineTo(x + 48 * s, y - 10 * s); ctx.lineTo(x - 68 * s, y - 10 * s); ctx.closePath(); shape(ctx, '#C98A4A', '#A86A34', 1.5);
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#A86A34'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 40 * s + i * 24 * s, y - 52 * s); ctx.lineTo(x - 30 * s + i * 24 * s, y - 40 * s); ctx.stroke(); }
  if (gesneden > 0.01) { roundRect(ctx, x + 56 * s, y - 50 * s, 14 * s, 40 * s, 4); shape(ctx, '#E8D2A8', '#A86A34', 1.5); }
  ctx.restore(); }

// ---------------------------------------------------------------------------------------------
// PIEKENPATROON van één STR (elektroferogram). Allelen op de x-as; pieken als smalle bergjes.
// PIEKEN: allel, hoogte (0..1), van wie ('joost' | 'onbekend' | 'erik' | 'samen' = joost + onbekend)
const PIEKEN = [[13, 0.88, 'joost'], [14, 0.2, 'erik'], [15, 0.46, 'onbekend'], [16, 1.0, 'samen'], [18, 0.18, 'erik']];
const PK_KL = { joost: C.teal, onbekend: '#AFC0D0', erik: C.goud, samen: C.teal };
// (x, y) = linksonder van de as; o.kl = {joost, onbekend, erik} 0..1 = pieken in de kleur van hun donor; o.hlErik 0..1; o.groei 0..1
function piekenSTR(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { hlErik = 0, groei = 1, naam = 'D8S1179', getallen = 0 } = o, kl = o.kl || {};
  const al0 = 12, al1 = 19, X = v => x + (v - al0) / (al1 - al0) * w;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 20); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  metaText(ctx, 'STR ' + naam, x + 14, y - h - 30, C.grain, 'left', 24);
  for (let v = al0 + 1; v < al1; v++) text(ctx, String(v), X(v), y + 36, fTekst(28, 600), C.text2, 'center');
  metaText(ctx, 'allel (lengte)', x + w, y + 72, C.text2, 'right', 22);
  PIEKEN.forEach(([v, hgt, wie], i) => { const g = clamp(groei * 1.6 - i * 0.15, 0, 1); if (g <= 0.01) return; const px = X(v), ph = h * hgt * ease(g);
    const wk = wie === 'samen' ? 'joost' : wie; let col = _mixHex('#8FA0B5', PK_KL[wk], kl[wk] || 0); if (wie === 'erik') col = _mixHex(col, C.goud, hlErik);
    ctx.beginPath(); ctx.moveTo(px - 30, y); ctx.bezierCurveTo(px - 12, y, px - 9, y - ph, px, y - ph); ctx.bezierCurveTo(px + 9, y - ph, px + 12, y, px + 30, y); ctx.closePath();
    shape(ctx, rgba(col, 0.35), col, 3);
    const ko = kl.onbekend || 0; if (wie === 'samen' && ko > 0.01) { ctx.save(); ctx.globalAlpha *= ko; const p2 = ph * 0.45; ctx.beginPath(); ctx.moveTo(px - 18, y); ctx.bezierCurveTo(px - 8, y, px - 6, y - p2, px, y - p2); ctx.bezierCurveTo(px + 6, y - p2, px + 8, y, px + 18, y); ctx.closePath(); shape(ctx, rgba('#AFC0D0', 0.55), '#DCE5EC', 2); ctx.restore(); }
    if (wie === 'erik' && hlErik > 0.01) { ctx.save(); ctx.globalAlpha *= hlErik; circ(ctx, px, y - ph - 24, 11, C.goud); ctx.restore(); }
    if (getallen > 0.01) regel(ctx, String(Math.round(hgt * 1800)), px, y - ph - (wie === 'erik' ? 50 : 14), getallen, C.text2, 24, 'center', 600); });
  ctx.restore();
  return X;
}
// raster van alle paren uit een lijst allelen (inclusief twee keer hetzelfde): 5 allelen → 15 paren
function parenRaster(ctx, x, y, allelen, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { licht = 1, erikPaar = '14–18', cw = 150, ch = 70, per = 5 } = o;
  const P = []; for (let i = 0; i < allelen.length; i++) for (let j = i; j < allelen.length; j++) P.push(allelen[i] + '–' + allelen[j]);
  ctx.save(); ctx.globalAlpha *= a;
  P.forEach((p, i) => { const u = clamp(licht * P.length - i, 0, 1); const cx = x + (i % per) * (cw + 12), cy = y + Math.floor(i / per) * (ch + 12); const erik = p === erikPaar;
    roundRect(ctx, cx, cy, cw, ch, 10); shape(ctx, u > 0.5 ? rgba(erik ? C.goud : C.paars, 0.22) : '#2A3A58', u > 0.5 ? (erik ? C.goud : rgba(C.paars, 0.9)) : rgba(C.line, 0.5), 1.5);
    text(ctx, p, cx + cw / 2, cy + 46, fTekst(32, 700), u > 0.5 ? C.text : C.text2, 'center');
    });
  ctx.restore(); return P.length;
}
// opleidingskaartje
function opleiding(ctx, x, y, w, niveau, naam, waar, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 150, 14); shape(ctx, rgba(col, 0.12), col, 2);
  metaText(ctx, niveau, x + 26, y + 42, col, 'left', 24);
  text(ctx, naam, x + 26, y + 90, fTekst(naam.length > 30 ? 30 : 36, 700), C.text, 'left');
  text(ctx, waar, x + 26, y + 130, fTekst(26, 600), C.text2, 'left'); ctx.restore(); }

// handdruk: sinds 25 okt 2026 de echte pose 'handdruk' + handdruk() in lib_cast.js
// het spoor boven op de balans: een klein mes
function spoorBalans(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; balans(ctx, x, y, s, o);
  ctx.save(); ctx.globalAlpha *= a * (o.aSpoor == null ? 1 : o.aSpoor); mes(ctx, x - 22 * s, y - 150 * s, 170 * s, { rot: 0 }); if (o.spoorNaam) naamBij(ctx, o.spoorNaam, o.spoorSub || '', x, y - 200 * s, 1, 'center'); ctx.restore(); }
// klein telefoontje in de hand
function telefoon(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.15); roundRect(ctx, -16 * s, -30 * s, 32 * s, 60 * s, 6 * s); shape(ctx, '#2A3446', '#8FA0B5', 2); roundRect(ctx, -12 * s, -25 * s, 24 * s, 46 * s, 3 * s); shape(ctx, rgba('#ECE6D8', 0.85), null); ctx.restore(); }
// Wat word jij? · Forensisch onderzoek 2 · Hoe zeker is een match? — scènes per alinea (v1.0, 25 okt 2026)
// Look: Schema met cast (Dr. Kim outfit lab, Bilal practicum, Erik verdachte, Joost de bewoner alleen in de strip).
// Rode draad: de balans weegt het SPOOR (het mes ligt bovenop), nooit de verdachte. Elke scène staat er op t = 0.

const BAL_L = { naam: 'hypothese 1', sub: 'het DNA is van Erik' }, BAL_R = { naam: 'hypothese 2', sub: 'een onbekende man' };

Object.assign(SCENES, {
  title(ctx, t) {
    spoorBalans(ctx, 1460, 420, 0.75, { tilt: 0.12 * Math.sin(t * 0.8) });
    vraagteken(ctx, 1460, 210, 1, 90);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'bilal', 290, 800, 420, { t, uit: q.on('kop', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: 'vasthouden', kijk: 1,
      hold: (c, hx, hy) => telefoon(c, hx + 8, hy - 18, 1.1) });
    naamBij(ctx, 'Bilal', 'leest het nieuws', 290, 300, 1, 'center');
    krantKnipsel(ctx, 560, 190, 660, 440, { sub: q.on('inbraak', 1), kopHl: q.on('kop', 1, 1) });
    bewijszak(ctx, 1560, 300, 440, 220, { a: q.on('mes', 1), druppels: true });
    naamBij(ctx, 'het mes', 'bewijsstuk', 1560, 460, q.on('mes', 1), 'center');
    dossier(ctx, 1560, 640, 'erik', 'Erik', 'verdachte', { a: q.on('Erik', 1, 0.4) });
    chip(ctx, 'DNA past bij Erik', 1560, 790, C.paars, q.on('past', 1), 28);
    vraagteken(ctx, 890, 760, q.on('denk', 1), 100); },

  // ---------- H1 twee hypothesen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: eerst wegen hoe sterk het spoor is'); labtafel(ctx);
    scherm(ctx, 520, 220, 880, 440, () => {
      strProfiel(ctx, 540, 244, { grijs: q.on('compleet', 1), amelo: q.on('man,', 1), cw: 130, gap: 10 });
      regel(ctx, 'grootste donor: past bij Erik', 960, 632, q.on('Erik', 1), C.goud, 32, 'center', 700);
      if (q.on('uitslag', 1) > 0.01) metaA(ctx, 'deelprofiel · drie STR’s zonder uitslag', 1380, 598, q.on('uitslag', 1), C.text2, 'right', 20); });
    const K = q.on('Kim', 1, 0.3), B = q.on('stage', 1, 0.3);
    persoon(ctx, 'kim', 280, 800, 420, { t, a: K, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'DNA-deskundige', 280, 330, K, 'center');
    persoon(ctx, 'bilal', 1660, 800, 400, { t, a: B, uit: 'neutraal', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', 'stagiair', 1660, 300, B, 'center');
    metaA(ctx, 'aflezen: zie Op lengte gesorteerd', 960, 860, q.on('gesorteerd', 1), C.grain, 'center', 22); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', '', 230, 330, 1, 'center');
    spoorBalans(ctx, 1060, 330, 1, { spoorNaam: 'het spoor', spoorSub: 'DNA op het heft',
      L: Object.assign({ aN: q.on('Erik.', 1) }, BAL_L), R: Object.assign({ aN: q.on('onbekende', 1) }, BAL_R) });
    chip(ctx, 'geen familie van Erik', 1360, 680, C.text2, q.on('familie', 1), 26);
    chip(ctx, 'een broer: apart gerekend', 1680, 300, C.koraal, q.on('broer', 1), 26);
    chip(ctx, 'bij allebei: hoe waarschijnlijk is dit spoor?', 1060, 790, C.goud, q.on('allebei', 1), 30); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    const O = q.on('officier', 1, 0.7), s = 1 - 0.18 * O, bx = 1060 - 420 * O;
    spoorBalans(ctx, bx, 330 + 20 * O, s, { spoorNaam: 'het spoor', spoorSub: '',
      L: Object.assign({ kans: 'bijna 1', aK: q.on('zeker', 1) }, BAL_L),
      R: Object.assign({ kans: '1 op 100.000', aK: q.on('honderdduizend', 1), kansKl: C.goud }, BAL_R) });
    metaA(ctx, 'matchkans', bx + 300 * s, 760, q.on('matchkans', 1), C.goud, 'center', 24);
    if (O > 0.01) { const T = clamp((t - q.at('schrijft', 1)) / 3.2, 0, 1);
      notitie(ctx, 1180, 230, 620, 'officier van justitie · notitie', ['De kans dat Erik', 'onschuldig is:', '1 op 100.000.'], { a: O, typ: T, px: 36 }); }
    vraagteken(ctx, 1490, 690, q.on('denk', 1), 100); },

  // ---------- H2 bewijskracht ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: het zegt hoe vaak een onbekende past');
    const M = q.on('Nederland', 1);
    kaartNL(ctx, 470, 500, 1.25, { a: 0.35 + 0.65 * M });
    naamBij(ctx, '± 9 miljoen', 'mannen in Nederland', 470, 520, q.on('miljoen', 1), 'center');
    const P = q.on('negentig', 1, 0.8), Ek = q.on('Erik', 2);
    for (let i = 0; i < 90; i++) { const c = i % 15, r = Math.floor(i / 15), erik = i === 37;
      const f = clamp(P * 1.8 - (c + r) / 20, 0, 1); if (f < 0.01) continue;
      telpop(ctx, 1060 + c * 50 + (r % 2) * 10, 410 + r * 66, 54, erik && Ek > 0.5 ? C.goud : rgba('#AFC0D0', 0.85), f); }
    if (Ek > 0.01) naamBij(ctx, 'Erik', 'één van de ± 90', 1060 + 7 * 50 + 10, 790, Ek, 'center', C.goud);
    regel(ctx, '9.000.000 × 1/100.000 = 90', 1420, 300, q.on('verwachting', 1), C.text, 40, 'center', 700);
    metaA(ctx, 'mannen die naar verwachting passen', 1420, 350, q.on('deelprofiel', 1), C.grain, 'center', 22);
    chip(ctx, 'denkfout van de aanklager: de matchkans omdraaien', 1420, 230, C.koraal, q.on('denkfout', 1), 28); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    const T = q.on('zwaar', 1, 1.4);
    spoorBalans(ctx, 560, 330, 0.85, { tilt: 0.9 * T, spoorNaam: 'het spoor', spoorSub: '',
      L: Object.assign({ kans: 'bijna 1' }, BAL_L), R: Object.assign({ kans: '1 op 100.000' }, BAL_R) });
    const D = q.on('deelt', 1);
    breuk(ctx, 1370, 380, 'bijna 1', '1 op 100.000', { a: D, w: 420, subB: 'kans als hypothese 1 klopt', subO: 'kans als hypothese 2 klopt' });
    regel(ctx, '= 100.000', 1370, 600, q.on('honderdduizend', 2), C.goud, 60, 'center', 800);
    naamBij(ctx, 'likelihood ratio', 'de bewijskracht', 1370, 680, q.on('likelihood', 1), 'center');
    regel(ctx, 'het spoor: 100.000 keer waarschijnlijker als het DNA van Erik is', 960, 810, q.on('keer', 1), C.text, 34, 'center', 700); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const V = q.on('valt', 1);
    roundRect(ctx, 260, 160, 1400, 190, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport · DNA-deskundige', 300, 206, INKT2, 'left', 22);
    text(ctx, 'Het spoor is', 300, 266, fTekst(36, 600), INKT, 'left');
    ctx.save(); ctx.globalAlpha *= 1 - V; ctx.fillStyle = rgba(INKT2, 0.5); ctx.fillRect(510, 270, 300, 3); ctx.restore();
    regel(ctx, 'zeer veel', 520, 266, V, '#9A6A10', 36, 'left', 800);
    text(ctx, 'waarschijnlijker als het DNA van Erik is', 830, 266, fTekst(36, 600), INKT, 'left');
    text(ctx, 'dan als het van een onbekende man is.', 300, 320, fTekst(36, 600), INKT, 'left');
    const S = q.on('schaal', 1, 0.5);
    nfiSchaal(ctx, 120, 500, 1680, { a: S, hl: [0, q.on('iets', 1), q.on('honderd', 1), 0, q.on('tienduizend', 1), 0], dim: 0.4, wijs: 4, wijsU: 0.5, aW: V, waarde: '100.000' });
    metaA(ctx, 'NFI · Nederlands Forensisch Instituut', 960, 460, q.on('NFI', 1) * (1 - V), C.grain, 'center', 24);
    metaA(ctx, 'bewijskracht (likelihood ratio)', 1800, 720, S, C.text2, 'right', 22); },

  s11(ctx, t, q) { bg(ctx, 'schema'); labtafel(ctx);
    persoon(ctx, 'kim', 400, 800, 420, { t, uit: 'neutraal', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', '', 400, 330, 1, 'center');
    persoon(ctx, 'bilal', 1520, 800, 400, { t, uit: 'verbaasd', pose: 'wijs', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', '', 1520, 300, 1, 'center');
    roundRect(ctx, 700, 250, 520, 400, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport', 740, 300, INKT2, 'left', 22);
    text(ctx, 'bewijskracht:', 740, 370, fTekst(32, 600), INKT2, 'left');
    text(ctx, 'zeer veel waarschijnlijker', 740, 416, fTekst(34, 800), INKT, 'left');
    regel(ctx, 'schuldig?', 740, 520, q.on('schuldig', 1), '#B24A30', 40, 'left', 800);
    vraagteken(ctx, 1080, 560, q.on('denk', 1), 90); },

  // ---------- H3 hoe kwam het daar? ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: nee, dat weegt de rechter');
    persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'het lab', 230, 330, 1, 'center');
    roundRect(ctx, 420, 300, 440, 300, 10); shape(ctx, PAPIER, '#B8B0A0', 2);
    metaText(ctx, 'rapport van het lab', 450, 346, INKT2, 'left', 20);
    text(ctx, 'hoe sterk', 450, 420, fTekst(34, 800), INKT, 'left'); text(ctx, 'is dit spoor?', 450, 466, fTekst(34, 800), INKT, 'left');
    kruis(ctx, 640, 690, 34, q.on('schuld', 1)); regel(ctx, 'geen oordeel over schuld', 640, 770, q.on('schuld', 1), C.koraal, 30, 'center', 700);
    const R = q.on('rechter', 1);
    pijl(ctx, 900, 450, 1150, 450, C.line, R, 4, 16);
    rechtbankIcoon(ctx, 1400, 450, 1, { a: R });
    naamBij(ctx, 'de rechter', 'weegt alles samen', 1400, 670, R, 'center');
    const A = q.on('bewijs', 1);
    [[1660, 290, 'getuigen'], [1700, 450, 'camera'], [1660, 610, 'telefoon']].forEach(([dx, dy, nm], i) => { const f = clamp(A * 2 - i * 0.4, 0, 1);
      document_(ctx, dx, dy, 1.3, C.text2, f); metaA(ctx, nm, dx, dy + 62, f, C.grain, 'center', 20); });
    chip(ctx, 'het lab: alleen de bewijskracht', 640, 220, C.goud, q.on('alleen', 1), 28); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    const K = q.on('kant', 1, 0.7);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K;
      for (let i = 0; i < 23; i++) { const c = i % 8, r = Math.floor(i / 8); roundRect(ctx, 160 + c * 82, 260 + r * 82, 70, 70, 10); shape(ctx, rgba(C.paars, 0.2), C.paars, 1.5); }
      metaA(ctx, '23 STR’s · volledig profiel', 160, 230, 1, C.grain, 'left', 24);
      regel(ctx, 'matchkans < 1 op 1 miljard', 480, 600, q.on('miljard', 1), C.goud, 44, 'center', 800);
      kaartNL(ctx, 1380, 470, 1.15, {});
      const N = q.on('niemand', 1); regel(ctx, '9.000.000 × 1/1.000.000.000', 1380, 760, N, C.text, 34, 'center', 700);
      regel(ctx, '< 0,01 man', 1380, 820, N, C.goud, 38, 'center', 800);
      naamBij(ctx, 'niemand anders', 'past waarschijnlijk', 1380, 490, N, 'center');
      ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      metaA(ctx, 'het verhaal van Erik', 960, 160, 1, C.grain, 'center', 26);
      const F = q.on('fiets', 1, 0.5), Hd = q.on('hand.', 1, 0.5), Br = q.on('brood', 1, 0.5);
      stripVak(ctx, 120, 200, 540, 600, 1, 1, () => {
        persoon(ctx, 'erik', 250, 740, 340, { t, uit: 'neutraal', kijk: 1 }); fietsZij(ctx, 400, 740, 0.85);
        persoon(ctx, 'joost', 560, 740, 330, { t, uit: 'blij', pose: 'wijs', kijk: -1, a: F });
        naamBij(ctx, 'Erik', '', 250, 360, 1, 'center'); naamBij(ctx, 'Joost', 'de bewoner', 530, 370, F, 'center');
        metaA(ctx, 'een fiets kopen', 390, 780, F, C.grain, 'center', 22); });
      stripVak(ctx, 690, 200, 540, 600, 2, Hd, () => {
        handdruk(ctx, 'erik', 'joost', 960, 740, 340, { t, schud: clamp((t - q.at('hand.', 1)) / 1.6, 0, 1) });
        metaA(ctx, 'een hand', 960, 780, 1, C.grain, 'center', 22); });
      stripVak(ctx, 1260, 200, 540, 600, 3, Br, () => {
        // aanrecht op heuphoogte (± 0,5 × lengte), brood vlak bij de hand: Joost snijdt echt (zaagbeweging na 'brood')
        const Zg = t > q.at('brood', 1) ? Math.sin((t - q.at('brood', 1)) * 7) * 7 : 0;
        tafel(ctx, 1640, 740, 280, 170); brood(ctx, 1660, 568, 1.1, clamp((t - q.at('brood', 1)) / 1.5, 0, 1));
        persoon(ctx, 'joost', 1400, 740, 330, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, hold: (c, hx, hy) => mes(c, hx + 6 + Zg, hy, 100, { rot: -0.35 }) });
        naamBij(ctx, 'met dit mes', '', 1530, 370, q.on('dit', 1), 'center'); });
      ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema');
    const Z = q.on('zien', 1, 0.3), O = q.on('Onderzoekers', 1, 0.3);
    if (Z < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Z;
      persoon(ctx, 'kim', 230, 800, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: 1, outfit: 'lab' });
      naamBij(ctx, 'Dr. Kim', '', 230, 330, 1, 'center');
      const Bv = q.on('bronvraag', 1), Av = q.on('activiteitvraag', 1);
      roundRect(ctx, 480, 260, 620, 360, 16); shape(ctx, rgba(C.paars, 0.12), C.paars, 2);
      metaText(ctx, 'tot nu toe', 520, 310, C.grain, 'left', 22);
      regel(ctx, 'bronvraag', 520, 380, Bv, C.text, 48, 'left', 800); regel(ctx, 'van wie is het DNA?', 520, 440, Bv, C.text2, 36, 'left', 600);
      mes(ctx, 720, 540, 220, { a: Bv, stip: [{ n: 9, r: 6, col: C.paars }], seed: 2 });
      ctx.save(); ctx.globalAlpha *= Av; roundRect(ctx, 1180, 260, 620, 360, 16); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); ctx.restore();
      regel(ctx, 'activiteitvraag', 1220, 380, Av, C.text, 48, 'left', 800); regel(ctx, 'hoe kwam het daar?', 1220, 440, Av, C.text2, 36, 'left', 600);
      ctx.save(); ctx.globalAlpha *= Av; vraagteken(ctx, 1490, 560, 1, 80); ctx.restore();
      ctx.restore(); }
    if (Z > 0.01 && O < 0.99) { ctx.save(); ctx.globalAlpha *= Z * (1 - O); labtafel(ctx);
      const P = q.on('pakt', 1, 0.6) > 0.5 ? 1 : 0, M = q.at('minuten', 1);
      if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P;
        const r = handdruk(ctx, 'bilal', 'kim', 820, 800, 410, { t, schud: q.on('schudt', 1, 1.8), outfitL: 'practicum', outfitR: 'lab' });
        naamBij(ctx, 'Bilal', '', r.xL, 300, 1, 'center'); naamBij(ctx, 'Dr. Kim', '', r.xR, 320, 1, 'center');
        ctx.restore(); }
      klok(ctx, 1400, 330, 96, clamp((t - M) / 3, 0, 1), { a: q.on('minuten', 1) });
      metaA(ctx, '2 minuten handen schudden', 1400, 470, q.on('minuten', 1), C.grain, 'center', 22);
      if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P;
        persoon(ctx, 'kim', 1000, 800, 420, { t, uit: 'neutraal', kijk: -1, outfit: 'lab' });
        naamBij(ctx, 'Dr. Kim', 'raakt het mes niet aan', 1000, 330, q.on('raakt', 1), 'center');
        persoon(ctx, 'bilal', 560, 800, 410, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1, outfit: 'practicum', hold: (c, hx, hy) => mes(c, hx + 4, hy + 6, 110, { rot: 1.25 }) }); // lemmet omlaag, niet naar Dr. Kim
        naamBij(ctx, 'Bilal', 'pakt een schoon mes', 560, 310, 1, 'center');
        ctx.restore(); }
      ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O;
      metaA(ctx, 'dezelfde proef, veel paren', 960, 200, 1, C.grain, 'center', 26);
      for (let i = 0; i < 6; i++) { const x = 520 + (i % 3) * 440, y = 340 + Math.floor(i / 3) * 220; mes(ctx, x - 40, y, 320, {}); }
      chip(ctx, 'wat zit er op het heft?', 960, 780, C.goud, q.on('heft', 1), 30);
      vraagteken(ctx, 960, 470, q.on('denk', 1), 90);
      ctx.restore(); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ook DNA van de ander, soms het meeste');
    const S = q.on('zes', 1, 0.8), G = q.on('grootste', 1);
    for (let i = 0; i < 6; i++) { const x = 520 + (i % 3) * 440, y = 330 + Math.floor(i / 3) * 210; const groot = i === 4, geen = i === 2;
      mes(ctx, x - 40, y, 320, { seed: i * 5, stip: [{ n: groot ? 3 : 8, r: 6, col: C.teal }, { n: geen ? 0 : (groot ? 9 : 2 + (i % 2)), r: 6, col: C.goud, a: S }] });
      if (groot && G > 0.01) { ctx.save(); ctx.globalAlpha *= G; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 200, y - 64, 380, 128, 16); ctx.stroke(); ctx.restore();
        regel(ctx, 'de ander: grootste donor', x, y + 96, G, C.goud, 28, 'center', 700); } }
    naamBij(ctx, 'overdracht', 'DNA via een ander', 960, 210, q.on('overdracht', 1), 'center', C.goud);
    metaA(ctx, 'proef: Cale e.a. 2016', 1800, 120, q.on('Amerikaanse', 1), C.grain, 'right', 22);
    regel(ctx, '5 van de 6', 160, 380, S, C.goud, 40, 'left', 800);
    regel(ctx, '± 1 op de 5', 160, 590, G, C.goud, 40, 'left', 800);
    chip(ctx, 'wie het mes vasthield', 640, 800, C.teal, 1, 26);
    chip(ctx, 'de ander (handdruk)', 1060, 800, C.goud, S, 26);
    chip(ctx, 'andere proeven vonden minder', 1520, 800, C.text2, q.on('minder', 1), 26); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    const Tl = q.on('dus', 1, 1.2);
    balans(ctx, 560, 310, 0.8, { tilt: 0.25 * Tl, titel: 'hoe kwam het op het mes?', aT: 1,
      L: { naam: 'hield het mes vast', sub: 'bij de inbraak', aN: q.on('vast', 1), kans: 'bijna 1', aK: q.on('altijd', 1) },
      R: { naam: 'gaf alleen een hand', sub: '', aN: q.on('hand?', 1), kans: '1 op 5', aK: q.on('vijf.', 1) } });
    metaA(ctx, 'heel vereenvoudigd · één proef', 560, 140, q.on('vereenvoudigd', 1), C.koraal, 'center', 24);
    const D = q.on('gedeeld', 1);
    breuk(ctx, 1380, 300, 'bijna 1', '1/5', { a: D, w: 300, px: 52 });
    regel(ctx, '≈ 5', 1380, 470, q.on('ongeveer', 2), C.goud, 60, 'center', 800);
    const Sc = q.on('schaal', 1, 0.5);
    nfiSchaal(ctx, 120, 650, 1680, { a: Sc, bh: 140, hl: [0, Sc, 0, 0, 0, 0], dim: 0.35, wijs: 1, wijsU: 0.2, aW: 0 });
    chip(ctx, 'echte deskundigen: veel meer proeven', 1380, 590, C.text2, q.on('deskundigen', 1), 26); },

  // ---------- H4 drie mensen op één mes ----------
  s19(ctx, t, q) { bg(ctx, 'schema');
    mes(ctx, 420, 190, 480, { swab: q.on('spoor', 1) });
    naamBij(ctx, 'lemmet', 'tweede spoor', 690, 270, 1, 'center');
    const Pk = q.on('pieken', 1, 1.2), B = q.on('bewoner', 1);
    piekenSTR(ctx, 300, 720, 1100, 360, { groei: Pk, kl: { joost: B } });
    naamBij(ctx, 'Joost', 'de bewoner', 280, 420, B, 'right', C.teal);
    chip(ctx, 'per STR hooguit 2', 1640, 380, C.text2, q.on('hooguit', 1), 26);
    chip(ctx, 'minstens 3 mensen', 1640, 470, C.goud, q.on('minstens', 1), 26);
    regel(ctx, 'mengprofiel', 1640, 570, q.on('mengprofiel', 1), C.text, 40, 'center', 800);
    metaA(ctx, 'het is zijn mes', 280, 490, q.on('Logisch', 1), C.grain, 'right', 20); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    const E = q.on('Eriks', 1);
    piekenSTR(ctx, 300, 720, 1100, 360, { kl: { joost: 1, onbekend: 1 }, hlErik: E });
    naamBij(ctx, 'Joost', 'de bewoner', 280, 420, 1, 'right', C.teal);
    naamBij(ctx, 'onbekend', '', 771, 520, 1, 'center', '#DCE5EC');
    naamBij(ctx, 'Erik', '14 en 18', 1243, 560, E, 'center', C.goud);
    metaA(ctx, 'en zo bij elke STR', 1400, 260, q.on('elke', 1), C.grain, 'right', 22);
    notitie(ctx, 1450, 340, 380, 'notitie Bilal', ['Erik: niet', 'uitgesloten'], { a: q.on('noteert', 1), typ: clamp((t - q.at('noteert', 1)) / 1.6, 0, 1), px: 30 });
    vraagteken(ctx, 1640, 680, q.on('denk', 1), 90); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: bijna niets');
    const Pr = clamp((t - q.at('paren', 1)) / 2.4, 0, 1);
    metaA(ctx, 'alle paren uit 13 · 14 · 15 · 16 · 18', 120, 230, 1, C.grain, 'left', 22);
    parenRaster(ctx, 120, 260, ['13', '14', '15', '16', '18'], { licht: Pr, cw: 150, ch: 66 });
    regel(ctx, '15 paren: veel mensen passen', 120, 540, q.on('mengsel', 1), C.text, 34, 'left', 700);
    const S = q.on('software', 1, 0.6);
    scherm(ctx, 1000, 220, 800, 400, () => {
      text(ctx, 'DNAStatistX', 1030, 266, fTekst(30, 800), C.text, 'left'); metaText(ctx, 'NFI', 1770, 266, C.grain, 'right', 20);
      const H = q.on('hoogte', 1);
      [[13, 0.88, C.teal], [14, 0.2, C.goud], [15, 0.46, '#AFC0D0'], [16, 1, C.teal], [18, 0.18, C.goud]].forEach(([al, h, col], i) => {
        const bx = 1040 + i * 96, bh = 200 * h; roundRect(ctx, bx, 520 - bh, 60, bh, 6); shape(ctx, rgba(col, 0.6), col, 2);
        text(ctx, String(al), bx + 30, 556, fTekst(24, 600), C.text2, 'center'); regel(ctx, String(Math.round(h * 1800)), bx + 30, 510 - bh, H, C.text, 22, 'center', 600); });
      regel(ctx, 'donoren: 3', 1780, 360, q.on('bijdroegen', 1), C.text, 32, 'right', 700);
      regel(ctx, 'LR: 2 – 10', 1780, 420, q.on('likelihood', 1), C.goud, 32, 'right', 800);
      regel(ctx, 'Erik: kleine bijdrage', 1780, 480, q.on('kleine', 1), C.goud, 26, 'right', 700); }, { a: S });
    const U = q.on('uitkomst', 1);
    balans(ctx, 440, 640, 0.5, { titelPx: 22, a: q.on('likelihood', 1), tilt: 0.25 * U, titel: 'tweede spoor',
      L: { naam: 'met Erik' }, R: { naam: 'zonder Erik' } });
    regel(ctx, 'iets waarschijnlijker', 1400, 720, U, C.goud, 40, 'center', 800);
    metaA(ctx, 'voorbeelduitkomst', 1400, 766, U, C.grain, 'center', 20); },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema');
    krantKnipsel(ctx, 120, 170, 560, 374, { streep: clamp((t - q.at('niet.', 1)) / 1.2, 0, 1) });
    persoon(ctx, 'bilal', 800, 800, 380, { t, uit: 'neutraal', pose: 'wijs', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', '', 800, 340, 1, 'center');
    regel(ctx, 'heft · bron: zeer veel waarschijnlijker', 120, 620, q.on('zeer', 1), C.groen, 30, 'left', 700);
    regel(ctx, 'als het DNA van Erik is', 120, 660, q.on('zeer', 1), C.groen, 30, 'left', 700);
    regel(ctx, 'hoe op het mes: weinig bewijs', 120, 730, q.on('weinig', 1), C.koraal, 30, 'left', 700);
    const Bb = q.on('heft', 1), Ba = q.on('kwam', 1), B2 = q.on('weinig', 1);
    balans(ctx, 1110, 330, 0.32, { a: Bb, tilt: 0.95, titel: 'heft · bron', titelPx: 22 });
    balans(ctx, 1440, 330, 0.32, { a: Ba, tilt: 0.25, titel: 'heft · activiteit', titelPx: 22 });
    balans(ctx, 1770, 330, 0.32, { a: B2, tilt: 0.25, titel: 'tweede spoor', titelPx: 22 });
    const R = q.on('rechter', 1);
    rechtbankIcoon(ctx, 1440, 650, 0.55, { a: R });
    naamBij(ctx, 'de rechter', 'weegt alles samen', 1440, 780, R, 'center'); },

  s24(ctx, t, q) { bg(ctx, 'schema'); labtafel(ctx);
    persoon(ctx, 'bilal', 300, 800, 420, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'practicum' });
    naamBij(ctx, 'Bilal', 'stagiair', 300, 300, 1, 'center');
    opleiding(ctx, 620, 150, 1180, 'hbo-bachelor · 4 jaar · met selectie', 'Forensisch Onderzoek', 'Saxion Enschede · Hogeschool van Amsterdam', q.on('Onderzoek', 1));
    opleiding(ctx, 620, 320, 1180, 'wo · eerst een bachelor, dan een master', 'biologie → Forensic Science', 'bachelor Radboud Nijmegen · master UvA Amsterdam, 2 jaar', q.on('Nijmegen', 1), C.paars);
    opleiding(ctx, 620, 490, 1180, 'hbo-bachelor · 4 jaar', 'Forensisch Laboratoriumonderzoek', 'Van Hall Larenstein, Leeuwarden', q.on('Leeuwarden', 1), C.teal);
    const W2 = q.on('werkt', 1);
    ['NFI', 'politie', 'particulier lab'].forEach((s2, i) => chip(ctx, s2, 820 + i * 380, 740, [C.goud, C.teal, C.oker][i], clamp(W2 * 1.4 - i * 0.3, 0, 1), 30)); }
});
