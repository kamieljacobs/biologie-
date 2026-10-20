
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
// Wat word jij? · Verpleegkunde 1 · Bel je de arts? — eigen tekeningen (20 okt 2026)

// kleuren voor punten 0..3 (waarschuwingsscore)
const PUNTKL = ['#7FC48F', '#E0B64A', '#E8875A', '#D8473A'];

// ziekenhuisbed in vooraanzicht (voeteneind naar de kijker), hoofdeinde opgezet; Opa Henk zit half rechtop, zichtbaar vanaf de borst.
// o: t, uit, adem (ademhalingen per minuut), o2 (neusbrilletje 0..1), meter (saturatiemeter op de vinger 0..1), spo2 (tekst op meter)
function henkInBed(ctx, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  // opgezette rugleuning en kussen
  ctx.save(); ctx.translate(x, y - 430 * s); ctx.beginPath(); ctx.moveTo(-210 * s, 210 * s); ctx.lineTo(-180 * s, -200 * s); ctx.quadraticCurveTo(0, -240 * s, 180 * s, -200 * s); ctx.lineTo(210 * s, 210 * s); ctx.closePath(); shape(ctx, '#55657F', '#7D8CA6', 2 * s);
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(-150 * s, -150 * s); ctx.quadraticCurveTo(0, -180 * s, 150 * s, -150 * s); ctx.stroke(); ctx.restore();
  roundRect(ctx, x - 165 * s, y - 640 * s, 330 * s, 190 * s, 70 * s); shape(ctx, '#E6EAEE', '#C4CCD6', 2 * s);
  // Henk (ademt: borst gaat op en neer)
  const yB = y - 330 * s, h = 560 * s, L = CAST.henk.lengte || 1, hh = h * L / 6.1, top = yB - 2.6 * hh, voet = top + h * L;
  const fr = (o.adem || 16) / 60, b = Math.sin(t * fr * 6.283);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 400 * s, 0, 800 * s, yB + 6 * s); ctx.clip();
  ctx.translate(x, yB); ctx.scale(1 + 0.012 * b, 1 + 0.022 * b); ctx.translate(-x, -yB);
  const P = persoon(ctx, 'henk', x, voet, h, { t, uit: o.uit || 'neutraal', kijk: o.kijk || 1 }); ctx.restore();
  // neusbrilletje
  if ((o.o2 || 0) > 0.01 && P.hoofd) { ctx.save(); ctx.globalAlpha *= o.o2; const { x: hx, y: hy, r } = P.hoofd; ctx.strokeStyle = '#CFE4F0'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(hx - r * 0.2, hy + r * 0.32); ctx.quadraticCurveTo(hx - r * 0.75, hy + r * 0.45, hx - r * 1.02, hy + r * 0.05); ctx.quadraticCurveTo(hx - r * 1.15, hy + r * 0.9, hx - r * 0.2, hy + r * 1.55);
    ctx.moveTo(hx + r * 0.2, hy + r * 0.32); ctx.quadraticCurveTo(hx + r * 0.75, hy + r * 0.45, hx + r * 1.02, hy + r * 0.05); ctx.quadraticCurveTo(hx + r * 1.15, hy + r * 0.9, hx + r * 0.2, hy + r * 1.55);
    ctx.moveTo(hx, hy + r * 1.55); ctx.bezierCurveTo(hx + 120 * s, hy + r * 2.2, x + 230 * s, y - 520 * s, x + 300 * s, y - 640 * s); ctx.stroke();
    // zuurstofaansluiting aan de wand
    roundRect(ctx, x + 280 * s, y - 700 * s, 50 * s, 64 * s, 8 * s); shape(ctx, '#3E8E6A', '#7FC48F', 2 * s); circ(ctx, x + 305 * s, y - 680 * s, 9 * s, '#E0F0E6'); ctx.restore(); }
  // deken
  ctx.beginPath(); ctx.moveTo(x - 255 * s, y - 150 * s); ctx.lineTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 255 * s, y - 150 * s); ctx.closePath();
  shape(ctx, '#8DB3D0', '#A9C8DE', 2 * s); ctx.fillStyle = '#E6EAEE'; ctx.beginPath(); ctx.moveTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 250 * s, yB + 44 * s); ctx.bezierCurveTo(x + 150 * s, yB + 20 * s, x - 150 * s, yB + 20 * s, x - 250 * s, yB + 44 * s); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba('#5E86A6', 0.6); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 120 * s, yB + 70 * s); ctx.quadraticCurveTo(x - 90 * s, yB + 120 * s, x - 130 * s, y - 160 * s); ctx.moveTo(x + 140 * s, yB + 80 * s); ctx.quadraticCurveTo(x + 110 * s, yB + 130 * s, x + 150 * s, y - 160 * s); ctx.stroke();
  // hand op de deken (rechts in beeld), met eventueel de saturatiemeter
  const hx = x + 120 * s, hy = yB + 70 * s; ctx.fillStyle = CAST.henk.topKleur; ctx.beginPath(); ctx.ellipse(hx - 46 * s, hy + 4 * s, 34 * s, 22 * s, -0.15, 0, 6.283); ctx.fill();
  ctx.fillStyle = CAST.henk.huid; ctx.beginPath(); ctx.ellipse(hx, hy, 32 * s, 20 * s, -0.1, 0, 6.283); ctx.fill(); roundRect(ctx, hx + 18 * s, hy - 12 * s, 40 * s, 16 * s, 8 * s); ctx.fill();
  if ((o.meter || 0) > 0.01) { ctx.save(); ctx.globalAlpha *= o.meter; roundRect(ctx, hx + 26 * s, hy - 26 * s, 48 * s, 42 * s, 10 * s); shape(ctx, '#3A4A66', '#8FA0B5', 2 * s); circ(ctx, hx + 50 * s, hy - 4 * s, 9 * s, rgba('#FF4A3A', 0.35)); circ(ctx, hx + 50 * s, hy - 4 * s, 4 * s, '#FF5A4A');
    if (o.spo2) { roundRect(ctx, hx + 10 * s, hy - 82 * s, 80 * s, 46 * s, 8 * s); shape(ctx, '#121A26', '#5BA4C9', 2 * s); text(ctx, o.spo2, hx + 50 * s, hy - 48 * s, fTekst(30 * s, 800), '#7FE0A0', 'center'); } ctx.restore(); }
  // matras, voeteneind en poten
  ctx.fillStyle = '#6A7590'; ctx.fillRect(x - 265 * s, y - 160 * s, 530 * s, 22 * s);
  roundRect(ctx, x - 280 * s, y - 250 * s, 560 * s, 150 * s, 18 * s); shape(ctx, '#C9D2E0', '#8FA0B5', 2.5 * s); roundRect(ctx, x - 250 * s, y - 225 * s, 500 * s, 100 * s, 12 * s); shape(ctx, '#B4BFD0', null);
  roundRect(ctx, x - 70 * s, y - 205 * s, 140 * s, 60 * s, 6 * s); shape(ctx, '#F2F2EE', '#8FA0B5', 1.5 * s); ctx.fillStyle = '#5A6478'; for (let i = 0; i < 3; i++) ctx.fillRect(x - 52 * s, y - 192 * s + i * 16 * s, (90 - i * 24) * s, 5 * s);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 250 * s, y - 100 * s, 14 * s, 76 * s); ctx.fillRect(x + 236 * s, y - 100 * s, 14 * s, 76 * s); circ(ctx, x - 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s); circ(ctx, x + 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s);
  ctx.restore(); return Object.assign({}, P, { hand: { x: hx, y: hy } }); }

