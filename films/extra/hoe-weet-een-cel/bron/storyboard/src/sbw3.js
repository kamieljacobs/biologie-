// sbw3.js — storyboard 'Hoe weet een cel wat hij moet worden?', tekenaar 3: scènes w32–w44 (hoofdstuk 6 en 7)
// Nieuwe objecten (eerste voorstel):
//  _w3Doorsnede  dwarsdoorsnede kop week 4–5: oogblaasje → lensplaatje → lenskuiltje → lensblaasje + oogbeker
//                (Langman/Moore: oogblaasje = uitstulping van de tussenhersenen, holte via oogsteel verbonden met de ventrikel;
//                 lensplaatje = verdikt oppervlakte-ectoderm; oogbeker dubbelwandig: dunne buitenwand = pigmentlaag,
//                 dikke binnenwand = netvlies; lensblaasje snoert af van het ectoderm, achterwand dikker)
//  _w3HuidCel    huidcel met receptor in het membraan en lensgenen in de kern (uit / aan met Pax6)
//  _w3VliegZij   fruitvlieg van opzij met Hox-kleurstroken per segment (kop: lab, pb, Dfd; T1 Scr, T2 Antp, T3 Ubx; A1 Ubx, A2–4 abd-A, A5–8 Abd-B)
//  _w3VliegKop   fruitvliegkop van voren, normaal (voelspriet met arista) of Antennapedia (middenpoot op de plek van de voelspriet)
//  _w3HoxRij     genblokjes op een chromosoom; kleur volgt de paraloge groep (1–13), zelfde schaal bij vlieg en mens

const _W3H6 = '6 EEN BERICHT VOOR ONZE CEL', _W3H7 = '7 MASTERGEN EN ADRESBOEK';
const _W3 = { rx: 620, ry: 470, ringRx: 110, ringRy: 230, stalk: 58,
  neur: C.teal, ecto: '#9CCBE0', grijs: '#7E8798', lumen: '#0E141F', weefsel: '#1C2534' };

function _w3Bg(ctx, kleur) { ctx.fillStyle = kleur; ctx.fillRect(0, 0, W, H); }
function _w3Label(ctx, s, x, y, col = C.text, al = 'left', px = 36) { text(ctx, s, x, y, fTekst(px, 600), col, al); }

// tijdbalk rechtsboven: week 1..8, gouden stip op week w
function _w3Week(ctx, w) { const x0 = 1430, x1 = 1840, y = 108; ctx.save();
  ctx.strokeStyle = rgba(C.line, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  for (let i = 1; i <= 8; i++) { const x = lerp(x0, x1, (i - 1) / 7); ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke(); }
  const xw = lerp(x0, x1, (w - 1) / 7); circ(ctx, xw, y, 11, C.goud); metaText(ctx, 'WEEK ' + w, x1, 74, C.goud, 'right', 26); ctx.restore(); }

// ---------- paden ----------
// dicht pad [[x,y,dikte]] → gelijk verdeelde punten met normaal
function _w3Res(P, step, closed) { const Q = closed ? P.concat([P[0]]) : P; const L = [0];
  for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1]));
  const tot = L[L.length - 1], n = Math.max(2, Math.round(tot / step)), out = []; let j = 1;
  for (let k = 0; k <= n; k++) { const d = k / n * tot; while (j < Q.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]);
    const a = Q[j - 1], b = Q[j], an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    out.push({ x: lerp(a[0], b[0], f), y: lerp(a[1], b[1], f), th: lerp(a[2], b[2], f), nx: -Math.sin(an), ny: Math.cos(an), s: d, an }); }
  if (closed) out.pop(); return out; }

// epitheel langs een pad: band met celgrenzen en (gerekte) kernen. o.col, o.rand, o.cel (celbreedte), o.closed
function _w3Epi(ctx, P, o = {}) { const { col = _W3.neur, rand = null, cel = 22, closed = false, a = 1, kern = true } = o; if (a <= 0.01) return [];
  const D = _w3Res(P, 3, closed); const Lp = D.map(p => [p.x + p.nx * p.th / 2, p.y + p.ny * p.th / 2]), Rp = D.map(p => [p.x - p.nx * p.th / 2, p.y - p.ny * p.th / 2]);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); if (closed) { Lp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); Rp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = _mixHex(col, '#121A26', 0.45); ctx.fill('evenodd'); }
  else { Lp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = Rp.length - 1; i >= 0; i--) ctx.lineTo(Rp[i][0], Rp[i][1]); ctx.closePath(); ctx.fillStyle = _mixHex(col, '#121A26', 0.45); ctx.fill(); }
  // celgrenzen
  const stap = Math.max(1, Math.round(cel / 3)); ctx.strokeStyle = rgba(_mixHex(col, '#121A26', 0.15), 0.8); ctx.lineWidth = 1.6;
  for (let i = 0; i < D.length; i += stap) { ctx.beginPath(); ctx.moveTo(Lp[i][0], Lp[i][1]); ctx.lineTo(Rp[i][0], Rp[i][1]); ctx.stroke(); }
  // kernen (gerekt langs de normaal; bij dik epitheel om en om hoger en lager: meerrijig)
  if (kern) for (let i = Math.floor(stap / 2), q = 0; i < D.length; i += stap, q++) { const p = D[i], hk = Math.min(p.th * 0.3, 16), wk = Math.min(cel * 0.28, 7.5), off = p.th > 34 ? (q % 2 ? 1 : -1) * p.th * 0.18 : 0;
    ctx.save(); ctx.translate(p.x + p.nx * off, p.y + p.ny * off); ctx.rotate(p.an); ctx.beginPath(); ctx.ellipse(0, 0, wk, hk, 0, 0, 6.283); ctx.fillStyle = rgba(C.kernR, 0.8); ctx.fill(); ctx.restore(); }
  // randen
  ctx.strokeStyle = rand || lighten(col, 0.15); ctx.lineWidth = 2.4;
  for (const E of [Lp, Rp]) { ctx.beginPath(); E.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); if (closed) ctx.closePath(); ctx.stroke(); }
  ctx.restore(); return D; }

// gevulde vorm uit een pad
function _w3Vul(ctx, P, fill) { ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }

// ectoderm (oppervlakte) als gesloten ellips; st: 0 dun, 1 lensplaatje, 2 lenskuiltje, 3 weer dun (lensblaasje los)
function _w3EctoPad(st) { const P = [], N = 260;
  for (let i = 0; i < N; i++) { const th = -Math.PI + 6.2832 * i / N; let x = _W3.rx * Math.cos(th), y = _W3.ry * Math.sin(th);
    const d = Math.min(Math.abs(th), Math.PI - Math.abs(th)), w0 = st === 2 ? 0.36 : 0.26, b = d < w0 ? Math.cos(d / w0 * Math.PI / 2) ** 2 : 0;
    let dik = 22; if (st === 1) dik = 22 + 34 * Math.min(1, b * 1.6); if (st === 2) dik = 22 + 28 * Math.min(1, b * 1.6);
    if (st === 2) { const r = Math.hypot(x, y), k = (r - 105 * b) / r; x *= k; y *= k; }
    P.push([x, y, dik]); }
  return P; }

// oogblaasje (st 0: nog los, 1: tegen het ectoderm) — pad: oogsteel boven → bol → oogsteel onder
function _w3BlaasjePad(st) { const Ox = st === 0 ? 350 : 422, R = st === 0 ? 140 : 166, hs = _W3.stalk, a = Math.asin(hs / R), P = [];
  for (let x = 100; x < Ox - R * Math.cos(a); x += 6) P.push([x, -hs, 30]);
  for (let i = 0; i <= 120; i++) { const th = -Math.PI + a + (2 * Math.PI - 2 * a) * i / 120; const dist = st === 1 && Math.abs(th) < 0.7 ? 44 : 34;
    let x = Ox + R * Math.cos(th), y = R * Math.sin(th); if (st === 1 && Math.abs(th) < 0.75) x = Math.min(x, Ox + R * 0.985); P.push([x, y, dist]); }
  for (let x = Ox - R * Math.cos(a); x >= 100; x -= 6) P.push([x, hs, 30]);
  return P; }

