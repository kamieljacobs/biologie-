
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
// Wat word jij? · Geneeskunde en Farmacie · Welk antibioticum? — eigen tekeningen (20 okt 2026)

const ECOLI = '#E07A5F';            // E. coli (blaasbacterie), overal dezelfde kleur
const WAND = '#C9A35C', WANDR = '#E8CF8E'; // bacteriële celwand
const AB = '#E0B64A';               // antibioticummolecuul
const AGAR = '#B8893E', GAZON = '#E9DDB8';

// antibioticummolecuul: zeshoekje met staartje
function abMol(ctx, x, y, s = 1, a = 1, rot = 0, col = AB) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283; ctx.lineTo(Math.cos(an) * 9 * s, Math.sin(an) * 9 * s); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 2.2 * s);
  ctx.strokeStyle = col; ctx.lineWidth = 2.2 * s; ctx.beginPath(); ctx.moveTo(9 * s, 0); ctx.lineTo(18 * s, -6 * s); ctx.lineTo(26 * s, 0); ctx.stroke(); ctx.restore(); }

// capsulevorm (staafje met ronde uiteinden)
function capsule(ctx, x, y, w, h) { roundRect(ctx, x - w / 2, y - h / 2, w, h, h / 2); }

// staafvormige bacterie, groot en schematisch: celwand (dikke band), celmembraan, cytoplasma, ribosomen, DNA-ring
// o: wand (0..1 nadruk), kapot (0..1 penicilline: gaten, uitstulpen, knappen), ribo (nadruk), riboBlok (0..1), dna (nadruk), dnaBlok (0..1), col (cytoplasma-tint), t
function bacterieGroot(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { kapot = 0, riboBlok = 0, dnaBlok = 0, wand = 0, ribo = 0, dna = 0, t = 0, col = '#33466A' } = o;
  ctx.save(); ctx.globalAlpha *= a * (kapot > 0.85 ? clamp(1 - (kapot - 0.85) / 0.15, 0, 1) : 1); ctx.translate(x, y);
  const k = h / 300, bol = clamp((kapot - 0.35) / 0.5, 0, 1); // uitstulping
  // celwand
  const ww = 22 * k; capsule(ctx, 0, 0, w, h); shape(ctx, rgba(WAND, 0.55 + 0.35 * wand), lighten(WAND, 0.2 + 0.3 * wand), 2 + 2 * wand);
  // gaten in de wand (penicilline)
  const gaten = [[-0.25, -1], [0.18, 1], [0.32, -1]];
  if (kapot > 0.05) gaten.forEach(([fx, side], i) => { const g = clamp(kapot * 2 - i * 0.25, 0, 1); if (g <= 0) return; ctx.save(); ctx.fillStyle = C.bgSchema; const gy = side < 0 ? -h / 2 - 3 : h / 2 - ww - 1; ctx.fillRect(fx * w - 26 * k * g, gy, 52 * k * g, ww + 4); ctx.restore(); });
  // binnenkant: membraan + cytoplasma
  capsule(ctx, 0, 0, w - 2 * ww, h - 2 * ww); shape(ctx, col, '#AFC0D0', 2);
  if (bol > 0.01) { gaten.forEach(([fx, side]) => { ctx.beginPath(); ctx.ellipse(fx * w, side * (h / 2 - ww * 0.4), 30 * k + 40 * k * bol, 14 * k + 46 * k * bol, 0, side > 0 ? 0 : Math.PI, side > 0 ? Math.PI : 2 * Math.PI); shape(ctx, col, '#AFC0D0', 2); }); }
  // rustige textuur
  ctx.save(); capsule(ctx, 0, 0, w - 2 * ww - 6, h - 2 * ww - 6); ctx.clip();
  for (let i = 0; i < 18; i++) { const px = (hash(i * 7 + 1) - 0.5) * (w - 80 * k), py = (hash(i * 7 + 3) - 0.5) * (h - 80 * k); circ(ctx, px, py, 1.6, rgba('#AFC0D0', 0.25)); }
  // DNA-ring: kronkelige gesloten lus
  ctx.strokeStyle = dnaBlok > 0.5 ? rgba(C.kernR, 0.55) : C.kernR; ctx.lineWidth = 3 + 2 * dna; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, r = 1 + 0.16 * Math.sin(an * 7 + 0.6) + 0.08 * Math.sin(an * 13); const px = w * 0.17 * r * Math.cos(an), py = h * 0.22 * r * Math.sin(an); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (dna > 0.01) { ctx.save(); ctx.globalAlpha *= dna * 0.35; ctx.strokeStyle = C.kernR; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  // kopieervork die vastloopt
  if (dnaBlok > 0.01) { const an = -0.9 + (1 - dnaBlok) * 0.6, fx = w * 0.17 * Math.cos(an), fy = h * 0.22 * Math.sin(an); abMol(ctx, fx, fy, 1.3 * k * 2.2, dnaBlok, 0.4); }
  // ribosomen (twee bolletjes: klein ribosoom van de bacterie)
  const R = [[-0.36, -0.2], [-0.3, 0.18], [-0.4, 0.02], [0.33, -0.22], [0.38, 0.12], [0.3, 0.26], [-0.2, 0.3], [0.22, -0.32], [-0.22, -0.34], [0.42, -0.04]];
  R.forEach(([fx, fy], i) => { const px = fx * w, py = fy * h; const c = riboBlok > 0.5 ? '#8A8E96' : C.ribo; circ(ctx, px, py - 6 * k, 7 * k * (1 + 0.25 * ribo), c); circ(ctx, px, py + 6 * k, 9 * k * (1 + 0.25 * ribo), c);
    if (riboBlok > 0.01) abMol(ctx, px + 14 * k * 1.2, py - 12 * k * 1.2, 0.8 * k * 1.2, clamp(riboBlok * 2 - i * 0.08, 0, 1), 0.5);
    else if (o.eiwit) { const u = (t * 0.6 + i * 0.13) % 1; ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j < 6 * u + 1; j++) { const ex = px + 16 * k * 1.2 + j * 7 * k * 1.2, ey = py + Math.sin(j * 1.4) * 6 * k * 1.2; j ? ctx.lineTo(ex, ey) : ctx.moveTo(ex, ey); } ctx.stroke(); } });
  ctx.restore(); ctx.restore();
  // gelekte celinhoud en scherven na het knappen
  if (kapot > 0.85) { ctx.save(); ctx.globalAlpha *= a * 0.55 * clamp((kapot - 0.85) / 0.15, 0, 1); blob(ctx, x, y + 10, w * 0.36, h * 0.3, 0.18, 3, 0); shape(ctx, rgba('#33466A', 0.8), null); ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60; ctx.lineTo(x - w * 0.25 + u * w * 0.5, y + 10 + Math.sin(u * 17) * h * 0.08); } ctx.stroke(); ctx.restore(); }
  if (kapot > 0.8) { ctx.save(); ctx.globalAlpha *= a * clamp((kapot - 0.8) / 0.2, 0, 1); for (let i = 0; i < 9; i++) { const an = i / 9 * 6.283 + 0.3, d = (0.55 + 0.25 * hash(i)) * w * 0.5 * (0.8 + 0.4 * clamp((kapot - 0.8) * 5, 0, 1)); ctx.save(); ctx.translate(x + Math.cos(an) * d, y + Math.sin(an) * d * h / w * 1.4); ctx.rotate(an); roundRect(ctx, -20 * k * 2, -5 * k * 2, 40 * k * 2, 10 * k * 2, 4); shape(ctx, rgba(WAND, 0.6), WAND, 1.5); ctx.restore(); } ctx.restore(); } }

