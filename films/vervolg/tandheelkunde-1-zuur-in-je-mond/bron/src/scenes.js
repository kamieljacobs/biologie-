
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
// Wat word jij? · Tandheelkunde 1 · Zuur in je mond — eigen tekeningen (21 okt 2026)

// ---------- kleuren van de mond (vaste natuurkleuren, werken op licht en donker) ----------
const TK = { glazuur: '#EEF2F2', glazuurR: '#B9C6CC', tandbeen: '#E6CF95', tandbeenR: '#B89A5E', kanaal: 'rgba(150,112,52,0.35)', pulpa: '#E79A9C', pulpaR: '#C46A70',
  bloed: '#C8343E', zenuw: '#F2D25A', bot: '#D8C8A2', botR: '#A88E62', botGat: '#9C8258', vlies: '#C98F86', tandvlees: '#D9828E', tandvleesR: '#F0A8B2',
  plak: '#E9E2B6', paars: '#9A4DB8', slijm: '#C9D68A', speeksel: '#24405A', wit: '#FFFFFF' };

// ---------- gladde lijn door punten ----------
function padGlad(ctx, P, nieuw = true) { nieuw ? ctx.moveTo(P[0][0], P[0][1]) : ctx.lineTo(P[0][0], P[0][1]);
  for (let i = 1; i < P.length - 1; i++) { const mx = (P[i][0] + P[i + 1][0]) / 2, my = (P[i][1] + P[i + 1][1]) / 2; ctx.quadraticCurveTo(P[i][0], P[i][1], mx, my); }
  ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]); }
function verdicht(P, n = 6) { const R = []; for (let i = 0; i < P.length - 1; i++) for (let k = 0; k < n; k++) { const u = k / n; R.push([lerp(P[i][0], P[i + 1][0], u), lerp(P[i][1], P[i + 1][1], u)]); } R.push(P[P.length - 1]); return R; }

// ---------- kies in doorsnede ----------
// eenheden: s=1 → kroon ±260 px breed, van knobbel (y-256) tot wortelpunt (y+258); y = hals (glazuur eindigt bij y-40)
const KIES_KROON = [[-118, -40], [-126, -110], [-132, -170], [-118, -220], [-90, -248], [-62, -238], [-35, -214], [-8, -222], [18, -246], [48, -256], [82, -246], [112, -222], [130, -176], [126, -110], [118, -40]];
const KIES_GRENS = [[-118, -40], [-112, -110], [-108, -160], [-90, -198], [-62, -206], [-36, -190], [-8, -196], [20, -212], [48, -220], [80, -212], [104, -190], [110, -160], [110, -110], [118, -40]];
const KIES_WORTEL = [[118, -40], [116, 20], [110, 90], [98, 170], [82, 235], [66, 258], [50, 250], [42, 200], [34, 120], [22, 60], [0, 44], [-22, 60], [-34, 120], [-42, 200], [-50, 250], [-66, 258], [-82, 235], [-98, 170], [-110, 90], [-116, 20], [-118, -40]];
const KIES_PULPA = [[-62, 245], [-66, 150], [-68, 40], [-74, -40], [-66, -110], [-52, -150], [-36, -128], [-12, -118], [14, -124], [36, -150], [54, -156], [68, -112], [74, -40], [68, 40], [66, 150], [62, 245], [54, 245], [50, 150], [46, 60], [30, 22], [0, 14], [-30, 22], [-46, 60], [-50, 150], [-54, 245]];
// punten in beeldcoördinaten (voor namen en zoom): kiesPunt(x, y, s, 'hals')
const KIES_P = { hals: [-122, -62], knobbel: [48, -262], groef: [-8, -226], glazuur: [140, -214], tandbeen: [0, -165], pulpa: [0, -50], wortel: [96, 140], kaakbot: [-210, 170], tandvlees: [-215, -50], wortelvlies: [112, 120] };
function kiesPunt(x, y, s, k) { const p = KIES_P[k]; return [x + p[0] * s, y + p[1] * s]; }

