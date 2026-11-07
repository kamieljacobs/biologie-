
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
// decor (ElevenLabs gpt-image-2.5-sunburst, stijlreferentie 'Kas binnen' uit Meer oogst, flow cMT4epIEjMJi0sraRQzk, generatie zUgEyTQ7AD8D3WOIcvxl, ±433 credits)
const DECOR_SRC = {
 moestuin: "data:image/webp;base64,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"
};
// Wat word jij? · Landbouw 1 · Meer oogst — eigen tekeningen (24 okt 2026)

// ---------- decor (ElevenLabs, alleen onder scènes die echt op die plek spelen; ±60 % over navy) ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6, dy = 0, grond = null) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, -dy, W, H); if (dy > 0 && grond) { ctx.fillStyle = grond; ctx.fillRect(0, H - dy - 2, W, dy + 2); } ctx.restore(); }

// ---------- kleine moleculen ----------
function co2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 22 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 22 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x, y, 15 * s, '#5A6170', '#9AA3B2', 2); ctx.restore(); }
function o2(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - 11 * s, y, 13 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 11 * s, y, 13 * s, '#D8573F', '#F08A70', 2); ctx.restore(); }
function h2o(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 14 * s, '#D8573F', '#F08A70', 2); circ(ctx, x - 16 * s, y + 10 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5); circ(ctx, x + 16 * s, y + 10 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5); ctx.restore(); }
// suiker als zeshoekige ring
function suiker(ctx, x, y, s = 1, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + 0.52; const px = x + Math.cos(an) * 16 * s, py = y + Math.sin(an) * 16 * s; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 3 * s); ctx.restore(); }

// ---------- tomatenplant (vooraanzicht): stengel, bladeren, trossen; rijp 0..1 per tros; blad = aantal bladparen ----------
function tomatenplant(ctx, x, y, h, t = 0, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const blad = o.blad == null ? 6 : o.blad, trossen = o.trossen || [0.9, 0.5, 0.1], wieg = Math.sin(t * 0.8 + x * 0.01) * 4, hl = o.hl || {};
  ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.018; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + wieg, y - h * 0.5, x + wieg * 1.5, y - h); ctx.stroke();
  for (let i = 0; i < blad; i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06);
    ctx.save(); ctx.globalAlpha *= hl.blad ? 1 : 1; ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.008; ctx.beginPath(); ctx.moveTo(x + wieg * f, yy); ctx.quadraticCurveTo(x + z * ln * 0.5, yy - ln * 0.35, x + z * ln, yy - ln * 0.1); ctx.stroke();
    for (let k = 0; k < 3; k++) { const u = 0.45 + k * 0.25, lx = x + z * ln * u, ly = yy - ln * 0.32 * Math.sin(u * 3) - ln * 0.05; ctx.beginPath(); ctx.ellipse(lx, ly, ln * 0.17, ln * 0.09, z * (0.5 - k * 0.3), 0, 6.283); shape(ctx, hl.blad ? rgba(C.groen, 0.9) : '#4E7E52', hl.blad ? C.goud : null, hl.blad ? 3 : 1.5); } ctx.restore(); }
  trossen.forEach((r, j) => { const yy = y - h * (0.32 + j * 0.2), z = j % 2 ? 1 : -1, n = o.vrucht == null ? 5 : o.vrucht;
    ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = h * 0.006; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + z * h * 0.08, yy + h * 0.02, x + z * h * 0.11, yy + h * 0.08); ctx.stroke();
    if (r < 0) { for (let k = 0; k < 4; k++) bloem(ctx, x + z * h * (0.08 + (k % 2) * 0.05), yy + h * (0.07 + k * 0.035), h * 0.0012); return; }
    for (let k = 0; k < n; k++) { const tx = x + z * h * (0.08 + (k % 2) * 0.05), ty = yy + h * (0.07 + k * 0.035), rr = h * 0.03 * (o.klein || 1), rp = clamp(r - k * 0.08, 0, 1);
      const col = rp > 0.66 ? '#D8573F' : rp > 0.33 ? '#E0904A' : '#7FAE6A'; circ(ctx, tx, ty, rr, col, hl.vrucht ? C.goud : null, hl.vrucht ? 3 : 1); } });
  ctx.restore(); }

// rij planten aan één kant (in perspectief naar achteren), voor kasscènes zonder decor-planten op de voorgrond
function plantRij(ctx, x0, y0, n, h0, dx, t, a = 1) { for (let i = n - 1; i >= 0; i--) tomatenplant(ctx, x0 + i * dx, y0 - i * 14, h0 * (1 - i * 0.12), t, { a, blad: 5, trossen: [0.8, 0.4] }); }

// CO₂-buisje langs de plantenrij, met wolkjes CO₂ die eruit komen (aan 0..1)
function co2Buis(ctx, x1, x2, y, aan = 0, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y - 3); ctx.lineTo(x2, y - 3); ctx.stroke();
  if (aan > 0.01) for (let i = 0; i < 9; i++) { const ph = (t * 0.35 + i / 9) % 1, px = x1 + (i + 0.5) / 9 * (x2 - x1) + Math.sin(t + i) * 10, py = y - 20 - ph * 220; co2(ctx, px, py, 0.7, aan * Math.sin(ph * 3.14)); }
  ctx.restore(); }

// meter met getal (ppm)
function ppmMeter(ctx, x, y, waarde, label, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 70, 260, 140, 18); shape(ctx, '#121A26', col, 3);
  text(ctx, String(Math.round(waarde)), x, y + 18, fTekst(64, 800), C.text, 'center'); metaText(ctx, 'deeltjes per miljoen', x, y + 52, C.text2, 'center', 16); regel(ctx, label, x, y - 88, 1, col, 30, 'center', 700); ctx.restore(); }

// ton met duigen; hoogtes 0..1, labels boven elke duig; water tot de laagste duig en daar over de rand naar voren
function ton(ctx, x, y, w, h, hoog, labels, a = 1, water = 1, t = 0, hlIdx = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = hoog.length, dw = w / n, laag = Math.min(...hoog), li = hoog.indexOf(laag);
  for (let i = 0; i < n; i++) { const dh = h * hoog[i], col = i === hlIdx ? C.koraal : '#8C5A3A'; roundRect(ctx, x + i * dw + 3, y - dh, dw - 6, dh, 6); shape(ctx, col, '#5A3A26', 2); }
  if (water > 0.01) { const wy = y - h * laag * water; ctx.fillStyle = rgba('#5BA4E8', 0.5); ctx.fillRect(x + 6, wy, w - 12, y - wy); ctx.strokeStyle = '#9FD0F5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 6, wy); ctx.lineTo(x + w - 6, wy); ctx.stroke();
    if (water > 0.95) { const sx = x + li * dw + 10, sw = dw - 20; ctx.fillStyle = rgba('#9FD0F5', 0.85); ctx.beginPath(); ctx.moveTo(sx, wy); ctx.lineTo(sx + sw, wy); ctx.quadraticCurveTo(sx + sw + 10, wy + 30, sx + sw - 4, y + 50); ctx.lineTo(sx + 4, y + 50); ctx.quadraticCurveTo(sx - 10, wy + 30, sx, wy); ctx.fill();
      for (let k = 0; k < 6; k++) { const ph = (t * 1.5 + k / 6) % 1; circ(ctx, sx + sw * (k + 0.5) / 6, wy + ph * (y + 50 - wy), 5, rgba('#FFFFFF', 0.7)); }
      ctx.fillStyle = rgba('#5BA4E8', 0.55); ctx.beginPath(); ctx.ellipse(sx + sw / 2, y + 58, sw * 0.9, 14, 0, 0, 6.283); ctx.fill(); } }
  ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = 10; [0.25, 0.7].forEach(f => { ctx.beginPath(); ctx.moveTo(x - 4, y - h * f * laag); ctx.lineTo(x + w + 4, y - h * f * laag); ctx.stroke(); });
  for (let i = 0; i < n; i++) if (labels[i]) text(ctx, labels[i], x + (i + 0.5) * dw, y - h * hoog[i] - 16, fTekst(i === hlIdx ? 28 : 24, 800), i === hlIdx ? C.koraal : C.text, 'center');
  ctx.restore(); }

// blad met in- en uitgaande pijlen (licht, CO₂, water in; suiker en zuurstof uit)
function blad(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(-60, -150, 200, 0); ctx.quadraticCurveTo(-60, 150, -200, 0); shape(ctx, rgba(C.chloro, 0.85), hl ? C.goud : '#7FC48F', hl ? 5 : 3);
  ctx.strokeStyle = '#3E7A4A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(200, 0); for (let i = -3; i <= 3; i++) { ctx.moveTo(i * 45, 0); ctx.lineTo(i * 45 + 50, i % 2 ? -60 : 60); } ctx.stroke(); ctx.restore(); }

// rubisco: kluwen-enzym met een holte; pakt = 'co2' | 'o2' | null; u 0..1 = molecuul vliegt in
function rubisco(ctx, x, y, s, a = 1, pakt = null, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // keten als kralen opgevouwen tot kluwen
  ctx.strokeStyle = rgba(C.enzym, 0.9); ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= 60; i++) { const f = i / 60, an = f * 6.283 * 2.3 + 0.4, r = 70 + 40 * Math.sin(f * 17) + 18 * Math.sin(f * 41); const px = Math.cos(an) * r, py = Math.sin(an) * r * 0.85; if (Math.abs(Math.atan2(py, px) + 1.57) < 0.42 && r > 80) { ctx.moveTo(px, py); continue; } i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 8; ctx.stroke();
  // holte bovenaan
  ctx.beginPath(); ctx.arc(0, -78, 34, 0, Math.PI); ctx.fillStyle = '#121A26'; ctx.fill();
  if (pakt) { const py = -78 - (1 - u) * 260 + Math.sin(t * 3) * 3 * (1 - u), px = (1 - u) * 160; if (pakt === 'co2') co2(ctx, px, py, 1.1); else o2(ctx, px, py, 1.1); }
  ctx.restore(); }

// grafiek fotosynthese tegen CO₂ bij weinig en veel licht; d = hoe ver de lijnen getekend zijn
function grafiekCO2(ctx, x, y, w, h, a = 1, d1 = 1, d2 = 1, mark = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'CO₂ in de lucht', 'fotosynthese');
  const curve = (max, k, d, col, lab) => { if (d <= 0.01) return; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60 * d; i++) { const f = i / 60, px = x + f * w, py = y + h - h * max * (1 - Math.exp(-f * k)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); if (d > 0.95) regel(ctx, lab, x + w + 16, y + h - h * max * (1 - Math.exp(-k)) + 10, 1, col, 26, 'left', 700); };
  curve(0.9, 3.2, d1, C.goud, 'veel licht'); curve(0.3, 5, d2, C.teal, 'weinig licht');
  [[0.29, '400'], [0.58, '800'], [0.72, '1000']].forEach(([f, s2]) => text(ctx, s2, x + f * w, y + h + 30, fTekst(20, 600), C.text2, 'center'));
  if (mark >= 0) { const px = x + mark * w; ctx.setLineDash([8, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); }

// klimaatcomputer: vier schuifjes met waarden 0..1
function schuifjes(ctx, x, y, waarden, labels, a = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 560, 360, 20); shape(ctx, '#121A26', C.line, 2);
  const cols = [C.goud, C.koraal, C.grain, C.teal]; waarden.forEach((v, i) => { const sx = x + 80 + i * 130, sy = y + 60, sh = 220; roundRect(ctx, sx - 8, sy, 16, sh, 8); shape(ctx, '#2A3446', null);
    roundRect(ctx, sx - 8, sy + sh * (1 - v), 16, sh * v, 8); shape(ctx, rgba(cols[i], 0.6), null); roundRect(ctx, sx - 30, sy + sh * (1 - v) - 14, 60, 28, 10); shape(ctx, i === hl ? cols[i] : '#D4D8DE', cols[i], i === hl ? 4 : 2);
    if (i === hl) { ctx.save(); ctx.strokeStyle = cols[i]; ctx.lineWidth = 4; roundRect(ctx, sx - 52, sy - 20, 104, sh + 80, 16); ctx.stroke(); ctx.restore(); } text(ctx, labels[i], sx, y + 334, fTekst(i === hl ? 32 : 28, 800), i === hl ? cols[i] : C.text2, 'center'); }); ctx.restore(); }

// huidmondje (bovenaanzicht): twee sluitcellen; open 0..1; stroom CO₂ in, waterdamp uit
function huidmondje(ctx, x, y, s, open = 1, a = 1, t = 0, stroom = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -260, -170, 520, 340, 40); shape(ctx, rgba('#9CC79A', 0.25), rgba('#9CC79A', 0.6), 2);
  const g = 10 + 34 * open; [-1, 1].forEach(z => { ctx.beginPath(); ctx.ellipse(z * (g + 46), 0, 58, 130, 0, 0, 6.283); shape(ctx, '#5FA86E', '#3E7A4A', 4); for (let k = 0; k < 4; k++) circ(ctx, z * (g + 46) + (k % 2 ? 12 : -12), -60 + k * 40, 9, '#3E8A52'); });
  ctx.beginPath(); ctx.ellipse(0, 0, Math.max(2, g), 110 * (0.4 + 0.6 * open), 0, 0, 6.283); ctx.fillStyle = '#121A26'; ctx.fill();
  if (stroom * open > 0.05) for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; co2(ctx, -300 + ph * 300, -120 + i * 70, 0.6, stroom * open * Math.sin(ph * 3.14)); h2o(ctx, ph * 320, -100 + i * 60, 0.6, stroom * open * Math.sin(ph * 3.14)); }
  ctx.restore(); }

