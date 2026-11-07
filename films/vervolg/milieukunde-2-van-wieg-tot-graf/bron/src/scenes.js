
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
// Wat word jij? · Milieukunde 2 · Van wieg tot graf — eigen tekeningen (testvel, 1 nov 2026)
// Seriekleuren (script_v2): oker = grondstof en fabriek, teal = water, groen = land en bos, blauw = stikstof naar zee,
// koraal = broeikasgas (CO₂-eq), goud = focus / functionele eenheid / advies. Plastic lichtgrijs, papier kraftbruin. Geen paars.
// Alle functies: (ctx, x, y, s, o) rond (x, y); tassen staan met (x, y) = midden van de bodem, tenzij o.hang (dan = handvat).
// Maatvoering tassen: 1 cm = MK2_CM px bij s = 1. Gewichten (getallen 5, 8, 17, 26): dun plastic tasje 8 g (VK, HDPE),
// stevige plastic tas 30 g (NL, LDPE), papieren tas 55 g (VK) / 51 g (NL) / 45 g (DK). Afmetingen staan niet in de bronnen:
// geschat, met de inhoudsverhouding uit het Britse onderzoek (7,4 tegen 5,9 dingen per tas, getal 32 → papier ± 1,26× het
// voorvlak van het dunne tasje). Zie het verslag (twijfels).

const MK2_CM = 6;
const MK2 = {
  plastic: '#DCE1E7', plasticR: '#F4F6F8', plasticD: '#A9B2BF',      // dun tasje: lichtgrijs, iets doorschijnend
  ldpe: '#B9C2CE', ldpeR: '#DCE2EA', ldpeD: '#8D98A8',               // stevige tas: dikker, dichter grijs
  kraft: '#B98A57', kraftR: '#D4AC7C', kraftD: '#8E643A',            // papier: kraftbruin
  katoen: '#E8DFCB', katoenR: '#F6F0E2', katoenD: '#BFB298',         // katoen: ecru
  stikstof: '#C9A35C',                                               // stikstof naar zee = oker (keuring ronde 4, 2 nov 2026; was blauw)
  papier: '#F2EEE4', papierD: '#C9C0AE', inkt: '#2E3A52', potlood: '#4A3E30'
};

// ---------- kleine hulpjes (zoals mk1: laag, lijn, metaA) ----------
function mk2_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function mk2_lijn(ctx, pts, col, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
function mk2_meta(ctx, s2, x, y, col = C.grain, al = 'left', px = 28, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function mk2_bol(ctx, x, y, r, fill, stroke = null, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, 6.283); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }

// =====================================================================
// 1. DE TASSEN
// =====================================================================

// DUN PLASTIC TASJE (hemdtasje, HDPE, 8 g): 28 cm breed, 38 cm lijf + 14 cm hengsels uit één stuk folie, zijvouwen, lasnaad
// onderaan. o.vol 0..1 = bol van de boodschappen; o.hang = aan de hand (x, y = waar de hengsels samenkomen); o.kreuk = rimpels.
function mk2_plasticTasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, vol = 0, hang = false, kreuk = 1, kl = MK2.plastic, klR = MK2.plasticR, klD = MK2.plasticD } = o; if (a <= 0.01) return;
  const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); if (hang) ctx.translate(0, 52 * c);
  const B = 14 * c, Hl = 38 * c, Hh = 52 * c, bol = vol * 2.2 * c, hx = hang ? 3 * c : 6 * c, hb = hang ? 2.5 * c : 0; // hengsels naar elkaar toe bij hangen
  ctx.beginPath(); ctx.moveTo(-B + 1 * c, 0); ctx.lineTo(B - 1 * c, 0);
  ctx.quadraticCurveTo(B + bol, -Hl * 0.5, B - (hang ? 2 * c : 0), -Hl);       // rechterzij
  ctx.lineTo(hx + 8 * c - hb, -Hh + 2 * c); ctx.quadraticCurveTo(hx + 8 * c - hb, -Hh, hx + 6 * c - hb, -Hh); // rechterhengsel
  ctx.lineTo(hx + 1 * c, -Hh); ctx.quadraticCurveTo(hx, -Hh, hx, -Hh + 2 * c); ctx.lineTo(hx, -Hl - 1 * c);
  ctx.quadraticCurveTo(0, -Hl + 3 * c, -hx, -Hl - 1 * c);                       // opening
  ctx.lineTo(-hx, -Hh + 2 * c); ctx.quadraticCurveTo(-hx, -Hh, -hx - 1 * c, -Hh); ctx.lineTo(-hx - 6 * c + hb, -Hh);
  ctx.quadraticCurveTo(-hx - 8 * c + hb, -Hh, -hx - 8 * c + hb, -Hh + 2 * c); ctx.lineTo(-B + (hang ? 2 * c : 0), -Hl);
  ctx.quadraticCurveTo(-B - bol, -Hl * 0.5, -B + 1 * c, 0); ctx.closePath();
  ctx.fillStyle = rgba(kl, 0.9); ctx.fill(); ctx.strokeStyle = klR; ctx.lineWidth = 2; ctx.stroke();
  // zijvouwen (gusset) en lasnaad
  ctx.strokeStyle = rgba(klD, 0.9); ctx.lineWidth = 2;
  [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 3 * c), -2 * c); ctx.quadraticCurveTo(k * (B - 2.5 * c + bol * 0.6), -Hl * 0.5, k * (B - 3.2 * c), -Hl + 1 * c); ctx.stroke(); });
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-B + 2 * c, -1.2 * c); ctx.lineTo(B - 2 * c, -1.2 * c); ctx.stroke();
  // rimpels in de folie
  if (kreuk > 0.01) { ctx.strokeStyle = rgba(klD, 0.55 * kreuk); ctx.lineWidth = 1.6; [[-6, -10, -2, -20], [3, -6, 7, -16], [-9, -24, -4, -32], [4, -25, 9, -33], [-1, -14, 2, -27]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0 * c, y0 * c); ctx.quadraticCurveTo((x0 + x1) / 2 * c + 1.2 * c, (y0 + y1) / 2 * c, x1 * c, y1 * c); ctx.stroke(); }); }
  ctx.restore();
}

// STEVIGE PLASTIC TAS (LDPE, 30 g, 'middelgrote tas' TNO): 40 × 45 cm, dikke folie met uitgestanst handvat (ovaal gat met
// verstevigde rand), bodemvouw zichtbaar. Dichter grijs en dubbele rand, zodat hij duidelijk dikker leest dan het dunne tasje.
function mk2_plasticTas(ctx, x, y, s = 1, o = {}) { // beeldreview 2 nov 2026: leest als tas (twee lushengsels, zachte zijkanten, kreukels), niet als bak
  const { a = 1, vol = 0 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 20 * c, H = 45 * c, bol = vol * 1.5 * c, Bt = B - 2 * c;
  // achterste hengsel
  const lus = (dx, kl) => { ctx.strokeStyle = kl; ctx.lineWidth = 2.2 * c; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx - 8 * c, -H + 2 * c); ctx.bezierCurveTo(dx - 9 * c, -H - 15 * c, dx + 9 * c, -H - 15 * c, dx + 8 * c, -H + 2 * c); ctx.stroke(); };
  lus(1.5 * c, MK2.ldpeD);
  ctx.beginPath(); ctx.moveTo(-B + 1 * c, 0); ctx.lineTo(B - 1 * c, 0); ctx.quadraticCurveTo(B + 1.4 * c + bol, -H * 0.45, Bt, -H); ctx.quadraticCurveTo(0, -H + 2.2 * c, -Bt, -H); ctx.quadraticCurveTo(-B - 1.4 * c - bol, -H * 0.45, -B + 1 * c, 0); ctx.closePath();
  ctx.fillStyle = rgba(MK2.ldpe, 0.95); ctx.fill(); ctx.strokeStyle = MK2.ldpeR; ctx.lineWidth = 3; ctx.stroke();
  // dubbel gelaste bovenrand (dikke folie) en zijvouwen
  ctx.strokeStyle = MK2.ldpeD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-Bt + 0.6 * c, -H + 3 * c); ctx.quadraticCurveTo(0, -H + 5 * c, Bt - 0.6 * c, -H + 3 * c); ctx.stroke();
  ctx.strokeStyle = rgba(MK2.ldpeD, 0.8); [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 4 * c), -2 * c); ctx.quadraticCurveTo(k * (B - 2.5 * c + bol * 0.6), -H * 0.45, k * (Bt - 3 * c), -H + 4 * c); ctx.stroke(); });
  // kreukels
  ctx.strokeStyle = rgba(MK2.ldpeD, 0.6); ctx.lineWidth = 1.8; [[-9, -8, -5, -20], [6, -10, 9, -24], [-3, -26, 2, -36], [-12, -30, -8, -38]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0 * c, y0 * c); ctx.quadraticCurveTo((x0 + x1) / 2 * c + 1.4 * c, (y0 + y1) / 2 * c, x1 * c, y1 * c); ctx.stroke(); });
  // bodemvouw
  ctx.fillStyle = rgba(MK2.ldpeD, 0.45); ctx.beginPath(); ctx.moveTo(-B + 1 * c, 0); ctx.lineTo(B - 1 * c, 0); ctx.lineTo(B - 3 * c, -3 * c); ctx.lineTo(-B + 3 * c, -3 * c); ctx.closePath(); ctx.fill();
  // voorste hengsel, vastgelast op de bovenrand
  lus(0, MK2.ldpeR); ctx.fillStyle = MK2.ldpeD; [-8, 8].forEach(k => { roundRect(ctx, (k - 1.8) * c, -H + 1.4 * c, 3.6 * c, 3 * c, 3); ctx.fill(); });
  ctx.restore();
}

// PAPIEREN TAS (boodschappentas, 55 g VK / 51 g NL / 45 g DK): voorvlak 32 × 42 cm, zijvouw 17 cm (hier een smalle strook in
// driekwartaanzicht), ingevouwen bovenrand, getwijnde papieren hengsels (± 12 cm boog), bodemvouw.
function mk2_papierTas(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hang = false } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 16 * c, H = 42 * c, Z = 6 * c; // Z = zichtbare zijvouw
  if (hang) ctx.translate(0, H + 12 * c);
  // zijvouw (rechts, donkerder) met de W-vouw
  ctx.beginPath(); ctx.moveTo(B, 0); ctx.lineTo(B + Z, -2 * c); ctx.lineTo(B + Z, -H - 2 * c); ctx.lineTo(B, -H); ctx.closePath(); ctx.fillStyle = MK2.kraftD; ctx.fill();
  ctx.strokeStyle = rgba('#6E4A28', 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(B + Z / 2, -1 * c); ctx.lineTo(B + Z / 2, -H - 1 * c); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(B, 0); ctx.lineTo(B + Z / 2, -5 * c); ctx.lineTo(B + Z, -2 * c); ctx.stroke();
  // achterste hengsel
  const hengsel = (dx, kl, lw) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(dx - 7 * c, -H + 3 * c); ctx.bezierCurveTo(dx - 7 * c, -H - 13 * c, dx + 7 * c, -H - 13 * c, dx + 7 * c, -H + 3 * c); ctx.stroke(); };
  hengsel(Z * 0.6, MK2.kraftD, 1.3 * c);
  // voorvlak
  ctx.beginPath(); ctx.rect(-B, -H, 2 * B, H); ctx.fillStyle = MK2.kraft; ctx.fill();
  ctx.fillStyle = MK2.kraftR; ctx.fillRect(-B, -H, 2 * B, 4 * c);          // ingevouwen bovenrand
  ctx.strokeStyle = rgba('#6E4A28', 0.55); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-B, -H + 4 * c); ctx.lineTo(B, -H + 4 * c); ctx.stroke();
  ctx.fillStyle = rgba(MK2.kraftD, 0.55); ctx.fillRect(-B, -5 * c, 2 * B, 5 * c); // bodemvouw
  ctx.strokeStyle = rgba('#6E4A28', 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-B + 1.5 * c, -5 * c); ctx.lineTo(-B + 1.5 * c, -H + 4 * c); ctx.stroke();
  // voorste hengsel met twist-streepjes
  hengsel(0, MK2.kraftD, 1.3 * c); ctx.strokeStyle = rgba(MK2.kraftR, 0.8); ctx.lineWidth = 1.2;
  for (let i = 1; i < 12; i++) { const u = i / 12, bx = (1 - u) ** 3 * -7 + 3 * (1 - u) ** 2 * u * -7 + 3 * (1 - u) * u * u * 7 + u ** 3 * 7, by = (1 - u) ** 3 * 3 + 3 * (1 - u) ** 2 * u * -13 + 3 * (1 - u) * u * u * -13 + u ** 3 * 3; ctx.beginPath(); ctx.moveTo((bx - 0.4) * c, (-H / c + by - 0.4) * c); ctx.lineTo((bx + 0.4) * c, (-H / c + by + 0.4) * c); ctx.stroke(); }
  // lijmplekjes van het hengsel
  ctx.fillStyle = MK2.kraftR; [-7, 7].forEach(k => { roundRect(ctx, (k - 1.6) * c, -H + 1.2 * c, 3.2 * c, 2.6 * c, 3); ctx.fill(); });
  ctx.restore();
}

// PAPIEREN TASJE (lunchzakje van Thijs, kraft): 15 cm breed, 26 cm hoog, zijvouw als twee lijnen, bovenrand twee keer omgevouwen
// (flap, o.open = flap omhoog: tasje staat open). o.turf = aantal streepjes (pen) op het voorvlak, o.scheur 0..1 = scheurtje
// rechtsboven (bij streepje tien, twijfel t9). o.hang = aan de hand (x, y = midden van de omgevouwen rand).
function mk2_papierTasje(ctx, x, y, s = 1, o = {}) {
  const { a = 1, open = 0, turf = 0, scheur = 0, hang = false, lunch = 0 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 7.5 * c, H = 26 * c, F = 4 * c; if (hang) ctx.translate(0, H - F * (1 - open));
  const top = -H + F * (1 - open); // bovenkant (dichtgevouwen lager)
  // inhoud (broodje, appel) steekt boven het open tasje uit
  if (open > 0.3 && lunch > 0.01) mk2_laag(ctx, lunch, () => { mk2_bol(ctx, 2.5 * c, top - 1.8 * c, 3.2 * c, '#C8473C', '#E07A6A', 1.5); ctx.strokeStyle = '#6A4A2A'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(2.8 * c, top - 5 * c); ctx.lineTo(3.3 * c, top - 6.4 * c); ctx.stroke();
    roundRect(ctx, -6 * c, top - 3.2 * c, 7.5 * c, 4 * c, 1.6 * c); shape(ctx, '#D9B56E', '#EED29A', 1.5); ctx.fillStyle = '#7FC48F'; ctx.fillRect(-5.6 * c, top - 0.6 * c, 6.8 * c, 0.8 * c); });
  ctx.beginPath(); ctx.moveTo(-B, 0); ctx.lineTo(B, 0); ctx.lineTo(B, top); ctx.lineTo(-B, top); ctx.closePath(); ctx.fillStyle = MK2.kraft; ctx.fill();
  if (open > 0.5) { // open: gekartelde rand en de binnenkant
    ctx.fillStyle = MK2.kraftD; ctx.beginPath(); ctx.moveTo(-B, top); for (let i = 0; i <= 10; i++) ctx.lineTo(-B + i * 2 * B / 10, top + (i % 2 ? 0.7 * c : 0)); ctx.lineTo(B, top + 1.6 * c); ctx.lineTo(-B, top + 1.6 * c); ctx.closePath(); ctx.fill(); }
  else { // omgevouwen flap
    ctx.fillStyle = MK2.kraftR; ctx.fillRect(-B, top, 2 * B, F * 0.55); ctx.strokeStyle = rgba('#6E4A28', 0.6); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-B, top + F * 0.55); ctx.lineTo(B, top + F * 0.55); ctx.stroke(); }
  ctx.strokeStyle = rgba('#6E4A28', 0.45); ctx.lineWidth = 1.6; [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * (B - 1.4 * c), -0.5 * c); ctx.lineTo(k * (B - 1.4 * c), top + F); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(-B + 1.4 * c, -3 * c); ctx.lineTo(0, -1.4 * c); ctx.lineTo(B - 1.4 * c, -3 * c); ctx.stroke(); // bodemvouw
  if (turf > 0.01) mk2_turf(ctx, -B + 3.2 * c, top + F + 2.6 * c, Math.min(turf, 10), { h: 3.6 * c, gap: 1.4 * c, kl: MK2.potlood, lw: 3, perRij: 5 });
  if (scheur > 0.01) mk2_laag(ctx, scheur, () => { ctx.beginPath(); ctx.moveTo(B, top + F + 0.5 * c); ctx.lineTo(B - 1.3 * c, top + F + 1.8 * c); ctx.lineTo(B - 0.6 * c, top + F + 2.8 * c); ctx.lineTo(B - 2.2 * c, top + F + 4.4 * c); ctx.lineTo(B - 1.6 * c, top + F + 5.2 * c); ctx.lineTo(B, top + F + 4.0 * c); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = MK2.kraftR; ctx.lineWidth = 1.5; ctx.stroke(); });
  ctx.restore();
}

