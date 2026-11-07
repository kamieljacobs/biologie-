
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
// Wat word jij? · Tandheelkunde 3 · Bloedend tandvlees — eigen tekeningen (21 okt 2026).
// Kies-doorsnede overgenomen uit t2/teken_t2.js (KG, kiesOmtrek, kiesKroon, kiesDEJ, kiesPulpaPad, kanaalLijn, tand uit _kiesEigen) voor dezelfde look in de reeks;
// uitgebreid met tandvlees en randje (sulcus), plak, tandsteen, pocket, kaakbot dat zakt (botafbrekende cellen), pocketsonde en röntgenfoto met botniveau.

// ================= kies (uit t2) =================
// Lokale maat (s = 1): kroontop y≈-300, hals y≈-60, wortelpunten y≈+330, breedte kroon ±190. Midden (x, y) = halsrand.
const KG = { top: -300, hals: -60, punt: 330, bw: 190, kamerTop: -175, kamerBodem: -40, hoorn: 80, kanaalX: 92, glz: 34, tvlees: -30, bot: 10 };
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

function kiesDEJReverse(ctx) { const b = KG.bw - KG.glz, tp = KG.top + KG.glz + 4; ctx.bezierCurveTo(b * 1.02, -110, b * 1.0, -230, b * 0.8, tp + 30); ctx.quadraticCurveTo(b * 0.56, tp + 2, b * 0.36, tp + 16); ctx.quadraticCurveTo(b * 0.12, tp + 38, 0, tp + 34); ctx.quadraticCurveTo(-b * 0.12, tp + 38, -b * 0.36, tp + 16); ctx.quadraticCurveTo(-b * 0.56, tp + 2, -b * 0.8, tp + 30); ctx.bezierCurveTo(-b * 1.0, -230, -b * 1.02, -110, -KG.bw * 0.78 + 4, KG.hals); }

// ---------- uit t2: instrumenten, bacterie, rager, stoel, röntgenkies, kies van buiten ----------
function spiegelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(70, 0); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(84, 0, 15, 15, 0, 0, 6.283); shape(ctx, '#DDE6EE', '#8A939E', 3); circ(ctx, 80, -4, 4, rgba('#FFFFFF', 0.8)); ctx.restore(); }
function spuitHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -10, -11, 80, 22, 6); shape(ctx, rgba('#DDE6EE', 0.9), '#8A939E', 2); ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(14, -7, 50, 14);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(70, 0); ctx.lineTo(118, 0); ctx.stroke(); ctx.restore(); }
// tandartsstoel (zijaanzicht, rugleuning schuin)
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }
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
// ---------- bacteriën ----------
function bacterie(ctx, x, y, s, an, soort = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  if (soort === 0) { roundRect(ctx, -14 * s, -6 * s, 28 * s, 12 * s, 6 * s); shape(ctx, '#7FB58A', '#5A8F66', 1.5); } else { circ(ctx, -5 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); circ(ctx, 6 * s, 0, 6.5 * s, '#9C8BC9', '#76669F', 1.5); }
  ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
// kaartje voor de recap
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// kies van buiten (zonder doorsnede), met tandvlees
function _kiesKlein(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-210, KG.bot + 10); ctx.quadraticCurveTo(-150, KG.hals - 30, 0, KG.hals - 5); ctx.quadraticCurveTo(150, KG.hals - 30, 210, KG.bot + 10); ctx.lineTo(210, 120); ctx.lineTo(-210, 120); ctx.closePath(); shape(ctx, '#E58C96', '#C96A76', 2.5); ctx.restore(); }

// ---------- tand zelf (tandbeen, glazuur, pulpa), lokale maat; uit t2 _kiesEigen ----------
function _tandT3(ctx, o = {}) { const { kanaal = 0, zenuwKleur = '#F2D06A', pulpaKleur = '#E89AA8', zonderPulpa = false } = o; const dimm = () => 1;
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
}

// ================= nieuw in t3: tandvlees, randje, plak, tandsteen, pocket, kaakbot =================
// maat: 1 mm ≈ 32 eenheden (lokale maat van de kies). Glazuur-cementgrens = KG.hals (-60).
const MM = 32;
// x van het tandoppervlak (rechterkant) op hoogte y (lokale maat), uit de bezierkrommen van kiesOmtrek
const _OPP = (() => { const bz = (p0, p1, p2, p3, u) => { const v = 1 - u; return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3; };
  const pts = []; const b = KG.bw;
  for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([bz(b * 0.8, b * 1.02, b * 1.04, b * 0.78, u), bz(KG.top + 30, -240, -110, KG.hals, u)]); }
  for (let i = 1; i <= 60; i++) { const u = i / 60; pts.push([bz(b * 0.78, b * 0.8, 150, 118, u), bz(KG.hals, 80, 280, KG.punt, u)]); }
  return pts; })();
function oppX(y) { const P = _OPP; if (y <= P[0][1]) return P[0][0]; for (let i = 1; i < P.length; i++) if (P[i][1] >= y) { const [x0, y0] = P[i - 1], [x1, y1] = P[i]; return x0 + (x1 - x0) * (y - y0) / Math.max(1e-6, y1 - y0); } return P[P.length - 1][0]; }

// standaardtoestand van het tandvlees; scènes geven een deel van deze velden mee
// rand = y van de tandvleesrand; diepte = mm (randje/pocket); bot = y van de botrand (null = automatisch)
// rood 0..1 = ontsteking (kleur), zwel 0..1, vaat 0..1 (wijder), wbc 0..1 (witte bloedcellen), bloed 0..1 (druppels)
// plak 0..1 (boven de rand), plakOnder 0..1 (hoe ver de plak in het randje/pocket zit), steen 0..1 (tandsteen)
// oc 0..1 (botafbrekende cellen), stof 0..1 (ontstekingsstoffen), spook 0..1 (stippellijn van de oude botrand), bleek 0..1 (roker: minder doorbloed)
// randje 0..1 (gouden gloed langs het randje), los 0..1 (tand wiebelt)
const TV0 = { rand: -112, diepte: 2, bot: null, rood: 0, zwel: 0, vaat: 0, wbc: 0, bloed: 0, plak: 0, plakOnder: 0, steen: 0, oc: 0, stof: 0, spook: 0, spookBot: 22, bleek: 0, randje: 0, los: 0, bact: 1, t: 0 };
function tvState(o) { const S = Object.assign({}, TV0, o); S.bodem = S.rand + S.diepte * MM; if (S.bot == null) S.bot = Math.max(22, S.bodem + 42); return S; }
function tvKleur(S) { let c = _mixHex('#E99AA2', '#D2453A', clamp(S.rood, 0, 1) * 0.85); if (S.bleek > 0) c = _mixHex(c, '#EDC2BE', S.bleek * 0.75); return c; }
// botrand rechts: van de tand (x = oppX(bot)) naar buiten
function botRand(S, xx) { const x0 = oppX(S.bot) + 4, u = clamp((xx - x0) / (430 - x0), 0, 1), e = u * u * (3 - 2 * u); return lerp(S.bot, KG.bot + 34, e); }
// spleetbreedte van het randje/de pocket op hoogte y
function spleet(S, y) { if (y >= S.bodem) return 0; const gw = 5 + 4.2 * (S.diepte - 2) + 4 * S.zwel; const u = clamp((y - S.rand) / Math.max(1, S.bodem - S.rand), 0, 1); return gw * (1 - u * u); }

// --- kaakbot (beide kanten), met wortelvlies; boven de tand getekend wordt niets
function _bot(ctx, S, links) { const L = links || S;
  const mid = Math.min(Math.max(S.bot, L.bot), 60);
  ctx.beginPath(); ctx.moveTo(-430, KG.bot + 34);
  for (let xx = 430; xx >= oppX(L.bot) + 4; xx -= 12) ctx.lineTo(-xx, botRand(L, xx));
  ctx.lineTo(-oppX(L.bot) - 4, L.bot); ctx.lineTo(-60, mid); ctx.lineTo(60, mid); ctx.lineTo(oppX(S.bot) + 4, S.bot);
  for (let xx = oppX(S.bot) + 4; xx <= 430; xx += 12) ctx.lineTo(xx, botRand(S, xx));
  ctx.lineTo(430, 380); ctx.lineTo(-430, 380); ctx.closePath(); shape(ctx, '#D9C9B4', '#B8A68E', 2);
  ctx.save(); ctx.clip(); for (let i = 0; i < 110; i++) { const bx = -420 + hash(i * 3 + 7) * 840, by = -40 + hash(i * 5 + 3) * 420; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 16, 6 + hash(i * 2) * 10, hash(i * 4) * 3, 0, 6.283); shape(ctx, '#BFAC92', rgba('#A8957C', 0.7), 1); } ctx.restore();
  // wortelvlies: smalle roze spleet om de wortel, alleen onder de botrand
  ctx.save(); ctx.beginPath(); ctx.rect(-430, Math.min(S.bot, L.bot) - 2, 860, 420); ctx.clip(); kiesOmtrek(ctx, -9); shape(ctx, '#F0C4BE', null);
  ctx.strokeStyle = rgba('#F7E4DA', 0.95); ctx.lineWidth = 1.6; for (const kant of [-1, 1]) { const SS = kant < 0 ? L : S; for (let k = 0; k < 14; k++) { const yy = SS.bot + 10 + k * 22; if (yy > KG.punt - 10) break; const bx = oppX(yy) + 2; ctx.beginPath(); ctx.moveTo(kant * bx, yy); ctx.lineTo(kant * (bx + 8), yy - 5); ctx.stroke(); } }
  ctx.restore();
}