// grauwe schimmel: grijze pluisjes op een stengelstuk
function schimmel(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5E8F5A'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + 140); ctx.lineTo(x, y - 140); ctx.stroke();
  ctx.fillStyle = '#7A5A3A'; ctx.beginPath(); ctx.ellipse(x, y + 5, 16, 60, 0, 0, 6.283); ctx.fill();
  for (let i = 0; i < 26; i++) { const px = x - 30 + hash(i) * 60, py = y - 40 + hash(i + 50) * 90; ctx.strokeStyle = rgba('#B8BCC4', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + (hash(i + 9) - 0.5) * 30, py - 14 - hash(i + 3) * 18); ctx.stroke(); circ(ctx, px + (hash(i + 9) - 0.5) * 30, py - 14 - hash(i + 3) * 18, 4, '#C9CDD4'); }
  ctx.restore(); }

// kasdak met raam dat opengaat (open 0..1) en lampen
function kasDak(ctx, x, y, w, open = 0, lampen = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, y + 120); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w, y + 120); ctx.stroke(); ctx.fillStyle = rgba('#AFC0D0', 0.08); ctx.fill();
  ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(-0.6 * open); ctx.fillStyle = rgba('#AFC0D0', 0.25); ctx.fillRect(0, 0, w * 0.3, 14); ctx.strokeRect(0, 0, w * 0.3, 14); ctx.restore();
  for (let i = 0; i < 5; i++) { const lx = x + w * (0.15 + i * 0.175); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, y + 70); ctx.lineTo(lx, y + 120); ctx.stroke(); roundRect(ctx, lx - 22, y + 120, 44, 16, 6); shape(ctx, lampen > 0.5 ? '#F2C94C' : '#5A5E66', null); if (lampen > 0.5) { ctx.fillStyle = rgba('#F2C94C', 0.12 * lampen); ctx.beginPath(); ctx.moveTo(lx - 20, y + 136); ctx.lineTo(lx - 70, y + 330); ctx.lineTo(lx + 70, y + 330); ctx.lineTo(lx + 20, y + 136); ctx.fill(); } }
  ctx.restore(); }

// thermometer
function thermometer(ctx, x, y, h, v, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14, y - h, 28, h, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2); circ(ctx, x, y + 6, 26, col, '#9AA3B2', 2); roundRect(ctx, x - 6, y - h * v, 12, h * v, 6); shape(ctx, col, null); ctx.restore(); }

// bron-en-put-plant (schema): bladeren boven als bron, vruchten en kop als put; suikertjes van blad naar stengel en dan naar tros of kop
function bronPut(ctx, x, y, h, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = o.stroom == null ? 1 : o.stroom, blad = o.blad == null ? 6 : o.blad, tr = o.trossen || [0.2, 0.15];
  tomatenplant(ctx, x, y, h, t, { blad, trossen: tr, vrucht: o.vrucht, hl: o.hl });
  if (st > 0.01) { const L = [], T = [];
    for (let i = 0; i < blad; i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06); L.push([x + z * ln * 0.7, yy - ln * 0.2, yy]); }
    tr.forEach((r, j) => { const yy = y - h * (0.32 + j * 0.2), z = j % 2 ? 1 : -1; T.push([x + z * h * 0.1, yy + h * 0.12, yy]); });
    const doel = k => (k % 5 === 0 || T.length === 0) ? [x, y - h, y - h] : (k % 5 === 4 && T.length > 1 ? T[1] : T[0]);
    for (let k = 0; k < 14; k++) { const lf = L[k % L.length], d = doel(k), ph = (t * 0.22 + k / 14) % 1;
      const d1 = Math.abs(lf[0] - x), d2 = Math.abs(lf[2] - d[2]), d3 = Math.hypot(d[0] - x, d[1] - d[2]), tot = d1 + d2 + d3, s0 = ph * tot; let px, py;
      if (s0 < d1) { const u = s0 / d1; px = lerp(lf[0], x, u); py = lerp(lf[1], lf[2], u); } else if (s0 < d1 + d2) { const u = (s0 - d1) / d2; px = x; py = lerp(lf[2], d[2], u); } else { const u = (s0 - d1 - d2) / d3; px = lerp(x, d[0], u); py = lerp(d[2], d[1], u); }
      suiker(ctx, px, py, 0.8, st * Math.min(1, 3 * Math.sin(ph * 3.14))); } }
  ctx.restore(); }

// weegschaal: links (blad) en rechts (vrucht); kant -1..1 = welke kant zwaarder
function weegschaal(ctx, x, y, kant, a = 1, l = 'blad', r = 'vruchten') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = kant * 0.22;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(x - 60, y + 200); ctx.lineTo(x + 60, y + 200); ctx.lineTo(x, y); ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(260, 0); ctx.stroke(); ctx.restore();
  const ly = y - Math.sin(an) * 260, ry = y + Math.sin(an) * 260;
  [[-260, ly, l, C.groen], [260, ry, r, '#D8573F']].forEach(([dx, py, s2, col]) => { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + dx, py); ctx.lineTo(x + dx - 70, py + 90); ctx.moveTo(x + dx, py); ctx.lineTo(x + dx + 70, py + 90); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + dx, py + 92, 90, 20, 0, 0, 3.1416); shape(ctx, rgba(col, 0.5), col, 2); text(ctx, s2, x + dx, py + 150, fTekst(30, 700), col, 'center'); });
  ctx.restore(); }

// staafgrafiek opbrengst (kilo per vierkante meter)
function opbrengst(ctx, x, y, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sc = 8.5;
  [[u1 * 51, 'Nederlandse kas', C.groen, '51'], [u2 * 8.5, 'Spanje, gemiddeld', C.oker, '± 9']].forEach(([v, lab, col, s2], i) => { const bx = x + i * 260, bh = v * sc; roundRect(ctx, bx, y - bh, 170, bh, 10); shape(ctx, rgba(col, 0.55), col, 2);
    if (v > 1) text(ctx, s2, bx + 85, y - bh - 18, fTekst(40, 800), C.text, 'center'); if (v > 0.3) text(ctx, lab, bx + 85, y + 44, fTekst(26, 700), col, 'center'); });
  metaText(ctx, 'kilo tomaten per vierkante meter per jaar', x, y - 51 * sc - 90, C.text2, 'left', 20); ctx.restore(); }

// ethyleen (C₂H₄): twee C met dubbele binding en vier H; drijft van (x1,y1) naar (x2,y2)
function c2h4(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s;
  ctx.beginPath(); ctx.moveTo(x - 14 * s, y - 4 * s); ctx.lineTo(x + 14 * s, y - 4 * s); ctx.moveTo(x - 14 * s, y + 4 * s); ctx.lineTo(x + 14 * s, y + 4 * s); [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dx, dy]) => { ctx.moveTo(x + dx * 16 * s, y); ctx.lineTo(x + dx * 32 * s, y + dy * 20 * s); }); ctx.stroke();
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dx, dy]) => circ(ctx, x + dx * 32 * s, y + dy * 20 * s, 9 * s, '#E8E8E2', '#FFFFFF', 1.5)); circ(ctx, x - 16 * s, y, 13 * s, '#5A6170', '#9AA3B2', 2); circ(ctx, x + 16 * s, y, 13 * s, '#5A6170', '#9AA3B2', 2); ctx.restore(); }
function ethyleen(ctx, x1, y1, x2, y2, a = 1, t = 0) { if (a <= 0.01) return; for (let i = 0; i < 4; i++) { const ph = (t * 0.25 + i / 4) % 1; c2h4(ctx, lerp(x1, x2, ph) + Math.sin(t + i * 2) * 14, lerp(y1, y2, ph) + Math.cos(t * 1.3 + i) * 10, 0.8, a * Math.sin(ph * 3.14)); } }

// gasmotor (WKK): kast met drie pijlen eruit
function gasmotor(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 130, y - 100, 260, 200, 18); shape(ctx, '#3A4458', C.line, 2); circ(ctx, x - 50, y, 40, '#2A3446', C.line, 2); ctx.save(); ctx.translate(x - 50, y); ctx.rotate(t * 3); ctx.strokeStyle = C.text2; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.moveTo(0, -30); ctx.lineTo(0, 30); ctx.stroke(); ctx.restore();
  roundRect(ctx, x + 30, y - 160, 34, 70, 6); shape(ctx, '#5A6478', null);
  const pij = [[C.goud, 'stroom', -0.9], [C.koraal, 'warmte', 0], [C.grain, 'CO₂', 0.9]]; pij.forEach(([col, lab, dy], i) => { const f = clamp(u * 3 - i, 0, 1); if (f <= 0) return; pijl(ctx, x + 140, y + dy * 80, x + 140 + 200 * f, y + dy * 110, col, 1, 6, 20); if (f > 0.9) regel(ctx, lab, x + 360, y + dy * 110 + 10, 1, col, 30, 'left', 700); });
  ctx.restore(); }

// fabriek in de haven met een leiding naar de kas
function haven(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 120, y - 120, 240, 120); ctx.fillRect(x - 90, y - 220, 40, 100); ctx.fillRect(x + 30, y - 260, 40, 140);
  ctx.fillStyle = rgba(C.water, 0.5); ctx.fillRect(x - 200, y, 400, 30);
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 120, y - 40); ctx.lineTo(x + 120 + 520 * u, y - 40); ctx.stroke(); if (u > 0.05) for (let i = 0; i < 4; i++) { const ph = (t * 0.4 + i / 4) % 1; co2(ctx, x + 140 + ph * 500 * u, y - 40, 0.55); }
  ctx.restore(); }

// boorput naar warm water diep in de aarde
function boorput(ctx, x, y, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { ctx.fillStyle = ['#4A3A2E', '#5A4434', '#6B4A30', '#7A3E2E'][i]; ctx.fillRect(x - 220, y + i * 70, 440, 70); }
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y - 40); ctx.lineTo(x, y + 280 * u); ctx.stroke(); if (u > 0.9) { ctx.fillStyle = rgba(C.koraal, 0.5); ctx.beginPath(); ctx.ellipse(x, y + 290, 120, 26, 0, 0, 6.283); ctx.fill(); for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; circ(ctx, x + 2, y + 280 - ph * 320, 8, rgba(C.koraal, Math.sin(ph * 3.14))); } }
  ctx.restore(); }

// lamp: oude SON-T (gloeit warm) of led (strakke balk); warmte-golfjes
function lamp(ctx, x, y, soort, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (soort === 'son') { ctx.beginPath(); ctx.ellipse(x, y, 90, 40, 0, 0, Math.PI); shape(ctx, '#5A6478', C.line, 2); circ(ctx, x, y + 14, 22, '#F0A040'); for (let i = 0; i < 3; i++) { ctx.strokeStyle = rgba(C.koraal, 0.7); ctx.lineWidth = 4; ctx.beginPath(); const yy = y + 70 + i * 30 + Math.sin(t * 3 + i) * 3; ctx.moveTo(x - 60, yy); ctx.bezierCurveTo(x - 30, yy - 12, x + 30, yy + 12, x + 60, yy); ctx.stroke(); } }
  if (soort === 'son') { ctx.fillStyle = rgba('#F2C94C', 0.12); ctx.beginPath(); ctx.moveTo(x - 30, y + 30); ctx.lineTo(x - 70, y + 200); ctx.lineTo(x + 70, y + 200); ctx.lineTo(x + 30, y + 30); ctx.fill(); }
  else { ctx.fillStyle = rgba('#E8A0F0', 0.2); ctx.beginPath(); ctx.moveTo(x - 110, y + 14); ctx.lineTo(x - 200, y + 300); ctx.lineTo(x + 200, y + 300); ctx.lineTo(x + 110, y + 14); ctx.fill(); roundRect(ctx, x - 120, y - 12, 240, 24, 8); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 8; i++) circ(ctx, x - 100 + i * 28.5, y + 14, 7, i % 3 ? '#E86A9A' : '#7FA8F0'); }
  ctx.restore(); }

// regenwaterbassin met druppels en een terugloopleiding
function bassin(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 220, 50, 0, 0, 6.283); shape(ctx, rgba(C.water, 0.6), '#7FB6E8', 3);
  for (let i = 0; i < 10; i++) { const ph = (t * 0.8 + i / 10) % 1; circ(ctx, x - 180 + hash(i) * 360, y - 260 + ph * 240, 5, rgba('#7FB6E8', 0.8 * (1 - ph))); } ctx.restore(); }

// witte vlieg en sluipwesp (eenvoudig, herkenbaar)
function witteVlieg(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 30) * 0.2;
  ctx.fillStyle = '#F2F2EE'; [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.5 + fl)); ctx.beginPath(); ctx.ellipse(z * 18, -6, 22, 12, 0, 0, 6.283); ctx.fill(); ctx.restore(); }); ctx.beginPath(); ctx.ellipse(0, 0, 8, 18, 0, 0, 6.283); ctx.fillStyle = '#E0D890'; ctx.fill(); ctx.restore(); }
