
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
// Wat word jij? · Verpleegkunde en Fysiotherapie · Hoe weefsel herstelt — eigen tekeningen (20 okt 2026)

const WK = { opper: '#D9AC8C', opperD: '#C49274', basaal: '#B07A60', kernP: '#6E5A9E', leder: '#6B4652', vezel: '#A88088', bloed: '#B23A3A', bloedD: '#8A2A2A', ader: '#6A7FB0',
  korst: '#6B3A26', fibrine: '#EAD9A0', wbc: '#ECE8F4', bact: '#7FC48F', granu: '#B8707A', litteken: '#D2A6A6', pees: '#EDE3C8', kraak: '#CFE0E8', bot: '#E6D8B8', spier: '#B5524A' };

function ease01(u) { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); }

// ===== huid in doorsnede met een wond die herstelt =====
// st: bloed, korst, wbc, bact, rood, fib, vaat, epi, verbouw (alle 0..1)
function huidWond(ctx, x, y, w, h, t, st = {}) {
  const a = st.a == null ? 1 : st.a; if (a <= 0.01) return {}; const S = Object.assign({ bloed: 0, korst: 0, wbc: 0, bact: 0, rood: 0, fib: 0, vaat: 0, epi: 0, verbouw: 0, wond: 1 }, st);
  ctx.save(); ctx.globalAlpha *= a;
  const yE0 = y + 40, eT = h * 0.15, cx = x + w / 2, wr = w * 0.15, dW = h * 0.5, yW = yE0 + dW, yV = yE0 + h * 0.72;
  const wondPad = () => { ctx.beginPath(); ctx.moveTo(cx - wr, yE0 - 2); ctx.bezierCurveTo(cx - wr * 0.95, yE0 + dW * 0.75, cx - wr * 0.5, yW, cx, yW); ctx.bezierCurveTo(cx + wr * 0.5, yW, cx + wr * 0.95, yE0 + dW * 0.75, cx + wr, yE0 - 2); ctx.closePath(); };
  // weefselvlak met afgeronde onderhoeken
  ctx.save(); ctx.beginPath(); ctx.moveTo(x, yE0); ctx.lineTo(x + w, yE0); ctx.lineTo(x + w, y + h - 30); ctx.quadraticCurveTo(x + w, y + h, x + w - 30, y + h); ctx.lineTo(x + 30, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - 30); ctx.closePath(); ctx.clip();
  // lederhuid
  ctx.fillStyle = WK.leder; ctx.fillRect(x, yE0, w, h);
  ctx.strokeStyle = rgba(WK.vezel, 0.55); ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const yy = yE0 + eT + 40 + i * (h - eT - 60) / 9; ctx.beginPath(); for (let k = 0; k <= 36; k++) { const xx = x + k * w / 36, py = yy + Math.sin(k * 0.8 + i * 1.9) * 7; k ? ctx.lineTo(xx, py) : ctx.moveTo(xx, py); } ctx.stroke(); }
  // diep bloedvat + haarvaatjes (lusjes vlak onder de opperhuid)
  ctx.strokeStyle = WK.bloed; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, yV); for (let k = 0; k <= 30; k++) ctx.lineTo(x + k * w / 30, yV + Math.sin(k * 0.6) * 6); ctx.stroke();
  const lussen = []; for (let xx = x + 50; xx < x + w - 30; xx += 92) lussen.push(xx);
  lussen.forEach((xx, i) => { if (Math.abs(xx - cx) < wr + 26) return; const top = yE0 + eT + 14;
    ctx.lineWidth = 5; ctx.strokeStyle = WK.bloed; ctx.beginPath(); ctx.moveTo(xx - 10, yV); ctx.bezierCurveTo(xx - 14, yV - 60, xx - 12, top + 30, xx - 10, top + 10); ctx.arc(xx, top + 10, 10, Math.PI, 0); ctx.strokeStyle = WK.bloed; ctx.stroke();
    ctx.strokeStyle = WK.ader; ctx.beginPath(); ctx.moveTo(xx + 10, top + 10); ctx.bezierCurveTo(xx + 12, top + 30, xx + 14, yV - 60, xx + 10, yV); ctx.stroke(); });
  // ontstekingsgloed rond de wond
  if (S.rood > 0.01) { const g = ctx.createRadialGradient(cx, yE0 + dW * 0.4, wr * 0.6, cx, yE0 + dW * 0.4, wr * 2.6); g.addColorStop(0, rgba('#E04A3A', 0.55 * S.rood)); g.addColorStop(1, rgba('#E04A3A', 0)); ctx.fillStyle = g; ctx.fillRect(x, yE0, w, h); }
  // opperhuid met cellen; onderste (basale) laag donkerder
  ctx.fillStyle = WK.opper; ctx.fillRect(x, yE0, w, eT);
  const cel = (xx, yy, rx, ry, col, kern = true) => { ctx.beginPath(); ctx.ellipse(xx, yy, rx, ry, 0, 0, 6.283); shape(ctx, col, rgba('#8A5A44', 0.6), 1.5); if (kern) circ(ctx, xx, yy, Math.min(rx, ry) * 0.42, rgba(WK.kernP, 0.8)); };
  const rijen = 3; for (let r = 0; r < rijen; r++) { const ry = eT / (rijen + 0.6) / 2, yy = yE0 + ry + 3 + r * ry * 2.05, rx = r === 0 ? ry * 2.2 : ry * 1.4;
    for (let xx = x + rx + (r % 2) * rx; xx < x + w; xx += rx * 2.05) { if (S.wond > 0.5 && Math.abs(xx - cx) < wr + rx * 0.4) continue; cel(xx, yy, rx, ry * 0.92, r === rijen - 1 ? WK.basaal : (r === 0 ? '#E6C2A6' : WK.opperD), r > 0); } }
  // de wond
  if (S.wond > 0.01) { ctx.save(); wondPad(); ctx.fillStyle = (S.bloed > 0.01 || S.fib > 0.01) ? '#5A1E24' : '#24161E'; ctx.fill(); ctx.clip();
    if (S.bloed > 0.01) { ctx.fillStyle = rgba(WK.bloed, 0.85 * S.bloed); ctx.fillRect(x, yE0 - 10, w, h);
      for (let i = 0; i < 26; i++) { const px = cx - wr + hash(i * 3) * wr * 2, py = yE0 + hash(i * 5 + 1) * dW; ctx.beginPath(); ctx.ellipse(px, py, 11, 8, hash(i) * 3, 0, 6.283); shape(ctx, rgba('#D04848', S.bloed), rgba('#7A1E1E', S.bloed), 1.5); }
      for (let i = 0; i < 14; i++) { const px = cx - wr + hash(i * 7 + 2) * wr * 2, py = yE0 + hash(i * 11 + 3) * dW; circ(ctx, px, py, 4.5, rgba('#E8C8D8', S.bloed)); }
      const fd = clamp(S.bloed * 1.4 - 0.3, 0, 1); ctx.strokeStyle = rgba(WK.fibrine, 0.9 * fd); ctx.lineWidth = 2.5;
      for (let i = 0; i < 18; i++) { const px = cx - wr + hash(i * 13 + 4) * wr * 2, py = yE0 + hash(i * 17 + 5) * dW, an = hash(i * 19) * 3.14, L = 70 + 50 * hash(i * 23); ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); } }
    if (S.fib > 0.01) { const lvl = yW - (dW + 20) * S.fib; ctx.fillStyle = WK.granu; ctx.fillRect(x, lvl, w, h); wondPad(); ctx.strokeStyle = WK.granu; ctx.lineWidth = 2 * wr * 0.75 * ease01(S.fib * 1.2); ctx.stroke();
      const orde = S.verbouw; ctx.strokeStyle = rgba('#F0D8D0', 0.85); ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let i = 0; i < 40; i++) { const px = cx - wr + hash(i * 29 + 1) * wr * 2, py = yE0 + 10 + hash(i * 31 + 2) * (dW - 10); if (py < lvl) continue; const an = (hash(i * 37) - 0.5) * 3.14 * (1 - orde), L = 26 + 18 * hash(i * 41) + 20 * orde; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, py - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); ctx.stroke(); }
      for (let i = 0; i < 6; i++) { const px = cx - wr * 0.7 + hash(i * 43) * wr * 1.4, py = yE0 + dW * 0.3 + hash(i * 47) * dW * 0.6; if (py < lvl + 10) continue; ctx.beginPath(); ctx.ellipse(px, py, 26, 9, (hash(i * 53) - 0.5) * 2 * (1 - orde), 0, 6.283); shape(ctx, '#E8B0A0', '#A86A60', 1.5); circ(ctx, px, py, 5, WK.kernP); } }
    if (S.vaat > 0.01) { ctx.strokeStyle = WK.bloed; ctx.lineWidth = 5; [-0.55, -0.15, 0.25, 0.6].forEach((f, i) => { const bx = cx + f * wr, L = dW * 0.78 * clamp(S.vaat * 1.3 - i * 0.1, 0, 1); if (L < 4) return; ctx.beginPath(); ctx.moveTo(bx - 7, yW + 10); ctx.quadraticCurveTo(bx - 14, yW - L * 0.5, bx - 7, yW - L); ctx.arc(bx, yW - L, 7, Math.PI, 0); ctx.quadraticCurveTo(bx + 14, yW - L * 0.5, bx + 7, yW + 10); ctx.stroke(); }); }
    if (S.bact > 0.01) for (let i = 0; i < 9; i++) { const px = cx - wr * 0.7 + hash(i * 59) * wr * 1.4, py = yE0 + 20 + hash(i * 61) * dW * 0.45, an = hash(i * 67) * 3; ctx.save(); ctx.translate(px + Math.sin(t * 1.3 + i) * 3, py); ctx.rotate(an); roundRect(ctx, -12, -5, 24, 10, 5); shape(ctx, rgba(WK.bact, S.bact), rgba('#4A8A5A', S.bact), 1.5); ctx.restore(); }
    ctx.restore(); }
  // witte bloedcellen: uit de haarvaatjes naast de wond naar binnen
  if (S.wbc > 0.01) for (let i = 0; i < 6; i++) { const kant = i % 2 ? 1 : -1, sx = cx + kant * (wr + 70 + (i % 3) * 30), sy = yE0 + eT + 30 + (i % 3) * 30, tx = cx + kant * wr * (0.15 + 0.2 * (i % 3)), ty = yE0 + 40 + (i % 3) * dW * 0.22;
    const u = ease01(S.wbc * 1.4 - i * 0.07), wd = wander(i, t, 5, 0.6), px = lerp(sx, tx, u) + wd.x, py = lerp(sy, ty, u) + wd.y; ctx.save(); ctx.globalAlpha *= clamp(S.wbc * 3, 0, 1);
    circ(ctx, px, py, 20, WK.wbc, '#B8B0CC', 2); ctx.fillStyle = '#7A5AA8'; [[-6, -4], [5, -5], [0, 6]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.ellipse(px + dx, py + dy, 6, 5, 0, 0, 6.283); ctx.fill(); }); ctx.restore(); }
  // opperhuid schuift over de wond (tongen van links en rechts)
  if (S.epi > 0.01) { const L = wr * S.epi; [-1, 1].forEach(k => { const x0 = cx + k * wr, x1 = cx + k * (wr - L - 4); ctx.fillStyle = WK.opper; ctx.beginPath(); ctx.moveTo(x0, yE0 + 4); ctx.lineTo(x1, yE0 + 4); ctx.quadraticCurveTo(x1 - k * 10, yE0 + eT * 0.5, x1, yE0 + eT * 0.9); ctx.lineTo(x0, yE0 + eT); ctx.closePath(); ctx.fill();
      for (let xx = x0 - k * 12; k < 0 ? xx < x1 : xx > x1; xx -= k * 26) cel(xx, yE0 + eT * 0.62, 12, 10, WK.basaal, true); }); }
  ctx.restore();
  // korstje bovenop
  if (S.korst > 0.01) { ctx.save(); ctx.globalAlpha *= S.korst; ctx.beginPath(); ctx.moveTo(cx - wr * 1.08, yE0 + 6); for (let k = 0; k <= 14; k++) { const xx = cx - wr * 1.08 + k * wr * 2.16 / 14; ctx.lineTo(xx, yE0 - 14 - 8 * hash(k * 7)); } ctx.lineTo(cx + wr * 1.08, yE0 + 6); ctx.quadraticCurveTo(cx, yE0 + eT * 1.3, cx - wr * 1.08, yE0 + 6); shape(ctx, WK.korst, '#4A2618', 2);
    ctx.fillStyle = rgba('#3A1E14', 0.6); for (let i = 0; i < 16; i++) circ(ctx, cx - wr + hash(i * 71) * wr * 2, yE0 - 4 + hash(i * 73) * eT * 0.6, 3 + 2 * hash(i), rgba('#3A1E14', 0.6)); ctx.restore(); }
  // litteken: licht plekje, draden in één richting
  if (S.litteken > 0.01) { ctx.save(); ctx.globalAlpha *= S.litteken; ctx.beginPath(); ctx.ellipse(cx, yE0 + dW * 0.42, wr * 0.95, dW * 0.4, 0, 0, 6.283); ctx.fillStyle = rgba(WK.litteken, 0.55); ctx.fill(); ctx.strokeStyle = rgba('#F4E4E0', 0.9); ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { const yy = yE0 + dW * 0.12 + i * dW * 0.09, ww = wr * 0.9 * Math.sqrt(1 - Math.pow((yy - yE0 - dW * 0.42) / (dW * 0.42), 2)); ctx.beginPath(); ctx.moveTo(cx - ww, yy); ctx.lineTo(cx + ww, yy); ctx.stroke(); } ctx.restore(); }
  // warmte boven de wond
  if (S.rood > 0.01) { ctx.save(); ctx.globalAlpha *= S.rood; ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let k = -1; k <= 1; k++) { const bx = cx + k * 60, ph = (t * 0.8 + k * 0.3) % 1; ctx.globalAlpha = a * S.rood * (1 - ph); ctx.beginPath(); for (let j = 0; j <= 12; j++) { const yy = yE0 - 30 - j * 6 - ph * 30; ctx.lineTo(bx + Math.sin(j * 0.8 + t * 3) * 8, yy); } ctx.stroke(); } ctx.restore(); }
  ctx.restore();
  return { cx, yE0, eT, wr, dW, yW };
}

