
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
  laesie:  { n: 'laesie',        waar: 0.35, wanneer: 0.05, oorzaak: 'ja?' },
  cel:     { n: 'elektrode in één cel', waar: 0.95, wanneer: 0.97, oorzaak: 'nee' },
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
  ctx.beginPath(); ctx.moveTo(-320, 0); ctx.quadraticCurveTo(0, -24, 320, 0); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-320, 40); ctx.quadraticCurveTo(0, 16, 320, 40); ctx.stroke();
  const g = 18 + open * 26; roundRect(ctx, -g - 40, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5); roundRect(ctx, g, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5);
  if (open > 0.05) { for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k * 0.25) % 1; circ(ctx, Math.sin(k * 2) * 6, lerp(-110, 150, u), 9, rgba(C.goud, open), lighten(C.goud, 0.4), 1); } }
  ctx.restore(); }
// ---------- extra tekeningen voor deze film ----------
function nieuwsKaart(ctx, x, y, s, a = 1, vlekA = 1, t = 0, kop = 'Wetenschappers vinden het verliefdheidsgebied') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 680, 560, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  ctx.fillStyle = '#2A3A58'; ctx.fillRect(0, 0, 680, 60); text(ctx, 'NIEUWS', 28, 42, fMeta(28), '#F2EEE4', 'left');
  ctx.save(); ctx.font = fTekst(34, 800); ctx.fillStyle = '#1A2740'; wrap(ctx, kop, 28, 110, 620, 42); ctx.restore();
  roundRect(ctx, 28, 210, 624, 320, 10); shape(ctx, '#1A2740', null);
  brein(ctx, 340, 400, 0.72, 1, {}); vlek(ctx, 300, 430, 34, '#F0A04A', vlekA, t, 1);
  ctx.restore(); }
function hartIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -30); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 2); ctx.restore(); }
function chocoIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -50, -34, 100, 68, 6); shape(ctx, '#6A4A3A', '#8C6A54', 2); ctx.strokeStyle = '#8C6A54'; ctx.lineWidth = 2; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-50 + i * 33, -34); ctx.lineTo(-50 + i * 33, 34); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(50, 0); ctx.stroke(); ctx.restore(); }
function gameIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -60, -30, 120, 60, 28); shape(ctx, '#3A4458', '#AFC0D0', 2); ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-38, -4, 24, 8); ctx.fillRect(-30, -12, 8, 24); circ(ctx, 28, -6, 7, C.groen); circ(ctx, 42, 8, 7, C.koraal); ctx.restore(); }
function gezichtIcoon(ctx, x, y, s, a = 1, col = '#E3B998') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 34 * s, col, lighten(col, 0.3), 2); circ(ctx, x - 12 * s, y - 6 * s, 4 * s, '#2A2420'); circ(ctx, x + 12 * s, y - 6 * s, 4 * s, '#2A2420'); ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y + 4 * s, 12 * s, 0.3, 2.84); ctx.stroke(); ctx.restore(); }
function huisIcoon(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -32, -6, 64, 46, 4); shape(ctx, '#C9A35C', '#E0C890', 2); ctx.beginPath(); ctx.moveTo(-40, -4); ctx.lineTo(0, -40); ctx.lineTo(40, -4); ctx.closePath(); shape(ctx, C.koraal, null); ctx.fillStyle = '#5A4632'; ctx.fillRect(-8, 14, 16, 26); ctx.restore(); }
function postkoets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -110, -90, 220, 110, 14); shape(ctx, '#8C5A3A', '#B08A5C', 2); roundRect(ctx, -80, -70, 60, 50, 6); shape(ctx, '#3A4458', null); roundRect(ctx, 20, -70, 60, 50, 6); shape(ctx, '#3A4458', null);
  [-70, 70].forEach(dx => { circ(ctx, dx, 34, 34, null, '#2E3A55', 7); circ(ctx, dx, 34, 6, '#2E3A55'); }); ctx.restore(); }
