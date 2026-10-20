
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
// Wat word jij? · Geneeskunde 4 · Wat de patholoog ziet — eigen tekeningen (20 okt 2026)

// kleur mengen (hex → hex, f 0..1)
function mixC(a, b, f) { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); const c = s => Math.round(((p >> s) & 255) * (1 - f) + ((q >> s) & 255) * f); return `rgb(${c(16)},${c(8)},${c(0)})`; }
// HE-kleuren: kernen blauwpaars (hematoxyline), de rest roze (eosine); ongekleurd = bijna doorzichtig
const HE = { glas: '#F3EEF1', grijs: '#E4E0E5', grijsR: '#D6D1D8', roze: '#EDB0C6', rozeR: '#D98AA8', rozeL: '#F6CFDC', vezel: '#E096B2', hoorn: '#E58FB0', paars: '#55398C', paarsD: '#3B2470', pigment: '#8A5A3A', bloed: '#C8324A' };

// vrije vorm rond een punt (moedervlek, kern): straal varieert met grillig 0..1
function grilVorm(ctx, x, y, r, gr, seed = 0) { ctx.beginPath(); for (let k = 0; k <= 48; k++) { const an = k / 48 * 6.283; const rr = r * (1 + gr * (0.2 * Math.sin(3 * an + seed) + 0.12 * Math.sin(7 * an + seed * 2.3) + 0.06 * Math.sin(11 * an + seed))); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.9; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); }

// moedervlek: u 0 = vroeger (klein, rond, één kleur) → 1 = nu (groter, grillige rand, twee kleuren)
function moedervlek(ctx, x, y, r, u = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = r * (1 + 0.8 * u);
  grilVorm(ctx, x, y, R, u, 1.3); shape(ctx, mixC('#7A4A2E', '#8E5A36', u), mixC('#6A3E26', '#5A3420', u), 2);
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; grilVorm(ctx, x + R * 0.22, y + R * 0.08, R * 0.52, 0.8, 4.1); shape(ctx, '#2E1C14', null); ctx.restore(); }
  ctx.restore(); }

// close-up van een onderarm met moedervlek (paneel); u = verandering
function armPaneel(ctx, x, y, w, h, a = 1, u = 0, titel = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba(C.fill, 0.55), C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
  const ay = y + h * 0.55; ctx.beginPath(); ctx.moveTo(x - 10, ay - h * 0.3); ctx.quadraticCurveTo(x + w * 0.5, ay - h * 0.36, x + w + 10, ay - h * 0.24); ctx.lineTo(x + w + 10, ay + h * 0.26); ctx.quadraticCurveTo(x + w * 0.5, ay + h * 0.34, x - 10, ay + h * 0.3); ctx.closePath(); shape(ctx, '#C8956E', '#A87650', 2);
  ctx.beginPath(); ctx.moveTo(x - 10, ay + h * 0.12); ctx.quadraticCurveTo(x + w * 0.5, ay + h * 0.2, x + w + 10, ay + h * 0.12); ctx.strokeStyle = rgba('#A87650', 0.5); ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#3E8E7E'; ctx.beginPath(); ctx.moveTo(x - 10, ay - h * 0.36); ctx.lineTo(x + w * 0.14, ay - h * 0.36); ctx.quadraticCurveTo(x + w * 0.18, ay, x + w * 0.14, ay + h * 0.36); ctx.lineTo(x - 10, ay + h * 0.36); ctx.closePath(); ctx.fill();
  moedervlek(ctx, x + w * 0.56, ay - h * 0.04, h * 0.075, u); ctx.restore();
  if (titel) metaText(ctx, titel, x + 24, y + 42, C.grain, 'left', 24); ctx.restore(); }

// potje met formaline en een stukje huid
function potje(ctx, x, y, s = 1, a = 1, t = 0, stukje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -110, 140, 190, 22); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); roundRect(ctx, -70, -110, 140, 190, 22); ctx.clip(); ctx.fillStyle = rgba('#DDEFF0', 0.22); ctx.fillRect(-70, -70 + Math.sin(t * 1.5) * 2, 140, 160); ctx.restore();
  roundRect(ctx, -78, -140, 156, 38, 10); shape(ctx, '#F2F2EE', '#C9CED6', 2);
  roundRect(ctx, -52, -30, 104, 54, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.fillStyle = '#5A6478'; ctx.fillRect(-38, -16, 76, 5); ctx.fillRect(-38, -2, 54, 5);
  if (stukje > 0.01) { ctx.save(); ctx.globalAlpha *= stukje; const dy = 44 + Math.sin(t * 1.2) * 4; ctx.beginPath(); ctx.ellipse(0, dy, 34, 12, 0.08, 0, 6.283); shape(ctx, '#D9A78C', '#B5806A', 2); ctx.fillStyle = '#E8C2AE'; ctx.beginPath(); ctx.ellipse(0, dy - 4, 30, 6, 0.08, 0, 6.283); ctx.fill(); grilVorm(ctx, 2, dy - 4, 7, 0.8, 2); shape(ctx, '#5A3420', null); ctx.restore(); }
  ctx.restore(); }

// cassette met paraffineblokje en het weefsel erin
function paraffineBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -100, -20, 200, 90, 8); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.fillStyle = rgba('#1A2740', 0.35); for (let i = 0; i < 7; i++) ctx.fillRect(-84 + i * 24, 6, 12, 50);
  ctx.beginPath(); ctx.moveTo(-80, -20); ctx.lineTo(-70, -110); ctx.lineTo(70, -110); ctx.lineTo(80, -20); ctx.closePath(); shape(ctx, '#EFE6CC', '#CDBF98', 2.5);
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(-60, -100, 20, 70);
  ctx.beginPath(); ctx.ellipse(4, -64, 40, 14, 0, 0, 6.283); shape(ctx, '#D9A08C', '#B5806A', 1.5); grilVorm(ctx, 8, -66, 6, 0.8, 2); shape(ctx, '#5A3420', null);
  ctx.restore(); }

