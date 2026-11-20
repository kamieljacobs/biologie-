
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
// Wat word jij? · Sport en topsport 9 · Topsport en school — eigen tekeningen (20 nov 2026)
// Kleuren (storyboard): teal = herstel en slaap · oker = training · paars = school, stress · koraal = let op, blessure · goud = het plan · groen = energie.
// Vaste elementen: de terugspoelbalk bovenin (SP9_spoel) en de stapel 'TOTALE BELASTING' (SP9_stapel, label MODEL). Geen weegschaal (film 4).
// Geen namen in beeld. Decors vlak getekend (bad, slaapkamer, lokaal, mentorkamer); schema's op navy.

const SP9 = { water: '#2C5F80', waterD: '#244E6A', waterL: '#5BA4C9', tegel: '#3A4E6C', tegelL: '#4A6080', dek: '#4C5C74', dekL: '#5E7088',
  muur: '#22314C', vloer: '#1E2A40', hout: '#6A5440', houtL: '#8A7058', papier: '#F2F2EE', inkt: '#121A26', scherm: '#151D2C', sil: '#3A4862' };
const SP9_SPOEL = ['DO', 'WO 05:00', 'DE NACHT', 'MA', '3 WEKEN EERDER'];

// pyjama zoals in film 4 (alleen kleding)
if (CAST.sam && CAST.sam.garderobe && !CAST.sam.garderobe.pyjama) CAST.sam.garderobe.pyjama = { top: 'tshirt', topKleur: '#6F86B8', topAccent: '#5A70A0', broek: '#5A70A0' };

// ---------- algemene hulpjes ----------
function SP9_antw(ctx, s2, a = 1) { regel(ctx, s2, 120, 205, a, C.groen, 40, 'left', 700); }
function SP9_laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function SP9_meta(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function SP9_fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function SP9_kaart(ctx, x, y, w, h, a = 1, rand = C.line, vul = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, vul || rgba('#0D1420', 0.92), rgba(rand, 0.9), 2); ctx.restore(); }
function SP9_label(ctx, s2, x, y, a = 1, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fMeta(px); ctx.letterSpacing = '3px'; const w = ctx.measureText(s2.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width + 44; ctx.letterSpacing = '0px';
  const x0 = al === 'right' ? x - w : al === 'center' ? x - w / 2 : x; roundRect(ctx, x0, y - px - 12, w, px + 30, 10); shape(ctx, rgba('#0D1420', 0.88), rgba(col, 0.7), 1.5); metaText(ctx, s2, x0 + 22, y, col, 'left', px); ctx.restore(); return w; }
function SP9_lijn(ctx, pts, col, lw = 4, a = 1, dash = null) { if (a <= 0.01 || pts.length < 2) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function SP9_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }

// ---------- terugspoelbalk bovenin ----------
// n = aantal getoonde stappen (1..5, fractioneel = de nieuwste schuift in); o.tik = 0..1 (icoon knippert), o.iconen = true (recap: kleine pictogrammen eronder)
function SP9_spoel(ctx, n, a = 1, o = {}) { if (a <= 0.01) return; const y = 124; ctx.save(); ctx.globalAlpha *= a;
  // terugspoel-icoon (twee driehoekjes naar links)
  const ik = 1 + 0.25 * Math.sin((o.tik || 0) * Math.PI); ctx.save(); ctx.translate(136, y - 10); ctx.scale(ik, ik); ctx.fillStyle = C.goud;
  for (const dx of [0, 22]) { ctx.beginPath(); ctx.moveTo(-12 + dx - 10, 0); ctx.lineTo(10 + dx - 10, -14); ctx.lineTo(10 + dx - 10, 14); ctx.closePath(); ctx.fill(); } ctx.restore();
  let x = 186; const kl = Math.ceil(n - 0.001);
  for (let i = 0; i < Math.min(5, kl); i++) { const f = i < kl - 1 ? 1 : clamp(n - i, 0, 1); if (f <= 0.01) break; const act = i === kl - 1;
    ctx.save(); ctx.globalAlpha *= f;
    if (i > 0) { ctx.strokeStyle = rgba(C.text2, 0.8); ctx.fillStyle = rgba(C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 44, y - 10); ctx.lineTo(x + 10, y - 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 4, y - 10); ctx.lineTo(x + 16, y - 18); ctx.lineTo(x + 16, y - 2); ctx.closePath(); ctx.fill(); x += 60; }
    ctx.font = fMeta(28); ctx.letterSpacing = '3px'; const w = ctx.measureText(SP9_SPOEL[i]).width; ctx.letterSpacing = '0px';
    if (act && !o.alles) { roundRect(ctx, x - 14, y - 42, w + 28, 52, 10); shape(ctx, rgba(C.goud, 0.14), rgba(C.goud, 0.8), 2); }
    metaText(ctx, SP9_SPOEL[i], x, y, act && !o.alles ? C.goud : C.text2, 'left', 28);
    if (o.iconen) SP9_spoelIcoon(ctx, i, x + w / 2, y + 70);
    ctx.restore(); x += w + 16; }
  ctx.restore(); }
function SP9_spoelIcoon(ctx, i, x, y) { ctx.save(); ctx.lineWidth = 4; ctx.lineCap = 'round';
  if (i === 0) { circ(ctx, x, y, 22, rgba(C.koraal, 0.25), C.koraal, 3); metaText(ctx, 'SCHOUDER', x, y + 58, C.koraal, 'center', 22); }
  if (i === 1) { roundRect(ctx, x - 40, y - 20, 80, 40, 8); shape(ctx, '#10161F', '#4A5468', 2); text(ctx, '05:00', x, y + 9, fMeta(22), C.koraal, 'center'); metaText(ctx, 'WEKKER', x, y + 58, C.text2, 'center', 22); }
  if (i === 2) { circ(ctx, x, y, 20, '#E8E2C8'); circ(ctx, x + 9, y - 6, 18, C.bg || '#0F1626'); metaText(ctx, 'KORT', x, y + 58, C.teal, 'center', 22); }
  if (i === 3) { roundRect(ctx, x - 18, y - 24, 36, 48, 4); shape(ctx, SP9.papier, '#9AA3B2', 2); ctx.fillStyle = C.paars; ctx.fillRect(x - 18, y - 24, 36, 10); metaText(ctx, 'TOETS', x, y + 58, C.paars, 'center', 22); }
  if (i === 4) { for (const [dx, k] of [[-24, C.paars], [8, C.oker]]) { roundRect(ctx, x + dx - 4, y - 22, 34, 44, 4); shape(ctx, '#1B2438', k, 2.5); } metaText(ctx, 'ROOSTERS', x, y + 58, C.text2, 'center', 22); }
  ctx.restore(); }

// ---------- de stapel 'TOTALE BELASTING' (model) ----------
// blokken: [{t1, t2, kl, h, a, leeg}] van onder naar boven; a = 0..1 (valt erop). o: titel (0..1), model (label), w
function SP9_stapel(ctx, x, yb, blokken, a = 1, o = {}) { if (a <= 0.01) return; const w = o.w || 440; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, yb); ctx.lineTo(x + w + 20, yb); ctx.stroke();
  let y = yb; for (const b of blokken) { const ba = b.a == null ? 1 : b.a; if (ba <= 0.01) continue; const h = (b.h || 100) * (b.krimp == null ? 1 : b.krimp), drop = (1 - ease(clamp(ba * 1.25, 0, 1))) * 260;
    const yy = y - h - drop; ctx.save(); ctx.globalAlpha *= clamp(ba * 3, 0, 1);
    roundRect(ctx, x, yy + 4, w, h - 8, 12);
    if (b.leeg) { ctx.save(); ctx.setLineDash([12, 10]); shape(ctx, rgba('#0D1420', 0.6), rgba(C.goud, 0.9), 3); ctx.restore(); vraagteken(ctx, x + w / 2, yy + h / 2 + 30, 1, 80); }
    else { shape(ctx, rgba(b.kl, 0.24), b.kl, 3); const twee = b.t2 && h >= 84; text(ctx, b.t1, x + 26, yy + (twee ? h / 2 - 2 : h / 2 + 12), fTekst(h < 70 ? 28 : 34, 800), C.text, 'left'); if (twee) metaText(ctx, b.t2, x + 26, yy + h / 2 + 32, b.kl, 'left', 19); }
    ctx.restore(); y = y - h * clamp(ba * 1.25, 0, 1); }
  if (o.titel !== 0) SP9_laag(ctx, o.titel == null ? 1 : o.titel, () => { metaText(ctx, 'TOTALE BELASTING', x, (o.titelY != null ? o.titelY : y - 28), C.goud, 'left', 28); });
  if (o.model !== false) metaText(ctx, 'MODEL', x + w, yb + 40, C.grain, 'right', 24);
  ctx.restore(); return y; }
// standaardblokken
const SP9_B = { training: { t1: 'TRAINING', t2: 'ZELFDE ALS DE WEKEN ERVOOR', kl: C.oker, h: 120 }, slaap: { t1: 'MINDER SLAAP', kl: C.koraal, h: 96 },
  toets: { t1: 'TOETSEN · STRESS', kl: C.paars, h: 96 }, leeg: { leeg: true, h: 96 } };
function SP9_blok(naam, a = 1, extra = {}) { return Object.assign({}, SP9_B[naam], { a }, extra); }

// ---------- klok (digitaal) ----------
function SP9_digi(ctx, x, y, s2, a = 1, kl = C.koraal, px = 48, schud = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x + Math.sin(schud * 60) * 5 * (schud > 0 ? 1 : 0), y); ctx.font = fMeta(px); const w = ctx.measureText(s2).width + 60;
  roundRect(ctx, -w / 2, -px - 14, w, px + 36, 14); shape(ctx, '#0F1626', '#56627E', 3); text(ctx, s2, 0, 6, fMeta(px), kl, 'center'); ctx.restore(); }

