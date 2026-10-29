// teken_e4.js — eigen hulpfuncties voor de animatie van Ecologie v2 film 4 "Waar blijft het blad?" (laadt na teken_eco4.js, vóór sb4.js).
// Niets uit /root/eco2 of ecolib aangepast.
const e4fr = (u) => u - Math.floor(u);
const e4A = (ctx, a, fn) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
function e4PijlG(ctx, x1, y1, x2, y2, u, kl = C.oker, lw = 4, a = 1) { if (u <= 0.01 || a <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), kl, a, lw, 18); }
// vallende bladeren (cyclisch); n stuks in het gebied x0..x1, van y0 tot y1, a = zichtbaarheid
function e4Vallend(ctx, t, n, a = 1, x0 = 0, x1 = W, y0 = -40, y1 = 820, v = 0.12, s = 2.6) { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const u = e4fr(t * v * (0.8 + 0.4 * hash(i + 3)) + hash(i)); const x = x0 + hash(i + 7) * (x1 - x0) + Math.sin(t * 1.3 + i) * 30, y = lerp(y0, y1, u);
    e4A(ctx, a * Math.min(1, u * 8, (1 - u) * 8), () => ecoEikenblad(ctx, x, y, s, { hoek: hash(i + 5) * 6 + Math.sin(t * 1.7 + i) * 0.8 })); } }
// strooisel: n bladeren op de grond van het bos
function e4Strooisel(ctx, n, hz = 640) { for (let i = 0; i < n; i++) { const x = hash(i) * W, y = hz + 150 + hash(i + 40) * 160; ctx.save(); ctx.translate(x, y); ctx.rotate(hash(i + 9) * 6.28); ctx.beginPath(); ctx.ellipse(0, 0, 13, 6, 0, 0, 6.283); ctx.fillStyle = ['#8C5A3A', '#A06C36', '#6E4A30'][i % 3]; ctx.fill(); ctx.restore(); } }
// logboek met per regel een zichtbaarheid (ruimte voor alle regels staat er al)
function e4LogA(ctx, x, y, w, regels, al, o = {}) { const { kolom = ['datum', 'massa', 'wie', 'vrijgekomen'], kw = [0, 0.15, 0.28, 0.72] } = o; const rh = 64;
  roundRect(ctx, x, y, w, 110 + regels.length * rh, 16); shape(ctx, rgba(C.bgMicro, 0.92), C.line, 1.5); metaText(ctx, 'LOGBOEK · ÉÉN EIKENBLAD', x + 24, y + 40, C.goud, 'left', 26);
  kolom.forEach((k, i) => metaText(ctx, k, x + 24 + kw[i] * w, y + 86, C.text2, 'left', 26));
  regels.forEach((r, j) => { const a = al[j] ?? 1; if (a <= 0.01) return; const yy = y + 110 + j * rh + 40; e4A(ctx, a, () => r.forEach((c, i) => { if (c == null) return; const ai = Array.isArray(o.cel) && o.cel[j] && o.cel[j][i] != null ? o.cel[j][i] : 1; if (ai <= 0.01) return;
      e4A(ctx, ai, () => { if (typeof c === 'function') c(ctx, x + 24 + kw[i] * w, yy); else text(ctx, c, x + 24 + kw[i] * w, yy, fTekst(i === 2 ? 34 : 36, i === 1 ? 700 : 500), i === 1 ? C.text : C.text2, 'left'); }); })); }); }
// staafdiagram van de gaasproef met groei per staaf (g = [begin, grof, fijn] 0..1)
function e4StaafA(ctx, x, y, w, h, g) { const stv = [[125, 'begin', C.text2], [53, 'grof gaas', C.oker], [89, 'fijn gaas', C.teal]]; const bw = w / 5;
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; for (let v = 25; v <= 125; v += 25) { ctx.beginPath(); ctx.moveTo(x, y - v / 125 * h); ctx.lineTo(x + w, y - v / 125 * h); ctx.stroke(); }
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - h - 10); ctx.lineTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  for (let v = 0; v <= 125; v += 25) metaText(ctx, String(v), x - 14, y - v / 125 * h + 10, C.text2, 'right', 28); metaText(ctx, 'MASSA BLAD (G)', x - 60, y - h - 50, C.text2, 'left', 28);
  stv.forEach(([v, n, kl], i) => { const bx = x + bw * (0.6 + i * 1.5), u = ease(g[i] || 0); metaText(ctx, n, bx + bw / 2, y + 44, C.text2, 'center', 26); if (u <= 0.01) return; const hh = v / 125 * h * u; roundRect(ctx, bx, y - hh, bw, hh, 6); shape(ctx, rgba(kl, 0.85), _lt(kl, 0.3), 1.5);
    if (u > 0.95) text(ctx, v + ' g', bx + bw / 2, y - hh - 16, fTekst(36, 700), C.text, 'center'); });
  metaText(ctx, 'NA 6 MAANDEN · VOORBEELDPROEF', x + w, y + 92, C.text2, 'right', 26); }
