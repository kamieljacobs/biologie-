
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
// Wat word jij? · Fysiotherapie 1 · Wat is er met die knie? — eigen tekeningen (21 okt 2026)

const KN = { bot: '#E6DCC6', botR: '#B8AC94', kraak: '#9CC4DC', band: '#E2C27A', bandR: '#B8963E', bloed: '#B23A3A', huid: '#F1D2B8', huidF: '#D8A47F', gras: '#3F6B45', grasD: '#345A3A' };
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }

// maat van een castpersoon (zoals in Hoe weefsel herstelt): knie en benen
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
// dikke knie op een persoon (zijde s = -1 links in beeld, 1 rechts)
function dikkeKnie(ctx, id, x, y, h, s, u, a = 1) { if (a <= 0.01 || u <= 0.01) return; const M = lijfMaat(id, x, y, h), kx = M.been(s), ky = M.kn + M.hh * 0.3; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * (0.2 + 0.16 * u), M.hh * (0.22 + 0.14 * u), 0, 0, 6.283); ctx.fillStyle = rgba('#E8A090', 0.55 * u); ctx.fill(); ctx.strokeStyle = rgba(C.koraal, 0.9 * u); ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); return { x: kx, y: ky }; }
function kniePunt(id, x, y, h, s) { const M = lijfMaat(id, x, y, h); return { x: M.been(s), y: M.kn + M.hh * 0.3, hh: M.hh }; }