// ===== tijdlijn met vier fasen (overlappend); act = index van de actieve fase (of -1), u = hoe ver ingevuld =====
const FASEN = [['stolling', 'minuten', WK.bloed], ['ontsteking', 'dagen', C.koraal], ['opbouw', 'weken', C.goud], ['verbouwen', 'maanden', C.teal]];
function faseLijn(ctx, x, y, w, a = 1, act = -1, n = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const sw = w / 4;
  FASEN.forEach(([nm, tijd, col], i) => { if (i >= n) return; const x0 = x + i * sw - (i ? 18 : 0), ww = sw + (i ? 18 : 0) + (i < 3 ? 18 : 0), aan = act < 0 || act === i;
    roundRect(ctx, x0, y, ww, 46, 23); shape(ctx, rgba(col, aan ? 0.55 : 0.16), rgba(col, aan ? 1 : 0.45), aan ? 2.5 : 1.5);
    text(ctx, nm, x + i * sw + sw / 2, y + 33, fTekst(28, 700), aan ? C.text : C.text2, 'center'); metaText(ctx, tijd, x + i * sw + sw / 2, y + 84, aan ? C.grain : rgba(C.grain, 0.45), 'center', 20); });
  ctx.restore(); }

// ===== knie / hiel op een castfiguur (zelfde maten als persoon()) =====
function lijfMaat(id, x, y, h) { const P = CAST[id]; const h2 = h * (P.lengte || 1), hh = h2 / (P.kop || 6.1), top = y - h2, heupY = top + hh * 3.45, hw2 = hh * (P.heupK || 1.45), sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8));
  const kn = heupY + (y - heupY) * 0.42; return { hh, top, heupY, kn, hw2, sw, schouderY: top + hh * 1.42, been: s => x + s * hw2 * 0.24 }; }
function knieWond(ctx, id, x, y, h, s = 1, a = 1, litteken = 0) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h), kx = M.been(s) + s * M.hh * 0.03, ky = M.kn + M.hh * 0.32; ctx.save(); ctx.globalAlpha *= a;
  if (litteken < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - litteken; ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * 0.17, M.hh * 0.14, 0, 0, 6.283); ctx.fillStyle = '#C0443A'; ctx.fill(); ctx.strokeStyle = '#E88070'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(kx - M.hh * 0.12, ky + i * 6 - 4); ctx.lineTo(kx + M.hh * 0.12, ky + i * 6 + 4); ctx.stroke(); } ctx.restore(); }
  if (litteken > 0.01) { ctx.save(); ctx.globalAlpha *= litteken; ctx.beginPath(); ctx.ellipse(kx, ky, M.hh * 0.12, M.hh * 0.06, 0.2, 0, 6.283); ctx.fillStyle = '#F2D6CC'; ctx.fill(); ctx.restore(); }
  ctx.restore(); return { x: kx, y: ky }; }
function hielPunt(id, x, y, h, s = 1) { const M = lijfMaat(id, x, y, h); return { x: M.been(s) + s * M.hh * 0.05, y: y - M.hh * 0.4, hh: M.hh }; }
function flits(ctx, x, y, r, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const an = i * 0.785 + 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); }

// krukken en loopschoen op Sam
function krukken(ctx, id, x, y, h, a = 1) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = M.hh * 0.11; ctx.lineCap = 'round';
  for (const s of [-1, 1]) { const tx = x + s * M.sw * 0.62, ty = M.schouderY + M.hh * 1.6, bx = x + s * M.sw * 0.85; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(bx, y - 4); ctx.stroke(); ctx.strokeStyle = '#5A6274'; ctx.beginPath(); ctx.moveTo(tx - s * 4, ty - 2); ctx.lineTo(tx + s * 26, ty + 6); ctx.stroke(); ctx.strokeStyle = '#9AA3B2'; } ctx.restore(); }
