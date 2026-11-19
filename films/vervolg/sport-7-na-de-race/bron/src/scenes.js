
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
// Wat word jij? · Sport en topsport 7 · Na de race — eigen tekeningen (19 nov 2026)
// Kleuren (REEKS-sport, storyboard): paars = gedachten en de emotiemeter (model, geen meting), goud = doel en plan,
// teal = water en rust, koraal = let op. Geen namen in beeld. Decors (zwembad, kamer thuis, praktijk) vlak getekend,
// alleen onder scènes die daar spelen; schema's op navy.
// Tijden zijn verzonnen maar tellen op (twijfels t8): 28,40 + 30,10 + 31,60 + 32,61 = 2:02,71; 29,30 + 30,20 + 30,70 + 31,63 = 2:01,83.

const SP7 = { water: '#2C5F80', waterD: '#244E6A', waterL: '#5BA4C9', tegel: '#3A4E6C', tegelL: '#4A6080', dek: '#4C5C74', dekL: '#5E7088',
  muur: '#22314C', vloer: '#1E2A40', hout: '#6A5440', houtL: '#8A7058', huid: '#7A5440', stift: '#F2F2EE', sil: '#3A4862', silL: '#54627E' };
const SP7_MOMENT = ['0 MIN', '10 MIN', "'S AVONDS", '23:00', 'DE DAG ERNA', 'DE WEEK ERNA', '3 WEKEN LATER'];

// ---------- algemene hulpjes ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 160, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line, vul = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, vul || rgba('#0D1420', 0.9), rgba(rand, 0.9), 2); ctx.restore(); }
function metaKaart(ctx, s2, x, y, a = 1, col = C.grain, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 44; ctx.letterSpacing = '0px';
  const x0 = al === 'right' ? x - w : al === 'center' ? x - w / 2 : x; roundRect(ctx, x0, y - 40, w, 58, 10); shape(ctx, rgba('#0D1420', 0.85), rgba(col, 0.6), 1.5); metaText(ctx, s2, x0 + 22, y, col, 'left', 28); ctx.restore(); }
// waarde die bij cues verspringt: v0 en dan [ [cue-ramp, nieuwe waarde], ... ]
function niveau(v0, stappen) { let v = v0; for (const [r, nv] of stappen) v += (nv - v) * clamp(r, 0, 1); return v; }

// ---------- tijdlijn bovenin ----------
// idx = actief moment (0..6, mag fractioneel zijn voor een glijdende stip); alleen het actieve punt en zijn buren krijgen een label
function SP7_tijdlijn(ctx, idx, a = 1, o = {}) { if (a <= 0.01) return; const x0 = 200, x1 = 1720, y = 62, n = 7, dx = (x1 - x0) / (n - 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const ai = Math.round(idx);
  for (let i = 0; i < n; i++) { const x = x0 + i * dx; circ(ctx, x, y, 7, i <= idx + 0.01 ? rgba(C.goud, 0.55) : '#33415C', rgba(C.line, 0.8), 1.5);
    if (Math.abs(i - ai) === 1 && !o.alleenActief) { const bw = s2 => s2.length * 19.8; if (Math.abs(i - ai) * dx > (bw(SP7_MOMENT[i]) + bw(SP7_MOMENT[ai])) / 2 + 24) metaText(ctx, SP7_MOMENT[i], x, y + 46, C.text2, 'center', 28); } }
  const xa = x0 + idx * dx; circ(ctx, xa, y, 12, C.goud); metaText(ctx, SP7_MOMENT[ai], xa, y + 46, C.goud, 'center', 28); ctx.restore(); }

// ---------- emotiemeter (model) ----------
// (x, y) = midden bovenkant van de buis; niv 0..10; o: { rand (koraal), plan (gouden streep op die hoogte), info (0..1 'i'), label (false = geen), grijs, labelTxt }
function SP7_meter(ctx, x, y, niv, a = 1, o = {}) { if (a <= 0.01) return; const h = o.h || 300, w = 46, kl = o.grijs ? '#8A93A6' : C.paars;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, y, w, h, w / 2); shape(ctx, '#1B2236', rgba(o.rand ? C.koraal : kl, 0.95), o.rand ? 5 : 2.5);
  const f = clamp(niv / 10, 0, 1), hv = (h - 12) * f; if (hv > 2) { ctx.save(); roundRect(ctx, x - w / 2 + 6, y + 6, w - 12, h - 12, (w - 12) / 2); ctx.clip(); ctx.fillStyle = rgba(kl, 0.9); ctx.fillRect(x - w / 2, y + h - 6 - hv, w, hv + 6); ctx.restore(); }
  for (let i = 1; i < 10; i++) { const yy = y + 6 + (h - 12) * (1 - i / 10); ctx.strokeStyle = rgba('#F2F2EE', i === 5 ? 0.35 : 0.15); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - w / 2 + 8, yy); ctx.lineTo(x - w / 2 + 18, yy); ctx.stroke(); }
  if (o.plan != null) { const yy = y + 6 + (h - 12) * (1 - o.plan / 10); laag(ctx, o.planA == null ? 1 : o.planA, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - w / 2 - 14, yy); ctx.lineTo(x + w / 2 + 14, yy); ctx.stroke(); metaText(ctx, 'PLAN', x + w / 2 + 22, yy + 10, C.goud, 'left', 28); }); }
  if (o.info) laag(ctx, o.info, () => { circ(ctx, x, y + h * 0.3, 19, '#F2F2EE'); text(ctx, 'i', x, y + h * 0.3 + 11, fTitel(32), '#1B2236', 'center'); });
  if (o.label !== false) { if (o.labelTxt) metaText(ctx, o.labelTxt, x, y + h + 40, C.grain, 'center', 28); else { metaText(ctx, 'MODEL ·', x, y + h + 40, C.grain, 'center', 28); metaText(ctx, 'HOE STERK VOELT HET', x, y + h + 72, C.grain, 'center', 28); } }
  ctx.restore(); }

// paars gedachtewolkje naast het hoofd; staart wijst naar (hx, hy)
function SP7_wolk(ctx, x, y, w, h, s2, a = 1, hx = null, hy = null, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sc = 0.6 + 0.4 * ease(a); ctx.translate(x + w / 2, y + h / 2); ctx.scale(sc, sc); ctx.translate(-(x + w / 2), -(y + h / 2));
  ctx.beginPath(); const n = 9; for (let i = 0; i <= n; i++) { const an = i / n * 6.283; const rx = w / 2, ry = h / 2; const px2 = x + w / 2 + Math.cos(an) * rx, py2 = y + h / 2 + Math.sin(an) * ry; if (i === 0) ctx.moveTo(px2, py2); else { const am = (i - 0.5) / n * 6.283; ctx.quadraticCurveTo(x + w / 2 + Math.cos(am) * rx * 1.18, y + h / 2 + Math.sin(am) * ry * 1.22, px2, py2); } }
  ctx.closePath(); shape(ctx, '#3B3560', C.paars, 2.5);
  if (hx != null) { const dx = hx - (x + w / 2), dy = hy - (y + h / 2), L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; const bx = x + w / 2 + ux * w * 0.5, by = y + h / 2 + uy * h * 0.55;
    circ(ctx, bx + ux * 22, by + uy * 22, 11, '#3B3560', C.paars, 2); circ(ctx, bx + ux * 50, by + uy * 50, 7, '#3B3560', C.paars, 2); }
  if (s2) text(ctx, s2, x + w / 2, y + h / 2 + px * 0.36, fTekst(px, 700), C.text, 'center'); ctx.restore(); }

// ---------- silhouetten (groepen, telpoppetjes, afzender) ----------
let SP7_off = null;
function SP7_sil(ctx, kleur, fn) { if (!SP7_off) { SP7_off = document.createElement('canvas'); SP7_off.width = W; SP7_off.height = H; } const o = SP7_off.getContext('2d');
  o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.clearRect(0, 0, W, H); fn(o);
  o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, W, H); o.globalCompositeOperation = 'source-over'; ctx.drawImage(SP7_off, 0, 0); }
const SP7_POP = {};
function SP7_popje(kleur) { if (SP7_POP[kleur]) return SP7_POP[kleur]; const c = document.createElement('canvas'); c.width = 60; c.height = 120; const o = c.getContext('2d');
  persoon(o, 'sam', 30, 116, 108, { outfit: 'zwem' }); o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, 60, 120); SP7_POP[kleur] = c; return c; }
function SP7_telpop(ctx, x, y, hgt, kleur, a = 1) { if (a <= 0.01) return; const c = SP7_popje(kleur); ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(c, x - hgt * 0.25, y - hgt, hgt * 0.5, hgt); ctx.restore(); }

// ---------- zwembad (zijaanzicht, s01) ----------
// muur = x van de kopse wand, wl = waterlijn
function SP7_badZij(ctx, muur, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, wl - 120); // hal
  for (let i = 0; i < 9; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(muur + 120 + i * 190, 150, 110, 70); } // ramen hoog in de hal
  ctx.fillStyle = SP7.dek; ctx.fillRect(0, wl - 26, muur, 26); ctx.fillStyle = SP7.dekL; ctx.fillRect(0, wl - 26, muur, 5);
  // startblok op de rand
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, muur - 120, wl - 96, 118, 22, 6); ctx.fill(); ctx.fillStyle = '#8A93A6'; ctx.fillRect(muur - 100, wl - 74, 18, 48); ctx.fillRect(muur - 40, wl - 74, 18, 48);
  // lijn van de baan erachter (drijvers)
  for (let x = muur + 20; x < W; x += 34) { circ(ctx, x, wl - 4, 9, (Math.floor((x - muur) / 34) % 6 < 3) ? '#C9454A' : '#E8E2D4'); }
  ctx.restore(); }
function SP7_waterVoor(ctx, muur, wl, t = 0, golf = 0, gx = 0) { ctx.save(); ctx.fillStyle = SP7.water; ctx.beginPath(); ctx.moveTo(muur, 875);
  for (let x = muur; x <= W; x += 12) { const d = Math.abs(x - gx), g = golf * 7 * Math.exp(-d / 200) * Math.sin(d / 22 - t * 6); ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g); }
  ctx.lineTo(W, 875); ctx.closePath(); ctx.fill(); ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath();
  for (let x = muur; x <= W; x += 12) { const d = Math.abs(x - gx), g = golf * 7 * Math.exp(-d / 200) * Math.sin(d / 22 - t * 6); x === muur ? ctx.moveTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g) : ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g); } ctx.stroke();
  // kopse wand met tegels
  ctx.fillStyle = SP7.tegel; ctx.fillRect(muur - 30, wl - 26, 30, 875 - wl + 26); ctx.strokeStyle = SP7.tegelL; ctx.lineWidth = 1.5; for (let y = wl; y < 875; y += 30) { ctx.beginPath(); ctx.moveTo(muur - 30, y); ctx.lineTo(muur, y); ctx.stroke(); }
  ctx.fillStyle = C.goud; ctx.fillRect(muur - 4, wl - 10, 4, 60); // aantikplaat
  ctx.restore(); }