// KATOENEN TAS (tote): 38 × 42 cm, twee lange hengsels (2,5 cm breed, boog ± 28 cm), gestikte zoom (stippellijn), ecru.
function mk2_katoenTas(ctx, x, y, s = 1, o = {}) {
  const { a = 1, hang = false } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 19 * c, H = 42 * c; if (hang) ctx.translate(0, H + 28 * c);
  const hengsel = (kl) => { ctx.strokeStyle = kl; ctx.lineWidth = 2.5 * c; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-9 * c, -H + 3 * c); ctx.bezierCurveTo(-9 * c, -H - 36 * c, 9 * c, -H - 36 * c, 9 * c, -H + 3 * c); ctx.stroke(); };
  ctx.save(); ctx.translate(1.5 * c, -0.6 * c); hengsel(MK2.katoenD); ctx.restore();   // achterste hengsel
  roundRect(ctx, -B, -H, 2 * B, H, 0.8 * c); ctx.fillStyle = MK2.katoen; ctx.fill();
  ctx.fillStyle = rgba(MK2.katoenD, 0.35); ctx.fillRect(-B, -H, 2 * B, 3 * c);                  // omgeslagen zoom
  hengsel(MK2.katoenR); ctx.strokeStyle = rgba(MK2.katoenD, 0.9); ctx.lineWidth = 1.4; ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.moveTo(-B + 1 * c, -H + 3.6 * c); ctx.lineTo(B - 1 * c, -H + 3.6 * c); ctx.stroke();
  [-9, 9].forEach(k => { ctx.strokeRect((k - 1.6) * c, -H + 0.6 * c, 3.2 * c, 5 * c); });   // vastgestikte hengsels
  ctx.setLineDash([]); ctx.strokeStyle = rgba(MK2.katoenD, 0.5); ctx.lineWidth = 1.5; // zachte stofplooien
  [[-10, -6, -12, -20], [8, -4, 11, -18]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0 * c, y0 * c); ctx.quadraticCurveTo((x0 + x1) / 2 * c + 1.5 * c, (y0 + y1) / 2 * c, x1 * c, y1 * c); ctx.stroke(); });
  ctx.restore();
}

// klein tasje voor rasters en vakken (4 soorten), 1 eenheid ≈ 1 px; s = hoogte in px van het lijf
function mk2_miniTas(ctx, x, y, h, soort, a = 1) { if (a <= 0.01) return; const s = h / (MK2_CM * 45);
  if (soort === 'plastic') mk2_plasticTasje(ctx, x, y, s * 0.95, { a, kreuk: 0 });
  else if (soort === 'ldpe') mk2_plasticTas(ctx, x, y, s, { a });
  else if (soort === 'katoen') mk2_katoenTas(ctx, x, y, s * 0.85, { a });
  else if (soort === 'tasje') mk2_papierTasje(ctx, x, y, s * 1.3, { a });
  else mk2_papierTas(ctx, x, y, s, { a }); }

// TURFLIJST: groepjes van vier streepjes met een schuine vijfde. n mag een breuk zijn (het laatste streepje groeit).
// Geeft de breedte terug. o.perRij = streepjes per rij (daarna een nieuwe rij).
function mk2_turf(ctx, x, y, n, o = {}) { const { h = 40, gap = 14, kl = C.text, lw = 4, perRij = 25, a = 1 } = o; if (a <= 0.01 || n <= 0) return 0; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round';
  const groep = 4 * gap + gap * 1.6; let maxx = 0;
  for (let i = 0; i < Math.ceil(n); i++) { const f = Math.min(1, n - i); const rij = Math.floor(i / perRij), j = i % perRij, g = Math.floor(j / 5), k = j % 5; const gx = x + g * groep, gy = y + rij * h * 1.5;
    ctx.beginPath(); if (k < 4) { const xx = gx + k * gap + (hash(i * 3.3) - 0.5) * gap * 0.15; ctx.moveTo(xx, gy + h); ctx.lineTo(xx + (hash(i) - 0.5) * gap * 0.2, gy + h - h * f); maxx = Math.max(maxx, xx); }
    else { ctx.moveTo(gx - gap * 0.45, gy + h * 0.85); ctx.lineTo(gx - gap * 0.45 + (3 * gap + gap * 0.9) * f, gy + h * 0.85 - h * 0.7 * f); maxx = Math.max(maxx, gx + 3.5 * gap); } ctx.stroke(); }
  ctx.restore(); return maxx - x; }

// =====================================================================
// 2. STROOK 'VAN WIEG TOT GRAF' en de pictogrammen per stap (y = grondlijn, ± 120 px hoog bij s = 1)
// =====================================================================

// ja-knikker (oliebron): bok, balans, paardenkop, contragewicht; t laat hem knikken
function mk2_oliebron(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const kl = '#9A7A3E', klL = C.oker; ctx.fillStyle = '#5A4A34'; ctx.fillRect(-70, -8, 140, 8);
  ctx.strokeStyle = kl; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(0, -84); ctx.lineTo(26, -8); ctx.stroke(); // bok
  const an = Math.sin(t * 1.6) * 0.18; ctx.save(); ctx.translate(0, -84); ctx.rotate(an);
  roundRect(ctx, -62, -6, 112, 12, 5); shape(ctx, klL, null); // balans
  ctx.beginPath(); ctx.moveTo(-62, -12); ctx.quadraticCurveTo(-82, -6, -76, 22); ctx.lineTo(-62, 8); ctx.closePath(); shape(ctx, klL, null); // paardenkop
  ctx.restore(); mk2_bol(ctx, 0, -84, 6, '#5A4A34');
  const kx = -76 * Math.cos(an) - 22 * Math.sin(an) * 0 , ky = -84 + (-76) * Math.sin(an) + 22; ctx.strokeStyle = '#6E6A66'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70 * Math.cos(an), -84 - 70 * Math.sin(an) + 22); ctx.lineTo(-70, -8); ctx.stroke(); // stang naar de put
  ctx.save(); ctx.translate(44, -50); mk2_bol(ctx, 0, 0, 16, '#7A6440'); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(4 * Math.cos(an) - 0, -34 + 34 * an); ctx.stroke(); ctx.restore(); // krukas
  roundRect(ctx, -78, -22, 16, 14, 3); shape(ctx, '#5A4A34', null); ctx.restore(); }

// plasticgranulaat (korrels): bergje lensvormige korrels + een paar losse
function mk2_korrels(ctx, x, y, s = 1, o = {}) { const { a = 1, kl = MK2.plastic } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const korrel = (px, py, r) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.72, hash(px * 0.37 + py) * 3, 0, 6.283); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = '#8A94A4'; ctx.lineWidth = 1.4; ctx.stroke(); };
  for (let rij = 0; rij < 6; rij++) { const n = 9 - rij, w = n * 13; for (let i = 0; i < n; i++) korrel(-w / 2 + 6 + i * 13 + (hash(rij * 9 + i) - 0.5) * 4, -6 - rij * 10 + (hash(i * 5 + rij) - 0.5) * 3, 6.5); }
  korrel(-66, -5, 6); korrel(62, -4, 6); korrel(52, -12, 5.5); ctx.restore(); }

// fabriek: hal met zaagtanddak, schoorsteen (rookwolkje grijs, o.rook 0..1), o.kl = accentkleur van het dak
function mk2_fabriek(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, rook = 1, kl = C.oker } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#4A5672'; ctx.fillRect(34, -118, 18, 70); // schoorsteen
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-70, -50); for (let i = 0; i < 3; i++) { ctx.lineTo(-70 + i * 40, -78); ctx.lineTo(-30 + i * 40, -50); } ctx.lineTo(70, -50); ctx.lineTo(70, 0); ctx.closePath(); ctx.fillStyle = '#5A6884'; ctx.fill();
  ctx.fillStyle = kl; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-70 + i * 40, -78); ctx.lineTo(-64 + i * 40, -78); ctx.lineTo(-30 + i * 40, -54); ctx.lineTo(-30 + i * 40, -50); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#2A3A58'; for (let i = 0; i < 3; i++) ctx.fillRect(-58 + i * 34, -38, 20, 16); ctx.fillStyle = '#33405C'; ctx.fillRect(40, -30, 22, 30);
  if (rook > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 0.35 + i / 3) % 1; mk2_bol(ctx, 43 + ph * 22, -126 - ph * 40, 9 + ph * 10, rgba('#AEB6C2', 0.75 * rook * (1 - ph))); }
  ctx.restore(); }

// containerschip (naar schip() uit Biotechnologie 3, teken_bt3.js): romp, containers in rijen, brug achter; t = deinen
function mk2_schip(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.4) * 2); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-84, -30); ctx.lineTo(90, -30); ctx.lineTo(74, 0); ctx.lineTo(-76, 0); ctx.closePath(); ctx.fillStyle = '#3A4A66'; ctx.fill(); ctx.fillStyle = '#B8473C'; ctx.fillRect(-80, -9, 160, 5);
  const kl = ['#C9A35C', '#5BA4C9', '#B8473C', '#7FC48F', '#9AA3B2'];
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { roundRect(ctx, -70 + i * 24, -50 - r * 18, 22, 17, 2); shape(ctx, kl[(i + r * 2) % 5], null); }
  roundRect(ctx, 56, -70, 22, 40, 3); shape(ctx, '#C9D2DE', null); ctx.fillStyle = '#2A3A58'; ctx.fillRect(59, -64, 16, 5);
  ctx.strokeStyle = rgba('#6A8BB5', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-90 + i * 50, 6); ctx.quadraticCurveTo(-78 + i * 50, 0, -66 + i * 50, 6); ctx.stroke(); }
  ctx.restore(); }

// vrachtwagen (naar vrachtwagen() uit Biotechnologie 1, teken_bt1.js), klein, met dozen in plaats van kratten
function mk2_vrachtwagen(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -74, -66, 100, 52, 4); shape(ctx, '#4A5A78', null); roundRect(ctx, 30, -50, 40, 36, 6); shape(ctx, '#5A6E92', null); roundRect(ctx, 44, -46, 20, 14, 3); shape(ctx, '#9AB4CF', null);
  [-52, 0, 50].forEach(wx => { mk2_bol(ctx, wx, -10, 10, '#1C2436', '#8FA0B5', 1.5); mk2_bol(ctx, wx, -10, 4, '#5D6E8C'); }); ctx.restore(); }

// winkel: pui met luifel (strepen), etalage en deur; geen naam of logo
function mk2_winkel(ctx, x, y, s = 1, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5A6884'; ctx.fillRect(-64, -96, 128, 96); ctx.fillStyle = '#4A5672'; ctx.fillRect(-70, -104, 140, 10);
  for (let i = 0; i < 7; i++) { ctx.fillStyle = i % 2 ? '#E8E2D4' : '#7FA88A'; ctx.beginPath(); ctx.moveTo(-70 + i * 20, -92); ctx.lineTo(-50 + i * 20, -92); ctx.lineTo(-50 + i * 20, -74); ctx.quadraticCurveTo(-60 + i * 20, -66, -70 + i * 20, -74); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#9AB4CF'; ctx.fillRect(-54, -58, 56, 42); ctx.fillStyle = '#2A3A58'; ctx.fillRect(16, -58, 34, 58);
  ctx.fillStyle = rgba('#C9A35C', 0.9); ctx.fillRect(-48, -30, 12, 14); ctx.fillStyle = rgba('#E07A5F', 0.9); ctx.fillRect(-32, -26, 10, 10); ctx.fillStyle = rgba('#7FC48F', 0.9); ctx.fillRect(-18, -32, 12, 16);
  ctx.restore(); }

// afval: grijze container (kliko). o.soort 'stort' (berg ernaast) | 'verbranden' (vlammetje en schoorsteentje) | 'bak'
function mk2_afval(ctx, x, y, s = 1, o = {}) { const { a = 1, soort = 'bak', t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'stort') { ctx.beginPath(); ctx.moveTo(-10, 0); ctx.quadraticCurveTo(40, -66, 90, 0); ctx.closePath(); ctx.fillStyle = '#6A5A48'; ctx.fill(); [[22, -14, '#AEB6C2'], [44, -26, '#B98A57'], [60, -12, '#AEB6C2'], [36, -8, '#C9A35C']].forEach(([px, py, k]) => { roundRect(ctx, px, py, 12, 8, 2); shape(ctx, k, null); }); }
  if (soort === 'verbranden') { ctx.fillStyle = '#4A5672'; ctx.fillRect(18, -96, 50, 96); ctx.fillStyle = '#3A4660'; ctx.fillRect(48, -130, 12, 36); ctx.fillStyle = '#2A3448'; ctx.fillRect(26, -50, 28, 26);
    const fl = 1 + Math.sin(t * 9) * 0.12; ctx.beginPath(); ctx.moveTo(30, -26); ctx.quadraticCurveTo(28, -40 * fl, 40, -48 * fl); ctx.quadraticCurveTo(52, -38 * fl, 50, -26); ctx.closePath(); ctx.fillStyle = C.koraal; ctx.fill(); }
  const dx = soort === 'bak' ? 0 : -46; roundRect(ctx, dx - 26, -74, 52, 74, 5); shape(ctx, '#7A8494', null); roundRect(ctx, dx - 30, -82, 60, 10, 4); shape(ctx, '#5E6878', null);
  ctx.fillStyle = '#5E6878'; ctx.fillRect(dx - 22, -60, 44, 4); mk2_bol(ctx, dx - 18, -4, 6, '#2A3040'); mk2_bol(ctx, dx + 18, -4, 6, '#2A3040'); ctx.restore(); }

// bos: drie naaldbomen en een berk (papier komt uit naald- en loofhout), zonder wortels; o.groei 0..1 = teruggroeien (vraag 2)
function mk2_bos(ctx, x, y, s = 1, o = {}) { const { a = 1, groei = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const den = (bx, h, k) => { const g = clamp(groei * 1.2 - k * 0.15, 0.15, 1); h *= g; ctx.fillStyle = '#6A4A30'; ctx.fillRect(bx - 3, -h * 0.22, 6, h * 0.22); for (let i = 0; i < 3; i++) { const yy = -h * (0.15 + i * 0.25), w = h * (0.32 - i * 0.07); ctx.beginPath(); ctx.moveTo(bx - w, yy); ctx.lineTo(bx, yy - h * 0.42); ctx.lineTo(bx + w, yy); ctx.closePath(); ctx.fillStyle = i % 2 ? '#5FA86E' : '#4E9460'; ctx.fill(); } };
  den(-46, 110, 0); den(40, 96, 2); den(-6, 126, 1);
  const g = clamp(groei * 1.2 - 0.4, 0.15, 1), bh = 90 * g; ctx.fillStyle = '#E8E2D4'; ctx.fillRect(64, -bh * 0.55, 6, bh * 0.55); ctx.fillStyle = '#2A2A2A'; [0.15, 0.3, 0.42].forEach(f => ctx.fillRect(64, -bh * f, 4, 2));
  ctx.beginPath(); ctx.ellipse(67, -bh * 0.72, bh * 0.2, bh * 0.28, 0, 0, 6.283); ctx.fillStyle = C.groen; ctx.fill();
  ctx.restore(); }

// pulp: bergje houtsnippers en een kuip met papierpulp (beige brij in water)
function mk2_pulp(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 16; i++) { const px = -72 + hash(i * 3.1) * 40, py = -4 - hash(i * 7.7) * (22 - Math.abs(px + 52) * 0.6); ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i) * 3); ctx.fillStyle = i % 2 ? '#C9A35C' : '#B08A50'; ctx.fillRect(-6, -2.5, 12, 5); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-18, -66); ctx.lineTo(70, -66); ctx.lineTo(62, 0); ctx.lineTo(-10, 0); ctx.closePath(); ctx.fillStyle = '#5A6884'; ctx.fill();
  ctx.beginPath(); ctx.ellipse(26, -64, 44, 9, 0, 0, 6.283); ctx.fillStyle = '#D9CBA8'; ctx.fill();
  ctx.strokeStyle = rgba('#A8977A', 0.9); ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(26 + Math.sin(t + i) * 4, -64, 30 - i * 9, 5 - i * 1.4, 0, 0, 6.283); ctx.stroke(); }
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(26, -64); ctx.lineTo(26 + Math.cos(t * 2) * 6, -96); ctx.stroke(); // roerder
  ctx.restore(); }