function loopschoen(ctx, id, x, y, h, s = 1, a = 1) { if (a <= 0.01) return; const M = lijfMaat(id, x, y, h), lx = M.been(s) + s * M.hh * 0.08 + M.hh * 0.06; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, lx - M.hh * 0.32, y - M.hh * 1.55, M.hh * 0.64, M.hh * 1.45, M.hh * 0.18); shape(ctx, '#3A3F4E', '#5A6274', 2);
  ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.ellipse(lx, y - M.hh * 0.14, M.hh * 0.52, M.hh * 0.2, 0, Math.PI, 0); ctx.lineTo(lx + M.hh * 0.52, y); ctx.lineTo(lx - M.hh * 0.52, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#8A93A6'; for (let i = 0; i < 3; i++) ctx.fillRect(lx - M.hh * 0.34, y - M.hh * (1.35 - i * 0.4), M.hh * 0.68, M.hh * 0.08); ctx.restore(); }

// ===== onderbeen van opzij met kuitspier en achillespees (huid van Sam) =====
// o: scheur 0..1, schoen 0..1 (loopschoen met hakje: voet in spitsstand), tenen 0..1 (op de tenen staan), huid
function beenZij(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { scheur = 0, schoen = 0, tenen = 0, huid = '#7A5440', t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  // vloer
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-160, 44); ctx.lineTo(240, 44); ctx.stroke();
  // draaien: schoen = voet in spitsstand op een hak, tenen = hiel omhoog (draaipunt bij de tenen)
  const teen = [150, 40]; const an = -tenen * 0.55; const rot = (px, py, ox, oy, aa) => [ox + (px - ox) * Math.cos(aa) - (py - oy) * Math.sin(aa), oy + (px - ox) * Math.sin(aa) + (py - oy) * Math.cos(aa)];
  const enkel = [0, -tenen * 74 - schoen * 40];
  const voetHoek = tenen * 0.52 + schoen * 0.38;
  ctx.save(); ctx.translate(enkel[0], enkel[1]);
  // been
  const bol = 1 + tenen * 0.18 + (schoen > 0 ? 0 : 0);
  ctx.beginPath(); ctx.moveTo(26, -340); ctx.lineTo(20, -6); ctx.lineTo(-26, -6); ctx.bezierCurveTo(-32, -80, -76 * bol, -150, -78 * bol, -230); ctx.bezierCurveTo(-80 * bol, -300, -50, -340, -36, -340); ctx.closePath(); shape(ctx, huid, null);
  // kuitspier (kijkje onder de huid)
  ctx.beginPath(); ctx.moveTo(-30, -330); ctx.bezierCurveTo(-70 * bol, -300, -72 * bol, -200, -34, -130); ctx.bezierCurveTo(-14, -170, -8, -280, -6, -320); ctx.closePath(); shape(ctx, rgba(WK.spier, 0.9), '#8A3A34', 2);
  ctx.strokeStyle = rgba('#E07A6A', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-20 - i * 8, -310 + i * 6); ctx.quadraticCurveTo(-50 * bol + i * 4, -220, -30 - i * 2, -150 + i * 4); ctx.stroke(); }
  ctx.restore();
  // voet (draait om de enkel)
  const hielL = rot(-32, 8, 0, 0, voetHoek);
  ctx.save(); ctx.translate(enkel[0], enkel[1]); ctx.rotate(voetHoek); ctx.beginPath(); ctx.moveTo(22, -14); ctx.bezierCurveTo(70, 0, 120, 14, 152, 22); ctx.quadraticCurveTo(160, 38, 146, 42); ctx.lineTo(-20, 42); ctx.bezierCurveTo(-46, 40, -50, 10, -30, -6); ctx.closePath(); shape(ctx, huid, null); ctx.restore();
  // achillespees: van de kuitspier naar de hiel
  const p0 = [enkel[0] - 32, enkel[1] - 132], p1 = [enkel[0] + hielL[0], enkel[1] + hielL[1]], mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
  const gat = scheur * 34 * (1 - 0.7 * schoen);
  ctx.strokeStyle = WK.pees; ctx.lineWidth = 15; ctx.lineCap = 'round';
  if (scheur < 0.01) { ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
  else { const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(mid[0] - ux * gat / 2, mid[1] - uy * gat / 2); ctx.moveTo(mid[0] + ux * gat / 2, mid[1] + uy * gat / 2); ctx.lineTo(...p1); ctx.stroke();
    ctx.lineWidth = 3; for (const k of [-1, 1]) for (let j = -2; j <= 2; j++) { const bx = mid[0] + k * ux * gat / 2, by = mid[1] + k * uy * gat / 2; ctx.beginPath(); ctx.moveTo(bx + j * 3, by); ctx.lineTo(bx + j * 5 - k * ux * 12 * scheur, by - k * uy * 12 * scheur + j); ctx.stroke(); } }
  // loopschoen met hakje
  if (schoen > 0.01) { ctx.save(); ctx.globalAlpha *= schoen; ctx.fillStyle = '#2A2F3E'; ctx.beginPath(); ctx.moveTo(-70, 44); ctx.lineTo(200, 44); ctx.lineTo(200, 18); ctx.lineTo(150, 14); ctx.lineTo(-60, -40); ctx.lineTo(-70, -40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(-66, 30); ctx.lineTo(60, 30); ctx.lineTo(-56, -30); ctx.lineTo(-66, -30); ctx.closePath(); ctx.globalAlpha *= 0.85; ctx.fill(); ctx.globalAlpha /= 0.85;
    ctx.strokeStyle = '#5A6274'; ctx.lineWidth = 6; roundRect(ctx, -70, -300, 120, 290, 30); ctx.stroke(); ctx.fillStyle = rgba('#3A3F4E', 0.25); ctx.fill();
    ctx.fillStyle = '#8A93A6'; for (let i = 0; i < 3; i++) ctx.fillRect(-72, -260 + i * 80, 124, 12); ctx.restore(); }
  ctx.restore(); return { pees: [x + mid[0] * s, y + mid[1] * s] }; }

// ===== eiwitdraden in een pees: orde 0 = kriskras, 1 = in de lengte; trek = pijlen aan de uiteinden =====
function vezelPaneel(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; const { orde = 0, trek = 0, rood = 0, dicht = 1 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 24); shape(ctx, '#3E2E38', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 24); ctx.clip();
  ctx.lineCap = 'round'; const N = Math.round(46 * dicht);
  for (let i = 0; i < N; i++) { const px = x + 40 + hash(i * 7 + 1) * (w - 80), py = y + 30 + hash(i * 11 + 2) * (h - 60), r0 = (hash(i * 13) - 0.5) * 3.0, an = r0 * (1 - ease01(orde)), L = 50 + 30 * hash(i * 17) + 60 * ease01(orde);
    const ry = orde > 0.5 ? py : py; ctx.strokeStyle = rood > 0.01 && hash(i * 3) < 0.5 ? rgba('#E06A5A', 0.95) : rgba(WK.pees, 0.95); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - Math.cos(an) * L, ry - Math.sin(an) * L); ctx.lineTo(px + Math.cos(an) * L, ry + Math.sin(an) * L); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { const px = x + 80 + hash(i * 23) * (w - 160), py = y + 50 + hash(i * 29) * (h - 100); ctx.beginPath(); ctx.ellipse(px, py, 30, 9, (hash(i * 31) - 0.5) * 2.5 * (1 - orde), 0, 6.283); shape(ctx, '#D89A8A', '#A86A60', 1.5); circ(ctx, px, py, 5, WK.kernP); }
  ctx.restore();
  if (trek > 0.01) { const d = 10 * Math.sin(t * 3); pijl(ctx, x - 20, y + h / 2, x - 100 - d, y + h / 2, C.goud, trek, 7, 22); pijl(ctx, x + w + 20, y + h / 2, x + w + 100 + d, y + h / 2, C.goud, trek, 7, 22); }
  ctx.restore(); }

// ===== tegels: huid, pees, kraakbeen, hartspier =====
function tegel(ctx, x, y, w, h, soort, t, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); ctx.fillStyle = '#22314E'; ctx.fill(); ctx.save(); roundRect(ctx, x, y, w, h, 22); ctx.clip();
  if (soort === 'huid') { const yE = y + 40, eT = 70; ctx.fillStyle = WK.leder; ctx.fillRect(x, yE, w, h); ctx.fillStyle = WK.opper; ctx.fillRect(x, yE, w, eT);
    for (let r = 0; r < 2; r++) for (let xx = x + 22 + r * 18; xx < x + w; xx += 40) { ctx.beginPath(); ctx.ellipse(xx, yE + 14 + r * 20, 18, 9, 0, 0, 6.283); shape(ctx, r ? WK.opperD : '#E6C2A6', rgba('#8A5A44', 0.5), 1.2); }
    const yb = yE + eT - 14, deel = o.deel || 0;
    for (let xx = x + 20, i = 0; xx < x + w; xx += 34, i++) { const ph = deel > 0.01 ? ((t * 0.35 + i * 0.27) % 1) : 0, actief = deel > 0.01 && i % 3 === 1; circ(ctx, xx, yb, 14, WK.basaal, rgba('#8A5A44', 0.7), 1.5);
      if (actief) { const u = ease01(ph * 1.6), dy = -u * 22; ctx.save(); ctx.globalAlpha *= deel; circ(ctx, xx, yb, 14, rgba(C.goud, 0.35 * (1 - u))); circ(ctx, xx + 2, yb + dy, 12, '#C98A6A', '#8A5A44', 1.5); circ(ctx, xx + 2, yb + dy, 5, WK.kernP); ctx.restore(); }
      circ(ctx, xx, yb, 6, WK.kernP); }
    const vaat = o.vaat || 0; ctx.lineWidth = 6; for (let xx = x + 40; xx < x + w; xx += 62) { ctx.strokeStyle = WK.bloed; ctx.beginPath(); ctx.moveTo(xx - 9, y + h); ctx.bezierCurveTo(xx - 12, y + h - 80, xx - 10, yE + eT + 30, xx - 9, yE + eT + 12); ctx.arc(xx, yE + eT + 12, 9, Math.PI, 0); ctx.stroke(); ctx.strokeStyle = WK.ader; ctx.beginPath(); ctx.moveTo(xx + 9, yE + eT + 12); ctx.bezierCurveTo(xx + 10, yE + eT + 30, xx + 12, y + h - 80, xx + 9, y + h); ctx.stroke();
      if (vaat > 0.01) for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3 + xx * 0.01) % 1; circ(ctx, xx - 10, y + h - ph * (h - 130), 4, rgba('#F08A80', vaat)); } } }
  if (soort === 'pees') { ctx.fillStyle = '#4A3640'; ctx.fillRect(x, y, w, h); ctx.lineCap = 'round';
    for (let i = 0; i < 13; i++) { const yy = y + 30 + i * (h - 60) / 12; ctx.strokeStyle = rgba(WK.pees, 0.9); ctx.lineWidth = 9; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x + k * w / 20; ctx.lineTo(xx, yy + Math.sin(k * 1.4 + i) * 3); } ctx.stroke(); }
    [[0.3, 0.27], [0.7, 0.6], [0.45, 0.8]].forEach(([fx, fy]) => { const px = x + fx * w, py = y + fy * h; ctx.beginPath(); ctx.ellipse(px, py, 28, 6, 0, 0, 6.283); shape(ctx, '#7A5A68', null); });
    ctx.strokeStyle = WK.bloed; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + w * 0.85, y); ctx.quadraticCurveTo(x + w * 0.8, y + h * 0.2, x + w * 0.88, y + h * 0.32); ctx.stroke(); }
  if (soort === 'kraakbeen') { ctx.fillStyle = WK.bot; ctx.fillRect(x, y + h * 0.58, w, h); ctx.strokeStyle = rgba('#B8A27A', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const px = x + hash(i * 3) * w, py = y + h * 0.65 + hash(i * 5) * h * 0.3; ctx.beginPath(); ctx.ellipse(px, py, 18, 11, hash(i) * 3, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = WK.kraak; ctx.beginPath(); ctx.moveTo(x, y + h * 0.6); ctx.lineTo(x, y + h * 0.2); ctx.quadraticCurveTo(x + w / 2, y + h * 0.05, x + w, y + h * 0.2); ctx.lineTo(x + w, y + h * 0.6); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 16; i++) { const px = x + 30 + hash(i * 7 + 2) * (w - 60), py = y + h * 0.26 + hash(i * 9 + 1) * h * 0.28; circ(ctx, px, py, 12, '#E8F0F4', '#A8BCC8', 1.5); circ(ctx, px, py, 6, '#7A8CB8'); }
    if (o.scheur > 0.01) { ctx.save(); ctx.globalAlpha *= o.scheur; ctx.strokeStyle = '#1A2740'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x + w * 0.4, y + h * 0.12); ctx.lineTo(x + w * 0.48, y + h * 0.24); ctx.lineTo(x + w * 0.42, y + h * 0.33); ctx.lineTo(x + w * 0.52, y + h * 0.45); ctx.stroke(); ctx.restore(); } }
  if (soort === 'hart') { ctx.fillStyle = '#4A2228'; ctx.fillRect(x, y, w, h); const inf = o.infarct || 0, ix = x + w * 0.62, iy = y + h * 0.5, irx = w * 0.25, iry = h * 0.26;
    const inI = (px, py) => inf > 0.5 && Math.pow((px - ix) / irx, 2) + Math.pow((py - iy) / iry, 2) < 1;
    const rows = 7, rh = (h - 40) / rows, cl = w / 3.2;
    const cel = (x0, y0, x1, y1) => { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, sc = inI(mx, my); ctx.strokeStyle = sc ? '#D8D0C8' : WK.spier; ctx.lineWidth = rh * 0.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      if (!sc) { ctx.strokeStyle = rgba('#7A2A28', 0.6); ctx.lineWidth = 1.5; const L = Math.hypot(x1 - x0, y1 - y0), n = Math.floor(L / 10); for (let k = 1; k < n; k++) { const u = k / n, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u; ctx.beginPath(); ctx.moveTo(px, py - rh * 0.2); ctx.lineTo(px, py + rh * 0.2); ctx.stroke(); } circ(ctx, mx, my, rh * 0.11, rgba(WK.kernP, 0.9)); } };
    const schijf = (px, py) => { if (inI(px, py)) return; ctx.strokeStyle = '#2A0E12'; ctx.lineWidth = 5; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(px, py - rh * 0.26); ctx.lineTo(px + 3, py - rh * 0.08); ctx.lineTo(px - 3, py + rh * 0.08); ctx.lineTo(px, py + rh * 0.26); ctx.stroke(); };
    for (let r = 0; r < rows; r++) { const yy = y + 20 + rh * (r + 0.5), off = (r % 2) * cl * 0.5; for (let k = -1; k < 4; k++) { const x0 = x + off + k * cl + 8, x1 = x0 + cl - 16; cel(x0, yy, x1, yy);
        if ((k + r) % 2 === 0 && r < rows - 1) cel(x0 + cl * 0.45, yy, x0 + cl * 0.75, yy + rh); // vertakking naar de volgende rij
        schijf(x1 + 8, yy); } }
    if (inf > 0.01) { ctx.save(); ctx.globalAlpha *= inf; ctx.beginPath(); ctx.ellipse(ix, iy, irx, iry, 0, 0, 6.283); ctx.strokeStyle = rgba('#F2F2EE', 0.8); ctx.setLineDash([10, 8]); ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } }
  ctx.restore(); ctx.restore(); }

