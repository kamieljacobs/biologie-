
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
// Wat word jij? · Tandheelkunde 4 · Een tand door bot — eigen tekeningen (v1.0, 21 okt 2026).
// Zelfde look en kleuren als de kies-doorsnede van t2 (Van glazuur tot zenuw): glazuur licht en glanzend, tandbeen geel met kanaaltjes,
// pulpa roze met bloedvaatje en zenuw, sponsachtig kaakbot, roze tandvlees. Hier: een hoektand met één wortel, wortelvlies als veren,
// botafbrekers en botopbouwers, beugel, retentiedraad, schedels.

const TK = { tb: '#EBDCA6', tbR: '#B9A56E', buis: '#B9A06A', pul: '#E89AA8', pulR: '#C77A88', vat: '#C0392B', zenuw: '#F2D06A', vlies: '#F0C4BE', vez: '#B86A72',
  bot: '#D9C9B4', botR: '#B8A68E', botV: '#BFAC92', nieuw: '#F1E8D4', osteoid: '#F7F0DF', tv: '#E58C96', tvR: '#C96A76', clast: '#A88BD0', clastR: '#7D62A8',
  blast: '#6FB8A8', blastR: '#4E9484', cyt: '#8A7458', glz1: '#FBFDFF', glz2: '#DCE6EE', glzR: '#A9B8C6', staal: '#D5DAE0', staalR: '#8A939E' };

function _poly(ctx, P) { ctx.beginPath(); P.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); }
// veer (zigzag) van punt 1 naar punt 2: n windingen; kort = dicht op elkaar, lang = uitgerekt
function veer(ctx, x1, y1, x2, y2, n = 5, amp = 7) { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; ctx.beginPath(); ctx.moveTo(x1, y1);
  for (let i = 1; i < 2 * n; i++) { const u = i / (2 * n), sg = i % 2 ? 1 : -1; ctx.lineTo(x1 + dx * u + nx * amp * sg, y1 + dy * u + ny * amp * sg); } ctx.lineTo(x2, y2); ctx.stroke(); }

// ================= hoektand in kaakbot (doorsnede) =================
// Lokale maat (s = 1): kroonpunt y = -345, hals y = -60, botkam y = -20, wortelpunt y = +380; (0,0) = midden van de tand bij de hals.
const TB = { hals: -60, kam: -20, punt: 380, top: -345, rw: 95, w0: 24, L: -430, R: 430, B: 480 };
function _hw(y) { const u = clamp((y - TB.hals) / (TB.punt - TB.hals), 0, 1); return TB.rw * (1 - 0.7 * u) * Math.sqrt(Math.max(0, 1 - Math.pow(u, 6))); }
function _cw(y) { const v = clamp((TB.hals - y) / (TB.hals - TB.top), 0, 1); const b = TB.rw + 26 * Math.sin(Math.min(v / 0.4, 1) * Math.PI / 2); return v < 0.4 ? b : b * Math.pow(Math.max(0, 1 - (v - 0.4) / 0.6), 0.72); }
function _tw(y) { return y >= TB.hals ? _hw(y) : _cw(y); }
function _pw(y) { if (y < -238) return 0; if (y < TB.hals) return 30 * Math.sqrt(clamp((y + 238) / 140, 0, 1)); const u = clamp((y - TB.hals) / (TB.punt - 16 - TB.hals), 0, 1); return Math.max(3, 30 * (1 - 0.84 * u)); }
function _tandPunten(k = 0, alleenKroon = false) { const L = [], R = []; const y0 = alleenKroon ? TB.hals : TB.punt;
  for (let yy = y0; yy >= TB.top - 1; yy -= 5) { const w = Math.max(0, _tw(yy) - (typeof k === 'function' ? k(yy) : k)); L.push([-w, yy]); R.push([w, yy]); }
  return L.concat(R.reverse()); }
function _pulpaPunten() { const L = [], R = []; for (let yy = TB.punt - 16; yy >= -240; yy -= 5) { const w = _pw(yy); L.push([-w, yy]); R.push([w, yy]); } return L.concat(R.reverse()); }

// de tand zelf (glazuur, tandbeen met kanaaltjes, pulpa met bloedvaatje en zenuw), in lokale maat rond (0,0)
function _hoektand(ctx, o = {}) { const { pulpa = TK.pul, zenuw = TK.zenuw } = o; const P = _tandPunten(0);
  _poly(ctx, P); shape(ctx, TK.tb, TK.tbR, 2.5);
  ctx.save(); _poly(ctx, P); ctx.clip(); ctx.strokeStyle = rgba(TK.buis, 0.55); ctx.lineWidth = 1.3;
  for (let yy = -220; yy < TB.punt - 40; yy += 14) { const p = _pw(yy) + 3, w = _tw(yy) - 3; if (w - p < 14) continue; const kr = yy < TB.hals;
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * p, yy); ctx.quadraticCurveTo(sd * (p + w) / 2, yy - (kr ? 18 : 8), sd * w, yy - (kr ? 34 : 14)); ctx.stroke(); } }
  ctx.restore();
  // glazuur: ring tussen buitenkant en grens met tandbeen, dun bij de hals
  const kE = (yy) => 3 + 30 * clamp((TB.hals - yy) / (TB.hals - TB.top), 0, 1); const Ko = _tandPunten(0, true), Ki = _tandPunten(kE, true);
  ctx.beginPath(); Ko.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); Ki.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath();
  const g = ctx.createLinearGradient(-150, TB.top, 150, TB.hals); g.addColorStop(0, TK.glz1); g.addColorStop(1, TK.glz2); ctx.fillStyle = g; ctx.fill('evenodd');
  ctx.beginPath(); Ki.forEach(([px, py], i) => { if (py >= TB.hals - 1) return; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.strokeStyle = rgba(TK.tbR, 0.8); ctx.lineWidth = 2; ctx.stroke();
  _poly(ctx, Ko); ctx.strokeStyle = TK.glzR; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.85); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-88, -150); ctx.quadraticCurveTo(-82, -230, -40, -282); ctx.stroke();
  // pulpa met bloedvat (rood) en zenuw (geel), tot in de wortelpunt en erdoor naar buiten
  const Pp = _pulpaPunten(); _poly(ctx, Pp); shape(ctx, pulpa, TK.pulR, 2);
  ctx.save(); _poly(ctx, Pp); ctx.clip(); ctx.lineCap = 'round';
  for (const [dx, col, lw] of [[-7, TK.vat, 6], [7, zenuw, 5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(dx * 0.6, -215); ctx.bezierCurveTo(dx, -120, dx * 0.9, 150, dx * 0.3, TB.punt); ctx.stroke(); }
  ctx.restore();
  ctx.lineCap = 'round'; for (const [dx, col, lw] of [[-5, TK.vat, 6], [5, zenuw, 5]]) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(dx * 0.4, TB.punt - 14); ctx.quadraticCurveTo(dx * 1.5, TB.punt + 30, dx * 4, TB.punt + 70); ctx.stroke(); } }

function _botcel(ctx, bx, by, r, t, i) { ctx.save(); ctx.translate(bx, by); ctx.rotate(hash(i * 13) * 3); ctx.strokeStyle = rgba(TK.cyt, 0.7); ctx.lineWidth = 1.4;
  for (let k = 0; k < 5; k++) { const an = k * 1.26 + hash(i + k); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * r * 2.4, Math.sin(an) * r * 2.4); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.3, r * 0.75, 0, 0, 6.283); shape(ctx, TK.cyt, null); ctx.restore(); }
// botafbreker: grote cel met meerdere kernen en een rafelige rand aan de botkant (kant = +1: bot rechts)
function botafbreker(ctx, bx, by, s, t = 0, kant = 1, i = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(bx, by); ctx.scale(s, s); const w = 1 + 0.05 * Math.sin(t * 3 + i);
  ctx.beginPath(); ctx.ellipse(0, 0, 17 * w, 33 / w, 0, 0, 6.283); shape(ctx, TK.clast, TK.clastR, 2);
  ctx.strokeStyle = TK.clastR; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = -26 + k * 6.5; ctx.lineTo(kant * (15 + (k % 2 ? 6 : 0)), yy); } ctx.stroke();
  for (const [nx, ny] of [[-4, -16], [2, 0], [-3, 15]]) circ(ctx, nx, ny, 5, '#4E3A72'); ctx.restore(); }
// botopbouwer: klein blokvormig celletje met een kern
function botopbouwer(ctx, bx, by, s, t = 0, i = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(bx, by); ctx.scale(s, s); const p = 1 + 0.04 * Math.sin(t * 4 + i * 1.7);
  roundRect(ctx, -8 * p, -12 * p, 16 * p, 24 * p, 5); shape(ctx, TK.blast, TK.blastR, 1.8); circ(ctx, 0, 1, 4, '#2E6A5E'); ctx.restore(); }

