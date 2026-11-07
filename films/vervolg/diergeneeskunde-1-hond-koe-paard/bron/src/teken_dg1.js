// Wat word jij? · Diergeneeskunde 1 · Hond, koe, paard — eigen tekeningen (21 okt 2026). Gebruikt de gedeelde dieren uit teken_dg0.js.

// cellulose: keten van glucoseringen; knip = 0..1 (microben knippen hem in stukjes)
function zeshoek(ctx, x, y, r, col, lw = 3) { ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(an) * r, py = y + Math.sin(an) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
function cellulose(ctx, x, y, n, r, a = 1, knip = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const gap = knip * (i % 2 ? 1 : 0) * 18, dy = knip * Math.sin(i * 2 + t) * 14; const cx = x + i * r * 2.3 + gap * i * 0.4, cy = y + dy; zeshoek(ctx, cx, cy, r, C.groen, 3);
    if (i < n - 1 && !(knip > 0.5 && i % 2 === 1)) { ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + r * 0.87, cy); ctx.lineTo(cx + r * 1.43, cy); ctx.stroke(); } }
  ctx.restore(); }
// microbe (bacterie, staafje met trilhaar)
function microbe(ctx, x, y, s, an, t, col = C.grain) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -18 * s, -8 * s, 36 * s, 16 * s, 8 * s); shape(ctx, rgba(col, 0.85), col, 1.5); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-18 * s, 0); ctx.quadraticCurveTo(-28 * s, 6 * Math.sin(t * 8), -38 * s, 0); ctx.stroke(); ctx.restore(); }
// gasbelletjes (methaan) die opstijgen
function belletjes(ctx, x, y, a = 1, t = 0, col = '#C9DFA8', n = 8) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const ph = (t * 0.4 + i / n) % 1; ctx.strokeStyle = rgba(col, 1 - ph); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x + Math.sin(ph * 6 + i) * 18, y - ph * 160, 8 + ph * 8, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// tik-golf ('ping')
function ping(ctx, x, y, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 3; i++) { const ph = (t * 1.2 + i / 3) % 1; ctx.strokeStyle = rgba(C.goud, 1 - ph); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 20 + ph * 80, 0, 6.283); ctx.stroke(); } ctx.restore(); }
// lever met twee afbraakroutes: route 1 (gewoon, naar wateroplosbaar) en route 2 (giftig tussenproduct); dicht = 0..1 route 1 grotendeels dicht (kat)
function leverRoutes(ctx, x, y, a = 1, dicht = 0, giftig = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  zacht(ctx, [[x - 260, y - 40], [x - 160, y - 140], [x + 60, y - 150], [x + 240, y - 110], [x + 260, y - 40], [x + 140, y + 60], [x - 120, y + 80], [x - 250, y + 30]]); shape(ctx, '#8A3A34', '#B85A50', 2.5);
  tablet(ctx, x - 380, y - 40, 34, 1, 1); pijl(ctx, x - 340, y - 40, x - 230, y - 40, C.text, 1, 5, 18);
  // route 1
  const r1 = 1 - dicht * 0.85; ctx.save(); ctx.globalAlpha *= r1; pijl(ctx, x - 160, y - 60, x + 330, y - 160, C.groen, 1, 8, 24); ctx.restore(); regel(ctx, 'gewone afbraak → naar de nieren', x + 360, y - 160, r1, C.groen, 28, 'left', 700);
  if (dicht > 0.01) { ctx.save(); ctx.globalAlpha *= dicht; ctx.strokeStyle = C.koraal; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 60, y - 150); ctx.lineTo(x + 100, y - 90); ctx.moveTo(x + 100, y - 150); ctx.lineTo(x + 60, y - 90); ctx.stroke(); ctx.restore(); regel(ctx, 'enzym grotendeels afwezig', x + 120, y - 210, dicht, C.koraal, 26, 'center', 700); }
  // route 2: giftig tussenproduct
  if (giftig > 0.01) { ctx.save(); ctx.globalAlpha *= giftig; pijl(ctx, x - 100, y + 20, x + 330, y + 120, C.koraal, 1, 6 + giftig * 6, 24); for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; circ(ctx, x - 100 + ph * 420, y + 20 + ph * 100, 9, C.koraal); } ctx.restore(); regel(ctx, 'giftig tussenproduct', x + 360, y + 130, giftig, C.koraal, 28, 'left', 800); }
  ctx.restore(); }
