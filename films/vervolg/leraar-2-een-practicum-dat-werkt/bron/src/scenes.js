
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
// Wat word jij? · Leraar biologie 2 · Een practicum dat werkt — eigen tekeningen (20 okt 2026)

// fles met gist en suiker, ballon erop; op 0..1 = hoe ver de ballon is opgezwollen; lek = scheurtje met ontsnappend gas
function gistFles(ctx, x, y, s, a = 1, op = 0, t = 0, lek = 0, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // ballon (achter de hals)
  const r = 26 + 64 * clamp(op, 0, 1), by = -150 - r * 0.8; ctx.beginPath(); ctx.ellipse(0, by, r * 0.85, r, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.85), '#F0A08A', 2.5); ctx.fillStyle = '#C9654B'; ctx.fillRect(-14, -160, 28, 22);
  if (lek > 0.01) { ctx.save(); ctx.globalAlpha *= lek; ctx.strokeStyle = '#E8E2D8'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; ctx.globalAlpha = lek * (1 - ph); ctx.beginPath(); ctx.arc(r * 0.8 + 20 + ph * 70, by - 10, 8 + ph * 16, -0.8, 0.8); ctx.stroke(); } ctx.restore(); }
  // fles
  ctx.beginPath(); ctx.moveTo(-16, -140); ctx.lineTo(-16, -90); ctx.quadraticCurveTo(-70, -70, -70, -20); ctx.lineTo(-70, 90); ctx.quadraticCurveTo(-70, 110, -50, 110); ctx.lineTo(50, 110); ctx.quadraticCurveTo(70, 110, 70, 90); ctx.lineTo(70, -20); ctx.quadraticCurveTo(70, -70, 16, -90); ctx.lineTo(16, -140); ctx.closePath(); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#D9B77A', 0.75); ctx.fillRect(-70, 10, 140, 100); for (let i = 0; i < 6; i++) { const ph = (t * 0.8 + i / 6) % 1; circ(ctx, -40 + i * 16, 100 - ph * 90, 4, rgba('#FFF4D8', 0.7 * clamp(op * 3, 0, 1))); } ctx.restore();
  if (lab) text(ctx, lab, 0, 160, fTekst(30, 700), C.text, 'center'); ctx.restore(); }

// waterbad met thermometergetal
function waterbad(ctx, x, y, w, a = 1, graden = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - 70, w, 120, 12); shape(ctx, rgba(C.water, 0.35), '#7FA3C9', 2.5); if (graden) text(ctx, graden, x, y + 92, fTekst(34, 800), C.goud, 'center'); ctx.restore(); }

// werkblad met n stappen; hl = hoeveel stappen al afgevinkt
function werkblad(ctx, x, y, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 300, 420, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'Werkblad gist', x + 24, y + 46, fTekst(28, 800), '#1A2740', 'left');
  for (let i = 0; i < 10; i++) { const yy = y + 86 + i * 32; text(ctx, (i + 1) + '.', x + 24, yy, fTekst(22, 700), '#5A6478', 'left'); ctx.fillStyle = '#B8B0A0'; ctx.fillRect(x + 60, yy - 10, 150 + (i * 37) % 70, 6); if (i < hl) vink_(ctx, x + 268, yy - 8, 10, 1); } ctx.restore(); }

