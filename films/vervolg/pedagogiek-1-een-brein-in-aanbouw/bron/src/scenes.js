
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
// Wat word jij? · Pedagogiek 1 · Een brein in aanbouw — eigen tekeningen (20 okt 2026)

function verkeerslicht(ctx, x, y, s, a = 1, kleur = 'rood') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#5A6478'; ctx.fillRect(-8, 0, 16, 320); roundRect(ctx, -44, -190, 88, 200, 18); shape(ctx, '#20242E', '#6A7080', 2);
  [['rood', '#E0533F'], ['geel', '#F2C14E'], ['groen', '#5FC77A']].forEach(([k, c], i) => circ(ctx, 0, -150 + i * 62, 24, k === kleur ? c : rgba(c, 0.18))); ctx.restore(); }
function fietsje(ctx, x, y, s, a = 1, col = '#AFC0D0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.lineCap = 'round'; [[-48, 0], [48, 0]].forEach(([dx]) => { ctx.beginPath(); ctx.arc(x + dx * s, y, 30 * s, 0, 6.283); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x - 48 * s, y); ctx.lineTo(x - 6 * s, y - 40 * s); ctx.lineTo(x + 48 * s, y); ctx.moveTo(x - 6 * s, y - 40 * s); ctx.lineTo(x + 34 * s, y - 40 * s); ctx.lineTo(x + 48 * s, y); ctx.moveTo(x - 6 * s, y - 40 * s); ctx.lineTo(x - 14 * s, y - 56 * s); ctx.stroke(); ctx.restore(); }
function wegStrook(ctx, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#2E3850'; ctx.fillRect(0, y, W, 120); ctx.strokeStyle = rgba('#E8E2D8', 0.6); ctx.lineWidth = 4; ctx.setLineDash([30, 26]); ctx.beginPath(); ctx.moveTo(0, y + 60); ctx.lineTo(W, y + 60); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }

// brein dat groeit: f = 0.25 (pasgeboren) … 1 (volwassen); grootte als oppervlak ∝ massa^(2/3) is te ingewikkeld: schaal lineair met f^(1/3) zodat 'een kwart' zichtbaar kleiner is
function groeiBrein(ctx, x, y, s, f, a = 1, label = '') { const k = Math.cbrt(f); brein(ctx, x, y, s * k, a); if (label) regel(ctx, label, x, y + 220 * s, a, C.text, 30, 'center', 700); }

// netwerk van neuronen: dicht 0..1 (aantal verbindingen), snoei 0..1 (zwakke weg, sterke dikker)
function netwerkGroei(ctx, x, y, w, h, a = 1, dicht = 1, snoei = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const N = 16; const P = Array.from({ length: N }, (_, i) => [x + 40 + hash(i + 7) * (w - 80), y + 40 + hash(i + 31) * (h - 80)]);
  const L = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (d < w * 0.45) L.push([i, j, hash(i * 19 + j * 7)]); }
  L.forEach(([i, j, g], n) => { const zicht = n / L.length < dicht; if (!zicht) return; const sterk = g > 0.62; const al = sterk ? 1 : 1 - snoei; if (al <= 0.02) return; ctx.strokeStyle = rgba(sterk ? C.teal : C.line, (sterk ? 0.5 + 0.4 * snoei : 0.45) * al); ctx.lineWidth = sterk ? 2 + 5 * snoei : 1.5; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); });
  P.forEach(([px, py]) => circ(ctx, px, py, 13, '#4A4270', '#A392D6', 2)); ctx.restore(); }

// twee klanken in tekstballonnen (Hindi: tandklank en retroflexe klank), verschil = 0..1 hoe goed je het verschil hoort
function klanken(ctx, x, y, a = 1, verschil = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [['da', -1], ['ḍa', 1]].forEach(([s2, k]) => { roundRect(ctx, x + k * 170 - 120, y - 70, 240, 120, 30); shape(ctx, rgba(k < 0 ? C.teal : C.paars, 0.2), k < 0 ? C.teal : C.paars, 2.5); text(ctx, s2, x + k * 170, y + 12, fTitel(64), C.text, 'center'); });
  text(ctx, verschil > 0.5 ? '≠' : '=', x, y + 12, fTitel(56), verschil > 0.5 ? C.groen : C.koraal, 'center'); ctx.restore(); }