// mensencel: rond, alleen celmembraan, kern, ER met (grotere) ribosomen, mitochondriën
function mensCel(ctx, x, y, r, a = 1, t = 0, nadruk = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.94, 0.03, 2, t); shape(ctx, '#3A3A5E', null); membrane(ctx, x, y, r, r * 0.94, C.er, 0.03, 2, t);
  for (let i = 0; i < 16; i++) { const an = hash(i * 5 + 2) * 6.283, d = Math.sqrt(hash(i * 5 + 4)) * r * 0.8; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 1.6, rgba('#AFC0D0', 0.25)); }
  nucleus(ctx, x - r * 0.12, y - r * 0.05, r * 0.33, 1, t);
  mitochondrion(ctx, x + r * 0.45, y + r * 0.42, r * 0.34, -0.5, 1, 4, t); mitochondrion(ctx, x - r * 0.48, y + r * 0.45, r * 0.3, 0.6, 1, 4, t);
  // ribosomen: groter, met twee bolletjes, op een stukje ER
  ctx.strokeStyle = C.er; ctx.lineWidth = 3; for (let k2 = 0; k2 < 2; k2++) { ctx.beginPath(); ctx.arc(x - r * 0.12, y - r * 0.05, r * (0.45 + k2 * 0.09), -1.2, 0.1); ctx.stroke(); }
  for (let i = 0; i < 7; i++) { const an = -1.15 + i * 0.2, rr = r * 0.6 + 6; const px = x - r * 0.12 + Math.cos(an) * rr, py = y - r * 0.05 + Math.sin(an) * rr; const s2 = 1 + 0.3 * nadruk; circ(ctx, px, py, 9 * s2, C.ribo); circ(ctx, px + Math.cos(an) * 12 * s2, py + Math.sin(an) * 12 * s2, 12 * s2, C.ribo); }
  ctx.restore(); }

// virusdeeltje: twintigvlak (zeshoek), uitsteeksels, erfelijk materiaal binnenin
function virusDeeltje(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(t * 0.15); const r = 60 * s;
  ctx.strokeStyle = '#9FD3B0'; ctx.lineWidth = 4 * s; for (let k = 0; k < 12; k++) { const an = k / 12 * 6.283; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.95, Math.sin(an) * r * 0.95); ctx.lineTo(Math.cos(an) * r * 1.35, Math.sin(an) * r * 1.35); ctx.stroke(); circ(ctx, Math.cos(an) * r * 1.4, Math.sin(an) * r * 1.4, 7 * s, '#9FD3B0'); }
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.3), C.groen, 3 * s);
  ctx.strokeStyle = C.kernR; ctx.lineWidth = 3 * s; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = (u - 0.5) * r * 1.1, py = Math.sin(u * 14) * r * 0.25; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }

// kleine bacterie (staafje) met kleur; dood = grijs en gekreukt
function staafje(ctx, x, y, s = 1, rot = 0, col = ECOLI, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#7A8090' : col; capsule(ctx, 0, 0, 44 * s, 20 * s); shape(ctx, rgba(c, 0.55), lighten(c, 0.15), 2.5 * s); capsule(ctx, 0, 0, 30 * s, 8 * s); shape(ctx, rgba(c, 0.35), null); ctx.restore(); }
function bolletje(ctx, x, y, s = 1, col = C.teal, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); const c = dood > 0.5 ? '#7A8090' : col; circ(ctx, x, y, 12 * s, rgba(c, 0.55), lighten(c, 0.15), 2.5 * s); ctx.restore(); }
function spiraal(ctx, x, y, s = 1, rot = 0, col = C.paars, a = 1, dood = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot); const c = dood > 0.5 ? '#7A8090' : col; ctx.strokeStyle = c; ctx.lineWidth = 8 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = (u - 0.5) * 60 * s, py = Math.sin(u * 12) * 7 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// MRSA: Staphylococcus, trosje bolletjes
function staphTros(ctx, x, y, s = 1, a = 1, col = '#D8A23C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[0, 0], [22, -6], [-20, 8], [6, 20], [-6, -20], [26, 16], [-26, -12], [14, -26]].forEach(([dx, dy]) => circ(ctx, x + dx * s, y + dy * s, 12 * s, rgba(col, 0.6), lighten(col, 0.2), 2.2 * s)); ctx.restore(); }

// urinepotje met dop
function urinePotje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -46, -40, 92, 110, 10); shape(ctx, rgba('#E8EEF2', 0.12), '#C9D6E0', 3); roundRect(ctx, -42, 0, 84, 66, 8); shape(ctx, rgba('#E8C95A', 0.75), null);
  roundRect(ctx, -54, -62, 108, 26, 6); shape(ctx, '#E07A5F', '#B9452F', 2); ctx.restore(); }
// teststrip (dipstick) met vakjes; u 0..1 = verkleuren (nitriet + leukocyten positief)
function testStrip(ctx, x, y, s = 1, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.25); ctx.scale(s, s);
  roundRect(ctx, -14, -150, 28, 300, 4); shape(ctx, '#F2F2EE', '#C9CED6', 1.5); const V = [['#E8D8A0', '#E8D8A0'], ['#F2E6C0', '#C27BA0'], ['#E6E0B0', '#8C6BB0'], ['#D8E4B0', '#D8E4B0'], ['#F0D8A0', '#F0D8A0']];
  V.forEach(([c0, c1], i) => { const k = (i === 1 || i === 2) ? u : 0; ctx.fillStyle = k > 0.5 ? c1 : c0; ctx.fillRect(-10, 40 + i * 20, 20, 14); }); ctx.restore(); }

// doosje antibiotica; kies = gouden rand; naam bovenop
function medDoos(ctx, x, y, w, naam, col, a = 1, kies = 0, sub = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); ctx.lineTo(x - w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2, y - h / 2); ctx.closePath(); shape(ctx, '#D8DCE2', '#AEB6C2', 1.5);
  ctx.beginPath(); ctx.moveTo(x + w / 2, y - h / 2); ctx.lineTo(x + w / 2 + 26, y - h / 2 - 22); ctx.lineTo(x + w / 2 + 26, y + h / 2 - 22); ctx.lineTo(x + w / 2, y + h / 2); ctx.closePath(); shape(ctx, '#B8C0CC', '#AEB6C2', 1.5);
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 4); shape(ctx, '#F2F2EE', kies > 0.5 ? C.goud : '#AEB6C2', kies > 0.5 ? 5 : 1.5); ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h / 2 + h * 0.18, w, h * 0.2);
  ctx.save(); ctx.font = fTekst(Math.round(w * 0.13), 800); ctx.fillStyle = '#1A2740'; ctx.textAlign = 'center'; ctx.fillText(naam, x, y + h * 0.18, w - 16); if (sub) { ctx.font = fTekst(Math.round(w * 0.09), 600); ctx.fillStyle = '#5A6478'; ctx.fillText(sub, x, y + h * 0.36, w - 16); } ctx.restore();
  ctx.restore(); }