// lijstje metingen (klembord); rijen = [[naam, waarde, hl 0..1]]; titel = 'OCHTEND' / 'MIDDAG'
function meetLijst(ctx, x, y, w, titel, rijen, a = 1, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 84 + rijen.length * 58;
  roundRect(ctx, x, y, w, h, 14); shape(ctx, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, x + w / 2 - 60, y - 16, 120, 32, 8); shape(ctx, '#8A8E96', '#5A5E66', 2);
  metaText(ctx, titel, x + 24, y + 54, col === C.teal ? '#2E6F8F' : '#A8402F', 'left', 24);
  rijen.forEach(([n, v, hl], i) => { const yy = y + 104 + i * 58; if ((hl || 0) > 0.01) { roundRect(ctx, x + 10, yy - 38, w - 20, 52, 8); shape(ctx, rgba(C.oker, 0.35 * hl), null); }
    text(ctx, n, x + 24, yy, fTekst(28, 600), '#3A4458', 'left'); text(ctx, v, x + w - 24, yy, fTekst(30, 800), '#1A2740', 'right'); });
  ctx.restore(); }

// hart (vooraanzicht, schematisch-anatomisch); beat 0..1 = kloppen
function hartje(ctx, x, y, s, a = 1, t = 0, beat = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const k = 1 + 0.06 * beat * Math.max(0, Math.sin(t * 9.5)); ctx.translate(x, y); ctx.scale(s * k, s * k);
  ctx.strokeStyle = '#B23A3A'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, -50); ctx.quadraticCurveTo(-10, -110, 40, -110); ctx.quadraticCurveTo(80, -110, 80, -70); ctx.stroke();
  ctx.strokeStyle = '#4A6AB0'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(-40, -50); ctx.lineTo(-40, -110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.bezierCurveTo(-60, -110, -120, -50, -90, 10); ctx.bezierCurveTo(-70, 60, -20, 90, 10, 110); ctx.bezierCurveTo(50, 70, 100, 30, 100, -20); ctx.bezierCurveTo(100, -80, 40, -90, 0, -60); ctx.closePath(); shape(ctx, '#C8504A', '#E07A70', 3);
  ctx.strokeStyle = rgba('#7A2A2A', 0.7); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(10, -50); ctx.quadraticCurveTo(-10, 20, 12, 100); ctx.stroke(); ctx.restore(); }

// longen met luchtpijp; adem 0..1 = uitzetten
function longen(ctx, x, y, s, a = 1, adem = 0, vocht = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, -40); ctx.moveTo(0, -40); ctx.lineTo(-40, -10); ctx.moveTo(0, -40); ctx.lineTo(40, -10); ctx.stroke();
  for (const sd of [-1, 1]) { const k = 1 + 0.06 * adem; ctx.save(); ctx.scale(k, k); ctx.beginPath(); ctx.moveTo(sd * 22, -70); ctx.bezierCurveTo(sd * 90, -90, sd * 120, 0, sd * 115, 90); ctx.quadraticCurveTo(sd * 70, 115, sd * 22, 90); ctx.closePath(); shape(ctx, '#E3A8B0', '#F4C8CE', 3);
    if (vocht > 0.01 && sd > 0) { ctx.save(); ctx.clip(); ctx.fillStyle = rgba('#5BA4C9', 0.6 * vocht); ctx.fillRect(0, 30, 130, 100); ctx.restore(); } ctx.restore(); }
  ctx.restore(); }

// thermometer met rode kolom; v 0..1
function thermometer(ctx, x, y, s, a = 1, v = 0.6) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -18, -120, 36, 190, 18); shape(ctx, '#E8EEF2', '#9AA3B2', 3); circ(ctx, 0, 84, 32, '#D8473A', '#9AA3B2', 3); ctx.fillStyle = '#D8473A'; ctx.fillRect(-8, 70 - 170 * v, 16, 170 * v + 10);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 2; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(18, -100 + i * 25); ctx.lineTo(i % 2 ? 28 : 34, -100 + i * 25); ctx.stroke(); } ctx.restore(); }

// bloeddrukmeter: manchet om een bovenarm + wijzerplaat
function bloeddrukMeter(ctx, x, y, s, a = 1, v = 0.5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = CAST.henk.huid; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-120, -70); ctx.lineTo(-40, 90); ctx.stroke();
  ctx.save(); ctx.translate(-82, 8); ctx.rotate(-0.46); roundRect(ctx, -40, -50, 80, 100, 10); shape(ctx, '#3E5C7A', '#5B7FA8', 2); ctx.restore();
  ctx.strokeStyle = '#2A3242'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-60, 20); ctx.quadraticCurveTo(0, 60, 40, 10); ctx.stroke();
  circ(ctx, 70, -20, 56, '#F2F2EE', '#9AA3B2', 4); ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { const an = 2.4 + i * 0.58; ctx.beginPath(); ctx.moveTo(70 + Math.cos(an) * 42, -20 + Math.sin(an) * 42); ctx.lineTo(70 + Math.cos(an) * 50, -20 + Math.sin(an) * 50); ctx.stroke(); }
  const an = 2.4 + v * 4.6; ctx.strokeStyle = '#D8473A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(70, -20); ctx.lineTo(70 + Math.cos(an) * 40, -20 + Math.sin(an) * 40); ctx.stroke(); circ(ctx, 70, -20, 6, '#2A3242'); ctx.restore(); }

