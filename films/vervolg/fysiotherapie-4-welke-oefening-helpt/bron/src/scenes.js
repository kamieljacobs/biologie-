
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
// Wat word jij? · Fysiotherapie 4 · Welke oefening helpt? — eigen tekeningen (21 okt 2026)
// gedeelde hulpjes uit film 1
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function praktijk(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22304C'; ctx.fillRect(0, 760, W, 120);
  roundRect(ctx, 1180, 600, 560, 60, 14); shape(ctx, '#3E6A8E', '#5E8AAE', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(1220, 660, 24, 120); ctx.fillRect(1676, 660, 24, 120); ctx.restore(); }
function checkRij(ctx, s2, x, y, a = 1, st = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 34, 40, 40, 8); shape(ctx, rgba(C.fill, 0.6), C.line, 2); text(ctx, s2, x + 64, y, fTekst(px, 600), C.text, 'left'); ctx.restore();
  if (st === 'nee') kruis(ctx, x + 20, y - 14, 13, a); if (st === 'ja') vink_(ctx, x + 20, y - 14, 14, a); }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }

const OE = { bot: '#E6DCC6', botR: '#B8AC94', band: '#E2C27A', spier: '#B8564E', pees: '#E2D3B0', schijf: '#9CC4DC', huid: '#E3B998' };

// ===== kleine iconen voor de agenda
function icoon(ctx, soort, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  if (soort === 'enkel') { ctx.moveTo(-6, -40); ctx.lineTo(-6, 10); ctx.quadraticCurveTo(-6, 30, 20, 30); ctx.lineTo(40, 30); ctx.moveTo(10, -40); ctx.lineTo(10, 6); }
  if (soort === 'knie') { ctx.moveTo(-10, -44); ctx.lineTo(4, -4); ctx.lineTo(-10, 40); ctx.stroke(); ctx.beginPath(); ctx.ellipse(14, -6, 9, 13, 0, 0, 6.283); }
  if (soort === 'rug') { for (let i = 0; i < 5; i++) { ctx.moveTo(-14 + Math.sin(i * 0.7) * 6, -40 + i * 20); ctx.lineTo(14 + Math.sin(i * 0.7) * 6, -40 + i * 20); } }
  if (soort === 'schouder') { ctx.arc(0, 0, 18, 0, 6.283); ctx.moveTo(-40, -24); ctx.quadraticCurveTo(-10, -40, 24, -16); ctx.moveTo(10, 16); ctx.lineTo(24, 46); }
  ctx.stroke(); ctx.restore(); }

