
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
// Wat word jij? · Tandheelkunde 2 · Van glazuur tot zenuw — eigen tekeningen (21 okt 2026).
// De doorsnede van de kies komt uit tand_kies.js (gedeeld); hier: röntgenfoto, instrumenten, zooms en overlays.

// ---------- kleine voorwerpen (in een hand via persoon({hold})) ----------
function ijsjeHold(hap = 0) { return (ctx, x, y, an) => { ctx.save(); ctx.translate(x, y); ctx.rotate(an - Math.PI / 2 - 0.25);
  ctx.beginPath(); ctx.moveTo(-17, -6); ctx.lineTo(17, -6); ctx.lineTo(0, 62); ctx.closePath(); shape(ctx, '#D9A35A', '#A87632', 2);
  ctx.strokeStyle = rgba('#A87632', 0.8); ctx.lineWidth = 1.5; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 10 - 6, -4); ctx.lineTo(i * 10 + 10, 30); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, -22, 22, 0, 6.283); if (hap > 0.5) { ctx.save(); ctx.clip(); ctx.restore(); }
  shape(ctx, '#F4D6E0', '#E2A9BC', 2); circ(ctx, -10, -32, 5, rgba('#FFFFFF', 0.7));
  if (hap > 0.5) circ(ctx, 18, -36, 12, C.bgSchema); ctx.restore(); }; }
function spiegelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(70, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(84, 0, 15, 15, 0, 0, 6.283); shape(ctx, '#DDE6EE', '#8A939E', 3); circ(ctx, 80, -4, 4, rgba('#FFFFFF', 0.8)); ctx.restore(); }
function spuitHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -10, -11, 80, 22, 6); shape(ctx, rgba('#DDE6EE', 0.9), '#8A939E', 2); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(14, -7, 50, 14);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(118, 0); ctx.stroke(); ctx.restore(); }
function boorHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -14, -10, 96, 20, 9); shape(ctx, '#C9CED6', '#7A838E', 2); ctx.beginPath(); ctx.moveTo(82, -10); ctx.lineTo(104, -16); ctx.lineTo(104, 16); ctx.lineTo(82, 10); shape(ctx, '#B8BEC6', '#7A838E', 2);
  ctx.strokeStyle = '#E8EAEE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(104, 12); ctx.lineTo(104, 34); ctx.stroke(); ctx.restore(); }

// tandartslamp aan een arm (van boven); aan = lichtbundel
function tandLamp(ctx, x, y, a = 1, aan = 0, richting = 0.35) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#8A939E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 260, 0); ctx.lineTo(x - 260, y - 120); ctx.lineTo(x, y - 40); ctx.stroke();
  ctx.save(); ctx.translate(x, y); ctx.rotate(richting);
  if (aan > 0.01) { const g = ctx.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, rgba('#FFF4C8', 0.32 * aan)); g.addColorStop(1, rgba('#FFF4C8', 0)); ctx.beginPath(); ctx.moveTo(-50, 20); ctx.lineTo(50, 20); ctx.lineTo(170, 420); ctx.lineTo(-170, 420); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); }
  roundRect(ctx, -80, -40, 160, 60, 24); shape(ctx, '#DDE2E8', '#8A939E', 2.5); ctx.beginPath(); ctx.ellipse(0, 20, 62, 12, 0, 0, Math.PI); shape(ctx, aan > 0.3 ? '#FFF4C8' : '#B8C0C8', null); ctx.restore(); ctx.restore(); }

// tandartsstoel (zijaanzicht, rugleuning schuin)
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }

// röntgenapparaat (buis aan arm)
function rontgenBuis(ctx, x, y, a = 1, straal = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#8A939E'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 200, 0); ctx.lineTo(x - 200, y - 80); ctx.lineTo(x - 40, y); ctx.stroke();
  roundRect(ctx, x - 50, y - 50, 110, 100, 18); shape(ctx, '#DDE2E8', '#8A939E', 2.5); roundRect(ctx, x + 60, y - 30, 90, 60, 6); shape(ctx, '#C9CED6', '#8A939E', 2.5);
  if (straal > 0.01) for (let i = 0; i < 4; i++) { const u = (t * 1.5 + i / 4) % 1; ctx.strokeStyle = rgba(C.teal, straal * (1 - u)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + 150, y, 20 + u * 120, -0.5, 0.5); ctx.stroke(); }
  ctx.restore(); }

// ---------- röntgenfoto (bitewing) ----------
// omtrek van een kies (kroon boven, wortels omlaag), halsrand op y=0; w = breedte, hc = kroonhoogte, hr = wortellengte
function _kiesPad(ctx, w, hc, hr, k = 0) { const W2 = w / 2, kr = 1 - k; ctx.beginPath();
  ctx.moveTo(-W2 * 0.8 * kr, 0); ctx.bezierCurveTo(-W2 * 1.02 * kr, -hc * 0.3, -W2 * 1.0 * kr, -hc * 0.75 * kr, -W2 * 0.72 * kr, -hc * kr);
  ctx.quadraticCurveTo(-W2 * 0.45 * kr, -hc * 1.06 * kr, -W2 * 0.22 * kr, -hc * 0.9 * kr); ctx.quadraticCurveTo(0, -hc * 0.82 * kr, W2 * 0.22 * kr, -hc * 0.9 * kr);
  ctx.quadraticCurveTo(W2 * 0.45 * kr, -hc * 1.06 * kr, W2 * 0.72 * kr, -hc * kr); ctx.bezierCurveTo(W2 * 1.0 * kr, -hc * 0.75 * kr, W2 * 1.02 * kr, -hc * 0.3, W2 * 0.8 * kr, 0);
  if (hr > 0) { ctx.bezierCurveTo(W2 * 0.78, hr * 0.5, W2 * 0.62, hr * 0.95, W2 * 0.42, hr); ctx.quadraticCurveTo(W2 * 0.28, hr * 0.98, W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(W2 * 0.18, hr * 0.3, 0, hr * 0.26);
    ctx.quadraticCurveTo(-W2 * 0.18, hr * 0.3, -W2 * 0.24, hr * 0.7); ctx.quadraticCurveTo(-W2 * 0.28, hr * 0.98, -W2 * 0.42, hr); ctx.bezierCurveTo(-W2 * 0.62, hr * 0.95, -W2 * 0.78, hr * 0.5, -W2 * 0.8, 0); }
  ctx.closePath(); }
function _xrKies(ctx, x, y, w, hc, hr, boven) { ctx.save(); ctx.translate(x, y); if (boven) ctx.scale(1, -1);
  _kiesPad(ctx, w, hc, hr, 0); ctx.fillStyle = '#A9A9A6'; ctx.fill(); // tandbeen
  ctx.save(); _kiesPad(ctx, w, hc, 0, 0); ctx.clip(); ctx.lineWidth = w * 0.11; ctx.strokeStyle = '#EDEDEA'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); // glazuur: rand van de kroon
  ctx.beginPath(); ctx.rect(-w, -hc * 1.2, w * 2, hc * 0.32); ctx.fillStyle = '#EDEDEA'; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w, -hc * 1.3, w * 2, hc * 1.25); ctx.clip(); ctx.lineWidth = w * 0.06; ctx.strokeStyle = '#E4E4E0'; _kiesPad(ctx, w, hc, 0, 0); ctx.stroke(); ctx.restore();
  // pulpa: kamer + twee kanalen
  ctx.fillStyle = '#4A4A4C'; ctx.beginPath(); ctx.moveTo(-w * 0.2, -hc * 0.1); ctx.quadraticCurveTo(-w * 0.22, -hc * 0.5, -w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(0, -hc * 0.4, w * 0.12, -hc * 0.52); ctx.quadraticCurveTo(w * 0.22, -hc * 0.5, w * 0.2, -hc * 0.1);
  ctx.quadraticCurveTo(w * 0.22, hr * 0.5, w * 0.21, hr * 0.92); ctx.lineTo(w * 0.17, hr * 0.92); ctx.quadraticCurveTo(w * 0.14, hr * 0.4, w * 0.04, hr * 0.12); ctx.lineTo(-w * 0.04, hr * 0.12); ctx.quadraticCurveTo(-w * 0.14, hr * 0.4, -w * 0.17, hr * 0.92); ctx.lineTo(-w * 0.21, hr * 0.92); ctx.quadraticCurveTo(-w * 0.22, hr * 0.5, -w * 0.2, -hc * 0.1); ctx.fill();
  ctx.restore(); }