// ===== knie van voren, opengewerkt. (x,y) = midden van het gewricht =====
// o: acl 0..1 scheur, bloed 0..1, hl {acl, pcl, menis, zij, bot, kraak}, knieschijf 0..1, dim 0..1 (rest vaag)
function knieVoor(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { acl = 0, bloed = 0, hl = {}, knieschijf = 0, dim = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const glow = (k, col) => { if ((hl[k] || 0) > 0.01) { ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 26 * hl[k]; ctx.stroke(); ctx.restore(); } };
  if (bloed > 0.01) { ctx.beginPath(); ctx.ellipse(0, 0, 230, 170, 0, 0, 6.283); ctx.fillStyle = rgba(KN.bloed, 0.35 * bloed); ctx.fill(); for (let i = 0; i < 14; i++) { const w2 = wander(i, t, 60, 0.4); circ(ctx, w2.x * 2.4, w2.y * 1.6, 7, rgba(KN.bloed, 0.8 * bloed)); } }
  const fade = 1 - dim * 0.6; ctx.globalAlpha *= fade;
  // dijbeen
  ctx.beginPath(); ctx.moveTo(-55, -440); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -440); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  // kraakbeen op de knobbels
  ctx.strokeStyle = KN.kraak; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-150, -40); ctx.bezierCurveTo(-148, 6, -50, 8, -28, -32); ctx.moveTo(28, -32); ctx.bezierCurveTo(50, 8, 148, 6, 150, -40); ctx.stroke(); glow('kraak', KN.kraak);
  // scheenbeen en kuitbeen
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 440); ctx.lineTo(-46, 440); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  ctx.strokeStyle = KN.kraak; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-160, 44); ctx.quadraticCurveTo(0, 28, 160, 44); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); shape(ctx, KN.bot, KN.botR, 2.5); roundRect(ctx, 146, 150, 26, 290, 10); shape(ctx, KN.bot, KN.botR, 2.5);
  // meniscus links en rechts (wigjes)
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 168, 44); ctx.lineTo(k * 162, 8); ctx.quadraticCurveTo(k * 100, 22, k * 44, 34); ctx.lineTo(k * 44, 38); ctx.quadraticCurveTo(k * 110, 40, k * 168, 44); ctx.closePath(); shape(ctx, '#B8D8EA', '#7AA6C2', 2); glow('menis', '#B8D8EA'); }
  // zijbanden
  ctx.strokeStyle = KN.band; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-160, -110); ctx.lineTo(-158, 160); ctx.moveTo(162, -110); ctx.lineTo(164, 118); ctx.stroke(); glow('zij', KN.band);
  // achterste kruisband (onder), voorste kruisband (boven, kan scheuren)
  ctx.lineWidth = 18; ctx.strokeStyle = '#C9A860'; ctx.beginPath(); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.stroke(); glow('pcl', '#C9A860');
  ctx.strokeStyle = (hl.acl || 0) > 0.5 ? C.goud : KN.band; const A0 = [-24, 40], A1 = [46, -62];
  if (acl < 0.01) { ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...A1); ctx.stroke(); glow('acl', C.goud); }
  else { const g = 0.5 - acl * 0.18, g2 = 0.5 + acl * 0.18, P = u => [A0[0] + (A1[0] - A0[0]) * u, A0[1] + (A1[1] - A0[1]) * u]; ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...P(g)); ctx.moveTo(...P(g2)); ctx.lineTo(...A1); ctx.stroke();
    ctx.lineWidth = 3; for (const u of [g, g2]) { const p = P(u); for (let j = -2; j <= 2; j++) { ctx.beginPath(); ctx.moveTo(p[0] + j * 4, p[1]); ctx.lineTo(p[0] + j * 6 + (u < 0.5 ? 8 : -8), p[1] + (u < 0.5 ? -10 : 10)); ctx.stroke(); } } }
  // knieschijf (ligt ervoor, doorzichtig)
  if (knieschijf > 0.01) { ctx.save(); ctx.globalAlpha *= knieschijf; ctx.beginPath(); ctx.ellipse(0, -120, 70, 86, 0, 0, 6.283); ctx.fillStyle = rgba(KN.bot, 0.35); ctx.fill(); ctx.setLineDash([10, 8]); ctx.strokeStyle = KN.botR; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ===== been van opzij (ligt op de tafel): bovenbeen naar links, onderbeen iets gebogen naar rechts; schuif = scheenbeen naar voren (omhoog in beeld)
function knieZij(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { schuif = 0, scheur = 0, handen = 1, huid = KN.huid, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const an = 0.42, dy = -schuif * 42; // onderbeen-hoek
  // tafel
  roundRect(ctx, -560, 120, 1120, 40, 10); shape(ctx, '#4A6A8A', '#6A8AAA', 2);
  // huid (doorzichtig)
  ctx.save(); ctx.globalAlpha *= 0.45; ctx.beginPath(); ctx.moveTo(-560, -95); ctx.quadraticCurveTo(-200, -120, -10, -80); ctx.quadraticCurveTo(40, -70, 60, -50 + dy); ctx.lineTo(60 + Math.cos(an) * 520, -40 + Math.sin(an) * 520 + dy * 0.2); ctx.lineTo(40 + Math.cos(an) * 520, 40 + Math.sin(an) * 520); ctx.lineTo(0, 90); ctx.quadraticCurveTo(-260, 115, -560, 110); ctx.closePath(); ctx.fillStyle = huid; ctx.fill(); ctx.restore();
  // dijbeen
  ctx.beginPath(); ctx.moveTo(-560, -28); ctx.lineTo(-90, -24); ctx.quadraticCurveTo(-30, -60, 10, -30); ctx.quadraticCurveTo(40, 0, 10, 34); ctx.quadraticCurveTo(-40, 46, -90, 26); ctx.lineTo(-560, 28); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5);
  // scheenbeen (verschuift)
  ctx.save(); ctx.translate(0, dy); ctx.translate(20, 50); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-10, -58); ctx.quadraticCurveTo(30, -66, 60, -40); ctx.lineTo(420, -22); ctx.lineTo(420, 22); ctx.lineTo(60, 30); ctx.quadraticCurveTo(10, 40, -10, 10); ctx.closePath(); shape(ctx, KN.bot, KN.botR, 2.5); ctx.restore();
  // voorste kruisband: van voorkant scheenbeen naar achterkant dijbeen
  const p0 = [40, -10 + dy], p1 = [-14, 22]; ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  else { const m = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]; ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(m[0] + 8, m[1] - 8 * scheur); ctx.moveTo(m[0] - 8, m[1] + 8 * scheur); ctx.lineTo(...p1); ctx.stroke(); }
  // handen van Femke: één op het bovenbeen, één trekt het scheenbeen omhoog (naar voren)
  if (handen > 0.01) { ctx.save(); ctx.globalAlpha *= handen; const hand = (hx, hy, r) => { ctx.save(); ctx.translate(hx, hy); ctx.rotate(r); roundRect(ctx, -60, -26, 120, 52, 24); shape(ctx, KN.huidF, '#A87A5A', 2); ctx.restore(); };
    hand(-200, -112, 0.02); hand(170, 160 + dy, 0.42); pijl(ctx, 260, 120 + dy, 260, 40 + dy, C.goud, 0.4 + 0.6 * schuif, 6, 20); ctx.restore(); }
  ctx.restore(); }

