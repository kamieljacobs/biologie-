
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
// Wat word jij? · Sport en topsport 8 · Energiesystemen in het zwembad — eigen tekeningen (20 nov 2026)
// Seriekleuren: teal = zuurstof, water, herstel; oker = fosfaataccu en gisting (gisting oker met koraal rand); goud = voortstuwing, eindsprint;
// koraal = vermoeidheid, 'let op'. Geen namen in beeld. Mengpaneel met drie schuifjes = vast beeld voor de energiebronnen (twijfels t8).
// Maten: zwemmer 1,80 m; startblok ± 0,75 m boven het water; 50-meterbad met banen van 2,5 m.
// Splittijden (VOORBEELD, tellen op): 27,9 + 30,9 + 31,7 + 32,2 = 2:02,7 · 28,9 + 30,6 + 30,9 + 30,8 = 2:01,2.

const SP8 = { wand: '#16233A', wandL: '#1D2C47', tegel: '#2B3A55', voeg: '#22304A', water: '#2C6E8E', waterD: '#1F5672', waterL: '#4F95B5',
  bodem: '#1B4058', lijn: '#13283A', blok: '#C9D2DC', blokD: '#8E9AAA', dek: '#4C5C74', dekL: '#5E7088', vloer: '#2E3D55', huid: '#7A5440',
  vezel: '#7A3440', vezelL: '#9A4C58', bloed: '#B23A3E', bloedL: '#D8605E', lac: '#E8CF7E', grijs: '#6E7890', bord: '#F2F2EE', inkt: '#1A2740' };
const SP8_BRON = [['FOSFAATACCU', C.oker, C.oker], ['GISTING', C.oker, C.koraal], ['ZUURSTOF', C.teal, C.teal]];

// ---------- algemene hulpjes ----------
function SP8_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP8_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP8_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function SP8_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP8_kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
// kaartje met regels; regels = [[tekst, soort('meta'|'tekst'|'groot'), kleur]]
function SP8_kaartje(ctx, x, y, w, regels, a = 1, rand = C.line, al = 'left') { if (a <= 0.01) return 0; const lh = r => r[1] === 'meta' ? 44 : r[1] === 'groot' ? 60 : 50; const h = 34 + regels.reduce((s, r) => s + lh(r), 0);
  const x0 = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x;
  SP8_laag(ctx, a, () => { SP8_kaart(ctx, x0, y, w, h, 1, rand); let yy = y + 20; regels.forEach(r => { yy += lh(r); const tx = al === 'center' ? x0 + w / 2 : x0 + 28, ta = al === 'center' ? 'center' : 'left';
    if (r[1] === 'meta') metaText(ctx, r[0], tx, yy - 10, r[2] || C.grain, ta, 28); else text(ctx, r[0], tx, yy - 12, fTekst(r[1] === 'groot' ? 46 : 36, r[1] === 'groot' ? 800 : 700), r[2] || C.text, ta); }); });
  return h; }
function SP8_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
function SP8_hex(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }
// stuksgewijs lineair: punten [[t, v], ...]
function SP8_pl(t, pts) { if (t <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [t0, v0] = pts[i - 1], [t1, v1] = pts[i]; return v0 + (v1 - v0) * (t - t0) / (t1 - t0 || 1); } return pts[pts.length - 1][1]; }
function SP8_doorstreep(ctx, x0, y, w, u, kl = C.koraal, lw = 7) { if (u <= 0.01) return; ctx.save(); ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w * clamp(u, 0, 1), y); ctx.stroke(); ctx.restore(); }

// ---------- mengpaneel: drie schuifjes ----------
// (x, y) = linksboven; s = schaal (breedte 860 × s, hoogte 420 × s); v = [fosfaat, gisting, zuurstof] 0..1
// o: grijs (0..1), hl [3] (0..1 oplichten), kop (meta boven), rand (goud oplichten), kopKl
function SP8_paneel(ctx, x, y, s, v, o = {}) { const { a = 1, grijs = 0, hl = [0, 0, 0], kop = '', rand = 0, kopKl = C.text2 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 860, 420, 22); shape(ctx, '#121A2A', SP8_mix('#56627E', C.goud, rand), 3 + 3 * rand);
  if (kop) text(ctx, kop, 430, 62, fTekst(44, 800), kopKl, 'center');
  const top = kop ? 96 : 60, h = kop ? 214 : 250;
  SP8_BRON.forEach(([lab, kl, rk], i) => { const cx = 150 + i * 280, kk = SP8_hex(kl, SP8.grijs, grijs), rr = SP8_hex(rk, SP8.grijs, grijs), u = clamp(v[i], 0, 1), hli = hl[i] || 0;
    if (hli > 0.01) { ctx.save(); ctx.globalAlpha *= hli * 0.5; ctx.fillStyle = kk; roundRect(ctx, cx - 70, top - 24, 140, h + 48, 30); ctx.fill(); ctx.restore(); }
    roundRect(ctx, cx - 14, top, 28, h, 14); shape(ctx, '#0A0F18', '#3E4A62', 2);
    for (let k = 0; k <= 4; k++) { const yy = top + h * k / 4; ctx.strokeStyle = rgba('#F2F2EE', 0.18); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - 40, yy); ctx.lineTo(cx - 24, yy); ctx.moveTo(cx + 24, yy); ctx.lineTo(cx + 40, yy); ctx.stroke(); }
    const ky = top + h * (1 - u); if (u > 0.01) { roundRect(ctx, cx - 10, ky, 20, top + h - ky - 4, 10); ctx.fillStyle = rgba(kk, 0.85); ctx.fill(); }
    roundRect(ctx, cx - 52, ky - 20, 104, 40, 12); shape(ctx, kk, rr, i === 1 ? 6 : 2.5); ctx.fillStyle = rgba('#0A0F18', 0.45); ctx.fillRect(cx - 36, ky - 2, 72, 4);
    metaText(ctx, lab, cx, top + h + 62, kk, 'center', 28); });
  ctx.restore(); }

// ---------- zwembad, doorsnede (zijaanzicht) met startblok links; off = horizontale verschuiving (camera volgt) ----------
function SP8_doorsnede(ctx, t, Y, o = {}) { const { xW = 380, off = 0 } = o; bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = SP8.wand; ctx.fillRect(0, 0, W, Y - 30);
  for (let i = -1; i < 7; i++) { const x = ((160 + i * 380 - off * 0.35) % (380 * 6) + 380 * 6) % (380 * 6) - 380; roundRect(ctx, x, 60, 250, Math.max(40, Y - 200), 6); shape(ctx, '#101A2C', SP8.wandL, 3); }
  const xw = xW - off; ctx.fillStyle = SP8.water; ctx.fillRect(Math.max(0, xw), Y, W, 870 - Y); ctx.fillStyle = SP8.waterD; ctx.fillRect(Math.max(0, xw), Y + (870 - Y) * 0.55, W, (870 - Y) * 0.45);
  ctx.strokeStyle = rgba('#9FD0EA', 0.14); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { const yy = Y + 30 + i * 36; for (let k = 0; k < 14; k++) { const xx = ((k * 190 - off * 1.0 + i * 70) % 2660 + 2660) % 2660 - 200; if (xx < xw) continue; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 80, yy); ctx.stroke(); } }
  if (xw > -10) { ctx.fillStyle = SP8.tegel; ctx.fillRect(0, Y - 30, xw, 890 - Y); ctx.strokeStyle = SP8.voeg; ctx.lineWidth = 2; for (let y = Y; y < 880; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(xw, y); ctx.stroke(); }
    ctx.fillStyle = '#C9D2DC'; ctx.fillRect(0, Y - 34, xw + 6, 10); }
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = Math.max(0, xw); x <= W; x += 8) { const y = Y + 3 * Math.sin((x + off) * 0.03 + t * 2.2); x === Math.max(0, xw) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
  ctx.restore(); }
// startblok van opzij: (x, y) = voorrand en bovenkant
function SP8_startblok(ctx, x, y, s = 1, nr = 4) { ctx.save(); const hP = 150 * s, lp = 145 * s; ctx.fillStyle = SP8.blokD; ctx.fillRect(x - lp * 0.7, y + 10 * s, 18 * s, hP); ctx.fillRect(x - 24 * s, y + 10 * s, 16 * s, hP - 10 * s);
  ctx.beginPath(); ctx.moveTo(x - lp, y + 14 * s); ctx.lineTo(x, y); ctx.lineTo(x + 4 * s, y + 18 * s); ctx.lineTo(x - lp, y + 30 * s); ctx.closePath(); shape(ctx, SP8.blok, null);
  ctx.fillStyle = '#2A3A58'; roundRect(ctx, x - lp * 0.55, y + 44 * s, 44 * s, 36 * s, 4 * s); ctx.fill(); text(ctx, String(nr), x - lp * 0.55 + 22 * s, y + 72 * s, fTekst(28 * s, 800), '#F2F2EE', 'center'); ctx.restore(); }
function SP8_wig(ctx, s, py) { if (!s || !s.wig) return; const { x, y, h } = s.wig; const yb = py == null ? y + 6 : py; ctx.save(); ctx.fillStyle = SP8.blokD; ctx.beginPath(); ctx.moveTo(x - h * 1.4, yb); ctx.lineTo(x + h * 0.1, Math.min(y, yb) - h); ctx.lineTo(x + h * 0.6, Math.min(y, yb) - h * 0.8); ctx.lineTo(x + h * 0.6, yb); ctx.closePath(); ctx.fill(); ctx.restore(); }
function SP8_spat(ctx, x, y, u, a = 1) { if (a <= 0.01 || u <= 0 || u >= 1) return; ctx.save(); ctx.globalAlpha *= a * (1 - u);
  for (let i = 0; i < 9; i++) { const an = -Math.PI * (0.1 + 0.8 * i / 8), r = 30 + 160 * u; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r * 0.9 + 120 * u * u, 6, '#DDF0F8'); }
  ctx.strokeStyle = '#DDF0F8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 40 + 120 * u, 10 + 20 * u, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
