// scenes_d3.js — animator 3: s47–s65 (hoofdstuk 6 Een bericht voor onze cel, 7 Mastergen en adresboek)
// Bouwt voort op de keyframes w32–w44 (kf/sbw3.js). Nieuwe functies hebben voorvoegsel _d3.
const _d3uit = (t, t0, d = 0.5) => 1 - ramp(t, t0, d);
const _D3 = { xm: 606, kopCam: { X: 860, Y: 500, s: 0.78 }, zoomCam: { X: -40, Y: 500, s: 1.5 }, bekerCam: { X: 150, Y: 500, s: 1.3 } };
const _d3cam = (a, b, u) => ({ X: lerp(a.X, b.X, u), Y: lerp(a.Y, b.Y, u), s: lerp(a.s, b.s, u) });
const _d3T = (t, t0, t1) => ease((t - t0) / Math.max(0.05, t1 - t0));

// ---------- oogblaasje dat uitgroeit: g -1 (bultje) .. 0 (blaasje los) .. 1 (tegen het ectoderm) ----------
function _d3BlaasjePad(g) { let Ox, R; if (g < 0) { const u = ease(g + 1); Ox = lerp(150, 350, u); R = lerp(64, 140, u); } else { Ox = lerp(350, 422, g); R = lerp(140, 166, g); }
  const hs = _W3.stalk, a = Math.asin(Math.min(0.98, hs / R)), P = []; const gp = Math.max(0, g);
  for (let x = 100; x < Ox - R * Math.cos(a); x += 6) P.push([x, -hs, 30]);
  for (let i = 0; i <= 120; i++) { const th = -Math.PI + a + (2 * Math.PI - 2 * a) * i / 120; const wgt = gp * clamp((0.85 - Math.abs(th)) / 0.3, 0, 1);
    let x = Ox + R * Math.cos(th); const y = R * Math.sin(th); if (Math.abs(th) < 0.75) x = Math.min(x, Ox + R * lerp(1, 0.985, gp)); P.push([x, y, 34 + 10 * wgt]); }
  for (let x = Ox - R * Math.cos(a); x >= 100; x -= 6) P.push([x, hs, 30]);
  return { P, front: [Math.min(Ox + R, Ox + R * lerp(1, 0.985, gp)), 34 + 10 * gp], Ox, R, open: true }; }

// oogblaasje (g=1) → oogbeker: de voorwand klapt naar binnen tegen de achterwand; k 0..1
function _d3OogMorph(k) {
  const hs = _W3.stalk, w = 1.0, wr = 0.14, O1 = 422, R1 = 166, a1 = Math.asin(hs / R1);
  const O2 = 400, Ro = 178, Ri = 132, rho = 0.86, b = Math.asin(hs / Ro), tO = 16, tI = 52, Rm = (Ro + Ri) / 2, rr = (Ro - Ri) / 2;
  const s1 = (th) => { let x = O1 + R1 * Math.cos(th); const y = R1 * Math.sin(th); if (Math.abs(th) < 0.75) x = Math.min(x, O1 + R1 * 0.985); return [x, y]; };
  const dS = th => 34 + 10 * clamp((0.85 - Math.abs(th)) / 0.3, 0, 1);
  const pol = (R, th) => [O2 + R * Math.cos(th), R * Math.sin(th)]; const S = [], T = [];
  for (let i = 0; i <= 24; i++) { const u = i / 24; S.push([lerp(100, O1 - R1 * Math.cos(a1), u), -hs, 30]); T.push([lerp(100, O2 - Ro * Math.cos(b), u), -hs, 30]); }
  for (let i = 1; i <= 40; i++) { const u = i / 40, th = lerp(-Math.PI + a1, -w - wr, u); S.push([...s1(th), dS(th)]); T.push([...pol(Ro, lerp(-Math.PI + b, -rho, u)), lerp(26, tO, Math.min(1, i / 8))]); }
  for (let i = 1; i < 14; i++) { const f = i / 14 * Math.PI, ux = Math.cos(-rho), uy = Math.sin(-rho), tx = -uy, ty = ux, th = lerp(-w - wr, -w, i / 14);
    S.push([...s1(th), dS(th)]); T.push([O2 + (Rm + rr * Math.cos(f)) * ux + rr * Math.sin(f) * tx, (Rm + rr * Math.cos(f)) * uy + rr * Math.sin(f) * ty, lerp(tO, tI * 0.6, i / 14)]); }
  for (let i = 0; i <= 90; i++) { const u = i / 90, th = lerp(-w, w, u), rimD = Math.min(i, 90 - i) / 10; S.push([...s1(th), dS(th)]); T.push([...pol(Ri, lerp(-rho, -2 * Math.PI + rho, u)), lerp(tI * 0.6, tI, Math.min(1, rimD))]); }
  for (let i = 1; i < 14; i++) { const f = Math.PI - i / 14 * Math.PI, ux = Math.cos(rho), uy = Math.sin(rho), tx = uy, ty = -ux, th = lerp(w, w + wr, i / 14);
    S.push([...s1(th), dS(th)]); T.push([O2 + (Rm + rr * Math.cos(f)) * ux + rr * Math.sin(f) * tx, (Rm + rr * Math.cos(f)) * uy + rr * Math.sin(f) * ty, lerp(tI * 0.6, tO, i / 14)]); }
  for (let i = 0; i < 40; i++) { const u = i / 40, th = lerp(w + wr, Math.PI - a1, u); S.push([...s1(th), dS(th)]); T.push([...pol(Ro, lerp(rho, Math.PI - b, u)), lerp(tO, 26, Math.max(0, (i - 32) / 8))]); }
  for (let i = 0; i <= 24; i++) { const u = i / 24; S.push([lerp(O1 - R1 * Math.cos(a1), 100, u), hs, 30]); T.push([lerp(O2 - Ro * Math.cos(b), 100, u), hs, 30]); }
  const P = S.map((q, i) => [lerp(q[0], T[i][0], k), lerp(q[1], T[i][1], k), lerp(q[2], T[i][2], k)]);
  const f = P[25 + 40 + 13 + 45]; return { P, front: [f[0], f[2]], Ox: lerp(O1, O2, k), open: false,
    // punten om namen bij te zetten (binnenwand = netvlies, buitenwand = pigmentlaag)
    binnen: P[25 + 40 + 13 + 16], buiten: P[25 + 12] }; }

// ectoderm: e = lensplaatje dikker (0..1), p = instulpen en afsnoeren (0..1). Pad als gesloten ellips met aan beide kanten het kuiltje.
function _d3EctoPad(e, p) {
  const rx = _W3.rx, ry = _W3.ry; const dik0 = 22 + 34 * e;
  const dikT = th => { const d = Math.abs(th), w0 = 0.26, b = d < w0 ? Math.cos(d / w0 * Math.PI / 2) ** 2 : 0; return 22 + 34 * e * Math.min(1, b * 1.6); };
  const ell = th => { const dk = dikT(th), f = 1 + (dk - 22) / 2 / rx; return [rx * Math.cos(th) * f, ry * Math.sin(th) * f, dk]; };
  const R = []; const cel = {}; let kuil = null;
  if (p <= 0.001) { for (let i = 0; i <= 120; i++) R.push(ell(-Math.PI / 2 + Math.PI * i / 120)); cel.x = rx + (dik0 - 22) / 2; cel.th = dik0; cel.binnen = rx - 11; }
  else {
    const al = Math.PI * p, r = 76 + 254 * (1 - p) ** 3, hw = r * Math.sin(al), xe = rx * Math.sqrt(Math.max(0, 1 - (hw / ry) ** 2)), xm = lerp(rx + (dik0 - 22) / 2, Math.min(_D3.xm, xe - 6), ease(Math.min(1, p * 3))), cx = xm + r * Math.cos(al);
    const yA = Math.min(ry * 0.9, hw + 70), thA = Math.asin(yA / ry); const tp = th => lerp(dik0, 26 + 20 * (1 - Math.cos(th)) / 2, p);
    for (let i = 0; i <= 60; i++) R.push(ell(lerp(-Math.PI / 2, -thA, i / 60)));
    const A = ell(-thA), B = ell(thA);
    const tx = -Math.sin(al), ty = Math.cos(al), dd = Math.max(20, Math.hypot(A[0] - xm, A[1] + hw)) * 0.5; // raaklijn van het kuiltje bij de mond
    const cub = (P0, P1, P2, P3, u) => { const v = 1 - u; return [v * v * v * P0[0] + 3 * v * v * u * P1[0] + 3 * v * u * u * P2[0] + u * u * u * P3[0], v * v * v * P0[1] + 3 * v * v * u * P1[1] + 3 * v * u * u * P2[1] + u * u * u * P3[1]]; };
    for (let i = 1; i <= 16; i++) { const u = i / 16; const an = Math.hypot(rx * Math.sin(thA), ry * Math.cos(thA)), ax = rx * Math.sin(thA) / an, ay = ry * Math.cos(thA) / an;
      R.push([...cub([A[0], A[1]], [A[0] + ax * dd, A[1] + ay * dd], [xm - tx * dd, -hw - ty * dd], [xm, -hw], u), lerp(A[2], tp(Math.PI + al), u)]); }
    const n2 = Math.max(4, Math.round(120 * al / Math.PI)), arc = [];
    for (let i = 1; i < n2; i++) { const th = lerp(Math.PI + al, Math.PI - al, i / n2); const q = [cx + r * Math.cos(th), r * Math.sin(th), tp(th)]; R.push(q); arc.push(q); }
    for (let i = 0; i < 16; i++) { const u = i / 16; R.push([...cub([xm, hw], [xm - tx * dd, hw + ty * dd], [B[0] + rx * Math.sin(thA) / Math.hypot(rx * Math.sin(thA), ry * Math.cos(thA)) * dd, B[1] - ry * Math.cos(thA) / Math.hypot(rx * Math.sin(thA), ry * Math.cos(thA)) * dd], [B[0], B[1]], u), lerp(tp(Math.PI - al), B[2], u)]); }
    for (let i = 1; i <= 60; i++) R.push(ell(lerp(thA, Math.PI / 2, i / 60)));
    cel.x = cx - r; cel.th = tp(Math.PI); cel.binnen = cx - r - tp(Math.PI) / 2; kuil = { arc, cx, r, xm, hw }; }
  const L = R.map(q => [-q[0], q[1], q[2]]); // linkerhelft (gespiegeld); twee open helften, zodat een overlap in het kuiltje geen gaten geeft
  const verleng = (H) => [[H[0][0] - 3, H[0][1] - 0.5, H[0][2]], ...H, [H[H.length - 1][0] - 3, H[H.length - 1][1] + 0.5, H[H.length - 1][2]]];
  return { R, L, P: R.concat(L.slice(1, -1).reverse()), cel, kuil }; }

// signaalstipjes tussen twee vlakken (lokale coördinaten van de doorsnede): van x0 naar x1, met kromming kr (straal van het kuiltje)
function _d3Stipjes(ctx, t, x0, x1, ys, a, o = {}) { if (a <= 0.01) return; const { n = 14, r = 6.5, kr = 0, terug = false, seed = 3 } = o; ctx.save();
  for (let i = 0; i < n; i++) { const ph = (t * 0.42 + hash(i * 5.3 + seed)) % 1, y = (hash(i * 2.7 + seed) - 0.5) * 2 * ys;
    const off = kr > 0 && Math.abs(y) < kr * 0.95 ? kr - Math.sqrt(kr * kr - y * y) : 0; const u = terug ? 1 - ph : ph;
    const gap = x1 - x0, x = gap > 14 ? lerp(x0 + 6, x1 - 6, u) : (x0 + x1) / 2 + (hash(i * 9.1) - 0.5) * 10 + (u - 0.5) * 6;
    circ(ctx, x + off, y, r, rgba(C.goud, a * Math.min(1, Math.sin(ph * Math.PI) * 2.2))); }
  ctx.restore(); }

