
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
// Wat word jij? · Neurowetenschappen 1 · Je brein vult het in — eigen tekeningen (20 okt 2026)

// stopcontact (Nederlands, randaarde), vooraanzicht; gez 0..1 = goudkleurig gezicht erover
function stopcontact(ctx, x, y, s, a = 1, gez = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -150, 300, 300, 34); shape(ctx, '#EDEAE2', '#B9B4A8', 3);
  circ(ctx, 0, -10, 98, '#DCD8CE', '#B9B4A8', 3);
  roundRect(ctx, -12, -112, 24, 20, 4); shape(ctx, '#B8BCC4', '#8A8E96', 2); roundRect(ctx, -12, 72, 24, 20, 4); shape(ctx, '#B8BCC4', '#8A8E96', 2);
  circ(ctx, -40, -18, 15, '#3A3E48'); circ(ctx, 40, -18, 15, '#3A3E48');
  circ(ctx, 0, 118, 11, '#C8C4BA', '#9A968C', 2); ctx.strokeStyle = '#9A968C'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-7, 118); ctx.lineTo(7, 118); ctx.stroke();
  if (gez > 0.01) { ctx.save(); ctx.globalAlpha *= gez; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round';
    circ(ctx, -40, -18, 26, null, C.goud, 5); circ(ctx, 40, -18, 26, null, C.goud, 5); circ(ctx, 0, 118, 22, null, C.goud, 5);
    ctx.beginPath(); ctx.arc(-40, -48, 26, 3.6, 5.8); ctx.stroke(); ctx.beginPath(); ctx.arc(40, -48, 26, 3.6, 5.8); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// kleine voorwerpen met een 'gezicht' (pareidolie): 'auto' | 'huis' | 'kraan'
function gezichtDing(ctx, soort, x, y, s, a = 1, gez = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'auto') { roundRect(ctx, -120, -70, 240, 120, 30); shape(ctx, '#6E8CA8', '#9DB4C8', 2); circ(ctx, -62, -20, 22, '#F2EEE4', '#B8B0A0', 2); circ(ctx, 62, -20, 22, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, -50, 14, 100, 22, 10); shape(ctx, '#2A3446', null); }
  if (soort === 'huis') { ctx.beginPath(); ctx.moveTo(-110, -40); ctx.lineTo(0, -130); ctx.lineTo(110, -40); ctx.closePath(); shape(ctx, '#8C5A3A', null); roundRect(ctx, -100, -40, 200, 150, 4); shape(ctx, '#C9A35C', '#E0C27A', 2); roundRect(ctx, -70, -10, 44, 44, 4); shape(ctx, '#3E5C86', null); roundRect(ctx, 26, -10, 44, 44, 4); shape(ctx, '#3E5C86', null); roundRect(ctx, -22, 50, 44, 60, 4); shape(ctx, '#5A4632', null); }
  if (soort === 'kraan') { roundRect(ctx, -26, -110, 52, 70, 12); shape(ctx, '#AFC0D0', '#D8E2EC', 2); roundRect(ctx, -110, -40, 220, 60, 26); shape(ctx, '#AFC0D0', '#D8E2EC', 2); circ(ctx, -60, -76, 18, '#7A8BA8'); circ(ctx, 60, -76, 18, '#7A8BA8'); roundRect(ctx, -14, 20, 28, 50, 8); shape(ctx, '#AFC0D0', '#D8E2EC', 2); }
  if (gez > 0.01) { ctx.save(); ctx.globalAlpha *= gez; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; const E = soort === 'auto' ? [[-62, -20], [62, -20], [0, 25]] : soort === 'huis' ? [[-48, 12], [48, 12], [0, 80]] : [[-60, -76], [60, -76], [0, 45]];
    E.forEach(([px, py], i) => circ(ctx, px, py, i === 2 ? 34 : 30, null, C.goud, 4)); ctx.restore(); }
  ctx.restore(); }