// zwemmer op het blok en de duik; tD = tijd sinds het startsein (< 0 = staat klaar); geeft wereld-x van de heup terug
const SP8_BLOK = { x: 330, L: 300 };
function SP8_duik(ctx, t, tD, Y, off = 0) { const L = SP8_BLOK.L, bx = SP8_BLOK.x - off, by = Y - 34 - 128;
  if (tD <= 0) { if (bx > -200) { SP8_startblok(ctx, bx, by, 0.8, 4); SP8_wig(ctx, zwemmer(ctx, 'sam', bx, by, L, { slag: 'startblok', kijk: 1 }), by + 12); } return SP8_BLOK.x; }
  if (bx > -200) SP8_startblok(ctx, bx, by, 0.8, 4);
  let hx, hy, an = 0, slag = 'stroomlijn';
  if (tD < 0.9) { const u = clamp(tD / 0.9, 0, 1); hx = 330 + 470 * u; hy = by - 70 - 150 * u + 470 * u * u; an = Math.atan2(-150 + 940 * u, 470); }
  else if (tD < 1.7) { const u = (tD - 0.9) / 0.8; hx = 800 + 260 * u; hy = lerp(Y + 120, Y + 0.12 * L, ease(u)); an = lerp(0.5, 0, ease(u)) * (1 - u); }
  else { hx = 1060 + 200 * (tD - 1.7); hy = Y + 0.12 * L; slag = 'crawl'; }
  ctx.save(); ctx.translate(hx - off, hy); ctx.rotate(an); zwemmer(ctx, 'sam', 0, 0, L, { slag, t, kijk: 1 }); ctx.restore();
  SP8_spat(ctx, 830 - off, Y, (tD - 0.75) / 0.9, 1);
  return hx; }

// ---------- scorebord ----------
function SP8_scorebord(ctx, x, y, w, h, boven, onder, a = 1, onderKl = '#F2B84A') { if (a <= 0.01) return; SP8_laag(ctx, a, () => {
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0B0F16', '#4A5568', 3);
  ctx.save(); ctx.font = fMeta(32); ctx.letterSpacing = '4px'; ctx.fillStyle = '#F2B84A'; ctx.textAlign = 'center'; ctx.fillText(boven, x + w / 2, y + 50); ctx.restore();
  if (onder) { ctx.save(); ctx.font = fMeta(Math.round(h * 0.38)); ctx.letterSpacing = '6px'; ctx.fillStyle = onderKl; ctx.textAlign = 'center'; ctx.fillText(onder, x + w / 2, y + h - 26); ctx.restore(); } }); }

// ---------- 50-meterbad, bovenaanzicht ----------
// banen horizontaal (startmuur links); geeft {y(i), bh, x0, x1} terug; o.hl = index van de gemarkeerde baan
function SP8_bad(ctx, x, y, w, h, n, o = {}) { const { t = 0, hl = -1, blokken = true } = o; const bh = h / n;
  roundRect(ctx, x - 40, y - 30, w + 80, h + 60, 10); shape(ctx, SP8.vloer, rgba(C.line, 0.4), 2);
  ctx.fillStyle = '#3F86A8'; ctx.fillRect(x, y, w, h);
  if (hl >= 0) { ctx.fillStyle = rgba('#5BB0D6', 0.35); ctx.fillRect(x, y + hl * bh, w, bh); }
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.strokeStyle = rgba('#CFEAF6', 0.12); ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) { const yy = y + (i + 0.5) * h / 16; ctx.beginPath(); for (let xx = x; xx <= x + w; xx += 30) { const q = yy + Math.sin(xx * 0.015 + t * 0.8 + i * 1.7) * 4; xx === x ? ctx.moveTo(xx, q) : ctx.lineTo(xx, q); } ctx.stroke(); } ctx.restore();
  for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; ctx.fillStyle = rgba('#14303F', 0.5); ctx.fillRect(x + w * 0.04, yy - 4, w * 0.92, 8); ctx.fillRect(x + w * 0.04 - 2, yy - 16, 8, 32); ctx.fillRect(x + w * 0.96 - 6, yy - 16, 8, 32); }
  for (let i = 1; i < n; i++) { const yy = y + i * bh; for (let xx = x; xx < x + w; xx += 16) { const k = Math.floor((xx - x) / 16); const d = (xx - x) < w * 0.1 || (x + w - xx) < w * 0.1; circ(ctx, xx + 8, yy, 5, d ? (k % 2 ? '#C9584A' : '#E8E4DA') : (k % 2 ? '#3D7FB3' : '#E8E4DA')); } }
  ctx.fillStyle = '#C9D3DA'; ctx.fillRect(x - 6, y, 6, h); ctx.fillRect(x + w, y, 6, h);
  if (blokken) for (let i = 0; i < n; i++) { const yy = y + (i + 0.5) * bh; roundRect(ctx, x - 34, yy - 14, 28, 28, 4); shape(ctx, SP8.blok, null); if (i === hl) text(ctx, String(i + 1), x - 20, yy + 9, fTekst(22, 800), '#1A2740', 'center'); }
  return { y: (i) => y + (i + 0.5) * bh, bh, x0: x, x1: x + w }; }
function SP8_spoor(ctx, x0, x1, y, col, a = 1, lw = 12) { if (a <= 0.01 || Math.abs(x1 - x0) < 2) return; ctx.save(); ctx.globalAlpha *= a * 0.8; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
// zwemmer van boven (eenvoudige vorm, kleuren uit de cast); (x, y) = midden romp, L = kruin tot tenen
function SP8_boven(ctx, x, y, L, t, o = {}) { const { id = 'sam', kijk = 1, tempo = 1, a = 1, stil = false } = o; if (a <= 0.01) return;
  const P = CAST[id], G = (P.garderobe && P.garderobe.zwem) || {}, huid = P.huid, muts = G.badmuts || '#D8573F', broek = G.broek || '#1F2B48', dk = SP8_hex(huid, '#000000', 0.22);
  const p = stil ? 0.1 : ((t * 0.8 * tempo) % 1 + 1) % 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(kijk, 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kick = stil ? 0 : Math.sin(p * 6.283 * 3) * L * 0.025;
  [[dk, L * 0.075], [huid, L * 0.06]].forEach(([kl, lw]) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; [[-1, 1], [1, -1]].forEach(([s, k]) => { ctx.beginPath(); ctx.moveTo(-L * 0.08, s * L * 0.04); ctx.lineTo(-L * 0.3, s * L * 0.05 + k * kick * 0.5); ctx.lineTo(-L * 0.52, s * L * 0.035 + k * kick); ctx.stroke(); }); });
  const arm = (q, s) => { const sx = L * 0.26, sy = s * L * 0.11, ar = L * 0.36; let hx, hy;
    if (q < 0.62) { const u = q / 0.62; hx = sx + ar * Math.cos(u * Math.PI * 0.95); hy = sy - s * L * 0.04 * Math.sin(u * Math.PI); }
    else { const u = (q - 0.62) / 0.38; hx = sx + ar * Math.cos(Math.PI * 0.95 * (1 - u)); hy = sy + s * L * 0.12 * Math.sin(u * Math.PI); }
    const ex = (sx + hx) / 2 - L * 0.02, ey = (sy + hy) / 2 + s * L * 0.05;
    [[dk, L * 0.06], [huid, L * 0.046]].forEach(([kl, lw]) => { ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke(); }); };
  arm(p, 1);
  ctx.beginPath(); ctx.ellipse(L * 0.1, 0, L * 0.21, L * 0.115, 0, 0, 6.283); shape(ctx, huid, dk, 1.5);
  roundRect(ctx, -L * 0.14, -L * 0.075, L * 0.12, L * 0.15, L * 0.04); shape(ctx, broek, null);
  arm((p + 0.5) % 1, -1);
  ctx.beginPath(); ctx.ellipse(L * 0.37, 0, L * 0.075, L * 0.062, 0, 0, 6.283); shape(ctx, muts, SP8_hex(muts, '#000000', 0.25), 1.5);
  ctx.restore(); }

// ---------- gestapelde balk (één stuk van de race): fr = [fosfaat, gisting, zuurstof], vul = [0..1] per deel ----------
function SP8_stapel(ctx, x, y, w, h, fr, vul = [1, 1, 1], a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 10); shape(ctx, '#121A2A', '#3E4A62', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip(); let yy = y + h; const kl = [C.oker, C.oker, C.teal];
  // van onder naar boven: zuurstof, gisting, fosfaataccu
  [2, 1, 0].forEach(i => { const hh = h * fr[i] * ease(vul[i]); if (hh < 0.5) return; ctx.fillStyle = rgba(kl[i], 0.85); ctx.fillRect(x, yy - hh, w, hh); if (i === 1) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.strokeRect(x + 2.5, yy - hh + 2.5, w - 5, hh - 5); }
    if (i === 0) { ctx.strokeStyle = rgba('#0A0F18', 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); } yy -= hh; });
  ctx.restore(); ctx.restore(); }

// ---------- estafettestokje (doorgestreept) ----------
function SP8_stokje(ctx, x, y, a = 1, streep = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.35); roundRect(ctx, -70, -14, 140, 28, 14); shape(ctx, '#C9D2DC', '#8E9AAA', 2); ctx.fillStyle = '#8E9AAA'; ctx.fillRect(-30, -14, 6, 28); ctx.fillRect(24, -14, 6, 28); ctx.restore();
  if (streep > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 80, y + 60); ctx.lineTo(x - 80 + 160 * clamp(streep, 0, 1), y + 60 - 120 * clamp(streep, 0, 1)); ctx.stroke(); ctx.restore(); } }

// ---------- onder water (zijaanzicht), wl = waterlijn; scroll = verschuiving van de strepen ----------
function SP8_onderWater(ctx, wl, t, scroll = 0) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 0, W, wl);
  ctx.fillStyle = SP8.water; ctx.fillRect(0, wl, W, 870 - wl); ctx.fillStyle = SP8.waterD; ctx.fillRect(0, wl + (870 - wl) * 0.55, W, (870 - wl) * 0.45);
  ctx.strokeStyle = rgba('#9FD0EA', 0.13); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { const yy = wl + 40 + i * 52; for (let k = 0; k < 12; k++) { const xx = ((k * 230 - scroll * (0.6 + 0.1 * (i % 3)) + i * 90) % 2760 + 2760) % 2760 - 300; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 110, yy); ctx.stroke(); } }
  ctx.fillStyle = '#16222E'; ctx.fillRect(0, 852, W, 12);
  for (let x = -40; x < W + 40; x += 26) { const xx = ((x - scroll) % (W + 80) + W + 80) % (W + 80) - 40, k = Math.floor((x + 4000) / 26); circ(ctx, xx, wl - 2 + Math.sin(t * 1.6 + xx * 0.02) * 2, 9, k % 2 ? '#3D7FB3' : '#E8E4DA'); }
  ctx.strokeStyle = rgba('#BFE3F2', 0.7); ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) { const yy = wl + Math.sin((x + scroll) * 0.02 + t * 2.2) * 3; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke();
  ctx.restore(); }

