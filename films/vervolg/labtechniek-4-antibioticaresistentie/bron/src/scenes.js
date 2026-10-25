
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
// Wat word jij? · Laboratoriumtechniek · Antibioticaresistentie: kweken, testen en selectie — eigen tekeningen (24 okt 2026)
// Getallen nagerekend in reken/verdunning.py: 680 / 68 / 7 kolonies bij 0,1 ml uit de 10^-4, 10^-5 en 10^-6-verdunning
// -> 6,8 x 10^7 per ml; 7 kolonies uit 10^9 cellen op de plaat met antibioticum.
// Bacterie: bibliotheek/lib_bio.js (bacterieCel, bacterieGroot) waar het past; hieronder alleen wat die niet heeft.

const KL_PLAAT = '#E8E2D2';       // agar (lichtbeige, doorschijnend)
const KL_SCHAAL = '#C9CED6';      // rand van de petrischaal
const KL_KOLONIE = '#F2EAD0';     // kolonie op de agar

// ---- zaadbaar pseudotoeval, zodat elke kolonie altijd op dezelfde plek staat ----
function rngL(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// n punten gelijkmatig in een cirkel van straal R (gecachet per sleutel)
const _PUNTEN = {};
function puntenInCirkel(key, n, R, seed) {
  if (_PUNTEN[key]) return _PUNTEN[key];
  const r = rngL(seed), out = [];
  for (let i = 0; i < n; i++) { const rr = R * Math.sqrt(r()), an = r() * 6.283; out.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
  return (_PUNTEN[key] = out);
}

// =====================================================================================
// PETRISCHAAL van boven. Recept: rond schaaltje van 90 mm met een rand (deksel iets groter),
// agar als vlakke lichtbeige schijf met een dunne glansrand; kolonies als kleine ronde bolletjes
// met een zachte rand, niet precies even groot, en nooit buiten de agar.
// Bekende fouten: kolonies tot tegen de rand (de agar loopt niet tot de rand van de schaal),
// kolonies allemaal even groot, agar wit (dan kun je een heldere remzone niet laten zien).
// o.kolonies = aantal, o.groei 0..1 (hoe ver de kolonies gegroeid zijn), o.leeg = alleen agar,
// o.open 0..1 (deksel schuift een klein stukje open: ± 0,3 R, één kant blijft op de plaat),
// o.waas 0..1 (gesloten groei over de hele plaat), o.seed.
// =====================================================================================
function petrischaal(ctx, x, y, R, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { kolonies = 0, groei = 1, open = 0, waas = 0, seed = 7, label = null, omlijst = 0 } = o;
  const Ra = R * 0.9; // de agar loopt niet tot de rand
  ctx.save(); ctx.globalAlpha *= a;
  // schaal + agar
  circ(ctx, x, y, R, rgba(KL_SCHAAL, 0.18), rgba(KL_SCHAAL, 0.8), 3);
  circ(ctx, x, y, Ra, rgba(KL_PLAAT, 0.9), rgba('#B9B09A', 0.9), 2);
  // gesloten waas: dichte groei over de hele agar
  if (waas > 0.01) { ctx.save(); ctx.globalAlpha *= waas; circ(ctx, x, y, Ra - 2, rgba('#DED6BE', 0.95));
    const wp = puntenInCirkel('waas' + seed + '_' + Math.round(Ra), 420, Ra - 6, seed + 31);
    wp.forEach(([px, py], i) => circ(ctx, x + px, y + py, 2.2 + 1.6 * hash(i * 3 + seed), rgba('#F2EAD0', 0.75)));
    ctx.restore(); }
  // remzones onder de schijfjes (donkere ring = geen groei), eerst de groei, dan de zones
  if (kolonies > 0) {
    const schaal = kolonies <= 12 ? 2.6 : (kolonies <= 90 ? 1.5 : 1);
    const marge = 10 + 4.2 * schaal;   // kolonies nooit over de rand van de agar
    const pts = puntenInCirkel('kol' + seed + '_' + kolonies + '_' + Math.round(Ra - marge), kolonies, Ra - marge, seed);
    const g = ease(groei);
    pts.forEach(([px, py], i) => { const rr = (1.6 + 2.6 * hash(i * 5 + seed)) * g * schaal; if (rr < 0.3) return;
      circ(ctx, x + px, y + py, rr + 1.2, rgba('#B9B09A', 0.35));
      circ(ctx, x + px, y + py, rr, rgba(KL_KOLONIE, 0.95)); });
  }
  // deksel dat een stukje open schuift
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= 0.55; ctx.translate(R * 0.12 * ease(open), -R * 0.3 * ease(open));
    circ(ctx, x, y, R * 1.03, rgba('#D8DEE4', 0.16), rgba('#D8DEE4', 0.7), 3); ctx.restore(); }
  if (omlijst > 0.01) { ctx.save(); ctx.globalAlpha *= omlijst; circ(ctx, x, y, R + 14, null, C.groen, 6); ctx.restore(); }
  ctx.restore();
  if (label) naamBij(ctx, label[0], label[1] || '', x, y + R + 54, a, 'center');
}

// Zelfde schaal, maar met echte schijfjes en remzones die netjes getekend worden.
// zones: [{an, mm, nm}] — an = hoek, mm = diameter van de remzone in millimeter, nm = label
function antibiogramPlaat(ctx, x, y, R, zones, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { groei = 1, meet = -1, seed = 11, toonMm = 0 } = o;
  const Ra = R * 0.9, mmPx = Ra / 35; // 35 mm halve agar in beeld
  ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, R, rgba(KL_SCHAAL, 0.18), rgba(KL_SCHAAL, 0.8), 3);
  circ(ctx, x, y, Ra, rgba(KL_PLAAT, 0.9), rgba('#B9B09A', 0.9), 2);
  // gelijkmatige groei over de hele plaat
  if (groei > 0.01) { ctx.save(); ctx.globalAlpha *= ease(groei); circ(ctx, x, y, Ra - 2, rgba('#DED6BE', 0.95));
    puntenInCirkel('abg' + seed + '_' + Math.round(Ra), 380, Ra - 6, seed).forEach(([px, py], i) => circ(ctx, x + px, y + py, 2 + 1.5 * hash(i * 7 + seed), rgba('#F2EAD0', 0.7)));
    ctx.restore(); }
  // remzones (geen groei): agar zonder bacteriën, dus de kleur van de lege agar
  zones.forEach((z, i) => {
    const cx = x + Math.cos(z.an) * Ra * 0.5, cy = y + Math.sin(z.an) * Ra * 0.5;
    const zr = Math.max(Ra * 0.09, z.mm / 2 * mmPx * ease(groei));
    if (z.mm > 7) circ(ctx, cx, cy, zr, rgba(KL_PLAAT, 1), rgba('#B9B09A', 0.5), 1.5);
    circ(ctx, cx, cy, Ra * 0.085, '#F6F2E6', '#A8A08C', 1.5); // papieren schijfje
    if (toonMm > 0.01 && z.nm) { ctx.save(); ctx.globalAlpha *= toonMm;
      const lx = x + Math.cos(z.an) * (R + 44), ly = y + Math.sin(z.an) * (R + 44) + 8;
      metaText(ctx, z.nm, lx, ly, C.grain, Math.cos(z.an) < -0.3 ? 'right' : (Math.cos(z.an) > 0.3 ? 'left' : 'center'), 20); ctx.restore(); }
    if (meet === i) { // liniaal over de zone
      ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - zr, cy); ctx.lineTo(cx + zr, cy); ctx.stroke();
      [-1, 1].forEach(s => { ctx.beginPath(); ctx.moveTo(cx + s * zr, cy - 12); ctx.lineTo(cx + s * zr, cy + 12); ctx.stroke(); });
      ctx.restore();
      regel(ctx, z.mm + ' mm', cx, cy - zr - 22, 1, C.goud, 34, 'center', 800);
    }
  });
  ctx.restore();
}

