
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
// Wat word jij? · Medische beeldvorming 2 · Bestraling — eigen tekeningen (24 okt 2026)
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, "left", 700); }
const M2 = { s0: '#5BA4C9', s1: '#E0B64A', breuk: '#E07A5F', herstel: '#7FC48F', bundel: '#F2D27A', huid: '#3A4A66', cyto: '#24344F', kern: '#3A3266', kernR: '#8C7BBF', chrom: '#C98AD6', tumor: '#E07A5F', blaas: '#E6C878', darm: '#B9826A', bot: '#ECE5D3' };

function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 24) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }


// ===== DNA: horizontale dubbele helix; breuken = [{x, s: 0|1|2 (beide), sep, herstel, a}] =====
function dnaHelix(ctx, x0, x1, y, A, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const br = o.breuken || [], lam = o.lam || 220, lw = o.lw || 9; ctx.save(); ctx.globalAlpha *= a;
  const ds = br.find(b => b.s === 2 && (b.a == null || b.a > 0.01));
  const deel = (xa, xb, dx, dy, rot) => { ctx.save(); const px = ds ? ds.x : 0; ctx.translate(px + dx, y + dy); ctx.rotate(rot); ctx.translate(-px, -y);
    const yy = (x, s) => y + A * Math.sin((x - x0) / lam * 6.283 + t * 0.6 + s * Math.PI);
    // sporten (basenparen)
    for (let x = xa + 8; x < xb - 4; x += 24) { const ya = yy(x, 0), yb = yy(x, 1); const gap = br.some(b => b.s !== 2 && Math.abs(x - b.x) < 14 && (b.herstel || 0) < 0.5 && (b.a == null || b.a > 0.5)); ctx.strokeStyle = gap ? rgba('#C9B896', 0.35) : (Math.floor(x / 24) % 2 ? '#C9B896' : '#9AA3B2'); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, yb); ctx.stroke(); }
    for (let s = 0; s < 2; s++) { ctx.strokeStyle = s ? M2.s1 : M2.s0; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); let pen = false;
      for (let x = xa; x <= xb; x += 4) { const g = br.find(b => b.s === s && Math.abs(x - b.x) < 16 && (b.a == null || b.a > 0.01)); const open = g && (Math.abs(x - g.x) > 16 * (g.herstel || 0)) && (g.a == null || g.a > 0.5);
        if (open) { if (pen) ctx.stroke(); pen = false; ctx.beginPath(); continue; } if (!pen) { ctx.moveTo(x, yy(x, s)); pen = true; } else ctx.lineTo(x, yy(x, s)); } if (pen) ctx.stroke();
      br.filter(b => b.s === s && (b.herstel || 0) > 0.01 && (b.herstel || 0) < 0.99).forEach(b => { ctx.strokeStyle = M2.herstel; ctx.lineWidth = lw; ctx.beginPath(); const h = 16 * b.herstel; ctx.moveTo(b.x - h, yy(b.x - h, s)); ctx.lineTo(b.x - 16, yy(b.x - 16, s)); ctx.moveTo(b.x + 16, yy(b.x + 16, s)); ctx.lineTo(b.x + h, yy(b.x + h, s)); ctx.stroke(); });
      br.filter(b => b.s === s && (b.herstel || 0) >= 0.99).forEach(b => { ctx.strokeStyle = M2.herstel; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(b.x - 16, yy(b.x - 16, s)); for (let x = b.x - 16; x <= b.x + 16; x += 4) ctx.lineTo(x, yy(x, s)); ctx.stroke(); }); }
    ctx.restore(); };
  if (ds) { const sp = ds.sep || 0; deel(x0, ds.x - 18, -sp / 2, sp * 0.15, -sp * 0.0012); deel(ds.x + 18, x1, sp / 2, -sp * 0.1, sp * 0.001);
    if (sp < 30) { const g = ctx.createRadialGradient(ds.x, y, 2, ds.x, y, 60); g.addColorStop(0, rgba(M2.breuk, 0.8 * (ds.a == null ? 1 : ds.a))); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ds.x, y, 60, 0, 6.283); ctx.fill(); } }
  else deel(x0, x1, 0, 0, 0);
  br.filter(b => b.s !== 2 && (b.herstel || 0) < 0.5 && (b.a == null || b.a > 0.01)).forEach(b => { const ys = y + A * Math.sin((b.x - x0) / lam * 6.283 + t * 0.6 + b.s * Math.PI); const g = ctx.createRadialGradient(b.x, ys, 2, b.x, ys, 46); g.addColorStop(0, rgba(M2.breuk, 0.85 * (b.a == null ? 1 : b.a))); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, ys, 46, 0, 6.283); ctx.fill(); });
  ctx.restore(); }

// ===== bundel ioniserende straling (van p1 naar p2, golflijntjes) =====
function bundel(ctx, x1, y1, x2, y2, w, a = 1, t = 0, col = M2.bundel) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
  ctx.translate(x1, y1); ctx.rotate(an); const g = ctx.createLinearGradient(0, 0, L, 0); g.addColorStop(0, rgba(col, 0.05)); g.addColorStop(0.3, rgba(col, 0.28)); g.addColorStop(1, rgba(col, 0.42)); ctx.fillStyle = g; ctx.fillRect(0, -w / 2, L, w);
  ctx.strokeStyle = rgba(col, 0.9); ctx.lineWidth = 2.5; for (let k = -1; k <= 1; k++) { ctx.beginPath(); for (let x = 0; x <= L; x += 6) { const yy = k * w * 0.28 + Math.sin(x * 0.12 - t * 9 + k) * 5; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); } ctx.restore(); }

// ===== molecuul water met elektron dat wegschiet; u 0..1 =====
function h2o(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#C8D2DC'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 22 * s); ctx.lineTo(x, y); ctx.lineTo(x + 30 * s, y + 22 * s); ctx.stroke();
  circ(ctx, x, y, 24 * s, '#D8573F', '#F08A70', 2); circ(ctx, x - 34 * s, y + 26 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); circ(ctx, x + 34 * s, y + 26 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); ctx.restore(); }
function radicaal(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x, y, 4, x, y, 60 * s); g.addColorStop(0, rgba(M2.breuk, 0.5)); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 60 * s, 0, 6.283); ctx.fill();
  ctx.strokeStyle = '#C8D2DC'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 34 * s, y + 18 * s); ctx.stroke(); circ(ctx, x, y, 24 * s, '#D8573F', '#F08A70', 2); circ(ctx, x + 36 * s, y + 20 * s, 15 * s, '#E8E8E2', '#FFFFFF', 2); circ(ctx, x - 14 * s, y - 30 * s, 6 * s, '#FFF4C0'); ctx.restore(); }
function elektron(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x, y, 1, x, y, 26); g.addColorStop(0, rgba('#9FD8FF', 0.9)); g.addColorStop(1, rgba('#9FD8FF', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 26, 0, 6.283); ctx.fill(); circ(ctx, x, y, 9, '#9FD8FF', '#FFFFFF', 2); text(ctx, '−', x, y + 6, fTekst(18, 800), '#121A26', 'center'); ctx.restore(); }