// bodem-micro met bewegende bacteriën, groeiende schimmel (g) en een snipper die kleiner wordt (sn 1 → 0)
function e4BodemT(ctx, cx, cy, R, t, o = {}) { const { g = 1, sn = 1, nb = 14, v = 1 } = o; ctx.fillStyle = '#2A221C'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  for (let i = 0; i < 30; i++) circ(ctx, cx - R + hash(i) * 2 * R, cy - R + hash(i + 50) * 2 * R, 8 + 14 * hash(i + 9), '#3E3228');
  if (sn > 0.02) { const k = 0.25 + 0.75 * sn; vul(ctx, [[cx - R * 0.45 * k, cy - R * 0.1 * k], [cx - R * 0.1 * k, cy - R * 0.32 * k], [cx + R * 0.35 * k, cy - R * 0.18 * k], [cx + R * 0.4 * k, cy + R * 0.15 * k], [cx - R * 0.05 * k, cy + R * 0.25 * k], [cx - R * 0.42 * k, cy + R * 0.12 * k]], '#7A6A3E', '#9A8A5A', 2); }
  if (g > 0.02) { e4Schimmel(ctx, cx - R * 0.9, cy + R * 0.5, R * 0.45 * g, -0.5, 3); e4Schimmel(ctx, cx + R * 0.8, cy - R * 0.6, R * 0.4 * g, 2.6, 8); }
  for (let i = 0; i < nb; i++) { const a = hash(i + 3) * 6.283, d = R * (0.35 + 0.25 * hash(i + 6)), w = wander(i, t * v, 12, 0.6); e4Bacterie(ctx, cx + Math.cos(a) * d + w.x, cy + Math.sin(a) * d * 0.8 + w.y, 26 + 10 * hash(i), a + Math.sin(t * v * 0.5 + i) * 0.3, i % 3 ? C.teal : '#7FAFC0'); } }
// opstijgende warmtegolfjes (koraal), cyclisch
function e4WarmteOp(ctx, x, y, s, t, a = 1, h = 180) { if (a <= 0.01) return; for (let k = 0; k < 2; k++) { const u = e4fr(t * 0.35 + k * 0.5 + hash(x) * 0.3); e4Warmte(ctx, x, y - u * h, s, a * Math.min(1, u * 5, (1 - u) * 3)); } }
// zwarte roker met bewegende rook, bacteriën (aB) en zwavelwaterstof-deeltjes (aS)
function e4RokerT(ctx, cx, cy, R, t, aB = 1, aS = 0) { ctx.fillStyle = '#0E1622'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); vul(ctx, [[cx - R, cy + R * 0.7], [cx - R * 0.3, cy + R * 0.55], [cx + R * 0.4, cy + R * 0.65], [cx + R, cy + R * 0.6], [cx + R, cy + R], [cx - R, cy + R]], '#2E2A2A');
  vul(ctx, [[cx - 40, cy + R * 0.62], [cx - 22, cy - R * 0.1], [cx + 20, cy - R * 0.12], [cx + 42, cy + R * 0.62]], '#3A3434', '#5A5050', 2);
  for (let i = 0; i < 9; i++) { const u = e4fr(t * 0.12 + i / 9); circ(ctx, cx + Math.sin(u * 7 + i) * 18 * u * 3, cy - R * 0.15 - u * R * 0.9, 20 + u * 60, rgba('#4A4646', 0.85 * (1 - u))); }
  if (aS > 0.01) for (let i = 0; i < 8; i++) { const u = e4fr(t * 0.25 + i / 8), a = hash(i) * 6.283, d = 70 + 50 * hash(i + 4); const x = lerp(cx, cx + Math.cos(a) * d, u), y = lerp(cy - R * 0.1, cy + R * 0.2 + Math.sin(a) * d * 0.4, u); circ(ctx, x, y, 6, rgba('#E8D86A', aS * Math.min(1, u * 5, (1 - u) * 5))); }
  if (aB > 0.01) for (let i = 0; i < 10; i++) { const a = hash(i) * 6.283, d = 70 + 50 * hash(i + 4), w = wander(i, t, 6, 0.5); e4A(ctx, aB, () => e4Bacterie(ctx, cx + Math.cos(a) * d + w.x, cy + R * 0.2 + Math.sin(a) * d * 0.4 + w.y, 24, a + Math.sin(t + i) * 0.2, '#E0B64A')); } }
