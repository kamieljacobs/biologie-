
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
// Wat word jij? · Sport en topsport 2 · Waarom al die rustige meters? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): teal = water, rust, herstel en zone RUSTIG; oker = energie (ATP, lactaat als brandstof) en zone DREMPEL;
// goud = zone SNEL en het doel; groen = de aerobe basis die groeit; koraal = let op.
// Maten: zwemmer staande lengte = lengte in px (1,80 m); bad 50 m, diepte ± 2 m; startblok ± 0,75 m hoog; baanbreedte 2,5 m.
// Figurant in het water: Daan krijgt hier een eigen zwemoutfit (blauwe badmuts), want de cast heeft alleen 'zwem' voor Sam.

const SP2_GROND = 850;
const SP2_K = { water: '#245E80', waterL: '#2F7398', waterD: '#1B4A66', tegel: '#C9D3DA', tegelD: '#9FAEB9', vloer: '#2E3D55', bord: '#F2F2EE', inkt: '#1A2740',
  vezel: '#6A2C36', vezelL: '#8C4450', vezelW: '#D9C4BC', vezelWL: '#EADDD6', bloed: '#B23A3E', bloedL: '#D8605E', plasma: '#E8CF7E', huidSam: '#7A5440' };

// ---------- Daan in zwemkleding (figurant in de baan) ----------
(function () { const D = CAST.daan; if (!D) return; D.garderobe = Object.assign({}, D.garderobe || {}, { zwem: { top: 'bloot', topKleur: D.huid, topAccent: '#D9AE8C', broek: '#1F3A2E', broekAccent: '#5BA4C9', schoen: D.huid, schoenAccent: D.huid, kapsel: 'badmuts', badmuts: '#2F6FB0', accessoire: ['zwembroek', 'blootsvoets', 'zwembril'] } }); })();

// ---------- algemene hulpjes ----------
function SP2_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP2_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP2_antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP2_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP2_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.9), 2); ctx.restore(); }
// kaartje met meta-kop en regels tekst
function SP2_kaartTekst(ctx, x, y, w, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; const h = (kop ? 70 : 30) + regels.length * (px + 12) + 10;
  SP2_laag(ctx, a, () => { SP2_kaart(ctx, x, y, w, h, 1, rand); if (kop) metaText(ctx, kop, x + 28, y + 46, kopKl, 'left', 28);
    regels.forEach((r, i) => text(ctx, r, x + 28, y + (kop ? 70 : 30) + px + i * (px + 12) - 6, fTekst(px, 700), C.text, 'left')); }); return h; }
function SP2_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP2_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
const SP2_ZK = { rustig: C.teal, drempel: C.oker, snel: C.goud };

// ---------- personages ----------
function SP2_trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || SP2_GROND, o.h || 400, { t, kijk: o.kijk || -1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold, zij: o.zij }); }
function SP2_sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || SP2_GROND, o.h || 380, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'zwem', a: o.a == null ? 1 : o.a, zij: o.zij, hold: o.hold }); }
function SP2_daan(ctx, x, t, o = {}) { return persoon(ctx, 'daan', x, o.y || SP2_GROND, o.h || 372, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: 'zwem', a: o.a == null ? 1 : o.a }); }

// ---------- zwembad, zijaanzicht ----------
// tegelvloer van de kant (deck) met een stukje bad links; geen tekst
function SP2_kant(ctx, o = {}) { const { badTot = 0, wand = true } = o; bg(ctx, 'schema');
  if (wand) { ctx.save(); ctx.strokeStyle = rgba(C.line, 0.07); ctx.lineWidth = 1.5; for (let y = 120; y < SP2_GROND; y += 70) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); }
  ctx.fillStyle = SP2_K.vloer; ctx.fillRect(badTot, SP2_GROND, W - badTot, 30); ctx.fillStyle = rgba(C.line, 0.5); ctx.fillRect(badTot, SP2_GROND, W - badTot, 3);
  if (badTot > 0) { ctx.fillStyle = SP2_K.water; ctx.fillRect(0, SP2_GROND + 12, badTot, 18); ctx.fillStyle = SP2_K.waterL; ctx.fillRect(0, SP2_GROND + 12, badTot, 3); } }
// lijn met drijvers (baanlijn), zijaanzicht op de waterlijn
function SP2_baanlijnZij(ctx, x0, x1, y, t = 0) { for (let x = x0; x < x1; x += 26) { const k = Math.floor((x - x0) / 26); const d = (x - x0) < 130 || (x1 - x) < 130; circ(ctx, x + 13, y + Math.sin(t * 1.6 + x * 0.02) * 2, 9, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
// onderwaterbeeld: water vanaf wl, bodem op 'bodem', keerpuntmuur bij muurX (rechts daarvan de kant)
function SP2_badZij(ctx, o = {}) { const { wl = 470, bodem = 850, muurX = 1500, t = 0, tot = 3600, kantBreed = 2600 } = o;
  ctx.fillStyle = SP2_K.waterD; ctx.fillRect(-200, wl, muurX + 200, bodem - wl);
  ctx.fillStyle = SP2_K.water; ctx.fillRect(-200, wl, muurX + 200, (bodem - wl) * 0.55);
  ctx.save(); ctx.strokeStyle = rgba('#9FD0EA', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const y = wl + 40 + i * 38; ctx.beginPath(); for (let x = -200; x <= muurX; x += 40) { const yy = y + Math.sin(x * 0.012 + t * 0.9 + i) * 5; x === -200 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); } ctx.restore();
  // bodem met zwarte baanlijn en T bij de muur
  ctx.fillStyle = '#3E6F86'; ctx.fillRect(-200, bodem - 10, muurX + 200, 10); ctx.fillStyle = '#16222E'; ctx.fillRect(-200, bodem - 16, muurX - 2 * 0.0 - 220, 6);
  ctx.fillStyle = '#16222E'; ctx.fillRect(muurX - 14, bodem - 300, 14, 300 - 10); // T op de muur, doorgetrokken van de bodemlijn
  // keerpuntmuur (tegels) en de kant erachter
  ctx.fillStyle = SP2_K.tegel; ctx.fillRect(muurX, wl - 34, 40, bodem - wl + 34); ctx.strokeStyle = SP2_K.tegelD; ctx.lineWidth = 1.5; for (let y = wl - 34; y < bodem; y += 32) { ctx.beginPath(); ctx.moveTo(muurX, y); ctx.lineTo(muurX + 40, y); ctx.stroke(); }
  ctx.fillStyle = '#E6C64A'; ctx.fillRect(muurX - 6, wl - 30, 8, 120); // aantikplaat
  ctx.fillStyle = SP2_K.vloer; ctx.fillRect(muurX, wl - 34, kantBreed, 30); ctx.fillStyle = rgba(C.line, 0.5); ctx.fillRect(muurX, wl - 34, kantBreed, 3);
  ctx.fillStyle = '#16212F'; ctx.fillRect(muurX + 40, wl - 4, kantBreed, bodem - wl + 4); // onder de kant
  // wateroppervlak
  ctx.strokeStyle = rgba('#BFE3F2', 0.7); ctx.lineWidth = 3; ctx.beginPath(); for (let x = -200; x <= muurX; x += 20) { const yy = wl + Math.sin(x * 0.02 + t * 2.2) * 3; x === -200 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); }

// ---------- scorebord ----------
function SP2_scorebord(ctx, x, y, w, h, boven, onder, a = 1) { if (a <= 0.01) return; SP2_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0B0F16', '#4A5568', 3);
  ctx.fillStyle = '#4A5568'; ctx.fillRect(x + w * 0.25, y - 60, 6, 60); ctx.fillRect(x + w * 0.75, y - 60, 6, 60);
  ctx.save(); ctx.font = fMeta(34); ctx.letterSpacing = '4px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(boven, x + w / 2, y + 52); ctx.restore();
  ctx.save(); ctx.font = fMeta(Math.round(h * 0.42)); ctx.letterSpacing = '6px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(onder, x + w / 2, y + h - 30); ctx.restore(); }); }

// ---------- whiteboard van de zwemtrainer ----------
// rijen: rustig, drempel, snel; o.hl = 'rustig'|'drempel'|'snel'|null; o.vul 0..1 (balken groeien); o.bars = [aRustig, aDrempel, aSnel]
const SP2_BORD_L = { rustig: 0.74, drempel: 0.2, snel: 0.1 };
function SP2_bord(ctx, x, y, w, h, o = {}) { const { a = 1, kop = '5000 M', vul = 1, hl = null, bars = [1, 1, 1], kopA = 1 } = o; if (a <= 0.01) return {};
  const rijen = []; SP2_laag(ctx, a, () => {
    ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); roundRect(ctx, x, y, w, h, 6); shape(ctx, SP2_K.bord, '#C7CCD4', 2);
    ctx.fillStyle = '#7A8496'; ctx.fillRect(x + 20, y + h + 10, w - 40, 10); // stiftenbakje
    SP2_laag(ctx, kopA, () => text(ctx, kop, x + 40, y + 78, fTekst(Math.round(h * 0.15), 800), SP2_K.inkt, 'left'));
    const namen = [['rustig', 'RUSTIG'], ['drempel', 'DREMPEL'], ['snel', 'SNEL']], x0 = x + 40 + w * 0.3, bw = w - (x0 - x) - 40, rh = (h - 130) / 3;
    namen.forEach(([k, n], i) => { const yy = y + 115 + i * rh, ba = bars[i]; const dimK = hl && hl !== k ? 0.35 : 1; rijen.push({ k, y: yy + rh * 0.42, x0, x1: x0 + bw * SP2_BORD_L[k] });
      if (ba <= 0.01) return; SP2_laag(ctx, ba * dimK, () => {
        ctx.save(); ctx.font = fMeta(Math.round(rh * 0.36)); ctx.letterSpacing = '2px'; ctx.fillStyle = SP2_K.inkt; ctx.textAlign = 'left'; ctx.fillText(n, x + 40, yy + rh * 0.55); ctx.restore();
        const L = bw * SP2_BORD_L[k] * ease(vul); roundRect(ctx, x0, yy + rh * 0.18, Math.max(8, L), rh * 0.5, 8); shape(ctx, SP2_ZK[k], lighten(SP2_ZK[k], -0.2), 2);
        if (hl === k) { ctx.strokeStyle = SP2_K.inkt; ctx.lineWidth = 3; roundRect(ctx, x0 - 6, yy + rh * 0.18 - 6, Math.max(8, L) + 12, rh * 0.5 + 12, 10); ctx.stroke(); } }); }); });
  return { rijen }; }

// ---------- zwembad, bovenaanzicht ----------
// banen liggen horizontaal; muren links en rechts; geeft functie baanY(i) terug (midden van baan i, 0 = boven)
function SP2_banen(ctx, x, y, w, h, n, o = {}) { const { t = 0, a = 1 } = o; const bh = h / n; if (a <= 0.01) return { y: (i) => y + (i + 0.5) * bh, bh };
  SP2_laag(ctx, a, () => {
    roundRect(ctx, x - 24, y - 24, w + 48, h + 48, 10); shape(ctx, SP2_K.vloer, rgba(C.line, 0.5), 2);
    ctx.fillStyle = SP2_K.waterL; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.strokeStyle = rgba('#CFEAF6', 0.12); ctx.lineWidth = 2;
    for (let i = 0; i < 14; i++) { const yy = y + (i + 0.5) * h / 14; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const q = yy + Math.sin(xx * 0.015 + t * 0.8 + i * 1.7) * 4; xx === x ? ctx.moveTo(xx, q) : ctx.lineTo(xx, q); } ctx.stroke(); } ctx.restore();
    for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; ctx.fillStyle = rgba('#14303F', 0.55); ctx.fillRect(x + w * 0.04, yy - 6, w * 0.92, 12); ctx.fillRect(x + w * 0.04 - 4, yy - 30, 12, 60); ctx.fillRect(x + w * 0.96 - 8, yy - 30, 12, 60); }
    for (let i = 0; i <= n; i++) { const yy = y + i * bh; if (i === 0 || i === n) continue; for (let xx = x; xx < x + w; xx += 22) { const k = Math.floor((xx - x) / 22); const d = (xx - x) < w * 0.1 || (x + w - xx) < w * 0.1; circ(ctx, xx + 11, yy, 8, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
    ctx.fillStyle = SP2_K.tegel; ctx.fillRect(x - 8, y, 8, h); ctx.fillRect(x + w, y, 8, h); });
  return { y: (i) => y + (i + 0.5) * bh, bh }; }
// spoor achter een zwemmer (bovenaanzicht)
function SP2_spoor(ctx, x0, x1, y, col, a = 1, lw = 18) { if (a <= 0.01 || Math.abs(x1 - x0) < 2) return; ctx.save(); ctx.globalAlpha *= a * 0.75; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// zwemmer van boven (eenvoudige vorm, kleuren uit de cast); (x, y) = midden van de romp, L = lengte van kruin tot tenen
function SP2_boven(ctx, x, y, L, t, o = {}) { const { id = 'sam', kijk = 1, tempo = 1, a = 1, stil = false } = o; if (a <= 0.01) return;
  const P = CAST[id], G = (P.garderobe && P.garderobe.zwem) || {}, huid = P.huid, muts = G.badmuts || '#D8573F', broek = G.broek || '#1F2B48';
  const p = stil ? 0.1 : ((t * 0.8 * tempo) % 1 + 1) % 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kick = stil ? 0 : Math.sin(p * 6.283 * 3) * L * 0.025;
  ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = L * 0.075; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); });
  ctx.strokeStyle = huid; ctx.lineWidth = L * 0.06; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); });
  // armen: hand van voor (instrek) naar achter (dij) en boven water terug
  const arm = (q, s) => { const sx = L * 0.26, sy = s * L * 0.11, ar = L * 0.36; let hx, hy;
    if (q < 0.62) { const u = q / 0.62; hx = sx + ar * Math.cos(u * Math.PI * 0.95); hy = sy + s * L * 0.02 * Math.sin(u * Math.PI) - s * L * 0.06 * Math.sin(u * Math.PI); }
    else { const u = (q - 0.62) / 0.38; hx = sx + ar * Math.cos(Math.PI * 0.95 * (1 - u)); hy = sy + s * L * 0.12 * Math.sin(u * Math.PI); }
    const ex = (sx + hx) / 2 - L * 0.02, ey = (sy + hy) / 2 + s * L * 0.05;
    ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = L * 0.06; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.strokeStyle = huid; ctx.lineWidth = L * 0.046; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); };
  arm(p, 1);
  // romp
  ctx.beginPath(); ctx.ellipse(L * 0.1, 0, L * 0.21, L * 0.115, 0, 0, 6.283); shape(ctx, huid, _sp2Donker(huid), 1.5);
  roundRect(ctx, -L * 0.14, -L * 0.075, L * 0.12, L * 0.15, L * 0.04); shape(ctx, broek, null);
  arm((p + 0.5) % 1, -1);
  ctx.beginPath(); ctx.ellipse(L * 0.37, 0, L * 0.075, L * 0.062, 0, 0, 6.283); shape(ctx, muts, lighten(muts, -0.25), 1.5);
  ctx.restore(); }