// ===== been dat buigt met hoekmeter (thigh horizontaal), graden = buiging
function buigBeen(ctx, x, y, s, graden, a = 1, o = {}) { if (a <= 0.01) return; const { huid = KN.huid, dik = 0, col = C.goud } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const f = graden * Math.PI / 180, L = 300, ex = Math.cos(f) * L, ey = Math.sin(f) * L;
  ctx.lineCap = 'round'; ctx.strokeStyle = huid; ctx.lineWidth = 78; ctx.beginPath(); ctx.moveTo(-320, 0); ctx.lineTo(0, 0); ctx.lineTo(ex, ey); ctx.stroke();
  if (dik > 0.01) { ctx.beginPath(); ctx.arc(0, 0, 48 + 20 * dik, 0, 6.283); ctx.fillStyle = rgba('#E8A090', 0.8 * dik); ctx.fill(); }
  // hoekmeter: twee armen + boog
  ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-220, -60); ctx.lineTo(0, -60); ctx.stroke(); ctx.save(); ctx.rotate(f); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(220, -60); ctx.stroke(); ctx.restore();
  circ(ctx, 0, -60, 16, '#D8DEE4', '#8A93A6', 3); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 120, 0, f); ctx.stroke();
  text(ctx, Math.round(graden) + '°', Math.cos(f / 2) * 190, Math.sin(f / 2) * 190 + 14, fTekst(48, 700), col, 'center'); ctx.restore(); }

// ===== voetbalveld (achtergrond onderin) met doel
function veld(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = KN.gras; ctx.fillRect(0, 640, W, 240); ctx.fillStyle = KN.grasD; for (let i = 0; i < 8; i++) ctx.fillRect(i * 240, 640, 120, 240);
  ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 700); ctx.lineTo(W, 700); ctx.stroke(); ctx.beginPath(); ctx.ellipse(1500, 780, 220, 50, 0, 0, 6.283); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(120, 700); ctx.lineTo(120, 470); ctx.lineTo(420, 470); ctx.lineTo(420, 700); ctx.stroke(); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(120 + i * 37, 470); ctx.lineTo(120 + i * 37, 700); ctx.stroke(); } ctx.restore(); }
function bal(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#2A3446', 3); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#2A3446'; ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = i * 1.2566 - 1.57; ctx.lineTo(Math.cos(an) * r * 0.38, Math.sin(an) * r * 0.38); } ctx.fill(); ctx.restore(); }

// ===== praktijkruimte: behandeltafel en skeletposter
function praktijk(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22304C'; ctx.fillRect(0, 760, W, 120);
  roundRect(ctx, 1180, 600, 560, 60, 14); shape(ctx, '#3E6A8E', '#5E8AAE', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(1220, 660, 24, 120); ctx.fillRect(1676, 660, 24, 120); ctx.restore(); }
function notitie(ctx, x, y, w, regels, a = 1) { if (a <= 0.01) return; const h = 80 + regels.length * 64; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(-0.03); ctx.translate(-x - w / 2, -y - h / 2);
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#F2EEDF', '#B8B09A', 2); ctx.fillStyle = '#C9B896'; ctx.fillRect(x, y, w, 26);
  regels.forEach(([s2, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, s2, x + 30, y + 86 + i * 64, fTekst(34, 600), '#2A3446', 'left'); ctx.restore(); } }); ctx.restore(); ctx.restore(); }

// ===== röntgenfoto: botten wit, banden onzichtbaar
function rontgen(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spook = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 220 * s, y - 330 * s, 440 * s, 660 * s, 14); shape(ctx, '#0B1018', '#5A6478', 3);
  ctx.save(); roundRect(ctx, x - 220 * s, y - 330 * s, 440 * s, 660 * s, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s * 0.62, s * 0.62);
  ctx.filter = 'blur(2px)'; ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.beginPath(); ctx.moveTo(-55, -440); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -440); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 440); ctx.lineTo(-46, 440); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); ctx.fill(); ctx.fillRect(146, 150, 26, 290); ctx.filter = 'none';
  if (spook > 0.01) { ctx.globalAlpha *= spook; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-24, 40); ctx.lineTo(46, -62); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.moveTo(-160, -110); ctx.lineTo(-158, 160); ctx.moveTo(162, -110); ctx.lineTo(164, 118); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// rij van een checklist: vierkantje + tekst; st = 'ja' | 'nee' | null