// ===== chromosoom (X-vorm, twee zusterchromatiden) of één chromatide; broken = stuk onder de breuk weg =====
function chromosoom(ctx, x, y, L, rot, col, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); const w = o.w || 16, dub = o.enkel ? [0] : [-1, 1];
  ctx.lineCap = 'round'; for (const k of dub) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); const sp = o.enkel ? 0 : 11; const onder = o.breuk ? L * 0.18 : L * 0.62; ctx.moveTo(k * sp - k * 4, -L * 0.38); ctx.quadraticCurveTo(k * 2, 0, k * sp, onder); ctx.stroke(); }
  circ(ctx, 0, 0, w * 0.55, _donker(col, 0.35)); ctx.restore(); }
function fragment(ctx, x, y, L, rot, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -L / 2); ctx.quadraticCurveTo(5, 0, 0, L / 2); ctx.stroke(); ctx.restore(); }

// ===== ronde cel met kern; o.chrom = [[dx,dy,rot,breuk]], o.dood 0..1 (blaasjes) =====
function mcel(ctx, x, y, r, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const d = o.dood || 0; ctx.save(); ctx.globalAlpha *= a;
  if (d > 0.01) { for (let i = 0; i < 9; i++) { const an = i * 0.7 + 0.3, rr = r * (0.25 + 0.55 * d) * (0.6 + 0.4 * hash(i * 7)); const bx = x + Math.cos(an) * rr, by = y + Math.sin(an) * rr; circ(ctx, bx, by, r * (0.32 - 0.12 * d) * (0.7 + 0.3 * hash(i * 3)), rgba('#5A6478', 0.5 + 0.3 * (1 - d)), '#7A8494', 2); } ctx.globalAlpha *= 1 - d; }
  circ(ctx, x, y, r, o.vul || M2.cyto, o.rand || C.er, 4);
  for (let i = 0; i < 10; i++) { const w2 = wander(i + (o.seed || 0) * 13, t, r * 0.6, 0.3); circ(ctx, x + w2.x * 0.9, y + w2.y * 0.9, 3, rgba('#8FA0B5', 0.35)); }
  (o.los || []).forEach(([dx, dy, rot]) => fragment(ctx, x + dx * r, y + dy * r, r * 0.26, rot, '#7FC4B8', 1));
  if (!o.geenKern) { circ(ctx, x, y, r * 0.52, M2.kern, M2.kernR, 3); (o.chrom || []).forEach(([dx, dy, rot, br]) => { chromosoom(ctx, x + dx * r, y + dy * r, r * 0.32, rot, o.chromKl || M2.chrom, { breuk: br, w: Math.max(6, r * 0.06) }); if (br && r > 120) fragment(ctx, x + dx * r + r * 0.16, y + dy * r + r * 0.2, r * 0.13, rot + 1.2, o.chromKl || M2.chrom, 1); }); }
  ctx.restore(); }

// ===== verkeersbord 'stop' als rem van de celcyclus; kapot = kruis =====
function remBord(ctx, x, y, r, a = 1, kapot = 0, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A8294'; ctx.fillRect(x - 5, y, 10, r * 1.6);
  ctx.beginPath(); for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + 0.3927; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, aan > 0.5 ? '#C8463A' : '#6A4A4A', '#F2F2EE', 4);
  text(ctx, 'STOP', x, y + r * 0.22, fTekst(r * 0.55, 800), '#F2F2EE', 'center'); kruis(ctx, x, y, r * 0.9, kapot, '#F2C94C'); ctx.restore(); }

// ===== deling (anafase): spoelfiguur, chromatiden naar de polen, fragment zonder centromeer blijft liggen =====
function delingCel(ctx, x, y, w, h, u, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ins = o.insnoer || 0;
  ctx.beginPath(); const rx = w / 2, ry = h / 2; for (let k = 0; k <= 64; k++) { const an = k / 64 * 6.283; const pinch = 1 - ins * 0.55 * Math.pow(Math.abs(Math.sin(an)), 6) ; ctx.lineTo(x + Math.cos(an) * rx, y + Math.sin(an) * ry * pinch); } ctx.closePath(); shape(ctx, M2.cyto, C.er, 4);
  const pL = [x - rx * 0.78, y], pR = [x + rx * 0.78, y]; circ(ctx, pL[0], pL[1], 12, C.oker); circ(ctx, pR[0], pR[1], 12, C.oker);
  const n = 4, off = ease(u) * rx * 0.55; const gotFrag = o.fragment != null ? o.fragment : 1;
  for (let i = 0; i < n; i++) { const yy = y + (i - 1.5) * h * 0.17; const col = [M2.chrom, '#7FC4B8', '#E0B64A', '#9FB8E6'][i];
    for (const s of [-1, 1]) { const cx2 = x + s * (14 + off); ctx.strokeStyle = rgba(C.line, 0.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s < 0 ? pL[0] : pR[0], pL[1]); ctx.lineTo(cx2, yy); ctx.stroke();
      const br = (i === 1 && gotFrag > 0.01); ctx.save(); ctx.translate(cx2, yy); ctx.strokeStyle = col; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-s * 38, -10, -s * 64, -36); ctx.moveTo(0, 0); if (br) { ctx.quadraticCurveTo(-s * 18, 6, -s * 26, 12); } else { ctx.quadraticCurveTo(-s * 38, 10, -s * 64, 36); } ctx.stroke(); circ(ctx, 0, 0, 9, _donker(col, 0.35)); ctx.restore(); } }
  if (gotFrag > 0.01) { const fy = y + (1 - 1.5) * h * 0.17; fragment(ctx, x + 30 + 20 * ease(u) * 0.3, fy + 34, 50, 0.9 + 0.2 * Math.sin(t), '#7FC4B8', gotFrag); fragment(ctx, x - 26 - 20 * ease(u) * 0.3, fy + 40, 50, -0.9 - 0.2 * Math.sin(t), '#7FC4B8', gotFrag); if (o.gloed) { const g = ctx.createRadialGradient(x + 36, fy + 34, 4, x + 36, fy + 34, 70); g.addColorStop(0, rgba(M2.breuk, 0.45 * o.gloed)); g.addColorStop(1, rgba(M2.breuk, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + 36, fy + 34, 70, 0, 6.283); ctx.fill(); } }
  ctx.restore(); return { fx: x + 36, fy: y - h * 0.085 + 34 }; }

