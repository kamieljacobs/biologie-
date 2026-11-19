
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
// Wat word jij? · Sport en topsport 4 · Eén doel of alles tegelijk? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): goud = snelheid/doel, oker = kracht, groen = conditie/aerobe basis, teal = water en herstel, koraal = let op.
// Op het (crème) papier van het klembord gebruiken we iets donkerdere tinten van dezelfde kleuren (leesbaar op licht papier).
// Proef van Hickson (1980) als grafiek met eerlijke assen (WEEK 1–10); waarden schematisch, vorm volgens B1/B2 (krachtgroep ± +44 %,
// combinatiegroep gelijk tot week 7, daarna vlak en dalend in week 9–10; duurgroep en combinatie conditie ± +20–25 %, krachtgroep ± +4 %).

const SP4 = { muur: '#22324F', raam: '#2C4266', water: '#2F6F8F', waterL: '#5BA4C9', vloer: '#34465F', voeg: '#2A3A52', rand: '#C9D6DE',
  papier: '#F2EEE4', bord: '#8A6A44', inkt: '#3A4458', grijs: '#9AA3B2',
  goud: '#C9962E', oker: '#A87A30', groen: '#3E8E5A', teal: '#2F7FA8', koraal: '#C0563C' };
const SP4_GROND = 840;

// ---------- algemene hulpjes ----------
function SP4_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP4_antw(ctx, s, a = 1) { regel(ctx, s, 120, 150, a, C.groen, 40, 'left', 700); }
function SP4_meta(ctx, s, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s, x, y, col, al, px); ctx.restore(); }
function SP4_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP4_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
function SP4_lijn(ctx, pts, col, lw = 3, a = 1, dash = null) { if (a <= 0.01 || pts.length < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP4_inkt(ctx, s, x, y, px = 26, col = SP4.inkt, al = 'left', gew = 700) { text(ctx, s, x, y, fTekst(px, gew), col, al); }
function SP4_mono(ctx, s, x, y, px = 22, col = SP4.inkt, al = 'left') { ctx.save(); ctx.font = fMeta(px); ctx.fillStyle = col; ctx.textAlign = al; ctx.letterSpacing = '2px'; ctx.fillText(s, x, y); ctx.restore(); }
// grote kaart met kop (+ optionele tweede regel)
function SP4_begrip(ctx, kop, sub, x, y, w, a = 1, col = C.goud) { if (a <= 0.01) return; const h = sub ? 112 : 76; SP4_kaart(ctx, x - w / 2, y, w, h, a, col);
  SP4_laag(ctx, a, () => { text(ctx, kop, x, y + 50, fTekst(38, 800), col, 'center'); if (sub) metaText(ctx, sub, x, y + 92, C.text, 'center', 24); }); }

// ---------- het zwembad (zijaanzicht vanaf de kant): muur, ramen, water, badrand ----------
function SP4_hal(ctx, o = {}) { const { dim = 0, t = 0 } = o; bg(ctx, 'schema');
  ctx.fillStyle = SP4.muur; ctx.fillRect(0, 0, W, 560);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 300; roundRect(ctx, x, 70, 230, 150, 8); shape(ctx, SP4.raam, null); ctx.fillStyle = rgba('#1A2740', 0.8); ctx.fillRect(x + 113, 70, 4, 150); ctx.fillRect(x, 143, 230, 4); }
  // tribune rechts achteraan (treden)
  for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#283A5A' : '#2E4264'; ctx.fillRect(1380 + i * 0, 300 + i * 50, 540, 50); }
  ctx.fillStyle = '#3A5070'; ctx.fillRect(1380, 296, 540, 6);
  // overkant van het bad
  ctx.fillStyle = SP4.rand; ctx.fillRect(0, 548, W, 12);
  // water met lijnen (banen)
  const g = ctx.createLinearGradient(0, 560, 0, 700); g.addColorStop(0, '#2A6585'); g.addColorStop(1, SP4.water); ctx.fillStyle = g; ctx.fillRect(0, 560, W, 140);
  [596, 640, 686].forEach((y, j) => { const n = 60 + j * 6, dx = W / n; for (let i = 0; i <= n; i++) { const x = i * dx + ((t * 6) % dx) * 0; circ(ctx, x, y, 3 + j, i % 5 < 2 ? '#D8573F' : '#F2F2EE'); } });
  ctx.strokeStyle = rgba('#9FD0EA', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { const y = 575 + k * 30; ctx.beginPath(); for (let x = 0; x <= W; x += 40) { const yy = y + Math.sin(x * 0.02 + t * 1.2 + k) * 2; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
  // badrand aan deze kant en de vloer
  ctx.fillStyle = SP4.rand; ctx.fillRect(0, 700, W, 14);
  ctx.fillStyle = SP4.vloer; ctx.fillRect(0, 714, W, H - 714);
  ctx.strokeStyle = SP4.voeg; ctx.lineWidth = 2; for (let y = 760; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let x = 0; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 714); ctx.lineTo(x - 30, 880); ctx.stroke(); }
  if (dim > 0) { ctx.fillStyle = rgba('#1A2740', dim); ctx.fillRect(0, 0, W, H); } }

// startblok in vooraanzicht (op de badrand), nr op de zijkant
function SP4_blok(ctx, x, y, s = 1, nr = '4', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#B8C0C8'; ctx.fillRect(-40, -150, 80, 150); ctx.fillStyle = '#9AA3AE'; ctx.fillRect(16, -150, 24, 150);
  ctx.beginPath(); ctx.moveTo(-70, -150); ctx.lineTo(70, -150); ctx.lineTo(62, -186); ctx.lineTo(-62, -176); ctx.closePath(); shape(ctx, '#E8ECEF', '#9AA3AE', 2);
  ctx.fillStyle = '#4A5468'; ctx.fillRect(-62, -184, 124, 8); text(ctx, nr, 0, -88, fTekst(46, 800), '#2A3446', 'center'); ctx.restore(); }

// ---------- klembord ----------
function SP4_klembord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 22); shape(ctx, SP4.bord, '#6E5236', 3);
  roundRect(ctx, x + 40, y + 60, w - 80, h - 90, 6); shape(ctx, SP4.papier, '#D8D0BE', 2);
  roundRect(ctx, x + w / 2 - 110, y - 22, 220, 64, 14); shape(ctx, '#B8C0C8', '#7A8490', 2); roundRect(ctx, x + w / 2 - 40, y - 8, 80, 22, 8); shape(ctx, '#7A8490', null);
  ctx.restore(); return { x: x + 40, y: y + 60, w: w - 80, h: h - 90 }; }
// balk op het papier: label boven, spoor, vulling
function SP4_balk(ctx, x, y, w, h, frac, col, label, a = 1, o = {}) { if (a <= 0.01) return; const { gloed = 0, half = false } = o; ctx.save(); ctx.globalAlpha *= a;
  if (label) SP4_mono(ctx, label, x, y - 14, 24, col);
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#E2DCCD', '#B8B0A0', 1.5);
  if (frac > 0.005) { roundRect(ctx, x, y, Math.max(h * 0.6, w * clamp(frac, 0, 1)), h, 10); shape(ctx, col, null); }
  if (half) { ctx.setLineDash([8, 6]); ctx.strokeStyle = SP4.inkt; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w / 2, y - 6); ctx.lineTo(x + w / 2, y + h + 6); ctx.stroke(); ctx.setLineDash([]); }
  if (gloed > 0.01) { ctx.globalAlpha *= gloed; roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 14); ctx.strokeStyle = SP4.goud; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore(); }
// klembord met de doelen als balken; vals = vulling per balk; n = aantal balken (3 of 4)
const SP4_DOELEN = [['SNELHEID', 'goud'], ['KRACHT', 'oker'], ['DUUR', 'groen'], ['HERSTEL', 'teal']];
function SP4_doelBord(ctx, x, y, w, h, vals, a = 1, o = {}) { const { n = 3, gloed = 0, vierde = 1, half = false } = o; const P = SP4_klembord(ctx, x, y, w, h, a); if (!P) return;
  SP4_laag(ctx, a, () => { SP4_mono(ctx, o.kop || 'DOELEN', P.x + 30, P.y + 50, 24, SP4.grijs);
    const rh = Math.min(120, (P.h - 90) / n); for (let i = 0; i < n; i++) { const [lab, kl] = SP4_DOELEN[i]; const aa = i === 3 ? vierde : 1;
      SP4_laag(ctx, aa, () => SP4_balk(ctx, P.x + 30, P.y + 110 + i * rh, P.w - 60, Math.min(46, rh * 0.42), vals[i] || 0, SP4[kl], lab, 1, { gloed, half })); } }); return P; }

// ---------- grafiek van de proef (twee panelen op het papier) ----------
const SP4_DATA = {
  k: { S: [0, 4, 9, 13, 17, 22, 26, 30, 35, 40, 44], SE: [0, 4, 9, 13, 17, 22, 26, 30, 31, 28, 25], E: [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1] },
  c: { S: [0, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4], SE: [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 23], E: [0, 3, 6, 9, 11, 13, 15, 17, 19, 21, 22] } };
