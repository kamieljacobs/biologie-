
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
// Wat word jij? · Verloskunde — gedeelde tekeningen voor de reeks (21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra, baby).
// Kleuren: vlees/baarmoeder VK.spier, vruchtwater VK.vocht, placenta VK.plac, bloed moeder VK.bloedM, bloed kind VK.bloedK.
const VK = { spier: '#C98A7A', spierD: '#A8685A', vocht: '#5BA4C9', plac: '#9E3B4A', placL: '#C2566A', bloedM: '#D8573F', bloedK: '#E8909A', huid: '#E8B9A0', huidD: '#D29C82',
  ecto: '#5BA4C9', meso: '#E07A5F', endo: '#E0B64A', dna: '#8C7BBF', melk: '#F4EEDC' };
function vkA(ctx, a) { ctx.save(); ctx.globalAlpha *= a; }

// ---------- ruimte ----------
// praktijkkamer: vloer, raam, poster met baarmoeder, plant. Personen staan op y = 880.
function praktijk(ctx, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a);
  ctx.fillStyle = rgba('#000000', 0.18); ctx.fillRect(0, 880, W, 200); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(W, 880); ctx.stroke();
  if (!o.zonderRaam) { const rx = o.raamX ?? 1520; roundRect(ctx, rx, 90, 280, 220, 10); shape(ctx, rgba(C.teal, 0.12), rgba(C.line, 0.6), 3); ctx.strokeStyle = rgba(C.line, 0.45); ctx.beginPath(); ctx.moveTo(rx + 140, 90); ctx.lineTo(rx + 140, 310); ctx.moveTo(rx, 200); ctx.lineTo(rx + 280, 200); ctx.stroke(); }
  if (!o.zonderPoster) { const px = o.posterX ?? 150; roundRect(ctx, px, 170, 220, 280, 8); shape(ctx, rgba(C.text, 0.06), rgba(C.line, 0.5), 2); baarmoeder(ctx, px + 110, 330, 0.32, { week: 20, a: 0.8, lijn: true }); }
  if (!o.zonderPlant) { const lx = o.plantX ?? 1830; ctx.fillStyle = '#6B4E3A'; roundRect(ctx, lx - 34, 800, 68, 80, 8); ctx.fill(); ctx.fillStyle = rgba(C.groen, 0.75); [[-30, 760, -0.6], [0, 740, 0], [30, 765, 0.6], [-14, 720, -0.25], [16, 718, 0.3]].forEach(([dx, yy, r]) => { ctx.beginPath(); ctx.ellipse(lx + dx, yy, 18, 54, r, 0, 6.283); ctx.fill(); }); }
  ctx.restore(); }

// huis (eerste lijn) en ziekenhuis (tweede lijn) als icoon
function huisje(ctx, x, y, s = 1, a = 1, col = C.groen) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-90, -60); ctx.lineTo(0, -140); ctx.lineTo(90, -60); ctx.lineTo(90, 60); ctx.lineTo(-90, 60); ctx.closePath(); shape(ctx, rgba(col, 0.18), col, 4);
  roundRect(ctx, -22, 0, 44, 60, 4); shape(ctx, rgba(col, 0.45), null); roundRect(ctx, 34, -30, 36, 36, 4); shape(ctx, rgba(C.goud, 0.5), null); ctx.restore(); }
function ziekenhuis(ctx, x, y, s = 1, a = 1, col = C.teal) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -120, -150, 240, 210, 8); shape(ctx, rgba(col, 0.16), col, 4); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) if (!(r === 2 && (k === 1 || k === 2))) { roundRect(ctx, -96 + k * 52, -126 + r * 52, 30, 30, 3); shape(ctx, rgba(C.goud, 0.35), null); }
  roundRect(ctx, -24, 4, 48, 56, 4); shape(ctx, rgba(col, 0.45), null); ctx.fillStyle = C.koraal; ctx.fillRect(-12, -205, 24, 66); ctx.fillRect(-33, -184, 66, 24); ctx.restore(); }

// ---------- baarmoeder, placenta, kind ----------
// baarmoeder in doorsnede (peervorm, hals onder); o.week bepaalt kind; o.placenta; o.hoofdOnder; o.lijn = alleen omlijning (poster)
function baarmoeder(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  const g = o.groei == null ? 1 : o.groei, R = 200 + 120 * g, H = 230 + 150 * g; const pad = (k) => { ctx.beginPath(); ctx.moveTo(-60 * k, H * 0.95); ctx.bezierCurveTo(-R * k * 1.05, H * 0.6, -R * k * 1.15, -H * 0.55, 0, -H * k); ctx.bezierCurveTo(R * k * 1.15, -H * 0.55, R * k * 1.05, H * 0.6, 60 * k, H * 0.95); ctx.closePath(); };
  if (o.lijn) { pad(1); ctx.strokeStyle = VK.spier; ctx.lineWidth = 10; ctx.stroke(); foetus(ctx, 0, 0, 0.9, { week: o.week || 20, lijn: true }); ctx.restore(); return; }
  pad(1); shape(ctx, VK.spier, null); pad(0.86); shape(ctx, rgba(VK.vocht, 0.28), rgba(VK.vocht, 0.6), 2);
  // hals
  roundRect(ctx, -46, H * 0.9, 92, 70 * (1 - (o.open || 0) * 0.6), 18); shape(ctx, VK.spierD, null); if ((o.open || 0) > 0.01) { roundRect(ctx, -46 * (o.open), H * 0.9, 92 * o.open, 80, 12); shape(ctx, rgba(C.bgSchema, 1), null); }
  if (o.placenta !== false) { const pa = o.placenta == null ? 1 : o.placenta; ctx.save(); ctx.globalAlpha *= pa; ctx.beginPath(); ctx.ellipse(R * 0.35, -H * 0.66, R * 0.42, 46, 0.45, 0, 6.283); shape(ctx, VK.plac, VK.placL, 3);
    ctx.fillStyle = rgba(VK.placL, 0.6); for (let i = 0; i < 9; i++) circ(ctx, R * 0.35 + (i - 4) * 18 * Math.cos(0.45), -H * 0.66 + (i - 4) * 18 * Math.sin(0.45) + (i % 2 ? 10 : -10), 7, rgba(VK.placL, 0.7)); ctx.restore(); }
  const fs = o.fs || (0.35 + 0.75 * g); const hoofdOnder = o.hoofdOnder ?? (g > 0.6);
  if (o.week !== 0) { const kind = foetus(ctx, o.fx || 0, (o.fy || 0) + (hoofdOnder ? 40 : 0), fs, { week: o.week || 30, rot: hoofdOnder ? Math.PI : 0, t: o.t });
    if (o.placenta !== false && kind) { ctx.strokeStyle = VK.bloedK; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(R * 0.25, -H * 0.6); ctx.bezierCurveTo(R * 0.55, -H * 0.2, -R * 0.1, -H * 0.25, kind.navel[0], kind.navel[1]); ctx.stroke();
      ctx.strokeStyle = rgba('#FFFFFF', 0.35); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.stroke(); ctx.setLineDash([]); } }
  ctx.restore(); }