// --- botafbrekende cel (osteoclast): grote paarse cel met meerdere kernen, plat op het bot
function osteoclast(ctx, x, y, r, an, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const p = 1 + 0.04 * Math.sin(t * 3 + x);
  ctx.beginPath(); for (let i = 0; i <= 28; i++) { const u = i / 28 * Math.PI; const rr = r * p * (1 + 0.08 * Math.sin(u * 5 + t)); ctx.lineTo(Math.cos(u) * rr * 1.5, -Math.sin(u) * rr * 0.8); }
  for (let i = 0; i <= 10; i++) { const xx = r * 1.5 - i * r * 0.3; ctx.lineTo(xx, 3 + 3 * Math.sin(i * 2.2 + t * 4)); } ctx.closePath(); shape(ctx, '#B79AD8', '#7E62A8', 2);
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse((k - 1.5) * r * 0.55, -r * 0.35, r * 0.2, r * 0.15, 0, 0, 6.283); shape(ctx, '#6E4F9A', null); }
  ctx.restore(); }
// witte bloedcel: bleke bol met gelobde kern
function witteCel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F4F0F8', '#B9AECB', 1.5);
  ctx.fillStyle = '#8C7BBF'; for (const [dx, dy] of [[-0.35, -0.1], [0.05, 0.25], [0.35, -0.12]]) { ctx.beginPath(); ctx.ellipse(x + dx * r, y + dy * r, r * 0.3, r * 0.24, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
// druppel bloed
function bloedDruppel(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.6); ctx.bezierCurveTo(x + r * 0.9, y - r * 0.4, x + r, y + r * 0.9, x, y + r); ctx.bezierCurveTo(x - r, y + r * 0.9, x - r * 0.9, y - r * 0.4, x, y - r * 1.6); shape(ctx, '#C0392B', '#8E2A20', 1.2); circ(ctx, x - r * 0.3, y + r * 0.1, r * 0.22, rgba('#FFFFFF', 0.5)); ctx.restore(); }

// --- één kant van het tandvlees (rechts, lokale maat); voor links met ctx.scale(-1,1)
function _tvKant(ctx, S, kant) { const t = S.t, r = S.rand, sx = (y) => oppX(y);
  // inhoud van het randje/de pocket: donkere spleet
  ctx.beginPath(); ctx.moveTo(sx(r), r); for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y), y); for (let y = S.bodem; y >= r; y -= 4) ctx.lineTo(sx(y), y); ctx.closePath(); ctx.fillStyle = '#4A2230'; ctx.fill();
  // plak onder de rand (in het randje of de pocket) en tandsteen
  const yOnder = r + (S.bodem - r) * clamp(S.plakOnder, 0, 1) * 0.92;
  if (S.steen > 0.01) { const y0 = r - 46 * S.steen, y1 = r + (yOnder - r) * 0.85; ctx.beginPath(); for (let y = y0; y <= y1; y += 5) ctx.lineTo(sx(y) + 2 + S.steen * (9 + 6 * hash(Math.round(y) * 3 + kant)) * Math.min(1, (y1 - y) / 20 + 0.2), y); for (let y = y1; y >= y0; y -= 5) ctx.lineTo(sx(y) - 1, y); ctx.closePath(); shape(ctx, '#CDB27A', '#8F7A4A', 1.6);
    ctx.fillStyle = rgba('#8F7A4A', 0.6); for (let k = 0; k < 10 * S.steen; k++) { const y = lerp(y0, y1, hash(k * 7 + kant)); circ(ctx, sx(y) + 6, y, 1.8, ctx.fillStyle); } }
  _plakLaag(ctx, S, r - 120 * clamp(S.plak, 0, 1), r, S.plak, kant, S.steen > 0.3 ? 12 * S.steen : 0);
  if (S.plakOnder > 0.01) _plakLaag(ctx, S, r, yOnder, 1, kant + 5, S.steen > 0.3 ? 12 * S.steen : 0);
  // tandvlees zelf
  const zw = S.zwel, tip = r - 4 * zw; const gk = tvKleur(S), rk = _mixHex(gk, '#7A2A30', 0.25);
  const buitenTop = sx(r) + spleet(S, r) + 10;
  ctx.beginPath(); ctx.moveTo(sx(r) + spleet(S, r), tip);
  for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y), y);
  for (let y = S.bodem; y <= S.bot; y += 6) ctx.lineTo(sx(y) + 0.5, y);
  for (let xx = sx(S.bot) + 4; xx <= 440; xx += 14) ctx.lineTo(xx, botRand(S, xx) - 2);
  ctx.lineTo(440, KG.bot - 30 - 18 * zw);
  ctx.bezierCurveTo(330, KG.bot - 40 - 26 * zw, buitenTop + 60 + 28 * zw, r + 30 - 8 * zw, buitenTop + 22 + 16 * zw, r + 4);
  ctx.quadraticCurveTo(buitenTop + 4 + 8 * zw, tip - 12 - 6 * zw, sx(r) + spleet(S, r), tip); ctx.closePath();
  shape(ctx, gk, rk, 2.2);
  ctx.save(); ctx.clip();
  // bovenlaag (epitheel) iets lichter langs de buitenkant
  ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(440, KG.bot - 24 - 18 * zw); ctx.bezierCurveTo(330, KG.bot - 34 - 26 * zw, buitenTop + 60 + 28 * zw, r + 36 - 8 * zw, buitenTop + 22 + 16 * zw, r + 10); ctx.stroke();
  // bloedvaatjes: lusjes vlak onder het randje
  const vw = 2.5 + 5 * S.vaat, vc = S.bleek > 0.5 ? rgba('#C0392B', 0.35) : '#B03A36';
  for (let k = 0; k < 4; k++) { const yy = r + 26 + k * Math.max(26, (S.bot - r - 40) / 4), xx = sx(yy) + spleet(S, yy) + 34 + (k % 2) * 30; const lw = vw * (S.bleek > 0.5 ? 0.5 : 1);
    ctx.strokeStyle = vc; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xx + 70, yy + 26); ctx.bezierCurveTo(xx - 14, yy + 24, xx - 14, yy - 8, xx + 20, yy - 6); ctx.bezierCurveTo(xx + 50, yy - 4, xx + 40, yy + 12, xx + 90, yy + 10); ctx.stroke(); }
  // witte bloedcellen: van de vaatjes naar het randje
  if (S.wbc > 0.01) for (let i = 0; i < 7; i++) { const u = ((t * 0.22 + hash(i * 13)) % 1); const yy = r + 30 + hash(i * 5) * Math.max(40, S.bodem - r + 10); const x0 = sx(yy) + spleet(S, yy) + 110, x1 = sx(yy) + spleet(S, yy) + 12; witteCel(ctx, lerp(x0, x1, u), yy + Math.sin(u * 6 + i) * 6, 10, S.wbc * clamp(Math.min(u * 4, (1 - u) * 6), 0, 1)); }
  ctx.restore();
  // gloed langs het randje (aanwijzen zonder wijslijn)
  if (S.randje > 0.01) { ctx.save(); ctx.globalAlpha *= S.randje; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.shadowColor = rgba(C.goud, 0.9); ctx.shadowBlur = 12; ctx.beginPath(); for (let y = r; y <= S.bodem; y += 4) ctx.lineTo(sx(y) + spleet(S, y) + 3, y); ctx.stroke(); ctx.restore(); }
  // bloed: druppels die uit het randje komen en over de tand lopen
  if (S.bloed > 0.01) for (let i = 0; i < 3; i++) { const u = (t * 0.35 + i / 3) % 1; const yy = r - 6 - u * 70, xx = sx(yy) + 8 + i * 4; bloedDruppel(ctx, xx, yy, 7 + 3 * (1 - u), S.bloed * clamp((1 - u) * 2.5, 0, 1)); }
  if (S.bloed > 0.01) { ctx.save(); ctx.globalAlpha *= S.bloed * 0.8; ctx.fillStyle = '#C0392B'; ctx.beginPath(); ctx.ellipse(sx(r) + spleet(S, r) * 0.5 + 2, r - 2, 10, 5, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  // ontstekingsstoffen: van de pocket naar het bot
  if (S.stof > 0.01) for (let i = 0; i < 12; i++) { const u = ((t * 0.3 + hash(i * 17)) % 1); const ya = S.bodem - 10 + hash(i * 3) * 30, yb2 = S.bot + 20 + hash(i * 7) * 20; const xa = sx(ya) + 20 + hash(i) * 40, xb = sx(S.bot) + 40 + hash(i * 9) * 100;
    const px = lerp(xa, xb, u), py = lerp(ya, yb2, u) + Math.sin(u * 8 + i) * 5; ctx.save(); ctx.globalAlpha *= S.stof * clamp(Math.min(u * 5, (1 - u) * 5), 0, 1); circ(ctx, px, py, 5, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  // botafbrekende cellen op de botrand
  if (S.oc > 0.01) { const x1 = sx(S.bot) + 36, x2 = sx(S.bot) + 120; osteoclast(ctx, x1, botRand(S, x1) + 2, 22, Math.atan2(botRand(S, x1 + 5) - botRand(S, x1 - 5), 10), S.oc, t); osteoclast(ctx, x2, botRand(S, x2) + 2, 19, Math.atan2(botRand(S, x2 + 5) - botRand(S, x2 - 5), 10), S.oc * clamp(S.oc * 2 - 0.6, 0, 1), t + 2); }
  // oude botrand als stippellijn
  if (S.spook > 0.01) { ctx.save(); ctx.globalAlpha *= S.spook; ctx.strokeStyle = C.goud; ctx.lineWidth = 3.5; ctx.setLineDash([10, 8]); const G = Object.assign({}, S, { bot: S.spookBot }); ctx.beginPath(); for (let xx = oppX(G.bot) + 4; xx <= 430; xx += 10) ctx.lineTo(xx, botRand(G, xx)); ctx.stroke(); ctx.restore(); } }

// laagje plak (biofilm) langs het tandoppervlak tussen y0 en y1, met staafjes en bolletjes in een slijmlaag
function _plakLaag(ctx, S, y0, y1, dicht, seed, buiten = 0) { if (dicht <= 0.01 || y1 - y0 < 4) return; const sx = (y) => oppX(y) + buiten;
  const dik = 9 + 5 * clamp(dicht, 0, 1);
  ctx.beginPath(); for (let y = y0; y <= y1; y += 4) ctx.lineTo(sx(y) + dik * (0.6 + 0.4 * Math.sin(y * 0.15 + seed)) * clamp(Math.min((y - y0) / 14, (y1 - y) / 10 + 0.4, 1), 0, 1), y); for (let y = y1; y >= y0; y -= 4) ctx.lineTo(sx(y) - 1, y); ctx.closePath(); shape(ctx, rgba('#B8D46A', 0.55), rgba('#8FAF4A', 0.7), 1.2);
  const n = Math.floor((y1 - y0) / 9); for (let i = 0; i < n; i++) { const y = y0 + (i + 0.5) * (y1 - y0) / n; const deel = 0.85 + 0.15 * Math.sin(S.t * 1.5 + i * 2 + seed); bacterie(ctx, sx(y) + 4 + hash(i * 3 + seed) * 4, y, 0.36 * deel, Math.PI / 2 + (hash(i + seed) - 0.5) * 0.9, (i + seed) % 3 === 0 ? 1 : 0, S.bact); } }

// --- complete doorsnede: kies + kaakbot + tandvlees aan twee kanten.  o = toestand rechts (zie TV0), o.links = afwijkingen links
function parodont(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const S = tvState(o), L = tvState(Object.assign({}, o, o.links || {}));
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  _bot(ctx, S, L);
  // tand (met wiebel bij los)
  ctx.save(); if (S.los > 0.01) { ctx.translate(0, KG.punt); ctx.rotate(S.los * 0.035 * Math.sin(S.t * 5)); ctx.translate(0, -KG.punt); } _tandT3(ctx, { kanaal: 0 }); ctx.restore();
  _tvKant(ctx, S, 1); ctx.save(); ctx.scale(-1, 1); _tvKant(ctx, L, -1); ctx.restore();
  ctx.restore(); return S; }
// schermpositie van een lokaal punt
function pp(x, y, s, lx, ly) { return { x: x + lx * s, y: y + ly * s }; }

// --- pocketsonde: dun staafje met mm-streepjes; tip op (tx, ty) lokaal, in = mm in het randje; lengte boven de tip
function sonde(ctx, x, y, s, S, inMM, a = 1, kant = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.scale(kant, 1);
  const ty = S.rand + inMM * MM, gx = oppX(Math.min(ty, S.bodem)) + Math.max(4, spleet(S, Math.min(ty - 6, S.bodem - 6)) * 0.5) + 2; const top = ty - 11 * MM;
  ctx.lineCap = 'round'; ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(gx, ty); ctx.lineTo(gx + 2, top); ctx.quadraticCurveTo(gx + 6, top - 50, gx + 60, top - 80); ctx.stroke();
  ctx.lineWidth = 16; ctx.strokeStyle = '#9AA3AE'; ctx.beginPath(); ctx.moveTo(gx + 60, top - 80); ctx.lineTo(gx + 160, top - 140); ctx.stroke();
  ctx.fillStyle = '#C9CED6'; circ(ctx, gx, ty, 3.5, '#C9CED6');
  // streepjes elke mm, donkere band van 3 tot 5 mm
  ctx.save(); ctx.beginPath(); ctx.rect(-500, -900, 1400, S.rand - 2 + 900); ctx.restore();
  ctx.fillStyle = '#2A2F3A'; ctx.fillRect(gx - 4.5, ty - 5 * MM, 9, 2 * MM);
  ctx.strokeStyle = '#2A2F3A'; ctx.lineWidth = 2; for (let k = 1; k <= 10; k++) { const yy = ty - k * MM; ctx.beginPath(); ctx.moveTo(gx - 6, yy); ctx.lineTo(gx + 6, yy); ctx.stroke(); }
  ctx.restore(); }
// sonde in de hand
function sondeHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(60, 0); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(100, -4); ctx.lineTo(112, 12); ctx.stroke(); ctx.restore(); }
// scaler/curette in de hand
function curetteHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(62, 0); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(62, 0); ctx.quadraticCurveTo(96, -4, 104, 14); ctx.quadraticCurveTo(108, 24, 100, 26); ctx.stroke(); ctx.restore(); }
// curette in de doorsnede: blad tegen de wortel op diepte yy (lokaal)
function curette(ctx, x, y, s, yy, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const gx = oppX(yy) + 8; ctx.lineCap = 'round';
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx, yy); ctx.quadraticCurveTo(gx + 4, yy - 160, gx + 40, -330); ctx.stroke(); ctx.strokeStyle = '#9AA3AE'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(gx + 40, -330); ctx.lineTo(gx + 110, -440); ctx.stroke();
  ctx.fillStyle = '#E8EAEE'; ctx.beginPath(); ctx.ellipse(gx + 3, yy + 6, 5, 12, 0.2, 0, 6.283); ctx.fill(); ctx.restore(); }
function tandenborstelHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -14, -8, 120, 16, 7); shape(ctx, '#5BA4C9', '#3E7FA0', 2); roundRect(ctx, 100, -9, 40, 18, 5); shape(ctx, '#F2F2EE', '#AEB6C0', 1.5);
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(104 + k * 5.5, -9); ctx.lineTo(104 + k * 5.5, -24); ctx.stroke(); } ctx.restore(); }
function ragerHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an + 0.3); rager(ctx, 60, 0, 0.8, 1); ctx.restore(); }
// tandenborstel los (schuin), bv. in de doorsnede
function tandenborstel(ctx, x, y, s, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); tandenborstelHold(ctx, 0, 0, an); ctx.restore(); }

// --- badkamer: wastafel met spiegel; schuim = roze schuim in de wasbak
function wastafel(ctx, x, y, a = 1, schuim = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 190, y - 640, 380, 300, 18); shape(ctx, rgba('#BFE3F5', 0.18), '#8FA0B5', 3); ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 140, y - 600); ctx.lineTo(x - 60, y - 520); ctx.moveTo(x - 110, y - 600); ctx.lineTo(x - 50, y - 540); ctx.stroke();
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(x - 12, y - 300, 24, 300); // poot
  ctx.beginPath(); ctx.moveTo(x - 230, y - 300); ctx.lineTo(x + 230, y - 300); ctx.quadraticCurveTo(x + 220, y - 200, x, y - 190); ctx.quadraticCurveTo(x - 220, y - 200, x - 230, y - 300); ctx.closePath(); shape(ctx, '#EEF1F4', '#AEB6C0', 3);
  ctx.beginPath(); ctx.ellipse(x, y - 296, 200, 26, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#AEB6C0', 2);
  if (schuim > 0.01) { ctx.save(); ctx.globalAlpha *= schuim; for (let i = 0; i < 9; i++) { const bx = x - 70 + i * 18 + Math.sin(t + i) * 3, by = y - 296 + Math.sin(i * 2) * 8; circ(ctx, bx, by, 12 + 5 * hash(i), i % 3 === 0 ? '#E8A0A8' : '#F6E2E4'); } ctx.restore(); }
  ctx.strokeStyle = '#AEB6C0'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 120, y - 300); ctx.lineTo(x + 120, y - 350); ctx.quadraticCurveTo(x + 120, y - 370, x + 90, y - 368); ctx.stroke(); ctx.restore(); }

