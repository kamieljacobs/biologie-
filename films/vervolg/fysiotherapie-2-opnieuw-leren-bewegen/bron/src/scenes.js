
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
// Wat word jij? · Fysiotherapie 2 · Opnieuw leren bewegen — eigen tekeningen (21 okt 2026)
// henkBed en lijfMaat overgenomen uit Hoe weefsel herstelt
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function henkBed(ctx, x, y, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const { kussen = 0, matras = 0, drukH = 0, drukS = 0, donker = 0, draai = 0, uit = 'neutraal', H = 420 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = 420, hipX = x - L + 150; const M = lijfMaat('henk', 0, 0, H);
  // frame
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x - L - 20, y + 60, 2 * L + 40, 18); ctx.fillRect(x - L, y + 78, 14, 100); ctx.fillRect(x + L - 14, y + 78, 14, 100);
  circ(ctx, x - L + 7, y + 186, 14, '#4A5266'); circ(ctx, x + L - 7, y + 186, 14, '#4A5266');
  roundRect(ctx, x - L - 34, y - 210, 22, 300, 8); shape(ctx, '#8A93A6', null); roundRect(ctx, x + L + 12, y - 80, 22, 170, 8); shape(ctx, '#8A93A6', null);
  const mCol = matras > 0.5 ? '#9CCBD6' : '#DDE6EE';
  roundRect(ctx, x - L, y, 2 * L, 60, 14); shape(ctx, mCol, '#B8C8D8', 2);
  // rugleuning omhoog
  ctx.save(); ctx.translate(x - L + 14, y + 40); ctx.rotate(-1.38); roundRect(ctx, 0, -46, 340, 56, 14); shape(ctx, mCol, '#B8C8D8', 2);
  if (matras > 0.01) { ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = 30; xx < 320; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, -40); ctx.lineTo(xx, 4); ctx.stroke(); } } ctx.restore();
  if (matras > 0.01) { ctx.save(); ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = x - L + 40; xx < x + L - 10; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, y + 8 + 3 * Math.sin(t * 2 + xx)); ctx.lineTo(xx, y + 54); ctx.stroke(); } ctx.restore(); }
  // hoofdkussen tegen de leuning
  // Henk tot de heup, licht achterover
  ctx.save(); ctx.beginPath(); ctx.rect(x - L - 200, y - H - 100, 2 * L + 400, H + 100 + 20); ctx.clip(); ctx.translate(hipX, y + 14); ctx.rotate(-0.12 + (draai > 0.01 ? 0.04 * Math.sin(t * 2) : 0));
  roundRect(ctx, -M.hh * 1.25, -M.heupY + M.top - M.hh * 0.25, M.hh * 1.5, (M.schouderY - M.top) + M.hh * 1.1, M.hh * 0.5); shape(ctx, '#F2F2EE', '#C8D2DC', 2);
  persoon(ctx, 'henk', 0, -M.heupY, H, { t, uit, kijk: 1 }); ctx.restore();
  // deken: van de borst over de benen naar de voeten
  const lift = kussen * 36, vx = x + L - 60, borst = y + 14 + M.heupY + (M.schouderY - M.heupY) * 0.32 - M.heupY * 0;
  const by = y + 14 + (M.schouderY + (M.heupY - M.schouderY) * 0.55) - M.heupY; // deken-rand op de borst
  ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6);
  ctx.bezierCurveTo(hipX + M.sw * 0.9, y - 40, hipX + 200, y - 72, hipX + 300, y - 70 - lift * 0.5); ctx.bezierCurveTo(hipX + 420, y - 70 - lift, vx - 80, y - 64 - lift, vx - 24, y - 50 - lift); ctx.lineTo(vx - 24, y + 30); ctx.lineTo(hipX - M.sw * 0.62, y + 30); ctx.closePath();
  shape(ctx, '#7FA6C9', '#5A86AE', 2); ctx.strokeStyle = rgba('#5A86AE', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const xx = hipX + 140 + i * 100; ctx.beginPath(); ctx.moveTo(xx, y - 60 - (i > 1 ? lift * 0.7 : 0)); ctx.quadraticCurveTo(xx + 26, y - 20, xx + 8, y + 20); ctx.stroke(); }
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6); ctx.lineTo(hipX + M.sw * 0.62, by + 26); ctx.quadraticCurveTo(hipX, by + 4, hipX - M.sw * 0.62, by + 30); ctx.closePath(); ctx.fill();
  if (kussen > 0.01) { ctx.save(); ctx.globalAlpha *= kussen; roundRect(ctx, vx - 150, y - 34, 170, 44, 20); shape(ctx, '#E8E2D4', '#C8BEA8', 2); ctx.restore(); }
  // blote voet (zijaanzicht): hiel op de matras of vrij boven het kussen, tenen omhoog
  const fy = y - lift; ctx.save(); ctx.translate(vx, fy); ctx.beginPath(); ctx.moveTo(-26, -54); ctx.lineTo(-4, -54); ctx.bezierCurveTo(20, -62, 40, -92, 52, -106); ctx.quadraticCurveTo(64, -108, 60, -92); ctx.bezierCurveTo(50, -56, 30, -8, 6, 0); ctx.bezierCurveTo(-16, 4, -30, -10, -30, -28); ctx.closePath(); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2); ctx.restore();
  const hiel = { x: vx - 12, y: fy - 4 }, stuit = { x: hipX + 10, y: y + 12 };
  const gloed = (p, f) => { if (f <= 0.01) return; const r = 64; const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, r); const col = donker > 0.5 ? '#5A1E3A' : '#E04A3A'; g.addColorStop(0, rgba(col, 0.95 * f)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); };
  gloed(hiel, drukH); gloed(stuit, drukS);
  ctx.restore(); return { hiel, stuit, hip: { x: hipX, y }, voet: { x: vx, y: fy }, hoofdY: y + 14 - M.heupY + M.top }; }