// kind in de buik. week = weken zwangerschap (≤ 10: embryo, C-vorm met staartje; daarna opgerold kind). Geeft {navel:[x,y]} terug in het lokale stelsel.
function foetus(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return null; const wk = o.week || 30, t = o.t || 0;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const huid = VK.huid, D = VK.huidD;
  if (o.lijn) { ctx.strokeStyle = huid; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-10, -70, 62, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -20); ctx.bezierCurveTo(110, 20, 90, 140, 0, 150); ctx.bezierCurveTo(-70, 150, -90, 80, -40, 20); ctx.stroke(); ctx.restore(); return { navel: [x, y] }; }
  if (wk <= 10) { // embryo: kromme romp, groot hoofd, knopjes
    ctx.beginPath(); ctx.moveTo(-30, -110); ctx.bezierCurveTo(70, -150, 120, -40, 80, 40); ctx.bezierCurveTo(50, 110, -10, 120, -40, 90); ctx.quadraticCurveTo(-20, 70, 10, 80); ctx.bezierCurveTo(40, 40, 30, -30, -30, -40); ctx.closePath(); shape(ctx, huid, null);
    ctx.beginPath(); ctx.ellipse(-30, -70, 72, 62, -0.3, 0, 6.283); shape(ctx, huid, null); circ(ctx, -52, -76, 9, rgba('#3A2A30', 0.55));
    const kn = clamp((wk - 6) / 4, 0.2, 1); ctx.fillStyle = D; ctx.beginPath(); ctx.ellipse(40, -20, 14 * kn + 4, 26 * kn + 4, -0.6, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(66, 50, 14 * kn + 4, 26 * kn + 4, 0.4, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba(C.bloedK || VK.bloedK, 0.9); circ(ctx, 18, -2, 13, rgba(VK.bloedM, 0.85 + 0.15 * Math.sin(t * 9)));
    ctx.restore(); return { navel: [x + 20 * s, y + 30 * s] }; }
  // opgerold kind: rug rechts, hoofd boven, knieën naar de borst
  ctx.beginPath(); ctx.moveTo(-20, -40); ctx.bezierCurveTo(90, -50, 120, 70, 70, 140); ctx.bezierCurveTo(40, 180, -40, 185, -70, 150); ctx.bezierCurveTo(-95, 110, -80, 40, -60, 0); ctx.closePath(); shape(ctx, huid, null);
  ctx.fillStyle = D; ctx.beginPath(); ctx.ellipse(-30, 120, 60, 34, -0.5, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(10, 168, 42, 18, 0, 0, 6.283); ctx.fill();
  ctx.strokeStyle = D; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 10); ctx.quadraticCurveTo(-70, 50, -50, 80); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-20, -100, 80, 76, 0.15, 0, 6.283); shape(ctx, huid, null); ctx.strokeStyle = rgba('#3A2A30', 0.55); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-62, -100, 10, 0.2, 2.6); ctx.stroke();
  ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.beginPath(); ctx.ellipse(0, -130, 34, 18, -0.4, 0, 6.283); ctx.fill();
  ctx.restore(); const c = Math.cos(o.rot || 0), sn = Math.sin(o.rot || 0); return { navel: [x + (-50 * c - 60 * sn) * s, y + (-50 * sn + 60 * c) * s] }; }

// blaasje van cellen (blastocyste) dat zich innestelt; u 0..1 = ingegroeid
function blastocyste(ctx, x, y, r, a = 1, u = 0, t = 0) { if (a <= 0.01) return; vkA(ctx, a);
  const n = 18; for (let i = 0; i < n; i++) { const an = i / n * 6.283; circ(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, r * 0.2, rgba(C.paars, 0.75), C.paars, 1.5); }
  ctx.beginPath(); ctx.ellipse(x, y + r * 0.45, r * 0.45, r * 0.32, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.8), C.goud, 2); ctx.restore(); }

// kiemschijf met drie lagen; u 0..1 = lagen verschijnen na elkaar; uit = 0..1 pijlen naar organen
function kiemschijf(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; vkA(ctx, a); const h = 46;
  [[VK.ecto, 0], [VK.meso, 1], [VK.endo, 2]].forEach(([col, i]) => { const f = clamp(u * 3 - i, 0, 1); if (f <= 0.01) return; ctx.save(); ctx.globalAlpha *= f; ctx.beginPath(); ctx.ellipse(x, y + i * (h + 8), w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.55), col, 3); ctx.restore(); }); ctx.restore(); }

// neurale buis in doorsnede: u 0 = vlakke plaat, 1 = gesloten buis onder de huid (plaat met vaste lengte buigt tot een cirkel)
function neuraleBuis(ctx, x, y, s = 1, a = 1, u = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const R0 = 80, L = 2 * Math.PI * R0, f = clamp(u, 0.02, 1), r = L / (2 * Math.PI * f), cy = 40 - r, sp = Math.PI * f;
  const lx = Math.cos(Math.PI / 2 + sp) * r, ly = cy + Math.sin(Math.PI / 2 + sp) * r, rx = -lx;
  ctx.lineCap = 'round'; ctx.strokeStyle = rgba(VK.ecto, 0.45); ctx.lineWidth = 24; ctx.beginPath();
  if (u < 0.97) { ctx.moveTo(-340, 40); ctx.lineTo(lx - 20, ly); ctx.moveTo(340, 40); ctx.lineTo(rx + 20, ly); } else { const yy = 40 - 2 * R0 - 40; ctx.moveTo(-340, 40); ctx.quadraticCurveTo(-160, yy, 0, yy); ctx.quadraticCurveTo(160, yy, 340, 40); }
  ctx.stroke(); ctx.strokeStyle = VK.ecto; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, cy, r, Math.PI / 2 - sp, Math.PI / 2 + sp); ctx.stroke(); ctx.restore(); }

// tijdlijn in weken (0..40). marks = [[week, label, col, alpha], …]; nu = week van de wijzer
function tijdlijn(ctx, x, y, w, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const max = o.max || 40, X = (wk) => x + w * wk / max;
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let k = 0; k <= max; k += (o.stap || 4)) { ctx.beginPath(); ctx.moveTo(X(k), y - 10); ctx.lineTo(X(k), y + 10); ctx.stroke(); metaText(ctx, String(k), X(k), y + 46, C.text2, 'center', 22); }
  if (o.titel) metaText(ctx, o.titel, x, y + 90, C.grain, 'left', 22);
  (o.marks || []).forEach(([wk, lab, col, al = 1, hoog = 0]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, X(wk), y, 14, col, null); text(ctx, lab, X(wk), y - 34 - hoog, fTekst(28, 700), col, 'center'); ctx.restore(); });
  (o.banden || []).forEach(([w0, w1, col, al = 1, lab]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; roundRect(ctx, X(w0), y - 12, X(w1) - X(w0), 24, 12); shape(ctx, rgba(col, 0.55), col, 2); if (lab) text(ctx, lab, (X(w0) + X(w1)) / 2, y + 135, fTekst(28, 700), col, 'center'); ctx.restore(); });
  ctx.restore(); }

// longblaasje met haarvaten. open 0..1; surf 0..1 = laagje surfactant (goud)
function longblaasje(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const op = o.open == null ? 1 : o.open, rr = r * (0.35 + 0.65 * op);
  ctx.strokeStyle = rgba(VK.bloedM, 0.6); ctx.lineWidth = 7; for (let i = 0; i < 6; i++) { const an = i * 1.05 + 0.3; ctx.beginPath(); ctx.arc(x, y, rr + 12, an, an + 0.7); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x, y, rr, rr * (0.55 + 0.45 * op), 0, 0, 6.283); shape(ctx, rgba(C.teal, 0.18), '#E8B9C0', 5);
  if ((o.surf || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.surf; ctx.beginPath(); ctx.ellipse(x, y, rr - 7, rr * (0.55 + 0.45 * op) - 7, 0, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.setLineDash([10, 7]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  if ((o.water || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.water; ctx.beginPath(); ctx.ellipse(x, y, rr - 7, rr * (0.55 + 0.45 * op) - 7, 0, 0, 6.283); ctx.strokeStyle = rgba(VK.vocht, 0.9); ctx.lineWidth = 8; ctx.stroke();
    for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283; pijl(ctx, x + Math.cos(an) * (rr + 30), y + Math.sin(an) * (rr + 30) * (0.55 + 0.45 * op), x + Math.cos(an) * (rr - 26), y + Math.sin(an) * (rr - 26) * (0.55 + 0.45 * op), C.koraal, 0.8, 4, 12); } ctx.restore(); }
  ctx.restore(); }

// injectiespuit; vol 0..1
function spuit(ctx, x, y, s = 1, a = 1, rot = -0.6, vol = 1) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -120, -22, 200, 44, 8); shape(ctx, rgba('#FFFFFF', 0.25), '#DCE3EA', 3); roundRect(ctx, -116 + 196 * (1 - vol), -18, 196 * vol, 36, 6); shape(ctx, rgba(C.goud, 0.6), null);
  ctx.fillStyle = '#DCE3EA'; ctx.fillRect(-160, -6, 44, 12); ctx.fillRect(-170, -30, 12, 60); ctx.strokeStyle = '#DCE3EA'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(80, 0); ctx.lineTo(170, 0); ctx.stroke(); ctx.restore(); }

// ---------- meten ----------
function bloeddrukMeter(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -110, 260, 220, 22); shape(ctx, '#E8ECF0', '#B8C2CC', 3); roundRect(ctx, -100, -80, 200, 120, 10); shape(ctx, '#1C2A24', null);
  const k = clamp(o.u == null ? 1 : o.u, 0, 1), bo = Math.round((o.boven || 120) * k), on = Math.round((o.onder || 80) * k), kl = o.kleur || '#9FE0A8';
  text(ctx, String(bo), 60, -24, fTekst(52, 800), kl, 'right'); text(ctx, String(on), 60, 30, fTekst(40, 800), kl, 'right'); metaText(ctx, 'MMHG', -86, 30, rgba(kl, 0.7), 'left', 16);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 110); ctx.bezierCurveTo(0, 170, -120, 160, -150, 200); ctx.stroke(); ctx.restore(); }