function zandloper(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-30, -44); ctx.lineTo(30, -44); ctx.lineTo(0, 0); ctx.lineTo(30, 44); ctx.lineTo(-30, 44); ctx.lineTo(0, 0); ctx.closePath(); shape(ctx, rgba(C.oker, 0.3), C.oker, 2.5); ctx.restore(); }
// een liggend personage (gekanteld) op het bed van de scanner
function liggend(ctx, id, x, y, h, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); persoon(ctx, id, 0, 0, h, { a, t, uit: 'neutraal' }); ctx.restore(); }
// kleine curve: BOLD-signaal dat ~5 s na de activiteit piekt
function boldGrafiek(ctx, x, y, w, h, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; assen(ctx, x, y, w, h, '', '');
  metaText(ctx, 'TIJD (S)', x + w, y + h + 44, C.grain, 'right', 28); for (let k = 0; k <= 10; k += 5) metaText(ctx, String(k), x + k / 12 * w, y + h + 40, C.grain, 'center', 28);
  ctx.fillStyle = rgba(C.teal, 0.5); ctx.fillRect(x, y + h - 26, w * 0.5 / 12, 20); metaText(ctx, 'NEURONEN', x + 8, y + h - 36, C.teal, 'left', 28);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 3.5; ctx.beginPath(); const N = 80; for (let i = 0; i <= N * u; i++) { const tt = i / N * 12; const v = Math.max(0, tt - 1.5) ** 2 * Math.exp(-(Math.max(0, tt - 1.5)) / 1.2) / 3.4; const px = x + tt / 12 * w, py = y + h - v * h * 0.9; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke();
  ctx.restore(); }
// gemiddelde EEG-golven voor gezicht en huis (N170)
function erpGrafiek(ctx, x, y, w, h, a = 1, uG = 1, uH = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
  metaText(ctx, '0', x, y + h + 36, C.grain, 'center', 28); metaText(ctx, '0,2 S', x + w * 0.4, y + h + 36, C.grain, 'center', 28); metaText(ctx, '0,5 S', x + w, y + h + 36, C.grain, 'right', 28);
  const curve = (col, dip, u) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; ctx.beginPath(); const N = 120; for (let i = 0; i <= N * u; i++) { const tt = i / N * 0.5; const v = 0.35 * Math.exp(-(((tt - 0.1) / 0.03) ** 2)) - dip * Math.exp(-(((tt - 0.17) / 0.025) ** 2)) + 0.25 * Math.exp(-(((tt - 0.3) / 0.06) ** 2)); const px = x + tt / 0.5 * w, py = y + h / 2 - v * h * 0.8; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke(); };
  curve(C.oker, 0.25, uH); curve(C.teal, 0.85, uG); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { brein(ctx, 1480, 700, 0.8, 1, {}); vlek(ctx, 1435, 730, 36, '#F0A04A', 1, t, 1); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'yasmin', 470, 880, 600, { pose: 'vasthouden', uit: q.on('foto', 1) > 0.5 ? 'verbaasd' : 'neutraal', t });
    naamBij(ctx, 'Yasmin', 'leerling', 640, 330, q.on('Yasmin', 1));
    nieuwsKaart(ctx, 980, 150, 1.15, q.on('nieuwsbericht', 1), q.on('vlek', 1), t);
    tag(ctx, 'wat laat de vlek zien?', 1370, 860, C.goud, q.on('eigenlijk', 1), 'center', 34); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('bord', 1, 0.8);
    const ctg = [['kijken wat ontbreekt', 'ontbreekt', C.koraal], ['elektriciteit meten', 'elektriciteit', C.teal], ['bloed meten', 'bloed', C.koraal], ['zelf ingrijpen', 'ingrijpen', C.groen]];
    brein(ctx, 520, 470, 0.95, q.on('nooit', 1) * (1 - B * 0.5), {});
    ctg.forEach(([s2, w, col], i) => chip(ctx, s2, 520, 160 + i * 64, col, q.on(w, 1) * (1 - B * 0.4), 30));
    methodenBord(ctx, 1040, 160, 1, [], B);
    const kols = [['waar', 1440], ['wanneer', 1600], ['oorzaak', 1780]]; kols.forEach(([w, x2], i) => { const h = q.on(w, i === 2 ? 1 : 2, 0.4) * (1 - q.on(kols[Math.min(2, i + 1)][0], i + 1 === 2 ? 1 : 2, 0.4) * (i < 2 ? 1 : 0)); if (h > 0.01) { ctx.save(); ctx.globalAlpha *= h; roundRect(ctx, x2 - 90, 175, 180, 60, 10); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); ctx.restore(); } }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'PARIJS · 1861', 120, 140, C.grain, 'left', 30);
    bubbel(ctx, 400, 320, 'tan', '#F2F2EE', q.on('tan', 1), 64);
    tag(ctx, 'begrijpt bijna alles', 400, 470, C.groen, q.on('begrijpt', 1), 'center', 30);
    const d = q.on('dood', 1); brein(ctx, 1240, 520, 1.1, d, {}); vlek(ctx, 1000, 510, 64, C.koraal, q.on('beschadigd', 1), t, 0);
    tag(ctx, 'links voorin beschadigd', 1000, 650, C.koraal, q.on('beschadigd', 1) * (1 - q.on('heet', 1)), 'center', 30);
    naamBij(ctx, 'gebied van Broca', 'spraak maken', 820, 700, q.on('heet', 1));
    for (let i = 0; i < 3; i++) { const a = q.on('andere', 1, 0.5 + i * 0.3) * (1 - q.on('heet', 1) * 0.6); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; brein(ctx, 220 + i * 220, 760, 0.28, 1, {}); vlek(ctx, 150 + i * 220, 760, 18, C.koraal, 1); ctx.restore(); } } },

  s06(ctx, t, q) { bg(ctx, 'schema'); const L = 1 - q.on('beroemdste', 1, 0.8);
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'laesie = beschadiging', 960, 470, 1, C.text, 60, 'center', 700); ctx.restore(); }
    const G = q.on('beroemdste', 1, 0.8); if (G > 0.01) { ctx.save(); ctx.globalAlpha *= G; metaText(ctx, 'VERENIGDE STATEN · 1848', 120, 140, C.grain, 'left', 30);
      const u = clamp((t - q.at('schiet', 1)) / 0.6, 0, 1); schedelStaaf(ctx, 620, 500, 1.15, 1, u);
      naamBij(ctx, 'Phineas Gage', 'spoorwegwerker', 900, 220, q.on('Phineas', 1));
      tag(ctx, 'linker voorkant geraakt', 620, 820, C.koraal, q.on('linker', 1), 'center', 30);
      ['lopen', 'praten', 'rekenen'].forEach((w, i) => { const a = q.on(w, 1); if (a > 0.01) { vink_(ctx, 1180, 360 + i * 80, 30, a, C.groen); regel(ctx, w, 1220, 372 + i * 80, a, C.text, 34, 'left', 700); } });
      const z = q.on('Twintig', 1); if (z > 0.01) { paneel(ctx, 1120, 600, 660, 220, '', z); regel(ctx, 'arts, 1868:', 1150, 660, z, C.grain, 28, 'left', 600); regel(ctx, '"ongeduldig en grof,', 1150, 720, z, C.text, 36, 'left', 600); regel(ctx, 'niet meer de betrouwbare voorman"', 1150, 772, z, C.text, 36, 'left', 640); }
      ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); const m = q.on('zwerver', 1);
    chip(ctx, 'dronken zwerver', 480, 260, C.text2, m, 40); stempel(ctx, 480, 380, 'MYTHE', C.koraal, q.on('klopt', 1));
    postkoets(ctx, 1260, 380, 1.3, q.on('postkoets', 1)); tag(ctx, 'koetsier in Chili, zeven jaar', 1260, 540, C.groen, q.on('Chili', 1), 'center', 30);
    tag(ctx, 'karakter veranderd · deels hersteld', 960, 650, C.text, q.on('herstelde', 1) * (1 - q.on('autopsie', 1) * 0.6), 'center', 32);
    const s2 = q.on('autopsie', 1); if (s2 > 0.01) { schedelStaaf(ctx, 480, 640, 0.45, s2, 1); vraagteken(ctx, 640, 640, q.on('schatten', 1), 100); tag(ctx, 'schade alleen te schatten', 480, 860, C.text2, q.on('schatten', 1), 'center', 28); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const H = q.on('Henk', 1, 0.8);
    const kaarten = [['je kiest de plek niet', 'kiest'], ['schade is zelden één gebied', 'zelden'], ['de hersenen passen zich aan', 'passen']];
    kaarten.forEach(([s2, w], i) => { const a = q.on(w, 1) * (1 - H * 0.55); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, 120 + i * 580, 170, 520, 120, 14); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2); regel(ctx, (i + 1) + '. ' + s2, 150 + i * 580, 245, 1, C.text, 32, 'left', 480); ctx.restore(); } });
    ['ongeluk', 'beroerte', 'tumor'].forEach((w, i) => tag(ctx, w, 260 + i * 140, 340, C.text2, q.on(w, 1) * (1 - q.on('zelden', 1)), 'center', 26));
    const P = q.on('patiënt', 1) * (1 - H); if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; brein(ctx, 960, 620, 0.85, 1, {}); vlek(ctx, 790, 610, 50, rgba(C.koraal, 0.5), 1); ctx.beginPath(); ctx.ellipse(780, 640, 120, 90, 0.2, 0, 6.283); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); tag(ctx, 'schade: groter en dieper', 790, 820, C.koraal, 1, 'center', 28); ctx.restore(); }
    if (H > 0.01) { persoon(ctx, 'henk', 520, 880, 520, { a: H, uit: 'bezorgd', t }); naamBij(ctx, 'Opa Henk', 'na een beroerte', 700, 420, H);
      brein(ctx, 1320, 600, 0.75, H, {}); vlek(ctx, 1380, 560, 40, C.koraal, q.on('schade', 2), t, 1);
      tag(ctx, 'welke taak lukt niet meer?', 1320, 380, C.goud, q.on('taak', 1), 'center', 30); } },

  s09(ctx, t, q) { bg(ctx, 'schema');
    methodenBord(ctx, 540, 220, 1, ['laesie'], 1, { hi: 'laesie', groei: { laesie: clamp((t - q.at('bord', 1)) / 2.5, 0, 1) } });
    tag(ctx, 'op een scan zie je de plek, maar de schade is grof', 960, 160, C.teal, q.on('grof', 1) * (1 - q.on('wanneer', 1)), 'center', 30);
    tag(ctx, 'je ziet alleen het eindresultaat', 960, 160, C.oker, q.on('eindresultaat', 1) * (1 - q.on('oorzaak', 1)), 'center', 30);
    haak(ctx, 1180, 1340, 450, 'waarschijnlijk nodig', C.groen, q.on('nodig', 1)); },

  // ---------- H2 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Kim', 1), G = q.on('reeks', 1, 0.8);
    persoon(ctx, 'kim', 300, 880, 600, { a: K, pose: 'wijs', t }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 60, 200, K);
    persoon(ctx, 'yasmin', 700, 880, 580, { a: K, t }); eegKap(ctx, 700, 880 - 580 * 0.97, 72, q.on('kap', 1), t, q.on('optelsom', 1));
    tag(ctx, 'EEG', 700, 210, C.teal, q.on('EEG', 1), 'center', 44);
    for (let i = 0; i < 4; i++) golf(ctx, 940, 260 + i * 110, 820, 22, q.on('optelsom', 1) * (1 - G * 0.6), { t, seed: i + 1, freq: 3 + i });
    tag(ctx, 'optelsom van miljoenen neuronen, in hetzelfde ritme', 1350, 720, C.teal, q.on('ritme', 1) * (1 - q.on('Berger', 1)), 'center', 28);
    const B = q.on('Berger', 1) * (1 - G); if (B > 0.01) { metaText(ctx, 'HANS BERGER · 1924', 1350, 720, C.grain, 'center', 28); golf(ctx, 940, 800, 820, 26, q.on('rustige', 1), { t, freq: 10, schaal: 1, seed: 9, col: C.groen }); tag(ctx, '± 10 per seconde', 1350, 760, C.groen, q.on('tien', 1), 'center', 28); }
    if (G > 0.01) { for (let i = 0; i < 6; i++) { const huis = i === 3; const a = G * clamp((t - q.at('reeks', 1)) * 2 - i * 0.5, 0, 1); if (huis) huisIcoon(ctx, 1000 + i * 130, 790, 1, a); else gezichtIcoon(ctx, 1000 + i * 130, 790, 1, a); } } },

  s12(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('middelt', 1, 1), R = q.on('waar', 1, 0.8) * (1 - q.on('bord', 1, 0.8)), Bd = q.on('bord', 1, 0.8);
    regel(ctx, 'Antwoord a: wanneer', 120, 140, 1, C.groen, 40, 'left', 700);
    golf(ctx, 160, 400, 760, 46, (1 - M) * (1 - Bd), { t, seed: 3, freq: 6 }); tag(ctx, 'één gezicht: veel ruis', 540, 520, C.text2, q.on('ruis', 1) * (1 - M) * (1 - Bd), 'center', 28);
    if (M * (1 - Bd) > 0.01) { erpGrafiek(ctx, 160, 260, 760, 300, M * (1 - Bd), q.on('gezicht', 2), q.on('huis', 1)); tag(ctx, 'gezicht', 980, 300, C.teal, M * (1 - Bd), 'left', 30); tag(ctx, 'huis', 980, 360, C.oker, M * (1 - Bd), 'left', 30); tag(ctx, 'verschil na ± 0,17 s', 480, 640, C.goud, q.on('vijfde', 1) * (1 - Bd), 'center', 30); }
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; brein(ctx, 1460, 520, 0.7, 1, {}); circ(ctx, 1420, 380, 150, rgba(C.teal, 0.18)); circ(ctx, 1420, 380, 90, rgba(C.teal, 0.25)); tag(ctx, 'waar? vaag, als door een beslagen raam', 1460, 800, C.teal, q.on('raam', 1), 'center', 28); tag(ctx, 'diep: nauwelijks', 1460, 860, C.text2, q.on('diep', 1), 'center', 28); ctx.restore(); }
    methodenBord(ctx, 540, 260, 1, ['laesie', 'eeg'], Bd, { hi: 'eeg', groei: { eeg: clamp((t - q.at('bord', 1)) / 2, 0, 1) } }); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), P = q.on('precies', 1, 0.8) * (1 - Bd), A = 1 - P - Bd;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; neuronElektrode(ctx, 500, 520, 1.2, 1, t, q.on('pulsje', 1));
      metaText(ctx, 'KAT · 1959', 1120, 160, C.grain, 'left', 30);
      const sch = q.on('Schuin', 1), rec = q.on('rechtop', 1); streepScherm(ctx, 1200, 340, 1.4, rec > 0.5 ? 0 : -0.7, q.on('lichtstreepjes', 1));
      const tijden = sch > 0.5 && rec < 0.5 ? [0.1, 0.18, 0.22, 0.35, 0.41, 0.55, 0.6, 0.72, 0.8, 0.9] : [0.3, 0.75]; spikeSpoor(ctx, 1060, 600, 700, tijden, q.on('reageren', 1), ((t * 0.4) % 1));
      tag(ctx, rec > 0.5 ? 'rechtop: stil' : 'schuin: veel pulsjes', 1410, 660, rec > 0.5 ? C.text2 : C.goud, sch, 'center', 30);
      naamBij(ctx, 'Hubel en Wiesel', 'Nobelprijs 1981', 1080, 780, q.on('Hubel', 1)); ctx.restore(); }
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; regel(ctx, 'welke cel, op welke duizendste seconde', 960, 220, 1, C.goud, 40, 'center', 700);
      chip(ctx, 'alleen bij dieren, of tijdens een hersenoperatie', 960, 380, C.text2, q.on('dieren', 1), 32);
      regel(ctx, 'hooguit een paar honderd cellen', 520, 560, q.on('honderd', 1), C.text, 40, 'center', 700); regel(ctx, 'van de 86 miljard', 1400, 560, q.on('miljard', 1), C.text2, 40, 'center', 700);
      ctx.save(); for (let i = 0; i < 300; i++) { const a = q.on('miljard', 1); if (a > 0.01) circ(ctx, 1060 + hash(i) * 680, 620 + hash(i + 900) * 220, 3, rgba(C.teal, 0.6 * a)); } for (let i = 0; i < 6; i++) circ(ctx, 380 + i * 50, 680, 9, C.goud, null); ctx.restore(); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel'], Bd, { hi: q.on('oorzaak', 1) > 0.5 ? null : 'cel', groei: { cel: clamp((t - q.at('bord', 1)) / 2, 0, 1) } }); },

  // ---------- H3 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), N = q.on('nadeel', 1, 0.8) * (1 - Bd), A = 1 - N - Bd;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; scanner(ctx, 560, 520, 0.9, q.on('scanner', 1)); liggend(ctx, 'yasmin', 1000, 610, 520, q.on('Yasmin', 1), t); naamBij(ctx, 'fMRI', 'meet bloed', 100, 180, q.on('bloed', 1));
      bloedvat(ctx, 1080, 300, 680, q.on('seintje', 1), t, q.on('open', 1)); tag(ctx, 'meer zuurstofrijk bloed dan nodig', 1420, 420, C.koraal, q.on('nodig', 1), 'center', 30);
      tag(ctx, 'zuurstofrijk en zuurstofarm: anders voor een magneet', 1420, 820, C.teal, q.on('magneet', 1), 'center', 28); ctx.restore(); }
    if (N > 0.01) { boldGrafiek(ctx, 300, 260, 1200, 480, N, clamp((t - q.at('traag', 1)) / 3, 0, 1)); tag(ctx, 'piek na ± 5 s', 760, 230, C.koraal, q.on('piekt', 1), 'center', 32); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel', 'fmri'], Bd, { hi: 'fmri', groei: { fmri: clamp((t - q.at('Hoog', 1)) / 2, 0, 1) } }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const AF = q.on('trekt', 1, 0.8), W = q.on('werk', 1, 0.8);
    const sel = q.on('kleurt', 1); voxelRaster(ctx, 160, 220, 640, 480, 16, q.on('blokjes', 1) * (1 - W * 0.6), sel > 0.01 ? [[9, 7, '#F0A04A', sel], [10, 7, '#F0A04A', sel], [9, 8, '#F0A04A', sel * 0.7]] : null);
    tag(ctx, 'elk blokje: paar miljoen neuronen', 480, 760, C.text2, q.on('miljoen', 1) * (1 - AF), 'center', 28);
    const B = q.on('afwisselend', 1) * (1 - AF * 0.4); if (B > 0.01) { const k = Math.floor((t - q.at('afwisselend', 1)) / 1.2) % 2; for (let i = 0; i < 4; i++) { const on = (i % 2) === k; if (i % 2 === 0) gezichtIcoon(ctx, 1000 + i * 180, 300, 1.2, B * (on ? 1 : 0.35)); else huisIcoon(ctx, 1000 + i * 180, 300, 1.2, B * (on ? 1 : 0.35)); } tag(ctx, 'afwisselend in blokjes', 1270, 400, C.text2, B, 'center', 28); }
    if (AF > 0.01) { ctx.save(); ctx.globalAlpha *= AF * (1 - W * 0.5); regel(ctx, 'gezichten', 1000, 560, 1, C.teal, 36, 'left', 700); regel(ctx, '−  huizen', 1220, 560, 1, C.oker, 36, 'left', 700); regel(ctx, '=  vlek', 1460, 560, sel, '#F0A04A', 36, 'left', 700); ctx.restore(); tag(ctx, 'geen foto, maar een berekening', 1320, 660, C.goud, q.on('berekening', 1) * (1 - W), 'center', 32); }
    if (W > 0.01) haak(ctx, 960, 1700, 720, 'taak en controletaak bedenken: werk van de psycholoog', C.groen, W); },

  s16(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, '2009', 120, 140, C.grain, 'left', 30); scanner(ctx, 760, 520, 0.9, 1); zalm(ctx, 1080, 600, 1.1, q.on('zalm', 1));
    nieuwsKaart(ctx, 1280, 160, 0.55, q.on('foto', 1), 0, t, 'Hoe voelt deze persoon zich?'); vraagteken(ctx, 760, 260, q.on('vonden', 1), 110); },

  s18(ctx, t, q) { bg(ctx, 'schema'); const C2 = q.on('correctie', 1, 1), IG = q.on('Nobelprijs', 1, 0.8);
    regel(ctx, 'Antwoord b: een paar blokjes', 120, 140, 1, C.groen, 40, 'left', 700);
    zalm(ctx, 560, 500, 1.2, 1 - IG * 0.4); vlek(ctx, 790, 488, 16, '#F0A04A', q.on('vlekje', 1) * (1 - C2), t, 1); tag(ctx, 'puur toeval', 790, 380, '#F0A04A', q.on('toeval', 1) * (1 - C2), 'center', 30);
    const T = q.on('honderdduizend', 1); if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T * (1 - IG * 0.5); for (let i = 0; i < 40; i++) for (let j = 0; j < 24; j++) { const lit = hash(i * 31 + j * 7) > 0.994 && C2 < 0.5; ctx.fillStyle = lit ? '#F0A04A' : rgba(C.line, 0.25); ctx.fillRect(1100 + i * 18, 220 + j * 18, 14, 14); } ctx.restore(); tag(ctx, 'meer dan 100.000 toetsen', 1460, 690, C.text2, T * (1 - IG), 'center', 28); }
    tag(ctx, 'met correctie: geen vlek', 1460, 760, C.groen, C2 * (1 - IG), 'center', 32);
    stempel(ctx, 1460, 780, 'IG NOBELPRIJS 2012', C.goud, IG); },

  s19(ctx, t, q) { bg(ctx, 'schema'); const Bd = q.on('bord', 1, 0.8), V = q.on('valkuil', 1, 0.8) * (1 - Bd), A = 1 - V - Bd;
    if (A > 0.01) { nieuwsKaart(ctx, 200, 170, 1, A, 1, t); tag(ctx, 'antwoord b', 540, 780, C.groen, q.on('bee', 1) * A, 'center', 34); tag(ctx, 'iets meer bloed dan bij een andere taak', 1380, 460, C.koraal, q.on('stroomde', 1) * A, 'center', 32); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; brein(ctx, 1240, 560, 0.95, 1, {}); vlek(ctx, 1180, 600, 44, '#F0A04A', 1, t, 1);
      const ic = [[hartIcoon, 'verliefdheid', 300], [chocoIcoon, 'chocola', 500], [gameIcoon, 'gamen', 700]]; ic.forEach(([f, w, y2], i) => { const a = q.on(w, 1); f(ctx, 340, y2, 1.2, a); if (a > 0.01) pijl(ctx, 430, y2, 1080, 600, rgba(C.goud, 0.7), a, 3, 14); });
      stempel(ctx, 1240, 300, 'GEEN VERLIEFDHEIDSGEBIED', C.koraal, q.on('verliefdheidsgebied', 1)); tag(ctx, 'doet mee bij beloning', 1240, 820, C.goud, q.on('beloning', 1), 'center', 32); ctx.restore(); }
    methodenBord(ctx, 540, 200, 1, ['laesie', 'eeg', 'cel', 'fmri'], Bd, { hi: 'fmri' }); haak(ctx, 1220, 1340, 610, 'doet waarschijnlijk mee; nodig? onbekend', C.koraal, q.on('nodig', 1)); },

  // ---------- H4 ----------
  s20(ctx, t, q) { bg(ctx, 'schema'); const N = q.on('benoemen', 1, 0.8);
    persoon(ctx, 'kim', 300, 880, 600, { pose: 'vasthouden', t }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 60, 200, 1);
    const hTr = q.on('trekt', 1, 0.2) * (1 - q.on('zelf', 1, 0.6)); persoon(ctx, 'yasmin', 720, 880, 580, { pose: hTr > 0.3 ? 'wijs' : 'staan', uit: hTr > 0.3 ? 'verbaasd' : 'neutraal', t });
    spoel(ctx, 720, 880 - 580 * 1.05, 0.8, q.on('spoel', 1), q.on('stroomstoot', 1) * (1 - q.on('heet', 1)) + hTr, t);
    tag(ctx, 'TMS', 900, 200, C.teal, q.on('TMS', 1), 'center', 44);
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 1080, 200, 680, 280, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); regel(ctx, 'plaatjes benoemen', 1110, 250, 1, C.text, 32, 'left', 600);
      huisIcoon(ctx, 1200, 360, 1.3, 1); regel(ctx, '"... huis"', 1300, 380, 1, C.text, 36, 'left', 700);
      const br = q.on('Broca', 1), ach = q.on('achterin', 1); roundRect(ctx, 1080, 520, 680, 280, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
      regel(ctx, 'verstoord: gebied van Broca', 1110, 580, br, C.koraal, 30, 'left', 640); ctx.fillStyle = C.koraal; roundRect(ctx, 1110, 610, 520 * br, 34, 8); ctx.fill(); regel(ctx, 'trager, soms fout', 1110, 680, q.on('trager', 1), C.koraal, 28, 'left', 600);
      regel(ctx, 'controle: gebied achterin', 1110, 740, ach, C.groen, 30, 'left', 640); ctx.fillStyle = C.groen; roundRect(ctx, 1110, 760, 300 * ach, 30, 8); ctx.fill(); ctx.restore(); } },

  s22(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord a: het gebied helpt bij de taak', 120, 140, 1, C.groen, 40, 'left', 700);
    kruis(ctx, 180, 290, 26, q.on('anders', 1)); regel(ctx, 'niet: het doet niets anders', 230, 304, q.on('anders', 1), C.text, 34, 'left', 800);
    kruis(ctx, 180, 380, 26, q.on('onmisbaar', 1)); regel(ctx, 'niet: het is onmisbaar', 230, 394, q.on('onmisbaar', 1), C.text, 34, 'left', 800);
    const D = q.on('buitenste', 1); if (D > 0.01) { brein(ctx, 1380, 560, 0.95, D, {}); ctx.save(); ctx.globalAlpha *= D; ctx.strokeStyle = C.teal; ctx.lineWidth = 10; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.ellipse(1390, 560, 270, 190, 0, 3.6, 5.9); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); tag(ctx, 'alleen de buitenste laag, paar cm diep', 1380, 820, C.teal, q.on('diep', 1), 'center', 30); }
    chip(ctx, 'reeksen pulsen: ook behandeling bij depressie', 600, 620, C.groen, q.on('depressie', 1), 30); },

  s23(ctx, t, q) { bg(ctx, 'schema'); const Bd = clamp((t - q.at('2026', 1) - 2) / 1.5, 0, 1), O = 1 - Bd;
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; muis(ctx, 460, 640, 1.3, q.on('muizen', 1), q.on('aan', 1) * (1 - q.on('uit', 1)), t);
      chip(ctx, 'gen uit een groene alg', 460, 240, C.groen, q.on('alg', 1), 30); tag(ctx, 'alleen in één soort neuronen', 460, 300, C.text2, q.on('soort', 1), 'center', 28);
      lichtKanaal(ctx, 1320, 420, 1, q.on('blauw', 1) * (0.5 + 0.5 * Math.sin(t * 3)) * (1 - q.on('uit', 1)), q.on('kanaaltje', 1), t); tag(ctx, 'kanaaltje: open bij blauw licht', 1320, 600, C.teal, q.on('blauw', 1), 'center', 30);
      naamBij(ctx, 'optogenetica', 'aan en uit met licht', 1120, 700, q.on('optogenetica', 1));
      tag(ctx, 'aan → gedrag verschijnt: kan het veroorzaken', 1320, 790, C.groen, q.on('verschijnt', 1), 'center', 28); tag(ctx, 'uit → gedrag verdwijnt: nodig', 1320, 850, C.groen, q.on('verdwijnt', 1), 'center', 28);
      ctx.restore(); }
    stempel(ctx, 1500, 230, 'NOBELPRIJS 2026', C.goud, q.on('2026', 1) * O);
    methodenBord(ctx, 540, 170, 1, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], Bd, { groei: { tms: Bd, opto: clamp(Bd * 1.4 - 0.4, 0, 1) } }); },

  // ---------- Recap ----------
  s24(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('methode', 1, 0.8), K = q.on('zelf', 1, 0.8);
    nieuwsKaart(ctx, 160, 200, 0.95, 1 - M, 1, t); tag(ctx, 'verschil in doorbloeding, na een statistische keuze', 1300, 400, C.koraal, q.on('doorbloeding', 1) * (1 - M), 'center', 30); tag(ctx, 'geen knop voor verliefdheid', 1300, 500, C.goud, q.on('knop', 1) * (1 - M), 'center', 34);
    methodenBord(ctx, 540, 170, 1, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], M * (1 - K * 0.5), { hi: q.on('optogenetica', 1) > 0.5 ? null : (q.on('fMRI', 1) > 0.5 ? 'fmri' : (q.on('EEG', 1) > 0.5 ? 'eeg' : null)) });
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; roundRect(ctx, 360, 380, 1200, 220, 18); shape(ctx, rgba('#1A2740', 0.95), C.goud, 2); regel(ctx, 'Is een gebied achter je voorhoofd nodig', 960, 460, 1, C.text, 40, 'center', 700); regel(ctx, 'om je te concentreren?', 960, 520, 1, C.text, 40, 'center', 700); ctx.restore(); } },

  s26(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'Antwoord c: TMS', 120, 140, 1, C.groen, 40, 'left', 700);
    methodenBord(ctx, 1080, 170, 0.9, ['laesie', 'eeg', 'cel', 'fmri', 'tms', 'opto'], 1 - q.on('werk', 1, 0.8) * 0.6, { hi: 'tms' });
    tag(ctx, 'nodig? → ingrijpen', 500, 300, C.groen, q.on('ingrijpen', 1), 'center', 36); tag(ctx, 'verstoor en meet de taak', 500, 380, C.text, q.on('concentratietaak', 1), 'center', 30); tag(ctx, '+ controleplek', 500, 450, C.goud, q.on('controleplek', 1), 'center', 30);
    [['vraag bedenken', 'vraag'], ['methode kiezen', 'methode'], ['eerlijk over grenzen', 'eerlijk']].forEach(([s2, w], i) => chip(ctx, s2, 300 + i * 320, 680, C.groen, q.on(w, 1), 28)); }
});
