
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
// Wat word jij? · Medische beeldvorming 1 · In het lichaam kijken — eigen tekeningen (24 okt 2026)
// Röntgen, MRI, echo en CT. Beelden in grijswaarden zoals op de scanner; schema's op het gewone navy.

const MB = { bot: '#E6DCC6', botR: '#B8AC94', huid: '#F1D2B8', spier: '#C9786A', vet: '#E8C98A', plaat: '#0B1018', rand: '#5A6478', gips: '#F2F2EE' };
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 26) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function verwijs(ctx, s2, x, y, a) { tag(ctx, 'film: ' + s2, x, y, C.teal, a, 'center', 26); }
function grijs(v) { const k = Math.round(clamp(v, 0, 1) * 255); return `rgb(${k},${k},${k})`; }
// liggend castpersonage: voeten op (x,y), hoofd naar links (kop = -1) of rechts (kop = 1)
function liggend(ctx, id, x, y, h, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate((o.kop || -1) * Math.PI / 2); persoon(ctx, id, 0, 0, h, Object.assign({ uit: 'neutraal' }, o, { a })); ctx.restore(); }
// brancard / scannerbed: bovenkant matras op y
function brancard(ctx, x, y, w, a = 1, wielen = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 34, 12); shape(ctx, '#DDE6EE', '#B8C8D8', 2);
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x + 10, y + 34, w - 20, 14); if (wielen) { ctx.fillRect(x + 30, y + 48, 12, 110); ctx.fillRect(x + w - 42, y + 48, 12, 110); circ(ctx, x + 36, y + 166, 12, '#4A5266'); circ(ctx, x + w - 36, y + 166, 12, '#4A5266'); } ctx.restore(); }