function kies(ctx, x, y, s, o = {}) {
  const { a = 1, bot = 1, vlies = 0, plak = 0, paars = 0, ontkalk = 0, gat = 0, erosie = 0, zacht = 0, namen = 0, zenuw = 1, t = 0 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const kroon = KIES_KROON.map((p, i) => [lerp(p[0], KIES_GRENS[Math.min(i, KIES_GRENS.length - 1)][0], 0), p[1]]);
  // erosie: buitenkant van het glazuur schuift naar de grens toe (dunner en gladder)
  const K = KIES_KROON.map(p => { let best = KIES_GRENS[0], bd = 1e9; for (const g of KIES_GRENS) { const d = Math.hypot(g[0] - p[0], g[1] - p[1]); if (d < bd) { bd = d; best = g; } } return [lerp(p[0], best[0], erosie * 0.6), lerp(p[1], best[1], erosie * 0.6)]; });
  const omtrek = () => { ctx.beginPath(); padGlad(ctx, K); padGlad(ctx, KIES_WORTEL, false); ctx.closePath(); };
  // kaakbot (sponsachtig) met wortelvlies
  if (bot > 0.01) { ctx.save(); ctx.globalAlpha *= bot;
    roundRect(ctx, -300, -6, 600, 330, 40); ctx.fillStyle = TK.bot; ctx.fill();
    ctx.save(); roundRect(ctx, -300, -6, 600, 330, 40); ctx.clip();
    for (let i = 0; i < 90; i++) { const hx = -290 + hash(i * 3 + 1) * 580, hy = 10 + hash(i * 3 + 2) * 300, rr = 7 + hash(i * 3 + 3) * 14; ctx.beginPath(); ctx.ellipse(hx, hy, rr, rr * (0.6 + 0.4 * hash(i * 7)), hash(i * 5) * 3, 0, 6.283); ctx.fillStyle = rgba(TK.botGat, 0.55); ctx.fill(); }
    ctx.restore(); ctx.strokeStyle = TK.botR; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-300, -2); ctx.lineTo(300, -2); ctx.stroke();
    // wortelvlies: smalle spleet met vezeltjes
    ctx.beginPath(); padGlad(ctx, KIES_WORTEL.slice(1, -1)); ctx.strokeStyle = TK.vlies; ctx.lineWidth = 22; ctx.stroke();
    const W2 = verdicht(KIES_WORTEL.slice(1, -1), 5); ctx.strokeStyle = rgba('#7A3E3A', 0.7); ctx.lineWidth = 1.4;
    for (let i = 1; i < W2.length - 1; i += 2) { const [px, py] = W2[i], dx = W2[i + 1][0] - W2[i - 1][0], dy = W2[i + 1][1] - W2[i - 1][1], L = Math.hypot(dx, dy) || 1; if (py < 4) continue; const nx = dy / L, ny = -dx / L; ctx.beginPath(); ctx.moveTo(px - nx * 1, py - ny * 1); ctx.lineTo(px - nx * 11 + dx / L * 4, py - ny * 11 + dy / L * 4); ctx.stroke(); }
    ctx.restore(); }
  // tandbeen met kanaaltjes
  omtrek(); ctx.fillStyle = TK.tandbeen; ctx.fill();
  ctx.save(); omtrek(); ctx.clip(); ctx.strokeStyle = TK.kanaal; ctx.lineWidth = 1.3;
  for (let i = 0; i < 30; i++) { const an = Math.PI + 0.2 + i * (Math.PI - 0.4) / 29, c = Math.cos(an), sn = Math.sin(an); ctx.beginPath(); ctx.moveTo(c * 40, -60 + sn * 40); ctx.bezierCurveTo(c * 110 + sn * 12, -60 + sn * 110 - c * 12, c * 170 - sn * 12, -60 + sn * 170 + c * 12, c * 280, -60 + sn * 280); ctx.stroke(); }
  for (let yy = 0; yy < 250; yy += 13) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 30, yy + 6); ctx.quadraticCurveTo(sd * 80, yy - 2, sd * 140, yy - 8); ctx.stroke(); }
  ctx.restore();
  // pulpa met bloedvaatje en zenuw tot in de wortels
  ctx.beginPath(); padGlad(ctx, KIES_PULPA); ctx.closePath(); shape(ctx, TK.pulpa, TK.pulpaR, 2);
  if (zenuw > 0.01) { ctx.save(); ctx.globalAlpha *= zenuw; ctx.beginPath(); padGlad(ctx, KIES_PULPA); ctx.closePath(); ctx.clip();
    for (const [col, off, lw] of [[TK.bloed, -5, 4.5], [TK.zenuw, 5, 3.5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw;
      for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 58 + off * 0.6, 262); ctx.bezierCurveTo(sd * 58 + off, 140, sd * 60 + off, 20, sd * 40 + off, -50); ctx.quadraticCurveTo(sd * 20 + off * 0.5, -90, sd * 45, -140); ctx.stroke(); }
      ctx.lineWidth = lw * 0.6; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-30 + k * 20 + off, -60); ctx.quadraticCurveTo(-36 + k * 22, -90, -24 + k * 18 + off, -115); ctx.stroke(); } }
    ctx.restore(); }
  // glazuur: dik op de knobbels, dun bij de hals
  ctx.beginPath(); padGlad(ctx, K); padGlad(ctx, KIES_GRENS.slice().reverse(), false); ctx.closePath();
  const gg = ctx.createLinearGradient(-130, -250, 120, -60); gg.addColorStop(0, TK.wit); gg.addColorStop(0.5, TK.glazuur); gg.addColorStop(1, '#D7E0E4'); ctx.fillStyle = gg; ctx.fill(); ctx.strokeStyle = TK.glazuurR; ctx.lineWidth = 2; ctx.stroke();
  // glans
  ctx.save(); ctx.globalAlpha *= 0.7; ctx.strokeStyle = TK.wit; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-112, -150); ctx.quadraticCurveTo(-112, -205, -84, -232); ctx.stroke(); ctx.restore();
  // zacht geworden buitenkant (zuur)
  if (zacht > 0.01) { ctx.save(); ctx.globalAlpha *= zacht; ctx.beginPath(); padGlad(ctx, K); ctx.strokeStyle = rgba(C.koraal, 0.55); ctx.lineWidth = 14; ctx.stroke(); ctx.restore(); }
  // wit plekje (begin van ontkalken) en gaatje, op de plek waar plak blijft zitten (bij de hals)
  if (ontkalk > 0.01) { ctx.save(); ctx.globalAlpha *= ontkalk; ctx.beginPath(); ctx.ellipse(-124, -118, 10, 24, 0.1, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill(); ctx.strokeStyle = '#DDE4E6'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  if (gat > 0.01) { ctx.save(); const g = clamp(gat, 0, 1); ctx.beginPath(); ctx.moveTo(-136, -150 + 10 * (1 - g)); ctx.quadraticCurveTo(-118 + 50 * g, -145, -100 + 40 * g, -120); ctx.quadraticCurveTo(-112 + 40 * g, -95, -134, -90); ctx.closePath(); shape(ctx, '#4A3626', '#7A5A3E', 3); ctx.restore(); }
  // vliesje van speekseleiwitten en tandplak op het glazuur
  const B = verdicht(K, 8), plek = (px, py) => { const hals = clamp((py + 140) / 100, 0, 1), groef = Math.exp(-(((px + 8) / 30) ** 2) - (((py + 222) / 30) ** 2)); return 0.25 + 0.75 * Math.max(hals, groef); };
  const rand = (dik) => { const buit = [], bin = []; for (let i = 0; i < B.length; i++) { const p = B[i], q0 = B[Math.max(0, i - 1)], q1 = B[Math.min(B.length - 1, i + 1)], dx = q1[0] - q0[0], dy = q1[1] - q0[1], L = Math.hypot(dx, dy) || 1, nx = dy / L, ny = -dx / L, d = dik(p[0], p[1], i);
      buit.push([p[0] + nx * d, p[1] + ny * d]); bin.push(p); } ctx.beginPath(); padGlad(ctx, buit); padGlad(ctx, bin.reverse(), false); ctx.closePath(); };
  if (vlies > 0.01) { rand(() => 4 * vlies); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fill(); }
  if (plak > 0.01) { rand((px, py, i) => 4 + plak * 26 * plek(px, py) * (0.85 + 0.15 * Math.sin(i * 1.7))); const col = paars > 0.01 ? _mixHex(TK.plak, TK.paars, paars) : TK.plak; ctx.fillStyle = rgba(col, 0.92); ctx.fill(); ctx.strokeStyle = rgba(_mixHex('#B8AE78', TK.paars, paars), 0.9); ctx.lineWidth = 1.5; ctx.stroke(); }
  // tandvlees als roze rand over het bot, tot tegen de hals
  if (bot > 0.01) { ctx.save(); ctx.globalAlpha *= bot; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 300, 18); ctx.lineTo(sd * 300, -34); ctx.bezierCurveTo(sd * 220, -44, sd * 160, -60, sd * 128, -88); ctx.lineTo(sd * 121, -44); ctx.lineTo(sd * 117, 14); ctx.quadraticCurveTo(sd * 200, 24, sd * 300, 18); ctx.closePath(); shape(ctx, TK.tandvlees, TK.tandvleesR, 2); } ctx.restore(); }
  ctx.restore();
  if (namen > 0.01) { const nb = (k, n, al) => { const [px, py] = kiesPunt(x, y, s, k); naamBij(ctx, n, '', px, py, a * namen, al); };
    nb('glazuur', 'glazuur', 'left'); nb('tandbeen', 'tandbeen', 'center'); nb('pulpa', 'pulpa', 'center'); if (bot > 0.5) { nb('kaakbot', 'kaakbot', 'center'); nb('tandvlees', 'tandvlees', 'center'); } } }

// ---------- snoep, zak, bureau ----------
const SNOEPKLEUR = ['#E0574F', '#F2C94C', '#7FC48F', '#5BA4C9', '#C77FD0', '#F29A4A'];
function snoepje(ctx, x, y, s = 1, i = 0, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const col = SNOEPKLEUR[i % SNOEPKLEUR.length];
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 14, 0); ctx.lineTo(sd * 28, -10); ctx.lineTo(sd * 28, 10); ctx.closePath(); shape(ctx, _licht(col, 0.25), null); }
  ctx.beginPath(); ctx.ellipse(0, 0, 17, 12, 0, 0, 6.283); shape(ctx, col, _donker(col, 0.25), 1.5); ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(-5, -4, 6, 3, -0.4, 0, 6.283); ctx.fill(); ctx.restore(); }
// zak snoep; vul 0..1 = hoeveel er nog in zit
function snoepzak(ctx, x, y, s = 1, vul = 1, a = 1, n = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-80, -150); ctx.lineTo(-62, -170); ctx.lineTo(62, -170); ctx.lineTo(80, -150); ctx.lineTo(70, 0); ctx.closePath(); shape(ctx, 'rgba(230,240,250,0.22)', '#C9D3DE', 2.5);
  ctx.save(); ctx.clip(); const k = Math.round(n * clamp(vul, 0, 1)); for (let i = 0; i < k; i++) snoepje(ctx, -50 + (i % 4) * 33 + (Math.floor(i / 4) % 2) * 14, -18 - Math.floor(i / 4) * 24, 0.8, i, 1, (i * 0.7) % 1.2 - 0.6); ctx.restore();
  ctx.fillStyle = '#E0574F'; ctx.fillRect(-64, -172, 128, 18); text(ctx, 'SNOEP', 0, -110, fTekst(26, 800), 'rgba(242,242,238,0.8)', 'center'); ctx.restore(); }
// bureau met beeldscherm (spel); de tafel staat vóór de benen
function bureau(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#7A5A40'; ctx.fillRect(x, y, w, 26); ctx.fillStyle = '#5E4430'; ctx.fillRect(x + 20, y + 26, 22, 880 - y - 26); ctx.fillRect(x + w - 42, y + 26, 22, 880 - y - 26); ctx.fillStyle = '#6B4E37'; ctx.fillRect(x + 20, y + 26, w - 40, 120);
  const mx = x + w - 230, my = y - 230; roundRect(ctx, mx, my, 200, 140, 10); shape(ctx, '#20283A', '#4A5468', 3); ctx.fillStyle = '#3A4458'; ctx.fillRect(mx + 92, my + 140, 16, 70); ctx.fillRect(mx + 60, y - 12, 80, 12);
  ctx.save(); roundRect(ctx, mx + 10, my + 10, 180, 120, 6); ctx.clip(); ctx.fillStyle = '#2E6FBF'; ctx.fillRect(mx, my, 200, 140); ctx.fillStyle = '#5FA86E'; ctx.fillRect(mx, my + 96, 200, 40);
  for (let i = 0; i < 3; i++) { const bx = mx + ((t * 60 + i * 70) % 220) - 10; ctx.fillStyle = '#F2C94C'; ctx.beginPath(); ctx.arc(bx, my + 60 + Math.sin(t * 3 + i) * 12, 8, 0, 6.283); ctx.fill(); } ctx.fillStyle = '#E07A5F'; ctx.fillRect(mx + 40, my + 74 - Math.abs(Math.sin(t * 4)) * 20, 18, 22); ctx.restore();
  ctx.restore(); }