function sluipwesp(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 34) * 0.25;
  ctx.fillStyle = rgba('#CFE4F0', 0.6); [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.35 + fl)); ctx.beginPath(); ctx.ellipse(z * 14, -16, 26, 9, z * 0.3, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.fillStyle = '#2A2A2A'; circ(ctx, 0, -18, 8, '#2A2A2A'); ctx.beginPath(); ctx.ellipse(0, 0, 7, 12, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.ellipse(0, 22, 9, 16, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-3, -24); ctx.lineTo(-12, -40); ctx.moveTo(3, -24); ctx.lineTo(12, -40); ctx.stroke(); ctx.restore(); }
function hommel(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 28) * 0.3;
  ctx.fillStyle = rgba('#CFE4F0', 0.55); [-1, 1].forEach(z => { ctx.save(); ctx.rotate(z * (0.4 + fl)); ctx.beginPath(); ctx.ellipse(z * 20, -26, 26, 12, 0, 0, 6.283); ctx.fill(); ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 24, 0, 0, 6.283); ctx.fillStyle = '#2A2420'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-30, -10, 60, 10); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(18, -24, 14, 48); ctx.restore(); circ(ctx, -32, -2, 12, '#2A2420'); ctx.restore(); }
// gele tomatenbloem
function bloem(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 5; i++) { const an = i / 5 * 6.283; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * 22 * s, y + Math.sin(an) * 22 * s, 20 * s, 9 * s, an, 0, 6.283); ctx.fillStyle = '#F2C94C'; ctx.fill(); } circ(ctx, x, y, 10 * s, '#E0904A'); ctx.restore(); }

// recapkaartje
function kaartje(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 84, 14); shape(ctx, rgba(col, 0.18), col, 2); text(ctx, s2, x + w / 2, y + 54, fTekst(32, 700), C.text, 'center'); ctx.restore(); }

// plastic tunnel (Spanje): bogen met doorschijnend plastic
function tunnel(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x, y - h * 1.3, x + w, y - h * 1.3, x + w, y); ctx.closePath(); shape(ctx, rgba('#E8EEF2', 0.22), '#C9D2DA', 3);
  ctx.strokeStyle = rgba('#C9D2DA', 0.6); ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { const fx = x + w * i / 5; ctx.beginPath(); ctx.moveTo(fx, y); ctx.lineTo(fx, y - h * (1 - Math.pow(2 * i / 5 - 1, 2)) * 0.98); ctx.stroke(); }
  for (let i = 0; i < 4; i++) tomatenplant(ctx, x + w * (0.2 + i * 0.2), y, h * 0.6, 0, { blad: 3, trossen: [0.8] }); ctx.restore(); }
// vlammetje (aardgas)
function vlam(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s * (1 + 0.06 * Math.sin(t * 9)));
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(30, -20, 34, 10, 0, 24); ctx.bezierCurveTo(-34, 10, -30, -20, 0, -60); ctx.fillStyle = '#5BA4C9'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -24); ctx.bezierCurveTo(14, -4, 14, 10, 0, 18); ctx.bezierCurveTo(-14, 10, -14, -4, 0, -24); ctx.fillStyle = '#CFE4F0'; ctx.fill(); ctx.restore(); }
// blad van onderen met larven (schildjes) van de witte vlieg; geparasiteerd = donker
function larvenBlad(ctx, x, y, s, a = 1, para = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; blad(ctx, x, y, s, 1);
  for (let i = 0; i < 7; i++) { const px = x + (hash(i + 3) - 0.5) * 220 * s, py = y + (hash(i + 11) - 0.5) * 120 * s; const p = i < 3 ? para : 0; ctx.beginPath(); ctx.ellipse(px, py, 13 * s, 9 * s, 0.3, 0, 6.283); shape(ctx, p > 0.5 ? '#3A3428' : '#EDEAD0', '#B8B490', 1.5); } ctx.restore(); }
// ===== teken_lb2.js — Wat zit er in de bodem? (Landbouw 2) =====
// Nieuwe bibliotheekobjecten (eerst op het testvel, daarna naar bibliotheek/): zandkorrel, kleideeltje met lading,
// humusvlok, ion (kalium/ammonium/nitraat/fosfaat), jampot, trechter, plantenbak, regenworm, bodemprofiel,
// dood blad, schimmeldraden rond een wortel (mycorrhiza), kruimel, teststrookje, druppelbak.
// Kleuren (REEKS-landbouw.md): bodem oker-familie, water teal, plant groen, 'let op' koraal, focus goud.
// Bodemtinten (Macro-dag-palet C3 + okerfamilie): zand #C9A86A, klei #8A6A4A, humus #3A2E24, veen #4A3A2E.
const BODEM = { zand: '#C9A86A', zandR: '#E2C88E', klei: '#8A6A4A', kleiR: '#B08A5C', humus: '#3A2E24', humusR: '#6B5440', veen: '#4A3A2E', grond: '#5A4434', grondR: '#7A5E44', glas: '#AFC0D0', worm: '#C98A7A', wormR: '#E0A898', zadel: '#D9A08E', schimmel: '#C9C4B4', wortel: '#E6D8B8', wortelR: '#C9B48A' };

// --- zandkorrel: onregelmatig afgeronde korrel (kwarts), r in px; seed maakt elke korrel anders
function zandkorrel(ctx, x, y, r, seed = 1, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 11, pts = []; for (let i = 0; i < n; i++) { const an = i / n * 6.283 + hash(seed * 13 + i) * 0.3; const rr = r * (0.82 + 0.3 * hash(seed * 7 + i * 3)); pts.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.86]); }
  ctx.beginPath(); for (let i = 0; i <= n; i++) { const p = pts[i % n], q2 = pts[(i + 1) % n]; const mx = (p[0] + q2[0]) / 2, my = (p[1] + q2[1]) / 2; i ? ctx.quadraticCurveTo(p[0], p[1], mx, my) : ctx.moveTo(mx, my); } ctx.closePath();
  shape(ctx, o.fill || BODEM.zand, o.rand || BODEM.zandR, o.lw || 2);
  if (r > 30) { ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.ellipse(x - r * 0.3, y - r * 0.3, r * 0.28, r * 0.14, -0.6, 0, 6.283); ctx.fillStyle = '#F2E6C8'; ctx.fill(); }
  ctx.restore(); }

// --- kleideeltje: dun plaatje (zeshoekig schilfertje), schuin gezien; lading = aantal min-tekens op het oppervlak
function kleideeltje(ctx, x, y, w, ang = 0, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  const h = w * 0.34, d = w * 0.09; // dikte als zijkant
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 4, -h / 2); ctx.lineTo(w / 4, -h / 2); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 4, h / 2); ctx.lineTo(-w / 4, h / 2); ctx.closePath(); shape(ctx, o.fill || BODEM.klei, o.rand || BODEM.kleiR, 2);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, d); ctx.lineTo(-w / 4, h / 2 + d); ctx.lineTo(w / 4, h / 2 + d); ctx.lineTo(w / 2, d); ctx.lineTo(w / 2, 0); ctx.lineTo(w / 4, h / 2); ctx.lineTo(-w / 4, h / 2); ctx.closePath(); shape(ctx, '#6E5238', BODEM.kleiR, 1.5);
  const nl = o.lading == null ? 5 : o.lading; if (nl > 0 && (o.laA == null || o.laA > 0.01)) { ctx.globalAlpha *= (o.laA == null ? 1 : o.laA); for (let i = 0; i < nl; i++) { const u = (i + 0.5) / nl; const px = (u - 0.5) * w * 0.78, py = (i % 2 ? -1 : 1) * h * 0.12; ctx.strokeStyle = '#F2E6D8'; ctx.lineWidth = Math.max(2, w * 0.018); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - w * 0.03, py); ctx.lineTo(px + w * 0.03, py); ctx.stroke(); } }
  ctx.restore(); }

// --- humusvlok: donkere, onregelmatige, iets rafelige vlok (organische stof), negatief geladen
function humusVlok(ctx, x, y, r, seed = 3, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 14; ctx.beginPath();
  for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rr = r * (0.7 + 0.45 * hash(seed * 11 + (i % n) * 5)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, BODEM.humus, BODEM.humusR, 2);
  const nl = o.lading == null ? 3 : o.lading; for (let i = 0; i < nl; i++) { const an = i / nl * 6.283 + 0.4; const px = x + Math.cos(an) * r * 0.42, py = y + Math.sin(an) * r * 0.32; ctx.strokeStyle = '#E8DCCB'; ctx.lineWidth = Math.max(2, r * 0.05); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(px - r * 0.09, py); ctx.lineTo(px + r * 0.09, py); ctx.stroke(); }
  ctx.restore(); }

// --- ion: rond deeltje met symbool. soort: 'K' kalium, 'NH4' ammonium, 'NO3' nitraat, 'P' fosfaat.
// o.vast: 0 = opgelost (teal-rand), 1 = vast aan klei/humus (oker-rand). o.volg: gouden rand (het gevolgde deeltje, C8).
const IONEN = { K: { s: 'K', lad: '+', r: 1 }, NH4: { s: 'NH₄', lad: '+', r: 1.15 }, NO3: { s: 'NO₃', lad: '−', r: 1.2 }, P: { s: 'PO₄', lad: '−', r: 1.25 } };
function ion(ctx, x, y, soort, s = 1, a = 1, o = {}) { if (a <= 0.01) return; const I = IONEN[soort]; ctx.save(); ctx.globalAlpha *= a; const r = 26 * s * I.r, vast = o.vast || 0;
  const rand = vast > 0.5 ? C.oker : C.teal; circ(ctx, x, y, r, '#E8EEF2', rand, 4 * s);
  if (o.volg) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(x, y, r + 8 * s, 0, 6.283); ctx.stroke(); }
  text(ctx, I.s, x - (I.s.length > 1 ? 3 : 1) * s, y + 9 * s, fTekst(Math.round(24 * s * (I.s.length > 2 ? 0.85 : 1)), 700), '#121A26', 'center');
  { const lx = x + r * 0.95 + 10 * s, ly = y - r * 0.8; circ(ctx, lx, ly - 9 * s, 13 * s, I.lad === '+' ? '#F2C94C' : '#F2F2EE', '#121A26', 1.5); text(ctx, I.lad, lx, ly + 1 * s, fTekst(Math.round(28 * s), 900), '#121A26', 'center'); }
  ctx.restore(); }

// --- glazen pot (line drawing, C4 lab library). vul 0..1 = waterhoogte; inhoud(ctx, x0, y0, w, h) tekent wat erin zit
function jampot(ctx, x, y, w, h, a = 1, vul = 0.85, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x0 = x - w / 2, yb = y;
  ctx.save(); roundRect(ctx, x0, yb - h, w, h, 18); ctx.clip(); if (vul > 0) { ctx.fillStyle = rgba(C.teal, 0.22); ctx.fillRect(x0, yb - h * vul, w, h * vul); } if (inhoud) inhoud(ctx, x0, yb - h * vul, w, h * vul); ctx.restore();
  roundRect(ctx, x0, yb - h, w, h, 18); ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.stroke(); roundRect(ctx, x0 + 8, yb - h - 26, w - 16, 28, 6); shape(ctx, '#5A6478', BODEM.glas, 2); ctx.restore(); }

// --- trechter met filter en grond, druppels eronder in een beker. stroom 0..1 = hoeveel water erdoor komt (u = tijd)
function trechter(ctx, x, y, s, soort, a = 1, stroom = 0, u = 0, beker = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, -160); ctx.lineTo(120, -160); ctx.lineTo(16, -20); ctx.lineTo(16, 40); ctx.lineTo(-16, 40); ctx.lineTo(-16, -20); ctx.closePath(); ctx.save(); ctx.clip();
  ctx.fillStyle = soort === 'zand' ? BODEM.zand : BODEM.klei; ctx.fillRect(-120, -110, 240, 100); for (let i = 0; i < 40; i++) { const px = -100 + hash(i * 3 + (soort === 'zand' ? 1 : 7)) * 200, py = -104 + hash(i * 5 + 2) * 90; if (soort === 'zand') circ(ctx, px, py, 4 + 3 * hash(i), BODEM.zandR); else { ctx.fillStyle = BODEM.kleiR; ctx.fillRect(px, py, 9, 2.5); } }
  ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(-120, -160, 240, 50 * (1 - Math.min(1, u))); ctx.restore();
  ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-120, -160); ctx.lineTo(-16, -20); ctx.lineTo(-16, 40); ctx.moveTo(120, -160); ctx.lineTo(16, -20); ctx.lineTo(16, 40); ctx.stroke();
  for (let i = 0; i < 4; i++) { const ph = ((u * 3 + i / 4) % 1); if (stroom > 0.05 && hash(i * 9) < stroom + 0.15) { ctx.beginPath(); ctx.ellipse(0, 52 + ph * 120, 6, 9, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.85 * Math.sin(ph * 3.14)); ctx.fill(); } }
  if (beker > 0.01) { ctx.globalAlpha *= beker; const bh = 170; roundRect(ctx, -80, 190, 160, bh, 10); ctx.strokeStyle = BODEM.glas; ctx.lineWidth = 4; ctx.stroke(); const lv = bh * 0.85 * stroom * Math.min(1, u); if (lv > 1) { ctx.fillStyle = rgba(C.teal, 0.55); ctx.fillRect(-77, 190 + bh - 3 - lv, 154, lv); } }
  ctx.restore(); }