// ===== tuin met omgevallen ladder =====
function tuin(ctx, a = 1, ladder = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3F6B45'; ctx.fillRect(0, 760, 1000, 120); ctx.fillStyle = '#345A3A'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(60 + i * 115, 760, 80, 46, 0, Math.PI, 0); ctx.fill(); }
  // ladder ligt schuin tegen de grond
  if (ladder > 0.01) { ctx.save(); ctx.globalAlpha *= ladder; ctx.translate(560, 790); ctx.rotate(-0.22); ctx.strokeStyle = '#B8A07A'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(380, -20); ctx.moveTo(0, 30); ctx.lineTo(380, 30); ctx.stroke(); ctx.lineWidth = 8; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(k * 55, -20); ctx.lineTo(k * 55, 30); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

// ===== röntgenfoto van onderarm en pols. (x,y) = midden; breuk 0..1 = donkere lijn in het spaakbeen =====
function polsFoto(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { breuk = 0, wit = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 380 * s, h = 520 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, MB.plaat, MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  // weke delen: vage grijze arm
  ctx.fillStyle = 'rgba(150,160,170,0.28)'; ctx.beginPath(); ctx.moveTo(-120, 280); ctx.lineTo(-108, -10); ctx.quadraticCurveTo(-140, -150, -120, -290); ctx.lineTo(130, -290); ctx.quadraticCurveTo(150, -150, 112, -10); ctx.lineTo(120, 280); ctx.closePath(); ctx.fill();
  ctx.filter = 'blur(1.5px)'; ctx.fillStyle = `rgba(235,240,245,${0.9 * wit})`;
  // spaakbeen (links in beeld, breder bij de pols) en ellepijp
  ctx.beginPath(); ctx.moveTo(-70, 280); ctx.lineTo(-58, 40); ctx.quadraticCurveTo(-96, -10, -92, -40); ctx.lineTo(-10, -40); ctx.quadraticCurveTo(-10, 0, -22, 40); ctx.lineTo(-24, 280); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30, 280); ctx.lineTo(36, 30); ctx.quadraticCurveTo(30, -10, 44, -30); ctx.lineTo(80, -30); ctx.quadraticCurveTo(84, 0, 66, 30); ctx.lineTo(66, 280); ctx.closePath(); ctx.fill();
  // handwortelbeentjes
  [[-70, -78, 26, 22], [-28, -82, 24, 22], [14, -82, 22, 20], [52, -74, 22, 20], [-62, -128, 24, 22], [-20, -132, 22, 22], [20, -132, 22, 20], [58, -124, 20, 20]].forEach(([bx, by, rx, ry]) => { ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, 0, 0, 6.283); ctx.fill(); });
  // middenhandsbeentjes
  [-84, -40, 4, 44, 80].forEach((bx, i) => { ctx.save(); ctx.translate(bx, -170); ctx.rotate((i - 2) * -0.08); roundRect(ctx, -12, -150, 24, 150, 12); ctx.fill(); ctx.restore(); });
  ctx.filter = 'none';
  // merg iets donkerder
  ctx.fillStyle = 'rgba(11,16,24,0.18)'; ctx.fillRect(-52, 60, 18, 220); ctx.fillRect(44, 60, 12, 220);
  if (breuk > 0.01) { ctx.strokeStyle = rgba('#0B1018', 0.95 * breuk); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-98, -2); ctx.lineTo(-70, 6); ctx.lineTo(-50, -4); ctx.lineTo(-16, 8); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== röntgenfoto van de knie (naar Wat is er met die knie?): botten wit, banden onzichtbaar; spook = waar de banden zouden zitten =====
function knieFoto(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { spook = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 190 * s, y - 260 * s, 380 * s, 520 * s, 14); shape(ctx, MB.plaat, MB.rand, 3);
  ctx.save(); roundRect(ctx, x - 190 * s, y - 260 * s, 380 * s, 520 * s, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s * 0.55, s * 0.55);
  ctx.fillStyle = 'rgba(150,160,170,0.25)'; ctx.fillRect(-250, -500, 500, 1000);
  ctx.filter = 'blur(2px)'; ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.beginPath(); ctx.moveTo(-55, -480); ctx.lineTo(-62, -210); ctx.quadraticCurveTo(-150, -140, -155, -55); ctx.bezierCurveTo(-155, 12, -45, 14, -22, -38); ctx.quadraticCurveTo(0, -60, 22, -38); ctx.bezierCurveTo(45, 14, 155, 12, 155, -55); ctx.quadraticCurveTo(150, -140, 62, -210); ctx.lineTo(55, -480); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-165, 48); ctx.quadraticCurveTo(0, 30, 165, 48); ctx.lineTo(150, 100); ctx.quadraticCurveTo(70, 150, 52, 220); ctx.lineTo(46, 480); ctx.lineTo(-46, 480); ctx.lineTo(-52, 220); ctx.quadraticCurveTo(-70, 150, -150, 100); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(160, 140, 26, 22, 0, 0, 6.283); ctx.fill(); ctx.fillRect(146, 150, 26, 330); ctx.filter = 'none';
  if (spook > 0.01) { ctx.globalAlpha *= spook; ctx.setLineDash([14, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-24, 40); ctx.lineTo(46, -62); ctx.moveTo(26, 52); ctx.lineTo(-44, -56); ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ===== röntgenopstelling: buis boven, doorsnede van de onderarm, plaat onder. u = stralen lopen (0..1) =====
// doorsnede arm: huid/vet, spier, twee botten. Stralen door bot stoppen; de plaat wordt zwart waar straling aankomt.
function rontgenOpstelling(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { u = 1, plaat = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  // buis
  roundRect(ctx, x - 110, y - 330, 220, 90, 18); shape(ctx, '#8A93A6', '#C9D2DE', 2.5); circ(ctx, x, y - 240, 16, C.goud);
  // arm (doorsnede) op y
  const armY = y, R = 150, bones = [[-55, 0, 42, 34], [60, 6, 34, 30]];
  ctx.beginPath(); ctx.ellipse(x, armY, R + 18, 104, 0, 0, 6.283); shape(ctx, MB.huid, '#C8A488', 2.5); ctx.beginPath(); ctx.ellipse(x, armY, R - 4, 88, 0, 0, 6.283); shape(ctx, MB.spier, '#A85A4C', 2);
  bones.forEach(([bx, by, rx, ry]) => { ctx.beginPath(); ctx.ellipse(x + bx, armY + by, rx, ry, 0, 0, 6.283); shape(ctx, MB.bot, MB.botR, 3); });
  // plaat
  const pY = y + 220, pW = 520; roundRect(ctx, x - pW / 2, pY, pW, 40, 8); shape(ctx, '#C9CED6', '#8A93A6', 2);
  // stralen: van de buis recht naar beneden (evenwijdig, vereenvoudigd)
  const N = 13; for (let i = 0; i < N; i++) { const rx = x - 240 + i * 40; let stop = pY; let hitBone = false;
    for (const [bx, by, brx, bry] of bones) { const dx = (rx - x - bx) / brx; if (Math.abs(dx) < 0.95) { stop = armY + by - bry * Math.sqrt(1 - dx * dx); hitBone = true; } }
    if (!hitBone && Math.abs(rx - x) < R + 18) stop = armY + 110;
    const y0 = y - 230, yEnd = y0 + (stop - y0) * clamp(u * 1.3, 0, 1); ctx.strokeStyle = rgba(C.goud, 0.85); ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(rx, y0); ctx.lineTo(rx, yEnd); ctx.stroke(); ctx.setLineDash([]);
    const inLijf = Math.abs(rx - x) < R + 18;
    if (!hitBone && u > 0.6) { ctx.strokeStyle = rgba(C.goud, inLijf ? 0.4 : 0.85); ctx.lineWidth = inLijf ? 2.5 : 4; ctx.setLineDash([12, 8]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(rx, armY + 110); ctx.lineTo(rx, pY); ctx.stroke(); ctx.setLineDash([]); }
    if (plaat > 0.01 && u > 0.7) { ctx.fillStyle = hitBone ? rgba('#F2F2EE', plaat) : inLijf ? rgba('#6A707A', plaat) : rgba('#0B1018', 0.95 * plaat); ctx.fillRect(rx - 20, pY + 2, 40, 36); } }
  ctx.restore(); return { plaatY: pY, armY, bones: bones.map(([bx, by]) => ({ x: x + bx, y: armY + by })) }; }

// grijsschaal lucht - vet - spier/band - bot
function grijsSchaal(ctx, x, y, a = 1, hl = -1, aan = [1, 1, 1, 1], d = 215) { if (a <= 0.01) return; const T = [['lucht', 0.04, 'bijna zwart'], ['vet', 0.38, 'grijs'], ['spier en band', 0.5, 'grijs'], ['bot', 0.93, 'wit']];
  T.forEach(([n, v, m], i) => { const ai = a * aan[i]; if (ai <= 0.01) return; ctx.save(); ctx.globalAlpha *= ai; const xx = x + i * d; roundRect(ctx, xx, y, 200, 110, 14); shape(ctx, grijs(v), hl === i ? C.goud : C.line, hl === i ? 5 : 2); ctx.restore(); naamBij(ctx, n, m, xx + 100, y + 160, ai, 'center'); }); }

// kalender-strook: één week (7 vakjes) gevuld
function weekStrook(ctx, x, y, a = 1, k = 7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 7; i++) { roundRect(ctx, x + i * 58, y, 48, 48, 8); shape(ctx, i < k ? rgba(C.goud, 0.7) : '#2A3A58', C.line, 1.5); } ctx.restore(); }

// ===== MRI =====
// scanner van opzij: grote ring met tunnel, bed dat erin schuift. Persoon ligt met hoofd naar rechts (de knie in de ring).
function mriScanner(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { schuif = 0, id = 'lotte', t = 0, label = true, naam = 'MRI-SCANNER', outfit } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // achterkant ring
  roundRect(ctx, -160, -330, 320, 520, 70); shape(ctx, '#C9D2DE', '#8FA0B5', 2.5);
  ctx.fillStyle = '#1A2740'; roundRect(ctx, -160, -120, 320, 150, 40); ctx.fill();
  // bed en persoon
  const bx = -560 + schuif * 380; ctx.fillStyle = '#7A8294'; ctx.fillRect(-640, 70, 640, 22); ctx.fillRect(-600, 92, 30, 120); ctx.fillRect(-80, 92, 30, 120);
  roundRect(ctx, bx - 100, 10, 700, 30, 12); shape(ctx, '#DDE6EE', '#B8C8D8', 2);
  ctx.save(); ctx.beginPath(); ctx.rect(-1000, -400, 840, 700); ctx.rect(160, -400, 900, 700); ctx.clip('evenodd');
  liggend(ctx, id, bx - 60, 6, 420, { kop: 1, t, outfit }); ctx.restore();
  // deel in de tunnel: alleen de rand van het bed
  ctx.strokeStyle = 'rgba(143,160,181,0.5)'; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.strokeRect(-160, -120, 320, 150); ctx.setLineDash([]);
  if (label) metaText(ctx, naam, 0, -360, C.grain, 'center', 28);
  ctx.restore(); }
function waterMolecuul(ctx, x, y, s, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-64, 46); ctx.lineTo(0, 0); ctx.lineTo(64, 46); ctx.stroke();
  circ(ctx, 0, 0, 52, '#D8645A', '#F09A8E', 3); text(ctx, 'O', 0, 16, fTekst(46, 800), '#FFFFFF', 'center');
  for (const k of [-1, 1]) { circ(ctx, k * 70, 52, 32, '#F2F2EE', hl > 0.5 ? C.goud : '#9AA3B2', hl > 0.5 ? 6 : 3); text(ctx, 'H', k * 70, 64, fTekst(32, 800), '#2A3446', 'center'); }
  ctx.restore(); }
// één kompasnaaldje: hoek an (0 = omhoog)
function naald(ctx, x, y, L, an, col = C.koraal) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(L * 0.22, 0); ctx.lineTo(-L * 0.22, 0); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, L); ctx.lineTo(L * 0.22, 0); ctx.lineTo(-L * 0.22, 0); ctx.closePath(); ctx.fillStyle = '#C9CED6'; ctx.fill(); circ(ctx, 0, 0, L * 0.12, '#2A3446'); ctx.restore(); }
// raster van naaldjes. orde 0..1: van willekeurig naar (de meeste) met het veld mee; kantel 0..1: radiogolf duwt ze opzij; terug 0..1: ze zwaaien terug
function naaldVeld(ctx, x, y, nx, ny, d, a = 1, o = {}) { if (a <= 0.01) return; const { orde = 0, kantel = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const k = j * nx + i, r0 = hash(k * 7.3) * 6.283, tegen = hash(k * 3.1) < 0.3;
    const doel = tegen ? Math.PI : 0, wiebel = 0.12 * Math.sin(t * 2 + k); let an = r0 + (doel - r0) * orde + wiebel * orde;
    an += kantel * (tegen ? -1.3 : 1.3) * (0.85 + 0.15 * Math.sin(t * 9 + k));
    naald(ctx, x + i * d, y + j * d, d * 0.36, an); }
  ctx.restore(); }
function radioGolf(ctx, x1, y, x2, a = 1, t = 0, col = C.teal, amp = 22, lw = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); const n = 80; for (let k = 0; k <= n; k++) { const f = k / n, xx = x1 + (x2 - x1) * f, yy = y + Math.sin(f * 30 - t * 10) * amp; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); pijl(ctx, x2 - 10, y, x2 + 14, y, col, 1, lw, 20); ctx.restore(); }
// MRI-beeld van de knie van opzij (grijswaarden). scheur 0..1: band onderbroken + lichte vlek
function mriKnie(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { scheur = 0, hl = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 440 * s, h = 520 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#050709', MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  // weke delen
  ctx.fillStyle = grijs(0.32); ctx.beginPath(); ctx.moveTo(-150, -300); ctx.quadraticCurveTo(-180, 0, -130, 300); ctx.lineTo(150, 300); ctx.quadraticCurveTo(190, 0, 160, -300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = grijs(0.62); ctx.beginPath(); ctx.moveTo(-150, -300); ctx.quadraticCurveTo(-180, 0, -130, 300); ctx.lineTo(-112, 300); ctx.quadraticCurveTo(-160, 0, -132, -300); ctx.closePath(); ctx.fill();
  // dijbeen (boven) en scheenbeen (onder): beenmerg middelgrijs, cortex zwart
  const bot = (pad) => { ctx.beginPath(); pad(); ctx.fillStyle = grijs(0.55); ctx.fill(); ctx.strokeStyle = '#050709'; ctx.lineWidth = 9; ctx.stroke(); };
  bot(() => { ctx.moveTo(-70, -300); ctx.lineTo(-62, -120); ctx.bezierCurveTo(-110, -60, -100, 10, -30, 12); ctx.bezierCurveTo(30, 16, 110, -10, 90, -80); ctx.lineTo(62, -130); ctx.lineTo(60, -300); ctx.closePath(); });
  bot(() => { ctx.moveTo(-110, 60); ctx.quadraticCurveTo(-10, 40, 100, 60); ctx.lineTo(80, 130); ctx.lineTo(50, 300); ctx.lineTo(-50, 300); ctx.lineTo(-70, 130); ctx.closePath(); });
  // knieschijf voor (rechts in beeld = voorkant)
  ctx.beginPath(); ctx.ellipse(132, -70, 26, 62, 0.15, 0, 6.283); ctx.fillStyle = grijs(0.55); ctx.fill(); ctx.strokeStyle = '#050709'; ctx.lineWidth = 7; ctx.stroke();
  // gewrichtsvocht dun en licht
  ctx.strokeStyle = grijs(0.85); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-80, 34); ctx.quadraticCurveTo(0, 26, 86, 38); ctx.stroke();
  // voorste kruisband: donkere streep van scheenbeen (voor) naar dijbeen (achter)
  const A0 = [40, 52], A1 = [-40, -40]; ctx.lineCap = 'round'; ctx.lineWidth = 22; ctx.strokeStyle = '#0A0D12';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...A1); ctx.stroke(); }
  else { const P = u => [A0[0] + (A1[0] - A0[0]) * u, A0[1] + (A1[1] - A0[1]) * u]; ctx.beginPath(); ctx.moveTo(...A0); ctx.lineTo(...P(0.32)); ctx.moveTo(...P(0.72)); ctx.lineTo(...A1); ctx.stroke();
    const m = P(0.52); const g = ctx.createRadialGradient(m[0], m[1], 4, m[0], m[1], 50); g.addColorStop(0, `rgba(240,242,245,${0.95 * scheur})`); g.addColorStop(1, 'rgba(240,242,245,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(m[0], m[1], 50, 38, -0.8, 0, 6.283); ctx.fill(); }
  if (hl > 0.01) { ctx.strokeStyle = rgba(C.goud, hl); ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(0, 6, 82, 70, -0.8, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore(); ctx.restore(); }
function sleutels(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -40, 26, 0, 6.283); ctx.stroke();
  for (const k of [-1, 1]) { ctx.save(); ctx.rotate(k * 0.35); ctx.fillStyle = '#C9CED6'; ctx.fillRect(-7, -16, 14, 90); ctx.fillRect(7, 50, 16, 8); ctx.fillRect(7, 66, 12, 8); circ(ctx, 0, -6, 18, '#C9CED6'); ctx.restore(); } ctx.restore(); }
function bankpas(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -80, -50, 160, 100, 12); shape(ctx, '#3E6A8E', '#6A8AAE', 2); ctx.fillStyle = '#1A2740'; ctx.fillRect(-80, -30, 160, 20); roundRect(ctx, -60, 4, 30, 24, 4); shape(ctx, C.goud, null); ctx.restore(); }

// ===== ECHO =====
function echoKop(ctx, x, y, s, an = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.scale(s, s); roundRect(ctx, -22, -110, 44, 100, 14); shape(ctx, '#E8ECF0', '#9AA3B2', 2); ctx.beginPath(); ctx.moveTo(-34, -14); ctx.lineTo(34, -14); ctx.quadraticCurveTo(36, 8, 0, 10); ctx.quadraticCurveTo(-36, 8, -34, -14); shape(ctx, '#5A6478', '#3A4458', 2);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -110); ctx.quadraticCurveTo(10, -170, 50, -190); ctx.stroke(); ctx.restore(); }
// principe: echokop bovenaan, lagen weefsel, puls naar beneden en echo's terug; rechts diepte-as. p = fase 0..1 van de puls
function echoPrincipe(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { p = 0, gel = 1, toon = 1, diepte = 0, blok = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = [['huid', 46, '#E8C2A4'], ['vet', 70, '#E8D49A'], ['spier', 100, '#C9786A'], ['lever', 190, '#9A5A4A']]; let yy = y + 70; const grens = [];
  if (gel > 0.01) { ctx.save(); ctx.globalAlpha *= gel; ctx.beginPath(); ctx.ellipse(x + w / 2, y + 66, 90, 14, 0, 0, 6.283); ctx.fillStyle = rgba('#9CD6E8', 0.8); ctx.fill(); ctx.restore(); }
  L.forEach(([n, h, c]) => { ctx.fillStyle = c; ctx.fillRect(x, yy, w, h); grens.push(yy); yy += h; }); grens.push(yy);
  ctx.strokeStyle = 'rgba(26,39,64,0.6)'; ctx.lineWidth = 2; grens.forEach(g => { ctx.beginPath(); ctx.moveTo(x, g); ctx.lineTo(x + w, g); ctx.stroke(); });
  L.forEach(([n], i) => naamBij(ctx, n, '', x + 24, (grens[i] + grens[i + 1]) / 2 + 12, toon, 'left'));
  if (blok > 0.01) { ctx.save(); ctx.globalAlpha *= blok; const ry = (grens[2] + grens[3]) / 2 - 20; ctx.fillStyle = MB.bot; roundRect(ctx, x + w * 0.6, ry, 140, 40, 20); ctx.fill(); ctx.fillStyle = 'rgba(5,7,9,0.75)'; ctx.fillRect(x + w * 0.6 + 10, ry + 40, 120, grens[4] - ry - 40); naamBij(ctx, 'rib', '', x + w * 0.6 + 70, ry + 30, 1, 'center', '#2A3446'); naamBij(ctx, 'schaduw', '', x + w * 0.6 + 70, grens[4] - 40, 1, 'center'); ctx.restore(); }
  echoKop(ctx, x + w / 2, y + 62, 0.7, 0, 1);
  // puls naar beneden (koraal) en echo's terug (teal)
  const px = x + w / 2 - 70, bodem = grens[4], pyy = y + 70 + (bodem - y - 70) * p;
  if (p > 0.001 && p < 0.999) { ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); for (let k = 0; k < 4; k++) { ctx.moveTo(px - 30, pyy - k * 10); ctx.quadraticCurveTo(px, pyy - k * 10 + 10, px + 30, pyy - k * 10); } ctx.stroke(); ctx.restore(); }
  grens.slice(0, 4).forEach((g, i) => { const tg = (g - y - 70) / (bodem - y - 70); if (p > tg) { const back = g - (p - tg) * (bodem - y - 70); if (back > y + 70) { ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px + 70 - 22, back + 6); ctx.quadraticCurveTo(px + 70, back - 4, px + 70 + 22, back + 6); ctx.stroke(); } } });
  // diepte-as
  if (diepte > 0.01) { ctx.save(); ctx.globalAlpha *= diepte; pijl(ctx, x + w + 50, y + 80, x + w + 50, bodem - 10, C.line, 1, 4, 18); metaA(ctx, 'LATER TERUG', x + w + 74, bodem - 20, 1, C.grain, 'left', 24); metaA(ctx, '= DIEPER', x + w + 74, bodem + 12, 1, C.grain, 'left', 24); ctx.restore(); }
  ctx.restore(); return { grens }; }
