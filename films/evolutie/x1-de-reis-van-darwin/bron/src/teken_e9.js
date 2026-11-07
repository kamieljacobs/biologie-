// film 9 · De reis van Darwin · eigen hulpfuncties (na lib_dieren, vóór sb9.js)
// teken_evo9.js gebruikt VogelZang al bij het laden; bouw9.py maakt daar _x9vinkDefs() van, hier aangeroepen.
_x9vinkDefs();

// bewegende golfjes over x9zee (de lijntjes van x9zee zelf staan stil)
function e9golf(ctx, hor, t, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba('#9CCBE3', 0.28); ctx.lineWidth = 2;
  for (let j = 0; j < 6; j++) { const yy = hor + 50 + j * 60, v = 18 + j * 6; for (let i = 0; i < 8; i++) { const xx = ((hash(j * 31 + i * 7) * W + t * v) % (W + 120)) - 60, b = Math.sin(t * 1.3 + i + j) * 3;
    ctx.beginPath(); ctx.moveTo(xx, yy + b); ctx.quadraticCurveTo(xx + 34, yy - 6 + b, xx + 68, yy + b); ctx.stroke(); } } ctx.restore(); }
// schip dat deint op de golven
function e9schip(ctx, x, y, s, t, o = {}) { ctx.save(); ctx.translate(x, y + Math.sin(t * 1.1) * 4); ctx.rotate(Math.sin(t * 0.9) * 0.012); x9schip(ctx, 0, 0, s, o); ctx.restore(); }

// I think-boom (overschrijft x9ithink): groei 0..1, ik = alfa van 'I think'
function x9ithink(ctx, x, y, s = 1, o = {}) { const { groei = 1, inkt = '#3A3042', letters = true, a = 1, ik = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = inkt; ctx.lineCap = 'round'; ctx.lineWidth = 2.4;
  const T = [[0, 0, 0, -60], [0, -60, -50, -110], [0, -60, 40, -100], [-50, -110, -90, -140], [-50, -110, -40, -170], [40, -100, 20, -160], [40, -100, 110, -130], [-90, -140, -120, -190], [-90, -140, -70, -200], [20, -160, -10, -220], [20, -160, 50, -215], [110, -130, 150, -175], [110, -130, 120, -200], [-40, -170, -30, -205], [150, -175, 175, -215], [150, -175, 160, -230]];
  const f = groei * T.length; for (let i = 0; i < T.length; i++) { const u = clamp(f - i, 0, 1); if (u <= 0) break; const [a1, b1, a2, b2] = T[i];
    ctx.beginPath(); ctx.moveTo(a1, b1); const N = 10; for (let k = 1; k <= N * u; k++) { const v = k / N, cx = (a1 + a2) / 2 + 6, cy = (b1 + b2) / 2; ctx.lineTo((1 - v) * (1 - v) * a1 + 2 * v * (1 - v) * cx + v * v * a2, (1 - v) * (1 - v) * b1 + 2 * v * (1 - v) * cy + v * v * b2); } ctx.stroke(); }
  if (groei >= 0.999) [[-30, -205], [-120, -190], [160, -230], [50, -215], [120, -200]].forEach(([px, py]) => { ctx.beginPath(); ctx.moveTo(px - 7, py); ctx.lineTo(px + 7, py); ctx.stroke(); });
  ctx.font = 'italic 600 26px "Fraunces",Georgia,serif'; ctx.fillStyle = inkt; ctx.textAlign = 'center'; if (groei > 0) ctx.fillText('1', -14, 4);
  if (letters && groei >= 0.999) [['A', -70, -210], ['B', -10, -238], ['C', 150, -246], ['D', 178, -222]].forEach(([l, px, py]) => ctx.fillText(l, px, py));
  if (ik > 0.01) { ctx.globalAlpha *= ik; ctx.font = 'italic 600 44px "Fraunces",Georgia,serif'; ctx.textAlign = 'left'; ctx.fillText('I think', -170, -270); } ctx.restore(); }

// resten van de kleine nandoe op de kist: huid, kop+nek, poten (elk met eigen alfa)
function e9resten(ctx, aKist, aHuid, aKop, aPoot) { if (aKist > 0.01) { ctx.save(); ctx.globalAlpha *= aKist; roundRect(ctx, 1180, 740, 500, 120, 6); shape(ctx, '#6A4A34', '#8A6A4E', 2); lijn(ctx, [[1180, 780], [1680, 780]], '#5A3E2C', 3); ctx.restore(); }
  ctx.save(); ctx.translate(1430, 742); ctx.scale(1.5, 1.5);
  if (aHuid > 0.01) { ctx.save(); ctx.globalAlpha *= aHuid; vul(ctx, [[-200, 0], [-150, -24], [60, -30], [190, -8], [196, 0]], '#7C6A56'); ctx.fillStyle = '#E8E0D0'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.ellipse(-160 + i * 26, -12 - hash(i) * 8, 4, 6, 0.4, 0, 6.283); ctx.fill(); } ctx.restore(); }
  if (aKop > 0.01) { ctx.save(); ctx.globalAlpha *= aKop; lijn(ctx, [[-120, -6], [-40, -60], [-20, -64]], '#C2B8A8', 7); vul(ctx, [[-28, -72], [-6, -70], [8, -64], [-10, -60], [-28, -62]], '#C2B8A8'); dierOog(ctx, -14, -67, 2.2); ctx.restore(); }
  if (aPoot > 0.01) { ctx.save(); ctx.globalAlpha *= aPoot; lijn(ctx, [[40, -4], [70, -50], [60, -96]], '#B8AE98', 5); lijn(ctx, [[110, -4], [140, -50], [130, -96]], '#B8AE98', 5); ctx.restore(); }
  ctx.restore(); }