// Doorsnede van de kop, doorlopend te animeren. cam {X,Y,s}; o: g, k, e, p, sep, grijs, goud, sig, sigOud, sigTerug, t, clip
function _d3Kop(ctx, cam, o = {}) {
  const { g = 1, k = 0, e = 0, p = 0, sep = 0, grijs = 0, goud = 1, sig = 0, sigOud = 0, sigTerug = 0, t = 0, clip = null } = o;
  const { X, Y, s } = cam; const M = (x, y) => [X + x * s, Y + y * s]; const ank = {};
  ctx.save(); if (clip) { ctx.beginPath(); ctx.rect(...clip); ctx.clip(); }
  ctx.translate(X, Y); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, _W3.rx, _W3.ry, 0, 0, 6.283); ctx.fillStyle = _W3.weefsel; ctx.fill();
  for (let i = 0; i < 260; i++) { const an = hash(i * 3.1) * 6.283, rr = Math.sqrt(hash(i * 5.7 + 1)), x = Math.cos(an) * rr * (_W3.rx - 40), y = Math.sin(an) * rr * (_W3.ry - 40);
    ctx.save(); ctx.translate(x, y); ctx.rotate(hash(i) * 3); ctx.strokeStyle = rgba(C.koraal, 0.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(9, 0); ctx.moveTo(0, -6); ctx.lineTo(0, 6); ctx.stroke(); circ(ctx, 0, 0, 3.5, rgba(C.koraal, 0.35)); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 0, _W3.ringRx, _W3.ringRy, 0, 0, 6.283); ctx.fillStyle = _W3.lumen; ctx.fill();
  const oog = k > 0.001 ? _d3OogMorph(k) : _d3BlaasjePad(g);
  for (const z of [1, -1]) { ctx.save(); ctx.scale(z, 1); _w3Vul(ctx, oog.open ? oog.P.concat([[100, -_W3.stalk, 0]]) : oog.P, _W3.lumen); ctx.restore(); }
  const a0 = Math.asin(_W3.stalk / _W3.ringRy) + 0.04;
  const boog = (t0, t1) => { const P = []; for (let i = 0; i <= 60; i++) { const th = lerp(t0, t1, i / 60); P.push([_W3.ringRx * Math.cos(th), _W3.ringRy * Math.sin(th), 42]); } return P; };
  _w3Epi(ctx, boog(a0, Math.PI - a0), { col: _W3.neur }); _w3Epi(ctx, boog(Math.PI + a0, 2 * Math.PI - a0), { col: _W3.neur });
  for (const z of [1, -1]) { ctx.save(); ctx.scale(z, 1); _w3Epi(ctx, oog.P, { col: _W3.neur, cel: 20 }); ctx.restore(); }
  // ectoderm (met kuiltje) en, na het afsnoeren, het losse lensblaasje
  const ec = _mixHex(_W3.ecto, _W3.grijs, grijs);
  const E = _d3EctoPad(sep > 0 ? e * (1 - sep) : e, sep > 0 ? 0 : p);
  if (E.kuil) for (const z of [1, -1]) { ctx.save(); ctx.scale(z, 1); _w3Vul(ctx, E.kuil.arc.concat([[E.kuil.xm, E.kuil.hw], [E.kuil.xm, -E.kuil.hw]]), _W3.lumen); ctx.restore(); }
  const ecD = _w3Epi(ctx, E.R, { col: ec, cel: 22 }); _w3Epi(ctx, E.L, { col: ec, cel: 22 });
  let lx = null; if (sep > 0) { lx = lerp(_D3.xm - 76, oog.Ox + 62, ease(sep));
    for (const z of [1, -1]) { ctx.save(); ctx.scale(z, 1); ctx.beginPath(); ctx.arc(lx, 0, 76, 0, 6.283); ctx.fillStyle = _W3.lumen; ctx.fill(); _w3Epi(ctx, _w3LensPad(lx, 76), { col: _W3.ecto, closed: true, cel: 18 }); ctx.restore(); } }
  // signalen
  const wand = oog.front[0] + oog.front[1] / 2;
  if (sep > 0) { const achter = lx - 76 - 23; _d3Stipjes(ctx, t, wand, achter, 70, sigTerug, { terug: true, kr: 76, n: 12, seed: 7 }); _d3Stipjes(ctx, t, wand, achter, 70, sig * (1 - sep), { kr: 76, n: 12 }); }
  else { const kr = E.kuil ? E.kuil.r : 0, ys = E.kuil ? Math.min(110, Math.max(70, E.kuil.hw * 0.8)) : 110; _d3Stipjes(ctx, t, wand, E.cel.binnen, ys, sig, { kr }); }
  if (sigOud > 0.01) { ctx.save(); for (let i = 0; i < 10; i++) { const ph = (t * 0.3 + hash(i * 3.3 + 11)) % 1, zy = i % 2 ? 1 : -1, x0 = 430 + 60 * hash(i * 7), y0 = zy * (330 + 40 * hash(i * 4)), x1 = 590, y1 = zy * (120 + 50 * hash(i * 6));
    circ(ctx, lerp(x0, x1, ph), lerp(y0, y1, ph), 5, rgba(C.goud, 0.7 * sigOud * Math.min(1, Math.sin(ph * Math.PI) * 2.2))); } ctx.restore(); }
  // onze cel
  if (goud > 0.01) { ctx.save(); ctx.globalAlpha *= goud; if (sep > 0) { _w3GoudCel(ctx, lx - 76, 0, Math.PI / 2, 22, 50); ank.cel = M(lx - 76, 0); } else { _w3GoudCel(ctx, E.cel.x, 0, Math.PI / 2, 22, E.cel.th + 4); ank.cel = M(E.cel.x, 0); } ctx.restore(); }
  ctx.restore();
  ank.lx = lx; ank.oog = oog; ank.Ox = oog.Ox; return { M, ank }; }

// tijdbalk rechtsboven (week als kommagetal)
function _d3Week(ctx, w, a = 1) { if (a <= 0.01) return; const x0 = 1430, x1 = 1840, y = 108; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (let i = 1; i <= 8; i++) { const x = lerp(x0, x1, (i - 1) / 7); ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke(); }
  circ(ctx, lerp(x0, x1, (w - 1) / 7), y, 11, C.goud); metaText(ctx, 'WEEK ' + Math.round(w), x1, 74, C.goud, 'right', 26); ctx.restore(); }

function _d3Ring(ctx, x, y, r, a = 1, col = C.goud, lw = 4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
const _d3puls = (t, t0, d = 1.4) => { const u = (t - t0) / d; return u < 0 || u > 1 ? 0 : Math.sin(u * Math.PI); };

// stadia 'dikker · stulpt in · snoert af' als genummerde tegels rechts
function _d3Stadia(ctx, x, y, st, a = 1) { if (a <= 0.01) return; const T = ['dikker', 'stulpt in', 'snoert af']; ctx.save(); ctx.globalAlpha *= a;
  T.forEach((nm, i) => { const v = clamp(st[i], 0, 1); if (v <= 0.01) return; const yy = y + i * 104; ctx.save(); ctx.globalAlpha *= v; const act = st[3] === i;
    roundRect(ctx, x, yy, 380, 80, 14); shape(ctx, act ? rgba(C.goud, 0.16) : rgba(C.bgSchema, 0.92), act ? C.goud : C.line, act ? 2.5 : 1.5);
    circ(ctx, x + 44, yy + 40, 22, C.bgMicro, C.goud, 3); text(ctx, String(i + 1), x + 44, yy + 50, fTekst(30, 800), C.goud, 'center');
    text(ctx, nm, x + 90, yy + 53, fTekst(38, 600), C.text, 'left'); ctx.restore(); }); ctx.restore(); }

// ---------- huidcel met receptor en lensgenen (doorlopend) ----------
function _d3HuidCel(ctx, x, y, r, o = {}) { const { gen = 0, pax = 0, kleur = _W3.ecto, sig = 1, a = 1 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(kleur, 0.12); ctx.fill(); ctx.restore();
  const m = membraanBoog(ctx, x, y, r, 0, 6.283, { s: 0.55 * r / 230, eiwitten: [{ an: -Math.PI / 2, soort: 'eiwit' }], eiwitCol: C.teal, kop: kleur });
  const rp = m.eiwit[0], k = r / 230;
  [[0, -30], [-80, -70], [-140, -40], [-40, -100]].forEach(([dx, dy], i) => { const u = clamp(sig * 1.4 - i * 0.13, 0, 1); if (u <= 0) return; const e = ease(u), tx = rp[0] + dx * k, ty = rp[1] + dy * k;
    circ(ctx, lerp(tx - 230 * k, tx, e), lerp(ty - 150 * k, ty, e), (i ? 9 : 10) * Math.max(0.8, k), rgba(C.goud, Math.min(1, u * 3))); });
  const kx = x, ky = y + r * 0.12, kr = r * 0.55; ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.35); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.arc(kx, ky, kr - 7, 0, 6.283); ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  const P = []; for (let i = 0; i <= 8; i++) { const u = i / 8; P.push([kx - kr * 0.8 + u * kr * 1.6, ky + Math.sin(u * 6.28 * 1.2 + 0.4) * kr * 0.22]); }
  dnaDraad(ctx, P, { w: 9 * k }); const D = bioDicht(P, 20);
  const g1 = _w3GenOp(ctx, D, 0.42, 0.62, rgba(C.text2, 0.55), 1, 22 * k), g2 = _w3GenOp(ctx, D, 0.72, 0.9, rgba(C.text2, 0.55), 1, 22 * k);
  if (gen > 0.01) { _w3GenOp(ctx, D, 0.42, 0.62, C.groen, gen, 22 * k); _w3GenOp(ctx, D, 0.72, 0.9, C.groen, gen, 22 * k);
    for (const g of [g1, g2]) { ctx.save(); ctx.strokeStyle = rgba(C.groen, gen); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g[0], g[1] + 14 * k);
      for (let i = 1; i <= 20; i++) { const u = i / 20 * gen, v = 1 - u, p0 = [g[0], g[1] + 14 * k], p1 = [g[0] - 12 * k, g[1] + 40 * k], p2 = [g[0] + 18 * k, g[1] + 55 * k], p3 = [g[0] + 4 * k, g[1] + 78 * k];
        ctx.lineTo(v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]); }
      ctx.stroke(); ctx.restore(); } }
  let pp = null; if (pax > 0.01) { pp = D[Math.round(0.34 * (D.length - 1))]; ctx.save(); ctx.globalAlpha *= pax; _w3Kluwen(ctx, pp[0], pp[1] - 18 * k, 26 * k, C.goud, 2, 10); ctx.restore(); }
  ctx.restore(); return { receptor: rp, kern: [kx, ky, kr], gen: g1, gen2: g2, pax: pp }; }