// trap met vier treden (niveaus van onderzoekend leren); aan[i] = zichtbaarheid; hl = actieve trede
function trap(ctx, x, y, a = 1, aan = [1, 1, 1, 1], hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = ['bevestigen', 'gestructureerd', 'begeleid', 'open'], D = ['uitkomst al bekend', 'vraag en werkwijze gegeven', 'alleen de vraag gegeven', 'ook de vraag zelf'];
  N.forEach((n, i) => { if (aan[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= aan[i]; const bx = x + i * 270, by = y - i * 110; roundRect(ctx, bx, by, 260, 100 + i * 110, 8); shape(ctx, rgba(i === hl ? C.goud : C.teal, i === hl ? 0.35 : 0.16), i === hl ? C.goud : C.teal, 2); text(ctx, n, bx + 130, by + 44, fTekst(30, 800), C.text, 'center'); text(ctx, D[i], bx + 130, by + 80, fTekst(21, 600), C.text2, 'center'); ctx.restore(); });
  ctx.restore(); }

// verslag: soort 'A' = mooie grafiek, geen uitleg; 'B' = lekke ballon, veel uitleg
function verslag(ctx, x, y, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 360, 460, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'Groep ' + soort, x + 24, y + 48, fTekst(32, 800), '#1A2740', 'left');
  if (soort === 'A') { ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40, y + 90); ctx.lineTo(x + 40, y + 330); ctx.lineTo(x + 320, y + 330); ctx.stroke(); ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); [[0, 0], [1, 0.25], [2, 0.55], [3, 0.8], [4, 0.95]].forEach(([i, v], k) => { const px = x + 60 + i * 60, py = y + 320 - v * 210; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke(); [[0, 0], [1, 0.25], [2, 0.55], [3, 0.8], [4, 0.95]].forEach(([i, v]) => circ(ctx, x + 60 + i * 60, y + 320 - v * 210, 7, C.teal)); }
  else { gistFles(ctx, x + 90, y + 230, 0.6, 1, 0.15, 0, 1); for (let i = 0; i < 8; i++) { ctx.fillStyle = '#9A9282'; ctx.fillRect(x + 170, y + 100 + i * 34, 150 - (i * 23) % 50, 7); } for (let i = 0; i < 3; i++) { ctx.fillStyle = '#9A9282'; ctx.fillRect(x + 30, y + 380 + i * 24, 300 - i * 40, 7); } }
  ctx.restore(); }

// dienblad met klaargezette flessen (werk van de toa)
function dienblad(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 300, y, 600, 40, 10); shape(ctx, '#8A6A4E', '#6B5440', 2);
  for (let i = 0; i < 4; i++) gistFles(ctx, x - 210 + i * 140, y - 62, 0.55, 1, 0, t); text(ctx, 'klaargezet', x, y + 90, fTekst(28, 700), C.text2, 'center'); ctx.restore(); }
// Wat word jij? · Leraar biologie · Een practicum dat werkt — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Mevrouw Visser als docent; Lotte en Daan, Noor en Yasmin).
// Rode draad: het gistpracticum, eerst als kookboek, dan als onderzoek.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// labtafel onderin
function tafel(ctx, y = 760) { ctx.fillStyle = '#3A4458'; ctx.fillRect(80, y, 1760, 26); ctx.fillStyle = '#2A3242'; ctx.fillRect(140, y + 26, 30, 110); ctx.fillRect(1750, y + 26, 30, 110); }