// papierfabriek met waterpijp: hal + papiermachine (rollen) + teal pijp die water aanvoert (o.water 0..1 = stroom zichtbaar)
function mk2_papierfabriek(ctx, x, y, s = 1, o = {}) { const { a = 1, t = 0, water = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // waterpijp links: van een golfje (rivier) de fabriek in
  ctx.strokeStyle = '#3E7FA6'; ctx.lineWidth = 12; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke();
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; ctx.strokeStyle = '#CFE6F2'; ctx.lineWidth = 3; ctx.setLineDash([6, 10]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(-96, -6); ctx.lineTo(-96, -40); ctx.lineTo(-62, -40); ctx.stroke(); ctx.restore(); }
  ctx.strokeStyle = C.teal; ctx.lineWidth = 3; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(-114 + i * 18, 0); ctx.quadraticCurveTo(-108 + i * 18, -6, -102 + i * 18, 0); ctx.stroke(); }
  mk2_fabriek(ctx, 0, 0, 0.92, { t, kl: C.oker, rook: 0.7 });
  // papierrol voor de deur
  ctx.beginPath(); ctx.ellipse(84, -14, 8, 14, 0, 0, 6.283); ctx.fillStyle = '#E8E2D4'; ctx.fill(); ctx.fillStyle = '#E8E2D4'; ctx.fillRect(84, -28, 26, 28); ctx.beginPath(); ctx.ellipse(110, -14, 8, 14, 0, 0, 6.283); ctx.fillStyle = '#F4F0E6'; ctx.fill(); mk2_bol(ctx, 110, -14, 3, '#8A8270');
  ctx.restore(); }

// pijltje 'erin' (boven de streep, naar beneden in de stap) of 'eruit' (onder de streep, naar beneden weg)
function mk2_inUit(ctx, x, yLijn, soort, a = 1, s = 1) { if (a <= 0.01) return; const up = soort === 'in'; const kl = up ? C.oker : C.koraal;
  const y0 = up ? yLijn - 168 * s : yLijn + 18 * s, y1 = up ? yLijn - 128 * s : yLijn + 66 * s; pijl(ctx, x, y0, x, y1, kl, a, Math.max(3, 5 * s), Math.max(10, 16 * s)); }

// LANGE STROOK 'WIEG → GRAF': papierstrook met twee rijen (plastic boven, papier onder), elk met een streep; per stap een
// pictogram op de streep, 'erin'-pijltje erboven en 'eruit'-pijltje eronder. o.u 0..1 = uitrollen (rol rechts),
// o.rijen 'beide'|'plastic'|'papier', o.n = aantal getekende stappen per rij (0..6, breuk = verschijnt), o.pijlen 0..1,
// o.hl = [kolommen] goud omrand, o.afval = [plastic, papier] 'stort'|'verbranden'|'bak', o.t. Geeft {kol: [x…], rij: [y plastic, y papier]} terug (lijnhoogtes, voor de scènes).
const MK2_STAPPEN = ['GRONDSTOF', 'MATERIAAL', 'FABRIEK', 'VERVOER', 'WINKEL', 'AFVAL'];
function mk2_strook(ctx, x, y, w, o = {}) {
  const { a = 1, u = 1, rijen = 'beide', n = 6, pijlen = 1, hl = [], t = 0, s = 1, kop = 1, afval = ['stort', 'stort'], pijlA = null } = o; // afval: Brits onderzoek 86 % stort (getal 17)
  const H = 560 * s; // (fix 2 nov 2026: stond in het commentaar, strook werd 1080 hoog)
  const kol = MK2_STAPPEN.map((_, i) => x + 240 * s + i * (w - 370 * s) / 5), rij = [y + 230 * s, y + 470 * s];
  if (a <= 0.01) return { kol, rij }; ctx.save(); ctx.globalAlpha *= a;
  const wu = Math.max(40, w * u); ctx.save(); ctx.beginPath(); ctx.rect(x - 4, y - 10, wu + 4, H + 20); ctx.clip();
  roundRect(ctx, x, y, w, H, 6); ctx.fillStyle = MK2.papier; ctx.fill(); ctx.fillStyle = rgba(MK2.papierD, 0.5); ctx.fillRect(x, y + H - 8, w, 8);
  if (kop > 0.01) { mk2_laag(ctx, kop, () => { text(ctx, 'WIEG', x + 34 * s, y + 62 * s, fTekst(40 * s, 800), MK2.inkt, 'left'); text(ctx, 'GRAF', x + w - 34 * s, y + 62 * s, fTekst(40 * s, 800), MK2.inkt, 'right');
    ctx.strokeStyle = rgba(MK2.inkt, 0.5); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x + 170 * s, y + 50 * s); ctx.lineTo(x + w - 170 * s, y + 50 * s); ctx.stroke(); ctx.setLineDash([]); pijl(ctx, x + w - 200 * s, y + 50 * s, x + w - 166 * s, y + 50 * s, rgba(MK2.inkt, 0.5), 1, 2, 12); }); }
  // goud omrande kolommen (vraag 1)
  hl.forEach(k => { const [k0, k1] = Array.isArray(k) ? k : [k, k]; roundRect(ctx, kol[k0] - 118 * s, y + 80 * s, kol[k1] - kol[k0] + 236 * s, H - 100 * s, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = rgba(C.goud, 0.1); ctx.fill(); });
  const rijTek = (r, soort) => { const yl = rij[r], nn = o.nRij ? o.nRij[r] : n; ctx.strokeStyle = rgba(MK2.inkt, 0.75); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 40 * s, yl); ctx.lineTo(x + w - 40 * s, yl); ctx.stroke();
    mk2_miniTas(ctx, x + 80 * s, yl - 8 * s, 110 * s, soort === 'plastic' ? 'plastic' : 'papier');
    const icons = soort === 'plastic'
      ? [(cx, cy, aa) => mk2_oliebron(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_korrels(ctx, cx, cy, s, { a: aa }), (cx, cy, aa) => mk2_fabriek(ctx, cx, cy, s * 0.9, { a: aa, t }), (cx, cy, aa) => mk2_schip(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_winkel(ctx, cx, cy, s * 0.8, { a: aa }), (cx, cy, aa) => mk2_afval(ctx, cx, cy, s * 0.85, { a: aa, soort: afval[0], t })]
      : [(cx, cy, aa) => mk2_bos(ctx, cx, cy, s * 0.85, { a: aa }), (cx, cy, aa) => mk2_pulp(ctx, cx, cy, s * 0.85, { a: aa, t }), (cx, cy, aa) => mk2_papierfabriek(ctx, cx, cy, s * 0.8, { a: aa, t }), (cx, cy, aa) => mk2_vrachtwagen(ctx, cx, cy, s, { a: aa }), (cx, cy, aa) => mk2_winkel(ctx, cx, cy, s * 0.8, { a: aa }), (cx, cy, aa) => mk2_afval(ctx, cx, cy, s * 0.85, { a: aa, soort: afval[1], t })];
    icons.forEach((fn, i) => { const aa = clamp(nn - i, 0, 1); if (aa <= 0.01) return; fn(kol[i], yl - 2 * s, aa); }); for (let i = 0; i < 6; i++) { const aa = clamp(nn - i, 0, 1); mk2_inUit(ctx, kol[i] - 40 * s, yl, 'in', (pijlA ? pijlA(i, 'in', r) : aa) * pijlen, s); mk2_inUit(ctx, kol[i] + 40 * s, yl, 'uit', (pijlA ? pijlA(i, 'uit', r) : aa) * pijlen, s); } };
  if (rijen !== 'papier') rijTek(0, 'plastic'); if (rijen !== 'plastic') rijTek(1, 'papier');
  ctx.restore();
  if (u < 0.999) { const rx = x + wu; roundRect(ctx, rx - 14, y - 10, 34, H + 20, 16); ctx.fillStyle = '#DCD4C2'; ctx.fill(); ctx.fillStyle = '#C4BAA4'; ctx.fillRect(rx + 2, y - 4, 6, H + 8); } // de rol
  ctx.restore(); return { kol, rij }; }

// =====================================================================
// 3. VIER VAKKEN, METHAAN → CO₂, WEEGSCHAAL EN SCHUIFJE
// =====================================================================

// De vier milieueffecten (TNO 2015 via CE Delft, getallen 8): verhouding plastic : papier per vak, slechtste = 1.
// Klimaat: papier 1,3× beter · stikstof naar zee: papier 3,3× minder · land: papier 244× meer · water: papier 38× meer.
const MK2_VAK = [
  { id: 'klimaat',  naam: 'KLIMAAT',           eenheid: 'KG CO₂',      kl: C.koraal,     p: 1,       q: 1 / 1.3, maal: '1,3×' },
  { id: 'stikstof', naam: 'STIKSTOF NAAR ZEE', eenheid: 'KG N',        kl: C.oker, p: 1,       q: 1 / 3.3, maal: '3,3×' },
  { id: 'land',     naam: 'LAND',              eenheid: 'M² PER JAAR', kl: C.groen,      p: 1 / 244, q: 1,       maal: '244×' },
  { id: 'water',    naam: 'WATER',             eenheid: 'LITER',       kl: C.teal,       p: 1 / 38,  q: 1,       maal: '38×' }];
// één vak: titel + eenheid in de vakkleur, twee staafjes (plastic tas / papieren tas) op één grondlijn, mini-tas eronder.
// o.staaf 0..1 = groeien (plastic eerst, dan papier), o.hl = goud omrand, o.maal = verhoudingslabel boven het hoogste staafje.
function mk2_vak(ctx, x, y, w, h, i, o = {}) { const { a = 1, staaf = 1, hl = 0, maal = 0, plasticSoort = 'ldpe' } = o; if (a <= 0.01) return; const V = MK2_VAK[i]; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.85), hl > 0.5 ? C.goud : rgba(V.kl, 0.9), hl > 0.5 ? 4 : 2.5);
  ctx.fillStyle = V.kl; roundRect(ctx, x, y, w, 12, 6); ctx.fill();
  let px = 38; ctx.font = fTekst(px, 800); while (px > 26 && ctx.measureText(V.naam).width > w - 30) { px -= 2; ctx.font = fTekst(px, 800); } text(ctx, V.naam, x + w / 2, y + 62, fTekst(px, 800), V.kl, 'center'); metaText(ctx, V.eenheid, x + w / 2, y + 104, C.text2, 'center', 28);
  const g0 = y + h - 110, Hm = h - 280, bw = Math.min(70, w * 0.22); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 24, g0); ctx.lineTo(x + w - 24, g0); ctx.stroke();
  [[V.p, MK2.ldpe, x + w * 0.32, plasticSoort], [V.q, MK2.kraft, x + w * 0.68, 'papier']].forEach(([v, kl, bx, soort], k) => { const gr = clamp(staaf * 2 - k, 0, 1); const hh = Math.max(5, Hm * v * ease(gr));
    if (gr > 0.01) { roundRect(ctx, bx - bw / 2, g0 - hh, bw, hh, Math.min(6, hh / 2)); ctx.fillStyle = kl; ctx.fill(); }
    mk2_miniTas(ctx, bx, g0 + 82, 60, soort); });
  if (maal > 0.01) { const big = V.p >= V.q ? x + w * 0.32 : x + w * 0.68; mk2_laag(ctx, maal, () => text(ctx, V.maal, big, g0 - Hm - 16, fTekst(36, 800), C.text, 'center')); }
  ctx.restore(); }
// vier vakken naast elkaar; o.n = aantal zichtbare vakken (breuk = faden), o.staaf = [4 × 0..1] of één getal
function mk2_vierVakken(ctx, x, y, w, h, o = {}) { const { a = 1, n = 4, staaf = 1, hl = -1, maal = 0 } = o; const gap = 28, vw = (w - 3 * gap) / 4;
  for (let i = 0; i < 4; i++) { const av = clamp(n - i, 0, 1); mk2_vak(ctx, x + i * (vw + gap), y, vw, h, i, { a: a * av, staaf: Array.isArray(staaf) ? staaf[i] : staaf, hl: hl === i ? 1 : 0, maal }); } }

// METHAAN WORDT CO₂: grijs wolkje met methaanmoleculen (C met vier H, bol-en-staaf in neutrale tinten) dat krimpt, terwijl een
// koraal blok 'CO₂' groeit. u 0..1. Geen koe (methaan in de pens zit in Eén aarde).
function mk2_methaan(ctx, x, y, r, t = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(t * 0.3);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = r * 0.18; [[0, -1], [0.94, 0.33], [-0.47, 0.6], [-0.47, -0.2]].forEach(([dx, dy], k) => { const L = r * (k === 3 ? 0.9 : 1.25); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dx * L, dy * L); ctx.stroke(); mk2_bol(ctx, dx * L, dy * L, r * 0.36, '#F2F2EE', '#C9CED6', 1.2); });
  mk2_bol(ctx, 0, 0, r * 0.55, '#5E6878', '#9AA3B2', 1.5); ctx.restore(); }
function mk2_methaanNaarCO2(ctx, x, y, s = 1, u = 0, o = {}) { const { a = 1, t = 0, labels = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 1 - ease(u / 0.75), b = ease((u - 0.25) / 0.6); // wolk krimpt en schuift naar links weg terwijl het blok groeit
  if (w > 0.01) { ctx.save(); ctx.translate(-90 * (1 - w), -40 * (1 - w)); ctx.scale(0.35 + 0.65 * w, 0.35 + 0.65 * w); ctx.globalAlpha *= Math.min(1, w * 2.5);
    ctx.fillStyle = '#7C8698'; [[-60, 10, 52], [0, -18, 66], [62, 6, 54], [20, 30, 50], [-28, 34, 44]].forEach(([cx, cy, rr]) => { ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.283); ctx.fill(); });
    mk2_methaan(ctx, -40, 4, 16, t); mk2_methaan(ctx, 34, -12, 16, t + 2); mk2_methaan(ctx, 22, 34, 13, t + 4);
    if (labels > 0.01 && w > 0.6) metaText(ctx, 'METHAAN', 0, 120, C.text2, 'center', 28); ctx.restore(); }
  if (b > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, b * 2); const z = 20 + 60 * b; // kubus van drie vlakken
    ctx.beginPath(); ctx.moveTo(-z, -z * 0.4); ctx.lineTo(0, -z * 0.8); ctx.lineTo(z, -z * 0.4); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = '#F0A48E'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-z, -z * 0.4); ctx.lineTo(0, 0); ctx.lineTo(0, z * 1.1); ctx.lineTo(-z, z * 0.7); ctx.closePath(); ctx.fillStyle = C.koraal; ctx.fill();
    ctx.beginPath(); ctx.moveTo(z, -z * 0.4); ctx.lineTo(0, 0); ctx.lineTo(0, z * 1.1); ctx.lineTo(z, z * 0.7); ctx.closePath(); ctx.fillStyle = '#B85A44'; ctx.fill();
    if (b > 0.6) text(ctx, 'CO₂', -z * 0.5, z * 0.55, fTekst(34, 800), '#2A1A14', 'center'); if (labels > 0.01 && b > 0.6) metaText(ctx, 'OMGEREKEND NAAR CO₂', 0, 80 * 1.1 + 50, C.koraal, 'center', 28); ctx.restore(); }
  ctx.restore(); }