function checkRij(ctx, s2, x, y, a = 1, st = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 40, 40, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 2); text(ctx, s2, x + 64, y, fTekst(px, 600), C.text, 'left'); ctx.restore();
  if (st === 'nee') kruis(ctx, x + 20, y - 14, 13, a); if (st === 'ja') vink_(ctx, x + 20, y - 14, 14, a); }
// kalender met n blokjes (weken/maanden), k gevuld
function kalender(ctx, x, y, n, k, lab, a = 1, per = 6, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, per * 70 + 30, Math.ceil(n / per) * 70 + 80, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = C.koraal; ctx.fillRect(x, y, per * 70 + 30, 44);
  text(ctx, lab, x + (per * 70 + 30) / 2, y + 32, fTekst(28, 700), '#FFFFFF', 'center'); for (let i = 0; i < n; i++) { const bx = x + 20 + (i % per) * 70, by = y + 60 + Math.floor(i / per) * 70; roundRect(ctx, bx, by, 56, 56, 8); shape(ctx, i < k ? col : '#DDE2E8', '#9AA3B2', 1.5); } ctx.restore(); }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }
// Wat word jij? · Fysiotherapie 1 · Wat is er met die knie? — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Fysiotherapeut Femke, Lotte).
// Rode draad: één knie, van verhaal tot plan.