// ===== bekken in doorsnede (zoals op een CT-plak: buik boven, rug onder) =====
function bekken(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const ct = o.ct || 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kl = (c, g) => ct > 0.5 ? g : c;
  if (ct > 0.5) { roundRect(ctx, -400, -300, 800, 600, 16); shape(ctx, '#0A0C10', '#3A4458', 2); }
  ctx.beginPath(); ctx.ellipse(0, 0, 340, 230, 0, 0, 6.283); shape(ctx, kl('#6A4E46', '#3A3C40'), kl('#E3B998', '#5A5C60'), 6);
  ctx.beginPath(); ctx.ellipse(0, 0, 316, 206, 0, 0, 6.283); shape(ctx, kl('#8A5A50', '#4A4C52'), null);
  // botten: heupkoppen links en rechts, schaambeen voor, stuitbeen achter
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 210, 10, 62, 74, 0, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3); ctx.beginPath(); ctx.ellipse(k * 210, 10, 34, 44, 0, 0, 6.283); shape(ctx, kl('#D8CEB6', '#B0B0B0'), null); }
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(k * 52, -150, 50, 22, k * 0.25, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3); }
  ctx.beginPath(); ctx.ellipse(0, 180, 40, 24, 0, 0, 6.283); shape(ctx, kl(M2.bot, '#E8E8E8'), kl('#BDB49E', '#FFFFFF'), 3);
  // blaas (voor), prostaat (midden), endeldarm (achter)
  ctx.beginPath(); ctx.ellipse(0, -80, 92, 50, 0, 0, 6.283); shape(ctx, kl(M2.blaas, '#2A2C30'), kl('#C9A84E', '#4A4C50'), 3);
  ctx.beginPath(); ctx.ellipse(0, 18, 58, 46, 0, 0, 6.283); shape(ctx, kl('#C98A8A', '#5E6066'), kl('#A86A6A', '#6E7076'), 3);
  ctx.beginPath(); ctx.ellipse(0, 112, 50, 38, 0, 0, 6.283); shape(ctx, kl(M2.darm, '#55575C'), kl('#8E5E4A', '#6A6C70'), 3); ctx.beginPath(); ctx.ellipse(0, 112, 22, 14, 0, 0, 6.283); shape(ctx, kl('#5A3A30', '#141518'), null);
  const tu = o.tumor || 0; if (tu > 0.01) { ctx.save(); ctx.globalAlpha *= tu; blob(ctx, 16, 22, 30, 24, 0.12, 4, 0); shape(ctx, rgba(M2.tumor, 0.85), '#F2A08A', 3); ctx.restore(); }
  // ingetekende contouren (bestralingsplan)
  const ci = o.contour || 0; if (ci > 0.01) { ctx.save(); ctx.lineWidth = 4; ctx.setLineDash([12, 8]); const f = ease(ci);
    const ring = (cx, cy, rx, ry, col, u) => { ctx.strokeStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u, 0, 1)); ctx.stroke(); };
    ring(0, 18, 72, 60, M2.tumor, f * 1.6); ring(0, -80, 104, 62, '#5BA4E0', f * 1.6 - 0.4); ring(0, 112, 62, 50, '#C9A35C', f * 1.6 - 0.6); ctx.restore(); }
  // bundels uit vijf richtingen
  const bu = o.bundels || 0; if (bu > 0.01) { const n = 5; for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / n * 6.283, f = clamp(bu * n - i, 0, 1); if (f <= 0.01) continue; bundel(ctx, Math.cos(an) * 520, 18 + Math.sin(an) * 520, 0, 18, 120, f * 0.9, o.t || 0); }
    const g = ctx.createRadialGradient(0, 18, 4, 0, 18, 90); g.addColorStop(0, rgba('#FF6A4A', 0.75 * clamp(bu * 1.2, 0, 1))); g.addColorStop(1, rgba('#FF6A4A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 18, 90, 0, 6.283); ctx.fill(); }
  ctx.restore(); }

// ===== kalender met 20 werkdagen (4,5 week) =====
function kalender20(ctx, x, y, a = 1, n = 0, cs = 52) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dagen = ['ma', 'di', 'wo', 'do', 'vr'];
  roundRect(ctx, x - 20, y - 66, 5 * cs + 40 + 4 * 8, 5 * (cs + 8) + 76, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2);
  dagen.forEach((d, i) => text(ctx, d, x + i * (cs + 8) + cs / 2, y - 22, fTekst(22, 700), '#5A6478', 'center'));
  for (let k = 0; k < 20; k++) { const r = Math.floor((k + 2) / 5), c = (k + 2) % 5; const xx = x + c * (cs + 8), yy = y + r * (cs + 8); roundRect(ctx, xx, yy, cs, cs, 8); shape(ctx, k < n ? '#F6E2B0' : '#E3E7EC', '#B8C0CC', 1.5); if (k < n) vink_(ctx, xx + cs / 2, yy + cs / 2, cs * 0.26, 1, '#3E8E5A'); }
  ctx.restore(); }

// ===== grafiek: overlevende cellen per bestraling (gezond weefsel herstelt, tumor zakt) =====
function fractieGrafiek(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, '', ''); metaA(ctx, 'OVERLEVENDE CELLEN', x, y - 20, 1, C.text2, 'left', 22); metaA(ctx, 'BESTRALING 1 TOT 20', x, y + h + 40, 1, C.text2, 'left', 22);
  const pts = (f) => { const P = []; let v = 1; for (let k = 0; k < 20; k++) { const x0 = x + (k / 20) * w, x1 = x + ((k + 1) / 20) * w; P.push([x0, v]); v = v * f; P.push([x0 + 3, v]); P.push([x1, v]); } return P; };
  const lijn = (P, col) => { const nmax = Math.floor(P.length * clamp(u, 0, 1)); if (nmax < 2) return; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); for (let i = 0; i < nmax; i++) { const [px, v] = P[i]; const py = y + h - v * h * 0.92; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); return P[nmax - 1]; };
  const g = lijn(pts(0.985), C.teal), tm = lijn(pts(0.8), C.koraal);
  ctx.restore(); return { g, tm, y0: y, h }; }

// ===== CT-scherm met plak =====
function ctScherm(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 430 * s, y - 330 * s, 860 * s, 660 * s, 18 * s); shape(ctx, '#2A2F3A', '#5A6478', 3); ctx.beginPath(); ctx.rect(x - 400 * s, y - 300 * s, 800 * s, 600 * s); ctx.clip(); bekken(ctx, x, y, s, 1, Object.assign({ ct: 1 }, o)); ctx.restore(); }

// ===== bestralingstafel van bovenaf met Henk (liggend op de rug), lasers en stipjes =====
function tafelBoven(ctx, x, y, h, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - h * 0.62, y - h * 0.2, h * 1.24, h * 0.4, 20); shape(ctx, '#2E3646', '#5A6478', 3); ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); persoon(ctx, 'henk', 0, h * 0.5, h, { t, uit: o.uit || 'neutraal' }); ctx.restore();
  const bx = x + h * 0.07; roundRect(ctx, x - h * 0.30, y - h * 0.105, h * 0.31, h * 0.21, 22); shape(ctx, '#BFD8E8', '#8FB2CC', 2); ctx.strokeStyle = '#8FB2CC'; ctx.lineWidth = 2; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - h * 0.30 + k * h * 0.075, y - h * 0.1); ctx.lineTo(x - h * 0.30 + k * h * 0.075, y + h * 0.1); ctx.stroke(); }
  roundRect(ctx, x + h * 0.005, y - h * 0.085, h * 0.115, h * 0.17, 18); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2);
  const L = o.laser || 0; if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = '#4AF07A'; ctx.lineWidth = 3; ctx.shadowColor = '#4AF07A'; ctx.shadowBlur = 0; ctx.beginPath(); ctx.moveTo(x - h * 0.7, y); ctx.lineTo(x + h * 0.7, y); ctx.moveTo(x + h * 0.065, y - h * 0.26); ctx.lineTo(x + h * 0.065, y + h * 0.26); ctx.stroke(); ctx.restore(); }
  const st = o.stip || 0; if (st > 0.01) { const pul = 0.6 + 0.4 * Math.sin(t * 5); [[x + h * 0.065, y], [x + h * 0.065, y - h * 0.06], [x + h * 0.065, y + h * 0.06]].forEach(([px, py]) => { circ(ctx, px, py, 16 * pul, rgba(C.goud, 0.35 * st)); circ(ctx, px, py, 5, rgba('#1A2030', st)); }); }
  ctx.restore(); }