// ---------- wand van het bad (zijaanzicht): water links van muur, kant rechts ----------
function SP8_wand(ctx, muur, wl, t) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#202E48'; ctx.fillRect(0, 0, W, wl);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(80 + i * 300, 110, 170, 90); }
  ctx.fillStyle = SP8.dek; ctx.fillRect(muur, wl - 26, W - muur, 26); ctx.fillStyle = SP8.dekL; ctx.fillRect(muur, wl - 26, W - muur, 5); ctx.fillStyle = '#1A2436'; ctx.fillRect(muur, wl, W - muur, 875 - wl);
  ctx.restore(); }
function SP8_waterWand(ctx, muur, wl, t) { ctx.save(); ctx.fillStyle = SP8.water; ctx.beginPath(); ctx.moveTo(0, 875); for (let x = 0; x <= muur; x += 12) ctx.lineTo(x, wl + Math.sin(x / 60 + t * 1.6) * 2.5); ctx.lineTo(muur, 875); ctx.closePath(); ctx.fill();
  ctx.fillStyle = SP8.waterD; ctx.fillRect(0, wl + (875 - wl) * 0.6, muur, (875 - wl) * 0.4);
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= muur; x += 12) { const yy = wl + Math.sin(x / 60 + t * 1.6) * 2.5; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke();
  for (let x = 20; x < muur - 30; x += 30) circ(ctx, x, wl - 3 + Math.sin(t * 1.6 + x * 0.02) * 2, 9, (Math.floor(x / 30) % 2) ? '#C9454A' : '#E8E2D4');
  ctx.fillStyle = '#9FAEB9'; ctx.fillRect(muur, wl - 26, 30, 875 - wl + 26); ctx.strokeStyle = '#C9D3DA'; ctx.lineWidth = 1.5; for (let y = wl; y < 875; y += 30) { ctx.beginPath(); ctx.moveTo(muur, y); ctx.lineTo(muur + 30, y); ctx.stroke(); }
  ctx.fillStyle = C.goud; ctx.fillRect(muur - 4, wl - 10, 4, 60); ctx.restore(); }
// de zwemmer hangt aan de kant (zijaanzicht, kijkt naar rechts naar de muur); geeft persoon-return terug
function SP8_hangen(ctx, muur, wl, t, o = {}) { const h = o.h || 470, hh = h * 1.04 / 6.1, adem = o.hijg ? Math.sin(t * 5.2) * 5 : Math.sin(t * 1.4) * 2, y = wl - 18 + h * 1.04 - hh * 1.42 + adem;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
  const r = persoon(ctx, 'sam', muur - hh * 1.25, y, h, { outfit: 'zwem', zij: true, kijk: 1, vrij: true, bril: 'muts', uit: o.uit || 'moe', t, arm: [2.2, 0.3], armVer: [0.3, 0.6], knik: o.knik || 0 }); ctx.restore();
  return r; }

// ---------- spiervezel in een zoomcirkel ----------
// (cx, cy) = midden, R = straal van de cirkel; o: kracht (0..1 hoe ver de draden schuiven), fosfaat, zuur (0..1 hoeveelheid), calcium (0..1),
// lactaat (0..1 deeltjes die naar het bloedvat drijven), bloedvat (0..1), snel (0..1 label), t
function SP8_vezel(ctx, cx, cy, R, o = {}) { const { kracht = 1, fosfaat = 0, zuur = 0, calcium = 0, lactaat = 0, bloedvat = 0, t = 0, vraag = 0 } = o;
  bg(ctx, 'micro'); const x0 = cx - R * 1.05, x1 = cx + R * 1.05, vh = R * 0.95, y0 = cy - vh / 2 - R * 0.12;
  // vezel
  roundRect(ctx, x0, y0, x1 - x0, vh, vh * 0.2); shape(ctx, SP8.vezel, SP8.vezelL, 3);
  // SR (calciumvoorraad) als buisje bovenin
  ctx.fillStyle = rgba(C.teal, 0.25); roundRect(ctx, x0 + 20, y0 + 14, x1 - x0 - 40, 26, 13); ctx.fill(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 2; ctx.stroke();
  // sarcomeer: dikke (myosine) en dunne (actine) draden; de dunne schuiven naar het midden bij een trekking
  const tr = (0.5 + 0.5 * Math.sin(t * 3.2)) * kracht, n = 3, sw = (x1 - x0 - 80) / n;
  ctx.save(); roundRect(ctx, x0, y0, x1 - x0, vh, vh * 0.2); ctx.clip();
  for (let s = 0; s < n; s++) { const sx = x0 + 40 + s * sw, mid = sx + sw / 2, zy = y0 + 60, zh = vh - 90;
    ctx.strokeStyle = rgba('#F2D8D0', 0.65); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, zy); ctx.lineTo(sx, zy + zh); ctx.moveTo(sx + sw, zy); ctx.lineTo(sx + sw, zy + zh); ctx.stroke(); // Z-lijnen
    for (let r = 0; r < 5; r++) { const yy = zy + 18 + r * (zh - 36) / 4;
      ctx.strokeStyle = '#E3B0A4'; ctx.lineWidth = 3; const L = sw * 0.32 + sw * 0.1 * tr; ctx.beginPath(); ctx.moveTo(sx, yy - 9); ctx.lineTo(sx + L, yy - 9); ctx.moveTo(sx + sw, yy - 9); ctx.lineTo(sx + sw - L, yy - 9); ctx.stroke();
      if (r < 4) { const yd = yy + (zh - 36) / 8; ctx.strokeStyle = '#C98A80'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mid - sw * 0.24, yd); ctx.lineTo(mid + sw * 0.24, yd); ctx.stroke(); ctx.lineCap = 'butt';
        ctx.strokeStyle = '#C98A80'; ctx.lineWidth = 3; for (let k = -3; k <= 3; k++) { if (k === 0) continue; const hx = mid + k * sw * 0.07; ctx.beginPath(); ctx.moveTo(hx, yd); ctx.lineTo(hx + Math.sign(k) * 6 * (0.4 + tr), yd - 9); ctx.moveTo(hx, yd); ctx.lineTo(hx + Math.sign(k) * 6 * (0.4 + tr), yd + 9); ctx.stroke(); } } } }
  // calcium uit het SR (wolkjes), fosfaat en H+
  const nc = Math.round(10 * calcium); for (let i = 0; i < nc; i++) { const px = x0 + 60 + hash(i * 5.1) * (x1 - x0 - 120), py = y0 + 54 + ((t * 25 + hash(i * 2.3) * 120) % 90); ctx.globalAlpha = 0.8; circ(ctx, px, py, 10 * calcium + 4, rgba(C.teal, 0.55)); circ(ctx, px + 9, py + 4, 7 * calcium + 3, rgba(C.teal, 0.55)); ctx.globalAlpha = 1; }
  const nf = Math.round(26 * fosfaat); for (let i = 0; i < nf; i++) { const px = x0 + 50 + hash(i * 3.7 + 1) * (x1 - x0 - 100) + Math.sin(t * 1.3 + i) * 5, py = y0 + 70 + hash(i * 9.1 + 2) * (vh - 110) + Math.cos(t * 1.1 + i) * 5; circ(ctx, px, py, 9, C.oker, '#F2E2B8', 1.5); }
  const nz = Math.round(22 * zuur); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < nz; i++) { const px = x0 + 50 + hash(i * 6.3 + 7) * (x1 - x0 - 100) + Math.sin(t * 1.7 + i) * 5, py = y0 + 70 + hash(i * 4.9 + 3) * (vh - 110); ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8); ctx.stroke(); }
  ctx.restore();
  // bloedvat onder de vezel, lactaat drijft erheen en wordt meegevoerd
  if (bloedvat > 0.01) SP8_laag(ctx, bloedvat, () => { const by = y0 + vh + 46; ctx.fillStyle = rgba(SP8.bloed, 0.9); roundRect(ctx, x0 - 40, by - 26, x1 - x0 + 80, 52, 26); ctx.fill();
    for (let k = 0; k < 7; k++) { const xx = x0 - 30 + ((k * 90 + t * 60) % (x1 - x0 + 60)); ctx.beginPath(); ctx.ellipse(xx, by, 12, 6, 0, 0, 6.283); ctx.fillStyle = SP8.bloedL; ctx.fill(); } });
  const nl = Math.round(12 * lactaat); for (let i = 0; i < nl; i++) { const u = ((t * 0.28 + hash(i * 1.9)) % 1), px = x0 + 70 + hash(i * 7.3) * (x1 - x0 - 140) + u * 80, py = lerp(y0 + vh * 0.55, y0 + vh + 46, ease(u * 1.4)); ctx.globalAlpha = Math.min(1, (1 - u) * 3); circ(ctx, px, py, 10, SP8.lac, '#FFF4CC', 2); ctx.globalAlpha = 1; }
  if (vraag > 0.01) SP8_laag(ctx, vraag, () => { [-1, 0, 1].forEach((k, i) => vraagteken(ctx, cx + k * R * 0.55, cy - R * 0.55 + (i === 1 ? -20 : 0) + Math.sin(t * 2 + i) * 6, 1, 90)); });
  return { y0, vh, x0, x1, by: y0 + vh + 46 }; }

// ---------- whiteboard ----------
function SP8_whiteboard(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A8496'; ctx.fillRect(x - 10, y - 10, w + 20, h + 20); roundRect(ctx, x, y, w, h, 6); shape(ctx, SP8.bord, '#C7CCD4', 2); ctx.fillStyle = '#7A8496'; ctx.fillRect(x + 20, y + h + 10, w - 40, 10); ctx.restore(); }
function SP8_schrijf(ctx, s2, x, y, px, kl, u, al = 'left') { if (u <= 0.001) return; ctx.save(); ctx.font = fTekst(px, 800); const w = ctx.measureText(s2).width, x0 = al === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 4, y - px * 1.2, w * clamp(u, 0, 1) + 8, px * 1.6); ctx.clip(); text(ctx, s2, x0, y, fTekst(px, 800), kl, 'left'); ctx.restore(); }

// ---------- batterij (fosfaataccu) ----------
// (x, y) = linksboven; w × h; u = vulling 0..1; o: grijs, vraag (0..1), streep (frac), lab
function SP8_batterij(ctx, x, y, w, h, u, o = {}) { const { a = 1, grijs = 0, vraag = 0, streep = null, lab = 'FOSFAATACCU', labKl = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const kl = SP8_hex(C.oker, SP8.grijs, grijs); roundRect(ctx, x, y, w, h, 14); shape(ctx, '#0F1626', kl, 4); ctx.fillStyle = kl; roundRect(ctx, x + w, y + h * 0.3, w * 0.06, h * 0.4, 4); ctx.fill();
  const fw = (w - 16) * clamp(u, 0, 1); if (fw > 1) { roundRect(ctx, x + 8, y + 8, fw, h - 16, 8); ctx.fillStyle = rgba(kl, 0.85); ctx.fill(); }
  for (let k = 1; k < 5; k++) { ctx.strokeStyle = rgba('#F2F2EE', 0.15); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 8 + (w - 16) * k / 5, y + 10); ctx.lineTo(x + 8 + (w - 16) * k / 5, y + h - 10); ctx.stroke(); }
  if (streep != null) { const sx = x + 8 + (w - 16) * streep; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(sx, y - 14); ctx.lineTo(sx, y + h + 14); ctx.stroke(); ctx.setLineDash([]); }
  if (vraag > 0.01) SP8_laag(ctx, vraag, () => vraagteken(ctx, x + w * 0.3, y + h * 0.75, 1, Math.round(h * 0.9)));
  if (lab) metaText(ctx, lab, x + w / 2, y - 22, labKl || kl, 'center', 28);
  ctx.restore(); }