function _d3Klokje(ctx, cx, cy, cr, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, cx, cy, cr, rgba(C.fill, 0.9), C.text2, 4);
  if (frac > 0.002) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, cr - 8, -Math.PI / 2, -Math.PI / 2 + 6.283 * frac); ctx.closePath(); ctx.fillStyle = rgba(C.text2, 0.35); ctx.fill(); }
  const an = -Math.PI / 2 + 6.283 * frac; ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * (cr - 14), cy + Math.sin(an) * (cr - 14)); ctx.stroke();
  circ(ctx, cx, cy - cr - 10, 9, C.text2); metaText(ctx, 'TIJD LOOPT AF', cx, cy + cr + 44, C.text2, 'center', 26); ctx.restore(); }

// ---------- kern met Pax6-netwerk (w38) ----------
function _d3Netwerk(ctx, t, st) { // st: pax, eiwit (0..1 reis), samen, net1, reis2, net2
  const cx = 900, cy = 510, rx = 760, ry = 350; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.2); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx, cy, rx - 10, ry - 10, 0, 0, 6.283); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283 + 0.1; circ(ctx, cx + Math.cos(an) * (rx - 5), cy + Math.sin(an) * (ry - 5), 7, C.bgMicro, C.kernR, 2); }
  metaText(ctx, 'KERN', cx + rx - 60, cy - ry + 50, C.kernR, 'right', 26);
  const rij = (y, x0, x1) => { const P = []; for (let i = 0; i <= 12; i++) { const u = i / 12; P.push([lerp(x0, x1, u), y + Math.sin(u * 6.28 * 1.5 + y) * 14]); } return P; };
  const R = [rij(320, 260, 1540), rij(520, 1560, 240), rij(720, 340, 1460)]; const D = R.map(P => { dnaDraad(ctx, P, { w: 10 }); return bioDicht(P, 20); });
  const grijs = rgba(C.text2, 0.45);
  const G1 = [[0, 0.48, 0.6], [0, 0.78, 0.9], [1, 0.12, 0.24]], G2 = [[1, 0.5, 0.6], [1, 0.8, 0.9], [2, 0.08, 0.2], [2, 0.42, 0.52]];
  _w3GenOp(ctx, D[0], 0.06, 0.18, grijs, 1, 26); const pax = _w3GenOp(ctx, D[0], 0.06, 0.18, C.goud, st.pax, 26);
  const t1 = G1.map(([r, a, b]) => { const m = _w3GenOp(ctx, D[r], a, b, grijs, 1, 26); _w3GenOp(ctx, D[r], a, b, C.groen, st.net1, 26); return { r, m, a }; });
  const t2 = G2.map(([r, a, b]) => { const m = _w3GenOp(ctx, D[r], a, b, grijs, 1, 26); _w3GenOp(ctx, D[r], a, b, C.groen, st.net2, 26); return { r, m, a }; });
  [[0, 0.3, 0.38], [2, 0.7, 0.8], [2, 0.88, 0.96], [1, 0.32, 0.4]].forEach(([r, a, b]) => _w3GenOp(ctx, D[r], a, b, grijs, 1, 26));
  const bindVoor = (r, a) => D[r][Math.max(0, Math.round((a - 0.035) * (D[r].length - 1)))];
  const pe = [pax[0] + 30, pax[1] + 95];
  // Pax6-eiwit ontstaat bij het gen en zakt naar beneden; daarna reizen kopieën naar de genen van stap 1
  if (st.eiwit > 0.01) { const u = ease(st.eiwit); ctx.save(); ctx.globalAlpha *= Math.min(1, st.eiwit * 3); _w3Kluwen(ctx, lerp(pax[0], pe[0], u), lerp(pax[1] + 10, pe[1], u), 30, C.goud, 1, 12); ctx.restore();
    pijl(ctx, pax[0], pax[1] + 22, pe[0] - 6, pe[1] - 40, C.goud, Math.min(1, st.eiwit * 2), 4, 14); }
  t1.forEach((g, i) => { const b = bindVoor(g.r, g.a), u = clamp(st.reis1 * 1.5 - i * 0.25, 0, 1); if (u <= 0) return; const e = ease(u), mx = lerp(pe[0], b[0], 0.5), my = Math.min(pe[1], b[1]) - 60;
    const x = (1 - e) ** 2 * pe[0] + 2 * (1 - e) * e * mx + e * e * b[0], y = (1 - e) ** 2 * pe[1] + 2 * (1 - e) * e * my + e * e * (b[1] - 4); _w3Kluwen(ctx, x, y, 22, C.goud, i + 3, 9);
    if (st.samen > 0.01) { ctx.save(); ctx.globalAlpha *= st.samen; const sx = b[0] + 30, sy = b[1] - 30, f = ease(st.samen); _w3Kluwen(ctx, lerp(sx + 60, sx, f), lerp(sy - 70, sy, f), 16, C.teal, i + 11, 8); ctx.restore(); } });
  t2.forEach((g, i) => { const b = bindVoor(g.r, g.a), bron = t1[[0, 1, 2, 2][i]].m, u = clamp(st.reis2 * 1.6 - i * 0.2, 0, 1); if (u <= 0) return; const e = ease(u);
    _w3Kluwen(ctx, lerp(bron[0], b[0], e), lerp(bron[1] + 20, b[1] - 4, e), 20, C.groen, i + 7, 9); });
  const nr = (x, y, n, col, a) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 22, C.bgMicro, col, 3); text(ctx, String(n), x, y + 10, fTekst(30, 800), col, 'center'); ctx.restore(); };
  nr(pax[0], pax[1] - 50, 1, C.goud, st.pax); t1.forEach(g => nr(g.m[0], g.m[1] - 50, 2, C.groen, st.net1)); t2.forEach(g => nr(g.m[0], g.m[1] - 50, 3, C.groen, st.net2));
  return { pax, pe, t1, t2 }; }

// ---------- fruitvlieg van opzij met Hox-stroken; aan(p) = 0..1 kleur per paraloge groep ----------
function _d3VliegZij(ctx, x, y, L, aan = () => 1, a = 1) { if (a <= 0.01) return null; const V = ERFK.vlieg, g = V.grijs, gd = V.grijsD; const K = (p) => _w3Hox(p);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kop = [-0.43 * L, -0.03 * L, 0.11 * L], bor = [-0.16 * L, -0.05 * L, 0.18 * L, 0.15 * L], ach = [0.22 * L, 0.0, 0.25 * L, 0.125 * L];
  const poten = [[-0.27, 5, -0.2], [-0.17, 6, 0.05], [-0.06, 7, 0.32]]; const pootM = [];
  for (const [px, p, sp] of poten) { const x0 = px * L, y0 = 0.07 * L, x1 = x0 + (sp - 0.05) * L * 0.5, y1 = y0 + 0.13 * L, x2 = x1 + sp * L * 0.35, y2 = y1 + 0.14 * L, x3 = x2 + (sp + 0.1) * L * 0.25, y3 = y2 + 0.06 * L;
    ctx.strokeStyle = _mixHex(gd, _mixHex(K(p), '#000000', 0.15), aan(p)); ctx.lineWidth = L * 0.022; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.lineWidth = L * 0.012; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke(); pootM.push([x + x1, y + y1]); }
  const lijf = () => { ctx.beginPath(); ctx.arc(kop[0], kop[1], kop[2], 0, 6.283); ctx.moveTo(bor[0] + bor[2], bor[1]); ctx.ellipse(bor[0], bor[1], bor[2], bor[3], 0, 0, 6.283);
    ctx.moveTo(ach[0] + ach[2], ach[1]); ctx.ellipse(ach[0], ach[1], ach[2], ach[3], 0.12, 0, 6.283); };
  lijf(); ctx.fillStyle = g; ctx.fill('nonzero');
  ctx.save(); lijf(); ctx.clip('nonzero'); const strook = [];
  const vak = (x0, w, p) => { strook.push([x + x0, x + x0 + w, p]); const v = aan(p); if (v <= 0.01) return; ctx.fillStyle = rgba(K(p), 0.85 * v); ctx.fillRect(x0, -L, w + 1, 2 * L); };
  const kx0 = kop[0] - kop[2], kw = kop[2] * 2 / 3; [1, 2, 4].forEach((p, i) => vak(kx0 + i * kw, kw, p));
  const bx0 = kop[0] + kop[2]; [[bx0, -0.24 * L, 5], [-0.24 * L, -0.05 * L, 6], [-0.05 * L, 0.0, 7]].forEach(([a0, b0, p]) => vak(a0, b0 - a0, p));
  const ax0 = 0.0, aw = (ach[0] + ach[2] - ax0) / 8; for (let i = 0; i < 8; i++) vak(ax0 + i * aw, aw, i === 0 ? 7 : i < 4 ? 8 : 11);
  ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(ax0 + i * aw, -L); ctx.lineTo(ax0 + i * aw, L); ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = gd; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(kop[0], kop[1], kop[2], 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(bor[0], bor[1], bor[2], bor[3], 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(ach[0], ach[1], ach[2], ach[3], 0.12, 0, 6.283); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(kop[0] + 0.01 * L, kop[1] - 0.005 * L, 0.07 * L, 0.085 * L, 0.2, 0, 6.283); shape(ctx, rgba(V.oog, 0.85), V.oogD, 2);
  ctx.strokeStyle = gd; ctx.lineWidth = L * 0.016; ctx.beginPath(); ctx.moveTo(kop[0] - 0.09 * L, kop[1] - 0.05 * L); ctx.lineTo(kop[0] - 0.14 * L, kop[1] - 0.03 * L); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kop[0] - 0.14 * L, kop[1] - 0.03 * L); ctx.quadraticCurveTo(kop[0] - 0.19 * L, kop[1] - 0.09 * L, kop[0] - 0.2 * L, kop[1] - 0.13 * L); ctx.stroke();
  ctx.lineWidth = L * 0.022; ctx.beginPath(); ctx.moveTo(kop[0] - 0.03 * L, kop[1] + 0.09 * L); ctx.lineTo(kop[0] - 0.06 * L, kop[1] + 0.15 * L); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-0.12 * L, -0.17 * L); ctx.bezierCurveTo(0.1 * L, -0.27 * L, 0.5 * L, -0.24 * L, 0.6 * L, -0.15 * L); ctx.bezierCurveTo(0.5 * L, -0.1 * L, 0.15 * L, -0.12 * L, -0.12 * L, -0.17 * L);
  shape(ctx, rgba(V.vleugel, 0.22), rgba(V.vleugel, 0.8), 2);
  ctx.strokeStyle = rgba(V.vleugel, 0.45); ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-0.08 * L, -0.17 * L); ctx.quadraticCurveTo(0.2 * L, -0.22 * L + i * 0.02 * L, 0.55 * L, -0.17 * L + i * 0.015 * L); ctx.stroke(); }
  ctx.restore();
  return { kop: [x + kop[0], y + kop[1]], spriet: [x + kop[0] - 0.16 * L, y + kop[1] - 0.07 * L], poot: pootM, strook, top: y - 0.2 * L, bodem: y + 0.15 * L }; }

