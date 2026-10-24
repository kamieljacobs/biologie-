
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
// Wat word jij? · Laboratoriumtechniek 3 · Wat staat er op je bloeduitslag? — eigen tekeningen (24 okt 2026)
// Bloedcellen naar het recept van Wat er in je bloed zit (transport 3: rbc, wbc, plaatje, centrifuge), kleuren hier lokaal.

const BL = { rood: '#B8443E', roodL: '#D9675C', rijk: '#D9483E', arm: '#8E3E46', plasma: '#E8C870', serum: '#EBD38A', wit: '#E6E1D3', plaatje: '#D8C9A6', plaatjeR: '#F0E4C4', gel: '#C9D6DC',
  paars: '#8C5BB0', geel: '#E8C04A', grijs: '#A9B0BA', ca: '#AFC0D0', edta: '#B79AD6', alat: '#E0B64A', crp: '#5BA4C9' };
const DOP = { paars: BL.paars, geel: BL.geel, grijs: BL.grijs };

function zacht3(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }

// ---------- bloedcellen (recept transport 3) ----------
function rbc3(ctx, x, y, r, o = {}) { const { a = 1, rot = 0, squash = 1, col = BL.rijk } = o; zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, squash);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); shape(ctx, col, lighten(BL.rijk, 0.3), Math.max(1, r * 0.06)); ctx.beginPath(); ctx.arc(0, 0, r * 0.46, 0, 6.283); ctx.fillStyle = rgba('#000000', 0.2); ctx.fill(); }); }
function wbc3(ctx, x, y, r, t = 0, o = {}) { const { a = 1, seed = 1, rond = false } = o; zacht3(ctx, a, () => {
  blob(ctx, x, y, r, r * 0.96, 0.06, seed, t * 2); shape(ctx, rgba(BL.wit, 0.22), BL.wit, 2);
  ctx.fillStyle = rgba(BL.wit, 0.5); for (let i = 0; i < 20; i++) { const an = hash(i * 5 + seed) * 6.283, d = (0.3 + 0.6 * Math.sqrt(hash(i * 5 + 2 + seed))) * r * 0.85; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, Math.max(1.4, r * 0.03), 0, 6.283); ctx.fill(); }
  if (rond) { circ(ctx, x, y, r * 0.62, C.kern, C.kernR, 1.5); return; }
  for (const [dx, dy, k] of [[-0.3, -0.12, 0.3], [0.05, 0.18, 0.28], [0.32, -0.08, 0.26]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, k * r, k * r * 0.85, dx, 0, 6.283); shape(ctx, C.kern, C.kernR, 1.5); }
  ctx.strokeStyle = C.kern; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.moveTo(x - 0.3 * r, y - 0.12 * r); ctx.lineTo(x + 0.05 * r, y + 0.18 * r); ctx.lineTo(x + 0.32 * r, y - 0.08 * r); ctx.stroke(); }); }
function plaatje3(ctx, x, y, r, o = {}) { const { a = 1, rot = 0 } = o; zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.62, 0, 0, 6.283); shape(ctx, BL.plaatje, BL.plaatjeR, 1.2);
  ctx.fillStyle = rgba('#7A6A50', 0.5); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc((i - 1) * r * 0.4, (i % 2 ? 1 : -1) * r * 0.15, r * 0.12, 0, 6.283); ctx.fill(); } }); }

// ---------- buisje (vacuümbuis) ----------
// x = midden, y = bovenkant dop, h = hoogte zonder dop; o.inhoud: 'bloed' | 'gestold' | 'leeg'; o.sep 0..1 (na centrifugeren: stolsel, gel, serum)
function buis(ctx, x, y, w, h, dop, o = {}) { const { a = 1, t = 0, inhoud = 'bloed', sep = 0, stol = 0, naam = '', vul = 0.82, seed = 1 } = o; zacht3(ctx, a, () => {
  const top = y + 34, bot = y + h, r = w / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(x - r, top); ctx.lineTo(x - r, bot - r); ctx.arc(x, bot - r, r, Math.PI, 0, true); ctx.lineTo(x + r, top); };
  omtrek(); ctx.closePath(); ctx.fillStyle = rgba('#CFE4F0', 0.07); ctx.fill();
  ctx.save(); omtrek(); ctx.closePath(); ctx.clip(); const lv = bot - (bot - top) * vul, H = bot - lv;
  if (inhoud === 'bloed') { ctx.fillStyle = BL.arm; ctx.fillRect(x - r, lv, w, H + 2);
    for (let i = 0; i < 26; i++) { const wv = wander(i + seed * 30, t, 3, 1); ctx.fillStyle = hash(i * 7 + seed) < 0.5 ? BL.rijk : BL.roodL; ctx.beginPath(); ctx.ellipse(x + (hash(i * 3 + seed) - 0.5) * (w - 14) + wv.x, lerp(lv + 8, bot - 8, hash(i * 3 + 1 + seed)) + wv.y, w * 0.08, w * 0.06, i, 0, 6.283); ctx.fill(); }
    if (stol > 0.01) { ctx.fillStyle = rgba('#5E2A2E', 0.55 * stol); ctx.fillRect(x - r, lv, w, H + 2); } }
  else if (inhoud === 'gestold') { const s = ease(sep); const yGel = lerp(lv, lv + H * 0.45, s); // na scheiden: serum boven, gel, stolsel onder
    ctx.fillStyle = rgba(BL.serum, 0.85); ctx.fillRect(x - r, lv, w, H + 2);
    ctx.fillStyle = '#6E2E34'; ctx.fillRect(x - r, lerp(lv, yGel + 16, s), w, bot - lv + 4);
    if (s > 0.01) { ctx.fillStyle = rgba(BL.gel, 0.95 * s); ctx.fillRect(x - r, yGel, w, 16); }
    ctx.strokeStyle = rgba('#EDE3C8', 0.35); ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { const yy = lerp(lerp(lv + 10, yGel + 30, s), bot - 10, hash(i * 3 + 5)); ctx.beginPath(); ctx.moveTo(x - r * 0.7, yy); ctx.lineTo(x + r * 0.7, yy + (hash(i) - 0.5) * 20); ctx.stroke(); } }
  ctx.restore();
  omtrek(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  // etiket
  if (naam) { roundRect(ctx, x - r + 4, top + (bot - top) * 0.18, w - 8, (bot - top) * 0.3, 4); shape(ctx, rgba('#F2EEE4', 0.92), null); ctx.fillStyle = '#121A26'; for (let i = 0; i < 9; i++) ctx.fillRect(x - r + 12 + i * (w - 24) / 9, top + (bot - top) * 0.21, (w - 24) / 18 * (1 + (i % 3 === 0)), (bot - top) * 0.1);
    if (w >= 60) { let px = Math.max(12, w * 0.2); ctx.font = fTekst(px, 700); const mw = ctx.measureText(naam).width; if (mw > w - 14) px *= (w - 14) / mw; text(ctx, naam, x, top + (bot - top) * 0.43, fTekst(px, 700), '#121A26', 'center'); } }
  // dop
  roundRect(ctx, x - r - 8, y, w + 16, 40, 8); shape(ctx, DOP[dop] || dop, lighten(DOP[dop] || dop, 0.25), 2); ctx.fillStyle = rgba('#000000', 0.15); ctx.fillRect(x - r - 8, y + 26, w + 16, 6); }); }

