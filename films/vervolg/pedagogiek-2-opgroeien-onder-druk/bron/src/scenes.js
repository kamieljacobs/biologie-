
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
// Wat word jij? · Pedagogiek 2 · Opgroeien onder druk — eigen tekeningen (20 okt 2026)

// telpoppetje (pictogram, alleen in grafieken en groepen)
function popje(ctx, x, y, r, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); ctx.restore(); }
// groep van n poppetjes in een raster; kleur(i) geeft de kleur
function groep(ctx, x, y, n, per, gap, r, kleur, a = 1) { if (a <= 0.01) return; for (let i = 0; i < n; i++) popje(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap * 1.3, r, kleur(i), a); }

// eiland (Kauai, vereenvoudigd) in zee
function eiland(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); for (let k = 0; k <= 24; k++) { const an = k / 24 * 6.283, r = 150 + 22 * Math.sin(an * 3 + 1) + 14 * Math.cos(an * 5); ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r * 0.82); } ctx.closePath(); shape(ctx, '#3A5540', '#5FA86E', 3);
  ctx.beginPath(); ctx.moveTo(-40, -30); ctx.lineTo(10, -100); ctx.lineTo(60, -30); ctx.closePath(); ctx.fillStyle = '#4B5878'; ctx.fill(); ctx.restore(); }

// tijdlijn met jaartallen
function tijdlijn(ctx, x, y, w, punten, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w * u, y); ctx.stroke(); punten.forEach(([f, l]) => { if (f > u) return; circ(ctx, x + f * w, y, 9, C.goud); text(ctx, l, x + f * w, y + 44, fTekst(28, 700), C.text, 'center'); }); ctx.restore(); }

// staafjes: aantal ingrijpende ervaringen (0,1,2,3,4+) tegen kans op problemen later (schematisch, oplopend)
function aceStaven(ctx, x, y, w, h, a = 1, u = 1, hl = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const V = [0.15, 0.22, 0.3, 0.42, 0.85]; V.forEach((v, i) => { const bw = w / 5 - 30, bx = x + 20 + i * w / 5; const hh = h * v * clamp(u * 5 - i, 0, 1); roundRect(ctx, bx, y + h - hh, bw, hh, 8); shape(ctx, rgba(i === hl ? C.koraal : C.oker, 0.7), i === hl ? C.koraal : C.oker, 2); text(ctx, ['0', '1', '2', '3', '4+'][i], bx + bw / 2, y + h + 38, fTekst(30, 700), C.text, 'center'); });
  metaText(ctx, 'AANTAL INGRIJPENDE ERVARINGEN', x + w / 2, y + h + 80, C.grain, 'center', 24); metaText(ctx, 'KANS OP PROBLEMEN LATER · SCHEMATISCH', x, y - 18, C.grain, 'left', 24); ctx.restore(); }

// weegschaal risico (koraal, links) tegen beschermers (groen, rechts); kant < 0 = risico zwaarder
function balans(ctx, x, y, s, a = 1, kant = 0, links = 'risico\'s', rechts = 'beschermers') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const an = clamp(kant, -1, 1) * 0.28;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(-60, 200); ctx.lineTo(60, 200); ctx.lineTo(0, 120); ctx.closePath(); ctx.fill(); ctx.fillRect(-8, -10, 16, 140);
  ctx.save(); ctx.rotate(an); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-280, -14, 560, 14); ctx.restore();
  [[-1, C.koraal, links], [1, C.groen, rechts]].forEach(([k, col, n]) => { const px = k * 260 * Math.cos(an), py = k * 260 * Math.sin(an); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + 70); ctx.stroke(); ctx.font = fTekst(32, 700); const bw = Math.max(240, ctx.measureText(n).width + 48); roundRect(ctx, px - bw / 2, py + 70, bw, 80, 14); shape(ctx, rgba(col, 0.3), col, 3); text(ctx, n, px, py + 122, fTekst(32, 700), C.text, 'center'); });
  ctx.restore(); }