// pictogrammen: druppel bloed, delende cel
function druppel(ctx, x, y, r, col = WK.bloed, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r * 1.5); ctx.bezierCurveTo(x + r * 0.4, y - r * 0.8, x + r, y - r * 0.2, x + r, y + r * 0.2); ctx.arc(x, y + r * 0.2, r, 0, Math.PI); ctx.bezierCurveTo(x - r, y - r * 0.2, x - r * 0.4, y - r * 0.8, x, y - r * 1.5); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function delendeCel(ctx, x, y, r, a = 1, t = 0, anim = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const u = anim ? 0.5 + 0.5 * Math.sin(t * 2) : 0.6, d = r * 0.55 * u;
  ctx.beginPath(); ctx.ellipse(x - d, y, r, r * 0.9, 0, 0, 6.283); ctx.ellipse(x + d, y, r, r * 0.9, 0, 0, 6.283); shape(ctx, '#C98A6A', '#8A5A44', 2); circ(ctx, x - d, y, r * 0.38, WK.kernP); circ(ctx, x + d, y, r * 0.38, WK.kernP); ctx.restore(); }
// status-rij onder een tegel: 'ja' / 'nee' / 'weinig'
function statusRij(ctx, x, y, icoon, woord, st, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; if (icoon === 'bloed') druppel(ctx, x + 18, y - 8, 14); else delendeCel(ctx, x + 18, y - 8, 13, 1, t, 0);
  text(ctx, woord, x + 50, y + 2, fTekst(28, 600), C.text, 'left'); const sx = x + 220;
  if (st === 'ja') vink_(ctx, sx + 20, y - 10, 18, 1); else if (st === 'nee') kruis(ctx, sx + 20, y - 10, 15, 1); else text(ctx, 'weinig', sx, y + 2, fTekst(26, 700), C.oker, 'left'); ctx.restore(); }

// ===== drukplek: bot boven, matras onder, haarvaatje ertussen =====
function drukZoom(ctx, x, y, w, h, t, a = 1, o = {}) { if (a <= 0.01) return; const { druk = 0, rood = 0, donker = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 24); shape(ctx, '#22314E', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 24); ctx.clip();
  const yb = y + h * 0.36 + druk * 10, ym = y + h * 0.74 - druk * 10;
  // bot (hielbeen)
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, yb - 30); ctx.quadraticCurveTo(x + w / 2, yb + 30, x, yb - 30); ctx.closePath(); shape(ctx, WK.bot, '#B8A27A', 2);
  ctx.strokeStyle = rgba('#B8A27A', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.ellipse(x + hash(i * 3) * w, y + 20 + hash(i * 5) * (yb - y - 60), 18, 10, hash(i) * 3, 0, 6.283); ctx.stroke(); }
  // weefsel tussen bot en matras
  const base = '#C99A88', kl = donker > 0.01 ? '#4A2A3A' : '#D8503E'; ctx.fillStyle = base; ctx.beginPath(); ctx.moveTo(x, yb - 30); ctx.quadraticCurveTo(x + w / 2, yb + 30, x + w, yb - 30); ctx.lineTo(x + w, ym); ctx.lineTo(x, ym); ctx.closePath(); ctx.fill();
  if (rood > 0.01) { ctx.save(); ctx.clip(); const g = ctx.createRadialGradient(x + w / 2, (yb + ym) / 2, 10, x + w / 2, (yb + ym) / 2, w * 0.45); g.addColorStop(0, rgba('#D8503E', 0.85 * rood * (1 - donker))); g.addColorStop(1, rgba('#D8503E', 0)); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    if (donker > 0.01) { const g2 = ctx.createRadialGradient(x + w / 2, (yb + ym) / 2, 10, x + w / 2, (yb + ym) / 2, w * 0.4); g2.addColorStop(0, rgba('#3A1E2E', 0.95 * donker)); g2.addColorStop(1, rgba('#3A1E2E', 0)); ctx.fillStyle = g2; ctx.fillRect(x, y, w, h); } ctx.restore(); }
  // haarvaatje: wordt platgedrukt in het midden
  const yc = (yb + 8 + ym) / 2, dik = k => { const m = Math.exp(-Math.pow((k - 0.5) / 0.18, 2)); return 22 * (1 - druk * 0.85 * m); };
  ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; ctx.lineTo(x + u * w, yc - dik(u)); } for (let k = 40; k >= 0; k--) { const u = k / 40; ctx.lineTo(x + u * w, yc + dik(u)); } ctx.closePath(); shape(ctx, '#7A2A2A', WK.bloed, 3);
  for (let i = 0; i < 9; i++) { let u = (t * 0.25 * (1 - druk) + i / 9) % 1; if (druk > 0.6) u = Math.min(u, 0.32 - (i % 3) * 0.06) + (i > 5 ? 0.38 + i * 0.02 : 0); const r = Math.min(13, dik(u) - 4); if (r < 3) continue; ctx.beginPath(); ctx.ellipse(x + u * w, yc, r * 1.2, r * 0.8, 0, 0, 6.283); ctx.fillStyle = '#E06060'; ctx.fill(); }
  // matras
  ctx.fillStyle = '#AFC6DA'; ctx.fillRect(x, ym, w, h); ctx.strokeStyle = '#8AA6C0'; ctx.lineWidth = 2; for (let xx = x + 30; xx < x + w; xx += 60) { ctx.beginPath(); ctx.moveTo(xx, ym + 16); ctx.lineTo(xx, y + h); ctx.stroke(); }
  ctx.restore();
  if (druk > 0.01) { pijl(ctx, x + w / 2, y + 30, x + w / 2, yb - 20, C.goud, druk, 7, 22); pijl(ctx, x + w / 2, y + h - 18, x + w / 2, ym + 22, C.goud, druk, 7, 22); }
  ctx.restore(); return { yb, ym, yc }; }