// close-up: vingertop in een saturatiemeter; licht 0..1 = rood licht schijnt door de vingertop; waarde = tekst op het schermpje
function vingerMeter(ctx, x, y, s, a = 1, licht = 0, waarde = '', t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const huid = CAST.henk.huid; const vinger = () => { ctx.beginPath(); ctx.moveTo(-520, -70); ctx.lineTo(60, -70); ctx.bezierCurveTo(130, -70, 150, -20, 150, 0); ctx.bezierCurveTo(150, 30, 130, 70, 60, 70); ctx.lineTo(-520, 70); ctx.closePath(); };
  vinger(); shape(ctx, huid, _donker(huid, 0.15), 3); ctx.strokeStyle = _donker(huid, 0.2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-300, -64); ctx.quadraticCurveTo(-290, 0, -300, 64); ctx.stroke();
  // rood licht door de vingertop
  if (licht > 0.01) { ctx.save(); vinger(); ctx.clip(); const g = ctx.createRadialGradient(20, 0, 10, 20, 0, 120); g.addColorStop(0, rgba('#FF3A2A', 0.75 * licht)); g.addColorStop(1, rgba('#FF3A2A', 0)); ctx.fillStyle = g; ctx.fillRect(-120, -80, 300, 160);
    ctx.strokeStyle = rgba('#FF6A5A', 0.8 * licht); ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 40; for (const dx of [-14, 20, 54]) { ctx.beginPath(); ctx.moveTo(dx, -66); ctx.lineTo(dx, 66); ctx.stroke(); } ctx.setLineDash([]); ctx.restore(); }
  // nagel (bovenop, voor de vingertop)
  ctx.beginPath(); ctx.ellipse(100, -60, 44, 12, 0.08, 0, 6.283); shape(ctx, _licht(huid, 0.45), _donker(huid, 0.1), 2);
  // klem: bovenste en onderste helft, scharnier links
  ctx.fillStyle = '#3A4A66'; roundRect(ctx, -170, -170, 300, 96, 26); shape(ctx, '#3A4A66', '#8FA0B5', 3); roundRect(ctx, -170, 74, 300, 96, 26); shape(ctx, '#3A4A66', '#8FA0B5', 3);
  ctx.fillStyle = '#2A3242'; ctx.fillRect(-180, -90, 26, 180); circ(ctx, -167, 0, 18, '#5A6478');
  // lampje en lichtsensor
  circ(ctx, 20, -80, 16, licht > 0.01 ? '#FF4A3A' : '#7A3A3A', '#F2F2EE', 2); if (licht > 0.01) circ(ctx, 20, -80, 30, rgba('#FF4A3A', 0.3 * licht));
  roundRect(ctx, 0, 72, 40, 16, 4); shape(ctx, '#121A26', '#8FA0B5', 1.5);
  // schermpje bovenop
  roundRect(ctx, -140, -160, 240, 76, 12); shape(ctx, '#121A26', '#5BA4C9', 2);
  if (waarde) { text(ctx, waarde, -30, -106, fTekst(50, 800), '#7FE0A0', 'center'); }
  if (puls > 0.01) { ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const xx = 30 + i * 1.6, ph = (i / 40 + t * 1.6) % 1, yy = -122 - (ph < 0.25 ? Math.sin(ph / 0.25 * Math.PI) * 18 : 0); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
  ctx.restore(); }

// rode bloedcel (schijf met indeuking), zijaanzicht licht gekanteld
function rbc(ctx, x, y, r, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.72, 0, 0, 6.283); shape(ctx, '#C8383A', '#E0605A', 2); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.48, r * 0.32, 0, 0, 6.283); ctx.fillStyle = '#A82A30'; ctx.fill(); ctx.restore(); }
// hemoglobinemolecuul (vier delen); vol = zuurstof erop (helder rood, met O2-paartjes) of leeg (donker)
function hbMol(ctx, x, y, r, vol, a = 1, o2 = true) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const kl = vol ? '#E0403A' : '#6A3A5C', rd = vol ? '#F08070' : '#8C5A7A';
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => circ(ctx, x + dx * r * 0.45, y + dy * r * 0.45, r * 0.55, kl, rd, 1.2));
  if (vol && o2 && r > 14) [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => { circ(ctx, x + dx * r * 0.95 - 3, y + dy * r * 0.95, 4, '#BFE6F5'); circ(ctx, x + dx * r * 0.95 + 4, y + dy * r * 0.95, 4, '#BFE6F5'); });
  ctx.restore(); }

// longblaasjes in doorsnede; vocht 0..1 = deel gevuld met vocht; o2 = zuurstofpijltjes naar het bloed
function longblaasjesVocht(ctx, x, y, s, a = 1, vocht = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#C9A0A8'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -230); ctx.lineTo(0, -110); ctx.moveTo(0, -120); ctx.lineTo(-90, -60); ctx.moveTo(0, -120); ctx.lineTo(90, -60); ctx.stroke();
  const B = [[-140, -10, 0], [-60, 40, 0], [-110, 100, 0], [60, 40, 1], [140, -10, 1], [110, 100, 1]];
  B.forEach(([bx, by, ziek]) => { circ(ctx, bx, by, 62, '#3A2A36', '#F4C8CE', 4); if (ziek && vocht > 0.01) { ctx.save(); ctx.beginPath(); ctx.arc(bx, by, 60, 0, 6.283); ctx.clip(); ctx.fillStyle = rgba('#5BA4C9', 0.7); ctx.fillRect(bx - 62, by + 62 - 124 * vocht * 0.8, 124, 124); for (let i = 0; i < 4; i++) circ(ctx, bx - 26 + i * 18, by + 30 - (i % 2) * 14, 7, rgba('#F2F2EE', 0.7 * vocht)); ctx.restore(); }
    // haarvaatje om het blaasje
    ctx.strokeStyle = rgba('#C8383A', 0.85); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(bx, by, 72, 0.3, 2.8); ctx.stroke(); });
  // zuurstof: veel bij gezonde, weinig bij zieke blaasjes
  for (let i = 0; i < 12; i++) { const L = i < 6 ? B[i % 3] : B[3 + (i % 3)]; const ziek = i >= 6; if (ziek && i % 3 !== 0 && vocht > 0.5) continue; const ph = (t * 0.6 + i * 0.37) % 1, an = 0.6 + (i % 3) * 0.6;
    const px = L[0] + Math.cos(an) * (20 + ph * 50), py = L[1] + Math.sin(an) * (20 + ph * 50); circ(ctx, px - 4, py, 5, rgba('#BFE6F5', 1 - ph)); circ(ctx, px + 4, py, 5, rgba('#BFE6F5', 1 - ph)); }
  ctx.restore(); }