// oogbeker: oogsteel → buitenwand (pigmentlaag, dun) → omslagrand → binnenwand (netvlies, dik) → rand → buitenwand → oogsteel
function _w3BekerPad(k) { // k 0 = ondiep (lenskuiltje), 1 = diepe beker (lensblaasje)
  const Ox = lerp(430, 400, k), Ro = lerp(178, 178, k), Ri = lerp(136, 132, k), rho = lerp(1.25, 0.86, k), hs = _W3.stalk, b = Math.asin(hs / Ro), P = [];
  const tO = lerp(22, 16, k), tI = lerp(44, 52, k), Rm = (Ro + Ri) / 2, rr = (Ro - Ri) / 2;
  const pol = (R, th) => [Ox + R * Math.cos(th), R * Math.sin(th)];
  for (let x = 100; x < Ox - Ro * Math.cos(b); x += 6) P.push([x, -hs, 30]);
  for (let i = 0; i <= 40; i++) { const th = lerp(-Math.PI + b, -rho, i / 40); P.push([...pol(Ro, th), lerp(26, tO, Math.min(1, i / 8))]); }
  for (let i = 1; i < 14; i++) { const f = i / 14 * Math.PI, ux = Math.cos(-rho), uy = Math.sin(-rho), tx = -uy, ty = ux; P.push([Ox + (Rm + rr * Math.cos(f)) * ux + rr * Math.sin(f) * tx, (Rm + rr * Math.cos(f)) * uy + rr * Math.sin(f) * ty, lerp(tO, tI * 0.6, i / 14)]); }
  for (let i = 0; i <= 90; i++) { const th = lerp(-rho, -2 * Math.PI + rho, i / 90), rimD = Math.min(i, 90 - i) / 10; P.push([...pol(Ri, th), lerp(tI * 0.6, tI, Math.min(1, rimD))]); }
  for (let i = 1; i < 14; i++) { const f = Math.PI - i / 14 * Math.PI, ux = Math.cos(rho), uy = Math.sin(rho), tx = uy, ty = -ux; P.push([Ox + (Rm + rr * Math.cos(f)) * ux + rr * Math.sin(f) * tx, (Rm + rr * Math.cos(f)) * uy + rr * Math.sin(f) * ty, lerp(tI * 0.6, tO, i / 14)]); }
  for (let i = 0; i <= 40; i++) { const th = lerp(rho, Math.PI - b, i / 40); P.push([...pol(Ro, th), lerp(tO, 26, Math.max(0, (i - 32) / 8))]); }
  for (let x = Ox - Ro * Math.cos(b); x >= 100; x -= 6) P.push([x, hs, 30]);
  return { P, Ox, Ro, Ri, rho }; }

function _w3LensPad(cx, r) { const P = []; for (let i = 0; i < 120; i++) { const th = i / 120 * 6.2832; P.push([cx + r * Math.cos(th), r * Math.sin(th), 26 + 20 * (1 - Math.cos(th)) / 2]); } return P; }

// gouden cel in een epitheel: afgerond vierkantje gedraaid langs het epitheel
function _w3GoudCel(ctx, x, y, an, w, h) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); roundRect(ctx, -w / 2, -h / 2, w, h, Math.min(w, h) * 0.3);
  ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, w * 0.22, h * 0.26, 0, 0, 6.283); ctx.fillStyle = rgba(C.paars, 0.9); ctx.fill(); ctx.restore(); }

function _w3Signaal(ctx, x0, x1, ys, r = 6, n = 14, seed = 2) { ctx.save(); for (let i = 0; i < n; i++) { const u = hash(i * 7 + seed), v = hash(i * 13 + seed * 3);
  circ(ctx, lerp(x0, x1, u), lerp(-ys, ys, v), r, C.goud); } ctx.restore(); }

// Doorsnede van de kop (side-coördinaten: midden tussenhersenen = 0,0; oog rechts). o.st 0..3, o.heel (beide kanten), o.huid ('grijs'),
// o.signaal 0..1, o.goud (onze cel), o.k (diepte beker bij st ≥ 2). Geeft een functie M(x,y) → scherm terug en ankers.
function _w3Doorsnede(ctx, X, Y, s, o = {}) {
  const { st = 0, heel = false, huid = null, signaal = 0, goud = true, clip = null } = o; const M = (x, y) => [X + x * s, Y + y * s]; const ank = {};
  ctx.save(); if (clip) { ctx.beginPath(); ctx.rect(...clip); ctx.clip(); }
  ctx.translate(X, Y); ctx.scale(s, s);
  // kop: weefsel (mesenchym) binnen het ectoderm
  ctx.beginPath(); ctx.ellipse(0, 0, _W3.rx, _W3.ry, 0, 0, 6.283); ctx.fillStyle = _W3.weefsel; ctx.fill();
  for (let i = 0; i < 260; i++) { const an = hash(i * 3.1) * 6.283, rr = Math.sqrt(hash(i * 5.7 + 1)), x = Math.cos(an) * rr * (_W3.rx - 40), y = Math.sin(an) * rr * (_W3.ry - 40);
    if (!heel && x < -200) continue; ctx.save(); ctx.translate(x, y); ctx.rotate(hash(i) * 3); ctx.strokeStyle = rgba(C.koraal, 0.22); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(9, 0); ctx.moveTo(0, -6); ctx.lineTo(0, 6); ctx.stroke(); circ(ctx, 0, 0, 3.5, rgba(C.koraal, 0.35)); ctx.restore(); }
  // ventrikel (holte) tussenhersenen
  const zijden = heel ? [1, -1] : [1];
  ctx.beginPath(); ctx.ellipse(0, 0, _W3.ringRx, _W3.ringRy, 0, 0, 6.283); ctx.fillStyle = _W3.lumen; ctx.fill();
  let oogPad = null, beker = null;
  for (const z of zijden) { ctx.save(); ctx.scale(z, 1);
    if (st <= 1) { oogPad = _w3BlaasjePad(st); _w3Vul(ctx, oogPad.concat([[100, -_W3.stalk, 0]]), _W3.lumen); }
    else { beker = _w3BekerPad(st === 2 ? 0 : (o.k == null ? 1 : o.k)); oogPad = beker.P; ctx.save(); _w3Vul(ctx, oogPad, _W3.lumen); ctx.restore(); }
    ctx.restore(); }
  // wand tussenhersenen: twee bogen (open waar de oogstelen beginnen)
  const a0 = Math.asin(_W3.stalk / _W3.ringRy) + 0.04;
  const boog = (t0, t1) => { const P = []; for (let i = 0; i <= 60; i++) { const th = lerp(t0, t1, i / 60); P.push([_W3.ringRx * Math.cos(th), _W3.ringRy * Math.sin(th), 42]); } return P; };
  if (heel) { _w3Epi(ctx, boog(a0, Math.PI - a0), { col: _W3.neur }); _w3Epi(ctx, boog(Math.PI + a0, 2 * Math.PI - a0), { col: _W3.neur }); }
  else { _w3Epi(ctx, boog(a0, Math.PI * 1.5), { col: _W3.neur }); _w3Epi(ctx, boog(-Math.PI * 0.5, -a0), { col: _W3.neur }); }
  // oogblaasje / oogbeker
  for (const z of zijden) { ctx.save(); ctx.scale(z, 1); _w3Epi(ctx, oogPad, { col: _W3.neur, cel: 20 }); ctx.restore(); }
  // ectoderm
  const ec = huid === 'grijs' ? _W3.grijs : _W3.ecto; const stE = huid === 'grijs' ? 0 : st;
  const ecD = _w3Epi(ctx, _w3EctoPad(stE), { col: ec, closed: true, cel: 22 });
  // lensblaasje
  let lensD = null; const lensX = beker ? beker.Ox + 62 : 0;
  if (st === 3) for (const z of zijden) { ctx.save(); ctx.scale(z, 1); ctx.beginPath(); ctx.arc(lensX, 0, 76, 0, 6.283); ctx.fillStyle = _W3.lumen; ctx.fill(); const d = _w3Epi(ctx, _w3LensPad(lensX, 76), { col: _W3.ecto, closed: true, cel: 18 }); if (z === 1) lensD = d; ctx.restore(); }
  // signaalstofjes
  if (signaal > 0.01) { ctx.save(); ctx.globalAlpha *= signaal; const x0 = st === 0 ? 510 : 585, x1 = st === 0 ? 590 : 612; for (const z of zijden) { ctx.save(); ctx.scale(z, 1); _w3Signaal(ctx, st >= 2 ? 520 : x0 - 10, st >= 2 ? 560 : x1 + 10, 110, 6.5, 12, 3); ctx.restore(); } ctx.restore(); }
  // onze cel
  if (goud) { if (st === 3 && lensD) { const p = lensD[Math.round(lensD.length / 2)]; _w3GoudCel(ctx, p.x, p.y, p.an, 22, p.th + 4); ank.cel = M(p.x, p.y); }
    else { const p = ecD.filter(q => q.x > 0).reduce((b, q) => Math.abs(q.y) < Math.abs(b.y) ? q : b); _w3GoudCel(ctx, p.x, p.y, p.an, 22, p.th + 4); ank.cel = M(p.x, p.y); } }
  ctx.restore();
  ank.lensX = lensX; ank.beker = beker; return { M, ank }; }