// ===== versneller in zijaanzicht; aan 0..1 = bundel zichtbaar =====
function versneller(ctx, x, y, s, a = 1, aan = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 140, -520, 260, 520, 30); shape(ctx, '#DDE3EA', '#9AA3B2', 3); roundRect(ctx, -260, -560, 420, 150, 40); shape(ctx, '#E8ECF0', '#9AA3B2', 3); roundRect(ctx, -250, -420, 150, 70, 14); shape(ctx, '#C8D0DA', '#9AA3B2', 3);
  roundRect(ctx, -520, -250, 560, 40, 12); shape(ctx, '#2E3646', '#5A6478', 3); ctx.fillStyle = '#7A8294'; ctx.fillRect(-300, -210, 60, 210); roundRect(ctx, -360, -14, 180, 20, 6); shape(ctx, '#5A6478', null);
  if (aan > 0.01) { bundel(ctx, -175, -350, -175, -255, 90, aan, t); }
  circ(ctx, 300, -460, 22, aan > 0.5 ? '#F2C94C' : '#4A5266', '#2A3040', 3); ctx.restore(); }

// ===== bunker van bovenaf: dikke betonmuren met doolhofingang, bedieningsruimte met schermen =====
function bunker(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const d = o.muur || 70; ctx.save(); ctx.globalAlpha *= a;
  const beton = (bx, by, bw, bh) => { ctx.save(); ctx.fillStyle = '#7C828C'; ctx.fillRect(bx, by, bw, bh); ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.clip(); ctx.strokeStyle = '#646A74'; ctx.lineWidth = 3; for (let k = -bh; k < bw + bh; k += 22) { ctx.beginPath(); ctx.moveTo(bx + k, by); ctx.lineTo(bx + k - bh, by + bh); ctx.stroke(); } ctx.restore(); };
  ctx.fillStyle = '#26334C'; ctx.fillRect(x, y, w, h);
  beton(x - d, y - d, w + 2 * d, d); beton(x - d, y + h, w + 2 * d, d); beton(x - d, y, d, h); beton(x + w, y, d, h * 0.62); beton(x + w - 180, y + h * 0.62 - d, 180, d);
  // versneller van boven + tafel
  roundRect(ctx, x + w * 0.5 - 110, y + h * 0.28, 220, 110, 20); shape(ctx, '#DDE3EA', '#9AA3B2', 3); roundRect(ctx, x + w * 0.5 - 40, y + h * 0.28 + 100, 80, 220, 12); shape(ctx, '#2E3646', '#8FA0B5', 3);
  const bu = o.bundel || 0; if (bu > 0.01) { const g = ctx.createRadialGradient(x + w * 0.5, y + h * 0.28 + 160, 4, x + w * 0.5, y + h * 0.28 + 160, 180); g.addColorStop(0, rgba(M2.bundel, 0.5 * bu)); g.addColorStop(1, rgba(M2.bundel, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x + w * 0.5, y + h * 0.28 + 160, 180, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
function bediening(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y + 150, 380, 30, 8); shape(ctx, '#6B5440', null); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 20, y + 180, 20, 90); ctx.fillRect(x + 340, y + 180, 20, 90);
  for (let k = 0; k < 2; k++) { const sx = x + 20 + k * 190; roundRect(ctx, sx, y, 170, 120, 10); shape(ctx, '#121A26', '#5A6478', 4); ctx.fillStyle = '#5A6478'; ctx.fillRect(sx + 75, y + 120, 20, 30); }
  const cam = o.camera || 0; if (cam > 0.01) { ctx.save(); ctx.beginPath(); ctx.rect(x + 26, y + 6, 158, 108); ctx.clip(); ctx.globalAlpha *= cam; ctx.fillStyle = '#1E2A3E'; ctx.fillRect(x + 26, y + 6, 158, 108); tafelBoven(ctx, x + 105, y + 60, 150, o.t || 0, { laser: 1 }); ctx.restore(); text(ctx, '● REC', x + 150, y + 26, fTekst(14, 800), '#E05A4A', 'center'); }
  ctx.strokeStyle = '#7FC48F'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const xx = x + 220 + i * 5, yy = y + 70 - 26 * Math.exp(-Math.pow((i - 15) / 5, 2)) * (o.dosis || 0.6); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); ctx.restore(); }
function dosismeter(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -12, -70, 24, 36, 6); shape(ctx, '#9AA3B2', '#5A6478', 2); roundRect(ctx, -60, -40, 120, 150, 16); shape(ctx, '#E3E7EC', '#8FA0B5', 3); roundRect(ctx, -42, -20, 84, 60, 8); shape(ctx, '#2A3446', null); text(ctx, '0,12', 0, 20, fTekst(26, 800), '#7FC48F', 'center'); text(ctx, 'mSv', 0, 82, fTekst(22, 700), '#2A3446', 'center'); ctx.restore(); }

// ===== kaartje met icoon (tijd, afstand, afscherming) =====
function regelKaart(ctx, x, y, w, titel, sub, soort, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 120, 16); shape(ctx, rgba(C.fill, 0.7), C.teal, 2);
  const ix = x + 66, iy = y + 60; if (soort === 'tijd') klokje(ctx, ix, iy, 36, 0.25); else if (soort === 'afstand') { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ix - 40, iy); ctx.lineTo(ix + 40, iy); ctx.stroke(); pijl(ctx, ix - 10, iy, ix - 40, iy, C.goud, 1, 5, 14); pijl(ctx, ix + 10, iy, ix + 40, iy, C.goud, 1, 5, 14); } else { ctx.fillStyle = '#7C828C'; ctx.fillRect(ix - 14, iy - 40, 28, 80); ctx.strokeStyle = '#646A74'; ctx.lineWidth = 3; for (let k = -40; k < 40; k += 14) { ctx.beginPath(); ctx.moveTo(ix - 14, iy + k + 14); ctx.lineTo(ix + 14, iy + k); ctx.stroke(); } }
  regel(ctx, titel, x + 130, y + 54, 1, C.text, 34, 'left', 800); regel(ctx, sub, x + 130, y + 94, 1, C.text2, 24, 'left', 600); ctx.restore(); }