// manchet om een arm (op hand-anker): band
function manchet(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - 34 * s, y - 50 * s, 68 * s, 100 * s, 12 * s); shape(ctx, '#3E5A7A', '#2E4560', 2); ctx.restore(); }
// doptone: kastje met hartslag en golfjes
function doptone(ctx, x, y, s = 1, a = 1, bpm = 140, t = 0, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -110, -80, 220, 160, 20); shape(ctx, '#E8ECF0', '#B8C2CC', 3); roundRect(ctx, -84, -56, 168, 80, 8); shape(ctx, '#1C2A24', null);
  text(ctx, String(Math.round(bpm)), 0, 2, fTekst(48, 800), '#9FE0A8', 'center'); const slag = (t * bpm / 60) % 1; circ(ctx, 60, -34, 8, rgba(C.koraal, 1 - slag));
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 80); ctx.bezierCurveTo(0, 140, 90, 140, 120, 190); ctx.stroke(); roundRect(ctx, 100, 180, 60, 80, 20); shape(ctx, '#C8D0D8', null);
  if (o.golf) { ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { const f = ((t * 1.5 + i / 3) % 1); ctx.globalAlpha = (1 - f) * 0.8; ctx.beginPath(); ctx.arc(130, 270, 20 + f * 70, 0.6, 2.5); ctx.stroke(); } }
  ctx.restore(); }
// urinestrip: vakjes, eiwitvakje kleurt (eiwit 0..1)
function urineStrip(ctx, x, y, s = 1, a = 1, eiwit = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -30, -200, 60, 400, 8); shape(ctx, '#F2F2EE', '#C8D0D8', 2); ['#E8D86A', '#9FD0A8', null, '#E0A0B0'].forEach((c, i) => { roundRect(ctx, -20, -180 + i * 60, 40, 40, 4); shape(ctx, c || _mixHex('#E8E070', '#3E8E7E', eiwit), null); });
  metaText(ctx, 'EIWIT', 40, -180 + 2 * 60 + 28, C.grain, 'left', 22); ctx.restore(); }

// stukje baarmoederwand met een spiraalslagader; wijd 0..1 (omgebouwd); stroom = bloeddeeltjes
function spiraalSlagader(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const wd = o.wijd || 0, t = o.t || 0;
  roundRect(ctx, -260, -260, 520, 520, 30); shape(ctx, rgba(VK.spier, 0.35), rgba(VK.spier, 0.8), 2); metaText(ctx, o.label || 'BAARMOEDERWAND', -240, -280, C.grain, 'left', 22); roundRect(ctx, -260, -260, 520, 520, 30); ctx.clip();
  const pts = []; for (let k = 0; k <= 60; k++) { const u = k / 60; pts.push([Math.sin(u * 14) * 60 * (1 - wd * 0.85), 260 - u * 560]); }
  const breed = 22 + wd * 70; ctx.strokeStyle = VK.bloedM; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = breed + 14; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.strokeStyle = rgba('#7A2A2A', 0.9); ctx.stroke();
  ctx.lineWidth = breed; ctx.strokeStyle = rgba(VK.bloedM, 0.85); ctx.stroke();
  const n = Math.round(6 + 20 * wd), sp = 0.15 + 0.35 * wd; for (let i = 0; i < n; i++) { const u = ((t * sp + i / n) % 1), p = pts[Math.min(60, Math.floor(u * 60))]; circ(ctx, p[0] + (i % 3 - 1) * breed * 0.2, p[1], 6, '#F2B0A0'); }
  if ((o.trofo || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.trofo; for (let k = 4; k < 58; k += 5) { const p = pts[k], d = (k % 10 < 5 ? 1 : -1); circ(ctx, p[0] + d * (breed / 2 + 12), p[1], 11, rgba(C.paars, 0.85), C.paars, 1.5); } ctx.restore(); }
  ctx.restore(); }

// nierfilter (kluwen van haarvaten → kapsel): kleine stofjes gaan door, eiwitketens alleen als lek > 0
function nierFilter(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const lek = o.lek || 0, t = o.t || 0;
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 180, 0, 0, 6.283); shape(ctx, rgba(C.goud, 0.08), C.goud, 3); metaText(ctx, 'NIERFILTER', -220, -200, C.grain, 'left', 22);
  ctx.strokeStyle = rgba(VK.bloedM, 0.85); ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-320, -60); ctx.lineTo(-150, -40); for (let k = 0; k <= 90; k++) { const u = k / 90, an = u * 6.283 * 3; ctx.lineTo(-20 + Math.cos(an) * (60 + 50 * Math.sin(u * 9)) + u * 40, -10 + Math.sin(an) * (70 + 30 * Math.cos(u * 7))); } ctx.lineTo(150, -40); ctx.lineTo(320, -60); ctx.stroke();
  for (let i = 0; i < 10; i++) { const f = (t * 0.4 + i / 10) % 1; circ(ctx, -150 + i * 30, 120 + f * 90, 6, rgba(C.teal, 0.9 * (1 - f))); }
  if (lek > 0.01) { ctx.save(); ctx.globalAlpha *= lek; for (let i = 0; i < 4; i++) { const f = (t * 0.25 + i / 4) % 1; const px = -120 + i * 70, py = 100 + f * 120; ctx.strokeStyle = C.paars; ctx.lineWidth = 7; ctx.beginPath(); for (let k = 0; k < 6; k++) ctx.lineTo(px + Math.cos(k * 1.7) * 14, py + k * 6); ctx.stroke(); } ctx.restore(); }
  ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-40, 180); ctx.lineTo(-40, 260); ctx.moveTo(40, 180); ctx.lineTo(40, 260); ctx.stroke(); metaText(ctx, 'URINE', 60, 250, C.goud, 'left', 22);
  ctx.restore(); }

// ---------- screening ----------
// raster van n stipjes (per rij), k gemarkeerd met kleur col; echt = aantal van de gemarkeerde dat goud (echt) is
function stipRaster(ctx, x, y, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const n = o.n || 10000, per = o.per || 125, d = o.d || 7, r = o.r || 2.4;
  ctx.fillStyle = rgba(C.line, 0.45); for (let i = 0; i < n; i++) ctx.fillRect(x + (i % per) * d, y + Math.floor(i / per) * d, r, r);
  (o.hl || []).forEach(([idx, col, rad, al = 1]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; circ(ctx, x + (idx % per) * d + 1, y + Math.floor(idx / per) * d + 1, rad, col, null); ctx.restore(); });
  ctx.restore(); }
// chromosoom als staafje met insnoering; dubbel = X-vorm (twee chromatiden)
function chromosoom(ctx, x, y, h, col, a = 1, rot = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot);
  for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.18); roundRect(ctx, -9, -h / 2, 18, h, 9); shape(ctx, col, null); ctx.restore(); } circ(ctx, 0, -h * 0.12, 9, _mixHex(col.startsWith('#') ? col : '#888888', '#000000', 0.3)); ctx.restore(); }
// DNA-snippertje (kort stukje dubbele helix)
function dnaSnipper(ctx, x, y, s = 1, col = VK.dna, a = 1, rot = 0) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineWidth = 4; ctx.strokeStyle = col;
  for (const f of [0, Math.PI]) { ctx.beginPath(); for (let k = 0; k <= 20; k++) ctx.lineTo(-40 + k * 4, Math.sin(k * 0.6 + f) * 10); ctx.stroke(); } ctx.strokeStyle = rgba(col, 0.5); ctx.lineWidth = 2; for (let k = 1; k < 20; k += 3) { ctx.beginPath(); ctx.moveTo(-40 + k * 4, Math.sin(k * 0.6) * 10); ctx.lineTo(-40 + k * 4, Math.sin(k * 0.6 + Math.PI) * 10); ctx.stroke(); } ctx.restore(); }