// axon met myeline: u 0..1 = hoeveel isolatie; signaaltje loopt sneller met myeline
function myelineAxon(ctx, x, y, w, a = 1, u = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#7A6FA8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  const n = 8; for (let i = 0; i < n; i++) { if (i / n >= u) break; roundRect(ctx, x + 20 + i * (w - 40) / n, y - 24, (w - 40) / n - 14, 48, 22); shape(ctx, '#E8E2D4', '#B8B0A0', 2); }
  const v = 0.25 + 1.1 * u; const p = (t * v) % 1; circ(ctx, x + p * w, y, 11, C.goud); ctx.restore(); }

// zijaanzicht brein dat van achter naar voor 'klaar' kleurt (u 0..1); voorhoofdskwab als laatste
function breinRijping(ctx, x, y, s, a = 1, u = 0, t = 0) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  [[250, -20, 'zien'], [120, -150, 'voelen en bewegen'], [-20, -170, ''], [-160, -110, ''], [-240, 20, 'voorhoofdskwab']].forEach(([dx, dy, n], i) => { const f = clamp(u * 5 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.beginPath(); ctx.ellipse(x + dx * s, y + dy * s, 62 * s, 46 * s, 0.2, 0, 6.283); shape(ctx, rgba(i === 4 ? C.goud : C.groen, 0.45), i === 4 ? C.goud : C.groen, 2); ctx.restore(); });
  ctx.restore(); }

// beloningssysteem (diep, koraal, pulserend) en rem voorin (teal, gestippeld = in aanbouw)
function beloningRem(ctx, x, y, s, a = 1, bel = 1, rem = 1, t = 0, extra = 0) { brein(ctx, x, y, s, a); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x - 220 * s, y + 0 * s, 80 * s, 70 * s, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.22), C.teal, 3); ctx.setLineDash([]); ctx.restore(); }
  if (bel > 0.01) { const p = 1 + (0.08 + 0.12 * extra) * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= bel; ctx.beginPath(); ctx.ellipse(x - 40 * s, y + 30 * s, 52 * s * p * (1 + 0.35 * extra), 36 * s * p * (1 + 0.35 * extra), 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.6 + 0.3 * extra), C.koraal, 2.5); ctx.restore(); }
  ctx.restore(); }

// rijspel 'Chicken' op een scherm: een auto rijdt op een muur af; u 0..1 = afstand afgelegd; botsing als u >= 1
function rijspel(ctx, x, y, w, h, a = 1, u = 0, keuze = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0E141E', '#6A7080', 3); ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 16); ctx.clip();
  ctx.fillStyle = '#3A4458'; ctx.fillRect(x + 8, y + h * 0.55, w - 16, h * 0.3); ctx.strokeStyle = rgba('#E8E2D8', 0.7); ctx.lineWidth = 4; ctx.setLineDash([22, 18]); ctx.beginPath(); ctx.moveTo(x + 20, y + h * 0.7); ctx.lineTo(x + w * 0.86, y + h * 0.7); ctx.stroke(); ctx.setLineDash([]);
  for (let r = 0; r < 5; r++) for (let k = 0; k < 2; k++) { roundRect(ctx, x + w * 0.87 + k * 34 + (r % 2) * 17, y + h * 0.25 + r * 34, 32, 30, 3); shape(ctx, '#8C5A3A', '#B07A58', 1.5); }
  const cx = x + 40 + clamp(u, 0, 1) * (w * 0.87 - 180); roundRect(ctx, cx, y + h * 0.6, 140, 56, 12); shape(ctx, C.koraal, null); roundRect(ctx, cx + 30, y + h * 0.52, 80, 40, 10); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, cx + 30, y + h * 0.6 + 56, 15, '#2A2F3E'); circ(ctx, cx + 110, y + h * 0.6 + 56, 15, '#2A2F3E');
  text(ctx, 'punten: ' + (keuze === 'BOTS!' ? 0 : Math.round(clamp(u, 0, 1) * 100)), x + 40, y + 60, fTekst(34, 700), C.goud, 'left'); if (keuze) text(ctx, keuze, x + w / 2, y + 60, fTekst(40, 800), keuze === 'BOTS!' ? C.koraal : C.groen, 'center');
  ctx.restore(); ctx.restore(); }