// ---------- badrand (vooraanzicht, s03 en s06): zit = hoogte van de rand, wl = water ----------
function SP7_badrand(ctx, zit, wl, t = 0, o = {}) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, zit - 140); // hal
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(60 + i * 240, 160, 150, 90); }
  ctx.fillStyle = SP7.dek; ctx.fillRect(0, zit - 70, W, 70); ctx.fillStyle = SP7.dekL; ctx.fillRect(0, zit - 4, W, 6); // vloer van de rand (perspectief)
  ctx.fillStyle = SP7.tegel; ctx.fillRect(0, zit + 2, W, wl - zit); ctx.strokeStyle = SP7.tegelL; ctx.lineWidth = 1.5;
  for (let y = zit + 30; y < wl; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, zit + 2); ctx.lineTo(x, wl); ctx.stroke(); }
  if (o.bord) { ctx.fillStyle = '#2C3850'; roundRect(ctx, 1500, 150, 280, 70, 10); ctx.fill(); metaText(ctx, o.bord, 1640, 197, C.text2, 'center', 28); }
  ctx.restore(); }
function SP7_waterFront(ctx, wl, t = 0) { ctx.save(); ctx.fillStyle = SP7.water; ctx.beginPath(); ctx.moveTo(0, 875); for (let x = 0; x <= W; x += 16) ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.lineTo(W, 875); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) x ? ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3) : ctx.moveTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.stroke();
  for (let i = 0; i < 6; i++) { const x = 140 + i * 310 + Math.sin(t * 0.5 + i) * 20; ctx.strokeStyle = rgba(SP7.waterL, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, wl + 40 + (i % 3) * 30); ctx.lineTo(x + 90, wl + 40 + (i % 3) * 30); ctx.stroke(); }
  ctx.restore(); }

// handdoek om de schouders (vooraanzicht); r = return van persoon()
function SP7_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x - hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x - hh * 0.9, sy - hh * 0.2, x - hh * 0.38, sy - hh * 0.22); ctx.lineTo(x - hh * 0.2, sy + hh * 0.15); ctx.lineTo(x - hh * 0.25, sy + hh * 1.75); ctx.lineTo(x - hh * 0.62, sy + hh * 1.8); ctx.lineTo(x - hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x - hh * 0.95, sy + hh * 0.7, x - hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + hh * 0.9, sy - hh * 0.2, x + hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + hh * 0.95, sy + hh * 0.7, x + hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.teal; ctx.lineWidth = hh * 0.08; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 0.24, sy + hh * 1.5); ctx.lineTo(x + s * hh * 0.6, sy + hh * 1.55); ctx.stroke(); }
  ctx.restore(); }
// koptelefoon (vooraanzicht)
function SP7_koptelefoon(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const { x, y, r: R } = r.hoofd; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2A3446'; ctx.lineWidth = R * 0.16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y - R * 0.05, R * 1.12, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  for (const s of [-1, 1]) { roundRect(ctx, x + s * R * 1.08 - R * 0.2, y - R * 0.18, R * 0.4, R * 0.62, R * 0.16); shape(ctx, '#2A3446', C.teal, 3); } ctx.restore(); }
// zwevende muzieknoten (teal)
function SP7_noten(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 4; i++) { const u = ((t * 0.35 + i * 0.25) % 1), xx = x + Math.sin(u * 5 + i) * 30 + i * 22, yy = y - u * 220, al = Math.sin(u * Math.PI);
  ctx.globalAlpha = a * al; ctx.fillStyle = C.teal; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(xx, yy, 13, 10, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.moveTo(xx + 11, yy - 3); ctx.lineTo(xx + 11, yy - 46); ctx.lineTo(xx + 30, yy - 36); ctx.stroke(); } ctx.restore(); }

// ---------- scorebord ----------
function SP7_bord(ctx, x, y, w, aLim, aTijd, tijd, aVerschil, verschil, o = {}) { const h = o.h || 200; ctx.save(); roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1626', '#56627E', 3);
  laag(ctx, aLim, () => { metaText(ctx, 'LIMIET', x + 36, y + 66, C.goud, 'left', 28); text(ctx, '2:01,50', x + w - 36, y + 72, fMeta(48), C.goud, 'right'); });
  laag(ctx, aTijd, () => { metaText(ctx, 'TIJD', x + 36, y + 136, C.text2, 'left', 28); text(ctx, tijd, x + w - 36, y + 142, fMeta(48), C.text, 'right'); });
  laag(ctx, aVerschil, () => { text(ctx, verschil, x + w - 36, y + h + 62, fTekst(52, 800), o.verschilKl || C.koraal, 'right'); });
  ctx.restore(); }

// ---------- hand van dichtbij (rug van de linkerhand), met stifttekst ----------
// regels: [[tekst, frac 0..1, kleur, streep 0..1]]
function SP7_hand(ctx, x, y, s, regels, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const hu = SP7.huid, hd = '#684636'; ctx.fillStyle = hu; ctx.strokeStyle = hd; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-260, 120); ctx.lineTo(-420, 160); ctx.lineTo(-420, -40); ctx.lineTo(-250, -90); // pols
  ctx.quadraticCurveTo(-120, -150, 60, -140); ctx.lineTo(230, -150); ctx.quadraticCurveTo(250, -100, 240, -60); ctx.lineTo(250, 40); ctx.quadraticCurveTo(250, 120, 160, 140); ctx.quadraticCurveTo(-60, 170, -260, 120); ctx.closePath(); ctx.fill(); ctx.stroke();
  const vinger = (y0, L, d) => { roundRect(ctx, 200, y0 - d / 2, L, d, d / 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(200 + L * 0.55, y0 - d * 0.3); ctx.quadraticCurveTo(200 + L * 0.6, y0, 200 + L * 0.55, y0 + d * 0.3); ctx.stroke(); };
  ctx.fillStyle = hu; vinger(-118, 190, 54); vinger(-58, 220, 58); vinger(4, 205, 56); vinger(64, 160, 50);
  ctx.beginPath(); ctx.moveTo(-40, 150); ctx.quadraticCurveTo(80, 230, 200, 230); ctx.quadraticCurveTo(240, 225, 230, 195); ctx.quadraticCurveTo(120, 170, 40, 120); ctx.closePath(); ctx.fill(); ctx.stroke(); // duim
  ctx.strokeStyle = rgba('#3A2418', 0.45); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(180, -120 + i * 60); ctx.lineTo(-40, -90 + i * 52); ctx.stroke(); } // pezen
  ctx.restore();
  regels.forEach(([s2, fr, kl, streep], i) => { if (fr <= 0.001) return; ctx.save(); ctx.globalAlpha *= a; const px = Math.round(70 * s); ctx.font = fTekst(px, 800); const tw = ctx.measureText(s2).width; const tx = x - 40 * s - tw / 2, ty = y - 20 * s + i * px * 1.25;
    ctx.beginPath(); ctx.rect(tx - 10, ty - px, (tw + 20) * fr, px * 1.4); ctx.clip(); ctx.strokeStyle = rgba('#2A1A12', 0.6); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeText(s2, tx, ty); ctx.fillStyle = kl; ctx.fillText(s2, tx, ty); ctx.restore();
    if (streep > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx - 12, ty - px * 0.32); ctx.lineTo(tx - 12 + (tw + 24) * streep, ty - px * 0.32); ctx.stroke(); ctx.restore(); } }); }
function SP7_stift(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate((ang || 0) - 0.6); roundRect(ctx, -8, -64, 16, 80, 6); shape(ctx, '#20242E', '#4A5266', 2); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-8, -64, 16, 16); ctx.restore(); }

// ---------- tribune (s01) ----------
function SP7_tribune(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, 760);
  for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#2A3854' : '#2F3E5C'; ctx.fillRect(0, 380 + i * 125, W, 125); ctx.fillStyle = '#3E4E6E'; ctx.fillRect(0, 380 + i * 125, W, 10); }
  ctx.restore(); }

// ---------- kamer thuis ----------
function SP7_kamer(ctx, vloer = 800, o = {}) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = SP7.muur; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = SP7.vloer; ctx.fillRect(0, vloer, W, 875 - vloer); ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, vloer - 8, W, 8);
  const wx = o.raam != null ? o.raam : 1180; if (wx >= 0) { roundRect(ctx, wx, 200, 300, 240, 8); shape(ctx, '#121A2A', '#3E4E6E', 6); ctx.strokeStyle = '#3E4E6E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(wx + 150, 200); ctx.lineTo(wx + 150, 440); ctx.stroke();
  circ(ctx, wx + 230, 260, 16, '#D8D2C0'); for (let i = 0; i < 5; i++) circ(ctx, wx + 30 + hash(i * 3) * 100, 230 + hash(i * 7) * 180, 2.5, rgba('#F2F2EE', 0.6)); }
  ctx.restore(); }
function SP7_bank(ctx, x, w, zitY, vloer) { ctx.save(); const k = '#4A5A7C'; roundRect(ctx, x, zitY - 190, w, 200, 26); shape(ctx, '#3E4C6A', null); roundRect(ctx, x - 30, zitY - 70, 60, 120, 20); shape(ctx, k, null); roundRect(ctx, x + w - 30, zitY - 70, 60, 120, 20); shape(ctx, k, null);
  roundRect(ctx, x + 10, zitY - 6, w - 20, 50, 14); shape(ctx, k, null); ctx.fillStyle = '#2A3446'; ctx.fillRect(x + 20, zitY + 40, 16, vloer - zitY - 40); ctx.fillRect(x + w - 36, zitY + 40, 16, vloer - zitY - 40); ctx.restore(); }