// echoscherm: waaiervormig beeld; fn(ctx) tekent de inhoud (in het midden van de waaier)
function echoScherm(ctx, x, y, w, a = 1, fn = null) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - w / 2 - 30, y - 30, w + 60, w * 0.75 + 60, 16); shape(ctx, '#0A0E14', '#3A4458', 3);
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, w * 0.72, Math.PI * 0.27, Math.PI * 0.73); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#20242A'; ctx.fillRect(x - w, y, w * 2, w);
  if (fn) { ctx.save(); ctx.translate(x, y + w * 0.42); fn(ctx); ctx.restore(); } ctx.restore(); ctx.restore(); }
// naald (rechte lijn met punt), van (x1,y1) naar (x2,y2), u 0..1 = hoe ver ingeschoven
function naald(ctx, x1, y1, x2, y2, a = 1, u = 1) { if (a <= 0.01) return; vkA(ctx, a); const ex = x1 + (x2 - x1) * u, ey = y1 + (y2 - y1) * u; ctx.strokeStyle = '#DCE3EA'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke(); roundRect(ctx, x1 - 18, y1 - 18, 36, 36, 6); shape(ctx, '#B8C2CC', null); ctx.restore(); }

// ---------- bevalling ----------
// bekken van boven (ingang) of van onder (uitgang): ovaal dat breed is van links-rechts (ingang) of voor-achter (uitgang); hoofd = ovaal met rot
function bekkenRing(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const ing = o.ingang !== false;
  ctx.beginPath(); ctx.ellipse(0, 0, 230, 200, 0, 0, 6.283); ctx.ellipse(0, 0, ing ? 150 : 110, ing ? 110 : 150, 0, 0, 6.283, true); shape(ctx, '#D8CDB8', null); ctx.strokeStyle = '#B8AA90'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, ing ? 150 : 110, ing ? 110 : 150, 0, 0, 6.283); ctx.stroke();
  if (o.hoofd != null) { ctx.save(); ctx.rotate(o.hoofd); ctx.beginPath(); ctx.ellipse(0, 0, 128, 96, 0, 0, 6.283); shape(ctx, rgba(VK.huid, 0.9), VK.huidD, 3); ctx.strokeStyle = rgba(VK.huidD, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-100, 0); ctx.lineTo(100, 0); ctx.stroke(); ctx.restore(); }
  metaText(ctx, o.label || (ing ? 'INGANG · VAN BOVEN' : 'UITGANG · VAN ONDER'), 0, 250, C.grain, 'center', 22); ctx.restore(); }

// hart in schema (kind): RB/LB boven, RK/LK onder; longslagader (blauw) uit RK naar de longen, aorta (rood) uit LK naar het lichaam.
// ovale 0 open, 1 dicht (gang tussen de boezems, achter de slagaders); ductus 0 open, 1 dicht (verbinding longslagader → aorta); long 0..1 = doorbloeding longen
// Geeft ankers terug (ovale, ductus, longen, aorta) in schermcoördinaten.
function hartSchema(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return {}; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const ov = o.ovale || 0, du = o.ductus || 0, lg = o.long == null ? 0.2 : o.long, t = o.t || 0;
  const blauw = '#6A8FC8', rood = VK.bloedM, mix = '#B07AA8';
  // longen
  for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 330, -360, 140, 95, d * 0.15, 0, 6.283); shape(ctx, rgba('#E8B9C0', 0.12 + 0.5 * lg), rgba('#E8B9C0', 0.4 + 0.6 * lg), 3);
    if (lg < 0.5) { ctx.strokeStyle = rgba(VK.vocht, 0.6 * (1 - lg * 2)); ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(d * 330, -360, 100 - k * 30, 60 - k * 18, 0, 0, 6.283); ctx.stroke(); } } }
  // foramen ovale: gang tussen de boezems (achter)
  if (ov < 0.99) { ctx.strokeStyle = rgba(mix, 0.9 * (1 - ov)); ctx.lineWidth = 34 * (1 - ov * 0.8); ctx.beginPath(); ctx.moveTo(-110, -40); ctx.lineTo(110, -40); ctx.stroke(); }
  const kamer = (cx, cy, w, h, col, lab) => { roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 40); shape(ctx, rgba(col, 0.35), col, 4); text(ctx, lab, cx, cy + 12, fTekst(30, 800), C.text, 'center'); };
  kamer(-205, -40, 190, 150, blauw, 'RB'); kamer(205, -40, 190, 150, rood, 'LB'); kamer(-110, 160, 210, 200, blauw, 'RK'); kamer(110, 160, 210, 200, rood, 'LK');
  // klepje van het foramen ovale in de wand van de linkerboezem
  ctx.strokeStyle = C.goud; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(110, -80); ctx.lineTo(110 + 30 * (1 - ov), -20 + 20 * ov); ctx.stroke();
  // slagaders
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 36; ctx.strokeStyle = blauw; ctx.beginPath(); ctx.moveTo(-50, 70); ctx.lineTo(-50, -230); ctx.quadraticCurveTo(-50, -280, -200, -330); ctx.moveTo(-50, -250); ctx.quadraticCurveTo(-30, -300, 200, -340); ctx.stroke();
  ctx.strokeStyle = rood; ctx.beginPath(); ctx.moveTo(50, 70); ctx.lineTo(50, -170); ctx.bezierCurveTo(50, -270, 330, -280, 380, -100); ctx.lineTo(390, 120); ctx.stroke(); metaText(ctx, 'NAAR HET LICHAAM', 410, 160, C.grain, 'left', 20);
  // ductus Botalli
  const dw = 26 * (1 - du); ctx.strokeStyle = mix; if (dw > 2) { ctx.lineWidth = dw; ctx.beginPath(); ctx.moveTo(-50, -170); ctx.quadraticCurveTo(10, -150, 70, -205); ctx.stroke(); } else { ctx.lineWidth = 5; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(-50, -170); ctx.quadraticCurveTo(10, -150, 70, -205); ctx.stroke(); ctx.setLineDash([]); }
  // bloeddeeltjes
  for (let i = 0; i < 6; i++) { const f = (t * 0.5 + i / 6) % 1;
    if (ov < 0.9) circ(ctx, -110 + 220 * f, -40, 9, rgba('#F2D0E0', 1 - ov));
    if (du < 0.9) circ(ctx, -50 + 120 * f, -170 + 10 * Math.sin(f * 3.14) - 35 * f * f, 8, rgba('#F2D0E0', 1 - du));
    const fl = lg; if (fl > 0.05) { circ(ctx, -50 - 150 * f, -250 - 80 * f, 7, rgba('#DDE6F4', fl)); circ(ctx, -50 + 250 * f, -250 - 90 * f, 7, rgba('#DDE6F4', fl)); } }
  ctx.restore();
  const P = (px, py) => [x + px * s, y + py * s]; return { ovale: P(0, -40), ductus: P(10, -165), longL: P(-330, -360), longR: P(330, -360), aorta: P(380, -60) }; }

// Apgar-kaart: vijf rijen met score 0..2; u 0..1 = rijen vullen
function apgar(ctx, x, y, a = 1, scores = [2, 2, 2, 1, 2], u = 1) { if (a <= 0.01) return; vkA(ctx, a); const R = ['hartslag', 'ademhaling', 'spierspanning', 'reactie', 'kleur']; roundRect(ctx, x, y, 520, 410, 16); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); metaText(ctx, 'APGAR-SCORE', x + 30, y + 52, C.grain, 'left', 24);
  let som = 0; R.forEach((r, i) => { const f = clamp(u * 5 - i, 0, 1); text(ctx, r, x + 30, y + 112 + i * 58, fTekst(30, 600), C.text, 'left'); for (let k = 0; k <= 2; k++) { const on = f > 0.5 && scores[i] === k; circ(ctx, x + 340 + k * 60, y + 102 + i * 58, 20, on ? C.groen : rgba(C.line, 0.25), null); text(ctx, String(k), x + 340 + k * 60, y + 112 + i * 58, fTekst(24, 800), on ? C.bgSchema : C.text2, 'center'); } if (f > 0.5) som += scores[i]; });
  if (u > 0.99) text(ctx, 'samen: ' + som, x + 490, y + 52, fTekst(32, 800), C.groen, 'right'); ctx.restore(); }