// eenheidsblokje voor op de weegschaal: kleine kaart met eenheid in de vakkleur
function mk2_eenheid(ctx, x, y, s2, kl, a = 1, px = 38) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width + 36; roundRect(ctx, x - w / 2, y - px - 26, w, px + 26, 8); shape(ctx, rgba(kl, 0.25), kl, 2.5); text(ctx, s2, x, y - 14, fTekst(px, 800), C.text, 'center'); ctx.restore(); }

// WEEGSCHAAL (balans, naar weegschaal() uit Biotechnologie 1, teken_bt1.js): o.tilt > 0 = links omlaag; o.links/o.rechts(ctx, px, py)
// tekenen de inhoud op de schaal (py = bodem van de schaal); o.zoek 0..1 laat de balk heen en weer zoeken (vraag 3), o.t.
function mk2_weegschaal(ctx, x, y, s = 1, o = {}) { const { a = 1, zoek = 0, t = 0 } = o; let tilt = o.tilt || 0; tilt += zoek * Math.sin(t * 2.4) * 0.16; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -260); ctx.stroke(); roundRect(ctx, -70, -10, 140, 20, 6); shape(ctx, '#33456A', '#8FA0B5', 2);
  ctx.save(); ctx.translate(0, -260); ctx.rotate(-tilt); ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.stroke(); mk2_bol(ctx, 0, 0, 10, C.goud); ctx.restore();
  const L = [-230 * Math.cos(tilt), -260 + Math.sin(tilt) * 230], R = [230 * Math.cos(tilt), -260 - Math.sin(tilt) * 230];
  [[L, o.links], [R, o.rechts]].forEach(([[px, py], fn]) => { ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 80, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 80, py + 110); ctx.stroke();
    if (fn) fn(ctx, px, py + 108); ctx.beginPath(); ctx.ellipse(px, py + 112, 100, 14, 0, 0, Math.PI); ctx.fillStyle = '#33456A'; ctx.fill(); ctx.stroke(); });
  ctx.restore(); }

// SCHUIFJE 'HOE ZWAAR WEEGT LAND?' (illustratie, zonder getallen): balk met links KLIMAAT (koraal) en rechts LAND (groen),
// gouden knop op v (0 = klimaat zwaar, 1 = land zwaar). Eronder de twee tassen: de winnaar komt omhoog met een gouden ring.
// Richting (getallen 11, 12, t4): land zwaarder → plastic wint; klimaat zwaarder → papier wint.
function mk2_schuifje(ctx, x, y, w, v, o = {}) { const { a = 1, tassen = 1, kop = 1, label = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (kop > 0.01) mk2_laag(ctx, kop, () => text(ctx, 'HOE ZWAAR WEEGT LAND?', x, y - 70, fTekst(40, 800), C.text, 'center'));
  roundRect(ctx, x - w / 2, y - 9, w, 18, 9); ctx.fillStyle = '#2A3A58'; ctx.fill();
  roundRect(ctx, x - w / 2, y - 9, w * v, 18, 9); ctx.fillStyle = rgba(C.groen, 0.7); ctx.fill();
  roundRect(ctx, x - w / 2 + w * v, y - 9, w * (1 - v), 18, 9); ctx.fillStyle = rgba(C.koraal, 0.7); ctx.fill();
  text(ctx, 'KLIMAAT', x - w / 2 - 24, y + 12, fTekst(36, 800), C.koraal, 'right'); text(ctx, 'LAND', x + w / 2 + 24, y + 12, fTekst(36, 800), C.groen, 'left');
  mk2_bol(ctx, x - w / 2 + w * v, y, 24, '#E8ECF2', '#8FA0B5', 3); // knop neutraal (keuring ronde 4: geen gouden cirkel)
  if (tassen > 0.01) mk2_laag(ctx, tassen, () => { const win = clamp((v - 0.5) * 6, -1, 1); // >0 plastic wint
    // keuring ronde 4: de 'winnende' tas wordt alleen iets groter en helderder, de andere iets doffer
    [[x - 130, 'ldpe', win], [x + 130, 'papier', -win]].forEach(([tx, soort, ww]) => { const g = 1 + Math.max(0, ww) * 0.22, ty = y + 240;
      ctx.save(); if (ww > 0.05) ctx.filter = 'brightness(' + (1 + 0.22 * ww).toFixed(3) + ')'; mk2_miniTas(ctx, tx, ty, 120 * g, soort, ww < -0.3 ? 0.55 : 1); ctx.restore(); }); });
  if (label > 0.01) mk2_meta(ctx, 'ILLUSTRATIE · RICHTING UIT DE STUDIES', x, y + 310, C.text2, 'center', 28, label);
  ctx.restore(); }

// =====================================================================
// 4. EEN MAAND BOODSCHAPPEN, TASJES IN RIJEN, RAPPORTEN
// =====================================================================

// één boodschap (± 40 px): 0 melkpak, 1 blik, 2 fles, 3 appel, 4 brood, 5 doos, 6 banaan, 7 pot
function mk2_boodschap(ctx, x, y, k, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (k === 0) { ctx.fillStyle = '#E8ECF2'; ctx.fillRect(-12, -40, 24, 40); ctx.beginPath(); ctx.moveTo(-12, -40); ctx.lineTo(0, -50); ctx.lineTo(12, -40); ctx.fill(); ctx.fillStyle = '#5B8CC9'; ctx.fillRect(-12, -24, 24, 10); }
  else if (k === 1) { ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-12, -30, 24, 30); ctx.fillStyle = '#C8473C'; ctx.fillRect(-12, -22, 24, 12); }
  else if (k === 2) { ctx.fillStyle = '#5FA86E'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -28); ctx.lineTo(-4, -36); ctx.lineTo(-4, -46); ctx.lineTo(4, -46); ctx.lineTo(4, -36); ctx.lineTo(9, -28); ctx.lineTo(9, 0); ctx.closePath(); ctx.fill(); }
  else if (k === 3) { mk2_bol(ctx, 0, -13, 13, '#C8473C'); ctx.fillStyle = '#7FC48F'; ctx.beginPath(); ctx.ellipse(5, -28, 5, 2.5, -0.5, 0, 6.283); ctx.fill(); }
  else if (k === 4) { roundRect(ctx, -22, -24, 44, 24, 10); ctx.fillStyle = '#C9A35C'; ctx.fill(); ctx.strokeStyle = '#E2C487'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 12 - 4, -20); ctx.lineTo(i * 12 + 4, -8); ctx.stroke(); } }
  else if (k === 5) { ctx.fillStyle = '#E07A5F'; ctx.fillRect(-16, -38, 32, 38); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-10, -28, 20, 10); }
  else if (k === 6) { ctx.strokeStyle = '#E8C84A'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, -30, 22, 0.5, 2.4); ctx.stroke(); }
  else { ctx.fillStyle = '#B85A44'; roundRect(ctx, -11, -30, 22, 30, 5); ctx.fill(); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-12, -36, 24, 7); }
  ctx.restore(); }
// STAPEL 'EEN MAAND BOODSCHAPPEN' (VK: 483 dingen, getal 32): een berg van ± 75 getekende boodschappen (niet 483: leesbaar),
// o.n 0..1 = opbouw van onder naar boven.
function mk2_boodschappen(ctx, x, y, s = 1, o = {}) { const { a = 1, n = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  let idx = 0; const tot = 75; for (let r = 0; r < 9; r++) { const m = 14 - r * 1.5 | 0; for (let i = 0; i < m; i++) { idx++; const f = clamp(n * tot - idx + 1, 0, 1); if (f <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= f; mk2_boodschap(ctx, (i - (m - 1) / 2) * 40 + (hash(idx * 1.7) - 0.5) * 10, -r * 36 - (1 - f) * 20, Math.floor(hash(idx * 3.9) * 8), 0.95 + hash(idx) * 0.15); ctx.restore(); } }
  ctx.restore(); }
// TASJES IN EEN RASTER (82 dunne plastic of 65 papieren, getal 32); o.k = aantal getoond (breuk mag)
function mk2_tasjesRaster(ctx, x, y, n, soort, o = {}) { const { a = 1, per = 10, gap = 44, h = 38, k = n } = o; if (a <= 0.01) return; for (let i = 0; i < n; i++) { const f = clamp(k - i, 0, 1); if (f <= 0.01) continue; mk2_miniTas(ctx, x + (i % per) * gap, y + Math.floor(i / per) * (h * 1.5), h, soort, a * f); } }

// RAPPORT met aannames (VK 2011 / Denemarken 2018): crème vel met kop, jaartal, grijze tekstregels en daaronder de aannames als
// regels. o.n = aantal getoonde aannames (breuk), o.hl = index goud gemarkeerd, o.vraag 0..1 = groot vraagteken erop (vraag 5).
function mk2_rapport(ctx, x, y, w, kop, jaar, rijen = [], o = {}) { const { a = 1, n = rijen.length, hl = -1, vraag = 0, rot = 0, kl = C.goud } = o; if (a <= 0.01) return 0;
  const rh = 62, h = 250 + rijen.length * rh; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot); ctx.translate(-w / 2, -h / 2);
  roundRect(ctx, 0, 0, w, h, 8); shape(ctx, MK2.papier, MK2.papierD, 2); ctx.fillStyle = kl; ctx.fillRect(0, 0, 14, h);
  { let px = 38; ctx.font = fTekst(px, 800); while (px > 24 && ctx.measureText(kop).width > w - (vraag > 0.01 ? 170 : 70)) { px -= 2; ctx.font = fTekst(px, 800); } text(ctx, kop, 40, 62, fTekst(px, 800), MK2.inkt, 'left'); } metaText(ctx, jaar, 40, 104, '#5A6478', 'left', 28);
  ctx.fillStyle = '#C9C0AE'; for (let i = 0; i < 4; i++) ctx.fillRect(40, 134 + i * 20, w - 90 - (i % 2) * 70, 7);
  metaText(ctx, 'AANNAMES', 40, 236, '#5A6478', 'left', 24);
  rijen.forEach((r, i) => { const f = clamp(n - i, 0, 1); if (f <= 0.01) return; const ry = 254 + i * rh; ctx.save(); ctx.globalAlpha *= f; if (i === hl) { roundRect(ctx, 26, ry - 6, w - 52, rh - 6, 6); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); }
    let px = 38; ctx.font = fTekst(px, 700); while (px > 30 && ctx.measureText(r).width > w - 70) { px -= 1; ctx.font = fTekst(px, 700); } text(ctx, r, 40, ry + 40, fTekst(px, 700), MK2.inkt, 'left'); ctx.restore(); });
  if (vraag > 0.01) mk2_laag(ctx, vraag, () => { mk2_bol(ctx, w + 10, -14, 46, C.goud); text(ctx, '?', w + 10, 10, fTitel(68), '#1A2740', 'center'); });
  ctx.restore(); return h; }

// =====================================================================
// 5. PEDAALEMMER, BERM, POSTER, ADVIESBRIEF, TABLET
// =====================================================================

// PEDAALEMMER (zijaanzicht, ± 40 cm hoog) met een dun plastic tasje als vuilniszak: rand van het tasje over de emmerrand
// geslagen, de hengsels hangen er links en rechts overheen. o.deksel 0..1 = open (scharnier achter), o.tasje 0..1.
function mk2_pedaalemmer(ctx, x, y, s = 1, o = {}) { const { a = 1, deksel = 0, tasje = 1 } = o; if (a <= 0.01) return; const c = MK2_CM; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const B = 14 * c, H = 38 * c;
  ctx.beginPath(); ctx.moveTo(-B + 2.2 * c, 0); ctx.lineTo(B - 2.2 * c, 0); ctx.lineTo(B, -H); ctx.lineTo(-B, -H); ctx.closePath(); ctx.fillStyle = '#C9D2DE'; ctx.fill(); // romp (rvs-licht), iets taps
  ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(-B * 0.55, -H + 2 * c, 2.2 * c, H - 4 * c); ctx.fillStyle = '#8D98A8'; ctx.fillRect(-B + 1 * c, -1.6 * c, 2 * B - 2 * c, 1.6 * c);
  roundRect(ctx, -B * 0.25 - 0.5 * c, -1.4 * c, B * 0.5 + 1 * c, 2.2 * c, 4); shape(ctx, '#5E6878', null);  // pedaal
  if (tasje > 0.01) mk2_laag(ctx, tasje, () => { // tasje over de rand + hengsels
    ctx.fillStyle = rgba(MK2.plastic, 0.95); ctx.fillRect(-B - 0.4 * c, -H, 2 * B + 0.8 * c, 4.5 * c);
    ctx.strokeStyle = MK2.plasticD; ctx.lineWidth = 1.5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-B + (i * 6 + 2) * c, -H + 0.5 * c); ctx.lineTo(-B + (i * 6 + 3) * c, -H + 4 * c); ctx.stroke(); }
    [-1, 1].forEach(k => { ctx.beginPath(); ctx.moveTo(k * B, -H + 0.5 * c); ctx.quadraticCurveTo(k * (B + 4 * c), -H + 3 * c, k * (B + 1.5 * c), -H + 9 * c); ctx.lineTo(k * (B + 0.2 * c), -H + 8 * c); ctx.quadraticCurveTo(k * (B + 2.2 * c), -H + 3.5 * c, k * (B - 0.5 * c), -H + 2 * c); ctx.closePath(); ctx.fillStyle = MK2.plastic; ctx.fill(); }); });
  ctx.save(); ctx.translate(B, -H); ctx.rotate(-deksel * 1.25); // deksel, scharnier rechtsachter
  ctx.beginPath(); ctx.moveTo(0.4 * c, 0); ctx.lineTo(-2 * B - 0.4 * c, 0); ctx.quadraticCurveTo(-B, -3.2 * c, 0.4 * c, 0); ctx.closePath(); ctx.fillStyle = '#AFBAC8'; ctx.fill(); ctx.fillStyle = '#8D98A8'; ctx.fillRect(-2 * B, -0.8 * c, 2 * B, 1.2 * c); ctx.restore();
  ctx.restore(); }

// tasje dat plat in de berm ligt (gekreukt, liggend), voor mk2_berm
function mk2_tasjeLiggend(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(Math.PI / 2 - 0.08); ctx.scale(0.62 * s, 0.5 * s);
  mk2_plasticTasje(ctx, 0, 14 * MK2_CM, 1, { kreuk: 1.4 }); ctx.restore(); }
function _mk2_tasjeLiggendOud(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.12);
  ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(-96, -22, -70, -34); ctx.lineTo(-40, -30); ctx.quadraticCurveTo(-30, -52, -10, -46); ctx.quadraticCurveTo(10, -40, 20, -34); ctx.lineTo(70, -38); ctx.quadraticCurveTo(100, -30, 96, -8); ctx.quadraticCurveTo(40, 8, -90, 0); ctx.closePath();
  ctx.fillStyle = rgba(MK2.plastic, 0.92); ctx.fill(); ctx.strokeStyle = MK2.plasticD; ctx.lineWidth = 1.8; [[-70, -8, -40, -26], [-20, -6, 0, -32], [30, -6, 60, -28], [-50, -16, 30, -18]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + 8, (y0 + y1) / 2, x1, y1); ctx.stroke(); });
  ctx.restore(); }