// ---------- zwembad zijaanzicht (s01) ----------
function SP9_badZij(ctx, muur, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, wl - 120);
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(muur + 200 + i * 190, 170, 110, 70); }
  ctx.fillStyle = SP9.dek; ctx.fillRect(0, wl - 26, muur, 26); ctx.fillStyle = SP9.dekL; ctx.fillRect(0, wl - 26, muur, 5);
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, muur - 120, wl - 96, 118, 22, 6); ctx.fill(); ctx.fillStyle = '#8A93A6'; ctx.fillRect(muur - 100, wl - 74, 18, 48); ctx.fillRect(muur - 40, wl - 74, 18, 48);
  ctx.restore(); }
function SP9_water(ctx, x0, wl, t = 0, golf = 0, gx = 0, achter = false) { ctx.save(); ctx.fillStyle = SP9.water; ctx.beginPath(); ctx.moveTo(x0, 876);
  const Y = x => { const d = Math.abs(x - gx), g = golf * 8 * Math.exp(-d / 220) * Math.sin(d / 22 - t * 6); return wl + Math.sin(x / 60 + t * 1.6) * 2.5 + g; };
  for (let x = x0; x <= W; x += 12) ctx.lineTo(x, Y(x)); ctx.lineTo(W, 876); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = x0; x <= W; x += 12) x === x0 ? ctx.moveTo(x, Y(x)) : ctx.lineTo(x, Y(x)); ctx.stroke();
  for (let i = 0; i < 5; i++) { const x = x0 + 160 + i * 300 + Math.sin(t * 0.5 + i) * 20; ctx.strokeStyle = rgba(SP9.waterL, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, wl + 60 + (i % 3) * 50); ctx.lineTo(x + 90, wl + 60 + (i % 3) * 50); ctx.stroke(); }
  ctx.restore(); }
function SP9_lijnen(ctx, x0, wl) { ctx.save(); for (let x = x0 + 20; x < W; x += 34) circ(ctx, x, wl - 2, 9, (Math.floor((x - x0) / 34) % 6 < 3) ? '#C9454A' : '#E8E2D4'); ctx.restore(); }
function SP9_kopwand(ctx, muur, wl) { ctx.save(); ctx.fillStyle = SP9.tegel; ctx.fillRect(muur - 30, wl - 26, 30, 876 - wl + 26); ctx.strokeStyle = SP9.tegelL; ctx.lineWidth = 1.5; for (let y = wl; y < 876; y += 30) { ctx.beginPath(); ctx.moveTo(muur - 30, y); ctx.lineTo(muur, y); ctx.stroke(); } ctx.restore(); }

// ---------- badrand vooraanzicht (s03, s04, s06, s14, s17) ----------
function SP9_badrand(ctx, zit, wl, t = 0) { bg(ctx, 'schema'); ctx.save();
  ctx.fillStyle = '#202E48'; ctx.fillRect(0, 120, W, zit - 140);
  for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba('#F2F2EE', 0.04); ctx.fillRect(60 + i * 240, 170, 150, 90); }
  ctx.fillStyle = SP9.dek; ctx.fillRect(0, zit - 70, W, 70); ctx.fillStyle = SP9.dekL; ctx.fillRect(0, zit - 4, W, 6);
  ctx.fillStyle = SP9.tegel; ctx.fillRect(0, zit + 2, W, wl - zit); ctx.strokeStyle = SP9.tegelL; ctx.lineWidth = 1.5;
  for (let y = zit + 30; y < wl; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, zit + 2); ctx.lineTo(x, wl); ctx.stroke(); }
  ctx.restore(); }
function SP9_waterFront(ctx, wl, t = 0) { ctx.save(); ctx.fillStyle = SP9.water; ctx.beginPath(); ctx.moveTo(0, 876); for (let x = 0; x <= W; x += 16) ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.lineTo(W, 876); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= W; x += 16) x ? ctx.lineTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3) : ctx.moveTo(x, wl + Math.sin(x / 70 + t * 1.4) * 3); ctx.stroke();
  ctx.restore(); }
function SP9_handdoek(ctx, r, a = 1) { if (a <= 0.01 || !r.hoofd) return; const hh = r.hoofd.r / 0.55, x = r.hoofd.x, sy = r.hoofd.y + hh * 0.9; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#DCD8CC'; ctx.strokeStyle = '#B8B2A2'; ctx.lineWidth = 2;
  for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + s * hh * 1.05, sy + hh * 0.25); ctx.quadraticCurveTo(x + s * hh * 0.9, sy - hh * 0.2, x + s * hh * 0.38, sy - hh * 0.22); ctx.lineTo(x + s * hh * 0.2, sy + hh * 0.15); ctx.lineTo(x + s * hh * 0.25, sy + hh * 1.75); ctx.lineTo(x + s * hh * 0.62, sy + hh * 1.8); ctx.lineTo(x + s * hh * 0.7, sy + hh * 0.6); ctx.quadraticCurveTo(x + s * hh * 0.95, sy + hh * 0.7, x + s * hh * 1.05, sy + hh * 0.25); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore(); }
// telefoon in de hand (hold)
function SP9_telHand(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); roundRect(ctx, -16, -52, 32, 60, 6); shape(ctx, '#1E2230', '#56627E', 2); ctx.fillStyle = '#9CC4DC'; ctx.fillRect(-12, -46, 24, 46); ctx.restore(); }
function SP9_pen(ctx, x, y, an, tik = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.9 + Math.sin(tik * 18) * 0.12 * (tik > 0 ? 1 : 0)); roundRect(ctx, -5, -62, 10, 70, 4); shape(ctx, '#2F5FA8', '#1E3A6A', 1.5); ctx.restore(); }

// ---------- tablet ----------
// tekent het kader en roept inhoud(x0, y0, w, h) aan binnen het scherm
function SP9_tablet(ctx, x, y, w, h, a = 1, inhoud = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 26); shape(ctx, '#0B0F17', '#56627E', 4);
  roundRect(ctx, x + 20, y + 20, w - 40, h - 40, 14); shape(ctx, SP9.scherm, null); if (inhoud) { ctx.save(); roundRect(ctx, x + 20, y + 20, w - 40, h - 40, 14); ctx.clip(); inhoud(x + 20, y + 20, w - 40, h - 40); ctx.restore(); } ctx.restore(); }
// staafgrafiek trainingsbelasting per week (4 oker staven); laatste = 0..1 hoogte van de toetsweek-staaf; o.chips = [a PECH/TRAINING]
function SP9_weekGrafiek(ctx, x, y, w, h, laatste = 1, o = {}) { const base = y + h - 70, top = y + 90, n = 4, bw = Math.min(150, w / n * 0.5), hv = (base - top) * 0.78;
  metaText(ctx, 'TRAININGSBELASTING PER WEEK', x + 30, y + 52, C.oker, 'left', 26);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 40, top - 10); ctx.lineTo(x + 40, base); ctx.lineTo(x + w - 30, base); ctx.stroke();
  const labels = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'TOETSWEEK'];
  for (let i = 0; i < n; i++) { const cx = x + 40 + (w - 70) * (i + 0.5) / n, hh = hv * (i === 3 ? laatste : 1);
    if (hh > 1) { roundRect(ctx, cx - bw / 2, base - hh, bw, hh, 6); shape(ctx, rgba(C.oker, i === 3 ? 0.75 : 0.55), C.oker, 2); }
    if (i === 3 && o.streep) SP9_lijn(ctx, [[x + 44, base - hv], [x + w - 34, base - hv]], C.oker, 2, o.streep, [10, 8]);
    metaText(ctx, labels[i], cx, base + 40, i === 3 ? C.paars : C.text2, 'center', 22);
    if (o.chips) for (const [k, s2] of [[0, 'PECH'], [1, 'TRAINING']]) SP9_laag(ctx, o.chips, () => { roundRect(ctx, cx - 64, base - hv + 14 + k * 44, 128, 36, 8); shape(ctx, '#2A3242', '#6A7286', 1.5); metaText(ctx, s2, cx, base - hv + 40 + k * 44, '#AEB6C4', 'center', 18); }); } }
// ochtendlijst: drie lijnen over de week (ma = index 0..4); voort = 0..1 hoeveel van de week getekend
function SP9_ochtend(ctx, x, y, w, h, voort = 1, o = {}) { metaText(ctx, 'OCHTENDLIJST', x + 30, y + 52, C.teal, 'left', 26);
  const vr = ['HOE SLIEP JE?', 'HOEVEEL ENERGIE?', 'HOEVEEL DRUK VAN SCHOOL?']; if (o.vragen !== false) vr.forEach((s2, i) => SP9_laag(ctx, o.vragenA ? o.vragenA[i] : 1, () => metaText(ctx, (i + 1) + '  ' + s2, x + 30, y + 100 + i * 40, C.text, 'left', 22)));
  const gx0 = x + 60, gx1 = x + w - 40, gy0 = y + (o.vragen === false ? 90 : 240), gy1 = y + h - 60; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  const dag = ['VR', 'ZA', 'ZO', 'MA', 'DI', 'WO', 'DO']; dag.forEach((d, i) => metaText(ctx, d, gx0 + (gx1 - gx0) * (i + 0.5) / 7, gy1 + 34, d === 'MA' ? C.paars : C.text2, 'center', 20));
  const X = i => gx0 + (gx1 - gx0) * (i + 0.5) / 7, Y = v => gy1 - (gy1 - gy0) * v;
  const reeks = [['SLAAP', C.teal, [0.78, 0.8, 0.82, 0.62, 0.5, 0.36, 0.42]], ['ENERGIE', C.groen, [0.72, 0.75, 0.76, 0.6, 0.48, 0.34, 0.3]], ['DRUK VAN SCHOOL', C.paars, [0.25, 0.18, 0.3, 0.7, 0.78, 0.84, 0.8]]];
  const n = 1 + voort * 6; reeks.forEach(([lab, kl, v], k) => { const pts = []; for (let i = 0; i < 7; i++) { if (i > n) break; const f = Math.min(1, n - i + 1); pts.push([X(i - 1 + f), Y(i ? lerp(v[i - 1], v[i], f) : v[0])]); } SP9_lijn(ctx, pts, o.kleur ? o.kleur[k] || kl : kl, 5);
    if (voort > 0.95 && o.labels !== false) metaText(ctx, lab, X(6) + 4, Y(v[6]) + (k === 0 ? -14 : k === 1 ? 30 : -16), kl, 'right', 20); });
}

