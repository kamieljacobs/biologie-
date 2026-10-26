// =====================================================================================
// Zenuwstelsel 9 · Spieren en beweging — nieuwe tekeningen (ronde 1, 26 okt 2026), kandidaat voor bibliotheek/lib_bio.js
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape, circ), lib_bio.js (BIO, _mixHex).
// Maten in cm (arm) of µm (sarcomeer) met een schaal s = px per eenheid. Bronnen: OpenStax A&P 2e h. 6, 9, 10, 11; Gray's (via StatPearls).
// =====================================================================================
const Z9 = { bot: '#E6DCC6', botS: '#B8AC92', botR: '#CFC3A8', kraak: '#BFD8E4', kraakR: '#E4F0F6', pees: '#E9E3D2', peesR: '#C9C0A8',
  spier: '#B55A50', spierL: '#D98A7E', spierD: '#8E3F38', smeer: '#5BA4C9', kapsel: '#9AA3B2', merg: '#C2453E', mergG: '#D9BC6A',
  actine: '#5BA4C9', myosine: '#C9A35C', zlijn: '#F2F2EE', zenuw: '#B79AE6', ca: '#E0B64A' };

// --- hulpjes: lokaal botframe → wereld. Lokale y langs de botas (van proximaal naar distaal), lokale x naar voren (anterieur).
function z9Frame(ox, oy, ang, s) { const c = Math.cos(ang), n = Math.sin(ang);
  return (lx, ly) => [ox + s * (lx * c + ly * n), oy + s * (-lx * n + ly * c)]; }
function z9Pad(ctx, pts, dicht = true) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (dicht) ctx.closePath(); }
function z9Glad(ctx, pts, dicht = true) { // Catmull-Rom door de punten
  const n = pts.length; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  const g = (i) => pts[dicht ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  for (let i = 0; i < (dicht ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
// spoelvormige spierbuik tussen A en B (wereld), dikte w (px), bol naar kant 'zij' (+1/-1 t.o.v. de richting A→B), met vezellijnen
function z9Buik(ctx, A, B, w, zij, o = {}) { const { a = 1, kleur = Z9.spier, rand = Z9.spierL, vezels = 4, bol = 0.35 } = o; if (a <= 0.01) return;
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = uy * zij, py = -ux * zij, N = 24, l = [], r = [];
  for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof;
    const hw = w / 2 * prof + 1.5; l.push([mx + px * hw, my + py * hw]); r.push([mx - px * hw, my - py * hw]); }
  ctx.save(); ctx.globalAlpha *= a; z9Glad(ctx, l.concat(r.reverse()), true); shape(ctx, kleur, rand, 1.5);
  ctx.save(); ctx.clip(); ctx.strokeStyle = rgba('#5A2A26', 0.35); ctx.lineWidth = 1.5;
  for (let k = 1; k < vezels; k++) { const f = k / vezels - 0.5; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const u = i / N, prof = Math.pow(Math.sin(Math.PI * u), 0.75), mx = A[0] + dx * u + px * w * bol * prof, my = A[1] + dy * u + py * w * bol * prof, hw = w * prof * f;
      i ? ctx.lineTo(mx + px * hw, my + py * hw) : ctx.moveTo(mx + px * hw, my + py * hw); } ctx.stroke(); }
  ctx.restore(); ctx.restore(); }
function z9Pees(ctx, pts, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = Z9.peesR; ctx.lineWidth = w + 2.5; z9Glad(ctx, pts, false); ctx.stroke(); ctx.strokeStyle = Z9.pees; ctx.lineWidth = w; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }

// =====================================================================================
// ARM VAN OPZIJ (rechterarm, kijkt naar +x): schouderblad, opperarmbeen, ellepijp, spaakbeen, biceps, triceps met pezen.
// Recept (bronnen B: OpenStax A&P 2e 8.2 en 11.5; StatPearls Biceps/Triceps): opperarmbeen ± 31 cm, ellepijp ± 26 cm,
// spaakbeen ± 24 cm. Biceps: twee koppen vanaf het schouderblad (lange kop over de kop van het opperarmbeen, korte kop vanaf
// het ravenbekuitsteeksel), pees op de knobbel van het spaakbeen ± 3 cm onder het elleboogscharnier, vóór het scharnier.
// Triceps: lange kop vanaf het schouderblad onder de kom, twee koppen langs de achterkant van het opperarmbeen, pees op het
// olecranon (uitsteeksel van de ellepijp), achter het scharnier. Vereenvoudigd: geen deltaspier, geen m. brachialis.
// Bekende fouten: biceps-pees op de ellepijp; triceps vóór het scharnier; spieren die bij buigen even lang blijven.
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
  z9Glad(ctx, [S(-2.2, -3.2), S(-6.5, -4.6), S(-11, -2.5), S(-13, 4), S(-11.5, 11), S(-8, 13.5), S(-4.5, 7), S(-2.6, 2.4), S(-1.8, -1.2)], true); shape(ctx, Z9.botR, Z9.botS, 1.5);
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
  // hand (vereenvoudigd: middenhand en vingers als vlak in huidkleur, half doorzichtig)
  if (hand > 0.01) { ctx.save(); ctx.globalAlpha *= 0.85 * hand; z9Glad(ctx, [Fo(-0.9, 24.8), Fo(2.2, 24.8), Fo(2.6, 29), Fo(2.1, 34.5), Fo(0.8, 37), Fo(-0.3, 35.5), Fo(-1.2, 31), Fo(-1.4, 27.5)], true); shape(ctx, _mixHex(BIO.huid, '#1A2740', 0.25), BIO.huidS, 1.2); ctx.restore(); }
  // spieren
  const R = {}; ctx.save(); ctx.globalAlpha *= spieren;
  // triceps (achter): buik van y 4 tot ± 25, pees naar het olecranon; lange kop naar onder de schouderkom
  { const aT = D('triceps'), wT = (4.2 + 1.0 * ctr) * s, A = Up(-1.3, 3.5), B = Up(-1.6, 25.5 - 1.5 * ctr);
    z9Pees(ctx, [Up(-1.1, -1.7), Up(-1.8, 0.8), Up(-2.0, 3.8)], 0.4 * s, aT);
    z9Buik(ctx, A, B, wT, -1, { a: aT, bol: 0.55 }); z9Pees(ctx, [B, Up(-2.3, 28.0), Fo(-1.6, -2.3)], 0.6 * s, aT);
    if (hl.triceps) { ctx.save(); ctx.globalAlpha *= hl.triceps; ctx.setLineDash([]); z9Buik(ctx, A, B, wT, -1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.45 }); ctx.restore(); }
    R.triceps = Up(-1.5 - 0.75 * wT / s, 14); }
  // biceps (voor): buik van y 9 tot ± 23, korter en dikker bij spanning; pees naar de knobbel van het spaakbeen
  { const aB = D('biceps'), wB = (3.4 + 1.8 * cb) * s, A = Up(1.25, 7.5 + 1.2 * cb), B = Up(1.4, 24.0 - 2.8 * cb);
    z9Pees(ctx, [Up(0.6, -2.3), Up(1.6, -1.4), Up(2.0, 3), Up(1.9, 7.8 + 1.2 * cb)], 0.32 * s, aB); // lange kop over de kop van het opperarmbeen
    z9Pees(ctx, [Up(2.2, -1.8), Up(2.5, 2.5), Up(2.0, 7.8 + 1.2 * cb)], 0.32 * s, aB * 0.8); // korte kop vanaf het ravenbekuitsteeksel
    z9Buik(ctx, A, B, wB, 1, { a: aB, bol: 0.6 }); const T = Fo(1.5, 3.2); z9Pees(ctx, [B, Up(1.8, 27.6 - cb), T], 0.6 * s, aB);
    if (hl.biceps) { ctx.save(); ctx.globalAlpha *= hl.biceps; z9Buik(ctx, A, B, wB, 1, { kleur: 'rgba(0,0,0,0)', rand: C.goud, vezels: 1, bol: 0.5 }); ctx.restore(); }
    R.biceps = Up(1.3 + 0.85 * wB / s, 16); R.bicepsPees = T; }
  ctx.restore();
  ctx.restore();
  R.schouder = [sx, sy]; R.elleboog = E; R.hand = Fo(0.6, 31); R.olecranon = Fo(-1.7, -2.2); R.opperarm = Up(0, 15); R.onderarm = Fo(0.4, 13); R.Up = Up; R.Fo = Fo;
  return R;
}