// ===== tuin: grond, groenten en bloemen =====
function tuin(ctx, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4A36'; ctx.fillRect(0, 860, W, 220); ctx.fillStyle = '#5A4232'; ctx.fillRect(820, 860, 1000, 26);
  for (let i = 0; i < 9; i++) { const px = 880 + i * 108, sw = Math.sin(t * 1.2 + i) * 4; ctx.strokeStyle = '#4F8F5A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px, 862); ctx.quadraticCurveTo(px + sw, 790, px + sw * 1.5, 730 + (i % 3) * 20); ctx.stroke();
    for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(px + k * 22 + sw, 800 - (i % 2) * 14, 22, 9, k * 0.5, 0, 6.283); shape(ctx, '#5FA86E', null); }
    if (i % 3 === 1) circ(ctx, px + sw * 1.5, 724 + (i % 3) * 20, 18, '#D8573F', '#F08A70', 2); else if (i % 3 === 2) circ(ctx, px + sw * 1.5, 740, 14, '#E0B64A', '#F2D27A', 2); } ctx.restore(); }

// ===== wachtkamer: wand met bordje, stoelen =====
function wachtkamer(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22314D'; ctx.fillRect(0, 0, W, 880); ctx.fillStyle = '#2C3A56'; ctx.fillRect(0, 860, W, 220);
  roundRect(ctx, 760, 120, 400, 70, 10); shape(ctx, '#E3E7EC', null); text(ctx, 'Radiotherapie', 960, 167, fTekst(36, 800), '#2A3446', 'center');
  for (let i = 0; i < 3; i++) { const sx = 1180 + i * 120; roundRect(ctx, sx, 720, 100, 24, 6); shape(ctx, '#5B8CC9', null); roundRect(ctx, sx + 6, 620, 88, 100, 10); shape(ctx, '#4A7AB4', null); ctx.fillStyle = '#7A8294'; ctx.fillRect(sx + 10, 744, 10, 116); ctx.fillRect(sx + 80, 744, 10, 116); }
  ctx.restore(); }

// ===== hand in hand: twee handen over elkaar (tussen twee figuren) =====
function handInHand(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x - 8, y, 20, 16, 0.3, 0, 6.283); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.25), 2); ctx.beginPath(); ctx.ellipse(x + 8, y - 4, 18, 14, -0.3, 0, 6.283); shape(ctx, CAST.ria.huid, _donker(CAST.ria.huid, 0.25), 2); ctx.restore(); }

// ===== kleine opleidingskaart =====
function vakIcoon(ctx, x, y, soort, a = 1, t = 0, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 120, y - 110, 240, 220, 20); shape(ctx, rgba(hl > 0.5 ? C.teal : C.fill, hl > 0.5 ? 0.35 : 0.6), hl > 0.5 ? C.teal : C.line, 2);
  ctx.save(); ctx.translate(x, y - 24);
  if (soort === 'röntgen') { ctx.fillStyle = '#0A0C10'; ctx.fillRect(-60, -60, 120, 110); ctx.strokeStyle = '#E8E8E8'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, -48); ctx.lineTo(-10, 38); ctx.moveTo(10, -48); ctx.lineTo(14, 38); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-14, -6); ctx.lineTo(22, -2); ctx.stroke(); }
  else if (soort === 'CT') { ctx.beginPath(); ctx.arc(0, -4, 56, 0, 6.283); shape(ctx, '#DDE3EA', '#9AA3B2', 3); ctx.beginPath(); ctx.arc(0, -4, 30, 0, 6.283); shape(ctx, '#1A2740', null); ctx.fillStyle = '#5A6478'; ctx.fillRect(-70, 4, 140, 12); }
  else if (soort === 'MRI') { roundRect(ctx, -62, -58, 124, 104, 30); shape(ctx, '#DDE3EA', '#9AA3B2', 3); ctx.beginPath(); ctx.ellipse(0, -6, 36, 36, 0, 0, 6.283); shape(ctx, '#1A2740', null); ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(0, -6, 44 + k * 8 + 4 * Math.sin(t * 3 + k), -0.6, 0.6); ctx.stroke(); } }
  else if (soort === 'echo') { ctx.fillStyle = '#0A0C10'; ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(-62, 44); ctx.lineTo(62, 44); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.arc(0, -56, k * 22, 1.05, 2.09); ctx.stroke(); } }
  else { bundel(ctx, 0, -60, 0, 40, 60, 1, t); ctx.beginPath(); ctx.ellipse(0, 40, 40, 14, 0, 0, 6.283); shape(ctx, '#C98A8A', null); }
  ctx.restore(); text(ctx, soort, x, y + 88, fTekst(28, 700), C.text, 'center'); ctx.restore(); }