// ---------- stopwatch, lactaatmeter, klembord ----------
function SP8_stopwatch(ctx, x, y, r, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#AFC0D0'; ctx.fillRect(x - r * 0.15, y - r * 1.32, r * 0.3, r * 0.26);
  circ(ctx, x, y, r, '#E8ECF0', '#8FA0B5', 4); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.8, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(u % 1.0001, 0, 1)); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.45); ctx.fill();
  const an = -Math.PI / 2 + 6.283 * u; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); ctx.stroke(); circ(ctx, x, y, 6, '#1A2740'); ctx.restore(); }
function SP8_lactaatMeter(ctx, x, y, s, waarde, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -100, 120, 200, 22); shape(ctx, '#3A4458', '#6A768C', 3); roundRect(ctx, -44, -76, 88, 70, 8); shape(ctx, '#B8D8A8', '#2A3446', 2);
  if (waarde) text(ctx, waarde, 0, -28, fMeta(waarde.length > 3 ? 30 : 40), '#1A2A1A', 'center');
  circ(ctx, -22, 40, 13, '#5A6478', '#8FA0B5', 2); circ(ctx, 22, 40, 13, '#5A6478', '#8FA0B5', 2); ctx.fillStyle = '#E8E4DA'; ctx.fillRect(-10, -146, 20, 46); ctx.restore(); }
// klembord met splittijden; kol = [{kop, tijden[4], totaal, a:[4], totA, kl:[4]}]; o.vb = label VOORBEELD
function SP8_klembord(ctx, x, y, w, h, kol, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 16); shape(ctx, '#8A6A48', '#6E5236', 3); roundRect(ctx, x + 18, y + 28, w - 36, h - 46, 8); shape(ctx, '#F2F2EE', '#C7CCD4', 2);
  roundRect(ctx, x + w / 2 - 70, y - 12, 140, 40, 8); shape(ctx, '#AFC0D0', '#7A8496', 2);
  const rx = x + 50, ry = y + 100, rh = (h - 210) / 4;
  metaText(ctx, 'M', rx, ry, '#56627E', 'left', 26);
  for (let i = 0; i < 4; i++) metaText(ctx, String((i + 1) * 50), rx, ry + 30 + (i + 0.6) * rh, '#56627E', 'left', 28);
  metaText(ctx, 'TOTAAL', rx, ry + 30 + 4 * rh + 40, '#56627E', 'left', 26);
  ctx.strokeStyle = '#C7CCD4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 36, ry + 30 + 4 * rh + 6); ctx.lineTo(x + w - 36, ry + 30 + 4 * rh + 6); ctx.stroke();
  kol.forEach((k, j) => { const cx = x + w * (0.48 + j * 0.3); if ((k.kopA == null ? 1 : k.kopA) > 0.01) SP8_laag(ctx, k.kopA == null ? 1 : k.kopA, () => metaText(ctx, k.kop, cx, ry, '#56627E', 'center', 28));
    k.tijden.forEach((s2, i) => { const aa = (k.a || [])[i] || 0; if (aa <= 0.01 || !s2) return; SP8_laag(ctx, aa, () => text(ctx, s2, cx, ry + 30 + (i + 0.6) * rh + 14, fMeta(44), (k.kl && k.kl[i]) || SP8.inkt, 'center')); });
    if (k.totaal && (k.totA || 0) > 0.01) SP8_laag(ctx, k.totA, () => text(ctx, k.totaal, cx, ry + 30 + 4 * rh + 44, fMeta(46), k.totKl || SP8.inkt, 'center')); });
  ctx.restore(); if (o.vb !== false) SP8_meta(ctx, 'VOORBEELD', x + w, y + h + 40, a, C.grain, 'right'); }
// snelheidslint: 4 stukken van de race (kleur per split), hoogte = snelheid
function SP8_lint(ctx, x, y, w, splits, a = 1, o = {}) { if (a <= 0.01 || !splits) return; const { lab = '', vul = 1, kleur = true } = o; ctx.save(); ctx.globalAlpha *= a;
  const dx = w / 4; if (lab) metaText(ctx, lab, x - 24, y + 10, C.text2, 'right', 28);
  splits.forEach((s, i) => { const u = clamp(vul * 4 - i, 0, 1); if (u <= 0.01) return; const v = 50 / s, hgt = Math.max(16, (v - 1.5) * 250 + 10), kl = kleur ? SP8_hex(C.goud, C.koraal, clamp((s - 29.5) / 2.5, 0, 1)) : '#6E7890';
    roundRect(ctx, x + i * dx + 4, y - hgt / 2, (dx - 8) * u, hgt, 8); ctx.fillStyle = rgba(kl, 0.85); ctx.fill(); });
  ctx.restore(); }

// ---------- klok (digitaal) ----------
function SP8_klokKaart(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 520, 150, 14); shape(ctx, '#0B0F16', '#4A5568', 3);
  metaText(ctx, 'SERIE', x + 40, y + 60, C.text2, 'left', 28); text(ctx, '10:05', x + 40, y + 122, fMeta(52), '#F2B84A', 'left');
  metaText(ctx, 'FINALE', x + 290, y + 60, C.text2, 'left', 28); text(ctx, '17:30', x + 290, y + 122, fMeta(52), '#F2B84A', 'left'); ctx.restore(); }

// ---------- uitzwembad (zijaanzicht), met bank ----------
function SP8_uitzwembad(ctx, t, o = {}) { const { vloer = 700, x0 = 470, x1 = 960 } = o; ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(60, 160, 960, vloer - 160);
  ctx.fillStyle = SP8.dek; ctx.fillRect(60, vloer, x0 - 60, 18); ctx.fillStyle = SP8.dekL; ctx.fillRect(60, vloer, x0 - 60, 4); ctx.fillStyle = '#1A2436'; ctx.fillRect(60, vloer + 18, x0 - 60, 860 - vloer - 18);
  ctx.fillStyle = SP8.water; ctx.fillRect(x0, vloer + 10, x1 - x0, 860 - vloer - 10); ctx.fillStyle = SP8.waterD; ctx.fillRect(x0, vloer + 90, x1 - x0, 860 - vloer - 90);
  ctx.strokeStyle = SP8.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= x1; x += 10) { const yy = vloer + 10 + Math.sin(x / 40 + t * 1.6) * 2.5; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
  ctx.fillStyle = SP8.tegel; ctx.fillRect(x1, vloer, 60, 860 - vloer); ctx.fillStyle = '#9FAEB9'; ctx.fillRect(x0 - 8, vloer, 8, 860 - vloer);
  ctx.restore(); }
function SP8_bank(ctx, x, w, zitY, vloer) { ctx.save(); ctx.fillStyle = '#7A6248'; roundRect(ctx, x, zitY - 6, w, 22, 6); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(x + 20, zitY + 14, 14, vloer - zitY - 14); ctx.fillRect(x + w - 34, zitY + 14, 14, vloer - zitY - 14); ctx.restore(); }
// handdoek om de schouders (vooraanzicht); r = return van persoon()
function SP8_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + s * hh * 0.9, sy - hh * 0.2, x + s * hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + s * hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + s * hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + s * hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + s * hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + s * hh * 0.95, sy + hh * 0.7, x + s * hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.strokeStyle = C.teal; ctx.lineWidth = hh * 0.08; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 0.24, sy + hh * 1.5); ctx.lineTo(x + s * hh * 0.6, sy + hh * 1.55); ctx.stroke(); }
  ctx.restore(); }

// ---------- proefopzet uitzwemmen ----------
// (x, y) = linksboven, w 800; o: tijden (0..1 per kolom), hl (0..1 per kolom), lijn (0..1)
const SP8_PROEF = [['STIL', '65,9', ''], ['5 MIN', '64,5', 'RUSTIG'], ['10 MIN', '65,5', 'RUSTIG']];
function SP8_proef(ctx, x, y, o = {}) { const { a = 1, tijden = [0, 0, 0], hl = [0, 0, 0], lijn = 0, w = 800 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  SP8_kaart(ctx, x, y, w, 520, 1, C.line);
  // tijdbalk 100 m · 15 min · 100 m
  const ty = y + 80; roundRect(ctx, x + 40, ty - 22, 150, 44, 10); shape(ctx, rgba(C.goud, 0.8), null); text(ctx, '100 M', x + 115, ty + 11, fMeta(30), '#121A26', 'center');
  roundRect(ctx, x + w - 190, ty - 22, 150, 44, 10); shape(ctx, rgba(C.goud, 0.8), null); text(ctx, '100 M', x + w - 115, ty + 11, fMeta(30), '#121A26', 'center');
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x + 200, ty); ctx.lineTo(x + w - 200, ty); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, '15 MIN PAUZE', x + w / 2, ty - 18, C.text2, 'center', 28);
  const cw = (w - 80) / 3; SP8_PROEF.forEach(([lab, tijd, lab2], i) => { const cx = x + 40 + cw * (i + 0.5), cy = y + 170;
    if (hl[i] > 0.01) SP8_laag(ctx, hl[i], () => { roundRect(ctx, cx - cw / 2 + 8, cy - 56, cw - 16, 280, 14); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.stroke(); });
    metaText(ctx, lab, cx, cy - (lab2 ? 16 : 0), i === 0 ? C.text2 : C.teal, 'center', 28); if (lab2) metaText(ctx, lab2, cx, cy + 16, C.teal, 'center', 28);
    // pictogram: bank of golfjes
    if (i === 0) { ctx.fillStyle = '#7A6248'; roundRect(ctx, cx - 50, cy + 50, 100, 14, 5); ctx.fill(); ctx.fillStyle = '#5A4834'; ctx.fillRect(cx - 40, cy + 64, 10, 30); ctx.fillRect(cx + 30, cy + 64, 10, 30); }
    else { ctx.strokeStyle = C.teal; ctx.lineWidth = 4; for (const dy of [0, 22]) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = cx - 50 + k * 5, yy = cy + 60 + dy + 6 * Math.sin(k * 0.6); k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } }
    roundRect(ctx, cx - 95, cy + 130, 190, 80, 12); shape(ctx, '#0B0F16', '#3E4A62', 2);
    if (tijden[i] > 0.01) SP8_laag(ctx, tijden[i], () => text(ctx, tijd + ' S', cx, cy + 186, fMeta(44), i === 1 ? C.groen : '#F2B84A', 'center')); });
  // lactaat tijdens de pauze: twee lijnen (stil daalt trager)
  if (lijn > 0.01) SP8_laag(ctx, lijn, () => { const gx = x + 60, gy = y + 495, gw = w - 120, gh = 60; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh - 10); ctx.lineTo(gx, gy + 6); ctx.lineTo(gx + gw, gy + 6); ctx.stroke();
    metaText(ctx, 'LACTAAT IN DE PAUZE', gx + 10, gy - gh - 14, C.text2, 'left', 24);
    const pad = (k, kl, lab) => { ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40 * clamp(lijn * 1.2, 0, 1), xx = gx + u * gw, yy = gy - gh * Math.exp(-u * k); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); };
    pad(0.6, C.text2); pad(2.2, C.teal); metaText(ctx, 'STIL', gx + gw - 6, gy - gh * Math.exp(-0.6) - 12, C.text2, 'right', 26); metaText(ctx, 'RUSTIG ZWEMMEN', gx + gw * 0.42, gy - 4, C.teal, 'left', 26); });
  ctx.restore(); }