// echobeeld (waaier). vocht 0..1 = zwarte plek; rib 0..1 = witte boog met schaduw
function echoScherm(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { vocht = 0, rib = 1, t = 0, kader = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  if (kader > 0.01) { roundRect(ctx, x - r - 30, y - 40, 2 * r + 60, r + 90, 16); shape(ctx, '#050709', MB.rand, 3); }
  const a0 = Math.PI / 2 - 0.62, a1 = Math.PI / 2 + 0.62; ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.clip();
  ctx.fillStyle = '#111418'; ctx.fillRect(x - r, y, 2 * r, r);
  // spikkels: huid en lever
  const n = 1400; for (let k = 0; k < n; k++) { const rr = r * Math.sqrt(hash(k * 1.7)), an = a0 + (a1 - a0) * hash(k * 2.9 + 1); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr; let v = rr < r * 0.14 ? 0.75 : rr < r * 0.24 ? 0.3 : 0.45 + 0.2 * hash(k * 5.3 + Math.floor(t * 12));
    if (rib > 0.01 && px > x + r * 0.08 && px < x + r * 0.42 && py > y + r * 0.5) v *= 1 - 0.92 * rib;
    ctx.fillStyle = grijs(v); ctx.fillRect(px, py, 5, 4); }
  if (rib > 0.01) { ctx.strokeStyle = `rgba(245,245,245,${rib})`; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(x + r * 0.25, y + r * 0.62, r * 0.2, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
  if (vocht > 0.01) { ctx.fillStyle = `rgba(5,6,8,${0.95 * vocht})`; ctx.beginPath(); ctx.ellipse(x - r * 0.28, y + r * 0.78, r * 0.2, r * 0.07, 0.3, 0, 6.283); ctx.fill(); }
  ctx.restore(); ctx.restore(); }

// ===== CT =====
// vooraanzicht van de ring: buis draait rond, waaier stralen naar de detectorboog; doorsnede van de patiënt in het midden
function ctRing(ctx, x, y, R, a = 1, o = {}) { if (a <= 0.01) return; const { an = 0, stralen = 1, id = 'henk' } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, R + 70, 0, 6.283); ctx.arc(x, y, R, 0, 6.283, true); ctx.fillStyle = '#C9D2DE'; ctx.fill('evenodd'); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.fillStyle = '#1A2740'; ctx.fill();
  // bed en lichaam (doorsnede)
  ctx.fillStyle = '#DDE6EE'; roundRect(ctx, x - R * 0.62, y + R * 0.38, R * 1.24, 26, 10); ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y + R * 0.08, R * 0.55, R * 0.3, 0, 0, 6.283); shape(ctx, MB.huid, '#C8A488', 2);
  const tx = x + Math.cos(an) * (R + 35), ty = y + Math.sin(an) * (R + 35), dx = x - Math.cos(an) * (R + 20), dy = y - Math.sin(an) * (R + 20);
  if (stralen > 0.01) { ctx.save(); ctx.globalAlpha *= stralen * 0.75; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.arc(x, y, R + 4, an + Math.PI - 0.5, an + Math.PI + 0.5); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.22); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -46, -26, 92, 52, 10); shape(ctx, '#8A93A6', '#5A6478', 2); circ(ctx, 0, 24, 9, C.goud); ctx.restore();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(x, y, R + 22, an + Math.PI - 0.5, an + Math.PI + 0.5); ctx.stroke();
  ctx.restore(); }