// rekje met buisjes
function rekje(ctx, x, y, w, a = 1) { zacht3(ctx, a, () => { roundRect(ctx, x, y, w, 26, 8); shape(ctx, '#3A4A68', C.line, 2); roundRect(ctx, x + 10, y + 26, 18, 40, 4); shape(ctx, '#3A4A68', null); roundRect(ctx, x + w - 28, y + 26, 18, 40, 4); shape(ctx, '#3A4A68', null); }); }

// ---------- centrifuge van boven (recept transport 3) ----------
function centri3(ctx, x, y, r, ang, o = {}) { const { a = 1, vaart = 0 } = o; zacht3(ctx, a, () => {
  roundRect(ctx, x - r - 30, y - r - 30, 2 * r + 60, 2 * r + 60, 30); shape(ctx, '#2F3E5C', C.line, 2);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, C.kast, C.line, 2);
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); ctx.fillStyle = '#5B6B88'; ctx.fillRect(-10, 0, 20, r * 0.55); roundRect(ctx, -r * 0.2, r * 0.48, r * 0.4, r * 0.42, 10); shape(ctx, '#4A5878', C.line, 2);
    roundRect(ctx, -r * 0.12, r * 0.53, r * 0.24, r * 0.3, 6); ctx.fillStyle = i === 0 ? BL.geel : '#3A4660'; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.arc(0, 0, r * 0.14, 0, 6.283); shape(ctx, '#8FA0B5', '#C0CCDA', 2); ctx.restore();
  if (vaart > 0.01) { ctx.strokeStyle = rgba(C.text, 0.5 * vaart); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const a0 = ang + i * Math.PI / 2 + 0.25; ctx.beginPath(); ctx.arc(x, y, r * 0.92, a0, a0 + 0.9 * vaart); ctx.stroke(); } } }); }

// ---------- moleculen ----------
// calciumion: klein bolletje met '2+'
function caIon(ctx, x, y, r = 11, a = 1) { zacht3(ctx, a, () => { circ(ctx, x, y, r, BL.ca, '#DDE6EE', 1.5); text(ctx, 'Ca', x, y + 4, fTekst(r * 0.9, 800), '#121A26', 'center'); }); }
// EDTA: klauw van vier armpjes; vang 0..1 = klauw sluit om een calciumion
function edtaKlauw(ctx, x, y, s = 1, vang = 0, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = BL.edta; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (const k of [-1, 1]) for (const j of [0, 1]) { const an0 = (k < 0 ? Math.PI : 0) + (j ? -0.6 : 0.6) * k; const sl = lerp(0.9, 0.35, vang) * (j ? -1 : 1) * k; ctx.beginPath(); ctx.moveTo(0, 0); const ex = Math.cos(an0) * 26, ey = Math.sin(an0) * 22; ctx.quadraticCurveTo(ex * 0.8, ey * 1.4, ex + Math.cos(an0 + sl) * 14, ey + Math.sin(an0 + sl) * 14); ctx.stroke(); }
  circ(ctx, 0, 0, 7, BL.edta); }); }
// CRP: vijf bolletjes in een ring (pentameer)
function crpMol(ctx, x, y, r = 16, a = 1, rot = 0) { zacht3(ctx, a, () => { for (let i = 0; i < 5; i++) { const an = rot + i / 5 * 6.283; circ(ctx, x + Math.cos(an) * r * 0.62, y + Math.sin(an) * r * 0.62, r * 0.42, rgba(BL.crp, 0.85), lighten(BL.crp, 0.35), 1.2); } }); }
// antistof als Y
function antiY(ctx, x, y, s = 1, rot = 0, col = C.goud, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(0, 0); ctx.lineTo(-14, -18); ctx.moveTo(0, 0); ctx.lineTo(14, -18); ctx.stroke(); }); }

// ---------- uitslagformulier ----------
// rows: [naam, waarde, eenheid, status(-1 laag, 0 binnen, 1 hoog, null = nog leeg), alpha, hl]
function formulier(ctx, x, y, w, rows, a = 1, titel = 'UITSLAG · H. DE VRIES', px = 30) { zacht3(ctx, a, () => { const rh = px + 26, h = 90 + rows.length * rh;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = '#3E5C7A'; ctx.fillRect(x, y, w, 10);
  metaText(ctx, titel, x + 26, y + 54, '#5A6478', 'left', 20);
  rows.forEach(([n, v, e, st, al = 1, hl = 0], i) => { const yy = y + 100 + i * rh; ctx.strokeStyle = '#D8D0C0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 20, yy + 14); ctx.lineTo(x + w - 20, yy + 14); ctx.stroke();
    if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.fillStyle = rgba(C.goud, 0.28); ctx.fillRect(x + 8, yy - px - 4, w - 16, px + 16); ctx.restore(); }
    text(ctx, n, x + 26, yy, fTekst(px, 700), '#121A26', 'left');
    if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; const col = st === 1 ? '#B8442E' : st === -1 ? '#B8442E' : '#121A26'; text(ctx, v, x + w * 0.56, yy, fTekst(px, 800), col, 'right'); text(ctx, e, x + w * 0.59, yy, fTekst(px * 0.72, 500), '#5A6478', 'left');
      if (st === 1) text(ctx, '↑', x + w - 30, yy, fTekst(px, 800), '#B8442E', 'right'); ctx.restore(); } }); }); }

// referentiebalk: band lo..hi op schaal min..max, marker v (u 0..1 schuift de marker in)
function refBalk(ctx, x, y, w, min, max, lo, hi, v, a = 1, u = 1, o = {}) { const { lab = '', fmt = (z) => String(z), uit = false } = o; zacht3(ctx, a, () => { const X = (z) => x + (clamp(z, min, max) - min) / (max - min) * w;
  roundRect(ctx, x, y - 12, w, 24, 12); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, X(lo), y - 12, X(hi) - X(lo), 24, 8); shape(ctx, rgba(C.groen, 0.45), C.groen, 2);
  text(ctx, fmt(lo), X(lo), y + 44, fTekst(22, 600), C.text2, 'center'); text(ctx, fmt(hi), X(hi), y + 44, fTekst(22, 600), C.text2, 'center');
  if (u > 0.01 && v != null) { const xv = X(lerp(min + (max - min) * 0.02, v, ease(u))); const col = (v < lo || v > hi) ? C.koraal : C.goud; ctx.save(); ctx.globalAlpha *= clamp(u * 3, 0, 1); ctx.beginPath(); ctx.moveTo(xv, y - 18); ctx.lineTo(xv - 12, y - 38); ctx.lineTo(xv + 12, y - 38); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.fillRect(xv - 2, y - 18, 4, 36); if (lab) text(ctx, lab, xv, y - 48, fTekst(24, 800), col, 'center'); ctx.restore(); } }); }

