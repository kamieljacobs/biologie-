
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
// Wat word jij? · Neurowetenschappen 2 · Brein en computer — eigen tekeningen (20 okt 2026)

// telefoon met fotogalerij; zoek 0..1 = 'kat' getypt en kattenfoto's oplichten
function galerijTelefoon(ctx, x, y, s, a = 1, zoek = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -320, 340, 640, 40); shape(ctx, '#20242E', '#6A7080', 3); roundRect(ctx, -150, -290, 300, 580, 24); shape(ctx, '#121A26', null);
  roundRect(ctx, -130, -270, 260, 52, 26); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1.5); text(ctx, zoek > 0.3 ? 'kat' : 'zoeken…', -100, -234, fTekst(28, 600), zoek > 0.3 ? C.text : C.text2, 'left');
  for (let i = 0; i < 12; i++) { const r = Math.floor(i / 3), c = i % 3; const px = -130 + c * 90, py = -195 + r * 112; const kat = [0, 4, 5, 9, 11].includes(i); const al = zoek > 0.3 ? (kat ? 1 : 0.18) : 1;
    ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, px, py, 80, 100, 8); shape(ctx, ['#3E5C86', '#5A6478', '#4F6E5A', '#6E5A78'][i % 4], kat && zoek > 0.3 ? C.goud : null, 3); if (kat) katIcoon(ctx, px + 40, py + 62, 0.42); else { circ(ctx, px + 40, py + 40, 16, rgba('#F2F2EE', 0.35)); ctx.fillStyle = rgba('#F2F2EE', 0.2); ctx.fillRect(px + 10, py + 66, 60, 22); } ctx.restore(); }
  ctx.restore(); }
function katIcoon(ctx, x, y, s, a = 1, col = '#C9A35C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 30, 70, 50, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -50, 50, col); ctx.beginPath(); ctx.moveTo(-46, -70); ctx.lineTo(-36, -118); ctx.lineTo(-12, -92); ctx.moveTo(46, -70); ctx.lineTo(36, -118); ctx.lineTo(12, -92); ctx.fill();
  circ(ctx, -18, -54, 6, '#121A26'); circ(ctx, 18, -54, 6, '#121A26'); ctx.strokeStyle = col; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(60, 50); ctx.quadraticCurveTo(120, 40, 110, -10); ctx.stroke(); ctx.restore(); }

// klein netwerk van bolletjes en lijnen (decoratief, achter de telefoon)
function netwerkje(ctx, x, y, w, h, a = 1, t = 0, lagen = [3, 4, 4, 2]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const pos = lagen.map((n, i) => Array.from({ length: n }, (_, k) => [x + i * w / (lagen.length - 1), y + (k + 0.5) * h / n]));
  for (let i = 0; i < pos.length - 1; i++) pos[i].forEach((p, k) => pos[i + 1].forEach((q2, m) => { const wgt = hash(i * 31 + k * 7 + m * 3); ctx.strokeStyle = rgba(wgt > 0.5 ? C.teal : C.koraal, 0.25 + 0.4 * wgt); ctx.lineWidth = 1 + wgt * 3; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); }));
  pos.flat().forEach(([px, py], i) => circ(ctx, px, py, 16, '#2A3A58', lighten(C.line, 0.1), 2)); ctx.restore(); }