// o: sh = plek van het tandbed (bot verbouwd), p = 0..1 tand in het bed naar rechts geduwd, dy = tand veert in,
//    eat = putjes aan de drukkant, clast/blast = cellen, dep = nieuw laagje aan de trekkant, dicht = vaatjes dicht, grijs = afgestorven stukje,
//    achter = botafbrekers van achteren, cellen = botcellen in het bot, beugel/kracht/hard = blokje, draad en duw, oud = sh van de oude plek (spookomtrek),
//    elast = vezels in het tandvlees als elastiekjes, trekGloed = vezels aan de trekkant oplichten, drukGloed = idem drukkant
function tandBot(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return;
  const { t = 0, sh = 0, p = 0, dy = 0, eat = 0, dep = 0, clast = 0, blast = 0, dicht = 0, grijs = 0, achter = 0, cellen = 0, beugel = 0, kracht = 0, hard = 0, oud = null, oudA = 0, elast = 0, trekGloed = 0, drukGloed = 0, vaat = 1, kruimels = 0, veren = 1 } = o;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const w0 = TB.w0, PITS = [95, 195, 295], tx = sh + p * w0 * 0.82;
  const pit = (yy) => { let m = 0; for (const c of PITS) m = Math.max(m, 1 - Math.pow((yy - c) / 44, 2)); return eat * 26 * m; };
  const xr = (yy) => sh + _hw(yy) + w0 + pit(yy), xl = (yy) => sh - _hw(yy) - w0, xl0 = (yy) => -_hw(yy) - w0;
  const ys = []; for (let yy = TB.kam; yy <= TB.punt; yy += 6) ys.push(yy);
  const kom = []; ys.forEach(yy => kom.push([xl(yy), yy])); const xa = xl(TB.punt), xb = xr(TB.punt), cx0 = (xa + xb) / 2, rx = (xb - xa) / 2, ry = w0 + 8;
  for (let k = 1; k < 12; k++) { const an = Math.PI - k * Math.PI / 12; kom.push([cx0 + Math.cos(an) * rx, TB.punt + Math.sin(an) * ry]); }
  for (let i = ys.length - 1; i >= 0; i--) kom.push([xr(ys[i]), ys[i]]);
  // wortelvlies (spleet)
  _poly(ctx, kom); shape(ctx, TK.vlies, null);
  // kaakbot, sponsachtig
  const bot = [[TB.L, TB.kam + 36]].concat(kom, [[TB.R, TB.kam + 36], [TB.R, TB.B], [TB.L, TB.B]]);
  _poly(ctx, bot); shape(ctx, TK.bot, TK.botR, 2);
  ctx.save(); _poly(ctx, bot); ctx.clip();
  for (let i = 0; i < 95; i++) { const bx = TB.L + 10 + hash(i * 3 + 7) * (TB.R - TB.L - 20), by = TB.kam + 50 + hash(i * 5 + 3) * (TB.B - TB.kam - 50); ctx.beginPath(); ctx.ellipse(bx, by, 7 + hash(i) * 15, 5 + hash(i * 2) * 9, hash(i * 4) * 3, 0, 6.283); shape(ctx, TK.botV, rgba('#A8957C', 0.6), 1); }
  // nieuw bot aan de trekkant (waar het tandbed vandaan is geschoven): lichter, in laagjes
  if (sh > 1) { const N = ys.map(yy => [Math.min(xl0(yy), xl(yy)), yy]), M = ys.map(yy => [xl(yy), yy]).reverse(); _poly(ctx, N.concat(M)); ctx.fillStyle = TK.nieuw; ctx.fill();
    ctx.save(); _poly(ctx, N.concat(M)); ctx.clip(); ctx.strokeStyle = rgba(TK.botR, 0.75); ctx.lineWidth = 1.6; for (let d = 12; d < sh + 6; d += 12) { ctx.beginPath(); ys.forEach((yy, i) => { const px = xl(yy) - d; i ? ctx.lineTo(px, yy) : ctx.moveTo(px, yy); }); ctx.stroke(); } ctx.restore(); }
  // botcellen in het bot
  if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; for (let i = 0; i < 16; i++) { const bx = TB.L + 30 + hash(i * 17 + 5) * (TB.R - TB.L - 60), by = TB.kam + 80 + hash(i * 23 + 1) * (TB.B - TB.kam - 110); if (bx > xl0(Math.min(by, TB.punt)) - 30 && bx < xr(Math.min(by, TB.punt)) + 30 && by < TB.punt + 60) continue; _botcel(ctx, bx, by, 5, t, i); } ctx.restore(); }
  // botafbrekers van achteren (bij een afgestorven stukje): holtes in het bot
  if (achter > 0.01) { for (const [yy, i] of [[140, 0], [215, 1]]) { const bx = xr(yy) + 70 - 34 * achter; ctx.beginPath(); ctx.ellipse(bx, yy, 26 + 16 * achter, 34, 0, 0, 6.283); shape(ctx, rgba(TK.vlies, Math.min(1, achter * 1.5)), null); botafbreker(ctx, bx + 6, yy, 0.9, t, 1, i + 5, Math.min(1, achter * 2)); } }
  ctx.restore();
  // osteoid: vers laagje langs de wand aan de trekkant
  if (dep > 0.01) { const N = ys.map(yy => [xl(yy), yy]), M = ys.map(yy => [xl(yy) + 9 * dep, yy]).reverse(); _poly(ctx, N.concat(M)); ctx.fillStyle = TK.osteoid; ctx.fill(); }
  // afgestorven stukje wortelvlies aan de drukkant (grijs)
  const rootR = (yy) => tx + _hw(yy - dy), rootL = (yy) => tx - _hw(yy - dy);
  if (grijs > 0.01) { const Y = []; for (let yy = 95; yy <= 240; yy += 6) Y.push(yy); _poly(ctx, Y.map(yy => [rootR(yy) - 2, yy]).concat(Y.slice().reverse().map(yy => [xr(yy) + 22, yy]))); ctx.fillStyle = rgba('#8E8C88', grijs); ctx.fill(); ctx.strokeStyle = rgba('#5E5C58', grijs); ctx.lineWidth = 2; ctx.stroke(); }
  // vezels van het wortelvlies als veertjes, schuin van de wortel omhoog naar het bot
  if (veren > 0) { ctx.lineCap = 'round'; for (let yy = 20; yy <= 345; yy += 36) { if (grijs > 0.5 && yy > 90 && yy < 245) continue;
      for (const sd of [-1, 1]) { const x1 = sd < 0 ? rootL(yy) : rootR(yy), x2 = sd < 0 ? xl(yy - 10) : xr(yy - 10) - pit(yy - 10) * 0.9, L = Math.abs(x2 - x1); const gl = sd < 0 ? trekGloed : drukGloed;
        ctx.strokeStyle = gl > 0.01 ? _mixHex(TK.vez, sd < 0 ? '#E0B64A' : '#E07A5F', gl * 0.9) : TK.vez; ctx.lineWidth = 2.2 + gl * 1.2; veer(ctx, x1, yy, x2, yy - 10, 4, 6 * clamp(26 / Math.max(L, 1), 0.35, 1.2)); } } }
  // bloedvaatjes in de spleet
  if (vaat > 0.01) for (const yy of [140, 262]) for (const sd of [-1, 1]) { const x1 = sd < 0 ? rootL(yy) : rootR(yy), x2 = sd < 0 ? xl(yy) : xr(yy) - pit(yy); const gap = Math.abs(x2 - x1); let rw = Math.min(9, gap * 0.36), col = TK.vat;
    if (sd > 0 && dicht > 0.01) { rw *= 1 - 0.85 * dicht; col = _mixHex('#C0392B', '#5A2A30', dicht); } if (sd > 0 && grijs > 0.5 && yy < 245) continue; if (rw < 0.6) continue; ctx.beginPath(); ctx.ellipse((x1 + x2) / 2, yy + 14, rw, 13, 0, 0, 6.283); shape(ctx, col, rgba('#7A1E1E', 0.6), 1); }
  // botafbrekers in de putjes aan de drukkant, kruimels bot
  if (clast > 0.01) PITS.forEach((yy, i) => { const bx = sh + _hw(yy) + w0 + pit(yy) * 0.45 + 2; botafbreker(ctx, bx, yy, 0.85 + 0.25 * eat, t, 1, i, clast);
    if (kruimels > 0.01) for (let k = 0; k < 4; k++) { const u = (t * 0.6 + k / 4 + i * 0.3) % 1; circ(ctx, bx + 18 - u * 26, yy - 20 + k * 13, 3, rgba('#C9B79E', kruimels * clast * (1 - u))); } });
  // botopbouwers langs de wand aan de trekkant
  if (blast > 0.01) for (let yy = 30, i = 0; yy <= 340; yy += 30, i++) botopbouwer(ctx, xl(yy) + 9 * dep + 9, yy, 0.85, t, i, blast * clamp((blast * 12 - i) , 0, 1));
  // de tand
  ctx.save(); ctx.translate(tx, dy); _hoektand(ctx, o); ctx.restore();
  if (oud != null && oudA > 0.01) { ctx.save(); ctx.globalAlpha *= oudA; ctx.translate(oud, 0); _poly(ctx, _tandPunten(0)); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
  // tandvlees over de botkam
  for (const sd of [-1, 1]) { const ex = sd * (TB.rw + 3); ctx.beginPath(); ctx.moveTo(sd > 0 ? TB.R : TB.L, TB.kam + 6); ctx.quadraticCurveTo(tx + sd * 230, TB.kam - 40, tx + ex + sd * 14, -96); ctx.quadraticCurveTo(tx + ex, -88, tx + sd * (_hw(TB.kam) + 2), TB.kam + 4);
    ctx.quadraticCurveTo(tx + sd * 200, TB.kam + 34, sd > 0 ? TB.R : TB.L, TB.kam + 52); ctx.closePath(); shape(ctx, TK.tv, TK.tvR, 2); }
  // vezels in het tandvlees als gespannen elastiekjes (trekken de tand terug naar links)
  if (elast > 0.01) { ctx.save(); ctx.globalAlpha *= elast; ctx.lineCap = 'round'; [[-250, -50], [-330, -30], [-400, -12]].forEach(([ex, ey], i) => { const sx = tx - TB.rw - 4, sy = -76 + i * 12; const tr = 1 + 0.03 * Math.sin(t * 5 + i);
      ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + (ex - sx) * tr, ey); ctx.stroke(); circ(ctx, ex, ey, 7, '#F2F2EE', C.koraal, 2.5); circ(ctx, sx, sy, 6, '#F2F2EE', C.koraal, 2.5); }); ctx.restore(); }
  // beugel: blokje op de kroon met de draad, en de duw
  if (beugel > 0.01) { ctx.save(); ctx.globalAlpha *= beugel; const by = -195, bx = tx - _cw(by) - 8; ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(TB.L + 20, by); ctx.lineTo(bx, by); ctx.stroke();
    roundRect(ctx, bx - 12, by - 28, 26, 56, 6); shape(ctx, TK.staal, TK.staalR, 2.5); ctx.strokeStyle = TK.staalR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 12, by); ctx.lineTo(bx + 14, by); ctx.stroke(); ctx.restore(); }
  if (kracht > 0.01) { const by = -280, bx = tx - _cw(by) - 30; const col = hard > 0.5 ? C.koraal : C.goud; pijl(ctx, bx - 190 - 40 * hard, by, bx, by, col, kracht, 8 + 12 * hard, 26 + 14 * hard); }
  ctx.restore(); }