function SP7_bankVoor(ctx, x, w, zitY) { ctx.save(); roundRect(ctx, x - 30, zitY - 70, 60, 120, 20); shape(ctx, '#4A5A7C', null); roundRect(ctx, x + w - 30, zitY - 70, 60, 120, 20); shape(ctx, '#4A5A7C', null); ctx.restore(); }
// laptop op een laag tafeltje, scherm schuin naar rechts gedraaid (naar de bank); flikker = 0..1
function SP7_laptop(ctx, x, y, flik) { ctx.save(); ctx.fillStyle = '#3A3226'; ctx.fillRect(x - 120, y, 240, 18); ctx.fillStyle = '#2E281E'; ctx.fillRect(x - 100, y + 18, 14, 120); ctx.fillRect(x + 86, y + 18, 14, 120);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x + 50, y); ctx.lineTo(x + 30, y - 10); ctx.lineTo(x - 80, y - 10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 75, y - 8); ctx.lineTo(x - 30, y - 120); ctx.lineTo(x + 30, y - 104); ctx.lineTo(x + 28, y - 8); ctx.closePath(); ctx.fillStyle = '#5A6070'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - 64, y - 14); ctx.lineTo(x - 26, y - 110); ctx.lineTo(x + 22, y - 97); ctx.lineTo(x + 20, y - 14); ctx.closePath(); ctx.fillStyle = mixKl('#9CC4DC', '#C9D8E4', flik); ctx.fill(); ctx.restore(); }
function mixKl(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
// sporttas met wedstrijdverslag; o: morgen (0..1 kalenderblaadje), slot (0..1 dicht), open (0..1 slot weer open)
function SP7_tas(ctx, x, y, s = 1, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#F2F2EE'; ctx.save(); ctx.translate(-40, -150); ctx.rotate(-0.18); ctx.fillRect(0, 0, 120, 150); ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 4; i++) ctx.fillRect(14, 30 + i * 22, 90, 5); ctx.restore();
  if (o.label !== false) metaText(ctx, 'WEDSTRIJDVERSLAG', -60, -200, C.text2, 'center', 28);
  roundRect(ctx, -170, -120, 340, 130, 40); shape(ctx, '#2F5FA8', '#264E8C', 3); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-150, -50); ctx.lineTo(150, -50); ctx.stroke();
  ctx.strokeStyle = '#1E3A6A'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-90, -116); ctx.quadraticCurveTo(0, -210, 90, -116); ctx.stroke();
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-140, -98); ctx.lineTo(140, -98); ctx.stroke(); // rits
  if (o.morgen) laag(ctx, o.morgen, () => { ctx.save(); ctx.translate(120, -150); ctx.rotate(0.12); roundRect(ctx, -10, -30, 150, 120, 8); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = C.koraal; ctx.fillRect(-10, -30, 150, 30); text(ctx, 'MORGEN', 65, 56, fTekst(30, 800), '#121A26', 'center'); ctx.restore(); });
  if (o.slot) { const op = o.open || 0; laag(ctx, o.slot, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -112 - 26 * op, 28, Math.PI, 0); ctx.lineTo(28, -100 - 26 * op); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-28, -112 - 26 * op); ctx.lineTo(-28, -100); ctx.stroke(); roundRect(ctx, -42, -102, 84, 66, 10); shape(ctx, C.koraal, null); circ(ctx, 0, -72, 8, '#121A26'); }); }
  ctx.restore(); }

// bed (vooraanzicht), deken vóór de benen
function SP7_bedAchter(ctx, x, w, zitY) { ctx.save(); roundRect(ctx, x, zitY - 260, w, 270, 18); shape(ctx, '#4A3A30', null); roundRect(ctx, x + 40, zitY - 150, w * 0.5, 130, 40); shape(ctx, '#C9CED6', null); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(x, zitY - 10, w, 40); ctx.restore(); }
function SP7_deken(ctx, x, w, y0, y1) { ctx.save(); ctx.fillStyle = '#4F7AA8'; ctx.beginPath(); ctx.moveTo(x - 10, y1); ctx.lineTo(x - 10, y0 + 30); ctx.quadraticCurveTo(x + w * 0.3, y0 - 14, x + w * 0.55, y0 + 16); ctx.quadraticCurveTo(x + w * 0.8, y0 + 40, x + w + 10, y0 + 10); ctx.lineTo(x + w + 10, y1); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#3E6690'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#3A3026'; ctx.fillRect(x - 10, y1, w + 20, 14); ctx.restore(); }
function SP7_telefoonHand(ctx, x, y, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); roundRect(ctx, -16, -52, 32, 60, 6); shape(ctx, '#1E2230', '#56627E', 2); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(-12, -46, 24, 46); ctx.restore(); }
function SP7_klokDigit(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 120, y - 60, 240, 90, 14); shape(ctx, '#0F1626', '#56627E', 3); text(ctx, s2, x, y + 14, fMeta(56), C.koraal, 'center'); ctx.restore(); }

// grote telefoon met appjes; berichten: [[tekst, van ('ander'|'zelf'), a]]
function SP7_telefoon(ctx, x, y, w, h, berichten, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 46); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, x + 18, y + 18, w - 36, h - 36, 32); shape(ctx, '#1C2638', null);
  if (o.kop !== false) { ctx.fillStyle = '#25324A'; ctx.fillRect(x + 18, y + 40, w - 36, 90); SP7_sil(ctx, SP7.silL, (c) => persoon(c, 'bilal', x + 80, y + 196, 150, { outfit: 'school' })); ctx.save(); ctx.beginPath(); ctx.rect(x + 18, y + 18, w - 36, 112); ctx.restore(); metaText(ctx, 'TEAMGENOOT', x + 140, y + 96, C.text2, 'left', 28); }
  let yy = y + 190; for (const [s2, van, aa] of berichten) { if (aa <= 0.01) continue; ctx.save(); ctx.globalAlpha *= aa; ctx.font = fTekst(36, 600); const lines = []; let cur = ''; for (const wd of s2.split(' ')) { const tst = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tst).width > w - 170 && cur) { lines.push(cur); cur = wd; } else cur = tst; } lines.push(cur);
    const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 44, bh = lines.length * 44 + 26, zelf = van === 'zelf', bx = zelf ? x + w - 40 - bw : x + 40, by = yy + (1 - ease(aa)) * 30;
    roundRect(ctx, bx, by, bw, bh, 20); shape(ctx, zelf ? '#3A4E6E' : '#E8E4DA', null); lines.forEach((l, i) => text(ctx, l, bx + 22, by + 46 + i * 44, fTekst(36, 600), zelf ? C.text : '#121A26', 'left')); ctx.restore(); yy += bh + 22; }
  ctx.restore(); }

// ---------- praktijk van de sportpsycholoog ----------
function SP7_praktijk(ctx, vloer = 820) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#26344F'; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = '#20293C'; ctx.fillRect(0, vloer, W, 875 - vloer); ctx.fillStyle = '#34445F'; ctx.fillRect(0, vloer - 8, W, 8);
  roundRect(ctx, 120, 190, 260, 300, 8); shape(ctx, '#33506A', '#4A5C7A', 8); ctx.strokeStyle = '#4A5C7A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(250, 190); ctx.lineTo(250, 490); ctx.moveTo(120, 340); ctx.lineTo(380, 340); ctx.stroke(); // raam (dag)
  ctx.fillStyle = rgba(C.groen, 0.35); ctx.beginPath(); ctx.ellipse(200, 450, 60, 30, 0, 0, 6.283); ctx.fill(); // boom buiten
  // plant
  ctx.fillStyle = '#8A6A4A'; ctx.beginPath(); ctx.moveTo(40, vloer); ctx.lineTo(30, vloer - 90); ctx.lineTo(110, vloer - 90); ctx.lineTo(100, vloer); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.32; ctx.fillStyle = i % 2 ? '#5F9A6E' : '#6FAE7E'; ctx.save(); ctx.translate(70, vloer - 90); ctx.rotate(an + Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, -80, 20, 80, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
function SP7_tafeltje(ctx, x, y, vloer) { ctx.save(); ctx.fillStyle = '#7A6248'; roundRect(ctx, x - 110, y, 220, 16, 6); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(x - 8, y + 16, 16, vloer - y - 22); ctx.fillRect(x - 60, vloer - 10, 120, 10); ctx.restore(); }
function SP7_blok(ctx, x, y, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -34, -46, 68, 92, 6); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.fillStyle = '#9AA3B2'; for (let i = 0; i < 4; i++) ctx.fillRect(-24, -26 + i * 16, 48, 3); ctx.fillStyle = C.goud; ctx.fillRect(-34, -46, 68, 10); ctx.restore(); }

// wedstrijdverslag met splittijden; o: snel (0..1 gouden cirkel op de eerste), laatste (0..1 koraal op de laatste)
function SP7_verslag(ctx, x, y, w, splits, a = 1, o = {}) { if (a <= 0.01) return; const h = o.h || 190; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2F2EE', '#9AA3B2', 2);
  metaText(ctx, o.kop || 'VERSLAG · 200 M VRIJE SLAG', x + 30, y + 46, '#56627E', 'left', 28); const dx = (w - 60) / 4;
  splits.forEach((s2, i) => { const cx = x + 30 + dx * (i + 0.5); metaText(ctx, ((i + 1) * 50) + ' M', cx, y + 98, '#56627E', 'center', 28); const kl = (i === 3 && o.laatste) ? mixKl('#121A26', '#C9553A', o.laatste) : '#121A26'; text(ctx, s2, cx, y + 154, fMeta(38), kl, 'center');
    if (i === 0 && o.snel) laag(ctx, o.snel, () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, y + 140, dx * 0.48, 36, 0, 0, 6.283 * o.snel); ctx.stroke(); });
    if (i === 3 && o.laatste && o.ring) laag(ctx, o.ring, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, y + 140, dx * 0.48, 36, 0, 0, 6.283 * o.ring); ctx.stroke(); }); });
  ctx.restore(); if (o.snel) metaA(ctx, o.snelTxt || 'TE SNEL', x + 30 + dx * 0.5, y + h + 40, o.snel, C.goud, 'center'); }

// tablet met keerpunt in zijaanzicht (video); t = tijd
function SP7_tablet(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); shape(ctx, '#11161F', '#56627E', 4);
  ctx.save(); roundRect(ctx, x + 16, y + 16, w - 32, h - 32, 12); ctx.clip(); ctx.fillStyle = SP7.waterD; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#202E48'; ctx.fillRect(x, y, w, 70);
  ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + 72); ctx.lineTo(x + w, y + 72); ctx.stroke();
  const mx = x + 34; ctx.fillStyle = SP7.tegel; ctx.fillRect(x + 16, y + 60, 18, h); // wand links
  const L = 180, sl = (o.slap != null ? o.slap : 1), u = (t % 3) / 3, xx = mx + 40 + (1 - Math.pow(1 - u, 2)) * w * (sl ? 0.35 : 0.6), yy = y + 72 + 0.12 * L + (1 - u) * 0.25 * L;
  zwemmer(ctx, 'sam', xx, yy, L, { slag: 'onderwater', t, kijk: 1 }); ctx.restore();
  ctx.fillStyle = C.koraal; circ(ctx, x + 50, y + 44, 10, C.koraal); metaText(ctx, 'VIDEO', x + 70, y + 54, C.text, 'left', 28); ctx.restore(); }

// drie doeltreden (even groot); o: vul {u,p,r} 0..1 gevuld, vraag 0..1, hl index, weg {u,p,r}
const SP7_TREDE = [['UITKOMST', 'de finale'], ['PRESTATIE', 'een tijd'], ['PROCES', 'wat je doet']];
function SP7_treden(ctx, x, y, w, aa, o = {}) { const h = 104, gap = 22; for (let i = 0; i < 3; i++) { const a = aa[i] * (1 - ((o.weg || [])[i] || 0)); if (a <= 0.01) continue; const yy = y + i * (h + gap); const hl = (o.hl || [])[i] || 0, vul = (o.vul || [])[i] || 0;
    laag(ctx, a, () => { roundRect(ctx, x, yy, w, h, 14); shape(ctx, rgba(C.goud, 0.08 + 0.22 * vul), mixKl('#B89A50', '#F2D27A', hl), 2 + 3 * hl); metaText(ctx, SP7_TREDE[i][0], x + 28, yy + 44, C.goud, 'left', 28); text(ctx, SP7_TREDE[i][1], x + 28, yy + 88, fTekst(36, 700), C.text, 'left');
      const ex = (o.extra || [])[i]; if (ex && ex[1] > 0.01) metaA(ctx, ex[0], x + w - 28, yy + 66, ex[1], ex[2] || C.text2, 'right');
      if (o.vraag) laag(ctx, o.vraag, () => text(ctx, '?', x + w - 50, yy + 76, fTitel(64), C.goud, 'center')); }); } }