// --- plantenbak (houten bak) met grondsoort; plant = tomatenplant uit teken_lb1.js
function plantenbak(ctx, x, y, w, soort, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.42;
  ctx.fillStyle = soort === 'zand' ? BODEM.zand : BODEM.klei; ctx.fillRect(x - w / 2 + 10, y - h + 18, w - 20, 26); // grondoppervlak
  for (let i = 0; i < 26; i++) { const px = x - w / 2 + 20 + hash(i * 7 + (soort === 'zand' ? 3 : 9)) * (w - 40); if (soort === 'zand') circ(ctx, px, y - h + 26 + hash(i) * 10, 3 + 2 * hash(i * 2), BODEM.zandR); else { ctx.fillStyle = '#6E5238'; ctx.fillRect(px, y - h + 24 + hash(i) * 12, 14, 3); } }
  ctx.fillStyle = '#8C6A48'; ctx.fillRect(x - w / 2, y - h + 34, w, h - 34); ctx.strokeStyle = '#6A4E34'; ctx.lineWidth = 3; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h + 34 + i * (h - 34) / 3); ctx.lineTo(x + w / 2, y - h + 34 + i * (h - 34) / 3); ctx.stroke(); } ctx.strokeRect(x - w / 2, y - h + 34, w, h - 34);
  if (o.label) { roundRect(ctx, x - 90, y - h * 0.55, 180, 50, 8); shape(ctx, '#F2EAD8', '#B8A880', 2); text(ctx, o.label, x, y - h * 0.55 + 36, fTekst(30, 700), '#3A2E24', 'center'); }
  ctx.restore(); return y - h + 26; }

// --- regenworm (Lumbricus): één doorlopend lijf langs een pad, segmenten als lichte banden, zadel (clitellum) op ±1/3 vanaf de kop,
// kop iets spits, staart afgeplat. pts = middellijn van kop naar staart; dik = maximale dikte. Recept: lengte ±25–40× de dikte.
function regenworm(ctx, pts, dik, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const P = bioDicht(pts, 90), n = P.length;
  const breed = (u) => dik * (u < 0.06 ? 0.55 + u / 0.06 * 0.45 : u < 0.35 ? 1 : u > 0.9 ? 0.75 + (1 - u) / 0.1 * 0.15 : 1 - (u - 0.35) * 0.25);
  const L = [], R = []; for (let i = 0; i < n; i++) { const p = P[i], q2 = P[Math.min(n - 1, i + 1)], p0 = P[Math.max(0, i - 1)]; const dx = q2[0] - p0[0], dy = q2[1] - p0[1], ln = Math.hypot(dx, dy) || 1; const nx = -dy / ln, ny = dx / ln, b = breed(i / (n - 1)) / 2; L.push([p[0] + nx * b, p[1] + ny * b]); R.push([p[0] - nx * b, p[1] - ny * b]); }
  ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); for (const p of L) ctx.lineTo(p[0], p[1]); for (let i = n - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); shape(ctx, BODEM.worm, '#A86A5C', 2);
  // zadel
  const z0 = Math.floor(n * 0.27), z1 = Math.floor(n * 0.36); ctx.beginPath(); ctx.moveTo(L[z0][0], L[z0][1]); for (let i = z0; i <= z1; i++) ctx.lineTo(L[i][0], L[i][1]); for (let i = z1; i >= z0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); ctx.fillStyle = BODEM.zadel; ctx.fill();
  // segmentbanden
  ctx.strokeStyle = rgba('#F2D2C6', 0.55); ctx.lineWidth = Math.max(1, dik * 0.06); for (let i = 2; i < n - 1; i += 2) { if (i >= z0 && i <= z1) continue; ctx.beginPath(); ctx.moveTo(L[i][0], L[i][1]); ctx.lineTo(R[i][0], R[i][1]); ctx.stroke(); }
  // rugstreep (bloedvat schemert door): donkerder lijn op de rug
  ctx.strokeStyle = rgba('#9A4E46', 0.45); ctx.lineWidth = Math.max(1.5, dik * 0.12); ctx.beginPath(); for (let i = 3; i < n - 3; i++) i === 3 ? ctx.moveTo(P[i][0], P[i][1]) : ctx.lineTo(P[i][0], P[i][1]); ctx.stroke();
  ctx.restore(); }

// --- bodemprofiel in doorsnede: strooisellaag, donkere bovengrond (humus), lichtere ondergrond; o.gang = wormengang (pad)
function bodemprofiel(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const z = o.soort === 'klei' ? BODEM.klei : BODEM.grond;
  ctx.fillStyle = '#3A5540'; ctx.fillRect(x, y - 16, w, 16); // gras/strooisel
  ctx.fillStyle = BODEM.humus; ctx.fillRect(x, y, w, h * 0.38); ctx.fillStyle = z; ctx.fillRect(x, y + h * 0.38, w, h * 0.62);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); // golvende grens en korrels
  for (let i = 0; i < 70; i++) { const px = x + hash(i * 3 + 1) * w, py = y + h * 0.38 + (hash(i * 5) - 0.5) * 30; circ(ctx, px, py, 3 + 5 * hash(i * 7), i % 2 ? BODEM.humus : z); }
  for (let i = 0; i < 90; i++) { const px = x + hash(i * 11 + 4) * w, py = y + hash(i * 13 + 2) * h; circ(ctx, px, py, 1.5 + 2.5 * hash(i * 17), rgba(py < y + h * 0.38 ? BODEM.humusR : '#A88A68', 0.5)); }
  if (o.gang) { ctx.strokeStyle = '#2A2018'; ctx.lineWidth = o.gangDik || 22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); bioPad(ctx, o.gang); ctx.stroke(); }
  if (o.wortels) { ctx.strokeStyle = BODEM.wortel; ctx.lineCap = 'round'; for (const r of o.wortels) { ctx.lineWidth = r[2] || 4; ctx.beginPath(); bioPad(ctx, r[0]); ctx.stroke(); } }
  ctx.restore(); ctx.restore(); }

// --- dood blad (beuk/eik-achtig), bruin; vergaan 0..1 = rafelt en verkleurt
function doodBlad(ctx, x, y, s, ang = 0, a = 1, vergaan = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * (1 - 0.5 * vergaan); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.bezierCurveTo(-30, -34, 30, -34, 60, 0); ctx.bezierCurveTo(30, 34, -30, 34, -60, 0); ctx.closePath(); shape(ctx, vergaan > 0.5 ? '#6B4A30' : '#9A6A3A', '#6B4A30', 2);
  ctx.strokeStyle = '#6B4A30'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(56, 0); for (let i = -2; i <= 2; i++) { ctx.moveTo(i * 20, 0); ctx.lineTo(i * 20 + 14, -16); ctx.moveTo(i * 20, 0); ctx.lineTo(i * 20 + 14, 16); } ctx.stroke();
  if (vergaan > 0.05) { ctx.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 12; i++) if (hash(i * 3) < vergaan) circ(ctx, -50 + hash(i * 5) * 100, -20 + hash(i * 7) * 40, 6 + 8 * hash(i), '#000'); }
  ctx.restore(); }

// --- wortel met wortelharen en schimmeldraden (arbusculaire mycorrhiza): draden groeien vanuit de wortel ver de grond in.
// groei 0..1 = hoe ver de draden reiken; stroom 0..1 = fosfaat naar de wortel, suiker naar de schimmel.
function mycorrhiza(ctx, x, y, L, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const groei = o.groei == null ? 1 : o.groei, t = o.t || 0;
  // wortel (horizontaal), dikte 46, punt rechts
  ctx.beginPath(); ctx.moveTo(x - L / 2, y - 24); ctx.lineTo(x + L / 2 - 40, y - 20); ctx.quadraticCurveTo(x + L / 2 + 10, y, x + L / 2 - 40, y + 20); ctx.lineTo(x - L / 2, y + 24); ctx.closePath(); shape(ctx, BODEM.wortel, BODEM.wortelR, 2.5);
  // wortelharen: kort
  ctx.strokeStyle = BODEM.wortelR; ctx.lineWidth = 2; for (let i = 0; i < 18; i++) { const px = x - L / 2 + 40 + i * (L - 140) / 18, kant = i % 2 ? -1 : 1; ctx.beginPath(); ctx.moveTo(px, y + kant * 22); ctx.lineTo(px + 6, y + kant * (40 + 10 * hash(i))); ctx.stroke(); }
  // schimmeldraden: vertakte dunne lijnen, veel langer dan wortelharen
  ctx.strokeStyle = BODEM.schimmel; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  const tak = (sx, sy, an, len, d, seed) => { if (d > 3 || len < 12) return; const e = len * groei; const ex = sx + Math.cos(an) * e, ey = sy + Math.sin(an) * e; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + ex) / 2 + (hash(seed) - 0.5) * 30, (sy + ey) / 2 + (hash(seed + 1) - 0.5) * 30, ex, ey); ctx.stroke(); if (groei > 0.3) { tak(ex, ey, an - 0.5 + hash(seed + 2) * 0.3, len * 0.62, d + 1, seed * 3 + 1); tak(ex, ey, an + 0.4 + hash(seed + 3) * 0.3, len * 0.55, d + 1, seed * 3 + 2); } };
  for (let i = 0; i < 6; i++) { const px = x - L / 2 + 80 + i * (L - 220) / 5, kant = i % 2 ? -1 : 1; tak(px, y + kant * 22, kant * (1.57 + (hash(i * 5) - 0.5) * 1.2), 120 + 50 * hash(i * 9), 0, i * 17 + 3); }
  // binnen de wortel: arbuscules (fijn vertakte boompjes in de cellen), gedimd
  ctx.globalAlpha *= 0.6; for (let i = 0; i < 4; i++) { const px = x - L / 2 + 120 + i * (L - 260) / 3; ctx.beginPath(); for (let k = 0; k < 5; k++) { ctx.moveTo(px, y + 4); ctx.lineTo(px - 14 + k * 7, y - 12); } ctx.stroke(); } ctx.globalAlpha /= 0.6;
  // stroom: fosfaat langs een draad naar binnen, suiker naar buiten
  if ((o.stroom || 0) > 0.01) { const st = o.stroom; for (let i = 0; i < 3; i++) { const ph = (t * 0.35 + i / 3) % 1; ion(ctx, x - L / 2 + 80, y + 40 + 200 * (1 - ph) * groei, 'P', 1.1, st * Math.sin(ph * 3.14), { vast: 0 }); suiker(ctx, x - L / 2 + 330, y - 40 - 180 * ph * groei, 1.4, st * Math.sin(ph * 3.14), C.oker); } }
  ctx.restore(); }

// --- kruimel (aggregaat): korrels aan elkaar geplakt door schimmeldraden en slijm, met poriën ertussen
function kruimel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lijm = o.lijm == null ? 1 : o.lijm;
  if (lijm > 0.01) { ctx.save(); ctx.globalAlpha *= lijm * 0.45; ctx.beginPath(); ctx.ellipse(x, y, r * 1.05, r * 0.9, 0, 0, 6.283); ctx.fillStyle = rgba('#B8C8B0', 0.5); ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 9; i++) { const an = hash(i * 7 + 1) * 6.283, d = r * 0.6 * Math.sqrt(hash(i * 3 + 2)); const px = x + Math.cos(an) * d * (1 + (1 - lijm) * 0.8), py = y + Math.sin(an) * d * (1 + (1 - lijm) * 0.8); if (i % 3 === 0) humusVlok(ctx, px, py, r * 0.24, i + 2, 1, { lading: 0 }); else if (i % 3 === 1) zandkorrel(ctx, px, py, r * 0.26, i, 1); else kleideeltje(ctx, px, py, r * 0.45, hash(i) * 3, 1, { lading: 0 }); }
  if (lijm > 0.01) { ctx.strokeStyle = rgba(BODEM.schimmel, lijm); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const an = i * 1.3 + 0.4; ctx.beginPath(); ctx.arc(x, y, r * (0.55 + 0.35 * hash(i * 9)), an, an + 1.1 + 0.6 * hash(i * 4)); ctx.stroke(); } }
  ctx.restore(); }

// --- teststrookje (nitraat): wit strookje met een testvakje dat kleurt (kleur 0..1)
function teststrookje(ctx, x, y, s, kleur = 0, a = 1, ang = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  roundRect(ctx, -16, -150, 32, 300, 6); shape(ctx, '#F2F2EE', '#9AA3B2', 2); roundRect(ctx, -12, 96, 24, 36, 4); ctx.fillStyle = kleur > 0.01 ? `rgb(${Math.round(lerp(242, 150, kleur))},${Math.round(lerp(242, 40, kleur))},${Math.round(lerp(238, 110, kleur))})` : '#F2F2EE'; ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore(); }

// --- druppelbak: bak met zandgrond, gaatjes onderin, opvangbakje; druppels 0..1
function druppelbak(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.5, t = o.t || 0;
  const tuin = o.soort !== 'zand'; ctx.fillStyle = tuin ? BODEM.grond : BODEM.zand; ctx.fillRect(x - w / 2 + 6, y - h + 30, w - 12, h - 36); for (let i = 0; i < 60; i++) circ(ctx, x - w / 2 + 16 + hash(i * 3) * (w - 32), y - h + 40 + hash(i * 5) * (h - 56), 3 + 3 * hash(i * 7), tuin ? (i % 3 ? BODEM.grondR : BODEM.humus) : BODEM.zandR);
  if ((o.korrels || 0) > 0.01) for (let i = 0; i < 14; i++) circ(ctx, x - w / 2 + 30 + hash(i * 11) * (w - 60), y - h + 34 + hash(i * 13) * 8, 7, rgba('#F2F2EE', o.korrels)); // kunstmestkorrels
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  for (let i = 0; i < 5; i++) { ctx.clearRect; circ(ctx, x - w * 0.36 + i * w * 0.18, y, 5, '#1A2740'); }
  const dr = o.druppels || 0; if (dr > 0.01) for (let i = 0; i < 5; i++) { const ph = (t * 1.2 + i * 0.37) % 1; ctx.beginPath(); ctx.ellipse(x - w * 0.36 + i * w * 0.18, y + 12 + ph * 90, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, dr * 0.9 * Math.sin(ph * 3.14)); ctx.fill(); }
  roundRect(ctx, x - w / 2 + 20, y + 110, w - 40, 70, 10); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.stroke(); const lv = 50 * (o.vol || 0); if (lv > 1) { ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(x - w / 2 + 23, y + 177 - lv, w - 46, lv); }
  ctx.restore(); }