// horloge met secondewijzer
function horloge(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - r * 0.55, y - r * 1.7, r * 1.1, r * 3.4, r * 0.3); shape(ctx, '#3A3F4E', null);
  circ(ctx, x, y, r * 1.08, '#9AA3B2'); circ(ctx, x, y, r, '#F2F2EE', '#5A6478', Math.max(2, r * 0.05)); ctx.strokeStyle = '#2A3242';
  for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.lineWidth = Math.max(1.5, r * (i % 3 ? 0.03 : 0.06)); ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.8, y + Math.sin(an) * r * 0.8); ctx.lineTo(x + Math.cos(an) * r * 0.92, y + Math.sin(an) * r * 0.92); ctx.stroke(); }
  ctx.lineCap = 'round'; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r * 0.45, y - r * 0.2); ctx.moveTo(x, y); ctx.lineTo(x - r * 0.1, y - r * 0.65); ctx.stroke();
  const an = -Math.PI / 2 + (t % 60) / 60 * 6.283; ctx.strokeStyle = '#D8473A'; ctx.lineWidth = Math.max(1.5, r * 0.03); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(an) * r * 0.85, y + Math.sin(an) * r * 0.85); ctx.stroke(); circ(ctx, x, y, r * 0.06, '#D8473A'); ctx.restore(); }

// telefoon (in de hand); rot = hoek
function telefoon(ctx, x, y, s, a = 1, rot = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -16, -34, 32, 68, 7); shape(ctx, '#2A2F3E', '#9AA3B2', 2); ctx.fillStyle = '#5BA4C9'; ctx.fillRect(-11, -26, 22, 46); ctx.restore(); }
// golfjes tussen twee bellers
function belGolf(ctx, x, y, a = 1, t = 0, dir = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k / 3) % 1; ctx.globalAlpha = a * (1 - ph); ctx.beginPath(); ctx.arc(x, y, 20 + ph * 60, dir > 0 ? -0.6 : Math.PI - 0.6, dir > 0 ? 0.6 : Math.PI + 0.6); ctx.stroke(); } ctx.restore(); }

// waarschuwingsscore als tabel: rij = [naam, ochtendwaarde, ochtendpunten, middagwaarde, middagpunten]; uO, uM[i] = zichtbaarheid
function scoreTabel(ctx, x, y, rijen, o = {}) { const { a = 1, uO = 0, uM = [], hlM = [], totO = 0, totM = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rh = 56, X = [x, x + 330, x + 520, x + 660, x + 850], bw = 990;
  roundRect(ctx, x - 20, y - 60, bw, 60 + rijen.length * rh + 90, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5);
  metaText(ctx, 'METING', X[0], y - 16, C.text2, 'left', 22); if (uO > 0.01) { ctx.save(); ctx.globalAlpha *= uO; metaText(ctx, 'OCHTEND', X[1], y - 16, C.teal, 'left', 22); ctx.restore(); } if ((uM[0] || 0) > 0.01) metaText(ctx, 'MIDDAG', X[3], y - 16, C.koraal, 'left', 22);
  rijen.forEach(([n, vo, po, vm, pm], i) => { const yy = y + i * rh; ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 10, yy); ctx.lineTo(x + bw - 30, yy); ctx.stroke();
    const grijs = n === 'extra zuurstof'; if (grijs) { ctx.save(); ctx.globalAlpha *= 0.6; } text(ctx, n, X[0], yy + 38, fTekst(30, 600), grijs ? C.text2 : C.text, 'left');
    const cel = (v, p, xv, u, hl) => { if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; if (hl > 0.01) { roundRect(ctx, xv - 12, yy + 6, 330, rh - 12, 10); shape(ctx, rgba(C.goud, 0.18 * hl), rgba(C.goud, 0.8 * hl), 2); } text(ctx, v, xv, yy + 38, fTekst(30, 700), C.text, 'left'); roundRect(ctx, xv + 190 - 30, yy + 8, 60, rh - 16, 10); shape(ctx, rgba(PUNTKL[p], p ? 0.85 : 0.25), PUNTKL[p], 2); text(ctx, String(p), xv + 190, yy + 39, fTekst(32, 800), p ? '#1A2740' : C.text, 'center'); ctx.restore(); };
    cel(vo, po, X[1], uO, 0); cel(vm, pm, X[3], uM[i] || 0, hlM[i] || 0); if (grijs) ctx.restore(); });
  const yt = y + rijen.length * rh; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 10, yt); ctx.lineTo(x + bw - 30, yt); ctx.stroke();
  text(ctx, 'totaal', X[0], yt + 58, fTekst(32, 800), C.text, 'left');
  if (totO > 0.01) { ctx.save(); ctx.globalAlpha *= totO; circ(ctx, X[1] + 190, yt + 46, 34, rgba(C.groen, 0.3), C.groen, 3); text(ctx, '1', X[1] + 190, yt + 58, fTekst(38, 800), C.text, 'center'); ctx.restore(); }
  if (totM > 0.01) { ctx.save(); ctx.globalAlpha *= totM; const k = 1 + 0.25 * (1 - totM); circ(ctx, X[3] + 190, yt + 46, 38 * k, rgba('#D8473A', 0.55), '#D8473A', 4); text(ctx, '7', X[3] + 190, yt + 60, fTekst(44, 800), C.text, 'center'); ctx.restore(); }
  ctx.restore(); }

// verticale scoremeter 0..10 met grens; waarden = [[score, kleur, label, u]]
function scoreMeter(ctx, x, y, h, a = 1, grens = 0, waarden = []) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const st = h / 10;
  roundRect(ctx, x - 30, y - h, 60, h, 14); shape(ctx, '#2A3446', C.line, 1.5); ctx.save(); roundRect(ctx, x - 30, y - h, 60, h, 14); ctx.clip(); const g = ctx.createLinearGradient(0, y, 0, y - h); g.addColorStop(0, rgba(C.groen, 0.45)); g.addColorStop(0.5, rgba(C.goud, 0.45)); g.addColorStop(1, rgba('#D8473A', 0.55)); ctx.fillStyle = g; ctx.fillRect(x - 30, y - h, 60, h); ctx.restore();
  for (let i = 0; i <= 10; i += 2) text(ctx, String(i), x - 46, y - i * st + 9, fTekst(24, 600), C.text2, 'right');
  if (grens > 0.01) { ctx.save(); ctx.globalAlpha *= grens; ctx.strokeStyle = C.text; ctx.lineWidth = 4; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(x - 60, y - 5 * st); ctx.lineTo(x + 60, y - 5 * st); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  waarden.forEach(([v, col, lab, u]) => { if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; const yy = y - v * st; ctx.beginPath(); ctx.moveTo(x + 34, yy); ctx.lineTo(x + 58, yy - 16); ctx.lineTo(x + 58, yy + 16); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); text(ctx, lab, x + 72, yy + 11, fTekst(30, 800), col, 'left'); ctx.restore(); });
  ctx.restore(); }

