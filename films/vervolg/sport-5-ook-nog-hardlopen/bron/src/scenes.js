
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
// castboek heeft circ() nodig
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// ===== Anatomie — realistisch lichaam met organen (21 okt 2026) =====
// Vervangt het oude 'poppetje' (rond hoofd, blokkenlijf) in lichaamskaarten. Vooraanzicht van een tiener,
// echte verhoudingen (hoofd = 1/7,3 van de lengte), organen op hun echte plek (hart en maag links in het lichaam
// = rechts in beeld, lever rechts in het lichaam = links in beeld).
// Gebruik: zet BODY = {cx, yb, h} (midden, voeten, lengte) en roep bodyOrgans({...}) aan, zelfde sleutels als vroeger:
//   sil (lichaam), zenuw, spijs, adem, bloed, uitsch, skelet, spier, afweer, hormoon, voortpl (0..1), t, beat, breath
// Losse organen (met gloed als ze oplichten): liver, pancreas, mouth, skull, skin, eyes, nose, testes, spleen.
// AP(x,y): hoofdhoogte-coördinaten (x vanaf het midden, y vanaf de kruin, voeten op 7,3) → pixels.

const ANA = { huid:'#D9A982', huidS:'#BF8C66', haar:'#4A2E1E', ink:'#3A2418', short:'#3F5F86',
  brein:'#E7B2BC', breinS:'#C98C99', long:'#E8A2A8', longS:'#C9787F', hart:'#B8333B', hartL:'#D9555B',
  slag:'#D04A44', ader:'#5677C2', lever:'#8E3B32', leverL:'#A84E43', gal:'#6E9A4A', maag:'#E39C8A', maagS:'#C67D6C',
  darm:'#EDB79F', darmS:'#C98C74', dik:'#D9967A', dikS:'#B67459', alv:'#E9C27E', milt:'#7D3A52', nier:'#9B3D3A', nierL:'#B85450',
  blaas:'#E6C878', urine:'#F0D66A', bot:'#ECE5D3', botS:'#BDB49E', spier:'#B9524C', spierL:'#D47A70', zenuw:'#B79AE6', lymf:'#7CC48A',
  klier:'#E8B84A', baar:'#D9868A', slok:'#D98C80', lucht:'#E6D3C3' };
const AN_H = 7.3;
function AB(){ const HH=BODY.h/AN_H; return { HH, top:BODY.yb-BODY.h, cx:BODY.cx }; }
function AP(x,y){ const b=AB(); return [b.cx+x*b.HH, b.top+y*b.HH]; }
function APs(pts){ return pts.map(p=>AP(p[0],p[1])); }
function AHH(){ return AB().HH; }
// vloeiend pad door punten (Catmull-Rom → Bézier)
function anPath(ctx,P,closed=true){ const n=P.length; ctx.beginPath(); ctx.moveTo(P[0][0],P[0][1]); const N=closed?n:n-1;
  for(let i=0;i<N;i++){ const p0=P[(i-1+n)%n], p1=P[i], p2=P[(i+1)%n], p3=P[(i+2)%n]; const a0=(!closed&&i===0)?p1:p0, a3=(!closed&&i===n-2)?p2:p3;
    ctx.bezierCurveTo(p1[0]+(p2[0]-a0[0])/6, p1[1]+(p2[1]-a0[1])/6, p2[0]-(a3[0]-p1[0])/6, p2[1]-(a3[1]-p1[1])/6, p2[0], p2[1]); }
  if(closed) ctx.closePath(); }
// rechterhelft (x ≥ 0, van boven naar beneden) → hele omtrek, gespiegeld
function anSym(R){ const L=R.slice().reverse().filter(p=>p[0]!==0).map(p=>[-p[0],p[1]]); return R.concat(L); }
function anMir(pts,s){ return pts.map(p=>[p[0]*s,p[1]]); }
function anGlow(color,g){ if(g>0.01){ ctx.shadowColor=color; ctx.shadowBlur=26*g; } }
function anShape(pts,fill,stroke,lw=1.5,closed=true,glow=0){ ctx.save(); anGlow(fill,glow); anPath(ctx,APs(pts),closed); ctx.fillStyle=fill; ctx.fill(); ctx.shadowBlur=0; if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } ctx.restore(); }
function anLine(pts,color,w,closed=false,dash=null){ ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); anPath(ctx,APs(pts),closed); ctx.stroke(); ctx.restore(); }
// punt op een polylijn (in px) op fractie u, met lengtes
function anAlong(P,u){ let L=0; const seg=[]; for(let i=1;i<P.length;i++){ const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]); seg.push(d); L+=d; }
  let r=clamp(u,0,1)*L; for(let i=0;i<seg.length;i++){ if(r<=seg[i]||i===seg.length-1){ const k=seg[i]?Math.min(1,r/seg[i]):0; return [lerp(P[i][0],P[i+1][0],k), lerp(P[i][1],P[i+1][1],k)]; } r-=seg[i]; } return P[P.length-1]; }
// dichte versie van een vloeiend pad (voor bewegende deeltjes)
function anDense(pts,n=60){ const P=APs(pts), out=[]; const m=P.length; for(let i=0;i<m-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(m-1,i+2)];
  for(let k=0;k<n/m+2;k++){ const s=k/(n/m+2); const s2=s*s, s3=s2*s; const f=(a,b,c,d)=>0.5*((2*b)+(-a+c)*s+(2*a-5*b+4*c-d)*s2+(-a+3*b-3*c+d)*s3); out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])]); } } out.push(P[m-1]); return out; }

// ---------- het lichaam zelf ----------
const AN_BODY=[[0.15,0.9],[0.17,1.16],[0.3,1.3],[0.6,1.37],[0.86,1.45],[0.99,1.6],[1.06,1.9],[1.1,2.35],[1.14,2.8],[1.2,3.2],[1.25,3.65],[1.27,3.98],[1.33,4.2],[1.34,4.46],[1.27,4.66],[1.17,4.63],[1.12,4.38],[1.09,4.05],[1.03,3.62],[0.97,3.18],[0.93,2.82],[0.89,2.35],[0.85,2.02],[0.79,1.88],[0.73,2.05],[0.7,2.55],[0.63,2.98],[0.68,3.35],[0.76,3.72],[0.75,4.25],[0.66,4.85],[0.56,5.28],[0.57,5.55],[0.6,5.92],[0.52,6.45],[0.42,6.92],[0.48,7.1],[0.47,7.3],[0.2,7.3],[0.17,7.08],[0.22,6.9],[0.16,6.35],[0.13,5.85],[0.13,5.3],[0.1,4.8],[0.07,4.3],[0,4.04]];
const AN_HEAD=[[0,-0.01],[0.22,0.03],[0.36,0.18],[0.39,0.42],[0.36,0.66],[0.28,0.86],[0.14,0.98],[0,1.01]];
const AN_TRUNK=[[0,1.36],[0.55,1.5],[0.64,2.1],[0.6,2.95],[0.65,3.5],[0.45,3.9],[0,3.98]];
function anFigure(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  const body=APs(anSym(AN_BODY)), head=APs(anSym(AN_HEAD));
  // lijf: schaduwtint, dan de lichte kant er bovenop (licht van links)
  const fillBody=(col,dx)=>{ ctx.save(); ctx.translate(dx,0); anPath(ctx,body); ctx.fillStyle=col; ctx.fill(); anPath(ctx,head); ctx.fill(); ctx.restore(); };
  fillBody(ANA.huidS,0); ctx.save(); anPath(ctx,body); ctx.clip(); fillBody(ANA.huid,-0.07*HH); ctx.restore();
  ctx.save(); anPath(ctx,head); ctx.clip(); fillBody(ANA.huid,-0.06*HH); ctx.restore();
  // oren
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.385,0.53); ctx.beginPath(); ctx.ellipse(ex,ey,0.06*HH,0.12*HH,0,0,6.283); ctx.fillStyle=s<0?ANA.huid:ANA.huidS; ctx.fill(); }
  // kaaklijn-schaduw, sleutelbeenderen, navel, knieën (zachte lijntjes)
  ctx.save(); ctx.globalAlpha*=0.5; anShape([[-0.2,1.0],[0,1.08],[0.2,1.0],[0.17,1.12],[0,1.17],[-0.17,1.12]],ANA.huidS,null);
  anLine([[-0.62,1.42],[-0.3,1.47],[-0.08,1.43]],ANA.huidS,0.025*HH); anLine([[0.62,1.42],[0.3,1.47],[0.08,1.43]],ANA.huidS,0.025*HH);
  const [nx,ny]=AP(0,3.12); dot(ctx,nx,ny,0.03*HH,ANA.huidS);
  for(const s of [-1,1]) anLine([[s*0.24,5.2],[s*0.33,5.27],[s*0.42,5.2]],ANA.huidS,0.02*HH); ctx.restore();
  // zwembroek
  const SH=[[0,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.13,4.36],[0.09,4.12],[0,4.07]];
  ctx.save(); anPath(ctx,body); ctx.clip(); anShape(anSym(SH),ANA.short,null); ctx.globalAlpha*=0.35; anShape([[0.45,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.5,4.34]],'#1E2E44',null); ctx.restore();
  // haar
  const HR=[[0,-0.07],[0.24,-0.04],[0.4,0.12],[0.43,0.34],[0.39,0.47],[0.36,0.3],[0.3,0.22],[0.22,0.25],[0.16,0.19],[0.08,0.24],[0,0.2]];
  anShape(anSym(HR),ANA.haar,null); ctx.save(); ctx.globalAlpha*=0.35; anLine([[-0.1,0.0],[0.05,0.08],[0.2,0.04]],'#7A5236',0.02*HH); anLine([[0.12,-0.03],[0.28,0.06],[0.36,0.2]],'#7A5236',0.018*HH); ctx.restore();
  // gezicht (iets sterker dan het lijf, zodat het een mens blijft)
  ctx.save(); ctx.globalAlpha=Math.min(1,ctx.globalAlpha*1.6);
  for(const s of [-1,1]){ const [bx,by]=AP(s*0.15,0.4); ctx.strokeStyle=ANA.haar; ctx.lineWidth=0.03*HH; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx-s*0.07*HH,by+0.01*HH); ctx.quadraticCurveTo(bx,by-0.025*HH,bx+s*0.07*HH,by+0.005*HH); ctx.stroke();
    const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.072*HH,0.042*HH,0,0,6.283); ctx.fillStyle='#FBF7F0'; ctx.fill(); dot(ctx,ex+0.008*HH,ey,0.034*HH,'#5A3A26'); dot(ctx,ex+0.008*HH,ey,0.018*HH,'#1E140E'); dot(ctx,ex+0.02*HH,ey-0.012*HH,0.009*HH,'#FFFFFF');
    const [cx2,cy2]=AP(s*0.24,0.7); dot(ctx,cx2,cy2,0.06*HH,rgba('#E07A5F',0.18)); }
  ctx.strokeStyle=ANA.huidS; ctx.lineWidth=0.022*HH; ctx.lineCap='round'; const [n1x,n1y]=AP(0.02,0.55), [n2x,n2y]=AP(0.05,0.69); ctx.beginPath(); ctx.moveTo(n1x,n1y); ctx.quadraticCurveTo(n2x+0.02*HH,n2y-0.04*HH,n2x,n2y); ctx.lineTo(n2x-0.07*HH,n2y+0.005*HH); ctx.stroke();
  const [mx,my]=AP(0,0.81); ctx.strokeStyle='#A85E50'; ctx.lineWidth=0.028*HH; ctx.beginPath(); ctx.moveTo(mx-0.1*HH,my-0.01*HH); ctx.quadraticCurveTo(mx,my+0.05*HH,mx+0.1*HH,my-0.01*HH); ctx.stroke();
  ctx.restore(); ctx.restore(); }
// lichaamsholte: iets donkerder in de romp, zodat organen eruit springen
function anCavity(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a*0.6; ctx.filter='blur('+Math.round(0.08*AHH())+'px)'; anShape(anSym(AN_TRUNK),'#1A1220',null); ctx.restore(); }

// ---------- skelet ----------
function anBone(x1,y1,x2,y2,w,a=1){ const HH=AHH(); const [p,q]=[AP(x1,y1),AP(x2,y2)]; ctx.save(); ctx.globalAlpha*=a; ctx.lineCap='round';
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=w*HH+3; ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke();
  ctx.strokeStyle=ANA.bot; ctx.lineWidth=w*HH; ctx.stroke(); for(const e of [p,q]){ ctx.beginPath(); ctx.arc(e[0],e[1],w*HH*0.95,0,6.283); ctx.fillStyle=ANA.bot; ctx.fill(); ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; ctx.stroke(); } ctx.restore(); }
function anSkeleton(a,o={}){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  if(o.schedel!==false) anSkull(1,0);
  // wervelkolom
  for(let i=0;i<24;i++){ const y=1.05+i*0.118; const w=(i<7?0.05:i<19?0.06:0.075); const [x0,y0]=AP(-w,y); roundRect(ctx,x0,y0,2*w*HH,0.085*HH,0.02*HH); shape(ctx,ANA.bot,ANA.botS,1); }
  // bekken
  for(const s of [-1,1]) anShape([[s*0.08,3.42],[s*0.4,3.2],[s*0.66,3.28],[s*0.64,3.55],[s*0.48,3.72],[s*0.32,3.92],[s*0.06,3.98],[s*0.1,3.78]],ANA.bot,ANA.botS,1.2);
  anShape([[-0.1,3.4],[0.1,3.4],[0.07,3.75],[0,3.85],[-0.07,3.75]],ANA.botS,null);
  // ribbenkast + borstbeen + sleutelbeenderen
  ctx.save(); ctx.lineCap='round'; for(let i=0;i<10;i++){ const y=1.58+i*0.105, w=0.42+Math.min(i,5)*0.045-Math.max(0,i-6)*0.02; for(const s of [-1,1]){ const P=APs([[s*0.06,y],[s*w*0.7,y-0.02],[s*w,y+0.12],[s*(w+0.02),y+0.28+i*0.01]]); ctx.strokeStyle=ANA.botS; ctx.lineWidth=0.05*HH; anPath(ctx,P,false); ctx.stroke(); ctx.strokeStyle=ANA.bot; ctx.lineWidth=0.034*HH; ctx.stroke(); } }
  anShape([[-0.06,1.48],[0.06,1.48],[0.05,2.3],[0,2.42],[-0.05,2.3]],ANA.bot,ANA.botS,1.2);
  for(const s of [-1,1]){ anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.botS,0.05*HH); anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.bot,0.034*HH); } ctx.restore();
  // armen en benen
  for(const s of [-1,1]){ anBone(s*0.88,1.55,s*1.03,2.82,0.07); anBone(s*1.04,2.92,s*1.16,3.98,0.045); anBone(s*1.0,2.92,s*1.1,3.98,0.04);
    for(let k=0;k<4;k++){ const fx=s*(1.15+k*0.035); anBone(s*1.17,4.05,fx,4.45+(k===1||k===2?0.05:0),0.022); }
    anBone(s*0.4,3.75,s*0.33,5.15,0.09); const [px2,py2]=AP(s*0.33,5.2); dot(ctx,px2,py2,0.07*HH,ANA.bot,ANA.botS,1.2);
    anBone(s*0.31,5.3,s*0.3,6.92,0.07); anBone(s*0.42,5.33,s*0.4,6.92,0.035);
    anShape([[s*0.24,6.98],[s*0.42,6.98],[s*0.47,7.22],[s*0.22,7.24]],ANA.bot,ANA.botS,1.2); }
  ctx.restore(); }
// schedel als losse laag (ook voor 'schedel'-label); g = gloed
function anSkull(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anShape(anSym([[0,0.0],[0.22,0.03],[0.35,0.17],[0.38,0.42],[0.33,0.63],[0.24,0.72],[0,0.74]]),ANA.bot,ANA.botS,1.5,true,g);
  anShape(anSym([[0,0.7],[0.24,0.7],[0.27,0.84],[0.18,0.98],[0,1.0]]),ANA.bot,ANA.botS,1.5);
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.1*HH,0.085*HH,0,0,6.283); ctx.fillStyle='#3A3442'; ctx.fill(); }
  anShape([[0,0.58],[0.05,0.68],[0,0.7],[-0.05,0.68]],'#3A3442',null);
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; for(let k=-3;k<=3;k++){ const [tx,ty]=AP(k*0.04,0.76); ctx.strokeRect(tx-0.018*HH,ty,0.036*HH,0.06*HH); }
  ctx.restore(); }