// ===== ziekenhuisbed met Opa Henk (rechtop tegen de opgezette rugleuning, deken over de benen, voeten vrij) =====
// x = midden van het bed, y = bovenkant matras. o: kussen (onder de kuiten), matras (drukverdelend), drukH, drukS (gloed hiel / stuitje), donker, draai (pijl)
function henkBed(ctx, x, y, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const { kussen = 0, matras = 0, drukH = 0, drukS = 0, donker = 0, draai = 0, uit = 'neutraal', H = 420 } = o; ctx.save(); ctx.globalAlpha *= a;
  const L = 420, hipX = x - L + 150; const M = lijfMaat('henk', 0, 0, H);
  // frame
  ctx.fillStyle = '#7A8294'; ctx.fillRect(x - L - 20, y + 60, 2 * L + 40, 18); ctx.fillRect(x - L, y + 78, 14, 100); ctx.fillRect(x + L - 14, y + 78, 14, 100);
  circ(ctx, x - L + 7, y + 186, 14, '#4A5266'); circ(ctx, x + L - 7, y + 186, 14, '#4A5266');
  roundRect(ctx, x - L - 34, y - 210, 22, 300, 8); shape(ctx, '#8A93A6', null); roundRect(ctx, x + L + 12, y - 80, 22, 170, 8); shape(ctx, '#8A93A6', null);
  const mCol = matras > 0.5 ? '#9CCBD6' : '#DDE6EE';
  roundRect(ctx, x - L, y, 2 * L, 60, 14); shape(ctx, mCol, '#B8C8D8', 2);
  // rugleuning omhoog
  ctx.save(); ctx.translate(x - L + 14, y + 40); ctx.rotate(-1.38); roundRect(ctx, 0, -46, 340, 56, 14); shape(ctx, mCol, '#B8C8D8', 2);
  if (matras > 0.01) { ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = 30; xx < 320; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, -40); ctx.lineTo(xx, 4); ctx.stroke(); } } ctx.restore();
  if (matras > 0.01) { ctx.save(); ctx.globalAlpha *= matras; ctx.strokeStyle = '#5BA4C9'; ctx.lineWidth = 3; for (let xx = x - L + 40; xx < x + L - 10; xx += 36) { ctx.beginPath(); ctx.moveTo(xx, y + 8 + 3 * Math.sin(t * 2 + xx)); ctx.lineTo(xx, y + 54); ctx.stroke(); } ctx.restore(); }
  // hoofdkussen tegen de leuning
  // Henk tot de heup, licht achterover
  ctx.save(); ctx.beginPath(); ctx.rect(x - L - 200, y - H - 100, 2 * L + 400, H + 100 + 20); ctx.clip(); ctx.translate(hipX, y + 14); ctx.rotate(-0.12 + (draai > 0.01 ? 0.04 * Math.sin(t * 2) : 0));
  roundRect(ctx, -M.hh * 1.25, -M.heupY + M.top - M.hh * 0.25, M.hh * 1.5, (M.schouderY - M.top) + M.hh * 1.1, M.hh * 0.5); shape(ctx, '#F2F2EE', '#C8D2DC', 2);
  persoon(ctx, 'henk', 0, -M.heupY, H, { t, uit, kijk: 1 }); ctx.restore();
  // deken: van de borst over de benen naar de voeten
  const lift = kussen * 36, vx = x + L - 60, borst = y + 14 + M.heupY + (M.schouderY - M.heupY) * 0.32 - M.heupY * 0;
  const by = y + 14 + (M.schouderY + (M.heupY - M.schouderY) * 0.55) - M.heupY; // deken-rand op de borst
  ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6);
  ctx.bezierCurveTo(hipX + M.sw * 0.9, y - 40, hipX + 200, y - 72, hipX + 300, y - 70 - lift * 0.5); ctx.bezierCurveTo(hipX + 420, y - 70 - lift, vx - 80, y - 64 - lift, vx - 24, y - 50 - lift); ctx.lineTo(vx - 24, y + 30); ctx.lineTo(hipX - M.sw * 0.62, y + 30); ctx.closePath();
  shape(ctx, '#7FA6C9', '#5A86AE', 2); ctx.strokeStyle = rgba('#5A86AE', 0.8); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const xx = hipX + 140 + i * 100; ctx.beginPath(); ctx.moveTo(xx, y - 60 - (i > 1 ? lift * 0.7 : 0)); ctx.quadraticCurveTo(xx + 26, y - 20, xx + 8, y + 20); ctx.stroke(); }
  ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.moveTo(hipX - M.sw * 0.62, by + 10); ctx.quadraticCurveTo(hipX, by - 16, hipX + M.sw * 0.62, by + 6); ctx.lineTo(hipX + M.sw * 0.62, by + 26); ctx.quadraticCurveTo(hipX, by + 4, hipX - M.sw * 0.62, by + 30); ctx.closePath(); ctx.fill();
  if (kussen > 0.01) { ctx.save(); ctx.globalAlpha *= kussen; roundRect(ctx, vx - 150, y - 34, 170, 44, 20); shape(ctx, '#E8E2D4', '#C8BEA8', 2); ctx.restore(); }
  // blote voet (zijaanzicht): hiel op de matras of vrij boven het kussen, tenen omhoog
  const fy = y - lift; ctx.save(); ctx.translate(vx, fy); ctx.beginPath(); ctx.moveTo(-26, -54); ctx.lineTo(-4, -54); ctx.bezierCurveTo(20, -62, 40, -92, 52, -106); ctx.quadraticCurveTo(64, -108, 60, -92); ctx.bezierCurveTo(50, -56, 30, -8, 6, 0); ctx.bezierCurveTo(-16, 4, -30, -10, -30, -28); ctx.closePath(); shape(ctx, CAST.henk.huid, _donker(CAST.henk.huid, 0.2), 2); ctx.restore();
  const hiel = { x: vx - 12, y: fy - 4 }, stuit = { x: hipX + 10, y: y + 12 };
  const gloed = (p, f) => { if (f <= 0.01) return; const r = 64; const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, r); const col = donker > 0.5 ? '#5A1E3A' : '#E04A3A'; g.addColorStop(0, rgba(col, 0.95 * f)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill(); };
  gloed(hiel, drukH); gloed(stuit, drukS);
  ctx.restore(); return { hiel, stuit, hip: { x: hipX, y }, voet: { x: vx, y: fy }, hoofdY: y + 14 - M.heupY + M.top }; }

// ===== grafiek belasting tegen weken (geleidelijk opbouwen) =====
function belastGrafiek(ctx, x, y, w, h, u = 1, a = 1, o = {}) { if (a <= 0.01) return; const { half = 0, jaar = 0 } = o; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  metaText(ctx, 'belasting', x, y - 18, C.text2, 'left', 22); metaText(ctx, 'weken', x + w, y + h + 74, C.text2, 'right', 22);
  [0, 13, 26, 39, 52].forEach(wk => { const xx = x + wk / 52 * w; text(ctx, String(wk), xx, y + h + 34, fTekst(22, 600), C.text2, 'center'); });
  const f = wk => wk < 2 ? 0.12 + wk * 0.04 : wk < 6 ? 0.2 + (wk - 2) * 0.06 : 0.44 + (1 - Math.exp(-(wk - 6) / 16)) * 0.56; const n = Math.round(104 * clamp(u, 0, 1));
  ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k <= n; k++) { const wk = k / 2, xx = x + wk / 52 * w, step = Math.floor(wk) / 52 * w; const yy = y + h - f(Math.floor(wk)) * h * 0.9; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  // te veel, te snel: stippellijn die er boven uitschiet
  if (o.tesnel > 0.01) { ctx.save(); ctx.globalAlpha *= o.tesnel; ctx.strokeStyle = C.koraal; ctx.setLineDash([12, 10]); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y + h - 0.12 * h * 0.9); ctx.lineTo(x + 6 / 52 * w, y + h * 0.08); ctx.stroke(); ctx.setLineDash([]); flits(ctx, x + 6 / 52 * w, y + h * 0.08, 40, 1, C.koraal); ctx.restore(); }
  if (half > 0.01) { const xx = x + 26 / 52 * w; ctx.save(); ctx.globalAlpha *= half; ctx.strokeStyle = C.teal; ctx.setLineDash([8, 8]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke(); ctx.restore(); naamBij(ctx, 'weer sporten', '± half jaar', xx - 14, y + 40, half, 'right'); }
  if (jaar > 0.01) { const xx = x + w; naamBij(ctx, 'oude niveau', 'vaak ± 1 jaar', xx - 10, y + h * 0.45, jaar, 'right'); }
  ctx.restore(); }