// neuron: dendrieten links, cellichaam, axon naar rechts; ins = [{w, an, on}] binnenkomende synapsen met + of -
function neuronSom(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { ins = [], som = null, drempel = 3, vuur = 0, t = 0, toonSom = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6FA8'; ctx.lineCap = 'round';
  ins.forEach(({ an, on, w }) => { const L = 226; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(an) * L * 0.5, Math.sin(an) * L * 0.5 + 20, Math.cos(an) * L, Math.sin(an) * L); ctx.stroke();
    if (on > 0.01) { const px = Math.cos(an) * 260, py = Math.sin(an) * 260; const col = w > 0 ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= on; circ(ctx, px, py, 34, rgba(col, 0.3), col, 3); text(ctx, (w > 0 ? '+' : '−') + Math.abs(w), px, py + 14, fTekst(38, 800), col, 'center');
      const u = 0.16 + 0.7 * ((t * 0.8) % 1); circ(ctx, px * (1 - u), py * (1 - u), 8, col); ctx.restore(); } });
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(560, 0); ctx.stroke(); ctx.lineWidth = 8; [[600, -44], [612, 0], [600, 44]].forEach(([ex, ey]) => { ctx.beginPath(); ctx.moveTo(540, 0); ctx.lineTo(ex, ey); ctx.stroke(); circ(ctx, ex, ey, 12, '#7A6FA8', '#A392D6', 2); });
  circ(ctx, 0, 0, 74, '#4A4270', '#A392D6', 3);
  if (toonSom > 0.01 && som != null) { ctx.save(); ctx.globalAlpha *= toonSom; const hgt = 110, fr = clamp(som / 6, 0, 1); roundRect(ctx, -20, -hgt / 2, 40, hgt, 8); shape(ctx, '#2A3446', C.line, 1.5); roundRect(ctx, -20, hgt / 2 - hgt * fr, 40, hgt * fr, 8); shape(ctx, som >= drempel ? C.goud : C.teal, null); const dy = hgt / 2 - hgt * drempel / 6; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(-38, dy); ctx.lineTo(38, dy); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if (vuur > 0.01) { const u = clamp(vuur, 0, 1); circ(ctx, 80 + u * 500, 0, 16, C.goud, '#F2D88A', 2); }
  ctx.restore(); }

// model van McCulloch en Pitts: ingangen (getallen) → gewichten → Σ → drempel → 0/1
function mpModel(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { w = [2, 2, 1, -3], ins = 1, som = 0, uit = 0, uitW = '', drempel = 3 } = o; ctx.save(); ctx.globalAlpha *= a;
  w.forEach((g, i) => { const iy = y + i * 120; const col = g > 0 ? C.groen : C.koraal; ctx.save(); ctx.globalAlpha *= ins; circ(ctx, x, iy, 40, rgba(col, 0.25), col, 3); text(ctx, (g > 0 ? '+' : '−') + Math.abs(g), x, iy + 16, fTekst(40, 800), col, 'center'); pijl(ctx, x + 46, iy, x + 330, y + 180, rgba(col, 0.8), 1, 3, 14); ctx.restore(); });
  ctx.save(); ctx.globalAlpha *= som; circ(ctx, x + 400, y + 180, 70, '#2A3A58', C.text2, 3); text(ctx, 'Σ', x + 400, y + 204, fTitel(70), C.text, 'center'); metaText(ctx, 'OPTELLEN', x + 400, y + 300, C.grain, 'center', 28); pijl(ctx, x + 474, y + 180, x + 590, y + 180, C.line, 1, 3, 14);
  roundRect(ctx, x + 600, y + 120, 170, 120, 16); shape(ctx, '#2A3A58', C.goud, 3); text(ctx, '≥ ' + drempel + ' ?', x + 685, y + 196, fTekst(44, 800), C.goud, 'center'); metaText(ctx, 'DREMPEL', x + 685, y + 300, C.grain, 'center', 28); ctx.restore();
  if (uit > 0.01) { ctx.save(); ctx.globalAlpha *= uit; pijl(ctx, x + 776, y + 180, x + 880, y + 180, C.line, 1, 3, 14); circ(ctx, x + 940, y + 180, 56, rgba(uitW === '1' ? C.goud : C.text2, 0.25), uitW === '1' ? C.goud : C.text2, 3); text(ctx, uitW, x + 940, y + 204, fTitel(64), uitW === '1' ? C.goud : C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// synaps die sterker wordt (blaasjes aan beide kanten) naast een lijn die dikker wordt
function synapsLijn(ctx, x, y, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x, y, 120, 70, 0, 0.3, 2.84, true); shape(ctx, '#4A4270', '#A392D6', 3); ctx.beginPath(); ctx.ellipse(x, y + 190, 140, 70, 0, 3.44, 6.0); shape(ctx, '#4A4270', '#A392D6', 3);
  const n = 4 + Math.round(u * 6); for (let i = 0; i < n; i++) circ(ctx, x - 70 + (i % 5) * 34, y + 14 + Math.floor(i / 5) * 30, 12, C.ves, C.vesR, 1.5);
  const r = 3 + Math.round(u * 4); for (let i = 0; i < r; i++) roundRect(ctx, x - 80 + i * 26, y + 116, 16, 18, 4), shape(ctx, C.teal, null);
  ctx.restore(); }
function gewichtLijn(ctx, x1, y1, x2, y2, g, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = g >= 0 ? col : C.koraal; ctx.lineWidth = 2 + Math.abs(g) * 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }

// perceptron: 3x3 plaatje links, negen verbindingen naar één uitgang; gew = 9 gewichten (−1..1)
const KRUIS = [1, 0, 1, 0, 1, 0, 1, 0, 1], RONDJE = [0, 1, 0, 1, 0, 1, 0, 1, 0], KRUIS2 = [1, 0, 1, 0, 1, 0, 1, 1, 0];
function plaatje9(ctx, x, y, cel, pix, a = 1, col = '#151A22', uit = '#E8E2D8') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 8, y - 8, cel * 3 + 10, cel * 3 + 10, 10); shape(ctx, uit, null); for (let i = 0; i < 9; i++) { const r = Math.floor(i / 3), c = i % 3; roundRect(ctx, x + c * cel, y + r * cel, cel - 6, cel - 6, 6); shape(ctx, pix[i] ? col : uit, '#B8B0A0', 1.5); } ctx.restore(); }
function perceptron(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { pix = KRUIS, gew = [], uit = '', uitCol = C.text, goed = -1, lijnen = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  plaatje9(ctx, x, y, 80, pix); const ox = x + 760, oy = y + 117;
  for (let i = 0; i < 9; i++) { const r = Math.floor(i / 3), c = i % 3; const px = x + c * 80 + 37, py = y + r * 80 + 37; const dy = y - 40 + i * 40; const g = gew[i] || 0; ctx.save(); ctx.globalAlpha *= lijnen * (pix[i] ? 1 : 0.3);
    ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 240, py); ctx.lineTo(x + 320, dy); ctx.stroke(); gewichtLijn(ctx, x + 320, dy, ox - 70, oy, g, 1, C.teal); circ(ctx, x + 320, dy, 9, pix[i] ? C.text : '#3A4458'); ctx.restore(); }
  circ(ctx, ox, oy, 70, '#2A3A58', goed === 1 ? C.groen : goed === 0 ? C.koraal : C.text2, 4); text(ctx, uit, ox, oy + 16, fTekst(36, 800), uitCol, 'center');
  metaText(ctx, 'DIK = STERK · ROOD = REMMEND', x + 320, y + 360, C.grain, 'left', 28);
  ctx.restore(); }

// netwerk in lagen met wat elke laag 'ziet': randjes → vormen → kat
function lagenNetwerk(ctx, x, y, a = 1, k = 3, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kol = [x, x + 400, x + 800, x + 1200];
  plaatje9(ctx, kol[0] - 10, y + 60, 70, [0, 1, 0, 1, 1, 1, 1, 0, 1], 1, C.oker, '#2A3446'); katIcoon(ctx, kol[0] + 95, y + 380, 0.8);
  const tit = ['randjes', 'vormen', 'kat']; for (let i = 1; i <= 3; i++) { const al = clamp(k - i + 1, 0, 1); if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; pijl(ctx, kol[i - 1] + 230, y + 250, kol[i] - 30, y + 250, C.line, 1, 3, 14);
    roundRect(ctx, kol[i], y + 80, 260, 340, 18); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, tit[i - 1], kol[i] + 130, y + 470, fTekst(36, 700), C.text, 'center'); metaText(ctx, 'LAAG ' + i, kol[i] + 130, y + 60, C.grain, 'center', 28);
    ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round';
    if (i === 1) [[0.3, 0.2, 0.7, 0.2], [0.2, 0.4, 0.2, 0.7], [0.4, 0.8, 0.8, 0.55], [0.6, 0.35, 0.85, 0.35]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(kol[i] + a1 * 260, y + 80 + b1 * 340); ctx.lineTo(kol[i] + a2 * 260, y + 80 + b2 * 340); ctx.stroke(); });
    if (i === 2) { ctx.beginPath(); ctx.arc(kol[i] + 90, y + 190, 44, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kol[i] + 150, y + 160); ctx.lineTo(kol[i] + 180, y + 110); ctx.lineTo(kol[i] + 210, y + 160); ctx.stroke(); ctx.beginPath(); ctx.ellipse(kol[i] + 130, y + 330, 70, 40, 0, 0, 6.283); ctx.stroke(); }
    if (i === 3) katIcoon(ctx, kol[i] + 130, y + 290, 1.1, 1, C.teal); ctx.restore(); }
  ctx.restore(); }