// rij Hox-genen met per gen een zichtbaarheid (pop) en een kleur-aan; geeft middens
function _d3HoxRij(ctx, x, y, w, genen, o = {}) { const { h = 44, namen = true, px = 26, chrom = 1, pop = () => 1, kleur = () => 1, ring = () => 0 } = o; const n = genen.length, gw = w / n;
  if (chrom > 0.01) { ctx.save(); ctx.globalAlpha *= chrom; roundRect(ctx, x - 40, y - h * 0.32, w + 80, h * 0.64, h * 0.32); shape(ctx, '#3A465E', rgba(C.line, 0.6), 2); ctx.restore(); }
  const mid = []; genen.forEach((g, i) => { const gx = x + i * gw; mid.push(gx + gw / 2); if (!g) return; const v = pop(i); if (v <= 0.01) return; ctx.save(); ctx.globalAlpha *= Math.min(1, v * 1.5);
    const sc = lerp(0.4, 1, ease(v)), cxm = gx + gw / 2; ctx.translate(cxm, y); ctx.scale(sc, sc); ctx.translate(-cxm, -y);
    const col = _mixHex('#5A6478', _w3Hox(g[1]), kleur(i)); roundRect(ctx, gx + 4, y - h / 2, gw - 8, h, 7); shape(ctx, col, lighten(col, 0.3), 1.5);
    const rg = ring(i); if (rg > 0.01) { roundRect(ctx, gx, y - h / 2 - 5, gw, h + 10, 10); ctx.strokeStyle = rgba(C.goud, rg); ctx.lineWidth = 4; ctx.stroke(); }
    if (namen && g[0]) metaText(ctx, g[0], gx + gw / 2, y - h / 2 - 14, C.text, 'center', px); ctx.restore(); });
  return mid; }

// fruitvliegkop van voren; g = groei van de poten op de plek van de voelsprieten (0 normaal, 1 Antennapedia); tint = kleur antennegebied
function _d3VliegKop(ctx, x, y, s, o = {}) { const { g = 0, tint = null, tintA = 0, a = 1 } = o; if (a <= 0.01) return {}; const V = ERFK.vlieg, gr = V.grijs, gd = V.grijsD;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-230, -20); ctx.bezierCurveTo(-230, -150, -120, -180, 0, -180); ctx.bezierCurveTo(120, -180, 230, -150, 230, -20); ctx.bezierCurveTo(230, 90, 130, 175, 0, 178); ctx.bezierCurveTo(-130, 175, -230, 90, -230, -20); ctx.closePath(); shape(ctx, gr, gd, 3);
  ctx.beginPath(); ctx.moveTo(-85, -165); ctx.quadraticCurveTo(0, -178, 85, -165); ctx.quadraticCurveTo(95, -40, 60, 30); ctx.lineTo(-60, 30); ctx.quadraticCurveTo(-95, -40, -85, -165); ctx.closePath(); shape(ctx, '#B5916A', rgba(gd, 0.8), 2);
  for (const [px, py] of [[0, -150], [-20, -128], [20, -128]]) circ(ctx, px, py, 7, '#C8B27A', gd, 1.5);
  ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3; for (const [bx, by, dx, dy] of [[-60, -166, -30, -40], [60, -166, 30, -40], [-30, -150, -10, -45], [30, -150, 10, -45], [-120, -150, -40, -30], [120, -150, 40, -30]]) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + dx * 0.4, by + dy * 0.7, bx + dx, by + dy); ctx.stroke(); }
  for (const kk of [-1, 1]) { ctx.save(); ctx.translate(kk * 158, -10); ctx.beginPath(); ctx.ellipse(0, 0, 82, 128, kk * 0.12, 0, 6.283); shape(ctx, V.oog, V.oogD, 2.5); ctx.clip();
    ctx.fillStyle = rgba(V.oogD, 0.55); for (let iy = -140; iy < 140; iy += 13) for (let ix = -90; ix < 90; ix += 14) { ctx.beginPath(); ctx.arc(ix + ((iy / 13) % 2 ? 7 : 0), iy, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-60, 30); ctx.quadraticCurveTo(-70, 120, 0, 140); ctx.quadraticCurveTo(70, 120, 60, 30); ctx.closePath(); shape(ctx, _mixHex(gr, '#FFFFFF', 0.12), gd, 2);
  ctx.beginPath(); ctx.moveTo(-30, 150); ctx.quadraticCurveTo(-48, 205, 0, 214); ctx.quadraticCurveTo(48, 205, 30, 150); ctx.closePath(); shape(ctx, '#8C8270', gd, 2);
  if (tint && tintA > 0.01) { ctx.beginPath(); ctx.ellipse(0, 20, 100, 70, 0, 0, 6.283); ctx.fillStyle = rgba(tint, 0.55 * tintA); ctx.fill(); }
  const ank = {};
  for (const k of [-1, 1]) {
    ctx.beginPath(); ctx.ellipse(k * 34, -8, 20, 16, 0, 0, 6.283); shape(ctx, '#7E6A50', gd, 1.5);
    const sa = 1 - ease(clamp(g * 2.2, 0, 1)); // voelspriet krimpt weg terwijl de poot groeit
    if (sa > 0.01) { ctx.save(); ctx.translate(k * 36, 6); ctx.scale(sa, sa); ctx.translate(-k * 36, -6);
      ctx.beginPath(); ctx.ellipse(k * 36, 8, 12, 12, 0, 0, 6.283); shape(ctx, '#9C7E5A', gd, 1.5);
      ctx.beginPath(); ctx.ellipse(k * 40, 30, 17, 18, 0, 0, 6.283); shape(ctx, '#9C7E5A', gd, 1.5);
      ctx.beginPath(); ctx.ellipse(k * 50, 80, 30, 44, k * -0.15, 0, 6.283); shape(ctx, '#C4A274', gd, 2.5);
      const ax0 = k * 62, ay0 = 60, ax1 = k * 150, ay1 = 20; ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.quadraticCurveTo(k * 110, 52, ax1, ay1); ctx.stroke();
      ctx.lineWidth = 1.8; for (let i = 1; i < 8; i++) { const u = i / 8, px = lerp(ax0, ax1, u), py = lerp(ay0, ay1, u) + Math.sin(u * 3.14) * 6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + k * 6, py - 16); ctx.moveTo(px, py); ctx.lineTo(px + k * 4, py + 13); ctx.stroke(); }
      ctx.restore(); ank['spriet' + k] = [x + k * 50 * s, y + 80 * s]; }
    if (g > 0.01) { const gg = ease(g), kl = '#8E826C', kd = _mixHex(kl, '#000000', 0.3), O = [k * 36, 6];
      const P = [[k * 36, 6], [k * 52, 40], [k * 112, 160], [k * 150, 290], [k * 182, 395]].map(q => [O[0] + (q[0] - O[0]) * gg, O[1] + (q[1] - O[1]) * gg]); const dik = [22, 20, 17, 12].map(d => d * lerp(0.5, 1, gg));
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = kd; ctx.lineWidth = dik[i] + 4; ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[i + 1]); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dik[i]; ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[i + 1]); ctx.stroke(); }
      for (let i = 0; i < 5; i++) { const u0 = i / 5, u1 = (i + 1) / 5 - 0.02, aa = [lerp(P[3][0], P[4][0], u0), lerp(P[3][1], P[4][1], u0)], bb = [lerp(P[3][0], P[4][0], u1), lerp(P[3][1], P[4][1], u1)];
        ctx.strokeStyle = kd; ctx.lineWidth = dik[3] + 3; ctx.beginPath(); ctx.moveTo(...aa); ctx.lineTo(...bb); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dik[3] - 1; ctx.beginPath(); ctx.moveTo(...aa); ctx.lineTo(...bb); ctx.stroke(); }
      if (gg > 0.6) { ctx.save(); ctx.globalAlpha *= (gg - 0.6) / 0.4; ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(P[4][0], P[4][1]); ctx.quadraticCurveTo(P[4][0] + k * 16, P[4][1] + 6, P[4][0] + k * 12, P[4][1] + 20); ctx.moveTo(P[4][0], P[4][1]); ctx.quadraticCurveTo(P[4][0] - k * 6, P[4][1] + 14, P[4][0] - k * 2, P[4][1] + 24); ctx.stroke();
        ctx.lineWidth = 2; for (let i = 1; i < 3; i++) for (let q = 1; q < 6; q++) { const u = q / 6, px = lerp(P[i][0], P[i + 1][0], u), py = lerp(P[i][1], P[i + 1][1], u); ctx.beginPath(); ctx.moveTo(px + k * 8, py); ctx.lineTo(px + k * 20, py + 8); ctx.stroke(); } ctx.restore(); }
      ank['poot' + k] = [x + P[3][0] * s, y + P[3][1] * s]; } }
  ctx.restore(); return ank; }

// schakelaartje (aan = 0..1)
function _d3Schakel(ctx, x, y, aan, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 26, y - 14, 52, 28, 14); shape(ctx, _mixHex('#3A465E', '#7A6420', aan), rgba(C.line, 0.7), 2);
  circ(ctx, lerp(x - 12, x + 12, ease(aan)), y, 11, aan > 0.5 ? C.goud : C.text2); ctx.restore(); }

// kleine cascade: één gouden gen zet groene genen aan (mastergen)
function _d3Cascade(ctx, x, y, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const blok = (bx, by, col, v) => { if (v <= 0.01) return; ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, bx - 30, by - 12, 60, 24, 6); shape(ctx, col, null); ctx.restore(); };
  blok(x, y, C.goud, 1); const L1 = [-120, 0, 120], L2 = [-180, -90, 0, 90, 180];
  L1.forEach((dx, i) => { const v = clamp(u * 2.5 - i * 0.15, 0, 1); pijl(ctx, x, y + 16, x + dx * 0.9, y + 66, C.goud, v, 3, 10); blok(x + dx, y + 90, C.groen, v); });
  L2.forEach((dx, i) => { const v = clamp(u * 2.5 - 1.1 - i * 0.12, 0, 1); const src = x + L1[Math.min(2, Math.round((i / 4) * 2))]; pijl(ctx, src, y + 106, x + dx * 0.95, y + 154, C.groen, v, 3, 10); blok(x + dx, y + 178, C.groen, v); });
  ctx.restore(); }

// oogje van de vlieg (w39)
function _d3Oogje(ctx, px, py, r, gr = 1, ring = 1) { const V = ERFK.vlieg; if (gr > 0.01) { const rr = r * ease(gr); ctx.save(); ctx.beginPath(); ctx.ellipse(px, py, rr, rr * 0.8, 0.3, 0, 6.283); shape(ctx, V.oog, V.oogD, 2); ctx.clip(); ctx.fillStyle = rgba(V.oogD, 0.7);
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { ctx.beginPath(); ctx.arc(px + i * rr * 0.32 + (j % 2) * rr * 0.16, py + j * rr * 0.28, rr * 0.07, 0, 6.283); ctx.fill(); } ctx.restore(); }
  _d3Ring(ctx, px, py, r * 2.1, ring); }