// snijmachine (microtoom): blok gaat op en neer langs het mes, lint van plakjes groeit (u)
function microtoom(ctx, x, y, s = 1, a = 1, t = 0, u = 0, draai = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -20, 340, 40, 10); shape(ctx, '#D8DEE6', '#8FA0B5', 2);
  roundRect(ctx, -40, -200, 170, 180, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2);
  const fase = draai ? (t * 1.4) % 1 : 0, by = -150 + Math.sin(fase * 6.283) * 26;
  roundRect(ctx, -20, by - 30, 50, 60, 6); shape(ctx, '#EFE6CC', '#CDBF98', 2); ctx.fillStyle = '#D9A08C'; ctx.fillRect(-20, by - 10, 10, 20);
  ctx.beginPath(); ctx.moveTo(-26, -136); ctx.lineTo(-90, -122); ctx.lineTo(-90, -108); ctx.lineTo(-26, -112); ctx.closePath(); shape(ctx, '#EEF2F6', '#7A8BA8', 2);
  ctx.save(); ctx.translate(150, -110); circ(ctx, 0, 0, 56, null, '#8FA0B5', 6); const an = fase * 6.283; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56); ctx.stroke(); circ(ctx, Math.cos(an) * 56, Math.sin(an) * 56, 9, '#2A3446'); ctx.restore();
  if (u > 0.01) { const n = Math.round(u * 6); for (let i = 0; i < n; i++) { const sx = -100 - i * 40, sy = -112 + i * 3; ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.05); roundRect(ctx, -18, -4, 36, 22, 3); shape(ctx, rgba('#F4EEDC', 0.85), '#CDBF98', 1.2); ctx.fillStyle = rgba('#D9A08C', 0.8); ctx.fillRect(-12, 2, 10, 10); ctx.restore(); } }
  ctx.restore(); }

// glaasje met coupe; k 0 = ongekleurd (bijna doorzichtig) → 1 = HE (roze met blauwpaarse rand)
function glaasje(ctx, x, y, s = 1, a = 1, k = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -45, 300, 90, 6); shape(ctx, rgba('#DCEBF4', 0.28), '#AFC0D0', 2.5); ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(-146, -41, 70, 82);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-136, -20, 50, 5); ctx.fillRect(-136, -6, 40, 5);
  ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); shape(ctx, mixC('#E4E0E5', HE.roze, k), rgba('#B9B4BC', 0.6 * (1 - k)), 1.5); ctx.globalAlpha *= 0.25 + 0.75 * k;
  if (k > 0.01) { ctx.save(); ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); ctx.clip(); ctx.strokeStyle = mixC('#E4E0E5', HE.paars, k); ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(40, 6, 70, 26, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// kleurbak met vloeistof
function kleurBak(ctx, x, y, s = 1, a = 1, col = HE.paars, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill();
  ctx.save(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-100, -60); for (let i = 0; i <= 20; i++) ctx.lineTo(-100 + i * 10, -60 + Math.sin(t * 2 + i * 0.6) * 3); ctx.lineTo(100, 70); ctx.lineTo(-100, 70); ctx.closePath(); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); ctx.stroke();
  ctx.restore(); }

// microscoop met twee oculairen; kant = -1: oculairen naar links (gebruiker links)
function labMicroscoop(ctx, x, y, s = 1, a = 1, kant = -1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * -kant, s);
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446';
  roundRect(ctx, -110, -34, 220, 34, 10); shape(ctx, body, rand, 2.5); if (licht > 0.01) circ(ctx, -20, -40, 14, rgba('#FFF4C8', 0.9 * licht));
  ctx.beginPath(); ctx.moveTo(40, -34); ctx.lineTo(70, -34); ctx.lineTo(70, -250); ctx.quadraticCurveTo(70, -300, 20, -300); ctx.lineTo(-10, -300); ctx.lineTo(-10, -262); ctx.lineTo(30, -262); ctx.lineTo(40, -250); ctx.closePath(); shape(ctx, body, rand, 2.5);
  roundRect(ctx, -100, -128, 160, 14, 4); shape(ctx, donker, rand, 2); roundRect(ctx, -40, -116, 30, 16, 3); shape(ctx, body, rand, 1.5);
  roundRect(ctx, -66, -134, 80, 6, 2); shape(ctx, rgba('#DCEBF4', 0.8), null);
  ctx.fillStyle = '#5A6478'; [-44, -22].forEach((ox, i) => { roundRect(ctx, ox - 8, -230, 16, 46 + i * 12, 4); ctx.fill(); });
  roundRect(ctx, -60, -262, 100, 40, 10); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(-40, -262); ctx.rotate(-0.6); roundRect(ctx, -14, -80, 28, 80, 6); shape(ctx, donker, rand, 2); roundRect(ctx, 16, -76, 26, 76, 6); shape(ctx, donker, rand, 2); ctx.restore();
  circ(ctx, 56, -90, 18, body, rand, 2.5); circ(ctx, 56, -90, 8, rand);
  ctx.restore(); }