// =====================================================================================
// GEWRICHT IN DOORSNEDE (schouder, kogelgewricht; van voren in een frontale snede). Recept (OpenStax A&P 9.4):
// gewrichtskop en -kom bekleed met kraakbeen (glad, zonder bloedvaten), gewrichtsholte met een dun laagje gewrichtssmeer,
// gewrichtskapsel als mouw van bindweefsel van bot naar bot, gewrichtsbanden als verdikkingen buiten het kapsel.
// Bekende fouten: kraakbeen als losse schijf; holte als grote lege ruimte; kapsel dat niet aan het bot vastzit.
// draai = hoek van het opperarmbeen (rad), hl = { kop, kom, kraakbeen, kapsel, smeer, banden }.
// =====================================================================================
function gewrichtDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, draai = 0, hl = {}, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.3 + 0.7 * (hl[k] == null ? 1 : hl[k]);
  const R = 2.4 * s, gap = 0.07 * R, kb = 0.1 * R, cup = 0.95; // straal kop (± 2,4 cm), spleet, kraakbeendikte, halve openingshoek kom
  const spons = (cx, cy, rx, ry, n, seed) => { for (let i = 0; i < n; i++) { const an = hash(i + seed) * 6.283, rr = Math.sqrt(hash(i * 3 + seed)); circ(ctx, cx + Math.cos(an) * rr * rx, cy + Math.sin(an) * rr * ry, 1.4 + hash(i + 7 + seed) * 2.6, rgba(Z9.botS, 0.55)); } };
  // schouderblad met kom (links)
  const r2 = R + gap + kb; ctx.save(); ctx.globalAlpha *= L('kom');
  ctx.beginPath(); ctx.moveTo(Math.cos(Math.PI - cup) * r2 - 0.25 * R, -Math.sin(Math.PI - cup) * r2 - 0.25 * R); ctx.lineTo(-2.6 * R, -1.6 * R); ctx.lineTo(-2.9 * R, 1.9 * R); ctx.lineTo(Math.cos(Math.PI + cup) * r2 - 0.25 * R, -Math.sin(Math.PI + cup) * r2 + 0.25 * R);
  ctx.lineTo(Math.cos(Math.PI + cup) * r2, -Math.sin(Math.PI + cup) * r2); ctx.arc(0, 0, r2, Math.PI - cup, Math.PI + cup, false); ctx.closePath(); shape(ctx, Z9.botR, Z9.botS, 1.5);
  ctx.save(); ctx.clip(); spons(-1.9 * R, 0, 0.9 * R, 1.5 * R, 90, 3); ctx.restore(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R + gap + kb, Math.PI - cup, Math.PI + cup, false); ctx.arc(0, 0, R + gap, Math.PI + cup, Math.PI - cup, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // gewrichtssmeer: dun laagje in de spleet, met twee zakjes binnen het kapsel
  ctx.save(); ctx.globalAlpha *= L('smeer'); ctx.beginPath(); ctx.arc(0, 0, R + gap, Math.PI - cup - 0.15, Math.PI + cup + 0.15, false); ctx.arc(0, 0, R, Math.PI + cup + 0.15, Math.PI - cup - 0.15, true); ctx.closePath(); ctx.fillStyle = rgba(Z9.smeer, 0.9); ctx.fill();
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-0.42 * R, sg * 1.02 * R, 0.3 * R, 0.1 * R, sg * 0.5, 0, 6.283); ctx.fillStyle = rgba(Z9.smeer, 0.75); ctx.fill(); } ctx.restore();
  // opperarmbeen: kop + hals + schacht, draait om het middelpunt van de kop
  ctx.save(); ctx.rotate(draai); ctx.globalAlpha *= L('kop'); const sa = 1.05, sw = 0.55 * R; // schachtrichting (rad onder de horizontaal), halve breedte
  const ux = Math.cos(sa), uy = Math.sin(sa), nx = -uy, ny = ux, b0 = [0.35 * R * ux, 0.35 * R * uy], b1 = [b0[0] + 3.6 * R * ux, b0[1] + 3.6 * R * uy];
  const hum = () => { ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.moveTo(b0[0] - nx * sw * 1.45, b0[1] - ny * sw * 1.45); ctx.lineTo(b1[0] - nx * sw, b1[1] - ny * sw); ctx.lineTo(b1[0] + nx * sw, b1[1] + ny * sw); ctx.lineTo(b0[0] + nx * sw * 1.7, b0[1] + ny * sw * 1.7); ctx.closePath(); };
  hum(); ctx.strokeStyle = Z9.botS; ctx.lineWidth = 3; ctx.stroke(); hum(); ctx.fillStyle = Z9.bot; ctx.fill('nonzero');
  hum(); ctx.save(); ctx.clip(); spons(0.15 * R, 0.15 * R, 0.85 * R, 0.85 * R, 110, 9); ctx.beginPath(); ctx.moveTo(b0[0] + ux * R * 0.9, b0[1] + uy * R * 0.9); ctx.lineTo(b1[0], b1[1]); ctx.strokeStyle = rgba(Z9.mergG, 0.9); ctx.lineWidth = sw * 0.9; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  ctx.globalAlpha /= L('kop'); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, 0, R, Math.PI - cup - 0.35, Math.PI + cup + 0.35, false); ctx.arc(0, 0, R - kb, Math.PI + cup + 0.35, Math.PI - cup - 0.35, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1);
  ctx.restore();
  // kapsel: mouw van de rand van de kom naar de hals (boven en onder)
  const rot = (px, py) => [px * Math.cos(draai) - py * Math.sin(draai), px * Math.sin(draai) + py * Math.cos(draai)];
  ctx.save(); ctx.globalAlpha *= L('kapsel'); ctx.strokeStyle = Z9.kapsel; ctx.lineWidth = 0.13 * R; ctx.lineCap = 'round';
  const kb1 = [Math.cos(Math.PI - cup) * r2 - 0.1 * R, -Math.sin(Math.PI - cup) * r2 - 0.12 * R], ke1 = rot(0.55 * R, -1.18 * R), kb2 = [Math.cos(Math.PI + cup) * r2 - 0.1 * R, -Math.sin(Math.PI + cup) * r2 + 0.12 * R], ke2 = rot(-0.15 * R, 1.35 * R);
  ctx.beginPath(); ctx.moveTo(kb1[0], kb1[1]); ctx.bezierCurveTo(-0.5 * R, -1.45 * R, 0.1 * R, -1.5 * R, ke1[0], ke1[1]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(kb2[0], kb2[1]); ctx.bezierCurveTo(-0.6 * R, 1.45 * R, -0.35 * R, 1.6 * R, ke2[0], ke2[1]); ctx.stroke(); ctx.restore();
  // banden: verdikkingen aan de buitenkant van het kapsel
  ctx.save(); ctx.globalAlpha *= L('banden'); ctx.strokeStyle = Z9.pees; ctx.lineWidth = 0.07 * R; ctx.lineCap = 'round';
  for (const d of [0.12, 0.24]) { ctx.beginPath(); ctx.moveTo(kb1[0] - 0.1 * R, kb1[1] - d * R); ctx.bezierCurveTo(-0.5 * R, -(1.45 + d) * R, 0.1 * R, -(1.5 + d) * R, ke1[0] + 0.1 * R, ke1[1] - d * R); ctx.stroke(); } ctx.restore();
  ctx.restore();
  return { kop: [x + 0.35 * R, y], kom: [x - 1.9 * R, y + 0.2 * R], kraakbeen: [x - 1.1 * R, y - 0.75 * R], smeer: [x - 0.42 * R, y + 1.02 * R], kapsel: [x - 0.3 * R, y - 1.45 * R], banden: [x - 0.1 * R, y - 1.85 * R], R };
}
// =====================================================================================
// BOT IN LENGTEDOORSNEDE (pijpbeen, bv. opperarmbeen). Recept (OpenStax A&P 6.3): wand van compact bot, uiteinden met
// sponsachtig bot en rood beenmerg, holte in de schacht met (bij volwassenen) geel beenmerg, beenvlies om de buitenkant,
// bloedvat dat door een gaatje naar binnen gaat, kraakbeen op de gewrichtsvlakken.
// =====================================================================================
function botDoorsnede(ctx, x, y, s, o = {}) { const { a = 1, hl = {}, len = 30, rood = 1 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); const L = (k) => 0.35 + 0.65 * (hl[k] == null ? 1 : hl[k]);
  const w = 1.25 * s, k1 = 2.6 * s, H = len * s / 2; // halve schachtbreedte, straal uiteinde
  const omtrek = () => { ctx.beginPath(); ctx.moveTo(-w, -H + k1 * 1.4); ctx.bezierCurveTo(-w * 1.4, -H + k1 * 0.8, -k1, -H + k1 * 0.6, -k1, -H); ctx.arc(0, -H, k1, Math.PI, 0); ctx.bezierCurveTo(k1, -H + k1 * 0.6, w * 1.4, -H + k1 * 0.8, w, -H + k1 * 1.4);
    ctx.lineTo(w, H - k1 * 1.4); ctx.bezierCurveTo(w * 1.4, H - k1 * 0.8, k1 * 1.1, H - k1 * 0.5, k1 * 1.05, H); ctx.arc(0, H, k1 * 1.05, 0, Math.PI); ctx.bezierCurveTo(-k1 * 1.1, H - k1 * 0.5, -w * 1.4, H - k1 * 0.8, -w, H - k1 * 1.4); ctx.closePath(); };
  ctx.save(); ctx.globalAlpha *= L('bot'); omtrek(); shape(ctx, Z9.bot, Z9.botS, 1.5); ctx.restore();
  ctx.save(); omtrek(); ctx.clip();
  // sponsachtig bot met rood beenmerg in de uiteinden
  ctx.save(); ctx.globalAlpha *= L('rood'); for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(0, sg * (H - 0.15 * s), k1 * 0.86, k1 * 1.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(Z9.merg, '#E6DCC6', 1 - 0.75 * rood); ctx.fill();
    for (let i = 0; i < 90; i++) { const px = (hash(i + sg * 7) - 0.5) * k1 * 1.6, py = sg * (H - 0.15 * s) + (hash(i * 3 + sg) - 0.5) * k1 * 2.8; circ(ctx, px, py, 2 + hash(i + 11) * 3, Z9.botR); } } ctx.restore();
  // mergholte met geel beenmerg in de schacht
  ctx.save(); ctx.globalAlpha *= L('geel'); roundRect(ctx, -w * 0.62, -H + k1 * 1.3, w * 1.24, 2 * H - k1 * 2.6, w * 0.5); ctx.fillStyle = Z9.mergG; ctx.fill(); ctx.restore();
  ctx.restore();
  // kraakbeen op het gewrichtsvlak
  ctx.save(); ctx.globalAlpha *= L('kraakbeen'); ctx.beginPath(); ctx.arc(0, -H, k1, Math.PI + 0.25, -0.25); ctx.arc(0, -H, k1 - 0.3 * s, -0.25, Math.PI + 0.25, true); ctx.closePath(); shape(ctx, Z9.kraak, Z9.kraakR, 1); ctx.restore();
  // beenvlies + bloedvat dat naar binnen gaat
  ctx.save(); ctx.globalAlpha *= L('vlies'); ctx.strokeStyle = rgba('#C9B896', 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-w - 2.5, -H + k1 * 1.5); ctx.lineTo(-w - 2.5, H - k1 * 1.5); ctx.moveTo(w + 2.5, -H + k1 * 1.5); ctx.lineTo(w + 2.5, H - k1 * 1.5); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.globalAlpha *= L('bloedvat'); ctx.strokeStyle = BIO.bloed; ctx.lineWidth = 0.28 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(w + 2.2 * s, -0.2 * H); ctx.quadraticCurveTo(w + 0.6 * s, -0.1 * H, w - 0.2 * s, 0); ctx.quadraticCurveTo(0, 0.12 * H, -0.3 * s, 0.6 * H); ctx.moveTo(-0.1 * s, 0.05 * H); ctx.quadraticCurveTo(0.2 * s, -0.3 * H, 0, -0.7 * H); ctx.stroke(); ctx.restore();
  ctx.restore();
  return { rood: [x, y - H], geel: [x, y + 0.1 * H], kraakbeen: [x, y - H - k1], bloedvat: [x + w + 1.4 * s, y - 0.18 * H], vlies: [x - w - 3, y + 0.4 * H], wand: [x + w, y + 0.35 * H] };
}
// botcellen in kalk (zoomcirkel): ringen van kalk rond een kanaaltje met bloedvat, botcellen met uitlopers in de ringen
function botWeefsel(ctx, x, y, r, o = {}) { const { a = 1, t = 0, levend = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); ctx.fillStyle = '#D9CFB6'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  const centra = [[-0.35, -0.3], [0.42, -0.2], [0, 0.45], [-0.6, 0.5], [0.75, 0.55], [-0.05, -0.85], [0.8, -0.8]];
  centra.forEach(([cx0, cy0], j) => { const cx = x + cx0 * r, cy = y + cy0 * r, R0 = r * 0.36;
    for (let k = 5; k >= 1; k--) { ctx.beginPath(); ctx.arc(cx, cy, R0 * k / 5, 0, 6.283); ctx.strokeStyle = rgba('#A89A7A', 0.7); ctx.lineWidth = 1.2; ctx.stroke(); }
    circ(ctx, cx, cy, R0 * 0.16, '#3A2A2A'); circ(ctx, cx, cy, R0 * 0.07, rgba(BIO.bloed, levend)); // kanaal met bloedvat
    for (let i = 0; i < 9; i++) { const an = i * 0.7 + j, rr = R0 * (0.4 + 0.5 * hash(i + j * 9)), bx = cx + Math.cos(an) * rr, by = cy + Math.sin(an) * rr;
      ctx.save(); ctx.globalAlpha *= levend; ctx.strokeStyle = rgba(BIO.kern, 0.7); ctx.lineWidth = 1; for (let q = 0; q < 4; q++) { const aq = an + q * 1.57 + 0.4; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(aq) * R0 * 0.12, by + Math.sin(aq) * R0 * 0.12); ctx.stroke(); }
      ctx.beginPath(); ctx.ellipse(bx, by, R0 * 0.07, R0 * 0.04, an + 1.57, 0, 6.283); shape(ctx, BIO.kern, BIO.kernL, 1); ctx.restore(); } });
  ctx.restore(); }

