
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
// Wat word jij? · Laboratoriumtechniek 1 · Preparaat en microscoop — eigen tekeningen (24 okt 2026)
// potje, paraffineBlok, microtoom, kleurBak, glaasje, labTafel en de HE-kleuren komen uit Geneeskunde 4 (Wat de patholoog ziet), licht aangepast.

function mixC(a, b, f) { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); f = clamp(f, 0, 1); const c = s => Math.round(((p >> s) & 255) * (1 - f) + ((q >> s) & 255) * f); return `rgb(${c(16)},${c(8)},${c(0)})`; }
const HE = { glas: '#F3EEF1', grijs: '#E4E0E5', grijsR: '#D6D1D8', roze: '#EDB0C6', rozeR: '#D98AA8', rozeL: '#F6CFDC', paars: '#55398C', paarsD: '#3B2470', bloed: '#D0465E' };
const LICHTVELD = '#EEEBE2'; // achtergrond van een helder-veldbeeld
const FL = { groen: '#7CE08A', blauw: '#6A8CFF' }; // fluorescentie (label groen, belichting blauw)

// ---------- uit Geneeskunde 4 ----------
function potje(ctx, x, y, s = 1, a = 1, t = 0, stukje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -110, 140, 190, 22); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); roundRect(ctx, -70, -110, 140, 190, 22); ctx.clip(); ctx.fillStyle = rgba('#DDEFF0', 0.22); ctx.fillRect(-70, -70 + Math.sin(t * 1.5) * 2, 140, 160); ctx.restore();
  roundRect(ctx, -78, -140, 156, 38, 10); shape(ctx, '#F2F2EE', '#C9CED6', 2);
  roundRect(ctx, -52, -30, 104, 54, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5); ctx.fillStyle = '#5A6478'; ctx.fillRect(-38, -16, 76, 5); ctx.fillRect(-38, -2, 54, 5);
  if (stukje > 0.01) { ctx.save(); ctx.globalAlpha *= stukje; const dy = 46 + Math.sin(t * 1.2) * 4; ctx.beginPath(); ctx.moveTo(-34, dy); ctx.quadraticCurveTo(-30, dy - 16, 0, dy - 14); ctx.quadraticCurveTo(34, dy - 12, 32, dy + 2); ctx.quadraticCurveTo(10, dy + 14, -34, dy); ctx.closePath(); shape(ctx, '#8E4A3E', '#6E382E', 2); ctx.restore(); }
  ctx.restore(); }
function paraffineBlok(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -100, -20, 200, 90, 8); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.fillStyle = rgba('#1A2740', 0.35); for (let i = 0; i < 7; i++) ctx.fillRect(-84 + i * 24, 6, 12, 50);
  ctx.beginPath(); ctx.moveTo(-80, -20); ctx.lineTo(-70, -110); ctx.lineTo(70, -110); ctx.lineTo(80, -20); ctx.closePath(); shape(ctx, '#EFE6CC', '#CDBF98', 2.5);
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(-60, -100, 20, 70);
  ctx.beginPath(); ctx.ellipse(4, -64, 40, 14, 0, 0, 6.283); shape(ctx, '#B88070', '#94604E', 1.5);
  ctx.restore(); }
function microtoom(ctx, x, y, s = 1, a = 1, t = 0, u = 0, draai = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -20, 340, 40, 10); shape(ctx, '#D8DEE6', '#8FA0B5', 2);
  roundRect(ctx, -40, -200, 170, 180, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2);
  const fase = draai ? (t * 1.4) % 1 : 0, by = -150 + Math.sin(fase * 6.283) * 26;
  roundRect(ctx, -20, by - 30, 50, 60, 6); shape(ctx, '#EFE6CC', '#CDBF98', 2); ctx.fillStyle = '#B88070'; ctx.fillRect(-20, by - 10, 10, 20);
  ctx.beginPath(); ctx.moveTo(-26, -136); ctx.lineTo(-90, -122); ctx.lineTo(-90, -108); ctx.lineTo(-26, -112); ctx.closePath(); shape(ctx, '#EEF2F6', '#7A8BA8', 2);
  ctx.save(); ctx.translate(150, -110); circ(ctx, 0, 0, 56, null, '#8FA0B5', 6); const an = fase * 6.283; ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * 56, Math.sin(an) * 56); ctx.stroke(); circ(ctx, Math.cos(an) * 56, Math.sin(an) * 56, 9, '#2A3446'); ctx.restore();
  if (u > 0.01) { const n = Math.round(u * 6); for (let i = 0; i < n; i++) { const sx = -100 - i * 40, sy = -112 + i * 3; ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.05); roundRect(ctx, -18, -4, 36, 22, 3); shape(ctx, rgba('#F4EEDC', 0.85), '#CDBF98', 1.2); ctx.fillStyle = rgba('#B88070', 0.8); ctx.fillRect(-12, 2, 10, 10); ctx.restore(); } }
  ctx.restore(); }
function kleurBak(ctx, x, y, s = 1, a = 1, col = HE.paars, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-90, -120); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-80, 60, -60, 60); ctx.lineTo(60, 60); ctx.quadraticCurveTo(80, 60, 80, 40); ctx.lineTo(90, -120); };
  pad(); ctx.fillStyle = rgba('#CFE4F0', 0.1); ctx.fill();
  ctx.save(); pad(); ctx.closePath(); ctx.clip(); ctx.beginPath(); ctx.moveTo(-100, -60); for (let i = 0; i <= 20; i++) ctx.lineTo(-100 + i * 10, -60 + Math.sin(t * 2 + i * 0.6) * 3); ctx.lineTo(100, 70); ctx.lineTo(-100, 70); ctx.closePath(); ctx.fillStyle = rgba(col, 0.85); ctx.fill(); ctx.restore();
  pad(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
// glaasje (objectglas); k 0 = ongekleurd plakje → 1 = HE
function glaasje(ctx, x, y, s = 1, a = 1, k = 0, plakje = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -45, 300, 90, 6); shape(ctx, rgba('#DCEBF4', 0.28), '#AFC0D0', 2.5); ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(-146, -41, 70, 82);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(-136, -20, 50, 5); ctx.fillRect(-136, -6, 40, 5);
  if (plakje > 0.01) { ctx.save(); ctx.globalAlpha *= plakje; ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); shape(ctx, mixC('#E4E0E5', HE.roze, k), rgba('#B9B4BC', 0.6 * (1 - k)), 1.5);
    if (k > 0.01) { ctx.beginPath(); ctx.ellipse(40, 0, 70, 26, 0, 0, 6.283); ctx.clip(); for (let i = 0; i < 26; i++) circ(ctx, -20 + hash(i * 3) * 120, -20 + hash(i * 3 + 1) * 40, 3, rgba(HE.paars, 0.8 * k)); } ctx.restore(); }
  ctx.restore(); }