// labtafel
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// schematische doorsnede van de huid (H1). o: hl ('dek'|'bind'|'spier'|'zenuw'|'pig'), nest 0..1 (moedervlek), mel 0..1 (melanoom), kap 0..1 (pigment boven de kernen)
function huidSchema(ctx, x, y, w, h, t, o = {}) { const { a = 1, hl = null, nest = 0, mel = 0, kap = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const yS = y + 34;
  const eB = xx => y + h * 0.34 + Math.sin((xx - x) / w * Math.PI * 5) * h * 0.04;
  const nx = x + w * 0.42; // plek van de moedervlek
  ctx.save(); roundRect(ctx, x, yS - 20, w, h - (yS - 20 - y), 26); ctx.clip();
  // lederhuid
  ctx.fillStyle = '#5E4550'; ctx.fillRect(x, yS - 20, w, h);
  ctx.strokeStyle = rgba('#9A7480', 0.7); ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let i = 0; i < 14; i++) { const yy = y + h * 0.45 + i * h * 0.04; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = x + k * w / 30; const py = yy + Math.sin(k * 0.9 + i * 1.7) * 8; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // bloedvat (lusje naar boven)
  const vx = x + w * 0.54; ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(vx - 30, y + h + 10); ctx.lineTo(vx - 30, eB(vx) + 50); ctx.arc(vx, eB(vx) + 50, 30, Math.PI, 0); ctx.lineTo(vx + 30, y + h + 10); ctx.stroke();
  // haar met haarspiertje
  const hx0 = x + w * 0.84, hy0 = y + h * 0.88, hx1 = x + w * 0.76, hy1 = yS;
  ctx.beginPath(); ctx.ellipse(hx0 - 4, hy0 - 40, 26, 64, 0.38, 0, 6.283); shape(ctx, '#B88A76', '#8A6050', 2);
  const mx0 = x + w * 0.815, my0 = y + h * 0.62, mx1 = x + w * 0.9, my1 = eB(x + w * 0.9) + 6;
  ctx.strokeStyle = '#C05A5E'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(mx0, my0); ctx.quadraticCurveTo((mx0 + mx1) / 2 + 20, (my0 + my1) / 2 + 10, mx1, my1); ctx.stroke();
  ctx.strokeStyle = rgba('#F0B8A6', 0.6); ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const f = i / 5, px = mx0 + (mx1 - mx0) * f + 8, py = my0 + (my1 - my0) * f + 6; ctx.beginPath(); ctx.ellipse(px, py, 7, 2.5, -0.9, 0, 6.283); ctx.stroke(); }
  // zenuw met vertakte uiteinden
  const zx = x + w * 0.14; ctx.strokeStyle = '#E8C35A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(zx - 20, y + h + 10); ctx.bezierCurveTo(zx + 30, y + h * 0.75, zx - 20, y + h * 0.6, zx + 6, eB(zx) + 50); ctx.stroke();
  ctx.lineWidth = 3; [[-30, -30], [0, -40], [30, -28]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(zx + 6, eB(zx) + 50); ctx.quadraticCurveTo(zx + 6 + dx * 0.4, eB(zx) + 50 + dy * 0.6, zx + 6 + dx, eB(zx) + 50 + dy + 12); ctx.stroke(); circ(ctx, zx + 6 + dx, eB(zx) + 50 + dy + 12, 5, '#E8C35A'); });
  // opperhuid (dekweefsel): ronde cellen
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yS); for (let k = 0; k <= 60; k++) { const xx = x + k * w / 60; ctx.lineTo(xx, k ? yS : yS); } ctx.lineTo(x + w, eB(x + w)); for (let k = 60; k >= 0; k--) { const xx = x + k * w / 60; ctx.lineTo(xx, eB(xx)); } ctx.closePath(); ctx.fillStyle = '#B98A76'; ctx.fill(); ctx.clip();
  for (let r = 0; r < 12; r++) { const yy = yS + 22 + r * 25; for (let xx = x + 12 + (r % 2) * 13; xx < x + w; xx += 26) { if (yy > eB(xx) - 8) continue; circ(ctx, xx, yy, 11.5, '#D9AE96', '#B88870', 1.5); circ(ctx, xx, yy, 4, '#8A5A48'); if (kap > 0.01) { ctx.save(); ctx.globalAlpha *= kap; ctx.fillStyle = '#5A3420'; ctx.beginPath(); ctx.arc(xx, yy - 1, 5.5, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); ctx.restore(); } } }
  ctx.restore();
  // hoornlaag
  ctx.fillStyle = '#E8D2B0'; ctx.fillRect(x, yS - 20, w, 22); ctx.strokeStyle = rgba('#C9B08A', 0.8); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x, yS - 14 + i * 6); ctx.lineTo(x + w, yS - 14 + i * 6); ctx.stroke(); }
  // pigmentcellen onderin de opperhuid
  const pigs = []; for (let xx = x + 50; xx < x + w - 20; xx += 92) { const py = eB(xx) - 12; pigs.push([xx, py]); ctx.strokeStyle = '#4A2A18'; ctx.lineWidth = 3; [[-16, -18], [4, -24], [18, -14]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(xx, py); ctx.lineTo(xx + dx, py + dy); ctx.stroke(); }); circ(ctx, xx, py, 11, '#6A3E26', '#3A2014', 2); circ(ctx, xx, py, 4, '#2A1810'); }
  // moedervlek: groepje pigmentcellen
  if (nest > 0.01) { const N = [[0, 0], [-22, -4], [22, -4], [-11, -22], [11, -22], [-33, 14], [33, 14], [0, 18], [-14, 32], [14, 32]]; const n = Math.round(nest * N.length); for (let i = 0; i < n; i++) { const px = nx + N[i][0], py = eB(nx) - 12 + N[i][1]; circ(ctx, px, py, 11, '#6A3E26', '#3A2014', 2); circ(ctx, px, py, 4, '#2A1810'); } }
  // melanoom: cellen delen ongeremd, omhoog en de diepte in
  if (mel > 0.01) { const n = Math.round(mel * 46); for (let i = 0; i < n; i++) { const up = i % 5 === 0; const ang = hash(i * 7 + 1) * 6.283, d = 20 + hash(i * 7 + 2) * (up ? 70 : 120); const px = nx + Math.cos(ang) * d * (up ? 1.4 : 1.1), py = up ? eB(nx) - 30 - hash(i * 3 + 5) * (eB(nx) - yS - 40) : eB(nx) + Math.abs(Math.sin(ang)) * d * 1.0; const r = 9 + hash(i * 5 + 3) * 6, puls = 1 + 0.08 * Math.sin(t * 4 + i); circ(ctx, px, py, r * puls, '#3A1E14', C.koraal, 2); circ(ctx, px, py, r * 0.5, '#1A0E0A'); } }
  ctx.restore();
  // haar steekt boven de huid uit
  ctx.strokeStyle = '#2A1A12'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx0 - 4, hy0 - 40); ctx.quadraticCurveTo(hx1 + 6, hy1 + 60, hx1 - 30, yS - 110); ctx.stroke();
  // markering van het besproken weefsel
  if (hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    if (hl === 'dek') { ctx.beginPath(); ctx.moveTo(x, yS - 20); ctx.lineTo(x + w, yS - 20); for (let k = 60; k >= 0; k--) { const xx = x + k * w / 60; ctx.lineTo(xx, eB(xx)); } ctx.closePath(); ctx.stroke(); }
    if (hl === 'bind') { ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x + k * w / 60; k ? ctx.lineTo(xx, eB(xx)) : ctx.moveTo(xx, eB(xx)); } ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.stroke(); }
    if (hl === 'spier') { ctx.beginPath(); ctx.ellipse((mx0 + mx1) / 2 + 10, (my0 + my1) / 2 + 4, 70, 30, -0.95, 0, 6.283); ctx.stroke(); }
    if (hl === 'zenuw') { ctx.beginPath(); ctx.ellipse(zx + 4, (eB(zx) + y + h) / 2 + 10, 60, (y + h - eB(zx)) / 2 + 10, 0, 0, 6.283); ctx.stroke(); }
    if (hl === 'pig') pigs.forEach(([px, py]) => circ(ctx, px, py, 19, null, C.goud, 4)); }
  ctx.restore();
  return { yS, eB, nx, ny: eB(nx) - 12, zx, mx: (mx0 + mx1) / 2, my: (my0 + my1) / 2, vx }; }

