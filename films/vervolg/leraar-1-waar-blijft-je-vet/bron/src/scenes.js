
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
// Wat word jij? · Leraar biologie 1 · Waar blijft je vet? — eigen tekeningen (20 okt 2026)

// schoolbord met krijtrand; regels = [[tekst, alpha], …] in krijtletters
function schoolbord(ctx, x, y, w, h, a = 1, regels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 10); shape(ctx, '#6B5440', '#4A3A2E', 2); roundRect(ctx, x, y, w, h, 6); shape(ctx, '#2F4A3E', null);
  ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + w * 0.1, y + h + 14, w * 0.8, 12); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(x + w * 0.2, y + h + 8, 40, 8);
  regels.forEach(([s2, al], i) => { if (al > 0.01) { ctx.save(); ctx.globalAlpha *= al; text(ctx, s2, x + 40, y + 70 + i * 62, fTekst(40, 600), '#E8EEE6', 'left'); ctx.restore(); } }); ctx.restore(); }

// atoom: C grijs, O rood, H wit
const AT = { C: ['#5A6170', '#9AA3B2', 22], O: ['#D8573F', '#F08A70', 20], H: ['#E8E8E2', '#FFFFFF', 13] };
function atoom(ctx, el, x, y, s = 1) { const [f, r, rr] = AT[el]; circ(ctx, x, y, rr * s, f, r, 2); }

// vetmolecuul (schematisch): glycerol + drie ketens van C met H; u 0..1 = atomen gaan op weg als CO2 (naar rechtsboven) en H2O
function vetMolecuul(ctx, x, y, s, a = 1, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pts = []; for (let k = 0; k < 3; k++) { const yy = y + (k - 1) * 100 * s; pts.push(['O', x - 50 * s, yy]); for (let i = 0; i < 7; i++) pts.push(['C', x + i * 64 * s, yy + (i % 2 ? -16 : 16) * s]); }
  pts.push(['C', x - 110 * s, y - 100 * s], ['C', x - 110 * s, y], ['C', x - 110 * s, y + 100 * s]);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3 * s; ctx.globalAlpha *= 1 - u * 0.85;
  for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const p = pts[k * 8 + i]; i ? ctx.lineTo(p[1], p[2]) : ctx.moveTo(p[1], p[2]); } ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x - 110 * s, y - 100 * s); ctx.lineTo(x - 110 * s, y + 100 * s); ctx.stroke(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x - 110 * s, y + (k - 1) * 100 * s); ctx.lineTo(x - 50 * s, y + (k - 1) * 100 * s); ctx.stroke(); }
  pts.forEach(([el, px, py], i) => { if (el === 'C' && i < 24 && i % 8) { const up = (i % 8) % 2 ? -1 : 1; atoom(ctx, 'H', px, py + up * 34 * s, s * 0.8); } atoom(ctx, el, px, py, s); });
  ctx.restore();
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 9; i++) { const f = clamp(u * 1.6 - i * 0.07, 0, 1); if (f <= 0) continue; const sx = x + (i % 3) * 150 * s, sy = y + (Math.floor(i / 3) - 1) * 100 * s; const tx = sx + f * (380 + 30 * i) * s, ty = sy - f * (200 + 25 * (i % 4)) * s + Math.sin(t * 2 + i) * 6;
      if (i % 4 === 3) { atoom(ctx, 'O', tx, ty, s); atoom(ctx, 'H', tx - 20 * s, ty + 14 * s, s); atoom(ctx, 'H', tx + 20 * s, ty + 14 * s, s); }
      else { atoom(ctx, 'O', tx - 34 * s, ty, s); atoom(ctx, 'C', tx, ty, s); atoom(ctx, 'O', tx + 34 * s, ty, s); } } ctx.restore(); } }