// ===== grafiek belasting tegen weken (geleidelijk opbouwen) =====

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
const BR = { hersen: '#3A3452', rand: '#8C7BBF', strip: '#E0B64A', schade: '#5A2A2E', zenuw: '#E0B64A', spier: '#B8564E', spierL: '#D27A6E', huid: '#E3B998' };

// ===== hersenen van boven (voorkant boven). o: motor 0..1, schade 0..1, arm (grootte armgebied links, 1 = normaal), nieuw 0..1 (nieuwe verbindingen), route 0..1, t
function breinBoven(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { motor = 0, schade = 0, arm = 1, nieuw = 0, route = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 112, 0, 104, 160, 0, 0, 6.283); shape(ctx, BR.hersen, BR.rand, 2.5); ctx.strokeStyle = rgba(BR.rand, 0.45); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(k * 40, -120 + i * 55); ctx.quadraticCurveTo(k * 120, -100 + i * 55 + 20, k * 190, -120 + i * 55 + 10); ctx.stroke(); } }
  // motorische strook (dwars, iets voor het midden)
  if (motor > 0.01) { ctx.save(); ctx.globalAlpha *= motor; ctx.strokeStyle = rgba(BR.strip, 0.85); ctx.lineWidth = 22; ctx.lineCap = 'round'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 22, -18); ctx.quadraticCurveTo(k * 110, -40, k * 196, -6); ctx.stroke(); } ctx.restore(); }
  // armgebied links (op de strook)
  if (motor > 0.01) { ctx.save(); ctx.globalAlpha *= motor; ctx.beginPath(); ctx.ellipse(-120, -32, 34 * arm, 18 * arm, -0.1, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.85); ctx.fill(); ctx.restore(); }
  if (schade > 0.01) { ctx.save(); ctx.globalAlpha *= schade; ctx.beginPath(); ctx.ellipse(-95, 10, 60, 48, 0.3, 0, 6.283); ctx.fillStyle = rgba('#1A0E12', 0.85); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.setLineDash([8, 6]); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 7; i++) { const an = i * 0.9 + 0.3, r1 = 70, r2 = 70 + 50 * clamp(nieuw * 1.4 - i * 0.06, 0, 1); ctx.beginPath(); ctx.moveTo(-95 + Math.cos(an) * r1, 10 + Math.sin(an) * r1 * 0.8); ctx.quadraticCurveTo(-95 + Math.cos(an + 0.4) * (r1 + r2) / 2, 10 + Math.sin(an + 0.4) * (r1 + r2) / 2 * 0.8, -95 + Math.cos(an + 0.2) * r2, 10 + Math.sin(an + 0.2) * r2 * 0.8); ctx.stroke(); circ(ctx, -95 + Math.cos(an + 0.2) * r2, 10 + Math.sin(an + 0.2) * r2 * 0.8, 6, C.groen); } ctx.restore(); }
  // baan: van de linker strook naar beneden, kruist in het midden onderaan
  if (route > 0.01) { ctx.save(); ctx.strokeStyle = BR.zenuw; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.setLineDash([2, 0]); const P = [[-120, -30], [-70, 80], [0, 170], [70, 260]]; ctx.beginPath(); ctx.moveTo(...P[0]); const n = 40; for (let i = 1; i <= n * route; i++) { const u = i / n, k = u * 3, j = Math.min(2, Math.floor(k)), f = k - j; ctx.lineTo(P[j][0] + (P[j + 1][0] - P[j][0]) * f, P[j][1] + (P[j + 1][1] - P[j][1]) * f); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// ===== arm (schema) met spier; act 0..1 = spier krijgt opdracht (gloed); lam = verlamd (grijs)
function armSchema(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { act = 0, buig = 0.2, heel = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.strokeStyle = BR.huid; ctx.lineWidth = 70; const ex = 260, ey = 0, f = -buig * 1.6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ex, ey); ctx.lineTo(ex + Math.cos(f) * 230, ey + Math.sin(f) * 230); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(130, -18, 110, 34, 0, 0, 6.283); ctx.fillStyle = act > 0.01 ? rgba(BR.spierL, 0.6 + 0.4 * act) : rgba(BR.spier, 0.7); ctx.fill();
  ctx.strokeStyle = BR.zenuw; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, 30); ctx.quadraticCurveTo(60, 40, 120, 0); ctx.stroke();
  if (heel > 0.01) vink_(ctx, 130, -110, 24, heel); ctx.restore(); }

// ===== motorische eenheid: neuron + n vezels (getekend m)
function motorEenheid(ctx, x, y, s, m, a = 1, act = 0, col = C.goud, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 26, rgba(col, 0.9), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(140, 0); ctx.stroke();
  const rows = Math.min(m, 12), cols = Math.ceil(m / rows), H2 = rows * 26;
  for (let i = 0; i < m; i++) { const r = i % rows, c = Math.floor(i / rows), fy = -H2 / 2 + r * 26 + 13, fx = 220 + c * 12; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 0); ctx.quadraticCurveTo(180, fy, fx, fy); ctx.stroke();
    const on = act > 0.01 ? 0.5 + 0.5 * Math.sin(t * 10) * act : 0; roundRect(ctx, fx, fy - 9, 260, 18, 9); shape(ctx, on > 0.6 ? BR.spierL : BR.spier, '#8A3A34', 1.5); }
  ctx.restore(); }