// ===== porties vergelijken: n blokjes met hoogte per dosis =====
function porties(ctx, x, y, n, dosis, col, a = 1, w = 1200, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w / 40, bh = dosis * 34;
  for (let k = 0; k < n; k++) { roundRect(ctx, x + k * bw, y - bh, bw - 6, bh, 4); shape(ctx, rgba(col, 0.75), col, 1.5); }
  if (hl > 0.01) { ctx.globalAlpha *= hl; roundRect(ctx, x - 14, y - bh - 14, n * bw + 16, bh + 28, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore(); }
// Wat word jij? · Medische beeldvorming 2 · Bestraling — scènes per alinea (v1.0, 24 okt 2026). Look: Schema en Micro, met cast (Opa Henk, Oma Ria, Dr. Kim).
// Rode draad: Opa Henk krijgt twintig bestralingen voor prostaatkanker.

function fase(t, q, w, n = 1, d = 0.6) { return q.on(w, n, d); }

Object.assign(SCENES, {
  title(ctx, t) { bundel(ctx, 1500, 120, 1500, 560, 140, 0.8, t); dnaHelix(ctx, 900, 1860, 560, 70, t, { breuken: [{ x: 1500, s: 2, sep: 30 + 10 * Math.sin(t) }] }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); wachtkamer(ctx, 1);
    persoon(ctx, 'ria', 400, 880, 440, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'henk', 560, 880, 470, { t, kijk: -1, uit: t > q.at('fronst', 1) ? 'bezorgd' : 'neutraal' }); handInHand(ctx, 482, 680, 1);
    naamBij(ctx, 'Oma Ria', '', 380, 400, 1, 'center'); naamBij(ctx, 'Opa Henk', 'prostaatkanker', 600, 360, q.on('Henk', 1), 'center');
    persoon(ctx, 'kim', 1660, 880, 480, { t, kijk: 1, pose: q.on('bestraling', 1) > 0.5 ? 'wijs' : 'staan', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'radiotherapeut', 1660, 340, q.on('radiotherapeut', 1), 'center');
    kalender20(ctx, 860, 370, q.on('twintig', 1), 0, 44); metaA(ctx, 'ELKE WERKDAG · EEN PAAR MINUTEN', 1000, 270, q.on('werkdag', 1), C.grain, 'center', 22);
    vraagteken(ctx, 760, 330, q.on('DNA', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'Antwoord b: kankercellen herstellen slechter');
    const G = q.on('gray', 1, 0.8), E = q.on('elektronen', 1, 1.2), R = q.on('reactieve', 1, 1.5), B1 = q.on('breken', 1, 0.5), Z = q.on('zelf', 1);
    // links: cel in de bundel; later de getallen per gray
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; bundel(ctx, 0, 260, 330, 560, 120, 0.9, t); mcel(ctx, 330, 560, 180, t, { chrom: [[-0.2, -0.1, 0.4], [0.2, 0.1, -0.5]] }); naamBij(ctx, 'ioniserende straling', '', 140, 250, q.on('ioniserende', 1)); ctx.restore(); }
    if (G > 0.01) { metaA(ctx, '1 GRAY = 1 JOULE PER KILOGRAM', 140, 300, G, C.grain, 'left', 26);
      chip(ctx, '± 1000 enkelstrengsbreuken', 380, 420, M2.s0, q.on('duizend', 1), 30); chip(ctx, '± 40 dubbelstrengsbreuken', 380, 520, M2.breuk, q.on('veertig', 1), 30); metaA(ctx, 'PER CEL, PER GRAY', 380, 600, q.on('veertig', 1), C.text2, 'center', 22); }
    // rechts: water, elektron, reactief deeltje
    const wx = 900, wy = 330; if (R < 0.99) h2o(ctx, wx, wy, 1.1, 1 - R); naamBij(ctx, 'water', '', wx - 50, wy - 70, 1 - R);
    if (E > 0.01 && E < 0.99 || (E >= 0.99 && R < 0.5)) elektron(ctx, wx + 260 * ease(E), wy - 120 * ease(E), 1 - R);
    if (R > 0.01) { const f = ease(clamp((t - q.at('breken', 1) + 1.2) / 1.4, 0, 1)); radicaal(ctx, wx + (1080 - wx) * f, wy + (560 - wy) * f, 1.0, (1 - B1 * 0.8) * (1 - G), t); naamBij(ctx, 'reactief deeltje', '', wx + 60, wy + 120, R * (1 - B1)); }
    // DNA met breuken
    const S1 = q.on('enkelstrengsbreuk', 1), HE = clamp((t - q.at('herstellen', 1)) / 3, 0, 1), D2 = q.on('dubbelstrengsbreuk', 1), SEP = clamp((t - q.at('stukken', 1) + 1) / 2, 0, 1);
    const br = [{ x: 1080, s: 0, a: B1, herstel: HE }]; if (D2 > 0.01) br.push({ x: 1520, s: 2, a: D2, sep: 70 * ease(SEP) });
    dnaHelix(ctx, 720, 1820, 640, 60, t, { breuken: br });
    if (Z > 0.01 && D2 < 0.5) bundel(ctx, 1520, 300, 1520, 600, 60, Z * 0.8, t);
    naamBij(ctx, 'enkelstrengsbreuk', '', 1080, 800, S1 * (1 - D2 * 0.5), 'center'); chip(ctx, 'andere streng als voorbeeld', 1080, 470, C.groen, q.on('voorbeeld', 1) * (1 - D2), 26);
    naamBij(ctx, 'dubbelstrengsbreuk', '', 1560, 800, D2, 'center'); chip(ctx, 'lastig te repareren', 1520, 480, M2.breuk, q.on('lastiger', 1), 26); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'micro'); const M = q.on('Mutaties', 1, 0.5);
    paneel(ctx, 100, 200, 820, 640, '', 1); tag(ctx, 'gezonde cel', 510, 270, C.groen, 1, 'center', 30);
    const HE = q.on('herstelt', 1, 1.5); mcel(ctx, 400, 560, 200, t, { chrom: [[-0.2, -0.05, 0.4, HE < 0.5], [0.18, 0.1, -0.5]] });
    remBord(ctx, 760, 430, 60, q.on('rem', 1)); naamBij(ctx, 'controlepunt', '', 760, 380, q.on('controlepunt', 1), 'center');
    chip(ctx, 'eerst herstellen', 400, 815, C.groen, HE * (1 - q.on('Lukt', 1)), 24);
    chip(ctx, 'of stopt voorgoed met delen', 400, 815, C.text2, q.on('voorgoed', 1), 24);
    mcel(ctx, 780, 660, 62, t, { a: q.on('zichzelf', 1, 0.3), seed: 7, dood: q.on('zichzelf', 1, 2.5), chrom: [[0, 0, 0.3, true]] }); chip(ctx, 'of ruimt zichzelf op', 780, 790, C.text2, q.on('zichzelf', 1), 22);
    paneel(ctx, 1000, 200, 820, 640, '', M); tag(ctx, 'tumorcel', 1410, 270, C.koraal, M, 'center', 30);
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; mcel(ctx, 1300, 560, 200, t, { chrom: [[-0.2, -0.05, 0.4, true], [0.18, 0.1, -0.5, q.on('gebroken', 1) > 0.5]], seed: 3 }); remBord(ctx, 1660, 430, 60, 1, q.on('kapot', 1), 0); ctx.restore();
      chip(ctx, 'remmen kapot', 1660, 560, C.koraal, q.on('kapot', 1), 26); pijl(ctx, 1520, 720, 1720, 720, C.koraal, q.on('deelt', 1), 6, 22); chip(ctx, 'deelt door', 1620, 800, C.koraal, q.on('deelt', 1), 26); }
    vraagteken(ctx, 1810, 330, q.on('gebeurt', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'Antwoord a: de dochtercellen missen stukken DNA');
    const DC = q.on('dochtercellen', 1, 0.8), ZO = q.on('Zo', 1, 0.8);
    if (DC < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - DC; const u = clamp(t / 6, 0, 1); delingCel(ctx, 960, 520, 980, 520, u, t, { gloed: q.on('centromeer', 1), insnoer: u * 0.5 });
      naamBij(ctx, 'stuk zonder centromeer', '', 960, 640, q.on('centromeer', 1), 'center'); naamBij(ctx, 'trekdraden', '', 640, 470, q.on('trekdraden', 1), 'center'); chip(ctx, 'raakt kwijt', 1000, 790, M2.breuk, q.on('kwijt', 1), 26); ctx.restore(); }
    if (DC > 0.01 && ZO < 0.99) { ctx.save(); ctx.globalAlpha *= DC * (1 - ZO); const DD = q.on('sterven', 1, 2.5); mcel(ctx, 620, 520, 190, t, { chrom: [[-0.2, -0.1, 0.3, true], [0.15, 0.12, -0.4]], los: [[0.68, 0.3, 0.8]], dood: DD }); mcel(ctx, 1300, 520, 190, t, { chrom: [[-0.2, -0.1, 0.3, true], [0.15, 0.12, -0.4]], los: [[-0.68, 0.3, -0.8]], seed: 2, dood: DD });
      naamBij(ctx, 'missen genen', '', 960, 800, DC, 'center'); ctx.restore(); }
    if (ZO > 0.01) { ctx.save(); ctx.globalAlpha *= ZO; tag(ctx, 'gezond weefsel', 520, 280, C.groen, 1, 'center', 30); tag(ctx, 'tumor', 1400, 280, C.koraal, 1, 'center', 30);
      for (let i = 0; i < 9; i++) { const cx = 380 + (i % 3) * 140, cy = 420 + Math.floor(i / 3) * 140; mcel(ctx, cx, cy, 62, t, { seed: i, chrom: i === 4 ? [[0, 0, 0.3]] : [] }); }
      for (let i = 0; i < 12; i++) { const cx = 1210 + (i % 4) * 128 + (Math.floor(i / 4) % 2) * 30, cy = 410 + Math.floor(i / 4) * 140; mcel(ctx, cx, cy, 60, t, { seed: i + 20, rand: '#F2A08A', chrom: i % 4 !== 3 ? [[-0.1, 0, 0.3, i % 3 === 0], [0.15, 0.05, -0.4]] : [] }); }
      chip(ctx, 'weinig cellen delen', 520, 820, C.groen, 1, 26); chip(ctx, 'meeste tumoren: veel delende cellen', 1400, 820, C.koraal, q.on('tumor', 1), 26); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('prostaat', 1);
    bundel(ctx, 560, 270, 560, 500, 110, 0.85 * (1 - q.on('Daarom', 1) * 0.7), t);
    bekken(ctx, 560, 480, 0.9, 1, { tumor: 1 }); metaA(ctx, 'DOORSNEDE BEKKEN · VAN ONDEREN GEZIEN', 560, 225, 1, C.grain, 'center', 22);
    naamBij(ctx, 'prostaat', '', 560, 500, P, 'center'); naamBij(ctx, 'blaas', '', 560, 420, q.on('blaas', 1), 'center'); naamBij(ctx, 'endeldarm', '', 560, 600, q.on('endeldarm', 1), 'center');
    tag(ctx, 'gezond weefsel geraakt', 560, 830, C.koraal, 1 - q.on('Daarom', 1), 'center', 26);
    kalender20(ctx, 1240, 330, q.on('twintig', 1), 0, 56); chip(ctx, '20 × 3 gray', 1430, 740, C.goud, q.on('gray', 1), 30); chip(ctx, '4,5 week', 1430, 810, C.goud, q.on('halve', 1), 26);
    stempel(ctx, 1450, 190, 'niet alles in één keer', C.koraal, q.on('alles', 1) * (1 - q.on('twintig', 1)), -0.08); vraagteken(ctx, 1780, 260, q.on('Waarom', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: gezond weefsel herstelt tussen de keren beter');
    const PK = q.on('Prostaatkanker', 1, 0.8), BV = q.on('Bovendien', 1, 0.8), MK = q.on('merkt', 1, 0.8);
    if (PK < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - PK; metaA(ctx, 'BIJ DE MEESTE TUMOREN', 140, 250, 1, C.grain, 'left', 26);
      const u = clamp((t - q.at('Tussen', 1)) / Math.max(1, q.at('groot.', 1) - q.at('Tussen', 1)), 0, 1); const g = fractieGrafiek(ctx, 300, 330, 1180, 420, u, 1);
      naamBij(ctx, 'gezond weefsel', 'herstelt', 1510, 330 + 420 - (g.g ? g.g[1] : 1) * 420 * 0.92 + 10, q.on('gezonde', 1), 'left');
      naamBij(ctx, 'tumor', 'herstelt slechter', 1510, 330 + 420 - (g.tm ? g.tm[1] : 1) * 420 * 0.92 - 20, q.on('Tumorcellen', 1), 'left'); ctx.restore(); }
    if (PK > 0.01 && BV < 0.99) { ctx.save(); ctx.globalAlpha *= PK * (1 - BV); tag(ctx, 'prostaatkanker: de uitzondering', 960, 250, C.goud, 1, 'center', 32);
      chip(ctx, 'groeit langzaam', 620, 350, C.text2, q.on('langzaam', 1), 26); chip(ctx, 'herstelt zelf ook goed', 1100, 350, C.text2, q.on('herstelt', 1), 26);
      const V = q.on('veertig', 1), TW = q.on('twintig', 1);
      metaA(ctx, '39 × 2 GRAY · KLEINE PORTIES', 300, 470, q.on('Kleine', 1), C.text2, 'left', 22); porties(ctx, 300, 560, 39, 2, '#7A8BA8', q.on('Kleine', 1), 1200);
      kruis(ctx, 1560, 520, 26, V * 0.9, C.koraal);
      metaA(ctx, '20 × 3 GRAY · GROTERE PORTIES', 300, 650, TW, C.goud, 'left', 22); porties(ctx, 300, 780, 20, 3, C.goud, TW, 1200, q.on('gray', 1));
      naamBij(ctx, 'Henk', '', 960, 760, q.on('Henk', 1) * TW, 'left'); ctx.restore(); }
    if (BV > 0.01 && MK < 0.99) { ctx.save(); ctx.globalAlpha *= BV * (1 - MK); ctx.beginPath(); ctx.rect(0, 190, W, 690); ctx.clip(); bekken(ctx, 960, 520, 0.85, 1, { tumor: 1, bundels: clamp((t - q.at('Bovendien', 1)) / 4, 0, 1), t }); ctx.restore();
      ctx.save(); ctx.globalAlpha *= BV * (1 - MK); naamBij(ctx, 'hoogste dosis', 'in de prostaat', 960, 470, q.on('hoogst', 1), 'center'); chip(ctx, 'eromheen: steeds een deel', 960, 850, C.teal, q.on('eromheen', 1), 26); ctx.restore(); }
    if (MK > 0.01) { persoon(ctx, 'henk', 760, 880, 470, { t, uit: 'moe', a: MK, kijk: 1 }); naamBij(ctx, 'Opa Henk', 'na een paar weken', 760, 360, MK, 'center');
      chip(ctx, 'vaker plassen', 1220, 470, C.oker, q.on('plassen', 1), 30); chip(ctx, 'moe', 1220, 570, C.oker, q.on('moe.', 1), 30); chip(ctx, 'meestal weg na een paar maanden', 1300, 700, C.groen, q.on('verdwijnen', 1), 28); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const EL = q.on('Elke', 3, 0.8), OR = q.on('Oma', 1, 0.6);
    if (EL < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - EL; ctScherm(ctx, 640, 480, 0.72, 1, { contour: clamp((t - q.at('tekent', 1)) / 3, 0, 1), bundels: clamp((t - q.at('bestralingsplan', 1)) / 1.2, 0, 1), t });
      metaA(ctx, 'CT-PLAK VAN HET BEKKEN', 640, 200, 1, C.grain, 'center', 24); tag(ctx, 'film: In het lichaam kijken', 640, 860, C.teal, q.on('lichaam', 1) * (1 - q.on('plakjes', 1)), 'center', 26);
      persoon(ctx, 'kim', 1400, 880, 480, { t, kijk: 1, pose: 'wijs', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'radiotherapeut', 1400, 340, q.on('Kim', 1), 'center');
      chip(ctx, 'bestralingsplan: richtingen en dosis', 1440, 230, C.goud, q.on('bestralingsplan', 1), 26); ctx.restore(); }
    if (EL > 0.01 && OR < 0.99) { ctx.save(); ctx.globalAlpha *= EL * (1 - OR); metaA(ctx, 'BESTRALINGSTAFEL · VAN BOVEN GEZIEN', 960, 230, 1, C.grain, 'center', 24); tafelBoven(ctx, 960, 520, 620, t, { laser: q.on('precies', 1), stip: q.on('stipjes', 1) });
      naamBij(ctx, 'stipjes op de huid van het bekken', 'merktekens', 1000, 780, q.on('stipjes', 1), 'center'); ctx.restore(); }
    if (OR > 0.01) { persoon(ctx, 'ria', 860, 880, 440, { t, kijk: 1, pose: 'denk', a: OR }); persoon(ctx, 'henk', 1100, 880, 470, { t, kijk: -1, uit: 'blij', a: OR });
      naamBij(ctx, 'Oma Ria', '', 860, 400, OR, 'center'); pijl(ctx, 940, 600, 1020, 600, C.goud, q.on('afstand', 1), 4, 14); pijl(ctx, 1020, 600, 940, 600, C.goud, q.on('afstand', 1), 4, 14); vraagteken(ctx, 1320, 380, q.on('denk', 1), 110); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: er blijft geen straling in hem achter'); const VO = q.on('ligt', 1, 0.6);
    if (VO < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - VO; const aan = t < q.at('aanstaat', 1) ? 1 : 1 - clamp((t - q.at('aanstaat', 1)) / 0.6, 0, 1);
      versneller(ctx, 720, 820, 0.85, 1, aan, t); chip(ctx, aan > 0.5 ? 'toestel aan: straling' : 'toestel uit: geen straling', 560, 300, aan > 0.5 ? C.goud : C.text2, 1, 26);
      const K = q.on('gewoon', 1, 0.6); persoon(ctx, 'ria', 1160 + 110 * K, 880, 440, { t, kijk: 1, uit: K > 0.5 ? 'lacht' : 'neutraal', pose: K > 0.5 ? 'vasthouden' : 'staan', a: q.on('Ria', 1, 0.3) }); persoon(ctx, 'henk', 1420, 880, 470, { t, kijk: -1, uit: 'blij', a: q.on('Henk', 1, 0.3) }); if (0) persoon(ctx, 'ria', 0, 0, 1, { t, kijk: 1, uit: K > 0.5 ? 'lacht' : 'neutraal', pose: K > 0.5 ? 'vasthouden' : 'staan', a: q.on('Ria', 1, 0.3) });
      chip(ctx, 'niet radioactief', 1440, 330, C.groen, q.on('radioactief', 1), 30); ctx.restore(); }
    if (VO > 0.01) { ctx.save(); ctx.globalAlpha *= VO;
      [220, 370, 520].forEach(yy => { ctx.save(); ctx.globalAlpha *= q.on('regels', 1); roundRect(ctx, 100, yy, 540, 120, 16); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); });
      regelKaart(ctx, 100, 220, 540, 'tijd', 'zo kort mogelijk', 'tijd', q.on('tijd', 1), t); regelKaart(ctx, 100, 370, 540, 'afstand', 'zo ver mogelijk weg', 'afstand', q.on('afstand', 1), t); regelKaart(ctx, 100, 520, 540, 'afscherming', 'iets ertussen', 'muur', q.on('afscherming', 1), t);
      const TB = 1, BU = q.on('Tijdens', 1); bunker(ctx, 830, 290, 460, 420, TB, { bundel: BU }); naamBij(ctx, 'beton', '± 2 meter dik', 1060, 160, q.on('beton', 1), 'center');
      metaA(ctx, 'BESTRALINGSRUIMTE · VAN BOVEN GEZIEN', 1060, 820, TB, C.grain, 'center', 20);
      bediening(ctx, 1440, 330, TB, { camera: q.on('camera', 1), t }); naamBij(ctx, 'bedieningsruimte', 'MBB\'er kijkt mee', 1630, 300, TB, 'center');
      dosismeter(ctx, 1640, 720, 0.75, q.on('dosismeter', 1)); naamBij(ctx, 'dosismeter', '', 1560, 760, q.on('dosismeter', 1), 'right'); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); tuin(ctx, 1, t); const KI = q.on('controles', 1, 0.5), HE = q.on('helft', 1, 0.4), RI = q.on('richten', 1, 0.6);
    persoon(ctx, 'henk', 560, 880, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'ria', 340, 880, 440, { t, kijk: 1, uit: 'lacht' }); naamBij(ctx, 'Opa Henk', 'een paar maanden later', 560, 360, 1, 'center');
    chip(ctx, 'bedoeld om te genezen', 1360, 300, C.groen, q.on('genezen', 1) * (1 - KI), 30);
    const KA = KI * (1 - HE); if (KA > 0.01) { paneel(ctx, 1150, 200, 520, 600, '', KA); ctx.save(); ctx.globalAlpha *= KA; ctx.fillStyle = C.bgSchema; roundRect(ctx, 1152, 202, 516, 596, 16); ctx.fill(); persoon(ctx, 'kim', 1410, 780, 420, { t, kijk: -1 }); ctx.restore(); naamBij(ctx, 'Dr. Kim', 'controle in het ziekenhuis', 1410, 300, KA, 'center'); }
    const HA = HE * (1 - RI); if (HA > 0.01) { ctx.save(); ctx.globalAlpha *= HA; for (let i = 0; i < 10; i++) { const x = 1040 + i * 72, y = 330; ctx.fillStyle = i < 5 ? C.goud : '#5A6478'; ctx.beginPath(); ctx.arc(x, y - 52, 18, 0, 6.283); ctx.fill(); roundRect(ctx, x - 22, y - 30, 44, 56, 16); ctx.fill(); }
      metaA(ctx, 'ONGEVEER DE HELFT KRIJGT BESTRALING', 1364, 230, 1, C.grain, 'center', 22);
      chip(ctx, 'meeste tumoren: kapot DNA, slechter herstel', 1364, 440, C.koraal, q.on('meeste', 1), 26); ctx.restore(); }
    if (RI > 0.01) { ctx.save(); ctx.globalAlpha *= RI; roundRect(ctx, 1060, 170, 640, 690, 18); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.rect(1062, 172, 636, 600); ctx.clip(); bekken(ctx, 1380, 470, 0.5, 1, { tumor: 1, bundels: clamp((t - q.at('richten', 1)) / 2, 0, 1), t }); ctx.restore();
      chip(ctx, 'bij Henk: bundels kruisen in de prostaat', 1380, 825, C.goud, RI, 26); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const xs = [300, 630, 960, 1290, 1620], s = ['röntgen', 'CT', 'MRI', 'echo', 'bestraling'], cue = ['röntgen', 'CT', 'MRI', 'echo', 'bestraling'];
    metaA(ctx, 'MBB\'ER · MEDISCH BEELDVORMINGS- EN BESTRALINGSDESKUNDIGE', 960, 240, 1, C.grain, 'center', 24);
    xs.forEach((x, i) => vakIcoon(ctx, x, 470, s[i], 0.45 + 0.55 * q.on(cue[i], 1, 0.4), t, i === 4 ? 1 : 0));
    chip(ctx, 'hbo-bachelor MBRT · 4 jaar', 960, 720, C.goud, q.on('vier', 1), 32); metaA(ctx, 'FONTYS · HANZE · INHOLLAND', 960, 800, q.on('hogeschool', 1), C.text2, 'center', 22); }
});