// BERM met een tasje dat uiteenvalt: grond (bodemband oker-bruin) met een grasrand; u 0..1: 0 heel, 0.35 scheuren, 0.65 losse
// snippers, 1 piepkleine stukjes (microplastic) in het gras en de bovenste grond. o.t = gras wiegt.
function mk2_berm(ctx, x, y, w, o = {}) { const { a = 1, u = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#4A3A2A'; ctx.fillRect(x, y, w, 120); ctx.fillStyle = '#5A4632'; ctx.fillRect(x, y, w, 30); ctx.fillStyle = '#3F5A3E'; ctx.fillRect(x, y - 16, w, 18);
  const cx = x + w / 2;
  if (u < 0.6) mk2_tasjeLiggend(ctx, cx - 40, y - 6, 1, 1 - ease((u - 0.45) / 0.15));
  if (u > 0.25 && u < 0.6) { ctx.strokeStyle = rgba('#1A2740', ease((u - 0.25) / 0.15)); ctx.lineWidth = 4; [[-95, -52, -86, -26], [-30, -58, -22, -28], [30, -54, 38, -26]].forEach(([x0, y0, x1, y1]) => { ctx.beginPath(); ctx.moveTo(cx + x0, y + y0); ctx.lineTo(cx + (x0 + x1) / 2 + 6, y + (y0 + y1) / 2); ctx.lineTo(cx + x1, y + y1); ctx.stroke(); }); }
  if (u > 0.45) { const f = ease((u - 0.45) / 0.55); // snippers worden kleiner en verspreiden zich
    for (let i = 0; i < 46; i++) { const hx = (hash(i * 2.3) - 0.5), hy = hash(i * 5.1); const px = cx + hx * Math.min(w - 40, 180 + 420 * f), py = y - 10 - (1 - f) * 30 * hash(i) + f * hy * 60; const r = lerp(16, 3.2, f) * (0.6 + 0.6 * hash(i * 9));
      if (i > 14 && f < 0.3) continue; ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i * 7) * 3); ctx.beginPath(); ctx.moveTo(-r, -r * 0.4); ctx.lineTo(r * 0.6, -r * 0.7); ctx.lineTo(r, r * 0.3); ctx.lineTo(-r * 0.4, r * 0.6); ctx.closePath(); ctx.fillStyle = rgba(MK2.plastic, 0.95); ctx.fill(); ctx.restore(); } }
  if (o.label !== false && u > 0.75) mk2_meta(ctx, 'MICROPLASTIC', cx, y + 76, '#C9CED6', 'center', 28, ease((u - 0.75) / 0.2)); // keuring ronde 4
  for (let i = 0; i < Math.floor(w / 14); i++) { const gx = x + i * 14 + hash(i) * 8, gh = 18 + hash(i * 3) * 26, sw = Math.sin(t * 1.3 + i * 0.7) * 3; ctx.strokeStyle = i % 3 ? '#5FA86E' : '#7FC48F'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, y - 4); ctx.quadraticCurveTo(gx + sw, y - gh * 0.6, gx + sw * 2 + 3, y - gh); ctx.stroke(); }
  ctx.restore(); }

// POSTERONTWERP 'KIES PAPIER · BETER VOOR HET MILIEU' (van de gemeente, zonder naam of logo): A-formaat (1 : 1,41), groene kop,
// grote papieren tas met een blaadje. o.briefje 0..1 = geel plakbriefje 'EERST LATEN NAKIJKEN', o.rot.
function mk2_poster(ctx, x, y, w, o = {}) { const { a = 1, briefje = 0, rot = 0 } = o; if (a <= 0.01) return; const h = w * 1.414; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = '#F2EEE4'; ctx.fill(); ctx.fillStyle = '#3E7A52'; ctx.fillRect(-w / 2, -h / 2, w, h * 0.27);
  const f = w / 420; text(ctx, 'KIES', 0, -h / 2 + 74 * f, fTekst(56 * f, 800), '#F2F2EE', 'center'); text(ctx, 'PAPIER', 0, -h / 2 + 136 * f, fTekst(64 * f, 800), '#F2F2EE', 'center');
  mk2_papierTas(ctx, -10 * f, h * 0.27, 0.9 * f);
  ctx.save(); ctx.translate(92 * f, -10 * f); ctx.rotate(0.5); ctx.beginPath(); ctx.moveTo(0, 30 * f); ctx.quadraticCurveTo(-34 * f, -10 * f, 0, -46 * f); ctx.quadraticCurveTo(34 * f, -10 * f, 0, 30 * f); ctx.fillStyle = '#5FA86E'; ctx.fill(); ctx.strokeStyle = '#3E7A52'; ctx.lineWidth = 3 * f; ctx.beginPath(); ctx.moveTo(0, 34 * f); ctx.lineTo(0, -36 * f); ctx.stroke(); ctx.restore();
  text(ctx, 'BETER VOOR HET MILIEU', 0, h / 2 - 40 * f, fTekst(30 * f, 800), '#3E7A52', 'center');
  if (briefje > 0.01) mk2_laag(ctx, briefje, () => { ctx.save(); ctx.translate(w * 0.22, -h * 0.05); ctx.rotate(0.08 - rot); roundRect(ctx, -110 * f, -70 * f, 220 * f, 140 * f, 4); ctx.fillStyle = '#F2D86A'; ctx.fill(); ctx.fillStyle = rgba('#C9A83A', 0.6); ctx.fillRect(-110 * f, -70 * f, 220 * f, 16 * f);
    text(ctx, 'EERST LATEN', 0, -8 * f, fTekst(30 * f, 800), '#3A2E14', 'center'); text(ctx, 'NAKIJKEN', 0, 30 * f, fTekst(30 * f, 800), '#3A2E14', 'center'); ctx.restore(); });
  ctx.restore(); }

// ADVIESBRIEF van de omgevingsdienst aan de gemeente: kop 'ADVIES', 'AAN: GEMEENTE', getypte regels (o.typ 0..1 = hoeveel er
// staat; echte zinnen in o.regels, anders grijze balkjes), blok 'AANNAMES', en o.stempel 0..1 = gouden stempel 'BESLUIT: GEMEENTE'.
function mk2_adviesbrief(ctx, x, y, w, o = {}) { const { a = 1, typ = 1, stempel: st = 0, regels = null, aannames = ['welke tassen', 'welke studies', 'welke afvalverwerking'], rot = 0 } = o; if (a <= 0.01) return;
  const sc = w / 520; w = 520; const h = w * 1.45; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.translate(-w / 2, -h / 2);
  roundRect(ctx, 0, 0, w, h, 6); shape(ctx, MK2.papier, MK2.papierD, 2);
  metaText(ctx, 'OMGEVINGSDIENST', 36, 52, '#5A6478', 'left', 24); metaText(ctx, 'AAN: GEMEENTE', w - 36, 84, '#5A6478', 'right', 24);
  text(ctx, 'ADVIES', 36, 116, fTekst(50, 800), MK2.inkt, 'left'); ctx.fillStyle = C.goud; ctx.fillRect(36, 132, 120, 6);
  const nRegel = 6, nTot = nRegel + aannames.length; let k = 0;
  for (let i = 0; i < nRegel; i++, k++) { const f = clamp(typ * nTot - k, 0, 1); if (f <= 0.01) break; if (regels && regels[i]) { ctx.save(); ctx.beginPath(); ctx.rect(36, 160 + i * 44, (w - 72) * f, 44); ctx.clip(); text(ctx, regels[i], 36, 192 + i * 44, fTekst(28, 600), MK2.inkt, 'left'); ctx.restore(); }
    else { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(36, 178 + i * 44, (w - 72 - (i % 3) * 60) * f, 9); } }
  const ay = 180 + nRegel * 44; if (typ * nTot > nRegel) { metaText(ctx, 'AANNAMES', 36, ay + 10, '#5A6478', 'left', 30);
    aannames.forEach((s2, i) => { const f = clamp(typ * nTot - nRegel - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; mk2_bol(ctx, 46, ay + 50 + i * 54, 6, MK2.inkt); text(ctx, s2, 64, ay + 64 + i * 54, fTekst(o.apx || 38, 700), MK2.inkt, 'left'); ctx.restore(); }); }
  if (st > 0.01) { const zs = 1 + (1 - ease(st)) * 0.5; ctx.save(); ctx.translate(w * 0.5, h - 64); ctx.scale(zs * 0.8, zs * 0.8); stempel(ctx, 0, 0, 'BESLUIT: GEMEENTE', '#B08A2A', Math.min(1, st * 2), -0.12); ctx.restore(); }
  ctx.restore(); }

// TABLET van Iris met het verzoek van de gemeente: 'GEMEENTE · VERZOEK OM ADVIES' + klein posterontwerp. o.scherm = eigen
// inhoud (ctx, x0, y0, w, h) in plaats van het verzoek.
function mk2_tablet(ctx, x, y, s = 1, o = {}) { const { a = 1, rot = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -230, -165, 460, 330, 22); ctx.fillStyle = '#1E232C'; ctx.fill(); roundRect(ctx, -212, -147, 424, 294, 8); ctx.fillStyle = '#EEF1F5'; ctx.fill(); mk2_bol(ctx, 221, 0, 4, '#5A6070');
  if (o.scherm) o.scherm(ctx, -212, -147, 424, 294);
  else { ctx.fillStyle = '#3E7A52'; ctx.fillRect(-212, -147, 424, 44); text(ctx, 'GEMEENTE · VERZOEK OM ADVIES', -196, -116, fTekst(22, 800), '#F2F2EE', 'left');
    ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 6; i++) ctx.fillRect(-196, -80 + i * 26, 210 - (i % 2) * 50, 8);
    mk2_poster(ctx, 128, 6, 120, {}); }
  ctx.restore(); }

// =====================================================================
// 6. ALGEMENE HULPJES (overgenomen uit Milieukunde 1, teken_mk1.js r. 7–27, 246–270, 361–365; 2 nov 2026)
// =====================================================================
const GROND = 860;
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 72, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 22); ctx.lineTo(x + 52, y + 36); ctx.lineTo(x + 26, y + 50); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 66, y + 49, fTekst(36, 700), C.text, 'left'); ctx.restore(); }
function echtKaart(ctx, x, y, w, kop, regels, bron, a = 1, o = {}) { if (a <= 0.01) return 0; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 48, h = 80 + regels.length * lh + (bron ? 50 : 6) + (o.extraH || 0);
  roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(o.rand || C.line, 0.85), 2); metaText(ctx, kop, x + 28, y + 48, o.kopKl || C.goud, 'left', 28);
  regels.forEach((r, i) => { const [s2, ra, kl] = Array.isArray(r) ? r : [r, 1]; if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 28, y + 104 + i * lh, fTekst(o.px || 36, 700), kl || C.text, 'left'); ctx.restore(); } });
  if (o.teken) o.teken(x, y + 76 + regels.length * lh, w, o.extraH || 0);
  if (bron) metaText(ctx, bron, x + 28, y + h - 22, C.text2, 'left', 28); ctx.restore(); return h; }
function termKaart(ctx, x, y, w, term, uitleg, a = 1, kl = C.goud) { if (a <= 0.01) return; const r = Array.isArray(uitleg) ? uitleg : [uitleg]; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 110 + r.length * 40, 16); shape(ctx, rgba('#0D1420', 0.9), kl, 2.5);
  text(ctx, term, x + 30, y + 70, fTekst(52, 800), kl, 'left'); r.forEach((u, i) => metaText(ctx, u, x + 30, y + 120 + i * 40, C.text, 'left', 28)); ctx.restore(); }
function somRegel(ctx, s2, x, y, a = 1, kl = C.text, px = 48, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, 800), kl, al); ctx.restore(); }

function klembord(ctx, x, y, w, kop, regels, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lh = o.lh || 64, h = 110 + regels.length * lh + 20;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#8A6A44', '#5A4430', 2); roundRect(ctx, x + 16, y + 26, w - 32, h - 40, 6); shape(ctx, '#F2EEE4', null);
  roundRect(ctx, x + w / 2 - 60, y - 12, 120, 40, 8); shape(ctx, '#AFB6C0', '#6E7480', 2);
  if (kop) text(ctx, kop, x + 40, y + 84, fTekst(30, 800), '#5A6478', 'left');
  regels.forEach((r, i) => { const [s2, ra, vk] = Array.isArray(r) ? r : [r, 1, 0]; const yy = y + 84 + (kop ? 30 : -20) + (i + 0.7) * lh; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.strokeRect(x + 40, yy - 30, 32, 32);
    if (ra > 0.01) { ctx.save(); ctx.globalAlpha *= ra; text(ctx, s2, x + 90, yy, fTekst(o.px || 36, 700), '#2A3446', 'left'); ctx.restore(); }
    if (vk > 0.01) vink_(ctx, x + 56, yy - 16, 14, vk, '#3E8A58'); });
  ctx.restore(); return h; }
function badge(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 22 * s, y - 60 * s); ctx.lineTo(x, y - 18 * s); ctx.lineTo(x + 22 * s, y - 60 * s); ctx.stroke();
  roundRect(ctx, x - 20 * s, y - 18 * s, 40 * s, 52 * s, 5 * s); shape(ctx, '#F2EEE4', '#9AA3B2', 1.5); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(x - 20 * s, y - 18 * s, 40 * s, 12 * s); ctx.fillStyle = '#9AA3B2'; ctx.fillRect(x - 12 * s, y + 4 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y + 14 * s, 18 * s, 4 * s); ctx.restore(); }
// BUREAU van de omgevingsdienst op navy (naar bureau() uit mk1), o.scherm = monitor erop (standaard uit)
function mk2_bureau(ctx, x, y, w, o = {}) { const { a = 1, scherm = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 22, 6); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  ctx.fillStyle = '#4A5468'; ctx.fillRect(x + 20, y + 22, 16, GROND - y - 22); ctx.fillRect(x + w - 36, y + 22, 16, GROND - y - 22);
  if (scherm) { roundRect(ctx, x + w - 250, y - 180, 220, 140, 8); shape(ctx, '#1E232C', '#5A6070', 3); ctx.fillStyle = '#5A6070'; ctx.fillRect(x + w - 150, y - 40, 20, 40); roundRect(ctx, x + w - 236, y - 166, 192, 112, 4); shape(ctx, '#22304A', null); }
  ctx.restore(); }
// geometrie van vak i bij mk2_vierVakken(x, y, w, h)
function mk2_vakGeo(x, y, w, h, i) { const gap = 28, vw = (w - 3 * gap) / 4, vx = x + i * (vw + gap), g0 = y + h - 110, Hm = h - 280; const V = MK2_VAK[i];
  return { x: vx, w: vw, g0, Hm, bp: vx + vw * 0.32, bq: vx + vw * 0.68, hp: Hm * V.p, hq: Hm * V.q }; }
// Wat word jij? · Milieukunde 2 · Van wieg tot graf — scènes per alinea (v1.0, 2 nov 2026).
// Look: Schema met cast (Thijs, stagiair, outfit 'stage'; Milieukundige Iris, outfit 'kantoor'). Geen decor: het kantoor van
// de omgevingsdienst staat op navy zoals in mk1. In beeld geen echte gemeente, winkel of merk.
// Kleuren (keuring ronde 4): klimaat koraal, stikstof oker, land groen, water teal; goud = focus; plastic lichtgrijs, papier kraft.

