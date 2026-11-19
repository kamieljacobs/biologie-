
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
// Wat word jij? · Sport en topsport 6 · De stem in je hoofd — eigen tekeningen (v1.0, 19 nov 2026)
// Seriekleuren: paars = gedachten (wolkjes), goud = raceplan, focus en uitdaging, koraal = piekeren en bedreiging, teal = water.
// Maten: de zwemmer ± 1,79 m (h = staande lengte in px); 50-meterbad met 8 banen van 2,5 m; startblok ± 0,75 m boven het water.
// Figuranten: Bilal en Daan in zwemkleding (eigen garderobe 'zwem' hieronder, zelfde snit als die van Sam), verder castfiguranten
// (Erik, Joost, Anouk, Milan, Sanne, Bram, Thijs, de voorbijganger) en publiek als silhouetten in een groep.

const GROND = 860;
var BODY = { cx: 960, yb: 860, h: 600 };
function dot(ctx, x, y, r, col) { circ(ctx, x, y, r, col); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
// alleen zichtbaar tussen het n-de woord w0 en het woord w1 (zonder fade-uit als w1 ontbreekt)
function SP6_tussen(q, w0, n0, w1, n1, d = 0.4) { return q.on(w0, n0, d) * (w1 ? 1 - q.on(w1, n1, d) : 1); }

// ---------- figuranten in zwemkleding ----------
(function () { const Z = CAST.sam.garderobe.zwem;
  if (CAST.bilal && CAST.bilal.garderobe) CAST.bilal.garderobe.zwem = Object.assign({}, Z, { topKleur: CAST.bilal.huid, topAccent: _mixHex(CAST.bilal.huid, '#000000', 0.12), schoen: CAST.bilal.huid, schoenAccent: CAST.bilal.huid, broek: '#2A2F3E', broekAccent: '#5BA4C9', badmuts: '#3F78B8' });
  if (CAST.erik) { CAST.erik.garderobe = CAST.erik.garderobe || {}; if (!CAST.erik.garderobe.sport) CAST.erik.garderobe.sport = { top: 'tshirt', topKleur: '#5BA4C9', topAccent: '#4A8BB0', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#5BA4C9' }; }
  if (CAST.daan && CAST.daan.garderobe) CAST.daan.garderobe.zwem = Object.assign({}, Z, { topKleur: CAST.daan.huid, topAccent: _mixHex(CAST.daan.huid, '#000000', 0.12), schoen: CAST.daan.huid, schoenAccent: CAST.daan.huid, broek: '#2F4A3A', broekAccent: '#E0B64A', badmuts: '#E8E2D4' });
})();
const SP6 = { muur: '#22324F', muurL: '#2C3E5E', vloer: '#3A4A66', tegel: '#2E4A6A', water: '#2F6F8F', waterL: '#5BA4C9', waterD: '#1F4F6E', blok: '#D8DEE4', blokD: '#9AA6B6', lijn: '#13223A', hout: '#8A6A4A', bord: '#F2F2EE' };

// ---------- klok rechtsboven ----------
function SP6_klok(ctx, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(44, 800); const w = ctx.measureText(s2).width + 70;
  roundRect(ctx, 1860 - w, 34, w, 74, 14); shape(ctx, rgba('#0D1420', 0.9), rgba(C.goud, 0.9), 2.5);
  circ(ctx, 1860 - w + 30, 71, 12, null, C.goud, 3); lijn(ctx, [[1860 - w + 30, 63], [1860 - w + 30, 71], [1860 - w + 36, 75]], C.goud, 3);
  text(ctx, s2, 1860 - 22, 88, fTekst(44, 800), C.text, 'right'); ctx.restore(); }

// ---------- gedachtenwolkje: tekst in hoofdletters, staartje (twee bolletjes) naar het hoofd ----------
function SP6_wolk(ctx, x, y, s2, col, a = 1, o = {}) { if (a <= 0.01) return; const px = o.px || 34; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800);
  const regels = s2.split('\n'), w = Math.max(...regels.map(r => ctx.measureText(r).width)) + px * 1.6, h = regels.length * px * 1.2 + px * 1.1, x0 = x - w / 2, y0 = y - h / 2;
  const vul = o.vul || _mixHex(col, '#F2F2EE', 0.62);
  ctx.fillStyle = vul; ctx.beginPath(); roundRect(ctx, x0, y0, w, h, h / 2); ctx.fill();
  const nb = Math.max(3, Math.round(w / (px * 1.5))); for (let i = 0; i < nb; i++) { const u = (i + 0.5) / nb, bx = x0 + h * 0.35 + u * (w - h * 0.7), rr = h * (0.3 + 0.08 * Math.sin(i * 2.3));
    ctx.beginPath(); ctx.arc(bx, y0 + h * 0.2, rr, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(bx + px * 0.4, y0 + h * 0.8, rr * 0.9, 0, 6.283); ctx.fill(); }
  if (o.staart) { const dx = o.staart.x - x, dy = o.staart.y - y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, r0 = Math.min(w, h) * 0.5 + 10;
    circ(ctx, x + ux * (r0 + 14) + (dx - ux * r0) * 0.15, y + uy * (r0 + 14) + (dy - uy * r0) * 0.15, px * 0.32, vul); circ(ctx, x + ux * (r0 + 14) + (dx - ux * r0) * 0.45, y + uy * (r0 + 14) + (dy - uy * r0) * 0.45, px * 0.2, vul); }
  regels.forEach((r, i) => text(ctx, r, x, y + px * 0.36 + (i - (regels.length - 1) / 2) * px * 1.2, fTekst(px, 800), o.ink || '#1A1530', 'center'));
  ctx.restore(); return { w, h }; }

// ---------- zwembad van boven (50 m × 25 m, 8 banen); (cx, cy) = midden van het bad; s = px per meter ----------
function SP6_badBoven(ctx, cx, cy, s, o = {}) { const { t = 0, zwemmer = null, tribune = true, a = 1, licht = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = 50 * s, B = 25 * s, x0 = cx - L / 2, y0 = cy - B / 2;
  // kant rondom
  roundRect(ctx, x0 - 4 * s, y0 - 4 * s, L + 8 * s, B + 8 * s, 0.6 * s); shape(ctx, SP6.vloer, null);
  if (tribune) { // tribune boven het bad: rijen silhouetten
    roundRect(ctx, x0 + 2 * s, y0 - 12 * s, L - 4 * s, 7 * s, 0.4 * s); shape(ctx, '#2A3550', null);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 46; i++) { const px = x0 + 3.4 * s + i * (L - 7 * s) / 45 + (r % 2) * 0.5 * s, py = y0 - 10.8 * s + r * 2.1 * s; ctx.fillStyle = r % 2 ? '#4A5878' : '#56648A';
      ctx.beginPath(); ctx.ellipse(px, py + 0.55 * s, 0.42 * s, 0.32 * s, 0, 0, 6.283); ctx.fill(); circ(ctx, px, py, 0.26 * s, r % 2 ? '#5E6C8E' : '#6A789A'); } }
  ctx.fillStyle = SP6.water; ctx.fillRect(x0, y0, L, B);
  // bodemlijnen per baan
  for (let i = 0; i < 8; i++) { const by = y0 + (i + 1.5) * 2.5 * s; ctx.fillStyle = rgba('#13223A', 0.55); ctx.fillRect(x0 + 2 * s, by - 0.12 * s, L - 4 * s, 0.24 * s); ctx.fillRect(x0 + 2 * s, by - 0.5 * s, 0.24 * s, 1 * s); ctx.fillRect(x0 + L - 2.24 * s, by - 0.5 * s, 0.24 * s, 1 * s); }
  // banenlijnen (drijvers)
  for (let i = 0; i <= 8; i++) { const ly = y0 + (i + 1) * 2.5 * s; const n = Math.round(L / (0.5 * s));
    for (let k = 0; k < 100; k++) { const u = k / 99, px = x0 + u * L, eind = u < 0.1 || u > 0.9; ctx.fillStyle = eind ? '#D8573F' : (k % 2 ? '#E0B64A' : '#3F78B8'); ctx.beginPath(); ctx.ellipse(px, ly, 0.24 * s, 0.13 * s, 0, 0, 6.283); ctx.fill(); } }
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht; ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 0.12 * s); ctx.strokeRect(x0, y0 + 4.5 * 2.5 * s - 2.5 * s, L, 2.5 * s); ctx.restore(); }
  // startblokken aan de linkerkant met nummer
  for (let i = 0; i < 8; i++) { const by = y0 + (i + 1.5) * 2.5 * s; roundRect(ctx, x0 - 1.0 * s, by - 0.3 * s, 0.75 * s, 0.6 * s, 0.1 * s); shape(ctx, SP6.blok, null);
    if (s > 14) text(ctx, String(i + 1), x0 - 0.62 * s, by + 0.14 * s, fTekst(Math.max(10, 0.42 * s), 800), '#1A2740', 'center'); }
  if (zwemmer) zwemmer(ctx);
  ctx.restore(); return { x0, y0, L, B, baan: (n) => y0 + (n + 0.5) * 2.5 * s }; }
// zwemmer van boven (eenvoudige vorm): (x, y) = kruin, kijk 1 = naar rechts; L = lengte in px van kruin tot tenen
function SP6_zwemmerBoven(ctx, x, y, L, t = 0, o = {}) { const { kijk = 1, slag = true } = o; ctx.save(); ctx.translate(x, y); ctx.scale(kijk, 1); const hu = CAST.sam.huid, s = L / 1.8;
  ctx.strokeStyle = hu; ctx.lineCap = 'round'; ctx.lineWidth = 0.1 * s; const p = slag ? t * 0.8 * 6.283 : 0;
  for (const k of [-1, 1]) { const ph = p + (k > 0 ? 0 : Math.PI); const ax = 0.2 * s + Math.cos(ph) * 0.55 * s, ay = k * (0.22 * s + Math.abs(Math.sin(ph)) * 0.12 * s); ctx.beginPath(); ctx.moveTo(-0.3 * s, k * 0.2 * s); ctx.lineTo(ax, ay); ctx.stroke(); }
  ctx.fillStyle = hu; ctx.beginPath(); ctx.ellipse(-0.75 * s, 0, 0.5 * s, 0.2 * s, 0, 0, 6.283); ctx.fill();
  ctx.lineWidth = 0.11 * s; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-1.2 * s, k * 0.08 * s); ctx.lineTo(-1.75 * s, k * (0.1 * s + 0.03 * s * Math.sin(t * 9 + k))); ctx.stroke(); }
  ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-1.12 * s, 0, 0.14 * s, 0.17 * s, 0, 0, 6.283); ctx.fill();
  circ(ctx, -0.14 * s, 0, 0.13 * s, '#D8573F'); ctx.restore(); }