// =====================================================================================
// ENTOOG (inoculatielus). Recept: metalen steel met een handgreep en aan het eind een lusje
// van ± 3 mm; in de vlam gloeit de draad oranje-wit van de punt naar de steel, daarna koelt hij af.
// Bekende fout: een lus als dichte schijf (het is een open oogje).
// hitte 0..1 (0 = koud, 1 = gloeiend)
// =====================================================================================
function entoog(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { hitte = 0, rot = -0.5 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -150, -11, 90, 22, 9); shape(ctx, '#3A4458', '#6A7488', 2);          // greep
  ctx.strokeStyle = hitte > 0.05 ? lighten('#E07A5F', 0.25 * hitte) : '#B8C0D0';       // draad
  ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(-16, 0); ctx.stroke();
  if (hitte > 0.05) { ctx.save(); ctx.globalAlpha *= 0.5 * hitte; ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = 13;
    ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-16, 0); ctx.stroke(); ctx.restore(); }
  circ(ctx, 0, 0, 16, null, hitte > 0.05 ? lighten('#F2C94C', 0.2 * hitte) : '#D8DEE4', 5); // het oogje
  if (hitte > 0.4) { ctx.save(); ctx.globalAlpha *= 0.45 * (hitte - 0.4) / 0.6; circ(ctx, 0, 0, 26, rgba('#F2C94C', 0.6)); ctx.restore(); }
  ctx.restore();
}

// Gasvlam (brander): voetstuk, buisje, en een blauwe kegel met een lichtere binnenkegel die leeft.
function brander(ctx, x, voetY, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, vlam = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, voetY); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 54, 15, 0, 0, 6.283); shape(ctx, '#3A4458', '#6A7488', 2);
  roundRect(ctx, -13, -150, 26, 150, 6); shape(ctx, '#4A5468', '#7A8498', 2);
  if (vlam > 0.01) { ctx.save(); ctx.globalAlpha *= vlam; const w = 1 + 0.07 * Math.sin(t * 7);
    ctx.beginPath(); ctx.moveTo(-15, -150); ctx.quadraticCurveTo(-11, -196 * w, 0, -224 * w); ctx.quadraticCurveTo(11, -196 * w, 15, -150); ctx.closePath();
    shape(ctx, rgba('#5BA4C9', 0.55), rgba('#8FD0E8', 0.8), 2);
    ctx.beginPath(); ctx.moveTo(-7, -150); ctx.quadraticCurveTo(-5, -176 * w, 0, -190 * w); ctx.quadraticCurveTo(5, -176 * w, 7, -150); ctx.closePath();
    shape(ctx, rgba('#2E6FBF', 0.8), null); ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// VEILIGHEIDSKABINET (klasse II). Recept: kast met een open werkopening aan de voorkant en een
// ruit die halverwege zakt; de lucht stroomt aan de voorkant naar binnen (pijlen naar binnen en
// omlaag) en gaat door een filter bovenin weer naar buiten. Bron: Maastricht University, procedure
// veiligheidskabinet type II; NuAire class II type A2.
// Bekende fout: pijlen die naar de gebruiker toe waaien (dan beschermt de kast niets).
// =====================================================================================
function veiligheidskabinet(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, stroom = 1, filterHl = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, rgba('#2A3446', 0.9), '#7A8498', 3);
  // filter bovenin
  const fh = h * 0.12, fy = y - h / 2 + h * 0.05;
  roundRect(ctx, x - w / 2 + 16, fy, w - 32, fh, 6);
  shape(ctx, rgba(filterHl > 0.01 ? C.teal : '#4A5468', filterHl > 0.01 ? 0.3 : 0.6), filterHl > 0.01 ? C.teal : '#8FA0B5', 2);
  for (let i = 0; i < 11; i++) { const px = x - w / 2 + 26 + i * (w - 52) / 10; ctx.strokeStyle = rgba('#8FA0B5', 0.55); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, fy + 4); ctx.lineTo(px, fy + fh - 4); ctx.stroke(); }
  // de ruit staat half open; daaronder de werkopening
  const oy = y + h * 0.1, ruitY = fy + fh + 8;
  roundRect(ctx, x - w / 2 + 12, ruitY, w - 24, oy - ruitY, 6); shape(ctx, rgba('#8FD0E8', 0.1), rgba('#AFC0D0', 0.7), 2);
  // werkopening: donkere spleet onder de ruit
  ctx.fillStyle = rgba('#0D1420', 0.75); ctx.fillRect(x - w / 2 + 12, oy, w - 24, h * 0.1);
  // werkblad met een plaat erop
  ctx.fillStyle = rgba('#3A4458', 0.95); ctx.fillRect(x - w / 2 + 12, y + h * 0.25, w - 24, 12);
  ctx.beginPath(); ctx.ellipse(x, y + h * 0.25 - 6, w * 0.13, 9, 0, 0, 6.283); shape(ctx, rgba(KL_PLAAT, 0.6), rgba(KL_SCHAAL, 0.8), 1.5);
  // luchtstroom: aan de voorkant door de werkopening naar binnen, dan omlaag en onder het blad weg
  if (stroom > 0.01) { ctx.save(); ctx.globalAlpha *= stroom;
    for (let i = 0; i < 3; i++) { const u = (t * 0.5 + i / 3) % 1, py = oy + h * 0.05;
      pijl(ctx, x - w / 2 - 110 + u * 70, py, x - w / 2 - 110 + u * 70 + 56, py, C.teal, 0.85, 5, 14);
      pijl(ctx, x + w / 2 + 110 - u * 70, py, x + w / 2 + 110 - u * 70 - 56, py, C.teal, 0.85, 5, 14); }
    for (let i = 0; i < 5; i++) { const u = (t * 0.45 + i / 5) % 1, px = x - w / 2 + 60 + i * (w - 120) / 4;
      pijl(ctx, px, ruitY + 14, px, ruitY + 14 + u * (y + h * 0.25 - ruitY - 32), rgba(C.teal, 0.5), 0.9, 3, 10); }
    ctx.restore(); }
  ctx.restore();
}