// maatbeker met bloed; ml 0..1200
function maatbeker(ctx, x, y, s = 1, a = 1, ml = 300, grens = true) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const H = 360, k = clamp(ml / 1200, 0, 1);
  roundRect(ctx, -90, -H, 180, H, 14); shape(ctx, rgba('#FFFFFF', 0.06), '#C8D0D8', 3); roundRect(ctx, -84, -H * k, 168, H * k - 6, 10); shape(ctx, rgba(VK.bloedM, 0.85), null);
  for (let m = 200; m <= 1200; m += 200) { const yy = -H * m / 1200; ctx.strokeStyle = '#C8D0D8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-90, yy); ctx.lineTo(-60, yy); ctx.stroke(); metaText(ctx, String(m), -100, yy + 8, C.text2, 'right', 18); }
  if (grens) { const yy = -H * 1000 / 1200; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(-120, yy); ctx.lineTo(120, yy); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, '1 LITER', 130, yy + 8, C.koraal, 'left', 20); }
  metaText(ctx, 'ML', 0, 40, C.grain, 'center', 20); ctx.restore(); }

// ---------- kraamweek ----------
// borst in doorsnede: blaasjes met spiercellen, melkgangen naar tepel (rechts). melk 0..1 vulling, knijp 0..1
function borstDoorsnede(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const melk = o.melk || 0, kn = o.knijp || 0, t = o.t || 0;
  ctx.beginPath(); ctx.moveTo(-260, -300); ctx.bezierCurveTo(120, -300, 300, -120, 300, 0); ctx.bezierCurveTo(300, 120, 120, 300, -260, 300); ctx.closePath(); shape(ctx, rgba(VK.huid, 0.25), VK.huid, 4);
  circ(ctx, 318, 0, 24, VK.huidD, null);
  const kw = [[-120, -170], [-160, 0], [-120, 170], [40, -150], [20, 0], [40, 150]];
  kw.forEach(([bx, by], i) => { ctx.strokeStyle = rgba(VK.melk, 0.7); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(bx + 40, by); ctx.quadraticCurveTo((bx + 300) / 2, by * 0.5, 300, 0); ctx.stroke();
    for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 + i; const r = 28 * (1 - 0.25 * kn * (0.5 + 0.5 * Math.sin(t * 6))); const cx = bx + Math.cos(an) * 34, cy = by + Math.sin(an) * 34; circ(ctx, cx, cy, r, rgba(VK.melk, 0.2 + 0.7 * melk), rgba(C.koraal, 0.4 + 0.6 * kn), 3); } });
  if (kn > 0.05 && melk > 0.1) for (let i = 0; i < 4; i++) { const f = (t * 0.8 + i / 4) % 1; circ(ctx, 330 + f * 90, (i - 1.5) * 10 * f, 7 * (1 - f * 0.4), rgba(VK.melk, kn * (1 - f))); }
  ctx.restore(); }
// gehoortest: oor in doorsnede met dopje, gehoorgang, slakkenhuis; tik = golfjes in, echo = kleine golfjes terug
function oorTest(ctx, x, y, s = 1, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s); const t = o.t || 0, echo = o.echo || 0;
  ctx.fillStyle = rgba(VK.huid, 0.3); ctx.beginPath(); ctx.ellipse(-330, 0, 70, 150, 0, 0, 6.283); ctx.fill(); roundRect(ctx, -300, -40, 330, 80, 40); shape(ctx, rgba(VK.huid, 0.18), VK.huid, 3);
  roundRect(ctx, -420, -36, 140, 72, 20); shape(ctx, '#E8ECF0', '#B8C2CC', 3); metaText(ctx, 'DOPJE', -350, -60, C.grain, 'center', 20);
  ctx.strokeStyle = '#E8D8C0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(30, -60); ctx.lineTo(30, 60); ctx.stroke(); metaText(ctx, 'TROMMELVLIES', 30, 90, C.grain, 'center', 16);
  ctx.strokeStyle = '#D8CDB8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(34, 0); ctx.lineTo(70, -18); ctx.lineTo(100, 4); ctx.lineTo(124, 0); ctx.stroke(); metaText(ctx, 'GEHOORBEENTJES', 80, -50, C.grain, 'center', 16);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k < 120; k++) { const an = k * 0.1, r = 110 - k * 0.8; ctx.lineTo(230 + Math.cos(an) * r, Math.sin(an) * r); } ctx.stroke(); metaText(ctx, 'SLAKKENHUIS', 230, 160, C.grain, 'center', 20);
  for (let i = 0; i < 3; i++) { const f = (t * 1.2 + i / 3) % 1; ctx.strokeStyle = rgba(C.teal, 0.9 * (1 - f)); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-280 + f * 300, 0, 30, -0.9, 0.9); ctx.stroke(); }
  if (echo > 0.01) for (let i = 0; i < 3; i++) { const f = (t * 1.2 + i / 3 + 0.5) % 1; ctx.strokeStyle = rgba(C.goud, echo * 0.9 * (1 - f)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(120 - f * 400, 0, 22, Math.PI - 0.9, Math.PI + 0.9); ctx.stroke(); }
  ctx.restore(); }
// weegschaal met display (gram)
function weegschaal(ctx, x, y, s = 1, a = 1, gram = 3400) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, -30); ctx.quadraticCurveTo(0, 60, 220, -30); ctx.lineTo(200, 0); ctx.lineTo(-200, 0); ctx.closePath(); shape(ctx, '#E8ECF0', '#B8C2CC', 3);
  roundRect(ctx, -180, 0, 360, 110, 16); shape(ctx, '#D8DEE4', '#B8C2CC', 3); roundRect(ctx, -100, 24, 200, 62, 8); shape(ctx, '#1C2A24', null); text(ctx, Math.round(gram) + ' g', 80, 70, fTekst(40, 800), '#9FE0A8', 'right'); ctx.restore(); }
// hormoonverloop rond de geboorte: lijnen voor progesteron/oestrogeen (dalen) en prolactine (blijft); u = tekenvoortgang
function hormoonGrafiek(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const u = o.u == null ? 1 : o.u; assen(ctx, x, y, w, h, o.xl || 'TIJD', o.yl || 'HOEVEELHEID IN HET BLOED');
  const gx = x + w * 0.45; ctx.strokeStyle = rgba(C.line, 0.5); ctx.setLineDash([8, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'GEBOORTE', gx, y + h + 34, C.grain, 'center', 20);
  (o.lijnen || []).forEach(([naam, col, f, al = 1]) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); const N = 80; for (let k = 0; k <= N * u; k++) { const xx = k / N; ctx.lineTo(x + xx * w, y + h - h * f(xx)); } ctx.stroke(); const xe = Math.min(u, 1); text(ctx, naam, x + w * xe + 14, y + h - h * f(xe) + 10, fTekst(28, 700), col, 'left'); ctx.restore(); });
  ctx.restore(); }

// kaartje met titel en regels
function vkKaart(ctx, x, y, w, h, titel, regels = [], col = C.goud, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.1), col, 2.5); text(ctx, titel, x + 28, y + 54, fTekst(34, 800), col, 'left');
  regels.forEach((r, i) => text(ctx, r, x + 28, y + 106 + i * 44, fTekst(28, 600), C.text, 'left')); ctx.restore(); }
// tekstlabel met antwoord
function vkAntwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// eenvoudige overgang: a voor het oude beeld = 1 - B
function uitIn(q, w, n = 1, d = 0.8) { return q.on(w, n, d); }
// Verloskunde 1 · Negen maanden bouwen — eigen tekeningen (21 okt 2026)
// potje (supplement) met etiket
function potje(ctx, x, y, s = 1, a = 1, lab = 'foliumzuur', col = C.goud) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -50, -120, 100, 120, 16); shape(ctx, rgba('#FFFFFF', 0.85), '#C8D0D8', 2); roundRect(ctx, -56, -146, 112, 34, 8); shape(ctx, col, null);
  roundRect(ctx, -44, -92, 88, 56, 6); shape(ctx, rgba(col, 0.25), null); text(ctx, lab, 0, -58, fTekst(17, 800), '#2A3446', 'center'); ctx.restore(); }
// strip pillen met naam
function pillen(ctx, x, y, s = 1, a = 1, lab = 'ibuprofen', col = C.koraal) { if (a <= 0.01) return; vkA(ctx, a); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -130, -70, 260, 140, 14); shape(ctx, '#DCE3EA', '#B8C2CC', 2); for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(-90 + k * 60, -28 + r * 56, 22, 16, 0, 0, 6.283); shape(ctx, rgba(col, 0.75), col, 2); }
  text(ctx, lab, 0, 110, fTekst(32, 800), col, 'center'); ctx.restore(); }