// HE-coupe in een rond microscoopbeeld. o: soort 'gewoon'|'melanoom', kern 0..1 (kernen gekleurd), rest 0..1 (rest gekleurd), deling/kernen 0..1 (markering), meet 0..1 (diepte), vat 0..1
function coupe(ctx, cx, cy, r, t, o = {}) { const { a = 1, soort = 'gewoon', kern = 1, rest = 1, deling = 0, kernen = 0, meet = 0, vat = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const u = r / 300;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = HE.glas; ctx.fill(); ctx.save(); ctx.clip();
  const cR = (c) => mixC(HE.grijs, c, rest), cK = (c) => mixC(HE.grijs, c, kern), lR = (c) => mixC(HE.grijsR, c, rest);
  const y0 = xx => cy - 0.6 * r + Math.sin(xx / (60 * u)) * 5 * u;
  const yb = xx => cy - 0.12 * r + Math.sin((xx - cx) / r * 7) * 0.08 * r;
  // lederhuid
  ctx.fillStyle = cR(HE.rozeL); ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.strokeStyle = lR(HE.vezel); ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const yy = cy + (0.0 + i * 0.09) * r; ctx.beginPath(); for (let k = 0; k <= 24; k++) { const xx = cx - r + k * r / 12; const py = yy + Math.sin(k * 1.1 + i * 2.1) * 9 * u; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  for (let i = 0; i < 14; i++) { const fx = cx - r + hash(i * 3 + 11) * 2 * r, fy = cy + hash(i * 3 + 12) * r; ctx.fillStyle = cK(HE.paars); ctx.beginPath(); ctx.ellipse(fx, fy, 9 * u, 2.8 * u, hash(i) * 0.6 - 0.3, 0, 6.283); ctx.fill(); }
  // bloedvat
  const bx = cx + 0.45 * r, byy = cy + 0.62 * r; circ(ctx, bx, byy, 34 * u, cR('#F8E4EA'), lR(HE.rozeR), 5 * u); for (let i = 0; i < 4; i++) circ(ctx, bx - 14 * u + (i % 2) * 22 * u, byy - 10 * u + Math.floor(i / 2) * 18 * u, 8 * u, mixC(HE.grijs, HE.bloed, rest));
  if (vat > 0.01) circ(ctx, bx, byy, 46 * u, null, rgba(C.goud, vat), 5 * u);
  // opperhuid met ronde cellen
  ctx.save(); ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = cx - r + k * r / 20; k ? ctx.lineTo(xx, y0(xx)) : ctx.moveTo(xx, y0(xx)); } for (let k = 40; k >= 0; k--) { const xx = cx - r + k * r / 20; ctx.lineTo(xx, yb(xx)); } ctx.closePath(); ctx.fillStyle = cR(HE.roze); ctx.fill(); ctx.clip();
  for (let rr = 0; rr < 14; rr++) { const yy = cy - 0.6 * r + 10 * u + rr * 21 * u; for (let xx = cx - r + (rr % 2) * 11 * u; xx < cx + r; xx += 22 * u) { if (yy > yb(xx) + 6 * u || yy < y0(xx) + 4 * u) continue; circ(ctx, xx, yy, 10 * u, cR('#F0BCD0'), lR(HE.rozeR), 1.2 * u); circ(ctx, xx, yy, 3.6 * u, cK(HE.paars)); } }
  ctx.restore();
  // hoornlaag
  ctx.strokeStyle = lR(HE.hoorn); ctx.lineWidth = 2.5 * u; for (let i = 0; i < 4; i++) { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = cx - r + k * r / 20; const py = y0(xx) - 4 * u - i * 6 * u + Math.sin(k * 2.3 + i) * 2 * u; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // basale rij met pigment
  for (let xx = cx - r + 8 * u; xx < cx + r; xx += 19 * u) { const py = yb(xx) - 7 * u; circ(ctx, xx, py, 8 * u, cR('#E9AFC4'), lR(HE.rozeR), 1.2 * u); circ(ctx, xx, py, 3.6 * u, cK(HE.paarsD)); if (hash(xx) > 0.6) circ(ctx, xx + 4 * u, py - 4 * u, 2 * u, mixC(HE.grijs, HE.pigment, rest)); }
  const geo = { y0: y0(cx), yb: yb(cx), yD: cy + 0.42 * r, bx, by: byy, mit: [] };
  if (soort === 'gewoon') { [-0.5, -0.05, 0.4].forEach((fx, g) => { const nxp = cx + fx * r, nyp = yb(nxp) + 2 * u; for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + g, d = i ? 14 * u : 0; const px = nxp + Math.cos(an) * d * 1.3, py = nyp + Math.sin(an) * d; circ(ctx, px, py, 9 * u, cR('#E6A6BE'), lR(HE.rozeR), 1.2 * u); circ(ctx, px, py, 3.8 * u, cK(HE.paars)); if (i % 3 === 0) circ(ctx, px + 4 * u, py - 3 * u, 2 * u, mixC(HE.grijs, HE.pigment, rest)); } }); }
  else {
    const cel = (px, py, rc, rk, seed, mit) => { circ(ctx, px, py, rc, cR('#E2A0BA'), lR(HE.rozeR), 1.4 * u);
      if (mit === 1) { ctx.strokeStyle = cK(HE.paarsD); ctx.lineWidth = 2.6 * u; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(px + k * 2.6 * u, py - 8 * u); ctx.lineTo(px + k * 2.6 * u + (k % 2) * 2 * u, py + 8 * u); ctx.stroke(); } }
      else if (mit === 2) { ctx.strokeStyle = cK(HE.paarsD); ctx.lineWidth = 2.6 * u; for (const s2 of [-1, 1]) for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.moveTo(px + s2 * 5 * u, py + k * 3 * u); ctx.lineTo(px + s2 * 11 * u, py + k * 3.4 * u); ctx.stroke(); } }
      else { grilVorm(ctx, px, py, rk, 0.9, seed); shape(ctx, cK(HE.paarsD), null); circ(ctx, px + rk * 0.25, py - rk * 0.2, 2.2 * u, mixC(HE.grijs, '#C0306A', kern)); }
      if (hash(seed * 3) > 0.55) circ(ctx, px - rc * 0.5, py + rc * 0.4, 2.4 * u, mixC(HE.grijs, HE.pigment, rest)); };
    // massa die de lederhuid in groeit
    const cells = []; for (let i = 0; i < 58; i++) { const fx = -0.42 + hash(i * 13 + 1) * 0.8, f = hash(i * 13 + 2); const px = cx + fx * r; const top = yb(px) - 6 * u, bot = cy + (0.42 - 0.5 * Math.abs(fx + 0.02) ** 2 * 1.4) * r; cells.push([px, top + f * (bot - top), i]); }
    // cellen die omhoog de opperhuid in groeien
    for (let i = 0; i < 12; i++) { const px = cx + (-0.6 + hash(i * 17 + 4) * 1.15) * r; const py = y0(px) + (0.2 + hash(i * 17 + 5) * 0.65) * (yb(px) - y0(px)); cells.push([px, py, 100 + i]); }
    const MIT = { 7: 1, 23: 2, 41: 1, 104: 1, 51: 2 };
    cells.forEach(([px, py, i]) => { const rc = (12 + hash(i * 5 + 1) * 6) * u, rk = (5.5 + hash(i * 5 + 2) * 5.5) * u; cel(px, py, rc, rk, i * 1.7, MIT[i] || 0); if (MIT[i]) geo.mit.push([px, py]); });
    if (deling > 0.01) geo.mit.forEach(([px, py], j) => circ(ctx, px, py, (24 + 3 * Math.sin(t * 5 + j)) * u, null, rgba(C.goud, deling), 4 * u));
    if (kernen > 0.01) [[2, 0], [30, 0], [45, 0]].forEach(([i]) => { const c = cells[i]; circ(ctx, c[0], c[1], 22 * u, null, rgba(C.koraal, kernen), 4 * u); });
    geo.massa = cells.slice(0, 58);
  }
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 10 * u; ctx.stroke(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  if (meet > 0.01) { const mx = cx - 0.62 * r, top = geo.y0 + 2 * u, bot = top + (geo.yD - top) * clamp(meet, 0, 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6 * u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx, top); ctx.lineTo(mx, bot); ctx.stroke(); ctx.lineWidth = 4 * u; [top, bot].forEach(yy => { ctx.beginPath(); ctx.moveTo(mx - 14 * u, yy); ctx.lineTo(mx + 14 * u, yy); ctx.stroke(); }); ctx.setLineDash([8 * u, 8 * u]); ctx.lineWidth = 2.5 * u; ctx.beginPath(); ctx.moveTo(mx, bot); ctx.lineTo(cx + 0.3 * r, bot); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); return geo; }