function labTafel(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#C9D0DA', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 14, 880 - y - 22); ctx.restore(); }

// ---------- lichtmicroscoop (zijaanzicht, gebruiker links) ----------
// o: obj 0..3 (4×, 10×, 40×, 100×), grof/fijn = draaihoek van de schroeven, hl = 'oc'|'obj'|'grof'|'fijn'|'licht', licht 0..1, olie 0..1, glas 0..1
const OBJ = [{ v: '4×', L: 34, c: '#D8574A' }, { v: '10×', L: 44, c: '#E5C04A' }, { v: '40×', L: 56, c: '#5B8FD8' }, { v: '100×', L: 66, c: '#F2F2EE' }];
function lichtMicroscoop(ctx, x, y, s = 1, o = {}) { const { a = 1, obj = 0, grof = 0, fijn = 0, hl = null, licht = 1, olie = 0, glas = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const body = '#DDE3EA', rand = '#8FA0B5', donker = '#2A3446', HL = (k) => hl === k ? C.goud : rand, LW = (k) => hl === k ? 5 : 2.5;
  // voet met lichtbron
  roundRect(ctx, -150, -46, 300, 46, 14); shape(ctx, body, rand, 2.5);
  circ(ctx, 40, -46, 20, licht > 0.01 ? mixC('#C9CED6', '#FFF1B8', licht) : '#C9CED6', HL('licht'), LW('licht'));
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= 0.35 * licht; ctx.fillStyle = '#FFF1B8'; ctx.beginPath(); ctx.moveTo(26, -60); ctx.lineTo(54, -60); ctx.lineTo(48, -205); ctx.lineTo(32, -205); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // statief (arm)
  ctx.beginPath(); ctx.moveTo(-120, -46); ctx.lineTo(-60, -46); ctx.lineTo(-56, -300); ctx.quadraticCurveTo(-40, -400, 20, -420); ctx.lineTo(20, -380); ctx.quadraticCurveTo(-70, -360, -100, -300); ctx.closePath(); shape(ctx, body, rand, 2.5);
  // condensor en tafel
  roundRect(ctx, 18, -196, 44, 26, 5); shape(ctx, '#C9D0DA', rand, 2);
  roundRect(ctx, -70, -222, 230, 18, 5); shape(ctx, donker, rand, 2);
  if (glas > 0.01) { ctx.save(); ctx.globalAlpha *= glas; roundRect(ctx, -10, -232, 110, 10, 2); shape(ctx, rgba('#DCEBF4', 0.85), '#AFC0D0', 1.5); ctx.restore(); }
  // revolver met objectieven
  const ry = -330; ctx.beginPath(); ctx.moveTo(-6, ry - 26); ctx.lineTo(86, ry - 26); ctx.lineTo(96, ry + 6); ctx.lineTo(-16, ry + 6); ctx.closePath(); shape(ctx, body, HL('obj'), LW('obj'));
  const ob = OBJ[clamp(Math.round(obj), 0, 3)];
  [[-0.5, (obj + 3) % 4], [0.5, (obj + 1) % 4]].forEach(([rot, i]) => { const O = OBJ[Math.round(i) % 4]; ctx.save(); ctx.translate(40 + rot * 70, ry + 4); ctx.rotate(rot); roundRect(ctx, -11, 0, 22, O.L * 0.8, 4); shape(ctx, '#B8C2CE', rand, 1.5); ctx.fillStyle = O.c; ctx.fillRect(-11, O.L * 0.8 - 12, 22, 4); ctx.restore(); });
  roundRect(ctx, 26, ry + 4, 28, ob.L * 1.25, 5); shape(ctx, '#C9D0DA', HL('obj'), LW('obj')); ctx.fillStyle = ob.c; ctx.fillRect(26, ry + 4 + ob.L * 1.25 - 16, 28, 6);
  const objTip = ry + 4 + ob.L * 1.25;
  if (olie > 0.01) { ctx.save(); ctx.globalAlpha *= olie; ctx.beginPath(); ctx.ellipse(40, (objTip - 232) / 2 + 232 - 2 + (objTip - 232 < 0 ? 0 : 0), 12, Math.max(3, (-232 - objTip) / 2 + 3), 0, 0, 6.283); ctx.fillStyle = rgba(C.goud, 0.75); ctx.fill(); ctx.restore(); }
  // tubus en oculair
  roundRect(ctx, 14, -420, 52, 92, 8); shape(ctx, body, rand, 2.5);
  ctx.save(); ctx.translate(30, -418); ctx.rotate(-0.55); roundRect(ctx, -18, -110, 36, 112, 6); shape(ctx, donker, HL('oc'), LW('oc')); roundRect(ctx, -22, -122, 44, 18, 5); shape(ctx, '#3A4458', HL('oc'), LW('oc')); ctx.restore();
  // grote en fijne schroef (gestapeld op het statief)
  const kx = -78, ky = -150;
  circ(ctx, kx, ky, 40, body, HL('grof'), LW('grof')); for (let i = 0; i < 12; i++) { const an = grof + i * 0.5236; ctx.strokeStyle = rgba(rand, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kx + Math.cos(an) * 30, ky + Math.sin(an) * 30); ctx.lineTo(kx + Math.cos(an) * 39, ky + Math.sin(an) * 39); ctx.stroke(); }
  circ(ctx, kx, ky, 19, '#C9D0DA', HL('fijn'), LW('fijn')); ctx.strokeStyle = donker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(fijn) * 15, ky + Math.sin(fijn) * 15); ctx.stroke();
  ctx.restore();
  const P = (px, py) => ({ x: x + px * s, y: y + py * s });
  return { oc: P(30 - 0.52 * 116, -418 - 0.85 * 116), obj: P(40, objTip - 20), objTip: P(40, objTip), grof: P(kx, ky), fijn: P(kx, ky), licht: P(40, -46), tafel: P(45, -222), objV: ob.v };
}

// ---------- kijkveld (rond beeld door het oculair) ----------
function kijkVeld(ctx, cx, cy, r, a, bgCol, inner) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = bgCol; ctx.fill(); ctx.save(); ctx.clip(); if (inner) inner(); ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r + 7, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 16; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); }
// kweekcellen in een helder veld; k = contrast 0..1, blur 0..1 (onscherp), zoom = schaal
function kweekCellen(ctx, cx, cy, R, o = {}) { const { k = 0, blur = 0, zoom = 1, n = 14, seed = 3, t = 0, hlRand = 0 } = o;
  const cel = (x, y, r, i) => { const wob = (an) => 1 + 0.06 * Math.sin(an * 3 + i) + 0.04 * Math.sin(an * 5 + i * 2);
      const pad = () => { ctx.beginPath(); for (let j = 0; j <= 36; j++) { const an = j / 36 * 6.283; const rr = r * wob(an); j ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); };
      pad(); ctx.fillStyle = `rgba(150,140,120,${0.03 + 0.22 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(90,86,76,${0.10 + 0.5 * k + 0.35 * hlRand})`; ctx.lineWidth = 2.2 + 1.5 * hlRand; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + r * 0.15, y - r * 0.1, r * 0.36, r * 0.32, i, 0, 6.283); ctx.fillStyle = `rgba(90,76,120,${0.02 + 0.35 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(80,70,100,${0.03 + 0.3 * k})`; ctx.lineWidth = 1.5; ctx.stroke();
      for (let m = 0; m < 6; m++) { const an = hash(i * 9 + m) * 6.283, d = r * (0.45 + 0.3 * hash(i * 9 + m + 3)); circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * 0.05, `rgba(110,100,90,${0.02 + 0.25 * k})`); } };
  const copies = blur > 0.02 ? 5 : 1;
  for (let c = 0; c < copies; c++) { ctx.save(); if (copies > 1) { ctx.globalAlpha *= 0.32; const an = c / copies * 6.283; ctx.translate(Math.cos(an) * blur * 14, Math.sin(an) * blur * 14); }
    for (let i = 0; i < n; i++) { const an = hash(seed * 31 + i) * 6.283, d = Math.sqrt(hash(seed * 31 + i + 50)) * R * 0.85; const w = wander(i + seed, t, 3, 0.2);
      cel(cx + (Math.cos(an) * d) * zoom + w.x, cy + (Math.sin(an) * d) * zoom + w.y, R * 0.11 * zoom * (0.85 + 0.3 * hash(i + seed * 7)), i); }
    ctx.restore(); } }
// twee lichtpuntjes met hun wazige vlekje (buigingsschijfje); d = afstand in px, w = straal van het vlekje
function puntjes(ctx, cx, cy, d, w, col = '#2A3446', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const sx of [-1, 1]) for (let k = 6; k >= 1; k--) { circ(ctx, cx + sx * d / 2, cy, w * k / 6, rgba(col, 0.13)); } ctx.restore(); }

// ---------- fixeren: eiwitketens die aan elkaar vastgeknoopt raken ----------
function eiwitKetens(ctx, cx, cy, w, u, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const rows = [-90, 0, 90], pt = (ri, j) => { const x = cx - w / 2 + j * w / 22, y = cy + rows[ri] + Math.sin(j * 0.8 + ri * 2 + t * 0.6 * (1 - u)) * 18; return [x, y]; };
  const links = [[0, 4], [1, 9], [0, 14], [1, 18], [0, 7], [1, 3], [0, 19], [1, 12], [0, 11], [1, 15]];
  links.forEach(([ri, j], m) => { const f = clamp(u * links.length - m, 0, 1); if (f <= 0) return; const [x1, y1] = pt(ri, j), [x2, y2] = pt(ri + 1, j); ctx.strokeStyle = rgba(C.goud, f); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f); ctx.stroke(); });
  rows.forEach((_, ri) => { ctx.strokeStyle = rgba(C.enzym, 0.9); ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 22; j++) { const [x, y] = pt(ri, j); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let j = 0; j <= 22; j++) { const [x, y] = pt(ri, j); circ(ctx, x, y, 11, ['#7A8BA8', '#8C7BBF', '#5BA4C9', '#C9A35C'][(j + ri) % 4], '#1A2740', 1.5); } });
  ctx.restore(); }
function staafBacterie(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -40 * s, -16 * s, 80 * s, 32 * s, 16 * s); shape(ctx, rgba('#7FC48F', 0.55), '#7FC48F', 3); ctx.strokeStyle = rgba('#7FC48F', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14 * s, -4 * s); ctx.quadraticCurveTo(0, 8 * s, 14 * s, -4 * s); ctx.stroke(); ctx.restore(); }
function knipEnzym(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.beginPath(); ctx.arc(0, 0, 34 * s, 0.5, 6.283 - 0.5); ctx.lineTo(8 * s, 0); ctx.closePath(); shape(ctx, rgba(C.koraal, 0.6), C.koraal, 3); ctx.restore(); }

// ---------- dikte: weefselblok (zijaanzicht) met cellen van ± 25 µm; plakje van 4 µm (8 px per µm) ----------
function weefselBlok(ctx, x, y, w, h, o = {}) { const { a = 1, band = 0, dik = 0, pxum = 8 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, rgba('#EFE6CC', 0.18), '#CDBF98', 2); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  const D = 25 * pxum; for (let r = 0; r < 4; r++) for (let c = -1; c < 6; c++) { const cxp = x + 40 + c * D + (r % 2) * D / 2, cyp = y + 20 + r * D * 0.86; circ(ctx, cxp, cyp, D / 2 - 4, rgba('#B88070', 0.55), '#94604E', 2); circ(ctx, cxp + 12, cyp - 8, D * 0.15, rgba(C.kern, 0.6)); }
  ctx.restore();
  const by = y + h * 0.42; if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; const bh = 4 * pxum; ctx.fillStyle = rgba(C.goud, 0.28); ctx.fillRect(x - 20, by, w + 40, bh); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(x - 20, by, w + 40, bh); ctx.restore(); }
  if (dik > 0.01) { ctx.save(); ctx.globalAlpha *= dik; const bh = 60 * pxum * 0.5; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.strokeRect(x - 20, by - bh / 2, w + 40, bh); ctx.setLineDash([]); ctx.restore(); }
  ctx.restore(); return { by }; }