Object.assign(SCENES, {
  title(ctx, t) { knieVoor(ctx, 1400, 520, 0.85, 1, { hl: { acl: 0.6 + 0.4 * Math.sin(t * 1.5) }, knieschijf: 0.6, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('Twee', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; veld(ctx); const dr = q.on('draait', 1, 0.6), pl = q.on('plop', 1, 0.4);
      bal(ctx, 1160 - 260 * dr, 830 - 40 * Math.sin(dr * 3.14), 34, 1, dr * 6);
      persoon(ctx, 'lotte', 960, 870, 470, { t, outfit: 'sport', kijk: dr > 0.5 ? -1 : 1, pose: dr > 0.5 ? 'schouders' : 'staan', uit: pl > 0.5 ? 'verbaasd' : 'blij' });
      naamBij(ctx, 'Lotte', 'voetbal', 1080, 330, q.on('Lotte', 1));
      const K = kniePunt('lotte', 960, 870, 470, 1); tag(ctx, 'voet blijft staan', 1250, 600, C.oker, q.on('voet', 1), 'left', 28);
      flits(ctx, K.x, K.y, 60, pl * (1 - q.on('uur', 1))); tag(ctx, 'plop', K.x + 70, K.y - 50, C.koraal, pl, 'left', 30);
      dikkeKnie(ctx, 'lotte', 960, 870, 470, 1, q.on('dik', 1, 1.5)); klokje(ctx, 1500, 300, 60, q.on('uur', 1, 1.2), q.on('uur', 1)); tag(ctx, 'binnen een uur dik', 1500, 410, C.koraal, q.on('uur', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; praktijk(ctx); metaA(ctx, 'TWEE DAGEN LATER', 160, 200, P, C.grain, 'left', 28);
      persoon(ctx, 'lotte', 900, 860, 450, { t, kijk: 1, uit: 'neutraal' }); dikkeKnie(ctx, 'lotte', 900, 860, 450, 1, 1);
      persoon(ctx, 'femke', 1420, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1480, 330, q.on('Femke', 1));
      document_(ctx, 360, 470, 1.1, C.text2, q.on('verwijzing', 1)); kruis(ctx, 400, 520, 50, q.on('verwijzing', 1, 0.5)); tag(ctx, 'zonder verwijzing', 400, 680, C.teal, q.on('verwijzing', 1), 'center', 28);
      vraagteken(ctx, 1180, 300, q.on('denk', 1), 100); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); praktijk(ctx);
    persoon(ctx, 'lotte', 1180, 860, 440, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'femke', 1620, 860, 470, { t, outfit: 'werk', kijk: -1, pose: q.on('alarmsignalen', 1) > 0.5 && q.on('Lotte', 2) < 0.5 ? 'denk' : 'staan', uit: 'neutraal' });
    regel(ctx, 'anamnese', 120, 230, q.on('anamnese', 1), C.goud, 52, 'left', 700); metaA(ctx, 'HET GESPREK', 124, 272, q.on('anamnese', 1));
    const AL = q.on('alarmsignalen', 1), V = q.on('verhaal', 1, 0.8);
    if (AL > 0.01) { ctx.save(); ctx.globalAlpha *= AL * (1 - V); metaA(ctx, 'ALARMSIGNALEN', 120, 360, 1, C.koraal);
      checkRij(ctx, 'koorts, rode warme knie', 120, 440, q.on('koorts', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null); tag(ctx, 'infectie?', 640, 425, C.koraal, q.on('infectie', 1), 'left', 26);
      checkRij(ctx, 'knie staat scheef', 120, 520, q.on('scheef', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null);
      checkRij(ctx, 'helemaal niet kunnen staan', 120, 600, q.on('helemaal', 1), q.on('Lotte', 2) > 0.5 ? 'nee' : null);
      tag(ctx, '→ naar de arts', 330, 690, C.koraal, q.on('arts', 1) * (1 - q.on('Lotte', 2)), 'center', 28); ctx.restore(); }
    notitie(ctx, 140, 360, 560, [['draaien, voet op de grond', q.on('draaien', 1)], ['plop', q.on('plop', 1)], ['binnen een uur dik', q.on('snel', 1)]], V);
    dikkeKnie(ctx, 'lotte', 1180, 860, 440, 1, 1); vraagteken(ctx, 900, 330, q.on('opzwelt', 1), 100); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c');
    const tl = q.on('ontsteking', 1); paneel(ctx, 120, 230, 700, 300, '', tl); metaA(ctx, 'HOE SNEL WORDT HET DIK?', 150, 280, tl);
    balk(ctx, 160, 330, 560, 0.08, C.koraal, 'bloed: binnen een uur', q.on('snel', 1)); balk(ctx, 160, 430, 560, 0.7, C.teal, 'ontsteking: uren tot een dag', tl);
    knieVoor(ctx, 1320, 470, 0.72, q.on('gescheurd', 1), { acl: q.on('kruisband', 1, 1.2), bloed: q.on('bloedvaatjes', 1, 1.2), hl: { acl: q.on('kruisband', 1) }, t });
    naamBij(ctx, 'voorste kruisband', 'gescheurd', 1420, 300, q.on('kruisband', 1));
    persoon(ctx, 'lotte', 1000, 870, 300, { t, outfit: 'sport', kijk: 1, uit: 'neutraal', a: q.on('meisjes', 1, 0.3) }); tag(ctx, 'meisjes die voetballen: vaker', 1000, 540, C.goud, q.on('meisjes', 1), 'center', 28); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const kb = q.on('kruisbanden', 1), vk = q.on('voorste', 1), me = q.on('halve', 1), bv = q.on('buitenrand', 1);
    knieVoor(ctx, 960, 470, 0.78, 1, { hl: { acl: vk * (1 - me), pcl: kb * (1 - vk), menis: me * (1 - bv * 0.3), zij: q.on('banden', 1) * (1 - kb) }, dim: 0, t });
    verwijs(ctx, 'Skelet en spieren', 360, 200, q.on('Skelet', 1) * (1 - kb));
    naamBij(ctx, 'zijband', '', 1110, 330, q.on('banden', 1) * (1 - kb * 0.6), 'left');
    naamBij(ctx, 'kruisbanden', 'twee, schuin over elkaar', 1110, 470, kb, 'left'); naamBij(ctx, 'dijbeen', '', 1020, 170, q.on('dijbeen', 1), 'left'); naamBij(ctx, 'scheenbeen', '', 1020, 760, q.on('scheenbeen', 1), 'left');
    if (vk > 0.01) { pijl(ctx, 620, 640, 620, 560, C.goud, vk * (1 - me), 6, 20); tag(ctx, 'houdt het scheenbeen tegen', 520, 690, C.goud, vk * (1 - me), 'center', 26); }
    naamBij(ctx, 'meniscus', 'schokdemper van kraakbeen', 520, 470, me, 'center');
    if (bv > 0.01) { ctx.save(); ctx.globalAlpha *= bv; ctx.strokeStyle = WKF.bloed; ctx.lineWidth = 4; for (const k of [-1, 1]) for (let i = 0; i < 4; i++) { const bx = 960 + k * (122 + i * 6) * 0.78; ctx.beginPath(); ctx.moveTo(bx, 470 + 10); ctx.lineTo(bx + k * 10, 470 + 26); ctx.stroke(); } ctx.restore();
      tag(ctx, 'alleen de buitenrand heeft bloedvaten', 960, 860, C.koraal, bv, 'center', 28); }
    verwijs(ctx, 'Hoe weefsel herstelt', 1560, 200, q.on('weefsel', 1)); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('test', 1, 0.8), M = q.on('hoekmeter', 1);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; const g1 = 140 * clamp((t - q.at('gezonde', 1)) / 1.2, 0, 1), g2 = 100 * clamp((t - q.at('dikke', 1)) / 1.2, 0, 1);
      buigBeen(ctx, 620, 440, 0.8, g1, M, { col: C.groen }); naamBij(ctx, 'gezonde knie', '', 420, 260, q.on('gezonde', 1), 'center');
      buigBeen(ctx, 1440, 440, 0.8, g2, q.on('dikke', 1), { dik: 1, col: C.koraal }); naamBij(ctx, 'dikke knie', '', 1240, 260, q.on('dikke', 1), 'center');
      metaA(ctx, 'HOEKMETER', 160, 160, M); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; const sch = clamp((t - q.at('trekt', 1)) / 1.2, 0, 1), zacht = q.on('Lotte', 1); const sx = zacht > 0.5 ? sch * 1 : sch * 0.25;
      knieZij(ctx, 960, 460, 1, 1, { schuif: (q.on('andere', 1) > 0.5 ? 0.25 * (0.5 + 0.5 * Math.sin(t * 3)) : sx), scheur: zacht > 0.5 && q.on('andere', 1) < 0.5 ? 1 : 0, t });
      naamBij(ctx, 'dijbeen', '', 560, 330, q.on('dijbeen', 1), 'center'); naamBij(ctx, 'scheenbeen', '', 1340, 760, q.on('scheenbeen', 1), 'center');
      tag(ctx, 'harde stop', 1500, 300, C.groen, q.on('harde', 1) * (1 - zacht), 'center', 30); tag(ctx, 'schuift door · zachte stop', 1500, 300, C.koraal, zacht * (1 - q.on('andere', 1)), 'center', 30);
      tag(ctx, 'andere knie', 1500, 300, C.teal, q.on('andere', 1), 'center', 30); metaA(ctx, 'TEST VAN DE KRUISBAND', 160, 200, 1); vraagteken(ctx, 1500, 200, q.on('Waarom', 1), 90); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('perfect', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; knieZij(ctx, 560, 470, 0.62, q.on('soepele', 1), { schuif: 0.55, handen: 0, t }); knieZij(ctx, 1380, 470, 0.62, q.on('soepele', 1), { schuif: 0.55, handen: 0, t });
      naamBij(ctx, 'van nature soepel', 'links', 560, 260, q.on('soepele', 1), 'center'); naamBij(ctx, 'van nature soepel', 'rechts', 1380, 260, q.on('soepele', 1), 'center');
      tag(ctx, 'geen verschil = waarschijnlijk heel', 960, 760, C.groen, q.on('verschil', 1), 'center', 30); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; metaA(ctx, 'VAN DE HONDERD SCHEUREN VINDT DE TEST ER ONGEVEER', 160, 230, q.on('vindt', 1));
      stippen(ctx, 180, 290, 100, Math.round(85 * q.on('vijfentachtig', 1, 1.5)), C.groen, q.on('vindt', 1), 20, 13, 36); regel(ctx, '85', 960, 420, q.on('vijfentachtig', 1), C.groen, 90, 'left', 800);
      const c = q.on('combineert', 1); chip(ctx, 'verhaal', 300, 760, C.teal, c); chip(ctx, 'zwelling', 560, 760, C.teal, q.on('zwelling', 1)); chip(ctx, 'meerdere testen', 860, 760, C.teal, q.on('testen', 1)); pijl(ctx, 1020, 760, 1180, 760, C.goud, q.on('conclusie', 1)); chip(ctx, 'conclusie', 1300, 760, C.goud, q.on('conclusie', 1));
      persoon(ctx, 'femke', 1680, 860, 440, { t, outfit: 'werk', kijk: -1, pose: 'denk', uit: 'neutraal' }); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('regels', 1, 0.8), B = q.on('denkt', 1, 0.8);
    rontgen(ctx, 420, 470, 0.95, q.on('foto', 1) * (1 - B), { spook: q.on('banden', 1) });
    naamBij(ctx, 'botten: zichtbaar', '', 420, 160, q.on('botten', 1) * (1 - B), 'center'); tag(ctx, 'banden: niet zichtbaar', 420, 830, C.goud, q.on('banden', 1) * (1 - B), 'center', 28);
    if (R * (1 - B) > 0.01) { ctx.save(); ctx.globalAlpha *= R * (1 - B); metaA(ctx, 'ALLEEN EEN FOTO ALS …', 820, 220, 1); const n = q.on('Lotte', 1) > 0.5 ? 'nee' : null;
      checkRij(ctx, 'ouder dan 55', 820, 310, q.on('vijfenvijftig', 1), n); checkRij(ctx, 'geen vier stappen lopen', 820, 390, q.on('stappen', 1), n);
      checkRij(ctx, 'niet tot 90° buigen', 820, 470, q.on('buigen', 1), n); checkRij(ctx, 'drukpijn op een plekje bot', 820, 550, q.on('drukt', 1), n);
      tag(ctx, 'Lotte: geen foto nodig', 1060, 640, C.groen, q.on('Lotte', 1), 'center', 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; knieVoor(ctx, 460, 470, 0.6, 1, { acl: 1, hl: { acl: 1 }, t }); persoon(ctx, 'femke', 1000, 860, 470, { t, outfit: 'werk', kijk: 1, pose: 'wijs', uit: 'neutraal' });
      persoon(ctx, 'kim', 1500, 860, 470, { t, outfit: 'werk', kijk: -1, uit: 'neutraal', a: q.on('huisarts', 1, 0.3) }); naamBij(ctx, 'huisarts', '', 1560, 330, q.on('huisarts', 1));
      vraagteken(ctx, 1240, 300, q.on('geopereerd', 1), 100); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const P = q.on('revalidatie', 1, 0.8);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; knieVoor(ctx, 380, 500, 0.55, 1, { acl: 1, t }); tag(ctx, 'groeit meestal niet netjes terug', 380, 830, C.koraal, q.on('terug', 1), 'center', 26);
      const sp = q.on('spieren', 1); if (sp > 0.01) { ctx.save(); ctx.globalAlpha *= sp; ctx.fillStyle = rgba('#B8564E', 0.75); ctx.beginPath(); ctx.ellipse(380 - 105, 500 - 150, 34, 120, 0.1, 0, 6.283); ctx.ellipse(380 + 105, 500 - 150, 34, 120, -0.1, 0, 6.283); ctx.fill(); ctx.restore(); naamBij(ctx, 'sterke spieren', 'geven stabiliteit', 560, 330, sp, 'left'); }
      metaA(ctx, 'TWEE ROUTES', 820, 260, q.on('onderzoek', 1)); tag(ctx, 'trainen', 960, 360, C.groen, q.on('operatie', 1), 'center', 34); pijl(ctx, 1060, 360, 1280, 360, C.line, q.on('zakt', 1)); tag(ctx, 'blijft instabiel of veel draaien → alsnog operatie', 1300, 440, C.oker, q.on('alsnog', 1), 'center', 26);
      tag(ctx, 'lang niet iedereen een operatie nodig', 1200, 560, C.teal, q.on('iedereen', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; praktijk(ctx); persoon(ctx, 'lotte', 1260, 860, 440, { t, outfit: 'sport', kijk: 1, pose: q.on('oefent', 1) > 0.5 ? 'handenHeup' : 'staan', uit: 'blij' }); persoon(ctx, 'femke', 1640, 860, 470, { t, outfit: 'werk', kijk: -1, pose: 'wijs', uit: 'blij' });
      kalender(ctx, 160, 260, 12, Math.round(12 * clamp((t - q.at('drie', 1)) / 4, 0, 1)), 'drie keer per week', q.on('oefent', 1), 6, C.groen);
      const u = q.on('stap', 1, 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.globalAlpha *= u; ctx.beginPath(); ctx.moveTo(180, 820); for (let i = 0; i < 6; i++) { ctx.lineTo(180 + i * 100, 820 - i * 40); ctx.lineTo(280 + i * 100, 820 - i * 40); } ctx.stroke(); metaA(ctx, 'BELASTING STAP VOOR STAP', 180, 590, 1); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body) => card(ctx, 140 + i * 420, 260, 380, 220, tit, body, q.on(w0, 1), [C.teal, C.koraal, C.goud, C.groen][i]);
    regel(ctx, 'denken als een detective', 140, 190, q.on('detective', 1), C.text, 48, 'left', 700);
    kaart(0, 'verhaal', 'luisteren', 'wat gebeurde er?'); kaart(1, 'alarmsignalen', 'alarmsignalen', 'hoort het bij mij?'); kaart(2, 'testen', 'testen', 'en vergelijken'); kaart(3, 'plan', 'beslissen', 'een plan op maat');
    const V = q.on('veld', 1, 0.8); if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; ctx.fillStyle = KN.gras; ctx.fillRect(0, 700, W, 180); ctx.restore(); persoon(ctx, 'lotte', 960, 870, 330, { t, outfit: 'sport', uit: 'lacht', pose: 'wijsOmhoog', a: V }); bal(ctx, 1080, 850, 24, V); metaA(ctx, 'NA MAANDEN', 1100, 600, V); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    tag(ctx, 'fysiotherapie: hbo · vier jaar', 480, 260, C.teal, q.on('hbo', 1), 'center', 30); tag(ctx, 'bijvoorbeeld HAN Nijmegen', 480, 330, C.text2, q.on('HAN', 1), 'center', 26);
    tag(ctx, 'stage: praktijk', 480, 470, C.goud, q.on('praktijk', 1), 'center', 28); tag(ctx, 'ziekenhuis', 480, 540, C.goud, q.on('ziekenhuis', 1), 'center', 28); tag(ctx, 'revalidatiecentrum', 480, 610, C.goud, q.on('revalidatiecentrum', 1), 'center', 28);
    tag(ctx, 'bewegingswetenschappen: universiteit', 1450, 470, C.paars, q.on('bewegingswetenschappen', 1), 'center', 30); },
});
const WKF = { bloed: '#B23A3A' };
