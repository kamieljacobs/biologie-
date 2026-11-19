
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
// Wat word jij? · Sport en topsport 3 · Sterk op het droge — eigen tekeningen (v1.0, 19 nov 2026).
// Seriekleuren (REEKS-sport): teal = water, goud = afzet en voortstuwing, koraal = weerstand en 'let op',
// oker = kracht en droogtraining, groen = geleidelijk opbouwen. Geen namen in beeld.
// Maten: Sam 1,79 m; startblok ± 0,75 m boven het water; 50-meterbad ± 2 m diep (zijaanzicht).
// Decors (bad en krachtzaal) zijn vlak getekend in de film zelf, alleen onder scènes die daar spelen.

const SP3 = { waterT: '#2C6A8A', waterD: '#1D4A66', tegel: '#3A7C9C', tegelL: '#5E9CBA', lijn: '#13283A', dek: '#3A4A62', dekL: '#56688A',
  muur: '#25344C', vloer: '#2E3B52', vloerL: '#3C4C66', mat: '#3E5C8A', matL: '#5676A8', staal: '#B8C2CE', schijf: '#30343C', schijfR: '#C9A35C',
  rek: '#5A6A84', elastiek: '#7FC48F', huidSam: '#7A5440' };
const GROND = 800; // vloerlijn in de krachtzaal

// ---------- castaanvullingen voor deze film (ter keuring) ----------
// krachttrainer (t11): nieuw beroepspersonage zonder naam, ± 30, sportkleding; Daan als figurant in zwemkleding (blauwe badmuts).
if (typeof CAST !== 'undefined') {
  if (!CAST.krachttrainer) CAST.krachttrainer = { naam: 'Krachttrainer', leeftijd: 31, rol: 'krachttrainer · bouwt de training in de krachtzaal stap voor stap op · alleen in zijn eigen vak; in beeld alleen het vak, geen naam',
    huid: '#B98060', haar: '#22180F', kapsel: 'kort', wenkbrauw: '#1E140C', baard: true,
    top: 'tshirt', topKleur: '#3A4152', topAccent: '#2E3442', broek: '#262B36', kort: true, schoen: '#F2F2EE', schoenAccent: '#C9A35C', accessoire: [], lengte: 1.02, schouderK: 2.05,
    garderobe: { zaal: {} } };
  if (CAST.daan && CAST.daan.garderobe && !CAST.daan.garderobe.zwem) CAST.daan.garderobe.zwem = { top: 'bloot', topKleur: '#EBC6A6', topAccent: '#D8B090', broek: '#2F5FA8', broekAccent: '#F2F2EE',
    schoen: '#EBC6A6', schoenAccent: '#EBC6A6', kapsel: 'badmuts', badmuts: '#2F7FD0', accessoire: ['zwembroek', 'blootsvoets', 'zwembril', 'sproeten'] };
}

// ---------- algemene hulpjes ----------
function SP3_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP3_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP3_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP3_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function SP3_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP3_tekst(ctx, s2, x, y, px, col = C.text, al = 'left', a = 1, w = 700) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, w), col, al); ctx.restore(); }
function SP3_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
// dikke pijl met kop (voor afzet en kracht)
function SP3_pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 14) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), k = Math.min(lw * 2.4, L * 0.6);
  ctx.translate(x1, y1); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(0, -lw / 2); ctx.lineTo(L - k, -lw / 2); ctx.lineTo(L - k, -lw * 1.25); ctx.lineTo(L, 0); ctx.lineTo(L - k, lw * 1.25); ctx.lineTo(L - k, lw / 2); ctx.lineTo(0, lw / 2); ctx.closePath(); shape(ctx, rgba(col, 0.9), lighten(col, 0.3), 2); ctx.restore(); }
// ronde pijl (draaien), van hoek a0 naar a1 om (x, y)
function SP3_boogPijl(ctx, x, y, r, a0, a1, col, a = 1, lw = 6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, a0, a1, a1 < a0); ctx.stroke();
  const ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r, tg = a1 + (a1 < a0 ? -1 : 1) * Math.PI / 2; ctx.beginPath(); ctx.moveTo(ex + Math.cos(tg) * lw * 2.4, ey + Math.sin(tg) * lw * 2.4); ctx.lineTo(ex + Math.cos(tg + 2.4) * lw * 2, ey + Math.sin(tg + 2.4) * lw * 2); ctx.lineTo(ex + Math.cos(tg - 2.4) * lw * 2, ey + Math.sin(tg - 2.4) * lw * 2); ctx.closePath(); ctx.fill(); ctx.restore(); }

// ---------- lichaam in elke houding (zijaanzicht) ----------
// zoals zwemmer() uit lib_cast.js, maar met vrije armen, benen en draaiing: (x, y) = heupgewricht, lengte = staande lengte.
// o.pitch: 0 = hoofd naar rechts (kijk 1), + = hoofd omhoog; o.rug = op de rug (buik boven); o.naHoofd = armen gestrekt boven het hoofd.
function SP3_lijf(ctx, id, x, y, lengte, o = {}) {
  const P0 = CAST[id]; if (!P0) return {}; const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const outfit = o.outfit || (P0.garderobe && P0.garderobe.zwem ? 'zwem' : undefined), P = Object.assign({}, P0, (P0.garderobe && outfit && P0.garderobe[outfit]) || {});
  const Hh = lengte * (P.lengte || 1), hh = Hh / (P.kop || 6.1), kijk = o.kijk || 1, pitch = o.pitch || 0;
  const M = new DOMMatrix().translate(x, y).scale(kijk, 1).scale(1, o.rug ? -1 : 1).rotate((Math.PI / 2 - pitch) * 180 / Math.PI);
  ctx.save(); ctx.transform(M.a, M.b, M.c, M.d, M.e, M.f);
  const nh = o.naHoofd ? [Math.PI - (-0.12), -0.12 - (-0.1)] : null;
  const r = persoon(ctx, id, 0, Hh - hh * 3.45, lengte, { zij: true, kijk: 1, vrij: true, outfit, a, uit: o.uit || 'neutraal', bril: o.bril || (outfit === 'zwem' ? 'ogen' : undefined), t: o.t || 0,
    arm: o.arm || nh || [0.1, 0.1], armK: o.armK || (nh ? [1.06, 1.06] : undefined), armVer: o.armVer || o.arm || nh || [0.1, 0.1], armVerK: o.armVerK || (nh ? [1.06, 1.06] : undefined),
    been1: o.been1 || { th: 0, kn: 0, an: -1.35 }, been2: o.been2 || o.been1 || { th: 0, kn: 0, an: -1.35 }, armNaHoofd: !!o.naHoofd, knik: o.knik });
  ctx.restore();
  const Wp = (pt) => { if (!pt || pt.x == null) return pt; const q = M.transformPoint(new DOMPoint(pt.x, pt.y)); return Object.assign({}, pt, { x: q.x, y: q.y }); };
  const d = hh * (P.schouderK ? P.schouderK * 0.68 : 1.25);
  return { hoofd: Wp(r.hoofd), handR: Wp(r.handR), voet: Wp(r.voet), heup: Wp({ x: 0, y: 0 }), schouder: Wp({ x: d * 0.04, y: -hh * 1.9 }), enkel: Wp({ x: 0, y: Hh - hh * 3.67 }), hh, M };
}

// ---------- zwembad (zijaanzicht onder water) ----------
// o: wl = waterlijn, bodem, muur = x van de keerpuntmuur (rechts) of null, a
function SP3_bad(ctx, o = {}) { const { wl = 300, bodem = 850, muur = null, a = 1, t = 0, x0 = 0, x1 = W } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const xe = muur != null ? muur : x1;
  // hal boven het water: rustige achterwand met lichtband
  ctx.fillStyle = rgba('#22324C', 0.9); ctx.fillRect(x0, wl - 200, xe - x0, 200);
  ctx.fillStyle = rgba(C.teal, 0.08); ctx.fillRect(x0, wl - 160, xe - x0, 34);
  const g = ctx.createLinearGradient(0, wl, 0, bodem); g.addColorStop(0, SP3.waterT); g.addColorStop(1, SP3.waterD); ctx.fillStyle = g; ctx.fillRect(x0, wl, xe - x0, bodem - wl);
  // bodemtegels en zwarte baanlijn (met T bij de muur)
  ctx.fillStyle = rgba(SP3.tegel, 0.55); ctx.fillRect(x0, bodem - 14, xe - x0, 14); ctx.strokeStyle = rgba(SP3.tegelL, 0.35); ctx.lineWidth = 1.5; for (let x = x0; x < xe; x += 46) { ctx.beginPath(); ctx.moveTo(x, bodem - 14); ctx.lineTo(x, bodem); ctx.stroke(); }
  ctx.fillStyle = SP3.lijn; ctx.fillRect(x0, bodem - 22, xe - x0 - (muur != null ? 120 : 0), 10);
  // waterlijn met kleine golfjes
  ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= xe; x += 12) { const y = wl + Math.sin(x * 0.03 + t * 2.2) * 3; x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  if (muur != null) { // keerpuntmuur met tegels, dek erboven, T-markering op de muur
    ctx.fillStyle = SP3.tegel; ctx.fillRect(muur, wl - 60, x1 - muur, bodem - wl + 60); ctx.strokeStyle = rgba(SP3.tegelL, 0.7); ctx.lineWidth = 1.5;
    for (let y = wl - 60; y < bodem; y += 40) { ctx.beginPath(); ctx.moveTo(muur, y); ctx.lineTo(x1, y); ctx.stroke(); }
    for (let x = muur; x < x1; x += 40) { ctx.beginPath(); ctx.moveTo(x, wl - 60); ctx.lineTo(x, bodem); ctx.stroke(); }
    ctx.fillStyle = SP3.lijn; ctx.fillRect(muur, (wl + bodem) / 2 - 70, 14, 140); ctx.fillRect(muur, (wl + bodem) / 2 - 7, 60, 14);
    ctx.fillStyle = SP3.dekL; ctx.fillRect(muur - 10, wl - 74, x1 - muur + 10, 18); }
  ctx.restore(); }
// water als licht vlak vóór een lichaam (alleen onder de waterlijn), nooit de persoon zelf doorzichtig
function SP3_waterVoor(ctx, x0, x1, wl, bodem, t = 0) { ctx.save(); ctx.beginPath(); ctx.moveTo(x0, bodem); for (let x = x0; x <= x1; x += 12) ctx.lineTo(x, wl + Math.sin(x * 0.03 + t * 2.2) * 3); ctx.lineTo(x1, bodem); ctx.closePath(); ctx.fillStyle = rgba('#2C7FA8', 0.2); ctx.fill();
  ctx.strokeStyle = rgba('#BFE3F2', 0.85); ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 12) { const y = wl + Math.sin(x * 0.03 + t * 2.2) * 3; x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }
// startblok: (x, y) = voorrand en bovenkant; s = px per meter; kijk = 1: zwemmer kijkt naar rechts
function SP3_startblok(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const b = 0.7 * s, d = 0.12 * s; ctx.beginPath(); ctx.moveTo(-b, -d * 0.6); ctx.lineTo(0, 0); ctx.lineTo(0, d); ctx.lineTo(-b, d); ctx.closePath(); shape(ctx, '#D8DEE6', '#9AA6B4', 2); // schuin bovenvlak
  roundRect(ctx, -b * 0.75, d, b * 0.5, 0.33 * s, 6); shape(ctx, '#8C98A8', '#6E7A8A', 2); // voet van het blok
  ctx.restore(); }