// staafjes: risico in het rijspel per leeftijdsgroep, alleen en met leeftijdgenoten (schematisch)
function risicoStaven(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const G = [['pubers', 0.42, 0.88], ['jongvolwassenen', 0.4, 0.58], ['volwassenen', 0.38, 0.41]]; const gw = w / 3;
  G.forEach(([n, v1, v2], g) => { [[v1, C.teal, 'alleen'], [v2, C.koraal, 'met anderen']].forEach(([v, c, l], k) => { const bw = gw * 0.32, bx = x + g * gw + gw * 0.14 + k * (bw + 14); const hh = h * v * clamp(u * 3 - g, 0, 1); roundRect(ctx, bx, y + h - hh, bw, hh, 8); shape(ctx, rgba(c, 0.7), c, 2); }); text(ctx, n, x + g * gw + gw / 2, y + h + 44, fTekst(30, 700), C.text, 'center'); });
  roundRect(ctx, x + w - 330, y - 70, 24, 24, 4); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); text(ctx, 'alleen', x + w - 296, y - 50, fTekst(26, 600), C.text2, 'left'); roundRect(ctx, x + w - 190, y - 70, 24, 24, 4); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); text(ctx, 'met anderen', x + w - 156, y - 50, fTekst(26, 600), C.text2, 'left');
  metaText(ctx, 'RISICO IN HET RIJSPEL · SCHEMATISCH', x, y - 50, C.grain, 'left', 26); ctx.restore(); }

// trap: ruimte die stap voor stap groeit
function trap(ctx, x, y, a = 1, k = 4, labels = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { const al = clamp(k - i, 0, 1); if (al <= 0.01) continue; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, x + i * 190, y - i * 90, 190, 90 + i * 90, 6); shape(ctx, rgba(C.groen, 0.18 + i * 0.12), C.groen, 2); if (labels[i]) text(ctx, labels[i], x + i * 190 + 95, y - i * 90 + 52, fTekst(26, 700), C.text, 'center'); ctx.restore(); } ctx.restore(); }
// Wat word jij? · Pedagogiek · Een brein in aanbouw — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Bilal, Sam, Daan, baby).
// Rode draad: Bilal en het rode licht.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// straatbeeld: weg onderaan, licht rechts; groep = Bilal alleen (0) of met vrienden (1); door = 0..1 rijdt door
function kruisBeeld(ctx, t, groepA, door, licht = 'rood') { wegStrook(ctx, 760); verkeerslicht(ctx, 1500, 420, 1, 1, licht);
  const dx = door * 420; fietsje(ctx, 1060 + dx, 805, 1.2, 1, '#AFC0D0'); persoon(ctx, 'bilal', 900 + dx, 800, 440, { t, uit: groepA > 0.5 ? 'lacht' : 'neutraal' });
  fietsje(ctx, 820 + dx, 805, 1.1, groepA, '#AFC0D0'); persoon(ctx, 'sam', 680 + dx, 800, 400, { t, a: groepA, uit: 'lacht' }); fietsje(ctx, 600 + dx, 805, 1.05, groepA, '#AFC0D0'); persoon(ctx, 'daan', 480 + dx, 800, 380, { t, a: groepA, uit: 'blij' }); }