function SP4_paneel(P, p) { const half = P.w / 2; const x0 = P.x + (p === 'k' ? 70 : half + 60), x1 = P.x + (p === 'k' ? half - 40 : P.w - 50); return { x0, x1, y0: P.y + 90, y1: P.y + 380 }; }
function SP4_pt(G, wk, v) { return [G.x0 + (G.x1 - G.x0) * wk / 10, G.y1 - (G.y1 - G.y0) * v / 50]; }
function SP4_assen(ctx, P, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (const p of ['k', 'c']) { const G = SP4_paneel(P, p), kl = p === 'k' ? SP4.oker : SP4.groen;
    SP4_mono(ctx, p === 'k' ? 'KRACHT' : 'CONDITIE', G.x0, G.y0 - 30, 26, kl);
    ctx.strokeStyle = SP4.inkt; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(G.x0, G.y0 - 6); ctx.lineTo(G.x0, G.y1); ctx.lineTo(G.x1 + 10, G.y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(G.x0 - 7, G.y0 + 4); ctx.lineTo(G.x0, G.y0 - 8); ctx.lineTo(G.x0 + 7, G.y0 + 4); ctx.stroke();
    SP4_mono(ctx, 'WINST', G.x0 + 12, G.y0 + 14, 18, SP4.grijs);
    for (let w = 1; w <= 10; w++) { const [xx] = SP4_pt(G, w, 0); ctx.beginPath(); ctx.moveTo(xx, G.y1); ctx.lineTo(xx, G.y1 + 8); ctx.stroke(); SP4_mono(ctx, String(w), xx, G.y1 + 32, 18, SP4.inkt, 'center'); }
    SP4_mono(ctx, 'WEEK', (G.x0 + G.x1) / 2, G.y1 + 62, 20, SP4.grijs, 'center'); }
  ctx.restore(); }
// één lijn tot week wk (mag een breuk zijn)
function SP4_reeks(ctx, P, p, groep, wk, o = {}) { const { a = 1, lw = 6, dash = null, lab = '', labA = 0, kl = null, labDy = -16 } = o; if (a <= 0.01 || wk <= 0) return null;
  const G = SP4_paneel(P, p), d = SP4_DATA[p][groep], pts = []; const n = Math.floor(wk);
  for (let i = 0; i <= Math.min(n, 10); i++) pts.push(SP4_pt(G, i, d[i]));
  if (n < 10 && wk > n) { const u = wk - n; pts.push(SP4_pt(G, wk, d[n] + (d[n + 1] - d[n]) * u)); }
  const col = kl || (p === 'k' ? SP4.oker : SP4.groen); SP4_lijn(ctx, pts, col, lw, a, dash);
  const e = pts[pts.length - 1]; circ(ctx, e[0], e[1], lw * 0.9, col);
  if (lab && labA > 0.01) SP4_laag(ctx, a * labA, () => SP4_inkt(ctx, lab, Math.min(e[0], G.x1) + 4, e[1] + labDy, 24, col, 'right'));
  return e; }

// ---------- zwembad van boven (één bad = één week) ----------
// lanes: drie banen (DUUR groen, KRACHT oker, SNELHEID goud); hl = index van de fel oplichtende baan (-1 = geen)
const SP4_BANEN = [['DUUR', 'groen'], ['KRACHT', 'oker'], ['SNELHEID', 'goud']];
function SP4_badje(ctx, x, y, w, h, hl, a = 1, o = {}) { if (a <= 0.01) return; const { dimA = 0.28 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 6, y - 6, w + 12, h + 12, 8); shape(ctx, SP4.rand, null);
  ctx.fillStyle = '#244E66'; ctx.fillRect(x, y, w, h); const bh = h / 3;
  for (let i = 0; i < 3; i++) { const kl = C[SP4_BANEN[i][1]]; const fel = i === hl; ctx.fillStyle = rgba(kl, fel ? 0.9 : (hl < 0 ? 0.25 : dimA)); ctx.fillRect(x + 4, y + i * bh + 4, w - 8, bh - 8); }
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2; ctx.setLineDash([4, 5]); for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x, y + i * bh); ctx.lineTo(x + w, y + i * bh); ctx.stroke(); } ctx.setLineDash([]);
  ctx.restore(); }
// groot bad van boven voor de titel: 6 banen, lijnen, rimpels
function SP4_badBoven(ctx, x, y, w, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 14, y - 14, w + 28, h + 28, 10); shape(ctx, SP4.rand, null); ctx.fillStyle = SP4.water; ctx.fillRect(x, y, w, h); const n = 6, bh = h / n;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let i = 0; i < n; i++) { ctx.fillStyle = '#1F3E5A'; ctx.fillRect(x + 50, y + i * bh + bh / 2 - 4, w - 100, 8); ctx.fillRect(x + w - 60, y + i * bh + bh / 2 - 18, 8, 36); ctx.fillRect(x + 52, y + i * bh + bh / 2 - 18, 8, 36); }
  ctx.strokeStyle = rgba('#9FD0EA', 0.35); ctx.lineWidth = 2; for (let k = 0; k < 14; k++) { const yy = y + 10 + k * h / 14; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const v = yy + Math.sin(xx * 0.03 + t * 1.1 + k * 1.7) * 3; xx === x ? ctx.moveTo(xx, v) : ctx.lineTo(xx, v); } ctx.stroke(); }
  for (let i = 1; i < n; i++) for (let xx = x; xx < x + w; xx += 16) circ(ctx, xx + 8, y + i * bh, 4.5, (Math.floor((xx - x) / 16) % 6 < 2 || xx > x + w - 100 || xx < x + 100) ? '#D8573F' : '#F2F2EE');
  ctx.restore(); ctx.restore(); }

// ---------- tijden, stopwatch, tijdbord ----------
function SP4_tegel(ctx, x, y, w, h, tijd, a = 1, o = {}) { if (a <= 0.01) return; const { kl = C.text, rand = C.line, kop = '50 M', vraag = false } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 12); shape(ctx, rgba('#0D1420', 0.9), rand, 2);
  metaText(ctx, kop, x + w / 2, y + 30, C.grain, 'center', 20);
  if (tijd) text(ctx, tijd, x + w / 2, y + h - 18, fTekst(38, 800), kl, 'center'); else if (vraag) text(ctx, '?', x + w / 2, y + h - 16, fTitel(40), C.goud, 'center');
  ctx.restore(); }
function SP4_stopwatch(ctx, x, y, r, t, a = 1, vraag = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - r * 0.18, y - r * 1.32, r * 0.36, r * 0.3, 4); shape(ctx, '#B8C0C8', null);
  circ(ctx, x, y, r, '#F2F2EE', '#8A94A6', r * 0.12); circ(ctx, x, y, r * 0.78, null, '#C9CED6', 2);
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.66, y + Math.sin(an) * r * 0.66); ctx.lineTo(x + Math.cos(an) * r * 0.76, y + Math.sin(an) * r * 0.76); ctx.stroke(); }
  const an = -Math.PI / 2 + t * 1.2; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.7, y + Math.sin(an) * r * 0.7); ctx.stroke(); circ(ctx, x, y, 6, C.koraal);
  if (vraag) text(ctx, '?', x + r * 1.35, y + r * 0.35, fTitel(r * 1.1), C.goud, 'center'); ctx.restore(); }
function SP4_tijdbord(ctx, x, y, w, h, kop, tijd, a = 1, kl = '#F2C94C') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#10161F', '#4A5468', 4); metaText(ctx, kop, x + 30, y + 48, C.text2, 'left', 26);
  text(ctx, tijd, x + w - 34, y + h - 30, `700 ${Math.round(h * 0.5)}px ${F.meta}`, kl, 'right'); ctx.restore(); }

// ---------- energievoorraad (batterij) en spiervezel ----------
function SP4_batterij(ctx, x, y, w, h, frac, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#10161F', '#C9CED6', 4); roundRect(ctx, x + w * 0.35, y - 14, w * 0.3, 16, 4); shape(ctx, '#C9CED6', null);
  const f = clamp(frac, 0, 1), ih = (h - 16) * f; if (ih > 1) { roundRect(ctx, x + 8, y + h - 8 - ih, w - 16, ih, 6); shape(ctx, kl, null); }
  ctx.restore(); }
function SP4_spiervezel(ctx, cx, cy, r) { ctx.fillStyle = '#5A2A2E'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const y = cy + i * r * 0.29, hgt = r * 0.24; roundRect(ctx, cx - r - 20, y - hgt / 2, 2 * r + 40, hgt, hgt / 2); shape(ctx, i % 2 ? '#B8605A' : '#A8524E', '#7A3A3A', 2);
    ctx.save(); roundRect(ctx, cx - r - 20, y - hgt / 2, 2 * r + 40, hgt, hgt / 2); ctx.clip(); ctx.strokeStyle = rgba('#F2D0C0', 0.4); ctx.lineWidth = 2;
    for (let x = cx - r; x < cx + r; x += 10) { ctx.beginPath(); ctx.moveTo(x, y - hgt / 2); ctx.lineTo(x, y + hgt / 2); ctx.stroke(); } ctx.restore(); } }

// ---------- klok met trainingsblokken (kracht = oker, duur = groen) ----------
function SP4_klok(ctx, x, y, r, segs, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#F2F2EE', '#8A94A6', 6);
  for (const [u0, u1, kl] of segs) { ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 10, -Math.PI / 2 + u0 * 6.283, -Math.PI / 2 + u1 * 6.283); ctx.closePath(); ctx.fillStyle = kl; ctx.fill(); }
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.strokeStyle = '#4A5468'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 4), y + Math.sin(an) * (r - 4)); ctx.lineTo(x + Math.cos(an) * (r - 16), y + Math.sin(an) * (r - 16)); ctx.stroke(); }
  circ(ctx, x, y, 7, '#4A5468'); ctx.restore(); }