// ---------- apparaten ----------
function apparaat(ctx, x, y, w, h, a = 1, naam = '', o = {}) { const { lamp = 0, t = 0, scherm = null } = o; zacht3(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 18); shape(ctx, '#D8DEE4', '#9AA3B2', 2); roundRect(ctx, x + 14, y + 14, w - 28, 26, 8); shape(ctx, '#B8C2CC', null);
  roundRect(ctx, x + w * 0.55, y + 60, w * 0.38, h * 0.36, 10); shape(ctx, '#0F1826', '#5A6478', 3);
  if (scherm) scherm(x + w * 0.55, y + 60, w * 0.38, h * 0.36);
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x + 30, y + h - 40, w - 60, 10); circ(ctx, x + w - 40, y + 30, 7, lamp > 0.5 ? (Math.sin(t * 6) > 0 ? C.groen : '#3A5A40') : '#5A6478');
  if (naam) metaText(ctx, naam, x + 30, y + 33, '#3A4458', 'left', 18); }); }

// cuvetje (klein bakje met vloeistof); k 0..1 = kleursterkte, tr 0..1 = troebel
function cuvet(ctx, x, y, w, h, col, k = 0, tr = 0, a = 1) { zacht3(ctx, a, () => { roundRect(ctx, x - w / 2, y, w, h, 4); shape(ctx, rgba('#CFE4F0', 0.1), '#AFC0D0', 2);
  ctx.fillStyle = rgba(BL.serum, 0.55); ctx.fillRect(x - w / 2 + 3, y + h * 0.3, w - 6, h * 0.7 - 3); if (k > 0.01) { ctx.fillStyle = rgba(col, 0.85 * k); ctx.fillRect(x - w / 2 + 3, y + h * 0.3, w - 6, h * 0.7 - 3); }
  if (tr > 0.01) { ctx.fillStyle = rgba('#F2F2EE', 0.25 * tr); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(x + (hash(i * 3) - 0.5) * (w - 10), y + h * 0.35 + hash(i * 3 + 1) * h * 0.6, 2.5, 0, 6.283); ctx.fill(); } } }); }

// ---------- lever en levercellen ----------
function leverVorm3(ctx, x, y, s = 1, a = 1) { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-170, -40); ctx.bezierCurveTo(-120, -110, 60, -120, 170, -80); ctx.bezierCurveTo(200, -60, 170, -20, 120, 0); ctx.bezierCurveTo(40, 40, -40, 90, -110, 70); ctx.bezierCurveTo(-170, 50, -200, 0, -170, -40); ctx.closePath(); shape(ctx, '#8C4A3E', '#B8705E', 3);
  ctx.strokeStyle = rgba('#5E2E26', 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20, -105); ctx.quadraticCurveTo(-10, -40, 10, 30); ctx.stroke(); }); }
// veld van zeshoekige levercellen; kapot = index van een cel die openbreekt (u 0..1), ALAT-stipjes lekken naar beneden
function levercellen(ctx, x, y, R, o = {}) { const { a = 1, kapot = 4, u = 0, t = 0 } = o; zacht3(ctx, a, () => {
  const pos = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) pos.push([x + c * R * 1.75 + (r % 2) * R * 0.87, y + r * R * 1.52]);
  pos.forEach(([px, py], i) => { const br = i === kapot ? u : 0; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const rr = R * (1 + (br > 0 && k === 3 ? 0.25 * br : 0)); k ? ctx.lineTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr) : ctx.moveTo(px + Math.cos(an) * rr, py + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, br > 0.3 ? '#6E3A32' : '#A0584A', '#C98070', 2.5);
    circ(ctx, px, py, R * 0.24, C.kern, C.kernR, 1.5);
    for (let j = 0; j < 7; j++) { const an = hash(i * 13 + j) * 6.283, d = R * (0.4 + 0.4 * hash(i * 13 + j + 7)); const lek = i === kapot ? clamp(u * 1.5 - j * 0.08, 0, 1) : 0; const lx = px + Math.cos(an) * d * (1 - lek) + (hash(j) - 0.5) * 120 * lek, ly = py + Math.sin(an) * d * (1 - lek) + lek * (R * 2.2 + j * 10) + Math.sin(t * 2 + j) * 3 * lek; circ(ctx, lx, ly, 6, BL.alat, '#F5D78A', 1); } }); }); }

// ---------- klokvormige verdeling van gezonde mensen ----------
function klokVerdeling(ctx, x, y, w, h, a = 1, o = {}) { const { staart = 1, mark = null } = o; zacht3(ctx, a, () => { const f = (z) => Math.exp(-z * z / 2), Z = (px) => (px - x) / w * 7 - 3.5, P = (z) => x + (z + 3.5) / 7 * w;
  const pad = (z0, z1) => { ctx.beginPath(); ctx.moveTo(P(z0), y + h); for (let i = 0; i <= 60; i++) { const z = z0 + (z1 - z0) * i / 60; ctx.lineTo(P(z), y + h - f(z) * h); } ctx.lineTo(P(z1), y + h); ctx.closePath(); };
  pad(-1.96, 1.96); shape(ctx, rgba(C.groen, 0.35), null); pad(-3.5, -1.96); shape(ctx, rgba(C.koraal, 0.45 * staart + 0.1), null); pad(1.96, 3.5); shape(ctx, rgba(C.koraal, 0.45 * staart + 0.1), null);
  ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const z = -3.5 + 7 * i / 120; i ? ctx.lineTo(P(z), y + h - f(z) * h) : ctx.moveTo(P(z), y + h - f(z) * h); } ctx.stroke();
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  if (mark != null) { const xm = P(mark); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(xm, y + h); ctx.lineTo(xm, y + 10); ctx.stroke(); ctx.setLineDash([]); } }); }

// telpoppetje (alleen in een telling)
function telpop(ctx, x, y, r, col, a = 1) { zacht3(ctx, a, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); }); }

// ---------- bloedbank ----------
// putje met rode bloedcellen; kl 0..1 = klonteren (cellen trekken naar een paar klompjes)
function putje(ctx, x, y, R, kl = 0, a = 1, t = 0, seed = 1, cel = BL.rijk) { zacht3(ctx, a, () => { circ(ctx, x, y, R, '#F2EEE4', '#B8B0A0', 3); circ(ctx, x, y, R - 8, rgba('#E8C870', 0.35), null);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, R - 8, 0, 6.283); ctx.clip();
  const K = [[-0.3, -0.2], [0.25, 0.1], [-0.05, 0.38]];
  for (let i = 0; i < 34; i++) { const hx = (hash(i * 7 + seed) - 0.5) * 1.6 * (R - 14), hy = (hash(i * 7 + 3 + seed) - 0.5) * 1.6 * (R - 14); const k = K[i % 3]; const kx = k[0] * R + (hash(i * 5) - 0.5) * R * 0.22, ky = k[1] * R + (hash(i * 5 + 1) - 0.5) * R * 0.22; const e = ease(kl);
    const wv = wander(i + seed * 40, t, 3 * (1 - e), 1); rbc3(ctx, lerp(x + hx, x + kx, e) + wv.x, lerp(y + hy, y + ky, e) + wv.y, R * 0.085, { rot: i, squash: 0.85, col: cel }); }
  ctx.restore(); }); }