// ---------- eiwit als kluwen van kralen ----------
function _w3Kluwen(ctx, x, y, r, col, seed = 1, n = 11) { const P = []; for (let i = 0; i < n; i++) { const an = i * 2.3 + seed, rr = r * (0.35 + 0.65 * hash(i + seed * 9)); P.push([x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.8]); }
  _kkPad(ctx, P, Math.max(4, r * 0.24), col, { stap: 1.7 }); }

// gen als gekleurd stuk over een DNA-pad
function _w3GenOp(ctx, D, u0, u1, col, a = 1, lw = 24) { const i0 = Math.round(u0 * (D.length - 1)), i1 = Math.round(u1 * (D.length - 1)); ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'butt'; ctx.lineJoin = 'round';
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = i0; i <= i1; i++) i === i0 ? ctx.moveTo(D[i][0], D[i][1]) : ctx.lineTo(D[i][0], D[i][1]); ctx.stroke(); ctx.restore();
  const m = D[Math.round((i0 + i1) / 2)]; return m; }

// ---------- huidcel met receptor en lensgenen ----------
function _w3HuidCel(ctx, x, y, r, o = {}) { const { pax = false, kleur = _W3.ecto } = o;
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(kleur, 0.12); ctx.fill(); ctx.restore();
  const m = membraanBoog(ctx, x, y, r, 0, 6.283, { s: 0.55, eiwitten: [{ an: -Math.PI / 2, soort: 'eiwit' }], eiwitCol: C.teal, kop: kleur });
  // signaal: één stofje op de receptor, een paar erboven
  const rp = m.eiwit[0]; circ(ctx, rp[0], rp[1] - 50, 10, C.goud); circ(ctx, rp[0] - 80, rp[1] - 70, 9, C.goud); circ(ctx, rp[0] - 140, rp[1] - 40, 9, C.goud); circ(ctx, rp[0] - 40, rp[1] - 100, 9, C.goud);
  // kern
  const kx = x, ky = y + r * 0.12, kr = r * 0.55; ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.35); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.arc(kx, ky, kr - 7, 0, 6.283); ctx.strokeStyle = rgba(C.kernR, 0.6); ctx.lineWidth = 1.5; ctx.stroke();
  const P = []; for (let i = 0; i <= 8; i++) { const u = i / 8; P.push([kx - kr * 0.8 + u * kr * 1.6, ky + Math.sin(u * 6.28 * 1.2 + 0.4) * kr * 0.22]); }
  dnaDraad(ctx, P, { w: 9 }); const D = bioDicht(P, 20);
  const g1 = _w3GenOp(ctx, D, 0.42, 0.62, pax ? C.groen : rgba(C.text2, 0.55), 1, 22), g2 = _w3GenOp(ctx, D, 0.72, 0.9, pax ? C.groen : rgba(C.text2, 0.55), 1, 22);
  if (pax) { const pp = D[Math.round(0.34 * (D.length - 1))]; _w3Kluwen(ctx, pp[0], pp[1] - 18, 26, C.goud, 2, 10);
    // mRNA-sliertjes van de lensgenen
    for (const g of [g1, g2]) { ctx.save(); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(g[0], g[1] + 14); ctx.bezierCurveTo(g[0] - 12, g[1] + 40, g[0] + 18, g[1] + 55, g[0] + 4, g[1] + 78); ctx.stroke(); ctx.restore(); } }
  return { receptor: rp, kern: [kx, ky, kr], gen: g1, gen2: g2 }; }

// ---------- Hox-kleuren (paraloge groep 1..13) ----------
function _w3Hox(p) { const st = ['#D9D0F0', '#B3A6DC', C.paars, '#5E4E9A'], u = clamp((p - 1) / 12, 0, 1) * 3, i = Math.min(2, Math.floor(u)); return _mixHex(st[i], st[i + 1], u - i); }
const _W3VLIEG = [['lab', 1], ['pb', 2], ['Dfd', 4], ['Scr', 5], ['Antp', 6], ['Ubx', 7], ['abd-A', 8], ['Abd-B', 11]];

// rij genen op een chromosoom; genen = [[naam|null, paraloog]] of null (leeg vak); geeft x-midden per gen
function _w3HoxRij(ctx, x, y, w, genen, o = {}) { const { h = 44, namen = true, px = 26, chrom = true } = o; const n = genen.length, gw = w / n;
  if (chrom) { roundRect(ctx, x - 40, y - h * 0.32, w + 80, h * 0.64, h * 0.32); shape(ctx, '#3A465E', rgba(C.line, 0.6), 2); }
  const mid = []; genen.forEach((g, i) => { const gx = x + i * gw; mid.push(gx + gw / 2); if (!g) return;
    roundRect(ctx, gx + 4, y - h / 2, gw - 8, h, 7); shape(ctx, _w3Hox(g[1]), lighten(_w3Hox(g[1]), 0.3), 1.5);
    if (namen && g[0]) metaText(ctx, g[0], gx + gw / 2, y - h / 2 - 14, C.text, 'center', px); });
  return mid; }

