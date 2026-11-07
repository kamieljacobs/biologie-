// =====================================================================================
// ARM VAN OPZIJ (rechterarm, kijkt naar +x): schouderblad, opperarmbeen, ellepijp, spaakbeen, biceps, triceps met pezen.
// Recept (bronnen B: OpenStax A&P 2e 8.2 en 11.5; StatPearls Biceps/Triceps): opperarmbeen ± 31 cm, ellepijp ± 26 cm,
// spaakbeen ± 24 cm. Biceps: twee koppen vanaf het schouderblad (lange kop over de kop van het opperarmbeen, korte kop vanaf
// het ravenbekuitsteeksel), pees op de knobbel van het spaakbeen ± 3 cm onder het elleboogscharnier, vóór het scharnier.
// Triceps: lange kop vanaf het schouderblad onder de kom, twee koppen langs de achterkant van het opperarmbeen, pees op het
// olecranon (uitsteeksel van de ellepijp), achter het scharnier. Vereenvoudigd: geen deltaspier, geen m. brachialis.
// Bekende fouten: biceps-pees op de ellepijp; triceps vóór het scharnier; spieren die bij buigen even lang blijven.
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 8.2 en 11.5): hand van opzij als één silhouet (± 19 cm van pols tot vingertop,
// vingers licht gebogen, duim apart, nagels als lichte vlakjes; zelfde huidtint als onderarm()); schouderblad smaller
// (van opzij zie je het blad verkort) met de schouderbladkam (spina) die naar het acromion loopt; o.romp 0..1 = dunne
// zijlijnen van borst en rug als oriëntatie.
// u = hoek opperarm vanaf recht omlaag (naar voren +), e = buighoek elleboog (0 = gestrekt). c = spanning biceps 0..1, ct = triceps.
// =====================================================================================
function armAnatomie(ctx, sx, sy, s, o = {}) {
  const { u = 0, e = 0, a = 1, c = null, ct = null, hl = {}, dim = [], skelet = 1, spieren = 1, hand = 1, t = 0 } = o; if (a <= 0.01) return {};
  const cb = c == null ? clamp(e / 1.6, 0, 1) : c, ctr = ct == null ? clamp(1 - e / 1.2, 0, 1) * 0.6 : ct;
  const Up = z9Frame(sx, sy, u, s), E = Up(0, 30), Fo = z9Frame(E[0], E[1], u + e, s);
  const D = (k) => (dim.includes(k) ? 0.3 : 1) * (hl[k] != null ? 1 : 1);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (o.huid) { ctx.save(); ctx.globalAlpha *= o.huid; const sk = [Up(-4.6, 2), Up(-5.2, 12), Up(-4.4, 24), Up(-3.6, 29), Fo(-3.0, 1.5), Fo(-2.4, 8), Fo(-1.6, 22), Fo(-1.3, 25.5), Fo(2.6, 25.5), Fo(3.0, 18), Fo(3.4, 6), Up(4.4, 29), Up(5.2, 18), Up(4.4, 6), Up(3.6, -2), Up(-2.0, -4.5)]; z9Glad(ctx, sk, true); shape(ctx, rgba(BIO.huid, 0.16), rgba(BIO.huid, 0.75), 2); ctx.restore(); }
  // schouderblad (staat stil; vereenvoudigd vlak van opzij met kom, acromion en ravenbek)
  ctx.save(); ctx.globalAlpha *= 0.85 * skelet * D('schouderblad');
  const S = (x, y) => [sx + x * s, sy + y * s];
  z9Glad(ctx, [S(-2.2, -3.2), S(-4.6, -4.3), S(-6.8, -3.0), S(-7.4, 2.5), S(-6.6, 9.5), S(-5.2, 13.2), S(-3.6, 8.5), S(-2.5, 2.4), S(-1.8, -1.2)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.strokeStyle = Z9.botS; ctx.lineWidth = 0.7 * s; ctx.lineCap = 'round'; z9Glad(ctx, [S(-6.6, -1.2), S(-4.2, -2.4), S(-2.0, -3.6), S(0.2, -4.6)], false); ctx.stroke(); // schouderblad-kam (spina) naar het acromion
  z9Glad(ctx, [S(-3, -4.4), S(0.6, -5.4), S(2.8, -4.6), S(1.6, -3.4), S(-1.8, -3.3)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // acromion
  z9Glad(ctx, [S(-1.2, -2.9), S(1.8, -2.6), S(2.6, -1.6), S(1.6, -1.2), S(-0.8, -1.9)], true); shape(ctx, Z9.bot, Z9.botS, 1.5); // ravenbekuitsteeksel
  ctx.restore();
  // opperarmbeen
  ctx.save(); ctx.globalAlpha *= skelet * D('opperarm');
  z9Glad(ctx, [Up(-1.6, 1.8), Up(-1.25, 8), Up(-1.1, 18), Up(-1.5, 25), Up(-2.1, 28.4), Up(-1.6, 30.8), Up(0, 31.6), Up(1.5, 30.8), Up(1.9, 28.3), Up(1.2, 25), Up(0.95, 18), Up(1.05, 8), Up(1.6, 1.6)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  const K = Up(-0.2, -0.1); circ(ctx, K[0], K[1], 2.35 * s, Z9.bot, Z9.botS, 1.5); // kop
  ctx.restore();
  // onderarm: ellepijp (achter, met olecranon) en spaakbeen (voor)
  ctx.save(); ctx.globalAlpha *= skelet * D('onderarm');
  z9Glad(ctx, [Fo(-1.3, -2.6), Fo(-2.1, -1.4), Fo(-1.7, 1.2), Fo(-1.0, 6), Fo(-0.8, 15), Fo(-0.75, 24.5), Fo(-0.1, 25.4), Fo(0.1, 24.3), Fo(-0.05, 15), Fo(0.1, 6), Fo(0.4, 1.5), Fo(0.1, -0.6), Fo(-0.6, -1.4)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
  z9Glad(ctx, [Fo(0.25, 0.9), Fo(1.25, 0.8), Fo(1.4, 2.4), Fo(1.65, 3.3), Fo(1.25, 6), Fo(1.2, 14), Fo(1.7, 22), Fo(1.9, 24.6), Fo(0.4, 24.9), Fo(0.35, 22), Fo(0.45, 14), Fo(0.45, 6), Fo(0.3, 2.4)], true); shape(ctx, Z9.bot, Z9.botS, 1.5);
  ctx.restore();
  // hand van opzij (duimkant), zelfde huid als onderarm(): handrug achter, handpalm voor, vingers licht gebogen; ± 19 cm lang
  if (hand > 0.01) { ctx.save(); ctx.globalAlpha *= 0.9 * hand; const hk = _mixHex(BIO.huid, '#1A2740', 0.2), hs = _mixHex(BIO.huid, '#1A2740', 0.38);
    z9Glad(ctx, [Fo(-1.1, 24.6), Fo(-1.5, 28), Fo(-1.7, 32.6), Fo(-1.2, 34.6), Fo(-0.9, 38.5), Fo(0.0, 41.8), Fo(1.2, 43.2), Fo(2.0, 42.4), Fo(1.6, 39.6), Fo(1.9, 35.8), Fo(2.6, 32.5), Fo(2.7, 28.5), Fo(2.2, 25)], true); shape(ctx, hk, hs, 1.2);
    ctx.strokeStyle = hs; ctx.lineWidth = 0.18 * s; ctx.lineCap = 'round'; for (const [p, q] of [[Fo(-0.6, 35.4), Fo(0.4, 35.6)], [Fo(-0.2, 39.0), Fo(0.9, 39.4)]]) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } // vingerplooien
    z9Glad(ctx, [Fo(1.4, 26.4), Fo(2.6, 28.0), Fo(3.4, 30.6), Fo(3.6, 33.2), Fo(3.0, 33.6), Fo(2.4, 31.4), Fo(1.7, 29.6)], true); shape(ctx, hk, hs, 1.2); // duim
    const n1 = Fo(1.25, 42.9), n2 = Fo(3.3, 33.1); ctx.fillStyle = _mixHex(BIO.huid, '#FFFFFF', 0.25); for (const n of [n1, n2]) { ctx.beginPath(); ctx.arc(n[0], n[1], 0.32 * s, 0, 6.283); ctx.fill(); } // nagels
    ctx.restore(); }
  // romp als oriëntatie (o.romp 0..1): zijkant van borst en rug, dun en gedimd
  if (o.romp) { ctx.save(); ctx.globalAlpha *= 0.35 * o.romp; ctx.strokeStyle = BIO.huidS; ctx.lineWidth = 2; z9Glad(ctx, [S(4.5, -6), S(9, 2), S(10, 14), S(8.5, 30), S(9, 45)], false); ctx.stroke(); z9Glad(ctx, [S(-6, -7), S(-9.5, 4), S(-8.8, 20), S(-6.5, 34), S(-8, 46)], false); ctx.stroke(); ctx.restore(); }
  // spieren
  const R = {}; ctx.save(); ctx.globalAlpha *= spieren;
  // triceps (achter): buik van y 4 tot ± 25, pees naar het olecranon; lange kop naar onder de schouderkom
  { const aT = D('triceps'), wT = (4.2 + 1.0 * ctr) * s, A = Up(-1.3, 3.5), B = Up(-1.6, 25.5 - 1.5 * ctr);
    z9Pees(ctx, [Up(-1.1, -1.7), Up(-1.8, 0.8), Up(-2.0, 3.8)], 0.4 * s, aT);
    z9Buik(ctx, A, B, wT, -1, { a: aT, bol: 0.55 }); z9Pees(ctx, [B, Up(-2.7, 28.0), Up(-2.9, 30.2), Fo(-1.6, -2.3)], 0.75 * s, aT);
    if (hl.triceps) { ctx.save(); ctx.globalAlpha *= hl.triceps; ctx.setLineDash([]); z9Buik(ctx, A, B, wT, -1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.45 }); ctx.restore(); }
    R.triceps = Up(-1.5 - 0.75 * wT / s, 14); }
  // biceps (voor): buik van y 9 tot ± 23, korter en dikker bij spanning; pees naar de knobbel van het spaakbeen
  { const aB = D('biceps'), wB = (3.4 + 1.8 * cb) * s, A = Up(1.25, 7.5 + 1.2 * cb), B = Up(1.8, 25.0 - 2.4 * cb);
    z9Pees(ctx, [Up(0.6, -2.3), Up(1.6, -1.4), Up(2.0, 3), Up(1.9, 7.8 + 1.2 * cb)], 0.32 * s, aB); // lange kop over de kop van het opperarmbeen
    z9Pees(ctx, [Up(2.2, -1.8), Up(2.5, 2.5), Up(2.0, 7.8 + 1.2 * cb)], 0.32 * s, aB * 0.8); // korte kop vanaf het ravenbekuitsteeksel
    z9Buik(ctx, A, B, wB, 1, { a: aB, bol: 0.6 }); const T = Fo(1.5, 3.2); z9Pees(ctx, [B, Up(2.5, 27.4 - cb), Up(2.7, 29.6), T], 0.75 * s, aB);
    if (hl.biceps) { ctx.save(); ctx.globalAlpha *= hl.biceps; z9Buik(ctx, A, B, wB, 1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.5 }); ctx.restore(); }
    R.biceps = Up(1.3 + 0.85 * wB / s, 16); R.bicepsPees = T; }
  ctx.restore();
  ctx.restore();
  R.schouder = [sx, sy]; R.elleboog = E; R.hand = Fo(0.6, 34); R.olecranon = Fo(-1.7, -2.2); R.opperarm = Up(0, 15); R.onderarm = Fo(0.4, 13); R.Up = Up; R.Fo = Fo;
  return R;
}