// ---------- zuurcurve ----------
// pH-dip na één hap (minuten): binnen ±4 min omlaag, daarna herstel met speeksel (rec = hersteltijd)
function phDip(d, rec = 20) { if (d < 0) return 0; if (d < 4) return 2.4 * (1 - (1 - d / 4) ** 2); return 2.4 * Math.exp(-(((d - 4) / rec) ** 1.5)); }
function phOp(m, happen, rec = 20) { let s = 0; for (const h of happen) s += phDip(m - h, rec); return 7 - Math.min(2.7, s); }
// grafiek pH tegen tijd. o: {m0, m1, happen, tot (tot welke minuut de lijn loopt), col, krit (5,5), kritA, kritTekst, ticks:[[min,'tekst']], ymin, ymax, rec, schaduw, a, snoep, lw, naam}
function phGrafiek(ctx, x, y, w, h, o = {}) { const { m0 = 0, m1 = 60, happen = [], tot = m1, col = C.koraal, krit = 5.5, kritA = 0, kritTekst = 'glazuur lost op', ticks = [], ymin = 3.5, ymax = 7.6, rec = 20, schaduw = 0, a = 1, snoep = 0, lw = 5, as7 = 1, gestippeld = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; const X = m => x + (m - m0) / (m1 - m0) * w, Y = p => y + h - (p - ymin) / (ymax - ymin) * h;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  text(ctx, 'pH', x - 18, y + 6, fTekst(30, 700), C.text2, 'right');
  if (as7 > 0.01) { ctx.save(); ctx.globalAlpha *= as7; ctx.strokeStyle = rgba(C.line, 0.45); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, Y(7)); ctx.lineTo(x + w, Y(7)); ctx.stroke(); text(ctx, '7', x - 16, Y(7) + 10, fTekst(28, 600), C.text2, 'right'); ctx.restore(); }
  ticks.forEach(([m, s2]) => { text(ctx, s2, X(m), y + h + 36, fTekst(24, 600), C.text2, 'center'); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(m), y + h); ctx.lineTo(X(m), y + h + 8); ctx.stroke(); });
  if (kritA > 0.01) { ctx.save(); ctx.globalAlpha *= kritA; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, Y(krit)); ctx.lineTo(x + w, Y(krit)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, String(krit.toFixed(1)).replace('.', ','), x - 16, Y(krit) + 10, fTekst(28, 700), C.goud, 'right'); if (kritTekst) text(ctx, kritTekst, x + w - 6, Y(krit) - 14, fTekst(26, 700), C.goud, 'right'); ctx.restore(); }
  const N = 360, pts = []; for (let i = 0; i <= N; i++) { const m = m0 + (m1 - m0) * i / N; if (m > tot) break; pts.push([X(m), Y(phOp(m, happen, rec))]); }
  if (pts.length > 1) {
    if (schaduw > 0.01) { ctx.save(); ctx.globalAlpha *= schaduw; ctx.beginPath(); ctx.rect(x, Y(krit), w, h); ctx.clip(); ctx.beginPath(); ctx.moveTo(pts[0][0], Y(krit)); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(pts[pts.length - 1][0], Y(krit)); ctx.closePath(); ctx.fillStyle = rgba(C.koraal, 0.35); ctx.fill(); ctx.restore(); }
    if (gestippeld) { ctx.save(); ctx.setLineDash([6, 8]); ctx.strokeStyle = rgba(gestippeld.col || C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= N; i++) { const m = m0 + (m1 - m0) * i / N; if (m > tot) break; const p = [X(m), Y(phOp(m, happen, gestippeld.rec))]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); }
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); circ(ctx, pts[pts.length - 1][0], pts[pts.length - 1][1], lw + 3, col); }
  if (snoep > 0.01) happen.forEach((m, i) => { if (m <= tot && m >= m0) snoepje(ctx, X(m), y - 14, 0.55, i, snoep * clamp((tot - m) * 2, 0, 1)); });
  ctx.restore(); }

// ---------- tandplak van dichtbij ----------
// in een cirkel (cx, cy, r): glazuur onderin, vliesje, bacteriën die landen, zich vastzetten en delen, slijm ertussen, spoelen helpt niet
const PLAK_B = (() => { const L = []; for (let i = 0; i < 26; i++) { const laag = i < 9 ? 0 : (i < 18 ? 1 : 2); L.push({ x: -0.78 + hash(i * 11 + 1) * 1.56, h: laag * 34 + 12 + hash(i * 11 + 2) * 16, staaf: hash(i * 11 + 3) > 0.45, rot: (hash(i * 11 + 4) - 0.5) * 1.2, col: [C.koraal, C.oker, C.paars, C.teal, '#D9906A'][i % 5], land: (i / 26) * 0.85 + hash(i * 11 + 5) * 0.1, deel: hash(i * 11 + 6) }); } return L; })();
function plakOpp(cx, cy, r, px) { return cy + r * 0.38 + ((px - cx) ** 2) / (r * 5); }
function bact(ctx, x, y, staaf, rot, col, s = 1, a = 1, split = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  if (staaf) { const L = 22 + split * 6; roundRect(ctx, -L * s, -8 * s, 2 * L * s, 16 * s, 8 * s); shape(ctx, rgba(col, 0.75), _donker(col, 0.2), 2); if (split > 0.3) { ctx.strokeStyle = _donker(col, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -8 * s); ctx.lineTo(0, 8 * s); ctx.stroke(); } }
  else { for (const d of split > 0.01 ? [-1, 1] : [0]) { ctx.beginPath(); ctx.arc(d * split * 9 * s, 0, 10 * s, 0, 6.283); shape(ctx, rgba(col, 0.75), _donker(col, 0.2), 2); } }
  ctx.restore(); }
function plakZoom(ctx, cx, cy, r, o = {}) { const { vlies = 0, hecht = 0, deel = 0, slijm = 0, spoel = 0, t = 0 } = o;
  ctx.fillStyle = TK.speeksel; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  // glazuur: staafjes van kristal
  ctx.beginPath(); ctx.moveTo(cx - r, cy + r); for (let i = 0; i <= 40; i++) { const px = cx - r + 2 * r * i / 40; ctx.lineTo(px, plakOpp(cx, cy, r, px)); } ctx.lineTo(cx + r, cy + r); ctx.closePath(); ctx.fillStyle = TK.glazuur; ctx.fill();
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba(TK.glazuurR, 0.6); ctx.lineWidth = 2; for (let i = -12; i <= 12; i++) { const px = cx + i * r / 10; ctx.beginPath(); ctx.moveTo(px, plakOpp(cx, cy, r, px)); ctx.lineTo(px + 30, cy + r); ctx.stroke(); } ctx.restore();
  if (vlies > 0.01) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const px = cx - r + 2 * r * i / 40; const py = plakOpp(cx, cy, r, px) - 2; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.strokeStyle = rgba(C.teal, vlies); ctx.lineWidth = 10 * vlies; ctx.stroke(); }
  // slijm (één vulling, geen overlap-vlekken)
  if (slijm > 0.01) { ctx.beginPath(); PLAK_B.forEach(b => { if (hecht < b.land + 0.08) return; const px = cx + b.x * r, py = plakOpp(cx, cy, r, px) - 6 - b.h; ctx.moveTo(px + 40 * slijm + 12, py); ctx.arc(px, py, 40 * slijm + 12, 0, 6.283); if (deel > b.deel) { ctx.moveTo(px + 30 + 40 * slijm + 12, py - 14); ctx.arc(px + 30, py - 14, 40 * slijm + 12, 0, 6.283); } }); ctx.fillStyle = rgba(TK.slijm, 0.32 * slijm); ctx.fill('nonzero'); }
  PLAK_B.forEach((b, i) => { const u = clamp((hecht - b.land) / 0.12, 0, 1); if (u <= 0.01) return; const px = cx + b.x * r, py = plakOpp(cx, cy, r, px) - 6 - b.h, w = wander(i, t, 3, 1);
    const fx = px + (1 - u) * (hash(i) - 0.5) * 300, fy = py - (1 - u) * (r * 0.9); const d = clamp((deel - b.deel) / 0.12, 0, 1);
    bact(ctx, fx + w.x * (1 - u), fy + w.y * (1 - u), b.staaf, b.rot, b.col, 1, u, d < 1 ? d : 0);
    if (d >= 1) bact(ctx, px + 30, py - 14, b.staaf, b.rot + 0.5, b.col, 1, 1, 0); });
  // spoelen: water stroomt erover, de plak blijft zitten
  if (spoel > 0.01) { ctx.save(); ctx.globalAlpha *= spoel; ctx.strokeStyle = rgba('#AFD6F0', 0.7); ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { const ph = (t * 0.9 + hash(i * 3)) % 1, yy = cy - r * 0.7 + i * r * 0.11, xx = cx - r + ph * 2.4 * r - 0.2 * r; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + 60, yy - 10, xx + 140, yy); ctx.stroke(); } ctx.restore(); } }

