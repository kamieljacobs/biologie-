
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
// Wat word jij? · Fysiotherapie 3 · Trainen — eigen tekeningen (21 okt 2026)
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
const BR = { hersen: '#3A3452', rand: '#8C7BBF', strip: '#E0B64A', schade: '#5A2A2E', zenuw: '#E0B64A', spier: '#B8564E', spierL: '#D27A6E', huid: '#E3B998' };
function motorEenheid(ctx, x, y, s, m, a = 1, act = 0, col = C.goud, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 26, rgba(col, 0.9), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(140, 0); ctx.stroke();
  const rows = Math.min(m, 12), cols = Math.ceil(m / rows), H2 = rows * 26;
  for (let i = 0; i < m; i++) { const r = i % rows, c = Math.floor(i / rows), fy = -H2 / 2 + r * 26 + 13, fx = 220 + c * 12; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(140, 0); ctx.quadraticCurveTo(180, fy, fx, fy); ctx.stroke();
    const on = act > 0.01 ? 0.5 + 0.5 * Math.sin(t * 10) * act : 0; roundRect(ctx, fx, fy - 9, 260, 18, 9); shape(ctx, on > 0.6 ? BR.spierL : BR.spier, '#8A3A34', 1.5); }
  ctx.restore(); }

// ===== supercompensatie: conditielijn. modus: 'een' (één training), 'op' (op tijd), 'vroeg', 'laat'; u = hoe ver getekend
function superLijn(ctx, x, y, w, h, modus, u, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const base = y + h * 0.55;
  ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x + w, base); ctx.stroke(); ctx.setLineDash([]);
  const een = d => d < 0.5 ? -Math.sin(Math.PI * d / 0.5) : d < 1 ? 0.5 * Math.sin(Math.PI / 2 * (d - 0.5) / 0.5) : d < 1.8 ? 0.5 * Math.cos(Math.PI / 2 * (d - 1) / 0.8) : 0;
  const v = T => { if (modus === 'een') return een(T / 2); if (modus === 'op') { const k = Math.floor(T), f = T - k; return k * 0.5 + (f < 0.5 ? -Math.sin(Math.PI * f / 0.5) : 0.5 * Math.sin(Math.PI / 2 * (f - 0.5) / 0.5)); }
    if (modus === 'vroeg') { const k = Math.floor(T / 0.5), f = T - k * 0.5; return -0.2 * k + (f < 0.25 ? -0.6 * Math.sin(Math.PI * f / 0.5) : -0.6 + 0.4 * (f - 0.25) / 0.25); }
    const k = Math.floor(T / 2); return een(T - k * 2); };
  const TT = modus === 'een' ? 4 : 4, N = 400; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const m = Math.round(N * clamp(u, 0, 1));
  for (let i = 0; i <= m; i++) { const g = i / N, px = x + g * w, py = base - v(g * TT) * h * 0.2; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  // trainingsmomenten
  const starts = modus === 'een' ? [0] : modus === 'op' ? [0, 1, 2, 3] : modus === 'vroeg' ? [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] : [0, 2]; starts.forEach(s0 => { if (s0 / TT <= u) { ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(x + s0 / TT * w, base + h * 0.42); ctx.lineTo(x + s0 / TT * w - 10, base + h * 0.42 + 18); ctx.lineTo(x + s0 / TT * w + 10, base + h * 0.42 + 18); ctx.fill(); } });
  ctx.restore(); }

// ===== doorsnede spiervezel met mitochondriën (n) en haarvaten eromheen (k)
function vezelRond(ctx, x, y, r, n, k, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, rgba(BR.spier, 0.9), '#8A3A34', 3);
  for (let i = 0; i < n; i++) { const an = hash(i * 7) * 6.283, rr = r * (0.2 + 0.7 * hash(i * 13)); mitochondrion(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, 30, hash(i * 3) * 3, 1, 3, t); }
  for (let i = 0; i < k; i++) { const an = i / Math.max(k, 1) * 6.283 + 0.3; circ(ctx, x + Math.cos(an) * (r + 22), y + Math.sin(an) * (r + 22), 13, '#B23A3A', '#E06A5A', 2); } ctx.restore(); }