// petrischaal (bovenaanzicht). o: kolonies (aantal losse kolonies), groei 0..1, gazon 0..1 (dichte groei),
// schijf: [{dx, dy, code, ring (straal heldere zone in px), a}], ringU 0..1 (zones groeien), hl = index uitgelicht
function petri(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { kolonies = 0, groei = 1, gazon = 0, schijf = [], ringU = 1, hl = -1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r + 14, rgba('#DCE6EE', 0.12), '#C9D6E0', 3); circ(ctx, x, y, r, AGAR, lighten(AGAR, 0.2), 2);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 2, 0, 6.283); ctx.clip();
  if (gazon > 0.01) { ctx.fillStyle = rgba(GAZON, 0.85 * gazon); ctx.fillRect(x - r, y - r, 2 * r, 2 * r); for (let i = 0; i < 160; i++) { const an = hash(i * 3 + 9) * 6.283, d = Math.sqrt(hash(i * 3 + 5)) * r; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 3 + 3 * hash(i), rgba('#F6EED6', 0.6 * gazon)); } }
  for (let i = 0; i < kolonies; i++) { const an = hash(i * 13 + 1) * 6.283, d = Math.sqrt(hash(i * 13 + 2)) * r * 0.88; const g = clamp(groei * 1.4 - hash(i * 13 + 4) * 0.4, 0, 1); if (g <= 0) continue; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, (5 + 9 * hash(i * 13 + 3)) * g, '#EFE3C2', '#D6C69C', 1.5); }
  schijf.forEach((sc, i) => { const zr = sc.ring * clamp(ringU, 0, 1); if (zr > 1) { circ(ctx, x + sc.dx, y + sc.dy, zr, AGAR); ctx.save(); ctx.strokeStyle = rgba(GAZON, 0.7); ctx.lineWidth = 2; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(x + sc.dx, y + sc.dy, zr, 0, 6.283); ctx.stroke(); ctx.restore(); } });
  ctx.restore();
  schijf.forEach((sc, i) => { const sa = sc.a == null ? 1 : sc.a; if (sa <= 0.01) return; ctx.save(); ctx.globalAlpha *= sa; const yy = y + sc.dy - (sc.lift || 0); circ(ctx, x + sc.dx, yy, 24, '#FFFFFF', i === hl ? C.goud : '#C9CED6', i === hl ? 5 : 1.5); text(ctx, sc.code, x + sc.dx, yy + 7, fTekst(18, 800), '#1A2740', 'center'); ctx.restore(); });
  ctx.restore(); }
// pincet (voor het neerleggen van een schijfje), punt op (x, y)
function pincet(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(0.7); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-4, -20); ctx.lineTo(-10, -260); ctx.moveTo(4, -20); ctx.lineTo(10, -260); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-10, -260); ctx.lineTo(10, -260); ctx.stroke(); ctx.restore(); }
// liniaal met mm-streepjes; len in px, 1 mm = mm px
function liniaal(ctx, x, y, len, a = 1, mm = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, len, 46, 4); shape(ctx, rgba('#F2F2EE', 0.85), '#9AA3B2', 1.5); ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 1.5;
  for (let i = 0; i * mm <= len - 4; i++) { const h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8; ctx.beginPath(); ctx.moveTo(x + 2 + i * mm, y); ctx.lineTo(x + 2 + i * mm, y + h); ctx.stroke(); if (i % 10 === 0 && i) text(ctx, String(i), x + 2 + i * mm, y + 40, fTekst(16, 700), '#1A2740', 'center'); } ctx.restore(); }
// broedstoof met venster en temperatuur
function broedstoof(ctx, x, y, a = 1, inhoud = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 300, 360, 16); shape(ctx, '#C9D0DA', '#8A94A2', 2); roundRect(ctx, x + 30, y + 70, 240, 250, 10); shape(ctx, '#2A3446', '#8A94A2', 2);
  roundRect(ctx, x + 90, y + 18, 120, 38, 6); shape(ctx, '#1A2230', null); text(ctx, '37 °C', x + 150, y + 47, fTekst(26, 800), C.groen, 'center');
  for (let k = 0; k < 3; k++) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 40, y + 140 + k * 70, 220, 5); if (inhoud > 0.01) { ctx.save(); ctx.globalAlpha *= inhoud; ctx.beginPath(); ctx.ellipse(x + 110, y + 130 + k * 70, 50, 10, 0, 0, 6.283); shape(ctx, AGAR, '#C9D6E0', 2); ctx.beginPath(); ctx.ellipse(x + 200, y + 130 + k * 70, 50, 10, 0, 0, 6.283); shape(ctx, AGAR, '#C9D6E0', 2); ctx.restore(); } } ctx.restore(); }

// blaas (vooraanzicht) met urine en bacteriën; dood 0..1
function blaas(ctx, x, y, s = 1, a = 1, n = 8, dood = 0, t = 0, groei = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#D9A0A0'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -240); ctx.quadraticCurveTo(-130, -150, -95, -110); ctx.moveTo(150, -240); ctx.quadraticCurveTo(130, -150, 95, -110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, 120); ctx.bezierCurveTo(-170, 100, -190, -60, -110, -120); ctx.bezierCurveTo(-40, -165, 40, -165, 110, -120); ctx.bezierCurveTo(190, -60, 170, 100, 30, 120); ctx.lineTo(18, 190); ctx.lineTo(-18, 190); ctx.closePath(); shape(ctx, '#C97F86', '#E8AAB0', 4);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#E8C95A', 0.45); ctx.fillRect(-200, -60, 400, 260); ctx.restore();
  for (let i = 0; i < n; i++) { const g = clamp(groei * n - i, 0, 1); const px = (hash(i * 5 + 1) - 0.5) * 210 + Math.sin(t + i) * 4, py = -10 + (hash(i * 5 + 2) - 0.3) * 120 + Math.cos(t * 0.8 + i) * 4; staafje(ctx, px, py, 0.9, hash(i) * 3, ECOLI, g, dood); }
  ctx.restore(); }

// darmvenster: rond uitsnede met veel soorten bacteriën. breed 0..1 doodt bijna alles; res = resistente bacterie (index 0) groeit uit (groei 0..1)
const DARMB = (() => { const out = []; for (let i = 0; i < 34; i++) { const an = hash(i * 17 + 3) * 6.283, d = Math.sqrt(hash(i * 17 + 5)) * 0.82; out.push({ x: Math.cos(an) * d, y: Math.sin(an) * d, sort: i % 4, rot: hash(i * 17 + 7) * 3, col: [C.teal, C.groen, C.paars, '#C9A35C'][Math.floor(hash(i * 17 + 9) * 4)] }); } out[0] = { x: 0.12, y: -0.08, sort: 0, rot: 0.4, col: '#D8573F', res: true }; return out; })();
function darmVenster(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { breed = 0, groei = 0, hlRes = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#3A2F3E', '#D9A0A0', 5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 4, 0, 6.283); ctx.clip();
  // darmwand met plooien onderaan
  ctx.fillStyle = '#B9707A'; ctx.beginPath(); ctx.moveTo(x - r, y + r); for (let i = 0; i <= 24; i++) { const u = i / 24; ctx.lineTo(x - r + u * 2 * r, y + r * 0.72 - Math.abs(Math.sin(u * 15)) * r * 0.16); } ctx.lineTo(x + r, y + r); ctx.closePath(); ctx.fill();
  const sc = r / 300;
  DARMB.forEach((b, i) => { const px = x + b.x * r * 0.95 + Math.sin(t * 0.7 + i) * 4, py = y + b.y * r * 0.8 + Math.cos(t * 0.6 + i * 2) * 4; if (b.res) return; const d = clamp(breed * 1.6 - hash(i) * 0.6, 0, 1); const al = 1 - clamp((d - 0.6) * 2.5, 0, 0.85);
    if (b.sort === 0) staafje(ctx, px, py, sc * 1.1, b.rot, b.col, al, d); else if (b.sort === 1) bolletje(ctx, px, py, sc * 1.2, b.col, al, d); else if (b.sort === 2) spiraal(ctx, px, py, sc * 0.9, b.rot, b.col, al, d); else staafje(ctx, px, py, sc * 0.8, b.rot + 1, b.col, al, d); });
  // resistente bacterie + nakomelingen
  const R0 = DARMB[0]; const nKids = Math.floor(groei * 26);
  for (let k = 0; k <= nKids; k++) { const an = k * 2.399, d = k === 0 ? 0 : Math.sqrt(k) * 46 * sc; const px = x + R0.x * r + Math.cos(an) * d, py = y + R0.y * r + Math.sin(an) * d * 0.8; const g = k === nKids && k > 0 ? groei * 26 - nKids : 1; staafje(ctx, px, py, sc * 1.15, an + 0.4, '#D8573F', k ? clamp(g + 0.3, 0, 1) : 1); }
  if (hlRes > 0.01) { ctx.save(); ctx.globalAlpha *= hlRes; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x + R0.x * r, y + R0.y * r, 40 * sc + 20, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore(); }

// staafjes 'gebruik' (schematisch, zonder getallen)
function gebruikStaaf(ctx, x, y, w, frac, col, naam, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 48, 10); shape(ctx, '#2A3446', rgba(C.line, 0.5), 1.5); if (frac > 0.005) { roundRect(ctx, x, y, Math.max(22, w * frac), 48, 10); shape(ctx, rgba(col, 0.7), col, 2); } text(ctx, naam, x - 20, y + 35, fTekst(30, 700), C.text, 'right'); ctx.restore(); }

// spreekkamer: bureau met computerscherm
function bureau(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 24, 6); shape(ctx, '#7A5A3E', '#5A422E', 2); ctx.fillStyle = '#5A422E'; ctx.fillRect(x + 20, y + 24, w - 40, 880 - y - 24); ctx.fillStyle = '#4A3626'; ctx.fillRect(x + 40, y + 60, w - 80, 4);
  roundRect(ctx, x + w - 210, y - 150, 180, 120, 8); shape(ctx, '#20283A', '#6A7080', 3); ctx.fillStyle = '#6A7080'; ctx.fillRect(x + w - 132, y - 30, 24, 30); ctx.restore(); }