// brood in sneetjes; los = hoeveel het voorste sneetje los ligt
function brood(ctx, x, y, s, a = 1, los = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 7; k >= 0; k--) { const dx = k * 34 + (k === 0 ? -los * 90 : 0); ctx.beginPath(); ctx.moveTo(dx - 90, 80); ctx.lineTo(dx - 96, -30); ctx.bezierCurveTo(dx - 110, -110, dx + 110, -110, dx + 96, -30); ctx.lineTo(dx + 90, 80); ctx.closePath(); shape(ctx, '#E8D2A0', '#A8743A', 6); }
  ctx.restore(); }
// CT-plak van de bovenbuik, gezien vanaf de voeten: rechts van de patiënt = links in beeld.
// o.hl: {lever, maag, milt, aorta, wervel, rib}; o.breuk 0..1; o.contrast 0..1 (organen in kleur)
function ctPlak(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { hl = {}, breuk = 0, kleur = 0, RL = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const w = 760 * s, h = 560 * s;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#050709', MB.rand, 3); ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  const g = (v, c) => kleur > 0.01 ? _mixHex(_hexG(v), c, kleur * 0.55) : _hexG(v);
  // lichaam: vet-rand en spieren
  ctx.beginPath(); ctx.ellipse(0, 10, 330, 230, 0, 0, 6.283); ctx.fillStyle = grijs(0.3); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 14, 296, 198, 0, 0, 6.283); ctx.fillStyle = grijs(0.42); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 18, 270, 178, 0, 0, 6.283); ctx.fillStyle = grijs(0.33); ctx.fill();
  // ruggenmerg-spieren achter
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 62, 168, 52, 40, 0, 0, 6.283); ctx.fillStyle = grijs(0.48); ctx.fill(); }
  // lever (links in beeld)
  const orgaan = (pad, v, c, key) => { ctx.beginPath(); pad(); ctx.fillStyle = g(v, c); ctx.fill(); if ((hl[key] || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl[key]); ctx.lineWidth = 6; ctx.stroke(); } };
  orgaan(() => { ctx.moveTo(-250, -40); ctx.bezierCurveTo(-240, -150, -120, -170, -30, -140); ctx.bezierCurveTo(10, -110, -10, -40, -50, 0); ctx.bezierCurveTo(-80, 60, -120, 130, -170, 140); ctx.bezierCurveTo(-240, 120, -262, 40, -250, -40); }, 0.6, '#B8645A', 'lever');
  // maag (rechts in beeld, voor) met lucht bovenin
  orgaan(() => { ctx.moveTo(20, -120); ctx.bezierCurveTo(80, -160, 190, -150, 200, -80); ctx.bezierCurveTo(205, -20, 150, 20, 90, 10); ctx.bezierCurveTo(40, 0, 10, -60, 20, -120); }, 0.45, '#D8B46A', 'maag');
  ctx.beginPath(); ctx.ellipse(115, -128, 70, 18, 0, 0, 6.283); ctx.fillStyle = '#050709'; ctx.fill();
  // milt (rechts in beeld, achter)
  orgaan(() => { ctx.moveTo(190, 10); ctx.bezierCurveTo(250, 20, 262, 100, 220, 140); ctx.bezierCurveTo(190, 160, 160, 120, 170, 70); ctx.bezierCurveTo(175, 40, 170, 15, 190, 10); }, 0.58, '#8C6AB8', 'milt');
  // wervel (wit) en aorta (rond, iets naar rechts in beeld = links van de patiënt)
  ctx.beginPath(); ctx.arc(0, 112, 46, 0, 6.283); ctx.fillStyle = grijs(0.9); ctx.fill(); ctx.beginPath(); ctx.moveTo(-20, 150); ctx.lineTo(20, 150); ctx.lineTo(10, 200); ctx.lineTo(-10, 200); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.arc(0, 168, 13, 0, 6.283); ctx.fillStyle = grijs(0.35); ctx.fill();
  if ((hl.wervel || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl.wervel); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 112, 50, 0, 6.283); ctx.stroke(); }
  orgaan(() => { ctx.arc(26, 46, 26, 0, 6.283); }, 0.55, '#E05A4A', 'aorta');
  // holle ader naast de lever
  ctx.beginPath(); ctx.ellipse(-40, 50, 22, 16, 0, 0, 6.283); ctx.fillStyle = grijs(0.5); ctx.fill();
  // ribben rondom (witte doorsneden)
  const ribP = []; for (let k = 0; k < 14; k++) { const an = -Math.PI * 0.95 + k * (Math.PI * 1.9 / 13); if (Math.abs(an - Math.PI / 2) < 0.5 || Math.abs(an + Math.PI / 2) < 0.12) continue; const rx = Math.cos(an) * 285, ry = 12 + Math.sin(an) * 188; ribP.push([rx, ry, an]); }
  ribP.forEach(([rx, ry, an], i) => { ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2); roundRect(ctx, -26, -8, 52, 16, 8); ctx.fillStyle = grijs(0.92); ctx.fill();
    if ((hl.rib || 0) > 0.01) { ctx.strokeStyle = rgba(C.goud, hl.rib); ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); });
  // breukjes in twee ribben links in beeld = rechterzij van Henk (hij viel op zijn rechterzij)
  if (breuk > 0.01) { [ribP[1], ribP[2]].forEach(([rx, ry, an]) => { ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2); ctx.fillStyle = '#050709'; ctx.fillRect(-3, -12, 6, 24); ctx.restore(); circ(ctx, rx, ry, 34, null, rgba(C.koraal, breuk), 5); }); }
  ctx.restore();
  if (RL > 0.01) { ctx.save(); ctx.globalAlpha *= RL; text(ctx, 'R', x - w / 2 + 34, y - h / 2 + 52, fTekst(40, 800), C.goud, 'center'); text(ctx, 'L', x + w / 2 - 34, y - h / 2 + 52, fTekst(40, 800), C.goud, 'center'); ctx.restore(); }
  ctx.restore(); }