// ---------- spieren ----------
function anMuscle(pts,a=1,fib=null){ anShape(pts,ANA.spier,ANA.spierL,1.2); if(fib){ ctx.save(); ctx.globalAlpha*=0.45; fib.forEach(f=>anLine(f,ANA.spierL,1.2)); ctx.restore(); } }
function anMuscles(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ const M=p=>anMir(p,s);
    anMuscle(M([[0.06,1.55],[0.5,1.5],[0.78,1.62],[0.66,1.98],[0.3,2.12],[0.07,2.05]]),1,[M([[0.1,1.7],[0.6,1.68]]),M([[0.1,1.88],[0.62,1.82]])]); // borstspier
    anMuscle(M([[0.72,1.44],[0.92,1.48],[1.04,1.72],[0.98,2.05],[0.84,1.85]])); // schouder
    anMuscle(M([[0.9,2.0],[1.02,2.05],[1.08,2.5],[1.04,2.82],[0.94,2.75],[0.9,2.35]]),1,[M([[0.97,2.1],[1.0,2.75]])]); // biceps
    anMuscle(M([[0.97,2.92],[1.12,2.92],[1.2,3.35],[1.2,3.8],[1.12,3.8],[1.02,3.35]])); // onderarm
    anMuscle(M([[0.56,2.2],[0.66,2.6],[0.6,3.0],[0.62,3.35],[0.4,3.4],[0.42,2.7]])); // schuine buikspier
    anMuscle(M([[0.34,3.75],[0.72,3.8],[0.7,4.4],[0.56,5.05],[0.38,5.1],[0.3,4.5]]),1,[M([[0.45,3.9],[0.48,5.0]]),M([[0.6,3.95],[0.55,4.9]])]); // dijbeen
    anMuscle(M([[0.14,4.15],[0.3,4.3],[0.36,5.0],[0.2,4.95],[0.12,4.6]])); // binnenkant dij
    anMuscle(M([[0.42,5.35],[0.56,5.45],[0.6,5.9],[0.52,6.35],[0.44,6.1]])); // kuit
    anMuscle(M([[0.26,5.4],[0.34,5.38],[0.36,6.2],[0.3,6.6],[0.24,6.0]])); // scheenbeenspier
  }
  // rechte buikspier met 'blokjes'
  anMuscle([[-0.3,2.3],[0.3,2.3],[0.32,3.1],[0.24,3.75],[0,3.85],[-0.24,3.75],[-0.32,3.1]]);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0,2.3],[0,3.82]],ANA.spierL,2); [2.55,2.82,3.1].forEach(y=>anLine([[-0.3,y],[0.3,y+0.01]],ANA.spierL,2)); ctx.restore();
  ctx.restore(); }

// ---------- spijsvertering ----------
const AN_SLOK=[[0.0,0.92],[0.01,1.3],[0.02,1.9],[0.06,2.2],[0.12,2.37]];
const AN_MAAG=[[0.1,2.38],[0.26,2.29],[0.46,2.32],[0.58,2.47],[0.59,2.71],[0.48,2.89],[0.27,2.96],[0.06,2.91],[-0.07,2.82],[-0.06,2.74],[0.08,2.77],[0.22,2.74],[0.31,2.63],[0.27,2.49],[0.16,2.45]];
const AN_LEVER=[[-0.67,2.3],[-0.4,2.2],[-0.12,2.23],[0.08,2.27],[0.2,2.32],[0.06,2.42],[-0.1,2.52],[-0.34,2.67],[-0.58,2.7],[-0.69,2.55]];
const AN_ALV=[[-0.16,2.79],[-0.06,2.75],[0.18,2.72],[0.38,2.66],[0.52,2.64],[0.54,2.7],[0.38,2.75],[0.16,2.82],[-0.04,2.87],[-0.14,2.91]];
const AN_DIK=[[-0.44,3.72],[-0.5,3.42],[-0.52,3.05],[-0.46,2.84],[-0.22,2.98],[0.1,3.04],[0.38,2.92],[0.54,2.76],[0.57,3.05],[0.54,3.5],[0.42,3.8],[0.2,3.74],[0.07,3.82],[0.0,3.98]];
function anDunPts(){ const P=[[-0.06,2.76],[-0.18,2.84],[-0.2,3.02],[0.02,3.1]]; const rows=5; for(let r=0;r<rows;r++){ const y=3.16+r*0.1, dir=r%2?-1:1; for(let k=0;k<=6;k++){ const u=k/6; P.push([dir*(-0.34+0.68*u),y+Math.sin(u*Math.PI*3)*0.025]); } } P.push([-0.38,3.66],[-0.44,3.7]); return P; }
const AN_GUT=()=>{ const d=anDunPts(); return [[0,0.8],[0,0.95]].concat(AN_SLOK.slice(1)).concat([[0.25,2.47],[0.38,2.57],[0.36,2.75],[0.15,2.83]]).concat(d.slice(0)).concat(AN_DIK.slice(1)); };
function anTube(pts,w,col,colS,t=0,amp=0){ const HH=AHH(); const P=anDense(pts,Math.max(60,pts.length*10)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.strokeStyle=colS; ctx.lineWidth=w*HH+3; ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
  if(amp>0){ for(let i=1;i<P.length;i++){ const k=1+amp*Math.sin(i*0.35-t*4); ctx.strokeStyle=col; ctx.lineWidth=w*HH*k; ctx.beginPath(); ctx.moveTo(P[i-1][0],P[i-1][1]); ctx.lineTo(P[i][0],P[i][1]); ctx.stroke(); } }
  else { ctx.strokeStyle=col; ctx.lineWidth=w*HH; ctx.stroke(); }
  ctx.restore(); return P; }
function anDigest(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anTube(AN_SLOK,0.05,ANA.slok,'#A8625A');
  // dikke darm met haustra-insnoeringen
  const D=anTube(AN_DIK,0.12,ANA.dik,ANA.dikS,t,0.04); ctx.strokeStyle=ANA.dikS; ctx.lineWidth=1.5; for(let i=6;i<D.length-8;i+=6){ const p=D[i], q=D[i+1]; const dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy)||1; const nx=-dy/L*0.055*HH, ny=dx/L*0.055*HH; ctx.beginPath(); ctx.moveTo(p[0]-nx,p[1]-ny); ctx.lineTo(p[0]+nx,p[1]+ny); ctx.stroke(); }
  anLine([[-0.42,3.74],[-0.4,3.83],[-0.36,3.86]],ANA.dikS,0.035*HH); // blindedarm/appendix
  // dunne darm: kronkelende buis
  anTube(anDunPts(),0.065,ANA.darm,ANA.darmS,t,0.06);
  // maag met plooien
  anShape(AN_MAAG,ANA.maag,ANA.maagS,2); ctx.save(); ctx.globalAlpha*=0.5; anLine([[0.2,2.37],[0.38,2.45],[0.45,2.65]],ANA.maagS,1.5); anLine([[0.12,2.81],[0.3,2.8],[0.42,2.73]],ANA.maagS,1.5); ctx.restore();
  ctx.restore(); }
function liver(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_LEVER,ANA.lever,ANA.leverL,2,true,g); ctx.globalAlpha*=0.6; anLine([[0.05,2.26],[-0.02,2.4],[-0.1,2.54]],ANA.leverL,1.5); anShape([[-0.3,2.6],[-0.22,2.62],[-0.2,2.72],[-0.28,2.72]],ANA.gal,null); ctx.restore(); }
function pancreas(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_ALV,ANA.alv,'#C99E58',1.5,true,g); ctx.globalAlpha*=0.5; for(let k=0;k<7;k++){ const [x,y]=AP(-0.08+k*0.08,2.79-k*0.017); dot(ctx,x,y,1.8,'#C99E58'); } ctx.restore(); }
function spleen(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape([[0.5,2.46],[0.6,2.4],[0.68,2.53],[0.66,2.76],[0.57,2.76],[0.55,2.62]],ANA.milt,'#9A5470',1.5,true,g); ctx.restore(); }
function mouth(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.oker,a); const [x,y]=AP(0,0.82); ctx.beginPath(); ctx.ellipse(x,y,0.11*HH,0.045*HH,0,0,6.283); ctx.fillStyle='#7A2E30'; ctx.fill(); ctx.shadowBlur=0; ctx.beginPath(); ctx.ellipse(x,y+0.012*HH,0.06*HH,0.025*HH,0,0,6.283); ctx.fillStyle='#D9787A'; ctx.fill(); ctx.fillStyle='#F4EFE4'; ctx.fillRect(x-0.08*HH,y-0.045*HH,0.16*HH,0.022*HH); ctx.restore(); }

// ---------- ademhaling ----------
const AN_LONG_R=[[-0.24,1.48],[-0.42,1.6],[-0.6,1.9],[-0.69,2.24],[-0.7,2.5],[-0.55,2.5],[-0.34,2.42],[-0.14,2.36],[-0.1,2.15],[-0.11,1.8],[-0.16,1.56]];
const AN_LONG_L=[[0.24,1.48],[0.42,1.6],[0.6,1.9],[0.69,2.24],[0.7,2.52],[0.55,2.52],[0.38,2.46],[0.3,2.36],[0.2,2.22],[0.12,2.02],[0.12,1.76],[0.17,1.56]];
function anLungs(a,breath=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const k=1+0.06*Math.sin(breath);
  for(const [L,s] of [[AN_LONG_R,-1],[AN_LONG_L,1]]){ const [ox,oy]=AP(s*0.4,1.75); ctx.save(); ctx.translate(ox,oy); ctx.scale(k,1+0.07*Math.sin(breath)); ctx.translate(-ox,-oy);
    anShape(L,ANA.long,ANA.longS,2,true,g);
    ctx.save(); anPath(ctx,APs(L)); ctx.clip(); ctx.globalAlpha*=0.35; for(let i=0;i<40;i++){ const [x,y]=AP(s*(0.18+hash(i*3.1+s)*0.5),1.6+hash(i*5.7+s)*0.9); dot(ctx,x,y,1.6+hash(i)*2.2,ANA.longS); } ctx.restore();
    ctx.save(); ctx.globalAlpha*=0.7; s<0?anLine([[-0.68,2.05],[-0.4,2.15],[-0.2,2.3]],ANA.longS,1.5):anLine([[0.66,1.95],[0.4,2.15],[0.27,2.3]],ANA.longS,1.5); if(s<0) anLine([[-0.67,1.86],[-0.4,1.92]],ANA.longS,1.5); ctx.restore();
    // vertakkende luchtwegen
    ctx.save(); ctx.globalAlpha*=0.8; const b0=[s*0.06,1.85]; const tree=(p,ang,len,d)=>{ if(d>3) return; const q=[p[0]+Math.cos(ang)*len*s,p[1]+Math.sin(ang)*len]; anLine([p,q],ANA.lucht,(0.035-d*0.007)*HH); tree(q,ang-0.45,len*0.66,d+1); tree(q,ang+0.45,len*0.66,d+1); }; tree(b0,0.75,0.24,0); ctx.restore();
    ctx.restore(); }
  ctx.restore(); }
function anTrachea(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const [x0,y0]=AP(-0.035,1.02); ctx.fillStyle=ANA.lucht; roundRect(ctx,x0,y0,0.07*HH,0.84*HH,0.03*HH); ctx.fill(); ctx.strokeStyle='#BBA898'; ctx.lineWidth=1.2; for(let i=0;i<10;i++){ const [a1,b1]=AP(-0.035,1.08+i*0.08), [a2]=AP(0.035,0); ctx.beginPath(); ctx.moveTo(a1,b1); ctx.lineTo(a2,b1); ctx.stroke(); } ctx.restore(); }
function nose(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.teal,a); anLine([[0.04,0.68],[0.02,0.58],[-0.02,0.6],[-0.03,0.72],[-0.01,0.92],[0,1.05]],C.teal,0.04*HH); ctx.restore(); anTrachea(a); }

// ---------- bloed ----------
const AN_SLAG={ aorta:[[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.1,2.05],[0.06,2.4],[0.05,2.9],[0.04,3.38]],
  hals:s=>[[s*0.06,1.82],[s*0.09,1.4],[s*0.12,1.0],[s*0.2,0.78],[s*0.28,0.5],[s*0.24,0.28]],
  arm:s=>[[s*0.12,1.8],[s*0.42,1.58],[s*0.82,1.68],[s*0.92,2.2],[s*1.0,2.85],[s*1.08,3.42],[s*1.16,4.02],[s*1.26,4.48]],
  been:s=>[[s*0.04,3.38],[s*0.2,3.66],[s*0.34,3.96],[s*0.37,4.62],[s*0.34,5.22],[s*0.31,5.82],[s*0.3,6.52],[s*0.32,7.02],[s*0.4,7.22]],
  nier:s=>[[s*0.05,2.86],[s*0.26,2.86]] };
const AN_ADER={ hol:[[-0.09,2.06],[-0.09,1.74],[-0.12,1.4],[-0.16,0.98],[-0.24,0.7]], holO:[[-0.04,2.3],[-0.05,2.9],[-0.02,3.38]], hals2:[[0.12,1.74],[0.16,1.4],[0.18,0.98],[0.24,0.7]],
  arm:s=>[[s*0.1,1.74],[s*0.46,1.64],[s*0.86,1.76],[s*0.96,2.28],[s*1.05,2.88],[s*1.13,3.44],[s*1.21,4.02],[s*1.3,4.44]],
  been:s=>[[s*0.0,3.4],[s*0.15,3.72],[s*0.27,4.0],[s*0.3,4.62],[s*0.27,5.22],[s*0.25,5.82],[s*0.24,6.52],[s*0.26,7.02],[s*0.33,7.24]] };
function anVesselList(){ const A=[AN_SLAG.aorta], V=[AN_ADER.hol,AN_ADER.holO,AN_ADER.hals2]; for(const s of [-1,1]){ A.push(AN_SLAG.hals(s),AN_SLAG.arm(s),AN_SLAG.been(s),AN_SLAG.nier(s)); V.push(AN_ADER.arm(s),AN_ADER.been(s)); } return {A,V}; }
function anVessels(a,t=0,flow=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const {A,V}=anVesselList();
  V.forEach(p=>anLine(p,ANA.ader,0.042*HH)); A.forEach(p=>anLine(p,ANA.slag,0.036*HH));
  // haarvaatjes in handen en voeten
  ctx.save(); ctx.globalAlpha*=0.7; for(const s of [-1,1]){ for(let k=0;k<4;k++){ anLine([[s*1.24,4.42],[s*(1.18+k*0.045),4.58]],ANA.slag,1.2); anLine([[s*0.38,7.2],[s*(0.26+k*0.06),7.28]],ANA.slag,1.2); } } ctx.restore();
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; A.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<4;i++){ const u=((t*0.35+i/4+j*0.13)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#FFB3A8'); } });
    V.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<3;i++){ const u=1-((t*0.28+i/3+j*0.17)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#B9C8F2'); } }); ctx.restore(); }
  ctx.restore(); }
function anHeart(a,beat=0,g=0){ if(a<=0.01) return; const HH=AHH(); const p=Math.pow(Math.max(0,Math.sin(beat)),3); const k=1+0.09*p; const [ox,oy]=AP(0.09,2.22);
  ctx.save(); ctx.globalAlpha*=a; ctx.translate(ox,oy); ctx.scale(k,k); ctx.translate(-ox,-oy);
  anLine([[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.12,1.98]],ANA.slag,0.07*HH); anLine([[-0.08,1.76],[-0.08,2.06]],ANA.ader,0.075*HH); anLine([[0.06,2.0],[0.14,1.88],[0.24,1.9]],'#3E5FA8',0.055*HH);
  anShape([[-0.13,1.99],[0.04,1.95],[0.2,2.02],[0.33,2.2],[0.33,2.36],[0.28,2.48],[0.12,2.46],[-0.04,2.38],[-0.15,2.22],[-0.16,2.08]],p>0.5?ANA.hartL:ANA.hart,'#7E1E26',2,true,g+0.4*p);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0.06,1.98],[0.12,2.2],[0.22,2.42]],'#E8C27A',1.6); anLine([[-0.1,2.05],[-0.06,2.25],[0.06,2.4]],'#E8C27A',1.4); ctx.restore();
  ctx.restore(); }