// ---------- fruitvlieg van opzij met Hox-stroken (kijkt naar links) ----------
function _w3VliegZij(ctx, x, y, L, o = {}) { const { kleur = true } = o; const V = ERFK.vlieg, g = V.grijs, gd = V.grijsD; const K = (p) => _w3Hox(p);
  ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const kop = [-0.43 * L, -0.03 * L, 0.11 * L], bor = [-0.16 * L, -0.05 * L, 0.18 * L, 0.15 * L], ach = [0.22 * L, 0.0, 0.25 * L, 0.125 * L];
  // poten (achter het lijf): T1, T2, T3, elk in de kleur van zijn segment
  const poten = [[-0.27, 5, -0.2], [-0.17, 6, 0.05], [-0.06, 7, 0.32]];
  for (const [px, p, sp] of poten) { const x0 = px * L, y0 = 0.07 * L, x1 = x0 + (sp - 0.05) * L * 0.5, y1 = y0 + 0.13 * L, x2 = x1 + sp * L * 0.35, y2 = y1 + 0.14 * L, x3 = x2 + (sp + 0.1) * L * 0.25, y3 = y2 + 0.06 * L;
    ctx.strokeStyle = kleur ? _mixHex(K(p), '#000000', 0.15) : gd; ctx.lineWidth = L * 0.022; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.lineWidth = L * 0.012; ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke(); }
  // lijf (kop, borststuk, achterlijf) als één clipvorm
  const lijf = () => { ctx.beginPath(); ctx.arc(kop[0], kop[1], kop[2], 0, 6.283); ctx.moveTo(bor[0] + bor[2], bor[1]); ctx.ellipse(bor[0], bor[1], bor[2], bor[3], 0, 0, 6.283);
    ctx.moveTo(ach[0] + ach[2], ach[1]); ctx.ellipse(ach[0], ach[1], ach[2], ach[3], 0.12, 0, 6.283); };
  lijf(); ctx.fillStyle = g; ctx.fill('nonzero');
  if (kleur) { ctx.save(); lijf(); ctx.clip('nonzero');
    const kx0 = kop[0] - kop[2], kw = kop[2] * 2 / 3; [1, 2, 4].forEach((p, i) => { ctx.fillStyle = rgba(K(p), 0.85); ctx.fillRect(kx0 + i * kw, -L, kw + 1, 2 * L); });
    const bx0 = kop[0] + kop[2]; const segB = [[bx0, -0.24 * L, 5], [-0.24 * L, -0.05 * L, 6], [-0.05 * L, 0.0, 7]]; // T1 smal, T2 groot, T3 smal
    segB.forEach(([a, b, p]) => { ctx.fillStyle = rgba(K(p), 0.85); ctx.fillRect(a, -L, b - a + 1, 2 * L); });
    const ax0 = 0.0, aw = (ach[0] + ach[2] - ax0) / 8; for (let i = 0; i < 8; i++) { const p = i === 0 ? 7 : i < 4 ? 8 : 11; ctx.fillStyle = rgba(K(p), 0.85); ctx.fillRect(ax0 + i * aw, -L, aw + 1, 2 * L); }
    ctx.strokeStyle = rgba('#121A26', 0.35); ctx.lineWidth = 2; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(ax0 + i * aw, -L); ctx.lineTo(ax0 + i * aw, L); ctx.stroke(); }
    ctx.restore(); }
  ctx.strokeStyle = gd; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(kop[0], kop[1], kop[2], 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(bor[0], bor[1], bor[2], bor[3], 0, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(ach[0], ach[1], ach[2], ach[3], 0.12, 0, 6.283); ctx.stroke();
  // facetoog (donkerrood, halfdoorzichtig zodat de kopkleur zichtbaar blijft aan de rand)
  ctx.beginPath(); ctx.ellipse(kop[0] + 0.01 * L, kop[1] - 0.005 * L, 0.07 * L, 0.085 * L, 0.2, 0, 6.283); shape(ctx, rgba(V.oog, 0.85), V.oogD, 2);
  // voelspriet + arista vooraan, slurf onder
  ctx.strokeStyle = gd; ctx.lineWidth = L * 0.016; ctx.beginPath(); ctx.moveTo(kop[0] - 0.09 * L, kop[1] - 0.05 * L); ctx.lineTo(kop[0] - 0.14 * L, kop[1] - 0.03 * L); ctx.stroke();
  ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(kop[0] - 0.14 * L, kop[1] - 0.03 * L); ctx.quadraticCurveTo(kop[0] - 0.19 * L, kop[1] - 0.09 * L, kop[0] - 0.2 * L, kop[1] - 0.13 * L); ctx.stroke();
  ctx.lineWidth = L * 0.022; ctx.beginPath(); ctx.moveTo(kop[0] - 0.03 * L, kop[1] + 0.09 * L); ctx.lineTo(kop[0] - 0.06 * L, kop[1] + 0.15 * L); ctx.stroke();
  // vleugel bovenop, naar achteren
  ctx.beginPath(); ctx.moveTo(-0.12 * L, -0.17 * L); ctx.bezierCurveTo(0.1 * L, -0.27 * L, 0.5 * L, -0.24 * L, 0.6 * L, -0.15 * L); ctx.bezierCurveTo(0.5 * L, -0.1 * L, 0.15 * L, -0.12 * L, -0.12 * L, -0.17 * L);
  shape(ctx, rgba(V.vleugel, 0.22), rgba(V.vleugel, 0.8), 2);
  ctx.strokeStyle = rgba(V.vleugel, 0.45); ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-0.08 * L, -0.17 * L); ctx.quadraticCurveTo(0.2 * L, -0.22 * L + i * 0.02 * L, 0.55 * L, -0.17 * L + i * 0.015 * L); ctx.stroke(); }
  ctx.restore(); return { kop: [x + kop[0], y + kop[1]], borst: [x + bor[0], y + bor[1]], achter: [x + ach[0], y + ach[1]] }; }