// ---------- levercoupe (HE): balkjes levercellen rond een centrale ader, haarvaten ertussen ----------
function leverCoupe(ctx, cx, cy, r, t, o = {}) { const { a = 1, kern = 1, rest = 1, hlVat = 0, hlCel = 0, hlKern = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; const u = r / 330;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = mixC(HE.glas, '#F7E3EA', rest); ctx.fill(); ctx.save(); ctx.clip();
  const vx = cx - 0.12 * r, vy = cy + 0.08 * r, vr = 0.15 * r;
  const cR = mixC(HE.grijs, '#E7A3BE', rest), cB = mixC(HE.grijsR, HE.rozeR, rest), cK = mixC('#D9D4DC', HE.paars, kern), cRBC = mixC(HE.grijsR, HE.bloed, rest);
  const geo = { vat: [vx, vy], cel: null, kern: null };
  const N = 16; for (let i = 0; i < N; i++) { const an0 = i / N * 6.283 + 0.1;
    for (let j = 0; j < 9; j++) { const d = vr + 26 * u + j * 46 * u; const an = an0 + Math.sin(j * 0.7 + i) * 0.05; const px = vx + Math.cos(an) * d, py = vy + Math.sin(an) * d;
      const cw = 40 * u * (0.9 + 0.2 * hash(i * 17 + j)), ch = (d * 6.283 / N) * 0.62; ctx.save(); ctx.translate(px, py); ctx.rotate(an);
      roundRect(ctx, -cw / 2, -ch / 2, cw, ch, 6 * u); shape(ctx, cR, cB, 1.4 * u);
      const kr = 7.5 * u; circ(ctx, 2 * u, (hash(i * 5 + j) - 0.5) * ch * 0.3, kr, cK); if (hash(i * 13 + j * 7) > 0.85) circ(ctx, -8 * u, ch * 0.22, kr * 0.9, cK);
      ctx.restore(); if (i === 3 && j === 4) geo.cel = [px, py]; if (i === 11 && j === 3) geo.kern = [px, py];
      if (j > 0 && hash(i * 7 + j * 3) > 0.62) { const an2 = an0 + 3.1416 / N; const qx = vx + Math.cos(an2) * (d - 20 * u), qy = vy + Math.sin(an2) * (d - 20 * u); ctx.beginPath(); ctx.ellipse(qx, qy, 6 * u, 3.4 * u, an2, 0, 6.283); ctx.fillStyle = cRBC; ctx.fill(); } } }
  circ(ctx, vx, vy, vr, mixC(HE.glas, '#FBEFF3', rest), cB, 3 * u); for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.ellipse(vx - vr * 0.4 + hash(i * 3) * vr * 0.8, vy - vr * 0.4 + hash(i * 3 + 1) * vr * 0.8, 9 * u, 5 * u, hash(i) * 3, 0, 6.283); ctx.fillStyle = cRBC; ctx.fill(); }
  if (hlVat > 0.01) circ(ctx, vx, vy, vr + 10 * u, null, rgba(C.goud, hlVat), 5 * u);
  if (hlCel > 0.01 && geo.cel) circ(ctx, geo.cel[0], geo.cel[1], 34 * u, null, rgba(C.goud, hlCel), 5 * u);
  if (hlKern > 0.01 && geo.kern) circ(ctx, geo.kern[0], geo.kern[1], 18 * u, null, rgba(C.goud, hlKern), 4 * u);
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, r + 7, 0, 6.283); ctx.strokeStyle = '#0D1420'; ctx.lineWidth = 16; ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, 6.283); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore(); return geo; }

// ---------- fluorescentie ----------
function antistof(ctx, x, y, s = 1, rot = 0, a = 1, label = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round';
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, 60); ctx.lineTo(0, 0); ctx.moveTo(0, 0); ctx.lineTo(-34, -46); ctx.moveTo(0, 0); ctx.lineTo(34, -46); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-34, -46); ctx.lineTo(-24, -32); ctx.moveTo(34, -46); ctx.lineTo(24, -32); ctx.stroke();
  if (label > 0.01) { ctx.save(); ctx.globalAlpha *= label; ctx.translate(0, 74); ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 - 1.5708, rr = i % 2 ? 9 : 20; ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.closePath(); shape(ctx, FL.groen, '#E8FFE8', 2); ctx.restore(); }
  ctx.restore(); }
// stukje celmembraan (boog) met eiwitten die als knobbel naar buiten steken
function membraanStuk(ctx, cx, cy, R, a0, a1, eiw, a = 1, doel = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.er; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke(); ctx.strokeStyle = C.oker; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R - 11, a0, a1); ctx.stroke(); ctx.strokeStyle = C.er; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, R - 22, a0, a1); ctx.stroke();
  eiw.forEach(an => { ctx.save(); ctx.translate(cx + Math.cos(an) * (R - 11), cy + Math.sin(an) * (R - 11)); ctx.rotate(an + 1.5708);
    if (doel != null && Math.abs(an - doel) < 0.01) { ctx.beginPath(); ctx.moveTo(-22, 18); ctx.lineTo(-22, -40); ctx.lineTo(-8, -52); ctx.lineTo(0, -38); ctx.lineTo(8, -52); ctx.lineTo(22, -40); ctx.lineTo(22, 18); ctx.closePath(); shape(ctx, C.teal, lighten(C.teal, 0.35), 2.5); }
    else { ctx.beginPath(); ctx.arc(0, -30, 18, 0, 6.283); shape(ctx, '#8C7BBF', '#B3A6DA', 2); roundRect(ctx, -10, -20, 20, 38, 6); shape(ctx, '#8C7BBF', '#B3A6DA', 2); }
    ctx.restore(); });
  ctx.restore(); }
// donker beeld: cellen met een oplichtende rand (eiwit in het membraan)
function fluorVeld(ctx, cx, cy, R, gl, t) { for (let i = 0; i < 9; i++) { const an = hash(i * 7 + 2) * 6.283, d = Math.sqrt(hash(i * 7 + 3)) * R * 0.8; const x = cx + Math.cos(an) * d, y = cy + Math.sin(an) * d, r = R * 0.15 * (0.85 + 0.3 * hash(i));
    circ(ctx, x, y, r, rgba('#2A3446', 0.6)); for (let k = 3; k >= 1; k--) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = rgba(FL.groen, gl * (k === 1 ? 0.95 : 0.18)); ctx.lineWidth = k === 1 ? 4 : 4 + k * 5; ctx.stroke(); } } }

// ---------- elektronenmicroscoop ----------
function emKolom(ctx, x, y, s = 1, o = {}) { const { a = 1, bundel = 0, vac = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -60, 340, 60, 10); shape(ctx, '#C9D0DA', '#8FA0B5', 2); // tafel
  roundRect(ctx, -62, -620, 124, 560, 18); shape(ctx, '#DDE3EA', '#8FA0B5', 2.5);
  roundRect(ctx, -44, -680, 88, 70, 14); shape(ctx, '#C9D0DA', '#8FA0B5', 2); // elektronenbron
  [-520, -420, -300, -200].forEach(yy => { roundRect(ctx, -80, yy, 160, 40, 8); shape(ctx, '#B87333', '#8A5428', 2); }); // magnetische lenzen
  roundRect(ctx, -120, -150, 240, 70, 10); shape(ctx, '#2A3446', '#8FA0B5', 2); // scherm/camera
  if (bundel > 0.01) { ctx.save(); ctx.globalAlpha *= bundel; ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(-6, -610); ctx.lineTo(6, -610); ctx.lineTo(18, -470); ctx.lineTo(3, -350); ctx.lineTo(26, -160); ctx.lineTo(-26, -160); ctx.lineTo(-3, -350); ctx.lineTo(-18, -470); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 8; i++) { const f = ((t * 0.9 + i / 8) % 1); const yy = -610 + f * 450; circ(ctx, Math.sin(i * 2.1) * 6, yy, 4, C.teal); } ctx.restore(); }
  roundRect(ctx, 62, -380, 120, 22, 6); shape(ctx, '#8FA0B5', null); roundRect(ctx, 170, -420, 90, 100, 12); shape(ctx, '#5A6478', '#8FA0B5', 2); // vacuümpomp
  if (vac > 0.01) { ctx.save(); ctx.globalAlpha *= vac; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, -70, -630, 140, 500, 20); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// zwart-wit EM-beeld: ruw ER met ribosomen, mitochondrion met cristae, losse ribosomen