// =====================================================================================
// SARCOMEER (lengtedoorsnede, µm-schaal s = px per µm). Recept (OpenStax A&P 10.2–10.3; Alberts h. 16): Z-lijn tot Z-lijn
// ± 2,5 µm in rust, ± 2,0 µm samengetrokken; actine ± 1,0 µm vanaf elke Z-lijn naar het midden; myosine ± 1,6 µm in het
// midden, met een kale zone zonder koppen in het midden en koppen die naar de Z-lijnen wijzen. De draden houden hun lengte.
// L = lengte sarcomeer in µm, kop = fase 0..1 (0 = gespannen, 0.5 = krachtslag klaar), rijen = aantal myosinedraden.
// Bekende fouten: draden die korter worden; koppen naar het midden gericht; actine die tot het midden doorloopt bij rust.
// =====================================================================================
function sarcomeer(ctx, x, y, s, o = {}) { const { L = 2.5, a = 1, rijen = 4, kop = 0, hl = {}, volg = false, tropo = 0, t = 0, dz = 0.42 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hz = L / 2 * s, act = 1.0 * s, myo = 0.8 * s, gapY = dz * s, top = y - (rijen - 0.5) * gapY / 2 * 2 / 2 * 1;
  const ys = [...Array(rijen)].map((_, i) => y + (i - (rijen - 1) / 2) * gapY);
  // Z-lijnen
  for (const sg of [-1, 1]) { ctx.strokeStyle = Z9.zlijn; ctx.lineWidth = Math.max(2, 0.03 * s); ctx.beginPath(); const zx = x + sg * hz;
    for (let k = 0; k <= 8; k++) { const yy = ys[0] - gapY * 0.6 + k * (ys[ys.length - 1] - ys[0] + gapY * 1.2) / 8; k ? ctx.lineTo(zx + (k % 2 ? 4 : -4), yy) : ctx.moveTo(zx, yy); } ctx.stroke(); }
  // actine: van elke Z-lijn naar binnen, tussen de myosinerijen (boven en onder elke rij)
  const actYs = []; for (let i = 0; i <= rijen; i++) actYs.push(ys[0] - gapY / 2 + i * gapY);
  ctx.save(); ctx.globalAlpha *= hl.actine != null ? 0.35 + 0.65 * hl.actine : 1;
  for (const ay of actYs) for (const sg of [-1, 1]) { const x0 = x + sg * hz, x1 = x0 - sg * act;
    ctx.strokeStyle = Z9.actine; ctx.lineWidth = Math.max(3, 0.035 * s); ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.fillStyle = lighten(Z9.actine, 0.25); for (let k = 0; k < act / (0.055 * s); k++) { const xx = x0 - sg * (k + 0.5) * 0.055 * s; circ(ctx, xx, ay + (k % 2 ? 1.5 : -1.5), Math.max(1.6, 0.018 * s), lighten(Z9.actine, 0.25)); }
    if (tropo > 0.01) { ctx.save(); ctx.globalAlpha *= tropo; ctx.strokeStyle = C.paars; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = x0 - sg * act * k / 20; k ? ctx.lineTo(xx, ay + Math.sin(k * 1.6) * 3) : ctx.moveTo(xx, ay); } ctx.stroke(); ctx.restore(); } }
  ctx.restore();
  // myosine: dikke draad in het midden, koppen op beide helften behalve de kale zone
  ctx.save(); ctx.globalAlpha *= hl.myosine != null ? 0.35 + 0.65 * hl.myosine : 1; const kale = 0.15 * s;
  for (const my of ys) { roundRect(ctx, x - myo, my - Math.max(3, 0.05 * s), 2 * myo, Math.max(6, 0.1 * s), Math.max(3, 0.05 * s)); shape(ctx, Z9.myosine, lighten(Z9.myosine, 0.3), 1);
    for (const sg of [-1, 1]) for (let k = 0; k < 9; k++) { const kx = x + sg * (kale + (k + 0.5) * (myo - kale) / 9);
      for (const up of [-1, 1]) { const fase = (kop + k * 0.13 + (up > 0 ? 0.07 : 0)) % 1, hoek = fase < 0.5 ? lerp(0.9, 0.35, fase * 2) : lerp(0.35, 0.9, (fase - 0.5) * 2);
        const lx = kx + sg * Math.cos(hoek) * 0.07 * s * 0.5, ly = my + up * (Math.max(3, 0.05 * s) + Math.sin(hoek) * 0.12 * s);
        ctx.strokeStyle = Z9.myosine; ctx.lineWidth = Math.max(1.5, 0.018 * s); ctx.beginPath(); ctx.moveTo(kx, my + up * Math.max(3, 0.05 * s)); ctx.lineTo(lx, ly); ctx.stroke(); circ(ctx, lx, ly, Math.max(2.2, 0.025 * s), lighten(Z9.myosine, 0.15)); } } }
  ctx.restore(); ctx.restore();
  return { zL: [x - hz, ys[0] - gapY], zR: [x + hz, ys[0] - gapY], actine: [x - hz + act * 0.5, actYs[0]], myosine: [x, ys[0]], ys, actYs, hz };
}
// myofibril: een buis met banden (lichte en donkere banden, Z-lijnen) als herhaling van sarcomeren
function myofibril(ctx, x0, y, w, h, s, o = {}) { const { a = 1, L = 2.5, hlIdx = -1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x0, y - h / 2, w, h, h / 2); shape(ctx, rgba(BIO.spier, 0.55), BIO.spierL, 1.2); ctx.save(); roundRect(ctx, x0, y - h / 2, w, h, h / 2); ctx.clip();
  const P = L * s; let i = 0; for (let xx = x0; xx < x0 + w; xx += P, i++) { const mid = xx + P / 2; ctx.fillStyle = rgba('#5A2A26', 0.6); ctx.fillRect(mid - 0.8 * s, y - h / 2, 1.6 * s, h);
    ctx.fillStyle = rgba('#F2F2EE', 0.7); ctx.fillRect(xx - 1, y - h / 2, 2, h); if (i === hlIdx) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(xx, y - h / 2 + 2, P, h - 4); } }
  ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIER IN DWARSDOORSNEDE MET MOTORISCHE EENHEDEN. Recept (OpenStax A&P 10.5; Purves 4e h. 16): spiervezels als veelhoeken