// donorzakje rode bloedcellen
function donorZak(ctx, x, y, s = 1, a = 1, lab = '') { zacht3(ctx, a, () => { ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, -110); ctx.lineTo(-20, -140); ctx.moveTo(20, -110); ctx.lineTo(20, -140); ctx.stroke();
  roundRect(ctx, -80, -110, 160, 220, 30); shape(ctx, BL.arm, lighten(BL.arm, 0.3), 3); roundRect(ctx, -56, -70, 112, 60, 6); shape(ctx, rgba('#F2EEE4', 0.92), null);
  ctx.fillStyle = '#121A26'; for (let i = 0; i < 10; i++) ctx.fillRect(-46 + i * 9.5, -62, 4 + (i % 3) * 2, 26); if (lab) text(ctx, lab, 0, -20, fTekst(18, 800), '#121A26', 'center'); }); }

// grafiekje met assen (labels voluit, geen afkortingen in metaText)
function assen3(ctx, x, y, w, h, xl, yl, a = 1) { zacht3(ctx, a, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) text(ctx, xl, x + w, y + h + 74, fTekst(22, 600), C.text2, 'right'); if (yl) text(ctx, yl, x - 10, y - 18, fTekst(22, 600), C.text2, 'left'); }); }
// Wat word jij? · Laboratoriumtechniek 3 · Wat staat er op je bloeduitslag? — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim in labjas, Yasmin in practicumkleding).
// Rode draad: de vier buisjes van Opa Henk (paars, geel, grijs, paars) en één uitslagformulier. Getallen verzonnen maar realistisch (zie sections.html).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
const NAAM = 'H. de Vries';
const VIER = [['paars', 'bloedbeeld'], ['geel', 'chemie'], ['grijs', 'glucose'], ['paars', 'bloedbank']];
function vierBuisjes(ctx, x, y, dx, h, t, a = 1, hl = -1, o = {}) { if (a <= 0.01) return; rekje(ctx, x - 50, y + h - 60, dx * 3 + 100, a);
  VIER.forEach(([d, lab], i) => { const k = hl < 0 || hl === i ? 1 : 0.35; buis(ctx, x + i * dx, y, 52, h, d, { a: a * k, t, naam: NAAM, seed: i + 1 }); if (o.labels) regel(ctx, lab, x + i * dx, y + h + 52, a * o.labels * k, C.text2, 24, 'center', 600); }); }
// gestreepte pijl naar rechts (voor de stroom door de opening)
const STROOM = { x0: 760, x1: 1780, xo: 1270, y: 330 };
function celStroom(ctx, t, t0, a = 1, laser = false) { if (a <= 0.01) return; const v = 260; // px per seconde
  for (let i = 0; i < 140; i++) { const tp = t0 + i * 0.38; const x = STROOM.xo + (t - tp) * v; if (x < STROOM.x0 + 20 || x > STROOM.x1 - 20) continue; const soort = laser ? 'w' : (i % 9 === 4 ? 'p' : 'r');
    const d = Math.abs(x - STROOM.xo), ny = d < 120 ? 0 : (hash(i * 3) - 0.5) * 120 * clamp((d - 120) / 200, 0, 1); const y = STROOM.y + ny;
    if (soort === 'r') rbc3(ctx, x, y, 22, { a, rot: i, squash: 0.9 }); else if (soort === 'p') plaatje3(ctx, x, y, 9, { a, rot: i }); else { const rond = i % 3 === 1; wbc3(ctx, x, y, rond ? 24 : 32, t, { a, seed: i, rond }); } } }
function opening(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, STROOM.x0, STROOM.y - 160, STROOM.x1 - STROOM.x0, 320, 20); shape(ctx, rgba('#CFE4F0', 0.05), C.line, 2);
  ctx.fillStyle = '#4A5878'; ctx.fillRect(STROOM.xo - 16, STROOM.y - 160, 32, 125); ctx.fillRect(STROOM.xo - 16, STROOM.y + 35, 32, 125); ctx.restore(); }