function emBeeld(ctx, cx, cy, R, o = {}) { const { hlRibo = 0, hlMito = 0, er = 1 } = o;
  for (let i = 0; i < 160; i++) { const x = cx + (hash(i * 3) - 0.5) * 2 * R, y = cy + (hash(i * 3 + 1) - 0.5) * 2 * R; circ(ctx, x, y, 2 + 3 * hash(i * 3 + 2), rgba('#6A6A6A', 0.12)); }
  // ruw ER
  for (let k = 0; k < 4; k++) { const y0 = cy - R * 0.55 + k * 40; ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 4; for (const dy of [0, 14]) { ctx.beginPath(); for (let j = 0; j <= 30; j++) { const x = cx - R * 0.9 + j * R * 0.05, y = y0 + dy + Math.sin(j * 0.35 + k) * 10; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    for (let j = 0; j <= 30; j += 1) { const x = cx - R * 0.9 + j * R * 0.05, y = y0 + Math.sin(j * 0.35 + k) * 10; circ(ctx, x, y - 7, 4, '#1E1E1E'); circ(ctx, x + R * 0.025, y + 21 + Math.sin((j + 0.5) * 0.35 + k) * 0, 4, '#1E1E1E'); } }
  if (hlRibo > 0.01) { ctx.save(); ctx.globalAlpha *= hlRibo; roundRect(ctx, cx - R * 0.92, cy - R * 0.62, R * 0.62, 58, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  // mitochondrion
  const mx = cx + R * 0.15, my = cy + R * 0.35, ml = R * 0.55, mh = R * 0.22; ctx.beginPath(); ctx.ellipse(mx, my, ml, mh, -0.1, 0, 6.283); shape(ctx, '#BDBDBD', '#2A2A2A', 5); ctx.beginPath(); ctx.ellipse(mx, my, ml - 10, mh - 10, -0.1, 0, 6.283); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.ellipse(mx, my, ml - 10, mh - 10, -0.1, 0, 6.283); ctx.clip(); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 4; for (let i = -6; i <= 6; i++) { const x = mx + i * ml * 0.14; const up = i % 2 === 0; ctx.beginPath(); ctx.moveTo(x, up ? my - mh : my + mh); ctx.quadraticCurveTo(x + 8, my, x, up ? my + mh * 0.25 : my - mh * 0.25); ctx.stroke(); } ctx.restore();
  if (hlMito > 0.01) { ctx.save(); ctx.globalAlpha *= hlMito; ctx.beginPath(); ctx.ellipse(mx, my, ml + 18, mh + 18, -0.1, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  for (let i = 0; i < 40; i++) { const x = cx + (hash(i * 5 + 90) - 0.5) * 1.8 * R, y = cy + (hash(i * 5 + 91) - 0.1) * 0.5 * R - R * 0.05; if (Math.abs(y - my) < mh + 10 && Math.abs(x - mx) < ml + 10) continue; circ(ctx, x, y, 4, '#2A2A2A'); }
  return { mito: [mx, my, ml, mh] }; }
// levende cel met groen oplichtende mitochondriën die bewegen (eigen label)
function levendeCel(ctx, cx, cy, r, t, gl = 1) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.fillStyle = rgba('#2A3446', 0.7); ctx.fill(); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, cx + r * 0.15, cy - r * 0.1, r * 0.3, rgba('#3A4458', 0.9));
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r - 8, 0, 6.283); ctx.clip();
  for (let i = 0; i < 14; i++) { const an = hash(i * 4 + 1) * 6.283, d = r * (0.45 + 0.4 * hash(i * 4 + 2)); const w = wander(i, t, r * 0.08, 0.5); const x = cx + Math.cos(an) * d + w.x, y = cy + Math.sin(an) * d + w.y, rot = an + 1.2 + Math.sin(t * 0.7 + i) * 0.4, L = r * 0.16;
    for (let k = 2; k >= 1; k--) { ctx.strokeStyle = rgba(FL.groen, gl * (k === 1 ? 0.95 : 0.2)); ctx.lineWidth = k === 1 ? 8 : 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - Math.cos(rot) * L, y - Math.sin(rot) * L); ctx.quadraticCurveTo(x + Math.sin(rot) * 8, y - Math.cos(rot) * 8, x + Math.cos(rot) * L, y + Math.sin(rot) * L); ctx.stroke(); } }
  ctx.restore(); }

// ---------- meten: liniaal in het oculair over een objectmicrometer (pxDiv px per streepje; 100 µm = 40 streepjes) ----------
function oculairSchaal(ctx, cx, cy, o = {}) { const { oc = 1, obj = 0, cel = 0, hlCel = 0, pxDiv = 15 } = o; const x0 = cx - 20 * pxDiv;
  if (obj > 0.01) { ctx.save(); ctx.globalAlpha *= obj; const yo = cy + 70, pxUm = 40 * pxDiv / 100; ctx.strokeStyle = '#3A3A44'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yo); ctx.lineTo(x0 + 100 * pxUm, yo); ctx.stroke();
    for (let u = 0; u <= 100; u += 10) { const xx = x0 + u * pxUm, L = u % 50 === 0 ? 46 : 28; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, yo); ctx.lineTo(xx, yo + L); ctx.stroke(); if (u % 50 === 0) text(ctx, u + ' µm', xx, yo + 72, fTekst(26, 700), '#3A3A44', 'center'); } ctx.restore(); }
  if (cel > 0.01) { ctx.save(); ctx.globalAlpha *= cel; const r = 4 * pxDiv; const ccx = x0 + 6 * pxDiv + r; kweekCelLos(ctx, ccx, cy - 70, r, 0.75); if (hlCel > 0.01) { ctx.globalAlpha *= hlCel; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; [ccx - r, ccx + r].forEach(xx => { ctx.beginPath(); ctx.moveTo(xx, cy - 70 - r - 10); ctx.lineTo(xx, cy + 4); ctx.stroke(); }); } ctx.restore(); }
  if (oc > 0.01) { ctx.save(); ctx.globalAlpha *= oc; ctx.strokeStyle = '#121A26'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x0 + 40 * pxDiv, cy); ctx.stroke();
    for (let i = 0; i <= 40; i++) { const xx = x0 + i * pxDiv, L = i % 10 === 0 ? 34 : i % 5 === 0 ? 24 : 14; ctx.beginPath(); ctx.moveTo(xx, cy); ctx.lineTo(xx, cy - L); ctx.stroke(); if (i % 10 === 0) text(ctx, String(i), xx, cy - 42, fTekst(24, 700), '#121A26', 'center'); } ctx.restore(); }
  return { x0 }; }
function kweekCelLos(ctx, x, y, r, k) { ctx.beginPath(); for (let j = 0; j <= 36; j++) { const an = j / 36 * 6.283, rr = r * (1 + 0.05 * Math.sin(an * 3)); j ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fillStyle = `rgba(150,140,120,${0.25 * k})`; ctx.fill(); ctx.strokeStyle = `rgba(90,86,76,${0.7 * k})`; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + r * 0.15, y - r * 0.1, r * 0.36, r * 0.32, 0.3, 0, 6.283); ctx.fillStyle = `rgba(90,76,120,${0.4 * k})`; ctx.fill(); }

// ---------- tellen: telkamer ----------
function telkamerZij(ctx, x, y, w, o = {}) { const { a = 1, vloei = 0, maat = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 60, 6); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2.5); // objectglas
  roundRect(ctx, x + 40, y - 30, 110, 30, 4); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2); roundRect(ctx, x + w - 150, y - 30, 110, 30, 4); shape(ctx, rgba('#DCEBF4', 0.3), '#AFC0D0', 2); // steunranden
  roundRect(ctx, x + 180, y - 14, w - 360, 14, 3); shape(ctx, rgba('#DCEBF4', 0.45), '#AFC0D0', 2); // telplatform met raster
  for (let i = 0; i < 12; i++) { ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 200 + i * (w - 400) / 11, y - 14, 2, 6); }
  if (vloei > 0.01) { ctx.save(); ctx.globalAlpha *= vloei; ctx.fillStyle = rgba(C.teal, 0.45); ctx.fillRect(x + 160, y - 44, w - 320, 30); for (let i = 0; i < 14; i++) circ(ctx, x + 190 + hash(i) * (w - 380), y - 30 + (hash(i + 9) - 0.5) * 16, 4, rgba('#F2F2EE', 0.8)); ctx.restore(); }
  roundRect(ctx, x + 20, y - 46, w - 40, 14, 3); shape(ctx, rgba('#E8F4FA', 0.5), '#C9D6E0', 2); // dekglas
  if (maat > 0.01) { ctx.save(); ctx.globalAlpha *= maat; const mx = x + w / 2; pijl(ctx, mx, y - 22, mx, y - 32, C.goud, 1, 3, 10); pijl(ctx, mx, y - 22, mx, y - 12, C.goud, 1, 3, 10); ctx.restore(); }
  ctx.restore(); }