// gaatje: 0 = geen, 1 = in het glazuur, 2 = tot in het tandbeen; plek = tussen kies 1 en 2 onder (rechterkant van kies 1)
function rontgenFoto(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { gaatje = 1, donker = 1, ring = 0, licht = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 26); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); ctx.fillStyle = '#151618'; ctx.fillRect(x, y, w, h);
  ctx.filter = 'blur(2.2px)';
  // kaakbot (lichtgrijs, vlekkerig) boven en onder
  ctx.fillStyle = '#4E4F52'; ctx.fillRect(x, y, w, h * 0.3); ctx.fillRect(x, y + h * 0.7, w, h * 0.3);
  for (let i = 0; i < 140; i++) { const bx = x + hash(i * 3 + 1) * w, by = hash(i * 3 + 2) < 0.5 ? y + hash(i * 7) * h * 0.3 : y + h * 0.7 + hash(i * 7) * h * 0.3; circ(ctx, bx, by, 4 + hash(i * 11) * 10, rgba(hash(i) < 0.5 ? '#6A6B6E' : '#353638', 0.55)); }
  const cw = w * 0.27, hc = h * 0.25, hr = h * 0.3, midY = y + h * 0.5, xs = [x + w * 0.2, x + w * 0.5, x + w * 0.8];
  xs.forEach((xx, i) => { _xrKies(ctx, xx + (i - 1) * 4, midY + h * 0.02 + hc, cw, hc, hr, false); _xrKies(ctx, xx + w * 0.1 * (i === 0 ? 0.3 : 0.4), midY - h * 0.02 - hc, cw * 0.98, hc * 0.95, hr, true); });
  // gaatje tussen kies 1 en 2 onder, aan de zijkant van kies 1
  if (gaatje > 0 && donker > 0.01) { const gx = xs[0] + cw * 0.47, gy = midY + h * 0.02 + hc * 0.55; ctx.fillStyle = rgba('#0E0F10', donker); ctx.beginPath();
    if (gaatje === 1) { ctx.moveTo(gx + 8, gy - 30); ctx.lineTo(gx - 30, gy); ctx.lineTo(gx + 8, gy + 30); ctx.closePath(); }
    else { ctx.moveTo(gx + 6, gy - 34); ctx.lineTo(gx - 22, gy - 14); ctx.lineTo(gx - 58, gy + 2); ctx.lineTo(gx - 22, gy + 18); ctx.lineTo(gx + 6, gy + 34); ctx.closePath(); } ctx.fill(); }
  ctx.filter = 'none';
  if (licht > 0.01) { ctx.fillStyle = rgba('#FFFFFF', 0.08 * licht * (0.6 + 0.4 * Math.sin(t * 4))); ctx.fillRect(x, y, w, h); }
  const v = ctx.createRadialGradient(x + w / 2, y + h / 2, h * 0.3, x + w / 2, y + h / 2, w * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(x, y, w, h); ctx.restore();
  if (ring > 0.01 && gaatje > 0) { const gx = xs[0] + cw * 0.47 - (gaatje === 2 ? 16 : 6), gy = midY + h * 0.02 + hc * 0.55; ctx.save(); ctx.globalAlpha *= ring; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.arc(gx, gy, 62 + 4 * Math.sin(t * 3), 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { gx: xs[0] + cw * 0.47, gy: midY + h * 0.02 + hc * 0.55 }; }

// ---------- zooms ----------
// glazuurkristallen: dicht opeengepakte zeskantige staafjes
function kristallen(ctx, cx, cy, r, a = 1, gat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#2A3446'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); const s = 26;
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const px = cx + i * s * 1.5, py = cy + j * s * 1.73 + (i % 2 ? s * 0.865 : 0); if (gat > 0 && Math.hypot(px - cx, py - cy) < r * 0.55 * gat && hash(i * 31 + j * 7) < 0.7) continue;
    ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; const xx = px + Math.cos(an) * s * 0.92, yy = py + Math.sin(an) * s * 0.92; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.closePath();
    shape(ctx, (i + j) % 3 ? '#E8EEF2' : '#D6DFE6', '#AEBAC6', 1.5); }
  ctx.restore(); }
// één kanaaltje in het tandbeen, horizontaal van x0 (glazuurkant) naar x1 (pulpa); beweeg = vochtverschuiving 0..1; zenuw = gloed van het zenuwuiteinde
function kanaaltje(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; const { t = 0, beweeg = 0, zenuw = 0, kou = 0, dood = 0 } = o; ctx.save(); ctx.globalAlpha *= a; const L = x1 - x0;
  // tandbeen
  roundRect(ctx, x0 - 20, y - 150, L + 40, 300, 20); shape(ctx, '#E8D9A8', '#C9B680', 2);
  ctx.strokeStyle = rgba('#B8A470', 0.6); ctx.lineWidth = 2; for (const dy of [-110, -60, 60, 110]) { ctx.beginPath(); ctx.moveTo(x0, y + dy); for (let k = 0; k <= 30; k++) ctx.lineTo(x0 + L * k / 30, y + dy + Math.sin(k * 0.5 + dy) * 3); ctx.stroke(); }
  // kanaal
  ctx.beginPath(); ctx.moveTo(x0, y - 18); for (let k = 0; k <= 30; k++) ctx.lineTo(x0 + L * k / 30, y - 18 + Math.sin(k * 0.4) * 4); for (let k = 30; k >= 0; k--) ctx.lineTo(x0 + L * k / 30, y + 18 + Math.sin(k * 0.4) * 4); ctx.closePath(); shape(ctx, rgba('#9FD0E8', 0.55), '#7AAFC8', 2);
  // vochtdeeltjes, schuiven richting pulpa
  for (let i = 0; i < 16; i++) { const u0 = hash(i * 5 + 1), sh = beweeg * 0.12 * (0.7 + 0.6 * hash(i)) + 0.004 * Math.sin(t * 2 + i); const u = clamp(u0 + sh, 0, 1); circ(ctx, x0 + u * L, y + (hash(i * 9) - 0.5) * 22 + Math.sin(u * 12) * 4, 4, rgba('#F2F2EE', 0.85)); }
  // zenuwuiteinde aan de pulpakant
  ctx.strokeStyle = dood > 0.5 ? '#8A8478' : (zenuw > 0.01 ? C.goud : '#E8D27A'); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1 + 120, y + 60); ctx.bezierCurveTo(x1 + 60, y + 40, x1 + 10, y + 10, x1 - L * 0.12, y); ctx.stroke();
  if (zenuw > 0.01) { ctx.save(); ctx.globalAlpha *= zenuw; circ(ctx, x1 - L * 0.12, y, 16 + 4 * Math.sin(t * 10), rgba(C.goud, 0.45)); ctx.restore(); }
  // kou van buiten
  if (kou > 0.01) { ctx.save(); ctx.globalAlpha *= kou; sneeuwvlok(ctx, x0 - 70, y, 34); for (let i = 0; i < 3; i++) { const u = (t * 0.8 + i / 3) % 1; ctx.strokeStyle = rgba('#BFE3F5', 1 - u); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x0 - 70, y, 40 + u * 50, -0.6, 0.6); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); }
function sneeuwvlok(ctx, x, y, r, col = '#BFE3F5') { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3, cx2 = Math.cos(an), sy2 = Math.sin(an); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + cx2 * r, y + sy2 * r); ctx.stroke();
  for (const d of [-0.5, 0.5]) { ctx.beginPath(); ctx.moveTo(x + cx2 * r * 0.6, y + sy2 * r * 0.6); ctx.lineTo(x + Math.cos(an + d) * r * 0.85, y + Math.sin(an + d) * r * 0.85); ctx.stroke(); } } ctx.restore(); }
// wortelvlies: wortel (links) — spleet met vezels — kaakbot (rechts)
function vliesZoom(ctx, cx, cy, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#E8D9A8'; ctx.fillRect(cx - r, cy - r, r * 0.85, 2 * r); ctx.fillStyle = '#F2EDE0'; ctx.fillRect(cx - r * 0.15 - 14, cy - r, 14, 2 * r); // wortel met cement
  ctx.fillStyle = '#D9C9B4'; ctx.fillRect(cx + r * 0.25, cy - r, r, 2 * r); for (let i = 0; i < 40; i++) { const bx = cx + r * 0.3 + hash(i * 3) * r * 0.75, by = cy - r + hash(i * 5) * 2 * r; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 12, 6 + hash(i * 2) * 8, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#B8A68E', null); }
  ctx.fillStyle = '#EDB8B8'; ctx.fillRect(cx - r * 0.15, cy - r, r * 0.4, 2 * r);
  ctx.strokeStyle = '#B86A72'; ctx.lineWidth = 3; for (let k = 0; k < 14; k++) { const yy = cy - r + 20 + k * (2 * r - 40) / 13, sw = Math.sin(t * 1.5 + k) * 2; ctx.beginPath(); ctx.moveTo(cx - r * 0.15, yy + 14); ctx.quadraticCurveTo(cx + r * 0.05, yy + sw, cx + r * 0.25, yy - 14); ctx.stroke(); }
  ctx.restore(); }

// ---------- bacteriën ----------
function bacterie(ctx, x, y, s, an, soort = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (soort === 0) { roundRect(ctx, -14 * s, -6 * s, 28 * s, 12 * s, 6 * s); shape(ctx, '#7FB58A', '#5A8F66', 1.5); } else { circ(ctx, -5 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); circ(ctx, 6 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); }
  ctx.restore(); }

// ---------- overige ----------
function tandpastaTube(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.2);
  ctx.beginPath(); ctx.moveTo(-90, -30); ctx.lineTo(70, -24); ctx.lineTo(70, 24); ctx.lineTo(-90, 30); ctx.lineTo(-100, 0); ctx.closePath(); shape(ctx, '#F2F2EE', '#AEB6C0', 2); ctx.fillStyle = rgba(C.teal, 0.8); ctx.fillRect(-60, -16, 90, 32);
  roundRect(ctx, 70, -16, 30, 32, 6); shape(ctx, '#2E8A9A', null); text(ctx, 'F', -15, 12, fTekst(30, 800), '#F2F2EE', 'center'); ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
function floss(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -40, -30, 80, 60, 14); shape(ctx, '#E8EEF2', '#9AA3B2', 2);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(30, -24); ctx.bezierCurveTo(80, -60, 120, -10, 150, -50); ctx.stroke(); ctx.restore(); }
function blauwLampje(ctx, x, y, an, a = 1, aan = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (aan > 0.01) { const g = ctx.createLinearGradient(0, 0, 160, 0); g.addColorStop(0, rgba('#6AA8FF', 0.7 * aan)); g.addColorStop(1, rgba('#6AA8FF', 0)); ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(170, -60); ctx.lineTo(170, 60); ctx.lineTo(0, 14); ctx.closePath(); ctx.fillStyle = g; ctx.fill(); }
  roundRect(ctx, -240, -18, 220, 36, 16); shape(ctx, '#3A4458', '#8A939E', 2); ctx.beginPath(); ctx.moveTo(-20, -14); ctx.lineTo(10, -22); ctx.lineTo(10, 22); ctx.lineTo(-20, 14); shape(ctx, '#C9CED6', '#8A939E', 2);
  circ(ctx, 6, 0, 10, aan > 0.3 ? '#9CC6FF' : '#5A6478'); ctx.restore(); }