// ===== spier met spierspoeltje; rek 0..1, sein = impulsen naar het ruggenmerg
function spierSpoel(ctx, x, y, w, rek, a = 1, t = 0, sein = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = w * (0.8 + 0.25 * rek), h = 150 - 30 * rek;
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(BR.spier, 0.85), '#8A3A34', 2); ctx.strokeStyle = rgba(BR.spierL, 0.6); ctx.lineWidth = 2; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.ellipse(x, y + i * 14, L / 2 - 20, 4, 0, 0, 6.283); ctx.stroke(); }
  // spoeltje
  const sl = L * 0.36; ctx.beginPath(); ctx.ellipse(x, y, sl / 2, 22, 0, 0, 6.283); shape(ctx, '#E8D8C0', C.goud, 3); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = x - sl * 0.3 + u * sl * 0.6; ctx.lineTo(px, y + Math.sin(u * 40) * 14); } ctx.stroke();
  // zenuw naar boven
  ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.quadraticCurveTo(x + 30, y - 160, x + 200, y - 260); ctx.stroke();
  if (sein > 0.01) for (let i = 0; i < 6; i++) { const u = ((t * (0.6 + rek * 1.4) + i / 6) % 1), px = x + 0.5 * (1 - u) * (1 - u) * 0 + 2 * (1 - u) * u * 30 + u * u * 200, py = y - 20 + 2 * (1 - u) * u * -140 + u * u * -240; circ(ctx, px, py, 8, rgba(C.teal, sein)); }
  ctx.restore(); }

function kopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(40, -50); ctx.lineTo(32, 20); ctx.quadraticCurveTo(0, 30, -32, 20); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA3B2', 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(46, -18, 18, -1.3, 1.3); ctx.stroke(); ctx.fillStyle = '#6B4A30'; ctx.fillRect(-36, -46, 72, 10); ctx.restore(); }
function want(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, 50); ctx.lineTo(-44, -30); ctx.quadraticCurveTo(-40, -80, 10, -78); ctx.quadraticCurveTo(50, -70, 44, -10); ctx.lineTo(40, 50); ctx.closePath(); shape(ctx, C.paars, '#5A4A8F', 3); ctx.beginPath(); ctx.ellipse(-52, -10, 16, 30, -0.4, 0, 6.283); shape(ctx, C.paars, '#5A4A8F', 3); ctx.fillStyle = '#5A4A8F'; ctx.fillRect(-42, 36, 84, 14); ctx.restore(); }
function sleutel(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); circ(ctx, -40, 0, 22, null, C.goud, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-18, 0); ctx.lineTo(50, 0); ctx.moveTo(36, 0); ctx.lineTo(36, 16); ctx.moveTo(50, 0); ctx.lineTo(50, 18); ctx.stroke(); ctx.restore(); }
function knoop(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 26 * s, '#C9A35C', '#8A6A3A', 3); for (const [dx, dy] of [[-7, -7], [7, -7], [-7, 7], [7, 7]]) circ(ctx, x + dx * s, y + dy * s, 4 * s, '#6A4A2A'); ctx.restore(); }
function blokjesBak(ctx, x, y, s, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520 * s, 140 * s, 10); shape(ctx, '#6B5440', '#4A3A2E', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 255 * s, y, 10 * s, 140 * s);
  const cols = [C.koraal, C.teal, C.goud, C.groen, C.paars]; for (let i = 0; i < 5; i++) { const moved = u * 5 > i + 0.5; const bx = moved ? x + 300 * s + (i % 3) * 70 * s : x + 30 * s + (i % 3) * 70 * s, by = y + 20 * s + Math.floor(i / 3) * 60 * s; roundRect(ctx, bx, by, 50 * s, 50 * s, 6); shape(ctx, cols[i], '#2A3446', 2); } ctx.restore(); }
function scoreGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'SCORE'); const pts = [0.12, 0.2, 0.3, 0.42, 0.5, 0.58, 0.63, 0.7, 0.74, 0.78]; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); const n = Math.max(1, Math.round(pts.length * u)); for (let i = 0; i < n; i++) { const px = x + 30 + i * (w - 60) / (pts.length - 1), py = y + h - pts[i] * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); for (let i = 0; i < n; i++) circ(ctx, x + 30 + i * (w - 60) / (pts.length - 1), y + h - pts[i] * h, 8, C.groen); ctx.restore(); }
// Wat word jij? · Fysiotherapie 2 · Opnieuw leren bewegen — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Opa Henk, Fysiotherapeut Femke).
// Rode draad: Henks rechterarm, van de eerste dagen tot een kopje koffie.