// raster van 3 × 3 grote vierkanten (elk 1 × 1 mm), elk in 4 × 4 vakjes; één vierkant gemarkeerd, met n cellen (0..50)
function telRaster(ctx, cx, cy, S, o = {}) { const { hl = 0, n = 0, extra = 0, t = 0 } = o; const x0 = cx - 1.5 * S, y0 = cy - 1.5 * S;
  ctx.strokeStyle = '#4A4A55'; ctx.lineWidth = 1.2; for (let i = 0; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * S / 4, y0); ctx.lineTo(x0 + i * S / 4, y0 + 3 * S); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x0, y0 + i * S / 4); ctx.lineTo(x0 + 3 * S, y0 + i * S / 4); ctx.stroke(); }
  ctx.lineWidth = 4; for (let i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * S, y0); ctx.lineTo(x0 + i * S, y0 + 3 * S); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x0, y0 + i * S); ctx.lineTo(x0 + 3 * S, y0 + i * S); ctx.stroke(); }
  const vak = (gx, gy, cnt, seed) => { for (let i = 0; i < cnt; i++) { const px = x0 + gx * S + 8 + hash(seed + i * 2) * (S - 16), py = y0 + gy * S + 8 + hash(seed + i * 2 + 1) * (S - 16); circ(ctx, px, py, S * 0.025 + 3, rgba('#6A6050', 0.35), '#5A564C', 1.5); } };
  for (let gx = 0; gx < 3; gx++) for (let gy = 0; gy < 3; gy++) { const mid = gx === 1 && gy === 1; vak(gx, gy, mid ? 0 : Math.round(40 + 20 * hash(gx * 3 + gy)), 100 + gx * 37 + gy * 11); }
  const nn = Math.round(clamp(n, 0, 50)); for (let i = 0; i < 50; i++) { const px = x0 + S + 8 + hash(7 + i * 2) * (S - 16), py = y0 + S + 8 + hash(8 + i * 2) * (S - 16); circ(ctx, px, py, S * 0.025 + 3, i < nn ? rgba(C.goud, 0.85) : rgba('#6A6050', 0.35), i < nn ? '#8A6A1A' : '#5A564C', 1.5); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.strokeRect(x0 + S, y0 + S, S, S); ctx.restore(); }
  if (extra > 0.01) { ctx.save(); ctx.globalAlpha *= extra; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; [[0, 0], [2, 0], [0, 2], [2, 2]].forEach(([gx, gy]) => ctx.strokeRect(x0 + gx * S + 4, y0 + gy * S + 4, S - 8, S - 8)); ctx.restore(); }
  return { x0, y0 }; }

// ---------- overig ----------
function kweekFles(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-70, -90); ctx.lineTo(30, -90); ctx.lineTo(70, -120); ctx.lineTo(90, -110); ctx.lineTo(60, -70); ctx.lineTo(60, 0); ctx.closePath(); shape(ctx, rgba('#DCEBF4', 0.2), '#AFC0D0', 3);
  ctx.fillStyle = rgba('#E89AA8', 0.6); ctx.fillRect(-66, -30, 122, 28); roundRect(ctx, 80, -134, 30, 26, 5); ctx.save(); ctx.translate(95, -121); ctx.rotate(-0.6); roundRect(ctx, -16, -14, 32, 26, 5); shape(ctx, '#5BA4C9', '#3E7FA2', 2); ctx.restore(); ctx.restore(); }
function pipet(ctx, x, y, s = 1, a = 1, drup = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-10, -120); ctx.lineTo(10, -120); ctx.lineTo(5, 0); ctx.closePath(); shape(ctx, rgba('#DCEBF4', 0.35), '#AFC0D0', 2); roundRect(ctx, -16, -170, 32, 54, 12); shape(ctx, '#E07A5F', '#B85E46', 2);
  if (drup > 0.01) { ctx.beginPath(); ctx.arc(0, 8 + drup * 30, 8, 0, 6.283); ctx.fillStyle = rgba('#E89AA8', 0.8); ctx.fill(); } ctx.restore(); }
function kaartje(ctx, x, y, w, h, titel, sub, col, a = 1, icoon) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 18); shape(ctx, rgba(col, 0.12), col, 2.5);
  if (icoon) icoon(x, y - h * 0.14); text(ctx, titel, x, y + h * 0.3, fTekst(32, 800), C.text, 'center'); if (sub) text(ctx, sub, x, y + h * 0.3 + 38, fTekst(24, 600), C.text2, 'center'); ctx.restore(); }
