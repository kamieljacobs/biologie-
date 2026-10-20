
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
// Wat word jij? · Neurowetenschappen 3 · Als hersencellen uitvallen — eigen tekeningen (20 okt 2026)

// pillendoosje met vakjes (ochtend, middag, avond)
function pillenDoos(ctx, x, y, s, a = 1, n = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -180, -60, 360, 120, 16); shape(ctx, '#5BA4C9', '#8CC4E0', 2);
  for (let i = 0; i < 3; i++) { roundRect(ctx, -165 + i * 115, -45, 100, 90, 10); shape(ctx, '#2C5E7E', null); if (i < n) { ctx.beginPath(); ctx.ellipse(-115 + i * 115, 0, 26, 14, 0.4, 0, 6.283); shape(ctx, '#F2EEE4', '#B8B0A0', 2); } } ctx.restore(); }

// trillende hand (rusttremor): klein handje met trillijntjes
function trilHand(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = Math.sin(t * 30) * 4; ctx.translate(x + d, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 50, 40, 0, 0, 6.283); shape(ctx, '#E3B998', null); for (let i = 0; i < 4; i++) { roundRect(ctx, 30, -32 + i * 17, 54, 14, 7); shape(ctx, '#E3B998', null); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.lineCap = 'round'; [-1, 1].forEach(k => { for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.arc(10, 0, 72 + i * 16, k > 0 ? -0.5 : 2.64, k > 0 ? 0.5 : 3.64); ctx.stroke(); } }); ctx.restore(); }

// grafiek: dopamine in de hersenen na pillen (drie pillen), vroeg (vlak, gebufferd) of laat (pieken en dalen) — curve uit een simpel model
function dopaKurve(tt, buffer) { // tt in uren (0..12); pillen op 0, 4, 8; levodopa in bloed: halfwaardetijd 1,5 uur
  let bloed = 0; [0, 4, 8].forEach(p => { if (tt >= p) { const dt = tt - p; bloed += (1 - Math.exp(-dt / 0.35)) * Math.pow(0.5, dt / 1.5); } });
  // buffer: met veel cellen volgt dopamine een traag gemiddelde, met weinig cellen het bloed
  let gem = 0, n = 0; for (let k = 0; k <= 30; k++) { const s = tt - k * 0.2; if (s < 0) break; let b = 0; [0, 4, 8].forEach(p => { if (s >= p) { const dt = s - p; b += (1 - Math.exp(-dt / 0.35)) * Math.pow(0.5, dt / 1.5); } }); gem += b; n++; }
  gem = n ? gem / n : 0; return buffer * (0.35 + gem * 0.6) + (1 - buffer) * (0.05 + bloed * 1.25); }
function dopaGrafiek(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { buffer = 1, u = 1, banden = 1, col = C.teal, label = '' } = o; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'TIJD (UREN)', 'DOPAMINE');
  if (banden > 0.01) { ctx.save(); ctx.globalAlpha *= banden; ctx.fillStyle = rgba(C.koraal, 0.14); ctx.fillRect(x + 2, y, w - 2, h * 0.18); ctx.fillStyle = rgba(C.teal, 0.12); ctx.fillRect(x + 2, y + h * 0.62, w - 2, h * 0.38 - 2); metaText(ctx, 'TE VEEL: OVERBEWEGELIJK', x + w - 10, y + 34, C.koraal, 'right', 26); metaText(ctx, 'TE WEINIG: STIJF', x + w - 10, y + h - 14, C.teal, 'right', 26); ctx.restore(); }
  [0, 4, 8].forEach(p => { const px = x + p / 12 * w; ctx.beginPath(); ctx.ellipse(px, y + h + 30, 16, 9, 0.4, 0, 6.283); shape(ctx, '#F2EEE4', '#B8B0A0', 2); });
  ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const N = 120; for (let i = 0; i <= N * u; i++) { const tt = i / N * 12; const v = clamp(dopaKurve(tt, buffer), 0, 1); const px = x + i / N * w, py = y + h - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  if (label) text(ctx, label, x + 20, y - 40, fTekst(34, 700), col, 'left'); ctx.restore(); }