// ---------- weegschaal (goud) ----------
function SP7_weegschaal(ctx, x, y, kant, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = 300; ctx.strokeStyle = C.goud; ctx.fillStyle = C.goud; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 300); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 90, y + 300); ctx.lineTo(x + 90, y + 300); ctx.stroke(); circ(ctx, x, y, 12, C.goud);
  const dx = Math.cos(kant) * L, dy = Math.sin(kant) * L; ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x + dx, y + dy); ctx.stroke();
  for (const [s, lab, sub, hl] of [[-1, 'VERWACHT', '2:01', o.hlL || 0], [1, 'GEZWOMMEN', '2:02,7', 0]]) { const px = x + s * dx, py = y + s * dy; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 90, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 90, py + 110); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 120, py + 110); ctx.quadraticCurveTo(px, py + 160, px + 120, py + 110); ctx.closePath(); shape(ctx, rgba(C.goud, 0.25), C.goud, 3);
    roundRect(ctx, px - 130, py + 170, 260, 110, 14); shape(ctx, rgba('#0D1420', 0.9), mixKl('#8FA0B5', '#E0B64A', hl), 2 + 3 * hl); metaText(ctx, lab, px, py + 212, C.grain, 'center', 28); text(ctx, sub, px, py + 264, fMeta(44), C.text, 'center'); }
  ctx.restore(); }
// schuifje (sterkte / duur): pos 0..1
function SP7_schuif(ctx, x, y, h, pos, lab, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 8, y, 16, h, 8); shape(ctx, '#2A3446', C.line, 1.5); const yy = y + h * (1 - pos);
  roundRect(ctx, x - 30, yy - 16, 60, 32, 10); shape(ctx, C.paars, '#B8AEE0', 2); metaText(ctx, lab, x, y + h + 40, C.grain, 'center', 28); ctx.restore(); }
function SP7_deur(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 60, y - 170, 120, 170, 6); shape(ctx, '#2A3446', C.koraal, 3); circ(ctx, x + 36, y - 82, 6, C.koraal); metaText(ctx, 'WEG', x, y - 190, C.koraal, 'center', 28); ctx.restore(); }

// ---------- masker (lijntekening, naast het hoofd) ----------
function SP7_masker(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -80); ctx.bezierCurveTo(62, -80, 70, -20, 64, 20); ctx.bezierCurveTo(56, 70, 22, 92, 0, 92); ctx.bezierCurveTo(-22, 92, -56, 70, -64, 20); ctx.bezierCurveTo(-70, -20, -62, -80, 0, -80); ctx.closePath();
  shape(ctx, '#D8DCE4', '#9AA3B2', 3); ctx.fillStyle = '#1A2740'; ctx.beginPath(); ctx.ellipse(-26, -6, 14, 8, 0, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(26, -6, 14, 8, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#56627E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-20, 50); ctx.lineTo(20, 50); ctx.stroke(); ctx.restore(); }

// ---------- buiten lopen (Bratman) ----------
function SP7_wandelKader(ctx, x, y, w, h, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(C.line, 0.9), 2); ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
  const hw = w / 2, gy = y + h - 60; // groen
  ctx.fillStyle = '#24402E'; ctx.fillRect(x, y, hw, h); ctx.fillStyle = '#3A5540'; ctx.fillRect(x, gy, hw, 60); ctx.fillStyle = '#8A7A5A'; ctx.fillRect(x, gy, hw, 12);
  for (let i = 0; i < 4; i++) { const bx = x + 50 + i * 100; ctx.fillStyle = '#5A4232'; ctx.fillRect(bx - 6, gy - 80, 12, 80); ctx.fillStyle = i % 2 ? '#5F9A6E' : '#4F8A5E'; ctx.beginPath(); ctx.ellipse(bx, gy - 120, 50, 64, 0, 0, 6.283); ctx.fill(); }
  // stad
  ctx.fillStyle = '#2A2F3E'; ctx.fillRect(x + hw, y, hw, h); for (let i = 0; i < 5; i++) { const bx = x + hw + 10 + i * 82, bh = 120 + hash(i * 4.1) * 120; ctx.fillStyle = '#3E4458'; ctx.fillRect(bx, gy - bh, 70, bh); ctx.fillStyle = rgba('#E0B64A', 0.35); for (let j = 0; j < 4; j++) ctx.fillRect(bx + 12 + (j % 2) * 28, gy - bh + 20 + Math.floor(j / 2) * 34, 16, 18); }
  ctx.fillStyle = '#4A4E5A'; ctx.fillRect(x + hw, gy, hw, 60); ctx.fillStyle = '#C9CED6'; for (let i = 0; i < 5; i++) ctx.fillRect(x + hw + 20 + i * 90, gy + 32, 46, 6);
  // auto
  const ax = x + hw + ((t * 120) % (hw + 200)) - 100; ctx.fillStyle = C.koraal; roundRect(ctx, ax, gy + 8, 110, 30, 10); ctx.fill(); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(ax + 26, gy + 12, 50, 10); circ(ctx, ax + 24, gy + 40, 9, '#121A26'); circ(ctx, ax + 86, gy + 40, 9, '#121A26');
  ctx.restore();
  persoon(ctx, 'erik', x + hw * 0.45, gy + 10, 150, { zij: true, kijk: 1, gang: 'loop', t, outfit: undefined });
  persoon(ctx, 'passant', x + hw * 1.45, gy + 10, 150, { zij: true, kijk: 1, gang: 'loop', t: t + 0.3 });
  ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + hw, y); ctx.lineTo(x + hw, y + h); ctx.stroke();
  metaText(ctx, 'GROEN', x + 24, y + 44, C.groen, 'left', 28); metaText(ctx, 'STAD', x + hw + 24, y + 44, C.text2, 'left', 28);
  ctx.restore(); }

// ---------- weekrooster ----------
const SP7_DAG = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
// cellen: per dag [ochtend, middag, avond] = 't' training, 's' toets, '' leeg; o.vrij = index dag met vrije avond (0..1 = a)
function SP7_rooster(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const cel = o.cel || [['t', 's', 't'], ['', 's', 't'], ['t', '', 't'], ['', 's', 't'], ['t', '', 't'], ['t', '', ''], ['', '', 't']];
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(C.line, 0.9), 2); const kx = x + 30, kw = (w - 60) / 7, ky = y + 70, kh = (h - 100) / 3;
  SP7_DAG.forEach((d, i) => metaText(ctx, d, kx + kw * (i + 0.5), y + 50, C.text2, 'center', 28));
  for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) { const c = cel[i][j], cx = kx + kw * i + 6, cy = ky + kh * j + 6; const vr = o.vrij != null && o.vrij === i && j === 2;
    roundRect(ctx, cx, cy, kw - 12, kh - 12, 10); if (vr && o.vrijA > 0.01) { shape(ctx, mixKl(c === 't' ? '#2E5A74' : '#2A3446', '#5A4A20', o.vrijA), mixKl('#5BA4C9', '#E0B64A', o.vrijA), 2 + 2 * o.vrijA); if (o.vrijA > 0.5) metaText(ctx, 'VRIJ', cx + (kw - 12) / 2, cy + (kh - 12) / 2 + 10, C.goud, 'center', 28); continue; }
    shape(ctx, c === 't' ? rgba(C.teal, 0.55) : c === 's' ? rgba(C.oker, 0.6) : '#232E44', c === 't' ? C.teal : c === 's' ? C.oker : '#33415C', 1.5); }
  if (o.legenda !== false) { const ly = y + h + 46; roundRect(ctx, x, ly - 24, 30, 30, 6); shape(ctx, rgba(C.teal, 0.55), C.teal, 1.5); metaText(ctx, 'TRAINEN', x + 44, ly, C.text2, 'left', 28); roundRect(ctx, x + 280, ly - 24, 30, 30, 6); shape(ctx, rgba(C.oker, 0.6), C.oker, 1.5); metaText(ctx, 'TOETS', x + 324, ly, C.text2, 'left', 28); }
  ctx.restore(); }

// ---------- baan van bovenaf + zwemmer van bovenaf ----------
function SP7_baanBoven(ctx, x0, x1, y, h) { ctx.save(); roundRect(ctx, x0 - 30, y - 30, x1 - x0 + 60, h + 60, 14); shape(ctx, SP7.dek, null); ctx.fillStyle = SP7.water; ctx.fillRect(x0, y, x1 - x0, h);
  for (const yy of [y + 6, y + h - 6]) for (let x = x0 + 10; x < x1; x += 24) circ(ctx, x, yy, 7, (Math.floor((x - x0) / 24) % 8 < 4) ? '#C9454A' : '#E8E2D4');
  ctx.fillStyle = '#1E3A56'; ctx.fillRect(x0 + 60, y + h / 2 - 8, x1 - x0 - 120, 16); ctx.fillRect(x0 + 60, y + h / 2 - 30, 16, 60); ctx.fillRect(x1 - 76, y + h / 2 - 30, 16, 60); // zwarte lijn op de bodem
  ctx.restore(); }
// zwemmer van bovenaf; dir 1 = naar rechts; s = lichaamslengte in px
function SP7_bovenZwemmer(ctx, x, y, s, dir, t, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); const ph = t * 0.8 * 6.283, hu = SP7.huid;
  ctx.strokeStyle = hu; ctx.lineCap = 'round'; ctx.lineWidth = s * 0.07; for (const k of [-1, 1]) { const sw = Math.sin(t * 9 + (k > 0 ? 0 : Math.PI)) * s * 0.03; ctx.beginPath(); ctx.moveTo(-s * 0.08, k * s * 0.05); ctx.lineTo(-s * 0.5, k * s * 0.045 + sw); ctx.stroke(); }
  ctx.fillStyle = hu; ctx.beginPath(); ctx.ellipse(0.06 * s, 0, s * 0.2, s * 0.1, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#1F2B48'; ctx.beginPath(); ctx.ellipse(-0.1 * s, 0, s * 0.07, s * 0.085, 0, 0, 6.283); ctx.fill();
  for (const k of [-1, 1]) { const p = ph + (k > 0 ? 0 : Math.PI), reach = Math.cos(p); ctx.strokeStyle = hu; ctx.lineWidth = s * 0.06; ctx.beginPath(); ctx.moveTo(s * 0.18, k * s * 0.09); ctx.lineTo(s * 0.18 + reach * s * 0.32, k * s * (0.1 + 0.06 * Math.abs(Math.sin(p)))); ctx.stroke(); }
  circ(ctx, s * 0.32, 0, s * 0.075, '#D8573F'); ctx.restore(); }