function ziekenhuisje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -120, 180, 120, 6); shape(ctx, '#DCE6EE', '#9AA3B2', 2); ctx.fillStyle = '#7FA3C9'; for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) ctx.fillRect(-70 + i * 50, -100 + j * 40, 30, 24); ctx.fillStyle = C.koraal; ctx.fillRect(-10, -160, 20, 56); ctx.fillRect(-28, -142, 56, 20); ctx.restore(); }
// Wat word jij? · Laboratoriumtechniek 1 · Preparaat en microscoop — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Yasmin, stagiair-analist, outfit 'practicum').
// Rode draad: één stagedag van Yasmin in een onderzoekslab; dezelfde druppel kweekcellen aan het begin en in H4.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// Yasmin aan de microscoop op een labtafel; x = Yasmin, microscoop rechts van haar
function yasminLab(ctx, t, x, h, a = 1, o = {}) { if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a; const s = h / 560;
  persoon(ctx, 'yasmin', x, 880, h, { t, outfit: 'practicum', kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  const ty = 880 - 250 * s; labTafel(ctx, x + 40 * s, ty, 360 * s);
  const m = lichtMicroscoop(ctx, x + 250 * s, ty, 0.62 * s, { obj: o.obj || 0, licht: o.licht == null ? 1 : o.licht, glas: o.glas == null ? 1 : o.glas });
  ctx.restore(); return m; }
const OOG = { x: 1340, y: 460, r: 300 };

Object.assign(SCENES, {
  title(ctx, t) { leverCoupe(ctx, 1560, 620, 250, t, {}); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    const G = clamp((t - q.at('schuift', 1)) / 1.2, 0, 1), K = q.on('kijkt', 1, 0.5);
    yasminLab(ctx, t, 330, 560, 1, { uit: t > q.at('ziet', 1) ? 'verbaasd' : 'neutraal', glas: G });
    naamBij(ctx, 'Yasmin', 'stagiair-analist', 120, 240, 1 - K * 0.0);
    metaA(ctx, 'onderzoekslab · eerste opdracht', 1340, 120, q.on('onderzoekslab', 1), C.grain, 'center', 24);
    const F = 1 - K; kweekFles(ctx, 1150, 560, 1.4, F); naamBij(ctx, 'kweekfles', 'kweekcellen', 1150, 620, F * q.on('kweekfles', 1), 'center');
    const D = q.on('druppel', 1) * (1 - K); pipet(ctx, 1450, 420, 1.1, D, clamp((t - q.at('druppel', 1)) / 1, 0, 1)); glaasje(ctx, 1450, 560, 0.9, D * (1 - G), 0, 0); naamBij(ctx, 'glaasje', '', 1450, 650, D * (1 - G), 'center');
    kijkVeld(ctx, OOG.x, OOG.y, OOG.r, K, LICHTVELD, () => kweekCellen(ctx, OOG.x, OOG.y, OOG.r, { k: 0.05, t, hlRand: 0.15 * q.on('randjes', 1) }));
    metaA(ctx, 'door het oculair', OOG.x, OOG.y + OOG.r + 70, K, C.text2, 'center', 22);
    chip(ctx, 'bijna niets', 1760, 640, C.koraal, q.on('niets', 1) * (1 - q.on('kan', 1)), 28);
    vraagteken(ctx, OOG.x + OOG.r + 90, 320, q.on('kan', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ze laten bijna al het licht door', 1 - q.on('Eerst', 1));
    const B = q.on('Eerst', 1, 0.8), A = 1 - B;
    // A: waarom zie je niets? licht gaat er bijna ongehinderd doorheen
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      kijkVeld(ctx, 1380, 520, 300, 1, LICHTVELD, () => kweekCellen(ctx, 1380, 520, 300, { k: 0.05, t }));
      // een cel van opzij met een lichtbundel erdoor
      ctx.save(); ctx.globalAlpha *= q.on('water', 1); ctx.fillStyle = rgba('#FFF1B8', 0.5); ctx.fillRect(420, 260, 140, 540); ctx.fillStyle = rgba('#FFF1B8', 0.46); ctx.fillRect(420, 260, 140, 540); kweekCelLos(ctx, 490, 520, 120, 0.35); ctx.restore();
      pijl(ctx, 490, 820, 490, 760, C.goud, q.on('water', 1), 5, 18); pijl(ctx, 490, 280, 490, 220, C.goud, q.on('houden', 1), 5, 18);
      naamBij(ctx, 'vooral water', '', 640, 520, q.on('water', 1));
      naamBij(ctx, 'bijna al het licht', 'gaat erdoor', 640, 220, q.on('houden', 1));
      chip(ctx, 'te weinig contrast', 1380, 900 - 20, C.koraal, q.on('contrast', 1), 30);
      ctx.restore(); }
    if (B < 0.01) return;
    ctx.save(); ctx.globalAlpha *= B;
    const objI = t < q.at('sterker', 1) + 0.3 ? 0 : t < q.at('sterkste', 1) + 0.3 ? 2 : 3;
    const hl = t >= q.at('sterkste', 1) - 0.2 ? 'obj' : t >= q.at('oculair', 1) - 0.1 && t < q.at('objectief', 3) ? 'oc' : t >= q.at('objectief', 3) - 0.1 && t < q.at('Tien', 1) + 2 ? 'obj' : t >= q.at('fijne', 1) - 0.2 && t < q.at('vergroting', 1) ? 'fijn' : t >= q.at('grote', 1) - 0.2 && t < q.at('Daarna', 1) ? 'grof' : t >= q.at('kleinste', 1) - 0.2 && t < q.at('grote', 1) - 0.2 ? 'obj' : null;
    const grof = clamp((t - q.at('grote', 1)) / 1.6, 0, 1) * 4, fijn = clamp((t - q.at('fijne', 1)) / 1.2, 0, 1) * 3;
    const M = lichtMicroscoop(ctx, 560, 850, 1.22, { obj: objI, grof, fijn, hl, olie: q.on('olie', 1) });
    naamBij(ctx, 'objectief', OBJ[objI].v, M.obj.x + 70, M.obj.y + 10, (q.on('kleinste', 1) * (1 - q.on('oculair', 1, 0.3)) + q.on('objectief', 3) * (1 - q.on('puntjes', 1, 0.3)) + q.on('sterkste', 1)) > 0.01 ? Math.min(1, q.on('kleinste', 1) * (1 - q.on('oculair', 1, 0.3)) + q.on('objectief', 3) * (1 - q.on('puntjes', 1, 0.3)) + q.on('sterkste', 1)) : 0);
    naamBij(ctx, 'grote schroef', '', M.grof.x - 70, M.grof.y - 40, q.on('grote', 1) * (1 - q.on('fijne', 1, 0.3)), 'right');
    naamBij(ctx, 'fijne schroef', '', M.fijn.x - 70, M.fijn.y - 40, q.on('fijne', 1) * (1 - q.on('vergroting', 1, 0.3)), 'right');
    naamBij(ctx, 'oculair', '10×', M.oc.x - 30, M.oc.y - 30, q.on('oculair', 1) * (1 - q.on('puntjes', 1, 0.3)), 'right');
    naamBij(ctx, 'olie', '', M.tafel.x + 150, M.tafel.y + 60, q.on('olie', 1) * (1 - q.on('Stel', 2, 0.3)));
    // rechts: wat Yasmin ziet; daarna de twee puntjes
    const P = q.on('puntjes', 1, 0.6) * (1 - q.on('sterkste', 1, 0.6)), V = 1 - P;
    const scherp1 = clamp((t - q.at('grote', 1)) / 1.6, 0, 1), scherp2 = clamp((t - q.at('fijne', 1)) / 1.2, 0, 1);
    const zoom = objI === 0 ? 0.6 : objI === 2 ? 1.5 : 2.6, blur = objI === 0 ? 1 - scherp1 : objI === 2 ? 1 - scherp2 : 0;
    if (V > 0.01) kijkVeld(ctx, OOG.x, OOG.y, OOG.r, V, LICHTVELD, () => kweekCellen(ctx, OOG.x, OOG.y, OOG.r, { k: 0.3, blur, zoom, n: objI === 0 ? 30 : 14, t }));
    tag(ctx, 'vergroting = oculair × objectief', OOG.x, 860, C.goud, q.on('vergroting', 1) * (1 - q.on('puntjes', 1, 0.3)), 'center', 30);
    tag(ctx, '10 × 40 = 400×', OOG.x, 95, C.goud, q.on('Tien', 1) * (1 - q.on('puntjes', 1, 0.3)), 'center', 34);
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; roundRect(ctx, 1040, 200, 620, 560, 20); shape(ctx, LICHTVELD, C.line, 2);
      const d = lerp(240, 40, clamp((t - q.at('dichter', 1)) / 4.5, 0, 1)); puntjes(ctx, 1350, 470, d, 60, '#2A3446', 1);
      metaA(ctx, d > 120 ? 'twee puntjes' : 'één vlek', 1350, 700, 1, '#3A4458', 'center', 26);
      ctx.restore();
      tag(ctx, '< ongeveer 0,2 micrometer', 1350, 160, C.koraal, q.on('micrometer', 1) * P, 'center', 30);
      tag(ctx, 'oplossend vermogen', 1350, 860, C.goud, q.on('oplossend', 1) * P, 'center', 32); }
    tag(ctx, '10 × 100 = 1000×', OOG.x, 95, C.goud, q.on('duizend', 1), 'center', 34);
    const Z = q.on('Stel', 2); if (Z > 0.01) { tag(ctx, '× 2 ?', OOG.x + OOG.r - 10, OOG.y + OOG.r + 30, C.koraal, Z, 'center', 34); }
    vraagteken(ctx, 1810, 300, q.on('denk', 1), 100);
    ctx.restore(); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: groter beeld, geen extra details');
    const inner = (cx, cy, sc) => () => { ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc); kweekCelLos(ctx, 0, 0, 120, 0.8); for (let i = 0; i < 9; i++) { const an = i * 0.7, d = 40 + 30 * hash(i); for (let k = 5; k >= 1; k--) circ(ctx, Math.cos(an) * d, Math.sin(an) * d, 5 * k / 5 + 5, 'rgba(60,56,70,0.12)'); } ctx.restore(); };
    kijkVeld(ctx, 500, 470, 220, 1, LICHTVELD, inner(500, 470, 0.85)); metaA(ctx, '1000×', 500, 760, 1, C.text2, 'center', 26);
    pijl(ctx, 750, 470, 1080, 470, C.line, q.on('groter', 1), 5, 20);
    kijkVeld(ctx, 1400, 470, 280, q.on('groter', 1), LICHTVELD, inner(1400, 470, 2.0)); metaA(ctx, '2000×', 1400, 820, q.on('groter', 1), C.text2, 'center', 26);
    chip(ctx, 'wazig blijft wazig', 930, 410, C.koraal, q.on('wazige', 2), 26);
    tag(ctx, 'lege vergroting', 930, 600, C.koraal, q.on('lege', 1), 'center', 32);
    chip(ctx, 'meer zien: meer contrast', 930, 700, C.groen, q.on('contrast', 1), 26); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    const st = ['fixeren', 'ontwateren', 'inbedden', 'snijden'], ws = [['formaline', 1], ['water', 1], ['paraffine', 1], ['microtoom', 1]];
    const S0 = q.on('Yasmin', 1, 0.6);
    // stappenbalk bovenaan
    st.forEach((s2, i) => { const on = q.on(ws[i][0], ws[i][1]); const cur = i === 3 ? t >= q.at(ws[i][0]) : t >= q.at(ws[i][0]) && t < q.at(ws[i + 1][0]); chip(ctx, (i + 1) + '. ' + s2, 420 + i * 360, 150, cur ? C.goud : C.line, Math.max(0.25 * S0, on), 28); });
    // begin: een glaasje dat kleur krijgt
    glaasje(ctx, 960, 480, 2.2, 1 - S0, ramp(t, 0.6, 1.2), 1); chip(ctx, 'kleuren = contrast', 960, 700, C.goud, q.on('kleuring', 1) * (1 - S0), 30);
    if (S0 < 0.01) return; ctx.save(); ctx.globalAlpha *= S0;
    const fx = q.on('formaline', 1), Pf = 1 - q.on('Daarna', 1, 0.6), Pp = q.on('Daarna', 1, 0.6) * (1 - q.on('snijmachine', 1, 0.6)), Pm = q.on('snijmachine', 1, 0.6);
    // links het object van deze stap
    if (Pf > 0.01) { potje(ctx, 420, 560, 1.6, Pf, t, 1); naamBij(ctx, 'stukje lever', '', 420, 310, Pf * (1 - fx), 'center'); naamBij(ctx, 'formaline', '', 420, 790, Pf * fx, 'center');
      // rechts: inzoomen op de eiwitten
      const Z = q.on('knoopt', 1) * Pf; if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; roundRect(ctx, 820, 260, 1000, 560, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5);
        eiwitKetens(ctx, 1320, 520, 860, clamp((t - q.at('knoopt', 1)) / 1.8, 0, 1), t, 1); metaA(ctx, 'eiwitten in de cel · vergroot', 850, 300, 1, C.grain, 'left', 22);
        const E = q.on('enzymen', 1); const ex = lerp(1900, 1700, E), bx = lerp(1900, 1720, q.on('bacteriën', 1));
        knipEnzym(ctx, ex, 330 + 80, 1, E); staafBacterie(ctx, bx, 760, 1.1, 0.3, q.on('bacteriën', 1));
        kruis(ctx, 1700, 410, 30, q.on('afbreken', 1)); kruis(ctx, 1720, 760, 30, q.on('afbreken', 1));
        tag(ctx, 'vastgeknoopt', 1320, 880 - 10, C.goud, q.on('vast', 1), 'center', 28); ctx.restore(); }
      chip(ctx, 'cellen blijven in vorm', 420, 860, C.groen, q.on('vorm', 1) * Pf, 26); }
    if (Pp > 0.01) { const al = q.on('alcohol', 1); ctx.save(); ctx.globalAlpha *= Pp; kleurBak(ctx, 520, 560, 1.4, 1, '#C9D6E0', t); naamBij(ctx, 'alcohol', 'haalt het water eruit', 520, 760, al, 'center');
      paraffineBlok(ctx, 1300, 600, 2.0, q.on('paraffine', 1)); naamBij(ctx, 'paraffine', 'een soort kaarsvet', 1300, 790, q.on('paraffine', 1), 'center'); pijl(ctx, 760, 520, 960, 520, C.line, q.on('paraffine', 1), 5, 18);
      chip(ctx, 'stevig genoeg om te snijden', 1300, 300, C.groen, q.on('stevig', 1), 28); ctx.restore(); }
    if (Pm > 0.01) { ctx.save(); ctx.globalAlpha *= Pm; microtoom(ctx, 760, 700, 1.9, 1, t, clamp((t - q.at('snijdt', 1)) / 2.5, 0, 1), 1); naamBij(ctx, 'microtoom', 'snijmachine', 860, 280, q.on('microtoom', 1), 'center');
      tag(ctx, 'plakjes van ± 4 micrometer', 1450, 420, C.goud, q.on('vier', 1), 'center', 32); vraagteken(ctx, 1450, 700, q.on('Waarom', 1), 110); ctx.restore(); }
    ctx.restore(); },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: cellen liggen niet over elkaar', 1 - q.on('kleurt', 1));
    const K = q.on('kleurt', 1, 0.8), A = 1 - K;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const g = weefselBlok(ctx, 160, 260, 1040, 560, { band: 1, dik: q.on('stapel', 1) });
      naamBij(ctx, 'levercel', '20–30 micrometer', 1240, 360, q.on('levercel', 1));
      naamBij(ctx, 'plakje', '4 micrometer', 1240, g.by + 26, q.on('plakje', 1));
      chip(ctx, 'één laag cellen', 1500, 640, C.groen, q.on('laag', 1), 28); chip(ctx, 'geen stapel', 1500, 740, C.koraal, q.on('stapel', 1), 28);
      metaA(ctx, 'zijaanzicht · op schaal', 160, 860, 1, C.grain, 'left', 22); ctx.restore(); }
    if (K < 0.01) return; ctx.save(); ctx.globalAlpha *= K;
    const kk = clamp((t - q.at('Hematoxyline', 1)) / 2.2, 0, 1), rr = clamp((t - q.at('Eosine', 1)) / 2.0, 0, 1);
    kleurBak(ctx, 330, 640, 1.2, 1, HE.paars, t); naamBij(ctx, 'hematoxyline', 'DNA en RNA', 330, 780, q.on('Hematoxyline', 1), 'center');
    kleurBak(ctx, 660, 640, 1.2, 1, '#E06A8E', t); naamBij(ctx, 'eosine', 'eiwitten', 660, 780, q.on('Eosine', 1), 'center');
    const g = leverCoupe(ctx, 1320, 470, 330, t, { kern: kk, rest: rr, hlKern: q.on('kernen', 2) * (1 - q.on('celgrenzen', 1)), hlCel: q.on('celgrenzen', 1) * (1 - q.on('bloedvaatjes', 1)), hlVat: q.on('bloedvaatjes', 1) * (1 - q.on('coupe', 1)) });
    chip(ctx, 'kernen blauwpaars', 495, 330, HE.paars, q.on('blauwpaars', 1), 28); chip(ctx, 'de rest roze', 495, 410, '#E06A8E', q.on('roze', 1), 28);
    naamBij(ctx, 'coupe', 'gesneden en gekleurd plakje', 1320, 880 - 2, q.on('coupe', 1), 'center');
    ctx.restore(); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    const tF = q.at('beschijnt', 1), tE = q.at('Fijner', 1), tY = q.at('Yasmin', 2);
    const A = 1 - ramp(t, tF - 0.3, 0.6), Fv = ramp(t, tF - 0.3, 0.6) * (1 - ramp(t, tE - 0.3, 0.6)), Ev = ramp(t, tE - 0.3, 0.6) * (1 - ramp(t, tY - 0.55, 0.3)), Yv = ramp(t, tY - 0.2, 0.3);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; membraanStuk(ctx, 960, 1500, 1000, -2.25, -0.89, [-1.9, -1.57, -1.2], 1, -1.57);
      const b = clamp((t - q.at('antistof', 1)) / 2.0, 0, 1), ex = -1.57, px = 960 + Math.cos(ex) * 1050, py = 1500 + Math.sin(ex) * 1050;
      const ax = lerp(1500, px, b), ay = lerp(250, py - 40, b);
      antistof(ctx, ax, ay, 1.2, 3.1416, q.on('antistof', 1), q.on('lichtgevend', 1));
      naamBij(ctx, 'eiwit in het membraan', 'dit eiwit zoekt Yasmin', 1030, 360, q.on('eiwit', 1) * (1 - q.on('antistof', 1)));
      naamBij(ctx, 'antistof', 'past alleen op dit eiwit', ax - 70, ay + 20, q.on('antistof', 1), 'right');
      naamBij(ctx, 'lichtgevend label', '', ax + 50, ay - 90, q.on('lichtgevend', 1)); metaA(ctx, 'vergroot · niet op schaal', 120, 860, 1, C.grain, 'left', 22); ctx.restore(); }
    if (Fv > 0.01) { ctx.save(); ctx.globalAlpha *= Fv;
      // principe links: blauw erin, groen eruit, filter
      const g = clamp((t - q.at('andere', 1)) / 0.8, 0, 1), fl = q.on('filter', 1);
      roundRect(ctx, 200, 640, 360, 30, 8); shape(ctx, rgba('#DCEBF4', 0.4), '#AFC0D0', 2); antistof(ctx, 380, 600, 0.45, 3.1416, 1, 1); metaA(ctx, 'preparaat', 380, 720, 1, C.text2, 'center', 20);
      pijl(ctx, 260, 260, 340, 570, FL.blauw, q.on('beschijnt', 1), 8, 22); naamBij(ctx, 'licht van één kleur', '', 120, 230, q.on('beschijnt', 1));
      pijl(ctx, 420, 570, 500, 340, FL.groen, g, 8, 22); naamBij(ctx, 'licht van een andere kleur', '', 450, 300, g * (1 - fl * 0), 'left');
      roundRect(ctx, 420, 360, 220, 18, 4); shape(ctx, rgba(FL.groen, 0.35 * fl), rgba(FL.groen, fl), 2); naamBij(ctx, 'filter', 'laat alleen groen door', 660, 390, fl);
      kijkVeld(ctx, OOG.x + 80, OOG.y, OOG.r, q.on('Zo', 1), '#05080D', () => { fluorVeld(ctx, OOG.x + 80, OOG.y, OOG.r, q.on('Zo', 1), t); });
      tag(ctx, 'fluorescentie', OOG.x + 80, 95, C.goud, q.on('fluorescentie', 1), 'center', 34);
      tag(ctx, 'grens blijft ± 0,2 micrometer', OOG.x + 80, 850, C.koraal, q.on('grens', 1), 'center', 30); ctx.restore(); }
    if (Ev > 0.01) { ctx.save(); ctx.globalAlpha *= Ev;
      emKolom(ctx, 460, 880, 1.0, { bundel: q.on('elektronen', 1), vac: q.on('vacuüm', 1), t });
      naamBij(ctx, 'elektronenmicroscoop', '', 460, 150, 1, 'center'); naamBij(ctx, 'vacuüm', '', 730, 530, q.on('vacuüm', 1));
      const B = q.on('elektronen', 2, 0.6);
      kijkVeld(ctx, OOG.x + 40, OOG.y, OOG.r, B, '#D8D8D8', () => emBeeld(ctx, OOG.x + 40, OOG.y, OOG.r, { hlRibo: q.on('ribosomen', 1) * (1 - q.on('vacuüm', 1)), hlMito: q.on('plooien', 1) * (1 - q.on('vacuüm', 1)) }));
      naamBij(ctx, 'ribosomen', '', 1060, 260, q.on('ribosomen', 1) * (1 - q.on('vacuüm', 1)), 'right'); naamBij(ctx, 'plooien (cristae)', '', OOG.x + 40, OOG.y + OOG.r + 64, q.on('plooien', 1) * (1 - q.on('vacuüm', 1)), 'center');
      tag(ctx, 'details van ± 1 nanometer', OOG.x + 40, 95, C.goud, q.on('nanometer', 1), 'center', 30);
      const st = [['gefixeerd', 'gefixeerd'], ['ontwaterd', 'ontwaterd'], ['dunner', 'veel dunner gesneden'], ['metalen', 'zware metalen']];
      st.forEach(([w, s2], i) => chip(ctx, s2, 880, 250 + i * 66, C.teal, q.on(w, 1), 24));
      metaA(ctx, 'dode cellen', OOG.x + 40, 860, q.on('gefixeerd', 1), C.koraal, 'center', 24); ctx.restore(); }
    if (Yv > 0.01) { ctx.save(); ctx.globalAlpha *= Yv; persoon(ctx, 'yasmin', 460, 880, 560, { t, outfit: 'practicum', kijk: 1, pose: 'denk', uit: 'neutraal' });
      kijkVeld(ctx, 1200, 470, 280, 1, LICHTVELD, () => { kweekCelLos(ctx, 1200, 470, 230, 0.8); for (let i = 0; i < 7; i++) { const w = wander(i, t, 26, 0.4); const an = hash(i * 3) * 6.283, d = 70 + 90 * hash(i * 3 + 1); ctx.beginPath(); ctx.ellipse(1200 + Math.cos(an) * d + w.x, 470 + Math.sin(an) * d + w.y, 30, 12, hash(i) * 3 + t * 0.2, 0, 6.283); ctx.strokeStyle = 'rgba(90,86,76,0.75)'; ctx.lineWidth = 3; ctx.stroke(); } });
      metaA(ctx, 'mitochondriën in een levende cel', 1200, 820, 1, C.text2, 'center', 22);
      vraagteken(ctx, 1640, 300, q.on('denk', 1), 110); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: lichtmicroscoop met lichtgevend label');
    const L = q.on('levende', 1);
    paneel(ctx, 120, 260, 480, 440, 'elektronenmicroscoop', 1); kijkVeld(ctx, 360, 500, 150, 1, '#D8D8D8', () => emBeeld(ctx, 360, 500, 150, {})); kruis(ctx, 540, 320, 26, q.on('dood', 1)); metaA(ctx, 'dood', 360, 750, q.on('dood', 1), C.koraal, 'center', 24);
    paneel(ctx, 720, 260, 480, 440, 'gekleurde coupe', q.on('coupe', 1)); if (q.on('coupe', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('coupe', 1); leverCoupe(ctx, 960, 500, 150, t, {}); kruis(ctx, 1140, 320, 26, 1); metaA(ctx, 'ook dood', 960, 750, 1, C.koraal, 'center', 24); ctx.restore(); }
    paneel(ctx, 1320, 260, 480, 440, 'levende cel', L); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.fillStyle = '#05080D'; ctx.beginPath(); ctx.arc(1560, 500, 160, 0, 6.283); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(1560, 500, 160, 0, 6.283); ctx.clip(); levendeCel(ctx, 1560, 500, 140, t, q.on('lichtgevend', 1)); ctx.restore(); ctx.restore(); }
    chip(ctx, 'gen voor het label ingebouwd', 1560, 790, C.groen, q.on('gen', 1), 26); vink_(ctx, 1740, 320, 26, q.on('bewegen', 1)); },

  // ---------- H4 ----------
  s13(ctx, t, q) { bg(ctx, 'schema');
    const tT = q.at('Nu', 1), C1 = 1 - ramp(t, tT - 0.5, 0.3), C2 = ramp(t, tT - 0.2, 0.3);
    if (C1 > 0.01) { ctx.save(); ctx.globalAlpha *= C1;
      persoon(ctx, 'yasmin', 230, 880, 520, { t, outfit: 'practicum', kijk: 1, pose: t > q.at('acht', 1) ? 'wijs' : 'staan', uit: 'neutraal' });
      const ob = q.on('objectmicrometer', 1), cel = q.on('cel', 2);
      kijkVeld(ctx, 1260, 470, 340, 1, LICHTVELD, () => { kweekCellen(ctx, 1260, 470, 340, { k: 0.25 * (1 - ob), t, n: 10, seed: 5 }); oculairSchaal(ctx, 1260, 470, { oc: q.on('liniaaltje', 1), obj: ob * (1 - cel), cel, hlCel: q.on('acht', 1), pxDiv: 13 }); });
      naamBij(ctx, 'liniaaltje in het oculair', 'geen vaste lengte', 470, 320, q.on('liniaaltje', 1) * (1 - ob));
      naamBij(ctx, 'objectmicrometer', 'bekende schaal', 470, 320, ob * (1 - cel)); naamBij(ctx, 'eigen cellen eronder', 'objectmicrometer eruit', 470, 320, cel);
      chip(ctx, '100 µm = 40 streepjes', 680, 550, C.goud, q.on('veertig', 1), 28);
      chip(ctx, '1 streepje = 2,5 µm', 680, 640, C.goud, q.on('halve', 1), 28);
      chip(ctx, '8 × 2,5 = 20 µm', 680, 730, C.koraal, q.on('twintig', 1), 28);
      chip(ctx, 'ander objectief: opnieuw ijken', 680, 830, C.teal, q.on('opnieuw', 1), 26); ctx.restore(); }
    if (C2 > 0.01) { ctx.save(); ctx.globalAlpha *= C2;
      telkamerZij(ctx, 110, 330, 720, { vloei: q.on('vult', 1), maat: q.on('diep', 1) }); naamBij(ctx, 'telkamer', 'zijaanzicht', 470, 220, 1, 'center');
      chip(ctx, '0,1 millimeter diep', 470, 430, C.goud, q.on('diep', 1), 26);
      const R = 1, hl = q.on('vierkant', 1), n = clamp((t - q.at('telt', 1)) / 1.4, 0, 1) * 50;
      kijkVeld(ctx, 1300, 470, 340, R, LICHTVELD, () => telRaster(ctx, 1300, 470, 200, { hl, n, t }));
      metaA(ctx, 'gele vierkant: 1 × 1 millimeter', 1300, 880 - 30, hl, C.text2, 'center', 22);
      tag(ctx, '1 × 1 × 0,1 mm = 0,1 microliter', 470, 590, C.goud, q.on('microliter', 1), 'center', 28);
      tag(ctx, '50 cellen', 470, 690, C.goud, q.on('vijftig', 1), 'center', 30);
      chip(ctx, 'hoeveel per milliliter?', 470, 790, C.text2, q.on('Hoeveel', 1), 28); vraagteken(ctx, 1700, 170, q.on('denk', 1), 90); ctx.restore(); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vijfhonderdduizend');
    regel(ctx, '50 cellen in 0,1 microliter', 140, 330, 1, C.text, 44, 'left', 700);
    regel(ctx, '= 500 per microliter', 140, 430, q.on('vijfhonderd', 1), C.text, 44, 'left', 700);
    regel(ctx, '1 milliliter = 1000 microliter', 140, 560, q.on('duizend', 1), C.text2, 40, 'left', 600);
    tag(ctx, '500 000 per milliliter', 420, 700, C.goud, q.on('vijfhonderdduizend', 1), 'center', 40);
    kijkVeld(ctx, 1400, 470, 340, 1, LICHTVELD, () => telRaster(ctx, 1400, 470, 200, { hl: 1, n: 50, extra: q.on('vierkanten', 1), t }));
    chip(ctx, 'meer vierkanten tellen → gemiddelde', 1400, 880 - 30, C.teal, q.on('vierkanten', 1), 26); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const Kd = q.on('analist', 1, 0.8);
    const m = yasminLab(ctx, t, 230, 520, 1 - Kd * 0.0, { uit: 'blij' });
    kijkVeld(ctx, 1300, 380, 220, 1 - Kd, LICHTVELD, () => kweekCellen(ctx, 1300, 380, 220, { k: 0.05, t }));
    chip(ctx, 'te klein', 1180, 700, C.koraal, q.on('klein', 1) * (1 - Kd), 28); kruis(ctx, 1290, 690, 18, q.on('klein', 1) * (1 - Kd));
    chip(ctx, 'te weinig contrast', 1440, 780, C.groen, q.on('tegenhouden', 1) * (1 - Kd), 28);
    if (Kd > 0.01) { const y = 470, w = 360, h = 360;
      kaartje(ctx, 900, y, w, h, 'kleuring', 'lichtmicroscoop', HE.rozeR, q.on('kleuring', 1), (x, yy) => leverCoupe(ctx, x, yy, 100, t, {}));
      kaartje(ctx, 1290, y, w, h, 'lichtgevend label', 'fluorescentie', FL.groen, q.on('label', 1), (x, yy) => { ctx.fillStyle = '#05080D'; ctx.beginPath(); ctx.arc(x, yy, 100, 0, 6.283); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x, yy, 100, 0, 6.283); ctx.clip(); fluorVeld(ctx, x, yy, 100, 1, t); ctx.restore(); });
      kaartje(ctx, 1680, y, w, h, 'zware metalen', 'elektronenmicroscoop', C.line, q.on('metalen', 1), (x, yy) => kijkVeld(ctx, x, yy, 92, 1, '#D8D8D8', () => emBeeld(ctx, x, yy, 92, {})));
      tag(ctx, 'een analist maakt contrast', 1290, 200, C.goud, Kd, 'center', 32); } },

  s17(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 230, 880, 560, { t, outfit: 'practicum', kijk: 1, uit: 'blij', pose: t > q.at('Analisten', 1) ? 'wijs' : 'staan' });
    const kaart = (x, y, niv, naam, sub, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 800, 150, 18); shape(ctx, rgba(col, 0.12), col, 2.5); metaText(ctx, niv, x + 30, y + 46, col, 'left', 24); text(ctx, naam, x + 30, y + 96, fTekst(36, 800), C.text, 'left'); text(ctx, sub, x + 30, y + 134, fTekst(26, 600), C.text2, 'left'); ctx.restore(); };
    kaart(560, 190, 'mbo', 'biologisch-medisch analist', 'laboratoriumtechniek · niveau 4 · 4 jaar', C.teal, q.on('mbo', 1));
    kaart(560, 380, 'hbo', 'Biologie en medisch laboratoriumonderzoek', '4 jaar', C.goud, q.on('hbo', 1));
    const wp = [['ziekenhuizen', 'ziekenhuizen'], ['bedrijven', 'bedrijven'], ['onderzoeksinstituten', 'onderzoeksinstituten'], ['milieulabs', 'voedsel- en milieulabs']];
    wp.forEach(([w, s2], i) => chip(ctx, s2, 700 + (i % 2) * 400 + (i === 3 ? 0 : 0), 640 + Math.floor(i / 2) * 80, C.line, q.on(w, 1), 28));
    ziekenhuisje(ctx, 1560, 800, 1.1, q.on('ziekenhuislab', 1)); metaA(ctx, 'volgende film: het ziekenhuislab', 1560, 860, q.on('ziekenhuislab', 1), C.grain, 'center', 20); },
});