// isolatiekamer: deur met raampje en bordje, kar met schorten en handschoenen
function isolatieDeur(ctx, x, y, a = 1, dicht = 1, bord = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 20, 300, 520, 6); shape(ctx, '#2C3A52', rgba(C.line, 0.6), 2);
  // kamer achter de deur: bed
  ctx.fillStyle = '#1E2A3E'; ctx.fillRect(x, y, 260, 480); roundRect(ctx, x + 30, y + 300, 200, 60, 10); shape(ctx, '#DCE6EE', null); roundRect(ctx, x + 40, y + 280, 70, 30, 10); shape(ctx, '#F2F2EE', null); ctx.fillStyle = '#8A94A2'; ctx.fillRect(x + 40, y + 360, 8, 60); ctx.fillRect(x + 210, y + 360, 8, 60);
  const dw = 260 * dicht; ctx.save(); roundRect(ctx, x, y, dw, 480, 4); shape(ctx, '#7FA3C9', '#5B7FA6', 2); if (dicht > 0.6) { roundRect(ctx, x + 70, y + 60, 120, 140, 6); shape(ctx, rgba('#BFE3F0', 0.35), '#5B7FA6', 2); circ(ctx, x + dw - 30, y + 260, 10, '#C9D0DA'); } ctx.restore();
  if (bord > 0.01) { ctx.save(); ctx.globalAlpha *= bord; roundRect(ctx, x + 40, y + 230, 180, 70, 8); shape(ctx, '#F2C94C', '#C9A035', 2); text(ctx, 'ISOLATIE', x + 130, y + 276, fTekst(30, 800), '#1A2740', 'center'); ctx.restore(); }
  ctx.restore(); }
// pompflacon handalcohol met druppels
function flacon(ctx, x, y, a = 1, drup = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40, y - 120, 80, 140, 14); shape(ctx, rgba('#BFE3F0', 0.4), '#9FC6D8', 2); ctx.fillStyle = rgba('#BFE3F0', 0.6); ctx.fillRect(x - 36, y - 60, 72, 76); roundRect(ctx, x - 14, y - 160, 28, 40, 4); shape(ctx, '#F2F2EE', null); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x - 14, y - 166, 60, 12);
  roundRect(ctx, x - 30, y - 40, 60, 30, 4); shape(ctx, '#F2F2EE', null); text(ctx, '70%', x, y - 18, fTekst(18, 800), '#1A2740', 'center');
  if (drup > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i / 3) % 1; circ(ctx, x + 40, y - 150 + ph * 80, 6, rgba('#BFE3F0', drup * (1 - ph))); } ctx.restore(); }
// wattenstaafje + kweekbuisje
function wattenstaaf(ctx, x, y, a = 1, rot = -0.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 240); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -6, 12, 22, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 2); ctx.restore(); }
function kweekBuis(ctx, x, y, a = 1, col = '#E07A5F') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 130, 44, 210, 20); shape(ctx, rgba('#DCE6EE', 0.15), '#C9D6E0', 2.5); roundRect(ctx, x - 26, y - 160, 52, 40, 6); shape(ctx, col, null); ctx.fillStyle = rgba('#C9A35C', 0.6); ctx.fillRect(x - 18, y + 10, 36, 60); ctx.restore(); }
// zaal met bedden (bovenaanzicht, zonder personen)
function bedTop(ctx, x, y, a = 1, besmet = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 110, 120, 220, 12); shape(ctx, '#DCE6EE', '#9AA3B2', 2); roundRect(ctx, x - 44, y - 96, 88, 40, 10); shape(ctx, '#F2F2EE', '#C9CED6', 1.5); roundRect(ctx, x - 56, y - 40, 112, 140, 10); shape(ctx, '#7FA3C9', '#5B7FA6', 1.5);
  if (besmet > 0.01) staphTros(ctx, x + 30, y - 70, 0.8, besmet); ctx.restore(); }

// medicatieoverzicht (apotheek): lijst medicijnen met vinkjes; nieuw = antibioticum onderaan
function medicatieLijst(ctx, x, y, a = 1, u = 1, nieuw = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 460, 330, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); metaText(ctx, 'MEDICATIEOVERZICHT', x + 24, y + 44, '#5A6478', 'left', 22);
  const M = [['bloeddrukverlager', C.teal], ['cholesterolremmer', C.paars], ['maagbeschermer', C.oker]]; M.forEach(([n, c], i) => { const yy = y + 100 + i * 60; roundRect(ctx, x + 24, yy - 22, 40, 26, 13); shape(ctx, c, null); text(ctx, n, x + 84, yy, fTekst(26, 600), '#1A2740', 'left'); vink_(ctx, x + 420, yy - 8, 12, clamp(u * 3 - i, 0, 1)); });
  if (nieuw > 0.01) { ctx.save(); ctx.globalAlpha *= nieuw; const yy = y + 280; roundRect(ctx, x + 14, yy - 40, 432, 56, 10); shape(ctx, rgba(C.goud, 0.25), C.goud, 2); roundRect(ctx, x + 24, yy - 22, 40, 26, 13); shape(ctx, ECOLI, null); text(ctx, 'antibioticum', x + 84, yy, fTekst(26, 800), '#1A2740', 'left'); ctx.restore(); }
  ctx.restore(); }
