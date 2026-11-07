
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
// Wat word jij? · Geneeskunde 1 · Van klacht naar diagnose — eigen tekeningen (20 okt 2026)

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// trap (zijaanzicht), treden van linksonder naar rechtsboven
function trapje(ctx, x, y, n, sw, sh, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); for (let i = 0; i < n; i++) { ctx.lineTo(x + i * sw, y - (i + 1) * sh); ctx.lineTo(x + (i + 1) * sw, y - (i + 1) * sh); } ctx.lineTo(x + n * sw, y); ctx.closePath(); shape(ctx, '#3A4458', C.line, 2); ctx.restore(); }

// iconen van de drie schakels
function longIcoon(ctx, x, y, s, a = 1, col = C.teal, vocht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(0, -20); ctx.moveTo(0, -20); ctx.lineTo(-22, 0); ctx.moveTo(0, -20); ctx.lineTo(22, 0); ctx.stroke();
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 14, -50); ctx.bezierCurveTo(k * 80, -60, k * 90, 40, k * 70, 70); ctx.bezierCurveTo(k * 50, 80, k * 20, 70, k * 14, 40); ctx.closePath(); shape(ctx, rgba(col, 0.25), col, 4);
    if (vocht > 0.01) { ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#5B8FD9', 0.75 * vocht); ctx.fillRect(k > 0 ? 10 : -100, 70 - 50 * vocht, 90, 60); ctx.restore(); } }
  ctx.restore(); }
function druppelIcoon(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -75); ctx.bezierCurveTo(30, -30, 60, 0, 60, 30); ctx.arc(0, 30, 60, 0, Math.PI); ctx.bezierCurveTo(-60, 0, -30, -30, 0, -75); shape(ctx, rgba(col, 0.25), col, 4);
  [[-20, 25], [18, 10], [10, 52]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(dx, dy, 15, 10, 0, 0, 6.283); shape(ctx, rgba(col, 0.7), col, 2); }); ctx.restore(); }
function hartIcoon(ctx, x, y, s, a = 1, col = C.koraal, t = 0, knijp = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const p = 1 + 0.06 * knijp * Math.max(0, Math.sin(t * 7)); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 70); ctx.bezierCurveTo(-90, 10, -80, -70, -30, -70); ctx.bezierCurveTo(-10, -70, 0, -55, 0, -40); ctx.bezierCurveTo(0, -55, 10, -70, 30, -70); ctx.bezierCurveTo(80, -70, 90, 10, 0, 70); shape(ctx, rgba(col, 0.3), col, 4);
  ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -38); ctx.lineTo(4, 40); ctx.stroke(); ctx.restore(); }

// keten: long → bloed → hart; zwak = index van de haperende schakel (-1 = geen)
function keten(ctx, x, y, s, a = 1, zwak = -1, t = 0, namen = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = [x - 360 * s, x, x + 360 * s];
  for (let i = 0; i < 2; i++) pijl(ctx, X[i] + 110 * s, y, X[i + 1] - 110 * s, y, C.line, 1, 4, 16);
  longIcoon(ctx, X[0], y, s, 1, zwak === 0 ? C.goud : C.teal); druppelIcoon(ctx, X[1], y, s, 1, zwak === 1 ? C.goud : C.koraal); hartIcoon(ctx, X[2], y, s, 1, zwak === 2 ? C.goud : C.koraal, t, 1);
  if (namen > 0.01) ['longen: opnemen', 'bloed: vervoeren', 'hart: rondpompen'].forEach((n, i) => regel(ctx, n, X[i], y + 140 * s, namen, i === zwak ? C.goud : C.text, 30, 'center', 700));
  ctx.restore(); }