// ---------- startblok in zijaanzicht: (x, y) = voorrand boven; s = px per meter; kijk 1 = water rechts ----------
function SP6_blok(ctx, x, y, s, o = {}) { const { kijk = 1, nummer = '', a = 1, wig = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1);
  const d = 0.6 * s, hoog = 0.75 * s; // blad 60 cm diep, 75 cm boven het water
  ctx.fillStyle = '#5E6A80'; ctx.fillRect(-d * 0.62, 0.06 * s, 0.1 * s, hoog + 0.25 * s); ctx.fillRect(-d * 0.2, 0.06 * s, 0.1 * s, hoog + 0.25 * s); // poten
  ctx.beginPath(); ctx.moveTo(-d, 0.05 * s); ctx.lineTo(0, -0.02 * s); ctx.lineTo(0, 0.08 * s); ctx.lineTo(-d, 0.14 * s); ctx.closePath(); shape(ctx, SP6.blok, null); // blad, iets aflopend naar voren
  ctx.fillStyle = SP6.blokD; ctx.fillRect(-d, 0.12 * s, d, 0.03 * s);
  if (wig) { ctx.beginPath(); ctx.moveTo(-d * 0.92, 0.05 * s); ctx.lineTo(-d * 0.72, 0.035 * s); ctx.lineTo(-d * 0.92, -0.06 * s); ctx.closePath(); shape(ctx, '#B8C2CE', null); }
  if (nummer) { ctx.save(); ctx.scale(kijk, 1); text(ctx, nummer, -kijk * d * 0.42, 0.42 * s, fTekst(0.22 * s, 800), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }
// zwembadkant in zijaanzicht: dek links tot xRand, water rechts vanaf xRand; waterY = wateroppervlak, dekY = vloer
function SP6_badZij(ctx, xRand, dekY, waterY, t = 0, o = {}) { const { muur = true } = o;
  if (muur) { ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, dekY - 84); ctx.fillStyle = rgba('#F2F2EE', 0.04); for (let i = 0; i < 12; i++) ctx.fillRect(i * 180, 84, 2, dekY - 84); }
  ctx.fillStyle = SP6.vloer; ctx.fillRect(0, dekY, xRand, 880 - dekY); ctx.fillStyle = '#4A5A78'; ctx.fillRect(0, dekY, xRand, 6);
  ctx.fillStyle = SP6.water; ctx.fillRect(xRand, waterY, W - xRand, 880 - waterY); ctx.fillStyle = SP6.tegel; ctx.fillRect(xRand - 8, dekY, 8, 880 - dekY);
  ctx.strokeStyle = rgba(SP6.waterL, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let px = xRand; px <= W; px += 12) { const py = waterY + 3 * Math.sin(px * 0.02 + t * 2); px === xRand ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  // banenlijn achter in het bad (één rij drijvers)
  for (let k = 0; k < 40; k++) { const px = xRand + 30 + k * 34; if (px > W) break; ctx.fillStyle = k < 6 ? '#D8573F' : (k % 2 ? '#E0B64A' : '#3F78B8'); ctx.beginPath(); ctx.ellipse(px, waterY - 2, 14, 7, 0, 0, 6.283); ctx.fill(); } }

// ---------- onder water (zijaanzicht) met een meebewegende achtergrond ----------
function SP6_onderWater(ctx, waterY, t = 0, v = 0) { ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, waterY - 84);
  ctx.fillStyle = '#2A4A6E'; ctx.fillRect(0, waterY, W, 880 - waterY);
  const g = ctx.createLinearGradient(0, waterY, 0, 880); g.addColorStop(0, '#2F6F8F'); g.addColorStop(1, '#245A78'); ctx.fillStyle = g; ctx.fillRect(0, waterY, W, 880 - waterY);
  // bodemlijn (zwart) en tegelvoegen die meeschuiven
  const off = (t * v) % 120; ctx.strokeStyle = rgba('#13223A', 0.35); ctx.lineWidth = 2; for (let px = -off; px < W; px += 120) { ctx.beginPath(); ctx.moveTo(px, 820); ctx.lineTo(px, 880); ctx.stroke(); }
  ctx.fillStyle = rgba('#13223A', 0.6); ctx.fillRect(0, 836, W, 18);
  // drijvers van de banenlijn aan het oppervlak
  const off2 = (t * v) % 36; for (let px = -off2; px < W + 36; px += 36) { ctx.fillStyle = Math.floor((px + t * v) / 36) % 2 ? '#E0B64A' : '#3F78B8'; ctx.beginPath(); ctx.ellipse(px, waterY + 2, 15, 8, 0, 0, 6.283); ctx.fill(); }
  ctx.strokeStyle = rgba(SP6.waterL, 0.9); ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= W; px += 12) { const py = waterY + 3 * Math.sin(px * 0.018 + t * 2.2); px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); }
// waterlijn als lichte lijn vóór de zwemmer (geen alfa op de persoon)
function SP6_waterlijn(ctx, x0, x1, y, t = 0) { ctx.save(); ctx.strokeStyle = rgba('#BFE3F2', 0.75); ctx.lineWidth = 2.5; ctx.beginPath(); for (let px = x0; px <= x1; px += 10) { const py = y + 4 * Math.sin(px * 0.03 + t * 3); px === x0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); ctx.restore(); }

// ---------- werkbank WERKGEHEUGEN: 4 vakken; kaartjes = [{s, kl, x (vak 0..3 of los), y-offset, rot}] ----------
function SP6_werkbank(ctx, x, y, w, o = {}) { const { a = 1, vakLicht = 0, kop = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const h = w * 0.07; ctx.fillStyle = SP6.hout; roundRect(ctx, x - w / 2, y, w, h, 8); ctx.fill(); ctx.fillStyle = '#6E543A'; ctx.fillRect(x - w / 2 + 20, y + h, 18, w * 0.22); ctx.fillRect(x + w / 2 - 38, y + h, 18, w * 0.22);
  const vw = w / 4; for (let i = 0; i < 4; i++) { const vx = x - w / 2 + i * vw; ctx.strokeStyle = rgba(vakLicht > 0.01 ? C.goud : '#F2F2EE', 0.35 + 0.5 * vakLicht); ctx.lineWidth = 2 + vakLicht * 1.5; ctx.setLineDash([10, 8]); ctx.strokeRect(vx + 8, y - vw * 0.62, vw - 16, vw * 0.6); ctx.setLineDash([]); }
  if (kop) metaText(ctx, 'WERKGEHEUGEN', x, y + h + 46, C.text, 'center', 28);
  ctx.restore(); return { vak: (i) => ({ x: x - w / 2 + (i + 0.5) * vw, y: y - vw * 0.32 }), vw }; }
function SP6_blokje(ctx, x, y, w, h, s2, kl, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  roundRect(ctx, -w / 2, -h / 2, w, h, 8); shape(ctx, _mixHex(kl, '#0D1420', 0.15), _mixHex(kl, '#FFFFFF', 0.3), 2);
  const px = Math.min(24, h * 0.36); const r = s2.split('\n'); r.forEach((q, i) => text(ctx, q, 0, px * 0.36 + (i - (r.length - 1) / 2) * px * 1.15, fTekst(px, 800), '#14182A', 'center')); ctx.restore(); }

// ---------- wachtruimte en kamer van de sportpsycholoog ----------
function SP6_wachtruimte(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = '#25354F'; ctx.fillRect(0, 84, W, 690); ctx.fillStyle = '#2E405E'; ctx.fillRect(0, 774, W, 106);
  ctx.fillStyle = rgba('#F2F2EE', 0.05); for (let i = 0; i < 16; i++) ctx.fillRect(i * 124, 84, 3, 690);
  // deur met bordje-loos raam en klok aan de muur
  roundRect(ctx, 1640, 300, 200, 474, 6); shape(ctx, '#3A4C6C', '#4A5E80', 2); roundRect(ctx, 1680, 340, 120, 150, 4); shape(ctx, '#5BA4C9', null); ctx.fillStyle = rgba('#F2F2EE', 0.2); ctx.fillRect(1690, 350, 30, 130); circ(ctx, 1662, 560, 9, '#C9D2DE');
  // lange bank
  ctx.fillStyle = '#6E543A'; roundRect(ctx, 80, 640, 1460, 34, 8); ctx.fill(); ctx.fillStyle = '#5A4430'; for (const bx of [120, 790, 1480]) ctx.fillRect(bx, 674, 22, 100); }
function SP6_kamer(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = '#2A3A55'; ctx.fillRect(0, 84, W, 700); ctx.fillStyle = '#34465F'; ctx.fillRect(0, 784, W, 96);
  // raam met plant
  roundRect(ctx, 120, 200, 300, 260, 6); shape(ctx, '#4E7FA8', '#5C6E8E', 6); ctx.strokeStyle = '#5C6E8E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(270, 200); ctx.lineTo(270, 460); ctx.stroke();
  ctx.fillStyle = '#B07A4A'; roundRect(ctx, 220, 690, 90, 94, 8); ctx.fill(); ctx.fillStyle = '#5E9E6E'; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(265 + Math.cos(i * 0.9) * 40, 640 - i * 6, 22, 56, i * 0.5 - 1.5, 0, 6.283); ctx.fill(); } }
function SP6_whiteboard(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 10, y - 10, w + 20, h + 20, 8); shape(ctx, '#9AA6B6', null); roundRect(ctx, x, y, w, h, 4); shape(ctx, SP6.bord, null);
  ctx.fillStyle = '#9AA6B6'; ctx.fillRect(x + w * 0.1, y + h + 10, w * 0.8, 12); ctx.restore(); }
// handschrift-achtige tekst die verschijnt van links naar rechts (u 0..1)
function SP6_schrijf(ctx, s2, x, y, px, kl, u, al = 'left') { if (u <= 0.001) return; ctx.save(); ctx.font = fTekst(px, 700); const w = ctx.measureText(s2).width, x0 = al === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 4, y - px * 1.2, w * clamp(u, 0, 1) + 8, px * 1.6); ctx.clip(); text(ctx, s2, x0, y, fTekst(px, 700), kl, 'left'); ctx.restore(); }

// ---------- meters ----------
// hartslagmeter: scherm met hartje en lopende lijn; v 0..1 = hoe snel (geen getal: de stem noemt er geen)
function SP6_hartmeter(ctx, x, y, w, v, t, o = {}) { const { a = 1, kl = C.koraal, kop = 'HARTSLAG' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.5;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 14); shape(ctx, '#0D1420', rgba(C.line, 0.9), 2);
  metaText(ctx, kop, x - w / 2 + 20, y - h / 2 + 38, C.text2, 'left', 22);
  const f = 1 + v * 2.2, puls = Math.pow(Math.max(0, Math.sin(t * f * Math.PI)), 8); // hartje klopt sneller
  ctx.save(); ctx.translate(x + w / 2 - 40, y - h / 2 + 30); ctx.scale(1 + 0.15 * puls, 1 + 0.15 * puls); ctx.fillStyle = kl; ctx.beginPath(); ctx.moveTo(0, 10); ctx.bezierCurveTo(-18, -4, -10, -18, 0, -8); ctx.bezierCurveTo(10, -18, 18, -4, 0, 10); ctx.fill(); ctx.restore();
  // ECG-achtige lijn
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 + 14, y - h / 2 + 50, w - 28, h - 64); ctx.clip(); ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.beginPath(); const x0 = x - w / 2 + 14, ww = w - 28, yb = y + h * 0.18;
  for (let i = 0; i <= ww; i += 3) { const tt = (i / ww) * 3 + t * 0.6, fr = (tt * f) % 1, piek = fr > 0.42 && fr < 0.5 ? -Math.sin((fr - 0.42) / 0.08 * Math.PI) * h * 0.32 : (fr > 0.5 && fr < 0.55 ? Math.sin((fr - 0.5) / 0.05 * Math.PI) * h * 0.08 : 0); i === 0 ? ctx.moveTo(x0 + i, yb + piek) : ctx.lineTo(x0 + i, yb + piek); }
  ctx.stroke(); ctx.restore();
  // balk onderaan
  roundRect(ctx, x - w / 2 + 20, y + h / 2 - 22, w - 40, 10, 5); shape(ctx, '#2A3446', null); roundRect(ctx, x - w / 2 + 20, y + h / 2 - 22, Math.max(10, (w - 40) * clamp(v, 0, 1)), 10, 5); shape(ctx, kl, null);
  ctx.restore(); }