// muis in een doolhof (van bovenaf), met een meetnaald op de kop
function doolhof(ctx, x, y, w, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, w * 0.7, 10); shape(ctx, '#2A3446', C.line, 2); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
  [[0.25, 0, 0.25, 0.5], [0.5, 0.2, 0.5, 0.52], [0.75, 0, 0.75, 0.5], [0.5, 0.2, 0.7, 0.2]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(x + a1 * w, y + b1 * w); ctx.lineTo(x + a2 * w, y + b2 * w); ctx.stroke(); });
  const pad = [[0.12, 0.1], [0.12, 0.61], [0.5, 0.61], [0.88, 0.61], [0.88, 0.3]]; const L = pad.length - 1, f = clamp(u, 0, 1) * L, i = Math.min(L - 1, Math.floor(f)), r = f - i; const mx = x + w * (pad[i][0] + (pad[i + 1][0] - pad[i][0]) * r), my = y + w * (pad[i][1] + (pad[i + 1][1] - pad[i][1]) * r);
  circ(ctx, x + w * 0.88, y + w * 0.3, 14, C.oker); ctx.save(); ctx.translate(mx, my); ctx.scale(0.28, 0.28); ctx.fillStyle = '#B8B0A8'; ctx.beginPath(); ctx.ellipse(0, 0, 90, 60, 0, 0, 6.283); ctx.fill(); circ(ctx, 70, 0, 40, '#B8B0A8'); ctx.fillStyle = C.goud; ctx.fillRect(56, -70, 10, 60); ctx.restore(); ctx.restore(); }