Object.assign(SCENES, {
  title(ctx, t) { breinBoven(ctx, 1600, 640, 0.95, 1, { motor: 1, schade: 1, nieuw: 0.5 + 0.5 * Math.sin(t * 0.8), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Drie', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; metaA(ctx, 'EEN PAAR JAAR GELEDEN', 160, 200, q.on('jaar', 1), C.grain, 'left', 28);
      roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); persoon(ctx, 'henk', 980, 860, 470, { t, outfit: 'gewoon', uit: q.on('lepel', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
      const lv = clamp((t - q.at('lepel', 1)) / 0.8, 0, 1); ctx.save(); ctx.translate(820, 560 + lv * 80); ctx.rotate(lv * 2); ctx.strokeStyle = '#D8DEE4'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(20, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(30, 0, 14, 9, 0, 0, 6.283); ctx.fillStyle = '#D8DEE4'; ctx.fill(); ctx.restore();
      naamBij(ctx, 'Opa Henk', 'beroerte', 1080, 340, q.on('Henk', 1)); tag(ctx, 'rechterhand: niets', 820, 470, C.koraal, q.on('rechterhand', 1), 'center', 28); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; metaA(ctx, 'DRIE DAGEN LATER', 160, 200, 1, C.grain, 'left', 28); henkBed(ctx, 820, 640, t, { H: 400, uit: 'neutraal' });
      persoon(ctx, 'femke', 1460, 860, 480, { t, outfit: 'werk', kijk: -1, pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1520, 330, q.on('Femke', 1));
      tag(ctx, '1 · strek je vingers', 820, 330, C.goud, q.on('vingers', 1), 'center', 32); tag(ctx, '2 · til je arm opzij', 820, 410, C.goud, q.on('opzij', 1), 'center', 32); vraagteken(ctx, 1200, 280, q.on('Waarom', 1), 100); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const N = q.on('Nederlands', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; const sch = q.on('sterven', 1, 1.2), rt = q.on('kruisen', 1, 2);
      breinBoven(ctx, 600, 400, 1, 1, { motor: q.on('plant', 1), schade: sch, route: Math.max(rt, q.on('banen', 1) * 0.35), t });
      naamBij(ctx, 'links', 'schade', 370, 420, q.on('links', 1), 'right'); naamBij(ctx, 'bewegingsgebied', 'plant beweging', 600, 170, q.on('plant', 1), 'center'); verwijs(ctx, 'Het hoofdkantoor', 600, 820, q.on('hoofdkantoor', 1));
      armSchema(ctx, 1150, 520, 1, q.on('rechterarm', 1), { heel: q.on('heel', 1), act: 0 }); naamBij(ctx, 'rechterarm', 'spieren en zenuwen heel', 1300, 330, q.on('rechterarm', 1));
      tag(ctx, 'geen opdracht', 1400, 700, C.koraal, q.on('opdracht', 1), 'center', 30); kruis(ctx, 1000, 620, 26, q.on('opdracht', 1)); ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; metaA(ctx, 'BINNEN DRIE DAGEN: VINGERS STREKKEN EN ARM OPZIJ?', 160, 240, 1);
      regel(ctx, 'lukt', 160, 340, q.on('strekken', 1), C.groen, 40, 'left', 700); stippen(ctx, 160, 380, 100, Math.round(98 * q.on('achtennegentig', 1, 1.5)), C.groen, q.on('strekken', 1), 25, 12, 30); regel(ctx, '98 van de 100', 950, 440, q.on('achtennegentig', 1), C.groen, 44, 'left', 700);
      regel(ctx, 'lukt niet (allebei)', 160, 590, q.on('Lukt', 1), C.koraal, 40, 'left', 700); stippen(ctx, 160, 630, 100, Math.round(25 * q.on('kwart', 1, 1.2)), C.koraal, q.on('Lukt', 1), 25, 12, 30); regel(ctx, '± 25 van de 100', 950, 690, q.on('kwart', 1), C.koraal, 44, 'left', 700);
      metaA(ctx, 'NA EEN HALF JAAR: WEER IETS MET DE HAND', 160, 820, q.on('half', 1)); persoon(ctx, 'henk', 1650, 860, 420, { t, outfit: 'gewoon', uit: 'blij', a: q.on('klein', 1, 0.3) }); tag(ctx, 'lukt een klein beetje', 1650, 380, C.groen, q.on('klein', 1), 'center', 28); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Maar', 1, 0.8);
    if (N < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - N; naamBij(ctx, 'motorische eenheid', 'één neuron + zijn spiervezels', 160, 220, q.on('eenheid', 1));
      motorEenheid(ctx, 200, 420, 1, 10, q.on('oogspier', 1), 0, C.goud, t); tag(ctx, 'oogspier: ± 10 vezels', 420, 560, C.goud, q.on('tien', 1), 'center', 28);
      motorEenheid(ctx, 1000, 440, 1, 60, q.on('kuit', 1), 0, C.goud, t); tag(ctx, 'kuit: meer dan 1000', 1260, 640, C.goud, q.on('duizend', 1), 'center', 28);
      const k = q.on('kracht', 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; chip(ctx, 'meer eenheden aan', 600, 760, C.groen, q.on('zet', 1)); chip(ctx, 'sneller vuren', 1060, 760, C.groen, q.on('vuren', 1)); ctx.restore(); } ctx.restore(); }
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; persoon(ctx, 'noor', 960, 860, 520, { t, outfit: 'school', pose: q.on('neus', 1) > 0.5 ? 'denk' : 'staan', uit: 'neutraal' }); tag(ctx, 'ogen dicht', 960, 260, C.teal, q.on('ogen', 1), 'center', 30); vraagteken(ctx, 1300, 380, q.on('Hoe', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const H = q.on('beroerte', 1, 0.8), rek = 0.5 + 0.5 * Math.sin(t * 1.3);
    if (H < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - H; spierSpoel(ctx, 640, 560, 760, rek, q.on('spierspoeltjes', 1), t, q.on('melden', 1)); naamBij(ctx, 'spierspoeltje', 'meet hoe ver de spier is uitgerekt', 460, 680, q.on('spierspoeltjes', 1));
      breinBoven(ctx, 1450, 340, 0.8, q.on('kaart', 1), { t }); const k = q.on('kaart', 1); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.strokeRect(1250, 560, 400, 240); ctx.restore(); persoon(ctx, 'noor', 1450, 790, 200, { t, outfit: 'school', a: k }); }
      tag(ctx, 'spiergevoel', 1450, 120, C.teal, q.on('spiergevoel', 1), 'center', 34); ctx.restore(); }
    if (H > 0.01) { ctx.save(); ctx.globalAlpha *= H; roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); kopje(ctx, 880, 560, 1.2); ctx.save(); ctx.translate(1060, 0); ctx.scale(-1, 1); persoon(ctx, 'henk', 0, 860, 470, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'wijs' }); ctx.restore();
      tag(ctx, 'kijken nodig', 1060, 300, C.oker, q.on('kijken', 1), 'center', 30); tag(ctx, 'naast het kopje', 640, 500, C.koraal, q.on('naast', 1), 'center', 28); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('Maar', 1, 0.8);
    breinBoven(ctx, 600, 420, 1.1, 1 - M * 0.7, { motor: 1, schade: 1, nieuw: q.on('overnemen', 1, 2.5), t }); naamBij(ctx, 'dode cellen', 'komen niet terug', 600, 200, q.on('dode', 1) * (1 - q.on('Gezonde', 1)), 'center');
    naamBij(ctx, 'nieuwe verbindingen', 'gezonde cellen nemen werk over', 600, 680, q.on('overnemen', 1) * (1 - M), 'center'); verwijs(ctx, 'Leren en onthouden', 600, 780, q.on('Leren', 1) * (1 - M));
    regel(ctx, 'plasticiteit', 1150, 260, q.on('plasticiteit', 1), C.groen, 56, 'left', 700);
    const tl = q.on('herstel', 1); if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl * (1 - M); assen(ctx, 1150, 360, 600, 260, 'TIJD', 'HERSTEL'); ctx.strokeStyle = C.groen; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = i / 50, px = 1150 + u * 600, py = 620 - 230 * (1 - Math.exp(-u * 5)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); metaA(ctx, 'EERSTE WEKEN TOT ± 3 MAANDEN', 1170, 680, 1, C.groen); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; persoon(ctx, 'henk', 1450, 860, 470, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'schouders' }); tag(ctx, 'links gaat makkelijk', 1450, 300, C.oker, q.on('links', 1), 'center', 30); vraagteken(ctx, 1150, 420, q.on('helpt', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const kr = clamp((t - q.at('kwijt', 1)) / 2, 0, 1);
    breinBoven(ctx, 600, 440, 1.2, 1, { motor: 1, schade: 1, arm: 1 - 0.55 * kr, t }); naamBij(ctx, 'armgebied', 'krimpt', 440, 220, q.on('stukje', 1), 'center');
    regel(ctx, 'aangeleerd niet-gebruik', 1100, 300, q.on('aangeleerd', 1), C.koraal, 46, 'left', 700); 
    armSchema(ctx, 1150, 560, 0.9, q.on('werk', 1), { act: q.on('werk', 1), buig: 0.4 + 0.2 * Math.sin(t * 2) }); tag(ctx, 'rechts aan het werk', 1400, 760, C.groen, q.on('werk', 1), 'center', 30); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('dierproeven', 1, 0.6), Z = q.on('zelf', 1, 0.8), ME = q.on('meet', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; regel(ctx, 'echte taken', 160, 230, q.on('taken', 1), C.goud, 48, 'left', 700); kopje(ctx, 450, 480, 1.3, q.on('kopje', 1)); sleutel(ctx, 900, 470, 1.4, q.on('sleutel', 1), Math.sin(t * 2) * 0.6); knoop(ctx, 1350, 470, 2, q.on('knoop', 1));
      tag(ctx, 'niet zomaar een arm optillen', 900, 700, C.text2, q.on('zomaar', 1), 'center', 28); ctx.restore(); }
    if (D * (1 - Z) > 0.01) { ctx.save(); ctx.globalAlpha *= D * (1 - Z); metaA(ctx, 'HERHALINGEN PER DAG / PER SESSIE', 160, 220, 1);
      balk(ctx, 160, 300, 1500, 1 * q.on('honderden', 1, 1.5), C.groen, 'dieren in onderzoek: honderden per dag', q.on('dieren', 1)); balk(ctx, 160, 420, 1500, 0.06 * q.on('dertig', 1, 1), C.koraal, 'mensen in een therapiesessie: ± 30', q.on('onderzoekers', 1)); regel(ctx, '± 30', 300, 448, q.on('dertig', 1), C.koraal, 36, 'left', 700); ctx.restore(); }
    if (Z * (1 - ME) > 0.01) { ctx.save(); ctx.globalAlpha *= Z * (1 - ME); ctx.save(); ctx.translate(960, 0); ctx.scale(-1, 1); persoon(ctx, 'henk', 0, 860, 480, { t, outfit: 'gewoon', uit: 'neutraal', pose: 'wijs' }); ctx.restore(); kopje(ctx, 640, 600, 1, 1); want(ctx, 1040, 650, 0.9, q.on('want', 1)); naamBij(ctx, 'want om links', '', 1100, 540, q.on('want', 1)); persoon(ctx, 'femke', 1550, 860, 460, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); tag(ctx, 'dan moet rechts wel', 960, 260, C.groen, q.on('rechts', 1), 'center', 30); ctx.restore(); }
    if (ME > 0.01) { ctx.save(); ctx.globalAlpha *= ME; blokjesBak(ctx, 160, 300, 1.2, clamp((t - q.at('blokjes', 1)) / 3, 0, 1)); kopje(ctx, 400, 640, 1, q.on('glas', 1)); metaA(ctx, 'ELKE WEEK DEZELFDE TAKEN', 160, 260, 1);
      scoreGrafiek(ctx, 1000, 300, 700, 360, clamp((t - q.at('punten', 1)) / 4, 0, 1), q.on('punten', 1)); tag(ctx, 'te makkelijk → moeilijker', 1350, 760, C.goud, q.on('moeilijker', 1), 'center', 28); tag(ctx, 'net boven wat hij kan', 700, 820, C.groen, q.on('boven', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 600, 640, 760, 30, 8); shape(ctx, '#6B5440', '#4A3A2E', 2); persoon(ctx, 'henk', 960, 860, 480, { t, outfit: 'gewoon', uit: 'blij', pose: 'vasthouden' }); kopje(ctx, 840, 560 + 4 * Math.sin(t * 5), 1);
    metaA(ctx, 'EEN HALF JAAR LATER', 160, 200, 1); tag(ctx, 'niet zo soepel, wel zelf', 960, 270, C.groen, q.on('zelf', 1), 'center', 30);
    breinBoven(ctx, 1550, 420, 0.7, q.on('brein', 1), { motor: 1, schade: 1, nieuw: 1, route: q.on('aanleggen', 1, 2), t }); armSchema(ctx, 160, 460, 0.7, q.on('kapot', 1), { heel: 1 }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    metaA(ctx, 'REVALIDATIECENTRUM · HET TEAM', 160, 200, q.on('revalidatiecentrum', 1));
    tag(ctx, 'revalidatiearts', 480, 330, C.teal, q.on('revalidatiearts', 1), 'center', 30); tag(ctx, 'ergotherapeut: dagelijkse taken', 480, 420, C.teal, q.on('ergotherapeut', 1), 'center', 28); tag(ctx, 'logopedist: praten en slikken', 480, 510, C.teal, q.on('logopedist', 1), 'center', 28);
    tag(ctx, 'fysiotherapie: hbo', 1450, 400, C.goud, q.on('hbo', 1), 'center', 30); tag(ctx, 'daarna: specialiseren in hersenletsel', 1450, 490, C.paars, q.on('hersenletsel', 1), 'center', 28); },
});
