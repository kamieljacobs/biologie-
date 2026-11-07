
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
// Wat word jij? · Laboratoriumtechniek 2 · Van buisje tot uitslag — eigen tekeningen (24 okt 2026)
// Labvoorwerpen in Schema-look: transportbuisje met barcode, wattenstaafje, scanner, handpipet, eppendorfbuisjes,
// pipetteerrobot, plaat met 96 putjes, probe op DNA, amplificatiegrafiek, ijklijn, controlekaart, reagensflesje, vriezer, telefoon.

const KL_OPA = '#E0B64A', KL_ANDER = '#5BA4C9', KL_RNA = '#E07A5F';
function zacht2(ctx, a, f) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; f(); ctx.restore(); }

// wattenstaafje: steel met watten aan het eind (x,y = eind van de steel), richting rot
function wattenstaafje2(ctx, x, y, rot = -1.57, a = 1, len = 150) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(len, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(len + 10, 0, 16, 8, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 1.5); }); }

// barcode (deterministisch)
function barcode(ctx, x, y, w, h, seed = 3) { ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#121A26'; let xx = x + 4; let i = 0;
  while (xx < x + w - 6) { const bw = 1.5 + Math.floor(hash(seed * 31 + i) * 3) * 1.5; if (i % 2 === 0) ctx.fillRect(xx, y + 3, bw, h - 6); xx += bw + 1.5; i++; } }

// transportbuisje met oranje dop, vloeistof en etiket met barcode; o.etiket=false = zonder naam
function transportBuis(ctx, x, y, s = 1, a = 1, o = {}) { const { etiket = true, staaf = true, naam = 'H. de Vries' } = o; zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -26, -170, 52, 230, 24); shape(ctx, rgba('#CFE4F0', 0.14), '#AFC0D0', 2.5);
  ctx.fillStyle = rgba('#E8D9A8', 0.55); roundRect(ctx, -22, -20, 44, 76, 20); ctx.fill();
  if (staaf) { ctx.strokeStyle = '#E8E2D4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -190); ctx.lineTo(0, 20); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 30, 7, 15, 0, 0, 6.283); shape(ctx, '#F8F4EE', '#D6CDBC', 1.2); }
  roundRect(ctx, -32, -212, 64, 46, 8); shape(ctx, '#E07A5F', '#C9654B', 2); ctx.fillStyle = '#C9654B'; for (let k = 0; k < 5; k++) ctx.fillRect(-26 + k * 12, -206, 5, 34);
  if (etiket) { roundRect(ctx, -30, -140, 60, 108, 4); shape(ctx, '#F2F2EE', '#C9CED6', 1); barcode(ctx, -24, -132, 48, 40, 7); ctx.save(); ctx.translate(0, -60); ctx.rotate(-1.5708); text(ctx, naam, 0, 6, fTekst(13, 700), '#121A26', 'center'); ctx.restore(); } }); }

// handscanner met rode lichtstraal (beam 0..1) naar (tx,ty)
function handScanner(ctx, x, y, s = 1, a = 1, beam = 0, tx = 0, ty = 0) { zacht2(ctx, a, () => {
  if (beam > 0.01) { ctx.save(); ctx.globalAlpha *= beam * 0.6; ctx.fillStyle = '#E05A4A'; ctx.beginPath(); ctx.moveTo(x + 40 * s, y - 10 * s); ctx.lineTo(tx, ty - 30); ctx.lineTo(tx, ty + 30); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -34, 110, 52, 18); shape(ctx, '#3A4458', '#5A6478', 2); roundRect(ctx, -40, 0, 34, 90, 12); shape(ctx, '#3A4458', '#5A6478', 2); ctx.fillStyle = '#E05A4A'; ctx.fillRect(40, -24, 8, 32); ctx.restore(); }); }

// beeldscherm met regels: rows = [[tekst, alpha, kleur, vink(0..1)]]
function labScherm(ctx, x, y, w, h, a = 1, titel = '', rows = [], px = 28) { zacht2(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1826', '#5A6478', 3); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + w / 2 - 14, y + h, 28, 30); roundRect(ctx, x + w / 2 - 90, y + h + 26, 180, 14, 6); shape(ctx, '#5A6478', null);
  if (titel) metaText(ctx, titel, x + 30, y + 46, C.grain, 'left', 20);
  rows.forEach(([s2, al, col, vk], i) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const yy = y + 100 + i * (px + 30); text(ctx, s2, x + 80, yy, fTekst(px, 600), col || C.text, 'left');
    if (vk != null) { if (vk > 0.01) vink_(ctx, x + 44, yy - 10, 14, vk); else { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.strokeRect(x + 32, yy - 24, 24, 24); } } ctx.restore(); }); }); }

// handpipet (verticaal), x,y = punt van de tip; disp = tekst op het display; drup 0..1 = druppel aan de tip
function handPipet(ctx, x, y, s = 1, a = 1, disp = '10 µl', drup = 0, tipKleur = '#E8ECF2') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.lineTo(12, -120); ctx.lineTo(-12, -120); ctx.closePath(); shape(ctx, rgba(tipKleur, 0.85), '#AFC0D0', 1.5);
  roundRect(ctx, -20, -200, 40, 84, 10); shape(ctx, '#9AA3B2', '#7A8498', 2);
  roundRect(ctx, -38, -470, 76, 280, 30); shape(ctx, '#E8ECF2', '#9AA3B2', 2.5); roundRect(ctx, -28, -420, 56, 44, 6); shape(ctx, '#1C2A3E', null); text(ctx, disp, 0, -390, fMeta(17), '#7FC48F', 'center');
  ctx.beginPath(); ctx.moveTo(30, -440); ctx.quadraticCurveTo(66, -430, 60, -380); ctx.lineWidth = 10; ctx.strokeStyle = '#B8C0D0'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.fillStyle = '#7A8498'; ctx.fillRect(-7, -540, 14, 74); roundRect(ctx, -26, -556, 52, 20, 8); shape(ctx, C.teal, null);
  if (drup > 0.01) { const r = 9 * drup; ctx.beginPath(); ctx.arc(0, 4 + r, r, 0, 6.283); ctx.fillStyle = rgba('#9FD0EA', 0.9); ctx.fill(); } }); }