// =====================================================================================
// VERDUNNINGSREEKS: rij buisjes, elk 1 op 10 van het vorige; de troebelheid neemt per buisje af.
// stap = hoeveel buisjes al gevuld zijn (0..n, mag gebroken zijn); pipet = index waar de pipet staat.
// =====================================================================================
function verdunningsreeks(ctx, x0, y, n, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { stap = n, dx = 132, bw = 58, bh = 170, labels = true, pipet = -1, t = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * dx, vul = clamp(stap - i, 0, 1);
    // buisje: ronde bodem
    ctx.beginPath(); ctx.moveTo(x - bw / 2, y - bh); ctx.lineTo(x - bw / 2, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2, Math.PI, 0, true); ctx.lineTo(x + bw / 2, y - bh); ctx.closePath();
    shape(ctx, rgba('#8FD0E8', 0.08), rgba('#AFC0D0', 0.75), 2.5);
    if (vul > 0.01) { // vloeistof, steeds lichter troebel
      const tro = 0.55 * Math.pow(0.55, i) + 0.05;
      ctx.save(); ctx.beginPath(); ctx.moveTo(x - bw / 2 + 3, y - bh * 0.72); ctx.lineTo(x - bw / 2 + 3, y - bw / 2);
      ctx.arc(x, y - bw / 2, bw / 2 - 3, Math.PI, 0, true); ctx.lineTo(x + bw / 2 - 3, y - bh * 0.72); ctx.closePath();
      ctx.globalAlpha *= ease(vul); shape(ctx, rgba('#E8E2D2', tro), null); ctx.restore(); }
    if (labels) metaText(ctx, ['10', '100', '1000', '10 000', '100 000', '1 miljoen'][i] || '', x, y + 44, C.text2, 'center', 18);
    if (i < n - 1) pijl(ctx, x + bw / 2 + 8, y - bh * 0.55, x + dx - bw / 2 - 8, y - bh * 0.55, rgba(C.goud, 0.8), ease(clamp(stap - i - 0.5, 0, 1)), 3, 11);
  }
  if (labels) metaText(ctx, 'keer verdund', x0 + (n - 1) * dx + 86, y + 44, C.text2, 'left', 16);
  if (pipet >= 0) { const px = x0 + pipet * dx; pipetje(ctx, px, y - bh - 34, 1, { a: 1, t }); }
  ctx.restore();
}

// pipet met een druppel aan de punt
function pipetje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0, druppel = 1, volume = null } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -15, -150, 30, 108, 8); shape(ctx, '#4A5468', '#8FA0B5', 2);
  ctx.beginPath(); ctx.moveTo(-11, -42); ctx.lineTo(11, -42); ctx.lineTo(4, 4); ctx.lineTo(-4, 4); ctx.closePath();
  shape(ctx, rgba('#AFC0D0', 0.3), '#AFC0D0', 2);
  if (druppel > 0.01) { const dy = 10 + 16 * ((t * 1.2) % 1); ctx.save(); ctx.globalAlpha *= druppel * (1 - (t * 1.2) % 1);
    ctx.beginPath(); ctx.ellipse(0, dy, 6, 8, 0, 0, 6.283); shape(ctx, rgba('#E8E2D2', 0.85), null); ctx.restore(); }
  if (volume) { ctx.restore(); metaText(ctx, volume, x + 26, y - 96, C.goud, 'left', 20); return; }
  ctx.restore();
}

