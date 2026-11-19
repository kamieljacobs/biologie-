
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
// Wat word jij? · Sport en topsport 1 · Glijden, trekken, drijven — eigen tekeningen (v1.0, 19 nov 2026).
// Seriekleuren (REEKS-sport): teal = water, koraal = weerstand (pijlen tegen de bewegingsrichting), goud = voortstuwing en focus, oker = kracht en energie.
// Maten: Sam 1,79 m (lengte in px = staande lengte); 50-meterbad met banen van 2,5 m; meetbaan: stang ± 0,8 m onder water, plaatjes ± 1,35 m uit elkaar (Toussaint 2002, Schreven 2013).
// Water = vlak achter de zwemmer (nooit doorzichtige mensen); alleen bij de zwemmer aan de muur (cold open) een dekkend watervlak vóór het onderlijf.

const GROND = 860;
const SP1 = { water: '#1D4660', waterD: '#173A50', opp: '#5BA4C9', tegel: '#2B3B55', tegelL: '#3A4C6A', papier: '#EEF0EA', bord: '#8A6B4C', okerD: '#7E5F22', goudD: '#8C6510', huid: '#7A5440', muts: '#D8573F' };

// ---------- algemene hulpjes (zoals mb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function kaartTekst(ctx, x, y, w, h, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x + 28, y + 100 + i * (px + 12), fTekst(px, 700), C.text, 'left')); }); }
function vensterA(t, t0, t1, d = 0.4) { return ramp(t, t0, d) * (1 - ramp(t, t1, d)); }

// ---------- castpersonages ----------
// figuranten in zwemkleding (eigen garderobe in deze film; het castboek heeft alleen Sam in zwemkleding): Bilal, Daan (zwembroek) en Noor (badpak)
(function () { const zw = (id, muts, pak) => { const P = CAST[id]; if (!P) return; P.garderobe = Object.assign({}, P.garderobe, { zwem: { top: 'bloot', topKleur: pak || P.huid, topAccent: pak || P.huid, broek: pak || '#202A3A', broekAccent: pak ? pak : muts,
  schoen: P.huid, schoenAccent: P.huid, kapsel: 'badmuts', badmuts: muts, accessoire: ['zwembroek', 'blootsvoets', 'zwembril'] } }); };
  zw('bilal', '#E8E8E2'); zw('daan', '#3E7A5A'); zw('noor', '#E0B64A', '#2C3E6E'); })();
// crawl met een zakkende elleboog ('lek'): de bovenarm zakt eerst, de onderarm blijft plat en glijdt weg
ZWEM.crawlLek = Object.assign({}, ZWEM.crawl, { arm: [[0, 0.3, 0.25, 1, 1], [0.12, 0.12, 0.1, 1, 1], [0.26, 0.78, 0.38, 0.95, 1], [0.4, 1.35, 1.05, 0.85, 1], [0.52, 1.95, 2.25, 0.85, 1], [0.62, 2.8, 2.95, 1, 1], [0.7, 3.6, 3.2, 0.9, 0.9], [0.8, 4.5, 1.25, 1, 0.45], [0.9, 5.55, 0.45, 1, 0.8]] });

function sp1Sam(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ t, outfit: 'zwem', uit: 'neutraal' }, o)); }
CAST.zwemtrainerZK = Object.assign({}, CAST.zwemtrainer, { accessoire: CAST.zwemtrainer.accessoire.filter(a => a !== 'klembord') });
function sp1Trainer(ctx, x, y, h, t, o = {}) { return persoon(ctx, o.zonderBord ? 'zwemtrainerZK' : 'zwemtrainer', x, y, h, Object.assign({ t, uit: 'neutraal' }, o)); }
// zwemmer gedraaid rond (px, py) met hoek ang (rad; negatief = neus omhoog / benen omlaag bij kijk 1); geeft punten in schermcoördinaten
function SP1_zwemRot(ctx, id, x, y, L, ang, px, py, o = {}) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py); const r = zwemmer(ctx, id, x, y, L, o); ctx.restore();
  const R = (p) => { if (!p || p.x == null) return p; const dx = p.x - px, dy = p.y - py; return Object.assign({}, p, { x: px + dx * Math.cos(ang) - dy * Math.sin(ang), y: py + dx * Math.sin(ang) + dy * Math.cos(ang) }); };
  const out = {}; for (const k in r) out[k] = typeof r[k] === 'object' ? R(r[k]) : r[k]; return out; }
function SP1_rot(p, ang, px, py) { const dx = p.x - px, dy = p.y - py; return { x: px + dx * Math.cos(ang) - dy * Math.sin(ang), y: py + dx * Math.sin(ang) + dy * Math.cos(ang) }; }

// ---------- water ----------
// watervlak van wl tot y1 achter de zwemmer; o.amp golfjes, o.snel = hoe snel het oppervlak naar links schuift (px/s), o.boeg = {x, h, kijk} boeggolf
function SP1_water(ctx, wl, o = {}) { const { x0 = 0, x1 = W, y1 = 880, t = 0, amp = 4, snel = 60, boeg = null, kl = SP1.water, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const yy = (x) => { let y = wl + amp * Math.sin((x + t * snel) * 0.025) + amp * 0.5 * Math.sin((x + t * snel * 1.3) * 0.061);
    if (boeg) { const d = (x - boeg.x) * (boeg.kijk || 1); y -= boeg.h * Math.exp(-((d - boeg.h * 0.6) ** 2) / (2 * (boeg.h * 1.1) ** 2)); if (d < 0) y += boeg.h * 0.45 * Math.exp(-((d + boeg.h * 2.4) ** 2) / (2 * (boeg.h * 1.2) ** 2)); } return y; };
  ctx.beginPath(); ctx.moveTo(x0, y1); for (let x = x0; x <= x1; x += 8) ctx.lineTo(x, yy(x)); ctx.lineTo(x1, yy(x1)); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fillStyle = kl; ctx.fill();
  ctx.strokeStyle = SP1.opp; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 8) x === x0 ? ctx.moveTo(x, yy(x)) : ctx.lineTo(x, yy(x)); ctx.stroke(); ctx.restore(); return yy; }
// oppervlak opnieuw over de zwemmer (alleen de lijn, geen vlak): laat zien waar het water ligt
function SP1_oppLijn(ctx, yy, x0, x1, a = 0.9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(SP1.opp, 0.8); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); for (let x = x0; x <= x1; x += 8) x === x0 ? ctx.moveTo(x, yy(x)) : ctx.lineTo(x, yy(x)); ctx.stroke(); ctx.restore(); }
// belletjes die opstijgen vanaf (x, y), drijven met het water mee naar links
function SP1_bellen(ctx, x, y, n, t, o = {}) { const { a = 1, wl = 0, drift = 40, seed = 1, r = 5 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.75); ctx.lineWidth = 2;
  for (let i = 0; i < n; i++) { const per = 2.2 + hash(i * 3.1 + seed) * 1.6, u = ((t + hash(i + seed) * per) % per) / per, by = y - u * 260, bx = x - u * drift + Math.sin(u * 9 + i) * 6 + (hash(i * 7 + seed) - 0.5) * 30;
    if (by < wl + 6) continue; ctx.beginPath(); ctx.arc(bx, by, r * (0.6 + hash(i * 5.3 + seed) * 0.8), 0, 6.283); ctx.stroke(); } ctx.restore(); }
// draaikolk: spiraal die ronddraait
function SP1_wervel(ctx, x, y, r, t, col, a = 1, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 40; k++) { const u = k / 40, an = dir * (u * 9 + t * 3), rr = r * (1 - u * 0.85); const px = x + Math.cos(an) * rr, py = y + Math.sin(an) * rr * 0.8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// dikke pijl (vlak), d = dikte van de steel
function SP1_pijlDik(ctx, x1, y1, x2, y2, d, col, a = 1) { if (a <= 0.01 || d < 0.5) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), kop = Math.min(L * 0.6, Math.max(18, d * 1.9)), kw = Math.max(14, d * 1.15);
  ctx.translate(x1, y1); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -d / 2); ctx.lineTo(L - kop, -d / 2); ctx.lineTo(L - kop, -kw); ctx.lineTo(L, 0); ctx.lineTo(L - kop, kw); ctx.lineTo(L - kop, d / 2); ctx.lineTo(0, d / 2); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// kleine pijltjes water naar achteren (teal) vanaf een punt
function SP1_waterTerug(ctx, x, y, kijk, t, a = 1, n = 3, len = 90) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = ((t * 0.9 + i / n) % 1), xx = x - kijk * (20 + u * len), yy = y + (i - (n - 1) / 2) * 22;
  pijl(ctx, xx + kijk * 30, yy, xx - kijk * 10, yy, C.teal, a * Math.sin(u * Math.PI), 4, 14); } }

// ---------- zwembad ----------
// bovenaanzicht van een bad: x, y linksboven, w, h; banen; geeft de y van het midden van baan i
function SP1_badBoven(ctx, x, y, w, h, banen, o = {}) { const { a = 1, meter = null, hl = -1 } = o; if (a <= 0.01) return () => 0; ctx.save(); ctx.globalAlpha *= a; const bh = h / banen;
  roundRect(ctx, x - 26, y - 26, w + 52, h + 52, 10); shape(ctx, SP1.tegel, SP1.tegelL, 2); ctx.fillStyle = '#1F5C78'; ctx.fillRect(x, y, w, h);
  for (let i = 0; i < banen; i++) { const cy = y + bh * (i + 0.5); if (i === hl) { ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(x, y + bh * i, w, bh); }
    ctx.fillStyle = '#183F55'; ctx.fillRect(x + w * 0.04, cy - 4, w * 0.92, 8); ctx.fillRect(x + w * 0.04 - 2, cy - bh * 0.22, 8, bh * 0.44); ctx.fillRect(x + w * 0.96 - 6, cy - bh * 0.22, 8, bh * 0.44); }
  for (let i = 1; i < banen; i++) { const ly = y + bh * i; for (let xx = x; xx < x + w; xx += 16) { const rand = xx < x + w * 0.1 || xx > x + w * 0.9; ctx.fillStyle = rand ? '#D8573F' : (Math.floor((xx - x) / 16) % 2 ? '#E8E8E2' : '#5BA4C9'); ctx.beginPath(); ctx.arc(xx + 8, ly, 5, 0, 6.283); ctx.fill(); } }
  if (meter) { const s = w / meter; for (const m of [5, 15]) { ctx.strokeStyle = rgba('#E8E8E2', 0.5); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x + m * s, y); ctx.lineTo(x + m * s, y + h); ctx.moveTo(x + w - m * s, y); ctx.lineTo(x + w - m * s, y + h); ctx.stroke(); ctx.setLineDash([]); } }
  ctx.restore(); return (i) => y + bh * (i + 0.5); }