function SP3_wig(ctx, w, s, a = 1) { if (!w || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(w.x - 0.06 * s, w.y + w.h + 6); ctx.lineTo(w.x + 0.05 * s, w.y + w.h + 6); ctx.lineTo(w.x - 0.04 * s, w.y); ctx.closePath(); shape(ctx, '#C9D2DC', '#9AA6B4', 2); ctx.restore(); }

// ---------- krachtzaal naast het bad ----------
function SP3_zaal(ctx, a = 1, o = {}) { const { raam = true, rek = true, gy = GROND } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP3.muur; ctx.fillRect(0, 70, W, gy - 70);
  if (raam) { // raam met zicht op het bad (banen, lijnen)
    const rx = 1180, ry = 150, rw = 640, rh = 300; roundRect(ctx, rx - 12, ry - 12, rw + 24, rh + 24, 10); shape(ctx, '#3C4A62', null);
    ctx.fillStyle = '#1F3550'; ctx.fillRect(rx, ry, rw, rh * 0.45); const g = ctx.createLinearGradient(0, ry + rh * 0.45, 0, ry + rh); g.addColorStop(0, '#3E8CB0'); g.addColorStop(1, '#2C6A8A'); ctx.fillStyle = g; ctx.fillRect(rx, ry + rh * 0.45, rw, rh * 0.55);
    for (let i = 0; i < 4; i++) { const yy = ry + rh * 0.52 + i * rh * 0.13; ctx.strokeStyle = i % 2 ? '#E07A5F' : '#F2F2EE'; ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(rx, yy); ctx.lineTo(rx + rw, yy); ctx.stroke(); } ctx.setLineDash([]);
    ctx.strokeStyle = '#3C4A62'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(rx + rw / 2, ry); ctx.lineTo(rx + rw / 2, ry + rh); ctx.stroke(); }
  if (rek) { // rek met halters tegen de linkerwand
    const x0 = 90; ctx.fillStyle = SP3.rek; ctx.fillRect(x0, 420, 14, gy - 420); ctx.fillRect(x0 + 300, 420, 14, gy - 420);
    for (let k = 0; k < 3; k++) { const yy = 470 + k * 110; ctx.fillRect(x0, yy, 314, 10); for (let i = 0; i < 4; i++) { const hx = x0 + 40 + i * 72, s = 0.8 + k * 0.18; roundRect(ctx, hx - 4, yy - 18 * s, 34, 8, 3); shape(ctx, SP3.staal, null); roundRect(ctx, hx - 10, yy - 28 * s, 12, 28 * s, 3); shape(ctx, SP3.schijf, null); roundRect(ctx, hx + 24, yy - 28 * s, 12, 28 * s, 3); shape(ctx, SP3.schijf, null); } } }
  ctx.fillStyle = SP3.vloer; ctx.fillRect(0, gy, W, 880 - gy); ctx.fillStyle = SP3.vloerL; ctx.fillRect(0, gy, W, 6);
  ctx.restore(); }
// vloermat (zijaanzicht, plat)
function SP3_mat(ctx, x, w, a = 1, gy = GROND) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, gy - 16, w, 20, 6); shape(ctx, SP3.mat, SP3.matL, 2); ctx.restore(); }
// halterstang op een rek, n schijven per kant (u = laatste schijf die aanschuift 0..1)
function SP3_stang(ctx, x, y, w, n, u = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP3.rek; ctx.fillRect(x - w * 0.36, y - 6, 16, GROND - y + 6); ctx.fillRect(x + w * 0.36 - 16, y - 6, 16, GROND - y + 6); ctx.fillRect(x - w * 0.36 - 18, y + 4, 34, 10); ctx.fillRect(x + w * 0.36 - 16, y + 4, 34, 10);
  roundRect(ctx, x - w / 2, y - 8, w, 16, 6); shape(ctx, SP3.staal, '#8A96A4', 1.5);
  const nn = Math.floor(n), fr = n - nn; for (let s = -1; s <= 1; s += 2) for (let i = 0; i < Math.ceil(n); i++) { const last = i === nn, k = last ? ease(fr) : 1; if (last && fr <= 0.01) continue;
    const px = x + s * (w / 2 - 70 - i * 30) + s * (1 - k) * 120, hgt = 150 - i * 8; ctx.save(); ctx.globalAlpha *= last ? k : 1; roundRect(ctx, px - 13, y - hgt / 2, 26, hgt, 6); shape(ctx, SP3.schijf, SP3.schijfR, 2.5); ctx.restore(); }
  ctx.restore(); }
// rekpaal met elastiek-ophanging (vooraanzicht)
function SP3_paal(ctx, x, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = SP3.rek; ctx.fillRect(x - 12, 300, 24, GROND - 300); ctx.fillRect(x - 50, GROND - 12, 100, 12); for (let i = 0; i < 6; i++) circ(ctx, x, 360 + i * 70, 7, '#2A3446'); ctx.restore(); }

// ---------- zwemmers en kleine pictogrammen ----------
// hand en onderarm die in het water duwt, van opzij; (x, y) = handpalm, s = schaal
function SP3_hand(ctx, x, y, s, huid, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const hD = _donker(huid, 0.18), hL = _licht ? _licht(huid, 0.12) : huid;
  ctx.beginPath(); ctx.moveTo(40, -40); ctx.quadraticCurveTo(200, -70, 380, -78); ctx.lineTo(380, 30); ctx.quadraticCurveTo(200, 40, 40, 38); ctx.closePath(); shape(ctx, huid, hD, 2.5); // onderarm, naar de pols smaller
  // hand van opzij, palm naar links (duwt het water naar links): vingers samen, duim langs de zijkant
  ctx.beginPath(); ctx.moveTo(50, -44); ctx.quadraticCurveTo(10, -62, -40, -56); ctx.quadraticCurveTo(-78, -50, -84, -18); ctx.lineTo(-86, 24); ctx.quadraticCurveTo(-82, 54, -50, 56); ctx.quadraticCurveTo(10, 60, 50, 40); ctx.closePath(); shape(ctx, huid, hD, 2.5);
  ctx.strokeStyle = hD; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for (const yy of [-28, -2, 24]) { ctx.beginPath(); ctx.moveTo(-84, yy); ctx.lineTo(-48, yy + 2); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(30, -48); ctx.quadraticCurveTo(-6, -84, -30, -78); ctx.quadraticCurveTo(-40, -70, -22, -58); ctx.quadraticCurveTo(0, -56, 18, -40); shape(ctx, huid, hD, 2.5); // duim
  ctx.restore(); }
// weegschaal-icoon met wijzer (frac 0..1)
function SP3_weeg(ctx, x, y, r, frac, a = 1, lab = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 1.3, y - r * 1.1, r * 2.6, r * 2.2, r * 0.3); shape(ctx, '#D8DEE6', '#9AA6B4', 3);
  ctx.beginPath(); ctx.arc(x, y + r * 0.15, r * 0.82, Math.PI, 2 * Math.PI); ctx.lineTo(x + r * 0.82, y + r * 0.15); ctx.closePath(); shape(ctx, '#F2F2EE', '#9AA6B4', 2);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; for (let i = 0; i <= 10; i++) { const an = Math.PI + i / 10 * Math.PI; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.7, y + r * 0.15 + Math.sin(an) * r * 0.7); ctx.lineTo(x + Math.cos(an) * r * (i % 5 ? 0.62 : 0.55), y + r * 0.15 + Math.sin(an) * r * (i % 5 ? 0.62 : 0.55)); ctx.stroke(); }
  const an = Math.PI + clamp(frac, 0, 1) * Math.PI; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y + r * 0.15); ctx.lineTo(x + Math.cos(an) * r * 0.7, y + r * 0.15 + Math.sin(an) * r * 0.7); ctx.stroke(); circ(ctx, x, y + r * 0.15, 6, '#5A6478');
  if (lab) text(ctx, lab, x, y + r * 0.85, fTekst(r * 0.42, 800), '#1A2740', 'center'); ctx.restore(); }
// stopwatch met tekst
function SP3_stopwatch(ctx, x, y, r, txt = '', a = 1, frac = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 0.18, y - r * 1.32, r * 0.36, r * 0.3, 4); shape(ctx, '#9AA6B4', null);
  circ(ctx, x, y, r, '#F2F2EE', '#9AA6B4', 4); ctx.strokeStyle = '#1A2740'; ctx.lineWidth = Math.max(2, r * 0.06); ctx.lineCap = 'round'; const an = -Math.PI / 2 + frac * 6.283; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke();
  if (txt) text(ctx, txt, x, y + r + 50, fTekst(Math.max(30, r * 0.5), 800), C.text, 'center'); ctx.restore(); }
// kracht-tijdcurve: piek (u = hoe ver getekend 0..1, piek = hoogte 0..1)
function SP3_krachtCurve(ctx, x, y, w, h, u, piek, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 30, y - 70, w + 60, h + 130, 14); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.7), 1.5);
  assen(ctx, x, y, w, h, 'TIJD', 'KRACHT'); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); const n = 60;
  for (let i = 0; i <= n * clamp(u, 0, 1); i++) { const s = i / n, v = Math.exp(-Math.pow((s - 0.45) / 0.09, 2)) * piek + 0.05; const px = x + s * w, py = y + h - v * h * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
// kalender 'EEN SEIZOEN': maanden, u = voortgang
function SP3_kalender(ctx, x, y, w, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['SEP', 'OKT', 'NOV', 'DEC', 'JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN']; const bw = w / M.length;
  metaText(ctx, 'EEN SEIZOEN', x, y - 16, C.grain, 'left', 26); M.forEach((m, i) => { const on = (i + 0.5) / M.length <= u; roundRect(ctx, x + i * bw + 3, y, bw - 6, 46, 6); shape(ctx, on ? rgba(C.groen, 0.35) : rgba(C.fill, 0.7), on ? C.groen : rgba(C.line, 0.6), 1.5); metaText(ctx, m, x + i * bw + bw / 2, y + 32, on ? C.text : C.text2, 'center', 18); }); ctx.restore(); }
// halter-pictogram (droogtraining)
function SP3_halter(ctx, x, y, s, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -5, 80, 10, 4); shape(ctx, col, null); for (const d of [-1, 1]) { roundRect(ctx, d * 34 - 7, -26, 14, 52, 4); shape(ctx, col, null); roundRect(ctx, d * 48 - 5, -18, 10, 36, 3); shape(ctx, col, null); } ctx.restore(); }
// pictogram meetopstelling (bewegingswetenschapper): krachtplaat + laptop met curve
function SP3_meet(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, 40, 140, 22, 4); shape(ctx, '#8C98A8', '#C9D2DC', 2);
  roundRect(ctx, 50, -40, 110, 74, 6); shape(ctx, '#1A2740', '#C9D2DC', 3); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 20; i++) { const s2 = i / 20; const v = Math.exp(-Math.pow((s2 - 0.5) / 0.12, 2)); i ? ctx.lineTo(60 + s2 * 90, 20 - v * 44) : ctx.moveTo(60 + s2 * 90, 20 - v * 44); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40, 34); ctx.lineTo(170, 34); ctx.lineTo(182, 50); ctx.lineTo(28, 50); ctx.closePath(); shape(ctx, '#8C98A8', null); ctx.restore(); }