// meetnaald met veel meetpunten in een stukje hersenweefsel; actief = punten lichten op
function meetNaald(ctx, x, y, h, a = 1, t = 0, act = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 26; i++) { const px = x + (hash(i + 3) - 0.5) * 360, py = y + hash(i + 9) * h; const on = act > 0 && hash(i * 7 + Math.floor(t * 4)) > 0.7; circ(ctx, px, py, 16, on ? rgba(C.goud, 0.8) : '#4A4270', '#A392D6', 1.5); }
  roundRect(ctx, x - 12, y - 40, 24, h + 40, 6); shape(ctx, '#AFC0D0', '#D8E2EC', 1.5); for (let i = 0; i < 18; i++) { ctx.fillStyle = '#3A4458'; ctx.fillRect(x - 6, y + i * h / 18, 12, 6); } ctx.restore(); }
// rijen pulsjes: elke rij één cel, streepjes = pulsjes (vaste willekeur)
function pulsRijen(ctx, x, y, w, n, a = 1, nu = 1, hlRij = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let r = 0; r < n; r++) { const ry = y + r * 26; ctx.strokeStyle = rgba(C.line, 0.3); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x + w, ry); ctx.stroke(); ctx.strokeStyle = hlRij.includes(r) ? C.goud : C.teal; ctx.lineWidth = 3;
    for (let k = 0; k < 18; k++) { const u = hash(r * 41 + k * 13); if (u > nu) continue; const px = x + u * w; ctx.beginPath(); ctx.moveTo(px, ry + 8); ctx.lineTo(px, ry - 12); ctx.stroke(); } } ctx.restore(); }
// venster met een paar regels code (Python)
function codeVenster(ctx, x, y, w, a = 1, n = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const R = ['pulsjes = laad("muis_dag3")', 'for cel in pulsjes:', '    t = zoek_pulsjes(cel)', '    if samen_actief(t, bocht):', '        groep.append(cel)', 'print(len(groep), "cellen")'];
  roundRect(ctx, x, y, w, 70 + R.length * 50, 14); shape(ctx, '#0E141E', '#6A7080', 2); [C.koraal, C.goud, C.groen].forEach((c, i) => circ(ctx, x + 30 + i * 30, y + 28, 9, c));
  R.slice(0, Math.max(0, Math.floor(n))).forEach((r, i) => text(ctx, r, x + 30, y + 100 + i * 50, fMeta(28), i === 0 ? C.teal : C.text, 'left')); ctx.restore(); }

// robotarm met beker; u 0..1 = arm brengt de beker omhoog
function robotArm(ctx, x, y, s, a = 1, u = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -90, -40, 180, 60, 10); shape(ctx, '#5A6478', '#8A94A8', 2);
  const a1 = -1.2 - u * 0.4, a2 = 1.0 - u * 1.3; const j1 = [Math.cos(a1) * 260, -40 + Math.sin(a1) * 260], j2 = [j1[0] + Math.cos(a1 + a2) * 220, j1[1] + Math.sin(a1 + a2) * 220];
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 36; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(j1[0], j1[1]); ctx.lineTo(j2[0], j2[1]); ctx.stroke(); circ(ctx, 0, -40, 30, '#8A94A8'); circ(ctx, j1[0], j1[1], 26, '#8A94A8');
  roundRect(ctx, j2[0] - 34, j2[1] - 50, 68, 90, 10); shape(ctx, C.koraal, lighten(C.koraal, 0.3), 2); ctx.restore(); }