// ---------- slaapkamer ----------
function SP9_kamer(ctx, licht = 0) { bg(ctx, 'schema'); ctx.fillStyle = SP9_mix('#141D30', '#2A3A58', licht); ctx.fillRect(0, 120, W, 720); ctx.fillStyle = '#20273A'; ctx.fillRect(0, 840, W, 36);
  roundRect(ctx, 380, 200, 280, 230, 10); shape(ctx, '#0B1222', '#3E4A64', 8); ctx.fillStyle = '#3E4A64'; ctx.fillRect(516, 200, 8, 230); ctx.fillRect(380, 312, 280, 8);
  circ(ctx, 600, 250, 22, '#E8E2C8'); circ(ctx, 590, 243, 20, '#0B1222'); for (let i = 0; i < 6; i++) circ(ctx, 410 + hash(i) * 90, 220 + hash(i * 3) * 70, 2.5, '#C9CED6'); }
// bed met liggend personage (gedraaid); uit = 'slaapt' | 'neutraal' (ogen open)
function SP9_bed(ctx, id, x, y, h, o = {}) { const { t = 0, deken = '#4A6FA0', outfit = 'pyjama', uit = 'slaapt' } = o; ctx.save();
  const L = (CAST[id].lengte || 1), hh = h * L / 6.1, len = h * L;
  roundRect(ctx, x - 60, y, len + 150, 70, 14); shape(ctx, '#5E4A36', '#3E3024', 2); roundRect(ctx, x - 80, y - 150, 34, 260, 10); shape(ctx, '#6B5338', '#3E3024', 2);
  roundRect(ctx, x - 40, y - 12, len + 100, 26, 10); shape(ctx, '#E6E1D3', '#C9C2B4', 1.5);
  roundRect(ctx, x - 40, y - hh * 1.6, hh * 2.4, hh * 1.5, hh * 0.6); shape(ctx, '#F2F2EE', '#C9C2B4', 1.5);
  const br = Math.sin(t * 1.4) * 0.012; ctx.save(); ctx.translate(x + len + 10, y - hh * 0.98); ctx.rotate(-Math.PI / 2); ctx.scale(1 + br, 1);
  persoon(ctx, id, 0, 0, h, { uit, t, outfit }); ctx.restore();
  ctx.beginPath(); ctx.moveTo(x + hh * 2.1, y - hh * 0.2); ctx.bezierCurveTo(x + hh * 2.4, y - hh * 2.4, x + len * 0.75, y - hh * 2.2, x + len + 60, y - hh * 1.3); ctx.lineTo(x + len + 70, y + 14); ctx.lineTo(x + hh * 2.1, y + 14); ctx.closePath(); shape(ctx, deken, _donker(deken, 0.25), 2);
  ctx.strokeStyle = rgba('#FFFFFF', 0.12); ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + hh * 2.1 + i * len * 0.18, y - hh * (1.9 - i * 0.12)); ctx.lineTo(x + hh * 2.1 + i * len * 0.18, y + 10); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: x + hh * 0.55, y: y - hh * 0.98 }, hh }; }
function SP9_nachtkastje(ctx, x, y, w = 200, h = 170) { roundRect(ctx, x, y, w, h, 8); shape(ctx, '#6B5338', '#3E3024', 2); ctx.fillStyle = '#5A4630'; ctx.fillRect(x + 14, y + 30, w - 28, 4); circ(ctx, x + w / 2, y + 70, 6, '#C9A35C'); }
// biologische klok (zoomcirkel): wijzerplaat, gouden sector 'moe' die met schuif (0..1) een uur opschuift
function SP9_bioklok(ctx, x, y, r, schuif = 0) { circ(ctx, x, y, r, '#1B2236', '#9AA3B2', 4);
  for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 - Math.PI / 2; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.82, y + Math.sin(an) * r * 0.82); ctx.lineTo(x + Math.cos(an) * r * 0.94, y + Math.sin(an) * r * 0.94); ctx.stroke(); }
  const uur = 10 + schuif, an0 = (uur - 0.5) / 12 * 6.283 - Math.PI / 2, an1 = (uur + 0.5) / 12 * 6.283 - Math.PI / 2;
  ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r * 0.78, an0, an1); ctx.closePath(); ctx.fill();
  const an = uur / 12 * 6.283 - Math.PI / 2; ctx.strokeStyle = C.teal; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.62, y + Math.sin(an) * r * 0.62); ctx.stroke(); circ(ctx, x, y, 8, C.teal);
  text(ctx, 'MOE', x + Math.cos(an) * r * 0.42 + 14, y + Math.sin(an) * r * 0.42 + 40, fMeta(22), C.text, 'center'); }

// ---------- nacht-tijdlijn (s08, s10, s11) ----------
// tijd in uren vanaf 20:00 (0..14 → 20:00..10:00)
function SP9_nachtAs(ctx, x0, x1, y, van = 20, tot = 10, a = 1, stap = 2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const span = (tot + 24 - van) % 24; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (let u = 0; u <= span; u += stap) { const xx = x0 + (x1 - x0) * u / span; ctx.beginPath(); ctx.moveTo(xx, y - 8); ctx.lineTo(xx, y + 8); ctx.stroke(); metaText(ctx, String((van + u) % 24).padStart(2, '0') + ':00', xx, y + 40, C.text2, 'center', 20); }
  ctx.restore(); return u => x0 + (x1 - x0) * (((u - van + 24) % 24) / span); }
function SP9_maan(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#E8E2C8'); circ(ctx, x + r * 0.45, y - r * 0.3, r * 0.9, '#0F1626'); ctx.restore(); }

// ---------- klaslokaal ----------
function SP9_lokaal(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#26344F'; ctx.fillRect(0, 120, 1380, 700); ctx.fillStyle = '#20293C'; ctx.fillRect(0, 820, 1380, 56);
  roundRect(ctx, 380, 250, 640, 220, 8); shape(ctx, '#2E5A4A', '#6B5338', 10); metaText(ctx, 'TOETS', 700, 305, rgba('#F2F2EE', 0.55), 'center', 28);
  ctx.strokeStyle = rgba('#F2F2EE', 0.3); ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(450, 360 + i * 36); ctx.lineTo(450 + 300 + i * 60, 360 + i * 36); ctx.stroke(); }
  klokje(ctx, 1200, 250, 44, 0.3, 1); ctx.restore(); }
function SP9_tafel(ctx, x, y, w, vloer = 820) { ctx.save(); roundRect(ctx, x - w / 2, y, w, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(x - w / 2 + 10, y + 22, 14, vloer - y - 22); ctx.fillRect(x + w / 2 - 24, y + 22, 14, vloer - y - 22);
  ctx.fillStyle = '#4A5A7C'; ctx.fillRect(x - w / 2 + 20, y + 22, w - 40, 60); ctx.restore(); }
function SP9_toetsblad(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.06); ctx.scale(s, s); ctx.fillStyle = SP9.papier; ctx.fillRect(-46, -8, 92, 16); ctx.restore(); }

// ---------- mentorkamer ----------
function SP9_kamerMentor(ctx, vloer = 820) { bg(ctx, 'schema'); ctx.save(); ctx.fillStyle = '#2A3550'; ctx.fillRect(0, 120, W, vloer - 120); ctx.fillStyle = '#20293C'; ctx.fillRect(0, vloer, W, 876 - vloer); ctx.fillStyle = '#34445F'; ctx.fillRect(0, vloer - 8, W, 8);
  // prikbord en kast
  roundRect(ctx, 120, 200, 300, 210, 8); shape(ctx, '#8A6A48', '#6A5034', 6); for (let i = 0; i < 5; i++) { ctx.fillStyle = ['#F2F2EE', '#E0B64A', '#9CC4DC', '#F2F2EE', '#E07A5F'][i]; ctx.save(); ctx.translate(160 + (i % 3) * 85, 240 + Math.floor(i / 3) * 90); ctx.rotate((hash(i) - 0.5) * 0.3); ctx.fillRect(0, 0, 60, 60); ctx.restore(); }
  ctx.restore(); }
// laptop op tafel met de zwemtrainer in beeld (videogesprek); x = midden, y = tafelblad
function SP9_laptopTrainer(ctx, x, y, t, a = 1, s = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(130, 0); ctx.lineTo(110, -14); ctx.lineTo(-110, -14); ctx.closePath(); ctx.fill();
  roundRect(ctx, -120, -190, 240, 176, 10); shape(ctx, '#2A3040', '#5A6070', 3); ctx.save(); roundRect(ctx, -110, -180, 220, 156, 6); ctx.clip(); ctx.fillStyle = '#2A4A66'; ctx.fillRect(-110, -180, 220, 156);
  persoon(ctx, 'zwemtrainer', 0, 60, 260, { uit: Math.sin(t * 7) > 0.2 ? 'praat' : 'neutraal', t }); ctx.restore(); ctx.restore(); }