// zwemmer van boven (eenvoudige vorm, zoals in de reeks afgesproken): s = lengte van vingertop tot teen in px
function SP1_zwemmerBoven(ctx, x, y, s, t, kijk = 1, o = {}) { const { a = 1, slag = true, muts = SP1.muts, huid = SP1.huid } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const ph = t * 0.8 * 6.283; ctx.lineCap = 'round';
  // benen
  ctx.strokeStyle = huid; ctx.lineWidth = s * 0.07; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-s * 0.2, k * s * 0.04); ctx.lineTo(-s * 0.52, k * s * (0.045 + 0.015 * Math.sin(ph * 3 + (k > 0 ? 0 : 3.1)))); ctx.stroke(); }
  // armen: om de beurt naar voren
  for (const k of [-1, 1]) { const u = slag ? (Math.sin(ph + (k > 0 ? 0 : Math.PI)) + 1) / 2 : 1, hx = -s * 0.1 + u * s * 0.42, hy = k * s * (0.11 - u * 0.06);
    ctx.strokeStyle = huid; ctx.lineWidth = s * 0.06; ctx.beginPath(); ctx.moveTo(s * 0.1, k * s * 0.1); ctx.lineTo(hx, hy); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-s * 0.05, 0, s * 0.2, s * 0.12, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill();
  ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-s * 0.2, 0, s * 0.06, s * 0.085, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(s * 0.2, 0, s * 0.075, 0, 6.283); ctx.fillStyle = muts; ctx.fill(); ctx.restore(); }
// scorebord met tekst
function SP1_scorebord(ctx, x, y, s2, a = 1, px = 54) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); const w = ctx.measureText(s2).width + 70; roundRect(ctx, x - w / 2, y - px - 22, w, px + 44, 10); shape(ctx, '#101722', '#4A5468', 3);
  text(ctx, s2, x, y + 4, fMeta(px), '#F2C94C', 'center'); ctx.restore(); }
// zijaanzicht van de muur en de kant: muur bij x, kant (vloer) op yKant, naar rechts (kant 1) of links (-1)
function SP1_kant(ctx, x, yKant, kant = 1, o = {}) { const { a = 1, y1 = 1080, rand = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x2 = o.x2 != null ? o.x2 : (kant > 0 ? W + 10 : -10), xa = Math.min(x, x2), w = Math.abs(x2 - x);
  ctx.fillStyle = SP1.tegel; ctx.fillRect(xa, yKant, w, y1 - yKant); ctx.strokeStyle = rgba(SP1.tegelL, 0.9); ctx.lineWidth = 2;
  for (let yy = yKant + 40; yy < Math.min(y1, 880); yy += 40) { ctx.beginPath(); ctx.moveTo(xa, yy); ctx.lineTo(xa + w, yy); ctx.stroke(); }
  for (let xx = x + kant * 40; kant > 0 ? xx < x2 : xx > x2; xx += kant * 40) { ctx.beginPath(); ctx.moveTo(xx, yKant); ctx.lineTo(xx, Math.min(y1, 880)); ctx.stroke(); }
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(xa, yKant - 6, w, 8); ctx.restore(); }

// ---------- klembord (rode draad) ----------
const SP1_KB = [['KRACHT:', 'oker', 30, 190, 0], ['KLEIN BEETJE', 'oker', 30, 234, 0], ['LIGGING', 'goud', 46, 316, 1], ['GRIP', 'goud', 46, 398, 2], ['ONDERWATER', 'goud', 46, 480, 3]];
// n = aantal regels, u = hoe ver de laatste regel geschreven is (0..1); w = breedte
function SP1_klembord(ctx, x, y, w, n, u = 1, o = {}) { const { a = 1, t = 0, nieuw = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 1.3, s = w / 420;
  roundRect(ctx, x, y, w, h, 18 * s); shape(ctx, SP1.bord, '#6E5236', 2); roundRect(ctx, x + 22 * s, y + 46 * s, w - 44 * s, h - 68 * s, 6 * s); shape(ctx, SP1.papier, '#C9CCC4', 1.5);
  roundRect(ctx, x + w / 2 - 70 * s, y - 14 * s, 140 * s, 58 * s, 10 * s); shape(ctx, '#AFB6C0', '#7E8796', 2);
  text(ctx, 'VOORBEELD', x + w / 2, y + 112 * s, fMeta(Math.max(28, 30 * s)), '#5A6070', 'center');
  ctx.strokeStyle = '#C9CCC4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 50 * s, y + 132 * s); ctx.lineTo(x + w - 50 * s, y + 132 * s); ctx.stroke();
  for (let i = 0; i < SP1_KB.length; i++) { const [s2, kl, px0, ry, item] = SP1_KB[i]; if (item > n - 1) continue; const px = Math.max(28, px0 * s), yy = y + ry * s, kleur = kl === 'oker' ? SP1.okerD : SP1.goudD;
    const uu = item === n - 1 ? (item === 0 ? clamp(u * 2 - i, 0, 1) : clamp(u, 0, 1)) : 1; if (uu <= 0) continue; const last = item === n - 1 && uu < 1; ctx.save(); ctx.font = fTekst(px, 800); const tw = ctx.measureText(s2).width; ctx.beginPath(); ctx.rect(x + 46 * s, yy - px - 10, (tw + 10) * uu, px + 30); ctx.clip();
    text(ctx, s2, x + 50 * s, yy, fTekst(px, 800), kleur, 'left'); ctx.restore();
    if (last) { const px2 = x + 50 * s + tw * uu, py2 = yy - px * 0.3 + Math.sin(t * 30) * 3; ctx.save(); ctx.translate(px2, py2); ctx.rotate(-0.7); roundRect(ctx, -6 * s, -90 * s, 12 * s, 90 * s, 4 * s); shape(ctx, '#2F5FA8', '#264E8C', 1.5);
      ctx.beginPath(); ctx.moveTo(-6 * s, 0); ctx.lineTo(0, 14 * s); ctx.lineTo(6 * s, 0); ctx.closePath(); ctx.fillStyle = '#E8D6B0'; ctx.fill(); ctx.restore(); }
    if (item === nieuw && uu >= 1) { ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 50 * s, yy + 12 * s); ctx.lineTo(x + 50 * s + tw, yy + 12 * s); ctx.stroke(); } }
  ctx.restore(); }

// ---------- kleine voorwerpen ----------
// literbakje (kubus van 10 cm), vul = kleur of null (lucht)
function SP1_literbak(ctx, x, y, s, vul, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const d = s * 0.35;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + d, y - d); ctx.closePath(); shape(ctx, vul ? lighten(vul, 0.15) : rgba('#AFC0D0', 0.08), '#AFC0D0', 2.5);
  ctx.beginPath(); ctx.moveTo(x + s, y); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + s + d, y + s - d); ctx.lineTo(x + s, y + s); ctx.closePath(); shape(ctx, vul ? _donker(vul, 0.2) : rgba('#AFC0D0', 0.05), '#AFC0D0', 2.5);
  ctx.beginPath(); ctx.rect(x, y, s, s); shape(ctx, vul || rgba('#AFC0D0', 0.06), '#AFC0D0', 2.5); ctx.restore(); }
function SP1_halter(ctx, x, y, s, col = C.oker, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.fillRect(x - s * 0.5, y - s * 0.06, s, s * 0.12);
  for (const k of [-1, 1]) { roundRect(ctx, x + k * s * 0.42 - s * 0.07, y - s * 0.26, s * 0.14, s * 0.52, s * 0.04); ctx.fill(); roundRect(ctx, x + k * s * 0.3 - s * 0.05, y - s * 0.19, s * 0.1, s * 0.38, s * 0.03); ctx.fill(); } ctx.restore(); }
// denkwolkje met een tekening erin
function SP1_wolkje(ctx, x, y, r, fn, a = 1, kant = -1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#F2F2EE', 0.95);
  ctx.beginPath(); ctx.ellipse(x, y, r * 1.25, r, 0, 0, 6.283); ctx.fill(); circ(ctx, x + kant * r * 0.9, y + r * 1.15, r * 0.17, rgba('#F2F2EE', 0.95)); circ(ctx, x + kant * r * 1.2, y + r * 1.5, r * 0.1, rgba('#F2F2EE', 0.95)); fn(); ctx.restore(); }
// half-ronde meter: v 0..1; ref = streepje (0..1); lab onder
function SP1_meter(ctx, cx, cy, r, v, o = {}) { const { a = 1, lab = '', kl = C.goud, ref = null, refLab = '', tekst = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.lineCap = 'butt'; ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = kl; ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * clamp(v, 0, 1)); ctx.stroke();
  if (ref != null) { const an = Math.PI + Math.PI * ref; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r * 0.78, cy + Math.sin(an) * r * 0.78); ctx.lineTo(cx + Math.cos(an) * r * 1.22, cy + Math.sin(an) * r * 1.22); ctx.stroke();
    if (refLab) metaText(ctx, refLab, cx + Math.cos(an) * r * 1.32, cy + Math.sin(an) * r * 1.32 - 6, C.text2, Math.cos(an) < -0.2 ? 'right' : Math.cos(an) > 0.2 ? 'left' : 'center', 28); }
  const an = Math.PI + Math.PI * clamp(v, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * r * 0.85, cy + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, cx, cy, 9, C.text);
  if (lab) metaText(ctx, lab, cx, cy + 50, C.text2, 'center', 28); if (tekst) text(ctx, tekst, cx, cy + 108, fTekst(40, 800), kl, 'center'); ctx.restore(); }
// horizontale balk met label: frac = lengte (0..1 van w)
function SP1_balk(ctx, x, y, w, frac, kl, lab, waarde, a = 1, h = 54) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#22314C', rgba(C.line, 0.6), 1.5);
  if (frac > 0.003) { roundRect(ctx, x, y, Math.max(h * 0.5, w * frac), h, 10); shape(ctx, rgba(kl, 0.8), kl, 2); }
  if (lab) metaText(ctx, lab, x, y - 16, C.text2, 'left', 28); if (waarde) text(ctx, waarde, x + w * frac + 22, y + h * 0.5 + 15, fTekst(42, 800), C.text, 'left'); ctx.restore(); }