// --- veen in doorsnede: lagen samengeperste plantenresten; zak 0..1 = ontwaterd, inklinken (maaiveld zakt), sloot met lager water
function veenprofiel(ctx, x, y, w, h, a = 1, zak = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dz = 60 * zak;
  ctx.fillStyle = BODEM.veen; ctx.fillRect(x, y + dz, w, h - dz); ctx.strokeStyle = rgba('#7A6248', 0.7); ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const py = y + dz + 14 + hash(i * 3) * (h - dz - 28), px = x + hash(i * 5) * (w - 80); ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 30, py - 6, px + 70, py + 2); ctx.stroke(); }
  ctx.fillStyle = '#3A5540'; ctx.fillRect(x, y + dz - 14, w, 14); ctx.strokeStyle = '#8FA0B5'; ctx.setLineDash([10, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = rgba(C.teal, 0.45); const wl = y + 30 + 110 * zak; ctx.fillRect(x + w - 120, wl, 120, h - (wl - y)); ctx.restore(); }

// ===== extra objecten voor de scènes (25 okt 2026) =====
// watermolecuul (teal O, lichte H); ang = richting van de H-kant
function watertje(ctx, x, y, s = 1, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  circ(ctx, 9 * s, -7 * s, 6 * s, '#E8EEF2', '#AFC0D0', 1.2); circ(ctx, 9 * s, 7 * s, 6 * s, '#E8EEF2', '#AFC0D0', 1.2); circ(ctx, 0, 0, 10 * s, C.teal, '#8FC6E2', 1.5); ctx.restore(); }
// hydratatiemantel: watermoleculen rond een ion; bij een negatief ion wijzen de H's naar het ion, bij een positief ion de O
function mantel(ctx, x, y, r, neg = true, a = 1, t = 0, n = 7) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const an = i / n * 6.283 + t * 0.25 + Math.sin(t * 1.3 + i) * 0.06; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; watertje(ctx, px, py, 1, neg ? an + Math.PI : an, a); } }
// fosfaat dat met calcium/ijzer/aluminium een vast korreltje vormt (u 0..1)
function fosfaatKorrel(ctx, x, y, s = 1, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const n = 7; ctx.beginPath(); for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rr = 30 * s * (0.8 + 0.25 * hash(i * 3 + 7)); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.85; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.globalAlpha *= u; shape(ctx, '#B8A27A', '#8C7A58', 2.5); ctx.restore(); }
// bladrozet (sla/spinazie-achtig) voor het proefveldje; groei 0..1, bleek 0..1 = gele onderste bladeren
function bladrozet(ctx, x, y, s = 1, groei = 1, bleek = 0, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = 0.35 + 0.65 * groei;
  for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.42 + Math.sin(t * 0.7 + i) * 0.02, ln = (i === 0 || i === 6 ? 70 : 90 + 10 * (3 - Math.abs(i - 3))) * s * g; const onder = (i === 0 || i === 6 || i === 1 || i === 5);
    const col = onder && bleek > 0 ? `rgb(${Math.round(lerp(78, 214, bleek))},${Math.round(lerp(126, 196, bleek))},${Math.round(lerp(82, 96, bleek))})` : '#4E7E52';
    ctx.save(); ctx.translate(x, y); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -ln / 2, ln * 0.24, ln / 2, 0, 0, 6.283); shape(ctx, col, '#3E6642', 1.5); ctx.strokeStyle = rgba('#2E4A32', 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, -ln * 0.9); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// tomatenplant met bleke onderste bladeren (bovenop tomatenplant uit teken_lb1)
function tomaatBleek(ctx, x, y, h, t, o = {}, bleek = 0) { tomatenplant(ctx, x, y, h, t, o); if (bleek <= 0.01) return; const blad = o.blad == null ? 6 : o.blad, wieg = Math.sin(t * 0.8 + x * 0.01) * 4; ctx.save(); ctx.globalAlpha *= (o.a == null ? 1 : o.a) * bleek;
  for (let i = 0; i < Math.min(2, blad); i++) { const f = 0.12 + i * 0.8 / Math.max(1, blad), yy = y - h * f, z = i % 2 ? -1 : 1, ln = h * (0.2 - f * 0.06);
    for (let k = 0; k < 3; k++) { const u = 0.45 + k * 0.25, lx = x + z * ln * u, ly = yy - ln * 0.32 * Math.sin(u * 3) - ln * 0.05; ctx.beginPath(); ctx.ellipse(lx, ly, ln * 0.17, ln * 0.09, z * (0.5 - k * 0.3), 0, 6.283); shape(ctx, '#D6C460', '#A89A40', 1.5); } }
  ctx.restore(); }
// gieter
function gieter(ctx, x, y, s = 1, a = 1, giet = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.5 * giet); ctx.scale(s, s);
  roundRect(ctx, -50, -40, 100, 80, 12); shape(ctx, '#5E8F8A', '#3E6A66', 2); ctx.strokeStyle = '#3E6A66'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30, -40); ctx.quadraticCurveTo(0, -80, 30, -40); ctx.stroke();
  ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(48, 20); ctx.lineTo(120, -30); ctx.stroke(); roundRect(ctx, 112, -44, 24, 18, 4); shape(ctx, '#5E8F8A', '#3E6A66', 2);
  if (giet > 0.3) for (let i = 0; i < 6; i++) { const ph = (t * 1.6 + i / 6) % 1; ctx.beginPath(); ctx.ellipse(130 + i * 4 + ph * 30, -26 + ph * 120, 3, 6, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.8 * Math.sin(ph * 3.14)); ctx.fill(); }
  ctx.restore(); }
// staafje met grens (nitraatnorm)
function grensStaaf(ctx, x, y, w, h, waarde, grens, max, a = 1, label = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x, y); ctx.lineTo(x + w + 80, y); ctx.stroke();
  const vh = h * waarde / max; roundRect(ctx, x + 40, y - vh, w, vh, 6); shape(ctx, rgba(C.teal, 0.55), C.teal, 2); const gy = y - h * grens / max; ctx.setLineDash([12, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w + 80, gy); ctx.stroke(); ctx.setLineDash([]);
  if (label) metaText(ctx, label, x + w + 90, gy + 8, C.koraal, 'left', 28); ctx.restore(); }
// akker in doorsnede met grondwater; regen 0..1, gewas 0..1 (vanggewas), nitraat zakt naar het grondwater (u)
function akkerDoorsnede(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const t = o.t || 0;
  ctx.fillStyle = o.zand ? BODEM.zand : BODEM.grond; ctx.fillRect(x, y, w, h * 0.68); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fillRect(x, y + h * 0.68, w, h * 0.32); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + h * 0.68); ctx.lineTo(x + w, y + h * 0.68); ctx.stroke();
  for (let i = 0; i < 50; i++) circ(ctx, x + hash(i * 3 + 1) * w, y + 10 + hash(i * 5 + 2) * h * 0.62, 2 + 3 * hash(i), o.zand ? BODEM.zandR : BODEM.grondR);
  if ((o.gewas || 0) > 0.01) for (let i = 0; i < 14; i++) { const px = x + 40 + i * (w - 80) / 13; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 4; ctx.globalAlpha *= 1; const gh = 50 * o.gewas; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px - 6, y - gh); ctx.moveTo(px, y); ctx.lineTo(px + 7, y - gh * 0.9); ctx.stroke(); ctx.strokeStyle = BODEM.wortel; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + 3, y + 110 * o.gewas); ctx.stroke(); }
  if ((o.regen || 0) > 0.01) for (let i = 0; i < 26; i++) { const ph = (t * 1.1 + hash(i * 7)) % 1; const px = x + hash(i * 11) * w; ctx.strokeStyle = rgba(C.teal, 0.75 * o.regen); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, y - 260 + ph * 240); ctx.lineTo(px - 6, y - 236 + ph * 240); ctx.stroke(); }
  if ((o.nitraat || 0) > 0.01) for (let i = 0; i < 5; i++) { const ph = ((o.u || 0) + i * 0.17) % 1; const px = x + 120 + i * (w - 240) / 4; const py = y + 30 + ph * h * 0.7; ion(ctx, px, py, 'NO3', 0.9, o.nitraat * (o.gewas > 0.5 && py < y + 120 ? 0.25 : 1), { vast: 0 }); }
  ctx.restore(); }
// kalender nov–mrt (regen > verdamping)
function kalender(ctx, x, y, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  M.forEach((m, i) => { const winter = i < 3 || i > 9; roundRect(ctx, x + i * 70, y, 62, 70, 8); shape(ctx, winter && hl > 0.5 ? rgba(C.teal, 0.35) : '#2A3A58', winter && hl > 0.5 ? C.teal : C.line, 1.5); text(ctx, m, x + i * 70 + 31, y + 44, fTekst(24, 700), C.text, 'center'); }); ctx.restore(); }
// bodemmonster: grondboor met monsterzakje
function bodemmonster(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -90, 140, 170, 14); shape(ctx, '#E8E2D4', '#B8AE98', 2); ctx.fillStyle = BODEM.grond; ctx.beginPath(); ctx.ellipse(0, 40, 50, 24, 0, 0, 6.283); ctx.fill(); text(ctx, 'monster', 0, -40, fTekst(26, 700), '#3A2E24', 'center');
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(120, -140); ctx.lineTo(120, 90); ctx.moveTo(80, -140); ctx.lineTo(160, -140); ctx.stroke(); ctx.restore(); }
// eiwitje: kralenketting die opgevouwen ligt (kluwen), voor 'stikstof in eiwitten'
function eiwitje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pts = []; for (let i = 0; i < 22; i++) { const an = i * 0.75, r = (18 + 22 * Math.sin(i * 0.45)) * s; pts.push([x + Math.cos(an) * r, y + Math.sin(an) * r * 0.8]); }
  ctx.strokeStyle = '#9AA8C0'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); bioPad(ctx, pts); ctx.stroke(); pts.forEach((p, i) => circ(ctx, p[0], p[1], 6 * s, i % 5 === 0 ? C.groen : '#7A8BA8', '#B8C4D8', 1)); ctx.restore(); }
// Wat word jij? · Landbouw 2 · Wat zit er in de bodem? — scènes per alinea (v1.0, 25 okt 2026). Look: Schema met cast (Yasmin, Opa Henk);
// Micro voor de deeltjes. Decor 'moestuin' alleen onder scènes die echt in de moestuin spelen (cold open, H2-opening, H3, recap).
// Kleuren: bodem oker-familie, water teal (opgelost ion = teal rand, vast = oker rand), plant groen, 'let op' koraal, focus goud.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function vereenvoudigd(ctx, a = 1) { metaA(ctx, 'VEREENVOUDIGD', 1840, 90, a, C.grain, 'right', 26); }
const GROND = 860; // voetlijn op het decor (± 80 % van de hoogte)