function maantje(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.85, 0, 6.283, true); ctx.fillStyle = '#F2E2A8'; ctx.fill('evenodd'); ctx.restore(); }
// klein stukje huid in doorsnede met een ontsteking die naar buiten kan bollen
function huidStuk(ctx, x, y, w, a = 1, zwel = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const b = 70 * zwel;
  ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x - 90, y); ctx.bezierCurveTo(x - 60, y - b, x + 60, y - b, x + 90, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + 170); ctx.lineTo(x - w / 2, y + 170); ctx.closePath(); shape(ctx, '#E8B8A0', '#C98A70', 2);
  ctx.beginPath(); ctx.moveTo(x - w / 2, y + 26); ctx.lineTo(x - 90, y + 26); ctx.bezierCurveTo(x - 60, y + 26 - b, x + 60, y + 26 - b, x + 90, y + 26); ctx.lineTo(x + w / 2, y + 26); ctx.strokeStyle = rgba('#C98A70', 0.6); ctx.lineWidth = 2; ctx.stroke();
  if (zwel > 0.01) { ctx.beginPath(); ctx.ellipse(x, y + 60 - b * 0.4, 70 + 20 * zwel, 40 + 30 * zwel, 0, 0, 6.283); shape(ctx, rgba(C.koraal, 0.5 * zwel), null); }
  ctx.restore(); }
// kaartje Nederland met drie steden
function nlKaart(ctx, x, y, s, a = 1, aan = [1, 1, 1]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const P = [[-60, -190], [10, -215], [120, -205], [150, -150], [120, -60], [150, 0], [120, 60], [70, 90], [60, 190], [-10, 210], [-20, 120], [-110, 110], [-170, 60], [-120, 20], [-90, -60], [-70, -130]];
  ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); shape(ctx, rgba(C.groen, 0.18), rgba(C.groen, 0.7), 2.5);
  [['Groningen', 115, -175], ['Amsterdam', -60, -40], ['Nijmegen', 70, 40]].forEach(([n, px, py], i) => { if (aan[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= aan[i]; circ(ctx, px, py, 11, C.goud, '#121A26', 2); text(ctx, n, px + 18, py + 9, fTekst(28, 700), C.text, 'left'); ctx.restore(); });
  ctx.restore(); }
// kaartje voor de recap
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// felle steek (bliksem) bij de wang
function steek(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(24, -10); ctx.lineTo(6, -6); ctx.lineTo(30, 50); ctx.lineTo(-14, 0); ctx.lineTo(4, -4); ctx.lineTo(-16, -56); ctx.closePath(); shape(ctx, C.goud, '#FFF4C8', 2);
  ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const [a1, a2] of [[-2.4, 60], [-0.6, 64], [2.6, 58]]) { ctx.beginPath(); ctx.moveTo(Math.cos(a1) * 40, Math.sin(a1) * 40); ctx.lineTo(Math.cos(a1) * a2 * 1.3, Math.sin(a1) * a2 * 1.3); ctx.stroke(); } ctx.restore(); }
// signaalpulsjes langs een pad (lijst punten); u = fase
function signaalPad(ctx, pts, a = 1, t = 0, col = C.goud, n = 3, spd = 0.7) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  for (let k = 0; k < n; k++) { let u = ((t * spd + k / n) % 1) * tot; let i = 0; while (i < L.length - 1 && u > L[i]) { u -= L[i]; i++; } const f = u / L[i]; const px = lerp(pts[i][0], pts[i + 1][0], f), py = lerp(pts[i][1], pts[i + 1][1], f); circ(ctx, px, py, 10, rgba(col, 0.9), '#FFF4C8', 2); }
  ctx.restore(); }

// ================= kies: wrapper rond de gedeelde kies() + eigen uitbreidingen =================
// Lokale maat (s = 1): kroontop y≈-300, hals y≈-60, wortelpunten y≈+330, breedte kroon ±190. Midden (x, y) = halsrand.
const KG = { top: -300, hals: -60, punt: 330, bw: 190, kamerTop: -175, kamerBodem: -40, hoorn: 80, kanaalX: 92, glz: 34, tvlees: -30, bot: 10 };
// punt in schermcoördinaten voor labels en zooms
function kiesPunt(x, y, s, wat) { const P = { glazuur: [-150, -250], tandbeen: [-112, -120], pulpa: [0, -110], zenuw: [-92, 150], wortelvlies: [-150, 160], kaakbot: [-300, 200], gaatje1: [178, -170], gaatje2: [150, -150], wortelpunt: [-92, 330] }[wat] || [0, 0]; return { x: x + P[0] * s, y: y + P[1] * s }; }
// pad van de buitenkant van de tand (kroon + twee wortels), lokale maat
function kiesOmtrek(ctx, k = 0) { const b = KG.bw - k, tp = KG.top + k; ctx.beginPath();
  ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals);
  ctx.bezierCurveTo(b * 0.8 - k * 0.2, 80, 150 - k, 280, 118 - k * 0.6, KG.punt - k); ctx.quadraticCurveTo(92, KG.punt + 12 - k, 66 + k * 0.6, KG.punt - 10 - k); ctx.bezierCurveTo(60 + k, 200, 40 + k, 60 + k, 0, 40 + k);
  ctx.bezierCurveTo(-40 - k, 60 + k, -60 - k, 200, -66 - k * 0.6, KG.punt - 10 - k); ctx.quadraticCurveTo(-92, KG.punt + 12 - k, -118 + k * 0.6, KG.punt - k); ctx.bezierCurveTo(-150 + k, 280, -b * 0.8 + k * 0.2, 80, -b * 0.78, KG.hals); ctx.closePath(); }
function kiesKroon(ctx) { const b = KG.bw, tp = KG.top; ctx.beginPath(); ctx.moveTo(-b * 0.78, KG.hals); ctx.bezierCurveTo(-b * 1.04, -110, -b * 1.02, -240, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.58, tp - 6, -b * 0.36, tp + 10); ctx.quadraticCurveTo(-b * 0.12, tp + 34, 0, tp + 30);
  ctx.quadraticCurveTo(b * 0.12, tp + 34, b * 0.36, tp + 10); ctx.quadraticCurveTo(b * 0.58, tp - 6, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.02, -240, b * 1.04, -110, b * 0.78, KG.hals); ctx.quadraticCurveTo(0, -95, -b * 0.78, KG.hals); ctx.closePath(); }
// grens glazuur/tandbeen: binnenrand van de kroon (dun bij de hals)
function kiesDEJ(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.beginPath(); ctx.moveTo(-KG.bw * 0.78 + 4, KG.hals); ctx.bezierCurveTo(-b * 1.02, -110, -b * 1.0, -230, -b * 0.8, tp + 30); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.12, tp + 38, 0, tp + 34);
  ctx.quadraticCurveTo(b * 0.12, tp + 38, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.8, tp + 30); ctx.bezierCurveTo(b * 1.0, -230, b * 1.02, -110, KG.bw * 0.78 - 4, KG.hals); }