// ===== enkel van voren: scheenbeen, kuitbeen, voet; klap 0..1 = voet kantelt naar binnen (enkel klapt naar buiten); band 0..1 uitgerekt/ingescheurd
function enkel(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { klap = 0, scheur = 0, hl = 0, punten = 0, ger = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.moveTo(-110, -420); ctx.lineTo(-100, -40); ctx.quadraticCurveTo(-120, 30, -90, 60); ctx.lineTo(110, 60); ctx.quadraticCurveTo(130, 20, 110, -40); ctx.lineTo(110, -420); ctx.closePath(); ctx.fillStyle = OE.huid; ctx.fill(); ctx.restore();
  roundRect(ctx, -70, -420, 90, 380, 30); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(-50, -30, 40, 30, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  roundRect(ctx, 40, -400, 34, 380, 14); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(62, -10, 24, 36, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  // voet (draait om het enkelgewricht)
  ctx.save(); ctx.translate(0, 20); ctx.rotate(klap * 0.5); ctx.beginPath(); ctx.ellipse(0, 18, 70, 34, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5); roundRect(ctx, -110, 50, 230, 50, 20); shape(ctx, OE.bot, OE.botR, 2.5);
  const bandEnd = [86, 40]; ctx.restore();
  // buitenste enkelband: van kuitbeen naar voet (buitenkant)
  const ex = Math.cos(klap * 0.5) * 86 - Math.sin(klap * 0.5) * 60, ey = 20 + Math.sin(klap * 0.5) * 86 + Math.cos(klap * 0.5) * 60;
  ctx.strokeStyle = hl > 0.5 || scheur > 0.01 ? C.goud : OE.band; ctx.lineWidth = 16 - 6 * klap; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(70, 18); ctx.lineTo(ex, ey); ctx.stroke(); } else { const m = [(70 + ex) / 2, (18 + ey) / 2]; ctx.beginPath(); ctx.moveTo(70, 18); ctx.lineTo(m[0] - 4, m[1] - 6 * scheur); ctx.moveTo(m[0] + 4, m[1] + 6 * scheur); ctx.lineTo(ex, ey); ctx.stroke(); }
  if (punten > 0.01) { ctx.save(); ctx.globalAlpha *= punten; for (const [px, py] of [[-60, -60], [64, -60], [-30, 90], [70, 96]]) { circ(ctx, px, py, 18, rgba(C.koraal, 0.4), C.koraal, 3); } ctx.restore(); }
  if (ger > 0.01) { ctx.save(); ctx.globalAlpha *= ger; for (let i = 0; i < 6; i++) circ(ctx, 70 + (ex - 70) * (0.2 + i * 0.12), 18 + (ey - 18) * (0.2 + i * 0.12) - 18, 6, C.teal); ctx.restore(); }
  ctx.restore(); }

// ===== balanskussen; persoon erop wiebelt
function kussen(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w / 2, 26, 0, 0, 6.283); shape(ctx, C.paars, '#5A4A8F', 3); ctx.beginPath(); ctx.ellipse(x, y - 8, w / 2 - 14, 16, 0, 0, 6.283); ctx.fillStyle = rgba('#A898D8', 0.5); ctx.fill(); ctx.restore(); }

// ===== knie van opzij met knieschijfpees; pees 0..1 = markering
function knieZijPees(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { pees = 0, pijn = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -420, 110, 400, 40); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(-4, -20, 80, 54, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  roundRect(ctx, -50, 50, 100, 380, 36); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.ellipse(0, 50, 86, 30, 0, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  ctx.beginPath(); ctx.ellipse(-110, -40, 34, 56, 0.1, 0, 6.283); shape(ctx, OE.bot, OE.botR, 2.5);
  ctx.beginPath(); ctx.moveTo(-110, -330); ctx.quadraticCurveTo(-140, -200, -120, -95); ctx.lineTo(-90, -95); ctx.quadraticCurveTo(-80, -200, -40, -330); ctx.closePath(); shape(ctx, rgba(OE.spier, 0.85), '#8A3A34', 2);
  ctx.strokeStyle = pees > 0.5 ? C.goud : OE.pees; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-106, 10); ctx.lineTo(-56, 120); ctx.stroke();
  if (pijn > 0.01) flits(ctx, -84, 66, 60 + 6 * Math.sin(t * 6), pijn); ctx.restore(); }

// ===== collageendraden: orde 1 = netjes in de lengte, 0 = rommelig
function collageen(ctx, x, y, w, h, orde, a = 1, nieuw = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 20); shape(ctx, '#3E2E38', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 20); ctx.clip(); ctx.lineCap = 'round';
  for (let i = 0; i < 40; i++) { const px = x + 40 + hash(i * 7 + 1) * (w - 80), py = y + 25 + hash(i * 11 + 2) * (h - 50), an = (hash(i * 13) - 0.5) * 3 * (1 - orde), L = 60 + 40 * hash(i * 17); ctx.strokeStyle = i < 40 * nieuw ? C.groen : rgba(OE.pees, 0.95); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== pijnmeter 0–10 met groene zone tot 5
function pijnMeter(ctx, x, y, w, waarde, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i <= 10; i++) { const bx = x + i * w / 11; roundRect(ctx, bx, y, w / 11 - 8, 56, 8); shape(ctx, i <= 5 ? rgba(C.groen, i <= waarde ? 0.95 : 0.3) : rgba(C.koraal, i <= waarde ? 0.95 : 0.3), C.line, 1.5); text(ctx, String(i), bx + (w / 11 - 8) / 2, y + 40, fTekst(28, 700), '#121A26', 'center'); }
  metaText(ctx, 'PIJN', x, y - 14, C.grain, 'left', 22); ctx.restore(); }

// ===== wervelkolom van opzij (onderrug): wervels met tussenwervelschijven; slijt 0..1
function wervels(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { slijt = 0, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { const yy = -260 + i * 120, xx = Math.sin(i * 0.6 + 0.4) * 30; roundRect(ctx, xx - 80, yy, 160, 86, 16); shape(ctx, OE.bot, OE.botR, 2.5); ctx.beginPath(); ctx.moveTo(xx + 80, yy + 20); ctx.lineTo(xx + 150, yy + 40); ctx.lineTo(xx + 80, yy + 66); ctx.closePath(); shape(ctx, OE.bot, OE.botR, 2);
    if (i < 4) { const dh = 30 * (1 - 0.45 * slijt); ctx.beginPath(); ctx.ellipse(xx + Math.sin(0.3) * 15, yy + 86 + 17, 74, dh / 2, 0, 0, 6.283); shape(ctx, slijt > 0.5 ? rgba(OE.schijf, 0.6) : OE.schijf, '#7AA6C2', 2); } }
  ctx.restore(); }

// ===== schouder: golfbal op een tee, met vier kleine spieren rond de kop
function golfTee(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spieren = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 60); ctx.quadraticCurveTo(0, 30, 70, 60); ctx.lineTo(16, 90); ctx.lineTo(10, 300); ctx.lineTo(-10, 300); ctx.lineTo(-16, 90); ctx.closePath(); shape(ctx, OE.bot, OE.botR, 2.5);
  circ(ctx, 0, -40, 110, '#F2F2EE', '#9AA3B2', 3); for (let i = 0; i < 18; i++) circ(ctx, -60 + (i % 6) * 24, -90 + Math.floor(i / 6) * 40, 6, rgba('#9AA3B2', 0.6));
  if (spieren > 0.01) { ctx.save(); ctx.globalAlpha *= spieren; ctx.strokeStyle = OE.spier; ctx.lineWidth = 26; ctx.lineCap = 'round'; for (let k = 0; k < 4; k++) { const an = -2.6 + k * 0.75; ctx.beginPath(); ctx.arc(0, -40, 132, an, an + 0.55); ctx.stroke(); } const pul = 0.5 + 0.5 * Math.sin(t * 3); pijl(ctx, -190, -40, -150, -40, C.goud, spieren * pul, 5, 14); pijl(ctx, 190, -40, 150, -40, C.goud, spieren * pul, 5, 14); ctx.restore(); }
  ctx.restore(); }

// ===== twee groepen: staaf vóór en na; echte operatie tegenover kijkoperatie
function groepBalken(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, 700, 380, '', 'MINDER PIJN');
  const st = (i, col, lab) => { const bx = x + 120 + i * 300, hh = 260 * u; roundRect(ctx, bx, y + 380 - hh, 140, hh, 10); shape(ctx, col, C.line, 1.5); text(ctx, lab, bx + 70, y + 430, fTekst(30, 600), C.text, 'center'); };
  st(0, C.teal, 'echte operatie'); st(1, C.oker, 'kijkoperatie'); ctx.restore(); }
function ultrageluid(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#E3B998'; ctx.fillRect(-200, 70, 400, 90); ctx.fillStyle = rgba('#B8564E', 0.6); ctx.fillRect(-200, 110, 400, 50); ctx.strokeStyle = '#5A6274'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(30, -110); ctx.quadraticCurveTo(140, -170, 190, -90); ctx.stroke();
  ctx.save(); ctx.rotate(0.25); roundRect(ctx, -26, -120, 52, 130, 22); shape(ctx, '#D8DEE4', '#8A93A6', 3); roundRect(ctx, -46, 6, 92, 40, 14); shape(ctx, '#8A93A6', '#5A6274', 2); ctx.restore();
  circ(ctx, -10, 72, 30, rgba('#BFE3F2', 0.7)); ctx.strokeStyle = C.teal; ctx.lineWidth = 4; for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(-10, 74, i * 24, 0.3, Math.PI - 0.3); ctx.stroke(); } ctx.restore(); }