// (± 50 µm), in bundels met bindweefsel; de vezels van één motorische eenheid liggen verspreid door de spier, niet in een groepje.
// Een eenheid trekt alles-of-niets samen; kleine eenheden eerst, daarna grotere (groottebeginsel).
// aan = aantal actieve eenheden (0..n, kommagetal = de volgende komt op), eenheden = [{n: vezels, kleur}].
// =====================================================================================
function _z9Vezels(key, cx, cy, r, n) { if (!_z9Vezels[key]) { const pts = []; let i = 0, k = 0; while (pts.length < n && k < n * 40) { k++; const u = hash(k * 1.7 + 3), v = hash(k * 2.9 + 7), rr = r * Math.sqrt(u) * 0.93, an = v * 6.283, p = [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr];
    if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) > r * 1.55 / Math.sqrt(n))) pts.push(p); }
  _z9Vezels[key] = _bioVoronoi('z9v' + key, pts, r * 1.3 / Math.sqrt(n), 3); } return _z9Vezels[key]; }
function spierDwars(ctx, cx, cy, r, o = {}) { const { a = 1, n = 140, eenheden = [], aan = 0, t = 0, puls = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.25), Z9.peesR, 2);
  const V = _z9Vezels(`${cx},${cy},${r},${n}`, cx, cy, r, n), eig = V.map(() => -1);
  let start = 0; eenheden.forEach((e, j) => { const idx = V.map((_, i) => i).sort((p, q) => hash(p * 7 + j * 31) - hash(q * 7 + j * 31)).filter(i => eig[i] < 0).slice(0, e.n); idx.forEach(i => eig[i] = j); });
  V.forEach((v, i) => { const j = eig[i], act = j >= 0 ? clamp(aan - j, 0, 1) : 0, kl = j >= 0 ? eenheden[j].kleur : null;
    z9Pad(ctx, v.pts); const base = rgba(BIO.spier, 0.55);
    ctx.fillStyle = act > 0.01 ? _mixHex(BIO.spier, kl, 0.75 * act) : base; ctx.fill(); ctx.strokeStyle = act > 0.01 ? rgba(kl, 0.5 + 0.5 * act) : rgba(BIO.spierL, 0.6); ctx.lineWidth = act > 0.5 ? 2.5 : 1; ctx.stroke();
    circ(ctx, v.pts[(i * 5) % v.pts.length][0] * 0.82 + v.c[0] * 0.18, v.pts[(i * 5) % v.pts.length][1] * 0.82 + v.c[1] * 0.18, 2.2, rgba(BIO.kern, 0.85)); });
  ctx.restore();
  return { V, eig, punten: (j) => V.filter((_, i) => eig[i] === j).map(v => v.c) };
}
// motorische zenuwcel die zich vertakt naar de vezels van één eenheid (bovenop spierDwars getekend; 'vanuit' = beginpunt axon)
function eenheidZenuw(ctx, vanuit, punten, kleur, o = {}) { const { a = 1, puls = -1, dik = 4 } = o; if (a <= 0.01 || !punten.length) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const mx = punten.reduce((s2, p) => s2 + p[0], 0) / punten.length, my = punten.reduce((s2, p) => s2 + p[1], 0) / punten.length, tak = [lerp(vanuit[0], mx, 0.62), lerp(vanuit[1], my, 0.62)];
  ctx.strokeStyle = kleur; ctx.lineWidth = dik; ctx.beginPath(); ctx.moveTo(vanuit[0], vanuit[1]); ctx.quadraticCurveTo(lerp(vanuit[0], tak[0], 0.5), vanuit[1], tak[0], tak[1]); ctx.stroke();
  ctx.lineWidth = Math.max(1.2, dik * 0.4); for (const p of punten) { ctx.beginPath(); ctx.moveTo(tak[0], tak[1]); ctx.quadraticCurveTo((tak[0] + p[0]) / 2 + (hash(p[0]) - 0.5) * 30, (tak[1] + p[1]) / 2, p[0], p[1]); ctx.stroke(); circ(ctx, p[0], p[1], 3.2, kleur); }
  if (puls >= 0 && puls <= 1) { const px = lerp(vanuit[0], tak[0], puls), py = lerp(vanuit[1], tak[1], puls); circ(ctx, px, py, dik * 1.6, C.goud); }
  ctx.restore(); }