// chipje met draadjes (klein vierkant met pinnetjes)
function chipje(ctx, x, y, s, a = 1, act = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -40, 80, 80, 8); shape(ctx, '#3A3E46', C.goud, 3); for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) circ(ctx, -24 + i * 16, -24 + k * 16, 4, act > 0 && hash(i * 4 + k + Math.floor(t * 5)) > 0.6 ? C.goud : '#8A8E96'); ctx.restore(); }
// Wat word jij? · Neurowetenschappen · Brein en computer — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Daan, Dr. Kim).
// Rode draad: Daans telefoon die zijn kattenfoto's vindt.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }

// perceptron-training: vaste startgewichten, leerregel w += 0,25·(doel − uit)·x, drempel 0,5 (uitkomst 1 = kruis)
const P_START = [-0.35, 0.36, -0.39, 0.48, -0.06, -0.38, 0.06, 0.48, 0.4];
const P_DATA = (() => { const out = []; const basis = [[KRUIS, 1], [RONDJE, 0]]; for (let i = 0; i < 40; i++) { const [p, d] = basis[i % 2]; const v = p.slice(); if (i > 3) { const idx = d ? [0, 2, 6, 8] : [1, 3, 5, 7]; v[idx[Math.floor(hash(i * 17 + 3) * 4)]] = 0; } out.push([v, d]); } return out; })();
const P_STAPPEN = (() => { let w = P_START.slice(); const st = [{ w: w.slice(), fout: 0 }]; let fout = 0; P_DATA.forEach(([x, d]) => { const s = x.reduce((a, xi, i) => a + xi * w[i], 0); const y = s >= 0.5 ? 1 : 0; if (y !== d) { fout++; w = w.map((wi, i) => wi + 0.25 * (d - y) * x[i]); } st.push({ w: w.slice(), fout, goed: y === d }); }); return st; })();
function pUit(w, x) { return x.reduce((a, xi, i) => a + xi * w[i], 0) >= 0.5 ? 'kruis' : 'rondje'; }
function foutGrafiek(ctx, x, y, w, h, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'PLAATJES', 'FOUTEN PER 10'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath();
  for (let b = 0; b < 4; b++) { if (b * 10 > n) break; let f = 0; for (let i = b * 10 + 1; i <= Math.min(n, b * 10 + 10); i++) if (P_STAPPEN[i] && !P_STAPPEN[i].goed) f++; const px = x + (b + 0.5) * w / 4, py = y + h - f / 6 * h; b ? ctx.lineTo(px, py) : ctx.moveTo(px, py); circ(ctx, px, py, 7, C.koraal); } ctx.stroke(); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { netwerkje(ctx, 1150, 420, 600, 420, 1, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'daan', 340, 880, 540, { t, pose: 'vasthouden', hold: (c, hx, hy) => { c.save(); roundRect(c, hx - 18, hy - 32, 36, 64, 6); shape(c, '#20242E', '#6A7080', 2); c.restore(); } }); naamBij(ctx, 'Daan', 'zoekt zijn kattenfoto\'s', 110, 280, q.on('Daan', 1));
    galerijTelefoon(ctx, 860, 480, 0.95, 1, q.on('typt', 1), t); chip(ctx, 'nooit een naam gegeven', 860, 870, C.text2, q.on('naam', 1), 28);
    netwerkje(ctx, 1200, 260, 560, 420, q.on('programma', 1), t); naamBij(ctx, 'neuraal netwerk', 'naar de neuronen genoemd', 1280, 740, q.on('neuraal', 1)); vraagteken(ctx, 1800, 200, q.on('Leert', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const op = q.on('telt', 1);
    const ins = [{ an: 2.5, w: 2, on: q.on('prikkelen', 1) }, { an: 3.0, w: 2, on: q.on('prikkelen', 1) }, { an: 3.55, w: 1, on: q.on('prikkelen', 1) }, { an: 4.05, w: -1, on: q.on('remmen', 1) }];
    neuronSom(ctx, 760, 480, 1.05, 1, { ins, som: 4 * clamp((t - q.at('telt', 1)) / 2, 0, 1), toonSom: op, drempel: 3, vuur: clamp((t - q.at('vuurt', 1)) / 1.5, 0, 1) * (t < q.at('niet', 1) ? 1 : 0), t });
    naamBij(ctx, 'synapsen', 'duizenden per neuron', 520, 720, q.on('duizenden', 1), 'right'); naamBij(ctx, 'cellichaam', 'telt op', 700, 360, op); chip(ctx, 'boven de drempel: pulsje, altijd even groot', 1380, 300, C.goud, q.on('drempel', 1), 28); chip(ctx, 'eronder: niets', 1380, 380, C.text2, q.on('niet', 1), 28); chip(ctx, 'film: Het kabelnetwerk', 1380, 760, C.teal, q.on('kabelnetwerk', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'MCCULLOCH & PITTS · 1943', 120, 140, C.grain, 'left', 30); const P = q.on('Probeer', 1, 0.6);
    mpModel(ctx, 380, 300, 1, { w: [2, 2, 1, -3], ins: P, som: q.on('optellen', 1), uit: 0, drempel: 3 });
    chip(ctx, 'later: gewichten · plus prikkelt, min remt', 960, 820, C.teal, q.on('Latere', 1) * (1 - P), 28);
    tag(ctx, 'som op of boven de drempel → 1', 1380, 640, C.goud, q.on('uitkomst', 1) * (1 - P), 'center', 30); tag(ctx, 'som onder de drempel → 0', 1380, 720, C.text2, q.on('Eronder', 1) * (1 - P), 'center', 30);
    chip(ctx, 'drempel = 3', 1060, 230, C.goud, q.on('drempel', 3), 30); vraagteken(ctx, 1520, 480, q.on('Vuurt', 1), 110); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); mpModel(ctx, 380, 300, 1, { w: [2, 2, 1, -3], ins: 1, som: 1, uit: q.on('drempel', 1), uitW: '0', drempel: 3 });
    regel(ctx, '2 + 2 + 1 = 5', 1440, 300, q.on('vijf', 1), C.groen, 44, 'left', 700); regel(ctx, '5 − 3 = 2', 1440, 380, q.on('min', 1), C.koraal, 44, 'left', 700); regel(ctx, '2 < 3 → 0', 1440, 460, q.on('drempel', 1), C.goud, 44, 'left', 700);
    tag(ctx, 'alles of niets: geen half pulsje', 960, 760, C.text2, q.on('alles', 1), 'center', 30); tag(ctx, 'echt neuron: ook plek en timing tellen', 960, 840, C.teal, q.on('ingewikkelder', 1), 'center', 28); },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('Rosenblatt', 1, 0.8);
    if (R < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - R; const u = q.on('sterker', 1, 2); synapsLijn(ctx, 520, 360, 1, u); gewichtLijn(ctx, 1000, 460, 1600, 460, 0.1 + 0.8 * u, q.on('gewicht', 1)); regel(ctx, 'synaps sterker', 520, 700, q.on('sterker', 1), C.text, 34, 'center', 700); regel(ctx, 'gewicht groter', 1300, 560, q.on('gewicht', 1), C.teal, 34, 'center', 700); chip(ctx, 'film: Leren en onthouden', 520, 200, C.teal, 1, 28); ctx.restore(); }
    if (R > 0.01) { metaText(ctx, 'ROSENBLATT · 1958 · PERCEPTRON', 120, 140, C.grain, 'left', 30); const pix = q.on('gokt', 1) > 0.5 ? RONDJE : KRUIS; const zegt = q.on('zegt', 2) > 0.5;
      perceptron(ctx, 300, 300, R, { pix, gew: P_START, uit: zegt ? 'kruis' : '', uitCol: C.text, goed: zegt ? (q.on('was', 1) > 0.5 ? 0 : -1) : -1, lijnen: q.on('zwart', 1) });
      chip(ctx, 'boven de drempel: kruis · eronder: rondje', 1320, 760, C.goud, q.on('drempel', 1), 28); chip(ctx, 'gewichten willekeurig', 1320, 840, C.text2, q.on('willekeurig', 1), 28); tag(ctx, 'maar het was een rondje', 1500, 300, C.koraal, q.on('was', 1), 'center', 30); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const L = q.on('tientallen', 1, 0.6), V = q.on('verschoven', 1, 0.6);
    const w1 = P_STAPPEN[2].w, w0 = P_STAPPEN[1].w; const u = q.on('zwakker', 1, 1.2); const w = P_START.map((g, i) => g + (w1[i] - w0[i]) * u);
    if (L < 0.99) { perceptron(ctx, 300, 300, 1 - L, { pix: q.on('Zegt', 2) > 0.5 ? KRUIS : RONDJE, gew: w, uit: '', lijnen: 1 }); chip(ctx, 'kruis bij een rondje → zwakker', 1400, 260, C.koraal, q.on('zwakker', 1) * (1 - L), 28); chip(ctx, 'rondje bij een kruis → sterker', 1400, 340, C.groen, q.on('sterker', 1) * (1 - L), 28); }
    if (L > 0.01) { const n = clamp(Math.floor((t - q.at('tientallen', 1)) * 6), 0, 40); const S = P_STAPPEN[n]; const [pix] = P_DATA[Math.max(0, n - 1)];
      perceptron(ctx, 220, 300, L * (1 - V), { pix, gew: S.w, uit: n ? pUit(S.w, pix) : '', goed: n ? (S.goed ? 1 : 0) : -1 }); foutGrafiek(ctx, 1260, 300, 520, 300, n, L * (1 - V)); regel(ctx, 'plaatje ' + n, 1520, 700, L * (1 - V), C.text2, 30, 'center', 600);
      if (V > 0.01) { perceptron(ctx, 300, 300, V, { pix: KRUIS2, gew: P_STAPPEN[40].w, uit: pUit(P_STAPPEN[40].w, KRUIS2), goed: 1 }); chip(ctx, 'nooit gezien: kruis met een verschoven hokje', 1400, 260, C.goud, V, 28); haak(ctx, 1180, 1700, 640, 'de kennis zit in de gewichten', C.groen, q.on('kennis', 1)); } } },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const k = q.on('eerste', 1) + q.on('volgende', 1) + q.on('oren', 1);
    lagenNetwerk(ctx, 160, 220, 1, k, t); chip(ctx, 'niet ingeprogrammeerd: ontstaat tijdens het leren', 960, 160, C.goud, q.on('ingeprogrammeerd', 1), 28); chip(ctx, 'Hubel en Wiesel: visuele schors, eerst randjes', 960, 840, C.teal, q.on('Hubel', 1), 28); },

  s12(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'kind', 480, 880, 320, { t, uit: 'blij' }); naamBij(ctx, 'een kind', '', 560, 560, q.on('kind', 1)); netwerkje(ctx, 1100, 300, 560, 380, q.on('netwerk', 1), t); naamBij(ctx, 'netwerk', 'leert vanaf nul', 1200, 760, q.on('netwerk', 1)); vraagteken(ctx, 960, 480, q.on('voorbeelden', 1), 120); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const E = q.on('Eerlijk', 1, 0.8);
    persoon(ctx, 'kind', 360, 880, 320, { t, uit: 'blij' }); stippen(ctx, 560, 520, 3, 3, C.groen, q.on('paar', 1), 3, 18, 50); regel(ctx, 'een paar keer', 610, 600, q.on('paar', 1), C.groen, 30, 'center', 700);
    ctx.save(); ctx.globalAlpha *= q.on('duizend', 1); for (let i = 0; i < 400; i++) circ(ctx, 1050 + (i % 25) * 28, 280 + Math.floor(i / 25) * 26, 6, rgba(C.teal, 0.8)); ctx.restore(); regel(ctx, '± duizend foto\'s per soort · ruim een miljoen totaal', 1400, 740, q.on('miljoen', 1), C.teal, 30, 'center', 700);
    tag(ctx, 'maar: een kind begint niet bij nul', 960, 820, C.goud, E, 'center', 30); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('derde', 1, 0.6);
    vergKaart(ctx, 160, 260, 760, 260, 'hersenen', ['± 20 watt', 'minder dan een laptop'], C.groen, q.on('twintig', 1)); vergKaart(ctx, 1000, 260, 760, 260, 'groot AI-model trainen', ['duizenden chips tegelijk', 'honderdduizenden keren zoveel'], C.koraal, q.on('chips', 1));
    regel(ctx, 'energie', 960, 200, 1 - F, C.text2, 30, 'center', 700); ctx.save(); ctx.globalAlpha *= F; ctx.fillStyle = C.bgSchema; ctx.fillRect(140, 180, 1640, 380); ctx.restore();
    if (F > 0.01) { vergKaart(ctx, 160, 260, 760, 260, 'fout terug', ['door alle lagen uitgerekend', 'hersenen: nog onbekend'], C.paars, F); vergKaart(ctx, 1000, 260, 760, 260, 'signalen', ['neuronen: pulsjes op tijd', 'netwerk: getallen'], C.teal, q.on('pulsjes', 1)); spikeSpoor(ctx, 1080, 680, 600, [0.1, 0.18, 0.45, 0.5, 0.62, 0.9], q.on('pulsjes', 1), 1); } },

  // ---------- H4 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('programmeren', 1, 0.6);
    doolhof(ctx, 140, 190, 520, 1, clamp(t / 20, 0, 1)); metaA(ctx, 'MUIS IN EEN DOOLHOF', 400, 170, 1, C.grain, 'center', 26);
    meetNaald(ctx, 900, 230, 360, q.on('naald', 1), t, 1); chip(ctx, 'honderden neuronen · 30.000 keer per seconde', 1040, 640, C.goud, q.on('dertigduizend', 1), 26);
    pulsRijen(ctx, 1240, 230, 560, 14, q.on('uur', 1), 1, q.on('samen', 1) > 0.5 ? [2, 5, 9] : []); metaA(ctx, 'ELKE RIJ = ÉÉN CEL', 1520, 200, q.on('uur', 1), C.grain, 'center', 26);
    ctx.save(); ctx.translate(140, 610); ctx.scale(0.66, 0.66); codeVenster(ctx, 0, 0, 900, P, clamp((t - q.at('programmeren', 1)) * 1.5, 0, 6)); ctx.restore();
    persoon(ctx, 'kim', 1440, 880, 270, { t, a: q.on('Kim', 1), kijk: -1 }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1140, 760, q.on('Kim', 1)); persoon(ctx, 'daan', 1680, 880, 240, { t, a: q.on('Daan', 1), kijk: -1 }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); brein(ctx, 640, 480, 1.1, 1); chipje(ctx, 600, 330, 0.9, q.on('chipje', 1), t, 1); naamBij(ctx, 'bewegingsschors', 'stuurt bewegingen', 700, 230, q.on('bewegingen', 1)); chip(ctx, 'bijna 100 meetpuntjes · tientallen cellen', 640, 780, C.goud, q.on('meetpuntjes', 1), 28);
    robotArm(ctx, 1460, 760, 0.8, q.on('andere', 1), 0); chip(ctx, 'van hersenen naar apparaat', 1460, 200, C.teal, q.on('apparaat', 1), 28); vraagteken(ctx, 1100, 480, q.on('beweging', 2), 110); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const R = q.on('robotarm', 1, 0.6);
    pulsRijen(ctx, 160, 300, 640, 10, 1, 1, []); pijl(ctx, 830, 420, 960, 420, C.line, q.on('leert', 1), 3, 14); vergKaart(ctx, 980, 300, 520, 240, 'programma', ['patroon → beweging', 'met gewichten'], C.teal, q.on('patroon', 1));
    robotArm(ctx, 1640, 800, 0.7, R, clamp((t - q.at('robotarm', 1)) / 3, 0, 1)); chip(ctx, 'in het jaar 2011: zelf koffie drinken', 1300, 700, C.goud, q.on('koffie', 1), 28); chip(ctx, 'nog experimenteel', 1300, 780, C.text2, q.on('experimenteel', 1), 28); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); galerijTelefoon(ctx, 300, 470, 0.8, 1, 1, t); vergKaart(ctx, 560, 230, 560, 300, 'gebruikt', ['neuron als rekensom', 'lagen', 'gewichten aanpassen'], C.groen, q.on('Deels', 1)); vergKaart(ctx, 1180, 230, 600, 300, 'maar anders', ['vanaf nul: veel meer voorbeelden', 'veel meer energie', 'fout precies terugrekenen'], C.koraal, q.on('Maar', 1)); },
  s21(ctx, t, q) { bg(ctx, 'schema'); vergKaart(ctx, 240, 220, 680, 200, 'modellen', ['om de hersenen te begrijpen'], C.paars, q.on('Modellen', 1)); vergKaart(ctx, 1000, 220, 680, 200, 'programmeren', ['om metingen te lezen'], C.teal, q.on('programmeren', 1));
    ['biologie', 'psychologie', 'natuurkunde', 'informatica', 'kunstmatige intelligentie'].forEach((s2, i) => { tag(ctx, s2, 260 + i * 350, 560, C.teal, q.on(s2.split(' ')[0], 1), 'center', 28); pijl(ctx, 260 + i * 350, 590, 960 + (i - 2) * 60, 690, C.line, q.on('master', 1), 2.5, 12); }); tag(ctx, 'master neurowetenschappen', 960, 760, C.goud, q.on('master', 1), 'center', 34); }
});