// sigaret, glucosemeter, voet met wondje
function sigaret(ctx, x, y, s, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -80, -10, 120, 20, 6); shape(ctx, '#F2F2EE', null); roundRect(ctx, 40, -10, 40, 20, 6); shape(ctx, '#E0A43A', null); circ(ctx, -82, 0, 9, '#E07A5F');
  ctx.strokeStyle = rgba('#C8CED6', 0.6); ctx.lineWidth = 4; ctx.beginPath(); for (let j = 0; j <= 14; j++) ctx.lineTo(-90 + Math.sin(j * 0.7 + t * 2) * 10, -10 - j * 7); ctx.stroke(); ctx.restore(); }
function vatDoorsnede(ctx, x, y, r, knijp = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ri = r * (0.72 - 0.42 * knijp); circ(ctx, x, y, r, '#C9707A', '#E8A0A8', 3); circ(ctx, x, y, ri, '#7A2A2A'); for (let i = 0; i < 3; i++) { const an = i * 2.1; circ(ctx, x + Math.cos(an) * ri * 0.45, y + Math.sin(an) * ri * 0.45, ri * 0.3, '#E06060'); } ctx.restore(); }
function suikerRing(ctx, x, y, r, a = 1, col = C.goud) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3 - Math.PI / 6; ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.closePath(); shape(ctx, rgba(col, 0.25), col, 4); ctx.restore(); }
function voetZool(ctx, x, y, s, a = 1, wond = 1, huid = '#E3B998') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-50, 110); ctx.bezierCurveTo(-70, 40, -60, -60, -30, -100); ctx.bezierCurveTo(0, -130, 50, -110, 55, -60); ctx.bezierCurveTo(60, 0, 40, 60, 40, 110); ctx.bezierCurveTo(30, 140, -40, 140, -50, 110); shape(ctx, huid, _donker(huid, 0.2), 2);
  [[-30, -118, 14], [-2, -126, 11], [20, -122, 10], [38, -112, 9], [50, -96, 8]].forEach(([dx, dy, r]) => circ(ctx, dx, dy, r, huid, _donker(huid, 0.2), 2));
  if (wond > 0.01) { ctx.globalAlpha *= wond; ctx.beginPath(); ctx.ellipse(-8, -40, 18, 13, 0.3, 0, 6.283); ctx.fillStyle = '#B23A3A'; ctx.fill(); ctx.strokeStyle = '#E88070'; ctx.lineWidth = 3; ctx.stroke(); } ctx.restore(); }
// Wat word jij? · Verpleegkunde en Fysiotherapie · Hoe weefsel herstelt — scènes per alinea (v1.0, 20 okt 2026). Look: Schema en Micro, met cast (Lotte, Sam, Opa Henk, Verpleegkundige Jesse, Fysiotherapeut Femke).
// Rode draad: Lotte (schaafwond) en Sam (achillespees) raken op dezelfde zaterdag gewond.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function draaiPijl(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 7; ctx.lineCap = 'round'; const a0 = Math.PI * 1.05, a1 = a0 + 2.4; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke();
  pijl(ctx, x + Math.cos(a1 - 0.25) * r, y + Math.sin(a1 - 0.25) * r, x + Math.cos(a1) * r, y + Math.sin(a1) * r, C.goud, 1, 7, 26); ctx.restore(); }