// oog in doorsnede (voorkant links) met oogzenuw als kabel naar rechts
function oogKabel(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { gv = 0, bv = 0, kabel = 1, vezels = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (kabel > 0.01) { ctx.save(); ctx.globalAlpha *= kabel; ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(128, 64); ctx.bezierCurveTo(300, 80, 420, -20, 620, -10); ctx.stroke();
    if (vezels > 0.01) { for (let i = 0; i < 9; i++) { const u = ((t * 0.35 + i / 9) % 1); const px = 128 + u * 490, py = 64 - u * 74 + Math.sin(u * 3) * 10; circ(ctx, px, py, 6, rgba(C.goud, vezels)); } } ctx.restore(); }
  circ(ctx, 0, 0, 150, '#F2EEE4', '#B8B0A0', 3);
  ctx.beginPath(); ctx.arc(0, 0, 138, -1.15, 1.15); ctx.strokeStyle = rgba(C.koraal, 0.8); ctx.lineWidth = 10; ctx.stroke(); // netvlies
  ctx.beginPath(); ctx.ellipse(-112, 0, 22, 56, 0, 0, 6.283); shape(ctx, rgba('#BFE3F0', 0.6), '#7FA8C0', 2); // lens
  circ(ctx, -148, 0, 34, null, '#3E5C86', 6);
  if (gv > 0.01) { circ(ctx, 146, 0, 14, rgba(C.goud, gv), null); }
  if (bv > 0.01) { circ(ctx, 128, 64, 15, rgba('#121A26', bv), C.text2, 2); }
  ctx.restore(); }

// eenvoudig straatbeeld; scherp = cirkel (x,y,r) die scherp en in kleur is, de rest wazig en grijzig
function straatBeeld(ctx, X, Y, w, h, a = 1, scherp = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const teken = () => { ctx.fillStyle = '#6E8CA8'; ctx.fillRect(X, Y, w, h * 0.55); ctx.fillStyle = '#5A6070'; ctx.fillRect(X, Y + h * 0.78, w, h * 0.22); ctx.fillStyle = '#7FC48F'; ctx.fillRect(X, Y + h * 0.7, w, h * 0.08);
    const huizen = [['#C9A35C', 0.04, 0.3], ['#E07A5F', 0.24, 0.22], ['#8C7BBF', 0.42, 0.34], ['#C9A35C', 0.62, 0.26], ['#5BA4C9', 0.8, 0.3]];
    huizen.forEach(([col, fx, fh]) => { ctx.fillStyle = col; ctx.fillRect(X + w * fx, Y + h * (0.7 - fh), w * 0.16, h * fh); ctx.fillStyle = '#2C3E5E'; for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) ctx.fillRect(X + w * (fx + 0.025 + k * 0.07), Y + h * (0.7 - fh + 0.05 + r * 0.1), w * 0.04, h * 0.06); });
    ctx.fillStyle = '#F2C94C'; ctx.beginPath(); ctx.arc(X + w * 0.86, Y + h * 0.14, h * 0.07, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#E8E2D8'; for (let i = 0; i < 6; i++) ctx.fillRect(X + w * (0.05 + i * 0.16), Y + h * 0.88, w * 0.08, 6); };
  ctx.save(); roundRect(ctx, X, Y, w, h, 12); ctx.clip(); ctx.filter = 'blur(9px) saturate(0.25)'; teken(); ctx.filter = 'none'; ctx.restore();
  if (scherp) { const [sx, sy, sr] = scherp; ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 6.283); ctx.clip(); teken(); ctx.restore(); circ(ctx, sx, sy, sr, null, C.goud, 3); }
  roundRect(ctx, X, Y, w, h, 12); ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

// sprongetjes van het oog: punten 0..k verbonden door een zigzag
const SPRONG = [[0.18, 0.4], [0.47, 0.32], [0.33, 0.62], [0.66, 0.45], [0.86, 0.2], [0.55, 0.78], [0.8, 0.66]];
function sprongen(ctx, X, Y, w, h, k, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath();
  const n = Math.min(SPRONG.length, Math.floor(k) + 1); for (let i = 0; i < n; i++) { const [u, v] = SPRONG[i]; i ? ctx.lineTo(X + u * w, Y + v * h) : ctx.moveTo(X + u * w, Y + v * h); } ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < n; i++) { const [u, v] = SPRONG[i]; circ(ctx, X + u * w, Y + v * h, 9, C.goud); } ctx.restore(); }

// test voor de blinde vlek: kaart met kruisje links en stip rechts; weg 0..1 = stip verdwijnt; lijn = er loopt een lijn door de stip
function blindeVlekKaart(ctx, x, y, w, a = 1, weg = 0, lijn = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.36; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  const cy = y + h / 2; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.16 - 22, cy); ctx.lineTo(x + w * 0.16 + 22, cy); ctx.moveTo(x + w * 0.16, cy - 22); ctx.lineTo(x + w * 0.16, cy + 22); ctx.stroke();
  if (lijn > 0.01) { ctx.save(); ctx.globalAlpha *= lijn; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + w * 0.62, cy); ctx.lineTo(x + w * 0.94, cy); ctx.stroke(); ctx.restore(); }
  circ(ctx, x + w * 0.78, cy, 30, rgba(C.koraal, 1 - weg)); ctx.restore(); }

// schaakbord met schaduw (naar de illusie van Adelson). A = donker vakje buiten de schaduw, B = licht vakje midden in de schaduw: precies dezelfde grijswaarde.
const BORD_N = 5, BORD_A = [1, 0], BORD_B = [3, 1];
function _schaduwF(u, v) { // u, v in vakjes (0..5); schaduw = band van de cilinder (4.3, 1.5) naar linksonder, zachte rand
  const ax = 4.3, ay = 1.6, bx = 1.2, by = 4.8, dx = bx - ax, dy = by - ay; let t = ((u - ax) * dx + (v - ay) * dy) / (dx * dx + dy * dy); t = clamp(t, 0, 1);
  const d = Math.hypot(u - (ax + dx * t), v - (ay + dy * t)); const k = clamp((d - 1.45) / 0.55, 0, 1); const sm = k * k * (3 - 2 * k); return 0.6 + 0.4 * sm; }
let _bordCache = null;
function _bordBeeld(sz) { if (_bordCache && _bordCache.sz === sz) return _bordCache.c; const n = BORD_N * sz, c = document.createElement('canvas'); c.width = n; c.height = n; const g = c.getContext('2d'); const im = g.createImageData(n, n);
  for (let py = 0; py < n; py++) for (let px = 0; px < n; px++) { const u = (px + 0.5) / sz, v = (py + 0.5) / sz, r = Math.floor(v), cc = Math.floor(u); const licht = (r + cc) % 2 === 0;
    const isA = r === BORD_A[0] && cc === BORD_A[1], isB = r === BORD_B[0] && cc === BORD_B[1]; let val = (licht ? 200 : 120) * _schaduwF(u, v); if (isA) val = 120; if (isB) val = 120; // A en B exact gelijk
    const o = (py * n + px) * 4; im.data[o] = im.data[o + 1] = im.data[o + 2] = Math.round(val); im.data[o + 3] = 255; }
  g.putImageData(im, 0, 0); _bordCache = { sz, c }; return c; }