function _sp2Donker(hex) { const n = parseInt(hex.slice(1), 16); const f = 0.78; return `rgb(${Math.round((n >> 16) * f)},${Math.round(((n >> 8) & 255) * f)},${Math.round((n & 255) * f)})`; }
// startblok (zijaanzicht), (x, y) = voorrand en bovenkant; s = px per m
function SP2_startblok(ctx, x, y, s, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(kijk, 1);
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-0.6 * s, -0.06 * s); ctx.lineTo(-0.62 * s, 0.75 * s); ctx.lineTo(-0.05 * s, 0.75 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E8E4DA'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-0.6 * s, -0.06 * s); ctx.lineTo(-0.6 * s, -0.02 * s); ctx.lineTo(0, 0.04 * s); ctx.closePath(); ctx.fill();
  ctx.restore(); }

// ---------- micro: spiervezel in een zoomcirkel ----------
// liggende spiervezel (langgerekt) rond cy; o: mito (aantal), hl (index die oplicht, groen omlijnd), haarvat 0..1, wit (witte vezel), dy, h
function SP2_vezel(ctx, cx, cy, R, o = {}) { const { mito = 6, hl = -1, hlA = 0, haarvat = 0, wit = false, h = R * 0.62, t = 0, a = 1, nieuw = 0 } = o; if (a <= 0.01) return [];
  const pos = []; SP2_laag(ctx, a, () => {
    const x0 = cx - R * 1.1, x1 = cx + R * 1.1, y0 = cy - h / 2;
    roundRect(ctx, x0, y0, x1 - x0, h, h * 0.45); shape(ctx, wit ? SP2_K.vezelW : SP2_K.vezel, wit ? SP2_K.vezelWL : SP2_K.vezelL, 2);
    ctx.save(); roundRect(ctx, x0, y0, x1 - x0, h, h * 0.45); ctx.clip();
    ctx.strokeStyle = wit ? rgba('#B8A49C', 0.5) : rgba('#9A5560', 0.55); ctx.lineWidth = 2; for (let xx = x0 + 10; xx < x1; xx += 16) { ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx + 3, y0 + h); ctx.stroke(); }
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(cx - R * 0.7 + i * R * 0.7, y0 + h * 0.12, R * 0.07, h * 0.06, 0, 0, 6.283); shape(ctx, '#6E5A9E', '#A392D6', 1.2); }
    for (let i = 0; i < mito; i++) { const mx = cx - R * 0.85 + (i + 0.5) * (R * 1.7 / mito) + (hash(i * 3.1) - 0.5) * R * 0.12, my = cy + (i % 2 ? 1 : -1) * h * 0.16 + (hash(i * 7.7) - 0.5) * h * 0.1;
      const ai = i >= mito - nieuw ? 1 : 1; mitochondrion(ctx, mx, my, R * 0.2, (hash(i) - 0.5) * 0.5, ai, 4, t); pos.push({ x: mx, y: my });
      if (i === hl && hlA > 0.01) { ctx.save(); ctx.globalAlpha *= hlA; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(mx, my, R * 0.14, R * 0.075, (hash(i) - 0.5) * 0.5, 0, 6.283); ctx.stroke(); ctx.restore(); } }
    ctx.restore();
    if (haarvat > 0.01) SP2_haarvaten(ctx, cx, cy, R, h, haarvat, t); });
  return pos; }
function SP2_haarvaten(ctx, cx, cy, R, h, u, t) { ctx.save(); ctx.lineCap = 'round';
  [-1, 1].forEach((s, j) => { const yb = cy + s * (h / 2 + 16); const xs = cx - R * 1.05, xe = cx - R * 1.05 + R * 2.1 * u;
    ctx.strokeStyle = rgba(SP2_K.bloed, 0.9); ctx.lineWidth = 12; ctx.beginPath(); for (let x = xs; x <= xe; x += 10) { const y = yb + Math.sin(x * 0.03 + j * 2) * 6; x === xs ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
    for (let k = 0; k < 6; k++) { const x = xs + ((k * 70 + t * 40) % (R * 2.1)); if (x > xe) continue; ctx.beginPath(); ctx.ellipse(x, yb + Math.sin(x * 0.03 + j * 2) * 6, 7, 4, 0, 0, 6.283); ctx.fillStyle = SP2_K.bloedL; ctx.fill(); } });
  ctx.restore(); }
// glucose als zeshoek; twee ketentjes van drie C (pyrodruivenzuur/lactaat)
function SP2_glucose(ctx, x, y, r, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 + Math.PI / 6; i ? ctx.lineTo(x + r * Math.cos(an), y + r * Math.sin(an)) : ctx.moveTo(x + r * Math.cos(an), y + r * Math.sin(an)); } ctx.closePath(); shape(ctx, rgba(col, 0.35), col, 3); ctx.restore(); }
function SP2_keten(ctx, x, y, r, a = 1, col = C.oker, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-r * 1.6, 0); ctx.lineTo(r * 1.6, 0); ctx.stroke(); for (let i = -1; i <= 1; i++) circ(ctx, i * r * 1.6, 0, r * 0.62, rgba(col, 0.55), col, 2); ctx.restore(); }
// fosfaataccu: batterijtje met lading u
function SP2_accu(ctx, x, y, s, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - s, y - s * 0.5, s * 2, s, s * 0.15); shape(ctx, rgba('#0D1420', 0.6), C.goud, 3); ctx.fillStyle = C.goud; ctx.fillRect(x + s, y - s * 0.2, s * 0.18, s * 0.4);
  roundRect(ctx, x - s + 6, y - s * 0.5 + 6, Math.max(2, (s * 2 - 12) * clamp(u, 0, 1)), s - 12, s * 0.08); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fill(); ctx.restore(); }