// eppendorfbuisje; vul 0..1 (hoogte vloeistof), kleur + sterkte (0..1) = concentratie
function eppje(ctx, x, y, s = 1, a = 1, vul = 0.6, sterk = 1, col = KL_RNA, rand = '#AFC0D0') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  const pad = () => { ctx.beginPath(); ctx.moveTo(-34, -120); ctx.lineTo(34, -120); ctx.lineTo(34, -20); ctx.lineTo(8, 60); ctx.quadraticCurveTo(0, 72, -8, 60); ctx.lineTo(-34, -20); ctx.closePath(); };
  pad(); shape(ctx, rgba('#CFE4F0', 0.12), null);
  if (vul > 0.01) { ctx.save(); pad(); ctx.clip(); const top = 66 - vul * 170; ctx.fillStyle = rgba('#9FD0EA', 0.35); ctx.fillRect(-40, top, 80, 200); if (sterk > 0.004) { ctx.fillStyle = rgba(col, 0.12 + 0.78 * sterk); ctx.fillRect(-40, top, 80, 200); } ctx.restore(); }
  pad(); ctx.strokeStyle = rand; ctx.lineWidth = 2.5; ctx.stroke(); roundRect(ctx, -40, -138, 80, 20, 6); shape(ctx, '#D8DEE4', '#AFC0D0', 2); ctx.beginPath(); ctx.ellipse(52, -132, 14, 9, 0.3, 0, 6.283); shape(ctx, '#D8DEE4', '#AFC0D0', 2); }); }

// liniaal in millimeter (vergroot) met druppel van d mm
function druppelLiniaal(ctx, x, y, mm = 40, a = 1, d = 2.67) { zacht2(ctx, a, () => { const L = 5 * mm; roundRect(ctx, x - 14, y, L + 28, 66, 6); shape(ctx, '#E8D9A8', '#B8A27A', 2); ctx.strokeStyle = '#4A3A2E'; ctx.lineWidth = 2;
  for (let k = 0; k <= 5; k++) { ctx.beginPath(); ctx.moveTo(x + k * mm, y); ctx.lineTo(x + k * mm, y + 28); ctx.stroke(); text(ctx, String(k), x + k * mm, y + 54, fTekst(20, 700), '#4A3A2E', 'center'); }
  const r = d * mm / 2; ctx.beginPath(); ctx.moveTo(x + r, y - 4 - 2.1 * r); ctx.bezierCurveTo(x + r + r * 0.15, y - 4 - 1.6 * r, x + 2 * r, y - 4 - 1.1 * r, x + 2 * r, y - 4 - r * 0.9); ctx.arc(x + r, y - 4 - r * 0.9, r, 0, Math.PI); ctx.bezierCurveTo(x, y - 4 - 1.1 * r, x + r - r * 0.15, y - 4 - 1.6 * r, x + r, y - 4 - 2.1 * r); ctx.fillStyle = rgba('#9FD0EA', 0.85); ctx.fill(); ctx.strokeStyle = '#5BA4C9'; ctx.stroke(); }); }

// plaat met 96 putjes (8 × 12); fn(i, j) -> [vulkleur, gloei 0..1] of null; x,y linksboven, w breed
function plaat96(ctx, x, y, w, a = 1, fn = null) { zacht2(ctx, a, () => { const h = w * 0.67, p = w / 13.2, r = p * 0.36; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#D8DEE4', '#9AA3B2', 2.5);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) { const cx = x + p * 1.1 + j * p, cy = y + p * 1.0 + i * p * 0.98; const v = fn ? fn(i, j) : null;
    if (v && v[1] > 0.01) { ctx.save(); ctx.globalAlpha *= v[1] * 0.5; circ(ctx, cx, cy, r * 1.7, v[0]); ctx.restore(); }
    circ(ctx, cx, cy, r, v ? v[0] : '#B8C2CE', '#8A94A8', 1.2); } }); }

// pipetteerrobot: portaal met een kop van 8 tips; u 0..1 = positie van de kop over de breedte, z 0..1 = kop omlaag
function pipetRobot(ctx, x, y, w, a = 1, u = 0, z = 0) { zacht2(ctx, a, () => { const h = 400;
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x, y, 22, h); ctx.fillRect(x + w - 22, y, 22, h); roundRect(ctx, x - 10, y - 30, w + 20, 46, 10); shape(ctx, '#4A5468', '#6A7488', 2);
  const kx = x + 60 + u * (w - 220), ky = y + 16; roundRect(ctx, kx, ky, 100, 90 + z * 60, 10); shape(ctx, '#5A6478', '#8A94A8', 2);
  for (let k = 0; k < 8; k++) { const tx = kx + 10 + k * 11.5; ctx.beginPath(); ctx.moveTo(tx - 4, ky + 90 + z * 60); ctx.lineTo(tx + 4, ky + 90 + z * 60); ctx.lineTo(tx + 1, ky + 150 + z * 60); ctx.lineTo(tx - 1, ky + 150 + z * 60); ctx.closePath(); shape(ctx, '#E8ECF2', '#AFC0D0', 1); }
  ctx.fillStyle = C.teal; ctx.fillRect(x + 30, y + h - 14, 60, 6); }); }

// rek met buisjes
function buisRek(ctx, x, y, n = 8, a = 1, s = 0.5) { zacht2(ctx, a, () => { for (let k = 0; k < n; k++) transportBuis(ctx, x + k * 40 * s * 2, y, s, 1, { staaf: false, naam: '' }); roundRect(ctx, x - 40 * s, y + 10 * s, n * 80 * s, 40 * s, 6); shape(ctx, '#5A6478', '#8A94A8', 2); }); }

// stukje dubbelstrengs DNA (horizontaal), x0..x1 op hoogte y; met probe (pos px..px+pw) en polymerase op positie pol (x) ; knip 0..1
function probeOpDNA(ctx, x0, x1, y, a = 1, o = {}) { const { px = 0.55, pw = 260, pol = null, knip = 0, gloei = 0, nieuw = 0, pa = 1 } = o; zacht2(ctx, a, () => {
  ctx.lineCap = 'round'; ctx.strokeStyle = C.paars; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0, y + 60); ctx.lineTo(x1, y + 60); ctx.stroke();
  for (let xx = x0 + 14; xx < x1; xx += 30) { ctx.strokeStyle = rgba(C.paars, 0.6); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xx, y + 54); ctx.lineTo(xx, y + 30); ctx.stroke(); }
  const pX = x0 + (x1 - x0) * px;
  if (nieuw > 0.01 && pol != null) { ctx.strokeStyle = C.teal; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0 + 20, y + 18); ctx.lineTo(Math.max(x0 + 20, pol - 70), y + 18); ctx.stroke(); }
  const rest = clamp(knip, 0, 1);
  ctx.globalAlpha *= pa;
  if (rest < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - rest; ctx.strokeStyle = C.groen; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(pX, y + 18); ctx.lineTo(pX + pw, y + 18); ctx.stroke(); ctx.restore(); }
  const qx = pX + pw + 14 + rest * 60, qy = y + 18 - rest * 90, rx = pX - 14 - rest * 40, ry = y + 18 - rest * 190;
  circ(ctx, qx, qy, 24, '#2A2F3E', '#8A94A8', 3); // blokkeerder
  if (gloei > 0.01) { ctx.save(); ctx.globalAlpha *= gloei * 0.35; circ(ctx, rx, ry, 80, KL_OPA); ctx.globalAlpha = a * gloei * 0.5; circ(ctx, rx, ry, 48, KL_OPA); ctx.restore(); }
  circ(ctx, rx, ry, 24, gloei > 0.3 ? '#F6D77A' : '#7A6A38', '#C9A35C', 3); // kleurstof
  if (pol != null) { ctx.beginPath(); ctx.ellipse(pol, y + 10, 84, 64, 0, 0, 6.283); shape(ctx, rgba(C.enzym, 0.92), '#AFC0D0', 3); } }); }