function kiesPulpaPad(ctx, k = 0) { const h = KG.hoorn - k * 0.5, tp = KG.kamerTop + k; ctx.beginPath(); ctx.moveTo(-h - 12 + k, -50); ctx.quadraticCurveTo(-h - 14 + k, tp + 30, -h + 6, tp); ctx.quadraticCurveTo(-h + 30, tp + 26, -30, tp + 44); ctx.quadraticCurveTo(0, tp + 52, 30, tp + 44); ctx.quadraticCurveTo(h - 30, tp + 26, h - 6, tp); ctx.quadraticCurveTo(h + 14 - k, tp + 30, h + 12 - k, -50);
  ctx.bezierCurveTo(h + 10 - k, 40, KG.kanaalX + 12 - k * 0.6, 200, KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(KG.kanaalX - 14 + k * 0.6, 200, 60 + k, 50, 24, KG.kamerBodem + 6);
  ctx.lineTo(-24, KG.kamerBodem + 6); ctx.bezierCurveTo(-60 - k, 50, -KG.kanaalX + 14 - k * 0.6, 200, -KG.kanaalX + 4 - k * 0.3, KG.punt - 24); ctx.lineTo(-KG.kanaalX - 4 + k * 0.3, KG.punt - 24); ctx.bezierCurveTo(-KG.kanaalX - 12 + k * 0.6, 200, -h - 10 + k, 40, -h - 12 + k, -50); ctx.closePath(); }
// midden van een kanaal (zenuw en bloedvat lopen erdoor): van de kamer naar de wortelpunt; kant ±1, off = zijwaartse verschuiving
function kanaalLijn(ctx, kant, off = 0) { ctx.beginPath(); ctx.moveTo(kant * 30 + off, -150); ctx.quadraticCurveTo(kant * 70 + off, -100, kant * 72 + off * 0.7, -40); ctx.bezierCurveTo(kant * 74 + off * 0.5, 60, kant * KG.kanaalX + off * 0.3, 200, kant * KG.kanaalX + off * 0.2, KG.punt - 6); }

// eigen doorsnede (tijdelijk, tot tand_kies.js er is; ook als basis voor de uitbreidingen)
function _kiesEigen(ctx, x, y, s, o = {}) { const { t = 0, hl = null, kanaal = 0, zenuwKleur = '#F2D06A', pulpaKleur = '#E89AA8', zonderPulpa = false } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const dimm = (n) => 1;
  // kaakbot (sponsachtig) met tandvlees erover
  ctx.save(); ctx.globalAlpha *= dimm('kaakbot'); ctx.beginPath(); ctx.moveTo(-390, KG.bot + 20); ctx.quadraticCurveTo(-250, KG.bot - 10, -175, KG.bot); ctx.lineTo(175, KG.bot); ctx.quadraticCurveTo(250, KG.bot - 10, 390, KG.bot + 20); ctx.lineTo(390, 370); ctx.lineTo(-390, 370); ctx.closePath(); shape(ctx, '#D9C9B4', '#B8A68E', 2);
  ctx.save(); ctx.clip(); for (let i = 0; i < 90; i++) { const bx = -380 + hash(i * 3 + 7) * 760, by = KG.bot + 20 + hash(i * 5 + 3) * 350; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 16, 6 + hash(i * 2) * 10, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#BFAC92', rgba('#A8957C', 0.7), 1); } ctx.restore(); ctx.restore();
  // wortelvlies: smalle spleet om de wortels met vezeltjes
  ctx.save(); ctx.globalAlpha *= dimm('wortelvlies'); ctx.save(); ctx.beginPath(); ctx.rect(-400, KG.bot - 6, 800, 420); ctx.clip(); kiesOmtrek(ctx, -9); shape(ctx, '#F0C4BE', null); ctx.strokeStyle = rgba('#F7E4DA', 0.95); ctx.lineWidth = 1.6;
  for (const kant of [-1, 1]) for (let k = 0; k < 13; k++) { const yy = 30 + k * 23; for (const zij of [-1, 1]) { const bx = kant * (zij < 0 ? (KG.bw * 0.76 - (yy / 330) * 70) : (40 + (yy / 330) * 26)) * 1; const sx = kant * (zij < 0 ? 1 : -1); ctx.beginPath(); ctx.moveTo(bx - sx * 4 * 0, yy); ctx.lineTo(bx + sx * 9, yy - 5); ctx.stroke(); } } ctx.restore(); ctx.restore();
  // tand: tandbeen
  ctx.save(); ctx.globalAlpha *= dimm('tandbeen'); kiesOmtrek(ctx); shape(ctx, '#EBDCA6', '#B9A56E', 2.5);
  // kanaaltjes: fijne evenwijdige lijntjes van pulpa naar buiten
  ctx.save(); kiesOmtrek(ctx); ctx.clip(); ctx.strokeStyle = rgba('#B9A06A', 0.5 + 0.4 * kanaal); ctx.lineWidth = 1.3 + kanaal;
  for (let i = 0; i < 46; i++) { const u = i / 45, an = Math.PI * (1.08 + u * 0.84); const r0 = 95, r1 = 300; const cx0 = 0, cy0 = -60; ctx.beginPath(); ctx.moveTo(cx0 + Math.cos(an) * r0, cy0 + Math.sin(an) * r0 * 0.9); ctx.quadraticCurveTo(cx0 + Math.cos(an) * (r0 + r1) * 0.5 + 10 * Math.sin(an), cy0 + Math.sin(an) * (r0 + r1) * 0.45, cx0 + Math.cos(an) * r1, cy0 + Math.sin(an) * r1); ctx.stroke(); }
  for (const kant of [-1, 1]) for (let k = 0; k < 9; k++) { const yy = 0 + k * 34; ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) + 16), yy); ctx.lineTo(kant * (KG.bw * 0.78 - yy * 0.18), yy - 18); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * (KG.kanaalX * (0.75 + yy / 1200) - 16), yy); ctx.lineTo(kant * (44 + yy * 0.06), yy - 12); ctx.stroke(); }
  ctx.restore(); ctx.restore();
  // glazuur
  ctx.save(); ctx.globalAlpha *= dimm('glazuur'); kiesKroon(ctx); ctx.save(); ctx.clip(); ctx.beginPath(); ctx.rect(-300, -400, 600, 400); kiesDEJ(ctx); ctx.lineTo(300, -400); ctx.lineTo(-300, -400); ctx.closePath();
  const gg = ctx.createLinearGradient(-200, -320, 200, -60); gg.addColorStop(0, '#FBFDFF'); gg.addColorStop(1, '#DCE6EE'); kiesKroon(ctx); ctx.fillStyle = gg; ctx.restore();
  ctx.save(); kiesKroon(ctx); ctx.clip(); ctx.beginPath(); ctx.moveTo(-400, -400); ctx.lineTo(400, -400); ctx.lineTo(400, KG.hals); ctx.lineTo(KG.bw * 0.78 - 4, KG.hals); kiesDEJReverse(ctx); ctx.lineTo(-400, KG.hals); ctx.closePath(); ctx.fillStyle = gg; ctx.fill(); ctx.restore();
  kiesDEJ(ctx); ctx.strokeStyle = rgba('#B9A56E', 0.8); ctx.lineWidth = 2; ctx.stroke(); kiesKroon(ctx); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.85); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-150, -245); ctx.quadraticCurveTo(-120, -280, -70, -282); ctx.stroke(); ctx.restore();
  // pulpa met bloedvat en zenuw
  if (!zonderPulpa) { ctx.save(); ctx.globalAlpha *= dimm('pulpa'); kiesPulpaPad(ctx); shape(ctx, pulpaKleur, '#C77A88', 2);
    ctx.save(); kiesPulpaPad(ctx); ctx.clip(); ctx.lineCap = 'round';
    for (const kant of [-1, 1]) { kanaalLijn(ctx, kant, -7); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 6; ctx.stroke(); kanaalLijn(ctx, kant, 7); ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 5; ctx.stroke(); }
    ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-37, -152); ctx.bezierCurveTo(-60, -190, -20, -150, 0, -140); ctx.bezierCurveTo(20, -150, 60, -190, 23, -152); ctx.stroke();
    ctx.strokeStyle = zenuwKleur; ctx.lineWidth = 3; for (const kant of [-1, 1]) { ctx.beginPath(); ctx.moveTo(kant * 34, -150); ctx.quadraticCurveTo(kant * 70, -150, kant * 72, -170); ctx.stroke(); ctx.beginPath(); ctx.moveTo(kant * 36, -150); ctx.quadraticCurveTo(kant * 50, -165, kant * 30, -178); ctx.stroke(); }
    ctx.restore(); ctx.restore(); }
  // tandvlees: roze rand over het bot tot tegen de hals
  if (hl) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.shadowColor = rgba(C.goud, 0.8); ctx.shadowBlur = 14;
    if (hl === 'glazuur') { kiesKroon(ctx); ctx.stroke(); } else if (hl === 'tandbeen') { kiesOmtrek(ctx, 4); ctx.save(); ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } else if (hl === 'pulpa') { kiesPulpaPad(ctx); ctx.stroke(); } else if (hl === 'wortel') { ctx.save(); ctx.beginPath(); ctx.rect(-300, KG.bot, 600, 400); ctx.clip(); kiesOmtrek(ctx); ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimm('tandvlees'); for (const kant of [-1, 1]) { ctx.beginPath(); ctx.moveTo(kant * 400, KG.bot + 30); ctx.quadraticCurveTo(kant * 260, KG.bot - 30, kant * (KG.bw * 0.8 + 6), KG.tvlees - 28); ctx.quadraticCurveTo(kant * (KG.bw * 0.76), KG.tvlees, kant * (KG.bw * 0.74), KG.bot + 8); ctx.quadraticCurveTo(kant * 250, KG.bot + 4, kant * 400, KG.bot + 50); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2); } ctx.restore();
  ctx.restore(); }
function kiesDEJReverse(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.bezierCurveTo(b * 1.02, -110, b * 1.0, -230, b * 0.8, tp + 30); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.12, tp + 38, 0, tp + 34); ctx.quadraticCurveTo(-b * 0.12, tp + 38, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.8, tp + 30); ctx.bezierCurveTo(-b * 1.0, -230, -b * 1.02, -110, -KG.bw * 0.78 + 4, KG.hals); }