// ---------- zenuwstelsel ----------
const AN_ZEN={ merg:[[0,0.62],[0,1.0],[0,2.0],[0,3.32]],
  arm:s=>[[s*0.02,1.3],[s*0.4,1.5],[s*0.86,1.62],[s*0.97,2.3],[s*1.06,2.95],[s*1.14,3.5],[s*1.21,4.05],[s*1.25,4.42]],
  been:s=>[[s*0.01,3.25],[s*0.2,3.7],[s*0.35,4.0],[s*0.38,4.7],[s*0.37,5.15],[s*0.32,6.0],[s*0.29,6.9],[s*0.33,7.2]],
  been2:s=>[[s*0.37,5.15],[s*0.45,5.5],[s*0.43,6.2],[s*0.39,6.95]] };
function anNerveList(){ const N=[AN_ZEN.merg]; for(const s of [-1,1]) N.push(AN_ZEN.arm(s),AN_ZEN.been(s),AN_ZEN.been2(s)); return N; }
function anBrain(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const B=anSym([[0,0.1],[0.17,0.1],[0.29,0.18],[0.33,0.32],[0.31,0.45],[0.22,0.5],[0.1,0.47],[0,0.44]]);
  anShape(B,ANA.brein,ANA.breinS,2,true,g); ctx.save(); anPath(ctx,APs(B)); ctx.clip(); ctx.globalAlpha*=0.8;
  for(let i=0;i<9;i++){ const s=i%2?1:-1, y=0.14+i*0.04; const pts=[]; for(let k=0;k<=8;k++){ const u=k/8; pts.push([s*(0.03+u*0.3),y+Math.sin(u*14+i)*0.025+u*0.05]); } anLine(pts,ANA.breinS,1.5); }
  anLine([[0,0.1],[0,0.46]],ANA.breinS,2.5); ctx.restore(); anLine([[0,0.46],[0,0.7]],ANA.breinS,0.06*HH); ctx.restore(); }
function anNerves(a,t=0,imp=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const N=anNerveList();
  anLine(AN_ZEN.merg,ANA.zenuw,0.05*HH); N.slice(1).forEach(p=>anLine(p,ANA.zenuw,0.022*HH));
  ctx.save(); ctx.globalAlpha*=0.6; for(let i=0;i<6;i++){ const y=1.72+i*0.2; for(const s of [-1,1]) anLine([[s*0.01,y],[s*0.3,y+0.02],[s*0.6,y+0.12]],ANA.zenuw,1.2); }
    for(const s of [-1,1]){ for(let k=0;k<4;k++) anLine([[s*1.25,4.42],[s*(1.17+k*0.04),4.6]],ANA.zenuw,1.1); for(let k=0;k<4;k++) anLine([[s*0.33,7.2],[s*(0.24+k*0.07),7.28]],ANA.zenuw,1.1); anLine([[s*0.04,0.48],[s*0.15,0.5]],ANA.zenuw,1.5); } ctx.restore();
  anBrain(1); if(imp>0.01) anImpulses(t,imp); ctx.restore(); }
function anImpulses(t,a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anNerveList().forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<2;i++){ const u=((t*0.55+i/2+j*0.21)%1); const [x,y]=anAlong(P,j===0?u:(j%2?u:1-u)); ctx.save(); ctx.shadowColor='#E6D8FF'; ctx.shadowBlur=12; dot(ctx,x,y,0.026*HH,'#F2EAFF'); ctx.restore(); } }); ctx.restore(); }
function eyes(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.15,0.5); ctx.save(); anGlow(C.teal,1); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y,0.1*HH,0.065*HH,0,0,6.283); ctx.stroke(); ctx.restore(); } anLine([[-0.15,0.5],[-0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); anLine([[0.15,0.5],[0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); ctx.restore(); }

// ---------- uitscheiding ----------
function anKidney(s,a=1,g=0){ const cx=s*0.37, cy=s<0?2.9:2.84;
  // nier: bolle kant naar buiten, inham (hilus) naar het midden
  const P=[[0,-0.15],[0.09,-0.12],[0.12,0.0],[0.09,0.12],[0,0.15],[-0.06,0.1],[-0.035,0.0],[-0.06,-0.1]].map(p=>[cx+p[0]*s,cy+p[1]]);
  anShape(P,ANA.nier,ANA.nierL,1.8,true,g); ctx.save(); ctx.globalAlpha*=0.5; anShape([[cx+0.04*s,cy-0.09],[cx+0.07*s,cy],[cx+0.04*s,cy+0.09],[cx-0.0*s,cy]],ANA.nierL,null); ctx.restore(); }
function anUrinary(a,t=0,flow=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anKidney(s,1,g); anLine(AN_URL(s),'#E0C070',0.022*HH); }
  anShape([[0,3.72],[0.14,3.76],[0.17,3.88],[0.08,3.97],[0,3.98],[-0.08,3.97],[-0.17,3.88],[-0.14,3.76]],ANA.blaas,'#C9A84E',1.8,true,g);
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; for(const s of [-1,1]){ const P=anDense(AN_URL(s),30); for(let i=0;i<3;i++){ const u=((t*0.45+i/3+(s>0?0.15:0))%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,ANA.urine); } } ctx.restore(); }
  ctx.restore(); }
function AN_URL(s){ return [[s*0.31,2.88],[s*0.24,3.2],[s*0.2,3.55],[s*0.12,3.78]]; }
function anAdrenal(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const cx=s*0.37, cy=(s<0?2.9:2.84)-0.17; anShape([[cx-0.07,cy+0.03],[cx,cy-0.05],[cx+0.07,cy+0.03]],ANA.klier,'#B88A2A',1.2); } ctx.restore(); }

// ---------- afweer ----------
const AN_LYMF=[[-0.15,1.12],[0.15,1.12],[-0.2,1.22],[0.2,1.22],[-0.72,1.86],[-0.66,1.92],[-0.74,1.95],[0.72,1.86],[0.66,1.92],[0.74,1.95],[-0.3,3.86],[-0.36,3.92],[0.3,3.86],[0.36,3.92],[0.12,3.4],[-0.1,3.46],[0.02,3.3]];
function anLymph(a,t=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  ctx.save(); ctx.globalAlpha*=0.55; anLine([[0.02,3.25],[0.03,2.4],[0.04,1.6],[0.12,1.32]],ANA.lymf,1.5); for(const s of [-1,1]){ anLine([[s*0.2,1.22],[s*0.46,1.6],[s*0.7,1.9],[s*0.95,2.5],[s*1.1,3.4],[s*1.22,4.2]],ANA.lymf,1.2); anLine([[s*0.33,3.9],[s*0.33,4.6],[s*0.3,5.6],[s*0.27,6.8]],ANA.lymf,1.2); } ctx.restore();
  spleen(1,g); anShape([[-0.08,1.52],[0.08,1.52],[0.07,1.72],[0,1.78],[-0.07,1.72]],'#9CD0A6',null); // thymus
  AN_LYMF.forEach(([x,y],i)=>{ const [px2,py2]=AP(x,y); ctx.save(); anGlow(ANA.lymf,g); ctx.beginPath(); ctx.ellipse(px2,py2,0.035*HH,0.026*HH,hash(i)*3,0,6.283); ctx.fillStyle=ANA.lymf; ctx.fill(); ctx.strokeStyle='#3E8A50'; ctx.lineWidth=1; ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// ---------- hormoonklieren ----------
function anGlands(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(ANA.klier,g);
  const [hx,hy]=AP(0,0.55); dot(ctx,hx,hy,0.035*HH,ANA.klier,'#B88A2A',1.2);
  anShape([[0,1.2],[0.06,1.12],[0.11,1.15],[0.11,1.3],[0.06,1.33],[0,1.26],[-0.06,1.33],[-0.11,1.3],[-0.11,1.15],[-0.06,1.12]],ANA.klier,'#B88A2A',1.2,true,g);
  ctx.shadowBlur=0; anAdrenal(1); ctx.restore(); }

// ---------- voortplanting ----------
function anRepro(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anLine([[s*0.07,3.62],[s*0.17,3.55],[s*0.24,3.58]],ANA.baar,0.02*HH); const [ox,oy]=AP(s*0.27,3.62); ctx.save(); anGlow(ANA.baar,g); ctx.beginPath(); ctx.ellipse(ox,oy,0.045*HH,0.03*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.restore(); }
  anShape([[0,3.56],[0.08,3.58],[0.07,3.7],[0.03,3.78],[0,3.8],[-0.03,3.78],[-0.07,3.7],[-0.08,3.58]],ANA.baar,'#B86468',1.5,true,g);
  ctx.restore(); }
function testes(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.06,4.1); ctx.save(); anGlow(ANA.baar,g||a); ctx.beginPath(); ctx.ellipse(x,y,0.04*HH,0.055*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.strokeStyle='#B86468'; ctx.lineWidth=1.2; ctx.stroke(); ctx.restore(); } ctx.restore(); }

// ---------- huid ----------
function skin(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; ctx.shadowColor='#F0C9A0'; ctx.shadowBlur=18; ctx.strokeStyle='#F0C9A0'; ctx.lineWidth=0.045*HH; ctx.lineJoin='round';
  anPath(ctx,APs(anSym(AN_BODY))); ctx.stroke(); anPath(ctx,APs(anSym(AN_HEAD))); ctx.stroke(); ctx.restore(); }
function skull(a){ anSkull(a,a); }

// ---------- alles samen (zelfde sleutels als het oude bodyOrgans) ----------
function bodyOrgans(o={}){ const A=k=>o[k]===undefined?0:o[k]; const t=o.t||0; const sil=o.sil===undefined?0.3:o.sil;
  const figA=Math.min(1,0.25+sil*1.0);
  anFigure(figA,t); anCavity(0.35*Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('hormoon'),A('afweer'),A('voortpl'),A('zenuw'),0.4)*Math.min(1,sil*3));
  const rest=Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('zenuw'),A('afweer'),A('hormoon'),A('voortpl'));
  anSkeleton(A('skelet'),{schedel:A('skelet')>0.5});
  anMuscles(A('spier')*(1-0.55*rest));
  anVessels(A('bloed')*0.9,t,A('bloed')>0.5?A('bloed'):0);
  anNerves(A('zenuw'),t,o.impuls||0);
  anUrinary(A('uitsch'),t,o.urine||0);
  anRepro(A('voortpl'));
  pancreas(A('spijs')*0.9); anDigest(A('spijs'),t);
  anTrachea(A('adem')); anLungs(A('adem'),o.breath||0);
  anHeart(A('bloed'),o.beat||0);
  anLymph(A('afweer'),t);
  anGlands(A('hormoon'));
}
// mens = vaste personage uit het castboek in plaats van het oude poppetje (Kamiel 20 okt 2026)
function human(ctx,x,y,h,a=1,color,o={}){ persoon(ctx,o.wie||'lotte',x,y,h,Object.assign({a},o)); }
// Wat word jij? · Sport en topsport 5 · Ook nog hardlopen? — eigen tekeningen (19 nov 2026)
// Seriekleuren (REEKS-sport): teal = water, rust, zwemmen; groen = aanpassing, lopen als tweede sport; koraal = let op, blessure;
// goud = doel en focus; oker = botten en kracht. Cast: Sam (zwemmer, outfit 'zwem'; bij het lopen 'sport'), de zwemtrainer,
// figuranten Bilal en Daan (vrienden), Teun en Jens als jongste groep, Dennis en Marieke als ouders. Geen namen in beeld.
// Er is geen geschilderd zwembaddecor: het bad wordt hier vlak getekend (navy-basis, gedempte tegels), alleen onder badscènes.

const GROND = 860;
const SP5 = { wand: '#16233A', wandL: '#1D2C47', tegel: '#2B3A55', tegelL: '#344563', voeg: '#22304A', water: '#2C6E8E', waterD: '#1F5672', waterL: '#4F95B5',
  bodem: '#1B4058', lijn: '#13283A', blok: '#C9D2DC', blokD: '#8E9AAA', bot: '#E2CB92', botD: '#C9A35C', merg: '#6E4636', spons: '#EFE2BC',
  spier: '#B9524C', spierL: '#D47A70', mito: '#D88E7A', gras: '#2F4A3A', pad: '#5A4A3A', padL: '#6E5C48', herfst: ['#C9783A', '#D9A441', '#B8533A', '#8C5A3A'] };

// ---------- algemene hulpjes (zoals mb3) ----------
function dot(ctx, x, y, r, fill, stroke, lw = 1.5) { circ(ctx, x, y, r, fill, stroke, lw); } // lib_anatomie verwacht dot()
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function kaartTekst(ctx, x, y, w, h, kop, regels, a = 1, rand = C.line, kopKl = C.goud, px = 36) { if (a <= 0.01) return; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); if (kop) metaText(ctx, kop, x + 28, y + 48, kopKl, 'left', 28);
  regels.forEach((r, i) => text(ctx, r, x + 28, y + (kop ? 100 : 62) + i * (px + 12), fTekst(px, 700), C.text, 'left')); }); }
// gekleurd kaartje met één regel (bv. 'HART: DOET DEELS MEE')
function SP5_label(ctx, s2, x, y, col, a = 1, px = 34, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width + 56, h = px + 34;
  const x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x; roundRect(ctx, x0, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), col, 3);
  ctx.fillStyle = col; roundRect(ctx, x0, y, 12, h, 6); ctx.fill(); text(ctx, s2, x0 + 32, y + h / 2 + px * 0.36, fTekst(px, 800), C.text, 'left'); ctx.restore(); return w; }

// ---------- extra garderobe voor figuranten (zelfde gezicht, alleen zwem- of sportkleding) ----------
(function () { const Z = CAST.sam.garderobe.zwem;
  const zwem = (id, naam, muts, broek, acc) => { const P = CAST[id]; if (!P) return; P.garderobe = P.garderobe || {}; P.garderobe[naam] = Object.assign({}, Z, { topKleur: P.huid, topAccent: lighten(P.huid, -0.1), schoen: P.huid, schoenAccent: P.huid, badmuts: muts, broek, broekAccent: acc || broek }); };
  zwem('bilal', 'zwem', '#2E6FBF', '#22252C', '#2E6FBF'); zwem('daan', 'zwem', '#F2F2EE', '#2B3F66', '#5BA4C9');
  zwem('kind', 'zwem', '#E0B64A', '#2B3F66'); zwem('jens', 'zwem', '#5BA4C9', '#22252C'); zwem('kind', 'zwemB', '#7FC48F', '#3A2E4A'); zwem('jens', 'zwemB', '#F2F2EE', '#5A2E2E');
  if (CAST.daan && !CAST.daan.garderobe.sport) CAST.daan.garderobe.sport = { top: 'tshirt', strepen: null, topKleur: '#4F8F6A', topAccent: '#3F7558', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#4F8F6A' };
})();

// ---------- personages ----------
function sam(ctx, x, t, o = {}) { return persoon(ctx, 'sam', x, o.y || GROND, o.h || 430, Object.assign({ t, kijk: 1, uit: 'neutraal', pose: 'staan', outfit: 'zwem' }, o)); }
function trainer(ctx, x, t, o = {}) { return persoon(ctx, 'zwemtrainer', x, o.y || GROND, o.h || 450, Object.assign({ t, kijk: -1, uit: 'neutraal', pose: 'staan' }, o)); }

// ---------- het zwembad ----------
// kant: achterwand met hoge ramen (avond), een strook water met lijnen in de verte, de natte tegelvloer vooraan (voeten op GROND)
function SP5_badKant(ctx, t, o = {}) { const { a = 1, blokken = true, avond = true } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP5.wand; ctx.fillRect(0, 0, W, 560);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 310; roundRect(ctx, x, 70, 230, 300, 6); shape(ctx, avond ? '#101A2C' : '#3A5A7A', SP5.wandL, 3); ctx.fillStyle = rgba('#F2F2EE', 0.05); ctx.fillRect(x + 113, 70, 4, 300); ctx.fillRect(x, 218, 230, 4); }
  ctx.fillStyle = SP5.wandL; ctx.fillRect(0, 410, W, 150); ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 410); ctx.lineTo(x, 560); ctx.stroke(); } for (let y = 440; y < 560; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // water in de verte
  ctx.fillStyle = SP5.water; ctx.fillRect(0, 560, W, 130); ctx.fillStyle = SP5.waterL; ctx.fillRect(0, 560, W, 5);
  const rij = (y, s, k) => { for (let x = -20; x < W + 20; x += 26 * s) { ctx.fillStyle = (Math.floor(x / (26 * s)) % 4 === 0) ? '#D8573F' : k; ctx.beginPath(); ctx.ellipse(x + (t * 3) % 1, y, 11 * s, 5 * s, 0, 0, 6.283); ctx.fill(); } };
  rij(585, 0.6, '#E8E2D4'); rij(612, 0.8, '#5BA4C9'); rij(648, 1.0, '#E8E2D4');
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const y = 570 + i * 20, x0 = (i * 330 + t * 22) % W; ctx.beginPath(); ctx.moveTo(x0, y); ctx.quadraticCurveTo(x0 + 40, y - 4, x0 + 80, y); ctx.stroke(); }
  // rand en vloer
  ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, 690, W, 14); ctx.fillStyle = SP5.tegel; ctx.fillRect(0, 704, W, H - 704);
  ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let y = 740; y < 880; y += 46) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  for (let x = 0; x < W; x += 92) { ctx.beginPath(); ctx.moveTo(x, 704); ctx.lineTo(x - 40, 880); ctx.stroke(); }
  if (blokken) for (let i = 0; i < 5; i++) SP5_startblokVoor(ctx, 1080 + i * 190, 692, 0.75, i + 3);
  ctx.restore(); }