// O2-molecuul (twee bolletjes, teal)
function SP2_o2(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x - r * 0.55, y, r * 0.7, C.teal, lighten(C.teal, 0.3), 1.5); circ(ctx, x + r * 0.55, y, r * 0.7, C.teal, lighten(C.teal, 0.3), 1.5); ctx.restore(); }
// lactaatdeeltje (oker ketentje, klein)
function SP2_lac(ctx, x, y, r, a = 1) { SP2_keten(ctx, x, y, r, a, C.oker, 0.4); }

// ---------- energiebalk (100 m) ----------
function SP2_energieBalk(ctx, x, y, w, h, frac, o = {}) { const { a = 1, rest = 1, label = '' } = o; if (a <= 0.01) return; SP2_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#2A3446', C.line, 1.5);
  const fw = w * frac; if (rest > 0.01) SP2_laag(ctx, rest, () => { ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.75); ctx.fillRect(x + fw, y, w - fw, h); ctx.fillStyle = rgba(C.goud, 0.8); ctx.fillRect(x + w * 0.83, y, w * 0.17, h); ctx.restore(); });
  if (fw > 2) { ctx.save(); roundRect(ctx, x, y, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(C.groen, 0.85); ctx.fillRect(x, y, fw, h); ctx.restore(); }
  if (label) metaText(ctx, label, x, y - 18, C.text2, 'left', 28); }); }

// ---------- hart, maatbekertje, bloedbuisje ----------
function SP2_hart(ctx, x, y, s, beat = 0, a = 1) { if (a <= 0.01) return; const p = Math.pow(Math.max(0, Math.sin(beat)), 3), k = 1 + 0.06 * p; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k * s, k * s);
  ctx.fillStyle = '#8E2E36'; roundRect(ctx, -8, -78, 30, 50, 12); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, -70); ctx.quadraticCurveTo(40, -100, 60, -70); ctx.lineWidth = 16; ctx.strokeStyle = '#A8343C'; ctx.stroke(); // aorta
  ctx.fillStyle = '#3E5FA8'; roundRect(ctx, -40, -70, 22, 40, 10); ctx.fill(); // holle ader
  ctx.beginPath(); ctx.moveTo(-50, -30); ctx.bezierCurveTo(-70, 10, -30, 60, 10, 80); ctx.bezierCurveTo(50, 50, 70, 0, 50, -36); ctx.bezierCurveTo(30, -60, -30, -60, -50, -30); ctx.closePath(); shape(ctx, '#B8484A', '#E07A7A', 2.5);
  ctx.strokeStyle = rgba('#5E1E24', 0.7); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(-6, 20, 10, 70); ctx.stroke(); ctx.restore(); }
function SP2_maatbeker(ctx, x, y, w, h, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w * 0.42, y); ctx.lineTo(x + w * 0.42, y); ctx.lineTo(x + w / 2, y - h); shape(ctx, rgba('#AFC0D0', 0.12), '#AFC0D0', 2.5);
  const fh = h * clamp(u, 0, 1); ctx.beginPath(); ctx.moveTo(x - w * 0.42 - (w * 0.08) * (fh / h), y - fh); ctx.lineTo(x - w * 0.42, y); ctx.lineTo(x + w * 0.42, y); ctx.lineTo(x + w * 0.42 + (w * 0.08) * (fh / h), y - fh); ctx.closePath(); ctx.fillStyle = rgba(SP2_K.bloed, 0.85); ctx.fill();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + w * 0.2, y - h * i / 5); ctx.lineTo(x + w * 0.42, y - h * i / 5); ctx.stroke(); } ctx.restore(); }
// bloedbuisje: bodem op y, plasma (geel) boven, rode bloedcellen onder; hoogtes in px
function SP2_buisje(ctx, x, y, w, hRbc, hPlasma, hTot, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, y - hTot); ctx.lineTo(x - w / 2, y - w / 2); ctx.arc(x, y - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - hTot); };
  ctx.save(); pad(); ctx.closePath(); ctx.clip(); ctx.fillStyle = SP2_K.bloed; ctx.fillRect(x - w, y - hRbc, w * 2, hRbc + 2); ctx.fillStyle = rgba(SP2_K.plasma, 0.9); ctx.fillRect(x - w, y - hRbc - hPlasma, w * 2, hPlasma);
  ctx.fillStyle = rgba('#F2F2EE', 0.6); ctx.fillRect(x - w, y - hRbc - 3, w * 2, 5); ctx.restore();
  pad(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#5E6A80'; roundRect(ctx, x - w / 2 - 6, y - hTot - 24, w + 12, 26, 6); ctx.fill(); ctx.restore(); }

// ---------- meters, klokken, kalender, weegschaal ----------
function SP2_lactaatMeter(ctx, x, y, s, waarde, a = 1, strip = 1, druppel = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -100, 120, 200, 22); shape(ctx, '#3A4458', '#6A768C', 3);
  roundRect(ctx, -44, -76, 88, 70, 8); shape(ctx, '#B8D8A8', '#2A3446', 2);
  if (waarde) text(ctx, waarde, 0, -26, fMeta(waarde.length > 2 ? 38 : 46), '#1A2A1A', 'center');
  circ(ctx, -22, 40, 13, '#5A6478', '#8FA0B5', 2); circ(ctx, 22, 40, 13, '#5A6478', '#8FA0B5', 2);
  if (strip > 0.01) { ctx.fillStyle = '#E8E4DA'; ctx.fillRect(-10, -100 - 46 * strip, 20, 46 * strip); if (druppel > 0.01) circ(ctx, 0, -100 - 46 * strip, 7 * druppel, '#B23A3E'); }
  ctx.restore(); }
function SP2_stopwatch(ctx, x, y, r, u, a = 1, txt = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#AFC0D0'; ctx.fillRect(x - r * 0.15, y - r * 1.32, r * 0.3, r * 0.26);
  circ(ctx, x, y, r, '#E8ECF0', '#8FA0B5', 4); circ(ctx, x, y, r * 0.86, null, '#C7CCD4', 2);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.8, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u % 1.0001, 0, 1)); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill();
  const an = -Math.PI / 2 + 6.283 * u; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#1A2740');
  if (txt) metaText(ctx, txt, x, y + r + 44, C.text2, 'center', 28); ctx.restore(); }
function SP2_kalender(ctx, x, y, w, h, nr, u, a = 1, kop = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#E8ECF0', '#8FA0B5', 2);
  ctx.fillStyle = C.koraal; roundRect(ctx, x, y, w, h * 0.26, 12); ctx.fill(); ctx.fillRect(x, y + h * 0.14, w, h * 0.12);
  for (let i = 0; i < 2; i++) { ctx.fillStyle = '#5A6478'; roundRect(ctx, x + w * (0.28 + i * 0.36) - 6, y - 14, 12, 30, 5); ctx.fill(); }
  if (kop) text(ctx, kop, x + w / 2, y + h * 0.2, fTekst(Math.round(h * 0.13), 800), '#F2F2EE', 'center');
  text(ctx, String(nr), x + w / 2, y + h * 0.82, fTekst(Math.round(h * 0.46), 800), '#1A2740', 'center');
  ctx.restore(); }
function SP2_weegschaal(ctx, x, y, s, tilt, links, rechts, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 240 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 90 * s, y); ctx.lineTo(x + 90 * s, y); ctx.stroke();
  const L = 380 * s, dy = Math.sin(tilt) * L; ctx.beginPath(); ctx.moveTo(x - L, y - 240 * s + dy); ctx.lineTo(x + L, y - 240 * s - dy); ctx.stroke(); circ(ctx, x, y - 240 * s, 12 * s, '#AFC0D0');
  [[-1, links, C.teal, dy], [1, rechts, C.goud, -dy]].forEach(([k, lab, col, d]) => { const px = x + k * L, py = y - 240 * s + d; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 120 * s, py + 120 * s); ctx.moveTo(px, py); ctx.lineTo(px + 120 * s, py + 120 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 150 * s, py + 120 * s); ctx.quadraticCurveTo(px, py + 190 * s, px + 150 * s, py + 120 * s); ctx.closePath(); shape(ctx, rgba(col, 0.3), col, 3);
    lab.forEach((r, i) => text(ctx, r, px, py + 250 * s + i * 44, fTekst(36, 700), C.text, 'center')); });
  ctx.restore(); }

// ---------- lactaatcurve ----------
// snelheid u 0..1 (x-as), lactaat in mmol/l (0..12); dv = verschuiving naar rechts (na training)
function SP2_lac_v(u, dv = 0) { const v = u - dv; return 0.9 + 0.35 * Math.exp(4.6 * (v - 0.25)) - 0.35 * Math.exp(4.6 * -0.25) * 0; }
function SP2_grafiek(ctx, x, y, w, h, o = {}) { const { a = 1, ymax = 12, curve = 1, dv = 0, punten = 0, col = C.oker, zones = 0, grens = 0, assen = true, oud = 0, kleur = null, lw = 5, lab = true } = o;
  const X = (u) => x + u * w, Y = (l) => y + h - (l / ymax) * h; if (a <= 0.01) return { X, Y };
  SP2_laag(ctx, a, () => {
    if (zones > 0.01) SP2_laag(ctx, zones, () => { const u2 = SP2_uVoor(2, dv), u4 = SP2_uVoor(4, dv); ctx.fillStyle = rgba(C.teal, 0.22); ctx.fillRect(x, y, X(u2) - x, h); ctx.fillStyle = rgba(C.oker, 0.28); ctx.fillRect(X(u2), y, X(u4) - X(u2), h); ctx.fillStyle = rgba(C.goud, 0.22); ctx.fillRect(X(u4), y, x + w - X(u4), h); });
    if (grens > 0.01) SP2_laag(ctx, grens, () => { [2, 4].forEach(l => { SP2_lijn(ctx, [[x, Y(l)], [x + w, Y(l)]], C.line, 2, 0.9, [10, 8]); metaText(ctx, '± ' + l, x - 14, Y(l) + 10, C.text2, 'right', 28); }); });
    if (assen) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + h); ctx.lineTo(x + w + 10, y + h); ctx.stroke();
      if (lab) { metaText(ctx, 'SNELHEID →', x + w, y + h + 42, C.text2, 'right', 28); metaText(ctx, 'LACTAAT (MILLIMOL PER LITER)', x, y - 26, C.text2, 'left', 28); } }
    if (oud > 0.01) { const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60, l = SP2_lac_v(u, 0); if (l > ymax) break; pts.push([X(u), Y(l)]); } SP2_lijn(ctx, pts, C.text2, 3, oud, [10, 8]); }
    if (curve > 0.01) { const pts = []; const n = Math.round(60 * curve); for (let i = 0; i <= n; i++) { const u = i / 60, l = SP2_lac_v(u, dv); if (l > ymax) break; pts.push([X(u), Y(l)]); } SP2_lijn(ctx, pts, kleur || col, lw, 1); }
    for (let i = 0; i < 7; i++) { const pa = clamp(punten - i, 0, 1); if (pa <= 0.01) continue; const u = 0.1 + i * 0.125, l = SP2_lac_v(u, dv); circ(ctx, X(u), Y(l), 11 * ease(pa), C.text, '#1A2740', 2); } });
  return { X, Y }; }