// gaatje (lokale maat) aan de rechterzijkant van de kroon: diepte 1 = alleen glazuur, 2 = tot in het tandbeen, 3 = tot in de pulpa
function gaatjePad(ctx, diep) { const d = diep <= 1 ? 30 : diep <= 2 ? 92 : 150; ctx.beginPath(); ctx.moveTo(190, -230); ctx.quadraticCurveTo(186 - d * 0.35, -215, 180 - d * 0.7, -190 + d * 0.05); ctx.quadraticCurveTo(178 - d, -170, 180 - d * 0.7, -150); ctx.quadraticCurveTo(186 - d * 0.3, -132, 194, -120); ctx.closePath(); }
function kiesGaatje(ctx, x, y, s, diep = 1, a = 1) { if (a <= 0.01 || diep <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.save(); kiesOmtrek(ctx); ctx.clip();
  if (diep >= 2) { ctx.save(); ctx.translate(-26, 0); gaatjePad(ctx, diep); ctx.fillStyle = rgba('#B08A4A', 0.45); ctx.fill(); ctx.restore(); }
  gaatjePad(ctx, diep); shape(ctx, '#4A3A2A', '#2E2418', 2); ctx.restore(); ctx.restore(); }
// vulling (komvormig, van het kauwvlak naar de rechterzijkant): f = grootte (0.5 klein … 1.2 groot); vol 0..1 = laagjes gevuld; gat = alleen de lege holte
function vulPad(ctx, f) { const x0 = 150 - 170 * f, d = 60 + 70 * f; ctx.beginPath(); ctx.moveTo(x0, KG.top - 10); ctx.lineTo(260, KG.top - 10); ctx.lineTo(260, KG.top + d + 50 * f); ctx.quadraticCurveTo(150, KG.top + d + 40 * f, x0 + 30, KG.top + d); ctx.quadraticCurveTo(x0 - 6, KG.top + d * 0.6, x0, KG.top - 10); ctx.closePath(); }
function kiesVulling(ctx, x, y, s, f = 1, a = 1, o = {}) { if (a <= 0.01) return; const { vol = 1, blauw = 0, gat = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.save(); kiesOmtrek(ctx); ctx.clip();
  vulPad(ctx, f); ctx.fillStyle = C.bgSchema; if (gat > 0.01 || vol < 1) { ctx.save(); ctx.globalAlpha *= Math.max(gat, vol < 1 ? 1 : 0); ctx.fill(); ctx.strokeStyle = rgba('#8A6A3A', 0.9); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  if (vol > 0.01) { ctx.save(); vulPad(ctx, f); ctx.clip(); const d = 60 + 70 * f, H0 = KG.top + d + 50 * f, Hh = H0 - KG.top + 12; const lvl = H0 - Hh * vol; ctx.fillStyle = '#F1E6CA'; ctx.fillRect(-300, lvl, 600, H0 - lvl + 10);
    ctx.strokeStyle = rgba('#C9B88E', 0.9); ctx.lineWidth = 2; for (let k = 1; k < 4; k++) { const ly = H0 - Hh * k / 4; if (ly > lvl + 1) { ctx.beginPath(); ctx.moveTo(-300, ly); ctx.lineTo(300, ly); ctx.stroke(); } }
    if (blauw > 0.01) { ctx.fillStyle = rgba('#6AA8FF', 0.35 * blauw); ctx.fillRect(-300, lvl - 2, 600, 36); } ctx.restore(); vulPad(ctx, f); ctx.strokeStyle = rgba('#B8A67A', vol); ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.restore(); ctx.restore(); }

// ---------- kies-functies voor de scènes ----------
// basis: gedeelde kies() als die er is en past, anders de eigen doorsnede
function kiesBasis(ctx, x, y, s, o) { _kiesEigen(ctx, x, y, s, o); }
function kiesT2(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  kiesBasis(ctx, x, y, s, o); if (o.gaatje) kiesGaatje(ctx, x, y, s, o.gaatje, 1); if (o.vulling) kiesVulling(ctx, x, y, s, o.vulling, 1); ctx.restore(); }
// namen bij de onderdelen (alpha per onderdeel)
function kiesLabels(ctx, x, y, s, A) { const L = (k, n, sub, dx, dy, al) => naamBij(ctx, n, sub, x + dx * s, y + dy * s, A[k] || 0, al);
  L('glazuur', 'glazuur', 'geen zenuwen', -230, -270, 'right'); L('tandbeen', 'tandbeen', '', -232, -120, 'right'); L('pulpa', 'pulpa', '', 0, -100, 'center');
  L('bloedvat', 'bloedvaatje', '', 240, 70, 'left'); L('zenuw', 'zenuw', '', 240, 150, 'left'); L('kaakbot', 'kaakbot', '', -380, 360, 'left'); L('wortelvlies', 'wortelvlies', '', 240, 260, 'left'); L('wortel', 'wortel', '', -240, 120, 'right');
  // markeringen zonder wijslijn: stipje in het onderdeel bij de rechter namen
  const dot = (k, dx, dy, col) => { if ((A[k] || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= A[k]; circ(ctx, x + dx * s, y + dy * s, 7, col, '#121A26', 2); ctx.restore(); } };
  dot('bloedvat', 79, 60, '#C0392B'); dot('zenuw', 93, 150, '#F2D06A'); dot('wortelvlies', 128, 250, '#F0C4BE'); }
function kanaaltjeMini(ctx, x0, x1, y, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#EBDCA6'; ctx.fillRect(x0, y - 39, x1 - x0, 78); ctx.beginPath(); ctx.moveTo(x0, y - 9); for (let k = 0; k <= 20; k++) ctx.lineTo(x0 + (x1 - x0) * k / 20, y - 9 + Math.sin(k * 0.6 + y) * 3); for (let k = 20; k >= 0; k--) ctx.lineTo(x0 + (x1 - x0) * k / 20, y + 9 + Math.sin(k * 0.6 + y) * 3); ctx.closePath(); shape(ctx, rgba('#9FD0E8', 0.6), '#B9A06A', 1.5); ctx.restore(); }
// rij van drie kiezen (bovenaanzicht van opzij, in de mond): witPlek = wit plekje op het glazuur van de middelste; tussen = markering tussen twee kiezen
function kiezenRij(ctx, x, y, s, o = {}) { const { t = 0, witPlek = 0, tussen = 0 } = o; ctx.save();
  [-1, 0, 1].forEach(i => _kiesKlein(ctx, x + i * 400 * s, y, s));
  if (witPlek > 0.01) { ctx.save(); ctx.globalAlpha *= witPlek; ctx.translate(x - 400 * s, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(-70, -200, 46, 30, -0.3, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill(); ctx.strokeStyle = 'rgba(200,210,220,0.9)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  if (tussen > 0.01) { ctx.save(); ctx.globalAlpha *= tussen; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(x + 200 * s, y - 150 * s, 50 * s, 140 * s, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// kies van buiten (zonder doorsnede), met tandvlees
function _kiesKlein(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-210, KG.bot + 10); ctx.quadraticCurveTo(-150, KG.hals - 30, 0, KG.hals - 5); ctx.quadraticCurveTo(150, KG.hals - 30, 210, KG.bot + 10); ctx.lineTo(210, 120); ctx.lineTo(-210, 120); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2.5); ctx.restore(); }

// behandeling (H3): verdoving, boren, laagjes vullen en uitharden
function kiesBehandeling(ctx, x, y, s, o = {}) { const { t = 0, verdoofd = 0, blok = 0, geboord = 0, vul = 0, blauw = 0 } = o;
  kiesBasis(ctx, x, y, s, { t, zenuwKleur: verdoofd > 0.5 ? '#9AA8B8' : '#F2D06A' });
  if (geboord < 0.99 && vul <= 0) kiesGaatje(ctx, x, y, s, 2, 1 - geboord);
  if (geboord > 0.01 || vul > 0) kiesVulling(ctx, x, y, s, 0.85, 1, { vol: vul, gat: Math.min(1, geboord * 1.2), blauw: blauw * (0.6 + 0.4 * Math.sin(t * 6)) });
  // boortje dat in het gaatje werkt
  if (geboord > 0.01 && geboord < 0.99) { ctx.save(); const bx = x + (170 - 60 * geboord) * s, by = y + (KG.top - 20) * s; ctx.translate(bx, by); ctx.rotate(-0.5); roundRect(ctx, -8, -140, 16, 120, 6); shape(ctx, '#C9CED6', '#7A838E', 2); ctx.fillStyle = '#E8EAEE'; ctx.fillRect(-3, -22, 6, 26 + 3 * Math.sin(t * 40)); ctx.restore();
    for (let i = 0; i < 6; i++) { const u = (t * 2 + i / 6) % 1; circ(ctx, bx + 30 * s + u * 60, by - u * 50 + Math.sin(i * 3) * 10, 3, rgba('#E8D9A8', 1 - u)); } }
  // verdoving: blauwe wolk rond de wortelpunt, signaal stopt
  if (verdoofd > 0.01) { ctx.save(); ctx.globalAlpha *= verdoofd; const vx = x - KG.kanaalX * s, vy = y + (KG.punt + 30) * s; const g = ctx.createRadialGradient(vx, vy, 0, vx, vy, 110 * s); g.addColorStop(0, rgba(C.teal, 0.55)); g.addColorStop(1, rgba(C.teal, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(vx, vy, 110 * s, 0, 6.283); ctx.fill();
    ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vx - 260 * s, vy - 120 * s); ctx.lineTo(vx - 30 * s, vy - 10 * s); ctx.stroke(); ctx.restore();
    if (blok > 0.01) { const zx = x - KG.kanaalX * s, zy = y + (KG.punt + 20) * s; signaalPad(ctx, [[x - 72 * s, y - 40 * s], [x - 88 * s, y + 150 * s], [zx, zy - 50 * s]], blok * (1 - verdoofd * 0.0), t, '#9AA8B8', 2, 0.5); kruis(ctx, zx, zy + 10 * s, 22, blok, C.koraal); } }
  if (blauw > 0.01) blauwLampje(ctx, x + 330 * s, y + (KG.top - 110) * s, Math.PI * 0.78, blauw, 1); }

// ontsteking (H4): bacteriën door het gaatje tot in de pulpa, pulpa rood en gezwollen, druk op de zenuw
function kiesOntsteking(ctx, x, y, s, o = {}) { const { t = 0, bact = 0, afval = 0, ontst = 0, wijd = 0, zwel = 0, druk = 0, klop = 0, dood = 0, punt = 0 } = o;
  const pk = dood > 0.5 ? '#8A7A70' : ontst > 0.01 ? _mixHex('#E89AA8', '#D2453A', ontst * 0.8) : '#E89AA8';
  kiesBasis(ctx, x, y, s, { t, pulpaKleur: pk, zenuwKleur: dood > 0.5 ? '#8A8478' : druk > 0.3 ? '#FFD84A' : '#F2D06A' });
  kiesGaatje(ctx, x, y, s, 3, 1);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // bacteriën kruipen van het gaatje naar de pulpa
  for (let i = 0; i < 14; i++) { const f = clamp(bact * 1.4 - i * 0.04, 0, 1); if (f <= 0) continue; const u = hash(i * 7 + 2) * f; const px = lerp(170, 50, u) + Math.sin(t * 2 + i) * 4 + (hash(i * 3) - 0.5) * 30, py = lerp(-175, -150, u) + (hash(i * 5) - 0.5) * 40; bacterie(ctx, px, py, 0.9, hash(i) * 6 + t * 0.3, i % 3 === 0 ? 1 : 0, 1); }
  if (afval > 0.01) for (let i = 0; i < 16; i++) { const u = (t * 0.25 + hash(i * 11)) % 1; circ(ctx, lerp(150, -20, u) + (hash(i) - 0.5) * 40, lerp(-170, -110, u) + (hash(i * 2) - 0.5) * 50, 4, rgba('#B8D46A', afval * 0.8 * (1 - u * 0.6))); }
  // zwelling: rode gloed + kloppende rand in de pulpakamer
  if (zwel > 0.01 || ontst > 0.01) { const p = 1 + (klop + druk) * 0.04 * Math.sin(t * 7); ctx.save(); kiesPulpaPad(ctx); ctx.clip(); const g = ctx.createRadialGradient(0, -110, 10, 0, -110, 140 * p); g.addColorStop(0, rgba('#FF5A4A', 0.55 * Math.max(zwel, ontst * 0.5) * (1 - dood))); g.addColorStop(1, rgba('#FF5A4A', 0)); ctx.fillStyle = g; ctx.fillRect(-200, -260, 400, 300);
    if (wijd > 0.01) { ctx.strokeStyle = rgba('#C0392B', wijd * (1 - dood)); ctx.lineWidth = 6 + 7 * wijd; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-37, -152); ctx.bezierCurveTo(-60, -190, -20, -150, 0, -140); ctx.bezierCurveTo(20, -150, 60, -190, 23, -152); ctx.stroke(); }
    ctx.restore(); }
  if (druk > 0.01) { ctx.save(); ctx.globalAlpha *= druk * (1 - dood); for (let k = 0; k < 8; k++) { const an = -Math.PI * 0.9 + k * Math.PI * 0.8 / 7; const r0 = 60 + 6 * Math.sin(t * 7); pijl(ctx, Math.cos(an) * (r0 + 40), -100 + Math.sin(an) * (r0 + 30) * 0.7, Math.cos(an) * r0 * 0.55, -100 + Math.sin(an) * r0 * 0.4, '#FFD84A', 1, 4, 12); } ctx.restore(); }
  if (punt > 0.01) { ctx.save(); ctx.globalAlpha *= punt; for (const kant of [-1, 1]) { const g = ctx.createRadialGradient(kant * KG.kanaalX, KG.punt + 20, 0, kant * KG.kanaalX, KG.punt + 20, 70); g.addColorStop(0, rgba('#D2453A', 0.7)); g.addColorStop(1, rgba('#D2453A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(kant * KG.kanaalX, KG.punt + 20, 70, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// wortelkanaalbehandeling (H4): weg = pulpa verdwijnt, schoon = vijltje, vul = kanalen gevuld (oranjeroze vulmateriaal) + vulling bovenop
function kiesWortelkanaal(ctx, x, y, s, o = {}) { const { t = 0, weg = 0, schoon = 0, vul = 0, vijl = 0 } = o;
  kiesBasis(ctx, x, y, s, { t, pulpaKleur: _mixHex('#8A7A70', '#8A7A70', 0), zenuwKleur: '#8A8478' });
  kiesGaatje(ctx, x, y, s, 3, 1 - weg);
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // pulpa weghalen: holte (achtergrondkleur) groeit van boven naar beneden
  if (weg > 0.01) { ctx.save(); kiesPulpaPad(ctx); ctx.clip(); const lvl = lerp(-200, KG.punt + 10, weg); ctx.fillStyle = '#F4EEDB'; ctx.fillRect(-200, -260, 400, lvl + 260); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.moveTo(-40, KG.top - 10); ctx.lineTo(60, KG.top - 10); ctx.lineTo(40, -150); ctx.lineTo(-30, -150); ctx.closePath(); ctx.fillStyle = C.bgSchema; ctx.globalAlpha *= weg; ctx.fill(); ctx.restore(); }
  // vijltje op en neer in een kanaal
  if (vijl > 0.01) { ctx.save(); ctx.globalAlpha *= vijl; const kant = Math.sin(t * 0.7) > 0 ? 1 : -1, d = 0.5 + 0.5 * Math.sin(t * 5); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kant * 10, KG.top - 120); ctx.quadraticCurveTo(kant * 60, -60, kant * KG.kanaalX * 0.95, lerp(120, KG.punt - 30, d)); ctx.stroke(); roundRect(ctx, kant * 10 - 16, KG.top - 170, 32, 54, 8); shape(ctx, kant > 0 ? '#E0B64A' : '#5BA4C9', null); ctx.restore(); }
  // vullen: kanalen oranjeroze van de punt omhoog, daarna vulling in de kroon
  if (vul > 0.01) { ctx.save(); kiesPulpaPad(ctx, 4); ctx.clip(); const lvl = lerp(KG.punt, -40, clamp(vul * 1.4, 0, 1)); ctx.fillStyle = '#E8946A'; ctx.fillRect(-200, lvl, 400, KG.punt - lvl + 20); ctx.restore();
    if (vul > 0.7) kiesVulling(ctx, 0, 0, 1, 1.25, clamp((vul - 0.7) / 0.3, 0, 1), {}); }
  ctx.restore(); }
// Wat word jij? · Tandheelkunde 2 · Van glazuur tot zenuw — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Tandarts Wouter; Lotte als patiënt).
// Rode draad: één gaatje in een kies van Lotte, van de eerste foto tot de vulling.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }

Object.assign(SCENES, {
  title(ctx, t) { kiesT2(ctx, 1560, 600, 0.8, { t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('jaar', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'lotte', 760, 880, 520, { t, outfit: 'gewoon', kijk: 1, pose: 'vasthouden', uit: t > q.at('steek', 1) ? 'huilt' : 'blij', hold: ijsjeHold(t > q.at('hap', 1) + 0.4 ? 1 : 0) });
      steek(ctx, 870, 470, 1, q.on('steek', 1, 0.2) * (0.75 + 0.25 * Math.sin(t * 12)));
      kiesT2(ctx, 1380, 520, 0.62, { t, gaatje: 2, a: q.on('kies', 1) }); naamBij(ctx, 'een kies van Lotte', '', 1380, 830, q.on('kies', 1), 'center'); });
    laag(ctx, B, () => { metaA(ctx, 'EEN JAAR GELEDEN', 160, 200, 1, C.grain, 'left', 28);
      tandStoel(ctx, 620, 880); persoon(ctx, 'lotte', 980, 880, 470, { t, outfit: 'gewoon', kijk: 1, uit: 'blij' }); chip(ctx, 'nergens last van', 980, 340, C.groen, q.on('nergens', 1), 28);
      kiesT2(ctx, 1500, 520, 0.6, { t, gaatje: 1 }); naamBij(ctx, 'toch al een gaatje', '', 1500, 830, q.on('gaatje', 1), 'center'); vraagteken(ctx, 1500, 260, q.on('Waarom', 1), 100); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); kiesT2(ctx, 760, 500, 0.95, { t, a: clamp(t / 0.6, 0, 1) }); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const G = q.on('glazuur', 1), T = q.on('tandbeen', 1), P = q.on('pulpa', 1), R = q.on('wortel', 1);
    const hl = t < q.at('Daaronder', 1) ? 'glazuur' : t < q.at('Midden', 1) ? 'tandbeen' : t < q.at('wortel', 1) ? 'pulpa' : 'wortel';
    kiesT2(ctx, 640, 500, 0.95, { t, hl: t > 0.6 ? hl : null, kanaal: T });
    kiesLabels(ctx, 640, 500, 0.95, { glazuur: G, tandbeen: T, pulpa: P, zenuw: q.on('zenuw', 2), bloedvat: q.on('bloedvaatjes', 1), kaakbot: q.on('kaakbot', 1), wortelvlies: q.on('vlies', 1), wortel: R });
    // zooms rechts, één tegelijk
    const z1 = q.on('kristallen', 1) * (1 - q.on('Daaronder', 1)), z2 = q.on('kanaaltjes', 1) * (1 - q.on('Midden', 1)), z3 = q.on('vlies', 1);
    const K = kiesPunt(640, 500, 0.95, 'glazuur'), D = kiesPunt(640, 500, 0.95, 'tandbeen'), V = kiesPunt(640, 500, 0.95, 'wortelvlies');
    zoomCircle(ctx, 1450, 430, 260, K.x, K.y, '', z1, () => kristallen(ctx, 1450, 430, 260, 1));
    laag(ctx, z1, () => { naamBij(ctx, 'kristallen', 'calcium en fosfaat', 1450, 750, q.on('calcium', 1), 'center'); chip(ctx, 'geen cellen · geen zenuwen', 1450, 860, C.koraal, q.on('zenuwen', 1), 28); });
    zoomCircle(ctx, 1450, 430, 260, D.x, D.y, '', z2, () => { ctx.save(); ctx.translate(1450, 430); ctx.rotate(-0.15); ctx.translate(-1450, -430); for (let k = -3; k <= 3; k++) kanaaltjeMini(ctx, 1180, 1720, 430 + k * 78, 1); ctx.restore(); });
    laag(ctx, z2, () => naamBij(ctx, 'kanaaltjes met vocht', '', 1450, 750, q.on('vocht', 1), 'center'));
    zoomCircle(ctx, 1450, 430, 260, V.x, V.y, '', z3, () => vliesZoom(ctx, 1450, 430, 260, 1, t));
    laag(ctx, z3, () => { naamBij(ctx, 'wortel', '', 1250, 470, 1, 'center'); naamBij(ctx, 'kaakbot', '', 1630, 470, 1, 'center'); naamBij(ctx, 'wortelvlies', 'stevige vezels', 1450, 750, q.on('vezels', 1), 'center'); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const [F0, F] = wisselA(q.on('felle', 1, 1));
    const g = t < q.at('tandbeen', 1) ? 1 : 2; const S = 0.72, kx = 360, ky = 470;
    kiesT2(ctx, kx, ky, S, { t, gaatje: g, a: 1 - q.on('felle', 1, 1) * 0.6 });
    tag(ctx, 'merk je niets', kx, 140, C.groen, q.on('merk', 1) * (1 - q.on('tandbeen', 1)), 'center', 30);
    const Z = q.on('prikkel', 1) * F0;
    const D = kiesPunt(kx, ky, S, 'gaatje2');
    laag(ctx, Z, () => { ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(D.x, D.y); ctx.lineTo(760, 330); ctx.moveTo(D.x, D.y); ctx.lineTo(760, 630); ctx.stroke(); ctx.setLineDash([]);
      const bw = q.on('bewegen', 1, 1.5) * (1 - q.on('zenuwuiteinden', 1, 3) * 0.3);
      kanaaltje(ctx, 800, 1430, 480, 1, { t, beweeg: q.on('Kou', 1, 2) + bw, kou: q.on('Kou', 1), zenuw: q.on('zenuwuiteinden', 1) });
      naamBij(ctx, 'glazuurkant', '', 800, 690, 1, 'left'); naamBij(ctx, 'pulpa', '', 1500, 690, 1, 'center'); naamBij(ctx, 'zenuwuiteinde', '', 1300, 400, q.on('zenuwuiteinden', 1), 'center');
      const B = q.on('signaal', 1); brein(ctx, 1640, 240, 0.42, B, { t, gloed: q.on('hersenen', 1) }); naamBij(ctx, 'hersenen', '', 1640, 150, B, 'center'); signaalPad(ctx, [[1550, 540], [1620, 450], [1640, 320]], B, t);
      tag(ctx, 'film: Het kabelnetwerk', 1100, 830, C.teal, q.on('kabelnetwerk', 1), 'center', 28); });
    laag(ctx, F, () => { persoon(ctx, 'lotte', 1250, 880, 500, { t, outfit: 'gewoon', kijk: -1, pose: 'vasthouden', uit: 'huilt', hold: ijsjeHold(1) }); steek(ctx, 1150, 460, 1, 0.75 + 0.25 * Math.sin(t * 12)); chip(ctx, 'felle, korte steek', 1250, 250, C.goud, 1, 30); }); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Daarom', 1, 1));
    laag(ctx, A, () => { tandLamp(ctx, 640, 230, 1, q.on('lamp', 1), 0.25); persoon(ctx, 'wouter', 420, 880, 520, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: spiegelHold }); naamBij(ctx, 'Tandarts Wouter', '', 230, 330, q.on('Wouter', 1));
      kiezenRij(ctx, 1280, 520, 0.55, { t, witPlek: q.on('plekje', 1), tussen: q.on('tussen', 1) });
      naamBij(ctx, 'dof, wit plekje', 'ontkalking', 1060, 250, q.on('plekje', 1), 'center');
      tag(ctx, 'film: Zuur in je mond', 1280, 840, C.teal, q.on('Zuur', 1) * (1 - q.on('tussen', 1)), 'center', 28);
      laag(ctx, q.on('tussen', 1), () => { kruis(ctx, 1490, 210, 26, 1); tag(ctx, 'tussen de kiezen: niet te zien', 1280, 840, C.koraal, 1, 'center', 28); }); });
    laag(ctx, B, () => { rontgenBuis(ctx, 300, 330, 1, q.on('röntgenfoto', 1) * (1 - q.on('licht', 1)), t); persoon(ctx, 'wouter', 230, 880, 460, { t, kijk: 1, uit: 'neutraal', pose: 'wijs' });
      const R = q.on('röntgenfoto', 1); rontgenFoto(ctx, 620, 190, 1180, 560, R, { gaatje: 1, donker: q.on('donkerder', 1), ring: q.on('donkerder', 1), t });
      naamBij(ctx, 'licht', 'glazuur en tandbeen', 760, 830, q.on('licht', 1), 'left');
      naamBij(ctx, 'donker', 'gaatje: minder mineraal', 1240, 830, q.on('mineraal', 1), 'left'); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'EEN JAAR GELEDEN', 160, 170, 1, C.grain, 'left', 28);
    rontgenFoto(ctx, 560, 220, 1000, 510, 1, { gaatje: 1, donker: 1, ring: q.on('vlekje', 1), t });
    naamBij(ctx, 'alleen in het glazuur', '', 1060, 800, q.on('glazuur', 1), 'center');
    persoon(ctx, 'wouter', 260, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'denk' }); vraagteken(ctx, 1720, 450, q.on('Wat', 1), 110); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const V = q.on('vulling', 1, 1); const [A, B] = wisselA(V);
    laag(ctx, A, () => { const her = q.on('herstellen', 1, 2) * 0.35 + q.on('hard', 1, 1.5) * 0.65;
      kiezenRij(ctx, 720, 640, 0.85, { t, witPlek: 1 - her * 0.85, tussen: 0 });
      naamBij(ctx, 'ontkalkt plekje', '', 380, 300, 1 - q.on('hard', 1), 'center'); naamBij(ctx, 'weer hard', '', 380, 300, q.on('hard', 1), 'center', C.groen);
      tandpastaTube(ctx, 1480, 330, 1, q.on('fluoride', 1)); naamBij(ctx, 'fluoride', '', 1480, 430, q.on('fluoride', 1), 'center');
      rager(ctx, 1420, 580, 1, q.on('ragertje', 1)); floss(ctx, 1640, 600, 1, q.on('floss', 1)); naamBij(ctx, 'ook tussen je kiezen', '', 1500, 720, q.on('ragertje', 1), 'center'); });
    laag(ctx, B, () => { const st = [q.on('vulling', 1), q.on('opnieuw', 1), q.on('groter', 1)];
      [0, 1, 2].forEach(i => { kiesT2(ctx, 420 + i * 540, 520, 0.5, { t, a: st[i], vulling: [0.5, 0.8, 1.15][i] }); if (i) pijl(ctx, 420 + i * 540 - 360, 450, 420 + i * 540 - 190, 450, C.line, st[i], 4, 16); });
      naamBij(ctx, 'vulling', '', 420, 800, st[0], 'center'); naamBij(ctx, 'opnieuw', 'gat groter', 960, 800, st[1], 'center'); naamBij(ctx, 'nog eens', 'nog groter', 1500, 800, st[2], 'center');
      tag(ctx, 'pas boren als het echt moet', 960, 230, C.goud, q.on('Daarom', 1), 'center', 34); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Wouter', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'lotte', 300, 880, 480, { t, outfit: 'gewoon', kijk: 1, uit: 'verbaasd' }); kruis(ctx, 300, 300, 22, q.on('poetste', 1)); naamBij(ctx, 'niet tussen haar kiezen', '', 300, 250, q.on('poetste', 1), 'center');
      rontgenFoto(ctx, 640, 230, 1100, 560, q.on('plekje', 1), { gaatje: t > q.at('groeide', 1) + 0.6 ? 2 : 1, donker: 1, ring: q.on('tandbeen', 1), t });
      naamBij(ctx, 'tot in het tandbeen', '', 1190, 860, q.on('tandbeen', 1), 'center'); tag(ctx, 'nu moet het wel', 1190, 180, C.koraal, q.on('wel', 1), 'center', 32); });
    laag(ctx, B, () => { const kx = 1180, ky = 500, S = 0.95;
      const boor = q.on('boort', 1), vul = clamp((t - q.at('laagjes', 1) + 1.5) / 2.6, 0, 1), lagen = Math.floor(clamp((t - q.at('Elke', 1)) / 0.7, 0, 3.99) * (q.on('Elke', 1) > 0.01 ? 1 : 0));
      const fase = t < q.at('boort', 1) ? 0 : t < q.at('kunststof', 1) ? 1 : 2;
      persoon(ctx, 'wouter', 380, 880, 520, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: fase === 0 ? spuitHold : fase === 1 ? boorHold : null });
      kiesBehandeling(ctx, kx, ky, S, { t, verdoofd: q.on('verdooft', 1), blok: q.on('blokkeert', 1), geboord: clamp((t - q.at('boort', 1)) / 2.4, 0, 1) * boor, vul: fase === 2 ? Math.max(vul * 0.25, lagen / 4 + (q.on('Elke', 1) > 0.01 ? 0.25 : 0)) : 0, blauw: q.on('blauw', 1), lagenAan: lagen });
      naamBij(ctx, 'verdoving', 'signaal stopt', 720, 300, q.on('verdooft', 1) * (1 - q.on('boort', 1)), 'center');
      naamBij(ctx, 'zacht tandbeen eruit', '', 720, 300, q.on('boort', 1) * (1 - q.on('kunststof', 1)), 'center');
      naamBij(ctx, 'kunststof in tandkleur', 'dunne laagjes', 720, 300, q.on('kunststof', 1) * (1 - q.on('blauw', 1)), 'center');
      naamBij(ctx, 'blauw licht', 'maakt elke laag hard', 720, 300, q.on('blauw', 1) * (1 - q.on('zoveel', 1)), 'center');
      tag(ctx, 'zoveel mogelijk eigen kies', 720, 300, C.groen, q.on('zoveel', 1), 'center', 30); }); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Hu = q.on('Waarom', 1, 0.8);
    const kx = lerp(760, 520, Hu), S = lerp(0.95, 0.75, Hu);
    kiesOntsteking(ctx, kx, 500, S, { t, bact: q.on('bacteriën', 1, 2), afval: q.on('afvalstoffen', 1), ontst: q.on('ontsteking', 1), wijd: q.on('wijder', 1), zwel: q.on('zwelt', 1) });
    laag(ctx, 1 - Hu, () => { naamBij(ctx, 'bacteriën', '', kx + 420 * S, 220, q.on('bacteriën', 1), 'left'); naamBij(ctx, 'afvalstoffen', '', kx + 420 * S, 300, q.on('afvalstoffen', 1), 'left');
      naamBij(ctx, 'ontsteking', 'afweer reageert', kx + 420 * S, 420, q.on('ontsteking', 1), 'left'); naamBij(ctx, 'bloedvaatjes wijder', '', kx + 420 * S, 530, q.on('wijder', 1), 'left'); naamBij(ctx, 'weefsel zwelt op', '', kx + 420 * S, 610, q.on('zwelt', 1), 'left');
      tag(ctx, 'film: De eerste verdediging', 1500, 800, C.teal, q.on('verdediging', 1), 'center', 28); });
    laag(ctx, Hu, () => { huidStuk(ctx, 1380, 500, 520, q.on('huid', 1), 0.6 + 0.1 * Math.sin(t * 3)); naamBij(ctx, 'ontsteking in je huid', '', 1380, 760, q.on('huid', 1), 'center'); naamBij(ctx, 'in een tand', '', kx, 860, 1, 'center'); vraagteken(ctx, 960, 300, q.on('denk', 1), 100); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const Dd = q.on('Vaak', 1, 1); const [A, B] = wisselA(Dd);
    laag(ctx, A, () => { const hz = q.on('huid', 1); huidStuk(ctx, 460, 520, 520, hz, 0.4 + 0.6 * q.on('uitzetten', 1, 1.5)); naamBij(ctx, 'huid: zwelling kan naar buiten', '', 460, 760, q.on('uitzetten', 1), 'center');
      kiesOntsteking(ctx, 1320, 480, 0.8, { t, bact: 1, ontst: 1, wijd: 1, zwel: 1, druk: q.on('druk', 1), klop: q.on('kloppende', 1) });
      naamBij(ctx, 'tand: opgesloten', '', 1320, 860, q.on('opgesloten', 1), 'center'); naamBij(ctx, 'druk op de zenuw', '', 1620, 300, q.on('druk', 1), 'left');
      maantje(ctx, 1760, 170, 40, q.on('nachts', 1)); naamBij(ctx, 'ook \'s nachts', '', 1700, 260, q.on('nachts', 1), 'center'); });
    laag(ctx, B, () => { kiesOntsteking(ctx, 760, 480, 0.95, { t, bact: 1, ontst: 1, dood: q.on('sterft', 1, 1.5), punt: q.on('punt', 1, 1.5) });
      naamBij(ctx, 'pulpa sterft af', '', 1200, 380, q.on('sterft', 1), 'left'); naamBij(ctx, 'ontsteking bij de wortelpunt', '', 1200, 760, q.on('punt', 1), 'left'); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const kx = 820, S = 1;
    const weg = q.on('weg', 1, 1.2), schoon = q.on('schoon', 1, 1.5), vul = q.on('vult', 1, 1.2);
    persoon(ctx, 'wouter', 280, 880, 500, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: boorHold }); naamBij(ctx, 'wortelkanaalbehandeling', '', 960, 150, q.on('wortelkanaalbehandeling', 1), 'center');
    kiesWortelkanaal(ctx, kx, 500, S, { t, weg, schoon, vul, vijl: q.on('schoon', 1) * (1 - q.on('vult', 1)) });
    naamBij(ctx, 'pulpa eruit', '', 1250, 330, weg * (1 - schoon), 'left'); naamBij(ctx, 'kanaaltjes schoon', '', 1250, 330, schoon * (1 - vul), 'left'); naamBij(ctx, 'en gevuld', '', 1250, 330, vul, 'left');
    laag(ctx, q.on('kou', 1), () => { sneeuwvlok(ctx, 1450, 560, 34); kruis(ctx, 1450, 560, 40, 1); regel(ctx, 'geen kou of warmte', 1520, 572, 1, C.text, 32, 'left', 700); });
    laag(ctx, q.on('staan', 1), () => { vink_(ctx, 1450, 700, 30, 1); regel(ctx, 'blijft staan, je kauwt erop', 1520, 712, 1, C.text, 32, 'left', 700); }); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'lotte', 300, 880, 480, { t, outfit: 'gewoon', kijk: 1, pose: 'vasthouden', uit: 'lacht', hold: ijsjeHold(0) }); persoon(ctx, 'wouter', 560, 880, 520, { t, kijk: -1, uit: 'blij' });
    kiesT2(ctx, 1000, 470, 0.55, { t, vulling: 0.8 });
    recapKaart(ctx, 1300, 260, 520, 'glazuur: geen zenuw', C.teal, q.on('glazuur', 1)); recapKaart(ctx, 1300, 400, 520, 'pijn pas diep in het tandbeen', C.koraal, q.on('diep', 1));
    recapKaart(ctx, 1300, 540, 520, 'zoeken met een röntgenfoto', C.goud, q.on('zoekt', 1)); recapKaart(ctx, 1300, 680, 520, 'pas boren als het moet', C.groen, q.on('voelt', 1)); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    nlKaart(ctx, 470, 470, 1.25, q.on('opleiding', 1), [q.on('Groningen', 1), q.on('Amsterdam', 1), q.on('Nijmegen', 1)]);
    tag(ctx, 'Tandheelkunde · universiteit', 1300, 250, C.teal, q.on('universitaire', 1), 'center', 34);
    regel(ctx, 'zes jaar', 1300, 340, q.on('zes', 1), C.text, 36, 'center', 700); regel(ctx, 'al tijdens je studie patiënten', 1300, 410, q.on('behandelt', 1), C.text2, 30, 'center', 600);
    chip(ctx, 'meer aanmeldingen dan plaatsen: selectie', 1300, 500, C.goud, q.on('selectie', 1), 28);
    persoon(ctx, 'wouter', 1100, 880, 300, { t, kijk: 1, uit: 'blij' }); tag(ctx, 'mbo: tandartsassistent', 1460, 700, C.groen, q.on('mbo', 1), 'center', 32); }
});