// --- rij van drie kiezen van buiten met tandvlees (rood = ontsteking, bloed = druppels bij de rand)
function kiesRijT3(ctx, x, y, s, o = {}) { const { rood = 0, bloed = 0, t = 0, a = 1, bleek = 0, rager: rg = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const gk = tvKleur({ rood, bleek });
  [-1, 0, 1].forEach(i => { ctx.save(); ctx.translate(x + i * 330 * s, y); ctx.scale(s * 0.85, s); kiesKroon(ctx); const g = ctx.createLinearGradient(-190, -300, 190, -60); g.addColorStop(0, '#FBFDFF'); g.addColorStop(1, '#D6E0E8'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-140, -250); ctx.quadraticCurveTo(-110, -280, -60, -280); ctx.stroke(); ctx.restore(); });
  // tandvlees: golvende rand (papillen tussen de kiezen)
  ctx.beginPath(); ctx.moveTo(x - 560 * s, y + 140 * s); ctx.lineTo(x - 560 * s, y - 40 * s);
  for (let i = -1; i <= 1; i++) { const cx = x + i * 330 * s; ctx.quadraticCurveTo(cx - 150 * s, y - 40 * s - 30 * rood * s, cx - 120 * s, y - 80 * s); ctx.quadraticCurveTo(cx, y - 20 * s + 10 * rood * s, cx + 120 * s, y - 80 * s); ctx.quadraticCurveTo(cx + 150 * s, y - 50 * s, cx + 165 * s, y - 120 * s - 15 * rood * s); }
  ctx.lineTo(x + 560 * s, y - 40 * s); ctx.lineTo(x + 560 * s, y + 140 * s); ctx.closePath(); shape(ctx, gk, _mixHex(gk, '#7A2A30', 0.25), 2.5);
  if (bloed > 0.01) for (let i = 0; i < 4; i++) { const u = (t * 0.4 + i / 4) % 1; bloedDruppel(ctx, x + (-495 + i * 330) * s, y - 120 * s + u * 40 * s, 9 * s / 0.6, bloed * (1 - u * 0.5)); }
  if (rg > 0.01) { const px = x + 165 * s, sw = Math.sin(t * 6) * 14 * s; rager(ctx, px + 70 * s + sw, y - 110 * s, s * 1.2, rg); }
  ctx.restore(); }
// klein tandvlees-icoon (één kies met tandvlees), voor groepjes
function tvIcoon(ctx, x, y, s, rood = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  kiesKroon(ctx); ctx.fillStyle = '#EEF3F7'; ctx.fill(); ctx.strokeStyle = '#A9B8C6'; ctx.lineWidth = 6; ctx.stroke();
  const gk = tvKleur({ rood }); ctx.beginPath(); ctx.moveTo(-230, 80); ctx.lineTo(-230, -40); ctx.quadraticCurveTo(-180, -110 - 30 * rood, -120, -80); ctx.quadraticCurveTo(0, -30 + 20 * rood, 120, -80); ctx.quadraticCurveTo(180, -110 - 30 * rood, 230, -40); ctx.lineTo(230, 80); ctx.closePath(); shape(ctx, gk, _mixHex(gk, '#7A2A30', 0.3), 5); ctx.restore(); }

// --- röntgenfoto onderkaak met botniveau: verlies 0..1 (bot gezakt), lijn 0..1 (gezonde botrand als stippellijn + echte botrand)
function rontgenBot(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; const { verlies = 0, lijn = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - 12, w + 24, h + 24, 26); shape(ctx, '#2A2E36', '#4A505C', 2);
  ctx.save(); roundRect(ctx, x, y, w, h, 18); ctx.clip(); ctx.fillStyle = '#151618'; ctx.fillRect(x, y, w, h);
  const cw = w * 0.27, hc = h * 0.3, hr = h * 0.48, cej = y + h * 0.4, xs = [x + w * 0.18, x + w * 0.5, x + w * 0.82];
  const gezond = cej + h * 0.06, diep = cej + hr * 0.5;
  const crest = (xx) => { const u = (xx - x) / w; const b = Math.exp(-Math.pow((u - 0.4) / 0.22, 2)); return gezond + (diep - gezond) * verlies * (0.35 + 0.65 * b) + Math.sin(u * 19) * 4; };
  ctx.filter = 'blur(2px)';
  ctx.beginPath(); ctx.moveTo(x, y + h); for (let xx = x; xx <= x + w; xx += 8) ctx.lineTo(xx, crest(xx)); ctx.lineTo(x + w, y + h); ctx.closePath(); ctx.fillStyle = '#727378'; ctx.fill();
  ctx.save(); ctx.clip(); for (let i = 0; i < 160; i++) { const bx = x + hash(i * 3 + 1) * w, by = cej + hash(i * 7) * h * 0.6; circ(ctx, bx, by, 4 + hash(i * 11) * 10, rgba(hash(i) < 0.5 ? '#707175' : '#3A3B3E', 0.55)); } ctx.restore();
  xs.forEach((xx, i) => _xrKies(ctx, xx, cej, cw, hc, hr, false));
  ctx.filter = 'none';
  const v = ctx.createRadialGradient(x + w / 2, y + h / 2, h * 0.3, x + w / 2, y + h / 2, w * 0.7); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)'); ctx.fillStyle = v; ctx.fillRect(x, y, w, h); ctx.restore();
  if (lijn > 0.01) { ctx.save(); ctx.globalAlpha *= lijn; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(x + 10, gezond); ctx.lineTo(x + w - 10, gezond); ctx.stroke();
    ctx.setLineDash([]); ctx.strokeStyle = C.koraal; ctx.beginPath(); for (let xx = x + 10; xx <= x + w - 10; xx += 8) ctx.lineTo(xx, crest(xx)); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { gezond, diep, crest }; }

// --- kalender met maanden; stippen = controles; vlam = opvlammen
function kalenderJaar(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; const { controles = 0, vlam = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, 480, 330, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; roundRect(ctx, x, y, 480, 56, 18); ctx.fill(); ctx.fillRect(x, y + 30, 480, 26);
  for (const rx of [x + 120, x + 360]) { circ(ctx, rx, y, 10, '#8A939E'); }
  const M = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  M.forEach((m, i) => { const cx = x + 60 + (i % 4) * 120, cy = y + 112 + Math.floor(i / 4) * 80; text(ctx, m, cx, cy + 8, fTekst(24, 700), '#3A4458', 'center');
    if (i % 3 === 0 && controles > i / 12) { ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy, 44, 28, 0, 0, 6.283); ctx.stroke(); ctx.restore(); } });
  if (vlam > 0.01) vlammetje(ctx, x + 440, y + 300, 1, vlam, t);
  ctx.restore(); }
function vlammetje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * (1 + 0.05 * Math.sin(t * 9)), s);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-40, -10, -30, -60, 0, -90); ctx.bezierCurveTo(4, -60, 30, -50, 26, -24); ctx.bezierCurveTo(40, -30, 36, -8, 0, 0); shape(ctx, C.koraal, '#FFD0A8', 2);
  ctx.beginPath(); ctx.moveTo(0, -4); ctx.bezierCurveTo(-18, -10, -12, -36, 2, -50); ctx.bezierCurveTo(6, -30, 18, -24, 0, -4); shape(ctx, C.goud, null); ctx.restore(); }

// --- sigaret met rookpluim
function sigaret(ctx, x, y, s, a = 1, t = 0, an = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(an);
  roundRect(ctx, -110, -13, 160, 26, 6); shape(ctx, '#F4F2EC', '#B8B0A0', 2); roundRect(ctx, -150, -13, 50, 26, 6); shape(ctx, '#D99A4E', '#A87632', 2);
  ctx.fillStyle = '#6A6A6A'; ctx.fillRect(48, -13, 12, 26); circ(ctx, 62, 0, 8, rgba(C.koraal, 0.9));
  ctx.rotate(-an); for (let i = 0; i < 3; i++) { const u = (t * 0.4 + i / 3) % 1; ctx.strokeStyle = rgba('#C9CED6', 0.6 * (1 - u)); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(62, -10 - u * 120); ctx.bezierCurveTo(40, -40 - u * 120, 90, -70 - u * 120, 62, -110 - u * 120); ctx.stroke(); } ctx.restore(); }