// ---------- de keten van vier schakels ----------
// cx, cy = midden; o.n = aantal zichtbare schakels (0..4), o.slap (0..1) = middelste schakel knikt, o.stroom (0..1) = gouden pijl van benen naar hand,
// o.lek (0..1) = pijl lekt weg in het midden, o.hi = index die oplicht, o.labels
function SP3_keten(ctx, cx, cy, o = {}) { const { n = 4, slap = 0, stroom = 0, lek = 0, hi = -1, a = 1, s = 1, labels = ['benen', 'romp', 'armen', 'hand'], hiKl = C.goud, labA = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = 260 * s, gap = 40 * s, tot = 4 * L + 3 * gap, x0 = cx - tot / 2, sag = slap * 70 * s;
  const P = []; for (let i = 0; i < 4; i++) { const xm = x0 + i * (L + gap) + L / 2; const dy = (i === 1 ? sag : i === 2 ? sag * 0.45 : 0); const rot = i === 1 ? slap * 0.32 : i === 2 ? -slap * 0.2 : i === 0 ? slap * 0.1 : 0; P.push([xm, cy + dy, rot]); }
  // verbindingen
  for (let i = 0; i < 3 && i < n - 1; i++) { const [xa, ya] = P[i], [xb, yb] = P[i + 1]; ctx.strokeStyle = '#8C98A8'; ctx.lineWidth = 16 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xa + L * 0.42, ya); ctx.lineTo(xb - L * 0.42, yb); ctx.stroke(); }
  for (let i = 0; i < n && i < 4; i++) { const [xm, ym, rot] = P[i], k = clamp(n - i, 0, 1); ctx.save(); ctx.globalAlpha *= k; ctx.translate(xm, ym); ctx.rotate(rot);
    const on = i === hi, slapM = i === 1 && slap > 0.05; roundRect(ctx, -L / 2, -46 * s, L, 92 * s, 46 * s); shape(ctx, on ? rgba(hiKl, 0.25) : rgba(C.fill, 0.9), on ? hiKl : slapM ? C.koraal : '#C9D2DC', 6 * s);
    roundRect(ctx, -L / 2 + 30 * s, -16 * s, L - 60 * s, 32 * s, 16 * s); shape(ctx, C.bgSchema, rgba('#C9D2DC', 0.5), 2); ctx.restore();
    if (labels[i]) naamBij(ctx, labels[i], '', xm, cy + 120 * s + (i === 1 ? sag : 0), k * labA, 'center'); }
  // gouden pijl: loopt van schakel 1 tot 4; bij lek buigt hij in de romp naar beneden weg
  if (stroom > 0.01) { const xs = P[0][0] - L * 0.3, xe = P[3][0] + L * 0.42, xl = P[1][0];
    if (lek > 0.01) { const xEnd = lerp(xs, xl, clamp(stroom * 2, 0, 1)); SP3_pijl(ctx, xs, cy - 110 * s, xEnd, cy - 110 * s, C.goud, 1, 16 * s); if (stroom > 0.5) SP3_pijl(ctx, xl, cy - 110 * s, xl + 40 * s, cy - 110 * s + 150 * s * clamp(stroom * 2 - 1, 0.2, 1), C.goud, lek, 12 * s); }
    else SP3_pijl(ctx, xs, cy - 110 * s, lerp(xs, xe, stroom), cy - 110 * s, C.goud, 1, 16 * s); }
  ctx.restore(); return P; }

// ---------- schouder in een zoomcirkel (rechterschouder) ----------
// voor: vooraanzicht; grote borstspier (oker) van borstbeen en sleutelbeen naar de bovenarm; arm hangt langs het lijf
// o.dik (0..1) extra dikte grote spieren, o.binnen (0..1) pijl naar binnen, o.kop (0..1) kop van de bovenarm in de kom licht op
function SP3_schouderVoor(ctx, cx, cy, r, o = {}) { const { dik = 0, binnen = 0, kop = 0, huid = SP3.huidSam, spiegel = false } = o; ctx.save();
  ctx.fillStyle = '#20304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const s = r / 220; ctx.translate(cx, cy); ctx.scale(spiegel ? -s : s, s);
  // romp en arm (huid), schouder links in beeld = rechterschouder van de zwemmer (die naar ons kijkt)
  ctx.beginPath(); ctx.moveTo(240, -150); ctx.lineTo(-40, -150); ctx.quadraticCurveTo(-130, -140, -150, -60); ctx.lineTo(-170, 240); ctx.lineTo(-80, 240); ctx.lineTo(-70, 40); ctx.lineTo(-40, 240); ctx.lineTo(240, 240); ctx.closePath(); shape(ctx, rgba(huid, 0.55), rgba(lighten(huid, 0.3), 0.8), 2);
  // sleutelbeen en borstbeen
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -120); ctx.quadraticCurveTo(40, -140, -70, -120); ctx.stroke(); roundRect(ctx, 145, -115, 30, 260, 10); shape(ctx, '#E8E2D2', null);
  // bovenarmbeen met kop in de kom
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(-105, -80); ctx.lineTo(-125, 230); ctx.stroke(); circ(ctx, -100, -90, 34, '#E8E2D2');
  if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; circ(ctx, -100, -90, 50, null, C.goud, 6); ctx.restore(); }
  // grote borstspier (oker): waaier van borstbeen naar de bovenarm
  const w = 1 + dik * 0.35; ctx.beginPath(); ctx.moveTo(150, -110); ctx.quadraticCurveTo(160, 60 * w, 140, 140); ctx.quadraticCurveTo(10, 120 * w, -90, -10); ctx.lineTo(-95, -50); ctx.quadraticCurveTo(20, -120, 150, -110); ctx.closePath(); shape(ctx, rgba(C.oker, 0.85), lighten(C.oker, 0.3), 3);
  ctx.strokeStyle = rgba('#8A6A38', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(150, -90 + i * 40); ctx.lineTo(-88, -40 + i * 5); ctx.stroke(); }
  if (binnen > 0.01) SP3_boogPijl(ctx, -115, 120, 70, Math.PI * 0.95, Math.PI * 0.95 - 1.6 * binnen, C.goud, 1, 8);
  ctx.restore(); }
// achter: achteraanzicht; brede rugspier (oker, dik) en de kleine buitendraaiers op het schouderblad (dun, teal)
function SP3_schouderAchter(ctx, cx, cy, r, o = {}) { const { dik = 0, klein = 0, buiten = 0, kop = 0, huid = SP3.huidSam, spiegel = false } = o; ctx.save();
  ctx.fillStyle = '#20304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const s = r / 220; ctx.translate(cx, cy); ctx.scale(spiegel ? -s : s, s);
  // van achteren: rechterschouder staat rechts in beeld
  ctx.beginPath(); ctx.moveTo(-240, -150); ctx.lineTo(40, -150); ctx.quadraticCurveTo(130, -140, 150, -60); ctx.lineTo(170, 240); ctx.lineTo(80, 240); ctx.lineTo(70, 40); ctx.lineTo(40, 240); ctx.lineTo(-240, 240); ctx.closePath(); shape(ctx, rgba(huid, 0.55), rgba(lighten(huid, 0.3), 0.8), 2);
  // brede rugspier (oker): van de onderrug naar de bovenarm
  const w = 1 + dik * 0.3; ctx.beginPath(); ctx.moveTo(-190, 240); ctx.lineTo(-190, 40); ctx.quadraticCurveTo(-60, 30 * w, 92, 0); ctx.lineTo(96, 40); ctx.quadraticCurveTo(-20, 160, 0, 240); ctx.closePath(); shape(ctx, rgba(C.oker, 0.85), lighten(C.oker, 0.3), 3);
  // schouderblad (driehoek) en wervelkolom
  ctx.beginPath(); ctx.moveTo(-60, -110); ctx.lineTo(70, -95); ctx.lineTo(-40, 110); ctx.closePath(); shape(ctx, '#E8E2D2', null); ctx.strokeStyle = '#C9C2B2'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-58, -60); ctx.lineTo(90, -88); ctx.stroke();
  for (let i = 0; i < 9; i++) roundRect(ctx, -205, -140 + i * 42, 30, 30, 6), shape(ctx, '#E8E2D2', null);
  // bovenarm met kop
  ctx.strokeStyle = '#E8E2D2'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(105, -80); ctx.lineTo(125, 230); ctx.stroke(); circ(ctx, 100, -90, 34, '#E8E2D2');
  if (kop > 0.01) { ctx.save(); ctx.globalAlpha *= kop; circ(ctx, 100, -90, 50, null, C.goud, 6); ctx.restore(); }
  // kleine buitendraaiers: dunne banden van het schouderblad naar de kop
  const kk = 0.6 + klein * 0.4; ctx.save(); ctx.globalAlpha *= kk; ctx.strokeStyle = rgba(C.teal, 0.95); ctx.lineCap = 'round';
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-30, -30); ctx.quadraticCurveTo(40, -40, 92, -78); ctx.stroke(); ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(-30, 30); ctx.quadraticCurveTo(40, 0, 96, -62); ctx.stroke(); ctx.restore();
  if (buiten > 0.01) SP3_boogPijl(ctx, 115, 120, 70, Math.PI * 0.05, Math.PI * 0.05 + 1.6 * buiten, C.teal, 1, 8);
  ctx.restore(); }
// balans (weegschaaltje met twee schalen): kant = -1..1 (+ = links omlaag = binnen zwaarder)
function SP3_balans(ctx, x, y, s, kant, a = 1, o = {}) { const { links = 'BINNEN', rechts = 'BUITEN', vraag = false } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#C9D2DC'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(6, -150); ctx.lineTo(-6, -150); ctx.closePath(); ctx.fill(); roundRect(ctx, -70, 0, 140, 16, 6); shape(ctx, '#C9D2DC', null);
  const an = -clamp(kant, -1, 1) * 0.28; ctx.save(); ctx.translate(0, -150); ctx.rotate(an); ctx.strokeStyle = '#C9D2DC'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(160, 0); ctx.stroke(); circ(ctx, 0, 0, 12, C.goud); ctx.restore();
  for (const d of [-1, 1]) { const px = d * 160 * Math.cos(an), py = -150 + d * 160 * Math.sin(an); ctx.strokeStyle = '#9AA6B4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 50, py + 70); ctx.moveTo(px, py); ctx.lineTo(px + 50, py + 70); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 66, py + 70); ctx.lineTo(px + 66, py + 70); ctx.quadraticCurveTo(px, py + 110, px - 66, py + 70); shape(ctx, d < 0 ? rgba(C.oker, 0.8) : rgba(C.teal, 0.8), null);
    text(ctx, d < 0 ? links : rechts, px, py + 140, fMeta(24), C.text2, 'center'); }
  if (vraag) text(ctx, '?', 0, -190, fTitel(70), C.goud, 'center');
  ctx.restore(); }
// trainingsbelasting per week: groen rustig stijgend of koraal met plotselinge piek; m = 0..1 morph van piek naar rustig
function SP3_belasting(ctx, x, y, w, h, a = 1, o = {}) { const { groen = 1, koraal = 1, m = 0, u = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'TRAINING PER WEEK');
  const lijn = (f, col, al) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = 12; for (let i = 0; i <= n * clamp(u, 0, 1); i++) { const s = i / n, v = f(s); i ? ctx.lineTo(x + s * w, y + h - v * h) : ctx.moveTo(x + s * w, y + h - v * h); } ctx.stroke(); ctx.restore(); };
  lijn(s => 0.3 + 0.45 * s, C.groen, groen);
  lijn(s => { const piek = (s > 0.45 && s < 0.65 ? 0.42 : 0); return lerp(0.3 + piek + (s > 0.65 ? 0.12 : 0), 0.3 + 0.45 * s, m); }, m > 0.5 ? C.groen : C.koraal, koraal);
  ctx.restore(); }
// klembord / trainingsplan op een standaard
function SP3_bord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = SP3.rek; ctx.fillRect(x + w * 0.2, y + h, 10, GROND - y - h); ctx.fillRect(x + w * 0.8 - 10, y + h, 10, GROND - y - h);
  roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2EEE4', '#B8B0A0', 3); ctx.restore(); }