// startblok van voren (in de verte, aan de rand)
function SP5_startblokVoor(ctx, x, y, s, nr) { ctx.save(); ctx.fillStyle = SP5.blokD; ctx.fillRect(x - 6 * s, y - 70 * s, 12 * s, 70 * s);
  roundRect(ctx, x - 44 * s, y - 92 * s, 88 * s, 26 * s, 6 * s); shape(ctx, SP5.blok, null); ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - 22 * s, y - 64 * s, 44 * s, 34 * s, 4 * s); ctx.fill();
  text(ctx, String(nr), x, y - 37 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
// doorsnede: tegelvloer links tot xW, water rechts; Y = wateroppervlak; bodem op 850
function SP5_badDoorsnede(ctx, t, Y, o = {}) { const { xW = 380, a = 1, xR = null } = o; bg(ctx, 'schema'); if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = SP5.wand; ctx.fillRect(0, 0, W, Y - 30);
  for (let i = 0; i < 5; i++) { const x = 160 + i * 380; roundRect(ctx, x, 60, 250, Y - 160, 6); shape(ctx, '#101A2C', SP5.wandL, 3); }
  // water
  const xr = xR || W; ctx.fillStyle = SP5.water; ctx.fillRect(xW, Y, xr - xW, 860 - Y); ctx.fillStyle = SP5.waterD; ctx.fillRect(xW, Y + (860 - Y) * 0.55, xr - xW, (860 - Y) * 0.45);
  ctx.fillStyle = SP5.bodem; ctx.fillRect(xW, 840, xr - xW, 20); ctx.fillStyle = SP5.lijn; ctx.fillRect(xW + 120, 832, xr - xW - 240, 10);
  // wanden met tegels
  ctx.fillStyle = SP5.tegel; ctx.fillRect(0, Y - 30, xW, 890 - Y); ctx.strokeStyle = SP5.voeg; ctx.lineWidth = 2; for (let y = Y; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(xW, y); ctx.stroke(); }
  ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, Y - 34, xW + 6, 10);
  if (xR) { ctx.fillStyle = SP5.tegel; ctx.fillRect(xR, Y - 30, W - xR, 890 - Y); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(xR - 6, Y - 34, W - xR + 6, 10); ctx.fillStyle = SP5.lijn; ctx.fillRect(xR - 14, Y + 40, 8, 760 - Y); }
  // golfjes aan het oppervlak
  ctx.strokeStyle = SP5.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = xW; x <= xr; x += 8) { const y = Y + 3 * Math.sin(x * 0.03 + t * 2.2); x === xW ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  ctx.restore(); }
// startblok van opzij: (x, y) = voorrand en bovenkant; s = schaal (1 = ± 75 cm hoog bij Sam h 430)
function SP5_startblok(ctx, x, y, s = 1, nr = 4, Lp = null) { ctx.save(); const hP = 150 * s, lp = Lp || 120 * s; ctx.fillStyle = SP5.blokD; ctx.fillRect(x - lp * 0.7, y + 10 * s, 18 * s, hP); ctx.fillRect(x - 24 * s, y + 10 * s, 16 * s, hP - 10 * s);
  ctx.beginPath(); ctx.moveTo(x - lp, y + 14 * s); ctx.lineTo(x, y); ctx.lineTo(x + 4 * s, y + 18 * s); ctx.lineTo(x - lp, y + 30 * s); ctx.closePath(); shape(ctx, SP5.blok, null);
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - lp * 0.55, y + 44 * s, 44 * s, 36 * s, 4 * s); ctx.fill(); text(ctx, String(nr), x - lp * 0.55 + 22 * s, y + 72 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
// wig van het startblok onder de achterste voet
function SP5_wig(ctx, s, py) { if (!s || !s.wig) return; const { x, y, h } = s.wig; const yb = py == null ? y + 6 : py; ctx.save(); ctx.fillStyle = SP5.blokD; ctx.beginPath(); ctx.moveTo(x - h * 1.4, yb); ctx.lineTo(x + h * 0.1, Math.min(y, yb) - h); ctx.lineTo(x + h * 0.6, Math.min(y, yb) - h * 0.8); ctx.lineTo(x + h * 0.6, yb); ctx.closePath(); ctx.fill(); ctx.restore(); }
// waterlijn als lichte golflijn over een zwemmer heen (persoon blijft dekkend)
function SP5_waterlijn(ctx, x0, x1, Y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#BFE3F2', 0.85); ctx.lineWidth = 3; ctx.beginPath();
  for (let x = x0; x <= x1; x += 8) { const y = Y + 3 * Math.sin(x * 0.03 + t * 2.2); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.restore(); }
// spatwater (ringen en druppels)
function SP5_spat(ctx, x, y, u, a = 1) { if (a <= 0.01 || u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= a * (1 - u); ctx.fillStyle = '#DDF0F8';
  for (let i = 0; i < 9; i++) { const an = -Math.PI * (0.1 + 0.8 * i / 8), r = 30 + 160 * u; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r * 0.9 + 120 * u * u, 6, '#DDF0F8'); }
  ctx.strokeStyle = '#DDF0F8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 40 + 120 * u, 10 + 20 * u, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }

// ---------- pictogrammen (geen mensfiguren) ----------
function SP5_golfIcoon(ctx, x, y, s, col = C.teal) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (const dy of [-8, 8]) { ctx.beginPath(); for (let i = 0; i <= 24; i++) { const xx = x - 24 * s + i * 2 * s, yy = y + dy * s + 5 * s * Math.sin(i * 0.52); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore(); }
function SP5_schoen(ctx, x, y, s, col = C.groen) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-26, 10); ctx.lineTo(-24, -14); ctx.quadraticCurveTo(-14, -18, -8, -8); ctx.quadraticCurveTo(4, -4, 18, -2); ctx.quadraticCurveTo(30, 0, 30, 10); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-28, 9, 59, 5); ctx.strokeStyle = rgba('#0D1420', 0.7); ctx.lineWidth = 2; for (const xx of [-12, -6, 0]) { ctx.beginPath(); ctx.moveTo(xx, -10 + (xx + 12) * 0.2); ctx.lineTo(xx + 5, -7 + (xx + 12) * 0.2); ctx.stroke(); } ctx.restore(); }
function SP5_fiets(ctx, x, y, s, col = C.groen) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const dx of [-22, 22]) { ctx.beginPath(); ctx.arc(x + dx * s, y + 8 * s, 14 * s, 0, 6.283); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x - 22 * s, y + 8 * s); ctx.lineTo(x - 6 * s, y - 14 * s); ctx.lineTo(x + 16 * s, y - 14 * s); ctx.lineTo(x + 22 * s, y + 8 * s); ctx.moveTo(x - 6 * s, y - 14 * s); ctx.lineTo(x + 2 * s, y + 8 * s); ctx.lineTo(x + 16 * s, y - 14 * s); ctx.moveTo(x - 10 * s, y - 20 * s); ctx.lineTo(x - 2 * s, y - 20 * s); ctx.moveTo(x + 16 * s, y - 14 * s); ctx.lineTo(x + 14 * s, y - 22 * s); ctx.lineTo(x + 20 * s, y - 22 * s); ctx.stroke(); ctx.restore(); }
function SP5_halter(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 26 * s, y - 3 * s, 52 * s, 6 * s); for (const d of [-1, 1]) { roundRect(ctx, x + d * 22 * s - 5 * s, y - 16 * s, 10 * s, 32 * s, 3 * s); ctx.fill(); roundRect(ctx, x + d * 30 * s - 4 * s, y - 11 * s, 8 * s, 22 * s, 3 * s); ctx.fill(); } ctx.restore(); }
function SP5_bal(ctx, x, y, s, col = C.groen) { ctx.save(); circ(ctx, x, y, 18 * s, '#F2F2EE', col, 3 * s); ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); for (let i = 0; i < 5; i++) { const an = -Math.PI / 2 + i * 1.2566; ctx.lineTo(x + Math.cos(an) * 7 * s, y + Math.sin(an) * 7 * s); } ctx.closePath(); ctx.fill(); ctx.restore(); }
function SP5_horde(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 20 * s, y + 18 * s); ctx.lineTo(x - 20 * s, y - 14 * s); ctx.moveTo(x + 20 * s, y + 18 * s); ctx.lineTo(x + 20 * s, y - 14 * s); ctx.moveTo(x - 26 * s, y + 18 * s); ctx.lineTo(x - 12 * s, y + 18 * s); ctx.moveTo(x + 14 * s, y + 18 * s); ctx.lineTo(x + 28 * s, y + 18 * s); ctx.stroke();
  ctx.fillStyle = col; ctx.fillRect(x - 24 * s, y - 20 * s, 48 * s, 9 * s); ctx.restore(); }
function SP5_hart(ctx, x, y, s, col = C.koraal, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 14); ctx.bezierCurveTo(-26, -4, -18, -26, 0, -12); ctx.bezierCurveTo(18, -26, 26, -4, 0, 14); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function SP5_botIcoon(ctx, x, y, s, col = C.oker) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 22 * s, y - 5 * s, 44 * s, 10 * s); for (const dx of [-1, 1]) for (const dy of [-1, 1]) circ(ctx, x + dx * 24 * s, y + dy * 7 * s, 8 * s, col); ctx.restore(); }
function SP5_hoofdIcoon(ctx, x, y, s, col = C.teal) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4 * s; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - 8 * s, y + 24 * s); ctx.lineTo(x - 8 * s, y + 12 * s); ctx.bezierCurveTo(x - 24 * s, y + 2 * s, x - 22 * s, y - 24 * s, x, y - 24 * s); ctx.bezierCurveTo(x + 18 * s, y - 24 * s, x + 24 * s, y - 10 * s, x + 20 * s, y - 2 * s); ctx.lineTo(x + 26 * s, y + 6 * s); ctx.lineTo(x + 20 * s, y + 8 * s); ctx.lineTo(x + 20 * s, y + 16 * s); ctx.lineTo(x + 10 * s, y + 18 * s); ctx.lineTo(x + 10 * s, y + 24 * s); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 2 * s, y - 6 * s, 7 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
// ronde tegel met pictogram
function SP5_tegel(ctx, x, y, soort, col, a = 1, w = 120, h = 56) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y - h / 2, w, h, 12); shape(ctx, rgba(col, 0.3), col, 2.5);
  if (soort === 'zwem') SP5_golfIcoon(ctx, x, y, 0.85, lighten(col, 0.3)); else if (soort === 'loop') SP5_schoen(ctx, x, y + 2, 0.95, lighten(col, 0.25)); else if (soort === 'kracht') SP5_halter(ctx, x, y, 0.9, lighten(col, 0.2)); else if (soort === 'fiets') SP5_fiets(ctx, x, y, 0.8, lighten(col, 0.25)); ctx.restore(); }

// weekschema: 8 zwemblokken (teal) en optioneel 3 looptegels (groen) op di, do, za
const SP5_DAG = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'], SP5_ZWEM = [2, 1, 2, 1, 1, 1, 0];
function SP5_week(ctx, x, y, o = {}) { const { a = 1, zwem = 1, loop = 0, loopKl = C.groen, drop = 1, tw = 150 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 30, y - 70, tw * 7 + 50, 380, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.6), 2);
  SP5_DAG.forEach((d, i) => { const cx = x + i * tw + tw / 2 - 5; metaText(ctx, d, cx, y - 22, C.text2, 'center', 28);
    for (let k = 0; k < SP5_ZWEM[i]; k++) SP5_tegel(ctx, cx, y + 30 + k * 66, 'zwem', C.teal, zwem, tw - 24, 56);
    if ([1, 3, 5].includes(i) && loop > 0.01) { const j = [1, 3, 5].indexOf(i), u = clamp(loop * 1.0, 0, 1); SP5_tegel(ctx, cx, y + 30 + 2 * 66 + 26 - (1 - u) * 90 * drop, 'loop', loopKl, u, tw - 24, 56); } });
  ctx.restore(); }
// telefoon met appje
function SP5_telefoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 14 * s, y - 26 * s, 28 * s, 52 * s, 5 * s); shape(ctx, '#20242E', '#5A6478', 1.5); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(x - 11 * s, y - 21 * s, 22 * s, 40 * s); ctx.restore(); }
function SP5_app(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(38, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, x, y, w, 76, 22); shape(ctx, '#DCF5D8', null);
  ctx.beginPath(); ctx.moveTo(x + 18, y + 76); ctx.lineTo(x + 6, y + 98); ctx.lineTo(x + 40, y + 76); ctx.fillStyle = '#DCF5D8'; ctx.fill(); text(ctx, s2, x + 25, y + 51, fTekst(38, 800), '#1A2740', 'left'); ctx.restore(); }
// klembord (papier op een bruin bord met klem)
function SP5_klembord(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, '#8C6A44', '#6E5234', 2); roundRect(ctx, x + 18, y + 30, w - 36, h - 48, 6); shape(ctx, '#F2EEE4', null);
  roundRect(ctx, x + w / 2 - 70, y - 14, 140, 44, 10); shape(ctx, '#9AA3B2', '#6E7685', 2); ctx.restore(); }
// emmer 'HERSTEL' met tegels erin; vul 0..1 (waterlijn), over = overlopen
function SP5_emmer(ctx, x, y, s, o = {}) { const { a = 1, vul = 0, tegels = [], over = 0, t = 0, label = 'HERSTEL' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const w0 = 320 * s, w1 = 250 * s, h = 360 * s, top = y - h;
  const pad = () => { ctx.beginPath(); ctx.moveTo(x - w0 / 2, top); ctx.lineTo(x - w1 / 2, y); ctx.lineTo(x + w1 / 2, y); ctx.lineTo(x + w0 / 2, top); };
  pad(); ctx.closePath(); ctx.fillStyle = '#24314A'; ctx.fill();
  ctx.save(); pad(); ctx.closePath(); ctx.clip();
  const lvl = y - h * clamp(vul, 0, 1); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(x - w0, lvl, w0 * 2, h + 10);
  tegels.forEach((tg, i) => { const col = i % 3, row = Math.floor(i / 3); SP5_tegel(ctx, x - 88 * s + col * 88 * s, y - 40 * s - row * 62 * s - (tg.drop || 0), tg.soort, tg.kl, tg.a == null ? 1 : tg.a, 80 * s, 50 * s); });
  ctx.restore();
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 5; pad(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, top, w0 / 2, 18 * s, 0, 0, 6.283); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, top - 10 * s, w0 * 0.44, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  if (over > 0.01) { ctx.fillStyle = rgba(C.teal, 0.8 * over); for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + d * w0 / 2, top); ctx.quadraticCurveTo(x + d * (w0 / 2 + 40 * s), top + 20 * s, x + d * (w0 / 2 + 30 * s), top + 160 * s * over); ctx.lineTo(x + d * (w0 / 2 + 14 * s), top + 150 * s * over); ctx.quadraticCurveTo(x + d * (w0 / 2 + 16 * s), top + 20 * s, x + d * (w0 / 2 - 4), top + 4); ctx.fill(); }
    for (let i = 0; i < 6; i++) { const u = (t * 0.8 + i / 6) % 1; circ(ctx, x + (i % 2 ? 1 : -1) * (w0 / 2 + 24 * s), top + 170 * s * over + u * 120 * s, 5 * s, rgba(C.teal, 0.8 * over * (1 - u))); } }
  if (label) metaText(ctx, label, x, y + 46 * s, C.teal, 'center', 28); ctx.restore(); }