// weegschaal: links WAT IK IN HUIS HEB, rechts WAT ER GEVRAAGD WORDT; k = kanteling (-1 = links omlaag, +1 = rechts omlaag)
function SP6_weegschaal(ctx, x, y, s, k, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#9AA6B6'; ctx.beginPath(); ctx.moveTo(-90, 300); ctx.lineTo(90, 300); ctx.lineTo(20, 270); ctx.lineTo(-20, 270); ctx.closePath(); ctx.fill(); ctx.fillRect(-10, 0, 20, 275);
  const an = -0.22 * k; ctx.save(); ctx.rotate(an); ctx.fillStyle = '#C9D2DE'; roundRect(ctx, -330, -10, 660, 20, 10); ctx.fill(); ctx.restore(); circ(ctx, 0, 0, 18, C.goud);
  const kl = k < -0.05 ? C.goud : k > 0.05 ? C.koraal : C.line;
  for (const sd of [-1, 1]) { const px = sd * 310 * Math.cos(an), py = sd * 310 * Math.sin(an); ctx.strokeStyle = '#9AA6B6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, py + 150); ctx.moveTo(px, py); ctx.lineTo(px + 110, py + 150); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 150, 130, 26, 0, 0, Math.PI); ctx.fillStyle = (sd < 0 && k < -0.05) ? rgba(C.goud, 0.7) : (sd > 0 && k > 0.05) ? rgba(C.koraal, 0.7) : '#5E6A80'; ctx.fill();
    const lab = sd < 0 ? ['WAT IK', 'IN HUIS HEB'] : ['WAT ER', 'GEVRAAGD WORDT']; lab.forEach((l, i) => text(ctx, l, px, py + 230 + i * 40, fTekst(32, 800), sd < 0 ? C.goud : C.koraal, 'center')); }
  ctx.restore(); }
// bloedvat in een zoomcirkel: breedte b (0..1, 0,5 = gewoon), stroom f (deeltjes per tel)
function SP6_vat(ctx, cx, cy, r, b, f, t, kl) { const hw = lerp(40, 120, b); ctx.fillStyle = '#3A2A3A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#C46A6A'; ctx.fillRect(cx - r, cy - hw - 22, 2 * r, 22); ctx.fillRect(cx - r, cy + hw, 2 * r, 22); // vaatwand
  ctx.fillStyle = '#5A2430'; ctx.fillRect(cx - r, cy - hw, 2 * r, 2 * hw);
  const n = 18; for (let i = 0; i < n; i++) { const u = (hash(i * 3.1) + t * (0.15 + f * 0.35)) % 1, py = cy + (hash(i * 7.7) - 0.5) * 1.5 * (hw - 18); const px = cx - r + u * 2 * r; ctx.beginPath(); ctx.ellipse(px, py, 18, 10, 0, 0, 6.283); shape(ctx, '#D8604A', '#F0A090', 1.5); }
  if (kl) { ctx.strokeStyle = kl; ctx.lineWidth = 6; ctx.strokeRect(cx - r, cy - hw - 22, 2 * r, 2 * hw + 44); } }

// ---------- icoontjes van de routine (bril · armen zwaaien · LANG) ----------
function SP6_icoon(ctx, x, y, soort, licht, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = licht > 0.5 ? C.goud : '#7A8496';
  roundRect(ctx, x - 70, y - 50, 140, 100, 16); shape(ctx, licht > 0.5 ? rgba(C.goud, 0.18) : rgba('#0D1420', 0.85), kl, 2.5);
  ctx.strokeStyle = kl; ctx.fillStyle = kl; ctx.lineWidth = 5; ctx.lineCap = 'round';
  if (soort === 'bril') { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 24, y, 20, 14, 0, 0, 6.283); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x - 44, y); ctx.lineTo(x - 58, y - 6); ctx.moveTo(x + 44, y); ctx.lineTo(x + 58, y - 6); ctx.stroke(); }
  else if (soort === 'armen') { circ(ctx, x, y - 22, 9, kl); ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, y + 26); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 6, 30, -2.6, 0.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 26, y + 9); ctx.lineTo(x + 30, y - 6); ctx.lineTo(x + 16, y + 2); ctx.stroke(); text(ctx, '2×', x - 38, y + 34, fTekst(22, 800), kl, 'center'); }
  else text(ctx, 'LANG', x, y + 14, fTekst(40, 800), kl, 'center');
  ctx.restore(); }

// ---------- kalender en seizoensrooster ----------
function SP6_kalender(ctx, x, y, s2, a = 1, blad = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 150, y - 120, 300, 260, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = C.koraal; roundRect(ctx, x - 150, y - 120, 300, 70, 14); ctx.fill(); ctx.fillRect(x - 150, y - 70, 300, 20); for (const dx of [-80, 80]) { roundRect(ctx, x + dx - 8, y - 140, 16, 40, 6); shape(ctx, '#5E6A80', null); }
  text(ctx, s2, x, y + 50, fTekst(s2.length > 10 ? 36 : 54, 800), '#1A2740', 'center');
  if (blad > 0.01 && blad < 0.99) { ctx.save(); ctx.translate(x, y - 50); ctx.scale(1, 1 - blad); ctx.fillStyle = '#E2DCCC'; ctx.fillRect(-150, 0, 300, 190); ctx.restore(); }
  ctx.restore(); }
function SP6_rooster(ctx, x, y, w, h, a = 1, licht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const M = ['SEP', 'OKT', 'NOV', 'DEC', 'JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG'];
  roundRect(ctx, x, y, w, h, 14); shape(ctx, rgba('#0D1420', 0.9), C.line, 2); metaText(ctx, 'SEIZOEN', x + 24, y + 42, C.text2, 'left', 24);
  const cw = (w - 48) / 12, ch = (h - 110) / 3; M.forEach((m, i) => { metaText(ctx, m, x + 24 + (i + 0.5) * cw, y + 84, C.text2, 'center', 18);
    for (let r = 0; r < 3; r++) { const wed = hash(i * 5 + r * 13) < 0.55; const hier = i === 2 && r === 1; const cx = x + 24 + i * cw + 3, cy = y + 100 + r * ch + 3;
      roundRect(ctx, cx, cy, cw - 6, ch - 6, 6); shape(ctx, hier ? rgba(C.goud, 0.35 + 0.5 * licht) : wed ? rgba(C.teal, 0.45) : rgba('#2A3446', 0.9), hier ? C.goud : null, hier ? 2 + 2 * licht : 1); } });
  ctx.restore(); }

// ---------- hometrainer met fietser (zijaanzicht) ----------
function SP6_hometrainer(ctx, x, y, s, t, id = 'erik') { // (x, y) = midden onder op de grond, s = px per meter
  ctx.save(); ctx.fillStyle = '#4A5468'; roundRect(ctx, x - 0.7 * s, y - 0.06 * s, 1.4 * s, 0.06 * s, 6); ctx.fill();
  const zad = { x: x - 0.32 * s, y: y - 0.95 * s }, stuur = { x: x + 0.38 * s, y: y - 1.02 * s }, trap = { x: x - 0.05 * s, y: y - 0.32 * s };
  circ(ctx, x + 0.42 * s, y - 0.34 * s, 0.26 * s, '#2A3446', '#8FA0B5', 3); // vliegwiel
  lijn(ctx, [[x - 0.6 * s, y - 0.05 * s], [trap.x, trap.y], [x + 0.42 * s, y - 0.34 * s]], '#8FA0B5', 0.05 * s); lijn(ctx, [[trap.x, trap.y], [zad.x, zad.y]], '#8FA0B5', 0.05 * s); lijn(ctx, [[x + 0.42 * s, y - 0.34 * s], [stuur.x - 0.05 * s, stuur.y]], '#8FA0B5', 0.05 * s);
  lijn(ctx, [[zad.x - 0.12 * s, zad.y], [zad.x + 0.12 * s, zad.y]], '#1E2230', 0.06 * s); lijn(ctx, [[stuur.x - 0.05 * s, stuur.y], [stuur.x + 0.1 * s, stuur.y - 0.02 * s]], '#1E2230', 0.04 * s);
  // fietser: zittend zijaanzicht, benen trappen rond
  const h = 1.8 * s, hh = h / 6.1, Lb = h - hh * 3.67, L1 = Lb / 2; const ph = t * 1.4 * 6.283, cr = 0.17 * s;
  const been = (p) => { const fx = trap.x + Math.cos(p) * cr, fy = trap.y + Math.sin(p) * cr, dx = fx - zad.x, dy = fy - (zad.y + 0.02 * s), dd = Math.min(Math.hypot(dx, dy), 2 * L1 * 0.995), phi = Math.atan2(dx, dy), al = Math.acos(dd / (2 * L1)); return { th: phi + al, kn: 2 * al, an: -0.2 }; };
  persoon(ctx, id, zad.x, zad.y + 0.02 * s + h - hh * 3.45, h, { zij: true, kijk: 1, vrij: true, outfit: 'sport', been1: been(ph), been2: been(ph + Math.PI), voorover: 0.45, arm: [1.25, -0.25], armVer: [1.25, -0.25], t });
  for (const p of [ph, ph + Math.PI]) lijn(ctx, [[trap.x, trap.y], [trap.x + Math.cos(p) * cr, trap.y + Math.sin(p) * cr]], '#C9D2DE', 0.03 * s);
  ctx.restore(); }

// ---------- kaartje met kop en tekst ----------
function SP6_kaartje(ctx, x, y, w, kop, regels, a = 1, rand = C.goud, px = 34) { if (a <= 0.01) return; const h = 74 + regels.length * px * 1.3; laag(ctx, a, () => { kaart(ctx, x, y, w, h, 1, rand); metaText(ctx, kop, x + 26, y + 46, rand, 'left', 26);
  regels.forEach((r, i) => text(ctx, r, x + 26, y + 60 + (i + 0.8) * px * 1.3, fTekst(px, 700), C.text, 'left')); }); return h; }
// portret van een castpersonage in een lijstje (voor studenten, groepjes)
function SP6_portret(ctx, id, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { rand = '#B8B0A0', outfit, uit = 'neutraal', t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 50 * s, y - 56 * s, 100 * s, 112 * s, 10); shape(ctx, '#2E3E5C', rand, 2.5); ctx.beginPath(); ctx.rect(x - 47 * s, y - 53 * s, 94 * s, 106 * s); ctx.clip();
  const L = (CAST[id] && CAST[id].lengte) || 1; persoon(ctx, id, x, y + s * (380 * L - 46), 380 * s, { outfit, uit, t }); ctx.restore(); }