function _hexG(v) { const k = Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0'); return '#' + k + k + k; }
// kijkrichting: Henk ligt (hoofd van ons af gezien als bovenaanzicht), een oog bij zijn voeten
function oog(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(0, -30, 40, 0); ctx.quadraticCurveTo(0, 30, -40, 0); shape(ctx, '#F2F2EE', '#9AA3B2', 3); circ(ctx, 0, 0, 13, '#3E6A8E'); circ(ctx, 0, 0, 6, '#0B1018'); ctx.restore(); }
// gips om een pols: dikke witte koker rond de hand van een persoon
function gips(ctx, p, a = 1, r = 20) { if (a <= 0.01 || !p) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(p.x, p.y); ctx.rotate((p.ang || 0)); roundRect(ctx, -r * 3.4, -r, r * 3.8, r * 2, r * 0.8); shape(ctx, MB.gips, '#C9CED6', 2); ctx.restore(); }

// kleine thoraxfoto: zwarte longen, witte ribben en wervelkolom
function longFoto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 300 * s, h = 340 * s; roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, MB.plaat, MB.rand, 3);
  ctx.save(); roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); ctx.clip(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(150,160,170,0.35)'; ctx.beginPath(); ctx.ellipse(0, 20, 140, 170, 0, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#0B1018'; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 62, 10, 50, 120, k * 0.08, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = 'rgba(200,205,212,0.6)'; ctx.beginPath(); ctx.ellipse(18, 70, 40, 52, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = 'rgba(235,240,245,0.85)'; ctx.lineWidth = 6; for (let i = 0; i < 7; i++) { const yy = -110 + i * 34; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 10, yy); ctx.quadraticCurveTo(k * 120, yy - 10, k * 128, yy + 30); ctx.stroke(); } }
  ctx.fillStyle = 'rgba(235,240,245,0.9)'; ctx.fillRect(-9, -170, 18, 340); ctx.restore(); ctx.restore(); }