// parabool snelheid → weerstand; u = waar het punt is (0..1 van vmax = 2,2), mark = toon de punten 1× en 2×
function SP1_parabool(ctx, x, y, w, h, o = {}) { const { a = 1, u = 0, m1 = 0, m2 = 0, vmax = 2.2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const X = (v) => x + w * v / vmax, Y = (f) => y + h - h * f / (vmax * vmax);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
  metaText(ctx, 'SNELHEID →', x + w, y + h + 90, C.text2, 'right', 28); metaText(ctx, 'WEERSTAND', x, y - 26, C.koraal, 'left', 28);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const v = vmax * k / 60 * clamp(u > 0 ? 1 : 1, 0, 1); k ? ctx.lineTo(X(v), Y(v * v)) : ctx.moveTo(X(v), Y(v * v)); } ctx.stroke();
  const mk = (v, al, lx, ly) => { if (al <= 0.01) return; laag(ctx, al, () => { stippel(ctx, X(v), y + h, X(v), Y(v * v), C.line, 1, 2); stippel(ctx, x, Y(v * v), X(v), Y(v * v), C.line, 1, 2); circ(ctx, X(v), Y(v * v), 11, C.koraal, '#F2F2EE', 2);
    metaText(ctx, lx, X(v), y + h + 40, C.text, 'center', 30); metaText(ctx, ly, x - 14, Y(v * v) + 10, C.text, 'right', 30); }); };
  mk(1, m1, '1×', '1×'); mk(2, m2, '2×', '4×');
  if (u > 0.01) { const v = vmax * clamp(u, 0, 1); circ(ctx, X(v), Y(v * v), 13, C.goud); } ctx.restore(); }
// vooraanzicht in een kader: het 'gat in het water' (schuin 0..1 maakt het gat hoger)
function SP1_gat(ctx, x, y, w, schuin, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.8; roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), C.line, 2);
  ctx.save(); roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 12); ctx.clip(); const wl = y + h * 0.36; ctx.fillStyle = SP1.water; ctx.fillRect(x, wl, w, h); ctx.strokeStyle = SP1.opp; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, wl); ctx.lineTo(x + w, wl); ctx.stroke();
  const cx = x + w / 2, s = w / 300, gh = 40 + schuin * 120; // gat: wat de zwemmer van voren ziet als vlak dat water opzij moet
  ctx.beginPath(); ctx.ellipse(cx, wl + 18 * s + gh * s * 0.45, 92 * s, (34 + gh * 0.55) * s, 0, 0, 6.283); ctx.fillStyle = rgba(C.koraal, 0.22); ctx.fill(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]);
  // zwemmer van voren: hoofd met badmuts, schouders, armen naar voren (verkort), benen lager naarmate hij schuiner ligt
  ctx.fillStyle = SP1.huid; for (const k of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + k * 30 * s, wl + (34 + schuin * 90) * s + gh * s * 0.35, 13 * s, (16 + schuin * 30) * s, 0, 0, 6.283); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(cx, wl + 26 * s + schuin * 30 * s, 78 * s, 24 * s + schuin * 22 * s, 0, 0, 6.283); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, wl + 2 * s - schuin * 6 * s, 26 * s, 0, 6.283); ctx.fill(); ctx.fillStyle = SP1.muts; ctx.beginPath(); ctx.arc(cx, wl + 2 * s - schuin * 6 * s, 26 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.lineTo(cx + 26 * s, wl - 4 * s - schuin * 6 * s); ctx.lineTo(cx - 26 * s, wl - 4 * s - schuin * 6 * s); ctx.fill();
  ctx.restore(); metaText(ctx, 'VOORAANZICHT', x + w / 2, y + h + 40, C.text2, 'center', 28); ctx.restore(); }
// videokader met clip; fn tekent de inhoud; pauze = pauzeteken
function SP1_video(ctx, x, y, w, h, fn, o = {}) { const { a = 1, u = 0, pauze = false, lab = 'VIDEO' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 10, y - 10, w + 20, h + 64, 18); shape(ctx, '#0D1420', '#4A5468', 3);
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore();
  ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 70, y + h + 24, w - 100, 8); ctx.fillStyle = C.goud; ctx.fillRect(x + 70, y + h + 24, (w - 100) * clamp(u, 0, 1), 8);
  if (pauze) { ctx.fillStyle = C.text; ctx.fillRect(x + 22, y + h + 14, 9, 28); ctx.fillRect(x + 38, y + h + 14, 9, 28); } else { ctx.beginPath(); ctx.moveTo(x + 22, y + h + 13); ctx.lineTo(x + 48, y + h + 28); ctx.lineTo(x + 22, y + h + 43); ctx.closePath(); ctx.fillStyle = C.text; ctx.fill(); }
  metaText(ctx, lab, x + 18, y + 44, C.text, 'left', 28); ctx.restore(); }
// laptop (vooraanzicht) op een tafeltje; fn(sx, sy, sw, sh) tekent het scherm
function SP1_laptop(ctx, x, y, w, fn, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#2A2F3E', '#5A6478', 2); ctx.fillStyle = '#0F1622'; ctx.fillRect(x + 12, y + 12, w - 24, h - 24);
  ctx.save(); ctx.beginPath(); ctx.rect(x + 12, y + 12, w - 24, h - 24); ctx.clip(); fn(x + 12, y + 12, w - 24, h - 24); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x - 20, y + h + 18); ctx.lineTo(x + w + 20, y + h + 18); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); shape(ctx, '#5A6478', '#3A4458', 2); ctx.restore(); }