function stroomSpoor(ctx, t, t0, a = 1) { if (a <= 0.01) return; const x0 = STROOM.x0, w = STROOM.x1 - STROOM.x0, y = 720, win = 7; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke(); text(ctx, 'stroomsignaal', x0, y - 150, fTekst(24, 600), C.text2, 'left');
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y);
  for (let i = 0; i < 140; i++) { const tp = t0 + i * 0.38; if (tp > t || tp < t - win) continue; const xx = x0 + w - (t - tp) / win * w; const hgt = i % 9 === 4 ? 30 : 105 + hash(i) * 15; ctx.lineTo(xx - 10, y); ctx.lineTo(xx, y - hgt); ctx.lineTo(xx + 10, y); }
  ctx.lineTo(x0 + w, y); ctx.stroke(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { vierBuisjes(ctx, 1220, 380, 150, 360, t, 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const Y = q.on('Yasmin', 1, 0.3), F = q.on('formulier', 1);
    persoon(ctx, 'kim', 250, 880, 420, { t, kijk: 1, outfit: 'lab', uit: 'neutraal', pose: t > q.at('onderzoeken', 1) ? 'wijs' : 'staan', a: 1 - Y });
    persoon(ctx, 'henk', 560, 880, 430, { t, kijk: 1 - 2 * Y, uit: 'moe' });
    naamBij(ctx, 'Opa Henk', 'moe en koorts', 650, 380, 1 - F, 'left'); naamBij(ctx, 'Dr. Kim', 'arts', 120, 390, q.on('Kim', 1) * (1 - Y), 'left');
    tag(ctx, 'volgende maand: nieuwe heup', 560, 300, C.teal, q.on('heup', 1) * (1 - F), 'center', 28);
    formulier(ctx, 980, 170, 760, [['Hb', '', '', null, 0, q.on('Hb', 1)], ['leukocyten', '', '', null, 0, q.on('leukocyten', 1)], ['CRP', '', '', null, 0, q.on('CRP', 1)], ['bloedgroep', '', '', null, 0, q.on('bloedgroep', 1)]], F * (1 - Y), 'AANVRAAG · H. DE VRIES', 32);
    persoon(ctx, 'yasmin', 250, 880, 400, { t, a: Y, kijk: 1, outfit: 'practicum', uit: 'blij' }); naamBij(ctx, 'Yasmin', 'stagiair analist', 120, 390, Y, 'left');
    vierBuisjes(ctx, 1000, 330, 170, 380, t, q.on('buisjes', 1), -1);
    vraagteken(ctx, 1260, 250, q.on('Waarom', 1), 100); },

  // ---------- H1 Buisjes ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: elk buisje een andere stof', 1 - q.on('stollen', 1, 1.5));
    const G = q.on('gele', 1), R = q.on('grijze', 1), P = 1 - G; const fase = R > 0.5 ? 2 : G > 0.5 ? 1 : 0;
    // drie buisjes links, het actieve oplichtend
    [['paars', 'EDTA'], ['geel', 'stolbuis'], ['grijs', 'fluoride']].forEach(([d, n], i) => { const k = (t < q.at('paarse', 1) || fase === i) ? 1 : 0.35; buis(ctx, 170 + i * 150, 300, 56, 420, d, { a: k, t, naam: NAAM, seed: i + 2, inhoud: 'bloed' }); regel(ctx, n, 170 + i * 150, 790, k * q.on(i === 0 ? 'EDTA' : i === 1 ? 'versnelt' : 'fluoride', 1), C.text, 26, 'center', 700); });
    regel(ctx, 'buiten het lichaam begint het bloed te stollen', 1260, 260, q.on('stollen', 1) * (1 - q.on('paarse', 1)), C.text, 34, 'center', 700);
    // paars: EDTA vangt calcium
    if (P > 0.01) { const V = q.on('bindt', 1, 1.2), Z = q.on('cellen', 1); ctx.save(); ctx.globalAlpha *= P * q.on('paarse', 1);
      paneel(ctx, 760, 220, 1000, 600, '', 1);
      for (let i = 0; i < 6; i++) { const bx = 900 + (i % 3) * 300, by = 360 + Math.floor(i / 3) * 190, w = wander(i, t, 10, 0.6); const cx = bx + w.x * (1 - V), cy = by + w.y * (1 - V);
        const wi = wander(i + 50, t, 40, 0.5); edtaKlauw(ctx, cx, cy, 1.2, V, q.on('EDTA', 1)); caIon(ctx, lerp(cx + 90 + wi.x, cx, V), lerp(cy + wi.y, cy, V), 19, 1); }
      naamBij(ctx, 'calciumion', 'nodig voor de stolling', 800, 290, (1 - Z), 'left'); naamBij(ctx, 'EDTA', 'vangt calcium', 1420, 290, q.on('EDTA', 1) * (1 - Z), 'left');
      for (let i = 0; i < 7; i++) { const w = wander(i + 20, t, 8, 0.5); rbc3(ctx, 860 + i * 125 + w.x, 720 + w.y + (i % 2) * 30, 28, { a: Z, rot: i, squash: 0.9 }); }
      tag(ctx, 'cellen blijven los → bloedbeeld', 1260, 690, C.groen, q.on('bloedbeeld', 1), 'center', 30); ctx.restore(); }
    // geel: stollen, centrifuge, lagen
    if (G > 0.01 && R < 0.99) { ctx.save(); ctx.globalAlpha *= G * (1 - R); const C0 = q.at('centrifuge', 1), D = q.at('Daarna', 1);
      const draai = clamp((t - C0) / (D - C0), 0, 1), ang = t > C0 ? (t - C0) * 9 * (t < D ? 1 : Math.max(0, 1 - (t - D) / 0.6)) : 0;
      centri3(ctx, 900, 480, 170, ang, { vaart: t > C0 && t < D ? 1 : 0 }); regel(ctx, 'centrifuge', 900, 760, q.on('centrifuge', 1), C.text2, 26, 'center', 600);
      const sep = clamp((t - D) / 1.2, 0, 1); buis(ctx, 1380, 250, 120, 540, 'geel', { t, naam: '', inhoud: sep > 0 ? 'gestold' : 'bloed', sep, stol: q.on('versnelt', 1, 1.5), seed: 7 });
      naamBij(ctx, 'serum', 'plasma zonder fibrinogeen', 1470, 380, q.on('serum', 1), 'left'); naamBij(ctx, 'gel', '', 1470, 560, q.on('gel', 2), 'left'); naamBij(ctx, 'stolsel', 'met de cellen', 1470, 700, q.on('stolsel', 1), 'left');
      tag(ctx, 'hierin meet het lab CRP', 1640, 470, C.teal, q.on('Daarin', 1), 'center', 26); ctx.restore(); }
    // grijs: fluoride, glucose in het buisje
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; const A = q.on('Anders', 1, 1.5);
      assen3(ctx, 900, 300, 820, 380, 'uren in het buisje', 'glucose in het buisje', 1);
      const curve = (k, col) => { ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const xx = 900 + u * 800, yy = 380 + k * u * 220; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); };
      if (q.on('remt', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('remt', 1); curve(0.04, C.groen); text(ctx, 'met fluoride', 1700, 360, fTekst(26, 700), C.groen, 'right'); ctx.restore(); }
      if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; curve(0.95, C.koraal); text(ctx, 'zonder fluoride: cellen verbruiken glucose', 1700, 650, fTekst(26, 700), C.koraal, 'right'); ctx.restore(); }
      ctx.restore(); } },

  // ---------- H2 Het bloedbeeld ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const W2 = q.on('witte', 1), H2 = q.on('Hb', 1); const P1 = 1 - W2, P2 = W2 * (1 - H2);
    apparaat(ctx, 110, 220, 520, 440, 1, 'CELTELLER', { lamp: 1, t }); buis(ctx, 230, 430, 46, 300, 'paars', { t, naam: '', seed: 3 });
    regel(ctx, 'druppel bloed, sterk verdund', 370, 760, q.on('druppel', 1) * (1 - q.on('stromen', 1)), C.text2, 26, 'center', 600);
    const T0 = q.at('stromen', 1) - 3;
    opening(ctx, q.on('stromen', 1) * (1 - H2)); celStroom(ctx, t, T0, q.on('stromen', 1) * P1, false); celStroom(ctx, t, T0, P2, true);
    naamBij(ctx, 'nauwe opening', 'één cel tegelijk', STROOM.xo + 30, 205, q.on('opening', 1) * P1, 'left');
    stroomSpoor(ctx, t, T0, q.on('stroom.', 1) * P1);
    regel(ctx, 'groot piekje: rode bloedcel', 760, 860, q.on('rode', 1) * P1, C.koraal, 26, 'left', 700); regel(ctx, 'klein piekje: bloedplaatje', 1780, 860, q.on('bloedplaatjes', 1) * P1, C.grain, 26, 'right', 700);
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2; ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(STROOM.xo, 120); ctx.lineTo(STROOM.xo, 540); ctx.stroke();
      for (let k = -3; k <= 3; k++) { ctx.strokeStyle = rgba(C.teal, 0.35); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(STROOM.xo, STROOM.y); ctx.lineTo(STROOM.xo + 300, STROOM.y + k * 60); ctx.stroke(); }
      naamBij(ctx, 'laserlicht', 'verstrooiing verraadt de soort', STROOM.xo + 30, 610, 1, 'left'); chip(ctx, 'rode bloedcellen eerst opgelost', 1270, 120, C.text2, 1, 24); ctx.restore(); }
    if (H2 > 0.01) { ctx.save(); ctx.globalAlpha *= H2; const B = q.on('openbarsten', 1, 1.5);
      roundRect(ctx, 900, 230, 420, 460, 16); shape(ctx, rgba('#CFE4F0', 0.06), C.line, 3); ctx.save(); roundRect(ctx, 900, 230, 420, 460, 16); ctx.clip(); ctx.fillStyle = rgba('#E8C870', 0.25 + 0.0 * B); ctx.fillRect(900, 230, 420, 460); ctx.fillStyle = rgba(BL.rijk, 0.75 * B); ctx.fillRect(900, 230, 420, 460);
      for (let i = 0; i < 14; i++) { const w = wander(i, t, 6, 0.6); rbc3(ctx, 960 + (i % 4) * 100 + w.x, 300 + Math.floor(i / 4) * 110 + w.y, 32 * (1 + 0.4 * B), { a: 1 - B, rot: i }); } ctx.restore();
      const L = q.on('licht', 2); if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = rgba('#F2F2EE', 0.9); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(760, 460); ctx.lineTo(900, 460); ctx.stroke(); ctx.strokeStyle = rgba('#F2F2EE', 0.4); ctx.beginPath(); ctx.moveTo(1320, 460); ctx.lineTo(1480, 460); ctx.stroke(); roundRect(ctx, 1480, 410, 120, 100, 10); shape(ctx, '#3A4A68', C.line, 2); text(ctx, 'meter', 1540, 470, fTekst(24, 700), C.text, 'center'); ctx.restore(); }
      naamBij(ctx, 'hemoglobine', 'neemt licht op', 1110, 760, q.on('hemoglobine', 1), 'center'); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('lab', 1);
    const rows = [['Hb', '9,1', 'mmol/L', 0, q.on('negen', 1), 0], ['leukocyten', '15', '× 10⁹/L', 1, q.on('vijftien', 1), q.on('leukocyten', 2)], ['trombocyten', '260', '× 10⁹/L', 0, q.on('tweehonderdzestig', 1), 0]];
    formulier(ctx, 90, 190, 760, rows, 1, 'BLOEDBEELD · H. DE VRIES', 34);
    tag(ctx, 'Nederland: millimol per liter · elders: gram per liter', 500, 520, C.teal, q.on('Nederland', 1) * (1 - q.on('Leukocyten', 1)), 'center', 26);
    const R = q.on('referentiewaarde', 1); const bx = 1170, bw = 560;
    regel(ctx, 'referentiewaarde', bx, 220, R, C.groen, 30, 'left', 700);
    [['Hb (mannen)', 300], ['leukocyten', 450], ['trombocyten', 600]].forEach(([n, yy]) => regel(ctx, n, bx - 20, yy + 8, R, C.text, 26, 'right', 700));
    refBalk(ctx, bx, 300, bw, 5, 13, 8.5, 11, 9.1, R, q.on('mannen', 1, 1), { lab: '9,1', fmt: z => String(z).replace('.', ',') });
    refBalk(ctx, bx, 450, bw, 0, 25, 4, 10, 15, R, q.on('leukocyten', 2, 1), { lab: '15' });
    refBalk(ctx, bx, 600, bw, 0, 600, 150, 400, 260, R, q.on('bloedplaatjes', 1, 1), { lab: '260' });
    regel(ctx, 'wat bij gezonde mensen gewoon is', bx, 690, R * (1 - q.on('infectie', 1)), C.text2, 26, 'left', 600);
    const I = q.on('infectie', 1); if (I > 0.01) { for (let i = 0; i < 5; i++) wbc3(ctx, 1120 + i * 90, 760 + (i % 2) * 20, 30, t, { a: I * (1 - K), seed: i + 3 }); regel(ctx, 'infectie: vaak extra witte bloedcellen', 1080, 850, I * (1 - K), C.text, 26, 'left', 700); }
    persoon(ctx, 'kim', 1810, 880, 230, { t, a: q.on('lab', 1, 0.3), kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' });
    tag(ctx, 'het lab meet · de arts legt het naast de klachten', 1150, 760, C.goud, q.on('klachten', 1), 'center', 26); },

  // ---------- H3 Klinische chemie ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('CRP', 1); const P1 = 1 - P2;
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1;
      apparaat(ctx, 110, 220, 520, 440, 1, 'CHEMIE-ANALYSER', { lamp: 1, t }); buis(ctx, 230, 430, 46, 300, 'geel', { t, naam: '', inhoud: 'gestold', sep: 1, seed: 4 });
      const kl = [0.15, 0.4, 0.65, 0.9]; const Kt = q.on('reagens', 1, 1.5);
      kl.forEach((k, i) => cuvet(ctx, 900 + i * 170, 330, 90, 200, '#8C5BB0', k * Kt * (i === 3 || q.on('sterker', 1) > 0.5 ? 1 : (i === 1 ? 1 : 0)), 0, q.on('pipetteert', 1)));
      naamBij(ctx, 'serum + reagens', 'een paar microliter', 900 - 40, 290, q.on('microliter', 1), 'left');
      regel(ctx, 'meer stof → sterkere kleur', 1160, 600, q.on('sterker', 1), C.text, 30, 'center', 700); pijl(ctx, 880, 640, 1440, 640, C.goud, q.on('sterker', 1), 4, 16);
      tag(ctx, 'ijklijn → concentratie (film: Van buisje tot uitslag)', 1160, 760, C.teal, q.on('ijklijn', 1), 'center', 26); ctx.restore(); }
    if (P2 > 0.01) { ctx.save(); ctx.globalAlpha *= P2;
      leverVorm3(ctx, 330, 420, 0.95, 1); naamBij(ctx, 'lever', 'maakt CRP', 230, 580, 1, 'left');
      for (let i = 0; i < 8; i++) { const ph = (t * 0.25 + i / 8) % 1; crpMol(ctx, 470 + ph * 330, 360 + Math.sin(i * 2 + ph * 6) * 50, 15, q.on('ontsteking', 1) * (1 - ph * 0.7), t + i); }
      const gx = 960, gy = 240, gw = 760, gh = 420; assen3(ctx, gx, gy, gw, gh, 'dagen na het begin', 'CRP (milligram per liter)', 1);
      for (let d = 0; d <= 5; d++) text(ctx, String(d), gx + d / 5 * gw, gy + gh + 30, fTekst(22, 600), C.text2, 'center');
      for (const v of [0, 50, 100, 150]) text(ctx, String(v), gx - 14, gy + gh - v / 180 * gh + 8, fTekst(22, 600), C.text2, 'right');
      const Y = (v) => gy + gh - v / 180 * gh; const c = (d) => d <= 0.25 ? 0 : 150 * Math.pow((d - 0.25) / 1.75, 2) * Math.exp(2 * (1 - (d - 0.25) / 1.75));
      const u = clamp((t - q.at('Binnen', 1)) / 4.5, 0, 1); ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 80 * u; i++) { const d = i / 80 * 5; const xx = gx + d / 5 * gw, yy = Y(c(d) + 3); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } if (u > 0) ctx.stroke();
      regel(ctx, 'hoogst na ± 2 dagen', gx + 2 / 5 * gw, Y(160), q.on('hoogst', 1), C.teal, 26, 'center', 700);
      const T = q.on('tien', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; ctx.fillStyle = rgba(C.groen, 0.2); ctx.fillRect(gx, Y(10), gw, Y(0) - Y(10)); ctx.restore(); regel(ctx, 'gezond: meestal onder 10', gx + gw - 10, Y(10) - 12, T, C.groen, 24, 'right', 700); }
      const Z = q.on('zestig', 1); if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(gx, Y(60)); ctx.lineTo(gx + gw, Y(60)); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); tag(ctx, 'Opa Henk: 60', gx + gw - 90, Y(60) - 14, C.goud, Z, 'center', 26); }
      regel(ctx, 'model, niet de echte meting', gx, gy - 56, 1, C.text2, 20, 'left', 500);
      const W = q.on('waar', 1); tag(ctx, 'CRP zegt niet waar, en niet waardoor', 1340, 800, C.koraal, W, 'center', 28); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('ALAT', 1); const P1 = 1 - L;
    if (P1 > 0.01) { buis(ctx, 360, 260, 70, 460, 'grijs', { t, naam: NAAM, a: P1, seed: 5 });
      tag(ctx, 'glucose: 4,9 millimol per liter', 1100, 420, C.teal, q.on('glucose', 1) * P1, 'center', 34); tag(ctx, 'nuchter: normaal', 1100, 520, C.groen, q.on('normale', 1) * P1, 'center', 30); }
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; const kap = clamp((t - q.at('kapot', 1)) / 3, 0, 1);
      levercellen(ctx, 230, 300, 72, { u: kap, t, kapot: 5 }); naamBij(ctx, 'levercellen', 'vol ALAT', 200, 200, 1, 'left');
      regel(ctx, 'lekt in het bloed', 560, 680, q.on('lekt', 1), BL.alat, 28, 'center', 700);
      regel(ctx, 'ALAT (eenheden per liter)', 1090, 520, q.on('bovengrens', 1), C.text, 28, 'left', 700);
      refBalk(ctx, 1090, 640, 640, 0, 80, 0, 45, 48, q.on('bovengrens', 1), q.on('achtenveertig', 1, 1), { lab: '48' });
      tag(ctx, 'Opa Henk: 48', 1410, 410, C.goud, q.on('achtenveertig', 1), 'center', 30);
      vraagteken(ctx, 1650, 380, q.on('denk', 1), 100); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ook gezonde mensen zitten er soms boven', 1);
    const M = q.on('Meet', 1); const K = q.on('Dr.', 1, 0.3);
    klokVerdeling(ctx, 260, 250, 1180, 360, 1, { staart: q.on('vijfennegentig', 1) });
    regel(ctx, '95 % van gezonde mensen', 850, 520, q.on('vijfennegentig', 1), C.text, 34, 'center', 800); regel(ctx, '2,5 %', 330, 600, q.on('vijfennegentig', 1), C.koraal, 26, 'center', 700); regel(ctx, '2,5 %', 1370, 600, q.on('vijfennegentig', 1), C.koraal, 26, 'center', 700);
    regel(ctx, 'referentiewaarde', 850, 680, q.on('referentiewaarde', 1), C.groen, 30, 'center', 700);
    for (let i = 0; i < 20; i++) telpop(ctx, 330 + i * 54, 820, 15, i === 13 ? C.koraal : '#7A8BA8', q.on('twintig', 1) * (1 - M));
    for (let i = 0; i < 20; i++) { const a = M; if (a <= 0.01) break; ctx.save(); ctx.globalAlpha *= a * clamp((t - q.at('Meet', 1)) * 8 - i * 0.6, 0, 1); roundRect(ctx, 312 + i * 54, 770, 40, 56, 6); shape(ctx, i === 6 ? rgba(C.koraal, 0.6) : rgba(C.groen, 0.35), i === 6 ? C.koraal : C.groen, 2); ctx.restore(); }
    regel(ctx, '20 gezonde mensen', 330, 740, q.on('twintig', 1) * (1 - M), C.text2, 24, 'left', 600); regel(ctx, '20 bepalingen bij één gezond iemand', 312, 740, M, C.text2, 24, 'left', 600);
    tag(ctx, 'erbuiten ≠ vanzelf ziek', 1660, 300, C.goud, q.on('ziek', 1), 'center', 30);
    persoon(ctx, 'kim', 1660, 880, 380, { t, a: K, kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }); },

  // ---------- H4 Bloedbank ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const A2 = q.on('andersom', 1); const T2 = q.on('genoeg', 1);
    tag(ctx, 'bloedbank', 1620, 210, C.koraal, 1, 'center', 30); buis(ctx, 1560, 260, 56, 400, 'paars', { t, naam: NAAM, seed: 9 }); tag(ctx, 'heupoperatie: bloed achter de hand', 1240, 820, C.teal, q.on('heupoperatie', 1) * (1 - q.on('mengt', 1)), 'center', 26);
    const R1 = 330, R2 = 650, xs = [380, 720, 1060]; const M = q.on('mengt', 1), Kl = q.on('klonteren', 1, 1.6);
    [['anti-A', 1], ['anti-B', 0], ['anti-D', 1]].forEach(([n, pos], i) => { putje(ctx, xs[i], R1, 115, pos ? Kl : 0, M, t, i + 1); regel(ctx, n, xs[i], R1 - 135, q.on(n, 1), C.goud, 30, 'center', 700); });
    naamBij(ctx, 'rode bloedcellen van Opa Henk', '', 720, 520, M * (1 - A2), 'center');
    tag(ctx, 'bloedgroep A, resuspositief', 720, 640, C.koraal, q.on('resuspositief', 1) * (1 - A2), 'center', 30);
    const Kb = q.on('Alleen', 1, 1.6);
    [['testcellen A', 0], ['testcellen B', 1]].forEach(([n, pos], i) => { putje(ctx, xs[i] + 170, R2, 105, pos ? Kb : 0, A2, t, i + 5, '#C9585A'); regel(ctx, n, xs[i] + 170, R2 - 122, A2, C.text, 26, 'center', 700); });
    naamBij(ctx, 'plasma van Opa Henk', 'erbij gedruppeld', 1120, R2 - 20, A2 * (1 - T2), 'left');
    tag(ctx, 'antistoffen tegen B: past bij A', 1240, 820, C.koraal, q.on('past', 1) * (1 - T2), 'center', 26);
    const B2 = q.on('twee', 1); buis(ctx, 1720, 260, 56, 400, 'paars', { t, naam: NAAM, seed: 10, a: B2 });
    regel(ctx, 'afname 1', 1560, 720, B2, C.text2, 24, 'center', 600); regel(ctx, 'afname 2', 1720, 720, B2, C.text2, 24, 'center', 600);
    tag(ctx, 'twee aparte afnames', 1640, 800, C.goud, q.on('apart', 1), 'center', 26);
    vraagteken(ctx, 1240, 160, q.on('Waarom', 1), 90); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('Daarna', 1), P3 = q.on('kruisproef', 1); const P1 = 1 - P2;
    antwoord(ctx, 'antwoord a: zo valt een verwisseld buisje op', P1);
    if (P1 > 0.01) { ctx.save(); ctx.globalAlpha *= P1; buis(ctx, 600, 260, 70, 460, 'paars', { t, naam: NAAM, seed: 11 }); buis(ctx, 900, 260, 70, 460, 'paars', { t, naam: NAAM, seed: 12, a: q.on('tweede', 1) });
      regel(ctx, 'afname 1', 600, 790, 1, C.text2, 26, 'center', 700); regel(ctx, 'afname 2', 900, 790, q.on('tweede', 1), C.text2, 26, 'center', 700);
      tag(ctx, 'etiket Opa Henk, bloed van een ander', 600, 220, C.koraal, q.on('etiket', 1), 'center', 24);
      tag(ctx, 'uitslag: O', 600, 860, C.koraal, q.on('tweede', 1), 'center', 26); tag(ctx, 'uitslag: A', 900, 860, C.groen, q.on('tweede', 1), 'center', 26);
      tag(ctx, 'uitslagen verschillen → het lab ziet de fout', 1420, 480, C.goud, q.on('vangt', 1), 'center', 28); kruis(ctx, 600, 300, 26, q.on('vangt', 1)); ctx.restore(); }
    if (P2 > 0.01) { const a2 = P2 * (1 - P3); ctx.save(); ctx.globalAlpha *= a2;
      circ(ctx, 600, 470, 230, rgba(BL.plasma, 0.3), BL.plasma, 3); naamBij(ctx, 'plasma van Opa Henk', '', 400, 200, 1, 'left');
      for (let i = 0; i < 9; i++) { const w = wander(i, t, 14, 0.5); antiY(ctx, 470 + (i % 3) * 130 + w.x, 380 + Math.floor(i / 3) * 100 + w.y, 1.4, i, i === 4 ? C.koraal : C.goud, i === 4 ? q.on('irreguliere', 1) : 1); }
      tag(ctx, 'irreguliere antistof?', 600, 780, C.koraal, q.on('irreguliere', 1), 'center', 28);
      regel(ctx, 'na een transfusie of een zwangerschap', 1000, 380, q.on('zwangerschap', 1), C.text, 30, 'left', 700);
      regel(ctx, 'niet gevonden: passende bloedgroep is genoeg', 1000, 480, q.on('genoeg', 1), C.groen, 28, 'left', 700);
      regel(ctx, 'wel gevonden: bloed kiezen waar die antistof niet op bindt', 1000, 560, q.on('binden', 1), C.koraal, 28, 'left', 700); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3; regel(ctx, 'kruisproef', 960, 200, 1, C.goud, 40, 'center', 800);
      circ(ctx, 400, 470, 130, rgba(BL.plasma, 0.35), BL.plasma, 3); for (let i = 0; i < 4; i++) antiY(ctx, 350 + (i % 2) * 100, 430 + Math.floor(i / 2) * 90, 1.2, i, C.goud, 1); regel(ctx, 'plasma Opa Henk', 400, 660, 1, C.text, 26, 'center', 700);
      donorZak(ctx, 1500, 470, 1.2, 1, 'donor'); regel(ctx, 'rode bloedcellen donor', 1500, 680, 1, C.text, 26, 'center', 700);
      pijl(ctx, 560, 470, 800, 470, C.line, q.on('mengt', 1), 4, 16); pijl(ctx, 1360, 470, 1120, 470, C.line, q.on('mengt', 1), 4, 16);
      putje(ctx, 960, 470, 130, 0, q.on('mengt', 1), t, 21);
      tag(ctx, 'geen klonten: dit zakje past', 960, 720, C.groen, q.on('niets', 1), 'center', 30); vink_(ctx, 1130, 340, 26, q.on('past', 1)); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    const rows = [['Hb', '9,1', 'mmol/L', 0, 1, 0], ['leukocyten', '15', '× 10⁹/L', 1, 1, q.on('Leukocyten', 1) * (1 - q.on('ALAT', 1))], ['trombocyten', '260', '× 10⁹/L', 0, 1, 0], ['CRP', '60', 'mg/L', 1, 1, q.on('Leukocyten', 1) * (1 - q.on('ALAT', 1))],
      ['glucose', '4,9', 'mmol/L', 0, 1, 0], ['ALAT', '48', 'U/L', 1, 1, q.on('ALAT', 1) * (1 - q.on('heup', 1))], ['bloedgroep', 'A pos', '', 0, 1, q.on('heup', 1)]];
    formulier(ctx, 110, 150, 800, rows, 1, 'UITSLAG · H. DE VRIES', 32);
    const kleur = ['paars', 'paars', 'paars', 'geel', 'grijs', 'geel', 'paars']; rows.forEach((r, i) => { const yy = 150 + 100 + i * 58 - 24; ctx.save(); ctx.globalAlpha *= q.on('buisje', 1); roundRect(ctx, 920, yy, 34, 18, 5); shape(ctx, DOP[kleur[i]], null); ctx.restore(); });
    persoon(ctx, 'kim', 1250, 880, 420, { t, kijk: t < q.at('klachten', 1) ? -1 : 1, outfit: 'lab', uit: 'neutraal', pose: t < q.at('klachten', 1) ? 'denk' : 'wijs' }); persoon(ctx, 'henk', 1580, 880, 430, { t, kijk: -1, uit: q.at('heup', 1) < t ? 'blij' : 'neutraal' });
    tag(ctx, 'het lab meet · de arts legt het naast de klachten', 960, 820, C.goud, q.on('meet', 1), 'center', 28); },

  s15(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'yasmin', 330, 880, 440, { t, kijk: 1, outfit: 'practicum', uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Yasmin', 'stagiair analist', 200, 380, 1, 'left');
    tag(ctx, 'mbo · analist (bv. biologisch-medisch) · niveau 4 · meestal 4 jaar', 1180, 230, C.teal, q.on('mbo', 1), 'center', 28);
    tag(ctx, 'hbo · Biologie en Medisch Laboratoriumonderzoek · 4 jaar', 1180, 330, C.paars, q.on('hbo', 1), 'center', 28);
    pijl(ctx, 1180, 250, 1180, 290, C.line, q.on('Daarna', 1), 3, 12);
    const W = [['ziekenhuislab', 'ziekenhuislabs'], ['bedrijf', 'bedrijven'], ['onderzoeksinstituut', 'onderzoeksinstituten'], ['RIVM en GGD', 'RIVM'], ['voedsel- en milieulab', 'voedsel']];
    W.forEach(([s2, w], i) => chip(ctx, s2, 820 + (i % 3) * 380, 500 + Math.floor(i / 3) * 110, C.goud, q.on(w, 1), 30));  }
});