// blote huid met een klodder gel en de echokop erop
function echoOpHuid(ctx, x, y, a = 1, gel = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y + 6, 74, 22, 0, 0, 6.283); ctx.fillStyle = CAST.henk.huid; ctx.fill();
  if (gel > 0.01) { ctx.save(); ctx.globalAlpha *= gel; ctx.beginPath(); ctx.ellipse(x, y - 2, 46, 11, 0, 0, 6.283); ctx.fillStyle = rgba('#9CD6E8', 0.9); ctx.fill(); ctx.restore(); }
  echoKop(ctx, x, y - 6, 0.6, 0, 1); ctx.restore(); }
// Wat word jij? · Medische beeldvorming 1 · In het lichaam kijken — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Dr. Kim als radioloog; Opa Henk, Noor, Lotte).
// Rode draad: één dag van Dr. Kim, met de beelden van Henk (pols, buik) en Lotte (knie).

// eerst het oude weg, dan het nieuwe (één beeld tegelijk)
function uitV(q, t, w, n = 1) { return 1 - clamp((t - q.at(w, n)) / 0.4, 0, 1); }
function inV(q, t, w, n = 1) { return clamp((t - q.at(w, n) - 0.4) / 0.5, 0, 1); }

Object.assign(SCENES, {
  title(ctx, t) { ctPlak(ctx, 1450, 640, 0.6, 1, { kleur: 0.35 + 0.1 * Math.sin(t * 0.8) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('röntgenfoto', 1), L = q.on('Lotte', 1, 0.3);
    tuin(ctx, 1 - F * 0.75, 1); const val = 1 - clamp((t - q.at('röntgenfoto', 1)) / 0.4, 0, 1); liggend(ctx, 'henk', 110, 735, 410, { kop: 1, t, a: val, uit: 'verbaasd' }); persoon(ctx, 'henk', 200, 880, 430, { t, a: 1 - val, uit: 'neutraal', pose: 'vasthouden', kijk: 1 });
    metaA(ctx, 'IN DE TUIN', 120, 220, 1 - F, C.grain); naamBij(ctx, 'Opa Henk', 'pols en zij', 200, val > 0.5 ? 560 : 380, 1, 'center');
    polsFoto(ctx, 570, 450, 0.75, F, { breuk: q.on('breuk', 1) }); naamBij(ctx, 'breuk', '', 520, 520, q.on('breuk', 1), 'center', C.koraal);
    persoon(ctx, 'kim', 900, 880, 430, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'wijs', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 900, 360, q.on('Kim', 1, 0.3), 'center');
    persoon(ctx, 'lotte', 1230, 880, 400, { t, a: L, outfit: 'sport', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Lotte', 'kruisband', 1230, 380, L, 'center');
    knieFoto(ctx, 1570, 450, 0.75, q.on('röntgenfoto', 2)); chip(ctx, 'kruisband?', 1570, 780, C.goud, q.on('niets', 1), 28);
    vraagteken(ctx, 1790, 300, q.on('Waarom', 1), 110); },

  // ---------- H1 Röntgen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a: bot houdt meer straling tegen'); const A = uitV(q, t, 'Henk', 1), B = inV(q, t, 'Henk', 1) * uitV(q, t, 'longfoto', 1), Cc = inV(q, t, 'longfoto', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const u = clamp((t - q.at('stuurt', 1)) / 2.5, 0, 1);
      rontgenOpstelling(ctx, 560, 520, 1, { u, plaat: q.on('donker', 1), t });
      naamBij(ctx, 'röntgenbuis', '', 700, 255, q.on('röntgenapparaat', 1), 'left'); naamBij(ctx, 'plaat', 'zwart · grijs · wit', 840, 790, q.on('plaat', 1), 'left');
      naamBij(ctx, 'bot', '', 505, 470, q.on('Bot', 2), 'center'); naamBij(ctx, 'spier', '', 560, 600, q.on('Spieren', 1), 'center');
      const hl = t > q.at('Bot', 2) ? 3 : t > q.at('Spieren', 1) ? 2 : t > q.at('Lucht', 1) ? 0 : -1;
      grijsSchaal(ctx, 1010, 300, 1, hl, [q.on('Lucht', 1), q.on('vet', 1), q.on('banden', 1), q.on('Bot', 2)]);
      chip(ctx, 'bot zit vol kalk', 1655, 560, C.text2, q.on('kalk', 1), 26); longFoto(ctx, 1110, 660, 0.5, q.on('longen', 1)); naamBij(ctx, 'longen', 'bijna zwart', 1210, 680, q.on('longen', 1), 'left'); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; polsFoto(ctx, 560, 470, 0.82, 1, { breuk: 1 }); naamBij(ctx, 'pols van Henk', '', 560, 235, 1, 'center');
      naamBij(ctx, 'breuk', 'straling gaat erdoor', 560, 760, q.on('breuk', 1), 'center', C.koraal);
      knieFoto(ctx, 1380, 470, 0.82, q.on('kruisband', 1), { spook: q.on('weg', 1) }); naamBij(ctx, 'knie', '', 1380, 235, q.on('kruisband', 1), 'center');
      naamBij(ctx, 'kruisband?', 'zelfde grijs als spier en vet', 1380, 790, q.on('grijs', 2), 'center', C.goud); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; polsFoto(ctx, 560, 470, 0.82, 0.35, { breuk: 1 }); knieFoto(ctx, 1380, 470, 0.82, 0.35);
      regel(ctx, 'longfoto ≈ één week', 960, 380, 1, C.goud, 46, 'center', 700); weekStrook(ctx, 757, 440, 1, Math.round(7 * clamp((t - q.at('week', 1)) / 1.5, 0, 1)));
      longFoto(ctx, 960, 700, 0.5, 1); naamBij(ctx, 'straling uit je omgeving', 'uit de grond en uit de ruimte', 960, 560, q.on('grond', 1), 'center'); ctx.restore(); } },

  // ---------- H2 MRI ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const A = uitV(q, t, 'bestaat', 1), B = inV(q, t, 'bestaat', 1) * uitV(q, t, 'gezonde', 1), D = inV(q, t, 'gezonde', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; mriScanner(ctx, 1150, 600, 0.9, { schuif: clamp(t / 4, 0, 1), id: 'lotte', t, outfit: 'sport' });
      chip(ctx, 'geen röntgenstraling', 520, 300, C.teal, q.on('geen', 1), 30); chip(ctx, 'een heel sterke magneet', 520, 380, C.goud, q.on('magneet', 1), 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const k = q.on('kompasnaaldje', 1);
      waterMolecuul(ctx, 330, 430, 1.3, 1, k); naamBij(ctx, 'watermolecuul', 'twee waterstofatomen', 330, 600, 1, 'center');
      naamBij(ctx, 'kern = kompasnaaldje', '', 330, 250, k, 'center', C.goud); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k * (1 - q.on('alle', 1)); naald(ctx, 540, 450, 70, 0.7 + 0.2 * Math.sin(t)); ctx.restore(); }
      const orde = clamp((t - q.at('meer', 1)) / 1.5, 0, 1), kantel = clamp((t - q.at('duwt', 1)) / 0.6, 0, 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1));
      naaldVeld(ctx, 840, 290, 6, 5, 104, q.on('alle', 1), { orde, kantel, t });
      const M = q.on('meer', 1); pijl(ctx, 700, 720, 700, 290, C.goud, M, 8, 28); naamBij(ctx, 'magneetveld', '', 700, 260, M, 'center', C.goud);
      chip(ctx, 'tienduizenden keren sterker dan de aarde', 1110, 820, C.goud, q.on('aarde', 1) * (1 - q.on('Dan', 2, 0.4)), 28);
      radioGolf(ctx, 840, 790, 1350, q.on('radiogolf', 1) * (1 - q.on('aarde', 1) * 0) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), t, C.teal, 18, 5);
      if (q.on('radiogolf', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)); ctx.fillStyle = C.bgSchema; ctx.fillRect(700, 760, 1200, 110); ctx.restore(); radioGolf(ctx, 840, 800, 1350, q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), t, C.teal, 18, 5); naamBij(ctx, 'radiogolf', '', 1400, 812, q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), 'left', C.teal); }
      radioGolf(ctx, 1500, 400, 1760, q.on('radiosignaal', 1), t, C.groen, 14, 5); naamBij(ctx, 'radiosignaal', 'terug naar de scanner', 1630, 480, q.on('radiosignaal', 1), 'center', C.groen);
      chip(ctx, 'water, vet, stevig weefsel: elk een ander signaal', 1260, 820, C.text2, q.on('stevig', 1), 26); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; mriKnie(ctx, 620, 480, 1, 1, { scheur: q.on('onderbroken', 1), hl: q.on('vlek', 1) }); naamBij(ctx, 'knie van Lotte', 'MRI · van opzij', 620, 190, 1, 'center');
      naamBij(ctx, 'kruisband', 'gezond: donkere streep', 900, 420, 1, 'left'); naamBij(ctx, 'lichte vlek', '', 900, 540, q.on('vlek', 1), 'left', C.goud);
      persoon(ctx, 'lotte', 1500, 880, 420, { t, outfit: 'sport', kijk: -1, uit: 'neutraal' }); vraagteken(ctx, 1720, 330, q.on('Waardoor', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: vocht geeft veel signaal'); const V = uitV(q, t, 'Zo', 1), Z = inV(q, t, 'Zo', 1);
    mriKnie(ctx, 780, 490, 1, 1, { scheur: 1, hl: 1 - Z });
    chip(ctx, 'vocht en bloed: veel waterstof', 780, 820, C.goud, q.on('vocht', 1) * V, 28); chip(ctx, 'banden · kraakbeen · menisci', 780, 820, C.teal, Z * q.on('banden', 1), 28);
    persoon(ctx, 'kim', 300, 880, 440, { t, outfit: 'lab', pose: 'wijs', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 300, 340, q.on('Kim', 1), 'center');
    klokje(ctx, 1360, 380, 56, clamp((t - q.at('duurt', 1)) / 2, 0, 1) * 0.5, q.on('duurt', 1)); naamBij(ctx, 'al gauw een half uur', '', 1440, 394, q.on('duurt', 1), 'left');
    chip(ctx, 'hard kloppend geluid', 1560, 520, C.text2, q.on('kloppend', 1), 28);
    const M = q.on('metaal', 1); sleutels(ctx, 1300, 690, 0.9, M); bankpas(ctx, 1700, 690, 0.9, q.on('bankpas', 1)); kruis(ctx, 1300, 690, 50, q.on('sleutels', 1)); kruis(ctx, 1700, 690, 50, q.on('bankpas', 1));
    naamBij(ctx, 'sleutel: metaal', '', 1300, 610, q.on('sleutels', 1), 'center'); naamBij(ctx, 'bankpas', 'strip gewist', 1700, 600, q.on('bankpas', 1), 'center');
    naamBij(ctx, 'niet mee de ruimte in', 'magneet staat altijd aan', 1510, 815, M, 'center', C.koraal); },

  // ---------- H3 Echo ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('grens', 1);
    metaA(ctx, 'SPOEDEISENDE HULP', 120, 200, 1);
    persoon(ctx, 'kim', 1010, 880, 440, { t, outfit: 'lab', pose: 'wijs', kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 1010, 380, 1, 'center');
    brancard(ctx, 140, 640, 760); liggend(ctx, 'henk', 860, 598, 410, { kop: -1, t, uit: 'neutraal' });
    echoOpHuid(ctx, 700, 572, q.on('echokop', 1), q.on('gel', 1));
    persoon(ctx, 'noor', 300, 880, 390, { t, a: q.on('Noor', 1, 0.3), pose: 'vasthouden', kijk: 1, uit: 'blij' });
    naamBij(ctx, 'Opa Henk', 'pijn in zijn zij', 330, 470, 1 - q.on('Noor', 1), 'left'); naamBij(ctx, 'Noor', 'kleindochter', 250, 430, q.on('Noor', 1), 'center');
    const E = q.on('hoog', 1); echoPrincipe(ctx, 1150, 200, 420, E, { p: (t - q.at('grens', 1)) > 0 ? ((t - q.at('grens', 1)) / 3) % 1 : 0, gel: q.on('gel', 2), toon: q.on('grens', 1), diepte: q.on('dieper', 1), blok: q.on('bot', 1) });
    chip(ctx, 'te hoog om te horen', 1360, 160, C.koraal, E * (1 - P), 28);
    chip(ctx, 'gel: geen lucht ertussen', 1360, 790, C.teal, q.on('gel', 2), 28); chip(ctx, 'geen straling', 1360, 850, C.groen, q.on('straling', 1), 28);
    vraagteken(ctx, 1800, 240, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: vocht is zwart'); const vb = q.on('zwart', 1) * (1 - q.on('geen', 2));
    echoScherm(ctx, 620, 300, 380, 1, { vocht: vb, t }); naamBij(ctx, 'lever', '', 470, 520, 1, 'center'); naamBij(ctx, 'rib', '', 715, 446, 1, 'center'); naamBij(ctx, 'schaduw', '', 715, 640, 1, 'center');
    naamBij(ctx, 'vocht', 'zwart', 514, 650, vb, 'center', C.koraal);
    chip(ctx, 'geen zwarte plekken', 620, 790, C.groen, q.on('geen', 2), 28); vink_(ctx, 860, 776, 18, q.on('geen', 2));
    brancard(ctx, 1160, 640, 600); liggend(ctx, 'henk', 1700, 598, 410, { kop: -1, t }); chip(ctx, '71 jaar · van een ladder gevallen', 1460, 380, C.text2, q.on('eenenzeventig', 1), 28);
    tag(ctx, 'CT-scan', 1460, 300, C.goud, q.on('CT-scan', 1), 'center', 36); },

  // ---------- H4 CT ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('organen', 1, 0.6), SZ = uitV(q, t, 'Uit', 1);
    if (SZ > 0.01) { mriScanner(ctx, 1380, 560, 0.7, SZ, { schuif: 0.1 + 0.4 * clamp(t / 6, 0, 1), id: 'henk', t, naam: 'CT · ZIJAANZICHT' }); naamBij(ctx, 'bed schuift door de ring', '', 1250, 790, SZ * q.on('schuift', 1), 'center'); }
    ctRing(ctx, 520, 440, 230, 1, { an: t * 2.2, stralen: 1 }); metaA(ctx, 'CT · VOORAANZICHT', 520, 140, 1, C.grain, 'center');
    naamBij(ctx, 'röntgenbuis draait rond', '', 520, 790, q.on('draait', 1), 'center');
    chip(ctx, 'CT buik ≈ 100 × longfoto, of meer', 520, 850, C.koraal, q.on('straling', 2), 26);
    brood(ctx, 1290, 470, 1, (1 - O) * q.on('brood', 1) * (1 - SZ), clamp((t - q.at('sneetjes', 1)) / 1, 0, 1)); naamBij(ctx, 'plakjes', 'zoals sneetjes brood', 1330, 640, (1 - O) * q.on('plakjes', 1), 'center');
    ctPlak(ctx, 1300, 470, 0.74, O, { hl: { lever: q.on('lever', 1) } });
    naamBij(ctx, 'lever', 'links op het scherm', 1200, 470, q.on('links', 1), 'center', C.goud);
    persoon(ctx, 'kim', 1760, 880, 420, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'denk', kijk: -1, uit: 'neutraal' });
    vraagteken(ctx, 1760, 300, q.on('Hoe', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: gezien vanaf de voeten'); const L = q.on('lezen', 1);
    liggend(ctx, 'henk', 200, 500, 400, { kop: 1, t, a: 1 - L * 0.6 }); oog(ctx, 120, 500, 0.9, q.on('voeten', 1) * (1 - L * 0.6));
    if (q.on('voeten', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('voeten', 1) * (1 - L * 0.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(380, 380); ctx.lineTo(380, 620); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'kijk vanaf de voeten', 'buik boven', 330, 700, q.on('voeten', 1) * (1 - L * 0.6), 'center');
    ctPlak(ctx, 1200, 470, 0.95, 1, { RL: q.on('rechterkant', 1), breuk: q.on('breukje', 1), hl: { lever: q.on('lever', 1) * (1 - q.on('maag', 1) * 0.6), maag: q.on('maag', 1), milt: q.on('milt', 1), wervel: q.on('wervel', 1), aorta: q.on('aorta', 1), rib: q.on('ribben', 1) * (1 - q.on('breukje', 1)) } });
    naamBij(ctx, 'rechts van Henk', '', 860, 170, q.on('rechterkant', 1), 'left', C.goud);
    naamBij(ctx, 'lever', '', 1040, 470, q.on('lever', 1), 'center'); naamBij(ctx, 'maag', '', 1335, 430, q.on('maag', 1), 'center'); naamBij(ctx, 'milt', '', 1420, 575, q.on('milt', 1), 'center');
    naamBij(ctx, 'wervel', '', 1140, 600, q.on('wervel', 1), 'right'); naamBij(ctx, 'aorta', '', 1262, 530, q.on('aorta', 1), 'left'); naamBij(ctx, 'ribben', '', 1460, 690, q.on('ribben', 1), 'center');
    naamBij(ctx, 'breukjes', '', 950, 300, q.on('breukje', 1), 'right', C.koraal);
    persoon(ctx, 'kim', 1760, 880, 400, { t, outfit: 'lab', pose: 'staan', kijk: -1, uit: 'neutraal' });
    chip(ctx, 'lever en milt heel · geen bloed', 1200, 820, C.groen, q.on('heel', 1), 28); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const h = persoon(ctx, 'henk', 260, 880, 420, { t, uit: 'blij', pose: 'vasthouden', kijk: 1 }); gips(ctx, h.handR, q.on('gips', 1), 18);
    persoon(ctx, 'noor', 440, 880, 400, { t, a: q.on('Noor', 1, 0.3), uit: 'blij', kijk: -1 }); naamBij(ctx, 'Opa Henk en Noor', 'naar huis', 350, 400, q.on('Noor', 1), 'center');
    persoon(ctx, 'lotte', 1720, 880, 420, { t, a: q.on('Lotte', 1, 0.3), outfit: 'sport', kijk: -1 }); mriKnie(ctx, 1480, 340, 0.45, q.on('MRI', 1), { scheur: 1 });
    tag(ctx, 'röntgen en CT: wat straling tegenhoudt', 960, 330, C.goud, q.on('tegenhoudt', 1), 'center', 30); tag(ctx, 'MRI: het signaal van waterstof', 960, 430, C.teal, q.on('waterstof', 1), 'center', 30);
    tag(ctx, 'echo: teruggekaatst geluid', 960, 530, C.groen, q.on('teruggekaatst', 1), 'center', 30); regel(ctx, 'kies wat je wilt zien', 960, 660, q.on('kiest', 1), C.text, 40, 'center', 700); },
  s15(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'medisch beeldvormings- en bestralingsdeskundige', 620, 230, C.teal, q.on('beelden', 1), 'center', 30);
    regel(ctx, 'hbo · vier jaar', 620, 310, q.on('vier', 1), C.text, 36, 'center', 700); regel(ctx, 'Groningen · Haarlem · Eindhoven', 620, 370, q.on('Groningen', 1), C.text2, 30, 'center', 600);
    chip(ctx, 'radiologie', 330, 470, C.teal, q.on('radiologie', 1), 28); chip(ctx, 'nucleaire geneeskunde', 620, 470, C.teal, q.on('nucleaire', 1), 28); chip(ctx, 'radiotherapie', 920, 470, C.teal, q.on('radiotherapie', 1), 28);
    ctRing(ctx, 620, 680, 110, q.on('beelden', 1), { an: t * 2.2, stralen: 0.6 });
    tag(ctx, 'volgende film: Bestraling', 1000, 620, C.goud, q.on('volgende', 1), 'center', 26);
    tag(ctx, 'radioloog', 1400, 230, C.paars, q.on('radioloog', 1), 'center', 34); regel(ctx, 'geneeskunde · zes jaar', 1400, 310, q.on('zes', 1), C.text, 32, 'center', 700); regel(ctx, 'specialisatie · vijf jaar', 1400, 370, q.on('specialisatie', 1), C.text, 32, 'center', 700);
    persoon(ctx, 'kim', 1560, 880, 420, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'staan', kijk: -1, uit: 'blij' }); }
});
