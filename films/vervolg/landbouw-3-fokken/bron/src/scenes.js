
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
// decor (ElevenLabs gpt-image-2.5-sunburst, stijlreferentie 'moestuin' uit Wat zit er in de bodem?, flow cMT4epIEjMJi0sraRQzk, generatie JIDCzRqVKGTKvCzTl1HJ, ±433 credits, 26 okt 2026)
const DECOR_SRC = {
 stal: "data:image/webp;base64,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"
};
if (typeof EVO === "undefined") var EVO = { a1: "#5BA4C9", a2: "#C9A35C" };
// Evolutie v2 · tekenronde 2 (23 okt 2026) — Micro-objecten opnieuw getekend volgens Part C2 en C9 (Moleculen, Cellen).
// Wordt NA teken_evo1..8 geladen en overschrijft daar: bacterie, plasmideRing, pilus, antibioticum, griepVirus (evo4),
// chromosoom (evo6), chromosoom1, chromosoomPaar, geslachtscel (evo1), sikkelcel (evo5) en rodeBloedcel (lib_bio).
// Nieuw en herbruikbaar: dnaDraad (DNA als touw of dubbele helix langs een pad) en nucleoide (bacterie-DNA als rozet van lussen).
// Functienamen en parameters zijn gelijk aan de oude, zodat alle keyframes vanzelf de nieuwe tekening gebruiken.

// ---------- hulpjes ----------
// Let op: lib_cast.js herdefinieert _mix (geeft rgb()), dus _lt/_dk leveren geen hex meer en rgba(_lt(..)) wordt zwart. Daarom eigen hex-mengers.
const _mvL = (h, k = 0.25) => _mixHex(h, "#FFFFFF", k), _mvD = (h, k = 0.25) => _mixHex(h, "#000000", k);
function _mvCR(P, closed, per = 10) { // Catmull-Rom-punten door P
  const n = P.length, out = []; if (n < 2) return P.slice(); const N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) { const p0 = P[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
    for (let k = 0; k < per; k++) { const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); } }
  if (!closed) out.push(P[n - 1].slice()); return out; }
function _mvGelijk(P, step, closed) { // punten op gelijke booglengte (+ normaal en s)
  const Q = closed ? P.concat([P[0]]) : P; const L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]); out.push({ x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, nx: -Math.sin(an), ny: Math.cos(an), s: d }); }
  return out; }
function _mvPad(ctx, P, closed = true) { ctx.beginPath(); bioPad(ctx, P, closed); }

// =====================================================================================
// DNA-DRAAD. Recept (Part C9 Moleculen): rechtsdraaiende dubbele helix, 2 nm breed, één winding per ±10 bp (3,4 nm),
// grote en kleine groef ongelijk; kleur paars. Op een kleine schaal (w < 6 px) is de helix niet meer te zien: dan een
// touw met een lichte rand en een donkere kern die om de halve winding onderbreekt (suggereert de draaiing).
// Bekende fouten: platte ladder; linksdraaiend; een te dun lijntje dat in de achtergrond verdwijnt (Kamiel: 'ietsje dikker').
// P = punten van het pad; o.w = breedte in px; o.dicht = ring (plasmide, bacteriechromosoom).
// =====================================================================================
function dnaDraad(ctx, P, o = {}) {
  const { w = 4, kleur = C.kernR, donker = C.kern, a = 1, dicht = false, helix = 'auto', fase = 0, glad = true } = o; if (a <= 0.01 || P.length < 2) return;
  const pts = glad ? _mvCR(P, dicht, 8) : P.slice();
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const metHelix = helix === true || (helix === 'auto' && w >= 6);
  if (!metHelix) {
    const pad = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const p of pts) ctx.lineTo(p[0], p[1]); if (dicht) ctx.closePath(); };
    pad(); ctx.strokeStyle = kleur; ctx.lineWidth = w; ctx.stroke();
    if (w >= 2.4) { pad(); ctx.strokeStyle = donker; ctx.lineWidth = w * 0.42; const per = w * 1.7; ctx.setLineDash([per * 0.55, per * 0.45]); ctx.lineDashOffset = -fase * per; ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore(); return; }
  // dubbele helix langs het pad
  const S = _mvGelijk(pts, Math.max(1.2, w * 0.18), dicht), hw = w / 2, pitch = w * 1.75, sl = Math.max(1.1, w * 0.24);
  const off = (q, k) => { const ph = q.s / pitch * 6.283 + fase * 6.283 + (k ? 2.3 : 0); return [q.x + q.nx * hw * Math.sin(ph), q.y + q.ny * hw * Math.sin(ph), Math.cos(ph)]; };
  const streng = (k, voor) => { ctx.strokeStyle = voor ? _mvL(kleur, 0.18) : donker; ctx.lineWidth = sl; ctx.beginPath(); let aan = false;
    for (let i = 0; i < S.length; i++) { const [px, py, z] = off(S[i], k); const zij = voor ? z >= 0 : z < 0; if (zij) { if (!aan) { ctx.moveTo(px, py); aan = true; } else ctx.lineTo(px, py); } else aan = false; } ctx.stroke(); };
  streng(0, false); streng(1, false);
  // baseparen: sporten loodrecht op de as, ±4 per winding getekend (rustig), iets transparant
  ctx.strokeStyle = rgba(kleur, 0.55); ctx.lineWidth = Math.max(0.8, sl * 0.55); ctx.beginPath(); const stap = pitch / 4;
  let volg = 0; for (const q of S) { if (q.s < volg) continue; volg = q.s + stap; const A = off(q, 0), B = off(q, 1); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); } ctx.stroke();
  streng(0, true); streng(1, true);
  ctx.restore(); }

// =====================================================================================
// NUCLEOÏDE. Recept: het bacteriechromosoom is één ringvormig DNA-molecuul (E. coli 4,6 Mbp, ±1,5 mm lang) zonder
// kernmembraan, opgevouwen in ±400 superspiraal-lussen van 10–20 kb rond een kern (rozet). Bron: BioNumbers 103792;
// Postow e.a. 2004 (Genes Dev 18:1766). Getekend: één gesloten draad die 10–16 lussen uitstulpt, een deel getwist
// (plectoneem: de armen kruisen elkaar), samen een onregelmatige kluwen in het midden van de cel.
// Bekende fouten: losse krul zonder einde (het is een ring); DNA in een kern met membraan.
// (cx, cy) = midden; rx, ry = halve maten; o.T = puntafbeelding (bv. voor een gebogen bacterie).
// =====================================================================================
function _chromPad(ctx, cx, top, h, breed, cen, seed = 0) {
  const R = breed / 2, rc = R * 0.95, N = 44, Lz = [], Rz = [];
  const hw = (t, ph) => { const dE = Math.min(t, 1 - t) * h; const cap = dE >= rc ? 1 : Math.sqrt(Math.max(0, 1 - Math.pow((rc - dE) / rc, 2)));
    const con = 1 - 0.4 * Math.exp(-Math.pow((t - cen) * h / (breed * 0.34), 2)); const wob = 1 + 0.035 * Math.sin(t * h / (breed * 0.5) + ph); return R * cap * con * wob; };
  for (let i = 0; i <= N; i++) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Lz.push([cx - hw(t, seed), top + t * h]); }
  for (let i = N - 1; i >= 1; i--) { const t = (1 - Math.cos(Math.PI * i / N)) / 2; Rz.push([cx + hw(t, seed + 1.7), top + t * h]); }
  ctx.beginPath(); bioPad(ctx, Lz.concat(Rz), true); }
const _GBAND = [[0.07, 0.03, 1], [0.15, 0.05, 1], [0.22, 0.025, 0], [0.4, 0.04, 1], [0.47, 0.025, 0], [0.66, 0.05, 1], [0.73, 0.03, 0], [0.8, 0.055, 1], [0.9, 0.03, 1]];
function _chromTekening(ctx, cx, top, h, breed, cen, vul, rand, gen, seed) {
  _chromPad(ctx, cx, top, h, breed, cen, seed); shape(ctx, vul, rand, Math.max(1.2, breed * 0.06));
  ctx.save(); _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.clip();
  const zak = breed * 0.12; // banden licht gebogen (het chromosoom is rond)
  for (const [p, d, donker] of _GBAND) { if (gen && Math.abs(p - gen.band) < gen.halfT + d) continue; if (Math.abs(p - cen) < 0.05) continue;
    const y0 = top + p * h, hh = Math.max(2, d * h); ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + hh); ctx.quadraticCurveTo(cx, y0 + hh + zak, cx - breed, y0 + hh); ctx.closePath();
    ctx.fillStyle = donker ? rgba(_mvD(vul, 0.35), 0.75) : rgba(rand, 0.35); ctx.fill(); }
  // chromatine: fijne lichte lusjes langs de randen (opgevouwen DNA-draad), heel rustig
  if (breed >= 18) { ctx.strokeStyle = rgba(rand, 0.22); ctx.lineWidth = Math.max(0.8, breed * 0.035); for (const zij of [-1, 1]) { ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const t = i / 60, yy = top + t * h; const xx = cx + zij * breed * (0.3 + 0.08 * Math.sin(t * h / (breed * 0.22) + zij)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
  if (gen) { const y0 = top + gen.band * h - gen.hh / 2; ctx.beginPath(); ctx.moveTo(cx - breed, y0); ctx.quadraticCurveTo(cx, y0 + zak, cx + breed, y0); ctx.lineTo(cx + breed, y0 + gen.hh); ctx.quadraticCurveTo(cx, y0 + gen.hh + zak, cx - breed, y0 + gen.hh); ctx.closePath();
    ctx.fillStyle = gen.kleur; ctx.fill(); ctx.strokeStyle = _mvL(gen.kleur, 0.5); ctx.lineWidth = 1.5; ctx.stroke(); }
  ctx.restore();
  _chromPad(ctx, cx, top, h, breed, cen, seed); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.2, breed * 0.06); ctx.stroke();
  if (gen && gen.nieuw) { const y0 = top + gen.band * h - gen.hh / 2; roundRect(ctx, cx - breed / 2 - 6, y0 - 5, breed + 12, gen.hh + 10 + zak, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); }
}
function _bandH(h) { return clamp(h * 0.11, 10, 24); }
function chromosoomPaar(ctx, x, y, h, o = {}) {
  const { allelen = [EVO.a1, EVO.a2], band = 0.32, a = 1, breed = 34, gap = 30, cen = 0.58, nieuw = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  for (let k = 0; k < 2; k++) { const cx = x + (k ? 1 : -1) * (gap / 2 + breed / 2); const isN = nieuw && nieuw[0] === k; const kl = isN ? nieuw[1] : allelen[k];
    _chromTekening(ctx, cx, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur: kl, nieuw: isN }, k * 2.3); }
  ctx.restore(); }
function chromosoom1(ctx, x, y, h, kleur, o = {}) {
  const { band = 0.32, breed = 34, cen = 0.58, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = _bandH(h);
  _chromTekening(ctx, x, y - h / 2, h, breed, cen, C.kern, C.kernR, { band, hh, halfT: hh / h / 2, kleur }, 0.9); ctx.restore(); }
// chromosoom (muilezel-meiose, film 6): staafje 14 px breed, centromeer op 38 % van boven, eigen kleur per set
function chromosoom(ctx, x, y, l, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; _chromTekening(ctx, x, y - l / 2, l, 14, 0.38, kleur, _mvL(kleur, 0.35), null, l * 0.01); ctx.restore(); }

// =====================================================================================
// GESLACHTSCEL als schema met één chromosoom. Eicel: ±120 µm, zona pellucida als brede lichte band, smalle ruimte met
// het eerste poollichaampje, cytoplasma met dooierkorrels; de eicel staat stil in metafase II, dus het chromosoom ligt
// vrij (geen kernmembraan). Zaadcel: platte ovale kop (4–5 × 3 µm) met acrosoomkap over de voorste helft (teal, zoals
// zaadcelEcht in lib_bio), kern vult de kop; middenstuk met mitochondriën als spiraal; staart dunner wordend en golvend.
// Schema: de kop is vergroot (het chromosoom moet erin passen) en de staart ingekort (echt ±10× de kop).
// =====================================================================================
// als vectorpaden in cm (blok HOEF_VORM, gemaakt door referentie/pop/hoefdieren/werk/bouw.py). Poten = profielen langs de botten.
// Hoefgangers: carpus ('knie') van de voorpoot knikt bij optillen naar achter, kogel en hak hoog, lange middenhand/middenvoet, hoef als vaste vorm op het kootbeen.
// Eenheid = cm, y omlaag, grond y = 0, x = 0 midden onder de romp. Kijkrichting +x (o.kijk = -1 spiegelt).
// API per dier: HOEF.paard.teken(ctx, x, y, schaal (px/cm), o)  o.houding, o.t (0-1 cyclus), o.kijk, o.a, o.wereld, o.bek
// Wrappers onderaan: paard(), ezel(), muilezel(), edelhert(), koe7(), nijlpaard() met dezelfde aanroep en schermmaat als in dieren_zoog.js.

// <<HOEFVORM (gegenereerd door referentie/pop/hoefdieren/werk/bouw.py uit de stijlplaat; niet met de hand bewerken)
const HOEF_VORM = {"paard":{"J":{"midrug":[0.0,-155.35],"nekBasis":[74.42,-127.44],"lend":[-27.91,-156.28],"kruis":[-55.81,-152.56],"kop":[106.98,-204.65],"neus":[138.6,-162.79],"kaak":[108.84,-178.6],"kin":[130.23,-160.0],"schoft":[41.86,-148.84],"schouder":[69.77,-111.63],"elleboog":[53.95,-85.58],"pols":[55.81,-48.37],"vkogel":[56.74,-13.02],"vteen":[69.77,0.0],"heup":[-62.33,-120.93],"knie":[-44.65,-96.74],"hak":[-60.47,-56.74],"akogel":[-55.81,-15.81],"ateen":[-47.44,0.0],"staart0":[-75.35,-146.05],"staart1":[-82.79,-113.49],"staart2":[-87.44,-80.0],"staart3":[-90.23,-50.23],"staart4":[-93.02,-27.91]},"delen":{"romp":{"c":"#7C4B2E","basis":[[77.21,-115.35,1],[73.95,-117.21],[39.07,-149.53],[29.53,-159.3,1],[22.79,-155.58],[10.7,-152.56],[2.09,-152.56],[-0.47,-153.49],[-6.28,-153.49],[-23.72,-157.21],[-26.74,-157.21],[-33.02,-159.07],[-41.63,-159.07],[-46.28,-158.14],[-62.09,-153.49],[-65.12,-150.47],[-65.12,-149.3],[-66.05,-148.6],[-66.05,-140.93],[-71.63,-114.19],[-72.56,-100.0],[-73.49,-96.28],[-73.49,-83.26],[-72.56,-82.56],[-72.56,-81.4],[-68.6,-77.44],[-67.44,-77.44],[-64.88,-75.58],[-60.93,-75.58],[-60.23,-74.65],[-58.14,-74.65],[-57.44,-75.58],[-53.49,-75.58],[-52.79,-76.51],[-49.77,-77.44],[-47.67,-79.53],[-46.51,-83.49],[-43.95,-88.6],[-38.37,-97.67,1],[-33.72,-97.67],[-30.23,-100.47],[-26.51,-100.7],[-10.93,-93.49],[-0.7,-90.47],[2.33,-90.47],[4.88,-89.53],[37.44,-89.53],[39.07,-87.91],[39.07,-84.19],[43.02,-80.23],[44.19,-80.23],[46.74,-78.37],[50.7,-78.37],[51.4,-77.44],[53.49,-77.44],[54.19,-78.37],[58.14,-78.37],[58.84,-79.3],[61.86,-80.23],[64.88,-83.26],[66.98,-94.42],[72.79,-99.77],[75.12,-103.49],[76.98,-109.3]],"lagen":[{"c":"#1E1E1E","p":[[-27.44,-105.12],[-29.53,-106.98],[-34.42,-106.74],[-37.91,-103.26],[-40.23,-98.14],[-41.63,-96.28,1],[-40.47,-95.35,1],[-38.84,-96.74],[-36.98,-96.98],[-36.05,-97.67],[-33.49,-97.44],[-30.47,-100.47],[-28.6,-100.7],[-27.44,-101.63]]},{"c":"#8E5837","p":[[-13.49,-147.91],[-15.12,-149.53],[-17.44,-150.7],[-20.47,-150.7],[-22.09,-151.63],[-23.72,-151.86,1],[-26.28,-156.98],[-28.6,-158.14],[-31.4,-158.37],[-32.33,-159.07],[-42.33,-159.07],[-43.95,-158.14],[-46.98,-158.14],[-48.6,-157.21],[-50.7,-157.21],[-52.33,-156.28],[-54.42,-156.28],[-55.35,-155.58],[-62.79,-153.49],[-68.84,-150.47],[-70.47,-148.84],[-70.93,-146.51],[-76.28,-137.21],[-76.28,-136.05],[-77.21,-134.42],[-77.21,-129.53],[-78.14,-127.91],[-78.14,-123.49],[-77.21,-121.86],[-77.21,-116.05],[-76.28,-114.42],[-76.28,-112.33],[-75.35,-110.7],[-75.35,-108.6],[-73.49,-104.19],[-73.49,-102.09],[-72.56,-100.47],[-72.56,-98.37],[-71.86,-97.44],[-71.4,-95.12],[-70.47,-94.42,1],[-69.77,-94.65],[-67.44,-96.98],[-66.98,-99.3],[-66.28,-100.23],[-66.28,-102.79],[-67.21,-104.42],[-67.21,-107.44],[-68.14,-109.07],[-68.14,-113.02],[-69.07,-114.65],[-69.07,-123.72],[-66.05,-130.93],[-64.65,-132.33],[-64.19,-133.72],[-60.23,-137.67],[-58.84,-138.14],[-51.86,-143.26],[-40.7,-148.84],[-38.84,-149.07],[-34.42,-150.93],[-27.21,-150.93],[-25.58,-150.0],[-23.95,-149.77],[-21.4,-145.12],[-21.4,-136.98],[-22.33,-135.35],[-22.33,-132.33],[-25.35,-126.05],[-28.6,-122.79],[-29.07,-121.4],[-30.47,-120.0],[-33.49,-113.95],[-33.49,-111.86],[-34.42,-110.23],[-34.42,-108.6],[-33.49,-107.44],[-30.0,-107.21],[-27.67,-106.28],[-25.35,-107.44],[-18.37,-114.42],[-14.19,-116.74],[-11.63,-119.3],[-11.16,-120.7],[-9.53,-122.56],[-9.53,-124.65],[-8.6,-126.28],[-8.6,-127.91],[-9.53,-129.53],[-9.53,-131.63],[-10.23,-132.56],[-10.47,-134.42],[-11.4,-136.05],[-11.4,-138.14],[-12.33,-139.77],[-12.33,-145.58]]},{"c":"#553A2B","p":[[-27.67,-105.81,1],[-26.98,-104.19],[-26.98,-102.09],[-25.12,-100.0],[-15.35,-95.12],[-13.49,-94.88],[-10.7,-93.26],[-9.53,-93.26],[-5.12,-91.4],[-3.02,-91.4],[-1.4,-90.47],[2.56,-90.47],[4.19,-89.53],[34.19,-89.53],[35.81,-88.6],[36.98,-88.6],[38.14,-87.67],[39.07,-85.58],[39.07,-77.44],[38.14,-75.81],[38.37,-65.35,1],[40.23,-64.42,1],[43.95,-67.91],[47.21,-68.6],[49.77,-67.91],[50.93,-66.74],[51.4,-65.35],[53.49,-63.49],[56.05,-63.49],[57.44,-64.88,1],[57.21,-66.05],[53.26,-68.14],[51.16,-70.23],[50.23,-72.09],[50.0,-73.95],[49.07,-75.58],[49.07,-79.53],[48.14,-81.16],[48.14,-90.7],[45.12,-95.81],[43.95,-96.74],[42.33,-96.74],[39.53,-95.12],[37.67,-94.88],[36.05,-93.95],[31.86,-95.12],[30.47,-96.51],[28.14,-96.98],[27.21,-97.67,1],[24.88,-96.74],[22.79,-96.74],[21.16,-95.81],[19.07,-95.81],[17.44,-94.88],[-0.93,-94.88],[-2.56,-95.81],[-5.58,-95.81],[-7.21,-96.74],[-11.86,-97.91],[-15.58,-99.77],[-16.98,-101.16],[-21.16,-103.49],[-24.88,-106.98],[-26.51,-106.98]]},{"c":"#553A2B","p":[[-42.33,-95.58,1],[-47.91,-90.47],[-49.3,-90.0],[-52.79,-86.51],[-54.19,-82.33],[-55.58,-80.93],[-56.05,-79.53],[-58.37,-77.21],[-59.53,-74.88],[-60.7,-70.23],[-62.09,-67.44,1],[-55.58,-60.93,1],[-53.49,-62.56],[-50.47,-68.6],[-50.47,-69.77],[-48.6,-74.19],[-48.6,-76.28],[-47.67,-77.91],[-47.67,-80.0],[-46.74,-81.63],[-46.51,-83.49],[-43.72,-89.07],[-42.33,-90.47],[-41.16,-92.79],[-41.16,-94.42]]}]},"hum":{"c":"#7C4B2E","basis":[[27.67,-154.88,1],[38.6,-94.42],[44.88,-82.79,1],[64.65,-83.02,1],[65.81,-86.05],[66.98,-94.42],[72.79,-99.77],[75.12,-103.49],[76.98,-109.3],[77.21,-115.35,1],[75.12,-116.28],[43.72,-156.98,1]],"lagen":[]},"dij":{"c":"#7C4B2E","basis":[[-57.44,-155.12],[-63.02,-153.26],[-70.93,-149.07,1],[-66.05,-141.16],[-71.63,-114.19],[-72.79,-101.63,1],[-51.86,-97.91],[-42.56,-90.47,1],[-39.53,-96.51],[-38.37,-97.67],[-33.72,-97.67],[-32.56,-98.6],[-28.37,-155.12,1]],"lagen":[]},"nek":{"c":"#7C4B2E","basis":[[99.53,-204.65,1],[96.05,-204.65],[87.67,-201.63],[75.12,-195.35],[71.63,-193.02],[68.37,-189.53],[62.33,-185.58],[39.77,-166.05],[23.72,-156.05,1],[23.72,-144.65],[44.65,-101.86,1],[74.19,-101.86,1],[76.98,-109.3],[76.98,-115.12],[77.91,-117.67],[77.91,-129.07],[79.07,-132.79],[94.19,-164.65],[95.81,-166.28],[100.0,-167.67],[102.56,-167.67],[103.72,-166.74,1]],"lagen":[{"c":"#1E1E1E","p":[[98.14,-203.72],[96.98,-204.65],[95.35,-204.65],[92.56,-203.02],[87.91,-201.86],[84.42,-200.0],[83.26,-200.0],[81.4,-198.37],[74.42,-195.12],[73.02,-193.72],[71.63,-193.26],[68.84,-189.77],[66.05,-188.6],[63.72,-186.28],[62.33,-185.81],[58.14,-181.63],[56.74,-181.16],[51.63,-176.05],[50.23,-175.58],[44.19,-169.53],[42.79,-169.07],[39.53,-165.81],[36.28,-164.42],[34.88,-163.02],[30.7,-160.7],[29.77,-159.53],[30.0,-158.37],[31.16,-157.44],[33.72,-157.44],[38.14,-159.3],[42.09,-159.3],[53.72,-165.12],[56.98,-168.37],[58.37,-168.84],[60.7,-171.16],[62.09,-171.63],[68.14,-177.67],[69.53,-178.14],[71.86,-180.47],[73.26,-180.93],[76.74,-184.42],[77.21,-185.81],[78.37,-186.98],[79.77,-187.44],[82.09,-189.77],[83.49,-190.23],[88.6,-195.35],[92.79,-197.67],[96.05,-200.93],[97.44,-201.4],[98.37,-202.56]]},{"c":"#1E1E1E","p":[[97.91,-173.02],[96.74,-172.79],[94.88,-170.7],[93.95,-167.21,1],[95.12,-166.05,1],[96.74,-166.74],[98.84,-166.74],[100.93,-168.84,1],[100.0,-171.16]]},{"c":"#8E5837","p":[[43.26,-138.6,1],[42.09,-137.67],[40.93,-135.35],[40.93,-133.26],[40.0,-131.63],[40.0,-117.91],[40.93,-116.28],[40.93,-112.33],[41.86,-110.7],[41.86,-105.81],[42.79,-104.19],[42.79,-102.09],[46.05,-98.84],[52.33,-98.84],[53.26,-99.53],[54.42,-99.53],[55.35,-98.84],[56.98,-98.6],[58.6,-95.81],[57.67,-93.49],[57.91,-92.33],[62.33,-88.84],[64.65,-87.91,1],[65.58,-88.6],[66.74,-90.93],[66.74,-93.02],[68.37,-96.51,1],[66.28,-98.6],[64.19,-98.6],[62.56,-99.53],[60.93,-99.77],[59.53,-101.86],[59.53,-103.95],[62.09,-108.6],[62.09,-113.95],[61.16,-116.28],[62.79,-119.07],[64.42,-119.3],[65.35,-120.0],[69.3,-119.07],[72.09,-117.44],[77.21,-116.98,1],[77.91,-117.91],[77.91,-129.3],[78.84,-130.93],[78.84,-133.49],[76.98,-136.51],[75.58,-136.98],[69.07,-142.33],[63.72,-142.33],[62.09,-141.4],[58.14,-141.4],[56.05,-139.53],[55.58,-138.14],[54.42,-136.98],[52.56,-136.74],[50.93,-135.81],[46.74,-136.98]]},{"c":"#553A2B","p":[[94.19,-176.74],[92.56,-176.74],[91.16,-175.35],[91.16,-173.26],[90.23,-171.63],[90.23,-168.6],[88.37,-164.19],[88.37,-161.16],[87.44,-159.53],[87.21,-156.74],[84.42,-151.16],[83.02,-149.77],[82.56,-148.37],[80.23,-146.05],[78.14,-141.86],[78.14,-140.7],[77.21,-139.07],[77.21,-136.51],[79.3,-134.42,1],[80.47,-135.12],[85.35,-144.88],[85.58,-146.74],[94.65,-165.35],[94.65,-170.23],[96.51,-174.42,1]]},{"c":"#1E1E1E","p":[[99.77,-204.88,1],[95.81,-204.88],[92.33,-203.26],[87.44,-201.86],[74.88,-195.58],[71.4,-193.26],[68.14,-189.77],[62.09,-185.81],[39.53,-166.28],[28.37,-159.3],[28.14,-157.67,1],[31.16,-156.28],[34.65,-156.74],[36.74,-157.91],[41.4,-157.91],[43.72,-159.3],[46.98,-159.77],[50.47,-161.4],[53.02,-163.95],[54.19,-164.19],[56.74,-166.74],[57.91,-166.98],[60.47,-169.53],[61.63,-169.77],[71.63,-179.77],[72.79,-180.0],[84.65,-191.86],[85.81,-192.09],[88.37,-194.65],[89.53,-194.88],[95.81,-200.23],[98.37,-201.4],[99.77,-201.4,1]]}]},"kop":{"c":"#804F31","basis":[[106.93,-220.18],[105.82,-218.92],[104.93,-217.32],[104.13,-214.86],[102.34,-211.75],[101.27,-208.55],[100.72,-207.87],[98.37,-207.62],[98.21,-207.43],[98.39,-205.77],[98.08,-205.3],[98.26,-203.64],[97.95,-203.17],[98.13,-201.51],[97.83,-201.03],[98.0,-199.37],[97.7,-198.9],[97.84,-197.59],[97.54,-197.12],[97.71,-195.46],[97.41,-194.99],[97.58,-193.33],[97.28,-192.85],[97.46,-191.19],[97.15,-190.72],[97.33,-189.06],[97.02,-188.59],[97.2,-186.93],[96.9,-186.46],[97.04,-185.15],[96.73,-184.67],[96.91,-183.01],[96.6,-182.54],[96.78,-180.88],[96.48,-180.41],[96.65,-178.75],[96.35,-178.28],[96.52,-176.62],[96.22,-176.14],[96.36,-174.83],[96.06,-174.36],[96.23,-172.7],[95.93,-172.23],[96.1,-170.57],[95.8,-170.09],[95.98,-168.44],[96.4,-167.77],[97.37,-166.99],[98.33,-167.09],[98.8,-166.79],[99.46,-167.21],[100.42,-167.32],[101.67,-166.39],[101.93,-166.42],[103.18,-165.49],[103.91,-165.21],[104.52,-165.28],[105.0,-164.97],[105.96,-165.08],[106.43,-164.77],[107.39,-164.87],[107.86,-164.57],[108.47,-164.64],[113.5,-160.58],[114.23,-160.3],[115.48,-159.37],[115.74,-159.4],[116.6,-158.79],[116.86,-158.81],[117.72,-158.2],[117.98,-158.23],[119.53,-156.98],[120.26,-156.7],[121.42,-155.76],[122.45,-155.25],[122.87,-154.59],[122.97,-153.63],[123.37,-153.23],[123.61,-150.88],[124.43,-149.81],[126.16,-148.5],[126.9,-148.22],[127.86,-148.32],[128.33,-148.02],[129.99,-148.19],[130.39,-148.59],[131.7,-148.73],[132.1,-149.12],[133.06,-149.23],[133.46,-149.62],[134.42,-149.72],[134.82,-150.12],[135.78,-150.22],[136.87,-151.57],[137.15,-152.31],[137.08,-152.92],[137.39,-153.39],[137.32,-154.0],[138.49,-156.33],[138.42,-156.94],[139.0,-158.15],[138.49,-162.96],[137.25,-164.68],[137.19,-165.29],[135.95,-167.01],[135.88,-167.62],[135.49,-168.02],[135.42,-168.63],[135.03,-169.03],[134.96,-169.64],[134.57,-170.04],[134.5,-170.66],[133.68,-171.72],[133.62,-172.33],[133.22,-172.73],[133.16,-173.34],[130.22,-177.71],[130.16,-178.32],[129.34,-179.38],[129.28,-179.99],[128.46,-181.05],[128.39,-181.66],[128.0,-182.06],[127.93,-182.67],[127.54,-183.07],[127.47,-183.69],[127.08,-184.09],[126.98,-185.05],[126.58,-185.45],[126.48,-186.41],[126.08,-186.81],[125.95,-188.11],[126.25,-188.59],[125.89,-191.99],[125.49,-192.39],[125.43,-193.0],[124.61,-194.07],[119.98,-197.81],[119.69,-200.52],[118.87,-201.58],[118.81,-202.19],[118.38,-202.85],[117.6,-203.57],[117.15,-204.49],[115.98,-205.51],[115.92,-206.12],[116.53,-206.98],[117.36,-209.19],[117.29,-209.8],[117.6,-210.28],[117.53,-210.89],[117.84,-211.36],[117.73,-212.32],[118.04,-212.79],[117.97,-213.41],[118.28,-213.88],[118.17,-214.84],[118.48,-215.31],[118.27,-217.32],[118.57,-217.79],[118.28,-220.5],[117.83,-220.63],[117.36,-220.05],[116.84,-218.32],[115.94,-216.72],[114.23,-214.6],[113.17,-213.78],[110.28,-210.21],[109.77,-209.18],[108.81,-209.08],[108.52,-209.32],[108.45,-209.93],[108.76,-210.4],[108.62,-211.71],[108.92,-212.18],[108.74,-213.84],[108.35,-214.24],[107.73,-220.09],[107.54,-220.25]],"lagen":[{"c":"#8A5737","p":[[128.78,-180.47],[127.97,-179.85],[126.28,-177.47],[124.53,-176.49],[124.05,-176.0],[123.76,-175.35],[124.45,-169.68],[126.34,-164.32],[127.15,-163.35],[128.04,-160.79],[128.76,-159.81],[129.12,-159.76],[129.78,-160.18],[131.27,-162.01],[132.19,-162.47],[132.89,-162.54],[134.17,-162.14],[135.94,-160.39],[136.66,-159.41],[137.04,-159.18],[137.56,-159.24],[138.06,-159.55],[138.76,-160.42],[138.48,-163.13],[138.12,-163.18],[138.05,-163.79],[137.69,-163.84],[137.63,-164.45],[137.27,-164.5],[137.17,-165.46],[136.81,-165.51],[136.75,-166.13],[136.39,-166.18],[136.32,-166.79],[135.96,-166.84],[135.86,-167.8],[135.5,-167.85],[135.4,-168.81],[135.04,-168.86],[134.94,-169.82],[134.58,-169.87],[134.48,-170.83],[134.12,-170.88],[134.06,-171.49],[133.7,-171.54],[133.6,-172.5],[133.24,-172.55],[133.14,-173.51],[132.78,-173.56],[132.72,-174.18],[132.36,-174.23],[132.29,-174.84],[131.94,-174.89],[131.87,-175.5],[131.51,-175.55],[131.45,-176.16],[131.09,-176.21],[131.02,-176.82],[130.67,-176.87],[130.6,-177.48],[130.24,-177.53],[130.14,-178.49],[129.78,-178.54],[129.72,-179.16],[129.36,-179.21],[129.26,-180.17],[129.0,-180.14]]},{"c":"#5C5148","p":[[121.75,-163.48],[120.92,-163.04],[120.44,-162.55],[121.7,-159.77],[121.91,-158.64],[122.38,-157.54],[122.53,-156.15],[122.24,-155.5],[122.43,-155.43],[122.49,-154.82],[122.85,-154.77],[122.99,-153.46],[123.35,-153.41],[123.63,-150.7],[123.99,-150.65],[124.06,-150.04],[124.32,-150.07],[124.44,-149.73],[124.7,-149.75],[124.83,-149.41],[125.09,-149.44],[125.21,-149.1],[125.48,-149.13],[125.6,-148.79],[125.96,-148.74],[125.99,-148.48],[126.6,-148.54],[126.72,-148.2],[127.86,-148.32],[128.24,-150.57],[129.97,-150.93],[130.58,-151.79],[130.31,-152.64],[130.19,-154.66],[129.95,-155.25],[129.91,-157.28],[130.6,-159.91],[131.52,-161.25],[132.53,-161.71],[132.98,-161.67],[133.37,-161.35],[133.33,-160.91],[132.94,-160.34],[133.1,-159.74],[136.13,-156.08],[136.55,-156.3],[138.22,-159.66],[137.57,-159.15],[137.05,-159.09],[136.57,-159.4],[134.56,-161.74],[133.89,-162.2],[132.9,-162.45],[132.2,-162.38],[131.27,-161.93],[129.79,-160.09],[129.13,-159.67],[128.77,-159.72],[128.18,-160.28],[127.06,-163.34],[126.26,-164.31],[123.46,-164.01]]},{"c":"#1D1B19","p":[[118.05,-218.53],[117.56,-218.13],[116.51,-216.34],[116.08,-213.74],[116.11,-212.68],[115.63,-210.51],[114.97,-209.2],[114.67,-207.94],[114.28,-207.45],[113.92,-207.5],[111.73,-208.95],[110.47,-209.26],[109.99,-209.56],[109.94,-209.2],[108.63,-209.06],[108.52,-209.32],[107.17,-206.17],[107.18,-205.29],[108.22,-203.81],[108.3,-203.02],[108.85,-202.02],[109.21,-200.29],[109.41,-200.05],[109.95,-199.93],[110.2,-198.46],[111.23,-197.86],[111.74,-198.09],[112.94,-199.19],[113.81,-199.37],[114.58,-200.42],[114.9,-201.52],[115.4,-201.83],[117.49,-200.46],[119.19,-198.53],[119.95,-198.08],[119.67,-200.69],[119.31,-200.75],[119.25,-201.36],[118.89,-201.41],[118.79,-202.37],[118.43,-202.42],[118.36,-203.03],[118.1,-203.0],[117.98,-203.34],[117.62,-203.39],[117.55,-204.0],[117.2,-204.05],[117.13,-204.66],[116.87,-204.64],[116.75,-204.98],[116.48,-204.95],[116.36,-205.29],[116.0,-205.34],[115.78,-206.55],[117.05,-209.6],[117.32,-211.22],[117.79,-212.59],[117.66,-213.9],[118.17,-215.72],[118.12,-217.04],[118.32,-217.68]]},{"c":"#6F442B","p":[[115.41,-201.75],[114.99,-201.52],[114.67,-200.43],[113.82,-199.28],[112.95,-199.1],[111.74,-198.0],[111.24,-197.77],[111.91,-196.43],[111.99,-195.65],[111.62,-194.99],[110.85,-194.73],[110.3,-194.94],[109.4,-195.99],[109.12,-196.93],[108.74,-197.16],[107.97,-196.98],[107.25,-196.29],[107.4,-194.01],[108.6,-193.52],[110.47,-193.36],[111.06,-192.81],[111.2,-190.62],[111.57,-190.48],[112.7,-190.6],[113.8,-190.27],[114.76,-189.49],[115.88,-187.32],[116.09,-188.66],[116.91,-190.07],[117.58,-190.41],[118.37,-190.49],[119.08,-190.39],[120.39,-189.73],[120.74,-189.77],[121.24,-190.88],[121.16,-191.58],[118.15,-194.18],[117.67,-195.36],[117.57,-196.32],[117.86,-196.97],[118.45,-197.21],[120.06,-197.03],[120.38,-197.33],[120.35,-197.59],[119.99,-197.64],[119.96,-197.99],[119.11,-198.52],[117.4,-200.45]]},{"c":"#543524","p":[[107.71,-220.27],[106.75,-220.16],[106.78,-219.9],[106.44,-219.78],[106.47,-219.52],[106.13,-219.39],[106.15,-219.13],[105.81,-219.01],[105.76,-218.65],[105.5,-218.62],[105.57,-218.01],[105.23,-217.88],[105.18,-217.53],[104.91,-217.5],[104.98,-216.89],[104.64,-216.76],[104.7,-216.15],[104.36,-216.03],[104.43,-215.42],[104.09,-215.29],[104.15,-214.68],[103.81,-214.56],[103.76,-214.2],[103.5,-214.17],[103.57,-213.56],[103.23,-213.44],[103.25,-213.17],[103.0,-213.06],[103.48,-211.87],[103.17,-209.81],[103.28,-207.88],[103.09,-207.24],[103.19,-206.28],[103.55,-205.35],[103.51,-204.11],[103.05,-203.44],[102.96,-202.64],[103.26,-202.23],[104.3,-201.63],[105.0,-201.7],[105.65,-201.33],[106.41,-201.68],[107.51,-202.94],[107.84,-203.15],[108.2,-203.1],[108.13,-203.8],[107.21,-205.03],[107.03,-205.89],[108.51,-209.4],[108.43,-210.1],[108.77,-210.23],[108.6,-211.88],[108.94,-212.01],[108.72,-212.43],[108.59,-213.65],[108.73,-214.02],[108.37,-214.07]]},{"c":"#6F442B","p":[[112.98,-173.77],[112.48,-173.54],[111.93,-172.86],[110.67,-170.61],[110.28,-169.24],[110.78,-168.76],[110.85,-168.07],[110.54,-167.68],[109.72,-167.86],[108.84,-167.06],[108.78,-166.79],[109.26,-165.6],[109.82,-165.31],[110.33,-165.45],[110.4,-164.75],[110.94,-163.84],[115.49,-160.08],[117.35,-160.01],[118.48,-161.02],[118.3,-161.88],[119.34,-162.87],[119.39,-163.23],[118.34,-164.88],[115.64,-166.98],[114.45,-168.27],[113.8,-169.35],[113.74,-169.96],[114.09,-170.79],[114.57,-171.28],[116.61,-172.03],[116.89,-172.68],[116.2,-173.4],[115.65,-173.61]]},{"c":"#8A5737","p":[[108.12,-203.09],[107.28,-202.65],[106.42,-201.59],[105.66,-201.24],[104.83,-199.92],[102.93,-197.86],[102.53,-196.67],[100.77,-194.1],[99.33,-190.16],[98.38,-189.08],[97.01,-188.76],[97.12,-187.71],[99.67,-187.81],[101.79,-188.65],[102.51,-189.34],[102.34,-191.71],[102.94,-192.75],[103.45,-192.98],[106.32,-193.37],[107.23,-193.91],[107.15,-196.37],[106.83,-196.86],[106.7,-198.09],[107.31,-199.03],[107.75,-198.99],[108.14,-198.68],[108.79,-197.51],[109.18,-197.2],[109.98,-197.2],[110.45,-197.69],[110.1,-197.65],[109.86,-199.92],[109.42,-199.96],[109.12,-200.29],[108.76,-202.01]]},{"c":"#39322D","p":[[138.8,-160.07],[138.3,-159.76],[137.89,-158.65],[136.4,-156.02],[135.95,-156.15],[135.72,-156.66],[133.54,-158.9],[132.87,-160.24],[132.67,-159.6],[132.73,-158.99],[133.8,-157.25],[133.86,-156.73],[133.4,-156.06],[132.53,-155.88],[131.53,-155.33],[131.09,-155.37],[130.27,-156.43],[130.11,-157.92],[129.92,-156.4],[130.28,-154.67],[130.4,-152.65],[130.67,-151.8],[129.98,-150.84],[128.25,-150.48],[127.92,-148.59],[128.16,-148.0],[130.16,-148.21],[130.22,-148.57],[131.87,-148.75],[131.92,-149.11],[133.23,-149.24],[133.28,-149.6],[134.59,-149.74],[134.64,-150.1],[135.95,-150.24],[135.93,-150.5],[136.27,-150.62],[136.24,-150.89],[136.58,-151.01],[136.63,-151.37],[136.89,-151.4],[136.83,-152.01],[137.17,-152.13],[137.07,-153.09],[137.41,-153.22],[137.3,-154.18],[137.64,-154.3],[137.58,-154.91],[137.92,-155.04],[137.97,-155.4],[138.23,-155.42],[138.17,-156.03],[138.51,-156.16],[138.41,-157.12],[138.75,-157.24],[138.68,-157.85],[139.02,-157.98]]},{"c":"#543524","p":[[96.05,-174.45],[96.25,-172.53],[95.91,-172.4],[96.12,-170.39],[95.78,-170.27],[96.0,-168.26],[96.35,-168.21],[96.42,-167.6],[96.68,-167.63],[96.81,-167.29],[97.16,-167.24],[97.19,-166.97],[98.5,-167.11],[98.63,-166.77],[99.24,-166.84],[99.29,-167.2],[100.6,-167.33],[100.72,-166.99],[100.98,-167.02],[101.11,-166.68],[101.47,-166.63],[101.49,-166.37],[102.1,-166.43],[102.23,-166.09],[102.49,-166.12],[102.61,-165.78],[102.97,-165.73],[103.0,-165.47],[103.61,-165.53],[103.74,-165.19],[104.7,-165.3],[104.82,-164.96],[106.13,-165.09],[106.25,-164.75],[107.56,-164.89],[107.69,-164.55],[108.65,-164.66],[108.77,-164.31],[109.04,-164.34],[109.16,-164.0],[109.42,-164.03],[109.55,-163.69],[109.81,-163.72],[109.93,-163.38],[110.19,-163.41],[110.32,-163.07],[110.58,-163.09],[110.7,-162.75],[110.97,-162.78],[111.09,-162.44],[111.35,-162.47],[111.48,-162.13],[111.74,-162.16],[111.86,-161.82],[112.13,-161.84],[112.25,-161.5],[112.51,-161.53],[112.64,-161.19],[112.9,-161.22],[113.02,-160.88],[113.28,-160.91],[113.41,-160.57],[113.77,-160.52],[113.79,-160.25],[114.41,-160.32],[114.53,-159.98],[114.79,-160.01],[114.92,-159.67],[115.27,-159.62],[115.3,-159.35],[115.91,-159.42],[116.04,-159.08],[116.4,-159.03],[116.42,-158.77],[117.03,-158.83],[117.16,-158.49],[117.52,-158.44],[117.55,-158.18],[118.16,-158.24],[118.28,-157.9],[118.54,-157.93],[118.67,-157.59],[118.93,-157.62],[119.05,-157.28],[119.31,-157.31],[119.44,-156.97],[119.8,-156.92],[119.83,-156.65],[120.44,-156.72],[120.56,-156.38],[120.82,-156.41],[120.95,-156.07],[121.31,-156.02],[121.33,-155.75],[122.14,-155.66],[122.37,-155.95],[122.29,-157.53],[121.82,-158.63],[121.62,-159.76],[120.45,-162.46],[120.05,-162.86],[119.51,-162.98],[118.39,-161.89],[118.57,-161.02],[117.61,-160.04],[117.1,-159.9],[115.5,-159.99],[110.86,-163.83],[110.32,-164.74],[110.24,-165.44],[109.83,-165.22],[109.17,-165.59],[109.01,-166.28],[108.59,-166.86],[107.98,-166.79],[106.97,-166.33],[105.84,-166.21],[103.23,-166.64],[100.99,-167.82],[98.32,-170.54],[97.58,-171.69],[96.84,-173.65],[96.52,-174.14]]},{"c":"#6F442B","p":[[109.85,-185.0],[110.0,-184.49],[110.94,-183.08],[114.23,-179.55],[115.74,-178.56],[116.47,-178.37],[116.81,-178.5],[117.1,-179.06],[116.43,-182.87],[115.64,-185.35],[113.67,-185.67],[112.73,-185.31],[111.42,-185.17],[110.26,-185.31]]},{"c":"#8A5737","p":[[100.83,-206.03],[99.62,-204.93],[98.17,-204.43],[98.28,-203.46],[97.94,-203.34],[98.15,-201.33],[97.81,-201.21],[98.02,-199.2],[97.68,-199.08],[97.86,-197.42],[97.52,-197.29],[97.64,-196.16],[98.27,-196.05],[99.3,-196.25],[100.03,-196.94],[100.45,-197.96],[101.26,-202.01],[102.26,-204.24],[101.6,-205.41]]},{"c":"#1D1B19","p":[[107.05,-218.17],[106.46,-217.93],[105.78,-216.8],[104.74,-213.33],[104.06,-208.93],[104.45,-205.18],[104.75,-204.86],[105.26,-205.09],[105.86,-207.71],[107.07,-209.6],[107.59,-211.42],[107.61,-212.84],[107.42,-214.67],[107.18,-215.27]]},{"c":"#8A5737","p":[[105.06,-190.23],[103.08,-188.96],[102.94,-188.6],[103.11,-187.02],[104.6,-184.62],[105.64,-183.94],[106.97,-183.9],[108.94,-185.26],[108.58,-186.99],[107.77,-187.96],[107.7,-188.66],[105.97,-189.98]]},{"c":"#1D1B19","p":[[108.26,-187.57],[109.17,-186.43],[110.43,-185.41],[110.97,-185.3],[112.72,-185.39],[114.48,-186.28],[114.44,-186.72],[113.56,-188.39],[112.62,-189.71],[111.71,-189.17],[111.01,-189.1],[110.53,-189.49],[110.39,-189.91],[109.79,-189.76],[109.22,-189.35],[109.2,-188.64],[108.55,-188.13]]},{"c":"#6F442B","p":[[103.39,-204.36],[102.27,-204.15],[101.34,-202.02],[101.08,-200.32],[101.8,-198.54],[102.75,-197.93],[103.09,-198.06],[104.51,-199.62],[105.58,-201.23],[105.28,-201.56],[104.31,-201.54],[102.98,-202.37],[102.83,-202.98],[103.35,-203.91]]},{"c":"#1D1B19","p":[[132.99,-161.58],[132.46,-161.61],[131.53,-161.16],[130.42,-159.19],[130.14,-157.66],[130.23,-156.78],[130.68,-155.86],[131.26,-155.39],[133.39,-156.15],[133.77,-156.72],[133.71,-157.24],[132.65,-158.98],[132.63,-159.95],[133.31,-161.08]]},{"c":"#E8DDD4","p":[[118.03,-196.99],[117.66,-196.33],[118.03,-194.52],[118.54,-193.87],[121.24,-191.68],[121.43,-193.2],[121.32,-194.25],[120.94,-195.36],[119.89,-196.92],[118.46,-197.12]]},{"c":"#39322D","p":[[110.7,-190.3],[110.5,-189.75],[111.0,-189.18],[111.7,-189.26],[112.61,-189.8],[113.33,-188.9],[114.53,-186.73],[114.57,-186.29],[113.75,-185.68],[115.81,-185.45],[116.08,-186.19],[115.79,-187.31],[115.35,-188.14],[114.36,-189.1],[114.19,-189.87],[113.81,-190.19],[112.71,-190.51]]},{"c":"#1D1B19","p":[[100.95,-208.25],[100.9,-207.89],[98.19,-207.61],[98.4,-205.6],[98.06,-205.47],[98.17,-204.51],[99.61,-205.02],[100.66,-205.92],[101.11,-207.56]]},{"c":"#39322D","p":[[118.26,-220.68],[117.65,-220.61],[117.68,-220.35],[117.34,-220.23],[117.4,-219.61],[117.06,-219.49],[117.13,-218.88],[116.79,-218.75],[116.85,-218.14],[116.51,-218.02],[116.46,-217.66],[116.2,-217.63],[116.51,-216.43],[117.86,-218.6],[118.34,-218.3],[118.32,-217.59],[118.59,-217.62]]},{"c":"#39322D","p":[[117.73,-212.32],[117.14,-209.61],[115.89,-206.39],[116.24,-206.42],[116.21,-206.69],[116.55,-206.81],[116.49,-207.42],[116.83,-207.55],[116.76,-208.16],[117.1,-208.28],[117.04,-208.89],[117.38,-209.02],[117.28,-209.98],[117.62,-210.1],[117.51,-211.06],[117.85,-211.19]]},{"c":"#39322D","p":[[109.13,-189.34],[108.35,-189.17],[107.79,-188.67],[107.86,-187.97],[108.16,-187.65],[108.54,-188.22],[109.12,-188.63]]}]},"staart":{"c":"#7C4B2E","basis":[[-71.16,-148.84,1],[-76.51,-146.98],[-82.33,-141.4],[-85.35,-136.51],[-88.14,-128.14],[-90.23,-117.91],[-90.23,-114.88],[-91.16,-112.33],[-91.16,-107.44],[-93.95,-96.51],[-93.02,-89.77],[-97.67,-67.67],[-97.67,-61.86],[-99.53,-54.65],[-99.53,-52.56],[-97.67,-49.07],[-97.67,-43.26],[-98.6,-40.7],[-98.37,-36.98],[-95.35,-34.88],[-94.65,-32.33],[-93.49,-31.16],[-85.35,-30.0],[-84.19,-29.3],[-83.72,-25.58],[-85.35,-18.6,1],[-79.3,-18.6,1],[-75.81,-74.65],[-72.09,-112.56],[-66.28,-141.16]],"lagen":[{"c":"#1E1E1E","p":[[-72.33,-148.84,1],[-77.21,-146.74],[-82.56,-141.4],[-85.58,-136.28],[-85.58,-135.12],[-88.37,-127.91],[-88.37,-124.88],[-89.3,-123.26],[-89.3,-120.23],[-90.23,-118.6],[-90.23,-114.65],[-91.16,-113.02],[-91.16,-107.21],[-92.09,-105.58],[-92.09,-103.49],[-93.02,-101.86],[-93.02,-98.84],[-93.95,-97.21],[-93.95,-92.79],[-93.02,-91.16],[-93.02,-89.53],[-93.95,-87.91],[-93.95,-83.95],[-94.88,-82.33],[-94.88,-79.3],[-95.81,-77.67],[-95.81,-74.65],[-96.74,-73.02],[-96.74,-70.0],[-97.67,-68.37],[-97.67,-61.63],[-98.6,-60.0],[-98.6,-56.98],[-99.53,-55.35],[-99.53,-51.86],[-97.67,-48.37],[-97.67,-43.02],[-98.6,-41.4],[-98.6,-36.98],[-95.81,-34.65],[-93.95,-31.16,1],[-90.47,-30.93],[-88.84,-30.0],[-86.98,-29.77],[-84.65,-28.14],[-83.72,-25.35],[-84.65,-23.72],[-84.65,-20.7],[-85.58,-19.07],[-85.58,-16.51],[-82.09,-12.79],[-81.16,-10.93],[-80.93,-4.42],[-79.77,-3.26,1],[-76.98,-3.95],[-72.79,-6.05],[-72.09,-6.98,1],[-74.42,-10.7],[-74.65,-12.56],[-75.58,-14.19],[-75.58,-26.05],[-74.65,-27.67],[-74.42,-35.12],[-73.02,-37.21],[-70.7,-37.91],[-67.67,-37.21],[-66.28,-35.12],[-66.05,-31.4],[-65.12,-29.77],[-65.12,-15.58],[-63.26,-13.49],[-61.86,-13.02],[-60.7,-11.86],[-59.53,-9.3],[-59.3,-4.88],[-58.37,-4.19],[-55.58,-4.88],[-51.4,-6.98],[-50.7,-7.91,1],[-53.95,-11.63],[-55.81,-15.35],[-56.05,-20.0],[-56.98,-21.63],[-56.98,-27.44],[-57.91,-29.07],[-57.91,-48.37],[-56.98,-50.0],[-56.74,-51.86],[-55.12,-54.65],[-55.12,-57.67],[-54.42,-59.3,1],[-56.98,-61.4],[-57.21,-62.33],[-58.84,-63.95],[-60.7,-65.12],[-61.63,-66.74],[-62.79,-66.98],[-67.21,-65.12],[-68.84,-65.12],[-73.72,-66.98],[-75.58,-70.0],[-75.58,-71.63],[-74.65,-73.26],[-74.65,-74.42],[-73.72,-76.05],[-71.63,-83.49],[-70.93,-84.42],[-70.93,-94.42],[-72.79,-98.84],[-72.79,-100.93],[-73.72,-102.56],[-73.72,-104.65],[-75.58,-109.07],[-75.58,-111.16],[-76.28,-112.09],[-76.51,-114.88],[-77.44,-116.51],[-77.44,-122.33],[-78.37,-123.95],[-78.37,-127.44],[-77.44,-129.07],[-77.44,-133.95],[-76.51,-135.58],[-76.28,-137.44],[-74.42,-141.16],[-70.93,-145.81],[-70.93,-147.44]]}]}},"tonen":["#1E1E1E","#8E5837","#553A2B","#7C4B2E"],"oog":[112.21,-188.6],"K":1.075,"omtrek":[[117.44,-213.02],[113.72,-215.58,1],[104.42,-205.58],[94.65,-204.19],[75.12,-195.35],[39.77,-166.05],[22.79,-155.58],[10.7,-152.56],[2.09,-152.56],[-33.02,-159.07],[-41.63,-159.07],[-63.02,-153.26],[-76.51,-146.98],[-82.33,-141.4],[-85.35,-136.51],[-90.23,-117.91],[-91.16,-107.44],[-93.95,-96.51],[-93.02,-89.77],[-97.67,-67.67],[-99.53,-52.56],[-97.67,-49.07],[-98.37,-36.98,1],[-95.35,-34.88],[-93.49,-31.16,1],[-85.35,-30.0],[-83.72,-28.37],[-85.58,-17.21],[-80.93,-10.0],[-81.86,-1.63],[-81.16,0.93,1],[-68.14,0.93,1],[-75.58,-14.42],[-75.58,-25.81],[-73.72,-42.56],[-71.16,-50.0],[-69.07,-51.4,1],[-66.98,-49.77],[-66.05,-43.49],[-65.12,-16.28],[-60.0,-10.47],[-59.77,-2.09],[-55.58,0.7],[-47.91,0.7],[-46.28,-0.47,1],[-56.05,-16.28],[-57.91,-29.3],[-57.91,-48.14],[-53.26,-64.19],[-50.7,-68.37],[-47.44,-80.7],[-43.95,-88.6],[-38.37,-97.67,1],[-33.72,-97.67],[-29.53,-100.7],[-25.12,-100.23],[-15.58,-95.35],[-0.7,-90.47],[38.6,-88.84,1],[39.07,-77.67],[38.14,-75.12],[37.21,-44.19],[32.56,-22.09],[33.02,-17.67],[37.21,-10.93],[36.51,-2.56],[39.3,-0.23],[50.0,-0.93,1],[41.63,-16.28],[42.56,-37.91],[47.44,-53.95],[48.84,-54.88,1],[50.0,-53.95],[52.09,-46.28],[51.16,-18.14],[57.21,-9.53],[56.98,-0.7],[59.77,1.63],[69.3,1.63],[70.93,0.47,1],[70.47,-2.09],[63.02,-11.63],[61.4,-15.35],[59.3,-37.91],[62.09,-55.35],[62.09,-68.6],[66.74,-93.72],[72.79,-99.77],[76.74,-108.37],[77.91,-129.07],[93.72,-163.95],[96.28,-166.51],[102.56,-167.67],[110.0,-165.81],[113.95,-162.09],[117.44,-161.16],[122.33,-157.44],[126.98,-151.86],[133.26,-151.86],[136.51,-155.12],[139.3,-161.63],[133.72,-173.49],[129.07,-179.3],[122.56,-192.09],[116.05,-199.77],[116.05,-204.19],[118.84,-210.93,1]],"neusgat":[134.88,-162.79],"mond":[[120.93,-156.28],[133.02,-154.42]],"keelweb":{"p":[[99.87,-167.76,1],[99.88,-167.76,1],[98.73,-198.34,1],[98.72,-198.34,1]],"kop":[0,1,1,0]}},"ezel":{"J":{"midrug":[0.0,-109.25],"nekBasis":[52.38,-87.55],"lend":[-18.71,-110.0],"kruis":[-37.41,-105.51],"kop":[67.35,-126.46],"neus":[92.79,-92.79],"kaak":[69.59,-104.01],"kin":[86.05,-91.29],"schoft":[29.93,-100.27],"schouder":[48.64,-74.08],"elleboog":[32.93,-59.12],"pols":[32.18,-29.18],"vkogel":[32.18,-8.23],"vteen":[39.66,0.0],"heup":[-35.92,-83.81],"knie":[-26.94,-68.84],"hak":[-44.9,-32.93],"akogel":[-46.39,-10.48],"ateen":[-40.41,0.0],"staart0":[-49.39,-94.29],"staart1":[-52.38,-74.08],"staart2":[-54.63,-56.87],"staart3":[-56.87,-41.9],"staart4":[-58.37,-28.44]},"delen":{"romp":{"c":"#7D726D","basis":[[-46.39,-101.39],[-46.21,-92.6],[-47.14,-87.93],[-47.14,-76.51],[-45.27,-75.02],[-43.4,-67.16],[-43.4,-57.99],[-41.9,-56.68],[-41.9,-55.75],[-40.22,-54.06],[-39.29,-54.06],[-37.23,-52.57],[-34.05,-52.57],[-33.49,-51.82],[-31.8,-51.82],[-31.24,-52.57],[-28.06,-52.57],[-27.5,-53.32],[-26.56,-53.32],[-25.44,-54.25],[-20.77,-62.11],[-18.52,-63.79],[-17.02,-63.61],[-8.04,-58.74],[2.43,-56.31],[9.35,-56.31],[11.41,-57.06],[14.59,-57.06],[19.64,-58.55],[22.64,-58.55],[24.88,-56.31],[25.82,-56.31],[26.38,-55.56],[29.56,-55.56],[30.12,-54.81],[32.55,-54.81],[33.11,-55.56],[36.29,-55.56],[36.85,-56.31],[37.79,-56.31],[40.22,-57.99],[40.97,-60.8],[46.21,-67.35],[49.39,-74.64],[51.45,-77.82,1],[20.2,-108.69,1],[16.84,-107.76],[9.17,-107.76],[7.11,-108.5],[1.68,-108.5],[-0.37,-109.25],[-3.55,-109.25],[-14.59,-111.5],[-17.77,-111.5],[-22.07,-112.99],[-26.75,-112.99],[-36.11,-110.0],[-41.16,-106.63]],"lagen":[{"c":"#BEB5AD","p":[[-22.45,-69.22],[-22.45,-67.16],[-20.39,-63.42,1],[-18.33,-63.61],[-17.59,-63.04],[-16.09,-62.86],[-7.86,-58.55],[-6.92,-58.55],[-5.61,-57.81],[-3.93,-57.81],[-2.62,-57.06],[0.56,-57.06],[1.87,-56.31],[9.91,-56.31],[11.22,-57.06],[15.15,-57.06],[15.9,-57.62],[18.15,-57.81],[19.46,-58.55],[22.64,-58.55],[24.51,-60.43],[24.51,-64.73],[22.64,-66.6],[18.33,-66.6],[17.02,-65.85],[5.24,-65.85],[3.93,-66.6],[0.75,-66.6],[-0.56,-67.35],[-2.99,-67.35],[-4.3,-68.1],[-5.99,-68.1],[-7.3,-68.84],[-8.98,-68.84],[-10.29,-69.59],[-14.03,-70.53],[-17.77,-72.59],[-20.2,-72.4],[-21.51,-71.09]]}]},"hum":{"c":"#7D726D","basis":[[20.2,-104.57,1],[22.45,-64.73],[26.56,-57.06,1],[39.85,-57.06,1],[40.97,-60.8],[46.21,-67.35],[49.39,-74.64],[51.63,-78.38,1],[31.24,-105.88,1]],"lagen":[]},"dij":{"c":"#7D726D","basis":[[-40.22,-107.19],[-46.77,-101.02],[-48.27,-98.96],[-46.21,-92.6],[-49.01,-76.14,1],[-46.39,-76.33],[-45.27,-75.02],[-44.34,-71.65,1],[-31.8,-69.59],[-24.88,-64.17,1],[-18.71,-67.53],[-12.72,-107.19,1]],"lagen":[]},"nek":{"c":"#7D726D","basis":[[60.8,-139.0,1],[58.93,-136.56],[56.87,-135.82],[51.26,-130.77],[45.65,-127.59],[29.0,-113.37],[22.82,-109.44],[17.4,-107.94,1],[17.4,-97.47],[31.43,-67.35,1],[46.21,-67.35,1],[49.95,-75.77],[58.18,-87.55],[60.05,-91.29],[61.36,-92.6],[63.79,-92.98],[64.73,-93.72,1],[66.22,-92.98,1],[66.04,-98.03]],"lagen":[{"c":"#262120","p":[[59.86,-136.56],[59.3,-136.75],[56.87,-136.0],[52.01,-131.14],[47.89,-129.27],[46.77,-128.15],[45.65,-127.77],[41.53,-123.66],[40.41,-123.28],[36.29,-119.17],[35.17,-118.79],[31.8,-115.43],[30.68,-115.05],[28.81,-113.18],[27.69,-112.81],[24.88,-110.75],[24.69,-108.32],[26.0,-106.82],[27.5,-103.83],[27.69,-102.52,1],[31.43,-101.02,1],[31.24,-102.89],[30.49,-104.2],[30.49,-107.01],[31.43,-109.06],[32.36,-110.0],[33.86,-110.19],[35.73,-111.12],[38.35,-113.74],[39.47,-114.12],[42.84,-117.48],[43.96,-117.86],[50.32,-123.47],[51.45,-123.84],[53.32,-125.71],[54.44,-126.09],[55.56,-127.21],[56.68,-127.59],[59.49,-129.64],[60.43,-131.51],[60.43,-135.82]]},{"c":"#262120","p":[[60.99,-138.06,1],[60.05,-138.06],[58.74,-136.75],[56.68,-136.0],[51.07,-130.95],[45.46,-127.77],[31.8,-115.8],[22.82,-109.81,1],[22.82,-108.13],[23.57,-107.38],[24.51,-107.19],[26.19,-105.51],[26.38,-103.83],[27.31,-102.33],[31.8,-100.83,1],[31.8,-103.64],[30.31,-106.26],[30.49,-107.76],[31.43,-108.69],[35.36,-110.37],[36.67,-111.68],[37.6,-111.87],[42.65,-116.92],[43.59,-117.11],[45.65,-119.17],[46.58,-119.35],[50.14,-122.91],[51.07,-123.1],[53.13,-125.15],[54.06,-125.34],[55.37,-126.65],[56.31,-126.84],[57.62,-128.15],[58.55,-128.33],[60.24,-130.02],[60.24,-131.14],[60.99,-132.26]]}]},"kop":{"c":"#7C716C","basis":[[73.46,-165.87],[72.84,-165.49],[72.84,-165.31],[71.84,-164.0],[71.84,-163.56],[70.59,-161.25],[70.59,-160.82],[69.84,-159.76],[69.84,-159.32],[69.59,-159.01],[69.59,-158.57],[69.35,-158.26],[69.35,-157.82],[68.85,-156.83],[67.85,-155.77],[67.85,-155.33],[64.11,-148.03],[64.11,-147.6],[63.61,-147.04],[63.61,-146.6],[63.36,-146.29],[63.36,-145.85],[62.86,-145.04],[62.86,-144.6],[62.61,-144.29],[62.61,-143.86],[62.11,-143.3],[62.11,-142.86],[61.86,-142.55],[61.86,-142.11],[61.61,-141.8],[61.61,-141.36],[61.36,-141.05],[61.36,-140.12],[61.11,-139.8],[61.11,-138.12],[60.87,-137.81],[60.87,-136.37],[60.62,-136.06],[60.55,-135.31],[60.43,-135.25],[59.99,-135.44],[59.87,-135.13],[59.43,-134.75],[58.68,-135.19],[58.25,-135.19],[57.44,-135.94],[57.0,-135.94],[56.87,-135.81],[56.87,-135.13],[56.63,-134.82],[56.63,-134.13],[55.94,-133.44],[55.5,-133.44],[55.0,-133.69],[54.63,-133.32],[54.63,-132.88],[54.38,-132.57],[54.38,-131.39],[54.63,-131.07],[54.63,-128.89],[54.88,-128.58],[54.88,-126.65],[55.13,-126.34],[55.13,-124.15],[55.38,-123.84],[55.38,-121.66],[55.63,-121.35],[55.63,-119.16],[55.88,-118.85],[55.88,-116.92],[56.13,-116.61],[56.13,-114.43],[56.38,-114.11],[56.38,-111.93],[56.63,-111.62],[56.63,-109.44],[56.87,-109.13],[56.87,-106.94],[57.12,-106.63],[57.12,-104.7],[57.37,-104.39],[57.37,-102.2],[57.62,-101.89],[57.62,-99.71],[57.87,-99.4],[57.87,-97.47],[58.12,-97.15],[58.12,-94.97],[58.37,-94.66],[58.37,-93.97],[58.87,-93.16],[59.24,-92.85],[59.93,-92.85],[60.18,-92.67],[60.49,-92.85],[61.18,-92.85],[61.49,-93.1],[62.99,-95.35],[63.67,-95.35],[64.23,-94.85],[64.42,-94.85],[65.48,-94.1],[65.92,-94.1],[66.23,-93.85],[66.91,-93.85],[67.41,-93.6],[68.91,-92.1],[69.41,-91.85],[70.47,-90.86],[70.65,-90.86],[71.22,-90.36],[71.4,-90.36],[72.21,-89.61],[72.4,-89.61],[72.96,-89.11],[73.65,-88.86],[74.46,-88.11],[75.95,-87.37],[76.39,-87.37],[77.58,-86.18],[78.57,-84.0],[79.7,-82.88],[80.38,-82.63],[80.94,-82.13],[81.38,-82.13],[81.69,-81.88],[82.13,-81.88],[82.44,-81.63],[82.88,-81.63],[83.19,-81.38],[83.87,-81.38],[84.37,-81.13],[84.68,-81.38],[85.37,-81.38],[85.93,-81.88],[86.37,-81.88],[86.68,-82.13],[87.37,-82.13],[87.68,-82.38],[88.36,-82.38],[89.42,-83.13],[89.73,-83.5],[89.73,-83.69],[90.48,-84.5],[90.48,-84.68],[91.23,-85.74],[91.23,-86.18],[91.98,-87.24],[91.98,-87.68],[92.23,-87.99],[92.23,-88.43],[92.48,-88.74],[92.48,-89.17],[92.73,-89.49],[92.73,-90.92],[92.98,-91.23],[92.98,-93.66],[92.23,-94.72],[92.23,-95.41],[91.48,-96.72],[91.48,-97.4],[89.98,-100.21],[89.98,-100.65],[88.99,-102.64],[88.49,-103.2],[88.49,-103.64],[86.74,-106.94],[86.74,-107.38],[86.24,-108.19],[86.24,-108.63],[85.49,-109.94],[85.49,-110.37],[85.25,-110.69],[85.25,-111.12],[84.75,-111.93],[84.75,-112.37],[84.5,-112.68],[84.5,-113.37],[84.0,-114.18],[84.0,-114.86],[83.75,-115.17],[83.75,-118.35],[83.25,-119.35],[82.5,-120.16],[82.5,-120.35],[81.75,-121.16],[81.5,-121.66],[80.76,-122.41],[80.76,-122.59],[80.01,-123.4],[79.76,-123.9],[78.76,-124.9],[78.51,-125.4],[75.95,-127.96],[74.89,-128.7],[74.71,-128.7],[74.27,-129.14],[74.27,-129.58],[74.52,-130.08],[75.77,-131.64],[75.77,-132.07],[76.52,-132.88],[76.52,-133.32],[77.01,-133.88],[77.26,-134.38],[77.26,-134.82],[78.01,-135.88],[78.01,-136.31],[78.76,-137.37],[78.76,-137.81],[79.01,-138.31],[79.51,-138.87],[79.51,-139.55],[80.26,-140.61],[80.26,-141.3],[81.01,-142.61],[81.01,-143.3],[81.5,-144.11],[81.5,-144.54],[81.75,-144.85],[81.75,-146.29],[82.0,-146.6],[82.0,-147.54],[82.25,-147.85],[82.25,-148.53],[82.5,-148.84],[82.5,-151.28],[82.75,-151.59],[82.75,-153.27],[83.0,-153.58],[83.0,-154.02],[82.81,-154.33],[83.0,-154.58],[83.0,-155.27],[83.25,-155.58],[83.25,-156.26],[83.5,-156.58],[83.5,-158.76],[83.75,-159.07],[83.75,-160.26],[84.0,-160.57],[84.0,-163.75],[83.37,-164.62],[82.69,-164.62],[82.06,-164.0],[81.82,-163.5],[81.82,-163.06],[81.32,-162.5],[79.57,-158.82],[79.07,-158.26],[78.57,-157.26],[78.57,-156.83],[78.07,-156.26],[77.08,-154.27],[77.08,-153.08],[76.83,-152.77],[76.83,-151.84],[75.89,-150.9],[75.21,-150.9],[74.83,-150.53],[74.83,-150.34],[74.33,-149.78],[73.83,-148.66],[73.65,-148.53],[73.52,-148.66],[73.52,-149.78],[73.27,-150.09],[73.27,-151.03],[73.52,-151.34],[73.52,-152.27],[73.77,-152.59],[73.77,-153.02],[74.27,-153.33],[74.52,-153.83],[74.52,-154.52],[74.77,-154.83],[74.77,-159.76],[75.02,-160.07],[75.02,-164.74],[74.77,-165.24],[74.15,-165.87]],"lagen":[{"c":"#CDC4BD","p":[[88.43,-102.64],[87.24,-102.33],[86.12,-101.77],[84.37,-100.58],[83.37,-99.65],[82.75,-98.71],[80.88,-95.16],[79.82,-94.04],[78.51,-93.1],[77.76,-92.35],[77.14,-91.29],[76.89,-90.3],[76.89,-87.43],[77.76,-86.37],[77.95,-85.49],[78.39,-84.56],[80.01,-82.94],[80.44,-82.69],[81.32,-82.44],[81.88,-82.44],[82.44,-83.56],[81.82,-85.43],[81.82,-85.93],[81.13,-86.93],[81.19,-87.05],[81.5,-86.87],[82.0,-85.99],[82.25,-85.99],[83.69,-84.75],[84.0,-84.62],[84.5,-84.62],[85.0,-84.81],[86.12,-85.68],[86.31,-86.12],[86.18,-86.93],[85.18,-88.11],[84.62,-89.67],[84.68,-91.11],[85.0,-91.92],[85.43,-92.42],[85.68,-92.48],[85.93,-92.23],[86.06,-91.17],[86.55,-90.61],[87.18,-91.73],[88.05,-92.6],[88.36,-92.67],[88.67,-92.54],[89.49,-91.67],[90.17,-91.67],[91.23,-91.92],[91.85,-92.54],[92.29,-93.23],[92.35,-94.54],[91.92,-95.28],[91.67,-96.53],[91.48,-96.59],[91.48,-96.84],[91.11,-97.22],[90.61,-98.15],[90.23,-99.65],[89.67,-100.52],[89.61,-101.02],[89.24,-101.89]]},{"c":"#655C57","p":[[70.97,-155.27],[70.47,-155.08],[70.59,-154.77],[70.22,-154.14],[69.97,-154.27],[69.35,-153.52],[68.97,-153.46],[68.66,-153.96],[68.66,-155.27],[68.53,-155.39],[68.22,-155.33],[67.97,-155.08],[66.79,-152.46],[67.29,-152.52],[68.78,-152.34],[69.72,-153.83],[69.91,-153.83],[70.16,-153.46],[70.09,-152.77],[69.47,-151.09],[69.41,-149.72],[68.35,-145.35],[67.41,-139.18],[66.98,-135.56],[67.1,-134.44],[67.47,-133.82],[67.91,-133.94],[68.35,-134.63],[69.59,-137.93],[70.47,-139.55],[70.97,-142.17],[72.84,-144.6],[73.83,-147.22],[73.9,-147.97],[73.21,-147.35],[72.77,-147.72],[72.84,-148.03],[72.65,-148.22],[72.4,-148.97],[72.34,-151.09],[72.03,-151.9],[72.03,-152.77],[71.71,-153.4],[71.4,-154.77]]},{"c":"#CDC4BD","p":[[69.16,-114.99],[68.78,-114.11],[68.78,-113.62],[69.1,-112.8],[69.91,-111.93],[71.53,-110.75],[73.46,-109.94],[76.27,-109.44],[77.58,-108.88],[78.26,-108.88],[78.89,-109.44],[79.26,-110.81],[79.26,-112.18],[79.01,-113.18],[77.95,-114.99],[77.2,-115.98],[76.2,-116.92],[74.96,-117.36],[74.08,-117.36],[72.65,-117.04],[70.53,-116.23],[69.97,-115.86]]},{"c":"#241D1A","p":[[74.27,-165.87],[73.34,-165.87],[73.27,-165.62],[72.84,-165.62],[72.84,-165.18],[72.59,-165.12],[72.52,-164.87],[72.34,-164.87],[72.34,-164.43],[72.09,-164.37],[72.03,-164.12],[71.84,-164.12],[71.84,-163.43],[71.59,-163.37],[71.59,-162.94],[71.34,-162.87],[71.34,-162.44],[71.09,-162.37],[71.09,-161.94],[70.84,-161.88],[70.84,-161.44],[70.59,-161.38],[70.59,-160.69],[70.34,-160.63],[70.28,-160.38],[70.09,-160.38],[70.09,-159.94],[69.84,-159.88],[69.84,-159.19],[69.59,-159.13],[69.59,-158.45],[69.35,-158.38],[69.35,-157.7],[69.1,-157.64],[69.1,-157.2],[68.85,-157.14],[68.85,-156.7],[68.6,-156.64],[69.16,-156.08],[69.28,-155.33],[69.59,-155.02],[70.22,-155.14],[70.65,-155.7],[71.03,-155.83],[71.59,-155.77],[71.84,-155.52],[72.28,-154.33],[72.21,-152.46],[72.46,-151.9],[72.46,-148.97],[72.71,-148.22],[73.02,-147.97],[73.65,-147.97],[74.08,-148.47],[74.27,-149.41],[74.08,-149.41],[74.08,-148.97],[73.83,-148.91],[73.83,-148.47],[73.52,-148.47],[73.52,-149.9],[73.27,-149.97],[73.27,-151.15],[73.52,-151.21],[73.52,-152.4],[73.77,-152.46],[73.77,-153.15],[74.27,-153.21],[74.27,-153.65],[74.52,-153.71],[74.52,-154.64],[74.77,-154.71],[74.77,-159.88],[75.02,-159.94],[75.02,-164.87],[74.77,-164.93],[74.77,-165.37],[74.58,-165.37],[74.52,-165.62],[74.27,-165.68]]},{"c":"#241D1A","p":[[83.5,-164.62],[82.56,-164.62],[82.56,-164.43],[82.31,-164.37],[82.25,-164.12],[82.06,-164.12],[82.06,-163.68],[81.82,-163.62],[81.82,-162.94],[81.57,-162.87],[81.5,-162.62],[81.32,-162.62],[81.32,-162.19],[81.07,-162.13],[81.07,-161.69],[80.82,-161.63],[80.82,-161.19],[80.57,-161.13],[80.57,-160.69],[80.32,-160.63],[80.32,-160.19],[80.07,-160.13],[80.07,-159.69],[79.82,-159.63],[79.82,-159.2],[79.57,-159.13],[79.57,-158.7],[79.32,-158.63],[79.26,-158.38],[79.07,-158.38],[79.07,-157.95],[78.82,-157.89],[78.82,-157.45],[78.57,-157.39],[78.57,-156.7],[78.32,-156.64],[78.26,-156.39],[78.07,-156.39],[78.07,-155.95],[77.82,-155.89],[77.82,-155.45],[77.58,-155.39],[77.58,-154.96],[77.33,-154.89],[77.33,-154.46],[77.08,-154.39],[77.08,-152.96],[76.83,-152.9],[76.83,-151.71],[76.58,-151.65],[76.58,-151.46],[76.33,-151.4],[76.33,-151.21],[76.08,-151.15],[76.02,-150.9],[75.08,-150.9],[75.08,-150.72],[74.83,-150.65],[74.83,-150.47],[78.14,-151.4],[78.88,-151.46],[79.45,-151.84],[80.26,-151.96],[81.25,-153.08],[81.69,-153.96],[83.0,-154.08],[82.75,-154.21],[82.75,-154.39],[83.0,-154.46],[83.0,-155.39],[83.25,-155.45],[83.25,-156.39],[83.5,-156.45],[83.5,-158.88],[83.75,-158.95],[83.75,-160.38],[84.0,-160.44],[84.0,-163.87],[83.75,-163.93],[83.75,-164.37],[83.56,-164.37]]},{"c":"#484443","p":[[92.73,-94.29],[92.54,-94.29],[92.48,-94.54],[92.35,-94.47],[92.48,-93.29],[92.42,-92.42],[91.85,-91.92],[90.98,-91.48],[89.8,-91.42],[88.67,-92.48],[88.36,-92.6],[87.8,-92.35],[88.36,-92.17],[88.61,-91.92],[89.8,-89.73],[89.8,-87.8],[89.49,-87.24],[89.24,-87.12],[88.86,-87.18],[87.8,-87.74],[86.87,-88.55],[86.8,-90.67],[87.3,-91.79],[86.62,-90.61],[86.74,-88.92],[87.12,-87.61],[86.49,-87.43],[86.24,-87.18],[86.37,-86.12],[86.18,-85.68],[85.0,-84.75],[84.5,-84.56],[84.0,-84.56],[83.69,-84.68],[82.25,-85.93],[81.88,-85.87],[81.88,-85.43],[82.56,-83.37],[83.06,-82.81],[84.0,-82.13],[83.87,-81.94],[80.44,-82.63],[80.01,-82.88],[78.57,-84.25],[78.57,-83.87],[78.76,-83.87],[78.82,-83.62],[79.01,-83.62],[79.07,-83.37],[79.26,-83.37],[79.32,-83.13],[79.57,-83.06],[79.57,-82.88],[80.01,-82.88],[80.07,-82.63],[80.51,-82.63],[80.57,-82.38],[80.82,-82.31],[80.82,-82.13],[81.5,-82.13],[81.57,-81.88],[82.25,-81.88],[82.31,-81.63],[83.0,-81.63],[83.06,-81.38],[84.0,-81.38],[84.06,-81.13],[84.5,-81.13],[84.56,-81.38],[85.49,-81.38],[85.49,-81.57],[85.74,-81.63],[85.81,-81.88],[86.49,-81.88],[86.55,-82.13],[87.49,-82.13],[87.55,-82.38],[88.49,-82.38],[88.49,-82.56],[88.74,-82.63],[88.8,-82.88],[89.24,-82.88],[89.24,-83.06],[89.49,-83.13],[89.55,-83.37],[89.73,-83.37],[89.73,-83.81],[89.98,-83.87],[89.98,-84.06],[90.23,-84.12],[90.3,-84.37],[90.48,-84.37],[90.48,-84.81],[90.73,-84.87],[90.79,-85.12],[90.98,-85.12],[90.98,-85.56],[91.23,-85.62],[91.23,-86.31],[91.48,-86.37],[91.54,-86.62],[91.73,-86.62],[91.73,-87.05],[91.98,-87.12],[91.98,-87.8],[92.23,-87.86],[92.23,-88.55],[92.48,-88.61],[92.48,-89.3],[92.73,-89.36],[92.73,-91.04],[92.98,-91.11],[92.98,-93.79],[92.73,-93.85]]},{"c":"#CDC4BD","p":[[68.78,-151.34],[68.16,-149.97],[66.98,-145.91],[66.04,-141.74],[65.48,-138.06],[65.11,-134.13],[63.67,-128.27],[63.61,-126.09],[63.73,-125.52],[64.11,-125.21],[64.48,-125.28],[65.11,-125.71],[66.85,-127.46],[67.35,-128.14],[67.91,-129.52],[67.6,-130.14],[66.79,-131.07],[66.73,-132.38],[66.98,-136.37],[68.16,-144.6],[69.41,-150.09],[69.41,-151.09]]},{"c":"#A89E96","p":[[82.06,-153.21],[81.63,-153.02],[80.63,-151.71],[80.07,-150.03],[79.26,-148.66],[79.13,-147.35],[78.64,-145.66],[78.82,-145.79],[79.13,-145.66],[79.13,-144.73],[78.64,-143.79],[78.26,-143.48],[78.01,-143.67],[76.89,-140.18],[75.33,-136.75],[75.52,-136.75],[75.71,-136.5],[76.08,-135.13],[76.52,-134.13],[77.45,-135.63],[79.45,-139.55],[79.51,-140.18],[80.51,-142.48],[80.88,-144.04],[81.32,-144.98],[81.38,-145.66],[81.69,-146.41],[81.63,-147.1],[82.13,-149.22],[82.19,-150.03],[82.5,-150.4],[82.5,-151.4],[82.75,-151.46],[82.75,-151.9],[82.5,-152.09]]},{"c":"#241D1A","p":[[60.62,-136.0],[60.62,-135.25],[60.37,-135.19],[60.3,-135.44],[59.87,-135.44],[59.87,-135.0],[59.62,-134.94],[59.56,-134.69],[59.37,-134.69],[59.31,-134.94],[58.87,-134.94],[58.81,-135.19],[58.12,-135.19],[58.06,-135.44],[57.87,-135.44],[57.81,-135.69],[57.56,-135.75],[57.56,-135.94],[56.87,-135.94],[56.87,-135.0],[56.63,-134.94],[56.63,-134.0],[56.38,-133.94],[56.38,-133.76],[56.13,-133.69],[56.06,-133.44],[55.38,-133.44],[55.32,-133.69],[54.88,-133.69],[54.88,-133.51],[54.63,-133.44],[54.63,-132.76],[54.38,-132.7],[54.38,-131.26],[54.63,-131.2],[54.63,-128.77],[54.88,-128.7],[54.88,-127.33],[55.32,-127.4],[57.12,-128.52],[58.5,-129.08],[59.81,-130.14],[59.93,-130.45],[59.87,-131.64],[60.24,-132.45],[60.24,-133.01],[60.68,-134.82]]},{"c":"#241D1A","p":[[70.41,-114.3],[70.41,-113.93],[70.72,-113.43],[72.09,-112.24],[72.96,-111.81],[75.46,-111.74],[76.2,-111.93],[76.95,-111.43],[77.26,-111.43],[77.58,-111.68],[77.7,-111.99],[77.64,-112.87],[76.95,-114.05],[75.46,-115.42],[74.71,-115.92],[74.08,-115.98],[73.02,-115.67],[71.53,-114.86],[70.72,-114.68]]},{"c":"#655C57","p":[[59.24,-99.96],[59.0,-99.52],[59.06,-95.35],[58.68,-93.35],[58.87,-93.29],[58.87,-93.1],[59.12,-93.04],[59.12,-92.85],[60.06,-92.85],[60.12,-92.6],[60.3,-92.6],[60.37,-92.85],[61.3,-92.85],[61.3,-93.04],[61.55,-93.1],[61.99,-94.29],[62.61,-94.85],[62.8,-94.85],[62.8,-95.28],[63.55,-95.35],[63.24,-95.85],[60.87,-98.15],[59.62,-99.9]]},{"c":"#A89E96","p":[[70.65,-139.55],[70.41,-139.43],[69.66,-137.93],[68.29,-134.38],[67.97,-133.94],[67.66,-133.76],[67.72,-133.13],[67.47,-132.76],[67.29,-132.76],[67.16,-132.94],[67.41,-133.82],[67.04,-134.44],[66.98,-135.5],[66.79,-131.26],[67.04,-130.76],[67.66,-130.14],[67.91,-129.58],[69.1,-131.64],[69.16,-132.13],[69.72,-133.57],[69.72,-134.07],[70.28,-135.5],[70.47,-137.06],[71.03,-138.74],[70.97,-139.24]]},{"c":"#CDC4BD","p":[[75.52,-136.69],[75.27,-136.69],[74.83,-136.0],[72.77,-131.82],[72.65,-131.2],[72.71,-130.51],[72.96,-130.08],[73.34,-129.83],[73.96,-129.76],[74.58,-130.26],[76.33,-133.19],[76.45,-134.13]]},{"c":"#484443","p":[[71.59,-155.7],[70.78,-155.7],[70.22,-155.08],[69.59,-154.95],[69.28,-155.2],[69.16,-155.95],[68.72,-156.45],[68.35,-156.39],[68.35,-156.2],[68.1,-156.14],[68.04,-155.89],[67.85,-155.89],[67.85,-155.2],[67.6,-155.14],[67.6,-154.71],[67.35,-154.64],[67.35,-154.21],[67.1,-154.14],[67.1,-153.71],[66.85,-153.65],[66.85,-153.21],[66.6,-153.15],[66.6,-152.71],[66.35,-152.65],[66.35,-152.21],[66.1,-152.15],[66.1,-151.71],[65.85,-151.65],[65.85,-151.21],[65.6,-151.15],[65.6,-150.72],[65.35,-150.65],[65.35,-150.22],[65.11,-150.15],[65.11,-149.72],[64.86,-149.66],[64.86,-149.22],[64.61,-149.16],[64.61,-148.72],[64.36,-148.66],[64.36,-148.22],[64.11,-148.16],[64.11,-147.47],[63.86,-147.41],[63.8,-147.16],[63.61,-147.16],[63.61,-146.48],[63.36,-146.41],[63.36,-145.73],[63.11,-145.66],[63.11,-145.23],[62.86,-145.17],[62.86,-144.48],[62.61,-144.42],[62.61,-143.73],[62.36,-143.67],[62.3,-143.42],[62.11,-143.42],[62.11,-142.73],[61.86,-142.67],[61.86,-141.99],[61.61,-141.92],[61.61,-141.24],[61.36,-141.18],[61.36,-139.99],[61.11,-139.93],[61.11,-138.0],[60.87,-137.93],[60.87,-136.25],[60.62,-136.19],[60.74,-134.82],[60.3,-133.01],[60.3,-132.45],[59.93,-131.64],[59.99,-130.45],[59.87,-130.2],[60.43,-131.2],[60.43,-132.7],[61.05,-135.31],[61.11,-136.25],[61.36,-136.94],[61.36,-138.99],[61.61,-139.68],[61.61,-140.24],[61.99,-141.67],[63.36,-144.85],[63.92,-146.66],[65.23,-149.41],[65.35,-149.9],[66.23,-151.28],[67.91,-155.08],[68.35,-155.45],[68.72,-155.27],[68.72,-153.96],[68.97,-153.52],[69.35,-153.58],[69.66,-153.9],[70.53,-155.2],[70.97,-155.33],[71.28,-155.08],[71.59,-154.46],[71.78,-153.4],[72.09,-152.77],[72.09,-151.9],[72.34,-151.15],[72.4,-151.9],[72.15,-152.46],[72.21,-154.33],[71.96,-155.14]]},{"c":"#241D1A","p":[[87.74,-92.23],[87.37,-91.85],[86.87,-90.67],[86.87,-88.74],[87.18,-88.24],[87.99,-87.68],[89.24,-87.18],[89.55,-87.37],[89.73,-87.8],[89.73,-89.73],[88.55,-91.92],[88.11,-92.23]]},{"c":"#484443","p":[[74.52,-130.14],[74.02,-129.76],[74.15,-128.95],[75.14,-128.33],[75.83,-127.52],[76.83,-126.96],[77.26,-126.09],[78.26,-125.03],[79.07,-124.4],[79.38,-123.72],[80.13,-123.03],[80.88,-121.72],[82.81,-119.66],[83.5,-117.36],[83.5,-115.67],[83.75,-113.99],[84.37,-112.62],[84.81,-111.06],[85.18,-110.37],[85.31,-109.56],[86.8,-106.13],[87.99,-104.14],[88.43,-102.7],[89.24,-101.96],[89.24,-102.27],[88.99,-102.33],[88.99,-102.77],[88.8,-102.77],[88.74,-103.02],[88.49,-103.08],[88.49,-103.76],[88.24,-103.83],[88.24,-104.26],[87.99,-104.33],[87.99,-104.76],[87.74,-104.82],[87.74,-105.26],[87.49,-105.32],[87.49,-105.76],[87.24,-105.82],[87.24,-106.26],[86.99,-106.32],[86.99,-106.76],[86.74,-106.82],[86.74,-107.51],[86.49,-107.57],[86.49,-108.0],[86.24,-108.07],[86.24,-108.75],[85.99,-108.81],[85.99,-109.25],[85.74,-109.31],[85.74,-109.75],[85.49,-109.81],[85.49,-110.5],[85.25,-110.56],[85.25,-111.25],[85.0,-111.31],[85.0,-111.75],[84.75,-111.81],[84.75,-112.49],[84.5,-112.56],[84.5,-113.49],[84.25,-113.55],[84.25,-113.99],[84.0,-114.05],[84.0,-114.99],[83.75,-115.05],[83.75,-118.48],[83.5,-118.54],[83.5,-118.98],[83.25,-119.04],[83.25,-119.48],[83.06,-119.48],[83.0,-119.73],[82.81,-119.73],[82.75,-119.98],[82.5,-120.04],[82.5,-120.47],[82.31,-120.47],[82.25,-120.72],[82.07,-120.72],[82.0,-120.97],[81.75,-121.04],[81.75,-121.47],[81.57,-121.47],[81.5,-121.72],[81.32,-121.72],[81.25,-121.97],[81.07,-121.97],[81.01,-122.22],[80.76,-122.28],[80.76,-122.72],[80.57,-122.72],[80.51,-122.97],[80.32,-122.97],[80.26,-123.22],[80.01,-123.28],[80.01,-123.72],[79.82,-123.72],[79.76,-123.97],[79.57,-123.97],[79.51,-124.22],[79.32,-124.22],[79.26,-124.46],[79.07,-124.46],[79.01,-124.71],[78.76,-124.78],[78.76,-125.21],[78.57,-125.21],[78.51,-125.46],[78.32,-125.46],[78.26,-125.71],[78.07,-125.71],[78.01,-125.96],[77.83,-125.96],[77.76,-126.21],[77.58,-126.21],[77.51,-126.46],[77.33,-126.46],[77.26,-126.71],[77.08,-126.71],[77.01,-126.96],[76.83,-126.96],[76.77,-127.21],[76.58,-127.21],[76.52,-127.46],[76.33,-127.46],[76.27,-127.71],[76.08,-127.71],[76.02,-127.96],[75.77,-128.02],[75.77,-128.21],[75.33,-128.21],[75.27,-128.46],[75.02,-128.52],[75.02,-128.7],[74.58,-128.7],[74.52,-128.95],[74.27,-129.02],[74.27,-129.7],[74.52,-129.76]]},{"c":"#484443","p":[[83.0,-154.02],[81.69,-153.9],[81.32,-153.08],[80.26,-151.9],[79.45,-151.78],[78.88,-151.4],[78.14,-151.34],[74.83,-150.4],[74.83,-150.22],[74.58,-150.15],[74.4,-149.78],[74.08,-148.35],[75.02,-149.47],[76.33,-150.65],[77.64,-150.65],[80.01,-151.34],[80.57,-151.65],[81.88,-153.27],[82.25,-153.08],[82.44,-152.34],[82.75,-151.96],[82.75,-153.4],[83.0,-153.46]]},{"c":"#484443","p":[[82.5,-150.34],[82.25,-150.03],[82.19,-149.22],[81.69,-147.1],[81.75,-146.41],[81.44,-145.66],[81.38,-144.98],[80.94,-144.04],[80.57,-142.48],[79.57,-140.18],[79.51,-139.55],[77.51,-135.63],[76.52,-134.07],[76.33,-133.01],[75.83,-132.26],[76.02,-132.26],[76.02,-132.45],[76.27,-132.51],[76.33,-132.76],[76.52,-132.76],[76.52,-133.44],[76.77,-133.51],[76.83,-133.76],[77.01,-133.76],[77.01,-134.19],[77.26,-134.25],[77.26,-134.94],[77.51,-135.0],[77.51,-135.44],[77.76,-135.5],[77.83,-135.75],[78.01,-135.75],[78.01,-136.44],[78.26,-136.5],[78.26,-136.94],[78.51,-137.0],[78.57,-137.25],[78.76,-137.25],[78.76,-137.93],[79.01,-138.0],[79.01,-138.43],[79.26,-138.49],[79.32,-138.74],[79.51,-138.74],[79.51,-139.68],[79.76,-139.74],[79.82,-139.99],[80.01,-139.99],[80.01,-140.43],[80.26,-140.49],[80.26,-141.42],[80.51,-141.49],[80.51,-141.92],[80.76,-141.99],[80.76,-142.42],[81.01,-142.48],[81.0,-143.42],[81.25,-143.48],[81.25,-143.92],[81.5,-143.98],[81.5,-144.67],[81.75,-144.73],[81.75,-146.41],[82.0,-146.48],[82.0,-147.66],[82.25,-147.72],[82.25,-148.66],[82.5,-148.72]]},{"c":"#484443","p":[[70.84,-135.69],[70.53,-135.69],[70.28,-135.44],[69.78,-134.07],[69.78,-133.63],[70.53,-133.76],[70.9,-133.38],[70.65,-132.63],[70.59,-131.76],[70.22,-131.39],[69.66,-131.51],[69.35,-132.07],[69.47,-132.82],[69.16,-131.64],[69.66,-131.2],[70.28,-131.2],[70.72,-131.39],[71.15,-132.07],[71.22,-134.82],[71.09,-135.44]]},{"c":"#484443","p":[[68.35,-92.73],[68.35,-92.6],[68.6,-92.54],[68.6,-92.35],[68.85,-92.29],[68.85,-92.1],[69.1,-92.04],[69.1,-91.85],[69.53,-91.85],[69.59,-91.61],[69.78,-91.61],[69.84,-91.36],[70.03,-91.36],[70.09,-91.11],[70.34,-91.04],[70.34,-90.86],[70.78,-90.86],[70.84,-90.61],[71.09,-90.55],[71.09,-90.36],[71.53,-90.36],[71.59,-90.11],[71.78,-90.11],[71.84,-89.86],[72.09,-89.8],[72.09,-89.61],[72.53,-89.61],[72.59,-89.36],[72.84,-89.3],[72.84,-89.11],[73.27,-89.11],[73.34,-88.86],[73.77,-88.86],[73.83,-88.61],[74.02,-88.61],[74.08,-88.36],[74.33,-88.3],[74.33,-88.11],[74.77,-88.11],[74.83,-87.86],[75.27,-87.86],[75.33,-87.61],[75.77,-87.61],[75.83,-87.37],[76.52,-87.37],[76.58,-87.12],[76.77,-87.12],[76.83,-86.87],[77.01,-86.87],[77.08,-86.62],[77.26,-86.62],[77.33,-86.37],[77.58,-86.31],[77.58,-85.87],[77.83,-85.81],[77.83,-85.37],[77.95,-85.37],[77.7,-86.37],[76.77,-87.49],[75.71,-87.8],[74.58,-88.61],[73.59,-89.05],[72.9,-89.67],[71.71,-90.23],[71.34,-90.67],[69.84,-91.54],[69.16,-92.29]]},{"c":"#241D1A","p":[[70.53,-133.69],[69.84,-133.63],[69.59,-133.19],[69.41,-132.07],[69.59,-131.64],[69.91,-131.45],[70.22,-131.45],[70.53,-131.76],[70.59,-132.63],[70.84,-133.19],[70.78,-133.51]]}]},"staart":{"c":"#7D726D","basis":[[-48.45,-98.59,1],[-50.7,-94.85],[-51.63,-91.85],[-51.63,-88.67],[-52.38,-86.62],[-52.38,-75.95],[-53.13,-73.89],[-53.13,-71.46],[-55.75,-61.36],[-58.74,-56.31],[-58.55,-52.76],[-59.68,-47.7,1],[-57.81,-45.83],[-57.62,-41.53],[-56.31,-39.85,1],[-55.0,-40.22],[-52.94,-43.78],[-52.38,-61.73],[-49.57,-73.71],[-46.39,-92.6]],"lagen":[{"c":"#262120","p":[[-49.95,-90.54,1],[-51.45,-89.8],[-51.82,-87.93],[-52.38,-87.18],[-52.38,-75.77],[-53.13,-74.46],[-53.13,-71.28],[-53.88,-69.97],[-53.88,-68.28],[-54.63,-66.97],[-54.63,-65.29],[-55.37,-63.98],[-55.37,-62.3],[-57.06,-58.74],[-58.18,-57.62],[-59.12,-55.75],[-58.37,-53.32],[-59.12,-52.01],[-59.12,-50.32],[-59.86,-49.01],[-59.86,-47.7],[-57.81,-44.71],[-57.62,-40.97],[-55.94,-39.29,1],[-55.0,-39.85],[-53.32,-43.59],[-52.38,-44.34],[-51.07,-44.52],[-49.57,-46.21],[-49.57,-48.27],[-50.32,-49.57],[-50.32,-50.88],[-49.57,-52.19],[-49.57,-74.08],[-48.83,-75.77],[-46.58,-77.64],[-46.58,-81.19],[-47.14,-81.94],[-47.33,-84.18],[-48.08,-85.49],[-48.08,-87.93],[-49.01,-89.8]]}]},"kruis":{"c":"#262120","basis":[[27.31,-102.52,1],[27.87,-101.96],[28.06,-100.27],[28.62,-99.71],[28.81,-98.03],[29.37,-97.47],[29.56,-95.78],[30.12,-95.22],[30.31,-93.54],[30.87,-92.98],[31.05,-91.29],[31.8,-90.17],[31.8,-89.05],[32.74,-88.11],[32.74,-86.62],[33.3,-86.05],[34.61,-86.05],[35.17,-86.62],[35.17,-87.93],[34.61,-88.49],[34.61,-90.73],[33.86,-91.85],[33.86,-94.47],[33.11,-95.6],[33.11,-97.47],[32.55,-98.03],[32.36,-99.71],[31.62,-100.83]],"lagen":[]}},"tonen":["#7D726D","#262120","#BEB5AD","#524D4D"],"oog":[73.34,-113.74],"K":1.3363636363636364,"omtrek":[[83.25,-164.63,1],[78.76,-163.32],[75.95,-163.88],[73.71,-165.94,1],[70.34,-162.01],[60.24,-137.87],[51.26,-130.77],[45.65,-127.59],[31.99,-115.61],[22.82,-109.44],[16.84,-107.76],[9.17,-107.76],[-17.77,-111.5],[-22.07,-112.99],[-26.75,-112.99],[-36.11,-110.0],[-41.16,-106.63],[-46.77,-101.02],[-49.39,-97.47],[-51.63,-91.85],[-53.13,-71.46],[-55.75,-61.36],[-58.74,-56.31],[-59.68,-47.7],[-57.81,-45.83],[-57.62,-41.53],[-56.68,-40.03],[-55.37,-39.85,1],[-52.38,-44.15,1],[-50.88,-42.84],[-49.39,-27.5],[-49.39,-10.85],[-45.83,-6.92],[-45.65,-2.62],[-44.34,0.0,1],[-36.29,0.56],[-33.49,-0.94],[-27.31,-0.94],[-25.82,-2.06,1],[-27.5,-8.23],[-31.24,-12.16],[-32.18,-14.59],[-34.61,-33.49],[-30.87,-45.09],[-20.77,-62.11],[-18.52,-63.79,1],[-8.04,-58.74],[2.43,-56.31],[9.35,-56.31],[19.64,-58.55],[23.57,-57.99,1],[23.95,-43.03],[22.45,-37.98],[23.2,-25.07],[21.14,-11.6],[22.26,-8.98],[24.51,-7.11],[24.69,-1.87],[26.56,0.37],[34.05,0.56],[36.48,-1.5],[42.47,-2.24,1],[40.6,-8.23],[36.48,-13.84],[34.98,-26.56],[37.23,-37.04],[37.23,-46.96],[40.97,-60.8],[46.21,-67.35],[49.95,-75.77],[61.36,-92.6],[64.73,-93.72],[68.28,-92.98],[76.7,-86.99],[80.44,-82.5],[84.74,-81.19],[89.42,-83.25],[92.6,-88.11],[92.6,-93.91],[84.37,-112.06],[83.62,-118.61],[76.14,-128.52],[76.14,-132.82],[79.13,-138.25],[82.13,-147.23],[84.37,-163.5]],"neusgat":[87.55,-89.8],"mond":[[78.57,-85.31],[88.3,-83.81]],"keelweb":{"p":[[63.63,-93.21,1],[63.64,-93.21,1],[61.43,-131.41,1],[61.42,-131.41,1]],"kop":[0,1,1,0]}},"muilezel":{"J":{"midrug":[0.0,-130.0],"nekBasis":[54.47,-105.31],"lend":[-21.79,-130.73],"kruis":[-43.58,-127.09],"kop":[90.78,-156.15],"neus":[117.65,-112.57],"kaak":[92.96,-130.73],"kin":[110.39,-114.02],"schoft":[32.68,-117.65],"schouder":[54.47,-87.88],"elleboog":[42.12,-68.99],"pols":[42.12,-36.31],"vkogel":[42.85,-10.89],"vteen":[49.39,0.0],"heup":[-39.94,-94.41],"knie":[-27.6,-77.71],"hak":[-43.58,-41.4],"akogel":[-40.67,-10.89],"ateen":[-33.41,0.0],"staart0":[-56.65,-116.2],"staart1":[-61.01,-90.78],"staart2":[-63.91,-68.99],"staart3":[-65.36,-50.84],"staart4":[-66.82,-32.68]},"delen":{"romp":{"c":"#7D5845","basis":[[-51.56,-121.83],[-51.56,-113.66],[-50.84,-110.03],[-53.02,-98.04],[-53.02,-88.78],[-49.39,-77.53],[-49.39,-70.81],[-48.66,-70.27],[-48.66,-69.36],[-47.21,-68.09],[-47.21,-67.18,1],[-42.67,-64.09],[-38.85,-64.09],[-38.31,-63.37],[-36.68,-63.37],[-36.13,-64.09],[-32.32,-64.09],[-31.77,-64.82],[-30.87,-64.82],[-29.59,-66.27],[-28.69,-66.27,1],[-27.42,-69.72],[-21.24,-80.07],[-19.97,-81.34],[-18.34,-81.16],[-13.98,-77.89],[-7.08,-74.44],[-2.0,-72.81],[1.63,-72.08],[4.72,-72.08],[6.72,-71.35],[11.98,-71.35],[13.98,-72.08],[17.79,-72.08],[19.79,-72.81],[22.15,-72.81],[24.15,-73.53],[28.69,-74.08],[30.87,-72.99],[31.41,-70.63,1],[32.32,-70.63],[33.59,-69.18],[34.5,-69.18],[35.04,-68.45],[38.85,-68.45],[39.4,-67.72],[41.76,-67.72],[42.3,-68.45],[46.12,-68.45],[46.66,-69.18],[47.57,-69.18],[48.84,-70.63],[49.75,-70.63],[50.66,-71.54],[51.2,-74.26],[56.1,-78.62],[57.74,-81.7],[60.46,-90.78,1],[59.19,-91.15],[21.42,-127.28],[11.8,-127.09],[9.8,-127.82],[5.27,-127.82],[-16.34,-132.18],[-18.7,-132.18],[-20.7,-132.91],[-23.78,-132.91],[-26.69,-133.63],[-28.69,-132.91],[-31.77,-132.91],[-39.04,-130.54],[-43.03,-128.55],[-50.11,-123.83]],"lagen":[{"c":"#26201D","p":[[-21.06,-84.61],[-21.61,-84.79],[-23.78,-83.52],[-23.97,-82.61],[-23.24,-81.7],[-20.88,-81.52],[-20.15,-82.07],[-19.97,-82.61]]},{"c":"#A68B78","p":[[-21.61,-85.52],[-20.15,-82.97],[-17.43,-80.25],[-16.34,-79.89],[-14.53,-78.07],[-6.9,-74.26],[-5.99,-74.26],[-2.54,-72.81],[-0.18,-72.81],[1.09,-72.08],[4.9,-72.08],[6.17,-71.35],[12.53,-71.35],[13.8,-72.08],[18.34,-72.08],[19.61,-72.81],[22.7,-72.81],[23.97,-73.53],[26.33,-73.53],[27.6,-74.26],[29.96,-73.53,1],[31.05,-74.62],[31.05,-79.53],[30.14,-81.34],[28.51,-82.79],[26.51,-82.79],[24.33,-81.52],[22.88,-81.34],[21.61,-80.61],[19.97,-80.61],[18.7,-79.89],[14.89,-79.89],[14.16,-79.34],[13.25,-79.34],[12.53,-79.89],[7.26,-79.89],[5.99,-80.61],[2.91,-80.61],[1.63,-81.34],[0.0,-81.34],[-1.27,-82.07],[-2.91,-82.07],[-4.18,-82.79],[-5.63,-82.97],[-7.81,-84.25],[-9.26,-84.43],[-12.89,-86.61],[-16.16,-89.87],[-17.97,-90.78],[-18.88,-90.6],[-20.15,-89.33]]}]},"hum":{"c":"#7D5845","basis":[[21.24,-122.56,1],[29.59,-76.08],[34.68,-66.63,1],[49.75,-66.63,1],[50.84,-73.72],[56.47,-79.16],[57.74,-81.7],[60.46,-90.78,1],[58.83,-91.51],[34.13,-124.19,1]],"lagen":[]},"dij":{"c":"#7D5845","basis":[[-51.75,-122.19],[-53.38,-120.38,1],[-50.84,-110.75],[-54.11,-90.06,1],[-53.02,-89.15],[-50.47,-81.34,1],[-33.41,-78.62],[-25.6,-72.44,1],[-20.52,-80.98],[-18.7,-81.34],[-17.43,-80.43,1],[-12.35,-122.19,1]],"lagen":[]},"nek":{"c":"#7D5845","basis":[[84.61,-157.78,1],[76.62,-155.24],[71.72,-152.51],[66.09,-151.06],[55.2,-144.89],[53.74,-143.25],[51.38,-142.71],[46.3,-140.17],[35.22,-132.36],[29.05,-128.91],[20.7,-127.09],[17.97,-127.09,1],[17.97,-114.39],[34.13,-79.89,1],[56.83,-79.89,1],[59.19,-86.06],[60.28,-90.6],[61.55,-93.14],[72.81,-106.22],[81.52,-118.38],[82.79,-119.65],[85.88,-120.56],[88.97,-119.83,1]],"lagen":[{"c":"#473932","p":[[84.43,-124.01,1],[82.97,-122.74],[82.79,-121.1],[83.88,-120.01],[85.15,-120.01],[86.24,-121.1],[86.24,-122.37]]},{"c":"#26201D","p":[[86.06,-157.6,1],[85.15,-158.14],[79.71,-156.15],[78.8,-156.15],[77.53,-155.42],[76.62,-155.42],[75.17,-154.15],[73.35,-153.78],[72.26,-152.7],[70.81,-152.51],[69.54,-151.79],[67.91,-151.79],[67.18,-151.24],[65.36,-150.88],[64.27,-149.79],[62.46,-149.43],[59.19,-146.89],[57.74,-146.7],[56.28,-145.43],[55.2,-145.07],[53.38,-143.25],[51.93,-143.07],[43.58,-138.53],[41.76,-136.72],[40.67,-136.35],[39.58,-135.27],[34.13,-132.0],[33.41,-131.09],[33.41,-129.64],[40.49,-124.55,1],[40.67,-126.91],[42.3,-129.27],[45.94,-130.18],[49.2,-131.82],[51.02,-133.63],[53.56,-134.72],[54.65,-135.81],[57.19,-136.9],[58.28,-137.99],[60.82,-139.08],[61.91,-140.17],[64.46,-141.26],[65.54,-142.35],[70.99,-144.89],[72.08,-145.98],[81.89,-150.7],[82.97,-151.79],[85.52,-152.88],[86.24,-153.78]]},{"c":"#26201D","p":[[84.79,-157.96,1],[76.44,-155.42],[71.54,-152.7],[65.91,-151.24],[62.28,-149.43],[59.19,-147.25],[57.19,-146.52],[55.01,-145.07],[53.56,-143.44],[51.2,-142.89],[46.12,-140.35],[39.4,-135.45],[31.96,-130.73,1],[31.96,-130.36],[39.76,-124.73],[41.03,-124.19,1],[41.03,-126.73],[40.49,-127.82,1],[41.4,-128.73],[43.39,-129.64],[46.66,-129.64],[48.11,-130.36],[49.39,-131.63],[50.29,-131.82],[53.74,-134.54],[56.1,-135.45],[57.37,-136.72],[59.73,-137.63],[61.01,-138.9],[63.37,-139.8],[64.64,-141.08],[68.45,-142.71],[69.72,-143.98],[79.34,-148.52],[80.61,-149.79],[85.34,-151.97,1]]}]},"kop":{"c":"#7D5845","basis":[[96.11,-179.39],[95.87,-178.85],[94.9,-177.82],[94.66,-177.15],[94.17,-176.61],[94.17,-176.43],[93.44,-175.64],[91.99,-172.55],[91.51,-172.01],[91.51,-171.58],[89.81,-168.38],[89.81,-167.95],[89.09,-166.68],[89.09,-166.26],[88.84,-165.96],[88.84,-165.53],[88.36,-164.74],[88.36,-164.32],[87.88,-163.53],[87.88,-163.11],[87.63,-162.81],[87.63,-162.14],[87.39,-161.84],[87.39,-161.42],[87.15,-161.11],[87.15,-160.45],[86.91,-160.14],[86.91,-158.27],[86.66,-157.78],[86.24,-157.42],[86.0,-157.6],[85.09,-157.6],[84.79,-157.85],[84.36,-157.85],[83.58,-157.12],[83.4,-157.12],[82.61,-156.15],[82.19,-156.15],[81.16,-156.88],[80.73,-156.88],[80.37,-156.51],[80.37,-156.09],[80.13,-155.79],[80.13,-155.12],[79.7,-154.46],[79.04,-154.46],[78.01,-155.18],[77.1,-155.18],[76.5,-154.58],[76.5,-152.22],[76.74,-151.91],[76.74,-149.8],[76.98,-149.49],[76.98,-147.13],[77.22,-146.83],[77.22,-144.71],[77.46,-144.41],[77.46,-142.05],[77.71,-141.75],[77.71,-139.63],[77.95,-139.32],[77.95,-137.21],[78.19,-136.9],[78.19,-134.54],[78.43,-134.24],[78.43,-132.12],[78.67,-131.82],[78.67,-129.46],[78.92,-129.16],[78.91,-127.04],[79.16,-126.74],[79.16,-124.38],[79.4,-124.07],[79.4,-121.95],[79.64,-121.65],[79.64,-120.5],[79.88,-120.02],[80.49,-119.41],[81.15,-119.41],[81.4,-119.23],[81.7,-119.41],[82.36,-119.41],[84.06,-121.35],[84.54,-121.59],[85.57,-122.56],[86.24,-122.56],[87.15,-121.71],[87.63,-120.92],[88.48,-120.14],[88.66,-120.14],[89.2,-119.65],[90.66,-118.93],[91.08,-118.93],[91.87,-118.44],[92.29,-118.44],[92.77,-118.2],[93.44,-117.53],[93.68,-117.05],[95.92,-114.81],[96.41,-114.57],[97.13,-113.84],[97.62,-113.6],[98.4,-112.87],[98.58,-112.87],[99.37,-112.15],[99.55,-112.15],[100.58,-111.18],[100.76,-111.18],[101.31,-110.69],[102.28,-110.21],[102.64,-109.79],[102.88,-109.3],[102.88,-108.88],[103.12,-108.58],[103.12,-106.7],[103.61,-105.73],[104.94,-104.4],[105.12,-104.4],[105.67,-103.92],[106.63,-103.43],[107.06,-103.43],[107.36,-103.19],[107.78,-103.19],[108.09,-102.95],[108.75,-102.95],[109.05,-102.71],[109.48,-102.7],[109.78,-102.95],[110.45,-102.95],[110.75,-103.19],[112.38,-103.19],[112.69,-103.43],[113.35,-103.43],[113.84,-103.67],[115.17,-104.94],[117.59,-108.39],[118.32,-109.85],[118.32,-110.75],[118.56,-111.06],[118.56,-115.35],[118.32,-115.66],[118.32,-116.56],[117.83,-117.35],[117.83,-118.5],[117.35,-119.29],[117.35,-119.71],[117.11,-120.01],[117.11,-120.68],[116.38,-121.95],[116.38,-122.62],[115.65,-123.89],[115.65,-124.31],[115.41,-124.8],[114.69,-125.58],[114.69,-126.01],[109.84,-135.51],[109.84,-135.93],[108.88,-137.69],[108.88,-138.35],[108.39,-139.14],[108.39,-139.56],[108.15,-139.87],[108.15,-140.53],[107.91,-140.84],[107.91,-141.26],[107.42,-142.23],[106.46,-143.2],[106.21,-143.68],[105.24,-144.71],[105.24,-144.89],[104.76,-145.44],[104.76,-145.62],[104.03,-146.4],[104.03,-146.59],[103.55,-147.13],[103.55,-147.31],[102.82,-148.04],[102.34,-148.83],[99.37,-151.79],[98.89,-152.03],[98.22,-152.7],[98.22,-152.88],[98.95,-153.67],[98.95,-153.85],[99.68,-154.88],[99.68,-155.54],[99.92,-155.85],[99.92,-156.27],[100.16,-156.57],[100.16,-157.0],[100.4,-157.3],[100.4,-157.97],[101.13,-159.24],[101.13,-159.9],[101.37,-160.2],[101.37,-160.63],[101.86,-161.41],[101.86,-162.32],[102.04,-162.56],[101.92,-162.87],[102.1,-163.11],[102.1,-163.78],[102.58,-164.32],[102.58,-165.47],[102.95,-166.01],[103.43,-165.47],[103.55,-165.59],[103.55,-168.13],[104.04,-168.92],[104.04,-169.59],[104.28,-169.89],[104.28,-171.04],[104.52,-171.34],[104.52,-172.49],[104.76,-172.79],[104.76,-174.43],[105.0,-174.73],[105.0,-175.4],[105.19,-175.64],[105.0,-175.94],[105.0,-176.36],[104.76,-176.67],[104.76,-177.09],[104.64,-177.21],[103.98,-177.21],[103.61,-176.61],[102.4,-175.64],[101.43,-173.7],[101.43,-173.28],[100.95,-172.73],[100.47,-171.58],[99.98,-171.04],[99.98,-170.61],[99.25,-169.83],[99.25,-169.65],[98.77,-169.1],[98.53,-168.44],[97.8,-167.65],[97.56,-166.98],[97.14,-166.56],[96.95,-166.56],[96.77,-166.74],[96.77,-170.07],[97.02,-170.37],[97.02,-172.98],[97.26,-173.28],[97.26,-174.43],[97.5,-174.73],[97.5,-177.33],[97.26,-177.64],[97.26,-178.54],[97.02,-178.85],[97.02,-179.39]],"lagen":[{"c":"#B7A89D","p":[[115.35,-123.28],[112.87,-122.74],[111.48,-121.95],[110.57,-120.92],[108.45,-117.84],[105.73,-115.11],[104.7,-114.27],[102.64,-111.91],[102.46,-110.51],[102.94,-109.85],[103.49,-108.52],[103.67,-106.28],[104.27,-105.31],[105.24,-104.4],[106.51,-103.92],[106.88,-103.92],[107.42,-104.34],[107.6,-104.76],[107.48,-105.97],[106.51,-108.58],[106.39,-109.54],[106.15,-109.97],[106.15,-110.39],[106.33,-110.57],[106.76,-110.33],[107.6,-109.18],[108.69,-107.0],[109.06,-106.7],[109.6,-106.7],[111.17,-107.67],[111.6,-108.21],[111.78,-108.7],[111.9,-109.54],[111.36,-110.21],[111.17,-110.69],[111.11,-112.33],[111.23,-113.6],[111.48,-114.2],[111.9,-114.75],[112.26,-114.99],[112.57,-114.99],[112.81,-114.75],[112.99,-113.9],[113.23,-113.6],[114.14,-114.57],[114.93,-114.93],[115.41,-114.99],[117.29,-114.39],[117.53,-114.39],[117.77,-114.57],[117.95,-115.96],[117.83,-117.17],[117.53,-117.78],[117.05,-119.77],[116.8,-120.14],[116.56,-120.98]]},{"c":"#4F423E","p":[[101.8,-163.35],[101.01,-161.41],[100.95,-160.51],[99.68,-157.06],[99.31,-155.18],[98.83,-154.15],[98.28,-153.49],[98.16,-152.46],[98.35,-152.15],[99.37,-151.31],[101.92,-148.7],[102.82,-147.43],[103.61,-146.59],[104.64,-144.77],[105.37,-143.8],[107.06,-142.05],[107.67,-139.93],[108.09,-139.02],[108.21,-138.29],[108.82,-136.84],[110.21,-134.24],[110.99,-132.24],[114.14,-126.01],[114.56,-124.92],[115.23,-124.13],[115.35,-123.34],[116.44,-121.41],[116.86,-120.14],[117.11,-119.77],[117.23,-118.93],[117.89,-117.17],[117.95,-115.17],[117.89,-114.69],[117.65,-114.39],[117.29,-114.33],[115.41,-114.93],[114.93,-114.87],[114.14,-114.51],[113.11,-113.3],[112.99,-112.81],[113.35,-113.66],[113.84,-113.96],[114.38,-113.9],[114.74,-113.54],[115.71,-111.0],[115.65,-109.85],[115.17,-109.18],[114.81,-109.0],[114.14,-109.0],[113.47,-109.48],[112.99,-110.51],[112.93,-111.54],[112.75,-111.97],[112.44,-111.48],[112.32,-110.88],[112.02,-110.27],[111.96,-109.24],[111.66,-108.21],[110.93,-107.43],[110.21,-106.94],[109.24,-106.58],[108.63,-107.0],[107.54,-109.18],[106.69,-110.33],[106.45,-110.51],[106.21,-110.39],[106.57,-108.58],[107.54,-105.97],[107.66,-104.76],[107.48,-104.34],[106.88,-103.86],[106.51,-103.86],[105.36,-104.34],[105.3,-104.16],[105.48,-104.16],[105.54,-103.92],[105.97,-103.92],[106.03,-103.67],[106.45,-103.67],[106.51,-103.43],[107.18,-103.43],[107.24,-103.19],[107.9,-103.19],[107.97,-102.95],[108.87,-102.95],[108.93,-102.71],[109.6,-102.7],[109.66,-102.95],[110.57,-102.95],[110.63,-103.19],[112.5,-103.19],[112.57,-103.43],[113.47,-103.43],[113.53,-103.67],[113.96,-103.67],[113.96,-103.85],[114.2,-103.92],[114.2,-104.1],[114.44,-104.16],[114.44,-104.34],[114.68,-104.4],[114.68,-104.58],[114.93,-104.64],[114.93,-104.82],[115.17,-104.88],[115.23,-105.13],[115.41,-105.13],[115.41,-105.55],[115.65,-105.61],[115.65,-105.79],[115.89,-105.85],[115.95,-106.09],[116.14,-106.09],[116.14,-106.52],[116.38,-106.58],[116.44,-106.82],[116.62,-106.82],[116.62,-107.24],[116.86,-107.3],[116.92,-107.55],[117.1,-107.55],[117.1,-107.97],[117.35,-108.03],[117.41,-108.27],[117.59,-108.27],[117.59,-108.7],[117.83,-108.76],[117.83,-109.18],[118.07,-109.24],[118.07,-109.66],[118.32,-109.73],[118.32,-110.88],[118.56,-110.94],[118.56,-115.48],[118.32,-115.54],[118.32,-116.69],[118.07,-116.75],[118.07,-117.17],[117.83,-117.23],[117.83,-118.62],[117.59,-118.68],[117.59,-119.11],[117.35,-119.17],[117.35,-119.83],[117.11,-119.89],[117.11,-120.8],[116.86,-120.86],[116.86,-121.29],[116.62,-121.35],[116.62,-121.77],[116.38,-121.83],[116.38,-122.74],[116.14,-122.8],[116.14,-123.22],[115.9,-123.28],[115.9,-123.71],[115.65,-123.77],[115.65,-124.43],[115.41,-124.49],[115.41,-124.92],[115.23,-124.92],[115.17,-125.16],[114.99,-125.16],[114.93,-125.4],[114.69,-125.46],[114.69,-126.13],[114.44,-126.19],[114.44,-126.61],[114.2,-126.67],[114.2,-127.1],[113.96,-127.16],[113.96,-127.58],[113.72,-127.64],[113.72,-128.06],[113.47,-128.13],[113.47,-128.55],[113.23,-128.61],[113.23,-129.03],[112.99,-129.09],[112.99,-129.52],[112.75,-129.58],[112.75,-130.0],[112.51,-130.06],[112.51,-130.49],[112.26,-130.55],[112.26,-130.97],[112.02,-131.03],[112.02,-131.45],[111.78,-131.51],[111.78,-131.94],[111.54,-132.0],[111.54,-132.42],[111.3,-132.48],[111.3,-132.91],[111.05,-132.97],[111.05,-133.39],[110.81,-133.45],[110.81,-133.88],[110.57,-133.94],[110.57,-134.36],[110.33,-134.42],[110.33,-134.84],[110.09,-134.9],[110.09,-135.33],[109.84,-135.39],[109.84,-136.05],[109.6,-136.11],[109.6,-136.54],[109.36,-136.6],[109.36,-137.02],[109.12,-137.08],[109.12,-137.51],[108.88,-137.57],[108.88,-138.48],[108.63,-138.54],[108.63,-138.96],[108.39,-139.02],[108.39,-139.69],[108.15,-139.75],[108.15,-140.65],[107.91,-140.71],[107.91,-141.38],[107.67,-141.44],[107.67,-141.86],[107.42,-141.93],[107.42,-142.35],[107.24,-142.35],[107.18,-142.59],[107.0,-142.59],[106.94,-142.83],[106.76,-142.83],[106.7,-143.08],[106.52,-143.08],[106.46,-143.32],[106.21,-143.38],[106.21,-143.8],[106.03,-143.8],[105.97,-144.04],[105.79,-144.04],[105.73,-144.29],[105.55,-144.29],[105.49,-144.53],[105.24,-144.59],[105.24,-145.01],[105.06,-145.01],[105.0,-145.25],[104.76,-145.32],[104.76,-145.74],[104.58,-145.74],[104.52,-145.98],[104.34,-145.98],[104.28,-146.22],[104.03,-146.28],[104.03,-146.71],[103.85,-146.71],[103.79,-146.95],[103.55,-147.01],[103.55,-147.43],[103.37,-147.43],[103.31,-147.68],[103.13,-147.68],[103.07,-147.92],[102.88,-147.92],[102.82,-148.16],[102.58,-148.22],[102.58,-148.64],[102.4,-148.64],[102.34,-148.89],[102.16,-148.89],[102.1,-149.13],[101.92,-149.13],[101.86,-149.37],[101.67,-149.37],[101.61,-149.61],[101.43,-149.61],[101.37,-149.85],[101.19,-149.85],[101.13,-150.1],[100.95,-150.1],[100.89,-150.34],[100.71,-150.34],[100.65,-150.58],[100.46,-150.58],[100.4,-150.82],[100.22,-150.82],[100.16,-151.07],[99.98,-151.07],[99.92,-151.31],[99.74,-151.31],[99.68,-151.55],[99.5,-151.55],[99.43,-151.79],[99.19,-151.85],[99.19,-152.03],[98.77,-152.03],[98.71,-152.28],[98.53,-152.28],[98.47,-152.52],[98.22,-152.58],[98.22,-153.0],[98.47,-153.06],[98.47,-153.24],[98.71,-153.3],[98.77,-153.55],[98.95,-153.55],[98.95,-153.97],[99.19,-154.03],[99.25,-154.27],[99.43,-154.27],[99.43,-154.7],[99.68,-154.76],[99.68,-155.67],[99.92,-155.73],[99.92,-156.39],[100.16,-156.45],[100.16,-157.12],[100.4,-157.18],[100.4,-158.09],[100.65,-158.15],[100.65,-158.57],[100.89,-158.63],[100.89,-159.05],[101.13,-159.11],[101.13,-160.02],[101.37,-160.08],[101.37,-160.75],[101.55,-160.81],[101.86,-162.44],[102.1,-162.5],[102.1,-162.69],[101.86,-162.75],[101.86,-162.93],[102.04,-162.99]]},{"c":"#251F1C","p":[[86.85,-157.84],[86.66,-158.03],[86.66,-157.66],[86.42,-157.6],[86.36,-157.36],[86.18,-157.36],[86.12,-157.6],[84.97,-157.6],[84.91,-157.85],[84.24,-157.85],[84.24,-157.66],[84.0,-157.6],[84.0,-157.42],[83.76,-157.36],[83.7,-157.12],[83.27,-157.12],[83.27,-156.94],[83.03,-156.88],[83.03,-156.45],[82.79,-156.39],[82.73,-156.15],[82.06,-156.15],[82.0,-156.39],[81.58,-156.39],[81.52,-156.63],[81.28,-156.7],[81.28,-156.88],[80.61,-156.88],[80.61,-156.7],[80.37,-156.63],[80.37,-155.97],[80.13,-155.91],[80.13,-155.0],[79.89,-154.94],[79.82,-154.46],[78.92,-154.46],[78.86,-154.7],[78.61,-154.76],[78.61,-154.94],[78.19,-154.94],[78.13,-155.18],[76.98,-155.18],[76.98,-155.0],[76.74,-154.94],[76.68,-154.7],[76.5,-154.7],[76.5,-152.1],[76.74,-152.04],[76.74,-149.67],[76.98,-149.61],[76.98,-148.46],[79.76,-149.86],[81.34,-150.76],[82.12,-151.37],[84.06,-152.34],[85.57,-152.76],[86.0,-153.0],[86.42,-153.67],[86.66,-154.58],[86.66,-155.61],[87.03,-156.39],[87.03,-157.42]]},{"c":"#251F1C","p":[[94.72,-171.89],[94.23,-171.52],[93.99,-170.98],[93.99,-170.74],[94.17,-170.68],[94.17,-170.01],[93.87,-170.01],[93.87,-170.43],[92.96,-168.8],[93.14,-168.07],[93.38,-168.07],[93.44,-167.83],[93.63,-167.83],[93.63,-168.5],[93.87,-168.56],[93.87,-168.74],[93.63,-168.8],[93.63,-168.98],[93.87,-169.04],[93.87,-169.22],[93.63,-169.28],[93.63,-169.71],[94.41,-169.71],[94.41,-168.8],[94.17,-168.74],[94.17,-167.1],[94.41,-167.04],[94.41,-166.14],[94.11,-166.14],[94.11,-166.56],[93.69,-166.56],[93.69,-166.38],[93.44,-166.32],[93.44,-165.65],[93.2,-165.59],[93.14,-167.53],[92.48,-167.17],[92.11,-166.38],[92.11,-165.95],[91.81,-165.23],[91.08,-162.26],[91.08,-161.96],[91.45,-161.05],[91.33,-160.45],[91.32,-157.78],[91.57,-157.0],[91.57,-156.45],[91.87,-156.09],[92.47,-156.21],[92.78,-156.82],[93.32,-158.75],[93.08,-160.27],[93.26,-160.75],[94.05,-161.72],[94.59,-163.47],[94.53,-164.8],[94.78,-165.47],[94.65,-166.8],[94.35,-167.41],[94.35,-167.83],[94.65,-168.32],[94.72,-168.8],[94.65,-169.89],[94.35,-170.01],[94.35,-170.68],[94.59,-170.74],[94.65,-170.55],[94.96,-171.04],[94.96,-171.58]]},{"c":"#A08674","p":[[114.5,-124.92],[112.57,-124.31],[111.11,-123.28],[108.81,-120.86],[106.88,-118.2],[105.73,-117.05],[103.49,-115.29],[102.88,-114.51],[102.58,-113.78],[102.52,-112.57],[102.64,-111.97],[104.64,-114.27],[105.73,-115.17],[108.39,-117.84],[110.51,-120.92],[111.48,-122.01],[112.87,-122.8],[115.29,-123.34],[115.17,-124.13]]},{"c":"#4F423E","p":[[83.51,-125.46],[83.21,-124.8],[82.12,-119.41],[82.49,-119.41],[82.49,-119.59],[82.73,-119.65],[82.79,-119.9],[82.97,-119.9],[82.97,-120.32],[83.21,-120.38],[83.21,-120.56],[83.45,-120.62],[83.45,-120.8],[83.7,-120.86],[83.7,-121.05],[83.94,-121.11],[83.94,-121.29],[84.18,-121.35],[84.24,-121.59],[84.66,-121.59],[84.66,-121.77],[84.91,-121.83],[84.91,-122.01],[85.15,-122.07],[85.15,-122.26],[85.39,-122.32],[85.45,-122.56],[86.36,-122.56],[86.42,-122.32],[86.6,-122.32],[86.66,-122.07],[86.84,-122.07],[86.9,-121.83],[87.09,-121.83],[87.15,-121.59],[87.39,-121.53],[87.39,-121.11],[87.57,-121.11],[87.63,-120.86],[87.81,-120.86],[87.87,-120.62],[88.05,-120.62],[88.11,-120.38],[88.36,-120.32],[88.36,-120.14],[88.78,-120.14],[88.84,-119.9],[89.08,-119.84],[89.08,-119.65],[89.51,-119.65],[89.57,-119.41],[89.99,-119.41],[90.05,-119.17],[90.47,-119.17],[90.54,-118.93],[91.2,-118.93],[91.26,-118.68],[91.69,-118.68],[91.75,-118.44],[92.41,-118.44],[92.47,-118.2],[92.9,-118.2],[92.96,-117.96],[93.14,-117.96],[93.2,-117.72],[93.44,-117.66],[93.44,-117.23],[93.62,-117.23],[93.68,-116.99],[93.86,-116.99],[93.92,-116.75],[94.11,-116.75],[94.17,-116.51],[94.35,-116.51],[94.41,-116.26],[94.59,-116.26],[94.65,-116.02],[94.83,-116.02],[94.89,-115.78],[95.07,-115.78],[95.13,-115.54],[95.32,-115.54],[95.38,-115.3],[95.56,-115.3],[95.62,-115.05],[95.8,-115.05],[95.86,-114.81],[96.1,-114.75],[96.1,-114.57],[96.53,-114.57],[96.59,-114.33],[96.77,-114.33],[96.83,-114.08],[97.01,-114.08],[97.07,-113.84],[97.31,-113.78],[97.31,-113.6],[97.74,-113.6],[97.8,-113.36],[97.98,-113.36],[98.04,-113.12],[98.28,-113.06],[98.28,-112.87],[98.71,-112.87],[98.77,-112.63],[98.95,-112.63],[99.01,-112.39],[99.25,-112.33],[99.25,-112.15],[99.67,-112.15],[99.73,-111.91],[99.92,-111.91],[99.98,-111.66],[100.16,-111.66],[100.22,-111.42],[100.46,-111.36],[100.46,-111.18],[100.88,-111.18],[100.94,-110.94],[101.19,-110.88],[101.19,-110.69],[101.61,-110.69],[101.67,-110.45],[102.09,-110.45],[102.16,-110.21],[102.34,-110.21],[102.4,-109.97],[102.64,-109.91],[102.64,-109.48],[102.88,-109.42],[102.88,-108.76],[103.12,-108.7],[103.12,-106.58],[103.37,-106.52],[103.37,-106.09],[103.61,-106.03],[103.61,-105.61],[103.79,-105.61],[103.85,-105.37],[104.03,-105.37],[104.09,-105.13],[104.27,-105.13],[104.33,-104.88],[104.52,-104.88],[104.58,-104.64],[104.82,-104.58],[104.82,-104.4],[105.18,-104.4],[104.21,-105.31],[103.61,-106.28],[103.43,-108.52],[102.88,-109.85],[102.4,-110.51],[100.46,-111.78],[98.52,-113.48],[97.98,-113.78],[95.62,-115.66],[94.47,-116.75],[93.86,-117.6],[93.02,-118.44],[90.23,-119.59],[89.26,-120.14],[88.36,-120.86],[85.63,-123.83],[84.66,-125.59],[84.3,-125.77],[83.94,-125.77]]},{"c":"#251F1C","p":[[97.01,-139.57],[97.07,-138.9],[98.28,-137.75],[99.07,-137.33],[99.92,-137.08],[100.77,-137.02],[102.04,-137.27],[102.76,-136.96],[103.25,-137.02],[103.43,-137.27],[103.43,-137.75],[102.94,-139.5],[102.64,-139.75],[102.22,-140.53],[101.49,-141.02],[99.86,-141.08],[98.65,-140.66],[98.1,-140.17],[97.32,-139.99]]},{"c":"#4F423E","p":[[97.26,-177.76],[96.41,-177.88],[95.68,-177.45],[95.38,-176.79],[94.05,-175.46],[93.2,-175.28],[93.2,-174.85],[92.96,-174.79],[92.96,-174.37],[92.72,-174.31],[92.72,-173.88],[92.48,-173.82],[92.48,-173.4],[92.23,-173.34],[92.23,-172.92],[91.99,-172.85],[91.99,-172.43],[91.75,-172.37],[91.69,-172.13],[91.51,-172.13],[91.51,-171.46],[91.27,-171.4],[91.27,-170.98],[91.02,-170.92],[91.02,-170.49],[90.78,-170.43],[90.78,-170.01],[90.54,-169.95],[90.54,-169.53],[90.3,-169.47],[90.3,-169.04],[90.05,-168.98],[90.05,-168.56],[89.81,-168.5],[89.81,-167.83],[89.57,-167.77],[89.57,-167.35],[89.33,-167.29],[89.33,-166.86],[89.09,-166.8],[89.09,-166.14],[88.84,-166.08],[88.84,-165.41],[88.6,-165.35],[88.6,-164.93],[88.36,-164.87],[88.36,-164.2],[88.12,-164.14],[88.12,-163.72],[87.88,-163.66],[87.88,-162.99],[87.63,-162.93],[87.63,-162.02],[87.39,-161.96],[87.39,-161.29],[87.15,-161.23],[87.15,-160.33],[86.91,-160.27],[86.91,-158.15],[86.66,-158.09],[87.03,-157.48],[87.03,-157.78],[87.39,-158.69],[87.45,-160.02],[87.88,-162.14],[88.3,-163.05],[88.54,-164.32],[88.96,-165.23],[89.57,-167.23],[91.02,-169.53],[91.93,-170.01],[92.84,-171.22],[93.26,-172.61],[94.53,-175.58],[95.32,-176.67],[96.11,-177.15],[96.41,-177.09],[96.83,-176.49],[96.89,-174.73],[96.65,-173.94],[96.71,-171.95],[96.83,-171.7],[97.02,-171.7],[97.02,-173.1],[97.26,-173.16],[97.26,-174.55],[97.5,-174.61],[97.26,-175.15],[97.26,-175.88],[97.5,-176.3],[97.5,-177.45],[97.26,-177.51]]},{"c":"#4F423E","p":[[105.0,-176.24],[104.64,-176.12],[104.1,-175.64],[103.49,-174.43],[103.19,-174.55],[103.01,-175.34],[102.64,-175.94],[102.58,-175.76],[102.4,-175.76],[102.4,-175.34],[102.16,-175.28],[102.16,-174.85],[101.92,-174.79],[101.92,-174.37],[101.68,-174.31],[101.68,-173.88],[101.43,-173.82],[101.43,-173.16],[101.19,-173.1],[101.13,-172.85],[100.95,-172.85],[100.95,-172.43],[100.71,-172.37],[100.71,-171.95],[100.47,-171.89],[100.47,-171.52],[101.98,-173.22],[102.16,-172.98],[102.22,-171.95],[102.34,-171.83],[102.7,-171.83],[103.43,-172.91],[103.92,-173.4],[104.1,-173.82],[104.28,-173.94],[104.4,-173.76],[104.28,-173.16],[104.34,-171.64],[104.1,-170.49],[102.52,-167.1],[102.28,-165.65],[101.92,-164.62],[102.04,-164.2],[102.58,-164.2],[102.58,-165.59],[102.83,-165.65],[102.89,-166.14],[103.13,-166.08],[103.13,-165.65],[103.31,-165.65],[103.37,-165.41],[103.55,-165.41],[103.55,-166.38],[103.25,-166.68],[103.55,-167.04],[103.55,-168.25],[103.79,-168.31],[103.79,-168.74],[104.04,-168.8],[104.04,-169.71],[104.28,-169.77],[104.28,-171.16],[104.52,-171.22],[104.52,-172.61],[104.76,-172.67],[104.76,-174.55],[105.0,-174.61],[105.0,-175.52],[105.25,-175.58],[105.25,-175.76],[105.0,-175.82]]},{"c":"#B7A89D","p":[[95.62,-139.38],[95.56,-138.96],[96.04,-138.11],[96.83,-137.27],[98.28,-136.24],[99.92,-135.51],[101.85,-134.97],[103.25,-134.9],[103.79,-135.21],[103.79,-135.69],[103.43,-136.24],[102.16,-136.84],[99.92,-137.02],[98.77,-137.39],[97.56,-138.36],[96.59,-139.44]]},{"c":"#A08674","p":[[94.65,-159.72],[94.17,-159.48],[93.69,-159.6],[93.56,-158.27],[93.14,-157.48],[92.41,-155.42],[92.11,-155.18],[91.81,-155.18],[91.51,-155.48],[91.26,-156.21],[91.02,-155.97],[90.78,-154.76],[90.84,-152.82],[91.02,-152.03],[91.51,-151.73],[91.75,-151.73],[92.41,-152.16],[93.08,-153.0],[93.32,-153.55],[93.75,-156.27]]},{"c":"#A08674","p":[[96.23,-177.09],[95.5,-176.79],[94.72,-175.76],[93.63,-173.22],[94.11,-172.92],[94.23,-173.28],[94.78,-173.82],[95.02,-173.88],[95.32,-173.64],[95.38,-172.67],[95.2,-169.95],[95.44,-170.07],[96.29,-170.01],[96.53,-170.49],[96.53,-171.1],[96.77,-171.64],[96.65,-171.95],[96.59,-173.94],[96.83,-174.73],[96.83,-176.12],[96.65,-176.79]]},{"c":"#251F1C","p":[[113.84,-113.9],[113.41,-113.66],[112.81,-112.21],[112.99,-111.54],[113.05,-110.51],[113.41,-109.67],[113.78,-109.24],[114.14,-109.06],[114.81,-109.06],[115.17,-109.24],[115.59,-109.85],[115.65,-111.0],[114.68,-113.54],[114.38,-113.84]]},{"c":"#4F423E","p":[[95.02,-173.58],[94.53,-173.52],[94.17,-173.04],[94.05,-172.37],[93.57,-171.34],[93.44,-170.43],[93.14,-169.65],[93.14,-169.28],[93.87,-170.49],[94.17,-171.52],[94.53,-171.89],[94.84,-171.89],[95.02,-171.58],[95.02,-171.04],[94.65,-170.49],[94.78,-168.5],[94.41,-167.83],[94.41,-167.41],[94.71,-166.8],[94.84,-165.47],[94.59,-164.8],[94.65,-163.84],[95.14,-167.1],[95.08,-169.65],[95.32,-173.22]]},{"c":"#4F423E","p":[[100.4,-171.4],[100.22,-171.4],[100.22,-171.22],[99.98,-171.16],[99.98,-170.49],[99.74,-170.43],[99.74,-170.25],[99.5,-170.19],[99.44,-169.95],[99.25,-169.95],[99.25,-169.53],[99.01,-169.46],[98.95,-169.22],[98.77,-169.22],[98.77,-168.8],[98.53,-168.74],[98.53,-168.31],[98.29,-168.25],[98.29,-168.07],[98.04,-168.01],[97.98,-167.77],[97.8,-167.77],[97.8,-167.35],[97.56,-167.29],[97.56,-166.86],[97.32,-166.8],[97.26,-166.56],[96.77,-166.62],[96.77,-170.19],[96.95,-170.25],[96.53,-170.43],[96.35,-170.13],[96.35,-166.5],[96.65,-166.02],[97.2,-166.02],[97.98,-166.92],[99.44,-169.1],[100.1,-170.37]]},{"c":"#251F1C","p":[[97.02,-179.39],[96.11,-179.39],[96.11,-179.21],[95.87,-179.15],[95.87,-178.73],[95.62,-178.66],[95.62,-178.48],[95.38,-178.42],[95.38,-178.24],[95.14,-178.18],[95.08,-177.94],[94.9,-177.94],[94.9,-177.52],[94.66,-177.45],[94.66,-177.03],[94.41,-176.97],[94.35,-176.73],[94.17,-176.73],[94.17,-176.3],[93.93,-176.24],[93.93,-176.06],[93.69,-176.0],[93.63,-175.76],[93.44,-175.76],[93.44,-175.4],[94.05,-175.52],[95.32,-176.79],[95.62,-177.45],[95.99,-177.76],[96.41,-177.94],[97.26,-177.82],[97.26,-178.66],[97.02,-178.73]]},{"c":"#4F423E","p":[[87.03,-156.33],[86.72,-155.61],[86.72,-154.58],[86.48,-153.67],[86.0,-152.94],[85.57,-152.7],[84.06,-152.28],[82.12,-151.31],[81.34,-150.7],[79.76,-149.8],[77.04,-148.46],[76.98,-148.28],[77.34,-148.28],[79.04,-149.13],[80.61,-150.16],[86.0,-152.76],[86.66,-153.55],[87.15,-154.82],[87.15,-155.91]]},{"c":"#4F423E","p":[[91.08,-161.9],[90.96,-161.11],[91.2,-160.45],[91.08,-158.33],[91.26,-157.54],[91.26,-156.27],[91.57,-155.48],[91.81,-155.24],[92.11,-155.24],[92.47,-155.61],[92.96,-157.18],[93.5,-158.27],[93.62,-159.72],[93.44,-160.45],[93.69,-161.11],[93.32,-160.75],[93.14,-160.27],[93.38,-158.75],[92.84,-156.82],[92.47,-156.15],[91.87,-156.03],[91.57,-156.27],[91.26,-157.78],[91.26,-160.45],[91.39,-161.05]]},{"c":"#251F1C","p":[[104.76,-177.21],[103.85,-177.21],[103.85,-176.79],[103.61,-176.73],[103.61,-176.55],[103.37,-176.49],[103.37,-176.3],[103.13,-176.24],[103.07,-176.0],[102.64,-176.0],[103.07,-175.34],[103.31,-174.49],[103.61,-174.61],[104.04,-175.64],[104.46,-176.06],[105.0,-176.3],[105.0,-176.49],[104.76,-176.55]]},{"c":"#4F423E","p":[[102.88,-139.69],[102.46,-140.35],[101.73,-141.02],[101.01,-141.32],[100.04,-141.32],[97.13,-140.29],[96.71,-139.93],[96.59,-139.51],[97.01,-138.96],[96.95,-139.57],[97.32,-140.05],[98.1,-140.23],[98.65,-140.72],[99.86,-141.14],[101.49,-141.08],[101.98,-140.84],[102.7,-139.75]]}]},"staart":{"c":"#7D5845","basis":[[-53.56,-120.38,1],[-55.56,-118.38],[-58.1,-114.2],[-59.55,-109.48],[-60.28,-99.13],[-62.46,-89.87],[-63.18,-80.98],[-63.91,-78.98],[-63.91,-75.17],[-64.64,-73.17],[-64.64,-68.63],[-66.82,-63.0],[-66.82,-54.11],[-67.54,-51.2],[-65.54,-48.3],[-65.0,-43.58],[-63.0,-41.22],[-62.09,-41.22],[-61.19,-42.12],[-59.55,-46.48],[-58.65,-47.21,1],[-58.1,-47.03,1],[-55.38,-82.43],[-55.38,-88.78],[-54.29,-90.06],[-51.02,-110.75]],"lagen":[{"c":"#26201D","p":[[-56.47,-115.47,1],[-57.92,-114.75],[-58.83,-112.93],[-59.01,-110.75],[-59.55,-110.03],[-59.55,-105.49],[-60.28,-104.22],[-60.28,-98.95],[-61.01,-97.68],[-61.01,-95.32],[-61.73,-94.05],[-61.73,-91.69],[-62.46,-90.42],[-62.46,-86.61],[-63.18,-85.34],[-63.18,-80.8],[-63.91,-79.53],[-63.91,-74.99],[-64.64,-73.72],[-64.64,-68.45],[-65.36,-67.18],[-65.54,-65.73],[-66.82,-63.55],[-66.82,-53.92],[-67.54,-52.65],[-67.54,-50.66],[-65.54,-47.75],[-65.36,-44.12],[-64.46,-42.3],[-62.82,-40.85,1],[-61.37,-41.58],[-59.73,-44.85],[-59.73,-45.75],[-58.28,-48.48],[-57.37,-52.11],[-53.92,-58.65],[-53.38,-60.64],[-54.65,-63.37],[-54.65,-81.7],[-55.38,-82.97],[-55.38,-88.6],[-53.92,-91.33],[-53.92,-93.32],[-54.65,-94.59],[-54.65,-96.96],[-55.38,-98.23],[-55.38,-102.04],[-56.1,-103.31],[-56.1,-106.76],[-55.38,-108.03],[-55.38,-114.39]]}]},"kruis":{"c":"#26201D","basis":[[31.05,-130.0,1],[31.05,-129.09],[35.04,-125.82],[35.22,-124.19],[36.49,-122.19],[36.68,-120.56],[37.22,-120.01],[37.4,-118.38],[38.13,-117.29],[38.13,-116.2],[39.4,-114.2],[39.58,-112.57],[40.13,-112.03],[40.31,-110.39],[41.03,-109.3],[41.03,-108.21],[41.76,-107.49],[43.03,-107.49],[43.76,-108.21],[43.76,-110.57],[43.03,-111.66],[43.03,-114.93],[42.3,-116.02],[42.3,-118.56],[41.58,-119.65],[41.58,-122.19],[41.03,-122.74],[40.85,-124.19],[32.5,-130.18],[31.77,-130.36]],"lagen":[]}},"tonen":["#26201D","#7D5845","#A68B78","#473932"],"oog":[99.49,-138.72],"K":1.376923076923077,"omtrek":[[104.04,-177.21,1],[101.31,-176.48],[98.41,-177.21],[96.05,-179.2,1],[93.69,-176.84],[89.33,-168.13],[87.88,-162.5],[84.43,-157.6],[62.46,-149.25],[53.74,-143.25],[46.3,-140.17],[29.05,-128.91],[20.7,-127.09],[11.8,-127.09],[-26.69,-133.63],[-34.68,-132.18],[-43.03,-128.55],[-50.11,-123.83],[-55.56,-118.38],[-58.46,-113.48],[-59.55,-109.48],[-64.64,-68.63],[-66.82,-63.0],[-67.54,-51.2],[-65.54,-48.3],[-65.36,-44.66],[-63.37,-41.4,1],[-61.19,-42.12],[-59.01,-47.03,1],[-57.37,-45.94,1],[-58.1,-22.88],[-59.55,-14.16],[-55.56,-9.62],[-55.2,-6.9],[-56.28,-2.18],[-54.47,0.91,1],[-45.39,1.27],[-44.12,0.36,1],[-46.12,-6.9],[-49.57,-12.71],[-50.29,-18.52],[-50.29,-32.5],[-49.57,-37.95],[-48.48,-39.22,1],[-46.48,-36.13],[-45.03,-20.88],[-45.57,-15.8],[-44.66,-13.25],[-40.31,-8.9],[-40.31,-2.36],[-37.58,-0.18],[-30.14,-0.18],[-28.87,-1.09,1],[-30.87,-7.63],[-33.95,-11.08],[-35.77,-14.89],[-37.95,-24.33],[-39.4,-39.04],[-35.59,-52.84],[-30.14,-62.09],[-27.42,-69.72],[-19.97,-81.34,1],[-18.34,-81.16],[-7.08,-74.44],[1.63,-72.08],[11.98,-71.35],[27.05,-74.08],[30.87,-72.99,1],[31.23,-49.75],[29.78,-42.49],[31.23,-34.5],[28.69,-14.53],[33.41,-7.81],[32.68,-1.82],[35.77,1.27],[43.21,1.27],[45.94,-0.18],[52.65,-0.18],[53.92,-1.09,1],[52.11,-7.26],[49.2,-10.89],[47.03,-15.61],[45.57,-33.23],[47.75,-42.49],[47.75,-56.47],[50.66,-73.17],[56.47,-79.16],[61.55,-93.14],[72.81,-106.22],[81.52,-118.38],[83.7,-120.01],[86.06,-120.56],[92.42,-118.56],[101.68,-110.21],[104.76,-104.76],[108.58,-102.58],[113.48,-103.31],[118.2,-109.48],[118.2,-116.56],[116.75,-121.65],[109.48,-135.63],[107.3,-142.71],[100.04,-152.33],[100.04,-157.96],[103.67,-166.86],[105.13,-174.85]],"neusgat":[114.02,-111.84],"mond":[[106.76,-105.31],[116.2,-103.85]],"keelweb":{"p":[[85.76,-120.34,1],[85.77,-120.34,1],[84.22,-151.94,1],[84.21,-151.94,1]],"kop":[0,1,1,0]}},"edelhert":{"J":{"midrug":[0.0,-111.84],"nekBasis":[69.39,-91.43],"lend":[-32.65,-110.2],"kruis":[-58.78,-103.67],"kop":[97.96,-138.78],"neus":[137.14,-119.18],"kaak":[102.04,-120.0],"kin":[126.53,-109.39],"schoft":[47.35,-104.49],"schouder":[63.67,-83.27],"elleboog":[50.61,-63.67],"pols":[50.61,-35.1],"vkogel":[50.61,-8.98],"vteen":[57.14,0.0],"heup":[-48.98,-87.35],"knie":[-32.65,-62.04],"hak":[-60.41,-42.45],"akogel":[-57.14,-8.98],"ateen":[-50.61,0.0],"staart0":[-66.94,-102.86],"staart1":[-71.02,-93.06],"staart2":[-73.47,-84.9],"staart3":[-75.1,-78.37],"staart4":[-75.92,-71.84]},"delen":{"romp":{"c":"#8A593D","basis":[[88.16,-81.63],[68.16,-86.33],[42.65,-113.67],[42.65,-120.82],[40.82,-120.0],[34.9,-120.0],[33.47,-119.18],[30.0,-119.18],[28.57,-118.37],[25.92,-118.37],[24.49,-117.55],[12.04,-117.55],[10.61,-116.73],[8.16,-117.55],[-5.1,-117.55],[-6.53,-118.37],[-12.45,-118.37],[-13.88,-119.18],[-19.8,-119.18],[-21.22,-120.0],[-32.04,-120.0],[-33.47,-119.18],[-39.39,-118.37],[-48.37,-115.1],[-59.39,-109.18],[-64.08,-105.31],[-60.41,-98.16],[-63.06,-87.55],[-62.86,-81.63],[-62.04,-80.2],[-62.04,-75.92],[-61.22,-74.49],[-61.22,-61.63],[-56.94,-57.35],[-55.92,-57.35],[-55.31,-56.53],[-51.84,-56.53],[-51.22,-55.71],[-47.14,-56.53],[-41.02,-60.61],[-39.18,-60.61],[-38.37,-59.8],[-38.37,-58.37],[-34.9,-55.71],[-31.43,-55.71],[-30.82,-54.9],[-28.98,-54.9],[-28.37,-55.71],[-24.9,-55.71],[-24.29,-56.53],[-23.27,-56.53],[-21.63,-58.37],[-16.53,-67.96],[-15.51,-67.96],[-8.37,-64.69],[-6.53,-64.69],[-2.65,-63.06],[0.0,-63.06],[1.43,-62.24],[5.71,-62.24],[7.14,-61.43],[24.49,-61.43],[25.92,-60.61],[32.65,-60.61],[33.47,-59.8],[33.47,-58.37],[36.12,-56.53],[39.59,-56.53],[40.2,-55.71],[42.86,-55.71],[43.47,-56.53],[46.94,-56.53],[47.55,-57.35],[48.37,-57.35],[48.98,-59.39],[50.41,-60.61],[54.69,-61.43],[59.18,-63.27],[61.63,-64.9],[65.51,-69.39],[68.57,-70.41],[70.82,-72.04],[75.1,-72.86],[77.35,-74.49],[79.59,-74.69],[82.65,-77.76],[85.31,-78.78]],"lagen":[{"c":"#7A4D33","p":[[58.37,-109.39],[56.94,-112.04],[55.31,-113.88],[54.69,-115.1],[54.49,-117.35],[53.27,-118.78],[50.41,-120.0],[46.33,-120.0],[42.86,-120.82],[39.18,-120.0],[34.9,-120.0],[33.47,-119.39],[30.0,-119.18],[22.86,-117.55],[12.04,-117.55],[10.41,-116.94],[8.16,-117.55],[-3.47,-117.55],[-6.53,-118.37],[-10.82,-118.37],[-13.88,-119.18],[-19.8,-119.39],[-21.22,-120.0],[-32.04,-120.0],[-41.84,-117.55],[-43.88,-116.12],[-45.31,-112.24],[-48.16,-109.8],[-48.98,-108.37],[-51.43,-106.33],[-55.1,-102.24],[-56.94,-98.78],[-58.78,-93.27],[-58.98,-80.82],[-60.41,-75.31],[-60.61,-71.02],[-61.84,-68.57],[-62.45,-64.69],[-64.29,-61.22],[-64.9,-57.96],[-69.59,-55.92],[-72.24,-53.47],[-72.45,-52.45],[-71.43,-51.43],[-69.8,-51.43],[-67.55,-52.45],[-65.71,-54.29],[-65.1,-57.35],[-61.43,-58.78],[-54.69,-58.98],[-52.65,-59.8],[-50.61,-60.0],[-45.51,-58.16],[-42.86,-58.57],[-40.82,-57.76],[-40.0,-56.94],[-39.39,-55.51],[-39.39,-53.88],[-41.63,-48.37],[-44.69,-43.88],[-44.9,-41.84],[-44.08,-40.0],[-42.86,-39.18],[-41.43,-39.18],[-37.96,-41.84],[-36.12,-42.45],[-31.63,-42.45],[-30.41,-43.27],[-28.78,-46.53],[-24.69,-52.04],[-18.37,-64.08],[-18.37,-65.31],[-19.39,-66.33],[-21.02,-66.33],[-27.96,-63.88],[-29.39,-64.08],[-31.84,-65.1],[-32.86,-66.33],[-33.47,-68.16],[-33.06,-69.8],[-31.22,-72.45],[-27.35,-81.02],[-25.1,-88.98],[-23.06,-93.06],[-21.02,-95.31],[-15.71,-97.14],[-12.24,-97.35],[-5.51,-95.31],[0.0,-95.92],[3.06,-94.9],[6.33,-94.9],[10.82,-96.73],[13.47,-96.94],[17.35,-98.37],[20.82,-98.78],[27.14,-101.63],[31.22,-102.24],[33.47,-103.47],[36.12,-105.92],[40.61,-107.14],[44.9,-106.94],[48.57,-105.51],[51.43,-102.45],[53.67,-98.98],[55.92,-97.76],[57.55,-95.92],[60.0,-95.51],[60.82,-95.92],[61.02,-97.35],[58.78,-104.49]]},{"c":"#BB9071","p":[[-19.39,-71.63],[-19.39,-70.2],[-18.37,-69.18],[-13.06,-66.53],[-8.37,-64.69],[1.43,-62.24],[5.71,-62.04],[7.14,-61.43],[22.86,-61.43],[26.33,-60.61],[28.16,-61.22],[28.98,-62.04],[28.37,-66.12],[28.98,-71.22],[28.16,-72.04],[26.53,-72.65],[16.33,-70.2],[4.69,-70.2],[-5.92,-72.04],[-13.27,-74.9],[-15.92,-75.51],[-17.96,-74.49]]}]},"hum":{"c":"#8A593D","basis":[[36.73,-109.18],[39.18,-69.8],[43.67,-61.43],[54.69,-61.43],[57.14,-62.24],[61.63,-64.9],[65.51,-69.39],[68.57,-70.41],[70.82,-72.04],[75.1,-72.86],[77.35,-74.49],[79.59,-74.69],[82.65,-77.76],[85.31,-78.78],[87.96,-81.22],[87.76,-81.84],[68.16,-86.33],[48.78,-110.61]],"lagen":[]},"dij":{"c":"#8A593D","basis":[[-52.86,-112.86],[-61.84,-107.55],[-64.08,-105.31],[-60.41,-98.16],[-63.06,-87.55],[-62.86,-81.63],[-62.04,-80.2],[-62.04,-75.92],[-61.22,-74.49],[-61.63,-68.57],[-37.96,-62.86],[-30.41,-56.94],[-23.67,-60.61],[-23.67,-112.86]],"lagen":[]},"nek":{"c":"#8A593D","basis":[[96.33,-141.84],[87.35,-141.84],[87.35,-139.59],[88.98,-134.69],[83.67,-129.8],[80.82,-127.96],[77.96,-124.9],[71.02,-120.82],[66.12,-119.18],[52.04,-119.18],[50.61,-120.0],[44.49,-120.2],[44.9,-75.92],[80.82,-75.92],[83.47,-78.37],[85.31,-78.78],[88.37,-81.84],[91.22,-83.67],[92.86,-85.92],[95.92,-88.57],[96.94,-90.82],[100.0,-93.47],[103.47,-99.59],[103.67,-101.02],[105.1,-102.86],[105.1,-105.51],[106.73,-107.76],[106.73,-109.59],[108.16,-112.65],[101.63,-136.33]],"lagen":[{"c":"#7A4D33","p":[[85.1,-101.63],[84.29,-102.24],[82.04,-101.84],[75.71,-95.31],[74.49,-94.69],[72.04,-94.29],[68.98,-95.31],[66.53,-94.69],[66.12,-93.06],[67.55,-90.0],[67.96,-86.53],[69.39,-85.51],[72.24,-85.31],[77.96,-87.35],[78.98,-88.37],[80.2,-91.22],[83.47,-94.08],[84.08,-97.35],[85.31,-100.0]]},{"c":"#BB9071","p":[[106.53,-108.78],[104.49,-110.2],[100.0,-111.43],[98.78,-111.02],[97.96,-110.0],[97.14,-107.14],[95.71,-105.1],[95.1,-102.24],[93.06,-97.55],[89.8,-94.69],[88.57,-91.84],[86.12,-89.8],[82.86,-86.12],[80.41,-84.49],[77.35,-83.27],[75.1,-80.41],[72.24,-79.18],[69.18,-77.14],[66.94,-76.53],[64.69,-76.73],[62.65,-75.92],[60.0,-71.43],[58.37,-69.8],[53.27,-66.33],[53.27,-64.49],[55.31,-63.47],[61.43,-65.1],[66.12,-69.59],[70.2,-71.63],[80.2,-75.31],[84.29,-78.57],[86.53,-81.22],[90.61,-83.06],[93.27,-86.12],[95.51,-87.96],[98.57,-92.45],[99.8,-95.31],[102.86,-98.16],[104.9,-102.24],[105.31,-104.69],[106.53,-107.35]]}]},"kop":{"c":"#8A593D","basis":[[57.14,-190.61],[56.73,-189.59],[59.59,-183.06],[59.59,-181.22],[60.41,-179.8],[60.41,-175.51],[61.22,-174.08],[61.22,-171.43],[59.59,-168.98],[56.94,-168.98],[52.04,-173.47],[50.41,-176.53],[50.41,-164.29],[59.59,-162.65],[65.71,-160.0],[79.39,-149.8],[84.69,-147.14],[86.53,-147.14],[87.35,-146.33],[87.35,-142.04],[94.08,-141.84],[99.59,-93.06],[105.1,-102.86],[105.1,-105.51],[106.73,-107.76],[106.73,-109.59],[107.76,-111.63],[108.78,-112.65],[114.29,-112.86],[115.71,-113.67],[120.0,-113.67],[121.43,-114.49],[124.9,-114.49],[128.78,-112.86],[130.61,-112.86],[132.65,-113.88],[134.29,-115.51],[136.12,-118.37],[136.94,-120.82],[136.73,-122.24],[134.29,-124.69],[131.63,-125.92],[129.39,-127.96],[122.65,-132.24],[121.43,-133.88],[121.22,-135.31],[115.31,-138.78],[113.27,-142.04],[113.27,-143.06],[114.49,-144.49],[118.98,-146.33],[120.82,-146.33],[124.49,-148.16],[127.76,-150.61],[131.22,-158.37],[131.22,-163.47],[130.41,-164.49],[129.18,-163.88],[128.98,-160.0],[125.71,-153.06],[120.82,-150.2],[119.8,-150.2],[118.98,-151.02],[118.98,-152.04],[122.86,-156.33],[124.69,-161.63],[124.69,-168.37],[123.88,-169.39],[122.65,-168.78],[120.82,-160.0],[118.37,-156.73],[117.35,-156.73],[116.53,-157.55],[116.53,-163.47],[114.9,-165.1],[115.51,-167.14],[114.29,-167.76],[113.67,-166.12],[115.1,-164.9],[114.29,-163.47],[114.29,-160.0],[113.47,-158.57],[112.65,-154.29],[111.84,-153.47],[110.0,-153.47],[108.57,-154.69],[106.73,-159.18],[106.73,-168.37],[110.0,-177.96],[110.0,-188.78],[109.18,-189.8],[107.76,-188.78],[107.76,-180.41],[104.49,-173.88],[103.47,-173.88],[102.65,-174.69],[101.84,-177.14],[101.84,-179.8],[102.65,-181.22],[102.65,-186.33],[101.84,-187.76],[101.84,-190.41],[99.59,-195.92],[98.16,-195.51],[98.78,-191.84],[99.59,-190.41],[99.59,-182.04],[97.96,-178.78],[96.94,-178.78],[95.51,-180.0],[91.02,-190.0],[88.78,-193.06],[88.16,-193.06],[87.76,-192.04],[90.61,-183.88],[90.61,-182.04],[89.8,-181.22],[88.37,-181.43],[86.53,-183.27],[84.69,-186.53],[83.47,-185.92],[84.08,-182.86],[85.92,-179.8],[89.18,-176.73],[95.1,-173.27],[97.96,-170.41],[101.22,-164.29],[102.04,-157.55],[102.86,-156.12],[102.86,-154.29],[104.49,-151.22],[104.49,-149.39],[103.67,-148.57],[99.39,-148.57],[96.53,-149.59],[95.31,-151.02],[95.31,-153.67],[94.49,-155.1],[94.49,-158.57],[92.04,-164.49],[90.82,-163.88],[90.82,-162.86],[91.43,-161.84],[91.43,-156.73],[92.24,-155.31],[92.24,-152.65],[90.61,-151.02],[88.78,-151.02],[84.29,-152.86],[81.02,-155.1],[78.37,-157.96],[76.53,-161.63],[76.53,-174.9],[75.71,-176.33],[75.71,-178.98],[74.9,-181.43],[73.27,-184.08],[72.65,-184.08],[72.24,-183.06],[72.65,-180.41],[73.47,-178.98],[73.47,-167.35],[71.84,-164.9],[69.18,-164.9],[67.96,-165.71],[65.1,-170.61],[64.29,-176.53],[61.84,-183.88],[58.37,-190.0]],"lagen":[{"c":"#9A6F54","p":[[100.0,-135.1],[98.78,-132.04],[99.39,-129.39],[97.96,-125.71],[97.96,-121.84],[102.04,-117.55],[102.65,-116.12],[102.86,-112.24],[104.29,-110.82],[105.51,-110.61],[106.53,-111.02],[109.18,-114.9],[111.84,-115.92],[115.71,-114.9],[118.37,-113.67],[120.61,-113.88],[122.86,-115.51],[124.69,-118.16],[127.35,-119.39],[129.18,-122.24],[129.39,-124.29],[128.57,-125.1],[119.8,-128.98],[115.92,-128.98],[112.65,-127.96],[109.39,-128.78],[107.76,-131.43],[107.35,-135.31],[106.73,-136.53],[105.51,-137.35],[104.49,-137.55],[101.63,-136.73]]}]},"staart":{"c":"#8A593D","basis":[[-64.29,-105.31],[-67.76,-99.8],[-68.57,-95.51],[-69.39,-94.08],[-68.57,-88.98],[-66.94,-85.51],[-66.33,-85.51],[-64.69,-87.55],[-63.27,-87.14],[-60.61,-97.76]],"lagen":[]},"keelkap":{"c":"#8A593D","basis":[[92.04,-155.71],[92.24,-152.65],[91.02,-151.22],[88.78,-151.02],[85.92,-152.04],[83.06,-148.37],[84.69,-147.14],[86.53,-147.14],[87.35,-146.33],[87.35,-139.59],[88.98,-134.69],[83.67,-129.8],[80.82,-127.96],[80.0,-126.53],[82.24,-118.98],[84.69,-114.29],[87.35,-111.02],[92.24,-107.35],[94.9,-106.33],[99.18,-106.12],[102.04,-106.94],[105.71,-109.18],[108.78,-112.86],[111.02,-117.35],[112.86,-126.53],[112.65,-133.27],[111.63,-138.57],[110.0,-143.27],[107.55,-147.96],[103.88,-152.24],[104.49,-151.22],[104.49,-149.39],[103.67,-148.57],[99.39,-148.57],[96.94,-149.39],[95.31,-151.02],[95.31,-153.67],[94.49,-156.12]],"lagen":[]}},"tonen":["#7A4D33","#9A6F54","#8A593D","#423D40","#BB9071"],"oog":[112.65,-131.43],"K":1.225,"omtrek":[[109.18,-189.8],[107.76,-188.78],[107.76,-180.41],[104.49,-173.88],[102.65,-174.69],[101.84,-177.14],[102.65,-186.33],[99.59,-195.92],[98.16,-195.51],[99.59,-190.41],[99.59,-182.04],[97.96,-178.78],[95.51,-180.0],[88.78,-193.06],[87.76,-192.04],[90.61,-182.04],[88.37,-181.43],[84.69,-186.53],[83.47,-185.92],[85.92,-179.8],[95.1,-173.27],[98.57,-169.59],[101.22,-164.29],[102.04,-157.55],[104.49,-151.22],[103.67,-148.57],[99.39,-148.57],[95.51,-150.61],[94.49,-158.57],[92.04,-164.49],[90.82,-163.88],[92.24,-152.65],[91.02,-151.22],[86.33,-151.84],[78.98,-157.14],[76.53,-161.63],[76.53,-174.9],[73.27,-184.08],[72.24,-183.06],[73.47,-178.98],[73.47,-167.35],[71.84,-164.9],[69.18,-164.9],[65.1,-170.61],[61.84,-183.88],[57.76,-190.61],[56.73,-189.59],[59.59,-183.06],[61.22,-171.43],[59.59,-168.98],[56.53,-169.18],[52.04,-173.47],[47.14,-181.63],[46.12,-180.61],[48.98,-170.61],[47.14,-169.8],[40.82,-175.1],[38.98,-178.78],[37.96,-185.1],[36.12,-185.1],[35.92,-178.78],[38.37,-172.24],[36.53,-171.43],[33.27,-175.1],[32.24,-174.69],[33.67,-170.2],[36.12,-167.76],[42.24,-165.1],[52.24,-164.29],[63.67,-161.02],[79.39,-149.8],[87.35,-146.33],[87.35,-139.59],[88.98,-134.69],[77.96,-124.9],[71.02,-120.82],[66.12,-119.18],[52.04,-119.18],[42.24,-120.82],[24.49,-117.55],[12.04,-117.55],[10.61,-116.73],[8.16,-117.55],[-5.1,-117.55],[-21.22,-120.0],[-32.04,-120.0],[-48.37,-115.1],[-59.39,-109.18],[-64.29,-105.31],[-67.76,-99.8],[-69.39,-92.24],[-66.94,-85.51],[-64.69,-87.55],[-62.86,-86.73],[-61.22,-69.39],[-63.88,-61.63],[-70.61,-54.69],[-76.53,-50.41],[-77.55,-47.55],[-79.18,-31.84],[-82.45,-17.96],[-84.9,-12.45],[-85.31,-8.16],[-82.45,-5.92],[-82.45,0.82],[-80.61,2.86],[-76.73,3.06],[-75.31,4.69],[-72.65,4.69],[-71.43,2.86],[-76.12,-6.53],[-76.12,-16.53],[-70.2,-36.53],[-63.47,-45.1],[-41.02,-60.61],[-38.37,-59.8],[-38.37,-56.33],[-41.84,-47.76],[-44.9,-43.47],[-44.9,-41.63],[-29.39,-12.45],[-28.37,-7.76],[-22.24,-3.06],[-20.2,2.04],[-13.06,3.06],[-11.22,1.43],[-11.84,-0.61],[-17.96,-6.94],[-23.67,-15.92],[-31.22,-33.47],[-31.22,-41.84],[-24.9,-51.84],[-17.35,-67.14],[-15.51,-67.96],[-8.37,-64.69],[1.43,-62.24],[24.49,-61.43],[25.92,-60.61],[32.65,-60.61],[33.47,-59.8],[31.84,-50.82],[31.84,-44.08],[30.2,-39.39],[30.2,-30.2],[27.76,-19.59],[24.49,-11.63],[24.49,-8.16],[27.76,-4.29],[27.76,0.82],[30.82,3.06],[36.73,3.06],[37.76,2.24],[32.45,-8.16],[33.27,-19.8],[34.9,-26.33],[36.73,-27.14],[38.37,-25.51],[37.55,-8.16],[41.63,-3.47],[41.84,2.04],[44.69,4.69],[52.86,4.08],[51.84,1.02],[45.51,-8.16],[43.88,-17.96],[43.88,-27.14],[45.51,-31.84],[45.51,-45.1],[48.98,-59.39],[59.18,-63.27],[65.51,-69.39],[79.59,-74.69],[91.22,-83.67],[100.0,-93.47],[105.1,-102.86],[105.1,-105.51],[108.78,-112.65],[121.43,-114.49],[130.61,-112.86],[134.29,-115.51],[136.94,-120.82],[135.31,-123.88],[122.65,-132.24],[121.22,-135.31],[115.31,-138.78],[113.27,-142.04],[114.49,-144.49],[120.82,-146.33],[127.76,-150.61],[131.22,-158.37],[131.22,-163.47],[130.41,-164.49],[129.18,-163.88],[128.98,-160.0],[125.71,-153.06],[119.8,-150.2],[118.98,-152.04],[122.86,-156.33],[124.69,-161.63],[124.69,-168.37],[123.88,-169.39],[122.65,-168.78],[120.82,-160.0],[118.37,-156.73],[116.53,-157.55],[116.53,-163.47],[114.9,-165.1],[115.51,-167.14],[114.29,-167.76],[113.67,-166.12],[115.1,-164.9],[112.65,-154.29],[110.0,-153.47],[108.57,-154.69],[106.73,-159.18],[106.73,-168.37],[110.0,-177.96],[110.0,-188.78]],"neusgat":[135.51,-119.18],"mond":[[126.53,-114.29],[136.33,-115.1]]},"koe":{"J":{"midrug":[0.0,-133.29],"nekBasis":[79.22,-102.28],"lend":[-33.95,-134.97],"kruis":[-75.45,-131.62],"kop":[105.63,-145.87],"neus":[133.54,-110.66],"kaak":[109.4,-117.37],"kin":[126.75,-103.95],"schoft":[56.59,-123.23],"schouder":[76.96,-82.99],"elleboog":[60.36,-57.01],"pols":[61.87,-28.5],"vkogel":[61.87,-8.38],"vteen":[67.9,0.0],"heup":[-60.36,-102.28],"knie":[-39.23,-68.74],"hak":[-60.36,-39.4],"akogel":[-61.87,-8.38],"ateen":[-54.32,0.0],"staart0":[-90.54,-133.29],"staart1":[-94.31,-106.47],"staart2":[-95.82,-81.32],"staart3":[-97.33,-56.17],"staart4":[-98.84,-31.02]},"delen":{"romp":{"c":"#834B30","basis":[[79.98,-89.7],[51.49,-133.5],[51.31,-140.84],[48.85,-140.84],[47.53,-141.68],[43.57,-141.68],[42.25,-142.51],[25.46,-142.51],[24.14,-141.68],[15.66,-141.68],[14.34,-142.51],[5.09,-142.51],[3.77,-141.68],[-0.19,-141.68],[-1.51,-140.84],[-20.56,-140.84],[-21.88,-140.0],[-32.63,-140.0],[-33.95,-139.16],[-45.46,-139.16],[-46.78,-140.0],[-58.28,-140.0],[-59.6,-139.16],[-66.58,-139.16],[-67.9,-140.0],[-75.64,-140.0],[-76.96,-139.16],[-80.16,-139.16],[-81.49,-138.32],[-83.18,-138.32],[-86.77,-135.81],[-84.31,-123.65],[-88.28,-94.52],[-88.28,-91.38],[-86.77,-86.56],[-86.77,-82.99],[-86.01,-81.53],[-86.01,-78.8],[-85.26,-77.34],[-85.26,-72.93],[-86.01,-71.47],[-86.01,-59.94],[-85.26,-59.31],[-84.5,-56.59],[-79.79,-51.35],[-78.84,-51.35],[-78.28,-50.51],[-76.58,-50.51],[-76.01,-49.67],[-72.05,-49.67],[-71.49,-48.83],[-68.28,-48.83],[-67.72,-49.67],[-64.7,-49.67],[-63.57,-51.35],[-62.62,-51.35],[-61.87,-49.67],[-59.04,-49.67],[-57.53,-51.35],[-55.08,-51.35],[-53.95,-49.67],[-53.38,-50.51],[-50.74,-50.51],[-49.61,-51.98],[-46.4,-53.23],[-40.18,-58.89],[-35.46,-58.89],[-32.63,-57.22],[-25.84,-54.7],[-21.13,-53.86],[-19.81,-53.02],[-15.09,-53.02],[-13.77,-53.86],[-9.05,-53.86],[-7.73,-54.7],[-3.77,-54.7],[-2.45,-55.54],[0.0,-55.54],[1.32,-56.38],[3.77,-56.38],[5.09,-57.22],[7.54,-57.22],[8.87,-58.05],[21.13,-58.05],[24.14,-56.38],[24.14,-53.23],[29.61,-47.16],[30.56,-47.16],[31.12,-46.32],[32.82,-46.32],[33.39,-45.48],[37.35,-45.48],[37.91,-44.64],[39.61,-44.64],[40.18,-45.48],[44.14,-45.48],[44.7,-46.32],[46.4,-46.32],[48.1,-48.83],[53.57,-49.67],[57.72,-53.02],[62.43,-60.99],[68.28,-67.49],[69.98,-71.26],[72.43,-79.43],[76.77,-86.14]],"lagen":[{"c":"#E8D7C6","p":[[41.87,-142.31],[26.41,-142.51],[25.09,-141.89],[24.33,-141.05],[24.33,-139.58],[25.46,-136.86],[25.09,-133.92],[24.52,-132.87],[21.5,-129.94],[20.37,-126.8],[17.73,-123.65],[17.16,-118.2],[14.52,-112.96],[14.34,-110.87],[15.09,-108.98],[16.22,-108.14],[17.73,-108.14],[21.31,-109.61],[23.39,-109.19],[24.9,-107.93],[26.03,-105.63],[26.22,-101.44],[25.46,-98.08],[22.63,-93.05],[22.63,-89.07],[23.77,-86.56],[25.84,-88.44],[28.1,-93.68],[31.31,-96.83],[31.5,-99.76],[30.18,-103.11],[29.99,-105.84],[29.43,-107.31],[29.43,-109.19],[31.5,-115.27],[30.93,-117.57],[31.12,-119.04],[32.25,-122.4],[34.14,-125.54],[35.65,-127.22],[38.67,-129.31],[39.42,-134.13],[40.93,-137.28],[43.38,-140.21],[43.19,-141.26]]},{"c":"#E8D7C6","p":[[-40.93,-139.16],[-45.46,-139.37],[-46.78,-140.0],[-58.28,-140.0],[-61.11,-139.16],[-65.07,-139.16],[-67.9,-140.0],[-74.69,-140.0],[-76.77,-138.53],[-76.2,-132.87],[-75.07,-131.41],[-70.36,-129.31],[-67.9,-129.1],[-64.51,-127.63],[-63.38,-126.38],[-62.62,-123.44],[-62.81,-120.72],[-64.13,-116.74],[-64.13,-113.38],[-63.0,-110.66],[-62.62,-108.35],[-62.81,-104.79],[-66.4,-94.94],[-70.92,-89.7],[-71.11,-84.67],[-71.68,-83.2],[-74.51,-79.85],[-74.51,-78.17],[-73.37,-73.98],[-73.37,-72.1],[-73.94,-70.63],[-74.13,-65.39],[-74.69,-64.13],[-77.52,-60.99],[-78.66,-55.33],[-80.73,-50.3],[-80.73,-49.04],[-78.66,-45.48],[-78.47,-41.92],[-77.9,-40.03],[-75.07,-35.84],[-74.88,-34.58],[-75.45,-32.28],[-71.87,-19.49],[-71.68,-12.16],[-70.54,-10.69],[-68.47,-9.64],[-67.15,-8.17],[-66.21,-4.19],[-64.51,-3.14],[-62.06,-3.77],[-60.17,-4.82],[-59.04,-6.29],[-59.04,-7.54],[-60.93,-11.95],[-61.49,-15.09],[-63.19,-18.65],[-63.57,-21.17],[-64.89,-25.15],[-65.83,-31.02],[-65.83,-42.13],[-64.13,-53.02],[-60.17,-66.23],[-57.53,-72.1],[-54.7,-75.66],[-52.81,-76.92],[-49.99,-77.96],[-46.78,-77.96],[-43.19,-76.5],[-33.76,-68.74],[-32.25,-68.74],[-31.12,-70.0],[-31.31,-77.34],[-33.2,-78.8],[-34.9,-79.01],[-37.16,-80.06],[-39.61,-81.95],[-41.5,-84.67],[-41.5,-90.75],[-40.37,-93.26],[-40.18,-95.36],[-42.06,-97.66],[-43.01,-99.76],[-43.19,-106.05],[-42.82,-108.14],[-41.12,-110.87],[-41.31,-111.92],[-42.06,-112.54],[-43.76,-112.34],[-44.51,-111.29],[-45.08,-107.93],[-46.59,-106.26],[-52.44,-103.74],[-54.13,-103.53],[-55.27,-103.95],[-56.78,-105.21],[-57.34,-106.47],[-57.15,-110.66],[-55.46,-114.43],[-53.19,-116.95],[-52.44,-118.41],[-52.06,-122.6],[-50.74,-125.33],[-48.85,-127.43],[-46.59,-131.41],[-45.08,-133.08],[-41.69,-134.55],[-39.04,-136.44],[-39.04,-137.9]]},{"c":"#E8D7C6","p":[[23.96,-84.25],[23.39,-84.67],[21.69,-83.2],[20.18,-81.32],[18.49,-77.54],[16.03,-76.08],[12.45,-76.29],[11.32,-76.92],[9.05,-79.64],[7.73,-80.27],[4.9,-79.22],[3.96,-78.17],[3.4,-75.66],[0.38,-70.0],[-3.4,-67.07],[-3.4,-65.18],[-1.13,-63.92],[5.28,-65.6],[7.54,-66.86],[11.88,-68.32],[13.77,-68.11],[16.6,-66.65],[18.67,-66.44],[24.52,-68.74],[25.46,-70.0],[25.46,-76.5],[24.9,-77.96],[24.71,-82.16]]},{"c":"#E8D7C6","p":[[70.73,-77.96],[68.85,-78.17],[65.45,-75.87],[62.06,-75.03],[60.17,-75.87],[59.42,-76.71],[58.47,-79.85],[57.53,-80.69],[55.46,-80.69],[50.93,-78.8],[49.23,-76.92],[48.85,-74.61],[47.91,-72.51],[45.08,-70.0],[43.95,-67.9],[43.01,-64.34],[43.57,-61.62],[42.25,-58.26],[43.57,-57.22],[46.97,-55.75],[48.29,-54.28],[48.85,-53.02],[49.04,-50.72],[50.17,-49.46],[52.25,-49.46],[56.02,-51.35],[58.28,-53.65],[62.43,-60.78],[68.47,-67.69],[71.3,-75.66],[71.3,-77.13]]},{"c":"#C6AD9B","p":[[-87.14,-95.78],[-88.28,-94.52],[-88.28,-91.38],[-87.33,-87.4],[-86.2,-84.88],[-86.01,-78.8],[-85.26,-75.66],[-86.2,-68.74],[-89.03,-59.94],[-90.54,-58.68],[-94.31,-57.84],[-95.07,-56.8],[-95.82,-53.86],[-100.16,-47.57],[-101.1,-44.64],[-101.1,-41.5],[-100.16,-40.24],[-99.22,-39.82],[-95.63,-40.87],[-93.56,-40.45],[-90.54,-37.72],[-85.63,-35.42],[-83.18,-36.89],[-80.35,-43.8],[-80.16,-47.16],[-80.73,-48.62],[-80.73,-50.51],[-78.84,-54.7],[-77.9,-58.68],[-77.9,-69.79],[-78.47,-71.26],[-78.66,-73.98],[-80.73,-79.64],[-81.11,-82.99],[-82.24,-85.51],[-82.43,-88.23],[-83.94,-93.26],[-85.07,-95.36]]},{"c":"#C6AD9B","p":[[-63.38,-52.4],[-61.49,-50.51],[-60.17,-50.09],[-58.28,-50.3],[-55.83,-49.25],[-54.51,-47.16],[-54.13,-45.27],[-53.19,-44.43],[-51.87,-44.43],[-50.74,-45.69],[-50.55,-49.67],[-49.23,-51.77],[-46.59,-53.02],[-43.76,-55.12],[-41.31,-57.63],[-38.67,-58.68],[-36.22,-58.68],[-25.84,-54.7],[-19.81,-53.02],[-15.09,-53.02],[-13.77,-53.65],[-3.77,-54.7],[-2.45,-55.33],[0.0,-55.54],[1.32,-56.17],[3.77,-56.38],[10.37,-58.05],[22.82,-57.84],[23.96,-59.1],[23.96,-65.18],[23.2,-66.23],[22.07,-66.65],[18.67,-66.02],[16.41,-66.44],[12.45,-68.11],[10.75,-68.11],[2.26,-64.76],[-2.26,-63.71],[-7.36,-64.13],[-10.56,-65.39],[-13.01,-65.39],[-15.84,-64.55],[-19.62,-64.97],[-24.33,-64.76],[-32.25,-67.49],[-39.99,-74.19],[-45.46,-77.75],[-50.55,-77.96],[-54.51,-75.87],[-57.34,-72.51],[-60.17,-66.23],[-63.38,-55.54]]}]},"hum":{"c":"#834B30","basis":[[58.28,-130.36],[44.33,-128.68],[47.16,-64.13],[52.44,-54.49],[58.66,-54.49],[62.43,-60.99],[68.28,-67.49],[69.98,-71.26],[72.43,-79.43],[76.77,-86.14],[80.16,-89.91]],"lagen":[]},"dij":{"c":"#834B30","basis":[[-86.01,-132.04],[-84.31,-122.6],[-88.28,-94.52],[-88.28,-91.38],[-86.77,-86.56],[-86.77,-82.99],[-86.01,-80.48],[-46.02,-70.0],[-36.78,-62.66],[-29.05,-66.86],[-30.75,-132.04]],"lagen":[]},"nek":{"c":"#834B30","basis":[[98.46,-148.59],[96.01,-147.34],[93.18,-143.56],[91.29,-142.51],[88.09,-142.51],[83.75,-140.84],[79.03,-140.84],[77.71,-140.0],[64.7,-140.0],[63.38,-140.84],[55.64,-140.84],[54.32,-140.0],[55.08,-74.4],[70.73,-74.4],[72.24,-79.01],[76.77,-86.14],[81.11,-90.75],[86.2,-98.29],[88.84,-99.97],[95.63,-102.49],[97.33,-102.49],[100.16,-100.81],[102.04,-100.81]],"lagen":[]},"kop":{"c":"#E8D7C6","basis":[[89.03,-146.71],[98.08,-149.22],[107.14,-145.03],[114.68,-136.65],[122.98,-125.75],[129.77,-116.53],[133.54,-111.5],[135.81,-105.63],[133.54,-99.76],[128.26,-97.25],[121.47,-98.08],[112.42,-100.6],[102.61,-103.11],[95.07,-107.31],[89.78,-114.85],[86.77,-124.91],[86.01,-135.81]],"lagen":[{"c":"#834B30","p":[[81.49,-145.87],[98.84,-147.54],[104.87,-138.32],[110.16,-124.91],[113.17,-112.34],[107.89,-103.11],[97.33,-103.95],[88.28,-96.41],[79.98,-92.22],[72.43,-95.57],[74.69,-110.66],[79.98,-124.07],[81.49,-135.81]]},{"c":"#D8B6A6","p":[[127.51,-118.2],[133.54,-112.34],[135.81,-103.95],[129.77,-97.25],[123.74,-101.44],[125.25,-111.5]]}]},"staart":{"c":"#834B30","basis":[[-86.96,-135.81],[-91.1,-131.41],[-94.31,-123.44],[-94.31,-119.04],[-95.07,-117.57],[-95.07,-108.98],[-94.31,-107.51],[-94.31,-90.54],[-95.07,-89.07],[-95.07,-85.51],[-95.82,-84.04],[-96.57,-79.64],[-102.61,-67.28],[-104.12,-62.25],[-104.12,-58.68],[-104.87,-57.22],[-104.87,-56.17],[-103.37,-53.86],[-103.37,-46.11],[-101.29,-43.38],[-100.91,-40.66],[-99.4,-38.98],[-98.46,-38.98],[-94.12,-43.59],[-92.8,-43.8],[-92.05,-42.96],[-92.05,-37.72],[-92.8,-36.26],[-92.8,-25.99],[-93.56,-24.52],[-93.56,-20.96],[-94.31,-18.44],[-90.73,-18.44],[-90.73,-72.31],[-91.48,-73.77],[-91.48,-88.23],[-90.73,-89.7],[-90.73,-94.94],[-89.97,-95.78],[-89.03,-95.78],[-88.28,-94.73],[-84.5,-122.6]],"lagen":[]},"keelkap":{"c":"#834B30","basis":[[99.59,-108.98],[90.54,-103.95],[82.99,-95.57],[74.69,-93.89],[70.92,-103.95],[76.96,-117.37],[84.5,-125.75],[96.57,-119.04]],"lagen":[]},"oor":{"c":"#6A3824","basis":[[95.07,-141.68],[84.5,-144.19],[73.94,-144.19],[67.9,-140.84],[72.43,-135.81],[83.75,-133.29],[95.07,-133.29]],"lagen":[{"c":"#C99A88","p":[[87.52,-139.16],[81.49,-140.84],[76.2,-140.84],[74.69,-139.16],[76.96,-137.49],[82.24,-136.65],[87.52,-136.65]]}]},"kaak":{"c":"#E8D7C6","basis":[[113.17,-103.11],[128.26,-99.76],[126.75,-95.57],[114.68,-95.57]],"lagen":[]}},"tonen":["#C6AD9B","#834B30","#E8D7C6","#565051"],"oog":[105.63,-128.26],"K":1.1928571428571428,"omtrek":[[132.6,-110.03],[118.27,-127.84],[115.81,-134.76],[108.46,-142.1],[106.76,-148.17],[104.12,-150.06],[99.78,-149.85],[91.29,-142.51],[77.71,-140.0],[64.7,-140.0],[63.38,-140.84],[53.38,-140.0],[42.25,-142.51],[25.46,-142.51],[24.14,-141.68],[5.09,-142.51],[-1.51,-140.84],[-20.56,-140.84],[-33.95,-139.16],[-75.64,-140.0],[-83.18,-138.32],[-90.35,-132.46],[-94.31,-123.44],[-95.07,-117.57],[-94.31,-90.54],[-96.57,-79.64],[-102.61,-67.28],[-104.87,-57.22],[-103.37,-53.86],[-103.37,-46.11],[-101.29,-43.38],[-100.91,-40.66],[-98.46,-38.98],[-94.12,-43.59],[-92.05,-42.96],[-92.8,-25.99],[-95.44,-10.27],[-91.48,-8.17],[-91.29,-1.68],[-89.6,0.42],[-87.71,1.47],[-79.98,1.47],[-79.03,0.63],[-85.45,-12.57],[-85.45,-25.36],[-83.94,-35.42],[-80.92,-42.96],[-79.22,-43.8],[-72.43,-22.84],[-70.73,-7.96],[-66.58,-5.66],[-66.4,-0.84],[-63.94,2.1],[-54.32,2.31],[-53.38,0.84],[-61.3,-12.57],[-65.83,-29.34],[-65.83,-43.8],[-65.07,-48.83],[-63.57,-51.35],[-61.87,-50.51],[-61.87,-45.27],[-60.93,-44.01],[-59.04,-45.27],[-58.85,-50.09],[-57.53,-51.35],[-55.08,-51.35],[-54.32,-50.51],[-54.32,-45.27],[-52.06,-43.8],[-50.74,-45.27],[-50.55,-50.93],[-44.14,-54.91],[-40.18,-58.89],[-35.46,-58.89],[-19.81,-53.02],[-3.77,-54.7],[8.87,-58.05],[21.13,-58.05],[24.14,-56.38],[24.14,-41.92],[23.39,-40.45],[24.14,-25.99],[20.37,-11.95],[20.56,-7.96],[23.39,-6.08],[22.63,-0.84],[23.58,1.26],[26.22,3.14],[34.71,3.14],[35.65,2.31],[30.75,-8.38],[29.99,-18.65],[31.5,-28.71],[34.52,-34.58],[36.22,-35.42],[37.72,-32.07],[37.72,-25.99],[38.48,-24.52],[38.48,-19.28],[36.97,-12.78],[37.72,-8.38],[40.74,-6.08],[40.74,-1.68],[43.19,1.26],[52.06,1.47],[53.0,0.0],[46.59,-10.9],[46.59,-14.46],[45.08,-19.28],[45.08,-29.55],[47.34,-37.72],[46.59,-41.08],[47.34,-47.99],[53.57,-49.67],[57.72,-53.02],[62.43,-60.99],[68.28,-67.49],[73.94,-81.95],[86.96,-98.92],[97.33,-102.49],[100.16,-100.81],[108.65,-100.81],[109.97,-101.65],[116.95,-100.81],[120.53,-98.29],[123.74,-98.29],[131.66,-103.53]],"neusgat":[129.02,-109.82],"mond":[[114.68,-102.28],[126.75,-103.11]]},"nijlpaard":{"J":{"midrug":[0.0,-142.64],"nekBasis":[110.43,-105.83],"lend":[-46.01,-140.8],"kruis":[-105.83,-123.31],"kop":[156.44,-121.47],"neus":[228.23,-59.27],"kaak":[155.16,-70.48],"kin":[223.01,-63.32],"schoft":[78.22,-110.43],"schouder":[101.23,-78.22],"elleboog":[78.22,-46.01],"pols":[80.98,-20.25],"vkogel":[80.98,-8.28],"vteen":[92.02,0.0],"heup":[-87.42,-82.82],"knie":[-59.82,-47.85],"hak":[-82.82,-25.77],"akogel":[-80.98,-8.28],"ateen":[-69.94,0.0],"staart0":[-115.95,-112.27],"staart1":[-120.55,-101.23],"staart2":[-123.31,-92.02],"staart3":[-125.15,-84.66],"staart4":[-126.07,-78.22]},"delen":{"romp":{"c":"#655458","basis":[[138.73,-74.54],[106.75,-82.36],[106.29,-150.0],[101.0,-150.0],[99.39,-150.92],[95.48,-150.92],[93.87,-151.84],[88.11,-151.84],[83.74,-153.68],[80.75,-153.68],[79.14,-154.6],[58.67,-154.6],[57.06,-153.68],[52.22,-153.68],[50.61,-152.76],[47.62,-152.76],[46.01,-151.84],[42.1,-151.84],[40.49,-150.92],[33.82,-150.92],[32.21,-150.0],[12.65,-150.0],[11.04,-150.92],[0.69,-150.92],[-0.92,-151.84],[-9.43,-151.84],[-11.04,-152.76],[-35.2,-152.76],[-36.81,-151.84],[-42.56,-151.84],[-44.17,-150.92],[-48.08,-150.92],[-49.69,-150.0],[-55.44,-149.08],[-59.82,-147.24],[-61.89,-147.24],[-65.34,-145.4],[-71.09,-143.56],[-87.19,-135.05],[-99.39,-125.84],[-103.76,-121.47],[-111.35,-111.58],[-110.43,-108.36],[-115.49,-84.43],[-115.03,-82.36],[-114.11,-81.67],[-114.11,-79.6],[-112.27,-77.99],[-112.27,-76.84],[-110.43,-76.61],[-109.51,-75.69],[-109.51,-62.58],[-108.59,-60.97],[-108.59,-55.67],[-107.67,-54.98],[-107.67,-52.91],[-105.83,-51.3],[-105.83,-50.15],[-98.24,-42.56],[-97.09,-42.56],[-92.71,-39.8],[-90.64,-39.8],[-89.95,-38.88],[-84.2,-38.88],[-83.05,-39.8],[-81.9,-39.8],[-80.98,-37.96],[-79.6,-37.96],[-78.91,-37.04],[-72.24,-37.04],[-71.55,-36.12],[-67.64,-36.12],[-66.95,-37.04],[-60.28,-37.04],[-59.59,-37.96],[-57.52,-37.96],[-56.83,-38.88],[-51.99,-40.72],[-51.53,-43.02],[-50.38,-44.17],[-48.77,-44.4],[-29.68,-37.04],[-23.01,-36.12],[-21.4,-35.2],[-17.48,-35.2],[-15.87,-34.28],[-7.36,-34.28],[-5.75,-33.36],[3.68,-33.36],[5.29,-34.28],[14.72,-34.28],[16.33,-35.2],[25.77,-36.12],[27.38,-37.04],[36.81,-38.88],[54.06,-45.32],[56.13,-45.32],[58.21,-42.56],[60.28,-42.56],[60.97,-41.64],[67.64,-41.64],[68.33,-40.72],[72.24,-40.72],[72.93,-41.64],[79.6,-41.64],[80.29,-42.56],[82.36,-42.56],[83.05,-43.48],[87.88,-45.32],[92.71,-50.15],[94.56,-53.6],[99.85,-55.67],[108.36,-62.81],[111.35,-62.81],[114.11,-61.89],[120.32,-64.65],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[133.67,-63.04],[138.73,-60.97]],"lagen":[{"c":"#A7766F","p":[[-47.85,-97.55],[-34.97,-66.26],[-11.04,-42.33],[27.61,-34.05],[66.26,-44.17],[84.66,-71.78],[66.26,-60.74],[31.29,-53.37],[-3.68,-57.98],[-25.77,-75.46],[-39.57,-95.71]]},{"c":"#57494E","p":[[-110.43,-133.44],[-64.42,-147.24],[0.0,-150.92],[55.21,-147.24],[92.02,-136.2],[55.21,-138.04],[0.0,-140.8],[-59.82,-137.12],[-101.23,-123.31]]}]},"hum":{"c":"#655458","basis":[[64.88,-116.18],[63.96,-53.6],[69.71,-43.25],[87.65,-43.25],[91.56,-44.63],[92.71,-50.84],[93.63,-52.68],[96.4,-54.52],[99.85,-55.67],[108.36,-62.81],[111.35,-62.81],[114.11,-61.89],[120.32,-64.65],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[133.67,-63.04],[138.73,-60.97],[138.73,-74.54],[106.75,-82.13],[80.06,-118.02]],"lagen":[]},"dij":{"c":"#655458","basis":[[-108.82,-114.8],[-111.35,-111.58],[-110.43,-108.36],[-116.18,-79.6],[-115.95,-76.38],[-114.11,-74.31],[-113.42,-74.31],[-111.58,-76.61],[-110.43,-76.61],[-109.51,-75.69],[-109.51,-69.94],[-110.43,-68.33],[-110.43,-64.42],[-108.59,-60.97],[-108.59,-59.36],[-66.49,-49.0],[-57.06,-41.41],[-49.0,-45.78],[-55.67,-114.8]],"lagen":[]},"nek":{"c":"#655458","basis":[[76.38,-154.6],[77.76,-69.02],[129.06,-69.02],[131.13,-64.65],[137.81,-60.97],[139.88,-60.97],[141.49,-60.05],[144.48,-60.05],[146.09,-60.97],[150.0,-60.97],[152.07,-59.36],[157.82,-56.83],[159.43,-61.89],[156.21,-132.29],[154.14,-133.9],[150.69,-135.05],[151.38,-136.89],[148.62,-138.73],[140.8,-142.64],[130.67,-146.32],[124.0,-147.24],[122.39,-148.16],[119.4,-148.16],[117.79,-149.08],[111.12,-149.08],[109.51,-150.0],[101.0,-150.0],[99.39,-150.92],[95.48,-150.92],[93.87,-151.84],[88.11,-151.84],[83.74,-153.68]],"lagen":[{"c":"#A7766F","p":[[108.59,-103.07],[117.79,-108.59],[123.31,-82.82],[120.55,-57.06],[112.27,-53.37],[115.95,-79.14]]},{"c":"#A7766F","p":[[92.02,-97.55],[99.39,-101.23],[103.07,-73.62],[99.39,-49.69],[92.94,-51.53],[95.71,-75.46]]}]},"kop":{"c":"#655458","basis":[[138.41,-131.34],[153.44,-123.54],[157.72,-122.71],[156.86,-115.91],[160.86,-113.32],[173.45,-110.6],[178.38,-102.95],[193.42,-95.15],[208.45,-87.34],[218.51,-84.67],[227.25,-78.22],[230.9,-69.33],[228.74,-59.76],[221.32,-53.56],[213.26,-54.69],[196.65,-58.48],[180.04,-62.27],[169.21,-64.2],[162.64,-64.3],[151.26,-63.21],[136.94,-67.72],[118.29,-86.95],[111.49,-105.23]],"lagen":[{"c":"#8C6A6A","p":[[147.93,-93.31],[168.21,-81.64],[172.06,-69.46],[163.16,-64.8],[151.77,-63.71],[137.45,-68.22],[132.12,-82.95]]},{"c":"#B98680","p":[[173.31,-101.52],[171.88,-100.77],[170.09,-100.83],[168.3,-101.68],[166.86,-103.16],[166.06,-104.98],[166.05,-106.77],[166.84,-108.18],[168.28,-108.93],[170.07,-108.87],[171.86,-108.01],[173.29,-106.53],[174.1,-104.71],[174.1,-102.93]]},{"c":"#B98680","p":[[153.67,-121.76],[157.21,-122.22],[156.63,-117.68],[153.61,-117.72]]},{"c":"#57494E","p":[[217.49,-83.67],[226.48,-77.47],[230.14,-69.08],[227.99,-60.03],[221.34,-54.57],[214.79,-55.68],[214.9,-63.26],[216.59,-74.85]]}]},"staart":{"c":"#655458","basis":[[-111.58,-111.12],[-115.95,-101.46],[-116.87,-94.79],[-117.79,-93.17],[-117.79,-85.58],[-116.87,-83.97],[-116.41,-80.06],[-110.66,-108.36]],"lagen":[]},"kaak":{"c":"#655458","basis":[[153.87,-70.41],[161.8,-77.69],[176.59,-68.69],[202.58,-57.82],[218.29,-60.68],[223.58,-63.75],[227.29,-59.39],[221.29,-47.75],[205.86,-41.54],[186.29,-43.83],[171.01,-51.12],[157.94,-61.41]],"lagen":[]},"keelkap":{"c":"#655458","basis":[[137.35,-143.56],[134.13,-141.95],[126.99,-135.51],[121.24,-128.37],[116.41,-119.4],[113.19,-110.66],[111.12,-100.77],[110.66,-89.49],[111.81,-80.75],[114.11,-73.16],[118.25,-66.26],[120.09,-64.42],[122.39,-64.65],[124.0,-63.73],[127.91,-63.73],[129.52,-64.65],[131.6,-64.65],[137.81,-60.97],[144.48,-60.05],[150.69,-62.12],[157.82,-68.56],[163.57,-75.69],[168.4,-85.12],[171.63,-93.63],[173.7,-103.3],[174.16,-114.57],[173.7,-116.87],[170.02,-120.09],[166.33,-125.15],[167.25,-131.83],[165.18,-134.13],[163.57,-134.36],[160.12,-130.67],[158.05,-130.67],[152.53,-135.97],[148.62,-138.73],[140.8,-142.64]],"lagen":[]}},"tonen":["#514348","#A4746E","#655458","#896766"],"oog":[170.08,-104.85],"K":1.0866666666666667,"omtrek":[[206.83,-70.17],[204.75,-75.23],[199.0,-78.45],[194.86,-82.36],[181.29,-99.85],[181.98,-110.66],[178.07,-115.72],[172.32,-117.79],[166.56,-124.69],[167.02,-132.29],[163.57,-134.36],[160.12,-130.67],[158.05,-130.67],[148.62,-138.73],[130.67,-146.32],[117.79,-149.08],[88.11,-151.84],[79.14,-154.6],[58.67,-154.6],[32.21,-150.0],[12.65,-150.0],[-11.04,-152.76],[-35.2,-152.76],[-48.08,-150.92],[-71.09,-143.56],[-89.95,-133.21],[-103.76,-121.47],[-111.12,-112.04],[-114.11,-106.06],[-117.79,-93.17],[-117.79,-85.58],[-115.72,-75.92],[-114.11,-74.31],[-111.58,-76.61],[-109.51,-75.69],[-110.43,-64.42],[-108.59,-60.97],[-108.59,-51.53],[-110.66,-46.47],[-115.95,-38.88],[-115.03,-33.36],[-115.03,-10.12],[-115.95,-7.36],[-113.42,-3.91],[-106.06,-2.99],[-94.79,-2.99],[-89.72,-4.14],[-88.8,-7.13],[-91.56,-10.81],[-95.94,-13.8],[-95.02,-25.08],[-94.1,-27.84],[-83.05,-39.8],[-80.98,-38.88],[-81.9,-29.45],[-79.83,-25.31],[-76.61,-22.78],[-67.41,-9.89],[-65.11,-3.22],[-63.73,-2.07],[-48.77,-1.15],[-47.16,-2.07],[-39.57,-2.07],[-37.96,-3.68],[-37.96,-5.75],[-41.87,-9.89],[-47.16,-12.88],[-53.6,-26.69],[-53.6,-33.36],[-51.76,-42.56],[-49.92,-44.4],[-26.0,-36.12],[-15.87,-34.28],[3.68,-33.36],[25.77,-36.12],[56.13,-45.32],[57.06,-44.4],[57.06,-34.97],[56.13,-33.36],[57.06,-8.28],[56.13,-5.52],[57.29,-3.22],[63.27,-1.15],[81.9,-1.15],[87.19,-3.91],[95.71,-3.91],[97.78,-5.75],[96.17,-8.97],[88.11,-14.72],[87.19,-26.0],[89.03,-30.37],[89.03,-37.04],[93.63,-52.68],[99.85,-55.67],[107.9,-62.58],[114.11,-61.89],[120.32,-64.65],[124.0,-63.73],[131.6,-64.65],[141.49,-60.05],[150.0,-60.97],[157.36,-57.29],[162.19,-49.0],[168.17,-45.32],[185.89,-43.48],[191.87,-45.55],[194.86,-48.08],[198.77,-48.08],[201.99,-51.07],[204.06,-55.21]],"neusgat":[227.94,-73.92],"mond":[[162.66,-65.31],[162.66,-65.31]],"mondLijn":[[162.66,-65.31],[213.77,-55.19]],"mondNijl":{"gehemelte":[[214.0,-53.93],[199.47,-61.22],[184.91,-66.99],[172.54,-67.43],[163.16,-64.8]],"onderLijn":[[161.8,-77.69],[176.59,-68.69],[202.58,-57.82],[218.29,-60.68],[223.58,-63.75]],"tong":[[170.02,-72.69],[176.87,-74.26],[189.44,-69.4],[203.72,-62.25],[212.01,-63.11],[201.22,-53.68],[185.15,-57.26]],"slag":[[[205.15,-57.97],[184.01,-74.26],7.142044617421542],[[218.87,-61.11],[205.02,-85.54],6.07073792480831]],"snij":[[[222.15,-62.68],[227.29,-70.1],2.8568178469686165],[[221.29,-60.25],[229.15,-65.25],2.8568178469686165]],"boven":[[[207.98,-56.54],[202.55,-48.29],3.571022308710771],[[195.7,-62.54],[190.29,-55.8],3.2139200778396937]]}}};
// HOEFVORM>>

const HoefPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const lin = (a, b, u) => a + (b - a) * u;
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  // sleutelkromme [[u, waarde], ...] met zachte overgangen; per = periodiek (u modulo 1, laatste = eerste)
  const kurve = (K, u) => { u = Math.max(K[0][0], Math.min(K[K.length - 1][0], u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function spline(P) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u; const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); } }
    return out; }
  function openLijn(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / 0.7));
      for (let k = 0; k <= st; k++) { const u = k / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function binnen(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  // vlek: onregelmatige ronde vorm (cm)
  function vlekVorm(c, r, seed, rek = 1, hoek = 0) { const P = []; const n = 7; for (let i = 0; i < n; i++) { const a = i / n * 6.283; const rr = r * (0.78 + 0.4 * hsh(seed * 7.1 + i * 1.7));
      P.push(add(c, rot([Math.cos(a) * rr * rek, Math.sin(a) * rr], hoek))); } return spline(P); }
  // band (streep) langs een middenlijn met breedte die taps afloopt: lijn = [[x,y],...] (cm), w0 -> w1
  function streep(lijn, w0, w1) { const L = openLijn(lijn); const n = L.length; if (n < 2) return null; const l = [], r = [];
    for (let i = 0; i < n; i++) { const a = L[Math.max(0, i - 1)], b = L[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = i / (n - 1), w = lin(w0, w1, u) * Math.sin(Math.PI * Math.min(1, 0.15 + u * 0.85)) ** 0.35;
      l.push(add(L[i], mul(nn, w))); r.push(sub(L[i], mul(nn, w))); } return l.concat(r.reverse()); }

  // ---------- generieke botten ----------
  const POOTB = (z) => [['scap' + z, 'rompV', 'schoft', 'schouder'], ['hum' + z, 'scap' + z, 'schouder', 'elleboog'], ['rad' + z, 'hum' + z, 'elleboog', 'pols'], ['mc' + z, 'rad' + z, 'pols', 'vkogel'], ['vp' + z, 'mc' + z, 'vkogel', 'vteen'],
    ['dij' + z, 'rompA', 'heup', 'knie'], ['schn' + z, 'dij' + z, 'knie', 'hak'], ['mt' + z, 'schn' + z, 'hak', 'akogel'], ['ap' + z, 'mt' + z, 'akogel', 'ateen']];
  const BOTEN = [['rompV', null, 'midrug', 'nekBasis'], ['rompM', null, 'midrug', 'lend'], ['rompA', 'rompM', 'lend', 'kruis'],
    ['nek', 'rompV', 'nekBasis', 'kop'], ['kop', 'nek', 'kop', 'neus'], ['kaak', 'kop', 'kaak', 'kin'], ...POOTB(''), ...POOTB('F'),
    ['st0', 'rompA', 'staart0', 'staart1'], ['st1', 'st0', 'staart1', 'staart2'], ['st2', 'st1', 'staart2', 'staart3'], ['st3', 'st2', 'staart3', 'staart4']];
  const ROMPNAMEN = ['rompV', 'rompM', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2', 'st3'];
  const LEGS = ['A', 'AF', 'V', 'VF'];

  function maak(D) {
    const K = D.K, X0 = D.X0, G0 = D.G0; const cm = (p) => [(p[0] - X0) / K, (p[1] - G0) / K]; D.HOUDING.rust = D.HOUDING.rust || {};
    const J = {}; for (const k in D.J) J[k] = cm(D.J[k]); if (D.anker == null) D.anker = (J.schouder[0] + J.heup[0]) / 2; // anker = midden tussen schouder en heup (midden onder het dier)
    const BOT = {}, ORDE = [];
    for (const [n, par, j0, j1] of BOTEN) { const v = sub(J[j1], J[j0]); BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: J[j0] }; ORDE.push(n); }
    for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
    const ROOT0 = J.midrug;
    const PAL0 = Object.assign({ neus: '#2A2220', klauw: '#2A2420', mond: '#3A2622', tong: '#B86A64', vlek: '#2A221E' }, D.PAL);
    const PAL = new Proxy(PAL0, { get: (o, k) => (o[k] ?? k) }); // onbekende sleutel = zelf een kleur (#rrggbb uit de stijlplaat)
    const PALF = new Proxy({}, { get: (o, k) => (o[k] ??= mixHex(PAL[k], D.verMix ?? 0.3, D.verKleur || '#3E3A36')) });
    const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');

    // ---- delen opbouwen (cm, ruststand) ----
    const PREP = {}; let seed = D.seed || 1;
    // haarpieken langs de omtrek (manen): tand = [hoogte cm, golflengte cm, alleen waar f(p) waar is]
    function tanden(P, [amp, w, f]) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
      let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
        if (f && !f(p)) return p; const ww = w * (0.8 + 0.4 * hsh(Math.floor(sc / w) * 3.3)), ph = fr(sc / ww), h = amp * (0.6 + 0.6 * hsh(Math.floor(sc / ww) * 7.7)) * (ph < 0.75 ? Math.pow(ph / 0.75, 1.4) : (1 - ph) / 0.25); return add(p, mul(nn, h)); }); }
    const laag = (l) => { if (l.veeg) return { c: l.c, pts: streep(l.p.map(cm), l.veeg[0], l.veeg[1]) }; if (l.lijn) return { c: l.c, lijn: l.lijn, pts: openLijn(l.p.map(cm)) }; let P = spline(l.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; })); if (l.tand) P = tanden(P, l.tand); return { c: l.c, pts: P }; };
    if (D.VORM) { D.DELEN = Object.assign({}, D.DELEN || {}); const SK = { romp: 'romp', hum: 'hum', dij: 'dij', nek: 'nek', staart: 'staart', kruis: 'romp' };
      for (const d in D.VORM.delen) { if (D.DELEN[d]) continue; const v = D.VORM.delen[d], extra = (D.EXTRA || {})[d] || [];
        D.DELEN[d] = Object.assign(SK[d] ? { skin: SK[d] } : { bot: (d === 'keelkap' || d === 'oor') ? 'kop' : d }, { lagen: [{ c: v.c, p: v.basis }, ...v.lagen.filter(l => !(D.WEG || []).includes(l.c + ':' + d)).map(l => ({ c: (D.KLEUR || {})[l.c] || l.c, p: l.p })), ...extra] });
        D.DELEN[d].lagen[0].c = (D.KLEUR || {})[v.c] || v.c; }
      if (D.VORM.keelweb && !D.DELEN.keelweb) { const w = D.VORM.keelweb; D.DELEN.keelweb = { skin: 'nek', recht: true, gew: w.kop.map(k => k ? [['kop', 1]] : [['nek', 1]]), lagen: [{ c: D.DELEN.nek.lagen[0].c, p: w.p }] }; } } // keel-web: driehoek tussen keelrand van de hals en kaakrand van de kop; vult de keel als de kop zich strekt (grazen)
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, gew: d.gew, lagen: d.lagen.map(l => d.recht ? { c: l.c, pts: l.p.map(cm) } : laag(l)) }; }
    // poten uit profielen: [[u, voor, achter], ...] in cm langs het bot (voor = kant naar +x bij een bot dat omlaag wijst)
    function profiel(bn, prof) { const b = BOT[bn], d = dir(b.A0), s = [d[1], -d[0]]; const V = [], A = [];
      const dk = (bn.startsWith('rad') || bn.startsWith('mc') || bn.startsWith('vp') ? D.dikV : D.dikA) || D.dik || 1; for (const [u, wv, wa] of prof) { const p = add(b.J0, mul(d, b.L * u)); V.push(add(p, mul(s, wv * dk))); A.push(sub(p, mul(s, wa * dk))); }
      return spline(V.concat(A.reverse())); }
    for (const k in D.POOT) { const P = D.POOT[k]; const lagen = [{ c: P.c || 'basis', pts: profiel(P.bot || k, P.prof) }];
      for (const ex of (P.lagen || [])) lagen.push(ex.prof ? { c: ex.c, pts: profiel(P.bot || k, ex.prof) } : laag(ex));
      PREP[k] = { bot: P.bot || k, voet: P.voet, lagen }; }
    // staart als buis langs de keten met breedtes per knoop
    if (D.STAART) { const keten = ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j]); const W = D.STAART.w; const L = [], R = [];
      const lijn = openLijn(keten); const cum = [0]; for (let i = 1; i < lijn.length; i++) cum.push(cum[i - 1] + len(sub(lijn[i], lijn[i - 1]))); const tot = cum[cum.length - 1];
      const wAt = (u) => { const x = u * (W.length - 1), i = Math.min(W.length - 2, Math.floor(x)); return lin(W[i], W[i + 1], x - i); };
      for (let i = 0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const w = wAt(cum[i] / tot);
        L.push(add(lijn[i], mul(nn, w))); R.push(sub(lijn[i], mul(nn, w))); }
      const e = lijn[lijn.length - 1], e2 = lijn[lijn.length - 4], te = sub(e, e2), tel = len(te); const tip = add(e, mul(te, W[W.length - 1] * 0.9 / tel));
      const basis = L.concat([tip], R.reverse());
      const lagen = [{ c: D.STAART.c || 'basis', pts: basis }];
      const bandOp = (u, bw, c) => { const s0 = Math.max(0, u - bw / tot / 2) * tot, s1 = Math.min(1, u + bw / tot / 2) * tot; const idx = (s) => { let i = 0; while (i < cum.length - 1 && cum[i] < s) i++; return i; };
        const i0 = idx(s0), i1 = idx(s1); const P = []; for (let i = i0; i <= i1; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(add(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        for (let i = i1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        if (u + bw / tot / 2 >= 1) P.splice(i1 - i0 + 1, 0, add(tip, mul(te, 3 / tel))); return { c, pts: P }; };
      for (const [u, bw, c] of (D.STAART.banden || [])) lagen.push(bandOp(u, bw, c));
      if (D.STAART.onder) { const P = []; for (let i = 0; i < lijn.length; i++) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 0.25))); }
        for (let i = lijn.length - 1; i >= 0; i--) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 1.5))); }
        lagen.splice(1, 0, { c: D.STAART.onderC || 'licht', pts: P }); }
      if (D.STAART.kwast) { const [u0, c] = D.STAART.kwast; const s0 = u0 * tot; let i0 = 0; while (i0 < cum.length - 1 && cum[i0] < s0) i0++; const P = []; const kw = D.STAART.kwastW || 3.2;
        for (let i = i0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(add(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        P.push(add(tip, mul(te, kw * 0.7 / tel)));
        for (let i = lijn.length - 1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(sub(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        PREP.kwast = { skin: 'staart', lagen: [{ c, pts: spline(P.filter((_, i) => i % 3 === 0)) }] }; }
      PREP.staart = { skin: 'staart', lagen }; }
    // tekening: vlekken / strepen per deel (in ruststand, daarna meegebogen door dezelfde huid)
    if (D.TEKENING) D.TEKENING({ PREP, J, cm, vlekVorm, streep, binnen, hsh, BOT });

    // ---- gewichten (zachte huid) ----
    function projectie(v, keten) { let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
    const xr = ROOT0[0], xl = J.lend[0], xk = J.kruis[0], xn = J.nekBasis[0];
    const GEW = {
      romp: (v) => { const x = v[0]; const wV = sstep((x - (xr - 0.35 * (xr - xl))) / (0.35 * (xr - xl) + 0.45 * (xn - xr)));
        const wA = sstep(((xl + 0.25 * (xr - xl)) - x) / (0.25 * (xr - xl) + 0.6 * (xl - xk))); const wM = Math.max(0, 1 - wV - wA); const s = wV + wA + wM; return [['rompV', wV / s], ['rompM', wM / s], ['rompA', wA / s]]; },
      nek: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - (D.halsRecht ? sstep((u + 0.3) / 0.5) : 0.68 * sstep((u + 0.3) / 0.55) + 0.32 * Math.max(0, Math.min(1, (u - 0.15) / 0.85))), wk = (D.kopVolg ?? 0.55) * sstep((u - 0.8) / 0.5); /* keel onder de kaak volgt de kop maar half (geen gat bij kop omhoog) */ return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      manen: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.5) / 1.1), wk = sstep((u - 0.55) / 0.6); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      dij: (v) => { const u = projectie(v, [J.heup, J.knie]); const w = sstep((u - 0.15) / 0.8); return [['rompA', 1 - w], ['dij', w]]; },
      hum: (v) => { const u = projectie(v, [J.schoft, J.schouder, J.elleboog]); const w = sstep((u - 0.75) / 0.7); const wr = 1 - sstep((u + 0.1) / 0.6); return [['rompV', wr * 0.6], ['scap', Math.max(0, 1 - w - wr * 0.6)], ['hum', w]]; },
      staart: (v) => { const u = projectie(v, ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j])); const c = [['rompA', -0.4], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5], ['st3', 3.5]];
        let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 3.5) w = [['st3', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
    };
    // klem (uit pop_katten, tijger ronde 3b): punten van schouder/dij die binnen het rompsilhouet liggen volgen de romp, anders bolt de buik/borst bij lopen uit
    const ROMPB = PREP.romp && PREP.romp.lagen[0].pts; const randAfst = (v) => { let m = 1e9; for (let i = 0; i < ROMPB.length; i += 2) { const q = ROMPB[i]; m = Math.min(m, Math.hypot(q[0] - v[0], q[1] - v[1])); } return m; };
    if (D.klem && ROMPB) for (const sk of ['hum', 'dij']) { const g0 = GEW[sk], rb = sk === 'hum' ? 'rompV' : 'rompA'; GEW[sk] = (v) => { const w = g0(v); if (!binnen(v, ROMPB)) return w;
        const f = sstep(randAfst(v) / D.klem); return w.map(([b, x]) => [b, x * (1 - f)]).concat([[rb, f]]); }; }
    for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { if (p.gew) { l.w = p.gew; return; } if (l.mid) l.wm = GEW[p.skin](l.mid).filter(([, x]) => x > 1e-4); else l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

    // ---- kinematica ----
    function fk(R, A) { const piv = {}; for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; } return piv; }
    const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
    // ---- hals als buigzame kromme (spine curve): hoek loopt langs de hals op van romp- naar nekhoek (gewicht = nek-gewicht van de huid) ----
    const NU0 = -0.3, NW = (u) => D.halsRecht ? sstep((u + 0.3) / 0.5) : 0.68 * sstep((u + 0.3) / 0.55) + 0.32 * Math.max(0, Math.min(1, (u - 0.15) / 0.85)); /* grootste deel van de draai bij de halsbasis, rest als vloeiende boog tot het achterhoofd (geen haak) */ // nek-gewicht (1 - rompV-gewicht)
    function halsKromme(piv, A) { const b = BOT.nek, dir0 = b.A0, L = b.L, th0 = dir0 + (A.rompV - BOT.rompV.A0), dN = (A.nek - b.A0) - (A.rompV - BOT.rompV.A0);
      const M0 = (v) => { const da = A.rompV - BOT.rompV.A0, c = Math.cos(da), si = Math.sin(da), j = BOT.rompV.J0, p = piv.rompV; const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; };
      const OFF = (D.nekAs || 0) * D.H / 160, n00 = [-Math.sin(dir0), Math.cos(dir0)]; // buig-as verschoven naar de kam: de kam blijft een doorlopende lijn vanaf de schoft
      const N = 48, du = (1 - NU0) / N; const C = [M0(add(add(b.J0, mul(n00, OFF)), mul(dir(dir0), NU0 * L)))], TH = [th0 + dN * NW(NU0)];
      for (let i = 1; i <= N; i++) { const u = NU0 + (i - 0.5) * du, th = th0 + dN * NW(u); C.push(add(C[i - 1], mul(dir(th), L * du))); TH.push(th0 + dN * NW(NU0 + i * du)); }
      return { C, TH, du, L, dir0, M0, OFF, at: (u) => { const x = (u - NU0) / du, i = Math.max(0, Math.min(N - 1, Math.floor(x))), f = Math.max(0, Math.min(1, x - i)); return [lin(C[i][0], C[i + 1][0], f), lin(C[i][1], C[i + 1][1], f), lin(TH[i], TH[i + 1], f)]; } }; }
    const KOPBOT = ['kop', 'kaak'];
    function fkH(R, A) { const piv = fk(R, A); const H = halsKromme(piv, A); const th = H.TH[H.TH.length - 1], E = sub(H.C[H.C.length - 1], mul([-Math.sin(th), Math.cos(th)], H.OFF)), d = sub(E, piv.kop); for (const n of KOPBOT) piv[n] = add(piv[n], d); piv.__hals = H; return piv; }
    function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
      dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
      const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek]; }
    const RESTA = {}; for (const n of ORDE) RESTA[n] = BOT[n].A0;
    // voeten = { L: {teen, meta, poot} } (graden) -> hoeken via IK; scapZwaai graden
    function zetBenen(R, A, voeten, scapZwaai = {}) { let piv = fk(R, A); const rek = {};
      for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', z = L.length > 1 ? 'F' : ''; const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
        const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
        if (voor) { A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
          const [a1, a2, r] = ik(eind(piv, A, 'scap' + z), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + z] = a1; A['rad' + z] = a2; rek[L] = r; }
        else { A['dij' + z] = A.rompA; piv = fk(R, A); const [a1, a2, r] = ik(piv['dij' + z], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + z] = a1; A['schn' + z] = a2; rek[L] = r; }
        A[nM + z] = v.meta * RAD; A[nP + z] = v.poot * RAD; v.kogel = kogel; }
      return rek; }
    const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } };
    // rompA wordt (zoals de andere romphoeken) in wereldgraden opgegeven
    function lichaam(spec) { const A = Object.assign({}, RESTA); for (const n in (spec.A || {})) A[n] = spec.A[n] * RAD; if (spec.A && spec.A.kop != null && spec.A.kaak == null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return A; }
    // rust-teenposities (ruststand = gemeten plaat)
    const RP = fk(ROOT0, RESTA); const TEEN0 = { V: eind(RP, RESTA, 'vp'), VF: eind(RP, RESTA, 'vpF'), A: eind(RP, RESTA, 'ap'), AF: eind(RP, RESTA, 'apF') };

    // ---- houdingen (specs per dier) ----
    const RUSTVOET = (L) => { const z = L.length > 1 ? 'F' : '', voor = L[0] === 'V'; return [TEEN0[L][0], TEEN0[L][1], BOT[(voor ? 'mc' : 'mt') + z].A0 / RAD, BOT[(voor ? 'vp' : 'ap') + z].A0 / RAD]; };
    // auto-houding: voeten recht onder schouder/heup (+dx), romphoogte zo dat de poten 'rek' gestrekt zijn (bisectie)
    const AUTO = {};
    function autoStaan(h, S) { if (AUTO[h]) return AUTO[h]; const A0 = lichaam(S), au = S.auto, ty = au.ty ?? -1;
      const probeer = (y) => { const A = Object.assign({}, A0), R = [ROOT0[0], y]; const piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const vt = { V: [sch[0] + au.V, ty, au.meta ? au.meta[0] : 80, au.poot ? au.poot[0] : 20], A: [hp[0] + au.A, ty, au.meta ? au.meta[1] : 86, au.poot ? au.poot[1] : 22] };
        const voeten = {}; for (const L of LEGS) { const v = vt[L[0]]; voeten[L] = { teen: [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1]], meta: v[2], poot: v[3] }; }
        const rek = zetBenen(R, A, voeten); return { rek: Math.max(rek.V, rek.A), vt }; };
      let lo = -400, hi = 0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (probeer(m).rek > au.rek) lo = m; else hi = m; }
      const { vt } = probeer(hi); const voet = {}; for (const L of LEGS) { const v = vt[L[0]]; voet[L] = [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1], v[2], v[3]]; }
      return (AUTO[h] = { R: [0, hi], voet }); }
    function geschaald(S) { if (!S.schaal) return S; const [B, f] = S.schaal; const R = B.R ? [B.R[0] * f, B.R[1] * f] : null; const voet = {}; for (const L in B.voet) { const v = B.voet[L]; voet[L] = [v[0] * f, v[1] * f, v[2], v[3]]; }
      return Object.assign({}, B, { R, voet, A: Object.assign({}, B.A, S.A || {}) }); }
    // auto-zit: heup op hoogte 'heup' boven de grond, romp zo rechtop als de voorpoten toelaten (rompV van rv[0] naar rv[1])
    function autoZit(h, S) { if (AUTO[h]) return AUTO[h]; const au = S.autoZit, ty = au.ty ?? -1; let best = null;
      for (let rv = au.rv[0]; rv <= au.rv[1]; rv += 2) { const d = rv - au.rv[0]; const A = lichaam({ A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) });
        let piv = fk([ROOT0[0], 0], A); const y = -au.heup - piv.dij[1]; const R = [ROOT0[0], y]; piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const voeten = {}; for (const L of LEGS) { const voor = L[0] === 'V', ver = L.length > 1 ? au.ver[L[0]] : 0; voeten[L] = { teen: [(voor ? sch[0] + au.V : hp[0] + au.A) + ver, ty], meta: au.meta[voor ? 0 : 1], poot: au.poot[voor ? 0 : 1] }; }
        const A2 = Object.assign({}, A); const rek = zetBenen(R, A2, voeten); best = { R: [0, y], voet: Object.fromEntries(LEGS.map(L => [L, [voeten[L].teen[0], ty, voeten[L].meta, voeten[L].poot]])), A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) };
        if (rek.V <= 0.985) break; }
      return (AUTO[h] = best); }
    function houding(h, o = {}) { let S = geschaald(D.HOUDING[h] || D.HOUDING.staan); if (S.autoZit) S = Object.assign({}, S, autoZit(h, S)); if (S.auto) S = Object.assign({}, S, autoStaan(h, S)); const A = lichaam(S); const R = S.R ? [ROOT0[0] + (S.R[0] || 0), S.R[1]] : [ROOT0[0], ROOT0[1] + (S.dy || 0)];
      if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
      if (S.adem && o.t != null) { const w = Math.sin(2 * Math.PI * o.t); A.st2 += 4 * RAD * w; A.st3 += 7 * RAD * Math.sin(2 * Math.PI * o.t - 0.7); }
      if (S.reikNek != null) { let best = null; A.kop = S.reikNek * RAD; for (let a = 20; a <= 89; a += 0.5) { A.nek = a * RAD; const n = eind(fkH(R, A), A, 'kop'); const e = Math.abs(n[1] + (S.reik ?? 1)); if (!best || e < best[0]) best = [e, a]; } A.nek = best[1] * RAD; } // hals zo ver omlaag dat de neus de grond raakt bij een vaste kophoek
      else if (S.reik != null) { const RR = R; let best = null; for (let a = S.kopMin ?? 70; a <= (S.kopMax ?? 135); a += 1) { A.kop = a * RAD; const n = eind(fkH(RR, A), A, 'kop'); const e = Math.abs(n[1] + S.reik); if (!best || e < best[0]) best = [e, a]; } A.kop = best[1] * RAD; }
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + (o.bek ?? S.bek ?? 0) * (S.bek && o.bek == null ? RAD : 1);
      const voeten = {}; for (const L of LEGS) { let v = S.voet ? (S.voet[L] || S.voet[L[0]]) : RUSTVOET(L); if (!S.voet && S.ver && L.length > 1) v = [v[0] + S.ver[L[0]], v[1], v[2], v[3]]; if (S.dvoet && S.dvoet[L]) v = [v[0] + S.dvoet[L], v[1], v[2], v[3]]; voeten[L] = { teen: [v[0], v[1]], meta: v[2], poot: v[3], steun: true }; }
      const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, zit: !!S.zit, volgorde: S.volgorde }; }

    // ---- gangen ----
    // stap: laterale volgorde, teen staat stil in de steunfase, zwaai met Hermite, IK
    function stap(G, t) {
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.A || {}) }));
      const w2 = Math.sin(4 * Math.PI * (t - (G.bobFase || 0.06)));
      const R = [ROOT0[0], (G.Ry ?? ((H.R ? H.R[1] : ROOT0[1]) + (G.dy || 0))) + (G.bob || 0.6) * Math.cos(4 * Math.PI * (t - (G.bobFase ?? 0.06)))];
      A.rompV += (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompA -= (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompM -= 0.4 * (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t);
      A.nek += (G.knik || 2) * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= (G.knik || 2) * 0.7 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
      const sz = G.staartZwaai || [3, 5, 7, 9]; for (let i = 0; i < 4; i++) A['st' + i] += sz[i] * RAD * Math.sin(2 * Math.PI * (t - 0.2 - i * 0.12));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
      const half = G.S * G.beta / 2, voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', p = fr(t - G.fase[L]), steun = p < G.beta; const v0 = H.voet ? (H.voet[k] || H.voet[L]) : RUSTVOET(k); // verre poot loopt in hetzelfde spoor (geen standverschil)
        const nx = v0[0] + G.nx[k], ty0 = v0[1]; let tx, ty, u;
        if (steun) { u = p / G.beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; tx = hermite(nx - half, nx + half, m, m, u); ty = ty0 - G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        if (voor) scap[L] = (G.scap || 8) * (tx - nx) / half; }
      let rek = zetBenen(R, A, voeten, scap); // romp zakt iets als een poot te kort is (zoals in de dubbele steunfase), anders glijdt de voet
      for (let it = 0; it < 4; it++) { const m = Math.max(...Object.values(rek)); if (m <= 1.0) break; R[1] += (m - 1) * (BOT.hum.L + BOT.rad.L) * 1.05; rek = zetBenen(R, A, voeten, scap); }
      for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten }; }
    // galop (jachtluipaard): roterende galop met gebogen (gathered) en gestrekte (extended) zweeffase; romp buigt via rompM/rompA
    function galopRomp(G, t) { const flex = kurve(G.flex, fr(t)); // 0 = gestrekt, 1 = gebogen
      const A = lichaam({ A: G.gestrekt }), A1 = lichaam({ A: G.gebogen }); mixA(A, A1, flex, ROMPNAMEN);
      for (let i = 0; i < 4; i++) A['st' + i] += (G.staartZwaai[i] || 0) * RAD * Math.sin(2 * Math.PI * (t - 0.15 - i * 0.1));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return { A, R: [ROOT0[0], kurve(G.Ry, fr(t))], flex }; }
    const galopZwaai = (G, L, t) => { const beta = G.beta[L[0] === 'V' ? 'V' : 'A'], p = fr(t - G.fase[L]); return G.scap * (p < beta ? (1 - 2 * p / beta) : kurve([[0, -1], [0.5, 0.2], [1, 1]], (p - beta) / (1 - beta))); };
    function galopGewricht(G, t, L) { const { A, R } = galopRomp(G, t), voor = L[0] === 'V', z = L.length > 1 ? 'F' : '';
      if (voor) A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - galopZwaai(G, L, t) * RAD; else A['dij' + z] = A.rompA; const piv = fk(R, A); return voor ? eind(piv, A, 'scap' + z) : piv['dij' + z]; }
    function galop(G, t) {
      const { A, R, flex } = galopRomp(G, t);
      const voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', beta = G.beta[k], p = fr(t - G.fase[L]), steun = p < beta; const half = G.S * beta / 2;
        const nx = G.nx[k], ty0 = G.ty[k]; let tx, ty, u;
        if (steun) { u = p / beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { // zwaai in het assenstelsel van heup/schouder (poolcoördinaten), aansluitend op de steunpunten bij loslaten en neerzetten
          u = (p - beta) / (1 - beta); const t0 = t - p, tLO = t0 + beta, tTD = t0 + 1;
          const hLO = galopGewricht(G, tLO, L), hTD = galopGewricht(G, tTD, L), h = galopGewricht(G, t, L);
          const rLO = sub([nx - half, ty0], hLO), rTD = sub([nx + half, ty0], hTD); const aLO = ang(rLO), aTD = ang(rTD);
          const a = hermite(aLO, aTD, G.am0[k] * (aTD - aLO), G.am1[k] * (aTD - aLO), u), l = lin(len(rLO), len(rTD), u) - kurve(G.fold[k], u);
          const q = add(h, mul(dir(a), l)); tx = q[0]; ty = Math.min(ty0, q[1]); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        scap[L] = galopZwaai(G, L, t); }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, flex }; }
    const GANGEN = {}, SNELHEID = {}; for (const g in (D.GANGEN || {})) { const G = D.GANGEN[g]; GANGEN[g] = (t) => stap(G, t); SNELHEID[g] = G.S; }
    function stand(o) { if (o.stand) return o.stand; const h = o.houding || 'staan';
      if (GANGEN[h]) { const st = GANGEN[h](fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
      return houding(h, o); }

    // ---- tekenen ----
    function tekenDeel(ctx, k, M, ver, piv, A, modus) {
      if (k === 'mond') { if (modus !== 'rand' && D.MOND && (A.kaak - A.kop - (BOT.kaak.A0 - BOT.kop.A0)) > 0.03) D.MOND(ctx, M, A, BOT, ver ? PALF : PAL); return; }
      if (k === 'hoefF' || k === 'hoef') return;
      const Dl = PREP[k]; if (!Dl) return; const pal = ver ? PALF : PAL; if (k === 'kruis' && modus === 'rand') return; // vlak op de huid: geen eigen omtreklijn
      const tr = Dl.skin ? (l) => { if (l.wm) { let x = 0, y = 0; for (const [b, w] of l.wm) { const q = M[b](l.mid); x += q[0] * w; y += q[1] * w; } const dx = x - l.mid[0], dy = y - l.mid[1]; return l.pts.map(v => [v[0] + dx, v[1] + dy]); } // vlek: alleen verschuiven, niet uitrekken
        if (Dl.skin === 'nek') { // hoek-menging (geen positie-menging): de hals buigt als een slang en klapt niet in bij grote hoeken (grazen)
          const dN = (A.nek - BOT.nek.A0) - (A.rompV - BOT.rompV.A0), dK = (A.kop - BOT.kop.A0) - (A.nek - BOT.nek.A0), pn = piv.nek, pk = piv.kop;
          const rotOm = (p, c, a) => { const co = Math.cos(a), si = Math.sin(a), dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * co - dy * si, c[1] + dx * si + dy * co]; };
          const H = piv.__hals, d0 = dir(H.dir0), n0 = [-d0[1], d0[0]], B = BOT.nek.J0;
          return l.pts.map((v, i) => { let wk = 0; for (const [b, w] of l.w[i]) if (b === 'kop') wk = w; if (wk >= 0.999) return M.kop(v);
            const r = sub(v, B), u = (r[0] * d0[0] + r[1] * d0[1]) / H.L; let dd = r[0] * n0[0] + r[1] * n0[1] - H.OFF; let p;
            if (dd * Math.sign(dN) < 0) dd *= 1 - Math.min(0.5, 0.3 * Math.abs(dN)) * Math.sin(Math.PI * Math.max(0, Math.min(1, (u + 0.3) / 1.0))); // kam aan de buitenkant van de bocht drukt in
            if (u <= NU0) p = H.M0(v); else { const uc = Math.min(1, u), [cx, cy, th] = H.at(uc); const t = dir(th), nn = [-t[1], t[0]]; p = [cx + t[0] * (u - uc) * H.L + nn[0] * dd, cy + t[1] * (u - uc) * H.L + nn[1] * dd]; }
            const z_ = D.H / 160, wr = Math.max(sstep((J.schoft[0] + (D.schoftVast ?? 10) * z_ - v[0]) / (10 * z_)) * sstep((J.schouder[1] - v[1]) / (20 * z_)), // schoft blijft bij de romp
              sstep((v[1] - (J.schouder[1] - 12 * z_)) / (16 * z_)) * sstep((u - 0.1) / -0.4)); // borst (onder het schoudergewricht, hals-basis) blijft rustig
            if (wr > 0) { const q = H.M0(v); p = [lin(p[0], q[0], wr), lin(p[1], q[1], wr)]; }
            if (wk > 0) p = rotOm(p, pk, wk * dK); return p; }); }
        return l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }); } : null;
      ctx.save();
      if (!Dl.skin) { const b = BOT[Dl.bot]; let ar = A[Dl.bot] - b.A0;
        if (k === 'keelkap') ar -= 0.6 * ((A.kop - BOT.kop.A0) - (A.nek - BOT.nek.A0)); // keel volgt de kop maar voor 40% (vouwt mee, zwaait niet naar achter)
        ctx.translate(piv[Dl.bot][0], piv[Dl.bot][1]); ctx.rotate(ar); ctx.translate(-b.J0[0], -b.J0[1]); }
      const basis = tr ? tr(Dl.lagen[0]) : Dl.lagen[0].pts;
      if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[Dl.lagen[0].c]); ctx.lineWidth = D.rand || 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
      if (modus !== 'lagen') { pad(ctx, basis); ctx.fillStyle = pal[Dl.lagen[0].c]; ctx.fill(); }
      if (Dl.lagen.length > 1 && modus !== 'basis') { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < Dl.lagen.length; i++) { const L = Dl.lagen[i], P = tr ? tr(L) : L.pts;
        if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
      if (Dl.voet && D.TENEN) D.TENEN(ctx, k, pal, BOT, cm);
      if (k === 'kop' && D.GEZICHT) D.GEZICHT(ctx, pal, cm, A, BOT);
      ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fkH(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    function teken(ctx, x, y, s, o = {}) {
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400.6); ctx.clip(); }
      let VO = st.volgorde ? st.volgorde : VOLGORDE;
      const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A);
      for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
      if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand'); else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
      // vulling; delen met groep 'lijf' (romp, dij, hum, nek): eerst alle basisvlakken, daarna alle toonlagen (anders snijdt een deelgrens een toonvlak recht af)
      let pend = []; const flush = () => { for (const [k, ver] of pend) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'lagen'); else tekenDeel(ctx, k, M, false, piv, A, 'lagen'); } pend = []; };
      for (const [k, ver, g] of VO) { if (g === 'lijf') { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'basis'); else tekenDeel(ctx, k, M, false, piv, A, 'basis'); pend.push([k, ver]); continue; }
        flush(); if (ver) tekenDeel(ctx, k, MF, true, pivF, AF); else tekenDeel(ctx, k, M, false, piv, A); }
      flush();
      if (o.skelet) { ctx.lineWidth = 0.5; for (const n of ORDE) { const e = eind(piv, A, n); ctx.strokeStyle = n.endsWith('F') ? '#4FC3F7' : (n.startsWith('romp') ? '#FFEB3B' : '#FF5252'); ctx.beginPath(); ctx.moveTo(piv[n][0], piv[n][1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(piv[n][0], piv[n][1], 0.7, 0, 6.283); ctx.fill(); } }
      ctx.restore(); return st; }
    function info(o = {}) { const st = stand(o); const piv = fkH(st.R, st.A); return { piv, A: st.A, voeten: st.voeten, R: st.R, flex: st.flex, eind: (n) => eind(piv, st.A, n) }; }
    function deel(ctx, k, dx = 0, dy = 0) { const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
      if (k.endsWith('F') && PREP[k.slice(0, -1)]) tekenDeel(ctx, k.slice(0, -1), M, true, RP, RESTA); else tekenDeel(ctx, k, M, false, RP, RESTA); ctx.restore();
      const Dl = PREP[k.replace(/F$/, '')]; if (!Dl) return []; const bones = Dl.skin ? { romp: ['rompV', 'rompM', 'rompA'], nek: ['nek', 'kop'], manen: ['nek'], staart: ['st0', 'st1', 'st2', 'st3'], dij: ['dij'], hum: ['scap', 'hum'] }[Dl.skin] : [Dl.bot];
      return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]); }
    function meng(stA, stB, w) { const A = Object.assign({}, stA.A); mixA(A, stB.A, w, ORDE); return { R: [lin(stA.R[0], stB.R[0], w), lin(stA.R[1], stB.R[1], w)], A, voeten: {}, zit: w < 0.5 ? stA.zit : stB.zit }; }
    return { teken, info, stand, deel, houding, fk, meng, BOT, ORDE, PREP, J, PAL, D, TEEN0, SNELHEID, GANGEN, RP, RESTA, cm };
  }
  return { maak, kurve, vlekVorm, streep, binnen, hsh, mixHex, spline, openLijn };
})();

// =====================================================================================================
// DIEREN. Gewrichtspunten: gemeten op de stijlplaat (bouw.py, px -> cm) en gecontroleerd met tekstbronnen (zie lessen_pop_hoef.md).
// Poten: profielen [u, voor, achter] (cm, paard 160 cm), per dier geschaald met H/160 en 'dik'.
// =====================================================================================================
const HOEF_PROF = { // paard, schofthoogte 160 cm
  rad: [[-0.16, 6.5, 2.0], [0.0, 8.0, 7.0], [0.16, 7.4, 6.6], [0.5, 5.4, 4.2], [0.85, 4.0, 3.4], [1.0, 4.6, 4.0], [1.1, 4.0, 3.4]],
  mc: [[-0.06, 4.2, 3.6], [0.06, 3.4, 3.2], [0.5, 3.0, 3.0], [0.86, 3.2, 3.5], [1.0, 4.0, 4.4], [1.12, 3.4, 3.6]],
  vp: [[-0.2, 3.8, 4.2], [0.05, 3.1, 3.6], [0.45, 2.9, 3.1], [0.7, 3.2, 3.2]],
  schn: [[-0.18, 7.0, 5.0], [0.0, 8.6, 8.4], [0.25, 6.8, 8.8], [0.6, 4.0, 6.0], [0.9, 3.8, 5.0], [1.0, 4.4, 5.8], [1.1, 3.8, 4.2]],
  mt: [[-0.06, 3.8, 5.6], [0.08, 3.4, 4.2], [0.5, 3.0, 3.1], [0.88, 3.2, 3.5], [1.0, 4.0, 4.4], [1.1, 3.4, 3.6]],
  ap: [[-0.2, 3.8, 4.2], [0.05, 3.1, 3.6], [0.45, 2.9, 3.1], [0.7, 3.2, 3.2]],
};
function _hoefPoot(f, dikV, dikA, over = {}) { const P = {}; for (const k in HOEF_PROF) { const v = ['rad', 'mc', 'vp'].includes(k), d = (v ? dikV : dikA) * f;
    P[k] = Object.assign({ prof: (over[k] && over[k].prof || HOEF_PROF[k]).map(([u, a, b]) => [u, a * d, b * d]), voet: k === 'vp' || k === 'ap' }, over[k] ? { c: over[k].c, lagen: over[k].lagen } : {}); } return P; }
// band op een poot over u0..u1 (kleur c), breed genoeg om het hele profiel te bedekken (wordt op het profiel geknipt)
const _hoefBand = (c, u0, u1, w = 30) => ({ c, prof: [[u0, w, w], [u1, w, w]] });
// hoef/klauw/teen in de ruststand van het kootbeen (tekent in cm, rust-coördinaten)
function _hoefTeken(ctx, k, pal, BOT, D) { const voor = k === 'vp', b = BOT[k], T = [b.J0[0] + Math.cos(b.A0) * b.L, b.J0[1] + Math.sin(b.A0) * b.L]; const h = D.HOEF, f = D.H / 160;
  const u = [-Math.cos(b.A0), -Math.sin(b.A0)]; const up = (hh) => [T[0] + u[0] * hh / Math.abs(u[1]), T[1] - hh]; const kl = pal[h.kleur];
  if (h.type === 'teen') { // nijlpaard: brede ronde voet (kleur van de poot) met korte tenen en nagels voorop
    const L = h.L * f, hv = h.hv * f; ctx.fillStyle = pal[h.voet || 'basis']; ctx.beginPath(); ctx.moveTo(T[0] - L, T[1]); ctx.lineTo(T[0] - 2, T[1]); ctx.quadraticCurveTo(T[0] + 3 * f, T[1], T[0] + 2 * f, T[1] - hv * 0.5); ctx.quadraticCurveTo(T[0], T[1] - hv, T[0] - L * 0.4, T[1] - hv * 1.1);
    ctx.lineTo(T[0] - L, T[1] - hv); ctx.closePath(); ctx.fill();
    ctx.fillStyle = kl; for (let i = 0; i < 3; i++) { const x = T[0] - 0.5 * f - i * 4.2 * f; ctx.beginPath(); ctx.ellipse(x, T[1] - 1.3 * f, 2.0 * f, 1.3 * f, 0, 0, 6.283); ctx.fill(); } return; }
  const L = h.L * f, hv = h.hv * f, hh = h.hh * f, C = up(hv), H2 = [T[0] - L - 0.6 * f, T[1] - hh];
  ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(T[0], T[1]); ctx.lineTo(T[0] - L, T[1]); ctx.lineTo(H2[0], H2[1]); ctx.quadraticCurveTo(C[0] - L * 0.55, C[1] - 0.5 * f, C[0], C[1]); ctx.closePath(); ctx.fill();
  if (h.kroon) { ctx.strokeStyle = pal[h.kroon]; ctx.lineWidth = 1.1 * f; ctx.beginPath(); ctx.moveTo(H2[0] + 0.3, H2[1] - 0.2); ctx.quadraticCurveTo(C[0] - L * 0.55, C[1] - 0.8 * f, C[0] + 0.3, C[1] - 0.2); ctx.stroke(); }
  if (h.type === 'klauw') { ctx.strokeStyle = pal[h.spleet || 'neus']; ctx.lineWidth = 0.5 * f; ctx.beginPath(); ctx.moveTo(T[0] - L * 0.42, T[1]); ctx.lineTo(T[0] - L * 0.36, T[1] - hv * 0.7); ctx.stroke();
    const K = [b.J0[0] - 2.2 * f, b.J0[1] + 1.2 * f]; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(K[0], K[1], 1.3 * f, 2.0 * f, 0.5, 0, 6.283); ctx.fill(); } } // bijklauw achter de kogel
// oog (in de kop, ruststand)
function _hoefNeus(ctx, D, pal) { const V = D.VORM, f = D.H / 160, N = V.neusgat, M = V.mond; if (D.geenNeus) return;
  ctx.fillStyle = D.neusK || '#2A2020'; ctx.beginPath(); ctx.ellipse(N[0], N[1], (D.neusR || 2.4) * f, (D.neusR || 2.4) * f * 0.55, D.neusHoek ?? -0.6, 0, 6.283); ctx.fill();
  ctx.strokeStyle = D.mondK || '#2A2020'; ctx.lineWidth = 0.7 * f; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(M[0][0], M[0][1]); ctx.quadraticCurveTo((M[0][0] + M[1][0]) / 2, M[0][1] + 1.2 * f, M[1][0], M[1][1]); ctx.stroke(); }
function _koeOog(ctx, D) { // koeienoog (koppen.png): groot, donker, amandelvormig, licht uitpuilend; zware bovenooglidplooi met donkere wimperrand, lichtpuntje
  const O = D.VORM.oog; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(-0.18);
  const amandel = (rx, ry, dy = 0) => { ctx.beginPath(); ctx.moveTo(-rx, dy); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.25 + dy, rx * 0.55, -ry * 1.2 + dy, rx, dy - ry * 0.1); ctx.bezierCurveTo(rx * 0.55, ry * 1.05 + dy, -rx * 0.5, ry * 1.1 + dy, -rx, dy); ctx.closePath(); };
  ctx.fillStyle = 'rgba(60,24,14,0.35)'; ctx.beginPath(); ctx.ellipse(0.2, 0.4, 5.0, 3.6, 0, 0, 6.283); ctx.fill(); // oogkas, zachte bolling
  ctx.fillStyle = '#A06248'; ctx.beginPath(); ctx.moveTo(-4.4, -0.2); ctx.bezierCurveTo(-2.4, -3.9, 2.6, -3.9, 4.6, -0.6); ctx.bezierCurveTo(2.6, -2.5, -2.2, -2.6, -4.4, -0.2); ctx.fill(); // bovenooglidplooi (lichter)
  amandel(3.5, 2.2); ctx.fillStyle = '#1A110E'; ctx.fill(); // oog
  ctx.fillStyle = '#3A2116'; ctx.beginPath(); ctx.ellipse(0.4, 0.3, 2.0, 1.75, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#0E0807'; ctx.beginPath(); ctx.ellipse(0.4, 0.3, 1.45, 1.1, 0, 0, 6.283); ctx.fill(); // iris (donkerbruin) en pupil (liggend)
  ctx.strokeStyle = '#0C0605'; ctx.lineWidth = 0.55; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-3.5, 0); ctx.bezierCurveTo(-1.75, -2.75, 1.9, -2.65, 3.5, -0.22); ctx.stroke(); // wimperrand
  for (let i = 0; i < 6; i++) { const u = 0.2 + i * 0.12, x = -3.5 + u * 7, y = -2.1 * Math.sin(Math.PI * u) - 0.1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 0.9, y - 0.35); ctx.stroke(); } // korte wimpers, naar voren-opzij
  ctx.strokeStyle = 'rgba(215,190,170,0.7)'; ctx.lineWidth = 0.35; ctx.beginPath(); ctx.moveTo(-2.8, 0.9); ctx.quadraticCurveTo(0.3, 2.6, 3.0, 0.5); ctx.stroke(); // onderooglid
  ctx.fillStyle = '#F4EEE6'; ctx.beginPath(); ctx.ellipse(1.2, -0.65, 0.55, 0.42, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = 'rgba(244,238,230,0.45)'; ctx.beginPath(); ctx.ellipse(-1.3, 0.75, 0.3, 0.2, 0, 0, 6.283); ctx.fill(); // lichtpuntjes
  ctx.restore(); }
function _hoefOog(ctx, D, A, BOT) { if (D.oogStijl === 'geen') return; if (D.oogStijl === 'ring') { // ezel/muilezel zoals de plaat: lichte oogring, donker amandeloog, lichtpuntje
    const O = D.VORM.oog, f = D.H / 160, R = D.oogRing || [8, 5, 4.4, 2.6]; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(D.oogDraai ?? -0.18); ctx.scale(f, f);
    const am = (rx, ry) => { ctx.beginPath(); ctx.moveTo(-rx, 0); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.3, rx * 0.5, -ry * 1.25, rx, -ry * 0.1); ctx.bezierCurveTo(rx * 0.5, ry * 1.1, -rx * 0.5, ry * 1.1, -rx, 0); ctx.closePath(); };
    am(R[0], R[1]); ctx.fillStyle = D.oogRingKleur || '#E6DFD6'; ctx.fill(); am(R[2], R[3]); ctx.fillStyle = '#15100E'; ctx.fill();
    ctx.fillStyle = '#F2ECE4'; ctx.beginPath(); ctx.ellipse(R[2] * 0.25, -R[3] * 0.3, 0.7, 0.5, 0, 0, 6.283); ctx.fill(); ctx.restore(); return; } if (D.oogStijl === 'glans') { // paardenoog zoals de kopplaat: donker amandeloog, lichtere oogleden-ring, lichtpuntje
    const O = D.VORM.oog, f = D.H / 160; ctx.save(); ctx.translate(O[0], O[1]); ctx.rotate(-0.25); ctx.scale(f, f);
    const am = (rx, ry) => { ctx.beginPath(); ctx.moveTo(-rx, 0); ctx.bezierCurveTo(-rx * 0.5, -ry * 1.3, rx * 0.5, -ry * 1.25, rx, -ry * 0.1); ctx.bezierCurveTo(rx * 0.5, ry * 1.1, -rx * 0.5, ry * 1.1, -rx, 0); ctx.closePath(); };
    am(4.6, 2.9); ctx.fillStyle = '#5A3420'; ctx.fill(); am(3.5, 2.1); ctx.fillStyle = '#140D0B'; ctx.fill();
    ctx.strokeStyle = '#2A1810'; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(-4.4, -0.3); ctx.bezierCurveTo(-2.2, -3.6, 2.3, -3.5, 4.5, -0.6); ctx.stroke();
    ctx.fillStyle = '#F2ECE4'; ctx.beginPath(); ctx.ellipse(1.1, -0.7, 0.75, 0.55, 0, 0, 6.283); ctx.fill(); ctx.restore(); return; } if (D.oogStijl === 'koe') return _koeOog(ctx, D); const O = D.VORM.oog, r = D.oogR * D.H / 160; ctx.save(); ctx.translate(O[0], O[1]); ctx.fillStyle = D.oogRand || '#2A2220'; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.45, r * 0.95, -0.15, 0, 6.283); ctx.fill();
  if (typeof dierOog === 'function') { ctx.scale(0.25, 0.25); dierOog(ctx, 0, 0, r * 4, D.iris || '#2A1A10', { pupil: 'liggend' }); } ctx.restore(); }
function _hoefDef(naam, o) { const V = HOEF_VORM[naam], f = o.H / 160;
  const D = Object.assign({ K: 1, X0: 0, G0: 0, rand: 0.45 * f, verMix: 0.3, verKleur: '#2E2A30', J: V.J, VORM: V, PAL: { basis: V.delen.romp.c } }, o);
  D.POOT = _hoefPoot(f, o.dikV || 1, o.dikA || 1, o.POOT || {});
  D.TENEN = (ctx, k, pal, BOT) => _hoefTeken(ctx, k, pal, BOT, D);
  D.GEZICHT = (ctx, pal, cm, A, BOT) => { if (o.GEZICHT) o.GEZICHT(ctx, pal, A, BOT, D); _hoefNeus(ctx, D, pal); _hoefOog(ctx, D, A, BOT); };
  D.VOLGORDE = o.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['staart'], ['rad'], ['mc'], ['vp'], ['schn'], ['mt'], ['ap'], ['keelkap'], ['romp', 0, 'lijf'], ['dij', 0, 'lijf'], ['hum', 0, 'lijf'], ['keelweb', 0, 'lijf'], ['nek', 0, 'lijf'], ['kruis'], ['mond'], ['kaak'], ['kop'], ['oor']];
  return D; }
// gangmodellen (graden; 90 = recht omlaag, >90 = naar achter). Voor: carpus knikt in de zwaai naar achter (middenhand tot ±155°), hoef klapt om.
const _HOEF_G = {
  stapV: { metaS: [[0, 72], [0.5, 90], [0.8, 102], [1, 122]], metaZ: [[0, 122], [0.3, 138], [0.58, 112], [0.86, 80], [1, 72]], pootS: [[0, 56], [0.66, 58], [1, 112]], pootZ: [[0, 112], [0.3, 150], [0.6, 112], [0.86, 60], [1, 56]] },
  stapA: { metaS: [[0, 76], [0.5, 88], [0.8, 98], [1, 116]], metaZ: [[0, 114], [0.3, 100], [0.6, 76], [0.86, 80], [1, 84]], pootS: [[0, 56], [0.7, 58], [1, 100]], pootZ: [[0, 100], [0.3, 140], [0.6, 96], [0.86, 60], [1, 56]] },
  drafV: { metaS: [[0, 64], [0.5, 92], [1, 122]], metaZ: [[0, 120], [0.3, 165], [0.58, 128], [0.86, 80], [1, 84]], pootS: [[0, 50], [0.5, 46], [1, 104]], pootZ: [[0, 104], [0.3, 158], [0.62, 110], [0.86, 58], [1, 50]] },
  drafA: { metaS: [[0, 74], [0.5, 90], [1, 122]], metaZ: [[0, 120], [0.3, 104], [0.6, 70], [0.86, 74], [1, 80]], pootS: [[0, 52], [0.5, 48], [1, 104]], pootZ: [[0, 104], [0.3, 148], [0.62, 96], [0.86, 58], [1, 52]] },
};
// stap: laterale volgorde (A 0 · V 0,25 · AF 0,5 · VF 0,75), viertakt; draf: diagonale paren (A+VF, AF+V), duty < 0,5 = zweeffase
function _hoefStap(S, beta, f, extra = {}) { return Object.assign({ S, beta, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 13 * f, A: 9 * f }, bob: 0.9 * f, dy: 3.5 * f, nx: { V: 0, A: 0 }, scap: 14, rol: 0.8, knik: 2.5,
  V: _HOEF_G.stapV, A: _HOEF_G.stapA, staartZwaai: [2, 3, 4, 5] }, extra); }
function _hoefDraf(S, beta, f, extra = {}) { return Object.assign({ S, beta, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: 17 * f, A: 13 * f }, bob: 2.2 * f, bobFase: beta / 2 - 0.25, dy: 3 * f, nx: { V: 0, A: 0 }, scap: 20, rol: 1.4, knik: 1.5,
  V: _HOEF_G.drafV, A: _HOEF_G.drafA, staartZwaai: [3, 5, 7, 9] }, extra); }

// ---------- PAARD (Equus caballus), bruin (bay) met zwarte manen/staart/onderbenen, witte sokken achter. Schofthoogte 160 cm. ----------
// pootprofielen gemeten op de vlakke paardplaat (cm bij schofthoogte 160, voor/achter); ezel en muilezel schalen mee met H
const _VLAKPROF = { rad: [[-0.16, 6.5, 2.0], [0.0, 7.4, 7.4], [0.3, 6.9, 6.1], [0.6, 6.3, 4.8], [0.85, 4.9, 4.4], [1.0, 5.6, 4.7], [1.1, 5.0, 4.4]],
  mc: [[-0.06, 5.4, 4.8], [0.06, 5.0, 4.6], [0.5, 4.2, 4.2], [0.86, 4.6, 4.2], [1.0, 5.6, 4.0], [1.12, 4.6, 3.8]],
  vp: [[-0.2, 5.0, 5.2], [0.05, 4.2, 4.6], [0.45, 3.8, 4.0], [0.7, 4.0, 4.0]],
  schn: [[-0.18, 8.0, 6.0], [0.0, 9.0, 9.0], [0.3, 5.4, 10.0], [0.6, 5.2, 9.0], [0.9, 5.2, 6.0], [1.0, 5.4, 6.4], [1.1, 4.6, 5.0]],
  mt: [[-0.06, 5.0, 6.0], [0.08, 4.6, 5.0], [0.5, 4.4, 4.4], [0.88, 4.6, 4.6], [1.0, 5.4, 5.4], [1.1, 4.4, 4.4]],
  ap: [[-0.2, 5.0, 5.2], [0.05, 4.2, 4.6], [0.45, 3.8, 4.0], [0.7, 4.0, 4.0]] };
const _vlakPoot = (kl) => Object.fromEntries(Object.keys(_VLAKPROF).map(k => [k, Object.assign({ prof: _VLAKPROF[k] }, kl[k] || {})]));
const HOEF_PAARD_DEF = _hoefDef('paard', { H: 160, halsRecht: 1, kopVolg: 0.25, dikV: 1, dikA: 1, schoftVast: -2, nekAs: -14, oogStijl: 'glans', geenNeus: true, verKleur: '#2A2224', klem: 7,
  HOEF: { type: 'hoef', L: 12, hv: 8, hh: 4, kleur: '#6B6560', kroon: '#1D1D1D' },
  POOT: _vlakPoot({ rad: { lagen: [_hoefBand('#613B25', 0.42, 0.62), _hoefBand('#1D1D1D', 0.62, 1.3)] }, mc: { c: '#1D1D1D' }, vp: { c: '#1D1D1D' },
    schn: { lagen: [_hoefBand('#613B25', 0.66, 0.84), _hoefBand('#1D1D1D', 0.84, 1.3)] }, mt: { c: '#1D1D1D' }, ap: { c: '#1D1D1D' } }),
  HOUDING: { staan: { ver: { V: -18, A: -23 } }, grazen: { ver: { V: -40, A: -35 }, dvoet: { A: 10 }, dy: 3, reikNek: 85, reik: 1 } },
  GANGEN: { lopen: _hoefStap(170, 0.62, 1, { dy: 1.5, rol: 0.5 }), draven: _hoefDraf(240, 0.42, 1, { dy: 2, rol: 0.8 }) } });
// ---------- EZEL (Equus asinus), grijs, lichte buik/snuit/oogring, schouderkruis, korte rechtopstaande manen, kwaststaart. Schofthoogte 110 cm. ----------
const HOEF_EZEL_DEF = _hoefDef('ezel', { H: 110, halsRecht: 1, kopVolg: 0.25, schoftVast: -2, nekAs: -14, oogStijl: 'ring', oogRing: [8, 4.8, 4.4, 2.5], geenNeus: true, dikV: 0.95, dikA: 0.95, verKleur: '#2A2830', klem: 5,
  HOEF: { type: 'hoef', L: 10, hv: 8, hh: 4.4, kleur: '#26211E' },
  POOT: _vlakPoot({}),
  HOUDING: { staan: { ver: { V: -15, A: 10 } }, grazen: { ver: { V: 19, A: 26 }, dy: 7, reikNek: 78, reik: 1 } },
  GANGEN: { lopen: _hoefStap(100, 0.64, 0.69, { dy: 1, rol: 0.5 }), draven: _hoefDraf(155, 0.44, 0.69, { dy: 1.5, rol: 0.8 }) } });
// ---------- MUILEZEL (paard x ezel): lichaam van een paard (lichter, rechte rug), kop/oren/staart meer ezel. Schofthoogte 130 cm. ----------
const HOEF_MUIL_DEF = _hoefDef('muilezel', { H: 130, halsRecht: 1, kopVolg: 0.25, dikV: 1, dikA: 1, schoftVast: -2, nekAs: -14, oogStijl: 'ring', oogRing: [7, 4.4, 4, 2.4], oogRingKleur: '#D9C7B8', geenNeus: true, verKleur: '#2A2224', klem: 6,
  HOEF: { type: 'hoef', L: 10, hv: 8, hh: 4.4, kleur: '#261F1C' },
  POOT: _vlakPoot({ rad: { lagen: [_hoefBand('#473932', 0.8, 1.3)] }, mc: { c: '#473932' }, vp: { c: '#473932' }, schn: { lagen: [_hoefBand('#473932', 0.92, 1.3)] }, mt: { c: '#473932' }, ap: { c: '#473932' } }),
  HOUDING: { staan: { ver: { V: -14, A: -14 } }, grazen: { ver: { V: -30, A: -25 }, dy: 2, reikNek: 85, reik: 1 } },
  GANGEN: { lopen: _hoefStap(125, 0.63, 0.81, { dy: 1.2, rol: 0.5 }), draven: _hoefDraf(195, 0.43, 0.81, { dy: 1.8, rol: 0.8 }) } });
// ---------- EDELHERT (Cervus elaphus), mannetje met gewei, halsmanen, lichte spiegel. Schofthoogte 120 cm. ----------
const HOEF_HERT_DEF = _hoefDef('edelhert', { H: 120, oogR: 2.9, neusR: 2.2, neusHoek: 0, iris: '#2A1A10', dikV: 0.78, dikA: 0.8, verKleur: '#2E2622',
  HOEF: { type: 'klauw', L: 8, hv: 5.5, hh: 3, kleur: '#2E2826' },
  POOT: { mc: { c: '#8F684F' }, vp: { c: '#8F684F' }, mt: { c: '#8F684F' }, ap: { c: '#8F684F' } },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, vechten: { ver: { V: -16, A: 10 }, dvoet: { V: 8 }, dy: 4, A: { nek: 30, kop: 120 } },
    grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 16 }, dy: 7, A: { nek: 66 }, reik: 1 } },
  GANGEN: { lopen: _hoefStap(130, 0.62, 0.75, { knik: 2 }) } });
// liggen (borstligging): romp op de grond, voorbenen onder de borst gevouwen (carpus voor, middenhand en hoef naar achter),
// achterbenen opzij onder de buik (hak achter op de grond, middenvoet en hoef naar voren). voet = [teen x, teen y, middenhand/-voet, kootbeen] (graden)
function _koeLig(J) { const sc = J.schouder[0], hp = J.heup[0]; return { zit: 1, dy: 52, A: { rompV: -2, rompM: 180, rompA: 183, nek: -36, kop: 58, st0: 100, st1: 94, st2: 80, st3: 60 },
  voet: { V: [sc - 26, -3, 182, 186], VF: [sc - 34, -4, 180, 184], A: [hp + 56, -3, 4, 10], AF: [hp + 44, -4, 8, 14] } }; }
// ---------- KOE (Bos taurus), roodbont (MRIJ). Schofthoogte 140 cm. ----------
const HOEF_KOE_DEF = _hoefDef('koe', { H: 140, oogR: 2.7, oogStijl: 'koe', kopVolg: 0.95, neusK: '#7A4A44', mondK: '#7A5048', iris: '#2A1A10', dikV: 1.2, dikA: 1.15, verKleur: '#3A2E2E',
  HOEF: { type: 'klauw', L: 11, hv: 6.5, hh: 3.5, kleur: '#4A3D36' },
  POOT: { rad: { c: '#E8D8C7' }, mc: { c: '#E8D8C7' }, vp: { c: '#E8D8C7' }, schn: { c: '#E8D8C7' }, mt: { c: '#E8D8C7' }, ap: { c: '#E8D8C7' } },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 14 }, dy: 6, A: { nek: 62 }, reik: 1 },
    liggen: _koeLig(HOEF_VORM.koe.J) },
  GANGEN: { lopen: _hoefStap(130, 0.65, 0.88, { scap: 12, rol: 1.0 }) } });
// ---------- NIJLPAARD (Hippopotamus amphibius). Schofthoogte 150 cm, korte dikke poten, kaak open tot ±150° (gapen). ----------
const _NIJL_PROF = { rad: [[-0.25, 12, 6], [0, 15, 14], [0.3, 14, 13], [0.7, 12.5, 11.5], [1.0, 12.5, 11.5], [1.2, 12, 11]], mc: [[-0.3, 12.5, 11.5], [0.5, 12.5, 11.5], [1.0, 13, 12], [1.3, 12.5, 12]], vp: [[-0.3, 12.5, 12], [0.3, 13, 12.5], [0.6, 13, 12.5]],
  schn: [[-0.25, 14, 8], [0, 16, 15], [0.4, 14, 14], [0.8, 12.5, 12.5], [1.0, 12.5, 13], [1.2, 12, 12]], mt: [[-0.3, 12.5, 12], [0.5, 12.5, 12], [1.0, 13, 12.5], [1.3, 12.5, 12]], ap: [[-0.3, 12.5, 12], [0.3, 13, 12.5], [0.6, 13, 12.5]] };
const HOEF_NIJL_DEF = _hoefDef('nijlpaard', { H: 150, oogR: 2.4, neusK: '#3A2C30', mondK: '#4A3A3E', neusHoek: 0.2, iris: '#3A2414', dikV: 160 / 150, dikA: 160 / 150, verKleur: '#2E2630',
  POOT: Object.fromEntries(Object.entries(_NIJL_PROF).map(([k, p]) => [k, { prof: p }])),
  HOEF: { type: 'teen', L: 16, hv: 9, hh: 5, kleur: '#4A3E44', voet: 'basis' },
  HOUDING: { staan: { ver: { V: -8, A: 8 } }, gapen: { ver: { V: -8, A: 8 }, A: { nek: -26, kop: -16 }, bek: 108 } },
  MOND(ctx, M, A, BOT, pal) { // open bek naar koppen.png: gehemelte (bovenkop) + binnenrand onderkaak, diepe keelboog, tong, gebogen slagtanden onder, snijtanden vooruit
    const N = HOEF_VORM.nijlpaard.mondNijl; const G = N.gehemelte.map(M.kop), O = N.onderLijn.map(M.kaak);
    const vul = (pts, c) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); };
    const hoek = [(G[G.length - 1][0] + O[0][0]) / 2, (G[G.length - 1][1] + O[0][1]) / 2], diep = Math.hypot(G[0][0] - O[O.length - 1][0], G[0][1] - O[O.length - 1][1]) * 0.22;
    const mid = [(G[0][0] + O[O.length - 1][0]) / 2, (G[0][1] + O[O.length - 1][1]) / 2], ax = [hoek[0] - mid[0], hoek[1] - mid[1]], al = Math.hypot(ax[0], ax[1]) || 1, d = [ax[0] / al, ax[1] / al];
    const keel = [G[G.length - 1], [hoek[0] + d[0] * diep - d[1] * diep * 0.7, hoek[1] + d[1] * diep + d[0] * diep * 0.7], [hoek[0] + d[0] * diep * 1.3, hoek[1] + d[1] * diep * 1.3], [hoek[0] + d[0] * diep + d[1] * diep * 0.7, hoek[1] + d[1] * diep - d[0] * diep * 0.7], O[0]];
    vul(G.concat(keel.slice(1, -1), O), '#D7929A'); // mondholte met keelboog
    vul([G[G.length - 2], ...keel.slice(1, -1), O[1], hoek], '#8E4452'); // keel donker
    vul(N.tong.map(M.kaak), '#C06A7A');
    const tand = (F, [b, t, w], c) => { const B = F(b), Tt = F(t), dx = Tt[0] - B[0], dy = Tt[1] - B[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, ww = w * 0.5;
      const k = [B[0] + dx * 0.55 + nx * ww * 1.2, B[1] + dy * 0.55 + ny * ww * 1.2]; ctx.beginPath(); ctx.moveTo(B[0] + nx * ww, B[1] + ny * ww); ctx.quadraticCurveTo(k[0], k[1], Tt[0], Tt[1]); ctx.quadraticCurveTo(B[0] + dx * 0.5 - nx * ww * 0.2, B[1] + dy * 0.5 - ny * ww * 0.2, B[0] - nx * ww, B[1] - ny * ww); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); };
    for (const t of N.boven) tand(M.kop, t, '#E6D6B0'); for (const t of N.snij) tand(M.kaak, t, '#EFE2C2'); for (const t of N.slag) tand(M.kaak, t, '#E9D3A2'); },
  GANGEN: { lopen: _hoefStap(150, 0.7, 0.94, { bob: 1.2, rol: 1.2, knik: 1.2, lift: { V: 9, A: 7 } }) } });

const HOEF = {};
HOEF.paard = HoefPop.maak(HOEF_PAARD_DEF); HOEF.ezel = HoefPop.maak(HOEF_EZEL_DEF); HOEF.muilezel = HoefPop.maak(HOEF_MUIL_DEF);
HOEF.edelhert = HoefPop.maak(HOEF_HERT_DEF); HOEF.koe = HoefPop.maak(HOEF_KOE_DEF); HOEF.nijlpaard = HoefPop.maak(HOEF_NIJL_DEF);

// =====================================================================================================
// WRAPPERS: dezelfde namen, aanroep en schermmaat als in dieren_zoog.js (schofthoogte op het scherm gelijk, anker = midden onder het dier)
//   paard/ezel/muilezel: s px per cm (160·s / 110·s / 130·s px schoft) · edelhert 2·s px/cm · koe7 1,7·s px/cm · nijlpaard 1,3·s px/cm
// o.houding: 'staan' | 'lopen' | 'draven' (paardachtigen) | 'grazen' | 'vechten' (hert) | 'liggen' (koe) | 'gapen' (nijlpaard); o.t / o.fase, o.kijk, o.a, o.wereld
// =====================================================================================================
const _HOEF_HMAP = { draf: 'draven', rennen: 'draven', galop: 'draven', snuffelen: 'grazen', eten: 'grazen', zitten: 'liggen', lig: 'liggen', gaap: 'gapen' };
function _hoefWrap(ctx, P, x, y, pxcm, o) { if (o == null) o = {}; if (typeof o === 'number') o = { a: o }; if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = _HOEF_HMAP[h] || h; if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = (h === 'draven' && P.GANGEN.lopen) ? 'lopen' : 'staan'; oo.houding = h;
  if (o.nekHoek) oo.nekHoek = o.nekHoek; if (o.kopHoek) oo.kopHoek = o.kopHoek;
  return P.teken(ctx, x, y, pxcm, oo); }
function paard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.paard, x, y, s, o); }
function ezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.ezel, x, y, s, o); }
function muilezel(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.muilezel, x, y, s, o); }
function edelhert(ctx, x, y, s = 1, o = {}) { const k = o.kop || 0; const oo = Object.assign({}, o); if (k > 0.5 && !o.houding) oo.houding = 'vechten'; else if (k) { oo.nekHoek = (o.nekHoek || 0) + k * 1.15; oo.kopHoek = (o.kopHoek || 0) + k * 0.35; }
  return _hoefWrap(ctx, HOEF.edelhert, x, y, s * 2, oo); }
function koe7(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.koe, x, y, s * 1.7, o); }
function nijlpaard(ctx, x, y, s = 1, o = {}) { return _hoefWrap(ctx, HOEF.nijlpaard, x, y, s * 1.3, o); }
// Wat word jij? · Landbouw 3 · Fokken: selecteren, inteelt en de fokwaarde — eigen tekenfuncties (25 okt 2026)
// Laadvolgorde: lib.js, lib_cast.js (actueel castboek), lib_bio.js, scenes.js r.1–32, extra.js, lib_micro_evo_min.js (dnaDraad, chromosoom1),
// hoefpop.js (HoefPop + koe7 uit bibliotheek/dieren/lib_dieren.js, goedgekeurd ronde 3–4), dan dit bestand.
// Maatvoering: P = px per cm. Koe en mens met dezelfde P staan op ware schaal (Holstein ± 145 cm schoft, mens ± 165–175 cm).

// ---------- hulpjes uit de Diergeneeskunde-reeks (teken_dg0.js / teken_dg2.js), letterlijk overgenomen ----------
const _dk3 = (hex, k = 0.25) => _mixHex(hex, '#000000', k), _lt3 = (hex, k = 0.25) => _mixHex(hex, '#FFFFFF', k);
function rietje(ctx, x, y, s = 1, a = 1, rot = 0, col = '#5BA4C9') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -70, -6, 140, 12, 6); shape(ctx, col, _lt3(col, 0.3), 1.5); ctx.fillStyle = '#F2EEE6'; ctx.fillRect(-70, -6, 14, 12); ctx.restore(); }
// vat met vloeibare stikstof (uit teken_dg0.js), nu met deksel, handvatten en label −196 °C
function stikstofVat(ctx, x, y, s = 1, a = 1, t = 0, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -220, 180, 220, 30); shape(ctx, '#8A96A8', '#C4CCD8', 2); ctx.fillStyle = rgba('#FFFFFF', 0.12); roundRect(ctx, -70, -205, 26, 190, 13); ctx.fill();
  ctx.strokeStyle = '#6A7688'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-90, -150); ctx.lineTo(90, -150); ctx.moveTo(-90, -60); ctx.lineTo(90, -60); ctx.stroke();
  roundRect(ctx, -40, -250, 80, 40, 10); shape(ctx, '#6A7688', '#C4CCD8', 2);
  for (const sx of [-1, 1]) { ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(sx * 98, -190, 18, sx > 0 ? -1.4 : 1.7, sx > 0 ? 1.4 : 4.5); ctx.stroke(); }
  for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i * 0.2) % 1; ctx.fillStyle = `rgba(230,240,255,${0.3 * (1 - ph)})`; ctx.beginPath(); ctx.arc(-20 + i * 10 + Math.sin(ph * 6 + i) * 12, -262 - ph * 80, 12 + ph * 14, 0, 6.283); ctx.fill(); }
  if (o.label !== false) { roundRect(ctx, -62, -128, 124, 46, 8); shape(ctx, '#F2EEE4', null); text(ctx, '−196 °C', 0, -94, fTekst(30, 800), '#1A2740', 'center'); }
  ctx.restore(); }

// ---------- KOEIEN: koe7-pop (HoefPop, bibliotheek) met eigen kleuren per ras ----------
// Alleen kleur, dikte van de poten en kleine toevoegingen (uier, blaar, neusring, nekkam) verschillen; vorm, skelet en gang zijn de goedgekeurde koe7.
const _KOE_BASIS = { H: 140, oogR: 2.7, oogStijl: 'koe', kopVolg: 0.95, neusK: '#7A4A44', mondK: '#7A5048', iris: '#2A1A10', dikV: 1.2, dikA: 1.15, verKleur: '#3A2E2E',
  HOEF: { type: 'klauw', L: 11, hv: 6.5, hh: 3.5, kleur: '#4A3D36' } };
const _ZW = '#25211F', _ZWOOR = '#1C1917', _WIT = '#EEE8DE', _WITPOOT = '#E9E3D8';
const _pootK = (c) => ({ rad: { c }, mc: { c }, vp: { c }, schn: { c }, mt: { c }, ap: { c } });
// ---------- eigen silhouetten (Kamiel 26 okt 2026, beeldreview MOET 5/6): vorm van koe7 vervormd, skelet en gang blijven die van de pop ----------
// _vormT past fn(x, y) toe op elk punt [x, y] in de vorm (gewrichten, delen, lagen, omtrek, oog, neus, mond); _deelSchaal vergroot één deel rond zijn zwaartepunt.
function _vormT(V, fn) { const f = (o) => Array.isArray(o) ? ((o.length === 2 && typeof o[0] === 'number' && typeof o[1] === 'number') ? fn(o[0], o[1]) : o.map(f)) : (o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)])) : o); return f(V); }
function _deelSchaal(V, deel, kx, ky, dx = 0, dy = 0) { const d = V.delen[deel]; const P = d.basis; const cx = P.reduce((s, p) => s + p[0], 0) / P.length, cy = P.reduce((s, p) => s + p[1], 0) / P.length;
  const g = (x, y) => [cx + (x - cx) * kx + dx, cy + (y - cy) * ky + dy]; V.delen[deel] = _vormT(d, g); }
// dubbeldoelkoe (oud Fries-Hollands): korte poten, diep en breed lijf, vlezige dij en schouder, rechte rug. Buiklijn −62 cm → −42; boven de buik iets dieper (×1,12)
const _DD_Y = (y) => y <= -62 ? -42 + (y + 62) * 1.12 : y * (42 / 62);
HOEF_VORM.koeDD = _vormT(HOEF_VORM.koe, (x, y) => [x * 1.02, _DD_Y(y)]); _deelSchaal(HOEF_VORM.koeDD, 'dij', 1.18, 1.1, -2, 2); _deelSchaal(HOEF_VORM.koeDD, 'hum', 1.15, 1.1, 2, 2);
// stier: zware nek met schouderkam, brede kop, diepe borst; poten normaal lang
HOEF_VORM.koeStier = _vormT(HOEF_VORM.koe, (x, y) => { const nk = Math.exp(-(((x - 62) / 26) ** 2)) * clamp((-y - 95) / 40, 0, 1); const bo = x > 30 && y > -85 && y < -55 ? (y + 85) / 30 * 6 : 0; return [x, y - nk * 14 + bo]; });
_deelSchaal(HOEF_VORM.koeStier, 'nek', 1.22, 1.25, 0, -3); _deelSchaal(HOEF_VORM.koeStier, 'kop', 1.14, 1.12); _deelSchaal(HOEF_VORM.koeStier, 'kaak', 1.15, 1.15); _deelSchaal(HOEF_VORM.koeStier, 'hum', 1.12, 1.08);
function _lb3KoeDef(o, vorm = 'koe') { const d = _hoefDef(vorm, Object.assign({}, _KOE_BASIS, o, {
    HOUDING: { staan: { ver: { V: -8, A: 8 } }, grazen: { ver: { V: -8, A: 8 }, dvoet: { V: 14 }, dy: 6, A: { nek: 62 }, reik: 1 }, liggen: _koeLig(HOEF_VORM[vorm].J) },
    GANGEN: { lopen: _hoefStap(130, 0.65, 0.88, { scap: 12, rol: 1.0 }) } })); return d; }
const KOE_RAS = {
  // Holstein zwartbont: zwarte basis met witte vlekken (de witte lappen van de MRIJ-plaat), witte poten, kop zwart met witte bles
  holstein: { def: _lb3KoeDef({ dikV: 1.0, dikA: 0.98, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.95, sy: 1.04, uier: 1.3, staartWit: 1 },
  // dubbeldoelkoe (oud zwartbont Fries-Hollands type, melk én vlees): zelfde kleuren, gedrongen, dikke poten, klein uier
  dubbel: { def: _lb3KoeDef({ dikV: 1.45, dikA: 1.45, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }, 'koeDD'), sx: 1.0, sy: 1.0, uier: 0.35, staartWit: 1, yT: _DD_Y },
  // Groninger blaarkop: zwart met witte kop en zwarte 'blaren' rond de ogen, witte buik en staartpunt, zwarte poten
  blaarkop: { def: _lb3KoeDef({ dikV: 1.25, dikA: 1.2, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#C6AD9B': '#E6DFD4' }, WEG: ['#E8D7C6:romp', '#834B30:kop'], POOT: _pootK('#2E2A27'),
      GEZICHT: (ctx) => { const O = HOEF_VORM.koe.oog; ctx.fillStyle = _ZW; ctx.beginPath(); ctx.ellipse(O[0] - 0.5, O[1] + 0.3, 7.2, 5.6, -0.3, 0, 6.283); ctx.fill(); } }), sx: 1.0, sy: 0.97, uier: 0.85, staartWit: 1, buikWit: 1 },
  // stier (Holstein): zwartbont, zwaarder voorhand, geen uier, neusring
  stier: { def: _lb3KoeDef({ dikV: 1.35, dikA: 1.3, KLEUR: { '#834B30': '#201C1A', '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#C9C1B6' }, POOT: _pootK('#D9D2C8'),
      GEZICHT: (ctx) => { const N = HOEF_VORM.koeStier.neusgat; ctx.strokeStyle = '#C9B26A'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.ellipse(N[0] + 2.5, N[1] + 6.5, 4, 4.8, 0.2, 0, 6.283); ctx.stroke(); } }, 'koeStier'), sx: 1.1, sy: 1.08, uier: 0, kam: 0, scrotum: 1 },
  // stierkalfje: Holstein-kleuren, kortere romp (sx < sy): poten lijken naar verhouding langer
  kalf: { def: _lb3KoeDef({ dikV: 0.9, dikA: 0.9, KLEUR: { '#834B30': _ZW, '#6A3824': _ZWOOR, '#E8D7C6': _WIT, '#C6AD9B': '#D2CBC1' }, POOT: _pootK(_WITPOOT) }), sx: 0.76, sy: 1.0, uier: 0 }
};
for (const k in KOE_RAS) KOE_RAS[k].pop = HoefPop.maak(KOE_RAS[k].def);
// koe in wereldcoördinaten: x,y = midden onder de poten op de grond; P = px per cm; o: houding, t, kijk, a, uier (overschrijft ras)
function rund(ctx, ras, x, y, P, o = {}) { const R = KOE_RAS[ras]; if (!R) return; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const kijk = o.kijk || 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(R.sx, R.sy);
  const pop = R.pop, an = pop.D.anker || 0, X = (cx) => kijk * P * (cx - an), Y = (cy) => P * (R.yT ? R.yT(cy) : cy);
  pop.teken(ctx, 0, 0, P, { houding: o.houding || 'staan', t: o.t || 0, kijk });
  // uier: ná de pop, vóór de nabije achterpoot (die staat er op x ≈ −60 tot −46 cm, het uier begint op −47); bovenrand valt in de buik
  const ui = o.uier != null ? o.uier : R.uier; if (ui > 0.01) { const u = ui, d = 13 * u; ctx.fillStyle = '#DDB0A3'; ctx.beginPath(); ctx.moveTo(X(-47), Y(-56)); ctx.bezierCurveTo(X(-50), Y(-56 + d * 0.9), X(-40), Y(-55 + d), X(-28), Y(-55 + d)); ctx.bezierCurveTo(X(-14), Y(-55 + d), X(-9), Y(-54 + d * 0.5), X(-8), Y(-57)); ctx.closePath(); ctx.fill();
    ctx.fillStyle = rgba('#B98374', 0.4); ctx.beginPath(); ctx.ellipse(X(-28), Y(-55 + d * 0.86), P * 13, P * 2.4 * u, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba('#B98374', 0.55); ctx.lineWidth = Math.max(1, P * 0.45); ctx.beginPath(); ctx.moveTo(X(-28), Y(-55)); ctx.quadraticCurveTo(X(-27), Y(-55 + d * 0.5), X(-28), Y(-55 + d * 0.9)); ctx.stroke();
    ctx.fillStyle = '#C98E80'; for (const tx of [-39, -17]) { roundRect(ctx, X(tx) - P * 1.3, Y(-56 + d), P * 2.6, P * 5, P * 1.2); ctx.fill(); } }
  // nekkam van de stier: zware bult boven hals en schoft (stieren hebben een veel dikkere nek dan koeien)
  if (R.kam) { ctx.fillStyle = '#201C1A'; ctx.beginPath(); ctx.moveTo(X(26), Y(-132)); ctx.quadraticCurveTo(X(58), Y(-162), X(94), Y(-150)); ctx.quadraticCurveTo(X(102), Y(-122), X(82), Y(-100)); ctx.lineTo(X(40), Y(-110)); ctx.closePath(); ctx.fill(); }
  // scrotum: sober, tussen de achterpoten (achter de nabije achterpoot getekend zou beter zijn; hier na de pop, klein en in een gedempte huidtint)
  if (R.scrotum) { ctx.fillStyle = '#B8A49A'; ctx.beginPath(); ctx.moveTo(X(-44), Y(-66)); ctx.bezierCurveTo(X(-50), Y(-56), X(-48), Y(-44), X(-41), Y(-43)); ctx.bezierCurveTo(X(-34), Y(-44), X(-33), Y(-56), X(-38), Y(-66)); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// schofthoogte van een ras in px (handig voor labels boven de koe)
const rundTop = (ras, y, P) => y - P * 150 * (KOE_RAS[ras] ? KOE_RAS[ras].sy : 1);

// telpoppetje-koe (alleen voor groepen en tellingen, zoals de telpoppetjes bij mensen): zijaanzicht, kop rechts
function koeIcoon(ctx, x, y, h, col = C.text2, a = 1, o = {}) { if (a <= 0.01) return; const s = h / 60, kijk = o.kijk || 1; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.fillStyle = col;
  roundRect(ctx, -40, -52, 66, 30, 12); ctx.fill(); // romp
  ctx.beginPath(); ctx.moveTo(18, -50); ctx.quadraticCurveTo(34, -60, 44, -48); ctx.lineTo(48, -36); ctx.quadraticCurveTo(46, -30, 38, -32); ctx.lineTo(22, -30); ctx.closePath(); ctx.fill(); // hals en kop
  ctx.beginPath(); ctx.ellipse(28, -54, 6, 2.6, -0.4, 0, 6.283); ctx.fill(); // oor
  for (const px of [-34, -24, 12, 20]) ctx.fillRect(px, -26, 6, 26); // poten
  ctx.lineWidth = 3; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(-39, -48); ctx.quadraticCurveTo(-46, -36, -43, -18); ctx.stroke(); // staart
  if (o.uier) { ctx.beginPath(); ctx.ellipse(-12, -22, 9, 5, 0, 0, 6.283); ctx.fill(); }
  if (o.bont) { ctx.fillStyle = rgba('#FFFFFF', 0.85); blob(ctx, -18, -44, 10, 7, 0.25, o.bont); ctx.fill(); blob(ctx, 6, -34, 8, 6, 0.25, o.bont + 2); ctx.fill(); }
  ctx.restore(); }
function stierIcoon(ctx, x, y, h, col = C.text2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; koeIcoon(ctx, x, y, h, col, 1); const s = h / 60; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x + 20 * s, y - 52 * s, 13 * s, 8 * s, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); }

// ---------- figuranten in castboekstijl (voorstel, nog niet in het castboek) ----------
// Het castboek kent geen veehoudster en geen inseminator: CAST_EXTRA heeft alleen familie en buren; Veehouder Gerrit (vast, man) bestaat wel.
if (!CAST.veehoudster) CAST.veehoudster = { naam: 'Veehoudster', leeftijd: 46, rol: 'figurant · melkveehouder, haar bedrijf is Yasmins stageplek (Landbouw 3) · los van alle families',
  huid: '#E2B48F', haar: '#6A4428', kapsel: 'staart', wenkbrauw: '#4A2E1A', wimpers: true, lippen: '#B05A50',
  top: 'jas', topKleur: '#2F6A78', topAccent: '#275966', broek: '#2F6A78', schoen: '#2E3A2A', schoenAccent: '#1E261C', accessoire: [], lengte: 0.99 };
if (!CAST.inseminator) CAST.inseminator = { naam: 'Inseminator', leeftijd: 41, rol: 'figurant · inseminator (KI), overall en lange handschoen (Landbouw 3)', huid: '#C99A78', haar: '#3A2A20', kapsel: 'kort', wenkbrauw: '#2E2018', stoppels: true,
  top: 'overall', topKleur: '#55606E', topAccent: '#454F5C', broek: '#55606E', schoen: '#2E3A2A', schoenAccent: '#1E261C', accessoire: [], lengte: 1.02 };
// Yasmin in de stal: werkoverall en laarzen (voorstel voor haar garderobe)
if (CAST.yasmin && CAST.yasmin.garderobe && !CAST.yasmin.garderobe.stal) CAST.yasmin.garderobe.stal = { top: 'jas', topKleur: '#4E6B4A', topAccent: '#41593D', broek: '#3E4A3A', schoen: '#2A2F26', schoenAccent: '#1E221C', accessoire: ['oorbel'] };
// lange KI-handschoen over de rechterarm (de arm met o.pose; zelfde armformules als persoon())
function kiHandschoen(ctx, id, x, voet, h, pose, kijk = 1) { const P0 = CAST[id], pz = POSES[pose] || POSES.staan; const H = h * (P0.lengte || 1), hh = H / (P0.kop || 6.1), top = voet - H, sw = hh * (P0.schouderK || (P0.leeftijd > 30 ? 1.95 : 1.8));
  const schouderY = top + hh * 1.42, sx = x + kijk * sw * 0.4, sy = schouderY + hh * 0.25, L1 = hh * 1.32, L2 = hh * 1.2, [a1, a2] = pz.R;
  const ex = sx + kijk * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1, hx = ex + kijk * Math.sin(a2) * L2, hy = ey + Math.cos(a2) * L2;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#8FB4CF'; ctx.lineWidth = hh * 0.36; ctx.beginPath(); ctx.moveTo(sx + (ex - sx) * 0.35, sy + (ey - sy) * 0.35); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = hh * 0.06; ctx.beginPath(); ctx.moveTo(ex, ey - hh * 0.08); ctx.lineTo(hx, hy - hh * 0.08); ctx.stroke();
  const ang = Math.atan2(hy - ey, hx - ex); ctx.fillStyle = '#8FB4CF'; ctx.beginPath(); ctx.ellipse(hx + Math.cos(ang) * hh * 0.08, hy + Math.sin(ang) * hh * 0.08, hh * 0.21, hh * 0.17, ang, 0, 6.283); ctx.fill(); ctx.restore();
  return { x: hx + Math.cos(ang) * hh * 0.14, y: hy + Math.sin(ang) * hh * 0.14, ang }; }
// inseminatiepistool (lange dunne staaf met het rietje erin)
function kiPistool(ctx, x, y, ang, L = 150, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -L * 0.12, -5, L, 10, 5); shape(ctx, '#D8DEE6', '#8A94A2', 1.5); roundRect(ctx, -L * 0.2, -9, L * 0.14, 18, 5); shape(ctx, '#5B8CC9', null); ctx.restore(); }

// ---------- STAL (geen decor: alleen grond en een paar balken tot het ElevenLabs-decor er is) ----------
function stalGrond(ctx, y = 860) { ctx.fillStyle = '#2B3442'; ctx.fillRect(0, y, W, 40); ctx.fillStyle = '#3A4558'; ctx.fillRect(0, y - 6, W, 8); stroLaag(ctx, 0, y - 8, W); }
function stroLaag(ctx, x, y, w, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#C9A35C', 0.55); ctx.lineWidth = 2; for (let i = 0; i < w / 7; i++) { const px = x + hash(i * 1.7) * w, an = hash(i * 3.3) * 1.2 - 0.6; ctx.beginPath(); ctx.moveTo(px, y + 2 + hash(i) * 10); ctx.lineTo(px + Math.cos(an) * 20, y + 2 + hash(i) * 10 + Math.sin(an) * 6); ctx.stroke(); } ctx.restore(); }
function decorLabel(ctx, s = 'STAL · DECOR VOLGT (ELEVENLABS)') { metaText(ctx, s, 80, 90, C.text2, 'left', 24); }
function hek(ctx, x0, x1, y, h = 150, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#8A8F98'; ctx.lineCap = 'round';
  ctx.lineWidth = 9; for (const yy of [y - h, y - h * 0.62, y - h * 0.24]) { ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); }
  ctx.lineWidth = 12; for (let px = x0; px <= x1 + 1; px += (x1 - x0) / Math.max(1, Math.round((x1 - x0) / 260))) { ctx.beginPath(); ctx.moveTo(px, y - h - 12); ctx.lineTo(px, y); ctx.stroke(); }
  ctx.restore(); }

// ---------- keuzebord JOUW STAMBOOM ----------
// o.moeders = aantal gevulde moedervakken (0–3), o.vader = 0/1/'kaart', o.ster
function keuzebord(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.82), rgba(C.goud, 0.8), 2.5);
  text(ctx, 'JOUW STAMBOOM', x + 28, y + 52, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', x + 28, y + 86, C.text2, 'left', 20);
  const rij = o.rijen || [['VADER', 1], ['MOEDERS', 3]]; let yy = y + 120;
  for (const [naam, n] of rij) { metaText(ctx, naam, x + 28, yy + 22, C.text2, 'left', 18); const vw = 76, gap = 14;
    for (let i = 0; i < n; i++) { const bx = x + 28 + i * (vw + gap), by = yy + 34; roundRect(ctx, bx, by, vw, 58, 10); ctx.setLineDash([7, 6]); shape(ctx, rgba(C.fill, 0.4), rgba(C.line, 0.8), 2); ctx.setLineDash([]); }
    yy += 112; }
  ctx.restore(); }

// ---------- staafjes melk per koe ----------
function melkStaaf(ctx, x, yBodem, w, hPx, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, yBodem - hPx, w, hPx, 10); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }

// ---------- denkwolk ----------
function denkwolk(ctx, x, y, w, h, bronX, bronY, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = rgba('#F2F2EE', 0.1), rand = rgba('#F2F2EE', 0.55);
  ctx.beginPath(); const n = 11; for (let i = 0; i < n; i++) { const an = i / n * 6.283, an2 = (i + 1) / n * 6.283; const px = x + w / 2 + Math.cos(an) * w / 2, py = y + h / 2 + Math.sin(an) * h / 2, qx = x + w / 2 + Math.cos(an2) * w / 2, qy = y + h / 2 + Math.sin(an2) * h / 2;
    const mx = x + w / 2 + Math.cos((an + an2) / 2) * w * 0.6, my = y + h / 2 + Math.sin((an + an2) / 2) * h * 0.6; if (!i) ctx.moveTo(px, py); ctx.quadraticCurveTo(mx, my, qx, qy); } ctx.closePath(); shape(ctx, col, rand, 2.5);
  for (const [k, r] of [[0.28, 16], [0.58, 11], [0.82, 7]]) circ(ctx, lerp(x + w * 0.3, bronX, k), lerp(y + h, bronY, k), r, col, rand, 2);
  ctx.restore(); }

// ---------- streepjescode ----------
function streepjescode(ctx, x, y, w, h, seed, col = '#1A2740', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; let px = x; let i = 0;
  while (px < x + w - 2) { const bw = 1.5 + Math.floor(hash(seed * 17 + i) * 3) * 1.6; if (hash(seed * 7 + i * 3) > 0.42) ctx.fillRect(px, y, bw, h); px += bw + 1.5 + hash(seed + i * 11) * 2; i++; } ctx.restore(); }

// ---------- buisje met streepjescode, tangetje ----------
function haarBuisje(ctx, x, y, s = 1, a = 1, rot = 0, seed = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -14, -70, 28, 110, 13); shape(ctx, rgba('#DCE5EC', 0.35), '#DCE5EC', 2); roundRect(ctx, -17, -84, 34, 20, 5); shape(ctx, C.paars, null);
  roundRect(ctx, -12, -50, 24, 46, 3); shape(ctx, '#F2EEE4', null); ctx.save(); ctx.translate(0, -27); ctx.rotate(Math.PI / 2); streepjescode(ctx, -20, -9, 40, 18, seed); ctx.restore();
  ctx.strokeStyle = '#2A2622'; ctx.lineWidth = 1.4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-5 + i * 3, 30); ctx.quadraticCurveTo(-2 + i * 2, 14, -6 + i * 4, 4); ctx.stroke(); } // haren
  ctx.restore(); }
function tangetje(ctx, x, y, s = 1, ang = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(70, -7); ctx.moveTo(0, 0); ctx.lineTo(70, 7); ctx.stroke(); ctx.fillStyle = '#5A6070'; roundRect(ctx, -8, -8, 22, 16, 5); ctx.fill(); ctx.restore(); }
// stro-kalverhok: achterwand, zijschotten en strobed
function kalverhok(ctx, x0, x1, y, h = 260, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - h, x1 - x0, h, 8); shape(ctx, rgba('#5A6478', 0.35), null);
  ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { const px = x0 + i * (x1 - x0) / 8; ctx.beginPath(); ctx.moveTo(px, y - h); ctx.lineTo(px, y); ctx.stroke(); }
  ctx.fillStyle = '#7A8494'; ctx.fillRect(x0 - 10, y - h - 10, 18, h + 10); ctx.fillRect(x1 - 8, y - h - 10, 18, h + 10);
  ctx.fillStyle = rgba('#C9A35C', 0.3); ctx.fillRect(x0, y - 22, x1 - x0, 22); stroLaag(ctx, x0, y - 26, x1 - x0); ctx.restore(); }

// ---------- MICRO: chromosomenpaar met veel kleine allelen ----------
// kaal chromosoom (zelfde vorm en banden als chromosoom1 uit lib_micro_evo, zonder gen-band); paars = DNA
function chromKaal(ctx, x, y, h, breed) { _chromTekening(ctx, x, y - h / 2, h, breed, 0.58, C.kern, C.kernR, null, x * 0.01); }
// allelen = lijst [{p (0–1 langs het chromosoom), k: 0|1 (welke variant)}]; kleuren paars licht/donker (paars = DNA)
function chromAllelen(ctx, x, y, h, seed, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const breed = o.breed || 40; ctx.save(); ctx.globalAlpha *= a;
  chromKaal(ctx, x, y, h, breed);
  const n = o.n || 13; for (let i = 0; i < n; i++) { const p = 0.08 + i / (n - 1) * 0.84; if (Math.abs(p - 0.58) < 0.04) continue; const k = hash(seed * 31 + i * 7) > 0.5; const yy = y - h / 2 + p * h;
    ctx.fillStyle = k ? '#E6D9FF' : '#4E3C86'; roundRect(ctx, x - breed * 0.42, yy - 3, breed * 0.84, 6, 3); ctx.fill(); }
  ctx.restore(); }
// één chromosoom met een klein koraal allel 'r' op plek p
function chromR(ctx, x, y, h, p, lab = 'r', o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const breed = o.breed || 40; ctx.save(); ctx.globalAlpha *= a; chromKaal(ctx, x, y, h, breed);
  const yy = y - h / 2 + p * h; if (lab) { roundRect(ctx, x - breed * 0.46, yy - 9, breed * 0.92, 18, 5); shape(ctx, lab === 'r' ? C.koraal : '#9CCBE3', null); naamBij(ctx, lab, '', x + breed * 0.75, yy + 12, 1, 'left', lab === 'r' ? C.koraal : C.text); }
  ctx.restore(); }

// ---------- DNA-chip ----------
function dnaChip(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3446', '#8FA0B5', 2.5);
  roundRect(ctx, x + 24, y + 24, w - 48, h - 48, 8); shape(ctx, '#0D1420', null); const n = o.n || 18, m = Math.round(n * (h - 48) / (w - 48)); const dx = (w - 72) / (n - 1), dy = (h - 72) / (m - 1);
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const v = hash(i * 13.1 + j * 7.7 + (o.seed || 1)); const col = v < 0.33 ? C.paars : v < 0.66 ? '#D8CCF5' : C.goud; circ(ctx, x + 36 + i * dx, y + 36 + j * dy, Math.min(dx, dy) * 0.28, rgba(col, 0.85)); }
  ctx.fillStyle = '#5A6070'; for (let i = 0; i < 10; i++) { ctx.fillRect(x + 30 + i * (w - 60) / 9 - 4, y + h, 8, 14); } ctx.restore(); }
// merkervlaggetje op een chromosoom (goud)
function merkerVlag(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 34 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - 34 * s); ctx.lineTo(x + 22 * s, y - 27 * s); ctx.lineTo(x, y - 20 * s); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); circ(ctx, x, y, 3.5 * s, C.goud); ctx.restore(); }
// loep, schaar, spuit (simpele herkenbare vormen)
function loep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = r * 0.16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.55, y + r * 1.55); ctx.stroke();
  circ(ctx, x, y, r, rgba('#9CCBE3', 0.12), '#C4CCD8', r * 0.12); ctx.restore(); }
function schaar(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-10, 10); ctx.lineTo(50, -24); ctx.moveTo(-10, -10); ctx.lineTo(50, 24); ctx.stroke(); circ(ctx, -24, 16, 12, null, '#C4CCD8', 6); circ(ctx, -24, -16, 12, null, '#C4CCD8', 6); ctx.restore(); }
function spuit(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -12, 70, 24, 5); shape(ctx, rgba('#DCE5EC', 0.3), '#C4CCD8', 3);
  ctx.strokeStyle = '#C4CCD8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(62, 0); ctx.moveTo(-40, 0); ctx.lineTo(-58, 0); ctx.moveTo(-58, -12); ctx.lineTo(-58, 12); ctx.stroke(); ctx.restore(); }
function doorstreep(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, null, C.koraal, 6); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - r * 0.7, y + r * 0.7); ctx.lineTo(x + r * 0.7, y - r * 0.7); ctx.stroke(); ctx.restore(); }

// ---------- stierkaart (referentiegroep, tablet, tijdbalk) ----------
// o: dochters (aantal), melk (0–1, staafjes van de dochters), code (seed), titel, rand, licht
function stierKaart(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, o.donker ? rgba(C.fill, 0.85) : '#EEF0F2', o.rand || (o.donker ? C.line : '#B8C0CC'), o.rand ? 4 : 1.5);
  const ink = o.donker ? C.text : '#1A2740', ic = o.donker ? C.text2 : '#3A4458';
  if (!o.geenStier) { const Pp = Math.min(h * 0.4 / 160, w * 0.46 / 250); rund(ctx, 'stier', x + w * 0.26, y + h * (o.dochters ? 0.5 : 0.62), Pp, { kijk: 1 }); }
  if (o.code != null) { roundRect(ctx, x + w * 0.52, y + h * 0.12, w * 0.4, h * 0.24, 4); shape(ctx, o.donker ? '#F2EEE4' : '#FFFFFF', null); streepjescode(ctx, x + w * 0.54, y + h * 0.15, w * 0.36, h * 0.18, o.code, '#1A2740'); }
  if (o.dochters) { const n = o.dochters, dw = (w - 24) / n; for (let i = 0; i < n; i++) { const m = o.melk != null ? clamp(o.melk + (hash(o.code * 3 + i) - 0.5) * 0.3, 0.15, 1) : 0.5; const bx = x + 12 + i * dw + dw / 2;
      koeIcoon(ctx, bx, y + h - 12, Math.min(dw * 0.9, h * 0.2), ic, 1); ctx.fillStyle = rgba(C.goud, 0.85); ctx.fillRect(bx - dw * 0.18, y + h - 16 - h * 0.2 - m * h * 0.22, dw * 0.36, m * h * 0.22); } }
  if (o.titel) text(ctx, o.titel, x + w / 2, y + h * 0.92, fTekst(Math.round(h * 0.11), 700), ink, 'center');
  ctx.restore(); }

// ---------- stamboom-knoop ----------
function knoop(ctx, x, y, r, man, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const vul = o.vul || C.bgSchema, rand = o.rand || C.text, lw = o.lw || 3;
  if (man) { roundRect(ctx, x - r, y - r, 2 * r, 2 * r, 4); shape(ctx, vul, rand, lw); } else { circ(ctx, x, y, r, vul, rand, lw); } ctx.restore(); }
function ster(ctx, x, y, r, col = C.goud, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); shape(ctx, col, _lt3(col, 0.35), 2); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); ctx.restore(); }

// ---------- vrucht in de baarmoeder (sober: dwarsdoorsnede, geen bloed) ----------
// g = grootte 0..1 van de vrucht; stop = 0..1 (grijs, groeit niet verder)
function baarmoederVrucht(ctx, x, y, r, g, stop = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); shape(ctx, rgba('#C98A7A', 0.14), rgba('#C98A7A', 0.75), 4);
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.08, r * 0.84, 0, 0, 6.283); ctx.strokeStyle = rgba('#C98A7A', 0.35); ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, r * 0.98, r * 0.74, 0, 0, 6.283); ctx.fillStyle = rgba('#9CCBE3', 0.08); ctx.fill(); // vruchtwater
  const k = r * 0.66 * g, col = stop > 0.5 ? '#80868F' : '#CFA58A', dk = stop > 0.5 ? '#60666F' : '#A97E64'; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.15); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // romp (gebogen rug), kop met snuit naar beneden-voren, gevouwen voor- en achterpoten met donkere klauwtjes
  ctx.beginPath(); ctx.moveTo(-k * 0.75, k * 0.05); ctx.bezierCurveTo(-k * 0.8, -k * 0.55, k * 0.2, -k * 0.7, k * 0.5, -k * 0.3); ctx.bezierCurveTo(k * 0.62, -k * 0.05, k * 0.4, k * 0.35, -k * 0.05, k * 0.35); ctx.bezierCurveTo(-k * 0.45, k * 0.38, -k * 0.72, k * 0.3, -k * 0.75, k * 0.05); ctx.fill();
  ctx.beginPath(); ctx.ellipse(k * 0.6, -k * 0.08, k * 0.34, k * 0.2, 1.15, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 0.74, k * 0.2, k * 0.12, k * 0.1, 0.6, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 0.46, -k * 0.32, k * 0.12, k * 0.05, -0.5, 0, 6.283); ctx.fillStyle = dk; ctx.fill(); ctx.fillStyle = col;
  ctx.lineWidth = Math.max(2, k * 0.12); ctx.beginPath(); ctx.moveTo(k * 0.25, k * 0.25); ctx.lineTo(k * 0.38, k * 0.6); ctx.lineTo(k * 0.12, k * 0.72); ctx.moveTo(-k * 0.5, k * 0.25); ctx.lineTo(-k * 0.34, k * 0.62); ctx.lineTo(-k * 0.06, k * 0.6); ctx.stroke();
  ctx.fillStyle = dk; for (const [hx, hy] of [[k * 0.1, k * 0.73], [-k * 0.04, k * 0.61]]) { ctx.beginPath(); ctx.ellipse(hx, hy, k * 0.07, k * 0.05, 0, 0, 6.283); ctx.fill(); }
  ctx.lineWidth = Math.max(1.5, k * 0.05); ctx.strokeStyle = dk; ctx.beginPath(); ctx.moveTo(-k * 0.74, k * 0.02); ctx.quadraticCurveTo(-k * 0.9, k * 0.2, -k * 0.82, k * 0.38); ctx.stroke(); // staartje
  circ(ctx, k * 0.68, -k * 0.2, Math.max(1.5, k * 0.045), stop > 0.5 ? '#50565F' : '#3A2820'); ctx.restore();
  ctx.restore(); }

// ---------- tablet met paringsprogramma ----------
function tabletScherm(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 26); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, x + 22, y + 22, w - 44, h - 44, 10); shape(ctx, '#0F1622', null);
  metaText(ctx, 'PARINGSPROGRAMMA: TE VEEL FAMILIE → UIT', x + 46, y + 70, C.text2, 'left', 18);
  const kw = (w - 44 - 60) / 2, kh = h - 44 - 120, ky = y + 92;
  stierKaart(ctx, x + 44, ky, kw, kh, { donker: 1, code: 11, rand: C.koraal }); stierKaart(ctx, x + 44 + kw + 16, ky, kw, kh, { donker: 1, code: 23, rand: C.goud });
  text(ctx, 'MELK ↑↑', x + 44 + kw / 2, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaText(ctx, 'FAMILIE VAN DEZE KOE', x + 44 + kw / 2, ky + kh * 0.88, C.koraal, 'center', 16);
  text(ctx, 'MELK ↑', x + 60 + kw * 1.5, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaText(ctx, 'GEEN FAMILIE', x + 60 + kw * 1.5, ky + kh * 0.88, C.goud, 'center', 16);
  if (o.streep) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 54, ky + kh - 14); ctx.lineTo(x + 34 + kw, ky + 14); ctx.stroke(); }
  ctx.restore(); }
// Wat word jij? · Landbouw 3 · Fokken: selecteren, inteelt en de fokwaarde — scènes per alinea (v1.0, 26 okt 2026).
// Look: Schema met cast (Yasmin, Opa Henk, Veehouder Gerrit, Bilal; inseminator = figurant); Micro voor allelen, merkers en chromosomen.
// Decor 'stal' alleen onder scènes die echt in de stal spelen (cold open, H3-opening, tabletscène H4, recap); de rest op navy.
// Kleuren: paars = DNA/erfelijkheid, oker = voer en omgeving, koraal = 'let op' (recessief allel, mislukte dracht), goud = focus/keuze.
// Rode draad: het keuzebord JOUW STAMBOOM (jij = de fokker) groeit per hoofdstuk mee: leeg → moeders + KI-vader → topkoe →
// stier met fokwaarde → kalf met DNA-test → stamboom met één ster (inteelt) → veel verschillende sterren → vier kaartjes.

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6, dy = 0, grond = null) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, -dy, W, H); if (dy > 0 && grond) { ctx.fillStyle = grond; ctx.fillRect(0, H - dy - 2, W, dy + 2); } ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860; // voetlijn op het decor (± 80 % van de hoogte)

// ---------- hulpjes (zelfde als film 2) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function vereenvoudigd(ctx, a = 1) { metaA(ctx, 'VEREENVOUDIGD', 1840, 90, a, C.grain, 'right', 26); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function gras(ctx, y = 850) { ctx.fillStyle = rgba('#2F4A3A', 0.55); ctx.fillRect(0, y, W, 30); }
function vloer(ctx, y = 840) { ctx.fillStyle = rgba('#2B3442', 0.8); ctx.fillRect(0, y, W, 30); }

// dubbeldoelkoe iets duidelijker anders dan de Holstein (Kamiel 26 okt 2026, d2): korter, gespierder (dikkere poten), kleiner uier
// dubbeldoelkoe en stier: eigen silhouet in teken_lb3.js (KOE_RAS, beeldreview MOET 5/6)

// klein Amerikaans vlaggetje (zoals keyframe d2)
function vlagVS(ctx, x, y, w, a = 1) { const h = w * 0.6; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#F2F2EE' : '#C8463C'; ctx.fillRect(x, y + i * h / 7, w, h / 7 + 0.5); } ctx.fillStyle = '#2E3A6E'; ctx.fillRect(x, y, w * 0.42, h * 0.55); ctx.restore(); }
// kroontje (topkoe)
function kroon(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-26, 14); ctx.lineTo(-30, -14); ctx.lineTo(-14, 0); ctx.lineTo(0, -20); ctx.lineTo(14, 0); ctx.lineTo(30, -14); ctx.lineTo(26, 14); ctx.closePath(); shape(ctx, C.goud, _lt3(C.goud, 0.35), 2); ctx.restore(); }
// stippellijn
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
// staaf die van onder naar boven groeit
function groeiStaaf(ctx, x, yb, w, h, col, u = 1, a = 1, dash = false) { if (a <= 0.01 || u <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const hh = h * u; roundRect(ctx, x - w / 2, yb - hh, w, hh, 10); if (dash) ctx.setLineDash([10, 7]); shape(ctx, rgba(col, 0.35), col, 2.5); ctx.restore(); }
// terugverwijskaartje naar een andere film
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 62, y + 24, C.text2, 'left', 14); text(ctx, s2, x + 62, y + 46, fTekst(24, 700), C.text, 'left'); ctx.restore(); }
// erwtenbloem (Mendel): vijf kroonbladen
function erwtBloem(ctx, x, y, r, col) { for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.55, y + Math.sin(an) * r * 0.55, r * 0.55, r * 0.38, an, 0, 6.283); shape(ctx, col, _dk3(col, 0.25), 1.5); } circ(ctx, x, y, r * 0.22, '#E8C860'); }
function mendelKaart(ctx, x, y, a = 1, kruisA = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 440, 250, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.8), 2);
  metaText(ctx, 'ERWTEN VAN MENDEL', x + 30, y + 44, C.text2, 'left', 20); erwtBloem(ctx, x + 120, y + 130, 46, '#9A6AC0'); erwtBloem(ctx, x + 290, y + 130, 46, '#EEE8DE');
  text(ctx, 'één gen: paars óf wit', x + 220, y + 222, fTekst(30, 700), C.text, 'center'); kruis(ctx, x + 400, y + 50, 22, kruisA); ctx.restore(); }

// ---------- het keuzebord JOUW STAMBOOM (groeit per hoofdstuk mee) ----------
// st: vader 'ki'|'stier'|'ster' (+ vA), moeders 0..3 (float = invullen), top 0..1 (kroon), kalf 0..1 (rij met streepjescode), fw 0..1 (fokwaarde bekend),
//     gen 0..1 (rij 'generaties' met sterren), divers 0..1 (verschillende stieren), glow ('m'|'v'|'k'|'g') = rij oplichten
function stamBord(ctx, x, y, s = 1, st = {}, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 370, rows = [['VADER', 'v'], ['MOEDERS', 'm']]; if ((st.kalf || 0) > 0.01) rows.push(['KALF · DNA-TEST', 'k']); if ((st.gen || 0) > 0.01) rows.push([st.divers > 0.5 ? 'STEEDS ANDERE VADERS' : 'STEEDS DEZELFDE VADER', 'g']);
  const h = 120 + rows.length * 112 - 6; roundRect(ctx, 0, 0, w, h, 18); shape(ctx, rgba('#0D1420', 0.86), rgba(C.goud, 0.8), 2.5);
  text(ctx, 'JOUW STAMBOOM', 28, 52, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', 28, 86, C.text2, 'left', 20);
  const vw = 76, gap = 14, slot = (bx, by, ww, vol, rand) => { roundRect(ctx, bx, by, ww, 58, 10); if (!vol) { ctx.setLineDash([7, 6]); shape(ctx, rgba(C.fill, 0.4), rgba(C.line, 0.8), 2); ctx.setLineDash([]); } else shape(ctx, rgba(C.fill, 0.55), rand || C.goud, 2.5); };
  let yy = 120; for (const [naam, k] of rows) { const ra = k === 'k' ? clamp(st.kalf, 0, 1) : k === 'g' ? clamp(st.gen, 0, 1) : 1; ctx.save(); ctx.globalAlpha *= ra;
    const gl = st.glow === k ? 0.5 + 0.5 * Math.sin((st.t || 0) * 6) : 0; if (gl > 0) { roundRect(ctx, 16, yy + 2, w - 32, 100, 12); ctx.fillStyle = rgba(C.goud, 0.12 + 0.12 * gl); ctx.fill(); }
    metaText(ctx, naam, 28, yy + 22, C.text2, 'left', 18); const by = yy + 34;
    if (k === 'v') { const v = st.vader, va = st.vA == null ? 1 : st.vA; slot(28, by, vw, false); if (v && va > 0.01) { ctx.save(); ctx.globalAlpha *= va; slot(28, by, vw, true);
        if (v === 'ki') rietje(ctx, 66, by + 29, 0.42, 1, -0.5, C.teal); else if (v === 'stier') { stierIcoon(ctx, 64, by + 50, 40, '#D8DEE6', 1); } else ster(ctx, 66, by + 29, 20);
        if (v === 'stier' && st.fw != null) { const f = clamp(st.fw, 0, 1); roundRect(ctx, 120, by + 6, 210, 46, 10); shape(ctx, f > 0.5 ? rgba(C.goud, 0.2) : rgba(C.fill, 0.5), f > 0.5 ? C.goud : C.line, 2); text(ctx, f > 0.5 ? 'fokwaarde ✓' : 'fokwaarde ?', 225, by + 38, fTekst(26, 700), f > 0.5 ? C.goud : C.text2, 'center'); }
        ctx.restore(); } }
    if (k === 'm') for (let i = 0; i < 3; i++) { const bx = 28 + i * (vw + gap), f = clamp((st.moeders || 0) - i, 0, 1); slot(bx, by, vw, false); if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; slot(bx, by, vw, true); koeIcoon(ctx, bx + 36, by + 50, 40, '#D8DEE6', 1, { bont: 2 + i }); ctx.restore(); }
      if (i === 0 && (st.top || 0) > 0.01) kroon(ctx, bx + 38, by - 4, 0.62, st.top); }
    if (k === 'k') { slot(28, by, 300, true, C.paars); koeIcoon(ctx, 70, by + 50, 34, '#D8DEE6', 1, { bont: 3 }); roundRect(ctx, 120, by + 10, 190, 38, 4); shape(ctx, '#F2EEE4', null); streepjescode(ctx, 128, by + 14, 174, 30, 7); }
    if (k === 'g') { const kl = [C.goud, C.teal, C.koraal, C.groen, '#9CCBE3', C.paars]; for (let i = 0; i < 3; i++) { const bx = 28 + i * (vw + gap); slot(bx, by, vw, true, rgba(C.line, 0.9)); const col = st.divers > 0.01 ? (i === 0 ? C.goud : kl[(i * 2 + 1) % kl.length]) : C.goud; ster(ctx, bx + 38, by + 29, 20, col); } }
    ctx.restore(); yy += 112; }
  ctx.restore(); }
const BORD_HOOG = (n) => 120 + n * 112 - 6;

// ---------- weegschaal (fokdoel) ----------
function weegschaalLb3(ctx, x, y, kant, a, links, rechts) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = kant * 0.16, L = 340;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x - 70, y + 250); ctx.lineTo(x + 70, y + 250); ctx.closePath(); ctx.fill(); roundRect(ctx, x - 140, y + 244, 280, 22, 8); shape(ctx, '#4A5468', null);
  // kant < 0: links zwaarder (links omlaag); kant > 0: rechts zwaarder
  const lx = x - Math.cos(an) * L, ly = y - Math.sin(an) * L, rx = x + Math.cos(an) * L, ry = y + Math.sin(an) * L;
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke(); circ(ctx, x, y, 14, C.goud);
  const pan = (px, py, lab) => { ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 110, py + 110); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 112, 140, 22, 0, 0, Math.PI); shape(ctx, '#8FA0B5', null); lab(px, py + 90); };
  pan(lx, ly, links); pan(rx, ry, rechts); ctx.restore(); }

// ---------- tablet met paringsprogramma, stap voor stap ----------
function tabletLb3(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 26); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, x + 22, y + 22, w - 44, h - 44, 10); shape(ctx, '#0F1622', null);
  metaText(ctx, 'PARINGSPROGRAMMA: TE VEEL FAMILIE → UIT', x + 46, y + 70, C.text2, 'left', 18);
  const kw = (w - 44 - 60) / 2, kh = h - 44 - 150, ky = y + 92, k1 = o.k1 || 0, k2 = o.k2 || 0;
  stierKaart(ctx, x + 44, ky, kw, kh, { donker: 1, code: 11, rand: k1 > 0.5 ? C.koraal : C.line }); text(ctx, 'MELK ↑↑', x + 44 + kw / 2, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaA(ctx, 'FAMILIE VAN DEZE KOE', x + 44 + kw / 2, ky + kh * 0.88, k1, C.koraal, 'center', 16);
  stierKaart(ctx, x + 44 + kw + 16, ky, kw, kh, { donker: 1, code: 23, rand: k2 > 0.5 ? C.goud : C.line }); text(ctx, 'MELK ↑', x + 60 + kw * 1.5, ky + kh * 0.74, fTekst(30, 800), C.text, 'center'); metaA(ctx, 'GEEN FAMILIE', x + 60 + kw * 1.5, ky + kh * 0.88, k2, C.goud, 'center', 16);
  const sp = o.streep || 0; if (sp > 0.01) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 54, ky + kh - 14); ctx.lineTo(lerp(x + 54, x + 34 + kw, sp), lerp(ky + kh - 14, ky + 14, sp)); ctx.stroke(); }
  if ((o.kies || 0) > 0.01) vink_(ctx, x + 60 + kw * 1.5 + kw * 0.36, ky + 34, 18, o.kies, C.goud);
  metaA(ctx, 'KALF: MINDER VAAK TWEE DEZELFDE ALLELEN', x + w / 2, y + h - 52, o.reden || 0, C.goud, 'center', 18);
  ctx.restore(); }

// ---------- stamboom (H4): coördinaten zoals keyframe d8, 60 px omlaag ----------
const SB = (() => { const p = (x, y) => [x, 270 + (y - 170) * 0.92]; return { r: 34, S: p(760, 170), zA: p(520, 340), zAp: p(360, 340), dB: p(1000, 340), dBp: p(1160, 340), kA: p(440, 510), kAp: p(250, 510), kB: p(1080, 510), kBp: p(1250, 510), kalf: p(760, 690), dr: p(250, 690) }; })();
function _sbPaar(ctx, a, b, col, lw, al) { const r = SB.r; lijn(ctx, [[a[0] + (a[0] < b[0] ? r : -r), a[1]], [b[0] + (a[0] < b[0] ? -r : r), b[1]]], col, lw, al); }
function _sbKind(ctx, a, b, c, col, lw, al) { const mx = (a[0] + b[0]) / 2; lijn(ctx, [[mx, a[1]], [mx, a[1] + 70], [c[0], a[1] + 70], [c[0], c[1] - SB.r]], col, lw, al); }
// u: s = topstier, z = zoon/dochter, p = partners, k = kleinkinderen, kp = paar kleinkinderen + kalf, dr = drager, koraal = kalf koraal
function stamboom(ctx, u, t = 0) { const { r, S, zA, zAp, dB, dBp, kA, kAp, kB, kBp, kalf, dr } = SB, G = C.goud, L = C.line;
  const z = u.z || 0, p = u.p || 0, k = u.k || 0, kp = u.kp || 0;
  if (z > 0.01) { lijn(ctx, [[S[0], S[1] + r], [S[0], S[1] + 70], [zA[0], S[1] + 70], [zA[0], zA[1] - r]], G, 6, z); lijn(ctx, [[S[0], S[1] + 70], [dB[0], S[1] + 70], [dB[0], dB[1] - r]], G, 6, z); }
  _sbPaar(ctx, zAp, zA, L, 3, p); _sbPaar(ctx, dB, dBp, L, 3, p);
  if (k > 0.01) { _sbKind(ctx, zAp, zA, kA, G, 6, k); _sbKind(ctx, dB, dBp, kB, G, 6, k); _sbPaar(ctx, kAp, kA, L, 3, (u.dr || 0)); }
  if (kp > 0.01) { _sbPaar(ctx, kA, kB, G, 4, kp); _sbKind(ctx, kA, kB, kalf, G, 6, kp); }
  if ((u.dr || 0) > 0.01) _sbKind(ctx, kAp, kA, dr, L, 3, u.dr);
  knoop(ctx, ...S, r + 6, true, { rand: G, lw: 4, a: u.s }); ster(ctx, S[0], S[1], 24, G, u.s); naamBij(ctx, 'topstier', 'JOUW KALF VAN TOEN', S[0] + 52, S[1] + 10, u.s, 'left', G);
  knoop(ctx, ...zA, r, true, { rand: G, a: z }); knoop(ctx, ...dB, r, false, { rand: G, a: z }); knoop(ctx, ...zAp, r, false, { a: p }); knoop(ctx, ...dBp, r, true, { a: p });
  metaA(ctx, 'VADERKANT', 300, S[1] + 76, p, C.text2, 'left', 20); metaA(ctx, 'MOEDERKANT', 1180, S[1] + 76, p, C.text2, 'left', 20);
  knoop(ctx, ...kA, r, true, { rand: G, a: k }); knoop(ctx, ...kB, r, false, { rand: G, a: k }); knoop(ctx, ...kAp, r, false, { a: (u.dr || 0) });
  naamBij(ctx, 'kleinzoon', '', kA[0] + 10, kA[1] + 76, u.kl || 0, 'center'); naamBij(ctx, 'kleindochter', '', kB[0], kB[1] + 76, u.kl || 0, 'center');
  const ko = u.koraal || 0; knoop(ctx, ...kalf, r, false, { vul: rgba(C.koraal, 0.35 * ko), rand: ko > 0.5 ? C.koraal : C.text, lw: ko > 0.5 ? 4 : 3, a: kp }); naamBij(ctx, 'kalf', '', kalf[0], kalf[1] + 80, kp, 'center', ko > 0.5 ? C.koraal : C.text);
  knoop(ctx, ...dr, r, false, { vul: rgba(C.koraal, 0.12), rand: C.text, a: u.dr || 0 }); naamBij(ctx, 'drager', '', dr[0], dr[1] + 80, u.dr || 0, 'center'); }
function bordKader(ctx, a = 1, kopA = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 130, 190, 1210, 675, 22); shape(ctx, rgba('#0D1420', 0.55), rgba(C.goud, 0.8), 2.5);
  ctx.globalAlpha *= kopA; text(ctx, 'JOUW STAMBOOM', 160, 240, fTekst(34, 800), C.goud, 'left'); metaText(ctx, 'JIJ = DE FOKKER', 160, 272, C.text2, 'left', 20); ctx.restore(); }
// punt langs een polylijn (u = 0..1)
function langs(pts, u) { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
  let d = clamp(u, 0, 1) * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const f = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= seg[i]; } return pts[pts.length - 1]; }
function rAllel(ctx, x, y, a = 1, lab = 'r') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 15, 40, 30, 8); shape(ctx, lab === 'r' ? C.koraal : '#9CCBE3', _dk3(C.koraal, 0.2), 2); text(ctx, lab, x, y + 9, fTekst(26, 800), '#1A1410', 'center'); ctx.restore(); }

// ---------- kleine iconen voor de recap (kas, bodem, stal) ----------
function icoonKas(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 40); ctx.lineTo(-60, -10); ctx.lineTo(0, -50); ctx.lineTo(60, -10); ctx.lineTo(60, 40); ctx.closePath(); shape(ctx, rgba('#9CCBE3', 0.15), '#AFC0D0', 3);
  ctx.strokeStyle = rgba('#AFC0D0', 0.6); ctx.lineWidth = 2; for (const px of [-30, 0, 30]) { ctx.beginPath(); ctx.moveTo(px, 40); ctx.lineTo(px, px === 0 ? -50 : -30); ctx.stroke(); }
  ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(-14, 0); ctx.stroke(); circ(ctx, -6, 8, 7, '#D0503C'); circ(ctx, -22, 20, 6, '#D0503C'); ctx.restore(); }
function icoonBodem(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -40, 120, 80, 8); ctx.fillStyle = '#6A5034'; ctx.fill(); ctx.fillStyle = '#8A6A44'; ctx.fillRect(-60, -40, 120, 26); ctx.fillStyle = C.groen; for (let i = 0; i < 6; i++) ctx.fillRect(-52 + i * 20, -52, 4, 14);
  ctx.strokeStyle = '#D89A8A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 14); ctx.quadraticCurveTo(-6, 0, 10, 18); ctx.quadraticCurveTo(24, 30, 36, 16); ctx.stroke(); ctx.restore(); }
function icoonStal(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-64, 40); ctx.lineTo(-64, -8); ctx.lineTo(0, -50); ctx.lineTo(64, -8); ctx.lineTo(64, 40); ctx.closePath(); shape(ctx, rgba('#C8463C', 0.25), '#AFC0D0', 3);
  koeIcoon(ctx, 2, 38, 44, '#E8E2D8', 1, { bont: 2 }); ctx.restore(); }
function eindKaart(ctx, x, y, w, h, kop, sub, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(C.goud, 0.8), 2); teken(x + w / 2, y + 66);
  text(ctx, kop, x + w / 2, y + h - 52, fTekst(30, 700), C.text, 'center'); text(ctx, sub, x + w / 2, y + h - 18, fTekst(30, 700), C.goud, 'center'); ctx.restore(); }

// melkstaven uit de cold open: 1 px = 19 kg (4242 kg in 1970, 9935 kg nu)
function melkStaven(ctx, x0, x1, yb, bw, k, o = {}) { const h0 = 4242 * k, h1 = 9935 * k;
  groeiStaaf(ctx, x0, yb, bw, h0, C.text2, o.u0 == null ? 1 : o.u0); groeiStaaf(ctx, x1, yb, bw, h0, C.text2, o.u1 == null ? 1 : o.u1);
  const ex = o.ex || 0, v = o.voer || 0, f = o.fok || 0, eh = h1 - h0; if (ex > 0.01) { ctx.save(); ctx.globalAlpha *= ex * (1 - Math.max(v, f) * 0.9); roundRect(ctx, x1 - bw / 2, yb - h0 - eh * ex, bw, eh * ex, 10); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.goud, 0.28), C.goud, 3); ctx.setLineDash([]); ctx.restore(); }
  if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x1 - bw / 2, yb - h0 - eh / 2, bw, eh / 2, 6); shape(ctx, rgba(C.oker, 0.55), C.oker, 3); ctx.restore(); }
  if (f > 0.01) { ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, x1 - bw / 2, yb - h1, bw, eh / 2, 10); shape(ctx, rgba(C.paars, 0.6), (o.fokGoud || 0) > 0.5 ? C.goud : C.paars, (o.fokGoud || 0) > 0.5 ? 5 : 3); ctx.restore(); }
  return { h0, h1, eh }; }

Object.assign(SCENES, {
  title(ctx, t) { gras(ctx, 850); rund(ctx, 'holstein', 1560, 850, 1.55, { kijk: -1, t });
    const r = 24; lijn(ctx, [[1100, 640], [1100, 690], [1300, 690], [1300, 640]], C.goud, 4); lijn(ctx, [[1200, 690], [1200, 750]], C.goud, 4);
    knoop(ctx, 1100, 612, r, true, { rand: C.goud, lw: 4 }); ster(ctx, 1100, 612, 16); knoop(ctx, 1300, 612, r, false, { rand: C.goud, lw: 4 }); kroon(ctx, 1300, 574, 0.55); knoop(ctx, 1200, 776, r, false, { rand: C.goud, lw: 4 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { decor(ctx, 'stal', 0.6); const P = 1.3;
    [170, 400, 630].forEach((x, i) => rund(ctx, 'holstein', x, GROND, P, { kijk: 1, houding: i === 1 ? 'grazen' : 'staan', t }));
    const hY = 165 * P, v = gangSnelheid('yasmin', hY, 'loop'), x0 = 880, tw = Math.min(2.4, 60 / Math.max(v, 1)), xe = x0 - v * tw;
    if (t < tw) persoon(ctx, 'yasmin', x0, GROND + 6, hY, { zij: true, kijk: -1, gang: 'loop', t, vooruit: true, outfit: 'stal', uit: 'blij' });
    else persoon(ctx, 'yasmin', xe, GROND + 6, hY, { kijk: -1, outfit: 'stal', uit: q.on('Hoeveel', 1) > 0.5 ? 'verbaasd' : 'blij', pose: q.on('Hoeveel', 1) > 0.5 ? 'denk' : 'staan', t });
    const yb = 800, k = 1 / 19, x0b = 1030, x1b = 1200, bw = 120, Z = q.on('zeventig', 1, 0.5), T = q.on('tienduizend', 1, 0.6); roundRect(ctx, 900, 180, 560, 690, 20); shape(ctx, rgba('#0D1420', 0.72 * Z), null);
    const r = melkStaven(ctx, x0b, x1b, yb, bw, k, { u0: Z, u1: T, ex: T });
    naamBij(ctx, 'ruim 4000 kg', '1970', x0b, yb - r.h0 - 50, Z, 'center'); naamBij(ctx, 'bijna 10.000 kg', '2026', x1b, yb - r.h1 - 50, T, 'center');
    naamBij(ctx, 'extra melk', 'RUIM TWEE KEER', x1b + bw / 2 + 16, yb - r.h0 - r.eh / 2 + 12, q.on('twee', 1), 'left', C.goud);
    metaA(ctx, 'MELK PER KOE PER JAAR', 1180, 846, Z, C.text2, 'center', 22);
    const B = q.on('fokken', 1, 0.8); stamBord(ctx, lerp(1960, 1520, ease(B)), 100, 0.85, {}, B);
    vraagteken(ctx, 1640, 560, q.on('denk', 1), 100); },

  // ---------- H1 Kunstmatige selectie ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: ongeveer de helft door fokken', 1 - q.on('Vandaag', 1));
    const yb = 800, k = 1 / 18, x0 = 560, x1 = 780, bw = 150, V = q.on('voer', 1), F = q.on('fokken', 1), J = q.on('Vandaag', 1);
    const r = melkStaven(ctx, x0, x1, yb, bw, k, { ex: 1, voer: V, fok: F, fokGoud: J });
    text(ctx, '1970', x0, yb + 44, fTekst(30, 700), C.text2, 'center'); text(ctx, 'nu', x1, yb + 44, fTekst(30, 700), C.text2, 'center');
    naamBij(ctx, 'voer en verzorging', '', x1 + bw / 2 + 24, yb - r.h0 - r.eh / 4 + 10, V, 'left', C.oker); naamBij(ctx, 'fokken', '≈ DE HELFT', x1 + bw / 2 + 24, yb - r.h1 + r.eh / 4 + 4, F, 'left', C.paars);
    metaA(ctx, 'SCHATTING · VS, CANADA, VK', x1 + bw / 2 + 24, yb - r.h1 - 26, q.on('Volgens', 1) * (1 - J), C.text2, 'left', 22);
    stamBord(ctx, 1400, 230, 1.15, { glow: J > 0.5 ? 'm' : null, t }, J); pijl(ctx, x1 + bw / 2 + 210, yb - r.h1 + r.eh / 4 - 10, 1380, 330, C.goud, J * q.on('deel', 1), 4, 18);
    tag(ctx, 'dat deel doe jij', 1613, 700, C.goud, q.on('deel', 1), 'center', 32); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('moeder', 1), V = q.on('vader', 1), S = q.on('kunstmatige', 1);
    const ring = (x, y, w, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w, w * 0.16, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); };
    [200, 470, 740].forEach((x, i) => { ring(x - 10, 470, 120, M); rund(ctx, 'holstein', x, 470, 0.72, { kijk: 1, t }); });
    ring(450, 800, 140, V); rund(ctx, 'stier', 460, 800, 0.8, { kijk: 1, t });
    naamBij(ctx, 'moeders', '', 470, 250, M, 'center', C.goud); naamBij(ctx, 'vader', '', 460, 610, V, 'center', C.goud);
    stamBord(ctx, 1160, 140, 1.3, { glow: V > 0.5 ? 'v' : (M > 0.5 ? 'm' : null), t }, 1);
    regel(ctx, 'kunstmatige selectie', 1400, 700, S, C.goud, 56, 'center', 800); metaA(ctx, 'DE MENS KIEST DE OUDERS', 1400, 760, S, C.text2, 'center', 24); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const g = 850, P = 1.75; gras(ctx, g); const D = q.on('Toen', 1, 0.6);
    rund(ctx, 'holstein', 1420, g, P, { kijk: -1, t });
    persoon(ctx, 'henk', 330, g, 172 * P, { t, kijk: 1, pose: D > 0.5 ? 'denk' : 'staan', uit: 'blij' }); persoon(ctx, 'yasmin', 640, g, 165 * P, { t, kijk: -1, outfit: 'stal', uit: 'blij' });
    hek(ctx, 100, 900, g - 4, 150);
    denkwolk(ctx, 70, 70, 800, 380, 330, g - 172 * P * 1.02, D); laag(ctx, D, () => { rund(ctx, 'dubbel', 470, 380, 1.3, { kijk: 1, t }); });
    metaA(ctx, 'MELK ÉN VLEES', 470, 140, q.on('melk', 1), C.text, 'center', 26); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const tI = q.at('inseminator', 1), tB = q.at('Bijna', 1);
    const A = 1 - ramp(t, tI - 0.4, 0.5), B = ramp(t, tI - 0.4, 0.5) * (1 - ramp(t, tB - 0.3, 0.5)), Cc = ramp(t, tB - 0.3, 0.5);
    laag(ctx, A, () => { vloer(ctx, 840); rund(ctx, 'stier', 560, 840, 1.35, { kijk: 1, t }); naamBij(ctx, 'stier', 'DEKT ZELF', 560, 590, 1, 'center');
      const T = q.on('tientallen', 1, 0.8); for (let i = 0; i < 30; i++) koeIcoon(ctx, 1100 + (i % 10) * 70, 420 + Math.floor(i / 10) * 90, 50, rgba(C.text2, 0.85), clamp(T * 30 - i, 0, 1), { bont: 1 + (i % 5) });
      metaA(ctx, 'HOOGUIT TIENTALLEN KOEIEN PER JAAR', 1415, 360, T, C.text2, 'center', 22); });
    laag(ctx, B, () => { const g = 840, P = 1.75; vloer(ctx, g);
      // inseminator vlak achter de koe; het pistool verdwijnt bij de staartaanzet (de koe wordt erna getekend)
      const id = 'inseminator', hh = 175 * P, ix = 300; persoon(ctx, id, ix, g, hh, { kijk: 1, pose: 'vasthouden', uit: 'neutraal', t });
      const hd = kiHandschoen(ctx, id, ix, g, hh, 'vasthouden', 1), tx = 500, ty = 640, an = Math.atan2(ty - hd.y, tx - hd.x); kiPistool(ctx, hd.x - 6, hd.y, an, Math.hypot(tx - hd.x, ty - hd.y) + 40);
      rund(ctx, 'holstein', 640, g, P, { kijk: 1, t });
      naamBij(ctx, 'kunstmatige inseminatie', 'ZONDER STIER', 560, 300, q.on('kunstmatige', 1), 'center');
      stikstofVat(ctx, 1080, g, 0.95, q.on('ingevroren', 1), t);
      const kx = 1330, ky = 560, Hn = q.on('honderden', 1, 1.2), Tn = q.on('tienduizenden', 1, 1.5);
      laag(ctx, q.on('afnemen', 1), () => { roundRect(ctx, kx - 50, ky - 34, 100, 68, 10); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 5; i++) rietje(ctx, kx - 34 + i * 17, ky - 6, 0.3, 1, Math.PI / 2, [C.teal, C.goud, C.koraal][i % 3]); });
      for (let r = 0; r < 7; r++) { const ra = r < 3 ? clamp(Hn * 3 - r, 0, 1) : clamp(Tn * 4 - (r - 3), 0, 1); if (ra <= 0.01) continue; const R = 120 + r * 70, m = 7 + r * 4;
        for (let j = 0; j < m; j++) { const an = -0.95 + j / (m - 1) * 1.9; const px = kx + Math.cos(an) * R, py = ky + Math.sin(an) * R * 0.78; if (px > 1850 || py < 150 || py > 830) continue; koeIcoon(ctx, px, py + 14, 26 + r * 1.2, rgba(C.text2, 0.85 - r * 0.07), ra, { bont: 1 + (j % 5) }); } }
      naamBij(ctx, 'één keer afnemen', 'HONDERDEN KOEIEN', kx + 30, ky - 80, q.on('afnemen', 1) * (1 - Tn), 'right');
      naamBij(ctx, 'tienduizenden koeien', 'ÉÉN STIER', kx + 30, ky - 80, Tn, 'right', C.goud); });
    laag(ctx, Cc, () => { const tB2 = q.at('Bijna', 1); for (let i = 0; i < 8; i++) rund(ctx, 'holstein', 230 + i * 205, 360, 0.55, { kijk: 1, t, a: ramp(t, tB2 + i * 0.12, 0.4) });
      tag(ctx, 'bijna elke melkkoe: kunstmatige inseminatie', 960, 150, C.goud, q.on('drachtig', 1), 'center', 32); metaA(ctx, 'BIJNA ALLE MELKKOEIEN: HOLSTEIN', 960, 410, q.on('Holsteins', 1), C.text2, 'center', 22);
      const g = 830, P = 1.3, Hs = q.on('Holsteins', 1); vloer(ctx, g); laag(ctx, Hs, () => { rund(ctx, 'dubbel', 470, g, P, { kijk: 1, t }); naamBij(ctx, 'vroeger', 'MELK ÉN VLEES', 470, 600, 1, 'center', C.text2);
        rund(ctx, 'holstein', 1080, g, P, { kijk: -1, t }); naamBij(ctx, 'nu: Holstein', 'GEFOKT OP MELK', 1080, 580, 1, 'center'); });
      laag(ctx, q.on('Amerikaanse', 1), () => { roundRect(ctx, 1360, 660, 330, 96, 14); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); rietje(ctx, 1495, 708, 1.25, 1, 0, C.teal); vlagVS(ctx, 1592, 684, 70); metaText(ctx, 'SPERMA VAN AMERIKAANSE STIEREN', 1525, 640, C.text2, 'center', 20); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const melk = [0.45, 0.9, 0.55, 0.8, 0.35, 0.95], top = [1, 3, 5], K = q.on('meeste', 1, 1.2);
    melk.forEach((m, i) => { const x = 230 + i * 200, g = 440, gek = top.includes(i); if (gek && K > 0.01) { ctx.save(); ctx.globalAlpha *= K; ctx.beginPath(); ctx.ellipse(x + 10, g, 100, 16, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
      groeiStaaf(ctx, x - 90, g, 22, 30 + m * 130, gek && K > 0.5 ? C.goud : C.text2, 1); rund(ctx, 'holstein', x + 14, g, 0.58, { kijk: 1, t, houding: i % 3 === 1 ? 'grazen' : 'staan' }); });
    metaA(ctx, 'MELK PER KOE', 140, 200, 1, C.text2, 'left', 22);
    stamBord(ctx, 1480, 100, 1, { vader: 'ki', moeders: K * 3, glow: K > 0.01 && K < 1 ? 'm' : null, t }, 1);
    const D = q.on('dochters', 1, 0.6); for (let i = 0; i < 9; i++) { const x = 230 + i * 115; laag(ctx, clamp(D * 9 - i, 0, 1), () => { koeIcoon(ctx, x, 800, 54, rgba(C.line, 0.9), 1); roundRect(ctx, x - 13, 600, 26, 120, 8); ctx.setLineDash([7, 6]); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.setLineDash([]); text(ctx, '?', x, 676, fTekst(30, 700), C.text2, 'center'); }); }
    naamBij(ctx, 'hun dochters', 'OP EEN RIJ', 230 - 40, 560, D, 'left'); pijl(ctx, 600, 560, 1150, 560, C.line, q.on('weinig', 1), 3, 14); metaA(ctx, 'WEINIG → VEEL MELK', 1150, 540, q.on('weinig', 1), C.text2, 'right', 20);
    mendelKaart(ctx, 1380, 560, q.on('erwten', 1));
    vraagteken(ctx, 1280, 700, q.on('denk', 1), 100); },

  // ---------- H2 Fokwaarde en erfelijkheidsgraad ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een vloeiende reeks', 1 - q.on('hangt', 1)); const R = q.on('vloeiende', 1, 1.5);
    for (let i = 0; i < 9; i++) { const x = 230 + i * 115, m = 0.15 + i * 0.1 + (hash(i * 3.1) - 0.5) * 0.04; koeIcoon(ctx, x, 800, 54, rgba(C.line, 0.9), 1, { bont: R > 0.5 ? 2 + (i % 4) : 0 });
      roundRect(ctx, x - 13, 600, 26, 120, 8); ctx.setLineDash([7, 6]); shape(ctx, null, rgba(C.line, 0.5 * (1 - R)), 2); ctx.setLineDash([]); groeiStaaf(ctx, x, 720, 26, 40 + m * 160, C.goud, clamp(R * 9 - i * 0.8, 0, 1)); }
    naamBij(ctx, 'een vloeiende reeks', 'VAN WAT MINDER TOT WAT MEER', 1180, 650, R, 'left', C.goud);
    mendelKaart(ctx, 1380, 250, 1 - q.on('genen', 1), q.on('geen', 1)); tag(ctx, 'geen melkgen', 1600, 560, C.koraal, q.on('geen', 1) * (1 - q.on('genen', 1)), 'center', 30);
    const G = q.on('genen', 1, 0.8); laag(ctx, G, () => { roundRect(ctx, 1200, 150, 640, 400, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromAllelen(ctx, 1330, 310, 260, 3, { breed: 44, n: 15 }); chromAllelen(ctx, 1420, 310, 260, 8, { breed: 44, n: 15 });
      naamBij(ctx, 'heel veel genen', 'KLEIN EFFECT', 1490, 300, q.on('effect', 1), 'left', C.paars); filmKaartje(ctx, 1240, 470, 'Voorbij dominant en recessief', q.on('lengte', 1), 420); });
    tag(ctx, '+ omgeving: voer, verzorging', 1500, 790, C.oker, q.on('omgeving', 1), 'center', 30); vereenvoudigd(ctx, G); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const g = 760, P = 1.45; rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
    naamBij(ctx, 'topkoe', '', 420, rundTop('holstein', g, P) - 80, 1, 'center', C.goud);
    groeiStaaf(ctx, 860, g, 70, 500, C.goud, 1); stippel(ctx, 640, g - 300, 1720, g - 300, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 800, g - 316, 1, C.text2, 'right', 20);
    const D = q.on('dochters', 1, 0.8); [1200, 1400, 1600].forEach((x, i) => { laag(ctx, clamp(D * 3 - i, 0, 1), () => { koeIcoon(ctx, x - 60, g, 70, rgba(C.line, 0.9), 1); roundRect(ctx, x + 10, g - 380, 44, 380, 10); ctx.setLineDash([8, 6]); shape(ctx, null, rgba(C.line, 0.8), 2); ctx.setLineDash([]); text(ctx, '?', x + 32, g - 400, fTekst(34, 700), C.text2, 'center'); }); });
    naamBij(ctx, 'haar dochters', '', 1400, g + 50, D, 'center');
    stamBord(ctx, 1500, 70, 0.8, { vader: 'ki', moeders: 3, top: 1, glow: 'm', t }, 1 - q.on('Hoeveel', 1, 0.4));
    vraagteken(ctx, 1080, 300, q.on('denk', 1), 100); },

  s13(ctx, t, q) { const tB = q.at('moeder', 2) - 0.3, tC = q.at('melk', 1) - 0.4; const A = 1 - ramp(t, tB, 0.5), B = ramp(t, tB, 0.5) * (1 - ramp(t, tC, 0.5)), Cc = ramp(t, tC, 0.5);
    bg(ctx, B > 0.5 ? 'schema' : 'schema'); const g = 760, P = 1.45;
    laag(ctx, A, () => { antwoord(ctx, 'antwoord c: minder dan zij, maar meer dan gemiddeld', 1); rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
      groeiStaaf(ctx, 860, g, 70, 500, C.goud, 1); stippel(ctx, 640, g - 300, 1720, g - 300, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 800, g - 316, 1, C.text2, 'right', 20);
      const F = q.on('meer', 1, 1.2); [[1200, 400], [1400, 370], [1600, 430]].forEach(([x, h], i) => { koeIcoon(ctx, x - 60, g, 70, '#D8DEE6', 1, { bont: 2 + i }); groeiStaaf(ctx, x + 32, g, 44, h, C.goud, clamp(F * 1.4 - i * 0.15, 0, 1)); });
      tag(ctx, 'meer dan gemiddeld, minder dan moeder', 1400, 820, C.goud, q.on('minder', 1), 'center', 30); });
    laag(ctx, B, () => { roundRect(ctx, 80, 90, 900, 760, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); metaText(ctx, 'TOPKOE', 120, 140, C.text2, 'left', 22);
      chromAllelen(ctx, 280, 420, 440, 3, { breed: 56 }); chromAllelen(ctx, 380, 420, 440, 8, { breed: 56, a: 0.45 + 0.55 * (1 - q.on('helft', 1, 0.5)) });
      naamBij(ctx, 'chromosomenpaar', 'ALLELEN · KLEIN EFFECT', 330, 700, 1, 'center');
      const E = q.on('helft', 1, 0.6); circ(ctx, 780, 420, 150, rgba('#F6EEDC', 0.08 * E), rgba('#F6EEDC', 0.8 * E), 3); circ(ctx, 780, 420, 136, null, rgba('#F6EEDC', 0.35 * E), 1.5); naamBij(ctx, 'eicel', '', 780, 620, E, 'center');
      const u = ease(q.on('door', 1, 1.2)); if (u > 0.01) chromAllelen(ctx, lerp(380, 780, u), 420, lerp(440, 210, u), 8, { breed: lerp(56, 30, u), n: u > 0.5 ? 9 : 13 });
      pijl(ctx, 450, 420, 610, 420, C.paars, E * (1 - u), 5, 20);
      metaA(ctx, 'DE ANDERE HELFT: VAN DE VADER', 530, 770, q.on('vader', 1) * (1 - q.on('toeval', 1)), C.text2, 'center', 22);
      metaA(ctx, 'VAN ELK PAAR ÉÉN · WELKE: TOEVAL', 530, 800, q.on('toeval', 1), C.paars, 'center', 24);
      const Y = q.on('Yasmin', 1, 0.3), gg = 850, PP = 2.05; laag(ctx, Y, () => { persoon(ctx, 'yasmin', 1330, gg, 165 * PP, { t, kijk: 1, uit: 'blij', pose: 'staan' }); persoon(ctx, 'bilal', 1560, gg, 165 * PP, { t, kijk: -1, uit: 'lacht', pose: 'handenHeup' }); metaText(ctx, 'ZELFDE OUDERS', 1445, 440, C.text2, 'center', 26); }); });
    laag(ctx, Cc, () => { rund(ctx, 'holstein', 470, g, P, { kijk: 1, t }); kroon(ctx, 420, rundTop('holstein', g, P) - 40, 1);
      const yA = g - 300, yT = g - 500, sp = q.on('voer', 1, 0.8), xb = 860, bw = 70; stippel(ctx, 780, yA, 1500, yA, C.line, 1); metaA(ctx, 'GEMIDDELDE KOE', 1500, yA + 34, 1, C.text2, 'right', 20);
      roundRect(ctx, xb - bw / 2, yA, bw, 300, 10); shape(ctx, rgba(C.goud, 0.35), C.goud, 2.5);
      const ym = lerp(yT, yA - 120, sp); roundRect(ctx, xb - bw / 2, yT, bw, ym - yT + (sp > 0.01 ? 0 : 200), 10); shape(ctx, rgba(sp > 0.5 ? C.oker : C.goud, 0.45), sp > 0.5 ? C.oker : C.goud, 2.5);
      if (sp > 0.01) { roundRect(ctx, xb - bw / 2, ym, bw, yA - ym, 6); shape(ctx, rgba(C.paars, 0.6 * sp), C.paars, 2.5); naamBij(ctx, 'aanleg', 'ERFT GEMIDDELD VOOR DE HELFT', xb + 60, ym + 56, sp, 'left', C.paars); naamBij(ctx, 'goed voer, geluk', 'VOORSPRONG · VEREENVOUDIGD', xb + 60, yT + 30, sp, 'left', C.oker); }
      const X = q.on('erft', 1); kruis(ctx, xb, (yT + ym) / 2, 26, X); tag(ctx, 'erft niet', 1560, yT + 20, C.koraal, X, 'center', 30); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); const P = 0.8, Gr = q.on('groep', 1), E1 = q.on('één', 1);
    for (let i = 0; i < 12; i++) { const rij = Math.floor(i / 6), x = 250 + (i % 6) * 270 + rij * 60, g = 300 + rij * 230; const m = 0.35 + 0.65 * hash(i * 4.7 + 2);
      groeiStaaf(ctx, x - 108, g, 26, 40 + m * 110, C.goud, 1, 0.9); rund(ctx, 'holstein', x + 20, g, P, { kijk: 1, t, houding: i % 4 === 2 ? 'grazen' : 'staan' }); }
    laag(ctx, Gr, () => { roundRect(ctx, 110, 130, 1700, 430, 24); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([12, 9]); ctx.stroke(); ctx.setLineDash([]); });
    laag(ctx, E1, () => { circ(ctx, 1080, 240, 105, null, C.koraal, 4); kruis(ctx, 1165, 155, 20, 1); });
    const xa = 260, xb = 1660, yb = 700, X = (v) => xa + (xb - xa) * v, S = q.on('erfelijkheidsgraad', 1);
    laag(ctx, S, () => { roundRect(ctx, xa, yb - 10, xb - xa, 20, 10); shape(ctx, rgba(C.fill, 0.9), C.line, 2); for (let v = 0; v <= 10; v++) { ctx.fillStyle = C.line; ctx.fillRect(X(v / 10) - 1.5, yb + 12, 3, v % 5 ? 10 : 18); }
      text(ctx, '0', X(0), yb + 58, fTekst(32, 700), C.text2, 'center'); text(ctx, '1', X(1), yb + 58, fTekst(32, 700), C.text2, 'center'); naamBij(ctx, 'erfelijkheidsgraad (h²)', '', xa, yb - 36, 1, 'left'); });
    const Mk = q.on('derde', 1); laag(ctx, Mk, () => { roundRect(ctx, X(1 / 3), yb - 16, X(0.5) - X(1 / 3), 32, 10); shape(ctx, rgba(C.paars, 0.7), C.paars, 2.5); naamBij(ctx, 'MELK', '⅓ TOT ½', X(0.415), yb - 66, 1, 'center'); });
    const Vr = q.on('vruchtbaarheid', 1); laag(ctx, Vr, () => { roundRect(ctx, X(0.01), yb - 16, X(0.09) - X(0.01), 32, 8); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2.5); naamBij(ctx, 'VRUCHTBAARHEID', 'VAAK < 0,1', X(0.06), yb + 96, 1, 'left'); });
    metaA(ctx, 'VERSCHILLEN IN EEN GROEP, NIET IN ÉÉN KOE', 1660, 850, Gr, C.text2, 'right', 22); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const W1 = q.on('Welke', 1, 0.6), F1 = q.on('fokwaarde', 1), St = q.on('stier', 1), Hk = q.on('Opa', 1, 0.3);
    const fwBox = (x, y, a) => laag(ctx, a, () => { roundRect(ctx, x - 130, y, 260, 70, 12); shape(ctx, rgba(C.fill, 0.6), C.goud, 2.5); text(ctx, 'fokwaarde ?', x, y + 46, fTekst(32, 700), C.goud, 'center'); metaText(ctx, 'SCHATTING', x, y + 100, C.text2, 'center', 20); });
    laag(ctx, 1 - W1, () => { const g = 620, P = 1.2; rund(ctx, 'holstein', 380, g, P, { kijk: 1, t }); kroon(ctx, 340, rundTop('holstein', g, P) - 34, 0.8); fwBox(380, 670, F1);
      laag(ctx, St, () => { rund(ctx, 'stier', 900, g, P, { kijk: 1, t }); fwBox(900, 670, 1); }); });
    laag(ctx, Hk, () => persoon(ctx, 'henk', 1500, 620, 172 * 1.2, { t, kijk: -1, pose: 'denk', uit: 'verbaasd' }));
    laag(ctx, W1, () => { const y = 200, w = 360, h = 300; [140, 540, 940].forEach((x, i) => laag(ctx, clamp(W1 * 3 - i * 0.6, 0, 1), () => {
      if (i === 0) stierKaart(ctx, x, y, w, h, { donker: 1, dochters: 6, melk: 0.85 });
      else if (i === 1) { stierKaart(ctx, x, y, w, h, { donker: 1 }); metaText(ctx, 'GEEFT GEEN MELK', x + w / 2, y + h - 30, C.text2, 'center', 20); }
      else { stierKaart(ctx, x, y, w, h, { donker: 1, geenStier: 1 }); ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); rund(ctx, 'stier', x + w * 0.5, y + h * 0.84, 0.95, { kijk: 1, t }); ctx.restore(); metaText(ctx, 'GROOT EN STERK', x + w / 2, y + h - 18, C.text2, 'center', 20); } }));
      metaA(ctx, 'WELKE STIER KIES JIJ?', 720, 580, 1, C.goud, 'center', 24); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const tV = q.at('Vroeger', 1), A = 1 - ramp(t, tV - 0.3, 0.5), B = ramp(t, tV - 0.3, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord a: de stier van wie de dochters veel melk geven', 1); stierKaart(ctx, 140, 240, 520, 420, { donker: 1, dochters: 6, melk: 0.85, rand: C.goud });
      metaA(ctx, 'GEEFT ZELF GEEN MELK', 400, 720, q.on('geen', 1), C.text2, 'center', 22);
      laag(ctx, q.on('draagt', 1), () => { roundRect(ctx, 820, 220, 640, 460, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromAllelen(ctx, 1095, 420, 300, 5, { breed: 46, n: 15 }); chromAllelen(ctx, 1185, 420, 300, 9, { breed: 46, n: 15 });
        naamBij(ctx, 'genen voor melk', 'GEEFT HIJ DOOR AAN ZIJN DOCHTERS', 1140, 630, 1, 'center', C.paars); }); });
    laag(ctx, B, () => { const p = clamp((t - q.at('geboren', 1) + 0.2) / (q.at('vijf', 1) - q.at('geboren', 1) + 0.2), 0, 1), jaar = Math.round(p * 5), g = 600;
      stamBord(ctx, 110, 100, 1.05, { vader: 'stier', moeders: 3, top: 1, fw: q.on('vijf', 1), glow: 'v', t }, 1);
      const gS = 600; rund(ctx, 'kalf', 1700, gS, lerp(0.55, 0.62, p), { kijk: -1, t, a: 1 - ramp(p, 0.55, 0.3) }); rund(ctx, 'stier', 1700, gS, lerp(0.5, 0.72, p), { kijk: -1, t, a: ramp(p, 0.55, 0.3) }); metaText(ctx, 'DE STIER', 1700, gS + 60, C.goud, 'center', 20);
      tag(ctx, 'fokwaarde ✓', 1700, 330, C.goud, q.on('vijf', 1), 'center', 34);
      const yt = 790; lijn(ctx, [[220, yt], [1720, yt]], C.line, 4); for (let j = 0; j <= 5; j++) { const x = 220 + j * 300; ctx.fillStyle = j <= jaar ? C.goud : C.line; ctx.fillRect(x - 2, yt - 12, 4, 24); metaText(ctx, 'JAAR ' + j, x, yt + 46, j <= jaar ? C.goud : C.text2, 'center', 20); }
      const ux = lerp(220, 1720, p); circ(ctx, ux, yt, 12, C.goud);
      const st = [['geboren', 1, 'kalf', 640, 'GEBOREN'], ['opgegroeid', 1, 'holstein', 880, 'OPGEGROEID'], ['kalf', 1, 'holstein', 1120, 'EEN KALF'], ['melk', 3, null, 1360, 'MELK']];
      st.forEach(([w, n, ras, x, lab], i) => { const a = q.on(w, n, 0.5); if (a <= 0.01) return; laag(ctx, a, () => { if (ras === 'kalf') rund(ctx, 'kalf', x, g, 0.62, { kijk: 1, t }); else if (ras) rund(ctx, 'holstein', x, g, 0.72, { kijk: 1, t, uier: i === 1 ? 0.5 : null });
        if (i === 2) rund(ctx, 'kalf', x + 120, g, 0.4, { kijk: -1, t }); if (i === 3) { rund(ctx, 'holstein', x, g, 0.72, { kijk: 1, t }); groeiStaaf(ctx, x + 140, g, 30, 180, C.goud, q.on('melk', 3, 1)); }
        metaText(ctx, lab, x, g + 60, C.text2, 'center', 20); }); });
      naamBij(ctx, 'dochter', '', 640, 470, q.on('geboren', 1), 'center');
      text(ctx, 'jaar ' + jaar, 1800, 200, fTitel(72), C.goud, 'right'); metaA(ctx, 'ZO LANG WACHT JIJ', 1800, 250, q.on('wacht', 1), C.goud, 'right', 22); }); },

  // ---------- H3 Genomische selectie ----------
  s18(ctx, t, q) { decor(ctx, 'stal', 0.6); const g = GROND, P = 2.05, Tr = q.on('trekt', 1), Bu = q.on('buisje', 1), Hw = q.on('haarwortel', 1, 0.8);
    kalverhok(ctx, 90, 1060, g, 330);
    rund(ctx, 'kalf', 625, g, P * 0.56, { kijk: 1, t });
    // staartkwast van het kalf (kalf kijkt naar rechts): ± x 530, y 815; trekken = korte ruk terug, daarna plukje in het buisje
    const tT = q.at('trekt', 1), ruk = clamp((t - tT - 0.6) / 1.2, 0, 1), rk = Math.sin(ruk * Math.PI) * 14, plk = ramp(t, tT + 1.2, 0.3), inB = q.on('ze', 1, 0.8);
    persoon(ctx, 'gerrit', 385, g, 168 * P, { t, kijk: 1, outfit: 'stal', pose: Tr > 0.5 ? 'vasthouden' : 'staan', uit: 'neutraal', hold: Tr > 0.5 ? (c, x, y) => {
      const kx = lerp(530 - rk, x + 30, inB), ky = lerp(812, y - 60, inB), an = Math.atan2(ky - y, kx - x), L = Math.hypot(kx - x, ky - y); tangetje(c, x, y, clamp(L / 70, 0.6, 1.5), an);
      if (plk > 0.01) { c.save(); c.globalAlpha *= plk * (1 - ramp(t, q.at('buisje', 1) + 0.3, 0.3)); c.strokeStyle = '#2A2622'; c.lineWidth = 1.6; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(kx, ky); c.lineTo(kx - 14 + i * 3, ky + 16 + (i % 2) * 4); c.stroke(); } c.restore(); }
      haarBuisje(c, x + 46, y - 66, 0.8, Bu, 0.2, 5); } : null });
    persoon(ctx, 'yasmin', 810, g, 165 * P, { t, kijk: -1, pose: 'vasthouden', uit: 'blij', outfit: 'stal' });
    naamBij(ctx, 'stierkalfje', 'GOEDE OUDERS', 625, 640, 1 - q.on('Gerrit', 1), 'center');
    laag(ctx, q.on('Vijf', 1) * (1 - Hw), () => { roundRect(ctx, 1250, 200, 520, 150, 18); shape(ctx, rgba('#0D1420', 0.85), C.koraal, 2); text(ctx, '5 jaar wachten', 1510, 296, fTekst(44, 700), C.text, 'center'); const sN = q.on('niet', 1, 0.5); if (sN > 0.01) lijn(ctx, [[1320, 282], [lerp(1320, 1700, sN), 282]], C.koraal, 6); });
    naamBij(ctx, 'Veehouder Gerrit', '', 385, 440, q.on('Gerrit', 1) * (1 - Hw), 'center');
    laag(ctx, Hw, () => { const cx = 1460, cy = 430, R = 260; circ(ctx, cx, cy, R, C.bgMicro, rgba(C.line, 0.7), 3); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, 6.283); ctx.clip();
      ctx.strokeStyle = '#2A2622'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 40, cy - 300); ctx.quadraticCurveTo(cx - 10, cy - 120, cx, cy - 20); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx + 6, cy + 70, 92, 120, -0.08, 0, 6.283); shape(ctx, '#E4D2B8', '#B8A080', 3);
      dnaDraad(ctx, [[cx - 40, cy + 20], [cx + 30, cy + 40], [cx - 30, cy + 80], [cx + 40, cy + 110], [cx - 20, cy + 150]], { w: 9 }); ctx.restore();
      naamBij(ctx, 'haarwortel', '', cx, cy + R + 50, 1, 'center'); naamBij(ctx, 'DNA', '', cx + 130, cy + 110, q.on('DNA', 1), 'left', C.paars); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const u = ease(clamp(t / 1.6, 0, 1)), bx = lerp(260, 620, u);
    haarBuisje(ctx, bx, 560, 2.6, 1, 0, 5); pijl(ctx, 780, 520, 1060, 520, C.line, q.on('lab', 1), 4, 18);
    laag(ctx, q.on('lab', 1), () => { roundRect(ctx, 1100, 330, 640, 380, 22); shape(ctx, rgba('#0D1420', 0.7), rgba(C.line, 0.8), 2); metaText(ctx, 'LAB', 1140, 380, C.text2, 'left', 24); });
    dnaDraad(ctx, [[1170, 520], [1300, 470], [1420, 560], [1540, 480], [1670, 540]], { w: 14, a: q.on('DNA', 1) }); naamBij(ctx, 'DNA van het kalf', '', 1420, 650, q.on('DNA', 1), 'center', C.paars);
    vraagteken(ctx, 1420, 300, q.on('denk', 1), 100); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const tC = q.at('chip', 1), A = 1 - ramp(t, tC - 0.3, 0.5), B = ramp(t, tC - 0.3, 0.5);
    laag(ctx, A, () => { antwoord(ctx, 'antwoord c: het DNA wordt gelezen en vergeleken', 1);
      dnaDraad(ctx, [[240, 470], [400, 420], [560, 500], [720, 430], [880, 490], [1000, 450]], { w: 14 }); loep(ctx, 600, 450, 110, q.on('gelezen', 1));
      const N = q.on('veranderd', 1); schaar(ctx, 1320, 450, 1.3, N); doorstreep(ctx, 1320, 450, 80, N); spuit(ctx, 1600, 450, 1.3, N); doorstreep(ctx, 1600, 450, 80, N);
      naamBij(ctx, 'LEZEN, NIET VERANDEREN', 'GEEN GENETISCHE MODIFICATIE', 1460, 640, q.on('modificatie', 1), 'center', C.goud); });
    laag(ctx, B, () => { dnaChip(ctx, 160, 220, 520, 400, { n: 18, seed: 4 }); naamBij(ctx, 'DNA-chip', 'LEEST TIENDUIZENDEN VASTE PLEKJES · SNP', 420, 700, 1, 'center');
      const M = q.on('merkers', 1, 0.8), Wg = q.on('wegwijzers', 1), Dn = q.on('wél', 1);
      const chr = [[820, 470, 340], [940, 480, 300], [1060, 460, 380], [1180, 490, 270], [1300, 470, 320]];
      chr.forEach(([x, y, h], i) => { chromKaal(ctx, x, y, h, 42); [0.18, 0.42, 0.66, 0.86].forEach((p, j) => merkerVlag(ctx, x + 22, y - h / 2 + p * h, 0.8, clamp(M * 6 - i - j * 0.3, 0, 1))); });
      naamBij(ctx, 'merkers', 'OVER ALLE CHROMOSOMEN', 1060, 220, M, 'center', C.goud);
      laag(ctx, Wg, () => { roundRect(ctx, 1420, 160, 440, 640, 20); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2); chromKaal(ctx, 1530, 500, 480, 66);
        merkerVlag(ctx, 1564, 350, 1.3); merkerVlag(ctx, 1564, 520, 1.3); merkerVlag(ctx, 1564, 680, 1.3);
        laag(ctx, Dn, () => { roundRect(ctx, 1497, 540, 66, 40, 6); shape(ctx, rgba(C.groen, 0.85), C.groen, 2); naamBij(ctx, 'doet wél iets', '', 1620, 600, 1, 'left', C.groen); });
        metaText(ctx, 'WEGWIJZER,', 1640, 210, C.goud, 'center', 20); metaText(ctx, 'MEESTAL GEEN MELKGEN', 1640, 240, C.goud, 'center', 20); }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); const cw = 250, ch = 175, gx = 24, gy = 22, x0 = 140, y0 = 150, goed = [1, 6, 7, 10];
    const Dn = 1, Do = 1, tL = q.at('Lijkt', 1), tG = q.at('goede', 1), scan = clamp((t - tL) / (tG + 0.4 - tL), 0, 1), sx = lerp(x0 - 20, x0 + 4 * cw + 3 * gx + 20, scan), sc = t > tL ? 1 : 0;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c, x = x0 + c * (cw + gx), y = y0 + r * (ch + gy), isG = goed.includes(i), lit = isG && sc && sx > x + cw / 2 ? 1 : 0, dim = sc && scan >= 1 && !isG ? 0.55 : 1;
      laag(ctx, clamp(0.35 + t * 1.2 - i * 0.04, 0, 1) * dim, () => { stierKaart(ctx, x, y, cw, ch, {});
        laag(ctx, Dn, () => stierKaart(ctx, x, y, cw, ch, { code: isG ? 7 : i + 3 })); laag(ctx, Do, () => stierKaart(ctx, x, y, cw, ch, { code: isG ? 7 : i + 3, dochters: 6, melk: isG ? 0.85 : 0.25 + 0.4 * hash(i * 9.1 + 1), rand: lit ? C.goud : null })); }); }
    if (sc && scan < 1) { ctx.save(); ctx.strokeStyle = rgba(C.paars, 0.9); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx, y0 - 20); ctx.lineTo(sx, y0 + 3 * ch + 2 * gy + 20); ctx.stroke(); ctx.restore(); }
    metaA(ctx, 'DUIZENDEN STIEREN · DNA + DOCHTERS BEKEND', x0, 110, Do, C.text2, 'left', 22);
    tag(ctx, 'referentiegroep', x0 + (4 * cw + 3 * gx) / 2, 780, C.goud, q.on('referentiegroep', 1), 'center', 34);
    roundRect(ctx, 1320, 150, 520, 560, 22); shape(ctx, rgba('#0D1420', 0.6), C.paars, 2.5); metaText(ctx, 'JOUW KALF', 1350, 196, C.text2, 'left', 22);
    rund(ctx, 'kalf', 1580, 420, 0.7, { kijk: 1, t }); roundRect(ctx, 1380, 470, 400, 80, 8); shape(ctx, '#F2EEE4', null); streepjescode(ctx, 1392, 482, 376, 56, 7);
    tag(ctx, 'fokwaarde: hoog', 1580, 640, C.goud, q.on('hoge', 1), 'center', 32);
    regel(ctx, 'genomische selectie', 1580, 790, q.on('genomische', 1), C.goud, 52, 'center', 800); metaA(ctx, 'NL · SINDS 2010', 1580, 840, q.on('tweeduizendtien', 1), C.text2, 'center', 22); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const tB = q.at('Maar', 1) - 0.3, tC = q.at('tijd', 1) - 0.3, A = 1 - ramp(t, tB, 0.5), B = ramp(t, tB, 0.5) * (1 - ramp(t, tC, 0.5)), Cc = ramp(t, tC, 0.5);
    laag(ctx, A, () => { metaText(ctx, 'BETROUWBAARHEID VAN DE FOKWAARDE', 160, 200, C.text2, 'left', 24);
      const rij = (y, lab, f, a, col, teken) => laag(ctx, a, () => { text(ctx, lab, 160, y + 14, fTekst(40, 700), C.text, 'left'); roundRect(ctx, 760, y - 26, 900, 52, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 2); if (f > 0.01) { roundRect(ctx, 760, y - 26, 900 * f, 52, 16); shape(ctx, rgba(col, 0.6), col, 2.5); } teken(); });
      rij(320, 'alleen de ouders', 0.3 * ramp(t, 0, 0.8), 1, C.text2, () => {}); rij(480, 'DNA-test', 0.6 * ramp(t, 0, 0.8), 1, C.paars, () => {});
      rij(640, 'honderden dochters', 0.95 * q.on('honderden', 1, 1.2), q.on('stier', 1), C.goud, () => { for (let i = 0; i < 12; i++) koeIcoon(ctx, 780 + i * 34, 740, 30, rgba(C.text2, 0.8), 1); });
      tag(ctx, '≈ 2 × zo betrouwbaar', 1210, 410, C.paars, q.on('twee', 1), 'center', 28); tag(ctx, 'zekerder', 1720, 570, C.goud, q.on('zekerder', 1), 'center', 28); });
    const bA = Math.max(B, Cc); stamBord(ctx, 1380, 150, 1.12, { vader: 'stier', moeders: 3, top: 1, fw: 1, kalf: q.on('kalf', 1, 0.6), glow: 'k', t }, bA);
    laag(ctx, B, () => { text(ctx, '± 5 jaar', 640, 420, fTitel(96), C.text2, 'center'); kruis(ctx, 640, 390, 120, ramp(t, tB + 0.3, 0.5)); regel(ctx, 'binnen een paar weken', 640, 600, q.on('binnen', 1), C.goud, 64, 'center', 800); });
    laag(ctx, Cc, () => { const row = (y, lab, n, step, a) => laag(ctx, a, () => { metaText(ctx, lab, 160, y - 70, C.text2, 'left', 22); lijn(ctx, [[160, y], [1200, y]], C.line, 3);
        for (let i = 0; i < n; i++) { const x = 200 + i * step; stierIcoon(ctx, x, y - 6, 54, i ? '#D8DEE6' : C.goud, 1); if (i < n - 1) pijl(ctx, x + 40, y - 30, x + step - 40, y - 30, C.goud, 1, 3, 12); } });
      row(400, 'VROEGER · ÉÉN GENERATIE', 3, 480, 1); row(650, 'NU · GENERATIE ≈ GEHALVEERD', 5, 240, q.on('gehalveerd', 1));
      tag(ctx, 'fokken gaat ± 2 × zo snel', 680, 790, C.goud, q.on('snel', 1), 'center', 32); }); },

  // ---------- H4 De keerzijde ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); bordKader(ctx, 1, 1);
    stamboom(ctx, { s: 1, z: q.on('steeds', 1), p: q.on('andere', 1), k: q.on('generaties', 1), kl: q.on('kleindochters', 1), kp: q.on('kleinzonen', 1), koraal: q.on('mislukt', 1) });
    for (let i = 0; i < 3; i++) laag(ctx, clamp(q.on('andere', 1, 1) * 3 - i, 0, 1), () => { const y = 160 + i * 190; roundRect(ctx, 1400, y, 420, 160, 16); shape(ctx, rgba('#0D1420', 0.86), rgba(C.line, 0.8), 2); metaText(ctx, 'ANDER BEDRIJF', 1430, y + 40, C.text2, 'left', 18);
      for (let j = 0; j < 3; j++) { const bx = 1430 + j * 120; roundRect(ctx, bx, y + 64, 90, 64, 10); shape(ctx, rgba(C.fill, 0.55), C.goud, 2); ster(ctx, bx + 45, y + 96, 20); } });
    tag(ctx, 'dracht mislukt vaker', 1100, 830, C.koraal, q.on('mislukt', 1), 'center', 30);
    vraagteken(ctx, 960, 780, q.on('denk', 1), 90); },

  s26(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een recessief allel komt dubbel voor', 1 - q.on('Familie', 1)); bordKader(ctx, 1, 1);
    const Ho = q.on('homozygoot', 1), Dr = q.on('drager', 1);
    stamboom(ctx, { s: 1, z: 1, p: 1, k: 1, kl: 1, kp: 1, koraal: 1, dr: Dr });
    regel(ctx, 'inteelt', 1110, 816, q.on('inteelt', 1), C.goud, 52, 'center', 800);
    const { S, zA, dB, kA, kB, kalf, r } = SB; rAllel(ctx, S[0] - 48, S[1] - 30, q.on('waren', 1));
    const pV = [[S[0], S[1] + r], [S[0], S[1] + 70], [zA[0], S[1] + 70], [zA[0], zA[1]], [440, zA[1]], [440, zA[1] + 70], [kA[0], kA[1]], [760, kA[1]], [760, kA[1] + 70], [kalf[0] - 18, kalf[1] - r]];
    const pM = [[S[0], S[1] + r], [S[0], S[1] + 70], [dB[0], S[1] + 70], [dB[0], dB[1]], [1080, dB[1]], [1080, dB[1] + 70], [kB[0], kB[1]], [760, kB[1]], [760, kB[1] + 70], [kalf[0] + 18, kalf[1] - r]];
    const u = ease(q.on('vader', 1, 2.4)), Rn = q.on('vader', 1, 0.3) * (1 - ramp(t, q.at('homozygoot', 1) + 0.6, 0.4));
    if (u > 0.01) { const a1 = langs(pV, u), a2 = langs(pM, u); rAllel(ctx, a1[0] - 22, a1[1], Rn); rAllel(ctx, a2[0] + 22, a2[1], Rn); }
    const nR = (pt, uu) => rAllel(ctx, pt[0] + r + 26, pt[1] - 26, ramp(u, uu, 0.08)); nR(zA, 0.3); nR(dB, 0.3); nR(kA, 0.62); nR(kB, 0.62); rAllel(ctx, SB.dr[0] + r + 26, SB.dr[1] - 26, Dr);
    laag(ctx, ramp(t, q.at('homozygoot', 1) + 0.6, 0.4), () => { rAllel(ctx, kalf[0] - 22, kalf[1] - 52, 1); rAllel(ctx, kalf[0] + 22, kalf[1] - 52, 1); });
    laag(ctx, Ho, () => { roundRect(ctx, 1370, 150, 470, 690, 22); shape(ctx, C.bgMicro, rgba(C.line, 0.5), 2);
      chromR(ctx, 1450, 380, 260, 0.36, 'r'); chromR(ctx, 1545, 380, 260, 0.36, 'r'); naamBij(ctx, 'HOMOZYGOOT', '', 1515, 560, 1, 'center', C.koraal); text(ctx, 'rr', 1515, 604, fTekst(34, 700), C.koraal, 'center');
      laag(ctx, Dr, () => { chromR(ctx, 1670, 380, 260, 0.36, 'r'); chromR(ctx, 1760, 380, 260, 0.36, 'R'); naamBij(ctx, 'DRAGER', '', 1720, 560, 1, 'center'); text(ctx, 'Rr · gezond', 1720, 604, fTekst(30, 700), C.text, 'center'); });
      metaText(ctx, 'HETZELFDE ALLEL,', 1605, 200, C.text2, 'center', 18); metaText(ctx, 'VAN DEZELFDE VOOROUDER', 1605, 228, C.text2, 'center', 18);
      filmKaartje(ctx, 1400, 680, 'Monohybride kruisingen', q.on('recessief', 1), 410); filmKaartje(ctx, 1400, 750, 'Stambomen en kansrekenen', q.on('recessief', 1), 410); }); },

  s27(ctx, t, q) { bg(ctx, 'schema'); const ty = 640, Nu = q.on('Nu', 1);
    lijn(ctx, [[140, ty], [960, ty]], C.line, 4);
    [[200, '1950'], [420, '1962'], [700, '1990'], [900, 'NU']].forEach(([x, s]) => { const k = s === '1962'; ctx.fillStyle = k ? C.goud : C.line; ctx.fillRect(x - 2, ty - (k ? 22 : 12), 4, k ? 44 : 24); text(ctx, s, x, ty + 50, fTekst(k ? 38 : 30, 700), k ? C.goud : C.text2, 'center'); });
    lijn(ctx, [[420, ty - 22], [420, 500]], C.goud, 3); stierKaart(ctx, 230, 200, 380, 300, { rand: C.goud, geenStier: 1 }); rund(ctx, 'stier', 420, 470, 0.95, { kijk: 1, t });
    metaText(ctx, 'ECHTE STIER · VS', 140, 160, C.goud, 'left', 22);
    naamBij(ctx, '> 16.000 dochters', '', 650, 330, q.on('zestienduizend', 1), 'left');
    groeiStaaf(ctx, 690, 500, 40, 110, C.goud, q.on('melk', 1, 0.8)); naamBij(ctx, 'extra melk', '', 730, 470, q.on('melk', 1), 'left', C.goud);
    rAllel(ctx, 578, 236, q.on('recessief', 1)); naamBij(ctx, 'ongemerkt', 'SCHADELIJK RECESSIEF ALLEL', 650, 250, q.on('recessief', 1), 'left', C.koraal);
    laag(ctx, q.on('Kalfjes', 1) * (1 - Nu), () => { const gr = (t - q.at('Kalfjes', 1)); [[1160, 0.5, 0, 0], [1440, 0.8, 0, 0.6], [1720, 0.82, 1, 1.2]].forEach(([x, g, st, d], i) => { const a = ramp(gr, d, 0.4); baarmoederVrucht(ctx, x, 390, 100, g, st, a); metaA(ctx, ['GROEIT', 'GROEIT', 'STOPT'][i], x, 540, a, st ? C.koraal : C.text2, 'center', 22); });
      pijl(ctx, 1110, 600, 1790, 600, C.line, 0.7, 3, 14); metaText(ctx, 'DRACHT', 1110, 640, C.text2, 'left', 20);
      naamBij(ctx, 'twee kopieën van het allel', '', 1440, 720, q.on('kopieën', 1), 'center', C.koraal); metaA(ctx, 'NAAR SCHATTING ± HALF MILJOEN · WERELDWIJD', 1450, 830, q.on('half', 1), C.text2, 'center', 22); });
    laag(ctx, Nu, () => { haarBuisje(ctx, 1150, 470, 1.6, 1, 0, 5); pijl(ctx, 1210, 430, 1290, 430, C.line, 1, 4, 16); dnaChip(ctx, 1310, 310, 260, 220, { n: 10, seed: 6 });
      rAllel(ctx, 1680, 420, q.on('dragers', 1)); naamBij(ctx, 'drager gevonden', 'DNA-TEST', 1680, 520, q.on('dragers', 1), 'center', C.koraal); }); },

  s28(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('Nu', 1), tO = q.at('Oude', 1), A = 1 - ramp(t, tO - 0.3, 0.5), O = ramp(t, tO - 0.3, 0.5);
    laag(ctx, A, () => { const nu = ramp(t, tN, 1.6), kant = lerp(-1, 0.25, nu);
      metaA(ctx, 'TOTAALSCORE · NVI', 620, 200, nu, C.goud, 'center', 24); metaA(ctx, 'FOKDOEL', 620, 200, 1 - nu, C.text2, 'center', 24);
      weegschaalLb3(ctx, 620, 360, kant, 1, (x, y) => { groeiStaaf(ctx, x, y + 20, 70, 150, C.goud, 1); text(ctx, 'melk', x, y + 80, fTekst(36, 700), C.text, 'center'); },
        (x, y) => laag(ctx, lerp(0.35, 1, nu), () => { ['gezondheid', 'vruchtbaarheid', 'lang leven'].forEach((s2, i) => { roundRect(ctx, x - 120, y - 10 - i * 54, 240, 46, 10); shape(ctx, rgba(C.groen, 0.25 + 0.3 * nu), C.groen, 2); text(ctx, s2, x, y + 22 - i * 54, fTekst(28, 700), C.text, 'center'); }); }));
      const S = q.on('Allelen', 1); laag(ctx, S * (1 - nu), () => { [['melk', '↑', C.goud], ['vruchtbaarheid', '↓', C.koraal], ['gezondheid', '↓', C.koraal]].forEach(([s2, p, col], i) => { const y = 330 + i * 110; text(ctx, s2, 1260, y, fTekst(40, 700), C.text, 'left'); text(ctx, p, 1220, y, fTitel(56), col, 'center'); }); metaText(ctx, 'ALLELEN VOOR VEEL MELK GAAN VAAK SAMEN MET', 1200, 250, C.text2, 'left', 18); });
      tag(ctx, 'minstens zo zwaar als melk', 1450, 470, C.groen, q.on('minstens', 1), 'center', 32); });
    laag(ctx, O, () => { const g = 850, P = 1.3; vloer(ctx, g); rund(ctx, 'blaarkop', 480, g, P, { kijk: 1, t }); rund(ctx, 'holstein', 1000, g, P, { kijk: -1, t, a: 0.85 });
      naamBij(ctx, 'Groninger blaarkop', 'ZO’N 800 FOKKOEIEN (2026)', 480, 610, 1, 'center'); naamBij(ctx, 'Holstein', '', 1000, 610, 1, 'center', C.text2);
      tag(ctx, 'reserve aan variatie', 740, 330, C.goud, q.on('reserve', 1), 'center', 32);
      laag(ctx, q.on('Wageningen', 1), () => { stikstofVat(ctx, 1500, g, 1.0, 1, t); roundRect(ctx, 1660, g - 150, 150, 150, 10); shape(ctx, '#5A6478', C.line, 2); for (let i = 0; i < 4; i++) rietje(ctx, 1690 + i * 30, g - 80, 0.45, 1, Math.PI / 2, [C.teal, C.goud, C.koraal, C.groen][i]); naamBij(ctx, 'genenbank', 'WAGENINGEN · DIEPGEVROREN', 1580, 510, 1, 'center'); }); }); },

  s29(ctx, t, q) { const Z = q.on('Hoe', 1, 0.8);
    laag(ctx, 1 - Z, () => { decor(ctx, 'stal', 0.6); const g = GROND, P = 1.85, F = q.on('familie', 1), Mi = q.on('mindere', 1), Tw = q.on('tweede', 1, 0.8);
      rund(ctx, 'holstein', 330, g, P, { kijk: 1, t });
      persoon(ctx, 'gerrit', 760, g, 168 * P, { t, kijk: 1, outfit: 'stal', pose: 'vasthouden', uit: 'neutraal', hold: (c, x, y) => { roundRect(c, x - 6, y - 52, 70, 50, 6); shape(c, '#1E232C', '#5A6070', 2); roundRect(c, x - 1, y - 47, 60, 40, 3); shape(c, rgba(C.teal, 0.5), null); } });
      persoon(ctx, 'yasmin', 1000, g, 165 * P, { t, kijk: -1, outfit: 'stal', uit: 'neutraal' });
      tabletLb3(ctx, 1110, 140, 730, 560, { k1: F, k2: Mi, streep: Tw, kies: Tw, reden: q.on('allelen', 1) }); });
    laag(ctx, Z, () => { bg(ctx, 'schema'); ctx.globalAlpha = Z; const D = q.on('verschillende', 1, 1);
      stamBord(ctx, 729, 110, 1.25, { vader: 'ster', moeders: 3, gen: 1, divers: D, glow: 'g', t }, 1);
      tag(ctx, 'meer variatie in het ras', 960, 800, C.goud, q.on('variatie', 1), 'center', 32); }); },

  // ---------- Recap ----------
  s30(ctx, t, q) { decor(ctx, 'stal', 0.6); const g = GROND, P = 1.3;
    persoon(ctx, 'henk', 230, g, 172 * P, { t, kijk: 1, uit: 'blij' }); hek(ctx, 90, 380, g - 4, 130); persoon(ctx, 'yasmin', 470, g + 6, 165 * P, { t, kijk: 1, outfit: 'stal', uit: 'blij' });
    rund(ctx, 'holstein', 740, g, P, { kijk: -1, t });
    const yb = 800, k = 1 / 19; roundRect(ctx, 900, 180, 360, 680, 18); shape(ctx, rgba('#0D1420', 0.72), null); const r = melkStaven(ctx, 1000, 1150, yb, 110, k, { ex: 1, voer: q.on('voer', 1), fok: q.on('helft', 1) });
    naamBij(ctx, 'fokken', '≈ DE HELFT', 1075, yb - r.h1 - 34, q.on('helft', 1), 'center', C.paars);
    const K = q.on('kozen', 1, 0.8); stamBord(ctx, 1380, 110, 1.05, { vader: 'ster', moeders: 3, top: 1, kalf: 1, t }, 1 - K);
    const kaart = [['jij kiest', 'de ouders', 'kozen', (x, y) => { koeIcoon(ctx, x - 40, y + 26, 50, '#D8DEE6', 1, { bont: 2 }); stierIcoon(ctx, x + 40, y + 26, 50, '#D8DEE6', 1); }],
      ['jij wacht', 'op dochters', 'dochters', (x, y) => { for (let i = 0; i < 4; i++) koeIcoon(ctx, x - 66 + i * 44, y + 26, 34, '#D8DEE6', 1); }],
      ['jij leest', 'het DNA', 'DNA', (x, y) => { roundRect(ctx, x - 80, y - 14, 160, 50, 4); shape(ctx, '#F2EEE4', null); streepjescode(ctx, x - 72, y - 8, 144, 38, 7); }],
      ['jij let', 'op familie', 'familie', (x, y) => { ster(ctx, x - 50, y + 10, 20); ster(ctx, x, y + 10, 20, C.teal); ster(ctx, x + 50, y + 10, 20, C.koraal); }]];
    kaart.forEach(([a1, a2, cue, teken], i) => eindKaart(ctx, 1290 + (i % 2) * 290, 110 + Math.floor(i / 2) * 220, 270, 200, a1, a2, K * q.on(cue, 1), teken));
    const ik = [['kas', icoonKas, 'Kas'], ['bodem', icoonBodem, 'bodem'], ['stal', icoonStal, 'stal']];
    ik.forEach(([lab, fn, cue], i) => { const x = 1360 + i * 200, a = q.on(cue, 1); fn(ctx, x, 640, 1, a); metaA(ctx, lab.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, 730, a, C.text, 'center', 20); });
    tag(ctx, 'overal stuurt een mens wat er groeit', 1580, 800, C.goud, q.on('stuurt', 1), 'center', 28); },

  s31(ctx, t, q) { decor(ctx, 'stal', 0.6); roundRect(ctx, 120, 130, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Waar leer je dit?', 150, 200, 1, C.text, 56, 'left', 700);
    [['mbo', 'Veehouderij', 'O.A. DOETINCHEM', 'mbo'], ['hbo', 'Dier- en Veehouderij', 'DEN BOSCH', 'hbo'], ['wo', 'Animal Sciences', 'ENGELSTALIG · WAGENINGEN', 'universiteit']].forEach(([n, o, m, cue], i) => { const a = i ? q.on(cue, 1) : 1; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      roundRect(ctx, 120, 280 + i * 165, 1100, 140, 18); shape(ctx, rgba('#0D1420', 0.88), C.groen, 2); text(ctx, n, 170, 365 + i * 165, fTitel(48), C.groen); text(ctx, o, 310, 360 + i * 165, fTekst(44, 700), C.text); metaText(ctx, m, 310, 400 + i * 165, C.grain, 'left', 24); ctx.restore(); });
    laag(ctx, q.on('Daarna', 1), () => { roundRect(ctx, 120, 780, 1100, 76, 14); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'veehouder · inseminator · fokkerijspecialist', 150, 830, 1, C.text, 36, 'left', 600); });
    rund(ctx, 'holstein', 1580, GROND, 1.5, { kijk: -1, t }); }
});