// ===== hart (eenvoudig) met slag; s = grootte
function hartje(ctx, x, y, s, a = 1, slag = 0, kamer = 1) { if (a <= 0.01) return; const k = s * (1 - 0.07 * slag); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-110, -10, -90, -110, -20, -90); ctx.bezierCurveTo(0, -84, 0, -70, 0, -60); ctx.bezierCurveTo(0, -70, 0, -84, 20, -90); ctx.bezierCurveTo(90, -110, 110, -10, 0, 60); ctx.closePath(); shape(ctx, '#B23A3A', '#E06A5A', 3);
  roundRect(ctx, -40, -112, 22, 40, 8); shape(ctx, '#C9506A', '#E06A5A', 2); roundRect(ctx, 6, -118, 26, 44, 10); shape(ctx, '#8A4A7A', '#B06A9A', 2); const kk = (1 - 0.25 * slag) * kamer; ctx.beginPath(); ctx.ellipse(-30, -10, 26 * kk, 40 * kk, 0.2, 0, 6.283); ctx.fillStyle = '#5A1A22'; ctx.fill(); ctx.beginPath(); ctx.ellipse(32, -6, 30 * kk, 44 * kk, -0.2, 0, 6.283); ctx.fill(); ctx.strokeStyle = rgba('#F2D0C8', 0.7); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(-2, 0, 6, 46); ctx.stroke(); metaText(ctx, 'KAMERS', 0, 30 + 56, '#F2D0C8', 'center', 18); ctx.restore(); }
// druppels bloed per slag uit het hart
function slagDruppels(ctx, x, y, n, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % 5) * 34, y + Math.floor(i / 5) * 34, 13, '#B23A3A', '#E06A5A', 1.5); ctx.restore(); }

// ===== spiervezel in de lengte met eiwitdraden; dik 0..1
function vezelLang(ctx, x, y, w, dik, a = 1) { if (a <= 0.01) return; const h = 80 + 70 * dik, nd = Math.round(6 + 8 * dik); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BR.spier, 0.9), '#8A3A34', 3);
  for (let i = 0; i < nd; i++) { const yy = y - h / 2 + 12 + i * (h - 24) / Math.max(nd - 1, 1); ctx.strokeStyle = i % 2 ? rgba('#F2C0B0', 0.8) : rgba('#E07A6A', 0.9); ctx.lineWidth = 4; ctx.setLineDash(i % 2 ? [30, 14] : [18, 10]); ctx.beginPath(); ctx.moveTo(x + 30, yy); ctx.lineTo(x + w - 30, yy); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }

// ===== halterstang
function stang(ctx, x, y, w, a = 1, schijf = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke();
  for (const k of [-1, 1]) for (let i = 0; i < 1 + schijf; i++) { roundRect(ctx, x + k * (w / 2 - 40 - i * 26) - 12, y - 70 + i * 10, 24, 140 - i * 20, 6); shape(ctx, '#3A3F4E', '#6A7080', 2); } ctx.restore(); }