// ---------- staafjes ----------
function SP7_staaf(ctx, x, base, w, hgt, kl, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (hgt > 1) { roundRect(ctx, x - w / 2, base - hgt, w, hgt, 8); shape(ctx, rgba(kl, 0.75), kl, 2); }
  if (lab) { const ls = Array.isArray(lab) ? lab : [lab]; ls.forEach((l, i) => metaText(ctx, l, x, base + 40 + i * 32, o.labKl || C.text2, 'center', 28)); } ctx.restore(); }
function SP7_hartje(ctx, x, y, s, kl, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-26, -6, -14, -30, 0, -16); ctx.bezierCurveTo(14, -30, 26, -6, 0, 12); ctx.fillStyle = kl; ctx.fill(); ctx.restore(); }

// opleidingskaart
function SP7_opleiding(ctx, x, y, w, h, regels, a = 1, dx = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(dx * (1 - ease(a)), 0); kaart(ctx, x, y, w, h, 1, C.goud);
  regels.forEach(([s2, soort], i) => { if (soort === 'meta') metaText(ctx, s2, x + 34, y + 56 + i * 52, C.goud, 'left', 28); else text(ctx, s2, x + 34, y + 60 + i * 52, fTekst(soort === 'groot' ? 44 : 36, soort === 'groot' ? 800 : 600), C.text, 'left'); }); ctx.restore(); }
// Wat word jij? · Sport en topsport 7 · Na de race — scènes per alinea (v1.0, 19 nov 2026).
// Look: Schema met cast. De zwemmer (outfit 'zwem' tot s06, daarna 'school' = hoodie: er is geen trainingsjack in de cast),
// de sportpsycholoog ('sportpsycholoog'), teamgenoot alleen als silhouet (afzender), trainer 'zwemtrainer' en mentor (castdocent, naamloos) alleen in s19.
// Tijdlijn bovenin, emotiemeter (paars, label 'MODEL · HOE STERK VOELT HET') rechts naast de zwemmer.