// ---------- snelheidsprofiel per afstand ----------
// (x, y) = linksboven van het vak, w × h; soort '100'|'200'|'400'|'800'|'1500'; u = tekenvoortgang 0..1; piek = 0..1 eindsprint oplichten
function SP8_profiel(ctx, x, y, w, h, soort, u, o = {}) { const { a = 1, piek = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = { '100': 2, '200': 4, '400': 8, '800': 16, '1500': 30 }[soort];
  const v = (i) => { if (soort === '100') return [0.95, 0.45][i]; if (soort === '200' || soort === '400') return i === 0 ? 0.92 : 0.5 + (soort === '400' && i === n - 1 ? 0.04 : 0); return i === n - 1 ? 0.82 : 0.46 + 0.02 * Math.sin(i * 1.7); };
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  const bw = w / n, m = Math.floor(n * clamp(u, 0, 1) + 0.0001);
  for (let i = 0; i < n; i++) { const fr = clamp(n * u - i, 0, 1); if (fr <= 0.01) continue; const hv = v(i) * h * ease(fr), eind = (soort === '800' || soort === '1500') && i === n - 1;
    roundRect(ctx, x + i * bw + Math.min(3, bw * 0.15), y + h - hv, Math.max(2, bw - Math.min(6, bw * 0.3)), hv, Math.min(6, bw * 0.3)); ctx.fillStyle = eind ? SP8_mix(C.teal, C.goud, 0.4 + 0.6 * piek) : rgba(C.teal, 0.8); ctx.fill(); }
  ctx.restore(); }

// ---------- figuurtje voor een groep (silhouet, castpersonage ingekleurd) ----------
let SP8_off = null;
function SP8_sil(ctx, kleur, fn) { if (!SP8_off) { SP8_off = document.createElement('canvas'); SP8_off.width = W; SP8_off.height = H; } const o = SP8_off.getContext('2d');
  o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = 1; o.globalCompositeOperation = 'source-over'; o.clearRect(0, 0, W, H); fn(o);
  o.globalCompositeOperation = 'source-in'; o.fillStyle = kleur; o.fillRect(0, 0, W, H); o.globalCompositeOperation = 'source-over'; ctx.drawImage(SP8_off, 0, 0); }

// ---------- beroepkaartje met pictogram ----------
function SP8_beroep(ctx, x, y, w, naam, sub, icoon, a = 1, kl = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(60 * (1 - ease(a)), 0);
  SP8_kaart(ctx, x, y, w, 120, 1, kl); const ix = x + 70, iy = y + 60;
  if (icoon === 'stopwatch') SP8_stopwatch(ctx, ix, iy + 6, 34, 0.3, 1);
  else if (icoon === 'meter') SP8_lactaatMeter(ctx, ix, iy + 14, 0.38, '', 1);
  else if (icoon === 'grafiek') { ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.strokeRect(ix - 40, iy - 32, 80, 64); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ix - 32, iy + 18); ctx.lineTo(ix - 12, iy - 2); ctx.lineTo(ix + 6, iy + 6); ctx.lineTo(ix + 32, iy - 22); ctx.stroke(); }
  else if (icoon === 'boek') { ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(ix, iy - 24); ctx.lineTo(ix - 44, iy - 32); ctx.lineTo(ix - 44, iy + 26); ctx.lineTo(ix, iy + 34); ctx.lineTo(ix + 44, iy + 26); ctx.lineTo(ix + 44, iy - 32); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ix, iy - 24); ctx.lineTo(ix, iy + 34); ctx.stroke(); }
  text(ctx, naam, x + 140, y + (sub ? 56 : 72), fTekst(40, 800), C.text, 'left'); if (sub) metaText(ctx, sub, x + 140, y + 96, C.grain, 'left', 26);
  ctx.restore(); }
// Wat word jij? · Sport en topsport 8 · Energiesystemen in het zwembad — scènes per alinea (v1.0, 20 nov 2026).
// Look: Schema met cast. De zwemmer (Sam, outfit 'zwem'), de zwemtrainer ('zwemtrainer'); geen namen in beeld.
// Vast beeld: mengpaneel met drie schuifjes (fosfaataccu oker, gisting oker met koraal rand, zuurstof teal).

// wereld-x van de heup tijdens de duik (zelfde formule als SP8_duik)
function SP8_duikX(tD) { if (tD <= 0) return SP8_BLOK.x; if (tD < 0.9) return 330 + 470 * clamp(tD / 0.9, 0, 1); if (tD < 1.7) return 800 + 260 * (tD - 0.9) / 0.8; return 1060 + 200 * (tD - 1.7); }
// mengpaneel tijdens de 200 m: p = afgelegde meters
function SP8_mixRace(p) { return [SP8_pl(p, [[0, 0.92], [12, 0.75], [50, 0.25], [100, 0.12], [200, 0.1]]), SP8_pl(p, [[0, 0.4], [50, 0.3], [100, 0.22], [150, 0.3], [200, 0.62]]), SP8_pl(p, [[0, 0.2], [25, 0.6], [50, 0.85], [100, 0.9], [200, 0.86]])]; }
const SP8_FR = [[0.41, 0.14, 0.45], [0.12, 0.15, 0.73], [0.07, 0.10, 0.83], [0.07, 0.28, 0.65]];
const SP8_SERIE = [27.9, 30.9, 31.7, 32.2], SP8_FINALE = [28.9, 30.6, 30.9, 30.8];
// wand-decor met trainer (s07, s09, s17): muur, waterlijn
function SP8_kantScene(ctx, t, q, o = {}) { const muur = o.muur || 1640, wl = o.wl || 560; SP8_wand(ctx, muur, wl, t);
  const tr = o.trainer === false ? null : persoon(ctx, 'zwemtrainer', o.tx || 1770, wl - 26, o.th || 400, { t, kijk: -1, uit: o.tuit || 'neutraal' });
  const r = SP8_hangen(ctx, muur, wl, t, { hijg: o.hijg, uit: o.uit, h: o.h || 470 }); SP8_waterWand(ctx, muur, wl, t); return { r, tr, muur, wl }; }