// ===== zwembad
function zwembad(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9C2B0'; ctx.fillRect(0, 560, 760, 60); ctx.fillStyle = '#2E6FBF'; ctx.fillRect(760, 600, W - 760, 280); ctx.fillRect(0, 620, 760, 260); ctx.strokeStyle = rgba('#F2F2EE', 0.7); ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.setLineDash([24, 18]); ctx.beginPath(); ctx.moveTo(0, 660 + i * 80); ctx.lineTo(W, 660 + i * 80); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
// ===== loopband
function loopband(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 40, 18); shape(ctx, '#2A2F3E', '#6A7080', 3); ctx.strokeStyle = '#6A7080'; ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { const px = x - w / 2 + ((i * w / 10 - t * 140) % w + w) % w; ctx.beginPath(); ctx.moveTo(px, y + 6); ctx.lineTo(px, y + 34); ctx.stroke(); }
  ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x + w / 2 - 30, y); ctx.lineTo(x + w / 2 - 10, y - 330); ctx.lineTo(x + w / 2 - 110, y - 330); ctx.stroke(); roundRect(ctx, x + w / 2 - 70, y - 380, 120, 70, 10); shape(ctx, '#1A2230', '#6A7080', 2); ctx.restore(); }
// ===== krachtplaat met kracht-tijd-grafiek
function krachtPlaat(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, '#C9A35C', '#8A6A3A', 2); ctx.restore(); }
function krachtGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD', 'KRACHT'); const lg = y + h - h * 0.2;
  ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, lg); ctx.lineTo(x + w, lg); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'LICHAAMSGEWICHT', x + w - 10, lg - 10, C.text2, 'right', 20);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 100 * u; i++) { const g = i / 100, v = g < 0.3 ? 0.2 : g < 0.45 ? 0.02 : g < 0.6 ? 0.2 + 0.66 * Math.exp(-Math.pow((g - 0.5) / 0.035, 2)) : 0.2; ctx.lineTo(x + g * w, y + h - v * h); } ctx.stroke(); ctx.restore(); }
// ===== stokfiguur met reflecterende stipjes (motion capture) en camera's
function stokSkelet(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const ph = t * 5, sw = Math.sin(ph);
  const P = { kop: [0, -330], nek: [0, -290], heup: [0, -150], sl: [-10 - 40 * sw, -200], hl: [-20 - 60 * sw, -150], sr: [10 + 40 * sw, -200], hr: [20 + 60 * sw, -150], kl: [30 * sw, -75], vl: [60 * sw, 0], kr: [-30 * sw, -75], vr: [-60 * sw, 0] };
  ctx.strokeStyle = C.text2; ctx.lineWidth = 6; ctx.lineCap = 'round'; const L = (a1, b1) => { ctx.beginPath(); ctx.moveTo(...P[a1]); ctx.lineTo(...P[b1]); ctx.stroke(); }; [['nek', 'heup'], ['nek', 'sl'], ['sl', 'hl'], ['nek', 'sr'], ['sr', 'hr'], ['heup', 'kl'], ['kl', 'vl'], ['heup', 'kr'], ['kr', 'vr']].forEach(([p1, p2]) => L(p1, p2));
  circ(ctx, ...P.kop, 30, null, C.text2, 6); Object.values(P).forEach(p => { circ(ctx, p[0], p[1], 11, '#F2F2EE'); circ(ctx, p[0], p[1], 18, rgba('#F2F2EE', 0.2)); }); ctx.restore(); }
function camera(ctx, x, y, s, a = 1, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(dir * s, s); roundRect(ctx, -40, -26, 70, 52, 8); shape(ctx, '#3A3F4E', '#8A93A6', 2); ctx.beginPath(); ctx.moveTo(30, -12); ctx.lineTo(56, -24); ctx.lineTo(56, 24); ctx.lineTo(30, 12); ctx.closePath(); shape(ctx, '#3A3F4E', '#8A93A6', 2); circ(ctx, -4, 0, 10, '#E07A5F'); ctx.restore(); }
// Wat word jij? · Fysiotherapie 3 · Trainen: hoe je lichaam zich aanpast — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Noor, Bilal, Fysiotherapeut Femke).
// Rode draad: tien weken trainen van Noor en Bilal.