// =====================================================================================
// EMG-SPOOR (plakkers op de huid): som van de piekjes van veel eenheden. Vereenvoudigd: we tekenen het ruwe signaal, dat
// groter en dichter wordt naarmate er meer eenheden meedoen en sneller vuren (Purves h. 16; De Luca 1997, oppervlakte-EMG).
// niveau 0..1 = hoeveel kracht; t schuift het spoor. Deterministisch (hash).
// =====================================================================================
function emgSpoor(ctx, x, y, w, h, o = {}) { const { a = 1, niveau = 0.1, t = 0, kleur = C.teal, rooster = true, geschiedenis = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 10); shape(ctx, '#0D1420', C.line, 1.5); ctx.save(); roundRect(ctx, x, y, w, h, 10); ctx.clip();
  if (rooster) { ctx.strokeStyle = rgba('#FFFFFF', 0.05); ctx.lineWidth = 1; for (let gx = x; gx < x + w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke(); } }
  ctx.strokeStyle = kleur; ctx.lineWidth = 1.6; ctx.beginPath(); const N = Math.floor(w / 1.5), my = y + h / 2;
  for (let i = 0; i <= N; i++) { const xx = x + i * 1.5, tt = t * 300 + i, lev = geschiedenis ? geschiedenis(i / N) : niveau; let v = 0;
    const eenh = Math.floor(2 + lev * 40); for (let j = 0; j < eenh; j++) { const per = Math.max(6, 40 - lev * 22 - j * 0.15), ph = Math.floor(hash(j * 13.1) * per), q = (Math.floor(tt) + ph) % Math.floor(per); if (q < 3) v += (q === 1 ? 1 : -0.6) * (0.25 + 0.75 * hash(j * 3.3)) * (0.4 + j / 40); }
    v += (hash(tt * 0.37) - 0.5) * 0.08; const yy = my - clamp(v * h * 0.22, -h * 0.46, h * 0.46); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.stroke(); ctx.restore(); ctx.restore(); }

// =====================================================================================
// SPIERSPOELTJE (vwo). Recept (Purves 4e h. 16.2; OpenStax A&P 13.1): kleine, aparte spiervezeltjes in een kapsel, evenwijdig
// aan de gewone vezels; een sensorisch zenuwuiteinde in een spiraal om het midden; rek van de spier rekt het spoeltje en de
// zenuwcel vuurt sneller. Lengte ± 4–10 mm (vergroot getekend).
// rek 0..1 rekt het spoeltje; vuur = impulsen (0..1) op de sensorische vezel.
// =====================================================================================
function spierspoeltje(ctx, x, y, w, o = {}) { const { a = 1, rek = 0, t = 0, vuur = 0 } = o; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  const L = w * (1 + 0.18 * rek), h = w * 0.13 * (1 - 0.15 * rek);
  ctx.beginPath(); ctx.ellipse(x, y, L / 2, h, 0, 0, 6.283); shape(ctx, rgba(Z9.pees, 0.18), Z9.peesR, 1.5);
  for (const dy of [-0.45, 0, 0.45]) { roundRect(ctx, x - L * 0.42, y + dy * h - h * 0.14, L * 0.84, h * 0.28, h * 0.14); shape(ctx, rgba(BIO.spier, 0.75), BIO.spierL, 1); }
  ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 60; k++) { const u = k / 60, xx = x - L * 0.16 + u * L * 0.32, yy = y + Math.sin(u * 6.283 * 4) * h * 0.85; k ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - h * 0.85); ctx.quadraticCurveTo(x - w * 0.05, y - h * 3, x - w * 0.25, y - h * 4.6); ctx.stroke();
  if (vuur > 0.01) { const n = 1 + Math.floor(vuur * 4); for (let k = 0; k < n; k++) { const u = ((t * (0.6 + vuur * 1.8)) + k / n) % 1; const px = lerp(x, x - w * 0.25, u), py = lerp(y - h * 0.85, y - h * 4.6, u) - Math.sin(u * 3.14) * h * 0.4; circ(ctx, px, py, 6, C.goud); } }
  ctx.restore(); return { zenuw: [x - w * 0.25, y - h * 4.6], midden: [x, y], L, h }; }