// schermpunt in tandBot voor namen
function tbPunt(x, y, s, o, wat) { const sh = o.sh || 0, tx = sh + (o.p || 0) * TB.w0 * 0.82;
  const P = { kroon: [tx, -200], wortel: [tx, 160], drukkant: [sh + _hw(195) + TB.w0, 195], trekkant: [sh - _hw(195) - TB.w0, 195], botR: [330, 380], botL: [-330, 380], tandvlees: [-330, -10], punt: [tx, TB.punt] }[wat] || [0, 0];
  return { x: x + P[0] * s, y: y + P[1] * s }; }

// ================= ingezoomd: wortel · wortelvlies · bot =================
function vliesVeer(ctx, cx, cy, r, o = {}) { const { t = 0, druk = 0, cellen = 1 } = o; const g = 120, xw = cx - g / 2 - 40 + druk * 0, xb = cx + g / 2 - 40;
  ctx.fillStyle = TK.tb; ctx.fillRect(cx - r, cy - r, xw - (cx - r), 2 * r); ctx.fillStyle = '#F2EDE0'; ctx.fillRect(xw - 14, cy - r, 14, 2 * r);
  ctx.strokeStyle = rgba(TK.buis, 0.5); ctx.lineWidth = 1.5; for (let k = -6; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(cx - r, cy + k * 40 + 10); ctx.lineTo(xw - 14, cy + k * 40); ctx.stroke(); }
  ctx.fillStyle = TK.vlies; ctx.fillRect(xw, cy - r, xb - xw, 2 * r);
  ctx.fillStyle = TK.bot; ctx.fillRect(xb, cy - r, cx + r - xb, 2 * r); for (let i = 0; i < 26; i++) { const bx = xb + 20 + hash(i * 3) * (cx + r - xb - 20), by = cy - r + hash(i * 5) * 2 * r; ctx.beginPath(); ctx.ellipse(bx, by, 9 + hash(i) * 14, 7 + hash(i * 2) * 9, hash(i * 4) * 3, 0, 6.283); shape(ctx, TK.botV, null); }
  if (cellen) for (let i = 0; i < 4; i++) _botcel(ctx, xb + 50 + hash(i * 7) * 120, cy - r * 0.7 + i * r * 0.45, 7, t, i);
  ctx.beginPath(); ctx.ellipse((xw + xb) / 2, cy + 60, 14, 22, 0, 0, 6.283); shape(ctx, TK.vat, rgba('#7A1E1E', 0.6), 1.5);
  const zak = 12 * druk; ctx.strokeStyle = TK.vez; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = -4; k <= 4; k++) { if (k === 1) continue; const yy = cy + k * 48; veer(ctx, xw, yy + 14 + zak, xb, yy - 14, 5, 9 * (1 - 0.3 * druk)); } }

// ================= los bot dat verbouwd wordt (H1) =================
function botWeefsel(ctx, x, y, w, h, o = {}) { const { t = 0, af = 0, op = 0, cellen = 1, a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 24); ctx.save(); ctx.clip(); ctx.fillStyle = '#F3D3CC'; ctx.fillRect(x - w / 2, y - h / 2, w, h);
  const y0 = y - h * 0.05, pA = x - w * 0.24, pB = x + w * 0.22, dA = 70 * af, dB = 70 * (1 - op);
  const opp = (px) => y0 + Math.max(0, dA * (1 - Math.pow((px - pA) / 95, 2))) + Math.max(0, dB * (1 - Math.pow((px - pB) / 95, 2)));
  ctx.beginPath(); ctx.moveTo(x - w / 2, y + h / 2); for (let px = x - w / 2; px <= x + w / 2; px += 6) ctx.lineTo(px, opp(px)); ctx.lineTo(x + w / 2, y + h / 2); ctx.closePath(); shape(ctx, TK.bot, TK.botR, 2.5);
  ctx.save(); ctx.clip(); for (let i = 0; i < 40; i++) { const bx = x - w / 2 + hash(i * 3 + 1) * w, by = y0 + 30 + hash(i * 7 + 2) * h * 0.5; ctx.beginPath(); ctx.ellipse(bx, by, 8 + hash(i) * 14, 6 + hash(i * 2) * 8, hash(i) * 3, 0, 6.283); shape(ctx, TK.botV, null); }
    // nieuwe laagjes in de put rechts
    ctx.strokeStyle = rgba(TK.botR, 0.9); ctx.lineWidth = 2; for (let k = 1; k <= 4; k++) { if (op * 4 < k - 0.2) break; const d = 70 * (1 - k / 4.4); ctx.beginPath(); for (let px = pB - 95; px <= pB + 95; px += 6) { const yy = y0 + Math.max(0, d * (1 - Math.pow((px - pB) / 95, 2))); px === pB - 95 ? ctx.moveTo(px, yy) : ctx.lineTo(px, yy); } ctx.stroke(); }
    if (cellen) for (let i = 0; i < 6; i++) _botcel(ctx, x - w / 2 + 60 + i * (w - 120) / 5 + hash(i) * 30, y0 + 130 + hash(i * 3) * 80, 7, t, i);
  ctx.restore(); ctx.restore();
  // cellen op het oppervlak
  ctx.save(); ctx.translate(pA, opp(pA) - 22); ctx.rotate(Math.PI / 2); botafbreker(ctx, 0, 0, 1.6, t, 1, 0, 1); ctx.restore();
  for (let k = 0; k < 5; k++) { const u = (t * 0.5 + k / 5) % 1; circ(ctx, pA + (hash(k) - 0.5) * 70, opp(pA) - 50 - u * 60, 4, rgba('#C9B79E', af * (1 - u))); }
  for (let i = -3; i <= 3; i++) { const px = pB + i * 26; botopbouwer(ctx, px, opp(px) - 14, 1.2, t, i, 1); }
  ctx.restore(); }
// dijbeen (rest van het skelet): dik = dikker door belasting
function dijbeen(ctx, x, y, s, o = {}) { const { dik = 0, a = 1, t = 0, cellen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const w = 34 + 14 * dik;
  ctx.beginPath(); ctx.moveTo(-w, -200); ctx.quadraticCurveTo(-w - 6, 0, -w, 210); ctx.quadraticCurveTo(-90, 250, -70, 290); ctx.quadraticCurveTo(-40, 320, 0, 300); ctx.quadraticCurveTo(40, 320, 75, 290); ctx.quadraticCurveTo(95, 250, w, 210);
  ctx.quadraticCurveTo(w + 6, 0, w, -200); ctx.quadraticCurveTo(w + 40, -230, 70, -260); ctx.lineTo(30, -250); ctx.quadraticCurveTo(-20, -255, -50, -280); ctx.lineTo(-70, -265); ctx.quadraticCurveTo(-w - 10, -235, -w, -200); ctx.closePath(); shape(ctx, '#E8E2D2', '#B8B0A0', 3);
  circ(ctx, -72, -290, 42, '#E8E2D2', '#B8B0A0', 3);
  if (cellen > 0.01) { ctx.save(); ctx.globalAlpha *= cellen; for (let i = 0; i < 7; i++) { const yy = -170 + i * 55, xx = (hash(i * 3) - 0.5) * w; circ(ctx, xx, yy, 6 + 2 * Math.sin(t * 4 + i), C.teal); } ctx.restore(); }
  ctx.restore(); }
// rondje pijlen (verbouwen gaat altijd door)
function rondPijl(ctx, x, y, r, a = 1, t = 0, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; const o = t * 0.6;
  for (const st of [0, Math.PI]) { ctx.beginPath(); ctx.arc(x, y, r, st + o, st + o + 2.4); ctx.stroke(); const an = st + o + 2.4, px = x + Math.cos(an) * r, py = y + Math.sin(an) * r, tg = an + Math.PI / 2;
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px + Math.cos(tg) * 18, py + Math.sin(tg) * 18); ctx.lineTo(px + Math.cos(tg + 2.5) * 16, py + Math.sin(tg + 2.5) * 16); ctx.lineTo(px + Math.cos(tg - 2.5) * 16, py + Math.sin(tg - 2.5) * 16); ctx.closePath(); ctx.fill(); }
  ctx.restore(); }
// spijker in hout (misvatting)
function spijkerHout(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -150, -10, 300, 120, 10); shape(ctx, '#B98A55', '#8A6236', 2.5); ctx.strokeStyle = rgba('#8A6236', 0.7); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-140, 15 + k * 25); ctx.bezierCurveTo(-60, 5 + k * 25, 40, 30 + k * 25, 140, 12 + k * 25); ctx.stroke(); }
  ctx.fillStyle = '#9AA3B2'; ctx.fillRect(-6, -90, 12, 160); roundRect(ctx, -34, -104, 68, 16, 5); shape(ctx, '#B8C0CA', '#7A838E', 2); ctx.restore(); }