// plekken voor extra oogjes op de grote vlieg (zelfde rekensom als w39)
function _d3VliegPlek(x, y, L) { const Ls = L, kopY = -Ls * 0.42, borstY = -Ls * 0.17; const j = 1, k = 1, by = borstY - Ls * 0.07 + j * Ls * 0.07, ang = 0.1, l1 = Ls * 0.2, l2 = Ls * 0.24, x0 = k * Ls * 0.1, x1 = x0 + Math.cos(ang) * l1, y1 = by + Math.sin(ang) * l1 - Ls * 0.04, x2 = x1 + Math.cos(ang * 1.4 + 0.5) * l2, y2 = y1 + Math.sin(ang * 1.4 + 0.5) * l2;
  const poot = [x + (x1 + x2) / 2, y + (y1 + y2) / 2]; const kk = -1, c0 = Math.cos(-kk * 0.2), s0 = Math.sin(-kk * 0.2), lx = kk * Ls * 0.16 * 0.7, ly = Ls * 0.86 * 0.18;
  const vleugel = [x + kk * Ls * 0.08 + lx * c0 - ly * s0, y + borstY + Ls * 0.02 + lx * s0 + ly * c0]; const spriet = [x - Ls * 0.05, y + kopY - Ls * 0.12]; return { poot, vleugel, spriet }; }