// spreekkamer: bureau met scherm
function bureau(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#6B5440'; ctx.fillRect(x - 220, y, 440, 24); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 200, y + 24, 20, 140); ctx.fillRect(x + 180, y + 24, 20, 140);
  roundRect(ctx, x - 70, y - 120, 140, 96, 8); shape(ctx, '#1A2030', '#8A93A6', 3); ctx.fillStyle = '#8A93A6'; ctx.fillRect(x - 8, y - 24, 16, 24); ctx.restore(); }

// enkel met een putje na indrukken
function enkel(ctx, x, y, s, a = 1, put = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-50, -160); ctx.lineTo(-56, 20); ctx.quadraticCurveTo(-60, 70, -20, 80); ctx.lineTo(120, 80); ctx.quadraticCurveTo(140, 60, 110, 40); ctx.lineTo(40, 20); ctx.quadraticCurveTo(46, -40, 50, -160); shape(ctx, '#E3B998', '#C69A78', 3);
  if (put > 0.01) { ctx.beginPath(); ctx.ellipse(-30, -20, 16 * put, 10 * put, 0, 0, 6.283); shape(ctx, '#C69A78', '#A87E60', 2); } ctx.restore(); }

// saturatiemeter (vingerclip met getal)
function satMeter(ctx, x, y, a = 1, waarde = '93%') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 50, 180, 100, 20); shape(ctx, '#2A3446', '#8A93A6', 3); roundRect(ctx, x - 60, y - 30, 120, 60, 8); shape(ctx, '#0E141E', null); text(ctx, waarde, x, y + 18, fTekst(42, 800), C.goud, 'center'); metaText(ctx, 'ZUURSTOF', x, y + 86, C.grain, 'center', 22); ctx.restore(); }

// lijst met mogelijke oorzaken (differentiaaldiagnose); kans 0..1 per regel; hl = gemarkeerde regel
function ddLijst(ctx, x, y, a = 1, rijen = [], hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, 'MOGELIJKE OORZAKEN', x, y - 20, C.grain, 'left', 24);
  rijen.forEach(([n, kans, al], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + i * 90; roundRect(ctx, x, yy, 560, 72, 12); shape(ctx, rgba(i === hl ? C.goud : C.teal, i === hl ? 0.28 : 0.12), i === hl ? C.goud : C.teal, 2); text(ctx, (i + 1) + '. ' + n, x + 24, yy + 46, fTekst(32, 700), C.text, 'left'); roundRect(ctx, x + 400, yy + 28, 130 * kans, 16, 8); shape(ctx, rgba(C.goud, 0.8), null); ctx.restore(); }); ctx.restore(); }

// bloedbuisje met dop
function buisje(ctx, x, y, a = 1, col = '#B23A3A', lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 110, 44, 160, 20); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 2.5); ctx.fillStyle = rgba(col, 0.85); roundRect(ctx, x - 18, y - 60, 36, 106, 16); ctx.fill(); roundRect(ctx, x - 26, y - 130, 52, 30, 6); shape(ctx, '#7FA3C9', null); if (lab) text(ctx, lab, x, y + 96, fTekst(26, 700), C.text, 'center'); ctx.restore(); }

// echo van het hart (vierkamerbeeld): boezems boven, kamers onder; de linkerkamer (rechts in beeld) knijpt zwak
function echoScherm(ctx, x, y, w, h, a = 1, t = 0, zwak = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#0A0E14', '#6A7080', 3);
  const cx = x + w / 2, top = y + 24; ctx.save(); ctx.beginPath(); ctx.moveTo(cx, top); ctx.arc(cx, top, h - 50, Math.PI * 0.3, Math.PI * 0.7); ctx.closePath(); ctx.fillStyle = '#1A1E24'; ctx.fill(); ctx.clip();
  const k = 1 - (zwak ? 0.04 : 0.2) * Math.max(0, Math.sin(t * 6)), kr = 1 - 0.18 * Math.max(0, Math.sin(t * 6)); ctx.strokeStyle = '#C9CCD2'; ctx.fillStyle = '#05070A';
  const kamer = (px, py, rx, ry, f) => { ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(px, py, rx * f, ry * f, 0, 0, 6.283); ctx.fill(); ctx.stroke(); };
  kamer(cx - 52, y + h * 0.33, 34, 26, 1); kamer(cx + 52, y + h * 0.33, 34, 26, 1); kamer(cx - 52, y + h * 0.62, 38, 62, kr); kamer(cx + 56, y + h * 0.63, 44, 66, k); ctx.restore();
  text(ctx, 'boezems', cx, y + h * 0.33 - 44, fTekst(22, 600), C.text2, 'center'); text(ctx, 'linkerkamer', cx + 70, y + h - 16, fTekst(24, 700), C.goud, 'center'); text(ctx, 'rechterkamer', cx - 70, y + h - 16, fTekst(20, 600), C.text2, 'center'); ctx.restore(); }