// kookpot boven een vuurtje (de nandoe wordt opgegeten)
function e9pot(ctx, x, y, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < 5; i++) { const fx = x - 50 + i * 25, fh = 40 + 18 * Math.sin(t * 7 + i * 1.7); vul(ctx, [[fx - 14, y], [fx, y - fh], [fx + 14, y]], i % 2 ? C.koraal : '#F0B080'); }
  lijn(ctx, [[x - 80, y + 4], [x + 80, y + 4]], '#5A3E2C', 10); vul(ctx, [[x - 70, y - 120], [x + 70, y - 120], [x + 60, y - 40], [x - 60, y - 40]], '#3A3A40', '#5A5A62', 2);
  ctx.fillStyle = rgba('#C8C8D0', 0.25); for (let i = 0; i < 4; i++) { const u = (t * 0.4 + i / 4) % 1; ctx.beginPath(); ctx.ellipse(x - 20 + i * 14 + u * 20, y - 140 - u * 120, 14 + u * 20, 8 + u * 10, 0, 0, 6.283); ctx.fill(); } ctx.restore(); }
// weegschaal 'bewijs' die leeg blijft
function e9weegschaal(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 200); ctx.moveTo(x - 60, y); ctx.lineTo(x + 60, y); ctx.moveTo(x - 130, y - 190); ctx.lineTo(x + 130, y - 190); ctx.stroke(); circ(ctx, x, y - 200, 8, C.line);
  for (const s of [-1, 1]) { const px = x + s * 130; ctx.beginPath(); ctx.moveTo(px, y - 190); ctx.lineTo(px - 46, y - 110); ctx.moveTo(px, y - 190); ctx.lineTo(px + 46, y - 110); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, y - 108, 56, 12, 0, 0, Math.PI); ctx.stroke(); } ctx.restore(); }
// stapel papier (manuscript 1844)
function e9stapel(ctx, x, y, n, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const yy = y - i * 7; roundRect(ctx, x - 110 + (hash(i) - 0.5) * 8, yy - 18, 220, 18, 3); shape(ctx, '#E6DCC4', '#C9BC9C', 1.2); } ctx.restore(); }
// gedeeltelijke pijl
function e9pijl(ctx, x1, y1, x2, y2, col, u, lw = 6, kop = 24) { if (u <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), col, 1, lw, kop); }
// knoop met twee takken die groeien
function e9splits(ctx, x, y, g, kleur = C.groen, b = 140, h = 130) { if (g <= 0.01) return; ctx.save(); ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const u = clamp(g * 1.4, 0, 1), v = clamp(g * 1.4 - 0.4, 0, 1); ctx.beginPath(); ctx.moveTo(x, y + 50); ctx.lineTo(x, y + 50 - 50 * u); ctx.stroke();
  if (v > 0) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - b * v, y - h * v); ctx.moveTo(x, y); ctx.lineTo(x + b * v, y - h * v); ctx.stroke(); } circ(ctx, x, y, 10 * u, kleur); ctx.restore(); }