// startplaats: twee banen boven elkaar met ieder een eigen startblok (zijaanzicht)

// ---------- houdingen die de cast niet heeft (t4, t13) ----------
function SP3_maat(id, lengte, outfit) { const P0 = CAST[id], P = Object.assign({}, P0, (P0.garderobe && outfit && P0.garderobe[outfit]) || {}); const Hh = lengte * (P.lengte || 1), hh = Hh / (P.kop || 6.1);
  return { Hh, hh, Lb: Hh - hh * 3.67, A1: hh * 1.32 * (P.armK || 1), A2: hh * 1.2 * (P.armK || 1), sy: -hh * 2.03 }; }
// plank op ellebogen en tenen, zijaanzicht, hoofd naar rechts; xE = x van de ellebogen, vloer = y van de mat; sag = heup zakt (0..0.3 rad)
function SP3_plank(ctx, id, xE, vloer, lengte, o = {}) { const { sag = 0, outfit = 'sport', a = 1, t = 0, an = 0 } = o; const m = SP3_maat(id, lengte, outfit);
  const E = [m.A1 + m.hh * 0.14, m.sy], th = -sag, T = [Math.sin(th) * m.Lb + m.hh * 0.3 * Math.cos(th), Math.cos(th) * m.Lb + m.hh * 0.2];
  const p = Math.atan2(E[0] - T[0], T[1] - E[1]); const wx = (l) => l[0] * Math.sin(p) - l[1] * Math.cos(p), wy = (l) => l[0] * Math.cos(p) + l[1] * Math.sin(p);
  const x = xE - wx([m.A1, m.sy]), y = vloer - wy(E);
  return SP3_lijf(ctx, id, x, y, lengte, { outfit, pitch: p, a, t, arm: [Math.PI / 2, Math.PI / 2], armVer: [Math.PI / 2, Math.PI / 2], been1: { th, kn: 0, an }, been2: { th, kn: 0, an }, uit: o.uit }); }
// afzet tegen de keerpuntmuur, op de rug, hoofd naar links; muurX = muur, y = hoogte van de heup; buig 1 = knieën ± 90°, 0 = gestrekt
function SP3_muurAfzet(ctx, id, muurX, y, lengte, buig, o = {}) { const m = SP3_maat(id, lengte, 'zwem'); const kn = 1.65 * buig, th = kn * 0.5;
  const kx = Math.sin(th) * m.Lb / 2, ky = Math.cos(th) * m.Lb / 2, ax = kx + Math.sin(th - kn) * m.Lb / 2, ay = ky + Math.cos(th - kn) * m.Lb / 2 + m.hh * 0.22;
  // lokale y (naar de voeten) wordt na draaien (kijk -1, rug) de +x-richting: voetafstand tot de heup = ay
  const x = muurX - ay; return Object.assign(SP3_lijf(ctx, id, x, y, lengte, { rug: true, kijk: -1, naHoofd: true, been1: { th, kn, an: -0.25 }, been2: { th: th * 0.96, kn: kn * 0.98, an: -0.25 }, a: o.a, t: o.t }), { x }); }

// ---------- tekstwolkje met vaste regels (en doorhaling van één woord) ----------
function SP3_wolk(ctx, x, y, w, h, regels, a = 1, o = {}) { const { px = 34, door = null, doorU = 0, staart = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba('#F2F2EE', 0.96), null);
  const sx = staart < 0 ? x + w * 0.22 : x + w * 0.78; circ(ctx, sx, y + h + 10, 11, rgba('#F2F2EE', 0.96)); circ(ctx, sx + staart * 18, y + h + 34, 7, rgba('#F2F2EE', 0.96));
  const lh = px * 1.18, y0 = y + h / 2 - (regels.length - 1) * lh / 2 + px * 0.36; ctx.font = fTekst(px, 800);
  regels.forEach((r, i) => { text(ctx, r, x + w / 2, y0 + i * lh, fTekst(px, 800), '#121A26', 'center');
    if (door && r.includes(door) && doorU > 0.01) { const tw = ctx.measureText(r).width, pre = ctx.measureText(r.slice(0, r.indexOf(door))).width, dw = ctx.measureText(door).width; const x0 = x + w / 2 - tw / 2 + pre - 6;
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0 + i * lh - px * 0.32); ctx.lineTo(x0 + (dw + 12) * clamp(doorU, 0, 1), y0 + i * lh - px * 0.32); ctx.stroke(); } });
  ctx.restore(); }
// linker badrand met dek en tegelmuur (startkant); x = rand, wl = waterlijn, s = px per meter
function SP3_startKant(ctx, x, wl, bodem, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dek = wl - 0.3 * s;
  ctx.fillStyle = SP3.tegel; ctx.fillRect(x - 60, dek, 60, bodem - dek); ctx.strokeStyle = rgba(SP3.tegelL, 0.7); ctx.lineWidth = 1.5; for (let y = dek; y < bodem; y += 34) { ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x, y); ctx.stroke(); }
  ctx.fillStyle = SP3.dek; ctx.fillRect(0, dek, x - 60, bodem - dek); ctx.fillStyle = SP3.dekL; ctx.fillRect(0, dek, x, 10); ctx.restore(); return dek; }
// de badrand van bovenaf gezien niet nodig: dek met water links (zijaanzicht) voor de cold open en de badrand in H3
function SP3_dek(ctx, xRand, gy, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#22324C'; ctx.fillRect(0, 70, W, gy - 70);
  ctx.fillStyle = rgba(C.teal, 0.07); ctx.fillRect(0, 160, W, 40);
  const g = ctx.createLinearGradient(0, gy + 26, 0, 880); g.addColorStop(0, SP3.waterT); g.addColorStop(1, SP3.waterD); ctx.fillStyle = g; ctx.fillRect(0, gy + 26, xRand, 880 - gy - 26);
  ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= xRand; x += 12) { const y = gy + 26 + Math.sin(x * 0.03 + t * 2.2) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  ctx.fillStyle = SP3.tegel; ctx.fillRect(xRand, gy, W - xRand, 880 - gy); ctx.fillStyle = SP3.dekL; ctx.fillRect(xRand - 8, gy - 4, W - xRand + 8, 14);
  ctx.strokeStyle = rgba(SP3.tegelL, 0.6); ctx.lineWidth = 1.5; for (let x = xRand; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, gy + 10); ctx.lineTo(x, 880); ctx.stroke(); } ctx.restore(); }
// deur naar de krachtzaal met halterpictogram
function SP3_deur(ctx, x, gy, s, a = 1, open = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 0.95 * s, h = 2.1 * s;
  roundRect(ctx, x - 14, gy - h - 14, w + 28, h + 14, 6); shape(ctx, '#3C4A62', null); ctx.fillStyle = '#121A26'; ctx.fillRect(x, gy - h, w, h);
  ctx.save(); ctx.translate(x, 0); ctx.scale(1 - open * 0.6, 1); roundRect(ctx, 0, gy - h, w, h, 4); shape(ctx, '#4E5E7A', '#6A7A96', 2); ctx.restore();
  circ(ctx, x + w * 0.82 * (1 - open * 0.6), gy - h * 0.48, 7, '#C9D2DC'); SP3_halter(ctx, x + w * 0.5 * (1 - open * 0.6), gy - h * 0.72, 0.9 * (1 - open * 0.5), 1); ctx.restore(); }
// klein pictogram: afzet (blok en muur met gouden pijl)
function SP3_icoonAfzet(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -80, 70, 18, 4); shape(ctx, '#D8DEE6', null); roundRect(ctx, -100, -62, 40, 70, 4); shape(ctx, '#8C98A8', null);
  ctx.fillStyle = SP3.tegel; ctx.fillRect(70, -90, 40, 170); SP3_pijl(ctx, 60, 30, -40, 30, C.goud, 1, 14); SP3_pijl(ctx, -40, -100, 40, -100, C.goud, 1, 14); ctx.restore(); }
// klein pictogram: keten (drie schakels)
function SP3_icoonKeten(ctx, x, y, s, a = 1) { if (a <= 0.01) return; SP3_keten(ctx, x, y, { s: s * 0.32, a, labels: [], hi: 1 }); }
// klein pictogram: schouder (cirkel met bovenarm en kop in de kom)
function SP3_icoonSchouder(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, 110 * s, 0, 6.283); ctx.save(); ctx.clip(); SP3_schouderAchter(ctx, x, y, 110 * s, { klein: 1, kop: 1, spiegel: true }); ctx.restore(); circ(ctx, x, y, 110 * s, null, C.goud, 3); ctx.restore(); }
// Wat word jij? · Sport en topsport 3 · Sterk op het droge — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer = Sam (outfit 'zwem' in het bad, 'sport' in de krachtzaal: t-shirt, korte broek, sportschoenen),
// de krachttrainer = nieuw beroepspersonage 'krachttrainer' (teken_sp3.js, ter keuring), de fysiotherapeut = Femke ('werk'),
// de zwemtrainer = 'zwemtrainer', de baangenoot = figurant Daan in zwemkleding (naamloos). Geen namen in beeld.
// Decors (bad, krachtzaal) alleen onder scènes die daar spelen; grafieken, keten en zoomcirkels op navy.

// stroomstreepjes in het water: laten zien dat de zwemmer vooruitgaat terwijl hij stil in beeld blijft
function SP3s_stroom(ctx, t, x0, x1, y0, y1, v = 260, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.35); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 14; i++) { const yy = lerp(y0, y1, hash(i * 3.1)), L = 60 + hash(i * 7.7) * 80, xx = x1 - (((t * v + hash(i * 5.3) * (x1 - x0)) % (x1 - x0 + L))); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + L, yy); ctx.stroke(); } ctx.restore(); }
function SP3s_vraag(ctx, x, y, a, px = 130) { vraagteken(ctx, x, y, a, px); }