// eenvoudige iconen in een afgerond vlak (Part C: plaats als lijnicoon)
function plekIcoon(ctx, soort, x, y, s, a = 1, col = C.text2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -70, -70, 140, 140, 22); shape(ctx, '#2A3A58', col, 2); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  if (soort === 'school') { ctx.beginPath(); ctx.moveTo(-40, 30); ctx.lineTo(-40, -10); ctx.lineTo(0, -40); ctx.lineTo(40, -10); ctx.lineTo(40, 30); ctx.closePath(); ctx.stroke(); ctx.strokeRect(-10, 6, 20, 24); ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(0, -56); ctx.lineTo(18, -50); ctx.lineTo(0, -46); ctx.stroke(); }
  if (soort === 'huis') { ctx.beginPath(); ctx.moveTo(-40, 34); ctx.lineTo(-40, -4); ctx.lineTo(0, -38); ctx.lineTo(40, -4); ctx.lineTo(40, 34); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 22); ctx.bezierCurveTo(-26, 4, -14, -16, 0, -4); ctx.bezierCurveTo(14, -16, 26, 4, 0, 22); ctx.fillStyle = C.koraal; ctx.fill(); }
  if (soort === 'telefoon') { roundRect(ctx, -24, -44, 48, 88, 8); ctx.stroke(); circ(ctx, 0, 32, 4, col); }
  if (soort === 'rechter') { ctx.beginPath(); ctx.moveTo(-36, 30); ctx.lineTo(36, 30); ctx.moveTo(0, 30); ctx.lineTo(0, -30); ctx.moveTo(-36, -24); ctx.lineTo(36, -24); ctx.stroke(); }
  ctx.restore(); }

// kaartje met een signaal of stap
function stapKaart(ctx, x, y, w, nr, s2, a = 1, col = C.teal, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 96, 14); shape(ctx, rgba(col, 0.1 + 0.15 * aan), rgba(col, 0.4 + 0.6 * aan), 2); circ(ctx, x + 46, y + 48, 26, rgba(col, 0.3 + 0.5 * aan)); text(ctx, String(nr), x + 46, y + 60, fTekst(32, 800), C.text, 'center'); text(ctx, s2, x + 90, y + 60, fTekst(30, 700), C.text, 'left'); ctx.restore(); }

// scherm met een filmpje: baby op een kleed en de hand van een ouder; markeringen op de tijdbalk = goede momenten
function videoScherm(ctx, x, y, w, h, a = 1, t = 0, mark = 0, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0E141E', '#6A7080', 3); ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 70); ctx.clip();
  ctx.fillStyle = '#2C3E5E'; ctx.fillRect(x + 8, y + 8, w - 16, h - 70); ctx.fillStyle = '#C9A35C'; ctx.fillRect(x + 40, y + h * 0.62, w - 80, h * 0.2);
  // opvoeder uit de cast (Opa Henk) naast de baby op het kleed; bij hl: oogcontact en een glimlach terug
  const H = persoon(ctx, 'henk', x + w * 0.22, y + h * 0.86, h * 0.74, { t, uit: hl > 0.5 ? 'blij' : 'neutraal', kijk: 1 });
  persoon(ctx, 'baby', x + w * 0.5, y + h * 0.7, h * 0.42, { t, uit: hl > 0.5 ? 'blij' : 'neutraal' });
  if (hl > 0.01 && H && H.hoofd) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.moveTo(H.hoofd.x + H.hoofd.r, H.hoofd.y); ctx.quadraticCurveTo(x + w * 0.42, y + h * 0.3, x + w * 0.5 - h * 0.12, y + h * 0.62); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.fillStyle = '#3A4458'; ctx.fillRect(x + 30, y + h - 36, w - 60, 8); if (mark > 0.01) [0.18, 0.47, 0.72].forEach((f, i) => { if (mark * 3 > i) { circ(ctx, x + 30 + f * (w - 60), y + h - 32, 12, C.groen); } }); ctx.restore(); }