// ---------- roosters ----------
// soort 'toets' (paars) of 'training' (oker); o.schuif = 0..1 (toets DO → VR, training WO 05:30 → middag), o.dicht = compact
const SP9_DAG = ['MA', 'DI', 'WO', 'DO', 'VR'];
function SP9_rooster(ctx, x, y, w, h, soort, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, SP9.papier, soort === 'toets' ? C.paars : C.oker, 3);
  ctx.fillStyle = soort === 'toets' ? C.paars : C.oker; roundRect(ctx, x, y, w, 50, 12); ctx.fill(); ctx.fillRect(x, y + 30, w, 20);
  text(ctx, soort === 'toets' ? 'TOETSROOSTER' : (o.kop || 'TRAININGSPLAN'), x + 24, y + 36, fMeta(24), '#0F1626', 'left');
  const cw = (w - 100) / 5, x0 = x + 80, yy = y + 90, rh = (h - 120) / 2;
  SP9_DAG.forEach((d, i) => metaText(ctx, d, x0 + cw * (i + 0.5), yy, '#56627E', 'center', 22));
  const rij = (r, lab) => metaText(ctx, lab, x + 16, yy + 30 + rh * (r + 0.55), '#56627E', 'left', 20);
  const cel = (i, r, s2, kl, f = 1) => { const cx = x0 + cw * i + 8, cy = yy + 22 + rh * r + 6; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, cx, cy, cw - 16, rh - 14, 8); shape(ctx, rgba(kl, 0.3), kl, 2.5); text(ctx, s2, cx + (cw - 16) / 2, cy + (rh - 14) / 2 + 10, fTekst(Math.min(26, rh * 0.32), 800), '#121A26', 'center'); ctx.restore(); };
  if (soort === 'toets') { rij(0, 'OCHT'); rij(1, 'MID'); const sc = o.schuif || 0;
    cel(0, 0, 'toets', C.paars); cel(2, 0, 'toets', C.paars); cel(3 + sc, 0, 'toets', C.paars); }
  else { rij(0, '05:30'); rij(1, '16:00'); const sc = o.schuif || 0;
    cel(2, 0, 'zwem', sc > 0 ? SP9_mix('#D4A24A', '#E0B64A', sc) : C.oker, 1 - sc); if (sc > 0) cel(2, 1, 'zwem', C.goud, sc);
    cel(4, 0, 'zwem', C.oker); for (const i of [0, 1, 3]) cel(i, 1, 'zwem', C.oker); }
  ctx.restore(); }
// beide roosters in één week (in elkaar geschoven): toetsen boven, trainingen eronder; o.schuifT = toets DO → VR, o.schuifW = training WO 05:30 → middag
function SP9_week(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, SP9.papier, C.goud, 3);
  text(ctx, 'ÉÉN WEEK', x + 24, y + 42, fMeta(26), '#56627E', 'left');
  const cw = (w - 110) / 5, x0 = x + 90, yy = y + 90, rh = (h - 120) / 3;
  SP9_DAG.forEach((d, i) => metaText(ctx, d, x0 + cw * (i + 0.5), yy, '#56627E', 'center', 22));
  ['05:30', 'SCHOOL', '16:00'].forEach((l, r) => metaText(ctx, l, x + 16, yy + 22 + rh * (r + 0.6), '#56627E', 'left', 20));
  const cel = (fi, r, s2, kl, f = 1, rand = null) => { if (f <= 0.01) return; const cx = x0 + cw * fi + 8, cy = yy + 22 + rh * r + 6; ctx.save(); ctx.globalAlpha *= f; roundRect(ctx, cx, cy, cw - 16, rh - 14, 8); shape(ctx, rgba(kl, 0.3), rand || kl, rand ? 4 : 2.5); text(ctx, s2, cx + (cw - 16) / 2, cy + (rh - 14) / 2 + 10, fTekst(Math.min(26, rh * 0.32), 800), '#121A26', 'center'); ctx.restore(); };
  const sT = o.schuifT || 0, sW = o.schuifW || 0;
  cel(0, 1, 'toets', C.paars); cel(2, 1, 'toets', C.paars); cel(3 + sT, 1, 'toets', C.paars, 1, sT > 0.02 && sT < 0.98 ? C.goud : null);
  cel(2, lerp(0, 2, ease(sW)), 'zwem', SP9_mix('#D4A24A', '#E0B64A', sW), 1, sW > 0.02 ? C.goud : null); cel(4, 0, 'zwem', C.oker); for (const i of [0, 1, 3]) cel(i, 2, 'zwem', C.oker);
  ctx.restore(); }
// laptop (vooraanzicht) met paars toetsrooster dat online komt
function SP9_laptop(ctx, x, y, w, a = 1, aan = 1) { if (a <= 0.01) return; const h = w * 0.62; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#2A3040', '#5A6070', 4);
  ctx.fillStyle = '#5A6070'; ctx.beginPath(); ctx.moveTo(x - 40, y + h + 30); ctx.lineTo(x + w + 40, y + h + 30); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
  ctx.save(); roundRect(ctx, x + 14, y + 14, w - 28, h - 28, 8); ctx.clip(); ctx.fillStyle = '#1B2438'; ctx.fillRect(x, y, w, h); if (aan > 0.01) SP9_rooster(ctx, x + 30, y + 30, w - 60, h - 60, 'toets', aan); ctx.restore();
  ctx.restore(); }
// klembord met trainingsplan
function SP9_klembord(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 14); shape(ctx, '#8A6A48', '#6A5034', 3);
  roundRect(ctx, x + w / 2 - 60, y - 16, 120, 40, 8); shape(ctx, '#9AA3B2', '#6A7286', 2); SP9_rooster(ctx, x + 20, y + 34, w - 40, h - 54, 'training', 1, o); ctx.restore(); }

// ---------- onderzoekskaart ----------
// kop = regels (mono), meta rechtsonder; geeft binnenmaten terug
function SP9_studie(ctx, x, y, w, h, kop, meta, a = 1, rand = C.line) { if (a <= 0.01) return; SP9_kaart(ctx, x, y, w, h, a, rand); SP9_laag(ctx, a, () => { kop.forEach((s2, i) => metaText(ctx, s2, x + 34, y + 58 + i * 40, i === 0 ? C.text : C.text2, 'left', i === 0 ? 28 : 24)); if (meta) metaText(ctx, meta, x + w - 30, y + h - 26, C.grain, 'right', 22); }); }
// staaf in een grafiek
function SP9_staaf(ctx, cx, base, bw, hv, kl, lab, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (hv > 1) { roundRect(ctx, cx - bw / 2, base - hv, bw, hv, 6); shape(ctx, rgba(kl, 0.55), kl, 2); }
  (Array.isArray(lab) ? lab : [lab]).forEach((l, i) => metaText(ctx, l, cx, base + 36 + i * 28, o.labKl || C.text2, 'center', 22)); ctx.restore(); }

// twee nachten als rijen met elk een eigen tijdas (20:00–08:00) en de bedtijd; a = [rij1, rij2]
function SP9_bedRijen(ctx, a, y0 = 430) { const x0 = 640, x1 = 1660, span = 12, X = u => x0 + (x1 - x0) * (((u - 20 + 24) % 24) / span);
  const rijen = [['VOOR EEN RUSTDAG', 0.53, '00:32', C.teal], ['VOOR EEN TRAINING OM 06:00', 22.08, '22:05', C.koraal]];
  rijen.forEach(([lab, u, tijd, kl], i) => SP9_laag(ctx, a[i], () => { const y = y0 + i * 110; metaText(ctx, lab, 160, y + 8, kl, 'left', 24);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    for (let h = 0; h <= span; h += 2) { const xx = x0 + (x1 - x0) * h / span; ctx.beginPath(); ctx.moveTo(xx, y - 7); ctx.lineTo(xx, y + 7); ctx.stroke(); if (i === 1 || a[1] < 0.5) metaText(ctx, String((20 + h) % 24).padStart(2, '0') + ':00', xx, y + 36, C.text2, 'center', 18); }
    const xx = X(u); ctx.strokeStyle = kl; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(xx, y - 30); ctx.lineTo(xx, y + 8); ctx.stroke(); SP9_maan(ctx, xx - 30, y - 30, 14); metaText(ctx, 'NAAR BED ' + tijd, xx + 10, y - 22, kl, 'left', 22); })); }
// Wat word jij? · Sport en topsport 9 · Topsport en school — scènes per alinea (v1.0, 20 nov 2026).
// Look: Schema met cast. De zwemmer (Sam: 'zwem' in het bad, 'school' in de klas en de mentorkamer, pyjama in bed), de zwemtrainer ('zwemtrainer'),
// de mentor/topsportcoördinator (mevrouw Visser, 'visser', zonder naam), klasgenoten als castfiguranten (noor, bilal, lotte, yasmin) zonder naam.
// Terugspoelbalk bovenin groeit per hoofdstuk; de stapel 'TOTALE BELASTING' (MODEL) krijgt per stap terug een blok.

const SP9_SX = 1400, SP9_SY = 800; // standaardplek van de stapel (rechts)