// virusje met uitsteeksels
function virusje(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; vkA(ctx, a); ctx.strokeStyle = col; ctx.lineWidth = 4; for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r * 1.4, y + Math.sin(an) * r * 1.4); ctx.stroke(); circ(ctx, x + Math.cos(an) * r * 1.45, y + Math.sin(an) * r * 1.45, r * 0.12, col); }
  circ(ctx, x, y, r, rgba(col, 0.35), col, 3); ctx.restore(); }
// klein molecuul: alcohol (C-C-O) of zuurstof (O=O)
function molecuultje(ctx, x, y, s = 1, soort = 'alcohol', a = 1) { if (a <= 0.01) return; vkA(ctx, a); const at = (el, dx, dy) => circ(ctx, x + dx * s, y + dy * s, (el === 'H' ? 8 : 13) * s, el === 'C' ? '#5A6170' : el === 'O' ? '#D8573F' : '#E8E8E2', null);
  if (soort === 'alcohol') { at('C', -22, 0); at('C', 4, -8); at('O', 30, 2); at('H', 44, -10); at('H', -34, 14); at('H', -30, -16); } else { at('O', -12, 0); at('O', 12, 0); } ctx.restore(); }
// cellenhoopje (embryo in de eerste dagen); ziek = indexen die koraal kleuren; uit = 0..1 (verdwijnen)
function cellenHoop(ctx, x, y, r, a = 1, o = {}) { if (a <= 0.01) return; vkA(ctx, a); const n = 19, pos = [[0, 0]]; for (let k = 0; k < 6; k++) pos.push([Math.cos(k * 1.047), Math.sin(k * 1.047)]); for (let k = 0; k < 12; k++) pos.push([Math.cos(k * 0.5236 + 0.26) * 1.9, Math.sin(k * 0.5236 + 0.26) * 1.9]);
  pos.forEach(([px, py], i) => { const ziek = (o.ziek || []).includes(i); const col = ziek ? C.koraal : C.paars; circ(ctx, x + px * r, y + py * r, r * 0.48, rgba(col, ziek ? 0.8 * (1 - (o.herstel || 0)) + 0.2 : 0.7), ziek && (o.herstel || 0) > 0.5 ? C.paars : col, 2); }); ctx.restore(); }
// Wat word jij? · Verloskunde 1 · Negen maanden bouwen — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Verloskundige Mirjam, Esra 7 weken zwanger).
// Rode draad: de intake van Esra, en het kind dat intussen groeit.