// --- hart (orgaan, vereenvoudigd) met kransslagaders
function hartje(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const p = 1 + 0.04 * Math.max(0, Math.sin(t * 6)); ctx.scale(s * p, s * p);
  ctx.beginPath(); ctx.moveTo(0, 90); ctx.bezierCurveTo(-90, 40, -110, -40, -60, -70); ctx.bezierCurveTo(-30, -90, -5, -70, 0, -50); ctx.bezierCurveTo(10, -80, 60, -95, 85, -55); ctx.bezierCurveTo(110, -10, 70, 50, 0, 90); shape(ctx, '#C9524A', '#8E2A20', 3);
  roundRect(ctx, -30, -120, 26, 60, 10); shape(ctx, '#C9524A', '#8E2A20', 3); roundRect(ctx, 6, -126, 30, 56, 12); shape(ctx, '#5B7FB8', '#3E5C8A', 3);
  ctx.strokeStyle = '#E8B04A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, -50); ctx.bezierCurveTo(-40, -20, -50, 20, -20, 60); ctx.moveTo(20, -50); ctx.bezierCurveTo(40, -10, 50, 20, 30, 50); ctx.stroke(); ctx.restore(); }
// --- glucosemeter met strip en schermpje (trend: lijntje dat iets zakt)
function glucosemeter(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { hoog = 1, zak = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -140, 180, 280, 40); shape(ctx, '#3A4458', '#8A939E', 3); roundRect(ctx, -66, -110, 132, 110, 12); shape(ctx, '#CFE6D6', '#8A939E', 2);
  ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 10; i++) { const u = i / 10; const yy = -40 - 30 * hoog - 6 * Math.sin(i * 1.7) + (u > 0.6 ? zak * 18 * (u - 0.6) / 0.4 : 0); ctx.lineTo(-56 + u * 112, yy); } ctx.stroke();
  circ(ctx, -34, 50, 18, '#5A6478', '#8A939E', 2); circ(ctx, 34, 50, 18, '#5A6478', '#8A939E', 2); roundRect(ctx, -16, 140, 32, 70, 4); shape(ctx, '#F2F2EE', '#B8B0A0', 2); ctx.fillStyle = '#C0392B'; ctx.fillRect(-10, 190, 20, 12); ctx.restore(); }
// --- lichaamscel met insulinereceptoren; open 0..1 = receptoren reageren; glucose (zeshoekjes) gaat naar binnen als open
function insulineCel(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { open = 1, stof = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); shape(ctx, rgba('#E8C9A0', 0.28), '#C9A06A', 4); ctx.beginPath(); ctx.arc(x, y, r - 9, 0, 6.283); ctx.strokeStyle = rgba('#C9A06A', 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, x + r * 0.15, y + r * 0.1, r * 0.28, rgba(C.kern, 0.7), C.kernR, 2);
  for (let k = 0; k < 5; k++) { const an = -Math.PI * 0.95 + k * 0.42; const rx = x + Math.cos(an) * r, ry = y + Math.sin(an) * r; ctx.save(); ctx.translate(rx, ry); ctx.rotate(an + Math.PI / 2);
    ctx.strokeStyle = open > 0.5 ? C.goud : '#8A939E'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, -24); ctx.moveTo(9, 0); ctx.lineTo(9, -24); ctx.stroke();
    const dock = clamp(open * 1.2, 0, 1); circ(ctx, 0, -30 - 30 * (1 - dock), 10, C.goud, '#FFF4C8', 2); ctx.restore(); }
  // glucose
  for (let i = 0; i < 6; i++) { const binnen = open > 0.5 && i < 4; const u = (t * 0.25 + i / 6) % 1; const an = -Math.PI * 0.9 + i * 0.35; const d = binnen ? lerp(r * 1.6, r * 0.5, u) : r * 1.45 + Math.sin(t + i) * 8; zeshoek(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 12, 1); }
  if (stof > 0.01) for (let i = 0; i < 8; i++) { const an = -Math.PI + i * 0.45 + Math.sin(t * 0.6 + i) * 0.1; const d = r + 60 + 10 * Math.sin(t + i * 2); ctx.save(); ctx.globalAlpha *= stof; circ(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, 6, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  ctx.restore(); }
function zeshoek(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + Math.PI / 6; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba('#F2F2EE', 0.9), '#9AA3B2', 2); ctx.restore(); }
// --- bloedbaan (buis) met ontstekingsstoffen die meestromen
function bloedbaan(ctx, x0, x1, y, a = 1, o = {}) { if (a <= 0.01) return; const { stof = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x0, y - 40, x1 - x0, 80, 40); shape(ctx, rgba('#C0392B', 0.18), '#C0392B', 3);
  for (let i = 0; i < 10; i++) { const u = (t * 0.12 + hash(i * 3)) % 1; ctx.beginPath(); ctx.ellipse(x0 + 30 + u * (x1 - x0 - 60), y + (hash(i * 7) - 0.5) * 40, 14, 8, 0, 0, 6.283); shape(ctx, '#D2453A', '#A8322A', 1); }
  if (stof > 0.01) for (let i = 0; i < 12; i++) { const u = (t * 0.16 + hash(i * 5 + 1)) % 1; ctx.save(); ctx.globalAlpha *= stof; circ(ctx, x0 + 30 + u * (x1 - x0 - 60), y + (hash(i * 9) - 0.5) * 46, 6, '#F08A4B', '#FFD0A8', 1); ctx.restore(); }
  ctx.restore(); }
// --- vernauwd bloedvat in doorsnede (dwars), met plaque en bacteriën erin
function vatDoorsnede(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; const { plaque = 1, bact = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, '#D98A80', '#A8524A', 4); circ(ctx, x, y, r * 0.8, '#3A1E28');
  ctx.beginPath(); ctx.arc(x, y, r * 0.8, Math.PI * 0.6, Math.PI * 1.9); ctx.bezierCurveTo(x + r * 0.2, y - r * 0.1 * plaque, x - r * 0.1, y + r * 0.25 * plaque, x + Math.cos(Math.PI * 0.6) * r * 0.8, y + Math.sin(Math.PI * 0.6) * r * 0.8); ctx.closePath(); shape(ctx, '#E8D27A', '#B8A04A', 2.5);
  for (let i = 0; i < 6; i++) bacterie(ctx, x - r * 0.35 + hash(i * 3) * r * 0.4, y - r * 0.45 + hash(i * 5) * r * 0.5, 1.1, hash(i) * 6 + Math.sin(t + i) * 0.2, i % 2, bact);
  ctx.restore(); }
// Wat word jij? · Tandheelkunde 3 · Bloedend tandvlees — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Mondhygiënist Ilse; Opa Henk als patiënt; Dr. Kim als onderzoeker).
// Rode draad: het tandvlees van Opa Henk, van bloeden bij het poetsen tot de behandeling.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }
// één naam tegelijk op dezelfde plek: lijst [naam, sub, starttijd, kleur?]; de vorige gaat eerst weg
function volg(ctx, t, L, x, y, align = 'center') { L.forEach(([n, sub, s0, col], i) => { const s1 = i + 1 < L.length ? L[i + 1][2] : 1e9; const a = clamp((t - s0) / 0.3, 0, 1) * clamp((s1 - 0.05 - t) / 0.25, 0, 1); naamBij(ctx, n, sub, x, y, a, align, col || C.text); }); }
const sm = (u) => u * u * (3 - 2 * u);