// twee bakken met tomatenplant (cold open en recap); u = groei 0..1 (een maand later)
function tweeBakken(ctx, t, u, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const yz = plantenbak(ctx, 760, GROND, 340, 'zand', 1, { label: 'zand' }), yk = plantenbak(ctx, 1200, GROND, 340, 'klei', 1, { label: 'klei' });
  tomaatBleek(ctx, 760, yz, lerp(150, 230, u), t, { blad: lerp(3, 4, u) | 0, trossen: u > 0.6 ? [0.2] : [] }, u * (o.bleek == null ? 1 : o.bleek));
  tomatenplant(ctx, 1200, yk, lerp(150, 340, u), t, { blad: lerp(3, 6, u) | 0, trossen: u > 0.6 ? [0.6, 0.3] : [] }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.translate(140, 0); bodemprofiel(ctx, 1080, 560, 760, 320, 1, { gang: [[1420, 556], [1410, 640], [1450, 760], [1430, 870]], gangDik: 24, wortels: [[[[1240, 560], [1250, 700], [1230, 840]], 0, 5]] });
    regenworm(ctx, [[1414, 600], [1412, 660], [1440, 740], [1446, 800]], 14); tomatenplant(ctx, 1240, 556, 360, t, { blad: 6, trossen: [0.7, 0.4] });
    for (let i = 0; i < 4; i++) { const ph = (t * 0.25 + i / 4) % 1; ion(ctx, 1600 + i * 30, 590 + ph * 260, i % 2 ? 'K' : 'NO3', 0.8, Math.sin(ph * 3.14) * 0.8, { vast: 0 }); } ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'moestuin', 0.6);
    const giet = fase(t, q.at('evenveel', 1), q.at('maand', 1), 0.4), u = q.on('maand', 1, 2);
    tweeBakken(ctx, t, u, 1);
    persoon(ctx, 'yasmin', 400, GROND, 420, { t, kijk: 1, pose: u > 0.5 ? 'wijs' : 'staan', uit: u > 0.6 ? 'verbaasd' : 'blij' });
    persoon(ctx, 'henk', 1560, GROND, 440, { t, kijk: -1, pose: q.on('Hoe', 1) > 0.5 ? 'denk' : 'staan' });
    gieter(ctx, 1000, 560, 0.9, giet, 1, t); metaA(ctx, 'ZELFDE WATER · ZELFDE MEST', 960, 300, fase(t, q.at('evenveel', 1), q.at('maand', 1), 0.4), C.grain, 'center', 26);
    tag(ctx, 'een maand later', 980, 190, C.goud, q.on('maand', 1), 'center', 32);
    
    vraagteken(ctx, 980, 330, q.on('denk', 1), 100); },

  // ---------- H1 De schudproef ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: door zand spoelen water en mineralen sneller weg', 1 - q.on('plant', 1));
    const P = q.on('plant', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; plantenbak(ctx, 620, 760, 380, 'zand', 1, { label: 'zand' }); plantenbak(ctx, 1300, 760, 380, 'klei', 1, { label: 'klei' });
      for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; ctx.beginPath(); ctx.ellipse(560 + i * 30, 780 + ph * 90, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.9 * Math.sin(ph * 3.14)); ctx.fill(); }
      ctx.beginPath(); ctx.ellipse(1300, 790 + ((t * 0.3) % 1) * 60, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fill(); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; const S = q.on('suiker', 1);
      tomatenplant(ctx, 760, 760, 440, t, { blad: 6, trossen: [0.6] }); ctx.fillStyle = BODEM.grond; ctx.fillRect(400, 760, 720, 90);
      kruis(ctx, 760, 820, 40, q.on('geen', 1) * (1 - q.on('Uit', 1)), C.koraal); tag(ctx, 'geen voedsel uit de grond', 760, 900 - 60, C.koraal, q.on('geen', 1) * (1 - q.on('Uit', 1)), 'center', 28);
      suiker(ctx, 980, 420, 1.6, S, C.oker); naamBij(ctx, 'suiker', 'MAAKT HIJ ZELF, IN HET BLAD', 1030, 410, S);
      const M = q.on('Uit', 1); pijl(ctx, 1260, 820, 1260, 640, C.teal, M, 4); ion(ctx, 1380, 760, 'K', 1.4, q.on('kalium', 1), { vast: 0 }); ion(ctx, 1520, 700, 'NO3', 1.4, q.on('nitraat', 1), { vast: 0 });
      naamBij(ctx, 'water en mineralen', 'OPGELOSTE DEELTJES', 1300, 560, M); ctx.restore(); } },

  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.at('schudproef', 1), Z = q.at('zakt', 1);
    const A1 = 1 - q.on('schudproef', 1, 0.6);
    if (A1 > 0.01) { ctx.save(); ctx.globalAlpha *= A1; persoon(ctx, 'yasmin', 960, GROND, 520, { t, kijk: 1, pose: 'vasthouden', hold: (c, x, y) => { zandkorrel(c, x + 10, y - 10, 10, 1); zandkorrel(c, x - 6, y - 4, 9, 2); } }); naamBij(ctx, 'zand: korrelig', '', 1180, 420, q.on('korrelig', 1)); naamBij(ctx, 'klei: glad en plakkerig', '', 1180, 520, q.on('glad', 1)); ctx.restore(); }
    const B = q.on('schudproef', 1, 0.6) * (1 - q.on('kleideeltje', 1, 0.6));
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const sch = fase(t, q.at('schudden', 1), Z, 0.2), wob = Math.sin(t * 40) * 14 * sch, zak = t < Z ? 0 : clamp((t - Z) / 1.4, 0, 1);
      ctx.save(); ctx.translate(wob, 0); jampot(ctx, 700, 780, 240, 420, 1, q.on('water', 1) * 0.85, (c, x0, y0, w, h) => { for (let i = 0; i < 70; i++) { const fy = lerp(hash(i * 5) * h * 0.9, h - 10 - hash(i * 5) * 70, t < Z ? (sch > 0.5 ? 0 : 1) : zak); circ(c, x0 + 12 + hash(i * 3) * (w - 24), y0 + fy, 5 + 3 * hash(i), BODEM.zand); } }); ctx.restore();
      ctx.save(); ctx.translate(-wob, 0); jampot(ctx, 1220, 780, 240, 420, 1, q.on('water', 1) * 0.85, (c, x0, y0, w, h) => { const zw = sch > 0.3 || t > Z ? 1 : 0; c.fillStyle = rgba(BODEM.klei, 0.55 * zw); c.fillRect(x0, y0 + 20, w, h - 20); c.fillStyle = BODEM.klei; c.fillRect(x0, y0 + h - 18, w, 18); }); ctx.restore();
      naamBij(ctx, 'zand', 'ZAKT METEEN', 700, 850, q.on('meteen', 1), 'center'); naamBij(ctx, 'klei', 'BLIJFT ZWEVEN', 1220, 850, q.on('zweven', 1), 'center'); vereenvoudigd(ctx, 1); ctx.restore(); }
    const C2 = q.on('kleideeltje', 1, 0.6); if (C2 > 0.01) { ctx.save(); ctx.globalAlpha *= C2; bg(ctx, 'micro'); ctx.globalAlpha = C2;
      const g = q.on('zandkorrel', 1, 1.2); zandkorrel(ctx, 640, 480, lerp(40, 260, g), 4); kleideeltje(ctx, 1380, 480, 120, -0.2, 1, { lading: 0 });
      naamBij(ctx, 'kleideeltje', 'KLEINER DAN 2 MICROMETER', 1380, 600, 1, 'center'); naamBij(ctx, 'zandkorrel', '50 MICROMETER TOT 2 MILLIMETER', 640, 480 + lerp(40, 260, g) * 0.86 + 60, g, 'center');
      tag(ctx, 'honderden keren zo groot', 960, 190, C.goud, q.on('honderden', 1), 'center', 32); metaA(ctx, 'NIET OP SCHAAL', 1840, 860, 1, C.grain, 'right'); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('giet', 1, 1.5);
    trechter(ctx, 760, 470, 1.15, 'zand', 1, 0, 0, 1); trechter(ctx, 1180, 470, 1.15, 'klei', 1, 0, 0, 1);
    naamBij(ctx, 'zandgrond', '', 760, 250, 1, 'center'); naamBij(ctx, 'kleigrond', '', 1180, 250, 1, 'center');
    gieter(ctx, 1460, 300, 0.8, G * (1 - q.on('Waar', 1)), G, t); vraagteken(ctx, 980, 760, q.on('denk', 1), 100); vereenvoudigd(ctx, 1); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: uit het zand', 1 - q.on('deel', 1)); const u = clamp((t - 0.3) / 6, 0, 1);
    trechter(ctx, 640, 470, 1.15, 'zand', 1, 0.9, u, 1); trechter(ctx, 1060, 470, 1.15, 'klei', 1, 0.3, u, 1);
    naamBij(ctx, 'zandgrond', 'WATER ZAKT VLOT DOOR', 640, 250, 1, 'center'); naamBij(ctx, 'kleigrond', 'HOUDT MEER WATER VAST', 1060, 250, q.on('Klei', 1), 'center');
    const D = q.on('deel', 1); if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; roundRect(ctx, 1380, 260, 440, 440, 20); shape(ctx, '#121A26', C.line, 2); ctx.save(); roundRect(ctx, 1380, 260, 440, 440, 20); ctx.clip();
      for (let i = 0; i < 3; i++) { const x = 1480 + i * 120, y = 360 + (i % 2) * 140; kleideeltje(ctx, x, y, 140, -0.3 + i * 0.4, 1, { lading: 0 }); ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(x, y + 4, 80, 34, -0.3 + i * 0.4, 0, 6.283); ctx.stroke(); }
      ctx.restore(); naamBij(ctx, 'stevig vastgehouden water', 'WORTEL KAN ER NIET BIJ', 1600, 740, q.on('wortel', 1), 'center'); kruis(ctx, 1760, 620, 26, q.on('wortel', 1)); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'micro'); const tV = q.at('Volg', 1), tL = q.at('Langs', 1), tH = q.at('humus', 1);
    const korrels = [[420, 520, 170, 4], [1500, 720, 110, 6]]; korrels.forEach(k => zandkorrel(ctx, k[0], k[1], k[2], k[3], 1));
    const kl = [[1000, 560], [1180, 660], [1340, 560]]; kl.forEach((p, i) => kleideeltje(ctx, p[0], p[1], 190, -0.2 + i * 0.2, 1, { lading: 5, laA: q.on('negatief', 1) }));
    tag(ctx, 'lading', 960, 160, C.goud, q.on('lading', 1) * (1 - q.on('Volg', 1)), 'center', 36);
    // kaliumion 1: naar de klei (plakt); kaliumion 2: langs de zandkorrel naar beneden
    const u1 = clamp((t - q.at('plakken', 1) + 1.6) / 1.6, 0, 1), vast = t > q.at('plakken', 1) - 0.1 ? 1 : 0;
    ion(ctx, lerp(820, 1000, ease(u1)), lerp(220, 500, ease(u1)) + (vast ? 0 : Math.sin(t * 2) * 6), 'K', 1.7, q.on('kaliumdeeltje', 1, 0.3), { vast, volg: true });
    naamBij(ctx, 'kaliumion', 'POSITIEF GELADEN', 860, 150, q.on('positief', 1) * (1 - q.on('Kleideeltjes', 1)), 'left');
    const u2 = clamp((t - tL) / 3, 0, 1); ion(ctx, 600, lerp(230, 820, u2), 'K', 1.5, q.on('Langs', 1) * (1 - ramp(t, tL + 3, 0.4)), { vast: 0 }); naamBij(ctx, 'zandkorrel', 'HOUDT BIJNA NIETS VAST', 420, 780, q.on('zandkorrel', 1) * (1 - q.on('humus', 1)), 'center');
    const Hm = q.on('humus', 1, 0.6); if (Hm > 0.01) { humusVlok(ctx, 1560, 380, 110, 5, Hm, { lading: 4 }); ion(ctx, 1560, 290, 'K', 1.3, Hm, { vast: 1 }); mantel(ctx, 1560, 380, 150, false, q.on('water', 2) * Hm, t, 9); naamBij(ctx, 'humus', 'HOUDT OOK WATER VAST', 1300, 420, Hm, 'center'); }
    tag(ctx, 'vooral op zand belangrijk', 960, 160, C.goud, q.on('Vooral', 1), 'center', 32); metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('veen', 1, 0.6);
    if (V < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - V; const kaart = (x, kop, regels, a, col) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 260, 640, 380, 20); shape(ctx, rgba(col, 0.12), col, 2); text(ctx, kop, x + 40, 340, fTitel(52), col); regels.forEach((r, i) => { const [s2, ra] = r; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 40, 420 + i * 70, fTekst(38, 600), C.text); ctx.restore(); } }); ctx.restore(); };
      kaart(220, 'klei', [['zwaar te bewerken', q.on('zwaar', 1)], ['scheurt als hij uitdroogt', q.on('scheurt', 1)], ['houdt water en kalium vast', 1]], 1, BODEM.kleiR);
      kaart(1060, 'zand', [['warmt in het voorjaar', q.on('warmt', 1)], ['sneller op', q.on('warmt', 1)], ['laat water en mineralen door', 1]], 1, BODEM.zandR);
      if (q.on('scheurt', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('scheurt', 1); ctx.strokeStyle = '#3A2E24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(560, 600); ctx.lineTo(590, 560); ctx.lineTo(580, 520); ctx.moveTo(620, 610); ctx.lineTo(640, 570); ctx.stroke(); ctx.restore(); }
      zon(ctx, 1600, 330, 32, q.on('warmt', 1), t); ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; const zak = q.on('zakt', 1, 2.5); veenprofiel(ctx, 360, 330, 1200, 460, 1, q.on('ontwaterd', 1, 2) * 0.4 + zak * 0.6);
      naamBij(ctx, 'veen', 'PLANTENRESTEN, NIET VERTEERD', 400, 260, 1, 'left'); tag(ctx, 'houdt veel water vast', 1150, 220, C.teal, q.on('houdt', 1) * (1 - q.on('ontwaterd', 1)), 'center', 30);
      tag(ctx, 'ontwaterd: zuurstof erbij, afbraak', 1150, 220, C.koraal, q.on('ontwaterd', 1), 'center', 30);
      for (let i = 0; i < 6; i++) { const ph = (t * 0.4 + i / 6) % 1; circ(ctx, 500 + i * 160, 360 - ph * 120, 8, rgba(C.text2, 0.5 * q.on('micro-organismen', 1) * Math.sin(ph * 3.14))); }
      metaA(ctx, 'TOT ± 1 CM PER JAAR', 1560, 860, zak, C.grain, 'right', 28); ctx.restore(); } },

  // ---------- H2 Wie maakt de grond? ----------
  s11(ctx, t, q) { const P = q.on('eetlepel', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; decor(ctx, 'moestuin', 0.6); const W2 = q.on('regenworm', 1, 0.6);
      persoon(ctx, 'yasmin', 760, GROND, 440, { t, kijk: 1, pose: 'vasthouden', uit: W2 > 0.5 ? 'verbaasd' : 'blij', hold: (c, x, y) => { if (W2 > 0.01) regenworm(c, [[x - 26, y - 8 + Math.sin(t * 3) * 2], [x - 8, y - 16], [x + 10, y - 8 + Math.sin(t * 3 + 1) * 2], [x + 28, y - 14]], 7, 1); } });
      persoon(ctx, 'henk', 1160, GROND, 450, { t, kijk: -1, pose: 'staan', uit: 'blij' }); tag(ctx, 'dood materiaal?', 960, 200, C.koraal, q.on('dood', 1), 'center', 34); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'schema'); ctx.globalAlpha = P;
      ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(680, 510); ctx.quadraticCurveTo(820, 470, 960, 400); ctx.stroke(); ctx.beginPath(); ctx.ellipse(560, 520, 130, 62, 0, 0, 6.283); shape(ctx, '#AFC0D0', '#8FA0B5', 2); ctx.beginPath(); ctx.ellipse(560, 512, 112, 48, 0, 0, 6.283); ctx.fillStyle = BODEM.grond; ctx.fill();
      for (let i = 0; i < 60; i++) circ(ctx, 470 + hash(i * 3) * 180, 490 + hash(i * 5) * 44, 1.6, rgba(C.teal, 0.8 * q.on('organismen', 1)));
      naamBij(ctx, 'een eetlepel gezonde grond', '', 560, 640, 1, 'center'); text(ctx, '>', 1060, 540, fTitel(96), C.goud, 'center');
      stippen(ctx, 1180, 400, 40, 40, C.text2, q.on('mensen', 1), 10, 9, 26); naamBij(ctx, 'alle mensen op aarde', '', 1300, 640, q.on('mensen', 1), 'center');
      const R = q.on('grasland', 1); if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; bg(ctx, 'schema'); ctx.globalAlpha = P * R; roundRect(ctx, 610, 220, 700, 560, 8); shape(ctx, rgba(BODEM.grond, 0.6), C.line, 2); for (let i = 0; i < 30; i++) { const x = 650 + hash(i * 7) * 620, y = 270 + hash(i * 11) * 470; regenworm(ctx, [[x, y], [x + 20, y + 10], [x + 44, y + 4]], 5, q.on('driehonderd', 1)); }
        metaA(ctx, '1 VIERKANTE METER GRASLAND', 960, 830, 1, C.grain, 'center', 26); tag(ctx, 'vaak zo’n driehonderd regenwormen', 960, 190, C.goud, q.on('driehonderd', 1), 'center', 32); metaA(ctx, 'WORMEN VERGROOT', 80, 860, 1); ctx.restore(); }
      ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const tr = q.on('trekken', 1, 2.2);
    bodemprofiel(ctx, 460, 300, 1000, 520, 1, { gang: [[860, 296], [856, 380], [880, 500], [920, 640], [910, 790]], gangDik: 28, wortels: [[[[600, 300], [610, 450], [590, 620]], 0, 5], [[[1260, 300], [1280, 420], [1250, 560]], 0, 4]] });
    const g = q.on('gangen', 1, 1.5); regenworm(ctx, [[lerp(870, 863, g), lerp(560, 318, g)], [860, lerp(620, 400, g)], [880, lerp(680, 500, g)], [916, lerp(760, 610, g)]], 13);
    const L = q.on('lucht', 1); for (let i = 0; i < 4; i++) { const ph = (t * 0.5 + i / 4) % 1; ctx.beginPath(); ctx.ellipse(866 + Math.sin(i) * 6, 300 + ph * 400, 5, 8, 0, 0, 6.283); ctx.fillStyle = rgba(i % 2 ? C.teal : '#E8EEF2', 0.8 * L * Math.sin(ph * 3.14)); ctx.fill(); }
    doodBlad(ctx, lerp(760, 862, tr), lerp(286, 360, tr), 0.9, lerp(0.2, 1.5, tr), 1, 0);
    naamBij(ctx, 'regenworm', 'GRAAFT GANGEN', 980, 450, q.on('wormen', 1) * (1 - q.on('stikstof', 1)), 'left'); metaA(ctx, 'WORM VERGROOT', 480, 860, 1, C.grain, 'left', 24);
    const N = q.on('stikstof', 1); if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 1300, 70, 560, 180, 18); shape(ctx, '#121A26', C.goud, 2); eiwitje(ctx, 1410, 160, 1.2); text(ctx, 'stikstof in eiwitten', 1500, 172, fTekst(34, 700), C.text, 'left'); ctx.restore(); }
    vraagteken(ctx, 1500, 560, q.on('denk', 1), 100); },

  s14(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'antwoord a: pas na afbraak door bacteriën en schimmels', 1 - q.on('Eerst', 1));
    const af = q.on('breken', 1, 3.5); doodBlad(ctx, 760, 480, 3.2, 0.1, 1, af);
    for (let i = 0; i < 6; i++) { const w2 = wander(i, t, 20, 0.6); bacterieCel(ctx, 560 + i * 90 + w2.x, 420 + (i % 2) * 130 + w2.y, 46, { a: q.on('bacteriën', 1), ang: i * 0.8 }); }
    ctx.save(); ctx.globalAlpha *= q.on('schimmels', 1); ctx.strokeStyle = BODEM.schimmel; ctx.lineWidth = 2.2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(500 + i * 120, 680); ctx.quadraticCurveTo(540 + i * 120, 560, 520 + i * 120, 460); ctx.stroke(); } ctx.restore();
    const L = q.on('los', 1, 1); for (let i = 0; i < 5; i++) { const ph = clamp(L * 1.2 - i * 0.05, 0, 1); ion(ctx, lerp(780, 1200 + i * 90, ph), lerp(480, 300 + (i % 2) * 160, ph), i % 3 === 2 ? 'P' : i % 2 ? 'NO3' : 'NH4', 1.2, L, { vast: 0 }); }
    const O = q.on('opnemen', 1, 1); ctx.save(); ctx.globalAlpha *= O; ctx.strokeStyle = BODEM.wortel; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1800, 120); ctx.quadraticCurveTo(1700, 400, 1760, 760); ctx.stroke(); ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(1730 + i * 2, 200 + i * 70); ctx.lineTo(1660, 210 + i * 70); ctx.stroke(); } ctx.restore(); naamBij(ctx, 'wortel', '', 1800, 820, O, 'center'); naamBij(ctx, 'wortelharen', '', 1560, 360, O, 'right');
    regel(ctx, 'mineralisatie', 960, 830, q.on('mineralisatie', 1), C.goud, 56, 'center', 800); },

  s15(ctx, t, q) { bg(ctx, 'micro'); const lijm = q.on('plakken', 1, 2);
    kruimel(ctx, 700, 460, 220, 1, { lijm }); kruimel(ctx, 1240, 460, 180, 1, { lijm: q.on('plakken', 1, 2.5) });
    naamBij(ctx, 'schimmeldraden', '', 520, 220, q.on('Schimmeldraden', 1), 'center'); naamBij(ctx, 'slijm van bacteriën', '', 1240, 220, q.on('slijm', 1), 'center');
    regel(ctx, 'kruimels', 960, 780, q.on('kruimels', 1), C.goud, 52, 'center', 800);
    const R = q.on('ruimte', 1); for (let i = 0; i < 4; i++) { const ph = (t * 0.4 + i / 4) % 1; ctx.beginPath(); ctx.ellipse(960 + Math.sin(i * 2) * 20, 200 + ph * 560, 6, 9, 0, 0, 6.283); ctx.fillStyle = rgba(i % 2 ? C.teal : '#E8EEF2', 0.8 * R * Math.sin(ph * 3.14)); ctx.fill(); }
    metaA(ctx, 'RUIMTE VOOR LUCHT, WATER EN WORTELS', 960, 850, R, C.grain, 'center', 26); metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); },

  s16(ctx, t, q) { bg(ctx, 'micro'); ctx.fillStyle = rgba(BODEM.grond, 0.25); ctx.fillRect(0, 0, W, 900);
    mycorrhiza(ctx, 960, 450, 1300, 1, { groei: q.on('schimmels', 1, 2.5), stroom: q.on('fosfaat', 1), t });
    metaA(ctx, 'ZEVEN OP DE TIEN SOORTEN LANDPLANTEN', 80, 860, q.on('zeven', 1));
    naamBij(ctx, 'wortel', '', 360, 380, 1, 'left'); naamBij(ctx, 'schimmeldraden', 'REIKEN VERDER DE GROND IN', 1380, 200, q.on('schimmeldraden', 1), 'left');
    naamBij(ctx, 'fosfaat', 'NAAR DE PLANT', 240, 760, q.on('fosfaat', 1), 'left'); naamBij(ctx, 'suiker', 'NAAR DE SCHIMMEL', 700, 200, q.on('suiker', 1), 'left'); },

  // ---------- H3 Het proefveldje ----------
  s17(ctx, t, q) { decor(ctx, 'moestuin', 0.6); const B = q.on('bodemmonster', 1);
    const strook = (x, l, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba(BODEM.grond, 0.85); ctx.fillRect(x - 170, 700, 340, 160); roundRect(ctx, x - 40, 560, 80, 60, 6); shape(ctx, '#F2EAD8', '#B8A880', 2); text(ctx, l, x, 604, fTekst(40, 800), '#3A2E24', 'center'); ctx.fillStyle = '#8C6A48'; ctx.fillRect(x - 4, 620, 8, 90); ctx.restore(); };
    strook(560, 'A', 1); strook(960, 'B', 1); strook(1360, 'C', 1);
    for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) bladrozet(ctx, 460 + k * 100 + i * 400, 830, 0.55, 0.2, 0, 1, t);
    bodemmonster(ctx, 1700, 340, 0.9, B * (1 - q.on('Strook', 1))); roundRect(ctx, 1380, 120, 480, 120, 14); ctx.save(); ctx.globalAlpha *= B * (1 - q.on('Strook', 1)); shape(ctx, '#121A26', C.line, 2); text(ctx, 'stikstof: te laag', 1410, 170, fTekst(34, 700), C.koraal); text(ctx, 'kalium: ruim voldoende', 1410, 215, fTekst(34, 700), C.groen); ctx.restore();
    tag(ctx, 'geen stikstof', 560, 500, C.koraal, q.on('Strook', 1, 0.3), 'center', 28); tag(ctx, 'stikstof', 960, 500, C.groen, q.on('Strook', 2, 0.3), 'center', 28); tag(ctx, 'stikstof + extra kalium', 1360, 500, C.goud, q.on('Strook', 3, 0.3), 'center', 28);
    vraagteken(ctx, 1160, 380, q.on('denk', 1), 100); },

  s19(ctx, t, q) { const T = q.on('ton', 1, 0.6);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; decor(ctx, 'moestuin', 0.6); antwoord(ctx, 'antwoord c: even goed', 1 - q.on('Kalium', 1)); const gr = q.on('groeit', 1, 2);
      [[560, 0.35, 0.8], [960, 1, 0], [1360, 1, 0]].forEach(([x, g, b], i) => { ctx.fillStyle = rgba(BODEM.grond, 0.85); ctx.fillRect(x - 170, 700, 340, 160); for (let k = 0; k < 3; k++) bladrozet(ctx, x - 100 + k * 100, 830, 0.55, lerp(0.2, g, gr), b * gr, 1, t); text(ctx, 'ABC'[i], x, 620, fTekst(44, 800), C.text, 'center'); });
      tag(ctx, 'B en C even groot', 1160, 420, C.groen, q.on('groeit', 1), 'center', 30); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; bg(ctx, 'schema'); ctx.globalAlpha = T; const A = q.on('Strook', 2);
      const kH = lerp(0.85, 0.98, q.on('verhoogt', 1, 1.2)); ton(ctx, 380, 800, 480, 500, [0.45, 0.7, kH], ['stikstof', 'fosfor', 'kalium'], 1, 1, t, q.on('laagste', 2) > 0.5 ? 0 : -1);
      metaA(ctx, 'DE TON UIT MEER OOGST', 380, 220, 1, C.grain, 'left', 26); tag(ctx, 'extra kalium: hoger, maar niet de laagste duig', 620, 160, C.goud, q.on('verhoogt', 1) * (1 - A), 'center', 28);
      if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; bladrozet(ctx, 1240, 700, 1.4, 0.5, 1, 1, t); naamBij(ctx, 'strook A', 'BLEKE, GELE OUDERE BLADEREN', 1240, 760, 1, 'center'); ctx.restore(); }
      const E = q.on('eiwitten', 1); if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; roundRect(ctx, 1500, 220, 340, 260, 16); shape(ctx, '#121A26', C.line, 2); eiwitje(ctx, 1590, 320, 1); text(ctx, 'eiwit', 1700, 330, fTekst(30, 700), C.text); ctx.beginPath(); ctx.ellipse(1600, 420, 50, 22, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.7), C.groen, 2); text(ctx, 'bladgroen', 1680, 430, fTekst(30, 700), C.text); ctx.restore(); }
      ctx.restore(); } },

  s20(ctx, t, q) { bg(ctx, 'schema'); ton(ctx, 560, 800, 480, 500, [0.45, 0.7, 0.98], ['stikstof', 'fosfor', 'kalium'], 1, q.on('voedingsstof', 1, 1.5), t, 0);
    regel(ctx, 'wet van het minimum', 1180, 420, q.on('minimum', 1), C.goud, 56, 'left', 800); metaA(ctx, 'SPRENGEL (± 1828)', 1180, 480, q.on('tweehonderd', 1)); metaA(ctx, 'LIEBIG (VANAF 1840)', 1180, 520, q.on('tweehonderd', 1));
    regel(ctx, 'wat het meest tekortschiet,', 1180, 600, q.on('tekortschiet', 1), C.text, 38, 'left', 700); regel(ctx, 'bepaalt de groei', 1180, 652, q.on('bepaalt', 1), C.goud, 38, 'left', 700); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const kaart = (x, kop, col, a, teken) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 230, 500, 500, 22); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, kop, x + 250, 310, fTitel(56), col, 'center'); teken(x + 250, 500); ctx.restore(); };
    kaart(140, 'stikstof', C.groen, 1, (x, y) => { eiwitje(ctx, x - 60, y - 40, 1.3); ctx.beginPath(); ctx.ellipse(x + 60, y + 90, 70, 30, 0, 0, 6.283); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); text(ctx, 'eiwit · bladgroen', x, y + 190, fTekst(30, 700), C.text, 'center'); });
    kaart(710, 'fosfor', C.oker, q.on('Fosfor', 1), (x, y) => { ctx.strokeStyle = C.oker; ctx.lineWidth = 5; for (let i = 0; i < 2; i++) { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const yy = y - 120 + k * 5, xx = x - 60 + Math.sin(k * 0.35 + i * 3.14) * 40; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } text(ctx, 'DNA · ATP · membraan', x, y + 190, fTekst(30, 700), C.text, 'center'); });
    kaart(1280, 'kalium', C.teal, q.on('Kalium', 1), (x, y) => { const op = 0.5 + 0.5 * Math.sin(t * 1.5); huidmondje(ctx, x, y, 0.9, op * q.on('huidmondjes', 1), 1, t, 0); text(ctx, 'huidmondjes · enzymen', x, y + 190, fTekst(30, 700), C.text, 'center'); }); },

  // ---------- H4 De druppelbak ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const G = fase(t, q.at('giet', 1), q.at('Yasmin', 1) + 1.5, 0.4), dr = q.on('druppelt', 1);
    druppelbak(ctx, 960, 560, 520, q.on('bak', 1), { korrels: q.on('kunstmest', 1), druppels: Math.max(G, dr), vol: q.on('druppelt', 1, 2) * 0.6, t, soort: 'tuin' });
    naamBij(ctx, 'tuingrond', 'MET KLEI EN HUMUS', 960, 240, q.on('tuingrond', 1), 'center'); tag(ctx, 'kunstmest', 1330, 330, C.text2, q.on('kunstmest', 1) * (1 - G), 'left', 28);
    persoon(ctx, 'henk', 540, 900, 440, { t, kijk: 1, pose: 'vasthouden', hold: (c, x, y) => gieter(c, x + 20, y - 10, 0.8, 1, G, t) });
    persoon(ctx, 'yasmin', 1240, 900, 430, { t, kijk: -1, pose: 'vasthouden', hold: (c, x, y) => teststrookje(c, x, y + 40, 0.75, 0, 1, 0) });
    vereenvoudigd(ctx, 1); vraagteken(ctx, 1200, 820, q.on('denk', 1), 90); },

  s24(ctx, t, q) { const P = q.on('Volg', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: veel nitraat', 1); druppelbak(ctx, 860, 560, 520, 1, { druppels: 1, vol: 0.7, t, soort: 'tuin' });
      persoon(ctx, 'yasmin', 1140, 900, 430, { t, kijk: -1, pose: 'vasthouden', uit: 'verbaasd', hold: (c, x, y) => teststrookje(c, x, y + 40, 0.75, q.on('donker', 1, 0.8), 1, 0) });
      persoon(ctx, 'henk', 380, 900, 440, { t, kijk: 1, uit: 'verbaasd' }); tag(ctx, 'nitraat', 1560, 330, C.koraal, q.on('nitraat', 1), 'center', 30); vereenvoudigd(ctx, 1); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'micro'); ctx.globalAlpha = P;
      for (let i = 0; i < 3; i++) zandkorrel(ctx, 360 + i * 560, 300 + (i % 2) * 300, 110, i + 2); kleideeltje(ctx, 600, 640, 230, 0.3, 1, { lading: 5 }); humusVlok(ctx, 1300, 300, 90, 5, 1, { lading: 3 });
      ion(ctx, 610, 560, 'K', 1.5, 1, { vast: 1 }); ion(ctx, 1290, 210, 'NH4', 1.4, 1, { vast: 1 });
      const tz = q.at('zakt', 1), uN = clamp((t - tz) / 3, 0, 1), nx = 960, ny = lerp(330, 760, ease(uN)) + Math.sin(t * 2) * 4;
      mantel(ctx, nx, ny, 66, true, q.on('nitraatdeeltje', 1), t); ion(ctx, nx, ny, 'NO3', 1.6, q.on('nitraatdeeltje', 1, 0.3), { vast: 0, volg: true });
      naamBij(ctx, 'nitraat', 'NEGATIEF · MANTEL VAN WATER', nx, ny + 120, 1 - q.on('Fosfaat', 1), 'center');
      const F = q.on('Fosfaat', 1), R = q.on('reageert', 1, 1.2); if (F > 0.01) { mantel(ctx, 1600, 620, 66, true, F * (1 - R), t); ion(ctx, 1600, 620, 'P', 1.5, F * (1 - R * 0.8), { vast: 0 }); fosfaatKorrel(ctx, 1600, 620, 1.6, R, F); naamBij(ctx, 'fosfaat', R > 0.5 ? 'LOST SLECHT OP' : 'OOK NEGATIEF', 1600, 720, F, 'center'); metaA(ctx, '+ IJZER, ALUMINIUM OF CALCIUM', 1600, 770, R * F, C.grain, 'center', 22); }
      metaA(ctx, 'NIET OP SCHAAL', 80, 860, 1); ctx.restore(); } },

  s25(ctx, t, q) { bg(ctx, 'schema'); const H2 = q.on('herfst', 1), Z = 1 - q.on('herfst', 1);
    akkerDoorsnede(ctx, 260, 360, 1400, 460, 1, { zand: Z > 0.5 || true, regen: q.on('regent', 1), nitraat: q.on('spoelt', 2), u: (t * 0.12) % 1, t });
    tag(ctx, 'op zand houdt bijna niets iets vast', 960, 200, C.koraal, Z * q.on('zand', 1), 'center', 30);
    kalender(ctx, 540, 150, H2 * (1 - q.on('drijfmest', 1)), q.on('regent', 1)); metaA(ctx, 'REGEN > VERDAMPING', 960, 260, q.on('verdampt', 1) * (1 - q.on('drijfmest', 1)), C.teal, 'center', 26);
    naamBij(ctx, 'grondwater', '', 1700, 760, q.on('grondwater', 1), 'left');
    tag(ctx, 'herfst en winter: geen drijfmest op het land', 960, 200, C.koraal, q.on('drijfmest', 1) * (1 - q.on('Europa', 1)), 'center', 30);
    const E = q.on('Europa', 1); if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; roundRect(ctx, 1180, 110, 700, 230, 16); shape(ctx, '#121A26', C.line, 2); grensStaaf(ctx, 1210, 310, 70, 170, 50, 50, 70, 1, 'GRENS: 50 MG/L'); metaA(ctx, 'OOK VOOR DRINKWATER', 1400, 290, q.on('drinkwater', 1), C.grain, 'left', 24); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); akkerDoorsnede(ctx, 260, 420, 1400, 400, 1, { u: 0, t });
    for (let i = 0; i < 9; i++) { const x = 360 + i * 150; ctx.fillStyle = '#B8935A'; ctx.beginPath(); ctx.ellipse(x, 404, 26, 18, 0, 0, 6.283); ctx.fill(); } // gerooide aardappels, liggen op de grond
    for (let i = 0; i < 6; i++) ion(ctx, 400 + i * 220, 520 + (i % 2) * 60, 'NO3', 0.9, q.on('stikstof', 1), { vast: 0 });
    tag(ctx, 'eind september', 960, 200, C.goud, q.on('september', 1), 'center', 32); metaA(ctx, 'AKKER KAAL · NOG STIKSTOF IN DE GROND', 960, 260, q.on('kaal', 1), C.grain, 'center', 26); vraagteken(ctx, 1700, 300, q.on('denk', 1), 100); },

  s28(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: een vanggewas zaaien', 1 - q.on('winter', 1)); const G = q.on('vanggewas', 1, 2.5);
    akkerDoorsnede(ctx, 260, 420, 1400, 400, 1, { gewas: G, nitraat: 1, u: (t * 0.06) % 1, t });
    naamBij(ctx, 'vanggewas', 'ROGGE OF GRAS', 1460, 380, q.on('vanggewas', 1), 'center'); tag(ctx, 'neemt een groot deel van de stikstof op', 960, 260, C.groen, q.on('neemt', 1), 'center', 30);
    tag(ctx, 'veel minder uitspoeling', 960, 330, C.groen, q.on('minder', 1), 'center', 30); },

  s29(ctx, t, q) { bg(ctx, 'schema'); const kol = (x, kop, col, a, regels) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 220, 700, 520, 22); shape(ctx, rgba(col, 0.1), col, 2); text(ctx, kop, x + 40, 300, fTitel(52), col); regels.forEach(([s2, ra], i) => { if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 40, 400 + i * 74, fTekst(36, 600), C.text); ctx.restore(); } }); ctx.restore(); };
    kol(180, 'kunstmest', C.text2, 1, [['werkt snel', q.on('snel', 1)]]);
    kol(1040, 'mest en compost', BODEM.zandR, 1, [['stikstof zit vast', q.on('vast', 1)], ['komt langzaam vrij', q.on('bodemleven', 1)], ['geeft meer humus', q.on('humus', 1)], ['ook dan: nitraat!', q.on('nitraat', 1)]]);
    for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; circ(ctx, 300 + i * 90, 640 + ph * 60, 8, rgba('#F2F2EE', 0.7 * q.on('snel', 1))); }
    if (q.on('nitraat', 1) > 0.01) ion(ctx, 1660, 700, 'NO3', 1.2, q.on('nitraat', 1), { vast: 0 }); },

  s30(ctx, t, q) { bg(ctx, 'schema'); bodemmonster(ctx, 380, 480, 1.2, 1);
    ['juiste meststof', 'hoeveelheid', 'moment', 'plek'].forEach((s2, i) => tag(ctx, s2, 1100, 300 + i * 90, C.groen, q.on(i ? s2 : 'meststof', 1), 'center', 32));
    const W2 = q.on('weegt', 1); if (W2 > 0.01) { ctx.save(); ctx.globalAlpha *= W2; weegschaal(ctx, 1500, 560, 0, 1, 'oogst', 'water'); ctx.restore(); }
    regel(ctx, 'genoeg oogst, en schoon grondwater', 960, 840, q.on('genoeg', 1), C.goud, 40, 'center', 700); },

  // ---------- Recap ----------
  s31(ctx, t, q) { const P = q.on('Kleigrond', 1, 0.6);
    if (P < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P; decor(ctx, 'moestuin', 0.6); tweeBakken(ctx, t, 1, 1);
      persoon(ctx, 'yasmin', 400, GROND, 420, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'henk', 1560, GROND, 440, { t, kijk: -1, pose: 'wijs' });
      const G = q.on('gieter', 1); for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; ion(ctx, 700 + i * 28, 880 + ph * 20, 'NO3', 0.6, G * Math.sin(ph * 3.14) * (1 - q.on('Kleigrond', 1)), { vast: 0 }); }
      tag(ctx, 'te weinig stikstof: bleke onderste bladeren', 760, 330, C.koraal, q.on('bleke', 1), 'center', 28); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; bg(ctx, 'schema'); ctx.globalAlpha = P; ['schudproef', 'wie maakt de grond?', 'proefveldje', 'druppelbak'].forEach((s2, i) => kaartje(ctx, 150 + i * 420, 300, 380, s2, [BODEM.kleiR, C.groen, C.goud, C.teal][i], 1));
      tag(ctx, 'klei houdt water en positieve ionen vast', 960, 520, C.groen, 1, 'center', 32); tag(ctx, 'de grond én de stof die het meest tekortschiet', 960, 640, C.goud, q.on('Welke', 1), 'center', 32); ctx.restore(); } },

  s32(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Waar leer je dit?', 140, 200, 1, C.text, 64, 'left', 700);
    [['mbo', 'Vakexpert teelt en groene technologie', 'MBO 4', 'mbo'], ['hbo', 'Tuinbouw en Akkerbouw', 'O.A. DEN BOSCH', 'hbo'], ['wo', 'Plantenwetenschappen', 'WAGENINGEN', 'Wageningen']].forEach(([n, o, m, cue], i) => { const a = q.on(cue, 1); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 140, 290 + i * 170, 1100, 140, 18); shape(ctx, rgba(C.groen, 0.12), C.groen, 2); text(ctx, n, 190, 375 + i * 170, fTitel(48), C.groen); text(ctx, o, 330, 370 + i * 170, fTekst(44, 700), C.text); metaText(ctx, m, 330, 410 + i * 170, C.grain, 'left', 24); ctx.restore(); });
    regel(ctx, 'akkerbouwer · teeltadviseur · bodemspecialist · onderzoeker', 140, 830, q.on('akkerbouwer', 1), C.text2, 36, 'left', 600);
    tomatenplant(ctx, 1600, 760, 380, t, { blad: 6, trossen: [0.7, 0.4] }); ctx.fillStyle = BODEM.grond; ctx.fillRect(1440, 760, 320, 70); }
});