// één tekstbalk tegelijk: de oude weg, dan de nieuwe
function wisselChip(ctx, lijst, x, y, t, q, px = 28) { let cur = -1; lijst.forEach(([w, n], i) => { if (t >= q.at(w, n)) cur = i; }); if (cur < 0) return; const [w, n, s2, col] = lijst[cur]; if (!s2) return; const nx = lijst[cur + 1];
  const uit = nx ? clamp((t - (q.at(nx[0], nx[1]) - 0.3)) / 0.3, 0, 1) : 0; chip(ctx, s2, x, y, col, q.on(w, n, 0.35) * (1 - uit), px); }

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.12) % 1; huidWond(ctx, 1000, 330, 800, 440, t, { bloed: clamp(1 - u * 3, 0, 1), korst: clamp(u * 4 - 0.4, 0, 1) * clamp(2.4 - u * 3, 0, 1), fib: clamp(u * 3 - 0.8, 0, 1), vaat: clamp(u * 3 - 1, 0, 1), epi: clamp(u * 3 - 1.2, 0, 1), wbc: clamp(u * 4 - 0.5, 0, 1) * clamp(2 - u * 3, 0, 1) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const LX = 520, SX = 1380, VY = 820, PH = 470;
    tag(ctx, 'zaterdag', 960, 130, C.goud, clamp(t / 0.6, 0, 1) * (1 - q.on('week', 1)), 'center', 32);
    // Lotte met fiets (omgevallen)
    const L = q.on('Lotte', 1, 0.3), wond = q.on('schaaft', 1, 0.3), dicht = q.on('dicht', 1, 1.2);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; ctx.translate(LX - 250, VY - 30); ctx.rotate(-0.35); fiets(ctx, 0, 0, 1.7, 1); ctx.restore(); }
    persoon(ctx, 'lotte', LX, VY, PH, { t, a: L, outfit: 'sport', kijk: 1, uit: t < q.at('week', 1) ? (wond > 0.5 ? 'bezorgd' : 'neutraal') : 'blij' });
    if (L > 0.01) { const k = knieWond(ctx, 'lotte', LX, VY, PH, 1, wond * L, dicht * 0.75); flits(ctx, k.x, k.y, 60, wond * (1 - q.on('Sam', 1)), C.koraal); naamBij(ctx, 'Lotte', '', LX, 300, L, 'center'); }
    // Sam na de sprint
    const S = q.on('Sam', 1, 0.3), klap = q.on('klap', 1, 0.3);
    persoon(ctx, 'sam', SX, VY, PH, { t, a: S, outfit: 'sport', kijk: -1, uit: klap > 0.5 ? 'bezorgd' : 'blij' });
    if (S > 0.01) { const hp = hielPunt('sam', SX, VY, PH, 1); flits(ctx, hp.x + 10, hp.y, 60, klap * (1 - q.on('week', 1)), C.koraal); naamBij(ctx, 'Sam', '', SX, 300, S, 'center');
      naamBij(ctx, 'achillespees', 'gescheurd', hp.x + 70, hp.y - 30, q.on('achillespees', 1) * (1 - q.on('week', 1)), 'left', C.koraal); }
    // na een week / na drie maanden
    const W1 = q.on('week', 1); if (W1 > 0.01) { tag(ctx, 'na 1 week', LX, 160, C.groen, W1, 'center', 34); vink_(ctx, LX + 170, 145, 22, q.on('dicht', 1)); }
    const M3 = q.on('maanden', 1); if (M3 > 0.01) { tag(ctx, 'na 3 maanden', SX, 160, C.koraal, M3, 'center', 34); naamBij(ctx, 'nog niet rennen', '', SX + 130, 560, q.on('rennen', 1), 'left', C.koraal); kruis(ctx, SX + 200, 145, 18, q.on('rennen', 1)); }
    vraagteken(ctx, 960, 520, q.on('verschil', 1), 150); },

  // ---------- H1 ----------
  s04(ctx, t, q) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); // micro-kleur zonder korrel antwoord(ctx, 'Antwoord a', 1 - q.on('vier', 1));
    const st0 = q.at('stolling', 1), on = q.at('ontsteking', 1), ob = q.at('opbouw', 1), vb = q.at('verbouwen', 1);
    const act = t < st0 ? -1 : t < on ? 0 : t < ob ? 1 : t < vb ? 2 : 3; faseLijn(ctx, 260, 76, 1400, q.on('vier', 1), act);
    const S = { bloed: q.on('Binnen', 1, 1.2) * (1 - q.on('maken', 2, 6)), korst: q.on('korstje', 1, 0.8) * (1 - q.on('opperhuid', 1, 1.2)),
      bact: q.on('ontsteking', 1, 0.6) * (1 - q.on('rood', 1, 1.2)), wbc: clamp((t - q.at('Witte', 1)) / 3, 0, 1) * (1 - q.on('Daarna', 1, 1)),
      rood: q.on('rood', 1, 0.8) * (1 - q.on('Daarna', 1, 1.2)) * (1 + 0.35 * q.on('roder', 1)), fib: clamp((t - q.at('maken', 2)) / 4, 0, 1), vaat: clamp((t - q.at('bloedvaatjes', 1)) / 2.5, 0, 1),
      epi: clamp((t - q.at('opperhuid', 1)) / 2.5, 0, 1), verbouw: clamp((t - q.at('Maandenlang', 1)) / 3, 0, 1), litteken: q.on('litteken', 1, 1) * 0.0 };
    S.rood = clamp(S.rood, 0, 1.3); const G = huidWond(ctx, 360, 250, 1200, 580, t, S);
    // namen bij de lagen (voor de stolling)
    const L0 = q.on('wond', 1) * (1 - q.on('stolling', 1));
    naamBij(ctx, 'opperhuid', '', 380, G.yE0 - 16, L0, 'left'); naamBij(ctx, 'lederhuid', '', 380, G.yE0 + G.eT + 54, L0, 'left'); naamBij(ctx, 'wond', '', G.cx + G.wr + 20, G.yE0 + 70, L0, 'left');
    // stolling
    const b1 = q.on('bloedplaatjes', 1) * (1 - q.on('ontsteking', 1)); naamBij(ctx, 'bloedplaatjes', '', G.cx - G.wr + 14, G.yE0 + 92, b1, 'left'); naamBij(ctx, 'fibrinedraden', '', G.cx + G.wr + 30, G.yE0 + 100, q.on('fibrinedraden', 1) * (1 - q.on('ontsteking', 1)), 'left', WK.fibrine);
    naamBij(ctx, 'korstje', '', G.cx + G.wr + 30, G.yE0 - 24, q.on('korstje', 1) * (1 - q.on('ontsteking', 1)), 'left');
    // ontsteking
    naamBij(ctx, 'witte bloedcellen', '', G.cx + G.wr + 30, G.yE0 + 120, q.on('Witte', 1) * (1 - q.on('rood', 1)), 'left'); naamBij(ctx, 'bacteriën', '', G.cx - G.wr - 30, G.yE0 + 120, q.on('bacteriën', 1) * (1 - q.on('rood', 1)), 'right', WK.bact);
    wisselChip(ctx, [['rood', 1, 'rood, warm, dik: zo begint herstel', C.koraal], ['infectie', 1, 'hoeft geen infectie te zijn', C.groen], ['roder', 1, 'na dagen erger? dan wel infectie', C.koraal], ['Daarna', 1, '', C.text2]], 560, 250, t, q, 30);
    // opbouw
    const o1 = q.on('bloedvaatjes', 1) * (1 - q.on('verbouwen', 1)); naamBij(ctx, 'nieuwe bloedvaatjes', '', G.cx + G.wr + 30, G.yE0 + 170, o1, 'left');
    naamBij(ctx, 'collageen', 'eiwitdraden', G.cx - G.wr - 30, G.yE0 + 150, q.on('collageen', 1) * (1 - q.on('verbouwen', 1)), 'right'); naamBij(ctx, 'opperhuid schuift over', '', G.cx, G.yE0 - 26, q.on('schuift', 1) * (1 - q.on('verbouwen', 1)), 'center');
    // verbouwen + sterkte
    naamBij(ctx, 'draden opnieuw gelegd', '', G.cx + G.wr + 30, G.yE0 + 150, q.on('gelegd', 1) * (1 - q.on('Toch', 1)), 'left');
    const T = q.on('litteken', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; roundRect(ctx, 400, 800, 1120, 70, 16); shape(ctx, rgba('#121A26', 0.85), null); ctx.restore();
      balk(ctx, 640, 816, 300, 1, C.text2, '', T); regel(ctx, 'gezond', 620, 848, T, C.text2, 28, 'right', 700); balk(ctx, 1160, 816, 300, 0.8 * clamp((t - q.at('litteken', 1)) / 1.5, 0, 1), C.koraal, '', T); regel(ctx, 'litteken ± 80%', 1140, 848, T, C.koraal, 28, 'right', 700); } },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const Y = 270, H = 360, TW = 500;
    const i1 = q.on('bloed', 1), i2 = q.on('delen', 1); druppel(ctx, 700, 165, 18, WK.bloed, i1); regel(ctx, 'veel bloed', 740, 178, i1, C.text, 36, 'left', 700); delendeCel(ctx, 1080, 160, 20, i2, t, 1); regel(ctx, 'cellen die delen', 1130, 178, i2, C.text, 36, 'left', 700);
    const A = q.on('Lotte', 1, 0.4), P = q.on('pees', 1, 0.4), K = q.on('Kraakbeen', 1, 0.4), xs = [170, 710, 1250];
    tegel(ctx, xs[0], Y, TW, H, 'huid', t, A, { vaat: q.on('haarvaten', 1), deel: q.on('Bovendien', 1) }); naamBij(ctx, 'huid', '', xs[0] + TW / 2, Y - 16, A, 'center');
    naamBij(ctx, 'haarvaten', '', xs[0] + TW - 20, Y + H - 30, q.on('haarvaten', 1), 'right'); naamBij(ctx, 'onderste laag deelt', '', xs[0] + 20, Y + 40, q.on('Bovendien', 1), 'left');
    tegel(ctx, xs[1], Y, TW, H, 'pees', t, P); naamBij(ctx, 'pees', '', xs[1] + TW / 2, Y - 16, P, 'center');
    tegel(ctx, xs[2], Y, TW, H, 'kraakbeen', t, K); naamBij(ctx, 'kraakbeen', 'knie', xs[2] + TW / 2, Y - 46, K, 'center'); naamBij(ctx, 'bot', '', xs[2] + 30, Y + H - 30, K, 'left');
    const r1 = Y + H + 70, r2 = r1 + 66;
    statusRij(ctx, xs[0] + 90, r1, 'bloed', 'bloed', 'ja', q.on('haarvaten', 1), t); statusRij(ctx, xs[0] + 90, r2, 'cel', 'delen', 'ja', q.on('Bovendien', 1), t);
    statusRij(ctx, xs[1] + 90, r1, 'bloed', 'bloed', 'weinig', q.on('bloedvaten', 1), t); statusRij(ctx, xs[1] + 90, r2, 'cel', 'cellen', 'weinig', q.on('cellen', 3), t);
    statusRij(ctx, xs[2] + 90, r1, 'bloed', 'bloed', 'nee', q.on('bloedvaten', 2), t); vraagteken(ctx, xs[2] + 360, r2 + 4, q.on('beschadigd', 1), 90);
    tag(ctx, 'traag', xs[1] + TW / 2, Y + H / 2 + 14, C.oker, q.on('trager', 1), 'center', 36); },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const Y = 260, H = 400, TW = 620;
    tegel(ctx, 180, Y, TW, H, 'kraakbeen', t, 1, { scheur: q.on('Beschadigd', 1) }); naamBij(ctx, 'kraakbeen', '', 180 + TW / 2, Y - 16, 1, 'center');
    tag(ctx, 'groeit bijna niet terug', 180 + TW / 2, Y + H + 76, C.koraal, q.on('terug', 1), 'center', 30); naamBij(ctx, 'jarenlang klachten', 'na een knieblessure', 180 + TW / 2, Y + H + 140, q.on('jarenlang', 1), 'center', C.text2);
    const Hh = q.on('hart', 1, 0.5); tegel(ctx, 1100, Y, TW, H, 'hart', t, Hh, { knijp: 1, infarct: q.on('hartinfarct', 1, 1.2) }); naamBij(ctx, 'hartspier', '', 1100 + TW / 2, Y - 16, Hh, 'center');
    statusRij(ctx, 1180, Y + H + 70, 'bloed', 'bloed', 'ja', q.on('bloed', 1), t); statusRij(ctx, 1180, Y + H + 136, 'cel', 'delen', 'nee', q.on('delen', 1), t);
    naamBij(ctx, 'litteken', 'trekt niet samen', 1100 + TW / 2, Y + H + 196, q.on('litteken', 1), 'center', C.koraal); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const BX = 720, BY = 560; const Z = q.on('haarvaatjes', 1, 0.6), J = q.on('verpleegkundige', 1, 0.5);
    const B = henkBed(ctx, BX, BY, t, { drukH: q.on('hiel', 1) * (1 + 0.3 * q.on('afsterven', 1)), drukS: q.on('stuitje', 1), donker: q.on('afsterven', 1), uit: 'bezorgd' });
    naamBij(ctx, 'Opa Henk', '', BX - 270, 230, q.on('bed', 1), 'center');
    naamBij(ctx, 'hiel', '', B.hiel.x, B.hiel.y + 108, q.on('hiel', 1), 'center'); naamBij(ctx, 'stuitje', '', B.stuit.x + 70, B.stuit.y + 108, q.on('stuitje', 1), 'left');
    klokje(ctx, 1120, 250, 46, clamp((t - q.at('paar', 1)) / 2, 0, 1) * 0.25, q.on('paar', 1) * (1 - J)); regel(ctx, 'een paar uur', 1190, 264, q.on('paar', 1) * (1 - J), C.text2, 30, 'left', 700);
    const dz = drukZoom(ctx, 1290, 330, 540, 420, t, Z * (1 - J), { druk: clamp((t - q.at('haarvaatjes', 1)) / 1.5, 0, 1), rood: q.on('zuurstof', 1), donker: q.on('afsterven', 1, 1.2) });
    naamBij(ctx, 'bot', '', 1320, 380, Z * (1 - J), 'left'); naamBij(ctx, 'haarvaatje', 'dichtgedrukt', 1320, 330 + 420 * 0.55 - 38, q.on('dichtgedrukt', 1) * (1 - J), 'left'); naamBij(ctx, 'matras', '', 1320, 730, Z * (1 - J), 'left');
    tag(ctx, 'doorliggen', BX, 150, C.koraal, q.on('doorliggen', 1), 'center', 36);
    persoon(ctx, 'jesse', 1480, 820, 470, { t, a: J, kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Verpleegkundige Jesse', '', 1480, 300, J, 'center');
    vraagteken(ctx, 1700, 420, q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c', 1 - q.on('andere', 1)); const O = q.on('andere', 1, 0.6), BX = 720, BY = 560;
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O;
      const B = henkBed(ctx, BX, BY, t, { matras: q.on('matras', 1, 0.8), kussen: q.on('hielen', 1, 0.8), draai: q.on('draait', 1), uit: 'blij' });
      draaiPijl(ctx, BX - 230, 330, 90, q.on('draait', 1) * (1 - q.on('matras', 1)), t);
      ctx.save(); ctx.translate(1290, 0); ctx.scale(-1, 1); persoon(ctx, 'jesse', 0, 820, 470, { t, kijk: 1, pose: t < q.at('kijkt', 1) ? 'wijs' : 'staan', uit: 'blij' }); ctx.restore(); naamBij(ctx, 'Jesse', 'verpleegkundige', 1290, 280, 1, 'center');
      wisselChip(ctx, [['draait', 1, 'om de paar uur van houding wisselen', C.goud], ['matras', 1, 'matras die de druk verdeelt', C.teal], ['hielen', 1, 'hielen vrij', C.groen], ['kijkt', 1, 'elke dag de huid bekijken', C.oker]], BX, 200, t, q, 30);
      ctx.restore(); }
    if (O > 0.01) { const Y = 250, PH = 440, PW = 480, xs = [180, 720, 1260]; ctx.save(); ctx.globalAlpha *= O;
      const I = q.on('infectie', 1, 0.5), R = q.on('Roken', 1, 0.5), D = q.on('diabetes', 1, 0.5);
      [[xs[0], 'infectie', I], [xs[1], 'roken', R], [xs[2], 'diabetes', D]].forEach(([x, n, a]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, Y, PW, PH, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); ctx.restore(); naamBij(ctx, n, '', x + PW / 2, Y - 18, a, 'center'); });
      // infectie: bacteriën houden de ontsteking gaande
      if (I > 0.01) { ctx.save(); ctx.globalAlpha *= I; ctx.beginPath(); ctx.arc(xs[0] + PW / 2, Y + 230, 120, 0, 6.283); const g = ctx.createRadialGradient(xs[0] + PW / 2, Y + 230, 10, xs[0] + PW / 2, Y + 230, 150); g.addColorStop(0, rgba('#E04A3A', 0.6)); g.addColorStop(1, rgba('#E04A3A', 0)); ctx.fillStyle = g; ctx.fill();
        for (let i = 0; i < 7; i++) { const w = wander(i, t, 50, 0.5), px = xs[0] + PW / 2 + w.x, py = Y + 230 + w.y; ctx.save(); ctx.translate(px, py); ctx.rotate(i); roundRect(ctx, -14, -6, 28, 12, 6); shape(ctx, WK.bact, '#4A8A5A', 1.5); ctx.restore(); }
        for (let i = 0; i < 3; i++) { const w = wander(i + 20, t, 70, 0.4); circ(ctx, xs[0] + PW / 2 + w.x, Y + 230 + w.y, 22, WK.wbc, '#B8B0CC', 2); } ctx.restore(); naamBij(ctx, 'ontsteking blijft', '', xs[0] + PW / 2, Y + PH - 30, q.on('gang', 1), 'center'); }
      // roken: vaatje knijpt samen
      if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; sigaret(ctx, xs[1] + 140, Y + 110, 1, 1, t); vatDoorsnede(ctx, xs[1] + PW / 2, Y + 270, 100, clamp((t - q.at('knijpt', 1)) / 1.2, 0, 1), 1); ctx.restore(); naamBij(ctx, 'bloedvaatje knijpt samen', '', xs[1] + PW / 2, Y + PH - 30, q.on('samen', 1), 'center'); }
      // diabetes: minder bloed en afweer, wondje aan de voet niet voelen
      if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; suikerRing(ctx, xs[2] + 110, Y + 100, 44, 1); voetZool(ctx, xs[2] + PW / 2 + 60, Y + 205, 0.8, 1, q.on('wondje', 1)); ctx.restore();
        naamBij(ctx, 'minder bloed en afweer', '', xs[2] + PW / 2, Y + PH - 66, q.on('afweer', 1) * (1 - q.on('voel', 1)), 'center'); naamBij(ctx, 'wondje niet voelen', '', xs[2] + PW / 2, Y + PH - 66, q.on('voel', 1), 'center', C.koraal);
        naamBij(ctx, 'maanden open', '', xs[2] + PW / 2, Y + PH - 20, q.on('maanden', 1), 'center', C.koraal); }
      ctx.restore(); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const P2 = q.on('opbouwfase', 1, 0.8), P3 = q.on('fysiotherapeut', 1, 0.8), SX = 470, VY = 820, PH = 480;
    if (P2 < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - P2;
      persoon(ctx, 'sam', SX, VY, PH, { t, outfit: 'sport', kijk: 1, uit: 'neutraal' }); loopschoen(ctx, 'sam', SX, VY, PH, 1, q.on('schoen', 1)); krukken(ctx, 'sam', SX, VY, PH, q.on('krukken', 1)); naamBij(ctx, 'Sam', '', SX, 260, 1, 'center');
      const sb = beenZij(ctx, 1240, 700, 1.15, 1, { scheur: 1, schoen: q.on('schoen', 1, 1.2), huid: CAST.sam.huid, t });
      naamBij(ctx, 'achillespees', '', sb.pees[0] - 40, sb.pees[1] - 20, 1, 'right', WK.pees); naamBij(ctx, 'hakje', '', 1160, 792, q.on('hakje', 1) * (1 - q.on('krukken', 1)), 'left', C.goud);
      wisselChip(ctx, [['opgerekt', 1, 'uiteinden blijven dicht bij elkaar', C.goud], ['krukken', 1, 'eerst krukken', C.teal], ['daarna', 1, 'daarna steeds meer op zijn been', C.groen], ['rusten', 1, 'te lang rusten: niet goed', C.koraal]], 1300, 200, t, q, 30);
      ctx.restore(); }
    if (P2 > 0.01 && P3 < 0.99) { ctx.save(); ctx.globalAlpha *= P2 * (1 - P3);
      const orde = clamp((t - q.at('belasten', 1)) / 2.5, 0, 1), trek = q.on('belasten', 1) * (1 - q.on('veel', 1)); vezelPaneel(ctx, 460, 270, 1000, 420, t, 1, { orde, trek, rood: q.on('scheuren', 1) });
      naamBij(ctx, 'nieuwe eiwitdraden', 'kriskras', 960, 212, 1 - q.on('lengte', 1), 'center'); naamBij(ctx, 'in de lengte', 'sterker', 960, 212, q.on('lengte', 1), 'center', C.groen);
      metaText(ctx, 'pees · opbouwfase', 460, 740, C.grain, 'left', 22);
      tag(ctx, 'voorzichtig belasten', 960, 800, C.goud, q.on('belasten', 1) * (1 - q.on('veel', 1)), 'center', 30); tag(ctx, 'te veel, te snel: opnieuw scheuren', 960, 800, C.koraal, q.on('veel', 1), 'center', 30);
      if (q.on('scheuren', 1) > 0.01) flits(ctx, 960, 480, 120, q.on('scheuren', 1) * 0.8, C.koraal); ctx.restore(); }
    if (P3 > 0.01) { ctx.save(); ctx.globalAlpha *= P3;
      belastGrafiek(ctx, 170, 290, 820, 420, clamp((t - q.at('bouwt', 1)) / 3, 0, 1), 1, { half: q.on('half', 1), jaar: q.on('niveau', 1) });
      const T = q.on('test', 1, 0.5); const ten = T > 0.01 ? 0.5 + 0.5 * Math.sin((t - q.at('tenen', 1)) * 2.2 - 1.57) : 0;
      beenZij(ctx, 1260, 700, 0.95, T, { tenen: t > q.at('tenen', 1) ? ten : 0, huid: CAST.sam.huid, t });
      naamBij(ctx, 'op één been op de tenen', 'test', 1260, 300, q.on('één', 1), 'center');
      persoon(ctx, 'femke', 1700, 820, 470, { t, a: q.on('fysiotherapeut', 1, 0.3), kijk: -1, uit: 'blij' }); naamBij(ctx, 'Femke', 'fysiotherapeut', 1700, 270, q.on('fysiotherapeut', 1), 'center');
      ctx.restore(); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const LX = 380, SX = 1540, VY = 720, PH = 440;
    persoon(ctx, 'lotte', LX, VY, PH, { t, outfit: 'sport', kijk: 1, uit: 'blij' }); const k = knieWond(ctx, 'lotte', LX, VY, PH, 1, 1, 1); naamBij(ctx, 'klein litteken', '', k.x + 40, k.y + 10, q.on('litteken', 1), 'left');
    const R = q.on('rent', 1, 0.4); persoon(ctx, 'sam', SX, VY - 10 * Math.abs(Math.sin(t * 5)) * R, PH, { t, outfit: 'sport', kijk: -1, uit: 'lacht', pose: 'staan', a: q.on('Sam', 1, 0.3) });
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; ctx.strokeStyle = rgba(C.text2, 0.7); ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(SX + 110 + i * 10, 400 + i * 60); ctx.lineTo(SX + 190 + i * 10, 400 + i * 60); ctx.stroke(); } ctx.restore(); }
    faseLijn(ctx, 260, 780, 1400, q.on('vier', 1), -1);
    const b = q.on('bloed', 1), c = q.on('cellen', 1); druppel(ctx, 820, 330, 30, WK.bloed, b); regel(ctx, 'bloed', 820, 420, b, C.text, 36, 'center', 700); regel(ctx, '+', 960, 350, c, C.goud, 64, 'center', 800); delendeCel(ctx, 1100, 320, 32, c, t, 1); regel(ctx, 'delende cellen', 1100, 420, c, C.text, 36, 'center', 700);
    regel(ctx, 'tempo', 960, 220, q.on('tempo', 1), C.goud, 44, 'center', 800); },

  s13(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'jesse', 520, 820, 480, { t, kijk: 1, uit: 'blij' }); naamBij(ctx, 'Jesse', 'verpleegkundige · wonden, doorliggen', 520, 240, q.on('Verpleegkundigen', 1), 'center');
    const F = q.on('Fysiotherapeuten', 1, 0.4); persoon(ctx, 'femke', 1300, 820, 470, { t, a: F, kijk: 1, uit: 'blij', pose: 'wijs' }); persoon(ctx, 'sam', 1580, 820, 480, { t, a: F, outfit: 'sport', kijk: -1, uit: 'lacht' });
    naamBij(ctx, 'Femke', 'fysiotherapeut · spieren en pezen', 1300, 240, F, 'center');
    tag(ctx, 'fysiotherapie: hbo · vier jaar', 1440, 160, C.teal, q.on('Fysiotherapie', 1), 'center', 30); tag(ctx, 'verpleegkunde: mbo of hbo', 520, 160, C.teal, q.on('Fysiotherapie', 1), 'center', 30); }
});