// amplificatiegrafiek: licht tegen cycli; curves = [{ct, col, u (0..1 getekend)}]; nu = huidige cyclus (0..40); dr = drempel tonen
function ampKromme(ct) { const D = 0.06, k = 0.75, m = ct + Math.log(1 / D - 1) / k; return c => 1 / (1 + Math.exp(-k * (c - m))); }
function ampGrafiek(ctx, x, y, w, h, a = 1, curves = [], nu = 40, dr = 0, o = {}) { zacht2(ctx, a, () => { const X = c => x + c / 40 * w, Y = v => y + h - v * h * 0.92;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  for (let c = 0; c <= 40; c += 10) { text(ctx, String(c), X(c), y + h + 34, fTekst(22, 600), C.text2, 'center'); }
  metaText(ctx, 'aantal cycli', x + w, y + h + 70, C.text2, 'right', 18); metaText(ctx, 'licht', x, y - 16, C.text2, 'left', 18);
  if (dr > 0.01) { ctx.save(); ctx.globalAlpha *= dr; ctx.setLineDash([12, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(0.06)); ctx.lineTo(x + w, Y(0.06)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'drempel', x + w - 8, Y(0.06) - 14, fTekst(24, 700), C.koraal, 'right'); ctx.restore(); }
  curves.forEach(cv => { if ((cv.u ?? 1) <= 0.01) return; const f = ampKromme(cv.ct), cmax = Math.min(nu, 40) * (cv.u ?? 1); ctx.strokeStyle = cv.col; ctx.lineWidth = 5; ctx.beginPath();
    for (let c = 0; c <= cmax; c += 0.25) { const p = [X(c), Y(f(c) - f(0))]; c ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke();
    if (cv.m > 0.01 && cmax >= cv.ct) { ctx.save(); ctx.globalAlpha *= cv.m; ctx.setLineDash([6, 6]); ctx.strokeStyle = cv.col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(X(cv.ct), Y(0.06)); ctx.lineTo(X(cv.ct), y + h); ctx.stroke(); ctx.setLineDash([]); circ(ctx, X(cv.ct), Y(0.06), 9, cv.col);
      if (cv.lab) { const lx = X(cv.ct) + (cv.lr || 1) * 14; ctx.font = fTekst(26, 700); const tw = ctx.measureText(cv.lab).width; const bx = (cv.lr || 1) > 0 ? lx : lx - tw; roundRect(ctx, bx - 8, y + h - 66, tw + 16, 38, 8); shape(ctx, '#1A2740', null); text(ctx, cv.lab, bx, y + h - 38, fTekst(26, 700), cv.col, 'left'); } ctx.restore(); } }); }); }

// ijklijn: Ct (verticaal, omhoog = hoger) tegen log10 kopieën (2..6); np = aantal standaarden zichtbaar (0..5), lijn 0..1, opa 0..1
function ijklijnGrafiek(ctx, x, y, w, h, a = 1, o = {}) { const { np = 5, lijn = 0, opa = 0, stap = 0 } = o; zacht2(ctx, a, () => {
  const X = l => x + (l - 1.6) / 4.8 * w, Y = ct => y + h - (ct - 14) / 20 * h, ctOf = l => 17 - 3.32 * (l - 6);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ['100', '1000', '10 000', '100 000', '1 miljoen'].forEach((s2, i) => text(ctx, s2, X(2 + i), y + h + 34, fTekst(21, 600), C.text2, 'center'));
  [15, 20, 25, 30].forEach(ct => text(ctx, String(ct), x - 14, Y(ct) + 8, fTekst(22, 600), C.text2, 'right'));
  metaText(ctx, 'kopieën per putje (bij het begin)', x + w, y + h + 70, C.text2, 'right', 18); metaText(ctx, 'Ct-waarde', x, y - 16, C.text2, 'left', 18);
  if (lijn > 0.01) { ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(1.8), Y(ctOf(1.8))); const le = 1.8 + 4.4 * lijn; ctx.lineTo(X(le), Y(ctOf(le))); ctx.stroke(); }
  for (let i = 0; i < 5; i++) { const al = clamp(np - i, 0, 1); if (al <= 0.01) continue; const l = 6 - i; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(l), Y(ctOf(l)), 12, '#F2F2EE', C.teal, 3); ctx.restore(); }
  if (stap > 0.01) { ctx.save(); ctx.globalAlpha *= stap; const l1 = 5, l2 = 4; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(l1), Y(ctOf(l1))); ctx.lineTo(X(l1), Y(ctOf(l2))); ctx.lineTo(X(l2), Y(ctOf(l2))); ctx.stroke(); text(ctx, '+3,3', X(l1) + 12, (Y(ctOf(l1)) + Y(ctOf(l2))) / 2 + 8, fTekst(24, 700), C.goud, 'left'); text(ctx, '÷10', (X(l1) + X(l2)) / 2, Y(ctOf(l2)) - 14, fTekst(24, 700), C.goud, 'center'); ctx.restore(); }
  if (opa > 0.01) { ctx.save(); ctx.globalAlpha *= opa; const l = Math.log10(3906); ctx.setLineDash([8, 7]); ctx.strokeStyle = KL_OPA; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, Y(25)); ctx.lineTo(X(l), Y(25)); ctx.lineTo(X(l), y + h); ctx.stroke(); ctx.setLineDash([]); circ(ctx, X(l), Y(25), 13, KL_OPA, '#F2F2EE', 2); ctx.restore(); } }); }