function grijs(v) { const k = Math.round(v); return `rgb(${k},${k},${k})`; }
function schaakbord(ctx, x, y, sz, a = 1, o = {}) { if (a <= 0.01) return; const { rest = 1, labels = 1, cilinder = 1, strook = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  if (rest > 0.01) { ctx.save(); ctx.globalAlpha *= rest; ctx.drawImage(_bordBeeld(sz), x, y); ctx.restore(); }
  if (rest < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - rest; [BORD_A, BORD_B].forEach(([r, c]) => { ctx.fillStyle = grijs(120); ctx.fillRect(x + c * sz, y + r * sz, sz, sz); }); ctx.restore(); }
  if (cilinder > 0.01 && rest > 0.01) { ctx.save(); ctx.globalAlpha *= cilinder * rest; const cx = x + 4.3 * sz, cyb = y + 1.6 * sz; ctx.fillStyle = '#4F8A5C'; ctx.fillRect(cx - 0.42 * sz, cyb - 1.6 * sz, 0.84 * sz, 1.6 * sz); ctx.beginPath(); ctx.ellipse(cx, cyb, 0.42 * sz, 0.16 * sz, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#6FAE7C'; ctx.beginPath(); ctx.ellipse(cx, cyb - 1.6 * sz, 0.42 * sz, 0.16 * sz, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.strokeStyle = rgba(C.line, 0.5 * rest); ctx.lineWidth = 2; ctx.strokeRect(x, y, BORD_N * sz, BORD_N * sz);
  if (strook > 0.01) { ctx.save(); ctx.globalAlpha *= strook; ctx.fillStyle = grijs(120); const ax = x + (BORD_A[1] + 0.5) * sz, ay = y + (BORD_A[0] + 0.5) * sz, bx = x + (BORD_B[1] + 0.5) * sz, by = y + (BORD_B[0] + 0.5) * sz; ctx.fillRect(ax - 0.18 * sz, ay, 0.36 * sz, by - ay + 0.18 * sz); ctx.fillRect(ax - 0.18 * sz, by - 0.18 * sz, bx - ax + 0.18 * sz, 0.36 * sz); ctx.restore(); }
  if (labels > 0.01) { const lab = (rc, s2) => text(ctx, s2, x + (rc[1] + 0.5) * sz, y + (rc[0] + 0.5) * sz + 18, fTekst(52, 800), C.goud, 'center'); ctx.save(); ctx.globalAlpha *= labels; lab(BORD_A, 'A'); lab(BORD_B, 'B'); ctx.restore(); }
  ctx.restore(); }

// speelveld van bovenaf: drie witte en drie zwarte spelers als schijfjes, ballen die overgaan; g 0..1 = gorilla loopt door
function speelveld(ctx, x, y, w, h, a = 1, t = 0, g = -1, o_bors = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3446', rgba(C.line, 0.6), 2);
  const P = []; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.35 * (i % 2 ? 1 : -1); P.push([x + w / 2 + Math.cos(an) * w * 0.32, y + h / 2 + Math.sin(an) * h * 0.3, i % 2 === 0]); }
  P.forEach(([px, py, wit]) => circ(ctx, px, py, 22, wit ? '#F2F2EE' : '#151A22', wit ? '#B8B0A0' : '#5A6478', 3));
  [[0, 2], [1, 3]].forEach(([i0, i1], k) => { const u = ((t * 0.7 + k * 0.5) % 1); const A = P[i0 + (Math.floor(t * 0.7 + k * 0.5) % 2) * 2 % 6] || P[i0], B = P[(i1 + (Math.floor(t * 0.7 + k * 0.5) % 2) * 2) % 6]; const bx = A[0] + (B[0] - A[0]) * u, by = A[1] + (B[1] - A[1]) * u - Math.sin(u * 3.14) * 40; circ(ctx, bx, by, 11, C.oker, '#8C6A3A', 2); });
  if (g >= 0 && g <= 1) { ctx.save(); roundRect(ctx, x, y, w, h, 14); ctx.clip(); const gx = x - 60 + g * (w + 120), gy = y + h / 2; gorilla(ctx, gx, gy, 0.55, 1, t, typeof o_bors === 'number' ? o_bors : 0); ctx.restore(); }
  ctx.restore(); }
// gorilla(pak) van opzij, eenvoudig silhouet; bors = slaat op de borst
function gorilla(ctx, x, y, s, a = 1, t = 0, bors = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const GC = '#4A4E58'; ctx.fillStyle = GC;
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -110, 46, GC); ctx.beginPath(); ctx.ellipse(0, -100, 26, 20, 0, 0, 6.283); ctx.fillStyle = '#6A6E78'; ctx.fill(); circ(ctx, -10, -118, 5, '#E8E2D8'); circ(ctx, 10, -118, 5, '#E8E2D8');
  const sw = bors ? Math.sin(t * 14) * 0.25 : 0; ctx.strokeStyle = GC; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(-80 + sw * 60, 50 - bors * 70); ctx.moveTo(50, -40); ctx.lineTo(80 - sw * 60, 50 - bors * 70); ctx.moveTo(-30, 70); ctx.lineTo(-36, 150); ctx.moveTo(30, 70); ctx.lineTo(36, 150); ctx.stroke(); ctx.restore(); }

// longscan (CT, doorsnede) met knobbeltjes en een kleine gorilla rechtsboven in de long
function longScan(ctx, x, y, s, a = 1, gor = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -260, -200, 520, 400, 16); shape(ctx, '#0E1118', '#4A5060', 2); ctx.beginPath(); ctx.ellipse(0, 10, 220, 170, 0, 0, 6.283); shape(ctx, '#8A8E96', null);
  ctx.beginPath(); ctx.ellipse(-90, 0, 90, 130, 0.1, 0, 6.283); ctx.fillStyle = '#20242C'; ctx.fill(); ctx.beginPath(); ctx.ellipse(95, 0, 85, 125, -0.1, 0, 6.283); ctx.fill();
  circ(ctx, 0, 30, 34, '#B8BCC4'); [[-110, -40], [-70, 50], [120, 60], [70, -70]].forEach(([px, py]) => circ(ctx, px, py, 8, '#C9CED6'));
  if (gor > 0.01) { ctx.save(); ctx.globalAlpha *= gor; ctx.fillStyle = '#D8DCE2'; ctx.translate(105, -40); ctx.scale(0.3, 0.3); ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(0, -110, 46, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#D8DCE2'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -40); ctx.lineTo(-80, 50); ctx.moveTo(50, -40); ctx.lineTo(80, 50); ctx.stroke(); ctx.restore(); }
  if (hl > 0.01) circ(ctx, 105, -50, 66, null, rgba(C.goud, hl), 4);
  ctx.restore(); }

// weg van bovenaf: kruising met fietser (stip met richting) en een afslaande auto
function kruising(ctx, x, y, w, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#3A4458'; ctx.fillRect(x, y + w * 0.32, w, w * 0.22); ctx.fillRect(x + w * 0.42, y, w * 0.22, w * 0.9);
  ctx.fillStyle = '#7A4A40'; ctx.fillRect(x, y + w * 0.55, w, w * 0.06); // fietspad
  ctx.strokeStyle = '#E8E2D8'; ctx.lineWidth = 3; ctx.setLineDash([16, 14]); ctx.beginPath(); ctx.moveTo(x, y + w * 0.43); ctx.lineTo(x + w, y + w * 0.43); ctx.stroke(); ctx.setLineDash([]);
  const bx = x + w * (0.08 + u * 0.45), by = y + w * 0.58; circ(ctx, bx, by, 12, C.teal, '#BFE3F0', 2);
  ctx.save(); const an = -Math.min(1, u * 1.4) * 1.57; const cx2 = x + w * 0.62 + Math.sin(-an) * w * 0.05, cy2 = y + w * 0.38 + (1 - Math.cos(an)) * w * 0.1; ctx.translate(cx2, cy2); ctx.rotate(an + 3.14); roundRect(ctx, -36, -18, 72, 36, 8); shape(ctx, C.koraal, null); ctx.restore(); ctx.restore(); }

// telefoon in de hand (los voorwerp)
function telefoon(ctx, x, y, s, a = 1, licht = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26 * s, y - 48 * s, 52 * s, 96 * s, 10 * s); shape(ctx, '#20242E', '#6A7080', 2); roundRect(ctx, x - 21 * s, y - 40 * s, 42 * s, 78 * s, 5 * s); shape(ctx, rgba(C.teal, 0.3 + 0.5 * licht), null); ctx.restore(); }

// arm (onderarm + hand) van opzij; fantoom 0..1: de hand wordt gestippeld
function armHand(ctx, x, y, s, a = 1, fantoom = 0, pijn = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -320, -40, 220, 80, 36); shape(ctx, '#D9A982', null); // bovenarm/stomp
  ctx.save(); if (fantoom > 0.01) { ctx.globalAlpha *= 1 - fantoom * 0.8; } roundRect(ctx, -120, -36, 200, 72, 32); shape(ctx, '#D9A982', null); ctx.beginPath(); ctx.ellipse(120, 0, 62, 48, 0, 0, 6.283); shape(ctx, '#D9A982', null); for (let i = 0; i < 4; i++) { roundRect(ctx, 150, -40 + i * 22, 70, 18, 9); shape(ctx, '#D9A982', null); } ctx.restore();
  if (fantoom > 0.01) { ctx.save(); ctx.globalAlpha *= fantoom; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, -120, -36, 200, 72, 32); ctx.stroke(); ctx.beginPath(); ctx.ellipse(120, 0, 62, 48, 0, 0, 6.283); ctx.stroke(); for (let i = 0; i < 4; i++) { roundRect(ctx, 150, -40 + i * 22, 70, 18, 9); ctx.stroke(); } ctx.setLineDash([]);
    ctx.strokeStyle = '#B8876A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-100, -38); ctx.quadraticCurveTo(-90, 0, -100, 38); ctx.stroke(); ctx.restore(); }
  if (pijn > 0.01) { ctx.save(); ctx.globalAlpha *= pijn; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const an = i * 1.05 + t; const r1 = 80 + 6 * Math.sin(t * 6 + i); ctx.beginPath(); ctx.moveTo(130 + Math.cos(an) * r1, Math.sin(an) * r1); ctx.lineTo(130 + Math.cos(an) * (r1 + 30), Math.sin(an) * (r1 + 30)); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }

// kaart van het lichaam in de schors: een strook vakjes; over = 0..1 hoe ver het gezichtsvak het handvak overneemt
const STROOK = [['voet', C.oker], ['been', C.oker], ['romp', C.teal], ['arm', C.teal], ['hand', C.goud], ['gezicht', C.koraal], ['lippen', C.koraal]];
function lichaamsKaart(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; const { over = 0, handLeeg = 0, hl = -1 } = o; ctx.save(); ctx.globalAlpha *= a; const bw = w / STROOK.length;
  STROOK.forEach(([n, col], i) => { const isH = n === 'hand', isG = n === 'gezicht'; let x0 = x + i * bw, ww = bw - 8; if (isG) { x0 -= over * bw * 0.6; ww += over * bw * 0.6; } if (isH) ww -= over * bw * 0.6;
    roundRect(ctx, x0, y, ww, 110, 12); shape(ctx, rgba(col, isH ? 0.35 * (1 - handLeeg * 0.7) : (hl === i ? 0.6 : 0.3)), col, 2); text(ctx, n, x0 + ww / 2, y + 66, fTekst(28, 700), C.text, 'center'); });
  ctx.restore(); }

// spiegelkist van bovenaf: twee vakken, spiegel in het midden, een hand en zijn spiegelbeeld
function spiegelKist(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -300, -150, 600, 300, 14); shape(ctx, '#3A3E46', '#6A7080', 2); ctx.fillStyle = '#BFE3F0'; ctx.fillRect(-6, -150, 12, 300); metaText(ctx, 'SPIEGEL', 0, -170, C.grain, 'center', 26);
  const g = Math.sin(t * 2) * 12; ctx.beginPath(); ctx.ellipse(150, 20 + g, 60, 44, 0, 0, 6.283); shape(ctx, '#D9A982', null); ctx.save(); ctx.globalAlpha *= 0.55; ctx.setLineDash([10, 8]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(-150, 20 + g, 60, 44, 0, 0, 6.283); ctx.stroke(); ctx.restore();
  ctx.restore(); }

// oog met donkere vlek in het midden (slechtziend) en een muur waarop beelden opkomen
function vlekOog(ctx, x, y, s, a = 1, vlek = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(0, -90, 120, 0); ctx.quadraticCurveTo(0, 90, -120, 0); shape(ctx, '#F2EEE4', '#B8B0A0', 3); circ(ctx, 0, 0, 46, '#3E5C86'); circ(ctx, 0, 0, 20, '#121A26'); if (vlek > 0.01) { ctx.save(); ctx.globalAlpha *= vlek; circ(ctx, 0, 0, 56, rgba('#121A26', 0.75)); ctx.restore(); } ctx.restore(); }
function bloemMotief(ctx, x, y, r, col, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.2; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.45, r * 0.22, an, 0, 6.283); ctx.fillStyle = rgba(col, 0.7); ctx.fill(); } circ(ctx, x, y, r * 0.25, C.goud); ctx.restore(); }

