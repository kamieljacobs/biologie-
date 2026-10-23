// Film 3 · Vormen van selectie — eigen hulpfuncties voor de animatie (laadt na lib_dieren, vóór sb3.js). Niets gedeelds aangepast.
const E3 = {};
E3.N = (u, m, s) => Math.exp(-0.5 * ((u - m) / s) ** 2);
E3.kg = (v) => v.toFixed(1).replace('.', ',') + ' kg';
// histogram met een vrije dichtheidsfunctie. o.norm: piek = h (standaard) of ruwe waarden (norm:false, 1 = h).
// o.grow 0..1: staafjes verschijnen van links naar rechts; o.dimF(u) 0..1: 1 = vol, 0 = gedimd; o.oud(u): stippellijn (zelfde schaal); o.as = [links, rechts]
E3.histo = function (ctx, x, y, w, h, dens, o = {}) {
  const { kleur = C.teal, n = 22, a = 1, grow = 1, dimF = null, oud = null, as = null, norm = true, assen = true, oudNorm = null } = o;
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const bw = w / n; const v = []; let mx = 0;
  for (let i = 0; i < n; i++) { const d = dens((i + 0.5) / n); v.push(d); mx = Math.max(mx, d); }
  if (!norm) mx = 1;
  for (let i = 0; i < n; i++) { const g = clamp(grow * (n + 3) - i, 0, 1); const vv = v[i] / (mx || 1) * ease(g); if (vv < 0.02) continue;
    const bh = vv * h, dA = dimF ? clamp(dimF((i + 0.5) / n), 0, 1) : 1;
    roundRect(ctx, x + i * bw + 3, y - bh, bw - 6, bh, 4); shape(ctx, rgba(kleur, 0.18 + 0.57 * dA), dA > 0.6 ? lighten(kleur, 0.35) : rgba(kleur, 0.35 + 0.3 * dA), 1.5); }
  if (oud) { let om = oudNorm || 0; if (!om) for (let i = 0; i <= 80; i++) om = Math.max(om, oud(i / 80)); if (!norm && !oudNorm) om = 1;
    ctx.setLineDash([10, 8]); ctx.strokeStyle = C.text2; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 80; i++) { const u = i / 80, py = y - oud(u) / om * h; i ? ctx.lineTo(x + u * w, py) : ctx.moveTo(x + u * w, py); } ctx.stroke(); ctx.setLineDash([]); }
  if (assen) { ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x + w + 10, y); ctx.moveTo(x, y + 10); ctx.lineTo(x, y - h - 30); ctx.stroke(); }
  if (as) { metaText(ctx, as[0], x, y + 44, C.text2, 'left', 26); metaText(ctx, as[1], x + w, y + 44, C.text2, 'right', 26); }
  ctx.restore(); };
// eerste stuk van een polylijn tot booglengte L (px)
E3.deel = function (P, L) { const R = [P[0]]; let rest = L; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
    if (rest >= d) { R.push(P[i]); rest -= d; } else { const f = rest / d; R.push([lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)]); break; } } return R; };
E3.lengte = (P) => { let s = 0; for (let i = 1; i < P.length; i++) s += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); return s; };
// vlucht van a naar b (u 0..1) met een boogje omhoog
E3.vlucht = (a, b, u, boog = 80) => { const e = ease(u); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e) - Math.sin(Math.PI * e) * boog]; };
// roetdeeltjes die rustig over de stam omlaag dwarrelen (vanaf t0)
E3.roet = function (ctx, t, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(16,16,18,0.55)';
  for (let i = 0; i < 46; i++) { const x = 720 + hash(i * 3.1) * 780 + Math.sin(t * 0.7 + i) * 12, y = ((hash(i * 7.7) * 900 + t * (35 + 25 * hash(i))) % 900) - 20; ctx.beginPath(); ctx.arc(x, y, 2.5 + 3 * hash(i * 1.3), 0, 6.283); ctx.fill(); }
  ctx.restore(); };
// stam: lucht + schors met roet 0..1 (vloeiend)
E3.stam = function (ctx, roet) { macroNacht(ctx, { horizon: 980, heuvel: false }); if (roet < 0.99) schors(ctx, 700, -40, 820, 1000, { roet: 0 }); if (roet > 0.01) schors(ctx, 700, -40, 820, 1000, { roet: 1, a: roet }); };
// weegschaal waarvan de schaalarmen meedraaien maar de schalen recht blijven hangen
E3.balans = function (ctx, hoek, aL, aR) { const cx = 960, cy = 420; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, 760); ctx.lineTo(cx, cy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - 140, 760); ctx.lineTo(cx + 140, 760); ctx.stroke();
  const ex = Math.cos(hoek) * 460, ey = Math.sin(hoek) * 460; ctx.beginPath(); ctx.moveTo(cx - ex, cy - ey); ctx.lineTo(cx + ex, cy + ey); ctx.stroke(); circ(ctx, cx, cy, 10, C.bgSchema, C.line, 3);
  const pan = (px, py, kl, t1, sub, a) => { ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 90, py + 110); ctx.moveTo(px, py); ctx.lineTo(px + 90, py + 110); ctx.stroke();
    roundRect(ctx, px - 170, py + 110, 340, 150, 18); shape(ctx, rgba(kl, 0.2 * a), a > 0.5 ? kl : C.line, 2.5);
    ctx.globalAlpha *= a; text(ctx, t1, px, py + 190, fTekst(44, 700), kl, 'center'); metaText(ctx, sub, px, py + 234, C.grain, 'center', 19); ctx.restore(); };
  pan(cx - ex * 0.87, cy - ey * 0.87, C.koraal, 'overleven', 'kost energie · valt op', aL); pan(cx + ex * 0.87, cy + ey * 0.87, C.groen, 'voortplanten', 'meer nakomelingen', aR); };
// kleine weegschaal (samenvatting): balk met twee woorden aan de uiteinden
E3.balansMini = function (ctx, cx, cy, hoek) { ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy + 70); ctx.lineTo(cx, cy); ctx.stroke();
  const ex = Math.cos(hoek) * 300, ey = Math.sin(hoek) * 300; ctx.beginPath(); ctx.moveTo(cx - ex, cy - ey); ctx.lineTo(cx + ex, cy + ey); ctx.stroke(); circ(ctx, cx, cy, 7, C.bgSchema, C.line, 2.5);
  text(ctx, 'overleven', cx - ex, cy - ey - 18, fTekst(34, 700), C.koraal, 'center'); text(ctx, 'voortplanten', cx + ex, cy + ey - 18, fTekst(34, 700), C.groen, 'center'); ctx.restore(); };