// klein potloodje dat schrijft
function SP6_potlood(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + 6 * Math.sin(t * 9), y + 3 * Math.sin(t * 13)); ctx.rotate(-0.7); ctx.fillStyle = '#E0B64A'; ctx.fillRect(-4, -34, 8, 30); ctx.fillStyle = '#E8C9A0'; ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(4, -4); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill(); ctx.restore();
  lijn(ctx, [[x - 30, y + 10], [x - 30 + 24 * ((t * 0.7) % 1), y + 10]], '#9AA3B2', 2, a); }
// muzieknootjes
function SP6_noot(ctx, x, y, t, a = 1, kl = C.text2) { if (a <= 0.01) return; for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; ctx.save(); ctx.globalAlpha *= a * Math.sin(u * Math.PI); const px = x + u * 80 + k * 10, py = y - u * 90; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(px, py, 10, 7, -0.4, 0, 6.283); ctx.fill(); ctx.fillRect(px + 7, py - 34, 3, 34); ctx.restore(); } }
// startsignaal (pieper)
function SP6_pieper(ctx, x, y, aan, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 30, y - 40, 60, 80, 10); shape(ctx, '#3A4458', '#8FA0B5', 2); circ(ctx, x, y - 10, 16, aan > 0.5 ? '#F2C94C' : '#5A5E66');
  if (aan > 0.5) for (let k = 1; k <= 3; k++) { ctx.strokeStyle = rgba(C.goud, 1 - k * 0.25); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y - 10, 20 + k * 16, -0.8, 0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 10, 20 + k * 16, Math.PI - 0.8, Math.PI + 0.8); ctx.stroke(); }
  ctx.restore(); }
// handdoek over de schouders (vooraanzicht, zittend): r = ankerpunten van persoon()
function SP6_handdoek(ctx, r, h) { if (!r || !r.hoofd) return; const hx = r.hoofd.x, hy = r.hoofd.y, R = r.hoofd.r || h * 0.08, sy = hy + R * 1.35, bw = R * 2.3; ctx.save(); ctx.fillStyle = '#E8E2D4';
  ctx.beginPath(); ctx.moveTo(hx - bw, sy + R * 0.1); ctx.quadraticCurveTo(hx, sy - R * 0.35, hx + bw, sy + R * 0.1); ctx.lineTo(hx + bw * 0.95, sy + R * 0.7); ctx.quadraticCurveTo(hx + R * 0.4, sy + R * 0.45, hx + R * 0.5, sy + R * 2.1); ctx.lineTo(hx + R * 0.05, sy + R * 2.1); ctx.lineTo(hx - R * 0.05, sy + R * 0.5);
  ctx.quadraticCurveTo(hx - bw * 0.6, sy + R * 0.5, hx - bw * 0.95, sy + R * 0.7); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(hx + R * 0.08, sy + R * 1.7, R * 0.4, R * 0.18); ctx.restore(); }
// zwembril in de hand
function SP6_bril(ctx, x, y, s) { ctx.save(); ctx.strokeStyle = '#1E2230'; ctx.lineWidth = 3; ctx.fillStyle = rgba('#5BA4C9', 0.9); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sd * 12 * s, y, 10 * s, 7 * s, 0, 0, 6.283); ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - 22 * s, y); ctx.quadraticCurveTo(x, y + 26 * s, x + 22 * s, y); ctx.stroke(); ctx.restore(); }
// vliegje (aan de rand van het beeld)
function SP6_vlieg(ctx, x, y, s, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = rgba('#C9D2DE', 0.6); const fl = 0.3 * Math.sin(t * 40);
  ctx.beginPath(); ctx.ellipse(-14, -16, 18, 9, -0.6 + fl, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(14, -16, 18, 9, 0.6 - fl, 0, 6.283); ctx.fill();
  ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.ellipse(0, 0, 9, 18, 0, 0, 6.283); ctx.fill(); circ(ctx, 0, -18, 8, '#3A2F3E'); circ(ctx, -5, -21, 4, '#B23A3A'); circ(ctx, 5, -21, 4, '#B23A3A');
  ctx.strokeStyle = '#2A2F3E'; ctx.lineWidth = 2; for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(sd * 6, -4 + k * 8); ctx.lineTo(sd * 18, -2 + k * 10); ctx.stroke(); } ctx.restore(); }
// zijaanzicht met de dichtbije hand op een doelpunt (twee-botten-IK op de schouder van persoon())
function SP6_reik(ctx, id, x, y, h, o, doel) { const kijk = o.kijk || 1; ctx.save(); ctx.beginPath(); ctx.rect(-20, -20, 1, 1); ctx.clip(); const r0 = persoon(ctx, id, x, y, h, Object.assign({}, o, { arm: [0.3, 0.2] })); ctx.restore();
  const R = r0 && r0.handR; if (!R || R.shx == null || !doel) return persoon(ctx, id, x, y, h, o);
  const P = Object.assign({}, CAST[id], (CAST[id].garderobe && o.outfit && CAST[id].garderobe[o.outfit]) || {}), A1 = R.hh * 1.32 * (P.armK || 1), A2 = R.hh * 1.2 * (P.armK || 1);
  const tx = kijk < 0 ? 2 * x - doel.x : doel.x, [a1, a2] = _ik(tx - R.shx, doel.y - R.shy, A1, A2); return persoon(ctx, id, x, y, h, Object.assign({}, o, { arm: [a1, a2 - a1] })); }
// de zwemmer staand op of achter het blok, zijaanzicht naar het water (rechts)
function SP6_samZij(ctx, x, y, h, t, o = {}) { return persoon(ctx, 'sam', x, y, h, Object.assign({ outfit: 'zwem', zij: true, kijk: 1, t, uit: 'neutraal' }, o)); }
// Wat word jij? · Sport en topsport 6 · De stem in je hoofd — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast (de zwemmer = Sam, outfit 'zwem'; sportpsycholoog; zwemtrainer). Geen namen in beeld.
// Decor (zwembad, wachtruimte, kamer) alleen waar de scène op die plek speelt; schema's op navy. Klok rechtsboven telt af naar de start.

// ---------- gedeelde scènedelen ----------
const SP6_KOUD = ['WAT ALS IK DE START MIS?', 'IEDEREEN KIJKT', 'WAT ALS IK HET VERPEST?'];
// voorkant van een startblok (vooraanzicht), (x, y) = midden bovenkant
function SP6_blokVoor(ctx, x, y, w, voet, nr) { ctx.fillStyle = '#5E6A80'; ctx.fillRect(x - w * 0.36, y + 24, w * 0.1, voet - y - 24); ctx.fillRect(x + w * 0.26, y + 24, w * 0.1, voet - y - 24);
  roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, SP6.blok, null); roundRect(ctx, x - w * 0.3, y + 34, w * 0.6, w * 0.42, 8); shape(ctx, '#2E5C8A', null);
  text(ctx, nr, x, y + 34 + w * 0.3, fTekst(w * 0.28, 800), C.text, 'center'); }