// ================= gebit van voren (close-up) met beugel =================
const GV = { up: [[96, 126], [78, 112], [74, 122], [62, 100], [54, 92]], lo: [[56, 84], [58, 86], [62, 94], [58, 86], [52, 82]] };
function _voortand(ctx, w, h, punt, boven = true) { ctx.beginPath(); ctx.moveTo(-w * 0.40, -6); ctx.bezierCurveTo(-w * 0.53, h * 0.25, -w * 0.53, h * 0.7, -w * 0.46, h * 0.88);
  if (punt) { ctx.quadraticCurveTo(-w * 0.3, h * 0.96, 0, h + 8); ctx.quadraticCurveTo(w * 0.3, h * 0.96, w * 0.46, h * 0.88); } else { ctx.quadraticCurveTo(-w * 0.45, h, -w * 0.3, h); ctx.lineTo(w * 0.3, h); ctx.quadraticCurveTo(w * 0.45, h, w * 0.46, h * 0.88); }
  ctx.bezierCurveTo(w * 0.53, h * 0.7, w * 0.53, h * 0.25, w * 0.40, -6); ctx.closePath(); const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#EDE3C8'); g.addColorStop(0.35, '#F8F5EC'); g.addColorStop(1, '#FCFBF6'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#B9B0A0'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = rgba('#FFFFFF', 0.9); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w * 0.22, h * 0.25); ctx.lineTo(-w * 0.24, h * 0.6); ctx.stroke(); }
function _blokje(ctx, bx, by, r, kleur) { roundRect(ctx, bx - r, by - r, 2 * r, 2 * r, r * 0.3); shape(ctx, TK.staal, TK.staalR, 2); ctx.strokeStyle = kleur; ctx.lineWidth = r * 0.32; roundRect(ctx, bx - r * 0.78, by - r * 0.78, r * 1.56, r * 1.56, r * 0.5); ctx.stroke(); ctx.strokeStyle = TK.staalR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - r, by); ctx.lineTo(bx + r, by); ctx.stroke(); }
function _draadDoor(ctx, P) { if (P.length < 2) return; P.sort((p1, p2) => p1[0] - p2[0]); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0] - 40, P[0][1] + 8);
  ctx.lineTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) { const mx = (P[i - 1][0] + P[i][0]) / 2, my = (P[i - 1][1] + P[i][1]) / 2; ctx.quadraticCurveTo(P[i - 1][0], P[i - 1][1], mx, my); } ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]); ctx.lineTo(P[P.length - 1][0] + 40, P[P.length - 1][1] + 8); ctx.stroke(); }