function _d3Facetten(ctx, zx, zy, zr, a, licht = 0) { if (a <= 0.01) return; const V = ERFK.vlieg; ctx.save(); ctx.globalAlpha *= a; const rr = zr * ease(a);
  ctx.beginPath(); ctx.arc(zx, zy, rr, 0, 6.283); ctx.fillStyle = C.bgMacroSky; ctx.fill(); ctx.save(); ctx.clip();
  ctx.strokeStyle = '#8A7E68'; ctx.lineWidth = 120; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(zx - 340, zy - 230); ctx.lineTo(zx + 340, zy + 230); ctx.stroke();
  ctx.strokeStyle = '#6E655E'; ctx.lineWidth = 3; for (let i = -6; i <= 6; i++) { const px = zx + i * 50, py = zy + i * 34; ctx.beginPath(); ctx.moveTo(px - 30, py + 55); ctx.lineTo(px - 10, py + 85); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(zx, zy, 150, 125, 0.3, 0, 6.283); shape(ctx, V.oog, V.oogD, 3); ctx.clip();
  for (let iy = -8; iy <= 8; iy++) for (let ix = -9; ix <= 9; ix++) { const hx = zx + ix * 19 + (iy % 2 ? 9.5 : 0), hy = zy + iy * 16.5; ctx.beginPath(); for (let q = 0; q < 6; q++) { const an = q / 6 * 6.283 + Math.PI / 6; ctx.lineTo(hx + Math.cos(an) * 10, hy + Math.sin(an) * 10); } ctx.closePath();
    ctx.fillStyle = _mixHex(V.oog, '#FFFFFF', 0.08 + 0.12 * hash(ix * 31 + iy)); ctx.fill(); ctx.strokeStyle = V.oogD; ctx.lineWidth = 2; ctx.stroke();
    if (licht > 0.01 && hash(ix * 7 + iy * 13) > 0.7) circ(ctx, hx, hy, 4, rgba(C.goud, licht)); }
  ctx.restore(); ctx.beginPath(); ctx.arc(zx, zy, rr, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke();
  // lichtstralen die op de facetten vallen
  if (licht > 0.01) { ctx.strokeStyle = rgba(C.goud, licht); ctx.lineWidth = 4; for (const dx of [-70, 0, 70]) { ctx.beginPath(); ctx.moveTo(zx + dx - 150, zy - 230); ctx.lineTo(zx + dx - 50, zy - 110); ctx.stroke(); pijl(ctx, zx + dx - 70, zy - 134, zx + dx - 46, zy - 104, C.goud, licht, 4, 12); } }
  ctx.restore(); }

// ======================================================================================================
const _D3VLIEG = _W3VLIEG; const _D3P2I = { 1: 0, 2: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 11: 7 };
const _D3MENS = { HOXA: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13], HOXB: [1, 2, 3, 4, 5, 6, 7, 8, 9, 13], HOXC: [4, 5, 6, 8, 9, 10, 11, 12, 13], HOXD: [1, 3, 4, 8, 9, 10, 11, 12, 13] };
const _d3clip = [0, 100, 1920, 780];

// eindstanden die de volgende alinea overneemt
function _d3s50eind(ctx, t) { return _d3Kop(ctx, _D3.bekerCam, { g: 1, k: 1, e: 1, p: 1, sep: 1, t, clip: _d3clip }); }

Object.assign(SCENES, {
  // ---------- 6 Een bericht voor onze cel ----------
  s47(ctx, t, q) { bg(ctx, 'micro');
    const { M, ank } = _d3Kop(ctx, _D3.kopCam, { g: -1, t, clip: _d3clip });
    _d3Week(ctx, lerp(5, 4, _d3T(t, q.at('eerder'), q.at('vier') + 0.4)), ramp(t, 0, 0.5));
    metaText(ctx, 'DOORSNEDE KOP · VAN VOREN', 1840, 158, C.text2, 'right', 26);
    const c = q.on('onze', 1, 0.5); _d3Ring(ctx, ank.cel[0], ank.cel[1], 34, c * (0.6 + 0.4 * _d3puls(t, q.at('onze'), 1.6))); naamBij(ctx, 'onze cel', null, ank.cel[0] + 46, ank.cel[1] + 12, c, 'left', C.goud);
    const pe = M(_W3.rx, 230); naamBij(ctx, 'ectoderm', null, pe[0] + 4, pe[1] + 40, q.on('ectoderm', 1, 0.5), 'left');
    const ph = M(0, -_W3.ringRy); naamBij(ctx, 'hersenen', null, ph[0], ph[1] - 30, q.on('kop', 1, 0.6), 'center'); },
  s48(ctx, t, q) { bg(ctx, 'micro');
    const g = t < q.at('groeit') ? lerp(-1, 0, _d3T(t, q.at('bult'), q.at('oogblaasje') + 0.3)) : lerp(0, 1, _d3T(t, q.at('groeit'), q.at('ligt') + 0.2));
    const { M, ank } = _d3Kop(ctx, _D3.kopCam, { g, t, clip: _d3clip }); _d3Week(ctx, 4); metaText(ctx, 'DOORSNEDE KOP · VAN VOREN', 1840, 158, C.text2, 'right', 26);
    naamBij(ctx, 'onze cel', null, ank.cel[0] + 46, ank.cel[1] + 12, 1, 'left', C.goud); const pe = M(_W3.rx, 230); naamBij(ctx, 'ectoderm', null, pe[0] + 4, pe[1] + 40, 1, 'left');
    const ph = M(0, -_W3.ringRy); naamBij(ctx, 'hersenen', null, ph[0], ph[1] - 30, 1, 'center', q.on('hersenen', 1, 0.4) > 0.5 && t < q.at('bult') + 1 ? C.goud : C.text);
    const ob = q.on('oogblaasje', 1, 0.5); const Rb = g < 0 ? lerp(64, 140, ease(g + 1)) : lerp(140, 166, g), Ob = g < 0 ? lerp(150, 350, ease(g + 1)) : lerp(350, 422, g);
    for (const z of [1, -1]) { const p = M(z * Ob, Rb + 30); naamBij(ctx, 'oogblaasje', null, p[0], p[1] + 30, ob, 'center'); }
    _d3Ring(ctx, ank.cel[0], ank.cel[1], 34, q.on('Precies', 1, 0.4) * (0.6 + 0.4 * _d3puls(t, q.at('Precies'), 1.5))); },
  s49(ctx, t, q) { bg(ctx, 'micro');
    const zm = ease(t / 1.4), cam = _d3cam(_D3.kopCam, _D3.zoomCam, zm);
    const e = _d3T(t, q.at('ectoderm'), q.at('dikker') + 0.5);
    const p = t < q.at('snoert') ? 0.6 * _d3T(t, q.at('stulpt'), q.at('snoert')) : lerp(0.6, 1, _d3T(t, q.at('snoert'), q.at('bolletje') + 0.2));
    const sep = _d3T(t, q.at('bolletje') + 0.2, q.at('lensblaasje') + 0.4);
    const depth = (76 + 254 * (1 - p) ** 3) * (1 - Math.cos(Math.PI * p)); const k = Math.max(0, Math.min(0.62, (45 + depth) / 317.5 - 0.05)) * (p > 0 ? 1 : 0);
    const sig = q.on('signalen', 1, 0.6) * _d3uit(t, q.at('lensblaasje'), 0.8), sigOud = q.on('eerdere', 1, 0.6) * _d3uit(t, q.at('stulpt'), 0.8);
    const { M, ank } = _d3Kop(ctx, cam, { g: 1, k: Math.max(k, 0.62 * sep), e, p, sep, sig, sigOud, t, clip: [0, 100, lerp(1920, 1440, zm), 780] });
    _d3Week(ctx, 4, _d3uit(t, 0, 0.6));
    naamBij(ctx, 'onze cel', null, ank.cel[0] + lerp(46, -30, zm), ank.cel[1] + lerp(12, 150, zm), 1, zm > 0.5 ? 'right' : 'left', C.goud);
    const pe = M(_W3.rx, lerp(230, 0, zm)); naamBij(ctx, 'ectoderm', null, pe[0] + lerp(4, 40, zm), pe[1] + lerp(40, -150, zm), 1, 'left');
    const po = M(330, 215); naamBij(ctx, 'oogblaasje', null, po[0], Math.min(860, po[1] + 30), zm, 'center');
    if (ank.lx != null) { const pl = M(ank.lx, -76); naamBij(ctx, 'lensblaasje', null, pl[0], pl[1] - 40, q.on('lensblaasje', 1, 0.5), 'center'); }
    _d3Ring(ctx, ank.cel[0], ank.cel[1], 40, q.on('erin', 1, 0.4) * (0.6 + 0.4 * _d3puls(t, q.at('erin'), 1.5)));
    const st = [q.on('dikker', 1, 0.4), q.on('stulpt', 1, 0.4), q.on('snoert', 1, 0.4)]; st.push(t < q.at('stulpt') ? 0 : t < q.at('snoert') ? 1 : t < q.at('lensblaasje') + 0.5 ? 2 : -1);
    _d3Stadia(ctx, 1480, 470, st, zm);
    const lk = q.on('Hij', 1, 0.5); if (lk > 0.01) { ctx.save(); ctx.globalAlpha *= lk; landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], _d3T(t, q.at('Hij'), q.at('lens', 2) + 0.5)); ctx.restore(); } },
  s50(ctx, t, q) { bg(ctx, 'micro');
    const cm = ease(t / 1.2), cam = _d3cam(_D3.zoomCam, _D3.bekerCam, cm); const k = lerp(0.62, 1, _d3T(t, q.at('vouwt'), q.at('oogbeker') + 0.3));
    const { M, ank } = _d3Kop(ctx, cam, { g: 1, k, e: 1, p: 1, sep: 1, sigTerug: q.on('draagt', 1, 0.6) * _d3uit(t, q.at('oogbeker'), 0.8), t, clip: [0, 100, lerp(1440, 1920, cm), 780] });
    const ui = _d3uit(t, 0, 0.6); if (ui > 0.01) { ctx.save(); ctx.globalAlpha *= ui; landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], 1); _d3Stadia(ctx, 1480, 470, [1, 1, 1, -1]); ctx.restore(); }
    naamBij(ctx, 'onze cel', null, ank.cel[0] - lerp(30, 24, cm), ank.cel[1] + lerp(150, 12, cm), 1, 'right', C.goud);
    const po = M(330, 215); naamBij(ctx, 'oogblaasje', null, po[0], Math.min(860, po[1] + 30), _d3uit(t, q.at('vouwt'), 0.6), 'center');
    const pl = M(ank.lx, -76); const ln = q.on('lens', 2, 0.5); naamBij(ctx, 'lensblaasje', null, pl[0], pl[1] - 40, 1 - ln, 'center'); const pc = M(ank.lx, 0); naamBij(ctx, 'lens', null, pc[0] + 6, pc[1] + 12, ln, 'center');
    const pe = M(_W3.rx, 0); naamBij(ctx, 'ectoderm', null, pe[0] + 36, pe[1] + 12, 1, 'left');
    const o = ank.oog; const bk = q.on('oogbeker', 1, 0.5); const pb = M(o.Ox, 178); naamBij(ctx, 'oogbeker', null, pb[0], pb[1] + 66, bk, 'center');
    const nv = q.on('netvlies', 1, 0.5); if (o.binnen) { const pn = M(o.binnen[0], o.binnen[1]); naamBij(ctx, 'netvlies', null, pn[0], pn[1] + 12, nv, 'center', C.goud); }
    const ph = M(-_W3.ringRx, 0); naamBij(ctx, 'hersenen', null, 40, M(0, _W3.ringRy)[1] - 10, ramp(t, 0.8, 0.6), 'left'); },
  s51(ctx, t, q) { bg(ctx, 'micro');
    const f = ramp(t, 0, 0.7); if (f < 1) _d3s50eind(ctx, t);
    ctx.save(); ctx.globalAlpha *= f; bg(ctx, 'micro');
    const grijs = q.on('huid', 1, 0.8), g = lerp(0, 1, _d3T(t, q.at('groeit'), q.at('huid', 2) + 0.3));
    const { M } = _d3Kop(ctx, _D3.bekerCam, { g, grijs, goud: 0, t, clip: _d3clip });
    const ob = M(lerp(350, 422, g), 220); naamBij(ctx, 'oogblaasje', null, ob[0], ob[1] + 40, 1, 'center');
    const pe = M(_W3.rx, 0); naamBij(ctx, 'huid', null, pe[0] + 40, pe[1] - 10, q.on('huid', 1, 0.5), 'left'); naamBij(ctx, 'zonder Pax6', null, pe[0] + 40, pe[1] + 36, q.on('huid', 1, 0.5), 'left', C.text2);
    naamBij(ctx, 'hersenen', null, 40, M(0, _W3.ringRy)[1] - 10, 1, 'left');
    const mu = q.on('muizen', 1, 0.5); muis(ctx, 1560, 330, 12, { a: mu, kijk: -1 }); ctx.save(); ctx.globalAlpha *= mu; difLabel(ctx, 'MUIS · PAX6 ALLEEN IN DE HUID UITGESCHAKELD'); ctx.restore();
    const px = q.on('Pax', 1, 0.5); if (px > 0.01) tag(ctx, 'Pax6 uit in de huid', 1560, 440, C.text2, px, 'center', 32);
    ctx.restore(); },
  s52(ctx, t, q) { bg(ctx, 'micro');
    const { M } = _d3Kop(ctx, _D3.bekerCam, { g: 1, grijs: 1, goud: 0, t, clip: _d3clip });
    const ob = M(422, 220); naamBij(ctx, 'oogblaasje', null, ob[0], ob[1] + 40, 1, 'center');
    const pe = M(_W3.rx, 0); naamBij(ctx, 'huid', null, pe[0] + 40, pe[1] - 10, 1, 'left'); naamBij(ctx, 'zonder Pax6', null, pe[0] + 40, pe[1] + 36, 1, 'left', C.text2);
    naamBij(ctx, 'hersenen', null, 40, M(0, _W3.ringRy)[1] - 10, 1, 'left'); muis(ctx, 1560, 330, 12, { kijk: -1 }); difLabel(ctx, 'MUIS · PAX6 ALLEEN IN DE HUID UITGESCHAKELD'); tag(ctx, 'Pax6 uit in de huid', 1560, 440, C.text2, 1, 'center', 32);
    vraagteken(ctx, pe[0] - 120, pe[1] + 30, q.on('lens', 1, 0.4) * (0.75 + 0.25 * Math.sin(t * 4)), 120); },
  s54(ctx, t, q) { bg(ctx, 'micro');
    const sig = q.on('signaal', 1, 0.8);
    const { M } = _d3Kop(ctx, _D3.bekerCam, { g: 1, grijs: 1, goud: 0, sig, t, clip: _d3clip });
    const ob = M(422, 220); naamBij(ctx, 'oogblaasje', null, ob[0], ob[1] + 40, 1, 'center');
    const pe = M(_W3.rx, 0); const zm = q.on('huid', 1, 0.7);
    naamBij(ctx, 'huid', null, pe[0] + 40, pe[1] - 10, 1 - zm, 'left'); naamBij(ctx, 'zonder Pax6', null, pe[0] + 40, pe[1] + 36, 1 - zm, 'left', C.text2);
    naamBij(ctx, 'hersenen', null, 40, M(0, _W3.ringRy)[1] - 10, 1, 'left'); const ps = M(560, -170); naamBij(ctx, 'signaal', null, ps[0], ps[1], sig * (1 - zm), 'center', C.goud);
    ctx.save(); ctx.globalAlpha *= 1 - zm; difLabel(ctx, 'MUIS · PAX6 ALLEEN IN DE HUID UITGESCHAKELD'); ctx.restore();
    // geen lens: een stippellijn waar de lens had moeten komen, met een kruis
    const gl = q.on('geen', 1, 0.4) * _d3uit(t, q.at('signaal'), 0.6); if (gl > 0.01) { const pl = M(500, 0); ctx.save(); ctx.globalAlpha *= gl; ctx.setLineDash([12, 10]); ctx.strokeStyle = C.text2; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(pl[0], pl[1], 76 * 1.3, 0, 6.283); ctx.stroke(); ctx.restore(); kruis(ctx, pl[0], pl[1], 50, gl); }
    // inzoomen op één huidcel
    const zx = 1470, zy = 470, zr = 300; zoomCircle(ctx, zx, zy, zr, pe[0] + 6, pe[1] - 40, 'ÉÉN HUIDCEL', zm, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(zx - zr, zy - zr, 2 * zr, 2 * zr);
      _d3HuidCel(ctx, zx, zy + 40, 200, { kleur: _W3.grijs, sig: _d3T(t, q.at('huid') + 0.2, q.at('maken')) }); });
    naamBij(ctx, 'lensgenen uit', null, zx, zy + 262, q.on('maken', 1, 0.5), 'center', C.text2); },
  s55(ctx, t, q) { bg(ctx, 'micro');
    const m = ease((t - 0.1) / 0.9);
    if (m < 1) { ctx.save(); ctx.globalAlpha *= 1 - m; _d3Kop(ctx, _D3.bekerCam, { g: 1, grijs: 1, goud: 0, sig: 1, t, clip: _d3clip }); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(1470, 470, 300, 0, 6.283); ctx.stroke(); ctx.restore(); }
    const A = _d3HuidCel(ctx, lerp(1470, 450, m), lerp(510, 580, m), lerp(200, 230, m), { kleur: _W3.grijs, sig: 1 });
    const lat = q.on('voorbij', 1, 0.8), b = q.on('cel', 2, 0.6);
    const kl = _mixHex(_W3.ecto, _W3.grijs, lat * 0.8);
    const B = _d3HuidCel(ctx, 1060, 580, 230, { pax: b * (1 - 0.6 * lat), kleur: kl, sig: b, gen: q.on('genen', 1, 0.8) * (1 - q.on('dezelfde', 1, 0.8)), a: b });
    naamBij(ctx, 'zonder Pax6', null, 450, 205, m, 'center', C.text2); naamBij(ctx, 'met Pax6', null, 1060, 205, b, 'center');
    const rc = q.on('receptor', 1, 0.4); for (const [Q, al] of [[A, m], [B, b]]) { if (!Q) continue; naamBij(ctx, 'receptor', null, Q.receptor[0] + 50, Q.receptor[1] - 20, al * rc, 'left'); _d3Ring(ctx, Q.receptor[0], Q.receptor[1], 30, al * _d3puls(t, q.at('receptor'), 1.4)); }
    naamBij(ctx, 'signaal', null, A.receptor[0] - 160, A.receptor[1] - 90, _d3uit(t, q.at('Hoe'), 0.6) * m, 'right', C.goud);
    if (A) _d3Ring(ctx, A.receptor[0], A.receptor[1] - 30, 22, m * _d3puls(t, q.at('signaal') + 0.6, 1.4));
    naamBij(ctx, 'lensgenen uit', null, 450, 862, m, 'center', C.text2);
    const ga = q.on('genen', 1, 0.5); naamBij(ctx, lat > 0.5 ? 'lensgenen uit' : 'lensgenen aan', null, 1060, 862, b * ga, 'center', lat > 0.5 ? C.text2 : C.groen);
    if (B && B.pax) naamBij(ctx, 'Pax6', null, B.kern[0] - 60, B.kern[1] - 52, b * (1 - 0.6 * lat), 'center', C.goud);
    if (B) { const gl = ga * _d3puls(t, q.at('genen'), 1.4); _d3Ring(ctx, B.gen[0], B.gen[1], 40, gl, C.groen); }
    // kaart competentie + klokje
    const ka = q.on('competentie', 1, 0.6); if (ka > 0.01) { const kx = 1440, ky = 260, kw = 420, kh = 330; ctx.save(); ctx.globalAlpha *= ka; roundRect(ctx, kx, ky, kw, kh, 18); shape(ctx, rgba(C.fill, 0.85), C.goud, 2.5);
      text(ctx, 'competentie', kx + 30, ky + 74, fTitel(56), C.goud, 'left'); ['kan de cel reageren?', '· juiste receptor', '· juiste genen', '· op het juiste moment'].forEach((r, i) => text(ctx, r, kx + 30, ky + 140 + i * 48, fTekst(36, i ? 500 : 600), i === 3 && q.on('eeuwig', 1, 0.4) > 0.5 ? C.goud : C.text, 'left')); ctx.restore(); }
    _d3Klokje(ctx, 1650, 740, 70, _d3T(t, q.at('eeuwig'), q.at('voorbij') + 0.5), q.on('duurt', 1, 0.5));
    if (lat > 0.01) { ctx.save(); ctx.globalAlpha *= lat; metaText(ctx, 'LATER', 1060, 155, C.text2, 'center', 26); ctx.restore(); } },
  s56(ctx, t, q) { bg(ctx, 'micro'); difLabel(ctx, 'VEREENVOUDIGD');
    const st = { pax: q.on('Pax', 1, 0.6), eiwit: _d3T(t, q.at('maakt'), q.at('transcriptiefactor') + 0.8), reis1: _d3T(t, q.at('die'), q.at('netwerk') + 0.2), samen: q.on('samen', 1, 0.8), net1: q.on('netwerk', 1, 0.8), reis2: _d3T(t, q.at('Die', 2) - 0.1, q.at('andere', 2) + 0.3), net2: q.on('andere', 2, 0.8) };
    const N = _d3Netwerk(ctx, t, st);
    naamBij(ctx, 'Pax6-gen', null, N.pax[0] - 70, N.pax[1] - 90, st.pax, 'left', C.goud);
    naamBij(ctx, 'Pax6-eiwit', null, N.pe[0] + 50, N.pe[1] + 14, ramp(t, q.at('transcriptiefactor'), 0.5), 'left', C.goud);
    naamBij(ctx, 'transcriptiefactor', null, N.pe[0] + 50, N.pe[1] + 58, ramp(t, q.at('transcriptiefactor'), 0.5) * _d3uit(t, q.at('netwerk'), 0.6), 'left', C.text2);
    naamBij(ctx, 'samen met andere', null, N.t1[2].m[0] + 120, N.t1[2].m[1] + 70, st.samen * _d3uit(t, q.at('Die', 2), 0.6), 'left', C.teal);
    naamBij(ctx, 'genen aan', null, N.t1[0].m[0], N.t1[0].m[1] - 90, st.net1, 'center', C.groen);
    naamBij(ctx, 'en de volgende', null, N.t2[2].m[0] + 60, N.t2[2].m[1] + 80, st.net2, 'left', C.groen); },
  // ---------- 7 Mastergen en adresboek ----------
  s57(ctx, t, q) { bg(ctx, 'macro'); const x = 700, y = 470, L = 560; const f = ramp(t, 0, 0.7);
    fruitvlieg(ctx, x, y, L, { a: f }); ctx.save(); ctx.globalAlpha *= q.on('1995', 1, 0.5); difLabel(ctx, 'FRUITVLIEG · 1995'); ctx.restore();
    const ey = q.on('eyeless', 1, 0.5); tag(ctx, 'eyeless', 1420, 360, C.goud, ey, 'center', 40); naamBij(ctx, 'verwant aan Pax6', null, 1420, 430, ey, 'center', C.text2);
    const P = _d3VliegPlek(x, y, L), aan = q.on('eyeless', 2, 0.5);
    [[P.vleugel, 0], [P.poot, 1], [P.spriet, 2]].forEach(([p, i]) => { const v = clamp((t - q.at('eyeless', 2)) / 0.4 - i * 0.6, 0, 1); _d3Ring(ctx, p[0], p[1], 26, ease(v) * (0.7 + 0.3 * Math.sin(t * 4 + i))); });
    naamBij(ctx, 'eyeless aan', null, P.poot[0] + 40, P.poot[1] + 12, aan, 'left', C.goud); },
  s58(ctx, t, q) { bg(ctx, 'macro'); const x = 700, y = 470, L = 560; fruitvlieg(ctx, x, y, L, {}); difLabel(ctx, 'FRUITVLIEG · 1995');
    const P = _d3VliegPlek(x, y, L), go = (w) => _d3T(t, q.at(w) - 0.2, q.at(w) + 0.6);
    _d3Oogje(ctx, P.vleugel[0], P.vleugel[1], 12, go('vleugels')); _d3Oogje(ctx, P.poot[0], P.poot[1], 13, go('poten')); _d3Oogje(ctx, P.spriet[0], P.spriet[1], 9, go('voelsprieten'));
    naamBij(ctx, 'op de vleugel', null, P.vleugel[0] - 40, P.vleugel[1] + 12, q.on('vleugels', 1, 0.4), 'right'); naamBij(ctx, 'op de poot', null, P.poot[0] + 40, P.poot[1] + 12, q.on('poten', 1, 0.4), 'left');
    naamBij(ctx, 'op de voelspriet', null, P.spriet[0] - 30, P.spriet[1] - 10, q.on('voelsprieten', 1, 0.4), 'right');
    const zx = 1420, zy = 500, za = _d3T(t, q.at('facetogen') - 0.2, q.at('facetogen') + 0.8);
    if (za > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, za * 2); ctx.strokeStyle = C.goud; ctx.lineWidth = 1.5; const ang = Math.atan2(zy - P.poot[1], zx - P.poot[0]); for (const d of [-1, 1]) { const an = ang + d * Math.PI / 2; ctx.beginPath(); ctx.moveTo(P.poot[0], P.poot[1]); ctx.lineTo(zx + Math.cos(an) * 270 * ease(za), zy + Math.sin(an) * 270 * ease(za)); ctx.stroke(); } ctx.restore(); }
    _d3Facetten(ctx, zx, zy, 270, za, q.on('lichtgevoelige', 1, 0.6));
    naamBij(ctx, 'facetten', null, zx, zy + 270 + 52, za, 'center'); naamBij(ctx, 'extra oog op een poot', null, zx, zy - 270 - 24, za, 'center', C.goud);
    naamBij(ctx, 'lichtgevoelige cellen', null, zx + 180, zy - 150, q.on('lichtgevoelige', 1, 0.5) * _d3uit(t, q.at('Wel'), 0.6), 'left', C.goud);
    const r = q.on('weefsel', 1, 0.5); [P.vleugel, P.poot, P.spriet].forEach((p, i) => _d3Ring(ctx, p[0], p[1], 42, r * (0.6 + 0.4 * _d3puls(t, q.at('weefsel') + i * 0.2, 1.2)), C.goud, 3));
    tag(ctx, 'alleen waar het weefsel kon reageren', 700, 850, C.goud, r, 'center', 32); },
  s59(ctx, t, q) { bg(ctx, 'macro'); const x = 700, y = 470, L = 560; fruitvlieg(ctx, x, y, L, {}); difLabel(ctx, 'FRUITVLIEG · 1995');
    const P = _d3VliegPlek(x, y, L); const pu = 0.6 + 0.4 * _d3puls(t, q.at('programma'), 1.6);
    _d3Oogje(ctx, P.vleugel[0], P.vleugel[1], 12, 1, pu); _d3Oogje(ctx, P.poot[0], P.poot[1], 13, 1, pu); _d3Oogje(ctx, P.spriet[0], P.spriet[1], 9, 1, pu);
    const zu = _d3uit(t, 0.1, 0.7); _d3Facetten(ctx, 1420, 500, 270, zu, 0); tag(ctx, 'alleen waar het weefsel kon reageren', 700, 850, C.goud, zu, 'center', 32);
    const ka = ramp(t, 0.5, 0.6); if (ka > 0.01) { ctx.save(); ctx.globalAlpha *= ka; roundRect(ctx, 1200, 250, 470, 540, 20); shape(ctx, rgba(C.fill, 0.85), C.line, 2);
      text(ctx, 'één gen', 1435, 320, fTekst(36, 600), C.text, 'center'); _d3Cascade(ctx, 1435, 380, _d3T(t, q.at('programma') - 0.3, q.at('brengen') + 0.4), 1);
      metaText(ctx, 'EEN HEEL PROGRAMMA', 1435, 610, C.text2, 'center', 26); ctx.restore(); }
    const mg = q.on('mastergen', 1, 0.5); if (mg > 0.01) { ctx.save(); ctx.globalAlpha *= mg; text(ctx, 'mastergen', 1435, 710, fTitel(64), C.goud, 'center'); ctx.restore(); }
    naamBij(ctx, 'eyeless', null, P.poot[0] + 40, P.poot[1] + 12, 1 - ka, 'left', C.goud); },
  s60(ctx, t, q) { bg(ctx, 'schema');
    const T0 = q.at('eerste') - 0.1, T1 = q.at('achteraan') + 0.3, Ti = i => lerp(T0, T1, i / 7);
    const aanI = i => _d3T(t, Ti(i), Ti(i) + 0.5), aan = p => aanI(_D3P2I[p]);
    const hox = q.on('Hox', 1, 0.6), rij = _d3T(t, q.at('rij') - 0.3, q.at('chromosoom') + 0.2);
    ctx.save(); ctx.globalAlpha *= hox; metaText(ctx, 'HOX-GENEN OP EEN CHROMOSOOM · FRUITVLIEG', 160, 190, C.text2, 'left', 26); ctx.restore();
    _d3HoxRij(ctx, 220, 290, 1480, _D3VLIEG, { h: 60, px: 30, chrom: q.on('chromosoom', 1, 0.5), pop: i => clamp(hox * (rij * 8 - i + 1), 0, 1) * (rij > 0 ? 1 : 0), kleur: () => 1, ring: i => _d3puls(t, Ti(i), 1.0) });
    const vo = q.on('volgorde', 1, 0.6); ctx.save(); ctx.globalAlpha *= vo; metaText(ctx, 'VOORAAN', 220, 370, C.text2, 'left', 26); metaText(ctx, 'ACHTERAAN', 1700, 370, C.text2, 'right', 26); ctx.restore();
    pijl(ctx, 400, 362, lerp(400, 1480, vo), 362, rgba(C.line, 0.8), vo, 3, 14);
    const V = _d3VliegZij(ctx, 980, 660, 820, aan);
    const pt = q.on('poot', 1, 0.4) * _d3uit(t, q.at('Hox'), 0.6), sp = q.on('voelspriet', 1, 0.4) * _d3uit(t, q.at('Hox'), 0.6);
    _d3Ring(ctx, V.poot[1][0], V.poot[1][1], 50, pt); naamBij(ctx, 'poot', null, V.poot[1][0] + 60, V.poot[1][1] + 12, pt, 'left');
    _d3Ring(ctx, V.spriet[0], V.spriet[1], 50, sp); naamBij(ctx, 'voelspriet', null, V.spriet[0] - 60, V.spriet[1] - 30, sp, 'right');
    naamBij(ctx, 'kop', null, 540, 858, aanI(0), 'center'); naamBij(ctx, 'borststuk', null, 830, 858, aanI(3), 'center'); naamBij(ctx, 'achterlijf', null, 1200, 858, aanI(6), 'center'); },
  s61(ctx, t, q) { bg(ctx, 'schema');
    const m = _d3T(t, q.at('jou') - 0.3, q.at('jou') + 0.9);
    const rx = lerp(220, 120, m), ry = lerp(290, 260, m), rw = lerp(1480, 640, m), rh = lerp(60, 40, m);
    const fx = lerp(980, 470, m), fy = lerp(660, 560, m), fL = lerp(820, 560, m);
    ctx.save(); ctx.globalAlpha *= 1 - m; metaText(ctx, 'HOX-GENEN OP EEN CHROMOSOOM · FRUITVLIEG', 160, 190, C.text2, 'left', 26); metaText(ctx, 'VOORAAN', 220, 370, C.text2, 'left', 26); metaText(ctx, 'ACHTERAAN', 1700, 370, C.text2, 'right', 26); ctx.restore();
    ctx.save(); ctx.globalAlpha *= m; metaText(ctx, 'FRUITVLIEG', 100, 180, C.text2, 'left', 26); ctx.restore();
    // elke strook om de beurt, daarna blijft het borststuk (Antp) uitgelicht
    const s0 = q.at('strook') - 0.2, s1 = q.at('combinatie') + 0.4, nS = 8; let actief = -1;
    if (t >= s0 && t < s1) actief = Math.min(nS - 1, Math.floor((t - s0) / (s1 - s0) * nS)); else if (t >= s1 && t < q.at('jou') - 0.3) actief = 4;
    _d3HoxRij(ctx, rx, ry, rw, _D3VLIEG, { h: rh, px: 30, namen: m < 0.5, ring: i => (i === actief ? 1 : 0) * (1 - m) });
    const V = _d3VliegZij(ctx, fx, fy, fL, () => 1);
    if (actief >= 0 && m < 1) { const pg = _D3VLIEG[actief][1]; const S = V.strook.filter(sv => sv[2] === pg); if (S.length) { const x0 = Math.min(...S.map(sv => sv[0])), x1 = Math.max(...S.map(sv => sv[1])); ctx.save(); ctx.globalAlpha *= 1 - m; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, x0, V.top - 20, x1 - x0, V.bodem - V.top + 40, 10); ctx.stroke(); ctx.restore();
      tag(ctx, 'adres', (x0 + x1) / 2, V.top - 40, C.goud, q.on('adres', 1, 0.4) * (1 - m) * (actief === 4 ? 1 : 0), 'center', 34); } }
    ctx.save(); ctx.globalAlpha *= 1 - m; naamBij(ctx, 'kop', null, 540, 858, 1, 'center'); naamBij(ctx, 'borststuk', null, 830, 858, 1, 'center'); naamBij(ctx, 'achterlijf', null, 1200, 858, 1, 'center'); ctx.restore();
    // mens: vier rijen, daarna embryo met stroken van hersenstam tot staartstreek
    const vier = q.on('vier', 1, 0.5); const pmax = lerp(0, 13.99, _d3T(t, q.at('hersenstam') - 0.2, q.at('staartstreek') + 0.4));
    ctx.save(); ctx.globalAlpha *= vier; metaText(ctx, 'MENS · VIER RIJEN', 1000, 180, C.text2, 'left', 26); ctx.restore();
    Object.entries(_D3MENS).forEach(([nm, gs], i) => { const a = clamp((t - q.at('vier')) / 0.4 - i * 0.5, 0, 1); if (a <= 0.01) return; const y = 240 + i * 62; const g = []; for (let p = 1; p <= 13; p++) g.push(gs.includes(p) ? [null, p] : null);
      ctx.save(); ctx.globalAlpha *= a; _d3HoxRij(ctx, 1150, y, 700, g, { h: 38, namen: false, kleur: j => (j + 1 <= pmax ? 1 : 0.15) }); metaText(ctx, nm, 1100, y + 10, C.text2, 'right', 26); ctx.restore(); });
    ctx.save(); ctx.globalAlpha *= vier; metaText(ctx, '1', 1150 + 700 / 26, 210, C.text2, 'center', 26); metaText(ctx, '13', 1850 - 700 / 26, 210, C.text2, 'center', 26); ctx.restore();
    const ea = ramp(t, q.at('hersenstam') - 1.0, 0.7); if (ea > 0.01) { ctx.save(); ctx.globalAlpha *= ea; const ex = 1400, ey = 650, es = 0.78; const r = embryoEcht(ctx, ex, ey, es, {});
      const F = _embAVorm(); ctx.save(); ctx.translate(ex, ey); ctx.scale(es, es); ctx.beginPath(); bioPad(ctx, F.lijf, true); ctx.clip();
      const rug = [[84, -150], [108, -118], [138, -60], [148, 0], [146, 56], [130, 108], [100, 150], [66, 178], [44, 194], [20, 214]];
      const RP = bioDicht(rug, 30), N = RP.length; ctx.lineCap = 'butt';
      for (let p = 1; p <= 13; p++) { const v = clamp(pmax - p + 1, 0, 1); if (v <= 0.01) continue; const i0 = Math.floor((p - 1) / 13 * (N - 1)), i1 = Math.floor(p / 13 * (N - 1)); ctx.strokeStyle = rgba(_w3Hox(p), 0.75 * v); ctx.lineWidth = 120; ctx.beginPath(); for (let i = i0; i <= i1; i++) i === i0 ? ctx.moveTo(RP[i][0], RP[i][1]) : ctx.lineTo(RP[i][0], RP[i][1]); ctx.stroke(); }
      ctx.restore(); const sv = clamp(pmax - 12.5, 0, 1); if (sv > 0.01) { ctx.save(); ctx.translate(ex, ey); ctx.scale(es, es); ctx.strokeStyle = rgba(_w3Hox(13), 0.75 * sv); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, F.staart.slice(1), false); ctx.stroke(); ctx.restore(); }
      const hs = r.achterhersenen; naamBij(ctx, 'hersenstam', null, hs[0] + 70, hs[1] - 10, q.on('hersenstam', 1, 0.4), 'left'); naamBij(ctx, 'staartstreek', null, r.staart[0] + 70, Math.min(860, r.staart[1] + 20), q.on('staartstreek', 1, 0.4), 'left');
      metaText(ctx, 'MENSELIJK EMBRYO ± 5 WEKEN', 880, 862, C.text2, 'left', 26); ctx.restore(); } },
  s62(ctx, t, q) { bg(ctx, 'schema'); const T = _w3Hox(6), x = 760, y = 400, s = 0.85;
    const f = ramp(t, 0, 0.6), ta = _d3T(t, q.at('voelsprieten') - 0.3, q.at('voelsprieten') + 0.7);
    ctx.save(); ctx.globalAlpha *= f; ctx.beginPath(); ctx.ellipse(x, y + 274, 206, 123, 0, 0, 6.283); shape(ctx, ERFK.vlieg.grijs, ERFK.vlieg.grijsD, 2.5); ctx.beginPath(); ctx.ellipse(x, y + 274, 206, 123, 0, 0, 6.283); ctx.fillStyle = rgba(T, 0.75 * q.on('Hox', 1, 0.6)); ctx.fill(); ctx.restore();
    _d3VliegKop(ctx, x, y, s, { tint: T, tintA: ta, a: f });
    ctx.save(); ctx.globalAlpha *= f; metaText(ctx, 'KOP VAN VOREN', x, y - 0.85 * 200 - 20, C.text2, 'center', 26); ctx.restore();
    naamBij(ctx, 'borststrook', null, x + 230, y + 290, q.on('Hox', 1, 0.6), 'left', C.text2);
    const hx = q.on('Hox', 1, 0.6); const mid = _d3HoxRij(ctx, 1220, 300, 580, _D3VLIEG, { h: 40, namen: false, chrom: hx, pop: () => hx, ring: i => (i === 4 ? q.on('aan', 1, 0.4) : 0) });
    ctx.save(); ctx.globalAlpha *= hx; metaText(ctx, 'HOX-GEN VAN HET BORSTSTUK', 1220 - 40, 250, C.text2, 'left', 26); ctx.restore();
    const pa = q.on('plek', 1, 0.5); pijl(ctx, mid[4], 330, lerp(mid[4], x + 120, pa), lerp(330, y + 20, pa), C.goud, pa, 4, 16);
    naamBij(ctx, 'plek van de voelsprieten', null, x, y + 0.85 * 120 + 40, ta * _d3uit(t, q.at('Wat', 2), 0.6), 'center', C.text);
    vraagteken(ctx, x, y + 150, q.on('groeit', 1, 0.4) * (0.8 + 0.2 * Math.sin(t * 4)), 120); },
  s64(ctx, t, q) { bg(ctx, 'macro');
    const m = _d3T(t, 0, 1.0), x = lerp(760, 1380, m), y = lerp(400, 430, m), s = lerp(0.85, 0.95, m), g = _d3T(t, q.at('poten') - 0.2, q.at('kop') + 0.6);
    ctx.save(); ctx.globalAlpha *= 1 - m; ctx.beginPath(); ctx.ellipse(760, 674, 206, 123, 0, 0, 6.283); shape(ctx, ERFK.vlieg.grijs, ERFK.vlieg.grijsD, 2.5); ctx.restore();
    const lf = q.on('mutatie', 1, 0.6); _d3VliegKop(ctx, 520, 430, 0.95, { a: lf });
    const b = _d3VliegKop(ctx, x, y, s, { g, tint: _w3Hox(6), tintA: 1 - m });
    ctx.save(); ctx.globalAlpha *= lf; difLabel(ctx, 'FRUITVLIEG · KOP VAN VOREN'); ctx.restore();
    naamBij(ctx, 'normaal', null, 520, 200, lf, 'center'); naamBij(ctx, 'Antennapedia', null, 1380, 200, q.on('Antennapedia', 1, 0.5), 'center', C.goud);
    naamBij(ctx, 'voelsprieten', null, 520, 700, q.on('onderdeel', 1, 0.5), 'center');
    const pl = q.on('poten', 1, 0.5); naamBij(ctx, 'poten', null, 1380 + 230, 760, pl, 'left');
    const po = q.on('plek', 1, 0.4); if (b.poot1) { _d3Ring(ctx, 1380 + 34 * 0.95, 436, 46, po * _d3puls(t, q.at('plek'), 1.6)); _d3Ring(ctx, 1380 - 34 * 0.95, 436, 46, po * _d3puls(t, q.at('plek'), 1.6)); }
    _d3Ring(ctx, 520 - 46, 430 + 76, 60, po * _d3puls(t, q.at('ander'), 1.6)); _d3Ring(ctx, 520 + 46, 430 + 76, 60, po * _d3puls(t, q.at('ander'), 1.6));
    tag(ctx, 'homeotische mutatie', 960, 840, C.goud, q.on('homeotische', 1, 0.5), 'center', 38); },
  s65(ctx, t, q) { bg(ctx, 'schema');
    const fA = _d3uit(t, q.at('Positie') - 0.4, 0.6);
    if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA * ramp(t, 0, 0.6);
      metaText(ctx, 'HOX-GENEN · FRUITVLIEG', 360, 220, C.text2, 'left', 26);
      const sch = _d3T(t, q.at('schakelaars') - 0.6, q.at('schakelaars') + 0.9); const mid = _d3HoxRij(ctx, 360, 300, 1200, _D3VLIEG, { h: 56, px: 28 });
      mid.forEach((mx, i) => _d3Schakel(ctx, mx, 380, clamp(sch * 8 - i, 0, 1), q.on('volgorde', 1, 0.5)));
      const vl = _d3VliegZij(ctx, 960, 650, 520, () => 1, 0.9);
      const tk = q.on('tekening', 1, 0.4); pijl(ctx, 960, 420, 960, 520, rgba(C.line, 0.9), tk, 4, 16); kruis(ctx, 960, 470, 34, tk);
      naamBij(ctx, 'geen tekening', null, 1010, 482, tk, 'left', C.koraal);
      ctx.restore(); }
    const T = ['positie', 'signaal', 'genen aan', 'volgende genen'], cue = [['Positie', 1], ['signalen', 1], ['genen', 2], ['volgende', 1]]; const tw = 300, gap = 76, x0 = 140, y0 = 150;
    T.forEach((s, i) => { const v = q.on(cue[i][0], cue[i][1], 0.5); if (v <= 0.01) return; const x = x0 + i * (tw + gap); ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x, y0, tw, 100, 16); shape(ctx, rgba(C.fill, 0.8), i === 0 ? C.goud : C.line, 2.5);
      text(ctx, s, x + tw / 2, y0 + 63, fTekst(38, 700), C.text, 'center'); ctx.restore(); if (i < 3) { const w2 = q.on(cue[i + 1][0], cue[i + 1][1], 0.5); pijl(ctx, x + tw + 10, y0 + 50, x + tw + 10 + (gap - 20) * w2, y0 + 50, C.goud, w2, 5, 16); } });
    const vm = q.on('vorm', 1, 0.6); if (vm > 0.01) { ctx.save(); ctx.globalAlpha *= vm; landschap(ctx, 220, 420, 1080, 380, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikker: _d3T(t, q.at('vorm'), q.at('volgorde', 2) + 0.5) }); ctx.restore();
      ctx.save(); ctx.globalAlpha *= q.on('volgt', 1, 0.5); antwoordTegels(ctx, 1540, 330, 3, q.on('volgorde', 2, 0.4) > 0.5 ? 2 : -1); ctx.restore(); } },
});