// doorsnede van de hersenen (vooraanzicht, schematisch) met zwarte stof en kernen voor beweging
function breinDoorsnede(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { zs = 0, str = 0, banen = 0, over = 1, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -230); ctx.bezierCurveTo(200, -240, 300, -120, 290, 20); ctx.bezierCurveTo(280, 140, 170, 190, 60, 170); ctx.lineTo(40, 300); ctx.lineTo(-40, 300); ctx.lineTo(-60, 170); ctx.bezierCurveTo(-170, 190, -280, 140, -290, 20); ctx.bezierCurveTo(-300, -120, -200, -240, 0, -230); ctx.closePath(); shape(ctx, '#3A3550', '#8C7BBF', 2.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -230); ctx.lineTo(0, 40); ctx.stroke();
  [[-1], [1]].forEach(([k]) => { if (str > 0.01) { ctx.save(); ctx.globalAlpha *= str; ctx.beginPath(); ctx.ellipse(k * 110, -20, 56, 80, k * 0.2, 0, 6.283); shape(ctx, rgba(C.teal, 0.45), C.teal, 2.5); ctx.restore(); }
    if (zs > 0.01) { ctx.save(); ctx.globalAlpha *= zs; ctx.beginPath(); ctx.ellipse(k * 50, 150, 40, 16, k * 0.35, 0, 6.283); shape(ctx, '#20182A', C.goud, 2.5);
      const nc = 6; for (let i = 0; i < nc; i++) { const alive = i / nc < over; circ(ctx, k * (30 + i * 8), 146 + (i % 2) * 8, 6, alive ? C.goud : '#5A5468'); } ctx.restore(); }
    if (banen > 0.01) { ctx.save(); ctx.globalAlpha *= banen * Math.max(0.15, over); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(k * 50, 140); ctx.quadraticCurveTo(k * 110, 90, k * 110, 30); ctx.stroke(); ctx.restore(); } });
  ctx.restore(); }

// dopaminecel (uiteinde) met opgeslagen blaasjes; vol 0..1
function dopaUiteinde(ctx, x, y, s, a = 1, vol = 1, t = 0, levodopa = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -40, 100, 80, 0, 0, 6.283); shape(ctx, '#4A4270', '#A392D6', 3);
  const n = Math.round(vol * 9); for (let i = 0; i < n; i++) circ(ctx, -60 + (i % 5) * 30, -70 + Math.floor(i / 5) * 34, 13, C.ves, C.vesR, 1.5);
  if (levodopa > 0.01) { for (let i = 0; i < 5; i++) { const u = ((t * 0.5 + i / 5) % 1); circ(ctx, -170 + u * 120, -150 + i * 30 + u * 60, 8, rgba(C.oker, levodopa)); } }
  ctx.restore(); }

// neuronen met synapsen; plak 0..1 = plakkaten (amyloïd) ertussen, tau 0..1 = kluwens erin, verlies 0..1 = synapsen weg
function neuronenRij(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { plak = 0, tau = 0, verlies = 0, dood = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  const P = [[x, y], [x + 360, y + 60], [x + 720, y - 20], [x + 1080, y + 40]];
  for (let i = 0; i < P.length - 1; i++) { const [x1, y1] = P[i], [x2, y2] = P[i + 1]; const weg = hash(i + 4) < verlies; ctx.save(); ctx.globalAlpha *= weg ? 0.18 : 1; ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 60, y1); ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 70, x2 - 70, y2); ctx.stroke(); circ(ctx, x2 - 66, y2, 13, C.ves, C.vesR, 2); ctx.restore(); }
  P.forEach(([px, py], i) => { const d = i === 2 ? dood : 0; ctx.save(); ctx.globalAlpha *= 1 - d * 0.8; circ(ctx, px, py, 56, '#4A4270', '#A392D6', 3); ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 6; [[-1.2, 90], [1.9, 80], [2.6, 70], [-2.2, 80]].forEach(([an, l]) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * l, py + Math.sin(an) * l); ctx.stroke(); }); circ(ctx, px, py, 56, '#4A4270', '#A392D6', 3);
    if (tau > 0.01) { ctx.save(); ctx.globalAlpha *= tau; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k < 14; k++) { const an = k * 2.4, r = 10 + (k % 5) * 6; ctx.lineTo(px + Math.cos(an) * r, py + Math.sin(an) * r); } ctx.stroke(); ctx.restore(); } ctx.restore(); });
  if (plak > 0.01) { ctx.save(); ctx.globalAlpha *= plak; [[x + 180, y + 120], [x + 560, y + 150], [x + 900, y + 140], [x + 520, y - 110]].forEach(([px, py], i) => { ctx.beginPath(); for (let k = 0; k <= 12; k++) { const an = k / 12 * 6.283, r = 44 + 12 * Math.sin(k * 2.3 + i); ctx.lineTo(px + Math.cos(an) * r, py + Math.sin(an) * r * 0.7); } ctx.closePath(); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); }); ctx.restore(); }
  ctx.restore(); }