// o: beugel 0..1, scheef 0..1 (hoektand rechts staat te hoog en gedraaid), plak 0..1, wit 0..1 (witte plekjes), kring 0..1 (ring om de hoektand), rager 0..1
function gebitVoor(ctx, x, y, s, o = {}) { const { t = 0, beugel = 1, scheef = 0, plak = 0, wit = 0, kleur = C.teal, a = 1, kring = 0, rager_ = 0, schuif = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -560, -300, 1120, 600, 40); shape(ctx, '#D9A982', '#B8875F', 3); ctx.save(); roundRect(ctx, -560, -300, 1120, 600, 40); ctx.clip();
  const mond = () => { ctx.beginPath(); ctx.moveTo(-470, -40); ctx.bezierCurveTo(-300, -205, 300, -205, 470, -40); ctx.bezierCurveTo(300, 215, -300, 215, -470, -40); ctx.closePath(); };
  mond(); ctx.fillStyle = '#3A1E24'; ctx.fill(); ctx.save(); mond(); ctx.clip();
  ctx.beginPath(); ctx.ellipse(0, 170, 300, 80, 0, 0, 6.283); ctx.fillStyle = '#A84A55'; ctx.fill();
  const BU = [], BL = []; let hoek = null;
  // onderste rij
  ctx.fillStyle = TK.tv; ctx.fillRect(-520, 96, 1040, 160);
  for (const sd of [-1, 1]) { let cx = 0; GV.lo.forEach(([w, h], i) => { const c = sd * (cx + w / 2 + 2); cx += w + 3; const eY = -10 + i * 5; ctx.save(); ctx.translate(c, eY + h); ctx.scale(1, -1); _voortand(ctx, w, h, i === 2); ctx.restore(); BL.push([c, eY + h * 0.42]); }); }
  // bovenste rij
  ctx.fillStyle = TK.tv; ctx.beginPath(); ctx.moveTo(-520, -260); ctx.lineTo(520, -260); ctx.lineTo(520, -96); ctx.quadraticCurveTo(0, -128, -520, -96); ctx.closePath(); ctx.fill();
  const lijst = []; for (const sd of [-1, 1]) { let cx = 0; GV.up.forEach(([w, h], i) => { const c = sd * (cx + w / 2 + 2); cx += w + 3; lijst.push([sd, i, c, w, h]); }); }
  lijst.sort((p1, p2) => p2[1] - p1[1]); const sch = scheef;
  const tekenUp = ([sd, i, c, w, h]) => { const eY = 8 - i * 6; const isH = sd > 0 && i === 2; const dx = isH ? 10 * sch : 0, dyy = isH ? -46 * sch : 0, rot = isH ? 0.2 * sch : 0;
    ctx.save(); ctx.translate(c + dx, eY - h + dyy); ctx.rotate(rot); _voortand(ctx, w * (isH ? 1 + 0.05 * sch : 1), h, i === 2); ctx.restore();
    const bp = [c + dx + Math.sin(rot) * h * 0.55, eY - h * 0.45 + dyy]; BU.push(bp); if (isH) hoek = bp; };
  lijst.filter(L => !(L[0] > 0 && L[1] === 2)).forEach(tekenUp); lijst.filter(L => L[0] > 0 && L[1] === 2).forEach(tekenUp);
  // witte plekjes waar de blokjes zaten
  if (wit > 0.01) BU.forEach(([bx, by], i) => { ctx.beginPath(); ctx.ellipse(bx + (hash(i) - 0.5) * 6, by + 4, 22 + hash(i * 3) * 6, 26, 0.2 * (hash(i * 5) - 0.5), 0, 6.283); ctx.fillStyle = rgba('#FFFFFF', 0.95 * wit); ctx.fill(); ctx.strokeStyle = rgba('#C8CED6', wit); ctx.lineWidth = 2; ctx.stroke(); });
  // plak rond de blokjes
  if (plak > 0.01) BU.concat(BL).forEach(([bx, by], i) => { for (let k = 0; k < 5; k++) { const an = hash(i * 11 + k) * 6.283, rr = 20 + hash(i * 7 + k) * 8; circ(ctx, bx + Math.cos(an) * rr, by + Math.sin(an) * rr * 1.1, 6 + hash(i + k * 3) * 6, rgba('#E2CF7A', 0.85 * plak)); } });
  if (beugel > 0.01) { ctx.save(); ctx.globalAlpha *= beugel; _draadDoor(ctx, BL.map(p => p.slice())); BL.forEach(([bx, by]) => _blokje(ctx, bx, by, 12, kleur)); _draadDoor(ctx, BU.map(p => p.slice())); BU.forEach(([bx, by]) => _blokje(ctx, bx, by, 15, kleur)); ctx.restore(); }
  if (rager_ > 0.01) { const bx = BU[1] ? BU[1][0] : 0; rager(ctx, -150 + 14 * Math.sin(t * 9), -20, 0.9, rager_); }
  if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= schuif; [[-1, 0], [-1, 2], [1, 1], [1, 3]].forEach(([sd, i], k) => { const L = lijst.find(q2 => q2[0] === sd && q2[1] === i); if (!L) return; const xx = L[2], d = 8 * Math.sin(t * 2 + k); pijl(ctx, xx - 18 + d, -150, xx + 18 + d, -150, C.goud, 1, 4, 12); }); ctx.restore(); }
  ctx.restore();
  ctx.lineJoin = 'round'; mond(); ctx.strokeStyle = '#C46F66'; ctx.lineWidth = 46; ctx.stroke(); mond(); ctx.strokeStyle = rgba('#8E4440', 0.8); ctx.lineWidth = 3; ctx.stroke();
  if (kring > 0.01 && hoek) { ctx.save(); ctx.globalAlpha *= kring; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.ellipse(hoek[0], hoek[1] - 8, 64, 92, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.restore(); return hoek ? { x: x + hoek[0] * s, y: y + hoek[1] * s } : { x, y }; }

// ================= tandboog van bovenaf (binnenkant zichtbaar) =================
function gebitBoven(ctx, x, y, s, o = {}) { const { t = 0, draad = 0, terug = 0, a = 1, schuif = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -440, -330, 880, 640, 40); shape(ctx, '#B65C66', '#8E4450', 3); ctx.save(); roundRect(ctx, -440, -330, 880, 640, 40); ctx.clip();
  const A = 300, B = 330, CY = 110, pt = (th) => [A * Math.sin(th), CY - B * Math.cos(th)], nrm = (th) => { const nx = Math.sin(th) / A, ny = -Math.cos(th) / B, L = Math.hypot(nx, ny); return [nx / L, ny / L]; };
  ctx.strokeStyle = TK.tv; ctx.lineWidth = 150; ctx.lineCap = 'round'; ctx.beginPath(); for (let th = -1.55; th <= 1.55; th += 0.02) { const [px, py] = pt(th); th === -1.55 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  const W = [50, 56, 62, 62, 64, 94, 88], D = [44, 48, 64, 70, 74, 90, 86];
  const thAt = (len) => { let th = 0, L = 0; while (L < len && th < 1.6) { const [x1, y1] = pt(th), [x2, y2] = pt(th + 0.004); L += Math.hypot(x2 - x1, y2 - y1); th += 0.004; } return th; };
  const pos = []; let cum = 2; W.forEach((w, i) => { pos.push(thAt(cum + w / 2)); cum += w + 4; });
  const lingual = [];
  for (const sd of [-1, 1]) W.forEach((w, i) => { const th = sd * pos[i]; let [px, py] = pt(th); const [nx, ny] = nrm(th); let ang = Math.atan2(B * Math.sin(th), A * Math.cos(th)); const isH = sd > 0 && i === 2;
    if (isH && terug > 0.01) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.setLineDash([8, 7]); ctx.strokeStyle = rgba(C.goud, terug); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, w / 2, D[i] / 2, 0, 0, 6.283); ctx.stroke(); ctx.restore(); px += nx * 34 * terug; py += ny * 34 * terug; ang += 0.4 * terug; }
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang); const d = D[i];
    if (i < 2) roundRect(ctx, -w / 2, -d / 2, w, d, d * 0.42); else if (i < 5) { ctx.beginPath(); ctx.ellipse(0, 0, w / 2, d / 2, 0, 0, 6.283); } else roundRect(ctx, -w / 2, -d / 2, w, d, 22);
    const g = ctx.createRadialGradient(-w * 0.15, -d * 0.15, 4, 0, 0, Math.max(w, d) * 0.7); g.addColorStop(0, '#FCFBF6'); g.addColorStop(1, '#E6DECB'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#B9B0A0'; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = rgba('#B9B0A0', 0.8); ctx.lineWidth = 2; if (i < 2) { ctx.beginPath(); ctx.moveTo(-w * 0.35, -d * 0.1); ctx.lineTo(w * 0.35, -d * 0.1); ctx.stroke(); } else if (i >= 3) { ctx.beginPath(); ctx.moveTo(-w * 0.3, 0); ctx.lineTo(w * 0.3, 0); if (i >= 5) { ctx.moveTo(0, -d * 0.3); ctx.lineTo(0, d * 0.3); } ctx.stroke(); }
    ctx.restore(); if (i <= 2) lingual.push([sd, i, px - nx * (d / 2 + 4), py - ny * (d / 2 + 4)]); });
  if (draad > 0.01) { ctx.save(); ctx.globalAlpha *= draad; const P = lingual.sort((p1, p2) => (p1[0] * (p1[1] + 0.5)) - (p2[0] * (p2[1] + 0.5))); const n = Math.max(2, Math.ceil(P.length * clamp(draad * 1.2, 0, 1)));
    ctx.strokeStyle = '#5E6672'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); P.slice(0, n).forEach(([, , px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 4; ctx.stroke();
    P.slice(0, n).forEach(([, , px, py]) => { ctx.beginPath(); ctx.ellipse(px, py, 13, 11, 0, 0, 6.283); shape(ctx, '#E8DCB8', '#8A7A50', 2); }); ctx.restore(); }
  if (schuif > 0.01) { ctx.save(); ctx.globalAlpha *= schuif; [3, 4, 5].forEach((i, k) => { for (const sd of [-1, 1]) { const [px, py] = pt(sd * pos[i]); const d = 6 * Math.sin(t * 2 + k + sd); pijl(ctx, px + sd * 60, py + 10 + d, px + sd * 60, py - 26 + d, C.goud, 1, 4, 12); } }); ctx.restore(); }
  ctx.restore(); text(ctx, 'voorkant', 0, -290, fMeta(22), rgba('#F2F2EE', 0.8), 'center'); ctx.restore();
  return { x: x + pt(pos[2])[0] * s, y: y + pt(pos[2])[1] * s }; }

// kalender: blaadje met een getal
function kalender(ctx, x, y, s, tekst, sub = '', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 170, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.fillStyle = C.koraal; roundRect(ctx, -90, -80, 180, 44, 14); ctx.fill(); ctx.fillRect(-90, -50, 180, 14);
  for (const rx of [-45, 45]) { roundRect(ctx, rx - 6, -96, 12, 30, 5); shape(ctx, '#8A939E', null); }
  text(ctx, tekst, 0, 40, fTekst(tekst.length > 3 ? 46 : 64, 800), '#1A2740', 'center'); if (sub) text(ctx, sub, 0, 76, fTekst(22, 700), '#5A6478', 'center'); ctx.restore(); }
// krachtmeter: halve schaal licht (groen) tot hard (rood), wijzer v 0..1
function krachtMeter(ctx, x, y, r, v, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt';
  roundRect(ctx, x - r - 24, y - r - 24, 2 * r + 48, r + 64, 18); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5);
  [[0, 0.55, C.groen], [0.55, 0.78, C.goud], [0.78, 1, C.koraal]].forEach(([u0, u1, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(x, y, r - 10, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI); ctx.stroke(); });
  const an = Math.PI + clamp(v, 0, 1) * Math.PI; ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * (r - 22), y + Math.sin(an) * (r - 22)); ctx.stroke(); circ(ctx, x, y, 9, C.text);
  text(ctx, 'licht', x - r + 6, y + 30, fTekst(22, 700), C.text2, 'center'); text(ctx, 'hard', x + r - 6, y + 30, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }

// ================= schedel van opzij (gezicht links) =================
// k = 1 ruime kaak (jager-verzamelaar) … 0 krappe kaak (nu); kauw 0..1 = kaak beweegt; hl = ring om de verstandskies; rij = tandenrij oplichten
function schedelZij(ctx, x, y, s, o = {}) { const { k = 1, kauw = 0, hl = 0, hlKleur = C.groen, rij = 0, t = 0, a = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  const BOT = '#E8E2D2', BR = '#B8B0A0', GAT = '#4A4540';
  const L = lerp(205, 300, k), xE = -245 + L, TW = [22, 22, 28, 30, 30, 40, 40, 40];
  const fit = clamp((L - 250) / 14, 0, 1), c = Math.min(1, (L - 6) / 212);
  const tandX = []; let cx = -243; for (let i = 0; i < 7; i++) { const w = TW[i]; tandX.push(cx + w * c / 2 + (fit > 0.5 ? 2 : 0)); cx += w * c + (fit > 0.5 ? (L - 252) / 8 : 0); }
  const wX = cx + 22;
  const kroon = (xx, yy, w, boven, i) => { ctx.save(); ctx.translate(xx, yy); ctx.rotate((i % 2 ? 1 : -1) * 0.13 * (1 - c > 0.02 ? 1 : 0) * (i < 4 ? 1 : 0.4)); const hh = 36; roundRect(ctx, -w / 2, boven ? 0 : -hh, w, hh, 8); shape(ctx, '#F6F3EA', BR, 2);
    if (w >= 30) { ctx.strokeStyle = rgba(BR, 0.8); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, boven ? hh - 8 : -hh + 8); ctx.lineTo(0, boven ? hh : -hh); ctx.stroke(); } ctx.restore(); };
  // schedel + bovenkaak
  ctx.beginPath(); ctx.moveTo(-252, -40); ctx.bezierCurveTo(-285, -210, -100, -330, 80, -322); ctx.bezierCurveTo(260, -312, 365, -170, 345, -20); ctx.bezierCurveTo(335, 60, 290, 110, 225, 128); ctx.lineTo(xE + 120, 118); ctx.lineTo(xE + 40, 140); ctx.lineTo(xE + 30, 165);
  ctx.lineTo(-238, 165); ctx.lineTo(-258, 128); ctx.lineTo(-250, 88); ctx.lineTo(-282, 42); ctx.lineTo(-262, -6); ctx.closePath(); shape(ctx, BOT, BR, 3);
  ctx.beginPath(); ctx.ellipse(-168, -30, 52, 46, 0, 0, 6.283); shape(ctx, GAT, BR, 2); ctx.beginPath(); ctx.ellipse(-236, 66, 15, 30, 0.15, 0, 6.283); shape(ctx, GAT, null);
  ctx.strokeStyle = BR; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-140, 40); ctx.quadraticCurveTo(-30, 80, xE + 100, 66); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-60, -200); ctx.quadraticCurveTo(80, -240, 200, -150); ctx.strokeStyle = rgba(BR, 0.6); ctx.lineWidth = 2; ctx.stroke();
  circ(ctx, xE + 112, 72, 14, GAT);
  for (let i = 0; i < 7; i++) kroon(tandX[i], 165, TW[i], true, i);
  if (fit > 0.01) { ctx.save(); ctx.globalAlpha *= fit; kroon(wX, 165, 40, true, 7); ctx.restore(); }
  if (fit < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - fit) * 0.9; ctx.translate(xE + 30, 128); ctx.rotate(0.7); roundRect(ctx, -20, -18, 40, 36, 8); shape(ctx, '#F6F3EA', BR, 2); ctx.setLineDash([6, 5]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  // onderkaak (draait om het kaakgewricht)
  const jx = xE + 97, jy = 98; ctx.save(); ctx.translate(jx, jy); ctx.rotate(kauw * 0.07 * (0.5 + 0.5 * Math.sin(t * 7))); ctx.translate(-jx, -jy);
  ctx.beginPath(); ctx.moveTo(-238, 235); ctx.lineTo(xE + 8, 235); ctx.quadraticCurveTo(xE + 42, 215, xE + 50, 124); ctx.lineTo(xE + 72, 168); ctx.quadraticCurveTo(xE + 84, 150, xE + 88, 100);
  ctx.quadraticCurveTo(xE + 100, 84, xE + 110, 100); ctx.lineTo(xE + 106, 150); ctx.quadraticCurveTo(xE + 100, 250, xE + 112, 300); ctx.quadraticCurveTo(xE + 60, 338, -40, 330); ctx.quadraticCurveTo(-200, 336, -236, 318); ctx.quadraticCurveTo(-270, 290, -262, 255); ctx.closePath(); shape(ctx, BOT, BR, 3);
  circ(ctx, -150, 285, 7, GAT);
  for (let i = 0; i < 7; i++) kroon(tandX[i], 236, TW[i], false, i + 1);
  if (fit > 0.01) { ctx.save(); ctx.globalAlpha *= fit; kroon(wX, 236, 40, false, 8); ctx.restore(); }
  if (fit < 0.99) { ctx.save(); ctx.globalAlpha *= (1 - fit) * 0.9; ctx.translate(xE + 34, 268); ctx.rotate(-0.85); roundRect(ctx, -20, -18, 40, 36, 8); shape(ctx, '#F6F3EA', BR, 2); ctx.setLineDash([6, 5]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (rij > 0.01) { ctx.save(); ctx.globalAlpha *= rij; ctx.strokeStyle = C.groen; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-246, 248); ctx.lineTo(xE + 6, 248); ctx.stroke(); ctx.restore(); }
  const wx = fit > 0.5 ? wX : xE + 32, wy = fit > 0.5 ? 200 : 200;
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = hlKleur; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.ellipse(wx, wy, 52, fit > 0.5 ? 70 : 105, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return { x: x + wx * s, y: y + wy * s }; }

// voedsel: 'taai' (knol, gedroogd vlees, noten) of 'zacht' (kom pap, witbrood)
function voedsel(ctx, x, y, s, soort, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (soort === 'taai') { ctx.save(); ctx.rotate(-0.4); ctx.beginPath(); ctx.moveTo(-70, -10); ctx.quadraticCurveTo(-60, -34, 0, -26); ctx.quadraticCurveTo(60, -18, 90, 4); ctx.quadraticCurveTo(60, 20, 0, 22); ctx.quadraticCurveTo(-60, 26, -70, -10); ctx.closePath(); shape(ctx, '#A8743A', '#7A5228', 2);
      ctx.strokeStyle = rgba('#7A5228', 0.8); ctx.lineWidth = 2; for (const kx of [-30, 10, 50]) { ctx.beginPath(); ctx.moveTo(kx, -22); ctx.quadraticCurveTo(kx + 6, 0, kx, 20); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.moveTo(-40, 40); ctx.bezierCurveTo(-10, 30, 20, 50, 60, 38); ctx.lineTo(64, 64); ctx.bezierCurveTo(20, 76, -10, 56, -44, 66); ctx.closePath(); shape(ctx, '#8A3B2A', '#5E2418', 2);
    for (const [nx, ny] of [[-70, 54], [-88, 30]]) { ctx.beginPath(); ctx.ellipse(nx, ny, 14, 11, 0.4, 0, 6.283); shape(ctx, '#B88A4A', '#7A5A2A', 2); } }
  else { ctx.beginPath(); ctx.moveTo(-80, -6); ctx.quadraticCurveTo(-74, 56, 0, 58); ctx.quadraticCurveTo(74, 56, 80, -6); ctx.closePath(); shape(ctx, '#5BA4C9', '#3E7FA0', 2);
    ctx.beginPath(); ctx.ellipse(0, -6, 80, 16, 0, 0, 6.283); shape(ctx, '#F2D9A0', '#C9AE70', 2); ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(30, -10); ctx.lineTo(95, -70); ctx.stroke();
    roundRect(ctx, -150, -40, 64, 70, 18); shape(ctx, '#F6E7C4', '#D2A060', 5); }
  ctx.restore(); }

// ---------- overgenomen uit t2 ----------
function tandStoel(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = '#5A6478'; roundRect(ctx, x - 90, y - 26, 180, 26, 8); ctx.fill(); ctx.fillRect(x - 18, y - 200, 36, 180);
  ctx.beginPath(); ctx.moveTo(x - 200, y - 230); ctx.lineTo(x + 170, y - 230); ctx.quadraticCurveTo(x + 200, y - 230, x + 200, y - 200); ctx.lineTo(x + 330, y - 120); ctx.lineTo(x + 310, y - 90); ctx.lineTo(x + 180, y - 170); ctx.lineTo(x - 200, y - 170); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  ctx.beginPath(); ctx.moveTo(x - 190, y - 230); ctx.lineTo(x - 330, y - 470); ctx.lineTo(x - 270, y - 500); ctx.lineTo(x - 130, y - 240); ctx.closePath(); shape(ctx, '#2E8A9A', '#246E7A', 2.5);
  roundRect(ctx, x - 380, y - 560, 90, 54, 20); shape(ctx, '#2E8A9A', '#246E7A', 2.5); ctx.restore(); }
function rager(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.3);
  roundRect(ctx, -110, -9, 120, 18, 8); shape(ctx, '#5BA4C9', '#3E7FA0', 2); ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(80, 0); ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const xx = 30 + k * 2.8, l = 12 - Math.abs(k - 9) * 0.5; ctx.beginPath(); ctx.moveTo(xx, -l); ctx.lineTo(xx, l); ctx.stroke(); } ctx.restore(); }
function ragerHold(ctx, x, y, an) { ctx.save(); ctx.translate(x, y); ctx.rotate(an - 0.2); rager(ctx, 40, 0, 0.8, 1); ctx.restore(); }
function spiegel(ctx, x, y, w, h, a = 1, binnen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, w / 2 + 16, h / 2 + 16, 0, 0, 6.283); shape(ctx, '#8A6A4A', '#5E4630', 3);
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 6.283); ctx.fillStyle = '#2E4258'; ctx.fill(); ctx.save(); ctx.clip(); if (binnen) binnen(); ctx.fillStyle = rgba('#BFD8EE', 0.12); ctx.fillRect(x - w, y - h, 2 * w, 2 * h);
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x - w * 0.3, y - h * 0.38); ctx.lineTo(x - w * 0.05, y - h * 0.46); ctx.stroke(); ctx.restore(); ctx.restore(); }
function recapKaart(ctx, x, y, w, s2, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 88, 14); shape(ctx, rgba(col, 0.16), col, 2); text(ctx, s2, x + w / 2, y + 56, fTekst(32, 700), C.text, 'center'); ctx.restore(); }
// Wat word jij? · Tandheelkunde 4 · Een tand door bot — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Noor met een beugel; Tandarts Wouter; Mondhygiënist Ilse).
// Rode draad: Noors scheve hoektand die in twee jaar door het kaakbot schuift. De beugel staat alleen op close-ups van de tanden (niet over het gezicht van Noor).

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }
// één tekstvak tegelijk op een vaste plek: lijst = [[woord, n, tekst, kleur], …]; de vorige gaat weg vóór de volgende komt
function tekstVak(ctx, lijst, x, y, t, q, px = 30, soort = 'tag') { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n) - 0.05) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.35)) / 0.3, 0, 1) : 0; const a = q.on(w, n, 0.35) * (1 - uit);
  if (soort === 'naam') naamBij(ctx, s2, '', x, y, a, 'center', col || C.text); else tag(ctx, s2, x, y, col, a, 'center', px); }