Object.assign(SCENES, {
  title(ctx, t) { breinRijping(ctx, 1560, 620, 0.72, 1, 0.75, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vrienden', 1, 0.6); const door = clamp((t - q.at('door', 1)) / 2.5, 0, 1);
    kruisBeeld(ctx, t, V, V > 0.5 ? door : 0); naamBij(ctx, 'Bilal', '17 jaar', 1000, 300, q.on('Bilal', 1) * (1 - V));
    chip(ctx, 'alleen: wacht altijd', 500, 200, C.groen, q.on('alleen', 1) * (1 - V), 30); chip(ctx, 'met vrienden: fietst door', 500, 200, C.koraal, V, 30); chip(ctx, 'weet: gevaarlijk', 1150, 200, C.teal, q.on('gevaarlijk', 1), 30); vraagteken(ctx, 1780, 260, q.on('Waarom', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); tag(ctx, 'hij weet best dat het gevaarlijk is', 960, 400, C.teal, q.on('best', 1), 'center', 32); brein(ctx, 960, 640, 0.7, q.on('opgroeien', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Inprenting', 1, 0.6), V = q.on('twee', 2, 0.6);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; persoon(ctx, 'baby', 360, 640, 300, { t, uit: 'slaapt' }); groeiBrein(ctx, 900, 480, 0.6, 0.25, q.on('pasgeboren', 1), 'pasgeboren · ± ¼'); groeiBrein(ctx, 1450, 480, 0.6, 0.75, q.on('tweede', 1), 'rond 2 jaar · ± ¾'); netwerkGroei(ctx, 160, 180, 1600, 160, q.on('razendsnel', 1), clamp((t - q.at('razendsnel', 1)) / 2, 0, 1), 0, t); ctx.restore(); }
    if (K > 0.01 && V < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - V); chip(ctx, 'film: Inprenting en de sensitieve periode', 960, 220, C.teal, 1, 28); klanken(ctx, 600, 480, 1, 1); regel(ctx, '6 maanden: hoort het verschil', 600, 640, 1, C.groen, 30, 'center', 700); klanken(ctx, 1320, 480, q.on('slechter', 1), 0); regel(ctx, '1 jaar: nauwelijks nog', 1320, 640, q.on('slechter', 1), C.koraal, 30, 'center', 700); haak(ctx, 400, 1520, 740, 'afgestemd op wat ze steeds hoorden', C.groen, q.on('afgestemd', 1)); ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; netwerkGroei(ctx, 260, 220, 640, 520, 1, 1, 0, t); regel(ctx, 'kind van 2', 580, 790, 1, C.text, 32, 'center', 700); netwerkGroei(ctx, 1020, 220, 640, 520, 1, 0.45, 0.6, t); regel(ctx, 'jij', 1340, 790, 1, C.text, 32, 'center', 700); vraagteken(ctx, 960, 480, q.on('zegt', 1), 100); ctx.restore(); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const sn = q.on('verdwijnen', 1, 2);
    netwerkGroei(ctx, 260, 220, 900, 560, 1, 1, sn, t); chip(ctx, 'vaak gebruikt: blijft', 1500, 300, C.teal, q.on('gebruikt', 1), 28); chip(ctx, 'weinig gebruikt: verdwijnt', 1500, 380, C.text2, q.on('Weinig', 1), 28); chip(ctx, 'film: Leren en onthouden', 1500, 460, C.teal, q.on('Leren', 1), 26); chip(ctx, 'efficiënter', 1500, 560, C.goud, q.on('efficiënter', 1), 30); chip(ctx, 'paden in een bos', 1500, 640, C.groen, q.on('bos', 1), 28); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('myeline', 1, 1.5); myelineAxon(ctx, 260, 330, 1400, 1, M, t); naamBij(ctx, 'myeline', 'isolatielaag', 300, 420, q.on('myeline', 1)); chip(ctx, 'film: Het kabelnetwerk', 1400, 220, C.teal, q.on('kabelnetwerk', 1), 26);
    breinRijping(ctx, 960, 680, 0.55, q.on('tegelijk', 1), 0, t); vraagteken(ctx, 1500, 680, q.on('laatste', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const u = clamp((t - 0.5) / 5, 0, 1) * 0.8 + 0.2 * q.on('voorhoofdskwab', 1, 2);
    breinRijping(ctx, 860, 520, 1.15, 1, u, t); naamBij(ctx, 'voorhoofdskwab', 'vooruit denken · jezelf inhouden', 590, 650, q.on('voorhoofdskwab', 1), 'center'); chip(ctx, 'verandert door tot in je twintiger jaren', 1500, 820, C.goud, q.on('twintiger', 1), 28); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); beloningRem(ctx, 860, 500, 1.15, 1, q.on('beloningssysteem', 1), q.on('rem', 1), t, q.on('spannends', 1));
    naamBij(ctx, 'beloningssysteem', 'reageert extra sterk', 900, 548, q.on('beloningssysteem', 1)); naamBij(ctx, 'rem voorin', 'nog in aanbouw', 600, 385, q.on('rem', 1), 'center');
    tag(ctx, 'MODEL · onderzoekers discussiëren nog', 1500, 220, C.goud, q.on('model', 1), 'center', 28); },

  s12(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'AMERIKAANSE ONDERZOEKERS · 2005', 120, 140, C.grain, 'left', 30); const ts = q.at('muur', 1), tb = q.at('bots', 1); const u = clamp((t - ts) / Math.max(1, tb - ts), 0, 1);
    rijspel(ctx, 400, 200, 1120, 460, q.on('rijspel', 1), u, t >= tb ? 'BOTS!' : ''); chip(ctx, 'langer doorrijden = meer punten', 960, 720, C.goud, q.on('punten', 1), 28); chip(ctx, 'te lang: alles kwijt', 960, 800, C.koraal, q.on('bots', 1), 28);
    stippen(ctx, 180, 400, 1, 1, C.teal, q.on('alleen', 1), 1, 20, 40); metaA(ctx, 'ALLEEN', 200, 470, q.on('alleen', 1), C.grain, 'center', 22); stippen(ctx, 1680, 380, 3, 3, C.koraal, q.on('leeftijdgenoten', 1), 3, 20, 46); metaA(ctx, 'MET 2 LEEFTIJDGENOTEN', 1730, 460, q.on('leeftijdgenoten', 1), C.grain, 'center', 22); vraagteken(ctx, 1780, 760, q.on('erbij', 2), 90); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); risicoStaven(ctx, 360, 300, 1200, 460, 1, clamp(t / 4, 0, 1)); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Bilal', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; metaText(ctx, 'LATER ONDERZOEK · HERSENSCANNER', 120, 140, C.grain, 'left', 30); beloningRem(ctx, 700, 500, 0.95, 1, 1, 1, t, q.on('actiever', 1)); naamBij(ctx, 'beloningsgebied', 'actiever met vrienden', 760, 680, q.on('beloningsgebied', 1)); stippen(ctx, 1350, 420, 3, 3, C.koraal, q.on('vrienden', 1), 3, 22, 50); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; kruisBeeld(ctx, t, 1, 0, 'rood'); chip(ctx, 'weet: gevaarlijk', 600, 150, C.teal, 1, 28); chip(ctx, 'met vrienden: beloning weegt zwaarder', 1150, 150, C.koraal, q.on('zwaarder', 1), 28); chip(ctx, 'ook nut: durven en zelfstandig worden', 960, 230, C.groen, q.on('nut', 1), 28); ctx.restore(); } },

  // ---------- H4 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('rijexamen', 1, 0.8);
    vergKaart(ctx, 260, 260, 620, 220, 'alleen verbieden', ['werkt vaak slecht'], C.koraal, q.on('verbieden', 1) * (1 - R)); vergKaart(ctx, 1040, 260, 620, 220, 'begeleiden', ['ruimte die stap voor stap groeit'], C.groen, q.on('ruimte', 1) * (1 - R)); trap(ctx, 1060, 760, (1 - R) * q.on('stap', 1), 4, ['', '', '', '']);
    if (R > 0.01) { auto(ctx, 960, 620, 2.2, R); persoon(ctx, 'bilal', 1440, 880, 460, { t, a: R }); persoon(ctx, 'henk', 1680, 880, 470, { t, a: q.on('coach', 1, 0.3), kijk: -1 }); naamBij(ctx, 'coach', 'bv. opa Henk', 1680, 330, q.on('coach', 1)); chip(ctx, '17: rijexamen', 960, 260, C.teal, R, 30); chip(ctx, 'tot 18: alleen met een coach', 960, 340, C.goud, q.on('coach', 1), 30); vraagteken(ctx, 1780, 300, q.on('eigenlijk', 1), 90); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('pedagoog', 1, 0.8);
    beloningRem(ctx, 640, 500, 0.85, 1 - P, 1, 1, t, 0); tag(ctx, 'coach = rem van buiten', 1300, 420, C.teal, q.on('buiten', 1) * (1 - P), 'center', 32);
    if (P > 0.01) { ['ouders', 'scholen', 'jeugdhulp'].forEach((s2, i) => tag(ctx, s2, 560 + i * 400, 300, C.teal, P * q.on(s2, 1), 'center', 32)); vergKaart(ctx, 460, 420, 1000, 180, 'wat kun je verwachten?', ['en hoe help je verder?'], C.goud, q.on('verwachten', 1)); chip(ctx, 'regels', 700, 720, C.text2, q.on('regels', 1), 28); chip(ctx, 'schooltijden · film: Slaap', 1200, 720, C.teal, q.on('schooltijden', 1), 28); } },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const H = q.on('aanbouw', 1, 0.8); ctx.save(); ctx.globalAlpha *= 1 - H; kruisBeeld(ctx, t, 1, 0, 'rood'); ctx.restore();
    if (H > 0.01) { breinRijping(ctx, 560, 480, 0.9, H, 0.7, t); beloningRem(ctx, 1360, 480, 0.9, H, 1, 1, t, 0.6); regel(ctx, 'rijpt van achter naar voor', 560, 720, H, C.text, 30, 'center', 700); regel(ctx, 'beloning vooruit, rem later', 1360, 720, H, C.text, 30, 'center', 700); haak(ctx, 300, 1640, 800, 'geen excuus, wel een verklaring', C.groen, q.on('excuus', 1)); } },
  s20(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'pedagogiek (hbo)', 640, 300, C.teal, q.on('hbo', 1), 'center', 34); tag(ctx, 'pedagogische wetenschappen (wo)', 1280, 300, C.teal, q.on('universiteit', 1), 'center', 34);
    ['jeugdhulp', 'school', 'onderzoek'].forEach((s2, i) => tag(ctx, s2, 560 + i * 400, 540, C.goud, q.on('jeugdhulp', 1), 'center', 32)); }
});