function thijs(ctx, x, t, o = {}) { return persoon(ctx, 'thijs', x, GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'stage', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function iris(ctx, x, t, o = {}) { return persoon(ctx, 'iris', x, GROND, o.h || 445, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', outfit: 'kantoor', a: o.a == null ? 1 : o.a, hold: o.hold }); }
const MK2_PS = 2.6 / MK2_CM; // tas op persoonsschaal (Thijs 430 px ≈ 1,65 m)
// vier vakken: vaste plek
const VK = { x: 120, y: 190, w: 1680, h: 600 };
function vakken(ctx, o = {}) { const { x = VK.x, y = VK.y, w = VK.w, h = VK.h, a = [1, 1, 1, 1], staaf = [1, 1, 1, 1], maal = [1, 1, 1, 1], hl = -1 } = o; const gap = 28, vw = (w - 3 * gap) / 4;
  for (let i = 0; i < 4; i++) mk2_vak(ctx, x + i * (vw + gap), y, vw, h, i, { a: a[i], staaf: staaf[i], maal: maal[i], hl: hl === i ? 1 : 0 }); }
// vinkje boven de winnaar in vak i ('p' = plastic, 'q' = papier)
function vakVink(ctx, i, wie, a, o = {}) { if (a <= 0.01) return; const G = mk2_vakGeo(o.x || VK.x, o.y || VK.y, o.w || VK.w, o.h || VK.h, i); const bx = wie === 'p' ? G.bp : G.bq, hh = wie === 'p' ? G.hp : G.hq; vink_(ctx, bx, G.g0 - Math.max(5, hh) - 40, 20, a, C.groen); }
// kleine telefoon voor 'de gemeente belt'
function telefoon(ctx, x, y, s = 1, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 18) * 0.04);
  roundRect(ctx, -60, -110, 120, 220, 18); shape(ctx, '#1E232C', '#5A6070', 3); roundRect(ctx, -50, -96, 100, 180, 8); shape(ctx, '#3E7A52', null);
  circ(ctx, 0, -30, 26, '#F2F2EE'); ctx.strokeStyle = '#3E7A52'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -30, 13, 0.6, 2.6); ctx.stroke(); roundRect(ctx, -36, 36, 72, 26, 13); shape(ctx, '#7FC48F', null); ctx.restore(); }
// cijferkaart 'één cijfer' (leeg vakje)
function cijferVak(ctx, x, y, a = 1, kruisA = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90, y - 90, 180, 150, 14); shape(ctx, '#F2EEE4', '#9AA3B2', 2);
  text(ctx, '?', x, y + 30, fTitel(96), '#2A3446', 'center'); metaText(ctx, 'ÉÉN CIJFER', x, y + 104, C.text2, 'center', 28); ctx.restore(); if (kruisA > 0.01) kruis(ctx, x, y - 15, 70, kruisA, C.koraal); }
// katoenplant (stengel met bolsters en witte pluizen) — eenvoudig, alleen in H3
function katoenPlant(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#6A5A3A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-6, -90, 4, -180); ctx.moveTo(-2, -70); ctx.lineTo(-50, -120); ctx.moveTo(2, -110); ctx.lineTo(52, -150); ctx.stroke();
  [[-50, -120], [52, -150], [4, -180]].forEach(([bx, by]) => { [-1, 0, 1].forEach(k => mk2_bol(ctx, bx + k * 13, by - 6 + Math.abs(k) * 4, 15, '#F4F0E6', '#C9C0AE', 1.5)); ctx.fillStyle = '#7A5A3A'; ctx.beginPath(); ctx.moveTo(bx - 20, by + 6); ctx.lineTo(bx, by + 22); ctx.lineTo(bx + 20, by + 6); ctx.closePath(); ctx.fill(); });
  ctx.fillStyle = '#5FA86E'; [[-30, -40, -0.6], [30, -60, 0.6]].forEach(([lx, ly, r]) => { ctx.save(); ctx.translate(lx, ly); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 26, 13, 0, 0, 6.283); ctx.fill(); ctx.restore(); }); ctx.restore(); }
// kast (zijaanzicht) met een tas erin
function kast(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 360, 300, 360, 8); shape(ctx, '#5A4A3A', '#8A7458', 2); roundRect(ctx, x - 134, y - 344, 268, 328, 4); shape(ctx, '#2E2620', null);
  ctx.fillStyle = '#8A7458'; ctx.fillRect(x - 134, y - 190, 268, 8); mk2_katoenTas(ctx, x - 10, y - 26, 0.42, {}); ctx.fillStyle = '#6A5644'; ctx.beginPath(); ctx.moveTo(x + 150, y - 360); ctx.lineTo(x + 250, y - 330); ctx.lineTo(x + 250, y - 20); ctx.lineTo(x + 150, y); ctx.closePath(); ctx.fill(); ctx.restore(); }