const golfje = (t, t0) => t > t0 ? Math.max(0, Math.sin((t - t0) * 4.2)) * Math.exp(-((t - t0) % 1.5) * 0.4) : 0;

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.1) % 1; tandBot(ctx, 1480, 520, 0.6, { t, sh: 46 * ease(u * 1.3), p: 1, eat: 1, clast: 1, blast: 1, dep: 1, beugel: 1, kracht: 1, cellen: 0.8, kruimels: 1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Maar', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'noor', 380, 880, 560, { t, kijk: 1, uit: 'lacht', a: clamp(t / 0.3, 0, 1) });
      spiegel(ctx, 1180, 450, 860, 600, 1, () => { const H = gebitVoor(ctx, 1180, 450, 0.66, { t, beugel: q.on('beugel', 1), scheef: 1, kring: q.on('hoektand', 1) });
        if (q.on('millimeter', 1) > 0.01) { const d = 30 * q.on('opschuiven', 1, 1.6); pijl(ctx, H.x + 50, H.y - 120, H.x + 50, H.y - 40 + d * 0.2, C.goud, q.on('millimeter', 1), 6, 20); } });
      naamBij(ctx, 'Noor', '', 380, 250, clamp(t / 0.4, 0, 1) * (1 - q.on('orthodontist', 1)), 'center');
      tag(ctx, 'beugel van de orthodontist', 1180, 100, C.teal, q.on('orthodontist', 1) * (1 - q.on('hoektand', 1)), 'center', 30);
      naamBij(ctx, 'hoektand', 'staat scheef', 1180, 820, q.on('hoektand', 1), 'center'); });
    laag(ctx, B, () => { tandBot(ctx, 900, 450, 0.82, { t, beugel: 1, kracht: q.on('bewegen', 1) });
      naamBij(ctx, 'kaakbot', 'hard als steen', 1300, 700, q.on('hard', 1), 'left');
      vraagteken(ctx, 1520, 360, q.on('bewegen', 1), 130); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('eerst', 1));
    tandBot(ctx, 760, 460, 0.82, { t, a: clamp(t / 0.6, 0, 1) });
    laag(ctx, q.on('eerst', 1), () => { spijkerHout(ctx, 1480, 400, 1.1); regel(ctx, 'zoals een spijker in hout?', 1480, 620, 1, C.text, 34, 'center', 700); vraagteken(ctx, 1480, 260, q.on('vastzit', 1), 90); }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const X = 600, Y = 450, S = 0.84;
    const hap = q.at('hap', 1), veert = t > hap ? Math.max(0, Math.sin((t - hap) * 4)) * clamp((q.at('Zo', 1) + 1.2 - t), 0, 1) : 0;
    tandBot(ctx, X, Y, S, { t, dy: 9 * veert, drukGloed: q.on('wortelvlies', 1) * (1 - q.on('hap', 1)), trekGloed: q.on('wortelvlies', 1) * (1 - q.on('hap', 1)) });
    if (veert > 0.02) pijl(ctx, X, Y - 400 * S, X, Y - 330 * S + 6 * veert, C.goud, 1, 8, 24);
    kruis(ctx, X + 140, Y - 200, 26, q.on('vastgegroeid', 1) * (1 - q.on('Tussen', 1)));
    const W = tbPunt(X, Y, S, {}, 'wortel'); naamBij(ctx, 'wortel', '', W.x, W.y + 40, q.on('wortel', 1), 'center');
    naamBij(ctx, 'kaakbot', '', X - 300 * S, Y + 420 * S, q.on('bot', 1), 'left'); naamBij(ctx, 'tandvlees', '', X - 330 * S, Y - 60 * S, q.on('bot', 1), 'center');
    // inzoomen op de spleet
    const Z = q.on('spleet', 1, 0.8), pr = { x: X + 70 * S, y: Y + 180 * S };
    zoomCircle(ctx, 1450, 420, 270, pr.x, pr.y, '', Z, () => vliesVeer(ctx, 1450, 420, 270, { t, druk: veert }));
    laag(ctx, Z, () => { naamBij(ctx, 'wortel', '', 1300, 730, 1, 'center'); naamBij(ctx, 'bot', '', 1640, 730, 1, 'center');
      tekstVak(ctx, [['spleet', 1, 'een paar tiende mm', C.text2], ['wortelvlies', 1, 'wortelvlies', C.text], ['hap', 1, 'veert in', C.goud]], 1450, 800, t, q, 30, 'naam'); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const af = clamp((t - q.at('afbreken', 1) + 0.6) / 5, 0, 1), op = clamp((t - q.at('maken', 1) + 0.4) / 6, 0, 1);
    botWeefsel(ctx, 640, 480, 860, 560, { t, af, op, a: clamp(t / 0.5, 0, 1) });
    naamBij(ctx, 'levend weefsel', 'botcellen', 640, 830, q.on('levend', 1) * (1 - q.on('afbreken', 1)), 'center');
    naamBij(ctx, 'botafbreker', '', 434, 300, q.on('afbreken', 1), 'center', C.paars); naamBij(ctx, 'botopbouwer', '', 836, 300, q.on('maken', 1), 'center', C.groen);
    const SK = q.on('skelet', 1); dijbeen(ctx, 1460, 470, 1.05, { a: SK, t, dik: q.on('belast', 1, 2) * (0.5 + 0.5 * Math.sin(t * 0.8)), cellen: SK });
    naamBij(ctx, 'meer belast: steviger', '', 1460, 830, q.on('belast', 1) * (1 - q.on('film', 1)), 'center');
    tag(ctx, 'film: Hoe weefsel herstelt', 1460, 850, C.teal, q.on('film', 1) * (1 - q.on('leven', 2)), 'center', 28);
    rondPijl(ctx, 1460, 470, 230, q.on('leven', 2), t); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const X = 760, Y = 440, S = 0.92;
    const p = q.on('samengeknepen', 1, 1.2), eat = clamp((t - q.at('afbreken', 1) + 0.4) / 2.6, 0, 1), dep = clamp((t - q.at('neer', 1) + 0.5) / 2, 0, 1);
    const sh = 52 * clamp((t - q.at('schuift', 1)) / 4.5, 0, 1);
    const o = { t, beugel: 1, kracht: clamp(t / 0.8, 0, 1) * (0.75 + 0.25 * Math.sin(t * 3)), p, eat, clast: q.on('Daar', 1), kruimels: q.on('afbreken', 1), drukGloed: q.on('samengeknepen', 1) * (1 - q.on('Daar', 1) * 0.6),
      trekGloed: q.on('uitgerekt', 1) * (1 - q.on('Daar', 2) * 0.6), blast: q.on('Daar', 2, 1.2), dep, sh, oud: 0, oudA: q.on('schuift', 1) * 0.9 };
    tandBot(ctx, X, Y, S, o);
    const D = tbPunt(X, Y, S, o, 'drukkant'), T = tbPunt(X, Y, S, o, 'trekkant');
    naamBij(ctx, 'drukkant', t < q.at('afbreken', 1) ? 'samengeknepen' : 'bot wordt afgebroken', 1170, D.y - 60, q.on('drukkant', 1), 'left', C.koraal);
    naamBij(ctx, 'trekkant', t < q.at('neer', 1) ? 'vezels uitgerekt' : 'nieuw bot', 350, T.y - 60, q.on('trekkant', 1), 'right', C.goud);
    naamBij(ctx, 'botafbrekers', '', 1170, D.y + 40, q.on('afbreken', 1) * (1 - q.on('schuift', 1)), 'left', C.paars);
    naamBij(ctx, 'botopbouwers', '', 350, T.y + 40, q.on('neer', 1) * (1 - q.on('schuift', 1)), 'right', C.groen);
    naamBij(ctx, 'beugel', 'licht, hele dag', X - 330 * S, Y - 330 * S, q.on('beugel', 1) * (1 - q.on('kant', 1)), 'center');
    laag(ctx, q.on('millimeter', 1), () => { kalender(ctx, 1600, 260, 0.9, '1 mm', 'per maand'); });
    naamBij(ctx, 'hele tandbed schuift mee', '', 1170, D.y + 40, q.on('bed', 1) * (1 - q.on('millimeter', 1)), 'left'); },

  s08(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'noor', 520, 880, 520, { t, kijk: 1, uit: t < q.at('controle', 1) ? 'lacht' : 'praat', pose: q.on('harder', 1) > 0.5 ? 'wijsOmhoog' : 'staan', a: clamp(t / 0.3, 0, 1) });
    naamBij(ctx, 'Noor', 'wil haar beugel kwijt', 520, 270, clamp(t / 0.5, 0, 1) * (1 - q.on('Wouter', 1)), 'center');
    persoon(ctx, 'wouter', 1000, 880, 560, { t, kijk: -1, uit: q.on('harder', 1) > 0.5 ? 'denkt' : 'blij', a: q.on('controle', 1, 0.3) });
    naamBij(ctx, 'Tandarts Wouter', 'gewone controle', 1000, 250, q.on('Wouter', 1), 'center');
    krachtMeter(ctx, 1520, 520, 190, 0.3 + 0.62 * q.on('harder', 1, 1.2) + 0.02 * Math.sin(t * 9) * q.on('harder', 1), q.on('kan', 1));
    vraagteken(ctx, 1520, 240, q.on('denk', 1), 110); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const X = 700, Y = 450, S = 0.88;
    const licht = q.on('Licht', 1, 1), ruim = q.on('opgeruimd', 1, 2.5), verder = clamp((t - q.at('verder', 1)) / 3, 0, 1);
    tandBot(ctx, X, Y, S, { t, beugel: 1, kracht: 1, hard: 1 - licht, p: 1, eat: 0.25 + 0.75 * verder, clast: verder, dicht: q.on('bloed', 1, 1) * (1 - verder), grijs: q.on('sterft', 1, 1) * (1 - ruim),
      achter: q.on('opgeruimd', 1) * (1 - verder), sh: 30 * verder, cellen: 0.6, kruimels: verder });
    krachtMeter(ctx, 1560, 330, 160, 0.95 - 0.7 * licht + 0.02 * Math.sin(t * 9) * (1 - licht), 1);
    tekstVak(ctx, [['bloed', 1, 'vaatjes dichtgedrukt', C.koraal], ['sterft', 1, 'stukje weefsel sterft af', C.koraal], ['Pas', 1, 'tand staat stil', C.koraal], ['opgeruimd', 1, 'botafbrekers ruimen op', C.paars], ['verder', 1, 'pas dan weer verder', C.groen],
      ['Harder', 1, 'harder ≠ sneller', C.goud], ['Licht', 1, 'licht en lang', C.groen]], 1560, 640, t, q, 30);
    laag(ctx, q.on('Pas', 1) * (1 - q.on('verder', 1)), () => klokje(ctx, 1560, 760, 46, (t * 0.15) % 1, 1));
    naamBij(ctx, 'de orthodontist stelt de kracht in', '', 1560, 760, q.on('orthodontist', 1), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verbouwing', 1, 1), Cc = q.on('Daarom', 1, 1); const [A1, B1] = wisselA(B); const [, C1] = wisselA(Cc); const Bz = B1 * (1 - clamp(Cc * 2, 0, 1));
    laag(ctx, A1, () => { persoon(ctx, 'noor', 360, 880, 540, { t, kijk: 1, uit: 'lacht' });
      gebitVoor(ctx, 1200, 460, 0.82, { t, beugel: 1 - q.on('eraf', 1, 1), scheef: 0 });
      kalender(ctx, 1200, 800 - 2, 0.6, '2 jaar', '', q.on('twee', 1) * (1 - q.on('Klaar', 1)));
      tag(ctx, 'klaar?', 1200, 860, C.goud, q.on('Klaar', 1), 'center', 32); kruis(ctx, 1330, 845, 22, q.on('niet', 1)); });
    laag(ctx, Bz, () => { const X = 760, Y = 450, S = 0.88; const back = 14 * clamp((t - q.at('terug', 1)) / 2, 0, 1);
      tandBot(ctx, X, Y, S, { t, sh: 50 - back + 3 * Math.sin(t * 2) * q.on('terug', 1), blast: 1, dep: 1, clast: 0.6, eat: 0.5, cellen: 1, elast: q.on('vezels', 1), oud: 0, oudA: q.on('terug', 1) * 0.9 });
      naamBij(ctx, 'nog in verbouwing', '', 1180, 760, 1 - q.on('vezels', 1), 'left');
      naamBij(ctx, 'vezels in het tandvlees', 'gespannen', 340, 300, q.on('vezels', 1), 'right', C.koraal);
      naamBij(ctx, 'oude plek', '', X, Y - 330 * S, q.on('terug', 1), 'center', C.goud);
      if (q.on('terug', 1) > 0.01) pijl(ctx, X + 160, 230, X + 40, 230, C.koraal, q.on('terug', 1), 6, 20); });
    laag(ctx, C1, () => { const H = gebitBoven(ctx, 760, 470, 0.95, { t, draad: q.on('draadje', 1, 1.5), schuif: q.on('schuiven', 1) });
      naamBij(ctx, 'draadje aan de binnenkant', '', 1240, 400, q.on('binnenkant', 1), 'left', C.text);
      kalender(ctx, 1450, 650, 0.85, 'jaren', '', q.on('jaren', 1) * (1 - q.on('leven', 1) * 0)); naamBij(ctx, 'soms je hele leven', '', 1450, 820, q.on('leven', 1), 'center'); }); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Sk = q.on('schedels', 1, 0.8); const [A, B] = wisselA(Sk);
    laag(ctx, A, () => { [['sam', 560], ['noor', 800], ['bilal', 1040], ['yasmin', 1280]].forEach(([id, x], i) => persoon(ctx, id, x + 40, 880, 440, { t, kijk: i < 2 ? 1 : -1, uit: 'lacht', a: q.on('jongeren', 1, 0.3) }));
      vraagteken(ctx, 1560, 360, q.on('beugel', 1), 110); });
    laag(ctx, B, () => { schedelZij(ctx, 520, 410, 0.82, { t, k: 1, rij: q.on('recht', 1), hl: q.on('verstandskiezen', 1), hlKleur: C.groen });
      naamBij(ctx, 'jager-verzamelaar', 'ruime kaak', 520, 760, 1, 'center');
      laag(ctx, q.on('moderne', 1), () => { schedelZij(ctx, 1380, 410, 0.82, { t, k: 0, hl: q.on('klein', 1), hlKleur: C.koraal }); naamBij(ctx, 'nu', 'krappe kaak', 1380, 760, 1, 'center'); });
      naamBij(ctx, 'verstandskies past', '', 820, 300, q.on('verstandskiezen', 1) * (1 - q.on('moderne', 1)), 'left', C.groen);
      vraagteken(ctx, 960, 300, q.on('denk', 1), 110); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a', 1 - q.on('kaak', 1)); const E = q.on('Dit', 1, 1); const [A, B] = wisselA(E);
    laag(ctx, A, () => { const kw = q.on('kauwen', 1);
      schedelZij(ctx, 520, 420, 0.8, { t, k: 1, kauw: kw * (1 - q.on('zacht', 1)), rij: q.on('tanden', 1) });
      voedsel(ctx, 520, 820, 0.9, 'taai', q.on('kauwen', 1)); naamBij(ctx, 'veel en hard kauwen', 'kaak groeit sterker', 520, 110, q.on('sterker', 1), 'center');
      laag(ctx, q.on('zacht', 1), () => { schedelZij(ctx, 1380, 420, 0.8, { t, k: 0, kauw: 0.3, rij: q.on('tanden', 1), hl: q.on('minder', 1), hlKleur: C.koraal }); voedsel(ctx, 1380, 820, 0.9, 'zacht'); naamBij(ctx, 'zacht eten', 'kaak groeit minder', 1380, 110, q.on('minder', 1), 'center'); });
      naamBij(ctx, 'tanden: bijna even groot', '', 960, 520, q.on('tanden', 1) * (1 - q.on('minder', 1)), 'center', C.groen); });
    laag(ctx, B, () => { schedelZij(ctx, 1280, 430, 0.85, { t, k: 0, kauw: 0.3, hl: 1, hlKleur: C.koraal }); voedsel(ctx, 1280, 820, 0.9, 'zacht');
      tag(ctx, 'film: Selectie van dichtbij', 480, 300, C.teal, q.on('Selectie', 1), 'center', 30); kruis(ctx, 760, 280, 22, q.on('snel', 1));
      regel(ctx, 'te snel voor evolutie', 480, 380, q.on('snel', 1), C.text2, 30, 'center', 700);
      tag(ctx, 'vooral de omgeving', 480, 540, C.groen, q.on('omgeving', 1), 'center', 40);
      tag(ctx, 'erfelijkheid speelt mee', 480, 660, C.paars, q.on('erfelijkheid', 1), 'center', 30); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const X = 1180, Y = 450, S = 0.74;
    gebitVoor(ctx, X, Y, S, { t, beugel: 1 - q.on('eraf', 1, 0.8), scheef: 0, plak: q.on('plak', 1, 1.5) * (1 - q.on('Ilse', 1, 1.5) * 0.85), wit: q.on('witte', 1) * 0.9, rager_: q.on('Ilse', 1) * (1 - q.on('eraf', 1)) });
    naamBij(ctx, 'plak rond de blokjes', '', X, Y + 300, q.on('plak', 1) * (1 - q.on('Ilse', 1)), 'center', C.oker);
    tag(ctx, 'film: Zuur in je mond', X, Y + 340, C.teal, q.on('witte', 1), 'center', 28);
    kruis(ctx, X + 440, Y - 250, 26, q.on('witte', 1));
    persoon(ctx, 'ilse', 330, 880, 540, { t, kijk: 1, uit: 'blij', pose: 'vasthouden', hold: ragerHold, a: q.on('Daarom', 1, 0.3) });
    naamBij(ctx, 'Mondhygiënist Ilse', '', 330, 250, q.on('Ilse', 1), 'center'); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('draadje', 1, 1); const [A, B] = wisselA(D);
    persoon(ctx, 'noor', 230, 880, 520, { t, kijk: 1, uit: 'lacht' });
    laag(ctx, A, () => { const sh = 50 * clamp((t - q.at('hoektand', 1)) / 6, 0, 1); tandBot(ctx, 760, 470, 0.62, { t, sh, p: 1, eat: 1, clast: q.on('afbraken', 1), blast: q.on('opbouwden', 1), dep: q.on('opbouwden', 1), beugel: 1, kracht: q.on('duwtje', 1), oud: 0, oudA: q.on('schoof', 1) * 0.8 }); });
    laag(ctx, B, () => gebitBoven(ctx, 760, 470, 0.72, { t, draad: 1 }));
    recapKaart(ctx, 1210, 220, 620, 'wortelvlies: de tand hangt in vezels', C.teal, q.on('hoektand', 1));
    recapKaart(ctx, 1210, 350, 620, 'drukkant: bot afgebroken', C.koraal, q.on('afbraken', 1));
    recapKaart(ctx, 1210, 480, 620, 'trekkant: bot opgebouwd', C.goud, q.on('opbouwden', 1));
    recapKaart(ctx, 1210, 610, 620, 'licht en lang duwen', C.groen, q.on('duwtje', 1));
    recapKaart(ctx, 1210, 740, 620, 'draadje houdt alles op zijn plek', C.paars, q.on('draadje', 1)); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'wouter', 250, 880, 520, { t, kijk: 1, uit: 'blij', a: clamp(t / 0.3, 0, 1) }); naamBij(ctx, 'tandarts', '', 250, 260, q.on('tandarts', 1), 'center');
    const x0 = 560, u = 118, y0 = 300; const b1 = q.on('tandheelkunde', 1, 1), b2 = q.on('vier', 1, 1.2);
    laag(ctx, b1, () => { roundRect(ctx, x0, y0, 6 * u * b1, 70, 14); shape(ctx, rgba(C.teal, 0.3), C.teal, 2); regel(ctx, 'tandheelkunde · 6 jaar', x0 + 3 * u, y0 + 46, 1, C.text, 30, 'center', 700); });
    laag(ctx, b2, () => { roundRect(ctx, x0 + 6 * u + 12, y0, 4 * u * b2, 70, 14); shape(ctx, rgba(C.goud, 0.3), C.goud, 2); regel(ctx, '+ 4 jaar', x0 + 8 * u + 12, y0 + 46, 1, C.text, 30, 'center', 700);
      naamBij(ctx, 'orthodontist', 'stand van tanden en kaken', x0 + 8 * u + 12, y0 + 140, q.on('specialiseert', 1), 'center', C.goud); });
    const sp = q.on('specialismen', 1); laag(ctx, sp, () => { metaText(ctx, 'twee erkende specialismen', 960, 560, C.grain, 'left', 26); });
    laag(ctx, sp, () => { roundRect(ctx, 600, 600, 520, 230, 18); shape(ctx, rgba(C.goud, 0.14), C.goud, 2); gebitVoor(ctx, 760, 715, 0.22, { t, beugel: 1 }); regel(ctx, 'orthodontie', 1010, 728, 1, C.text, 34, 'center', 700); });
    laag(ctx, q.on('kaakchirurgie', 1), () => { roundRect(ctx, 1180, 600, 560, 230, 18); shape(ctx, rgba(C.teal, 0.14), C.teal, 2); schedelZij(ctx, 1310, 710, 0.28, { t, k: 0.6 }); regel(ctx, 'kaakchirurgie', 1580, 728, 1, C.text, 34, 'center', 700); }); }
});