// Wat word jij? · Fysiotherapie 4 · Welke oefening helpt? — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Fysiotherapeut Femke; Noor, Bilal, Verpleegkundige Jesse, Yasmin).
// Rode draad: één spreekuur van Femke met vier klachten.

Object.assign(SCENES, {
  title(ctx, t) { golfTee(ctx, 1660, 560, 1.1, 1, { spieren: 1, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx); persoon(ctx, 'femke', 1620, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'spreekuur', 1680, 330, q.on('Femke', 1));
    paneel(ctx, 140, 200, 760, 520, '', q.on('maandag', 1)); metaA(ctx, 'MAANDAG · SPREEKUUR', 180, 260, q.on('maandag', 1));
    const rij = (i, w0, naam, sz) => { const a = q.on(w0, 1); icoon(ctx, sz, 230, 340 + i * 100, 1, a); regel(ctx, naam, 300, 356 + i * 100, a, C.text, 40, 'left', 700); regel(ctx, sz, 560, 356 + i * 100, a, C.text2, 34, 'left', 600); };
    rij(0, 'Noor', 'Noor', 'enkel'); rij(1, 'Bilal', 'Bilal', 'knie'); rij(2, 'Jesse', 'Jesse', 'rug'); rij(3, 'Yasmin', 'Yasmin', 'schouder');
    tag(ctx, 'alle vier: oefeningen', 520, 800, C.groen, q.on('oefeningen', 1), 'center', 30); kruis(ctx, 1100, 420, 26, q.on('massage', 1)); tag(ctx, 'massage of apparaat', 1100, 500, C.koraal, q.on('massage', 1), 'center', 26); vraagteken(ctx, 1200, 280, q.on('Waarom', 1), 100); },

  // ---------- H1 enkel ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const O = q.on('Veel', 1, 0.8);
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; const kl = q.on('klapte', 1, 0.5) * (1 - q.on('gebroken', 1) * 0.7);
      enkel(ctx, 620, 560, 0.9, 1, { klap: kl, punten: q.on('plekjes', 1) * (1 - q.on('Meestal', 1)), scheur: q.on('ingescheurd', 1), hl: q.on('buitenste', 1) });
      persoon(ctx, 'noor', 1480, 860, 460, { t, outfit: 'sport', uit: 'neutraal', kijk: -1 }); naamBij(ctx, 'Noor', 'volleybal', 1540, 330, q.on('Noor', 1));
      tag(ctx, 'drukpijn op deze plekjes of geen 4 stappen → foto', 1000, 230, C.koraal, q.on('plekjes', 1) * (1 - q.on('Meestal', 1)), 'center', 26); checkRij(ctx, 'Noor: geen foto nodig', 900, 300, q.on('Dat', 1) * (1 - q.on('Meestal', 1)), 'ja', 30);
      naamBij(ctx, 'buitenste enkelband', 'uitgerekt of ingescheurd', 730, 620, q.on('buitenste', 1), 'left'); tag(ctx, 'na vijf dagen opnieuw testen', 1000, 160, C.teal, q.on('vijf', 1), 'center', 28); ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; metaA(ctx, 'NIEUWE VERZWIKKINGEN', 160, 230, 1); balk(ctx, 160, 290, 900, 0.9, C.koraal, 'zonder balansoefeningen', q.on('Veel', 1)); balk(ctx, 160, 390, 900, 0.6 * q.on('derde', 1) + 0.9 * (1 - q.on('derde', 1)), C.groen, '8 weken balansoefeningen thuis', q.on('acht', 1));
      tag(ctx, 'ongeveer een derde minder', 610, 500, C.groen, q.on('derde', 1), 'center', 30); const wb = Math.sin(t * 3) * 0.04; kussen(ctx, 1450, 850, 300, q.on('kussen', 1)); ctx.save(); ctx.translate(1450, 850); ctx.rotate(wb * 2 * q.on('kussen', 1)); enkel(ctx, 0, -76, 0.6, q.on('één', 1, 0.3), { klap: 0.1 * Math.sin(t * 3), ger: 1 }); ctx.restore(); tag(ctx, 'op één been', 1450, 400, C.paars, q.on('één', 1), 'center', 30); vraagteken(ctx, 1100, 650, q.on('helpt', 1), 100); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); enkel(ctx, 560, 580, 0.85, 1, { klap: 0.15 * Math.sin(t * 2), ger: 1 - q.on('trainen', 1) * 0.0, scheur: 0.4 });
    naamBij(ctx, 'zintuigjes in band en spieren', 'ook beschadigd', 760, 400, q.on('zintuigjes', 1)); tag(ctx, 'minder goed voelen hoe je voet staat', 1300, 560, C.koraal, q.on('voelt', 1), 'center', 28);
    verwijs(ctx, 'Opnieuw leren bewegen', 1300, 680, q.on('Opnieuw', 1)); tag(ctx, 'spiergevoel opnieuw trainen', 1300, 760, C.groen, q.on('trainen', 1), 'center', 30); },

  // ---------- H2 pees ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Rust', 1, 0.8), F = q.on('kniebuigingen', 1, 0.8);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; knieZijPees(ctx, 440, 520, 0.85, 1, { pees: q.on('pees', 1), pijn: q.on('springen', 1), t }); naamBij(ctx, 'knieschijfpees', 'overbelast', 470, 600, q.on('pees', 1), 'left');
      verwijs(ctx, 'Hoe weefsel herstelt', 1300, 200, q.on('weefsel', 1)); collageen(ctx, 900, 300, 380, 220, 1, q.on('weefsel', 1)); collageen(ctx, 1360, 300, 380, 220, 0.1, q.on('rommelig', 1)); naamBij(ctx, 'gezond', '', 1090, 570, q.on('weefsel', 1), 'center'); naamBij(ctx, 'overbelast', 'rommelige collageendraden', 1550, 570, q.on('rommelig', 1), 'center');
      tag(ctx, 'meestal geen echte ontsteking', 1320, 700, C.oker, q.on('ontsteking', 1), 'center', 28); ctx.restore(); }
    if (R * (1 - F) > 0.01) { ctx.save(); ctx.globalAlpha *= R * (1 - F); const st = (x, lab, sterk, pijn) => { regel(ctx, lab, x, 260, 1, C.text, 36, 'center', 700); collageen(ctx, x - 200, 320, 400, 200, 0.4, 1); balk(ctx, x - 200, 580, 400, sterk, C.teal, 'sterkte', 1); tag(ctx, pijn, x, 720, pijn.includes('terug') ? C.koraal : C.groen, 1, 'center', 28); };
      st(560, 'rust', 0.3, 'pijn minder'); if (q.on('springen', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('springen', 1); st(1360, 'weer springen', 0.3, 'pijn komt terug'); ctx.restore(); } ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const dip = (Math.sin(t * 0.9) * 0.5 + 0.5); persoon(ctx, 'bilal', 640, 860 + 60 * dip, 500, { t, outfit: 'sport', uit: 'neutraal', pose: 'handenHeup' }); tag(ctx, 'zwaar en langzaam', 640, 230, C.goud, 1, 'center', 32);
      kalenderW4(ctx, 1150, 300, 12, Math.round(12 * clamp((t - q.at('twaalf', 1)) / 2, 0, 1)), q.on('twaalf', 1)); pijnMeter(ctx, 1080, 640, 680, 3, q.on('pijn', 1)); vraagteken(ctx, 1000, 400, q.on('zegt', 1), 90); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); pijnMeter(ctx, 160, 280, 900, Math.round(5 * q.on('vijf', 1, 1.2)), 1); tag(ctx, 'tot ± 5 mag', 420, 400, C.groen, q.on('vijf', 1), 'center', 30); tag(ctx, 'volgende ochtend weer gezakt', 820, 400, C.teal, q.on('ochtend', 1), 'center', 28);
    const u = clamp((t - q.at('collageen', 1)) / 3, 0, 1); collageen(ctx, 1200, 240, 560, 300, 0.2 + 0.8 * u, q.on('pees', 1), u * 0.5); naamBij(ctx, 'nieuw collageen', 'pees wordt weer sterk', 1480, 600, q.on('collageen', 1), 'center');
    pijl(ctx, 1150, 390, 1060, 390, C.goud, q.on('trek', 1), 6, 20); pijl(ctx, 1810, 390, 1880, 390, C.goud, q.on('trek', 1), 6, 20); metaA(ctx, 'ZWARE, LANGZAME TREK', 1200, 220, q.on('trek', 1)); },

  // ---------- H3 rug ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'jesse', 520, 860, 500, { t, outfit: 'werk', uit: 'neutraal', pose: 'handenHeup' }); naamBij(ctx, 'Jesse', 'verpleegkundige', 520, 250, q.on('Jesse', 1), 'center'); { const M = lijfMaat('jesse', 520, 860, 500); flits(ctx, 520 + M.hw2 * 1.05, M.heupY - M.hh * 0.3, 44, q.on('rug', 1)); tag(ctx, 'onderrug', 520 + M.hw2 * 1.05 + 120, M.heupY - M.hh * 0.3, C.koraal, q.on('rug', 1) * (1 - q.on('Acht', 1)), 'left', 24); }
    metaA(ctx, 'OOIT LAGE RUGPIJN', 900, 330, q.on('Acht', 1)); stippen(ctx, 900, 370, 10, Math.round(8 * q.on('tien', 1, 1)), C.koraal, q.on('Acht', 1), 10, 26, 70); regel(ctx, '8 van de 10', 900, 470, q.on('tien', 1), C.koraal, 44, 'left', 700);
    tag(ctx, 'meestal geen duidelijke oorzaak', 1180, 550, C.oker, q.on('oorzaak', 1), 'center', 28); persoon(ctx, 'femke', 1600, 860, 480, { t, outfit: 'werk', kijk: -1, uit: 'neutraal', a: q.on('scan', 1, 0.3) }); tag(ctx, 'scan?', 900, 640, C.teal, q.on('scan', 1), 'center', 32); kruis(ctx, 1000, 630, 22, q.on('nee', 1)); vraagteken(ctx, 1300, 650, q.on('Waarom', 1), 90); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const AL = q.on('alarmsignalen', 1, 0.8), BW = q.on('advies', 1, 0.8);
    if (AL < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - AL; wervels(ctx, 360, 540, 0.85, 1, { slijt: q.on('slijtage', 1) }); metaA(ctx, 'MENSEN ZONDER RUGPIJN · SLIJTAGE OP DE SCAN', 760, 240, q.on('twintigjarigen', 1));
      balk(ctx, 760, 300, 900, 0.37 * q.on('derde', 1, 1.2), C.oker, '20 jaar: ruim een derde', q.on('twintigjarigen', 1)); balk(ctx, 760, 400, 900, 0.96 * q.on('tachtigjarigen', 1, 1.2), C.oker, '80 jaar: bijna iedereen', q.on('tachtigjarigen', 1));
      tag(ctx, 'kan bang maken om te bewegen', 1200, 560, C.koraal, q.on('bang', 1), 'center', 28); ctx.restore(); }
    if (AL * (1 - BW) > 0.01) { ctx.save(); ctx.globalAlpha *= AL * (1 - BW); metaA(ctx, 'ALARMSIGNALEN → METEEN NAAR DE ARTS', 160, 260, 1, C.koraal); const n = q.on('Jesse', 1) > 0.5 ? 'nee' : null;
      checkRij(ctx, 'gevoelloos zitvlak', 160, 360, q.on('gevoelloos', 1), n); checkRij(ctx, 'moeite met plassen', 160, 440, q.on('plassen', 1), n); checkRij(ctx, 'koorts', 160, 520, q.on('koorts', 1), n); persoon(ctx, 'jesse', 1300, 860, 480, { t, outfit: 'werk', uit: 'neutraal' }); ctx.restore(); }
    if (BW > 0.01) { ctx.save(); ctx.globalAlpha *= BW; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 760, W, 120); const x = 500 + ((t * 60) % 900); persoon(ctx, 'jesse', x, 860, 460, { t, outfit: 'gewoon', uit: 'blij' });
      regel(ctx, 'blijf bewegen', 160, 260, 1, C.groen, 52, 'left', 700); tag(ctx, 'in bed blijven: trager herstel', 1400, 300, C.koraal, q.on('bed', 1), 'center', 28); tag(ctx, 'elke dag wandelen en opbouwen', 1400, 380, C.groen, q.on('wandelt', 1), 'center', 28); ctx.restore(); } },

  // ---------- H4 schouder ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const OP = q.on('Vroeger', 1, 0.8);
    if (OP < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - OP; persoon(ctx, 'yasmin', 420, 860, 480, { t, outfit: 'school', uit: 'neutraal', pose: q.on('elastiek', 1) > 0.5 ? 'vasthouden' : 'wijsOmhoog' }); naamBij(ctx, 'Yasmin', 'zwemt veel', 500, 300, q.on('Yasmin', 1));
      if (q.on('elastiek', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('elastiek', 1); ctx.strokeStyle = C.groen; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(470, 610); ctx.quadraticCurveTo(620, 600 + 20 * Math.sin(t * 2), 760, 640); ctx.stroke(); ctx.restore(); tag(ctx, 'oefenen met elastiek', 600, 220, C.groen, q.on('elastiek', 1), 'center', 28); }
      golfTee(ctx, 1250, 460, 1.2, q.on('golfbal', 1), { spieren: q.on('spieren', 1), t }); naamBij(ctx, 'kop van de bovenarm', 'golfbal', 1250, 190, q.on('golfbal', 1), 'center'); naamBij(ctx, 'vier kleine spieren', 'houden de kop in de kom', 1600, 520, q.on('spieren', 1), 'left'); ctx.restore(); }
    if (OP > 0.01) { ctx.save(); ctx.globalAlpha *= OP; tag(ctx, 'vroeger vaak: operatie om ruimte te maken', 960, 260, C.oker, 1, 'center', 32); groepBalken(ctx, 600, 360, q.on('zoek', 1), 0); vraagteken(ctx, 960, 560, q.on('helpt', 1), 120); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const U = q.on('ultrageluid', 1, 0.8);
    if (U < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - U; metaA(ctx, 'BRITS ONDERZOEK', 160, 230, q.on('Britse', 1)); groepBalken(ctx, 300, 300, q.on('groep', 1), clamp((t - q.at('vooruit', 1)) / 1.5, 0, 1));
      tag(ctx, 'echt', 490, 395, C.teal, q.on('echte', 1), 'center', 24); tag(ctx, 'niets weggehaald', 790, 395, C.oker, q.on('kijkoperatie', 1), 'center', 24);
      tag(ctx, 'ongeveer even veel vooruit', 1400, 400, C.goud, q.on('even', 1), 'center', 32); tag(ctx, 'verwachting en tijd doen veel', 1400, 480, C.text2, q.on('verwachten', 1), 'center', 28); ctx.restore(); }
    if (U > 0.01) { ctx.save(); ctx.globalAlpha *= U; ultrageluid(ctx, 560, 470, 1.6, 1); tag(ctx, 'ultrageluid: voegt nauwelijks iets toe', 560, 230, C.koraal, 1, 'center', 28);
      persoon(ctx, 'femke', 1400, 860, 480, { t, outfit: 'werk', uit: 'neutraal', kijk: -1, pose: 'denk' }); tag(ctx, 'leest onderzoek, past haar werk aan', 1400, 260, C.teal, q.on('lezen', 1), 'center', 28); ctx.restore(); } },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const kaart = (i, w0, tit, body, col) => card(ctx, 120 + i * 430, 230, 400, 230, tit, body, q.on(w0, 1), col);
    kaart(0, 'klachten', 'enkel', 'spiergevoel trainen', C.teal); kaart(1, 'oefeningen', 'pees', 'zwaar en langzaam', C.goud); kaart(2, 'gevaarlijk', 'rug', 'blijf bewegen', C.groen); kaart(3, 'belasting', 'schouder', 'kop in de kom', C.paars);
    tag(ctx, 'uitsluiten wat gevaarlijk is → juiste belasting → uitleggen', 960, 560, C.text, q.on('uitleggen', 1), 'center', 30); tag(ctx, 'gaat het niet over? laat het onderzoeken', 960, 680, C.koraal, q.on('onderzoeken', 1), 'center', 32); },

  s17(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'femke', 960, 860, 520, { t, outfit: 'werk', uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1060, 300, 1);
    tag(ctx, 'fysiotherapie: hbo', 480, 260, C.teal, q.on('hbo', 1), 'center', 30); tag(ctx, 'sportfysiotherapeut', 480, 380, C.goud, q.on('sportfysiotherapeut', 1), 'center', 28); tag(ctx, 'kinderen', 480, 450, C.goud, q.on('kinderen', 1), 'center', 28); tag(ctx, 'ouderen', 480, 520, C.goud, q.on('ouderen', 1), 'center', 28);
    tag(ctx, 'zelf onderzoek doen', 1450, 450, C.paars, q.on('onderzoek', 1), 'center', 30); },
});
function kalenderW4(ctx, x, y, n, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { roundRect(ctx, x + (i % 6) * 70, y + Math.floor(i / 6) * 70, 56, 56, 8); shape(ctx, i < k ? C.groen : '#3A4458', C.line, 1.5); } metaText(ctx, '12 WEKEN', x, y - 16, C.grain, 'left', 22); ctx.restore(); }