// zijaanzicht van het brein met de hippocampus (diep in de slaapkwab) en de schors
function breinHippo(ctx, x, y, s, a = 1, hip = 0, schors = 0, t = 0, col = C.koraal) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (schors > 0.01) { ctx.save(); ctx.globalAlpha *= schors; [[-180, -120], [-20, -170], [150, -110], [-120, 10]].forEach(([dx, dy]) => circ(ctx, x + dx * s, y + dy * s, 26 * s, rgba(C.teal, 0.6), C.teal, 2)); ctx.restore(); }
  if (hip > 0.01) { ctx.save(); ctx.globalAlpha *= hip; ctx.strokeStyle = col; ctx.lineWidth = 22 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 40 * s, y + 70 * s); ctx.quadraticCurveTo(x + 60 * s, y + 100 * s, x + 110 * s, y + 40 * s); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }

// weegschaal prikkelen (koraal) tegen remmen (teal); kant > 0 = prikkelen zwaarder
function weegschaal(ctx, x, y, s, a = 1, kant = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const an = clamp(kant, -1, 1) * 0.3;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(-60, 200); ctx.lineTo(60, 200); ctx.lineTo(0, 120); ctx.closePath(); ctx.fill(); ctx.fillRect(-8, -10, 16, 140);
  ctx.save(); ctx.rotate(an); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-260, -14, 520, 14); ctx.restore();
  [[-1, C.koraal, 'prikkelen', 'GLUTAMAAT'], [1, C.teal, 'remmen', 'GABA']].forEach(([k, col, n, m]) => { const px = k * 240 * Math.cos(an), py = k * 240 * Math.sin(an); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 80); ctx.stroke(); roundRect(ctx, px - 110, py + 80, 220, 90, 14); shape(ctx, rgba(col, 0.3), col, 3); text(ctx, n, px, py + 124, fTekst(34, 700), C.text, 'center'); metaText(ctx, m, px, py + 158, col, 'center', 24); });
  ctx.restore(); }

// netwerk van cellen; sync 0..1 = alle cellen tegelijk aan (aanval), anders af en toe één
function celNetwerk(ctx, x, y, w, h, a = 1, t = 0, sync = 0, plek = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = 22; const P = Array.from({ length: N }, (_, i) => [x + hash(i + 1) * w, y + hash(i + 50) * h]);
  ctx.strokeStyle = rgba(C.line, 0.3); ctx.lineWidth = 2; P.forEach((p, i) => { const q2 = P[(i * 7 + 3) % N]; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke(); });
  P.forEach(([px, py], i) => { const inPlek = Math.hypot(px - (x + w * 0.3), py - (y + h * 0.4)) < plek * w; const flits = hash(i * 13 + Math.floor(t * 3)) > 0.82; const synk = inPlek && sync > 0.5; const on = synk || (!sync && flits); circ(ctx, px, py, 16, on ? (synk ? C.koraal : C.goud) : '#4A4270', '#A392D6', 2); });
  ctx.restore(); }

// haarvat in de hersenen in doorsnede: wandcellen die strak aansluiten; stofjes die wel of niet doorkomen
function hersenHaarvat(ctx, x, y, w, a = 1, t = 0, poging = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 260;
  roundRect(ctx, x, y, w, h, 40); shape(ctx, rgba(C.koraal, 0.12), null);
  for (let i = 0; i < 6; i++) { [y - 10, y + h - 30].forEach(py => { roundRect(ctx, x + i * w / 6, py, w / 6 - 4, 40, 10); shape(ctx, '#C98A7A', '#E8B4A4', 2); }); if (i) [y + 10, y + h - 10].forEach(py => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + i * w / 6 - 2, py - 18); ctx.lineTo(x + i * w / 6 - 2, py + 18); ctx.stroke(); }); }
  for (let i = 0; i < 8; i++) { const u = ((t * 0.12 + hash(i + 3)) % 1); const px = x + 40 + u * (w - 80), py = y + 60 + hash(i + 21) * (h - 120); const klein = i < 2; const tegen = poging > 0.01 && !klein && i < 6; const dy = tegen ? -Math.abs(Math.sin(t * 3 + i)) * 26 * poging : 0;
    if (klein) circ(ctx, px, py, 10, C.teal, '#BFE3F0', 2); else { roundRect(ctx, px - 22, py - 14 + dy, 44, 28, 8); shape(ctx, C.oker, '#E0C27A', 2); } }
  ctx.restore(); }