// geurwolkje
function e4Geur(ctx, x, y, t, a) { if (a <= 0.01) return; const u = e4fr(t * 0.25 + hash(x) * 0.7); ctx.beginPath(); ctx.ellipse(x + Math.sin(t + x) * 10, y - u * 120, 50, 24, 0, 0, 6.283); ctx.fillStyle = rgba('#C9C06A', 0.35 * a * Math.min(1, u * 4, (1 - u) * 3)); ctx.fill(); }
// balans: hoek an (rad), links nieuw blad, rechts oud blad
function e4Balans(ctx, x, y, an, nl, nr) { lijn(ctx, [[x, y], [x, y + 240]], C.line, 4); vul(ctx, [[x - 40, y + 260], [x + 40, y + 260], [x, y + 220]], C.line);
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); lijn(ctx, [[-240, 0], [240, 0]], C.line, 4); ctx.restore();
  const L = [x - 200 * Math.cos(an), y - 200 * Math.sin(an)], R = [x + 200 * Math.cos(an), y + 200 * Math.sin(an)];
  for (let i = 0; i < nl; i++) ecoEikenblad(ctx, L[0] - 40 + i * 26, L[1] - 30 - i * 10, 4, { hoek: 0.4 + i });
  for (let i = 0; i < nr; i++) ecoEikenblad(ctx, R[0] - 40 + i * 26, R[1] - 30 - i * 10, 4, { stadium: 0.3 + i * 0.2, hoek: i }); return [L, R]; }
// emmer met afval (in de hand) en een zeef
function e4Emmer(ctx, x, y) { vul(ctx, [[x - 26, y - 6], [x + 26, y - 6], [x + 20, y + 44], [x - 20, y + 44]], '#5E7A8A', '#7E9AAA', 2); for (let i = 0; i < 5; i++) circ(ctx, x - 18 + i * 9, y - 8 - (i % 2) * 6, 6, ['#7A8A44', '#C98A3E', '#A0A050'][i % 3]); }
function e4Zeef(ctx, x, y) { ctx.beginPath(); ctx.ellipse(x + 60, y + 6, 80, 18, 0, 0, 6.283); shape(ctx, rgba('#2A2018', 0.6), '#B89A70', 4); lijn(ctx, [[x, y], [x - 20, y - 10]], '#B89A70', 5); ctx.save(); ctx.beginPath(); ctx.ellipse(x + 60, y + 6, 76, 15, 0, 0, 6.283); ctx.clip(); ctx.strokeStyle = rgba('#D8D0BE', 0.5); ctx.lineWidth = 1; for (let i = -80; i < 80; i += 10) { ctx.beginPath(); ctx.moveTo(x + 60 + i, y - 12); ctx.lineTo(x + 60 + i, y + 24); ctx.stroke(); } ctx.restore(); for (let i = 0; i < 8; i++) circ(ctx, x + 20 + hash(i) * 80, y + 2, 7, '#3A2A1E'); }
// riek
function e4Riek(ctx, x, y, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); lijn(ctx, [[0, 0], [0, -300]], '#B89A70', 8); lijn(ctx, [[-30, 0], [30, 0]], '#9AA3B2', 5); for (const dx of [-30, -10, 10, 30]) lijn(ctx, [[dx, 0], [dx, 70]], '#9AA3B2', 4); ctx.restore(); }