// SBAR-blok; aan 0..1 = licht op
function sbarBlok(ctx, x, y, w, h, letter, naam, inhoud, a = 1, aan = 0, col = C.teal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.06 + 0.22 * aan), rgba(col, 0.3 + 0.7 * aan), 2 + 2 * aan);
  roundRect(ctx, x + 14, y + 14, h - 28, h - 28, 12); shape(ctx, rgba(col, 0.25 + 0.65 * aan), null); text(ctx, letter, x + h / 2, y + h / 2 + 22, fTitel(62), aan > 0.5 ? '#1A2740' : C.text, 'center');
  text(ctx, naam, x + h + 10, y + 46, fTekst(34, 800), C.text, 'left'); if (inhoud) { ctx.save(); ctx.globalAlpha *= clamp(aan * 1.5, 0, 1); text(ctx, inhoud, x + h + 10, y + 88, fTekst(28, 500), C.text2, 'left'); ctx.restore(); } ctx.restore(); }

// lichtbak met longfoto (rechterlong deels wit: ontsteking)
function longfoto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -170, -140, 340, 280, 14); shape(ctx, '#C9D2E0', '#8FA0B5', 3); roundRect(ctx, -150, -120, 300, 240, 8); shape(ctx, '#0D1420', null);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 62, 0, 52, 92, sd * 0.08, 0, 6.283); ctx.fillStyle = '#26324A'; ctx.fill(); }
  ctx.strokeStyle = rgba('#DDE6F0', 0.55); ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(0, -60 + i * 34, 128, 26, 0, 0.15, Math.PI - 0.15); ctx.stroke(); }
  ctx.fillStyle = rgba('#DDE6F0', 0.85); ctx.fillRect(-6, -110, 12, 220); const g = ctx.createRadialGradient(-62, 50, 4, -62, 50, 50); g.addColorStop(0, rgba('#F2F2EE', 0.8)); g.addColorStop(1, rgba('#F2F2EE', 0)); ctx.fillStyle = g; ctx.fillRect(-130, -10, 130, 120); ctx.restore(); }
// infuuszak aan een standaard
function infuus(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -420); ctx.moveTo(-50, -420); ctx.lineTo(50, -420); ctx.stroke();
  roundRect(ctx, -46, -400, 92, 140, 18); shape(ctx, rgba('#E8F2F8', 0.85), '#AFC0D0', 2); ctx.fillStyle = rgba(C.goud, 0.4); ctx.fillRect(-40, -330, 80, 64); text(ctx, 'AB', 0, -350, fTekst(24, 800), '#2E3A55', 'center');
  ctx.strokeStyle = '#CFE4F0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -220); ctx.quadraticCurveTo(0, -150, -90, -120); ctx.stroke(); roundRect(ctx, -8, -240, 16, 30, 4); shape(ctx, rgba('#F2F2EE', 0.4), '#AFC0D0', 1.5);
  const ph = (t * 1.2) % 1; circ(ctx, 0, -236 + ph * 20, 3, '#E0B64A'); ctx.restore(); }
// klein grafiekje: score per dag
function scoreDagen(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const V = [7, 6, 4, 2, 1]; assen(ctx, x, y, w, h, 'DAGEN', 'SCORE');
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); const n = (V.length - 1) * clamp(u, 0, 1);
  for (let i = 0; i <= Math.floor(n); i++) { const xx = x + 30 + i * (w - 60) / (V.length - 1), yy = y + h - V[i] / 8 * h; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  if (n % 1 > 0) { const i = Math.floor(n), f = n % 1; ctx.lineTo(x + 30 + (i + f) * (w - 60) / (V.length - 1), y + h - lerp(V[i], V[i + 1], f) / 8 * h); } ctx.stroke();
  for (let i = 0; i <= Math.floor(n + 0.001); i++) { const xx = x + 30 + i * (w - 60) / (V.length - 1), yy = y + h - V[i] / 8 * h; circ(ctx, xx, yy, 8, PUNTKL[V[i] >= 7 ? 3 : V[i] >= 5 ? 2 : V[i] >= 2 ? 1 : 0]); }
  ctx.restore(); }
// losse saturatiemeter (klemmetje met schermpje), voor rijtjes apparaten
function saturatieKastje(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -60, 140, 56, 18); shape(ctx, '#3A4A66', '#8FA0B5', 3); roundRect(ctx, -70, 6, 140, 56, 18); shape(ctx, '#3A4A66', '#8FA0B5', 3); ctx.fillStyle = '#2A3242'; ctx.fillRect(-78, -20, 18, 40);
  roundRect(ctx, -50, -52, 100, 40, 8); shape(ctx, '#121A26', '#5BA4C9', 2); text(ctx, '93%', 0, -22, fTekst(28, 800), '#7FE0A0', 'center'); circ(ctx, 30, 0, 8, '#FF4A3A'); ctx.restore(); }
// Wat word jij? · Verpleegkunde 1 · Bel je de arts? — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk als patiënt; Verpleegkundige Jesse; Dr. Kim als arts).
// Rode draad: Henk ligt met een longontsteking op de afdeling en gaat in de loop van de dag langzaam achteruit.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function klembord(c, x, y) { c.save(); c.translate(x, y); c.rotate(-0.15); roundRect(c, -34, -46, 68, 92, 6); shape(c, '#C9A35C', '#9A7A44', 2); c.fillStyle = '#F2EEE4'; c.fillRect(-26, -34, 52, 72); c.fillStyle = '#5A6478'; for (let i = 0; i < 5; i++) c.fillRect(-18, -24 + i * 12, 36 - (i % 2) * 12, 4); c.restore(); }
// metingen (exact volgens de kopregel van het script)
const OCHTEND = [['ademfrequentie', '16'], ['saturatie', '96%'], ['pols', '88'], ['bovendruk', '118'], ['temperatuur', '38,4'], ['bewustzijn', 'alert']];
const MIDDAG = [['ademfrequentie', '24'], ['saturatie', '93%'], ['pols', '104'], ['bovendruk', '106'], ['temperatuur', '38,6'], ['bewustzijn', 'alert']];
const SCORE = [['ademfrequentie', '16', 0, '24', 2], ['saturatie', '96%', 0, '93%', 2], ['pols', '88', 0, '104', 1], ['bovendruk', '118', 0, '106', 1], ['temperatuur', '38,4', 1, '38,6', 1], ['bewustzijn', 'alert', 0, 'alert', 0], ['extra zuurstof', 'nee', 0, 'nee', 0]];