// ---------- bacterie die suiker omzet in melkzuur ----------
function suikerRingetje(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(C.goud, 0.35), C.goud, 2.5, 0); ctx.restore(); }
function melkzuurtje(ctx, x, y, s = 1, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, 6); ctx.lineTo(0, -6); ctx.lineTo(18, 6); ctx.stroke(); circ(ctx, -18, 6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 0, -6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 18, 6, 7, '#5A6170', '#9AA3B2', 1.5); circ(ctx, 30, -2, 6, '#D8573F', '#F08A70', 1.5); circ(ctx, 0, -20, 6, '#D8573F', '#F08A70', 1.5); ctx.restore(); }
function zuurBacterie(ctx, x, y, s, a = 1, t = 0, aan = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 170 * s, y - 70 * s, 340 * s, 140 * s, 70 * s); shape(ctx, rgba(C.oker, 0.35), C.oker, 4); roundRect(ctx, x - 158 * s, y - 58 * s, 316 * s, 116 * s, 58 * s); ctx.strokeStyle = rgba(C.oker, 0.6); ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 14; i++) circ(ctx, x + (hash(i * 4) - 0.5) * 260 * s, y + (hash(i * 4 + 1) - 0.5) * 80 * s, 3 * s, rgba(C.oker, 0.6));
  if (aan > 0.01) { for (let i = 0; i < 4; i++) { const ph = (t * 0.35 + i / 4) % 1; // suiker in (links), melkzuur uit (rechts)
      if (ph < 0.5) { const u = ph / 0.5; suikerRingetje(ctx, x - 330 * s + u * 260 * s, y + (i - 1.5) * 26 * s, 16 * s, aan * Math.min(1, (1 - u) * 4)); }
      else { const u = (ph - 0.5) / 0.5; for (const k of [-1, 1]) melkzuurtje(ctx, x + 110 * s + u * 240 * s, y + k * 30 * s + (i - 1.5) * 10 * s, 0.9 * s, aan * Math.min(1, u * 4) * Math.min(1, (1 - u) * 5), k * 0.3); } } }
  ctx.restore(); }

// ---------- glazuurkristal: calcium, fosfaat, (fluoride) ----------
const KRIST = (() => { const L = []; for (let r = -4; r <= 4; r++) for (let c = -5; c <= 5; c++) { const x = c * 46 + (r % 2 ? 23 : 0), y = r * 40; if (Math.hypot(x / 1.15, y) > 200) continue; const soort = (r + c + 20) % 3 === 0 ? 'f' : (((c + 20) % 2) ? 'ca' : 'p'); L.push({ x, y, soort, rand: Math.hypot(x / 1.15, y) / 200, i: L.length }); } return L; })();
function kristal(ctx, x, y, s, o = {}) { const { a = 1, weg = 0, terug = 0, fluor = 0, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; ctx.lineTo(Math.cos(an) * 250, Math.sin(an) * 230); } ctx.closePath(); shape(ctx, rgba(TK.glazuur, 0.1), rgba(TK.glazuur, 0.55), 2.5);
  KRIST.forEach(k => { let dx = 0, dy = 0, al = 1; if (k.rand > 0.55) { const d = clamp((weg - (1 - k.rand) * 0.6) / 0.4, 0, 1) * (1 - clamp((terug - hash(k.i) * 0.5) / 0.5, 0, 1)); const an = Math.atan2(k.y, k.x); dx = Math.cos(an) * 170 * d; dy = Math.sin(an) * 170 * d; al = 1 - d * 0.75; const w = wander(k.i, t, 6 * d, 1); dx += w.x; dy += w.y; }
    ctx.save(); ctx.globalAlpha *= al; if (k.soort === 'ca') circ(ctx, k.x + dx, k.y + dy, 13, C.goud, '#F2D88A', 2);
    else if (k.soort === 'p') { circ(ctx, k.x + dx, k.y + dy, 11, C.teal, '#9CCBE6', 2); for (let j = 0; j < 4; j++) circ(ctx, k.x + dx + Math.cos(j * 1.57 + 0.78) * 13, k.y + dy + Math.sin(j * 1.57 + 0.78) * 13, 4, '#D8573F'); }
    else { const fl = clamp((fluor - hash(k.i * 3) * 0.5) / 0.5, 0, 1); circ(ctx, k.x + dx, k.y + dy, 8, _mixHex('#C9CED6', '#7FC48F', fl), null); if (fl > 0.5) { ctx.beginPath(); ctx.arc(k.x + dx, k.y + dy, 13, 0, 6.283); ctx.strokeStyle = rgba(C.groen, fl - 0.4); ctx.lineWidth = 3; ctx.stroke(); } }
    ctx.restore(); }); ctx.restore(); }

// ---------- drankjes ----------
function blikje(ctx, x, y, s, col, lab, a = 1, light = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -190, 100, 190, 14); const g = ctx.createLinearGradient(-50, 0, 50, 0); g.addColorStop(0, _donker(col, 0.25)); g.addColorStop(0.35, col); g.addColorStop(1, _donker(col, 0.35)); ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = '#C9CED6'; roundRect(ctx, -46, -200, 92, 18, 8); ctx.fill(); roundRect(ctx, -46, -8, 92, 14, 6); ctx.fill();
  if (light) { ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-50, -120, 100, 40); text(ctx, 'light', 0, -90, fTekst(28, 800), col, 'center'); }
  text(ctx, lab, 0, light ? -140 : -100, fTitel(30), '#F2F2EE', 'center'); ctx.restore(); }
function sportfles(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-42, 0); ctx.lineTo(-42, -150); ctx.quadraticCurveTo(-42, -185, -20, -195); ctx.lineTo(-20, -215); ctx.lineTo(20, -215); ctx.lineTo(20, -195); ctx.quadraticCurveTo(42, -185, 42, -150); ctx.lineTo(42, 0); ctx.closePath(); shape(ctx, rgba('#5BC9C0', 0.7), '#9EE6DE', 2.5);
  ctx.fillStyle = '#2E6FBF'; ctx.fillRect(-24, -238, 48, 24); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-42, -110, 84, 46); text(ctx, 'sport', 0, -79, fTekst(24, 800), '#2E6FBF', 'center'); ctx.restore(); }
function sappak(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-50, -170); ctx.lineTo(0, -205); ctx.lineTo(50, -170); ctx.lineTo(50, 0); ctx.closePath(); shape(ctx, '#F29A2E', '#F6BC6A', 2.5); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-50, -170, 100, 12);
  circ(ctx, 0, -90, 30, '#F7B23B', '#C9761E', 2.5); ctx.strokeStyle = '#C9761E'; ctx.lineWidth = 1.5; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, -90); ctx.lineTo(Math.cos(i * 1.047) * 26, -90 + Math.sin(i * 1.047) * 26); ctx.stroke(); } ctx.restore(); }
function glas(ctx, x, y, s, a = 1, vul = 0.7, col = '#AFD6F0') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -150); ctx.lineTo(-32, 0); ctx.lineTo(32, 0); ctx.lineTo(40, -150); ctx.closePath(); ctx.save(); ctx.clip(); ctx.fillStyle = rgba(col, 0.55); ctx.fillRect(-50, -150 * vul, 100, 150 * vul); ctx.restore(); ctx.strokeStyle = '#DDE6EE'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }

// ---------- maag met zuur dat omhoog komt ----------
function maagZuur(ctx, x, y, s, a = 1, op = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 26 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 220 * s); ctx.lineTo(x, y + 4 * s); ctx.stroke(); ctx.strokeStyle = TK.speeksel; ctx.lineWidth = 12 * s; ctx.stroke();
  maagPad(ctx, x, y, s); shape(ctx, '#D99A8E', '#F0BCB0', 3); ctx.save(); maagPad(ctx, x, y, s); ctx.clip(); ctx.fillStyle = rgba('#C9D64A', 0.55); ctx.fillRect(x - 120 * s, y + 140 * s, 360 * s, 200 * s); ctx.restore();
  if (op > 0.01) for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; circ(ctx, x - 6 * s + Math.sin(i + t) * 3, y + 40 * s - ph * 330 * s * op, 6 * s, rgba('#C9D64A', 0.9 * op * (1 - ph * 0.5))); }
  ctx.restore(); }

// ---------- tandenrij (vooraanzicht onderkaak): plak, paars, tandsteen, wit plekje, borstel ----------
function tandRij(ctx, x, y, w, o = {}) { const { a = 1, paars = 0, plak = 0, steen = 0, witPlek = 0, borstel = -1, ragertje = -1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const n = 6, tw = w / n, th = tw * 1.25;
  ctx.fillStyle = '#5A2A34'; roundRect(ctx, x - 30, y - th - 40, w + 60, th + 120, 30); ctx.fill(); // mondholte achter de tanden
  for (let i = 0; i < n; i++) { const tx = x + i * tw + 6, bw = tw - 12; ctx.beginPath(); ctx.moveTo(tx, y + 30); ctx.lineTo(tx + 4, y - th + 26); ctx.quadraticCurveTo(tx + bw / 2, y - th - 6, tx + bw - 4, y - th + 26); ctx.lineTo(tx + bw, y + 30); ctx.closePath();
    const g = ctx.createLinearGradient(tx, 0, tx + bw, 0); g.addColorStop(0, '#DCE3E6'); g.addColorStop(0.4, '#F6F8F8'); g.addColorStop(1, '#CDD6DA'); shape(ctx, g, '#AEB9BF', 2);
    // plak/paars langs het tandvlees, niet in het midden
    if (plak > 0.01 || paars > 0.01) { ctx.save(); ctx.clip(); const col = _mixHex(TK.plak, TK.paars, paars); const hoog = th * (0.18 + 0.14 * Math.max(plak, paars) + (i % 2) * 0.05);
      ctx.fillStyle = rgba(col, 0.85 * Math.max(plak, paars)); ctx.beginPath(); ctx.moveTo(tx - 4, y + 30); ctx.lineTo(tx - 4, y - hoog - th * 0.25); ctx.quadraticCurveTo(tx + bw * 0.25, y - hoog * 0.9, tx + bw / 2, y - hoog); ctx.quadraticCurveTo(tx + bw * 0.75, y - hoog * 0.9, tx + bw + 4, y - hoog - th * 0.25); ctx.lineTo(tx + bw + 4, y + 30); ctx.closePath(); ctx.fill();
      ctx.fillStyle = rgba(col, 0.3 * paars); ctx.fillRect(tx - 4, y - th, bw + 8, th); ctx.restore(); }
    if (steen > 0.01) { ctx.save(); ctx.globalAlpha *= steen; for (const sx of [tx + 2, tx + bw - 2]) { ctx.beginPath(); ctx.ellipse(sx, y - 6, 12, 18, 0, 0, 6.283); ctx.fillStyle = '#C9A55A'; ctx.fill(); ctx.strokeStyle = '#8A6A30'; ctx.lineWidth = 1.5; ctx.stroke(); } ctx.restore(); }
    if (witPlek > 0.01 && i === 2) { ctx.save(); ctx.globalAlpha *= witPlek; ctx.beginPath(); ctx.ellipse(tx + bw * 0.45, y - th * 0.22, bw * 0.24, th * 0.09, 0, 0, 6.283); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.strokeStyle = 'rgba(200,210,214,0.9)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
  // tandvlees met puntjes tussen de tanden
  ctx.beginPath(); ctx.moveTo(x - 30, y + 90); ctx.lineTo(x - 30, y + 10); for (let i = 0; i <= n; i++) { const gx = x + i * tw; ctx.quadraticCurveTo(gx - tw / 2, y + 34, gx, y - 22); } ctx.lineTo(x + w + 30, y + 10); ctx.lineTo(x + w + 30, y + 90); ctx.closePath(); shape(ctx, TK.tandvlees, TK.tandvleesR, 2.5);
  if (borstel >= 0) { const bx = x + w * (0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 7))) ; tandenborstel(ctx, bx, y - th * 0.55, 0.9, 0, 1); }
  if (ragertje >= 0) { const rx = x + tw * (2 + Math.round(ragertje * 2)), ry = y - th * 0.15 + Math.sin(t * 6) * 12; ragertjeT(ctx, rx, ry, 1, 1); }
  ctx.restore(); }
function tandenborstel(ctx, x, y, s = 1, rot = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -60, -12, 300, 24, 12); shape(ctx, '#5BA4C9', '#8CC4E0', 2); roundRect(ctx, -80, -14, 60, 28, 6); shape(ctx, '#E8EEF2', '#AEB9BF', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 4; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(-76 + i * 9, -14); ctx.lineTo(-76 + i * 9, -42); ctx.stroke(); } ctx.restore(); }
function ragertjeT(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, -8, 150, 16, 8); shape(ctx, '#7FC48F', '#A8DDB4', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-50, 0); ctx.stroke();
  ctx.strokeStyle = '#E8EEF2'; ctx.lineWidth = 1.5; for (let i = 0; i < 12; i++) { const xx = -48 + i * 4; ctx.beginPath(); ctx.moveTo(xx, -10); ctx.lineTo(xx, 10); ctx.stroke(); } ctx.restore(); }
function tandpasta(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-120, -40); ctx.lineTo(90, -32); ctx.lineTo(90, 32); ctx.lineTo(-120, 40); ctx.closePath(); shape(ctx, '#F2F2EE', '#C9CED6', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-120, -14, 210, 28);
  roundRect(ctx, 90, -18, 40, 36, 6); shape(ctx, '#E07A5F', null); text(ctx, 'fluoride', -15, 9, fTekst(22, 800), '#F2F2EE', 'center'); ctx.restore(); }
function plakVerklikker(ctx, x, y, ang = 0) { ctx.save(); ctx.translate(x, y); roundRect(ctx, -16, -60, 32, 60, 8); shape(ctx, rgba(TK.paars, 0.9), '#C9A0DC', 2); ctx.fillStyle = '#F2F2EE'; ctx.fillRect(-8, -78, 16, 18); ctx.restore(); }
function spiegeltje(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -90); ctx.stroke(); circ(ctx, 12, -104, 16, '#AFD6F0', '#E8EEF2', 3); ctx.restore(); }
function kauwgom(ctx, x, y) { ctx.save(); ctx.translate(x, y); roundRect(ctx, -38, -60, 76, 46, 8); shape(ctx, '#7FC48F', '#A8DDB4', 2); text(ctx, 'suikervrij', 0, -31, fTekst(15, 800), '#1A2740', 'center'); ctx.restore(); }
function colaLight(ctx, x, y) { blikje(ctx, x, y + 10, 0.42, '#B23A3A', 'cola', 1, true); }
// klein kaartje met de titel van een andere film
function filmKaart(ctx, titel, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(28, 700); const w = ctx.measureText(titel).width + 110; roundRect(ctx, x - w / 2, y - 40, w, 64, 14); shape(ctx, rgba(C.teal, 0.16), C.teal, 2);
  ctx.beginPath(); ctx.moveTo(x - w / 2 + 28, y - 22); ctx.lineTo(x - w / 2 + 52, y - 8); ctx.lineTo(x - w / 2 + 28, y + 6); ctx.closePath(); ctx.fillStyle = C.teal; ctx.fill(); text(ctx, titel, x - w / 2 + 70, y + 2, fTekst(28, 700), C.text, 'left'); ctx.restore(); }
// rij eetmomenten: n borden + snacks; hl = zichtbaarheid
function eetmoment(ctx, x, y, soort, a = 1, i = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 62, rgba(soort === 'bord' ? C.teal : C.goud, 0.15), soort === 'bord' ? C.teal : C.goud, 2.5);
  if (soort === 'bord') { ctx.beginPath(); ctx.ellipse(x, y + 6, 44, 16, 0, 0, 6.283); shape(ctx, '#E8EEF2', '#AEB9BF', 2); ctx.beginPath(); ctx.ellipse(x - 8, y, 16, 8, 0, 0, 6.283); ctx.fillStyle = '#C9763E'; ctx.fill(); ctx.beginPath(); ctx.ellipse(x + 14, y + 2, 12, 6, 0, 0, 6.283); ctx.fillStyle = '#5FA86E'; ctx.fill(); }
  else snoepje(ctx, x, y, 1.2, i, 1); ctx.restore(); }