// ---------- fruitvliegkop van voren ----------
// Recept (FlyBase-anatomie; Gehring: Antennapedia): brede kop, twee grote rode facetogen opzij, drie puntoogjes op de kruin,
// tussen de ogen het voorhoofd; voelsprieten midden onder het voorhoofd: twee kleine leden, een groot ovaal derde lid met een
// geveerde arista opzij. Antennapedia: op de plek van de voelspriet een middenpoot (dij, scheen, vijf tarsleden, klauwtjes).
function _w3VliegKop(ctx, x, y, s, o = {}) { const { antp = false, tint = null } = o; const V = ERFK.vlieg, g = V.grijs, gd = V.grijsD;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // kopkapsel
  ctx.beginPath(); ctx.moveTo(-230, -20); ctx.bezierCurveTo(-230, -150, -120, -180, 0, -180); ctx.bezierCurveTo(120, -180, 230, -150, 230, -20); ctx.bezierCurveTo(230, 90, 130, 175, 0, 178); ctx.bezierCurveTo(-130, 175, -230, 90, -230, -20); ctx.closePath();
  shape(ctx, g, gd, 3);
  // voorhoofd (lichter, oranjebruin)
  ctx.beginPath(); ctx.moveTo(-85, -165); ctx.quadraticCurveTo(0, -178, 85, -165); ctx.quadraticCurveTo(95, -40, 60, 30); ctx.lineTo(-60, 30); ctx.quadraticCurveTo(-95, -40, -85, -165); ctx.closePath(); shape(ctx, '#B5916A', rgba(gd, 0.8), 2);
  // puntoogjes
  for (const [px, py] of [[0, -150], [-20, -128], [20, -128]]) circ(ctx, px, py, 7, '#C8B27A', gd, 1.5);
  // borstels op de kruin
  ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3; for (const [bx, by, dx, dy] of [[-60, -166, -30, -40], [60, -166, 30, -40], [-30, -150, -10, -45], [30, -150, 10, -45], [-120, -150, -40, -30], [120, -150, 40, -30]]) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + dx * 0.4, by + dy * 0.7, bx + dx, by + dy); ctx.stroke(); }
  // facetogen
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * 158, -10); ctx.beginPath(); ctx.ellipse(0, 0, 82, 128, k * 0.12, 0, 6.283); shape(ctx, V.oog, V.oogD, 2.5); ctx.clip();
    ctx.fillStyle = rgba(V.oogD, 0.55); for (let iy = -140; iy < 140; iy += 13) for (let ix = -90; ix < 90; ix += 14) { ctx.beginPath(); ctx.arc(ix + ((iy / 13) % 2 ? 7 : 0), iy, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
  // gezicht en slurf
  ctx.beginPath(); ctx.moveTo(-60, 30); ctx.quadraticCurveTo(-70, 120, 0, 140); ctx.quadraticCurveTo(70, 120, 60, 30); ctx.closePath(); shape(ctx, _mixHex(g, '#FFFFFF', 0.12), gd, 2);
  ctx.beginPath(); ctx.moveTo(-30, 150); ctx.quadraticCurveTo(-48, 205, 0, 214); ctx.quadraticCurveTo(48, 205, 30, 150); ctx.closePath(); shape(ctx, '#8C8270', gd, 2);
  // tint (vraagkaart): het gebied van de voelsprieten
  if (tint) { ctx.beginPath(); ctx.ellipse(0, 20, 100, 70, 0, 0, 6.283); ctx.fillStyle = rgba(tint, 0.55); ctx.fill(); }
  const ank = {};
  for (const k of [-1, 1]) {
    // voelspriet-kuiltje
    ctx.beginPath(); ctx.ellipse(k * 34, -8, 20, 16, 0, 0, 6.283); shape(ctx, '#7E6A50', gd, 1.5);
    if (!antp) { // lid 1 en 2, groot derde lid, arista
      ctx.beginPath(); ctx.ellipse(k * 36, 8, 12, 12, 0, 0, 6.283); shape(ctx, '#9C7E5A', gd, 1.5);
      ctx.beginPath(); ctx.ellipse(k * 40, 30, 17, 18, 0, 0, 6.283); shape(ctx, '#9C7E5A', gd, 1.5);
      ctx.beginPath(); ctx.ellipse(k * 50, 80, 30, 44, k * -0.15, 0, 6.283); shape(ctx, '#C4A274', gd, 2.5);
      // arista: geveerd, schuin naar buiten-boven
      const ax0 = k * 62, ay0 = 60, ax1 = k * 150, ay1 = 20; ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(ax0, ay0); ctx.quadraticCurveTo(k * 110, 52, ax1, ay1); ctx.stroke();
      ctx.lineWidth = 1.8; for (let i = 1; i < 8; i++) { const u = i / 8, px = lerp(ax0, ax1, u), py = lerp(ay0, ay1, u) + Math.sin(u * 3.14) * 6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + k * 6, py - 16); ctx.moveTo(px, py); ctx.lineTo(px + k * 4, py + 13); ctx.stroke(); }
      ank['spriet' + k] = [x + k * 46 * s, y + 74 * s]; ank['arista' + k] = [x + ax1 * s, y + ay1 * s];
    } else { // middenpoot: heup, dij, scheen, 5 tarsleden, klauwtjes
      const kl = tint || '#8E826C', kd = _mixHex(kl, '#000000', 0.3);
      const P = [[k * 36, 6], [k * 52, 40], [k * 112, 160], [k * 150, 290], [k * 182, 395]];
      const dik = [22, 20, 17, 12];
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = kd; ctx.lineWidth = dik[i] + 4; ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[i + 1]); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dik[i]; ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[i + 1]); ctx.stroke(); }
      // tarsleden
      for (let i = 0; i < 5; i++) { const u0 = i / 5, u1 = (i + 1) / 5 - 0.02, a = [lerp(P[3][0], P[4][0], u0), lerp(P[3][1], P[4][1], u0)], b = [lerp(P[3][0], P[4][0], u1), lerp(P[3][1], P[4][1], u1)];
        ctx.strokeStyle = kd; ctx.lineWidth = dik[3] + 3; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = dik[3] - 1; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
      ctx.strokeStyle = '#3B3633'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(P[4][0], P[4][1]); ctx.quadraticCurveTo(P[4][0] + k * 16, P[4][1] + 6, P[4][0] + k * 12, P[4][1] + 20); ctx.moveTo(P[4][0], P[4][1]); ctx.quadraticCurveTo(P[4][0] - k * 6, P[4][1] + 14, P[4][0] - k * 2, P[4][1] + 24); ctx.stroke();
      // borsteltjes langs dij en scheen
      ctx.lineWidth = 2; for (let i = 1; i < 3; i++) for (let q = 1; q < 6; q++) { const u = q / 6, px = lerp(P[i][0], P[i + 1][0], u), py = lerp(P[i][1], P[i + 1][1], u); ctx.beginPath(); ctx.moveTo(px + k * 8, py); ctx.lineTo(px + k * 20, py + 8); ctx.stroke(); }
      ank['poot' + k] = [x + P[3][0] * s, y + P[3][1] * s]; }
  }
  ctx.restore(); return ank; }