// balkje 'milieulast per keer' (H3 en recap)
function lastBalk(ctx, x, yb, w, h, kl, a = 1, lab = '') { if (a <= 0.01 || h < 1) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, yb - h, w, h, Math.min(8, h / 2)); shape(ctx, rgba(kl, 0.6), kl, 2.5); if (lab) text(ctx, lab, x, yb + 44, fTekst(36, 800), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { lijn(ctx, [[1250, 760], [1830, 760]], C.line, 2); mk2_papierTasje(ctx, 1420, 760, 1.25, {}); mk2_plasticTasje(ctx, 1680, 760, 0.85, {});
    metaText(ctx, 'WIEG', 1250, 810, C.text2, 'left', 28); metaText(ctx, 'GRAF', 1830, 810, C.text2, 'right', 28); stippel(ctx, 1360, 800, 1720, 800, C.line, 0.7, 2); },

  // ---------- Cold open: kantoor op navy ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const P2 = ramp(t, q.at('Papieren', 2) - 0.5, 0.5);
    laag(ctx, 1 - P2, () => { metaText(ctx, 'OMGEVINGSDIENST · KANTOOR', 160, 220, C.text2, 'left', 28);
      mk2_bureau(ctx, 620, 650, 440); const dicht = q.on('tasje', 1, 0.6); mk2_papierTasje(ctx, 800, 650, 0.55, { open: 1 - dicht, lunch: 1 });
      thijs(ctx, 460, t, { kijk: 1, uit: 'blij', pose: dicht < 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Thijs', 'STAGIAIR', 460, 372, 1, 'center');
      const Gd = q.on('Goed', 1, 0.4) * (1 - q.on('gemeente', 1, 0.4)); laag(ctx, Gd, () => { wolk(ctx, 560, 190, 210, 120, '', 1); ctx.save(); ctx.translate(665, 250); ctx.rotate(-0.5); ctx.beginPath(); ctx.moveTo(0, 34); ctx.quadraticCurveTo(-30, 0, 0, -36); ctx.quadraticCurveTo(30, 0, 0, 34); ctx.fillStyle = '#5FA86E'; ctx.fill(); ctx.restore(); vink_(ctx, 720, 252, 16, 1, '#3E8A58'); });
      iris(ctx, 1180, t, { kijk: -1, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => mk2_plasticTasje(c, hx, hy - 4, MK2_PS, { hang: true, vol: 0.3 }) }); naamBij(ctx, 'Milieukundige Iris', 'OMGEVINGSDIENST', 1180, 362, 1, 'center');
      const Ge = q.on('gemeente', 1, 0.4), Po = q.on('poster', 1, 0.6);
      mk2_tablet(ctx, 1560, 430, 0.78, { a: Ge * (1 - 0.75 * Po) });
      laag(ctx, Po, () => mk2_poster(ctx, lerp(1652, 1580, ease(Po)), lerp(434, 480, ease(Po)), lerp(94, 250, ease(Po)), { rot: 0.02 })); });
    laag(ctx, P2, () => { kaart(ctx, 160, 240, 1120, 330, 1, C.goud); text(ctx, 'Papieren tasje of plastic tas:', 210, 350, fTekst(56, 800), C.text, 'left'); text(ctx, 'welke is beter voor het milieu?', 210, 430, fTekst(56, 800), C.text, 'left');
      metaText(ctx, 'VAN WIEG TOT GRAF', 210, 510, C.goud, 'left', 28); lijn(ctx, [[1380, 760], [1840, 760]], C.line, 2); mk2_papierTasje(ctx, 1490, 760, 1.0, {}); mk2_plasticTasje(ctx, 1720, 760, 0.95, {}); vraagteken(ctx, 1600, 330, 1, 120); }); },

  // ---------- H1 Van wieg tot graf ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const K = ramp(t, q.at('volgt', 1) - 0.7, 0.9), k = ease(K);
    // mensen en de strook die uitrolt
    laag(ctx, 1 - k, () => { const r = thijs(ctx, 280, t, { kijk: 1, uit: 'blij' }); if (r.hoofd) badge(ctx, r.hoofd.x + 10, r.hoofd.y + r.hoofd.r * 4.6, 1.2, 1);
      naamBij(ctx, 'Thijs', 'STAGIAIR', 280, 300, 1, 'center'); tag(ctx, 'SNUFFELSTAGE · OMGEVINGSDIENST', 360, 250, C.teal, 1, 'center', 28);
      iris(ctx, 1680, t, { kijk: -1, pose: q.on('rolt', 1) > 0.5 && q.on('uit', 1) < 0.5 ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Milieukundige Iris', '', 1680, 380, 1, 'center'); });
    const sx = lerp(450, 60, k), sy = lerp(330, 210, k), sw = lerp(1080, 1800, k), ss = lerp(0.6, 1, k);
    const u = clamp((t - q.at('rolt', 1)) / 2.6, 0, 1);
    const n0 = q.on('aardolie', 1, 0.5) + 2 * q.on('fabriek', 1, 0.8) + q.on('vervoer', 1, 0.5) + q.on('winkel', 1, 0.5) + q.on('afval', 1, 0.5);
    const n1 = q.on('papier', 2, 0.5) + 2 * q.on('fabriek', 1, 0.8) + q.on('vervoer', 1, 0.5) + q.on('winkel', 1, 0.5) + q.on('afval', 1, 0.5);
    const Ei = q.on('erin', 1, 0.5), Eu = q.on('eruit', 1, 0.5);
    const hl = q.on('welke', 1) > 0.5 ? [[0, 2], [3, 3], [5, 5]] : [];
    const G = mk2_strook(ctx, sx, sy, sw, { u, s: ss, t, kop: q.on('wieg', 1, 0.4), nRij: [n0, n1], hl, a: q.on('rolt', 1, 0.3),
      pijlA: (i, so, r) => Math.max(i === 0 && r === 0 ? (so === 'in' ? Ei : Eu) : 0, clamp((r ? n1 : n0) - i, 0, 1)) });
    // ERIN / ERUIT bij de eerste kolom
    laag(ctx, Ei * K, () => metaText(ctx, 'ERIN', G.kol[0] - 26, G.rij[0] - 150, '#8A6A2A', 'left', 28)); laag(ctx, Eu * K, () => metaText(ctx, 'ERUIT', G.kol[0] + 54, G.rij[0] + 58, '#B8462E', 'left', 28));
    // een stip volgt het tasje van wieg tot graf
    const tv = q.at('volgt', 1), uv = clamp((t - tv) / 2.4, 0, 1); laag(ctx, K * (uv > 0 && uv < 1 ? 1 : 0), () => { [0, 1].forEach(r => circ(ctx, lerp(G.kol[0] - 100, G.kol[5], ease(uv)), G.rij[r], 14, C.goud, '#8A6A2A', 2)); });
    laag(ctx, q.on('levenscyclusanalyse', 1, 0.5) * (1 - q.on('Wat', 1, 0.4)), () => termKaart(ctx, 560, 470, 800, 'levenscyclusanalyse', 'VAN WIEG TOT GRAF', 1));
    laag(ctx, q.on('vervoer', 1, 0.4) * K, () => metaText(ctx, 'CHINA → VK', G.kol[3] - 70, G.rij[0] + 54, MK2.inkt, 'center', 28));
    laag(ctx, q.on('aarde', 1, 0.4), () => filmKaartje(ctx, 160, 788, 'Eén aarde · een tasje is klein voor je voetafdruk', 1));
    laag(ctx, q.on('zoiets', 1, 0.4) * (1 - q.on('Plastic', 1, 0.4)), () => vraagteken(ctx, 1080, 860, 1, 80));
    laag(ctx, q.on('welke', 1, 0.4), () => { text(ctx, 'BROEIKASGAS?', 1740, 860, fTekst(36, 800), C.koraal, 'right'); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: bij de grondstof en het maken van de tas', 1);
    const B = ramp(t, q.at('papieren', 1) - 0.4, 0.6);
    laag(ctx, 1 - B, () => { const G = mk2_strook(ctx, 120, 190, 1680, { s: 0.6, t, kop: 1, hl: [[0, 2]], afval: ['stort', 'stort'] });
      const yb = 820, br = q.on('broeikasgas', 1, 1.2); lijn(ctx, [[120, yb], [1800, yb]], C.line, 2);
      metaText(ctx, 'BROEIKASGAS · SCHEMATISCH', 120, 556, C.koraal, 'left', 28); metaText(ctx, 'ENVIRONMENT AGENCY (VK) 2011', 1800, 556, C.text2, 'right', 28);
      lastBalk(ctx, (G.kol[0] + G.kol[2]) / 2, yb, G.kol[2] - G.kol[0] + 120, 190 * ease(br), C.koraal, 1); naamBij(ctx, 'grondstof en maken', '', (G.kol[0] + G.kol[2]) / 2, yb - 190 * ease(br) - 18, br, 'center', C.text);
      const kl = q.on('schip', 1, 0.5); [[3, 22], [4, 6], [5, 28]].forEach(([i, h]) => lastBalk(ctx, G.kol[i], yb, 110, h * ease(br), C.koraal, i === 3 ? 1 : 1 - 0.5 * kl));
      laag(ctx, kl, () => { roundRect(ctx, G.kol[3] - 120, 230, 240, 290, 12); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); naamBij(ctx, 'per schip', 'CHINA → VK', G.kol[3], 740, 1, 'center'); }); });
    laag(ctx, B, () => { const W8 = q.on('woog', 1, 1.0); mk2_weegschaal(ctx, 960, 810, 1, { tilt: 0.13 * ease(W8), links: (c, px, py) => mk2_papierTas(c, px, py - 6, 0.42, {}), rechts: (c, px, py) => mk2_plasticTasje(c, px, py - 6, 0.36, { kreuk: 0.5 }) });
      text(ctx, '55 gram', 600, 850, fTekst(48, 800), C.text, 'center'); metaText(ctx, 'PAPIEREN TASJE', 600, 790, C.text2, 'center', 28);
      text(ctx, '8 gram', 1320, 850, fTekst(48, 800), C.text, 'center'); metaText(ctx, 'PLASTIC TASJE', 1320, 790, C.text2, 'center', 28);
      laag(ctx, q.on('zeven', 1, 0.4), () => tag(ctx, 'bijna 7×', 960, 430, C.goud, 1, 'center', 40));
      const ic = [['materiaal', 560, (x, y) => mk2_pulp(ctx, x, y, 1.1, { t })], ['hout', 960, (x, y) => mk2_bos(ctx, x, y, 0.95, {})], ['energie', 1360, (x, y) => mk2_fabriek(ctx, x, y, 0.95, { t })]];
      ic.forEach(([w, x, fn], i) => laag(ctx, q.on(w, 1, 0.4), () => { fn(x, 330); metaText(ctx, w.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x, 372, C.oker, 'center', 28); })); }); },

  // ---------- H2 Appels met peren ----------
  s06(ctx, t, q) { bg(ctx, 'schema');
    const vis = [q.on('Broeikasgas', 1, 0.4), q.on('Stikstof', 1, 0.4), q.on('Land', 1, 0.4), q.on('water', 1, 0.4)];
    const M = q.on('Methaan', 1, 0.5) * (1 - q.on('rekenmethode', 1, 0.5)), R = q.on('rekenmethode', 1, 0.5) * (1 - q.on('papieren', 1, 0.5)), Bo = q.on('papieren', 1, 0.5) * (1 - q.on('Hoe', 1, 0.5)), Vq = q.on('Hoe', 1, 0.5);
    const dim = i => vis[i] * (1 - 0.65 * M * (i ? 1 : 0)) * (1 - 0.8 * R) * (1 - 0.85 * Bo) * (Vq > 0 && i < 2 ? 1 - 0.65 * Vq : 1);
    vakken(ctx, { a: [0, 1, 2, 3].map(dim), staaf: [0, 0, 0, 0], maal: [0, 0, 0, 0] });
    laag(ctx, Vq, () => { const G2 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 2), G3 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 3); [G2, G3].forEach(G => { roundRect(ctx, G.x, VK.y, G.w, VK.h, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); }); vraagteken(ctx, G2.x + G2.w + 14, 178, 1, 90); });
    // methaan wordt CO₂ in het klimaatvak
    const G0 = mk2_vakGeo(VK.x, VK.y, VK.w, VK.h, 0), uM = clamp((t - q.at('Methaan', 1)) / (q.at('CO₂', 1) + 0.6 - q.at('Methaan', 1)), 0, 1);
    mk2_methaanNaarCO2(ctx, G0.x + G0.w / 2, 470, 0.85, uM, { a: M, t });
    // de rekenmethode: zo'n 18 milieueffecten
    laag(ctx, R, () => echtKaart(ctx, 460, 240, 1000, 'REKENMETHODE · RECIPE', [["zo'n 18 milieueffecten", q.on('achttien', 1)]], '', 1, { lh: 60, px: 44, extraH: 300,
      teken: (x, y) => { const kl = [C.koraal, C.oker, C.groen, C.teal]; for (let i = 0; i < 18; i++) { const cx = x + 60 + (i % 9) * 98, cy = y + 30 + Math.floor(i / 9) * 98, f = q.on('achttien', 1, 0.2 + i * 0.05);
          laag(ctx, f, () => { roundRect(ctx, cx, cy, 80, 80, 10); shape(ctx, i < 4 ? rgba(kl[i], 0.55) : '#2A3A58', i < 4 ? kl[i] : '#5A6A88', 2); }); }
        laag(ctx, q.on('Nijmegen', 1, 0.4), () => metaText(ctx, 'O.A. RIVM EN RADBOUD UNIVERSITEIT, NIJMEGEN', x + 60, y + 250, C.goud, 'left', 28)); } }));
    // papier komt uit hout, bomen groeien weer aan
    laag(ctx, Bo, () => { const tg = q.at('groeien', 1), gr = t < tg ? 1 : 0.15 + 0.85 * ease(clamp((t - tg) / 1.8, 0, 1)); const cut = t > tg - 0.25 && t < tg;
      mk2_bos(ctx, 700, 760, 2.6, { groei: cut ? 1 - (t - tg + 0.25) / 0.25 * 0.85 : gr }); lijn(ctx, [[340, 762], [1500, 762]], C.line, 2);
      laag(ctx, q.on('hout', 1, 0.4), () => pijl(ctx, 960, 620, 1150, 620, C.line, 1, 3, 14)); mk2_papierTasje(ctx, 1300, 760, 1.25, { a: q.on('tasje', 1, 0.4) });
      laag(ctx, q.on('groeien', 1, 0.4), () => { ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(700, 470, 70, -2.6, 1.6); ctx.stroke(); ctx.restore(); pijl(ctx, 700 + 70 * Math.cos(1.5), 470 + 70 * Math.sin(1.5), 700 + 70 * Math.cos(1.6) - 8, 470 + 70 * Math.sin(1.6), C.groen, 1, 4, 16); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: slechter: bos en fabriek vragen veel land en water', 1);
    const tn = q.at('nam', 1), Uit = ramp(t, tn - 0.7, 0.35), B = ramp(t, tn - 0.3, 0.4);
    laag(ctx, 1 - Uit, () => { metaText(ctx, 'NEDERLANDS ONDERZOEK · TNO 2015', 160, 240, C.text2, 'left', 28); lijn(ctx, [[460, 760], [1460, 760]], C.line, 2);
      laag(ctx, 1, () => { mk2_plasticTas(ctx, 720, 760, 0.95, {}); text(ctx, '30 gram', 720, 830, fTekst(48, 800), C.text, 'center'); naamBij(ctx, 'stevige plastic tas', '', 720, 440, 1, 'center', q.on('stevige', 1) > 0.5 ? C.goud : C.text); });
      laag(ctx, 1, () => { mk2_papierTas(ctx, 1200, 760, 0.95, {}); text(ctx, '51 gram', 1200, 830, fTekst(48, 800), C.text, 'center'); naamBij(ctx, 'papieren tas', '', 1200, 440, 1, 'center'); }); });
    laag(ctx, B, () => { const st = [q.on('klimaat', 1, 1.2), q.on('stikstof', 1, 1.2), q.on('land', 1, 1.2), q.on('water', 1, 1.2)];
      vakken(ctx, { staaf: st, maal: st.map(v => clamp(v * 2 - 1, 0, 1)) });
      metaText(ctx, 'TNO 2015 · MIDDELGROTE TAS · PLASTIC 30 G · PAPIER 51 G · 2 KG BOODSCHAPPEN', 120, 836, C.text2, 'left', 28); metaText(ctx, 'VEREENVOUDIGD · AFGEROND', 1800, 872, C.text2, 'right', 28); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const S = ease(q.on('gemeente', 1, 0.8)), w = lerp(VK.w, 1180, S), Wd = q.on('Wat', 1, 0.5);
    vakken(ctx, { w }); metaText(ctx, 'TNO 2015 · VEREENVOUDIGD', 120, 856, C.text2, 'left', 28);
    const P = q.on('plastic', 1, 0.4), Pa = q.on('papier', 1, 0.4); vakVink(ctx, 2, 'p', P, { w }); vakVink(ctx, 3, 'p', P, { w }); vakVink(ctx, 0, 'q', Pa, { w }); vakVink(ctx, 1, 'q', Pa, { w });
    laag(ctx, ramp(t, q.at('gemeente', 1) + 0.6, 0.4) * (1 - Wd), () => { telefoon(ctx, 1460, 420, 1, 1, t < q.at('belt', 1) + 1.2 ? t : 0); metaText(ctx, 'GEMEENTE', 1460, 580, C.text2, 'center', 28); laag(ctx, q.on('cijfer', 1, 0.4), () => cijferVak(ctx, 1680, 420, 1)); });
    laag(ctx, Wd, () => { mk2_weegschaal(ctx, 1570, 790, 0.78, { zoek: 1, t, links: (c, px, py) => mk2_eenheid(c, px, py, 'KG CO₂', C.koraal, 1, 48), rechts: (c, px, py) => mk2_eenheid(c, px, py, 'M² LAND', C.groen, 1, 48) }); vraagteken(ctx, 1570, 400, 1, 110); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ze zet ze naast elkaar, zonder optellen', 1);
    const tS = q.at('Schuif', 1), B = ramp(t, tS - 0.4, 0.5), tN = q.at('Volgens', 1), Cn = ramp(t, tN - 0.4, 0.5), tD = q.at('Dus', 1), D = ramp(t, tD - 0.3, 0.6);
    laag(ctx, 1 - B, () => { mk2_weegschaal(ctx, 960, 820, 1, { zoek: 1, t, links: (c, px, py) => mk2_eenheid(c, px, py, 'KG CO₂', C.koraal), rechts: (c, px, py) => mk2_eenheid(c, px, py, 'M² LAND', C.groen) });
      laag(ctx, q.on('geen', 1, 0.4), () => text(ctx, '≠', 960, 470, fTitel(110), C.goud, 'center'));
      laag(ctx, q.on('optelt', 1, 0.4), () => { text(ctx, 'KG CO₂  +  M² LAND  =  ?', 960, 300, fTekst(48, 800), C.text, 'center'); });
      laag(ctx, q.on('kiezen', 1, 0.4), () => metaText(ctx, 'EERST KIEZEN HOE ZWAAR ELK TELT', 960, 350, C.goud, 'center', 28)); });
    laag(ctx, B * (1 - Cn), () => { const tL = q.at('land', 2), tK = q.at('klimaat', 1); const v = t < tK - 0.3 ? lerp(0.5, 0.88, ease(clamp((t - tL + 0.2) / 0.9, 0, 1))) : lerp(0.88, 0.12, ease(clamp((t - tK + 0.3) / 1.1, 0, 1)));
      mk2_schuifje(ctx, 960, 400, 640, v, { label: 1 });
      laag(ctx, q.on('keuze', 1, 0.4), () => tag(ctx, 'een keuze', 1560, 400, C.goud, 1, 'center', 36)); });
    laag(ctx, Cn * (1 - D), () => { kaart(ctx, 300, 240, 1320, 220, 1, C.goud); metaText(ctx, 'ISO 14040 / 14044 · INTERNATIONALE NORM', 340, 296, C.goud, 'left', 28); text(ctx, 'wegen is een waardekeuze', 340, 390, fTekst(56, 800), C.text, 'left');
      laag(ctx, q.on('eindcijfer', 1, 0.4), () => { cijferVak(ctx, 760, 640, 1, q.on('niet', 1, 0.5)); laag(ctx, q.on('openlijke', 1, 0.4), () => { metaText(ctx, 'NIET IN EEN OPENLIJKE', 900, 620, C.koraal, 'left', 28); metaText(ctx, 'VERGELIJKING', 900, 660, C.koraal, 'left', 28); }); }); });
    laag(ctx, D, () => { vakken(ctx, { y: 220, h: 560 }); laag(ctx, q.on('naast', 1, 0.5), () => haak(ctx, 120, 1800, 790, '', C.groen, 1)); }); },

  // ---------- H3 Hoe vaak gebruik je hem? ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Ir = 1 - q.on('tweeëntachtig', 1, 0.4);
    laag(ctx, Ir, () => { iris(ctx, 1450, t, { kijk: -1, pose: q.on('eerlijk', 1) > 0.5 ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Milieukundige Iris', '', 1450, 380, 1, 'center'); });
    const Bo = q.on('boodschappen', 1, 1.4); mk2_boodschappen(ctx, 330, 740, 0.9, { n: Bo, a: Bo > 0 ? 1 : 0 });
    laag(ctx, q.on('boodschappen', 1, 0.5), () => { text(ctx, '483 dingen', 330, 820, fTekst(44, 800), C.text, 'center'); metaText(ctx, 'BRITS ONDERZOEK · 1 MAAND BOODSCHAPPEN', 120, 870, C.text2, 'left', 28); });
    const kP = 82 * clamp((t - q.at('tweeëntachtig', 1)) / 1.6, 0, 1), kQ = 65 * clamp((t - q.at('vijfenzestig', 1)) / 1.4, 0, 1);
    mk2_tasjesRaster(ctx, 740, 340, 82, 'plastic', { per: 10, gap: 44, h: 36, k: kP }); laag(ctx, kP > 0 ? 1 : 0, () => { text(ctx, '82 plastic tasjes', 940, 836, fTekst(40, 800), C.text, 'center'); });
    mk2_tasjesRaster(ctx, 1300, 340, 65, 'papier', { per: 10, gap: 44, h: 36, k: kQ }); laag(ctx, kQ > 0 ? 1 : 0, () => { text(ctx, '65 papieren', 1500, 836, fTekst(40, 800), C.text, 'center'); });
    // niet tas met tas
    laag(ctx, q.on('vergelijkt', 1, 0.4) * (1 - q.on('samen', 1, 0.4)), () => { kaart(ctx, 760, 110, 400, 150, 1); mk2_miniTas(ctx, 880, 236, 110, 'plastic'); mk2_miniTas(ctx, 1040, 236, 110, 'papier'); kruis(ctx, 960, 185, 46, q.on('niet', 1, 0.4)); });
    laag(ctx, q.on('samen', 1, 0.4) * (1 - q.on('heet', 1, 0.4)), () => { text(ctx, '=', 640, 560, fTitel(110), C.goud, 'center'); text(ctx, '=', 1250, 560, fTitel(110), C.goud, 'center'); });
    laag(ctx, q.on('functionele', 1, 0.4), () => termKaart(ctx, 660, 96, 860, 'functionele eenheid', 'EEN MAAND BOODSCHAPPEN NAAR HUIS', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const tK = q.at('katoenen', 1), K = ramp(t, tK - 0.5, 0.6);
    const tE = q.at('Elke', 1), nT = t < tE ? 0 : Math.min(4, Math.floor((t - tE) / 0.9) + 1); // turf gelijk met de balkjes
    let hp = null; const rT = thijs(ctx, 250, t, { kijk: 1, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => { hp = [hx, hy]; mk2_papierTasje(c, hx, hy - 4, MK2_PS, { hang: true, turf: nT }); } });
    naamBij(ctx, 'Thijs', 'STAGIAIR', 250, 372, 1 - K, 'center');
    laag(ctx, 1 - K, () => { if (hp) zoomCircle(ctx, 640, 470, 200, hp[0], hp[1] + 30, 'LUNCHTASJE · VERGROOT', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(420, 250, 440, 440); mk2_papierTasje(ctx, 640, 620, 1.0, { turf: nT }); });
      // milieulast per keer
      const yb = 760, L = 470; metaText(ctx, 'PAPIEREN TASJE · MILIEULAST PER KEER', 960, 230, C.text2, 'left', 28); lijn(ctx, [[940, yb], [1820, yb]], C.line, 2);
      for (let i = 0; i < 4; i++) { const ti = tE + i * 0.9, f = ease(clamp((t - ti) / 0.5, 0, 1)); if (f <= 0) continue; const x = 1010 + i * 170, hl = q.on('drie', 1) > 0.5 && i >= 2;
        lastBalk(ctx, x, yb, 120, L / (i + 1), C.koraal, f, '÷ ' + (i + 1)); if (hl) { roundRect(ctx, x - 72, yb - L / (i + 1) - 12, 144, L / (i + 1) + 12, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); } }
      const Pl = q.on('plastic', 1, 0.5), yP = yb - L / 3.5; laag(ctx, Pl, () => { stippel(ctx, 940, yP, 1820, yP, '#C9CED6', 1, 3); metaText(ctx, 'PLASTIC TASJE · 1 ×', 1820, yP - 16, '#C9CED6', 'right', 28); });
      laag(ctx, q.on('klimaat', 1, 0.5), () => metaText(ctx, 'BRITS ONDERZOEK: 3 TOT 4 KEER · KLIMAAT', 940, 862, C.goud, 'left', 28)); });
    laag(ctx, K, () => { lijn(ctx, [[700, 780], [1300, 780]], C.line, 2); mk2_katoenTas(ctx, 960, 780, 1.05, {}); naamBij(ctx, 'katoenen tas', '', 960, 240, 1, 'center');
      laag(ctx, q.on('Hoe', 1, 0.4), () => { ['10', '25', '50+'].forEach((s2, i) => { const y = 380 + i * 150; roundRect(ctx, 1460, y - 60, 220, 100, 16); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); text(ctx, s2 + ' ×', 1570, y + 6, fTekst(48, 800), C.text, 'center'); }); vraagteken(ctx, 1760, 560, 1, 110); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: vijftig keer of vaker', 1);
    lijn(ctx, [[160, 760], [700, 760]], C.line, 2); katoenPlant(ctx, 280, 760, 1.4, q.on('Katoen', 1, 0.4)); mk2_katoenTas(ctx, 560, 760, 0.62, {});
    laag(ctx, q.on('land', 1, 0.4), () => chip(ctx, 'land', 260, 300, C.groen, 1, 32)); laag(ctx, q.on('water', 1, 0.4), () => chip(ctx, 'water', 460, 300, C.teal, 1, 32));
    const t50 = q.at('vijftig', 1), t150 = q.at('honderdvijftig', 1); const n = t < t50 ? 0 : t < t150 ? 50 * ease(clamp((t - t50) / 0.6, 0, 1)) : 50 + 100 * ease(clamp((t - t150) / 1.6, 0, 1));
    metaA(ctx, 'KATOENEN TAS · KEER GEBRUIKT', 820, 250, q.on('Volgens', 1, 0.4), C.text2, 'left', 28);
    mk2_turf(ctx, 830, 300, n, { h: 50, gap: 14, kl: C.text, lw: 4, perRij: 50 });
    laag(ctx, n >= 49.5 ? 1 : 0, () => text(ctx, '50', 1700, 344, fTekst(44, 800), C.goud, 'left')); laag(ctx, n >= 149.5 ? 1 : 0, () => text(ctx, '150', 1700, 494, fTekst(44, 800), C.goud, 'left'));
    laag(ctx, q.on('Naties', 1, 0.4) * (1 - q.on('kast', 1, 0.4)), () => metaText(ctx, 'UNEP 2020 · KLIMAAT · 50 TOT 150 KEER', 830, 580, C.goud, 'left', 28));
    laag(ctx, q.on('dun', 1, 0.4), () => { mk2_plasticTasje(ctx, 900, 840, 0.62, {}); text(ctx, '1 ×', 1000, 760, fTekst(44, 800), C.text, 'left'); metaText(ctx, 'DUN PLASTIC TASJE', 1000, 800, C.text2, 'left', 28); });
    laag(ctx, q.on('kast', 1, 0.5), () => kast(ctx, 1500, 860)); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const D = ease(q.on('Denemarken', 1, 0.9)), V = q.on('Wat', 1, 0.4);
    mk2_rapport(ctx, lerp(700, 220, D), 210, 640, 'VK', 'ENVIRONMENT AGENCY · 2011', ['', '', ''], { n: 0, rot: -0.02, vraag: V });
    mk2_rapport(ctx, lerp(1980, 1060, D), 210, 640, 'DENEMARKEN', 'MILJØSTYRELSEN · 2018', ['', '', ''], { n: 0, rot: 0.02, vraag: V });
    const R = q.on('Daar', 1, 0.4); laag(ctx, R, () => { [[540, '3 tot 4 ×'], [1380, '1 ×']].forEach(([x, s2], i) => { mk2_miniTas(ctx, x - 110, 800, 70, 'papier'); text(ctx, '=', x - 40, 790, fTekst(48, 800), C.text, 'center'); mk2_miniTas(ctx, x + 30, 800, 70, 'plastic'); text(ctx, s2, x + 100, 790, fTekst(44, 800), i ? C.goud : C.text, 'left'); });
      metaText(ctx, 'PAPIER GELIJK MET PLASTIC · KLIMAAT', 960, 870, C.text2, 'center', 28); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ze vergelijkt de aannames van allebei', 1);
    const n1 = q.on('stort', 1, 0.5) + q.on('plastic', 1, 0.5) + q.on('papieren', 1, 0.5), n2 = q.on('verbrand', 1, 0.5) + q.on('plastic', 1, 0.5) + q.on('papieren', 1, 0.5);
    const hl = q.on('papieren', 1) > 0.5 ? 2 : q.on('plastic', 1) > 0.5 ? 1 : 0;
    mk2_rapport(ctx, 220, 200, 640, 'VK', 'ENVIRONMENT AGENCY · 2011', ['AFVAL: VOORAL STORTEN', 'PLASTIC TASJE 8 G', 'PAPIER 55 G'], { n: n1, hl, rot: -0.02 });
    mk2_rapport(ctx, 1060, 200, 640, 'DENEMARKEN', 'MILJØSTYRELSEN · 2018', ['VERBRANDEN · ENERGIE TELT MEE', 'PLASTIC TASJE 24 G', 'PAPIER 45 G'], { n: n2, hl, rot: 0.02 });
    laag(ctx, q.on('stort', 1, 0.4), () => { mk2_afval(ctx, 380, 790, 1.4, { soort: 'stort' }); naamBij(ctx, 'stort', '', 540, 776, 1, 'left'); }); laag(ctx, q.on('verbrand', 1, 0.4), () => { mk2_afval(ctx, 1240, 790, 1.4, { soort: 'verbranden', t }); naamBij(ctx, 'verbranding', '', 1360, 776, 1, 'left'); });
    laag(ctx, q.on('Geen', 1, 0.4), () => { vink_(ctx, 800, 760, 24, 1, C.groen); vink_(ctx, 1640, 760, 24, 1, C.groen); });
    laag(ctx, q.on('schreven', 1, 0.4), () => { metaText(ctx, 'ANDERE KEUZES · OPGESCHREVEN', 960, 836, C.goud, 'center', 28); });
    metaText(ctx, 'RICHTING · GEEN HERBEREKENING', 960, 872, C.text2, 'center', 28); },

  // ---------- H4 Van rekensom naar advies ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); mk2_bureau(ctx, 520, 650, 560);
    iris(ctx, 420, t, { kijk: 1, uit: 'neutraal', pose: 'staan' }); thijs(ctx, 1160, t, { kijk: -1, uit: 'neutraal', pose: 'denk' });
    mk2_adviesbrief(ctx, 800, 520, 230, { typ: clamp(t / 4, 0, 0.35), aannames: [] }); naamBij(ctx, 'Milieukundige Iris', '', 420, 362, 1, 'center');
    mk2_poster(ctx, 1560, 470, 280, { rot: 0.02 }); laag(ctx, q.on('Wat', 1, 0.4), () => vraagteken(ctx, 1760, 330, 1, 110)); },

  s21(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: geen winnaar: gebruik de tas die je hebt vaak', 1 - q.on('Onder', 1, 0.4));
    const ph = [q.at('Wat', 1), q.at('lunchtasje', 1), q.at('Volgens', 1), q.at('plastic', 1), q.at('Onder', 1), q.at('Wil', 1), q.at('bijna', 1) - 0.3, q.at('Spaanse', 1) - 0.4, q.at('besluit', 1)];
    const F = i => ramp(t, (i ? ph[i - 1] : -1) - 0.2, 0.3) * (1 - ramp(t, (ph[i] || 99) - 0.55, 0.3)); // eerst weg, dan de volgende (geen overlap)
    // 0: geen tas wint op alles
    laag(ctx, F(0), () => { vakken(ctx, { y: 220, h: 560 }); [[2, 'p'], [3, 'p'], [0, 'q'], [1, 'q']].forEach(([i, w]) => vakVink(ctx, i, w, 1, { y: 220, h: 560 })); });
    // 1: hoe vaak je hem gebruikt
    laag(ctx, F(1), () => { metaText(ctx, 'HOE VAAK GEBRUIK JE HEM?', 960, 260, C.goud, 'center', 28); [[560, 'plastic', 1], [960, 'tasje', 4], [1360, 'katoen', 50]].forEach(([x, so, n]) => { mk2_miniTas(ctx, x, 620, 200, so); mk2_turf(ctx, x - 140, 680, Math.min(n, 25) * clamp((t - ph[0]) / 1.2, 0, 1), { h: 36, gap: 11, perRij: 25, lw: 3 }); if (n > 25) text(ctx, '…', x + 160, 716, fTekst(40, 800), C.text, 'left'); }); });
    // 2: het lunchtasje op tien streepjes, met een scheurtje
    laag(ctx, F(2), () => { thijs(ctx, 360, t, { kijk: 1, uit: 'blij' }); naamBij(ctx, 'Thijs', 'STAGIAIR', 360, 372, 1, 'center'); lijn(ctx, [[700, 800], [1300, 800]], C.line, 2);
      const n = 4 + 6 * ease(clamp((t - q.at('tien', 1) + 0.6) / 1.2, 0, 1)); mk2_papierTasje(ctx, 1000, 800, 2.0, { turf: n, scheur: q.on('streepjes', 1, 0.6) }); metaText(ctx, 'LUNCHTASJE · VERGROOT', 1000, 856, C.text2, 'center', 28); });
    // 3: de beste tas is de tas die je al hebt
    laag(ctx, F(3), () => { lijn(ctx, [[420, 700], [1500, 700]], C.line, 2); mk2_katoenTas(ctx, 620, 700, 0.6, {}); mk2_papierTasje(ctx, 960, 700, 1.1, { turf: 10, scheur: 1 }); mk2_plasticTas(ctx, 1290, 700, 0.6, {});
      kaart(ctx, 460, 760, 1000, 110, 1, C.goud); text(ctx, 'de beste tas: die je al hebt', 500, 830, fTekst(44, 800), C.goud, 'left'); metaText(ctx, 'UNEP 2020', 1430, 830, C.text2, 'right', 28); });
    // 4: plastic tasje als vuilniszak
    laag(ctx, F(4), () => { const Vz = ease(clamp((t - q.at('boodschappen', 1)) / 1.4, 0, 1)); lijn(ctx, [[560, 820], [1400, 820]], C.line, 2);
      mk2_pedaalemmer(ctx, 1120, 820, 1.25, { deksel: Vz > 0.95 ? 0.9 : Math.min(0.9, Vz * 3), tasje: ramp(Vz, 0.8, 0.2) });
      laag(ctx, 1 - ramp(Vz, 0.8, 0.2), () => mk2_plasticTasje(ctx, lerp(760, 1120, Vz), lerp(820, 600, Math.sin(Vz * Math.PI) * 0.7) + Vz * -60, 0.95 * (1 - 0.25 * Vz), { vol: 0.6 * (1 - Vz) }));
      laag(ctx, ramp(Vz, 0.85, 0.15), () => naamBij(ctx, 'vuilniszak', '', 1300, 560, 1, 'left')); metaText(ctx, 'NA HET BOODSCHAPPEN', 960, 300, C.text2, 'center', 28); });
    // 5: aannames onder het advies
    laag(ctx, F(5), () => { mk2_bureau(ctx, 420, 650, 640); iris(ctx, 300, t, { kijk: 1, uit: 'neutraal', pose: 'wijs' }); naamBij(ctx, 'Milieukundige Iris', '', 300, 362, 1, 'center'); thijs(ctx, 1240, t, { kijk: -1, uit: 'neutraal', pose: 'staan' });
      const k = q.on('tassen', 1, 0.4) + q.on('studies', 1, 0.4) + q.on('afvalverwerking', 1, 0.4); mk2_adviesbrief(ctx, 760, 470, 500, { typ: Math.min((6 + k) / 9, clamp((t - ph[3]) / 1.4, 0, 1) * 6 / 9 + k / 9) }); });
    // 6: eerst laten nakijken
    laag(ctx, F(6), () => { mk2_poster(ctx, 620, 480, 330, { briefje: q.on('nagekeken', 1, 0.5), rot: -0.02 }); laag(ctx, q.on('norm', 1, 0.4), () => { kaart(ctx, 960, 330, 820, 240, 1, C.goud); metaText(ctx, 'ISO 14040', 1000, 390, C.goud, 'left', 28); text(ctx, 'vergelijking naar buiten', 1000, 460, fTekst(44, 800), C.text, 'left'); text(ctx, '→ kritische toets', 1000, 530, fTekst(44, 800), C.goud, 'left'); }); });
    // 7: zwerfafval in de berm
    laag(ctx, F(7), () => { const ub = clamp((t - q.at('berm', 1)) / 3.2, 0, 1); mk2_berm(ctx, 360, 680, 1200, { u: ub, t });
      kaart(ctx, 360, 240, 1200, 150, 1, C.koraal); text(ctx, 'zwerfafval', 400, 320, fTekst(52, 800), C.koraal, 'left'); metaText(ctx, 'ZIT IN DE MEESTE ANALYSES NIET · UNEP 2020', 400, 366, C.text, 'left', 28); });
    // 8: de Spaanse studie
    laag(ctx, F(8), () => { echtKaart(ctx, 160, 200, 1100, 'SPAANSE STUDIE MET ZWERFAFVAL', [['zwerfafval wel meegeteld', 1], ['andere volgorde', q.on('volgorde', 1)]], 'CIVANCIK-USLU E.A. 2019 · UPF', 1, { lh: 64, px: 44 });
      mk2_berm(ctx, 160, 740, 600, { u: 1, t });
      // volgorde: de andere tassen boven, het dunne plastic tasje onderaan
      laag(ctx, q.on('volgorde', 1, 0.5), () => { metaText(ctx, 'ZWERFAFVAL', 1640, 230, C.text2, 'center', 28); lijn(ctx, [[1440, 260], [1440, 830]], C.line, 2); metaText(ctx, 'MINDER', 1460, 290, C.text2, 'left', 28); metaText(ctx, 'MEER', 1460, 820, C.koraal, 'left', 28);
        mk2_miniTas(ctx, 1570, 420, 110, 'papier'); mk2_miniTas(ctx, 1740, 420, 110, 'katoen'); metaText(ctx, 'ANDERE TASSEN', 1660, 470, C.text2, 'center', 28); });
      laag(ctx, q.on('dunne', 1, 0.4), () => { mk2_plasticTasje(ctx, 1680, 780, 0.55, {}); laag(ctx, q.on('slechtst', 1, 0.4), () => naamBij(ctx, 'slechtst', 'DUN PLASTIC TASJE', 1680, 560, 1, 'center', C.koraal)); }); });
    // 9: het besluit
    laag(ctx, F(9), () => { iris(ctx, 340, t, { kijk: 1, uit: 'blij', pose: q.on('winnaar', 1) > 0.5 ? 'wijs' : 'staan' }); naamBij(ctx, 'Milieukundige Iris', '', 340, 362, 1, 'center'); thijs(ctx, 620, t, { kijk: 1, uit: 'blij' });
      mk2_adviesbrief(ctx, 1240, 490, 420, { typ: 1, stempel: q.on('gemeente', 2, 0.8) }); }); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const tL = q.at('milieulast', 1), B = ramp(t, tL - 0.3, 0.5), tM = q.at('milieukundige', 1), Cm = ramp(t, tM - 0.3, 0.5);
    laag(ctx, 1 - B, () => { const p = [['milieueffect', 420], ['vaak', 960], ['afval', 1500]];
      laag(ctx, 0.4 + 0.6 * q.on('milieueffect', 1, 0.4), () => { ctx.save(); ctx.translate(120, 330); ctx.scale(0.5, 0.5); vakken(ctx, { x: 0, y: 0, w: 1680, h: 760 }); ctx.restore(); });
      laag(ctx, q.on('vaak', 1, 0.4), () => { mk2_papierTasje(ctx, 1150, 690, 1.3, { turf: 4 }); metaText(ctx, 'HOE VAAK', 1150, 760, C.text2, 'center', 28); });
      laag(ctx, q.on('afval', 1, 0.4), () => { mk2_afval(ctx, 1400, 690, 1.3, { soort: 'stort' }); mk2_afval(ctx, 1640, 690, 1.3, { soort: 'verbranden', t }); metaText(ctx, 'AANNAMES OVER AFVAL', 1560, 760, C.text2, 'center', 28); }); });
    laag(ctx, B * (1 - Cm), () => { mk2_papierTasje(ctx, 560, 760, 2.0, { turf: 10, scheur: q.on('heel', 1, 0.5) }); const yb = 760, L = 420; lijn(ctx, [[900, yb], [1800, yb]], C.line, 2);
      for (let i = 0; i < 5; i++) lastBalk(ctx, 980 + i * 180, yb, 110, L / (i + 1), C.koraal, q.on('kleiner', 1, 0.3 + i * 0.25)); metaText(ctx, 'MILIEULAST PER KEER', 900, 260, C.text2, 'left', 28);
      laag(ctx, q.on('beste', 1, 0.4), () => { kaart(ctx, 900, 140, 900, 90, 1, C.goud); text(ctx, 'de beste tas: die je al hebt', 930, 200, fTekst(40, 800), C.goud, 'left'); }); });
    laag(ctx, Cm, () => { thijs(ctx, 260, t, { kijk: 1, uit: 'blij' }); iris(ctx, 520, t, { kijk: 1, uit: 'blij', pose: 'wijs' });
      klembord(ctx, 760, 210, 1000, 'MILIEUKUNDIGE', [['van wieg tot graf volgen', q.on('volgt', 1), q.on('graf', 1, 0.4)], ['effecten naast elkaar', q.on('zet', 1), q.on('elkaar', 1, 0.4)], ['vergelijking eerlijk maken', q.on('maakt', 1), q.on('eerlijk', 1, 0.4)], ['aannames opschrijven', q.on('schrijft', 1), q.on('aannam', 1, 0.4)]], 1, { lh: 90, px: 44 }); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = [['hbo', 'Milieukunde · 4 jaar', 'HAS GREEN ACADEMY, DEN BOSCH · CIRCULAIRE ECONOMIE', 'hbo', C.groen], ['wo', 'Environmental Sciences · 3 jaar', 'WAGENINGEN · ENGELSTALIG', 'Wageningen', C.groen], ['onderzoek', 'Radboud Universiteit, Nijmegen', 'REKENMETHODES VOOR LEVENSCYCLUSANALYSES', 'Radboud', C.teal], ['werk', 'bijv. omgevingsdienst, adviesbureau, RIVM', '', 'rekenmethodes', C.goud]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const y = 236 + i * 150;
      roundRect(ctx, 100, y, 1340, 130, 18); shape(ctx, rgba('#0D1420', 0.9), kl, 2); text(ctx, n, 140, y + 80, fTitel(i === 2 ? 38 : 46), kl); text(ctx, o, 360, y + 60, fTekst(42, 700), C.text); if (m) metaText(ctx, m, 360, y + 104, C.grain, 'left', 28); ctx.restore(); });
    thijs(ctx, 1600, t, { kijk: 1, uit: 'blij' }); iris(ctx, 1800, t, { kijk: -1, uit: 'blij' }); }
});