// nier (boonvorm); werk 0..1: 1 = goed, 0 = slecht (grijzer)
function nier(ctx, x, y, s = 1, a = 1, werk = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const c = werk > 0.5 ? '#B5525A' : '#8A6A70';
  ctx.beginPath(); ctx.moveTo(10, -90); ctx.bezierCurveTo(90, -100, 100, 90, 10, 90); ctx.bezierCurveTo(-40, 90, -20, 30, -30, 0); ctx.bezierCurveTo(-20, -30, -40, -90, 10, -90); ctx.closePath(); shape(ctx, c, lighten(c, 0.25), 3);
  ctx.strokeStyle = '#E8C95A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 10); ctx.quadraticCurveTo(-50, 60, -40, 130); ctx.stroke(); ctx.restore(); }
// bloedspiegel: concentratie in het bloed na een dosis; goed (snel omlaag) en slecht (blijft hoog); u = tekenvoortgang
function bloedSpiegel(ctx, x, y, w, h, a = 1, uGoed = 1, uSlecht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD', 'IN HET BLOED');
  const f = (u, k) => Math.exp(-k * u) * (1 - Math.exp(-14 * u)); const lijn = (k, col, uu) => { if (uu <= 0.01) return; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 80 * uu; i++) { const u = i / 80; const px = x + u * w, py = y + h - f(u, k) * h * 1.05; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
  lijn(4.5, C.groen, uGoed); lijn(1.0, ECOLI, uSlecht); ctx.restore(); }

// tegel voor een beroep: icoon + naam
function beroepTegel(ctx, x, y, naam, sub, col, a = 1, icoon = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 200, y - 150, 400, 300, 18); shape(ctx, rgba(col, 0.12), col, 2.5); if (icoon) icoon(x, y - 30); text(ctx, naam, x, y + 100, fTekst(34, 800), C.text, 'center'); if (sub) metaText(ctx, sub.toUpperCase(), x, y + 134, C.grain, 'center', 20); ctx.restore(); }
// apotheekicoon: vijzel met stamper
function vijzel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -10); ctx.lineTo(60, -80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, -20); ctx.lineTo(70, -20); ctx.quadraticCurveTo(66, 50, 0, 56); ctx.quadraticCurveTo(-66, 50, -70, -20); ctx.closePath(); shape(ctx, '#E8E2D4', '#B8B0A0', 3); ctx.fillStyle = '#B8B0A0'; ctx.fillRect(-36, 56, 72, 12); ctx.restore(); }
// microscoop (lab-icoon)
function microscoopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#C9D0DA'; roundRect(ctx, -60, 50, 120, 20, 6); ctx.fill(); ctx.strokeStyle = '#C9D0DA'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, 50); ctx.quadraticCurveTo(50, -10, 10, -40); ctx.stroke();
  ctx.save(); ctx.translate(-5, -40); ctx.rotate(-0.5); roundRect(ctx, -14, -60, 28, 100, 6); shape(ctx, '#E8E2D4', '#B8B0A0', 2); ctx.restore(); ctx.fillStyle = '#8A94A2'; ctx.fillRect(-40, 10, 70, 8); ctx.restore(); }
// Wat word jij? · Geneeskunde en Farmacie · Welk antibioticum? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Noor als patiënt, Dr. Kim als huisarts in outfit 'gewoon').
// Rode draad: Noor met een blaasontsteking; lab en apotheek zonder personen, alleen hun werk (voedingsbodem, schijfjes, doosjes, medicatie, nieren).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// schijfjes van het antibiogram (zelfde ligging in H2, H2-antwoord, titel en recap): NIT zonder ring, AMX ring te klein
const SCHIJF = [{ dx: -150, dy: -130, code: 'NIT', ring: 0, naam: 'nitrofurantoïne' }, { dx: 150, dy: -120, code: 'FOS', ring: 95, naam: 'fosfomycine' }, { dx: -170, dy: 120, code: 'AMX', ring: 42, naam: 'amoxicilline' },
  { dx: 160, dy: 140, code: 'TMP', ring: 82, naam: 'trimethoprim' }, { dx: 0, dy: 10, code: 'CIP', ring: 105, naam: 'ciprofloxacine' }];