// thee-kopje
function kopje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-44, -60); ctx.lineTo(-36, 0); ctx.lineTo(36, 0); ctx.lineTo(44, -60); ctx.closePath(); shape(ctx, '#E8EEF2', '#AEB9BF', 2); ctx.beginPath(); ctx.arc(52, -32, 16, -1.4, 1.4); ctx.strokeStyle = '#E8EEF2'; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#B07A3A'; ctx.beginPath(); ctx.ellipse(0, -56, 40, 7, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
// wasbak met schuim (uitspugen)
function wasbak(ctx, x, y, a = 1, schuim = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 110, y - 50); ctx.lineTo(x + 110, y - 50); ctx.quadraticCurveTo(x + 100, y + 40, x, y + 40); ctx.quadraticCurveTo(x - 100, y + 40, x - 110, y - 50); ctx.closePath(); shape(ctx, '#E8EEF2', '#AEB9BF', 3);
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 6, y - 120, 12, 70); ctx.fillRect(x - 6, y - 120, 50, 12); if (schuim > 0.01) for (let i = 0; i < 6; i++) circ(ctx, x - 30 + i * 12, y + 10 - (i % 2) * 8, 9, rgba('#FFFFFF', schuim)); ctx.restore(); }

// ---------- kleine hulpjes (zoals in l1 / de engine) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// één chip tegelijk: [woord, n, tekst, kleur]; de vorige gaat weg vóór de volgende komt
function wisselChip(ctx, lijst, x, y, t, q, px = 28) { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n)) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.3)) / 0.3, 0, 1) : 0; chip(ctx, s2, x, y, col, q.on(w, n, 0.35) * (1 - uit), px); }
// Wat word jij? · Tandheelkunde 1 · Zuur in je mond — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Mondhygiënist Ilse; Bilal snoept de hele middag; Sam eet de zak in één keer leeg).
// Rode draad: één zak snoep, twee manieren van eten.