function SP8_schouder(r) { return r && r.handR && r.handR.shx != null ? { x: r.handR.shx, y: r.handR.shy } : (r && r.hoofd ? { x: r.hoofd.x - 20, y: r.hoofd.y + r.hoofd.r * 2 } : { x: 1500, y: 560 }); }

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); ctx.beginPath(); ctx.rect(1060, 0, 860, 875); ctx.clip(); const B = SP8_bad(ctx, 1100, 450, 1000, 380, 6, { t, blokken: false });
    const L = 64, u = (t * 0.12) % 1; SP8_spoor(ctx, 1100, 1100 + u * 1000, B.y(2) + 14, C.teal, 0.6, 10); SP8_boven(ctx, 1100 + u * 1000, B.y(2), L, t, { kijk: 1 });
    for (let i = 0; i < 4; i++) { const rr = ((t * 60 + i * 80) % 320); ctx.strokeStyle = rgba(C.teal, 0.5 * (1 - rr / 320)); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1500, B.y(4), rr, rr * 0.35, 0, 0, 6.283); ctx.stroke(); }
    ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = SP8_bad(ctx, 140, 230, 1360, 544, 8, { t, hl: 3 }), y = B.y(3), x0 = B.x0 + 30, x1 = B.x1 - 34, L = 54;
    const tB = q.at('vijftienhonderd') - 0.4, fase2 = t >= tB, P = q.on('Zelfde', 1, 0.5);
    if (!fase2) { const ts = q.at('gaat'), te = q.at('tikt') + 0.2, u = clamp((t - ts) / (te - ts), 0, 1);
      SP8_scorebord(ctx, 1560, 240, 300, 170, '50 M VRIJ', t < ts ? '0,0' : (u < 1 ? (25.4 * u).toFixed(1).replace('.', ',') : '25,4'), 1);
      SP8_spoor(ctx, x0, lerp(x0, x1, ease(u)), y, C.goud, 1, 14); SP8_boven(ctx, lerp(x0, x1, u < 1 ? u : 1), y, L, t * 1.5, { kijk: 1, stil: t < ts || u >= 1 });
      if (u >= 1) { laagTik(ctx, q, x1, y); }
      return; }
    // 1500 m: zelfde start, na twee baantjes koraal en trager
    const t0 = q.at('vijftienhonderd'), k1 = t0 + 1.0, k2 = k1 + 1.0, kap = q.at('kapot');
    SP8_scorebord(ctx, 1560, 240, 300, 170, '1500 M VRIJ', '', 1);
    let x, kijk = 1; if (t < t0) x = x0; else if (t < k1) x = lerp(x0, x1, (t - t0) / 1.0); else if (t < k2) { x = lerp(x1, x0, (t - k1) / 1.0); kijk = -1; } else { x = lerp(x0, x1, clamp((t - k2) / 9, 0, 1)); }
    const kl = SP8_hex(C.goud, C.koraal, q.on('kapot', 1, 0.8));
    if (t > t0) SP8_spoor(ctx, x0, t < k1 ? x : x1, y - 16, C.goud, 1, 10);
    if (t > k1) SP8_spoor(ctx, x1, t < k2 ? x : x0, y, C.goud, 1, 10);
    if (t > k2) SP8_spoor(ctx, x0, x, y + 16, kl, 1, 10);
    SP8_boven(ctx, x, y, L, t * (t > k2 ? 0.6 : 1.5), { kijk, stil: t < t0 });
    laag2(ctx, P, () => { SP8_kaart(ctx, 420, 390, 800, 230, 1, C.goud); text(ctx, '50 M · 1500 M', 820, 480, fTitel(64), C.text, 'center'); text(ctx, 'zelfde slag?', 820, 556, fTekst(48, 700), C.goud, 'center'); });
    SP8_meta(ctx, 'WAT DENK JE?', 820, 660, q.on('Wat', 1, 0.4), C.goud, 'center'); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const Y = 660; SP8_doorsnede(ctx, t, Y); SP8_duik(ctx, t, -1, Y);
    SP8_scorebord(ctx, 560, 190, 440, 150, 'SERIE', '200 M VRIJ', 1);
    const hl = [SP8_fase(t, q.at('fosfaataccu') - 0.1, q.at('fosfaataccu') + 1.3), SP8_fase(t, q.at('gisting') - 0.1, q.at('gisting') + 1.1), SP8_fase(t, q.at('zuurstof') - 0.1, q.at('zuurstof') + 1.4)];
    SP8_paneel(ctx, 1040, 190, 0.85, [0, 0, 0], { hl, grijs: q.on('Welke', 1, 0.5) });
    laag2(ctx, q.on('mitochondri', 1, 0.5) * (1 - q.on('Volg', 1, 0.4)), () => { const pz = [1040 + 0.85 * 710, 190 + 0.85 * 420 + 60]; mitochondrion(ctx, pz[0], pz[1], 110, 0, 1, 5, t); }); },

  s05(ctx, t, q) { const Y = 660, tS = q.at('Alle'), tD = t - tS, hx = SP8_duikX(tD), off = Math.max(0, hx - 1000);
    SP8_doorsnede(ctx, t, Y, { off }); SP8_duik(ctx, t, tD, Y, off);
    const p = SP8_pl(t, [[tS, 0], [q.at('start'), 8], [q.at('snel'), 45], [q.at('kwam'), 50], [q.at('middelste'), 55], [q.at('driekwart'), 120], [q.at('zuurstof', 2), 150], [q.at('laatste'), 152], [q.at('kwart', 2), 200]]);
    const open = ramp(t, tS, 0.6), v = SP8_mixRace(p).map(x => x * open);
    SP8_antw(ctx, 'Antwoord c', 1);
    SP8_paneel(ctx, 1040, 180, 0.85, v, { grijs: 1 - ramp(t, tS, 0.5), hl: [SP8_fase(t, q.at('fosfaataccu') - 0.1, q.at('meest') + 0.8), SP8_fase(t, q.at('gisting'), q.at('kwart', 2) + 0.8), SP8_fase(t, q.at('aerobe'), q.at('snel') + 0.6)], rand: SP8_fase(t, q.at('mengpaneel') - 0.1, q.at('race') + 1.2, 0.4) });
    if (tD > 1.0) SP8_meta(ctx, Math.min(200, Math.round(p / 5) * 5) + ' M', 1820, 840, 1, '#DDF0F8', 'right', 30);
    // gestapelde balken per 50 m
    const B = q.on('Over', 1, 0.5); laag2(ctx, B, () => { SP8_meta(ctx, 'GESCHAT · ÉÉN ONDERZOEK', 120, 220, 1, C.grain); SP8_meta(ctx, 'GOED GETRAINDE ZWEMMERS', 120, 256, 1, C.grain);
      const vul = [[q.on('fosfaataccu', 2, 0.6), q.on('bijna', 1, 0.6), q.on('zuurstof', 1, 0.6)], [q.on('middelste', 1, 0.8), q.on('middelste', 1, 0.8), q.on('middelste', 1, 0.8)], [q.on('driekwart', 1, 0.8), q.on('driekwart', 1, 0.8), q.on('driekwart', 1, 0.8)], [q.on('laatste', 1, 0.6), q.on('springt', 1, 0.6), q.on('laatste', 1, 0.6)]];
      ['0–50', '50–100', '100–150', '150–200'].forEach((lab, i) => { const x = 140 + i * 190; SP8_stapel(ctx, x, 285, 140, 240, SP8_FR[i], vul[i], 1); metaText(ctx, lab, x + 70, 565, C.text2, 'center', 26); });
      SP8_meta(ctx, 'FIGUEIREDO E.A. 2011 · HELLARD E.A. 2018', 120, 612, 1, C.grain, 'left', 24); });
    const E = q.on('estafette', 1, 0.4); SP8_stokje(ctx, 955, 430, E * (1 - q.on('schuifjes', 1, 0.5)), q.on('estafette', 1, 0.6) > 0 ? ramp(t, q.at('estafette') + 0.3, 0.5) : 0); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const R = [['50', 0.3, 'Bij', 2, ''], ['100', 0.5, '100', 1, '± 1/2'], ['200', 0.67, '200', 1, '± 2/3'], ['400', 0.82, '400', 1, '± 4/5 OF MEER'], ['800', 0.88, '1500', 1, ''], ['1500', 0.92, '1500', 1, 'NOG MEER']];
    circ(ctx, 360, 182, 12, C.teal); metaText(ctx, 'ZUURSTOF', 384, 192, C.teal, 'left', 28); circ(ctx, 650, 182, 12, C.oker); metaText(ctx, 'FOSFAATACCU EN GISTING', 674, 192, C.oker, 'left', 28);
    R.forEach(([d, fr, w, n, lab], i) => { const y = 240 + i * 88, x = 340, bw = 1060, u = i === 4 ? ramp(t, q.at('1500') - 0.6, 0.7) : q.on(w, n, 0.8);
      text(ctx, d + ' m', x - 30, y + 40, fTekst(40, 800), u > 0.5 ? C.text : C.text2, 'right'); roundRect(ctx, x, y, bw, 52, 12); shape(ctx, '#121A2A', '#3E4A62', 2);
      if (u > 0.01) { ctx.save(); roundRect(ctx, x, y, bw, 52, 12); ctx.clip(); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fillRect(x + bw * fr * ease(u), y, bw * (1 - fr) * ease(u), 52); ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(x, y, bw * fr * ease(u), 52); ctx.restore(); }
      if (lab) SP8_meta(ctx, lab, x + bw + 30, y + 38, u, C.teal, 'left', 28); });
    ctx.strokeStyle = rgba('#F2F2EE', 0.35); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(340 + 530, 225); ctx.lineTo(340 + 530, 770); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'HELFT', 870, 800, C.text2, 'center', 24);
    SP8_meta(ctx, 'SCHATTINGEN VERSCHILLEN PER ONDERZOEK', 120, 840, 1, C.grain, 'left', 26); SP8_meta(ctx, 'ALMEIDA E.A. 2020 · IJSM 2020', 1800, 840, 1, C.grain, 'right', 26); },

  // ---------- H2 ----------
  s07(ctx, t, q) { const tK = q.at('Aan') - 0.2;
    if (t < tK) { const wl = 300, L = 430; SP8_onderWater(ctx, wl, t, t * 160); const r = zwemmer(ctx, 'sam', 900, wl + 0.12 * L, L, { slag: 'crawl', t, tempo: 0.8, kijk: 1 });
      const g = 0.35 + 0.15 * Math.sin(t * 4); for (const pt of [r.handR, r.handL, r.schouder]) if (pt) { const gr = ctx.createRadialGradient(pt.x, pt.y, 4, pt.x, pt.y, 90); gr.addColorStop(0, rgba(C.koraal, g)); gr.addColorStop(1, rgba(C.koraal, 0)); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(pt.x, pt.y, 90, 0, 6.283); ctx.fill(); }
      tag(ctx, '175 M', 200, 210, C.koraal, 1, 'center', 34);
      const S = q.on('slagen', 1, 0.5); SP8_kaartje(ctx, 1300, 150, 520, [['SLAGEN PER 50 M', 'meta', C.grain], ['34 · 36 · 37 · 39', 'groot', C.text]], S, C.line); SP8_meta(ctx, 'VOORBEELD', 1820, 330, S, C.grain, 'right', 26);
      return; }
    const K = SP8_kantScene(ctx, t, q, { hijg: true, tuit: t > q.at('Weet') && t < q.at('zwemtrainer') + 0.5 ? 'praat' : 'neutraal' });
    bubbel(ctx, 1430, 400, 'Verzuurd!', '#F2F2EE', q.on('verzuurd', 1, 0.3), 34); bubbel(ctx, 1620, 140, 'Zeker weten?', '#F2F2EE', q.on('Weet', 1, 0.3), 34);
    const Z = q.on('Wat', 1, 0.5), sc = SP8_schouder(K.r); zoomCircle(ctx, 560, 470, 330, sc.x, sc.y, '', Z, () => SP8_vezel(ctx, 560, 470, 330, { t, kracht: 1, vraag: q.on('Wat', 2, 0.5) })); },

  s09(ctx, t, q) { const K = SP8_kantScene(ctx, t, q, { hijg: true }); SP8_antw(ctx, 'Antwoord a', 1); const sc = SP8_schouder(K.r);
    const fo = ramp(t, q.at('fosfaat'), 3), zu = ramp(t, q.at('zuur'), 2), kr = 1 - 0.65 * q.on('minder', 1, 1.5), ca = 1 - 0.7 * q.on('calcium', 1, 1.5), bv = q.on('Na', 1, 0.6), la = q.on('lactaat', 1, 1.0);
    zoomCircle(ctx, 560, 470, 330, sc.x, sc.y, '', 1, () => { SP8_vezel(ctx, 560, 470, 330, { t, kracht: kr, fosfaat: fo, zuur: zu, calcium: ca, bloedvat: bv, lactaat: la }); SP8_meta(ctx, 'SNELLE VEZEL', 560, 236, q.on('snelle', 1, 0.5), C.text, 'center', 28); });
    // legenda rechts van de cirkel
    const leg = (y, a, teken, lab, kl) => SP8_laag(ctx, a, () => { teken(980, y - 10); metaText(ctx, lab, 1010, y, kl, 'left', 28); });
    leg(200, q.on('fosfaat', 1, 0.4), (x, y) => circ(ctx, x, y, 10, C.oker, '#F2E2B8', 1.5), 'FOSFAAT', C.oker);
    leg(245, q.on('zuur', 1, 0.4), (x, y) => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.lineTo(x + 9, y); ctx.moveTo(x, y - 9); ctx.lineTo(x, y + 9); ctx.stroke(); }, 'H⁺ (ZUUR)', C.koraal);
    leg(290, q.on('calcium', 1, 0.4), (x, y) => circ(ctx, x, y, 11, rgba(C.teal, 0.7)), 'CALCIUM', C.teal);
    leg(335, q.on('lactaat', 1, 0.4), (x, y) => circ(ctx, x, y, 10, SP8.lac, '#FFF4CC', 2), 'LACTAAT', SP8.lac);
    SP8_laag(ctx, q.on('lactaat', 1, 0.5), () => { SP8_lactaatMeter(ctx, 1020, 470, 0.55, 'HOOG', 1); SP8_meta(ctx, 'NA DE RACE', 1080, 438, 1, C.text2, 'left', 26); });
    SP8_meta(ctx, 'TEKEN VAN GISTING', 1080, 478, q.on('teken', 1, 0.4), SP8.lac, 'left', 26); SP8_meta(ctx, 'ZELF WEINIG EFFECT', 1080, 518, q.on('weinig', 1, 0.4), SP8.lac, 'left', 26);
    const O = q.on('onderzoekers', 1, 0.5); SP8_kaartje(ctx, 960, 690, 470, [['ONDERZOEK NOG NIET AF', 'meta', C.koraal]], O, C.koraal);
    const V = q.on('verzuurd', 1, 0.3); laag2(ctx, V, () => { bubbel(ctx, 1430, 400, 'Verzuurd', '#F2F2EE', 1, 34); SP8_doorstreep(ctx, 1360, 386, 140, ramp(t, q.at('half') - 0.4, 0.5) * 0.55, C.koraal, 6); });
    SP8_meta(ctx, 'ALLEN E.A. 2008 · EUR J APPL PHYSIOL 2025', 120, 850, 1, C.grain, 'left', 24); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); SP8_uitzwembad(ctx, t); naamBij(ctx, 'uitzwembad', '', 715, 790, 1, 'center', C.text);
    SP8_bank(ctx, 150, 240, 610, 700); const r = persoon(ctx, 'sam', 270, 700, 380, { outfit: 'zwem', pose: 'zit', zitHoogte: 90, uit: 'neutraal', t }); SP8_handdoek(ctx, r, 1);
    SP8_klokKaart(ctx, 120, 180, 1);
    SP8_proef(ctx, 1060, 200, { a: q.on('Onderzoekers', 1, 0.5) }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP8_uitzwembad(ctx, t); SP8_antw(ctx, 'Antwoord a', 1);
    const tz0 = q.at('uitzwemmen') - 0.4, tz1 = q.at('bewijs') - 0.2, zwemt = t > tz0 && t < tz1;
    SP8_bank(ctx, 150, 240, 610, 700);
    if (zwemt) { const L = 240, wl = 710, per = 7, u = ((t - tz0) % (2 * per)) / per, heen = u < 1, x = heen ? lerp(560, 880, u) : lerp(880, 560, u - 1);
      ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(heen ? 540 : 900, wl + 4); ctx.lineTo(x, wl + 4); ctx.stroke(); ctx.restore();
      zwemmer(ctx, 'sam', x, wl + 0.07 * L, L, { slag: 'rug', t, tempo: 0.7, kijk: heen ? 1 : -1 }); SP8_meta(ctx, 'RUSTIG', 715, 640, 1, C.teal, 'center', 28); }
    else { const r = persoon(ctx, 'sam', 270, 700, 380, { outfit: 'zwem', pose: 'zit', zitHoogte: 90, uit: 'neutraal', t }); SP8_handdoek(ctx, r, 1); }
    SP8_proef(ctx, 1060, 200, { tijden: [q.on('stilzitten', 1, 0.4), q.on('sneller', 1, 0.4), q.on('Tien', 1, 0.4)], hl: [0, q.on('sneller', 1, 0.5) * (1 - q.on('Tien', 1, 0.4) * 0.5), 0], lijn: q.on('lactaat', 1, 1.2) });
    SP8_meta(ctx, 'ÉÉN ONDERZOEK · 11 ZWEMMERS', 1060, 770, q.on('één', 1, 0.4), C.grain, 'left', 28); SP8_meta(ctx, 'TOUBEKIS E.A. 2008 (IJSPP)', 1060, 810, q.on('één', 1, 0.4), C.grain, 'left', 24);
    SP8_kaartje(ctx, 120, 200, 560, [['200 M: GEEN VERSCHIL', 'tekst', C.text], ['PRATAMA & YIMLAMAI 2020', 'meta', C.grain]], q.on('200', 1, 0.5), C.line);
    SP8_meta(ctx, 'HET BEWIJS IS GEMENGD', 1460, 160, q.on('gemengd', 1, 0.5), C.goud, 'center', 32); },

  // ---------- H4 ----------
  s13(ctx, t, q) { SP8_finaleScene(ctx, t, q, 'serie'); },
  s15(ctx, t, q) { SP8_finaleScene(ctx, t, q, 'finale'); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const RJ = [['100', 'Bij', 1], ['200', '200', 1], ['400', '200', 1], ['800', '800', 1], ['1500', '800', 1]];
    SP8_meta(ctx, 'INTERNATIONALE FINALES · SNELHEID PER BAAN', 360, 200, 1, C.grain, 'left', 28);
    RJ.forEach(([d, w, n], i) => { const y = 230 + i * 112, u = ramp(t, q.at(w, n) + (i === 2 || i === 4 ? 0.6 : 0), 1.6);
      text(ctx, d + ' m', 320, y + 66, fTekst(40, 800), u > 0.05 ? C.text : C.text2, 'right'); SP8_profiel(ctx, 360, y, 820, 82, d, u, { piek: q.on('eindsprint', 1, 0.6) }); });
    SP8_meta(ctx, 'MET DUIK', 360 + 205, 300, q.on('duik', 1, 0.4) * ramp(t, q.at('Bij') + 0.5, 0.5), '#0F1626', 'center', 24);
    SP8_meta(ctx, 'EINDSPRINT', 1200, 230 + 4 * 112 + 40, q.on('eindsprint', 1, 0.5), C.goud, 'left', 28);
    const T = q.on('Bij', 4, 0.3); if (T > 0.01) { persoon(ctx, 'zwemtrainer', 1600, 860, 430, { t, kijk: -1, uit: t > q.at('zegt') && t < q.at('verliezen') + 0.4 ? 'praat' : 'neutraal', pose: t > q.at('zegt') ? 'wijs' : 'staan' });
      SP8_kaartje(ctx, 1290, 190, 540, [['200 M OF LANGER', 'meta', C.goud], ['eerste 50 m: niet winnen,', 'tekst', C.text], ['wel verliezen', 'tekst', C.koraal]], q.on('zegt', 1, 0.5), C.goud); }
    SP8_meta(ctx, 'ROBERTSON E.A. 2009 · MCGIBBON E.A. 2018 · EUR J SPORT SCI 2020', 120, 850, 1, C.grain, 'left', 24); },

  // ---------- H5 ----------
  s17(ctx, t, q) { const K = SP8_kantScene(ctx, t, q, { muur: 1500, wl: 600, tx: 1720, hijg: true });
    SP8_whiteboard(ctx, 140, 170, 560, 210, 1); metaText(ctx, 'MAANDAG', 170, 218, '#56627E', 'left', 28); SP8_schrijf(ctx, '4 × 50 m sprint', 170, 320, 64, SP8.inkt, ramp(t, q.at('vier') - 0.2, 1.4));
    const V = q.on('Hoe', 1, 0.5), u = 0.15 + 0.2 * ramp(t, q.at('vult'), 3) * (1 - V * 0.0);
    SP8_batterij(ctx, 820, 300, 300, 120, u, { grijs: V, vraag: V, streep: V > 0.5 ? 2 / 3 : null });
    const Z = q.on('vult', 1, 0.5) * (1 - V), sc = SP8_schouder(K.r);
    zoomCircle(ctx, 560, 640, 170, sc.x, sc.y, '', Z, () => { bg(ctx, 'micro'); mitochondrion(ctx, 560, 640, 220, -0.2, 1, 6, t); });
    SP8_laag(ctx, Z * q.on('zuurstof', 1, 0.5), () => { pijl(ctx, 700, 560, 840, 440, C.teal, 1, 7, 24); naamBij(ctx, 'zuurstof', '', 790, 600, 1, 'left', C.teal); }); },

  s19(ctx, t, q) { const t2 = q.at('tien') - 0.3, t3 = q.at('pauzes') - 0.5;
    if (t >= t3) { SP8_kantScene(ctx, t, q, { muur: 1500, wl: 600, tx: 1720, uit: 'neutraal' }); SP8_antw(ctx, 'Antwoord c', 1);
      SP8_kaartje(ctx, 140, 220, 700, [['KORTE RUST', 'meta', C.teal], ['stil aan de kant kan beter', 'tekst', C.text]], ramp(t, t3, 0.4), C.teal); SP8_meta(ctx, 'TOUBEKIS E.A. 2005 · 2008', 140, 440, ramp(t, t3, 0.4), C.grain, 'left', 24); return; }
    bg(ctx, 'schema'); SP8_antw(ctx, 'Antwoord c', 1);
    const A = 1 - ramp(t, t2, 0.4), Bb = ramp(t, t2, 0.4);
    laag2(ctx, A, () => { SP8_meta(ctx, 'HOEVEEL ZIT ER WEER IN DE ACCU', 960, 240, 1, C.text2, 'center', 30);
      ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 500); ctx.lineTo(1720, 500); ctx.stroke();
      const P = [[350, 'na de sprint', '± 1/5', 0.2, 'onderzoek', 'vijfde'], [950, '1,5 min', '± 2/3', 0.65, 'anderhalve', 'derde'], [1550, '6 min', '± 4/5 · nog niet vol', 0.85, 'zes', 'helemaal']];
      P.forEach(([x, tl, fr, v, w0, w1]) => { const a = q.on(w0, 1, 0.4), u = v * ramp(t, q.at(w0), Math.max(0.5, q.at(w1) - q.at(w0)));
        laag2(ctx, a, () => { SP8_batterij(ctx, x - 120, 340, 240, 100, u, { lab: '' }); circ(ctx, x, 500, 10, C.oker); text(ctx, tl, x, 560, fTekst(40, 800), C.text, 'center'); text(ctx, fr, x, 610, fTekst(36, 700), C.oker, 'center'); }); });
      SP8_meta(ctx, 'FIETSSPRINT VAN 30 S', 960, 700, q.on('onderzoek', 1, 0.4), C.grain, 'center', 28); SP8_meta(ctx, 'BOGDANIS E.A. 1995 · MCMAHON & JENKINS 2002', 960, 740, q.on('onderzoek', 1, 0.4), C.grain, 'center', 24); });
    laag2(ctx, Bb, () => { SP8_meta(ctx, 'SNELHEID PER SPRINT · 10 S RUST', 960, 240, 1, C.text2, 'center', 30); SP8_meta(ctx, 'SCHEMATISCH', 1450, 290, 1, C.grain, 'right', 24);
      const Hs = [360, 300, 255, 225]; Hs.forEach((h, i) => { const x = 560 + i * 230, a = ramp(t, t2 + 0.3 + i * 1.0, 0.5); laag2(ctx, a, () => { roundRect(ctx, x - 60, 720 - h * ease(a), 120, h * ease(a), 10); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); metaText(ctx, 'SPRINT ' + (i + 1), x, 765, C.text2, 'center', 26); });
        if (i < 3) SP8_meta(ctx, '10 S', x + 115, 700, ramp(t, t2 + 0.8 + i * 1.0, 0.4), C.teal, 'center', 24); });
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(440, 720); ctx.lineTo(1480, 720); ctx.stroke();
      SP8_kaartje(ctx, 960, 340, 420, [['TOPSNELHEID', 'meta', C.goud], ['minuten rust', 'tekst', C.text]], q.on('minuten', 2, 0.5), C.goud, 'center'); }); },

  // ---------- Recap ----------
  s20(ctx, t, q) { const Y = 780; SP8_doorsnede(ctx, t, Y, { xW: 1000 }); SP8_startblok(ctx, 1000, Y - 162, 0.8, 4); SP8_wig(ctx, zwemmer(ctx, 'sam', 1000, Y - 162, 270, { slag: 'startblok', kijk: 1 }), Y - 150);
    const A = q.on('50', 1, 0.5), Bp = q.on('1500', 1, 0.5), rnd = SP8_fase(t, q.at('ander') - 0.1, q.at('mengpaneel') + 1.5, 0.4);
    const vA = [0.92 * q.on('fosfaataccu', 1, 0.8), 0.7 * q.on('gisting', 1, 0.8), 0.22 * q.on('voorbij', 1, 0.8)];
    const vB = [0.08 * Bp, 0.12 * Bp, 0.93 * q.on('alles', 2, 1.0)];
    SP8_paneel(ctx, 130, 200, 0.8, vA, { a: A, kop: '50 m', kopKl: C.text, rand: rnd, hl: [SP8_fase(t, q.at('eruit') - 0.2, q.at('slag') + 0.6), SP8_fase(t, q.at('eruit') - 0.2, q.at('slag') + 0.6), 0] });
    SP8_paneel(ctx, 1100, 200, 0.8, vB, { a: Bp, kop: '1500 m', kopKl: C.text, rand: rnd, hl: [0, 0, SP8_fase(t, q.at('tempo') - 0.2, q.at('volhouden') + 0.6)] });
    const R = q.on('bewaart', 1, 0.5); laag2(ctx, R * Bp, () => { const x = 1100 + 0.8 * 150, y = 200 + 0.8 * (96 + 214) - 30; pijl(ctx, x + 70, y, x + 70, y - 110, C.oker, 1, 8, 24); metaText(ctx, 'EINDSPRINT', x + 70, y - 128, C.oker, 'center', 24); });
    SP8_meta(ctx, 'VEREENVOUDIGD', 1788, 580, Bp, C.grain, 'right', 24); },

  s21(ctx, t, q) { bg(ctx, 'schema'); ctx.fillStyle = SP8.vloer; ctx.fillRect(0, 850, W, 25);
    persoon(ctx, 'zwemtrainer', 400, 850, 470, { t, kijk: 1, uit: 'praat', pose: t > q.at('meten') ? 'wijs' : 'staan' });
    SP8_beroep(ctx, 700, 190, 600, 'zwemtrainer', '', 'stopwatch', q.on('zwemtrainer', 1, 0.5));
    SP8_beroep(ctx, 700, 330, 600, 'inspanningsfysioloog', '', 'meter', q.on('inspanningsfysiologen', 1, 0.5));
    SP8_beroep(ctx, 700, 470, 600, 'prestatieanalist', '', 'grafiek', q.on('prestatieanalisten', 1, 0.5));
    [['splittijden', 'splittijden', C.goud], ['lactaat', 'lactaat', SP8.lac], ['herstel', 'herstel,', C.teal]].forEach(([s2, w, kl], i) => tag(ctx, s2, 790 + i * 200, 680, kl, q.on(w, 1, 0.4), 'center', 30));
    const O = q.on('studie', 1, 0.5); laag2(ctx, O, () => { SP8_kaart(ctx, 1340, 330, 500, 260, 1, C.goud); metaText(ctx, 'WO · 2026', 1370, 390, C.goud, 'left', 28); text(ctx, 'bewegings-', 1370, 460, fTekst(42, 800), C.text, 'left'); text(ctx, 'wetenschappen', 1370, 515, fTekst(42, 800), C.text, 'left'); }); },
});