// stapel geteste middelen: n kaartjes, waarvan k met een vinkje
function middelenStapel(ctx, x, y, a = 1, u = 1, n = 40) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const m = Math.floor(n * u); for (let i = 0; i < m; i++) { const r = Math.floor(i / 10), c = i % 10; const px = x + c * 62, py = y + r * 70; roundRect(ctx, px, py, 52, 58, 8); shape(ctx, '#2A3A58', rgba(C.line, 0.5), 1.5); if (i === 23) vink_(ctx, px + 26, py + 28, 12, 1); else kruis(ctx, px + 26, py + 28, 12, 1, rgba(C.koraal, 0.9)); } ctx.restore(); }

// diepe hersenstimulatie bij een castpersonage: hersenen in het hoofd, elektrode diep, draad naar een kastje onder het sleutelbeen
function dbsPersoon(ctx, id, x, y, h, a = 1, u = 1, t = 0) { if (a <= 0.01) return; const A = persoon(ctx, id, x, y, h, { a, t }); if (!A || !A.hoofd) return; const { x: hx, y: hy, r } = A.hoofd; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.arc(hx, hy - r * 0.15, r * 0.82, 0, 6.283); ctx.clip(); brein(ctx, hx, hy - r * 0.05, r / 330, 0.85); ctx.restore();
  if (u > 0.01) { ctx.globalAlpha *= u; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx - r * 0.1, hy - r * 0.95); ctx.lineTo(hx - r * 0.02, hy + r * 0.15); ctx.stroke(); circ(ctx, hx - r * 0.02, hy + r * 0.18, 5, C.goud); if (Math.sin(t * 8) > 0) circ(ctx, hx - r * 0.02, hy + r * 0.18, 12, null, rgba(C.goud, 0.7), 2);
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(hx - r * 0.1, hy - r * 0.95); ctx.bezierCurveTo(hx - r * 1.3, hy - r * 0.9, hx - r * 1.2, hy + r * 1.2, hx - r * 0.6, hy + r * 2.6); ctx.stroke(); roundRect(ctx, hx - r * 0.95, hy + r * 2.6, r * 0.75, r * 0.5, 6); shape(ctx, '#8A94A8', '#C9CED6', 2); }
  ctx.restore(); }
// hoofd en borst van opzij (schematisch, geen persoon): elektrode diep in de hersenen, draad naar een kastje onder de huid
function dbsSchema(ctx, x, y, s, a = 1, u = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 260); ctx.lineTo(-60, 180); ctx.bezierCurveTo(-200, 170, -240, 40, -220, -60); ctx.bezierCurveTo(-200, -220, 160, -240, 200, -60); ctx.bezierCurveTo(220, 60, 160, 170, 70, 180); ctx.lineTo(70, 260); ctx.lineTo(300, 300); ctx.lineTo(300, 560); ctx.lineTo(-300, 560); ctx.lineTo(-300, 300); ctx.closePath(); shape(ctx, '#2C3A52', rgba(C.line, 0.6), 2);
  brein(ctx, -10, -40, 0.55, 1);
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-20, -200); ctx.lineTo(-10, 20); ctx.stroke(); circ(ctx, -10, 24, 10, C.goud, null); if (Math.sin(t * 8) > 0) circ(ctx, -10, 24, 22, null, rgba(C.goud, 0.6), 3);
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, -200); ctx.bezierCurveTo(-120, -220, -230, -100, -210, 80); ctx.bezierCurveTo(-200, 260, -160, 330, -140, 380); ctx.stroke(); roundRect(ctx, -190, 380, 110, 80, 18); shape(ctx, '#8A94A8', '#C9CED6', 2); ctx.restore(); }
  ctx.restore(); }
// Wat word jij? · Neurowetenschappen · Als hersencellen uitvallen — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk, Noor, Dr. Kim).
// Rode draad: Opa Henks pil die steeds korter werkt.