// liniaal in millimeters (0..n mm), met een goud stuk van 'waarde' mm (u = groei)
function liniaal(ctx, x, y, pxmm, n, a = 1, waarde = 0.6, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = pxmm * n;
  roundRect(ctx, x - 20, y - 10, w + 40, 110, 10); shape(ctx, '#E8DCB8', '#B8A878', 2);
  ctx.strokeStyle = '#4A3A2E'; ctx.lineWidth = 2; for (let i = 0; i <= n * 10; i++) { const xx = x + i * pxmm / 10, L = i % 10 === 0 ? 40 : i % 5 === 0 ? 28 : 18; ctx.beginPath(); ctx.moveTo(xx, y - 10); ctx.lineTo(xx, y - 10 + L); ctx.stroke(); if (i % 10 === 0) text(ctx, String(i / 10), xx, y + 64, fTekst(26, 700), '#4A3A2E', 'center'); }
  text(ctx, 'mm', x + w + 6, y + 90, fTekst(22, 700), '#4A3A2E', 'right');
  if (u > 0.01) { roundRect(ctx, x, y - 34, pxmm * waarde * clamp(u, 0, 1), 16, 6); shape(ctx, C.goud, null); }
  ctx.restore(); }

// weggehaald stukje huid van bovenaf (spoelvorm), melanoom in het midden, snijrand groen als vrij
function excisie(ctx, x, y, s = 1, a = 1, vrij = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, 0); ctx.quadraticCurveTo(0, -150, 220, 0); ctx.quadraticCurveTo(0, 150, -220, 0); ctx.closePath(); shape(ctx, '#D9A78C', '#B5806A', 3);
  moedervlek(ctx, 0, 0, 26, 1);
  if (vrij > 0.01) { ctx.save(); ctx.globalAlpha *= vrij; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(0, 0, 80, 62, 0, 0, 6.283); ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(-220, 0); ctx.quadraticCurveTo(0, -150, 220, 0); ctx.quadraticCurveTo(0, 150, -220, 0); ctx.closePath(); ctx.strokeStyle = C.groen; ctx.lineWidth = 8; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// verslag van de patholoog; regels = [[label, waarde, alpha], …]
function verslag(ctx, x, y, w, h, a = 1, regels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#3E8E9A'; ctx.fillRect(x, y, w, 14);
  metaText(ctx, 'Pathologie · verslag', x + 32, y + 66, '#5A6478', 'left', 22); ctx.fillStyle = '#C9C0AE'; ctx.fillRect(x + 32, y + 86, w - 64, 2);
  regels.forEach(([lab, waarde, al], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + 150 + i * 96; text(ctx, lab, x + 32, yy - 30, fTekst(22, 700), '#7A8290', 'left'); text(ctx, waarde, x + 32, yy + 6, fTekst(36, 700), '#1A2740', 'left'); ctx.restore(); });
  ctx.restore(); }

// beeldscherm met inhoud
function scherm(ctx, x, y, w, h, a = 1, inhoud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#5A6478'; ctx.fillRect(x + w / 2 - 12, y + h, 24, 50); roundRect(ctx, x + w / 2 - 80, y + h + 44, 160, 14, 6); ctx.fill();
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 14); shape(ctx, '#0D1420', '#5A6478', 2); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.fillStyle = '#F3EEF1'; ctx.fillRect(x, y, w, h); inhoud && inhoud(); ctx.restore(); ctx.restore(); }

// overlegtafel met naambordjes
function overlegTafel(ctx, x, y, w, a = 1, namen = [], al = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - 40, y + 70); ctx.lineTo(x + 40, y + 70); ctx.closePath(); shape(ctx, '#8C6A4E', '#6B5440', 2); ctx.fillStyle = '#6B5440'; ctx.fillRect(x + 60, y + 70, 16, 880 - y - 70); ctx.fillRect(x + w - 76, y + 70, 16, 880 - y - 70);
  namen.forEach((n, i) => { const f = al[i] == null ? 1 : al[i]; if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; const bx = x + (i + 0.5) * w / namen.length; ctx.font = fTekst(34, 700); const bw = ctx.measureText(n).width + 48; ctx.beginPath(); ctx.moveTo(bx - bw / 2, y + 40); ctx.lineTo(bx - bw / 2 + 12, y - 50); ctx.lineTo(bx + bw / 2 - 12, y - 50); ctx.lineTo(bx + bw / 2, y + 40); ctx.closePath(); shape(ctx, '#F2EEE4', '#8FA0B5', 2.5); ctx.fillStyle = '#3E8E9A'; ctx.fillRect(bx - bw / 2 + 14, y - 46, bw - 28, 8); text(ctx, n, bx, y + 8, fTekst(34, 700), '#1A2740', 'center'); ctx.restore(); });
  ctx.restore(); }