Object.assign(SCENES, {
  title(ctx, t) { gistFles(ctx, 1500, 640, 1.2, 1, 0.55 + 0.1 * Math.sin(t * 0.9), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const W = q.on('week', 1, 0.8);
    if (W < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - W; tafel(ctx); persoon(ctx, 'lotte', 300, 880, 400, { t, outfit: 'practicum', kijk: 1, uit: 'blij' }); persoon(ctx, 'daan', 480, 880, 370, { t, kijk: 1, uit: 'neutraal', outfit: 'practicum' });
      werkblad(ctx, 640, 300, q.on('werkblad', 1), clamp((t - q.at('werkblad', 1)) * 1.6, 0, 10)); const op = clamp((t - q.at('zwelt', 1) + 0.5) / 2.5, 0, 1);
      waterbad(ctx, 1350, 700, 360, q.on('water', 1)); gistFles(ctx, 1350, 640, 1, q.on('fles', 1), op * q.on('ballon', 1), t); chip(ctx, 'precies zoals het hoort', 1350, 230, C.groen, q.on('hoort', 1), 28); ctx.restore(); }
    if (W > 0.01) { ctx.save(); ctx.globalAlpha *= W; metaA(ctx, 'EEN WEEK LATER', 160, 200, 1, C.grain, 'left', 28); persoon(ctx, 'visser', 620, 880, 470, { t, kijk: 1, uit: 'blij', pose: 'wijs' }); bubbel(ctx, 760, 300, 'wat liet die proef zien?', '#F2F2EE', q.on('proef', 1), 32);
      persoon(ctx, 'lotte', 1180, 880, 400, { t, kijk: -1, uit: 'verbaasd' }); persoon(ctx, 'daan', 1380, 880, 370, { t, kijk: -1, uit: 'verbaasd' }); vraagteken(ctx, 1290, 380, q.on('niet', 1), 110); ctx.restore(); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const T = q.on('niveaus', 1, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; metaA(ctx, 'ENGELSE ONDERZOEKERS · 25 PRACTICUMLESSEN', 160, 230, q.on('onderzoekers', 1), C.grain, 'left', 26);
      tafel(ctx); persoon(ctx, 'lotte', 760, 880, 400, { t, outfit: 'practicum', uit: 'neutraal' }); persoon(ctx, 'daan', 960, 880, 370, { t, uit: 'neutraal', outfit: 'practicum' }); gistFles(ctx, 1250, 650, 0.9, 1, 0.6, t);
      tag(ctx, 'handen bezig', 600, 380, C.groen, q.on('handen', 1), 'center', 30); tag(ctx, 'hoofd niet', 1100, 380, C.koraal, q.on('hoofd', 1), 'center', 30); chip(ctx, 'weinig nagedacht over de ideeën', 860, 300, C.koraal, q.on('ideeën', 1), 26); ctx.restore(); }
    if (T > 0.01) trap(ctx, 300, 640, T, [q.on('bevestigen', 1), q.on('gestructureerd', 1), q.on('begeleid', 1), q.on('open', 1)], t > q.at('trap', 1) ? -1 : (t > q.at('open', 1) ? 3 : t > q.at('begeleid', 1) ? 2 : t > q.at('gestructureerd', 1) ? 1 : 0));
    if (T > 0.01) { pijl(ctx, 260, 760, 1360, 260, C.goud, q.on('trap', 1), 5, 20); tag(ctx, 'meer zelf nadenken', 1500, 220, C.goud, q.on('nadenken', 1), 'center', 30); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'visser', 260, 880, 440, { t, outfit: 'practicum', kijk: 1, uit: 'neutraal', pose: 'denk' }); naamBij(ctx, 'Mevrouw Visser', 'kiest begeleid onderzoek', 120, 330, q.on('begeleid', 1));
    vraagKaartje(ctx, 620, 260, 1100, 'Hoe werkt gist?', q.on('Hoe', 1)); vraagKaartje(ctx, 620, 400, 1100, 'Maakt gist meer gas bij 20 of bij 35 graden?', q.on('Maakt', 1)); vraagKaartje(ctx, 620, 540, 1100, 'Welke kleur ballon zwelt het snelst op?', q.on('kleur', 1));
    klokje(ctx, 1170, 760, 60, 50 / 60, q.on('vijftig', 1)); regel(ctx, '50 minuten', 1260, 778, q.on('vijftig', 1), C.text, 32, 'left', 700); vraagteken(ctx, 1780, 380, q.on('denk', 1), 100); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const G = q.on('middelste', 1, 0.8);
    vraagKaartje(ctx, 160, 230, 1000, 'Hoe werkt gist?', 1 - G * 0.6, q.on('groot', 1) > 0.5 ? 'te groot' : '', C.koraal); vraagKaartje(ctx, 160, 370, 1000, 'Maakt gist meer gas bij 20 of bij 35 graden?', 1, G > 0.5 ? 'past' : '', C.groen, G > 0.5); vraagKaartje(ctx, 160, 510, 1000, 'Welke kleur ballon zwelt het snelst op?', 1 - G * 0.6, q.on('klein', 1) > 0.5 ? 'te klein' : '', C.koraal);
    const V = q.on('verandert', 1); if (V > 0.01) { waterbad(ctx, 1380, 700, 260, V, '20 °C'); gistFles(ctx, 1380, 640, 0.75, V, 0.2, t); waterbad(ctx, 1700, 700, 260, V, '35 °C'); gistFles(ctx, 1700, 640, 0.75, V, 0.85, t); chip(ctx, 'één ding verandert, de rest blijft gelijk', 1540, 330, C.goud, q.on('gelijk', 1), 26); }
    tag(ctx, 'film: Onderzoek doen', 1540, 230, C.teal, q.on('Onderzoek', 2), 'center', 26); chip(ctx, 'past bij tijd, materiaal en voorkennis', 660, 720, C.groen, q.on('materiaal', 1), 28); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); tafel(ctx); persoon(ctx, 'noor', 220, 880, 400, { t, kijk: 1, uit: 'blij', outfit: 'practicum' }); persoon(ctx, 'yasmin', 400, 880, 400, { t, outfit: 'practicum', kijk: 1, uit: q.on('roept', 1) > 0.5 ? 'verbaasd' : 'neutraal', pose: q.on('roept', 1) > 0.5 ? 'wijsOmhoog' : 'staan' });
    waterbad(ctx, 760, 700, 260, 1, '20 °C'); gistFles(ctx, 760, 640, 0.75, 1, 0.15, t); waterbad(ctx, 1080, 700, 260, 1, '35 °C'); gistFles(ctx, 1080, 640, 0.75, 1, 0.35 + 0.55 * clamp(t / 3, 0, 1), t); chip(ctx, 'bijna slap', 760, 260, C.koraal, q.on('slap', 1), 26);
    persoon(ctx, 'visser', 1560, 880, 460, { t, a: q.on('roept', 1, 0.3), outfit: 'practicum', kijk: -1, uit: 'neutraal' }); bubbel(ctx, 600, 300, 'klopt onze uitkomst?', '#F2F2EE', q.on('klopt', 1), 30); vraagteken(ctx, 1780, 300, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); persoon(ctx, 'visser', 1560, 880, 460, { t, outfit: 'practicum', kijk: -1, uit: 'blij', pose: 'wijs' }); persoon(ctx, 'noor', 260, 880, 400, { t, kijk: 1, uit: 'neutraal', pose: 'denk', outfit: 'practicum' }); persoon(ctx, 'yasmin', 440, 880, 400, { t, kijk: 1, uit: 'neutraal', outfit: 'practicum' });
    bubbel(ctx, 1220, 280, 'wat had je verwacht?', '#F2F2EE', q.on('vraag', 1), 30); chip(ctx, 'ja of nee: het denken stopt', 960, 400, C.koraal, q.on('stopt', 1) * (1 - q.on('enzymen', 1)), 26);
    tag(ctx, 'net als voorspellen, waarnemen, verklaren', 860, 220, C.teal, q.on('voorspellen', 1), 'center', 26);
    chip(ctx, 'enzymen: sneller als het warmer is, tot ± 40 °C', 900, 420, C.goud, q.on('enzymen', 1), 26); chip(ctx, 'ontsnapt er gas?', 900, 510, C.koraal, q.on('ontsnapt', 1), 26);
    regel(ctx, 'laten worstelen, niet laten verdrinken', 960, 640, q.on('worstelen', 1), C.goud, 40, 'center', 800); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); verslag(ctx, 380, 230, 'A', q.on('Groep', 1)); verslag(ctx, 1180, 230, 'B', q.on('Groep', 2)); chip(ctx, 'mooie grafiek, geen uitleg', 560, 760, C.oker, q.on('niets', 1), 26); chip(ctx, 'ballon lekte · goed uitgelegd', 1360, 760, C.teal, q.on('misging', 1), 26); vraagteken(ctx, 960, 470, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); verslag(ctx, 200, 260, 'B', 1); ['vraag', 'opzet', 'uitvoering', 'conclusie', 'discussie'].forEach((n, i) => { const a = q.on(n, 1); if (a <= 0.01) return; stapKaartL(ctx, 700, 230 + i * 100, 520, n, a); });
    chip(ctx, 'niet alleen het resultaat', 1500, 300, C.goud, q.on('resultaat', 1), 28); chip(ctx, 'snappen waarom het misging = veel geleerd', 1500, 640, C.groen, q.on('geleerd', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('regel', 1, 0.8); tafel(ctx, 820);     persoon(ctx, 'lotte', 260, 880, 400, { t, uit: 'blij' }); persoon(ctx, 'daan', 440, 880, 370, { t, uit: 'blij' }); chip(ctx, 'een echte vraag + een leraar die terugvraagt', 520, 230, C.goud, q.on('terugvraagt', 1) * (1 - R), 28);
    dienblad(ctx, 1200, 780, R, t); naamBij(ctx, 'toa', 'technisch onderwijsassistent', 1200, 520, q.on('toa', 1), 'center'); persoon(ctx, 'visser', 1720, 880, 440, { t, a: clamp(R * 3 - 2, 0, 1), outfit: 'practicum', kijk: -1, uit: 'blij' }); },
  s15(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'lerarenopleiding', 960, 260, C.teal, q.on('lerarenopleiding', 1), 'center', 36); chip(ctx, 'biologie', 700, 380, C.text2, q.on('biologie', 1), 30); chip(ctx, 'hoe je anderen laat leren', 1220, 380, C.goud, q.on('anderen', 1), 30); chip(ctx, 'een practicum opzetten', 960, 480, C.groen, q.on('practicum', 1), 30);
    persoon(ctx, 'visser', 960, 880, 340, { t, outfit: 'practicum', uit: 'blij', pose: 'wijs' }); }
});
// regel van de beoordelingslijst
function stapKaartL(ctx, x, y, w, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 80, 12); shape(ctx, rgba(C.teal, 0.16), C.teal, 2); text(ctx, s2, x + 30, y + 52, fTekst(32, 700), C.text, 'left'); vink_(ctx, x + w - 50, y + 40, 16, 1); ctx.restore(); }