Object.assign(SCENES, {
  title(ctx, t) { SP3_lijn(ctx, [[1280, 700], [1840, 700]], rgba('#BFE3F2', 0.6), 3); zwemmer(ctx, 'sam', 1520 + Math.sin(t * 0.6) * 8, 790, 300, { slag: 'stroomlijn', t }); SP3_halter(ctx, 1600, 520, 1.6, 0.95); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const Tc = q.on('Toch', 1, 0.5), Wr = q.on('Waarom', 1, 0.5);
    if (Tc < 1) { bg(ctx, 'schema'); SP3_laag(ctx, 1 - Tc, () => { SP3_bad(ctx, { wl: 230, bodem: 850, t });
      const L = 520; ctx.save(); ctx.translate(900, 560); ctx.rotate(-0.12 + Math.sin(t * 0.8) * 0.02); zwemmer(ctx, 'sam', 0, Math.sin(t * 1.1) * 6, L, { slag: 'stroomlijn', t }); ctx.restore();
      const up = q.on('draagt', 1, 0.6); SP3_pijl(ctx, 900, 740, 900, 740 - 110 * up, C.goud, up, 14); }); }
    if (Tc > 0) { const gy = 760, s = 230, xs = 1330, T0 = q.at('loopt'), Ts = q.at('training') + 0.9; const v = gangSnelheid('sam', 430, 'loop'), x0 = xs - v * (Ts - T0);
      SP3_laag(ctx, Tc, () => { SP3_dek(ctx, 640, gy, 1, t); SP3_deur(ctx, 1460, gy, 250, 1);
        if (t < Ts) persoon(ctx, 'sam', x0, gy, 430, { outfit: 'zwem', zij: true, gang: 'loop', t: Math.max(0, t - T0), vooruit: true, kijk: 1 });
        else persoon(ctx, 'sam', xs, gy, 430, { outfit: 'zwem', zij: true, kijk: 1, uit: q.on('twijfelt', 1, 0.3) > 0.5 ? 'verbaasd' : 'neutraal' });
        SP3_wolk(ctx, 820, 150, 560, 170, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], q.on('twijfelt', 1, 0.4) * (1 - q.on('Waarom', 1, 0.3)), { staart: 1 });
        SP3_laag(ctx, ramp(t, q.at('Waarom') + 0.3, 0.5), () => { SP3_kaart(ctx, 120, 200, 1050, 330, 1, C.goud); text(ctx, 'Water weegt bijna niets.', 170, 320, fTekst(58, 800), C.text, 'left'); text(ctx, 'Waarom de krachtzaal?', 170, 410, fTekst(58, 800), C.goud, 'left'); vraagteken(ctx, 1080, 470, 1, 120); }); }); } },

  // ---------- H1 Afzetten tegen iets vasts ----------
  s03(ctx, t, q) { bg(ctx, 'schema'); const St = q.on('start', 1, 0.5), Hv = q.on('Hoeveel', 1, 0.5);
    // A: keerpunt vertraagd, op de rug, voeten tegen de tegels
    SP3_laag(ctx, 1 - St, () => { const muur = 1560, wl = 230; SP3_bad(ctx, { wl, bodem: 850, muur, t });
      const tz = q.at('zet'), bu = t < tz ? lerp(0.55, 1, (t - 0.3) / 2.6) : 1 - ease((t - tz) / 0.9);
      const glide = t > tz + 0.9 ? 760 * (1 - Math.exp(-(t - tz - 0.9) / 1.3)) : 0;
      const r = SP3_muurAfzet(ctx, 'sam', muur - glide, 560, 470, bu, { t });
      const contact = q.on('voeten', 1, 0.4) * (1 - ramp(t, tz + 0.5, 0.3)); SP3_laag(ctx, contact, () => { ctx.fillStyle = rgba(C.goud, 0.85); roundRect(ctx, muur - 6, 500, 14, 130, 6); ctx.fill(); });
      tag(ctx, 'ONDER 0,5 S TEGEN DE MUUR', 1180, 170, C.goud, q.on('seconde', 1, 0.4) * (1 - q.on('gestrekte', 1, 0.5)), 'center', 32);
      const af = q.on('zet', 1, 0.4) * (1 - ramp(t, q.at('Bij') - 0.6, 0.5)); SP3_pijl(ctx, muur - 20, 700, muur - 20 - 420 * ease((t - tz) / 1.2), 700, C.goud, af, 16);
      metaText(ctx, 'VERTRAAGD', 120, 290, C.grain, 'left', 26); });
    // B: de start op het blok, sprong en onderwatertraject
    SP3_laag(ctx, St * (1 - Hv), () => { const s = 240, wl = 520, bx = 330, by = wl - 0.75 * s, L = 430; SP3_bad(ctx, { wl, bodem: 850, t, x0: bx }); const dek = SP3_startKant(ctx, bx, wl, 850, s);
      ctx.fillStyle = '#22324C'; ctx.fillRect(0, 70, bx - 60, dek - 70); SP3_startblok(ctx, bx, by, s);
      const T1 = q.at('afzet') + 0.2, T2 = T1 + 1.3; const m = SP3_maat('sam', L, 'zwem');
      if (t < T1) { const z = zwemmer(ctx, 'sam', bx, by, L, { slag: 'startblok', t }); SP3_wig(ctx, z.wig, s);
        const ga = q.on('afzet', 1, 0.3); SP3_pijl(ctx, bx - 120, by + 10, bx - 20, by - 120, C.goud, ga, 12); }
      else { const h0 = [bx - 1.85 * m.hh, by - 2.05 * m.hh], he = [bx + 2.9 * s, wl + 60]; let hx, hy, p;
        if (t < T2) { const u = (t - T1) / (T2 - T1); hx = lerp(h0[0], he[0], u); hy = lerp(h0[1], he[1], u) - 0.55 * s * 4 * u * (1 - u); const dx = he[0] - h0[0], dy = (he[1] - h0[1]) - 0.55 * s * 4 * (1 - 2 * u); p = Math.atan2(-dy, dx); }
        else { const u = 1 - Math.exp(-(t - T2) / 1.6); hx = he[0] + 560 * u; hy = he[1] + 140 * ease(u * 1.6); p = lerp(-0.55, 0, ease(u * 2.2)); }
        SP3_lijf(ctx, 'sam', hx, hy, L, { naHoofd: true, pitch: p, t });
        SP3_laag(ctx, q.on('vasts', 1, 0.4), () => { ctx.fillStyle = rgba(C.goud, 0.85); roundRect(ctx, bx - 0.7 * s, by - 18, 0.7 * s, 10, 4); ctx.fill(); }); } });
    // C: de vraag: balk zonder verdeling
    SP3_laag(ctx, Hv, () => { SP3s_raceBalk(ctx, 0, 0); SP3s_vraag(ctx, 960, 720, q.on('denk', 1, 0.4), 120); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord c: bijna een derde', 1);
    const D = q.on('derde', 1, 0.6), Af = q.on('afzet', 1, 0.4), Me = q.on('erna', 1, 0.8);
    SP3s_raceBalk(ctx, D, 0, { af: Af * (1 - Me), na: Me, def: Me });
    // 25-meterbad
    SP3_laag(ctx, q.on('vijfentwintig', 1, 0.5), () => { SP3_kaart(ctx, 140, 540, 820, 300, 1, C.oker); metaText(ctx, '25-METERBAD: MEER DAN DE HELFT', 180, 595, C.oker, 'left', 26);
      const x0 = 180, w = 740, y = 650; roundRect(ctx, x0, y, w, 50, 10); shape(ctx, '#2A3446', C.line, 1.5);
      [[0, 15], [20, 35], [45, 60], [70, 85]].forEach(([a, b], i) => { const k = ramp(t, q.at('keerpunten') + i * 0.25, 0.4); if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, x0 + w * a / 100, y, w * (b - a) / 100, 50, 8); shape(ctx, rgba(C.oker, 0.8), C.oker, 2); ctx.restore(); });
      [25, 50, 75].forEach(m => { ctx.fillStyle = SP3.tegelL; ctx.fillRect(x0 + w * m / 100 - 2, y - 12, 4, 74); });
      metaText(ctx, '0', x0, y + 90, C.text2, 'left', 22); metaText(ctx, '100 M', x0 + w, y + 90, C.text2, 'right', 22); metaText(ctx, 'MARINHO E.A. 2020 · BORN E.A. 2021', x0, 815, C.grain, 'left', 20); });
    // sprong en tijd op 15 m
    SP3_laag(ctx, q.on('Britse', 1, 0.5), () => { const x = 1100, y = 640, w = 620, h = 150; SP3_kaart(ctx, x - 70, 540, w + 120, 300, 1, C.line);
      metaText(ctx, 'SPRONGHOOGTE ↔ TIJD OP 15 M', x - 40, 582, C.text2, 'left', 22); metaText(ctx, '11 BRITSE SPRINTERS', x - 40, 612, C.grain, 'left', 20);
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
      metaText(ctx, 'HOGER SPRINGEN →', x + w, y + h + 28, C.text2, 'right', 18); ctx.save(); ctx.translate(x - 16, y + h); ctx.rotate(-Math.PI / 2); metaText(ctx, 'TIJD →', 0, 0, C.text2, 'left', 18); ctx.restore();
      const P = [[0.08, 0.78], [0.16, 0.9], [0.24, 0.55], [0.33, 0.7], [0.41, 0.62], [0.5, 0.38], [0.57, 0.6], [0.66, 0.42], [0.74, 0.25], [0.82, 0.4], [0.92, 0.18]];
      P.forEach(([px, py], i) => { const k = ramp(t, q.at('hoger') + i * 0.08, 0.3); if (k > 0.01) circ(ctx, x + px * w, y + py * h, 11 * k, rgba(C.goud, 0.85), lighten(C.goud, 0.3), 2); });
      tag(ctx, 'VERBAND', x + w - 80, y + 20, C.goud, q.on('verband', 1, 0.4), 'center', 28); metaText(ctx, 'SCHEMATISCH · WEST E.A. 2011', x - 40, 822, C.grain, 'left', 18); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const wl = 350, bod = 840; SP3_bad(ctx, { wl, bodem: bod, t });
    persoon(ctx, 'sam', 620, bod, 600, { outfit: 'zwem', t, uit: 'neutraal' }); SP3_waterVoor(ctx, 0, W, wl, bod, t);
    const T = q.on('tiende', 1, 1.0); SP3_weeg(ctx, 1320, 520, 150, lerp(0.92, 0.1, T), q.on('nek', 1, 0.4), T > 0.95 ? '1/10' : '');
    SP3_laag(ctx, q.on('tiende', 1, 0.4), () => metaText(ctx, 'TOT JE NEK: RUWWEG 1/10 VAN JE GEWICHT', 1320, 760, C.text, 'center', 24));
    SP3s_vraag(ctx, 1000, 300, q.on('Waarom', 1, 0.4), 110); },

  s08(ctx, t, q) { const Kz = q.on('krachtzaal', 1, 0.5), Ex = q.on('explosiviteit', 1, 0.5);
    if (Kz < 1) { bg(ctx, 'schema'); SP3_laag(ctx, 1 - Kz, () => { ctx.fillStyle = SP3.waterT; ctx.fillRect(0, 200, W, 680); ctx.strokeStyle = rgba('#BFE3F2', 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(W, 200); ctx.stroke();
      const snel = q.on('snelheid', 1, 0.6), f = lerp(0.45, 0.95, snel), ph = t * f * 6.283, A = 260, x = 980 + A * Math.cos(ph), v = -A * f * 6.283 * Math.sin(ph); // v < 0: hand duwt naar links
      SP3_hand(ctx, x, 520, 1.1, SP3.huidSam, 1);
      const kr = q.on('tegenwicht', 1, 0.4), dl = v < 0 ? Math.min(1, Math.pow(-v / 1500, 2)) * 1.6 : 0; for (let i = -1; i <= 1; i++) SP3_pijl(ctx, x - 90, 520 + i * 50, x - 90 - 60 - 260 * dl, 520 + i * 50, C.teal, kr * clamp(dl * 3, 0, 1), 10);
      metaText(ctx, 'TEGENWICHT VAN HET WATER', 140, 290, C.text2, 'left', 26); SP3_laag(ctx, snel, () => metaText(ctx, 'SNELLER DUWEN = MEER TEGENWICHT', 140, 330, C.teal, 'left', 26)); }); }
    if (Kz > 0) SP3_laag(ctx, Kz, () => { SP3_zaal(ctx, 1, { rek: false, raam: false }); SP3_mat(ctx, 1300, 420);
      const n = q.on('kies', 1, 0.4) + q.on('zelf', 1, 0.4) + q.on('stap', 1, 0.4) + q.on('stap', 2, 0.4);
      SP3_laag(ctx, 1 - Ex, () => { SP3_stang(ctx, 900, 520, 560, n); tag(ctx, 'ZELF KIEZEN HOE ZWAAR', 900, 300, C.oker, q.on('kies', 1, 0.4), 'center', 32);
        SP3_laag(ctx, q.on('stap', 1, 0.4), () => { for (let i = 0; i < 4; i++) { const k = ramp(t, q.at('stap') + i * 0.18, 0.3); ctx.save(); ctx.globalAlpha *= k; roundRect(ctx, 1230 - 120 + i * 60, 400 - i * 40, 56, 30 + i * 40, 4); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); ctx.restore(); } metaText(ctx, 'STAP VOOR STAP', 1360, 425, C.groen, 'left', 22); }); });
      persoon(ctx, 'krachttrainer', 430, GROND, 480, { t, uit: 'blij', pose: q.on('zegt', 1) > 0.5 && t < q.at('explosiviteit') ? 'wijs' : 'staan', kijk: 1 });
      // sprong op de mat met een krachtpiek
      const tj = q.at('korte'), ty = t - tj; let pz;
      if (t < tj - 0.6 || Ex < 0.01) pz = null; else if (ty < 0) pz = { hurk: ease((ty + 0.6) / 0.6), up: 0 }; else if (ty < 0.7) pz = { hurk: 0, up: Math.sin(Math.PI * ty / 0.7) }; else pz = { hurk: ty < 1.0 ? (1 - (ty - 0.7) / 0.3) * 0.5 : 0, up: 0 };
      SP3_laag(ctx, Ex, () => { SP3s_springer(ctx, 1510, pz, t);
        SP3_krachtCurve(ctx, 760, 330, 420, 220, clamp((t - tj + 0.4) / 1.2, 0, 1), 1, 1); metaText(ctx, 'IN KORTE TIJD VEEL KRACHT', 970, 640, C.goud, 'center', 22); });
      SP3_meta(ctx, 'ONDER BEGELEIDING', 430, 250, q.on('begeleiding', 1, 0.4), C.groen, 'center', 26); }); },

  // ---------- H2 De romp als brug ----------
  s09(ctx, t, q) { SP3_zaal(ctx, 1); SP3_mat(ctx, 420, 760);
    const sag = 0.24 * ease((t - q.at('tijdje')) / 2.2); const r = SP3_plank(ctx, 'sam', 1050, GROND - 16, 470, { sag, t, an: 0.6 });
    const k = clamp(sag / 0.12, 0, 1), col = k > 0.4 ? C.koraal : C.goud; const L = q.on('ellebogen', 1, 0.5);
    if (sag < 0.02) SP3_lijn(ctx, [[r.schouder.x, r.schouder.y], [r.enkel.x, r.enkel.y]], C.goud, 6, L); else SP3_lijn(ctx, [[r.schouder.x, r.schouder.y], [r.heup.x, r.heup.y], [r.enkel.x, r.enkel.y]], col, 6, L);
    SP3_laag(ctx, q.on('water', 1, 0.5), () => { const x = 1170, y = 160, w = 690, h = 420; roundRect(ctx, x, y, w, h, 18); shape(ctx, '#1A2740', C.teal, 3); ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip();
      SP3_bad(ctx, { wl: y + 120, bodem: y + h, t, x0: x, x1: x + w }); SP3s_stroom(ctx, t, x, x + w, y + 150, y + h - 20, 220);
      const Lz = 300, hx = x + 330, hy = y + 120 + 0.12 * Lz, zak = 0.1 + 0.04 * Math.sin(t * 2.4); ctx.save(); ctx.translate(hx, hy); ctx.rotate(-zak); zwemmer(ctx, 'sam', 0, 0, Lz, { slag: 'crawl', t, tempo: 1 }); ctx.restore();
      const dr = q.on('slingeren', 1, 0.5); for (let i = 0; i < 3; i++) SP3_pijl(ctx, x + 150 - 10 * i, y + 210 + i * 40, x + 150 - 10 * i - 80 - 40 * dr, y + 210 + i * 40, C.koraal, q.on('heup', 2, 0.4), 9);
      ctx.restore(); metaText(ctx, 'ONDER WATER', x + 24, y + 44, C.teal, 'left', 24); });
    SP3s_vraag(ctx, 760, 420, q.on('Waarom', 1, 0.4), 120); },

  s11(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord a: zodat de kracht niet weglekt', 1); const Pr = q.on('proef', 1, 0.6);
    SP3_laag(ctx, 1 - Pr, () => { const n = q.on('benen', 1, 0.3) + q.on('romp', 1, 0.3) + q.on('armen', 1, 0.3) + q.on('hand', 1, 0.3);
      const sl = q.on('slap', 1, 0.6) * (1 - q.on('stevige', 1, 0.6)), lek = q.on('lekt', 1, 0.3) * (1 - q.on('stevige', 1, 0.3));
      const st = q.on('stevige', 1) > 0 ? clamp((t - q.at('stevige')) / 1.4, 0, 1) : clamp((t - q.at('lekt')) / 1.6, 0, 1) * (t > q.at('lekt') ? 1 : 0);
      SP3_keten(ctx, 960, 400, { n, slap: sl, stroom: st, lek, hi: q.on('brug', 1) > 0.5 && sl < 0.1 && t < q.at('slap') ? 1 : -1, s: 0.9 });
      tag(ctx, 'MODEL', 1640, 250, C.text2, q.on('keten', 1, 0.4), 'center', 28);
      // de zwemmer onder de keten: eerst met zakkende heup (koraal), dan recht in de stroomlijn
      const Zh = q.on('heup', 1, 0.4), Sl = q.on('stroomlijn', 1, 0.5), y = 720, Lz = 300;
      SP3_laag(ctx, Zh * (1 - Sl), () => { ctx.save(); ctx.translate(820, y); ctx.rotate(-0.14); zwemmer(ctx, 'sam', 0, 0, Lz, { slag: 'crawl', t }); ctx.restore(); for (let i = 0; i < 3; i++) SP3_pijl(ctx, 640, y + 20 + i * 34, 640 - 70 - 60 * q.on('weerstand', 1, 0.4), y + 20 + i * 34, C.koraal, q.on('weerstand', 1, 0.4), 9); });
      SP3_laag(ctx, Sl, () => { zwemmer(ctx, 'sam', 820, y, Lz, { slag: 'stroomlijn', t }); SP3_lijn(ctx, [[600, y - 60], [1220, y - 60]], C.goud, 3, 0.6, [10, 8]); }); });
    SP3_laag(ctx, Pr, () => { SP3_kaart(ctx, 200, 240, 1520, 600, 1, C.groen); metaText(ctx, 'ROMPTRAINING · 50 M VRIJE SLAG', 250, 300, C.groen, 'left', 28);
      SP3_tekst(ctx, '12 weken, naast het zwemmen', 250, 390, 40, C.text, 'left', q.on('twaalf', 1, 0.4)); SP3_tekst(ctx, '20 junioren, nationaal niveau', 250, 450, 40, C.text, 'left', q.on('jonge', 1, 0.4));
      // staafje met onzekerheidsband
      const x = 1060, w = 560, y = 520, Sn = q.on('twee', 1, 0.8); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + 110); ctx.lineTo(x + w, y + 110); ctx.stroke();
      [0, 1, 2, 3, 4, 5].forEach(v => { ctx.beginPath(); ctx.moveTo(x + v / 5 * w, y + 104); ctx.lineTo(x + v / 5 * w, y + 116); ctx.stroke(); metaText(ctx, v + ' %', x + v / 5 * w, y + 146, C.text2, 'center', 18); });
      SP3_laag(ctx, Sn, () => { ctx.fillStyle = rgba(C.groen, 0.22); ctx.fillRect(x + 0.2 / 5 * w, y + 20, 3.6 / 5 * w, 70); roundRect(ctx, x, y + 34, 2 / 5 * w * Sn, 42, 8); shape(ctx, rgba(C.groen, 0.8), C.groen, 2);
        metaText(ctx, '± 2 % SNELLER', x, y - 6, C.groen, 'left', 28); metaText(ctx, 'ONZEKER: 0,2–3,8 %', x + w, y - 6, C.text2, 'right', 22); });
      SP3_meta(ctx, 'KLEINE GROEP · ANDERE TRAININGSGROEP ALS VERGELIJKING', 250, 760, q.on('trainingsgroep', 1, 0.4), C.koraal, 'left', 24); metaText(ctx, 'WESTON E.A. 2015', 1680, 810, C.grain, 'right', 20); }); },

  // ---------- H3 De zwemmersschouder ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const wl = 330; SP3_bad(ctx, { wl, bodem: 850, t }); SP3s_stroom(ctx, t, 0, W, wl + 40, 820, 300);
    zwemmer(ctx, 'sam', 470, wl + 0.12 * 520, 520, { slag: 'crawl', t });
    const A = q.on('achttienduizend', 1, 0.4), cnt = Math.round(18000 * clamp((t - q.at('achttienduizend')) / 1.2, 0, 1) / 100) * 100;
    SP3_laag(ctx, A, () => { text(ctx, '± ' + cnt.toLocaleString('nl-NL'), 1500, 200, fTekst(84, 800), C.goud, 'center'); metaText(ctx, 'PER WEEK · GEMIDDELD', 1500, 250, C.text2, 'center', 24); });
    SP3_laag(ctx, q.on('enquête', 1, 0.5), () => { const x = 1140, y = 400; SP3_kaart(ctx, x, y, 700, 380, 1, C.koraal); metaText(ctx, 'ENQUÊTE VS · 15–17 JAAR', x + 30, y + 50, C.koraal, 'left', 24);
      const u = q.on('helft', 1, 0.8); roundRect(ctx, x + 30, y + 90, 640, 46, 10); shape(ctx, '#2A3446', C.line, 1.5); if (u > 0.01) { roundRect(ctx, x + 30, y + 90, 640 * 0.555 * u, 46, 10); shape(ctx, rgba(C.koraal, 0.8), C.koraal, 2); }
      ctx.fillStyle = C.text2; ctx.fillRect(x + 30 + 320, y + 80, 3, 66);
      SP3_tekst(ctx, 'Meer dan de helft had ooit', x + 30, y + 200, 34, C.text, 'left', u); SP3_tekst(ctx, 'schouderpijn die het trainen', x + 30, y + 244, 34, C.text, 'left', q.on('schouderpijn', 1, 0.4)); SP3_tekst(ctx, 'hinderde', x + 30, y + 288, 34, C.text, 'left', q.on('schouderpijn', 1, 0.4));
      metaText(ctx, 'STIRLING E.A. 2024', x + 670, y + 350, C.grain, 'right', 20); });
    SP3s_vraag(ctx, 640, 230, q.on('gebeurt', 1, 0.4), 100); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP3_antw(ctx, 'antwoord a: de grote binnendraaiers worden vaak het sterkst', 1);
    persoon(ctx, 'sam', 230, 820, 560, { outfit: 'zwem', t }); const sx = 312, sy = 386;
    const G = q.on('grote', 1, 0.5), Bi = q.on('binnen', 1, 0.8), Dk = q.on('sterker', 1, 0.6) * (0.75 + 0.25 * Math.sin(t * 4)), Kl = q.on('kleine', 1, 0.5), Bu = q.on('buiten', 2, 0.8), Ko = q.on('kop', 1, 0.5);
    zoomCircle(ctx, 700, 450, 200, sx, sy, 'VOOR', q.on('slag', 1, 0.5), () => SP3_schouderVoor(ctx, 700, 450, 200, { dik: Dk, binnen: Bi * (1 - Kl), kop: Ko, spiegel: true }));
    SP3_laag(ctx, q.on('rug', 1, 0.5), () => { ctx.save(); ctx.beginPath(); ctx.arc(1180, 450, 200, 0, 6.283); ctx.clip(); SP3_schouderAchter(ctx, 1180, 450, 200, { dik: Dk, klein: Kl, buiten: Bu, kop: Ko, spiegel: true }); ctx.restore(); circ(ctx, 1180, 450, 200, null, C.goud, 1.5); metaText(ctx, 'ACHTER', 1180, 690, C.grain, 'center', 28); });
    naamBij(ctx, 'grote borstspier', '', 700, 300, G, 'center'); naamBij(ctx, 'brede rugspier', '', 1150, 620, q.on('rug', 1, 0.5), 'center'); naamBij(ctx, 'kleine buitendraaiers', '', 1180, 236, Kl, 'center', C.teal);
    // weegschaaltjes: binnen zwaarder (één onderzoek), en een tweede met vraagteken
    const On = q.on('onderzoek', 1, 0.5), Tg = q.on('tegen', 1, 0.5);
    SP3_laag(ctx, On, () => { SP3_balans(ctx, 1660, 560, 0.62, ease((t - q.at('onderzoek')) / 3) * 0.9); tag(ctx, 'VAAK', 1660, 300, C.oker, 1, 'center', 26); metaText(ctx, 'ÉÉN ONDERZOEK:', 1660, 640, C.text2, 'center', 20); metaText(ctx, 'IN ÉÉN SEIZOEN', 1660, 668, C.text2, 'center', 20); metaText(ctx, 'BATALHA E.A. 2014', 1660, 698, C.grain, 'center', 18); });
    SP3_laag(ctx, Tg, () => SP3_balans(ctx, 1660, 850, 0.36, 0.25 * Math.sin(t * 2), 1, { vraag: true })); },

  s15(ctx, t, q) { const St = q.on('Stel', 1, 0.5);
    if (St < 1) SP3_laag(ctx, 1 - St, () => { SP3_zaal(ctx, 1, { rek: false, raam: false }); SP3_paal(ctx, 560);
      const t0 = q.at('elastiek'), rot = t > t0 ? (1 - Math.cos(2 * Math.PI * (t - t0) / 1.7)) / 2 : 0, reps = t > t0 ? Math.floor((t - t0) / 1.7 + 0.5) : 0;
      POSES.sp3_rot = { R: [0.12, lerp(-1.3, 1.15, rot)], L: [0.14, 0.06] }; const r = persoon(ctx, 'sam', 860, GROND, 470, { outfit: 'sport', pose: 'sp3_rot', t });
      SP3_laag(ctx, q.on('elastiek', 1, 0.4), () => { if (r.handR) SP3_lijn(ctx, [[572, r.handR.y + 6], [r.handR.x, r.handR.y]], SP3.elastiek, 7, 1); });
      persoon(ctx, 'femke', 1240, GROND, 460, { outfit: 'werk', t, pose: 'vasthouden', uit: 'blij', hold: (c, x, y) => SP3_stopwatch(c, x - 10, y - 24, 24, '', 1, (t * 0.5) % 1) });
      SP3_laag(ctx, q.on('volhoudt', 1, 0.4) * (1 - q.on('onderzoek', 1, 0.4)), () => { text(ctx, '× ' + reps, 1060, 330, fTekst(60, 800), C.teal, 'center'); metaText(ctx, 'HERHALINGEN', 1060, 372, C.text2, 'center', 20); });
      SP3_meta(ctx, "VOORBEELD VAN ZO'N TEST", 860, 220, q.on('test', 1, 0.4), C.grain, 'center', 26);
      const Ond = q.on('onderzoek', 1, 0.5), In = q.on('ineens', 1, 0.5), Of = q.on('verschil', 1, 0.5);
      SP3_laag(ctx, Ond * (1 - In), () => { SP3_kaart(ctx, 1380, 160, 480, 250, 1, C.teal); text(ctx, '201 jonge zwemmers', 1410, 230, fTekst(38, 800), C.text, 'left'); metaText(ctx, '± 1 JAAR GEVOLGD', 1410, 275, C.text2, 'left', 22);
        SP3_tekst(ctx, 'minder uithouding →', 1410, 322, 28, C.text, 'left', q.on('minder', 1, 0.4)); SP3_tekst(ctx, 'wat vaker pijn', 1410, 360, 28, C.koraal, 'left', q.on('vaker', 1, 0.4)); metaText(ctx, 'FEIJEN E.A. 2021', 1840, 395, C.grain, 'right', 18); });
      SP3_laag(ctx, In * (1 - Of), () => { SP3_kaart(ctx, 1360, 130, 520, 300, 1, C.koraal); SP3_belasting(ctx, 1420, 210, 400, 170, 1, { u: clamp((t - q.at('ineens')) / 1.2, 0, 1) }); tag(ctx, 'NOG ONZEKER', 1620, 190, C.koraal, q.on('onzeker', 1, 0.4), 'center', 24); });
      SP3_laag(ctx, Of, () => { SP3_balans(ctx, 1600, 420, 0.55, 0.6 * Math.sin(t * 1.6)); tag(ctx, 'NIET ZEKER', 1600, 180, C.koraal, 1, 'center', 28); }); });
    if (St > 0) SP3_laag(ctx, St, () => { const gy = 760; SP3_dek(ctx, 560, gy, 1, t); POSES.sp3_hand = { R: [-0.8, -2.4], L: [0.14, 0.06] };
      persoon(ctx, 'sam', 1000, gy, 470, { outfit: 'zwem', pose: 'sp3_hand', uit: 'moe', t }); SP3s_vraag(ctx, 1300, 380, q.on('Wat', 2, 0.4), 120); }); },

  s17(ctx, t, q) { SP3_zaal(ctx, 1, { rek: false, raam: true }); SP3_antw(ctx, 'antwoord b: laten onderzoeken door een fysiotherapeut of sportarts', 1);
    const x = 700, y = 300, w = 520, h = 300; ctx.fillStyle = SP3.rek; ctx.fillRect(x + 80, y + h, 12, GROND - y - h); ctx.fillRect(x + w - 92, y + h, 12, GROND - y - h); SP3_kaart(ctx, x, y, w, h, 1, C.line);
    const m = clamp((t - q.at('Samen')) / 1.8, 0, 1); SP3_belasting(ctx, x + 70, y + 60, w - 120, h - 130, 1, { groen: 0, koraal: 1, m });
    persoon(ctx, 'femke', 470, GROND, 460, { outfit: 'werk', t, pose: q.on('fysiotherapeut', 1) > 0.5 ? 'wijs' : 'staan', uit: 'neutraal' });
    persoon(ctx, 'zwemtrainer', 1460, GROND, 470, { zij: true, kijk: -1, t, uit: q.on('zwemtrainer', 1) > 0.5 ? 'blij' : 'neutraal', arm: q.on('past', 1) > 0.5 ? [1.35, 0.15] : undefined });
    metaText(ctx, 'TRAININGSPLAN', x + w / 2, y + h - 14, C.text2, 'center', 20); },

  // ---------- H4 Wat als je het overslaat? ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); const Ei = q.on('eind', 1, 0.5), L = 260, sA = { wl: 340, bod: 520 }, sB = { wl: 740, bod: 860 }, s = L / 1.79 / 1.04;
    tag(ctx, 'VOORBEELD', 1700, 120, C.text2, 1, 'center', 26);
    SP3_laag(ctx, 1 - Ei, () => { for (const [S, id] of [[sA, 'sam'], [sB, 'daan']]) { SP3_bad(ctx, { wl: S.wl, bodem: S.bod, t }); SP3s_stroom(ctx, t, 0, W, S.wl + 30, S.bod - 10, 280); zwemmer(ctx, id, 760, S.wl + 0.12 * L, L, { slag: 'crawl', t }); }
      SP3_kalender(ctx, 560, 160, 800, clamp((t - q.at('seizoen')) / (q.at('eind') - q.at('seizoen')), 0, 1), q.on('seizoen', 1, 0.4));
      SP3_laag(ctx, q.on('krachtzaal', 1, 0.4), () => { SP3_halter(ctx, 1400, 440, 1.3, 1); metaText(ctx, 'OOK KRACHTZAAL', 1500, 450, C.oker, 'left', 22); });
      SP3_laag(ctx, q.on('extra', 1, 0.4), () => { tag(ctx, '+ EXTRA METERS', 1560, 820, C.teal, 1, 'center', 28); });
      SP3_wolk(ctx, 1080, 550, 470, 130, ['SPIEREN = ZWAAR', 'EN TRAAG?'], q.on('want', 1, 0.4), { staart: -1, px: 32 }); });
    SP3_laag(ctx, Ei, () => { for (const [S, id] of [[sA, 'sam'], [sB, 'daan']]) { const bx = 300, by = S.wl - 0.75 * s; SP3_bad(ctx, { wl: S.wl, bodem: S.bod, t, x0: bx }); const dek = SP3_startKant(ctx, bx, S.wl, S.bod, s); ctx.fillStyle = '#22324C'; ctx.fillRect(0, S.wl - 200, bx - 60, dek - S.wl + 200);
        SP3_startblok(ctx, bx, by, s); const z = zwemmer(ctx, id, bx, by, L, { slag: 'startblok', t }); SP3_wig(ctx, z.wig, s); }
      metaText(ctx, '100 M', 1700, 300, C.text2, 'right', 26); SP3s_vraag(ctx, 1500, 640, q.on('Klopt', 1, 0.4), 110); }); },

  s20(ctx, t, q) { bg(ctx, 'schema');
    const Zp = q.on('Zwemmen', 1, 0.5), Wie = q.on('Wie', 1, 0.5), L = 260;
    // finish: beiden tikken aan; tussen de klokken alleen een bandje
    SP3_laag(ctx, 1 - Zp, () => { [[340, 520, 'sam'], [700, 860, 'daan']].forEach(([wl, bod, id], i) => { SP3_bad(ctx, { wl, bodem: bod, muur: 1560, t });
        const u = clamp(t / 3.4, 0, 1), hx = lerp(900, 1560 - 0.98 * L, ease(u)); if (u < 1) zwemmer(ctx, id, hx, wl + 0.12 * L, L, { slag: 'crawl', t: t + i * 0.3 }); else zwemmer(ctx, id, hx, wl + 0.18 * L, L, { slag: 'stroomlijn', t }); });
      const K = ramp(t, 3.5, 0.4); SP3_stopwatch(ctx, 1740, 300, 50, '', K, 0.62); SP3_stopwatch(ctx, 1740, 600, 50, '', K, 0.63); tag(ctx, '± 2 %?', 1740, 470, C.goud, K, 'center', 28);
      metaText(ctx, 'VOORBEELD · GEEN ECHTE UITSLAG', 1840, 230 - 20, C.grain, 'right', 22); });
    // gemiddeld ± 2 % met spreiding, en de zwemtrainer rekent
    SP3_laag(ctx, Zp * (1 - Wie), () => { const x = 200, y = 300, w = 760; SP3_kaart(ctx, x - 40, y - 60, w + 80, 520, 1, C.groen); metaText(ctx, 'ZWEMMEN + DROOGTRAINING', x, y - 10, C.groen, 'left', 24);
      const X = v => x + (v + 2) / 10 * w, yy = y + 190; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy + 90); ctx.lineTo(x + w, yy + 90); ctx.stroke(); ctx.beginPath(); ctx.moveTo(X(0), yy - 90); ctx.lineTo(X(0), yy + 96); ctx.stroke();
      [-2, 0, 2, 4, 6, 8].forEach(v => metaText(ctx, (v > 0 ? '+' : '') + v + ' %', X(v), yy + 128, C.text2, 'center', 18));
      const g = q.on('gemiddeld', 1, 0.8); SP3_laag(ctx, q.on('gemiddeld', 1, 0.4), () => { ctx.strokeStyle = rgba(C.groen, 0.8); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(-1.45), yy); ctx.lineTo(X(7.5), yy); ctx.moveTo(X(-1.45), yy - 18); ctx.lineTo(X(-1.45), yy + 18); ctx.moveTo(X(7.5), yy - 18); ctx.lineTo(X(7.5), yy + 18); ctx.stroke();
        roundRect(ctx, X(0), yy - 36, (X(2.2) - X(0)) * g, 72, 8); shape(ctx, rgba(C.groen, 0.8), C.groen, 2); metaText(ctx, 'GEMIDDELD ± 2 %', X(2.2), yy - 54, C.groen, 'center', 22); metaText(ctx, 'SPREIDING', X(7.5), yy + 50, C.text2, 'right', 18); });
      SP3_meta(ctx, 'KLEINE GROEPEN · VOORAL 50 M EN LANGER', x, y + 400, q.on('groepen', 1, 0.4), C.koraal, 'left', 22); metaText(ctx, 'FONE & VAN DEN TILLAAR 2022', x, y + 440, C.grain, 'left', 18);
      SP3_laag(ctx, q.on('zwemtrainer', 1, 0.4), () => { ctx.fillStyle = SP3.vloer; ctx.fillRect(1100, 800, 820, 8); persoon(ctx, 'zwemtrainer', 1240, 800, 470, { t, uit: 'blij', pose: 'vasthouden', hold: (c, hx, hy) => SP3_stopwatch(c, hx, hy - 20, 22, '', 1, 0.6) });
        SP3_stopwatch(ctx, 1620, 420, 90, '', 1, clamp((t - q.at('rekent')) / 3, 0, 1));
        SP3_tekst(ctx, '1:00,0', 1620, 590, 48, C.text, 'center', q.on('minuut', 1, 0.4)); SP3_tekst(ctx, '→ 0:58,8', 1620, 650, 48, C.groen, 'center', q.on('seconde', 1, 0.4)); metaText(ctx, '2 % VAN 60 S = 1,2 S', 1620, 700, C.text2, 'center', 20); }); });
    // wat je laat liggen: drie pictogrammen; de bewegingswetenschapper zoekt verder
    SP3_laag(ctx, Wie, () => { const y = 380, W3 = q.on('Welke', 1, 0.5), g = 0.3;
      metaText(ctx, 'WAT JE LAAT LIGGEN ALS JE HET OVERSLAAT', 960, 230, C.koraal, 'center', 24);
      SP3_icoonAfzet(ctx, 520, y, 1.2, Math.max(g, q.on('Afzet', 1, 0.4))); SP3_icoonKeten(ctx, 960, y, 1, g * (1 - q.on('romp', 1, 0.4))); SP3_icoonSchouder(ctx, 1400, y, 1, g * (1 - q.on('schouder', 1, 0.4))); naamBij(ctx, 'afzet', 'blok en muur', 520, y + 170, q.on('Afzet', 1, 0.4), 'center');
      SP3_icoonKeten(ctx, 960, y, 1, q.on('romp', 1, 0.4)); naamBij(ctx, 'stevige romp', '', 960, y + 170, q.on('romp', 1, 0.4), 'center');
      SP3_icoonSchouder(ctx, 1400, y, 1, q.on('schouder', 1, 0.4)); naamBij(ctx, 'schouder', 'heel seizoen', 1400, y + 170, q.on('schouder', 1, 0.4), 'center');
      SP3_laag(ctx, W3, () => { SP3_kaart(ctx, 660, 610, 600, 230, 1, C.teal); SP3_meet(ctx, 900, 700, 1, 1); metaText(ctx, 'BEWEGINGSWETENSCHAPPER', 960, 815, C.teal, 'center', 22); vraagteken(ctx, 1170, 760, 1, 90); }); });
    SP3_antw(ctx, 'antwoord a: nee, meestal werden ze er juist iets sneller van', 1); },

  // ---------- Recap ----------
  s21(ctx, t, q) { const Kt = q.on('keten', 1, 0.5), Zw = q.on('zwemtrainer', 1, 0.5);
    if (Kt < 1) SP3_laag(ctx, 1 - Kt, () => { SP3_zaal(ctx, 1); const n = q.on('droge', 1, 0.4) + q.on('kan', 1, 0.4) + q.on('wel', 1, 0.4); SP3_stang(ctx, 960, 520, 560, n);
      persoon(ctx, 'sam', 1420, GROND, 470, { outfit: 'sport', t, uit: 'blij' }); SP3_wolk(ctx, 1080, 140, 560, 170, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], 1, { staart: 1 }); });
    if (Kt > 0 && Zw < 1) SP3_laag(ctx, Kt * (1 - Zw), () => { bg(ctx, 'schema'); const Sp = q.on('sprong', 1, 0.4), Ro = q.on('romp', 1, 0.4), Sc = q.on('schouder', 1, 0.4), Tr = q.on('Trager', 1, 0.5);
      const hi = Sc > 0.5 ? 2 : Ro > 0.5 ? 1 : Sp > 0.5 ? 0 : -1; SP3_keten(ctx, 960, 330, { s: 0.9, hi, stroom: 1, labA: 0.6 });
      tag(ctx, 'SPRONG → START EN KEERPUNT', 300, 560, C.goud, Sp, 'left', 36); tag(ctx, 'ROMP → DE BRUG', 300, 650, C.goud, Ro, 'left', 36); tag(ctx, 'SCHOUDER → HET HELE SEIZOEN HEEL', 300, 740, C.goud, Sc, 'left', 36);
      SP3_wolk(ctx, 1260, 560, 520, 160, ['WORD IK DAAR NIET', 'ZWAAR EN TRAAG VAN?'], Tr, { staart: -1, px: 30, door: 'TRAAG', doorU: clamp((t - q.at('Trager') - 0.3) / 0.6, 0, 1) });
      SP3_meta(ctx, 'MEESTAL EERDER IETS SNELLER', 1520, 790, q.on('sneller', 1, 0.4), C.groen, 'center', 22); });
    if (Zw > 0) SP3_laag(ctx, Zw, () => { SP3_zaal(ctx, 1, { rek: false });
      persoon(ctx, 'zwemtrainer', 560, GROND, 470, { t, uit: 'blij' }); persoon(ctx, 'krachttrainer', 900, GROND, 480, { t, uit: 'blij' }); persoon(ctx, 'femke', 1240, GROND, 460, { outfit: 'werk', t, uit: 'blij' });
      naamBij(ctx, 'zwemtrainer', '', 560, 270, q.on('zwemtrainer', 1, 0.4), 'center'); naamBij(ctx, 'krachttrainer', '', 900, 250, q.on('krachttrainer', 1, 0.4), 'center'); naamBij(ctx, 'fysiotherapeut', '', 1240, 270, q.on('fysiotherapeut', 1, 0.4), 'center');
      SP3_laag(ctx, q.on('plannen', 1, 0.4), () => { SP3_kaart(ctx, 1460, 520, 400, 250, 1, C.teal); SP3_meet(ctx, 1640, 610, 0.9, 1); metaText(ctx, 'BEWEGINGS-', 1660, 720, C.teal, 'center', 20); metaText(ctx, 'WETENSCHAPPER', 1660, 748, C.teal, 'center', 20); }); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 100, 110, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 130, 180, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 700, 176, C.grain, 'right', 28);
    const rij = (y, a, kop, sub, ico) => SP3_laag(ctx, a, () => { SP3_kaart(ctx, 160, y, 1600, 150, 1, C.line); ico(260, y + 75); metaText(ctx, kop, 380, y + 66, C.goud, 'left', 26); if (sub) metaText(ctx, sub, 380, y + 112, C.text2, 'left', 22); });
    rij(270, q.on('Sportfysiotherapeut', 1, 0.4), 'HBO · FYSIOTHERAPIE → MASTER SPORTFYSIOTHERAPIE', 'SPORTFYSIOTHERAPEUT', (x, y) => gezichtIcoon(ctx, x, y, 1, 1, 'femke'));
    rij(450, q.on('Trainer', 1, 0.4), 'HBO · SPORTKUNDE', 'BIJVOORBEELD ZWEMTRAINER OF KRACHTTRAINER', (x, y) => gezichtIcoon(ctx, x, y, 1, 1, 'zwemtrainer'));
    rij(630, q.on('Bewegingswetenschappen', 1, 0.4), 'WO · BEWEGINGSWETENSCHAPPEN · 3 JAAR', 'AMSTERDAM (VU) · GRONINGEN (RUG)', (x, y) => SP3_meet(ctx, x - 20, y - 10, 0.55, 1)); },
});