// klein hulpje voor fades (laag met callback)
function laag2(ctx, a, fn) { SP8_laag(ctx, a, fn); }
// aantikken bij de 50 m: ring aan de muur
function laagTik(ctx, q, x, y) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x + 20, y, 26, 0, 6.283); ctx.stroke(); ctx.restore(); }

// s13 en s15: bovenaanzicht van de baan, snelheidslint, klembord en zwemtrainer
function SP8_finaleScene(ctx, t, q, deel) { bg(ctx, 'schema');
  const lx = 160, lw = 1600, ly = 160, lh = 80; roundRect(ctx, lx - 30, ly - 24, lw + 60, lh + 48, 10); shape(ctx, SP8.vloer, rgba(C.line, 0.4), 2); ctx.fillStyle = '#3F86A8'; ctx.fillRect(lx, ly, lw, lh);
  for (const yy of [ly + 4, ly + lh - 4]) for (let x = lx; x < lx + lw; x += 16) circ(ctx, x + 8, yy, 5, (Math.floor((x - lx) / 16) % 2) ? '#3D7FB3' : '#E8E4DA');
  ctx.fillStyle = rgba('#14303F', 0.5); ctx.fillRect(lx + 64, ly + lh / 2 - 4, lw - 128, 8); ctx.fillStyle = '#C9D3DA'; ctx.fillRect(lx - 6, ly, 6, lh); ctx.fillRect(lx + lw, ly, 6, lh);
  metaText(ctx, '0 · 100 · 200 M', lx, ly - 34, C.text2, 'left', 22); metaText(ctx, '50 · 150 M', lx + lw, ly - 34, C.text2, 'right', 22);
  // zwemmer heen en weer, tempo uit de splits
  const sp = deel === 'serie' ? SP8_SERIE : SP8_FINALE, per = sp.map(s => s / 9), tot = per.reduce((a, b) => a + b, 0), tt = t % tot; let acc = 0, k = 0; while (k < 3 && tt > acc + per[k]) { acc += per[k]; k++; }
  const u = clamp((tt - acc) / per[k], 0, 1), heen = k % 2 === 0, x = heen ? lerp(lx + 30, lx + lw - 30, u) : lerp(lx + lw - 30, lx + 30, u);
  SP8_boven(ctx, x, ly + lh / 2, 58, t * (1.6 - 0.1 * k), { kijk: heen ? 1 : -1 });
  // snelheidslinten
  const L1 = deel === 'serie' ? ramp(t, q.at('splittijden') - 0.2, 2.0) : 1, L2 = deel === 'finale' ? ramp(t, q.at('finale') - 0.1, 1.6) : 0;
  SP8_lint(ctx, 360, 320, 1000, SP8_SERIE, 1, { lab: 'SERIE', vul: L1 }); if (deel === 'finale') SP8_lint(ctx, 360, 405, 1000, SP8_FINALE, 1, { lab: 'FINALE', vul: L2 });
  // klembord
  const ser = deel === 'serie' ? SP8_SERIE.map((s, i) => q.on('splittijden', 1, 0.3) > 0 ? ramp(t, q.at('splittijden') + i * 0.5, 0.3) : 0) : [1, 1, 1, 1];
  const hard = deel === 'serie' ? q.on('hard', 1, 0.4) : 1, zak = deel === 'serie' ? q.on('zakte', 1, 0.6) : 1;
  const klS = ['#121A26', '#121A26', '#121A26', '#121A26'].map((k0, i) => i === 0 ? SP8_mix('#121A26', '#A87A12', hard) : SP8_mix('#121A26', '#B8452C', zak));
  const finA = deel === 'serie' ? [q.on('seconde', 1, 0.4), 0, 0, 0] : [1, ramp(t, q.at('finale') + 0.2, 0.3), ramp(t, q.at('finale') + 0.6, 0.3), ramp(t, q.at('finale') + 1.0, 0.3)];
  const kol = [{ kop: 'SERIE', tijden: SP8_SERIE.map(s => s.toFixed(1).replace('.', ',')), a: ser, kl: klS, totaal: '2:02,7', totA: deel === 'serie' ? q.on('tijd', 2, 0.4) : 1 },
               { kop: 'FINALE', kopA: deel === 'serie' ? q.on('finale', 1, 0.4) : 1, tijden: SP8_FINALE.map(s => s.toFixed(1).replace('.', ',')), a: finA, totaal: '2:01,2', totA: deel === 'finale' ? q.on('sneller', 1, 0.4) : 0, totKl: '#2E7D46' }];
  SP8_klembord(ctx, 560, 470, 720, 400, kol, { vb: false }); SP8_meta(ctx, 'VOORBEELD', 1300, 520, 1, C.grain, 'left', 24);
  if (deel === 'finale') { const R = SP8_fase(t, q.at('snel', 2) - 0.1, q.at('zwaarder') + 0.8); laag2(ctx, R, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(560 + 720 * 0.48, 470 + 130 + 0.6 * 47.5 - 2, 80, 32, 0, 0, 6.283 * R); ctx.stroke(); }); }
  const praat = deel === 'finale' && t > q.at('Eén') && t < q.at('eindtijd') + 0.4;
  persoon(ctx, 'zwemtrainer', 1580, 862, 420, { t, kijk: -1, uit: praat ? 'praat' : 'neutraal', pose: praat ? 'wijs' : 'staan' });
  if (deel === 'finale') { bubbel(ctx, 1600, 398, 'Kijk naar je splittijden', '#F2F2EE', SP8_fase(t, q.at('Kijk') - 0.1, q.at('vasthoudt') + 0.4, 0.3), 32);
    SP8_kaartje(ctx, 120, 470, 400, [['TE SNEL BEGIN', 'meta', C.koraal], ['schoolslag', 'tekst', C.text], ['meer lactaat', 'tekst', C.text], ['voelt zwaarder', 'tekst', C.text], ['THOMPSON E.A. 2003', 'meta', C.grain]], q.on('onderzoek', 1, 0.5), C.koraal); }
}