// Wat word jij? · Pedagogiek · Opgroeien onder druk — scènes per alinea (v1.0, 20 okt 2026). Look: Schema; mensen als telpoppetjes in groepen, Dr. Kim als pedagoog.
// Rode draad: het Kauai-onderzoek. Geen castkind als slachtoffer.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// risicogroep van 30 poppetjes (1 = ongeveer 7 kinderen): k groen (goed terechtgekomen) van de 30
const RISK = (i, k) => i < k ? C.groen : C.koraal;
function hulpNummers(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 420, y - 60, 840, 150, 18); shape(ctx, rgba(C.teal, 0.12), C.teal, 2);
  text(ctx, 'Kindertelefoon 0800-0432 · bellen of chatten', x, y, fTekst(34, 700), C.text, 'center'); text(ctx, 'Veilig Thuis 0800-2000 · direct gevaar: 112', x, y + 52, fTekst(34, 700), C.text, 'center'); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { balans(ctx, 1500, 520, 0.8, 1, 0.6); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('tegenslag', 1, 0.8);
    eiland(ctx, 420, 470, 1.3, 1 - G * 0.6); metaA(ctx, 'KAUAI · HAWAÏ', 420, 760, 1 - G * 0.6, C.grain, 'center', 28);
    groep(ctx, 900, 280, 100, 20, 44, 13, i => (G > 0.5 && i % 3 === 0) ? C.koraal : rgba(C.text2, 0.9), q.on('zevenhonderd', 1));
    metaA(ctx, 'IEDER POPJE ≈ 7 KINDEREN · GEBOREN IN 1955', 900, 200, q.on('zevenhonderd', 1), C.grain, 'left', 24);
    tijdlijn(ctx, 900, 820, 860, [[0, 'geboren 1955'], [0.25, '10 jaar'], [0.45, '18'], [0.75, '32'], [1, '40']], clamp((t - q.at('veertig', 1)) / 2, 0, 1), q.on('veertig', 1));
    chip(ctx, '1 op 3: veel tegenslag', 1330, 760, C.koraal, G, 28); vraagteken(ctx, 1820, 500, q.on('later', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); metaText(ctx, 'DE GROEP MET VEEL TEGENSLAG', 960, 250, C.grain, 'center', 28);
    const k = q.on('stabiele', 1) > 0.5 ? 10 + Math.round(6 * q.on('later', 1)) : 0; groep(ctx, 560, 340, 30, 10, 88, 22, i => i < k ? C.groen : C.koraal, 1);
    chip(ctx, '2 op 3: al jong problemen', 960, 700, C.koraal, q.on('Twee', 1) * (1 - q.on('stabiele', 1)), 30); chip(ctx, '1 op 3: stabiel en zorgzaam', 960, 700, C.groen, q.on('stabiele', 1) * (1 - q.on('later', 1)), 30); chip(ctx, 'later ging het met velen alsnog beter', 960, 700, C.groen, q.on('later', 1), 30);
    haak(ctx, 560, 1360, 800, 'moeilijker, maar niet onmogelijk', C.groen, q.on('onmogelijk', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const A = q.on('negentig', 1, 0.8);
    chip(ctx, 'film: Stress', 360, 180, C.teal, q.on('Stress', 1), 28); balans(ctx, 520, 420, 0.75, 1 - A, -0.9 * q.on('alarm', 1), 'stress', 'kalmerende volwassene'); chip(ctx, 'kan overbelast raken', 520, 760, C.koraal, q.on('overbelast', 1) * (1 - A), 28);
    if (A > 0.01) { metaA(ctx, 'ACE-ONDERZOEK · VS · RUIM 17.000 VOLWASSENEN', 160, 220, A, C.grain, 'left', 28); ['mishandeling', 'verwaarlozing', 'geweld in huis', 'verslaving in huis'].forEach((s2, i) => tag(ctx, s2, 330, 330 + i * 80, C.oker, A * q.on(['mishandeld', 'verwaarloosd', 'geweld', 'verslaving'][i], 1), 'center', 28));
      aceStaven(ctx, 760, 300, 900, 420, q.on('meer', 1), clamp((t - q.at('meer', 1)) / 2, 0, 1), q.on('vier', 1) > 0.5 ? 4 : -1); vraagteken(ctx, 1780, 250, q.on('toekomst', 1), 90); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); aceStaven(ctx, 200, 300, 760, 380, 1, 1, 4); chip(ctx, 'groepen: depressie en verslaving 4 tot 7 keer zo vaak', 580, 820, C.koraal, q.on('zeven', 1), 26);
    groep(ctx, 1160, 270, 20, 5, 110, 26, i => i < 4 ? C.koraal : C.groen, q.on('persoon', 1)); regel(ctx, 'één persoon: niets zeker', 1380, 790, q.on('persoon', 1), C.text, 32, 'center', 700); tag(ctx, 'wat maakt het verschil?', 960, 200, C.goud, q.on('verschil', 1), 'center', 30); },

  // ---------- H2 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'veerkracht', 960, 200, q.on('veerkracht', 1), C.goud, 56, 'center', 800); regel(ctx, 'goed opgroeien ondanks tegenslag', 960, 270, q.on('ondanks', 1), C.text, 34, 'center', 600);
    groep(ctx, 560, 400, 30, 10, 88, 22, i => i < 10 ? C.groen : rgba(C.koraal, 0.5), q.on('gemeen', 1)); vraagteken(ctx, 1600, 600, q.on('vaakst', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const V = q.on('Veerkracht', 1, 0.8);
    balans(ctx, 960, 340, 0.9, 1, -0.8 + 1.4 * q.on('volwassene', 1, 1.5) + 0.2 * q.on('goed', 1), 'risico\'s', 'vaste volwassene');
    ['oma', 'tante', 'leraar', 'buurman'].forEach((s2, i) => tag(ctx, s2, 1250 + (i % 2) * 220, 620 + Math.floor(i / 2) * 76, C.groen, q.on(s2, 1) * (1 - V), 'center', 28)); chip(ctx, 'film: Hechting', 520, 640, C.teal, q.on('Hechting', 1) * (1 - V), 28);
    chip(ctx, 'ergens goed in zijn · zelf invloed hebben', 520, 720, C.groen, q.on('invloed', 1) * (1 - V), 26);
    haak(ctx, 560, 1360, 820, 'veerkracht ontstaat in de relaties om een kind heen', C.groen, V); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Stel', 1, 0.8);
    regel(ctx, '± 3 op de 100 kinderen per jaar', 960, 220, q.on('honderd', 1) * (1 - L), C.koraal, 44, 'center', 800); groep(ctx, 560, 320, 100, 20, 42, 12, i => i < 3 ? C.koraal : rgba(C.text2, 0.8), q.on('honderd', 1) * (1 - L)); metaA(ctx, 'SCHATTING NEDERLAND (UNIVERSITEIT LEIDEN)', 960, 640, q.on('honderd', 1) * (1 - L), C.grain, 'center', 24);
    ['school', 'zorg', 'jeugdhulp'].forEach((s2, i) => tag(ctx, s2, 700 + i * 260, 760, C.teal, q.on('jeugdhulp', 1) * (1 - L), 'center', 30));
    if (L > 0.01) { plekIcoon(ctx, 'school', 520, 480, 1.4, L, C.teal); ['vaak blauwe plekken', 'bang om naar huis te gaan'].forEach((s2, i) => stapKaart(ctx, 900, 380 + i * 120, 700, '!', s2, L * q.on(['plekken', 'bang'][i], 1), C.koraal, 1)); vraagteken(ctx, 1720, 700, q.on('eerst', 1), 100); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); metaText(ctx, 'MELDCODE · VIJF STAPPEN', 960, 200, C.grain, 'center', 30);
    [['vastleggen wat je ziet', 'vast'], ['overleggen · advies Veilig Thuis', 'overleg'], ['gesprek met ouders en kind', 'praat'], ['afwegen hoe ernstig', 'weeg'], ['melden? en/of hulp?', 'beslist']].forEach(([s2, w], i) => stapKaart(ctx, 560, 240 + i * 112, 800, i + 1, s2, q.on(w, 1), C.teal, q.on(w, 1)));
    chip(ctx, 'op school: een vaste persoon', 1640, 380, C.teal, q.on('school', 1), 26); chip(ctx, 'soms allebei', 1640, 700, C.goud, q.on('allebei', 1), 28); },

  s14(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Het is nooit de schuld van een kind.', 960, 300, q.on('schuld', 1), C.goud, 48, 'center', 800);
    regel(ctx, 'praat met iemand die je vertrouwt', 960, 420, q.on('vertrouwt', 1), C.text, 36, 'center', 600); hulpNummers(ctx, 960, 600, q.on('Kindertelefoon', 1)); },

  // ---------- H4 ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'VIDEOFEEDBACK · ONTWIKKELD IN LEIDEN', 120, 150, C.grain, 'left', 28);
    persoon(ctx, 'kim', 300, 880, 520, { t, uit: 'blij', outfit: 'gewoon' }); ctx.save(); ctx.translate(372, 640); ctx.rotate(-0.12); roundRect(ctx, -58, -40, 116, 80, 10); shape(ctx, '#1A2030', '#8A93A6', 3); ctx.fillStyle = '#2C3E5E'; ctx.fillRect(-48, -30, 96, 60); ctx.restore(); naamBij(ctx, 'Dr. Kim', 'pedagoog', 420, 320, q.on('pedagoog', 1));
    videoScherm(ctx, 700, 250, 900, 560, q.on('filmt', 1), t, q.on('goede', 1, 2), 0); chip(ctx, 'samen terugkijken', 1150, 860, C.teal, q.on('terug', 1), 28); vraagteken(ctx, 1760, 300, q.on('Waarom', 1), 100); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); videoScherm(ctx, 400, 220, 900, 540, 1, t, 1, q.on('reageert', 1));
    chip(ctx, 'signaal opgepikt', 850, 820, C.groen, q.on('signaal', 1), 28); chip(ctx, 'beter dan een lijst met fouten', 1600, 300, C.text2, q.on('fouten', 1), 26); chip(ctx, 'gemiddeld: beter aanvoelen', 1600, 400, C.groen, q.on('gemiddeld', 1), 26); chip(ctx, 'net als op Kauai: iemand die er is', 1600, 500, C.goud, q.on('Kauai', 1), 26); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); groep(ctx, 200, 360, 30, 10, 70, 18, i => i < 10 ? C.groen : C.koraal, 1); balans(ctx, 1300, 380, 0.75, 1, -0.6 + 1.1 * q.on('iemand', 1, 1.5), 'tegenslag', 'iemand die er is'); haak(ctx, 900, 1700, 800, 'een pedagoog helpt zo iemand te vinden of te versterken', C.groen, q.on('pedagoog', 1)); },
  s19(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'pedagogiek (hbo)', 640, 300, C.teal, q.on('hbo', 1), 'center', 34); tag(ctx, 'pedagogische wetenschappen (wo)', 1280, 300, C.teal, q.on('universiteit', 1), 'center', 34);
    ['jeugdhulp', 'school', 'Veilig Thuis', 'onderzoek'].forEach((s2, i) => tag(ctx, s2, 420 + i * 360, 520, C.goud, q.on(s2.split(' ')[0], 1), 'center', 30)); hulpNummers(ctx, 960, 740, q.on('onderzoek', 1)); }
});