function SP2_uVoor(l, dv = 0) { return 0.25 + Math.log((l - 0.9) / 0.35) / 4.6 + dv; }
// vlaggetje
function SP2_vlag(ctx, x, y, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 70); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - 70); ctx.lineTo(x + 44, y - 58); ctx.lineTo(x, y - 46); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
// oor met oorlel van opzij (zoomcirkel bij de prik), huidkleur
function SP2_oor(ctx, x, y, s, huid, prik = 0, drop = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = huid; ctx.fillRect(-300, -300, 600, 600);
  ctx.fillStyle = _sp2Donker(huid); ctx.beginPath(); ctx.ellipse(0, -20, 95, 150, 0.1, 0, 6.283); ctx.fill(); ctx.fillStyle = huid; ctx.beginPath(); ctx.ellipse(-4, -24, 84, 138, 0.1, 0, 6.283); ctx.fill();
  ctx.strokeStyle = _sp2Donker(huid); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(4, -40, 60, -2.6, 1.0); ctx.stroke(); ctx.beginPath(); ctx.arc(-6, -10, 26, -1.5, 2.2); ctx.stroke();
  ctx.fillStyle = '#D8573F'; ctx.beginPath(); ctx.ellipse(-30, -230, 220, 90, 0.05, 0, 6.283); ctx.fill(); // rand van de badmuts
  if (drop > 0.01) { ctx.fillStyle = '#B23A3E'; ctx.beginPath(); ctx.arc(8, 118, 12 * drop, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
// Wat word jij? · Sport en topsport 2 · Waarom al die rustige meters? — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast (de zwemmer = Sam, outfit 'zwem'; de zwemtrainer, garderobe 'bad'; figurant Daan in eigen zwemoutfit). Geen namen in beeld.
// Zwembad zijaanzicht (cold open), bovenaanzicht van de banen (eenvoudige vorm), Micro alleen in zoomcirkels.

// heen en weer zwemmen in een baan: geeft {x, kijk, stil}
function SP2_heenWeer(t, x0, x1, v, rust = 0) { const d = Math.abs(x1 - x0), T = d / v + rust, n = Math.floor(Math.max(0, t) / T), u = Math.max(0, t) - n * T; const heen = n % 2 === 0;
  const s = Math.min(u * v, d), stil = u * v >= d; return { x: heen ? x0 + s : x1 - s, kijk: heen ? 1 : -1, stil }; }
// drie lege balkjes (vraagmoment H1)
function SP2_legeBalken(ctx, x, y, w, a) { if (a <= 0.01) return; SP2_laag(ctx, a, () => { metaText(ctx, 'ENERGIE IN EEN 100 M', x, y - 30, C.text2, 'left', 28);
  ['AEROOB', 'FOSFAATACCU', 'GISTING'].forEach((n, i) => { const yy = y + i * 120; metaText(ctx, n, x, yy + 34, C.text, 'left', 28); roundRect(ctx, x + 300, yy, w - 300, 50, 12); shape(ctx, '#2A3446', C.line, 1.5); text(ctx, '?', x + 300 + (w - 300) / 2, yy + 40, fTitel(40), C.goud, 'center'); }); }); }
// scorebord van de wedstrijd (H3); o.bars [p1 rustig, drempel, snel, p2 ...] 0..1; o.uit: uitslag 0..1 per regel
const SP2_PLAN = [[81, 4, 15], [65, 25, 10]];
function SP2_wedstrijd(ctx, o = {}) { const { bars = [0, 0, 0, 0, 0, 0], kolom = 0, intro = 0, leeg = 0, uit = [0, 0, 0], vraag = 0, t = 0 } = o; const X0 = 120, Y0 = 190, Wb = 1680, Hb = 400;
  roundRect(ctx, X0, Y0, Wb, Hb, 14); shape(ctx, '#0B0F16', '#4A5568', 3);
  SP2_laag(ctx, intro, () => { text(ctx, '22 jonge topzwemmers', 960, Y0 + 170, fTekst(56, 800), C.text, 'center'); metaText(ctx, 'GEMIDDELD 17 JAAR', 960, Y0 + 230, C.grain, 'center', 30); });
  SP2_laag(ctx, kolom, () => { [0, 1].forEach(p => { const cx = X0 + 60 + p * 840; text(ctx, p ? 'Plan 2' : 'Plan 1', cx, Y0 + 70, fTekst(48, 800), C.text, 'left');
    ['RUSTIG', 'DREMPEL', 'SNEL'].forEach((n, i) => { const yy = Y0 + 105 + i * 62, ba = bars[p * 3 + i], col = [C.teal, C.oker, C.goud][i]; metaText(ctx, n, cx, yy + 32, ba > 0.01 ? C.text : C.text2, 'left', 28);
      roundRect(ctx, cx + 200, yy, 440, 42, 8); shape(ctx, '#1A2230', '#3A4458', 1.5);
      if (ba > 0.01) { const L = Math.max(10, 440 * SP2_PLAN[p][i] / 100 * ease(ba)); roundRect(ctx, cx + 200, yy, L, 42, 8); shape(ctx, rgba(col, 0.85), col, 2); SP2_laag(ctx, ba, () => metaText(ctx, SP2_PLAN[p][i] + ' %', cx + 210 + L + 6, yy + 32, C.text, 'left', 28)); } });
    // uitslagrij
    const uy = Y0 + 300; roundRect(ctx, cx, uy, 720, 70, 10); shape(ctx, '#1A2230', '#3A4458', 1.5);
    SP2_laag(ctx, leeg * (1 - (uit[p] || 0)), () => text(ctx, '?', cx + 360, uy + 52, fTitel(44), C.goud, 'center'));
    const ua = uit[p] || 0; SP2_laag(ctx, ua, () => { roundRect(ctx, cx, uy, 720, 70, 10); shape(ctx, p ? rgba(C.text2, 0.15) : rgba(C.groen, 0.2), p ? C.text2 : C.groen, 2); text(ctx, p ? 'bijna 0 % sneller' : 'bijna 1 % sneller', cx + 30, uy + 49, fTekst(40, 800), p ? C.text : C.groen, 'left'); }); });
    SP2_meta(ctx, 'MINDER MOE', X0 + 60 + 700, Y0 + 300 + 46, uit[2] || 0, C.groen, 'right', 28); });
  SP2_laag(ctx, vraag, () => vraagteken(ctx, 960, Y0 + 240, 1, 110)); }
// twee banen met plan 1 en plan 2 (H3)
function SP2_wedstrijdBanen(ctx, t, wissel, a = 1) { SP2_laag(ctx, a, () => { const B = SP2_banen(ctx, 330, 650, 1470, 190, 2, { t });
  metaText(ctx, 'PLAN 1', 120, B.y(0) + 10, C.text2, 'left', 28); metaText(ctx, 'PLAN 2', 120, B.y(1) + 10, C.text2, 'left', 28);
  const sw = (id, i, off) => { const m = SP2_heenWeer(t + off, 420, 1720, 150, 0.6), yy = lerp(B.y(i), B.y(1 - i), ease(wissel)); SP2_boven(ctx, m.x, yy, 74, t + off, { id, kijk: m.kijk, stil: m.stil }); };
  sw('sam', 0, 0); sw('daan', 1, 3.1); }); }

Object.assign(SCENES, {
  title(ctx, t) { const B = SP2_banen(ctx, 1040, 660, 780, 190, 2, { t });
    for (let i = 0; i < 3; i++) { const u = ((t * 0.35 + i / 3) % 1); ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.6 * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1160 + i * 260, B.y(i % 2), 16 + u * 40, 0, 6.283); ctx.stroke(); ctx.restore(); }
    const x = 1100 + ((t * 45) % 600); SP2_spoor(ctx, 1100, x - 40, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 80, t, { id: 'sam', tempo: 0.8 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const P = q.on('Toch', 1, 2.8), z = lerp(1, 1.45, P), cx = lerp(960, 2620, P), cy = lerp(540, 255, P), L = 300, WL = 470;
    const tTik = q.at('zwemmer', 1) - 0.25, xs = Math.min(70 + 272 * t, 1500 - 0.6 * L), getikt = t >= tTik;
    bg(ctx, 'schema'); ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-cx, -cy);
    SP2_badZij(ctx, { wl: WL, bodem: 860, muurX: 1500, t });
    SP2_scorebord(ctx, 700, 110, 470, 230, '100 M VRIJ', getikt ? '55,8' : (51.2 + Math.min(t, 4.6)).toFixed(1).replace('.', ','));
    SP2_laag(ctx, q.on('zwemmer', 1, 0.3) * (1 - P), () => { const g = rgba(C.goud, 0.9); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.strokeRect(690, 100, 490, 250); });
    zwemmer(ctx, 'sam', xs, WL + 0.12 * L, L, getikt ? { slag: 'crawl', fase: 0.1 } : { slag: 'crawl', t });
    // de kant: whiteboard en zwemtrainer
    SP2_bord(ctx, 2300, 95, 520, 285, { kopA: q.on('vijfduizend', 1, 0.5), bars: [q.on('vijfduizend', 1, 0.6), q.on('vijfduizend', 1, 0.6), q.on('vijfduizend', 1, 0.6)], vul: q.on('vijfduizend', 1, 1.2), hl: q.on('rustig', 1) > 0.5 ? 'rustig' : null });
    SP2_trainer(ctx, 2160, t, { y: WL - 34, h: 300, kijk: 1, uit: 'neutraal' });
    ctx.restore();
    SP2_laag(ctx, q.on('Waarom', 1, 0.5), () => { const k = q.on('Waarom', 1, 0.5); SP2_kaart(ctx, 1400 + 60 * (1 - k), 230, 460, 250, 1, C.goud);
      text(ctx, '< 1 minuut', 1440 + 60 * (1 - k), 320, fTekst(54, 800), C.goud, 'left'); text(ctx, 'kilometers', 1440 + 60 * (1 - k), 400, fTekst(44, 700), C.text, 'left'); text(ctx, 'rustig?', 1440 + 60 * (1 - k), 450, fTekst(44, 700), C.teal, 'left'); vraagteken(ctx, 1800 + 60 * (1 - k), 340, 1, 80); }); },

  // ---------- H1 Drie zones, drie energiebronnen ----------
  s03(ctx, t, q) { SP2_kant(ctx); const Ru = q.at('Rustig', 1), Dr = q.at('Drempel', 1), Sn = q.at('snel', 1);
    const hl = t >= Sn ? 'snel' : t >= Dr ? 'drempel' : t >= Ru ? 'rustig' : null;
    SP2_bord(ctx, 120, 170, 640, 390, { vul: q.on('zones', 1, 1.2), hl });
    SP2_trainer(ctx, 900, t, { kijk: -1, pose: t > q.at('zones', 1) ? 'wijs' : 'staan', uit: 'praat' });
    const B = SP2_banen(ctx, 1120, 250, 680, 360, 2, { t });
    // zwemmer rustig (teal), Daan op de drempel (oker), daarna een sprintje (goud)
    const xr = Math.min(1180 + Math.max(0, t - Ru) * 120, 1745); SP2_spoor(ctx, 1180, xr - 30, B.y(0), C.teal, q.on('Rustig', 1, 0.4));
    const xd = Math.min(1180 + Math.max(0, t - Dr) * 175, 1745); SP2_spoor(ctx, 1180, xd - 30, B.y(1), C.oker, q.on('Drempel', 1, 0.4));
    const xs = Math.max(xr - Math.max(0, t - Sn) * 330, 1300); const sp = t >= Sn;
    if (sp) SP2_spoor(ctx, xr, xs + 30, B.y(0) + 0, C.goud, 1, 22);
    SP2_boven(ctx, sp ? xs : xr, B.y(0), 120, t, { id: 'sam', kijk: sp ? -1 : 1, tempo: sp ? 1.8 : 0.8, stil: !sp && (t < Ru || xr >= 1745) });
    SP2_boven(ctx, xd, B.y(1), 116, t + 0.3, { id: 'daan', tempo: 1.2, stil: t < Dr || xd >= 1745 });
    SP2_laag(ctx, q.on('Clubs', 1, 0.5), () => tag(ctx, 'CLUBS: 3 TOT 5 ZONES', 1460, 720, C.goud, 1, 'center', 32)); },

  s04(ctx, t, q) { bg(ctx, 'schema'); const Sn = q.at('Snelle', 1), Hv = q.on('Hoeveel', 1, 0.6), L = 380, WL = 590;
    ctx.fillStyle = SP2_K.water; ctx.fillRect(0, WL, 1000, 860 - WL); ctx.fillStyle = SP2_K.waterD; ctx.fillRect(0, 760, 1000, 100); SP2_lijn(ctx, [[0, WL], [1000, WL]], rgba('#BFE3F2', 0.7), 3);
    const tempo = t >= Sn ? 1.7 : 0.75; const r = zwemmer(ctx, 'sam', 470, WL + 0.12 * L, L, { slag: 'crawl', t: t < Sn ? t * 0.75 : Sn * 0.75 + (t - Sn) * 1.7 });
    SP2_laag(ctx, (q.on('Snelle', 1, 0.4)) * (1 - Hv), () => tag(ctx, 'SNEL', 470, 520, C.goud, 1, 'center', 30));
    SP2_laag(ctx, (1 - q.on('Snelle', 1, 0.4)) * (1 - Hv), () => tag(ctx, 'RUSTIG', 470, 520, C.teal, 1, 'center', 30));
    const cx = 1360, cy = 390, R = 290, ZA = 1 - Hv;
    zoomCircle(ctx, cx, cy, R, r.schouder.x, r.schouder.y, 'SPIERVEZEL', ZA, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const M = q.on('mitochondriën', 1, 0.5), Fo = q.on('fosfaataccu', 1, 0.5), Gi = q.on('gisting', 1, 0.6), Bl = q.on('bloed', 1, 1.2);
      const pos = SP2_vezel(ctx, cx, cy, R, { mito: 5, hl: 1, hlA: M, haarvat: 1, t, h: R * 0.7 });
      // zuurstof (teal) gaat het opgelichte mitochondrium in
      if (M > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.5 + i / 4) % 1), p = pos[1]; SP2_o2(ctx, lerp(p.x - 40 + i * 25, p.x, u), lerp(cy - R * 0.45, p.y, u), 10, M * (1 - u) * (1 - Fo * 0.6)); }
      SP2_laag(ctx, M, () => naamBij(ctx, 'met zuurstof', '', pos[1].x, cy - R * 0.5 - 6, 1, 'center', C.groen));
      // fosfaataccu en gisting (goud) in het snelle deel
      SP2_accu(ctx, cx + R * 0.15, cy - R * 0.02, 34, 1 - 0.7 * ramp(t, q.at('fosfaataccu', 1) + 0.4, 2), Fo);
      const gx = cx + R * 0.62, gy = cy; SP2_glucose(ctx, gx, gy, 30, Gi * (1 - q.on('melkzuur', 1, 0.5)), C.oker);
      const Me = q.on('melkzuur', 1, 0.6); SP2_keten(ctx, gx - 10, gy - 30 * Me, 12, Me * (1 - Bl * 0.8), C.goud, 0.2); SP2_keten(ctx, gx + 14, gy + 30 * Me, 12, Me * (1 - Bl * 0.8), C.goud, -0.2);
      if (Bl > 0.01) for (let i = 0; i < 3; i++) SP2_lac(ctx, gx - 40 + i * 30 + Bl * 30, lerp(gy + 20, cy + R * 0.45 + 16, Bl), 9, Bl); });
    SP2_laag(ctx, q.on('melkzuur', 1, 0.5) * ZA, () => tag(ctx, 'MELKZUUR → LACTAAT', cx, 800, C.oker, 1, 'center', 30));
    SP2_legeBalken(ctx, 1040, 300, 760, Hv); },

  s06(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, "antwoord b: zo'n veertig tot vijftig procent", 1); const L = 380, WL = 590;
    ctx.fillStyle = SP2_K.water; ctx.fillRect(0, WL, 1000, 860 - WL); ctx.fillStyle = SP2_K.waterD; ctx.fillRect(0, 760, 1000, 100); SP2_lijn(ctx, [[0, WL], [1000, WL]], rgba('#BFE3F2', 0.7), 3);
    const r = zwemmer(ctx, 'sam', 470, WL + 0.12 * L, L, { slag: 'crawl', t: t * 1.6 });
    const cx = 1400, cy = 360, R = 220;
    zoomCircle(ctx, cx, cy, R, r.schouder.x, r.schouder.y, 'SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const pos = SP2_vezel(ctx, cx, cy, R, { mito: 5, hl: 1, hlA: 1, haarvat: 1, t, h: R * 0.7 });
      for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1), p = pos[1]; SP2_o2(ctx, lerp(p.x - 30 + i * 25, p.x, u), lerp(cy - R * 0.45, p.y, u), 9, 1 - u); }
      SP2_accu(ctx, cx + R * 0.2, cy, 26, 0.4, 1); SP2_keten(ctx, cx + R * 0.62, cy, 10, 1, C.goud, 0.2); });
    const V = q.on('veertig', 1, 1.4); SP2_energieBalk(ctx, 1000, 700, 800, 64, 0.45 * V, { label: 'ENERGIE IN EEN 100 M', rest: q.on('veertig', 1, 0.4) });
    SP2_laag(ctx, V, () => { text(ctx, '± 40–50 %', 1020, 745, fTekst(36, 800), '#0D1420', 'left'); });
    SP2_laag(ctx, q.on('dissimilatie', 1, 0.5), () => naamBij(ctx, 'aeroob', '', 1180, 805, 1, 'center', C.groen));
    SP2_laag(ctx, q.on('geschat', 1, 0.5), () => { SP2_kaartTekst(ctx, 120, 220, 820, 'GESCHAT', ['goed getrainde jonge zwemmers'], 1, C.line, C.goud, 40); metaText(ctx, 'RIBEIRO E.A. 2015 · HELLARD E.A. 2018', 120, 400, C.grain, 'left', 28); });
    SP2_laag(ctx, q.on('basis', 1, 0.5), () => tag(ctx, 'AEROBE BASIS', 1640, 830, C.groen, 1, 'center', 32)); },

  // ---------- H2 Wat elke zone bouwt ----------
  s07(ctx, t, q) { SP2_kant(ctx); const r = SP2_sam(ctx, 270, t, { h: 560, uit: 'blij' }); const hx = r.hoofd.x, hy = r.hoofd.y, hr = r.hoofd.r;
    const Mi = q.on('mitochondriën', 1, 1.6), Ha = q.on('haarvaten', 1, 1.6), Ha2 = q.on('hart', 1, 0.5), Sl = q.on('slag', 1, 2.0), Bl = q.on('bloed', 2, 0.5);
    const cx = 760, cy = 330, R = 220;
    zoomCircle(ctx, cx, cy, R, hx + hr * 1.7, hy + hr * 1.9, 'SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      SP2_vezel(ctx, cx, cy, R, { mito: 4 + Math.round(4 * Mi), hl: -1, haarvat: 0.35 + 0.65 * Ha, t, h: R * 0.7 });
      if (Mi > 0.01 && Mi < 1) { ctx.save(); ctx.strokeStyle = rgba(C.groen, 0.8 * (1 - Mi)); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R * 0.9, 0, 6.283); ctx.stroke(); ctx.restore(); } });
    SP2_laag(ctx, Mi, () => naamBij(ctx, 'meer mitochondriën', '', cx, cy - R - 20, 1, 'center', C.groen));
    SP2_laag(ctx, Ha, () => naamBij(ctx, 'meer haarvaten', '', cx, cy + R + 84, 1, 'center', C.groen));
    const hcx = 1240, hcy = 330, HR = 160, beat = t * 6.0;
    zoomCircle(ctx, hcx, hcy, HR, hx + hr * 0.35, hy + hr * 3.0, 'HART', Ha2, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(hcx - HR, hcy - HR, 2 * HR, 2 * HR); SP2_hart(ctx, hcx - 40, hcy + 10, 1.25, beat); SP2_maatbeker(ctx, hcx + 85, hcy + 80, 60, 100, (0.45 + 0.4 * Sl) * Math.min(1, ((beat % 6.283) / 3.14))); });
    SP2_laag(ctx, Sl, () => naamBij(ctx, 'meer bloed per slag', '', hcx, hcy + HR + 84, 1, 'center', C.groen));
    // bloedbuisje: eerst meer plasma (dagen), dan meer rode bloedcellen (weken tot maanden)
    const Pl = q.on('bloedplasma', 1, 1.4), Rb = q.on('bloedcellen', 1, 1.6), bx = 1600, by = 560;
    SP2_laag(ctx, Bl, () => { SP2_buisje(ctx, bx, by, 64, 150 + 50 * Rb, 140 + 55 * Pl, 420);
      SP2_laag(ctx, q.on('dagen', 1, 0.4), () => { metaText(ctx, 'PLASMA', bx + 60, by - 250 - 40 * Pl, C.text2, 'left', 28); metaText(ctx, 'DAGEN', bx + 60, by - 215 - 40 * Pl, SP2_K.plasma, 'left', 28); });
      SP2_laag(ctx, q.on('weken', 1, 0.4), () => { metaText(ctx, 'RODE', bx + 60, by - 110, C.text2, 'left', 28); metaText(ctx, 'BLOEDCELLEN', bx + 60, by - 76, C.text2, 'left', 26); metaText(ctx, 'WEKEN TOT', bx + 60, by - 36, SP2_K.bloedL, 'left', 26); metaText(ctx, 'MAANDEN', bx + 60, by - 4, SP2_K.bloedL, 'left', 26); }); });
    metaText(ctx, 'VEREENVOUDIGD', W - 60, 100, C.text2, 'right', 28); },

  s08(ctx, t, q) { SP2_kant(ctx); const Ri = q.at('inzwemmen', 1) - 0.4, Ma = q.on('Maken', 1, 0.6), B = SP2_banen(ctx, 120, 260, 1130, 360, 2, { t, a: 1 - 0.65 * Ma });
    let zx = 1000; SP2_laag(ctx, 1 - 0.65 * Ma, () => { if (t < Ri) { const m = SP2_heenWeer(t + 2.0, 200, 1170, 420, 0.3); SP2_spoor(ctx, m.kijk > 0 ? 200 : 1170, m.x - 30 * m.kijk, B.y(0), C.goud, 1, 22); SP2_boven(ctx, m.x, B.y(0), 120, t, { id: 'sam', kijk: m.kijk, tempo: 1.9, stil: m.stil }); }
      else { const x = Math.min(220 + (t - Ri) * 110, 1150); zx = x; SP2_spoor(ctx, 220, x - 30, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', tempo: 0.7 }); }
      SP2_laag(ctx, 1 - Ma, () => tag(ctx, t < Ri ? 'SNELLE SERIE' : 'RUSTIG INZWEMMEN', 685, 220, t < Ri ? C.goud : C.teal, 1, 'center', 30)); });
    SP2_trainer(ctx, 1440, t, { kijk: -1, uit: 'neutraal' });
    const Ve = q.on('veel', 1, 1.2), We = q.on('weinig', 1, 0.3); let w = '';
    if (t >= q.at('veel', 1)) w = We > 0.5 ? '1,2' : String(Math.max(1, Math.round(1 + 8 * Ve)));
    SP2_lactaatMeter(ctx, 1720, 430, 1.35, w, 1, 1, 0);
    metaText(ctx, 'LACTAAT', 1720, 240, C.oker, 'center', 28); metaText(ctx, 'MILLIMOL', 1720, 620, C.text2, 'center', 26); metaText(ctx, 'PER LITER', 1720, 654, C.text2, 'center', 26);
    // vraagmoment: neutrale vezel
    const cx = 690, cy = 440, R = 250; zoomCircle(ctx, cx, cy, R, zx, B.y(0), 'SPIERVEZEL', Ma, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); SP2_vezel(ctx, cx, cy, R, { mito: 5, haarvat: 1, t, h: R * 0.7 }); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord b: wel, je lichaam gebruikt het meteen', 1);
    const cx = 720, cy = 500, R = 300, Ru = q.on('rustig', 1, 0.5), Ha = q.on('hart', 1, 0.6), Br = q.on('brandstof', 1, 0.5), He = q.on('herstelt', 1, 0.5);
    zoomCircle(ctx, cx, cy, R, cx, cy, 'WITTE EN RODE SPIERVEZEL', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      SP2_vezel(ctx, cx, cy - 135, R, { mito: 2, wit: true, t, h: 130 });
      const rp = SP2_vezel(ctx, cx, cy + 135, R, { mito: 6, t, h: 130, hl: 2, hlA: Ru });
      // bloedvat ertussen
      ctx.fillStyle = rgba(SP2_K.bloed, 0.85); ctx.fillRect(cx - R, cy - 34, 2 * R, 68); ctx.strokeStyle = SP2_K.bloedL; ctx.lineWidth = 2; ctx.strokeRect(cx - R - 2, cy - 34, 2 * R + 4, 68);
      for (let k = 0; k < 9; k++) { const x = cx - R + ((k * 80 + t * 70) % (2 * R)); ctx.beginPath(); ctx.ellipse(x, cy + Math.sin(k) * 14, 13, 7, 0, 0, 6.283); ctx.fillStyle = SP2_K.bloedL; ctx.fill(); }
      // ook bij rustig zwemmen: lactaat uit de witte vezel gaat meteen de rode vezel in
      if (Ru > 0.01) for (let i = 0; i < 4; i++) { const u = ((t * 0.4 + i / 4) % 1), sx = cx - 180 + i * 110, p = rp[(i + 1) % rp.length];
        SP2_lac(ctx, lerp(sx, p.x, u), lerp(cy - 135, p.y, u), 10, Ru * (u < 0.85 ? 1 : (1 - u) / 0.15)); }
      // via het bloed naar het hart
      if (Ha > 0.01) for (let i = 0; i < 5; i++) { const u = ((t * 0.3 + i / 5) % 1); SP2_lac(ctx, lerp(cx - R, cx + R, u), cy + (i % 2 ? -12 : 12), 10, Ha); } });
    const hcx = 1450, hcy = 430, HR = 170;
    zoomCircle(ctx, hcx, hcy, HR, cx + R, cy, 'HART', Ha, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(hcx - HR, hcy - HR, 2 * HR, 2 * HR); SP2_hart(ctx, hcx, hcy + 10, 1.35, t * 6);
      for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i / 4) % 1); SP2_lac(ctx, lerp(hcx - HR, hcx - 10, u), hcy + 10 + (i - 1.5) * 26, 10, Ha * (1 - u)); } });
    SP2_lactaatMeter(ctx, 1760, 250, 0.7, '1,2', Ru, 1, 0); SP2_meta(ctx, 'LACTAAT', 1760, 120, Ru, C.oker, 'center', 26);
    SP2_laag(ctx, Br, () => tag(ctx, 'BRANDSTOF', 1110, 230, C.oker, 1, 'center', 34));
    // herstel tussen snelle herhalingen
    SP2_laag(ctx, He, () => { const x0 = 1180, y0 = 700; metaText(ctx, 'HERHALING · RUST · HERHALING', x0, y0 - 16, C.text2, 'left', 26);
      roundRect(ctx, x0, y0, 180, 56, 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); roundRect(ctx, x0 + 196, y0, 240, 56, 10); shape(ctx, rgba(C.teal, 0.45), C.teal, 2); roundRect(ctx, x0 + 452, y0, 180, 56, 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); });
    metaText(ctx, 'BROOKS 2018 · 2020', 1820, 860, C.grain, 'right', 28); },

  s11(ctx, t, q) { SP2_kant(ctx); const B = SP2_banen(ctx, 120, 300, 960, 300, 2, { t }); const Sh = q.on('schuift', 1, 2.0), Sn = q.at('snelle', 1), Ra = q.at('rust', 1);
    const G = SP2_grafiek(ctx, 1260, 250, 520, 360, { dv: 0.12 * Sh, oud: Sh, col: C.oker, curve: 1, lab: false });
    metaText(ctx, 'LACTAAT', 1260, 226, C.text2, 'left', 28); metaText(ctx, 'SNELHEID →', 1780, 654, C.text2, 'right', 28);
    SP2_laag(ctx, q.on('drempelzone', 1, 0.4), () => { const u = SP2_uVoor(4, 0.12 * Sh); circ(ctx, G.X(u), G.Y(4), 12, C.oker, '#1A2740', 2); });
    SP2_laag(ctx, Sh, () => pijl(ctx, G.X(SP2_uVoor(4, 0)) - 10, G.Y(4) - 50, G.X(SP2_uVoor(4, 0.12)) + 10, G.Y(4) - 50, C.oker, 1, 4, 16));
    SP2_laag(ctx, q.on('drempelzone', 1, 0.4) * (1 - q.on('snelle', 1, 0.4)), () => tag(ctx, 'DREMPEL', 600, 250, C.oker, 1, 'center', 30));
    // rustig zwemmen tot de snelle zone; dan een sprint over 25 m en lange rust aan de kant
    if (t < Sn) { const x = Math.min(200 + t * 90, 1000); SP2_spoor(ctx, 200, x - 30, B.y(1), C.teal, 0.6); SP2_boven(ctx, x, B.y(1), 110, t, { id: 'daan', tempo: 0.8 }); }
    const sx = Math.min(200 + Math.max(0, t - Sn) * 300, 600); SP2_laag(ctx, q.on('snelle', 1, 0.4), () => { SP2_spoor(ctx, 200, sx - 30, B.y(0), C.goud, 1, 22); SP2_boven(ctx, sx, B.y(0), 120, t, { id: 'sam', tempo: 2, stil: sx >= 600 });
      tag(ctx, 'SNEL', 600, 250, C.goud, 1, 'center', 30); SP2_lijn(ctx, [[600, 310], [600, 590]], C.text, 3, 0.7, [10, 8]); metaText(ctx, '25 M', 400, 660, C.text2, 'center', 28); });
    SP2_laag(ctx, q.on('rust', 1, 0.4), () => SP2_stopwatch(ctx, 930, 730, 70, Math.max(0, t - Ra) / 6, 1, '')); },

  // ---------- H3 De wedstrijd ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Pl = q.on('één', 1, 0.6);
    SP2_wedstrijd(ctx, { t, intro: 1 - Pl, kolom: Pl, leeg: q.on('Welk', 1, 0.5),
      bars: [q.on('vijfde', 1, 0.8), q.on('drempel', 1, 0.8), q.on('snel', 1, 0.8), q.on('rustig', 2, 0.8), q.on('kwart', 1, 0.8), q.on('snel', 2, 0.8)] });
    SP2_laag(ctx, q.on('zes', 1, 0.4) * (1 - Pl), () => tag(ctx, 'ELK PLAN 6 WEKEN', 960, 500, C.goud, 1, 'center', 32));
    SP2_meta(ctx, 'PLA E.A. 2019', 1800, 160, q.on('Onderzoekers', 1, 0.5), C.grain, 'right', 28);
    const Wi = q.on('allebei', 1, 1.0); SP2_wedstrijdBanen(ctx, t, Wi);
    SP2_laag(ctx, SP2_fase(t, q.at('allebei', 1), q.at('één', 1) - 0.2), () => tag(ctx, 'IEDEREEN DEED ALLEBEI', 960, 568, C.goud, 1, 'center', 30));
    SP2_laag(ctx, q.on('tijd', 1, 0.4) * (1 - q.on('Welk', 1, 0.4)), () => tag(ctx, '100 M OP TIJD', 960, 160, C.text2, 1, 'center', 28)); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord c: plan één, met rustig én snel', 1);
    SP2_wedstrijd(ctx, { t, kolom: 1, leeg: 1, bars: [1, 1, 1, 1, 1, 1], uit: [q.on('sneller', 1, 0.6), q.on('twee', 1, 0.6), q.on('moe', 1, 0.5)], vraag: q.on('Waarom', 1, 0.5) });
    SP2_laag(ctx, q.on('onderzoek', 1, 0.5), () => tag(ctx, 'KLEIN VERSCHIL · ÉÉN ONDERZOEK', 960, 650, C.koraal, 1, 'center', 32));
    metaText(ctx, 'PLA E.A. 2019', 1800, 160, C.grain, 'right', 28);
    SP2_wedstrijdBanen(ctx, t, 0, 1 - q.on('onderzoek', 1, 0.5)); },

  // ---------- H4 Een zone weglaten ----------
  s15(ctx, t, q) { SP2_kant(ctx); const B = SP2_banen(ctx, 120, 300, 1130, 220, 1, { t });
    const Sp = q.at('sprints', 1); const per = 5.5, u = Math.max(0, t - 0.3) % per, n = Math.floor(Math.max(0, t - 0.3) / per), heen = n % 2 === 0, d = Math.min(u * 560, 990), x = heen ? 200 + d : 1190 - d, stil = u * 560 >= 990;
    if (!stil) SP2_spoor(ctx, heen ? 200 : 1190, x - 30 * (heen ? 1 : -1), B.y(0), C.goud, 1, 22);
    SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', kijk: heen ? 1 : -1, tempo: 2, stil });
    SP2_laag(ctx, q.on('sprints', 1, 0.4), () => tag(ctx, 'ALLEEN SNEL', 685, 250, C.goud, 1, 'center', 30));
    SP2_laag(ctx, q.on('zonder', 1, 0.4), () => tag(ctx, 'GEEN RUSTIGE METERS', 685, 600, C.teal, 1, 'center', 30));
    const wk = q.on('zes', 1, 0.1) > 0 ? Math.min(6, 1 + Math.floor(Math.max(0, t - q.at('zes', 1)) / 1.1)) : 1, fl = (Math.max(0, t - q.at('zes', 1)) / 1.1) % 1;
    SP2_kalender(ctx, 1440, 170, 280, 250, wk, 0, 1, 'WEEK'); SP2_laag(ctx, q.on('zes', 1, 0.4), () => tag(ctx, '6 WEKEN', 1580, 124, C.koraal, 1, 'center', 28));
    SP2_trainer(ctx, 1580, t, { kijk: -1, uit: 'neutraal' }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const Sp = q.on('Sprints', 1, 0.5), La = q.on('Laat', 1, 0.6), Sn2 = q.at('snelle', 2) - 0.3, De = ramp(t, Sn2, 0.6), Of = q.on('Of', 1, 0.6);
    const A = 1 - La; SP2_laag(ctx, 1 - q.on('Sprints', 1, 0.6), () => SP2_antwoord(ctx, 'antwoord a: herstel, tussen herhalingen en races', 1));
    // twee rijen herhalingen: tijd per herhaling
    SP2_laag(ctx, A, () => { const He = ramp(t, 0.2, 1.5); const groep = (x0, lab, hs, col) => { metaText(ctx, lab, x0, 330, C.text, 'left', 28); SP2_lijn(ctx, [[x0 - 10, 640], [x0 + 470, 640]], C.line, 2);
        hs.forEach((h, i) => { const a = clamp(He * 5 - i, 0, 1); if (a <= 0.01) return; roundRect(ctx, x0 + i * 95, 640 - h * a, 70, h * a, 6); shape(ctx, rgba(col(i), 0.7), col(i), 2); }); };
      groep(150, 'MET RUSTIGE METERS', [210, 212, 210, 214, 212], () => C.teal); groep(760, 'ZONDER', [210, 222, 238, 256, 276], (i) => i < 2 ? C.goud : C.koraal);
      metaText(ctx, 'TIJD PER HERHALING', 150, 690, C.text2, 'left', 26);
      SP2_laag(ctx, q.on('trager', 1, 0.5), () => { pijl(ctx, 800, 440, 1200, 350, C.koraal, 1, 5, 20); tag(ctx, 'TRAGER HERSTEL?', 995, 270, C.koraal, 1, 'center', 30); });
      SP2_laag(ctx, q.on('verwachten', 1, 0.5), () => metaText(ctx, 'VERWACHTING VAN TRAINERS · NIET GEMETEN', 960, 780, C.grain, 'center', 28)); });
    SP2_laag(ctx, Sp * (1 - La), () => { const cx = 1560, cy = 450, R = 200; zoomCircle(ctx, cx, cy, R, cx, cy, 'OOK MET SPRINTS', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); SP2_vezel(ctx, cx, cy, R, { mito: 4, hl: 1, hlA: 1, haarvat: 1, t, h: R * 0.7 }); }); });
    // zonder snelle meters: fit, niet snel
    SP2_laag(ctx, La * (1 - De), () => { SP2_kant(ctx); const B = SP2_banen(ctx, 160, 330, 1300, 200, 1, { t }); const x = 260 + ((t - q.at('Laat', 1)) * 80) % 1100; SP2_spoor(ctx, 240, x - 30, B.y(0), C.teal, 1); SP2_boven(ctx, x, B.y(0), 120, t, { id: 'sam', tempo: 0.7 });
      tag(ctx, 'ALLEEN RUSTIG', 810, 280, C.teal, 1, 'center', 30); SP2_laag(ctx, q.on('fit', 1, 0.4), () => tag(ctx, 'FIT, NIET SNEL', 810, 650, C.koraal, 1, 'center', 36)); });
    // eigen beurt van de zwemtrainer
    SP2_laag(ctx, De * (1 - Of), () => { SP2_kant(ctx); SP2_trainer(ctx, 420, t, { kijk: 1, pose: 'wijs', uit: t < q.at('doen', 1) ? 'praat' : 'blij' }); SP2_sam(ctx, 760, t, { kijk: -1, uit: 'blij' });
      SP2_kaartTekst(ctx, 1040, 270, 800, '', ['De snelle meters maken je snel.', 'De rustige maken dat je ze', 'vaak kunt doen.'], 1, C.goud, C.goud, 40); });
    // nog niet beslist
    SP2_laag(ctx, Of, () => { SP2_weegschaal(ctx, 960, 700, 0.9, Math.sin(t * 1.2) * 0.05, ['meer meters'], ['minder meters,', 'racetempo']); vraagteken(ctx, 960, 400, 1, 100);
      SP2_laag(ctx, q.on('beslist', 1, 0.4), () => tag(ctx, 'NOG NIET BESLIST', 960, 230, C.koraal, 1, 'center', 32));
      metaText(ctx, 'MACINNIS & GIBALA 2017 · NUGENT E.A. 2017 · PAPADIMITRIOU E.A. 2025', 960, 860, C.grain, 'center', 26); }); },

  // ---------- H5 Hoe een trainer de zones vindt ----------
  s18(ctx, t, q) { SP2_kant(ctx); const Tw = ramp(t, q.at('zwemmers', 1) - 0.3, 0.6), Pr = q.on('prikje', 1, 0.5), Cu = q.at('Eerst', 1), Cl = q.on('clubs', 1, 0.8);
    SP2_laag(ctx, 1 - Tw, () => { const r = SP2_sam(ctx, 360, t, { h: 380, uit: t < 4 ? 'blij' : 'neutraal' });
      SP2_trainer(ctx, 640, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => SP2_lactaatMeter(c, hx, hy - 20, 0.42, t > q.at('genoteerd', 1) ? '1,1' : '', 1, 1, ramp(t, q.at('oorlel', 1) + 0.4, 0.5)) });
      SP2_laag(ctx, q.on('zeven', 1, 0.4) * (1 - Pr), () => tag(ctx, '7 × 200 M · STEEDS SNELLER', 480, 300, C.teal, 1, 'center', 30));
      const ex = r.hoofd.x + r.hoofd.r * 1.0, ey = r.hoofd.y + r.hoofd.r * 0.4;
      zoomCircle(ctx, 520, 230, 140, ex, ey, 'OORLEL', Pr * (1 - q.on('Lactaat', 1, 0.5)), () => { SP2_oor(ctx, 510, 220, 0.62, CAST.sam.huid, 1, ramp(t, q.at('oorlel', 1), 0.6));
        const st = ramp(t, q.at('oorlel', 1) + 0.3, 0.6); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(580 - 60 * st, 280, 120, 18); });
      ['LACTAAT', 'HARTSLAG', 'TIJD'].forEach((s2, i) => SP2_laag(ctx, q.on(['Lactaat', 'hartslag', 'tijd'][i], 1, 0.4), () => tag(ctx, s2, 880, 520 + i * 74, [C.oker, C.koraal, C.teal][i], 1, 'left', 28))); });
    // grafiek: per stap een punt, eerst vlak, dan steil
    const pu = Math.max(0, (t - q.at('stap', 2)) / 1.2);
    SP2_laag(ctx, 1 - Tw, () => { const g = SP2_grafiek(ctx, 1150, 210, 640, 470, { punten: pu, curve: clamp((t - Cu) / 3.4, 0, 1), col: C.text, zones: Cl, grens: q.on('Tussen', 1, 0.5) });
      SP2_laag(ctx, q.on('drempelzone', 1, 0.5) * (1 - Cl), () => { ctx.fillStyle = rgba(C.oker, 0.3); const u2 = SP2_uVoor(2), u4 = SP2_uVoor(4); ctx.fillRect(g.X(u2), 210, g.X(u4) - g.X(u2), 470); });
      SP2_laag(ctx, q.on('lactaatcurve', 1, 0.5) * (1 - Cl), () => naamBij(ctx, 'lactaatcurve', '', g.X(0.86) - 10, g.Y(8) , 1, 'right', C.text));
      SP2_laag(ctx, q.on('drempelzone', 1, 0.5), () => naamBij(ctx, 'drempelzone', '', g.X((SP2_uVoor(2) + SP2_uVoor(4)) / 2), 250, 1, 'center', C.oker));
      SP2_laag(ctx, q.on('Ongeveer', 2, 0.5) * (1 - Cl), () => tag(ctx, 'ONGEVEER', g.X((SP2_uVoor(2) + SP2_uVoor(4)) / 2), 330, C.koraal, 1, 'center', 28));
      SP2_laag(ctx, Cl, () => { const a2 = SP2_uVoor(2) + 0.05, a4 = SP2_uVoor(4) - 0.05; SP2_lijn(ctx, [[g.X(a2), 300], [g.X(a2), 680]], '#E8E4DA', 3, 1, [8, 8]); SP2_lijn(ctx, [[g.X(a4), 300], [g.X(a4), 680]], '#E8E4DA', 3, 1, [8, 8]);
        SP2_vlag(ctx, g.X(a2), 380, '#E8E4DA'); SP2_vlag(ctx, g.X(a4), 380, '#E8E4DA'); SP2_vlag(ctx, g.X(SP2_uVoor(2)), 470, C.koraal); SP2_vlag(ctx, g.X(SP2_uVoor(4)), 470, C.koraal); metaText(ctx, 'TWEE CLUBS, TWEE INDELINGEN', 1150, 760, C.grain, 'left', 26); }); });
    // vraagmoment: twee zwemmers, dezelfde tijd
    SP2_laag(ctx, Tw, () => { SP2_sam(ctx, 720, t, { kijk: 1 }); SP2_daan(ctx, 1200, t, { kijk: -1 }); tag(ctx, '200 M · 2:15', 720, 420, C.text2, 1, 'center', 32); tag(ctx, '200 M · 2:15', 1200, 420, C.text2, 1, 'center', 32); }); },

  s20(ctx, t, q) { bg(ctx, 'schema'); SP2_antwoord(ctx, 'antwoord c: niet per se, hun lactaatcurve beslist', 1);
    const Sc = q.on('schuift', 1, 2.0), Da = q.on('Daarom', 1, 0.5), u215 = 0.6;
    const graf = (x, dv, oud, col, nr, kl, lab) => { const g = SP2_grafiek(ctx, x, 310, 640, 330, { dv, oud, zones: 1, col: C.text, lab: true });
      const l = SP2_lac_v(u215, dv), p = q.on(kl, 1, 0.5); SP2_lijn(ctx, [[g.X(u215), 310], [g.X(u215), 640]], C.text, 2, 0.8, [6, 6]); metaText(ctx, '2:15', g.X(u215), 682, C.text, 'center', 28);
      circ(ctx, g.X(u215), g.Y(l), 13, col, '#1A2740', 2); SP2_laag(ctx, p, () => naamBij(ctx, lab, '', g.X(u215) + 22, g.Y(l) - 16, 1, 'left', col));
      text(ctx, nr, x + 640, 240, fTekst(36, 700), C.text, 'right'); };
    graf(200, 0.08 + 0.12 * Sc, Sc, C.teal, 'zwemmer 1', 'rustig', 'rustig');
    graf(1080, -0.08, 0, C.oker, 'zwemmer 2', 'drempel', 'drempel');
    SP2_laag(ctx, q.on('minder', 1, 0.5) * (1 - Da), () => SP2_kaartTekst(ctx, 200, 715, 1180, 'NA MAANDEN TRAINEN', ['minder lactaat in het bloed bij dezelfde snelheid'], 1, C.groen, C.groen, 36));
    SP2_laag(ctx, Da, () => { const x0 = 360, x1 = 1560, y = 790; SP2_lijn(ctx, [[x0, y], [x1, y]], C.line, 3); metaText(ctx, 'SEIZOEN', x0 - 20, y + 10, C.text2, 'right', 28);
      for (let i = 0; i < 4; i++) { const a = q.on('keer', 1, 0.3 + i * 0.25); const x = x0 + 120 + i * 320; SP2_laag(ctx, a, () => { circ(ctx, x, y, 14, C.oker, '#1A2740', 2); metaText(ctx, 'TEST', x, y - 30, C.oker, 'center', 26); }); } });
    metaText(ctx, 'PYNE E.A. 2001 · SCRUTON E.A. 2015', 1820, 860, C.grain, 'right', 28); },

  // ---------- Recap ----------
  s21(ctx, t, q) { SP2_kant(ctx); const Ru = q.on('rustige', 1, 0.5), Sn = q.on('snelle', 1, 0.5), Op = ramp(t, q.at('doen', 1) - 2.2, 0.3);
    const b = SP2_bord(ctx, 100, 170, 720, 420, { hl: null });
    const kaartje = (i, s2, col, a) => { const r = b.rijen[i]; SP2_laag(ctx, a, () => tag(ctx, s2, 880, r.y + 14, col, 1, 'left', 30)); };
    kaartje(0, 'AEROBE BASIS · HERSTEL', C.teal, Ru); kaartje(1, 'DREMPEL OMHOOG', C.oker, q.on('snelle', 1, 0.9)); kaartje(2, 'RACESNELHEID', C.goud, Sn);
    SP2_trainer(ctx, 1380, t, { kijk: -1, uit: t > q.at('zegt', 1) && t < q.at('doen', 1) ? 'praat' : 'blij', pose: t > q.at('Zoals', 1) ? 'wijs' : 'staan' });
    // 100 m en 50 m: aeroob deel
    SP2_laag(ctx, q.on('100', 1, 0.5) * (1 - Ru), () => { SP2_energieBalk(ctx, 1000, 250, 800, 48, 0.45, { label: '100 M · AEROOB ± 40–50 %' });
      SP2_laag(ctx, q.on('50', 1, 0.5), () => { SP2_energieBalk(ctx, 1000, 380, 800, 48, 0.2, { label: '50 M · AEROOB ± 20 %' }); metaText(ctx, 'PAPADIMITRIOU E.A. 2025', 1800, 480, C.grain, 'right', 26); }); });
    // de zwemmer op het startblok
    ctx.fillStyle = SP2_K.water; ctx.fillRect(1790, SP2_GROND + 10, 130, 20); const s = 380 / 1.8;
    SP2_startblok(ctx, 1790, SP2_GROND - 0.75 * s, s, 1);
    SP2_laag(ctx, 1 - Op, () => SP2_sam(ctx, 1640, t, { h: 380, kijk: 1, uit: 'blij' }));
    SP2_laag(ctx, Op, () => zwemmer(ctx, 'sam', 1790, SP2_GROND - 0.75 * s, 380, { slag: 'startblok', kijk: 1 })); },

  s22(ctx, t, q) { SP2_kant(ctx); SP2_trainer(ctx, 330, t, { h: 440, kijk: 1, uit: t < 2.6 ? 'praat' : 'blij', pose: 'staan' });
    SP2_kaartTekst(ctx, 640, 190, 520, 'BEROEP', ['zwemtrainer'], q.on('zwemtrainer', 1, 0.4), C.goud);
    SP2_kaartTekst(ctx, 640, 360, 520, 'BEROEP', ['inspanningsfysioloog'], q.on('Inspanningsfysiologen', 1, 0.4), C.goud);
    SP2_kaartTekst(ctx, 1210, 190, 640, 'SPORTBOND · TRAINER-COACH', ['niveau 1–6', '(niet elke sport alle niveaus)'], q.on('Trainer', 2, 0.4), C.line, C.goud, 32);
    SP2_kaartTekst(ctx, 1210, 410, 640, 'WO · BEWEGINGSWETENSCHAPPEN', ['Amsterdam (VU) · Groningen (RUG)'], q.on('bewegingswetenschappen', 1, 0.4), C.line, C.goud, 32);
    SP2_kaartTekst(ctx, 1210, 580, 640, 'HBO · SPORTKUNDE', ['Nijmegen (HAN)'], q.on('hbo', 1, 0.4), C.line, C.goud, 32);
    SP2_meta(ctx, 'OPLEIDINGEN · STAND 2026', 1850, 800, q.on('Trainer', 2, 0.4), C.grain, 'right', 26); }
});