// meter rechts naast de schouder: r = return van persoon()
function meterBij(ctx, r, niv, a = 1, o = {}) { if (!r || !r.hoofd) return; const hh = r.hoofd.r / 0.55; SP7_meter(ctx, r.hoofd.x + (o.dx || hh * 2.6), (o.y != null ? o.y : r.hoofd.y - hh * 0.4), niv, a, o); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); const y0 = 600; ctx.fillStyle = SP7.water; ctx.fillRect(1060, y0, 860, 260); ctx.strokeStyle = SP7.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 1060; x <= 1920; x += 12) { const yy = y0 + Math.sin(x / 60 + t * 1.5) * 3; x === 1060 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
    const n = Math.floor(clamp((t - 0.3) / 2.2, 0, 1) * 24); for (let i = 0; i < n; i++) circ(ctx, 1900 - i * 34, y0 + 4, 10, (i % 6 < 3) ? '#C9454A' : '#E8E2D4');
    ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(1060, 0, 860, 875); ctx.clip(); const L = 300; zwemmer(ctx, 'sam', 1180 + ((t * 70) % 760), y0 + 0.12 * L, L, { slag: 'crawl', t }); ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const B = t >= q.at('zwemmer') - 0.3; // cut van tribune naar bad
    if (!B) { SP7_tribune(ctx); const r = persoon(ctx, 'sam', 560, 820, 430, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, uit: 'ernstig', t, hold: (c, x, y, an) => SP7_stift(c, x, y, an) });
      zoomCircle(ctx, 1240, 440, 280, r.handR ? r.handR.x : 600, r.handR ? r.handR.y : 640, 'OP DE RUG VAN ZIJN HAND', 1, () => { bg(ctx, 'schema'); SP7_hand(ctx, 1230, 460, 1.0, [['2:01,50', clamp((t - 0.3) / 1.6, 0, 1), SP7.stift, 0]]); });
      return; }
    const muur = 300, wl = 600, tik = q.on('tikt', 1, 0.35), kijkt = q.on('kijkt', 1, 0.5), Vr = q.on('Moet', 1, 0.5);
    SP7_badZij(ctx, muur, wl, t); SP7_tijdlijn(ctx, lerp(0, 6, fase(t, q.at('volgen'), q.at('lang') + 0.9, 1.4)), 1, { alleenActief: t > q.at('volgen') && t < q.at('lang') + 0.9 });
    SP7_bord(ctx, 140, 150, 560, 1, q.on('bord', 1, 0.4), '2:02,71', q.on('Ruim', 1, 0.4), '+1,21');
    const h = 520, hh = h * 1.04 / 6.1, y = wl - 18 + h * 1.04 - hh * 1.42;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
    const r = persoon(ctx, 'sam', 530, y, h, { outfit: 'zwem', zij: true, kijk: -1, vrij: true, bril: 'ogen', uit: kijkt > 0.5 ? 'ernstig' : 'neutraal', t, arm: [lerp(2.9, 2.15, tik), lerp(0.6, 0.25, tik)], armVer: [0.3, 0.6], knik: -0.35 * kijkt }); ctx.restore();
    SP7_waterVoor(ctx, muur, wl, t, tik * (1 - ramp(t, q.at('tikt') + 1.5, 1.5)), muur + 10);
    if (r.hoofd) laag(ctx, q.on('gloeit', 1, 0.8) * 0.45, () => { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.ellipse(r.hoofd.x - r.hoofd.r * 0.25, r.hoofd.y + r.hoofd.r * 0.3, r.hoofd.r * 0.3, r.hoofd.r * 0.18, 0, 0, 6.283); ctx.fill(); });
    const niv = niveau(1, [[q.on('limiet', 1, 0.8), 6], [q.on('gloeit', 1, 0.8), 9]]); SP7_meter(ctx, 790, 300, niv, 1);
    laag(ctx, q.on('keel', 1, 0.4) * (1 - Vr), () => metaKaart(ctx, 'KEEL DICHT', 330, 450, 1, C.koraal, 'center'));
    laag(ctx, Vr, () => { kaart(ctx, 1000, 300, 800, 300, 1, C.goud); text(ctx, 'Wegdrukken', 1060, 400, fTitel(64), C.text, 'left'); text(ctx, 'of er iets mee?', 1060, 480, fTitel(64), C.text, 'left'); metaText(ctx, 'WAT DENK JE?', 1060, 560, C.goud, 'left', 28); }); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const zit = 640, wl = 750; SP7_badrand(ctx, zit, wl, t); SP7_tijdlijn(ctx, 0);
    for (const [x, id, k] of [[1380, 'bilal', -1], [1520, 'daan', 1], [1650, 'noor', -1]]) SP7_sil(ctx, SP7.sil, (c) => persoon(c, id, x, zit - 40, 250, { outfit: 'sport', kijk: k }));
    const bril = t < q.at('reactie') ? 'ogen' : 'muts', Wv = q.on('Wat', 1, 0.4);
    const r = persoon(ctx, 'sam', 760, zit + 120, 470, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, bril, uit: t > q.at('kaken') ? 'ernstig' : 'neutraal', t });
    SP7_waterFront(ctx, wl, t);
    meterBij(ctx, r, 9, 1, { info: q.on('informatie', 1, 0.5) });
    const M = fase(t, q.at('verbergt') - 0.3, q.at('psycholoog'), 0.5);
    laag(ctx, M, () => { SP7_masker(ctx, 470, 400, 1.1); metaKaart(ctx, 'VAN BUITEN MINDER', 470, 580, 1, C.text2, 'center'); });
    laag(ctx, fase(t, q.at('voelt'), q.at('psycholoog') + 0.3, 0.5), () => metaKaart(ctx, 'VAN BINNEN NIET MINDER', 1200, 300, 1, C.paars, 'left'));
    laag(ctx, q.on('Kross', 1, 0.5) * (1 - Wv), () => { kaart(ctx, 1240, 200, 560, 150, 1, C.line); metaText(ctx, 'SHIFT · ETHAN KROSS · 2025', 1270, 256, C.grain, 'left', 28); text(ctx, 'emoties = informatie', 1270, 320, fTekst(40, 700), C.text, 'left'); });
    laag(ctx, q.on('informatie', 1, 0.4) * (1 - Wv), () => metaKaart(ctx, 'INFORMATIE', 1200, 300, 1, C.teal, 'left'));
    const hx = r.hoofd ? r.hoofd.x : 760, hy = r.hoofd ? r.hoofd.y : 420;
    [0, 1, 2].forEach(i => SP7_wolk(ctx, 260 + (i % 2) * 40, 190 + i * 150, 230, 110, '', ramp(t, q.at('Wat') + 0.15 + i * 0.45, 0.4), hx - 60, hy)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 0); antwoord(ctx, 'antwoord b: wat hij verwachtte en wat hij belangrijk vindt', 1);
    const kant = 0.16 * q.on('slechter', 1, 1.0); SP7_weegschaal(ctx, 560, 330, kant, 1, { hlL: q.on('hoopte', 1, 0.4) * (1 - q.on('Teleurstelling', 2, 0.4)) });
    metaA(ctx, 'ZEELENBERG E.A. 2000', 560, 260, q.on('uitkomst', 1, 0.4), C.grain, 'center');
    laag(ctx, q.on('belangrijk', 1, 0.4) * (1 - q.on('duw', 1, 0.4)), () => metaKaart(ctx, 'WAT HIJ BELANGRIJK VINDT', 560, 840 - 40, 1, C.goud, 'center'));
    const r = persoon(ctx, 'sam', 1230, 840, 400, { outfit: 'zwem', pose: 'zit', zitHoogte: 110, uit: 'ernstig', t });
    SP7_handdoek(ctx, r, 1);
    const zak = q.on('zakken', 1, 1.2); meterBij(ctx, r, niveau(9, [[zak, 8]]), 1);
    const P = fase(t, q.at('duw') - 0.2, q.at('informatie') + 0.4, 0.5), S = q.on('volgen', 1, 0.5);
    laag(ctx, P, () => { pijl(ctx, 1330, 380, 1690, 380, C.koraal, 1, 6, 24); metaText(ctx, 'STOP ERMEE', 1500, 350, C.koraal, 'center', 28); SP7_deur(ctx, 1790, 470, 1);
      if (S > 0) { ctx.save(); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1360, 420); ctx.lineTo(1360 + 300 * S, 330); ctx.stroke(); ctx.restore(); } });
    const sl = q.on('zakken', 1, 0.5), st = q.on('sterk', 1, 0.8), du = q.on('lang', 2, 0.8);
    SP7_schuif(ctx, 1640, 330, 230, lerp(0.9, 0.55, st), 'STERKTE', sl * (1 - P)); SP7_schuif(ctx, 1790, 330, 230, lerp(0.9, 0.45, du), 'DUUR', sl * (1 - P));
    laag(ctx, q.on('bijsturen', 1, 0.5), () => metaKaart(ctx, 'BIJSTUREN', 1715, 290, 1, C.paars, 'center')); },

  // ---------- H2 ----------
  s06(ctx, t, q) { const zit = 640, wl = 750; SP7_badrand(ctx, zit, wl, t, { bord: 'UITZWEMBAD' }); SP7_tijdlijn(ctx, 1);
    const mu = q.on('muziek', 1, 0.6), nod = mu * Math.sin(t * 5.2) * 0.5 + 0.5;
    const r = persoon(ctx, 'sam', 460, zit + 120 + nod * 4, 470, { outfit: 'zwem', pose: 'zit', zitHoogte: 120, uit: mu > 0.5 ? 'neutraal' : 'ernstig', t });
    SP7_handdoek(ctx, r, 1); SP7_koptelefoon(ctx, r, mu); SP7_waterFront(ctx, wl, t);
    if (r.hoofd) SP7_noten(ctx, r.hoofd.x - 220, r.hoofd.y + 200, t, mu);
    meterBij(ctx, r, niveau(8, [[ramp(t, q.at('muziek'), 2.5), 7]]), 1);
    laag(ctx, q.on('zintuigen', 1, 0.4) * (1 - q.on('buiten', 1, 0.4)), () => metaKaart(ctx, 'GEREEDSCHAP: ZINTUIGEN', 160, 250, 1, C.teal, 'left'));
    metaA(ctx, 'SAARIKALLIO 2007', 160, 310, q.on('jongeren', 1, 0.4) * (1 - q.on('buiten', 1, 0.4)));
    const K = q.on('buiten', 1, 0.6); SP7_wandelKader(ctx, 1000, 150, 820, 380, t, K);
    laag(ctx, q.on('anderhalf', 1, 0.4), () => { klokje(ctx, 1410, 240, 40, ramp(t, q.at('anderhalf'), 2.2) * 0.75, 1); metaKaart(ctx, '1,5 UUR', 1470, 262, 1, C.text, 'left'); });
    const Ma = q.on('maalden', 1, 0.5), gr = q.on('minder', 1, 1.0), st = q.on('stad', 1, 0.5);
    laag(ctx, Ma, () => { kaart(ctx, 1000, 590, 820, 282, 1, C.line); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 800); ctx.lineTo(1740, 800); ctx.stroke(); metaText(ctx, 'MALEN NA DE WANDELING', 1040, 636, C.paars, 'left', 28); });
    SP7_staaf(ctx, 1210, 800, 120, lerp(100, 40, gr), C.paars, 'GROEN', Ma); SP7_staaf(ctx, 1620, 800, 120, 100, C.paars, 'STAD', Ma);
    laag(ctx, st, () => metaKaart(ctx, 'GEEN VERSCHIL', 1620, 688, 1, C.text2, 'center'));
    metaA(ctx, 'BRATMAN E.A. 2015', 1810, 570, K, C.grain, 'right'); },

  s07(ctx, t, q) { SP7_kamer(ctx, 800, { raam: 1450 }); SP7_tijdlijn(ctx, 2);
    SP7_bank(ctx, 520, 440, 640, 800); const r = persoon(ctx, 'sam', 740, 800, 430, { outfit: 'school', pose: 'zit', zitHoogte: 160, uit: 'neutraal', t }); SP7_bankVoor(ctx, 520, 440, 640);
    SP7_laptop(ctx, 330, 660, 0.5 + 0.5 * Math.sin(t * 3.1) * Math.sin(t * 1.7));
    meterBij(ctx, r, 7, 1);
    SP7_tas(ctx, 1600, 800, 1, { morgen: q.on('Morgen', 1, 0.5) });
    vraagteken(ctx, 1600, 545, q.on('wegvluchten', 1, 0.4), 110); },

  s09(ctx, t, q) { SP7_kamer(ctx, 800, { raam: 1450 }); SP7_tijdlijn(ctx, 2); antwoord(ctx, 'antwoord a: even iets anders doen mag', 1);
    SP7_bank(ctx, 520, 440, 640, 800); const r = persoon(ctx, 'sam', 740, 800, 430, { outfit: 'school', pose: 'zit', zitHoogte: 160, uit: 'neutraal', t }); SP7_bankVoor(ctx, 520, 440, 640);
    SP7_laptop(ctx, 330, 660, 0.5 + 0.5 * Math.sin(t * 3.1) * Math.sin(t * 1.7));
    meterBij(ctx, r, niveau(7, [[q.on('eraf', 1, 1.5), 5]]), 1);
    metaA(ctx, 'LYUBOMIRSKY E.A. 1998', 120, 230, q.on('proeven', 1, 0.4));
    const G = fase(t, q.at('malen'), q.at('Afleiding') + 0.6, 0.5); SP7_meter(ctx, 1250, 300, niveau(5, [[q.on('somberder', 1, 1.2), 8]]), G, { grijs: true, labelTxt: 'BLEEF MALEN' });
    const sl = q.on('nooit', 1, 0.4), op = q.on('leer', 1, 0.6);
    SP7_tas(ctx, 1600, 800, 1, { morgen: 1, slot: sl, open: op }); },

  // ---------- H3 ----------
  s10(ctx, t, q) { SP7_kamer(ctx, 800, { raam: -1 }); SP7_tijdlijn(ctx, 3); const Ps = q.on('Psychologen', 1, 0.6);
    SP7_bedAchter(ctx, 200, 640, 620); const r = persoon(ctx, 'sam', 440, 760, 420, { outfit: 'school', pose: 'zit', zitHoogte: 140, uit: t > q.at('groter') ? 'bezorgd' : 'neutraal', t, hold: (c, x, y, an) => SP7_telefoonHand(c, x, y, an) }); SP7_deken(ctx, 200, 640, 650, 800);
    const gr = q.on('groter', 1, 1.2); meterBij(ctx, r, niveau(5, [[gr, 8]]), 1, { rand: t > q.at('groter') });
    const b = [['wat een rotrace', 'ander', q.on('rotrace', 1, 0.3)], ['ja echt', 'zelf', ramp(t, q.at('rotrace') + 0.8, 0.3)], ['die limiet is gewoon te scherp', 'ander', q.on('limiet', 1, 0.3)], ['en die keerpuntrechter…', 'ander', q.on('appen', 1, 0.3)], ['precies', 'zelf', q.on('door', 1, 0.3)]];
    laag(ctx, 1 - Ps, () => { SP7_telefoon(ctx, 1000, 150, 560, 700, b, q.on('appt', 1, 0.5)); SP7_klokDigit(ctx, 1730, 300, t < q.at('elf') ? '21:00' : '23:00', q.on('appt', 1, 0.5)); });
    laag(ctx, Ps, () => { kaart(ctx, 1000, 170, 800, 170, 1, C.koraal); text(ctx, 'Co-ruminatie', 1040, 240, fTitel(56), C.text, 'left'); metaText(ctx, 'SAMEN BLIJVEN MALEN', 1040, 300, C.koraal, 'left', 28);
      metaA(ctx, 'ROSE E.A. 2007', 1800, 380, q.on('onderzoek', 1, 0.4), C.grain, 'right');
      laag(ctx, q.on('hechtere', 1, 0.4), () => { SP7_hartje(ctx, 1060, 470, 1.6, C.groen); text(ctx, 'hechtere vriendschap', 1110, 484, fTekst(40, 700), C.groen, 'left'); });
      const M = q.on('meisjes', 1, 0.8); laag(ctx, M, () => { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1150, 790); ctx.lineTo(1650, 790); ctx.stroke(); metaText(ctx, 'MEER SOMBER EN ANGSTIG', 1400, 580, C.koraal, 'center', 28); });
      SP7_staaf(ctx, 1280, 790, 120, 150 * M, C.koraal, 'MEISJES', M); SP7_staaf(ctx, 1520, 790, 120, 30 * M, C.koraal, 'JONGENS', M); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 3); const D = q.on('Daarna', 1, 0.3);
    laag(ctx, t < q.at('Daarna') ? 1 : 0, () => { persoon(ctx, 'lotte', 600, 800, 420, { zij: true, kijk: 1, pose: 'zit', stoel: true, uit: q.on('naar', 1) > 0.5 ? 'bezorgd' : 'neutraal', t });
      roundRect(ctx, 900, 300, 760, 440, 16); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, 930, 330, 700, 380, 8); shape(ctx, '#2A3446', null);
      metaText(ctx, 'NAAR FILMPJE', 1280, 532, C.text2, 'center', 28); metaA(ctx, 'PROEF MET STUDENTEN', 900, 260, q.on('proef', 1, 0.4)); });
    laag(ctx, D, () => { const pan = (x, lab, la, friend) => { paneel(ctx, x, 180, 820, 600, '', 1);
        const rS = persoon(ctx, 'lotte', x + 300, 700, 380, { pose: 'zit', stoel: true, uit: 'bezorgd', t });
        if (friend === 'mee') persoon(ctx, 'yasmin', x + 540, 700, 380, { pose: 'zit', stoel: true, uit: 'bezorgd', t, handOpHand: rS.handL ? { x: rS.handL.x, y: rS.handL.y } : null });
        else { const rD = persoon(ctx, 'daan', x + 540, 700, 380, { pose: 'zit', stoel: true, uit: 'praat', t }); const fl = Math.cos(t * 0.9), hx = (rS.schoot ? (rS.schoot.x + (rD.schoot ? rD.schoot.x : x + 540)) / 2 : x + 420), hy = (rD.schoot ? rD.schoot.y : 560) - 70;
          ctx.save(); ctx.translate(hx, hy); ctx.scale(Math.max(0.3, Math.abs(fl)), 1); roundRect(ctx, -40, -54, 80, 108, 8); shape(ctx, fl > 0 ? '#F2F2EE' : C.teal, '#9AA3B2', 2); ctx.restore(); }
        laag(ctx, la, () => text(ctx, lab, x + 410, 760, fTekst(44, 800), C.text, 'center'));
        vraagteken(ctx, x + 760, 290, q.on('welke', 2, 0.4), 90); };
      pan(140, 'Meeleven', q.on('mee', 1, 0.4), 'mee'); pan(960, 'Anders bekijken', q.on('bekijken', 1, 0.4), 'anders'); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 3); antwoord(ctx, 'antwoord c: na de vriend die hielp anders te kijken', 1);
    const base = 760; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, base); ctx.lineTo(1000, base); ctx.stroke();
    metaText(ctx, 'VAN SLAG, 2 DAGEN LATER', 600, 290, C.paars, 'center', 28); metaA(ctx, 'NILS & RIMÉ 2012', 600, 250, 1, C.grain, 'center');
    const m = q.on('bleven', 1, 1.0), an = q.on('hielp', 1, 1.0); SP7_staaf(ctx, 400, base, 180, 360 * ramp(t, 0.6, 1.2) * (0.6 + 0.4 * m), C.paars, 'MEELEVEN', 1); SP7_staaf(ctx, 800, base, 180, lerp(216, 110, an) * ramp(t, 0.6, 1.2), C.paars, 'ANDERS BEKIJKEN', 1);
    laag(ctx, q.on('alleen', 1, 0.4), () => { SP7_hartje(ctx, 560, 400, 1.6, C.koraal); metaText(ctx, 'MINDER ALLEEN', 600, 414, C.koraal, 'left', 28); });
    const K = q.on('Kross', 1, 0.3); laag(ctx, K, () => { paneel(ctx, 1130, 260, 660, 520, '', 1);
      const rS = persoon(ctx, 'lotte', 1380, 640, 300, { pose: 'zit', stoel: true, uit: 'blij', t });
      persoon(ctx, 'yasmin', 1230, 640, 300, { pose: 'zit', stoel: true, uit: 'blij', t }); const rD = persoon(ctx, 'daan', 1580, 640, 300, { pose: 'zit', stoel: true, uit: 'praat', t }); if (rD.schoot) { roundRect(ctx, rD.schoot.x - 110, rD.schoot.y - 120, 60, 80, 6); shape(ctx, C.teal, '#9AA3B2', 2); }
      metaText(ctx, 'ADVIES KROSS', 1460, 320, C.goud, 'center', 28); text(ctx, 'steun + een nieuwe blik', 1460, 720, fTekst(40, 800), C.text, 'center'); }); },

  // ---------- H4 ----------
  s14(ctx, t, q) { const vl = 820; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 4);
    const tafel = 640; SP7_tafeltje(ctx, 570, tafel, vl);
    const praat = (t > q.at('Wat', 2) && t < q.at('Onder')) || (t > q.at('Dat', 2) && t < q.at('Welk'));
    const rP = persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: praat ? 'praat' : 'neutraal', t });
    const af = q.on('afstand', 1, 0.8) * (1 - q.on('ingestort', 1, 0.6));
    const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel: af > 0.5 ? null : tafel, leun: -10 * af, uit: t > q.at('Onder') && t < q.at('zegt') + 0.6 ? 'praat' : 'neutraal', t });
    SP7_blok(ctx, 470, tafel - 10, -0.2);
    meterBij(ctx, rS, niveau(6, [[q.on('dempt', 1, 1.2), 5]]), 1, { dx: 170 });
    laag(ctx, fase(t, q.at('helpt'), q.at('leggen'), 0.4), () => { ['DRUK', 'TEGENVALLERS', 'DOELEN'].forEach((s2, i) => metaKaart(ctx, s2, 1240, 220 + i * 80, ramp(t, q.at(['druk', 'tegenvallers', 'doelen'][i]), 0.3), C.text, 'left')); });
    const V = q.on('splittijden', 1, 0.5) * (1 - q.on('prestatiedoel', 1, 0.5));
    SP7_verslag(ctx, 1200 + 40 * af, 150, 640, ['28,40', '30,10', '31,60', '32,61'], V, { snel: q.on('snel', 1, 0.6), laatste: q.on('ingestort', 1, 0.6), ring: q.on('ingestort', 1, 0.8) });
    laag(ctx, af * V, () => metaKaart(ctx, 'MET AFSTAND', 1840, 400, 1, C.teal, 'right'));
    SP7_tablet(ctx, 1240, 450, 560, 330, t, q.on('video', 1, 0.5) * (1 - q.on('Wat', 2, 0.4)));
    laag(ctx, fase(t, q.at('Onder') - 0.2, q.at('uitkomstdoel'), 0.4), () => metaKaart(ctx, 'ONDER DE LIMIET', 1260, 470, 1, C.goud, 'left'));
    SP7_treden(ctx, 1220, 260, 600, [q.on('uitkomstdoel', 1, 0.4), q.on('prestatiedoel', 1, 0.4), q.on('procesdoel', 1, 0.4)], { vul: [0, 1, 0], vraag: q.on('Welk', 1, 0.4) }); },

  s16(ctx, t, q) { const vl = 820; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 4); antwoord(ctx, 'antwoord b: bij elk keerpunt vijf dolfijnslagen', 1);
    const tafel = 640; SP7_tafeltje(ctx, 570, tafel, vl); const jij = fase(t, q.at('Jij'), q.at('Zijn') + 0.3, 0.3);
    persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: jij > 0.5 && Math.sin(t * 9) > -0.2 ? 'praat' : 'neutraal', t });
    const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: t > q.at('plan') ? 'blij' : 'neutraal', t }); SP7_blok(ctx, 470, tafel - 10, -0.2);
    meterBij(ctx, rS, niveau(5, [[q.on('plan', 1, 1.4), 4]]), 1, { dx: 170 });
    const PL = q.on('plan', 1, 0.6), weg = q.on('Jij', 1, 0.5);
    const ex = [['ANDEREN', q.on('anderen', 1, 0.4)], ['JE VORM', q.on('vorm', 1, 0.4)], ['KIES JE ZELF', q.on('kies', 1, 0.4), C.groen]];
    laag(ctx, 1 - PL, () => { SP7_treden(ctx, 1220, 470, 600, [1, 1, 1], { vul: [0, 1 - weg, 0], hl: [0, 0, q.on('kies', 1, 0.5)], extra: ex, weg: [0, weg, 0] });
      laag(ctx, weg, () => metaKaart(ctx, 'ALLEEN EEN TIJD', 1520, 638, 1, C.koraal, 'center')); });
    const E = q.on('overzicht', 1, 0.5); laag(ctx, E, () => { metaText(ctx, 'EFFECT OP PRESTATIE', 1220, 226, C.grain, 'left', 28);
      [['PROCES', 1.36, 'grootste'], ['PRESTATIE', 0.44, ''], ['UITKOMST', 0.09, 'kleinste']].forEach(([l, d, k], i) => { const yy = 248 + i * 46; metaText(ctx, l, 1400, yy + 28, C.text2, 'right', 28); roundRect(ctx, 1420, yy, Math.max(8, 380 * d / 1.36 * ramp(t, q.at('overzicht') + 0.4 + i * 0.25, 0.8)), 34, 8); shape(ctx, rgba(C.goud, 0.7), C.goud, 1.5); }); });
    metaA(ctx, 'OVERZICHT 27 STUDIES', 1220, 412, E); metaA(ctx, 'WILLIAMSON E.A. 2022', 1220, 446, E);
    laag(ctx, PL, () => { kaart(ctx, 1220, 480, 600, 330, 1, C.goud, rgba(C.goud, 0.12 + 0.18 * ramp(t, q.at('plan') + 0.5, 1.5))); metaText(ctx, 'PLAN', 1260, 540, C.goud, 'left', 28);
      text(ctx, 'eerste 100 m rustiger', 1260, 620, fTekst(44, 800), C.text, 'left'); laag(ctx, q.on('keerpunt', 1, 0.4), () => { text(ctx, 'elk keerpunt', 1260, 700, fTekst(44, 800), C.text, 'left'); text(ctx, '5 dolfijnslagen', 1260, 760, fTekst(44, 800), C.text, 'left'); }); }); },

  // ---------- H5 ----------
  s17(ctx, t, q) { const R = q.on('Waarom', 1, 0.3), O = q.on('Onderzoekers', 1, 0.3);
    if (R < 1) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); laag(ctx, 1 - R, () => { SP7_rooster(ctx, 260, 160, 1400, 560, 1); laag(ctx, q.on('toetsen', 1, 0.4), () => metaKaart(ctx, 'EN OOK NOG TOETSEN', 1660, 800, 1, C.oker, 'right')); }); }
    if (R > 0 && t < q.at('Onderzoekers')) laag(ctx, R, () => { const vl = 820, tafel = 640; SP7_praktijk(ctx, vl); SP7_tijdlijn(ctx, 5); SP7_tafeltje(ctx, 570, tafel, vl);
      const neer = q.on('vraagt', 1, 0.6); const rP = persoon(ctx, 'sportpsycholoog', 340, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: t < q.at('vraagt') ? 'praat' : 'neutraal', t });
      SP7_blok(ctx, lerp(rP.handR ? rP.handR.x : 420, 470, neer), lerp(rP.handR ? rP.handR.y - 40 : 560, tafel - 10, neer), -0.2);
      const rS = persoon(ctx, 'sam', 800, vl, 400, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: 'denkt', t }); meterBij(ctx, rS, 4, 1, { dx: 170 });
      if (rP.hoofd) SP7_wolk(ctx, 1020, 260, 420, 150, 'Waarom zwem jij?', q.on('Waarom', 1, 0.5), rS.hoofd.x + 40, rS.hoofd.y - 30, 40); });
    if (O > 0) laag(ctx, O, () => { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); sp7Groepen(ctx, t, q, { mk: clamp((t - q.at('jaar')) / 2.5, 0, 1) * 1, vraag: q.on('Wie', 1, 0.4) }); }); },

  s19(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 5); const N = q.on('plant', 1, 0.3);
    laag(ctx, t < q.at('plant') ? 1 : 0, () => { antwoord(ctx, 'antwoord a: wie zwom omdat hij het zelf wilde', 1);
      sp7Groepen(ctx, t, q, { mk: 2, weg: q.on('stopte', 1, 1.6), talent: 1 - q.on('Zwemmers', 1, 0.6), zelfweg: q.on('vol', 1, 1.0) });
      metaA(ctx, 'PELLETIER E.A. 2001 · CANADA', 1800, 160, q.on('Zwemmers', 1, 0.4), C.grain, 'right');
      const T = q.on('meebeslissen', 1, 0.3); laag(ctx, T, () => { SP7_sil(ctx, SP7.silL, (c) => persoon(c, 'zwemtrainer', 1500, 640, 300, { pose: 'wijs', kijk: -1 }));
        for (const [dx, k] of [[-120, C.teal], [-40, C.goud]]) { roundRect(ctx, 1500 + dx - 30, 420, 60, 84, 8); shape(ctx, rgba(k, 0.6), k, 2); }
        for (let i = 0; i < 3; i++) SP7_telpop(ctx, 1290 + i * 44, 640, 110, '#8FA8C8');
        metaText(ctx, 'MEEBESLISSEN', 1460, 700, C.goud, 'center', 28); metaText(ctx, 'SAMENHANG, GEEN PROEF', 1460, 740, C.text2, 'center', 28); }); });
    laag(ctx, N, () => { SP7_rooster(ctx, 820, 170, 960, 460, 1, { vrij: 2, vrijA: q.on('week', 1, 0.8), legenda: false });
      persoon(ctx, 'visser', 300, 820, 420, { uit: 'blij', kijk: 1, t }); persoon(ctx, 'sam', 500, 820, 430, { outfit: 'school', uit: 'blij', pose: 'wijs', kijk: 1, t }); persoon(ctx, 'zwemtrainer', 700, 820, 430, { uit: 'blij', kijk: -1, t });
      metaText(ctx, 'MENTOR', 300, 860, C.text2, 'center', 28); metaText(ctx, 'TRAINER', 700, 860, C.text2, 'center', 28); }); },

  // ---------- H6 ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); SP7_tijdlijn(ctx, 6); const R = q.on('Dan', 1, 0.3), Hd = q.on('hand', 1, 0.4);
    laag(ctx, t < q.at('Dan') ? 1 : 0, () => { const r = persoon(ctx, 'sam', 420, 820, 440, { outfit: 'school', uit: 'blij', pose: 'vasthouden', kijk: 1, t, hold: (c, x, y, an) => SP7_telefoonHand(c, x, y, an) }); meterBij(ctx, r, 4, 1);
      roundRect(ctx, 880, 170, 520, 640, 46); shape(ctx, '#11161F', '#56627E', 4); roundRect(ctx, 898, 188, 484, 604, 32); shape(ctx, '#1C2638', null); metaText(ctx, 'NA EEN TEGENVALLER', 1140, 250, C.text2, 'center', 28);
      [['MEELEVEN', 'noor', q.on('meeleeft', 1, 0.4)], ['MEEDENKEN', 'daan', q.on('meedenkt', 1, 0.4)]].forEach(([l, id, a], i) => laag(ctx, a, () => { const yy = 330 + i * 190; roundRect(ctx, 930, yy, 420, 150, 20); shape(ctx, '#25324A', null);
        SP7_sil(ctx, SP7.silL, (c) => persoon(c, id, 1010, yy + 210, 170, {})); text(ctx, l, 1090, yy + 92, fTekst(40, 800), C.text, 'left'); })); });
    laag(ctx, R * (1 - Hd), () => { const x0 = 160, x1 = 1460, by = 330, bh = 220; SP7_baanBoven(ctx, x0, x1, by, bh);
      const t0 = q.at('race'), lenT = (q.at('Bijna') - t0) / 4, u = clamp((t - t0) / lenT, 0, 4), k = Math.min(3, Math.floor(u)), f = u - k, dir = k % 2 ? -1 : 1, mx = x0 + 110, Mx = x1 - 110, xx = dir > 0 ? lerp(mx, Mx, f) : lerp(Mx, mx, f);
      SP7_bovenZwemmer(ctx, xx, by + bh / 2 + 40, 170, u >= 4 ? 1 : dir, t);
      const splits = ['29,30', '30,20', '30,70', '31,63'];
      splits.forEach((s2, i) => { const a = ramp(u, i + 1, 0.05) || (u >= i + 1 ? 1 : 0); laag(ctx, u >= i + 1 ? 1 : 0, () => { const cx = 260 + i * 260; text(ctx, s2, cx, 260, fMeta(44), i === 3 ? mixKl('#F2F2EE', '#E07A5F', q.on('laatste', 1, 0.6)) : C.text, 'center'); metaText(ctx, ((i + 1) * 50) + ' M', cx, 210, C.text2, 'center', 28);
          if (i === 3) laag(ctx, q.on('laatste', 1, 0.6), () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, 246, 100, 40, 0, 0, 6.283); ctx.stroke(); }); }); });
      for (let i = 1; i <= 3; i++) laag(ctx, u >= i ? 1 : 0, () => { const wx = i % 2 ? x1 - 40 : x0 + 40; vink_(ctx, wx, by + bh + 70, 22, 1, C.goud); metaText(ctx, 'PROCES', wx, by + bh + 130, C.goud, 'center', 28); });
      laag(ctx, u >= 1 ? 1 : 0, () => metaA(ctx, 'RUSTIGER BEGIN', 260, 160 + 0, 1, C.goud, 'center'));
      const D = fase(t, q.at('keerpunt'), q.at('Bijna') + 0.4, 0.4); laag(ctx, D, () => { paneel(ctx, 520, 600, 640, 260, '', 1); ctx.save(); roundRect(ctx, 520, 600, 640, 260, 16); ctx.clip(); ctx.fillStyle = SP7.waterD; ctx.fillRect(520, 640, 640, 220); ctx.fillStyle = SP7.tegel; ctx.fillRect(520, 640, 20, 220);
        const tt = t - q.at('keerpunt'), sl = Math.min(5, Math.floor(tt * 2)); zwemmer(ctx, 'sam', 600 + Math.min(1, tt / 2.6) * 380, 760, 170, { slag: 'onderwater', t, kijk: 1 }); ctx.restore();
        metaText(ctx, 'ONDER WATER', 550, 636, C.teal, 'left', 28); for (let i = 0; i < 5; i++) circ(ctx, 950 + i * 38, 626, 11, i < sl ? C.goud : '#33415C'); });
      SP7_bord(ctx, 1420, 140, 460, 1, q.on('Bijna', 1, 0.4), '2:01,83', q.on('boven', 1, 0.4), '+0,33', { h: 170 });
      const lev = niveau(4, [[q.on('teleurstelling', 1, 0.8), 5], [q.on('kleiner', 1, 0.6), 3]]); SP7_meter(ctx, 1690, 450, lev, 1, { h: 240, plan: 3, planA: q.on('kleiner', 1, 0.5) });
      laag(ctx, q.on('procesdoelen', 1, 0.4), () => metaKaart(ctx, '2 PROCESDOELEN GEHAALD', 1460, 800, 1, C.goud, 'right')); });
    laag(ctx, Hd, () => { SP7_hand(ctx, 980, 470, 1.15, [['2:01,50', 1, SP7.stift, q.on('meer', 1, 0.6)], ['100 m rustig', ramp(t, q.at('hand') + 0.2, 0.8), C.goud, 0], ['5 dolfijn', ramp(t, q.at('staat') + 0.2, 0.8), C.goud, 0]]); }); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); const x0 = 200, x1 = 1240, yT = 220, yB = 520, n = 7, dx = (x1 - x0) / (n - 1), Y = v => yB - (yB - yT) * v / 10;
    const pts = [[0, 9], [1, 7], [2, 5], [3, 8], [4, 5], [4.4, 4], [5, 4], [5.8, 5], [6, 3]];
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - 20, yB); ctx.lineTo(x1 + 20, yB); ctx.stroke(); metaText(ctx, 'HOE STERK VOELT HET · MODEL', x0 - 20, yT - 30, C.grain, 'left', 28);
    const kort = ['0 MIN', '10 MIN', 'AVOND', '23:00', 'DAG ERNA', 'WEEK', '3 WKN'];
    kort.forEach((l, i) => { circ(ctx, x0 + i * dx, yB, 6, '#56627E'); metaText(ctx, l, x0 + i * dx, yB + 44, C.text2, 'center', 28); });
    const prog = lerp(0, 1, ramp(t, 0.3, 1.2)) * 1 + 1 * ramp(t, q.at('verwachtte'), 1) + 1 * ramp(t, q.at('muziek'), 1) + 1 * ramp(t, q.at('afstand'), 1) + 1 * ramp(t, q.at('mensen'), 1) + 1.5 * ramp(t, q.at('procesdoelen'), 1.5) + 1.5 * ramp(t, q.at('hand'), 1.2);
    const P = pts.map(([i, v]) => [x0 + i * dx, Y(v)]); const segN = P.length - 1, up = clamp(prog / 8 * segN, 0, segN);
    ctx.save(); ctx.strokeStyle = C.paars; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i <= segN; i++) { if (up >= i) ctx.lineTo(P[i][0], P[i][1]); else if (up > i - 1) { const f = up - (i - 1); ctx.lineTo(lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)); break; } } ctx.stroke();
    for (let i = 0; i <= Math.min(segN, Math.floor(up)); i++) circ(ctx, P[i][0], P[i][1], 9, C.paars); ctx.restore();
    const kaarten = [['INFORMATIE', '', q.on('vertelt', 1, 0.5)], ['ZINTUIGEN ·', 'AANDACHT · MENSEN', q.on('stuur', 1, 0.5)], ['PROCESDOELEN', '', q.on('procesdoelen', 1, 0.5)], ['ZELF WILLEN', '', q.on('zelf', 1, 0.5)]];
    kaarten.forEach(([a1, a2, a], i) => laag(ctx, a, () => { const x = 100 + i * 440; kaart(ctx, x, 650, 420, 130, 1, i === 2 ? C.goud : C.line); metaText(ctx, a1, x + 210, a2 ? 704 : 726, i === 2 ? C.goud : C.text, 'center', 28); if (a2) metaText(ctx, a2, x + 210, 746, C.text, 'center', 28); }));
    laag(ctx, q.on('Daarbij', 1, 0.3), () => { persoon(ctx, 'sportpsycholoog', 1460, 600, 380, { uit: 'blij', kijk: 1, t }); persoon(ctx, 'sam', 1690, 600, 400, { outfit: 'school', uit: 'blij', kijk: -1, t }); metaText(ctx, 'SPORTPSYCHOLOOG', 1460, 640, C.goud, 'center', 28); }); },

  s22(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'OPLEIDINGEN · 2026', 160, 180, C.grain, 'left', 28);
    SP7_opleiding(ctx, 160, 220, 1600, 170, [['MASTER PSYCHOLOGY · UVA', 'meta'], ['track Sport and Performance Psychology', 'groot']], q.on('master', 1, 0.6), 200);
    SP7_opleiding(ctx, 160, 420, 1600, 170, [['MASTER HUMAN MOVEMENT SCIENCES · VU', 'meta'], ['Psychology in Sport, Performance and Health', 'groot']], q.on('bewegingswetenschappen', 1, 0.6), 200);
    SP7_opleiding(ctx, 160, 620, 1600, 170, [['DAARNA · VSPN', 'meta'], ['opleiding tot praktijksportpsycholoog', 'groot']], q.on('Daarna', 1, 0.6), 200); }
});