Object.assign(SCENES, {
  title(ctx, t) { ctx.save(); const wl = 640; ctx.fillStyle = SP9.water; ctx.fillRect(1000, wl, 920, 236); ctx.strokeStyle = SP9.waterL; ctx.lineWidth = 3; ctx.beginPath();
    for (let x = 1000; x <= 1920; x += 12) { const yy = wl + Math.sin(x / 60 + t * 1.5) * 3; x === 1000 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke();
    ctx.fillStyle = SP9.dek; ctx.fillRect(1000, wl - 30, 920, 26); ctx.fillStyle = SP9.dekL; ctx.fillRect(1000, wl - 30, 920, 5);
    for (let k = 0; k < 3; k++) { const u = ((t * 0.35 + k / 3) % 1); ctx.strokeStyle = rgba(C.teal, 0.8 * (1 - u)); ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1460, wl + 110, 40 + u * 360, 12 + u * 70, 0, 0, 6.283); ctx.stroke(); }
    ctx.restore(); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const muur = 360, wl = 560, L = 300, st = q.at('stopt') + 0.2, B = t >= st;
    SP9_badZij(ctx, muur, wl, t); SP9_lijnen(ctx, muur, wl - 6);
    SP9_digi(ctx, 1640, 230, 'DO 16:40', 1, C.text, 40);
    // zwemtrainer op de kant, gebaart na het stoppen naar de kant
    const gb = q.on('schouder', 1, 0.4);
    persoon(ctx, 'zwemtrainer', 190, wl - 26, 400, { pose: gb > 0.5 ? 'wijs' : 'staan', kijk: 1, uit: gb > 0.5 ? 'praat' : 'neutraal', t });
    if (!B) { SP9_water(ctx, muur, wl, t); const x = 520 + 1.7 * (L / 1.79) * t; zwemmer(ctx, 'sam', x, wl + 0.12 * L, L, { slag: 'crawl', t }); SP9_kopwand(ctx, muur, wl); }
    else { const hand = q.on('schouder', 1, 0.6), h = 560, sx = 960; ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 872); ctx.clip();
      const r = persoon(ctx, 'sam', sx, wl + h * 0.5, h, { outfit: 'zwem', zij: true, kijk: -1, bril: 'muts', uit: hand > 0.5 ? 'bezorgd' : 'neutraal', t, arm: [lerp(0.15, 1.15, hand), lerp(0.1, 2.5, hand)], armVer: [0.1, 0.3] }); ctx.restore();
      SP9_water(ctx, muur, wl, t, 1 - ramp(t, st + 0.3, 2.5), sx); SP9_kopwand(ctx, muur, wl);
      if (r.handR && r.handR.shx != null) SP9_laag(ctx, hand, () => { ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(r.handR.shx, r.handR.shy, 46 + 4 * Math.sin(t * 5), 0, 6.283); ctx.stroke(); }); }
    // stapel en puzzel
    const Bl = q.on('Vreemd', 1, 0.6), Pz = q.on('Hoe', 1, 0.5);
    SP9_stapel(ctx, SP9_SX, SP9_SY, [SP9_blok('training', Bl)], Bl, { titel: Bl });
    SP9_laag(ctx, q.on('toetsweek', 1, 0.4) * (1 - Pz), () => SP9_label(ctx, 'TOETSWEEK', 1400, 450, 1, C.paars));
    SP9_laag(ctx, Pz, () => { SP9_kaart(ctx, 1240, 300, 600, 220, 1, C.goud); text(ctx, 'Niet harder getraind,', 1280, 380, fTitel(50), C.text, 'left'); text(ctx, 'toch pijn?', 1280, 444, fTitel(50), C.text, 'left'); metaText(ctx, 'WAT DENK JE?', 1280, 496, C.goud, 'left', 24); });
    SP9_spoel(ctx, 1, ramp(t, 0.3, 0.6), { tik: clamp((t - q.at('spoelen')) / 0.6, 0, 1) }); },

  // ---------- H1 ----------
  s03(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 1);
    const tk = q.on('tikt', 1, 0.5);
    persoon(ctx, 'zwemtrainer', 250, zit - 10, 460, { pose: 'wijs', kijk: 1, uit: t < 2.2 ? 'neutraal' : 'praat', t });
    const r = persoon(ctx, 'sam', 560, zit + 110, 440, { outfit: 'zwem', pose: 'zit', zitHoogte: 110, bril: 'muts', uit: 'neutraal', t, pose2: 0, hold: (c, x, y) => SP9_telHand(c, x, y) });
    SP9_handdoek(ctx, r, 1); SP9_waterFront(ctx, wl, t);
    const sc = q.on('cijfer', 1, 0.5), fo = q.on('minuten', 1, 0.5), Ru = q.on('rustig', 1, 0.4), Sc = q.on('scherm', 1, 0.4);
    SP9_tablet(ctx, 900, 160, 920, 600, q.on('tablet', 1, 0.5), (x, y, w, h) => {
      SP9_laag(ctx, 1 - Ru, () => {
        SP9_laag(ctx, sc, () => { metaText(ctx, 'HOE ZWAAR VOELDE HET?', x + 40, y + 70, C.text, 'left', 26);
          for (let i = 1; i <= 10; i++) { const cx = x + 70 + (i - 1) * 78, act = i === 7 && t > q.at('één') ; circ(ctx, cx, y + 150, 30, act ? rgba(C.oker, 0.85) : '#24304A', act ? C.oker : '#56627E', 2); text(ctx, String(i), cx, y + 162, fTekst(30, 800), act ? '#121A26' : C.text, 'center'); } });
        SP9_laag(ctx, fo, () => { text(ctx, '90 min × 7 = 630', x + 40, y + 300, fTitel(66), C.text, 'left'); metaText(ctx, 'TRAININGSBELASTING', x + 40, y + 360, C.oker, 'left', 26); }); });
      SP9_laag(ctx, Ru, () => { const base = y + h - 90; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 80, base); ctx.lineTo(x + w - 60, base); ctx.stroke();
        SP9_staaf(ctx, x + w * 0.32, base, 160, 110 * ramp(t, q.at('rustig'), 0.8), C.oker, 'UUR RUSTIG', 1);
        SP9_staaf(ctx, x + w * 0.68, base, 160, 330 * ramp(t, q.at('sprintseries'), 0.8), C.oker, 'UUR SPRINTSERIES', q.on('sprintseries', 1, 0.3)); });
      SP9_laag(ctx, Sc, () => { ctx.strokeStyle = C.oker; ctx.lineWidth = 5; roundRect(ctx, x + 6, y + 6, w - 12, h - 12, 12); ctx.stroke(); });
    });
    SP9_laag(ctx, Sc, () => SP9_label(ctx, 'TABLET: ALLEEN TRAINING', 1360, 820, 1, C.oker, 'center', 24));
    SP9_meta(ctx, 'HADDAD E.A. 2017', 1820, 820, q.on('clubs', 1, 0.4) * (1 - Sc), C.grain, 'right', 24); },

  s04(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 1);
    const groei = ramp(t, 0.5, 1.6), Dk = q.on('denk', 1, 0.4);
    SP9_tablet(ctx, 160, 150, 1140, 700, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, groei, { streep: q.on('precies', 1, 0.6) }));
    for (let i = 0; i < 3; i++) SP9_kaart(ctx, 1400, 210 + i * 200, 420, 160, ramp(t, q.at('denk') + i * 0.15, 0.3), C.text2);
    SP9_laag(ctx, Dk, () => metaText(ctx, 'WAT DENK JE?', 1400, 190, C.goud, 'left', 24)); },

  s06(ctx, t, q) { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_antw(ctx, 'antwoord c: buiten het water kwam er iets bij');
    SP9_spoel(ctx, 1 + ramp(t, q.at('Daarvoor'), 0.9), 1, { tik: clamp((t - q.at('Daarvoor')) / 0.6, 0, 1) });
    persoon(ctx, 'zwemtrainer', 240, zit - 10, 370, { kijk: 1, uit: 'neutraal', t });
    SP9_tablet(ctx, 420, 240, 820, 520, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, 1, { chips: q.on('Pech', 1, 0.4) * (1 - q.on('bijkwam', 1, 0.4)) }));
    const V = q.on('buiten', 1, 0.5); vraagteken(ctx, 1560, 470, V, 200); SP9_laag(ctx, V, () => SP9_label(ctx, 'BUITEN HET WATER?', 1560, 600, 1, C.goud, 'center'));
    SP9_laag(ctx, q.on('oorzaak', 1, 0.4), () => metaText(ctx, 'ZELDEN ÉÉN OORZAAK', 1560, 700, C.text2, 'center', 24));
    SP9_waterFront(ctx, wl, t); },

  // ---------- H2 ----------
  s07(ctx, t, q) { const av = t >= q.at('avond') - 0.2, wek = !av; SP9_kamer(ctx, 0); SP9_spoel(ctx, 2);
    SP9_nachtkastje(ctx, 700, 670, 200, 170);
    const kl = av ? (t < q.at('twintig') ? '22:00' : (() => { const m = Math.round(clamp((t - q.at('twintig')) / 1.2, 0, 1) * 100); const tot = 22 * 60 + m; return String(Math.floor(tot / 60)).padStart(2, '0') + ':' + String(tot % 60).padStart(2, '0'); })()) : '05:00';
    SP9_digi(ctx, 800, 650, kl, 1, C.koraal, 40, wek ? (Math.sin(t * 22) > 0 ? t : 0) : 0);
    const slaapt = wek ? (t < 0.9) : (t > q.at('sliep') + 0.4 && t < q.at('Dat') + 0.2);
    const bh = SP9_bed(ctx, 'sam', 160, 765, 400, { t, uit: slaapt ? 'slaapt' : 'neutraal' });
    // zoomcirkel naast het hoofd: biologische klok en slaapdruk
    const Z = q.on('puberteit', 1, 0.5), sd = q.on('slaapdruk', 1, 0.5);
    zoomCircle(ctx, 1140, 400, 180, bh.hoofd.x + 70, bh.hoofd.y - 40, '', Z, () => { bg(ctx, 'schema'); SP9_bioklok(ctx, sd > 0.01 ? lerp(1140, 1070, sd) : 1140, 400, sd > 0.01 ? lerp(130, 95, sd) : 130, ramp(t, q.at('later'), 1.4));
      SP9_laag(ctx, sd, () => { const bx = 1190, by = 310, bhh = 170; metaText(ctx, 'SLAAPDRUK', bx + 28, by + bhh + 34, C.teal, 'center', 18); roundRect(ctx, bx, by, 56, bhh, 14); shape(ctx, '#1B2236', C.teal, 2.5); const f = clamp((t - q.at('slaapdruk')) / 6, 0, 1) * 0.55; ctx.fillStyle = rgba(C.teal, 0.85); ctx.fillRect(bx + 6, by + bhh - 6 - (bhh - 12) * f, 44, (bhh - 12) * f); }); });
    SP9_laag(ctx, Z, () => { metaText(ctx, 'BIOLOGISCHE KLOK', 1140, 625, C.teal, 'center', 24); metaText(ctx, 'PUBERTEIT: LATER', 1140, 657, C.teal, 'center', 24); });
    SP9_laag(ctx, sd, () => metaText(ctx, 'VEREENVOUDIGD', 1140, 692, C.grain, 'center', 22));
    SP9_meta(ctx, 'CARSKADON & TAROKH 2014', 1140, 730, q.on('onderzoek', 1, 0.4), C.grain, 'center', 22);
    const M = q.on('sliep', 1, 0.6);
    SP9_stapel(ctx, 1400, SP9_SY, [SP9_blok('training'), SP9_blok('slaap', M)], 1); },

  s08(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2);
    SP9_studie(ctx, 160, 180, 1000, 150, ['7 TOPZWEMMERS', 'AANLOOP OLYMPISCHE SPELEN · 14 DAGEN'], 'SARGENT E.A. 2014', q.on('Onderzoekers', 1, 0.5));
    SP9_bedRijen(ctx, [q.on('avond', 1, 0.5), q.on('eerder', 1, 0.5)]);
    const D = q.on('Haalden', 1, 0.5); SP9_laag(ctx, D, () => { metaText(ctx, 'SLAAPDUUR', 160, 690, C.text, 'left', 24);
      [['RUSTDAG', C.teal], ['TRAINING', C.koraal]].forEach(([l, kl], i) => { const yy = 715 + i * 70; metaText(ctx, l, 160, yy + 34, kl, 'left', 22); roundRect(ctx, 640, yy, 1020, 46, 10); shape(ctx, 'rgba(0,0,0,0)', rgba(kl, 0.7), 2); });
      vraagteken(ctx, 1760, 820, 1, 110); }); },

  s10(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2); SP9_antw(ctx, 'antwoord b: toch bijna twee uur korter');
    const IJ = q.on('IJsland', 1, 0.5);
    SP9_laag(ctx, 1 - IJ, () => { SP9_studie(ctx, 160, 250, 1000, 130, ['7 TOPZWEMMERS', 'AANLOOP OLYMPISCHE SPELEN · 14 DAGEN'], 'SARGENT E.A. 2014', 1); SP9_bedRijen(ctx, [1, 1]); });
    SP9_laag(ctx, IJ, () => SP9_studie(ctx, 160, 280, 1400, 240, ['108 TIENERZWEMMERS · IJSLAND · GEMIDDELD 16 JAAR', 'VOOR EEN VROEGE TRAINING ± 5 TOT 5,5 UUR'], 'GUDMUNDSDOTTIR 2020', 1));
    metaText(ctx, 'SLAAPDUUR', 160, 690, C.text, 'left', 24); const sch = 1020 / 8;
    [['RUSTDAG', C.teal, 7.1, '7,1 UUR', q.on('rustdag', 1, 1.0)], ['TRAINING', C.koraal, 5.4, '5,4 UUR', q.on('vijfenhalf', 1, 1.0)]].forEach(([l, kl, v, lab, f], i) => { const yy = 715 + i * 70; metaText(ctx, l, 160, yy + 34, kl, 'left', 22); roundRect(ctx, 640, yy, 1020, 46, 10); shape(ctx, 'rgba(0,0,0,0)', rgba(kl, 0.5), 2);
      if (f > 0.01) { roundRect(ctx, 640, yy, sch * v * ease(f), 46, 10); shape(ctx, rgba(kl, 0.7), kl, 2); } SP9_laag(ctx, f, () => metaText(ctx, lab, 640 + sch * v * ease(f) + 20, yy + 34, kl, 'left', 26)); });
    SP9_laag(ctx, SP9_fase(t, q.at('Slaapexperts'), q.at('IJsland') + 0.2, 0.4), () => { SP9_label(ctx, 'VROEG TRAINEN KOST SLAAP', 1820, 300, 1, C.koraal, 'right'); metaText(ctx, 'WALSH E.A. 2021', 1820, 350, C.grain, 'right', 22); }); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 2 + ramp(t, 0.1, 0.9));
    const X = SP9_nachtAs(ctx, 260, 1660, 360, 20, 10, 1);
    metaText(ctx, 'DE NACHT', 260, 230, C.teal, 'left', 26);
    const s0 = X(23 + 40 / 60), s1 = X(5); ctx.save(); roundRect(ctx, s0, 280, (s1 - s0) * ramp(t, 0.6, 1.2), 40, 10); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); ctx.restore();
    SP9_meta(ctx, '23:40 – 05:00', (s0 + s1) / 2, 266, ramp(t, 1.4, 0.4), C.teal, 'center', 22);
    const Ad = q.on('acht', 1, 0.5); SP9_laag(ctx, Ad, () => { const a0 = X(21), a1 = X(5), b0 = X(19 + 0.01); SP9_lijn(ctx, [[a0, 450], [a1, 450]], C.teal, 6, 1, [14, 10]); metaText(ctx, 'ADVIES 8 TOT 10 UUR', a0, 440 - 14, C.teal, 'left', 22); });
    const kaarten = [['HERSTEL', q.on('herstelt', 1, 0.5)], ['AFWEER', q.on('afweer', 1, 0.5)], ['LEREN', q.on('brein', 1, 0.5)]];
    kaarten.forEach(([l, a], i) => SP9_laag(ctx, a, () => { const x = 260 + i * 480, y = 560; SP9_kaart(ctx, x, y, 420, 220, 1, C.teal); metaText(ctx, l, x + 210, y + 60, C.teal, 'center', 28);
      roundRect(ctx, x + 50, y + 110, 320, 50, 12); shape(ctx, '#1B2236', rgba(C.teal, 0.7), 2); const f = 0.5 * ease(clamp((t - q.at(['herstelt', 'afweer', 'brein'][i]) - 0.4) / 1.4, 0, 1)); roundRect(ctx, x + 50, y + 110, Math.max(1, 320 * f), 50, 12); shape(ctx, rgba(C.teal, 0.8), null); metaText(ctx, 'HALF', x + 210, y + 200, C.text2, 'center', 22); }));
    SP9_meta(ctx, 'WALSH E.A. 2021', 1820, 820, q.on('slaap', 1, 0.4), C.grain, 'right', 22); },

  s12(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 3);
    metaText(ctx, 'TIENERS DIE SPORTEN', 300, 220, C.text, 'left', 28); const base = 720; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(300, base); ctx.lineTo(1300, base); ctx.stroke();
    metaText(ctx, 'BLESSURES', 300, 280, C.text2, 'left', 22);
    SP9_staaf(ctx, 560, base, 220, 220, '#8A93A6', 'MINDER DAN 8 UUR', 1); SP9_staaf(ctx, 1040, base, 220, 220, '#8A93A6', '8 UUR OF MEER', 1);
    vraagteken(ctx, 1560, 560, 1, 220); },

  s14(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 3); SP9_antw(ctx, 'antwoord a: wie kort sliep, raakte vaker geblesseerd');
    const P = q.on('proefpersonen', 1, 0.5), Tr = q.on('verwerken', 1, 0.5);
    SP9_laag(ctx, 1 - P, () => { metaText(ctx, 'TIENERS DIE SPORTEN', 300, 290, C.text, 'left', 28); const base = 740; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 350); ctx.lineTo(300, base); ctx.lineTo(1300, base); ctx.stroke(); metaText(ctx, 'BLESSURES', 300, 330, C.text2, 'left', 22);
      const g = q.on('geblesseerd', 1, 1.0); SP9_staaf(ctx, 560, base, 220, lerp(220, 350, g), SP9_mix('#8A93A6', '#E07A5F', g), 'MINDER DAN 8 UUR', 1); SP9_staaf(ctx, 1040, base, 220, 220, '#8A93A6', '8 UUR OF MEER', 1);
      SP9_laag(ctx, g, () => { SP9_label(ctx, 'MEERDERE ONDERZOEKEN SAMEN', 1400, 450, 1, C.koraal); metaText(ctx, 'GAO E.A. 2019', 1400, 510, C.grain, 'left', 22); }); });
    SP9_laag(ctx, P * (1 - Tr), () => { SP9_studie(ctx, 160, 250, 1600, 500, ['164 PROEFPERSONEN', 'VERKOUDHEIDSVIRUS IN DE NEUS'], 'PRATHER E.A. 2015', 1);
      const r1 = q.on('korter', 1, 0.5), r2 = q.on('zeven', 1, 0.5);
      SP9_laag(ctx, r1, () => { metaText(ctx, 'MINDER DAN 6 UUR', 220, 450, C.koraal, 'left', 30); pijl(ctx, 720, 440, 960, 440, C.koraal, 1, 5, 20); text(ctx, 'vaker verkouden', 1000, 452, fTekst(44, 800), C.koraal, 'left'); });
      SP9_laag(ctx, r2, () => { metaText(ctx, 'MEER DAN 7 UUR', 220, 560, C.teal, 'left', 30); });
      SP9_laag(ctx, q.on('samenhang', 1, 0.4), () => SP9_label(ctx, 'ODDS RUIM 4× · BREDE MARGE · SAMENHANG', 220, 680, 1, C.text2, 'left', 24)); });
    SP9_laag(ctx, Tr, () => { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); SP9_spoel(ctx, 3); persoon(ctx, 'zwemtrainer', 560, zit - 10, 480, { pose: 'wijs', kijk: 1, uit: Math.sin(t * 8) > -0.3 && t < q.at('zegt') + 0.3 ? 'praat' : 'neutraal', t });
      SP9_tablet(ctx, 820, 330, 300, 220, 1, (x, y, w, h) => { for (let i = 0; i < 4; i++) { roundRect(ctx, x + 30 + i * 55, y + h - 30 - 90, 36, 90, 4); shape(ctx, rgba(C.oker, 0.6), C.oker, 1.5); } });
      SP9_kaart(ctx, 1180, 260, 640, 210, 1, C.oker); text(ctx, 'Wat je niet verwerkt,', 1220, 340, fTitel(46), C.text, 'left'); text(ctx, 'is geen training.', 1220, 404, fTitel(46), C.text, 'left'); metaText(ctx, 'DE ZWEMTRAINER', 1220, 448, C.oker, 'left', 22);
      SP9_waterFront(ctx, wl, t); }); },

  // ---------- H4 ----------
  s15(ctx, t, q) { SP9_lokaal(ctx); SP9_spoel(ctx, 3 + ramp(t, 0.1, 0.9));
    const tafel = 640, tik = t > q.at('gespannen') ? t : 0;
    // klasgenoten en de zwemmer aan tafeltjes (vooraanzicht), de mentor surveilleert voorin
    persoon(ctx, 'visser', 1300, 820, 420, { kijk: -1, uit: 'neutraal', t });
    const lln = [['noor', 200], ['sam', 560], ['bilal', 900], ['yasmin', 1200]];
    for (const [id, x] of lln) { const zw = id === 'sam'; persoon(ctx, id, x, 820, 380, { outfit: 'school', pose: 'zit', stoel: true, tafel, kijk: zw ? 1 : (x < 600 ? 1 : -1), uit: zw && t > q.at('gespannen') - 0.3 ? 'bezorgd' : 'neutraal', t, hold: zw ? (c, hx, hy, an) => SP9_pen(c, hx, hy, an, tik) : null });
      SP9_tafel(ctx, x, tafel, 260); SP9_toetsblad(ctx, x, tafel - 4); }
    // stapel met een leeg blok (tijdens de vraag)
    const Q = q.on('Telt', 1, 0.5);
    SP9_stapel(ctx, 1400, SP9_SY, [SP9_blok('training'), SP9_blok('slaap'), SP9_blok('leeg', Q)], 1); },

  s17(ctx, t, q) { const D = q.on('Daarom', 1, 0.4), Sp = q.on('spanning', 1, 0.6), Mo = q.on('model', 1, 0.5);
    if (D < 1) SP9_laag(ctx, 1, () => { SP9_lokaal(ctx);
      persoon(ctx, 'visser', 1150, 820, 420, { kijk: -1, uit: 'neutraal', t }); persoon(ctx, 'sam', 560, 820, 380, { outfit: 'school', pose: 'zit', stoel: true, tafel: 640, kijk: 1, uit: 'bezorgd', t }); SP9_tafel(ctx, 560, 640, 260); SP9_toetsblad(ctx, 560, 636); });
    if (D > 0) SP9_laag(ctx, D, () => { const zit = 640, wl = 760; SP9_badrand(ctx, zit, wl, t); persoon(ctx, 'zwemtrainer', 200, zit - 10, 430, { pose: 'wijs', kijk: 1, uit: 'neutraal', t });
      const vr = [q.on('sliep', 1, 0.4), q.on('energie', 1, 0.4), q.on('druk', 1, 0.4)];
      SP9_tablet(ctx, 400, 160, 920, 660, 1, (x, y, w, h) => SP9_ochtend(ctx, x, y, w, h, clamp((t - q.at('Vanaf')) / 3.5, 0, 1), { vragenA: vr }));
      SP9_waterFront(ctx, wl, t); SP9_meta(ctx, 'SOLIGARD E.A. 2016', 1320, 860, q.on('Sportartsen', 1, 0.4), C.grain, 'right', 22); });
    SP9_antw(ctx, 'antwoord b: spanning telt, korte nachten kosten herstel', 1 - D);
    SP9_spoel(ctx, 4);
    const blokken = [SP9_blok('training'), SP9_blok('slaap'), Sp < 0.5 ? SP9_blok('leeg') : SP9_blok('toets')];
    if (Sp > 0 && Sp < 1) blokken[2] = Object.assign(SP9_blok('toets'), { a: 1 });
    SP9_stapel(ctx, 1400, SP9_SY, blokken, 1, { titel: 1 - Mo });
    SP9_laag(ctx, Mo, () => { SP9_label(ctx, 'TOTALE BELASTING', 1400, 360, 1, C.goud, 'left', 28); metaText(ctx, 'ÉÉN HERSTEL · MODEL', 1400, 410, C.grain, 'left', 22); }); },

  s18(ctx, t, q) { bg(ctx, 'schema'); SP9_spoel(ctx, 4);
    const Z = q.on('Zweden', 1, 0.8), Tb = q.on('tablet', 1, 0.5);
    SP9_laag(ctx, (1 - clamp(Z * 2, 0, 1)) * (1 - Tb), () => { SP9_studie(ctx, 160, 170, 1600, 640, ['UNIVERSITEIT · AMERIKAANS VOETBAL · 101 SPELERS', 'BLESSURES PER SOORT WEEK'], 'MANN E.A. 2016', 1); const base = 700, e = 120;
      SP9_staaf(ctx, 560, base, 220, e, '#8A93A6', 'GEWONE WEEK', ramp(t, 0.4, 0.5));
      const tw = q.on('toetsweken', 1, 0.8); SP9_staaf(ctx, 960, base, 220, e * 1.78 * ease(tw), C.koraal, 'TOETSWEEK', tw); SP9_laag(ctx, tw, () => metaText(ctx, 'ODDS BIJNA 2×', 960, base - e * 1.78 - 24, C.koraal, 'center', 24));
      const tk = q.on('gewone', 1, 0.8); SP9_staaf(ctx, 1360, base, 220, e * 3.65 * ease(tk), C.koraal, 'TRAININGSKAMP', tk); });
    SP9_laag(ctx, clamp(Z * 2 - 1, 0, 1) * (1 - Tb), () => { SP9_studie(ctx, 160, 170, 1600, 640, ['BIJNA 500 TIENERS · 15 TOT 19 JAAR · 16 SPORTEN · ZWEDEN', 'BLESSURERISICO'], 'VON ROSEN E.A. 2017', 1); const base = 700, e = 150;
      SP9_staaf(ctx, 700, base, 240, e, '#8A93A6', 'GEEN VERANDERING', 1); const r = q.on('ruim', 1, 0.8); SP9_staaf(ctx, 1220, base, 240, e * 2.25 * ease(r), C.koraal, ['MEER TRAINING', '+ MINDER SLAAP'], q.on('sliepen', 1, 0.4)); SP9_laag(ctx, r, () => metaText(ctx, 'RUIM 2×', 1220, base - e * 2.25 - 24, C.koraal, 'center', 26));
      SP9_laag(ctx, q.on('samenhang', 1, 0.4), () => SP9_label(ctx, 'SAMENHANG · GEEN BEWIJS VAN OORZAAK', 220, 330, 1, C.text2, 'left', 24)); });
    SP9_laag(ctx, Tb, () => { SP9_tablet(ctx, 160, 200, 760, 560, 1, (x, y, w, h) => SP9_weekGrafiek(ctx, x, y, w, h, 1)); SP9_tablet(ctx, 1000, 200, 760, 560, 1, (x, y, w, h) => SP9_ochtend(ctx, x, y, w, h, 1, { vragen: false, kleur: [C.koraal, C.koraal, C.paars] }));
      SP9_laag(ctx, q.on('ochtendlijst', 1, 0.4), () => { ctx.strokeStyle = C.goud; ctx.lineWidth = 6; roundRect(ctx, 990, 190, 780, 580, 30); ctx.stroke(); }); }); },

  // ---------- H5 ----------
  s19(ctx, t, q) { const M = q.on('Topsport', 1, 0.5), Wv = q.on('Wat', 1, 0.5);
    bg(ctx, 'schema'); SP9_spoel(ctx, 4 + ramp(t, 0.1, 0.9));
    SP9_laag(ctx, 1 - M, () => { SP9_laptop(ctx, 200, 250, 700, 1, ramp(t, q.at('online'), 0.8)); SP9_klembord(ctx, 1080, 240, 640, 470, q.on('trainingsplan', 1, 0.5));
      SP9_laag(ctx, q.on('half', 1, 0.4), () => SP9_label(ctx, '2× 05:30', 1400, 790, 1, C.oker, 'center', 26));
      SP9_laag(ctx, q.on('niemand', 1, 0.5), () => { kruis(ctx, 990, 480, 26, 1, C.text2); metaText(ctx, 'LOS VAN ELKAAR', 990, 580, C.text2, 'center', 22); }); });
    SP9_laag(ctx, M, () => { const vl = 820; SP9_kamerMentor(ctx, vl); SP9_spoel(ctx, 5); const tafel = 640;
      roundRect(ctx, 520, tafel, 700, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(560, tafel + 22, 16, vl - tafel - 22); ctx.fillRect(1164, tafel + 22, 16, vl - tafel - 22);
      SP9_laag(ctx, q.on('mentor', 1, 0.3), () => persoon(ctx, 'visser', 420, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: 'neutraal', t }));
      persoon(ctx, 'sam', 1320, vl, 410, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: 'neutraal', t });
      // de twee roosters los naast elkaar op tafel
      SP9_laag(ctx, Wv, () => { SP9_rooster(ctx, 600, 420, 280, 210, 'toets', 1); SP9_rooster(ctx, 900, 420, 280, 210, 'training', 1); });
      const kk = [['TOPSPORT TALENTSCHOOL', "ZO'N 30 IN NEDERLAND", q.on('Talentschool', 1, 0.4), C.goud], ['TALENTSTATUS', 'VIA DE SPORTBOND', q.on('sportbond', 1, 0.4), C.text], ['TOPSPORTCOÖRDINATOR', '', q.on('topsportco', 1, 0.4), C.goud]];
      kk.forEach(([a1, a2, a, kl], i) => SP9_laag(ctx, a * (1 - Wv * 0.0), () => { const x = 560 + i * 0, y = 170 + i * 0; const bx = [440, 900, 1360][i]; SP9_kaart(ctx, bx, 160, 420, a2 ? 130 : 90, 1, kl); metaText(ctx, a1, bx + 20, 210, kl, 'left', 24); if (a2) metaText(ctx, a2, bx + 20, 254, C.text2, 'left', 22); })); }); },

  s21(ctx, t, q) { const Ik = q.on('Ik', 1, 0.4), Na = q.on('leggen', 1, 0.5); bg(ctx, 'schema'); SP9_spoel(ctx, 5);
    SP9_laag(ctx, 1 - Ik, () => { SP9_antw(ctx, 'antwoord a: samen met de trainer anders plannen');
      const sm = q.on('Toetsen', 1, 1.2); // roosters schuiven in elkaar
      SP9_laag(ctx, 1 - sm, () => { SP9_rooster(ctx, lerp(160, 260, sm), 280, 700, 480, 'toets', 1); SP9_rooster(ctx, lerp(1000, 900, sm), 280, 700, 480, 'training', 1); });
      SP9_week(ctx, 160, 250, 1000, 560, sm, { schuifT: ramp(t, q.at('moment') - 0.4, 1.0) });
      SP9_laag(ctx, q.on('examen', 1, 0.4), () => SP9_label(ctx, 'GESPREID EXAMEN · 2 SCHOOLJAREN', 1240, 360, 1, C.goud, 'left', 24));
      SP9_laag(ctx, q.on('ontheffing', 1, 0.4), () => SP9_label(ctx, 'ONTHEFFING LO', 1240, 460, 1, C.goud, 'left', 24));
      SP9_meta(ctx, 'DUO · EURYDICE · KNVB · 2026', 1240, 540, q.on('ontheffing', 1, 0.4), C.grain, 'left', 22);
      SP9_laag(ctx, q.on('stof', 1, 0.4), () => metaText(ctx, 'DE STOF BLIJFT', 1240, 640, C.text2, 'left', 24)); });
    SP9_laag(ctx, Ik, () => { const vl = 820, tafel = 640; SP9_kamerMentor(ctx, vl); SP9_spoel(ctx, 5);
      roundRect(ctx, 460, tafel, 700, 22, 6); shape(ctx, '#8A7058', '#6A5440', 2); ctx.fillStyle = '#6A5440'; ctx.fillRect(500, tafel + 22, 16, vl - tafel - 22); ctx.fillRect(1104, tafel + 22, 16, vl - tafel - 22);
      const praat = t > q.at('Ik') && t < q.at('leggen') - 0.6 && Math.sin(t * 9) > -0.3;
      persoon(ctx, 'visser', 360, vl, 400, { zij: true, kijk: 1, pose: 'zit', stoel: true, tafel, uit: praat ? 'praat' : 'blij', t });
      SP9_laptopTrainer(ctx, 810, tafel, t, ramp(t, q.at('Ik'), 0.4), 1);
      persoon(ctx, 'sam', 1240, vl, 410, { outfit: 'school', zij: true, kijk: -1, pose: 'zit', stoel: true, tafel, uit: t > q.at('week') ? 'blij' : 'neutraal', t });
      SP9_laag(ctx, SP9_fase(t, q.at('kijk', 1), q.at('leggen'), 0.4), () => { SP9_kaart(ctx, 700, 170, 760, 150, 1, C.goud); text(ctx, 'Ik kijk naar je hele week.', 740, 262, fTitel(46), C.text, 'left'); });
      SP9_laag(ctx, Na, () => { SP9_week(ctx, 1340, 170, 500, 340, 1, { schuifT: 1, schuifW: ramp(t, q.at('schuift'), 1.2) });
        const k = ramp(t, q.at('schuift') + 0.4, 1.2); metaText(ctx, 'SLAAP NA DINSDAG', 1340, 560, C.teal, 'left', 22); roundRect(ctx, 1340, 580, 500 * lerp(0.55, 0.95, k), 34, 8); shape(ctx, rgba(C.teal, 0.75), C.teal, 2); }); }); },

  // ---------- Recap ----------
  s22(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('Daarom', 1, 0.6);
    SP9_spoel(ctx, 5, 1, { alles: true, iconen: true });
    const kk = [q.on('toetsen', 1, 0.4), q.on('nachten', 1, 0.4), q.on('klok', 1, 0.4)];
    SP9_laag(ctx, 1 - N, () => { SP9_stapel(ctx, 160, 820, [SP9_blok('training', 1, { t2: 'ZELFDE' }), SP9_blok('toets', kk[0]), SP9_blok('slaap', kk[1])], 1, { w: 460 });
      SP9_laag(ctx, kk[2], () => SP9_label(ctx, 'KLOK STAAT LATER', 660, 640, 1, C.teal, 'left', 24));
      const V = q.on('oorzaak', 1, 0.4); SP9_laag(ctx, V, () => { vraagteken(ctx, 1000, 420, 1, 120); SP9_label(ctx, 'ÉÉN GEVAL', 1000, 500, 1, C.koraal, 'center', 24); });
      const O = q.on('onderzoek', 1, 0.4); SP9_laag(ctx, O, () => { SP9_studie(ctx, 1220, 300, 600, 150, ['TOETSWEKEN · 101 SPELERS', 'ODDS BIJNA 2×'], 'MANN E.A. 2016', 1); SP9_studie(ctx, 1220, 480, 600, 150, ['MEER TRAINING + MINDER SLAAP', 'RUIM 2× · ZWEDEN'], 'VON ROSEN E.A. 2017', 1); SP9_meta(ctx, 'SAMENHANG', 1220, 680, 1, C.text2, 'left', 22); }); });
    SP9_laag(ctx, N, () => { metaText(ctx, 'DE NIEUWE WEEK', 160, 330, C.goud, 'left', 26); SP9_week(ctx, 160, 360, 900, 440, 1, { schuifT: 1, schuifW: 1 });
      SP9_stapel(ctx, 1180, 820, [SP9_blok('training', 1, { t2: '' }), SP9_blok('slaap', 1, { krimp: 0.45, t1: 'SLAAP' }), SP9_blok('toets', 1, { krimp: 0.6 })], 1, { w: 300, titelY: 560 });
      const p = ramp(t, q.at('naast') - 0.2, 1.0); SP9_laag(ctx, p, () => { pijl(ctx, 1560, 700, 1560 + 220 * ease(p), 460, C.teal, 1, 16, 40); metaText(ctx, 'HERSTEL', 1580, 760, C.teal, 'left', 28); }); }); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const vl = 760;
    persoon(ctx, 'visser', 300, vl, 420, { kijk: 1, uit: 'blij', t }); persoon(ctx, 'zwemtrainer', 640, vl, 430, { kijk: -1, uit: 'blij', t });
    SP9_label(ctx, 'TOPSPORTCOÖRDINATOR · OP SCHOOL', 300, 840, q.on('topsportco', 1, 0.4), C.goud, 'center', 22);
    SP9_label(ctx, 'ZWEMTRAINER', 700, 220, q.on('zwemtrainer', 1, 0.4), C.oker, 'center', 22);
    const I = q.on('Inspanningsfys', 1, 0.5); SP9_laag(ctx, I, () => { SP9_kaart(ctx, 960, 200, 860, 220, 1, C.teal); metaText(ctx, 'INSPANNINGSFYSIOLOOG', 1000, 262, C.teal, 'left', 28); metaText(ctx, 'PERFORMANCE ANALYST', 1000, 310, C.teal, 'left', 28);
      text(ctx, 'meten de belasting van sporters', 1000, 380, fTekst(34, 700), C.text, 'left'); });
    const O = q.on('bewegingswet', 1, 0.5); SP9_laag(ctx, O, () => { SP9_kaart(ctx, 960, 470, 860, 260, 1, C.goud); metaText(ctx, 'WO', 1000, 530, C.goud, 'left', 26); text(ctx, 'Bewegingswetenschappen', 1000, 600, fTitel(48), C.text, 'left');
      metaText(ctx, 'BV. AMSTERDAM (VU) · GRONINGEN (RUG)', 1000, 660, C.text2, 'left', 24); metaText(ctx, '2026', 1790, 710, C.grain, 'right', 22); }); }
});