// meter (halve cirkel) met wijzer u 0..1
function SP5_meter(ctx, x, y, r, u, lab, a = 1, col = C.oker) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  ctx.strokeStyle = '#2A3A58'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(x, y, r, Math.PI, Math.PI + Math.PI * clamp(u, 0, 1)); ctx.stroke();
  const an = Math.PI + Math.PI * clamp(u, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 26), y + Math.sin(an) * (r - 26)); ctx.stroke(); circ(ctx, x, y, 10, C.text);
  if (lab) metaText(ctx, lab, x, y + 50, col, 'center', 28); ctx.restore(); }
// trap met kleine treden
function SP5_trap(ctx, x, y, n, sw, sh, a = 1, col = C.groen, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y);
  const m = Math.max(1, Math.round(n * clamp(u, 0, 1))); for (let i = 0; i < m; i++) { ctx.lineTo(x + i * sw, y - (i + 1) * sh); ctx.lineTo(x + (i + 1) * sw, y - (i + 1) * sh); } ctx.stroke(); ctx.restore(); }
// podium (drie treden); pl = { a: 1|2|3, b: 1|2|3 } plaats van route A (teal) en B (groen)
function SP5_podium(ctx, x, y, s, pl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const H = { 1: 90, 2: 62, 3: 40 }, X = { 2: -1, 1: 0, 3: 1 };
  for (const p of [2, 1, 3]) { roundRect(ctx, x + X[p] * 64 * s - 30 * s, y - H[p] * s, 60 * s, H[p] * s, 4); shape(ctx, '#2A3A58', C.line, 1.5); text(ctx, String(p), x + X[p] * 64 * s, y - H[p] * s + 30 * s, fTekst(24 * s, 800), C.text2, 'center'); }
  for (const [k, col] of [['a', C.teal], ['b', C.groen]]) if (pl[k]) { const p = pl[k]; circ(ctx, x + X[p] * 64 * s, y - H[p] * s - 18 * s, 15 * s, col, lighten(col, 0.3), 2); text(ctx, k.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + X[p] * 64 * s, y - H[p] * s - 10 * s, fTekst(20 * s, 800), '#0D1420', 'center'); }
  ctx.restore(); }
// staafjes (horizontaal) met label links
function SP5_staaf(ctx, x, y, w, u, col, lab, waarde, a = 1, h = 46) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#22304A', rgba(C.line, 0.5), 1.5);
  if (u > 0.005) { roundRect(ctx, x, y, Math.max(16, w * clamp(u, 0, 1)), h, 10); shape(ctx, rgba(col, 0.75), col, 2); }
  if (lab) text(ctx, lab, x, y - 14, fTekst(34, 700), C.text, 'left'); if (waarde) text(ctx, waarde, x + w * clamp(u, 0, 1) + 18, y + h * 0.72, fTekst(36, 800), col, 'left'); ctx.restore(); }

// ---------- lichaam: hart in de romp (kijkje), spieren, botten ----------
let BODY = { cx: 960, yb: 880, h: 700 };
function SP5_romp(ctx, r, a = 1, t = 0, beat = 1) { if (a <= 0.01 || !r || !r.hoofd) return;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0.12, 2.3), wr = 0.62 * HHn;
  ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr, 0, 0, 6.283); ctx.clip();
  ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9); anLungs(0.35, 0); anHeart(1, t * 7 * beat, 0.5);
  ctx.restore(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
  return { x: wx, y: wy, r: wr }; }
// spiervezels met mitochondriën (voor in een zoomcirkel)
function SP5_vezels(ctx, x, y, r, n, extra = 0, t = 0) { ctx.save(); ctx.fillStyle = '#2A1C24'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const yy = y + i * r * 0.3; roundRect(ctx, x - r * 1.1, yy - r * 0.12, r * 2.2, r * 0.24, r * 0.1); shape(ctx, '#6E3A40', '#8E5258', 1.5);
    ctx.strokeStyle = rgba('#F0B8A6', 0.15); ctx.lineWidth = 1.5; for (let k = -10; k <= 10; k++) { ctx.beginPath(); ctx.moveTo(x + k * r * 0.11, yy - r * 0.1); ctx.lineTo(x + k * r * 0.11, yy + r * 0.1); ctx.stroke(); } }
  const tot = n + Math.round(extra); for (let i = 0; i < tot; i++) { const hx = x + (hash(i * 3.1) - 0.5) * r * 1.7, row = Math.floor(hash(i * 7.7) * 6) - 2.5, hy = y + row * r * 0.3; const nieuw = i >= n;
    ctx.save(); ctx.globalAlpha *= nieuw ? clamp(extra - (i - n), 0, 1) : 1; mitochondrion(ctx, hx, hy, r * 0.26, 0, 1, 4, t); if (nieuw) { ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(hx, hy, r * 0.17, r * 0.09, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
// onderlichaam als schema (bekken + twee benen); kl = kleur per been (in beeld links, rechts)
function SP5_benen(ctx, x, y, s, klL, klR, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const been = (d, kl) => { ctx.beginPath(); ctx.moveTo(d * 12, -300); ctx.lineTo(d * 92, -300); ctx.quadraticCurveTo(d * 96, -200, d * 74, -110); ctx.quadraticCurveTo(d * 78, -60, d * 70, -10); ctx.quadraticCurveTo(d * 74, 40, d * 64, 90); ctx.lineTo(d * 66, 150); ctx.lineTo(d * 100, 168); ctx.lineTo(d * 36, 168); ctx.lineTo(d * 34, 90);
    ctx.quadraticCurveTo(d * 24, 30, d * 30, -20); ctx.quadraticCurveTo(d * 20, -100, d * 16, -180); ctx.closePath(); shape(ctx, rgba(kl, 0.55), kl, 3); };
  roundRect(ctx, -100, -360, 200, 80, 30); shape(ctx, '#2A3A58', C.line, 2); been(-1, klL); been(1, klR); ctx.restore(); }
// lange pijp (scheenbeen) in lengtedoorsnede: schors oker, mergholte, sponsbot aan de uiteinden (boven breed plateau, onder smaller met enkelknobbel)
function SP5_scheenbeen(ctx, x, y, len, a = 1, gloed = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = len * 0.075, top = y - len / 2, bot = y + len / 2;
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(x - 2.0 * w, top + 0.5 * w); ctx.quadraticCurveTo(x - 2.1 * w, top - 0.3 * w, x - 1.4 * w, top - 0.3 * w); ctx.quadraticCurveTo(x, top + 0.1 * w, x + 1.4 * w, top - 0.3 * w); ctx.quadraticCurveTo(x + 2.1 * w, top - 0.3 * w, x + 2.0 * w, top + 0.5 * w);
    ctx.quadraticCurveTo(x + 1.8 * w, top + 2.2 * w, x + 1.0 * w, top + 3.4 * w); ctx.lineTo(x + 0.9 * w, bot - 2.6 * w); ctx.quadraticCurveTo(x + 1.3 * w, bot - 1.2 * w, x + 1.25 * w, bot); ctx.lineTo(x - 0.8 * w, bot);
    ctx.quadraticCurveTo(x - 1.2 * w, bot + 0.7 * w, x - 1.5 * w, bot - 0.3 * w); ctx.quadraticCurveTo(x - 1.4 * w, bot - 1.4 * w, x - 0.95 * w, bot - 2.6 * w); ctx.lineTo(x - 1.0 * w, top + 3.4 * w); ctx.quadraticCurveTo(x - 1.8 * w, top + 2.2 * w, x - 2.0 * w, top + 0.5 * w); ctx.closePath(); };
  if (gloed > 0.01) { ctx.save(); ctx.globalAlpha *= gloed; omtrek(); ctx.strokeStyle = rgba(C.oker, 0.5); ctx.lineWidth = 26; ctx.stroke(); ctx.restore(); }
  omtrek(); shape(ctx, SP5.botD, lighten(SP5.botD, 0.3), 2.5);
  ctx.save(); omtrek(); ctx.clip(); ctx.fillStyle = SP5.spons;
  ctx.beginPath(); ctx.moveTo(x - 2.2 * w, top - w); ctx.lineTo(x + 2.2 * w, top - w); ctx.lineTo(x + 2.2 * w, top + 2.3 * w); ctx.quadraticCurveTo(x, top + 3.6 * w, x - 2.2 * w, top + 2.3 * w); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 2.2 * w, bot + w); ctx.lineTo(x + 2.2 * w, bot + w); ctx.lineTo(x + 2.2 * w, bot - 1.6 * w); ctx.quadraticCurveTo(x, bot - 2.7 * w, x - 2.2 * w, bot - 1.6 * w); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba(SP5.botD, 0.9); ctx.lineWidth = 2.5; for (const [y0, y1] of [[top - 0.2 * w, top + 2.6 * w], [bot - 2.0 * w, bot + 0.2 * w]]) for (let i = 0; i < 34; i++) { const px = x + (hash(i * 4.3 + y0) - 0.5) * w * 3.4, py = y0 + hash(i * 2.9 + y0) * (y1 - y0), an = hash(i * 6.1 + y0) * 3.14; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * w * 0.45, py + Math.sin(an) * w * 0.45); ctx.stroke(); }
  ctx.fillStyle = SP5.merg; roundRect(ctx, x - w * 0.52, top + w * 3.0, w * 1.04, len - w * 5.2, w * 0.5); ctx.fill(); ctx.restore(); ctx.restore(); }
// beenskelet van voren: bekkenhelft, dijbeen met kop en hals, knieschijf, scheen- en kuitbeen; hl = { hals, been } 0..1 oplichten
function SP5_beenSkelet(ctx, x, y, s, hl = {}, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const B = SP5.bot, BS = lighten(SP5.botD, 0.2);
  const gl = (u, fn, lw = 64) => { if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; ctx.strokeStyle = rgba(C.oker, 0.75); ctx.lineWidth = lw; ctx.lineCap = 'round'; fn(); ctx.stroke(); ctx.restore(); } };
  // bekkenhelft (darmbeenschoep met kom), links in beeld het midden van het lichaam
  ctx.save(); ctx.translate(-12, -372); ctx.scale(0.6, 0.6); ctx.translate(12, 372); ctx.beginPath(); ctx.moveTo(40, -470); ctx.quadraticCurveTo(-60, -500, -150, -450); ctx.quadraticCurveTo(-150, -400, -130, -360); ctx.quadraticCurveTo(-150, -320, -120, -280); ctx.lineTo(-70, -280); ctx.quadraticCurveTo(-40, -330, -30, -360); ctx.quadraticCurveTo(10, -380, 50, -420); ctx.closePath(); shape(ctx, B, BS, 2); ctx.restore();
  circ(ctx, -12, -372, 30, lighten(SP5.botD, 0.35));
  const hals = () => { ctx.beginPath(); ctx.moveTo(-12, -372); ctx.lineTo(50, -330); };
  gl(hl.hals || 0, hals, 76); circ(ctx, -12, -372, 26, B, BS, 2); ctx.lineCap = 'round'; ctx.strokeStyle = B; ctx.lineWidth = 32; hals(); ctx.stroke(); circ(ctx, 72, -336, 22, B);
  const schacht = () => { ctx.beginPath(); ctx.moveTo(56, -330); ctx.lineTo(30, -40); };
  gl(hl.been || 0, schacht); ctx.strokeStyle = B; ctx.lineWidth = 30; schacht(); ctx.stroke(); roundRect(ctx, -8, -56, 84, 44, 18); shape(ctx, B, BS, 2); circ(ctx, 34, -40, 14, lighten(SP5.botD, 0.35));
  const scheen = () => { ctx.beginPath(); ctx.moveTo(26, 6); ctx.lineTo(22, 270); };
  roundRect(ctx, -10, -8, 80, 28, 12); shape(ctx, B, BS, 2); gl(hl.been || 0, scheen); ctx.strokeStyle = B; ctx.lineWidth = 26; scheen(); ctx.stroke(); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(62, 22); ctx.lineTo(56, 262); ctx.stroke();
  roundRect(ctx, -4, 262, 74, 24, 10); shape(ctx, B, BS, 2); ctx.restore(); }
// voet die neerkomt (onderbeen + schoen van opzij), u = 0..1 val; geeft de landingsplek
function SP5_voetStoot(ctx, x, y, s, u, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = -120 * s * (1 - ease(u));
  ctx.fillStyle = '#3A4A62'; ctx.fillRect(x - 220 * s, y, 440 * s, 16 * s);
  ctx.save(); ctx.translate(x, y + dy); ctx.fillStyle = CAST.sam.huid; ctx.beginPath(); ctx.moveTo(-34 * s, -40 * s); ctx.lineTo(-20 * s, -300 * s); ctx.lineTo(28 * s, -300 * s); ctx.lineTo(22 * s, -40 * s); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2A2F3E'; ctx.fillRect(-30 * s, -330 * s, 64 * s, 40 * s); SP5_schoen(ctx, 10 * s, -16 * s, 3.2 * s, '#D8573F'); ctx.restore();
  if (u >= 1) { const k = clamp((t % 0.9) / 0.9, 0, 1); ctx.strokeStyle = rgba(C.koraal, 1 - k); ctx.lineWidth = 4; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(x, y, (60 + 80 * k) * s, d > 0 ? -0.4 : Math.PI + 0.4, d > 0 ? 0 : Math.PI, d < 0); ctx.stroke(); } }
  ctx.restore(); }
// loopband met twee zichtbare rollen (icoon)
function SP5_loopband(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 6 * s; ctx.lineCap = 'round';
  roundRect(ctx, x - 150 * s, y - 24 * s, 300 * s, 30 * s, 15 * s); shape(ctx, '#2A3A58', C.line, 2); for (let i = 0; i < 6; i++) { const xx = x - 130 * s + ((i * 52 * s + t * 60 * s) % (260 * s)); ctx.beginPath(); ctx.moveTo(xx, y - 18 * s); ctx.lineTo(xx, y); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x + 120 * s, y - 24 * s); ctx.lineTo(x + 150 * s, y - 170 * s); ctx.lineTo(x + 90 * s, y - 180 * s); ctx.stroke(); roundRect(ctx, x + 60 * s, y - 210 * s, 80 * s, 40 * s, 6 * s); shape(ctx, '#2A3A58', C.line, 2); ctx.restore(); }
// klein grafiekje: tijden in het water (hoger = sneller); u = hoeveel van de lijn, zak = val aan het eind
function SP5_tijdGrafiek(ctx, x, y, w, h, u, zak, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, 'WEKEN', 'SNELHEID IN HET WATER');
  const P = []; for (let i = 0; i <= 20; i++) { const f = i / 20; let v = 0.35 + 0.35 * f; if (f > 0.6) v -= zak * (f - 0.6) * 1.2; P.push([x + f * w, y + h - v * h]); }
  const m = Math.max(2, Math.round(P.length * clamp(u, 0, 1))); lijn(ctx, P.slice(0, m), zak > 0.3 ? C.koraal : C.teal, 6); ctx.restore(); }

// zwemslagpictogram: kleine zwemmer op een korte waterlijn (geen mensfiguur in een kaartje: het castpersonage zelf)
function SP5_slagPict(ctx, id, x, y, L, slag, fz, a = 1, outfit) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dy = slag === 'rug' ? 0.07 : 0.12; const r = zwemmer(ctx, id, x, y + dy * L, L, { slag, t: fz, kijk: 1, outfit });
  SP5_waterlijn(ctx, x - L * 0.75, x + L * 0.75, y, 0, 1); ctx.restore(); return r; }
// Wat word jij? · Sport en topsport 5 · Ook nog hardlopen? — scènes per alinea (v1.0, 19 nov 2026)
// Look: Schema met cast. Zwembad (vlak getekend) alleen onder scènes die in het bad spelen (cold open, H1 duik, H2 startblok, H3 jongste groep, H4 klembord).
// Lichaam, spieren en botten op gewoon navy. Geen namen in beeld; vrienden en ouders zijn figuranten.