// sneeuwvlok (vriescoupe)
function sneeuwvlok(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#BFE3F4'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; const ex = x + Math.cos(an) * r, ey = y + Math.sin(an) * r; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke(); const mx = x + Math.cos(an) * r * 0.6, my = y + Math.sin(an) * r * 0.6; [-0.6, 0.6].forEach(d => { ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(an + d) * r * 0.3, my + Math.sin(an + d) * r * 0.3); ctx.stroke(); }); } ctx.restore(); }

// oog (voor 'het oog van de dermatoloog') en bloedbuisje
function oogIcoon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(0, -42, 50, 0); ctx.quadraticCurveTo(0, 42, -50, 0); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA3B2', 3); circ(ctx, 0, 0, 18, '#5A8FC4'); circ(ctx, 0, 0, 8, '#121A26'); ctx.restore(); }
function bloedBuis(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -16, -60, 32, 110, 14); shape(ctx, rgba('#CFE4F0', 0.15), '#AFC0D0', 3); ctx.save(); roundRect(ctx, -16, -60, 32, 110, 14); ctx.clip(); ctx.fillStyle = '#B23A3A'; ctx.fillRect(-16, -10, 32, 70); ctx.restore(); roundRect(ctx, -20, -76, 40, 22, 6); shape(ctx, '#7A3E9A', null); ctx.restore(); }
// Wat word jij? · Geneeskunde · Wat de patholoog ziet — scènes per alinea (v1.0, 20 okt 2026). Look: Schema en Micro, met cast (Mevrouw Visser als patiënt, Dr. Kim als patholoog).
// Rode draad: een moedervlek die verandert.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// Dr. Kim aan de microscoop op een labtafel; x = Kim, microscoop rechts van haar
function kimMicroscoop(ctx, t, x, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 560;
  persoon(ctx, 'kim', x, 880, h, { t, outfit: 'lab', kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  labTafel(ctx, x + 30 * s, 880 - 250 * s, 330 * s); labMicroscoop(ctx, x + 230 * s, 880 - 250 * s, 0.95 * s, 1, -1, o.licht || 0);
  if (o.glaasje != null) glaasje(ctx, x + 205 * s - (1 - o.glaasje) * 140 * s, 880 - 250 * s - 128 * 0.95 * s - 6 * s - (1 - o.glaasje) * 60 * s, 0.22 * s, 1, 1);
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { coupe(ctx, 1690, 610, 220, t, { soort: 'melanoom' }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('huisarts', 1);
    const PV = persoon(ctx, 'visser', 330, 880, 640, { t, kijk: 1, uit: t > q.at('groter', 1) ? 'verbaasd' : 'neutraal', pose: 'staan' }); if (PV.handR) moedervlek(ctx, PV.handR.x, PV.handR.y - 80, 6, clamp((t - q.at('groter', 1) + 0.3) / 2.5, 0, 1));
    naamBij(ctx, 'Mevrouw Visser', '', 160, 200, q.on('Visser', 1, 0.4));
    const u = clamp((t - q.at('groter', 1) + 0.3) / 2.5, 0, 1);
    armPaneel(ctx, 700, 190, 500, 300, q.on('moedervlek', 1, 0.4), 0, 'vroeger'); armPaneel(ctx, 1260, 190, 500, 300, q.on('verandert', 1, 0.4), u, 'nu');
    chip(ctx, 'groter', 1330, 560, C.goud, q.on('groter', 1), 28); chip(ctx, 'grillige rand', 1510, 560, C.goud, q.on('grillig', 1), 28); chip(ctx, 'twee kleuren', 1700, 560, C.goud, q.on('kleuren', 1), 28);
    tag(ctx, 'huisarts', 820, 770, C.teal, B, 'center', 30); pijl(ctx, 920, 755, 1000, 755, C.line, q.on('dermatoloog', 1), 4, 16);
    tag(ctx, 'dermatoloog', 1130, 770, C.teal, q.on('dermatoloog', 1), 'center', 30); pijl(ctx, 1270, 755, 1350, 755, C.line, q.on('lab', 1), 4, 16);
    potje(ctx, 1440, 790, 0.7, q.on('weg', 1), t, 1); regel(ctx, 'naar het lab', 1540, 770, q.on('lab', 1), C.text, 30, 'left', 700);
    vraagteken(ctx, 1810, 400, q.on('Wie', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const K = 1 - q.on('herhalen', 1, 0.6);
    if (K > 0.01) { kimMicroscoop(ctx, t, 1180, 600, K, { licht: 1 }); naamBij(ctx, 'Dr. Kim', 'patholoog', 1150, 220, q.on('patholoog', 1) * K, 'center'); regel(ctx, 'arts die ziekten herkent in weefsel', 600, 500, q.on('arts', 1) * K, C.text, 40, 'center', 700); }
    const H = q.on('herhalen', 1, 0.6); if (H < 0.01) return;
    const hl = t >= q.at('zenuwweefsel', 1) ? 'zenuw' : t >= q.at('spierweefsel', 1) ? 'spier' : t >= q.at('bindweefsel', 1) ? 'bind' : t >= q.at('Dekweefsel', 1) ? 'dek' : null;
    const hlF = t < q.at('huid', 1) + 0.6 ? hl : (t >= q.at('pigmentcellen', 1) && t < q.at('kleurstof', 1) ? 'pig' : null);
    const g = huidSchema(ctx, 140, 200, 1180, 660, t, { a: H, hl: hlF, nest: q.on('groepje', 1, 1.2), mel: clamp((t - q.at('melanoom', 1)) / 2.5, 0, 1), kap: q.on('beschermt', 1, 1.2) });
    tag(ctx, 'film: Van cel tot lichaam', 1640, 200, C.teal, H * q.on('herhalen', 1), 'center', 26);
    const ym = (g.yS + g.eB(1320)) / 2;
    naamBij(ctx, 'opperhuid', 'dekweefsel', 1350, ym + 10, H * q.on('Dekweefsel', 1));
    naamBij(ctx, 'lederhuid', 'bindweefsel', 1350, 800, H * q.on('bindweefsel', 1));
    naamBij(ctx, 'haarspiertje', 'spierweefsel', g.mx - 165, g.my + 130, H * q.on('spierweefsel', 1) * (1 - q.on('melanoom', 1)), 'center');
    naamBij(ctx, 'zenuwuiteinde', 'zenuwweefsel', g.zx + 60, 780, H * q.on('zenuwweefsel', 1));
    naamBij(ctx, 'pigmentcellen', 'onderin de opperhuid', g.zx + 30, g.eB(g.zx + 30) - 76, H * q.on('pigmentcellen', 1) * (1 - q.on('groepje', 1)));
    zon(ctx, 1660, 380, 50, H * q.on('zon', 1), t);
    naamBij(ctx, 'moedervlek', 'groepje pigmentcellen', g.nx, g.ny + 120, H * q.on('groepje', 1) * (1 - q.on('melanoom', 1)), 'center');
    naamBij(ctx, 'melanoom', 'pigmentcellen delen ongeremd', g.nx, g.ny + 190, H * q.on('melanoom', 1), 'center', C.koraal); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('microscoop', 1, 0.8), A = 1 - M;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      const p1 = q.on('formaline', 1), p2 = q.on('paraffine', 1), p3 = q.on('plakjes', 1), p4 = q.on('coupe', 1);
      potje(ctx, 300, 470, 1.15, q.on('lab', 1), t, 1); naamBij(ctx, 'formaline', 'fixeren', 300, 660, p1, 'center');
      chip(ctx, 'bederft niet · cellen blijven in vorm', 330, 780, C.groen, q.on('bederft', 1), 26);
      pijl(ctx, 460, 450, 540, 450, C.line, p2, 4, 16); paraffineBlok(ctx, 700, 500, 1.1, p2); naamBij(ctx, 'paraffine', 'kaarsvet', 700, 660, p2, 'center');
      pijl(ctx, 860, 450, 940, 450, C.line, p3, 4, 16); microtoom(ctx, 1130, 540, 0.9, p3, t, clamp((t - q.at('plakjes', 1)) / 2.5, 0, 1), 1); naamBij(ctx, 'snijden', 'flinterdun', 1130, 660, p3, 'center');
      chip(ctx, 'dunner dan een cel', 1130, 780, C.goud, q.on('Dunner', 1), 26);
      pijl(ctx, 1330, 450, 1410, 450, C.line, p4, 4, 16); glaasje(ctx, 1600, 470, 1, p4, 0); naamBij(ctx, 'coupe', 'plakje op een glaasje', 1600, 660, p4, 'center');
      ctx.restore(); }
    if (M > 0.01) { labTafel(ctx, 160, 700, 560, M); labMicroscoop(ctx, 440, 700, 1.25, M, 1, 1); coupe(ctx, 1150, 470, 330, t, { a: M, kern: 0, rest: 0 });
      regel(ctx, 'bijna niets te zien', 1150, 860, q.on('niets', 1) * M, C.text2, 34, 'center', 700); vraagteken(ctx, 1640, 300, q.on('Waarom', 1), 110); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const B = q.on('stappen', 1, 0.8);
    const kk = clamp((t - q.at('kernen', 1) + 0.2) / 1.5, 0, 1), rr = clamp((t - q.at('roze', 1) + 0.2) / 1.5, 0, 1);
    coupe(ctx, 560, 500, 320, t, { kern: kk, rest: rr });
    naamBij(ctx, 'bijna doorzichtig', '', 560, 880 - 10, q.on('doorzichtig', 1) * (1 - kk), 'center', C.text2);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const kb = q.on('kleurstoffen', 1);
      kleurBak(ctx, 1220, 520, 1.1, kb, HE.paars, t); naamBij(ctx, 'hematoxyline', 'kernen blauwpaars', 1220, 660, kb * q.on('kernen', 1), 'center');
      kleurBak(ctx, 1600, 520, 1.1, kb, '#E27AA0', t); naamBij(ctx, 'eosine', 'de rest roze', 1600, 660, kb * q.on('roze', 1), 'center'); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      regel(ctx, 'gewone coupe', 1000, 300, 1, C.text, 34, 'left', 700); balk(ctx, 1000, 330, 780, clamp((t - q.at('stappen', 1)) / 1.5, 0, 1), C.oker, ''); regel(ctx, 'een paar dagen', 1780, 410, q.on('dagen', 1), C.oker, 30, 'right', 700);
      const v = q.on('operatie', 1); if (v > 0.01) { regel(ctx, 'vriescoupe', 1060, 560, v, C.text, 34, 'left', 700); sneeuwvlok(ctx, 1020, 548, 26, v); balk(ctx, 1000, 590, 780, 0.06 * clamp((t - q.at('vriest', 1)) / 1, 0, 1), '#BFE3F4', ''); regel(ctx, '± een half uur', 1060, 680, q.on('half', 1), '#BFE3F4', 30, 'left', 700); }
      chip(ctx, 'tijdens een operatie: de chirurg wacht', 1390, 780, C.goud, q.on('chirurg', 1), 26); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Links', 1, 0.8);
    const kx = lerp(560, 200, L), kh = lerp(620, 500, L);
    kimMicroscoop(ctx, t, kx, kh, 1, { licht: 1, glaasje: clamp((t - q.at('glaasje', 1)) / 1.2, 0, 1), uit: 'neutraal' });
    naamBij(ctx, 'Dr. Kim', 'patholoog', kx - 20, 880 - kh * 1.1 - 30, q.on('Kim', 1, 0.4) * (1 - L), 'center');
    const a1 = q.on('Links', 1), a2 = q.on('Rechts', 1);
    coupe(ctx, 880, 470, 240, t, { a: a1, soort: 'gewoon' }); naamBij(ctx, 'gewone moedervlek', 'kleine cellen · gelijke kernen', 880, 770, a1, 'center');
    coupe(ctx, 1480, 470, 240, t, { a: a2, soort: 'melanoom' }); naamBij(ctx, 'Mevrouw Visser', 'het weggehaalde stukje', 1480, 770, a2, 'center');
    vraagteken(ctx, 1800, 300, q.on('kenmerken', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c');
    const dl = q.on('deling', 1), kn = q.on('kernen', 1), om = q.on('omhoog', 1), dp = q.on('beneden', 1), me = q.on('meet', 1);
    const g = coupe(ctx, 640, 500, 340, t, { soort: 'melanoom', deling: dl * (1 - kn * 0.7), kernen: kn * (1 - om * 0.7), meet: me ? clamp((t - q.at('meet', 1)) / 1.5, 0, 1) : 0, vat: q.on('kans', 1) });
    pijl(ctx, 600, 400, 600, 270, C.goud, om * (1 - me), 6, 22); pijl(ctx, 640, 560, 640, 720, C.goud, dp * (1 - me), 6, 22);
    tag(ctx, 'film: Mutaties', 1440, 210, C.teal, q.on('Mutaties', 2), 'center', 26);
    chip(ctx, 'rem op delen kwijt', 1440, 300, C.koraal, q.on('rem', 1), 28);
    chip(ctx, 'veel delingen', 1440, 390, C.goud, dl, 28); chip(ctx, 'grote, ongelijke kernen', 1440, 480, C.koraal, kn, 28); chip(ctx, 'groei omhoog en de diepte in', 1440, 570, C.goud, om, 28);
    naamBij(ctx, 'dikte', 'in millimeters', 640 - 340 - 50, 470, me, 'right', C.goud);
    chip(ctx, 'hoe dieper, hoe groter de kans', 1440, 700, C.goud, q.on('dieper', 1), 28); chip(ctx, 'via bloed of lymfe verder', 1440, 790, C.koraal, q.on('kans', 1), 28); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verslag', 1, 0.8), Cc = q.on('bespreken', 1, 0.8), D = q.on('Visser', 1, 0.8);
    const A1 = 1 - B; // liniaal en randen
    coupe(ctx, 400, 440, 250, t, { a: 1 - Cc, soort: 'melanoom', meet: 1 }); naamBij(ctx, '0,6 mm', 'dikte', 400 - 250 - 14, 470, 1 - Cc, 'right', C.goud);
    liniaal(ctx, 820, 290, 300, 3, A1 * q.on('nul', 1), 0.6, clamp((t - q.at('zes', 1)) / 1, 0, 1)); regel(ctx, '0,6 mm', 820 + 300 * 0.6 / 2, 240, A1 * q.on('zes', 1), C.goud, 34, 'center', 800);
    chip(ctx, 'vroeg ontdekt', 1560, 460, C.groen, A1 * q.on('vroeg', 1), 30);
    excisie(ctx, 1150, 640, 0.75, A1 * q.on('randen', 1), q.on('vrij', 1)); naamBij(ctx, 'snijrand vrij', '', 1340, 760, A1 * q.on('vrij', 1), 'left', C.groen); vink_(ctx, 1420, 700, 22, A1 * q.on('vrij', 1));
    const vx = 1240, vy = 190; verslag(ctx, vx, vy, 540, 400 , B, [['Wat is het?', 'melanoom', q.on('wat', 1)], ['Hoe diep?', '0,6 mm', q.on('diep', 2)], ['Helemaal eruit?', 'snijranden vrij', q.on('helemaal', 1)]]);
    vink_(ctx, vx + 470, vy + 330, 20, B * q.on('helemaal', 1));
    const O = Cc * (1 - D); if (O > 0.01) { persoon(ctx, 'kim', 230, 880, 520, { t, outfit: 'lab', a: O, kijk: 1, uit: 'neutraal', pose: 'wijs' });
      scherm(ctx, 470, 260, 420, 250, O, () => coupe(ctx, 680, 385, 200, t, { soort: 'melanoom', meet: 1 }));
      overlegTafel(ctx, 300, 720, 900, O, ['dermatoloog', 'chirurg', 'patholoog'], [q.on('dermatoloog', 1), q.on('chirurg', 1), q.on('patholoog', 1)]); }
    if (D > 0.01) { persoon(ctx, 'visser', 380, 880, 600, { t, a: D, kijk: 1, uit: 'blij' });
      chip(ctx, 'kleine extra operatie · veilige rand', 840, 480, C.teal, D * q.on('operatie', 1), 28); chip(ctx, 'regelmatig controle', 840, 600, C.teal, D * q.on('controle', 1), 28); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'visser', 250, 880, 480, { t, kijk: 1, uit: 'blij' }); armPaneel(ctx, 110, 180, 300, 180, q.on('moedervlek', 1), 1, '');
    const kk = (w, n) => q.on(w, n || 1);
    oogIcoon(ctx, 640, 520, 0.9, kk('oog')); regel(ctx, 'het oog van de dermatoloog', 640, 600, kk('oog'), C.text2, 26, 'center', 700); kruis(ctx, 640, 520, 46, q.on('dermatoloog', 1));
    bloedBuis(ctx, 950, 520, 0.9, kk('bloedtest')); regel(ctx, 'een bloedtest', 950, 600, kk('bloedtest'), C.text2, 26, 'center', 700); kruis(ctx, 950, 520, 46, kk('bloedtest'));
    const P = kk('plakje');
    potje(ctx, 560, 290, 0.6, P, t, 1); paraffineBlok(ctx, 800, 300, 0.6, P * clamp((t - q.at('plakje', 1)) * 2 - 0.5, 0, 1)); microtoom(ctx, 1060, 320, 0.5, P * clamp((t - q.at('plakje', 1)) * 2 - 1, 0, 1), t, 1, 0); glaasje(ctx, 1330, 280, 0.7, P * clamp((t - q.at('plakje', 1)) * 2 - 1.5, 0, 1), 1);
    vink_(ctx, 1480, 280, 26, q.on('antwoord', 1));
    const K = q.on('patholoog', 1, 0.5); kimMicroscoop(ctx, t, 1380, 460, K, { licht: 1 }); naamBij(ctx, 'Dr. Kim', 'patholoog', 1370, 380, K, 'center');
    chip(ctx, 'bijna elke diagnose kanker', 1110, 730, C.goud, q.on('diagnose', 1), 26); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const g1 = q.on('geneeskunde', 1), g2 = q.on('vijf', 1), an = q.on('analisten', 1);
    balk(ctx, 140, 280, 720, clamp((t - q.at('zes', 1)) / 1.2, 0, 1), C.teal, ''); regel(ctx, '6 jaar geneeskunde', 140, 250, g1, C.text, 32, 'left', 700); regel(ctx, 'arts', 860, 370, g1, C.text2, 26, 'right', 700);
    balk(ctx, 880, 280, 600, clamp((t - q.at('vijf', 1)) / 1.2, 0, 1), C.paars, ''); regel(ctx, '+ 5 jaar opleiding tot patholoog', 880, 250, g2, C.text, 32, 'left', 700);
    persoon(ctx, 'kim', 1700, 880, 600, { t, outfit: 'lab', a: q.on('Patholoog', 1, 0.4), kijk: -1, uit: 'blij' });
    microtoom(ctx, 420, 700, 0.8, an, t, 1, 1); kleurBak(ctx, 760, 700, 0.75, an, HE.paars, t); kleurBak(ctx, 960, 700, 0.75, an, '#E27AA0', t);
    naamBij(ctx, 'analist', 'snijdt en kleurt de coupes', 660, 460, an, 'center');
    chip(ctx, 'mbo', 1180, 640, C.groen, q.on('mbo', 1), 30); chip(ctx, 'hbo', 1180, 740, C.groen, q.on('hbo', 1), 30); }
});