// =====================================================================================
// KIPPENVLEUGEL OP EEN SNIJPLANK (van boven, practicum). Recept: een vleugel heeft dezelfde botten als een arm: opperarmbeen
// (± 7 cm bij een vleesk kuiken), spaakbeen + ellepijp (± 7 cm), daarna de 'vingers' (punt). Onder het vel roze spieren met
// witte, glanzende pezen die over het elleboog- en polsgewricht lopen (HVCC Lab 8 Birds; schoolpracticum kippenvleugel).
// open 0..1 = vel weggeknipt bij boven- en onderarm; buig = elleboog (rad), pincet = punt waar aan een pees getrokken wordt.
// =====================================================================================
function kippenvleugel(ctx, x, y, s, o = {}) { const { a = 1, open = 0, buig = 0.5, hlPees = 0, hlBot = 0, merg = 0, trek = 0, t = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; const vel = '#EAD6B8', velR = '#C9B08C', vlees = '#E2A496', vleesR = '#C47E72', vleesD = '#D18E82';
  const U = z9Frame(x, y, Math.PI / 2, s), E = U(0, 7.2), F = z9Frame(E[0], E[1], Math.PI / 2 - buig, s), P = F(0, 7.0), T = z9Frame(P[0], P[1], Math.PI / 2 - buig - 0.35, s);
  const op = clamp(open * 2 - 1, 0, 1);
  // vlies tussen opperarm en onderarm (binnenkant van de elleboog)
  z9Glad(ctx, [U(-1.0, 2.0), U(-1.6, 6.4), F(-1.3, 0.8), F(-1.0, 3.6), E], true); shape(ctx, vel, velR, 1.5);
  // opperarm ('drumstickje'): dik bij de schouder, smal bij de elleboog
  const up = [U(0, -0.9), U(2.0, -0.3), U(2.3, 2.0), U(1.6, 5.2), U(1.15, 7.0), U(0, 7.8), U(-1.2, 7.0), U(-1.6, 5.0), U(-2.1, 2.0), U(-1.9, -0.3)];
  const fo = [F(0.2, -0.4), F(1.25, 0.2), F(1.35, 3.5), F(1.2, 6.6), F(0.4, 7.4), F(-0.9, 7.0), F(-1.15, 3.5), F(-1.05, 0.4)];
  const tip = [T(0.5, -0.2), T(0.7, 2.5), T(0.25, 5.6), T(-0.15, 5.6), T(-0.6, 2.0), T(-0.5, 0)];
  z9Glad(ctx, tip, true); shape(ctx, vel, velR, 1.5);
  for (const pts of [fo, up]) { z9Glad(ctx, pts, true); shape(ctx, op > 0.5 ? vlees : vel, op > 0.5 ? vleesR : velR, 1.5); }
  if (op < 0.99) { ctx.save(); ctx.globalAlpha *= 0.55 * (1 - op); for (let i = 0; i < 90; i++) { const fr = i % 2 ? U : F, w = i % 2 ? 1.6 : 1.0, p = fr((hash(i) - 0.5) * 2 * w, 0.4 + hash(i + 9) * 6.4); circ(ctx, p[0], p[1], 0.06 * s, velR); } ctx.restore(); }
  const R = { schouder: U(0, 0), elleboog: E, pols: P, punt: T(0, 5) };
  if (op > 0.01) { ctx.save(); ctx.globalAlpha *= op;
    ctx.save(); z9Glad(ctx, up, true); ctx.clip(); z9Buik(ctx, U(1.1, -0.5), U(0.7, 7.0), 1.9 * s, 1, { kleur: vleesD, rand: vleesR, vezels: 5, bol: 0.25 }); z9Buik(ctx, U(-1.0, -0.4), U(-0.7, 7.0), 2.0 * s, -1, { kleur: vlees, rand: vleesR, vezels: 5, bol: 0.25 }); ctx.restore();
    ctx.save(); z9Glad(ctx, fo, true); ctx.clip(); for (const dx of [0.75, -0.6]) z9Buik(ctx, F(dx, 0), F(dx, 6.6), 0.9 * s, dx > 0 ? 1 : -1, { kleur: vleesD, rand: vleesR, vezels: 3, bol: 0.15 }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * hlBot; ctx.lineCap = 'round';
    const bot = (A, B, w) => { ctx.strokeStyle = Z9.botS; ctx.lineWidth = w + 3; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke(); ctx.strokeStyle = Z9.bot; ctx.lineWidth = w; ctx.stroke(); };
    bot(U(0.1, 0.6), U(0, 6.9), 0.55 * s); bot(F(-0.3, 0.5), F(-0.25, 6.8), 0.36 * s); bot(F(0.45, 0.6), F(0.45, 6.7), 0.24 * s); ctx.restore();
    if (merg > 0.01) { const m = F(-0.27, 4.0); ctx.save(); ctx.globalAlpha *= merg; circ(ctx, m[0], m[1], 0.32 * s, Z9.bot, Z9.botS, 2); circ(ctx, m[0], m[1], 0.19 * s, '#6E2626'); ctx.restore(); R.merg = m; }
    // pezen: buiger aan de binnenkant over de elleboog naar de onderarm, strekker aan de buitenkant
    const pb = [U(-1.1, 4.8 - trek * 0.6), U(-1.0, 6.8), F(-0.95, 0.3), F(-0.8, 1.5)], ps = [U(1.0, 4.6), U(1.0, 6.9), F(1.05, 0.2), F(0.95, 1.6)];
    z9Pees(ctx, ps, 0.16 * s, 1); z9Pees(ctx, pb, 0.16 * s, 1);
    if (hlPees > 0.01) { ctx.save(); ctx.globalAlpha *= hlPees; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; z9Glad(ctx, pb, false); ctx.stroke(); ctx.restore(); }
    R.peesBuig = pb[0]; R.peesStrek = ps[0]; R.spier = U(1.1, 3); ctx.restore(); }
  ctx.restore(); return R;
}
function pincet(ctx, x, y, ang, s, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 0.18 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -0.08 * s); ctx.lineTo(5 * s, -0.5 * s); ctx.moveTo(0, 0.08 * s); ctx.lineTo(5 * s, 0.5 * s); ctx.stroke(); ctx.restore(); }

// =====================================================================================
// PRACTICUMLOKAAL: tafel, laptop met EMG-spoor, plakkers. Noor zit (zijaanzicht, outfit zomer = korte mouw), onderarm vooruit.
// =====================================================================================
function laptop(ctx, x, y, w, o = {}) { const { a = 1, inhoud = null } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.62;
  roundRect(ctx, x - w / 2, y - h, w, h, 8); shape(ctx, '#3A4458', '#5A6478', 2); if (inhoud) inhoud(x - w / 2 + 10, y - h + 10, w - 20, h - 20);
  ctx.beginPath(); ctx.moveTo(x - w * 0.56, y); ctx.lineTo(x + w * 0.56, y); ctx.lineTo(x + w * 0.62, y + 10); ctx.lineTo(x - w * 0.62, y + 10); ctx.closePath(); shape(ctx, '#4A5468', '#5A6478', 1.5); ctx.restore(); }
function plakker(ctx, x, y, r, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 1.5); circ(ctx, x, y, r * 0.35, '#C9CED6'); ctx.restore(); }
function draad(ctx, pts, kleur = '#C9CED6', a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; z9Glad(ctx, pts, false); ctx.stroke(); ctx.restore(); }
function schooltas(ctx, x, y, s, o = {}) { const { a = 1, kleur = '#2E5C6E' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; // hangt aan het handvat (x,y), s = px per cm (± 40 × 30 cm)
  ctx.strokeStyle = _mixHex(kleur, '#000000', 0.3); ctx.lineWidth = 0.8 * s; ctx.beginPath(); ctx.moveTo(x - 4 * s, y + 5 * s); ctx.quadraticCurveTo(x, y - 2 * s, x + 4 * s, y + 5 * s); ctx.stroke();
  roundRect(ctx, x - 16 * s, y + 4 * s, 32 * s, 30 * s, 4 * s); shape(ctx, kleur, _mixHex(kleur, '#FFFFFF', 0.25), 2); roundRect(ctx, x - 12 * s, y + 18 * s, 24 * s, 12 * s, 3 * s); shape(ctx, _mixHex(kleur, '#000000', 0.15), null); ctx.restore(); }
function veertje(ctx, x, y, s, o = {}) { const { a = 1, rot = -0.4 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(2 * s, -1.6 * s, 7 * s, -1.4 * s, 9 * s, 0); ctx.bezierCurveTo(7 * s, 1.2 * s, 2 * s, 1.0 * s, 0, 0); shape(ctx, '#F2F2EE', '#C9CED6', 1);
  ctx.strokeStyle = '#B8C0D0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-1.5 * s, 0.3 * s); ctx.lineTo(9 * s, 0); ctx.stroke(); ctx.restore(); }
// Practicumscène (castpersonages): Mevrouw Visser, Noor zittend met plakkers en een last in de hand, Sam, tafel met laptop.
// o: last ('veer'|'boek'|'tas'|null), emg 0..1 (niveau op het scherm), armE (elleboog), zak 0..1 (arm zakt bij vallen), visser, sam
function practicum(ctx, t, o = {}) { const { last = null, emg = 0.05, armU = 0.12, armE = 1.5, zak = 0, aVisser = 1, aSam = 1, vloer = 960, emgT = t, scherm = true, sam = 'vasthouden' } = o;
  const tafelY = 640; ctx.fillStyle = '#4A5874'; ctx.fillRect(1180, tafelY, 620, 16); ctx.fillRect(1760, tafelY + 16, 14, vloer - tafelY - 16); ctx.fillRect(1200, tafelY + 16, 14, vloer - tafelY - 16);
  if (scherm) laptop(ctx, 1560, tafelY, 340, { inhoud: (x, y, w, h) => emgSpoor(ctx, x, y, w, h, { niveau: emg, t: emgT, rooster: false }) });
  persoon(ctx, 'visser', 380, vloer, 600, { zij: true, kijk: 1, t, uit: 'neutraal', a: aVisser });
  let H = null; const N = persoon(ctx, 'noor', 640, vloer, 560, { zij: true, kijk: 1, pose: 'zit', stoel: true, outfit: 'zomer', arm: [armU, armE - zak * 0.5], t, uit: 'neutraal',
    hold: (c, hx, hy) => { H = [hx, hy]; if (last === 'tas') schooltas(c, hx + 4, hy - 6, 3.0); if (last === 'veer') veertje(c, hx - 10, hy - 14, 5); if (last === 'boek') { roundRect(c, hx - 40, hy - 26, 80, 16, 3); shape(c, '#8C5A3A', '#B08A5C', 1.5); } } });
  const A = N.handR, pl = []; if (A && A.shx != null) { const mx = lerp(A.shx, A.elx, 0.45), my = lerp(A.shy, A.ely, 0.45), dx = A.elx - A.shx, dy = A.ely - A.shy, L = Math.hypot(dx, dy), nx = dy / L, ny = -dx / L, w = A.hh * 0.15;
    pl.push([mx + nx * w, my + ny * w], [mx - nx * w, my - ny * w]); // voorkant = biceps, achterkant = triceps
    draad(ctx, [pl[0], [pl[0][0] + 120, pl[0][1] - 60], [1250, tafelY - 120], [1420, tafelY - 6]], '#9AA3B2'); draad(ctx, [pl[1], [pl[1][0] - 30, pl[1][1] + 120], [1100, tafelY + 120], [1420, tafelY - 2]], '#9AA3B2');
    plakker(ctx, pl[0][0], pl[0][1], A.hh * 0.09); plakker(ctx, pl[1][0], pl[1][1], A.hh * 0.09); }
  persoon(ctx, 'sam', 990, vloer, 600, { zij: true, kijk: -1, t, uit: 'blij', pose: sam, a: aSam });
  return { hand: H, plakBiceps: pl[0], plakTriceps: pl[1], arm: A };
}
// vingertoppen met nitrilhandschoen (practicum), punt = waar ze knijpen
function vingers(ctx, x, y, ang, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang);
  for (const [dy, L] of [[-16, 150], [18, 140]]) { roundRect(ctx, -L, dy - 15, L, 30, 15); shape(ctx, '#5B8CC9', '#4A76AE', 2); }
  roundRect(ctx, -230, -40, 110, 84, 30); shape(ctx, '#5B8CC9', '#4A76AE', 2); ctx.restore(); }
// reflexboog (vwo): sensorisch neuron van het spoeltje naar het ruggenmerg, direct over op het motorisch neuron terug naar de spier
function reflexboog(ctx, van, merg, naar, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const [mx, my] = merg; ctx.beginPath(); ctx.ellipse(mx, my, 120, 90, 0, 0, 6.283); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5);
  ctx.beginPath(); ctx.moveTo(mx - 60, my - 50); ctx.bezierCurveTo(mx - 20, my - 10, mx - 20, my + 10, mx - 60, my + 50); ctx.lineTo(mx + 60, my + 50); ctx.bezierCurveTo(mx + 20, my + 10, mx + 20, my - 10, mx + 60, my - 50); ctx.closePath(); shape(ctx, rgba('#8E7AA8', 0.5), null);
  metaText(ctx, 'RUGGENMERG', mx, my + 130, C.grain, 'center', 22);
  ctx.lineCap = 'round'; ctx.strokeStyle = Z9.zenuw; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(van[0], van[1]); ctx.bezierCurveTo(van[0] - 150, van[1] - 200, mx + 300, my - 60, mx + 10, my - 10); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.beginPath(); ctx.moveTo(mx + 10, my + 5); ctx.bezierCurveTo(mx + 200, my + 120, naar[0] - 300, naar[1] - 80, naar[0], naar[1]); ctx.stroke();
  circ(ctx, mx + 10, my - 3, 8, C.goud); naamBij(ctx, 'sensorisch neuron', null, mx + 230, my - 120, 1, 'left', Z9.zenuw); naamBij(ctx, 'motorisch neuron', null, mx + 230, my + 150, 1, 'left', C.goud);
  ctx.restore(); }