// telpoppetjes in drie groepen (s17, s19). o.mk = tijdlijnmarker 0..2 (0, 10, 22 maanden); o.weg = deel van 'moeten' dat stopt; o.talent = zichtbaarheid groep 3
function sp7Groepen(ctx, t, q, o = {}) { const lx0 = 360, lx1 = 1560, ly = 200; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx0, ly); ctx.lineTo(lx1, ly); ctx.stroke();
  [['0', 0], ['10', 0.45], ['22 MAANDEN', 1]].forEach(([l, f]) => { circ(ctx, lerp(lx0, lx1, f), ly, 7, '#56627E'); metaText(ctx, l, lerp(lx0, lx1, f), ly + 44, C.text2, 'center', 28); });
  const mk = o.mk || 0, mf = mk <= 1 ? mk * 0.45 : 0.45 + (mk - 1) * 0.55; circ(ctx, lerp(lx0, lx1, mf), ly, 12, C.goud);
  metaText(ctx, '369 WEDSTRIJDZWEMMERS', 160, 300, C.grain, 'left', 28);
  const G = [['ZELF WILLEN', 160, 1, o.zelfweg || 0, 0.06], ['MOETEN VAN ANDEREN', 720, 1, o.weg || 0, 0.55], ['TALENT', 1280, o.talent == null ? 1 : o.talent, 0, 0]];
  G.forEach(([lab, gx, ga, wg, frac], gi) => laag(ctx, ga, () => { for (let i = 0; i < 123; i++) { const c = i % 15, r = Math.floor(i / 15), stop = hash(i * 7.3 + gi * 11) < frac; const a = stop ? 1 - clamp(wg * 1.6 - hash(i * 3.1 + gi) * 0.6, 0, 1) : 1;
      SP7_telpop(ctx, gx + 20 + c * 30, 380 + r * 46, 42, '#8FA8C8', a); }
    metaText(ctx, lab, gx + 230, 800, C.text, 'center', 28); vraagteken(ctx, gx + 505, 600, o.vraag || 0, 70); })); }