// gezichtsgebied op het brein: brein() in zijaanzicht (voorkant links), vlek onder in de slaapkwab
function breinGezicht(ctx, x, y, s, a = 1, hl = 0, t = 0) { brein(ctx, x, y, s, a); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a; vlek(ctx, x + 60 * s, y + 80 * s, 52 * s, C.goud, hl, t, 1); ctx.restore(); } }
// zicht achterin: hersenschors voor zien
function breinZicht(ctx, x, y, s, a = 1, hl = 0, t = 0) { brein(ctx, x, y, s, a); if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a; vlek(ctx, x + 250 * s, y - 20 * s, 56 * s, C.teal, hl, t, 1); ctx.restore(); } }
// Wat word jij? · Neurowetenschappen · Je brein vult het in — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Sam, Daan, Yasmin, Lotte).
// Rode draad: het gezicht in het stopcontact.

function keukenWand(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22314C'; ctx.fillRect(0, 100, W, 680); ctx.fillStyle = '#2C3E5E'; for (let i = 0; i < 12; i++) ctx.fillRect(820 + (i % 6) * 140, 560 + Math.floor(i / 6) * 100, 132, 92); ctx.fillStyle = '#5A4632'; roundRect(ctx, 620, 700, 560, 26, 8); ctx.fill(); ctx.fillRect(650, 726, 20, 154); ctx.fillRect(1130, 726, 20, 154); ctx.restore(); }
function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }

Object.assign(SCENES, {
  title(ctx, t) { stopcontact(ctx, 1450, 560, 1.15, 1, 1, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); keukenWand(ctx); persoon(ctx, 'sam', 470, 880, 560, { t, uit: q.on('Opeens', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Sam', 'aan de keukentafel', 620, 330, q.on('Sam', 1));
    stopcontact(ctx, 1320, 380, 1.1, 1, q.on('gezicht', 1, 1), t); chip(ctx, 'twee ronde gaatjes', 1320, 160, C.teal, q.on('gaatjes', 1) * (1 - q.on('gezicht', 1)), 30); chip(ctx, 'plastic', 1640, 260, C.text2, q.on('plastic', 1), 32); chip(ctx, 'toch een gezicht', 1640, 340, C.goud, q.on('Toch', 1), 32); vraagteken(ctx, 1700, 560, q.on('komt', 1), 120); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const B = q.on('binnenkrijgen', 1, 0.8);
    vlekOog(ctx, 520, 440, 1.1, 1 - B, 0); vink_(ctx, 520, 600, 30, q.on('prima', 1) * (1 - B)); regel(ctx, 'ogen: prima', 520, 680, q.on('prima', 1) * (1 - B), C.groen, 34, 'center', 700);
    pijl(ctx, 700, 440, 1060, 440, C.line, q.on('hersenen', 1) * (1 - B), 3, 16); breinGezicht(ctx, 1380, 460, 0.8, q.on('hersenen', 1) * (1 - B), q.on('gezicht', 1), t); regel(ctx, 'hersenen: maken het gezicht', 1380, 700, q.on('gezicht', 1) * (1 - B), C.goud, 34, 'center', 700);
    oogKabel(ctx, 520, 460, 1, B, { kabel: 1 }); breinZicht(ctx, 1400, 440, 0.7, B, 0, t); regel(ctx, 'wat komt er eigenlijk binnen?', 960, 760, B, C.text, 40, 'center', 700); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('Scherp', 1, 0.8), T = q.on('Toch', 2, 0.8);
    oogKabel(ctx, 380, 470, 1.05, 1, { kabel: 1, vezels: q.on('zenuw', 1), gv: q.on('gele', 1), t }); chip(ctx, 'meer dan 100 miljoen lichtgevoelige cellen', 420, 230, C.koraal, q.on('honderd', 1) * (1 - S), 30); chip(ctx, 'maar ± 1 miljoen vezels', 820, 330, C.teal, q.on('vezels', 1) * (1 - S), 30);
    straatBeeld(ctx, 1000, 220, 820, 470, S * (1 - T), [1410, 455, 70]); chip(ctx, '± duimnagel aan een gestrekte arm', 1410, 760, C.goud, q.on('duimnagel', 1) * (1 - T), 30); chip(ctx, 'rest: wazig en weinig kleur', 1410, 830, C.text2, q.on('wazig', 1) * (1 - T), 30);
    straatBeeld(ctx, 1000, 220, 820, 470, T, [1410, 455, 2000]); regel(ctx, 'zo lijkt het wél', 1410, 780, T, C.text, 36, 'center', 700); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const t0 = q.at('springen', 1); const k = clamp((t - t0) * 3.5, 0, SPRONG.length - 1); const i = Math.floor(k), r = k - i; const P = SPRONG[i], P2 = SPRONG[Math.min(SPRONG.length - 1, i + 1)];
    const fx = 300 + (P[0] + (P2[0] - P[0]) * clamp(r * 4 - 3, 0, 1)) * 1320, fy = 170 + (P[1] + (P2[1] - P[1]) * clamp(r * 4 - 3, 0, 1)) * 600;
    straatBeeld(ctx, 300, 170, 1320, 600, 1, [fx, fy, 80]); sprongen(ctx, 300, 170, 1320, 600, k, q.on('springen', 1)); chip(ctx, '± 3 à 4 sprongen per seconde', 960, 140, C.goud, q.on('seconde', 1), 30); vraagteken(ctx, 1720, 840, q.on('schokken', 1), 110); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const M = q.on('voorspelmachine', 1, 0.8);
    if (M < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - M; const fl = (Math.sin(t * 3) > 0.6) ? 1 : 0; straatBeeld(ctx, 300, 220, 1320, 560, 1, [960, 480, 2000]); ctx.fillStyle = rgba('#121A26', 0.55 * fl * q.on('dempen', 1)); ctx.fillRect(300, 220, 1320, 560); tag(ctx, 'tijdens een sprong: sterk gedempt', 960, 860, C.koraal, q.on('dempen', 1) * (1 - q.on('rustig', 1)), 'center', 30); tag(ctx, 'stukjes van daarnet + wat ze verwachten', 960, 860, C.goud, q.on('verwachten', 1), 'center', 30); ctx.restore(); }
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; vergKaart(ctx, 160, 300, 420, 200, 'voorspelling', ['wat er gaat komen'], C.paars, 1); vergKaart(ctx, 160, 560, 420, 200, 'wat binnenkomt', ['uit je ogen'], C.teal, q.on('binnenkomt', 1)); pijl(ctx, 600, 400, 780, 500, C.line, q.on('vergelijken', 1), 3, 14); pijl(ctx, 600, 660, 780, 560, C.line, q.on('vergelijken', 1), 3, 14);
      circ(ctx, 880, 530, 90, '#2A3A58', C.text2, 3); text(ctx, 'vergelijk', 880, 542, fTekst(32, 700), C.text, 'center');
      vergKaart(ctx, 1080, 300, 640, 200, 'klopt', ['weinig te veranderen'], C.groen, q.on('Klopt', 1)); vergKaart(ctx, 1080, 560, 640, 200, 'klopt niet', ['valt je op'], C.koraal, q.on('Klopt', 2)); tag(ctx, 'MODEL · geen vaststaand feit', 960, 860, C.goud, q.on('model', 1), 'center', 30); ctx.restore(); } },

  // ---------- H2 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('stip', 1, 0.8);
    oogKabel(ctx, 520, 450, 1, 1 - S, { kabel: 1, bv: q.on('vlek', 1) }); naamBij(ctx, 'blinde vlek', 'geen lichtgevoelige cellen', 700, 560, q.on('vlek', 1) * (1 - S)); chip(ctx, 'film: Zintuigen', 1500, 220, C.teal, q.on('Zintuigen', 1) * (1 - S), 28);
    vlekOog(ctx, 1260, 420, 0.7, q.on('ogen', 1) * (1 - S), 0); vlekOog(ctx, 1560, 420, 0.7, q.on('ogen', 1) * (1 - S), 0); tag(ctx, 'het ene oog dekt het gat van het andere af', 1410, 600, C.groen, q.on('dekt', 1) * (1 - S), 'center', 28);
    blindeVlekKaart(ctx, 410, 300, 1100, S, q.on('verdwijnt', 1, 1), q.on('lijn', 1, 0.8)); metaA(ctx, 'ÉÉN OOG DICHT · KIJK NAAR HET KRUISJE', 960, 260, S, C.grain, 'center', 28); haak(ctx, 560, 1360, 760, 'je hersenen vullen het gat in', C.groen, q.on('vullen', 1)); },

  s10(ctx, t, q) { bg(ctx, 'schema'); schaakbord(ctx, 660, 160, 120, 1, { labels: q.on('vakje', 1), cilinder: 1 }); vraagteken(ctx, 1560, 520, q.on('donkerder', 1), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: precies even donker'); const R = q.on('weg', 1, 0.6), T = q.on('schaduw', 1, 0.6);
    const rest = 1 - R * (1 - T); schaakbord(ctx, 300, 160, 120, 1, { rest, strook: R * (1 - T) }); regel(ctx, 'zonder de rest: even donker', 600, 820, R * (1 - T), C.text, 34, 'center', 700);
    vergKaart(ctx, 1080, 220, 680, 230, 'schaduw maakt donkerder', ['B ligt in de schaduw', '→ "eigenlijk licht"'], C.paars, T); vergKaart(ctx, 1080, 500, 680, 190, 'je ziet niet het licht', ['maar wat je hersenen ervan maken'], C.teal, q.on('maken', 1));
    haak(ctx, 1080, 1760, 760, 'illusies laten de rekenregel zien', C.groen, q.on('illusies', 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('pareidolie', 1, 0.8);
    stopcontact(ctx, 420, 430, 1, 1 - P, q.on('stippen', 1), t); breinGezicht(ctx, 1260, 420, 0.85, 1 - P, q.on('gebied', 1), t); naamBij(ctx, 'gezichtsgebied', 'reageert op gezichten', 1370, 545, q.on('gebied', 1) * (1 - P));
    chip(ctx, '2 stippen boven een streep', 420, 760, C.goud, q.on('stippen', 1) * (1 - P), 30); chip(ctx, '± 0,2 s · even snel als bij een gezicht', 1260, 800, C.teal, q.on('vijfde', 1) * (1 - P), 30); chip(ctx, 'niet pas achteraf', 1260, 160, C.groen, q.on('achteraf', 1) * (1 - P), 30);
    if (P > 0.01) { stopcontact(ctx, 360, 470, 0.8, P, 1, t); gezichtDing(ctx, 'auto', 820, 480, 1, P, 1); gezichtDing(ctx, 'huis', 1220, 500, 1, P, 1); gezichtDing(ctx, 'kraan', 1600, 500, 1, P, 1); regel(ctx, 'pareidolie', 960, 230, P, C.goud, 56, 'center', 800); regel(ctx, 'een gezicht zien in iets willekeurigs', 960, 790, P, C.text, 36, 'center', 600); } },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'AMERIKAANSE PSYCHOLOGEN · 1999', 120, 140, C.grain, 'left', 30); const tg = q.at('Halverwege', 1), ts = q.at('staan', 1), tw = q.at('loopt', 2);
    let g = -1; if (t >= tg) g = t < ts ? 0.5 * clamp((t - tg) / Math.max(0.5, ts - tg), 0, 1) : t < tw ? 0.5 : 0.5 + 0.5 * clamp((t - tw) / 4, 0, 1);
    persoon(ctx, 'daan', 260, 880, 460, { t }); persoon(ctx, 'yasmin', 1660, 880, 460, { t, kijk: -1 }); speelveld(ctx, 520, 200, 880, 520, q.on('filmpje', 1), t, g < 0 ? -1 : g, t > ts && t < tw ? 1 : 0);
    chip(ctx, 'tel: hoe vaak gooit wit over?', 960, 800, C.goud, q.on('tel', 1), 30); vraagteken(ctx, 1660, 300, q.on('Hoeveel', 1), 110); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const L = q.on('longscan', 1, 0.8);
    if (L < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - L; stippen(ctx, 620, 300, 10, 5, C.koraal, q.on('helft', 1), 10, 26, 72); regel(ctx, 'zag de gorilla niet', 960, 260, q.on('helft', 1), C.koraal, 34, 'center', 700); regel(ctx, 'aandachtsblindheid', 960, 520, q.on('aandachtsblindheid', 1), C.goud, 56, 'center', 800); regel(ctx, 'je aandacht kiest wat doordringt', 960, 600, q.on('kiest', 1), C.text, 36, 'center', 600); tag(ctx, 'ook al valt het op je netvlies', 960, 720, C.teal, q.on('netvlies', 1), 'center', 30); ctx.restore(); }
    if (L > 0.01) { longScan(ctx, 640, 480, 1.05, L, 1, q.on('vier', 1)); regel(ctx, 'ervaren artsen', 1420, 300, L, C.text, 38, 'center', 700); stippen(ctx, 1260, 380, 5, 4, C.koraal, q.on('vier', 1) * L, 5, 26, 80); regel(ctx, '4 op 5 zagen hem niet', 1420, 520, q.on('vier', 1) * L, C.koraal, 34, 'center', 700); tag(ctx, 'ze keken er recht naar', 1420, 640, C.goud, q.on('recht', 1) * L, 'center', 30); } },

  s17(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('afslaat', 1) + 1) / 4, 0, 1);
    kruising(ctx, 760, 170, 680, 1, u); persoon(ctx, 'lotte', 360, 880, 520, { t, pose: 'vasthouden', hold: (c, hx, hy) => telefoon(c, hx, hy, 0.8) }); naamBij(ctx, 'Lotte', 'fietst naar school', 500, 330, q.on('Lotte', 1));
    tag(ctx, 'ogen: op de weg', 1640, 260, C.teal, q.on('weg', 1), 'center', 28); tag(ctx, 'aandacht: op de telefoon', 1640, 340, C.koraal, q.on('aandacht', 1), 'center', 28); tag(ctx, 'afslaande auto: gemist?', 1640, 420, C.koraal, q.on('afslaat', 1), 'center', 28);
    haak(ctx, 1460, 1820, 600, 'onderzoek: verkeer en werk', C.groen, q.on('onderzoeken', 1)); },

  // ---------- H4 ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); armHand(ctx, 960, 400, 1.4, 1, q.on('amputatie', 1, 1.2), q.on('pijn', 1), t); chip(ctx, 'voelt de arm nog', 960, 640, C.goud, q.on('voelen', 1), 30); chip(ctx, 'jeuk in een hand die er niet is', 960, 720, C.goud, q.on('jeuk', 1), 30);
    stippen(ctx, 1500, 160, 10, 6, C.koraal, q.on('zes', 1), 10, 14, 34); regel(ctx, '± 6 op 10: pijn', 1500 + 150, 230, q.on('zes', 1), C.koraal, 30, 'center', 700); vraagteken(ctx, 1700, 760, q.on('vandaan', 1), 110); },

  s20(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const K = q.on('kaart', 1, 0.6), S = q.on('spiegeltherapie', 1, 0.8);
    armHand(ctx, 900, 380, 1.1, 1 - K, 1, 1, t); tag(ctx, 'zenuwen in de stomp', 560, 560, C.koraal, q.on('stomp', 1) * (1 - K), 'center', 28); tag(ctx, 'hersenen tekenen de hand nog', 1260, 560, C.koraal, q.on('tekenen', 1) * (1 - K), 'center', 28);
    if (K > 0.01 && S < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - S); metaText(ctx, 'KAART VAN HET LICHAAM IN DE SCHORS · FILM: HET HOOFDKANTOOR', 960, 240, C.grain, 'center', 28); lichaamsKaart(ctx, 360, 300, 1200, 1, { over: q.on('overnemen', 1, 1.2), handLeeg: q.on('signalen', 1), hl: q.on('wang', 1) > 0.5 ? 5 : -1 });
      tag(ctx, 'wang aanraken → voelt als de hand', 960, 560, C.goud, q.on('wang', 1), 'center', 30); tag(ctx, 'oorzaak van de pijn? wordt nog onderzocht', 960, 660, C.text2, q.on('onderzoeken', 1), 'center', 30); ctx.restore(); }
    if (S > 0.01) { spiegelKist(ctx, 960, 470, 1.2, S, t); tag(ctx, 'je hersenen zien de hand weer bewegen', 960, 740, C.teal, q.on('weer', 1) * S, 'center', 30); tag(ctx, 'helpt sommigen · bewijs onzeker', 960, 820, C.text2, q.on('onzeker', 1) * S, 'center', 30); } },

  s21(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('actief', 1, 0.8);
    vlekOog(ctx, 520, 440, 1.3, 1, q.on('slechtziend', 1)); metaA(ctx, 'SLECHTZIEND', 520, 640, q.on('slechtziend', 1), C.grain, 'center', 28);
    roundRect(ctx, 960, 200, 760, 520, 16); shape(ctx, rgba('#2C3E5E', 0.8 * q.on('slechtziend', 1)), null);
    [[1100, 330, C.paars, 'bloemen'], [1400, 300, C.koraal, 'bloemen'], [1560, 520, C.teal, 'patronen'], [1150, 560, C.groen, 'patronen']].forEach(([x, y, c, w]) => bloemMotief(ctx, x, y, 60, c, q.on(w, 1) * (1 - A), t));
    gezichtIcoon(ctx, 1350, 480, 0.8, q.on('gezichten', 1) * (1 - A), 'noor');
    tag(ctx, 'ze weten: het is niet echt', 1340, 790, C.groen, q.on('weten', 1) * (1 - A), 'center', 30); regel(ctx, 'syndroom van Charles Bonnet', 1340, 170, q.on('syndroom', 1), C.goud, 44, 'center', 800);
    breinZicht(ctx, 1340, 470, 0.85, A, 1, t); tag(ctx, 'te weinig signalen → gebieden voor zien worden zelf actief', 1340, 790, C.teal, A, 'center', 28); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('illusie', 1, 0.8);
    stopcontact(ctx, 360, 440, 0.9, 1, q.on('gezicht', 1), t); vergKaart(ctx, 700, 260, 340, 170, 'voorspelling', [], C.paars, 1 - I); text(ctx, '↔', 1100, 360, fTitel(56), rgba(C.text, 1 - I), 'center'); vergKaart(ctx, 1160, 260, 340, 170, 'wat binnenkomt', [], C.teal, 1 - I); text(ctx, '→', 1560, 360, fTitel(56), rgba(C.text, 1 - I), 'center'); regel(ctx, 'wat je ziet', 1720, 370, 1 - I, C.goud, 40, 'center', 800);
    if (I > 0.01) { vergKaart(ctx, 700, 260, 340, 220, 'illusie', ['invullen'], C.goud, I); vergKaart(ctx, 1080, 260, 340, 220, 'fantoomhand', ['invullen'], C.goud, q.on('fantoomhand', 1)); vergKaart(ctx, 1460, 260, 340, 220, 'gorilla', ['aandacht kiest'], C.teal, q.on('gorilla', 1)); } },

  s23(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'illusies als gereedschap', 960, 260, 1, C.goud, 56, 'center', 800); regel(ctx, 'ze laten zien wat de hersenen zelf toevoegen', 960, 340, q.on('toevoegen', 1), C.text, 36, 'center', 600);
    ['psychologie', 'biologie', 'biomedische wetenschappen', 'geneeskunde'].forEach((s2, i) => tag(ctx, s2, 330 + i * 420, 540, C.teal, q.on(s2.split(' ')[0], 1), 'center', 32)); pijl(ctx, 960, 590, 960, 680, C.line, q.on('master', 1), 3, 14); tag(ctx, 'master neurowetenschappen', 960, 760, C.goud, q.on('master', 1), 'center', 34); }
});