// ---------- slaapkamer: Sam in bed (naar slaper() uit Slaap; ogen dicht via uit:'slaapt') ----------
if (CAST.sam && CAST.sam.garderobe && !CAST.sam.garderobe.pyjama) CAST.sam.garderobe.pyjama = { top: 'tshirt', topKleur: '#6F86B8', topAccent: '#5A70A0', broek: '#5A70A0' }; // pyjamashirt (alleen kleding)
if (CAST.passant && !CAST.passant.garderobe) CAST.passant.garderobe = { gewoon: {}, lab: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#6E8A6A' } }; // figurant als inspanningsfysioloog: alleen een labjas
function SP4_bed(ctx, id, x, y, h, o = {}) { const { a = 1, t = 0, deken = '#4A6FA0', outfit = 'pyjama' } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = (CAST[id].lengte || 1), hh = h * L / 6.1, len = h * L;
  roundRect(ctx, x - 60, y, len + 150, 70, 14); shape(ctx, '#5E4A36', '#3E3024', 2); roundRect(ctx, x - 80, y - 150, 34, 260, 10); shape(ctx, '#6B5338', '#3E3024', 2);
  roundRect(ctx, x - 40, y - 12, len + 100, 26, 10); shape(ctx, '#E6E1D3', '#C9C2B4', 1.5);
  roundRect(ctx, x - 40, y - hh * 1.6, hh * 2.4, hh * 1.5, hh * 0.6); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  const br = Math.sin(t * 1.4) * 0.012; ctx.save(); ctx.translate(x + len + 10, y - hh * 0.98); ctx.rotate(-Math.PI / 2); ctx.scale(1 + br, 1);
  persoon(ctx, id, 0, 0, h, { uit: 'slaapt', t: 0, outfit }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x + hh * 2.1, y - hh * 0.2); ctx.bezierCurveTo(x + hh * 2.4, y - hh * 2.4, x + len * 0.75, y - hh * 2.2, x + len + 60, y - hh * 1.3); ctx.lineTo(x + len + 70, y + 14); ctx.lineTo(x + hh * 2.1, y + 14); ctx.closePath(); shape(ctx, deken, _donker(deken, 0.25), 2);
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + hh * 2.1 + i * len * 0.18, y - hh * (1.9 - i * 0.12)); ctx.lineTo(x + hh * 2.1 + i * len * 0.18, y + 10); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: x + hh * 0.55, y: y - hh * 0.98 }, hh }; }
function SP4_kamer(ctx) { bg(ctx, 'schema'); ctx.fillStyle = '#1F2B44'; ctx.fillRect(0, 0, W, 840); ctx.fillStyle = '#2A2F3E'; ctx.fillRect(0, 840, W, H - 840);
  roundRect(ctx, 1450, 150, 320, 260, 10); shape(ctx, '#0E1626', '#4A5468', 8); ctx.fillStyle = '#4A5468'; ctx.fillRect(1606, 150, 8, 260); ctx.fillRect(1450, 276, 320, 8);
  circ(ctx, 1700, 210, 26, '#E8E2C8'); circ(ctx, 1690, 202, 24, '#0E1626');
  for (let i = 0; i < 6; i++) circ(ctx, 1490 + hash(i) * 110, 180 + hash(i * 3) * 80, 2.5, '#C9CED6'); }
function SP4_nachtkastje(ctx, x, y, w = 200, h = 170) { roundRect(ctx, x, y, w, h, 8); shape(ctx, '#6B5338', '#3E3024', 2); ctx.fillStyle = '#5A4630'; ctx.fillRect(x + 14, y + 30, w - 28, 4); circ(ctx, x + w / 2, y + 70, 6, '#C9A35C'); }
function SP4_wekker(ctx, x, y, a = 1, tijd = '05:30') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80, y - 70, 160, 70, 12); shape(ctx, '#10161F', '#4A5468', 3);
  text(ctx, tijd, x, y - 18, `700 40px ${F.meta}`, C.koraal, 'center'); ctx.restore(); }
function SP4_bord(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 70, 16, 0, 0, 6.283); shape(ctx, '#E8ECEF', '#9AA3AE', 2);
  ctx.beginPath(); ctx.ellipse(x - 18, y - 10, 26, 12, 0, 0, 6.283); shape(ctx, '#E0B64A', null); ctx.beginPath(); ctx.ellipse(x + 22, y - 9, 22, 11, 0.2, 0, 6.283); shape(ctx, '#7FC48F', null);
  ctx.beginPath(); ctx.ellipse(x + 2, y - 18, 16, 9, 0, 0, 6.283); shape(ctx, '#E07A5F', null); ctx.restore(); }
function SP4_bidon(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 22, y - 110, 44, 110, 12); shape(ctx, '#5BA4C9', '#2F7FA8', 2); roundRect(ctx, x - 12, y - 132, 24, 26, 6); shape(ctx, '#2A3446', null); ctx.fillStyle = rgba('#FFFFFF', 0.25); ctx.fillRect(x - 14, y - 90, 8, 70); ctx.restore(); }
// week in een kalender; rust = index van de rustdag (teal)
function SP4_week(ctx, x, y, cw, a = 1, o = {}) { if (a <= 0.01) return; const { rust = 6, alles = false, kop = '' } = o; ctx.save(); ctx.globalAlpha *= a;
  if (kop) metaText(ctx, kop, x, y - 18, C.text2, 'left', 24);
  ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'].forEach((d, i) => { const r = alles || i === rust; roundRect(ctx, x + i * (cw + 8), y, cw, cw * 1.1, 8); shape(ctx, r ? rgba(C.teal, 0.85) : rgba('#0D1420', 0.9), r ? C.teal : C.line, 2);
    metaText(ctx, d, x + i * (cw + 8) + cw / 2, y + cw * 0.68, r ? '#0D1420' : C.text2, 'center', 20); }); ctx.restore(); }

// ---------- balans: belasting (oker) tegen herstel (teal) ----------
function SP4_balans(ctx, cx, cy, kant, gewL, a = 1, o = {}) { if (a <= 0.01) return; const { gewR = 1 } = o; ctx.save(); ctx.globalAlpha *= a; const arm = 340, an = clamp(kant, -0.35, 0.35);
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(cx - 70, cy + 380); ctx.lineTo(cx + 70, cy + 380); ctx.lineTo(cx + 14, cy); ctx.lineTo(cx - 14, cy); ctx.closePath(); ctx.fill();
  const lx = cx - Math.cos(an) * arm, ly = cy + Math.sin(an) * arm, rx = cx + Math.cos(an) * arm, ry = cy - Math.sin(an) * arm;
  ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke(); circ(ctx, cx, cy, 14, '#C9CED6');
  const schaal = (px, py, kl, lab, gew) => { ctx.strokeStyle = '#8A94A6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 120, py + 150); ctx.moveTo(px, py); ctx.lineTo(px + 120, py + 150); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 152, 140, 18, 0, 0, 6.283); shape(ctx, rgba(kl, 0.35), kl, 3);
    metaText(ctx, lab, px, py + 210, kl, 'center', 28);
    gew.forEach((g, i) => { if (g.a <= 0.01) return; const gy = py + 132 - i * 54 - (1 - g.a) * 200; ctx.save(); ctx.globalAlpha *= clamp(g.a * 2, 0, 1); ctx.font = fMeta(20); ctx.letterSpacing = '3px'; const ww = Math.max(270, ctx.measureText(g.s).width + 40); ctx.letterSpacing = '0px'; roundRect(ctx, px - ww / 2, gy - 46, ww, 48, 10); shape(ctx, g.kl || kl, null);
      metaText(ctx, g.s, px, gy - 13, '#0D1420', 'center', 20); ctx.restore(); }); };
  schaal(lx, ly, C.oker, 'BELASTING', gewL); schaal(rx, ry, C.teal, 'HERSTEL', [{ s: 'SLAAP · ETEN · RUST', a: gewR, kl: C.teal }]);
  ctx.restore(); }

// ---------- logboekje van de trainer ----------
function SP4_logboek(ctx, x, y, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 500, 330, 12); shape(ctx, '#2F5FA8', '#264E8C', 3); roundRect(ctx, x + 20, y + 16, 460, 298, 8); shape(ctx, SP4.papier, null);
  SP4_mono(ctx, 'TIJDEN', x + 44, y + 64, 22, SP4.teal); SP4_mono(ctx, 'HOE VOEL JE JE?', x + 214, y + 64, 22, SP4.koraal);
  ctx.strokeStyle = '#D8D0BE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 200, y + 40); ctx.lineTo(x + 200, y + 296); ctx.stroke();
  const rij = [['1:00,4', 3], ['1:00,9', 2], ['1:01,8', 1], ['1:02,4', 0]];
  rij.forEach(([tt, gev], i) => { if (u * 4 < i + 0.5) return; const yy = y + 116 + i * 52; SP4_mono(ctx, tt, x + 44, yy, 24, SP4.inkt);
    for (let k = 0; k < 4; k++) circ(ctx, x + 230 + k * 36, yy - 8, 12, k <= gev ? SP4.groen : '#D8D0BE'); });
  ctx.restore(); }

// ---------- lab (inspanningsfysiologie): tafel met scherm ----------
function SP4_lab(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 360, 22, 6); shape(ctx, '#8A94A6', null); ctx.fillStyle = '#5A6478'; ctx.fillRect(x + 20, y + 22, 14, 840 - y - 22); ctx.fillRect(x + 326, y + 22, 14, 840 - y - 22);
  roundRect(ctx, x + 70, y - 200, 240, 160, 10); shape(ctx, '#10161F', '#4A5468', 6); ctx.fillStyle = '#4A5468'; ctx.fillRect(x + 180, y - 40, 20, 40);
  SP4_lijn(ctx, [[x + 95, y - 70], [x + 140, y - 90], [x + 185, y - 110], [x + 230, y - 140], [x + 285, y - 150]], C.oker, 4);
  SP4_lijn(ctx, [[x + 95, y - 64], [x + 140, y - 80], [x + 185, y - 100], [x + 230, y - 112], [x + 285, y - 124]], C.groen, 4);
  ctx.restore(); }
// Wat word jij? · Sport en topsport 4 · Eén doel of alles tegelijk? — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer (Sam, outfit 'zwem'), de zwemtrainer (klembord, stopwatch). Geen namen in beeld.
// Decor 'badrand' (eigen vector, SP4_hal) alleen onder scènes aan het bad; grafiek, jaarplan, balans en tijden op navy.
// Hoofdbeeld: het klembord met eerst drie, later vier balken (SNELHEID goud, KRACHT oker, DUUR groen, HERSTEL teal).