// =====================================================================================
// MIC-REEKS: buisjes waarin de concentratie elke stap verdubbelt; troebel tot de MIC, daarna helder.
// conc = [0.016, ...]; mic = de eerste heldere concentratie; toon 0..1 = hoeveel buisjes al staan.
// =====================================================================================
function micReeks(ctx, x0, y, conc, mic, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { dx = 124, bw = 56, bh = 150, toon = 1, hlMic = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  conc.forEach((c, i) => {
    const x = x0 + i * dx, op = clamp(toon * conc.length - i, 0, 1); if (op <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= ease(op);
    ctx.beginPath(); ctx.moveTo(x - bw / 2, y - bh); ctx.lineTo(x - bw / 2, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2, Math.PI, 0, true); ctx.lineTo(x + bw / 2, y - bh); ctx.closePath();
    shape(ctx, rgba('#8FD0E8', 0.08), rgba('#AFC0D0', 0.75), 2.5);
    const groei = c < mic - 1e-9;
    ctx.beginPath(); ctx.moveTo(x - bw / 2 + 3, y - bh * 0.76); ctx.lineTo(x - bw / 2 + 3, y - bw / 2);
    ctx.arc(x, y - bw / 2, bw / 2 - 3, Math.PI, 0, true); ctx.lineTo(x + bw / 2 - 3, y - bh * 0.76); ctx.closePath();
    shape(ctx, groei ? rgba('#E8E2D2', 0.6) : rgba('#8FD0E8', 0.1), null);
    metaText(ctx, String(c).replace('.', ','), x, y + 42, groei ? C.grain : C.teal, 'center', 19);
    if (Math.abs(c - mic) < 1e-9 && hlMic > 0.01) { ctx.save(); ctx.globalAlpha *= hlMic;
      roundRect(ctx, x - bw / 2 - 10, y - bh - 12, bw + 20, bh + 26, 10); shape(ctx, null, C.groen, 5); ctx.restore(); }
    ctx.restore();
  });
  metaText(ctx, 'milligram per liter', x0 + (conc.length - 1) * dx / 2, y + 84, C.text2, 'center', 17);
  ctx.restore();
}

// =====================================================================================
// BREEKPUNT-SCHAAL: een as in millimeter met een vaste grens; links resistent, rechts gevoelig,
// met een smalle tussenstrook. Twee gemeten zones komen er als stippen op te staan.
// =====================================================================================
function breekpuntAs(ctx, x, y, w, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { grens = 19, tussen = 2, lo = 0, hi = 34, punten = [], toonLab = 1 } = o;
  const X = v => x + (v - lo) / (hi - lo) * w;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, X(lo), y - 20, X(grens) - X(lo), 40, 6); shape(ctx, rgba(C.koraal, 0.2), rgba(C.koraal, 0.8), 2);
  roundRect(ctx, X(grens), y - 20, X(grens + tussen) - X(grens), 40, 6); shape(ctx, rgba(C.oker, 0.25), rgba(C.oker, 0.8), 2);
  roundRect(ctx, X(grens + tussen), y - 20, X(hi) - X(grens + tussen), 40, 6); shape(ctx, rgba(C.groen, 0.2), rgba(C.groen, 0.8), 2);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(X(grens), y - 30); ctx.lineTo(X(grens), y + 46); ctx.stroke();
  if (toonLab > 0.01) { ctx.save(); ctx.globalAlpha *= toonLab;
    regel(ctx, 'resistent', X(lo) + 14, y + 128, 1, C.koraal, 30, 'left', 700);
    regel(ctx, 'gevoelig', X(hi) - 14, y + 128, 1, C.groen, 30, 'right', 700);
    metaText(ctx, 'breekpunt', X(grens), y + 82, C.goud, 'center', 20);
    metaText(ctx, 'tussengebied', X(grens + tussen / 2), y + 110, C.oker, 'center', 18); ctx.restore(); }
  // gemeten zones: afwisselend boven elkaar, zodat de labels elkaar niet raken
  punten.forEach((p, i) => { const col = p.v >= grens + tussen ? C.groen : (p.v >= grens ? C.oker : C.koraal);
    circ(ctx, X(p.v), y, 15, rgba(col, 0.9), col, 3);
    if (p.nm) regel(ctx, p.nm, X(p.v), y - 46 - i * 54, p.a == null ? 1 : p.a, col, 30, 'center', 700); });
  metaText(ctx, 'remzone in millimeter', X(hi), y + 176, C.text2, 'right', 18);
  ctx.restore();
}

// =====================================================================================
// BACTERIE met plasmide, voor conjugatie. Recept: staafvorm met een dikke celwand en een membraan
// eronder; binnen het membraan een opgekruld nucleoïde en een of meer kleine ringetjes (plasmiden);
// alles helemaal binnen het membraan (BEELDAFSPRAKEN 23 okt 2026). Een pilus is een dun buisje
// tussen twee cellen; de kopie van het plasmide gaat zichtbaar door de wand heen.
// Bekende fouten: plasmide half over de rand, pilus als los haartje, kern in een bacterie.
// =====================================================================================
function bacterieLT(ctx, x, y, L, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { rot = 0, col = C.teal, plasmide = 0, mutatie = 0, t = 0, dood = 0, hlGen = 0 } = o;
  const hw = L / 4.4;
  ctx.save(); ctx.globalAlpha *= a * (1 - 0.55 * dood); ctx.translate(x, y); ctx.rotate(rot);
  const kleur = dood > 0.5 ? C.text2 : col;
  // celwand + membraan (capsule)
  roundRect(ctx, -L / 2, -hw, L, 2 * hw, hw); shape(ctx, rgba(kleur, 0.16), rgba(kleur, 0.9), Math.max(3, hw * 0.22));
  roundRect(ctx, -L / 2 + hw * 0.3, -hw + hw * 0.3, L - hw * 0.6, 2 * hw - hw * 0.6, hw * 0.7);
  shape(ctx, null, rgba('#F2E6C8', 0.6), Math.max(1.2, hw * 0.07));
  // nucleoïde: één kronkelende lus binnen het membraan
  ctx.save(); roundRect(ctx, -L / 2 + hw * 0.35, -hw + hw * 0.35, L - hw * 0.7, 2 * hw - hw * 0.7, hw * 0.65); ctx.clip();
  ctx.strokeStyle = rgba(hlGen > 0.01 ? C.goud : C.paars, 0.95); ctx.lineWidth = Math.max(2, hw * 0.13);
  ctx.beginPath(); for (let i = 0; i <= 120; i++) { const u = i / 120 * 6.283;
    const px = -L * 0.08 + Math.cos(u) * L * 0.2 + Math.cos(u * 9) * hw * 0.17, py = Math.sin(u) * hw * 0.34 + Math.sin(u * 9) * hw * 0.13;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke();
  // het veranderde gen als een opvallend stukje op de lus
  if (mutatie > 0.01) { ctx.save(); ctx.globalAlpha *= mutatie; const u = 1.1;
    const px = -L * 0.08 + Math.cos(u) * L * 0.2 + Math.cos(u * 9) * hw * 0.17, py = Math.sin(u) * hw * 0.34 + Math.sin(u * 9) * hw * 0.13;
    circ(ctx, px, py, Math.max(4, hw * 0.2), C.goud, lighten(C.goud, 0.3), 2); ctx.restore(); }
  // ribosomen
  for (let i = 0; i < 26; i++) { const px = (hash(i * 2.3 + 1) - 0.5) * (L - hw), py = (hash(i * 3.1 + 2) - 0.5) * (1.5 * hw);
    if (Math.abs(px + L * 0.08) < L * 0.24 && Math.abs(py) < hw * 0.45) continue;
    circ(ctx, px, py, Math.max(1.6, hw * 0.055), rgba('#C9B896', 0.85)); }
  // plasmide: klein ringetje, helemaal binnen het membraan
  if (plasmide > 0.01) { ctx.save(); ctx.globalAlpha *= plasmide;
    const pr = hw * 0.38, px0 = L * 0.3, py0 = hw * 0.25, lw = Math.max(3, hw * 0.13);
    ctx.beginPath(); ctx.ellipse(px0, py0, pr, pr * 0.78, 0.3, 0, 6.283); shape(ctx, null, C.groen, lw);
    ctx.beginPath(); ctx.ellipse(px0, py0, pr, pr * 0.78, 0.3, -0.6, 0.6);  // het resistentiegen
    ctx.strokeStyle = C.goud; ctx.lineWidth = lw + 2; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  ctx.restore();  // clip
  ctx.restore();  // translate/rotate
  return { rechts: [x + Math.cos(rot) * L / 2, y + Math.sin(rot) * L / 2], links: [x - Math.cos(rot) * L / 2, y - Math.sin(rot) * L / 2] };
}

// los plasmide-ringetje (voor de kopie die overgaat)
function plasmideRing(ctx, x, y, r, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { col = C.groen, gen = 1, lw = 5 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0.3, 0, 6.283);
  shape(ctx, null, col, lw);
  if (gen > 0.01) { ctx.save(); ctx.globalAlpha *= gen; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0.3, -0.5, 0.5);
    ctx.strokeStyle = C.goud; ctx.lineWidth = lw + 3; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}

// pilus tussen twee punten: een dun buisje met een lichte wand
function pilus(ctx, p1, p2, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { groei = 1, t = 0 } = o;
  const g = ease(groei), x2 = p1[0] + (p2[0] - p1[0]) * g, y2 = p1[1] + (p2[1] - p1[1]) * g;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba('#AFC0D0', 0.9); ctx.lineWidth = 13; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.strokeStyle = rgba('#1A2740', 0.8); ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
  return [x2, y2];
}

// =====================================================================================
// WARMTEKAST: kast met een glazen deur, roosters met platen erin, en een temperatuurdisplay.
// =====================================================================================
function warmtekast(ctx, x, y, w, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { graden = '37 °C', platen = 4, hl = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba('#2A3446', 0.95), hl > 0.01 ? C.goud : '#7A8498', hl > 0.01 ? 4 : 3);
  roundRect(ctx, x - w / 2 + 14, y - h / 2 + 58, w - 28, h - 86, 8); shape(ctx, rgba('#8FD0E8', 0.07), rgba('#AFC0D0', 0.6), 2);
  for (let i = 0; i < platen; i++) { const py = y - h / 2 + 92 + i * (h - 150) / Math.max(1, platen - 1);
    ctx.strokeStyle = rgba('#8FA0B5', 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - w / 2 + 24, py); ctx.lineTo(x + w / 2 - 24, py); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, py - 6, w * 0.19, 7, 0, 0, 6.283); shape(ctx, rgba(KL_PLAAT, 0.5), rgba(KL_SCHAAL, 0.7), 1.5); }
  roundRect(ctx, x - w / 2 + 18, y - h / 2 + 14, 118, 34, 5); shape(ctx, rgba('#0D1420', 0.9), '#6A7488', 2);
  text(ctx, graden, x - w / 2 + 77, y - h / 2 + 39, fMeta(24), C.goud, 'center');
  ctx.restore();
}

// potje urine met etiket
function monsterPotje(ctx, x, voetY, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { etiket = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, voetY); ctx.scale(s, s);
  roundRect(ctx, -34, -96, 68, 96, 7); shape(ctx, rgba('#AFC0D0', 0.2), rgba('#C9CED6', 0.85), 2.5);
  roundRect(ctx, -31, -58, 62, 55, 5); shape(ctx, rgba('#E0B64A', 0.45), null);              // urine
  roundRect(ctx, -38, -112, 76, 20, 5); shape(ctx, '#D8DEE4', '#9AA3B2', 2);                  // deksel
  if (etiket > 0.01) { ctx.save(); ctx.globalAlpha *= etiket; roundRect(ctx, -29, -88, 58, 26, 3); shape(ctx, '#F2F2EE', '#9AA3B2', 1.5);
    ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; [-80, -72].forEach(yy => { ctx.beginPath(); ctx.moveTo(-23, yy); ctx.lineTo(19, yy); ctx.stroke(); }); ctx.restore(); }
  ctx.restore();
}

// doosje antibiotica (leeg), in de hand van Opa Henk
function pilDoosje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { rot = -0.12 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -46, -32, 92, 64, 6); shape(ctx, '#E8ECF0', '#9AA3B2', 2.5);
  ctx.fillStyle = rgba(C.koraal, 0.8); ctx.fillRect(-46, -32, 92, 13);
  ctx.strokeStyle = '#8A93A2'; ctx.lineWidth = 2.5; [-6, 4, 14].forEach(yy => { ctx.beginPath(); ctx.moveTo(-34, yy); ctx.lineTo(22 + yy, yy); ctx.stroke(); });
  ctx.restore();
}

// telefoon in de hand (recap)
function telefoontje(ctx, x, y, s = 1, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const { t = 0 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -17, -34, 34, 68, 7); shape(ctx, '#2A3446', '#8FA0B5', 2);
  roundRect(ctx, -13, -29, 26, 52, 4); shape(ctx, rgba('#8FD0E8', 0.3), null);
  for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= 0.7 * (1 - u);
    circ(ctx, 0, -40, 14 + u * 26, null, rgba(C.teal, 0.8), 3); ctx.restore(); }
  ctx.restore();
}
// Wat word jij? · Laboratoriumtechniek · Antibioticaresistentie: kweken, testen en selectie — scènes per alinea (v1.0, 24 okt 2026)
// Look: Schema, met cast (Yasmin als stagiair-analist, outfit practicum; Opa Henk als patiënt; Dr. Kim als arts, outfit lab).
// Rode draad: één monster, de urine van Opa Henk. Elke scène staat er op t = 0; alleen wat genoemd wordt komt later.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// persoon die naar links kijkt: de hele figuur gespiegeld rond x, zodat ook de wijzende of vasthoudende arm naar links gaat
// (in lib_cast wisselt bij kijk: -1 de armpose maar niet de kant; dit omzeilt dat zonder de gedeelde engine te raken)
function persoonK(ctx, id, x, y, h, o = {}) {
  if ((o.kijk || 1) > 0) return persoon(ctx, id, x, y, h, o);
  ctx.save(); ctx.translate(2 * x, 0); ctx.scale(-1, 1); const r = persoon(ctx, id, x, y, h, Object.assign({}, o, { kijk: 1 })); ctx.restore();
  const m = p => (p && p.x != null) ? Object.assign({}, p, { x: 2 * x - p.x, ang: p.ang != null ? Math.PI - p.ang : p.ang }) : p;
  return (r && r.handR) ? Object.assign({}, r, { handR: m(r.handR), handL: m(r.handL), hoofd: m(r.hoofd) }) : r; }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }

// de werkbank waar Yasmin staat: brander links, platen op het blad
function werkbank(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba('#3A4458', 0.85); ctx.fillRect(120, 790, 1680, 16);
  ctx.fillStyle = rgba('#2A3446', 0.6); ctx.fillRect(120, 806, 1680, 10);
  ctx.restore(); }

// de MIC-reeks die de film gebruikt (verdubbelingsstappen, nagerekend in reken/verdunning.py)
const MIC_CONC = [0.03, 0.06, 0.125, 0.25, 0.5, 1, 2];   // schrijfwijze EUCAST
const MIC_WAARDE = 0.5;

Object.assign(SCENES, {
  title(ctx, t) {
    petrischaal(ctx, 1670, 450, 180, { kolonies: 34, groei: 1, seed: 3 });
    bacterieLT(ctx, 1670, 740, 170, { rot: 0.1, plasmide: 1, col: C.teal, t });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    persoon(ctx, 'henk', 380, 790, 420, { t, uit: 'neutraal', pose: 'vasthouden', kijk: 1 });
    naamBij(ctx, 'Opa Henk', 'blaasontsteking', 380, 290, q.on('Henk', 1), 'center');
    pilDoosje(ctx, 560, 540, 1, { a: q.on('kuur', 1) });
    chip(ctx, 'kuur gehad, nog niet beter', 620, 420, C.koraal, q.on('beter', 1), 26);
    const Y = q.on('Yasmin', 1, 0.3);
    persoonK(ctx, 'yasmin', 1450, 790, 430, { t, a: Y, uit: 'neutraal', pose: 'vasthouden', kijk: -1, outfit: 'practicum' });
    naamBij(ctx, 'Yasmin', 'stagiair-analist', 1450, 290, Y, 'center');
    monsterPotje(ctx, 980, 700, 1.4, { a: 1 });
    naamBij(ctx, 'urine', 'het monster', 980, 790, q.on('urine', 1), 'center');
    pijl(ctx, 720, 640, 880, 640, rgba(C.goud, 0.8), q.on('lab', 1), 4, 14);
    vraagteken(ctx, 1180, 430, q.on('denk', 1), 110); },

  // ---------- H1 steriel werken ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: welke bacterie, en welk middel nog werkt');
    const B = q.on('Dus', 1, 0.7), K = q.on('veiligheidskabinet', 1, 0.7);
    // deel 1: niet jij maar de bacterie, en een bacterie uit de lucht
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      bacterieLT(ctx, 560, 440, 300, { rot: -0.1, col: C.koraal, t });
      naamBij(ctx, 'de bacterie wordt resistent', 'niet jij', 560, 600, 1, 'center');
      for (let i = 0; i < 5; i++) { const w = wander(i + 3, t, 24, 0.5), f = q.on('lucht', 1); if (f < 0.01) continue;
        bacterieLT(ctx, 1240 + i * 110 + w.x, 400 + (i % 2) * 90 + w.y, 90, { a: f * 0.85, rot: 0.4 + i, col: C.text2, t }); }
      naamBij(ctx, 'een bacterie uit de lucht', 'groeit net zo hard', 1480, 620, q.on('lucht', 1), 'center');
      chip(ctx, 'eerst laten groeien', 560, 240, C.goud, q.on('groeien', 1), 28);
      ctx.restore(); }
    // deel 2: steriel werken aan de bank
    if (B > 0.01 && K < 0.99) { ctx.save(); ctx.globalAlpha *= B * (1 - K); werkbank(ctx, t);
      brander(ctx, 400, 790, 1.3, { t });
      naamBij(ctx, 'vlam', '', 400, 520, 1, 'center');
      const t0 = q.at('entoog', 1), H = clamp((t - t0 - 0.6) / 1.2, 0, 1) * (1 - clamp((t - t0 - 3.2) / 1.4, 0, 1));
      entoog(ctx, 700, 580, 1.8, { hitte: H, rot: -0.5 });
      naamBij(ctx, 'entoog', 'door de vlam', 700, 720, 1, 'center');
      chip(ctx, 'gloeiend heet', 700, 380, C.koraal, q.on('gloeiend', 1), 30);
      petrischaal(ctx, 1380, 600, 200, { a: q.on('plaat', 1),
        open: q.on('stukje', 1) * (1 - clamp((t - q.at('stukje', 1) - 2.6) / 1.2, 0, 1)) });
      naamBij(ctx, 'de kweekplaat', 'maar even open', 1380, 840, q.on('plaat', 1), 'center');
      ctx.restore(); }
    // deel 3: veiligheidskabinet
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K;
      veiligheidskabinet(ctx, 820, 500, 640, 520, { t, stroom: q.on('stroomt', 1), filterHl: q.on('filter', 1) });
      persoonK(ctx, 'yasmin', 1560, 790, 420, { t, uit: 'neutraal', pose: 'wijs', kijk: -1, outfit: 'practicum' });
      naamBij(ctx, 'veiligheidskabinet', 'voor gevaarlijker werk', 470, 330, 1, 'right');
      naamBij(ctx, 'filter', '', 1162, 310, q.on('filter', 1), 'left');
      chip(ctx, 'de lucht stroomt naar binnen', 1560, 300, C.teal, q.on('binnen', 1), 26); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    petrischaal(ctx, 620, 480, 210, { leeg: 1 });
    naamBij(ctx, 'de kweekplaat', 'urine van Opa Henk', 620, 740, 1, 'center');
    const E = q.on('extra', 1, 0.5);
    petrischaal(ctx, 1280, 480, 210, { a: E, leeg: 1, open: q.on('opent', 1) * (1 - clamp((t - q.at('opent', 1) - 1.6) / 1, 0, 1)) });
    naamBij(ctx, 'extra plaat', 'alleen open en dicht', 1280, 740, E, 'center');
    vraagteken(ctx, 1280, 215, q.on('denk', 1), 100); },

  // ---------- H2 kolonies en tellen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: dan kan er overal iets op gevallen zijn');
    petrischaal(ctx, 460, 460, 190, { leeg: 1 });
    naamBij(ctx, 'negatieve controle', 'blijft leeg', 460, 700, q.on('negatieve', 1), 'center');
    vink_(ctx, 460, 300, 26, q.on('schoon', 1));
    petrischaal(ctx, 1020, 460, 190, { kolonies: 26, groei: q.on('groeit', 1), seed: 19 });
    naamBij(ctx, 'positieve controle', 'moet groeien', 1020, 700, q.on('positieve', 1), 'center');
    vink_(ctx, 1020, 300, 26, q.on('positieve', 1));
    const G = q.on('Groeit', 2);
    petrischaal(ctx, 1560, 460, 190, { a: G, leeg: 1 });
    kruis(ctx, 1560, 300, 26, G);
    chip(ctx, 'dan: iets met de agar of de warmtekast', 1560, 760, C.koraal, q.on('warmtekast', 1), 26); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    petrischaal(ctx, 340, 430, 190, {});
    naamBij(ctx, 'agar', 'vaste voedingsbodem', 340, 680, 1, 'center');
    warmtekast(ctx, 800, 430, 290, 390, { a: q.on('nacht', 1), graden: '37 °C', hl: q.on('zevenendertig', 1) });
    naamBij(ctx, 'warmtekast', 'ongeveer 37 graden', 800, 680, q.on('nacht', 1), 'center');
    // van één cel naar een kolonie, binnen een uitvergroting
    const D = q.on('deelt', 1), tt = clamp((t - q.at('deelt', 1)) / 6, 0, 1);
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D;
      circ(ctx, 1480, 430, 230, rgba(C.fill, 0.5), rgba(C.line, 0.6), 2);
      const n = Math.max(1, Math.round(Math.pow(2, tt * 8)));
      if (n <= 8) { for (let i = 0; i < n; i++) { const an = i / Math.max(1, n) * 6.283 + 0.4, rr = n > 1 ? 46 : 0;
          bacterieLT(ctx, 1480 + Math.cos(an) * rr, 430 + Math.sin(an) * rr, 110, { rot: an, col: C.teal, t }); } }
      else { const R = 70 + 110 * ease((tt - 0.3) / 0.7);
        circ(ctx, 1480, 430, R, rgba('#DED6BE', 0.95), rgba('#B9B09A', 0.9), 2);
        puntenInCirkel('kolgroei', 300, 1, 41).forEach(([px, py], i) => circ(ctx, 1480 + px * (R - 8), 430 + py * (R - 8), 3.4, rgba(KL_KOLONIE, 0.9))); }
      metaA(ctx, 'UITVERGROOT · ELKE 30 MINUTEN EEN DELING', 1480, 170, 1, C.grain, 'center', 22);
      naamBij(ctx, n <= 8 ? (n + (n > 1 ? ' cellen' : ' cel')) : 'honderden miljoenen cellen', '', 1480, 700, 1, 'center');
      ctx.restore(); }
    naamBij(ctx, 'kolonie', 'een stipje van 1 millimeter', 1480, 790, q.on('kolonie', 1), 'center');
    chip(ctx, 'gegroeid uit één cel (of een klompje)', 1480, 860, C.goud, q.on('cel.', 1), 28); },

  s09(ctx, t, q) { bg(ctx, 'schema');
    const V = q.on('verdunt', 1, 0.5), Pl = q.on('dag', 1);
    monsterPotje(ctx, 250, 420, 1.1, { a: 1 - V * 0.4 });
    naamBij(ctx, 'monster', '', 250, 490, 1 - V * 0.4, 'center');
    verdunningsreeks(ctx, 470, 430, 6, { a: V, dx: 150, stap: clamp((t - q.at('tiende', 1)) * 1.3, 0, 6), t,
      pipet: q.on('milliliter', 1) > 0.5 ? 4 : -1 });
    naamBij(ctx, 'verdunningsreeks', 'elke keer 1 op 10', 850, 560, q.on('verdunningsreeks', 1), 'center');
    metaA(ctx, '0,1 milliliter per plaat', 470, 650, q.on('milliliter', 1), C.goud, 'left', 22);
    // drie platen met de telling
    const mm = [[1250, 680], [1500, 68], [1750, 7]];
    mm.forEach(([px, n], i) => { const f = clamp((t - q.at('zeshonderdtachtig', 1)) * 1.4 - i * 0.5, 0, 1) * Pl;
      if (f < 0.01) return; petrischaal(ctx, px, 700, 108, { a: f, kolonies: Math.min(n, 300), groei: 1, seed: 5 + i * 11 });
      regel(ctx, String(n), px, 576, f, C.text, 38, 'center', 800);
      regel(ctx, ['10 000', '100 000', '1 miljoen'][i] + ' × verdund', px, 848, f, C.text2, 19, 'center', 600); });
    vraagteken(ctx, 1500, 280, q.on('denk', 1), 100); },

  // ---------- H3 antibiogram ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: de plaat met 68 kolonies');
    const mm = [[400, 680], [800, 68], [1200, 7]];
    mm.forEach(([px, n], i) => { petrischaal(ctx, px, 420, 155, { kolonies: Math.min(n, 300), groei: 1, seed: 5 + i * 11,
        omlijst: i === 1 ? q.on('telbaar', 1) : 0 });
      regel(ctx, String(n), px, 230, 1, i === 1 ? C.groen : C.text2, 38, 'center', 800); });
    chip(ctx, 'te veel: je telt te laag', 400, 650, C.koraal, q.on('laag', 1), 24);
    chip(ctx, 'telbaar: 30 tot 300', 800, 650, C.groen, q.on('telbaar', 1), 24);
    chip(ctx, 'te weinig: toeval', 1200, 650, C.koraal, q.on('toeval', 1), 24);
    const R = q.on('Achtenzestig', 1, 0.6);
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R;
      regel(ctx, '68 ÷ 0,1 ml × 100 000 (verdunning)', 800, 780, 1, C.text, 34, 'center', 600);
      regel(ctx, '≈ 70 miljoen per milliliter', 800, 840, q.on('miljoen', 1), C.goud, 42, 'center', 800);
      ctx.restore(); }
    tag(ctx, 'grens blaasontsteking:', 1600, 380, C.teal, q.on('grens', 1), 'center', 28);
    regel(ctx, '100 000 per milliliter', 1600, 460, q.on('grens', 1), C.text, 34, 'center', 700); },

  s12(ctx, t, q) { bg(ctx, 'schema');
    const ZONES = [{ an: -2.2, mm: 24, nm: 'middel 1' }, { an: -0.5, mm: 9, nm: 'middel 2' },
                   { an: 1.1, mm: 21, nm: 'middel 3' }, { an: 2.6, mm: 17, nm: 'middel 4' }];
    const B = q.on('breekpunt', 1, 0.7);
    antibiogramPlaat(ctx, 520, 470, 270, ZONES, { groei: q.on('schijfjes', 1), toonMm: q.on('remzone', 1),
      meet: q.on('negen', 1) > 0.5 ? 1 : (q.on('vierentwintig', 1) > 0.5 ? 0 : -1) });
    naamBij(ctx, 'antibiogram', 'één plaat, vier middelen', 520, 810, q.on('antibiogram', 1), 'center');
    chip(ctx, 'remzone: hier groeit niets', 520, 150, C.teal, q.on('remzone', 1), 26);
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      breekpuntAs(ctx, 1080, 420, 700, { grens: 19, tussen: 2, punten: [
        { v: 24, nm: '24 mm', a: q.on('vierentwintig', 1) }, { v: 9, nm: '9 mm', a: q.on('negen', 1) }] });
      ctx.restore(); }
    metaA(ctx, 'ZONE GEMETEN MET EEN LINIAAL', 1080, 250, q.on('liniaal', 1) * B, C.grain, 'left', 22); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    micReeks(ctx, 300, 560, MIC_CONC, MIC_WAARDE, { toon: Math.max(2 / MIC_CONC.length, clamp((t - 0.2) / 2.2, 0, 1)) });
    metaA(ctx, 'ELKE STAP TWEE KEER ZO VEEL', 300, 250, q.on('verdubbelt', 1), C.grain, 'left', 24);
    chip(ctx, 'troebel: de bacterie groeit', 560, 760, C.grain, q.on('troebel', 1), 26);
    chip(ctx, 'helder: geen groei', 1340, 760, C.teal, q.on('helder', 1), 26);
    regel(ctx, 'MIC = ?', 1640, 300, q.on('MIC', 1), C.goud, 48, 'center', 800);
    vraagteken(ctx, 1640, 430, q.on('denk', 1), 100); },

  // ---------- H4 hoe resistentie ontstaat ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: 0,5, het eerste buisje zonder groei');
    micReeks(ctx, 300, 500, MIC_CONC, MIC_WAARDE, { toon: 1, hlMic: 1, bh: 130 });
    regel(ctx, 'MIC = 0,5 milligram per liter', 670, 680, q.on('MIC', 1), C.goud, 38, 'center', 800);
    regel(ctx, 'MIC: de laagste concentratie zonder zichtbare groei', 670, 740, 1, C.text2, 28, 'center', 600);
    const B = q.on('breekpunt', 1, 0.6), xb = 300 + 3.5 * 124;   // tussen de buisjes 0,25 en 0,5
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xb, 555); ctx.lineTo(xb, 320); ctx.stroke();
      metaA(ctx, 'BREEKPUNT 0,25', xb, 296, 1, C.goud, 'center', 22);
      roundRect(ctx, 1210, 380, 580, 110, 12); shape(ctx, rgba(C.koraal, 0.18), C.koraal, 2.5);
      regel(ctx, 'MIC erboven: resistent', 1500, 450, 1, C.koraal, 38, 'center', 700);
      regel(ctx, 'groeit door bij een concentratie', 1500, 560, q.on('haalbaar', 1), C.text, 32, 'center', 600);
      regel(ctx, 'die in het lichaam haalbaar is', 1500, 610, q.on('haalbaar', 1), C.text, 32, 'center', 600);
      ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema');
    const W = q.on('miljard', 1), P = q.on('zeven', 1);
    // eerst de plaat met antibioticum (nog leeg); de gewone plaat is alleen een 'zou zo worden', met een gestippelde rand
    const A = q.on('antibioticum', 1, 0.5), G = q.on('gewone', 1, 0.5);
    petrischaal(ctx, 560, 460, 250, { a: G * 0.8, waas: G, seed: 23 });
    if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; ctx.setLineDash([18, 14]); circ(ctx, 560, 460, 268, null, C.text2, 3); ctx.restore(); }
    naamBij(ctx, 'gewone plaat', 'zou een dichte waas worden', 560, 790, G, 'center');
    petrischaal(ctx, 1360, 460, 250, { a: 1, kolonies: 7, groei: clamp((t - q.at('zeven', 1)) / 1.6, 0, 1), seed: 71 });
    naamBij(ctx, 'plaat met antibioticum', P > 0.5 ? 'zeven kolonies' : 'een miljard cellen erop', 1360, 790, A, 'center');
    metaA(ctx, 'EEN MILJARD CELLEN UITGEPLAAT', 960, 190, W, C.grain, 'center', 24);
    vraagteken(ctx, 960, 480, q.on('denk', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: die zeven hadden de verandering al');
    const S = q.on('Ligt', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S;
      // af en toe een kopieerfout: een rij delende bacteriën, één met een veranderd gen
      for (let i = 0; i < 7; i++) { const mut = i === 4 ? q.on('verandert', 1) : 0;
        bacterieLT(ctx, 330 + i * 200, 420, 150, { rot: (i % 2 ? 0.1 : -0.1), col: mut > 0.5 ? C.goud : C.teal, t, mutatie: mut, hlGen: mut }); }
      metaA(ctx, 'AF EN TOE EEN KOPIEERFOUT BIJ EEN DELING', 330, 250, q.on('kopieerfout', 1) * (1 - clamp(S * 3, 0, 1)), C.grain, 'left', 24);
      chip(ctx, '± 1 op de 1000 delingen', 1330, 270, C.text2, q.on('duizend', 1), 24);
      chip(ctx, 'toeval: de meeste helpen niets', 700, 620, C.text2, q.on('toeval', 1), 26);
      chip(ctx, 'het middel grijpt niet meer aan', 1330, 620, C.goud, q.on('aangrijpt', 1), 26);
      regel(ctx, 'ongeveer 1 op de 100 miljoen cellen', 960, 740, q.on('honderd', 1), C.text, 36, 'center', 700);
      ctx.restore(); }
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S;
      // het middel erbij: alle andere groeien niet uit, de mutant blijft over en deelt verder
      const D = clamp((t - q.at('andere', 1)) / 1.8, 0, 1);
      const deel = clamp((t - q.at('overlevers', 1)) / 2.4, 0, 1);  // de overlevers delen verder
      for (let i = 0; i < 7; i++) { if (i === 4) continue;
        bacterieLT(ctx, 330 + i * 200, 400, 150, { rot: (i % 2 ? 0.1 : -0.1), col: C.teal, t, dood: D }); }
      // de mutant, die aan het eind deelt: de nakomelingen schuiven naar lege plekken boven en onder de rij
      const PLEK = [[0, 0], [-100, -96], [100, 96], [100, -96]];
      const n = deel > 0.01 ? Math.min(4, 1 + Math.floor(deel * 4)) : 1;
      for (let k = 0; k < n; k++) { const u = ease(clamp(deel * 4 - k, 0, 1));
        bacterieLT(ctx, 1130 + PLEK[k][0] * u, 400 + PLEK[k][1] * u, 150,
          { rot: 0.1 * (k % 2 ? 1 : -1), col: C.goud, t, mutatie: 1, hlGen: 1 }); }
      chip(ctx, 'antibioticum erbij', 330, 230, C.koraal, clamp((S - 0.5) * 2, 0, 1), 26);
      regel(ctx, 'het middel maakte de mutatie niet: die was er al', 960, 640, q.on('gemaakt', 1), C.text, 40, 'center', 700);
      metaA(ctx, 'aangetoond door Luria en Delbrück (1943)', 960, 586, q.on('aangetoond', 1), C.grain, 'center', 20);
      regel(ctx, 'het kiest alleen uit', 960, 708, q.on('kiest', 1), C.goud, 40, 'center', 800);
      chip(ctx, 'de cel verandert niet erfelijk', 560, 800, C.text2, q.on('erfelijk', 1), 26);
      chip(ctx, 'de populatie verandert', 1380, 800, C.groen, q.on('populatie', 1), 26);
      ctx.restore(); } },

  // ---------- H5 plasmiden ----------
  s19(ctx, t, q) { bg(ctx, 'schema');
    bacterieLT(ctx, 540, 450, 320, { rot: 0, col: C.teal, t, plasmide: 1 });
    bacterieLT(ctx, 1400, 450, 320, { rot: 0, col: C.paars, t,
      plasmide: clamp((t - q.at('over', 1) - 1.4) / 0.8, 0, 1) });
    naamBij(ctx, 'E. coli', '', 540, 640, 1, 'center');
    naamBij(ctx, 'Klebsiella', 'andere soort', 1400, 640, q.on('andere', 1), 'center');
    metaA(ctx, 'GROOT DNA-MOLECUUL + KLEINE RINGETJES', 540, 200, q.on('ringetjes', 1), C.grain, 'center', 22);
    naamBij(ctx, 'plasmide', 'met resistentiegen', 660, 320, q.on('resistentiegen', 1), 'left');
    // pilus en de kopie die overgaat
    const P = q.on('pilus', 1);
    if (P > 0.01) { pilus(ctx, [700, 450], [1240, 450], { a: P, groei: clamp((t - q.at('pilus', 1)) / 1.2, 0, 1) });
      naamBij(ctx, 'pilus', '', 970, 400, P, 'center');
      const K = clamp((t - q.at('over', 1)) / 1.6, 0, 1);
      if (K > 0.01 && K < 1) plasmideRing(ctx, 700 + 540 * K, 450, 28, { a: 1 });
      if (K >= 1) chip(ctx, 'de kopie is overgegaan', 970, 290, C.groen, 1, 26); }
    regel(ctx, 'conjugatie', 970, 760, q.on('conjugatie', 1), C.goud, 44, 'center', 800);
    chip(ctx, 'haar eigen plasmide houdt ze', 400, 830, C.teal, q.on('houdt', 1), 24);
    chip(ctx, 'werkt ook tussen soorten', 1500, 830, C.paars, q.on('soorten', 1), 24); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); werkbank(ctx, t);
    const y = persoon(ctx, 'yasmin', 340, 790, 420, { t, uit: 'blij', pose: 'vasthouden', kijk: 1, outfit: 'practicum' });
    if (y.handR) telefoontje(ctx, y.handR.x, y.handR.y - 20, 1, { t, a: q.on('belt', 1) });
    naamBij(ctx, 'Yasmin', 'analist', 340, 300, 1, 'center');
    const KA = q.on('Kim', 1, 0.3);
    const k = persoonK(ctx, 'kim', 1620, 790, 420, { t, a: KA, uit: 'blij', pose: 'vasthouden', kijk: -1, outfit: 'lab' });
    if (k && k.handR) telefoontje(ctx, k.handR.x, k.handR.y - 20, 1, { t, a: KA });
    naamBij(ctx, 'Dr. Kim', 'arts', 1620, 300, KA, 'center');
    // het antibiogram als kaartje tussen hen in (zelfde zones als in s12: middel 2 = 9 mm, middel 1 en 3 ruim boven het breekpunt)
    roundRect(ctx, 630, 200, 520, 280, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 2);
    metaText(ctx, 'antibiogram Opa Henk', 660, 242, C.grain, 'left', 20);
    regel(ctx, 'middel 2: resistent', 660, 300, q.on('resistent', 1), C.koraal, 30, 'left', 700);
    metaA(ctx, 'het middel van de eerste kuur', 660, 334, q.on('eerste', 1), C.text2, 'left', 16);
    regel(ctx, 'middel 1: MIC onder breekpunt', 660, 400, q.on('andere', 1), C.groen, 26, 'left', 700);
    regel(ctx, 'middel 3: MIC onder breekpunt', 660, 450, q.on('andere', 1), C.groen, 26, 'left', 700);
    petrischaal(ctx, 760, 640, 105, { kolonies: 7, groei: 1, seed: 71, a: q.on('kolonies', 1) });
    chip(ctx, 'toeval + selectie', 760, 800, C.goud, q.on('selectie', 1), 26);
    persoonK(ctx, 'henk', 1230, 790, 390, { t, a: q.on('beter', 1), uit: 'blij', kijk: -1 });
    naamBij(ctx, 'Opa Henk', 'weer beter', 1230, 350, q.on('beter', 1), 'center'); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 300, 790, 400, { t, uit: 'blij', pose: 'wijs', kijk: 1, outfit: 'practicum' });
    tag(ctx, 'mbo · biologisch-medisch analist', 1060, 280, C.teal, q.on('analist', 1), 'center', 34);
    regel(ctx, 'niveau 4 · drie tot vier jaar', 1060, 350, q.on('niveau', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'hbo · Biologie en Medisch Laboratoriumonderzoek', 1060, 470, C.teal, q.on('hbo', 1), 'center', 32);
    regel(ctx, 'vier jaar', 1060, 540, q.on('hbo', 1), C.text2, 30, 'center', 600);
    const W = q.on('ziekenhuislab', 1);
    ['ziekenhuislab', 'onderzoeksinstituut (RIVM)', 'voedsel- en milieulab'].forEach((s2, i) =>
      chip(ctx, s2, 700 + i * 400, 700, [C.goud, C.groen, C.oker][i], clamp(W * 1.4 - i * 0.35, 0, 1), 26)); }
});