// ======================================================================================================
const SBW3 = {
  // ---------- 6 Een bericht voor onze cel ----------
  w32(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H6); _w3Week(ctx, 4);
    const X = 860, Y = 520, s = 0.8; const { M, ank } = _w3Doorsnede(ctx, X, Y, s, { st: 1, heel: true });
    let p = M(420, 175); _w3Label(ctx, 'oogblaasje', p[0], p[1] + 44, C.text, 'center');
    p = M(-420, 175); _w3Label(ctx, 'oogblaasje', p[0], p[1] + 44, C.text, 'center');
    p = M(0, 0); _w3Label(ctx, 'hersenen', p[0], M(0, -_W3.ringRy)[1] - 34, C.text, 'center');
    p = M(_W3.rx, 260); _w3Label(ctx, 'ectoderm', p[0] + 10, p[1] + 40, C.text, 'left');
    _w3Label(ctx, 'onze cel', ank.cel[0] + 40, ank.cel[1] + 12, C.goud, 'left');
    metaText(ctx, 'DOORSNEDE KOP · VAN VOREN · NIET OP SCHAAL', 80, 960, C.text2, 'left', 26);
  },
  w33(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H6);
    const X = -40, Y = 500, s = 1.5; const clip = [0, 110, 1440, 790];
    const { M, ank } = _w3Doorsnede(ctx, X, Y, s, { st: 3, k: 0.45, signaal: 0, clip });
    // signaalstipjes in de beker (van het oogblaasje naar het lensblaasje)
    ctx.save(); ctx.beginPath(); ctx.rect(...clip); ctx.clip(); for (let i = 0; i < 9; i++) { const an = Math.PI + (hash(i * 3) - 0.5) * 1.6, rr = 108 + 10 * hash(i * 5), q = M(ank.beker.Ox + Math.cos(an) * rr, Math.sin(an) * rr); circ(ctx, q[0], q[1], 8, C.goud); } ctx.restore();
    let p = M(ank.lensX, -76); _w3Label(ctx, 'lensblaasje', p[0] + 60, M(0, -_W3.ry)[1] + 40 > 150 ? 170 : 170, C.text, 'center');
    _w3Label(ctx, 'onze cel', ank.cel[0], ank.cel[1] + 150, C.goud, 'center');
    _w3Label(ctx, 'oogblaasje', 760, 960, C.text, 'center');
    p = M(_W3.rx, 0); _w3Label(ctx, 'ectoderm', p[0] + 30, p[1] + 150, C.text, 'left');
    landschapKlein(ctx, ['embryo', 'ectoderm', 'huid en lens', 'lens'], 1);
    // drie kleine stadia: dikker → stulpt in → snoert af
    const st = [[1, 'dikker'], [2, 'stulpt in'], [3, 'snoert af']];
    st.forEach(([s0, nm], i) => { const bx = 1475, by = 440 + i * 150, bw = 395, bh = 136, ss = 0.5; roundRect(ctx, bx, by, bw, bh, 14); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 1.5);
      ctx.save(); roundRect(ctx, bx, by, bw, bh, 14); ctx.clip(); _w3Doorsnede(ctx, bx + 150 - 560 * ss, by + bh / 2, ss, { st: s0, k: 0.45, goud: true }); ctx.restore();
      ctx.fillStyle = rgba(C.bgSchema, 0.95); ctx.fillRect(bx + 190, by + 2, bw - 192, bh - 4); text(ctx, nm, bx + bw - 20, by + 80, fTekst(36, 600), C.text, 'right'); metaText(ctx, String(i + 1), bx + 214, by + 80, C.goud, 'left', 26); });
  },
  w34(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H6);
    const X = 150, Y = 500, s = 1.3; const clip = [0, 110, 1920, 800];
    const { M, ank } = _w3Doorsnede(ctx, X, Y, s, { st: 3, k: 1, clip });
    const B = ank.beker; const pil = (t, x, y, col) => { ctx.font = fTekst(36, 600); const w = ctx.measureText(t).width + 28; roundRect(ctx, x - w / 2, y - 34, w, 48, 12); shape(ctx, rgba(C.bgMicro, 0.88), null); text(ctx, t, x, y, fTekst(36, 600), col, 'center'); };
    let p = M(B.Ox + (B.Ri + 4) * Math.cos(2.5), (B.Ri + 4) * Math.sin(2.5)); pil('netvlies', p[0], p[1] + 12, C.text);
    p = M(B.Ox + B.Ro * Math.cos(-2.25), B.Ro * Math.sin(-2.25)); _w3Label(ctx, 'pigmentlaag', p[0] - 20, p[1] - 36, C.text2, 'center', 34);
    p = M(B.Ox, B.Ro); _w3Label(ctx, 'oogbeker', p[0], p[1] + 76, C.text, 'center');
    p = M(ank.lensX, 0); _w3Label(ctx, 'lens', p[0] + 6, p[1] + 12, C.text, 'center');
    _w3Label(ctx, 'onze cel', ank.cel[0] + 10, 900, C.goud, 'center');
    p = M(_W3.rx, 0); _w3Label(ctx, 'ectoderm', p[0] + 30, p[1] + 12, C.text, 'left'); _w3Label(ctx, 'wordt hoornvlies', p[0] + 30, p[1] + 58, C.text2, 'left', 32);
    p = M(-_W3.ringRx, 0); _w3Label(ctx, 'hersenen', 40, M(0, _W3.ringRy)[1] + 74, C.text, 'left');
    p = M(165, 0); metaText(ctx, 'OOGSTEEL', p[0], p[1] + 10, C.text2, 'center', 26);
  },
  w35(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H6); metaText(ctx, 'MUIS · PAX6 ALLEEN IN DE HUID UITGESCHAKELD', W - 80, 78, C.goud, 'right', 26);
    const X = 150, Y = 500, s = 1.3; const clip = [0, 110, 1920, 800];
    const { M } = _w3Doorsnede(ctx, X, Y, s, { st: 1, huid: 'grijs', goud: false, signaal: 1, clip });
    let p = M(420, 220); _w3Label(ctx, 'oogblaasje', p[0], p[1] + 40, C.text, 'center');
    p = M(_W3.rx, 0); _w3Label(ctx, 'huid', p[0] + 40, p[1] - 10, C.text, 'left'); _w3Label(ctx, 'zonder Pax6', p[0] + 40, p[1] + 36, C.text2, 'left'); _w3Label(ctx, 'signaal', M(560, -170)[0], M(560, -170)[1], C.goud, 'center');
    _w3Label(ctx, 'hersenen', 40, M(0, _W3.ringRy)[1] + 74, C.text, 'left');
  },
  wq36(ctx) { difVraagKaart(ctx, ['Pax6 werkt niet in de huid.', 'Het oogblaasje raakt die huid.', 'Ontstaat er een lens?'], ['Nee, er ontstaat geen lens', 'Ja, want het oogblaasje geeft gewoon zijn signaal af'],
    (c) => { const bx = 1370, by = 300, bw = 500, bh = 480; roundRect(c, bx, by, bw, bh, 18); shape(c, C.bgMicro, C.line, 1.5);
      c.save(); roundRect(c, bx, by, bw, bh, 18); c.clip(); const { M } = _w3Doorsnede(c, bx - 120, by + bh / 2, 0.72, { st: 1, huid: 'grijs', goud: false, signaal: 1 }); c.restore();
      text(c, 'huid zonder Pax6', bx + bw - 20, by + 50, fTekst(32, 600), C.text2, 'right'); }); },
  w37(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H6);
    const A = _w3HuidCel(ctx, 450, 580, 230, { pax: false, kleur: _W3.grijs }); const B = _w3HuidCel(ctx, 1060, 580, 230, { pax: true });
    _w3Label(ctx, 'zonder Pax6', 450, 205, C.text2, 'center', 40); _w3Label(ctx, 'met Pax6', 1060, 205, C.text, 'center', 40);
    for (const Q of [A, B]) { _w3Label(ctx, 'receptor', Q.receptor[0] + 50, Q.receptor[1] - 20, C.text, 'left'); _w3Label(ctx, 'signaal', Q.receptor[0] - 160, Q.receptor[1] - 90, C.goud, 'right', 32); }
    _w3Label(ctx, 'lensgenen uit', 450, 880, C.text2, 'center'); _w3Label(ctx, 'lensgenen aan', 1060, 880, C.groen, 'center');
    _w3Label(ctx, 'Pax6', B.kern[0] - 60, B.kern[1] - 52, C.goud, 'center');
    // kaart competentie + klokje
    const kx = 1440, ky = 260, kw = 420, kh = 330; roundRect(ctx, kx, ky, kw, kh, 18); shape(ctx, rgba(C.fill, 0.85), C.goud, 2.5);
    text(ctx, 'competentie', kx + 30, ky + 74, fTitel(56), C.goud, 'left');
    ['kan de cel reageren?', '· juiste receptor', '· juiste genen', '· op het juiste moment'].forEach((r, i) => text(ctx, r, kx + 30, ky + 140 + i * 48, fTekst(36, i ? 500 : 600), C.text, 'left'));
    const cx = 1650, cy = 740, cr = 70; circ(ctx, cx, cy, cr, rgba(C.fill, 0.9), C.text2, 4);
    ctx.save(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, cr - 8, -Math.PI / 2, -Math.PI / 2 + 6.283 * 0.78); ctx.closePath(); ctx.fillStyle = rgba(C.text2, 0.35); ctx.fill(); ctx.restore();
    ctx.strokeStyle = C.text; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-Math.PI / 2 + 6.283 * 0.78) * (cr - 14), cy + Math.sin(-Math.PI / 2 + 6.283 * 0.78) * (cr - 14)); ctx.stroke();
    circ(ctx, cx, cy - cr - 10, 9, C.text2); metaText(ctx, 'TIJD LOOPT AF', cx, cy + cr + 44, C.text2, 'center', 26);
  },
  // ---------- 7 Mastergen en adresboek ----------
  w38(ctx) { _w3Bg(ctx, C.bgMicro); difTag(ctx, _W3H7); difLabel(ctx, 'VEREENVOUDIGD');
    const cx = 900, cy = 510, rx = 760, ry = 350; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.2); ctx.fill(); ctx.strokeStyle = C.kernR; ctx.lineWidth = 4; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, rx - 10, ry - 10, 0, 0, 6.283); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283 + 0.1; circ(ctx, cx + Math.cos(an) * (rx - 5), cy + Math.sin(an) * (ry - 5), 7, C.bgMicro, C.kernR, 2); }
    metaText(ctx, 'KERN', cx + rx - 60, cy - ry + 50, C.kernR, 'right', 26);
    // DNA: drie rijen, slang
    const rij = (y, x0, x1) => { const P = []; for (let i = 0; i <= 12; i++) { const u = i / 12; P.push([lerp(x0, x1, u), y + Math.sin(u * 6.28 * 1.5 + y) * 14]); } return P; };
    const R = [rij(320, 260, 1540), rij(520, 1560, 240), rij(720, 340, 1460)]; const D = R.map(P => { dnaDraad(ctx, P, { w: 10 }); return bioDicht(P, 20); });
    // genen
    const pax = _w3GenOp(ctx, D[0], 0.06, 0.18, C.goud, 1, 26);
    const t1 = [[0, 0.48, 0.6], [0, 0.78, 0.9], [1, 0.12, 0.24]].map(([r, a, b]) => ({ r, m: _w3GenOp(ctx, D[r], a, b, C.groen, 1, 26), a }));
    const t2 = [[1, 0.5, 0.6], [1, 0.8, 0.9], [2, 0.08, 0.2], [2, 0.42, 0.52]].map(([r, a, b]) => ({ r, m: _w3GenOp(ctx, D[r], a, b, C.groen, 0.55, 26), a }));
    const uit = [[0, 0.3, 0.38], [2, 0.7, 0.8], [2, 0.88, 0.96], [1, 0.32, 0.4]].map(([r, a, b]) => _w3GenOp(ctx, D[r], a, b, rgba(C.text2, 0.45), 1, 26));
    // Pax6-eiwit gebonden net vóór de genen van stap 1
    const bindVoor = (r, a) => { const i = Math.max(0, Math.round((a - 0.035) * (D[r].length - 1))); return D[r][i]; };
    const pe = [pax[0] + 30, pax[1] + 95]; _w3Kluwen(ctx, pe[0], pe[1], 30, C.goud, 1, 12);
    pijl(ctx, pax[0], pax[1] + 22, pe[0] - 6, pe[1] - 40, C.goud, 1, 4, 14);
    t1.forEach((g, i) => { const b = bindVoor(g.r, g.a); _w3Kluwen(ctx, b[0], b[1] - 4, 22, C.goud, i + 3, 9); });
    // stap 2: eiwitten van de genen uit stap 1 binden bij de volgende genen (groen)
    t2.forEach((g, i) => { const b = bindVoor(g.r, g.a); _w3Kluwen(ctx, b[0], b[1] - 4, 20, C.groen, i + 7, 9); });
    const nr = (x, y, n, col) => { circ(ctx, x, y, 22, C.bgMicro, col, 3); text(ctx, String(n), x, y + 10, fTekst(30, 800), col, 'center'); };
    nr(pax[0], pax[1] - 50, 1, C.goud); t1.forEach(g => nr(g.m[0], g.m[1] - 50, 2, C.groen)); t2.forEach(g => nr(g.m[0], g.m[1] - 50, 3, rgba(C.groen, 0.7)));
    _w3Label(ctx, 'Pax6-gen', pax[0] - 70, pax[1] - 90, C.goud, 'left'); _w3Label(ctx, 'Pax6-eiwit', pe[0] + 50, pe[1] + 14, C.goud, 'left');
    _w3Label(ctx, 'genen aan', t1[0].m[0], t1[0].m[1] - 90, C.groen, 'center'); _w3Label(ctx, 'en de volgende', t2[2].m[0] + 60, t2[2].m[1] + 80, rgba(C.groen, 0.8), 'left');
  },
  w39(ctx) { _w3Bg(ctx, C.bgMacroSky); difTag(ctx, _W3H7); difLabel(ctx, 'FRUITVLIEG · 1995');
    const x = 700, y = 470, L = 560; fruitvlieg(ctx, x, y, L, {});
    const Ls = L, kopY = -Ls * 0.42, borstY = -Ls * 0.17; const V = ERFK.vlieg;
    const oogje = (px, py, r) => { ctx.save(); ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.8, 0.3, 0, 6.283); shape(ctx, V.oog, V.oogD, 2); ctx.clip(); ctx.fillStyle = rgba(V.oogD, 0.7); for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { ctx.beginPath(); ctx.arc(px + i * r * 0.32 + (j % 2) * r * 0.16, py + j * r * 0.28, r * 0.07, 0, 6.283); ctx.fill(); } ctx.restore(); ctx.beginPath(); ctx.arc(px, py, r * 2.1, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.stroke(); };
    // poot (rechts, middelste): punt op de scheen
    const k = 1, j = 1, by = borstY - Ls * 0.07 + j * Ls * 0.07, ang = 0.1, l1 = Ls * 0.2, l2 = Ls * 0.24, x0 = k * Ls * 0.1, x1 = x0 + Math.cos(ang) * l1, y1 = by + Math.sin(ang) * l1 - Ls * 0.04, x2 = x1 + Math.cos(ang * 1.4 + 0.5) * l2, y2 = y1 + Math.sin(ang * 1.4 + 0.5) * l2;
    const pootOog = [x + (x1 + x2) / 2, y + (y1 + y2) / 2]; oogje(pootOog[0], pootOog[1], 13);
    // vleugelbasis (links)
    { const kk = -1; const c0 = Math.cos(-kk * 0.2), s0 = Math.sin(-kk * 0.2), lx = kk * Ls * 0.16 * 0.7, ly = Ls * 0.86 * 0.18; const vx = x + kk * Ls * 0.08 + lx * c0 - ly * s0, vy = y + borstY + Ls * 0.02 + lx * s0 + ly * c0; oogje(vx, vy, 12); _w3Label(ctx, 'op de vleugel', vx - 40, vy + 12, C.text, 'right'); }
    // voelspriet (links)
    oogje(x - Ls * 0.05, y + kopY - Ls * 0.12, 9);
    // vergroting van het oogje op de poot
    const zx = 1420, zy = 500, zr = 270; ctx.save(); ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.fillStyle = C.bgMacroSky; ctx.fill(); ctx.clip();
    ctx.strokeStyle = '#8A7E68'; ctx.lineWidth = 120; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(zx - 340, zy - 230); ctx.lineTo(zx + 340, zy + 230); ctx.stroke(); // stuk scheen
    ctx.strokeStyle = '#6E655E'; ctx.lineWidth = 3; for (let i = -6; i <= 6; i++) { const px = zx + i * 50, py = zy + i * 34; ctx.beginPath(); ctx.moveTo(px - 30, py + 55); ctx.lineTo(px - 10, py + 85); ctx.stroke(); }
    ctx.beginPath(); ctx.ellipse(zx, zy, 150, 125, 0.3, 0, 6.283); shape(ctx, V.oog, V.oogD, 3); ctx.clip();
    for (let iy = -8; iy <= 8; iy++) for (let ix = -9; ix <= 9; ix++) { const hx = zx + ix * 19 + (iy % 2 ? 9.5 : 0), hy = zy + iy * 16.5; ctx.beginPath(); for (let q = 0; q < 6; q++) { const an = q / 6 * 6.283 + Math.PI / 6; ctx.lineTo(hx + Math.cos(an) * 10, hy + Math.sin(an) * 10); } ctx.closePath(); ctx.fillStyle = _mixHex(V.oog, '#FFFFFF', 0.08 + 0.12 * hash(ix * 31 + iy)); ctx.fill(); ctx.strokeStyle = V.oogD; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore(); ctx.beginPath(); ctx.arc(zx, zy, zr, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.stroke();
    _w3Label(ctx, 'facetten', zx, zy + zr + 52, C.text, 'center'); _w3Label(ctx, 'extra oog op een poot', zx, zy - zr - 24, C.goud, 'center');
    _w3Label(ctx, 'op de poot', pootOog[0] + 40, pootOog[1] + 12, C.text, 'left');
    _w3Label(ctx, 'op de voelspriet', x - Ls * 0.05 - 30, y + kopY - Ls * 0.12 - 10, C.text, 'right');
  },
  w40(ctx) { _w3Bg(ctx, C.bgSchema); difTag(ctx, _W3H7);
    metaText(ctx, 'HOX-GENEN OP EEN CHROMOSOOM · FRUITVLIEG', 160, 190, C.text2, 'left', 26);
    _w3HoxRij(ctx, 220, 290, 1480, _W3VLIEG, { h: 60, px: 30 });
    metaText(ctx, 'VOORAAN', 220, 370, C.text2, 'left', 26); metaText(ctx, 'ACHTERAAN', 1700, 370, C.text2, 'right', 26);
    pijl(ctx, 400, 362, 1480, 362, rgba(C.line, 0.8), 1, 3, 14);
    _w3VliegZij(ctx, 980, 660, 820, {});
    _w3Label(ctx, 'kop', 540, 860, C.text, 'center'); _w3Label(ctx, 'borststuk', 830, 860, C.text, 'center'); _w3Label(ctx, 'achterlijf', 1200, 860, C.text, 'center');
  },
  w41(ctx) { _w3Bg(ctx, C.bgSchema); difTag(ctx, _W3H7);
    // links: vlieg met zijn rij
    metaText(ctx, 'FRUITVLIEG', 100, 180, C.text2, 'left', 26);
    _w3HoxRij(ctx, 120, 260, 640, _W3VLIEG, { h: 40, px: 22, namen: false });
    _w3VliegZij(ctx, 470, 560, 560, {});
    // rechts: mens, vier rijen (paraloge groepen 1–13)
    metaText(ctx, 'MENS · VIER RIJEN', 1000, 180, C.text2, 'left', 26);
    const rijen = { HOXA: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13], HOXB: [1, 2, 3, 4, 5, 6, 7, 8, 9, 13], HOXC: [4, 5, 6, 8, 9, 10, 11, 12, 13], HOXD: [1, 3, 4, 8, 9, 10, 11, 12, 13] };
    Object.entries(rijen).forEach(([nm, gs], i) => { const y = 240 + i * 62; const g = []; for (let p = 1; p <= 13; p++) g.push(gs.includes(p) ? [null, p] : null);
      _w3HoxRij(ctx, 1150, y, 700, g, { h: 38, namen: false }); metaText(ctx, nm, 1100, y + 10, C.text2, 'right', 26); });
    metaText(ctx, '1', 1150 + 700 / 26, 222 - 12, C.text2, 'center', 26); metaText(ctx, '13', 1850 - 700 / 26, 222 - 12, C.text2, 'center', 26);
    // embryo met stroken van hersenstam tot staart
    const ex = 1400, ey = 670, es = 0.82; const r = embryoEcht(ctx, ex, ey, es, {});
    const F = _embAVorm(); ctx.save(); ctx.translate(ex, ey); ctx.scale(es, es); ctx.beginPath(); bioPad(ctx, F.lijf, true); ctx.clip();
    const rug = [[84, -150], [108, -118], [138, -60], [148, 0], [146, 56], [130, 108], [100, 150], [66, 178], [44, 194], [20, 214]];
    const RP = bioDicht(rug, 30), N = RP.length; ctx.lineCap = 'butt';
    for (let p = 1; p <= 13; p++) { const i0 = Math.floor((p - 1) / 13 * (N - 1)), i1 = Math.floor(p / 13 * (N - 1)); ctx.strokeStyle = rgba(_w3Hox(p), 0.75); ctx.lineWidth = 120; ctx.beginPath(); for (let i = i0; i <= i1; i++) i === i0 ? ctx.moveTo(RP[i][0], RP[i][1]) : ctx.lineTo(RP[i][0], RP[i][1]); ctx.stroke(); }
    // staartpuntje
    ctx.restore(); ctx.save(); ctx.translate(ex, ey); ctx.scale(es, es); ctx.strokeStyle = rgba(_w3Hox(13), 0.75); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); bioPad(ctx, F.staart.slice(1), false); ctx.stroke(); ctx.restore();
    const hs = r.achterhersenen; _w3Label(ctx, 'hersenstam', hs[0] + 70, hs[1] - 10, C.text, 'left'); _w3Label(ctx, 'staartstreek', r.staart[0] + 70, r.staart[1] + 20, C.text, 'left');
    metaText(ctx, 'MENSELIJK EMBRYO ± 5 WEKEN', 1000, 1000, C.text2, 'left', 26);
  },
  wq42(ctx) { difVraagKaart(ctx, ['Een Hox-gen staat door een mutatie aan', 'op de plek van de voelsprieten.', 'Wat groeit daar?'], ['Niets, want de voelsprieten verdwijnen gewoon', 'Poten, op de plek van de voelsprieten', 'Voelsprieten, maar dan op de poten'],
    (c) => { const T = _w3Hox(6); const x = 1620, y = 470, s = 0.62;
      // borststuk eronder in de borstkleur
      c.beginPath(); c.ellipse(x, y + 200, 150, 90, 0, 0, 6.283); shape(c, ERFK.vlieg.grijs, ERFK.vlieg.grijsD, 2.5); c.beginPath(); c.ellipse(x, y + 200, 150, 90, 0, 0, 6.283); c.fillStyle = rgba(T, 0.75); c.fill();
      _w3VliegKop(c, x, y, s, { tint: T });
      metaText(c, 'KOP VAN VOREN', x, y - 150, C.text2, 'center', 26); metaText(c, 'BORSTSTROOK', x, y + 330, C.text2, 'center', 26); }); },
  w43(ctx) { _w3Bg(ctx, C.bgMacroSky); difTag(ctx, _W3H7); difLabel(ctx, 'FRUITVLIEG · KOP VAN VOREN');
    const a = _w3VliegKop(ctx, 520, 430, 0.95, {}); const b = _w3VliegKop(ctx, 1380, 430, 0.95, { antp: true });
    _w3Label(ctx, 'normaal', 520, 200, C.text, 'center', 44); _w3Label(ctx, 'Antennapedia', 1380, 200, C.goud, 'center', 44);
    _w3Label(ctx, 'voelsprieten', 520, 700, C.text, 'center');
    _w3Label(ctx, 'poten', 1380, 880, C.text, 'center');
  },
  w44(ctx) { _w3Bg(ctx, C.bgSchema); difTag(ctx, _W3H7); difLabel(ctx, 'MODEL');
    const T = ['positie', 'signaal', 'genen aan', 'volgende genen']; const tw = 300, gap = 76, x0 = 140, y0 = 150;
    T.forEach((t, i) => { const x = x0 + i * (tw + gap); roundRect(ctx, x, y0, tw, 100, 16); shape(ctx, rgba(C.fill, 0.8), i === 0 ? C.goud : C.line, 2.5);
      text(ctx, t, x + tw / 2, y0 + 63, fTekst(38, 700), C.text, 'center'); if (i < 3) pijl(ctx, x + tw + 10, y0 + 50, x + tw + gap - 10, y0 + 50, C.goud, 1, 5, 16); });
    landschap(ctx, 220, 420, 1080, 380, { pad: ['embryo', 'ectoderm', 'huid en lens', 'lens'], knikker: 1 });
    antwoordTegels(ctx, 1540, 330, 3, 2);
  },
};