function tuin(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2F4A3A'; ctx.fillRect(0, 760, W, 140); for (let i = 0; i < 7; i++) { const x = 980 + i * 130; ctx.strokeStyle = '#5FA86E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, 780); ctx.lineTo(x, 700); ctx.stroke(); bloemMotief(ctx, x, 690, 26, [C.koraal, C.goud, C.paars][i % 3], 1, 0); } ctx.restore(); }
function bloemMotief(ctx, x, y, r, col, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 6; i++) { const an = i * 1.047 + t * 0.2; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * r * 0.6, y + Math.sin(an) * r * 0.6, r * 0.45, r * 0.22, an, 0, 6.283); ctx.fillStyle = rgba(col, 0.8); ctx.fill(); } circ(ctx, x, y, r * 0.25, C.goud); ctx.restore(); }
function muisje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-110, 20); ctx.bezierCurveTo(-180, 30, -200, -20, -250, 0); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 120, 66, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5); circ(ctx, 110, -20, 46, '#B8B0A8'); circ(ctx, 92, -66, 24, '#D8B0B0', '#B8B0A8', 3); circ(ctx, 130, -28, 6, '#121A26'); circ(ctx, 156, -12, 7, '#D8909A'); ctx.restore(); }
function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function herinnering(ctx, x, y, titel, sub, ok, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 420, 150, 16); shape(ctx, rgba(ok ? C.groen : C.koraal, 0.14), ok ? C.groen : C.koraal, 2); text(ctx, titel, x + 30, y + 62, fTekst(36, 700), C.text, 'left'); text(ctx, sub, x + 30, y + 110, fTekst(28, 600), C.text2, 'left'); ctx.restore(); if (ok) vink_(ctx, x + 370, y + 75, 26, a); else kruis(ctx, x + 370, y + 75, 24, a); }

