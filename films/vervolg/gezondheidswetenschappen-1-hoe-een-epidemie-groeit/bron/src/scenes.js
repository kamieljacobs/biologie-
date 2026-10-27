
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
// =====================================================================================
// lib_bio.js — gedeelde tekenbibliotheek voor de films (prompt v8, C7 + C9 Tekenrecepten)
// Eerst gebruikt: Geslachtsorganen en puberteit 1.1 en Wat zit er in je eten? 1.1 (22 okt 2026).
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease, shape, roundRect, text.
// Elk object: recept (verhoudingen, bron) + bekende fouten in het commentaar erboven.
// Een film kopieert dit bestand naar bron/src/ en plakt het na lib_cast.js in de pagina.
// =====================================================================================

const BIO = {
  huid: '#D9A982', huidS: '#BF8C66', bot: '#E6DCC6', botS: '#B8AC92',
  brein: '#C9A4B4', breinS: '#9E7A8C', breinD: '#7E5A6E', wit: '#E8D8DE',
  bloed: '#C2453E', bloedL: '#E07A6A', vaatwand: '#B5574A', ader: '#5B7FB0',
  vet: '#F2DDA0', vetS: '#D9BC6A', cyto: '#D8C9A8', kern: '#6E5A9E', kernL: '#A392D6',
  spier: '#B55A50', spierL: '#D98A7E', lever: '#8E3B2E', leverL: '#B85A44', gal: '#5E9A5A',
  slijm: '#D58A8A', slijmD: '#B5574A', klier: '#E0B64A'
};
const _bioPolyCache = {};

// ---------- kleine helpers ----------
function bioPad(ctx, pts, closed = false) { // Catmull-Rom door punten
  const n = pts.length; if (n < 2) return; ctx.moveTo(pts[0][0], pts[0][1]);
  const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const q0 = closed || i > 0 ? p0 : p1, q3 = closed || i < n - 2 ? p3 : p2;
    ctx.bezierCurveTo(p1[0] + (p2[0] - q0[0]) / 6, p1[1] + (p2[1] - q0[1]) / 6, p2[0] - (q3[0] - p1[0]) / 6, p2[1] - (q3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}
function bioPunt(pts, u) { // punt + richting op fractie u (0..1) van een polylijn
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const d = clamp(u, 0, 1) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const f = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); const a = pts[i - 1], b = pts[i];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), Math.atan2(b[1] - a[1], b[0] - a[0])];
}
function bioDicht(pts, n = 80) { // gladde, gelijk verdeelde punten langs een pad
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  out.push(pts[m - 1]); return out;
}

// =====================================================================================
// HOOFD MET HERSENEN, zijaanzicht (mediane doorsnede), kijkt naar rechts.
// Recept: hoofdlengte ≈ 1,2× hersenlengte; grote hersenen ≈ 2/3 van de schedel; kleine hersenen achter-onder,
// ≈ 1/8 van het volume; hypothalamus onder de thalamus, vóór de hersenstam; hypofyse (± 1 cm, erwt) hangt aan
// een steeltje in het Turkse zadel (botkuiltje) recht boven de neusholte; hersenbalk als C-band boven de thalamus.
// Bron: Gray's Anatomy (mediaan sagittaal), Kenhub 'Hypothalamus'. Bekende fouten: hypofyse los zwevend of
// náást de hersenen; hersenen als ovaal zonder kleine hersenen en hersenstam; hypothalamus achterin.
// Ontwerpcoördinaten: hoofd ± 470 breed × 600 hoog, oorsprong = hypothalamus.
// =====================================================================================
function hoofdHersenen(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, hthCol = BIO.klier, hypCol = BIO.klier, huid = BIO.huid, gloed = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  if (a <= 0.01) return { hth: P(0, 0), hyp: P(8, 64), steel: P(4, 34) };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hoofd + hals (profiel naar rechts: voorhoofd, neus, lippen, kin)
  const HOOFD = [[-60, 330], [-70, 250], [-120, 190], [-205, 120], [-245, 10], [-240, -110], [-190, -215], [-90, -280], [30, -290], [140, -250], [205, -170],
    [225, -90], [228, -30], [244, 10], [272, 60], [262, 78], [246, 84], [252, 106], [244, 122], [252, 138], [240, 160], [222, 182], [196, 196], [150, 200], [120, 240], [110, 330]];
  ctx.beginPath(); bioPad(ctx, HOOFD, false); ctx.lineTo(-60, 330); ctx.closePath();
  shape(ctx, rgba(huid, 0.22), rgba(huid, 0.85), 2.5);
  // schedel (binnenrand) als dunne botlijn
  ctx.beginPath(); bioPad(ctx, [[-200, 110], [-225, 0], [-218, -110], [-170, -200], [-80, -258], [30, -266], [130, -228], [190, -150], [204, -70], [190, -10], [150, 30]], false);
  ctx.strokeStyle = rgba(BIO.bot, 0.55); ctx.lineWidth = 8; ctx.stroke();
  // Turks zadel (botkuiltje voor de hypofyse) en neusholte erboven/ervoor
  ctx.beginPath(); ctx.moveTo(-30, 70); ctx.quadraticCurveTo(-18, 100, 10, 98); ctx.quadraticCurveTo(36, 96, 44, 66); ctx.strokeStyle = rgba(BIO.bot, 0.75); ctx.lineWidth = 7; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, [[60, 50], [140, 40], [215, 50], [232, 90], [200, 120], [120, 118], [70, 100]], true); ctx.fillStyle = rgba('#0D1420', 0.35); ctx.fill();
  // grote hersenen
  const GROOT = [[-30, 40], [-140, 70], [-205, 20], [-215, -90], [-160, -200], [-60, -250], [50, -250], [140, -210], [185, -130], [190, -60], [160, -5], [100, 20], [50, 10]];
  ctx.beginPath(); bioPad(ctx, GROOT, true); shape(ctx, rgba(BIO.brein, 0.9), BIO.breinS, 2);
  // windingen (gyri) als zachte groeven, binnen de grote hersenen
  ctx.save(); ctx.beginPath(); bioPad(ctx, GROOT, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = 3;
  const GROEF = [[[-190, -60], [-150, -80], [-170, -130]], [[-120, -210], [-100, -160], [-60, -175], [-40, -130]], [[0, -235], [10, -190], [50, -200], [60, -150]],
    [[110, -215], [100, -170], [130, -150]], [[165, -110], [130, -100], [140, -60]], [[-170, 30], [-140, 0], [-100, 20]], [[-70, -110], [-30, -90], [10, -110], [50, -95], [90, -120]],
    [[-185, -150], [-150, -150]], [[150, -40], [120, -30]]];
  GROEF.forEach(g => { ctx.beginPath(); bioPad(ctx, g, false); ctx.stroke(); });
  ctx.restore();
  // hersenbalk (C-vormige band)
  ctx.beginPath(); bioPad(ctx, [[-120, -10], [-130, -60], [-80, -95], [20, -100], [100, -80], [125, -45], [105, -30], [70, -55], [10, -68], [-70, -62], [-100, -35], [-95, -5]], true);
  shape(ctx, rgba(BIO.wit, 0.9), rgba(BIO.breinS, 0.8), 1.5);
  // thalamus
  ctx.beginPath(); ctx.ellipse(-10, -28, 46, 26, -0.1, 0, 6.283); shape(ctx, rgba(BIO.breinS, 0.75), BIO.breinD, 1.5);
  // kleine hersenen met boompje (arbor vitae)
  const KLEIN = [[-110, 60], [-150, 70], [-200, 80], [-210, 130], [-170, 175], [-110, 170], [-80, 130], [-85, 85]];
  ctx.beginPath(); bioPad(ctx, KLEIN, true); shape(ctx, rgba(BIO.brein, 0.95), BIO.breinS, 2);
  ctx.save(); ctx.beginPath(); bioPad(ctx, KLEIN, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.wit, 0.8); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-88, 112); ctx.lineTo(-130, 118); ctx.stroke(); for (let k = 0; k < 5; k++) { const an = 2.35 + k * 0.38; const bx = -112 - k * 4, by = 116; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.cos(an) * 40, by + Math.sin(an) * 28, bx + Math.cos(an) * 78, by + Math.sin(an) * 52); ctx.stroke(); ctx.lineWidth = 1.6; for (const sd of [-0.3, 0.3]) { ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * 45, by + Math.sin(an) * 30); ctx.lineTo(bx + Math.cos(an + sd) * 74, by + Math.sin(an + sd) * 50); ctx.stroke(); } }
  ctx.restore();
  // hersenstam (middenhersenen, brug, verlengde merg) naar het ruggenmerg
  ctx.beginPath(); bioPad(ctx, [[-20, 0], [-50, 40], [-58, 80], [-48, 120], [-62, 170], [-68, 250], [-60, 330], [-20, 330], [-18, 250], [-6, 170], [10, 120], [16, 70], [10, 30]], true);
  shape(ctx, rgba(BIO.breinS, 0.8), BIO.breinD, 1.5);
  // hypothalamus (onder de thalamus, vóór de hersenstam) + gloed
  if (hth > 0.01 && gloed) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90); g.addColorStop(0, rgba(hthCol, 0.5 * hth)); g.addColorStop(1, rgba(hthCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); bioPad(ctx, [[-26, -6], [10, -14], [36, -2], [30, 18], [4, 22], [-20, 14]], true); shape(ctx, rgba(hthCol, 0.35 + 0.6 * Math.max(hth, 0.25)), lighten(hthCol, 0.25), 2);
  // steeltje (infundibulum) en hypofyse in het Turkse zadel
  ctx.strokeStyle = lighten(hthCol, 0.15); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(10, 18); ctx.quadraticCurveTo(12, 40, 6, 58); ctx.stroke();
  if (hyp > 0.01 && gloed) { const g = ctx.createRadialGradient(8, 72, 0, 8, 72, 60); g.addColorStop(0, rgba(hypCol, 0.5 * hyp)); g.addColorStop(1, rgba(hypCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(8, 72, 60, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(8, 74, 24, 17, 0, 0, 6.283); shape(ctx, rgba(hypCol, 0.35 + 0.6 * Math.max(hyp, 0.25)), lighten(hypCol, 0.25), 2);
  ctx.strokeStyle = rgba('#0D1420', 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(4, 58); ctx.lineTo(6, 90); ctx.stroke(); // voor- en achterkwab
  // oog (in profiel) voor herkenning
  ctx.beginPath(); ctx.ellipse(204, 22, 13, 8, 0, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fill(); ctx.beginPath(); ctx.arc(212, 22, 5, 0, 6.283); ctx.fillStyle = '#2A1E18'; ctx.fill();
  ctx.restore();
  return { hth: P(0, 0), hyp: P(8, 74), steel: P(8, 40) };
}

// =====================================================================================
// BLOEDVAT met stroom. Recept: rode bloedcel = ingedeukte schijf, 7–8 µm breed, ± 2 µm dik; van opzij een
// halter, van boven een schijf met lichter midden; ze kantelen in de stroom en vervormen in een haarvat
// (± 5–8 µm, één voor één). Hormonen veel kleiner: stipjes die meestromen. Bekende fouten: bloedcellen als
// bollen; stroom met constante snelheid zonder spreiding.
// pts = pad (ontwerpcoördinaten op het scherm), r = halve binnendiameter.
// =====================================================================================
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) { // kant 0 = van boven, 1 = van opzij
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.32, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
  if (kant < 0.8) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.35 * (1 - kant)); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.4); ctx.fill(); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-r * 0.9, -r * 0.85); ctx.quadraticCurveTo(r * 1.3, 0, -r * 0.9, r * 0.85); ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.9, -r * 0.85); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}

// =====================================================================================
// ZENUWCEL (neuron). Recept: cellichaam 15–30 µm met grote ronde kern + kernlichaampje; 5–7 dendrieten die
// zich als een boom vertakken en dunner worden (breedte × 0,6 per vertakking, lengte × 0,65); één axon
// vanuit een kegeltje, lang en overal even dik, eindigt in vertakkingen met knopjes (synaps).
// Bron: Kandel, Principles of Neural Science, fig. 2-1. Bekende fouten: ster met gelijke armen; axon dat
// dunner wordt; geen kern.
// =====================================================================================
function zenuwcel(ctx, x, y, o = {}) {
  const { a = 1, s = 1, col = C.paars, naar = null, seed = 1, kernCol = null, t = 0, axonDik = 5, puls = -1, pulsCol = C.goud, takken = 6 } = o; if (a <= 0.01) return null;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const dir = naar ? Math.atan2(naar[1] - y, naar[0] - x) : 0;
  // dendrieten (boom) aan de kant van het cellichaam weg van het axon
  const tak = (px, py, an, len, w, d, sd) => { if (d > 3 || w < 1) return;
    const bend = (hash(sd * 13 + d) - 0.5) * 0.6; const ex = px + Math.cos(an + bend * 0.5) * len, ey = py + Math.sin(an + bend * 0.5) * len;
    const mx = px + Math.cos(an + bend) * len * 0.5, my = py + Math.sin(an + bend) * len * 0.5;
    ctx.strokeStyle = col; ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    const nk = d < 2 ? 2 : (hash(sd * 3 + d) > 0.4 ? 2 : 1);
    for (let k = 0; k < nk; k++) tak(ex, ey, an + (k ? 1 : -1) * (0.35 + 0.3 * hash(sd * 5 + k + d)), len * 0.65, w * 0.6, d + 1, sd * 2 + k + 1); };
  for (let k = 0; k < takken; k++) { const an = dir + Math.PI + (k - (takken - 1) / 2) * (4.2 / takken) + (hash(seed * 11 + k) - 0.5) * 0.4;
    tak(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, an, (46 + 26 * hash(seed * 7 + k)) * s, 7, 0, seed * 17 + k); }
  // axon: van het kegeltje naar 'naar', overal even dik, met eindvertakkingen
  let eind = null;
  if (naar) { const L = Math.hypot(naar[0] - x, naar[1] - y); const nx = Math.cos(dir), ny = Math.sin(dir), px = -ny, py = nx;
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const w = Math.sin(u * Math.PI * 1.5 + seed) * 18 * s * Math.sin(u * Math.PI); pts.push([x + nx * (26 * s + u * (L - 60 * s)) + px * w, y + ny * (26 * s + u * (L - 60 * s)) + py * w]); }
    // kegeltje
    ctx.beginPath(); ctx.moveTo(x + px * 14 * s + nx * 14 * s, y + py * 14 * s + ny * 14 * s); ctx.lineTo(pts[2][0], pts[2][1]); ctx.lineTo(x - px * 14 * s + nx * 14 * s, y - py * 14 * s + ny * 14 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = axonDik * s; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); ctx.stroke();
    eind = pts[pts.length - 1]; const ea = Math.atan2(eind[1] - pts[pts.length - 2][1], eind[0] - pts[pts.length - 2][0]);
    for (let k = -1; k <= 1; k++) { const an = ea + k * 0.55; const bx = eind[0] + Math.cos(an) * 30 * s, by = eind[1] + Math.sin(an) * 30 * s;
      ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(eind[0], eind[1]); ctx.quadraticCurveTo(eind[0] + Math.cos(ea) * 14 * s, eind[1] + Math.sin(ea) * 14 * s, bx, by); ctx.stroke();
      ctx.beginPath(); ctx.arc(bx, by, 6 * s, 0, 6.283); shape(ctx, lighten(col, 0.15), lighten(col, 0.4), 1.5); }
    if (puls >= 0 && puls <= 1) { const [qx, qy] = bioPunt(pts, puls); const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 26 * s); g.addColorStop(0, rgba(pulsCol, 0.9)); g.addColorStop(1, rgba(pulsCol, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 26 * s, 0, 6.283); ctx.fill(); }
    eind = [eind[0] + Math.cos(ea) * 34 * s, eind[1] + Math.sin(ea) * 34 * s]; }
  // cellichaam (afgeronde driehoek) met kern en kernlichaampje
  ctx.beginPath(); for (let i = 0; i <= 36; i++) { const an = i / 36 * 6.283; const rr = (30 + 5 * Math.cos(3 * (an - dir))) * s; const px2 = x + Math.cos(an) * rr, py2 = y + Math.sin(an) * rr; i ? ctx.lineTo(px2, py2) : ctx.moveTo(px2, py2); }
  ctx.closePath(); shape(ctx, lighten(col, 0.1), lighten(col, 0.4), 2);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 4 * s, y - Math.sin(dir) * 4 * s, 13 * s, 0, 6.283); shape(ctx, kernCol || rgba('#1A1420', 0.45), rgba('#F2F2EE', 0.35), 1);
  ctx.beginPath(); ctx.arc(x - Math.cos(dir) * 2 * s, y - Math.sin(dir) * 6 * s, 4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.5); ctx.fill();
  ctx.restore(); return eind;
}

// =====================================================================================
// VETCEL en VETWEEFSEL. Recept: witte vetcel 50–150 µm; één grote vetdruppel vult ± 90 % van de cel;
// cytoplasma als dun randje; kern platgedrukt (sikkel) tegen de rand. In weefsel drukken de cellen tegen
// elkaar tot veelhoeken met afgeronde hoeken (Voronoi-patroon, 80–120 % grootteverschil), haarvaten ertussen.
// Bron: Junqueira's Basic Histology, h. 6. Bekende fouten: raster van gelijke rondjes; kern in het midden.
// =====================================================================================
function _bioCellen(key, w, h, d, seed) { // Voronoi-cellen in een rechthoek (gecachet)
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const cs = []; const cols = Math.max(2, Math.round(w / d)), rows = Math.max(2, Math.round(h / (d * 0.87)));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cs.push([(c + 0.5 + (r % 2 ? 0.5 : 0) - 0.5 * (cols > 1 ? 0 : 0)) * w / cols - w / 2 + (hash(seed + r * 31 + c * 7) - 0.5) * d * 0.45, (r + 0.5) * h / rows - h / 2 + (hash(seed + r * 17 + c * 13) - 0.5) * d * 0.4]);
  const polys = cs.map((p, i) => { const pts = []; for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.75;
      cs.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); const proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); });
      best = Math.max(0, best - 3); pts.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts }; });
  _bioPolyCache[key] = polys; return polys;
}
function vetcel(ctx, x, y, r, o = {}) {
  const { a = 1, pts = null, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = pts || Array.from({ length: 40 }, (_, k) => [x + Math.cos(k / 40 * 6.283) * r, y + Math.sin(k / 40 * 6.283) * r]);
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(BIO.cyto, 0.55), rgba(BIO.cyto, 0.9), 1.5);
  // vetdruppel: dezelfde vorm iets kleiner
  const cx = omtrek.reduce((m, p) => m + p[0], 0) / omtrek.length, cy = omtrek.reduce((m, p) => m + p[1], 0) / omtrek.length;
  const druppel = omtrek.map(p => [cx + (p[0] - cx) * 0.86, cy + (p[1] - cy) * 0.86]);
  ctx.beginPath(); bioPad(ctx, druppel, true); shape(ctx, rgba(BIO.vet, 0.85), rgba(BIO.vetS, 0.9), 1.2);
  if (inhoud) { ctx.save(); ctx.beginPath(); bioPad(ctx, druppel, true); ctx.clip(); inhoud(cx, cy); ctx.restore(); }
  // kern: sikkel tegen de rand (op de punt van de omtrek rechtsonder)
  let bi = 0, bv = -1e9; omtrek.forEach((p, i) => { const v = (p[0] - cx) * 0.6 + (p[1] - cy); if (v > bv) { bv = v; bi = i; } });
  const kp = omtrek[bi]; const an = Math.atan2(kp[1] - cy, kp[0] - cx); const rr = Math.hypot(kp[0] - cx, kp[1] - cy);
  ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * rr * 0.93, cy + Math.sin(an) * rr * 0.93, Math.max(4, rr * 0.18), Math.max(2, rr * 0.06), an + Math.PI / 2, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.9), BIO.kernL, 1);
  ctx.restore();
}
function vetweefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, d = 110, seed = 3, haarvat = true, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const polys = _bioCellen('vw' + w + 'x' + h + 'd' + d + 's' + seed, w, h, d, seed);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 28); ctx.clip();
  ctx.fillStyle = rgba('#7A4A3A', 0.35); ctx.fillRect(x - w / 2, y - h / 2, w, h);
  polys.forEach(pg => vetcel(ctx, 0, 0, 0, { pts: pg.pts.map(p => [x + p[0], y + p[1]]) }));
  if (haarvat) bloedvat(ctx, [[x - w / 2 - 20, y + h * 0.1], [x - w * 0.15, y - h * 0.05], [x + w * 0.2, y + h * 0.08], [x + w / 2 + 20, y - h * 0.02]], 5, t, { n: 6, speed: 0.08, haarvat: true, wand: '#B5574A' });
  ctx.restore();
  ctx.restore();
}

// =====================================================================================
// ZAADCEL. Recept (mens): kop 4–5 µm lang, 2,5–3,5 µm breed, plat (peddel); acrosoomkap over 40–70 % van de
// kop; middenstuk ± 5 µm, iets dikker; staart ± 45 µm → hele cel ± 55 µm, staart ± 10× de koplengte. Een golf
// loopt van kop naar staart (golflengte ± 0,4 staart, uitslag groeit naar het eind), de kop draait om zijn as
// (wordt afwisselend smal en breed). Slag ± 10–15 per seconde; in films vertraagd. Bron: WHO-laborhandboek
// sperma 2021, fig. 2.x. Bekende fouten: kikkervisje met korte staart; staart die alleen achteraan zwaait.
// Oorsprong = midden van de kop; ang = zwemrichting.
// =====================================================================================
function zaadcelEcht(ctx, x, y, ang, t, s = 1, o = {}) {
  const { a = 1, col = '#F2F2EE', acro = C.teal, slag = 2.2 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return;
  const U = 2.4 * s; // px per µm
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kopL = 4.6 * U, kopB = 3 * U * (0.55 + 0.45 * Math.abs(Math.cos(t * slag * 3.1)));
  const midL = 5 * U, staartL = 45 * U, golf = 0.42 * staartL;
  const ph = t * slag * 6.283;
  const pts = []; for (let i = 0; i <= 60; i++) { const d = (i / 60) * (midL + staartL); const amp = (0.4 + 3.2 * Math.pow(d / (midL + staartL), 1.2)) * U;
    pts.push([-kopL * 0.5 - d, Math.sin(d / golf * 6.283 - ph) * amp]); }
  // staart (eind dunner), middenstuk dikker
  for (let i = 1; i < pts.length; i++) { const d = i / 60 * (midL + staartL); ctx.strokeStyle = col; ctx.lineWidth = d < midL ? 1.25 * U : Math.max(0.6, lerp(0.75 * U, 0.25 * U, (d - midL) / staartL));
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }
  // kop (peddel) + acrosoomkap
  ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, kopL / 2, kopB / 2, 0, 0, 6.283); ctx.clip(); ctx.beginPath(); ctx.ellipse(kopL * 0.12, 0, kopL * 0.42, kopB * 0.62, 0, 0, 6.283); ctx.fillStyle = rgba(acro, 0.65); ctx.fill(); ctx.restore();
  ctx.restore();
}

// =====================================================================================
// EICEL (in de follikel) en EIERSTOK in doorsnede. Recept: eierstok ± 3 × 2 × 1 cm (amandel); schors (buitenste
// derde) vol primordiale follikels (eicel met één laag platte cellen), merg in het midden met bloedvaten die
// via de hilus binnenkomen. Rijping: primaire follikel (één laag kubische cellen) → secundaire (meerdere lagen)
// → follikel met holte (antrum), eicel op een heuveltje (cumulus) → Graafse follikel 18–25 mm (zo groot dat hij
// uitpuilt). Eisprong: wand scheurt aan het oppervlak, eicel met stralenkrans komt vrij, wat overblijft wordt
// het gele lichaam (gele, geplooide wand). Groottes niet op schaal (follikels vergroot). Bron: Junqueira h. 22;
// Sadler, Langman's Embryology h. 2. Bekende fouten: eicellen als losse stipjes; eisprong als puntje dat wegvliegt.
// =====================================================================================
function eicelEcht(ctx, x, y, r, a = 1, krans = true) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (krans) for (let k = 0; k < 18; k++) { const an = k / 18 * 6.283; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5, r * 0.24, 0, 6.283); shape(ctx, rgba('#E6C9A8', 0.65), rgba('#B88A60', 0.6), 1); }
  ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.35), rgba('#F6EEDC', 0.8), 1.5); // zona pellucida
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.95), C.goud, 1.5);
  ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.12, r * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.75); ctx.fill();
  ctx.restore();
}
function follikel(ctx, x, y, f, o = {}) { // f: 0 primordiaal → 1 Graaf; schaalgrootte via o.R (straal bij f=1)
  const { a = 1, R = 120, scheur = 0, seed = 0, eicel = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const r = lerp(o.klein ? 7.5 : 9, R, Math.pow(f, 1.6)); const ei = lerp(4, Math.max(10, R * 0.12), Math.min(1, f * 2.2));
  // theca (buitenste ring) vanaf secundair
  if (f > 0.3) { ctx.beginPath(); ctx.arc(x, y, r + 6 + 4 * f, 0, 6.283); shape(ctx, rgba('#C98A6A', 0.25 * f), rgba('#C98A6A', 0.5 * f), 1.5); }
  // granulosacellen
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.75), rgba('#C9966A', 0.9), 1.2);
  // celkorrels in de granulosa (één laag plat → meerdere lagen)
  const nRing = o.klein ? 6 : Math.round(lerp(8, 34, Math.min(1, f * 1.4))); const lagen = f < 0.15 ? 1 : f < 0.4 ? 2 : 3;
  for (let L = 0; L < lagen; L++) for (let k = 0; k < nRing; k++) { const an = k / nRing * 6.283 + L * 0.3 + seed; const rr = r * (0.88 - L * 0.1); const cr = Math.max(1.4, r * 0.06);
    ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * rr, y + Math.sin(an) * rr, cr * (f < 0.1 ? 1.6 : 1), cr * (f < 0.1 ? 0.6 : 1), an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.55); ctx.fill(); }
  // antrum (vochtholte) vanaf f > 0.45, eicel op de cumulus aan één kant
  let ex = x, ey = y;
  if (f > 0.45) { const af = clamp((f - 0.45) / 0.55, 0, 1); const ar = r * lerp(0.2, 0.8, af);
    ctx.beginPath(); ctx.arc(x + r * 0.08 * af, y - r * 0.05 * af, ar, 0, 6.283); shape(ctx, rgba('#E9F0F4', 0.55), rgba('#BFD0DA', 0.7), 1);
    ex = x - r * 0.55 * af; ey = y + r * 0.35 * af;
    ctx.beginPath(); ctx.arc(ex, ey, ei * 2.2, 0, 6.283); ctx.fillStyle = rgba('#E2B88E', 0.85); ctx.fill(); }
  if (eicel && scheur < 0.5) eicelEcht(ctx, ex, ey, ei, 1, f > 0.6);
  ctx.restore(); return [ex, ey, ei];
}
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 160, groei = 0, eis = 0, geel = 0, t = 0, winnaar = 3 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; const w = 1 + 0.03 * Math.sin(an * 3 + 1) + 0.02 * Math.sin(an * 7); return [x + Math.cos(an) * rx * w, y + Math.sin(an) * ry * w]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.32), lighten('#C98A6A', 0.25), 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  // merg: lichter, met bloedvaten vanaf de hilus (onderkant)
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.08, rx * 0.5, ry * 0.42, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.35); ctx.fill();
  const vat = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  [[-0.05, 1], [0.05, 1]].forEach(([dx], i) => { const c = i ? rgba(BIO.ader, 0.7) : rgba(BIO.bloed, 0.75);
    vat([[x + dx * rx, y + ry * 1.05], [x + dx * rx * 1.4, y + ry * 0.5], [x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.5 * rx, y - ry * 0.1]], c, 5);
    vat([[x + dx * rx * 1.4, y + ry * 0.5], [x + 0.3 * rx + i * 20, y + ry * 0.1], [x + 0.55 * rx, y - ry * 0.15]], c, 4);
    vat([[x - 0.25 * rx + i * 30, y + ry * 0.05], [x - 0.1 * rx, y - ry * 0.35]], c, 3); });
  ctx.restore();
  // primordiale follikels in de schors (buitenste derde), niet in het merg
  for (let i = 0; i < n; i++) { const an = hash(i * 3 + 1) * 6.283, rr = lerp(0.68, 0.93, hash(i * 3 + 2)); follikel(ctx, x + Math.cos(an) * rx * rr, y + Math.sin(an) * ry * rr, 0, { R: ry * 0.5, seed: i, a: 0.8, klein: true }); }
  // groepje dat rijpt; één wint, de rest gaat te gronde
  const grp = [[-0.45, -0.38], [-0.2, 0.48], [0.18, -0.52], [0.5, -0.12], [-0.6, 0.22]];
  let uit = null;
  grp.forEach(([gx, gy], i) => { const win = i === winnaar; const g = groei * (win ? 1 : 0.5) * (win ? 1 : 1 - eis); if (g <= 0.01 || (win && geel > 0.5)) return;
    const px = x + gx * rx * (win ? 0.95 : 1), py = y + gy * ry * (win ? 0.95 : 1);
    const p = follikel(ctx, px, py, win ? g : g * 0.55, { R: ry * 0.42, seed: i, a: win ? 1 : 1 - eis * 0.7, scheur: win ? eis : 0 });
    if (win) uit = { x: px, y: py, ei: p }; });
  // eisprong: wand scheurt aan de rand, eicel met stralenkrans + vocht komt vrij
  if (uit && eis > 0.01) { const an = Math.atan2(uit.y - y, uit.x - x); const sx = x + Math.cos(an) * rx * 1.02, sy = y + Math.sin(an) * ry * 1.02;
    ctx.save(); ctx.globalAlpha *= clamp(eis * 3, 0, 1); ctx.strokeStyle = rgba('#E9F0F4', 0.6); ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { const sp = an + (k - 2) * 0.25; const d = eis * 90; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(sp) * d, sy + Math.sin(sp) * d); ctx.stroke(); } ctx.restore();
    const e = ease(eis); eicelEcht(ctx, lerp(uit.ei[0], sx + Math.cos(an) * 110, e), lerp(uit.ei[1], sy + Math.sin(an) * 110, e), uit.ei[2] * 1.4, 1, true); }
  if (geel > 0.01) { const [gx, gy] = grp[winnaar]; const px = x + gx * rx * 0.95, py = y + gy * ry * 0.95; ctx.save(); ctx.globalAlpha *= geel;
    ctx.beginPath(); for (let k = 0; k <= 40; k++) { const an = k / 40 * 6.283; const rr = ry * 0.32 * (1 + 0.08 * Math.sin(an * 9)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, rgba('#E8C25A', 0.75), '#C99A3A', 2); ctx.restore(); }
  ctx.restore(); return uit;
}

// =====================================================================================
// BAARMOEDERWAND met slijmvlies (uitsnede, holte boven). Recept: spierlaag (myometrium) 1–2 cm, glad spierweefsel;
// slijmvlies 1 mm na de menstruatie → 5–7 mm (soms tot 10) rond de eisprong en daarna; basale laag blijft, de
// functionele laag erboven groeit en laat los. Klieren: rechte buisjes die later kronkelen (zaagtand); spiraal-
// slagaders lopen kronkelend omhoog. Bij de menstruatie knijpen de spiraalslagaders dicht, de functionele laag
// laat in stukjes los met bloed. Bron: Junqueira h. 22; Guyton h. 82. Bekende fouten: slijmvlies als vlak blokje;
// eicel in het menstruatiebloed.
// dikte 0..1 (0,15 ≈ 1 mm, 1 ≈ 7 mm), los 0..1 (afstoten).
// =====================================================================================
function baarmoederwand(ctx, x, y, w, h, dikte, o = {}) {
  const { a = 1, los = 0, t = 0, kronkel = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const spierH = h * 0.42, basaal = h * 0.06, fmax = h * 0.5; const fH = fmax * clamp(dikte, 0.05, 1);
  const yb = y + h / 2, ys = yb - spierH, yba = ys - basaal, yf = yba - fH; // ys = top spier, yf = oppervlak
  const golf = (xx, amp, k) => amp * Math.sin(xx / w * 6.283 * k + seed);
  // spierlaag: spoelvormige vezels in banen
  roundRect(ctx, x - w / 2, ys, w, spierH, 10); shape(ctx, rgba(BIO.spier, 0.55), rgba(BIO.spierL, 0.6), 1.5);
  ctx.save(); roundRect(ctx, x - w / 2, ys, w, spierH, 10); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.55); ctx.lineWidth = 2;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 14; c++) { const cx = x - w / 2 + (c + (r % 2) * 0.5) * w / 13, cy = ys + 14 + r * (spierH - 20) / 6; ctx.beginPath(); ctx.ellipse(cx, cy, w / 32, 3.2, 0.08 * Math.sin(c + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // basale laag
  ctx.fillStyle = rgba(BIO.slijmD, 0.75); ctx.fillRect(x - w / 2, yba, w, basaal);
  // functionele laag (met golvend oppervlak), losraken = brokken die omhoog drijven
  const opp = []; for (let i = 0; i <= 40; i++) { const xx = x - w / 2 + i / 40 * w; opp.push([xx, yf + golf(xx, 6 * dikte, 3)]); }
  const vastFrac = 1 - clamp(los, 0, 1);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - w / 2, yba); for (const p of opp) ctx.lineTo(p[0], lerp(yba, p[1], vastFrac)); ctx.lineTo(x + w / 2, yba); ctx.closePath();
  ctx.fillStyle = rgba(BIO.slijm, 0.7); ctx.fill(); ctx.clip();
  // klieren: rechte buisjes → kronkelend
  const nk = 9; for (let k = 0; k < nk; k++) { const kx = x - w / 2 + (k + 0.5) * w / nk; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const u = i / 20; const yy = lerp(yba, yf - 10, u); const zx = Math.sin(u * 14 + k) * 7 * kronkel * dikte; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke();
    ctx.strokeStyle = rgba(BIO.slijmD, 0.6); ctx.lineWidth = 2; ctx.stroke(); }
  // spiraalslagaders
  for (let k = 0; k < 5; k++) { const kx = x - w / 2 + (k + 1) * w / 6 + 20; ctx.strokeStyle = rgba(BIO.bloed, 0.85 * (1 - los * 0.5)); ctx.lineWidth = 3.5; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(ys + 10, yf + 10, u); const zx = Math.sin(u * 6.283 * (2 + 2 * dikte)) * 9; i ? ctx.lineTo(kx + zx, yy) : ctx.moveTo(kx + zx, yy); } ctx.stroke(); }
  ctx.restore();
  // oppervlakte-epitheel
  ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 3; ctx.beginPath(); opp.forEach((p, i) => { const yy = lerp(yba, p[1], vastFrac); i ? ctx.lineTo(p[0], yy) : ctx.moveTo(p[0], yy); }); ctx.stroke();
  // afstoten: brokken functionele laag + bloed drijven de holte in (omhoog)
  if (los > 0.01) { for (let k = 0; k < 12; k++) { const bx = x - w / 2 + (k + 0.5) * w / 12 + (hash(k + 5) - 0.5) * 30; const lift = los * (40 + 80 * hash(k + 9)); const bw = w / 14, bh = fH * 0.6 * (0.6 + 0.4 * hash(k));
      ctx.save(); ctx.globalAlpha *= clamp(1.3 - los, 0, 1); ctx.beginPath(); ctx.ellipse(bx, yba - bh / 2 - lift, bw / 2, bh / 2, (hash(k) - 0.5) * 0.6, 0, 6.283); shape(ctx, rgba(BIO.slijm, 0.75), rgba(BIO.bloed, 0.7), 1.5); ctx.restore();
      ctx.beginPath(); ctx.arc(bx + 12, yba - lift * 0.7, 5, 0, 6.283); ctx.fillStyle = rgba(BIO.bloed, 0.8 * los); ctx.fill(); } }
  ctx.restore(); return { oppervlak: yf, basaal: yba, spier: ys };
}

// =====================================================================================
// MOLECULEN (voeding). Kleurtaal van de reeks: koolhydraat V.kh (zeshoek), eiwit V.ew (kraal), vet V.vt.
// ZETMEEL: amylose = keten van glucoseringen die een spiraal vormt, ± 6 glucose per winding (helix, linksdraaiend
// gezien langs de as, in 2D: een golf met diepte; ringen achteraan kleiner en donkerder). Bij vertering wikkelt
// de keten zich af en knippen enzymen hem in losse glucose. Bron: Berg, Biochemistry h. 11. Bekende fout: een rechte
// rij zeshoeken (dat is eerder cellulose).
// =====================================================================================
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; /* spreid: hoe ver de losse glucose uit elkaar gaat (1 = 3,7 r per stuk) */ ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: (p[2] + pos[i - 1][2]) / 2 - 0.01, lijn: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { const lf = 1 - clamp(los / 0.6, 0, 1);
    if (it.lijn) { if (lf <= 0.01) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.save(); ctx.globalAlpha *= lf * (0.55 + 0.45 * (it.z + 1) / 2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); return; }
    const p = pos[it.ring]; const k = 0.66 + 0.4 * (p[2] + 1) / 2; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * (p[2] + 1) / 2; hexagon(ctx, p[0], p[1], r * k, p[2] < -0.3 ? lighten(fill, -0.18) : fill, lighten(fill, 0.35)); ctx.restore(); });
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
// CELLULOSE: rechte ketens van glucose, elke volgende ring omgekeerd (β-1,4); ketens liggen evenwijdig en zijn
// met waterstofbruggen (stippellijntjes) tot een vezeltje gebonden. Bekende fout: losse groene bolletjes.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, col = (typeof V !== 'undefined' ? V.vezel : C.groen) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const dy = r * 2.1;
  for (let k = 0; k < ketens - 1; k++) { ctx.strokeStyle = rgba(C.teal, 0.6); ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(i * r * 2.2, k * dy + r * 0.6); ctx.lineTo(i * r * 2.2 + r * 0.4, (k + 1) * dy - r * 0.6); ctx.stroke(); } ctx.setLineDash([]); }
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.6; ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(off, k * dy); ctx.lineTo(off + (n - 1) * r * 2.2, k * dy); ctx.stroke();
    for (let i = 0; i < n; i++) hexagon(ctx, off + i * r * 2.2, k * dy + (i % 2 ? 1.5 : -1.5), r, rgba(col, 0.8), lighten(col, 0.3), 1.1, i % 2 ? Math.PI / 6 : 0); }
  ctx.restore();
}
// EIWIT dat vouwt. Recept: keten van aminozuren (kralen) vouwt in stukken: eerst α-helices (strakke spiraal,
// 3,6 aminozuren per winding) en β-strengen (zigzag, naast elkaar met waterstofbruggen), daarna de hele keten
// tot een compacte kluwen (tertiaire structuur). Vouwen is een morph, geen wissel. Bekende fout: een bol.
function _eiwitVorm(n, s) { // doelvorm: helix – lus – streng ⇄ streng (haarspeld) – lus – helix – staart; ± 320 × 200 bij s=1
  // Eén doorlopende gids; elk stuk heeft een soort. Helix: kleine as-stap + zijwaartse golf (3,6 per winding); streng: gestrekt.
  const G = [['h', [[-150, -86], [-84, -10]]], ['l', [[-84, -10], [-70, 34], [-30, 62]]], ['s', [[-30, 62], [100, 62]]], ['l', [[100, 62], [136, 40], [100, 16]]],
    ['s', [[100, 16], [-10, 16]]], ['l', [[-10, 16], [-44, -10], [-20, -50]]], ['h', [[-20, -50], [110, -86]]], ['l', [[110, -86], [156, -64], [164, -20], [150, 20]]]];
  const dense = []; G.forEach(([tp, pts]) => bioDicht(pts, 60).forEach(q => dense.push([q[0], q[1], tp])));
  const out = []; let acc = 1e9, hp = 0, prev = null;
  for (let i = 1; i < dense.length && out.length < n; i++) { const a2 = dense[i - 1], b = dense[i]; acc += Math.hypot(b[0] - a2[0], b[1] - a2[1]);
    const stap = b[2] === 'h' ? 9 : 26; if (acc < stap) continue; acc = 0; const an = Math.atan2(b[1] - a2[1], b[0] - a2[0]);
    let w = 0, z = 0, ax = 0; if (b[2] === 'h') { const ph = hp / 3.6 * 6.283; w = Math.sin(ph) * 20; z = Math.cos(ph); ax = z * 12; hp++; } else hp = 0;
    out.push([(b[0] + Math.cos(an) * ax - Math.sin(an) * w) * s, (b[1] + Math.sin(an) * ax + Math.cos(an) * w) * s, z]); }
  while (out.length < n) { const q = out[out.length - 1]; out.push([q[0] - 18 * s, q[1] + 18 * s, 0]); }
  return out;
}
function eiwitVouw(ctx, cx, cy, s, fold, kinds, o = {}) {
  const { a = 1, r = 12 * s, start = null, ess = false, t = 0 } = o; if (a <= 0.01) return; const n = kinds.length;
  const doel = _eiwitVorm(n, s); const begin = start || Array.from({ length: n }, (_, i) => [(i - n / 2) * r * 2.1, Math.sin(i * 0.55) * r * 2.4]);
  const pts = doel.map((d, i) => { const seg = (i < 10 || (i > 22 && i < 34)) ? 0 : 0.3; const f = ease(clamp((fold - seg) / (1 - seg), 0, 1)); const w = wander(i + 900, t, r * 0.15, 0.6); return [cx + lerp(begin[i][0], d[0], f) + w.x, cy + lerp(begin[i][1], d[1], f) + w.y, (d[2] || 0) * f]; });
  ctx.save(); ctx.globalAlpha *= a;
  if (fold > 0.85) { ctx.save(); ctx.globalAlpha *= (fold - 0.85) / 0.15; ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]); for (let i = 0; i < 6; i++) { const p = pts[13 + i], q2 = pts[25 - i]; if (p && q2) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); } } ctx.setLineDash([]); ctx.restore(); }
  ctx.strokeStyle = lighten(V.ew, 0.4); ctx.lineWidth = 2.2; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  pts.map((p, i) => i).sort((A, B) => pts[A][2] - pts[B][2]).forEach(i => { const p = pts[i]; ctx.save(); ctx.globalAlpha *= 0.75 + 0.25 * (p[2] + 1) / 2; bead(ctx, p[0], p[1], r * (0.82 + 0.18 * (p[2] + 1) / 2), kinds[i], { ess }); ctx.restore(); });
  ctx.restore(); return pts;
}
// MEMBRAAN: dubbele laag fosfolipiden langs een boog (een cel is rond). Kop (rond) + twee staarten ± 2× de kop-
// diameter, staarten naar binnen; een eiwit steekt aan beide kanten uit. Staarten in vetkleur: het is vet.
// Bekende fouten: rechte lijn; losse rijtjes bolletjes zonder staarten.
function membraanBoog(ctx, cx, cy, R, a0, a1, o = {}) {
  const { a = 1, s = 1, kop = C.er, staart = (typeof V !== 'undefined' ? V.vt : C.oker), eiwitten = [], eiwitCol = C.enzym } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kr = 6 * s, step = kr * 2.3, sl = kr * 2.2 * 2, gap = 2 * s; const n = Math.max(2, Math.floor(Math.abs(a1 - a0) * R / step));
  const blad = (Rk, naarBinnen) => { for (let i = 0; i <= n; i++) { const an = lerp(a0, a1, i / n); if (eiwitten.some(e => Math.abs(an - e) * R < kr * 3.2)) continue;
      const ux = Math.cos(an), uy = Math.sin(an); const hx = cx + ux * Rk, hy = cy + uy * Rk; const d = naarBinnen ? -1 : 1; const tx = -uy, ty = ux;
      ctx.strokeStyle = staart; ctx.lineWidth = 1.8 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + tx * sd * kr * 0.45, hy + ty * sd * kr * 0.45); ctx.quadraticCurveTo(hx + ux * d * sl * 0.5 + tx * sd * kr * 0.6, hy + uy * d * sl * 0.5 + ty * sd * kr * 0.6, hx + ux * d * sl + tx * sd * kr * 0.35, hy + uy * d * sl + ty * sd * kr * 0.35); ctx.stroke(); }
      ctx.beginPath(); ctx.arc(hx, hy, kr, 0, 6.283); shape(ctx, kop, lighten(kop, 0.3), 1); } };
  blad(R + sl + gap, true); blad(R - sl - gap, false);
  eiwitten.forEach(e => { const ux = Math.cos(e), uy = Math.sin(e); ctx.save(); ctx.translate(cx + ux * R, cy + uy * R); ctx.rotate(e); ctx.beginPath(); bioPad(ctx, [[-sl * 1.6, -kr * 2.2], [0, -kr * 2.8], [sl * 1.6, -kr * 2.2], [sl * 1.7, kr * 1.8], [0, kr * 2.6], [-sl * 1.7, kr * 1.8]], true); shape(ctx, rgba(eiwitCol, 0.95), lighten(eiwitCol, 0.3), 1.5); ctx.restore(); });
  ctx.restore();
}
// CEL (rond) met membraan, kern (± 1/3 van de diameter, niet in het midden), mitochondriën en rustige textuur.
function celRond(ctx, cx, cy, r, o = {}) {
  const { a = 1, t = 0, s = 1, a0 = 0, a1 = 6.283, organellen = true, eiwitten = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.55); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 14 * s, 0, 6.283); ctx.clip();
  for (let i = 0; i < 90; i++) { const an = hash(i * 5 + 1) * 6.283, rr = Math.sqrt(hash(i * 5 + 2)) * r; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 1.6 * s, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); }
  if (organellen) { const kx = cx + r * 0.18, ky = cy - r * 0.12; nucleus(ctx, kx, ky, r * 0.33, 1, t);
    for (let k = 0; k < 4; k++) { const an = 2.2 + k * 0.9, rr = r * 0.65; mitochondrion(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, Math.max(36, r * 0.26), an + 1.2, 1, 4, t); } }
  ctx.restore();
  membraanBoog(ctx, cx, cy, r - 7 * s, a0, a1, { s: s * 0.7, eiwitten });
  ctx.restore();
}

// =====================================================================================
// GRUTTO (rosse grutto, Limosa lapponica) in vlucht, zijaanzicht naar rechts. Recept: lijf ± 37–41 cm, snavel
// lang (8–10 cm) en licht opgewipt, lange spitse vleugels (spanwijdte ± 70–80 cm), poten steken in vlucht
// voorbij de staart uit; bovenkant gevlekt bruin, onderkant licht (najaar). Neerslag krachtig met gestrekte
// vleugel, opslag met gevouwen (gebogen) vleugel. Record: ± 13 500 km non-stop Alaska–Tasmanië in ± 11 dagen
// (2022). Bron: Sovon; Gill e.a. 2009. Bekende fouten: vogel-silhouet met kromme korte snavel; vleugel
// die alleen op en neer klapt zonder vouwen.
// =====================================================================================
function grutto(ctx, x, y, s, fase, o = {}) {
  const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1; const neer = ph < 0.55; const u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = neer ? lerp(1.15, -0.9, ease(u)) : lerp(-0.9, 1.15, ease(u)); // vleugelstand: + omhoog, − omlaag
  const vouw = neer ? 0 : Math.sin(u * Math.PI) * 0.9;                    // hand vouwt bij de opslag
  const rug = '#7E6248', buik = '#E9DCC6', vlek = '#4E3A28';
  const vleugel = (ver) => { // vanaf de schouder; geprojecteerde lengte ∝ |sin e|, zwaait iets naar achteren
    const L = 132 * Math.max(0.22, Math.abs(Math.sin(e))) * (ver ? 0.92 : 1); const up = e >= 0 ? -1 : 1;
    const arm = L * 0.42, hand = L * 0.58 * (1 - 0.45 * vouw);
    const sx = 18, sy = -6; const ax = sx - 10 - arm * 0.25, ay = sy + up * arm; const hk = up * (1 - vouw * 0.8);
    const tx = ax - hand * (0.35 + 0.5 * vouw), ty = ay + hk * hand;
    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.quadraticCurveTo(sx + 8, (sy + ay) / 2, ax + 4, ay); ctx.quadraticCurveTo((ax + tx) / 2 + 6, (ay + ty) / 2, tx, ty);
    ctx.quadraticCurveTo((ax + tx) / 2 - 22, (ay + ty) / 2 - up * 4, ax - 26, ay - up * 10); ctx.quadraticCurveTo(sx - 30, (sy + ay) / 2, sx - 22, sy); ctx.closePath();
    shape(ctx, ver ? lighten(rug, -0.25) : rug, lighten(rug, 0.25), 1.2);
    if (!ver) { ctx.strokeStyle = rgba(vlek, 0.7); ctx.lineWidth = 1.4; for (let k = 1; k < 6; k++) { const f = k / 6; const px = lerp(sx - 6, tx, f), py = lerp(sy, ty, f); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 12, py - up * 6); ctx.stroke(); } } };
  vleugel(true);
  // poten steken voorbij de staart uit
  ctx.strokeStyle = '#2E2E2E'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-34, 9); ctx.lineTo(-96, 15); ctx.moveTo(-34, 11); ctx.lineTo(-94, 20); ctx.stroke();
  // staart
  ctx.beginPath(); ctx.moveTo(-60, -5); ctx.lineTo(-86, -7); ctx.lineTo(-88, 5); ctx.lineTo(-60, 7); ctx.closePath(); shape(ctx, '#CDB898', '#7E6248', 1);
  ctx.strokeStyle = rgba(vlek, 0.6); ctx.lineWidth = 1.2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-70 - k * 6, -6); ctx.lineTo(-70 - k * 6, 6); ctx.stroke(); }
  // lijf: lichte buik, gevlekte rug
  const LIJF = [[64, -8], [40, -17], [0, -17], [-40, -11], [-66, -5], [-70, 1], [-60, 8], [-30, 15], [10, 17], [44, 11], [64, 2]];
  ctx.beginPath(); bioPad(ctx, LIJF, true); shape(ctx, buik, lighten(buik, 0.1), 1);
  ctx.save(); ctx.beginPath(); bioPad(ctx, LIJF, true); ctx.clip(); ctx.fillStyle = rug; ctx.beginPath(); bioPad(ctx, [[70, -20], [70, -6], [20, -6], [-30, -1], [-80, 0], [-80, -20]], true); ctx.fill();
  ctx.fillStyle = rgba(vlek, 0.7); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.ellipse(-60 + k * 9, -11 + (k % 2) * 3, 3, 1.7, 0.3, 0, 6.283); ctx.fill(); } ctx.restore();
  // kop, oog met lichte wenkbrauwstreep, lange licht opgewipte snavel met roze basis
  ctx.beginPath(); ctx.ellipse(70, -7, 14, 11, 0, 0, 6.283); shape(ctx, '#B89A78', '#D9C2A4', 1);
  ctx.strokeStyle = '#EDE2D0'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(58, -12); ctx.lineTo(80, -11); ctx.stroke();
  ctx.beginPath(); ctx.arc(73, -8, 2.4, 0, 6.283); ctx.fillStyle = '#121212'; ctx.fill();
  ctx.strokeStyle = '#2E2A26'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(82, -5); ctx.quadraticCurveTo(116, -3, 144, -12); ctx.stroke();
  ctx.strokeStyle = '#D99A90'; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(82, -5); ctx.lineTo(100, -4); ctx.stroke();
  vleugel(false);
  ctx.restore();
}

// =====================================================================================
// SKELETSPIERVEZEL. Recept: lange cilindrische cel, 10–100 µm dik, centimeters lang; dwarsstrepen (A- en I-banden)
// om de ± 2,5 µm; veel kernen, plat, tegen de rand. Bron: Junqueira h. 10. Bekende fouten: gestreept blokje;
// kern in het midden; één kern.
// =====================================================================================
function spierVezel(ctx, x, y, w, h, o = {}) {
  const { a = 1, seed = 1, streep = 12 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.8), BIO.spierL, 1.5);
  ctx.save(); roundRect(ctx, x, y - h / 2, w, h, h / 2); ctx.clip(); ctx.fillStyle = rgba('#5A2A26', 0.45);
  for (let xx = x + 6; xx < x + w; xx += streep) ctx.fillRect(xx, y - h / 2, streep * 0.45, h);
  for (let k = 0; k < Math.round(w / 90); k++) { const kx = x + 40 + k * 90 + hash(seed + k) * 30, top = hash(seed * 3 + k) > 0.5; ctx.beginPath(); ctx.ellipse(kx, top ? y - h / 2 + 5 : y + h / 2 - 5, 16, 3.5, 0, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.95), BIO.kernL, 1); }
  ctx.restore(); ctx.restore();
}
function spierBundel(ctx, x, y, w, o = {}) { const { a = 1, n = 4, h = 26 } = o; for (let i = 0; i < n; i++) spierVezel(ctx, x + (i % 2) * 14, y + i * (h + 6) - (n - 1) * (h + 6) / 2, w - (i % 2) * 14, h, { a, seed: i + 3 }); }

// =====================================================================================
// LEVER (vooraanzicht). Recept: grootste klier (± 1,5 kg); grote rechterkwab (links op het scherm), smallere
// linkerkwab die over de maag reikt; scherpe onderrand, bolle bovenkant tegen het middenrif; sikkelvormig band
// tussen de kwabben; galblaas als groen peertje onder de rechterkwab. Rood-bruin. Bron: Gray's Anatomy.
// Bekende fout: bruine vlek.
// =====================================================================================
function leverVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, gloed = 0, gal = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const V0 = [[-190, -40], [-150, -95], [-60, -115], [40, -105], [130, -80], [195, -55], [210, -40], [170, -20], [90, 5], [20, 30], [-40, 70], [-110, 95], [-170, 80], [-200, 30]];
  if (gloed > 0.01) { ctx.save(); ctx.shadowColor = BIO.leverL; ctx.shadowBlur = 40 * gloed; }
  ctx.beginPath(); bioPad(ctx, V0, true); shape(ctx, BIO.lever, BIO.leverL, 2.5); if (gloed > 0.01) ctx.restore();
  ctx.strokeStyle = rgba(BIO.leverL, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(5, -108); ctx.quadraticCurveTo(0, -40, -15, 40); ctx.stroke(); // sikkelband
  ctx.fillStyle = rgba('#F2C0A8', 0.12); ctx.beginPath(); ctx.ellipse(-90, -50, 70, 26, -0.2, 0, 6.283); ctx.fill(); // glans
  if (gal) { ctx.beginPath(); bioPad(ctx, [[-70, 60], [-58, 82], [-62, 110], [-80, 118], [-94, 104], [-88, 78]], true); shape(ctx, BIO.gal, lighten(BIO.gal, 0.3), 1.5); }
  ctx.restore();
}

// =====================================================================================
// DARMWAND in lengtedoorsnede (een buis, holte in het midden). Recept, van binnen naar buiten: slijmvlies
// (dikke darm: plooien met kliergaatjes, geen vlokken; dunne darm: vlokken), bindweefsel, kringspier (in
// lengtedoorsnede doorgesneden vezels: rij korte ovaaltjes), lengtespier (lijnen langs de buis), dun buitenvlies.
// Peristaltiek: de kringspier trekt samen achter de inhoud (wand dikker, holte smaller) en die golf loopt door.
// Bron: Junqueira h. 15. Bekende fouten: buis van twee lijnen; vezels die niet in de holte zitten.
// squeeze(x) → 0..1 knijpen op plek x.
// =====================================================================================
function darmwand(ctx, x0, x1, yc, r, squeeze = () => 0, o = {}) {
  const { a = 1, dikte = 46, vlokken = false, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const N = 120; const xs = Array.from({ length: N + 1 }, (_, i) => lerp(x0, x1, i / N));
  const ri = xs.map(xx => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)));
  const dk = xs.map((xx, i) => dikte * (1 + 0.6 * clamp(squeeze(xx), 0, 1)));
  for (const kant of [-1, 1]) {
    const lijn = (f) => xs.map((xx, i) => [xx, yc + kant * (ri[i] + dk[i] * f)]);
    const band = (f0, f1, fill) => { const A = lijn(f0), B = lijn(f1).reverse(); ctx.beginPath(); A.concat(B).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    band(0, 0.32, rgba('#C98A86', 0.8));           // slijmvlies
    band(0.32, 0.45, rgba('#8A6A6A', 0.6));        // bindweefsel
    band(0.45, 0.78, rgba(BIO.spier, 0.75));       // kringspier
    band(0.78, 0.96, rgba(BIO.spierL, 0.55));      // lengtespier
    band(0.96, 1.0, rgba('#E6D0C8', 0.7));         // buitenvlies
    // slijmvlies-oppervlak: plooien met kliergaatjes (of vlokken)
    ctx.strokeStyle = rgba('#F2D2C8', 0.9); ctx.lineWidth = 2; ctx.beginPath();
    xs.forEach((xx, i) => { const yy = yc + kant * (ri[i] - (vlokken ? Math.max(0, Math.sin(xx * 0.12)) * 9 : Math.abs(Math.sin(xx * 0.06)) * 4)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke();
    ctx.strokeStyle = rgba('#7A4A4A', 0.6); ctx.lineWidth = 2; for (let i = 3; i < N; i += 4) { const yy = yc + kant * ri[i]; ctx.beginPath(); ctx.moveTo(xs[i], yy); ctx.lineTo(xs[i], yy + kant * dk[i] * 0.24); ctx.stroke(); } // klieren
    // kringspier: doorgesneden vezels (ovaaltjes), lengtespier: lijnen
    ctx.fillStyle = rgba('#5A2A26', 0.5); for (let i = 1; i < N; i += 2) { const yy = yc + kant * (ri[i] + dk[i] * 0.615); ctx.beginPath(); ctx.ellipse(xs[i], yy, 3.5, dk[i] * 0.12, 0, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = rgba('#F2C0B0', 0.4); ctx.lineWidth = 1.2; for (const f of [0.83, 0.9]) { ctx.beginPath(); lijn(f).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  }
  ctx.restore(); return { ri: (xx) => r * (1 - 0.62 * clamp(squeeze(xx), 0, 1)) };
}
// ENZYM met actieve plek (goud). Recept: eiwit-kluwen met een holte die precies past bij één substraat; bij
// binden sluit de holte een beetje (induced fit). Een substraat dat niet past (cellulose voor amylase) glijdt eraf.
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, sluit = 0, col = C.enzym, seed = 4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const pts = []; for (let k = 0; k < 28; k++) { const u = k / 28 * 6.283; let rr = r * (1 + 0.08 * Math.sin(u * 5 + seed) + 0.05 * Math.sin(u * 9));
      const d = Math.abs(((u + Math.PI) % 6.283) - Math.PI); if (d < 0.5) rr *= lerp(0.45, 0.62, sluit) + (d / 0.5) * lerp(0.55, 0.38, sluit); pts.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, col, lighten(col, 0.3), 1.5);
  ctx.strokeStyle = rgba(lighten(col, 0.35), 0.55); ctx.lineWidth = 2; ctx.beginPath(); bioPad(ctx, [[-r * 0.6, -r * 0.2], [-r * 0.2, -r * 0.55], [r * 0.1, -r * 0.2], [-r * 0.25, r * 0.15], [-r * 0.1, r * 0.5]], false); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.28, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  ctx.restore();
}

// =====================================================================================
// ===== Toegevoegd 22 okt 2026 voor Sekse, gender en diversiteit 1.1 =====
// ==============================================================================
// ECHO van ± 20 weken (2D, sagittaal profiel). Recept: waaiervormig beeld (sector ± 70°), zwart = vocht
// (vruchtwater), grijs korrelig = weke delen, helder wit = bot en grensvlakken. Bij 20 weken: schedel als heldere
// ring, profiel (voorhoofd, neusbotje, lippen, kin), wervelkolom als dubbele rij heldere kraaltjes langs de rug,
// ribben als korte heldere streepjes, hart in de borst (± 2 cm) dat zichtbaar klopt (± 140/min), armpje met
// handje vaak bij het gezicht. Baarmoederwand als heldere band aan de rand. Bron: ISUOG-richtlijn 20-wekenecho;
// RIVM 'Het 20 wekenonderzoek'. Bekende fouten: losse ellipsen; kind 'getekend' met lijnen i.p.v. echo-korrel.
// (x, y) = top van de waaier (transducer); R = diepte; o.hl = {hoofd, armen, hart} 0..1 oplichten; t = tijd.
function _echoKorrel(ctx, pts, n, seed, helder, r = 1.6) { for (let i = 0; i < n; i++) { const p = pts(hash(seed + i * 3), hash(seed + i * 3 + 1)); if (!p) continue; const v = hash(seed + i * 3 + 2); ctx.fillStyle = `rgba(${helder},${helder},${helder + 6},${0.18 + 0.5 * v})`; ctx.fillRect(p[0], p[1], r + v * 1.6, r * 0.7 + v); } }
function echoBeeld(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, hl = {}, s = 1, open = 1.22 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const a0 = Math.PI / 2 - open / 2, a1 = Math.PI / 2 + open / 2;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.fillStyle = '#050608'; ctx.fill(); ctx.save(); ctx.clip();
  // baarmoederwand: heldere korrelige band onderaan en bovenaan
  const band = (r0, r1, n, sd) => _echoKorrel(ctx, (u, v) => { const an = lerp(a0, a1, u), rr = lerp(r0, r1, v); return [x + Math.cos(an) * rr, y + Math.sin(an) * rr]; }, n, sd, 150);
  band(R * 0.06, R * 0.16, 500, 11); band(R * 0.86, R * 0.99, 700, 17);
  // kind: lokaal stelsel, midden (cx, cy), schaal k; hoofd links, rug boven, gezicht naar links-onder
  const cx = x + R * 0.04, cy = y + R * 0.52, k = R / 520 * s; const P = (px, py) => [cx + px * k, cy + py * k];
  ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k);
  const romp = [[-40, -62], [60, -74], [170, -60], [250, -20], [262, 40], [215, 88], [120, 98], [20, 92], [-40, 70]];
  const hoofd = [[-100, -100], [-30, -86], [-10, -30], [-30, 40], [-80, 78], [-128, 84], [-150, 70], [-170, 52], [-176, 34], [-196, 22], [-188, 4], [-200, -6], [-206, -30], [-196, -66], [-160, -96]];
  for (const [vorm, dicht] of [[romp, 900], [hoofd, 800]]) { ctx.beginPath(); bioPad(ctx, vorm, true); ctx.fillStyle = 'rgba(70,74,80,0.55)'; ctx.fill(); ctx.save(); ctx.clip(); const xs = vorm.map(p => p[0]), ys = vorm.map(p => p[1]), mx = Math.min(...xs), Mx = Math.max(...xs), my = Math.min(...ys), My = Math.max(...ys);
    _echoKorrel(ctx, (u, v) => [lerp(mx, Mx, u), lerp(my, My, v)], dicht, vorm === romp ? 31 : 37, 120, 2.2); ctx.restore(); }
  const bot = (pts, w, al) => { ctx.strokeStyle = `rgba(236,238,242,${al})`; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const lh = (n) => 0.75 + 0.25 * (hl[n] || 0);
  // schedel (heldere ring) + profiel
  ctx.save(); ctx.globalAlpha *= lh('hoofd'); bot([[-196, -66], [-160, -96], [-100, -100], [-40, -80], [-18, -30], [-34, 30], [-80, 70]], 7, 0.9);
  bot([[-206, -30], [-200, -8], [-188, 4], [-196, 22], [-176, 34], [-170, 52], [-150, 70]], 4, 0.75); bot([[-196, 12], [-186, 6]], 5, 0.95); // neusbotje
  ctx.beginPath(); ctx.ellipse(-150, -20, 13, 10, 0, 0, 6.283); ctx.fillStyle = 'rgba(10,10,12,0.9)'; ctx.fill(); bot([[-118, 40], [-90, 60], [-60, 66]], 5, 0.7); // oogkas, kaak
  if ((hl.hoofd || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.hoofd * 0.45; ctx.beginPath(); bioPad(ctx, hoofd, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } ctx.restore();
  // wervelkolom en ribben
  for (let i = 0; i < 20; i++) { const u = i / 19, px = lerp(-24, 236, u), py = -58 - 16 * Math.sin(u * 3) + u * 40; for (const d of [0, 12]) { ctx.fillStyle = 'rgba(236,238,242,0.85)'; ctx.fillRect(px - 4, py + d, 8, 6); } }
  for (let i = 0; i < 6; i++) bot([[20 + i * 22, -48], [12 + i * 22, 0], [22 + i * 22, 50]], 3, 0.35);
  // hart: kloppende vierkamer-vorm in de borst
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.3)) ** 2, hh = 1 + 0.12 * slag;
  ctx.save(); ctx.translate(70, 22); ctx.scale(hh, hh); ctx.globalAlpha *= lh('hart'); ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, -0.4, 0, 6.283); ctx.fillStyle = 'rgba(8,8,10,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,222,228,0.9)'; ctx.lineWidth = 4; ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 4); ctx.lineTo(26, -6); ctx.moveTo(0, -22); ctx.lineTo(4, 22); ctx.stroke();
  if ((hl.hart || 0) > 0.01) { ctx.globalAlpha *= hl.hart; ctx.beginPath(); ctx.ellipse(0, 0, 40, 34, -0.4, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore();
  // armpje met handje bij het gezicht
  ctx.save(); ctx.globalAlpha *= lh('armen'); const arm = [[-20, 46], [-60, 104], [-120, 108], [-160, 92]]; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = 'rgba(80,84,92,0.9)'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.stroke();
  bot([[-22, 50], [-58, 100]], 5, 0.85); bot([[-64, 104], [-118, 106]], 4, 0.8); for (let f = 0; f < 4; f++) bot([[-156, 86 + f * 5], [-176, 80 + f * 7]], 3, 0.7);
  if ((hl.armen || 0) > 0.01) { ctx.globalAlpha *= hl.armen * 0.6; ctx.beginPath(); bioPad(ctx, arm, false); ctx.strokeStyle = C.goud; ctx.lineWidth = 36; ctx.globalAlpha *= 0.35; ctx.stroke(); } ctx.restore();
  bot([[200, 70], [270, 110], [300, 90]], 5, 0.6); // dijbeen/been aan de rand
  ctx.restore();
  // schaduw en diepteverloop
  const g = ctx.createRadialGradient(x, y, R * 0.2, x, y, R); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(x - R, y, 2 * R, R);
  ctx.restore(); ctx.strokeStyle = 'rgba(120,128,140,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R, a0, a1); ctx.closePath(); ctx.stroke();
  ctx.restore(); return { hart: P(70, 22), hoofd: P(-110, -10), arm: P(-120, 106) };
}

// EMBRYO van ± 6 weken na de bevruchting (Carnegie-stadium 15–17, kop-romplengte ± 7–12 mm), zijaanzicht.
// Recept: C-vormig; groot hoofd (± de helft van de lengte) met voorhersenblaas; oog als donker pigmentringetje met
// lens; oorputje achter de kieuwbogen; 3 kieuwboogjes onder het hoofd; grote hartbult en daaronder de leverbult;
// armknop (al een peddel) ter hoogte van het hart, kleinere beenknop lager; rij somieten (blokjes) langs de rug;
// staartje dat naar binnen krult. Huid doorzichtig, roze. De aanleg van de geslachtsklieren ligt binnenin tegen de
// achterwand van de buikholte (genitale lijst, naast de oernier). Bron: Sadler, Langman's Embryology h. 6 en 16;
// Virtual Human Embryo (Carnegie 16). Bekende fouten: kommavorm met een stip; ledematen als vingers; aanleg buiten op het lijf.
// Oorsprong = midden; ± 300 × 400 bij s = 1. o.glow = aanleg laten oplichten.
function embryoEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const huid = '#EDB9A4', rand = '#C9877A', diep = '#D69A8A';
  const lijf = [[-70, -170], [20, -208], [104, -182], [150, -112], [160, -24], [150, 58], [118, 124], [72, 166], [28, 182], [-8, 166], [-34, 128], [-52, 78], [-70, 30], [-98, -14], [-90, -52], [-108, -72], [-124, -112], [-112, -152]];
  // staart
  ctx.strokeStyle = huid; ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, [[30, 176], [-14, 196], [-44, 182], [-50, 156]], false); ctx.stroke(); ctx.lineWidth = 12; ctx.beginPath(); bioPad(ctx, [[-44, 182], [-56, 156], [-46, 136]], false); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, rgba(huid, 0.96), rand, 2.5);
  ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  // voorhersenblaas en hersenblazen als zachtere vlakken
  ctx.fillStyle = rgba('#F6CDBC', 0.8); ctx.beginPath(); ctx.ellipse(-30, -150, 70, 50, -0.3, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(70, -150, 52, 44, 0.4, 0, 6.283); ctx.fill();
  // hart (klopt) en lever door de huid
  const slag = Math.max(0, Math.sin(t * 2 * Math.PI * 2.4)) ** 2; ctx.fillStyle = rgba('#C8463C', 0.55 + 0.2 * slag); ctx.beginPath(); ctx.ellipse(-62, -18, 34 + 3 * slag, 30 + 3 * slag, 0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = rgba('#9A3E36', 0.4); ctx.beginPath(); ctx.ellipse(-44, 46, 34, 36, 0, 0, 6.283); ctx.fill();
  // somieten langs de rug
  const rug = bioDicht([[96, -150], [138, -80], [146, 0], [132, 74], [100, 136], [56, 168]], 26); rug.forEach((p, i) => { if (i % 1) return; const q = rug[Math.min(rug.length - 1, i + 1)], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0] - Math.sin(an) * 14, p[1] + Math.cos(an) * 14); ctx.rotate(an); roundRect(ctx, -5, -9, 10, 18, 4); shape(ctx, rgba(diep, 0.6), null); ctx.restore(); });
  // aanleg geslachtsklier: langwerpige lijst tegen de achterwand van de buik
  const gp = [[86, 30], [96, 70], [90, 108]]; ctx.strokeStyle = rgba(C.oker, 0.7); ctx.lineWidth = 10; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke();
  if (glow > 0.01) { ctx.save(); ctx.globalAlpha *= glow; ctx.strokeStyle = rgba(C.goud, 0.45 + 0.15 * Math.sin(t * 3)); ctx.lineWidth = 26; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.strokeStyle = C.goud; ctx.lineWidth = 9; ctx.beginPath(); bioPad(ctx, gp, false); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  // kieuwboogjes
  ctx.strokeStyle = rand; ctx.lineWidth = 3; [[-112, -96, 26], [-104, -74, 22], [-94, -56, 17]].forEach(([bx, by, r]) => { ctx.beginPath(); ctx.arc(bx + 24, by, r, 2.4, 3.9); ctx.stroke(); });
  // oog en oorputje
  _bioCirc(ctx, -66, -128, 15, rgba('#5A3A34', 0.85)); _bioCirc(ctx, -66, -128, 7, rgba('#F6E6DC', 0.9)); ctx.beginPath(); ctx.arc(-6, -96, 7, 0, 6.283); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke();
  // armknop (peddel) en beenknop
  ctx.save(); ctx.translate(14, 12); ctx.rotate(1.9); ctx.beginPath(); ctx.ellipse(28, 0, 40, 22, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.save(); ctx.translate(58, 128); ctx.rotate(2.3); ctx.beginPath(); ctx.ellipse(22, 0, 30, 17, 0, 0, 6.283); shape(ctx, huid, rand, 2.5); ctx.restore();
  ctx.restore();
}

// ZAADBAL in doorsnede. Recept: stevig kapsel (tunica albuginea); vanuit het mediastinum (één zijde) lopen tussen-
// schotten naar binnen die ± 250 lobjes maken; elk lobje vol opgerolde zaadbuisjes, in doorsnede ronde buisjes
// (± 0,2 mm) met een wand van Sertolicellen en zaadcellen in wording (rijper naar het midden) en staartjes in de
// holte; daartussen bindweefsel met groepjes Leydigcellen (maken testosteron) bij haarvaten. Bron: Junqueira h. 21.
// Bekende fouten: golflijnen of blokjes; buisjes als lege ringen.
function _zaadbuisPos(key, rx, ry, rb) { const c = (_zaadbuisPos.c = _zaadbuisPos.c || {}); if (c[key]) return c[key]; const out = []; let i = 0;
  while (out.length < 400 && i < 6000) { i++; const px = (hash(i * 7 + 1) * 2 - 1) * rx, py = (hash(i * 7 + 2) * 2 - 1) * ry; if ((px / (rx - rb)) ** 2 + (py / (ry - rb)) ** 2 > 1) continue; if (out.some(q => Math.hypot(q[0] - px, q[1] - py) < rb * 2.15)) continue; out.push([px, py]); }
  return (c[key] = out); }
function zaadbalDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, t = 0, rb = Math.max(9, rx * 0.11), leydig = 0, col = C.teal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const omtrek = Array.from({ length: 36 }, (_, k) => { const an = k / 36 * 6.283; return [x + Math.cos(an) * rx, y + Math.sin(an) * ry * (1 + 0.04 * Math.sin(an * 2))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#B9A08A', 0.35), lighten(col, 0.2), Math.max(2.5, rx * 0.035)); ctx.save(); ctx.clip();
  ctx.strokeStyle = rgba('#D8C8B4', 0.35); ctx.lineWidth = Math.max(1, rx * 0.012); for (let k = 0; k < 7; k++) { const an = -1.2 + k * 0.62; ctx.beginPath(); ctx.moveTo(x + rx * 0.72, y); ctx.lineTo(x + Math.cos(Math.PI + an) * rx * 1.1 + rx * 0.5, y + Math.sin(an) * ry * 1.2); ctx.stroke(); }
  const pos = _zaadbuisPos(Math.round(rx) + '_' + Math.round(ry) + '_' + Math.round(rb), rx, ry, rb);
  pos.forEach(([px, py], i) => { const bx = x + px, by = y + py, r = rb * (0.92 + 0.12 * hash(i + 3));
    ctx.beginPath(); ctx.arc(bx, by, r, 0, 6.283); shape(ctx, rgba('#E8D2C0', 0.9), rgba('#8E6E5A', 0.9), Math.max(1, rb * 0.08));
    if (r > 7) { for (let l = 0; l < 2; l++) { const rr = r * (0.78 - l * 0.2), m = Math.max(6, Math.round(rr * 0.9)); for (let j = 0; j < m; j++) { const an = j / m * 6.283 + l * 0.3 + i; _bioCirc(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr, Math.max(0.9, r * (0.09 - l * 0.02)), l ? rgba(C.paars, 0.6) : rgba('#6A4C78', 0.7)); } }
      ctx.beginPath(); ctx.arc(bx, by, r * 0.34, 0, 6.283); ctx.fillStyle = rgba('#1A2232', 0.75); ctx.fill(); ctx.strokeStyle = rgba('#F2F2EE', 0.6); ctx.lineWidth = Math.max(0.7, r * 0.04);
      for (let j = 0; j < 4; j++) { const an = j * 1.6 + i + t * 0.8; ctx.beginPath(); ctx.moveTo(bx + Math.cos(an) * r * 0.3, by + Math.sin(an) * r * 0.3); ctx.quadraticCurveTo(bx + Math.cos(an + 0.6) * r * 0.12, by + Math.sin(an + 0.6) * r * 0.12, bx + Math.cos(an + 1.3) * r * 0.05, by + Math.sin(an + 1.3) * r * 0.05); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.arc(bx, by, r * 0.38, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.5); ctx.fill(); } });
  // Leydigcellen tussen de buisjes
  if (leydig > 0.01) pos.forEach(([px, py], i) => { if (i % 3) return; const an = hash(i + 9) * 6.283; _bioCirc(ctx, x + px + Math.cos(an) * rb * 1.08, y + py + Math.sin(an) * rb * 1.08, Math.max(1.5, rb * 0.16), rgba(C.goud, 0.85 * leydig)); });
  ctx.restore(); ctx.restore();
}

// NIER met BIJNIER (vooraanzicht, linkernier: hilus naar rechts op het scherm = naar het midden van het lichaam).
// Recept: boonvorm ± 11 × 6 cm; schors (buitenrand, korrelig) en merg met 8–12 piramides; nierbekken met urine-
// leider; slagader en ader bij de hilus. Bijnier ± 5 cm, plat, halvemaan- tot driehoekig kapje op de bovenpool;
// buiten schors (geel, maakt cortisol, aldosteron en mannelijke hormonen), binnen merg (rood-bruin, adrenaline).
// Bron: Gray's Anatomy; Junqueira h. 20. Bekende fouten: bijnier als hoedje los erboven; nier als effen vlek.
function nierBijnier(ctx, x, y, s = 1, o = {}) {
  const { a = 1, glow = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const nier = [[0, -110], [50, -100], [78, -60], [72, -26], [54, 0], [72, 28], [76, 62], [46, 104], [0, 112], [-40, 96], [-62, 50], [-66, 0], [-62, -52], [-40, -96]];
  // bloedvaten en urineleider bij de hilus (rechts)
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C8463C'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(60, -16); ctx.lineTo(150, -24); ctx.stroke(); ctx.strokeStyle = '#4A6CA8'; ctx.beginPath(); ctx.moveTo(60, 8); ctx.lineTo(150, 6); ctx.stroke();
  ctx.strokeStyle = '#E8D9A0'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(56, 30); ctx.quadraticCurveTo(80, 90, 70, 190); ctx.stroke();
  ctx.beginPath(); bioPad(ctx, nier, true); shape(ctx, '#9E4A3E', '#D88E7A', 3); ctx.save(); ctx.beginPath(); bioPad(ctx, nier, true); ctx.clip();
  ctx.fillStyle = rgba('#7A3428', 0.9); for (let k = 0; k < 8; k++) { const an = Math.PI * 0.62 + k * 0.32; const bx = 66 + Math.cos(an) * 38, by = Math.sin(an) * 64 * 1.1; ctx.save(); ctx.translate(bx, by); ctx.rotate(an + Math.PI); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(44, 0); ctx.lineTo(0, 14); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = rgba('#E8D9A0', 0.85); ctx.beginPath(); ctx.ellipse(46, 4, 16, 30, 0, 0, 6.283); ctx.fill(); ctx.restore();
  // bijnier op de bovenpool
  const bij = [[-46, -96], [-30, -150], [4, -178], [36, -150], [54, -104], [20, -112]];
  const g = glow * (0.75 + 0.25 * Math.sin(t * 4)); ctx.beginPath(); bioPad(ctx, bij, true); shape(ctx, rgba('#E2B64A', 0.75 + 0.25 * g), '#F2D27A', 2.5);
  ctx.beginPath(); bioPad(ctx, [[-22, -112], [-12, -142], [6, -158], [24, -138], [32, -110], [6, -118]], true); ctx.fillStyle = rgba('#8A4A3A', 0.85); ctx.fill();
  if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * 0.6; ctx.beginPath(); bioPad(ctx, bij, true); ctx.strokeStyle = C.goud; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { bijnier: [x + 4 * s, y - 140 * s] };
}

// KIP (leghen), zijaanzicht naar rechts. Recept: romp eivormig en schuin (achter hoger), ± 2,5× de koplengte; staart-
// veren steil omhoog; hals met halsveren die over de schouder vallen; kleine kop; enkelvoudige kam met 5 punten, lellen
// onder de snavel, oorlel; gele, korte snavel; vleugel tegen de romp; poten geel geschubd, 3 tenen naar voren, 1 naar
// achter. Kleur: roodbruin met donkerdere vleugel en staart. Bron: foto's leghen (ISA Brown). Bekende fouten: bolletje
// met cirkelkop; kam als twee rondjes.
function kipEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#B5653A' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const donker = _bioDonker(kleur, 0.3), licht = lighten(kleur, 0.18), poot = '#E2B64A', pik = Math.max(0, Math.sin(t * 1.3)) ** 6 * 6;
  ctx.strokeStyle = poot; ctx.lineWidth = 7; [[-6, 52], [22, 52]].forEach(([px, py], i) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2, py + 54); ctx.stroke(); ctx.lineWidth = 4; [[-22, 6], [0, 10], [20, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px + 2 + dx, py + 54 + dy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(px + 2, py + 54); ctx.lineTo(px - 12, py + 50); ctx.stroke(); ctx.lineWidth = 7; });
  ctx.beginPath(); bioPad(ctx, [[-120, -78], [-104, -128], [-78, -150], [-64, -112], [-56, -60]], true); shape(ctx, _bioDonker(kleur, 0.45), null); // staart
  ctx.beginPath(); bioPad(ctx, [[-96, -66], [-60, -14], [10, 14], [70, 6], [96, -22], [92, -60], [60, -82], [0, -76], [-60, -70]], true); shape(ctx, kleur, null); // romp
  ctx.beginPath(); bioPad(ctx, [[-70, 20], [-30, 52], [30, 62], [80, 30], [96, -22], [10, 14]], true); shape(ctx, kleur, null);
  ctx.beginPath(); bioPad(ctx, [[-56, -40], [-10, -40], [40, -24], [44, 0], [0, 6], [-50, -10]], true); shape(ctx, donker, null); // vleugel
  ctx.strokeStyle = rgba(_bioDonker(kleur, 0.55), 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 18, -6); ctx.lineTo(-30 + i * 18, 4); ctx.stroke(); }
  ctx.save(); ctx.translate(76, -64); ctx.rotate(pik * 0.02);
  ctx.beginPath(); bioPad(ctx, [[-20, 24], [-10, -30], [8, -58], [30, -60], [38, -40], [26, 0], [24, 30]], true); shape(ctx, licht, null); // hals
  ctx.strokeStyle = rgba('#E8C27A', 0.7); ctx.lineWidth = 2.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-4 + i * 5, -30 + i * 6); ctx.quadraticCurveTo(-8 + i * 5, 0 + i * 3, -14 + i * 6, 22); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(24, -66, 20, 17, 0.2, 0, 6.283); shape(ctx, licht, null); // kop
  ctx.beginPath(); ctx.moveTo(40, -70); ctx.lineTo(60, -62); ctx.lineTo(41, -58); ctx.closePath(); shape(ctx, '#E8C060', null); // snavel
  ctx.fillStyle = '#D8473C'; ctx.beginPath(); ctx.moveTo(6, -78); for (let k = 0; k < 5; k++) { const kx = 8 + k * 7; ctx.lineTo(kx, -98 + (k === 2 ? -4 : Math.abs(k - 2) * 3)); ctx.lineTo(kx + 4, -82); } ctx.lineTo(42, -78); ctx.quadraticCurveTo(24, -86, 6, -78); ctx.fill(); // kam
  ctx.beginPath(); ctx.ellipse(40, -48, 6, 10, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -60, 5, 6, 0, 0, 6.283); ctx.fillStyle = '#F2E8D8'; ctx.fill(); // lel + oorlel
  _bioCirc(ctx, 30, -70, 4.2, '#E8A040'); _bioCirc(ctx, 31, -70, 2.2, '#121A26');
  ctx.restore(); ctx.restore();
}
function _bioCirc(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _bioDonker(hex, f) { const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(v * (1 - f)).toString(16).padStart(2, '0'); return '#' + m(r) + m(g) + m(b); }

// ZEESCHILDPAD (onechte karetschildpad), bovenaanzicht, kop naar boven. Recept: rugschild hartvormig, ± 1 m;
// 5 middelste schilden (vertebraal), 5 paar ribschilden, rand van kleine schilden; voorvinnen lang en sikkel-
// vormig (± 1/2 van de schildlengte), achtervinnen kort en rond; kop groot met snavel en schubben. Roodbruin.
// Legt ± 100 eieren (pingpongbal, ± 4 cm) in een kuil in het zand; temperatuur van het nest bepaalt de sekse
// (warmer dan ± 29 °C vooral vrouwtjes). Bron: NOAA Fisheries 'Loggerhead turtle'. Bekende fout: landschildpad met
// pootjes en een bolle koepel. o.vin = 0..1 slag van de voorvinnen.
function zeeschildpad(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vin = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const huid = '#C9A27A', schub = '#8E6A4A', schild = '#8A4A2A', naad = '#E2B07A';
  for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(-0.25 + vin * 0.35); ctx.beginPath(); bioPad(ctx, [[40, -40], [120, -66], [178, -40], [190, -6], [140, -10], [60, -6]], true); shape(ctx, huid, schub, 2); ctx.restore();
    ctx.save(); ctx.scale(sx, 1); ctx.beginPath(); bioPad(ctx, [[40, 80], [80, 96], [92, 124], [64, 128], [30, 104]], true); shape(ctx, huid, schub, 2); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, [[-22, -96], [-30, -128], [-16, -158], [16, -158], [30, -128], [22, -96]], true); shape(ctx, huid, schub, 2); _bioCirc(ctx, -16, -136, 4, '#2A1C16'); _bioCirc(ctx, 16, -136, 4, '#2A1C16');
  const rug = [[0, -104], [50, -96], [86, -60], [96, 0], [80, 60], [44, 108], [0, 128], [-44, 108], [-80, 60], [-96, 0], [-86, -60], [-50, -96]];
  ctx.beginPath(); bioPad(ctx, rug, true); shape(ctx, schild, naad, 3); ctx.save(); ctx.beginPath(); bioPad(ctx, rug, true); ctx.clip();
  ctx.strokeStyle = naad; ctx.lineWidth = 2.5; const vy = [-96, -54, -12, 32, 76, 120];
  for (let i = 0; i < 5; i++) { ctx.beginPath(); bioPad(ctx, [[-22, vy[i]], [22, vy[i]], [26, (vy[i] + vy[i + 1]) / 2], [22, vy[i + 1]], [-22, vy[i + 1]], [-26, (vy[i] + vy[i + 1]) / 2]], true); ctx.stroke(); }
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(sx * 26, vy[i] + 20); ctx.lineTo(sx * 92, vy[i] + 20 + i * 4); ctx.stroke(); }
  ctx.beginPath(); for (let k = 0; k <= 60; k++) { const p = bioPunt(bioDicht(rug.concat([rug[0]]), 120), k / 60); const [px, py] = p; ctx.lineTo(px * 0.86, py * 0.86); } ctx.stroke();
  ctx.restore(); ctx.restore();
}
// eieren in een nestkuil in het zand (pingpongbal-groot, wit, iets ingedeukt)
function schildpadNest(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 46 * s, 0, 0, 6.283); shape(ctx, '#8A7656', '#B8A27A', 2);
  for (let i = 0; i < n; i++) { const px = x + ((i % 5) - 2) * 34 * s + (Math.floor(i / 5) ? 17 * s : 0), py = y - 6 * s + Math.floor(i / 5) * 22 * s; ctx.beginPath(); ctx.ellipse(px, py, 16 * s, 15 * s, 0, 0, 6.283); shape(ctx, '#F4EFE4', '#CFC6B2', 1.5); }
  ctx.restore(); }

// KROKODIL (nijlkrokodil), zijaanzicht naar rechts. Recept: lijf laag en lang; kop ± 1/7 van de totale lengte, smalle
// lange snuit met neusgaten op de punt; ogen en neus hoog op de kop (kan onder water liggen met alleen die erboven);
// in een gesloten bek steken onder- en bovententanden zichtbaar langs elkaar (4e ondertand past in een inkeping);
// rugschilden (osteodermen) in rijen met kammen; staart ± de helft van de lengte, zijdelings plat met dubbele kam die
// verderop enkel wordt; poten kort en zijwaarts, achterpoten groter. Bron: foto's nijlkrokodil. Bekende fout: draak.
function krokodilEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, kleur = '#5E6E44' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const buik = '#B8AE78', donker = _bioDonker(kleur, 0.3), zw = Math.sin(t * 1.1) * 4;
  const poot = (px, py, w, an) => { ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.beginPath(); bioPad(ctx, [[-w * 0.5, -6], [w * 0.6, -4], [w * 0.7, 28], [w * 1.0, 40], [-w * 0.2, 42], [-w * 0.4, 30]], true); shape(ctx, donker, null); ctx.restore(); };
  poot(-70, 10, 40, 0.15); poot(70, 8, 30, -0.1);
  const lijf = [[-280, 2 + zw], [-200, -10 + zw * 0.6], [-110, -22], [-30, -30], [60, -28], [120, -24], [168, -26], [230, -18], [290, -12], [300, -2], [232, 4], [170, 14], [110, 22], [30, 30], [-60, 30], [-140, 22], [-220, 14 + zw * 0.6]];
  ctx.beginPath(); bioPad(ctx, lijf, true); shape(ctx, kleur, null); ctx.save(); ctx.beginPath(); bioPad(ctx, lijf, true); ctx.clip();
  ctx.fillStyle = buik; ctx.fillRect(-300, 16, 620, 30); ctx.strokeStyle = rgba(donker, 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const px = -200 + i * 14; ctx.beginPath(); ctx.moveTo(px, -30); ctx.lineTo(px, 18); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = donker; for (let i = 0; i < 22; i++) { const px = -250 + i * 18, top = px < -120 ? -12 + (px + 250) * 0.07 : (px < 120 ? -26 - Math.sin((px + 120) / 240 * Math.PI) * 6 : -24 + (px - 120) * 0.06); const h = px < -100 ? 12 : 9; ctx.beginPath(); ctx.moveTo(px - 6, top + 2); ctx.lineTo(px, top - h); ctx.lineTo(px + 6, top + 2); ctx.fill(); }
  ctx.fillStyle = '#F2EAD8'; [[208, 6], [224, 6], [246, 4], [266, 2], [284, 1]].forEach(([tx, ty], i) => { ctx.beginPath(); ctx.moveTo(tx - 3, ty); ctx.lineTo(tx, ty + (i % 2 ? -8 : 9)); ctx.lineTo(tx + 3, ty); ctx.fill(); });
  ctx.strokeStyle = rgba('#1A1410', 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(170, 8); ctx.quadraticCurveTo(240, 6, 298, -2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(160, -30, 13, 9, 0, 0, 6.283); shape(ctx, kleur, null); _bioCirc(ctx, 160, -30, 6, '#D8C060'); ctx.fillStyle = '#121A26'; ctx.fillRect(159, -35, 2, 10);
  _bioCirc(ctx, 292, -14, 3.5, '#1A1410');
  ctx.restore();
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: zaadbalweefsel, T-helpercel, hiv, bacterie
// =====================================================================================
// =====================================================================================
// obj_man_afweer.js — objecten voor lib_bio.js: zaadbalweefsel, T-helpercel, hiv-deeltje, staafbacterie.
// Vereist: lib_bio.js (BIO, bioPad, bloedvat) en lib.js-hulpjes (C, rgba, lighten, hash, clamp, lerp, ease,
// shape, roundRect). Stijl: vlakke vullingen, rand 1–2 px lichter, geen tekst, alles deterministisch via hash(),
// animatie alleen via t (seconden).
// =====================================================================================

// =====================================================================================
// ZAADBALWEEFSEL (doorsnede testis, lichtmicroscoop). Recept (mens): zaadbuisjes rond, diameter 180–200 µm;
// wand = basale membraan + 1–2 lagen platte peritubulaire (myoïde) cellen, samen ± 4–6 µm; kiemepitheel 60–80 µm
// dik, lumen ± 40–60 µm. Sertolicellen ± 1 per 25–30 µm omtrek: hoge zuil van basale membraan tot lumen, bleek
// cytoplasma, kern bij de basis (± 9 × 6 µm, bleek, ovaal/peervormig, groot kernlichaampje), lange as radiaal.
// Van buiten naar binnen: spermatogonia op de basale membraan (kern ± 6–7 µm, donker), primaire spermatocyten
// in de middenlaag (cel 15–18 µm, grootste kernen ± 10 µm, chromatine als draden), ronde spermatiden (cel ± 8 µm,
// kern ± 5 µm, bleek), langgerekte spermatiden aan het lumen (kop ± 5 × 2,5 µm, kop naar de basis), staarten in
// het lumen. Interstitium smal; Leydigcellen (15–20 µm, veelhoekig, eosinofiel = warm/oker, ronde kern ± 6 µm,
// excentrisch) in groepjes bij een haarvat (Ø 6–8 µm, rode bloedcellen 7,5 µm). Schaal hier ± 1,5 px/µm bij
// w = 720, h = 420. Weinig productie: kiemepitheel dunner, minder spermatiden en staarten, lumen wijder.
// Bron: Junqueira's Basic Histology h. 21 (fig. 21-3/21-5); Ross & Pawlina, Histology h. 22.
// Bekende fouten: buisje als ring met stipjes; Sertolicellen als losse bolletjes; spermatocyten even groot als
// spermatogonia; Leydigcellen ín het buisje; zaadcellen met kop naar het lumen; honingraat van buisjes.
// =====================================================================================
const _ZB_BUIS = [ // [x, y, R] in ontwerpcoördinaten (frame 720 × 420, oorsprong = midden)
  [-240, 10, 140], [80, -122, 138], [62, 192, 136], [372, 48, 140], [-330, -252, 120], [-272, 288, 115], [332, -255, 110]
];
const _ZB_CAP = [[-120, -250], [-96, -92], [-62, 12], [-80, 138], [-112, 250]]; // haarvat tussen buisje 0, 1 en 2
function _zbBuis(ctx, cx, cy, R, p, t, sd, hlS, info) {
  const rb = R - 6, rl = R * lerp(0.56, 0.32, p), dik = rb - rl; // basale membraan → lumen
  const ring = u => rb - u * dik;
  // wand: basale membraan + platte peritubulaire cellen
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); shape(ctx, rgba('#B07A68', 0.45), rgba('#D9A894', 0.8), 1.5);
  ctx.beginPath(); ctx.arc(cx, cy, rb, 0, 6.283); shape(ctx, rgba('#D8C9A8', 0.16), rgba('#E8D8C0', 0.55), 1);
  for (let k = 0; k < 11; k++) { const an = (k + hash(sd + k * 3.1)) / 11 * 6.283;
    ctx.beginPath(); ctx.ellipse(cx + Math.cos(an) * (R - 3), cy + Math.sin(an) * (R - 3), 7, 1.8, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.95); ctx.fill(); }
  // lumen
  ctx.beginPath(); ctx.arc(cx, cy, rl, 0, 6.283); ctx.fillStyle = rgba('#121A26', 0.55); ctx.fill();
  // Sertolicellen: zuilen van basis tot lumen
  const nS = Math.max(9, Math.round(6.283 * R / 70)); const sAng = [];
  for (let k = 0; k < nS; k++) sAng.push((k + 0.25 * (hash(sd + k * 7.7) - 0.5)) / nS * 6.283 + hash(sd) * 6.283);
  const col = rgba('#EFE3C4', 0.24 + 0.32 * hlS), colE = rgba('#F6ECD2', 0.4 + 0.45 * hlS);
  sAng.forEach((th, k) => {
    const L = [], Rr = [];
    for (let i = 0; i <= 7; i++) { const u = i / 7, r = lerp(rb, rl - 2, u); const half = lerp(8, 3.2, u);
      const w1 = half + 1.8 * Math.sin(u * 9 + k), w2 = half + 1.8 * Math.sin(u * 8 + k * 2.3 + 1);
      L.push([cx + Math.cos(th - w1 / r) * r, cy + Math.sin(th - w1 / r) * r]); Rr.unshift([cx + Math.cos(th + w2 / r) * r, cy + Math.sin(th + w2 / r) * r]); }
    if (hlS > 0.01) { ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); ctx.strokeStyle = rgba('#F6ECD2', 0.22 * hlS); ctx.lineWidth = 6; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, L.concat(Rr), true); shape(ctx, col, colE, 1);
  });
  // kiemcellen (tussen de zuilen); ringen met vaste plaatsen, productie dunt uit
  const vrij = (an, r, half) => sAng.every(th => { let d = Math.abs(((an - th) % 6.283 + 9.425) % 6.283 - 3.1416); return d * r > 8 + half; });
  const cel = (x, y, cr, kr, kf, ke) => { ctx.beginPath(); ctx.arc(x, y, cr, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1); ctx.beginPath(); ctx.arc(x, y, kr, 0, 6.283); shape(ctx, kf, ke, 1); };
  // spermatogonia op de basale membraan
  { const r = rb - 6.5, n = Math.floor(6.283 * r / 15);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 1.3)) / n * 6.283; if (!vrij(an, r, 2)) continue; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r;
      ctx.beginPath(); ctx.ellipse(x, y, 7.5, 6, an, 0, 6.283); shape(ctx, rgba('#D6C2DA', 0.16), rgba('#D6C2DA', 0.35), 1);
      ctx.beginPath(); ctx.ellipse(x, y, 5, 4, an + Math.PI / 2, 0, 6.283); shape(ctx, '#5A4888', (C.nucEdge || '#A392D6'), 1); } }
  // primaire spermatocyten: grootste kernen, chromatinedraden
  { const r = ring(0.31), n = Math.floor(6.283 * r / 24);
    for (let i = 0; i < n; i++) { const an = (i + 0.5 + 0.3 * hash(sd + i * 2.9)) / n * 6.283; if (!vrij(an, r, 6) || hash(sd + i * 5.3 + 1) > 0.45 + 0.55 * p) continue;
      const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r; cel(x, y, 11, 7.5, rgba((C.nucFill || '#6E5A9E'), 0.95), (C.nucEdge || '#A392D6'));
      ctx.strokeStyle = rgba('#D4C8F0', 0.75); ctx.lineWidth = 1.1; ctx.lineCap = 'round';
      for (let d = 0; d < 3; d++) { const h = k => hash(sd + i * 11 + d * 3 + k) - 0.5; ctx.beginPath(); ctx.moveTo(x + h(1) * 9, y + h(2) * 9); ctx.quadraticCurveTo(x + h(3) * 12, y + h(4) * 12, x + h(5) * 9, y + h(6) * 9); ctx.stroke(); } } }
  // ronde spermatiden (twee rijen)
  [[0.6, 12], [0.76, 11.5]].forEach(([u, sp], ri) => { const r = ring(u), n = Math.floor(6.283 * r / sp);
    for (let i = 0; i < n; i++) { const an = (i + ri * 0.5 + 0.25 * hash(sd + i * 3.7 + ri)) / n * 6.283; if (!vrij(an, r, 1) || hash(sd + i * 4.1 + ri * 9 + 2) > Math.pow(p, 1.4)) continue;
      cel(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 5.8, 3.4, rgba((C.purpleL || '#BBAFE0'), 0.9), lighten((C.purpleL || '#BBAFE0'), 0.3)); } });
  // langgerekte spermatiden: kop naar de basis, staart het lumen in
  { const r = rl + 6, n = Math.floor(6.283 * r / 7.5);
    for (let i = 0; i < n; i++) { const an = (i + 0.3 * hash(sd + i * 6.1)) / n * 6.283; if (hash(sd + i * 8.3 + 3) > Math.pow(p, 1.6)) continue;
      const ri = r + (hash(sd + i * 2.2) - 0.5) * 6, x = cx + Math.cos(an) * ri, y = cy + Math.sin(an) * ri;
      const sw = (hash(sd + i) - 0.5) * 2, tl = rl * (0.4 + 0.3 * hash(sd + i * 9.9)), pts = [];
      for (let k = 0; k <= 6; k++) { const rr = ri - 3 - k * tl / 6; const aa = an + sw * k * 0.035 + Math.sin(t * 2.4 + k * 1.3 + i) * 0.006 * k * k / 3; pts.push([cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr]); }
      ctx.beginPath(); bioPad(ctx, pts); ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.42); ctx.lineWidth = 0.9; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, y, 4, 1.7, an + (hash(sd + i * 3.3) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#4A3A78', (C.nucEdge || '#A392D6'), 0.8); } }
  // Sertolikernen bovenop (bleek, groot kernlichaampje)
  sAng.forEach(th => { const r = rb - 13, x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r;
    ctx.beginPath(); ctx.ellipse(x, y, 7, 4.3, th, 0, 6.283); shape(ctx, rgba('#CFC3E6', 0.85 + 0.15 * hlS), '#E6DCF5', 1);
    ctx.beginPath(); ctx.arc(x - Math.cos(th) * 1.2, y - Math.sin(th) * 1.2, 1.7, 0, 6.283); ctx.fillStyle = (C.nucFill || '#6E5A9E'); ctx.fill();
    info.sertoli.push([x, y, th]); });
}
function zaadbalWeefsel(ctx, x, y, w, h, o = {}) {
  const { a = 1, t = 0, leydig = 0, sertoli = 0, testo = 0, inhibine = 0, productie = 1, seed = 0 } = o;
  const s = Math.min(w / 720, h / 420); const S = (px, py) => [x + px * s, y + py * s];
  const BUIS = _ZB_BUIS, CAP = _ZB_CAP;
  // Leydigcellen: twee groepjes in de driehoeken tussen de buisjes, veelhoekig tegen elkaar gedrukt
  const kandidaat = [];
  [[-22, 32, 9], [182, 40, 6]].forEach(([gx, gy, n], g) => { for (let i = 0; i < n + 6; i++) { const rr = 13 * Math.sqrt(i + 0.5), an = i * 2.39996 + seed + g;
    const px = gx + Math.cos(an) * rr, py = gy + Math.sin(an) * rr * 1.1;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 9)) continue;
    if (CAP.some(c => Math.hypot(px - c[0], py - c[1]) < 17) || Math.hypot(px - 205, py - 62) < 22) continue;
    if (kandidaat.filter(k => k.g === g).length < n) kandidaat.push({ x: px, y: py, g, m: 12.5 * (0.88 + 0.24 * hash(seed + i * 3 + g * 50)) }); } });
  const leyd = kandidaat.map((c, i) => { const pts = [];
    for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = c.m;
      kandidaat.forEach((q, j) => { if (j === i) return; const dx = q.x - c.x, dy = q.y - c.y, dd = Math.hypot(dx, dy), pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr - 1.5); });
      BUIS.forEach(([bx, by, bR]) => { const fx = c.x - bx, fy = c.y - by, B = fx * ux + fy * uy, Cq = fx * fx + fy * fy - (bR + 3) * (bR + 3), D = B * B - Cq; if (D > 0) { const tt = -B - Math.sqrt(D); if (tt > 0) best = Math.min(best, tt); } });
      pts.push([c.x + ux * Math.max(4, best), c.y + uy * Math.max(4, best)]); }
    return { c, pts }; });
  const ret = { leydig: S(-22, 32), sertoli: S(0, 0), haarvat: S(CAP[2][0], CAP[2][1]), buisjes: BUIS.map(([bx, by, bR]) => [x + bx * s, y + by * s, bR * s]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 28 * s); ctx.clip();
  ctx.translate(x, y); ctx.scale(s, s); const W = w / s, H = h / s;
  // interstitium: los bindweefsel met een paar fibroblastkernen en vezels
  ctx.fillStyle = rgba('#7A4A3A', 0.3); ctx.fillRect(-W / 2, -H / 2, W, H);
  ctx.strokeStyle = rgba('#E8C8B0', 0.1); ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) { const px = (hash(seed + i * 9.1) - 0.5) * W, py = (hash(seed + i * 4.7) - 0.5) * H;
    if (BUIS.some(([bx, by, bR]) => Math.hypot(px - bx, py - by) < bR + 8)) continue; const an = hash(seed + i * 2.2) * 3.14;
    ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * 14, py - Math.sin(an) * 14); ctx.quadraticCurveTo(px + 4, py - 4, px + Math.cos(an) * 14, py + Math.sin(an) * 14); ctx.stroke();
    if (i % 3 === 0) { ctx.beginPath(); ctx.ellipse(px, py, 5.5, 1.6, an, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); } }
  // zaadbuisjes
  const info = { sertoli: [] }; const sPerBuis = [];
  BUIS.forEach(([bx, by, bR], i) => { const st = info.sertoli.length; _zbBuis(ctx, bx, by, bR, clamp(productie, 0, 1), t, seed * 97 + i * 31 + 5, sertoli, info); sPerBuis.push(info.sertoli.slice(st)); });
  // haarvat (lengtedoorsnede) + klein haarvat in doorsnede bij groepje 2
  bloedvat(ctx, CAP, 6, t, { n: 5, speed: 0.05, haarvat: true });
  ctx.beginPath(); ctx.arc(205, 62, 9, 0, 6.283); shape(ctx, '#3A1A22', rgba(BIO.vaatwand, 0.9), 3); rodeBloedcel(ctx, 205, 62, 5.5, 0.4, 0, 0.95);
  // Leydigcellen
  leyd.forEach(({ c, pts }, i) => {
    if (leydig > 0.01) { ctx.beginPath(); bioPad(ctx, pts, true); ctx.strokeStyle = rgba((C.gold || '#E0B64A'), 0.28 * leydig); ctx.lineWidth = 7; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, lighten('#B8894A', 0.18 * leydig), lighten((C.ochre || '#C9A35C'), 0.35 + 0.3 * leydig), 1.3);
    for (let k = 0; k < 2; k++) { const an = hash(seed + i * 5 + k) * 6.283; ctx.beginPath(); ctx.arc(c.x + Math.cos(an) * 6, c.y + Math.sin(an) * 6, 1.6, 0, 6.283); ctx.fillStyle = rgba('#F6E2B0', 0.55); ctx.fill(); } // vetdruppeltjes
    const kx = c.x + (hash(seed + i * 7) - 0.5) * 4, ky = c.y + (hash(seed + i * 8) - 0.5) * 4;
    ctx.beginPath(); ctx.arc(kx, ky, 4.6, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1);
    ctx.beginPath(); ctx.arc(kx + 1, ky - 0.8, 1.2, 0, 6.283); ctx.fillStyle = '#3E2E66'; ctx.fill(); });
  // anker Sertoli: zuil van buisje 0 die naar het interstitium kijkt
  { let best = null, bd = 1e9; sPerBuis[0].forEach(q => { const d = Math.hypot(q[0] + 22, q[1] - 32); if (d < bd) { bd = d; best = q; } }); if (best) ret.sertoli = S(best[0], best[1]); }
  // deeltjes
  const capPts = bioDicht(CAP, 12);
  const naCap = (px, py) => { let b = capPts[0], bd = 1e9; capPts.forEach(q => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < bd) { bd = d; b = q; } }); return b; };
  const deeltje = (sx, sy, tx, ty, u, col, i) => { const e = ease(u), al = Math.sin(Math.PI * u);
    const px = lerp(sx, tx, e) + Math.sin(u * 6 + i) * 3, py = lerp(sy, ty, e) + Math.cos(u * 5 + i) * 3;
    ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.globalAlpha *= al; shape(ctx, col, lighten(col, 0.4), 1); ctx.globalAlpha /= al || 1; };
  if (testo > 0.01 && leyd.length) { const n = Math.round(40 * testo); ctx.save(); ctx.globalAlpha *= Math.min(1, testo * 2);
    for (let i = 0; i < n; i++) { const L = leyd[Math.floor(hash(seed + i * 1.7) * leyd.length)].c; const u = ((t * 0.22 * (0.8 + 0.4 * hash(i * 3.3)) + hash(i * 5.9)) % 1 + 1) % 1;
      let tx, ty; if (hash(i * 7.1 + 2) < 0.62) { let bb = BUIS[0], bd = 1e9; BUIS.forEach(B => { const d = Math.hypot(L.x - B[0], L.y - B[1]) - B[2]; if (d < bd) { bd = d; bb = B; } });
        const an = Math.atan2(L.y - bb[1], L.x - bb[0]) + (hash(i * 2.3) - 0.5) * 0.5; tx = bb[0] + Math.cos(an) * (bb[2] - 30); ty = bb[1] + Math.sin(an) * (bb[2] - 30); }
      else { const q = naCap(L.x, L.y); tx = q[0] + (hash(i) - 0.5) * 30; ty = q[1] + (hash(i + 1) - 0.5) * 30; }
      deeltje(L.x, L.y, tx, ty, u, (C.purple || '#8C7BBF'), i); } ctx.restore(); }
  if (inhibine > 0.01) { const n = Math.round(18 * inhibine); ctx.save(); ctx.globalAlpha *= Math.min(1, inhibine * 2);
    const bron = []; [0, 1, 2].forEach(b => { const [bx, by] = BUIS[b]; const q = naCap(bx, by); const dir = Math.atan2(q[1] - by, q[0] - bx);
      sPerBuis[b].forEach(sv => { let d = Math.abs(((sv[2] - dir) % 6.283 + 9.425) % 6.283 - 3.1416); if (d < 0.5) bron.push(sv); }); });
    for (let i = 0; i < n && bron.length; i++) { const sv = bron[Math.floor(hash(seed + i * 2.9 + 40) * bron.length)]; const u = ((t * 0.2 * (0.8 + 0.4 * hash(i * 4.4 + 9)) + hash(i * 6.6 + 3)) % 1 + 1) % 1;
      const q = naCap(sv[0], sv[1]); deeltje(sv[0], sv[1], q[0], q[1], u, (C.purpleD || '#675694'), i + 100); } ctx.restore(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// T-HELPERCEL (CD4+-lymfocyt). Recept: rond, 7–10 µm; kern rond, ± 75–80 % van de celdiameter, iets
// excentrisch, donker (veel heterochromatine); smalle cytoplasmarand (dikste kant ± 20 % van de straal) met
// 2–3 mitochondriën. CD4 = transmembraaneiwit, steekt in het echt ± 7 nm uit (veel te klein om te zien):
// hier sterk vergroot als knopje op een steeltje (± 13 % van de straal), loodrecht op het membraan, gelijkmatig
// verdeeld (± elke 28 px omtrek). Bron: Janeway's Immunobiology fig. 1.x; Junqueira h. 12 (lymfocyt).
// Bekende fouten: kleine kern in het midden met veel cytoplasma (dat is een monocyt); receptoren als
// losse stipjes naast de cel; receptoren schuin of ongelijk verdeeld.
// Oorsprong = midden van de cel, r = straal in px.
// =====================================================================================
function tHelperCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, cd4 = 1, hl = 0 } = o;
  const kx = x + r * 0.07, ky = y - r * 0.05, kr = r * 0.76;
  const ret = { kern: [kx, ky, kr], receptor: an => [x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  if (hl > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.28, 0, 6.283); ctx.strokeStyle = rgba((C.tealL || '#9ED0EA'), 0.11 * hl); ctx.lineWidth = r * 0.22; ctx.stroke(); }
  // CD4: steeltje + knopje, eerst getekend zodat het celoppervlak de voet afdekt (verankerd)
  if (cd4 > 0.01) { const n = clamp(Math.round(6.283 * r / 28), 12, 30); ctx.save(); ctx.globalAlpha *= cd4;
    for (let i = 0; i < n; i++) { const an = (i + 0.18 * (hash(i * 3.7) - 0.5)) / n * 6.283 + 0.13 + Math.sin(t * 1.3 + i) * 0.015;
      const ux = Math.cos(an), uy = Math.sin(an), st = r * 0.13, kn = Math.max(2.2, r * 0.045);
      ctx.beginPath(); ctx.moveTo(x + ux * (r - 3), y + uy * (r - 3)); ctx.lineTo(x + ux * (r + st), y + uy * (r + st)); ctx.strokeStyle = lighten((C.green || '#7FC48F'), 0.15); ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + ux * (r + st + kn * 0.7), y + uy * (r + st + kn * 0.7), kn * 1.15, kn * 0.9, an, 0, 6.283); shape(ctx, (C.green || '#7FC48F'), lighten((C.green || '#7FC48F'), 0.4), 1); }
    ctx.restore(); }
  // cel
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, lighten('#2F5E78', 0.12 * hl), lighten((C.tealL || '#9ED0EA'), 0.2 * hl), Math.max(1.5, r * 0.022));
  // mitochondriën in de dikste kant van de rand
  for (let k = 0; k < 3; k++) { const an = Math.PI * 0.82 + (k - 1) * 0.42, rr = r * 0.88, L = r * 0.17, B = r * 0.065;
    ctx.save(); ctx.translate(x + Math.cos(an) * rr, y + Math.sin(an) * rr); ctx.rotate(an + Math.PI / 2);
    ctx.beginPath(); ctx.ellipse(0, 0, L / 2, B / 2, 0, 0, 6.283); shape(ctx, (C.mitoFill || '#D88E7A'), (C.mitoEdge || '#F0B8A6'), 1);
    ctx.beginPath(); ctx.moveTo(-L * 0.28, 0); ctx.lineTo(L * 0.28, 0); ctx.strokeStyle = rgba((C.mitoEdge || '#F0B8A6'), 0.8); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); }
  // kern: groot, rond, donkere chromatinevlekken
  ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), Math.max(1.2, r * 0.018));
  ctx.fillStyle = rgba('#3E2E66', 0.45);
  for (let i = 0; i < 9; i++) { const an = hash(i * 2.1 + 5) * 6.283, rr = Math.sqrt(hash(i * 1.7 + 2)) * kr * 0.72;
    ctx.beginPath(); ctx.ellipse(kx + Math.cos(an) * rr, ky + Math.sin(an) * rr, kr * 0.17, kr * 0.11, an, 0, 6.283); ctx.fill(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// HIV-DEELTJE. Recept: virion rond, Ø 100–120 nm; envelop = lipide dubbellaag van de gastheercel (twee lijnen);
// 8–14 envelopspikes (gp41-steel in de membraan + gp120-trimeer als knop), ± 10–14 nm hoog = ± 20 % van de
// straal, loodrecht en gelijkmatig verspreid; binnenin kegelvormig capside (p24) ± 100 nm lang, breed eind
// ± 50 nm, smal eind ± 20 nm (≈ 1,3 r lang), met twee RNA-strengen (enkelstrengs, ± 9,7 kb elk) vooral in het
// brede eind. Fusie: na binding aan CD4 + corecepor versmelt de envelop met het celmembraan; het deeltje opent
// aan de onderkant, wordt een koepel en loopt over in de membraan; capside zakt naar de opening.
// Bron: Briggs & Kräusslich 2011 (J Mol Biol, cryo-ET HIV); Zhu e.a. 2006 (Nature, spikes per virion ± 14).
// Bekende fouten: stekelbol met tientallen lange spikes; rond capside; spikes zonder steel die los zweven;
// DNA in plaats van RNA.
// Oorsprong = midden; r = straal envelop in px; fuseer-membraan ligt op y + r (raaklijn onderkant).
// =====================================================================================
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12 } = o; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba((C.coral || '#E07A5F'), 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    ctx.beginPath(); ctx.moveTo(px - nx * r * 0.05, py - ny * r * 0.05); ctx.lineTo(px + nx * r * 0.14, py + ny * r * 0.14); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.2); ctx.lineWidth = Math.max(1.5, r * 0.04); ctx.stroke();
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h]) => { ctx.beginPath(); ctx.arc(px + nx * r * h + tx * sd * ks * 0.95, py + ny * r * h + ty * sd * ks * 0.95, ks, 0, 6.283); shape(ctx, (C.coralL || '#F0A88F'), lighten((C.coralL || '#F0A88F'), 0.35), 1); });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = (C.ink || '#F2F2EE'); ctx.lineWidth = Math.max(1, r * 0.022);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// STAAFBACTERIE (bacil, doorsnede-aanzicht). Recept: ± 1 µm breed × 2–3 µm lang (hier breedte = L / 2,5),
// uiteinden halfrond. Celwand (peptidoglycaan; Gram-positief 20–80 nm = 2–8 % van de breedte) hier vergroot tot
// ± 8 % zodat hij als dikke laag leest, buiten het dunne celmembraan met een smalle spleet ertussen (twee
// duidelijke lagen). Nucleoïde = één ringvormig DNA-molecuul, sterk opgekruld, als kluwen in het midden zonder
// kernmembraan. Ribosomen 20 nm, ± 10 000–20 000 per cel: hier veel kleine stipjes, buiten de nucleoïde.
// Flagel ± 20 nm dik, 5–10 µm lang (2–4 × de cel), schroefvormig, verankerd in wand + membraan (basaal
// lichaam) aan een pool. Antibiotica (bijv. penicilline) remmen de opbouw van de wand: gaten in de wand, het
// membraan puilt door een gat naar buiten (blaasje) en scheurt door de osmotische druk → inhoud lekt weg.
// Bron: Brock Biology of Microorganisms h. 2; Madigan e.a. fig. 2.x (penicilline-lysis).
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; ribosomen als grote bollen; flagel als
// los haartje naast de cel.
// Oorsprong = midden; L = lengte in px; o.rot = draaiing.
// =====================================================================================
function bacterieCel(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, hlRibo = 0, flagel = false } = o; const ab = clamp(antibiotica, 0, 1);
  const hw = L / 5, ww = hw * 0.16, half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  // omtrek (capsule) met normalen, gelijk verdeeld
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  // blaasje: membraan puilt door een wandgat bovenaan (x0)
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.1, ky = 0;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - 3).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // flagel aan de linkerpool (achter de cel getekend)
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 80; i++) { const u = i / 80, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba((C.ink || '#F2F2EE'), 0.75); ctx.lineWidth = Math.max(1.4, hw * 0.05); ctx.stroke(); }
  // cytoplasma
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba((C.green || '#7FC48F'), 0.16); ctx.fill();
  // ribosomen
  const nr = Math.round(L * L / 900 + 40); const rr = Math.max(1.3, hw * 0.045);
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + 1) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4;
    if (Math.pow((px - kx) / (half * 0.85 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.5), 2) < 1) continue;
    if (hlRibo > 0.01) { ctx.beginPath(); ctx.arc(px, py, rr * 2.4, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 0.18 * hlRibo); ctx.fill(); }
    ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fillStyle = lighten((C.gold || '#E0B64A'), 0.3 * hlRibo); ctx.fill(); }
  ctx.restore();
  // nucleoïde: opgekruld ring-DNA
  ctx.beginPath(); const nl = 220; for (let i = 0; i <= nl; i++) { const u = i / nl * 6.283; const bx = Math.cos(u) * half * 0.7, by = Math.sin(u) * hw * 0.3; const cr = hw * (0.13 + 0.05 * Math.sin(u * 3));
    const px = kx + bx + Math.cos(u * 23) * cr, py = ky + by + Math.sin(u * 23) * cr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.strokeStyle = rgba((C.purpleL || '#BBAFE0'), 0.95); ctx.lineWidth = Math.max(1.1, hw * 0.035); ctx.stroke();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = (C.mem || '#AFC0D0'); ctx.lineWidth = Math.max(1.3, hw * 0.04);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    // inhoud lekt weg
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr, 0, 6.283); ctx.fillStyle = rgba((C.gold || '#E0B64A'), 1 - u); ctx.fill(); } }
  // celwand: dikke band, met gaten bij antibiotica
  const wand = omtrek(hw - ww / 2, 96); const wc = lighten('#6FA27C', 0.25 * hlWand);
  if (hlWand > 0.01) { ctx.beginPath(); bioPad(ctx, wand.map(q => q.p), true); ctx.strokeStyle = rgba((C.greenL || '#B4DFBB'), 0.22 * hlWand); ctx.lineWidth = ww + 10; ctx.stroke(); }
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  ctx.lineCap = 'round';
  for (const pass of [[lighten(wc, 0.45), ww + 2.4], [wc, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  // basaal lichaam van de flagel
  if (flagel) { ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.ink2, (C.ink || '#F2F2EE'), 1); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: aanleg geslachtsorganen, eileider, zwangerschapstest
// =====================================================================================
// =====================================================================================
// obj_aanleg_eileider_test.js — nieuwe objecten voor lib_bio.js (aanleg geslachtsorganen, eileider, zwangerschapstest)
// Zelfde stijl als lib_bio.js: recept + bron + bekende fouten boven elk object; (ctx, x, y, ..., o = {});
// deterministisch (alleen hash), animatie via t (s), geeft ankerpunten in schermcoördinaten terug.
// =====================================================================================

function _bioMix(c1, c2, f) { // twee #hex-kleuren mengen → 'rgb()'
  const p = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(c1), B = p(c2); f = clamp(f, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], f))},${Math.round(lerp(A[1], B[1], f))},${Math.round(lerp(A[2], B[2], f))})`;
}
function _bioMixA(c1, c2, f, al) { const s = _bioMix(c1, c2, f); return s.replace('rgb(', 'rgba(').replace(')', `,${al})`); }

// =====================================================================================
// AANLEG GESLACHTSORGANEN (inwendig), embryo week 6–7, ongedifferentieerd stadium, vooraanzicht, symmetrisch.
// Recept (Sadler, Langman's Medical Embryology h. 16, fig. 16.24–16.32; Moore, The Developing Human h. 12):
// - Gonade = genitale lijst: langgerekte richel mediaal van de oernier (mesonephros), lengte ± 3–4× de breedte,
//   hoog in de buik (ter hoogte van de onderste borst-/bovenste lendenwervels). Hier 44 × 140 px.
// - Wolff-buis (ductus mesonephricus) loopt lateraal in de oernier omlaag en mondt uit in de sinus urogenitalis.
// - Müller-buis (ductus paramesonephricus) ontstaat als instulping van het coeloomepitheel LATERAAL van de
//   Wolff-buis, opent boven met een trechter in de buikholte, loopt omlaag, kruist dan VENTRAAL (vóór) de Wolff-buis
//   naar mediaal; beide Müller-buizen versmelten in de middellijn (uterovaginaal kanaal) en raken de achterwand van
//   de sinus (Müller-heuveltje) tussen de twee Wolff-uitmondingen.
// - Man (SRY → testis, AMH, testosteron): testis ronder (± 4 × 3 cm volwassen, verhouding 1,3 : 1), zakt iets;
//   bovenste oerniertubuli + Wolff-buis → ductuli efferentes + bijbal (sterk gekronkelde buis tegen de laterale/
//   achterkant van de testis, kop boven, staart onder); rest van de Wolff-buis → zaadleider (dikke spierwand);
//   zaadblaasje = knop uit de zaadleider vlak boven de sinus (week 10); Müller-buizen verdwijnen door AMH.
// - Vrouw (geen AMH, geen testosteron): eierstok amandelvormig (± 3 × 1,5 cm volwassen, 2 : 1) met follikels;
//   bovenste Müller-deel → eileider met trechter en fimbriae; versmolten onderste deel → baarmoeder + bovenste deel
//   vagina (peervorm in de middellijn, fundus boven); Wolff-buizen verdwijnen (resten: Gartner).
// Ontwerpcoördinaten: ± 360 × 440, oorsprong in het midden; sinus onderaan in het midden.
// Bekende fouten: gonaden onderaan naast de sinus; Müller-buis mediaal van de Wolff-buis over de hele lengte;
// Müller-buizen die gescheiden in de sinus uitkomen; bijbal als losse bol; baarmoeder als driehoek los van de buizen;
// beide buizenparen tegelijk volgroeid laten (in elk geslacht verdwijnt er één).
// =====================================================================================
function aanlegGeslacht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, man = 0, vrouw = 0, hlWolff = 0, hlMuller = 0, hlGonade = 0 } = o;
  const m = ease(clamp(man, 0, 1)), v = ease(clamp(vrouw, 0, 1));
  const P = (px, py) => [x + px * s, y + py * s];
  const mix3 = (i, mm, ff) => i + (mm - i) * m + (ff - i) * v;
  const mixPts = (I, Mm, F) => I.map((p, k) => [mix3(p[0], Mm[k][0], F[k][0]), mix3(p[1], Mm[k][1], F[k][1])]);
  const COL_W = (C.purple || '#8C7BBF'), COL_M = '#D9868A', COL_G = '#C98A6A', COL_S = '#8FA6B8';
  // gonade
  const g = { cx: mix3(82, 80, 88), cy: mix3(-112, -62, -100), rx: mix3(22, 38, 24), ry: mix3(70, 50, 50), rot: mix3(0.06, 0.1, 0.32) };
  const gM = { cx: 80, cy: -62, rx: 38, ry: 50, rot: 0.1 }; // eindstand testis (voor de bijbal)
  const opT = (G, th, dr = 0) => { const lx = Math.cos(th) * (G.rx + dr), ly = Math.sin(th) * (G.ry + dr * 0.8); const c = Math.cos(G.rot), sn = Math.sin(G.rot); return [G.cx + lx * c - ly * sn, G.cy + lx * sn + ly * c]; };
  // Wolff (rechts): ongedifferentieerd / man (bijbal + zaadleider) / vrouw (= ongedifferentieerd, verdwijnt)
  const W_I = [[124, -206], [132, -150], [134, -80], [132, -10], [124, 50], [100, 105], [60, 150], [26, 184], [16, 202]];
  const W_M = [opT(gM, -1.2, 8), opT(gM, -0.6, 9), opT(gM, 0, 9), opT(gM, 0.9, 8), [124, 40], [106, 100], [62, 148], [26, 184], [16, 202]];
  const wolff = mixPts(W_I, W_M, W_I);
  // Müller (rechts): trechter boven lateraal, kruist ventraal naar mediaal
  const M_I = [[162, -202], [164, -140], [162, -70], [156, 0], [144, 55], [112, 96], [66, 132], [24, 156], [6, 166]];
  const M_F = [[116, -160], [148, -164], [170, -128], [174, -62], [156, 0], [122, 34], [88, 46], [62, 52], [44, 52]]; // eileider boogt over de eierstok
  const muller = mixPts(M_I, M_I, M_F);
  // middellijn: versmolten Müller-deel (rechterhelft) → peervormige baarmoeder + bovenste vagina
  const U_I = [[0, 156], [6, 157], [9, 161], [9, 168], [9, 175], [9, 182], [9, 188], [9, 195], [9, 202]];
  const U_F = [[0, 24], [32, 28], [52, 46], [55, 82], [44, 118], [26, 142], [18, 158], [16, 180], [16, 202]];
  const uterus = mixPts(U_I, U_I, U_F);
  const ret = { gonade: P(g.cx, g.cy), wolff: (() => { const q = bioPunt(bioDicht(wolff, 12), 0.5); return P(q[0], q[1]); })(),
    muller: (() => { const q = bioPunt(bioDicht(muller, 12), 0.5); return P(q[0], q[1]); })(), sinus: P(0, 214) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const both = (fn) => { fn(1); ctx.save(); ctx.scale(-1, 1); fn(-1); ctx.restore(); };
  const lijn = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const buisVul = (pts, col, lw, al = 1) => { ctx.strokeStyle = rgba(col, al); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const rand = (pts, col, lw, al) => { ctx.strokeStyle = lighten(col, 0.4); ctx.globalAlpha *= al; ctx.lineWidth = lw + 2.4; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); ctx.globalAlpha /= al; };

  // sinus urogenitalis (onder, midden)
  ctx.beginPath(); bioPad(ctx, [[-56, 212], [-40, 198], [0, 194], [40, 198], [56, 212], [40, 230], [0, 236], [-40, 230]], true); shape(ctx, rgba(COL_S, 0.55), lighten(COL_S, 0.35), 2);
  // oernier (mesonephros): vaag, verdwijnt in beide richtingen grotendeels
  const meso = 1 - 0.85 * Math.max(m, v);
  both(() => { ctx.beginPath(); ctx.ellipse(128, -98, 30, 104, 0.02, 0, 6.283); shape(ctx, rgba('#B9A6C9', 0.14 * meso), rgba('#B9A6C9', 0.3 * meso), 1.5);
    ctx.strokeStyle = rgba('#B9A6C9', 0.35 * meso); ctx.lineWidth = 2; // oerniertubuli
    for (let k = 0; k < 6; k++) { const yy = -176 + k * 26; ctx.beginPath(); ctx.moveTo(131, yy); ctx.bezierCurveTo(118, yy - 6, 122, yy + 10, 108, yy + 6); ctx.stroke(); } });

  // gonaden
  both(() => {
    const p = Math.max(0.6, 1 + 0.7 * v); // amandel: puntiger uiteinden
    const omtrek = []; for (let k = 0; k < 40; k++) { const th = k / 40 * 6.283; const cx = Math.cos(th), sy = Math.sin(th);
      const lx = Math.sign(cx) * Math.pow(Math.abs(cx), p) * g.rx, ly = sy * g.ry; const c = Math.cos(g.rot), sn = Math.sin(g.rot); omtrek.push([g.cx + lx * c - ly * sn, g.cy + lx * sn + ly * c]); }
    if (hlGonade > 0.01) { ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.strokeStyle = rgba('#E8C2AE', 0.28 * hlGonade); ctx.lineWidth = 16; ctx.stroke(); }
    ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba(COL_G, 0.85), lighten(COL_G, 0.3), 2 + 1.5 * m);
    // testis: zaadstrengen (kronkelende strengen naar het rete aan de achter-bovenkant)
    if (m > 0.02) { ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip(); ctx.strokeStyle = rgba('#8E5A44', 0.55 * m); ctx.lineWidth = 2.2;
      for (let k = 0; k < 6; k++) { const th = 1.9 + k * 0.42; const A = opT(g, th, -4), B = opT(g, -0.9, -g.rx * 0.6); ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        ctx.bezierCurveTo(lerp(A[0], B[0], 0.3) + 6, lerp(A[1], B[1], 0.3) - 6, lerp(A[0], B[0], 0.7) - 6, lerp(A[1], B[1], 0.7) + 6, B[0], B[1]); ctx.stroke(); }
      ctx.restore(); }
    // eierstok: follikels (stipjes in de schors)
    if (v > 0.02) { for (let k = 0; k < 13; k++) { const th = hash(k * 7 + 1) * 6.283, rr = lerp(0.45, 0.78, hash(k * 7 + 2)); const q = [Math.cos(th) * g.rx * rr, Math.sin(th) * g.ry * rr];
        const c = Math.cos(g.rot), sn = Math.sin(g.rot); const fx = g.cx + q[0] * c - q[1] * sn, fy = g.cy + q[0] * sn + q[1] * c; const fr = 2.2 + 2.4 * hash(k * 7 + 3);
        ctx.beginPath(); ctx.arc(fx, fy, fr * v, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.8 * v), rgba('#E2B88E', 0.9 * v), 1); } }
  });

  // Wolff-buizen (achter de Müller-buizen)
  const wAl = 1 - 0.85 * v, wLw = 5 + 2.5 * m - 2.5 * v;
  both(() => {
    if (hlWolff > 0.01) lijn(wolff, '#BBAFE0', wLw + 14, 0.28 * hlWolff * wAl);
    rand(wolff, COL_W, wLw, wAl); buisVul(wolff, COL_W, wLw, wAl);
    if (m > 0.02) { // bijbal: band + kronkelende buis tegen de laterale kant van de testis
      const B = [], K = []; for (let i = 0; i <= 60; i++) { const th = lerp(-1.25, 0.95, i / 60); const p0 = opT(g, th, 8), p1 = opT(g, th, 9 + 5.5 * Math.sin(i * 1.9)); B.push(p0); K.push(p1); }
      ctx.save(); ctx.globalAlpha *= m; ctx.strokeStyle = lighten(COL_W, 0.4); ctx.lineWidth = 17; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba(COL_W, 1); ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, B, false); ctx.stroke();
      ctx.strokeStyle = rgba('#5E4E8C', 0.9); ctx.lineWidth = 2; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      // ductuli efferentes van testis naar bijbalkop
      ctx.strokeStyle = rgba('#BBAFE0', 0.8); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { const th = -1.15 + k * 0.17; const A = opT(g, th, -6), Bq = opT(g, th, 4); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bq[0], Bq[1]); ctx.stroke(); }
      // zaadblaasje: knop uit de zaadleider vlak boven de sinus
      const q = bioPunt(bioDicht(wolff, 12), 0.88); ctx.translate(q[0], q[1]); ctx.rotate(q[2] + 2.2); const sz = m;
      ctx.beginPath(); bioPad(ctx, [[0, -4 * sz], [10 * sz, -7 * sz], [20 * sz, -4 * sz], [26 * sz, 0], [20 * sz, 5 * sz], [10 * sz, 7 * sz], [0, 4 * sz]], true); shape(ctx, rgba('#A797D4', 0.95), lighten(COL_W, 0.45), 1.5);
      ctx.restore(); }
  });

  // Müller-buizen (vóór de Wolff-buizen) + trechter/fimbriae + baarmoeder
  const mAl = 1 - 0.9 * m, mLw = 5 - 2.6 * m + 1.2 * v;
  ctx.save(); ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  both(() => {
    if (hlMuller > 0.01) lijn(muller, '#F0B8BA', mLw + 14, 0.28 * hlMuller * mAl);
    rand(muller, COL_M, mLw, mAl); buisVul(muller, COL_M, mLw, mAl);
  });
  ctx.restore();
  both((sd) => { // trechter met (bij de vrouw) fimbriae
    const p0 = muller[0], p1 = muller[1]; let ex = p0[0] - p1[0], ey = p0[1] - p1[1]; const d = Math.hypot(ex, ey); ex /= d; ey /= d;
    if (v > 0.02) { const an = Math.atan2(ey, ex) + 0.6; ex = lerp(ex, Math.cos(an), v); ey = lerp(ey, Math.sin(an), v); const dd = Math.hypot(ex, ey); ex /= dd; ey /= dd; } // trechter naar de eierstok
    const qx = -ey, qy = ex; const rw = 8 + 6 * v, bw = mLw / 2;
    ctx.save(); ctx.globalAlpha *= mAl;
    const bx = p0[0] - ex * 12, by = p0[1] - ey * 12, rx0 = p0[0] + ex * 4, ry0 = p0[1] + ey * 4;
    // fimbriae (vingers rond de rand, wiegen zacht)
    if (v > 0.02) { const nf = 9; for (let k = 0; k < nf; k++) { const f = k / (nf - 1) - 0.5; const sx = rx0 + qx * rw * f * 2, sy = ry0 + qy * rw * f * 2;
        const an = Math.atan2(ey, ex) + f * 2.4 + 0.12 * Math.sin(t * 1.3 + k * 0.9) * sd; const len = (11 + 7 * hash(k + 11)) * v;
        const mx = sx + Math.cos(an) * len * 0.55 + Math.cos(an + 1.57) * 2, my = sy + Math.sin(an) * len * 0.55 + Math.sin(an + 1.57) * 2;
        for (const [col, lw] of [[lighten(COL_M, 0.4), 5.4], [COL_M, 3.2]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, sx + Math.cos(an) * len, sy + Math.sin(an) * len); ctx.stroke(); } } }
    ctx.beginPath(); ctx.moveTo(bx + qx * bw, by + qy * bw); ctx.quadraticCurveTo(p0[0] + qx * bw * 1.2, p0[1] + qy * bw * 1.2, rx0 + qx * rw, ry0 + qy * rw);
    ctx.lineTo(rx0 - qx * rw, ry0 - qy * rw); ctx.quadraticCurveTo(p0[0] - qx * bw * 1.2, p0[1] - qy * bw * 1.2, bx - qx * bw, by - qy * bw); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 1.5);
    ctx.beginPath(); ctx.ellipse(rx0, ry0, rw * 0.85, 3, Math.atan2(qy, qx), 0, 6.283); ctx.fillStyle = rgba('#5A2E36', 0.7); ctx.fill(); // opening naar de buikholte
    ctx.restore();
  });
  // versmolten middendeel: uterovaginaal kanaal → baarmoeder (peer) + bovenste vagina
  const UO = uterus.concat(uterus.slice(1).reverse().map(p => [-p[0], p[1]])).slice(0, -1);
  const full = uterus.slice().reverse().map(p => [-p[0], p[1]]).concat(uterus.slice(1));
  ctx.save(); ctx.globalAlpha *= mAl; ctx.setLineDash(m > 0.001 ? [10, 14 * m] : []);
  if (hlMuller > 0.01) { ctx.beginPath(); bioPad(ctx, full, false); ctx.strokeStyle = rgba('#F0B8BA', 0.28 * hlMuller); ctx.lineWidth = 14; ctx.stroke(); }
  ctx.beginPath(); bioPad(ctx, full, false); ctx.closePath(); shape(ctx, COL_M, lighten(COL_M, 0.4), 2);
  ctx.setLineDash([]);
  if (v > 0.02) { // baarmoederholte (driehoek) + baarmoederhalskanaal
    ctx.beginPath(); bioPad(ctx, [[0, lerp(150, 44, v)], [lerp(4, 30, v), lerp(152, 46, v)], [lerp(3, 10, v), lerp(160, 104, v)], [0, lerp(165, 130, v)], [lerp(-3, -10, v), lerp(160, 104, v)], [lerp(-4, -30, v), lerp(152, 46, v)]], true);
    ctx.fillStyle = rgba('#7A3A44', 0.55 * v); ctx.fill();
    ctx.strokeStyle = rgba('#7A3A44', 0.55 * v); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, lerp(165, 128, v)); ctx.lineTo(0, 200); ctx.stroke(); }
  else { ctx.strokeStyle = rgba('#7A3A44', 0.45); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(0, 200); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}

// =====================================================================================
// EILEIDER, lengtedoorsnede, horizontaal: links (x0) trechter met fimbriae open naar de eierstok, rechts (x1) de
// smalle isthmus naar de baarmoeder.
// Recept (Junqueira, Basic Histology h. 22; Sadler h. 2–3; Wheater's Functional Histology):
// - Lengte 10–12 cm: trechter (infundibulum) met fimbriae ± 1–2 cm (hier 0–9 %), ampulla ± 2/3 (hier tot ± 70 %),
//   isthmus ± 2–3 cm (laatste 30 %), dan het intramurale deel in de baarmoederwand (niet getekend).
// - Buitendiameter ampulla ± 1 cm, isthmus ± 2–4 mm (hier 0,42×); trechter loopt wijd uit (hier 1,3×).
// - Wand: slijmvlies (eenlagig cilinderepitheel met trilhaarcellen + secretoire 'peg'-cellen, losse lamina
//   propria), spierlaag (binnen circulair, buiten longitudinaal glad spierweefsel; in de ampulla dun, ± 13 % van de
//   straal; in de isthmus dik, ± 40 %), sereus vlies buiten.
// - Slijmvliesplooien: lange, sterk vertakte lengteplooien die een doolhof vormen; in de ampulla veel en hoog
//   (± 55 % van de binnenstraal), in de isthmus weinig en laag, het lumen daar nauw.
// - Trilharen slaan richting baarmoeder (effectieve slag snel, terugslag langzaam), metachrone golf; meeste
//   trilhaarcellen in trechter en ampulla. Bevruchting in de ampulla.
// - Ontsteking (salpingitis, vaak chlamydia): wand en plooien zwellen (oedeem), roder (hyperemie), ontstekingscellen.
//   Litteken: bindweefsel (collageen) vervangt het slijmvlies, plooien verkleven, lumen vernauwt tot bijna dicht →
//   zaadcellen komen er nog net door, het (grotere) embryo niet: buitenbaarmoederlijke zwangerschap/onvruchtbaarheid.
// Bekende fouten: eileider als glad buisje zonder plooien; trilharen die alle kanten op of richting eierstok slaan;
// trechter dicht; isthmus even wijd als de ampulla; litteken als losse bal in het lumen.
// Geeft lumen(u) → [x, y, halve vrije breedte] (tussen de plooitoppen; met litteken).
// =====================================================================================
function eileiderLangs(ctx, x0, x1, y, h, o = {}) {
  const { a = 1, t = 0, ontsteking = 0, litteken = 0, plek = 0.55, trilharen = 1 } = o;
  const L = x1 - x0, H = h / 2, k = H / 90; // k: schaal t.o.v. h = 180
  const X = (u) => x0 + u * L;
  const prof = (u) => {
    const s = ease((u - 0.6) / 0.18); const fl = Math.max(0, 1 - u / 0.09), flare = fl * fl;
    const b = clamp(ontsteking, 0, 1) * Math.exp(-Math.pow((u - 0.5) / 0.12, 2));
    const c = clamp(litteken, 0, 1) * Math.exp(-Math.pow((u - plek) / 0.028, 2));
    const Ho = H * (lerp(1, 0.42, s) + 0.3 * flare + 0.16 * b);
    const mt = Ho * lerp(0.13, 0.56, s) * lerp(1, 0.3, flare) * (1 + 0.25 * b);
    const Hm = Ho - mt; const mu = H * (0.07 + 0.06 * b) * lerp(1, 0.8, s); const He = Hm - mu;
    const fh = Math.min(He - 3 * k, He * lerp(0.64, 0.36, s) * lerp(1, 0.55, flare) * (1 + 0.35 * b)) * (1 - 0.8 * c);
    const Hsc = lerp(He, 1.4 * k, c); // binnenrand littekenweefsel
    return { s, b, c, flare, Ho, Hm, He, fh, Hsc, Hf: Math.min(He - fh, Hsc) };
  };
  const lumen = (u) => { const p = prof(clamp(u, 0, 1)); return [X(clamp(u, 0, 1)), y, p.Hf]; };
  if (a <= 0.01) return { lumen };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const N = 160, U = Array.from({ length: N + 1 }, (_, i) => i / N), PR = U.map(prof);
  const SP = BIO.spier, SPL = BIO.spierL, SL = BIO.slijm, RED = '#C2453E';
  const band = (sd, kA, kB) => { ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i][kA]; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); });
    for (let i = N; i >= 0; i--) ctx.lineTo(X(U[i]), y + sd * PR[i][kB]); ctx.closePath(); };
  // lumen (vocht) iets donkerder dan de achtergrond
  const i0 = Math.round(0.09 * N); // trechter open: geen vocht-vlak vóór de trechter
  ctx.beginPath(); for (let i = i0; i <= N; i++) { const yy = y - PR[i].He; i > i0 ? ctx.lineTo(X(U[i]), yy) : ctx.moveTo(X(U[i]), yy); } for (let i = N; i >= i0; i--) ctx.lineTo(X(U[i]), y + PR[i].He); ctx.closePath();
  ctx.fillStyle = rgba('#0D1420', 0.32); ctx.fill();
  for (const sd of [-1, 1]) {
    // spierlaag
    band(sd, 'Ho', 'Hm'); shape(ctx, rgba(SP, 0.62), rgba(SPL, 0.7), 1.5);
    ctx.save(); band(sd, 'Ho', 'Hm'); ctx.clip();
    ctx.strokeStyle = rgba(SPL, 0.5); ctx.lineWidth = 1.6 * k; // buiten longitudinaal: lange spoelvormige vezels
    for (let xx = x0 + 6; xx < x1; xx += 30 * k) { const u = (xx - x0) / L, p = prof(u); const yy = y + sd * lerp(p.Ho, p.Hm, 0.22); ctx.beginPath(); ctx.ellipse(xx + (hash(xx) - 0.5) * 8, yy, 13 * k, 1.8 * k, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = rgba(SPL, 0.45); // binnen circulair: dwars getroffen vezels (puntjes), meer rijen waar de laag dik is
    for (let xx = x0 + 4; xx < x1; xx += 9 * k) { const u = (xx - x0) / L, p = prof(u); const mt = p.Ho - p.Hm; const rows = Math.max(1, Math.floor(mt * 0.55 / (6 * k)));
      for (let r = 0; r < rows; r++) { const f = 0.5 + (r + 0.5) / rows * 0.42; ctx.beginPath(); ctx.ellipse(xx + (r % 2) * 4 * k, y + sd * lerp(p.Ho, p.Hm, f), 2.2 * k, 1.5 * k, 0, 0, 6.283); ctx.fill(); } }
    ctx.restore();
    // sereus vlies
    ctx.strokeStyle = rgba('#E8D8DE', 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * (PR[i].Ho + 1.5); i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke();
    // slijmvlies (basis)
    band(sd, 'Hm', 'He'); ctx.fillStyle = rgba(SL, 0.8); ctx.fill();
    // ontsteking: wand roder (vlakke stroken, geen verloop)
    if (ontsteking > 0.01) { ctx.save(); band(sd, 'Ho', 'He'); ctx.clip(); for (let xx = Math.floor(x0); xx < x1; xx += 3) { const p = prof((xx - x0) / L); if (p.b < 0.01) continue; ctx.fillStyle = rgba(RED, 0.42 * p.b); ctx.fillRect(xx, y - H * 2, 3, H * 4); } ctx.restore(); }
  }
  // plooien: veel, hoog en vertakt in de ampulla; weinig en laag in de isthmus
  const plooien = [];
  for (const sd of [-1, 1]) { let xx = X(0.03) + (sd > 0 ? 9 * k : 0), i = 0;
    while (xx < x1 - 6) { const u = (xx - x0) / L, p = prof(u); const hh = p.fh * (0.72 + 0.28 * hash(i * 13 + sd * 7));
      if (hh > 2) { const by = y + sd * (p.He + 2), ty = by - sd * hh; const lean = (hash(i * 5 + sd) - 0.5) * hh * 0.35;
        const trunk = [[xx, by], [xx + lean * 0.3, lerp(by, ty, 0.35)], [xx + lean * 0.7 + (hash(i + 3) - 0.5) * 4 * k, lerp(by, ty, 0.7)], [xx + lean, ty]];
        const tak = []; const nt = p.s < 0.5 ? (hash(i * 3 + 1) < 0.75 ? 1 + (hash(i * 3 + 2) < 0.5 ? 1 : 0) : 0) : (hash(i * 3 + 1) < 0.25 ? 1 : 0);
        for (let j = 0; j < nt; j++) { const f = 0.35 + 0.25 * j + 0.1 * hash(i * 9 + j); const r0 = [lerp(trunk[0][0], trunk[3][0], f), lerp(by, ty, f)]; const dir = (j % 2 ? 1 : -1) * (hash(i + j * 17) < 0.5 ? 1 : -1);
          const ln = hh * (0.32 + 0.15 * hash(i * 7 + j)); const an = 0.75; const e = [r0[0] + dir * Math.sin(an) * ln, r0[1] - sd * Math.cos(an) * ln];
          tak.push([r0, [lerp(r0[0], e[0], 0.5) + dir * 2, lerp(r0[1], e[1], 0.5) + sd * 2], e]); }
        plooien.push({ trunk, tak, w: lerp(9, 7, p.s) * k * (1 + 0.55 * p.b), col: _bioMix(SL, '#C8504A', p.b * 0.75), sd, u }); }
      xx += H * lerp(0.27, 0.85, p.s) * (0.8 + 0.4 * hash(i * 11 + sd * 3)); i++; } }
  const strokeP = (pts, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  plooien.forEach(pl => { const e = lighten(pl.col.replace(/rgb\((\d+),(\d+),(\d+)\)/, (q, r, g, b) => '#' + [r, g, b].map(n => (+n).toString(16).padStart(2, '0')).join('')), 0.35); strokeP(pl.trunk, pl.w + 2.4, e); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75 + 2.4, e)); });
  plooien.forEach(pl => { strokeP(pl.trunk.slice(0, 2), pl.w * 1.7 + 2.4, lighten('#D58A8A', 0.35)); });
  plooien.forEach(pl => { strokeP(pl.trunk, pl.w, pl.col); strokeP(pl.trunk.slice(0, 2), pl.w * 1.7, pl.col); pl.tak.forEach(tk => strokeP(tk, pl.w * 0.75, pl.col)); }); // plooi breder aan de voet
  plooien.forEach(pl => { const cc = rgba('#9E4A44', 0.45); strokeP(pl.trunk.slice(0, 3).concat([[lerp(pl.trunk[2][0], pl.trunk[3][0], 0.5), lerp(pl.trunk[2][1], pl.trunk[3][1], 0.5)]]), pl.w * 0.28, cc); pl.tak.forEach(tk => strokeP(tk.slice(0, 2), pl.w * 0.22, cc)); });
  // epitheelrand van de basis
  for (const sd of [-1, 1]) { ctx.strokeStyle = rgba('#F2C4BC', 0.75); ctx.lineWidth = 2; ctx.beginPath(); U.forEach((u, i) => { const yy = y + sd * PR[i].He; i ? ctx.lineTo(X(u), yy) : ctx.moveTo(X(u), yy); }); ctx.stroke(); }
  // fimbriae aan de trechterrand (vingers die zacht wiegen)
  const fim = [];
  for (const sd of [-1, 1]) { const p0 = prof(0); for (let j = 0; j < 6; j++) { const u0 = 0.004 + 0.012 * j; const pj = prof(u0); const bx = X(u0), by = y + sd * lerp(pj.He, pj.Hm, 0.4);
      const len = (38 + 22 * hash(j * 3 + (sd > 0 ? 50 : 0))) * k; const an0 = Math.PI - sd * (0.1 + 0.13 * j) * (j % 2 ? 1 : 0.7);
      const pts = []; for (let q = 0; q <= 6; q++) { const f = q / 6; const an = an0 + sd * 0.35 * f * f + 0.12 * Math.sin(t * 0.9 + j * 1.3 + f * 2) * f; const prev = q ? pts[q - 1] : [bx, by]; pts.push(q ? [prev[0] + Math.cos(an) * len / 6, prev[1] + Math.sin(an) * len / 6] : [bx, by]); }
      fim.push({ pts, w0: (11 - j * 0.6) * k, sd }); } }
  const fimPoly = (f) => { const l = [], r = []; f.pts.forEach((p, q) => { const nx = f.pts[Math.min(q + 1, 6)], pv = f.pts[Math.max(q - 1, 0)]; let dx = nx[0] - pv[0], dy = nx[1] - pv[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const w = f.w0 * lerp(1, 0.35, q / 6) / 2; l.push([p[0] - dy * w, p[1] + dx * w]); r.push([p[0] + dy * w, p[1] - dx * w]); }); return l.concat(r.reverse()); };
  fim.forEach(f => { ctx.beginPath(); bioPad(ctx, fimPoly(f), true); shape(ctx, rgba(SL, 0.92), lighten(SL, 0.35), 1.6); strokeP(f.pts.slice(0, 5), f.w0 * 0.22, rgba('#9E4A44', 0.4)); });
  // trilharen: effectieve slag snel richting baarmoeder (+x), terugslag langzaam; golf loopt naar rechts
  if (trilharen > 0.01) {
    const cl = 5.5 * Math.max(0.7, k); const beat = (xx) => { let ph = ((xx * 0.05 - t * 5.5) / 6.283) % 1; if (ph < 0) ph += 1; return ph < 0.3 ? lerp(-0.55, 0.75, ease(ph / 0.3)) : lerp(0.75, -0.55, ease((ph - 0.3) / 0.7)); };
    ctx.save(); ctx.globalAlpha *= clamp(trilharen, 0, 1); ctx.strokeStyle = rgba('#F6E8E2', 0.7); ctx.lineWidth = 1.1; ctx.beginPath();
    const tril = (rx, ry, nx, ny, axis) => { let tx = -ny, ty = nx; if (tx < 0 || (Math.abs(tx) < 0.2 && (axis - ry) * ty < 0)) { tx = -tx; ty = -ty; } const th = beat(rx);
      const dx = nx * Math.cos(th) + tx * Math.sin(th), dy = ny * Math.cos(th) + tx * 0 + ty * Math.sin(th);
      ctx.moveTo(rx, ry); ctx.quadraticCurveTo(rx + nx * cl * 0.6, ry + ny * cl * 0.6, rx + dx * cl, ry + dy * cl); };
    const langs = (pts, w, sd, stap) => { const D = bioDicht(pts, 6); let acc = 0; for (let q = 1; q < D.length; q++) { const dx = D[q][0] - D[q - 1][0], dy = D[q][1] - D[q - 1][1], d = Math.hypot(dx, dy); acc += d; if (acc < stap || d < 1e-6) continue; acc = 0;
        if (hash(Math.round(D[q][0] * 3 + D[q][1])) < 0.22) continue; // secretoire cel zonder trilharen
        for (const zz of [-1, 1]) { const nx = -dy / d * zz, ny = dx / d * zz; tril(D[q][0] + nx * (w / 2 + 1), D[q][1] + ny * (w / 2 + 1), nx, ny, y); } } };
    for (const sd of [-1, 1]) for (let xx = x0 + 3; xx < x1; xx += 5 * Math.max(0.8, k)) { const p = prof((xx - x0) / L); if (hash(Math.round(xx) * 7 + sd) < 0.25 + 0.15 * p.s) continue; tril(xx, y + sd * (p.He + 1), 0, -sd, y); }
    plooien.forEach(pl => { langs(pl.trunk, pl.w, pl.sd, 5.5 * k); pl.tak.forEach(tk => langs(tk, pl.w * 0.75, pl.sd, 6 * k)); });
    fim.forEach(f => langs(f.pts.slice(2), f.w0 * 0.55, f.sd, 9 * k));
    ctx.stroke(); ctx.restore();
  }
  // ontsteking: wijde vaatjes in het slijmvlies + ontstekingscellen in het lumen
  if (ontsteking > 0.01) { for (let j = 0; j < 14; j++) { const u = 0.36 + 0.28 * hash(j * 3 + 1), p = prof(u); if (p.b < 0.05) continue; const sd = j % 2 ? 1 : -1;
      ctx.strokeStyle = rgba(RED, 0.8 * p.b); ctx.lineWidth = 2.6 * k; ctx.beginPath(); const xx = X(u), yy = y + sd * lerp(p.He, p.Hm, 0.5); ctx.moveTo(xx - 14 * k, yy); ctx.bezierCurveTo(xx - 5 * k, yy - 4 * k, xx + 5 * k, yy + 4 * k, xx + 14 * k, yy); ctx.stroke(); }
    for (let j = 0; j < 9; j++) { const u = 0.4 + 0.2 * hash(j * 5 + 2), p = prof(u); if (p.b < 0.1) continue; const xx = X(u), yy = y + (hash(j * 5 + 3) - 0.5) * 1.4 * p.Hf; const r = 4.5 * k;
      ctx.save(); ctx.globalAlpha *= p.b; ctx.beginPath(); ctx.arc(xx, yy, r, 0, 6.283); shape(ctx, rgba('#E8ECF0', 0.85), '#FFFFFF', 1); ctx.fillStyle = rgba((C.purple || '#8C7BBF'), 0.85);
      for (let q = 0; q < 3; q++) { ctx.beginPath(); ctx.arc(xx + Math.cos(q * 2.1 + j) * r * 0.4, yy + Math.sin(q * 2.1 + j) * r * 0.4, r * 0.3, 0, 6.283); ctx.fill(); } ctx.restore(); } }
  // litteken: bindweefsel vanuit de wand dat het lumen vernauwt
  if (litteken > 0.01) { const ua = clamp(plek - 0.08, 0, 1), ub = clamp(plek + 0.08, 0, 1); const M = 60;
    for (const sd of [-1, 1]) { const outer = [], inner = []; for (let i = 0; i <= M; i++) { const u = lerp(ua, ub, i / M), p = prof(u); outer.push([X(u), y + sd * (p.Hm - 1)]); inner.push([X(u), y + sd * lerp(p.Hm - 1, 1.4 * k, p.c)]); } // dikte → 0 aan de randen
      ctx.beginPath(); outer.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); for (let i = M; i >= 0; i--) ctx.lineTo(inner[i][0], inner[i][1]); ctx.closePath();
      shape(ctx, rgba('#D9CFC2', 0.95), null); ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#A8988A', 0.55); ctx.lineWidth = 1.4; // collageenvezels
      for (let r = 1; r < 7; r++) { ctx.beginPath(); for (let i = 0; i <= M; i++) { const f = r / 7; const yy = lerp(outer[i][1], inner[i][1], f) + Math.sin(i * 0.9 + r * 2) * 1.5; i ? ctx.lineTo(outer[i][0], yy) : ctx.moveTo(outer[i][0], yy); } ctx.stroke(); }
      ctx.restore(); ctx.strokeStyle = rgba('#F2ECE4', 0.85); ctx.lineWidth = 1.6; ctx.beginPath(); inner.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); } }
  // snijvlak rechts (naar de baarmoeder)
  const pe = prof(1); ctx.strokeStyle = rgba('#E8D8DE', 0.5); ctx.lineWidth = 1.5; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x1, y + sd * pe.Ho); ctx.lineTo(x1, y + sd * pe.He); ctx.stroke(); }
  ctx.restore();
  return { lumen };
}

// =====================================================================================
// ZWANGERSCHAPSTEST (lateral-flow test), horizontaal: zuigstaafje links, plastic behuizing, ovaal uitleesvenster,
// duimgreep rechts. Recept: echte test ± 13–15 cm × 2 cm (hier 640 × 120 px, verhouding ± 5,3 : 1); zuiggedeelte
// ± 3–4 cm, iets smaller dan de behuizing; venster ± 1/4 van de lengte, in het midden; daarin een witte strook
// (nitrocellulose) met eerst de testlijn T (antistoffen tegen hCG) en daarna de controlelijn C (vangt de losse
// gekleurde antistof). Urine trekt door capillaire werking van links naar rechts: zuigstaaf → strook → zuigkussen
// achter het venster. Een roze/paarse waas (gekleurde antistof-goudkorrels) trekt over de strook; lijnen verschijnen
// pas als het vochtfront ze voorbij is. Lijnkleur roze-paars (colloïdaal goud). Bron: FDA 'Pregnancy tests';
// Koczula & Gallotta 2016 (Lateral flow assays). Bekende fouten: lijnen al zichtbaar vóór de urine er is;
// C-lijn vóór de T-lijn (C ligt verst van de urine); venster aan de duimkant.
// Ontwerpcoördinaten ± 640 × 120, oorsprong in het midden.
// =====================================================================================
function zwangerschapstest(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, urine = 0, T = 0, Cl = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s];
  const VX0 = -70, VX1 = 120, VH = 22, XT = 2, XC = 62, STR = 13;
  const ret = { tip: P(-320, 0), venster: [...P(VX0, -VH), ...P(VX1, VH)], T: P(XT, 0), C: P(XC, 0) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const u = clamp(urine, 0, 1); // vochtfront: 0–0,35 zuigstaaf, 0,35–0,45 onder de behuizing, 0,45–1 door het venster
  const xf = u < 0.35 ? lerp(-326, -190, u / 0.35) : u < 0.45 ? lerp(-190, VX0, (u - 0.35) / 0.1) : lerp(VX0, VX1 + 30, (u - 0.45) / 0.55);
  const front = (yy) => xf + 3 * Math.sin(yy * 0.25 + t * 2.0) + 2 * Math.sin(yy * 0.6 - t * 1.3);
  const nat = (pathFn, y0, y1, col, al) => { if (u <= 0.001) return; ctx.save(); pathFn(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-340, y0); for (let yy = y0; yy <= y1; yy += 2) ctx.lineTo(front(yy), yy); ctx.lineTo(-340, y1); ctx.closePath(); ctx.fillStyle = rgba(col, al); ctx.fill(); ctx.restore(); };
  // zuigstaafje (steekt links uit)
  const wick = () => { ctx.beginPath(); roundRect(ctx, -320, -32, 130, 64, 14); };
  wick(); shape(ctx, '#E6E2EC', '#FFFFFF', 1.5);
  ctx.save(); wick(); ctx.clip(); ctx.strokeStyle = rgba('#B8B2C4', 0.45); ctx.lineWidth = 1.2; for (let k = 0; k < 7; k++) { const yy = -26 + k * 8.6; ctx.beginPath(); ctx.moveTo(-318, yy); ctx.bezierCurveTo(-280, yy + 2, -240, yy - 2, -190, yy + 1); ctx.stroke(); } ctx.restore();
  nat(wick, -34, 34, '#D8C25A', 0.38);
  // behuizing
  const HUIS = [[-212, -40], [-160, -50], [-60, -56], [120, -57], [250, -55], [300, -48], [318, -26], [320, 0], [318, 26], [300, 48], [250, 55], [120, 57], [-60, 56], [-160, 50], [-212, 40], [-222, 0]];
  ctx.beginPath(); bioPad(ctx, HUIS, true); shape(ctx, '#D9DFE7', '#F4F7FA', 2);
  ctx.beginPath(); bioPad(ctx, HUIS.map(([px, py]) => [px * 0.97 + 4, py * 0.8]), true); ctx.strokeStyle = rgba('#AEB8C6', 0.6); ctx.lineWidth = 1.5; ctx.stroke(); // naad
  // venster: verdiepte rand, witte strook, lijnen
  const venster = (r = 0) => { ctx.beginPath(); roundRect(ctx, VX0 - r, -VH - r, VX1 - VX0 + 2 * r, 2 * VH + 2 * r, VH + r); };
  venster(6); shape(ctx, '#C3CBD6', '#EEF2F6', 1.5);
  venster(); ctx.fillStyle = '#5E6878'; ctx.fill();
  const strook = () => { ctx.beginPath(); ctx.rect(VX0, -STR, VX1 - VX0, 2 * STR); };
  ctx.save(); venster(); ctx.clip(); strook(); ctx.fillStyle = '#F4F2EE'; ctx.fill();
  nat(strook, -STR, STR, '#C9C4BA', 0.35); // natte strook iets grijzer
  if (u > 0.001) { ctx.save(); strook(); ctx.clip(); const wb = 46; // roze waas vlak achter het front
    for (let yy = -STR; yy < STR; yy += 2) { const fx = front(yy); const fade = clamp((VX1 + 30 - xf) / 40, 0, 1); ctx.fillStyle = rgba('#D88AB4', 0.32 * fade); ctx.fillRect(fx - wb, yy, wb, 2); } ctx.restore(); }
  const lijn = (lx, k) => { const zicht = clamp((xf - lx - 4) / 22, 0, 1) * clamp(k, 0, 1); if (zicht <= 0.01) return; ctx.fillStyle = rgba('#B4407E', 0.92 * zicht); ctx.fillRect(lx - 3.5, -STR, 7, 2 * STR); };
  lijn(XT, T); lijn(XC, Cl);
  ctx.restore();
  venster(); ctx.strokeStyle = rgba('#3E4858', 0.7); ctx.lineWidth = 2; ctx.stroke();
  // duimgreep: ovale holte met ribbels
  ctx.beginPath(); ctx.ellipse(238, 0, 54, 34, 0, 0, 6.283); shape(ctx, '#CDD4DE', '#EEF2F6', 1.5);
  ctx.strokeStyle = rgba('#9EA9B8', 0.75); ctx.lineWidth = 2.4; for (let k = -3; k <= 3; k++) { const xx = 238 + k * 13; const hh = 30 * Math.sqrt(Math.max(0, 1 - Math.pow((xx - 238) / 54, 2))) - 5; ctx.beginPath(); ctx.moveTo(xx, -hh); ctx.quadraticCurveTo(xx + 3, 0, xx, hh); ctx.stroke(); }
  ctx.restore();
  return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: placenta in doorsnede, vlok vergroot
// =====================================================================================
// =====================================================================================
// obj_placenta.js — placenta (doorsnede) en één vlok vergroot, voor lib_bio.js (prompt v8, C9 Tekenrecepten)
// Vereist: lib_bio.js (BIO, bioDicht, bioPunt, bioPad) en de globale hulpjes C, rgba, lighten, hash, clamp, lerp,
// ease, shape, roundRect. Kleurtaal zuurstof: zuurstofrijk bloed rood (BIO.bloed), zuurstofarm FOETAAL bloed
// blauwpaars (PLAC.arm), zuurstofarm MOEDERLIJK bloed in de aders blauw (BIO.ader).
// =====================================================================================

const PLAC = {
  arm: '#7E5EA8',      // zuurstofarm foetaal bloed (navelstrengslagaders, chorionslagaders, begin haarvatlus)
  vlok: '#D7A596',     // vlokweefsel (bindweefselkern), lichtroze-beige
  syn: '#E8C27E',      // syncytiotrofoblast: goudgetinte buitenlaag
  synD: '#B8924E',
  chorion: '#CDB4BC',  // chorionplaat (bindweefsel)
  amnion: '#E9DDE4',
  streng: '#D8CDD6',   // navelstreng (gelei van Wharton)
  meer: '#C2453E',     // moederbloed in de intervilleuze ruimte (met lage dekking)
  lumen: '#3A1A22'
};
function _plMix(h1, h2, u) { // twee hex-kleuren mengen, vlakke kleur (geen verloop)
  const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const A = p(h1), B = p(h2); u = clamp(u, 0, 1);
  return `rgb(${Math.round(lerp(A[0], B[0], u))},${Math.round(lerp(A[1], B[1], u))},${Math.round(lerp(A[2], B[2], u))})`;
}
function _plCel(ctx, x, y, r, an, kant, col) { // rode bloedcel (ingedeukte schijf) met eigen kleur
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const ry = r * lerp(1, 0.34, kant);
  ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, col, lighten(col[0] === '#' ? col : '#C2453E', 0.25), Math.max(0.8, r * 0.09));
  ctx.beginPath(); ctx.ellipse(0, 0, r * (kant > 0.8 ? 0.3 : 0.45), ry * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#3A0E1E', 0.3); ctx.fill();
  ctx.restore();
}
function _plLijn(ctx, P, off, lw, col, g = 1) { // polylijn met zijwaartse verschuiving (off, in px) tot fractie g
  const n = Math.max(2, Math.ceil(P.length * clamp(g, 0, 1))); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; const an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const q = [P[i][0] - Math.sin(an) * off, P[i][1] + Math.cos(an) * off]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
  ctx.stroke();
}

// =====================================================================================
// PLACENTA, DOORSNEDE (stuk uit het midden, foetale kant boven, baarmoederwand onder).
// Recept (Sadler, Langman's Medical Embryology h. 8 'Placenta'; Junqueira h. 22; Benirschke 'Pathology of the
// Human Placenta'): voldragen placenta schijf van 15–25 cm doorsnede en 2–3 cm dik, 500–600 g. Lagen van boven
// naar onder: amnion (dun vlies) – chorionplaat (± 1 mm, met de chorionvaten) – intervilleuze ruimte met de
// vlokkenbomen (± 2 cm) – basale plaat / decidua basalis (± 1 mm) – spierlaag. Septa (placentasepta) steken
// vanuit de basale plaat omhoog maar bereiken de chorionplaat NIET; ze verdelen de placenta in 15–20 kwabben
// (cotyledonen). Per kwab één (of enkele) stamvlok uit de chorionplaat, die zich 3–4× vertakt (stamvlok ± 150 µm,
// intermediaire vlok ± 80 µm, eindvlokjes 40–80 µm, elk met een haarvatlus); enkele hechtvlokken lopen door tot
// in de basale plaat. De vlokkenboom vormt een klok met een vlokarm midden (centrale holte) recht boven de
// opening van een spiraalslagader. Ongeveer 80–100 spiraalslagaders (verbreed, trechtervormige monding) spuiten
// moederbloed omhoog tot tegen de chorionplaat; het zakt langs de vlokken terug en loopt via aderopeningen in de
// basale plaat (bij de septa) weg. Intervilleuze ruimte ± 150 ml, 2–3× per minuut ververst. Navelstreng: 2
// slagaders (zuurstofarm, van het kind naar de placenta) die spiraalsgewijs om 1 ader (zuurstofrijk, naar het
// kind) draaien, in gelei van Wharton; meestal iets uit het midden aangehecht. Moederbloed en kindbloed mengen
// niet: er ligt altijd vlokweefsel tussen.
// Hier: 5 kwabben van elk 260 breed in een stuk van 1300 × 560 (ontwerpcoördinaten, oorsprong = midden).
// Lagen verticaal ± 2,5× overdreven t.o.v. de breedte (anders is de vlokkenboom onleesbaar). Rode bloedcellen in
// het overzicht ± 2× te groot (r 3,5) zodat de stroom zichtbaar is; vlokdiktes onderling wel in verhouding.
// Bekende fouten: moederbloed dat in de vlokvaten stroomt (mengen); vlokken als losse vingers zonder boom;
// septa die tot de chorionplaat lopen; navelstrengslagaders rood getekend in een zuurstofverhaal (ze voeren
// zuurstofarm bloed); vlokken die nergens vastzitten (geen hechtvlokken); aders zonder afvoer; spiraalslagader
// als rechte buis zonder trechter.
// =====================================================================================
const _PL = { yAm: -188, yCh0: -184, yCh1: -150, yBas: 170, yMy: 232, yOnder: 280, kw: 260, nKw: 5 };
function _plBomen() {
  if (_bioPolyCache.placentaBomen) return _bioPolyCache.placentaBomen;
  const segs = [], toppen = [], stammen = [];
  const binnen = (x, y, cx) => [clamp(x, cx - 112, cx + 112), clamp(y, _PL.yCh1 + 14, _PL.yBas - 6)];
  const seg = (x0, y0, ang, len, w, d, sd, cx, extra = {}) => {
    const bend = (hash(sd * 3.1 + 7) - 0.5) * 0.5;
    let [x1, y1] = binnen(x0 + Math.cos(ang) * len, y0 + Math.sin(ang) * len, cx);
    const mx = (x0 + x1) / 2 + Math.cos(ang + Math.PI / 2) * len * bend * 0.3, my = (y0 + y1) / 2 + Math.sin(ang + Math.PI / 2) * len * bend * 0.3;
    const P = []; for (let i = 0; i <= 10; i++) { const u = i / 10; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); }
    const s = Object.assign({ P, w, d, leaf: false, cx }, extra); segs.push(s); return s;
  };
  // zijtakken (intermediaire vlokken → eindvlokjes) aan een segment
  const takken = (s, sd, n, maxD) => {
    for (let k = 0; k < n; k++) { const f = 0.35 + 0.5 * (k + hash(sd + k * 5)) / n; const [px, py, an] = bioPunt(s.P, f);
      const kant = (k + Math.floor(hash(sd * 2 + 1) * 2)) % 2 ? 1 : -1; const ang = an + kant * (0.7 + 0.5 * hash(sd + k * 11));
      const d = s.d + 1; const len = (d === 2 ? 52 : 30) * (0.8 + 0.4 * hash(sd + k * 13)); const w = Math.max(7, s.w * 0.64);
      const c = seg(px, py, ang, len, w, d, sd * 7 + k, s.cx, { pw: s.w });
      if (d < maxD) takken(c, sd * 7 + k + 3, 2, maxD); else { c.leaf = true; const e = c.P[10]; toppen.push([e[0], e[1], w * 0.85]); } }
  };
  for (let k = 0; k < _PL.nKw; k++) {
    const cx = (k - (_PL.nKw - 1) / 2) * _PL.kw; const sx = cx + (hash(k * 9 + 1) - 0.5) * 30, sd = 100 + k * 37;
    // stamvlok uit de chorionplaat naar beneden, splitst in twee armen (klokvorm rond de centrale holte)
    const stam = seg(sx, _PL.yCh1 - 4, Math.PI / 2 + (hash(sd) - 0.5) * 0.15, 92, 24, 0, sd, cx); stammen.push([sx, cx]);
    takken(stam, sd + 1, 2, 3);
    for (const z of [-1, 1]) {
      const e = stam.P[10]; const arm = seg(e[0], e[1], Math.PI / 2 - z * 0.62, 118, 17, 1, sd + z * 5, cx, { pw: 10 });
      takken(arm, sd + z * 13, 3, 3);
      // hechtvlok: loopt door tot in de basale plaat (verankering)
      const a2 = arm.P[10]; const tx = cx + z * (88 + 14 * hash(sd + z)); const hecht = seg(a2[0], a2[1], Math.atan2(_PL.yBas + 8 - a2[1], tx - a2[0]), Math.hypot(_PL.yBas + 8 - a2[1], tx - a2[0]), 13, 2, sd + z * 17, cx, { anker: true, pw: 10 });
      hecht.P[10] = [tx, _PL.yBas + 8];
      takken(hecht, sd + z * 19, 2, 3);
    }
  }
  segs.sort((A, B) => A.d - B.d);
  return (_bioPolyCache.placentaBomen = { segs, toppen, stammen });
}

function placentaDoorsnede(ctx, x, y, w = 1300, h = 560, o = {}) {
  const { a = 1, t = 0, vlokken = 1, moederbloed = 1, navel = 1, focus = -1, kind = null, kleurO2 = true } = o;
  const S = w / 1300, Sy = h / 560, P = (lx, ly) => [x + lx * S, y + ly * Sy];
  const B = _plBomen(); const midTop = B.toppen.reduce((best, p) => (Math.hypot(p[0] - 40, p[1] + 10) < Math.hypot(best[0] - 40, best[1] + 10) ? p : best), B.toppen[0]);
  const NAV = [-70, _PL.yAm];
  const ret = { navel: P(NAV[0], NAV[1]), vlokTop: P(midTop[0], midTop[1]), moederbloed: P(-30, 60), slagader: P(0, _PL.yBas), wand: P(0, (_PL.yBas + _PL.yOnder) / 2),
    toppen: B.toppen.map(p => P(p[0], p[1])) };
  if (a <= 0.01) return ret;
  const ARM = kleurO2 ? PLAC.arm : BIO.bloed, RIJK = kleurO2 ? BIO.bloed : BIO.ader; // kleurO2 false = anatomisch (slagader rood, ader blauw), zoals castNavelstreng // navelstreng: slagaders ARM, ader RIJK
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -650, R = 650; const kws = Array.from({ length: _PL.nKw }, (_, k) => (k - (_PL.nKw - 1) / 2) * _PL.kw);

  // ---- 1. intervilleuze ruimte (leeg = donker) en moederbloed dat van onder vult --------------------
  ctx.fillStyle = rgba('#0F1724', 0.55); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
  const mb = clamp(moederbloed, 0, 1), peil = lerp(_PL.yBas, _PL.yCh1, ease(mb));
  ctx.save(); ctx.beginPath(); ctx.rect(L, peil, R - L, _PL.yBas - peil); ctx.clip();
  if (mb > 0.01) {
    ctx.fillStyle = rgba(PLAC.meer, 0.3); ctx.fillRect(L, _PL.yCh1, R - L, _PL.yBas - _PL.yCh1);
    // straal: vlakke, iets lichtere fontein boven elke slagadermonding (zelfde vorm als de stroombanen)
    kws.forEach(cx => { ctx.beginPath(); ctx.moveTo(cx - 12, _PL.yBas); ctx.bezierCurveTo(cx - 10, 40, cx - 30, -100, cx - 90, -138); ctx.lineTo(cx + 90, -138); ctx.bezierCurveTo(cx + 30, -100, cx + 10, 40, cx + 12, _PL.yBas); ctx.closePath(); ctx.fillStyle = rgba('#E07A6A', 0.16 * mb); ctx.fill(); });
    // stroom per kwab: straal omhoog uit de spiraalslagader, langs de chorionplaat opzij, langs de vlokken terug naar de aderopening
    kws.forEach((cx, k) => { for (const z of [-1, 1]) {
      const pad = bioDicht([[cx, _PL.yBas + 2], [cx + z * 4, 40], [cx + z * 12, -80], [cx + z * 55, -132], [cx + z * 112, -110], [cx + z * 120, 0], [cx + z * 116, 100], [cx + z * 108, _PL.yBas + 2]], 12);
      const n = Math.round(14 * mb); for (let i = 0; i < n; i++) { const sd = k * 97 + (z + 1) * 31 + i * 3.7;
        const u0 = ((t * 0.07 * (0.8 + 0.4 * hash(sd)) + hash(sd + 1)) % 1 + 1) % 1; const u = 1 - Math.pow(1 - u0, 1.8); // snel uit de monding, daarna trager
        const [px, py, an] = bioPunt(pad, u); const sp = (hash(sd + 2) - 0.5) * lerp(6, 46, Math.min(1, u * 3));
        _plCel(ctx, px - Math.sin(an) * sp, py + Math.cos(an) * sp, 3.5, an + t * (0.5 + hash(sd + 3)), 0.5 + 0.5 * Math.sin(t * 1.5 + i), BIO.bloed); } } });
    // rustig drijvende cellen in de meren
    for (let i = 0; i < Math.round(60 * mb); i++) { const bx = L + 10 + hash(i * 5.3 + 2) * (R - L - 20), by = _PL.yCh1 + 14 + hash(i * 5.3 + 3) * (_PL.yBas - _PL.yCh1 - 28);
      _plCel(ctx, bx + Math.sin(t * 0.4 + i) * 6, by + ((t * 4 * (0.5 + hash(i + 9))) % 20) - 10, 3.5, i + t * 0.3, 0.5 + 0.5 * Math.sin(t + i * 2), BIO.bloed); }
  }
  ctx.restore();

  // ---- 2. basale plaat (decidua basalis) met septa, en spierlaag ----------------------------------
  // spierlaag (context, halve detailmaat)
  ctx.fillStyle = rgba(BIO.spier, 0.5); ctx.fillRect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy);
  ctx.save(); ctx.beginPath(); ctx.rect(L, _PL.yMy, R - L, _PL.yOnder - _PL.yMy); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.4); ctx.lineWidth = 1.5;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) { ctx.beginPath(); ctx.ellipse(L + (c + (r % 2) * 0.5) * 62, _PL.yMy + 10 + r * 15, 26, 3, 0.05 * Math.sin(c * 3 + r), 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // decidua basalis + septa (wiggen omhoog tot ± 2/3 van de hoogte, niet tot de chorionplaat)
  const basPad = () => { ctx.beginPath(); ctx.moveTo(L, _PL.yMy); ctx.lineTo(L, _PL.yBas);
    for (let k = 0; k < _PL.nKw - 1; k++) { const sx = (kws[k] + kws[k + 1]) / 2, top = -10 - 30 * hash(k * 3 + 5);
      ctx.lineTo(sx - 34, _PL.yBas); ctx.bezierCurveTo(sx - 16, _PL.yBas - 30, sx - 16, top + 30, sx - 9, top + 6); ctx.quadraticCurveTo(sx, top - 8, sx + 9, top + 6); ctx.bezierCurveTo(sx + 16, top + 30, sx + 16, _PL.yBas - 30, sx + 34, _PL.yBas); }
    ctx.lineTo(R, _PL.yBas); ctx.lineTo(R, _PL.yMy); ctx.closePath(); };
  basPad(); shape(ctx, _plMix('#1A2740', BIO.slijm, 0.72), null);
  // deciduacellen (grote bleke cellen), rustig
  ctx.save(); basPad(); ctx.clip(); ctx.strokeStyle = rgba('#F6E2D6', 0.22); ctx.lineWidth = 1.2;
  for (let i = 0; i < 70; i++) { const cx2 = L + hash(i * 3.3) * (R - L), cy2 = _PL.yBas + 6 + hash(i * 3.3 + 1) * (_PL.yMy - _PL.yBas - 10); ctx.beginPath(); ctx.ellipse(cx2, cy2, 9, 6, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  ctx.restore();
  // bovenrand basale plaat lichter
  ctx.save(); basPad(); ctx.clip(); basPad(); ctx.strokeStyle = rgba('#F6E2D6', 0.7); ctx.lineWidth = 4; ctx.stroke(); ctx.restore();

  // moederlijke aders: twee openingen aan weerszijden van elk septum (en aan de randen), die onder het septum samenkomen
  // en schuin door de spierlaag weglopen (blauw, zuurstofarm moederbloed). Dunner dan de spiraalslagaders.
  const septX = [L - 0, ...kws.slice(0, -1).map((c, k) => (c + kws[k + 1]) / 2), R];
  septX.forEach((sx, k) => { const opn = [sx - 40, sx + 40].filter(ox => ox > L + 6 && ox < R - 6); const vx = clamp(sx, L + 14, R - 14), vy = _PL.yMy - 6;
    opn.forEach(ox => { ctx.beginPath(); bioPad(ctx, [[ox, _PL.yBas - 1], [lerp(ox, vx, 0.35), _PL.yBas + 26], [vx, vy]], false); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 10; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 7; ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(vx, vy); ctx.quadraticCurveTo(vx + 4, _PL.yMy + 24, vx + 14, _PL.yOnder + 4); ctx.strokeStyle = lighten(BIO.ader, 0.25); ctx.lineWidth = 12; ctx.stroke(); ctx.strokeStyle = BIO.ader; ctx.lineWidth = 9; ctx.stroke();
    opn.forEach(ox => { ctx.beginPath(); ctx.ellipse(ox, _PL.yBas, 7, 2.5, 0, 0, 6.283); ctx.fillStyle = rgba(PLAC.lumen, 0.9); ctx.fill(); }); });
  // spiraalslagaders: kronkelend omhoog door spierlaag en decidua, trechtervormige monding midden onder elke kwab
  kws.forEach((cx, k) => { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const yy = lerp(_PL.yOnder + 4, _PL.yBas + 4, u); pts.push([cx + Math.sin(u * 6.283 * 2.2 + k) * 11 * (1 - u * 0.8), yy]); }
    for (const [lw, col] of [[12, lighten(BIO.bloed, 0.3)], [9, BIO.bloed]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(cx - 6, _PL.yBas + 18); ctx.quadraticCurveTo(cx - 7, _PL.yBas + 4, cx - 15, _PL.yBas - 1); ctx.lineTo(cx + 15, _PL.yBas - 1); ctx.quadraticCurveTo(cx + 7, _PL.yBas + 4, cx + 6, _PL.yBas + 18); ctx.closePath();
    shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.3), 1.5);
    // bloed in de slagader stroomt omhoog (alleen als moederbloed aan staat)
    if (mb > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4 + k * 0.13) % 1); const [px, py] = bioPunt(pts, u); ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 6.283); ctx.fillStyle = rgba('#F2C0B4', 0.75 * mb); ctx.fill(); } });

  // ---- 3. vlokkenbomen (groeien uit de chorionplaat) ------------------------------------------------
  const vk = clamp(vlokken, 0, 1); const gD = d => clamp(vk * 4.2 - d, 0, 1);
  const zicht = B.segs.filter(s => gD(s.d) > 0.01);
  const deel = (s) => { const g = gD(s.d); const n = Math.max(2, Math.round(s.P.length * g)); const Q = s.P.slice(0, n); if (g < 1) { const [px, py] = bioPunt(s.P, g); Q[Q.length - 1] = [px, py]; } return Q; };
  const streep = (Q, lw, col) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
  // rand (goudgetinte syncytiotrofoblast) en dan het weefsel
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w + 3.5, PLAC.syn); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85 + 1.75, 0, 6.283); ctx.fillStyle = PLAC.syn; ctx.fill(); }
    if (s.anker && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.moveTo(e[0] - 18, _PL.yBas + 2); ctx.quadraticCurveTo(e[0] - 6, e[1] - 16, e[0], e[1] - 22); ctx.quadraticCurveTo(e[0] + 6, e[1] - 16, e[0] + 18, _PL.yBas + 2); ctx.closePath(); shape(ctx, PLAC.vlok, PLAC.syn, 1.75); } });
  zicht.forEach(s => { const Q = deel(s); streep(Q, s.w, PLAC.vlok); if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1]; ctx.beginPath(); ctx.arc(e[0], e[1], s.w * 0.85, 0, 6.283); ctx.fillStyle = PLAC.vlok; ctx.fill(); } });
  // foetale vaten in de vlokken: slagader (zuurstofarm) en ader (zuurstofrijk) naast elkaar, eindvlokjes met een haarvatlus
  zicht.forEach(s => { let Q = deel(s); const lw = Math.max(1.4, s.w * 0.17); const pw = (s.pw || 0) * 0.5; if (pw) { const q0 = Q[0]; const k0 = Q.findIndex(p => Math.hypot(p[0] - q0[0], p[1] - q0[1]) >= pw); Q = k0 > 0 ? Q.slice(k0 - 1) : Q.slice(-2); } // vaten van een zijtak beginnen aan de rand van de moedertak
    if (Q.length < 2) return; _plLijn(ctx, Q, -s.w * 0.2, lw, ARM); _plLijn(ctx, Q, s.w * 0.2, lw, RIJK);
    if (s.leaf && gD(s.d) > 0.95) { const e = Q[Q.length - 1], q = Q[Q.length - 2]; const an = Math.atan2(e[1] - q[1], e[0] - q[0]); const rr = s.w * 0.42;
      ctx.lineWidth = lw; ctx.strokeStyle = ARM; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an + Math.PI / 2, an + Math.PI * 1.5, true); ctx.stroke();
      ctx.strokeStyle = RIJK; ctx.beginPath(); ctx.arc(e[0], e[1], rr, an - Math.PI / 2, an + Math.PI / 2, false); ctx.stroke(); } });
  if (focus >= 0 && focus < B.toppen.length && vk > 0.95) { const [fx, fy, fr] = B.toppen[focus]; ctx.beginPath(); ctx.arc(fx, fy, fr + 7, 0, 6.283); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3 / S; ctx.stroke(); }

  // ---- 4. chorionplaat met amnion en chorionvaten ---------------------------------------------------
  ctx.fillStyle = PLAC.chorion; ctx.fillRect(L, _PL.yCh0, R - L, _PL.yCh1 - _PL.yCh0);
  ctx.strokeStyle = lighten(PLAC.chorion, 0.3); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(L, _PL.yCh1); ctx.lineTo(R, _PL.yCh1); ctx.stroke();
  ctx.fillStyle = PLAC.amnion; ctx.fillRect(L, _PL.yAm, R - L, 5);
  // chorionvaten: vanaf de navelstrengaanhechting naar links en rechts, dunner naar buiten, met een tak omlaag in elke stamvlok
  const vatW = dx => Math.max(2.5, 9 - Math.abs(dx) / 85);
  for (const [vy, col] of [[-176, ARM], [-160, RIJK]]) {
    for (const z of [-1, 1]) { const xEnd = z < 0 ? L : R; const n = 30;
      for (let i = 0; i < n; i++) { const xa = lerp(NAV[0], xEnd, i / n), xb = lerp(NAV[0], xEnd, (i + 1) / n); ctx.strokeStyle = col; ctx.lineWidth = vatW(xa - NAV[0]); ctx.beginPath(); ctx.moveTo(xa, vy + Math.sin(xa / 70) * 2); ctx.lineTo(xb, vy + Math.sin(xb / 70) * 2); ctx.stroke(); } }
    if (vk > 0.01) B.stammen.forEach(([sx]) => { ctx.strokeStyle = col; ctx.lineWidth = Math.max(2, vatW(sx - NAV[0]) * 0.8); const off = col === ARM ? -5 : 5; ctx.beginPath(); ctx.moveTo(sx + off * 2.2, vy + Math.sin(sx / 70) * 2); ctx.quadraticCurveTo(sx + off, vy + 8, sx + off * 0.95, _PL.yCh1 + 2); ctx.stroke(); });
  }

  // ---- 5. navelstreng: van de aanhechting naar boven (kind buiten beeld) of naar o.kind --------------
  // Navelstreng ± 1,5–2 cm dik (hier 34 = op de schaal van de lagen), 2 slagaders draaien spiraalsgewijs om 1 ader.
  const nv = clamp(navel, 0, 1);
  if (nv > 0.01) { const eind = kind ? [(kind[0] - x) / S, (kind[1] - y) / Sy] : [NAV[0] - 120, -420]; const sw = 34;
    const ex = lerp(NAV[0], eind[0], nv), ey = lerp(NAV[1] - 20, eind[1], nv);
    ctx.save(); ctx.globalAlpha *= clamp(nv * 4, 0, 1);
    // aanhechting: verbreed voetje op het amnion
    ctx.beginPath(); ctx.moveTo(NAV[0] - 42, _PL.yAm + 1); ctx.bezierCurveTo(NAV[0] - 22, _PL.yAm - 2, NAV[0] - 17, _PL.yAm - 10, NAV[0] - 17, _PL.yAm - 26); ctx.lineTo(NAV[0] + 17, _PL.yAm - 26); ctx.bezierCurveTo(NAV[0] + 17, _PL.yAm - 10, NAV[0] + 22, _PL.yAm - 2, NAV[0] + 42, _PL.yAm + 1); ctx.closePath(); shape(ctx, PLAC.streng, null);
    if (!kleurO2) { castNavelstreng(ctx, NAV[0], NAV[1] - 20, ex, ey, t, 1, sw); }
    else { const d = Math.hypot(ex - NAV[0], ey - NAV[1] + 20) || 1, nx = -(ey - NAV[1] + 20) / d, ny = (ex - NAV[0]) / d; const N = 60;
      const pts = []; for (let i = 0; i <= N; i++) { const u = i / N, wv = Math.sin(u * 5 + t * 0.8) * 14 * Math.sin(u * Math.PI); pts.push([lerp(NAV[0], ex, u) + nx * wv, lerp(NAV[1] - 20, ey, u) + ny * wv]); }
      pts.unshift([NAV[0], NAV[1] - 2]);
      streep(pts, sw + 3, lighten(PLAC.streng, 0.35)); streep(pts, sw, PLAC.streng);
      const draai = d / 70; // ± één winding per 70 px
      const spiraal = (ph, voor) => { ctx.strokeStyle = ARM; ctx.lineWidth = sw * 0.2;
        for (let i = 1; i < pts.length - 1; i++) { const u = i / (pts.length - 1), u2 = (i + 1) / (pts.length - 1); const c1 = Math.cos(u * draai * 6.283 + ph); if ((c1 >= 0) !== voor) continue;
          const p = pts[i], q = pts[i + 1]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const o1 = Math.sin(u * draai * 6.283 + ph) * sw * 0.3, o2 = Math.sin(u2 * draai * 6.283 + ph) * sw * 0.3;
          ctx.beginPath(); ctx.moveTo(p[0] - Math.sin(an) * o1, p[1] + Math.cos(an) * o1); ctx.lineTo(q[0] - Math.sin(an) * o2, q[1] + Math.cos(an) * o2); ctx.stroke(); } };
      ctx.save(); ctx.globalAlpha *= 0.55; spiraal(0, false); spiraal(Math.PI, false); ctx.restore();
      _plLijn(ctx, pts, 0, sw * 0.3, RIJK);
      spiraal(0, true); spiraal(Math.PI, true); }
    ctx.restore();
  }
  ctx.restore(); return ret;
}

// =====================================================================================
// EÉN VLOK VERGROOT (eindvlokje, voldragen placenta), moederbloed links, vlok rechts met het oppervlak naar links.
// Recept (Junqueira h. 22; Sadler h. 8; Benirschke h. 7 'Terminal villi'): eindvlokje 40–80 µm dik. Van buiten
// naar binnen: microvilli (borstelzoom, ± 1 µm lang) – syncytiotrofoblast: één doorlopende laag zonder celgrenzen
// met veel kernen, 2–10 µm dik; boven een haarvat dunner (± 1–2 µm) en daar zonder kernen (vasculosyncytiale
// membraan), de kernen liggen in groepjes elders (syncytiële knopen) – enkele cytotrofoblastcellen (bij voldragen
// placenta schaars) – basaalmembraan – bindweefselkern (stroma) met fibroblasten – foetaal haarvat (sinusoïdaal
// verwijd, 10–30 µm) met dun endotheel (± 0,5 µm) dat tegen de trofoblast aandrukt. Totale barrière moederbloed →
// kindbloed aan het eind van de zwangerschap ± 2–4 µm (vroeg 20–30 µm). Rode bloedcel 7,5 µm.
// Hier: schaal ± 3 px/µm (rode bloedcel r 11 = 7,5 µm); barrière over het haarvat 9 + 3 + 3 = 15 px (± 5 µm,
// iets ruimer dan 2–4 µm zodat de lagen zichtbaar blijven), dus dunner dan één rode bloedcel. Haarvatlumen 44 px
// (± 15 µm). Foetaal bloed komt blauwpaars binnen (boven) en verlaat de lus rood (onder).
// Bekende fouten: dikke barrière (dikker dan een bloedcel); losse trofoblastcellen met celgrenzen aan de buitenkant
// (het syncytium is één laag); haarvat midden in de vlok in plaats van vlak onder het oppervlak; moeder- en
// kindbloed die elkaar raken; kernen in het dunne deel boven het haarvat.
// =====================================================================================
function vlokVergroot(ctx, x, y, w = 900, h = 520, o = {}) {
  const { a = 1, t = 0, laag = 0 } = o;
  const S = w / 900, Sy = h / 520;
  const X0 = -160, HV = 212, SYN_D = 9, SYN_K = 22, GAP = 3, ENDO = 3, LUM = 22;
  const opp = yy => X0 + 150 * Math.pow(Math.min(1, Math.abs(yy) / HV), 6);        // buitenoppervlak (ontwerpcoörd.)
  const dik = yy => lerp(SYN_D, SYN_K, clamp((Math.abs(yy) - 120) / 50, 0, 1));     // syncytium dun boven het haarvat
  const kapC = yy => opp(yy) + dik(yy) + GAP + ENDO + LUM;                          // haarvat-middellijn
  const ret = { barriereX: yy => x + (opp((yy - y) / Sy) + (SYN_D + GAP + ENDO) / 2) * S, moederX: x + (X0 - 170) * S, kindX: yy => x + kapC((yy - y) / Sy) * S,
    y0: y - 115 * Sy, y1: y + 115 * Sy };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(S, Sy); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = -450, R = 450, T = -260, Bn = 260;
  ctx.save(); roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.clip();
  // moederbloed (vult alles buiten de vlok)
  ctx.fillStyle = _plMix('#1A2740', PLAC.meer, 0.34); ctx.fillRect(L, T, R - L, Bn - T);
  // vlokomtrek
  const omtrek = (inset) => { const pts = []; for (let i = 0; i <= 60; i++) { const yy = lerp(-HV + inset, HV - inset, i / 60); pts.push([opp(yy) + inset, yy]); } return pts; };
  const vlokPad = (inset) => { const O = omtrek(inset); ctx.beginPath(); ctx.moveTo(R + 10, -HV + inset); O.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(R + 10, HV - inset); ctx.closePath(); };
  // moederlijke rode bloedcellen: drijven langzaam langs het oppervlak omlaag (achter de microvilli, vóór de vlok niet)
  for (let i = 0; i < 26; i++) { const sp = 14 + 10 * hash(i * 3 + 1); const yy = ((hash(i * 3 + 2) * 620 + t * sp) % 620) - 310;
    let xx = L + 20 + hash(i * 3 + 3) * 300 + Math.sin(t * 0.5 + i) * 8; if (Math.abs(yy) < HV + 14) xx = Math.min(xx, opp(yy) - 26); else xx = L + 20 + hash(i * 3 + 3) * 840;
    _plCel(ctx, xx, yy, 11, i * 1.3 + t * 0.25 * (hash(i) - 0.5), 0.5 + 0.5 * Math.sin(t * 0.8 + i * 1.9), BIO.bloed); }
  // microvilli (borstelzoom, ± 1 µm) langs het hele oppervlak naar het moederbloed
  { const O = omtrek(0); const full = [[R + 10, -HV], ...O.slice().reverse().map(p => [p[0], -p[1]]).reverse(), [R + 10, HV]]; // linkerkant
    const top = []; for (let xx = R; xx > opp(-HV + 1); xx -= 7) top.push([xx, -HV, 0, -1]); const bot = []; for (let xx = opp(HV - 1); xx < R; xx += 7) bot.push([xx, HV, 0, 1]);
    const zij = []; const D = bioDicht(O, 6); let acc = 0; for (let i = 1; i < D.length; i++) { acc += Math.hypot(D[i][0] - D[i - 1][0], D[i][1] - D[i - 1][1]); if (acc < 4.5) continue; acc = 0; const dx = D[i][0] - D[i - 1][0], dy = D[i][1] - D[i - 1][1], nn = Math.hypot(dx, dy) || 1; zij.push([D[i][0], D[i][1], -dy / nn, dx / nn]); }
    ctx.strokeStyle = rgba(PLAC.syn, 0.85); ctx.lineWidth = 2; [...top, ...zij, ...bot].forEach((m, i) => { const lm = 6 + 2 * hash(i); ctx.beginPath(); ctx.moveTo(m[0], m[1]); ctx.lineTo(m[0] + m[2] * lm, m[1] + m[3] * lm); ctx.stroke(); }); }
  // syncytiotrofoblast (goudgetint, doorlopend)
  vlokPad(0); shape(ctx, PLAC.syn, lighten(PLAC.syn, 0.35), 2);
  // bindweefselkern (stroma)
  const binnenPad = () => { ctx.beginPath(); ctx.moveTo(R + 10, -HV + SYN_K); for (let i = 0; i <= 80; i++) { const yy = lerp(-HV + SYN_K, HV - SYN_K, i / 80); ctx.lineTo(opp(yy) + dik(yy) + (Math.abs(yy) > HV - 40 ? (Math.abs(yy) - HV + 40) * 0.0 : 0), yy); } ctx.lineTo(R + 10, HV - SYN_K); ctx.closePath(); };
  binnenPad(); shape(ctx, _plMix('#1A2740', PLAC.vlok, 0.62), rgba('#F2E6DA', 0.5), 1.5); // lichte lijn = basaalmembraan
  // kernen van het syncytium: alleen in het dikke deel, in groepjes (syncytiële knopen)
  const kernen = [[-198, 4], [-184, 2], [-172, 3], [-150, 1], [150, 2], [168, 4], [190, 3], [-130, 1], [132, 1]];
  kernen.forEach(([yy0, n], g) => { for (let k = 0; k < n; k++) { const yy = yy0 + (k - (n - 1) / 2) * 11 * Math.sign(yy0); const xx = opp(yy) + dik(yy) * 0.5;
    ctx.beginPath(); ctx.ellipse(xx, yy, 6.5, 4, Math.atan2(1, (opp(yy + 1) - opp(yy - 1)) / 2) , 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); } });
  // twee cytotrofoblastcellen onder het syncytium (schaars bij voldragen placenta)
  for (const yy of [-150, 148]) { const xx = opp(yy) + dik(yy) + 9; ctx.beginPath(); ctx.ellipse(xx, yy, 9, 14, 0.15 * Math.sign(yy), 0, 6.283); shape(ctx, _plMix('#1A2740', PLAC.syn, 0.6), rgba(PLAC.syn, 0.8), 1.2);
    ctx.beginPath(); ctx.arc(xx + 1, yy, 4.5, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // fibroblasten in de kern (langgerekte kernen), rustig
  ctx.save(); binnenPad(); ctx.clip();
  [[110, -60, 0.4], [250, 20, -0.3], [330, -120, 0.2], [180, 100, -0.5], [390, 90, 0.6], [60, -10, 1.2], [300, 190, 0.1], [240, -190, -0.2]].forEach(([fx, fy, fa]) => {
    ctx.beginPath(); ctx.ellipse(fx, fy, 16, 4.5, fa, 0, 6.283); shape(ctx, rgba((C.nucFill || '#6E5A9E'), 0.75), rgba((C.nucEdge || '#A392D6'), 0.6), 1);
    ctx.strokeStyle = rgba('#F2E6DA', 0.25); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx - Math.cos(fa) * 34, fy - Math.sin(fa) * 34); ctx.lineTo(fx + Math.cos(fa) * 34, fy + Math.sin(fa) * 34); ctx.stroke(); });
  // foetale haarvatlus: binnen rechtsboven, langs het oppervlak omlaag, rechtsonder weer weg
  const rv = [[R + 20, -148], [120, -150], [-40, -152], [kapC(-110) + 22, -128]]; for (let yy = -100; yy <= 100; yy += 25) rv.push([kapC(yy), yy]); rv.push([kapC(110) + 22, 128], [-40, 152], [120, 150], [R + 20, 148]);
  const K = bioDicht(rv, 14);
  const pad = () => { ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  pad(); ctx.strokeStyle = rgba('#F2D8D0', 0.9); ctx.lineWidth = 2 * (LUM + ENDO); ctx.stroke();      // endotheel (dunne wand)
  pad(); ctx.strokeStyle = PLAC.lumen; ctx.lineWidth = 2 * LUM; ctx.stroke();                         // lumen
  // lumen getint naar zuurstofgehalte: blauwpaars binnen, rood bij het verlaten (vlakke stukken, kleurwissel halverwege de barrière)
  const kN = K.length - 1, stuk = (u0, u1, col) => { ctx.beginPath(); for (let i = Math.round(u0 * kN); i <= Math.round(u1 * kN); i++) i === Math.round(u0 * kN) ? ctx.moveTo(K[i][0], K[i][1]) : ctx.lineTo(K[i][0], K[i][1]); ctx.strokeStyle = col; ctx.lineWidth = 2 * LUM; ctx.lineCap = 'butt'; ctx.stroke(); ctx.lineCap = 'round'; };
  stuk(0, 0.42, _plMix(PLAC.lumen, PLAC.arm, 0.4)); stuk(0.42, 0.58, _plMix(PLAC.lumen, '#A0517A', 0.4)); stuk(0.58, 1, _plMix(PLAC.lumen, BIO.bloed, 0.4));
  // endotheelkernen (afgeplat) in het diepe deel
  for (const [u, sd] of [[0.12, 1], [0.88, -1]]) { const [ex, ey, an] = bioPunt(K, u); ctx.beginPath(); ctx.ellipse(ex - Math.sin(an) * (LUM + 1) * sd, ey + Math.cos(an) * (LUM + 1) * sd, 9, 3, an, 0, 6.283); shape(ctx, (C.nucFill || '#6E5A9E'), (C.nucEdge || '#A392D6'), 1); }
  // foetale rode bloedcellen in de lus, kleur paars → rood terwijl ze langs de barrière gaan
  for (let i = 0; i < 16; i++) { const u = ((t * 0.045 * (0.85 + 0.3 * hash(i + 40)) + i / 16) % 1 + 1) % 1; const [px, py, an] = bioPunt(K, u); const off = (hash(i + 41) - 0.5) * LUM * 0.7;
    const m = clamp((u - 0.32) / 0.4, 0, 1); _plCel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, 11, an + Math.PI / 2 + 0.5 * Math.sin(t + i), 0.55 + 0.4 * Math.sin(t * 0.9 + i), _plMix(PLAC.arm, BIO.bloed, m)); }
  ctx.restore();
  // dunne barrière markeren (goud): van het oppervlak tot het haarvatlumen, over het rechte stuk
  if (laag > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(laag, 0, 1); const ys = [], n = 50; for (let i = 0; i <= n; i++) ys.push(lerp(-118, 118, i / n));
    ctx.beginPath(); ys.forEach((yy, i) => i ? ctx.lineTo(opp(yy) - 2, yy) : ctx.moveTo(opp(yy) - 2, yy)); for (let i = n; i >= 0; i--) ctx.lineTo(kapC(ys[i]) - LUM + 1, ys[i]); ctx.closePath();
    ctx.fillStyle = rgba(C.goldL || '#F0D58A', 0.75); ctx.fill(); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke();
    for (const yy of [-118, 118]) { ctx.beginPath(); ctx.moveTo(opp(yy) - 14, yy); ctx.lineTo(kapC(yy) - LUM + 12, yy); ctx.strokeStyle = (C.gold || '#E0B64A'); ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  roundRect(ctx, L, T, R - L, Bn - T, 18); ctx.strokeStyle = rgba('#F2F2EE', 0.25); ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return ret;
}

// =====================================================================================
// NIEUW (22 okt 2026) voor Van bevruchting tot baby 2.5: hersenen vooraanzicht, vrouwelijke organen (ook zwanger), geel lichaam
// =====================================================================================
// =====================================================================================
// obj_vrouw_brein.js — nieuwe objecten voor lib_bio.js (22 okt 2026): hersenen vooraanzicht + kijkje in het hoofd,
// vrouwelijke geslachtsorganen vooraanzicht (ook zwanger) + kijkje in de buik, geel lichaam (corpus luteum).
// Zelfde regels als lib_bio.js: vlakke vullingen met iets lichtere rand, geen tekst, deterministisch (hash),
// animatie via t, ankerpunten terug in schermcoördinaten.
// =====================================================================================

function _vbMix(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }
function _vbTab(tab, u) { if (u <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (u <= tab[i][0]) { const [u0, v0] = tab[i - 1], [u1, v1] = tab[i]; return lerp(v0, v1, (u - u0) / (u1 - u0)); } return tab[tab.length - 1][1]; }
function _vbGloed(ctx, x, y, r, col, k) { if (k <= 0.01) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(col, 0.5 * k)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill(); }
function _vbVenster(ctx, x, y, rx, ry, a = 0.72) { // zacht donker venster: gestapelde vlakke ellipsen (geen verloop)
  const n = 7; for (let i = 0; i < n; i++) { const f = 1 + (n - 1 - i) * 0.035; ctx.beginPath(); ctx.ellipse(x, y, rx * f, ry * f, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a / n * 1.6); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', a * 0.55); ctx.fill();
}

// =====================================================================================
// HERSENEN VOORAANZICHT (zoals ze in een hoofd van voren liggen; 'röntgenblik' op de middellijn).
// Recept (1 cm ≈ 8,6 px bij s = 1): breedte ± 14 cm → 120 px; kruin tot hypothalamus ± 8 cm → 68 px;
// hypothalamus → hypofyse ± 1,2 cm (steeltje); hypofyse ± 1,2 × 0,8 cm (erwt, iets vergroot getekend: 12 × 9 px);
// twee hersenhelften met diepe lengtegroeve (fissura longitudinalis) tot de hersenbalk; voorhoofdskwabben rusten
// op de oogkasdaken (onderrand ± 0,7 cm boven de hypothalamus); slaapkwabben hangen lager aan de zijkant (onderrand
// ± 2 cm onder de hypothalamus, in de middelste schedelgroeve), gescheiden door de Sylvius-groeve; hypothalamus
// tussen de slaapkwabben, onder/achter de voorhoofdskwabben; hersenstam (brug ± 2,5 cm breed, verlengde merg
// ± 1,5 cm) loopt in het midden omlaag; kleine hersenen gluren naast het verlengde merg onder de slaapkwabben.
// Bron: Gray's Anatomy fig. 'brain, anterior view' / coronaal; Sobotta deel 3. Bekende fouten: hypofyse los onder
// het hele brein of in de keel; slaapkwabben even hoog als de voorhoofdskwabben; brein als twee ovalen zonder
// hersenstam. Ontwerpcoördinaten: oorsprong = hypothalamus; o.rek rekt verticaal (stripfiguren hebben een hoger hoofd).
// =====================================================================================
function breinVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hth = 0, hyp = 0, rek = 1, t = 0 } = o;
  const P = (px, py) => [x + px * s, y + py * s * rek];
  const uit = { hth: P(0, 0), hyp: P(0, 12) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * rek); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s; // lijndikte in schermpixels
  // kleine hersenen (achter, naast het verlengde merg)
  for (const d of [-1, 1]) { ctx.beginPath(); bioPad(ctx, [[d * 8, 22], [d * 22, 16], [d * 44, 22], [d * 48, 32], [d * 36, 41], [d * 16, 40], [d * 7, 32]], true); shape(ctx, _vbMix(BIO.brein, '#1A2740', 0.35), _vbMix(BIO.breinS, '#1A2740', 0.2), L(1.3));
    ctx.strokeStyle = rgba(BIO.breinD, 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(d * 12, 25 + k * 5); ctx.quadraticCurveTo(d * 30, 22 + k * 6, d * 44, 27 + k * 4); ctx.stroke(); } }
  // hersenstam: middenhersenen → brug (breder) → verlengde merg → ruggenmerg
  const STAM = [[-8, -2], [-11, 6], [-12, 14], [-10, 22], [-7, 30], [-6, 40], [-5, 52], [5, 52], [6, 40], [7, 30], [10, 22], [12, 14], [11, 6], [8, -2]];
  ctx.beginPath(); bioPad(ctx, STAM, true); shape(ctx, _vbMix(BIO.breinS, '#1A2740', 0.1), BIO.breinS, L(1.3));
  ctx.strokeStyle = rgba(BIO.breinD, 0.7); ctx.lineWidth = L(1); ctx.beginPath(); ctx.moveTo(-10, 21); ctx.quadraticCurveTo(0, 24, 10, 21); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 23); ctx.lineTo(0, 50); ctx.stroke();
  // grote hersenen: rechter helft (x > 0) ontworpen, links gespiegeld
  const HELFT = [[1.5, -67], [18, -68], [36, -62], [50, -50], [58, -33], [60, -14], [58, 2], [52, 13], [43, 19], [34, 17], [29, 9], [30, 1], [37, -5], [28, -8], [15, -8], [5, -7], [1.5, -10]];
  const GROEVEN = [[[8, -60], [20, -55], [16, -46], [28, -40]], [[34, -58], [40, -48], [50, -44]], [[10, -36], [22, -30], [18, -20], [30, -16]], [[38, -34], [48, -26], [44, -16], [54, -10]],
    [[6, -20], [12, -14], [22, -12]], [[40, 4], [48, 8], [50, -2]], [[33, -2], [44, -8], [56, -6]]]; // laatste = Sylvius-groeve
  for (const d of [-1, 1]) {
    const pts = HELFT.map(([px, py]) => [d * px, py]);
    ctx.beginPath(); bioPad(ctx, pts, true); shape(ctx, BIO.brein, lighten(BIO.brein, 0.22), L(1.6));
    ctx.save(); ctx.beginPath(); bioPad(ctx, pts, true); ctx.clip(); ctx.strokeStyle = rgba(BIO.breinD, 0.55); ctx.lineWidth = L(1.4);
    GROEVEN.forEach((g, i) => { ctx.lineWidth = L(i === GROEVEN.length - 1 ? 2 : 1.4); ctx.beginPath(); bioPad(ctx, g.map(([px, py]) => [d * px, py]), false); ctx.stroke(); });
    ctx.restore();
  }
  // lengtegroeve tussen de helften
  ctx.strokeStyle = rgba(BIO.breinD, 0.9); ctx.lineWidth = L(1.6); ctx.beginPath(); ctx.moveTo(0, -66); ctx.lineTo(0, -10); ctx.stroke();
  // hypothalamus (middellijn, tussen de slaapkwabben) + steeltje + hypofyse
  _vbGloed(ctx, 0, 0, 22, BIO.klier, hth);
  ctx.beginPath(); bioPad(ctx, [[-7, -3], [0, -5], [7, -3], [6, 3], [0, 5], [-6, 3]], true); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.25 + 0.75 * hth), lighten(hth > 0.3 ? BIO.klier : BIO.breinS, 0.25), L(1.2));
  ctx.strokeStyle = _vbMix(BIO.breinS, BIO.klier, 0.3 + 0.7 * Math.max(hth, hyp)); ctx.lineWidth = Math.max(2.2, 3 * s) / s; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0.5, 8); ctx.stroke();
  _vbGloed(ctx, 0, 12, 18, BIO.klier, hyp);
  ctx.beginPath(); ctx.ellipse(0, 12, 6, 4.5, 0, 0, 6.283); shape(ctx, _vbMix(BIO.breinS, BIO.klier, 0.35 + 0.65 * hyp), lighten(BIO.klier, 0.2), L(1.2));
  ctx.restore();
  return uit;
}

// KIJKJE IN HET HOOFD van een castpersonage (vooraanzicht). hoofd = { x, y, r } uit persoon(...).hoofd.
// Plaatsing: hypofyse op ooghoogte (achter de neuswortel), kruin net onder de schedeldak/haarlijn (± 0,65 hh boven
// de ogen), brein ± 0,8 hh breed (net binnen het gezicht). Stripkoppen zijn smaller dan echt: rek = 1,18 (verticaal).
function hoofdKijkje(ctx, hoofd, o = {}) {
  const { a = 1 } = o; const hh = hoofd.r / 0.55; const s = 0.8 * hh / 120, rek = 1.18;
  const eyeY = hoofd.y + hh * 0.02; const hy = eyeY - 12 * s * rek;
  if (a <= 0.01) return { hth: [hoofd.x, hy], hyp: [hoofd.x, eyeY] };
  ctx.save(); ctx.globalAlpha *= a;
  _vbVenster(ctx, hoofd.x, hoofd.y - hh * 0.24, hh * 0.5, hh * 0.52, 0.8);
  const r = breinVoor(ctx, hoofd.x, hy, s, Object.assign({}, o, { a: 1, rek }));
  ctx.restore(); return r;
}

// =====================================================================================
// BAARMOEDER MET EILEIDERS EN EIERSTOKKEN, vooraanzicht (frontale doorsnede van de baarmoeder).
// Recept (1 cm ≈ 21 px bij s = 1): niet zwanger peervormig, ± 7,5 cm lang (± 160 px incl. baarmoederhals) en
// ± 5 cm breed (110 px); hals ± 3 cm lang, 2,5 cm breed met nauw kanaal; wand (spier) ± 1,5 cm dik; holte in
// vooraanzicht een driehoekige spleet met slijmvlies; eierstokken amandelvormig ± 3 × 1,5 cm, ± 2 cm naast de
// baarmoeder, met eierstokband aan de baarmoeder net onder de eileider; eileiders ± 10 cm, vanuit de bovenhoeken
// eerst smal (isthmus), dan wijder (ampulla), boog over de eierstok, trechter met franjes (fimbriae) over de
// buitenpool van de eierstok. Zwanger (z = maand/9): lengte 12 cm (3 mnd, net boven het schaambeen), 22 cm
// (5 mnd, fundus bij de navel), 35 cm (9 mnd, tot de ribben); breedte tot ± 25 cm; wand dunner (± 0,5–1 cm);
// eierstokken en eileiders schuiven mee omhoog en naar opzij. Vrucht (CRL): 6 wk 0,4 cm, 12 wk 5,4, 20 wk 16,
// 28 wk 25, 40 wk 36 cm; vruchtwater in de holte; moederkoek bovenaan in de wand.
// Bron: Gray's Anatomy (female pelvis); Sobotta deel 2; Williams Obstetrics (fundushoogte). Bekende fouten:
// eileiders recht als armpjes; eierstokken aan de eileiders vast; baarmoeder hoog in de buik als niet zwanger;
// zwangere baarmoeder als ballon zonder hals; kind dat zweeft zonder navelstreng.
// Oorsprong (x, y) = uitwendige baarmoedermond (onderkant hals): de baarmoeder groeit vanuit het bekken omhoog.
// =====================================================================================
const _VB_LEN = [[0, 7.5], [0.15, 8.5], [0.33, 12], [0.55, 22], [0.8, 30], [1, 35]];
const _VB_BR = [[0, 5], [0.15, 5.8], [0.33, 9.5], [0.55, 15], [0.8, 21], [1, 25]];
const _VB_CRL = [[0, 0], [0.13, 0], [0.15, 0.4], [0.2, 1.6], [0.3, 5.4], [0.4, 11.6], [0.5, 16], [0.6, 21], [0.7, 25], [0.8, 29], [0.9, 32], [1, 36]];
function _vbBaarmoederVorm(z, bk = 1) { // geeft buiten- en binnencontour (ontwerpeenheden, oorsprong = baarmoedermond)
  const cm = 21, Lc = 3 * cm, Wc = 2.5 * cm; const Lt = _vbTab(_VB_LEN, z) * cm, W = _vbTab(_VB_BR, z) * cm * bk;
  const yb0 = -Lc + 6, yT = -Lt, yc = (yb0 + yT) / 2, ry = (yb0 - yT) / 2, rx = W / 2; const kz = clamp(z / 0.6, 0, 1);
  const wand = lerp(1.5 * cm, 0.75 * cm, clamp(z / 0.5, 0, 1));
  const taper = (u) => lerp(lerp(0.5, 0.93, kz), 1, Math.sin(Math.min(1, u * 1.35) * 1.5708)); // peer → ei
  const rand = (rxx, ryy, ycc, minX) => { const R = [], N = 26; for (let i = 0; i <= N; i++) { const f = i / N * Math.PI; const u = (1 - Math.cos(f)) / 2;
      let px = Math.sin(f) * rxx * taper(u); if (minX && u < 0.5) px = Math.max(px, minX * (1 - u * 0.4)); R.push([px, ycc + Math.cos(f) * ryy]); } return R; };
  const rechts = rand(rx, ry, yc, Wc / 2 + 4); const buiten = [[Wc * 0.38, 0], [Wc * 0.5, -Lc * 0.5], ...rechts.slice(1), ...rechts.slice(1, -1).reverse().map(([px, py]) => [-px, py]), [-Wc * 0.5, -Lc * 0.5], [-Wc * 0.38, 0]];
  // binnen: holte (ovaal bij zwangerschap, driehoekige spleet als niet zwanger)
  const rxi = Math.max(4, rx - wand), ryi = Math.max(4, ry - wand), yci = yc - wand * 0.15; const ovaal = [];
  const N = 40; for (let i = 0; i < N; i++) { const f = i / N * 6.283; const u = (1 - Math.cos(f)) / 2; ovaal.push([Math.sin(f) * rxi * taper(u), yci + Math.cos(f) * ryi]); }
  const tri = []; const cx0 = rx * 0.7, cyT = yT + wand * 0.9, apY = yb0 - 4; // hoeken: links-boven, rechts-boven, punt onder
  for (let i = 0; i < N; i++) { const f = i / N; let px, py; // zelfde volgorde als ovaal: start onder, rechtsom via rechts omhoog
    if (f < 0.4) { const u = f / 0.4; px = lerp(0, cx0, u) - Math.sin(u * Math.PI) * 4; py = lerp(apY, cyT, u); }
    else if (f < 0.6) { const u = (f - 0.4) / 0.2; px = lerp(cx0, -cx0, u); py = cyT + Math.sin(u * Math.PI) * 6; }
    else { const u = (f - 0.6) / 0.4; px = lerp(-cx0, 0, u) + Math.sin(u * Math.PI) * 4; py = lerp(cyT, apY, u); } tri.push([px, py]); }
  const kh = clamp((z - 0.08) / 0.1, 0, 1); const holte = tri.map((p, i) => [lerp(p[0] * 0.5 + p[0] * 0.5 * (1 - kh), ovaal[i][0], kh), lerp(p[1], ovaal[i][1], kh)]);
  const hoek = rand(rx, ry, yc, 0)[19]; // bovenhoek (u ≈ 0,8): oorsprong eileider
  return { buiten, holte, rx, ry, yc, yT, Lc, Wc, rxi, ryi, yci, wand, hoek, cm, kh, maxX: Math.max(...rechts.map(p => p[0])) };
}
function vrouwOrganenVoor(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, zwanger = 0, foetus = 0, hlEierstok = 0, hlBaarmoeder = 0, placenta = true, breed = 1 } = o;
  const z = clamp(zwanger, 0, 1); const V = _vbBaarmoederVorm(z, breed); const S = (px, py) => [x + px * s, y + py * s];
  // eierstok-plaats: naast de baarmoeder, schuift mee omhoog en naar buiten
  const H = V.hoek; const ox = Math.max(H[0] + lerp(95, 60, z), V.maxX + 48), oy = H[1] + lerp(48, 80, z);
  const fs0 = _vbTab(_VB_CRL, z) * V.cm / 286; const fs = Math.min(fs0, V.ryi * 2 * 0.86 / 300, V.rxi * 2 * 0.86 / 145);
  const frot = Math.PI + lerp(0.5, 0.08, clamp((z - 0.3) / 0.4, 0, 1)); const fx = -(5 * Math.cos(frot) + 10 * Math.sin(frot)) * fs, fy = V.yci - (5 * Math.sin(frot) - 10 * Math.cos(frot)) * fs;
  const uit = { baarmoeder: { x: x, y: y + V.yc * s, rx: V.rx * s, ry: V.ry * s }, eierstokL: S(-ox, oy), eierstokR: S(ox, oy), cervix: S(0, 0), foetus: S(fx, fy) };
  if (a <= 0.01) return uit;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (px) => px / s;
  const SPIER = '#C98088', SPIERL = '#E3A6AC', SLIJM = '#E7AAB0', EI = '#E3BBA2', EIL = '#F2D6C4';
  // schede (bovenste stuk), achter de hals
  ctx.beginPath(); bioPad(ctx, [[-26, -14], [-30, 30], [-27, 70], [27, 70], [30, 30], [26, -14]], false); ctx.fillStyle = rgba(SPIER, 0.45); ctx.fill();
  ctx.strokeStyle = rgba(SPIERL, 0.5); ctx.lineWidth = L(1.2); ctx.beginPath(); ctx.moveTo(-28, 20); ctx.lineTo(-27, 70); ctx.moveTo(28, 20); ctx.lineTo(27, 70); ctx.stroke();
  ctx.fillStyle = rgba('#5A2A36', 0.5); ctx.beginPath(); ctx.ellipse(0, 40, 9, 30, 0, 0, 6.283); ctx.fill();
  // eierstokken + eierstokbanden + eileiders (beide kanten)
  for (const d of [-1, 1]) {
    const cx0 = d * H[0], cy0 = H[1];
    ctx.strokeStyle = rgba(SPIERL, 0.7); ctx.lineWidth = L(3); ctx.beginPath(); ctx.moveTo(d * (H[0] - 6), H[1] + 14); ctx.quadraticCurveTo(d * (H[0] + ox) / 2, oy - 6, d * (ox - 28), oy); ctx.stroke(); // eierstokband
    _vbGloed(ctx, d * ox, oy, 70, BIO.klier, hlEierstok);
    ctx.save(); ctx.translate(d * ox, oy); ctx.rotate(d * lerp(0.35, 0.9, z));
    ctx.beginPath(); bioPad(ctx, [[-32, 0], [-22, -14], [4, -17], [28, -10], [33, 2], [22, 14], [-4, 16], [-26, 11]], true); shape(ctx, EI, hlEierstok > 0.3 ? lighten(BIO.klier, 0.2) : EIL, L(1.5));
    ctx.fillStyle = rgba('#F6EBDD', 0.7); [[-14, -4, 4], [6, 5, 5.5], [18, -5, 3], [-4, -8, 2.5], [-20, 6, 2.5]].forEach(([fx2, fy2, fr]) => { ctx.beginPath(); ctx.arc(fx2, fy2, fr, 0, 6.283); ctx.fill(); }); // follikeltjes
    ctx.restore();
    // eileider: isthmus → ampulla → trechter met franjes over de buitenpool
    const dx = ox - H[0]; const pad = [[H[0] - 4, H[1] + 2], [H[0] + dx * 0.4, H[1] - 6], [H[0] + dx * 0.9, H[1] - 14], [ox + 35, H[1] - 6 + (oy - H[1]) * 0.05], [ox + 60, oy - 22], [ox + 54, oy + 4]];
    const P2 = bioDicht(pad, 12).map(([px, py]) => [d * px, py]);
    for (let i = 1; i < P2.length; i++) { const u = i / P2.length; ctx.strokeStyle = SPIER; ctx.lineWidth = lerp(5, 11, Math.pow(u, 1.3)); ctx.beginPath(); ctx.moveTo(P2[i - 1][0], P2[i - 1][1]); ctx.lineTo(P2[i][0], P2[i][1]); ctx.stroke(); }
    ctx.strokeStyle = rgba(SPIERL, 0.85); ctx.lineWidth = L(1.2); ctx.beginPath(); P2.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke();
    const [ex, ey] = P2[P2.length - 1];
    for (let k = 0; k < 7; k++) { const an = lerp(1.45, 3.3, k / 6) + Math.sin(t * 1.5 + k) * 0.06; const an2 = d > 0 ? an : Math.PI - an; const len = 18 + 6 * hash(k + 3);
      ctx.strokeStyle = SPIER; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + Math.cos(an2) * len * 0.6 + d * 3, ey + Math.sin(an2) * len * 0.6, ex + Math.cos(an2) * len, ey + Math.sin(an2) * len); ctx.stroke();
      ctx.fillStyle = SPIERL; ctx.beginPath(); ctx.arc(ex + Math.cos(an2) * len, ey + Math.sin(an2) * len, 1.8, 0, 6.283); ctx.fill(); }
    ctx.fillStyle = rgba('#5A2A36', 0.6); ctx.beginPath(); ctx.ellipse(ex, ey + 2, 5, 3, 0, 0, 6.283); ctx.fill(); // trechteropening
  }
  // baarmoeder (spierwand)
  if (hlBaarmoeder > 0.01) { ctx.save(); ctx.shadowColor = rgba(BIO.klier, 0.8 * hlBaarmoeder); ctx.shadowBlur = 40 * hlBaarmoeder; ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.fillStyle = SPIER; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); bioPad(ctx, V.buiten, true); shape(ctx, SPIER, hlBaarmoeder > 0.3 ? lighten(BIO.klier, 0.2) : SPIERL, L(2));
  // spiervezel-tekening (rustig, enkele bogen in de wand)
  ctx.save(); ctx.beginPath(); bioPad(ctx, V.buiten, true); ctx.clip(); ctx.strokeStyle = rgba('#A9606A', 0.45); ctx.lineWidth = L(1.2);
  for (let k = 1; k <= 3; k++) { const f = k / 4; ctx.beginPath(); ctx.ellipse(0, V.yci, V.rxi + V.wand * f, V.ryi + V.wand * f, 0, 3.6, 5.8); ctx.stroke(); } ctx.restore();
  // halskanaal
  ctx.strokeStyle = '#6A3240'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -1); ctx.lineTo(0, -V.Lc + 4); ctx.stroke();
  ctx.fillStyle = '#6A3240'; ctx.beginPath(); ctx.ellipse(0, -V.Lc * 0.5, 4.5, V.Lc * 0.3, 0, 0, 6.283); ctx.fill();
  // holte: slijmvlies + (bij zwangerschap) vruchtwater
  ctx.beginPath(); bioPad(ctx, V.holte, true); shape(ctx, V.kh > 0.3 ? '#6E8C92' : '#6A3240', SLIJM, Math.max(3, V.wand * 0.18));
  if (V.kh > 0.3) { ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.fillStyle = rgba('#CFE6E2', 0.18); ctx.fill(); }
  if (z > 0.25 && placenta) { // moederkoek tegen de bovenwand (rechtsboven), met navelstreng
    const pk = clamp((z - 0.25) / 0.15, 0, 1); ctx.save(); ctx.globalAlpha *= pk; ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const pcx = V.rxi * 0.62, pcy = V.yci - V.ryi * 0.72; ctx.beginPath(); ctx.ellipse(pcx, pcy, V.rxi * 0.5, V.ryi * 0.3, -0.75, 0, 6.283); shape(ctx, '#A8464E', '#C9666C', L(1.5));
    ctx.strokeStyle = rgba('#7A2A36', 0.6); ctx.lineWidth = L(1); for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.arc(pcx - V.rxi * 0.05, pcy + V.ryi * 0.05, V.rxi * (0.22 + k * 0.05), 3.2, 4.0); ctx.stroke(); }
    ctx.restore(); }
  // vrucht
  if (foetus > 0.01 && fs > 0.0005 && V.kh > 0.3) {
    ctx.save(); ctx.beginPath(); bioPad(ctx, V.holte, true); ctx.clip();
    const f = castFoetus(ctx, fx, fy, fs, { alpha: foetus, rot: frot });
    if (z > 0.25 && placenta) castNavelstreng(ctx, V.rxi * 0.48, V.yci - V.ryi * 0.55, f.navel.x, f.navel.y, t, foetus * clamp((z - 0.25) / 0.15, 0, 1), Math.max(3, fs * 22));
    ctx.restore(); }
  ctx.restore();
  return uit;
}

// KIJKJE IN DE BUIK van een castpersonage getekend met persoon(ctx, id, x, y, h, { outfit: 'zwanger', zwanger }).
// Plaatsing (stripmaten van lib_cast.js, hh = kophoogte): baarmoedermond achter het schaambeen (heupY + 0,22 hh,
// waar de benen beginnen); niet zwanger blijft de baarmoeder in het bekken (± 0,25 hh hoog). Schaal zó dat de
// voldragen baarmoeder (35 cm) tot de bovenrand van de stripbuik reikt (onder de ribbenboog); bij 5 mnd staat de
// fundus dan rond de taille/navel. De stripbuik is breder dan echt: o.breed rekt alléén de baarmoederwand in de
// breedte mee (tot ± 80 % van de buikbreedte), het kind en de eierstokken blijven op echte verhouding.
function buikKijkje(ctx, id, x, y, h, zwanger = 0, o = {}) {
  const { a = 1, kijk = 1 } = o; const P = CAST[id] || {}; const hh = h * (P.lengte || 1) / (P.kop || 6.1), top = y - h * (P.lengte || 1), heupY = top + hh * 3.45;
  const z = clamp(zwanger, 0, 1); const b = castBuik(id, x, y, h, z, kijk); const cx = x + (P.krom ? hh * 0.15 : 0);
  const ux = lerp(cx, b.x, 0.6), uy = heupY + hh * 0.22; const s = 1.36 * hh / 735;
  const V0 = _vbBaarmoederVorm(z); const wil = Math.min(2 * b.rx * 0.8, (-V0.yT - V0.Lc) * s * 0.82), heeft = 2 * V0.maxX * s; const breed = lerp(1, Math.max(1, wil / heeft), ease(clamp((z - 0.2) / 0.5, 0, 1)));
  const V = _vbBaarmoederVorm(z, breed); const opt = Object.assign({}, o, { a: 1, zwanger: z, breed });
  if (a <= 0.01) return vrouwOrganenVoor(ctx, ux, uy, s, Object.assign(opt, { a: 0 }));
  ctx.save(); ctx.globalAlpha *= a;
  const half = Math.max(V.maxX + 120, V.hoek[0] + 200) * s; const yTop = uy + V.yT * s - hh * 0.08, yBot = uy + hh * 0.12;
  _vbVenster(ctx, ux, (yTop + yBot) / 2, Math.max(half, hh * 0.42), (yBot - yTop) / 2 + hh * 0.05, 0.78);
  const r = vrouwOrganenVoor(ctx, ux, uy, s, opt);
  ctx.restore(); return r;
}

// =====================================================================================
// GEEL LICHAAM (corpus luteum) in doorsnede, en zijn verval tot wit lichaam (corpus albicans).
// Recept: 1,5–2,5 cm groot (kan tot 3 cm); sterk geplooide, dikke gele wand van grote veelhoekige luteïnecellen
// (granulosa-luteïnecellen ± 30–50 µm, ronde kern, lichtgeel vetrijk cytoplasma) met tussen de plooien schotten
// van theca-weefsel (kleinere theca-luteïnecellen) waarlangs haarvaten naar binnen groeien; in het midden het
// bloedstolsel/de holte van de gesprongen follikel (rood-bruin, fibrinedraden, later bindweefsel); dun kapsel
// erbuiten. Zonder hCG na ± 10–14 dagen verval: krimpt, verliest kleur, wordt een klein wit hyalien litteken
// (corpus albicans, enkele mm) met golvende rand. LH-receptoren (G-eiwitgekoppeld) op het celmembraan van de
// luteïnecellen. Bron: Junqueira h. 22 'Corpus luteum'; Ross & Pawlina h. 23. Bekende fouten: geel lichaam als
// egale gele bol of ring zonder plooien; cellen als kleine stipjes; litteken dat geel blijft.
// Ontwerpeenheden: straal 100 (r = straal op het scherm).
// =====================================================================================
const _VB_SEP = 7, _VB_F0 = 0.45; // aantal plooien; fase zodat het midden van een kwab rechts ligt (θ = 0)
function _vbRo(th) { const ph = _VB_SEP * (th - _VB_F0); return 90 - 24 * Math.pow((1 + Math.cos(ph)) / 2, 8) + 1.5 * Math.sin(th * 3); }
function _vbRi(th) { const ph = _VB_SEP * (th - _VB_F0); return 48 + 13 * Math.pow((1 + Math.cos(ph)) / 2, 2) + 2 * Math.sin(th * 5 + 1); }
function _vbLuteine() { // Voronoi-cellen in de wand (gecachet)
  if (_bioPolyCache.vbLuteine) return _bioPolyCache.vbLuteine;
  const seeds = []; const d = 9;
  for (let rho = 50; rho < 92; rho += d * 0.86) { const n = Math.round(6.283 * rho / d); for (let k = 0; k < n; k++) { const th = (k + (Math.round(rho) % 2) * 0.5) / n * 6.283 + (hash(rho * 7 + k) - 0.5) * 0.4 * d / rho; const rr = rho + (hash(rho * 3 + k * 11) - 0.5) * d * 0.4;
      if (rr > _vbRi(th) + 2 && rr < _vbRo(th) - 2) seeds.push([Math.cos(th) * rr, Math.sin(th) * rr]); } }
  const polys = seeds.map((p, i) => { const pts = []; for (let k = 0; k < 24; k++) { const an = k / 24 * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = d * 0.8;
      seeds.forEach((q, j) => { if (j === i) return; const dx = q[0] - p[0], dy = q[1] - p[1]; const dd = Math.hypot(dx, dy); if (dd > d * 2.5) return; const pr = (ux * dx + uy * dy) / dd; if (pr > 0.05) best = Math.min(best, dd / 2 / pr); });
      best = Math.max(0, best - 0.9); pts.push([p[0] + ux * best, p[1] + uy * best]); } return { c: p, pts }; });
  let hi = 0, bx = -1e9; polys.forEach((c, i) => { const th = Math.atan2(c.c[1], c.c[0]); if (Math.abs(th) < 0.2 && c.c[0] > bx) { bx = c.c[0]; hi = i; } });
  return (_bioPolyCache.vbLuteine = { polys, hi });
}
function geelLichaam(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, leef = 1, hl = 0, receptoren = 0 } = o;
  const lv = clamp(leef, 0, 1), sc = lerp(0.32, 1, ease(lv)), k = r / 100 * sc; const L = (px) => px / k;
  const { polys, hi } = _vbLuteine(); const H = polys[hi];
  const omtrek = (f, n = 120) => { const R = []; for (let i = 0; i < n; i++) { const th = i / n * 6.283; R.push([Math.cos(th) * f(th), Math.sin(th) * f(th)]); } return R; };
  // buitenste membraanpunt van de gemarkeerde cel (meest rechtse punt van de gladde omtrek)
  const celPad = bioDicht([...H.pts, H.pts[0], H.pts[1]], 6).slice(6); let mp = celPad[0]; celPad.forEach(p => { if (p[0] > mp[0]) mp = p; });
  const uit = { cel: [x + mp[0] * k, y + mp[1] * k], r: r * sc };
  if (a <= 0.01) return uit;
  const geel = lv, ka = clamp((lv - 0.12) / 0.55, 0, 1), alb = clamp((0.6 - lv) / 0.5, 0, 1);
  const kl = (h1, wit = '#E4DED2') => _vbMix(h1, wit, 1 - geel);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k, k); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  _vbGloed(ctx, 0, 0, 125, BIO.klier, hl);
  const KAPSEL = omtrek(th => 96 + 1.2 * Math.sin(th * 4 + 0.5)), WAND_O = omtrek(_vbRo), WAND_I = omtrek(_vbRi);
  if (ka > 0.01) {
    ctx.save(); ctx.globalAlpha *= ka;
    // kapsel + theca (schotten tussen de plooien)
    ctx.beginPath(); bioPad(ctx, KAPSEL, true); shape(ctx, kl('#C98A6A'), lighten(kl('#D9A080'), 0.15), L(1.6));
    ctx.fillStyle = rgba(kl('#9C6A4A'), 0.35); for (let i = 0; i < 110; i++) { const th = hash(i * 3 + 7) * 6.283, rr = lerp(_vbRo(th) + 2, 94, hash(i * 3 + 8)); ctx.beginPath(); ctx.ellipse(Math.cos(th) * rr, Math.sin(th) * rr, 1.5, 1, th, 0, 6.283); ctx.fill(); }
    // centrale holte met stolsel
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.fillStyle = kl('#7E3236', '#D8D0C4'); ctx.fill();
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.clip();
    ctx.strokeStyle = rgba(kl('#E0A0A0'), 0.45); ctx.lineWidth = L(1); for (let i = 0; i < 14; i++) { const a0 = hash(i + 40) * 6.283, a1 = a0 + 1 + hash(i + 41) * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a0) * 50, Math.sin(a0) * 50); ctx.quadraticCurveTo((hash(i + 42) - 0.5) * 40, (hash(i + 43) - 0.5) * 40, Math.cos(a1) * 50, Math.sin(a1) * 50); ctx.stroke(); }
    for (let i = 0; i < 26; i++) { const an = hash(i * 5 + 60) * 6.283, rr = Math.sqrt(hash(i * 5 + 61)) * 42; ctx.beginPath(); ctx.ellipse(Math.cos(an) * rr, Math.sin(an) * rr, 2.2, 1.4, an, 0, 6.283); ctx.fillStyle = rgba(kl('#C2453E'), 0.7); ctx.fill(); }
    ctx.restore();
    // gele wand: luteïnecellen
    ctx.save(); ctx.beginPath(); bioPad(ctx, WAND_O, true); bioPad(ctx, WAND_I.slice().reverse(), true); ctx.clip('evenodd');
    ctx.fillStyle = kl('#D9A84A'); ctx.fillRect(-100, -100, 200, 200);
    polys.forEach((c, i) => { if (i === hi && receptoren > 0.01) return; ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, kl('#EDCB6A'), kl('#F6E2A0'), L(0.8));
      ctx.beginPath(); ctx.arc(c.c[0] + (hash(i) - 0.5) * 1.5, c.c[1] + (hash(i + 1) - 0.5) * 1.5, 1.7, 0, 6.283); ctx.fillStyle = rgba(_vbMix('#6E5A9E', '#BDB4A8', 1 - geel), 0.85); ctx.fill(); });
    ctx.restore();
    ctx.beginPath(); bioPad(ctx, WAND_I, true); ctx.strokeStyle = kl('#C9963A'); ctx.lineWidth = L(1.4); ctx.stroke();
    // haarvaten: vanuit het kapsel langs de schotten naar binnen, met zijtakjes de kwabben in
    ctx.strokeStyle = rgba(kl('#C2453E'), 0.9); for (let sp = 0; sp < _VB_SEP; sp++) { const th = _VB_F0 + sp * 6.283 / _VB_SEP; const r0 = 95, r1 = _vbRi(th) + 1;
      ctx.lineWidth = L(1.6); ctx.beginPath(); bioPad(ctx, [[Math.cos(th) * r0, Math.sin(th) * r0], [Math.cos(th + 0.03) * lerp(r0, r1, 0.5), Math.sin(th + 0.03) * lerp(r0, r1, 0.5)], [Math.cos(th) * r1, Math.sin(th) * r1]], false); ctx.stroke();
      ctx.lineWidth = L(1); for (const sd of [-1, 1]) for (let b = 0; b < 2; b++) { const t0 = th + sd * (0.12 + b * 0.16), rr0 = _vbRo(t0) - 1, rr1 = lerp(rr0, _vbRi(t0), 0.55 + 0.3 * hash(sp * 4 + b + (sd > 0 ? 2 : 0)));
        ctx.beginPath(); ctx.moveTo(Math.cos(t0) * (rr0 + 3), Math.sin(t0) * (rr0 + 3)); ctx.quadraticCurveTo(Math.cos(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.sin(t0 + sd * 0.05) * (rr0 + rr1) / 2, Math.cos(t0 + sd * 0.02) * rr1, Math.sin(t0 + sd * 0.02) * rr1); ctx.stroke(); } }
    // gemarkeerde cel met LH-receptoren
    if (receptoren > 0.01) {
      ctx.beginPath(); bioPad(ctx, H.pts, true); shape(ctx, kl('#F2D27A'), (C.teal || '#5BA4C9'), L(1.6));
      ctx.beginPath(); ctx.arc(H.c[0], H.c[1], 1.9, 0, 6.283); ctx.fillStyle = '#6E5A9E'; ctx.fill();
      const celRing = [...celPad, celPad[0]], nr = 12; ctx.lineWidth = L(1);
      for (let j = 0; j < nr; j++) { const vis = clamp(receptoren * nr * 1.2 - j * 0.9, 0, 1); if (vis <= 0) continue; const q = bioPunt(celRing, (j + 0.5) / nr); const p1 = [q[0], q[1]];
        let nx = Math.sin(q[2]), ny = -Math.cos(q[2]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl; if (nx * (p1[0] - H.c[0]) + ny * (p1[1] - H.c[1]) < 0) { nx = -nx; ny = -ny; }
        const len = 2.8 * vis + 0.15 * Math.sin(t * 3 + j); ctx.strokeStyle = (C.tealL || '#9ED0EA'); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p1[0] + nx * len, p1[1] + ny * len); ctx.stroke();
        ctx.beginPath(); ctx.arc(p1[0] + nx * (len + 0.6), p1[1] + ny * (len + 0.6), 0.95 * vis, 0, 6.283); shape(ctx, (C.teal || '#5BA4C9'), (C.tealL || '#9ED0EA'), L(0.8)); }
    }
    ctx.restore();
  }
  // wit lichaam (litteken): golvend, wit, vezelig
  if (alb > 0.01) {
    ctx.save(); ctx.globalAlpha *= alb; const AL = omtrek(th => 86 * (1 + 0.1 * Math.sin(th * 7 + 0.4) + 0.05 * Math.sin(th * 13 + 1)));
    ctx.beginPath(); bioPad(ctx, AL, true); shape(ctx, '#E4DED2', '#F4F0E8', L(1.6));
    ctx.strokeStyle = rgba('#B8AE9E', 0.6); ctx.lineWidth = L(1.1);
    for (let k2 = 1; k2 <= 3; k2++) { const R2 = omtrek(th => 86 * (1 - k2 * 0.22) * (1 + 0.14 * Math.sin(th * 7 + 0.4 + k2) + 0.05 * Math.sin(th * 11)), 60); ctx.beginPath(); bioPad(ctx, R2, true); ctx.stroke(); }
    ctx.restore();
  }
  ctx.restore();
  return uit;
}
// =====================================================================================
// EILEIDER in lengtedoorsnede, variant met as en lumen-functie (22 okt 2026, Anticonceptie, soa's en voortplantings-
// techniek). Naast eileiderLangs (Van bevruchting tot baby); gebruik bij nieuwe films bij voorkeur één van de twee. Recept: ± 10–12 cm lang; vanaf de baarmoeder isthmus (smal, lumen ± 1 mm, dikke spierwand) → ampulla
// (wijd, ± 1 cm, dunne wand, sterk geplooid slijmvlies; hier vindt de bevruchting plaats) → trechter met franjes
// (fimbriae) die over de eierstok liggen. Slijmvlies met trilhaarcellen die naar de baarmoeder slaan, plus
// spiercontracties. Ontsteking (salpingitis, vooral chlamydia/gonorroe): wand rood en gezwollen, plooien plakken
// aan elkaar, daarna littekens (fibrose) die het lumen vernauwen of afsluiten → eicel/embryo blijft steken
// (buitenbaarmoederlijke zwangerschap of onvruchtbaarheid). Bron: Junqueira h. 22; Sadler h. 2; RIVM chlamydia.
// Bekende fouten: een rechte buis van gelijke dikte; franjes als losse streepjes zonder trechter.
// x0 = baarmoederkant (links), x1 = trechterkant (rechts), yc = as. o: ontst 0..1, litteken 0..1, t, eicel (0..1 = plek
// langs de buis van rechts naar links), dicht 0..1 (volledig afgesloten), trilhaar (toon trilharen).
// Geeft { lumen(u) → [x, y, straal] } terug (u = 0 baarmoeder … 1 trechter).
// =====================================================================================
function eileiderDoorsnede(ctx, x0, x1, yc, o = {}) {
  const { a = 1, t = 0, ontst = 0, litteken = 0, trilhaar = 1, s = 1, franjes = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const L = x1 - x0; const zw = 1 + 0.18 * ontst;
  const buiten = (u) => lerp(46, 120, Math.pow(u, 1.25)) * s * zw; // halve dikte buitenwand
  const lumen = (u) => Math.max(4 * s, lerp(8, 82, Math.pow(u, 1.4)) * s * (1 - 0.25 * ontst)); // halve wijdte lumen
  const yAs = (u) => yc + Math.sin(u * 5.2) * 10 * s;
  const N = 80; const top = [], bot = [], lt = [], lb = [];
  for (let i = 0; i <= N; i++) { const u = i / N, x = x0 + u * L, y = yAs(u); top.push([x, y - buiten(u)]); bot.push([x, y + buiten(u)]); lt.push([x, y - lumen(u)]); lb.push([x, y + lumen(u)]); }
  const wandCol = ontst > 0.01 ? _mixHex(BIO.spier, '#D2453A', 0.45 * ontst) : BIO.spier;
  // spierwand
  ctx.beginPath(); top.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
  shape(ctx, rgba(wandCol, 0.7), rgba(BIO.spierL, 0.8), 2);
  // kringspiervezels (dwars) in de wand
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(BIO.spierL, 0.45); ctx.lineWidth = 2; for (let k = 0; k < 70; k++) { const u = k / 70, x = x0 + u * L, y = yAs(u); ctx.beginPath(); ctx.moveTo(x, y - buiten(u) + 4); ctx.lineTo(x + 6, y - lumen(u) - 6); ctx.moveTo(x, y + buiten(u) - 4); ctx.lineTo(x + 6, y + lumen(u) + 6); ctx.stroke(); } ctx.restore();
  // slijmvlies met plooien (vingers het lumen in), sterker geplooid in de ampulla
  const slijmCol = ontst > 0.01 ? _mixHex(BIO.slijm, '#E0503F', 0.6 * ontst) : BIO.slijm;
  ctx.beginPath(); lt.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = N; i >= 0; i--) ctx.lineTo(lb[i][0], lb[i][1]); ctx.closePath(); ctx.fillStyle = rgba('#2E1E2A', 0.9); ctx.fill();
  const plooi = (sd) => { const nP = 30; for (let k = 0; k < nP; k++) { const u = 0.03 + (k + 0.5) / nP * 0.94, x = x0 + u * L, y = yAs(u); const lr = lumen(u); const lenF = lerp(0.35, 0.78, u) * (0.75 + 0.5 * hash(k * 5 + (sd > 0 ? 1 : 2))) * (1 + 0.2 * ontst); const w = (L / nP) * 0.62;
      const by = y + sd * (lr + 2 * s), ty = y + sd * lr * (1 - lenF), lean = (hash(k * 3 + 7) - 0.5) * w * 0.8;
      const pts = [[x - w, by], [x - w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x - w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.25 + lean, ty + sd * 4 * s], [x + w * 0.55 + lean * 0.5, lerp(by, ty, 0.55)], [x + w, by]];
      ctx.beginPath(); bioPad(ctx, pts, false); ctx.closePath(); shape(ctx, rgba(slijmCol, 0.9), rgba(BIO.slijmD, 0.75), 1.2);
      if (u > 0.55 && lenF > 0.5) { ctx.beginPath(); ctx.ellipse(x + lean * 0.4, lerp(by, ty, 0.6), w * 0.18, lr * lenF * 0.16, 0, 0, 6.283); ctx.fillStyle = rgba(BIO.slijmD, 0.25); ctx.fill(); }
      if (trilhaar > 0.01) { ctx.save(); ctx.globalAlpha *= trilhaar; ctx.strokeStyle = rgba('#F6E2D6', 0.85); ctx.lineWidth = 1.3; for (let c = 0; c < 4; c++) { const v = (c + 0.5) / 4; const p = bioPunt(pts, v); const sl = Math.sin(t * 9 + k * 0.7 + c) * 0.5 + 0.5; const nx = -sd * 0.0, dx = -(5 + 5 * sl) * s, dy = -sd * (4 + 3 * (1 - sl)) * s;
          ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[0] + dx * 0.3, p[1] + dy, p[0] + dx, p[1] + dy * 0.7); ctx.stroke(); } ctx.restore(); } } };
  plooi(-1); plooi(1);
  // trechter met franjes
  if (franjes > 0.01) { const ue = 1, xe = x1, ye = yAs(ue), R = buiten(ue); ctx.save(); ctx.globalAlpha *= franjes; for (let k = 0; k < 9; k++) { const an = -1.25 + k * 0.31; const len = (70 + 22 * Math.sin(k * 1.7)) * s; const wob = Math.sin(t * 1.4 + k) * 6 * s;
      const sx = xe - 6 * s, sy = ye + Math.sin(an) * R * 0.9; const ex = sx + Math.cos(an) * len + 20 * s, ey = sy + Math.sin(an) * len * 0.8 + wob;
      ctx.strokeStyle = rgba(wandCol, 0.8); ctx.lineWidth = 15 * s; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + 10 * s, (sy + ey) / 2 - wob, ex, ey); ctx.stroke();
      ctx.strokeStyle = rgba(slijmCol, 0.9); ctx.lineWidth = 7 * s; ctx.stroke(); } ctx.restore(); }
  // littekens: lichte vezelbanden die het lumen dichtknijpen
  if (litteken > 0.01) { const plekken = [0.28, 0.5, 0.66]; plekken.forEach((u0, i) => { const g = clamp(litteken * 1.6 - i * 0.3, 0, 1); if (g <= 0.01) return; const x = x0 + u0 * L, y = yAs(u0), lr = lumen(u0);
      ctx.save(); ctx.globalAlpha *= g; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - 34 * s, y + sd * (lr + 10 * s)); ctx.quadraticCurveTo(x, y + sd * lr * (1 - 1.05 * g), x + 34 * s, y + sd * (lr + 10 * s)); ctx.lineTo(x + 34 * s, y + sd * buiten(u0) * 0.9); ctx.lineTo(x - 34 * s, y + sd * buiten(u0) * 0.9); ctx.closePath(); shape(ctx, rgba('#EDE2DA', 0.92), '#C9B8AE', 1.5);
          ctx.strokeStyle = rgba('#B8A498', 0.8); ctx.lineWidth = 1.5; for (let k = 0; k < 5; k++) { const yy = y + sd * (lr * (1 - g * 0.9) + 8 * s + k * 9 * s); ctx.beginPath(); ctx.moveTo(x - 26 * s, yy); ctx.bezierCurveTo(x - 8 * s, yy - 5 * s, x + 8 * s, yy + 5 * s, x + 26 * s, yy); ctx.stroke(); } } ctx.restore(); }); }
  ctx.restore();
  return { lumen: (u) => [x0 + u * L, yAs(u), lumen(u)], buiten: (u) => buiten(u) };
}
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (sh) => Math.round(((a >> sh) & 255) * (1 - k) + ((b >> sh) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }

// =====================================================================================
// BACTERIËN VAN SOA'S (22 okt 2026). Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten naar
//   elkaar, samen ± 1,5 × 0,8 µm; vaak ín witte bloedcellen in pus. Bron: CDC; Murray, Medical Microbiology h. 22.
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; insluitsel (inclusion) naast de kern vol kleine
//   deeltjes (elementaire lichaampjes ± 0,3 µm, grotere reticulaire lichaampjes); de cel barst en de deeltjes
//   besmetten nieuwe cellen. Bron: idem h. 34.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen, draait als
//   een kurkentrekker. Bron: idem h. 35.
// BACTERIE GROOT: celwand + celmembraan, cytoplasma met ribosomen, DNA als één lus (nucleoïd) en een plasmide;
//   aangrijpingspunten van antibiotica: celwand (penicillines/ceftriaxon) en ribosomen (azitromycine, doxycycline).
// Bekende fouten: alle bacteriën als dezelfde staafjes; bacterie als leeg ovaal.
// =====================================================================================
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) { // lichaamscel met een chlamydia-insluitsel; barst = 0..1 (deeltjes komen vrij)
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba(BIO.cyto, 0.22), rgba(BIO.cyto, 0.75), 2.5);
  ctx.beginPath(); ctx.ellipse(x + r * 0.35, y - r * 0.2, r * 0.3, r * 0.26, 0.3, 0, 6.283); shape(ctx, rgba(BIO.kern, 0.55), BIO.kernL, 1.5);
  const ir = r * lerp(0.15, 0.5, groei); const ix = x - r * 0.22, iy = y + r * 0.12;
  ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); shape(ctx, rgba('#E8D9A0', 0.18), rgba('#E8D9A0', 0.7), 1.5);
  const n = Math.round(lerp(4, 46, groei)); for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, rr = Math.sqrt(hash(k * 7 + 2)) * ir * 0.85; const out = barst * (40 + 60 * hash(k)) ; const px = ix + Math.cos(an) * (rr + out), py = iy + Math.sin(an) * (rr + out);
    ctx.beginPath(); ctx.arc(px, py, k % 5 === 0 ? 4 : 2.6, 0, 6.283); ctx.fillStyle = C.koraal; ctx.fill(); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.strokeStyle = dood > 0.5 ? '#6A7488' : col; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.beginPath(); const ph = dood > 0.5 ? 0 : t * 6;
  for (let i = 0; i <= 120; i++) { const u = i / 120, xx = (u - 0.5) * len, yy = Math.sin(u * n * 6.283 - ph) * len * 0.045; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore();
}
function bacterieGroot(ctx, x, y, w, h, o = {}) { // staafbacterie in doorsnede; wandKapot 0..1 (antibioticum op de celwand), riboHl 0..1
  const { a = 1, t = 0, wandKapot = 0, riboHl = 0, col = C.koraal } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = (inset) => { roundRect(ctx, x - w / 2 + inset, y - h / 2 + inset, w - 2 * inset, h - 2 * inset, h / 2 - inset); };
  // celwand (dik), met gaten als het antibioticum werkt
  pad(0); ctx.lineWidth = 9; ctx.strokeStyle = rgba(col, 0.9); if (wandKapot > 0.01) ctx.setLineDash([lerp(400, 26, wandKapot), lerp(0, 18, wandKapot)]); ctx.stroke(); ctx.setLineDash([]);
  pad(9); ctx.fillStyle = rgba(col, 0.16); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = rgba('#F2E6C8', 0.7); ctx.stroke(); // celmembraan
  // DNA-lus (nucleoïd): één gesloten, kronkelende lus
  ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 90; i++) { const an = i / 90 * 6.283; const rr = 1 + 0.18 * Math.sin(an * 7 + 1) + 0.1 * Math.sin(an * 13); const px = x - w * 0.05 + Math.cos(an) * w * 0.18 * rr, py = y + Math.sin(an) * h * 0.26 * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // plasmide
  ctx.beginPath(); ctx.ellipse(x + w * 0.3, y + h * 0.12, w * 0.045, h * 0.09, 0.4, 0, 6.283); ctx.stroke();
  // ribosomen
  for (let k = 0; k < 34; k++) { const px = x - w * 0.42 + hash(k * 3 + 1) * w * 0.84, py = y - h * 0.32 + hash(k * 3 + 2) * h * 0.64; if (Math.abs(px - (x - w * 0.05)) < w * 0.2 && Math.abs(py - y) < h * 0.3) continue;
    ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex('#C9B896', '#E0B64A', riboHl) : rgba('#C9B896', 0.85); ctx.fill(); }
  ctx.restore(); return { wand: (an) => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] };
}

// =====================================================================================
// BLASTOCYSTE (dag 5). Recept: ± 0,15–0,2 mm, binnen de zona pellucida; buitenlaag = trofoblast (trofectoderm): één
// laag platte cellen rondom (wordt de placenta); binnenste celmassa (embryoblast) als klompje ronde cellen aan één
// kant (wordt het kind); holte vol vocht (blastocoel). Bij PGT haalt de arts 5–10 cellen uit de trofoblast aan de
// kant tegenover de binnenste celmassa. Bron: Sadler h. 3; ESHRE PGT-consortium. Bekende fout: ring van gelijke
// rondjes zonder verschil tussen buitenlaag en celmassa.
// icm = richting (radialen) van de binnenste celmassa; hlB / hlI = oplichten buitenlaag / celmassa.
// =====================================================================================
function blastocyste(ctx, x, y, r, o = {}) {
  const { a = 1, icm = Math.PI * 0.85, hlB = 0, hlI = 0, gat = 0, zona = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (zona > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, 6.283); shape(ctx, rgba('#F6EEDC', 0.12 * zona), rgba('#F6EEDC', 0.75 * zona), Math.max(2, r * 0.05)); }
  ctx.beginPath(); ctx.arc(x, y, r * 0.95, 0, 6.283); ctx.fillStyle = rgba('#BFD6E2', 0.18); ctx.fill(); // blastocoel
  // trofoblast: platte cellen langs de rand
  const n = 22; for (let k = 0; k < n; k++) { const an = k / n * 6.283; const d = Math.abs(Math.atan2(Math.sin(an - (icm + Math.PI)), Math.cos(an - (icm + Math.PI)))); if (gat > 0.01 && d < 0.35 * gat) continue;
    const cx = x + Math.cos(an) * r * 0.88, cy = y + Math.sin(an) * r * 0.88; ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.16, r * 0.065, an + Math.PI / 2, 0, 6.283);
    shape(ctx, hlB > 0.01 ? _mixHex('#EBC9A0', '#5BA4C9', 0.55 * hlB) : '#EBC9A0', '#C9A27A', 1.2); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.05, r * 0.03, an + Math.PI / 2, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.7); ctx.fill(); }
  // binnenste celmassa
  const ix = x + Math.cos(icm) * r * 0.55, iy = y + Math.sin(icm) * r * 0.55; const P = [[0, 0], [0.9, 0.3], [-0.6, 0.8], [0.4, -0.85], [-0.9, -0.3], [0.2, 1.1], [1.1, -0.5], [-0.3, -1.2], [-1.2, 0.6], [0.8, 1]];
  P.forEach(([u, v], i) => { const cx = ix + u * r * 0.14, cy = iy + v * r * 0.14; ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, 6.283); shape(ctx, hlI > 0.01 ? _mixHex('#F2D9A8', '#E0B64A', 0.6 * hlI) : '#F2D9A8', '#C9A27A', 1.2); ctx.beginPath(); ctx.arc(cx, cy, r * 0.04, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.75); ctx.fill(); });
  ctx.restore(); return { icm: [ix, iy], tegenover: [x + Math.cos(icm + Math.PI) * r * 0.9, y + Math.sin(icm + Math.PI) * r * 0.9] };
}

// =====================================================================================
// ===== Chromosomen (Erfelijkheid 1, herbouw 25 okt 2026) · GEKEURD door Kamiel 25 okt 2026 (ronde 1), eerst gebruikt in Chromosomen v2 =====
// Lessen en registratie: bibliotheek/lessen_chromosomen.md
// Vier recepten: huidDoorsnede, kernChromatine (+ chromatideX), nucleosoomDraad, onderarm.
// DNA altijd via dnaDraad (lib_micro_evo.js, C10.4: één DNA-functie overal); die moet vóór het tekenen geladen zijn.
// =====================================================================================

// ---------- Voronoi op willekeurige zaadpunten (gecachet), zoals _bioCellen maar met eigen punten ----------
// pts = [[x,y],…]; rmax(i) = grootste straal per cel. Geeft [{c, pts}] terug; gaatje van 'gap' px tussen de cellen.
function _bioVoronoi(key, pts, rmax, gap = 2, N = 36) {
  if (_bioPolyCache[key]) return _bioPolyCache[key];
  const out = pts.map((p, i) => { const R = typeof rmax === 'function' ? rmax(i) : rmax, P = [];
    const buren = pts.filter((q, j) => j !== i && Math.abs(q[0] - p[0]) < R * 2.2 && Math.abs(q[1] - p[1]) < R * 2.2);
    for (let k = 0; k < N; k++) { const an = k / N * 6.283, ux = Math.cos(an), uy = Math.sin(an); let best = R;
      for (const q of buren) { const dx = q[0] - p[0], dy = q[1] - p[1], dd = Math.hypot(dx, dy), proj = (ux * dx + uy * dy) / dd; if (proj > 0.05) best = Math.min(best, dd / 2 / proj); }
      best = Math.max(0, best - gap / 2); P.push([p[0] + ux * best, p[1] + uy * best]); }
    return { c: p, pts: P }; });
  _bioPolyCache[key] = out; return out;
}

// =====================================================================================
// HUID IN DOORSNEDE (dunne huid, onderarm). Recept (bron: OpenStax Anatomy & Physiology § 5.1; Barrandon & Green
// 1985 PNAS; Sun e.a. 2021 Int J Dermatol Venereol):
//  - opperhuid ± 75–100 µm dik, in lagen van boven naar onder: hoornlaag (10–15 lagen dode, platte cellen zonder
//    kern, ± 1 µm dik en 25–40 µm breed, bovenaan schilferend), korrellaag (2–3 lagen platte cellen met donkere
//    korrels, kern verdwijnt), stekelcellaag (4–6 lagen veelhoekige cellen met ronde kern, naar boven platter),
//    basale laag (één rij kubische tot cilindrische cellen ± 8–10 µm, kern ovaal, af en toe een delende cel).
//  - pigmentcel (melanocyt) in de basale laag, ± 1 op 7 basale cellen, licht cytoplasma, 3–4 uitlopers die tussen
//    de cellen omhoog lopen; melaninekorrels gaan naar de cellen erboven en liggen als 'kapje' boven de kern.
//    Bij albinisme zijn de pigmentcellen er wél, maar zonder melanine (o.mel = 0).
//  - basaalmembraan golvend: lederhuidpapillen steken omhoog (afstand ± 100–150 µm); in elke papil een haarvatlus.
//  - lederhuid: bindweefsel met collageenbundels en spoelvormige kernen (fibroblasten).
//  Bekende fouten: honingraat of raster van gelijke cellen; kern in de dode hoornlaag; pigmentcel bovenin;
//  een vlakke rechte basaalmembraan; melanine als vlakke bruine kleur in plaats van korrels.
// x, y = linksboven; w × h in px; o.um = breedte in micrometer (bepaalt de celgrootte); o.mel 0..1.6 (0 albinisme,
// 1 gewoon, 1,6 na zon); o.deling 0..1 = één basale cel in deling; o.hl = 'hoorn'|'levend'|'basaal'|'pigment'.
// Geeft { s (px per µm), yHoorn, yBasaal(x), pig:[[x,y]], deel:[x,y] } terug voor labels en zoom.
// =====================================================================================
function huidDoorsnede(ctx, X0, Y0, w, h, o = {}) {
  const x = 0, y = 0; // alles in lokale coördinaten (cache blijft geldig als de plaat verschuift)
  const { a = 1, um = 260, mel = 1, deling = 0, hl = null, t = 0, seed = 5, huidTint = '#D9B8A0' } = o; if (a <= 0.01) return {};
  const s = w / um, key = 'huid' + w + 'x' + h + 'u' + um + 's' + seed;
  const yTop = y + 6 * s;                                  // bovenkant hoornlaag
  const corneum = 16 * s, korrel = 9 * s;
  const lam = 115, A = 22;                                 // papilafstand en hoogte (µm)
  const bm = (xx) => { const u = (xx - x) / s; const b = Math.pow(0.5 + 0.5 * Math.cos((u - 40) / lam * 6.283), 2.2); return y + (6 + 16 + 9 + 82) * s - A * s * b + Math.sin(u * 0.05 + seed) * 1.5 * s; };
  const yLevend = yTop + corneum;                          // grens hoornlaag / korrellaag
  const yKorrel = yLevend + korrel;                        // grens korrellaag / stekelcellaag
  ctx.save(); ctx.translate(X0, Y0); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  // ---- lederhuid (alleen onder de basaalmembraan) ----
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) - 2); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#5E4652'; ctx.fill(); ctx.clip();
  // papillaire laag iets lichter langs de basaalmembraan
  ctx.fillStyle = '#6E5260'; ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 4) ctx.lineTo(xx, bm(xx) + 34 * s); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#56404C'; ctx.fill();
  // collageenbundels: lange golvende banden
  for (let i = 0; i < 26; i++) { const yy = y + (i / 26) * h * 1.2, ph = hash(i * 7.1 + seed) * 6.28, th = (1.4 + hash(i * 3.3) * 2.2) * s;
    ctx.strokeStyle = rgba('#B88A92', 0.32 + 0.2 * hash(i * 1.9)); ctx.lineWidth = th; ctx.lineCap = 'round'; ctx.beginPath();
    for (let xx = x - 10; xx <= x + w + 10; xx += 8) { const py = yy + Math.sin((xx - x) / (38 * s) + ph) * 5 * s + Math.sin((xx - x) / (11 * s) + ph * 2) * 1.2 * s; xx === x - 10 ? ctx.moveTo(xx, py) : ctx.lineTo(xx, py); } ctx.stroke(); }
  // fibroblasten: spoelvormige kernen
  for (let i = 0; i < Math.round(w / (30 * s)); i++) { const fx = x + hash(i * 5.7 + seed) * w, fy = bm(fx) + (14 + hash(i * 2.3) * 60) * s;
    ctx.beginPath(); ctx.ellipse(fx, fy, 6 * s, 1.4 * s, (hash(i * 9.1) - 0.5) * 0.4, 0, 6.283); shape(ctx, '#6E5A8E', '#8E7AAE', 1); }
  // haarvatlus in elke papil, met rode bloedcellen
  for (let k = -1; k < um / lam + 1; k++) { const px = x + (40 + k * lam) * s; if (px < x - 30 * s || px > x + w + 30 * s) continue; const top = bm(px) + 7 * s, r = 3.6 * s, dx = 5.5 * s;
    ctx.strokeStyle = '#A8564C'; ctx.lineWidth = 2 * r + 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - dx, y + h + 10); ctx.lineTo(px - dx, top + dx); ctx.arc(px, top + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, y + h + 10); ctx.stroke();
    ctx.strokeStyle = '#7A3A36'; ctx.lineWidth = 2 * r - 2.4; ctx.stroke();
    for (let j = 0; j < 9; j++) { const u = ((j / 9 + t * 0.05) % 1); const L1 = (y + h - top), Ltot = 2 * L1 + Math.PI * dx; let d = u * Ltot, cx2, cy2;
      if (d < L1) { cx2 = px - dx; cy2 = y + h - d; } else if (d < L1 + Math.PI * dx) { const an = Math.PI + (d - L1) / dx; cx2 = px + Math.cos(an) * dx; cy2 = top + dx + Math.sin(an) * dx; } else { cx2 = px + dx; cy2 = top + dx + (d - L1 - Math.PI * dx); }
      ctx.beginPath(); ctx.ellipse(cx2, cy2, r * 0.95, r * 0.55, 0.3, 0, 6.283); shape(ctx, '#C2453E', '#E07A6A', 1); } }
  ctx.restore();
  // ---- basaalmembraan ----
  ctx.strokeStyle = '#E8D6C4'; ctx.lineWidth = Math.max(1.5, 0.6 * s); ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 3) xx === x ? ctx.moveTo(xx, bm(xx)) : ctx.lineTo(xx, bm(xx)); ctx.stroke();
  // ---- levende opperhuid: Voronoi-cellen in rijen (rijafstand en celbreedte groeien naar boven: cellen worden platter) ----
  const seeds = [], soort = []; const rijen = [[5, 8.5, 'b'], [15, 10, 's'], [25, 11.5, 's'], [35, 13, 's'], [45, 14, 's'], [55, 16, 's'], [65, 18, 's'], [74, 22, 'k'], [80, 26, 'k'], [86, 30, 'k']];
  rijen.forEach(([z, dxu, sr], r) => { for (let u = -dxu + hash(r * 3.7 + seed) * dxu; u < um + dxu; u += dxu * (0.85 + 0.3 * hash(r * 13 + u))) {
      const xx = x + u * s; let yy = bm(xx) - z * s * (1 + 0.0) ; if (sr !== 'b') { const yb = bm(xx) - 5 * s; yy = lerp(yb, yKorrel, (z - 5) / (65 - 5)); if (sr === 'k') yy = lerp(yKorrel, yLevend, (z - 72) / 16); }
      seeds.push([xx + (hash(u * 1.3 + r) - 0.5) * dxu * 0.25 * s, yy + (hash(u * 2.1 + r * 5) - 0.5) * 2 * s]); soort.push(sr); } });
  // pigmentcellen: elke ± 7e basale cel
  let nb = 0; const pigIdx = []; soort.forEach((sr, i) => { if (sr === 'b') { if (nb % 7 === 3) pigIdx.push(i); nb++; } });
  const delIdx = soort.findIndex((sr, i) => sr === 'b' && seeds[i][0] > x + w * 0.62);
  const cel = _bioVoronoi(key, seeds, (i) => soort[i] === 'b' ? 9 * s : soort[i] === 'k' ? 16 * s : 12 * s, Math.max(1.5, 0.5 * s));
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yLevend); ctx.lineTo(x + w, yLevend); for (let xx = x + w; xx >= x; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.fillStyle = '#3E2E36'; ctx.fill(); ctx.clip();
  const melF = clamp(mel, 0, 2.5), melK = 0.75 + 0.25 * melF; // meer melanine = meer én grotere korrels
  cel.forEach((c, i) => { const sr = soort[i], isPig = pigIdx.includes(i); if (isPig) return;
    const vul = sr === 'b' ? _mixHex(huidTint, '#B8927E', 0.25) : sr === 'k' ? _mixHex(huidTint, '#E6CDB4', 0.45) : huidTint;
    ctx.beginPath(); bioPad(ctx, c.pts, true); shape(ctx, vul, _mixHex(vul, '#FFFFFF', 0.25), 1);
    const [cx, cy] = c.c;
    if (sr === 'k') { // korrellaag: platte, vervagende kern + donkere keratohyaline-korrels
      ctx.beginPath(); ctx.ellipse(cx, cy, 4 * s, 1.1 * s, 0, 0, 6.283); shape(ctx, rgba('#6E5A8E', 0.4), null);
      for (let k = 0; k < 10; k++) _bioCirc(ctx, cx + (hash(i * 11 + k) - 0.5) * 16 * s, cy + (hash(i * 7 + k * 3) - 0.5) * 2.6 * s, 0.45 * s, '#4A3A54'); return; }
    if (i === delIdx && deling > 0.01) { // delende cel (metafase): chromosomen op een rij in het midden, spoelfiguur, geen kernmembraan
      ctx.beginPath(); ctx.ellipse(cx, cy - 1 * s, 6.5 * s, 6 * s, 0, 0, 6.283); shape(ctx, _mixHex(huidTint, '#FFFFFF', 0.15), _mixHex(huidTint, '#FFFFFF', 0.4), 1);
      ctx.save(); ctx.globalAlpha *= deling; ctx.strokeStyle = rgba('#8FA0B5', 0.8); ctx.lineWidth = Math.max(0.8, 0.25 * s);
      for (let k = 0; k < 7; k++) { const yy = cy - 3.6 * s + k * 1.2 * s; ctx.beginPath(); ctx.moveTo(cx - 6 * s, cy); ctx.quadraticCurveTo(cx - 3 * s, yy, cx, yy); ctx.quadraticCurveTo(cx + 3 * s, yy, cx + 6 * s, cy); ctx.stroke(); }
      for (let k = 0; k < 6; k++) { const yy = cy - 3 * s + k * 1.2 * s; chromatideX(ctx, cx + (hash(k + i) - 0.5) * 0.6 * s, yy, 2.8 * s, Math.PI / 2 + (hash(k * 3) - 0.5) * 0.5, { w: 0.8 * s, coils: 0 }); }
      ctx.restore(); return; }
    const ry = sr === 'b' ? 3.4 * s : 3 * s * (1 - 0.35 * clamp((bm(cx) - cy) / (70 * s), 0, 1)), rx = sr === 'b' ? 2.5 * s : 3.2 * s;
    ctx.beginPath(); ctx.ellipse(cx, cy + (sr === 'b' ? 0.8 * s : 0), rx, ry, 0, 0, 6.283); shape(ctx, '#7A6098', '#9A84B8', 1);
    _bioCirc(ctx, cx + 0.6 * s, cy - 0.4 * s, 0.7 * s, '#4E3A6A');
    // melaninekapje boven de kern (alleen in de onderste lagen veel)
    const hoogte = clamp((bm(cx) - cy) / (55 * s), 0, 1), n = Math.round(melF * (sr === 'b' ? 10 : 8) * (1 - 0.7 * hoogte));
    for (let k = 0; k < n; k++) { const an = Math.PI * (1.2 + 0.6 * hash(i * 5 + k)), rr = rx * (0.95 + 0.45 * hash(k * 3 + i)); _bioCirc(ctx, cx + Math.cos(an) * rr, cy + (sr === 'b' ? 0.8 * s : 0) + Math.sin(an) * (ry + 0.5 * s) * (0.95 + 0.4 * hash(k * 7 + i)), 0.55 * s * melK, k % 3 ? '#5A3420' : '#3E2216'); } });
  // pigmentcellen: licht lichaam, donkere kern, uitlopers tussen de cellen omhoog, korrels
  const pig = [];
  pigIdx.forEach((i, j) => { const [cx, cy] = cel[i].c; pig.push([cx, cy]);
    const uit = [[-1.0, -0.55, 20], [-0.35, -1.0, 24], [0.4, -1.0, 22], [1.0, -0.45, 18]];
    uit.forEach(([dx, dy, L], k) => { const P = [[cx, cy - 1.5 * s]]; for (let q = 1; q <= 4; q++) { const u = q / 4; P.push([cx + dx * L * u * s + Math.sin(q * 2.1 + k + j) * 2.2 * s, cy - 1.5 * s + dy * L * u * s]); }
      ctx.strokeStyle = melF > 0.05 ? '#6A4430' : '#D8C8B6'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 1.5 * s; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke();
      ctx.lineWidth = 0.8 * s; ctx.beginPath(); bioPad(ctx, P.slice(2), false); ctx.stroke();
      if (melF > 0.05) for (let q = 1; q < 7; q++) { const pp = bioPunt(P, q / 7); if (hash(j * 17 + k * 5 + q) < 0.7 * Math.min(1, melF)) _bioCirc(ctx, pp[0], pp[1], 0.6 * s, '#3E2216'); } });
    ctx.beginPath(); bioPad(ctx, cel[i].pts.map(p => [cx + (p[0] - cx) * 0.92, cy + (p[1] - cy) * 0.92]), true); shape(ctx, '#E9DCCB', _mixHex('#E9DCCB', '#B8927E', 0.4), 1);
    ctx.beginPath(); ctx.ellipse(cx, cy + 0.5 * s, 2.3 * s, 2.8 * s, 0, 0, 6.283); shape(ctx, '#5A4478', '#7A6098', 1);
    for (let k = 0; k < Math.round(melF * 16); k++) { const an = hash(j * 31 + k) * 6.283, rr = (3.2 + hash(k * 7 + j) * 2.2) * s; _bioCirc(ctx, cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * 0.8, 0.7 * s, k % 2 ? '#5A3420' : '#3E2216'); } });
  ctx.restore();
  // ---- hoornlaag: gestapelde platte plaatjes zonder kern, bovenaan los ----
  ctx.save(); ctx.beginPath(); ctx.rect(x, yTop - 8 * s, w, yLevend - yTop + 8 * s); ctx.clip();
  const nl = 10, dz = corneum / nl; ctx.fillStyle = '#B8A088'; ctx.fillRect(x, yTop, w, yLevend - yTop);
  for (let l = 0; l < nl; l++) { const yy = yLevend - (l + 0.5) * dz, br = 34 * s; let u0 = -hash(l * 3.1 + seed) * br;
    for (let xx = x + u0; xx < x + w; xx += br * (0.9 + 0.25 * hash(l * 7 + xx))) { const lift = l >= nl - 2 ? (hash(xx * 0.01 + l) < 0.35 ? (l - nl + 3) * 1.6 * s : 0) : 0;
      roundRect(ctx, xx + 1, yy - dz * 0.36 - lift, br * 0.97, dz * 0.72, Math.min(dz * 0.36, 4)); shape(ctx, l > nl - 4 ? '#E4D4BA' : '#D8C2A4', null); } }
  ctx.restore();
  // ---- markering ----
  if (hl) { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    if (hl === 'hoorn') { ctx.strokeRect(x + 3, yTop - 4 * s, w - 6, yLevend - yTop + 4 * s); }
    if (hl === 'levend') { ctx.beginPath(); ctx.moveTo(x + 3, yLevend); ctx.lineTo(x + w - 3, yLevend); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx)); ctx.closePath(); ctx.stroke(); }
    if (hl === 'basaal') { ctx.beginPath(); for (let xx = x + 3; xx <= x + w - 3; xx += 3) xx === x + 3 ? ctx.moveTo(xx, bm(xx) - 12 * s) : ctx.lineTo(xx, bm(xx) - 12 * s); for (let xx = x + w - 3; xx >= x + 3; xx -= 3) ctx.lineTo(xx, bm(xx) + 1); ctx.closePath(); ctx.stroke(); }
    if (hl === 'pigment') pig.forEach(([px, py]) => { ctx.beginPath(); ctx.arc(px, py - 6 * s, 14 * s, 0, 6.283); ctx.stroke(); }); }
  ctx.restore();
  return { s, yTop: yTop + Y0, yLevend: yLevend + Y0, yKorrel: yKorrel + Y0, yBasaal: (xx) => bm(xx - X0) + Y0, pig: pig.map(p => [p[0] + X0, p[1] + Y0]), basaal: cel.filter((c, i) => soort[i] === 'b' && !pigIdx.includes(i) && i !== delIdx).map(c => [c.c[0] + X0, c.c[1] + Y0]), deel: delIdx >= 0 ? [cel[delIdx].c[0] + X0, cel[delIdx].c[1] + Y0] : null };
}

// =====================================================================================
// CELKERN MET CHROMATINE die condenseert tot chromosomen. Recept (bron: OpenStax Biology 2e § 10.1; Genetic Science
// Learning Center Utah; BioNumbers 109953):
//  - kern 5–10 µm, omhuld door een dubbel kernmembraan met poriën; kernlichaampje als donkerdere vlek.
//  - in de interfase ligt het DNA als lange, zacht kronkelende draden (chromatine); elk chromosoom houdt zijn eigen
//    gebied in de kern (chromosoomterritorium), dus geen één grote warboel maar 46 losse kluwens die in elkaar grijpen.
//  - vlak voor de deling (DNA al gekopieerd) trekken DEZELFDE draden samen tot X-vormige chromosomen: twee
//    zusterchromatiden vast bij het centromeer. De lengtes volgen het aantal baseparen (chr 1 ± 249 Mb … chr 21 ± 47 Mb).
//  - de condensatie is een morph langs de draad (C8), geen overvloeier: elk punt van de draad schuift naar een punt
//    op de opgerolde chromatide; op het eind blijft de oprolling als lichte windingen in de chromatide zichtbaar.
//  Bekende fouten: zigzag- of veerpatroon (Kamiel 15 okt); krabbels die naar staafjes faden; alle chromosomen even lang.
// cx, cy, r = kern; o.c = 0 (interfase) … 1 (gecondenseerd); o.n = aantal chromosomen (46); o.seed; o.kleuren =
// functie (i) → kleur (bv. vader/moeder); o.membraan 0..1. Geeft de posities van de chromosomen terug.
// =====================================================================================
const CHROM_MB = [249, 242, 198, 190, 181, 171, 159, 145, 138, 134, 135, 133, 114, 107, 102, 90, 83, 80, 59, 64, 47, 51, 156, 57]; // 1–22, X, Y (GRCh38, Mb)
function _chromLayout(n, r, seed) { // plekken voor n chromosomen in een kern met straal r (gecachet)
  const key = 'cl' + n + 'r' + r + 's' + seed; if (_bioPolyCache[key]) return _bioPolyCache[key];
  const L = []; for (let i = 0; i < n; i++) { const nr = i < 44 ? Math.floor(i / 2) : (i === 44 ? 22 : 22); L.push({ nr, len: CHROM_MB[nr] }); }
  const pos = []; let tries = 0;
  L.forEach((c, i) => { const ln = r * 0.26 * c.len / 249 + r * 0.05; let best = null, bd = -Infinity;
    for (let k = 0; k < 60; k++) { const an = hash(seed * 13 + i * 31 + k * 7) * 6.283, rr = Math.sqrt(hash(seed * 7 + i * 17 + k * 3)) * (r * 0.78 - ln * 0.5), px = Math.cos(an) * rr, py = Math.sin(an) * rr, rot = (hash(i * 5 + k + seed) - 0.5) * 2.4;
      let dmin = 1e9; for (const q of pos) dmin = Math.min(dmin, Math.hypot(q.x - px, q.y - py) - (q.ln + ln) * 0.32); if (dmin > bd) { bd = dmin; best = { x: px, y: py, rot, ln, nr: c.nr }; } }
    pos.push(best); tries++; });
  _bioPolyCache[key] = pos; return pos;
}
function _chromDraad(i, P, r, seed, N) { // lange kronkelende draad in het territorium van chromosoom i (lokale coördinaten)
  const pts = []; let px = P.x, py = P.y, an = hash(i * 7 + seed) * 6.283; const terr = P.ln * 0.65 + r * 0.06;
  for (let k = 0; k < N; k++) { an += (hash(i * 131 + k * 17 + seed) - 0.5) * 0.9 + Math.sin(k * 0.37 + i) * 0.18; const st = r * 0.03;
    let nx = px + Math.cos(an) * st, ny = py + Math.sin(an) * st; const dx = nx - P.x, dy = ny - P.y, d = Math.hypot(dx, dy);
    if (d > terr) { an = Math.atan2(-dy, -dx) + (hash(k + i) - 0.5); nx = px + Math.cos(an) * st; ny = py + Math.sin(an) * st; }
    const dk = Math.hypot(nx, ny); if (dk > r * 0.86) { nx *= r * 0.86 / dk; ny *= r * 0.86 / dk; an += Math.PI * 0.6; }
    px = nx; py = ny; pts.push([px, py]); }
  return pts;
}
function _chromDoel(P, s, w, coils) { // punt op de opgerolde X: s 0..0.5 = chromatide 1 (boven → onder), 0.5..1 = chromatide 2 (onder → boven)
  const cen = 0.38, L = P.ln, kant = s < 0.5 ? -1 : 1, u = s < 0.5 ? s * 2 : (1 - s) * 2; // u: 0 = boven, 1 = onder
  const yy = -L * cen + u * L, buig = Math.abs(yy) / L; const xx = kant * (w * 0.55 + buig * w * 0.55);
  const ph = u * coils * 6.283, cx = xx + Math.sin(ph) * w * 0.42, cy = yy + Math.cos(ph) * w * 0.12;
  const cs = Math.cos(P.rot), sn = Math.sin(P.rot); return [P.x + cx * cs - cy * sn, P.y + cx * sn + cy * cs];
}
function chromatideX(ctx, x, y, len, rot, o = {}) { // losse X (twee zusterchromatiden + centromeer) in de stijl van kernChromatine
  const { a = 1, w = len * 0.16, kleur = C.kernR, donker = C.kern, cen = 0.38, uiteen = 0, coils = 9 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [-1, 1].forEach(k => { const off = k * (w * 0.55 + uiteen * w * 1.2);
    ctx.beginPath(); ctx.moveTo(off + k * w * 0.5, -len * cen); ctx.quadraticCurveTo(off, -len * cen * 0.4, off * 0.75, 0); ctx.quadraticCurveTo(off, len * (1 - cen) * 0.4, off + k * w * 0.5, len * (1 - cen));
    ctx.strokeStyle = donker; ctx.lineWidth = w + 2; ctx.stroke(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.16); ctx.lineWidth = Math.max(1, w * 0.1); // windingen van de oprolling
    for (let q = 0; q < coils * 2; q++) { const u = q / (coils * 2), yy = -len * cen + u * len, b = Math.abs(yy) / len, cx = off * (0.75 + 0.25 * Math.min(1, b * 3)) + k * b * w * 0.5;
      ctx.beginPath(); ctx.ellipse(cx, yy, w * 0.42, w * 0.13, 0.25, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); } });
  if (uiteen < 0.3) _bioCirc(ctx, 0, 0, w * 0.42 * (1 - uiteen / 0.3), donker);
  ctx.restore();
}
function kernChromatine(ctx, cx, cy, r, o = {}) {
  const { a = 1, c = 0, n = 46, seed = 4, membraan = 1, kleuren = null, t = 0, dw = Math.max(1.6, r * 0.009) } = o; if (a <= 0.01) return [];
  const e = ease(c), pos = _chromLayout(n, r, seed);
  ctx.save(); ctx.globalAlpha *= a;
  // kern: nucleoplasma + dubbel kernmembraan met poriën
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.94, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.28); ctx.fill();
  if (membraan > 0.01) { ctx.save(); ctx.globalAlpha *= membraan; ctx.strokeStyle = C.kernR; ctx.lineWidth = Math.max(1.5, r * 0.008);
    [1, 0.975].forEach(f => { ctx.beginPath(); ctx.ellipse(cx, cy, r * f, r * 0.94 * f, 0, 0, 6.283); ctx.stroke(); });
    for (let k = 0; k < 40; k++) { const an = k / 40 * 6.283 + 0.04; _bioCirc(ctx, cx + Math.cos(an) * r * 0.988, cy + Math.sin(an) * r * 0.94 * 0.988, Math.max(1.4, r * 0.01), C.bgMicro || '#121A26'); } ctx.restore(); }
  // kernlichaampje verdwijnt bij de condensatie
  if (e < 0.95) { ctx.beginPath(); ctx.ellipse(cx + r * 0.22, cy - r * 0.12, r * 0.17, r * 0.14, 0.4, 0, 6.283); shape(ctx, rgba('#4E3A6A', 0.75 * (1 - e)), null); }
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.965, r * 0.9, 0, 0, 6.283); ctx.clip();
  const N = 90, out = [];
  pos.forEach((P, i) => { const kl = kleuren ? kleuren(i) : C.kernR, dk = kleuren ? _mixHex(kl, '#000000', 0.35) : C.kern; const w = P.ln * 0.17;
    const D = _chromDraad(i, P, r, seed, N); const pts = D.map((p, k) => { const q = _chromDoel(P, k / (N - 1), w, 7 + Math.round(P.ln / r * 12)); return [cx + lerp(p[0], q[0], e), cy + lerp(p[1], q[1], e)]; });
    if (e > 0.6) chromatideX(ctx, cx + P.x, cy + P.y, P.ln, P.rot, { a: (e - 0.6) / 0.4, w, kleur: kl, donker: dk });
    dnaDraad(ctx, pts, { w: lerp(dw, w * 0.34, e * e), kleur: kl, donker: dk, a: 1 - 0.75 * clamp((e - 0.75) / 0.25, 0, 1), helix: false });
    out.push({ x: cx + P.x, y: cy + P.y, len: P.ln, rot: P.rot, nr: P.nr }); });
  ctx.restore(); ctx.restore(); return out;
}

// =====================================================================================
// DNA ROND EIWITTEN (nucleosomen). Recept (bron: Utah Build-a-Chromosome; OpenStax Biology 2e § 10.1):
//  - DNA-dubbelhelix 2 nm breed windt ± 1,65 keer (146 baseparen) om een kern van acht histon-eiwitten
//    (een schijf van ± 11 nm breed, ± 6 nm hoog); tussen twee nucleosomen ligt een stukje 'linker'-DNA (± 20–60 bp).
//  - eiwitten zijn grijsblauw (#7A8BA8, C9), DNA paars; de helix is rechtsdraaiend met ongelijke groeven (dnaDraad).
//  - de wikkeling is 3D: het deel achter de schijf is donkerder en wordt eerst getekend.
//  Bekende fouten: een golflijn met losse bolletjes; DNA dat door de schijf heen loopt; linker-DNA dat recht is.
// Van (x0,y0) naar (x1,y1); o.n nucleosomen; o.R = straal van de schijf in px (DNA-breedte volgt: R × 2/11).
// =====================================================================================
function nucleosoomDraad(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, tilt = 1.05, t = 0, seed = 2, label = false } = o; if (a <= 0.01) return [];
  const dw = Math.max(6, R * 0.34), H = R * 6 / 11, ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const centra = []; for (let i = 0; i < n; i++) centra.push([L * (i + 0.5) / n, (i % 2 ? 1 : -1) * R * 0.45]);
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  const wikkel = (c, i) => { const P = [], Z = []; const th0 = -Math.PI * 0.85 + (i % 2) * 0.3, th1 = th0 + 1.65 * 6.283; const rr = R + dw * 0.55;
    for (let k = 0; k <= 160; k++) { const th = lerp(th0, th1, k / 160), z = (k / 160 - 0.5) * H * 1.05;
      const X = rr * Math.cos(th), Y = rr * Math.sin(th) * cs - z * sn, D = rr * Math.sin(th) * sn + z * cs; P.push([c[0] + X, c[1] + Y]); Z.push(D); } return { P, Z }; };
  const W = centra.map(wikkel);
  // linker-DNA: van het eind van de ene wikkeling naar het begin van de volgende (licht gebogen)
  const linkers = []; const start = [[-30, centra[0][1] + R * 0.8], W[0].P[0]]; linkers.push(start);
  for (let i = 0; i < n - 1; i++) { const A = W[i].P[W[i].P.length - 1], B = W[i + 1].P[0]; linkers.push([A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + (i % 2 ? -1 : 1) * R * 0.5], B]); }
  linkers.push([W[n - 1].P[W[n - 1].P.length - 1], [L + 30, centra[n - 1][1] - R * 0.8]]);
  const deel = (w, voor) => { const segs = []; let cur = null; w.P.forEach((p, k) => { const v = w.Z[k] >= 0; if (v === voor) { if (!cur) { cur = []; segs.push(cur); } cur.push(p); } else cur = null; }); return segs.filter(sg => sg.length > 2); };
  // 1) achterkant van de wikkelingen
  W.forEach(w => deel(w, false).forEach(sg => dnaDraad(ctx, sg, { w: dw, kleur: _mixHex(C.kernR, '#000000', 0.3), donker: _mixHex(C.kern, '#000000', 0.35), helix: true, glad: false, fase: t * 0.2 })));
  // 2) histon-kern: cilinder (zijkant + bovenvlak) met vier zichtbare bolletjes
  centra.forEach((c, i) => { const ry = R * cs, hz = H * sn;
    ctx.beginPath(); ctx.ellipse(c[0], c[1] + hz / 2, R, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - R, c[1] - hz / 2); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, Math.PI, 0, true); ctx.closePath(); shape(ctx, '#5E6E8A', '#8E9EBA', 1.5);
    ctx.beginPath(); ctx.ellipse(c[0], c[1] - hz / 2, R, ry, 0, 0, 6.283); shape(ctx, '#7A8BA8', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.6 + i; ctx.beginPath(); ctx.ellipse(c[0] + Math.cos(an) * R * 0.42, c[1] - hz / 2 + Math.sin(an) * ry * 0.42, R * 0.34, ry * 0.34, 0, 0, 6.283); shape(ctx, '#8696B2', '#A4B2CA', 1.2); } });
  // 3) linker-DNA en voorkant van de wikkelingen
  linkers.forEach(pl => dnaDraad(ctx, pl, { w: dw, helix: true, fase: t * 0.2 }));
  W.forEach(w => deel(w, true).forEach(sg => dnaDraad(ctx, sg, { w: dw, helix: true, glad: false, fase: t * 0.2 })));
  ctx.restore(); return centra;
}

// =====================================================================================
// ONDERARM VAN EEN CASTPERSONAGE (van boven gezien, hand plat met de handrug naar boven). Recept (antropometrie
// volwassene, DINED/ergonomietabellen: onderarm elleboog–pols ± 26 cm; hand ± 19 cm lang en ± 8,5 cm breed over de
// knokkels; pols ± 5,5–6 cm breed van boven; vingers: middelvinger ± 8 cm, wijs- en ringvinger ± 7,3–7,5 cm, pink ± 6 cm;
// duim staat schuin naar buiten vanaf de pols):
//  - één silhouet (onderarm + handrug + vingers + duim) in dezelfde vulkleur; 3 tinten: huid, schaduw langs één
//    rand, lichte strook; knokkels en nagels als lichte/donkere vlakjes; geen omlijning (Part C).
//  - huidkleur = CAST[id].huid (dezelfde persoon als in de scène); 'bruin' mengt naar een donkerder tint (zon) met een
//    bruiningsgrens bij de mouw; 'rood' = verbranding (bij albinisme in de zon: wel rood, geen bruin).
//  Bekende fouten: arm als stok zonder pols; hand even breed als de onderarm; vingers als worstjes van gelijke lengte.
// x, y = elleboog (midden); s = px per cm; o.kijk 1 = hand naar rechts. Geeft pols- en handpositie terug.
// =====================================================================================
function onderarm(ctx, x, y, s, o = {}) {
  const { a = 1, id = 'noor', outfit = null, bruin = 0, rood = 0, kijk = 1, mouw = true, mouwOp = 0 } = o; if (a <= 0.01) return {};
  const P0 = (typeof CAST !== 'undefined' && CAST[id]) || { huid: BIO.huid, topKleur: '#4D6E9C' }, Pg = (outfit && P0.garderobe && P0.garderobe[outfit]) ? Object.assign({}, P0, P0.garderobe[outfit]) : P0;
  const huid = Pg.huid, bruinKl = _mixHex(_mixHex(huid, '#5A3420', 0.38), '#8A5A3A', 0.15);
  const zon = rood > 0 ? _mixHex(huid, '#E58A80', 0.45 * clamp(rood, 0, 1)) : _mixHex(huid, bruinKl, clamp(bruin, 0, 1));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s); // vanaf hier in cm
  const arm = [[0, -3.7], [8, -3.6], [16, -3.3], [22, -3.0], [25.5, -2.85], [28, -3.4], [31, -4.0], [34, -4.25], [36.2, -4.1], [36.6, 0], [36.2, 4.0], [34, 4.15], [31, 3.8], [28, 3.2], [25.5, 2.8], [22, 3.0], [16, 3.4], [8, 3.8], [0, 3.9]];
  const vingers = [[-2.95, 7.2, 1.85, -0.07], [-0.95, 8.0, 1.95, -0.015], [1.05, 7.5, 1.85, 0.04], [2.9, 6.0, 1.6, 0.1]]; // y, lengte, breedte, hoek
  const vorm = (fill) => { ctx.fillStyle = fill; ctx.beginPath(); bioPad(ctx, arm, true); ctx.fill();
    vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an); roundRect(ctx, 0, -b / 2, L, b, b / 2); ctx.fill(); ctx.restore(); });
    ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); roundRect(ctx, 0, -1.1, 6.4, 2.2, 1.1); ctx.fill(); ctx.restore(); };
  vorm(zon);
  if ((bruin > 0.01 || rood > 0.01) && mouw) { ctx.save(); ctx.beginPath(); ctx.rect(-1, -6, 1 + mouwOp + 1.2, 12); ctx.clip(); vorm(huid); ctx.restore(); }
  // schaduw langs de onderrand, lichte strook boven het midden (vlakke tinten, binnen het silhouet)
  ctx.save(); ctx.beginPath(); bioPad(ctx, arm, true); ctx.clip();
  ctx.fillStyle = _mixHex(zon, '#000000', 0.14); ctx.beginPath(); ctx.moveTo(0, 2.4); ctx.bezierCurveTo(12, 2.2, 24, 1.8, 37, 2.7); ctx.lineTo(37, 6); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
  ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.1); ctx.beginPath(); ctx.moveTo(0, -1.6); ctx.bezierCurveTo(10, -1.5, 20, -1.2, 26, -0.9); ctx.bezierCurveTo(20, -0.2, 10, -0.5, 0, -0.4); ctx.closePath(); ctx.fill();
  ctx.restore();
  // pezen op de handrug (heel licht), knokkels en nagels
  ctx.strokeStyle = _mixHex(zon, '#FFFFFF', 0.06); ctx.lineWidth = 0.25; ctx.lineCap = 'round';
  vingers.forEach(([vy]) => { ctx.beginPath(); ctx.moveTo(28.5, vy * 0.45); ctx.lineTo(35, vy * 0.95); ctx.stroke(); });
  vingers.forEach(([vy, L, b, an]) => { ctx.save(); ctx.translate(35.6, vy); ctx.rotate(an);
    ctx.fillStyle = _mixHex(zon, '#000000', 0.08); ctx.beginPath(); ctx.ellipse(0.3, 0, 0.55, b * 0.36, 0, 0, 6.283); ctx.fill(); // knokkel
    ctx.fillStyle = _mixHex(zon, '#000000', 0.1); ctx.fillRect(L * 0.5, -b * 0.42, 0.18, b * 0.84);                        // middelste vingerkootje
    ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, L - 1.5, -b * 0.3, 1.2, b * 0.6, b * 0.25); ctx.fill(); ctx.restore(); }); // nagel
  ctx.save(); ctx.translate(29.2, -2.9); ctx.rotate(-0.62); ctx.fillStyle = _mixHex(zon, '#FFFFFF', 0.3); roundRect(ctx, 4.8, -0.65, 1.3, 1.3, 0.5); ctx.fill(); ctx.restore();
  // mouw bij de elleboog
  if (mouw) { const mk = Pg.topKleur || '#4D6E9C'; roundRect(ctx, -6, -4.9, 6 + mouwOp + 1.2, 9.8, 1.5); ctx.fillStyle = mk; ctx.fill();
    ctx.fillStyle = Pg.topAccent || _mixHex(mk, '#000000', 0.2); ctx.fillRect(mouwOp - 0.2, -4.9, 1.4, 9.8); }
  ctx.restore(); return { pols: [x + kijk * 26 * s, y], hand: [x + kijk * 34 * s, y] };
}

// =====================================================================================
// DNA-REEKS · BASEVORM (ringvorm). Gekeurd door Kamiel 25 okt 2026 (remake DNA 1, twijfel t2/t3): dé basevorm van de hele
// DNA-reeks (DNA 1–8). Eerst gebruikt in Wat is DNA? 3.0. Registratie: lessen_dna.md.
// Aanroep:  baseRing(ctx, x, y, 'A', dir, {s, a, rot, rand, bindA, plekA})
//           baseBruggen(ctx, x, y1, y2, 'A', s, a)            // waterstofbruggen tussen de paarranden
//           nucleotideRing(ctx, x, y, 'G', {s, a, explode, nummers, hl, dir, plekA})  → {p, su, b, c3, c5}
//           dnaLadderHelix(ctx, x0, y, dx, 'ATGC…', {draai, R, s, sep, hl, bruggenA, plekA, fase, toonBasen, a}) → {klein(m), groot(m), top}
// =====================================================================================
// Vaste DNA-kleuren (C1: DNA paars). Zelfde tinten als de DNA-reeks (dnalib BC), zodat oude en nieuwe films samengaan.
const DNA_BASE = {
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE' },
  rug: '#3E3366', rugR: '#8C7BBF', fosfaat: '#5E4E96', suiker: '#7A68B8',
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' },
  purine: { A: true, G: true, T: false, C: false },
  // bindingsplekken (model): hoogte langs de paarrand, 0..1. A–T twee, G–C drie; ze liggen alleen bij het juiste paar recht tegenover elkaar.
  plek: { A: [0.33, 0.67], T: [0.33, 0.67], G: [0.2, 0.5, 0.8], C: [0.2, 0.5, 0.8] }
};

// -------------------------------------------------------------------------------------
// BASE ALS RINGVORM. Recept (bron: OpenStax Biology 2e § 14.2 / Lumen 'Structure of DNA'; NPTEL mol. celbiologie lec 26):
//  - purines (A, G) = zesring + vijfring aan elkaar (breed), pyrimidines (C, T) = één zesring (smal).
//  - een paar is altijd purine + pyrimidine, daardoor is elke sport even lang (helix overal 2 nm breed).
//  - A–T houden elkaar vast met twee waterstofbruggen, G–C met drie (stippen op de paarrand, goud als ze verbonden zijn).
//  - 'past' = samen precies de breedte van de sport én de bindingsplekken recht tegenover elkaar (model; in het echt het
//    patroon van donor- en acceptorplekken).
// (x, y) = aanhechting aan de suiker; dir = +1 (base wijst omlaag) of −1 (omhoog); s = schaal (1 → sport van 200 px).
// Bekende fouten: alle basen even groot (dan zie je niet waarom A niet tegenover G past); letters zonder vorm.
// -------------------------------------------------------------------------------------
function baseRing(ctx, x, y, b, dir = 1, o = {}) {
  const { s = 1, a = 1, rot = 0, rand = null, bindA = 0, plekA = 1 } = o; if (a <= 0.01) return;
  const pur = DNA_BASE.purine[b], L = (pur ? 112 : 72) * s, w = 52 * s, kl = DNA_BASE.base[b];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
  // steeltje naar de suiker
  ctx.strokeStyle = lighten(kl, 0.25); ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 10 * s); ctx.stroke();
  const hex = (cy, r) => { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const px = r * Math.cos(an), py = cy + r * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  const r6 = w * 0.56;
  if (pur) { // vijfring bij de suiker, zesring naar de partner
    const r5 = w * 0.47, c5 = 10 * s + r5 * 0.95; ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + Math.PI + k * 2 * Math.PI / 5; const px = r5 * Math.cos(an), py = c5 + r5 * Math.sin(an); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, _mixHex(kl, '#121A26', 0.12), lighten(kl, 0.35), 1.5);
    hex(L - r6 * 0.95, r6); shape(ctx, kl, lighten(kl, 0.35), 1.5);
  } else { hex(10 * s + (L - 10 * s) / 2 + 2 * s, r6 * 1.02); shape(ctx, kl, lighten(kl, 0.35), 1.5); }
  // letter (rechtop, ook als dir = −1)
  ctx.save(); ctx.translate(0, pur ? L - r6 * 0.95 : 10 * s + (L - 10 * s) / 2 + 2 * s); ctx.scale(1, dir); ctx.rotate(-rot * 0); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), DNA_BASE.letter[b], 'center'); ctx.restore();
  // bindingsplekken op de paarrand (dwars op de as, bij y = L)
  if (plekA > 0.01) { ctx.save(); ctx.globalAlpha *= plekA; DNA_BASE.plek[b].forEach(h => { const px = (h - 0.5) * w * 1.1; _bioCirc(ctx, px, L + 1 * s, 4.2 * s, bindA > 0.5 ? C.goud : '#121A26', bindA > 0.5 ? null : lighten(kl, 0.5), 1.5); }); ctx.restore(); }
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; roundRect(ctx, -w * 0.75, -4 * s, w * 1.5, L + 14 * s, 14 * s); ctx.stroke(); }
  ctx.restore();
}
// waterstofbruggen tussen twee basen van een sport (x, y1 = paarrand boven, y2 = paarrand onder)
function baseBruggen(ctx, x, y1, y2, b, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.2 * s; ctx.setLineDash([5 * s, 4 * s]);
  DNA_BASE.plek[b].forEach(h => { const px = x + (h - 0.5) * 52 * s * 1.1; ctx.beginPath(); ctx.moveTo(px, y1 + 4 * s); ctx.lineTo(px, y2 - 4 * s); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore(); }

// -------------------------------------------------------------------------------------
// NUCLEOTIDE. Recept (OpenStax Biology 2e § 14.2; Lodish 8e § 5.1): fosfaatgroep aan koolstof 5' van de suiker
// desoxyribose (vijfhoek met zuurstof in de ring), base aan koolstof 1'. Volgende nucleotide hecht met zijn fosfaat aan 3'.
// Fosfaat = rondje met P (donkerpaars), suiker = vijfhoek (paars), base = baseRing. o.explode 0..1 trekt de drie delen uit elkaar.
// o.nummers 0..1 toont 1'–5'. Geeft posities terug {p, su, b, c3, c5}.
// -------------------------------------------------------------------------------------
function nucleotideRing(ctx, x, y, b, o = {}) { // v2 (26 okt 2026, frisse review DNA 1): base aan C1', C5' als knooppunt naar het fosfaat, optioneel OH aan C3'
  const { s = 1, a = 1, explode = 0, nummers = 0, hl = null, dir = 1, oh = 0 } = o; if (a <= 0.01) return {};
  const e = ease(explode), R = 34 * s, sx = x, sy = y;
  const pt = []; for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 2 * Math.PI / 5; pt.push([sx + R * Math.cos(an), sy + R * Math.sin(an)]); } // 0 = ring-O, 1 = C1', 2 = C2', 3 = C3', 4 = C4'
  const c5 = [pt[4][0] - R * 0.75, pt[4][1] - R * 0.7]; // C5' (buiten de ring, aan C4')
  const px = c5[0] - R * 0.9 - e * 60 * s, py = c5[1] - R * 0.2 - e * 20 * s; // fosfaat aan C5'
  const bx = pt[1][0] + 16 * s + e * 30 * s, by = pt[1][1] + 6 * s + e * 50 * s; // base aan C1'
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(pt[4][0], pt[4][1]); ctx.lineTo(c5[0], c5[1]); ctx.stroke();
  if (e < 0.9) { ctx.save(); ctx.globalAlpha *= 1 - e; ctx.beginPath(); ctx.moveTo(c5[0], c5[1]); ctx.lineTo(px, py); ctx.moveTo(pt[1][0], pt[1][1]); ctx.lineTo(bx, by + 4 * s); ctx.stroke(); ctx.restore(); }
  ctx.beginPath(); pt.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); shape(ctx, DNA_BASE.suiker, lighten(DNA_BASE.suiker, 0.35), 1.5);
  _bioCirc(ctx, pt[0][0], pt[0][1], 5 * s, '#C9B896'); _bioCirc(ctx, c5[0], c5[1], 4.5 * s, lighten(DNA_BASE.suiker, 0.2)); // ring-O, C5'
  baseRing(ctx, bx, by, b, dir, { s: s * 0.9, plekA: o.plekA ?? 0 });
  _bioCirc(ctx, px, py, 20 * s, DNA_BASE.fosfaat, lighten(DNA_BASE.fosfaat, 0.4), 1.5); text(ctx, 'P', px, py + 9 * s, fTekst(26 * s, 700), C.text, 'center');
  if (oh > 0.01) { ctx.save(); ctx.globalAlpha *= oh; const ox = pt[3][0] - R * 0.35, oy = pt[3][1] + R * 1.35; ctx.strokeStyle = DNA_BASE.rugR; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(pt[3][0], pt[3][1]); ctx.lineTo(ox + 8 * s, oy - 8 * s); ctx.stroke(); text(ctx, 'OH', ox - 6 * s, oy + 12 * s, fTekst(24 * s, 700), hl === "3'" ? C.goud : C.text, 'center'); ctx.restore(); }
  if (nummers > 0.01) { ctx.save(); ctx.globalAlpha *= nummers;
    [[1, "1'"], [2, "2'"], [3, "3'"], [4, "4'"]].forEach(([k, l]) => { const dx = pt[k][0] - sx, dy = pt[k][1] - sy, d = Math.hypot(dx, dy), off = k === 1 ? -22 : 26; text(ctx, l, pt[k][0] + dx / d * 26 * s - (k === 2 ? 22 * s : 0), pt[k][1] + dy / d * 26 * s + 9 * s + (k === 1 ? off * s * 0.6 : 0), fTekst(26 * s, 700), hl === l ? C.goud : C.text, 'center'); });
    text(ctx, "5'", c5[0] + 4 * s, c5[1] - 16 * s, fTekst(26 * s, 700), hl === "5'" ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore();
  return { p: [px, py], su: [sx, sy], b: [bx, by + 60 * s], c3: pt[3], c5, c1: pt[1] };
}

// -------------------------------------------------------------------------------------
// DNA: LADDER ↔ RECHTSDRAAIENDE HELIX (één functie, morph met o.draai 0..1).
// Recept (OpenStax Biology 2e § 14.2): helix 2 nm breed, 10 baseparen per winding (0,34 nm per paar, 3,4 nm per winding),
// rechtsdraaiend, grote en kleine groef ongelijk (hier: de tweede streng loopt 140° i.p.v. 180° achter de eerste).
// Ruggengraat (suiker-fosfaat) buiten, basen binnen. Bij draai = 0 een platte ladder met de echte ringvormen.
// x0,y = begin van de as; dx = afstand per basepaar langs de as; seq = volgorde van de bovenste streng.
// o.open (array per sport 0..1) trekt sporten los; o.hl = index die goud omrand wordt. Achterkant donkerder (diepte).
// Bekende fouten: linksdraaiend; even brede groeven; basen die door de ruggengraat steken.
// -------------------------------------------------------------------------------------
function dnaLadderHelix(ctx, x0, y, dx, seq, o = {}) {
  const { draai = 0, R = 110, a = 1, s = 0.62, sep = 0, hl = -1, bruggenA = 1, plekA = 0, fase = 0, toonBasen = 1 } = o; if (a <= 0.01) return;
  const n = seq.length, e = ease(draai), off = lerp(Math.PI, Math.PI * 140 / 180, e), sp = ease(sep) * R * 0.9;
  const sc = (2 * R - 16 * s - 8) / 184; // sport = purine + pyrimidine vult precies de afstand tussen de ruggen
  const th = (i) => e * (i * 2 * Math.PI / 10) + fase * e; // rechtsdraaiend: as naar rechts, bovenkant draait naar je toe
  const P = (i, k) => { const t = th(i) + (k ? off : 0); return { x: x0 + i * dx, y: y - R * Math.cos(t) + (k ? sp : -sp), z: Math.sin(t) }; };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const rail = (k, voor) => { ctx.beginPath(); let aan = false; for (let q = 0; q <= (n - 1) * 8; q++) { const i = q / 8, t = th(i) + (k ? off : 0), X = x0 + i * dx, Y = y - R * Math.cos(t) + (k ? sp : -sp), Z = Math.sin(t); const zij = e < 0.05 ? voor : (voor ? Z >= -0.05 : Z < 0.05); if (zij) { aan ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); aan = true; } else aan = false; }
    ctx.strokeStyle = voor ? DNA_BASE.rugR : _mixHex(DNA_BASE.rugR, '#121A26', 0.5); ctx.lineWidth = voor ? 16 * s : 13 * s; ctx.stroke(); ctx.strokeStyle = voor ? DNA_BASE.rug : _mixHex(DNA_BASE.rug, '#121A26', 0.4); ctx.lineWidth = voor ? 9 * s : 7 * s; ctx.stroke(); };
  rail(0, false); rail(1, false);
  const order = [...Array(n).keys()].sort((i, j) => (P(i, 0).z + P(i, 1).z) - (P(j, 0).z + P(j, 1).z));
  if (toonBasen > 0.01) order.forEach(i => { const A = P(i, 0), B = P(i, 1), b = seq[i], c = DNA_BASE.comp[b]; const depth = (A.z + B.z) / 2; const dirAB = Math.sign(B.y - A.y) || 1;
    ctx.save(); ctx.globalAlpha *= toonBasen * (e > 0.05 ? (0.55 + 0.45 * (depth + 1) / 2) : 1);
    if (e < 0.5) { const k = sc * (1 - e * 0.6); baseRing(ctx, A.x, A.y + dirAB * 8 * s, b, dirAB, { s: k, plekA, rand: i === hl ? C.goud : null }); baseRing(ctx, B.x, B.y - dirAB * 8 * s, c, -dirAB, { s: k, plekA });
      if (sp < 1) baseBruggen(ctx, A.x, A.y + dirAB * (8 * s + (DNA_BASE.purine[b] ? 112 : 72) * k), B.y - dirAB * (8 * s + (DNA_BASE.purine[c] ? 112 : 72) * k), b, k, bruggenA * (1 - e * 2)); }
    else { const mid = A.y + (B.y - A.y) * (DNA_BASE.purine[b] ? 0.6 : 0.4); ctx.lineWidth = 11 * s; ctx.strokeStyle = DNA_BASE.base[b]; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, mid); ctx.stroke(); ctx.strokeStyle = DNA_BASE.base[c]; ctx.beginPath(); ctx.moveTo(A.x, mid); ctx.lineTo(B.x, B.y); ctx.stroke(); }
    ctx.restore(); });
  rail(0, true); rail(1, true);
  ctx.restore();
  // plekken van de groeven langs de bovenrand (voor labels): kleine groef tussen de toppen die 140° uit elkaar liggen
  return { klein: (m) => x0 + (10 * m - 140 / 36 / 2) * dx, groot: (m) => x0 + (10 * m + 5 - 140 / 36 / 2) * dx, top: y - R };
}


// =====================================================================================
// ===== Toegevoegd 26 okt 2026 voor DNA 2 DNA kopiëren 2.0 (lichte remake; keuring twijfelscènes 25 okt 2026) =====
// DNA-replicatie: vorkmodel + vork (simulatie), DNA-polymerase (hand + klem), helicase-ring, primase, ligase,
// vrije nucleotide, baseRingRNA (U in ringvorm, teal), d2Base/d2Rug (basen in de ringvorm langs een gebogen streng),
// schaafwond op onderarm(). Lessen en registratie: lessen_dna.md (sectie DNA 2). Vereist dnaDraad niet; wel baseRing.
// =====================================================================================
// Vereist lib.js (C, rgba, lighten, ease, clamp, lerp, roundRect, shape, text, fTekst, metaText), lib_bio.js (_mixHex, _bioCirc,
// bioPad, enzymKluwen, huidDoorsnede, kernChromatine, onderarm), lib_micro_evo.js (dnaDraad), lib_cast.js (CAST, persoon).
//
// RECEPT DNA-REPLICATIE (bronnen: OpenStax-afgeleid 'DNA Replication in Prokaryotes' (Principles of Biology, CC BY); Leman & Noguchi
// 2013 Genes 4:1; Meselson & Stahl 1958 PNAS 44:671; BioNumbers 108756, 111200, 112260; zie bron/remake-2026-10/bronnen.md):
//  - DNA 2 nm breed, 0,34 nm per basenpaar (dx = 0,17 × breedte), rechtsdraaiend, ±10 bp per winding; vóór de vork blijft het DNA een
//    helix die meedraait als de helicase afwikkelt; achter de vork twee enkele strengen waarvan de basen naar elkaar toe wijzen.
//  - Nieuwe nucleotiden komen altijd aan het 3'-uiteinde: de nieuwe streng groeit 5' → 3', antiparallel aan de matrijs.
//  - Leidende streng: één primer bij het startpunt, daarna continu mét de vork mee. Volgende streng: per fragment een RNA-primer
//    (±10 nt, teal) van primase vlak achter de helicase, polymerase bouwt van de vork af tot het vorige fragment, vervangt die
//    primer door DNA, ligase sluit de knip. Okazaki-fragmenten bij eukaryoten 100–200 nt (hier korter getekend: 'niet op schaal').
//  - Helicase (eukaryoot: CMG) is een ring van zes eiwitten om de matrijs van de leidende streng en schuift 3' → 5' over die streng.
//  - Kleurbetekenis in deze film: oude (zware) streng = donker paars C.kern, nieuwe (lichte) streng = licht paars; RNA-primer teal;
//    enzymen grijsblauw #7A8BA8 met actief centrum goud (C9). Basen: de vier paarse reekstinten (A licht … G donker).
//  Bekende fouten: polymerase die 3' → 5' bouwt; Okazaki-fragmenten die naar de vork toe groeien; vork zonder primers;
//  een platte ladder vóór de vork; nucleotiden die al op de matrijs 'vastzitten' voordat het enzym er is.

const D2 = {
  oud: '#6E5A9E', oudR: '#A392D6', nieuw: '#B9ACE6', nieuwR: '#DCD4F5',
  rna: '#3E86AE', rnaR: '#8CC6E1', enz: '#7A8BA8', enzR: '#A4B2CA', enzD: '#56667F', enzDD: '#44536A',
  base: { A: '#C9BEEB', T: '#9F90D4', C: '#6C5BA8', G: '#4F3F86' },
  rbase: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' },
  comp: { A: 'T', T: 'A', C: 'G', G: 'C' }, rcomp: { A: 'U', T: 'A', C: 'G', G: 'C' },
  letter: { A: '#121A26', T: '#121A26', C: '#F2F2EE', G: '#F2F2EE', U: '#121A26' },
};
const D2SEQ = 'ATGCGTACCTTAGCAGTCCATGGATCTGACTAGGCTTACGATCGGATCCATTGCAGTTACGGACTAGCTAGGATCCGTATGCAAGTCGTAGCTTAGCCGATCGTAGGCTAAGTCGATCGGATTAGC';
const d2seq = (i) => D2SEQ[((Math.floor(i) % D2SEQ.length) + D2SEQ.length) % D2SEQ.length];

// ---------- basen: de ringvorm van de DNA-reeks (baseRing uit lib_bio.js, besluit DNA 1 t2, 25 okt 2026) ----------
// RNA-base in dezelfde vorm (U = pyrimidine, zoals T), in de teal RNA-tinten (C1: RNA teal). Kandidaat voor lib_bio.js.
const RNA_BASE = { base: { A: '#BFE0EF', U: '#8CC6E1', C: '#4E93B9', G: '#356F91' }, letter: { A: '#121A26', U: '#121A26', C: '#F2F2EE', G: '#F2F2EE' } };
function baseRingRNA(ctx, x, y, b, dir = 1, o = {}) {
  const k = b === 'U' ? 'T' : b, oudB = DNA_BASE.base[k], oudL = DNA_BASE.letter[k], kl = RNA_BASE.base[b];
  DNA_BASE.base[k] = kl; DNA_BASE.letter[k] = o.geenLetter ? 'rgba(0,0,0,0)' : b === 'U' ? kl : RNA_BASE.letter[b]; // bij U: letter T onzichtbaar, U eroverheen
  try { baseRing(ctx, x, y, k, dir, o); } finally { DNA_BASE.base[k] = oudB; DNA_BASE.letter[k] = oudL; }
  if (b === 'U' && !o.geenLetter) { const s = o.s || 1, rot = o.rot || 0; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, dir);
    ctx.translate(0, 43 * s); ctx.scale(1, dir); text(ctx, 'U', 0, 13 * s, fTekst(38 * s, 700), RNA_BASE.letter.U, 'center'); ctx.restore(); }
}
// d2Base: base met voet op (x, y), wijst in richting ang; L = halve sport. Schaal zo dat purine + pyrimidine = 2L (één sport).
// Kleine basen (breedte < 9 px) als staafje in dezelfde tint (lessen_dna: ringen bij verkorting niet leesbaar).
function d2Base(ctx, x, y, ang, b, L, hw, o = {}) { const { rna = false, a = 1, rand = null, vorm = true } = o; if (a <= 0.01) return;
  const s = 2 * L / 184, pur = (b === 'A' || b === 'G'), len = (pur ? 112 : 72) * s;
  if (!vorm || 52 * s < 9) { const fill = (rna ? RNA_BASE.base : DNA_BASE.base)[b] || '#888'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2);
    ctx.beginPath(); ctx.rect(-hw, 0, hw * 2, len); ctx.fillStyle = fill; ctx.fill(); if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); return; }
  const op = Math.sin(ang) < 0; // wijst omhoog: dir −1
  // letter niet met de ring meedraaien: ring zonder letter tekenen, letter daarna rechtop in beeldcoördinaten (frisse review DNA 2, MOET 4)
  const k = (rna && b === 'U') ? 'T' : b, LB = rna ? RNA_BASE.letter : DNA_BASE.letter, oudL = DNA_BASE.letter[k]; DNA_BASE.letter[k] = 'rgba(0,0,0,0)';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(op ? ang + Math.PI / 2 : ang - Math.PI / 2);
  try { (rna ? baseRingRNA : baseRing)(ctx, 0, 0, b, op ? -1 : 1, { s, plekA: o.plekA || 0, bindA: o.bindA || 0, rand, geenLetter: true }); } finally { DNA_BASE.letter[k] = oudL; }
  ctx.restore();
  if (o.letter === false) return;
  const r6 = 52 * s * 0.56, cpos = pur ? len - r6 * 0.95 : 10 * s + (len - 10 * s) / 2 + 2 * s, lx = x + Math.cos(ang) * cpos, ly = y + Math.sin(ang) * cpos;
  const m = ctx.getTransform(), wx = m.a * lx + m.c * ly + m.e, wy = m.b * lx + m.d * ly + m.f, sc = Math.hypot(m.a, m.b);
  ctx.save(); ctx.globalAlpha *= a; ctx.setTransform(sc, 0, 0, sc, wx, wy); text(ctx, b, 0, 13 * s, fTekst(38 * s, 700), LB[b] || '#121A26', 'center'); ctx.restore(); }

// suiker-fosfaatruggengraat langs punten P (array [x,y]); o.kleur, o.bw, o.dots = indices waar een fosfaat staat
function d2Rug(ctx, P, o = {}) { const { kleur = D2.oud, bw = 10, a = 1, rand = null } = o; if (a <= 0.01 || P.length < 2) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  if (rand) { pad(); ctx.strokeStyle = rand; ctx.lineWidth = bw + 9; ctx.stroke(); }
  pad(); ctx.strokeStyle = _mixHex(kleur, '#FFFFFF', 0.35); ctx.lineWidth = bw + 3; ctx.stroke(); pad(); ctx.strokeStyle = kleur; ctx.lineWidth = bw; ctx.stroke();
  if (bw >= 12) { ctx.fillStyle = _mixHex(kleur, '#FFFFFF', 0.45); for (let k = 1; k < P.length; k++) _bioCirc(ctx, (P[k - 1][0] + P[k][0]) / 2, (P[k - 1][1] + P[k][1]) / 2, bw * 0.22, _mixHex(kleur, '#FFFFFF', 0.45)); }
  ctx.restore(); }

// ---------- ENZYMEN ----------
// DNA-polymerase, zijaanzicht langs het DNA (recept: 'rechterhand' met handpalm, vingers en duim rond matrijs en nieuwe streng;
// vingers sluiten om een nucleotide die past; ringvormige klem (sliding clamp) houdt het enzym op het DNA). (x, y) = het actieve
// centrum (3'-uiteinde van de nieuwe streng), g = DNA-breedte in px, dir = +1 bouwt naar rechts / -1 naar links, up = +1 nieuwe streng
// boven de matrijs / -1 eronder. Twee lagen: polymeraseAchter vóór het DNA tekenen, polymeraseVoor erna.
function _polyT(ctx, x, y, g, dir, up, rot) { ctx.translate(x, y); ctx.rotate(rot || 0); ctx.scale(dir, -up); }
function polymeraseAchter(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, klem = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  // lokaal: nieuwe streng op y = +0.5g? -> we werken met de nieuwe streng op y = -0.5g*(-1)... eenvoud: DNA-as op y = 0, nieuwe streng op +0.5g (na scale = boven bij up=1)
  // handpalm (achter het DNA, donker): grote vorm rond het basenpaar in het actieve centrum
  ctx.beginPath(); bioPad(ctx, [[-1.15 * g, -0.2 * g], [-0.95 * g, 0.95 * g], [-0.1 * g, 1.25 * g], [0.85 * g, 1.05 * g], [1.2 * g, 0.2 * g], [0.95 * g, -0.95 * g], [0.0, -1.2 * g], [-0.9 * g, -0.95 * g]], true);
  shape(ctx, D2.enzDD, _mixHex(D2.enzDD, '#FFFFFF', 0.25), 1.5);
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.strokeStyle = '#8796B0'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }
function polymeraseVoor(ctx, x, y, g, o = {}) { const { dir = 1, up = 1, a = 1, rot = 0, sluit = 0, klem = true, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _polyT(ctx, x, y, g, dir, up, rot);
  const vul = D2.enz, rand = hl > 0.01 ? _mixHex(D2.enzR, C.goud, hl) : D2.enzR, lw = hl > 0.01 ? 3 : 1.5;
  // duim: grijpt het nieuwe dubbelstrengs stuk achter het actieve centrum (boven de nieuwe streng)
  ctx.beginPath(); bioPad(ctx, [[-1.05 * g, 0.75 * g], [-0.75 * g, 1.22 * g], [-0.2 * g, 1.28 * g], [0.05 * g, 1.0 * g], [-0.35 * g, 0.78 * g], [-0.8 * g, 0.68 * g]], true); shape(ctx, vul, rand, lw);
  // vingers: boven de inkomende nucleotide; draaien omlaag als hij past (sluit 0 → 1)
  ctx.save(); ctx.translate(0.3 * g, 1.0 * g); ctx.rotate(lerp(0.62, -0.06, ease(sluit)));
  ctx.beginPath(); bioPad(ctx, [[0.0, 0.0], [0.2 * g, 0.32 * g], [0.75 * g, 0.3 * g], [1.0 * g, 0.0], [0.85 * g, -0.22 * g], [0.35 * g, -0.12 * g]], true); shape(ctx, vul, rand, lw);
  ctx.strokeStyle = rgba(_mixHex(vul, '#FFFFFF', 0.35), 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0.25 * g, 0.12 * g); ctx.lineTo(0.8 * g, 0.08 * g); ctx.stroke(); ctx.restore();
  // onderkaak onder de matrijs
  ctx.beginPath(); bioPad(ctx, [[-0.9 * g, -0.72 * g], [-0.6 * g, -1.18 * g], [0.3 * g, -1.22 * g], [0.95 * g, -0.95 * g], [1.05 * g, -0.68 * g], [0.2 * g, -0.74 * g]], true); shape(ctx, vul, rand, lw);
  // actief centrum (goud): de holte boven het volgende matrijsbasisje
  const pk = lerp(0.3, 0.18, ease(sluit)); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(3, g * 0.06) * (1 + 0.5 * ease(sluit)); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0.32 * g, 0.62 * g, pk * g, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
  if (klem) { ctx.beginPath(); ctx.ellipse(-1.45 * g, 0, 0.22 * g, 0.9 * g, 0, -Math.PI * 0.5, Math.PI * 0.5); ctx.strokeStyle = '#A4B2CA'; ctx.lineWidth = 0.2 * g; ctx.stroke(); }
  ctx.restore(); }

// helicase: ring van zes eiwitten (scheef gezien) om één streng; (x, y) = midden van de ring op die streng; r = straal; fase = draaien
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kralen = []; for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + fase; kralen.push([x + Math.sin(an) * r * 0.42, y + Math.cos(an) * r, Math.sin(an + 1.57) /*diepte*/, an]); }
  kralen.sort((p, q) => p[2] - q[2]);
  kralen.forEach(([kx, ky, z]) => { const voor = z >= 0; if (laag === 'achter' && voor) return; if (laag === 'voor' && !voor) return;
    const vul = voor ? '#8E9CB8' : D2.enzD; ctx.beginPath(); ctx.ellipse(kx, ky, r * 0.4, r * 0.36, 0, 0, 6.283); shape(ctx, vul, hl > 0.01 && voor ? _mixHex(D2.enzR, C.goud, hl) : _mixHex(vul, '#FFFFFF', 0.3), hl > 0.01 && voor ? 3 : 1.5); });
  ctx.restore(); }
// primase en ligase: kleinere enzymen (kluwen met goud actief centrum, lib_bio enzymKluwen)
function primase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#6F86A0', seed: 2 }, o)); }
function ligase(ctx, x, y, r, o = {}) { enzymKluwen(ctx, x, y, r, Object.assign({ col: '#8392AE', seed: 7 }, o)); }

// vrije DNA-nucleotide: fosfaat + suiker (vijfhoek) + base; vereenvoudigd (in het kernplasma eigenlijk met drie fosfaatgroepen)
function vrijNucleotide(ctx, x, y, b, ang, s, o = {}) { const { a = 1, rand = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  // suiker in de oorsprong, fosfaat links, base wijst omhoog (-y)
  ctx.beginPath(); for (let k = 0; k < 5; k++) { const an = -Math.PI / 2 + k * 1.2566; const X = Math.cos(an) * 13 * s, Y = Math.sin(an) * 13 * s; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath();
  shape(ctx, D2.oud, rand || D2.oudR, rand ? 3 : 1.5);
  ctx.strokeStyle = D2.oudR; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(-12 * s, 4 * s); ctx.lineTo(-24 * s, 8 * s); ctx.stroke();
  _bioCirc(ctx, -30 * s, 9 * s, 9 * s, D2.oudR, rand || '#D8CFF2', rand ? 3 : 1.2);
  ctx.restore(); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); d2Base(ctx, 0, -10 * s, -Math.PI / 2, b, 56 * s, 13 * s, { letter: s >= 0.9, rand }); ctx.restore(); }

// ---------- REPLICATIEVORK ----------
// st = { f: vorkpositie (bp), i0, i1: zichtbaar bereik (bp), X0: x van bp i0, cy, g: breedte (px), dx (px per bp; standaard 0,17 g),
//        Dmax: halve afstand tussen de dochters, Lsplit (bp), Ltw (bp), Lf: lengte Okazaki-fragment (bp), pl: primerlengte (bp),
//        p1: eerste primer van de volgende streng (bp), vlag: snelheid lagging-polymerase t.o.v. de vork, t: tijd (rustige beweging),
//        toon: {helicase, poly, primase, ligase, nieuw}, letters: bool, startLead: bp van de leidende primer }
// Geeft posities terug voor labels.
function vorkModel(st) { const S = Object.assign({ i0: 0, i1: 120, X0: 80, cy: 450, g: 56, Dmax: 210, Lsplit: 14, Ltw: 12, Lf: 30, pl: 4, p1: 12, vlag: 1.35, startLead: 0, lead: 3 }, st);
  S.dx = S.dx || S.g * 0.17; const X = (i) => S.X0 + (i - S.i0) * S.dx;
  const D = (i) => i >= S.f ? S.g / 2 : S.g / 2 + (S.Dmax - S.g / 2) * ease((S.f - i) / S.Lsplit);
  const yT = (i) => S.cy - D(i), yB = (i) => S.cy + D(i);
  // Okazaki-fragmenten
  const frags = []; for (let k = 1; ; k++) { const p = S.p1 + (k - 1) * S.Lf; if (p - S.pl > S.f + 2) break;
    const a = p + 2, e = a + S.pl * 0.5; const primN = clamp((S.f - a) / (S.pl * 0.5), 0, 1) * S.pl; // aantal primerbasen
    const ondergrens = k === 1 ? S.startLead : S.p1 + (k - 2) * S.Lf - S.pl + 1;     // tot waar de polymerase doorbouwt (incl. vervangen primer vorige)
    const q = Math.max(ondergrens, p - S.pl + 1 - Math.max(0, S.f - e) * S.vlag);     // 3'-uiteinde (linkerkant)
    const klaar = q <= ondergrens + 0.01, fKlaar = e + (p - S.pl + 1 - ondergrens) / S.vlag;
    frags.push({ k, p, a, e, primN, q, klaar, fKlaar, ondergrens }); }
  // per bp: wat zit er op de nieuwe onderstreng? 0 = niets, 1 = DNA, 2 = RNA-primer
  const onder = (i) => { for (const F of frags) { const lo = F.p - S.pl + 1; if (i <= F.p && i >= F.p - F.primN + 1 && i >= lo) { // primerdeel van dit fragment
        const vervangen = frags.some(G => G.k === F.k + 1 && G.q <= i); return vervangen ? 1 : 2; }
      if (i < lo && i >= F.q) return 1; } return 0; };
  // ligase-knippen: na het vervangen van een primer wordt de knip bij (p_vorige - pl + 0.5) gedicht
  const knips = frags.filter(F => F.k >= 2).map(F => { const prev = frags[F.k - 2]; const xN = prev.p - S.pl + 0.5; const tKl = F.fKlaar; return { i: xN, s: clamp((S.f - tKl) / 4, 0, 1), k: F.k }; });
  return Object.assign(S, { X, D, yT, yB, frags, onder, knips }); }

function vorkTeken(ctx, st) { const M = vorkModel(st); const { g, dx, cy, f, i0, i1, X, yT, yB } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, nieuw: 1, lead: 1, lag: 1 }, M.toon || {});
  const bw = Math.max(5, g * 0.18), L = g / 2 - bw * 0.5 - 1, hw = Math.max(1.6, dx * 0.34), vorm = dx >= 22, letters = !!M.letters && dx >= 30;
  const iA = Math.floor(i0), iB = Math.ceil(i1);
  // --- vóór de vork: helix die meedraait (fase volgt f) ---
  const tw = (i) => ease((i - f) / M.Ltw), fase = (i) => (i / 10) * 6.283 - f * 0.628 + 0.6;
  const Ytop = (i) => i <= f ? yT(i) : cy + lerp(-g / 2, -g / 2 * Math.cos(fase(i)), tw(i)), Ybot = (i) => i <= f ? yB(i) : cy + lerp(g / 2, g / 2 * Math.cos(fase(i) + 2.3), tw(i));
  const Ztop = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i)), tw(i)), Zbot = (i) => i <= f ? 1 : lerp(1, Math.sin(fase(i) + 2.3), tw(i));
  const pts = (fy, a, b) => { const P = []; for (let i = a; i <= b + 1e-6; i += 0.25) P.push([X(i), fy(i)]); return P; };
  // achterkant van de helix eerst
  const helixDeel = (fy, fz, kleur, voor) => { let cur = []; const segs = []; for (let i = Math.max(f, iA); i <= iB; i += 0.25) { const z = fz(i) >= 0; if (z === voor) cur.push([X(i), fy(i)]); else { if (cur.length > 1) segs.push(cur); cur = []; } } if (cur.length > 1) segs.push(cur);
    segs.forEach(P => d2Rug(ctx, P, { kleur: voor ? kleur : _mixHex(kleur, '#000000', 0.35), bw })); };
  helixDeel(Ytop, Ztop, D2.oud, false); helixDeel(Ybot, Zbot, D2.oud, false);
  // sporten vóór de vork
  for (let i = Math.max(Math.ceil(f), iA); i <= iB; i++) { const xa = X(i), ya = Ytop(i), yb = Ybot(i), mid = (ya + yb) / 2, b = d2seq(i); const z = (Ztop(i) + Zbot(i)) / 2; const dk = z < 0 ? 0.3 : 0;
    const Lh = Math.abs(yb - ya) / 2 - bw * 0.4; if (Lh < 2) continue; ctx.save(); ctx.globalAlpha *= z < 0 ? 0.8 : 1;
    d2Base(ctx, xa, ya + Math.sign(yb - ya) * bw * 0.4, yb > ya ? Math.PI / 2 : -Math.PI / 2, b, Lh, hw, { vorm: false }); d2Base(ctx, xa, yb - Math.sign(yb - ya) * bw * 0.4, yb > ya ? -Math.PI / 2 : Math.PI / 2, D2.comp[b], Lh, hw, { vorm: false }); ctx.restore(); }
  helixDeel(Ytop, Ztop, D2.oud, true); helixDeel(Ybot, Zbot, D2.oud, true);
  // --- achter de vork: twee matrijzen + nieuwe strengen ---
  const iF = Math.min(f, iB);
  if (iF > iA) {
    // helling per bp (voor schuine basen)
    const ang = (fy, i, sgn) => { const d = (fy(i + 0.3) - fy(i - 0.3)) / (0.6 * dx); return Math.atan2(1, -d) * sgn; };
    // nieuwe strengen: leidende (boven, onder de bovenmatrijs) en volgende (onder)
    const leadEind = Math.min(iF - M.lead, iB), leadStart = Math.max(M.startLead, iA);
    const yTn = (i) => yT(i) + g, yBn = (i) => yB(i) - g;
    // matrijs-basen + nieuwe basen per bp
    for (let i = iA; i <= iF; i++) { const b = d2seq(i), xa = X(i);
      const nT = toon.nieuw && toon.lead && i >= leadStart && i <= leadEind; const nB = toon.nieuw && toon.lag ? M.onder(i) : 0;
      const aT = Math.atan2(yT(i + 0.3) - yT(i - 0.3), 0.6 * dx), aB = Math.atan2(yB(i + 0.3) - yB(i - 0.3), 0.6 * dx);
      const primLead = i < M.startLead + M.pl;
      d2Base(ctx, xa, yT(i) + bw * 0.4, aT + Math.PI / 2, b, L, hw, { vorm, letter: letters });
      if (nT) d2Base(ctx, xa, yTn(i) - bw * 0.4, aT - Math.PI / 2, primLead ? D2.rcomp[b] : D2.comp[b], L, hw, { vorm, rna: primLead, letter: letters });
      d2Base(ctx, xa, yB(i) - bw * 0.4, aB - Math.PI / 2, D2.comp[b], L, hw, { vorm, letter: letters });
      if (nB) d2Base(ctx, xa, yBn(i) + bw * 0.4, aB + Math.PI / 2, nB === 2 ? D2.rcomp[D2.comp[b]] : b, L, hw, { vorm, rna: nB === 2, letter: letters }); }
    d2Rug(ctx, pts(yT, iA - 0.5, iF), { kleur: D2.oud, bw }); d2Rug(ctx, pts(yB, iA - 0.5, iF), { kleur: D2.oud, bw });
    if (toon.nieuw && toon.lead && leadEind > leadStart) { const pe = Math.min(M.startLead + M.pl - 0.5, leadEind + 0.5);
      if (pe > leadStart - 0.5) d2Rug(ctx, pts(yTn, leadStart - 0.5, pe), { kleur: D2.rna, bw }); if (leadEind + 0.5 > pe) d2Rug(ctx, pts(yTn, Math.max(pe, leadStart - 0.5), leadEind + 0.5), { kleur: D2.nieuw, bw }); }
    if (toon.nieuw && toon.lag) { let run = null; const runs = []; for (let i = iA; i <= iF; i++) { const v = M.onder(i); if (v && run && run.v === v && run.b === i - 1 && !M.knips.some(K => K.s < 1 && Math.abs(K.i - (i - 0.5)) < 0.01)) run.b = i; else { if (run) runs.push(run); run = v ? { a: i, b: i, v } : null; } } if (run) runs.push(run);
      const knip = (i) => M.knips.some(K => K.s < 1 && Math.abs(K.i - i) < 0.01);
      runs.forEach(R => d2Rug(ctx, pts(yBn, R.a - (knip(R.a - 0.5) ? 0.12 : 0.45), R.b + (knip(R.b + 0.5) ? 0.12 : 0.45)), { kleur: R.v === 2 ? D2.rna : D2.nieuw, bw })); }
    M.yTn = yTn; M.yBn = yBn; M.leadEind = leadEind; }
  return M; }

// enzymen op de vork (na vorkTeken: polymerase heeft een achterlaag; daarom tekent vorkEnzymen het DNA niet opnieuw maar legt de voorkant erover)
function vorkEnzymen(ctx, M, o = {}) { const { g, f, X, yT, yB, dx } = M; const t = M.t || 0; const toon = Object.assign({ helicase: 1, poly: 1, primase: 1, ligase: 1, lead: 1, lag: 1 }, M.toon || {}); const hl = o.hl || {}; const out = {};
  const gp = g * 0.55; // grootte enzym t.o.v. DNA (vereenvoudigd: in het echt groter)
  // helicase op de bovenste streng (matrijs van de leidende streng), net vóór de vork
  if (toon.helicase) { const hx = X(f + 0.6), hy = yT(f) ; helicaseRing(ctx, hx, hy, g * 0.62, { fase: t * 2.4 + f * 0.5, laag: 'voor', hl: hl.helicase || 0 }); out.helicase = [hx, hy]; }
  // leidende polymerase
  if (toon.poly && toon.lead && M.leadEind > M.startLead) { const i = M.leadEind + 0.5, x = X(i), yc = (yT(i) + M.yTn(i)) / 2; const rot = Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx);
    polymeraseVoor(ctx, x, yc, gp, { dir: 1, up: -1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6), hl: hl.poly || 0 }); out.polyLead = [x, yc]; }
  // volgende streng: polymerase op het actieve fragment (of in de sprong naar de volgende primer)
  if (toon.poly && toon.lag && M.frags.length) { let F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); let x, y, rot = 0;
    if (F) { const i = F.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; rot = Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx); }
    else { const done = [...M.frags].reverse().find(F => F.klaar), nxt = M.frags.find(G => !G.klaar && (!done || G.k > done.k));
      if (done && nxt) { const u = clamp((f - done.fKlaar) / Math.max(0.5, nxt.e - done.fKlaar), 0, 1), i0 = done.q - 0.5, i1 = nxt.p - M.pl + 0.5; const ii = lerp(i0, i1, ease(u));
        x = X(ii); y = (yB(ii) + M.yBn(ii)) / 2 + Math.sin(Math.PI * ease(u)) * g * 1.6; } else if (done) { const i = done.q - 0.5; x = X(i); y = (yB(i) + M.yBn(i)) / 2; } }
    if (x != null && (M.lagA == null ? 1 : M.lagA) > 0.01) { polymeraseVoor(ctx, x, y, gp, { dir: -1, up: 1, rot, sluit: 0.5 + 0.5 * Math.sin(t * 6 + 1), hl: hl.poly || 0, a: M.lagA == null ? 1 : M.lagA }); out.polyLag = [x, y]; } }
  // primase: bij de nieuwste primer, vlak achter de helicase
  if (toon.primase) { const F = [...M.frags].reverse().find(F => F.primN > 0.01); if (F && (F.primN < M.pl - 0.01 || f - F.e < 1.8)) { const i = F.p - F.primN + 0.5, x = X(i), y = M.yBn(i) + g * 0.55; primase(ctx, x, y, g * 0.42, { an: 0.4, hl: hl.primase || 0 }); out.primase = [x, y]; } }
  // ligase bij een knip die gedicht wordt
  if (toon.ligase) { const K = M.knips.find(K => K.s > 0 && K.s < 1); if (K) { const x = X(K.i), y = M.yBn(K.i) + g * 0.48; ligase(ctx, x, y, g * 0.55, { an: -1.2, sluit: K.s, hl: hl.ligase || 0 });
      if (K.s > 0.6) { ctx.save(); ctx.globalAlpha *= (1 - K.s) * 2.5; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, M.yBn(K.i), g * 0.3, 0, 6.283); ctx.stroke(); ctx.restore(); } out.ligase = [x, y]; } }
  return out; }
// achterlagen van de polymerasen (vóór vorkTeken aanroepen met hetzelfde model; vorkModel is goedkoop)
function vorkAchter(ctx, st) { const M = vorkModel(st); const { g, f, X, yT, yB, dx } = M; const toon = Object.assign({ poly: 1, helicase: 1, lead: 1, lag: 1, nieuw: 1 }, st.toon || {}); const gp = g * 0.55;
  if (toon.helicase) helicaseRing(ctx, X(f + 0.6), yT(f), g * 0.62, { fase: (st.t || 0) * 2.4 + f * 0.5, laag: 'achter' });
  const leadEind = Math.min(f - M.lead, M.i1); if (toon.poly && toon.lead && toon.nieuw && leadEind > M.startLead) { const i = leadEind + 0.5; polymeraseAchter(ctx, X(i), (yT(i) + yT(i) + g) / 2, gp, { dir: 1, up: -1, rot: Math.atan2(yT(i + 0.5) - yT(i - 0.5), dx) }); }
  if (toon.poly && toon.lag && toon.nieuw) { const F = M.frags.find(F => !F.klaar && F.primN >= M.pl - 0.01 && f >= F.e); if (F) { const i = F.q - 0.5; polymeraseAchter(ctx, X(i), (yB(i) + yB(i) - g) / 2, gp, { dir: -1, up: 1, rot: Math.atan2(yB(i + 0.5) - yB(i - 0.5), dx), a: st.lagA == null ? 1 : st.lagA }); } }
}
function vork(ctx, st, o = {}) { vorkAchter(ctx, st); const M = vorkTeken(ctx, st); const E = vorkEnzymen(ctx, M, o); return Object.assign(M, { E }); }

// ---------- SCHAAFWOND op een onderarm (zelfde transformatie als onderarm: elleboog (x, y), s px per cm, kijk) ----------
// heel 0 = vers (rauw, rood, puntjes), 0,35 = korst, 0,7 = roze nieuwe huid, 1 = genezen. Recept (wondgenezing: stolsel/korst binnen
// uren, nieuwe opperhuid groeit vanaf de randen onder de korst in ±1 week): vlakke vormen, geen bloed dat druppelt.
function schaafwond(ctx, x, y, s, o = {}) { const { heel = 0, kijk = 1, a = 1, cx = 13, cyy = 0.6, rx = 2.6, ry = 1.25, seed = 3 } = o; if (a <= 0.01 || heel >= 0.999) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk * s, s);
  const rand = (k) => { const P = []; for (let i = 0; i < 26; i++) { const an = i / 26 * 6.283; const w = 1 + 0.13 * Math.sin(an * 3 + seed) + 0.08 * Math.sin(an * 7 + seed * 2); P.push([cx + Math.cos(an) * rx * w * k, cyy + Math.sin(an) * ry * w * k]); } return P; };
  const huid = (CAST && CAST.noor && CAST.noor.huid) || '#D9A982';
  const vers = 1 - ease(heel / 0.35), korst = ease(heel / 0.35) * (1 - ease((heel - 0.55) / 0.2)), roze = ease((heel - 0.55) / 0.2) * (1 - ease((heel - 0.8) / 0.2));
  if (vers > 0.01) { ctx.save(); ctx.globalAlpha *= vers; ctx.beginPath(); bioPad(ctx, rand(1.12), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.35); ctx.fill();
    ctx.beginPath(); bioPad(ctx, rand(0.95), true); ctx.fillStyle = '#B84A44'; ctx.fill();
    for (let i = 0; i < 22; i++) { const u = hash(seed + i), v = hash(seed + i * 7); _bioCirc(ctx, cx + (u - 0.5) * rx * 1.6, cyy + (v - 0.5) * ry * 1.4, 0.07 + 0.05 * hash(i), '#7E2A2A'); }
    ctx.strokeStyle = rgba('#F0C8B8', 0.6); ctx.lineWidth = 0.06; for (let i = 0; i < 7; i++) { const yy = cyy - ry * 0.7 + i * ry * 0.23; ctx.beginPath(); ctx.moveTo(cx - rx * 0.7, yy); ctx.lineTo(cx + rx * 0.6, yy + 0.1); ctx.stroke(); } ctx.restore(); }
  if (korst > 0.01) { ctx.save(); ctx.globalAlpha *= korst; ctx.beginPath(); bioPad(ctx, rand(1.08), true); ctx.fillStyle = _mixHex(huid, '#C2453E', 0.25); ctx.fill();
    const kk = 0.95 - 0.35 * ease((heel - 0.35) / 0.3); ctx.beginPath(); bioPad(ctx, rand(kk), true); ctx.fillStyle = '#6A3428'; ctx.fill(); ctx.strokeStyle = '#4E241C'; ctx.lineWidth = 0.08; ctx.stroke();
    ctx.strokeStyle = rgba('#8E4A38', 0.8); ctx.lineWidth = 0.05; for (let i = 0; i < 9; i++) { const u = hash(seed * 3 + i) - 0.5, v = hash(seed * 5 + i) - 0.5; ctx.beginPath(); ctx.moveTo(cx + u * rx * kk, cyy + v * ry * kk); ctx.lineTo(cx + u * rx * kk + 0.3, cyy + v * ry * kk + 0.12); ctx.stroke(); } ctx.restore(); }
  if (roze > 0.01) { ctx.save(); ctx.globalAlpha *= roze; ctx.beginPath(); bioPad(ctx, rand(1.0), true); ctx.fillStyle = _mixHex(huid, '#E89A9A', 0.4); ctx.fill(); ctx.restore(); }
  ctx.restore(); }


// =====================================================================================
// GESLACHTSORGANEN EN PUBERTEIT 2.0 (26 okt 2026): hormDeeltje, hypofysePoort, manDoorsnede, penisDoorsnede, vulvaSchema,
// schaalStreep. Vereist ook hormoonVorm (lib_hormonen.js). Status: in de film, wacht op Kamiels keuring.
// =====================================================================================
// Geslachtsorganen en puberteit 2.0 (lichte remake, fase 1, 25 okt 2026) — nieuwe tekenobjecten, kandidaat voor bibliotheek/lib_bio.js.
// Ronde 2 (gebruikt in de film 26 okt 2026; nog niet door Kamiel gekeurd als bibliotheekobject). Vereist lib.js, lib_hormonen.js (hormoonVorm), lib_bio.js (bioPad, zenuwcel, bloedvat, _bioVoronoi, zaadcelEcht).

// ---------- hormoondeeltje met vaste vorm en kleur per hormoon (kleurafspraak reeks: eiwithormonen teal-tinten, steroïden paars) ----------
const HORM = { gnrh: ['#E0B64A', 'tropine', 0.55], fsh: ['#5BA4C9', 'tropine', 1], lh: ['#7FC48F', 'tropine', 1], testo: ['#8C7BBF', 'cortisol', 0.9], oestro: ['#B59BE0', 'cortisol', 0.9] };
function hormDeeltje(ctx, x, y, soort, r = 9, a = 1, volg = false) {
  if (a <= 0.01) return; const [col, vorm, k] = HORM[soort];
  hormoonVorm(ctx, x, y, r * k, vorm, a, col);
  if (volg) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 6.283); ctx.stroke(); ctx.restore(); } // C8: één deeltje volgen, goud omlijnd (geen gloed)
}

// =====================================================================================
// HYPOTHALAMUS EN HYPOFYSE MET HET POORTADERSYSTEEM (mediaan, voorkant = rechts).
// Recept: GnRH-cellen liggen in de hypothalamus; hun axonen eindigen in de eminentia mediana bovenaan het steeltje,
// waar ze GnRH afgeven aan een eerste haarvatnet. Poortaders lopen langs het steeltje naar een tweede haarvatnet in de
// VOORkwab; daar maken dezelfde cellen (gonadotrofe cellen) FSH en LH, die via een ader het lichaam in gaan. De
// achterkwab (zenuwweefsel) is de voortzetting van het steeltje. Hypofyse ± 1 cm (erwt), in het Turkse zadel.
// Bron: Kenhub 'Pituitary gland' (portaalsysteem naar de voorkwab, gonadotrofe cellen maken FSH en LH);
// StatPearls 'Physiology, Puberty' (GnRH in stoten). Bekende fouten: GnRH dat 'door de lucht' naar de hypofyse
// zweeft; FSH/LH uit de achterkwab; hypofyse los onder de hersenen.
// Ontwerpeenheden: ± 900 × 760, oorsprong = onderkant van de hypothalamus (bovenkant steeltje).
// o: puls 0..1 (stoot GnRH loopt door de poortaders: 0 = net afgegeven, 1 = in de voorkwab), aan 0..1 (cellen
// voorkwab maken FSH/LH), uit 0..1 (FSH/LH in de uitgaande ader), stoten 0..1 (hoe vaak: kindertijd → puberteit), t.
// =====================================================================================
function hypofysePoort(ctx, x, y, s = 1, o = {}) {
  const { a = 1, puls = -1, aan = 0, uit = 0, t = 0, volgLH = -1 } = o; if (a <= 0.01) return null;
  const P = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // hypothalamusweefsel (boven) als zachte band, met de derde hersenkamer als spleet in het midden
  ctx.beginPath(); bioPad(ctx, [P(-430, -330), P(-200, -360), P(200, -360), P(430, -330), P(430, -70), P(150, -40), P(60, 0), P(-60, 0), P(-150, -40), P(-430, -70)], true);
  shape(ctx, rgba(BIO.brein, 0.32), rgba(BIO.breinS, 0.7), 2);
  ctx.beginPath(); bioPad(ctx, [P(-14, -360), P(-10, -200), P(0, -90), P(10, -200), P(14, -360)], true); ctx.fillStyle = rgba('#0D1420', 0.5); ctx.fill();
  // Turks zadel (bot) onder de hypofyse
  ctx.beginPath(); bioPad(ctx, [P(-300, 210), P(-250, 330), P(-60, 420), P(140, 420), P(300, 340), P(350, 220)], false); ctx.strokeStyle = rgba(BIO.bot, 0.7); ctx.lineWidth = 16 * s; ctx.stroke();
  // achterkwab (zenuwweefsel, links) en voorkwab (klierweefsel, rechts)
  const ACHTER = [P(-40, 150), P(-170, 170), P(-215, 250), P(-170, 330), P(-60, 340), P(-10, 280), P(0, 190)];
  ctx.beginPath(); bioPad(ctx, ACHTER, true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  const VOOR = [P(10, 140), P(140, 120), P(270, 170), P(300, 260), P(240, 345), P(90, 370), P(0, 330), P(-10, 240)];
  ctx.beginPath(); bioPad(ctx, VOOR, true); shape(ctx, rgba('#C98A6A', 0.38), rgba('#E0A88A', 0.85), 2.5);
  // cellen in de voorkwab (Voronoi), de gonadotrofe cellen lichten op bij 'aan'
  const pts = []; for (let i = 0; i < 46; i++) { const rr = 16 * Math.sqrt(i + 0.6), an = i * 2.39996; pts.push([150 + Math.cos(an) * rr * 1.25, 250 + Math.sin(an) * rr * 0.95]); }
  const cellen = _bioVoronoi('hypVoor', pts, 20, 3, 20);
  ctx.save(); ctx.beginPath(); bioPad(ctx, VOOR, true); ctx.clip();
  cellen.forEach((c, i) => { const gon = i % 3 === 0; const g = gon ? aan : 0;
    ctx.beginPath(); c.pts.forEach((p, k) => { const q = P(p[0], p[1]); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
    shape(ctx, gon ? _mixHex('#D9A48F', '#8FD0E8', g * 0.6) : rgba('#D9A48F', 0.55), rgba('#F2D6C4', 0.5), 1);
    const q = P(c.c[0], c.c[1]); ctx.beginPath(); ctx.arc(q[0], q[1], 4.5 * s, 0, 6.283); ctx.fillStyle = rgba(BIO.kern, 0.8); ctx.fill(); });
  ctx.restore();
  // steeltje
  ctx.beginPath(); bioPad(ctx, [P(-60, 0), P(-40, 80), P(-40, 160), P(30, 160), P(40, 80), P(60, 0)], true); shape(ctx, rgba(BIO.brein, 0.45), rgba(BIO.breinS, 0.8), 2);
  // GnRH-cellen in de hypothalamus met axonen naar de eminentia mediana
  const cel = [[-260, -250], [-120, -290], [210, -270]]; const eind = [];
  cel.forEach(([cx, cy], i) => { const [qx, qy] = P(cx, cy); const e = zenuwcel(ctx, qx, qy, { s: s * 0.9, col: '#B79AE6', naar: P(-16 + i * 16, -20), seed: i + 2, takken: 5, axonDik: 4, puls: puls >= 0 && puls < 0.25 ? puls * 4 : -1 }); eind.push(e); });
  // eerste haarvatnet (bovenaan het steeltje) → poortaders → tweede haarvatnet in de voorkwab
  const PA = [[[-10, -10], [-4, 60], [30, 120], [90, 170], [140, 220]], [[20, -10], [36, 60], [80, 110], [170, 160], [230, 230]]];
  PA.forEach((pa, i) => bloedvat(ctx, pa.map(p => P(p[0], p[1])), 8 * s, t + i * 0.3, { n: 4, cel: 5 * s, speed: 0.12, haarvat: true }));
  ctx.strokeStyle = rgba(BIO.bloed, 0.8); ctx.lineWidth = 3 * s; for (let k = -2; k <= 2; k++) { ctx.beginPath(); bioPad(ctx, [P(-40 + k * 8, -6), P(-20 + k * 12, -30), P(10 + k * 10, -8), P(40 + k * 6, -24)], false); ctx.stroke(); }
  // GnRH-stoot: deeltjes van de axoneinden langs de poortaders naar de voorkwab
  if (puls >= 0) { const u = clamp(puls, 0, 1); for (let i = 0; i < 12; i++) { const pa = PA[i % 2]; const f = clamp(u * 1.25 - (i / 12) * 0.25, 0, 1); if (f <= 0.001 || f >= 0.999) continue;
      const D = bioDicht(pa.map(p => P(p[0], p[1])), 12); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i) - 0.5) * 6 * s, py, 'gnrh', 7 * s, Math.min(1, (1 - f) * 6)); } }
  // uitgaande ader uit de voorkwab met FSH en LH, het lichaam in (naar rechtsonder)
  const UIT = [P(250, 300), P(330, 350), P(420, 420), P(520, 470)];
  bloedvat(ctx, UIT, 12 * s, t, { n: 6, cel: 7 * s, speed: 0.1, a: 0.35 + 0.65 * Math.max(aan, uit) });
  if (uit > 0.01) { const D = bioDicht(UIT, 16); for (let i = 0; i < 10; i++) { const f = ((t * 0.14 + i / 10) % 1); const [px, py] = bioPunt(D, f); hormDeeltje(ctx, px + (hash(i * 3) - 0.5) * 10 * s, py, i % 2 ? 'lh' : 'fsh', 8 * s, uit); }
    if (volgLH >= 0) { const [px, py] = bioPunt(D, clamp(volgLH, 0, 1)); hormDeeltje(ctx, px, py, 'lh', 9 * s, uit, true); } }
  // FSH/LH die in de cellen ontstaan
  if (aan > 0.01) cellen.forEach((c, i) => { if (i % 3) return; const q = P(c.c[0] + 10, c.c[1] - 6); hormDeeltje(ctx, q[0], q[1], i % 2 ? 'lh' : 'fsh', 5 * s, aan * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
  ctx.restore();
  return { hth: P(0, -200), steel: P(0, 80), voor: P(150, 250), achter: P(-110, 250), uit: UIT[3], eind };
}

// =====================================================================================
// MANNELIJKE GESLACHTSORGANEN, mediane doorsnede (zijaanzicht, buik = rechts), OP SCHAAL (1 cm = 14 px bij s = 1).
// Recept (cm): zaadbal 4–5 lang, bijbal 4–5 langs de achterkant; zaadleider ± 30 cm: vanaf de staart van de bijbal
// omhoog in de zaadstreng, door het lieskanaal de buik in, met een boog óver de urineleider naar de ACHTERkant van de
// blaas, verwijdt tot ampulla; zaadblaasje 4–5 × 1,5–2,5 tegen de achterkant van de blaas, boven de prostaat; samen
// vormen ze de spuitbuis die DOOR de prostaat in de urinebuis uitkomt; prostaat 3 × 4 × 5 (walnoot) onder de blaashals
// rond de urinebuis; schaambeen vóór de blaas, endeldarm achter prostaat en zaadblaasjes. Penis in rust ± 9 cm.
// Bron: OpenStax A&P 27.1 (maten zaadbal, route, aandelen sperma); Semmelweis anatomie (zaadleider ± 30 cm, over de
// urineleider, zaadblaasje, prostaat 3 × 4 × 5); Yale Guided Anatomy (zaadleider naar de achterkant van de blaas).
// Bekende fouten: zaadleider die rechtstreeks vanaf de zaadbal naar de prostaat loopt; zaadblaasje vóór de blaas;
// prostaat boven de blaas; zaadleider die in de blaas uitkomt.
// Oorsprong = bovenkant schaambeenvoeg. o.hl = { zaadbal, bijbal, leider, blaasjes, prostaat, blaas, buis, lies } 0..1,
// o.kring 0..1 (kringspier blaashals dicht), o.zw 0..1 (zwellichamen vol), o.dim = lijst van delen die 35 % krijgen.
// Geeft { P(cmX, cmY), route: [...px], naam: {deel: [x,y]} } terug.
// =====================================================================================
const MD = { k: 14 };
const MD_VAS = [[-0.3, 13.6], [-0.75, 11.4], [-0.2, 8.6], [1.3, 5.4], [1.7, 2.2], [1.4, -0.6], [0.4, -2.6], [-1.6, -3.7], [-4.2, -3.6], [-6.6, -2.4], [-7.6, -0.4], [-7.3, 1.6], [-6.5, 3.1], [-5.3, 4.2], [-3.9, 4.9]];
const MD_URE = [[-3.4, 3.1], [-3.4, 4.6], [-3.1, 6.2], [-2.4, 7.3], [-0.9, 7.7], [0.9, 7.2], [2.1, 6.9], [2.6, 8.2], [2.72, 10.5], [2.8, 13.4], [3.0, 14.75]]; // urinebuis langs de onderkant (kant van de balzak) in het kleine zwellichaam
const MD_BIJ = [[0.25, 9.95], [-0.45, 10.6], [-0.75, 12.0], [-0.55, 13.2], [-0.3, 13.6]];
function manDoorsnede(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {}, kring = 0, zw = 0, t = 0, dim = [] } = o; const k = MD.k * s;
  const P = (cx, cy) => [x + cx * k, y + cy * k]; const Ps = pts => pts.map(p => P(p[0], p[1]));
  const route = bioDicht(Ps([[1.0, 11.6], [0.6, 10.4]].concat(MD_BIJ.slice(1)).concat(MD_VAS.slice(1)).concat(MD_URE.slice(2))), 16);
  const naam = { zaadbal: P(1.6, 12.2), bijbal: P(-1.0, 11.0), leider: P(1.9, 3.0), lies: P(0.8, -2.4), blaas: P(-4.6, 0.4), blaasjes: P(-7.6, 2.4), prostaat: P(-3.3, 4.7), buis: P(2.0, 9.0), schaambeen: P(-0.4, 2.0), darm: P(-10.0, 3.0), zwel: P(3.3, 9.5), ureter: P(-10.3, -4.2) };
  if (a <= 0.01) return { P, route, naam };
  const al = d => (dim.includes(d) ? 0.35 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const gl = (pt, r, col, g) => { if (g <= 0.01) return; ctx.save(); ctx.globalAlpha *= 0.55 * g; ctx.beginPath(); ctx.arc(pt[0], pt[1], r * k, 0, 6.283); ctx.fillStyle = rgba(col, 0.35); ctx.fill(); ctx.restore(); };
  // lichaamsomtrek (huid), zachte vlakke vulling
  ctx.beginPath(); bioPad(ctx, Ps([[-13, -9], [-12.6, 0], [-12.2, 5], [-10.4, 8.6], [-7.6, 9.6], [-4.6, 9.4], [-2.4, 9.2], [-0.8, 9.6], [-0.9, 11], [-0.6, 14.4], [0.8, 15.2], [2.4, 14.6], [2.5, 12.6], [2.2, 9.6], [2.0, 8.0], [2.3, 9.4], [2.5, 13.8], [3.3, 15.1], [4.2, 14.2], [4.2, 9.6], [3.6, 7.2], [3.4, 4.0], [3.6, 0], [4.2, -5], [4.6, -9]]), false);
  ctx.lineTo(...P(4.6, -9)); ctx.closePath(); shape(ctx, rgba(BIO.huid, 0.13), rgba(BIO.huid, 0.6), 2);
  // endeldarm (achter)
  ctx.save(); ctx.globalAlpha *= al('darm'); ctx.strokeStyle = rgba('#9A7A6A', 0.55); ctx.lineWidth = 3.0 * k; ctx.beginPath(); bioPad(ctx, Ps([[-10.2, -9], [-10.6, -3], [-9.8, 2], [-8.4, 6], [-7.6, 8.4], [-7.4, 9.4]]), false); ctx.stroke();
  ctx.strokeStyle = rgba(C.bgSchema, 0.7); ctx.lineWidth = 1.8 * k; ctx.stroke(); ctx.restore();
  // schaambeen(voeg)
  ctx.save(); ctx.globalAlpha *= al('bot'); const [sx, sy] = P(-0.4, 2.1); ctx.translate(sx, sy); ctx.rotate(0.4); ctx.beginPath(); ctx.ellipse(0, 0, 1.1 * k, 2.7 * k, 0, 0, 6.283); shape(ctx, rgba(BIO.bot, 0.6), BIO.botS, 2); ctx.restore();
  // urineleider (komt van achteren-boven in de blaas; de zaadleider kruist er in een boog óverheen) — eigen tint (urine), dunner
  const UL = Ps([[-11.4, -9.0], [-10.4, -4.4], [-8.9, -1.3], [-7.3, 0.1], [-6.3, 0.9]]);
  ctx.save(); ctx.globalAlpha *= al('ureter'); ctx.strokeStyle = '#7FB8C4'; ctx.lineWidth = 0.22 * k; ctx.beginPath(); bioPad(ctx, UL, false); ctx.stroke(); ctx.restore();
  // blaas
  gl(P(-4.6, 0.4), 3.6, C.teal, hl.blaas || 0);
  ctx.save(); ctx.globalAlpha *= al('blaas'); ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 3.1], [-6.6, 2.2], [-7.6, -0.4], [-6.6, -2.6], [-4.0, -3.0], [-1.7, -2.0], [-1.0, 0.4], [-1.9, 2.4]]), true); shape(ctx, rgba(C.teal, 0.22), C.teal, 2.5);
  ctx.beginPath(); bioPad(ctx, Ps([[-3.6, 2.6], [-5.9, 1.8], [-6.7, -0.3], [-5.9, -2.0], [-4.0, -2.4], [-2.2, -1.6], [-1.6, 0.4], [-2.3, 2.1]]), true); ctx.strokeStyle = rgba(C.teal, 0.45); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  // zaadblaasje (achter de blaas, boven de prostaat), gelobd
  gl(P(-6.6, 2.4), 2.2, C.groen, hl.blaasjes || 0);
  ctx.save(); ctx.globalAlpha *= al('blaasjes'); const [vx, vy] = P(-6.7, 2.3); ctx.translate(vx, vy); ctx.rotate(0.75); ctx.beginPath();
  for (let i = 0; i <= 48; i++) { const an = i / 48 * 6.283, w = 1 + 0.13 * Math.sin(an * 7); const px = Math.cos(an) * 2.3 * k * w, py = Math.sin(an) * 0.85 * k * w; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(C.groen, 0.5), lighten(C.groen, 0.3), 2); ctx.restore();
  // prostaat rond de urinebuis
  gl(P(-3.3, 4.7), 2.4, C.paars, hl.prostaat || 0);
  ctx.save(); ctx.globalAlpha *= al('prostaat'); ctx.beginPath(); bioPad(ctx, Ps([[-3.4, 3.1], [-5.0, 3.5], [-5.3, 4.9], [-4.4, 6.1], [-3.1, 6.3], [-1.9, 5.5], [-1.8, 4.0], [-2.4, 3.2]]), true); shape(ctx, rgba(C.paars, 0.55), lighten(C.paars, 0.3), 2); ctx.restore();
  // zwellichamen + penis (rust ± 9 cm; zw maakt ze iets voller)
  ctx.save(); ctx.globalAlpha *= al('penis'); const zb = 1 + 0.12 * zw;
  ctx.beginPath(); bioPad(ctx, Ps([[0.9, 6.0], [2.6, 6.2], [3.9 * zb, 8.6], [4.05 * zb, 13.0], [3.7, 14.6], [3.1, 14.9], [2.55, 13.8], [2.45, 9.4], [2.0, 7.6], [0.7, 7.0]]), true); shape(ctx, rgba(BIO.huid, 0.22), rgba(BIO.huid, 0.75), 2);
  ctx.beginPath(); bioPad(ctx, Ps([[1.6, 6.3], [2.9, 6.5], [3.8 * zb, 8.8], [3.85 * zb, 12.9], [3.5, 13.6], [3.05, 12.8], [3.0, 9.0], [2.6, 7.2]]), true); shape(ctx, _mixHex('#8A4A48', '#B5302C', zw), rgba('#C97A70', 0.8), 1.2);
  ctx.restore();
  // zaadbal (in de balzak) met kronkelige zaadbuisjes en bijbal langs de achterkant
  ctx.save(); ctx.globalAlpha *= al('balzak'); ctx.beginPath(); bioPad(ctx, Ps([[-0.9, 10.2], [-1.5, 12.4], [-0.9, 14.6], [1.0, 15.3], [2.5, 14.4], [2.6, 12.0], [2.2, 9.9], [0.7, 9.4]]), true); shape(ctx, rgba(BIO.huid, 0.2), rgba(BIO.huid, 0.7), 2); ctx.restore();
  gl(P(1.0, 12.0), 3.0, '#D9A48F', hl.zaadbal || 0);
  ctx.save(); ctx.globalAlpha *= al('zaadbal'); const [zx, zy] = P(1.0, 12.0); ctx.translate(zx, zy); ctx.rotate(0.22); ctx.beginPath(); ctx.ellipse(0, 0, 1.3 * k, 2.2 * k, 0, 0, 6.283); shape(ctx, rgba('#D9A48F', 0.8), lighten('#D9A48F', 0.3), 2);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#8A4438', 0.6); ctx.lineWidth = 1.6; for (let r = 0; r < 6; r++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const px = (-1 + 2 * u) * 1.2 * k, py = (-1.8 + r * 0.7) * k + Math.sin(u * 22 + r) * 0.22 * k; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); ctx.restore();
  gl(P(-0.5, 11.8), 1.8, C.oker, hl.bijbal || 0);
  ctx.save(); ctx.globalAlpha *= al('bijbal'); ctx.strokeStyle = C.oker; ctx.lineWidth = 0.75 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_BIJ), false); ctx.stroke(); ctx.restore();
  // zaadleider
  { const [gx, gy] = P(-7.5, -0.1); ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, 0.8 * k, 0, 6.283); ctx.clip(); ctx.strokeStyle = C.bgSchema; ctx.lineWidth = 0.64 * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke(); ctx.restore(); } // uitsparing: zaadleider ligt óver de urineleider
  const leid = hl.leider || 0; ctx.save(); ctx.globalAlpha *= al('leider'); ctx.strokeStyle = C.goud; ctx.lineWidth = (0.3 + 0.12 * leid) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_VAS), false); ctx.stroke();
  const [ax, ay] = P(-7.25, 1.4); ctx.beginPath(); ctx.ellipse(ax, ay, 0.35 * k, 0.8 * k, 0.3, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); // ampulla
  // lieskanaal (schuine opening in de buikwand)
  if ((hl.lies || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= hl.lies; ctx.setLineDash([6, 6]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; const [lx, ly] = P(1.0, -1.6); ctx.beginPath(); ctx.ellipse(lx, ly, 0.9 * k, 1.8 * k, 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); }
  // urinebuis
  ctx.save(); ctx.globalAlpha *= al('buis'); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = (0.22 + 0.1 * (hl.buis || 0)) * k; ctx.beginPath(); bioPad(ctx, Ps(MD_URE), false); ctx.stroke(); ctx.restore();
  // kringspier bij de blaashals
  if (kring > 0.01) { ctx.save(); ctx.globalAlpha *= kring; const [kx, ky] = P(-3.4, 3.1); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(kx, ky, 0.6 * k, 0.25 * k, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { P, route, naam };
}

// =====================================================================================
// PENIS IN DWARSDOORSNEDE. Recept: twee zwellichamen (corpora cavernosa) naast elkaar aan de bovenkant, elk met een
// slagader in het midden, samen in een stevig vlies; één kleiner zwellichaam (corpus spongiosum) onderaan met de
// urinebuis erin; huid erom. Bij een erectie lopen de holten van de bovenste zwellichamen vol met bloed: ze worden
// groter en ronder, het vlies spant en drukt de afvoerende aders dicht. Bron: OpenStax A&P 27.1; MSD Manual 'Structure
// of the male reproductive system'. Bekende fouten: één buis; urinebuis in de bovenste zwellichamen.
// =====================================================================================
function penisDoorsnede(ctx, x, y, r, o = {}) {
  const { a = 1, vul = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const R = r * (1 + 0.22 * vul);
  ctx.beginPath(); ctx.ellipse(x, y, R * 1.08, R, 0, 0, 6.283); shape(ctx, rgba(BIO.huid, 0.45), rgba(BIO.huid, 0.9), 2);
  const cr = R * (0.42 + 0.04 * vul);
  for (const d of [-1, 1]) { const cx = x + d * R * 0.44, cy = y - R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 6.283); shape(ctx, _mixHex('#7A3E44', '#B02A2A', vul), '#E8D8DE', 2.5 + 1.5 * vul);
    for (let i = 0; i < 22; i++) { const an = i * 2.39996, rr = cr * 0.85 * Math.sqrt((i + 0.5) / 22); const px = cx + Math.cos(an) * rr, py = cy + Math.sin(an) * rr;
      ctx.beginPath(); ctx.arc(px, py, cr * (0.06 + 0.08 * vul), 0, 6.283); ctx.fillStyle = rgba(vul > 0.5 ? '#E05A4A' : '#3A1A22', 0.8); ctx.fill(); }
    ctx.beginPath(); ctx.arc(cx, cy, cr * 0.12, 0, 6.283); shape(ctx, '#C2453E', '#F0B0A0', 1.2); }
  const sx = x, sy = y + R * 0.52; ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.3, R * 0.26, 0, 0, 6.283); shape(ctx, rgba('#9A5A5A', 0.8), '#E8D8DE', 1.5);
  ctx.beginPath(); ctx.ellipse(sx, sy, R * 0.12, R * 0.03, 0, 0, 6.283); ctx.fillStyle = '#C9CED6'; ctx.fill();
  ctx.restore(); return { cav: [x - R * 0.44, y - R * 0.18], spons: [sx, sy], R };
}

// =====================================================================================
// BUITENKANT VROUW (vulva), vooraanzicht, vlak schema. Recept: van boven naar onder in de middellijn: venusheuvel,
// clitoris (eikel met voorhuid) waar de kleine schaamlippen vooraan samenkomen, opening van de urinebuis, opening van
// de vagina, dan het perineum en de anus; grote schaamlippen aan de buitenkant, kleine schaamlippen erbinnen.
// Bron: OpenStax A&P 27.2 ('clitoris waar de kleine schaamlippen vooraan samenkomen'; vaginaopening tussen
// urinebuisopening en anus). Bekende fouten: urinebuis in de vagina; clitoris onder de urinebuis.
// Ontwerpeenheden: ± 260 × 460, oorsprong = vaginaopening. o.hl = { cli, buis, vag, lip } 0..1.
// =====================================================================================
function vulvaSchema(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hl = {} } = o; const P = (px, py) => [x + px * s, y + py * s];
  const naam = { cli: P(0, -128), buis: P(0, -66), vag: P(0, 0), groot: P(-102, -10), klein: P(-44, -40), anus: P(0, 150) };
  if (a <= 0.01) return naam; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const HUID = BIO.huid, D = _bioDonker(HUID, 0.25);
  ctx.beginPath(); ctx.ellipse(...P(0, -168), 105 * s, 40 * s, 0, 0, 6.283); ctx.fillStyle = rgba(HUID, 0.1); ctx.fill(); // venusheuvel
  for (const d of [-1, 1]) { // grote schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 14, -170), P(d * 86, -130), P(d * 108, -10), P(d * 70, 100), P(d * 12, 118), P(d * 28, 40), P(d * 40, -60), P(d * 26, -150)], true);
    shape(ctx, rgba(HUID, 0.5 + 0.2 * (hl.lip || 0)), rgba(D, 0.9), 2); }
  for (const d of [-1, 1]) { // kleine schaamlippen
    ctx.beginPath(); bioPad(ctx, [P(d * 4, -126), P(d * 34, -96), P(d * 44, -20), P(d * 30, 60), P(d * 6, 84), P(d * 14, 10), P(d * 16, -70)], true);
    shape(ctx, rgba('#C98A8A', 0.75), rgba('#A8646A', 0.9), 1.8); }
  ctx.beginPath(); bioPad(ctx, [P(-20, -150), P(0, -158), P(20, -150), P(14, -128), P(-14, -128)], true); shape(ctx, rgba('#C98A8A', 0.85), '#A8646A', 1.5); // voorhuid clitoris
  ctx.beginPath(); ctx.ellipse(...P(0, -128), 9 * s, 8 * s, 0, 0, 6.283); shape(ctx, _mixHex('#E0A08C', '#F2C0B0', hl.cli || 0), '#B86A68', 1.5);
  ctx.beginPath(); ctx.ellipse(...P(0, -66), 4.5 * s, 3 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#5BA4C9', hl.buis || 0), 1.5 + 1.5 * (hl.buis || 0));
  ctx.beginPath(); ctx.ellipse(...P(0, 0), 13 * s, 32 * s, 0, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.85), _mixHex('#A8646A', '#E0A08C', hl.vag || 0), 1.5 + 1.5 * (hl.vag || 0));
  ctx.beginPath(); ctx.arc(...P(0, 150), 8 * s, 0, 6.283); shape(ctx, rgba('#3A1A22', 0.6), rgba(D, 0.8), 1.5);
  ctx.restore(); return naam;
}

// ---------- klein: schaalstreep met eenheid voluit ----------
function schaalStreep(ctx, x, y, px, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.text; ctx.fillRect(x, y, px, 5); ctx.fillRect(x, y - 6, 3, 17); ctx.fillRect(x + px - 3, y - 6, 3, 17); text(ctx, lab, x + px / 2, y + 34, fMeta(22), C.text2, 'center'); ctx.restore(); }

// ===== CELDELING 2.0 (lichte remake, 26 okt 2026): chromosomen met armen, delende cel, spoelfiguur. Vereist _mixHex en _bioPolyCache (hierboven) en dnaDraad (lib_micro_evo.js) voor cdKluwen. Gebruik: films/voortplanting/celdeling/bron/src/scenes_cd2.js
// CELDELING · nieuwe tekenobjecten (lichte remake, fase 1, 25 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape), _mixHex (lib_cast.js).
//
// CHROMATIDE MET ARMEN. Recept (bron: OpenStax Biology 2e § 10.2 en 11.1; Pierce, Genetics Essentials § 2.x):
//  - een chromatide = één DNA-molecuul, opgerold; twee zusterchromatiden vast bij het centromeer (cohesine).
//  - centromeer niet in het midden (cen ≈ 0,38 bij het lange paar, 0,30 bij het korte); de kinetochoor zit aan de
//    buitenkant van het centromeer, naar de pool gericht.
//  - in de anafase gaat het centromeer vóórop en slepen de armen erachteraan (V-vorm): de trekdraad hangt aan het
//    kinetochoor, niet aan de armen. Dat is een morph van dezelfde chromatide, geen nieuwe tekening.
//  - crossing-over: twee niet-zusterchromatiden (de binnenste van een paar) wisselen het stuk voorbij het chiasma;
//    daarna bestaat één chromatide uit een stuk teal (vaderskant) en een stuk oker (moederskant). De zuster ernaast
//    blijft ongewijzigd. Kleuren zoals Chromosomen 2.1: vaderskant C.teal, moederskant C.oker.
//  Bekende fouten: X die als één staaf beweegt; chromatiden die in de anafase met de armen vóórop gaan; crossing-over
//  tussen zusterchromatiden; alle vier de chromatiden gemengd.
// =====================================================================================
const CD = { vader: C.teal, moeder: C.oker, draad: '#8FA0B5', pool: '#B8C4D6' };
const _cdk = (h, k = 0.4) => _mixHex(h, '#000000', k);

// pad van één chromatide: centromeer (cx, cy); armen omhoog (len*cen) en omlaag (len*(1-cen)) langs richting rot;
// zwaai = 0..1 hoe ver de armen naar achteren slepen; kant = +1 (beweegt naar links, armen slepen naar rechts) of -1
function cdPad(cx, cy, len, rot, o = {}) {
  const { cen = 0.38, zwaai = 0, kant = 1, bol = 0.10, n = 22 } = o; const P = [];
  const arm = (L, sgn, nn) => { const pts = []; const ang = rot + (sgn < 0 ? -Math.PI / 2 : Math.PI / 2) + sgn * -kant * zwaai * 1.15;
    for (let i = 0; i <= nn; i++) { const u = i / nn, d = u * L; const bend = Math.sin(u * Math.PI) * L * bol * (1 + zwaai); const dx = Math.cos(ang), dy = Math.sin(ang);
      pts.push([cx + dx * d + (-dy) * bend * kant * 0.6, cy + dy * d + dx * bend * kant * 0.6]); } return pts; };
  const up = arm(len * cen, -1, Math.round(n * cen)).reverse(), lo = arm(len * (1 - cen), 1, Math.round(n * (1 - cen)));
  return up.concat(lo.slice(1)); // van boven-tip (u=0) via centromeer naar onder-tip (u=1)
}
// teken een chromatide langs pad P met kleursegmenten segs = [[u0, u1, kleur], …]
function cdChromatide(ctx, P, w, segs, o = {}) {
  const { a = 1, coils = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = P.length - 1, at = (u) => Math.round(clamp(u, 0, 1) * N);
  const lijn = (i0, i1) => { ctx.beginPath(); ctx.moveTo(P[i0][0], P[i0][1]); for (let i = i0 + 1; i <= i1; i++) ctx.lineTo(P[i][0], P[i][1]); };
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = _cdk(kl); ctx.lineWidth = w + 3; ctx.stroke(); });
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke(); });
  if (coils && w >= 9) { ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = Math.max(1, w * 0.09);
    for (let i = 1; i < N; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i + 1]; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; const [x, y] = P[i];
      ctx.beginPath(); ctx.moveTo(x - nx * w * 0.38 - dx / L * w * 0.12, y - ny * w * 0.38 - dy / L * w * 0.12); ctx.quadraticCurveTo(x + dx / L * w * 0.18, y + dy / L * w * 0.18, x + nx * w * 0.38 - dx / L * w * 0.12, y + ny * w * 0.38 - dy / L * w * 0.12); ctx.stroke(); } }
  ctx.restore();
}
// een heel chromosoom (X): twee zusterchromatiden; uiteen 0 = vast, 1 = los; kin = kinetochoren tonen;
// ringen = cohesine (goud-grijze ringen (Kamiel 25 okt 2026: niet oker, dat is moederskant)) 0..1; segsL / segsR = kleuren per zuster; zwaaiL/R en dxL/R voor de anafase
function cdChromosoom(ctx, x, y, len, o = {}) {
  const { w = 18, cen = 0.38, kl = CD.vader, segsL = null, segsR = null, uiteen = 0, a = 1, kin = false, ringen = 0, dxL = 0, dxR = 0, zwaai = 0, rot = 0, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  // xv > 0: X-vorm, de armen van elke zuster wijken licht naar buiten (vast bij het centromeer)
  const gap = w * 0.52 + uiteen * w * 0.6;
  const PL = cdPad(x - gap + dxL, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen, zwaai, kant: 1 }), PR = cdPad(x + gap + dxR, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen, zwaai, kant: -1 });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x + (dxL + dxR) / 2, y + len * (0.5 - cen), w * 3.1 + Math.abs(dxR - dxL) / 2, len * 0.62, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  cdChromatide(ctx, PL, w, segsL || [[0, 1, kl]], { a }); cdChromatide(ctx, PR, w, segsR || [[0, 1, kl]], { a });
  ctx.save(); ctx.globalAlpha *= a;
  if (uiteen < 0.25) { ctx.beginPath(); ctx.arc(x + (dxL + dxR) / 2, y, w * 0.5 * (1 - uiteen * 4), 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); }
  if (kin) [[PL, -1], [PR, 1]].forEach(([P, s]) => { const c = P[Math.round(cen * (P.length - 1))]; roundRect(ctx, c[0] + s * w * 0.45 - (s < 0 ? w * 0.32 : 0), c[1] - w * 0.55, w * 0.32, w * 1.1, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); });
  if (ringen > 0.01) { ctx.globalAlpha *= ringen; for (const u of [0.12, 0.25, 0.52, 0.7, 0.86]) { const i = Math.round(u * (PL.length - 1)); const p = PL[i], q = PR[i]; ctx.beginPath(); ctx.ellipse((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.abs(q[0] - p[0]) / 2 + w * 0.62, w * 0.22, 0, 0, 6.283); ctx.strokeStyle = C.grain; ctx.lineWidth = 2.2; ctx.stroke(); } }
  ctx.restore(); return { PL, PR };
}
// delende cel (Micro): rond/ovaal membraan dat in het midden insnoert; spoelfiguur met polen; rustige textuur
function cdCel(ctx, cx, cy, rx, ry, o = {}) {
  const { insnoer = 0, a = 1, polen = 0, kern = 0, seed = 3, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, c = Math.cos(an), s = Math.sin(an); const pinch = 1 - insnoer * 0.92 * Math.exp(-Math.pow(c / 0.32, 2)); const wob = 1 + 0.008 * Math.sin(an * 5 + t * 0.7 + seed);
    const X = cx + c * rx * wob, Y = cy + s * ry * pinch * wob; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); };
  pad(); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  ctx.save(); pad(); ctx.clip(); for (let i = 0; i < 160; i++) { const X = cx + (hash(i * 3 + seed) - 0.5) * rx * 2, Y = cy + (hash(i * 7 + seed) - 0.5) * ry * 2; ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); } ctx.restore();
  pad(); ctx.strokeStyle = C.er; ctx.lineWidth = 2.2; ctx.stroke(); ctx.save(); ctx.translate(cx, cy); ctx.scale(0.985, 0.975); ctx.translate(-cx, -cy); pad(); ctx.strokeStyle = rgba(C.er, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  ctx.restore();
}
function cdPool(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(CD.draad, 0.5); ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 10, y + Math.sin(an) * 10); ctx.lineTo(x + Math.cos(an) * 34, y + Math.sin(an) * 34); ctx.stroke(); }
  // centrosoom: twee centriolen haaks op elkaar
  roundRect(ctx, x - 9, y - 4, 18, 8, 3); shape(ctx, '#C9B896', '#E6D9B8', 1); roundRect(ctx, x - 4, y - 12, 8, 18, 3); shape(ctx, '#B8A57E', '#E6D9B8', 1); ctx.restore(); }
// trekdraad van pool naar een punt (licht gebogen)
function cdDraad(ctx, px, py, x, y, a = 1, kl = CD.draad, lw = 1.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + x) / 2, (py + y) / 2 + (y - py) * 0.12, x, y); ctx.stroke(); ctx.restore(); }

// MODELCEL 2n = 4: lang paar (len 1) en kort paar (len 0.62); per chromosoom: paar, kant (vader/moeder)
const MODEL4 = [{ p: 'L', k: 'vader' }, { p: 'L', k: 'moeder' }, { p: 'K', k: 'vader' }, { p: 'K', k: 'moeder' }];
const cdLen = (p, L) => (p === 'L' ? L : L * 0.62), cdCen = (p) => (p === 'L' ? 0.38 : 0.30);

// ÉÉN CHROMATIDE los (na de anafase, of in een geslachtscel): pad + kinetochoor aan de kant van de pool
function cdEen(ctx, x, y, len, o = {}) {
  const { w = 14, cen = 0.38, rot = 0, zwaai = 0, kant = 1, segs = null, kl = CD.vader, a = 1, kin = false } = o; if (a <= 0.01) return;
  const P = cdPad(x, y, len, rot, { cen, zwaai, kant }); cdChromatide(ctx, P, w, segs || [[0, 1, kl]], { a });
  if (kin) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - kant * w * 0.62 - w * 0.16, y - w * 0.5, w * 0.32, w, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); ctx.restore(); }
  return P;
}
// CONDENSEREN ALS MORPH (C8): dezelfde draad gaat van een losse kronkel (c = 0, chromatine) naar een opgerolde chromatide
// (c = 1). dubbel = twee zusterdraden naast elkaar (na de S-fase). Elk punt van de draad schuift naar een punt op de chromatide.
function _cdKronkel(n, seed, R) { const key = 'kr' + n + '_' + seed + '_' + Math.round(R); if (_bioPolyCache[key]) return _bioPolyCache[key];
  const P = []; let x = 0, y = -R * 0.6, an = hash(seed) * 6.283; for (let k = 0; k < n; k++) { an += (hash(seed * 31 + k * 7) - 0.5) * 1.6 + Math.sin(k * 0.5 + seed) * 0.25; const st = R * 0.11;
    let nx = x + Math.cos(an) * st, ny = y + Math.sin(an) * st; const d = Math.hypot(nx, ny); if (d > R) { an += Math.PI * 0.7; nx = x + Math.cos(an) * st; ny = y + Math.sin(an) * st; } x = nx; y = ny; P.push([x, y]); }
  _bioPolyCache[key] = P; return P; }
function cdKluwen(ctx, x, y, len, o = {}) {
  const { c = 0, dubbel = true, w = 16, cen = 0.38, rot = 0, kl = CD.vader, segsL = null, segsR = null, a = 1, seed = 1, R = len * 0.55, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  const e = ease(c), gap = w * 0.52;
  const doel = [cdPad(x - (dubbel ? gap : 0), y, len, rot, xv > 0 && dubbel ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen }), cdPad(x + gap, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen })];
  const n = doel[0].length, K = _cdKronkel(n, seed, R);
  const strengen = dubbel ? [0, 1] : [0];
  strengen.forEach(s => { const P = doel[s].map((q, k) => { const kx = x + K[k][0] + s * 5, ky = y + K[k][1] + s * 6; return [lerp(kx, q[0], e), lerp(ky, q[1], e)]; });
    const segs = (s ? segsR : segsL) || [[0, 1, kl]];
    if (e < 0.5) { ctx.save(); ctx.globalAlpha *= a; segs.forEach(([u0, u1, k2]) => { const i0 = Math.round(u0 * (n - 1)), i1 = Math.round(u1 * (n - 1)); dnaDraad(ctx, P.slice(i0, i1 + 1), { w: lerp(3, w * 0.5, e * 2), kleur: k2, donker: _cdk(k2) }); }); ctx.restore(); }
    else cdChromatide(ctx, P, lerp(w * 0.5, w, (e - 0.5) * 2), segs, { a, coils: e > 0.85 }); });
  if (e > 0.7 && dubbel) { ctx.save(); ctx.globalAlpha *= a * (e - 0.7) / 0.3; ctx.beginPath(); ctx.arc(x, y, w * 0.48, 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y + len * (0.5 - cen) * e, lerp(R * 1.05, w * 2.4, e), lerp(R * 1.05, len * 0.62, e), 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
// kernmembraan dat in blaasjes uiteenvalt (v 0 = heel, 1 = weg) of weer terugkomt
function cdKernmembraan(ctx, x, y, r, v = 0, a = 1) { if (a <= 0.01 || v >= 0.99) return; ctx.save(); ctx.globalAlpha *= a * (1 - v * 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.18 * (1 - v)); ctx.fill();
  const n = 26; for (const f of [1, 0.965]) for (let k = 0; k < n; k++) { const a0 = k / n * 6.283, len = (6.283 / n) * (1 - 0.15 - v * 0.7); const dr = v * 22 * (hash(k * 3) - 0.3);
    ctx.beginPath(); ctx.arc(x, y, r * f + dr, a0, a0 + len); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); }
  ctx.restore(); }
// teller rechtsboven: model en mens naast elkaar
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
// maximale zwaai zodat de armen van een losse chromatide de middellijn niet kruisen (afstand = centromeer tot middellijn)
function cdZwaaiMax(afstand, armLen, w) { return Math.asin(clamp((afstand - w * 0.75) / Math.max(1, armLen), 0, 1)) / 1.15; }

function _huidCirc(ctx, x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = fill; ctx.fill(); }
// ===================================================================================================
// HUID IN DOORSNEDE als blok (opperhuid, lederhuid, onderhuids bindweefsel), schematisch, niet op schaal.
// Eerst gebruikt: Uitscheiding en evenwicht 1.1, hoofdstuk De huid (26 okt 2026), door Kamiel gekeurd op het twijfelblad.
// Gebruik: huidBlok(ctx, X, Y, breedte, { t, vat, zweet, kip, focus, volg, isoleer, rood, bleek }) — hoogte = 0,875 × breedte.
// Vereist ook blob() uit lib.js.
// Recept (bronnen in bron/bronnen.md): opperhuid dun (dunne huid ± 0,1 mm), lederhuid 1–2 mm, onderhuids
// bindweefsel wisselend dik; hier vereenvoudigd tot ± 1 : 4 : 3,5 zodat de opperhuid zichtbaar blijft.
//  - opperhuid: hoornlaag = platte dode cellen zonder kern (bovenaan schilferend); daaronder levende lagen die
//    naar boven platter worden; kiemlaag = één rij cellen met kern op een golvende grens (lederhuidpapillen).
//    De opperhuid heeft geen bloedvaten: haarvatlussen stoppen in de papillen.
//  - lederhuid: bindweefsel (collageen golvend), oppervlakkig en diep vaatnet met haarvatlussen in de papillen;
//    haarzakje schuin, met talgklier aan de kant van het haarspiertje; haarspiertje van het haarzakje naar de
//    papillaire laag; zweetklier = kluwen diep in de lederhuid, buis kronkelt naar een porie; zintuigen:
//    vrije zenuwuiteinden (pijn, warmte, koude) tot in de opperhuid, tastlichaampje in een papil, druklichaampje diep.
//  - onderhuids bindweefsel: vetcellen als veelhoeken van wisselende grootte (geen raster van gelijke rondjes).
//  Bekende fouten: bloedvaten in de opperhuid; zweetklier die in het vet 'zwemt' zonder buis; talgklier los
//  van het haarzakje; haar dat recht omhoog uit een recht gat steekt; vet als effen gele laag.
// Ontwerpmaat 800 × 700; o.vat −1 (nauw) … 0 … 1 (wijd), o.zweet 0..1, o.kip 0..1 (kippenvel),
// o.focus = 'hoorn'|'kiem'|'opper'|'leder'|'vat'|'zweet'|'talg'|'haar'|'zin'|'vet'|null (de rest gaat naar 35 %).
// Geeft ankerpunten terug (schermcoördinaten) voor namen.
// ===================================================================================================
const HUIDK = { hoorn: '#E6CDB4', levend: '#C99A80', levendR: '#DDB59C', leder: '#5E4652', lederL: '#6E5260', collageen: '#B88A92',
  vet: '#CDBB86', vetR: '#DCCB9A', vetGrond: '#6B4B3E', slag: '#D9483E', ader: '#8E3A40', haar: '#3A2418', haarZak: '#A07862',
  talg: '#D9C27A', spier: '#B36A5E', buis: '#AFC0D0', zenuw: '#C9D2DE' };
function huidMix(a, b, u) { const p = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(u, 0, 1)).toString(16).padStart(2, '0')).join(''); }
const _huidVet = (() => { const out = []; let k = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { k++; const jx = (hash(k * 3.1) - 0.5) * 40, jy = (hash(k * 5.3) - 0.5) * 22;
  out.push([c * 92 + (r % 2) * 46 + 10 + jx, 492 + r * 50 + jy, 30 + hash(k * 7.7) * 16]); } return out; })();
function huidBlok(ctx, X, Y, w, o = {}) {
  const { a = 1, t = 0, vat = 0, zweet = 0, kip = 0, focus = null, rood = 0, bleek = 0, deel = 1, volg = 0, isoleer = 0 } = o; if (a <= 0.01) return {};
  const s = w / 800, D = (k) => (focus && focus !== k ? 0.35 : 1);
  ctx.save(); ctx.translate(X, Y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const bump = (x) => kip * 9 * Math.exp(-Math.pow((x - 262) / 34, 2));            // kippenvel: bultje rond de haaropening
  const top = (x) => 60 + Math.sin(x * 0.02) * 2 - bump(x);
  const bm = (x) => 150 - 16 * Math.pow(0.5 + 0.5 * Math.cos((x - 70) / 110 * 6.283), 2);   // grens opperhuid/lederhuid (papillen)
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 800, 700); ctx.clip();
  // ---- onderhuids bindweefsel met vet ----
  ctx.save(); ctx.globalAlpha *= D('vet'); ctx.fillStyle = HUIDK.vetGrond; ctx.fillRect(0, 470, 800, 230);
  for (const [cx, cy, r] of _huidVet) { blob(ctx, cx, cy, r * 1.1, r * 0.82, 0.08, cx * 0.1, 0); shape(ctx, HUIDK.vet, HUIDK.vetR, 2); }
  if (isoleer > 0.01) { ctx.globalAlpha *= isoleer; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(3, 472, 794, 225); }
  ctx.restore();
  // ---- lederhuid ----
  ctx.save(); ctx.globalAlpha *= D('leder') === 1 || ['vat', 'zweet', 'talg', 'haar', 'zin'].includes(focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, 470); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 470); ctx.closePath(); ctx.fillStyle = HUIDK.leder; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = HUIDK.lederL; ctx.beginPath(); ctx.moveTo(0, 230); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, bm(x)); ctx.lineTo(800, 230); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 12; i++) { const yy = 190 + i * 24, ph = hash(i * 7.1) * 6.28; ctx.strokeStyle = rgba(HUIDK.collageen, 0.22); ctx.lineWidth = 3; ctx.beginPath();
    for (let x = -10; x <= 810; x += 10) { const py = yy + Math.sin(x / 40 + ph) * 6; x === -10 ? ctx.moveTo(x, py) : ctx.lineTo(x, py); } ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // bloedvaten: diep vaatnet (y 430), oppervlakkig vaatnet (y 205) en haarvatlussen in elke papil
  const vr = vat >= 0 ? 1 + 1.3 * vat : 1 - 0.65 * -vat, flow = vat >= 0 ? 1 + vat : 1 + 0.7 * vat;
  ctx.save(); ctx.globalAlpha *= D('vat');
  const buis = (pts, r, col, n, sp) => { ctx.strokeStyle = col; ctx.lineWidth = 2 * r; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = rgba('#000000', 0.18); ctx.lineWidth = Math.max(1, 2 * r - 5); ctx.stroke();
    let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    for (let j = 0; j < n; j++) { let u = ((j / n + t * sp / L * 60) % 1) * L, i = 0; while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++; } const f = u / seg[i], px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f);
      ctx.beginPath(); ctx.ellipse(px, py, Math.min(r * 0.8, 6), Math.min(r * 0.5, 4), 0.4, 0, 6.283); ctx.fillStyle = '#E07A6A'; ctx.fill(); } };
  buis([[-10, 432], [800 + 10, 438]], 11, HUIDK.slag, 14, 1.2); buis([[810, 452], [-10, 455]], 13, HUIDK.ader, 12, 0.8);
  buis([[150, 440], [158, 330], [150, 212]], 6 * Math.sqrt(vr), HUIDK.slag, 4, 1.2 * flow); buis([[690, 212], [702, 330], [694, 448]], 7 * Math.sqrt(vr), HUIDK.ader, 4, 0.9 * flow);
  buis([[-10, 205], [810, 210]], 6 * vr, HUIDK.slag, Math.round(10 * Math.max(0.4, flow)), 1.3 * flow);
  for (let k = 0; k < 8; k++) { const px = 70 + k * 110; if (px > 800) break; const tp = bm(px) + 10, dx = 6; ctx.strokeStyle = huidMix(HUIDK.ader, HUIDK.slag, 0.5); ctx.lineWidth = 2 * Math.max(1.6, 3.4 * vr); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(px - dx, 210); ctx.lineTo(px - dx, tp + dx); ctx.arc(px, tp + dx, dx, Math.PI, 0); ctx.lineTo(px + dx, 210); ctx.stroke(); }
  ctx.restore();
  // zweetklier: kluwen diep in de lederhuid, buis kronkelt naar een porie
  ctx.save(); ctx.globalAlpha *= D('zweet');
  const kluwen = []; for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 6.283 * 3.2; kluwen.push([600 + Math.cos(an) * (16 + 12 * Math.sin(u * 9)), 452 + Math.sin(an) * (12 + 6 * Math.cos(u * 7)) - u * 6]); }
  const gang = [[600, 440], [592, 380], [606, 320], [596, 260], [608, 200], [600, bm(600) + 4]]; for (let yy = bm(600); yy >= top(612); yy -= 10) gang.push([606 + Math.sin(yy * 0.25) * 7, yy]); gang.push([610, top(610)]);
  const pad = kluwen.concat(gang); ctx.strokeStyle = HUIDK.buis; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pad.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = rgba(C.teal, 0.25 + 0.6 * zweet); ctx.lineWidth = 4; ctx.stroke();
  if (zweet > 0.01) { for (let j = 0; j < 7; j++) { const u = (j / 7 + t * 0.12) % 1, i = Math.floor(u * (pad.length - 1)); _huidCirc(ctx, pad[i][0], pad[i][1], 3.2, rgba(C.teal, zweet)); }
    const dr = 4 + 10 * zweet; ctx.beginPath(); ctx.ellipse(610, top(610) - dr * 0.55, dr, dr * 0.65, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.75), lighten(C.teal, 0.3), 1.5); }
  ctx.restore();
  // haarzakje met haar, talgklier en haarspiertje
  const oX = 262, oY = top(262), bX = 340, bY = 468; const ang = lerp(0.42, 1.25, kip);   // hoek van het haar boven de huid t.o.v. het oppervlak
  ctx.save(); ctx.globalAlpha *= D('haar');
  ctx.strokeStyle = HUIDK.haarZak; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(oX + 4, oY + 14); ctx.lineTo(bX, bY - 14); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(bX + 2, bY - 4, 22, 18, 0.2, 0, 6.283); ctx.fillStyle = HUIDK.haarZak; ctx.fill();
  ctx.strokeStyle = HUIDK.haar; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bX, bY - 8); ctx.lineTo(oX, oY); ctx.lineTo(oX - Math.cos(ang) * 120, oY - Math.sin(ang) * 120); ctx.stroke();
  ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('talg'); for (const [dx, dy, r] of [[34, 150, 17], [44, 172, 15], [30, 190, 13]]) { blob(ctx, oX + dx + 10, oY + dy - 40, r, r * 0.8, 0.1, dx, 0); shape(ctx, HUIDK.talg, lighten(HUIDK.talg, 0.25), 1.5); } ctx.restore();
  ctx.save(); ctx.globalAlpha *= D('haar'); const mA = [lerp(oX, bX, 0.55) + 10, lerp(oY, bY, 0.55)], mB = [372, bm(372) + 6];
  ctx.strokeStyle = huidMix(HUIDK.spier, '#E8A090', kip); ctx.lineWidth = 11 + 9 * kip; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mA[0], mA[1]); ctx.quadraticCurveTo(lerp(mA[0], mB[0], 0.5) + 12 * (1 - kip), lerp(mA[1], mB[1], 0.5), mB[0], mB[1]); ctx.stroke(); ctx.restore();
  // zintuigen: vrije zenuwuiteinden, tastlichaampje (papil), druklichaampje (diep)
  const zc = focus === 'zin' ? C.teal : HUIDK.zenuw;
  ctx.save(); ctx.globalAlpha *= D('zin'); ctx.strokeStyle = zc; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(470, 470); ctx.bezierCurveTo(480, 360, 460, 260, 476, 170); ctx.stroke();
  for (const [ex, ey] of [[452, 112], [478, 104], [500, 118]]) { ctx.beginPath(); ctx.moveTo(476, 170); ctx.quadraticCurveTo((476 + ex) / 2 + 6, (170 + ey) / 2, ex, ey); ctx.stroke(); }
  const mx = 510, my = bm(510) + 12; ctx.beginPath(); ctx.moveTo(476, 230); ctx.quadraticCurveTo(500, 200, mx, my + 10); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(mx, my, 7, 13, 0, 0, 6.283); shape(ctx, rgba(zc, 0.35), zc, 2); for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(mx - 6, my + k * 6); ctx.lineTo(mx + 6, my + k * 6); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(470, 450); ctx.quadraticCurveTo(640, 470, 720, 420); ctx.stroke();
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(738, 410, 26 - k * 6, 15 - k * 3.4, -0.4, 0, 6.283); shape(ctx, k === 0 ? rgba(zc, 0.18) : 'rgba(0,0,0,0)', zc, 2); }
  ctx.restore();
  // ---- opperhuid ----
  ctx.save(); const fo = (focus === 'opper' || focus === 'hoorn' || focus === 'kiem' || !focus) ? 1 : 0.35;
  ctx.beginPath(); ctx.moveTo(0, top(0)); for (let x = 0; x <= 800; x += 4) ctx.lineTo(x, top(x)); for (let x = 800; x >= 0; x -= 4) ctx.lineTo(x, bm(x)); ctx.closePath();
  ctx.save(); ctx.globalAlpha *= fo; ctx.fillStyle = huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek); ctx.fill(); ctx.clip();
  // levende lagen: cellen in rijen, naar boven platter; kiemlaag = onderste rij met kern
  const kiemF = focus === 'kiem' ? 1 : (focus === 'hoorn' ? 0.35 : 1), hoornF = focus === 'kiem' ? 0.35 : 1;
  for (let r = 0; r < 5; r++) { const hgt = [13, 12, 11, 9, 7][r], wid = [15, 18, 21, 25, 30][r];
    ctx.save(); ctx.globalAlpha *= r === 0 ? kiemF : (focus === 'hoorn' || focus === 'kiem' ? 0.5 : 1);
    for (let x = -10 + (r % 2) * wid / 2; x < 810; x += wid) { const yb = bm(x) - 8 - r * (hgt + 4) * lerp(1, 0.75, r / 4); if (yb < top(x) + 26) continue;
      roundRect(ctx, x - wid / 2 + 1.5, yb - hgt / 2, wid - 3, hgt, 4); shape(ctx, huidMix(huidMix(HUIDK.levend, '#E07A5F', 0.45 * rood), '#D8D2CC', 0.5 * bleek), HUIDK.levendR, 1.2);
      if (r < 3) { ctx.beginPath(); ctx.ellipse(x, yb, Math.min(4.5, wid * 0.22), Math.min(4, hgt * 0.3), 0, 0, 6.283); ctx.fillStyle = r === 0 ? C.kern : rgba(C.kern, 0.6); ctx.fill(); } }
    ctx.restore(); }
  // één cel volgen (goud): ontstaat in de kiemlaag door deling, schuift omhoog, wordt plat en verliest de kern
  if (volg > 0.01) { const vx = 400, u = (t * 0.07) % 1, y0 = bm(vx) - 8, y1 = top(vx) + 8, yy = lerp(y0, y1, ease(u)); const fl = lerp(1, 0.25, u), wd = lerp(16, 34, u);
    ctx.save(); ctx.globalAlpha *= volg; roundRect(ctx, vx - wd / 2, yy - 7 * fl - 2, wd, 14 * fl + 4, 4); shape(ctx, u > 0.8 ? HUIDK.hoorn : HUIDK.levend, C.goud, 2.5);
    if (u < 0.65) { ctx.beginPath(); ctx.ellipse(vx, yy, 4.5, 4 * fl + 0.5, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 1 - u / 0.65); ctx.fill(); }
    const dv = clamp((u - 0.0) / 0.12, 0, 1); if (dv < 1) { ctx.globalAlpha *= 1 - dv; roundRect(ctx, vx - 8 + dv * 16, y0 - 7, 16, 14, 4); shape(ctx, HUIDK.levend, C.goud, 2); ctx.beginPath(); ctx.ellipse(vx + dv * 16, y0, 4.5, 4, 0, 0, 6.283); ctx.fillStyle = C.kern; ctx.fill(); }
    ctx.restore(); }
  ctx.restore();
  // hoornlaag: platte dode cellen zonder kern, bovenste schilferen af
  ctx.save(); ctx.globalAlpha *= fo * hoornF; for (let r = 0; r < 4; r++) for (let x = -20 + r * 13; x < 820; x += 46) { const yy = top(x) + 3 + r * 5.5; roundRect(ctx, x, yy, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, lighten(HUIDK.hoorn, 0.2), 1); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.05 + k / 3) % 1, fx = 120 + k * 250 + u * 30, fy = top(fx) + 2 - u * 34; ctx.save(); ctx.globalAlpha *= (1 - u) * 0.9; ctx.translate(fx, fy); ctx.rotate(-0.3 * u); roundRect(ctx, -20, -2, 40, 4.5, 2.2); shape(ctx, HUIDK.hoorn, null); ctx.restore(); }
  ctx.restore();
  ctx.restore();
  ctx.restore();
  // rand van het blok
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1.5 / s; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 700); ctx.lineTo(800, 700); ctx.lineTo(800, 60); ctx.stroke();
  ctx.restore();
  const P = (x, y) => [X + x * s, Y + y * s];
  return { X, Y, P, s, oppTop: Y + 60 * s, oppBot: Y + 150 * s, lederBot: Y + 470 * s, bot: Y + 700 * s, right: X + w, hoorn: P(40, 66), kiem: P(40, 140), vat: P(150, 330), vatOpp: P(20, 205), zweet: P(600, 452), porie: P(610, 50),
    talg: P(305, 170), haar: P(338, 470), haarTop: P(262, 40), spier: P(372, 220), tast: P(510, 140), vrij: P(478, 104), druk: P(738, 410), vet: P(400, 590) };
}
// ===================== Zenuwstelsel 9 · Spieren en beweging (26 okt 2026, prompt v10) =====================
// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — nieuwe tekeningen (ronde 1, 26 okt 2026), kandidaat voor bibliotheek/lib_bio.js
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape, circ), lib_bio.js (BIO, _mixHex).
// Maten in cm (arm) of µm (sarcomeer) met een schaal s = px per eenheid. Bronnen: OpenStax A&P 2e h. 6, 9, 10, 11; Gray's (via StatPearls).
// =====================================================================================
const Z9 = { bot: '#E6DCC6', botS: '#B8AC92', botR: '#CFC3A8', kraak: '#BFD8E4', kraakR: '#E4F0F6', pees: '#E9E3D2', peesR: '#C9C0A8',
  spier: '#B55A50', spierL: '#D98A7E', spierD: '#8E3F38', smeer: '#5BA4C9', kapsel: '#9AA3B2', merg: '#C2453E', mergG: '#D9BC6A',
  actine: '#5BA4C9', myosine: '#C9A35C', zlijn: '#F2F2EE', zenuw: '#B79AE6', ca: '#E0B64A' };

// --- hulpjes: lokaal botframe → wereld. Lokale y langs de botas (van proximaal naar distaal), lokale x naar voren (anterieur).
function z9Frame(ox, oy, ang, s) { const c = Math.cos(ang), n = Math.sin(ang);
  return (lx, ly) => [ox + s * (lx * c + ly * n), oy + s * (-lx * n + ly * c)]; }
function z9Pad(ctx, pts, dicht = true) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (dicht) ctx.closePath(); }
function z9Glad(ctx, pts, dicht = true) { // Catmull-Rom door de punten
  const n = pts.length; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  const g = (i) => pts[dicht ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < (dicht ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
// spoelvormige spierbuik tussen A en B (wereld), dikte w (px), bol naar kant 'zij' (+1/-1 t.o.v. de richting A→B), met vezellijnen
function z9Buik(ctx, A, B, w, zij, o = {}) { const { a = 1, kleur = Z9.spier, rand = Z9.spierL, vezels = 4, bol = 0.35 } = o; if (a <= 0.01) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = uy * zij, py = -ux * zij, N = 24, l = [], r = [];
  for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof;
    const hw = w / 2 * prof + 1.5; l.push([mx + px * hw, my + py * hw]); r.push([mx - px * hw, my - py * hw]); }
  ctx.save(); ctx.globalAlpha *= a; z9Glad(ctx, l.concat(r.reverse()), true); shape(ctx, kleur, rand, 1.5);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5A2A26', 0.35); ctx.lineWidth = 1.5;
  for (let k = 1; k < vezels; k++) { const f = k / vezels - 0.5; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof, hw = w * prof * f;
      i ? ctx.lineTo(mx + px * hw, my + py * hw) : ctx.moveTo(mx + px * hw, my + py * hw); } ctx.stroke(); }
  ctx.restore(); ctx.restore(); }
function z9Pees(ctx, pts, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#7E7462'; ctx.lineWidth = w + 3.5; z9Glad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = '#FAF7EE'; ctx.lineWidth = w; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }

// =====================================================================================
// ARM VAN OPZIJ (rechterarm, kijkt naar +x): schouderblad, opperarmbeen, ellepijp, spaakbeen, biceps, triceps met pezen.
// Recept (bronnen B: OpenStax A&P 2e 8.2 en 11.5; StatPearls Biceps/Triceps): opperarmbeen ± 31 cm, ellepijp ± 26 cm,
// spaakbeen ± 24 cm. Biceps: twee koppen vanaf het schouderblad (lange kop over de kop van het opperarmbeen, korte kop vanaf
// het ravenbekuitsteeksel), pees op de knobbel van het spaakbeen ± 3 cm onder het elleboogscharnier, vóór het scharnier.
// Triceps: lange kop vanaf het schouderblad onder de kom, twee koppen langs de achterkant van het opperarmbeen, pees op het
// olecranon (uitsteeksel van de ellepijp), achter het scharnier. Vereenvoudigd: geen deltaspier, geen m. brachialis.
// Bekende fouten: biceps-pees op de ellepijp; triceps vóór het scharnier; spieren die bij buigen even lang blijven.
// u = hoek opperarm vanaf recht omlaag (naar voren +), e = buighoek elleboog (0 = gestrekt). c = spanning biceps 0..1, ct = triceps.
// =====================================================================================
function armAnatomie(ctx, sx, sy, s, o = {}) {
  const { u = 0, e = 0, a = 1, c = null, ct = null, hl = {}, dim = [], skelet = 1, spieren = 1, hand = 1, t = 0 } = o; if (a <= 0.01) return {};
  const cb = c == null ? clamp(e / 1.6, 0, 1) : c, ctr = ct == null ? clamp(1 - e / 1.2, 0, 1) * 0.6 : ct;
  const Up = z9Frame(sx, sy, u, s), E = Up(0, 30), Fo = z9Frame(E[0], E[1], u + e, s);
  const D = (k) => (dim.includes(k) ? 0.3 : 1) * (hl[k] != null ? 1 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (o.huid) { ctx.save(); ctx.globalAlpha *= o.huid; const sk = [Up(-4.6, 2), Up(-5.2, 12), Up(-4.4, 24), Up(-3.6, 29), Fo(-3.0, 1.5), Fo(-2.4, 8), Fo(-1.6, 22), Fo(-1.3, 25.5), Fo(2.6, 25.5), Fo(3.0, 18), Fo(3.4, 6), Up(4.4, 29), Up(5.2, 18), Up(4.4, 6), Up(3.6, -2), Up(-2.0, -4.5)]; z9Glad(ctx, sk, true); shape(ctx, rgba(BIO.huid, 0.16), rgba(BIO.huid, 0.75), 2); ctx.restore(); }
  // schouderblad (staat stil; vereenvoudigd vlak van opzij met kom, acromion en ravenbek)
  ctx.save(); ctx.globalAlpha *= 0.85 * skelet * D('schouderblad');
  const S = (x, y) => [sx + x * s, sy + y * s];
  z9Glad(ctx, [S(-2.2, -3.2), S(-6.5, -4.6), S(-11, -2.5), S(-13, 4), S(-11.5, 11), S(-8, 13.5), S(-4.5, 7), S(-2.6, 2.4), S(-1.8, -1.2)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [S(-3, -4.4), S(0.6, -5.4), S(2.8, -4.6), S(1.6, -3.4), S(-1.8, -3.3)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // acromion
  z9Glad(ctx, [S(-1.2, -2.9), S(1.8, -2.6), S(2.6, -1.6), S(1.6, -1.2), S(-0.8, -1.9)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // ravenbekuitsteeksel
  ctx.restore();
  // opperarmbeen
  ctx.save(); ctx.globalAlpha *= skelet * D('opperarm');
  z9Glad(ctx, [Up(-1.6, 1.8), Up(-1.25, 8), Up(-1.1, 18), Up(-1.5, 25), Up(-2.1, 28.4), Up(-1.6, 30.8), Up(0, 31.6), Up(1.5, 30.8), Up(1.9, 28.3), Up(1.2, 25), Up(0.95, 18), Up(1.05, 8), Up(1.6, 1.6)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  const K = Up(-0.2, -0.1); circ(ctx, K[0], K[1], 2.35 * s, Z9.bot, Z9.botS, 1.5); // kop
  ctx.restore();
  // onderarm: ellepijp (achter, met olecranon) en spaakbeen (voor)
  ctx.save(); ctx.globalAlpha *= skelet * D('onderarm');
  z9Glad(ctx, [Fo(-1.3, -2.6), Fo(-2.1, -1.4), Fo(-1.7, 1.2), Fo(-1.0, 6), Fo(-0.8, 15), Fo(-0.75, 24.5), Fo(-0.1, 25.4), Fo(0.1, 24.3), Fo(-0.05, 15), Fo(0.1, 6), Fo(0.4, 1.5), Fo(0.1, -0.6), Fo(-0.6, -1.4)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [Fo(0.25, 0.9), Fo(1.25, 0.8), Fo(1.4, 2.4), Fo(1.65, 3.3), Fo(1.25, 6), Fo(1.2, 14), Fo(1.7, 22), Fo(1.9, 24.6), Fo(0.4, 24.9), Fo(0.35, 22), Fo(0.45, 14), Fo(0.45, 6), Fo(0.3, 2.4)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore();
  // hand (vereenvoudigd: middenhand en vingers als vlak in huidkleur, half doorzichtig)
  if (hand > 0.01) { ctx.save(); ctx.globalAlpha *= 0.85 * hand; z9Glad(ctx, [Fo(-0.9, 24.8), Fo(2.2, 24.8), Fo(2.6, 29), Fo(2.1, 34.5), Fo(0.8, 37), Fo(-0.3, 35.5), Fo(-1.2, 31), Fo(-1.4, 27.5)], true); shape(ctx, _mixHex(BIO.huid, '#1A2740', 0.25), BIO.huidS, 1.2); z9Glad(ctx, [Fo(1.6, 25.2), Fo(3.4, 27.2), Fo(3.9, 30.2), Fo(3.0, 30.6), Fo(1.9, 28.4)], true); shape(ctx, _mixHex(BIO.huid, '#1A2740', 0.25), BIO.huidS, 1.2); ctx.strokeStyle = BIO.huidS; ctx.lineWidth = 1; for (const k of [0.2, 0.9, 1.6]) { const p1 = Fo(k - 0.4, 31.5), p2 = Fo(k - 0.2, 35.5); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); } ctx.restore(); }
  // spieren
  const R = {}; ctx.save(); ctx.globalAlpha *= spieren;
  // triceps (achter): buik van y 4 tot ± 25, pees naar het olecranon; lange kop naar onder de schouderkom
  { const aT = D('triceps'), wT = (4.2 + 1.0 * ctr) * s, A = Up(-1.3, 3.5), B = Up(-1.6, 25.5 - 1.5 * ctr);
    z9Pees(ctx, [Up(-1.1, -1.7), Up(-1.8, 0.8), Up(-2.0, 3.8)], 0.4 * s, aT);
    z9Buik(ctx, A, B, wT, -1, { a: aT, bol: 0.55 }); z9Pees(ctx, [B, Up(-2.7, 28.0), Up(-2.9, 30.2), Fo(-1.6, -2.3)], 0.75 * s, aT);
    if (hl.triceps) { ctx.save(); ctx.globalAlpha *= hl.triceps; ctx.setLineDash([]); z9Buik(ctx, A, B, wT, -1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.45 }); ctx.restore(); }
    R.triceps = Up(-1.5 - 0.75 * wT / s, 14); }
  // biceps (voor): buik van y 9 tot ± 23, korter en dikker bij spanning; pees naar de knobbel van het spaakbeen
  { const aB = D('biceps'), wB = (3.4 + 1.8 * cb) * s, A = Up(1.25, 7.5 + 1.2 * cb), B = Up(1.8, 25.0 - 2.4 * cb);
    z9Pees(ctx, [Up(0.6, -2.3), Up(1.6, -1.4), Up(2.0, 3), Up(1.9, 7.8 + 1.2 * cb)], 0.32 * s, aB); // lange kop over de kop van het opperarmbeen
    z9Pees(ctx, [Up(2.2, -1.8), Up(2.5, 2.5), Up(2.0, 7.8 + 1.2 * cb)], 0.32 * s, aB * 0.8); // korte kop vanaf het ravenbekuitsteeksel
    z9Buik(ctx, A, B, wB, 1, { a: aB, bol: 0.6 }); const T = Fo(1.5, 3.2); z9Pees(ctx, [B, Up(2.5, 27.4 - cb), Up(2.7, 29.6), T], 0.75 * s, aB);
    if (hl.biceps) { ctx.save(); ctx.globalAlpha *= hl.biceps; z9Buik(ctx, A, B, wB, 1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.5 }); ctx.restore(); }
    R.biceps = Up(1.3 + 0.85 * wB / s, 16); R.bicepsPees = T; }
  ctx.restore();
  ctx.restore();
  R.schouder = [sx, sy]; R.elleboog = E; R.hand = Fo(0.6, 31); R.olecranon = Fo(-1.7, -2.2); R.opperarm = Up(0, 15); R.onderarm = Fo(0.4, 13); R.Up = Up; R.Fo = Fo;
  return R;
}

// =====================================================================================
// GEWRICHT IN DOORSNEDE (schouder, kogelgewricht; van voren in een frontale snede). Recept (OpenStax A&P 9.4):
// gewrichtskop en -kom bekleed met kraakbeen (glad, zonder bloedvaten), gewrichtsholte met een dun laagje gewrichtssmeer,
// gewrichtskapsel als mouw van bindweefsel van bot naar bot, gewrichtsbanden als verdikkingen buiten het kapsel.
// Bekende fouten: kraakbeen als losse schijf; holte als grote lege ruimte; kapsel dat niet aan het bot vastzit.
// draai = hoek van het opperarmbeen (rad), hl = { kop, kom, kraakbeen, kapsel, smeer, banden }.
// =====================================================================================
function gewrichtDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, draai = 0, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.3 + 0.7 * (hl[k] == null ? 1 : hl[k]);
  const R = 2.4 * s, gap = 0.07 * R, kb = 0.1 * R, cup = 0.95; // straal kop (± 2,4 cm), spleet, kraakbeendikte, halve openingshoek kom
  const spons = (cx, cy, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = hash(i + seed) * 6.283, rr = Math.sqrt(hash(i * 3 + seed)); circ(ctx, cx + Math.cos(an) * rr * rx, cy + Math.sin(an) * rr * ry, 1.4 + hash(i + 7 + seed) * 2.6, rgba(Z9.botS, 0.55)); } };
  // schouderblad met kom (links)
  const r2 = R + gap + kb; ctx.save(); ctx.globalAlpha *= L('kom');
  ctx.beginPath(); ctx.moveTo(Math.cos(Math.PI - cup) * r2 - 0.25 * R, -Math.sin(Math.PI - cup) * r2 - 0.25 * R); ctx.lineTo(-2.6 * R, -1.6 * R); ctx.lineTo(-2.9 * R, 1.9 * R); ctx.lineTo(Math.cos(Math.PI + cup) * r2 - 0.25 * R, -Math.sin(Math.PI + cup) * r2 + 0.25 * R);
  ctx.lineTo(Math.cos(Math.PI + cup) * r2, -Math.sin(Math.PI + cup) * r2); ctx.arc(0, 0, r2, Math.PI - cup, Math.PI + cup, false); ctx.closePath(); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.save(); ctx.clip(); spons(-1.9 * R, 0, 0.9 * R, 1.5 * R, 90, 3); ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R + gap + kb, Math.PI - cup, Math.PI + cup, false); ctx.arc(0, 0, R + gap, Math.PI + cup, Math.PI - cup, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // gewrichtssmeer: dun laagje in de spleet, met twee zakjes binnen het kapsel
  ctx.save(); ctx.globalAlpha *= L('smeer'); ctx.beginPath(); ctx.arc(0, 0, R + gap, Math.PI - cup - 0.15, Math.PI + cup + 0.15, false); ctx.arc(0, 0, R, Math.PI + cup + 0.15, Math.PI - cup - 0.15, true); ctx.closePath(); ctx.fillStyle = rgba(Z9.smeer, 0.9); ctx.fill();
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-0.42 * R, sg * 1.02 * R, 0.3 * R, 0.1 * R, sg * 0.5, 0, 6.283); ctx.fillStyle = rgba(Z9.smeer, 0.75); ctx.fill(); } ctx.restore();
  // opperarmbeen: kop + hals + schacht, draait om het middelpunt van de kop
  ctx.save(); ctx.rotate(draai); ctx.globalAlpha *= L('kop'); const sa = 1.05, sw = 0.55 * R; // schachtrichting (rad onder de horizontaal), halve breedte
  const ux = Math.cos(sa), uy = Math.sin(sa), nx = -uy, ny = ux, b0 = [0.35 * R * ux, 0.35 * R * uy], b1 = [b0[0] + 3.6 * R * ux, b0[1] + 3.6 * R * uy];
  const hum = () => { ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.moveTo(b0[0] - nx * sw * 1.45, b0[1] - ny * sw * 1.45); ctx.lineTo(b1[0] - nx * sw, b1[1] - ny * sw); ctx.lineTo(b1[0] + nx * sw, b1[1] + ny * sw); ctx.lineTo(b0[0] + nx * sw * 1.7, b0[1] + ny * sw * 1.7); ctx.closePath(); };
  hum(); ctx.strokeStyle = Z9.botS; ctx.lineWidth = 3; ctx.stroke(); hum(); ctx.fillStyle = Z9.bot; ctx.fill('nonzero');
  hum(); ctx.save(); ctx.clip(); spons(0.15 * R, 0.15 * R, 0.85 * R, 0.85 * R, 110, 9); ctx.beginPath(); ctx.moveTo(b0[0] + ux * R * 0.9, b0[1] + uy * R * 0.9); ctx.lineTo(b1[0], b1[1]); ctx.strokeStyle = rgba(Z9.mergG, 0.9); ctx.lineWidth = sw * 0.9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  ctx.globalAlpha /= L('kop'); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R, Math.PI - cup - 0.35, Math.PI + cup + 0.35, false); ctx.arc(0, 0, R - kb, Math.PI + cup + 0.35, Math.PI - cup - 0.35, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1);
  ctx.restore();
  // kapsel: mouw van de rand van de kom naar de hals (boven en onder)
  const rot = (px, py) => [px * Math.cos(draai) - py * Math.sin(draai), px * Math.sin(draai) + py * Math.cos(draai)];
  ctx.save(); ctx.globalAlpha *= L('kapsel'); ctx.strokeStyle = Z9.kapsel; ctx.lineWidth = 0.13 * R; ctx.lineCap = 'round';
  const kb1 = [Math.cos(Math.PI - cup) * r2 - 0.1 * R, -Math.sin(Math.PI - cup) * r2 - 0.12 * R], ke1 = rot(0.55 * R, -1.18 * R), kb2 = [Math.cos(Math.PI + cup) * r2 - 0.1 * R, -Math.sin(Math.PI + cup) * r2 + 0.12 * R], ke2 = rot(-0.15 * R, 1.35 * R);
  ctx.beginPath(); ctx.moveTo(kb1[0], kb1[1]); ctx.bezierCurveTo(-0.5 * R, -1.45 * R, 0.1 * R, -1.5 * R, ke1[0], ke1[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kb2[0], kb2[1]); ctx.bezierCurveTo(-0.6 * R, 1.45 * R, -0.35 * R, 1.6 * R, ke2[0], ke2[1]); ctx.stroke(); ctx.restore();
  // banden: verdikkingen aan de buitenkant van het kapsel
  ctx.save(); ctx.globalAlpha *= L('banden'); ctx.strokeStyle = Z9.pees; ctx.lineWidth = 0.07 * R; ctx.lineCap = 'round';
  for (const d of [0.12, 0.24]) { ctx.beginPath(); ctx.moveTo(kb1[0] - 0.1 * R, kb1[1] - d * R); ctx.bezierCurveTo(-0.5 * R, -(1.45 + d) * R, 0.1 * R, -(1.5 + d) * R, ke1[0] + 0.1 * R, ke1[1] - d * R); ctx.stroke(); } ctx.restore();
  ctx.restore();
  return { kop: [x + 0.35 * R, y], kom: [x - 1.9 * R, y + 0.2 * R], kraakbeen: [x - 1.1 * R, y - 0.75 * R], smeer: [x - 0.42 * R, y + 1.02 * R], kapsel: [x - 0.3 * R, y - 1.45 * R], banden: [x - 0.1 * R, y - 1.85 * R], R };
}
// =====================================================================================
// BOT IN LENGTEDOORSNEDE (pijpbeen, bv. opperarmbeen). Recept (OpenStax A&P 6.3): wand van compact bot, uiteinden met
// sponsachtig bot en rood beenmerg, holte in de schacht met (bij volwassenen) geel beenmerg, beenvlies om de buitenkant,
// bloedvat dat door een gaatje naar binnen gaat, kraakbeen op de gewrichtsvlakken.
// =====================================================================================
function botDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, hl = {}, len = 30, rood = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.35 + 0.65 * (hl[k] == null ? 1 : hl[k]);
  const w = 1.25 * s, k1 = 2.6 * s, H = len * s / 2; // halve schachtbreedte, straal uiteinde
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(-w, -H + k1 * 1.4); ctx.bezierCurveTo(-w * 1.4, -H + k1 * 0.8, -k1, -H + k1 * 0.6, -k1, -H); ctx.arc(0, -H, k1, Math.PI, 0); ctx.bezierCurveTo(k1, -H + k1 * 0.6, w * 1.4, -H + k1 * 0.8, w, -H + k1 * 1.4);
    ctx.lineTo(w, H - k1 * 1.4); ctx.bezierCurveTo(w * 1.4, H - k1 * 0.8, k1 * 1.1, H - k1 * 0.5, k1 * 1.05, H); ctx.arc(0, H, k1 * 1.05, 0, Math.PI); ctx.bezierCurveTo(-k1 * 1.1, H - k1 * 0.5, -w * 1.4, H - k1 * 0.8, -w, H - k1 * 1.4); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= L('bot'); omtrek(); shape(ctx, Z9.bot, Z9.botS, 1.5); ctx.restore();
  ctx.save(); omtrek(); ctx.clip();
  // sponsachtig bot met rood beenmerg in de uiteinden
  ctx.save(); ctx.globalAlpha *= L('rood'); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * (H - 0.15 * s), k1 * 0.86, k1 * 1.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(Z9.merg, '#E6DCC6', 1 - 0.75 * rood); ctx.fill();
    for (let i = 0; i < 90; i++) { const px = (hash(i + sg * 7) - 0.5) * k1 * 1.6, py = sg * (H - 0.15 * s) + (hash(i * 3 + sg) - 0.5) * k1 * 2.8; circ(ctx, px, py, 2 + hash(i + 11) * 3, Z9.botR); } } ctx.restore();
  // mergholte met geel beenmerg in de schacht
  ctx.save(); ctx.globalAlpha *= L('geel'); roundRect(ctx, -w * 0.62, -H + k1 * 1.3, w * 1.24, 2 * H - k1 * 2.6, w * 0.5); ctx.fillStyle = Z9.mergG; ctx.fill(); ctx.restore();
  ctx.restore();
  // kraakbeen op het gewrichtsvlak
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, -H, k1, Math.PI + 0.25, -0.25); ctx.arc(0, -H, k1 - 0.3 * s, -0.25, Math.PI + 0.25, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // beenvlies + bloedvat dat naar binnen gaat
  ctx.save(); ctx.globalAlpha *= L('vlies'); ctx.strokeStyle = rgba('#C9B896', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w - 2.5, -H + k1 * 1.5); ctx.lineTo(-w - 2.5, H - k1 * 1.5); ctx.moveTo(w + 2.5, -H + k1 * 1.5); ctx.lineTo(w + 2.5, H - k1 * 1.5); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('bloedvat'); ctx.strokeStyle = BIO.bloed; ctx.lineWidth = 0.28 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(w + 2.2 * s, -0.2 * H); ctx.quadraticCurveTo(w + 0.6 * s, -0.1 * H, w - 0.2 * s, 0); ctx.quadraticCurveTo(0, 0.12 * H, -0.3 * s, 0.6 * H); ctx.moveTo(-0.1 * s, 0.05 * H); ctx.quadraticCurveTo(0.2 * s, -0.3 * H, 0, -0.7 * H); ctx.stroke(); ctx.restore();
  ctx.restore();
  return { rood: [x, y - H], geel: [x, y + 0.1 * H], kraakbeen: [x, y - H - k1], bloedvat: [x + w + 1.4 * s, y - 0.18 * H], vlies: [x - w - 3, y + 0.4 * H], wand: [x + w, y + 0.35 * H] };
}
// botcellen in kalk (zoomcirkel): ringen van kalk rond een kanaaltje met bloedvat, botcellen met uitlopers in de ringen
function botWeefsel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#D9CFB6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const centra = [[-0.35, -0.3], [0.42, -0.2], [0, 0.45], [-0.6, 0.5], [0.75, 0.55], [-0.05, -0.85], [0.8, -0.8]];
  centra.forEach(([cx0, cy0], j) => { const cx = x + cx0 * r, cy = y + cy0 * r, R0 = r * 0.36;
    for (let k = 5; k >= 1; k--) { ctx.beginPath(); ctx.arc(cx, cy, R0 * k / 5, 0, 6.283); ctx.strokeStyle = rgba('#A89A7A', 0.7); ctx.lineWidth = 1.2; ctx.stroke(); }
    circ(ctx, cx, cy, R0 * 0.16, '#3A2A2A'); circ(ctx, cx, cy, R0 * 0.07, rgba(BIO.bloed, levend)); // kanaal met bloedvat
    for (let i = 0; i < 9; i++) { const an = i * 0.7 + j, rr = R0 * (0.4 + 0.5 * hash(i + j * 9)), bx = cx + Math.cos(an) * rr, by = cy + Math.sin(an) * rr;
      ctx.save(); ctx.globalAlpha *= levend; ctx.strokeStyle = rgba(BIO.kern, 0.7); ctx.lineWidth = 1; for (let q = 0; q < 4; q++) { const aq = an + q * 1.57 + 0.4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(aq) * R0 * 0.12, by + Math.sin(aq) * R0 * 0.12); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(bx, by, R0 * 0.07, R0 * 0.04, an + 1.57, 0, 6.283); shape(ctx, BIO.kern, BIO.kernL, 1); ctx.restore(); } });
  ctx.restore(); }

// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// =====================================================================================
function sarcomeer(ctx, x, y, s, o = {}) { const { L = 2.5, a = 1, rijen = 4, kop = 0, hl = {}, volg = false, tropo = 0, t = 0, dz = 0.42 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hz = L / 2 * s, act = 1.0 * s, myo = 0.8 * s, gapY = dz * s, top = y - (rijen - 0.5) * gapY / 2 * 2 / 2 * 1;
  const ys = [...Array(rijen)].map((_, i) => y + (i - (rijen - 1) / 2) * gapY);
  // Z-lijnen
  for (const sg of [-1, 1]) { ctx.strokeStyle = Z9.zlijn; ctx.lineWidth = Math.max(2, 0.03 * s); ctx.beginPath(); const zx = x + sg * hz;
    for (let k = 0; k <= 8; k++) { const yy = ys[0] - gapY * 0.6 + k * (ys[ys.length - 1] - ys[0] + gapY * 1.2) / 8; k ? ctx.lineTo(zx + (k % 2 ? 4 : -4), yy) : ctx.moveTo(zx, yy); } ctx.stroke(); }
  // actine: van elke Z-lijn naar binnen, tussen de myosinerijen (boven en onder elke rij)
  const actYs = []; for (let i = 0; i <= rijen; i++) actYs.push(ys[0] - gapY / 2 + i * gapY);
  ctx.save(); ctx.globalAlpha *= hl.actine != null ? 0.35 + 0.65 * hl.actine : 1;
  for (const ay of actYs) for (const sg of [-1, 1]) { const x0 = x + sg * hz, x1 = x0 - sg * act;
    ctx.strokeStyle = Z9.actine; ctx.lineWidth = Math.max(3, 0.035 * s); ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = lighten(Z9.actine, 0.25); for (let k = 0; k < act / (0.055 * s); k++) { const xx = x0 - sg * (k + 0.5) * 0.055 * s; circ(ctx, xx, ay + (k % 2 ? 1.5 : -1.5), Math.max(1.6, 0.018 * s), lighten(Z9.actine, 0.25)); }
    if (tropo > 0.01) { ctx.save(); ctx.globalAlpha *= tropo; ctx.strokeStyle = C.paars; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 - sg * act * k / 20; k ? ctx.lineTo(xx, ay + Math.sin(k * 1.6) * 3) : ctx.moveTo(xx, ay); } ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // myosine: dikke draad in het midden, koppen op beide helften behalve de kale zone
  ctx.save(); ctx.globalAlpha *= hl.myosine != null ? 0.35 + 0.65 * hl.myosine : 1; const kale = 0.15 * s;
  for (const my of ys) { roundRect(ctx, x - myo, my - Math.max(3, 0.05 * s), 2 * myo, Math.max(6, 0.1 * s), Math.max(3, 0.05 * s)); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1);
    for (const sg of [-1, 1]) for (let k = 0; k < 9; k++) { const kx = x + sg * (kale + (k + 0.5) * (myo - kale) / 9);
      for (const up of [-1, 1]) { const fase = (kop + k * 0.13 + (up > 0 ? 0.07 : 0)) % 1, hoek = fase < 0.5 ? lerp(0.9, 0.35, fase * 2) : lerp(0.35, 0.9, (fase - 0.5) * 2);
        const lx = kx + sg * Math.cos(hoek) * 0.07 * s * 0.5, ly = my + up * (Math.max(3, 0.05 * s) + Math.sin(hoek) * 0.12 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.018 * s); ctx.beginPath(); ctx.moveTo(kx, my + up * Math.max(3, 0.05 * s)); ctx.lineTo(lx, ly); ctx.stroke(); circ(ctx, lx, ly, Math.max(2.2, 0.025 * s), lighten(Z9.myosine, 0.15)); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}
// myofibril: een buis met banden (lichte en donkere banden, Z-lijnen) als herhaling van sarcomeren
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.55), BIO.spierL, 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s; let i = 0; for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2; ctx.fillStyle = rgba('#5A2A26', 0.6); ctx.fillRect(mid - 0.8 * s, y - h / 2, 1.6 * s, h);
    ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(xx - 1, y - h / 2, 2, h); if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIER IN DWARSDOORSNEDE MET MOTORISCHE EENHEDEN. Recept (OpenStax A&P 10.5; Purves 4e h. 16): spiervezels als veelhoeken
// (± 50 µm), in bundels met bindweefsel; de vezels van één motorische eenheid liggen verspreid door de spier, niet in een groepje.
// Een eenheid trekt alles-of-niets samen; kleine eenheden eerst, daarna grotere (groottebeginsel).
// aan = aantal actieve eenheden (0..n, kommagetal = de volgende komt op), eenheden = [{n: vezels, kleur}].
// =====================================================================================
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.25), Z9.peesR, 2);
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  let start = 0; eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  V.forEach((v, i) => { const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, v.pts); const base = rgba(BIO.spier, 0.55);
    ctx.fillStyle = act > 0.01 ? _mixHex(BIO.spier, kl, 0.75 * act) : base; ctx.fill(); ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba(BIO.spierL, 0.6); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    circ(ctx, v.pts[(i * 5) % v.pts.length][0] * 0.82 + v.c[0] * 0.18, v.pts[(i * 5) % v.pts.length][1] * 0.82 + v.c[1] * 0.18, 2.2, rgba(BIO.kern, 0.85)); });
  ctx.restore();
  return { V, eig, punten: (j) => V.filter((_, i) => eig[i] === j).map(v => v.c) };
}
// motorische zenuwcel die zich vertakt naar de vezels van één eenheid (bovenop spierDwars getekend; 'vanuit' = beginpunt axon)
function eenheidZenuw(ctx, vanuit, punten, kleur, o = {}) { const { a = 1, puls = -1, dik = 4 } = o; if (a <= 0.01 || !punten.length) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const mx = punten.reduce((s2, p) => s2 + p[0], 0) / punten.length, my = punten.reduce((s2, p) => s2 + p[1], 0) / punten.length, tak = [lerp(vanuit[0], mx, 0.62), lerp(vanuit[1], my, 0.62)];
  ctx.strokeStyle = kleur; ctx.lineWidth = dik; ctx.beginPath(); ctx.moveTo(vanuit[0], vanuit[1]); ctx.quadraticCurveTo(lerp(vanuit[0], tak[0], 0.5), vanuit[1], tak[0], tak[1]); ctx.stroke();
  ctx.lineWidth = Math.max(1.2, dik * 0.4); for (const p of punten) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.quadraticCurveTo((tak[0] + p[0]) / 2 + (hash(p[0]) - 0.5) * 30, (tak[1] + p[1]) / 2, p[0], p[1]); ctx.stroke(); circ(ctx, p[0], p[1], 3.2, kleur); }
  if (puls >= 0 && puls <= 1) { const px = lerp(vanuit[0], tak[0], puls), py = lerp(vanuit[1], tak[1], puls); circ(ctx, px, py, dik * 1.6, C.goud); }
  ctx.restore(); }

// =====================================================================================
// EMG-SPOOR (plakkers op de huid): som van de piekjes van veel eenheden. Vereenvoudigd: we tekenen het ruwe signaal, dat
// groter en dichter wordt naarmate er meer eenheden meedoen en sneller vuren (Purves h. 16; De Luca 1997, oppervlakte-EMG).
// niveau 0..1 = hoeveel kracht; t schuift het spoor. Deterministisch (hash).
// =====================================================================================
function emgSpoor(ctx, x, y, w, h, o = {}) { const { a = 1, niveau = 0.1, t = 0, kleur = C.teal, rooster = true, geschiedenis = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0D1420', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  if (rooster) { ctx.strokeStyle = rgba('#FFFFFF', 0.05); ctx.lineWidth = 1; for (let gx = x; gx < x + w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); } }
  ctx.strokeStyle = kleur; ctx.lineWidth = 1.6; ctx.beginPath(); const N = Math.floor(w / 1.5), my = y + h / 2;
  for (let i = 0; i <= N; i++) { const xx = x + i * 1.5, tt = t * 300 + i, lev = geschiedenis ? geschiedenis(i / N) : niveau; let v = 0;
    const eenh = Math.floor(2 + lev * 40); for (let j = 0; j < eenh; j++) { const per = Math.max(6, 40 - lev * 22 - j * 0.15), ph = Math.floor(hash(j * 13.1) * per), q = (Math.floor(tt) + ph) % Math.floor(per); if (q < 3) v += (q === 1 ? 1 : -0.6) * (0.25 + 0.75 * hash(j * 3.3)) * (0.4 + j / 40); }
    v += (hash(tt * 0.37) - 0.5) * 0.08; const yy = my - clamp(v * h * 0.22, -h * 0.46, h * 0.46); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.stroke(); ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.18), Z9.peesR, 1.5);
  for (const dy of [-0.45, 0, 0.45]) { roundRect(ctx, x - L * 0.42, y + dy * h - h * 0.14, L * 0.84, h * 0.28, h * 0.14); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1); }
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }

// =====================================================================================
// PRACTICUMLOKAAL: tafel, laptop met EMG-spoor, plakkers. Noor zit (zijaanzicht, outfit zomer = korte mouw), onderarm vooruit.
// =====================================================================================
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function plakker(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 1.5); circ(ctx, x, y, r * 0.35, '#C9CED6'); ctx.restore(); }
function draad(ctx, pts, kleur = '#C9CED6', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }
function schooltas(ctx, x, y, s, o = {}) { const { a = 1, kleur = '#2E5C6E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // hangt aan het handvat (x,y), s = px per cm (± 40 × 30 cm)
  ctx.strokeStyle = _mixHex(kleur, '#000000', 0.3); ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 4 * s, y + 5 * s); ctx.quadraticCurveTo(x, y - 2 * s, x + 4 * s, y + 5 * s); ctx.stroke();
  roundRect(ctx, x - 16 * s, y + 4 * s, 32 * s, 30 * s, 4 * s); shape(ctx, kleur, _mixHex(kleur, '#FFFFFF', 0.25), 2); roundRect(ctx, x - 12 * s, y + 18 * s, 24 * s, 12 * s, 3 * s); shape(ctx, _mixHex(kleur, '#000000', 0.15), null); ctx.restore(); }
function veertje(ctx, x, y, s, o = {}) { const { a = 1, rot = -0.4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(2 * s, -1.6 * s, 7 * s, -1.4 * s, 9 * s, 0); ctx.bezierCurveTo(7 * s, 1.2 * s, 2 * s, 1.0 * s, 0, 0); shape(ctx, '#F2F2EE', '#C9CED6', 1);
  ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-1.5 * s, 0.3 * s); ctx.lineTo(9 * s, 0); ctx.stroke(); ctx.restore(); }
// Practicumscène (castpersonages): Mevrouw Visser, Noor zittend met plakkers en een last in de hand, Sam, tafel met laptop.
// o: last ('veer'|'boek'|'tas'|null), emg 0..1 (niveau op het scherm), armE (elleboog), zak 0..1 (arm zakt bij vallen), visser, sam
// vingertoppen met nitrilhandschoen (practicum), punt = waar ze knijpen
// reflexboog (vwo): sensorisch neuron van het spoeltje naar het ruggenmerg, direct over op het motorisch neuron terug naar de spier

// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — tekeningen ronde 2 (na keuring 26 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// =====================================================================================

// ARMMODEL (practicum, Kamiel 26 okt 2026 in plaats van de kippenvleugel). Twee latjes met een scharnier, twee touwtjes als spieren.
// Bovenste latje staat vast op een voetje; onderste latje scharniert eronder en steekt een stukje achter het scharnier uit
// (zoals het uitsteeksel van de ellepijp). Touwtje voor zit vóór het scharnier vast, touwtje achter aan het stompje.
// Elk touwtje loopt door een oogje bovenaan en eindigt in een ringetje. e = hoek onderste latje (0 = recht naar beneden,
// 1.57 = horizontaal naar voren). knikV / knikA 0..1 = touwtje voor/achter geduwd (knikt), trekV / trekA = trekpijl.
// s = px per cm (latjes ± 30 cm). Voorkant = +x.
function armModel(ctx, x, y, s, o = {}) { const { a = 1, e = 0.2, knikV = 0, knikA = 0, trekV = 0, trekA = 0, hlV = 0, hlA = 0, dimV = 0, dimA = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hout = '#C9A36A', houtS = '#9A7A4A', H = [x, y], top = [x, y - 30 * s];
  // statief (staat op tafel op hoogte o.statief) met een klem bovenaan
  if (o.statief != null) { ctx.fillStyle = '#8A94A6'; ctx.fillRect(x - 15 * s, y - 34 * s, 1.4 * s, o.statief - (y - 34 * s)); roundRect(ctx, x - 22 * s, o.statief - 1.6 * s, 16 * s, 1.6 * s, 0.5 * s); shape(ctx, '#5A6478', null); }
  roundRect(ctx, x - 16 * s, y - 34 * s, 22 * s, 3 * s, 1 * s); shape(ctx, _mixHex(hout, '#000000', 0.15), houtS, 1.5);
  // bovenste latje (opperarm)
  roundRect(ctx, x - 1.4 * s, y - 31 * s, 2.8 * s, 31 * s, 1 * s); shape(ctx, hout, houtS, 1.5);
  // onderste latje (onderarm) met stompje achter het scharnier
  const ux = Math.sin(e), uy = Math.cos(e), F = (d, n = 0) => [x + ux * d * s + uy * n * s, y + uy * d * s - ux * n * s];
  ctx.save(); ctx.translate(x, y); ctx.rotate(-e); roundRect(ctx, -1.3 * s, -4 * s, 2.6 * s, 32 * s, 1 * s); shape(ctx, _mixHex(hout, '#FFFFFF', 0.08), houtS, 1.5); ctx.restore();
  // scharnier
  circ(ctx, x, y, 1.5 * s, '#8A94A6', '#5A6478', 1.5); circ(ctx, x, y, 0.5 * s, '#3A4458');
  // oogjes bovenaan (voor en achter)
  const oogV = [x + 2.6 * s, y - 27 * s], oogA = [x - 2.6 * s, y - 27 * s];
  for (const p of [oogV, oogA]) { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p[0], p[1], 0.7 * s, 0, 6.283); ctx.stroke(); }
  // aanhechtingen
  const hV = F(5, 1.3), hA = F(-3.2, -0.6);
  const touw = (oog, h, knik, hl, dimK, kleur) => { ctx.save(); ctx.globalAlpha *= dimK ? 0.35 : 1; const d = Math.hypot(h[0] - oog[0], h[1] - oog[1]);
    ctx.strokeStyle = hl > 0.01 ? _mixHex('#E9E3D2', C.goud, hl) : '#E9E3D2'; ctx.lineWidth = 4 + 2 * hl;
    ctx.beginPath(); ctx.moveTo(h[0], h[1]);
    if (knik > 0.01) { // te veel touw: het knikt opzij
      const mx = (h[0] + oog[0]) / 2, my = (h[1] + oog[1]) / 2, nx = (oog[1] - h[1]) / d, ny = -(oog[0] - h[0]) / d, sg = oog[0] > x ? 1 : -1, b = knik * 5 * s * sg;
      ctx.bezierCurveTo(h[0] + nx * b * 0.4, h[1] + ny * b * 0.4, mx + nx * b * 1.4, my + ny * b * 1.4 + 2 * s, mx + nx * b, my + ny * b);
      ctx.bezierCurveTo(mx + nx * b * 0.6 - 2 * s * sg, my - 3 * s, oog[0] + nx * b * 0.3, oog[1] + ny * b * 0.3 + 3 * s, oog[0], oog[1]);
    } else ctx.lineTo(oog[0], oog[1]);
    ctx.stroke(); circ(ctx, h[0], h[1], 0.8 * s, '#8A94A6');
    // vrij eind boven het oogje met ringetje (langer naarmate er minder touw onder het oogje zit)
    const vrij = Math.max(2, 22 - d / s + (knik > 0 ? -knik * 4 : 0)), ex = oog[0] + (oog[0] > x ? 0.6 : -0.6) * s, ey = oog[1] - vrij * s;
    ctx.beginPath(); ctx.moveTo(oog[0], oog[1]); ctx.lineTo(ex, ey); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey - 1.1 * s, 1.1 * s, 0, 6.283); ctx.strokeStyle = kleur; ctx.stroke();
    ctx.restore(); return [ex, ey - 1.1 * s]; };
  const rV = touw(oogV, hV, knikV, hlV, dimV, C.goud), rA = touw(oogA, hA, knikA, hlA, dimA, C.teal);
  if (trekV > 0.01) pijl(ctx, rV[0], rV[1] - 1.5 * s, rV[0], rV[1] - 1.5 * s - 7 * s * trekV, C.goud, 1, 5, 18);
  if (trekA > 0.01) pijl(ctx, rA[0], rA[1] - 1.5 * s, rA[0], rA[1] - 1.5 * s - 7 * s * trekA, C.teal, 1, 5, 18);
  ctx.restore();
  return { scharnier: H, top, hand: F(27), onder: F(14), boven: [x, y - 15 * s], hechtV: hV, hechtA: hA, ringV: rV, ringA: rA, oogV, oogA };
}

// EÉN MYOSINEKOP OP DE ACTINE (groot schema; lengterichting). Recept (Alberts h. 16; OpenStax A&P 10.3): de kop zit met een
// hals aan de dikke draad; gespannen staat hij ± loodrecht, na de krachtslag gekanteld naar het midden van de sarcomeer
// (hier: naar links = midden); de actine schuift dan mee naar links. hoek 0 = gespannen (± 85°), 1 = gekanteld (± 40°).
// vast 0..1 = gebonden aan de actine; actX = verschuiving actine (px); chip = 'ATP'|'ADP'|'ADP+P'|null op de kop.
function kopStand(ctx, x, y, s, o = {}) { const { a = 1, hoek = 0, vast = 0, actX = 0, chip = null, chipA = 1, hl = 1, plekken = true, tropo = 0, rijen = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a;
  // dikke draad (myosine) onder
  const my = y + 1.6 * s; roundRect(ctx, x - 9 * s, my - 0.45 * s, 18 * s, 0.9 * s, 0.45 * s); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1.5);
  // actine boven: kralensnoer, schuift met actX; bindplekken donker
  const ay = y - 1.6 * s; ctx.save(); ctx.beginPath(); ctx.rect(x - 10 * s, ay - 1.2 * s, 20 * s, 2.4 * s); ctx.clip();
  for (let k = -14; k < 30; k++) { const bx = x - 10 * s + k * 0.62 * s + (actX % (0.62 * s * 6)), by = ay + (k % 2 ? 0.22 : -0.22) * s;
    circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (plekken && ((k % 6) + 6) % 6 === 0) circ(ctx, bx, by + 0.3 * s, 0.13 * s, '#1A2A3A'); }
  ctx.restore();
  // hals + kop
  const nx = x, ny = my - 0.45 * s, ang = lerp(1.48, 0.7, hoek), L = 2.0 * s; const kx = nx - Math.cos(ang) * L * 0.6, ky = ny - Math.sin(ang) * L * 1.0;
  const kopY = lerp(ky, ay + 0.75 * s, vast);
  ctx.strokeStyle = Z9.myosine; ctx.lineWidth = 0.35 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(kx, kopY + 0.4 * s); ctx.stroke();
  ctx.save(); ctx.translate(kx, kopY); ctx.rotate(-ang + 1.57); ctx.beginPath(); ctx.ellipse(0, 0, 0.55 * s, 0.85 * s, 0, 0, 6.283); shape(ctx, lighten(Z9.myosine, 0.15), hl > 0.5 ? C.goud : Z9.myosine, hl > 0.5 ? 3 : 1.5); ctx.restore();
  if (chip && chipA > 0.01) { ctx.save(); ctx.globalAlpha *= chipA; tag(ctx, chip, kx + 2.4 * s, kopY + 1.0 * s, chip === 'ATP' ? C.groen : C.oker, 1, 'left', Math.round(0.42 * s)); ctx.restore(); }
  ctx.restore();
  return { kop: [kx, kopY], actine: [x + 6 * s, ay], myosine: [x + 6 * s, my] };
}

// ACTINE MET TROPOMYOSINE EN TROPONINE (vwo, schema). Recept (OpenStax A&P 10.3; Alberts h. 16): tropomyosine ligt als een
// draad over de bindplekken; troponine zit eraan vast; Ca²⁺ bindt aan troponine → tropomyosine schuift opzij → plekken vrij.
// schuif 0..1, ca 0..1 (calcium gebonden).
function actineDetail(ctx, x, y, w, s, o = {}) { const { a = 1, schuif = 0, ca = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const n = Math.floor(w / (0.62 * s)); for (let k = 0; k < n; k++) { const bx = x + k * 0.62 * s, by = y + (k % 2 ? 0.22 : -0.22) * s; circ(ctx, bx, by, 0.36 * s, lighten(Z9.actine, 0.15), Z9.actine, 1); if (k % 6 === 3) circ(ctx, bx, by + 0.3 * s, 0.14 * s, '#1A2A3A'); }
  const ty = y + lerp(0.3, -0.75, schuif) * s; ctx.strokeStyle = C.paars; ctx.lineWidth = 0.22 * s; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const xx = x + k * (n * 0.62 * s) / 60; k ? ctx.lineTo(xx, ty + Math.sin(k * 0.9) * 0.08 * s) : ctx.moveTo(xx, ty); } ctx.stroke();
  const tp = []; for (let k = 3; k < n; k += 6) { const bx = x + (k + 1.5) * 0.62 * s; circ(ctx, bx, ty - 0.1 * s, 0.32 * s, lighten(C.paars, 0.35), C.paars, 1.5); tp.push([bx, ty - 0.1 * s]); if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= ca; circ(ctx, bx + 0.25 * s, ty - 0.45 * s, 0.17 * s, Z9.ca); ctx.restore(); } }
  ctx.restore(); return { tropo: [x + w * 0.5, ty], troponine: tp[0] || [x, y], plek: [x + 3 * 0.62 * s, y + 0.3 * s] }; }

// SARCOPLASMATISCH RETICULUM (vwo): netwerk van buisjes en zakjes om een myofibril; ca 0..1 = calcium dat eruit is.
function reticulum(ctx, x, y, w, h, o = {}) { const { a = 1, ca = 0, t = 0, terug = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.5), BIO.spierL, 1.2);
  for (let xx = x + 20; xx < x + w - 20; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.9); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx, y - h / 2 - 8); ctx.bezierCurveTo(xx + 30, y - h / 2 - 22, xx + 60, y - h / 2 - 2, xx + 80, y - h / 2 - 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xx, y + h / 2 + 8); ctx.bezierCurveTo(xx + 30, y + h / 2 + 22, xx + 60, y + h / 2 + 2, xx + 80, y + h / 2 + 12); ctx.stroke(); }
  for (let xx = x + 60; xx < x + w - 40; xx += 90) { ctx.strokeStyle = rgba('#7FB7D6', 0.75); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx + 40, y - h / 2 - 12); ctx.bezierCurveTo(xx + 62, y - h / 4, xx + 62, y + h / 4, xx + 40, y + h / 2 + 12); ctx.stroke(); circ(ctx, xx + 40, y - h / 2 - 12, 7, rgba('#7FB7D6', 0.9)); circ(ctx, xx + 40, y + h / 2 + 12, 7, rgba('#7FB7D6', 0.9)); }
  for (let i = 0; i < 26; i++) { const bx = x + 30 + hash(i * 3.1) * (w - 60), up = i % 2 ? -1 : 1, by0 = y + up * (h / 2 + 12), by1 = y + (hash(i * 7.7) - 0.5) * h * 0.7, u = clamp(ca - terug, 0, 1) * clamp(1.2 - hash(i) * 0.4, 0, 1);
    if (u > 0.01) circ(ctx, lerp(bx, bx + (hash(i * 5) - 0.5) * 30, u), lerp(by0, by1, u) + Math.sin(t * 3 + i) * 2, 5, Z9.ca); }
  ctx.restore(); }

// TREKKINGEN TELLEN OP (vwo, grafiek): kracht tegen tijd voor impulsen met een gegeven tussentijd. sneller = 0 (los), 1 (opgeteld)
function trekGrafiek(ctx, x, y, w, h, o = {}) { const { a = 1, tussen = 0.5, prog = 1, kleur = C.goud, impulsen = 4, label = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  assen(ctx, x, y, w, h, 'tijd', 'kracht'); const tw = (tt) => tt <= 0 ? 0 : (tt / 0.12) * Math.exp(1 - tt / 0.12);
  const imp = [...Array(impulsen)].map((_, i) => 0.05 + i * tussen); ctx.strokeStyle = kleur; ctx.lineWidth = 3.5; ctx.beginPath();
  const N = 200; for (let i = 0; i <= N * prog; i++) { const tt = i / N * 1.2; let v = 0; for (const t0 of imp) v += tw(tt - t0); const xx = x + i / N * w, yy = y + h - Math.min(v, 2.6) / 2.6 * h * 0.92; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  for (const t0 of imp) { const xx = x + t0 / 1.2 * w; if (t0 / 1.2 <= prog) { ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y + h + 8); ctx.lineTo(xx, y + h + 30); ctx.stroke(); } }
  if (label) metaText(ctx, label, x + w / 2, y + h + 64, C.text2, 'center', 20);
  ctx.restore(); }

// OOG met oogspier (van opzij, schema) en een stand 0..1 (kijkrichting)
function oogSchema(ctx, x, y, r, o = {}) { const { a = 1, stand = 0.5, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 2); const an = lerp(-0.45, 0.45, stand); const px = x + Math.cos(an) * r * 0.78, py = y + Math.sin(an) * r * 0.78;
  circ(ctx, px, py, r * 0.3, '#5B7FA6'); circ(ctx, px, py, r * 0.15, '#121A26');
  ctx.beginPath(); ctx.moveTo(x - r * 0.2, y - r * 0.98); ctx.bezierCurveTo(x - r * 0.9, y - r * 1.35, x - r * 1.7, y - r * 0.9, x - r * 2.2, y - r * 0.6); ctx.lineWidth = r * 0.22; ctx.strokeStyle = hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.4) : Z9.spier; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - r * 2.5, y - r * 1.1); ctx.lineTo(x - r * 2.15, y - r * 0.2); ctx.lineTo(x - r * 2.6, y + r * 0.6); ctx.lineTo(x - r * 2.9, y - r * 0.3); ctx.closePath(); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore(); return { spier: [x - r * 1.2, y - r * 1.15] }; }
// KUIT (onderbeen van opzij, schema) met voet in stand 0..1
function kuitSchema(ctx, x, y, s, o = {}) { const { a = 1, stand = 0, hl = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  z9Glad(ctx, [[x - 1.6 * s, y - 40 * s], [x - 4.8 * s, y - 28 * s], [x - 3.6 * s, y - 14 * s], [x - 2.2 * s, y - 4 * s], [x + 1.8 * s, y - 4 * s], [x + 2.4 * s, y - 20 * s], [x + 2.6 * s, y - 40 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2);
  z9Glad(ctx, [[x - 1.8 * s, y - 37 * s], [x - 4.3 * s, y - 27 * s], [x - 3.0 * s, y - 15 * s], [x - 1.2 * s, y - 15 * s], [x - 0.6 * s, y - 27 * s]], true); shape(ctx, hl > 0.5 ? _mixHex(Z9.spier, C.goud, 0.35) : Z9.spier, Z9.spierL, 1.5);
  z9Pees(ctx, [[x - 2.1 * s, y - 15 * s], [x - 2.0 * s, y - 6 * s], [x - 2.4 * s, y - 1.5 * s]], 0.7 * s, 1);
  ctx.save(); ctx.translate(x, y - 3 * s); ctx.rotate(lerp(0, 0.6, stand)); z9Glad(ctx, [[-3 * s, -1 * s], [-3.2 * s, 2.2 * s], [10 * s, 3.2 * s], [11 * s, 1.2 * s], [3 * s, -1.6 * s]], true); shape(ctx, rgba(BIO.huid, 0.25), rgba(BIO.huid, 0.8), 2); ctx.restore();
  ctx.restore(); return { spier: [x - 3.6 * s, y - 26 * s] }; }

// EMG-PANEEL: twee kanalen (biceps, triceps) met optionele staplabels en verborgen sporen
function emgPaneel(ctx, x, y, w, o = {}) { const { a = 1, t = 0, bic = 0.05, tri = 0.02, hisB = null, hisT = null, triA = 1, stappen = null, verbergB = 0, verbergT = 0, hlB = 0, hlT = 0, vraagA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = triA > 0.01 ? 430 : 250; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.kast, 0.92), C.line, 1.5);
  metaText(ctx, 'BICEPS', x + 25, y + 40, hlB > 0.5 ? C.goud : C.teal, 'left', 22); emgSpoor(ctx, x + 20, y + 55, w - 40, 150, { t, rooster: false, niveau: bic, geschiedenis: hisB, kleur: hlB > 0.5 ? C.goud : C.teal });
  if (verbergB > 0.01) { ctx.save(); ctx.globalAlpha *= verbergB; roundRect(ctx, x + 20, y + 55, w - 40, 150, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 160, vraagA, 80); ctx.restore(); }
  if (triA > 0.01) { ctx.save(); ctx.globalAlpha *= triA; metaText(ctx, 'TRICEPS', x + 25, y + 250, hlT > 0.5 ? C.goud : C.text2, 'left', 22); emgSpoor(ctx, x + 20, y + 265, w - 40, 120, { t: t + 3, rooster: false, niveau: tri, geschiedenis: hisT, kleur: hlT > 0.5 ? C.goud : C.teal });
    if (verbergT > 0.01) { ctx.save(); ctx.globalAlpha *= verbergT; roundRect(ctx, x + 20, y + 265, w - 40, 120, 10); shape(ctx, '#0D1420', null); vraagteken(ctx, x + w / 2, y + 355, vraagA, 70); ctx.restore(); } ctx.restore(); }
  if (stappen) stappen.forEach((s2, i) => text(ctx, s2[0], x + 20 + (w - 40) * s2[1], y + h - 12, fTekst(22, 600), s2[2] ? C.text : C.text2, 'center'));
  ctx.restore(); }

// PRACTICUMLOKAAL (film): Noor zit aan tafel met plakkers op biceps en triceps; laptop op tafel; Sam en mevrouw Visser staan.
// o.last 'veer'|'boek'|'boeken'|'tas'|null, o.armE elleboog (rad), o.opTafel = arm ligt op tafel, o.uitN gezicht Noor
// stuk huid met een plakker erop en spiervezels eronder (H4)
function huidPlakker(ctx, x, y, w, o = {}) { const { a = 1, t = 0, vuur = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 50, 10); shape(ctx, rgba(BIO.huid, 0.55), BIO.huidS, 1.5);
  for (let k = 0; k < 5; k++) spierVezel(ctx, x + 10, y + 90 + k * 42, w - 20, 32, { seed: k + 4, a: 1 });
  circ(ctx, x + w / 2, y - 6, 40, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x + w / 2, y - 6, 14, '#C9CED6');
  if (vuur > 0.01) for (let k = 0; k < 5; k++) { const u = (t * 1.3 + k * 0.21) % 1; ctx.save(); ctx.globalAlpha *= vuur * (1 - u); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + w * (0.2 + 0.15 * k), y + 90 + (k % 5) * 42, 10 + u * 60, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// decor (ElevenLabs gpt-image-2.5-sunburst, stijlreferentie 'moestuin' uit Wat zit er in de bodem?, flow cMT4epIEjMJi0sraRQzk, generatie t9uBD1KXWZIb1UsORGBd, ±433 credits, 26 okt 2026)
const DECOR_SRC = {
 ggd: "data:image/webp;base64,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"
};
// Wat word jij? · Gezondheidswetenschappen 1 · Hoe een epidemie groeit en stopt — eigen tekeningen (26 okt 2026)
// Seriekleuren: koraal = besmettelijk, teal = vatbaar, groen = immuun/hersteld, oker = maatregel, goud = focus, paars = virus.

// ---------- algemene hulpjes (zoals lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 62, y + 24, C.text2, 'left', 14); text(ctx, s2, x + 62, y + 46, fTekst(24, 700), C.text, 'left'); ctx.restore(); }
// kaartje met echte getallen: kop (meta), regels, bron (meta) — altijd apart van het oefendossier
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 44, h = 70 + regels.length * lh + (bron ? 40 : 6) + (o.extraH || 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2); metaText(ctx, kop, x + 26, y + 44, C.goud, 'left', 22);
  regels.forEach((r, i) => { const [s2, ra] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 26, y + 92 + i * lh, fTekst(o.px || 32, 700), C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 70 + regels.length * lh, w, o.extraH || 0);
  if (bron) metaText(ctx, bron, x + 26, y + h - 20, C.text2, 'left', 18); ctx.restore(); return h; }
const RHO = (n) => n.toLocaleString('nl-NL');

// ---------- telpoppetje (alleen in groepen en ketens, BEELDAFSPRAKEN) ----------
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }

// ---------- blokje = één melding (keyframe gz) ----------
function blokje(c, x, y, w, h, col, a = 1, pop = false) { if (a <= 0.01) return; c.save(); c.globalAlpha *= a; roundRect(c, x, y, w, h, Math.min(6, h * 0.3)); c.fillStyle = rgba(col, 0.85); c.fill(); c.strokeStyle = col; c.lineWidth = 2; c.stroke();
  if (pop) popje(c, x + w / 2, y + h * 0.82, h * 0.26, rgba('#1A1410', 0.55)); c.restore(); }
function blokLeeg(c, x, y, w, h, a = 1, col = C.line) { if (a <= 0.01) return; c.save(); c.globalAlpha *= a; roundRect(c, x, y, w, h, Math.min(6, h * 0.3)); c.setLineDash([5, 4]); c.strokeStyle = col; c.lineWidth = 1.6; c.stroke(); c.restore(); }

// ---------- SIR-model (keyframe sirRun, met R per dag als functie) ----------
const _SIR = {};
function sirRun(R0, gamma, dagen, i0, Rf = null, key = null) { const k = key || [R0, gamma, dagen, i0].join('|'); if (_SIR[k]) return _SIR[k];
  let S = 1 - i0, I = i0, Rr = 0; const out = []; for (let d = 0; d < dagen; d++) { let nieuw = 0; const R = Rf ? Rf(d) : R0; const beta = R * gamma;
    for (let s = 0; s < 10; s++) { const inf = beta * S * I / 10; S -= inf; I += inf - gamma * I / 10; Rr += gamma * I / 10; nieuw += inf; } out.push({ S, I, R: Rr, nieuw }); }
  _SIR[k] = out; return out; }
// vaste modelruns van deze film (oefenstad van 100.000 inwoners, 5 dagen besmettelijk)
const RUN = {
  vrij25: () => sirRun(2.5, 0.2, 120, 3e-4),
  maat25: () => sirRun(2.5, 0.2, 120, 3e-4, (d) => d < 12 ? 2.5 : 1.6, 'maat25'),
  r3: () => sirRun(3, 0.2, 120, 3e-4),
  r15: () => sirRun(1.5, 0.2, 120, 3e-4),
  r18: () => sirRun(1.8, 0.2, 120, 3e-4)
};
const kruisDag = (run, drempel) => run.findIndex(r => 1 - r.S >= drempel);

// ---------- grafiek met modelbalkjes ----------
// g = {x, y, w, h, dagen, max}; run(s) als blokjes per dag; tot = laatste dag (float); o.omlijn = run als stippelomtrek
function grafAssen(ctx, g, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.lineTo(g.x, g.y + g.h); ctx.lineTo(g.x + g.w, g.y + g.h); ctx.stroke();
  const st = o.stap || 20; for (let d = 0; d <= g.dagen; d += st) { const x = g.x + d / g.dagen * g.w; ctx.fillStyle = C.line; ctx.fillRect(x - 1, g.y + g.h, 2, 10); metaText(ctx, String(d), x, g.y + g.h + 36, C.text2, 'center', 22); }
  metaText(ctx, o.xl || 'DAGEN', g.x + g.w, g.y + g.h + 66, C.text2, 'right', 20); metaText(ctx, o.yl || 'NIEUWE ZIEKEN PER DAG', g.x, g.y - 16, C.text2, 'left', 20); ctx.restore(); }
function grafBalkjes(ctx, g, run, tot, col = C.koraal, a = 1, o = {}) { if (a <= 0.01) return; const bw = g.w / g.dagen; const n = Math.min(run.length, g.dagen);
  for (let d = 0; d < n; d++) { const f = clamp(tot - d, 0, 1); if (f <= 0) break; const bh = run[d].nieuw * 1e5 / g.max * g.h; if (bh < 0.5) continue;
    if (o.omlijn) blokLeeg(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), bh, a * f, col);
    else { blokje(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), Math.max(bh, 1), col, a * f); if (o.rand) { ctx.save(); ctx.globalAlpha *= a * f; roundRect(ctx, g.x + d * bw + 1, g.y + g.h - bh, Math.max(bw - 2, 2), Math.max(bh, 1), 3); ctx.strokeStyle = o.rand; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } } } }
function grafPiek(run) { let m = 0; run.forEach((r, i) => { if (r.nieuw > run[m].nieuw) m = i; }); return m; }
function grafPt(g, run, d) { return [g.x + (d + 0.5) * g.w / g.dagen, g.y + g.h - run[d].nieuw * 1e5 / g.max * g.h]; }
function icLijn(ctx, g, waarde, a = 1, u = 1, label = true) { if (a <= 0.01) return; const y = g.y + g.h - waarde / g.max * g.h; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.setLineDash([14, 8]); ctx.beginPath(); ctx.moveTo(g.x, y); ctx.lineTo(g.x + g.w * u, y); ctx.stroke(); ctx.restore();
  if (label) metaA(ctx, 'WAT DE ZORG AANKAN', g.x + g.w * u - 8, y - 14, a * clamp(u * 3 - 2, 0, 1), C.text, 'right', 22); return y; }

// ---------- dossier: blokjes per dag als stapels (4 breed) ----------
const STAPEL = { bw: 24, bh: 11, gap: 2, per: 4 };
function stapel(ctx, cx, yb, n, u = 1, col = C.koraal, a = 1, o = {}) { const { bw, bh, gap, per } = STAPEL, w = per * (bw + gap) - gap; const k = n * clamp(u, 0, 1);
  for (let i = 0; i < n; i++) { const f = clamp(k - i, 0, 1); if (f <= 0.01) break; const rij = Math.floor(i / per), kol = i % per; const x = cx - w / 2 + kol * (bw + gap), y = yb - (rij + 1) * (bh + gap);
    const dy = (1 - ease(f)) * -60; blokje(ctx, x, y + dy, bw, bh, col, a * f); } return yb - Math.ceil(n / per) * (bh + gap); }
const stapelTop = (yb, n) => yb - Math.ceil(n / STAPEL.per) * (STAPEL.bh + STAPEL.gap);
function stapelLeeg(ctx, cx, yb, n, a = 1) { if (a <= 0.01) return; const { bw, gap, per } = STAPEL, w = per * (bw + gap) - gap; const top = stapelTop(yb, n); ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, cx - w / 2 - 6, top - 6, w + 12, yb - top + 6, 8); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// kop van het oefendossier (rechtsboven, op navy)
function dossierKop(ctx, a = 1, x = 1800, y = 120) { metaA(ctx, 'DOSSIER UITBRAAK · OEFENDOSSIER · RONDE GETALLEN', x, y, a, C.grain, 'right', 22); }
// vel van het dossier (canoniek 1920×1080: ook wat er op het kantoorscherm staat)
function vel(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x = o.x || 110, y = o.y || 110, w = o.w || 1700, h = o.h || 760;
  roundRect(ctx, x, y, w, h, 20); shape(ctx, rgba('#0D1420', 0.4), rgba(o.rand || C.line, 0.55), 2);
  text(ctx, o.titel || 'DOSSIER UITBRAAK', x + 40, y + 62, fTekst(38, 800), C.text, 'left'); if (o.meta !== '') metaText(ctx, o.meta || 'OEFENDOSSIER · RONDE GETALLEN', x + 40, y + 98, C.grain, 'left', 22); ctx.restore(); }

// ---------- cold open: epidemiecurve van blokjes (één blokje = één melding) ----------
const KOUD = { x0: 560, dx: 26, yb: 820, dagen: 32, bw: 18, bh: 9 };
const koudN = (d) => Math.round(Math.pow(2, d / 5.5));
const KOUD_BLOK = (() => { const L = []; for (let d = 0; d <= KOUD.dagen; d++) for (let i = 0; i < koudN(d); i++) L.push([d, i]); return L; })();
const koudPos = (d, i) => [KOUD.x0 + d * KOUD.dx, KOUD.yb - (i + 1) * (KOUD.bh + 2)];
// tijd(d, i) = moment waarop het blokje valt (s); null = nog niet
function koudCurve(ctx, tijd, t, a = 1, skip = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(KOUD.x0 - 20, KOUD.yb + 2); ctx.lineTo(KOUD.x0 + KOUD.dagen * KOUD.dx + 30, KOUD.yb + 2); ctx.stroke();
  for (let d = 0; d <= KOUD.dagen; d += 7) metaText(ctx, 'DAG ' + d, KOUD.x0 + d * KOUD.dx + KOUD.bw / 2, KOUD.yb + 38, C.text2, 'center', 22);
  KOUD_BLOK.forEach(([d, i], j) => { if (skip && skip(j)) return; const t0 = tijd(d, i); if (t0 == null || t < t0) return; const f = ease((t - t0) / 0.3); const [x, y] = koudPos(d, i); blokje(ctx, x, y - (1 - f) * 120, KOUD.bw, KOUD.bh, C.koraal, f); });
  ctx.restore(); }

// ---------- H1: netwerk van bron- en contactonderzoek ----------
// vier zieken (bron) met 2, 3, 1 en 4 pijlen: gemiddeld 2,5
const NET = (() => { const bron = [[560, 200], [560, 380], [560, 560], [560, 730]], uit = [2, 3, 1, 4], doel = []; let y = 165;
  uit.forEach((n, b) => { for (let k = 0; k < n; k++) { doel.push({ b, x: 960 + (k % 2) * 40, y }); y += 62; } y += 6; }); return { bron, uit, doel, bw: 72, bh: 48 }; })();
// u: blokjes (0..1), p: pijlen (0..1, één voor één), tel: tellers (0..4), hl: bron die oplicht
function netwerk(ctx, o = {}) { const { bw, bh } = NET, a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const p = o.p || 0, nP = NET.doel.length;
  NET.doel.forEach((d, i) => { const f = clamp(p * nP - i, 0, 1); if (f <= 0.01) return; const [bx, by] = NET.bron[d.b]; const x1 = bx + bw + 4, y1 = by + bh / 2, x2 = d.x - 8, y2 = d.y + bh / 2; pijl(ctx, x1, y1, lerp(x1, x2, ease(f)), lerp(y1, y2, ease(f)), C.oker, 1, 4, f > 0.6 ? 14 : 0.1); });
  NET.bron.forEach(([x, y], i) => { blokje(ctx, x, y, bw, bh, C.koraal, o.u == null ? 1 : o.u, true); if (o.hl === i) { roundRect(ctx, x - 6, y - 6, bw + 12, bh + 12, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } });
  NET.doel.forEach((d, i) => blokje(ctx, d.x, d.y, bw, bh, C.koraal, (o.u == null ? 1 : o.u) * (o.doelA == null ? 1 : o.doelA), true));
  const tel = o.tel || 0; NET.bron.forEach(([x, y], i) => { const f = clamp(tel - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; circ(ctx, x - 44, y + bh / 2, 28, rgba(C.goud, 0.2), C.goud, 3); text(ctx, String(NET.uit[i]), x - 44, y + bh / 2 + 12, fTekst(34, 800), C.goud, 'center'); ctx.restore(); });
  ctx.restore(); }

// ---------- schuifjes (H1-rekenvoorbeeld) ----------
// rij = {naam, waarde, frac, col, a}
function schuif(ctx, x, y, w, naam, waarde, frac, a = 1, col = C.goud, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 128, 16); shape(ctx, rgba('#0D1420', 0.75), o.rand || rgba(C.line, 0.7), o.rand ? 3 : 1.5);
  text(ctx, naam, x + 28, y + 46, fTekst(32, 700), C.text, 'left'); const tx = x + 28, tw = w - 230, ty = y + 92; roundRect(ctx, tx, ty - 5, tw, 10, 5); shape(ctx, '#2A3446', null);
  roundRect(ctx, tx, ty - 5, Math.max(10, tw * frac), 10, 5); shape(ctx, rgba(col, 0.75), null); circ(ctx, tx + tw * frac, ty, 15, col, _mixHex(col, '#000000', 0.3), 2);
  if (waarde) text(ctx, waarde, x + w - 30, y + 98, fTitel(56), o.waardeKleur || C.text, 'right'); ctx.restore(); }

// ---------- virus (paars, alleen als pictogram) ----------
function virusIcoon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.paars; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const an = i * 0.5236 + t * 0.15; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.32, y + Math.sin(an) * r * 1.32); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.38, y + Math.sin(an) * r * 1.38, r * 0.13, C.paars); }
  circ(ctx, x, y, r, rgba(C.paars, 0.45), C.paars, r * 0.1); ctx.restore(); }

// ---------- liggende balk 'immuun' / 'ooit besmet' met gouden drempel ----------
function balkImmuun(ctx, x, y, w, frac, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = o.h || 46;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba(C.teal, 0.3), rgba(C.teal, 0.8), 2);
  if (frac > 0.003) { roundRect(ctx, x, y, Math.max(12, w * frac), h, 10); shape(ctx, rgba(C.groen, 0.85), C.groen, 2); }
  if (o.door > 0.01 && o.drempel) { const x0 = x + w * o.drempel, x1 = x + w * frac; if (x1 > x0) { ctx.save(); ctx.beginPath(); ctx.rect(x0, y, x1 - x0, h); ctx.clip(); ctx.globalAlpha *= o.door; ctx.strokeStyle = rgba('#0D1420', 0.55); ctx.lineWidth = 5; for (let k = -h; k < x1 - x0 + h; k += 18) { ctx.beginPath(); ctx.moveTo(x0 + k, y + h); ctx.lineTo(x0 + k + h, y); ctx.stroke(); } ctx.restore(); } }
  (o.streep || []).forEach(([f, sa]) => { if (sa > 0.01) { ctx.save(); ctx.globalAlpha *= sa; ctx.fillStyle = C.text; ctx.fillRect(x + w * f - 2, y - 12, 4, h + 24); ctx.restore(); } });
  if (o.drempel && (o.dA == null || o.dA > 0.01)) { ctx.save(); ctx.globalAlpha *= o.dA == null ? 1 : o.dA; ctx.fillStyle = C.goud; ctx.fillRect(x + w * o.drempel - 4, y - 18, 8, h + 36); ctx.restore(); }
  ctx.restore(); }

// ---------- R-meter (echte waarde 2020, apart kaartje) ----------
function rMeter(ctx, x, y, r, R, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const max = 3, an = (v) => Math.PI + clamp(v / max, 0, 1) * Math.PI;
  roundRect(ctx, x - r - 60, y - r - 90, 2 * r + 120, r + 250, 18); shape(ctx, rgba('#0D1420', 0.9), rgba(C.line, 0.8), 2);
  metaText(ctx, o.kop || 'R IN NEDERLAND · 2020', x, y - r - 50, C.goud, 'center', 20);
  ctx.lineWidth = 22; ctx.lineCap = 'butt'; ctx.strokeStyle = rgba(C.groen, 0.6); ctx.beginPath(); ctx.arc(x, y, r, an(0), an(1)); ctx.stroke(); ctx.strokeStyle = rgba(C.koraal, 0.6); ctx.beginPath(); ctx.arc(x, y, r, an(1), an(3)); ctx.stroke();
  [0, 1, 2, 3].forEach(v => { const q = an(v); text(ctx, String(v), x + Math.cos(q) * (r + 34), y + Math.sin(q) * (r + 34) + 10, fTekst(28, 700), v === 1 ? C.text : C.text2, 'center'); });
  const q = an(R); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(q) * (r - 20), y + Math.sin(q) * (r - 20)); ctx.stroke(); circ(ctx, x, y, 12, C.text);
  if (o.tekst) text(ctx, o.tekst, x, y + 70, fTekst(38, 800), o.tekstKleur || C.text, 'center');
  metaText(ctx, o.bron || 'SCHATTING RIVM, 2020', x, y + 104, C.text2, 'center', 18); if (o.onder) metaText(ctx, o.onder, x, y + 134, C.oker, 'center', 18); ctx.restore(); }

// ---------- model met drie bakken (H4) ----------
const BAK = { y: 170, h: 190, w: 380, xs: [250, 770, 1290], kleur: () => [C.teal, C.koraal, C.groen], naam: ['vatbaar', 'besmettelijk', 'hersteld'] };
function bakVorm(ctx, x, y, w, h, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y + h); ctx.lineTo(x + w - 18, y + h); ctx.lineTo(x + w, y); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.lineTo(x, y); ctx.fillStyle = rgba(col, 0.1); ctx.fill(); ctx.restore(); }
// st = {S, I, R} fracties; ver = [a0, a1, a2] zichtbaarheid per bak; stroom = 0..1 (poppetjes onderweg); t
function modelBakken(ctx, st, ver = [1, 1, 1], t = 0, stroom = 0, o = {}) { const cols = BAK.kleur(), N = 24, per = 8;
  const n = [Math.round(st.S * N), 0, 0]; n[2] = Math.round(st.R * N); n[1] = Math.max(0, N - n[0] - n[2]);
  BAK.xs.forEach((x, k) => { const a = ver[k]; if (a <= 0.01) return; bakVorm(ctx, x, BAK.y, BAK.w, BAK.h, cols[k], a); naamBij(ctx, BAK.naam[k], '', x + BAK.w / 2, BAK.y + BAK.h + 50, a * (o.namen == null ? 1 : o.namen), 'center', cols[k]);
    for (let i = 0; i < n[k]; i++) { const r = Math.floor(i / per), c = i % per; popje(ctx, x + 46 + c * 41, BAK.y + BAK.h - 26 - r * 58, 13, cols[k], a); } });
  for (let k = 0; k < 2; k++) { const a = Math.min(ver[k], ver[k + 1]); if (a <= 0.01) continue; const x1 = BAK.xs[k] + BAK.w + 12, x2 = BAK.xs[k + 1] - 12, y = BAK.y + 40;
    pijl(ctx, x1, y, x2, y, C.line, a, 4, 16);
    if (stroom > 0.01) for (let j = 0; j < 2; j++) { const u = ((t * 0.45 + j * 0.5 + k * 0.25) % 1); const px = lerp(x1 - 50, x2 + 50, u), py = y + 60 - Math.sin(u * Math.PI) * 30; popje(ctx, px, py, 13, u < 0.5 ? cols[k] : cols[k + 1], a * stroom * Math.sin(u * Math.PI)); } } }
// knop (draaiknop, oker = maatregel)
function knop(ctx, x, y, r, frac, a = 1, naam = 'CONTACTEN') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25, q = lerp(a0, a1, frac);
  ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.strokeStyle = '#2A3446'; ctx.beginPath(); ctx.arc(x, y, r + 22, a0, a1); ctx.stroke(); ctx.strokeStyle = C.oker; ctx.beginPath(); ctx.arc(x, y, r + 22, a0, q); ctx.stroke();
  circ(ctx, x, y, r, '#3A4458', _mixHex(C.oker, '#000000', 0.2), 3); circ(ctx, x, y, r * 0.78, '#2E3748', null); ctx.strokeStyle = C.oker; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + Math.cos(q) * r * 0.25, y + Math.sin(q) * r * 0.25); ctx.lineTo(x + Math.cos(q) * r * 0.8, y + Math.sin(q) * r * 0.8); ctx.stroke();
  text(ctx, Math.round(frac * 100) + ' %', x, y + r + 74, fTekst(36, 800), C.text, 'center'); metaText(ctx, naam, x, y - r - 40, C.oker, 'center', 22); ctx.restore(); }

// ---------- herinneringskader maart 2020 (keyframe 'herinnering', goedgekeurd) ----------
function herinnering(ctx, t, a = 1, s = 1, dx = 0, dy = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(dx, dy); ctx.scale(s, s);
  ctx.save(); roundRect(ctx, 330, 150, 1260, 690, 22); ctx.fillStyle = '#4A3A28'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#B89A6A'; ctx.stroke(); ctx.clip(); ctx.filter = 'sepia(0.95) saturate(0.7) brightness(0.92)';
  ctx.fillStyle = 'rgba(60,44,28,0.35)'; ctx.fillRect(330, 560, 1260, 280);
  // raam met een stille straat (iedereen thuis)
  roundRect(ctx, 820, 210, 300, 240, 8); shape(ctx, 'rgba(150,170,190,0.25)', '#B89A6A', 6); ctx.fillStyle = '#B89A6A'; ctx.fillRect(967, 210, 6, 240); ctx.fillRect(820, 327, 300, 6);
  persoon(ctx, 'yasmin', 730, 790, 430, { pose: 'zit', stoel: true, tafel: 640, kijk: 1, uit: 'neutraal', t });
  persoon(ctx, 'bilal', 1190, 790, 450, { pose: 'zit', stoel: true, tafel: 640, kijk: -1, uit: 'neutraal', t });
  ctx.fillStyle = '#8A6A44'; ctx.fillRect(520, 640, 880, 22); ctx.fillStyle = '#EDE6D6'; ctx.fillRect(660, 618, 120, 22); ctx.fillRect(1120, 618, 120, 22);
  laptop(ctx, 960, 640, 120, {}); ctx.filter = 'none'; ctx.lineWidth = 60; ctx.strokeStyle = 'rgba(40,28,16,0.35)'; roundRect(ctx, 330, 150, 1260, 690, 22); ctx.stroke(); ctx.restore();
  metaText(ctx, 'MAART 2020', 380, 210, '#D8BE8C', 'left', 30); ctx.restore(); }

// ---------- het GGD-kantoor met camerazoom naar het scherm ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
const SCR = { x: 717, y: 111, w: 600, h: 320 }; // het grote lege scherm in het decor (1920×1080)
const SCR_K = Math.min(SCR.w / W, SCR.h / H), SCR_O = [SCR.x + SCR.w / 2 - SCR_K * W / 2, SCR.y + SCR.h / 2 - SCR_K * H / 2];
const GROND = 862;
// u = 0: kantoor (decor op 60 %), u = 1: het scherm vult het beeld (navy). mensen(ctx) tekent personen in decorcoördinaten; inhoud(ctx) in schermcoördinaten (1920×1080)
function kantoor(ctx, u, mensen, inhoud) { const e = ease(u); bg(ctx, 'schema');
  if (e >= 0.999) { if (inhoud) inhoud(ctx); return; }
  const sc = Math.pow(1 / SCR_K, e), f = (1 - 1 / sc) / (1 - SCR_K), cx = SCR.x + SCR.w / 2, cy = SCR.y + SCR.h / 2, Px = lerp(960, cx, f), Py = lerp(540, cy, f);
  ctx.save(); ctx.translate(960, 540); ctx.scale(sc, sc); ctx.translate(-Px, -Py);
  const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); }
  ctx.save(); roundRect(ctx, SCR.x - 6, SCR.y - 6, SCR.w + 12, SCR.h + 12, 6); ctx.fillStyle = '#0F1622'; ctx.fill(); ctx.beginPath(); ctx.rect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h);
  ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); if (inhoud) inhoud(ctx); ctx.restore();
  if (mensen) mensen(ctx); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 1 - e; ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); ctx.restore(); }
// decor zonder zoom, met een eigen paneel ervoor (recap)
function kantoorVlak(ctx) { bg(ctx, 'schema'); const im = DECOR_IMG.ggd; if (im && im.complete) { ctx.save(); ctx.globalAlpha *= 0.6; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); } ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }

// ---------- kleine recapkaart ----------
function recapKaart(ctx, x, y, w, h, kop, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.8), 2); teken(x + w / 2, y + (h - 60) / 2 + 6);
  text(ctx, kop, x + w / 2, y + h - 26, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// badge aan een koord (zonder tekst: te klein om te lezen; de naam staat er met naamBij bij)
function badge(ctx, r, col = '#F2F2EE', a = 1) { if (!r || !r.hoofd || a <= 0.01) return; const { x, y, r: hr } = r.hoofd; ctx.save(); ctx.globalAlpha *= a;
  const bx = x + hr * 0.42, by = y + hr * 2.75, w = hr * 0.62, h = hr * 0.82; ctx.strokeStyle = '#3E6FA8'; ctx.lineWidth = Math.max(2, hr * 0.07); ctx.beginPath(); ctx.moveTo(x - hr * 0.3, y + hr * 1.35); ctx.lineTo(bx + w / 2, by); ctx.moveTo(x + hr * 0.35, y + hr * 1.35); ctx.lineTo(bx + w / 2, by); ctx.stroke();
  roundRect(ctx, bx, by, w, h, hr * 0.08); shape(ctx, col, '#9AA3B2', 1.5); ctx.fillStyle = '#3E6FA8'; ctx.fillRect(bx, by, w, h * 0.22); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(bx + w * 0.18, by + h * 0.5, w * 0.64, h * 0.08); ctx.fillRect(bx + w * 0.18, by + h * 0.68, w * 0.44, h * 0.08); ctx.restore(); }
// Wat word jij? · Gezondheidswetenschappen 1 · Hoe een epidemie groeit en stopt — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Yasmin, stagiair; Epidemioloog Farid). Decor 'ggd' (kantoor met groot scherm) alleen in de cold open, het begin van H1, het begin van H4 en de recap.
// Rode draad (mutatie 'dossier'): één oefendossier, melding voor melding; per hoofdstuk een laag erbij (pijlen → tijdas en zorglijn → immuunbalk met drempel → model met knop).
// Echte getallen uit 2020 staan altijd op een apart kaartje met bron en jaar; modelcurves dragen 'MODEL'.

// ---------- vaste plekken ----------
const TIJDAS = { x: [300, 620, 940, 1260, 1580], d: [0, 5, 10, 15, 20], n: [10, 20, 40, 80, 160], yb: 780 };
function tijdas(ctx, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; lijn(ctx, [[180, TIJDAS.yb + 3], [1720, TIJDAS.yb + 3]], C.line, 3);
  TIJDAS.x.forEach((x, i) => { ctx.fillStyle = C.line; ctx.fillRect(x - 1.5, TIJDAS.yb + 3, 3, 12); metaText(ctx, 'DAG ' + TIJDAS.d[i], x, TIJDAS.yb + 46, C.text2, 'center', 24); });
  metaText(ctx, 'MELDINGEN PER DAG', 180, 200, C.text2, 'left', 20); ctx.restore(); }
// stapels van de tijdas; u[i] = 0..1 vullen; getal[i] = alpha van het getal erboven
function tijdStapels(ctx, u, getal = [], o = {}) { TIJDAS.x.forEach((x, i) => { if ((u[i] || 0) <= 0.001) return; const top = stapel(ctx, x, TIJDAS.yb, TIJDAS.n[i], u[i], C.koraal, 1);
  const g = getal[i] == null ? 1 : getal[i]; if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g * clamp(u[i] * 3 - 2, 0, 1); text(ctx, String(TIJDAS.n[i]), x, stapelTop(TIJDAS.yb, TIJDAS.n[i]) - 18, fTekst(40, 800), C.text, 'center'); ctx.restore(); } }); }
const stapelY = (i) => stapelTop(TIJDAS.yb, TIJDAS.n[i]);
// ×2-boogje tussen twee stapels
function keer2(ctx, i, a = 1) { if (a <= 0.01) return; const x1 = TIJDAS.x[i] + 30, x2 = TIJDAS.x[i + 1] - 30, y1 = stapelY(i) - 70, y2 = stapelY(i + 1) - 70, ym = Math.min(y1, y2) - 40;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, ym, x2 - 6, y2 - 4); ctx.stroke(); pijl(ctx, x2 - 20, y2 - 18, x2 - 6, y2 - 4, C.goud, 1, 3.5, 14);
  text(ctx, '× 2', (x1 + x2) / 2, ym + 4, fTekst(34, 800), C.goud, 'center'); ctx.restore(); }

// grafieken (oefenstad van 100.000 inwoners; MODEL)
const G1 = { x: 150, y: 270, w: 760, h: 460, dagen: 100 }, G2 = { x: 1010, y: 270, w: 760, h: 460, dagen: 100 }, GG = { x: 160, y: 240, w: 1120, h: 520, dagen: 100 };
const MAX25 = 6300, IC = 2400;
function grafTitel(ctx, g, s2, a = 1, col = C.text) { metaA(ctx, s2, g.x + g.w, g.y - 16, a, col, 'right', 20); }
function maatTot(t0, t, dur) { return clamp((t - t0) / dur, 0, 1) * 100; }

// Yasmin en Farid in het kantoor (decorcoördinaten)
function duo(ctx, t, o = {}) { const ry = persoon(ctx, 'yasmin', o.yx || 560, GROND, 450, { t, kijk: 1, uit: o.uitY || 'blij', pose: o.poseY || 'staan', a: o.aY == null ? 1 : o.aY });
  const rf = persoon(ctx, 'farid', o.fx || 1420, GROND, 450, { t, kijk: -1, uit: o.uitF || 'blij', pose: o.poseF || 'staan', outfit: 'kantoor', a: o.aF == null ? 1 : o.aF }); badge(ctx, rf, '#F2F2EE', o.aF == null ? 1 : o.aF); badge(ctx, ry, '#F2F2EE', o.aY == null ? 1 : o.aY); return { ry, rf }; }

// mini-dossier (recap, op het scherm): stapel, drempel, balk
function miniDossier(ctx, t) { vel(ctx, 1); const run = RUN.r3(), g = { x: 200, y: 200, w: 1200, h: 380, dagen: 100, max: 8700 };
  grafBalkjes(ctx, g, run, 100, C.koraal, 1); const kd = kruisDag(run, 2 / 3), kx = g.x + kd * g.w / g.dagen; stippel(ctx, kx, g.y, kx, g.y + g.h, C.goud, 1, 5);
  balkImmuun(ctx, 200, 680, 1200, 1 - run[99].S, 1, { drempel: 2 / 3, door: 1 }); bakVorm(ctx, 1500, 300, 120, 90, C.teal); bakVorm(ctx, 1500, 450, 120, 90, C.koraal); bakVorm(ctx, 1500, 600, 120, 90, C.groen); knop(ctx, 1680, 480, 40, 0.5, 1, ''); }

Object.assign(SCENES, {
  title(ctx, t) { const run = RUN.vrij25(), g = { x: 1080, y: 450, w: 700, h: 330, dagen: 50, max: MAX25 }; grafBalkjes(ctx, g, run, clamp(t * 18, 0, 50), C.koraal, 1);
    lijn(ctx, [[g.x, g.y + g.h + 2], [g.x + g.w, g.y + g.h + 2]], C.line, 2); metaText(ctx, 'ÉÉN BLOKJE = MELDINGEN VAN ÉÉN DAG · MODEL', g.x + g.w, g.y + g.h + 40, C.text2, 'right', 20); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const tD = q.at('dossier', 1), tB = q.at('blokje', 1), tO = q.at('oefent', 1), tT = q.at('torenhoog', 1), Z = ramp(t, tD - 0.3, 1.1), P = 1 - clamp(Z * 3, 0, 1);
    const tijd = (d, i) => lerp(tO + 0.4, tT, Math.pow(d / KOUD.dagen, 0.75)) + i * 0.004;
    kantoor(ctx, Z, (c) => { const r = duo(c, t, { uitY: 'blij', poseF: 'wijsOmhoog', poseY: 'staan', aY: P, aF: P });
        naamBij(c, 'Yasmin', 'STAGIAIR', 560, 360, P, 'center'); naamBij(c, 'Epidemioloog Farid', 'GGD', 1420, 350, P, 'center'); },
      (c) => { vel(c, q.on('dossier', 1, 0.5)); koudCurve(c, tijd, t, 1, (j) => j === 0);
        const Bb = ramp(t, tB - 0.1, 0.3), u = ease(ramp(t, tB + 0.6, 0.9)), [px, py] = koudPos(0, 0); blokje(c, lerp(840, px, u), lerp(420, py, u), lerp(240, KOUD.bw, u), lerp(120, KOUD.bh, u), C.koraal, Bb, u < 0.5);
        metaA(c, 'ÉÉN BLOKJE = ÉÉN MELDING', 1770, 172, ramp(t, q.at('melding', 1), 0.4) * (1 - q.on('Waarom', 1)), C.text2, 'right', 22);
        laag(c, q.on('Waarom', 1) * 1, () => { roundRect(c, 180, 250, 720, 270, 18); shape(c, rgba('#0D1420', 0.92), rgba(C.goud, 0.85), 2.5);
          text(c, 'Waarom zo snel?', 250, 340, fTekst(52, 800), C.text, 'left'); laag(c, q.on('waarom', 2, 0.4), () => text(c, 'Waarom stopt het?', 250, 440, fTekst(52, 800), C.text, 'left')); vraagteken(c, 820, 430, 1, 110); }); }); },

  // ---------- H1 Het reproductiegetal R ----------
  s03(ctx, t, q) { const Z = ramp(t, q.at('Farid', 1) - 0.3, 1.4), P = clamp((t - q.at('pijlen', 1)) / 3, 0, 1), Pm = 1 - clamp(Z * 3, 0, 1);
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'neutraal', aY: Pm, aF: Pm }); },
      (c) => { dossierKop(c, 1); netwerk(c, { u: 1, p: P, doelA: 1 }); metaA(c, 'BRON- EN CONTACTONDERZOEK', 120, 140, q.on('contactonderzoek', 1, 0.4) * 1, C.goud, 'left', 26); });
    laag(ctx, ramp(t, q.at('Farid', 1) + 1.0, 0.3), () => persoon(ctx, 'farid', 300, 862, 360, { t, kijk: 1, pose: 'wijs', outfit: 'kantoor', uit: 'blij' })); },

  s04(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); metaA(ctx, 'BRON- EN CONTACTONDERZOEK', 120, 140, 1 - q.on('Tel', 1), C.goud, 'left', 26);
    const tTel = q.at('Tel', 1), tel = clamp((t - tTel) / 2.4, 0, 1) * 4, hl = tel > 0.01 && tel < 4 ? Math.floor(tel) : -1; netwerk(ctx, { u: 1, p: 1, tel, hl });
    const x0 = 1180, G = q.on('gemiddelde', 1), R = q.on('reproductiegetal', 1);
    laag(ctx, G, () => { metaText(ctx, 'GEMIDDELD PER ZIEKE', x0, 220, C.text2, 'left', 22); text(ctx, '(2 + 3 + 1 + 4) : 4', x0, 300, fTekst(48, 700), C.text, 'left'); });
    laag(ctx, R, () => { text(ctx, 'R = 2,5', x0, 400, fTitel(84), C.goud, 'left'); metaText(ctx, 'IN DIT OEFENDOSSIER', x0 + 330, 395, C.text2, 'left', 20); });
    laag(ctx, q.on('zegt', 1), () => { text(ctx, 'R = gemiddeld aantal mensen', x0, 490, fTekst(38, 700), C.text, 'left'); text(ctx, 'dat één zieke besmet', x0, 536, fTekst(38, 700), C.text, 'left'); });
    tag(ctx, 'R₀ = R als nog niemand immuun is', x0, 640, C.teal, q.on('nul', 1), 'left', 32);
    echtKaart(ctx, x0, 690, 600, 'CORONA · 2020', ['R₀ ≈ 2 à 3'], 'SCHATTINGEN VERSCHILLEN PER STUDIE', q.on('coronavirus', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const ry = persoon(ctx, 'yasmin', 420, 860, 420, { t, kijk: 1, uit: q.on('telt', 1) > 0.5 ? 'blij' : 'neutraal', pose: q.on('telt', 1) > 0.5 && q.on('Stel', 1) < 0.5 ? 'denk' : 'staan' });
    naamBij(ctx, 'Yasmin', '', 420, 410, 1 - q.on('telt', 1), 'center');
    // tientallen contacten om haar heen: bus, klas, training
    const grp = [['bus', 160, 300, 'bus'], ['klas', 160, 590, 'klas'], ['training', 690, 450, 'training']]; const T = q.on('telt', 1, 0.5);
    grp.forEach(([naam, gx, gy, cue], k) => { const L = q.on(cue, 1); for (let i = 0; i < 12; i++) { const x = gx + (i % 4) * 40 - (k === 2 ? 0 : 0), y = gy + Math.floor(i / 4) * 54; popje(ctx, x, y, 13, C.teal, L); } chip(ctx, naam, gx + 60, gy - 46, C.goud, L, 26); });
    metaA(ctx, 'AL GAUW TIENTALLEN', 470, 250, q.on('tientallen', 1), C.goud, 'center', 22);
    const sx = 1000, sw = 820; metaA(ctx, 'R HANGT VOORAL AF VAN', sx, 180, 1, C.text2, 'left', 22);
    const rij = [['contacten per dag', 'contacten', 1, '10', 'tien', 2, 10 / 30], ['kans per contact', 'kans', 1, '1/20', 'twintig', 1, 0.35], ['dagen besmettelijk', 'dagen', 1, '5', 'vijf', 1, 5 / 10]];
    rij.forEach(([naam, cue, n, w, cueW, nW, fr], i) => { const a = q.on(cue, n), v = q.on(cueW, nW); schuif(ctx, sx, 210 + i * 150, sw, naam, v > 0.5 ? w : '', fr * v, lerp(0.35, 1, a), C.goud); });
    laag(ctx, q.on('Stel', 1), () => { text(ctx, '10 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); laag(ctx, q.on('twee', 1), () => text(ctx, '2,5', sx + 400, 744, fTitel(72), C.goud, 'left')); metaText(ctx, 'REKENVOORBEELD', sx, 800, C.text2, 'left', 22); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Stel', 1, 1);
    herinnering(ctx, t, 1, lerp(1, 0.52, S), lerp(0, -112, S), lerp(0, 122, S));
    laag(ctx, S, () => { const sx = 1000, sw = 820; const H = q.on('helft', 1, 1); metaText(ctx, 'R HANGT VOORAL AF VAN', sx, 180, C.text2, 'left', 22);
      schuif(ctx, sx, 210, sw, 'contacten per dag', H > 0.5 ? '5' : '10', lerp(10 / 30, 5 / 30, H), 1, C.oker, { rand: C.oker, waardeKleur: C.oker });
      schuif(ctx, sx, 360, sw, 'kans per contact', '1/20', 0.35, 0.55, C.goud); schuif(ctx, sx, 510, sw, 'dagen besmettelijk', '5', 0.5, 0.55, C.goud);
      laag(ctx, H, () => { text(ctx, '5 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); text(ctx, 'R = ?', sx + 400, 744, fTitel(72), C.goud, 'left'); });
      metaA(ctx, 'HALF ZOVEEL CONTACTEN', sx + sw, 196, H, C.oker, 'right', 20); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('gewone', 1), A = 1 - ramp(t, tG - 0.4, 0.5), B = ramp(t, tG - 0.4, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord b: R wordt ook ongeveer de helft', 1); const sx = 1000, sw = 820;
      schuif(ctx, sx, 210, sw, 'contacten per dag', '5', 5 / 30, 1, C.oker, { rand: C.oker, waardeKleur: C.oker }); schuif(ctx, sx, 360, sw, 'kans per contact', '1/20', 0.35, 0.55, C.goud); schuif(ctx, sx, 510, sw, 'dagen besmettelijk', '5', 0.5, 0.55, C.goud);
      text(ctx, '5 × 1/20 × 5 =', sx, 740, fTekst(48, 700), C.text, 'left'); const V = q.on('komma', 1, 0.3); laag(ctx, 1 - V, () => text(ctx, 'R = ?', sx + 400, 744, fTitel(72), C.goud, 'left')); laag(ctx, V, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(sx + 390, 670, 420, 90); text(ctx, '1,25', sx + 400, 744, fTitel(72), C.goud, 'left'); metaText(ctx, 'WAS 2,5', sx + 630, 740, C.text2, 'left', 22); });
      const E = q.on('eigenschap', 1), O = q.on('omgaan', 1); virusIcoon(ctx, 280, 470, 62, E, t); naamBij(ctx, 'het virus', '', 280, 610, E, 'center', C.paars);
      laag(ctx, O, () => text(ctx, '+', 470, 490, fTitel(80), C.text, 'center')); laag(ctx, O, () => { for (let i = 0; i < 6; i++) popje(ctx, 600 + (i % 3) * 70 + (q.on('mee', 1) * (i % 3 - 1) * 26), 430 + Math.floor(i / 3) * 80, 18, C.oker, 1); }); naamBij(ctx, 'wat mensen doen', '', 670, 610, O, 'center', C.oker);
      metaA(ctx, 'R HANGT AF VAN', 120, 320, E, C.text2, 'left', 22); });
    laag(ctx, B, () => { const yb = 790, k = 30, xs = [520, 960, 1400], bw = 200; metaText(ctx, 'R₀ OF R · SCHATTINGEN · VUISTREGELS', 120, 200, C.text2, 'left', 22); metaText(ctx, 'BRONNEN: BIGGERSTAFF E.A. 2014 · CHOWELL E.A. 2008 (GRIEP) · LIU E.A. 2020, RIVM 2020 (CORONA) · LCI/RIVM (MAZELEN)', 960, 846, C.text2, 'center', 18);
      lijn(ctx, [[260, yb], [1680, yb]], C.line, 2); for (let v = 0; v <= 18; v += 6) { const y = yb - v * k; ctx.fillStyle = C.line; ctx.fillRect(250, y - 1, 10, 2); metaText(ctx, String(v), 236, y + 8, C.text2, 'right', 22); }
      const staaf = (x, lo, hi, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - bw / 2, yb - lo * k, bw, lo * k, 6); shape(ctx, rgba(col, 0.75), col, 2); if (hi > lo) { roundRect(ctx, x - bw / 2, yb - hi * k, bw, (hi - lo) * k, 6); ctx.setLineDash([8, 6]); shape(ctx, rgba(col, 0.25), col, 2); ctx.setLineDash([]); } ctx.restore(); };
      const Gp = q.on('griep', 1), M = q.on('mazelen', 1);
      staaf(xs[0], 1.3, 1.3, C.teal, Gp); naamBij(ctx, 'seizoensgriep ≈ 1,3', 'VEEL MENSEN AL DEELS IMMUUN', xs[0], yb - 1.3 * k - 42, Gp, 'center');
      staaf(xs[1], 2, 3, C.koraal, 1); naamBij(ctx, 'corona 2020 ≈ 2–3', 'R₀', xs[1], yb - 3 * k - 46, 1, 'center');
      staaf(xs[2], 12, 18, C.koraal, M); naamBij(ctx, 'mazelen: vaak 12–18', 'R₀', xs[2] + 130, yb - 18 * k + 24, M, 'left'); }); },

  // ---------- H2 Exponentiële groei en de curve afvlakken ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); tijdas(ctx, 1);
    const N = clamp((t - q.at('nul', 1)) / 1.2, 0, 1), V = clamp((t - q.at('twintig', 1)) / 1.4, 0, 1); tijdStapels(ctx, [N, V]);
    const H = q.on('Hoeveel', 1); [2, 3, 4].forEach(i => { laag(ctx, H, () => { const x = TIJDAS.x[i]; roundRect(ctx, x - 60, TIJDAS.yb - 150, 120, 150, 10); ctx.setLineDash([10, 8]); ctx.strokeStyle = i === 4 ? C.goud : C.line; ctx.lineWidth = i === 4 ? 3 : 2; ctx.stroke(); ctx.setLineDash([]); text(ctx, '?', x, TIJDAS.yb - 55, fTitel(64), i === 4 ? C.goud : C.text2, 'center'); }); });
    tag(ctx, 'R blijft hetzelfde', 620, 420, C.text2, q.on('blijft', 1), 'center', 30);
    persoon(ctx, 'farid', 1800, 860, 340, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'blij' }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); tijdas(ctx, 1); antwoord(ctx, 'antwoord c: ongeveer 160, elke vijf dagen keer twee', 1 - q.on('RIVM', 1));
    const f = (cue, d) => clamp((t - q.at(cue, 1)) / d, 0, 1); const u = [1, 1, f('veertig', 0.8), f('tachtig', 1.0), f('honderdzestig', 1.4)]; tijdStapels(ctx, u);
    [0, 1, 2, 3].forEach(i => keer2(ctx, i, clamp(u[i + 1] * 2 - 1, 0, 1) * q.on('verdubbelt', 1)));
    // lineair: elke 5 dagen 10 erbij → 10, 20, 30, 40, 50 (stippellijn langs de toppen)
    const L = q.on('tien', 1, 0.8); if (L > 0.01) { const pts = TIJDAS.x.map((x, i) => [x, stapelTop(TIJDAS.yb, 10 + i * 10)]); ctx.save(); ctx.globalAlpha *= L; ctx.setLineDash([12, 9]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
      pts.slice(2).forEach(p => circ(ctx, p[0], p[1], 7, rgba(C.text2, L), null)); naamBij(ctx, '- - -  elke 5 dagen 10 erbij', 'ZO GAAT HET NIET', 180, 300, L * (1 - q.on('RIVM', 1)), 'left', C.text2); }
    tag(ctx, 'exponentiële groei', 980, 300, C.goud, q.on('exponentiële', 1) * (1 - q.on('RIVM', 1)), 'center', 34);
    tag(ctx, 'verdubbeltijd: 5 dagen', 460, 500, C.goud, q.on('verdubbeltijd', 1), 'center', 30);
    filmKaartje(ctx, 570, 340, 'Plek genoeg?', q.on('exponentiële', 1) * (1 - q.on('RIVM', 1)), 300);
    echtKaart(ctx, 300, 250, 700, 'MAART 2020 · RIVM', ['verdubbeling ± elke 5 à 6 dagen'], 'SCHATTING RIVM, TECHNISCHE BRIEFINGS 2020', q.on('RIVM', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); tijdas(ctx, 1); tijdStapels(ctx, [1, 1, 1, 1, 1], [0.5, 0.5, 0.5, 0.5, 0.5]);
    const yL = TIJDAS.yb - 25 * 13, u = clamp((t - q.at('lijn', 1)) / 1.6, 0, 1); laag(ctx, u > 0 ? 1 : 0, () => { ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.setLineDash([16, 9]); ctx.beginPath(); ctx.moveTo(180, yL); ctx.lineTo(lerp(180, 1660, ease(u)), yL); ctx.stroke(); ctx.restore(); });
    naamBij(ctx, 'wat de zorg aankan', 'OEFENDOSSIER · ZONDER GETAL', 440, yL + 50, q.on('zorg', 1), 'left', C.text);
    persoon(ctx, 'farid', 1800, 860, 340, { t, kijk: -1, pose: u > 0 && u < 1 ? 'wijs' : 'staan', outfit: 'kantoor', uit: 'neutraal' });
    const E = q.on('Normaal', 1); echtKaart(ctx, 300, 196, 1000, 'IC IN NEDERLAND · VOORJAAR 2020', [['normaal: ± 1150 ic-bedden', 1], ['piek, 7 april: 1424 coronapatiënten op de ic', q.on('veertienhonderd', 1)], ['opgeschaald naar ± 2400 bedden (5 april)', q.on('vierentwintighonderd', 1)]], 'LCPS · VWS · NVIC, 2020', E, { lh: 46 }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g1 = Object.assign({ max: MAX25 }, G1), g2 = Object.assign({ max: MAX25 }, G2);
    grafAssen(ctx, g1, 1); grafBalkjes(ctx, g1, RUN.vrij25(), 100, C.koraal, 1); icLijn(ctx, g1, IC, 1); grafTitel(ctx, g1, 'ZONDER MAATREGELEN · MODEL', 1);
    const M = q.on('maatregelen', 1), V = q.on('tweede', 1); laag(ctx, V, () => { grafAssen(ctx, g2, 1); icLijn(ctx, g2, IC, 1); grafTitel(ctx, g2, 'MET MAATREGELEN · MODEL', 1, C.oker); });
    grafBalkjes(ctx, g2, RUN.maat25(), maatTot(q.at('tekent', 1), t, 2.3), C.koraal, V, { rand: C.oker });
    metaA(ctx, 'MAATREGELEN HALF MAART 2020', 1010, 210, M * (1 - V), C.oker, 'left', 22);
    laag(ctx, q.on('afvlakken', 1), () => { tag(ctx, 'afvlakken?', 1390, 200, C.goud, 1, 'center', 32); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de zieken komen niet allemaal tegelijk', 1 - q.on('RIVM', 1) * 0.0);
    const S = ease(clamp((t - 0.3) / 1.6, 0, 1)), g1 = { max: MAX25, x: lerp(G1.x, GG.x, S), y: lerp(G1.y, GG.y, S), w: lerp(G1.w, GG.w, S), h: lerp(G1.h, GG.h, S), dagen: 100 }, g2 = { max: MAX25, x: lerp(G2.x, GG.x, S), y: lerp(G2.y, GG.y, S), w: lerp(G2.w, GG.w, S), h: lerp(G2.h, GG.h, S), dagen: 100 };
    grafAssen(ctx, g2, 1); grafAssen(ctx, g1, 1 - S); grafBalkjes(ctx, g1, RUN.vrij25(), 100, C.koraal, 1 - S * 0.65, { omlijn: S > 0.5 }); grafBalkjes(ctx, g2, RUN.maat25(), 100, C.koraal, 1, { rand: C.oker }); icLijn(ctx, g2, IC, 1); if (S < 0.99) icLijn(ctx, g1, IC, 1 - S, 1, false);
    grafTitel(ctx, g2, 'MODEL · STIPPEL = ZONDER MAATREGELEN', S);
    const r1 = RUN.vrij25(), r2 = RUN.maat25(), p1 = grafPt(GG, Object.assign(r1), grafPiek(r1)), p2 = grafPt(GG, r2, grafPiek(r2)); const gg = Object.assign({ max: MAX25 }, GG);
    const q1 = grafPt(gg, r1, grafPiek(r1)), q2 = grafPt(gg, r2, grafPiek(r2)); const L = q.on('lager', 1), La = q.on('later', 1);
    laag(ctx, L * S, () => { pijl(ctx, q1[0] + 40, q1[1] + 10, q1[0] + 40, q2[1] - 20, C.goud, 1, 5, 18); text(ctx, 'lager', q1[0] + 64, (q1[1] + q2[1]) / 2, fTekst(36, 700), C.goud, 'left'); });
    laag(ctx, La * S, () => { pijl(ctx, q1[0] + 40, q2[1] - 26, q2[0] - 10, q2[1] - 26, C.goud, 1, 5, 18); text(ctx, 'later', q2[0] + 14, q2[1] - 12, fTekst(36, 700), C.goud, 'left'); });
    const R = q.on('RIVM', 1), E1 = q.on('één', 1, 1.0), E2 = q.on('eronder', 1, 1.0), Rv = lerp(2.5, 1, E1) - 0.2 * E2;
    rMeter(ctx, 1590, 450, 140, Rv, R, { kop: 'R IN NEDERLAND · VOORJAAR 2020', bron: 'SCHATTING RIVM, 2020', onder: 'NA DE MAATREGELEN VAN HALF MAART', tekst: E2 > 0.5 ? 'daarna onder de 1' : E1 > 0.5 ? 'rond de 1' : 'begin: ± 2 à 3', tekstKleur: E2 > 0.5 ? C.groen : C.text });
    tag(ctx, 'R < 1: dooft langzaam uit', 1590, 820, C.groen, q.on('dooft', 1), 'center', 30); },

  s16(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g = { x: 160, y: 300, w: 1200, h: 440, dagen: 60, max: 2100 }, run = RUN.maat25(), nu = 48, wacht = 14;
    grafAssen(ctx, g, 1, { stap: 10, yl: 'MELDINGEN PER DAG' }); const J = clamp((t - q.at('week', 1) - 0.3) / 1.5, 0, 1);
    grafBalkjes(ctx, g, run, nu - wacht, C.koraal, 1); const run2 = run.slice(0, nu); const bw = g.w / g.dagen;
    for (let d = nu - wacht; d < nu; d++) { const bh = run[d].nieuw * 1e5 / g.max * g.h; const lowH = bh * (0.15 + 0.85 * clamp(J * 1.4 - (d - nu + wacht) / wacht * 0.4, 0, 1)) * (J > 0 ? 1 : 0.15 + 0.6 * Math.pow((nu - d) / wacht, 2)); blokLeeg(ctx, g.x + d * bw + 1, g.y + g.h - bh, bw - 2, bh, 1, C.line); if (lowH > 1) blokje(ctx, g.x + d * bw + 1, g.y + g.h - lowH, bw - 2, lowH, C.koraal, 1); }
    const xn = g.x + nu * bw; lijn(ctx, [[xn, g.y - 20], [xn, g.y + g.h]], C.goud, 3); metaText(ctx, 'VANDAAG', xn, g.y - 30, C.goud, 'center', 22);
    naamBij(ctx, 'nog niet gemeld', 'NOG NIET IN DE TELLING', xn + 18, g.y + 160, q.on('gemeld', 1) * (1 - J), 'left', C.text2);
    const k = [['besmet', 'besmet', 380], ['ziek', 'ziek', 640], ['gemeld', 'gemeld', 900]]; k.forEach(([s2, cue, x], i) => { chip(ctx, s2, x, 210, i ? C.text2 : C.koraal, q.on(cue, 1), 30); if (i) pijl(ctx, x - 200, 200, x - 80, 200, C.line, q.on(cue, 1), 3, 14); });
    tag(ctx, 'twee weken later', 640, 290, C.goud, J, 'center', 30); naamBij(ctx, 'R van vandaag', 'PAS NA ± 2 WEKEN TE SCHATTEN', xn + 18, g.y + 40, q.on('hoog', 1), 'left', C.goud);
    persoon(ctx, 'farid', 1700, 860, 360, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: 'blij' }); },

  // ---------- H3 Groepsimmuniteit ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const run = RUN.r3(), g = { x: 160, y: 230, w: 1000, h: 300, dagen: 100, max: 8700 }, tot = 12;
    grafAssen(ctx, g, 1); grafBalkjes(ctx, g, run, tot, C.koraal, 1); grafTitel(ctx, g, 'MODEL · R₀ = 3', q.on('drie', 1));
    const B = q.on('balk', 1, 0.8), fr = 1 - run[tot].S; balkImmuun(ctx, 160, 640, 1000, fr, B, { streep: [[1 / 3, q.on('Welk', 1)], [2 / 3, q.on('Welk', 1)], [1, q.on('Welk', 1)]] });
    metaA(ctx, 'IMMUUN · NA BESMETTING OF VACCIN', 160, 615, B * q.on('besmetting', 1), C.groen, 'left', 22); metaA(ctx, 'IMMUUN', 160, 615, B * (1 - q.on('besmetting', 1)), C.groen, 'left', 22);
    naamBij(ctx, 'vatbaar', 'NOG NIET IMMUUN', 1160, 740, q.on('vatbaar', 1), 'right', C.teal); metaA(ctx, '0 %', 160, 740, B, C.text2, 'left', 22);
    // één zieke, drie mensen die hij zou aansteken
    const D = q.on('drie', 1), x0 = 1330, y0 = 470; laag(ctx, D, () => { popje(ctx, x0, y0, 30, C.koraal, 1); [[1620, 300], [1660, 470], [1620, 640]].forEach(([x, y]) => { pijl(ctx, x0 + 40, y0 - 20, x - 40, y - 20, C.oker, 1, 4, 14); popje(ctx, x, y, 26, C.teal, 1); }); text(ctx, 'R₀ = 3', x0, y0 + 100, fTekst(44, 800), C.goud, 'center'); });
    vraagteken(ctx, 1500, 840, q.on('denk', 1), 90); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer twee derde', 1);
    const x0 = 320, y0 = 420, doel = [[620, 270], [660, 420], [620, 570]], T = q.on('twee', 1, 0.8), K = q.on('niet', 1);
    popje(ctx, x0, y0, 30, C.koraal, 1); doel.forEach(([x, y], i) => { const imm = i < 2 ? T : 0; pijl(ctx, x0 + 40, y0 - 20, lerp(x0 + 40, x - 40, i < 2 ? 1 - 0.55 * T : 1), lerp(y0 - 20, y - 20, i < 2 ? 1 - 0.55 * T : 1), C.oker, i < 2 ? 1 - 0.7 * T : 1, 4, 14); if (i < 2) kruis(ctx, (x0 + x) / 2 + 30, (y0 + y) / 2 - 20, 14, T * 0.9); popje(ctx, x, y, 26, imm > 0.5 ? C.groen : C.teal, 1); });
    naamBij(ctx, 'immuun', '', 720, 340, T, 'left', C.groen); laag(ctx, T * (1 - q.on('iets', 1)), () => text(ctx, 'R = 1', x0, y0 + 100, fTekst(44, 800), C.goud, 'center')); laag(ctx, q.on('iets', 1), () => text(ctx, 'R < 1', x0, y0 + 100, fTekst(44, 800), C.groen, 'center'));
    laag(ctx, K, () => { circ(ctx, 620, 545, 46, null, C.goud, 3); naamBij(ctx, 'niet immuun', 'LOOPT DAN MINDER KANS', 684, 520, 1, 'left', C.teal); });
    const fx = 1080, S1 = q.on('som', 1), S2 = q.on('min', 2, 0.4), S3 = q.on('twee', 2, 0.4);
    laag(ctx, S1, () => { metaText(ctx, 'DREMPEL', fx, 230, C.text2, 'left', 22); text(ctx, '1 − 1/R₀', fx, 310, fTitel(64), C.text, 'left'); });
    laag(ctx, S2, () => text(ctx, '= 1 − 1/3', fx + 330, 310, fTitel(64), C.text, 'left')); laag(ctx, S3, () => text(ctx, '= 2/3 ≈ 67 %', fx, 410, fTitel(72), C.goud, 'left'));
    const bx = 200, bw = 1200; const G = q.on('groepsimmuniteit', 1);
    laag(ctx, S3, () => { metaText(ctx, 'R₀ = 3', bx, 610, C.text2, 'left', 22); balkImmuun(ctx, bx, 630, bw, 2 / 3, 1, { drempel: 2 / 3 }); text(ctx, '67 %', bx + bw * 2 / 3, 720, fTekst(32, 800), C.goud, 'center'); });
    tag(ctx, 'groepsimmuniteit', 1300, 580, C.groen, G, 'center', 32);
    const M = q.on('mazelen', 1), M2 = q.on('vijfennegentig', 1); laag(ctx, M, () => { metaText(ctx, 'MAZELEN · R₀ VAAK 12–18', bx, 770, C.text2, 'left', 22); balkImmuun(ctx, bx, 790, bw, 0.95 * M2, 1, { drempel: 0.95, dA: M2 }); laag(ctx, M2, () => text(ctx, '± 95 %', bx + bw + 24, 828, fTekst(32, 800), C.goud, 'left')); });
    filmKaartje(ctx, 1080, 440, 'Vaccins, allergie en bloedgroepen', M, 520);
    metaA(ctx, 'VUISTREGEL · IN HET ECHT GEEN WILLEKEURIGE MENGING', 120, 206, q.on('vuistregel', 1), C.grain, 'left', 20); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const run = RUN.r3(), g = { x: 160, y: 230, w: 1400, h: 400, dagen: 100, max: 8700 };
    metaText(ctx, 'MODEL · R₀ = 3 · GEEN MAATREGELEN', 160, 150, C.grain, 'left', 24); grafAssen(ctx, g, 1);
    const N = q.on('niemand', 1), tot = 6 + 7 * clamp((t - q.at('niemand', 1)) / 4, 0, 1); grafBalkjes(ctx, g, run, tot, C.koraal, 1);
    const D = clamp((t - q.at('tekent', 1)) / 1.2, 0, 1); balkImmuun(ctx, 160, 730, 1400, 1 - run[Math.floor(tot)].S, 1, { drempel: 2 / 3, dA: D > 0 ? 1 : 0 });
    if (D > 0 && D < 1) { ctx.save(); ctx.fillStyle = C.goud; ctx.fillRect(160 + 1400 * 2 / 3 - 4, 712, 8, 82 * D); ctx.restore(); }
    metaText(ctx, 'OOIT BESMET (IMMUUN OF NU ZIEK)', 160, 710, C.grain, 'left', 22); naamBij(ctx, 'drempel', '2/3', 160 + 1400 * 2 / 3, 840, D, 'center', C.goud);
    vraagteken(ctx, 1200, 420, q.on('voorbij', 1), 110);
    persoon(ctx, 'farid', 1770, 860, 360, { t, kijk: -1, pose: D > 0 && D < 1 ? 'wijs' : 'staan', outfit: 'kantoor', uit: 'neutraal' }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: zieken vinden te weinig vatbare mensen', 1 - q.on('gouden', 1)); const run = RUN.r3(), g = { x: 160, y: 230, w: 1400, h: 400, dagen: 100, max: 8700 };
    metaA(ctx, 'MODEL · R₀ = 3 · GEEN MAATREGELEN', 160, 150, q.on('gouden', 1), C.grain, 'left', 24); grafAssen(ctx, g, 1);
    const kd = kruisDag(run, 2 / 3), tG = q.at('gouden', 1), tD = q.at('schiet', 1); const tE = q.at('één', 1); let tot = t < tE ? lerp(13, kd + 1, clamp(t / (tE - 0.2), 0, 1)) : lerp(kd + 1, 100, clamp((t - tE) / Math.max(1, tD - tE), 0, 1));
    grafBalkjes(ctx, g, run, tot, C.koraal, 1); const d = Math.min(99, Math.floor(tot)), fr = 1 - run[d].S;
    const Reff = 3 * run[d].S; chip(ctx, 'R nu ≈ ' + (Math.round(Reff * 10) / 10).toString().replace('.', ','), 1440, 300, Reff < 1 ? C.groen : C.koraal, q.on('zakt', 1, 0.4), 32);
    let kI = 0; run.forEach((r, i) => { if (r.I > run[kI].I) kI = i; }); const Imax = run[kI].I, iy = (i) => g.y + g.h - run[i].I / Imax * g.h * 0.92, ix = (i) => g.x + (i + 0.5) * g.w / g.dagen;
    ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i <= Math.min(99, Math.floor(tot)); i++) { i ? ctx.lineTo(ix(i), iy(i)) : ctx.moveTo(ix(i), iy(i)); } ctx.stroke(); ctx.restore();
    naamBij(ctx, 'tegelijk ziek', 'MODEL', ix(kI) + 60, iy(kI) + 40, clamp((tot - kI - 4) / 3, 0, 1), 'left', C.text); naamBij(ctx, 'nieuwe zieken per dag', '', ix(kI) + 60, g.y + g.h - 120, clamp((tot - kI - 4) / 3, 0, 1), 'left', C.koraal);
    const kx = ix(kI), K = tot >= kI ? 1 : 0; stippel(ctx, kx, g.y - 10, kx, g.y + g.h, C.goud, K, 4); tag(ctx, 'VANAF HIER MINDER MENSEN TEGELIJK ZIEK', kx + 20, g.y + 10, C.goud, K, 'left', 26);
    balkImmuun(ctx, 160, 730, 1400, fr, 1, { drempel: 2 / 3, door: q.on('schiet', 1) }); metaText(ctx, 'OOIT BESMET (IMMUUN OF NU ZIEK)', 160, 710, C.grain, 'left', 22);
    naamBij(ctx, 'doorschieten', '', 160 + 1400 * 0.8, 836, q.on('schiet', 1), 'center', C.text);
    naamBij(ctx, 'model: ± 94 %', 'UITEINDELIJK', 1590, 756, q.on('negen', 1), 'left', C.groen);  },

  // ---------- H4 Maatregelen doorrekenen met een model ----------
  s23(ctx, t, q) { const tM = q.at('model', 1), Z = ramp(t, tM - 0.3, 1.5), Bk = ramp(t, tM + 0.4, 0.8);
    kantoor(ctx, Z, (c) => { duo(c, t, { poseF: 'wijsOmhoog', uitY: 'blij' }); naamBij(c, 'dossier', 'WAT ER GEBEURD IS', SCR.x + SCR.w / 2 - 60, SCR.y + SCR.h + 52, q.on('dossier', 1) * (1 - Z), 'center'); },
      (c) => { laag(c, 1 - Bk, () => miniDossier(c, t)); laag(c, Bk, () => { const st = { S: 0.55, I: 0.2, R: 0.25 }; modelBakken(c, st, [q.on('vatbaar', 1), q.on('besmettelijk', 1), q.on('hersteld', 1)], t, q.on('schuiven', 1));
        metaText(c, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22); }); });
  },

  s24(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22); const H = q.on('helft', 1, 0.8);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1);
    knop(ctx, 360, 590, 64, lerp(1, 0.5, H), q.on('knop', 1), 'CONTACTEN'); chip(ctx, 'thuiswerken', 360, 812, C.oker, q.on('Thuiswerken', 1), 28);
    metaA(ctx, 'AANNAME: MENSEN HOUDEN ZICH ERAAN', 720, 856, q.on('neemt', 1), C.oker, 'left', 22);
    const g = { x: 720, y: 500, w: 1080, h: 260, dagen: 100, max: 8700 }, M = q.on('model', 1); laag(ctx, Math.max(M, 0), () => { grafAssen(ctx, g, 1); grafTitel(ctx, g, 'MODEL · OEFENSTAD · 100.000 INWONERS', 1); });
    grafBalkjes(ctx, g, RUN.r3(), 100, C.koraal, M, { omlijn: true }); grafBalkjes(ctx, g, RUN.r15(), maatTot(q.at('model', 1) + 0.3, t, 2.5), C.koraal, M, { rand: C.oker });
    naamBij(ctx, 'stippel: knop op 100 %', '', 1160, 560, M, 'left', C.text2); },

  s25(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MODEL · KERMACK & MCKENDRICK, 1927', 120, 120, C.grain, 'left', 22);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1); knop(ctx, 360, 590, 64, 0.5, 1, 'CONTACTEN');
    const g = { x: 720, y: 500, w: 1080, h: 260, dagen: 100, max: 8700 }, run = RUN.r15(); grafAssen(ctx, g, 1); grafTitel(ctx, g, 'MODEL · OEFENSTAD · 100.000 INWONERS', 1);
    grafBalkjes(ctx, g, RUN.r3(), 100, C.koraal, 1, { omlijn: true }); grafBalkjes(ctx, g, run, 100, C.koraal, 1, { rand: C.oker });
    const p = grafPt(Object.assign({}, g), run, grafPiek(run)); const G = q.on('getal', 1); laag(ctx, G, () => { roundRect(ctx, p[0] - 120, p[1] - 92, 240, 64, 14); shape(ctx, rgba(C.goud, 0.18), C.goud, 2.5); text(ctx, 'piek: 1300', p[0], p[1] - 46, fTekst(36, 800), C.text, 'center'); });
    vraagteken(ctx, p[0] + 170, p[1] - 20, q.on('zegt', 1), 80); metaA(ctx, 'NIEUWE ZIEKEN PER DAG', p[0], p[1] - 110, G, C.text2, 'center', 18); },

  s27(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: wat er gebeurt als de aannames kloppen', 1);
    const V = q.on('Verandert', 1, 1.2), R = q.on('RIVM', 1);
    modelBakken(ctx, { S: 0.55, I: 0.2, R: 0.25 }, [1, 1, 1], t, 1, { namen: 1 }); knop(ctx, 360, 590, 64, lerp(0.5, 0.6, V), 1, 'CONTACTEN');
    chip(ctx, 'aanname: hoe lang besmettelijk?', 960, 470, C.oker, q.on('aannames', 1), 26); chip(ctx, 'aanname: hoe gedragen mensen zich?', 360, 812, C.oker, q.on('aannames', 1), 26);
    const g = { x: 720, y: 540, w: 1080, h: 240, dagen: 100, max: 8700 }; laag(ctx, 1 - R, () => { grafAssen(ctx, g, 1); grafTitel(ctx, g, 'SCENARIO, GEEN VOORSPELLING', q.on('zekere', 1), C.goud);
      grafBalkjes(ctx, g, RUN.r15(), 100, C.koraal, V, { omlijn: true }); grafBalkjes(ctx, g, RUN.r15(), 100, C.koraal, 1 - V, { rand: C.oker }); grafBalkjes(ctx, g, RUN.r18(), 100, C.koraal, V, { rand: C.oker }); naamBij(ctx, 'andere aanname, andere uitkomst', '', 1780, 590, V, 'right', C.goud); });
    echtKaart(ctx, 760, 520, 1000, 'MAART 2020 · RIVM', [['scenario’s telkens bijgesteld', 1], ['aanname: hoe lang op de ic?  ↑ langer dan eerst gedacht', q.on('langer', 1)]], 'RIVM, TECHNISCHE BRIEFING 1 APRIL 2020', R, { lh: 50 }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); dossierKop(ctx, 1); const g = { x: 140, y: 250, w: 1100, h: 480, dagen: 80, max: 2000 }, run = RUN.r15(), bw = g.w / g.dagen;
    grafAssen(ctx, g, 1, { stap: 20, yl: 'NIEUWE ZIEKEN PER DAG' }); const tot = 70;
    for (let d = 0; d < 70; d++) { if (tot < d) break; const f = 1 + (d > 38 ? 0.012 * (d - 38) : 0) + (hash(d * 3.7) - 0.5) * 0.12; const bh = run[d].nieuw * 1e5 * f / g.max * g.h; blokje(ctx, g.x + d * bw + 1, g.y + g.h - bh, bw - 2, Math.max(1, bh), C.koraal, clamp(tot - d, 0, 1)); }
    const M = q.on('model', 1, 1.2); if (M > 0.01) { ctx.save(); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = Math.floor(80 * M); for (let d = 0; d < n; d++) { const [x, y] = grafPt(g, run, d); d ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    laag(ctx, M, () => { lijn(ctx, [[190, 300], [250, 300]], C.text, 5); text(ctx, 'model', 270, 312, fTekst(34, 700), C.text, 'left'); }); blokje(ctx, 190, 336, 60, 28, C.koraal); text(ctx, 'dossier: meldingen', 270, 362, fTekst(34, 700), C.koraal, 'left');
    const E = q.on('elkaar', 1); laag(ctx, E, () => { ctx.save(); ctx.beginPath(); ctx.ellipse(g.x + 56 * bw, g.y + g.h * 0.42, 150, 150, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.stroke(); ctx.restore(); });
    tag(ctx, 'hier past een aanname niet', 760, 210, C.goud, q.on('aanname', 1), 'center', 30);
    persoon(ctx, 'yasmin', 1450, 860, 400, { t, kijk: -1, pose: E > 0.5 ? 'wijs' : 'staan', uit: E > 0.5 ? 'verbaasd' : 'neutraal' });
    persoon(ctx, 'farid', 1720, 860, 400, { t, kijk: -1, pose: 'staan', outfit: 'kantoor', uit: q.on('zegt', 1) > 0.5 ? 'blij' : 'neutraal' }); },

  // ---------- Recap ----------
  s29(ctx, t, q) { kantoorVlak(ctx); ctx.save(); roundRect(ctx, SCR.x, SCR.y, SCR.w, SCR.h, 2); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(SCR.x, SCR.y, SCR.w, SCR.h); ctx.translate(SCR_O[0], SCR_O[1]); ctx.scale(SCR_K, SCR_K); miniDossier(ctx, t); ctx.restore();
    duo(ctx, t, { yx: 1460, fx: 1700, poseF: 'staan', uitY: 'blij' });
    const kaarten = [['R: hoeveel steekt één zieke aan', 'omdat', (x, y) => { blokje(ctx, x - 100, y - 18, 56, 36, C.koraal); [-40, 0, 40].forEach(dy => { pijl(ctx, x - 40, y, x + 40, y + dy, C.oker, 1, 3, 12); blokje(ctx, x + 50, y + dy - 14, 40, 28, C.koraal); }); }],
      ['R > 1: keer twee, keer twee', 'Dan', (x, y) => { [6, 12, 24, 48].forEach((n, i) => { for (let k = 0; k < n / 6; k++) blokje(ctx, x - 110 + i * 64, y + 46 - (k + 1) * 13, 46, 11, C.koraal); }); }],
      ['drempel: 1 − 1/R₀', 'zonder', (x, y) => balkImmuun(ctx, x - 140, y - 18, 280, 0.8, 1, { drempel: 2 / 3, h: 36 })],
      ['model: wat als …', 'schiet', (x, y) => { bakVorm(ctx, x - 150, y - 30, 80, 60, C.teal); bakVorm(ctx, x - 40, y - 30, 80, 60, C.koraal); bakVorm(ctx, x + 70, y - 30, 80, 60, C.groen); }]];
    kaarten.forEach(([kop, cue, teken], i) => recapKaart(ctx, 60 + (i % 2) * 520, 460 + Math.floor(i / 2) * 210, 500, 190, kop, q.on(cue, 1), teken)); },

  s30(ctx, t, q) { kantoorVlak(ctx); roundRect(ctx, 100, 120, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 190, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 186, C.grain, 'right', 22);
    const rij = [['wo', 'Biomedische Wetenschappen → master', 'BIOMEDICAL SCIENCES, RICHTING EPIDEMIOLOGY (ENGELS) · NIJMEGEN', 'Nijmegen'], ['wo', 'Gezondheidswetenschappen', 'ENSCHEDE · AMSTERDAM · MAASTRICHT', 'Gezondheidswetenschappen'], ['werk', 'bijv. epidemioloog bij GGD of RIVM', 'MET EEN MASTER', 'epidemioloog'], ['arts', 'geneeskunde, later infectieziekten', 'ZOALS YASMIN WIL', 'arts']];
    rij.forEach(([n, o, m, cue], i) => { const a = i ? q.on(cue, 1) : 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 250 + i * 155;
      roundRect(ctx, 100, y, 1180, 135, 18); shape(ctx, rgba('#0D1420', 0.9), i < 2 ? C.groen : C.goud, 2); text(ctx, n, 140, y + 84, fTitel(46), i < 2 ? C.groen : C.goud); text(ctx, o, 300, y + 64, fTekst(42, 700), C.text); metaText(ctx, m, 300, y + 106, C.grain, 'left', 18); ctx.restore(); });
    duo(ctx, t, { yx: 1460, fx: 1700, uitY: q.on('arts', 1) > 0.5 ? 'lacht' : 'blij' }); }
});