Object.assign(SCENES, {
  title(ctx, t) { superLijn(ctx, 1060, 420, 780, 460, 'op', Math.min(1, 0.2 + t * 0.12), 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const T = q.on('Tien', 1, 0.8), B = q.on('Bilal', 1, 0.8);
    ctx.fillStyle = '#2F3E5C'; ctx.fillRect(0, 760, W, 120);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const x = 700 + 60 * Math.sin(t * 0.6);
      persoon(ctx, 'noor', x, 860, 500, { t, outfit: 'sport', pose: 'staan', uit: T > 0.5 ? 'blij' : 'neutraal' });
      tag(ctx, '2 km · buiten adem', 1300, 300, C.koraal, q.on('twee', 1) * (1 - T), 'center', 32); tag(ctx, '10 weken later: 5 km, rustig', 1300, 300, C.groen, T, 'center', 32);
      kalenderW(ctx, 1150, 400, 10, Math.round(10 * T), q.on('weken', 1)); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; persoon(ctx, 'noor', 560, 860, 470, { t, outfit: 'sport', uit: 'blij' }); persoon(ctx, 'bilal', 1260, 860, 500, { t, outfit: 'sport', uit: 'lacht', pose: 'vasthouden' }); stang(ctx, 1260, 590, 520, 1);
      naamBij(ctx, 'Bilal', 'krachttraining', 1380, 280, B); naamBij(ctx, 'Noor', 'hardlopen', 640, 320, B); vraagteken(ctx, 900, 300, q.on('fitter', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const M = q.on('volgende', 1, 0.8);
    if (M < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - M; const u = clamp((t - q.at('Tijdens', 1)) / 9, 0, 1); superLijn(ctx, 240, 280, 1200, 440, 'een', u, 1);
      tag(ctx, 'training: brandstof op, kleine schade', 560, 820, C.koraal, q.on('schade', 1), 'center', 28); tag(ctx, 'rust: herstel, net iets meer', 1120, 260, C.groen, q.on('meer', 1), 'center', 28); regel(ctx, 'supercompensatie', 1460, 520, q.on('supercompensatie', 1), C.goud, 44, 'left', 700); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; const rij = (i, mod, w0, lab, col) => { const a = q.on(w0, 1); if (a < 0.01) return; superLijn(ctx, 520, 200 + i * 220, 1200, 200, mod, clamp((t - q.at(w0, 1)) / 3, 0, 1), a, col); regel(ctx, lab, 160, 320 + i * 220, a, col, 34, 'left', 700); };
      rij(0, 'op', 'hoogtepunt', 'op tijd', C.groen); rij(1, 'vroeg', 'snel', 'te snel', C.koraal); rij(2, 'laat', 'lang', 'te laat', C.oker);
      metaA(ctx, '▲ = TRAINING', 1500, 180, q.on('hoogtepunt', 1)); ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const Hh = q.on('hart', 1, 0.8);
    if (Hh < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Hh; verwijs(ctx, 'Alles op adem', 960, 140, q.on('adem', 1)); const u = clamp((t - q.at('duurtraining', 1)) / 3, 0, 1), hv = clamp((t - q.at('haarvaten', 1)) / 2, 0, 1);
      vezelRond(ctx, 560, 520, 210, 6, 4, q.on('mitochondriën', 1), t); naamBij(ctx, 'spiervezel', 'doorsnede · eerst', 560, 270, q.on('mitochondriën', 1), 'center');
      vezelRond(ctx, 1320, 520, 210, Math.round(6 + 5 * u), Math.round(4 + 4 * hv), q.on('duurtraining', 1), t); naamBij(ctx, 'spiervezel', 'na een paar weken', 1320, 270, q.on('duurtraining', 1), 'center');
      tag(ctx, 'meer mitochondriën', 1320, 800, C.mito, q.on('procenten', 1), 'center', 30); tag(ctx, 'meer haarvaten', 1700, 380, '#E06A5A', q.on('haarvaten', 1), 'center', 28); ctx.restore(); }
    if (Hh > 0.01) { ctx.save(); ctx.globalAlpha *= Hh; const bpm = q.on('vijfenzestig', 1) > 0.5 ? 65 : 70, sl = Math.max(0, Math.sin(t * bpm / 60 * 6.283)); hartje(ctx, 700, 480, 2.2, 1, sl);
      regel(ctx, String(bpm), 1150, 470, q.on('rust', 1), bpm === 65 ? C.groen : C.text, 110, 'left', 800); metaA(ctx, 'SLAGEN PER MINUUT IN RUST', 1150, 530, q.on('rust', 1));
      tag(ctx, 'evenveel zuurstof', 1300, 700, C.teal, q.on('evenveel', 1), 'center', 30); vraagteken(ctx, 1640, 420, q.on('Hoe', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const sl70 = Math.max(0, Math.sin(t * 70 / 60 * 6.283)), sl60 = Math.max(0, Math.sin(t * 65 / 60 * 6.283)), g = q.on('groter', 1);
    hartje(ctx, 500, 430, 1.6, 1, sl70, 1); hartje(ctx, 1200, 430, 1.6 + 0.15 * g, 1, sl60, 1 + 0.25 * g); naamBij(ctx, 'eerst', '70 slagen', 500, 230, 1, 'center'); naamBij(ctx, 'getraind', '65 slagen, sterker en iets groter', 1200, 210, 1, 'center');
    tag(ctx, 'slagvolume', 850, 610, C.goud, q.on('slagvolume', 1), 'center', 32); slagDruppels(ctx, 430, 640, 5, q.on('slagvolume', 1)); slagDruppels(ctx, 1110, 640, 6, q.on('slagvolume', 1));
    regel(ctx, 'bloed per minuut = slagvolume × hartslag', 960, 820, q.on('keer', 1), C.text, 40, 'center', 700); verwijs(ctx, 'Het hart onder controle', 1560, 740, q.on('controle', 1)); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 960, 860, 520, { t, outfit: 'sport', uit: 'lacht', pose: 'vasthouden' }); stang(ctx, 960, 580 - 20 * Math.abs(Math.sin(t)), 600, 1, q.on('meer', 1) > 0.5 ? 2 : 1);
    tag(ctx, 'na twee weken: flink meer', 960, 200, C.groen, q.on('weken', 1), 'center', 32); tag(ctx, 'spieren nog net zo dik', 1500, 450, C.oker, q.on('dik', 1), 'center', 30); vraagteken(ctx, 1500, 330, q.on('Hoe', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const D = q.on('Pas', 1, 0.8), aan = clamp((t - q.at('tegelijk', 1)) / 2, 0, 1);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; verwijs(ctx, 'Opnieuw leren bewegen', 420, 210, q.on('Opnieuw', 1));
      for (let i = 0; i < 4; i++) motorEenheid(ctx, 260, 330 + i * 130, 0.6, 8, q.on('neuron', 1), i < 1 + Math.round(3 * aan) ? 1 : 0, C.goud, t + i);
      regel(ctx, 'eerste weken: het zenuwstelsel leert', 1000, 380, q.on('weken', 1), C.goud, 40, 'left', 700); tag(ctx, 'meer eenheden tegelijk aan', 1300, 470, C.groen, q.on('tegelijk', 1), 'center', 30); tag(ctx, 'beter samenwerken', 1300, 550, C.groen, q.on('samen', 1), 'center', 30); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const dk = clamp((t - q.at('dikker', 1)) / 2.5, 0, 1); metaA(ctx, 'NA EEN PAAR WEKEN · GOED ZICHTBAAR NA 6–8 WEKEN', 160, 220, 1);
      vezelLang(ctx, 200, 420, 1400, dk, 1); naamBij(ctx, 'spiervezel', 'dikker', 900, 300 - 30 * dk, 1, 'center'); naamBij(ctx, 'meer draden actine en myosine', '', 900, 600 + 40 * dk, q.on('actine', 1), 'center');
      tag(ctx, 'nauwelijks nieuwe spiercellen', 560, 760, C.oker, q.on('nauwelijks', 1), 'center', 28); tag(ctx, 'eiwit + slaap', 1300, 760, C.teal, q.on('eiwit', 1), 'center', 30); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('omkeerbaar', 1, 0.6), BW = q.on('Bewegingswetenschappers', 1, 0.8), KP = q.on('krachtplaat', 1, 0.6), PL = q.on('plakkers', 1, 0.6), CA = q.on('camera', 1, 0.6);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; zwembad(ctx); persoon(ctx, 'noor', 400, 590, 340, { t, outfit: 'sport', uit: 'verbaasd', pose: 'schouders' }); tag(ctx, 'na vier banen kapot', 400, 200, C.koraal, q.on('banen', 1), 'center', 32);
      regel(ctx, 'specifiek', 820, 300, q.on('specifiek', 1), C.goud, 52, 'left', 700); tag(ctx, 'benen getraind', 1500, 330, C.groen, q.on('beenspieren', 1), 'center', 28); tag(ctx, 'armen en schouders niet', 1500, 410, C.koraal, q.on('armen', 1), 'center', 28); ctx.restore(); }
    if (O * (1 - BW) > 0.01) { ctx.save(); ctx.globalAlpha *= O * (1 - BW); regel(ctx, 'omkeerbaar', 160, 260, 1, C.goud, 52, 'left', 700); kalenderW(ctx, 300, 360, 3, 3, q.on('drie', 1), C.koraal, 'drie weken stil');
      balk(ctx, 900, 420, 800, 1 - 0.25 * q.on('verdwenen', 1, 1.5), C.groen, 'conditie', q.on('drie', 1)); tag(ctx, 'deel van de winst weg', 1300, 560, C.koraal, q.on('verdwenen', 1), 'center', 30); ctx.restore(); }
    if (BW * (1 - KP) > 0.01) { ctx.save(); ctx.globalAlpha *= BW * (1 - KP); loopband(ctx, 900, 820, 700, 1, t); persoon(ctx, 'noor', 850, 820, 470, { t, outfit: 'sport', uit: 'neutraal' }); const M = lijfMaat('noor', 850, 820, 470);
      ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(850, M.top + M.hh * 0.75); ctx.quadraticCurveTo(1100, M.top, 1180, 440); ctx.stroke(); circ(ctx, 850, M.top + M.hh * 0.72, M.hh * 0.22, rgba('#3A3F4E', 0.9), '#8A93A6', 3);
      regel(ctx, 'maximale zuurstofopname', 1240, 360, q.on('maximaal', 1), C.teal, 38, 'left', 700); metaA(ctx, 'INSPANNINGSTEST MET MASKER', 1240, 410, q.on('masker', 1)); ctx.restore(); }
    if (KP * (1 - PL) > 0.01) { ctx.save(); ctx.globalAlpha *= KP * (1 - PL); krachtPlaat(ctx, 520, 820, 520, 1); const sp = clamp((t - q.at('sprong', 1)) / 1.4, 0, 1), lift = Math.sin(clamp(sp, 0, 1) * Math.PI) * 140;
      persoon(ctx, 'bilal', 520, 820 - lift, 440, { t, outfit: 'sport', uit: 'lacht', pose: lift > 30 ? 'wijsOmhoog' : 'staan' }); naamBij(ctx, 'krachtplaat', '', 520, 870 - 20, KP, 'center');
      krachtGrafiek(ctx, 1000, 280, 760, 420, clamp((t - q.at('landen', 1)) / 2, 0, 1), 1); tag(ctx, '3–5 × je lichaamsgewicht', 1400, 760, C.goud, q.on('lichaamsgewicht', 1), 'center', 30); ctx.restore(); }
    if (PL * (1 - CA) > 0.01) { ctx.save(); ctx.globalAlpha *= PL * (1 - CA); ctx.beginPath(); ctx.ellipse(700, 520, 400, 160, 0, 0, 6.283); shape(ctx, '#E3B998', '#B88A68', 3); ctx.beginPath(); ctx.ellipse(700, 540, 340, 100, 0, 0, 6.283); shape(ctx, rgba(BR.spier, 0.55), '#8A3A34', 2); for (const dx of [-80, 80]) { circ(ctx, 700 + dx, 390, 26, '#D8DEE4', '#8A93A6', 3); ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(700 + dx, 366); ctx.quadraticCurveTo(900, 300, 1060, 340); ctx.stroke(); }
      golf(ctx, 1080, 360, 700, 120, 1, { freq: 8, t, col: C.goud, schaal: 1 }); metaA(ctx, 'SPIERACTIVITEIT', 1080, 250, 1); naamBij(ctx, 'plakkers op de huid', '', 700, 720, 1, 'center'); ctx.restore(); }
    if (CA > 0.01) { ctx.save(); ctx.globalAlpha *= CA; stokSkelet(ctx, 960, 780, 1.4, t, 1); camera(ctx, 300, 260, 1.4, 1, 1); camera(ctx, 1620, 260, 1.4, 1, -1); camera(ctx, 300, 700, 1.2, 1, 1); camera(ctx, 1620, 700, 1.2, 1, -1); tag(ctx, 'reflecterende stipjes', 960, 180, C.text, q.on('stipjes', 1), 'center', 30); naamBij(ctx, 'bewegend skelet', '', 1260, 400, q.on('skelet', 1)); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body, col) => card(ctx, 120 + i * 430, 280, 400, 230, tit, body, q.on(w0, 1), col);
    persoon(ctx, 'noor', 760, 860, 340, { t, outfit: 'sport', uit: 'blij' }); persoon(ctx, 'bilal', 1160, 860, 350, { t, outfit: 'sport', uit: 'lacht' }); regel(ctx, 'in de rust', 120, 220, q.on('rust', 1), C.goud, 48, 'left', 700);
    kaart(0, 'mitochondriën', 'mitochondriën', 'meer, en meer haarvaten', C.mito); kaart(1, 'hart', 'hart', 'groter slagvolume', '#E06A5A'); kaart(2, 'zenuwen', 'zenuwen', 'meer eenheden tegelijk', C.goud); kaart(3, 'spiervezels', 'spiervezels', 'dikker', C.groen); },

  s13(ctx, t, q) { bg(ctx, 'schema'); stokSkelet(ctx, 1450, 780, 1.1, t, q.on('Bewegingswetenschappen', 1)); persoon(ctx, 'femke', 560, 860, 480, { t, outfit: 'werk', uit: 'blij', a: q.on('fysiotherapeut', 1, 0.3) });
    tag(ctx, 'bewegingswetenschappen: universiteit', 1300, 200, C.paars, q.on('universiteit', 1), 'center', 30); tag(ctx, 'bijvoorbeeld Amsterdam of Groningen', 1300, 270, C.text2, q.on('Amsterdam', 1), 'center', 26);
    tag(ctx, 'bewegen · leren bewegen · trainen', 1300, 860 - 20, C.teal, q.on('onderzoekt', 1), 'center', 26); naamBij(ctx, 'Femke', 'fysiotherapeut', 640, 330, q.on('fysiotherapeut', 1)); tag(ctx, 'stap voor stap opbouwen', 560, 230, C.groen, q.on('bouwen', 1), 'center', 28); },
});

// weken als blokjes
function kalenderW(ctx, x, y, n, k, a = 1, col = C.groen, lab = 'weken') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x + (i % 5) * 64, y + Math.floor(i / 5) * 64, 52, 52, 8); shape(ctx, i < k ? col : '#3A4458', C.line, 1.5); } metaText(ctx, lab.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, y - 16, C.grain, 'left', 22); ctx.restore(); }