function SP1_tafel(ctx, x, y, w, h) { ctx.fillStyle = '#5A4A3A'; ctx.fillRect(x, y, w, 14); ctx.fillRect(x + 14, y + 14, 12, h - 14); ctx.fillRect(x + w - 26, y + 14, 12, h - 14); }
// drijvertje (pull buoy) tussen de dijen
function SP1_drijvertje(ctx, x, y, s, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = '#E0B64A'; ctx.beginPath(); ctx.ellipse(-s * 0.35, 0, s * 0.45, s * 0.32, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(s * 0.35, 0, s * 0.45, s * 0.32, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#C99A2E'; ctx.fillRect(-s * 0.05, -s * 0.25, s * 0.1, s * 0.5); ctx.restore(); }
// krachtspoor op een scherm: pieken bij elke duw; f(tt) = 0..1
function SP1_spoor(ctx, x, y, w, h, t, f, o = {}) { const { venster = 4, kl = C.oker } = o; ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 120; k++) { const tt = t - venster + venster * k / 120, v = tt < 0 ? 0 : f(tt); const px = x + w * k / 120, py = y + h - h * 0.9 * v; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
// goud omlijnde peddel: capsule van de hand (hx, hy) naar de elleboog (ex, ey)
function SP1_peddel(ctx, hx, hy, ex, ey, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(ey - hy, ex - hx), L = Math.hypot(ex - hx, ey - hy); ctx.translate(hx, hy); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(0, -r * 1.25); ctx.lineTo(L, -r); ctx.arc(L, 0, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(0, r * 1.25); ctx.arc(0, 0, r * 1.25, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
// boeilijn (15 m): stippellijn met drijvers aan het oppervlak
function SP1_boeilijn(ctx, x, wl, y1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; stippel(ctx, x, wl, x, y1, C.goud, 1, 3); for (let k = -1; k <= 1; k++) circ(ctx, x + k * 22, wl - 4, 9, k ? '#E8E8E2' : '#D8573F'); ctx.restore(); }
// Wat word jij? · Sport en topsport 1 · Glijden, trekken, drijven — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. Sam (outfit 'zwem') = de zwemmer, de zwemtrainer, een bewegingswetenschapper (figurant 'passant', naamloos).
// Zwembad zelf getekend in schema-stijl (bovenaanzicht van de banen, zijaanzicht onder water); grafieken en balken op navy.
// Rode draad: het klembord van de trainer (VOORBEELD, zonder tijden). Geen namen in beeld.

const SP1_L = 480; // standaardlengte van Sam in het water (px)
function sp1Crawl(ctx, x, wl, L, t, o = {}) { return zwemmer(ctx, 'sam', x, wl + 0.12 * L, L, Object.assign({ slag: 'crawl', t }, o)); }
// stapsgewijs tempo: fase loopt door zonder sprong
function sp1Tijd(t, t0, k) { return t + (k - 1) * Math.max(0, t - t0); }
// weerstandspijlen bij een crawlende zwemmer (kijk 1): d = [wrijving, vorm, golven], a = [..]
function sp1Weerstand(ctx, r, yy, t, d, a, o = {}) { const { lab = [1, 1, 1], tegen = 0 } = o;
  const hx = r.hoofd.x, hy = r.hoofd.y, sx = r.heup.x;
  // wrijving: dunne pijltjes langs de huid (rug en buik)
  laag(ctx, a[0], () => { for (let i = 0; i < 4; i++) { const x = sx - 40 + i * 95, u = ((t * 0.8 + i * 0.25) % 1); SP1_pijlDik(ctx, x + 50 - u * 30, r.heup.y + 44, x - 20 - u * 30, r.heup.y + 44, d[0], C.koraal, 0.95); }
    naamBij(ctx, 'wrijving', 'langs de huid', sx - 120, r.heup.y + 200, lab[0], 'left'); });
  // vorm: water voor de kop, draaikolken achter de heupen
  laag(ctx, a[1], () => { SP1_pijlDik(ctx, hx + 330, hy + 60, hx + 150, hy + 60, d[1], C.koraal, 1);
    SP1_wervel(ctx, r.voet.x + 40, r.heup.y + 70, 34, t, C.koraal, 0.9, -1); SP1_wervel(ctx, r.voet.x - 50, r.heup.y + 40, 26, t + 1, C.koraal, 0.8, -1);
    naamBij(ctx, 'vorm', 'draaikolken erachter', hx + 160, hy + 60 + Math.max(d[1], 20) + 46, lab[1], 'left'); });
  // golven: boeggolf aan het oppervlak
  laag(ctx, a[2], () => { const y0 = yy(hx + 100) - 40; SP1_pijlDik(ctx, hx + 300, y0, hx + 130, y0, d[2], C.koraal, 1); naamBij(ctx, 'golven', 'aan het oppervlak', hx + 140, y0 - Math.max(d[2], 20) - 18, lab[2], 'left'); }); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); roundRect(ctx, 1000, 500, 860, 360, 22); ctx.clip(); ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 500, 860, 360);
    const yy = SP1_water(ctx, 560, { x0: 1000, x1: 1860, y1: 880, t, amp: 3, snel: 30 }); const x = 1180 + 90 * Math.min(t, 6) - 4 * Math.min(t, 6) ** 2;
    const r = zwemmer(ctx, 'sam', x, 720, 380, { slag: 'stroomlijn', t }); SP1_bellen(ctx, r.voet.x - 10, r.voet.y, 6, t, { wl: 560, seed: 3 }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('moet', 1, 0.4), Cc = q.on('Water', 1, 0.4), D = q.on('Waarom', 1, 0.5);
    // A: bovenaanzicht 50-meterbad, de zwemmer tikt aan
    laag(ctx, 1 - B, () => { const yl = SP1_badBoven(ctx, 160, 200, 1600, 480, 6, { meter: 50, hl: 3 }); const tik = q.at('tikt', 1), u = Math.min(t, tik);
      const x = 1743 - 54 * (tik - u); SP1_zwemmerBoven(ctx, x, yl(3), 62, t, 1, { slag: t < tik });
      metaText(ctx, '50 M', 960, 760, C.text2, 'center', 28); lijn(ctx, [[160, 730], [1760, 730]], C.line, 2); lijn(ctx, [[160, 718], [160, 742]], C.line, 2); lijn(ctx, [[1760, 718], [1760, 742]], C.line, 2);
      laag(ctx, vensterA(t, tik, tik + 1.2, 0.2), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1760, yl(3), 30 + 30 * ramp(t, tik, 1.2), 0, 6.283); ctx.stroke(); });
      SP1_scorebord(ctx, 1560, 140, '100 M · VRIJ', 1, 44); laag(ctx, q.on('klok', 1, 0.3), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, 1360, 74, 400, 112, 12); ctx.stroke(); }); });
    // B: aan de muur; de zwemmer wil sterker worden, de trainer schudt het hoofd
    laag(ctx, B * (1 - Cc), () => { const wl = 600; SP1_water(ctx, wl, { x1: 1240, y1: 1080, t, amp: 3 }); SP1_kant(ctx, 1240, 572, 1);
      sp1Sam(ctx, 1110, 870, 430, t, { uit: q.on('schudt', 1) > 0.5 ? 'verbaasd' : 'neutraal', kijk: 1 });
      SP1_water(ctx, wl, { x1: 1240, y1: 1080, t, amp: 3 });
      const sch = q.at('schudt', 1), kk = t > sch && t < sch + 1.3 ? (Math.sin((t - sch) * 14) > 0 ? 1 : -1) : -1;
      sp1Trainer(ctx, 1560, 572, 430, t, { kijk: kk, uit: q.on('schudt', 1) > 0.5 ? 'neutraal' : 'blij' });
      SP1_wolkje(ctx, 820, 330, 80, () => SP1_halter(ctx, 820, 330, 110), q.on('sterker', 1, 0.4), 1);
      SP1_scorebord(ctx, 360, 200, '100 M · VRIJ', 1, 40); });
    // C: water tegen lucht
    laag(ctx, Cc * (1 - D), () => { SP1_literbak(ctx, 520, 400, 260, SP1.water); SP1_literbak(ctx, 1160, 400, 260, null);
      text(ctx, 'water', 650, 730, fTekst(44, 700), C.text, 'center'); text(ctx, 'lucht', 1290, 730, fTekst(44, 700), C.text, 'center'); metaText(ctx, '1 LITER', 650, 780, C.text2, 'center', 28); metaText(ctx, '1 LITER', 1290, 780, C.text2, 'center', 28);
      laag(ctx, q.on('achthonderd', 1, 0.4), () => text(ctx, 'ruim 800 × zo dicht', 960, 260, fTitel(72), C.teal, 'center')); });
    // D: puzzel
    laag(ctx, D, () => { kaart(ctx, 260, 230, 1400, 420, 1, C.goud); text(ctx, 'Houding of spieren?', 960, 360, fTitel(80), C.text, 'center');
      zwemmer(ctx, 'sam', 560, 520, 300, { slag: 'stroomlijn', t }); metaText(ctx, 'HOUDING', 620, 610, C.goud, 'center', 28);
      SP1_halter(ctx, 1320, 510, 170, C.oker); metaText(ctx, 'KRACHT', 1320, 610, C.oker, 'center', 28); vraagteken(ctx, 960, 590, q.on('houding', 1, 0.4), 120); }); },

  // ---------- H1 Drie soorten weerstand ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const wl = 470, L = SP1_L, Dr = q.on('drie', 1, 0.5), Gl = q.on('golven', 1, 0.5);
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140, boeg: Gl > 0.01 ? { x: 1180, h: 22 * Gl, kijk: 1 } : null });
    const r = sp1Crawl(ctx, 620, wl, L, t);
    // eerst één pijl: weerstand
    laag(ctx, q.on('tegen', 1, 0.4) * (1 - Dr), () => { SP1_pijlDik(ctx, r.hoofd.x + 360, r.hoofd.y + 30, r.hoofd.x + 160, r.hoofd.y + 30, 24, C.koraal); naamBij(ctx, 'weerstand', 'tegen je richting in', r.hoofd.x + 170, r.hoofd.y + 120, 1, 'left');
      pijl(ctx, 160, 820, 360, 820, C.goud, 1, 4, 18); metaText(ctx, 'ZWEMRICHTING', 160, 860, C.text2, 'left', 28); });
    // literbakjes
    laag(ctx, q.on('liter', 1, 0.4) * (1 - Dr), () => { SP1_literbak(ctx, 160, 200, 130, SP1.water); SP1_literbak(ctx, 470, 200, 130, null);
      metaText(ctx, 'WATER · 1 L', 225, 372, C.text2, 'center', 28); metaText(ctx, 'LUCHT · 1 L', 535, 372, C.text2, 'center', 28);
      laag(ctx, q.on('kilo', 1, 0.4), () => text(ctx, '1 kilo', 225, 426, fTekst(40, 800), C.teal, 'center')); laag(ctx, q.on('gram', 1, 0.4), () => text(ctx, '1,2 gram', 535, 426, fTekst(40, 800), C.text, 'center')); });
    // drie soorten
    const Wr = q.on('Wrijving', 1, 0.5), Vo = q.on('Vorm', 1, 0.5), d = 16;
    sp1Weerstand(ctx, r, yy, t, [d * 0.7, d, d], [Wr, Vo, Gl]);
    laag(ctx, q.on('draaikolken', 1, 0.4), () => {});
    vraagteken(ctx, 1700, 300, q.on('twee', 1, 0.4), 130); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: de vorm en de golven', 1 - q.on('groeit', 1, 0.4)); const wl = 470, L = SP1_L, G = q.on('groeit', 1, 0.6);
    laag(ctx, 1 - G, () => { const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140, boeg: { x: 1180, h: 22 + 12 * q.on('Vorm', 1, 1), kijk: 1 } }); const r = sp1Crawl(ctx, 620, wl, L, t);
      const u = q.on('Vorm', 1, 1.0), k = q.on('kleinst', 1, 0.8);
      sp1Weerstand(ctx, r, yy, t, [lerp(11, 6, k), lerp(16, 34, u), lerp(16, 34, u)], [1, 1, 1]);
      laag(ctx, q.on('helft', 1, 0.4), () => tag(ctx, 'TOT ± DE HELFT', 1530, 300, C.koraal, 1, 'center', 30));
      metaA(ctx, 'SCHATTINGEN LOPEN UITEEN', 1800, 220, q.on('schattingen', 1, 0.4), C.grain, 'right', 28); });
    laag(ctx, G, () => { SP1_parabool(ctx, 420, 220, 1000, 540, { u: ramp(t, q.at('groeit', 1), 2.5) * (1 - q.on('Zwem', 2, 0.3)), m1: q.on('Zwem', 2, 0.4), m2: q.on('vier', 1, 0.4) });
      laag(ctx, q.on('vier', 1, 0.4), () => { tag(ctx, '2× zo snel → ± 4× zoveel weerstand', 1180, 200, C.koraal, 1, 'center', 32); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const wl = 520, L = SP1_L, tt = sp1Tijd(t, q.at('armen', 1), 1.6);
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 140 + 60 * q.on('armen', 1, 0.6) });
    const r = sp1Crawl(ctx, 520, wl, L, tt);
    // harder duwen: kracht (oker) bij de hand
    laag(ctx, q.on('harder', 1, 0.4), () => { if (r.handR.y > yy(r.handR.x) + 10) SP1_pijlDik(ctx, r.handR.x + 10, r.handR.y, r.handR.x - 120, r.handR.y, 14, C.oker, 0.95); naamBij(ctx, 'harder duwen', '', 200, 800, 1, 'left', C.oker); });
    laag(ctx, q.on('armen', 1, 0.4), () => naamBij(ctx, 'sneller bewegen', '', 560, 800, 1, 'left', C.oker));
    // vermogen en snelheid
    const St = q.on('Stel', 1, 0.5), P = q.on('tien', 1, 0.8);
    laag(ctx, St, () => { kaart(ctx, 1130, 110, 740, 390, 1); SP1_meter(ctx, 1360, 330, 120, 0.5 + 0.08 * P, { lab: 'VERMOGEN', kl: C.oker, tekst: P > 0.5 ? '+10 %' : '' });
      metaA(ctx, 'ENERGIE PER SECONDE', 1360, 165, q.on('energie', 1, 0.4), C.oker, 'center', 28);
      laag(ctx, q.on('Hoeveel', 1, 0.4), () => { SP1_meter(ctx, 1680, 330, 120, 0.5, { lab: 'SNELHEID', kl: C.goud }); vraagteken(ctx, 1680, 470, 1, 90); }); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: ongeveer drie procent sneller', 1);
    const X = 120, Wb = 820, f = (p) => 0.6 * p, A2 = q.on('Andersom', 1, 0.5);
    SP1_balk(ctx, X, 290, Wb, f(1.1), C.oker, 'VERMOGEN', '+10 %', 1);
    SP1_balk(ctx, X, 410, Wb, f(1 + 0.03 * q.on('drie', 1, 0.8)), C.goud, 'SNELHEID', q.on('drie', 1) > 0.5 ? '+3 %' : '', 1);
    laag(ctx, A2, () => { SP1_balk(ctx, X, 590, Wb, f(1 + 0.1 * q.on('tien', 1, 0.8)), C.goud, 'SNELHEID', q.on('tien', 1) > 0.5 ? '+10 %' : '', 1);
      SP1_balk(ctx, X, 710, Wb, f(1 + 0.33 * q.on('derde', 1, 1.0)), C.oker, 'VERMOGEN', q.on('derde', 1) > 0.5 ? '± +33 %' : '', 1);
      metaA(ctx, '1,1 × 1,1 × 1,1 ≈ 1,33', X, 830, q.on('nodig', 1, 0.4), C.text2, 'left', 30); });
    lijn(ctx, [[X + Wb * 0.6, 260], [X + Wb * 0.6, 780]], rgba(C.line, 0.7), 2); metaText(ctx, 'NU', X + Wb * 0.6, 250, C.text2, 'center', 28);
    const Du = q.on('Duur', 1, 0.3);
    laag(ctx, Du, () => { SP1_klembord(ctx, 1210, 300, 340, 1, ramp(t, q.at('klembord', 1), 1.6), { t });
      sp1Trainer(ctx, 1730, 860, 520, t, { kijk: -1, uit: t < q.at('schrijft', 1) ? 'praat' : 'neutraal', pose: 'wijs', zonderBord: true }); }); },

  // ---------- H2 Drijven en ligging ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const Sl = q.on('slag', 1, 0.5);
    laag(ctx, 1 - Sl, () => { // A: stil drijven, camera zoomt in
      const z = lerp(1, 1.55, ramp(t, q.at('Lig', 1), 1.6)), Z = (p) => ({ x: 960 + (p.x - 900) * z, y: 470 + (p.y - 470) * z });
      const wl = 430, L = 330, hx = 760, hy = wl + 0.09 * L, ang = -0.42 * ease(clamp((t - q.at('zakken', 1)) / (q.at('omlaag', 1) + 0.8 - q.at('zakken', 1)), 0, 1)), px = hx + 0.36 * L, py = hy - 0.02 * L;
      ctx.save(); ctx.translate(960, 470); ctx.scale(z, z); ctx.translate(-900, -470);
      SP1_water(ctx, wl, { x0: -400, x1: 1500, y1: 1300, t, amp: 3, snel: 10 }); SP1_kant(ctx, 1500, 404, 1, { y1: 1300 });
      laag(ctx, 1 - q.on('Lig', 1, 0.6), () => sp1Trainer(ctx, 1720, 404, 330, t, { zij: true, kijk: -1 }));
      const r = SP1_zwemRot(ctx, 'sam', hx, hy, L, ang, px, py, { slag: 'stroomlijn', t, bril: 'ogen' }); ctx.restore();
      const db = Z({ x: px, y: py }), zp = Z(SP1_rot({ x: hx + 0.1 * L, y: hy + 0.01 * L }, ang, px, py));
      laag(ctx, q.on('longen', 1, 0.4), () => { circ(ctx, db.x, db.y, 14, C.goud, '#F2F2EE', 2); laag(ctx, q.on('drijven', 1, 0.4), () => SP1_pijlDik(ctx, db.x, db.y - 20, db.x, db.y - 130, 12, C.goud)); naamBij(ctx, 'drijfpunt', 'longen vol lucht', db.x + 30, db.y - 150, 1, 'left', C.goud); });
      laag(ctx, q.on('zwaartepunt', 1, 0.4), () => { circ(ctx, zp.x, zp.y, 14, C.oker, '#F2F2EE', 2); SP1_pijlDik(ctx, zp.x, zp.y + 20, zp.x, zp.y + 130, 12, C.oker); naamBij(ctx, 'zwaartepunt', 'richting de heupen', zp.x - 30, zp.y + 190, 1, 'right', C.oker); });
      laag(ctx, q.on('wip', 1, 0.4) * (1 - q.on('gat', 1, 0.4)), () => tag(ctx, 'BORST OMHOOG · BENEN OMLAAG', 960, 160, C.goud, 1, 'center', 32));
      const Ga = q.on('gat', 1, 0.5), sch = clamp(-ang / 0.42, 0, 1);
      laag(ctx, Ga, () => { SP1_gat(ctx, 1480, 110, 340, sch * ramp(t, q.at('gat', 1), 1.5)); text(ctx, 'gat in het water', 1650, 480, fTekst(36, 700), C.koraal, 'center');
        const hd = Z(r.hoofd); laag(ctx, q.on('vormweerstand', 1, 0.4), () => SP1_pijlDik(ctx, hd.x + 300, hd.y + 80, hd.x + 110, hd.y + 80, 12 + 22 * ramp(t, q.at('vormweerstand', 1), 1.2), C.koraal)); }); });
    laag(ctx, Sl, () => { // B: in de slag kijkt hij vooruit naar de muur
      const wl = 560, L = SP1_L, hx = 560, yy = SP1_water(ctx, wl, { x1: 1600, t, amp: 4, snel: 140, boeg: { x: 1040, h: 30, kijk: 1 } }); SP1_kant(ctx, 1600, 532, 1);
      const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, -0.12, hx, wl + 0.12 * L, { slag: 'crawl', t });
      laag(ctx, q.on('muur', 1, 0.4), () => { stippel(ctx, r.hoofd.x + 30, r.hoofd.y - 6, 1590, r.hoofd.y - 40, C.goud, 1, 3); naamBij(ctx, 'kijkt vooruit', '', 1200, r.hoofd.y - 70, 1, 'left', C.goud); });
      laag(ctx, q.on('doet', 1, 0.4), () => { SP1_pijlDik(ctx, r.hoofd.x + 330, r.hoofd.y + 90, r.hoofd.x + 150, r.hoofd.y + 90, 24, C.koraal); naamBij(ctx, 'vorm', '', r.hoofd.x + 160, r.hoofd.y + 170, 1, 'left'); vraagteken(ctx, r.hoofd.x + 400, r.hoofd.y + 130, 1, 110); }); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: meer weerstand', 1 - q.on('Kijk', 1, 0.4));
    const wl = 560, L = SP1_L, hx = 560, La = q.on('laag', 1, 0.5), ang = -0.12 * (1 - ease(ramp(t, q.at('laag', 1) - 0.2, 1.2))), Kb = q.on('klembord', 1, 0.5);
    const yy = SP1_water(ctx, wl, { x1: 1600, t, amp: 4, snel: 140, boeg: { x: 1040, h: 30 - 12 * La, kijk: 1 } }); SP1_kant(ctx, 1600, 532, 1);
    laag(ctx, q.on('Kijk', 1, 0.3), () => sp1Trainer(ctx, 1770, 532, 480, t, { kijk: -1, pose: 'wijs', uit: t < q.at('trainer', 1) + 0.6 ? 'praat' : 'neutraal', zonderBord: Kb > 0.01 }));
    const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, ang, hx, wl + 0.12 * L, { slag: 'crawl', t });
    // vormpijl: dikker bij hoofd omhoog, dunner bij hoofd laag
    const dv = lerp(lerp(24, 40, q.on('Met', 1, 1)), 18, La); SP1_pijlDik(ctx, r.hoofd.x + 330, r.hoofd.y + 90, r.hoofd.x + 150, r.hoofd.y + 90, dv, C.koraal); naamBij(ctx, 'vorm', '', r.hoofd.x + 160, r.hoofd.y + 170 + (dv - 24) * 0.5, 1, 'left');
    // kijklijn: vooruit → naar de bodem
    const Bo = q.on('bodem', 1, 0.6); laag(ctx, 1 - Bo, () => stippel(ctx, r.hoofd.x + 30, r.hoofd.y - 6, 1590, r.hoofd.y - 40, C.goud, 1, 3));
    laag(ctx, Bo * (1 - Kb), () => { stippel(ctx, r.hoofd.x + 10, r.hoofd.y + 20, r.hoofd.x + 90, 870, C.goud, 1, 3); naamBij(ctx, 'kijk naar de bodem', '', r.hoofd.x + 110, 840, 1, 'left', C.goud); });
    // tekstbalk: één tegelijk
    const T1 = q.on('sleepproef', 1, 0.4) * (1 - q.on('laag', 1, 0.3)), T2 = ramp(t, q.at('laag', 1) + 0.3, 0.3) * (1 - q.on('kost', 1, 0.3)), T3 = ramp(t, q.at('kost', 1) + 0.3, 0.3);
    laag(ctx, T1, () => { tag(ctx, 'HOOFD OMHOOG: ± 5–10 % MEER WEERSTAND', 120, 270, C.koraal, 1, 'left', 32); metaText(ctx, 'SLEEPPROEF · 10 ZWEMMERS', 140, 340, C.grain, 'left', 28); });
    laag(ctx, T2, () => tag(ctx, 'HOOFD LAAG · LICHAAM VLAK', 120, 270, C.goud, 1, 'left', 32));
    laag(ctx, T3, () => tag(ctx, 'KOST ZELF GEEN EXTRA VERMOGEN', 120, 270, C.goud, 1, 'left', 32));
    laag(ctx, q.on('beenslag', 1, 0.4) * (1 - Kb * 0.0), () => naamBij(ctx, 'korte beenslag', '', r.voet.x - 60, wl + 200, 1, 'left', C.goud));
    laag(ctx, q.on('Met', 1, 0.4) * (1 - Kb), () => SP1_gat(ctx, 960, 120, 300, 1 - La));
    laag(ctx, Kb, () => SP1_klembord(ctx, 1110, 110, 320, 2, ramp(t, q.at('ligging', 1), 1.0), { t })); },

  // ---------- H3 Voortstuwing en de catch ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Hv = q.at('Hoe', 1), tv = Math.min(t, Hv), Vx = 110, Vy = 150, Vw = 1200, Vh = 620;
    SP1_video(ctx, Vx, Vy, Vw, Vh, () => { const wl = Vy + 140, L = 620; SP1_water(ctx, wl, { x0: Vx, x1: Vx + Vw, y1: Vy + Vh, t: tv * 0.5, amp: 3, snel: 60 });
      const r = zwemmer(ctx, 'sam', Vx + 450, wl + 0.12 * L, L, { slag: 'crawlLek', t: tv, tempo: 0.5 }); const p = r.fase;
      const lek = (0.45 + 0.55 * vensterA(p, 0.24, 0.62, 0.06)) * q.on('glipt', 1, 0.4);
      laag(ctx, lek, () => { const bx = r.handR.x - 20, by = r.handR.y + 10; SP1_wervel(ctx, bx, by, 40, tv, C.teal, 1); SP1_wervel(ctx, bx - 90, by - 30, 30, tv + 0.7, C.teal, 0.9); SP1_wervel(ctx, bx + 70, by + 40, 26, tv + 1.4, C.teal, 0.8);
        naamBij(ctx, 'lek', 'hand glipt weg', bx + 70, by + 90, 1, 'left', C.teal); });
      vraagteken(ctx, Vx + Vw - 160, Vy + Vh - 120, q.on('Hoe', 1, 0.4), 130); }, { u: tv / 12, pauze: t >= Hv, lab: 'VIDEO · SLOW MOTION' });
    const Ro = q.on('roert', 1, 0.3); sp1Trainer(ctx, 1640, 860, 560, t, { kijk: -1, pose: Ro > 0.5 ? 'wijs' : 'staan', uit: t > q.at('roert', 1) - 0.3 && t < q.at('vast', 2) + 0.4 ? 'praat' : 'neutraal' }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: met een hoge elleboog water naar achteren duwen', 1);
    const wl = 360, L = 620, hx = 700, k = 0.45, T0 = q.at('Veel', 1), f = 0.8 * k;
    // na 'Veel' stopt de arm bij de catch (fase 0.26)
    const P0 = T0 * f, pHold = Math.ceil(P0 - 0.26) + 0.26, Ph = t * f, fase = t >= T0 ? lerp(P0, pHold, ease((t - T0) / 1.4)) : Ph;
    const Dn = vensterA(t, q.at('beneden', 1), q.at('Onderzoekers', 1) + 0.6, 0.8), ang = -0.2 * Dn;
    const yy = SP1_water(ctx, wl, { t, amp: 4, snel: 100 });
    const r = SP1_zwemRot(ctx, 'sam', hx, wl + 0.12 * L, L, ang, hx, wl + 0.12 * L, { slag: 'crawl', fase });
    // voortstuwing: goud vooruit, teal water naar achteren
    const Vo = q.on('vooruit', 1, 0.4) * (1 - Dn);
    laag(ctx, Vo, () => { SP1_pijlDik(ctx, r.heup.x - 40, wl - 70, r.heup.x + 340, wl - 70, 20, C.goud); naamBij(ctx, 'voortstuwing', '', r.heup.x - 40, wl - 120, q.on('voortstuwing', 1, 0.4), 'left', C.goud); });
    laag(ctx, q.on('achteren', 1, 0.4) * (1 - Dn), () => { if (r.handR.y > wl + 20) SP1_waterTerug(ctx, r.handR.x, r.handR.y, 1, t, 1, 3, 110); });
    // naar beneden duwen: voorkant omhoog, benen zakken
    laag(ctx, Dn, () => { SP1_pijlDik(ctx, r.handR.x, r.handR.y + 20, r.handR.x, r.handR.y + 140, 14, C.koraal); naamBij(ctx, 'naar beneden', '', r.handR.x + 40, r.handR.y + 110, 1, 'left', C.koraal);
      laag(ctx, q.on('zakken', 1, 0.4), () => SP1_pijlDik(ctx, r.voet.x + 40, r.voet.y + 20, r.voet.x + 40, r.voet.y + 140, 14, C.koraal)); });
    metaA(ctx, 'VERMOEDEN', 1800, 220, vensterA(t, q.at('Onderzoekers', 1), T0, 0.4), C.grain, 'right', 28);
    // catch: onderarm verticaal, elleboog hoog; hand + stuk onderarm = peddel
    const Ca = q.on('onderarm', 1, 0.5), fa = L * 1.04 / 6.1 * 1.2;
    if (t >= T0) { const ex = r.handR.x - 0.12 * fa, ey = r.handR.y - 0.99 * fa;
      laag(ctx, Ca, () => { SP1_peddel(ctx, r.handR.x, r.handR.y, lerp(r.handR.x, ex, 0.62), lerp(r.handR.y, ey, 0.62), 30, 1); naamBij(ctx, 'hand + onderarm', 'peddel', r.handR.x + 70, r.handR.y + 10, 1, 'left', C.goud); });
      laag(ctx, q.on('elleboog', 1, 0.4), () => naamBij(ctx, 'elleboog hoog', '', ex + 40, ey - 40, 1, 'left'));
      laag(ctx, q.on('catch', 1, 0.4), () => tag(ctx, 'CATCH', r.handR.x - 260, r.handR.y + 150, C.goud, 1, 'center', 40));
      laag(ctx, q.on('mee', 1, 0.4), () => { SP1_waterTerug(ctx, r.handR.x - 20, r.handR.y - 10, 1, t, 1, 2, 120); SP1_waterTerug(ctx, lerp(r.handR.x, ex, 0.45) - 20, lerp(r.handR.y, ey, 0.45), 1, t + 0.4, 1, 2, 120); }); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const Ka = q.on('beter', 1, 0.5), Mb = q.on('Bewegingswetenschappers', 1, 0.5), Ba = q.on('Wedstrijdzwemmers', 1, 0.5);
    // A: weggeduwd water neemt energie mee
    laag(ctx, 1 - Ka, () => { const u = ramp(t, q.at('wegduwt', 1) - 0.4, 1.6); ctx.beginPath(); ctx.ellipse(1060 - 260 * u, 460, 120, 90, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 3);
      SP1_pijlDik(ctx, 1260 - 260 * u, 460, 1190 - 260 * u, 460, 18, C.goud); naamBij(ctx, 'weggeduwd water', '', 1060 - 260 * u, 600, 1, 'center', C.teal);
      laag(ctx, q.on('energie', 1, 0.4), () => { SP1_balk(ctx, 560, 720, 800, 0.6 * ramp(t, q.at('energie', 1), 1), C.oker, 'ENERGIE IN HET WATER', '', 1, 44); }); });
    // B: weinig water snel tegen veel water rustig
    laag(ctx, Ka * (1 - Mb), () => { const pan = (x, kop, m, v, E, aa) => laag(ctx, aa, () => { kaart(ctx, x, 200, 780, 600, 1); metaText(ctx, kop, x + 390, 260, C.text, 'center', 28);
        const u = ((t * v * 0.35) % 1), bx = x + 600 - u * 420, r0 = 40 * Math.sqrt(m); ctx.beginPath(); ctx.ellipse(bx, 450, r0 * 1.2, r0, 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 3);
        SP1_pijlDik(ctx, bx - r0 * 1.2 - 10, 450, bx - r0 * 1.2 - 10 - 40 * v, 450, 12, C.teal); SP1_balk(ctx, x + 60, 680, 660, E, C.oker, 'ENERGIE MEE', '', 1, 44); });
      pan(140, 'VEEL WATER · RUSTIG', 4, 1, 0.22, q.on('veel', 1, 0.4)); pan(1000, 'WEINIG WATER · HEEL SNEL', 1, 4, 0.88, q.on('weinig', 1, 0.4)); });
    // C: de meetbaan in Amsterdam
    laag(ctx, Mb * (1 - Ba), () => { const wl = 520, L = 300, v = 1.1 * L / 1.79, sc = v * t, hy = wl + 0.12 * L, ys = wl + 0.8 / 1.79 * L, tt = t;
      SP1_water(ctx, wl, { x1: 1400, t, amp: 3, snel: v }); SP1_kant(ctx, 1400, 494, 1);
      lijn(ctx, [[0, ys], [1400, ys]], '#AFB6C0', 7); metaA(ctx, 'STANG ± 0,8 M ONDER WATER', 120, ys + 70, q.on('plaatjes', 1, 0.4), C.text2, 'left', 28);
      const r = zwemmer(ctx, 'sam', 700, hy, L, { slag: 'crawl', t: tt });
      for (let k = -2; k < 9; k++) { const px = ((k * 226 - sc) % 2034 + 2034) % 2034 - 200; if (px < -20 || px > 1400) continue; const hit = Math.abs(px - r.handR.x) < 40 && r.handR.y > ys - 60;
        ctx.fillStyle = hit ? C.goud : '#D0D6DE'; ctx.fillRect(px - 7, ys - 46, 14, 46); }
      SP1_drijvertje(ctx, lerp(r.heup.x, r.voet.x, 0.28), lerp(r.heup.y, r.voet.y, 0.28) + 4, 26);
      const F = (x) => { const p = (x * 0.8) % 1, b = (pp) => { const w = ((pp % 1) + 1) % 1; return w > 0.3 && w < 0.62 ? Math.sin(Math.PI * (w - 0.3) / 0.32) : 0; }; return Math.max(b(p), b(p + 0.5)); };
      SP1_tafel(ctx, 1450, 400, 280, 94); SP1_laptop(ctx, 1470, 226, 240, (sx, sy, sw, sh) => SP1_spoor(ctx, sx + 8, sy + 10, sw - 16, sh - 20, tt, F, { venster: 3 }));
      persoon(ctx, 'passant', 1830, 494, 300, { t, kijk: -1, uit: 'neutraal', pose: q.on('rekenden', 1) > 0.5 ? 'wijs' : 'staan' });
      metaText(ctx, 'MEETBAAN · AMSTERDAM', 120, 160, C.text2, 'left', 28);
      metaA(ctx, 'KRACHT', 1590, 200, q.on('kracht', 1, 0.4) * (1 - q.on('rekenden', 1, 0.4)), C.oker, 'center', 28);
      metaA(ctx, 'ENERGIE IN HET WATER (BEREKEND)', 1880, 200, q.on('rekenden', 1, 0.4), C.oker, 'right', 28); });
    // D: zwemmers tegen triatleten
    laag(ctx, Ba, () => { tag(ctx, 'EVEN VEEL ENERGIE', 160, 230, C.oker, q.on('even', 1, 0.4), 'left', 32); const X = 160, Wb = 1000;
      SP1_balk(ctx, X, 340, Wb, 1.11 / 1.3, C.goud, 'WEDSTRIJDZWEMMERS', '1,11 m/s', 1);
      SP1_balk(ctx, X, 480, Wb, 0.9 / 1.3, C.goud, 'TRIATLETEN', '0,90 m/s', q.on('triatleten', 1, 0.4));
      laag(ctx, q.on('verloren', 1, 0.4), () => { metaText(ctx, 'ENERGIE AAN WEGGEDUWD WATER', X, 640, C.teal, 'left', 28); SP1_balk(ctx, X, 660, 700, 0.28 / 0.45, C.teal, '', 'zwemmers', 1, 44); SP1_balk(ctx, X, 730, 700, 0.39 / 0.45, C.teal, '', 'triatleten', 1, 44); });
      metaText(ctx, 'TOUSSAINT 1990 · KLEINE GROEP', 1800, 850, C.grain, 'right', 28); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const Ac = q.on('achteren', 1, 0.4), Kb = q.on('klembord', 1, 0.4);
    tag(ctx, 'TECHNIEK VERSCHILT · PRINCIPE GELIJK', 730, 112, C.goud, q.on('principe', 1, 0.4), 'center', 30);
    const B = [['rug', 'bilal', 'RUGSLAG', 'Rugslag'], ['vlinder', 'daan', 'VLINDERSLAG', 'vlinderslag'], ['school', 'noor', 'SCHOOLSLAG', 'schoolslag'], ['crawl', 'sam', 'VRIJE SLAG', 'vrije']];
    B.forEach(([slag, id, nm, cue], i) => { const top = 148 + i * 180, wl = top + 88, L = 240, hl = q.on(cue, 1, 0.4);
      const yy = SP1_water(ctx, wl, { x0: 120, x1: 1340, y1: top + 172, t: t + i, amp: 3, snel: 90 });
      laag(ctx, hl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, 120, top + 4, 1220, 168, 10); ctx.stroke(); });
      const r = zwemmer(ctx, id, 640, wl + (slag === 'rug' ? 0.07 : 0.12) * L, L, { slag, t: t + i * 0.3 });
      metaText(ctx, nm, 150, top + 50, hl > 0.5 ? C.goud : C.text2, 'left', 28);
      laag(ctx, q.on('gladde', 1, 0.4), () => stippel(ctx, r.voet.x, r.voet.y, r.hoofd.x + 20, r.hoofd.y, C.goud, 0.9, 2.5));
      laag(ctx, Ac, () => { SP1_pijlDik(ctx, 1000, wl - 40, 1180, wl - 40, 12, C.goud); for (const h of [r.handR, r.handL]) if (h && h.y > yy(h.x) + 8) SP1_waterTerug(ctx, h.x, h.y, 1, t, 1, 2, 70);
        if (slag === 'school') SP1_waterTerug(ctx, r.voet.x, r.voet.y, 1, t + 0.3, 1, 2, 70); }); });
    laag(ctx, Kb, () => SP1_klembord(ctx, 1440, 160, 380, 3, ramp(t, q.at('grip', 1) - 0.2, 0.9), { t })); },

  // ---------- H4 Start, keerpunt en de vijfde slag ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const Vi = q.on('video', 1, 0.4), Wt = q.at('Wat', 1);
    laag(ctx, 1 - Vi, () => { const wl = 180, L = 560, x = 360 + 360 * (1 - Math.exp(-t / 5)); SP1_water(ctx, wl, { t, amp: 2, snel: 10 });
      const r = zwemmer(ctx, 'sam', x, wl + 0.9 / 1.79 * L, L, { slag: 'stroomlijn', t }); SP1_bellen(ctx, r.voet.x - 20, r.voet.y, 9, t, { wl, seed: 2, drift: 90 }); SP1_bellen(ctx, r.heup.x, r.heup.y, 4, t, { wl, seed: 7, drift: 60, r: 4 });
      laag(ctx, q.on('Vijf', 1, 0.4), () => SP1_scorebord(ctx, 1640, 120, '5 M', 1, 44));
      laag(ctx, q.on('stroomlijn', 1, 0.4), () => naamBij(ctx, 'stroomlijn', '', r.heup.x - 80, r.heup.y - 110, 1, 'left', C.goud));
      laag(ctx, q.on('armen', 1, 0.4), () => naamBij(ctx, 'armen gestrekt', 'boven het hoofd', r.handR.x - 120, r.handR.y + 100, 1, 'left'));
      laag(ctx, q.on('recht', 1, 0.4), () => { stippel(ctx, r.voet.x - 20, r.voet.y + 4, r.handR.x + 20, r.handR.y + 4, C.goud, 1, 3); naamBij(ctx, 'lichaam en benen recht', '', r.voet.x - 20, r.heup.y + 120, 1, 'left'); }); });
    laag(ctx, Vi, () => { const tv = Math.min(t, Wt) - q.at('video', 1), Vx = 160, Vy = 140, Vw = 1600, Vh = 620; SP1_video(ctx, Vx, Vy, Vw, Vh, () => { const wl = Vy + 120, L = 460, up = ease(clamp(tv / 2.2, 0, 1));
        SP1_water(ctx, wl, { x0: Vx, x1: Vx + Vw, y1: Vy + Vh, t: tv, amp: 3, snel: 80 }); const x = 560 + 160 * tv, y = lerp(wl + 0.9 / 1.79 * L, wl + 0.12 * L, up);
        if (up < 0.98) SP1_zwemRot(ctx, 'sam', x, y, L, -0.25 * Math.sin(up * Math.PI), x, y, { slag: 'stroomlijn', t: tv }); else zwemmer(ctx, 'sam', x, y, L, { slag: 'crawl', t: tv });
        laag(ctx, ramp(tv, 1.6, 0.4), () => naamBij(ctx, 'al boven', 'na 5 m', Math.min(x + 260, Vx + Vw - 320), wl - 30, 1, 'left', C.koraal)); }, { u: 0.2 + tv / 10, pauze: t >= Wt });
      vraagteken(ctx, 1600, 640, q.on('Wat', 1, 0.4), 140); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: langer onder water blijven', 1 - q.on('driekwart', 1, 0.4)); const Bv = q.on('driekwart', 1, 0.5);
    laag(ctx, 1 - Bv, () => { const wl = 220, L = 520; SP1_water(ctx, wl, { t, amp: 2, snel: 10 });
      // deeltjes in het water stromen langs: hij gaat vooruit
      ctx.fillStyle = rgba('#BFE3F2', 0.35); for (let i = 0; i < 26; i++) { const x = ((hash(i) * 2200 - t * (200 + 160 * (1 - ramp(t, 3, 9)))) % 2000 + 2000) % 2000 - 40, y = wl + 30 + hash(i * 3.3) * 620; circ(ctx, x, y, 3 + hash(i * 7) * 3, rgba('#BFE3F2', 0.35)); }
      const r = zwemmer(ctx, 'sam', 760, wl + 0.9 / 1.79 * L, L, { slag: 'onderwater', t, tempo: 0.8 });
      kaart(ctx, 1390, 250, 430, 360, 1); const v = q.on('afzet', 1, 0.6) * (0.95 - 0.2 * ramp(t, q.at('houdt', 1), 6)); SP1_meter(ctx, 1605, 470, 130, v, { lab: 'SNELHEID', kl: C.goud, ref: 0.55, refLab: '' });
      metaText(ctx, 'NA DE AFZET', 1605, 300, C.goud, 'center', 28); metaA(ctx, '│ = AAN HET OPPERVLAK', 1605, 590, q.on('rest', 1, 0.4), C.text2, 'center', 28);
      laag(ctx, q.on('dolfijnslag', 1, 0.4), () => naamBij(ctx, 'dolfijnslag', 'beide benen samen', r.voet.x - 140, r.voet.y + 130, 1, 'left', C.goud)); });
    laag(ctx, Bv, () => { const wl = 330, M = 108, X0 = 140, L = 1.79 * M, yb = wl + 2 * M, d1 = wl + 0.75 * M, d2 = wl + 1 * M;
      SP1_water(ctx, wl, { x0: X0, x1: 1800, y1: yb, t, amp: 2, snel: 20 }); ctx.fillStyle = SP1.tegel; ctx.fillRect(X0 - 40, yb, 1760, 24); ctx.fillRect(X0 - 40, wl - 30, 40, yb - wl + 54);
      for (const m of [0, 5, 10, 15]) { metaText(ctx, m + ' M', X0 + m * M, yb + 64, C.text2, 'center', 28); lijn(ctx, [[X0 + m * M, yb + 24], [X0 + m * M, yb + 34]], C.line, 2); }
      laag(ctx, q.on('driekwart', 1, 0.4), () => { ctx.fillStyle = rgba(C.goud, 0.12); ctx.fillRect(X0, d1, 1700, d2 - d1); stippel(ctx, X0, d1, 1800, d1, C.goud, 0.8, 2); stippel(ctx, X0, d2, 1800, d2, C.goud, 0.8, 2); metaText(ctx, '± 0,75–1 M DIEP', X0 + 16, d2 + 44, C.goud, 'left', 28); });
      const T1 = q.at('driekwart', 1), T2 = q.at('boven', 1) + 0.6, u = clamp((t - T1) / (T2 - T1), 0, 1), xm = 5 + 9.6 * u, x = X0 + xm * M, upA = ramp(t, T2 - 1.6, 1.6);
      const y = lerp(wl + 0.87 * M, wl + 0.12 * L, upA);
      if (upA < 0.98) SP1_zwemRot(ctx, 'sam', x, y, L, -0.35 * Math.sin(upA * Math.PI), x, y, { slag: 'onderwater', t, tempo: 0.8 }); else sp1Crawl(ctx, x + Math.min(50, 40 * Math.max(0, t - T2)), wl, L, t);
      const G = q.on('golven', 1, 0.4) * (1 - q.on('vijfde', 1, 0.4)), V5 = q.on('vijfde', 1, 0.4) * (1 - q.on('Eindeloos', 1, 0.4)), B15 = q.on('vijftien', 1, 0.4);
      laag(ctx, G, () => tag(ctx, 'BIJNA GEEN GOLVEN', Math.min(x, 1500), 270, C.teal, 1, 'center', 30));
      laag(ctx, V5, () => tag(ctx, 'DE VIJFDE SLAG', 960, 270, C.goud, 1, 'center', 34));
      SP1_boeilijn(ctx, X0 + 15 * M, wl, yb, q.on('Eindeloos', 1, 0.4)); laag(ctx, B15, () => tag(ctx, '15 M · HOOFD BOVEN', X0 + 15 * M - 120, 270, C.koraal, 1, 'center', 30));
      laag(ctx, q.on('schoolslag', 1, 0.4), () => { kaartTekst(ctx, 140, 640, 960, 190, 'SCHOOLSLAG', [q.on('één', 1) > 0.5 ? 'één armslag + één dolfijnslag, dan omhoog' : ''], 1, C.goud, C.goud, 40);
        metaA(ctx, 'WORLD AQUATICS-REGLEMENT', 1800, 850, q.on('regel', 1, 0.4), C.grain, 'right', 28); }); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('honderd', 1, 0.5), Kb = q.on('klembord', 1, 0.4);
    laag(ctx, 1 - Bd, () => { const wl = 300, L = 520, Xm = 300; SP1_water(ctx, wl, { x0: Xm, t, amp: 2, snel: 10 }); SP1_kant(ctx, Xm, wl - 30, -1);
      const ts = q.at('start', 1), x = Xm + 0.53 * L + 700 * (1 - Math.exp(-Math.max(0, t - ts) / 1.4)); const r = zwemmer(ctx, 'sam', x, wl + 0.9 / 1.79 * L, L, { slag: 'stroomlijn', t });
      SP1_bellen(ctx, Xm + 40, r.voet.y, 10, t, { wl, seed: 5, drift: -60, a: ramp(t, ts, 0.3) });
      laag(ctx, q.on('start', 1, 0.4), () => naamBij(ctx, 'afzet van de muur', 'zonder startblok', Xm + 40, wl + 420, 1, 'left', C.goud)); });
    laag(ctx, Bd, () => { const pad = (x0, y0, w, n, cue, nr) => { const yl = SP1_badBoven(ctx, x0, y0, w, 150, 3, {}); const y1 = y0 + 30, y2 = y0 + 120, pts = [];
        for (let i = 0; i <= n; i++) pts.push([i % 2 ? x0 + w - 30 : x0 + 30, i % 2 ? y1 + (y2 - y1) * (i / n) : y1 + (y2 - y1) * (i / n)]);
        lijn(ctx, pts, C.goud, 4); const A = q.on(cue, nr, 0.4);
        for (let i = 1; i < n; i++) { const [px, py] = pts[i], al = ramp(t, q.at(cue, nr) + (i - 1) * 0.35, 0.3); circ(ctx, px, py, 24, al > 0.5 ? C.goud : '#2A3A58', C.goud, 2); text(ctx, String(i), px, py + 10, fTekst(30, 800), al > 0.5 ? '#121A26' : C.text, 'center'); }
        return A; };
      metaText(ctx, '100 M IN EEN 50-METERBAD', 360, 196, C.text2, 'left', 28); pad(360, 230, 1200, 2, 'één', 1);
      metaText(ctx, '100 M IN EEN 25-METERBAD', 360, 516, C.text2, 'left', 28); pad(360, 550, 600, 4, 'drie', 1);
      laag(ctx, q.on('één', 1, 0.4), () => text(ctx, '1 keerpunt', 1586, 460, fTekst(40, 800), C.goud, 'right'));
      laag(ctx, q.on('drie', 1, 0.4), () => text(ctx, '3 keerpunten', 1010, 640, fTekst(40, 800), C.goud, 'left'));
      laag(ctx, Kb, () => SP1_klembord(ctx, 1612, 190, 280, 4, ramp(t, q.at('onderwater', 1) - 0.1, 1.0), { t })); }); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const Gr = q.on('groeit', 1, 0.5), Li = q.on('Ligging', 1, 0.5), Am = q.on('Amsterdam', 1, 0.5), Kr = q.on('Kracht', 4, 0.5);
    laag(ctx, 1 - Gr, () => { SP1_klembord(ctx, 760, 250, 380, 4, 1, { t }); sp1Sam(ctx, 470, 860, 500, t, { kijk: 1, bril: 'muts', uit: 'neutraal' });
      sp1Trainer(ctx, 1460, 860, 500, t, { kijk: -1, pose: 'wijs', uit: 'blij', zonderBord: true });
      SP1_wolkje(ctx, 250, 260, 70, () => SP1_halter(ctx, 250, 260, 95), vensterA(t, q.at('krachtzaal', 1) - 0.3, q.at('Waarom', 1), 0.4), 1);
      laag(ctx, q.on('Waarom', 1, 0.4), () => tag(ctx, 'HOUDING OF SPIEREN?', 960, 160, C.goud, 1, 'center', 36)); });
    laag(ctx, Gr * (1 - Li), () => { SP1_parabool(ctx, 420, 240, 900, 480, { u: 0, m1: 1, m2: 1 }); laag(ctx, q.on('duur', 1, 0.4), () => tag(ctx, 'EXTRA KRACHT: DUUR GEKOCHT', 1450, 300, C.oker, 1, 'center', 32)); });
    // camerarit onder water door de baan: start → stroomlijn → ligging → catch → muur
    laag(ctx, Li * (1 - Am), () => { const T0 = q.at('Ligging', 1), cam = 1100 * ease(clamp((t - T0) / 7.0, 0, 1)), wl = 300, L = 400;
      ctx.save(); ctx.translate(-cam, 0); SP1_water(ctx, wl, { x0: cam - 20, x1: cam + W + 20, t, amp: 3, snel: 40 }); SP1_kant(ctx, 120, wl - 30, -1); SP1_kant(ctx, 2900, wl - 30, 1, { x2: 3200 });
      zwemmer(ctx, 'sam', 520, wl + 0.9 / 1.79 * L, L, { slag: 'onderwater', t }); const lab = [['onderwater', 'geen golven', 380, 760]];
      const r2 = sp1Crawl(ctx, 1300, wl, L, t); lab.push(['ligging', 'hoofd laag, lichaam vlak', 1200, wl + 260]);
      const r3 = sp1Crawl(ctx, 2150, wl, L, 0, { fase: 0.26 }); const fa = L * 1.04 / 6.1 * 1.2; SP1_peddel(ctx, r3.handR.x, r3.handR.y, r3.handR.x - 0.07 * fa, r3.handR.y - 0.6 * fa, 22, 1); lab.push(['catch', 'water naar achteren', r3.handR.x + 60, r3.handR.y + 40]);
      metaText(ctx, 'KEERPUNT', 2880, 250, C.text2, 'right', 28); ctx.restore();
      lab.forEach(([n, m, x, y]) => { const sx = x - cam; if (sx > 40 && sx < W - 420) naamBij(ctx, n, m, sx, y, 1, 'left', C.goud); });
      laag(ctx, q.on('geen', 1, 0.4), () => tag(ctx, 'GEEN EXTRA VERMOGEN', 960, 200, C.goud, 1, 'center', 32)); });
    laag(ctx, Am * (1 - Kr), () => { tag(ctx, 'EVEN VEEL ENERGIE', 160, 240, C.oker, 1, 'left', 32); SP1_balk(ctx, 160, 350, 1000, 1.11 / 1.3, C.goud, 'WEDSTRIJDZWEMMERS', '1,11 m/s', 1); SP1_balk(ctx, 160, 490, 1000, 0.9 / 1.3, C.goud, 'TRIATLETEN', '0,90 m/s', 1);
      laag(ctx, q.on('vijfde', 1, 0.4), () => text(ctx, 'ruim een vijfde sneller', 160, 660, fTekst(44, 800), C.goud, 'left')); metaText(ctx, 'TOUSSAINT 1990 · KLEINE GROEP', 1800, 850, C.grain, 'right', 28); });
    laag(ctx, Kr, () => { const kn = q.on('nodig', 1) > 0 ? 0.22 * Math.max(0, Math.sin((t - q.at('nodig', 1)) * 5)) * (t < q.at('nodig', 1) + 1.3 ? 1 : 0) + 0.22 * Math.max(0, Math.sin((t - q.at('krijgen', 1)) * 5)) * (t > q.at('krijgen', 1) && t < q.at('krijgen', 1) + 0.65 ? 1 : 0) : 0;
      SP1_klembord(ctx, 780, 200, 360, 4, 1, { t }); sp1Sam(ctx, 560, 860, 500, t, { zij: true, kijk: 1, knik: kn, bril: 'muts' }); sp1Trainer(ctx, 1380, 860, 500, t, { zij: true, kijk: -1, uit: 'blij', zonderBord: true }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    sp1Trainer(ctx, 250, 860, 480, t, { kijk: 1, pose: 'vasthouden', uit: 'blij', hold: (c, hx, hy) => { c.save(); roundRect(c, hx - 4, hy - 80, 130, 90, 8); shape(c, '#2A2F3E', '#5A6478', 2); c.fillStyle = SP1.water; c.fillRect(hx + 4, hy - 72, 114, 74); c.restore(); } });
    SP1_tafel(ctx, 1460, 620, 260, 240); SP1_laptop(ctx, 1480, 470, 220, (sx, sy, sw, sh) => SP1_spoor(ctx, sx + 6, sy + 8, sw - 12, sh - 16, t, (x) => Math.max(0, Math.sin(x * 5)) ** 3, { venster: 3 }));
    persoon(ctx, 'passant', 1790, 860, 480, { t, kijk: -1, uit: 'blij' });
    metaA(ctx, 'ZIET HET OP DE VIDEO', 250, 330, q.on('video', 1, 0.4) * (1 - q.on('Trainer', 2, 0.4)), C.text2, 'center', 28); metaA(ctx, 'MEET HET', 1600, 400, q.on('meet', 1, 0.4) * (1 - q.on('Bewegingswetenschappen', 1, 0.4)), C.text2, 'center', 28);
    kaartTekst(ctx, 470, 150, 720, 300, 'ZWEMTRAINER', ['diploma’s van de zwembond', 'mbo: CIOS', 'hbo: ALO of Sportkunde'], q.on('Trainer', 2, 0.4), C.goud, C.goud);
    kaartTekst(ctx, 680, 500, 720, 250, 'BEWEGINGSWETENSCHAPPER', ['wo: Bewegingswetenschappen', 'VU Amsterdam · Groningen'], q.on('Bewegingswetenschappen', 1, 0.4), C.teal, C.teal); }
});