// tijdlijnen 8 → 22 jaar (H3): route A alleen zwemmen, route B tot 13 ook voetbal en atletiek
const SP5_TL = { x0: 420, x1: 1720, yA: 360, yB: 520, yAs: 600 };
function SP5_ax(age) { return lerp(SP5_TL.x0, SP5_TL.x1, (age - 8) / 14); }
function SP5_tijdlijnen(ctx, t, a = 1, o = {}) { if (a <= 0.01) return; const T = SP5_TL; ctx.save(); ctx.globalAlpha *= a;
  // rijkoppen
  for (const [y, k, col] of [[T.yA, 'A', C.teal], [T.yB, 'B', C.groen]]) { circ(ctx, 170, y, 34, rgba(col, 0.3), col, 3); text(ctx, k, 170, y + 13, fTekst(36, 800), C.text, 'center'); }
  SP5_golfIcoon(ctx, 280, T.yA, 1.1, C.teal);
  SP5_bal(ctx, 250, T.yB - 26, 0.9, C.groen); SP5_horde(ctx, 320, T.yB - 24, 0.75, C.oker); SP5_golfIcoon(ctx, 285, T.yB + 30, 0.9, C.teal);
  // balken
  roundRect(ctx, T.x0, T.yA - 22, T.x1 - T.x0, 44, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2);
  const x13 = SP5_ax(13); [[C.teal, -24], [C.groen, -8], [C.oker, 8]].forEach(([col, dy]) => { roundRect(ctx, T.x0, T.yB + dy - 7, x13 - T.x0, 14, 6); shape(ctx, rgba(col, 0.7), col, 1.5); });
  roundRect(ctx, x13, T.yB - 22, T.x1 - x13, 44, 12); shape(ctx, rgba(C.teal, 0.55), C.teal, 2);
  // as
  lijn(ctx, [[T.x0, T.yAs], [T.x1, T.yAs]], C.line, 2); for (let ag = 8; ag <= 22; ag += 2) { const x = SP5_ax(ag); lijn(ctx, [[x, T.yAs - 8], [x, T.yAs + 8]], C.line, 2); metaText(ctx, String(ag), x, T.yAs + 44, C.text2, 'center', 28); }
  metaText(ctx, 'LEEFTIJD', T.x0 - 40, T.yAs + 44, C.text2, 'right', 28);
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const Y = 700; ctx.fillStyle = SP5.tegel; ctx.fillRect(1180, Y - 30, 420, 180); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(1180, Y - 34, 426, 10);
    ctx.fillStyle = SP5.water; ctx.fillRect(1600, Y, 320, 150); SP5_waterlijn(ctx, 1600, 1920, Y, t, 1);
    SP5_startblok(ctx, 1598, Y - 34 - 128, 0.8, 4, 150); const s = zwemmer(ctx, 'sam', 1598, Y - 34 - 128, 340, { slag: 'startblok', kijk: 1 }); SP5_wig(ctx, s, Y - 34 - 128 + 12); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { SP5_badKant(ctx, t); const Ac = q.on('acht', 1, 0.5), Vr = q.on('vrienden', 1, 0.4), Hl = q.on('hardlopen', 1, 0.6), Wd = q.on('snelheid', 1, 0.5);
    trainer(ctx, 1790, t, { kijk: -1, uit: 'neutraal' });
    sam(ctx, 330, t, { pose: Vr > 0.5 ? 'vasthouden' : 'staan', uit: Vr > 0.5 ? 'blij' : 'neutraal', hold: Vr > 0.5 ? (c, hx, hy) => SP5_telefoon(c, hx, hy - 20, 1.3) : null });
    laag(ctx, (1 - Wd), () => { SP5_week(ctx, 600, 150, { a: Ac, loop: Hl, drop: 1 });
      laag(ctx, Hl, () => vraagteken(ctx, 1420, 470, 1, 90)); });
    laag(ctx, Vr * (1 - Wd), () => SP5_app(ctx, 90, 300, 'HARDLOPEN? DI DO ZA', 1));
    laag(ctx, Wd, () => { kaart(ctx, 560, 170, 1160, 300, 1, C.goud); text(ctx, 'Extra training', 610, 280, fTekst(60, 800), C.text, 'left'); text(ctx, 'of snelheid kwijt?', 610, 370, fTekst(60, 800), C.text, 'left');
      SP5_tegel(ctx, 1450, 260, 'zwem', C.teal, 1); SP5_tegel(ctx, 1590, 260, 'loop', C.groen, 1); vraagteken(ctx, 1520, 430, 1, 110); }); },

  // ---------- H1 Wat overdraagt ----------
  s03(ctx, t, q) { const ts = q.at('springt', 1), B = q.on('springt', 1, 0.3), Hv = q.on('Hoe', 1, 0.4);
    if (B < 1) { bg(ctx, 'schema'); laag(ctx, 1 - B, () => { ctx.fillStyle = '#7A3E34'; ctx.fillRect(0, GROND, W, 20); ctx.fillStyle = rgba('#F2F2EE', 0.5); for (let x = 0; x < W; x += 140) ctx.fillRect(x, GROND + 8, 70, 3);
      persoon(ctx, 'bilal', 260, GROND, 430, { outfit: 'sport', zij: true, kijk: 1, gang: 'ren', t, vooruit: true }); }); }
    laag(ctx, B, () => { const Y = 470, L = 330, tD = t - ts; SP5_badDoorsnede(ctx, t, Y, { xW: 380 }); SP5_startblok(ctx, 380, Y - 34 - 128, 0.8, 4, 145);
      let hx, hy, an = 0, slag = 'stroomlijn';
      if (tD < 0.9) { const u = clamp(tD / 0.9, 0, 1); hx = 330 + 470 * u; hy = Y - 34 - 128 - 70 - 150 * u + 470 * u * u; an = Math.atan2(-150 + 940 * u, 470); }
      else if (tD < 1.7) { const u = (tD - 0.9) / 0.8; hx = 800 + 260 * u; hy = lerp(Y + 120, Y + 0.12 * L, ease(u)); an = lerp(0.5, 0, ease(u)) * (1 - u) ; }
      else { hx = 1060 + 190 * (tD - 1.7); hy = Y + 0.12 * L; slag = 'crawl'; }
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); const r = zwemmer(ctx, 'bilal', 0, 0, L, { slag, t, kijk: 1 }); ctx.restore();
      if (tD > 1.7) SP5_waterlijn(ctx, hx - L * 0.7, hx + L * 0.8, Y, t, 1);
      SP5_spat(ctx, 830, Y, (tD - 0.75) / 0.9, 1);
      laag(ctx, Hv, () => vraagteken(ctx, hx + 40, Y - 120, 1, 120)); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: hij is niet getraind voor zwemmen', 1 - q.on('Bij', 1, 0.5));
    const Mi = q.on('mitochondriën', 1, 0.3), Pr = q.on('proef', 1, 0.3), On = q.on('onderzoek', 2, 0.3), Gz = q.on('getrainde', 1, 0.3);
    const tA = 1 - Mi, tB = Mi * (1 - Pr), tC = Pr * (1 - On), tD = On * (1 - Gz), tE = Gz;
    // A: het hart van de hardloper
    laag(ctx, tA, () => { const r = persoon(ctx, 'bilal', 480, GROND, 600, { t, outfit: 'sport', uit: 'blij' }); const w = SP5_romp(ctx, r, 1, t, 1);
      const Ab = q.on('aerobe', 1, 0.6); if (Ab > 0.01 && w) { const flow = (pts) => { ctx.save(); ctx.globalAlpha *= Ab; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 60; lijn(ctx, pts, C.teal, 7); ctx.restore(); };
        flow([[w.x, w.y], [r.handL.x, r.handL.y]]); flow([[w.x, w.y], [r.handR.x, r.handR.y]]); flow([[w.x, w.y], [r.heup.x - 40, r.heup.y + 40], [r.heup.x - 50, GROND - 30]]); flow([[w.x, w.y], [r.heup.x + 40, r.heup.y + 40], [r.heup.x + 50, GROND - 30]]); }
      SP5_meter(ctx, 1330, 360, 150, 0.35 + 0.35 * q.on('meer', 1, 1.2), 'BLOED PER SLAG', q.on('slag', 1, 0.4), C.koraal);
      laag(ctx, Ab, () => tag(ctx, 'AEROBE BASIS', 1330, 560, C.teal, 1, 'center', 36));
      laag(ctx, q.on('overdracht', 1, 0.5), () => { SP5_tegel(ctx, 1130, 730, 'loop', C.groen, 1, 140, 66); pijl(ctx, 1220, 730, 1430, 730, C.goud, 1, 5, 20); SP5_tegel(ctx, 1520, 730, 'zwem', C.teal, 1, 140, 66); metaText(ctx, 'OVERDRACHT', 1325, 680, C.goud, 'center', 28); }); });
    // B: mitochondriën in de kuit, niet in de schouder
    laag(ctx, tB, () => { const h = 600, r = persoon(ctx, 'bilal', 480, GROND, h, { t, outfit: 'sport' }); const xs = r.hoofd.x + 0.12 * h, ys = GROND - 0.8 * h, xk = r.heup.x + 0.07 * h, yk = GROND - 0.16 * h;
      metaText(ctx, 'NA LOOPTRAINING', 1290, 200, C.text2, 'center', 28);
      zoomCircle(ctx, 1020, 470, 190, xs, ys, '', 1, () => SP5_vezels(ctx, 1020, 470, 190, 5, 0, t)); naamBij(ctx, 'schouderspier', 'gelijk', 1020, 710, 1, 'center');
      zoomCircle(ctx, 1540, 470, 190, xk, yk, '', 1, () => SP5_vezels(ctx, 1540, 470, 190, 5, 6 * ramp(t, q.at('mitochondriën', 1) + 0.5, 2.5), t)); naamBij(ctx, 'kuitspier', 'meer mitochondriën', 1540, 710, 1, 'center', C.groen);
      metaA(ctx, 'BEWEGINGSWETENSCHAP · INSPANNINGSFYSIOLOGIE', 1290, 820, q.on('Bewegingswetenschappers', 1, 0.5), C.goud, 'center', 28); });
    // C: één been getraind (Saltin 1976)
    laag(ctx, tC, () => { SP5_benen(ctx, 560, 560, 1.0, C.groen, '#7A8494'); naamBij(ctx, 'getraind', '', 440, 820, 1, 'right', C.groen); naamBij(ctx, 'niet getraind', '', 680, 820, 1, 'left', C.text2);
      metaText(ctx, 'SALTIN E.A. 1976 · 4 WEKEN', 1290, 200, C.grain, 'center', 28);
      const En = q.on('enzym', 1, 0.5); zoomCircle(ctx, 1300, 480, 220, 485, 460, '', q.on('Alleen', 1, 0.5), () => SP5_vezels(ctx, 1300, 480, 220, 5, 6 * En, t));
      naamBij(ctx, 'meer enzym van de mitochondriën', '', 1300, 760, En, 'center', C.groen); });
    // D: één onderzoek op de loopband
    laag(ctx, tD, () => { SP5_loopband(ctx, 380, 560, 1.4, 1, t); metaText(ctx, 'WINST OP DE LOOPBAND', 380, 640, C.text2, 'center', 28);
      const u1 = ramp(t, q.at('zwemtraining', 1), 1.2), u2 = ramp(t, q.at('looptraining', 1), 1.2);
      SP5_staaf(ctx, 760, 330, 820, 0.83 * u1, C.teal, 'zwemtraining', u1 > 0.9 ? '+25 %' : '', 1); SP5_staaf(ctx, 760, 500, 820, 0.93 * u2, C.groen, 'looptraining', u2 > 0.9 ? '+28 %' : '', q.on('looptraining', 1, 0.4));
      metaText(ctx, '37 MANNEN, NIET-SPORTERS', 760, 640, C.text2, 'left', 28); metaText(ctx, 'ÉÉN ONDERZOEK · MSSE 1989', 760, 700, C.grain, 'left', 28); });
    // E: de goed getrainde zwemmer
    laag(ctx, tE, () => { const r = sam(ctx, 480, t, { h: 600, uit: 'blij' }); const w = SP5_romp(ctx, r, 1, t, 1); SP5_meter(ctx, 1330, 360, 150, 0.85, 'HART AL STERK', 1, C.koraal);
      const Wa = q.on('water', 1, 0.6); if (w) laag(ctx, Wa, () => { pijl(ctx, w.x + 30, w.y - 60, r.handL.x + 20, r.hoofd.y + 150, C.teal, 1, 5, 18); pijl(ctx, w.x - 60, w.y - 60, r.handR.x - 20, r.hoofd.y + 150, C.teal, 1, 5, 18); tag(ctx, 'IN HET WATER GETRAIND', 1330, 640, C.teal, 1, 'center', 36); }); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const Hb = q.on('Hebben', 1, 0.5);
    laag(ctx, 1 - q.on('Hebben', 1, 0.4), () => { SP5_schoen(ctx, 360, 420, 3, C.groen); metaText(ctx, 'LOPEN', 360, 520, C.groen, 'center', 28); });
    laag(ctx, Hb, () => { SP5_scheenbeen(ctx, 960, 480, 660, 1); metaText(ctx, 'SCHEENBEEN · DOORSNEDE', 960, 110, C.text2, 'center', 28);
      naamBij(ctx, 'sponsbot', '', 1080, 200, 1, 'left'); naamBij(ctx, 'schors', '', 1030, 560, 1, 'left'); naamBij(ctx, 'mergholte', '', 880, 460, 1, 'right'); });
    laag(ctx, q.on('Wat', 1, 0.5), () => vraagteken(ctx, 1400, 560, 1, 160)); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: even sterk, het water draagt je', 1 - q.on('onderzoek', 2, 0.5));
    const Vi = q.on('vierenzestig', 1, 0.3), Jo = q.on('onderzoek', 2, 0.3), tA = 1 - Vi, tB = Vi * (1 - Jo), tC = Jo;
    laag(ctx, tA, () => { const Y = 420; ctx.fillStyle = SP5.water; ctx.fillRect(120, Y, 760, 400); ctx.fillStyle = SP5.waterD; ctx.fillRect(120, Y + 220, 760, 180);
      zwemmer(ctx, 'sam', 500, Y + 0.12 * 340, 340, { slag: 'crawl', t, kijk: 1 }); SP5_waterlijn(ctx, 120, 880, Y, t, 1);
      const Dr = q.on('draagt', 1, 0.5); for (let i = 0; i < 4; i++) { const x = 260 + i * 160, k = (t * 0.6 + i * 0.25) % 1; pijl(ctx, x, 790 - 40 * k, x, 600 - 40 * k, C.teal, Dr, 6, 22); }
      naamBij(ctx, 'het water draagt je', '', 500, 360, Dr, 'center', C.teal);
      SP5_voetStoot(ctx, 1400, 780, 1.1, ramp(t, q.at('stoten', 1) - 0.4, 0.4), 1, t);
      laag(ctx, q.on('stoten', 1, 0.4), () => tag(ctx, 'STOOT', 1400, 360, C.koraal, 1, 'center', 40)); });
    laag(ctx, tB, () => { metaText(ctx, 'GÓMEZ-BRUTON E.A. 2013 · 64 ONDERZOEKEN', 960, 220, C.grain, 'center', 28); const base = 720; lijn(ctx, [[400, base], [1520, base]], C.line, 2);
      const bars = [[600, 0.42, C.teal, 'ZWEMMERS'], [960, 0.42, '#7A8494', 'NIET-SPORTERS'], [1320, 0.68, C.oker, 'SPORT MET STOTEN']];
      bars.forEach(([x, hgt, col, lab], i) => { const u = ramp(t, q.at('zwemmers', 1) + i * 0.3, 0.8); roundRect(ctx, x - 90, base - 420 * hgt * u, 180, 420 * hgt * u, 8); shape(ctx, rgba(col, 0.7), col, 2); metaText(ctx, lab, x, base + 44, C.text2, 'center', 28); });
      text(ctx, '≈', 780, base - 200, fTitel(80), C.text, 'center'); text(ctx, '<', 1140, base - 220, fTitel(80), C.text, 'center'); metaText(ctx, 'BOTSTERKTE', 400, 300, C.text2, 'left', 28); });
    laag(ctx, tC, () => { metaText(ctx, 'VLACHOPOULOS E.A. 2018 · JONGENS · 9 MAANDEN', 960, 160, C.grain, 'center', 28);
      ctx.fillStyle = SP5.tegel; ctx.fillRect(160, GROND, 700, 20); const Sp = q.on('sprongen', 2, 0.3), jy = Sp * 130 * Math.abs(Math.sin(t * Math.PI * 1.25));
      persoon(ctx, 'daan', 500, GROND - jy, 400, { t, outfit: 'zwem', uit: 'blij' });
      const He = q.on('heup', 1, 0.5), Be = q.on('benen', 1, 0.5); SP5_beenSkelet(ctx, 1300, 600, 0.8, { hals: He, been: Be }, 1);
      naamBij(ctx, 'heup', 'dijbeenhals', 1400, 300, He, 'left', C.oker); naamBij(ctx, 'beenbot', '', 1390, 640, Be, 'left', C.oker); }); },

  // ---------- H2 Wat schuurt ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const Me = q.on('meteen', 1, 0.25), Ri = q.on('risico', 1, 0.5);
    SP5_week(ctx, 300, 300, { loop: Me, drop: 0.3 }); laag(ctx, Me, () => metaText(ctx, 'VANAF MAANDAG', 830, 700, C.groen, 'center', 28));
    sam(ctx, 1640, t, { kijk: -1, uit: Ri > 0.5 ? 'verbaasd' : 'neutraal' }); laag(ctx, Ri, () => vraagteken(ctx, 1640, 380, 1, 110)); },

  s11(ctx, t, q) { const Tr = q.on('triatleten', 1, 0.3), Em = q.on('emmer', 2, 0.4), tA = 1 - Tr, tB = Tr * (1 - Em), tC = Em;
    bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: hij herstelt slechter, kans op blessure', 1 - q.on('voorbeeld', 1, 0.4));
    laag(ctx, tA, () => { ctx.fillStyle = SP5.gras; ctx.fillRect(0, 800, W, 80); ctx.fillStyle = SP5.pad; ctx.fillRect(0, 840, W, 40);
      laag(ctx, q.on('voorbeeld', 1, 0.4), () => { tag(ctx, 'VOORBEELD', 120, 150, C.text2, 1, 'left', 30); roundRect(ctx, 120, 200, 200, 120, 12); shape(ctx, '#F2EEE4', null); ctx.fillStyle = C.koraal; ctx.fillRect(120, 200, 200, 34); text(ctx, 'WEEK 2', 220, 300, fTekst(40, 800), '#1A2740', 'center'); });
      const Ts = q.on('snel', 2, 0.3), Sc = q.on('scheenbenen', 1, 0.5), Bn = q.on('benen', 2, 0.5), h = 430, x = 620;
      sam(ctx, x, t, { outfit: 'sport', uit: Sc > 0.5 ? 'moe' : 'neutraal' });
      const pi = Math.max(Sc * 0.7, Bn); if (pi > 0.01) for (const d of [-1, 1]) { ctx.save(); ctx.globalAlpha *= pi; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + d * 0.05 * h, GROND - 0.15 * h, 0.035 * h, 0.1 * h, 0, 0, 6.283); ctx.stroke();
        ctx.lineWidth = 4; ctx.beginPath(); const zx = x + d * 0.12 * h; ctx.moveTo(zx, GROND - 0.22 * h); ctx.lineTo(zx + d * 14, GROND - 0.19 * h); ctx.lineTo(zx, GROND - 0.16 * h); ctx.lineTo(zx + d * 14, GROND - 0.13 * h); ctx.stroke(); ctx.restore(); }
      laag(ctx, q.on('hart', 1, 0.4), () => { SP5_hart(ctx, x - 150, 420, 1.6, C.groen); vink_(ctx, x - 150, 360, 16, 1, C.groen); });
      trainer(ctx, 960, t, { kijk: -1, pose: Ts > 0.5 ? 'wijs' : 'staan', uit: Ts > 0.5 ? 'praat' : 'neutraal' });
      laag(ctx, q.on('schema', 1, 0.5), () => { SP5_klembord(ctx, 1220, 220, 560, 440, 1); text(ctx, 'drie keer', 1500, 340, fTekst(48, 800), '#1A2740', 'center');
        text(ctx, '5 KM', 1500, 440, fTekst(80, 800), Ts > 0.5 ? C.koraal : '#1A2740', 'center'); text(ctx, 'vanaf week 1', 1500, 540, fTekst(44, 700), '#1A2740', 'center');
        laag(ctx, Ts, () => stempel(ctx, 1500, 625, 'TE SNEL', C.koraal, 1, -0.1)); }); });
    laag(ctx, tB, () => { metaText(ctx, 'GUEVARA E.A. 2024 · TRIATLETEN', 960, 150, C.grain, 'center', 28);
      SP5_tegel(ctx, 620, 290, 'zwem', C.teal, 1, 170, 80); SP5_tegel(ctx, 960, 290, 'fiets', C.line, 1, 170, 80); SP5_tegel(ctx, 1300, 290, 'loop', C.koraal, 1, 170, 80);
      text(ctx, '45–92 % van de blessures', 1300, 410, fTekst(40, 800), C.koraal, 'center'); metaText(ctx, 'KORTE AFSTAND', 1300, 455, C.text2, 'center', 28);
      const La = q.on('langzaam', 1, 0.5); SP5_trap(ctx, 220, 820, 9, 60, 28, La, C.groen, ramp(t, q.at('langzaam', 1), 1.5)); naamBij(ctx, 'langzaam opbouwen', '', 220, 560, La, 'left', C.groen);
      kaartTekst(ctx, 1080, 600, 640, 140, '', ['fysiotherapeut · sportarts'], q.on('fysiotherapeut', 1, 0.5), C.teal); });
    laag(ctx, tC, () => { const s = 1.15, tg = []; const t8 = q.at('Acht', 1), t3 = q.at('lopen', 2);
      for (let i = 0; i < 8; i++) { const u = ramp(t, t8 + i * 0.12, 0.35); tg.push({ soort: 'zwem', kl: C.teal, a: u, drop: (1 - u) * 300 }); }
      for (let i = 0; i < 3; i++) { const u = ramp(t, t3 + i * 0.15, 0.35); tg.push({ soort: 'loop', kl: C.groen, a: u, drop: (1 - u) * 300 }); }
      SP5_emmer(ctx, 960, 780, s, { vul: 0.1 + 0.62 * ramp(t, t8, 1.6) + 0.28 * ramp(t, t3, 1.6), tegels: tg, t });
      naamBij(ctx, 'één emmer voor alles samen', '', 960, 150, q.on('samen', 1, 0.5), 'center'); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const Ov = q.on('overzicht', 1, 0.5), Dz = q.on('dezelfde', 1, 0.5), St = q.on('startblok', 1, 0.3), Tz = q.on('trainer', 1, 0.3);
    const tA = 1 - Ov, tB = Ov * (1 - Dz), tC = Dz * (1 - St), tD = St * (1 - Tz), tE = Tz;
    laag(ctx, tA, () => { ctx.fillStyle = SP5.tegel; ctx.fillRect(160, 760, 760, 120); ctx.fillStyle = '#C9D2DC'; ctx.fillRect(160, 756, 760, 8);
      SP5_startblok(ctx, 620, 600, 1, 4, 190); const s = zwemmer(ctx, 'sam', 620, 600, 430, { slag: 'startblok', kijk: 1 }); SP5_wig(ctx, s, 612);
      SP5_meter(ctx, 1420, 330, 150, 0.85, 'EXPLOSIEVE KRACHT', 1, C.oker);
      laag(ctx, q.on('interferentie', 1, 0.5), () => tag(ctx, 'INTERFERENTIE-EFFECT', 1420, 120, C.goud, 1, 'center', 34));
      const Tw = q.on('Twee', 1, 0.5), Af = q.on('afremmen', 1, 0.6), d = 150 * Tw - 40 * Af;
      laag(ctx, Tw, () => { pijl(ctx, 1080, 640, 1080 + d + 120, 640, C.oker, 1, 8, 26); pijl(ctx, 1760, 640, 1760 - d - 120, 640, C.groen, 1, 8, 26);
        metaText(ctx, 'KRACHT', 1100, 600, C.oker, 'left', 28); metaText(ctx, 'DUUR', 1740, 600, C.groen, 'right', 28); laag(ctx, Af, () => kruis(ctx, 1420, 640, 22, 1, C.koraal)); }); });
    laag(ctx, tB, () => { metaText(ctx, 'SCHUMANN E.A. 2021 · 43 ONDERZOEKEN', 960, 160, C.grain, 'center', 28); const x = 560, w = 1000, Ex = q.on('explosieve', 1, 0.5);
      metaText(ctx, 'KRACHT + DUUR, VERGELEKEN MET ALLEEN KRACHT', x, 230, C.text2, 'left', 28);
      SP5_staaf(ctx, x, 330, w, 0.9 * ramp(t, q.at('maximale', 1), 0.8), C.oker, 'maximale kracht', '', 1); SP5_staaf(ctx, x, 480, w, 0.9 * ramp(t, q.at('spiergroei', 1), 0.8), C.oker, 'spiergroei', '', q.on('spiergroei', 1, 0.4));
      SP5_staaf(ctx, x, 630, w, 0.9 - 0.2 * ramp(t, q.at('minder', 1), 0.8), C.koraal, 'explosieve kracht', '', Ex);
      lijn(ctx, [[x + 0.9 * w, 290], [x + 0.9 * w, 700]], C.text2, 2); metaText(ctx, 'ALLEEN KRACHT', x + 0.9 * w, 750, C.text2, 'center', 28);
      laag(ctx, q.on('nauwelijks', 1, 0.4), () => text(ctx, '≈', x + 0.9 * w + 70, 440, fTitel(72), C.text, 'center')); laag(ctx, q.on('soms', 1, 0.4), () => text(ctx, 'soms minder', x + 0.7 * w + 30, 618, fTekst(36, 700), C.koraal, 'left')); });
    laag(ctx, tC, () => { roundRect(ctx, 660, 300, 600, 340, 18); shape(ctx, '#F2EEE4', C.koraal, 4); ctx.fillStyle = C.koraal; ctx.fillRect(660, 300, 600, 60); text(ctx, 'één training', 960, 345, fTekst(40, 800), '#1A2740', 'center');
      SP5_tegel(ctx, 840, 500, 'kracht', C.oker, 1, 180, 100); text(ctx, '+', 960, 520, fTitel(64), '#1A2740', 'center'); SP5_tegel(ctx, 1080, 500, 'loop', C.groen, 1, 180, 100); });
    laag(ctx, tD, () => { const Y = 470, ts = q.at('startblok', 1), tk = q.at('keerpunt', 1), L = 330; SP5_badDoorsnede(ctx, t, Y, { xW: 380, xR: 1800 }); SP5_startblok(ctx, 380, Y - 34 - 128, 0.8, 4, 145);
      if (t < tk) { const u = clamp((t - ts) / 0.9, 0, 1); if (u <= 0.01) SP5_wig(ctx, zwemmer(ctx, 'sam', 380, Y - 34 - 128, L, { slag: 'startblok', kijk: 1 }), Y - 34 - 128 + 12); else { const hx = 330 + 470 * u, hy = Y - 232 - 150 * u + 470 * u * u, an = Math.atan2(-150 + 940 * u, 470); ctx.save(); ctx.translate(hx, hy); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, L, { slag: 'stroomlijn', fase: 0, kijk: 1 }); ctx.restore(); SP5_spat(ctx, 830, Y, (t - ts - 0.75) / 0.9, 1); } naamBij(ctx, 'startblok', '', 300, 250, 1, 'center', C.oker); }
      else { const u = clamp((t - tk) / 1.6, 0, 1); zwemmer(ctx, 'sam', 1790 - 0.62 * L - 500 * ease(u), Y + 180, L, { slag: 'onderwater', t, kijk: -1 }); naamBij(ctx, 'keerpunt', 'afzetten', 1700, 300, 1, 'center', C.oker); pijl(ctx, 1780, 560, 1700, 560, C.oker, 1 - u, 6, 20); }
      laag(ctx, q.on('genuanceerd', 1, 0.5), () => tag(ctx, 'BEWIJS GENUANCEERD', 960, 150, C.text2, 1, 'center', 32)); });
    laag(ctx, tE, () => { trainer(ctx, 330, t, { kijk: 1, uit: 'praat', pose: 'staan' }); const u = ramp(t, q.at('niet', 1), 1.4);
      roundRect(ctx, 640, 260, 1100, 380, 18); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); lijn(ctx, [[1190, 280], [1190, 620]], C.line, 2);
      metaText(ctx, 'OCHTEND', 915, 320, C.text2, 'center', 28); metaText(ctx, 'MIDDAG', 1465, 320, C.text2, 'center', 28);
      SP5_tegel(ctx, lerp(1110, 915, u), 470, 'kracht', C.oker, 1, 180, 100); SP5_tegel(ctx, lerp(1270, 1465, u), 470, 'loop', C.groen, 1, 180, 100);
      metaA(ctx, 'NIET DIRECT NA ELKAAR', 1190, 700, u, C.goud, 'center', 28); }); },

  // ---------- H3 Vroeg specialiseren of breed sporten ----------
  s13(ctx, t, q) { const Je = q.on('Je', 1, 0.3), Wd = q.on('Wat', 1, 0.3), tA = 1 - Je, tB = Je * (1 - Wd), tC = Wd;
    if (tA > 0.01) { SP5_badKant(ctx, t, { a: 1, blokken: false }); laag(ctx, tA, () => {
      [[0, 'kind'], [1, 'jens'], [2, 'kind'], [3, 'jens']].forEach(([i, id]) => { const L = 130, x = 900 + ((i * 260 + t * 70) % 1000); zwemmer(ctx, id, x, 610 + (i % 2) * 34 + 0.12 * L, L, { slag: 'crawl', t: t + i * 0.3, kijk: 1, outfit: i < 2 ? 'zwem' : 'zwemB' }); SP5_waterlijn(ctx, x - 90, x + 100, 610 + (i % 2) * 34, t, 1); });
      trainer(ctx, 1180, t, { kijk: 1 }); persoon(ctx, 'kind', 1420, GROND, 330, { t, outfit: 'zwem', kijk: -1 }); persoon(ctx, 'jens', 1580, GROND, 340, { t, outfit: 'zwem', kijk: -1, uit: 'blij' });
      persoon(ctx, 'dennis', 300, GROND, 450, { t, kijk: 1, outfit: 'jas' }); persoon(ctx, 'marieke', 520, GROND, 430, { t, kijk: 1, outfit: 'jas', uit: q.on('vragen', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
      laag(ctx, q.on('vragen', 1, 0.5), () => vraagteken(ctx, 410, 330, 1, 110)); }); } else bg(ctx, 'schema');
    laag(ctx, tB, () => { bg(ctx, 'schema'); persoon(ctx, 'jens', 330, GROND, 340, { t, outfit: 'zwem', uit: 'blij' });
      const Hj = ramp(t, q.at('hele', 1), 1.2); const M = 'JFMAMJJASOND'; for (let i = 0; i < 12; i++) { const x = 640 + i * 95; roundRect(ctx, x, 380, 80, 120, 10); shape(ctx, i < 12 * Hj ? rgba(C.teal, 0.6) : '#22304A', i < 12 * Hj ? C.teal : rgba(C.line, 0.5), 2); metaText(ctx, M[i], x + 40, 360, C.text2, 'center', 28); if (i < 12 * Hj) SP5_golfIcoon(ctx, x + 40, 440, 0.7, lighten(C.teal, 0.3)); }
      metaText(ctx, 'HET HELE JAAR', 1160, 560, C.text2, 'center', 28); laag(ctx, q.on('specialiseren', 1, 0.5), () => tag(ctx, 'SPECIALISEREN', 1160, 680, C.goud, 1, 'center', 40)); });
    laag(ctx, tC, () => { bg(ctx, 'schema'); SP5_tijdlijnen(ctx, t, 1); metaText(ctx, 'VOORBEELD', 1800, 200, C.text2, 'right', 28); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: bij de jeugd helpt het, later minder vaak', 1 - q.on('Bij', 1, 0.5));
    const Br = q.on('Breed', 2, 0.6); const T = SP5_TL;
    laag(ctx, 1 - Br, () => { SP5_tijdlijnen(ctx, t, 1);
      metaA(ctx, 'GÜLLICH E.A. 2021 · 51 ONDERZOEKEN · 6096 SPORTERS', 960, 230, q.on('eenenvijftig', 1, 0.5) * (1 - q.on('Heel', 1, 0.5)), C.grain, 'center', 28);
      const Je = q.on('jeugd', 1, 0.5), Vo = q.on('volwassen', 1, 0.5);
      laag(ctx, Je, () => { SP5_podium(ctx, SP5_ax(14), 860, 1.25, { a: 1, b: 3 }); metaText(ctx, 'JEUGD', SP5_ax(14), 680, C.text2, 'center', 28); lijn(ctx, [[SP5_ax(14), T.yAs - 16], [SP5_ax(14), T.yAs + 16]], C.goud, 5); });
      laag(ctx, Vo, () => { SP5_podium(ctx, SP5_ax(20.6), 860, 1.25, { a: 3, b: 1 }); metaText(ctx, 'VOLWASSEN · GEMIDDELD', SP5_ax(20.6) - 60, 680, C.text2, 'center', 28); lijn(ctx, [[SP5_ax(22), T.yAs - 16], [SP5_ax(22), T.yAs + 16]], C.goud, 5); });
      const Ob = q.on('overbelastingsblessures', 1, 0.5); laag(ctx, Ob * (1 - Br), () => { SP5_label(ctx, 'VAKER OVERBELASTING · EERDER GESTOPT', 420, 205, C.koraal, 1, 32); metaText(ctx, 'ASMC · JAYANTHI E.A. 2019', 1730, 280, C.grain, 'right', 28); });
      laag(ctx, q.on('samenhang', 1, 0.5) * (1 - q.on('Toch', 1, 0.5)), () => SP5_label(ctx, 'SAMENHANG ≠ OORZAAK', 1720, 120, C.goud, 1, 32, 'right'));
      const Tw = q.on('twaalf', 1, 0.5); laag(ctx, Tw, () => { const x = SP5_ax(12); ctx.save(); ctx.setLineDash([12, 10]); lijn(ctx, [[x, 300], [x, T.yAs]], C.goud, 4); ctx.restore(); tag(ctx, 'ROND 12 JAAR', x, 290, C.goud, 1, 'center', 30); }); });
    laag(ctx, Br, () => { metaText(ctx, 'BMC RES NOTES 2024 · RACEUITSLAGEN', 960, 230, C.grain, 'center', 28); const Na = q.on('Naarmate', 1, 0.8);
      const S = [['crawl', 360], ['rug', 760], ['school', 1160], ['vlinder', 1560]]; S.forEach(([sl, x], i) => SP5_slagPict(ctx, 'jens', x, 430, 220, sl, t + i * 0.2, i === 0 || i === 2 ? 1 : 1 - 0.75 * Na, 'zwem') || 0);
      ['50 M', '100 M', '200 M', '400 M'].forEach((d, i) => tag(ctx, d, 560 + i * 270, 680, C.teal, i === 1 || i === 2 ? 1 : 1 - 0.75 * Na, 'center', 32));
      laag(ctx, q.on('junior', 1, 0.5) * (1 - Na), () => tag(ctx, 'ALS JUNIOR: BREED', 960, 800, C.groen, 1, 'center', 32));
      laag(ctx, Na, () => tag(ctx, 'OUDER: STEEDS MEER KIEZEN', 960, 800, C.goud, 1, 'center', 32)); }); },

  // ---------- H4 Aanvulling of concurrent ----------
  s16(ctx, t, q) { SP5_badKant(ctx, t, { blokken: false }); const Wa = q.on('mist', 1, 0.5), Ho = q.on('Hoeveel', 1, 0.5), Wn = q.on('Wanneer', 1, 0.5), Ko = q.on('Kost', 1, 0.5);
    metaText(ctx, 'WEEK 3', 120, 140, C.text2, 'left', 28);
    sam(ctx, 260, t, { kijk: 1, uit: Ko > 0.5 ? 'verbaasd' : 'neutraal' }); trainer(ctx, 560, t, { kijk: -1, uit: 'praat' }); laag(ctx, Ko, () => vraagteken(ctx, 260, 380, 1, 110));
    const X = 860, Yb = 110, Wb = 960, P = '#1A2740'; SP5_klembord(ctx, X, Yb, Wb, 740, q.on('klembord', 1, 0.5));
    laag(ctx, Wa, () => { text(ctx, 'Wat mist het water?', X + 60, Yb + 120, fTekst(46, 800), P, 'left'); SP5_botIcoon(ctx, X + 140, Yb + 200, 1.3, C.oker); text(ctx, 'stoten', X + 210, Yb + 213, fTekst(36, 700), '#8A6A2C', 'left');
      laag(ctx, q.on('hoofd', 1, 0.4), () => { SP5_hoofdIcoon(ctx, X + 470, Yb + 196, 1.2, '#2E6F8F'); text(ctx, 'iets anders', X + 530, Yb + 213, fTekst(36, 700), '#2E6F8F', 'left'); }); });
    laag(ctx, Ho, () => { text(ctx, 'Hoeveel?', X + 60, Yb + 330, fTekst(46, 800), P, 'left'); laag(ctx, q.on('twintig', 1, 0.4), () => text(ctx, '2 × 20 min', X + 60, Yb + 400, fTekst(40, 700), '#2F6A3C', 'left'));
      laag(ctx, q.on('elke', 1, 0.4), () => { text(ctx, 'elke week iets meer', X + 330, Yb + 400, fTekst(36, 700), '#2F6A3C', 'left'); SP5_trap(ctx, X + 700, Yb + 410, 4, 30, 14, 1, '#2F6A3C'); }); });
    laag(ctx, Wn, () => { text(ctx, 'Wanneer?', X + 60, Yb + 520, fTekst(46, 800), P, 'left'); const y = Yb + 570, x0 = X + 60, w = Wb - 120;
      const He = q.on('herfst', 1, 0.5), Ka = q.on('kampioenschap', 1, 0.5); roundRect(ctx, x0, y, w, 50, 10); shape(ctx, '#D8D2C4', null);
      laag(ctx, He, () => { roundRect(ctx, x0, y, w * 0.45, 50, 10); shape(ctx, rgba(C.groen, 0.85), null); text(ctx, 'herfst: opbouw', x0 + 20, y + 36, fTekst(30, 800), P, 'left'); SP5_schoen(ctx, x0 + w * 0.4, y + 24, 0.8, '#1F4A2C'); });
      laag(ctx, Ka, () => { roundRect(ctx, x0 + w * 0.68, y, w * 0.32, 50, 10); shape(ctx, rgba(C.goud, 0.9), null); text(ctx, 'maart: kampioenschap', x0 + w * 0.69, y + 36, fTekst(28, 800), P, 'left'); kruis(ctx, x0 + w * 0.84, y + 92, 14, 1, C.koraal); SP5_schoen(ctx, x0 + w * 0.84 + 40, y + 94, 0.6, '#8A8478'); }); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: alleen als het zwemtraining of herstel opeet', 1 - q.on('Daarom', 1, 0.5));
    const Da = q.on('Daarom', 1, 0.4), Sh = q.on('schouder', 1, 0.3), Ho = q.on('houdt', 1, 0.3), Wl = q.on('doet', 1, 0.3);
    const tA = 1 - Da, tB = Da * (1 - Sh), tC = Sh * (1 - Ho), tD = Ho * (1 - Wl), tE = Wl;
    laag(ctx, tA, () => { SP5_label(ctx, 'AANVULLING', 520, 230, C.goud, 1, 40, 'center'); SP5_label(ctx, 'CONCURRENT', 1400, 230, C.koraal, 1, 40, 'center');
      const To = ramp(t, q.at('toevoegt', 1), 1.0), Op = ramp(t, q.at('opeet', 1), 1.0);
      SP5_tegel(ctx, lerp(960, 520, To), lerp(420, 400, To), 'loop', C.groen, q.on('aanvulling', 1, 0.4), 160, 76); laag(ctx, To, () => { SP5_botIcoon(ctx, 400, 500, 1.1, C.oker); text(ctx, '+', 470, 515, fTekst(40, 800), C.text, 'center'); metaText(ctx, 'WAT ZWEMMEN MIST', 520, 580, C.text2, 'center', 28); });
      laag(ctx, q.on('concurrent', 1, 0.4), () => { SP5_emmer(ctx, 960, 820, 0.62, { vul: 0.7 + 0.35 * Op, over: Op, t, tegels: [], label: 'HERSTEL' }); SP5_tegel(ctx, lerp(960, 1400, Op), lerp(560, 400, Op), 'loop', C.koraal, Op, 160, 76); });
      laag(ctx, q.on('plaats', 1, 0.5), () => { SP5_tegel(ctx, 1400, 520, 'zwem', C.teal, 0.45, 160, 76); kruis(ctx, 1400, 520, 30, 1, C.koraal); }); });
    laag(ctx, tB, () => { const x0 = 300, w = 1320, y = 420, Fa = q.on('fase', 1, 0.5); metaText(ctx, 'EEN SEIZOEN', x0, y - 40, C.text2, 'left', 28);
      [[0, 0.45, C.groen, 'OPBOUW'], [0.45, 0.25, C.goud, 'KAMPIOENSCHAP'], [0.7, 0.3, C.teal, 'RUST']].forEach(([s, l, col, lab]) => { roundRect(ctx, x0 + s * w + 4, y, l * w - 8, 70, 12); shape(ctx, rgba(col, 0.45 * Fa + 0.15), col, 2); metaText(ctx, lab, x0 + (s + l / 2) * w, y + 46, C.text, 'center', 28); });
      const Rw = q.on('rustweken', 1, 0.5); laag(ctx, Rw, () => { const cx = x0 + 0.85 * w; SP5_tegel(ctx, cx - 90, y + 160, 'fiets', C.groen, 1, 150, 70); SP5_tegel(ctx, cx + 90, y + 160, 'loop', C.groen, 1, 150, 70); tag(ctx, 'VOORBEELD', cx, y + 280, C.text2, 1, 'center', 28); naamBij(ctx, 'meer variatie', '', cx, y - 70, 1, 'center', C.groen); }); });
    laag(ctx, tC, () => { const h = 430, x = 480, r = sam(ctx, x, t, { uit: 'neutraal' }); const sx = x - 0.12 * h, sy = GROND - 0.8 * h; ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(sx, sy, 38, 0, 6.283); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'schouder', 'blessure', sx - 60, sy - 30, 1, 'right', C.koraal);
      laag(ctx, q.on('fietsen', 1, 0.5), () => SP5_tegel(ctx, 820, 520, 'fiets', C.groen, 1, 170, 80)); laag(ctx, q.on('hart', 1, 0.5), () => { SP5_hart(ctx, 820, 660, 2, C.groen); metaText(ctx, 'HART IN VORM', 820, 740, C.groen, 'center', 28); });
      trainer(ctx, 1240, t, { kijk: -1, uit: 'praat' }); laag(ctx, q.on('fysiotherapeut', 1, 0.5), () => kaartTekst(ctx, 1400, 300, 420, 110, '', ['fysiotherapeut'], 1, C.teal)); });
    laag(ctx, tD, () => { SP5_klembord(ctx, 160, 200, 640, 600, 1); const P = '#1A2740'; [['tijden', 'tijden'], ['moe', 'moeheid'], ['pijn', 'pijn']].forEach(([w, lab], i) => { const y = 360 + i * 140, v = q.on(w, 1, 0.4); roundRect(ctx, 230, y - 44, 56, 56, 8); shape(ctx, '#FFFFFF', '#8A8478', 2); vink_(ctx, 258, y - 18, 18, v, '#2F6A3C'); text(ctx, lab, 320, y, fTekst(46, 800), P, 'left'); });
      const Ac = q.on('achteruit', 1, 0.8); SP5_tijdGrafiek(ctx, 1000, 280, 760, 380, ramp(t, q.at('tijden', 1), 4), Ac, 1);
      const Te = q.on('terug', 1, 0.6); for (let i = 0; i < 3; i++) SP5_tegel(ctx, 1220 + i * 160, 790, 'loop', C.groen, 1 - Te * (i > 0 ? 1 : 0.6), 130, 60); });
    laag(ctx, tE, () => { const Y = 640, L = 300, x = 300 + ((t - q.at('doet', 1)) * 160) % 1400; ctx.fillStyle = SP5.water; ctx.fillRect(0, Y, W, 240); zwemmer(ctx, 'sam', x, Y + 0.12 * L, L, { slag: 'crawl', t, kijk: 1 }); SP5_waterlijn(ctx, 0, W, Y, t, 1);
      kaart(ctx, 360, 230, 1200, 220, 1, C.teal); text(ctx, 'Sneller in het water', 960, 320, fTekst(56, 800), C.text, 'center'); text(ctx, '= zwemtraining', 960, 400, fTekst(56, 800), C.teal, 'center'); metaText(ctx, 'TANAKA 1994', 1540, 500, C.grain, 'right', 28); }); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const v = gangSnelheid('sam', 360, 'ren', 0.85);
    // herfstbomen die voorbijschuiven
    for (let i = 0; i < 7; i++) { const x = ((i * 330 - t * v * 0.5) % 2310 + 2310) % 2310 - 200, kl = SP5.herfst[i % 4]; ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 10, 560, 20, 300); ctx.beginPath(); ctx.ellipse(x, 520, 110, 130, 0, 0, 6.283); ctx.fillStyle = rgba(kl, 0.75); ctx.fill(); }
    ctx.fillStyle = SP5.gras; ctx.fillRect(0, 820, W, 60); ctx.fillStyle = SP5.pad; ctx.fillRect(0, 846, W, 34);
    for (let i = 0; i < 14; i++) { const x = ((i * 157 - t * 60) % 2000 + 2000) % 2000, y = (i * 97 + t * 50) % 820; ctx.save(); ctx.translate(x, y); ctx.rotate(t + i); ctx.fillStyle = SP5.herfst[i % 4]; ctx.beginPath(); ctx.ellipse(0, 0, 10, 5, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    persoon(ctx, 'daan', 560, GROND, 350, { t: t + 0.3, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    persoon(ctx, 'sam', 900, GROND, 360, { t, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    persoon(ctx, 'bilal', 1240, GROND, 370, { t: t + 0.55, outfit: 'sport', zij: true, kijk: 1, gang: 'ren', tempo: 0.85 });
    SP5_label(ctx, 'HART: DOET DEELS MEE', 100, 90, C.groen, q.on('hart', 1, 0.4), 32); SP5_label(ctx, 'ZWEMSPIEREN: ALLEEN DOOR ZWEMMEN', 100, 180, C.groen, q.on('zwemspieren', 1, 0.4), 32);
    SP5_label(ctx, 'BOTTEN: STERKER VAN STOTEN', 100, 270, C.oker, q.on('botten', 1, 0.4), 32);
    SP5_label(ctx, 'LANGZAAM OPBOUWEN', 1820, 90, C.koraal, q.on('langzaam', 1, 0.4), 32, 'right'); SP5_label(ctx, 'WAT · HOEVEEL · WANNEER', 1820, 180, C.goud, q.on('kiest', 1, 0.4), 32, 'right'); },

  s20(ctx, t, q) { bg(ctx, 'schema'); trainer(ctx, 330, t, { kijk: 1, uit: 'blij', h: 480 });
    kaartTekst(ctx, 680, 110, 1120, 150, 'SPORTBOND', ['trainerscursussen'], q.on('sportbond', 1, 0.5), C.teal);
    kaartTekst(ctx, 680, 300, 1120, 210, 'HBO · SPORTKUNDE', ['HAN Nijmegen · 4 jaar', 'o.a. trainingskunde'], q.on('hbo', 1, 0.5), C.groen);
    kaartTekst(ctx, 680, 550, 1120, 150, 'WO · BEWEGINGSWETENSCHAPPEN', ['o.a. VU Amsterdam · RUG Groningen'], q.on('bachelor', 1, 0.5), C.goud);
    metaA(ctx, '2026', 1800, 760, q.on('bachelor', 1, 0.5), C.grain, 'right', 28); }
});