// controlekaart (Levey-Jennings): punten = afwijking in sd per dag; n = zichtbaar; band 0..1; hl = { index: [kleur, a] }
const QC_PUNTEN = [0.3, -0.6, 0.9, -0.2, 0.5, -1.1, 2.3, 0.2, -0.4, 0.7, -0.8, 0.1, 1.2, -0.3, 2.4, 2.6];
function controleKaart(ctx, x, y, w, h, a = 1, o = {}) { const { n = QC_PUNTEN.length, band = 1, drie = 1, hl = {} } = o; zacht2(ctx, a, () => {
  const Y = sd => y + h / 2 - sd * h / 7, X = i => x + 40 + i * (w - 80) / (QC_PUNTEN.length - 1);
  if (band > 0.01) { ctx.save(); ctx.globalAlpha *= band; ctx.fillStyle = rgba(C.groen, 0.12); ctx.fillRect(x, Y(2), w, Y(-2) - Y(2)); ctx.strokeStyle = rgba(C.oker, 0.9); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); [2, -2].forEach(sd => { ctx.beginPath(); ctx.moveTo(x, Y(sd)); ctx.lineTo(x + w, Y(sd)); ctx.stroke(); }); ctx.setLineDash([]);
    text(ctx, '+2 sd', x + w + 12, Y(2) + 8, fTekst(22, 700), C.oker, 'left'); text(ctx, '−2 sd', x + w + 12, Y(-2) + 8, fTekst(22, 700), C.oker, 'left'); ctx.restore(); }
  if (drie > 0.01) { ctx.save(); ctx.globalAlpha *= drie; ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 2; [3, -3].forEach(sd => { ctx.beginPath(); ctx.moveTo(x, Y(sd)); ctx.lineTo(x + w, Y(sd)); ctx.stroke(); }); text(ctx, '+3 sd', x + w + 12, Y(3) + 8, fTekst(22, 700), C.koraal, 'left'); ctx.restore(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, Y(0)); ctx.lineTo(x + w, Y(0)); ctx.stroke(); text(ctx, 'gemiddelde', x + w + 12, Y(0) + 8, fTekst(22, 700), C.text2, 'left');
  metaText(ctx, 'Ct van de positieve controle', x, y - 16, C.text2, 'left', 18); metaText(ctx, 'dag', x + w, y + h + 34, C.text2, 'right', 18);
  ctx.strokeStyle = rgba(C.text, 0.5); ctx.lineWidth = 2; ctx.beginPath(); const nn = Math.min(QC_PUNTEN.length, Math.ceil(n));
  for (let i = 0; i < nn; i++) { const p = [X(i), Y(QC_PUNTEN[i])]; i ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke();
  for (let i = 0; i < nn; i++) { const al = clamp(n - i, 0, 1); const hk = hl[i]; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(i), Y(QC_PUNTEN[i]), 11, '#F2F2EE', C.line, 2); if (hk && hk[1] > 0.01) { ctx.globalAlpha *= hk[1]; circ(ctx, X(i), Y(QC_PUNTEN[i]), 13, hk[0]); circ(ctx, X(i), Y(QC_PUNTEN[i]), 24, null, hk[0], 4); } ctx.restore(); } }); }
function qcPunt(x, y, w, h, i) { return [x + 40 + i * (w - 80) / (QC_PUNTEN.length - 1), y + h / 2 - QC_PUNTEN[i] * h / 7]; }

// reagensflesje en vriezer met thermometer (warm 0..1)
function reagensFles(ctx, x, y, s = 1, a = 1) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -34, -110, 68, 110, 14); shape(ctx, rgba('#CFE4F0', 0.2), '#AFC0D0', 2.5); ctx.fillStyle = rgba(C.paars, 0.55); roundRect(ctx, -30, -60, 60, 56, 10); ctx.fill(); roundRect(ctx, -22, -140, 44, 32, 6); shape(ctx, C.paars, null); roundRect(ctx, -26, -96, 52, 30, 4); shape(ctx, '#F2F2EE', null); text(ctx, 'mix', 0, -74, fTekst(18, 700), '#121A26', 'center'); }); }
function vriezer(ctx, x, y, s = 1, a = 1) { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -300, 220, 300, 14); shape(ctx, '#D8DEE4', '#9AA3B2', 3); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-110, -150); ctx.lineTo(110, -150); ctx.stroke(); ctx.fillStyle = '#7A8498'; ctx.fillRect(80, -270, 10, 90); ctx.fillRect(80, -130, 10, 90); text(ctx, '−20 °C', 0, -200, fTekst(30, 700), '#2A3446', 'center'); }); }
function thermometer(ctx, x, y, a = 1, warm = 0) { zacht2(ctx, a, () => { roundRect(ctx, x - 12, y - 150, 24, 150, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x, y, 20, C.koraal); ctx.fillStyle = C.koraal; const hh = 30 + warm * 100; ctx.fillRect(x - 5, y - hh, 10, hh); }); }

// mobiele telefoon (in de hand)
function telefoon(ctx, x, y, s = 1, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); roundRect(ctx, -16, -58, 32, 60, 6); shape(ctx, '#2A2F3E', '#5A6478', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-12, -52, 24, 42); ctx.restore(); }

// weegschaal (analytisch) met display
function balans(ctx, x, y, s = 1, a = 1, disp = '9,98 mg') { zacht2(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -160, -60, 320, 90, 14); shape(ctx, '#D8DEE4', '#9AA3B2', 2.5); roundRect(ctx, -110, -40, 150, 44, 6); shape(ctx, '#1C2A3E', null); text(ctx, disp, -35, -9, fMeta(24), '#7FC48F', 'center');
  ctx.strokeStyle = rgba('#CFE4F0', 0.5); ctx.lineWidth = 3; ctx.strokeRect(-120, -260, 240, 200); ctx.beginPath(); ctx.ellipse(0, -70, 70, 12, 0, 0, 6.283); shape(ctx, '#B8C2CE', '#8A94A8', 2); eppje(ctx, 0, -100, 0.4, 1, 0.3, 0); }); }

// keten van stappen (chips onder elkaar of naast elkaar)
function stapRij(ctx, items, x, y, dx, dy, a = 1, px = 26) { items.forEach(([s2, al, col], i) => { tag(ctx, s2, x + i * dx, y + i * dy, col || C.teal, a * al, 'center', px); if (i && dy) pijl(ctx, x + i * dx, y + (i - 1) * dy + 24, x + i * dx, y + i * dy - px - 12, C.line, a * al, 3, 12); }); }
// Wat word jij? · Laboratoriumtechniek 2 · Van buisje tot uitslag — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim in labjas, Yasmin in practicumkleding).
// Rode draad: Yasmin volgt het buisje van Opa Henk door het lab. Rekenvoorbeeld (ijklijn, Ct 25 ≈ 3900 kopieën) in reken/bereken.py.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
const BUIS_X = [760, 1010, 1260, 1510, 1760], BUIS_STERK = [1, 0.5, 0.26, 0.13, 0.06], BUIS_LAB = ['1×', '10×', '100×', '1000×', '10 000×'];
// boog met pijl tussen twee buisjes
function overBoog(ctx, x1, x2, y, a = 1, col = C.text2, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1 + 10, y); ctx.quadraticCurveTo((x1 + x2) / 2, y - 90, x2 - 16, y - 6); ctx.stroke();
  pijl(ctx, x2 - 30, y - 22, x2 - 12, y - 4, col, 1, 3.5, 14); if (lab) text(ctx, lab, (x1 + x2) / 2, y - 62, fTekst(24, 700), col, 'center'); ctx.restore(); }