// startkant in vooraanzicht: muur met tribune, dek, water vooraan
function SP6_startkant(ctx, t) { bg(ctx, 'schema'); ctx.fillStyle = SP6.muur; ctx.fillRect(0, 84, W, 690);
  ctx.fillStyle = '#2A3550'; ctx.fillRect(0, 150, W, 230); // tribune
  for (let r = 0; r < 4; r++) for (let i = 0; i < 34; i++) { const px = 20 + i * 57 + (r % 2) * 28, py = 190 + r * 52, kl = r % 2 ? '#46547A' : '#525F86'; ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(px, py + 22, 22, 15, 0, 0, 6.283); ctx.fill(); circ(ctx, px, py, 13, _mixHex(kl, '#FFFFFF', 0.1)); }
  ctx.fillStyle = '#3A4A66'; ctx.fillRect(0, 380, W, 16);
  ctx.fillStyle = SP6.vloer; ctx.fillRect(0, 770, W, 30); ctx.fillStyle = SP6.water; ctx.fillRect(0, 800, W, 80);
  ctx.strokeStyle = rgba(SP6.waterL, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let px = 0; px <= W; px += 12) { const py = 803 + 3 * Math.sin(px * 0.02 + t * 2); px ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
function SP6_scorebord(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 330, y - 50, 660, 100, 10); shape(ctx, '#0D1420', '#4A5A78', 3);
  text(ctx, 'FINALE 100 M VRIJ', x, y + 18, fTekst(50, 800), '#F2C94C', 'center'); ctx.restore(); }
// de zwemmer in de startrij (vooraanzicht) achter blok 4, met finalisten achter blok 3 en 5
function SP6_startrij(ctx, t, o = {}) { const { uit = 'bezorgd' } = o;
  persoon(ctx, 'bilal', 300, 770, 520, { outfit: 'zwem', t }); persoon(ctx, 'daan', 1620, 770, 490, { outfit: 'zwem', t });
  const r = persoon(ctx, 'sam', 960, 770, 520, { outfit: 'zwem', uit, t });
  SP6_blokVoor(ctx, 300, 610, 230, 770, '3'); SP6_blokVoor(ctx, 960, 610, 230, 770, '4'); SP6_blokVoor(ctx, 1620, 610, 230, 770, '5'); return r; }
// zijaanzicht van de startkant met het blok en de zwemmer erop
const SP6_ZIJ = { rand: 1000, dek: 760, water: 800, s: 235 };
function SP6_zijKant(ctx, t) { bg(ctx, 'schema'); SP6_badZij(ctx, SP6_ZIJ.rand, SP6_ZIJ.dek, SP6_ZIJ.water, t); SP6_blok(ctx, SP6_ZIJ.rand, SP6_ZIJ.water - 0.75 * SP6_ZIJ.s, SP6_ZIJ.s, { nummer: '4' }); }
const SP6_BLOKTOP = SP6_ZIJ.water - 0.75 * SP6_ZIJ.s;
// routine-tijdlijn onderaan rechts
function SP6_tijdlijn(ctx, l1, l2, l3, a = 1) { if (a <= 0.01) return; laag(ctx, a, () => { lijn(ctx, [[1250, 826], [1610, 826]], C.line, 3); SP6_icoon(ctx, 1250, 826, 'bril', l1); SP6_icoon(ctx, 1430, 826, 'armen', l2); SP6_icoon(ctx, 1610, 826, 'lang', l3); }); }
// de proefkolommen van Kross: links IK, rechts EIGEN NAAM OF JE
const SP6_LINKS = ['noor', 'thijs', 'sanne'], SP6_RECHTS = ['yasmin', 'lotte', 'jesse'];
function SP6_kolom(ctx, x, kop, ids, y, t, o = {}) { const { kopA = 1, ppl = 1, schrijf = 0, licht = 0, w = 600 } = o;
  laag(ctx, kopA, () => { ctx.save(); ctx.font = fTekst(44, 800); const kw = ctx.measureText(kop).width + 60; roundRect(ctx, x - kw / 2, y - 52, kw, 76, 14); shape(ctx, licht > 0.01 ? rgba(C.goud, 0.2 * licht) : rgba('#0D1420', 0.6), licht > 0.01 ? C.goud : C.line, 2 + 2 * licht); ctx.restore(); text(ctx, kop, x, y + 2, fTekst(44, 800), licht > 0.5 ? C.goud : C.text, 'center'); });
  ids.forEach((id, i) => { const px = x + (i - 1) * 170; SP6_portret(ctx, id, px, y + 190, 1.15, ppl, { t }); SP6_potlood(ctx, px + 30, y + 290, t + i, ppl * schrijf); }); }

Object.assign(SCENES, {
  title(ctx, t) { const u = ease(ramp(t, 0.3, 3.5)); const s = 15;
    const B = SP6_badBoven(ctx, 1490, 650, 13, { t, tribune: false, licht: u });
    SP6_zwemmerBoven(ctx, B.x0 + 1.4 * s, B.baan(4), 1.8 * s, 0, { slag: false });
    const wx = lerp(1490, B.x0 + 2.5 * s, u), wy = lerp(420, B.baan(4) - 1.7 * s, u), sc = lerp(1, 0.32, u);
    ctx.save(); ctx.translate(wx, wy); ctx.scale(sc, sc); SP6_wolk(ctx, 0, 0, 'WAT ALS …', C.paars, 1, { px: 40 }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const Zij = q.on('Het', 1, 0.35), Sp = q.on('spreek', 1, 0.5);
    if (Zij < 1) { bg(ctx, 'schema'); const u = ease(ramp(t, 0.4, 3.0)), s = lerp(24, 96, u), fx = lerp(0, -24.5, u), fy = lerp(0, 1.25 + 0.0, u);
      const cx = lerp(960, 640, u) - fx * s, cy = lerp(560, 560, u) - fy * s;
      laag(ctx, 1 - Zij, () => { ctx.save(); ctx.beginPath(); ctx.rect(0, 84, W, 796); ctx.clip(); const B = SP6_badBoven(ctx, cx, cy, s, { t, licht: u });
        const bx = B.x0 - 1.6 * s, by = B.baan(4); ctx.fillStyle = CAST.sam.huid; ctx.beginPath(); ctx.ellipse(bx, by, 0.22 * s, 0.5 * s, 0, 0, 6.283); ctx.fill(); circ(ctx, bx + 0.03 * s, by, 0.13 * s, '#D8573F');
        SP6_scorebord(ctx, 960, 150, 1); ctx.restore(); }); }
    if (Zij > 0.01) laag(ctx, Zij, () => { SP6_startkant(ctx, t); SP6_scorebord(ctx, 960, 150, 1);
      const r = SP6_startrij(ctx, t, { uit: Sp > 0.5 ? 'denkt' : 'bezorgd' }); const kop = { x: r.hoofd.x, y: r.hoofd.y - 30 };
      const w1 = q.on('Wat', 1, 0.3), w2 = q.on('Iedereen', 1, 0.3), w3 = ramp(t, q.at('kijkt', 1) + 0.55, 0.25), uit = 1 - Sp;
      const tril = (k) => ({ x: 4 * Math.sin(t * 17 + k), y: 3 * Math.sin(t * 13 + k * 2) });
      let d = tril(1); SP6_wolk(ctx, 620 + d.x, 330 + d.y, SP6_KOUD[0], C.paars, w1 * uit, { staart: kop });
      d = tril(2); SP6_wolk(ctx, 1330 + d.x, 300 + d.y, SP6_KOUD[1], C.paars, w2 * uit, { staart: kop });
      d = tril(3); SP6_wolk(ctx, 660 + d.x, 480 + d.y, SP6_KOUD[2], C.paars, w3 * uit, { staart: kop });
      laag(ctx, Sp, () => { kaart(ctx, 1080, 400, 470, 190, 1, C.goud); text(ctx, 'Jezelf bij je naam', 1110, 470, fTekst(42, 800), C.text, 'left'); text(ctx, 'aanspreken?', 1110, 526, fTekst(42, 800), C.text, 'left');
        metaText(ctx, 'ADVIES VAN EEN SPORTPSYCHOLOOG', 1110, 570, C.goud, 'left', 18); vraagteken(ctx, 1490, 520, q.on('Waarom', 1, 0.4), 100); }); }); },

  // ---------- H1 Je innerlijke stem ----------
  s03(ctx, t, q) { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); SP6_klok(ctx, '−20 MIN', 1);
    const x = 860 + 110 * Math.sin(t * 0.32), r = zwemmer(ctx, 'sam', x, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t);
    const kop = { x: r.hoofd.x, y: WY - 30 };
    const Pr = q.on('praat', 1, 0.4), E = q.on('Eerste', 1, 0.4), S = q.on('Sterk', 1, 0.4);
    SP6_wolk(ctx, kop.x - 60, 230, '…', C.paars, Pr * (1 - E), { staart: kop, px: 44 });
    naamBij(ctx, 'innerlijke stem', 'zonder geluid', kop.x + 70, 220, q.on('innerlijke', 1, 0.4) * (1 - E), 'left');
    const gl = q.on('plan', 1, 0.5);
    SP6_wolk(ctx, 520, 220, 'EERSTE 50 RUSTIG', C.goud, E, { staart: kop });
    SP6_wolk(ctx, 1380, 220, 'STERK UIT HET KEERPUNT', C.goud, S, { staart: kop });
    laag(ctx, gl, () => { metaText(ctx, 'RACEPLAN', 960, 140, C.goud, 'center', 30); }); },

  s04(ctx, t, q) { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); SP6_klok(ctx, '−20 MIN', 1);
    const x = 860 + 110 * Math.sin((t + 17.8) * 0.32), r = zwemmer(ctx, 'sam', x, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t);
    const kop = { x: r.hoofd.x, y: WY - 30 };
    const M = q.on('malen', 1, 0.6), K = q.on('kwartier', 1, 1.2);
    // het raceplan schuift weg als de stem gaat malen
    SP6_wolk(ctx, 520 - 300 * K, 220 - 40 * M, 'EERSTE 50 RUSTIG', C.goud, 1 - K, { staart: kop, px: 34 - 6 * M });
    SP6_wolk(ctx, 1380 + 300 * K, 220 - 40 * M, 'STERK UIT HET KEERPUNT', C.goud, 1 - K, { staart: kop, px: 34 - 6 * M });
    const w1 = q.on('Wat', 1, 0.3), w2 = ramp(t, q.at('verlies', 1) - 0.5, 0.3), extra = K;
    const rond = (i, n) => { const an = -Math.PI / 2 + i * 6.283 / n + K * (t - q.at('kwartier', 1)) * 0.9; return { x: kop.x + Math.cos(an) * 380, y: 245 + Math.sin(an) * 115 }; };
    const lijst = [['WAT ALS …', w1], ['EN ALS …', w2], ['WAT ALS …', extra], ['EN ALS …', extra], ['WAT ALS …', extra]];
    lijst.forEach(([s2, a], i) => { if (a <= 0.01) return; const vast = [{ x: kop.x - 330, y: 300 }, { x: kop.x + 330, y: 300 }][i] || rond(i, 5); const p = i < 2 ? { x: lerp(vast.x, rond(i, 5).x, K), y: lerp(vast.y, rond(i, 5).y, K) } : rond(i, 5);
      SP6_wolk(ctx, p.x, p.y, s2, C.paars, a, { staart: kop, px: 32 }); });
    SP6_kaartje(ctx, 110, 560, 820, 'CHATTER', ['de innerlijke stem die gaat malen,', 'piekeren en zichzelf verwijten'], q.on('chatter', 1, 0.4), C.paars, 32);
    metaA(ctx, 'ETHAN KROSS', 136, 760, q.on('chatter', 1, 0.4), C.grain, 'left', 22);
    vraagteken(ctx, 1640, 700, q.on('betekent', 1, 0.4), 130); },

  s06(ctx, t, q) { const WY = 470, L = 280; SP6_onderWater(ctx, WY, t, 120); SP6_klok(ctx, '−20 MIN', 1); antwoord(ctx, 'antwoord c: het kan ruimte kosten die hij nodig heeft', 1);
    const r = zwemmer(ctx, 'sam', 330 + 30 * Math.sin(t * 0.3), WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, 900, WY, t);
    const Z = q.on('werkbank', 1, 0.6), CX = 1300, CY = 500, R = 340;
    zoomCircle(ctx, CX, CY, R, r.hoofd.x, r.hoofd.y, '', Z, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(CX - R, CY - R, 2 * R, 2 * R);
      const vl = q.on('weinig', 1, 0.4) * (1 - q.on('Piekeren', 2, 0.4));
      const B = SP6_werkbank(ctx, CX, CY + 120, 640, { a: 1, vakLicht: vl, kop: q.on('werkgeheugen', 1, 0.4) > 0.01 });
      const st = q.on('stil', 1, 0.8), plan = [['EERSTE 50\nRUSTIG', 0], ['STERK UIT\nKEERPUNT', 1], ['LANG', 2]];
      // koraal blokjes schuiven op de bank, elk duwt een goud kaartje eraf
      const tb = [q.at('Piekeren', 2), q.at('weer', 1), q.at('werkbank', 2)], uit = [null, 2, 1];
      const blok = (k) => ramp(t, tb[k], 0.7);
      plan.forEach(([s2, v], i) => { const p = B.vak(v); const k = uit.indexOf(v); const val = k >= 0 ? ramp(t, tb[k] + 0.35, 0.9) * (1 - st) : 0;
        const gl = q.on('raceplan', 1, 0.5) * (v === 0 ? 1 : 0);
        SP6_blokje(ctx, p.x + val * 70, p.y + val * val * 330, B.vw - 30, 84, s2, C.goud, 1, val * 0.9);
        if (gl > 0.01) laag(ctx, gl, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; roundRect(ctx, p.x - (B.vw - 22) / 2, p.y - 46, B.vw - 22, 92, 10); ctx.stroke(); }); });
      const doel = [3, 2, 1]; doel.forEach((v, k) => { const p = B.vak(v), u = blok(k); if (u <= 0.01) return; const puls = q.on('angstig', 1, 0.5) * 0.06 * Math.sin(t * 8 + k);
        SP6_blokje(ctx, lerp(CX + R + 80, p.x, ease(u)), p.y - 6, B.vw - 34, 80 * (1 + puls), "WAT\nALS …", C.koraal, 1 - st, 0); });
      laag(ctx, q.on('werkgeheugen', 1, 0.4), () => metaText(ctx, 'KLEINE WERKRUIMTE', CX, CY - 230, C.text2, 'center', 26)); });
    metaA(ctx, 'HATZIGEORGIADIS E.A. 2011 · EYSENCK E.A. 2007 · MORAN 2016', 960, 868, q.on('proeven', 1, 0.5), C.grain, 'center', 24); },

  // ---------- H2 Afstand nemen ----------
  s07(ctx, t, q) { const V = q.on('vorige', 1, 0.35);
    if (V < 1) laag(ctx, 1 - V, () => { SP6_wachtruimte(ctx, t); SP6_klok(ctx, '−10 MIN', 1);
      persoon(ctx, 'daan', 330, 774, 400, { outfit: 'zwem', pose: 'zit', zitHoogte: 134, uit: 'neutraal', t });
      for (const [sx, k] of [[600, 0], [1120, 1]]) { ctx.fillStyle = k ? '#3E4C6A' : '#435273'; ctx.beginPath(); ctx.ellipse(sx, 560, 62, 90, 0, 0, 6.283); ctx.fill(); circ(ctx, sx, 440, 42, _mixHex(ctx.fillStyle, '#FFFFFF', 0.06)); roundRect(ctx, sx - 50, 620, 100, 150, 20); ctx.fill(); }
      persoon(ctx, 'bilal', 1360, 774, 420, { outfit: 'zwem', pose: 'zit', zitHoogte: 134, uit: 'neutraal', t });
      const r = persoon(ctx, 'sam', 860, 774, 420, { outfit: 'zwem', pose: 'vasthouden', zitHoogte: 134, uit: 'denkt', t, hold: (c, hx, hy) => SP6_bril(c, hx, hy - 6, 1.2) });
      SP6_handdoek(ctx, r, 420); });
    if (V > 0.01) laag(ctx, V, () => { SP6_kamer(ctx, t); SP6_whiteboard(ctx, 760, 180, 1060, 440);
      tag(ctx, 'VORIGE WEEK', 260, 150, C.text2, 1, 'center', 30);
      const L1 = q.on('mis', 1, 1.0), L2 = ramp(t, q.at('En:', 1) + 0.3, 1.2), Hl = q.on('anders', 1, 0.5);
      // kolommen op het bord
      text(ctx, 'IK', 1025, 260, fTekst(46, 800), Hl > 0.5 ? '#A07A10' : '#2A3550', 'center'); text(ctx, 'JE', 1555, 260, fTekst(46, 800), Hl > 0.5 ? '#A07A10' : '#2A3550', 'center');
      lijn(ctx, [[1290, 220], [1290, 590]], '#9AA6B6', 3);
      SP6_schrijf(ctx, 'WAT ALS IK', 1025, 380, 48, '#2A3F8A', ramp(t, q.at('Wat', 1) - 0.2, 0.8), 'center'); SP6_schrijf(ctx, 'DE START MIS?', 1025, 450, 48, '#2A3F8A', L1, 'center');
      if (Hl > 0.01) laag(ctx, Hl, () => { ctx.fillStyle = rgba(C.goud, 0.45); ctx.fillRect(1555 - 18 + 52, 340, 72, 54); ctx.fillRect(1555 - 38, 218, 76, 54); });
      SP6_schrijf(ctx, 'WAT ALS JE', 1555, 380, 48, '#2A3F8A', L2, 'center'); SP6_schrijf(ctx, 'DE START MIST?', 1555, 450, 48, '#2A3F8A', ramp(t, q.at('En:', 1) + 1.0, 1.0), 'center');
      const schrijft = Math.max(fase(t, q.at('Wat', 1) - 0.3, q.at('mis', 1) + 0.9, 0.3), fase(t, q.at('En:', 1) + 0.2, q.at('mist', 1) + 0.7, 0.3));
      const kant = t < q.at('En:', 1) ? 0 : 1, doel = schrijft > 0.5 ? { x: kant ? 1500 + 200 * ramp(t, q.at('En:', 1) + 0.3, 2) : 900 + 260 * ramp(t, q.at('Wat', 1) - 0.2, 1.8), y: 420 } : null;
      const wijst = q.on('Kijk', 1, 0.3) * (1 - q.on('Dat', 1, 0.3));
      SP6_reik(ctx, 'sportpsycholoog', kant ? 1850 : 720, 784, 440, { zij: true, kijk: kant ? -1 : 1, uit: wijst > 0.5 ? 'praat' : 'neutraal', t, pose: wijst > 0.5 ? 'wijs' : 'staan' }, doel || (wijst > 0.5 ? { x: kant ? 1600 : 1010, y: 300 } : null));
      persoon(ctx, 'sam', 470, 784, 420, { outfit: 'zwem', pose: 'zit', stoel: true, zij: true, kijk: 1, uit: 'neutraal', t });
      tag(ctx, 'AFSTAND NEMEN', 1290, 712, C.goud, q.on('afstand', 1, 0.4), 'center', 36); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); paneel(ctx, 220, 170, 1480, 640, '', 1); metaText(ctx, 'DE PROEF VAN KROSS', 960, 230, C.text2, 'center', 26);
    const St = q.on('Studenten', 1, 0.5), Sc = q.on('bereiden', 1, 0.5);
    SP6_kolom(ctx, 600, 'IK', SP6_LINKS, 340, t, { kopA: q.on("'ik'", 1, 0.4), ppl: St, schrijf: Sc });
    SP6_kolom(ctx, 1320, 'EIGEN NAAM OF JE', SP6_RECHTS, 340, t, { kopA: q.on('naam', 1, 0.4), ppl: St, schrijf: Sc });
    laag(ctx, q.on('vijf', 1, 0.4), () => { klokje(ctx, 960, 470, 56, clamp((t - q.at('vijf', 1)) / 9, 0, 1), 1); metaText(ctx, '5 MIN', 960, 570, C.text, 'center', 30); metaText(ctx, 'SPEECH', 960, 610, C.text2, 'center', 22); });
    vraagteken(ctx, 1320, 760, q.on('Hoe', 1, 0.4), 110); },

  s10(ctx, t, q) { const K = q.on('Met', 1, 0.35);
    if (K < 1) laag(ctx, 1 - K, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: beter, en achteraf piekerden ze minder', 1); paneel(ctx, 320, 190, 1280, 640, '', 1);
      const V = q.on('verschilde', 1, 0.5);
      SP6_kolom(ctx, 660, 'IK', SP6_LINKS, 300, t, { licht: V, w: 560 }); SP6_kolom(ctx, 1260, 'EIGEN NAAM OF JE', SP6_RECHTS, 300, t, { licht: V, w: 560 });
      tag(ctx, 'BETER GESPROKEN', 1260, 410, C.goud, q.on('beter', 1, 0.4), 'center', 28);
      const Ach = q.on('Achteraf', 1, 0.4), s1 = q.on('schaamden', 1, 0.8), s2 = q.on('maalden', 1, 0.8);
      balk(ctx, 450, 640, 420, 0.72, C.koraal, 'SCHAAMTE', Ach); balk(ctx, 450, 740, 420, 0.75, C.koraal, 'NAPIEKEREN', Ach);
      balk(ctx, 1050, 640, 420, 0.72 - 0.34 * s1, C.koraal, 'SCHAAMTE', Ach); balk(ctx, 1050, 740, 420, 0.75 - 0.36 * s2, C.koraal, 'NAPIEKEREN', Ach);
      laag(ctx, q.on('zekerder', 1, 0.4) * (1 - Ach * 0), () => { [['JE HEBT DIT GEOEFEND', 1260, 590]].forEach(([s3, x, y]) => { roundRect(ctx, x - 210, y - 30, 420, 44, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, s3, x, y + 2, fTekst(24, 800), '#2A3F8A', 'center'); }); });
      // twee beoordelaars met scorekaarten
      const Bo = q.on('beoordelaars', 1, 0.3), kaartje = (c, hx, hy) => { roundRect(c, hx - 34, hy - 84, 68, 84, 6); shape(c, '#F2EEE4', '#B8B0A0', 2); for (let k = 0; k < 3; k++) { c.fillStyle = '#9AA3B2'; c.fillRect(hx - 22, hy - 70 + k * 18, 44, 6); } };
      laag(ctx, Bo, () => { persoon(ctx, 'erik', 150, 860, 420, { pose: 'vasthouden', kijk: 1, uit: 'neutraal', t, hold: kaartje }); persoon(ctx, 'joost', 1770, 860, 410, { pose: 'vasthouden', kijk: -1, uit: 'neutraal', t, hold: kaartje }); });
      metaA(ctx, 'KROSS E.A. 2014', 960, 868, Bo, C.grain, 'center', 24); });
    if (K > 0.01) laag(ctx, K, () => { SP6_kamer(ctx, t); SP6_whiteboard(ctx, 1150, 180, 670, 360);
      text(ctx, 'WAT ALS IK DE START MIS?', 1485, 300, fTekst(38, 700), '#2A3F8A', 'center'); text(ctx, 'WAT ALS JE DE START MIST?', 1485, 420, fTekst(38, 700), '#2A3F8A', 'center');
      ctx.fillStyle = rgba(C.goud, 0.45); ctx.fillRect(1430, 386, 50, 46);
      const rs = persoon(ctx, 'sam', 700, 820, 440, { outfit: 'zwem', pose: 'zit', stoel: true, uit: q.on('vriend', 1, 0.4) > 0.5 ? 'blij' : 'neutraal', t });
      const hh = 440 * 1.04 / 6.1, sch = { x: rs.hoofd.x + hh * 0.95, y: rs.hoofd.y + hh * 1.45 };
      const H = q.on('vriend', 1, 0.5);
      SP6_reik(ctx, 'sportpsycholoog', 900, 820, 450, { zij: true, kijk: -1, uit: 'blij', t }, H > 0.5 ? sch : null);
      metaA(ctx, 'KROSS E.A. 2014', 960, 868, 1, C.grain, 'center', 24); }); },

  s11(ctx, t, q) { const Vl = q.on('vlieg', 1, 0.8), Vt = q.on('vooruit', 1, 0.6), Wl = q.on('Wel', 1, 0.6), Kl = q.on('kleine', 1, 0.5);
    if (Vl < 1) laag(ctx, 1 - Vl, () => { const WY = 380, L = 360; SP6_onderWater(ctx, WY, t, 170); const r = zwemmer(ctx, 'sam', 860, WY + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8 }); SP6_waterlijn(ctx, 0, W, WY, t); });
    if (Vl > 0.01 && Wl < 1) laag(ctx, Vl * (1 - Wl), () => { bg(ctx, 'schema'); const s = lerp(30, 14, ease(Vt)), cx = lerp(960, 520, ease(Vt)), cy = lerp(540, 520, ease(Vt));
      const B = SP6_badBoven(ctx, cx, cy, s, { t, tribune: false, licht: 0.6 }); const sx = B.x0 + ((4 + t * 1.7 * 0.5) % 46) * s; SP6_zwemmerBoven(ctx, sx, B.baan(4), 1.8 * s, t);
      SP6_vlieg(ctx, 1810, 190, 2.2, t, 1 - Vt);
      laag(ctx, Vt, () => { const fl = ramp(t, q.at('vooruit', 1) + 0.6, 1.6); SP6_kalender(ctx, 1450, 330, fl < 0.5 ? 'VANDAAG' : 'OVER EEN JAAR', 1, (fl * 4) % 1);
        SP6_rooster(ctx, 1060, 540, 800, 300, q.on('jaar', 1, 0.5), q.on('jaar', 1, 0.8)); metaA(ctx, 'DEZE FINALE', 1060 + 24 + 2.5 * 63, 535, q.on('jaar', 1, 0.5), C.goud, 'left', 22); }); });
    if (Wl > 0.01) laag(ctx, Wl, () => { bg(ctx, 'schema'); SP6_kaartje(ctx, 120, 150, 760, 'ONDERZOEK', ['vooral met studenten'], 1, C.oker, 38);
      laag(ctx, 1 - Kl, () => { SP6_LINKS.concat(SP6_RECHTS).forEach((id, i) => SP6_portret(ctx, id, 420 + i * 216, 520, 1.6, 1, { t })); metaText(ctx, 'STUDENTEN IN EEN LAB', 960, 700, C.text2, 'center', 26); });
      laag(ctx, Kl, () => { SP6_hometrainer(ctx, 560, 800, 230, t, 'erik'); tag(ctx, '10 KM', 830, 420, C.teal, q.on('tijdrit', 1, 0.4), 'center', 34);
        metaA(ctx, 'KLEINE PROEF · 16 ACTIEVE MANNEN', 1440, 330, q.on('zestien', 1, 0.4), C.text2, 'center', 26);
        const Bt = q.on('tijdrit', 1, 0.5); laag(ctx, Bt, () => { metaText(ctx, 'TIJD VOOR 10 KM', 1100, 440, C.text2, 'left', 24);
          const g = q.on('sneller', 1, 0.8); text(ctx, 'IK', 1080, 530, fTekst(40, 800), C.text, 'right'); text(ctx, 'JE', 1080, 640, fTekst(40, 800), C.text, 'right');
          balk(ctx, 1110, 500, 650, 0.92, C.line, '', 1); balk(ctx, 1110, 610, 650, 0.92 - 0.02 * g, C.goud, '', 1); metaA(ctx, '≈ 2 % SNELLER', 1110 + 650 * 0.9, 700, g, C.goud, 'right', 24); }); }); });
    metaA(ctx, 'AYDUK & KROSS 2010 · BRUEHLMAN-SENECAL & AYDUK 2015 · HARDY E.A. 2019', 960, 868, q.on('vlieg', 1, 0.5), C.grain, 'center', 22); },

  // ---------- H3 Uitdaging of bedreiging ----------
  s12(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '−1 MIN', 1); const v = 0.35 + 0.55 * ramp(t, 0.8, 5);
    const sw = 0.35 * Math.sin(t * 9), tr = q.on('handen', 1, 0.4) * 0.04 * Math.sin(t * 40);
    const r = SP6_samZij(ctx, 780, SP6_ZIJ.dek, 430, t, { arm: [0.25 + sw + tr, 0.15], armVer: [0.25 - sw, 0.15], uit: 'bezorgd' });
    const hh = 430 * 1.04 / 6.1, bx = 780 + hh * 0.3, by = SP6_ZIJ.dek - 430 * 1.04 + hh * 2.4;
    const Zh = q.on('hart', 1, 0.5), CX = 420, CY = 330, R = 170;
    zoomCircle(ctx, CX, CY, R, bx, by, 'HART', Zh, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(CX - R, CY - R, 2 * R, 2 * R); const HH = 300; BODY = { cx: CX - 0.09 * HH, yb: CY - 2.22 * HH + 7.3 * HH, h: 7.3 * HH }; anHeart(1, t * (2.4 + 3 * v) * Math.PI, 0); });
    SP6_hartmeter(ctx, 1440, 330, 380, v, t, { a: q.on('hart', 1, 0.5) });
    vraagteken(ctx, 1440, 560, q.on('betekent', 1, 0.4), 110); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: het kan allebei, dat hangt van zijn uitleg af', 1);
    const Ve = q.on('Vereenvoudigd', 1, 0.6), Kl = q.on('klein', 1, 0.5), Tr = q.on('Training', 1, 0.5);
    SP6_hartmeter(ctx, 1640, 300, 340, 0.8, t, { a: 1 });
    // weegschaal
    laag(ctx, 1 - Ve, () => { const k = 0.75 * q.on('bedreiging', 1, 0.8) - 1.5 * q.on('huis', 1, 0.8);
      SP6_weegschaal(ctx, 820, 330, 0.95, k, 1);
      tag(ctx, 'UITDAGING', 520, 760, C.goud, q.on('uitdaging', 1, 0.4), 'center', 32); tag(ctx, 'BEDREIGING', 1120, 760, C.koraal, q.on('bedreiging', 1, 0.4), 'center', 32); });
    // lichaamsschema en een bloedvat in de zoomcirkel
    if (Ve > 0.01) laag(ctx, Ve, () => { const Ui = q.on('uitdaging', 2, 0.6), Be = q.on('bedreiging', 2, 0.6), Sp = q.on('sport', 1, 0.6);
      const st = clamp(Ui - Be + Sp, 0, 1); // 1 = uitdaging, 0 = bedreiging (vóór 'uitdaging': gewoon)
      const vatB = Ui < 0.01 ? 0.5 : lerp(0.18, 0.95, st), stroom = Ui < 0.01 ? 0.4 : lerp(0.25, 1, st), kl = Ui < 0.01 ? null : (st > 0.5 ? C.goud : C.koraal);
      BODY = { cx: 560, yb: 860, h: 600 }; ctx.save(); anFigure(1, t); anVessels(1, t * (0.8 + 1.6 * stroom), 1); anHeart(1, t * (5 + 3 * stroom), 0); ctx.restore();
      metaText(ctx, 'VEREENVOUDIGD · IN METINGEN VAAK', 560, 236, C.grain, 'center', 24);
      const [sx, sy] = AP(-1.05, 3.4);
      zoomCircle(ctx, 1180, 500, 230, sx, sy, 'BLOEDVAT', 1, () => SP6_vat(ctx, 1180, 500, 230, vatB, stroom, t, kl));
      tag(ctx, st > 0.5 ? 'UITDAGING · WIJDER' : 'BEDREIGING · NAUWER', 1180, 240, st > 0.5 ? C.goud : C.koraal, Ui, 'center', 30);
      laag(ctx, Kl, () => { balk(ctx, 1000, 800, 360, 0.12, C.goud, '', 1); text(ctx, 'EFFECT: KLEIN', 990, 832, fTekst(28, 800), C.text, 'right'); });
      laag(ctx, Tr, () => { kaart(ctx, 1490, 480, 300, 330, 1, C.teal); metaText(ctx, 'TRAINING', 1640, 528, C.teal, 'center', 26);
        ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'].forEach((d, i) => { metaText(ctx, d, 1530, 580 + i * 32, C.text2, 'left', 18); const n = [3, 2, 3, 0, 3, 2, 0][i]; for (let k = 0; k < n; k++) { roundRect(ctx, 1580 + k * 60, 564 + i * 32, 52, 20, 5); shape(ctx, rgba(C.teal, 0.7), null); } });
        tag(ctx, 'DE BASIS', 1640, 790, C.teal, 1, 'center', 26); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const Na = q.on('naamgroep', 1, 0.5), Bp = q.on('Beide', 1, 0.5);
    const kaartH = (c, hx, hy) => { roundRect(c, hx - 110, hy - 120, 220, 110, 10); shape(c, '#F2EEE4', C.goud, 3); text(c, 'OPWINDING', hx, hy - 76, fTekst(26, 800), '#1A2740', 'center'); text(c, 'HELPT', hx, hy - 40, fTekst(26, 800), '#1A2740', 'center'); };
    persoon(ctx, 'passant', 300, 760, 400, { pose: 'vasthouden', kijk: 1, uit: 'blij', t, hold: kaartH });
    const Li = q.on('lichaam', 1, 0.5), Ui = q.on('uitdaging', 1, 0.6);
    zoomCircle(ctx, 820, 430, 200, 330, 470, '', Li, () => SP6_vat(ctx, 820, 430, 200, lerp(0.3, 0.95, Ui), lerp(0.35, 1, Ui), t, Ui > 0.5 ? C.goud : C.koraal));
    tag(ctx, 'UITDAGING', 820, 190, C.goud, Ui, 'center', 32);
    laag(ctx, Na, () => { paneel(ctx, 1160, 190, 660, 560, '', 1); SP6_kolom(ctx, 1490, 'EIGEN NAAM OF JE', SP6_RECHTS, 290, t, {}); tag(ctx, 'VAKER UITDAGING', 1490, 640, C.goud, q.on('vaker', 1, 0.4), 'center', 32); });
    laag(ctx, Bp, () => { tag(ctx, 'PROEF 1: UITLEG', 560, 840, C.text2, 1, 'center', 30); tag(ctx, 'PROEF 2: JE NAAM', 1490, 840, C.text2, 1, 'center', 30); });
    metaA(ctx, 'JAMIESON E.A. 2012 · VINE E.A. 2016 · MOORE E.A. 2015', 960, 130, q.on('proef', 1, 0.5), C.grain, 'center', 24); },

  // ---------- H4 Routines en rituelen ----------
  s16(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
    const Br = fase(t, q.at('bril', 1) - 0.2, q.at('twee', 1), 0.3), Zw = ramp(t, q.at('twee', 1), q.at('Dat', 1) - q.at('twee', 1)), op = q.at('bril', 1) + 0.5 < t;
    const hh = 420 * 1.04 / 6.1, sx = 930, oog = { x: sx + hh * 0.75, y: SP6_BLOKTOP - 420 * 1.04 + hh * 0.55 };
    const zwaai = Zw > 0.001 && Zw < 0.999 ? Zw * 2 * 6.283 : 0;
    if (Br > 0.5) SP6_reik(ctx, 'sam', sx, SP6_BLOKTOP, 420, { outfit: 'zwem', zij: true, kijk: 1, t, bril: op ? 'ogen' : undefined, armVer: [0.1, 0.15] }, oog);
    else SP6_samZij(ctx, sx, SP6_BLOKTOP, 420, t, { bril: op ? 'ogen' : undefined, arm: [0.1 + zwaai, 0.1], armVer: [0.1 + zwaai, 0.1] });
    const kn = q.on('geoefend', 1, 0.3) * (1 - q.on('trainer', 1, 0.3)) * 0.25 * Math.max(0, Math.sin((t - q.at('geoefend', 1)) * 9));
    persoon(ctx, 'zwemtrainer', 330, SP6_ZIJ.dek, 430, { zij: true, kijk: 1, t, knik: kn, uit: q.on('geoefend', 1, 0.3) > 0.5 ? 'blij' : 'neutraal' });
    SP6_tijdlijn(ctx, q.on('bril', 1, 0.3), ramp(t, q.at('zwaaien', 1), 0.3), 0, q.on('bril', 1, 0.4));
    SP6_kaartje(ctx, 110, 140, 800, 'OVERZICHT VAN VEEL ONDERZOEKEN', ['routine → beter, ook onder druk'], q.on('overzicht', 1, 0.4), C.goud, 38);
    metaA(ctx, 'RUPPRECHT E.A. 2021', 136, 300, q.on('overzicht', 1, 0.4), C.grain, 'left', 22); },

  s17(ctx, t, q) { const On = q.on('Onderzoekers', 1, 0.35);
    if (On < 1) laag(ctx, 1 - On, () => { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
      const u = ease(ramp(t, q.at('voet', 1) - 0.6, 1.3)), x = lerp(780, 930, u), y = lerp(SP6_ZIJ.dek, SP6_BLOKTOP, u), til = Math.sin(u * Math.PI);
      const r = SP6_samZij(ctx, x, y, 420, t, { bril: 'ogen', been1: { th: 0.9 * til, kn: 1.5 * til, an: 0 }, vrij: til > 0.05 });
      const hh = 420 * 1.04 / 6.1; laag(ctx, q.on('voet', 1, 0.4) * (1 - ramp(t, q.at('op.', 1) + 0.8, 0.4)), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + hh * 0.5, y - hh * 0.2, hh * 1.1, hh * 0.6, 0, 0, 6.283); ctx.stroke(); });
      SP6_kaartje(ctx, 110, 140, 760, 'RITUEEL', ['vaste reeks handelingen,', 'zonder direct nut'], q.on('ritueel', 1, 0.4), C.paars, 36); });
    if (On > 0.01) laag(ctx, On, () => { bg(ctx, 'schema'); const ph = Math.floor((t - q.at('Onderzoekers', 1)) / 1.1) % 4, poses = ['zwaai', 'wijsOmhoog', 'handenHeup', 'staan'];
      const groep = (x, ids, lab, a) => { ids.forEach((id, i) => persoon(ctx, id, x + (i - 1) * 170, 800, 380, { pose: poses[ph], t, uit: 'neutraal', kijk: i === 2 ? -1 : 1 }));
        laag(ctx, a, () => { ctx.font = fTekst(32, 800); const w = ctx.measureText(lab).width + 50; kaart(ctx, x - w / 2, 300, w, 66, 1, C.line); text(ctx, lab, x, 345, fTekst(32, 800), C.text, 'center'); }); };
      groep(500, ['passant', 'anouk', 'milan'], 'RITUEEL', q.on('ritueel', 2, 0.4)); groep(1420, ['sanne', 'bram', 'joost'], 'WILLEKEURIGE HANDELINGEN', q.on('willekeurige', 1, 0.4));
      metaText(ctx, 'ZELFDE HANDELINGEN · VÓÓR EEN SPANNENDE TAAK', 960, 200, C.text2, 'center', 24);
      vraagteken(ctx, 960, 620, q.on('gebeurde', 1, 0.4), 130); }); },

  s19(ctx, t, q) { const Zo = q.on('zongen', 1, 0.35), Ge = q.on('Geluk', 1, 0.35);
    if (Zo < 1) laag(ctx, 1 - Zo, () => { bg(ctx, 'schema'); antwoord(ctx, "antwoord c: als het 'ritueel' heette, werkte het beter", 1);
      [[500, ['passant', 'anouk', 'milan'], 'RITUEEL', C.goud], [1420, ['sanne', 'bram', 'joost'], 'WILLEKEURIGE HANDELINGEN', C.line]].forEach(([x, ids, lab, kl]) => {
        if (kl === C.goud) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; roundRect(ctx, x - 290, 270, 580, 560, 20); ctx.stroke(); ctx.restore(); }
        ids.forEach((id, i) => persoon(ctx, id, x + (i - 1) * 170, 800, 380, { t, uit: kl === C.goud ? 'blij' : 'neutraal', kijk: i === 2 ? -1 : 1 }));
        ctx.font = fTekst(32, 800); const w = ctx.measureText(lab).width + 50; kaart(ctx, x - w / 2, 300, w, 66, 1, kl); text(ctx, lab, x, 345, fTekst(32, 800), kl === C.goud ? C.goud : C.text, 'center'); }); });
    if (Zo > 0.01 && Ge < 1) laag(ctx, Zo * (1 - Ge), () => { bg(ctx, 'schema'); antwoord(ctx, "antwoord c: als het 'ritueel' heette, werkte het beter", 1);
      const Ru = q.on('rustiger', 1, 1.2), Bt = q.on('beter', 1, 0.4);
      persoon(ctx, 'passant', 960, 820, 400, { t, uit: 'neutraal', pose: 'staan' }); metaText(ctx, 'EEN VREEMDE', 960, 380, C.text2, 'center', 22);
      persoon(ctx, 'anouk', 480, 820, 420, { t, uit: 'praat', kijk: 1 }); SP6_noot(ctx, 540, 520, t, 1, C.goud);
      persoon(ctx, 'milan', 1440, 820, 430, { t, uit: 'praat', kijk: -1 }); SP6_noot(ctx, 1340, 510, t + 0.7, 1, C.text2);
      ctx.font = fTekst(30, 800); tag(ctx, 'RITUEEL', 480, 300, C.goud, 1, 'center', 30); tag(ctx, 'NIETS', 1440, 300, C.line, 1, 'center', 30);
      SP6_hartmeter(ctx, 200, 520, 240, lerp(0.85, 0.35, Ru), t, { kl: lerp(0, 1, Ru) > 0.5 ? C.goud : C.koraal }); SP6_hartmeter(ctx, 1720, 520, 240, 0.85, t, {});
      vink_(ctx, 600, 430, 30, Bt, C.groen); });
    if (Ge > 0.01) laag(ctx, Ge, () => { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
      const r = SP6_samZij(ctx, 930, SP6_BLOKTOP, 420, t, { bril: 'ogen', uit: q.on('Lang', 1, 0.3) > 0.5 ? 'neutraal' : 'neutraal' });
      const kader = 1 - q.on('routine', 1, 0.6); laag(ctx, kader, () => { SP6_portret(ctx, 'sportpsycholoog', 260, 330, 1.9, 1, { uit: 'praat', t, rand: C.goud }); metaText(ctx, 'SPORTPSYCHOLOOG', 260, 470, C.text2, 'center', 22); });
      SP6_tijdlijn(ctx, 1, 1, q.on('Lang', 1, 0.3), q.on('routine', 1, 0.4));
      SP6_wolk(ctx, 1260, 260, 'LANG', C.goud, q.on('Lang', 1, 0.3), { staart: { x: r.hoofd.x + 30, y: r.hoofd.y - 20 }, px: 48 }); });
    metaA(ctx, 'RUPPRECHT E.A. 2021 · BROOKS E.A. 2016', 120, 868, 1, C.grain, 'left', 24); },

  // ---------- Recap ----------
  s20(ctx, t, q) { SP6_zijKant(ctx, t); SP6_klok(ctx, '0:00', 1);
    const Tr = q.on('Training', 1, 0.5), Sig = ramp(t, q.at('Wat', 2), 0.1), Du = ease(ramp(t, q.at('Wat', 2) + 0.25, 1.7));
    // de zwemmer: staan → startpositie → duik
    if (Tr < 0.5) SP6_samZij(ctx, 930, SP6_BLOKTOP, 420, t, { bril: 'ogen', uit: 'neutraal' });
    else if (Du <= 0.001) zwemmer(ctx, 'sam', SP6_ZIJ.rand, SP6_BLOKTOP, 420, { slag: 'startblok', kijk: 1, t });
    else { const x = lerp(SP6_ZIJ.rand + 40, 1560, Du), y = SP6_BLOKTOP - 120 * Math.sin(Du * Math.PI * 0.8) + (SP6_ZIJ.water + 70 - SP6_BLOKTOP) * Du * Du, an = lerp(-0.25, 0.55, Du);
      ctx.save(); ctx.translate(x, y); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, 420, { slag: 'stroomlijn', kijk: 1, t }); ctx.restore(); SP6_waterlijn(ctx, SP6_ZIJ.rand, W, SP6_ZIJ.water, t); }
    SP6_pieper(ctx, 860, 712, Sig, Tr);
    const kop = { x: 990, y: 200 }, wolkA = 1 - q.on('Minder', 2, 0.5);
    const her = [q.on('naam', 2, 0.6), q.on('anders', 1, 0.6), q.on('uitdaging', 1, 0.6)];
    const NIEUW = ['WAT ALS JE DE START MIST?\nJE KENT DEZE START', 'KIJK NAAR JE EIGEN BAAN', 'EÉN RACE IN EEN SEIZOEN'], POS = [[480, 230], [1460, 250], [470, 520]];
    SP6_KOUD.forEach((s2, i) => { const h = her[i]; SP6_wolk(ctx, POS[i][0], POS[i][1], s2, C.paars, wolkA * (1 - clamp(h * 2, 0, 1)), { staart: kop, px: 32 }); SP6_wolk(ctx, POS[i][0], POS[i][1], NIEUW[i], C.goud, wolkA * clamp(h * 2 - 1, 0, 1), { staart: kop, px: 32 }); });
    // werkbank met minder 'wat als'
    const Wb = ramp(t, q.at('Minder', 2) + 0.45, 0.4) * (1 - Tr);
    zoomCircle(ctx, 470, 440, 280, 960, 210, '', Wb, () => { ctx.fillStyle = '#16203A'; ctx.fillRect(190, 160, 560, 560); const B = SP6_werkbank(ctx, 470, 530, 520, { kop: true });
      [['EERSTE 50\nRUSTIG', 0], ['STERK UIT\nKEERPUNT', 1], ['LANG', 2]].forEach(([s2, v]) => { const p = B.vak(v); SP6_blokje(ctx, p.x, p.y, B.vw - 16, 70, s2, C.goud, 1); });
      const p = B.vak(3); SP6_blokje(ctx, p.x, p.y, B.vw - 24, 60, 'WAT\nALS …', C.koraal, 1 - q.on('werkbank', 1, 1.0) * 0.0); });
    // vier kleine panelen: werkbank · ik/je · weegschaal · routine
    laag(ctx, Tr, () => { const P = [[120, 140], [470, 140], [120, 400], [470, 400]], tit = ['WERKGEHEUGEN', 'AFSTAND', 'UITDAGING', 'ROUTINE'];
      P.forEach(([x, y], i) => { paneel(ctx, x, y, 320, 230, tit[i], 1); });
      SP6_werkbank(ctx, 280, 300, 220, { kop: false }); for (let k = 0; k < 3; k++) { roundRect(ctx, 280 - 110 + k * 55 + 8, 300 - 40, 40, 30, 5); shape(ctx, C.goud, null); }
      text(ctx, 'IK', 570, 300, fTekst(48, 800), C.text2, 'center'); text(ctx, '→', 630, 300, fTekst(48, 800), C.text2, 'center'); text(ctx, 'JE', 690, 300, fTekst(48, 800), C.goud, 'center');
      SP6_weegschaal(ctx, 280, 480, 0.28, -0.8, 1); ctx.save(); ctx.translate(630, 560); ctx.scale(0.55, 0.55); SP6_icoon(ctx, -150, 0, 'bril', 1); SP6_icoon(ctx, 0, 0, 'armen', 1); SP6_icoon(ctx, 150, 0, 'lang', 1); ctx.restore(); }); },

  s21(ctx, t, q) { bg(ctx, 'schema');
    const c = [q.on('bachelor', 1, 0.4), q.on('master', 1, 0.4), q.on('begeleiden', 1, 0.4)];
    SP6_kaartje(ctx, 140, 150, 1040, 'WO · BACHELOR', ['Psychologie'], c[0], C.goud, 40);
    pijl(ctx, 300, 290, 300, 330, C.line, c[1], 4, 14);
    const h2 = SP6_kaartje(ctx, 140, 340, 1040, 'WO · MASTER', ['Sport and Performance Psychology'], c[1], C.goud, 40); metaA(ctx, 'UVA AMSTERDAM · 1 JAAR · ENGELS', 1150, 386, c[1], C.grain, 'right', 22);
    pijl(ctx, 300, 340 + h2 + 10, 300, 340 + h2 + 50, C.line, c[2], 4, 14);
    SP6_kaartje(ctx, 140, 340 + h2 + 60, 1040, 'DAARNA', ['praktijkopleiding sportpsycholoog'], c[2], C.goud, 40);
    persoon(ctx, 'sportpsycholoog', 1500, 820, 460, { t, uit: 'blij', kijk: -1 });
    metaText(ctx, 'STAND 2026', 1500, 868, C.grain, 'center', 22); },
});