// nier (boon) met druppels die terugkomen
function nierIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(10, -70); ctx.bezierCurveTo(80, -80, 90, 70, 10, 70); ctx.bezierCurveTo(-30, 70, -20, 20, -10, 0); ctx.bezierCurveTo(-20, -20, -30, -60, 10, -70); shape(ctx, rgba('#B0605A', 0.6), '#D88E7A', 3); ctx.restore(); }

// personenweegschaal met getal
function weegschaal(ctx, x, y, a = 1, s2 = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 18, 180, 26, 8); shape(ctx, '#C9CCD2', '#8A93A6', 2); if (s2) tag(ctx, s2, x, y + 70, C.goud, 1, 'center', 26); ctx.restore(); }
// Wat word jij? · Geneeskunde · Van klacht naar diagnose — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim als huisarts).

Object.assign(SCENES, {
  title(ctx, t) { keten(ctx, 1380, 560, 0.7, 1, 2, t, 0); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('huisarts', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; trapje(ctx, 240, 880, 6, 110, 70, 1); persoon(ctx, 'henk', 590, 880 - 3 * 70, 440, { t, uit: 'verbaasd', pose: 'handenHeup', kijk: 1 }); naamBij(ctx, 'Opa Henk', '71 jaar', 680, 300, q.on('Henk', 1)); chip(ctx, 'buiten adem op de trap', 1180, 420, C.koraal, q.on('adem', 1), 30); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; bureau(ctx, 520, 700, 1); persoon(ctx, 'kim', 300, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'henk', 760, 880, 440, { t, kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'huisarts', 160, 320, 1); ctx.restore();
      longIcoon(ctx, 1150, 420, 0.8, q.on('longen', 1)); druppelIcoon(ctx, 1450, 420, 0.8, q.on('bloed', 1)); hartIcoon(ctx, 1750, 420, 0.8, q.on('hart', 1), C.koraal, t, 1);
      regel(ctx, 'longen', 1150, 560, q.on('longen', 1), C.text, 30, 'center', 700); regel(ctx, 'bloed', 1450, 560, q.on('bloed', 1), C.text, 30, 'center', 700); regel(ctx, 'hart', 1750, 560, q.on('hart', 1), C.text, 30, 'center', 700); vraagteken(ctx, 1450, 720, q.on('denk', 1), 100); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const zw = t > q.at('hart', 2) ? 2 : t > q.at('bloedarmoede', 1) ? 1 : t > q.at('longziekte', 1) ? 0 : -1;
    keten(ctx, 960, 400, 1, q.on('Zuurstof', 1), zw, t, q.on('longen', 1)); tag(ctx, 'film: Gas op reis', 960, 230, C.teal, q.on('Gas', 1), 'center', 26);
    chip(ctx, 'longen: hoesten, piepen', 480, 690, C.teal, q.on('longziekte', 1), 26); chip(ctx, 'bloed: moe en bleek', 880, 690, C.koraal, q.on('bloedarmoede', 1), 26); chip(ctx, 'hart: erger als je plat ligt, dikke enkels', 1400, 690, C.goud, q.on('Plat', 1), 28); regel(ctx, 'de zwakke schakel zoeken', 960, 820, q.on('schakel', 2), C.goud, 36, 'center', 800); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('onderzoekt', 1, 0.6);
    bureau(ctx, 520, 700, 1); persoon(ctx, 'kim', 300, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal', pose: O > 0.5 ? 'wijs' : 'staan' }); persoon(ctx, 'henk', 760, 880, 440, { t, kijk: -1, uit: 'neutraal' });
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; ['sinds wanneer?', 'wanneer erger?', 'hoest u?', 'extra kussens?'].forEach((s2, i) => bubbel(ctx, 1200 + (i % 2) * 360, 260 + Math.floor(i / 2) * 130, s2, '#F2F2EE', q.on(['Sinds', 'Wanneer', 'Hoest', 'kussens'][i], i === 1 ? 2 : 1), 30));
      tag(ctx, 'anamnese', 1380, 560, C.goud, q.on('anamnese', 1), 'center', 34); chip(ctx, "'s nachts benauwd · drie kussens", 1380, 660, C.koraal, q.on('drie', 1), 28); ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; const st = q.on('stethoscoop', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(400, 560); ctx.bezierCurveTo(520, 640, 600, 520, 720, 560); ctx.stroke(); circ(ctx, 724, 560, 14, '#9AA3B2', '#3A3F4E', 3); golf(ctx, 1080, 260, 200, 14, st, { t }); ctx.restore(); } longIcoon(ctx, 1180, 360, 0.9, q.on('stethoscoop', 1), C.teal, q.on('geknisper', 1)); naamBij(ctx, 'zacht geknisper', 'onderin de longen', 1180, 520, q.on('geknisper', 1), 'center');
      enkel(ctx, 1520, 440, 0.9, q.on('enkel', 1), q.on('putje', 1)); naamBij(ctx, 'putje blijft staan', 'vocht in de enkel', 1540, 580, q.on('putje', 1), 'center');
      satMeter(ctx, 1780, 360, q.on('zuurstof', 1), '93%'); vraagteken(ctx, 1500, 760, q.on('denk', 1), 90); ctx.restore(); } },

  // ---------- H3 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const E = q.on('echo', 1, 0.8);
    ddLijst(ctx, 140, 260, 1 - E, [['hartfalen', 0.8, q.on('Bovenaan', 1)], ['longziekte', 0.35, q.on('Daaronder', 1)], ['bloedarmoede', 0.25, q.on('bloedarmoede', 1)]], t > q.at('verhoogd', 1) ? 0 : -1);
    tag(ctx, 'differentiaaldiagnose', 420, 640, C.goud, q.on('differentiaaldiagnose', 1) * (1 - E), 'center', 30);
    buisje(ctx, 900, 420, q.on('bloed', 1) * (1 - E)); tag(ctx, 'hartstof: sterk verhoogd', 1180, 300, C.koraal, q.on('verhoogd', 1) * (1 - E), 'center', 26); buisje(ctx, 1500, 420, q.on('rode', 1) * (1 - E)); tag(ctx, 'rode bloedcellen: normaal', 1500, 580, C.groen, q.on('normaal', 1) * (1 - E), 'center', 26);
    if (E > 0.01) { echoScherm(ctx, 160, 230, 560, 420, E, t, 1); naamBij(ctx, 'echo van het hart', 'knijpt zwak', 440, 700, E, 'center');
      longIcoon(ctx, 1080, 420, 1, q.on('hoopt', 1), C.teal, clamp((t - q.at('lekt', 1)) / 2, 0, 1)); naamBij(ctx, 'vocht in de longen', 'geknisper', 1080, 600, q.on('lekt', 1), 'center');
      nierIcoon(ctx, 1450, 400, 1, q.on('nieren', 1)); naamBij(ctx, 'nieren', 'houden water vast', 1470, 520, q.on('nieren', 1), 'center'); enkel(ctx, 1720, 430, 0.75, q.on('enkels', 1), 1);
      regel(ctx, 'diagnose: hartfalen', 960, 800, q.on('diagnose', 2), C.goud, 48, 'center', 800); } },

  // ---------- H4 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); bureau(ctx, 960, 700, 1); persoon(ctx, 'kim', 720, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'henk', 1200, 880, 440, { t, kijk: -1, uit: q.on('tuin', 1) > 0.5 ? 'blij' : 'neutraal' });
    bubbel(ctx, 560, 300, 'in gewone woorden', '#F2F2EE', q.on('gewone', 1), 28); bubbel(ctx, 1360, 300, 'weer in mijn tuin werken', '#F2F2EE', q.on('tuin', 1), 28);
    card(ctx, 120, 420, 380, 160, 'plastabletten', 'vocht eruit · vaak naar de wc', q.on('Plastabletten', 1), C.teal); card(ctx, 1420, 420, 380, 160, 'én hartmedicijn', 'ontlast het hart', q.on('ontlasten', 1), C.teal); vraagteken(ctx, 960, 240, q.on('denk', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const T = q.on('ochtends', 1, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; tag(ctx, 'samen beslissen', 960, 260, C.goud, q.on('samen', 1), 'center', 38); card(ctx, 360, 360, 480, 170, 'de arts', 'kennis over wat werkt', q.on('kennis', 1), C.teal); card(ctx, 1080, 360, 480, 170, 'de patiënt', 'wat voor hem telt', q.on('telt', 1), C.goud); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; zon(ctx, 260, 260, 50, 1, t); regel(ctx, "'s ochtends tabletten", 260, 380, 1, C.text, 30, 'center', 700); persoon(ctx, 'henk', 900, 880, 440, { t, uit: 'blij', kijk: 1 }); weegschaal(ctx, 900, 880, q.on('weegt', 1)); chip(ctx, 'elke dag wegen · +2 kilo in een paar dagen? bellen', 1400, 520, C.goud, q.on('weegt', 1), 28);
      chip(ctx, "'s middags tuinieren", 1400, 400, C.groen, q.on('tuinieren', 1), 30); ctx.restore(); } },

  // ---------- Recap ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); keten(ctx, 860, 330, 0.8, 1, 2, t, 1); trapje(ctx, 1500, 560, 4, 70, 45, q.on('trap', 1)); persoon(ctx, 'henk', 1640, 560 - 2 * 45, 300, { t, a: q.on('trap', 1, 0.3), uit: 'blij', kijk: -1 }); ['klacht', 'vragen', 'onderzoeken', 'toetsen', 'samen beslissen'].forEach((s2, i) => { tag(ctx, s2, 260 + i * 350, 700, i === 4 ? C.goud : C.teal, q.on(i === 0 ? 'klacht' : s2.split(' ')[0], i === 0 ? 2 : 1), 'center', 30); if (i) pijl(ctx, 260 + (i - 1) * 350 + 130, 688, 260 + i * 350 - 140, 688, C.line, q.on(i === 4 ? 'samen' : s2, 1), 3, 12); }); },
  s12(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'geneeskunde · 6 jaar', 960, 260, C.teal, q.on('Geneeskunde', 1), 'center', 36); tag(ctx, 'huisarts · + 3 jaar', 620, 400, C.goud, q.on('huisarts', 1), 'center', 30); tag(ctx, 'specialist · + 4 tot 6 jaar', 1300, 400, C.goud, q.on('specialist', 1), 'center', 30);
    regel(ctx, 'bv. cardioloog, longarts', 1300, 480, q.on('cardioloog', 1), C.text2, 28, 'center', 600); persoon(ctx, 'kim', 960, 880, 380, { t, outfit: 'gewoon', uit: 'blij' }); }
});