function plaatControles(ctx, x, y, w, a, o) { const { neg = 0, pos = 0, opa = 0, intern = 0, mis = 0 } = o;
  plaat96(ctx, x, y, w, a, (i, j) => { if (i === 0 && j === 0) return neg > 0.01 ? ['#3A4458', 0] : null; if (i === 1 && j === 0) return pos > 0.01 ? [KL_OPA, pos] : null; if (i === 2 && j === 3) return opa > 0.01 ? [KL_OPA, opa] : (intern > 0.01 ? [C.teal, intern * 0.5] : null);
    if (i === 4 && j === 7) return mis > 0.01 ? ['#3A4458', 0] : (intern > 0.01 ? [C.teal, intern * 0.5] : null); return intern > 0.01 ? [C.teal, intern * 0.5] : null; }); }
function putjeXY(x, y, w, i, j) { const p = w / 13.2; return [x + p * 1.1 + j * p, y + p * 1.0 + i * p * 0.98]; }

Object.assign(SCENES, {
  title(ctx, t) { transportBuis(ctx, 1240, 700, 1.3, 1, { naam: 'H. de Vries' }); plaat96(ctx, 1380, 430, 440, 1, (i, j) => (i + j * 3) % 7 === 2 ? [KL_OPA, 0.5 + 0.3 * Math.sin(t * 1.5 + i)] : null); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('lab', 1, 0.8);
    const sw = clamp((t - q.at('strijkt', 1)) / 2.2, 0, 1);
    persoon(ctx, 'henk', 760, 880, 430, { t, kijk: -1, uit: 'moe' });
    persoon(ctx, 'kim', 420, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: 'vasthouden', hold: (c, x, y) => { if (sw < 0.98 || t < q.at('stuurt', 1)) wattenstaafje2(c, x, y, -0.76 - 0.06 * Math.sin(sw * 9.4), 1, 160 + 8 * Math.sin(sw * 6.3)); } });
    naamBij(ctx, 'Opa Henk', 'al dagen ziek', 860, 400, 1 - q.on('Dezelfde', 1), 'left'); naamBij(ctx, 'Dr. Kim', 'arts', 230, 400, q.on('Kim', 1) * (1 - q.on('Dezelfde', 1)), 'left');
    transportBuis(ctx, 1120, 700, 0.9, q.on('buisje', 1), { naam: 'H. de Vries' });
    tag(ctx, 'lab', 1700, 300, C.teal, L, 'center', 32); pijl(ctx, 1180, 420, 1600, 320, C.line, L, 4, 18);
    if (t > q.at('uitslag', 1)) { const u = q.on('uitslag', 1); document_(ctx, 1700, 560, 2.4, C.groen, u); regel(ctx, 'uitslag: dezelfde dag', 1700, 680, u, C.text, 28, 'center', 700); }
    const n = 20 * clamp((t - q.at('tientallen', 1)) / 1.6, 0, 1); for (let i = 0; i < n; i++) { const u = i / 19, x = 1250 + u * 400, y = 470 + Math.sin(u * 6.28) * 40; circ(ctx, x, y, 7, C.goud); }
    regel(ctx, 'tientallen handelingen', 1450, 370, q.on('tientallen', 1), C.goud, 26, 'center', 700);
    vraagteken(ctx, 1450, 640, q.on('mis', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vóór het meten'); const D = q.on('ontvangst', 1, 0.8);
    if (D < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - D; const bx = 240, bw = 900, rows = [['vóór het meten', 0.57, C.koraal, '± 46–68 %'], ['tijdens het meten', 0.1, C.teal, 'klein deel'], ['na het meten', 0.3, C.oker, '± 19–47 %']];
      metaA(ctx, 'WAAR ONTSTAAN LABFOUTEN? · OVERZICHT VAN ONDERZOEKEN', bx, 250, 1, C.grain, 'left', 22);
      rows.forEach(([s2, f, col, v], i) => { const y = 320 + i * 120, u = i === 0 ? q.on('helft', 1, 1.2) : q.on('helft', 1, 1.2) * q.on('meten', 1); regel(ctx, s2, bx, y + 30, 1, C.text, 30, 'left', 600); roundRect(ctx, bx + 300, y, bw - 300, 44, 10); shape(ctx, '#2A3446', C.line, 1.5); if (u > 0.01) { roundRect(ctx, bx + 300, y, Math.max(16, (bw - 300) * f * u), 44, 10); shape(ctx, rgba(col, 0.7), col, 2); } regel(ctx, v, bx + bw + 20, y + 32, u, col, 28, 'left', 700); });
      chip(ctx, 'verwisseld buisje', 1500, 330, C.koraal, q.on('verwisseld', 1), 28); chip(ctx, 'verkeerd etiket', 1500, 420, C.koraal, q.on('etiket', 1), 28); chip(ctx, 'te lang warm', 1500, 510, C.koraal, q.on('warm', 1), 28); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; const Y = q.on('Yasmin', 1, 0.3), sc = q.on('scant', 1);
      persoon(ctx, 'yasmin', 330, 880, 420, { t, a: Y, kijk: 1, outfit: 'practicum', pose: 'vasthouden', uit: 'neutraal', hold: (c, x, y) => handScanner(c, x + 10, y - 10, 0.8, 1, sc * (t < q.at('scant', 1) + 2.5 ? 1 : 0), 640, 480) });
      naamBij(ctx, 'Yasmin', 'stage als analist', 120, 400, Y * (1 - q.on('Klopt', 1)), 'left');
      transportBuis(ctx, 640, 640, 1.0, 1, { naam: 'H. de Vries' });
      const kz = q.on('zonder', 1); transportBuis(ctx, 880, 640, 1.0, kz, { etiket: false }); kruis(ctx, 880, 420, 34, q.on('keurt', 1)); stempel(ctx, 880, 300, 'afgekeurd', C.koraal, q.on('keurt', 1));
      const V = q.on('Vanaf', 1, 0.6);
      labScherm(ctx, 1080, 230, 720, 430, 1 - V, 'ONTVANGST · AANVRAAG DR. KIM', [['naam en geboortedatum = aanvraag', q.on('naam', 1), C.text, q.on('aanvraag', 1)], ['juiste buisje', q.on('juiste', 1), C.text, q.on('juiste', 1, 0.8) * ramp(t, q.at('juiste', 1) + 0.8, 0.5)], ['op tijd en koel genoeg', q.on('koel', 1), C.text, ramp(t, q.at('koel', 1) + 0.8, 0.5)]], 30);
      labScherm(ctx, 1080, 230, 720, 430, V, 'SPOOR VAN HET BUISJE', [['08:42  ontvangen · Yasmin', q.on('Vanaf', 1), C.text], ['09:10  RNA eruit · robot 2', q.on('stap', 1), C.text], ['10:55  PCR-run 14', q.on('vastgelegd', 1), C.text], ['wie · wat · wanneer', q.on('wanneer', 1), C.goud]], 28);
      ctx.restore(); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('standaarden', 1, 0.8);
    handPipet(ctx, 330, 760, 0.95, 1, '10 µl', q.on('druppeltje', 1));
    druppelLiniaal(ctx, 470, 660, 44, q.on('Tien', 1) * (1 - S)); regel(ctx, '10 µl: nog geen 3 mm', 580, 470, q.on('millimeter', 1) * (1 - S), C.text, 30, 'center', 700); metaA(ctx, 'VERGROOT · 1 STREEP = 1 MILLIMETER', 470, 770, q.on('Tien', 1) * (1 - S), C.grain, 'left', 18);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      const tW = q.at('negentig', 1), tVol = q.at('volgende', 1), tT = q.at('tienduizend', 1);
      for (let i = 0; i < 5; i++) { const water = i === 0 ? 1 : (i === 1 ? ramp(t, tW, 0.8) : ramp(t, q.at('Uit', 1), 1)); const kleur = i === 0 ? 1 : (i === 1 ? ramp(t, q.at('Dat', 1), 1) : ramp(t, tVol + (i - 2) * 1.2, 0.8));
        eppje(ctx, BUIS_X[i], 600, 1.15, i === 0 ? 1 : q.on('negentig', 1), 0.15 + 0.45 * water, BUIS_STERK[i] * kleur);
        regel(ctx, BUIS_LAB[i], BUIS_X[i], 760, i === 0 ? q.on('sterkste', 1) : ramp(t, (i === 1 ? q.at('tien', 3) : tVol + (i - 2) * 1.2) + 0.3, 0.5), i === 0 ? C.text : C.goud, 30, 'center', 700); }
      metaA(ctx, 'KEER VERDUND', 1260, 810, q.on('verdund', 1), C.grain, 'center', 20);
      regel(ctx, 'sterkste standaard', BUIS_X[0], 300, q.on('sterkste', 1) * (1 - q.on('Stel', 1)), C.text, 26, 'center', 700);
      overBoog(ctx, BUIS_X[0], BUIS_X[1], 430, q.on('pipetteert', 1), q.on('eerste', 1) > 0.5 ? C.koraal : C.text2, q.on('eerste', 1) > 0.5 ? '−2 %' : '10 µl');
      regel(ctx, '+ 90 µl water', BUIS_X[1], 300, q.on('negentig', 1) * (1 - q.on('Uit', 1)), C.teal, 26, 'center', 700);
      tag(ctx, '10 µl in 90 µl = 1 op 10', 1400, 200, C.goud, q.on('verdunning', 1), 'center', 32);
      for (let i = 1; i < 4; i++) overBoog(ctx, BUIS_X[i], BUIS_X[i + 1], 430, ramp(t, tVol + (i - 1) * 1.2, 0.6), C.text2, '10 µl');
      ctx.restore(); }
    vraagteken(ctx, 1760, 300, q.on('denk', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de verdunde buisjes allemaal 2 % te laag'); const T = q.on('Twee', 2, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T;
      for (let i = 0; i < 5; i++) { eppje(ctx, BUIS_X[i] - 300, 470, 0.85, 1, 0.5, BUIS_STERK[i]); regel(ctx, BUIS_LAB[i], BUIS_X[i] - 300, 590, 1, C.goud, 26, 'center', 700); if (i < 4) overBoog(ctx, BUIS_X[i] - 300, BUIS_X[i + 1] - 300, 360, q.on('vorige', 1), i === 0 ? C.koraal : C.text2, ''); }
      regel(ctx, 'fout in stap 1', 160, 680, 1, C.text2, 26, 'left', 700); regel(ctx, 'fout in elke stap', 160, 780, q.on('Pas', 1), C.text2, 26, 'left', 700);
      for (let i = 1; i < 5; i++) { chip(ctx, '−2 %', BUIS_X[i] - 300, 680, C.koraal, ramp(t, q.at('laag', 1) + (i - 1) * 0.25, 0.4), 26); chip(ctx, '−' + ['2', '4', '6', '8'][i - 1] + ' %', BUIS_X[i] - 300, 780, C.koraal, ramp(t, q.at('stapelen', 1) + (i - 1) * 0.3, 0.4), 26); }
      chip(ctx, 'gaat mee, groeit niet', 1710, 680, C.groen, q.on('groeit', 1), 26); chip(ctx, 'stapelt op', 1710, 780, C.oker, q.on('stapelen', 1), 26); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; handPipet(ctx, 330, 800, 0.95, 1, '10 µl', 1);
      tag(ctx, '2 % van 10 µl = 0,2 µl', 900, 330, C.goud, q.on('tiende', 1), 'center', 34);
      regel(ctx, 'norm voor pipetten van 2 tot 20 µl (ISO 8655):', 560, 460, q.on('norm', 1), C.text, 28, 'left', 600); regel(ctx, 'bij 10 µl hooguit 0,2 µl ernaast', 560, 510, q.on('norm', 1), C.text, 28, 'left', 700);
      balans(ctx, 1450, 780, 1.0, q.on('gecontroleerd', 1), '9,98 mg'); regel(ctx, '10 µl water weegt 10 mg', 1450, 860, q.on('wegen', 1), C.teal, 26, 'center', 700); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Nieuw', 1, 0.8), Cc = q.on('cyclus', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const rt = clamp((t - 1.5) / 10, 0, 1);
      buisRek(ctx, 240, 760, 6, 1, 0.55); pipetRobot(ctx, 220, 260, 1200, 1, 0.5 + 0.45 * Math.sin(t * 0.9), 0.5 + 0.5 * Math.sin(t * 1.8));
      plaat96(ctx, 900, 570, 420, 1, (i, j) => (i * 12 + j) < 96 * rt * q.on('pipetteert', 1, 2) * 1.0 ? [rgba(C.teal, 0.8), 0] : null);
      regel(ctx, 'plaat met 96 putjes', 1110, 550, q.on('zesennegentig', 1), C.text, 26, 'center', 700);
      naamBij(ctx, 'monsters', '', 240, 600, q.on('monsters', 1), 'left');
      tag(ctx, 'grootste robots: ruim 100 uitslagen per uur', 1300, 180, C.goud, q.on('honderd', 1), 'center', 28);
      tag(ctx, 'film: Op maat gekopieerd', 1640, 420, C.teal, q.on('PCR', 1), 'center', 26); ctx.restore(); }
    if (B > 0.01 && Cc < 0.99) { ctx.save(); ctx.globalAlpha *= B * (1 - Cc); const tp = q.at('polymerase', 1), tk = q.at('openknipt', 1);
      tag(ctx, 'real-time: licht meten na elke cyclus', 960, 210, C.goud, 1, 'center', 32); regel(ctx, 'eerst: RNA → DNA (reverse transcriptase)', 960, 290, 1, C.text2, 26, 'center', 600);
      const x0 = 160, x1 = 1760, Px = x0 + 1600 * 0.55, pol = lerp(x0 + 140, Px - 70, clamp((t - tp) / (tk - tp + 0.4), 0, 1));
      probeOpDNA(ctx, x0, x1, 560, 1, { pa: q.on('probe', 1), px: 0.55, pw: 260, pol: t > tp - 0.5 ? pol : null, knip: q.on('openknipt', 1, 0.8), gloei: q.on('openknipt', 1, 1.2), nieuw: q.on('polymerase', 1) });
      naamBij(ctx, 'probe', 'kort stukje DNA', Px + 130, 470, q.on('probe', 1) * (1 - q.on('openknipt', 1)), 'center');
      naamBij(ctx, 'kleurstof', '', Px - 14, 690, q.on('kleurstof', 1) * (1 - q.on('polymerase', 1)), 'center');
      naamBij(ctx, 'blokkeert het licht', '', Px + 300, 690, q.on('kleurstof', 1) * (1 - q.on('openknipt', 1)), 'left');
      naamBij(ctx, 'polymerase', '', pol, 720, q.on('polymerase', 1), 'center');
      naamBij(ctx, 'DNA-kopie van het virus-RNA', '', x0, 720, 1 - q.on('polymerase', 1), 'left');
      naamBij(ctx, 'licht!', '', Px - 150, 330, q.on('openknipt', 1, 1), 'right', C.goud);
      metaA(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 260, 800, 1, C.grain, 'left', 18); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= ramp(t, q.at('cyclus', 1) + 0.8, 0.6); const nu = 40 * clamp((t - q.at('cyclus', 1)) / 6, 0, 1);
      ampGrafiek(ctx, 220, 230, 1150, 500, 1, [{ ct: 25, col: KL_OPA, u: 1, m: q.on('vijfentwintig', 1), lab: 'Ct 25', lr: -1 }, { ct: 30, col: KL_ANDER, u: q.on('ander', 1, 1.2), m: q.on('dertig', 1), lab: 'Ct 30' }], nu, q.on('drempel', 1));
      naamBij(ctx, 'Opa Henk', '', 1450, 300, q.on('Opa', 1), 'left', KL_OPA); naamBij(ctx, 'ander monster', '', 1450, 380, q.on('ander', 1), 'left', KL_ANDER);
      tag(ctx, 'Ct-waarde = cycli tot boven de drempel', 1600, 520, C.goud, q.on('Ct-waarde', 1), 'center', 26);
      vraagteken(ctx, 1600, 700, q.on('virus', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer virus bij Opa Henk (eerder boven de drempel)'); const I = q.on('ijklijn', 1, 0.8);
    if (I < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - I;
      ampGrafiek(ctx, 220, 260, 1000, 480, 1, [{ ct: 25, col: KL_OPA, u: 1, m: 1, lab: 'Ct 25', lr: -1 }, { ct: 30, col: KL_ANDER, u: 1, m: 1, lab: 'Ct 30' }], 40, 1);
      tag(ctx, 'meer virus → eerder boven de drempel', 1580, 300, C.goud, q.on('eerder', 1), 'center', 26);
      tag(ctx, 'elke cyclus ≈ × 2', 1580, 420, C.teal, q.on('verdubbelt', 1), 'center', 28);
      tag(ctx, '3,3 cycli eerder ≈ 10 × zoveel', 1580, 540, C.goud, q.on('derde', 1), 'center', 28); regel(ctx, '2 × 2 × 2 … (3,3 keer) ≈ 10', 1580, 610, q.on('zoveel', 1), C.text2, 24, 'center', 600); ctx.restore(); }
    if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; const np = 5 * clamp((t - q.at('standaarden', 1)) / 1.5, 0, 1);
      ijklijnGrafiek(ctx, 240, 250, 1100, 480, 1, { np, stap: q.on('verdunnen', 1), lijn: q.on('lijn', 2, 1.2), opa: q.on('vijfentwintig', 1) });
      naamBij(ctx, 'ijklijn', 'standaarden van Yasmin', 1400, 300, q.on('ijklijn', 1) * (1 - q.on('Let', 1)), 'left');
      tag(ctx, 'Ct 25 ≈ 4000 kopieën per putje', 1580, 450, KL_OPA, q.on('vierduizend', 1), 'center', 26);
      tag(ctx, 'Ct alleen vergelijken binnen dezelfde test', 1520, 590, C.koraal, q.on('vergelijken', 1), 'center', 24);
      regel(ctx, 'ander lab: een paar cycli anders', 1520, 670, q.on('ander', 1), C.text2, 24, 'center', 600); ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('controlekaart', 1, 0.8);
    persoon(ctx, 'yasmin', 1730, 880, 420, { t, kijk: -1, outfit: 'practicum', uit: q.at('Vandaag', 1) <= t ? 'bezorgd' : 'neutraal', pose: q.at('Vandaag', 1) <= t ? 'denk' : 'staan' });
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; const px = 200, py = 240, pw = 820;
      plaatControles(ctx, px, py, pw, 1, { neg: q.on('negatieve', 1), pos: q.on('oplichten', 1), intern: q.on('interne', 1), mis: q.on('niet', 1) });
      const [nx, ny] = putjeXY(px, py, pw, 0, 0), [sx, sy] = putjeXY(px, py, pw, 1, 0), [mx, my] = putjeXY(px, py, pw, 4, 7);
      circ(ctx, nx, ny, 30, null, C.text, 3 * q.on('negatieve', 1)); circ(ctx, sx, sy, 30, null, KL_OPA, 3 * q.on('positieve', 1));
      chip(ctx, 'negatieve controle: water · geen licht', 1260, 280, C.teal, q.on('negatieve', 1), 26);
      chip(ctx, 'positieve controle: bekend virus · licht', 1260, 370, KL_OPA, q.on('positieve', 1), 26);
      chip(ctx, 'interne controle: gen van de mens', 1260, 460, C.teal, q.on('interne', 1), 26);
      if (q.on('niet', 1) > 0.01) circ(ctx, mx, my, 30, null, C.koraal, 4 * q.on('niet', 1));
      regel(ctx, 'geen licht: te weinig materiaal', 1260, 560, q.on('materiaal', 1), C.koraal, 26, 'center', 700); regel(ctx, 'of de PCR werd geremd', 1260, 605, q.on('remde', 1), C.koraal, 26, 'center', 700);
      metaA(ctx, 'PLAAT VAN DE RUN', px, py - 20, 1, C.grain, 'left', 20); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; const n = QC_PUNTEN.length * clamp((t - q.at('controlekaart', 1)) / 2.5, 0, 1);
      const V = q.on('Vandaag', 1); controleKaart(ctx, 180, 260, 1200, 520, 1, { n: Math.min(n, 15 + V), band: q.on('standaardafwijkingen', 1), drie: 0, hl: { 14: [V > 0.5 ? C.koraal : C.oker, 1], 15: [C.koraal, V] } });
      vraagteken(ctx, 1560, 360, q.on('denk', 1), 90); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: run afkeuren en de oorzaak zoeken'); const O = q.on('oorzaak', 1, 0.8);
    const kx = 160, ky = 270, kw = 1100 - 300 * O, kh = 480;
    controleKaart(ctx, kx, ky, kw, kh, 1, { n: QC_PUNTEN.length, band: 1, drie: 0, hl: { 6: [C.oker, q.on('punt', 1)], 14: [C.koraal, q.on('Twee', 1)], 15: [C.koraal, q.on('Twee', 1)] } });
    const [p6x, p6y] = qcPunt(kx, ky, kw, kh, 6); regel(ctx, 'waarschuwing', p6x, ky + kh / 2 - 3 * kh / 7 - 16, q.on('waarschuwing', 1) * (1 - O), C.oker, 26, 'center', 700);
    const [p15x, p15y] = qcPunt(kx, ky, kw, kh, 15); regel(ctx, '2× aan dezelfde kant', p15x - 40, ky + kh / 2 - 3 * kh / 7 - 16, q.on('kant', 1) * (1 - O), C.koraal, 26, 'right', 700);
    stempel(ctx, 1600, 300, 'run afgekeurd', C.koraal, q.on('keurt', 1) * (1 - O));
    chip(ctx, 'monsters opnieuw', 1600, 440, C.teal, q.on('opnieuw', 1) * (1 - O), 28);
    if (O > 0.01) { vriezer(ctx, 1520, 760, 1.05, O); reagensFles(ctx, 1730, 760, 1.2, q.on('flesje', 1)); thermometer(ctx, 1850, 720, q.on('buiten', 1), clamp((t - q.at('buiten', 1)) / 1.5, 0, 1));
      tag(ctx, 'reagens te lang buiten de vriezer', 1560, 300, C.koraal, q.on('flesje', 1), 'center', 26); chip(ctx, 'vastgelegd', 1560, 400, C.groen, q.on('vastgelegd', 1), 28); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('belt', 1, 0.3);
    const opHand = (P, d, ang) => { if (!P.handR || !P.handL) return; const h = P.handR.y < P.handL.y ? P.handR : P.handL; telefoon(ctx, h.x + d, h.y + 12, 1.1, ang); };
    opHand(persoon(ctx, 'kim', 330, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }), 4, 0.15);
    opHand(persoon(ctx, 'henk', 1600, 880, 430, { t, kijk: -1, uit: q.at('corona', 1) <= t ? 'moe' : 'neutraal', pose: 'denk' }), -4, -0.15);
    ctx.save(); ctx.globalAlpha *= B; ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(560, 470, 30 + k * 22, -0.6, 0.6); ctx.stroke(); ctx.beginPath(); ctx.arc(1380, 470, 30 + k * 22, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); } ctx.restore();
    document_(ctx, 960, 380, 2.2, C.groen, q.on('corona', 1) * (1 - q.on('keten', 1))); regel(ctx, 'positief: corona', 960, 490, q.on('corona', 1) * (1 - q.on('keten', 1)), C.text, 30, 'center', 700); regel(ctx, 'nieuwe run: controles in orde', 960, 535, q.on('corona', 1) * (1 - q.on('keten', 1)), C.text2, 24, 'center', 600);
    const it = [['juiste buisje', 'juiste'], ['pipetteren', 'pipetteren'], ['Ct-waarde', 'Ct-waarde'], ['controles', 'controles']];
    it.forEach(([s2, w], i) => { const a = q.on(w, 1); tag(ctx, s2, 700 + i * 175, 320 + (i % 2) * 100, [C.teal, C.goud, KL_OPA, C.groen][i], a, 'center', 26); });
    regel(ctx, 'achter één uitslag: een hele keten', 960, 230, q.on('keten', 1), C.text, 34, 'center', 700); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 300, 880, 430, { t, kijk: 1, outfit: 'practicum', uit: 'blij', pose: 'wijs' });
    naamBij(ctx, 'analist in opleiding', '', 300, 400, 1, 'center');
    const k1 = q.on('mbo-opleiding', 1), k2 = q.on('hbo', 1);
    paneel(ctx, 560, 200, 600, 270, 'MBO', k1); regel(ctx, 'Analist, bijv. biologisch-', 600, 320, k1, C.text, 32, 'left', 700); regel(ctx, 'medisch analist', 600, 365, k1, C.text, 32, 'left', 700); regel(ctx, 'niveau 4 · meestal 4 jaar', 600, 430, k1, C.text2, 28, 'left', 600);
    paneel(ctx, 1220, 200, 600, 270, 'HBO', k2); regel(ctx, 'Biologie en Medisch', 1260, 320, k2, C.text, 32, 'left', 700); regel(ctx, 'Laboratoriumonderzoek', 1260, 365, k2, C.text, 32, 'left', 700); regel(ctx, '4 jaar (met vwo soms 3)', 1260, 430, k2, C.text2, 28, 'left', 600);
    [['ziekenhuis', 'ziekenhuizen'], ['bedrijven', 'bedrijven'], ['onderzoeksinstituut', 'onderzoeksinstituten'], ['RIVM en GGD', 'RIVM'], ['voedsel en milieu', 'voedsel']].forEach(([s2, w], i) => chip(ctx, s2, 700 + (i % 3) * 400, 620 + Math.floor(i / 3) * 100, [C.teal, C.oker, C.paars, C.groen, C.goud][i], q.on(w, 1), 28)); },
});