// snoepje dat van (x0,y0) in een boog naar (x1,y1) vliegt; u 0..1
function snoepVlucht(ctx, x0, y0, x1, y1, u, i) { if (u <= 0 || u >= 1) return; const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 90; snoepje(ctx, x, y, 0.8, i, Math.min(1, (1 - u) * 6)); }
function scheiding(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(960, 200); ctx.lineTo(960, 860); ctx.stroke(); ctx.restore(); }
function tafeltje(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A40'; ctx.fillRect(x, y, w, 22); ctx.fillStyle = '#5E4430'; ctx.fillRect(x + 16, y + 22, 18, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 18, 880 - y - 22); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.15) % 1; kies(ctx, 1420, 520, 0.95, { vlies: 1, plak: clamp(u * 2.5, 0, 1) * clamp((1 - u) * 5, 0, 1), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); scheiding(ctx, q.on('Sam', 2));
    // Bilal: hele middag achter de computer, om het kwartier één snoepje
    bureau(ctx, 140, 640, 600, 1, t); const B = persoon(ctx, 'bilal', 330, 880, 430, { t, kijk: 1, uit: 'blij' });
    const kw = q.at('kwartier', 1), nB = t > kw ? Math.floor((t - kw) / 1.6) + 1 : 0, uB = t > kw ? ((t - kw) % 1.6) / 0.8 : 0;
    snoepzak(ctx, 210, 640, 0.75, 1 - Math.min(nB, 8) / 16, 1); if (nB > 0 && nB <= 8 && B.hoofd) snoepVlucht(ctx, 210, 520, B.hoofd.x + 20, B.hoofd.y + B.hoofd.r * 0.5, uB, nB);
    klokje(ctx, 600, 260, 54, clamp((t - kw) / 12, 0, 0.95), q.on('middag', 1)); metaA(ctx, 'de hele middag', 600, 350, q.on('middag', 1), C.text2, 'center', 22);
    naamBij(ctx, 'Bilal', '', 330, 420, q.on('Bilal', 1), 'center');
    // Sam: na het avondeten de hele zak in één keer
    const S = q.on('Sam', 2); if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; tafeltje(ctx, 1240, 660, 520); eetmoment(ctx, 1640, 620, 'bord', q.on('avondeten', 1));
      const P = persoon(ctx, 'sam', 1420, 880, 440, { t, kijk: 1, uit: t > q.at('leeg', 1) ? 'lacht' : 'blij' }); const z0 = q.at('hele', 2), z1 = q.at('leeg', 1) + 0.6, vu = clamp((t - z0) / (z1 - z0), 0, 1);
      snoepzak(ctx, 1490, 660, 0.75, 1 - vu, 1); if (vu > 0 && vu < 1 && P.hoofd) for (let k = 0; k < 3; k++) snoepVlucht(ctx, 1490, 540, P.hoofd.x + 20, P.hoofd.y + P.hoofd.r * 0.5, ((t - z0) * 2.2 + k / 3) % 1, k + 2);
      naamBij(ctx, 'Sam', '', 1420, 420, 1, 'center'); metaA(ctx, 'na het avondeten', 1640, 520, q.on('avondeten', 1), C.text2, 'center', 22); ctx.restore(); }
    tag(ctx, 'zelfde zak · zelfde suiker', 960, 180, C.goud, q.on('precies', 1), 'center', 30); vraagteken(ctx, 960, 560, q.on('gaatjes', 1), 120); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); kies(ctx, 960, 500, 1.0, { a: q.on('Om', 1), namen: q.on('kijken', 1), t }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const kx = 470, ky = 500, ks = 0.92;
    const vl = q.on('vliesje', 1), hecht = clamp((t - q.at('bacteriën', 1)) / 5, 0, 1), deel = clamp((t - q.at('delen', 1)) / 3.5, 0, 1), sl = q.on('slijm', 1, 1.5);
    kies(ctx, kx, ky, ks, { vlies: vl, plak: Math.max(hecht * 0.35, clamp((t - q.at('delen', 1)) / 10, 0, 1)), t });
    const [hx, hy] = kiesPunt(kx, ky, ks, 'hals'); const Z = q.on('vliesje', 1, 0.8);
    zoomCircle(ctx, 1350, 440, 320, hx - 4, hy - 40, '', Z, () => plakZoom(ctx, 1350, 440, 320, { vlies: vl, hecht, deel, slijm: sl, spoel: q.on('spoelen', 1), t }));
    naamBij(ctx, 'tandplak', 'biofilm', hx - 20, hy - 120, q.on('tandplak', 1), 'right');
    wisselChip(ctx, [['vliesje', 1, 'vliesje van eiwitten uit speeksel', C.teal], ['bacteriën', 1, 'bacteriën zetten zich vast', C.oker], ['delen', 1, 'ze delen', C.oker], ['slijm', 1, 'kleverig slijm van suiker', C.groen], ['biofilm', 1, 'biofilm', C.goud], ['darmbewoners', 1, ''], ['plak', 2, 'het slijm houdt ze vast', C.goud], ['spoelen', 1, 'spoelen helpt niet', C.koraal]], 1350, 830, t, q, 28);
    const F = q.on('darmbewoners', 1) * (1 - q.on('plak', 2)); filmKaart(ctx, 'Je darmbewoners', 1350, 830, F);
    chip(ctx, 'honderden soorten · de meeste onschuldig', 1350, 70 + 100, C.groen, q.on('honderden', 1) * (1 - q.on('plak', 2)), 26); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('Mondhygiënist', 1, 0.3);
    persoon(ctx, 'ilse', 330, 880, 440, { t, a: I, kijk: 1, pose: t > q.at('kleurt', 1) ? 'vasthouden' : 'wijs', uit: 'blij', hold: t > q.at('kleurt', 1) ? (c, x, y) => plakVerklikker(c, x, y + 10) : null });
    naamBij(ctx, 'Mondhygiënist Ilse', '', 330, 390, I, 'center');
    persoon(ctx, 'bilal', 620, 880, 430, { t, a: q.on('Bilal', 1, 0.3), kijk: 1, uit: t > q.at('alles', 1) ? 'verbaasd' : 'neutraal' });
    const pa = clamp((t - q.at('paarse', 1)) / 3, 0, 1); tandRij(ctx, 1020, 620, 720, { plak: 0.5, paars: pa, t });
    metaA(ctx, 'de tanden van bilal', 1380, 330, q.on('Bilal', 1), C.text2, 'center', 22);
    if (q.on('Langs', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('Langs', 1) * (0.6 + 0.4 * Math.sin(t * 4)); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); roundRect(ctx, 1000, 560, 760, 90, 30); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'hier poetst hij te kort', 1380, 790, C.goud, q.on('plekken', 1), 28); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('Binnen', 1, 0.8);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; zuurBacterie(ctx, 900, 420, 1.1, q.on('Zodra', 1), t, q.on('bacteriën', 1));
      naamBij(ctx, 'bacterie in de plak', '', 900, 300, q.on('bacteriën', 1), 'center'); naamBij(ctx, 'suiker', '', 470, 330, q.on('suiker', 1), 'center'); naamBij(ctx, 'melkzuur', '', 1330, 330, q.on('melkzuur', 1), 'center');
      filmKaart(ctx, 'Alles op adem', 900, 690, q.on('film', 1)); ctx.restore(); }
    if (G > 0.01) { const tb = q.at('Binnen', 1); phGrafiek(ctx, 300, 220, 1300, 520, { a: G, m0: -5, m1: 60, happen: [0], tot: lerp(-5, 9, (t - tb) / 5.2), ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
      metaA(ctx, 'ph in de plak', 300, 180, G, C.text2, 'left', 22); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const tl = q.at('omhoog', 1);
    kristal(ctx, 480, 420, 0.9, { a: q.on('glazuur', 1), weg: clamp((t - q.at('lossen', 1)) / 3, 0, 1), terug: clamp((t - q.at('terug', 1) + 2.5) / 3, 0, 1), t });
    naamBij(ctx, 'calcium', '', 260, 720, q.on('calcium', 1), 'center', C.goud); naamBij(ctx, 'fosfaat', '', 520, 720, q.on('fosfaat', 1), 'center', C.teal); metaA(ctx, 'kristal van glazuur', 480, 160, q.on('kristallen', 1), C.text2, 'center', 22);
    const tot = t < tl ? lerp(-5, 7, (t - 1) / 3) : lerp(7, 60, (t - tl) / 6);
    phGrafiek(ctx, 1000, 220, 800, 440, { a: q.on('Onder', 1), m0: -5, m1: 60, happen: [0], tot, kritA: q.on('5,5', 1), schaduw: q.on('ontkalken', 1), ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
    wisselChip(ctx, [['ontkalken', 1, 'ontkalken', C.koraal], ['speeksel', 1, 'speeksel vangt het zuur op', C.teal], ['terug', 1, 'herstel', C.groen]], 960, 830, t, q, 30); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const E = q.on('advies', 1, 0.8), G = 1 - E;
    if (G > 0.01) { const tk = [[0, '13:00'], [60, '14:00'], [120, '15:00'], [180, '16:00']], hB = []; for (let m = 0; m <= 180; m += 15) hB.push(m);
      phGrafiek(ctx, 470, 210, 1250, 230, { a: G, m0: -10, m1: 200, happen: hB, tot: lerp(-10, 200, (t - 0.4) / 10.8), kritA: 1, kritTekst: '', schaduw: q.on('zuur', 1), ticks: tk, ymin: 3.8, snoep: 1, lw: 4 });
      naamBij(ctx, 'Bilal', 'elk kwartier', 380, 300, G, 'right');
      const hS = [0, 1.5, 3, 4.5, 6, 7.5]; phGrafiek(ctx, 470, 560, 1250, 230, { a: G * q.on('Sam', 1), m0: -10, m1: 200, happen: hS, tot: lerp(-10, 200, (t - q.at('Sam', 1)) / 2.8), kritA: 1, kritTekst: '', schaduw: q.on('Sam', 1), ticks: [[0, '19:00'], [60, '20:00'], [120, '21:00'], [180, '22:00']], ymin: 3.8, col: C.teal, snoep: 1, lw: 4 });
      naamBij(ctx, 'Sam', 'hele zak', 380, 650, G * q.on('Sam', 1), 'right');
      regel(ctx, 'glazuur lost op', 1720, 180, G * q.on('Kijk', 1), C.goud, 26, 'right', 700);
      chip(ctx, 'geen herstel', 1500, 140, C.koraal, G * q.on('herstellen', 1), 26); chip(ctx, 'daarna rust', 1500, 520, C.groen, G * q.on('rust', 1), 26); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; regel(ctx, 'hooguit 7 eetmomenten per dag', 960, 240, q.on('zeven', 1), C.goud, 48, 'center', 800);
      for (let i = 0; i < 7; i++) { const bord = i % 2 === 0 && i < 6, f = i < 3 ? q.on('maaltijden', 1) : q.on('vier', 1); const soort = [0, 2, 4].includes(i) ? 'bord' : 'snoep'; eetmoment(ctx, 330 + i * 210, 420, soort, clamp(f * 3 - (i % 4) * 0.3, 0, 1), i); }
      naamBij(ctx, '3 maaltijden', '', 750, 540, q.on('maaltijden', 1), 'center', C.teal); naamBij(ctx, '+ 4 keer tussendoor', '', 1170, 540, q.on('vier', 1), 'center', C.goud);
      const Wt = q.on('Water', 1); glas(ctx, 860, 790, 0.9, Wt); kopje(ctx, 1060, 790, 1.1, q.on('thee', 1)); tag(ctx, 'telt niet mee', 1300, 750, C.groen, q.on('tellen', 1), 'left', 30); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('kauwgom', 1);
    persoon(ctx, 'sam', 760, 880, 450, { t, kijk: 1, uit: 'blij', pose: K > 0.3 ? 'vasthouden' : 'staan', hold: K > 0.3 ? (c, x, y) => kauwgom(c, x, y + 20) : null });
    snoepzak(ctx, 1080, 880, 0.9, 0, 1); metaA(ctx, 'leeg', 1080, 690, q.on('zak', 1), C.text2, 'center', 22); vraagteken(ctx, 1300, 500, q.on('Helpt', 1), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const hS = [0, 1.5, 3, 4.5, 6, 7.5], sn = q.at('sneller', 1);
    phGrafiek(ctx, 280, 260, 1100, 440, { m0: -5, m1: 70, happen: hS, tot: lerp(-5, 70, (t - sn + 0.6) / 2.2), rec: 9, col: C.groen, kritA: 1, kritTekst: '', ticks: [[0, 'snoep'], [30, '30 min'], [60, '60 min']], gestippeld: { rec: 20, col: C.text2 }, snoep: 1 });
    naamBij(ctx, 'zonder kauwgom', '', 1000, 470, 1, 'left', C.text2); naamBij(ctx, 'met kauwgom: meer speeksel', '', 620, 420, q.on('sneller', 1), 'left', C.groen);
    const Pl = q.on('Plak', 1); kauwgom(ctx, 1640, 380); kruis(ctx, 1640, 330, 40, Pl); naamBij(ctx, 'haalt geen plak weg', '', 1640, 450, Pl, 'center');
    tandenborstel(ctx, 1600, 640, 0.9, -0.15, q.on('tandenborstel', 1)); vink_(ctx, 1660, 720, 26, q.on('tandenborstel', 1)); },

  // ---------- H3 ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const Bc = q.on('cariës', 1, 0.8), M = q.on('maagzuur', 1, 0.8), A = 1 - Bc;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; blikje(ctx, 260, 640, 1.1, '#B23A3A', 'cola', q.on('Frisdrank', 1)); sportfles(ctx, 470, 640, 1.1, q.on('sportdrank', 1)); sappak(ctx, 680, 640, 1.1, q.on('vruchtensap', 1));
      const ph = q.on('twee', 2); tag(ctx, 'pH 2,5', 260, 720, C.koraal, ph, 'center', 26); tag(ctx, 'pH 3–4', 470, 720, C.koraal, ph, 'center', 26); tag(ctx, 'pH 3–4', 680, 720, C.koraal, ph, 'center', 26);
      chip(ctx, 'geen bacteriën nodig', 470, 820, C.teal, q.on('bacteriën', 1), 26); ctx.restore(); }
    // rechter kies: zuur maakt de buitenkant zacht, daarna erosie
    const er = clamp((t - q.at('slijt', 1)) / 3, 0, 1);
    kies(ctx, 1360, 470, 0.85, { a: q.on('buitenkant', 1), zacht: q.on('buitenkant', 1) * (1 - er * 0.5), erosie: er, t });
    naamBij(ctx, 'zacht glazuur', '', 1360, 220, q.on('zacht', 1) * (1 - q.on('erosie', 1)), 'center', C.koraal); naamBij(ctx, 'erosie', 'overal dunner en gladder', 1360, 810, q.on('erosie', 1), 'center');
    if (Bc > 0.01) { ctx.save(); ctx.globalAlpha *= Bc * (1 - M); kies(ctx, 560, 470, 0.85, { plak: 0.8, gat: clamp((t - q.at('gaatje', 1)) / 2, 0, 1), t }); naamBij(ctx, 'cariës', 'gaatje waar plak blijft', 560, 810, 1, 'center'); ctx.restore(); }
    if (M > 0.01) { maagZuur(ctx, 520, 380, 1.1, M, q.on('omhoog', 1), t); naamBij(ctx, 'maagzuur', 'pH ≈ 1', 520, 810, M, 'center'); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 480, 880, 440, { t, kijk: 1, pose: 'wijs', uit: 'neutraal' }); naamBij(ctx, 'Ilse', '', 480, 390, 1, 'center');
    bubbel(ctx, 700, 300, 'suiker: slecht voor je tanden', '#F2F2EE', q.on('suiker', 1), 30);
    const L = q.on('light', 1); persoon(ctx, 'bilal', 1000, 880, 430, { t, kijk: -1, uit: 'blij', pose: L > 0.3 ? 'vasthouden' : 'staan', hold: L > 0.3 ? (c, x, y) => colaLight(c, x, y + 40) : null });
    vraagteken(ctx, 1350, 480, q.on('goed', 1), 120); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const G = q.on('geen', 1);
    zuurBacterie(ctx, 480, 380, 0.75, 1, t, 0); kruis(ctx, 300, 380, 34, G); suikerRingetje(ctx, 300, 380, 22, 1); naamBij(ctx, 'geen suiker: geen zuur', '', 480, 520, G, 'center');
    blikje(ctx, 1300, 520, 1.15, '#B23A3A', 'cola', q.on('cola', 1), true); tag(ctx, 'pH ≈ 3: nog steeds zuur', 1300, 600, C.koraal, q.on('zelf', 1), 'center', 28);
    const Wt = q.on('Water', 1); glas(ctx, 480, 830, 0.8, Wt, 0.75); vink_(ctx, 600, 760, 26, Wt); naamBij(ctx, 'water', '', 650, 800, Wt, 'left', C.groen);
    const Wa = q.on('wacht', 1); klokje(ctx, 1180, 760, 60, clamp((t - q.at('wacht', 1)) / 1.5, 0, 1), Wa); tandenborstel(ctx, 1320, 760, 0.6, 0, Wa); naamBij(ctx, '1 uur wachten', '', 1180, 860, Wa, 'center'); },

  // ---------- H4 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const T = q.on('tandpasta', 1, 0.8), A = 1 - T;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const fl = clamp((t - q.at('fluoride', 2)) / 4, 0, 1);
      kristal(ctx, 480, 420, 0.85, { fluor: fl, weg: 0, t }); naamBij(ctx, 'fluoride', '', 480, 720, q.on('fluoride', 2), 'center', C.groen); metaA(ctx, 'kristal van glazuur', 480, 170, 1, C.text2, 'center', 22);
      const u = q.on('lagere', 1, 1.2), kr = lerp(5.5, 4.5, u);
      phGrafiek(ctx, 1020, 220, 780, 420, { m0: -5, m1: 60, happen: [0], tot: 60, krit: kr, kritA: 1, kritTekst: u > 0.5 ? 'sterker glazuur' : 'glazuur lost op', schaduw: 1, ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
      wisselChip(ctx, [['lost', 1, 'lost minder snel op', C.groen], ['herstelt', 1, 'herstelt sneller', C.groen], ['nieuwe', 1, 'nieuw glazuur: sterker', C.groen]], 1410, 790, t, q, 28); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; tandpasta(ctx, 480, 360, 1.2, 1); tandenborstel(ctx, 470, 520, 1, 0, q.on('Poets', 1)); tag(ctx, '2 × per dag', 480, 660, C.goud, q.on('twee', 1), 'center', 30);
      wasbak(ctx, 1150, 560, q.on('spuug', 1), q.on('uit', 1)); naamBij(ctx, 'alleen uitspugen', '', 1150, 700, q.on('uit', 1), 'center', C.groen);
      glas(ctx, 1560, 600, 0.9, q.on('Spoel', 1), 0.7); kruis(ctx, 1560, 520, 50, q.on('Spoel', 1)); naamBij(ctx, 'niet naspoelen', '', 1560, 700, q.on('Spoel', 1), 'center', C.koraal); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 400, 880, 460, { t, kijk: 1, pose: t > q.at('kijkt', 1) ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Ilse', 'mondhygiënist', 400, 370, q.on('Ilse', 1), 'center');
    const ts = q.at('tandsteen', 1), st = 1 - clamp((t - ts - 0.3) / 1.5, 0, 1);
    tandRij(ctx, 900, 600, 840, { plak: 0.6 * (1 - q.on('poetsen', 1) * 0.7), paars: 0.6 * q.on('kijkt', 1) * (1 - q.on('poetsen', 1)), steen: st, witPlek: q.on('witte', 1), borstel: (t > q.at('poetsen', 1) && t < q.at('tussen', 1)) ? 1 : -1, ragertje: (t > q.at('tussen', 1) && t < ts) ? 0.5 : -1, t });
    wisselChip(ctx, [['plak', 1, 'waar blijft de plak zitten?', C.goud], ['poetsen', 1, 'beter poetsen', C.teal], ['tussen', 1, 'ook tussen je tanden', C.teal], ['tandsteen', 1, 'tandsteen weghalen', C.oker], ['witte', 1, 'wit plekje: glazuur ontkalkt', C.text2], ['redden', 1, 'nog te redden', C.groen]], 1320, 800, t, q, 28); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 280, 880, 400, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'sam', 1660, 880, 410, { t, kijk: -1, uit: 'blij' });
    const hB = []; for (let m = 0; m <= 180; m += 15) hB.push(m);
    phGrafiek(ctx, 560, 200, 800, 200, { m0: -10, m1: 200, happen: hB, tot: 200, kritA: 1, kritTekst: '', schaduw: q.on('rust', 1), ymin: 3.8, lw: 4 }); naamBij(ctx, 'Bilal', '', 280, 440, 1, 'center');
    phGrafiek(ctx, 560, 500, 800, 200, { m0: -10, m1: 200, happen: [0, 1.5, 3, 4.5, 6, 7.5], tot: 200, kritA: 1, kritTekst: '', schaduw: q.on('rust', 1), ymin: 3.8, col: C.teal, lw: 4 }); naamBij(ctx, 'Sam', '', 1660, 440, 1, 'center');
    chip(ctx, 'zelfde zak · zelfde suiker', 960, 160, C.goud, q.on('Zelfde', 1) * (1 - q.on('Voor', 1)), 28);
    tag(ctx, 'hoe vaak telt zwaarder dan hoeveel', 960, 820, C.goud, q.on('vaak', 1), 'center', 32); },

  s20(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 330, 880, 450, { t, kijk: 1, uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Ilse', 'mondhygiënist', 330, 380, 1, 'center');
    tag(ctx, 'hbo · Mondzorgkunde · 4 jaar', 960, 230, C.teal, q.on('Mondzorgkunde', 1), 'center', 34);
    [['Nijmegen', 1], ['Utrecht', 1], ['Amsterdam', 1], ['Groningen', 1]].forEach(([s2, n], i) => chip(ctx, s2, 690 + i * 180, 320, C.text2, q.on(s2, n), 26));
    chip(ctx, 'selectie: meer aanmeldingen dan plaatsen', 960, 420, C.koraal, q.on('selectie', 1), 26); chip(ctx, 'zelf patiënten behandelen', 960, 510, C.groen, q.on('patiënten', 1), 26);
    const Wd = q.on('tandarts', 2, 0.3); persoon(ctx, 'wouter', 1600, 880, 470, { t, a: Wd, kijk: -1, uit: 'blij' }); naamBij(ctx, 'Tandarts Wouter', '', 1600, 370, Wd, 'center');
    tag(ctx, 'universiteit · Tandheelkunde · 6 jaar', 960, 640, C.paars, q.on('tandheelkunde', 1), 'center', 32);
    filmKaart(ctx, 'volgende film: Van glazuur tot zenuw', 960, 780, q.on('volgende', 1)); }
});