// rode bloedcel (biconcaaf schijfje) die bruin kleurt (bruin 0..1)
function rodeBloedcel(ctx, x, y, r, bruin = 0, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = _mix('#C0392B', bruin * 0.75, '#6B4A30'); ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.92, 0, 0, 6.283); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y, r * 0.5, r * 0.45, 0, 0, 6.283); ctx.fillStyle = _lt(col, 0.18); ctx.fill(); ctx.restore(); }
// hersenen met bloedvat en bloed-hersenbarrière; pomp = 1 (werkt) of 0 (werkt niet); ophoop = 0..1
function bloedHersen(ctx, x, y, a = 1, pomp = 1, ophoop = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 300, y - 40, 600, 80, 40); shape(ctx, 'rgba(192,57,43,0.3)', '#C0392B', 3); regel(ctx, 'bloedvat', x - 280, y + 80, 1, C.koraal, 26, 'left', 700);
  ctx.fillStyle = 'rgba(232,180,168,0.25)'; ctx.fillRect(x - 320, y - 330, 640, 270); regel(ctx, 'hersenen', x - 280, y - 290, 1, '#E8B4A8', 30, 'left', 800);
  ctx.strokeStyle = C.teal; ctx.lineWidth = 8; ctx.setLineDash([22, 10]); ctx.beginPath(); ctx.moveTo(x - 320, y - 56); ctx.lineTo(x + 320, y - 56); ctx.stroke(); ctx.setLineDash([]); regel(ctx, 'bloed-hersenbarrière', x + 330, y - 46, 1, C.teal, 26, 'left', 700);
  // pompjes
  [-150, 0, 150].forEach((dx, i) => { const px = x + dx; roundRect(ctx, px - 22, y - 76, 44, 40, 10); shape(ctx, pomp > 0.5 ? C.goud : '#5A6070', pomp > 0.5 ? '#F2D27A' : '#7A8090', 2); if (pomp > 0.5) { const ph = (t * 0.8 + i * 0.3) % 1; circ(ctx, px, y - 100 + ph * 80, 8, C.paars); } else kruis(ctx, px, y - 56, 12, 0.9); });
  // middel in de hersenen
  for (let i = 0; i < 18; i++) { const f = clamp(ophoop * 18 - i, 0, 1); if (f <= 0.01) continue; circ(ctx, x - 280 + hash(i * 2.9) * 560, y - 260 + hash(i * 4.7) * 170, 8 * f, C.paars); }
  ctx.restore(); }
// tijdlijn opleiding: bachelor 3 jaar + master 3 jaar
function opleidingLijn(ctx, x, y, w, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const half = w / 2;
  roundRect(ctx, x, y, half - 8, 70, 14); shape(ctx, rgba(C.teal, 0.2), C.teal, 2); regel(ctx, 'bachelor · 3 jaar', x + half / 2, y + 46, 1, C.text, 32, 'center', 800);
  if (u > 0.01) { ctx.save(); ctx.globalAlpha *= u; roundRect(ctx, x + half + 8, y, half - 8, 70, 14); shape(ctx, rgba(C.goud, 0.2), C.goud, 2); regel(ctx, 'master · 3 jaar', x + half * 1.5, y + 46, 1, C.text, 32, 'center', 800); ctx.restore(); }
  ctx.restore(); }
// pol gras (groene sprieten)
function grasPol(ctx, x, y, w, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#6FAE5A'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < w / 7; i++) { const px = x + hash(i * 1.3) * w, h = 30 + hash(i * 2.1) * 50, sw = Math.sin(t * 1.5 + i) * 6; ctx.beginPath(); ctx.moveTo(px, y); ctx.quadraticCurveTo(px + sw * 0.5, y - h * 0.6, px + sw + (hash(i) - 0.5) * 20, y - h); ctx.stroke(); } ctx.restore(); }