// staaf van tien kilo vet: deel via koolstofdioxide (uitgeademd) en via water
function kiloStaaf(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 70;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#2A3446', C.line, 1.5); const w1 = w * 0.84 * clamp(u * 2, 0, 1), w2 = w * 0.16 * clamp(u * 2 - 1, 0, 1);
  if (w1 > 2) { roundRect(ctx, x, y, w1, h, 12); shape(ctx, rgba(C.grain, 0.55), C.grain, 2); text(ctx, '8,4 kilo eruit via koolstofdioxide', x + 24, y + 46, fTekst(30, 700), C.text, 'left'); }
  if (w2 > 2) { roundRect(ctx, x + w * 0.84, y, w2, h, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2); text(ctx, '1,6 kilo via water', x + w * 0.92, y + h + 40, fTekst(28, 700), C.teal, 'center'); }
  metaText(ctx, 'TIEN KILO VET', x, y - 18, C.grain, 'left', 24); ctx.restore(); }

// telpoppetje (alleen in groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// gedachtewolk met idee-blokken; nieuw = blok dat er niet in past (stuitert af)
function ideeWolk(ctx, x, y, w, h, a = 1, blokken = [], nieuw = null, nu = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * 6.283; ctx.ellipse(x + Math.cos(an) * w * 0.36, y + Math.sin(an) * h * 0.32, w * 0.2, h * 0.24, 0, 0, 6.283); } ctx.fillStyle = '#2E3D5C'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, w * 0.48, h * 0.44, 0, 0, 6.283); ctx.fill(); circ(ctx, x - w * 0.36, y + h * 0.62, 16, '#2E3D5C'); circ(ctx, x - w * 0.44, y + h * 0.82, 10, '#2E3D5C');
  blokken.forEach(([s2, col], i) => { ctx.font = fTekst(28, 700); const bw = ctx.measureText(s2).width + 36; const bx = x - bw / 2, by = y - 70 + i * 62; roundRect(ctx, bx, by, bw, 48, 8); shape(ctx, rgba(col, 0.35), col, 2); text(ctx, s2, x, by + 33, fTekst(28, 700), C.text, 'center'); });
  if (nieuw && nu > 0.01) { ctx.font = fTekst(28, 700); const bw = ctx.measureText(nieuw).width + 36; const d = (1 - clamp(nu * 1.4, 0, 1)) * 300, wob = nu > 0.7 ? Math.sin(t * 9) * 10 * (1 - nu) : 0; const bx = x + w * 0.42 + d + wob, by = y - 30;
    ctx.save(); ctx.translate(bx + bw / 2, by + 24); ctx.rotate(0.18 + wob * 0.01); roundRect(ctx, -bw / 2, -24, bw, 48, 8); shape(ctx, rgba(C.teal, 0.35), C.teal, 2); text(ctx, nieuw, 0, 9, fTekst(28, 700), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// kaartje met stapnummer (voorspellen / waarnemen / verklaren)
function stapKaart(ctx, x, y, w, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(col, 0.08 + 0.17 * aan), rgba(col, 0.35 + 0.65 * aan), 2); circ(ctx, x + 46, y + 48, 26, rgba(col, 0.3 + 0.5 * aan)); text(ctx, String(nr), x + 46, y + 60, fTekst(32, 800), C.text, 'center'); text(ctx, s2, x + 90, y + 60, fTekst(32, 700), C.text, 'left'); ctx.restore(); }

// reageerbuis met kalkwater en een rietje; tr 0..1 = troebel; bel = bubbels
function kalkBuis(ctx, x, y, s, a = 1, tr = 0, bel = 0, t = 0, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -200); ctx.lineTo(-40, 120); ctx.arc(0, 120, 40, Math.PI, 0, true); ctx.lineTo(40, -200); ctx.fillStyle = rgba('#CFE4F0', 0.08); ctx.fill();
  ctx.save(); ctx.clip(); const vl = rgba('#BFD8E6', 0.35); ctx.fillStyle = vl; ctx.fillRect(-40, -60, 80, 230); if (tr > 0.01) { ctx.fillStyle = rgba('#F2F2EE', 0.75 * tr); ctx.fillRect(-40, -60, 80, 230); }
  if (bel > 0.01) for (let i = 0; i < 8; i++) { const ph = (t * 1.2 + i / 8) % 1; circ(ctx, -8 + Math.sin(i * 3) * 14, 140 - ph * 200, 5 + (i % 3) * 2, rgba('#FFFFFF', 0.6 * bel)); } ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -200); ctx.lineTo(-40, 120); ctx.arc(0, 120, 40, Math.PI, 0, true); ctx.lineTo(40, -200); ctx.stroke();
  ctx.strokeStyle = '#E0B64A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 140); ctx.lineTo(-6, -260); ctx.lineTo(-60, -300); ctx.stroke();
  if (lab) text(ctx, lab, 0, 230, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// tegeltjes: rij leesmomenten of ophaalmomenten
function leerTegel(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = soort === 'lees' ? C.oker : C.groen; roundRect(ctx, x, y, 120, 120, 14); shape(ctx, rgba(col, 0.2), col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'lees') { ctx.beginPath(); ctx.moveTo(x + 60, y + 38); ctx.quadraticCurveTo(x + 38, y + 28, x + 20, y + 34); ctx.lineTo(x + 20, y + 84); ctx.quadraticCurveTo(x + 38, y + 78, x + 60, y + 88); ctx.quadraticCurveTo(x + 82, y + 78, x + 100, y + 84); ctx.lineTo(x + 100, y + 34); ctx.quadraticCurveTo(x + 82, y + 28, x + 60, y + 38); ctx.lineTo(x + 60, y + 88); ctx.stroke(); }
  else { ctx.strokeRect(x + 28, y + 24, 54, 72); [44, 58, 72].forEach(yy => { ctx.beginPath(); ctx.moveTo(x + 38, y + yy); ctx.lineTo(x + 70, y + yy); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x + 96, y + 30); ctx.lineTo(x + 72, y + 92); ctx.stroke(); }
  text(ctx, soort === 'lees' ? 'lezen' : 'ophalen', x + 60, y + 154, fTekst(24, 700), C.text2, 'center'); ctx.restore(); }

// staafjes onthouden: paren (lezen, ophalen) na vijf minuten en na een week (waarden in procenten)
function onthoudStaven(ctx, x, y, w, h, a = 1, u1 = 1, u2 = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const V = [[[81, 75], u1, 'na vijf minuten'], [[40, 61], u2, 'na een week']]; V.forEach(([[l, o], u, lab], g) => { const gx = x + 60 + g * w * 0.5; [[l, C.oker, 'lezen'], [o, C.groen, 'ophalen']].forEach(([v, col, n], k) => { const hh = h * v / 100 * clamp(u, 0, 1), bx = gx + k * 130; roundRect(ctx, bx, y + h - hh, 100, hh, 8); shape(ctx, rgba(col, 0.6), col, 2); if (u > 0.95 && g === 1) text(ctx, v + '%', bx + 50, y + h - hh - 14, fTekst(30, 800), C.text, 'center'); text(ctx, n, bx + 50, y + h + 34, fTekst(24, 600), C.text2, 'center'); }); text(ctx, lab, gx + 115, y + h + 76, fTekst(28, 700), C.text, 'center'); });
  metaText(ctx, 'WAT WEET JE NOG? · VOORAL HET VERSCHIL TELT', x, y - 18, C.grain, 'left', 22); ctx.restore(); }

// rij boeken (hoofdstukken) met een gouden draad erdoorheen
function boekenRij(ctx, x, y, a = 1, draad = 0, namen = ['Vertering', 'Ademhaling', 'Planten', 'Cellen', 'Ecologie']) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const cols = [C.oker, C.koraal, C.groen, C.paars, C.teal];
  namen.forEach((n, i) => { const bx = x + i * 150; roundRect(ctx, bx, y, 110, 230, 8); shape(ctx, rgba(cols[i], 0.45), cols[i], 2); ctx.save(); ctx.translate(bx + 60, y + 115); ctx.rotate(-Math.PI / 2); text(ctx, n, 0, 10, fTekst(28, 700), C.text, 'center'); ctx.restore(); });
  if (draad > 0.01) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const L = 150 * namen.length; for (let k = 0; k <= 60 * draad; k++) { const f = k / 60, xx = x - 40 + f * (L + 20), yy = y + 115 + Math.sin(f * 18) * 30; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// darmvlok: vinger met bloedvaatjes en microvilli-randje
function darmvlok(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(k * 80 - 30, 90); ctx.lineTo(k * 80 - 30, -40); ctx.arc(k * 80, -40, 30, Math.PI, 0); ctx.lineTo(k * 80 + 30, 90); shape(ctx, '#D99A8A', '#F0B8A6', 2.5); ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(k * 80 - 8, 90); ctx.lineTo(k * 80 - 8, -40); ctx.arc(k * 80, -40, 8, Math.PI, 0); ctx.lineTo(k * 80 + 8, 90); ctx.stroke(); }
  ctx.fillStyle = '#C98A7A'; ctx.fillRect(-140, 90, 280, 30); ctx.restore(); }
// longblaasjes: trosje
function longblaasjes(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(0, 30); ctx.moveTo(0, 50); ctx.lineTo(-50, 0); ctx.moveTo(0, 50); ctx.lineTo(50, 0); ctx.stroke();
  [[-70, -30], [-40, -70], [0, -40], [40, -70], [70, -30], [-90, 20], [90, 20], [0, -90], [-20, 0], [20, 0]].forEach(([dx, dy]) => circ(ctx, dx, dy, 30, '#E3A8B0', '#F4C8CE', 2.5)); ctx.restore(); }
// wortel met wortelharen
function wortelharen(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -120); ctx.quadraticCurveTo(10, 0, -6, 120); ctx.stroke(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#E8D6A8';
  for (let i = 0; i < 26; i++) { const yy = -70 + i * 6.5, side = i % 2 ? 1 : -1, xx = 3 + side * 10; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + side * 30, yy + 4, xx + side * (50 + (i % 4) * 8), yy + 10); ctx.stroke(); }
  ctx.restore(); }
// Wat word jij? · Leraar biologie · Waar blijft je vet? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Mevrouw Visser als docent; Sam, Noor, Daan, Yasmin).
// Rode draad: één vraag van Mevrouw Visser aan de klas.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// lokaal: bord links, Visser ervoor, leerlingen rechts
function lokaal(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  schoolbord(ctx, 120, 170, 760, 380, 1, o.bord || []);
  persoon(ctx, 'visser', 980, 880, 470, { t, pose: o.pose || 'wijs', kijk: 1, uit: o.uitV || 'blij' });
  persoon(ctx, 'daan', 1380, 880, 380, { t, kijk: -1, uit: o.uitL || 'neutraal' }); persoon(ctx, 'noor', 1560, 880, 400, { t, kijk: -1, uit: o.uitL || 'neutraal' });
  persoon(ctx, 'sam', 1740, 880, 420, { t, kijk: -1, uit: o.uitSam || 'blij', outfit: 'sport' }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { vetMolecuul(ctx, 1380, 560, 0.85, 1, 0.35 + 0.1 * Math.sin(t * 0.8), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    lokaal(ctx, t, { bord: [['Sam: tien kilo afgevallen', q.on('Sam', 1)], ['Waar is dat vet gebleven?', q.on('Waar', 1)]], uitSam: 'lacht' });
    naamBij(ctx, 'Mevrouw Visser', 'docent biologie', 1040, 330, q.on('Visser', 1)); chip(ctx, '−10 kilo', 1760, 300, C.goud, q.on('kilo', 1), 30); vraagteken(ctx, 1640, 250, q.on('denk', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const u = clamp((t - q.at('terecht', 1)) / 4, 0, 1);
    vetMolecuul(ctx, 330, 430, 0.85, 1, u, t); naamBij(ctx, 'vetmolecuul', 'C, H en O', 250, 610, 1 - u * 0.7);
    const k1 = q.on('koolstofdioxide', 1), k2 = q.on('water', 1); if (k1 > 0.01) { ctx.save(); ctx.globalAlpha *= k1; atoom(ctx, 'O', 1366, 318, 0.8); atoom(ctx, 'C', 1392, 318, 0.8); atoom(ctx, 'O', 1418, 318, 0.8); ctx.restore(); } tag(ctx, 'koolstofdioxide', 1450, 330, C.grain, k1, 'left', 30);
    if (k2 > 0.01) { ctx.save(); ctx.globalAlpha *= k2; atoom(ctx, 'O', 1392, 404, 0.8); atoom(ctx, 'H', 1372, 418, 0.8); atoom(ctx, 'H', 1412, 418, 0.8); ctx.restore(); } tag(ctx, 'water', 1450, 420, C.teal, k2, 'left', 30);
    kiloStaaf(ctx, 300, 700, 1320, q.on('kilo', 1), clamp((t - q.at('kilo', 1)) / 3, 0, 1)); chip(ctx, 'energie komt vrij · de atomen blijven bestaan', 960, 850, C.goud, q.on('ergens', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Alles', 1, 0.8);
    metaA(ctx, 'ENQUÊTE · 2014 · 150 ARTSEN, DIËTISTEN EN TRAINERS', 160, 200, q.on('Onderzoekers', 1) * (1 - B), C.grain, 'left', 26);
    groep(ctx, 200, 300, 150, 25, 52, 13, i => (q.on('drie', 1) > 0.5 && i >= 147) ? C.groen : (q.on('meesten', 1) > 0.5 && i < 120 ? C.koraal : '#5A6478'), q.on('honderdvijftig', 1) * (1 - B));
    chip(ctx, 'de meesten: het vet wordt energie', 700, 720, C.koraal, q.on('meesten', 1) * (1 - B), 28); chip(ctx, 'goed: 3', 1500, 720, C.groen, q.on('drie', 1) * (1 - B), 28);
    if (B > 0.01) { tag(ctx, 'film: Alles in het groen', 480, 240, C.teal, B, 'center', 28); ctx.save(); ctx.globalAlpha *= B; ctx.fillStyle = '#6B4A30'; ctx.fillRect(470, 420, 30, 220); circ(ctx, 485, 380, 120, rgba(C.chloro, 0.85), C.chloro, 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(330, 640, 310, 50); ctx.restore();
      tag(ctx, 'hout uit de grond?', 485, 760, C.koraal, q.on('grond', 1), 'center', 30); kruis(ctx, 700, 740, 22, q.on('grond', 1) * 0.9);
      regel(ctx, 'hardnekkig, ook bij slimme mensen', 1300, 420, q.on('hardnekkig', 1), C.text, 40, 'center', 700); vraagteken(ctx, 1300, 640, q.on('Waarom', 1), 120); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const S = q.on('stappen', 1, 0.8), K = q.on('Noor', 1, 0.8);
    if (S < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - S; persoon(ctx, 'daan', 520, 880, 400, { t, uit: 'neutraal', pose: 'denk' });
      ideeWolk(ctx, 960, 400, 640, 360, q.on('idee', 1), [['vet → energie', C.koraal], ['hout ← grond', C.koraal]], 'vet → koolstofdioxide', q.on('vastgeplakt', 1, 2.5), t);
      chip(ctx, 'geen leeg vat', 520, 240, C.goud, q.on('vat', 1), 28); chip(ctx, 'oude idee blijft staan', 960, 680, C.koraal, q.on('staan', 1), 28); chip(ctx, 'eerst zichtbaar maken', 1500, 700, C.teal, q.on('zichtbaar', 1), 28); ctx.restore(); }
    if (S > 0.01) { const k1 = q.on('voorspellen', 1), k2 = q.on('kijken', 1), k3 = q.on('verklaren', 1);
      stapKaart(ctx, 120, 230, 470, 1, 'voorspellen', S * k1, C.teal, q.at('kijken', 1) > t ? 1 : 0.4); stapKaart(ctx, 120, 350, 470, 2, 'waarnemen', S * k2, C.teal, t >= q.at('kijken', 1) && t < q.at('verklaren', 1) ? 1 : 0.4); stapKaart(ctx, 120, 470, 470, 3, 'verklaren', S * k3, C.teal, t >= q.at('verklaren', 1) ? 1 : 0.4);
      if (K > 0.01) { ctx.save(); ctx.globalAlpha *= S; persoon(ctx, 'noor', 860, 880, 400, { t, a: K, kijk: 1, uit: 'neutraal' });
        const bt = q.at('troebel', 1); kalkBuis(ctx, 1140, 560, 0.85, K, clamp((t - bt + 1) / 2, 0, 1), t > q.at('blaast', 1) ? 1 : 0, t, 'uitgeademde lucht');
        kalkBuis(ctx, 1480, 560, 0.85, q.on('tweede', 1), 0, t > q.at('gewone', 2) ? 1 : 0, t, 'gewone lucht'); chip(ctx, 'troebel: meer koolstofdioxide', 1140, 240, C.grain, q.on('troebel', 1), 26); chip(ctx, 'helder', 1480, 240, C.teal, q.on('helder', 1), 26); ctx.restore(); }
      tag(ctx, 'daarom stelt deze film steeds eerst een vraag', 960, 860, C.goud, q.on('Daarom', 1), 'center', 30); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'AMERIKAANSE ONDERZOEKERS · STUDENTEN LEREN EEN TEKST', 160, 180, q.on('onderzoekers', 1), C.grain, 'left', 26);
    regel(ctx, 'groep A', 200, 330, q.on('ene', 1), C.oker, 36, 'left', 800); regel(ctx, 'groep B', 200, 600, q.on('andere', 1), C.groen, 36, 'left', 800);
    for (let i = 0; i < 4; i++) leerTegel(ctx, 420 + i * 160, 250, 'lees', q.on('vier', 1) * clamp((t - q.at('vier', 1)) * 3 - i, 0, 1));
    leerTegel(ctx, 420, 520, 'lees', q.on('één', 1)); for (let i = 0; i < 3; i++) leerTegel(ctx, 580 + i * 160, 520, 'ophaal', q.on('schreef', 1) * clamp((t - q.at('schreef', 1)) * 3 - i, 0, 1));
    chip(ctx, 'zonder te kijken', 820, 760, C.groen, q.on('kijken', 1), 26); chip(ctx, 'direct na afloop: groep A iets beter', 1500, 400, C.oker, q.on('Direct', 1), 26); regel(ctx, 'na een week?', 1500, 560, q.on('week', 1), C.goud, 44, 'center', 800); vraagteken(ctx, 1500, 720, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const L = q.on('Leren', 1, 0.8);
    onthoudStaven(ctx, 200, 280, 760, 420, 1, 1, clamp((t - 0.3) / 2, 0, 1));
    chip(ctx, 'leesgroep dacht zelf: wij kennen het beter', 1400, 300, C.oker, q.on('dacht', 1), 26); chip(ctx, 'herlezen voelt vertrouwd', 1400, 400, C.oker, q.on('vertrouwd', 1), 26); chip(ctx, 'ophalen versterkt het spoor', 1400, 500, C.groen, q.on('versterkt', 1), 26);
    tag(ctx, 'film: Leren en onthouden · gespreid oefenen', 1400, 620, C.teal, L, 'center', 26); tag(ctx, 'zoals de vragen in deze film', 1400, 740, C.goud, q.on('Zoals', 1), 'center', 30); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Darmvlokken', 1, 0.8);
    boekenRij(ctx, 590, 300, (1 - D) * q.on('hoofdstukken', 1), q.on('draden', 1, 2) * (1 - D)); regel(ctx, 'losse hoofdstukken?', 960, 640, q.on('losse', 1) * (1 - D), C.text2, 34, 'center', 700);
    darmvlok(ctx, 440, 520, 1.1, D); naamBij(ctx, 'darmvlokken', 'dunne darm', 440, 720, D, 'center');
    longblaasjes(ctx, 960, 500, 1.1, q.on('Longblaasjes', 1)); naamBij(ctx, 'longblaasjes', 'longen', 960, 720, q.on('Longblaasjes', 1), 'center');
    wortelharen(ctx, 1480, 500, 1.2, q.on('Wortelharen', 1)); naamBij(ctx, 'wortelharen', 'plant', 1480, 720, q.on('Wortelharen', 1), 'center'); vraagteken(ctx, 960, 230, q.on('gemeen', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const M = q.on('mitochondrium', 1);
    darmvlok(ctx, 300, 430, 0.85, 1); longblaasjes(ctx, 720, 410, 0.85, 1); wortelharen(ctx, 1140, 410, 0.95, 1); mitochondrion(ctx, 1600, 420, 300, 0.2, M, 6, t); naamBij(ctx, 'mitochondrium', 'plooien: enzymen', 1600, 580, M, 'center'); naamBij(ctx, 'darmvlokken', '', 300, 580, 1, 'center'); naamBij(ctx, 'longblaasjes', '', 720, 580, 1, 'center'); naamBij(ctx, 'wortelharen', '', 1140, 580, 1, 'center');
    if (q.on('oppervlak', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('oppervlak', 1); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); const L = M > 0.5 ? 1 : 0.72; for (let k = 0; k <= 80 * L; k++) { const f = k / 80, xx = 160 + f * 1640, yy = 690 + Math.sin(f * 14) * 14; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
    regel(ctx, 'groot idee: oppervlak vergroten', 960, 775, q.on('oppervlak', 1), C.goud, 40, 'center', 800); chip(ctx, 'niet alles los onthouden', 700, 850, C.text2, q.on('los', 1), 26); chip(ctx, 'een les rond een groot idee', 1300, 850, C.goud, q.on('idee', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); lokaal(ctx, t, { bord: [['voorspellen · waarnemen · verklaren', q.on('denkt', 1)], ['ophalen, niet herlezen', q.on('onthoudt', 1)], ['groot idee: oppervlak vergroten', q.on('onthoudt', 1)]], uitL: 'blij', uitSam: 'lacht' });
    for (let i = 0; i < 6; i++) { const w = wander(i, t, 40, 0.4), f = q.on('lucht', 1); if (f < 0.01) continue; ctx.save(); ctx.globalAlpha *= f; const x = 1150 + i * 120 + w.x, y = 200 + (i % 2) * 60 + w.y; atoom(ctx, 'O', x - 26, y, 0.8); atoom(ctx, 'C', x, y, 0.8); atoom(ctx, 'O', x + 26, y, 0.8); ctx.restore(); }
    chip(ctx, 'het vet van Sam', 1500, 330, C.grain, q.on('lucht', 1), 26); },
  s15(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'hbo-lerarenopleiding', 560, 280, C.teal, q.on('hbo', 1), 'center', 34); regel(ctx, 'o.a. onderbouw, vmbo en mbo · tweedegraads', 560, 360, q.on('vmbo', 1), C.text2, 30, 'center', 600);
    tag(ctx, 'master: hbo of universiteit', 1360, 280, C.teal, q.on('master', 1), 'center', 34); regel(ctx, 'ook bovenbouw havo en vwo · eerstegraads', 1360, 360, q.on('master', 1), C.text2, 30, 'center', 600);
    pijl(ctx, 800, 300, 1100, 300, C.line, q.on('daarna', 1), 4, 16);
    persoon(ctx, 'visser', 960, 880, 360, { t, pose: 'wijs', uit: 'blij' }); chip(ctx, 'al tijdens je opleiding: stage voor de klas', 960, 450, C.goud, q.on('klas', 1), 28); }
});