// balk 'RACE 100 M · VIJFTIGMETERBAD'; D = verdeling zichtbaar (0..1), o.af = alleen het afzetmoment bij de muur, o.na = ook de meters erna, o.def = definitie
function SP3s_raceBalk(ctx, D, _, o = {}) { const { af = 0, na = 0, def = 0 } = o; const x0 = 260, w = 1400, y = 330, h = 74;
  metaText(ctx, 'RACE 100 M · VIJFTIGMETERBAD', x0, y - 96, C.text2, 'left', 26);
  roundRect(ctx, x0, y, w, h, 12); shape(ctx, '#2A3446', C.line, 2); const X = m => x0 + w * m / 100;
  ctx.fillStyle = SP3.tegelL; ctx.fillRect(X(50) - 3, y - 18, 6, h + 36); metaText(ctx, 'MUUR', X(50) + 14, y - 26, C.text2, 'left', 20);
  [0, 50, 100].forEach(m => metaText(ctx, m + ' M', X(m), y + h + 32, C.text2, m === 0 ? 'left' : m === 100 ? 'right' : 'center', 20));
  if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; [[0, 15], [45, 60]].forEach(([a, b]) => { roundRect(ctx, X(a), y, X(b) - X(a), h, 10); shape(ctx, rgba(C.oker, 0.8), C.oker, 2.5); });
    tag(ctx, 'BIJNA 1/3 VAN DE TIJD', X(30), y - 30, C.oker, 1, 'center', 30); metaText(ctx, '15 M ≈ 1/10', X(7.5), y + h / 2 + 8, '#1A2740', 'center', 22); ctx.restore(); }
  if (af > 0.01) { ctx.save(); ctx.globalAlpha *= af; roundRect(ctx, X(49), y - 8, X(51) - X(49), h + 16, 6); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  if (na > 0.01) { ctx.save(); ctx.globalAlpha *= na; roundRect(ctx, X(49), y - 8, (X(60) - X(49)) * clamp(na, 0, 1), h + 16, 8); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
  SP3_meta(ctx, 'START = EERSTE 15 M · KEERPUNT = 5 M VOOR TOT 10 M NA DE MUUR', x0 + w / 2, y + h + 76, def, C.grain, 'center', 22); }
// sprong op de mat (zijaanzicht): pz = null (staan), {hurk 0..1, up 0..1}
function SP3s_springer(ctx, x, pz, t) { const o = { outfit: 'sport', zij: true, kijk: -1, t, uit: 'neutraal' };
  if (!pz) return persoon(ctx, 'sam', x, GROND - 16, 470, o);
  if (pz.up > 0.01) return persoon(ctx, 'sam', x, GROND - 16 - 80 * pz.up, 470, Object.assign(o, { vrij: true, been1: { th: 0.05, kn: 0.1, an: -0.6 }, been2: { th: 0, kn: 0.1, an: -0.6 }, arm: [2.8, 0.1], armVer: [2.7, 0.1] }));
  const k = pz.hurk; return persoon(ctx, 'sam', x, GROND - 16, 470, Object.assign(o, { voorover: 0.45 * k, been1: { th: 1.2 * k, kn: 1.8 * k, an: 0.5 * k }, been2: { th: 1.15 * k, kn: 1.8 * k, an: 0.5 * k }, arm: [-0.9 * k + 0.1 * (1 - k), 0.3 * k + 0.1], armVer: [-0.9 * k + 0.1 * (1 - k), 0.3 * k + 0.1] })); }