const GRENS = { NIT: 60, FOS: 70, AMX: 56, TMP: 60, CIP: 75 }; // schematisch, in px
function schijven(alpha = 1, lift = null) { return SCHIJF.map((s, i) => Object.assign({}, s, { a: Array.isArray(alpha) ? alpha[i] : alpha, lift: lift ? lift[i] : 0 })); }
// spreekkamer: Dr. Kim achter het bureau links, Noor rechts
function spreekkamer(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  persoon(ctx, 'kim', 330, 880, 560, { t, outfit: 'gewoon', pose: o.poseK || 'staan', kijk: 1, uit: o.uitK || 'neutraal' }); bureau(ctx, 120, 640, 520);
  persoon(ctx, 'noor', 1640, 880, 520, { t, kijk: -1, uit: o.uitN || 'neutraal', pose: o.poseN || 'staan' }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { petri(ctx, 1620, 580, 220, 1, { gazon: 1, schijf: schijven(), ringU: 0.85 + 0.15 * Math.sin(t * 0.6) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('tientallen', 1, 0.8);
    spreekkamer(ctx, t, { uitN: q.on('brandt', 1) > 0.5 && B < 0.5 ? 'verbaasd' : 'neutraal', poseK: q.on('liefst', 1) > 0.5 ? 'denk' : (q.on('test', 1) > 0.5 && B < 0.5 ? 'vasthouden' : 'staan') });
    naamBij(ctx, 'Noor', 'patiënt', 1460, 300, q.on('Noor', 1), 'right'); naamBij(ctx, 'Dr. Kim', 'huisarts', 520, 280, q.on('Kim', 1), 'left');
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      chip(ctx, 'steeds plassen', 1440, 420, C.koraal, q.on('plassen', 1), 28); chip(ctx, 'het brandt', 1440, 490, C.koraal, q.on('brandt', 1), 28);
      urinePotje(ctx, 830, 560, 1.3, q.on('test', 1)); testStrip(ctx, 1010, 520, 1.1, q.on('urine', 1), clamp((t - q.at('urine', 1) - 0.4) / 0.8, 0, 1));
      tag(ctx, 'blaasontsteking', 930, 300, C.goud, q.on('blaasontsteking', 1), 'center', 34);
      for (let i = 0; i < 5; i++) staafje(ctx, 800 + i * 60, 380 + (i % 2) * 22, 1.1, 0.3 * i, ECOLI, q.on('bacterie', 1) * clamp((t - q.at('bacterie', 1)) * 4 - i * 0.6, 0, 1));
      ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const D = q.on('Sommige', 1, 0.8);
      for (let i = 0; i < 18; i++) { const r = Math.floor(i / 6), c = i % 6; medDoos(ctx, 760 + c * 82, 250 + r * 76, 62, '', [C.teal, C.paars, C.groen, C.oker, C.koraal][i % 5], clamp(B * 3 - i * 0.12, 0, 1) * (1 - D * 0.8)); }
      const dozen = [['breed', C.koraal, 'Sommige'], ['smal', C.teal, 'paar'], ['nieuwste', C.paars, 'liefst']];
      dozen.forEach(([n, col, w], i) => { const x = 760 + i * 210; medDoos(ctx, x, 560, 170, n, col, q.on(w, 1)); });
      // wat ze raken: breed bijna alles, smal een paar soorten
      const k1 = q.on('bijna', 1); [C.teal, C.groen, C.paars, '#C9A35C', ECOLI].forEach((c, i) => staafje(ctx, 690 + i * 36, 690, 0.7, 1.57, c, k1, k1 > 0.5 ? 1 : 0));
      const k2 = q.on('paar', 1); [C.teal, C.groen, C.paars, '#C9A35C', ECOLI].forEach((c, i) => staafje(ctx, 900 + i * 36, 690, 0.7, 1.57, c, k2, k2 > 0.5 && i === 4 ? 1 : 0));
      vraagteken(ctx, 1180, 520, q.on('denk', 1), 120); ctx.restore(); } },

  // ---------- H1 · waar een antibioticum aangrijpt ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const P1 = q.on('Penicilline', 1, 0.8), P2 = q.on('Jouw', 1, 0.8), P3 = q.on('virus', 1, 0.8);
    antwoord(ctx, 'Antwoord b', 1 - P1);
    // intro: één grote bacterie met de drie onderdelen
    if (P1 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P1; const A0 = q.on('aangrijpt', 1);
      bacterieGroot(ctx, 900, 480, 900, 380, 1, { wand: q.on('stevige', 1), t });
      naamBij(ctx, 'celwand', 'stevig', 1380, 300, q.on('stevige', 1)); naamBij(ctx, 'ribosomen', '', 1380, 470, A0 * 0.9); naamBij(ctx, 'DNA-ring', '', 1380, 600, A0 * 0.9);
      metaA(ctx, 'BACTERIE · SCHEMATISCH', 450, 250, A0); ctx.restore(); }
    // drie aangrijpingspunten naast elkaar
    if (P1 > 0.01 && P2 < 0.99) { ctx.save(); ctx.globalAlpha *= P1 * (1 - P2); const X = [360, 960, 1560];
      const kap = clamp((t - q.at('verstoort', 1)) / 3.2, 0, 1), rb = q.on('blokkeren', 1, 1.2), db = q.on('kopiëren', 1, 1.2);
      bacterieGroot(ctx, X[0], 420, 480, 220, 1, { wand: 1, kapot: kap, t }); bacterieGroot(ctx, X[1], 420, 480, 220, q.on('blokkeren', 1, 0.4), { ribo: 1, riboBlok: rb, eiwit: rb < 0.3, t }); bacterieGroot(ctx, X[2], 420, 480, 220, q.on('verstoren', 1, 0.4), { dna: 1, dnaBlok: db, t });
      for (let i = 0; i < 6; i++) { const f = clamp((t - q.at('Penicilline', 1)) / 1.4 - i * 0.08, 0, 1); abMol(ctx, X[0] - 200 + i * 80, 290 + (1 - f) * -60 + (i % 2) * 12, 1.2, f * (1 - kap), i); }
      tag(ctx, 'celwand', X[0], 620, WAND, 1, 'center', 32); tag(ctx, 'ribosomen', X[1], 620, C.ribo, q.on('blokkeren', 1), 'center', 32); tag(ctx, 'kopiëren van DNA', X[2], 620, C.kernR, q.on('verstoren', 1), 'center', 32);
      regel(ctx, 'penicilline', X[0], 210, q.on('Penicilline', 1), AB, 32, 'center', 700); regel(ctx, 'de bacterie knapt', X[0], 720, q.on('knapt', 1), C.text, 32, 'center', 700);
      regel(ctx, 'geen eiwitten meer', X[1], 720, q.on('eiwitten', 1), C.text, 32, 'center', 700); regel(ctx, 'geen kopie', X[2], 720, q.on('kopiëren', 1), C.text, 32, 'center', 700);
      tag(ctx, 'film: Van DNA naar eiwit', X[1], 820, C.teal, q.on('eiwitten', 1), 'center', 26); ctx.restore(); }
    // bacterie tegenover mensencel
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2 * (1 - P3);
      bacterieGroot(ctx, 520, 430, 620, 280, 1, { wand: 1, ribo: q.on('anders', 1), t }); mensCel(ctx, 1380, 440, 250, 1, t, q.on('anders', 1));
      naamBij(ctx, 'bacterie', 'celwand · kleine ribosomen', 520, 650, 1, 'center'); naamBij(ctx, 'jouw cel', 'geen celwand · grotere ribosomen', 1380, 760, q.on('Jouw', 1), 'center');
      vink_(ctx, 1680, 230, 34, q.on('rust', 1)); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; virusDeeltje(ctx, 960, 450, 1.7, 1, t); naamBij(ctx, 'virus', 'geen celwand · geen ribosomen', 960, 690, 1, 'center');
      const G = q.on('griep', 1); for (let i = 0; i < 3; i++) abMol(ctx, 700 + i * 30, 300 + i * 40, 1.5, G, i); kruis(ctx, 760, 350, 50, G); tag(ctx, 'antibioticum helpt niet tegen griep', 960, 820, C.koraal, G, 'center', 30); ctx.restore(); } },

  // ---------- H2 · kweek en antibiogram ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('lab', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L;
      blaas(ctx, 420, 470, 1.15, 1, 9, 0, t); naamBij(ctx, 'E. coli', 'uit je eigen darm', 420, 760, q.on('coli', 1), 'center', ECOLI); metaA(ctx, 'BLAASONTSTEKING · MEESTAL DEZELFDE BACTERIE', 120, 180, 1);
      medDoos(ctx, 960, 470, 220, 'smal', C.teal, q.on('kiezen', 1), q.on('kiezen', 1), 'eerste keus'); tag(ctx, 'nog zonder uitslag', 960, 660, C.text2, q.on('uitslag', 1), 'center', 28);
      const N = q.on('Noor', 1, 0.3); persoon(ctx, 'noor', 1560, 880, 520, { t, a: N, kijk: -1, uit: 'neutraal', pose: 'schouders' });
      [0, 1, 2].forEach(d => { const f = clamp((t - q.at('drie', 1)) * 3 - d, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, 1170 + d * 70, 330, 60, 70, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; ctx.fillRect(1170 + d * 70, 330, 60, 16); text(ctx, String(d + 1), 1200 + d * 70, 386, fTekst(30, 800), '#1A2740', 'center'); ctx.restore(); });
      tag(ctx, 'gaat niet over', 1270, 460, C.koraal, q.on('over', 1), 'center', 28); urinePotje(ctx, 1080, 760, 0.9, q.on('urine', 1) * clamp(1 - (t - q.at('lab', 1) + 0.6) * 1.5, 0, 1)); ctx.restore(); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; metaA(ctx, 'MEDISCH-MICROBIOLOGISCH LAB', 120, 160, 1);
      const G = q.on('groeit', 1, 2), S = q.at('schijfjes', 1), R = q.on('Waar', 1, 2.4), Rd = q.on('Rond', 1);
      broedstoof(ctx, 1460, 220, q.on('groeit', 1) * (1 - q.on('analist', 1)), 1); tag(ctx, 'een nacht bij 37 °C', 1610, 640, C.text2, q.on('voedingsbodem', 1) * (1 - q.on('analist', 1)), 'center', 26);
      const al = SCHIJF.map((_, i) => clamp((t - S) * 1.6 - i * 0.55, 0, 1)), lift = al.map(f => (1 - f) * 120);
      petri(ctx, 780, 470, 330, 1, { kolonies: R > 0.01 ? 0 : 26, groei: G, gazon: R, schijf: schijven(al, lift), ringU: R, hl: Rd > 0.5 ? 0 : -1 });
      naamBij(ctx, 'voedingsbodem', 'met bacteriën uit de urine', 780, 860, q.on('voedingsbodem', 1) * (1 - q.on('schijfjes', 1)), 'center');
      const cur = al.findIndex(f => f < 1); if (cur >= 0 && al[cur] > 0) { const s = SCHIJF[cur]; pincet(ctx, 780 + s.dx, 470 + s.dy - lift[cur], 1); }
      naamBij(ctx, 'schijfjes', 'elk een ander antibioticum', 1180, 330, q.on('ander', 1)); naamBij(ctx, 'heldere ring', 'hier groeit niets', 1180, 560, q.on('groeien', 1));
      if (Rd > 0.01) { tag(ctx, 'geen ring', 1260, 760, C.goud, Rd, 'center', 30); } vraagteken(ctx, 1640, 520, q.on('denk', 1), 120); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const Gr = q.on('grens', 1, 0.8), Ab = q.on('antibiogram', 1, 0.8);
    const X = 700, Y = 480; petri(ctx, X, Y, 330, 1, { gazon: 1, schijf: schijven(), hl: Gr > 0.5 ? 1 : 0 });
    // inzoomen op het schijfje zonder ring: bacteriën tot tegen het schijfje
    if (Gr < 0.99) { ctx.save(); ctx.globalAlpha *= q.on('groeien', 1) * (1 - q.on('Per', 1, 0.6)); circ(ctx, 1420, 420, 200, AGAR, C.goud, 3); ctx.save(); ctx.beginPath(); ctx.arc(1420, 420, 196, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba(GAZON, 0.85); ctx.fillRect(1220, 220, 400, 400);
      for (let i = 0; i < 40; i++) { const an = hash(i * 3 + 1) * 6.283, d = 70 + hash(i * 3 + 2) * 130; staafje(ctx, 1420 + Math.cos(an) * d, 420 + Math.sin(an) * d, 0.8, an, ECOLI, 1); }
      circ(ctx, 1420, 420, 60, '#FFFFFF', '#C9CED6', 2); text(ctx, 'NIT', 1420, 434, fTekst(36, 800), '#1A2740', 'center'); ctx.restore();
      ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X - 150 + 30, Y - 130 - 20); ctx.lineTo(1250, 330); ctx.stroke(); ctx.setLineDash([]);
      tag(ctx, 'werkt niet bij Noor', 1420, 700, C.koraal, q.on('Noor', 1), 'center', 30); ctx.restore(); }
    // grens per middel: liniaal over de ring van FOS
    if (Gr > 0.01 && Ab < 0.99) { ctx.save(); ctx.globalAlpha *= Gr * (1 - Ab); const s = SCHIJF[1], cx = X + s.dx, cy = Y + s.dy;
      liniaal(ctx, cx - s.ring, cy + 30, 2 * s.ring + 8, q.on('heldere', 1), 2 * s.ring / 26);
      ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(cx, cy, GRENS.FOS, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'grens', 'per middel anders', 1180, 300, 1); naamBij(ctx, 'ring groot genoeg', 'gevoelig', 1180, 420, q.on('genoeg', 1), 'left', C.groen); ctx.restore(); }
    // antibiogram: tabel
    if (Ab > 0.01) { ctx.save(); ctx.globalAlpha *= Ab; const tx = 1180, ty = 230; roundRect(ctx, tx, ty, 600, 470, 16); shape(ctx, '#F2EEE4', '#B8B0A0', 2); metaText(ctx, 'ANTIBIOGRAM · E. COLI', tx + 30, ty + 50, '#5A6478', 'left', 24);
      SCHIJF.forEach((s, i) => { const ok = s.ring >= GRENS[s.code], yy = ty + 120 + i * 72, f = clamp((t - q.at('antibiogram', 1)) * 2.5 - i * 0.5, 0, 1); ctx.save(); ctx.globalAlpha *= f; text(ctx, s.naam, tx + 30, yy, fTekst(30, 700), '#1A2740', 'left'); roundRect(ctx, tx + 440, yy - 34, 130, 46, 10); shape(ctx, rgba(ok ? C.groen : C.koraal, 0.35), ok ? '#3E8A55' : '#B9452F', 2); text(ctx, ok ? 'gevoelig' : 'resistent', tx + 505, yy - 3, fTekst(22, 800), '#1A2740', 'center'); ctx.restore(); });
      tag(ctx, 'de arts kan gericht kiezen', 960, 850, C.goud, q.on('gericht', 1), 'center', 30); ctx.restore(); } },

  // ---------- H3 · smal of breed ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Daarom', 1, 0.8), NL = q.on('Nederland', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; const Br = q.on('breed', 2, 2), Gw = clamp((t - q.at('ruimte', 1) + 0.6) / 4, 0, 1);
      medDoos(ctx, 1100, 270, 180, 'breed', C.koraal, q.on('breedste', 1)); darmVenster(ctx, 560, 470, 330, 1, { breed: Br, groei: Gw, hlRes: q.on('toevallig', 1) * (1 - Gw), t });
      naamBij(ctx, 'darm', 'veel soorten bacteriën', 560, 860, q.on('darm', 1) * 0.95, 'center');
      for (let i = 0; i < 6; i++) { const f = clamp(Br * 1.5 - i * 0.1, 0, 1); abMol(ctx, 900 - f * 240 + i * 14, 300 + i * 50 + f * 40, 1.3, f * (1 - Br * 0.6), i); }
      naamBij(ctx, 'toevallig resistent', 'blijft over', 1120, 470, q.on('toevallig', 1), 'left', '#F08A70'); tag(ctx, 'krijgt alle ruimte', 1250, 590, '#D8573F', q.on('ruimte', 1), 'center', 28);
      tag(ctx, 'film: Selectie van dichtbij', 1250, 680, C.teal, q.on('Selectie', 1), 'center', 26);
      const J = q.on('jij', 1, 0.4); persoon(ctx, 'noor', 1680, 880, 420, { t, a: J, kijk: -1, uit: 'neutraal' }); kruis(ctx, 1680, 420, 30, J); regel(ctx, 'Noor: niet resistent', 1680, 360, J, C.text, 32, 'center', 700);
      vink_(ctx, 1250, 780, 22, q.on('bacteriën', 2)); regel(ctx, 'de bacteriën wel', 1285, 790, q.on('bacteriën', 2), C.text, 28, 'left', 700); ctx.restore(); }
    if (D > 0.01 && NL < 0.99) { ctx.save(); ctx.globalAlpha *= D * (1 - NL); const T = q.on('terechtkomt', 1, 1.5);
      medDoos(ctx, 960, 270, 180, 'smal', C.teal, 1, 1); darmVenster(ctx, 440, 520, 250, 1, { t }); naamBij(ctx, 'darm', 'blijft gespaard', 440, 840, T, 'center'); vink_(ctx, 640, 330, 26, T);
      blaas(ctx, 1380, 520, 1.0, 1, 9, T, t); naamBij(ctx, 'blaas', 'hier komt het middel', 1380, 800, q.on('blaasontsteking', 1), 'center');
      for (let i = 0; i < 6; i++) { const f = clamp(T * 1.5 - i * 0.1, 0, 1); abMol(ctx, 1080 + f * 230 + (i % 3) * 30, 320 + f * 120 + i * 20, 1.2, f * (1 - T * 0.5), i, C.teal); }
      const K = q.on('kort', 1); klokje(ctx, 960, 560, 60, 0.18, K); regel(ctx, 'zo kort als het kan', 960, 680, K, C.text, 30, 'center', 700); ctx.restore(); }
    if (NL > 0.01) { ctx.save(); ctx.globalAlpha *= NL; metaA(ctx, 'SCHEMATISCH · ZONDER GETALLEN', 360, 200, 1);
      regel(ctx, 'antibioticagebruik', 360, 290, 1, C.text, 34, 'left', 700); gebruikStaaf(ctx, 560, 330, 1000, 0.42 * q.on('weinig', 1, 1.2), C.teal, 'Nederland', 1); gebruikStaaf(ctx, 560, 410, 1000, 0.85 * q.on('weinig', 1, 1.2), C.oker, 'veel andere landen', 1);
      const Z = q.on('zeldzamer', 1, 1.2); regel(ctx, 'resistentie', 360, 560, q.on('resistentie', 1), C.text, 34, 'left', 700); gebruikStaaf(ctx, 560, 600, 1000, 0.18 * Z, C.teal, 'Nederland', q.on('resistentie', 1)); gebruikStaaf(ctx, 560, 680, 1000, 0.6 * Z, C.oker, 'veel andere landen', q.on('resistentie', 1));
      ctx.restore(); } },

  // ---------- H4 · als bijna niets meer werkt ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('MRSA', 1), Bu = q.on('buitenlands', 1, 0.8);
    metaA(ctx, 'ZIEKENHUIS', 120, 160, 1);
    if (Bu < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - Bu; for (let i = 0; i < 4; i++) bedTop(ctx, 360 + i * 200, 690, 1); for (let i = 0; i < 4; i++) medDoos(ctx, 360 + i * 200, 380, 150, '', [C.teal, C.paars, C.groen, C.oker][i], q.on('gewone', 1)); for (let i = 0; i < 4; i++) kruis(ctx, 360 + i * 200, 370, 34, q.on('werken', 1) * clamp((t - q.at('werken', 1)) * 3 - i * 0.4, 0, 1));
      staphTros(ctx, 1380, 430, 3.2, M); naamBij(ctx, 'MRSA', 'Staphylococcus aureus · resistent', 1380, 680, M, 'center'); ctx.restore(); }
    if (Bu > 0.01) { ctx.save(); ctx.globalAlpha *= Bu; const Ap = q.on('apart', 1, 1.2), W = q.on('wattenstaafje', 1);
      tag(ctx, 'uit een buitenlands ziekenhuis', 480, 260, C.oker, 1, 'center', 30);
      isolatieDeur(ctx, 340, 340, 1, Ap, q.on('apart', 1)); naamBij(ctx, 'apart verplegen', 'eigen kamer', 700, 520, q.on('verpleegd', 1));
      wattenstaaf(ctx, 1160, 360, W, -0.35); kweekBuis(ctx, 1420, 520, W); naamBij(ctx, 'neus en keel', 'kweek in het lab', 1300, 760, q.on('neus', 1), 'center');
      staphTros(ctx, 1600, 330, 1.4, q.on('draagt', 1)); regel(ctx, '?', 1660, 300, q.on('draagt', 1), C.goud, 50, 'center', 800);
      vraagteken(ctx, 1700, 620, q.on('denk', 1), 110); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); const S0 = q.on('Arts', 1, 0.5), S = clamp((t - q.at('Arts', 1) - 0.5) / 0.6, 0, 1), Ap = q.on('controleert', 1, 0.8);
    if (S0 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S0; antwoord(ctx, 'Antwoord a'); const Da = q.on('Daarom', 1, 0.8), Hb = q.on('handen', 1);
      isolatieDeur(ctx, 240, 300, 1, Da, Da); tag(ctx, 'vaak niet eens ziek', 370, 260, C.text2, q.on('ziek', 1), 'center', 28); staphTros(ctx, 370, 560, 1.2, q.on('draagt', 1) * (1 - Da));
      const B = [[900, 380], [1150, 380], [1400, 380], [1650, 380]]; B.forEach(([bx, by], i) => bedTop(ctx, bx, by + 100, 1, q.on('besmetten', 1) * (1 - Da) * clamp((t - q.at('besmetten', 1)) * 2 - i * 0.4, 0, 1)));
      // pad via handen en materialen
      if (Hb > 0.01) { const u = clamp((t - q.at('handen', 1)) / 3, 0, 1) * (1 - Da); for (let k = 0; k < 10; k++) { const f = clamp(u * 1.4 - k * 0.04, 0, 1); if (f <= 0) continue; const px = 500 + f * 1150, py = 300 + Math.sin(f * 9 + k) * 30; circ(ctx, px - k * 14, py, 9, rgba('#D8A23C', 0.85 * (1 - Da))); } }
      tag(ctx, 'via handen en materialen', 1270, 260, '#D8A23C', Hb * (1 - Da), 'center', 28);
      flacon(ctx, 760, 760, q.on('ontsmetten', 1), 1, t); regel(ctx, 'handen ontsmetten', 840, 760, q.on('ontsmetten', 1), C.text, 30, 'left', 700); kweekBuis(ctx, 1240, 760, q.on('testen', 1)); regel(ctx, 'testen', 1290, 760, q.on('testen', 1), C.text, 30, 'left', 700); regel(ctx, 'apart verplegen', 370, 860, Da, C.text, 30, 'center', 700);
      ctx.restore(); }
    if (S > 0.01 && Ap < 0.99) { ctx.save(); ctx.globalAlpha *= S * (1 - Ap);
      beroepTegel(ctx, 440, 450, 'arts', 'behandelt', C.teal, q.on('Arts', 1), (x, y) => persoon(ctx, 'kim', x, y + 80, 220, { t, outfit: 'gewoon', uit: 'blij' }));
      beroepTegel(ctx, 960, 450, 'apotheker', 'controleert het middel', C.goud, q.on('apotheker', 1), (x, y) => vijzel(ctx, x, y, 1));
      beroepTegel(ctx, 1480, 450, 'microbioloog', 'kweek en antibiogram', ECOLI, q.on('microbioloog', 1), (x, y) => petri(ctx, x, y, 80, 1, { gazon: 1, schijf: [{ dx: -30, dy: -20, code: '', ring: 26 }, { dx: 30, dy: 25, code: '', ring: 0 }] }));
      regel(ctx, 'samen', 960, 720, q.on('samen', 1), C.goud, 40, 'center', 800); ctx.restore(); }
    if (Ap > 0.01) { ctx.save(); ctx.globalAlpha *= Ap; metaA(ctx, 'APOTHEEK', 120, 160, 1); vijzel(ctx, 1760, 200, 0.7, 1);
      medicatieLijst(ctx, 160, 260, 1, q.on('medicijnen', 1, 1.5), 1); naamBij(ctx, 'past het bij', 'andere medicijnen?', 160, 650, q.on('medicijnen', 1));
      const Ni = q.on('nieren', 1), Sl = q.on('slecht', 1, 0.6); nier(ctx, 860, 430, 1.1, Ni, Sl > 0.5 ? 0 : 1); naamBij(ctx, Sl > 0.5 ? 'nieren werken slecht' : 'nieren', '', 860, 650, Ni, 'center');
      bloedSpiegel(ctx, 1160, 300, 600, 340, Ni, clamp((t - q.at('nieren', 1)) / 1.5, 0, 1), clamp((t - q.at('langer', 1) + 0.6) / 2, 0, 1));
      naamBij(ctx, 'goede nieren', '', 1360, 720, Ni, 'left', C.groen); naamBij(ctx, 'slechte nieren', 'langer in het bloed', 1360, 800, q.on('langer', 1), 'left', '#F08A70'); ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const W2 = q.on('werkte', 1);
    persoon(ctx, 'noor', 1620, 880, 540, { t, kijk: -1, uit: W2 > 0.5 ? 'lacht' : 'neutraal', pose: W2 > 0.5 ? 'handenHeup' : 'staan' }); naamBij(ctx, 'Noor', W2 > 0.5 ? 'weer fit' : '', 1440, 330, q.on('Noor', 1), 'right');
    medDoos(ctx, 300, 330, 190, 'NIT', C.teal, q.on('eerste', 1)); kruis(ctx, 300, 320, 40, q.on('hielp', 1));
    petri(ctx, 650, 560, 190, q.on('antibiogram', 1), { gazon: 1, schijf: schijven(), hl: q.on('ander', 1) > 0.5 ? 1 : -1 });
    medDoos(ctx, 1030, 330, 190, 'FOS', C.teal, q.on('ander', 1), q.on('ander', 1)); tag(ctx, 'smal en kort', 1030, 500, C.teal, q.on('smal', 1), 'center', 28); vink_(ctx, 1030, 580, 30, W2);
    chip(ctx, 'darmbacteriën gespaard', 1030, 820, C.groen, q.on('spaar', 1), 26); },
  s13(ctx, t, q) { bg(ctx, 'schema');
    beroepTegel(ctx, 400, 430, 'geneeskunde', 'arts · 6 jaar', C.teal, q.on('geneeskunde', 1), (x, y) => persoon(ctx, 'kim', x, y + 80, 220, { t, outfit: 'gewoon', uit: 'blij' }));
    beroepTegel(ctx, 960, 430, 'farmacie', 'apotheker · 6 jaar', C.goud, q.on('farmacie', 1), (x, y) => vijzel(ctx, x, y, 1));
    beroepTegel(ctx, 1520, 430, 'analist', 'mbo of hbo', ECOLI, q.on('analisten', 1), (x, y) => microscoopje(ctx, x, y, 1));
    regel(ctx, 'ook in een medisch lab: analist', 1520, 680, q.on('lab', 1), C.text2, 28, 'center', 600); }
});