Object.assign(SCENES, {
  title(ctx, t) { parodont(ctx, 1500, 560, 0.82, { t, rood: 0.55, zwel: 0.4, plak: 0.7, vaat: 0.5, links: { rood: 0, zwel: 0, plak: 0.2, vaat: 0 } }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('controle', 1, 1));
    laag(ctx, A, () => { wastafel(ctx, 1020, 880, 1, q.on('bloedt', 1, 1), t);
      const poets = t < q.at('omheen', 1) + 0.6; persoon(ctx, 'henk', 700, 880, 500, { t, kijk: 1, pose: 'vasthouden', uit: t > q.at('bloedt', 1) ? 'verbaasd' : 'neutraal', hold: (c, x, y, an) => tandenborstelHold(c, x, y, an + (poets ? 0.15 * Math.sin(t * 9) : 0)) });
      naamBij(ctx, 'Opa Henk', '', 700, 330, q.on('Henk', 1), 'center');
      const Z = q.on('tandvlees', 1); kiesRijT3(ctx, 1580, 520, 0.36, { t, rood: 0.7, bloed: Z, a: Z }); naamBij(ctx, 'roze schuim: bloed', '', 1580, 650, q.on('bloedt', 1) * Z, 'center');
      naamBij(ctx, 'er voorzichtig omheen', '', 1580, 300, q.on('voorzichtig', 1), 'center', C.goud); });
    laag(ctx, B, () => { tandStoel(ctx, 640, 880); persoon(ctx, 'henk', 920, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'denk' });
      persoon(ctx, 'ilse', 1340, 880, 500, { t, kijk: -1, uit: 'blij', pose: 'vasthouden', hold: spiegelHold }); naamBij(ctx, 'Mondhygiënist Ilse', '', 1340, 330, q.on('Ilse', 1), 'center');
      chip(ctx, 'minder poetsen?', 920, 300, C.goud, q.on('goed', 1), 30); vraagteken(ctx, 1140, 260, q.on('zegt', 1), 110); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b');
    kiesRijT3(ctx, 960, 620, 0.62, { t, rood: 0.8, bloed: q.on('bloeden', 1), a: clamp(t / 0.5, 0, 1) });
    naamBij(ctx, 'ontsteking', '', 960, 300, q.on('ontsteking', 1), 'center', C.koraal); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const P = q.on('plak', 1, 1.5), V = q.on('wijder', 1, 1.2), Wb = q.on('witte', 1), R = q.on('rood', 1, 1.2), Bl = q.on('bloeden', 1);
    const st = { t, rand: -112, diepte: 2, plak: P, rood: R * 0.9, zwel: R * 0.8, vaat: V, wbc: Wb * (1 - 0.5 * q.on('kwetsbaar', 1)), bloed: Bl, randje: q.on('randje', 1, 0.4) * (1 - q.on('plak', 1)), links: { plak: 0, rood: 0, zwel: 0, vaat: 0, wbc: 0, bloed: 0, randje: 0 } };
    const mx = 470, my = 540, ms = 0.78; parodont(ctx, mx, my, ms, st);
    naamBij(ctx, 'tand', '', mx, 270, q.on('rand', 1), 'center'); naamBij(ctx, 'tandvlees', '', mx - 290 * ms, my - 20, q.on('tandvlees', 1), 'center'); naamBij(ctx, 'kaakbot', '', mx - 240 * ms, my + 240 * ms, q.on('tandvlees', 1), 'center');
    // vergroting van de rand rechts
    const zx = 1360, zy = 470, zr = 330, zs = 2.5, src = pp(mx, my, ms, 200, -90), Za = q.on('randje', 1, 0.8);
    zoomCircle(ctx, zx, zy, zr, src.x, src.y, '', Za, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      parodont(ctx, zx - 195 * zs, zy + 70 * zs, zs, st);
      if (q.on('aanraking', 1) > 0.01) tandenborstel(ctx, zx + 90 - 30 * q.on('aanraking', 1, 0.5), zy - 300 + 40 * q.on('aanraking', 1, 0.5), 1.3, 2.2, q.on('aanraking', 1, 0.3)); });
    laag(ctx, Za, () => volg(ctx, t, [['randje', 'tussen tandvlees en tand', q.at('randje', 1)], ['plak', 'bacteriën in een slijmlaag', q.at('plak', 1)], ['bloedvaatjes wijder', '', q.at('wijder', 1)], ['witte bloedcellen', '', q.at('witte', 1)], ['rood en gezwollen', '', q.at('rood', 1), C.koraal], ['bloedt bij aanraking', '', q.at('aanraking', 1), C.koraal], ['gingivitis', 'ontsteking van het tandvlees', q.at('gingivitis', 1), C.koraal]], zx, 862));
    tag(ctx, 'film: De eerste verdediging', mx, 150, C.teal, q.on('verdediging', 1) * (1 - q.on('kwetsbaar', 1)), 'center', 28); },

  s06(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'DENEMARKEN · JAREN ZESTIG', 160, 150, q.on('Denemarken', 1), C.grain, 'left', 28);
    const t1 = q.at('poetsen', 1), t2 = q.at('tandvlees', 2), t3 = q.at('poetsen', 2), t4 = q.at('verdwenen', 1);
    const wk = t < t1 ? 0 : t < t2 ? 3 * sm(clamp((t - t1) / (t2 - t1), 0, 1)) : t < t3 ? 3 : 3 + sm(clamp((t - t3) / (t4 - t3), 0, 1));
    const rood = wk <= 3 ? clamp((wk - 0.4) / 2.4, 0, 1) : clamp(1 - (wk - 3) * 1.1, 0, 1);
    // twaalf proefpersonen = twaalf stukjes tandvlees
    for (let i = 0; i < 12; i++) { const a = clamp((t - q.at('Twaalf', 1) - i * 0.08) / 0.3, 0, 1); const r = rood * (0.75 + 0.25 * hash(i * 5)); tvIcoon(ctx, 410 + (i % 6) * 220, 330 + Math.floor(i / 6) * 210, 0.3, r, a); }
    chip(ctx, '12 mensen met gezond tandvlees', 960, 150, C.groen, q.on('gezond', 1) * (1 - q.on('stopten', 1)), 28);
    // tijdlijn: 3 weken niet poetsen, dan 1 week wel
    const TA = q.on('stopten', 1); laag(ctx, TA, () => { const x0 = 420, x1 = 1500, Y = 760, wx = (w) => x0 + (x1 - x0) * w / 4;
      roundRect(ctx, x0, Y - 14, wx(3) - x0, 28, 10); shape(ctx, rgba(C.koraal, 0.3), C.koraal, 2); roundRect(ctx, wx(3), Y - 14, x1 - wx(3), 28, 10); shape(ctx, rgba(C.groen, 0.3), C.groen, 2);
      for (let w = 0; w <= 4; w++) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(wx(w), Y - 24); ctx.lineTo(wx(w), Y + 24); ctx.stroke(); metaText(ctx, 'week ' + w, wx(w), Y + 60, C.text2, 'center', 22); }
      regel(ctx, 'niet poetsen', (x0 + wx(3)) / 2, Y - 34, 1, C.koraal, 30, 'center', 700); regel(ctx, 'poetsen', (wx(3) + x1) / 2, Y - 34, q.on('poetsen', 2), C.groen, 30, 'center', 700);
      circ(ctx, wx(wk), Y, 18, C.goud, '#121A26', 3); });
    tag(ctx, 'omkeerbaar', 960, 150, C.groen, q.on('omkeerbaar', 1), 'center', 36); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema');
    const kr = q.on('kruipt', 1, 2), sten = q.on('verhardt', 1, 1.5), pk = q.on('randje', 1, 2.5), af = q.on('afbreken', 1, 3) * 0.5 + q.on('zakt', 1, 1.6) * 0.5;
    const diepte = 2 + 2.6 * pk + 1.4 * af, rand = -112 + 10 * pk;
    const bot = Math.max(22 + 150 * af, rand + diepte * MM + 34);
    const st = { t, rand, diepte, bot, plak: 0.9, plakOnder: 0.35 * kr + 0.55 * pk, steen: sten, rood: 0.75, zwel: 0.5, vaat: 0.7, wbc: q.on('ontsteking', 1) * (1 - q.on('afbreken', 1)), stof: q.on('ontstekingsstoffen', 1) * (1 - q.on('parodontitis', 1) * 0.6), oc: q.on('cellen', 1) * (1 - q.on('parodontitis', 1) * 0.5), spook: q.on('zakt', 1), spookBot: 22, los: q.on('los', 1), bact: 1 - 0.55 * q.on('bacterie', 1) * (1 - q.on('ontstekingsstoffen', 1)),
      links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0, zwel: 0, vaat: 0, wbc: 0, stof: 0, oc: 0, spook: 0 } };
    const mx = 700, my = 470, ms = 0.95; const S = parodont(ctx, mx, my, ms, st);
    naamBij(ctx, 'gezond', '', mx - 330 * ms, my - 200 * ms, q.on('verder', 1), 'center', C.groen);
    tandenborstel(ctx, mx + 250 * ms, my - 330 * ms, 1, 2.0, q.on('tandenborstel', 1) * (1 - q.on('verhardt', 1)));
    const lx = mx + 450 * ms + 20, yRand = my + rand * ms, yPocket = my + (rand + diepte * MM * 0.55) * ms, yBot = my + (bot + 40) * ms;
    volg(ctx, t, [['plak onder het tandvlees', '', q.at('kruipt', 1)], ['tandsteen', 'verharde plak', q.at('verhardt', 1)]], lx, yRand - 20, 'left');
    naamBij(ctx, 'pocket', 'diepe ruimte langs de wortel', lx, yPocket + 10, q.on('pocket', 1), 'left');
    volg(ctx, t, [['ontstekingsstoffen', 'van je eigen afweer', q.at('ontstekingsstoffen', 1), '#F08A4B'], ['botafbrekende cellen', '', q.at('cellen', 1), C.paars], ['bot zakt weg', '', q.at('zakt', 1), C.goud]], lx, Math.min(yBot + 40, 830), 'left');
    kruis(ctx, mx + 210 * ms, my - 180 * ms, 18, q.on('bacterie', 1) * (1 - q.on('ontstekingsstoffen', 1)));
    naamBij(ctx, 'parodontitis', '', mx, 150, q.on('parodontitis', 1), 'center', C.koraal); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('röntgenfoto', 1, 1));
    persoon(ctx, 'ilse', 240, 880, 500, { t, kijk: 1, uit: 'neutraal', pose: B > 0.5 ? 'wijs' : 'vasthouden', hold: B > 0.5 ? null : sondeHold }); naamBij(ctx, 'Mondhygiënist Ilse', '', 240, 330, clamp(t / 0.5, 0, 1) * (1 - q.on('schuift', 1)), 'center');
    laag(ctx, A, () => { const px = 1150, py = 560, ps = 1.45; ctx.save(); roundRect(ctx, 470, 90, 1420, 770, 24); ctx.clip();
      const st = { t, rand: -100, diepte: 6, bot: 150, plak: 0.4, plakOnder: 0.3, steen: 0.5, rood: 0.7, zwel: 0.4, vaat: 0.6, links: { rand: -112, diepte: 2, bot: null, plak: 0.1, plakOnder: 0, steen: 0, rood: 0.1, zwel: 0, vaat: 0.1 } };
      const S = parodont(ctx, px, py, ps, st);
      const inL = 2 * sm(clamp((t - q.at('schuift', 1)) / 1.6, 0, 1)) * (1 - q.on('Henk', 1, 0.6)), inR = 6 * sm(clamp((t - q.at('Henk', 1)) / 1.6, 0, 1));
      const LS = tvState(Object.assign({}, st, st.links));
      sonde(ctx, px, py, ps, LS, inL, q.on('schuift', 1) * (1 - q.on('Henk', 1, 0.6)), -1); sonde(ctx, px, py, ps, tvState(st), inR, q.on('Henk', 1, 0.5), 1);
      ctx.restore(); roundRect(ctx, 470, 90, 1420, 770, 24); ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.stroke();
      naamBij(ctx, 'sonde met streepjes', '1 streepje = 1 mm', 680, 160, q.on('streepjes', 1) * (1 - q.on('gezond', 1)), 'center');
      naamBij(ctx, 'gezond: 1 tot 3 mm', '', 680, 160, q.on('gezond', 1), 'center', C.groen);
      naamBij(ctx, 'Opa Henk: 6 mm', 'pocket', 1680, 160, q.on('zes', 1), 'center', C.koraal); });
    laag(ctx, B, () => { const R = rontgenBot(ctx, 560, 170, 1200, 600, 1, { verlies: 0.85, lijn: q.on('bot', 1), t });
      naamBij(ctx, 'hier hoort het bot', '', 1740, R.gezond - 14, q.on('bot', 1), 'right', C.goud); naamBij(ctx, 'bot verdwenen', '', 1060, R.crest(1060) + 60, q.on('verdwenen', 1), 'center', C.koraal); }); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const C1 = q.on('schoonmaakt', 1, 1.2);
    parodont(ctx, 820, 470, 0.95, { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.8 * (1 - C1), plakOnder: 0.6 * (1 - C1), steen: 0.8 * (1 - C1), rood: 0.7 - 0.4 * C1, zwel: 0.4 * (1 - C1), vaat: 0.5, spook: q.on('kaakbot', 1), spookBot: 22, links: { rand: -112, diepte: 2, bot: null, plak: 0, plakOnder: 0, steen: 0, rood: 0, zwel: 0, spook: 0 } });
    persoon(ctx, 'ilse', 260, 880, 480, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: curetteHold });
    naamBij(ctx, 'schoon', '', 1300, 360, C1, 'left', C.groen); vraagteken(ctx, 1400, 560, q.on('terug', 1), 110); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const St = q.on('stopt', 1, 1.5);
    parodont(ctx, 720, 490, 0.92, { t, rand: -100 - 6 * St, diepte: 5.5 - 1.5 * St, bot: 150, plak: 0, steen: 0, rood: 0.35 * (1 - St), zwel: 0.2 * (1 - St), vaat: 0.4 * (1 - St), oc: 0.8 * (1 - St), stof: 0.6 * (1 - St), spook: q.on('weg', 1), spookBot: 22, links: { rand: -112, diepte: 2, bot: null, rood: 0, zwel: 0, oc: 0, stof: 0, spook: 0 } });
    naamBij(ctx, 'komt meestal niet terug', '', 1150, 470, q.on('groeit', 1), 'left', C.goud);
    naamBij(ctx, 'afbraak stopt', '', 1150, 600, St, 'left', C.groen);
    persoon(ctx, 'henk', 1620, 880, 470, { t, kijk: -1, uit: 'lacht', a: q.on('Henk', 1, 0.3) }); vink_(ctx, 1620, 300, 30, q.on('houden', 1)); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const [A, B0] = wisselA(q.on('Daarna', 1, 1)); const [B1, Cc] = wisselA(q.on('voortaan', 1, 1)); const B = Math.min(B0, B1);
    laag(ctx, A, () => { const kx = 1180, ky = 480, ks = 0.95; const cl = sm(clamp((t - q.at('haalt', 1)) / 3.6, 0, 1));
      const ph = t < q.at('haalt', 1) ? 0 : 1; persoon(ctx, 'ilse', 330, 880, 520, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: ph ? curetteHold : spuitHold });
      const st = { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.8 * (1 - cl), plakOnder: 0.85 * (1 - cl), steen: 1 - cl, rood: 0.7 - 0.3 * cl, zwel: 0.4, vaat: 0.5, links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.1, zwel: 0 } };
      const S = parodont(ctx, kx, ky, ks, st);
      const V = q.on('verdooft', 1); if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V * (1 - 0.6 * ph); const c = pp(kx, ky, ks, 300, 0); const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 160); g.addColorStop(0, rgba(C.teal, 0.5)); g.addColorStop(1, rgba(C.teal, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.x, c.y, 160, 0, 6.283); ctx.fill(); ctx.restore(); }
      if (ph) curette(ctx, kx, ky, ks, lerp(S.rand + 30, S.bodem - 12, 0.5 + 0.5 * Math.sin(t * 3.5)), q.on('haalt', 1, 0.4) * (1 - cl * 0.8), t);
      volg(ctx, t, [['verdoving', '', q.at('verdooft', 1), C.teal], ['plak en tandsteen eruit', 'ook diep onder het tandvlees', q.at('haalt', 1)]], 760, 200, 'center'); });
    laag(ctx, B, () => { persoon(ctx, 'henk', 420, 880, 500, { t, kijk: 1, uit: 'neutraal', pose: 'vasthouden', hold: ragerHold });
      kiesRijT3(ctx, 1220, 640, 0.66, { t, rood: 0.3, rager: 1 }); naamBij(ctx, 'ragertjes', 'elke dag, tussen de tanden', 1220, 260, q.on('ragertjes', 1), 'center'); });
    laag(ctx, Cc, () => { persoon(ctx, 'henk', 330, 880, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'ilse', 590, 880, 500, { t, kijk: -1, uit: 'blij' });
      kalenderJaar(ctx, 1000, 300, 1, { controles: q.on('drie', 1, 2.2) * 1.0, vlam: q.on('opvlammen', 1), t });
      naamBij(ctx, 'elke drie maanden', '', 1240, 240, q.on('drie', 1), 'center'); naamBij(ctx, 'kan opvlammen', '', 1560, 720, q.on('opvlammen', 1), 'center', C.koraal); }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const R2 = q.on('erger', 1), Bl = q.on('bloedt', 1, 1.2), Gz = q.on('gezond', 1);
    const base = { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.6, plakOnder: 0.5, steen: 0.5, rood: 0.8, zwel: 0.5, vaat: 0.7, links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.2, zwel: 0, vaat: 0.2, bloed: 0, oc: 0, stof: 0 } };
    parodont(ctx, 520, 520, 0.6, Object.assign({}, base, { bloed: Bl, a: R2 }));
    parodont(ctx, 1400, 520, 0.6, Object.assign({}, base, { bleek: Bl, rood: 0.8, vaat: 0.7 * (1 - q.on('doorbloed', 1)), oc: q.on('doorgaat', 1), stof: q.on('doorgaat', 1), a: R2 }));
    persoon(ctx, 'ilse', 960, 880, 420, { t, kijk: 1, uit: 'neutraal', pose: 'wijs', a: 1 - R2 * 0.0 }); naamBij(ctx, 'Mondhygiënist Ilse', '', 960, 420, clamp(t / 0.5, 0, 1) * (1 - q.on('roken', 2)), 'center');
    sigaret(ctx, 1640, 240, 0.9, q.on('roken', 1), t); regel(ctx, 'niet-roker', 520, 250, R2, C.text, 36, 'center', 700); regel(ctx, 'roker', 1400, 250, R2, C.text, 36, 'center', 700);
    naamBij(ctx, 'bloedt', '', 520, 830, Bl * (1 - q.on('waarschuwing', 1)), 'center', C.koraal); naamBij(ctx, 'bloedt minder', 'minder doorbloed', 1400, 830, Bl * (1 - Gz), 'center');
    naamBij(ctx, 'lijkt gezond', 'ontsteking gaat door', 1400, 830, Gz, 'center', C.goud); tag(ctx, 'bloeden = waarschuwing', 520, 830, C.koraal, q.on('waarschuwing', 1), 'center', 28); },

  // ---------- H4 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Bij', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'henk', 760, 880, 500, { t, kijk: 1, uit: 'neutraal' }); glucosemeter(ctx, 1180, 520, 0.9, 1, { hoog: 1 }); chip(ctx, 'diabetes type 2', 1180, 280, C.goud, q.on('diabetes', 1), 32);
      naamBij(ctx, 'tandvlees', '', 760, 330, q.on('tandvlees', 1), 'center'); });
    laag(ctx, B, () => { const And = q.on('andersom', 1), Beh = q.on('Behandel', 1, 1.5);
      parodont(ctx, 470, 470, 0.48, { t, rand: -100, diepte: 5.5, bot: 150, plak: 0.6, plakOnder: 0.6, steen: 0.5, rood: 0.6 + 0.35 * q.on('heftiger', 1) - 0.6 * Beh, zwel: 0.3 + 0.5 * q.on('heftiger', 1) - 0.6 * Beh, vaat: 0.6, wbc: 0.6 * (1 - Beh), stof: 0.8 * And * (1 - Beh * 0.7), links: { rand: -112, diepte: 2, bot: null, plak: 0.2, plakOnder: 0, steen: 0, rood: 0.2, zwel: 0, wbc: 0, stof: 0 } });
      naamBij(ctx, 'ontstoken pocket', '', 470, 760, 1, 'center');
      glucosemeter(ctx, 1460, 470, 0.85, 1, { hoog: 1, zak: Beh }); naamBij(ctx, 'hoge bloedsuiker', '', 1460, 760, 1 - Beh, 'center'); naamBij(ctx, 'iets lager', '', 1460, 760, Beh, 'center', C.groen);
      // heen: bloedsuiker → tandvlees
      const P1 = q.on('afweer', 1) * (1 - q.on('Daarom', 1)); pijl(ctx, 1290, 230, 650, 230, C.goud, P1, 6, 22); laag(ctx, 1 - q.on('Daarom', 1), () => volg(ctx, t, [['afweer werkt minder goed', '', q.at('afweer', 1)], ['vaker en ernstiger parodontitis', '', q.at('ernstiger', 1), C.koraal]], 970, 200));
      // terug: tandvlees → bloed → cellen
      laag(ctx, And * (1 - q.on('Daarom', 1)), () => { bloedbaan(ctx, 660, 1280, 790, 1, { stof: q.on('ontstekingsstoffen', 1), t }); pijl(ctx, 1290, 790, 1340, 700, C.goud, 1, 6, 20);
        naamBij(ctx, 'ontstekingsstoffen in het bloed', '', 970, 870 - 100, q.on('ontstekingsstoffen', 1) * (1 - q.on('cellen', 1)), 'center', '#F08A4B');
        insulineCel(ctx, 970, 470, 120, q.on('cellen', 1), { open: 1 - q.on('gevoelig', 1), stof: q.on('ontstekingsstoffen', 1), t }); naamBij(ctx, 'minder gevoelig voor insuline', '', 970, 640, q.on('gevoelig', 1), 'center'); });
      tag(ctx, 'film: Suiker in balans', 970, 160, C.teal, q.on('Suiker', 2) * (1 - q.on('Behandel', 1)), 'center', 28);
      laag(ctx, q.on('Daarom', 1), () => { tag(ctx, 'tandarts', 760, 230, C.teal, 1, 'center', 32); tag(ctx, 'huisarts', 1180, 230, C.groen, 1, 'center', 32); pijl(ctx, 860, 220, 1080, 220, C.line, 1, 4, 14); pijl(ctx, 1080, 220, 860, 220, C.line, 1, 4, 14); regel(ctx, 'samenwerken', 970, 300, q.on('samen', 1), C.text, 34, 'center', 700); }); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('Onderzoekers', 1, 0.6);
    laag(ctx, G, () => { tvIcoon(ctx, 470, 290, 0.32, 0, 1); regel(ctx, 'zonder parodontitis', 470, 380, 1, C.text, 30, 'center', 700); stippen(ctx, 360, 450, 20, 0, C.koraal, 1, 5, 18, 56);
      tvIcoon(ctx, 1450, 290, 0.32, 0.9, q.on('parodontitis', 1)); regel(ctx, 'met parodontitis', 1450, 380, q.on('parodontitis', 1), C.text, 30, 'center', 700); stippen(ctx, 1340, 450, 20, 0, C.koraal, q.on('parodontitis', 1), 5, 18, 56);
      const H = q.on('hartinfarct', 1); laag(ctx, H, () => { [0, 7].forEach(i => circ(ctx, 360 + (i % 5) * 56, 450 + Math.floor(i / 5) * 56, 18, C.koraal)); [0, 3, 7, 11].forEach(i => circ(ctx, 1340 + (i % 5) * 56, 450 + Math.floor(i / 5) * 56, 18, C.koraal)); });
      naamBij(ctx, 'hartinfarct', 'voorbeeld', 960, 520, H * (1 - q.on('Betekent', 1)), 'center', C.koraal); });
    laag(ctx, q.on('Betekent', 1), () => { hartje(ctx, 960, 500, 0.9, 1, t); pijl(ctx, 1290, 300, 1060, 430, C.line, q.on('veroorzaakt', 1), 5, 18); vraagteken(ctx, 1180, 320, q.on('veroorzaakt', 1), 90); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const [A, B] = wisselA(q.on('echte', 1, 1));
    laag(ctx, A, () => { tvIcoon(ctx, 560, 470, 0.36, 0.9, 1); hartje(ctx, 1360, 460, 0.8, 1, t);
      regel(ctx, 'parodontitis', 560, 580, 1, C.text, 30, 'center', 700); regel(ctx, 'hartinfarct', 1360, 590, 1, C.text, 30, 'center', 700);
      // samen voorkomen: stippellijn ertussen
      ctx.save(); ctx.globalAlpha *= q.on('samen', 1); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(700, 450); ctx.lineTo(1240, 450); ctx.stroke(); ctx.restore();
      naamBij(ctx, 'verband blijft', '', 970, 425, q.on('verband', 1), 'center', C.goud);
      // roken (en meer) voedt allebei
      const Rk = q.on('rookt', 1); sigaret(ctx, 930, 240, 0.85, Rk, t); pijl(ctx, 850, 280, 640, 380, C.koraal, q.on('parodontitis', 1), 5, 18); pijl(ctx, 1060, 280, 1290, 380, C.koraal, q.on('hartinfarct', 1), 5, 18);
      chip(ctx, 'leeftijd', 1270, 190, C.oker, q.on('rekening', 1), 26); chip(ctx, 'diabetes', 620, 190, C.oker, q.on('rekening', 1), 26);
      persoon(ctx, 'kim', 970, 880, 330, { t, kijk: 1, uit: 'neutraal', pose: 'denk', outfit: 'lab', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1120, 700, q.on('Kim', 1) * (1 - q.on('bacteriën', 1)), 'left');
      vatDoorsnede(ctx, 1660, 680, 100, q.on('bacteriën', 1), { t, bact: q.on('mond', 1) }); naamBij(ctx, 'mondbacteriën in een vernauwd bloedvat', '', 1660, 830, q.on('vernauwde', 1), 'center'); });
    laag(ctx, B, () => { persoon(ctx, 'kim', 250, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'wijs', outfit: 'lab' }); metaA(ctx, 'DE PROEF DIE NOG NODIG IS', 600, 230, 1, C.grain, 'left', 28);
      tvIcoon(ctx, 720, 400, 0.3, lerp(0.9, 0, q.on('behandeld', 1, 1.5)), 1); regel(ctx, 'behandeld', 720, 490, 1, C.text, 30, 'center', 700); stippen(ctx, 610, 540, 20, 0, C.koraal, 1, 5, 16, 50);
      tvIcoon(ctx, 1320, 400, 0.3, 0.9, 1); regel(ctx, 'niet behandeld', 1320, 490, 1, C.text, 30, 'center', 700); stippen(ctx, 1210, 540, 20, 0, C.koraal, 1, 5, 16, 50);
      hartje(ctx, 1020, 610, 0.45, q.on('hartinfarcten', 1), t); text(ctx, '?', 1020, 790, fTitel(64), C.goud, 'center');
      stempel(ctx, 1500, 260, 'nog niet bewezen', C.koraal, q.on('niet', 2), -0.12); }); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'henk', 300, 880, 480, { t, kijk: 1, pose: 'vasthouden', uit: 'lacht', hold: ragerHold }); persoon(ctx, 'ilse', 560, 880, 500, { t, kijk: -1, uit: 'blij' });
    kiesRijT3(ctx, 960, 560, 0.3, { t, rood: lerp(0.8, 0, q.on('beter', 1, 1.5)), bloed: 1 - q.on('beter', 1) });
    recapKaart(ctx, 1280, 220, 560, 'bloeden = ontsteking', C.koraal, q.on('ontsteking', 1)); recapKaart(ctx, 1280, 360, 560, 'gingivitis is omkeerbaar', C.groen, q.on('ontsteking', 2));
    recapKaart(ctx, 1280, 500, 560, 'parodontitis: bot komt niet terug', C.goud, q.on('kaakbot', 1)); recapKaart(ctx, 1280, 640, 560, 'samenhang is geen oorzaak', C.teal, q.on('bloedsuiker', 1)); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'ilse', 230, 880, 480, { t, kijk: 1, uit: 'blij' });
    tag(ctx, 'Mondzorgkunde · hbo', 620, 260, C.teal, q.on('Mondzorgkunde', 1), 'center', 34);
    regel(ctx, 'meten · behandelen · voorlichting', 620, 350, q.on('meet', 1), C.text, 30, 'center', 700); regel(ctx, 'patiënten jarenlang terugzien', 620, 420, q.on('jarenlang', 1), C.text2, 30, 'center', 600);
    persoon(ctx, 'wouter', 1100, 880, 480, { t, kijk: 1, uit: 'blij', a: q.on('Tandarts', 1, 0.3) });
    tag(ctx, 'Tandheelkunde · universiteit', 1510, 260, C.goud, q.on('tandheelkunde', 1), 'center', 34);
    regel(ctx, 'daarna eventueel:', 1510, 350, q.on('verdiepen', 1), C.text2, 28, 'center', 600); regel(ctx, 'parodontoloog', 1510, 410, q.on('parodontoloog', 1), C.text, 36, 'center', 700);
    regel(ctx, 'specialist in het tandvlees', 1510, 470, q.on('parodontoloog', 1), C.text2, 28, 'center', 600); }
});