// tafeltje tussen de twee personen
function tafel(ctx, x, a = 1) { if (a <= 0.01) return; vkA(ctx, a); roundRect(ctx, x - 140, 640, 280, 22, 6); shape(ctx, '#6B4E3A', null); ctx.fillStyle = '#5A4030'; ctx.fillRect(x - 120, 662, 14, 218); ctx.fillRect(x + 106, 662, 14, 218); ctx.restore(); }
// spreekkamer met Mirjam links en Esra rechts
function intake(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  praktijk(ctx, 1, o.kamer || {}); if (o.tafel !== false) tafel(ctx, 960);
  persoon(ctx, 'mirjam', o.mx || 700, 880, 470, { t, kijk: 1, uit: o.uitM || 'praat', pose: o.poseM || 'staan' });
  persoon(ctx, 'esra', o.ex || 1220, 880, 455, { t, kijk: -1, uit: o.uitE || 'blij', pose: o.poseE || 'staan', zwanger: o.zw || 0 }); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { baarmoeder(ctx, 1400, 560, 0.62, { week: 30, groei: 0.85, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    intake(ctx, t, { uitE: q.on('test', 1) > 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Esra', '7 weken zwanger', 1220, 385, q.on('Esra', 1), 'center'); naamBij(ctx, 'Verloskundige Mirjam', '', 470, 360, q.on('Mirjam', 1));
    potje(ctx, 960, 640, 0.8, q.on('foliumzuur', 1, 0.4)); tag(ctx, 'begonnen bij een positieve test', 1180, 330, C.text2, q.on('vorige', 1), 'center', 26);
    tag(ctx, 'advies: al vóór de zwangerschap', 960, 170, C.goud, q.on('eerder', 1), 'center', 30); vraagteken(ctx, 960, 470, q.on('denk', 1), 100); },

  // ---------- H1 De intake ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord a'); const u = clamp((t - q.at('vouwt', 1)) / 5, 0, 1);
    neuraleBuis(ctx, 960, 520, 1.15, 1, u); naamBij(ctx, 'plaatje cellen', 'op de rug van het embryo', 960, 690, q.on('plaatje', 1) * (1 - clamp(u * 2, 0, 1)), 'center');
    naamBij(ctx, 'neurale buis', 'hersenen en ruggenmerg', 960, 690, q.on('hersenen', 1), 'center');
    tag(ctx, 'niet helemaal dicht → open ruggetje', 520, 830, C.koraal, q.on('ruggetje', 1), 'center', 28); tag(ctx, 'foliumzuur verkleint de kans', 1400, 830, C.goud, q.on('verkleint', 1), 'center', 28);
    tag(ctx, 'dicht: ± 4 weken na de bevruchting', 960, 270, C.groen, q.on('vier', 1), 'center', 32); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    tijdlijn(ctx, 200, 520, 1520, 1, { max: 10, stap: 1, titel: 'WEKEN ZWANGERSCHAP',
      marks: [[0, 'laatste menstruatie', C.text2, q.on('menstruatie', 1)], [2, 'bevruchting', C.paars, q.on('bevruchting', 1), 60], [6, 'ruggetje dicht', C.groen, q.on('gesloten', 1), 60], [7, 'vandaag', C.goud, q.on('zeven', 1)]],
      banden: [[2, 7, C.paars, q.on('vijf', 1), 'embryo: 5 weken oud']] });
    foetus(ctx, 200 + 1520 * 0.7, 330, 0.45, { week: 7, a: q.on('vijf', 1), t }); persoon(ctx, 'esra', 1800, 880, 300, { t, kijk: -1, uit: 'neutraal', a: q.on('Esra', 1, 0.3) });
    tag(ctx, 'daarom: advies vóór de zwangerschap', 960, 820, C.goud, q.on('Daarom', 1), 'center', 30); },

  s06(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { kamer: { zonderPoster: true, zonderRaam: true }, mx: 640, ex: 1280 });
    naamBij(ctx, 'intake', 'eerste afspraak', 960, 200, q.on('intake', 1) * (1 - q.on('rekent', 1)), 'center');
    vkKaart(ctx, 90, 90, 560, 300, 'Vragen', [['uitgerekende datum', 'datum'], ['gezondheid, medicijnen', 'gezond'], ['roken, alcohol', 'Rookt'], ['ziektes in de familie', 'familie']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.teal, q.on('rekent', 1));
    vkKaart(ctx, 680, 90, 560, 300, 'Eten', [['geen rauw vlees', 'vlees'], ['geen kaas van rauwe melk', 'kaas'], ['kattenbak: niet zelf', 'kattenbak'], ['toxoplasmose', 'toxoplasmose']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.goud, q.on('eten', 1));
    vkKaart(ctx, 1270, 90, 560, 300, 'Bloedtest', [['hiv', 'hiv'], ['hepatitis B', 'hepatitis'], ['syfilis', 'syfilis'], ['baby beschermen', 'beschermen']].filter(([, w]) => q.on(w, 1) > 0.5).map(([r]) => r), C.koraal, q.on('bloedtest', 1)); },

  // ---------- H2 Drie lagen ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('nestelt', 1)) / 4, 0, 1);
    vkA(ctx, 1); roundRect(ctx, 260, 560, 1400, 300, 40); shape(ctx, rgba(VK.spier, 0.35), rgba(VK.spier, 0.7), 2); ctx.restore(); naamBij(ctx, 'baarmoederslijmvlies', '', 300, 840, q.on('slijmvlies', 1));
    blastocyste(ctx, 960, 420 + 180 * u, 120, 1, u, t); tag(ctx, '1 week na de bevruchting', 960, 200, C.text2, q.on('week', 1), 'center', 28);
    naamBij(ctx, 'buitenste cellen', 'worden de placenta', 1130, 420 + 180 * u, q.on('placenta', 1), 'left', C.paars); naamBij(ctx, 'groepje binnenin', 'wordt het kind', 790, 500 + 180 * u, q.on('kind', 1), 'right', C.goud);
    tag(ctx, 'film: Van bevruchting tot baby', 1500, 200, C.teal, q.on('film', 1), 'center', 26); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const d = q.on('medicijn', 1), up = q.on('herstelt', 1, 1), dn = q.on('overleeft', 1, 1);
    regel(ctx, 'de eerste twee weken', 960, 170, q.on('eerste', 1), C.text, 40, 'center', 700);
    cellenHoop(ctx, 520, 520, 64, 1, { ziek: d > 0.5 ? [3, 9, 10] : [] }); chip(ctx, 'cellen nemen elkaars werk nog over', 520, 740, C.paars, q.on('elkaars', 1), 28);
    pijl(ctx, 760, 480, 1180, 330, C.groen, up, 6, 22); cellenHoop(ctx, 1380, 330, 52, up, { ziek: [3, 9, 10], herstel: up }); chip(ctx, 'herstelt helemaal', 1380, 500, C.groen, up, 28);
    pijl(ctx, 760, 580, 1180, 720, C.text2, dn, 6, 22); cellenHoop(ctx, 1380, 720, 52, dn * 0.3, { ziek: [0, 1, 2, 3, 4, 5, 6, 9, 10, 14] }); chip(ctx, 'overleeft het niet', 1380, 850, C.text2, dn, 28);
    tag(ctx, 'alles of niets', 960, 270, C.goud, q.on('alles-of-niets', 1), 'center', 34); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const u = clamp((t - q.at('lagen', 1)) / 2.5, 0, 1);
    tag(ctx, 'derde week na de bevruchting', 480, 200, C.text2, q.on('derde', 1), 'center', 28); kiemschijf(ctx, 480, 400, 560, 1, u); naamBij(ctx, 'kiembladen', '', 480, 610, q.on('kiembladen', 1), 'center');
    const rij = (i, col, kop, org, w) => { const a = q.on(w, 1); if (a <= 0.01) return; vkA(ctx, a); text(ctx, kop, 790, 412 + i * 54, fTekst(30, 800), col, 'left'); text(ctx, org, 1010, 412 + i * 54, fTekst(30, 600), C.text, 'left'); ctx.restore(); };
    rij(0, VK.ecto, 'buitenste laag', 'huid en het hele zenuwstelsel', 'buitenste'); rij(1, VK.meso, 'middelste laag', 'spieren, botten, hart en bloed', 'middelste'); rij(2, VK.endo, 'binnenste laag', 'darmkanaal, longen en lever', 'binnenste');
    tag(ctx, 'dezelfde genen, per laag andere genen aan', 960, 860, C.paars, q.on('Dezelfde', 1), 'center', 28); },

  // ---------- H3 De kwetsbare weken ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    tijdlijn(ctx, 200, 640, 1520, 1, { max: 10, stap: 1, titel: 'WEKEN NA DE BEVRUCHTING', marks: [[3, 'hart klopt', C.koraal, q.on('hart', 1), 60], [4.5, 'armen en benen', C.goud, q.on('knopjes', 1)]], banden: [[3, 8, C.koraal, q.on('drie', 1), 'alle organen worden aangelegd']] });
    foetus(ctx, 960, 340, 0.85, { week: 9, t, a: q.on('organen', 1) }); tag(ctx, 'kwetsbaarst', 1450, 300, C.koraal, q.on('kwetsbaarst', 1), 'center', 34); tag(ctx, 'blijvende schade', 1450, 380, C.koraal, q.on('blijvende', 1), 'center', 28); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    pillen(ctx, 360, 360, 1, q.on('Softenon', 1), 'Softenon', C.paars); tag(ctx, 'jaren vijftig · slaapmiddel', 360, 560, C.text2, q.on('vijftig', 1), 'center', 26);
    regel(ctx, '± 10.000 kinderen', 960, 300, q.on('tienduizend', 1), C.koraal, 56, 'center', 800); regel(ctx, 'korte of geen armen en benen', 960, 370, q.on('ontbrekende', 1), C.text, 32, 'center', 600);
    tijdlijn(ctx, 520, 680, 880, q.on('periode', 1), { max: 10, stap: 1, titel: 'WEKEN NA DE BEVRUCHTING', banden: [[3, 5, C.goud, 1, 'alleen in deze weken']] });
    foetus(ctx, 1580, 420, 0.6, { week: 7, t, a: q.on('Precies', 1) }); if (q.on('Precies', 1) > 0.01) { vkA(ctx, q.on('Precies', 1) * (0.6 + 0.4 * Math.sin(t * 4))); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(1580 + 24, 420 - 12, 40, 0, 6.283); ctx.arc(1580 + 40, 420 + 30, 40, 0, 6.283); ctx.stroke(); ctx.restore(); } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('infecties', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B;
      roundRect(ctx, 200, 260, 700, 480, 30); shape(ctx, rgba(VK.bloedM, 0.15), rgba(VK.bloedM, 0.6), 2); roundRect(ctx, 1020, 260, 700, 480, 30); shape(ctx, rgba(VK.bloedK, 0.12), rgba(VK.bloedK, 0.6), 2);
      ctx.strokeStyle = rgba(C.paars, 0.9); ctx.lineWidth = 8; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.moveTo(960, 240); ctx.lineTo(960, 760); ctx.stroke(); ctx.setLineDash([]);
      metaText(ctx, 'BLOED MOEDER', 550, 230, C.grain, 'center', 22); metaText(ctx, 'BLOED KIND', 1370, 230, C.grain, 'center', 22); naamBij(ctx, 'placenta', 'dunne laag cellen', 980, 820, 1, 'center');
      for (let i = 0; i < 5; i++) { const f = ((t * 0.25 + i / 5) % 1); molecuultje(ctx, 300 + f * 1300, 360 + i * 30, 1.3, 'alcohol', q.on('alcohol', 1)); molecuultje(ctx, 300 + ((f + 0.5) % 1) * 1300, 560 + i * 30, 1.2, 'zuurstof', q.on('zuurstof', 1)); }
      naamBij(ctx, 'alcohol', '', 300, 330, q.on('alcohol', 1)); naamBij(ctx, 'zuurstof', '', 300, 700, q.on('zuurstof', 1));
      tag(ctx, 'veilige hoeveelheid: onbekend', 960, 170, C.goud, q.on('veilige', 1), 'center', 30); stempel(ctx, 1500, 160, 'niet drinken', C.koraal, q.on('helemaal', 1)); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; foetus(ctx, 1200, 520, 0.9, { week: 12, t }); for (let i = 0; i < 4; i++) { const f = (t * 0.2 + i / 4) % 1; virusje(ctx, 300 + f * 700, 380 + i * 70, 26, 1); }
      naamBij(ctx, 'rodehond', 'in de eerste maanden', 300, 300, q.on('rodehond', 1)); tag(ctx, 'doof', 1550, 400, C.koraal, q.on('doof', 1), 'center', 30); tag(ctx, 'hartafwijking', 1550, 480, C.koraal, q.on('hartafwijking', 1), 'center', 30);
      tag(ctx, 'daarom: BMR-prik als kind', 960, 820, C.teal, q.on('prik', 1), 'center', 30); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { kamer: { zonderRaam: true }, uitM: q.on('raadt', 1) > 0.5 ? 'praat' : 'neutraal' });
    pillen(ctx, 1500, 300, 0.8, q.on('ibuprofen', 1), 'ibuprofen', C.koraal); kruis(ctx, 1600, 250, 30, q.on('paracetamol', 1)); pillen(ctx, 1500, 560, 0.8, q.on('paracetamol', 1), 'paracetamol', C.groen); vink_(ctx, 1610, 520, 30, q.on('paracetamol', 1) * 0.9);
    tag(ctx, 'later in de zwangerschap: nieren, bloedvat bij het hart', 960, 170, C.koraal, q.on('nieren', 1), 'center', 28); tag(ctx, 'zie: De bevalling', 960, 830, C.teal, q.on('bevalling', 1), 'center', 26); },

  s14(ctx, t, q) { bg(ctx, 'schema');
    foetus(ctx, 520, 470, 0.9, { week: 7, t }); regel(ctx, '5 weken na de bevruchting', 520, 760, 1, C.text, 40, 'center', 800);
    foetus(ctx, 1400, 470, 1.1, { week: 22, t, a: q.on('twintig', 1) }); regel(ctx, '20 weken na de bevruchting', 1400, 760, q.on('twintig', 1), C.text, 40, 'center', 800);
    tag(ctx, 'stof die de aanleg van armen verstoort', 960, 180, C.paars, q.on('stof', 1), 'center', 30); vraagteken(ctx, 960, 520, q.on('denk', 1), 120); },

  // ---------- H4 Groeien en rijpen ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord b');
    foetus(ctx, 960, 560, 0.5, { week: 10, t, a: 1 - q.on('twaalf', 1) }); tag(ctx, 'na 8 weken: embryo → foetus', 960, 230, C.paars, q.on('foetus', 1), 'center', 30); tag(ctx, 'groeien en rijpen', 960, 300, C.goud, q.on('rijpen', 1), 'center', 30);
    const kol = (x, s, wk, l1, l2, w) => { const a = q.on(w, 1); foetus(ctx, x, 560, s, { week: wk, t, a }); regel(ctx, l1, x, 800, a, C.text, 34, 'center', 800); regel(ctx, l2, x, 845, a, C.text2, 28, 'center', 600); };
    kol(400, 0.2, 12, '12 weken', '± 6 cm', 'twaalf'); kol(900, 0.65, 20, '20 weken', '± 25 cm · 300 g', 'twintig'); kol(1480, 1.15, 38, 'geboorte', '± 50 cm · 3,5 kg', 'geboorte'); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    echoScherm(ctx, 960, 200, 820, 1, (c) => { foetus(c, -20, 0, 0.75, { week: 11 }); const m = q.on('kruin', 1, 1.2); if (m > 0.01) { c.save(); c.globalAlpha *= m; c.strokeStyle = C.goud; c.lineWidth = 5; c.setLineDash([12, 8]); c.beginPath(); c.moveTo(-40, -170); c.lineTo(-40 + 50 * m, -170 + 300 * m); c.stroke(); c.setLineDash([]); circ(c, -40, -170, 9, C.goud); if (m > 0.95) circ(c, 10, 130, 9, C.goud); c.restore(); } });
    naamBij(ctx, 'kop-romplengte', 'van kruin tot stuit', 1450, 520, q.on('kruin', 1), 'left', C.goud); naamBij(ctx, 'termijnecho', '10 tot 12 weken', 300, 300, q.on('termijnecho', 1));
    tag(ctx, 'alle embryo’s groeien ongeveer even snel', 960, 140, C.text2, q.on('even', 1), 'center', 28); tag(ctx, 'termijn op een paar dagen nauwkeurig', 960, 860, C.groen, q.on('nauwkeurig', 1), 'center', 30); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const adem = 0.5 + 0.5 * Math.sin(t * 2.2);
    naamBij(ctx, 'longen', 'als laatste klaar', 960, 200, q.on('longen', 1), 'center');
    longblaasje(ctx, 560, 500, 170, q.on('water', 1), { open: q.on('surfactant', 1) > 0.5 ? 0.2 + 0.8 * adem : 1, water: q.on('trekt', 1) });
    naamBij(ctx, 'laagje water', 'trekt de wand naar binnen', 560, 760, q.on('trekt', 1), 'center');
    longblaasje(ctx, 1360, 500, 170, q.on('surfactant', 1), { open: 0.85 + 0.15 * adem, surf: 1 }); naamBij(ctx, 'surfactant', 'houdt het blaasje open', 1360, 760, q.on('surfactant', 1), 'center', C.goud);
    tag(ctx, 'zonder', 560, 280, C.koraal, q.on('surfactant', 1), 'center', 28); tag(ctx, 'met', 1360, 280, C.groen, q.on('surfactant', 1), 'center', 28);
    tag(ctx, 'geboren bij 25 weken: ademhulp en extra surfactant', 960, 860, C.koraal, q.on('vijfentwintig', 1), 'center', 30); },

  s19(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'esra', 520, 880, 470, { t, kijk: 1, uit: 'bezorgd', zwanger: 0.65, outfit: 'gewoon' }); const p1 = q.on('prikken', 1);
    spuit(ctx, 700, 560, 0.7, p1, -2.5); klokje(ctx, 1000, 260, 50, 0, p1); regel(ctx, 'prik 1', 1000, 350, p1, C.text, 28, 'center', 700); klokje(ctx, 1200, 260, 50, 1, p1); regel(ctx, 'prik 2', 1200, 350, p1, C.text, 28, 'center', 700); tag(ctx, 'een dag ertussen', 1100, 180, C.text2, q.on('dag', 1), 'center', 26);
    naamBij(ctx, 'bijnierschorshormoon', '', 1100, 440, p1, 'center', C.goud);
    longblaasje(ctx, 1420, 640, 90, q.on('versnelt', 1), { open: 1, surf: clamp((t - q.at('versnelt', 1)) / 3, 0, 1) }); tag(ctx, 'longen rijpen sneller', 1420, 820, C.groen, q.on('versnelt', 1), 'center', 28);
    vraagteken(ctx, 960, 620, q.on('denk', 1), 110); },

  // ---------- Recap ----------
  s21(ctx, t, q) { bg(ctx, 'schema'); vkAntwoord(ctx, 'Antwoord c'); baarmoeder(ctx, 1050, 520, 0.8, { week: 30, groei: 0.8, t });
    const pad = [[180, 520], [600, 520], [1140, 290], [1080, 470]]; for (let i = 0; i < 6; i++) { const f = ((t * 0.3 + i / 6) % 1) * 3, k = Math.min(2, Math.floor(f)), r = f - k; circ(ctx, pad[k][0] + (pad[k + 1][0] - pad[k][0]) * r, pad[k][1] + (pad[k + 1][1] - pad[k][1]) * r, 11, C.goud); }
    naamBij(ctx, 'hormoon in het bloed van de moeder', '', 180, 470, q.on('hormoon', 1)); naamBij(ctx, 'door de placenta', '', 1250, 220, q.on('placenta', 1), 'left', C.paars); naamBij(ctx, 'surfactant aan', 'in de longen van het kind', 1350, 560, q.on('surfactant', 1));
    tag(ctx, 'duurt 1 à 2 dagen', 400, 760, C.text2, q.on('duurt', 1), 'center', 28); tag(ctx, 'elke dag langer telt', 960, 870, C.goud, q.on('elke', 1), 'center', 30); },

  s22(ctx, t, q) { bg(ctx, 'schema'); intake(ctx, t, { uitE: 'lacht', uitM: 'blij' });
    [['ruggetje gesloten', 'ruggetje'], ['hart klopt', 'klopt'], ['organen worden aangelegd', 'organen']].forEach(([s2, w], i) => { const a = q.on(w, 1); chip(ctx, s2, 960, 190 + i * 70, C.groen, a, 28); });
    tag(ctx, 'luisteren en adviseren', 960, 470, C.goud, q.on('luisteren', 1), 'center', 34); },

  s23(ctx, t, q) { bg(ctx, 'schema'); praktijk(ctx, 1, { zonderRaam: true }); persoon(ctx, 'mirjam', 520, 880, 500, { t, kijk: 1, uit: 'blij', pose: 'wijsOmhoog' });
    regel(ctx, 'Opleiding verloskunde', 1150, 220, q.on('Verloskundige', 1), C.text, 44, 'center', 800); tag(ctx, 'hbo · 4 jaar', 1150, 300, C.goud, q.on('vier', 1), 'center', 32);
    tag(ctx, 'biologie en geneeskunde', 1000, 400, C.teal, q.on('biologie', 1), 'center', 28); tag(ctx, 'gesprekken voeren', 1340, 400, C.paars, q.on('gesprekken', 1), 'center', 28);
    huisje(ctx, 1000, 680, 0.8, q.on('praktijk', 1)); naamBij(ctx, 'praktijk', '', 1000, 800, q.on('praktijk', 1), 'center'); ziekenhuis(ctx, 1380, 700, 0.75, q.on('ziekenhuis', 1)); naamBij(ctx, 'ziekenhuis', '', 1380, 800, q.on('ziekenhuis', 1), 'center');
    tag(ctx, 'stage vanaf het begin', 1190, 520, C.groen, q.on('stage', 1), 'center', 28); },
});