function SP4_trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || SP4_GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a }); }
function SP4_sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || SP4_GROND, o.h || 430, { t, kijk: o.kijk || 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan', outfit: o.outfit || 'zwem', a: o.a == null ? 1 : o.a }); }
// het klembord met de proef (s03, s04, s06): vaste plek
const SP4_KB = [380, 190, 1160, 670];
function SP4_proefBord(ctx, a = 1) { const P = SP4_klembord(ctx, SP4_KB[0], SP4_KB[1], SP4_KB[2], SP4_KB[3], a); return P; }
// seizoen: 24 weken; blokken BASIS (1–8, groen=0), KRACHT (9–14, oker=1), SNELHEID (15–20, goud=2), AFBOUW (21–23), TOERNOOI (24)
function SP4_weekHL(i) { return i < 8 ? 0 : i < 14 ? 1 : i < 20 ? 2 : i < 23 ? 2 : -1; }

Object.assign(SCENES, {
  title(ctx, t) { SP4_badBoven(ctx, 1100, 500, 700, 330, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_blok(ctx, 820, SP4_GROND, 1, '4');
    SP4_trainer(ctx, 250, t, { uit: q.on('allemaal', 1) > 0.5 ? 'denkt' : 'neutraal' });
    SP4_sam(ctx, 560, t, { uit: 'blij', kijk: -1, pose: q.on('drie', 1) > 0.5 && q.on('liefst', 1) < 0.5 ? 'wijsOmhoog' : 'staan' });
    tag(ctx, '100 M SNELLER', 400, 180, C.goud, q.on('sneller', 1, 0.3), 'left', 34);
    tag(ctx, 'STERKER VAN HET BLOK', 400, 260, C.oker, q.on('sterker', 1, 0.3), 'left', 34);
    tag(ctx, '400 M VOLHOUDEN', 400, 340, C.groen, q.on('langer', 1, 0.3), 'left', 34);
    const K = q.on('allemaal', 1, 0.5), V = ramp(t, q.at('elke', 1), 1.6);
    SP4_doelBord(ctx, 1160, 250, 620, 470, [V, V, V], K, { kop: 'ELKE WEEK', gloed: q.on('vol', 2, 0.4) });
    SP4_laag(ctx, q.on('Kan', 1, 0.4), () => { SP4_kaart(ctx, 1160, 120, 620, 96, 1, C.goud); text(ctx, 'ALLES TEGELIJK?', 1470, 186, fTekst(48, 800), C.goud, 'center'); }); },

  // ---------- H1 Je wordt goed in wat je traint ----------
  s03(ctx, t, q) { SP4_hal(ctx, { t, dim: 0.55 });
    const In = ramp(t, 0, 1.0), Pr = q.on('proef', 1, 0.6), Wv = SP4_fase(t, q.at('waarvoor', 1), q.at('laat', 1));
    SP4_trainer(ctx, 190, t, { pose: Wv > 0.5 ? 'wijs' : 'staan', uit: Wv > 0.5 ? 'praat' : 'neutraal' });
    ctx.save(); ctx.translate(0, (1 - In) * 300); const P = SP4_proefBord(ctx, In); ctx.restore(); if (!P) return;
    // eerst de drie lege doelbalken
    SP4_laag(ctx, 1 - Pr, () => { SP4_mono(ctx, 'WAARVOOR TRAIN JE?', P.x + 40, P.y + 60, 30, SP4.goud);
      for (let i = 0; i < 3; i++) { const [lab, kl] = SP4_DOELEN[i]; SP4_balk(ctx, P.x + 60, P.y + 150 + i * 130, P.w - 120, 52, 0, SP4[kl], lab, 1, { gloed: Wv * (0.5 + 0.5 * Math.sin(t * 5 + i)) }); } });
    // dan de proef
    SP4_laag(ctx, Pr, () => { SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
      const wS = 10 * clamp((t - q.at('kracht', 1)) / 2.6, 0, 1), wE = 10 * clamp((t - q.at('duur', 1)) / 2.6, 0, 1);
      SP4_reeks(ctx, P, 'k', 'S', wS, { lab: 'alleen kracht', labA: ramp(t, q.at('kracht', 1) + 2.6, 0.4) });
      SP4_reeks(ctx, P, 'c', 'S', wS, { lab: 'alleen kracht', labA: ramp(t, q.at('kracht', 1) + 2.6, 0.4) });
      SP4_reeks(ctx, P, 'k', 'E', wE, { lab: 'alleen duur', labA: ramp(t, q.at('duur', 1) + 2.6, 0.4), dash: [3, 10] });
      SP4_reeks(ctx, P, 'c', 'E', wE, { lab: 'alleen duur', labA: ramp(t, q.at('duur', 1) + 2.6, 0.4), dash: [3, 10] });
      // nadruk op de uitkomst
      const nad = (p, g, d, a) => { if (a <= 0.01) return; const G = SP4_paneel(P, p), e = SP4_pt(G, 10, SP4_DATA[p][g][10]); ctx.save(); ctx.globalAlpha *= a; circ(ctx, e[0], e[1], 22, null, SP4.goud, 4); ctx.restore(); };
      nad('k', 'S', 0, SP4_fase(t, q.at('sterker', 1) - 0.2, q.at('nauwelijks', 1) + 0.6)); nad('c', 'S', 0, SP4_fase(t, q.at('nauwelijks', 1), q.at('duurgroep', 1)));
      nad('c', 'E', 0, SP4_fase(t, q.at('fitter', 2) - 0.2, q.at('niet', 1))); nad('k', 'E', 0, SP4_fase(t, q.at('niet', 1), q.at('Training', 1)));
      SP4_laag(ctx, q.on('Training', 1, 0.4), () => { roundRect(ctx, P.x + P.w / 2 - 300, P.y + 470, 600, 80, 14); shape(ctx, rgba(SP4.goud, 0.18), SP4.goud, 3); text(ctx, 'SPECIFIEK', P.x + P.w / 2, P.y + 525, fTekst(44, 800), SP4.goud, 'center'); });
      SP4_laag(ctx, q.on('Daarom', 1, 0.4), () => SP4_mono(ctx, 'EERST HET DOEL', P.x + P.w / 2, P.y + 572, 22, SP4.inkt, 'center')); }); },

  // ---------- H2 Doelen die botsen ----------
  s04(ctx, t, q) { SP4_hal(ctx, { t, dim: 0.55 }); SP4_trainer(ctx, 190, t);
    SP4_sam(ctx, 1730, t, { kijk: -1, uit: q.on('Wat', 1) > 0.5 ? 'denkt' : 'blij' });
    const P = SP4_proefBord(ctx, 1); SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
    const D = q.on('derde', 1, 0.8), wSE = 7 * clamp((t - q.at('Zeven', 1)) / 5.6, 0, 1), V = q.on('Wat', 1, 0.5);
    // referentie: kracht van de krachtgroep en conditie van de duurgroep worden gestippeld; de andere twee lijnen gaan weg
    SP4_reeks(ctx, P, 'k', 'S', 10, { dash: D > 0.5 ? [10, 10] : null, lw: 6 - 2 * D, lab: 'alleen kracht', labA: 1 });
    SP4_reeks(ctx, P, 'c', 'E', 10, { dash: [3, 10], lw: 6 - 2 * D, lab: 'alleen duur', labA: 1 });
    SP4_reeks(ctx, P, 'c', 'S', 10, { a: 1 - D, lab: 'alleen kracht', labA: 1 }); SP4_reeks(ctx, P, 'k', 'E', 10, { a: 1 - D, dash: [3, 10], lab: 'alleen duur', labA: 1 });
    SP4_laag(ctx, D, () => SP4_mono(ctx, 'KRACHT + DUUR', P.x + P.w / 2, P.y + 470, 26, SP4.inkt, 'center'));
    SP4_reeks(ctx, P, 'k', 'SE', wSE, { lw: 9, kl: '#7A5418' }); SP4_reeks(ctx, P, 'c', 'SE', wSE, { lw: 9, kl: '#24683E' });
    // vraag: grafiek stopt bij week 7
    SP4_laag(ctx, V, () => { const G = SP4_paneel(P, 'k'), [x7] = SP4_pt(G, 7, 0), [x10] = SP4_pt(G, 10, 0);
      ctx.fillStyle = rgba(SP4.goud, 0.16); ctx.fillRect(x7, G.y0, x10 - x7 + 10, G.y1 - G.y0);
      ctx.setLineDash([8, 8]); ctx.strokeStyle = SP4.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x7, G.y0); ctx.lineTo(x7, G.y1); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, '?', (x7 + x10) / 2 + 6, G.y0 + 150, fTitel(110), SP4.goud, 'center'); }); },

  s06(ctx, t, q) { const Z = q.on('Inspanningsfysiologen', 1, 0.7);
    if (Z < 1) { SP4_hal(ctx, { t, dim: 0.55 }); SP4_laag(ctx, 1 - Z, () => { SP4_trainer(ctx, 190, t);
      const P = SP4_proefBord(ctx, 1); SP4_assen(ctx, P, 1); SP4_mono(ctx, 'HICKSON 1980', P.x + P.w - 30, P.y + 36, 22, SP4.grijs, 'right');
      SP4_reeks(ctx, P, 'k', 'S', 10, { dash: [10, 10], lw: 4, lab: 'alleen kracht', labA: 1 }); SP4_reeks(ctx, P, 'c', 'E', 10, { dash: [3, 10], lw: 4, lab: 'alleen duur', labA: 1 });
      const wk = 7 + clamp((t - q.at('stopt', 1)) / 1.2, 0, 1) + 2 * clamp((t - q.at('zakt', 1)) / 1.2, 0, 1), wc = 7 + 3 * clamp((t - q.at('conditie', 1)) / 1.4, 0, 1);
      SP4_reeks(ctx, P, 'k', 'SE', wk, { lw: 9, kl: '#7A5418', lab: 'kracht + duur', labDy: 56, labA: ramp(t, q.at('zakt', 1) + 1.2, 0.4) });
      SP4_reeks(ctx, P, 'c', 'SE', wc, { lw: 9, kl: '#24683E', lab: 'kracht + duur', labDy: 56, labA: ramp(t, q.at('conditie', 1) + 1.4, 0.4) });
      const I = q.on('interferentie', 1, 0.5); if (I > 0.01) SP4_laag(ctx, I, () => { roundRect(ctx, P.x + 60, P.y + 488, P.w - 120, 88, 14); shape(ctx, rgba('#0D1420', 0.92), C.koraal, 3);
        text(ctx, 'INTERFERENTIE-EFFECT', P.x + P.w / 2, P.y + 526, fTekst(34, 800), C.koraal, 'center');
        SP4_meta(ctx, 'TWEE DOELEN TEGELIJK → WINST OP ÉÉN KLEINER (HIER: KRACHT)', P.x + P.w / 2, P.y + 562, q.on('train', 1, 0.5), C.text, 'center', 22); }); }); }
    if (Z <= 0.01) return; SP4_laag(ctx, Z, () => { bg(ctx, 'schema');
      // stapel proeven die samenschuiven
      const S = q.on('tientallen', 1, 1.2), M = q.on('maximale', 1, 0.5), Kl = q.on('lijkt', 1, 0.6);
      SP4_laag(ctx, 1 - Kl, () => { for (let i = 0; i < 9; i++) { const sx = 160 + (i % 3) * 140, sy = 260 + Math.floor(i / 3) * 150, ex = 200 + i * 4, ey = 360 - i * 8; const x = lerp(sx, ex, S), y = lerp(sy, ey, S);
          roundRect(ctx, x, y, 200, 130, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); for (let k = 0; k < 4; k++) { ctx.fillStyle = '#B8B0A0'; ctx.fillRect(x + 20, y + 26 + k * 24, 160 - (k % 2) * 50, 6); } }
        SP4_meta(ctx, 'SCHUMANN E.A. 2021', 300, 600, S, C.grain, 'center', 26); SP4_meta(ctx, 'TIENTALLEN PROEVEN', 300, 640, S, C.text2, 'center', 24);
        // drie staven: kracht + duur, vergeleken met alleen kracht
        SP4_laag(ctx, M, () => { const base = 700, ref = 340; SP4_meta(ctx, 'KRACHT + DUUR, VERGELEKEN MET ALLEEN KRACHT', 1080, 230, 1, C.text2, 'center', 24);
          ctx.setLineDash([12, 10]); ctx.strokeStyle = C.oker; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(650, ref); ctx.lineTo(1520, ref); ctx.stroke(); ctx.setLineDash([]); SP4_meta(ctx, 'ALLEEN KRACHT', 1520, ref - 16, 1, C.oker, 'right', 22);
          ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(650, base); ctx.lineTo(1520, base); ctx.stroke();
          const st = [['MAXIMALE', 'KRACHT', 'maximale', ref], ['SPIERMASSA', '', 'spiermassa', ref], ['EXPLOSIEVE', 'KRACHT', 'explosieve', ref + 140]];
          st.forEach(([l1, l2, cue, top], i) => { const g = q.on(cue, 1, 0.8), x = 720 + i * 280, hgt = (base - top) * g; roundRect(ctx, x, base - hgt, 170, hgt, 8); shape(ctx, rgba(C.oker, 0.8), i === 2 ? C.koraal : C.oker, i === 2 ? 6 : 2);
            SP4_meta(ctx, l1, x + 85, base + 40, q.on(cue, 1, 0.3), i === 2 ? C.koraal : C.text, 'center', 22); if (l2) SP4_meta(ctx, l2, x + 85, base + 72, q.on(cue, 1, 0.3), i === 2 ? C.koraal : C.text, 'center', 22); });
          SP4_meta(ctx, 'MEESTAL GEWOON', 1000, 300, SP4_fase(t, q.at('groeien', 1), q.at('Vooral', 1) + 0.6), C.groen, 'center', 24);
          SP4_meta(ctx, 'MINDER', 1365, 462, q.on('minder', 1, 0.4), C.koraal, 'center', 26); });
        // afzet van het startblok (voorbeeld van explosieve kracht)
        SP4_laag(ctx, SP4_fase(t, q.at('sprong', 1) - 0.2, q.at('lijkt', 1) + 0.2), () => { SP4_kaart(ctx, 1540, 250, 350, 400, 1, C.koraal); const xr = 1680, yb = 470;
          ctx.fillStyle = SP4.vloer; ctx.fillRect(1556, 600, xr - 1556, 34); ctx.fillStyle = SP4.water; ctx.fillRect(xr, 560, 1874 - xr, 74); ctx.fillStyle = rgba('#9FD0EA', 0.6); ctx.fillRect(xr, 558, 1874 - xr, 4);
          ctx.fillStyle = '#B8C0C8'; ctx.fillRect(xr - 70, yb, 70, 600 - yb); const s = zwemmer(ctx, 'sam', xr, yb, 250, { slag: 'startblok', kijk: 1 }); if (s && s.wig) { roundRect(ctx, s.wig.x - 30, s.wig.y - s.wig.h, 60, s.wig.h, 4); shape(ctx, '#8A94A6', null); }
          SP4_meta(ctx, 'EXPLOSIEF: AFZET', 1715, 292, 1, C.koraal, 'center', 22); }); });
      // klokken: in één training of uren ertussen
      SP4_laag(ctx, Kl, () => { tag(ctx, 'LIJKT', 960, 200, C.goud, 1, 'center', 32);
        SP4_klok(ctx, 620, 450, 150, [[0, 0.08, C.oker], [0.08, 0.16, C.groen]], 1); SP4_meta(ctx, 'IN ÉÉN TRAINING', 620, 660, 1, C.koraal, 'center', 26); SP4_meta(ctx, 'MINDER KRACHT', 620, 700, 1, C.text2, 'center', 22);
        SP4_klok(ctx, 1300, 450, 150, [[0, 0.08, C.oker], [0.42, 0.5, C.groen]], 1); SP4_meta(ctx, 'UREN ERTUSSEN', 1300, 660, 1, C.groen, 'center', 26); SP4_meta(ctx, 'NAUWELIJKS EFFECT', 1300, 700, 1, C.text2, 'center', 22);
        vraagteken(ctx, 960, 520, q.on('Waarom', 1, 0.4), 120);
        SP4_laag(ctx, q.on('zwemmers', 1, 0.4), () => { ctx.fillStyle = rgba(C.teal, 0.25); ctx.fillRect(1500, 790, 380, 70); zwemmer(ctx, 'sam', 1660, 790 + 0.12 * 170, 170, { slag: 'crawl', t }); text(ctx, '?', 1860, 790, fTitel(70), C.goud, 'center'); }); }); }); },

  // ---------- H2 Doelen die helpen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const WL = 500, BOD = 720, L = 380;
    ctx.fillStyle = SP4.vloer; ctx.fillRect(0, WL, 280, BOD - WL); ctx.fillStyle = SP4.rand; ctx.fillRect(0, WL - 6, 290, 10);
    const g = ctx.createLinearGradient(0, WL, 0, BOD); g.addColorStop(0, '#2F6F8F'); g.addColorStop(1, '#234E6A'); ctx.fillStyle = g; ctx.fillRect(280, WL, W - 280, BOD - WL);
    ctx.fillStyle = SP4.rand; ctx.fillRect(280, BOD, W - 280, 8); ctx.fillRect(1900, WL - 6, 20, BOD - WL + 14);
    SP4_trainer(ctx, 140, t, { y: WL, h: 380, kijk: 1 });
    // de zwemmer: lengte 1 (→), lengte 2 (←); 50 m in beeld geschaald
    const t0 = q.at('laat', 1), v = 1.7 * L / 1.79, xa = 560, xb = 1620, d = xb - xa, T1 = d / v; let u = t - t0, x, kijk = 1;
    if (u < 0) x = xa; else if (u < T1) x = xa + v * u; else if (u < 2 * T1) { x = xb - v * (u - T1); kijk = -1; } else { x = xa + Math.min(d, v * (u - 2 * T1)); }
    zwemmer(ctx, 'sam', x, WL + 0.12 * L, L, { slag: u < 0 ? 'stroomlijn' : 'crawl', t: Math.max(0, u), kijk });
    ctx.strokeStyle = rgba('#9FD0EA', 0.6); ctx.lineWidth = 3; ctx.beginPath(); for (let xx = 280; xx <= W; xx += 30) { const yy = WL + Math.sin(xx * 0.03 + t * 2) * 3; xx === 280 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); } ctx.stroke();
    tag(ctx, '8 × 50 M · SNEL · KORTE RUST', 1100, 150, C.goud, q.on('acht', 1, 0.4), 'center', 34);
    const tijden = ['29,8', '30,1']; for (let i = 0; i < 8; i++) { const tx = 300 + i * 190; const klaar = i < 2 && u > (i + 1) * T1;
      SP4_tegel(ctx, tx, 760, 172, 104, klaar ? tijden[i] : '', q.on('acht', 1, 0.4), { vraag: !klaar && q.on('Wat', 1) > 0.5 && i >= 2 }); }
    SP4_meta(ctx, 'VOORBEELD', 300, 752, q.on('acht', 1, 0.4), C.grain, 'left', 20);
    SP4_stopwatch(ctx, 1640, 300, 70, t, q.on('sprinter', 1, 0.4), true); },

  s09(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord c: hij herstelt sneller tussen de herhalingen', 1);
    const MET = ['29,8', '30,0', '30,2', '30,4', '30,6', '30,8', '30,9', '31,1'], ZON = ['29,8', '30,4', '31,0', '31,6', '32,1', '32,6', '33,0', '33,4'];
    const t0 = q.at('herstelt', 1); text(ctx, 'met aerobe basis', 120, 290, fTekst(34, 700), C.groen, 'left'); text(ctx, 'zonder', 120, 430, fTekst(34, 700), C.koraal, 'left');
    for (let i = 0; i < 8; i++) { const a = ramp(t, t0 + i * 0.3, 0.3), x = 470 + i * 178, top = q.on('topsnelheid', 1, 0.4) * (i === 0 ? 1 : 0);
      SP4_tegel(ctx, x, 230, 160, 96, MET[i], a, { kl: C.groen, rand: top > 0.5 ? C.goud : C.line }); SP4_tegel(ctx, x, 370, 160, 96, ZON[i], a, { kl: i ? C.koraal : C.text, rand: top > 0.5 ? C.goud : C.line }); }
    SP4_meta(ctx, 'VOORBEELD', 1880, 500, ramp(t, t0, 0.4), C.grain, 'right', 22);
    SP4_laag(ctx, q.on('topsnelheid', 1, 0.4), () => { text(ctx, '=', 550, 358, fTitel(44), C.goud, 'center'); SP4_meta(ctx, 'TOPSNELHEID GELIJK', 470, 210, 1, C.goud, 'left', 22); });
    // zwemmer met zoomcirkel naar de spier en twee batterijen
    const A = q.on('aerobe', 1, 0.6); SP4_laag(ctx, A, () => { const WL = 700; ctx.fillStyle = rgba(C.teal, 0.28); ctx.fillRect(100, WL, 560, 160); ctx.fillStyle = rgba('#9FD0EA', 0.6); ctx.fillRect(100, WL - 2, 560, 4);
      const r = zwemmer(ctx, 'sam', 420, WL + 0.12 * 260, 260, { slag: 'crawl', fase: 0.26 }); const sx = r.schouder ? r.schouder.x : 470, sy = r.schouder ? r.schouder.y : WL;
      zoomCircle(ctx, 880, 690, 150, sx, sy, '', q.on('spieren', 1, 0.5), () => { SP4_spiervezel(ctx, 880, 690, 150); });
      SP4_meta(ctx, 'SPIER', 880, 520, q.on('spieren', 1, 0.5), C.grain, 'center', 24);
      const E = q.on('energievoorraad', 1, 0.5), per = 4, ph = ((t - q.at('energievoorraad', 1)) % per + per) % per;
      SP4_laag(ctx, E, () => { metaText(ctx, 'ENERGIEVOORRAAD IN DE RUST', 1460, 560, C.text2, 'center', 24);
        SP4_batterij(ctx, 1220, 610, 110, 200, 0.3 + 0.7 * clamp(ph / 1.4, 0, 1), C.groen, 1); SP4_meta(ctx, 'MET', 1275, 850, 1, C.groen, 'center', 24);
        SP4_batterij(ctx, 1560, 610, 110, 200, 0.3 + 0.7 * clamp(ph / 3.6, 0, 1), C.koraal, 1); SP4_meta(ctx, 'ZONDER', 1615, 850, 1, C.koraal, 'center', 24); });
      SP4_meta(ctx, 'TOMLIN & WENGER 2001', 120, 540, ramp(t, q.at('aerobe', 1) + 0.5, 0.4), C.grain, 'left', 22); }); },

  // ---------- H3 Het seizoen in blokken ----------
  s10(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_trainer(ctx, 360, t, { pose: q.on('Hoe', 1) > 0.5 ? 'denk' : 'staan', uit: q.on('Hoe', 1) > 0.5 ? 'denkt' : 'neutraal' });
    // tafel met een leeg jaarplan
    roundRect(ctx, 640, 680, 1180, 26, 6); shape(ctx, '#C9A35C', '#8A6A44', 2); ctx.fillStyle = '#8A6A44'; ctx.fillRect(670, 706, 18, 134); ctx.fillRect(1772, 706, 18, 134);
    roundRect(ctx, 700, 230, 1060, 440, 10); shape(ctx, SP4.papier, '#B8B0A0', 3);
    SP4_mono(ctx, 'JAARPLAN', 740, 284, 30, SP4.inkt);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) { roundRect(ctx, 740 + c * 76, 320 + r * 82, 66, 70, 6); shape(ctx, '#FFFFFF', '#C9C2B4', 1.5); }
    SP4_mono(ctx, 'WEEK 1', 740, 662, 18, SP4.grijs); SP4_mono(ctx, 'WEEK 52', 1718, 662, 18, SP4.grijs, 'right');
    vraagteken(ctx, 1250, 230, q.on('Hoe', 1, 0.4), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord a: in blokken, elk met een eigen hoofddoel', 1);
    const BW = 180, BH = 120, GAP = 32, X0 = 330, Y0 = 330; const cam = 2700 * ease(clamp((t - q.at('Eerst', 1)) / (q.at('snelheid', 1) + 0.6 - q.at('Eerst', 1)), 0, 1));
    // legenda (vast)
    SP4_banenLegenda(ctx, 60, Y0, BH, 1);
    ctx.save(); ctx.beginPath(); ctx.rect(300, 200, W - 300, 300); ctx.clip();
    const Bl = q.on('blokken', 1, 0.6);
    for (let i = 0; i < 24; i++) { const x = X0 + i * (BW + GAP) - cam; if (x > W + 20 || x + BW < 280) continue; const hl = SP4_weekHL(i); const ok = i < 20;
      SP4_badje(ctx, x, Y0, BW, BH, ok ? (Bl > 0.5 ? hl : -1) : -1, i < 20 ? 1 : 0.35); SP4_mono(ctx, 'WEEK ' + (i + 1), x + BW / 2, Y0 + BH + 34, 18, C.text2, 'center'); }
    // blokken met hoofddoel
    const blok = (i0, i1, s, kl) => { const xa = X0 + i0 * (BW + GAP) - cam, xb = X0 + i1 * (BW + GAP) + BW - cam; if (xb < 290 || xa > W) return; ctx.save(); ctx.globalAlpha *= Bl; ctx.strokeStyle = kl; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(xa, Y0 - 30); ctx.lineTo(xa, Y0 - 44); ctx.lineTo(xb, Y0 - 44); ctx.lineTo(xb, Y0 - 30); ctx.stroke(); const xm = clamp((Math.max(xa, 300) + Math.min(xb, W)) / 2, 380, W - 160); tag(ctx, s, xm, Y0 - 62, kl, 1, 'center', 28); ctx.restore(); };
    blok(0, 7, 'BASIS', C.groen); blok(8, 13, 'KRACHT', C.oker); blok(14, 19, 'SNELHEID', C.goud);
    ctx.restore();
    SP4_laag(ctx, q.on('periodiseren', 1, 0.5) * (1 - q.on('idee', 1, 0.5)), () => SP4_begrip(ctx, 'PERIODISEREN', 'BLOKKEN MET ELK EEN HOOFDDOEL', 960, 560, 760, 1, C.goud));
    // onderhoud: de gedimde banen
    SP4_laag(ctx, SP4_fase(t, q.at('hoofddoel', 2), q.at('idee', 1) + 0.4), () => { SP4_meta(ctx, 'GEDIMD = ONDERHOUD', 960, 720, 1, C.text, 'center', 28); SP4_meta(ctx, 'MINDER TRAINING, BLIJFT OP PEIL', 960, 762, 1, C.text2, 'center', 22); });
    // het idee: alles tegelijk = halve prikkel + vermoeidheid
    const Id = q.on('idee', 1, 0.5) * (1 - q.on('Welke', 1, 0.5)); SP4_laag(ctx, Id, () => { SP4_kaart(ctx, 300, 540, 1320, 320, 1, C.koraal);
      SP4_meta(ctx, 'IDEE: ALLES TEGELIJK VOL', 340, 590, 1, C.koraal, 'left', 26); const h = 0.5 * ramp(t, q.at('alles', 1), 1.2);
      ['SNELHEID', 'KRACHT', 'DUUR'].forEach((s, i) => { const kl = [C.goud, C.oker, C.groen][i]; metaText(ctx, s, 340, 660 + i * 66, kl, 'left', 22); roundRect(ctx, 520, 632 + i * 66, 520, 38, 8); shape(ctx, rgba('#FFFFFF', 0.08), C.line, 1.5);
        if (h > 0.01) { roundRect(ctx, 520, 632 + i * 66, 520 * h, 38, 8); shape(ctx, kl, null); } });
      SP4_meta(ctx, 'HALVE PRIKKEL', 780, 850, q.on('halve', 1, 0.4), C.text, 'center', 22);
      const v = 0.15 + 0.8 * ramp(t, q.at('stapelt', 1), 2.5); metaText(ctx, 'VERMOEIDHEID', 1340, 620, C.koraal, 'center', 22); roundRect(ctx, 1300, 640, 80, 200, 10); shape(ctx, rgba('#FFFFFF', 0.06), C.line, 2);
      roundRect(ctx, 1300, 840 - 200 * v, 80, 200 * v, 10); shape(ctx, C.koraal, null); SP4_meta(ctx, 'ISSURIN 2010', 1590, 590, 1, C.grain, 'right', 20); });
    // twee verschillende plannen met een vraagteken
    SP4_laag(ctx, q.on('Welke', 1, 0.5), () => { const plan = (y, d, lab) => { metaText(ctx, lab, 330, y + 32, C.text2, 'left', 22); let x = 520; d.forEach(([n, kl]) => { roundRect(ctx, x, y, n * 46 - 6, 48, 8); shape(ctx, kl, null); x += n * 46; }); };
      plan(600, [[8, C.groen], [6, C.oker], [6, C.goud]], 'PLAN A'); plan(700, [[6, C.groen], [4, C.oker], [3, C.goud], [3, C.oker], [4, C.goud]], 'PLAN B');
      vraagteken(ctx, 1560, 720, 1, 120); SP4_meta(ctx, 'NOG NIET MET PROEVEN VASTGESTELD', 960, 830, q.on('vastgesteld', 1, 0.4), C.text, 'center', 24); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const BW = 250, BH = 140, Y0 = 250, xs = i => 160 + i * 300;
    SP4_banenLegenda(ctx, 0, 0, 0, 0);
    const lab = ['WEEK 20', 'WEEK 21', 'WEEK 22', 'WEEK 23', 'TOERNOOI'];
    for (let i = 0; i < 5; i++) { SP4_badje(ctx, xs(i), Y0, BW, BH, i < 4 ? 2 : -1, 1); SP4_mono(ctx, lab[i], xs(i) + BW / 2, Y0 - 24, 20, i === 4 ? C.goud : C.text2, 'center'); }
    // vlag
    SP4_laag(ctx, q.on('toernooi', 1, 0.5), () => { const x = xs(4) + BW - 30; ctx.fillStyle = '#C9CED6'; ctx.fillRect(x, Y0 - 140, 6, 160); ctx.beginPath(); ctx.moveTo(x + 6, Y0 - 140); ctx.lineTo(x + 96, Y0 - 115); ctx.lineTo(x + 6, Y0 - 90); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); });
    // afbouw: drie weken
    SP4_laag(ctx, q.on('Drie', 1, 0.5), () => { const xa = xs(1), xb = xs(3) + BW; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xa, Y0 - 50); ctx.lineTo(xa, Y0 - 64); ctx.lineTo(xb, Y0 - 64); ctx.lineTo(xb, Y0 - 50); ctx.stroke(); tag(ctx, 'DRIE WEKEN AFBOUWEN', (xa + xb) / 2, Y0 - 84, C.teal, 1, 'center', 28); });
    // meters per week en tempo
    const M = q.on('minder', 1, 1.6), Hf = q.on('helft', 1, 1.0), mt = [1, lerp(1, 0.75, M), lerp(1, lerp(0.75, 0.55, Hf), M), lerp(1, lerp(0.75, 0.42, Hf), M)];
    metaText(ctx, 'METERS', 120, 470, C.text2, 'left', 24); metaText(ctx, 'TEMPO', 120, 780, C.text2, 'left', 24);
    for (let i = 0; i < 4; i++) { const x = xs(i) + 60, hh = 220 * mt[i]; roundRect(ctx, x, 720 - 220, 130, 220, 8); shape(ctx, rgba('#FFFFFF', 0.05), C.line, 1.5); roundRect(ctx, x, 720 - hh, 130, hh, 8); shape(ctx, rgba(C.teal, 0.85), null);
      SP4_meta(ctx, Math.round(mt[i] * 100) + ' %', x + 65, 490, M > 0.05 && i > 0 ? 1 : (i === 0 ? 1 : 0), C.text, 'center', 22);
      const T = q.on('wedstrijdtempo', 1, 0.5); roundRect(ctx, xs(i) + 30, 790, 190, 30, 8); shape(ctx, rgba('#FFFFFF', 0.05), C.line, 1.5); roundRect(ctx, xs(i) + 30, 790, 190 * (0.9), 30, 8); shape(ctx, rgba(C.goud, 0.35 + 0.6 * T), null); }
    SP4_meta(ctx, 'VAAK DE HELFT OF MINDER', xs(3) + BW + 40, 500, q.on('helft', 1, 0.5), C.teal, 'left', 22);
    SP4_meta(ctx, 'WEDSTRIJDTEMPO', xs(3) + BW + 40, 812, q.on('wedstrijdtempo', 1, 0.5), C.goud, 'left', 22);
    SP4_tijdbord(ctx, 1420, 580, 420, 130, '100 M', '?', q.on('tijd', 1, 0.4), C.goud); },

  s15(ctx, t, q) { bg(ctx, 'schema'); SP4_antw(ctx, 'antwoord c: zijn tijd wordt korter', 1);
    const B = q.on('Bij', 1, 0.6);
    SP4_laag(ctx, 1 - B, () => { const k = ramp(t, q.at('korter', 1), 1.4), s = 60 - 1.3 * k; const tijd = s >= 60 ? '1:00,0' : s.toFixed(1).replace('.', ',');
      SP4_tijdbord(ctx, 120, 230, 560, 200, 'TIJD 100 M', tijd, 1, k > 0.5 ? C.groen : '#F2C94C');
      SP4_begrip(ctx, 'TAPEREN', 'MINDER METERS, WEL WEDSTRIJDTEMPO', 400, 480, 620, q.on('taperen', 1, 0.5), C.teal);
      const I = q.on('idee', 1, 0.5); SP4_laag(ctx, I, () => { tag(ctx, 'IDEE', 1280, 250, C.goud, 1, 'center', 30); const u = ramp(t, q.at('vermoeidheid', 1), 2.8);
        const bar = (y, lab, kl, v) => { metaText(ctx, lab, 900, y - 14, kl, 'left', 24); roundRect(ctx, 900, y, 760, 50, 10); shape(ctx, rgba('#FFFFFF', 0.06), C.line, 1.5); roundRect(ctx, 900, y, 760 * v, 50, 10); shape(ctx, kl, null); };
        bar(340, 'VERMOEIDHEID', C.koraal, lerp(0.85, 0.2, u)); bar(470, 'FITHEID', C.groen, lerp(0.85, 0.78, u)); SP4_meta(ctx, 'IN DE DRIE WEKEN AFBOUWEN', 1280, 580, 1, C.text2, 'center', 22); }); });
    SP4_laag(ctx, B, () => { SP4_meta(ctx, 'SYDNEY 2000', 960, 210, q.on('Sydney', 1, 0.4), C.goud, 'center', 30);
      const V = q.on('vergeleken', 1, 0.5); SP4_laag(ctx, V, () => { SP4_kaart(ctx, 360, 250, 480, 100, 1, C.line); text(ctx, 'wedstrijd', 600, 300, fTekst(36, 700), C.text, 'center'); SP4_meta(ctx, 'DRIE WEKEN EERDER', 600, 336, 1, C.text2, 'center', 22);
        pijl(ctx, 870, 300, 1050, 300, C.goud, 1, 5, 20); SP4_kaart(ctx, 1080, 250, 480, 100, 1, C.goud); text(ctx, 'Spelen', 1320, 300, fTekst(36, 700), C.goud, 'center'); SP4_meta(ctx, 'OLYMPISCHE TIJD', 1320, 336, 1, C.text2, 'center', 22); });
      const N = q.on('negenennegentig', 1, 0.6), G = q.on('eenennegentig', 1, 0.8);
      SP4_laag(ctx, N, () => { for (let i = 0; i < 99; i++) { const c = i % 11, r = Math.floor(i / 11); circ(ctx, 330 + c * 42, 420 + r * 42, 15, i < 91 && G > (i / 91) ? C.goud : '#4A5468'); }
        SP4_meta(ctx, '99 RACES', 540, 818, 1, C.text2, 'center', 22); SP4_meta(ctx, '91 SNELLER', 540, 852, G, C.goud, 'center', 22); });
      SP4_laag(ctx, q.on('procent', 1, 0.4), () => text(ctx, '± 2 %', 1000, 520, fTekst(110, 800), C.goud, 'left'));
      SP4_laag(ctx, q.on('Daarin', 1, 0.4), () => { tag(ctx, 'AFBOUWEN', 1090, 610, C.teal, 1, 'center', 28); text(ctx, '+', 1250, 612, fTekst(48, 800), C.text, 'center'); tag(ctx, 'SPANNING', 1420, 610, C.koraal, q.on('spanning', 1, 0.4), 'center', 28); });
      SP4_laag(ctx, q.on('Op', 1, 0.5), () => { SP4_kaart(ctx, 1000, 680, 700, 110, 1, C.goud); text(ctx, '100 m: ± 1 seconde', 1350, 748, fTekst(46, 800), C.text, 'center'); });
      SP4_meta(ctx, 'MUJIKA E.A. 2002 · SYDNEY 2000', 1880, 860, q.on('vergeleken', 1, 0.4), C.grain, 'right', 22); }); },

  // ---------- H4 Herstel hoort bij de training ----------
  s16(ctx, t, q) { const Sl = q.on('Slaap', 1, 0.6);
    if (Sl < 1) { bg(ctx, 'schema'); SP4_laag(ctx, 1 - Sl, () => { const v = q.on('vierde', 1, 0.5);
      SP4_doelBord(ctx, 160, 200, 680, 620, [0.6, 0.6, 0.6, 0.6 * ramp(t, q.at('herstel', 1), 1)], 1, { n: 4, vierde: v, kop: 'HET PLAN' });
      const U = q.on('uren', 1, 0.5); SP4_laag(ctx, U, () => { const y = 430; roundRect(ctx, 960, y, 220, 90, 12); shape(ctx, rgba(C.oker, 0.85), null); metaText(ctx, 'TRAINING', 1070, y + 56, '#0D1420', 'center', 24);
        roundRect(ctx, 1200, y, 420 * ramp(t, q.at('uren', 1), 1.2), 90, 12); shape(ctx, rgba(C.teal, 0.85), null); SP4_meta(ctx, 'HERSTEL: UREN EN DAGEN', 1410, y + 56, ramp(t, q.at('uren', 1) + 0.6, 0.4), '#0D1420', 'center', 22);
        pijl(ctx, 1640, y + 80, 1740, y - 40, C.groen, ramp(t, q.at('training', 1), 0.5), 6, 22); SP4_meta(ctx, 'STERKER', 1740, y - 60, ramp(t, q.at('training', 1), 0.5), C.groen, 'center', 26); });
      SP4_meta(ctx, 'HERSTEL STAAT IN HET PLAN', 1340, 660, q.on('Daarom', 1, 0.4), C.teal, 'center', 26); }); }
    if (Sl <= 0.01) return; SP4_laag(ctx, Sl, () => { SP4_kamer(ctx); SP4_bed(ctx, 'sam', 360, 765, 430, { t });
      SP4_nachtkastje(ctx, 1080, 670, 320); SP4_wekker(ctx, 1160, 668, q.on('Vroege', 1, 0.4)); SP4_bord(ctx, 1290, 664, q.on('eten', 1, 0.4)); SP4_bidon(ctx, 1370, 668, q.on('drinken', 1, 0.4));
      SP4_meta(ctx, 'WALSH E.A. 2021', 1880, 860, q.on('Experts', 1, 0.4), C.grain, 'right', 22);
      tag(ctx, 'MEER SLAAP NODIG?', 760, 300, C.teal, SP4_fase(t, q.at('Experts', 1), q.at('Vroege', 1) + 0.3), 'center', 30);
      tag(ctx, 'VROEG OP = MINDER SLAAP', 760, 300, C.koraal, SP4_fase(t, q.at('Vroege', 1), q.at('lichaam', 1) + 0.3), 'center', 30);
      tag(ctx, 'GENOEG ETEN EN DRINKEN', 760, 300, C.groen, SP4_fase(t, q.at('lichaam', 1), q.at('vaste', 1) + 0.3), 'center', 30);
      SP4_week(ctx, 1250, 470, 70, q.on('rustdag', 1, 0.5), { rust: 6, kop: 'ELKE WEEK EEN RUSTDAG' }); }); },

  s17(ctx, t, q) { SP4_hal(ctx, { t });
    SP4_tijdbord(ctx, 1180, 110, 600, 180, '100 M VRIJ', '1:02,4', q.on('trager', 1, 0.4), C.koraal);
    SP4_meta(ctx, 'EERDER 1:00,4', 1780, 330, q.on('trager', 1, 0.4), C.text2, 'right', 24);
    SP4_sam(ctx, 620, t, { uit: q.on('slaapt', 1) > 0.5 ? 'moe' : 'bezorgd', kijk: 1 });
    wolk(ctx, 760, 150, 360, 110, 'slecht geslapen', q.on('slaapt', 1, 0.4), '#F2F2EE', 32);
    wolk(ctx, 820, 300, 300, 100, 'geen zin', q.on('nergens', 1, 0.4), '#F2F2EE', 32);
    vraagteken(ctx, 1480, 600, q.on('verstandig', 1, 0.4), 120); },

  s19(ctx, t, q) { const B = q.on('Langdurig', 1, 0.6), Cc = q.on('Zulke', 1, 0.6);
    if (B < 1) { SP4_hal(ctx, { t }); SP4_laag(ctx, 1 - B, () => { SP4_trainer(ctx, 700, t, { kijk: 1, uit: 'praat', pose: 'wijs' }); SP4_sam(ctx, 1040, t, { kijk: -1, uit: 'neutraal' });
      tag(ctx, 'MINDER TRAINEN', 870, 250, C.teal, q.on('minder', 1, 0.4), 'center', 32); tag(ctx, 'BESPREKEN MET TRAINER EN SPORTARTS', 870, 330, C.goud, q.on('bespreken', 1, 0.4), 'center', 30); }); }
    if (B > 0.01 && Cc < 1) SP4_laag(ctx, B * (1 - Cc), () => { bg(ctx, 'schema');
      const g = [{ s: 'TRAINING', a: 1 }, { s: 'SCHOOL', a: q.on('school', 1, 0.5) }, { s: 'WEINIG SLAAP', a: q.on('slaap', 1, 0.5) }, { s: 'TE WEINIG ETEN', a: q.on('eten', 1, 0.5) }, { s: 'EXTRA TRAINEN', a: q.on('Extra', 1, 0.5), kl: C.koraal }];
      const kant = 0.04 + g.slice(1).reduce((s, x) => s + 0.06 * x.a, 0);
      SP4_balans(ctx, 860, 300, kant, g, 1);
      SP4_begrip(ctx, 'OVERTRAINING', 'BELASTING EN HERSTEL NIET IN BALANS', 1500, 560, 700, q.on('overtraining', 1, 0.5), C.koraal);
      kruis(ctx, 230, 360, 26, q.on('erger', 1, 0.4)); SP4_meta(ctx, 'MAAKT HET ERGER', 230, 420, q.on('erger', 1, 0.4), C.koraal, 'center', 22);
      SP4_laag(ctx, q.on('één', 1, 0.5), () => { SP4_week(ctx, 1260, 720, 52, 1, { alles: true, kop: 'ÉÉN WEEK RUST' }); kruis(ctx, 1710, 750, 24, q.on('snel', 1, 0.4)); });
      tag(ctx, 'WEKEN → MAANDEN', 1740, 850, C.teal, q.on('weken', 1, 0.4), 'center', 30); });
    if (Cc > 0.01) SP4_laag(ctx, Cc, () => { SP4_hal(ctx, { t }); const Ar = SP4_fase(t, q.at('andere', 1), q.at('trainer', 2) + 0.4, 0.3);
      SP4_trainer(ctx, 560, t, { kijk: 1, uit: q.on('trainer', 2) > 0.5 ? 'praat' : 'neutraal', pose: 'staan' });
      persoon(ctx, 'kim', 820, SP4_GROND, 430, { t, kijk: 1, uit: 'blij', a: Ar });
      SP4_meta(ctx, 'SPORTARTS', 820, 380, Ar, C.text2, 'center', 24);
      SP4_sam(ctx, 1100, t, { kijk: -1, uit: 'neutraal' });
      SP4_logboek(ctx, 1340, 300, q.on('trainer', 2, 0.5), ramp(t, q.at('snel', 2), 2.0));
      SP4_meta(ctx, 'MEEUSEN E.A. 2013', 1880, 860, 1, C.grain, 'right', 22); });
    SP4_antw(ctx, 'antwoord b: minder trainen en het bespreken', 1); },

  // ---------- Recap ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('Deels', 1, 1.0);
    // klembord met vier balken → jaarplan
    SP4_laag(ctx, 1 - D, () => SP4_doelBord(ctx, 560, 180, 800, 640, [0.7, 0.7, 0.7, 0.7], 1, { n: 4, kop: 'HET PLAN' }));
    SP4_laag(ctx, D, () => { metaText(ctx, 'JAARPLAN', 120, 150, C.text2, 'left', 26); const seg = [[8, C.groen, 'BASIS'], [6, C.oker, 'KRACHT'], [6, C.goud, 'SNELHEID'], [3, C.teal, 'AF'], [1, C.goud, '']]; let x = 120;
      seg.forEach(([n, kl, s], i) => { const w = n * 56 - 6; roundRect(ctx, x, 180, w * ramp(t, q.at('Deels', 1) + i * 0.15, 0.4), 70, 10); shape(ctx, kl, null); if (s) metaText(ctx, s, x + w / 2, 226, '#0D1420', 'center', 22); x += n * 56; });
      ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 40, 150, 5, 110); ctx.beginPath(); ctx.moveTo(x - 35, 150); ctx.lineTo(x + 25, 166); ctx.lineTo(x - 35, 182); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); });
    const kaartjes = [['HELPEN: AEROBE BASIS → HERSTEL', C.groen, 'helpen'], ['BOTSEN: VOORAL EXPLOSIEVE KRACHT', C.koraal, 'remmen'], ['BLOKKEN + AFBOUWEN', C.goud, 'blok'], ['HERSTEL HOORT ERBIJ', C.teal, 'winst']];
    kaartjes.forEach(([s, kl, cue], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; SP4_laag(ctx, a, () => { const y = 320 + i * 132; roundRect(ctx, 120, y, 1140, 104, 16); shape(ctx, rgba('#0D1420', 0.9), kl, 3); metaText(ctx, s, 160, y + 64, kl, 'left', 30); }); });
    SP4_laag(ctx, D, () => { SP4_blok(ctx, 1600, SP4_GROND, 1.25, '4'); SP4_sam(ctx, 1600, t, { y: SP4_GROND - 228, uit: 'blij', h: 420 }); }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 460, 100, 640, 100, 16); shape(ctx, rgba('#0D1420', 0.88), null); regel(ctx, 'Waar leer je dit?', 490, 170, 1, C.text, 56, 'left', 700); metaText(ctx, '2026', 1060, 166, C.grain, 'right', 28);
    const rij = [['diploma', 'Trainer-coach', 'LANDELIJKE KWALIFICATIES · NOC*NSF', 'Trainersdiploma', C.goud], ['hbo', 'Sportkunde', 'BV. NIJMEGEN · VAAK SPORTTRAINER', 'Sportkunde', C.groen], ['wo', 'Bewegingswetenschappen', 'VU AMSTERDAM · GRONINGEN', 'Bewegingswetenschappen', C.teal]];
    rij.forEach(([n, o, m, cue, kl], i) => { const a = q.on(cue, 1, 0.5); if (a <= 0.01) return; SP4_laag(ctx, a, () => { const y = 240 + i * 170;
      roundRect(ctx, 460, y, 1000, 140, 18); shape(ctx, rgba('#0D1420', 0.92), kl, 2); text(ctx, n, 500, y + 66, fTitel(40), kl); text(ctx, o, 700, y + 66, fTekst(40, 700), C.text); metaText(ctx, m, 700, y + 112, C.grain, 'left', 24); }); });
    SP4_trainer(ctx, 230, t, { uit: 'blij', kijk: 1 }); SP4_meta(ctx, 'ZWEMTRAINER', 230, 380, q.on('zwemtrainer', 1, 0.4), C.text2, 'center', 22);
    SP4_lab(ctx, 1380, 640, q.on('Proeven', 1, 0.5), t);
    persoon(ctx, 'passant', 1810, SP4_GROND, 430, { t, kijk: -1, uit: 'blij', outfit: 'lab', a: q.on('Proeven', 1, 0.4) });
    SP4_meta(ctx, 'INSPANNINGSFYSIOLOOG', 1890, 340, q.on('inspanningsfysiologen', 1, 0.4), C.text2, 'right', 22); }
});
// vaste legenda van de banen links naast de rij baden (s12)
function SP4_banenLegenda(ctx, x, y, h, a = 1) { if (a <= 0.01 || h <= 0) return; ctx.save(); ctx.globalAlpha *= a; const bh = h / 3;
  SP4_BANEN.forEach(([s, kl], i) => metaText(ctx, s, x + 210, y + i * bh + bh / 2 + 8, C[kl], 'right', 22)); ctx.restore(); }