Object.assign(SCENES, {
  title(ctx, t) { henkInBed(ctx, 1450, 880, 0.95, { t, adem: 20, meter: 1, spo2: '93%' }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const J = q.on('Jesse', 1, 0.3), M = q.on('middag', 1);
    henkInBed(ctx, 560, 880, 1, { t, a: q.on('Opa', 1, 0.3), adem: t > q.at('middag', 1) ? 24 : 16, meter: J, uit: q.on('moe', 1) > 0.5 ? 'bezorgd' : 'neutraal' });
    naamBij(ctx, 'Opa Henk', 'longontsteking', 560, 210, q.on('Opa', 1) * (1 - J), 'center');
    persoon(ctx, 'jesse', 1010, 880, 500, { t, a: J, kijk: -1, pose: 'vasthouden', hold: klembord, uit: q.on('alarmerend', 1) > 0.5 ? 'denkt' : 'neutraal' });
    naamBij(ctx, 'Verpleegkundige Jesse', '', 1010, 340, J * (1 - q.on('ademt', 1)), 'center');
    const hl = (w) => q.on(w, 1); meetLijst(ctx, 1220, 230, 320, 'OCHTEND', OCHTEND.map(([n, v]) => [n, v, 0]), q.on('Ochtends', 1));
    meetLijst(ctx, 1570, 230, 320, 'MIDDAG', MIDDAG.map(([n, v], i) => [n, v, [hl('ademt'), 0.5 * hl('ademt'), hl('hart'), 0.5 * hl('hart'), 0.5 * hl('moe'), 0][i]]), M, C.koraal);
    chip(ctx, 'geen enkele waarde echt slecht', 1555, 720, C.text2, q.on('alarmerend', 1), 28);
    telefoon(ctx, 1470, 800, 1.9, q.on('arts', 1)); belGolf(ctx, 1500, 790, q.on('arts', 1), t, 1); vraagteken(ctx, 1640, 830, q.on('denk', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('klemmetje', 1, 0.8), A = 1 - F;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; antwoord(ctx, 'Antwoord b');
      henkInBed(ctx, 960, 880, 0.9, { t, adem: 24, meter: 1 });
      const p = q.on('pols', 1), ad = q.on('ademfrequentie', 1), tp = q.on('temperatuur', 1), bw = q.on('bewustzijn', 1);
      hartje(ctx, 330, 330, 0.9, p, t, 1); naamBij(ctx, 'pols · bloeddruk', 'hart en bloedvaten', 330, 490, p, 'center');
      longen(ctx, 1590, 330, 0.95, ad, 0.5 + 0.5 * Math.sin(t * 2.5)); naamBij(ctx, 'ademfrequentie · saturatie', 'longen', 1590, 490, ad, 'center');
      thermometer(ctx, 330, 640, 0.8, tp, 0.66); naamBij(ctx, 'temperatuur', 'afweer', 330, 790, tp, 'center');
      brein(ctx, 1590, 660, 0.42, bw, { t }); naamBij(ctx, 'bewustzijn', 'hersenen', 1590, 790, bw, 'center'); ctx.restore(); }
    if (F > 0.01) { ctx.save(); ctx.globalAlpha *= F; const L = q.on('licht', 1), waarde = t > q.at('93', 1) ? '93%' : '';
      vingerMeter(ctx, 820, 500, 1.15, 1, L, waarde, t, L); naamBij(ctx, 'saturatiemeter', 'op de vinger', 640, 260, 1 - q.on('licht', 1) * 0.0, 'center');
      naamBij(ctx, 'rood licht', 'door de vingertop', 900, 700, L * (1 - q.on('kleurt', 1)), 'center');
      const z1 = q.on('zuurstof', 1), z2 = q.on('zonder', 1);
      ctx.save(); ctx.globalAlpha *= z1; ctx.beginPath(); ctx.ellipse(1500, 360, 120, 70, 0, 0, 6.283); shape(ctx, '#E0403A', '#F08070', 3); ctx.restore(); naamBij(ctx, 'bloed met zuurstof', 'helderrood', 1500, 480, z1, 'center');
      ctx.save(); ctx.globalAlpha *= z2; ctx.beginPath(); ctx.ellipse(1500, 620, 120, 70, 0, 0, 6.283); shape(ctx, '#7A2A44', '#9A4A64', 3); ctx.restore(); naamBij(ctx, 'bloed zonder zuurstof', 'donkerrood', 1500, 740, z2, 'center');
      vraagteken(ctx, 1780, 520, q.on('betekent', 1), 120); ctx.restore(); } },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const C1 = q.on('Zuurstof', 1), Hb = q.on('hemoglobine', 1), S = q.on('saturatie', 1), O = q.on('ontstoken', 1);
    // grote rode bloedcel met 30 hemoglobinemoleculen, 28 beladen
    const cx = 560, cy = 500; if (C1 > 0.01) { ctx.save(); ctx.globalAlpha *= C1; ctx.beginPath(); ctx.ellipse(cx, cy, 320, 260, 0, 0, 6.283); shape(ctx, '#B8303A', '#E0605A', 4); ctx.beginPath(); ctx.ellipse(cx, cy, 170, 120, 0, 0, 6.283); ctx.fillStyle = '#A0283A'; ctx.fill(); ctx.restore(); }
    naamBij(ctx, 'rode bloedcel', '', cx, 220, q.on('bloedcellen', 1), 'center');
    const LEEG = [7, 22]; let n = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const i = r * 6 + c, w = wander(i, t, 5, 0.6), x = cx - 225 + c * 90 + w.x + (r % 2) * 20, y = cy - 180 + r * 90 + w.y; const vol = !LEEG.includes(i);
      hbMol(ctx, x, y, 24, vol, Hb * clamp((t - q.at('hemoglobine', 1)) * 6 - i * 0.15, 0, 1), vol); }
    naamBij(ctx, 'hemoglobine', 'draagt zuurstof', cx, 830, Hb, 'center');
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S * (1 - O); regel(ctx, '28 van de 30 beladen', 1420, 300, 1, C.text, 40, 'center', 700); regel(ctx, '≈ 93%', 1420, 380, 1, C.goud, 64, 'center', 800); ctx.restore(); }
    const g = q.on('gezond', 1) * (1 - O), h = q.on('lager', 1) * (1 - O), fr = v => (v - 85) / 15; balk(ctx, 1080, 560, 700, fr(95), C.groen, 'gezond: 95% of meer', g); balk(ctx, 1080, 680, 700, fr(93), C.oker, 'Henk: 93%', h);
    if (g > 0.01) { ctx.save(); ctx.globalAlpha *= g; ctx.strokeStyle = C.text; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(1080 + 700 * fr(95), 530); ctx.lineTo(1080 + 700 * fr(95), 740); ctx.stroke(); ctx.setLineDash([]); text(ctx, '85%', 1080, 770, fTekst(22, 600), C.text2, 'left'); text(ctx, '100%', 1780, 770, fTekst(22, 600), C.text2, 'right'); text(ctx, '95%', 1080 + 700 * fr(95), 524, fTekst(22, 700), C.text, 'center'); ctx.restore(); }
    longblaasjesVocht(ctx, 1420, 560, 1.15, O, q.on('vocht', 1, 1.2), t); naamBij(ctx, 'ontstoken longblaasjes', 'deels vol vocht', 1550, 790, q.on('vocht', 1), 'center'); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Krijgt', 1, 0.8), A = 1 - K, Z = q.on('Toch', 1, 0.8);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const nu = t > q.at('vierentwintig', 1) - 0.3;
      henkInBed(ctx, 640, 880, 0.95, { t, adem: nu ? 24 : 16, meter: 1 }); persoon(ctx, 'jesse', 1080, 880, 500, { t, kijk: -1, pose: 'denk', uit: 'denkt' });
      horloge(ctx, 1500, 360, 120, 1, t * 6); metaA(ctx, 'EEN HELE MINUUT TELLEN', 1500, 560, q.on('minuut', 1), C.grain, 'center', 24);
      // borstkas gaat omhoog: pijltje op het ritme
      const fr = (nu ? 24 : 16) / 60, b = Math.max(0, Math.sin(t * fr * 6.283)); pijl(ctx, 870, 560, 870, 520 - 30 * b, C.teal, q.on('borstkas', 1) * (0.4 + 0.6 * b), 5, 16);
      tag(ctx, 'ochtend: 16 per minuut', 1500, 680, C.teal, q.on('zestien', 1) * (nu ? 0.5 : 1), 'center', 32); tag(ctx, 'nu: 24 per minuut', 1500, 780, C.koraal, q.on('vierentwintig', 1), 'center', 36);
      chip(ctx, 'verandert vaak als eerste', 640, 200, C.goud, q.on('eerste', 1), 30); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K * (1 - Z);
      bloedvat(ctx, 160, 380, 520, 1, t, 0); tag(ctx, 'minder zuurstof', 420, 300, C.teal, q.on('weinig', 1), 'center', 30); tag(ctx, 'meer koolstofdioxide', 420, 560, C.grain, q.on('koolstofdioxide', 1), 'center', 30);
      const hs = q.on('hersenstam', 1); brein(ctx, 1000, 420, 0.8, 1, { t }); if (hs > 0.01) { const p = 1 + 0.15 * Math.sin(t * 6); circ(ctx, 1000 + 115 * 0.8, 420 + 180 * 0.8, 46 * p, rgba(C.goud, 0.3 * hs)); circ(ctx, 1000 + 115 * 0.8, 420 + 180 * 0.8, 24, rgba(C.goud, 0.8 * hs)); }
      naamBij(ctx, 'hersenstam', 'regelt het ademen', 1100, 650, hs, 'left');
      pijl(ctx, 700, 430, 820, 430, C.line, q.on('koolstofdioxide', 1), 5, 18); pijl(ctx, 1320, 430, 1440, 430, C.goud, q.on('sneller', 1), 5, 18);
      longen(ctx, 1640, 420, 1.1, q.on('sneller', 1), 0.5 + 0.5 * Math.sin(t * 5)); naamBij(ctx, 'sneller ademen', '', 1640, 600, q.on('sneller', 1), 'center');
      tag(ctx, 'saturatie op peil houden', 1640, 720, C.groen, q.on('peil', 1), 'center', 28); tag(ctx, 'film: Uitscheiding en evenwicht', 420, 720, C.teal, q.on('koolstofdioxide', 1, 1), 'center', 24); ctx.restore(); }
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; meetLijst(ctx, 300, 230, 420, 'VAAK OVERGESLAGEN', MIDDAG.map(([n, v], i) => [n, i === 0 ? '?' : v, i === 0 ? 1 : 0]), 1, C.koraal);
      saturatieKastje(ctx, 1000, 420, 0.9); thermometer(ctx, 1240, 440, 0.8, 1, 0.66); bloeddrukMeter(ctx, 1460, 440, 0.9, 1, 0.5);
      horloge(ctx, 1240, 690, 70, q.on('apparaat', 1), t * 6); regel(ctx, 'ademfrequentie: alleen kijken en tellen', 1240, 830, q.on('apparaat', 1), C.goud, 34, 'center', 700); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Jesse', 1, 0.3);
    metaA(ctx, 'WAARSCHUWINGSSCORE · ZOALS NEWS2', 160, 140, q.on('waarschuwingsscore', 1), C.grain, 'left', 24);
    [0, 1, 2, 3].forEach(p => { const u = p === 0 ? q.on('nul', 1) : p === 3 ? q.on('drie', 1) : q.on('tot', 1); if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, 1000 + p * 80, 104, 60, 50, 10); shape(ctx, rgba(PUNTKL[p], p ? 0.85 : 0.25), PUNTKL[p], 2); text(ctx, String(p), 1030 + p * 80, 140, fTekst(30, 800), p ? '#1A2740' : C.text, 'center'); ctx.restore(); });
    metaA(ctx, 'PUNTEN', 980, 140, q.on('nul', 1), C.text2, 'right', 22);
    const ks = [q.on('ademfrequentie', 1), q.on('saturatie', 1), q.on('pols', 1), q.on('bloeddruk', 1), q.on('temperatuur', 1), q.on('krijgen', 2), q.on('krijgen', 2)];
    const hlM = [0, 1, 2, 3, 4].map(i => { const t0 = [q.at('ademfrequentie', 1), q.at('saturatie', 1), q.at('pols', 1), q.at('bloeddruk', 1), q.at('temperatuur', 1)][i]; return clamp(1 - Math.abs(t - t0 - 0.6) / 1.4, 0, 1); }).concat([0, 0]);
    scoreTabel(ctx, 180, 270, SCORE, { a: q.on('Elke', 1), uO: q.on('Ochtends', 1), uM: ks, hlM, totO: q.on('één', 1), totM: q.on('zeven', 1) });
    const S2 = q.on('samen', 2); if (S2 > 0.01) { ctx.save(); ctx.globalAlpha *= S2; roundRect(ctx, 820, 278, 340, 7 * 56 + 96, 16); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }
    scoreMeter(ctx, 1350, 780, 520, q.on('Ochtends', 1), q.on('grens', 1), [[1, C.groen, 'ochtend 1', q.on('één', 1)], [7, '#E8675A', 'middag 7', q.on('zeven', 1)]]);
    naamBij(ctx, 'grens', 'arts bellen', 1420, 590, q.on('grens', 1), 'left'); klokje(ctx, 1750, 560, 34, clamp((t - q.at('vaste', 1)) / 3, 0, 1), q.on('vaste', 1) * (1 - V));
    persoon(ctx, 'jesse', 1800, 880, 470, { t, a: V, kijk: -1, pose: 'denk', uit: 'denkt' }); chip(ctx, 'niet pluis? ook bellen', 1760, 330, C.goud, q.on('lage', 1), 28); },

  // ---------- H4 ----------
  s09(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Kim', 1, 0.3);
    persoon(ctx, 'jesse', 520, 880, 520, { t, kijk: 1, pose: 'denk', uit: 'praat', hold: (c, x, y) => telefoon(c, x, y - 10, 1.4, 1, 0.3) });
    naamBij(ctx, 'Verpleegkundige Jesse', '', 520, 300, 1 - q.on('kort', 1), 'center');
    persoon(ctx, 'kim', 1400, 880, 520, { t, a: K, kijk: -1, pose: 'denk', uit: 'neutraal', hold: (c, x, y) => telefoon(c, x, y - 10, 1.4, 1, -0.3) });
    naamBij(ctx, 'Dr. Kim', 'arts', 1400, 300, K * (1 - q.on('kort', 1)), 'center'); belGolf(ctx, 700, 430, K, t, 1); belGolf(ctx, 1220, 430, K, t, -1);
    chip(ctx, 'kort', 880, 250, C.teal, q.on('kort', 1), 32); chip(ctx, 'niets vergeten', 1060, 250, C.teal, q.on('ontbreken', 1), 32); vraagteken(ctx, 960, 560, q.on('eerste', 1), 140); },

  s11(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const B = q.on('SBAR', 1);
    persoon(ctx, 'jesse', 230, 880, 440, { t, kijk: 1, pose: 'denk', uit: 'praat', hold: (c, x, y) => telefoon(c, x, y - 8, 1.2, 1, 0.3) });
    persoon(ctx, 'kim', 1720, 880, 440, { t, kijk: -1, pose: 'denk', uit: t > q.at('meteen', 1) ? 'blij' : 'neutraal', hold: (c, x, y) => telefoon(c, x, y - 8, 1.2, 1, -0.3) });
    const ts = [q.at('situatie', 1), q.at('achtergrond', 1), q.at('beoordeling', 1), q.at('aanbeveling', 1), q.at('Zo', 1)];
    const aan = i => { const nu = t >= ts[i] && t < ts[i + 1] ? 1 : t >= ts[i + 1] ? 0.4 : 0; return nu * clamp((t - ts[i]) / 0.5, 0, 1) + (t >= ts[4] ? 0.6 : 0); };
    const D = [['S', 'Situatie', 'wie je bent · over wie je belt · wat er is', C.teal], ['B', 'Achtergrond', 'sinds gisteren longontsteking · hartfalen', C.paars], ['A', 'Beoordeling', 'score van 1 naar 7 · longontsteking erger', C.oker], ['R', 'Aanbeveling', 'wilt u nu meteen komen kijken?', C.koraal]];
    D.forEach(([l, n, c, col], i) => sbarBlok(ctx, 420, 200 + i * 140, 1080, 120, l, n, c, B * clamp((t - q.at('SBAR', 1)) * 4 - i, 0, 1), clamp(aan(i), 0, 1), col));
    klokje(ctx, 960, 820, 40, clamp((t - q.at('minuut', 1)) / 1.5, 0, 1), q.on('minuut', 1)); regel(ctx, 'in één minuut', 1020, 834, q.on('minuut', 1), C.text, 34, 'left', 700); },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('dagen', 1);
    persoon(ctx, 'kim', 330, 880, 500, { t, kijk: 1, pose: 'wijs', uit: D > 0.5 ? 'blij' : 'neutraal' }); naamBij(ctx, 'Dr. Kim', '', 330, 340, 1 - q.on('Henk', 1), 'center');
    henkInBed(ctx, 820, 880, 0.92, { t, adem: D > 0.5 ? 16 : 22, meter: 1, o2: q.on('zuurstof', 1), uit: D > 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'neusbrilletje', 'extra zuurstof', 765, 400, q.on('zuurstof', 1) * (1 - q.on('longfoto', 1)), 'right');
    longfoto(ctx, 1600, 300, 0.85, q.on('longfoto', 1)); naamBij(ctx, 'longfoto', '', 1600, 460, q.on('longfoto', 1) * (1 - D), 'center');
    infuus(ctx, 1170, 860, 1, q.on('antibioticum', 1), t); naamBij(ctx, 'antibioticum', 'aangepast', 1240, 520, q.on('antibioticum', 1) * (1 - D), 'left');
    scoreDagen(ctx, 1400, 520, 420, 240, D, clamp((t - q.at('dagen', 1)) / 1.6, 0, 1)); },

  s13(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'jesse', 360, 880, 540, { t, kijk: 1, pose: 'vasthouden', hold: klembord, uit: 'blij' });
    [['meten', 'meten'], ['samen lezen', 'lezen'], ['op tijd bellen', 'bel']].forEach(([s2, w], i) => { const u = q.on(w, 1); if (u <= 0.01) return; ctx.save(); ctx.globalAlpha *= u; const x = 720 + i * 390; roundRect(ctx, x, 180, 350, 96, 14); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); circ(ctx, x + 46, 228, 26, rgba(C.goud, 0.7)); text(ctx, String(i + 1), x + 46, 240, fTekst(32, 800), '#1A2740', 'center'); text(ctx, s2, x + 90, 240, fTekst(34, 700), C.text, 'left'); ctx.restore(); });
    const mb = q.on('mbo', 1), hb = q.on('hbo', 1), vw = q.on('vwo', 1);
    paneel(ctx, 720, 360, 520, 300, 'MBO', mb); regel(ctx, 'mbo-verpleegkunde', 980, 480, mb, C.text, 40, 'center', 800); regel(ctx, 'niveau 4 · vier jaar', 980, 550, mb, C.text2, 32, 'center', 600);
    paneel(ctx, 1300, 360, 520, 300, 'HBO', hb); regel(ctx, 'hbo-verpleegkunde', 1560, 480, hb, C.text, 40, 'center', 800); regel(ctx, 'bachelor · vier jaar', 1560, 550, hb, C.text2, 32, 'center', 600);
    if (vw > 0.01) { ctx.save(); ctx.globalAlpha *= vw; roundRect(ctx, 1300, 360, 520, 300, 16); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); } tag(ctx, 'met een vwo-diploma', 1560, 630, C.goud, vw, 'center', 28);
    regel(ctx, 'beide: BIG-geregistreerd verpleegkundige', 1270, 760, q.on('jaar', 2), C.text2, 30, 'center', 600); }
});