Object.assign(SCENES, {
  title(ctx, t) { breinDoorsnede(ctx, 1560, 560, 0.8, 1, { zs: 1, str: 1, banen: 1, over: 0.45, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('jaar', 1, 0.8);
    tuin(ctx, 1 - G); persoon(ctx, 'henk', 400, 880, 560, { t, uit: q.on('stijf', 1) > 0.5 ? 'bezorgd' : (q.on('tuinieren', 1) > 0.5 ? 'blij' : 'neutraal') }); naamBij(ctx, 'Opa Henk', 'ziekte van Parkinson', 560, 300, q.on('Henk', 1) * (1 - G));
    trilHand(ctx, 760, 460, 0.9, q.on('trilt', 1) * (1 - G), t); chip(ctx, 'trilt in rust · kleine stapjes', 820, 600, C.goud, q.on('stapjes', 1) * (1 - G), 28);
    pillenDoos(ctx, 1360, 300, 1, q.on('levodopa', 1) * (1 - G), Math.round(q.on('drie', 1) * 3)); chip(ctx, 'levodopa', 1360, 210, C.oker, q.on('levodopa', 1) * (1 - G), 30); chip(ctx, 'eerste jaren: werkt goed', 1360, 460, C.groen, q.on('eerste', 1) * (1 - G), 30);
    if (G > 0.01) { dopaGrafiek(ctx, 900, 230, 860, 420, G, { buffer: 0.12, u: clamp((t - q.at('jaar', 1)) / 3, 0, 1), banden: q.on('stijf', 1), col: C.koraal, label: 'na een paar jaar' }); chip(ctx, 'effect al weg vóór de volgende pil', 1330, 790, C.koraal, q.on('volgende', 1), 28); }
    vraagteken(ctx, 1820, 160, q.on('korter', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const af = 1 - 0.55 * q.on('sterven', 1, 3);
    breinDoorsnede(ctx, 700, 470, 1.05, 1, { zs: q.on('zwarte', 1), str: q.on('uitlopers', 1), banen: q.on('uitlopers', 1), over: af, t }); naamBij(ctx, 'zwarte stof', 'maakt dopamine', 790, 650, q.on('zwarte', 1)); naamBij(ctx, 'basale kernen', 'bewegingen starten', 960, 330, q.on('uitlopers', 1));
    chip(ctx, 'pas klachten bij ± de helft weg', 1500, 470, C.koraal, q.on('helft', 1), 30); chip(ctx, 'eiwitten klonteren samen', 1500, 550, C.oker, q.on('klonteren', 1), 30); chip(ctx, 'ouderdom · erfelijkheid · sommige gifstoffen', 1500, 630, C.text2, q.on('Ouderdom', 1), 28); chip(ctx, 'oorzaak: niet precies bekend', 1500, 710, C.text2, q.on('precies', 1), 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Later', 1, 0.8);
    chip(ctx, 'film: Knoeien met de synaps', 360, 150, C.teal, q.on('Knoeien', 1), 28); chip(ctx, 'gewenning? niet de hoofdoorzaak', 360, 230, C.koraal, q.on('wennen', 1), 28);
    dopaUiteinde(ctx, 360, 640, 1.1, 1, 1 - L * 0.85, t, q.on('levodopa', 1)); naamBij(ctx, 'uiteinde dopaminecel', 'blaasjes = opslag', 470, 820, q.on('blaasjes', 1));
    chip(ctx, 'halfwaardetijd in bloed ± 1,5 uur', 1260, 150, C.oker, q.on('anderhalf', 1), 28);
    dopaGrafiek(ctx, 820, 260, 900, 360, q.on('begin', 1) * (1 - L), { buffer: 0.95, u: 1, banden: 1, col: C.teal, label: 'veel cellen: rustig' });
    dopaGrafiek(ctx, 820, 260, 900, 360, L, { buffer: 0.1, u: clamp((t - q.at('Later', 1)) / 3, 0, 1), banden: 1, col: C.koraal, label: 'weinig cellen: op en neer' });
    haak(ctx, 820, 1720, 760, 'het verschil zit in de cellen die overblijven', C.groen, q.on('overblijven', 1)); },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vrouw', 1, 0.8);
    regel(ctx, 'Alzheimer: meest voorkomende vorm van dementie', 960, 160, 1 - V, C.text, 40, 'center', 700);
    neuronenRij(ctx, 420, 470, 1 - V, { plak: q.on('plakkaten', 1), tau: q.on('tau', 1), verlies: q.on('synapsen', 1, 2) * 0.6, dood: q.on('hele', 1, 2) }); naamBij(ctx, 'amyloïd', 'plakkaten tussen cellen', 700, 680, q.on('amyloïd', 1) * (1 - V)); naamBij(ctx, 'tau', 'kluwens in cellen', 1160, 330, q.on('tau', 1) * (1 - V));
    herinnering(ctx, 300, 330, 'trouwdag', 'vijftig jaar geleden', true, V * q.on('trouwdag', 1)); herinnering(ctx, 1200, 330, 'ontbijt', 'vanochtend', false, V * q.on('vanochtend', 1)); vraagteken(ctx, 960, 640, q.on('kan', 1) * V, 120); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const M = q.on('medicijnen', 1, 0.8);
    breinHippo(ctx, 700, 500, 1.05, 1 - M, q.on('hippocampus', 1), q.on('schors', 1) * (1 - 0.8 * q.on('verloren', 1, 1.5)), t, C.koraal); naamBij(ctx, 'hippocampus', 'nieuwe herinneringen vastleggen', 600, 660, q.on('hippocampus', 1) * (1 - M)); chip(ctx, 'film: Leren en onthouden', 1500, 200, C.teal, q.on('Leren', 1) * (1 - M), 28);
    chip(ctx, 'oude herinneringen: verspreid in de schors', 1500, 400, C.teal, q.on('verspreid', 1) * (1 - M), 28); chip(ctx, 'later: ook die gaan verloren', 1500, 480, C.koraal, q.on('verloren', 1) * (1 - M), 28);
    if (M > 0.01) { neuronenRij(ctx, 420, 330, M, { plak: 1 - q.on('meeste', 1, 1.5) * 0.85, tau: 1, verlies: 0.3 }); balk(ctx, 560, 620, 800, 1, C.text2, 'zonder medicijn: achteruitgang', M * q.on('kwart', 1)); balk(ctx, 560, 730, 800, 0.75, C.groen, 'met medicijn: ± een kwart langzamer', M * q.on('kwart', 1)); tag(ctx, 'klonten het hele verhaal?', 960, 850, C.goud, q.on('twijfelen', 1), 'center', 30); } },

  // ---------- H3 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('allemaal', 1, 0.6), E = q.on('EEG', 1, 0.6);
    chip(ctx, 'geen afsterven: evenwicht dat zoekraakt', 960, 150, C.goud, q.on('evenwicht', 1), 30);
    weegschaal(ctx, 480, 330, 0.9, 1, -0.9 * q.on('zoek', 1));
    celNetwerk(ctx, 1000, 260, 760, 380, 1, t, N, 0.2 + 0.9 * q.on('Breidt', 1)); tag(ctx, 'groep cellen tegelijk: aanval', 1380, 700, C.koraal, N, 'center', 30);
    golf(ctx, 200, 700, 700, 26, E, { t, piek: 0, col: C.teal, freq: 3 }); metaA(ctx, 'EEG · FILM: KIJKEN IN EEN DENKEND BREIN', 200, 640, E, C.grain, 'left', 26);
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 700; i += 3) { const ph = (i / 700 * 6) % 1; const k = hash(Math.floor(i / 700 * 6) + 5); const v = ph < 0.12 ? -70 * (0.7 + 0.3 * k) * Math.sin(ph / 0.12 * 3.14) : 45 * (0.6 + 0.4 * k) * Math.sin((ph - 0.12) / 0.88 * 3.14); i ? ctx.lineTo(200 + i, 820 - v * 0.8) : ctx.moveTo(200 + i, 820 - v * 0.8); } ctx.stroke(); ctx.restore();
      metaA(ctx, 'NORMAAL', 920, 706, E, C.teal, 'left', 24); metaA(ctx, 'AANVAL', 920, 826, E, C.koraal, 'left', 24); }
    chip(ctx, 'litteken: soms, vaak niet', 1380, 790, C.text2, q.on('litteken', 1), 28); vraagteken(ctx, 1780, 600, q.on('medicijn', 1), 100); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const C2 = q.on('chirurg', 1, 0.8);
    weegschaal(ctx, 560, 300, 0.95, 1 - C2, -0.9 + 0.9 * q.on('rem', 1, 1.5)); chip(ctx, 'moeilijker snel achter elkaar vuren', 360, 580, C.koraal, q.on('moeilijker', 1) * (1 - C2), 28); chip(ctx, 'rem versterken', 800, 640, C.teal, q.on('rem', 1) * (1 - C2), 28);
    stippen(ctx, 1240, 330, 3, 2, C.groen, q.on('twee', 1) * (1 - C2), 3, 40, 110); regel(ctx, '± 2 op 3: geen aanvallen meer', 1350, 460, q.on('twee', 1) * (1 - C2), C.groen, 32, 'center', 700);
    if (C2 > 0.01) { breinHippo(ctx, 900, 520, 1.1, C2, q.on('plek', 1), 0, t, C.koraal); chip(ctx, 'steeds dezelfde plek → soms weghalen', 960, 200, C.goud, C2, 30); chip(ctx, 'film: Leren en onthouden', 960, 820, C.teal, q.on('Leren', 1), 28); } },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'reden 1: de bloed-hersenbarrière', 120, 150, q.on('reden', 1), C.goud, 40, 'left', 700);
    hersenHaarvat(ctx, 260, 300, 1400, 1, t, q.on('meeste', 1)); naamBij(ctx, 'wandcellen sluiten strak aan', 'haarvat in de hersenen', 300, 640, q.on('strak', 1));
    chip(ctx, 'beschermt tegen gif', 700, 760, C.groen, q.on('gif', 1), 30); chip(ctx, '… en tegen de meeste medicijnen', 1150, 760, C.koraal, q.on('medicijnen', 2), 30); chip(ctx, 'levodopa: mee met een transporteiwit', 960, 840, C.teal, q.on('transporteiwit', 1), 30); },

  s13(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'reden 2: proeven bij muizen', 120, 150, 1, C.goud, 40, 'left', 700); const M = q.on('muizen', 1, 0.8);
    brein(ctx, 960, 480, 0.9, 1 - M); kruis(ctx, 960, 480, 50, q.on('onderzoeken', 1) * (1 - M)); regel(ctx, 'levend menselijk brein: niet zomaar onderzoeken', 960, 760, q.on('onderzoeken', 1) * (1 - M), C.text, 34, 'center', 700);
    muisje(ctx, 560, 500, 1.1, M); ctx.save(); ctx.translate(980, 380); ctx.scale(0.62, 0.62); neuronenRij(ctx, 0, 0, q.on('klonten', 1), { plak: 1 - q.on('beter', 1), tau: 0 }); ctx.restore();
    vink_(ctx, 560, 700, 30, q.on('beter', 1)); regel(ctx, 'muis: klonten weg, onthoudt beter', 560, 780, q.on('beter', 1), C.groen, 30, 'center', 700);
    kruis(ctx, 1380, 700, 26, q.on('mensen', 1)); regel(ctx, 'mens: werkt niet', 1380, 780, q.on('mensen', 1), C.koraal, 30, 'center', 700); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const S = q.on('testten', 1, 0.8);
    muisje(ctx, 500, 500, 1.1, 1 - S); chip(ctx, 'krijgen vanzelf geen Alzheimer', 500, 300, C.koraal, q.on('vanzelf', 1) * (1 - S), 28); chip(ctx, 'genen van families met erfelijke Alzheimer', 500, 720, C.paars, q.on('families', 1) * (1 - S), 28); chip(ctx, '= maar een deel van de ziekte', 500, 800, C.text2, q.on('deel', 1) * (1 - S), 28);
    middelenStapel(ctx, 1000, 260, S, clamp((t - q.at('testten', 1)) / 2.5, 0, 1), 40); regel(ctx, '2002–2012: ruim tweehonderd middelen, één goedgekeurd', 1300, 230, S, C.text, 30, 'center', 700); metaA(ctx, 'IEDER KAARTJE ≈ 6 MIDDELEN', 1300, 600, S, C.grain, 'center', 26); tag(ctx, 'muismodellen: één van de redenen', 1300, 700, C.goud, q.on('Muismodellen', 1), 'center', 30); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('neurochirurg', 1, 0.8); regel(ctx, 'reden 3: een dode hersencel komt meestal niet terug', 120, 150, 1 - q.on('Daarom', 1), C.goud, 40, 'left', 700); regel(ctx, 'zonder pil: diepe hersenstimulatie', 120, 150, q.on('Daarom', 1), C.goud, 40, 'left', 700);
    neuronenRij(ctx, 420, 470, 1 - D, { dood: 1 });
    dbsPersoon(ctx, 'henk', 800, 880, 640, D, q.on('elektrode', 1, 1.5), t); naamBij(ctx, 'diepe hersenstimulatie', 'stroompjes · zoals een pacemaker', 1200, 300, q.on('stimulatie', 1));
    chip(ctx, 'trillen en stijfheid: vaak veel minder', 1450, 520, C.groen, q.on('trillen', 1), 28); chip(ctx, 'cellen blijven afsterven', 1450, 610, C.koraal, q.on('afsterven', 1), 28); },

  // ---------- Recap ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'henk', 360, 880, 540, { t, uit: 'neutraal' }); persoon(ctx, 'noor', 660, 880, 480, { t, kijk: -1, uit: q.on('Noor', 1) > 0.5 && q.on('Nee', 1) < 0.5 ? 'praat' : 'neutraal' }); persoon(ctx, 'kim', 1640, 880, 560, { t, kijk: -1, uit: q.on('neuroloog', 1) > 0.5 ? 'praat' : 'neutraal' });
    bubbel(ctx, 700, 260, 'gewend aan je pillen?', '#F2F2EE', q.on('gewend', 1) * (1 - q.on('Nee', 1)), 30); dopaGrafiek(ctx, 900, 230, 560, 300, q.on('minder', 1), { buffer: 0.1, u: 1, banden: 0, col: C.koraal, label: 'minder cellen' });
    naamBij(ctx, 'Dr. Kim', 'neuroloog', 1500, 240, q.on('dokter', 1)); chip(ctx, 'diepe hersenstimulatie?', 1180, 640, C.goud, q.on('stimulatie', 1), 30); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'neuroloog ← geneeskunde', 960, 220, C.koraal, q.on('Neuroloog', 1), 'center', 34);
    ['biomedische wetenschappen', 'biologie', 'psychologie'].forEach((s2, i) => { const a2 = q.on(s2.split(' ')[0], 1); tag(ctx, s2, 480 + i * 480, 380, C.teal, a2, 'center', 30); pijl(ctx, 480 + i * 480, 410, 960 + (i - 1) * 120, 500, C.line, q.on('master', 1), 3, 14); }); tag(ctx, 'onderzoeker · master over de hersenen', 960, 570, C.goud, q.on('master', 1), 'center', 32);
    roundRect(ctx, 360, 640, 1200, 190, 16); ctx.save(); ctx.globalAlpha *= q.on('zoeken', 1); shape(ctx, rgba(C.paars, 0.12), C.paars, 2); ctx.restore(); regel(ctx, 'waarom sterven hersencellen af?', 960, 710, q.on('waarom', 1), C.text, 34, 'center', 700); regel(ctx, 'hoe krijg je een medicijn langs de barrière?', 960, 780, q.on('barrière', 1), C.text, 34, 'center', 700); }
});
