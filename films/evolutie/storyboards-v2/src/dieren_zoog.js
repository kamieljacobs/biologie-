// Evolutie v2 · tekenronde 2 (23 okt 2026) — alle zoogdieren van de reeks, nieuwe versies.
// Wordt na teken_evo1..8 geladen en overschrijft daar de oude functies (zelfde naam, zelfde aanroep, zelfde anker en schaal).
// Stijl (Part C): vlak, geen verloop/gloed/schaduw; diepte door lagen (verre poten donkerder) en 2–3 tinten per dier (rug donker, buik licht),
// vloeiende omtrek (Catmull-Rom door de punten), echt oog (dierOog). Alle interne namen beginnen met _z (botst niet met const's in de oude bestanden).
// Werkwijze per dier: eerst het skelet als gewrichtspunten (schoft, elleboog, pols; heup, knie, hiel), dan de omtrek eromheen. Lessen: lessen_zoog.md.

// ================= HULPJES =================
// pad door alle punten (Catmull-Rom → bezier); een punt [x, y, 1] is een harde hoek (punt van een plukje haar, hoef)
function _zPad(ctx, P, dicht = true) { const n = P.length; ctx.beginPath(); if (n < 2) return;
  const g = (i) => dicht ? P[(i + n) % n] : P[Math.max(0, Math.min(n - 1, i))];
  ctx.moveTo(P[0][0], P[0][1]); const m = dicht ? n : n - 1;
  for (let i = 0; i < m; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2); const k1 = p1[2] === 1 ? 0 : 1 / 6, k2 = p2[2] === 1 ? 0 : 1 / 6;
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) * k1, p1[1] + (p2[1] - p0[1]) * k1, p2[0] - (p3[0] - p1[0]) * k2, p2[1] - (p3[1] - p1[1]) * k2, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }
function _zV(ctx, P, fill, stroke = null, lw = 1) { _zPad(ctx, P, true); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function _zL(ctx, P, col, lw) { _zPad(ctx, P, false); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
function _zIn(ctx, P, fn) { ctx.save(); _zPad(ctx, P, true); ctx.clip(); fn(); ctx.restore(); }
const _zLerp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
// ledemaat als omtrek rond een gewrichtsketen [[x, y, breedte voorkant, breedte achterkant], …] (van boven naar beneden; 'voor' = kant waar de kop zit)
function _zLid(J) { const F = [], B = [];
  for (let i = 0; i < J.length; i++) { const a = J[Math.max(0, i - 1)], b = J[Math.min(J.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
    const wv = J[i][2], wa = J[i][3] ?? wv; F.push([J[i][0] + dy * wv, J[i][1] - dx * wv]); B.push([J[i][0] - dy * wa, J[i][1] + dx * wa]); }
  return [...F, ...B.reverse()]; }
// rij plukjes van A naar B (haarrand): n punten die d naar 'buiten' (links van A→B) steken; punten zijn harde hoeken
function _zKam(A, B, n, d, seed = 1, scheef = 0.3) { const out = []; const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, nx = dy / L, ny = -dx / L;
  for (let i = 0; i <= n; i++) { const u = i / n; out.push([A[0] + dx * u, A[1] + dy * u]); if (i < n) { const v = (i + 0.5 + scheef * 0.5 + (hash(seed + i * 2.71) - 0.5) * 0.5) / n, dd = d * (0.45 + 0.85 * hash(seed + i * 1.37));
      out.push([A[0] + dx * v + nx * dd, A[1] + dy * v + ny * dd, 1]); } } return out; }
// korte haarstreken binnen de huidige clip: n streken in een rechthoek, richting an (rad) met spreiding
function _zHaar(ctx, x0, y0, w, h, n, col, len, an, lw, seed = 1, spr = 0.35) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < n; i++) { const x = x0 + hash(seed + i * 2.31) * w, y = y0 + hash(seed + i * 5.17) * h, a = an + (hash(seed + i * 7.9) - 0.5) * spr * 2, l = len * (0.6 + 0.8 * hash(seed + i * 3.3));
    ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + Math.sin(a) * l * 0.12, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); } ctx.stroke(); }
// poot van een teenganger (hond, kat): hiel/pols-achterkant bij x0, tenen naar voren; l = lengte, h = hoogte; nagels optioneel
function _zVoet(ctx, x0, l, h, kleur, lijnK, nagel = null, lw = 0.5) { // zijaanzicht: hielkussen achter, twee zichtbare tenen met knokkels, nagels voorop
  const P = [[x0 - l * 0.16, -h * 0.95], [x0 + l * 0.12, -h * 1.22], [x0 + l * 0.42, -h * 1.12], [x0 + l * 0.56, -h * 0.98], [x0 + l * 0.74, -h * 0.98], [x0 + l * 0.92, -h * 0.66], [x0 + l * 1.0, -h * 0.22], [x0 + l * 0.94, 0, 1], [x0 - l * 0.04, 0, 1], [x0 - l * 0.22, -h * 0.38]];
  _zV(ctx, P, kleur); if (lijnK) { ctx.strokeStyle = lijnK; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + l * 0.56, -h * 0.95); ctx.quadraticCurveTo(x0 + l * 0.6, -h * 0.5, x0 + l * 0.58, -h * 0.08); ctx.moveTo(x0 + l * 0.3, -h * 1.0); ctx.quadraticCurveTo(x0 + l * 0.33, -h * 0.5, x0 + l * 0.3, -h * 0.1); ctx.stroke(); }
  if (nagel) { ctx.fillStyle = nagel; for (const u of [0.66, 0.97]) { ctx.beginPath(); ctx.moveTo(x0 + l * (u - 0.08), -h * 0.32); ctx.quadraticCurveTo(x0 + l * (u + 0.08), -h * 0.3, x0 + l * (u + 0.07), 0); ctx.lineTo(x0 + l * (u - 0.04), -h * 0.02); ctx.closePath(); ctx.fill(); } } }
// dierOog rekent in pixels (lichtpuntje ≥ 1,2 px): in een geschaald assenstelsel eerst naar schermcoördinaten
function _zOog(ctx, x, y, r, iris, o = {}) { const m = ctx.getTransform(), sx = Math.hypot(m.a, m.b); const px = m.a * x + m.c * y + m.e, py = m.b * x + m.d * y + m.f;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); dierOog(ctx, px, py, r * sx, iris, o); ctx.restore(); }
function _zNadruk(ctx, nadruk, E) { if (!nadruk) return; ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 / E; ctx.setLineDash([10 / E, 7 / E]); ctx.beginPath(); ctx.arc(nadruk[0] * 100, -nadruk[1] * 100, nadruk[2] * 100, 0, 6.283); ctx.stroke(); ctx.restore(); }


// ================= SKELETMOTOR VOOR VIERVOETERS =================
// Elk dier = skelet met gewrichten. P (in eenheden: schofthoogte = 100, y omhoog negatief, anker = midden onder):
//  romp (omtrek in de staande houding), heup / schouder (gewricht waar de poot begint), nekBasis + nekLen + nekHoek (rad, wereld) + nekDik [basis, top], kopHoek,
//  voor / achter: { a: bovenste bot (opperarm / dijbeen), b: onderste (onderarm / scheenbeen), dist: [[lengte, hoek t.o.v. verticaal], …] van de grond omhoog
//  (middenvoet, bij hoefdieren ook kootbeen), top: aanzet in de romp, w: [[voor, achter] halve breedte per gewricht], flex: extra buiging in de zwaai }.
// De houding (o.houding) zet alleen de heup, de draaiing van de romp, de nek- en kophoek en de plek van de vier voeten; knieën en ellebogen volgen uit
// inverse kinematica (twee botten), dus poten staan altijd op de grond en knikken altijd de goede kant op (elleboog naar achter, knie naar voren).
function _zIK(R, T, a, b, sgn) { const dx = T[0] - R[0], dy = T[1] - R[1]; let d = Math.hypot(dx, dy); d = Math.max(Math.abs(a - b) + 0.01, Math.min(d, (a + b) * 0.999));
  const A = Math.atan2(dy, dx) + sgn * Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d)))); return [R[0] + a * Math.cos(A), R[1] + a * Math.sin(A)]; }
// staart als taps toelopende buis langs segmenten (wereldhoeken: π/2 = recht omlaag, π = naar achter)
function _zStaartPad(root, hoeken, lens) { const P = [root]; let p = root; for (let i = 0; i < hoeken.length; i++) { p = [p[0] + Math.cos(hoeken[i]) * lens[i], p[1] + Math.sin(hoeken[i]) * lens[i]]; P.push(p); } return P; }
function _zStaart(ctx, pad, breed, kleur, o = {}) { const J = pad.map((p, i) => [p[0], p[1], breed[i], breed[i]]); const omt = _zLid(J); const e = pad[pad.length - 1], e2 = pad[pad.length - 2];
  const d = Math.hypot(e[0] - e2[0], e[1] - e2[1]) || 1; const tip = [e[0] + (e[0] - e2[0]) / d * breed[breed.length - 1] * 1.1, e[1] + (e[1] - e2[1]) / d * breed[breed.length - 1] * 1.1, 1];
  const n = J.length; const S = [...omt.slice(0, n), tip, ...omt.slice(n)]; _zV(ctx, S, kleur);
  _zIn(ctx, S, () => { if (o.punt) { ctx.fillStyle = o.punt; ctx.beginPath(); ctx.arc(tip[0], tip[1], o.puntR || 8, 0, 6.283); ctx.fill(); }
    if (o.fn) o.fn(S); }); return S; }
function _zHouding(P, o) {
  const h = o.houding || 'staan', t = o.t || 0, hs = P.heup, D = P.verDx ?? 6;
  const Q = { h, rot: 0, sx: 1, hn: [hs[0], hs[1]], nek: P.nekHoek, kop: P.kopHoek, staart: 'hang', bek: 0, oor: 0,
    voet: { vn: [P.voetX[0], 0, 0], vv: [P.voetX[0] - D, 0, 0], an: [P.voetX[1], 0, 0], av: [P.voetX[1] + D, 0, 0] } };
  const TTq = (p) => { const c = Math.cos(Q.rot), s = Math.sin(Q.rot), dx = (p[0] - hs[0]) * Q.sx; return [Q.hn[0] + c * dx - s * (p[1] - hs[1]), Q.hn[1] + s * dx + c * (p[1] - hs[1])]; };
  if (h === 'lopen' || h === 'draven') { // stap: zijdelingse volgorde achter-L, voor-L, achter-R, voor-R (elk ¼ periode later); draf: diagonale paren
    const st = P.pas || 38, du = h === 'draven' ? 0.42 : 0.62, lift = P.til || 8;
    const leg = (x0, off) => { const f = (((t + off) % 1) + 1) % 1; if (f < du) return [x0 + st * (0.5 - f / du), 0, 0]; const u = (f - du) / (1 - du); return [x0 + st * (-0.5 + u), -lift * Math.sin(Math.PI * u), Math.sin(Math.PI * u)]; };
    const off = h === 'draven' ? { an: 0, vv: 0, av: 0.5, vn: 0.5 } : { an: 0, vn: 0.75, av: 0.5, vv: 0.25 };
    Q.voet = { an: leg(P.voetX[1], off.an), vn: leg(P.voetX[0], off.vn), av: leg(P.voetX[1] + 2, off.av), vv: leg(P.voetX[0] - 2, off.vv) };
    Q.hn = [hs[0], hs[1] + Math.sin(t * Math.PI * 4) * 0.8]; Q.staart = 'loop'; Q.kop = P.kopHoek + 0.05 + Math.sin(t * Math.PI * 4) * 0.03; }
  if (h === 'zitten' || h === 'huilen') { const Z = P.zit || {}; Q.rot = Z.rot ?? -0.72; Q.sx = Z.krimp ?? 0.86; // rug buigt: romp korter Q.hn = [hs[0] + (Z.dx ?? 8), -(Z.hy ?? 19)];
    const sn = TTq(P.schouder); Q.voet.vn = [sn[0] + (Z.vx ?? -3), 0, 0]; Q.voet.vv = [sn[0] + (Z.vx ?? -3) - 4, 0, 0];
    Q.voet.an = [Q.hn[0] + (Z.ax ?? 20), 0, 0, Z.am ?? 1.42]; Q.voet.av = [Q.hn[0] + (Z.ax ?? 20) + 4, 0, 0, Z.am ?? 1.42];
    Q.nek = P.nekHoek - (Z.nek ?? 0.25); Q.kop = P.kopHoek + (Z.kop ?? 0.05); Q.staart = 'zit';
    if (h === 'huilen') { Q.nek = -1.5; Q.kop = -0.9; Q.bek = 1; Q.oor = 1; } }
  if (h === 'liggen') { const Lg = P.lig || {}; Q.rot = Lg.rot ?? -0.04; Q.hn = [hs[0], hs[1] + P.yb - (Lg.buik ?? 6)];
    const sn = TTq(P.schouder); const vf = Lg.vx ?? 36; Q.voet.vn = [sn[0] + vf, 0, 0, 1.5]; Q.voet.vv = [sn[0] + vf - 7, 0, 0, 1.5];
    Q.voet.an = [Q.hn[0] + (Lg.ax ?? 24), 0, 0, 1.45]; Q.voet.av = [Q.hn[0] + (Lg.ax ?? 24) + 6, 0, 0, 1.45];
    Q.nek = P.nekHoek + (Lg.nek ?? 0.2); Q.kop = P.kopHoek + (Lg.kop ?? 0); Q.staart = 'lig'; }
  if (h === 'grazen' || h === 'snuffelen') { const G = P.graas || {}; Q.nek = G.nek ?? 0.95; Q.kop = G.kop ?? 1.45; Q.voet.vn[0] += G.vx ?? 4; Q.voet.vv[0] += (G.vx ?? 4) + 10; }
  if (h === 'vechten') { Q.nek = P.vecht?.nek ?? 0.35; Q.kop = P.vecht?.kop ?? 1.25; Q.voet.vn[0] += 10; Q.voet.an[0] -= 6; Q.rot = 0.04; }
  if (h === 'zitten' || h === 'huilen' || h === 'liggen') { // romp zakt tot het laagste punt (zitbeen of buik) op de grond rust
    const maxY = Math.max(...P.romp.map(p => TTq(p)[1])); Q.hn[1] -= maxY + 0.5; Q.hn[1] = Math.min(Q.hn[1], -P.achter.w[1][1] * (P.dik || 1) * 0.9); } // heup nooit lager dan de dikte van de dij
  if (o.kopHoek) Q.kop += o.kopHoek; if (o.nekHoek) Q.nek += o.nekHoek;
  return Q; }
function _zVier(ctx, x, y, s, P, o = {}) {
  const { kijk = 1, a = 1, nadruk = null } = o; if (a <= 0.01) return;
  const E = s * P.H / 100; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(E * kijk, E); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const Q = _zHouding(P, o), lw = 1 / E, hs = P.heup, cr = Math.cos(Q.rot), sr = Math.sin(Q.rot);
  const TT = (p) => { const dx = (p[0] - hs[0]) * Q.sx; return [Q.hn[0] + cr * dx - sr * (p[1] - hs[1]), Q.hn[1] + sr * dx + cr * (p[1] - hs[1])]; };
  const inRomp = (fn) => { ctx.save(); ctx.translate(Q.hn[0], Q.hn[1]); ctx.rotate(Q.rot); ctx.scale(Q.sx, 1); ctx.translate(-hs[0], -hs[1]); fn(); ctx.restore(); };
  const dk = P.dik || 1;
  const poot = (voor, F, ver) => { const S = voor ? P.voor : P.achter, r0 = voor ? P.schouder : P.heup; let root = TT(r0); if (ver) root = [root[0] + (voor ? -2 : 2), root[1] - 1];
    const pts = [[F[0], F[1]]]; let p = [F[0], F[1]];
    S.dist.forEach(([len, ang], i) => { const an = (F[3] != null && i === 0) ? F[3] : ang + (S.flex ? S.flex[i] : (voor ? -1.0 : -0.6)) * F[2]; p = [p[0] - Math.sin(an) * len, p[1] - Math.cos(an) * len]; pts.push(p); });
    const top = p, knie = _zIK(root, top, S.a, S.b, voor ? 1 : -1), topIn = TT([r0[0] + S.top[0], r0[1] + S.top[1]]);
    const J = [topIn, root, knie, _zLerp(knie, top, 0.5), ...pts.slice().reverse()].map((q, i) => [q[0], q[1], S.w[i][0] * dk, S.w[i][1] * dk]);
    const kl = ver ? P.verK : (P.pootK || P.kleur), omt = _zLid(J); _zV(ctx, omt, kl);
    if (!ver && P.pootPatroon) _zIn(ctx, omt, () => P.pootPatroon(ctx, P, voor, J, Q));
    if (ver && P.verPatroon) _zIn(ctx, omt, () => P.verPatroon(ctx, P, voor, J, Q));
    P.voet(ctx, F, J, voor, ver ? (P.verVoetK || _dk(P.verK, 0.05)) : (P.voetK || kl), ver, P, lw, Q); return J; };
  // 1 verre poten (donkerder, iets verschoven)
  poot(false, Q.voet.av, true); poot(true, Q.voet.vv, true);
  // 2 staart achter het lijf
  if (P.staartF && !P.staartVoor) P.staartF(ctx, P, Q, TT(P.sw), lw);
  // 3 nek
  const nb = TT(P.nekBasis), na = Q.nek, nl = P.nekLen, [wb, wt] = P.nekDik;
  ctx.save(); ctx.translate(nb[0], nb[1]); ctx.rotate(na);
  const N = P.nekVorm ? P.nekVorm(nl, wb, wt, Q) : [[-wb * 0.35, -wb * 0.48], [nl * 0.5, -(wb + wt) / 4 - (P.kam || 0)], [nl + 1, -wt / 2], [nl + 1, wt / 2], [nl * 0.5, (wb + wt) / 4 + (P.keel || 0)], [-wb * 0.2, wb * 0.6]];
  _zV(ctx, N, P.nekK || P.kleur); if (P.nekPatroon) _zIn(ctx, N, () => P.nekPatroon(ctx, P, nl, wb, wt, Q)); ctx.restore();
  // 4 romp, dan de nabije poten, dan pas de vachttekening van de romp eroverheen: zo lopen schouder en dij naadloos in het lijf over
  inRomp(() => _zV(ctx, P.romp, P.kleur));
  const JA = poot(false, Q.voet.an, false), JV = poot(true, Q.voet.vn, false);
  if (P.rompPatroon) inRomp(() => _zIn(ctx, P.romp, () => P.rompPatroon(ctx, P, Q)));
  if (P.armLijn) { const sh = JV[1], el = JV[2], wr = JV[4], k = _dk(P.kleur, -0.0) && '#4E423A'; // deltaspier, elleboog, onderarm
    _zL(ctx, [[sh[0] + 6, sh[1] - 4], [sh[0] + 7, sh[1] + 8], [lerp(sh[0], el[0], 0.55) + 4, lerp(sh[1], el[1], 0.55)]], k, 1.2); _zL(ctx, [[el[0] - 5, el[1] - 4], [el[0] - 6.5, el[1] + 1], [el[0] - 4, el[1] + 5]], k, 1.2);
    _zL(ctx, [[el[0] + 4, el[1] + 3], [lerp(el[0], wr[0], 0.5) + 5, lerp(el[1], wr[1], 0.5)], [wr[0] + 3, wr[1] - 2]], k, 0.9); }
  if (P.spieren !== false) { // vorm van schouder en dij: voorrand van de dij (knie → heup), achterrand van de bil, schouderblad en elleboog
    const sk = P.spierK || _dk(P.kleur, 0.16), lwS = 0.9 * (P.spierDik || 1), h = JA[1], kn = JA[2], sc = JV[0], sh = JV[1], el = JV[2];
    if (Q.h === 'zitten' || Q.h === 'huilen') { const r = P.achter.w[1][1] * dk * 1.05; ctx.strokeStyle = sk; ctx.lineWidth = lwS; ctx.beginPath(); ctx.arc(h[0] + r * 0.15, h[1] + r * 0.05, r, -2.2, 0.35); ctx.stroke(); }
    else _zL(ctx, [[kn[0] + 2, kn[1] + 2], [lerp(kn[0], h[0], 0.5) + P.achter.w[1][0] * dk * 0.55, lerp(kn[1], h[1], 0.5)], [h[0] + P.achter.w[1][0] * dk * 0.4, h[1] - 4]], sk, lwS);
    _zL(ctx, [[el[0] - 5, el[1] - 5], [el[0] - 7, el[1] + 1], [el[0] - 3, el[1] + 5]], sk, lwS * 0.9); }
  if (P.naPoten) inRomp(() => P.naPoten(ctx, P, Q));
  if (P.manenF) P.manenF(ctx, P, Q, nb, na, lw);
  if (P.staartF && P.staartVoor) P.staartF(ctx, P, Q, TT(P.sw), lw);
  // 6 kop op het eind van de nek
  const poll = [nb[0] + Math.cos(na) * nl, nb[1] + Math.sin(na) * nl];
  ctx.save(); ctx.translate(poll[0], poll[1]); ctx.rotate(Q.kop); P.kopF(ctx, P, Q, lw); ctx.restore();
  _zNadruk(ctx, nadruk, E);
  ctx.restore(); return { E, Q }; }
// poot van een teenganger op F (grond), tenen naar voren; in de zwaai kantelen de tenen omlaag
function _zPootje(ctx, F, J, voor, kl, ver, P, lw) { const vl = P.voetL * (voor ? 1 : 0.92), ph = P.voetH; ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2] * 0.9 + (F[3] != null && !voor && P.h !== 0 ? 0 : 0));
  _zVoet(ctx, -vl * 0.22, vl, ph, kl, ver ? null : _dk(kl, 0.35), ver ? null : (P.nagel || '#2A2420'), lw * 1.2); ctx.restore(); }

// ================= HONDACHTIGEN: KOP =================
// kop in eigen assen: oorsprong = eind van de nek (achterhoofd), x naar de neus, y omlaag. K: sl schedel (achterhoofd → stop), ml snuit, sh schedelhoogte, mh snuithoogte,
// st stop, jd kaakdiepte, oog [x, y], oogR. Q.bek 0..1 opent de onderkaak rond het kaakgewricht.
function _zHondKop(ctx, P, Q, lw) { const K = P.kl, { sl, ml, sh, mh, st = 2, jd = 0 } = K, l = sl + ml, kk = P.kopK || P.kleur, lip = K.lip || 0;
  if (P.oorVer) P.oorVer(ctx, P, K, Q);
  if (P.wangKraag) P.wangKraag(ctx, P, K, Q);
  const boven = [[-3, sh * 0.3], [-1, -sh * 0.62], [sl * 0.35, -sh], [sl * 0.75, -sh * 0.93], [sl, -sh + st], [sl + ml * 0.45, -mh * 0.62], [l - 1.4, -mh * 0.5], [l, -mh * 0.12], [l - 0.4, mh * 0.28], [l - 2.2, mh * 0.5],
    [sl + ml * 0.35, mh * 0.55 + lip], [sl - ml * 0.08, mh * 0.5 + lip], [sl * 0.62, mh * 0.85 + jd * 0.6], [sl * 0.2, mh * 0.8 + jd], [-2, mh * 0.6 + jd * 0.8]];
  const onder = [[sl - ml * 0.1, mh * 0.42], [sl + ml * 0.4, mh * 0.48 + lip * 0.5], [l - 3.2, mh * 0.48], [l - 3.6, mh * 0.78], [sl + ml * 0.2, mh * 0.98 + jd * 0.4], [sl * 0.5, mh * 0.92 + jd * 0.8], [sl * 0.3, mh * 0.6]];
  const B = K.vorm ? K.vorm(boven) : boven, O = K.vormOnder ? K.vormOnder(onder) : onder;
  const scharnier = [sl * 0.32, mh * 0.45], bek = (Q.bek || 0) * (K.bekMax || 0.32);
  // onderkaak (draait open) en mondholte
  ctx.save(); ctx.translate(scharnier[0], scharnier[1]); ctx.rotate(bek); ctx.translate(-scharnier[0], -scharnier[1]); _zV(ctx, O, P.kaakK || kk); if (P.kaakPatroon) _zIn(ctx, O, () => P.kaakPatroon(ctx, P, K)); ctx.restore();
  if (bek > 0.01) { const r = (p) => { const dx = p[0] - scharnier[0], dy = p[1] - scharnier[1]; return [scharnier[0] + dx * Math.cos(bek) - dy * Math.sin(bek), scharnier[1] + dx * Math.sin(bek) + dy * Math.cos(bek)]; };
    _zV(ctx, [[sl * 0.6, mh * 0.5], [l - 2.4, mh * 0.45], r([l - 3.2, mh * 0.5]), r([sl + ml * 0.2, mh * 0.6])], '#3A1E1E'); }
  _zV(ctx, B, kk); _zIn(ctx, B, () => { if (P.kopPatroon) P.kopPatroon(ctx, P, K, Q); });
  // neus, mondlijn, oog
  const nx = l - 1.2, nk = P.neusK || '#1E1A18'; _zV(ctx, [[nx - mh * 0.3, -mh * 0.5], [nx + 1.1, -mh * 0.36], [nx + 1.45, mh * 0.04], [nx + 0.4, mh * 0.2], [nx - mh * 0.32, mh * 0.1], [nx - mh * 0.44, -mh * 0.2]], nk);
  circ(ctx, nx + 0.1, -mh * 0.02, mh * 0.08, _dk(nk, 0.5));
  if (bek < 0.01 && K.mond !== false) _zL(ctx, [[l - 2.3, mh * 0.44], [sl + ml * 0.5, mh * 0.5 + lip * 0.6], [sl + ml * 0.15, mh * 0.42 + lip * 0.5]], P.mondK || '#1E1A18', 0.75 * (K.lijn || 1));
  const [ox, oy] = K.oog || [sl * 0.8, -sh * 0.28]; const r = K.oogR || 1.6;
  if (K.oogLid !== false) _zV(ctx, [[ox - r * 1.9, oy + r * 0.3], [ox - r * 0.6, oy - r * 1.05], [ox + r * 1.2, oy - r * 0.6], [ox + r * 1.85, oy + r * 0.05], [ox + r * 0.6, oy + r * 0.95], [ox - r * 0.9, oy + r * 0.85]], P.lidK || '#1E1A18');
  _zOog(ctx, ox, oy, r, P.iris || '#3A2614', { pupil: 'rond' });
  if (P.oor) P.oor(ctx, P, K, Q); }
function _zOorRecht(kl, bin, h, b0, b1, kantel = -0.2, rond = 0.35) { return (ctx, P, K, Q) => { const sl = K.sl, sh = K.sh, kt = kantel - (Q && Q.oor ? 0.55 * Q.oor : 0), hh = h * (Q && Q.oor ? 0.9 : 1);
  const v = [b0 * sl, -sh * 0.84], w = [b1 * sl, -sh * 0.97], tip = [(b0 + b1) / 2 * sl + kt * hh, -sh - hh];
  const O = [v, [lerp(v[0], tip[0], 0.55) - hh * 0.1, lerp(v[1], tip[1], 0.55)], [tip[0] - hh * 0.07 * rond, tip[1] + hh * 0.06 * rond], [tip[0], tip[1], rond < 0.2 ? 1 : 0], [tip[0] + hh * 0.1 * rond, tip[1] + hh * 0.1 * rond], [lerp(w[0], tip[0], 0.45) + hh * 0.12, lerp(w[1], tip[1], 0.45)], w];
  _zV(ctx, O, kl); if (bin) _zV(ctx, [_zLerp(v, w, 0.28), _zLerp(v, tip, 0.8), _zLerp(_zLerp(v, w, 0.45), tip, 0.9), _zLerp(w, tip, 0.4), _zLerp(v, w, 0.72)], bin); }; }
function _zOorHang(kl, rand, lang, br = 1) { return (ctx, P, K) => { const sl = K.sl, sh = K.sh;
  const O = [[sl * 0.02, -sh * 0.92], [sl * 0.4, -sh * 0.98], [sl * 0.5 * br, -sh * 0.2], [sl * 0.5 * br, lang * 0.6], [sl * 0.36 * br, lang], [sl * 0.1, lang * 0.94], [-sl * 0.04, lang * 0.4], [-sl * 0.06, -sh * 0.3]];
  _zV(ctx, O, kl); if (rand) _zL(ctx, [[sl * 0.42, -sh * 0.5], [sl * 0.46 * br, lang * 0.55], [sl * 0.32 * br, lang * 0.95]], rand, 0.7); }; }

// ================= WOLF =================
// Opgezocht (bronnen in lessen_zoog.md): schofthoogte 60–80 cm, lijf (boeg–zitbeen) ±1,15 × schofthoogte; staart ±¼ van de totale lengte, hangt in rust recht omlaag
// tot ongeveer de hiel; borst smal en diep (borstbeen ±0,5 H), elleboog tegen de borst; lange poten, teenganger, voorvoet groter dan achtervoet;
// blokkige snuit met kleine stop, oren rechtop en vrij kort met afgeronde punt, ogen geel-amber en schuin; dikke hals- en wangkraag; donkere streep op de voorkant van de voorpoot.
var _zWOLF = { H: 80, L: 114, yb: 50, heup: [-45, -82], schouder: [53, -66], nekBasis: [44, -85], nekLen: 33, nekHoek: -0.92, nekDik: [34, 17], kam: 2.5, keel: 3, kopHoek: 0.32,
  voetX: [46, -50], verDx: 7, voetL: 12, voetH: 5.4, pas: 40, til: 9,
  voor: { a: 21, b: 36, dist: [[13, 0.3]], top: [-8, -16], w: [[9, 9], [10, 11], [7, 10.5], [5.6, 5.5], [4.6, 5.6], [4.4, 4.4]] },
  achter: { a: 31, b: 34, dist: [[26, 0.12]], top: [2, -5], w: [[11, 10], [15, 14.5], [8.5, 12], [6, 8], [4.3, 6.4], [4.3, 4.3]] },
  romp: [[-53, -94], [-42, -97.5], [-14, -98.2], [12, -98.4], [38, -100], [49, -100.5], [58, -91], [62, -79], [61.5, -68], [59, -60], [52, -52.5], [37, -50], [19, -51], [-8, -57.5], [-24, -60], [-36, -57], [-50, -55], [-58.5, -69], [-59.5, -83]],
  sw: [-55, -91],
  kl: { sl: 17.5, ml: 14, sh: 7.6, mh: 5.4, st: 1.2, jd: 2, oog: [15.4, -2.8], oogR: 1.25, lijn: 0.7 },
  kleur: '#8A847B', verK: '#5C5751', pootK: '#8A847B', kopK: '#958D82', iris: '#D29A32', neusK: '#191614', lidK: '#221E1B', voetK: '#B3A28A', verVoetK: '#5A544D', nagel: '#2A2420',
  staartF(ctx, P, Q, R) { const hk = { hang: [2.2, 1.82, 1.68, 1.62], loop: [2.45, 2.1, 1.95, 1.9], zit: [1.7, 0.45, 0.12, 0.04], lig: [2.7, 3.0, 3.12, 3.12] }[Q.staart];
    const pad = _zStaartPad(R, hk, [10, 16, 18, 14]); _zStaart(ctx, pad, [3.8, 5.6, 6.4, 5.6, 3.4], '#7C756B', { punt: '#24201D', puntR: 11, fn: (S) => {
      _zHaar(ctx, Math.min(...pad.map(p => p[0])) - 8, Math.min(...pad.map(p => p[1])) - 8, 60, 60, 40, '#5E574F', 2.4, Math.atan2(pad[4][1] - pad[0][1], pad[4][0] - pad[0][0]), 0.45, 7); } }); },
  oorVer(ctx, P, K, Q) { ctx.save(); ctx.translate(-2.6, 0.6); _zOorRecht('#5C5751', null, 9.5, 0.1, 0.5, -0.2)(ctx, P, K, Q); ctx.restore(); },
  oor: _zOorRecht('#857D73', '#D9D0C1', 9.8, 0.16, 0.58, -0.22),
  wangKraag(ctx, P, K) { _zV(ctx, [[3, -6], ..._zKam([-2.5, -4], [-4.5, 7], 3, 2.2, 11, 0.2), ..._zKam([-4.5, 7], [6, 11.5], 3, 2, 17, 0.2), [11, 8], [9, -3]], '#CBC2B1'); },
  kopPatroon(ctx, P, K) { const { sl, ml, sh, mh } = K, l = sl + ml;
    _zV(ctx, [[sl * 0.25, -sh * 1.1], [sl * 0.95, -sh * 1.0], [sl + ml * 0.6, -mh * 0.72], [l + 1, -mh * 0.6], [l + 1, -mh * 0.3], [sl + ml * 0.3, -mh * 0.3], [sl * 0.85, -sh * 0.58], [sl * 0.25, -sh * 0.62]], '#776F65');
    _zV(ctx, [[sl * 0.5, -sh * 0.1], [sl * 0.95, -sh * 0.08], [sl + ml * 0.5, mh * 0.08], [l - 1, mh * 0.28], [l, mh * 2], [-4, mh * 2.5], [-4, sh * 0.3], [sl * 0.2, -sh * 0.02]], '#DDD5C6');
    _zV(ctx, [[sl * 0.66, -sh * 0.64], [sl * 0.84, -sh * 0.68], [sl * 0.9, -sh * 0.54], [sl * 0.7, -sh * 0.5]], '#D3CABA');
    _zV(ctx, [[sl * 0.95, -sh * 0.3], [sl * 1.03, -sh * 0.12], [sl * 0.92, 0.6], [sl * 0.84, 0.2]], '#5C5650');
    _zHaar(ctx, -2, -sh, sl, sh * 1.1, 26, '#6A635A', 1.5, 0.2, 0.3, 3); },
  kaakPatroon(ctx, P, K) { _zV(ctx, [[-5, -5], [40, -5], [40, 20], [-5, 20]], '#DDD5C6'); },
  nekPatroon(ctx, P, nl, wb, wt, Q) { // donkere rugstreep, lichte keel, kraag van plukjes ertussen
    _zV(ctx, [[-20, -30], [nl + 4, -20], [nl + 4, -wt * 0.18], ..._zKam([nl * 0.75, -wt * 0.1], [-4, -wb * 0.12], 9, 2.2, 81, 0.25)], '#5E5852');
    _zV(ctx, [[nl + 4, wt * 0.12], [nl + 4, 30], [-20, 30], [-6, wb * 0.25], ..._zKam([nl * 0.2, wb * 0.14], [nl * 0.85, wt * 0.18], 7, 1.8, 91, 0.25).reverse()].reverse(), '#D9D0C0');
    _zHaar(ctx, -6, -wb * 0.5, nl + 8, wb, 40, '#9C9384', 2.6, 0.5, 0.45, 23); _zHaar(ctx, -6, -wb * 0.55, nl + 8, wb * 0.35, 30, '#46413C', 2.4, 0.4, 0.4, 29); },
  rompPatroon(ctx, P) { // zadel, warme flank, lichte buik met rafelige rand, haarstreken
    _zV(ctx, [[-64, -110], [64, -112], [64, -92], ..._zKam([52, -91], [36, -86], 3, 3, 21), ..._zKam([36, -86], [-26, -84], 15, 2.4, 31), ..._zKam([-26, -84], [-62, -80], 8, 2.2, 41)], '#5D5852');
    _zV(ctx, [[48, -86], [20, -82], [-30, -78], [-44, -70], [-30, -62], [10, -57], [44, -60]], '#988A75');
    _zV(ctx, [[66, -82], [66, -40], [-60, -40], [-56, -58], ..._zKam([-48, -60], [-10, -63], 9, 2, 61), ..._zKam([-10, -63], [40, -59], 13, 2, 51), ..._zKam([40, -59], [58, -78], 4, 2.2, 55)], '#D8D0C1');
    _zHaar(ctx, -60, -100, 116, 18, 110, '#47433E', 2.6, 2.95, 0.45, 5); _zHaar(ctx, -55, -84, 100, 24, 70, '#A39A8B', 2.3, 2.85, 0.4, 9); _zHaar(ctx, -40, -64, 90, 10, 40, '#BFB5A4', 1.9, 2.6, 0.35, 13);
  },
  pootPatroon(ctx, P, voor, J) { if (voor) { const [, , el, mid, wr] = J;
      _zV(ctx, [[el[0] - 20, el[1] + 1], [el[0] + 2, el[1] + 3], [wr[0] - 2, wr[1]], [wr[0] - 10, wr[1] + 30]], '#CDBFA8'); // lichte achterkant
      _zV(ctx, [[el[0] + 6, el[1] - 2], [mid[0] + 2.2, mid[1]], [wr[0] + 2, wr[1] + 1], [wr[0] + 8, wr[1] + 1], [mid[0] + 9, mid[1]], [el[0] + 12, el[1] - 2]], '#4E4842'); // donkere streep voorop
      _zV(ctx, [[wr[0] - 9, wr[1] + 4], ..._zKam([wr[0] - 7, wr[1] - 6], [wr[0] + 9, wr[1] + 2], 4, 1.6, 33), [wr[0] + 9, 6], [wr[0] - 9, 6]], '#B3A28A'); }
    else { const [, hp, kn, mid, hk] = J; _zV(ctx, [[hp[0] - 30, hp[1] + 14], [kn[0] - 6, kn[1] + 4], [hk[0] - 1.5, hk[1]], [hk[0] - 12, hk[1] + 2]], '#C4B59D');
      _zV(ctx, [[hk[0] - 9, hk[1] + 6], ..._zKam([hk[0] - 7, hk[1] - 2], [hk[0] + 9, hk[1] + 8], 4, 1.6, 37), [hk[0] + 9, 6], [hk[0] - 9, 6]], '#B3A28A');
      _zHaar(ctx, hp[0] - 16, hp[1] - 8, 30, 34, 34, '#6C645A', 2.2, 1.9, 0.5, 19); _zL(ctx, [[hp[0] + 9, hp[1] + 6], [kn[0] + 2, kn[1] - 4]], '#7A736A', 0.9); } },
  spierK: '#77716A',
  verPatroon(ctx, P, voor, J) { const e = J[4]; _zV(ctx, [[e[0] - 9, e[1] + 2], [e[0] + 9, e[1] + 2], [e[0] + 9, 6], [e[0] - 9, 6]], '#6C6358'); },
  voet: _zPootje, kopF: _zHondKop };
function wolf(ctx, x, y, s, o = {}) { return _zVier(ctx, x, y, s, _zWOLF, o); }

// ================= HONDENRASSEN (zelfde skelet als de wolf, andere maten) =================
// Bouwer: uit lengte L, kruishoogte cr, borstbeen yb, buiklijn tk, hiel en pols volgen de gewrichten; de botlengtes worden uit die gewrichten berekend,
// zodat de staande houding precies het ontwerp is en elke andere houding uit dezelfde botten volgt.
function _zHondBouw(p) {
  const L = p.L, xf = L / 2, xb = -L / 2, cr = p.cr ?? 97, yb = p.yb, tk = p.tk ?? yb + 9, hiel = p.hiel ?? yb * 0.54, wH = p.pols ?? yb * 0.26;
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const S = [xf - 4, -(yb + (100 - yb) * 0.32)], El = [xf - 16 + (p.elDx || 0), -yb], Wr = [xf - 14 + (p.polsDx || 0), -wH], Fv = [xf - 10 + (p.voetDx || 0), 0];
  const Hp = [xb + 12, -(cr - 15)], Kn = [xb + 26, -tk * 0.86], Hk = [xb + 2 + (p.hielDx || 0), -hiel], Fa = [xb + 5 + (p.hielDx || 0) * 0.6, 0];
  const t = p.dik || 1, vw = p.vw || 1;
  const romp = [[xb + 4, -cr + 3], [xb + 15, -cr], [xb + L * 0.38, -(cr + (100 - cr) * 0.45) + 0.6], [xf - L * 0.4, -98.6], [xf - 19, -100.2], [xf - 9, -101], [xf + 1, -93], [xf + 5, -(yb + (100 - yb) * 0.42)],
    [xf + 4.5, -(yb + (100 - yb) * 0.25)], [xf + 2, -(yb + (100 - yb) * 0.12)], [xf - 6, -yb - 2], [xf - 20, -yb], [xf - L * 0.33, -yb - 1], [xb + L * 0.42, -tk + 2], [xb + L * 0.29, -tk], [xb + L * 0.2, -tk + 3],
    [xb + 10, -Math.min(tk + 4, cr * 0.62)], [xb + 2, -cr * 0.66], [xb - 3.5, -cr * 0.76], [xb - 4.5, -cr * 0.86], [xb - 2, -cr * 0.94]];
  return Object.assign({ H: 60, L, yb, heup: Hp, schouder: S, romp, sw: [xb + 2, -cr + 4], voetX: [Fv[0], Fa[0]], verDx: 6, voetL: 11 * vw, voetH: 5 * vw, pas: yb * 0.8, til: yb * 0.17,
    nekBasis: [xf - 10, -(yb + (100 - yb) * 0.7)], nekLen: 30, nekHoek: -0.9, nekDik: [32, 17], kam: 1.5, keel: 2, kopHoek: 0.3,
    voor: { a: d(S, El), b: d(El, Wr) * 1.015, dist: [[d(Wr, Fv), Math.asin((Fv[0] - Wr[0]) / d(Wr, Fv))]], top: [-8, -15], w: [[9 * t, 9 * t], [10 * t, 11 * t], [6.5 * t, 9.5 * t], [5.2 * t, 5.2 * t], [4.4 * t, 5.2 * t], [4.2 * t, 4.2 * t]] },
    achter: { a: d(Hp, Kn), b: d(Kn, Hk), dist: [[d(Hk, Fa), Math.asin((Fa[0] - Hk[0]) / d(Hk, Fa))]], top: [2, -5], w: [[11 * t, 10 * t], [14 * t, 14 * t], [8 * t, 11 * t], [5.6 * t, 7.5 * t], [4.1 * t, 6 * t], [4.1 * t, 4.1 * t]] },
    zit: { hy: yb * 0.38, ax: yb * 0.4 }, lig: { vx: yb * 0.7, ax: yb * 0.48 },
    voet: _zPootje, kopF: _zHondKop, nagel: '#2A2420', neusK: '#151210', lidK: '#1E1A16' }, p, { kl: Object.assign({ lijn: 0.7 }, p.kl) }); }
const _zStaartSimpel = (kleur, hoeken, lens, breed, o = {}) => (ctx, P, Q, R) => { const hk = hoeken[Q.staart] || hoeken.hang; _zStaart(ctx, _zStaartPad(R, hk, lens), breed, kleur, o); };
var _zHONDEN = {
  // Duitse herder: 62 cm, lengte : hoogte 10 : 8,5; rug loopt af naar een laag kruis, hoekige achterhand (hiel laag), zwart zadel en zwart masker, grote spitse oren
  herder: _zHondBouw({ H: 62, L: 120, cr: 88, yb: 46, tk: 58, hiel: 22, hielDx: -6, dik: 0.95, nekLen: 32, nekHoek: -0.82, kopHoek: 0.38,
    kl: { sl: 18.5, ml: 17, sh: 7.4, mh: 5, st: 1.6, jd: 1.8, oog: [16, -2.4], oogR: 1.3 },
    kleur: '#B27A40', verK: '#7E5530', kopK: '#B27A40', voetK: '#C08A50', verVoetK: '#7A5230', iris: '#4A2E14',
    staartF: _zStaartSimpel('#3A2E26', { hang: [2.15, 1.75, 1.62, 1.9], loop: [2.4, 2.0, 1.85, 2.0], zit: [1.7, 0.5, 0.1, 0.05], lig: [2.7, 3.0, 3.1, 3.1] }, [10, 16, 18, 12], [3.4, 5, 5.8, 5, 3], { fn: () => {} }),
    oorVer: (ctx, P, K, Q) => { ctx.save(); ctx.translate(-2.4, 0.5); _zOorRecht('#1E1A17', null, 12.5, 0.1, 0.5, -0.25, 0.1)(ctx, P, K, Q); ctx.restore(); },
    oor: _zOorRecht('#2A2420', '#6A4A30', 12.5, 0.14, 0.58, -0.25, 0.1),
    kopPatroon(ctx, P, K) { const { sl, ml, sh, mh } = K, l = sl + ml; _zV(ctx, [[sl * 0.55, -sh * 1.2], [l + 2, -mh * 1.5], [l + 2, mh * 2], [sl * 0.7, mh * 2], [sl * 0.62, -sh * 0.1]], '#2A2420'); // zwart masker over de snuit
      _zV(ctx, [[-4, -sh * 1.2], [sl * 0.7, -sh * 1.2], [sl * 0.6, -sh * 0.45], [-4, -sh * 0.3]], '#5A3E28'); _zV(ctx, [[sl * 0.66, -sh * 0.62], [sl * 0.8, -sh * 0.66], [sl * 0.82, -sh * 0.5], [sl * 0.68, -sh * 0.48]], '#C8925A'); },
    kaakPatroon(ctx) { _zV(ctx, [[-5, -5], [40, -5], [40, 20], [-5, 20]], '#3A2A20'); },
    nekPatroon(ctx, P, nl, wb, wt) { _zV(ctx, [[-20, -30], [nl + 4, -20], [nl + 4, -wt * 0.25], [nl * 0.5, -wb * 0.05], [-4, -wb * 0.1]], '#2A2420'); _zHaar(ctx, -6, -wb * 0.5, nl + 8, wb, 26, '#8E6236', 2.2, 0.5, 0.4, 23); },
    rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; // zwart zadel als een deken over de rug, tot de staartwortel
      _zV(ctx, [[xb - 6, -100], [xf + 2, -110], [xf, -96], ..._zKam([xf - 10, -92], [xf - 26, -76], 4, 1.8, 21), ..._zKam([xf - 26, -76], [xb + 30, -72], 12, 2, 31), ..._zKam([xb + 30, -72], [xb - 2, -76], 5, 1.8, 41)], '#2A2420');
      _zV(ctx, [[xf + 8, -70], [xf - 10, -48], [xb + 30, -55], [xb + 30, -40], [xf + 8, -40]], '#C99A62'); _zHaar(ctx, xb, -98, L, 26, 70, '#3E3530', 2.2, 2.95, 0.4, 5); _zHaar(ctx, xb + 10, -70, L - 20, 16, 40, '#9C6A38', 2, 2.8, 0.4, 9); },
    pootPatroon(ctx, P, voor, J) { if (!voor) { const [, hp, kn] = J; _zL(ctx, [[hp[0] + 8, hp[1] + 6], [kn[0] + 1, kn[1] - 4]], '#8E6236', 0.8); } } }),
  // Teckel: ±23 cm, lijf ±2 × zo lang als hoog, borstbeen op ±⅓ van de schofthoogte (bodemvrij ±¼–⅓), korte krachtige poten, voorpoten iets om de borst gebogen,
  // lange kop met weinig stop, lange afgeronde hangoren hoog en ver naar achteren aangezet, staart in het verlengde van de rug
  teckel: _zHondBouw({ H: 23, L: 168, cr: 96, yb: 30, tk: 50, hiel: 16, pols: 7, dik: 1.15, vw: 1.3, elDx: -3, polsDx: 1, voetDx: 5, nekLen: 26, nekHoek: -0.62, nekDik: [36, 22], kopHoek: 0.18,
    kl: { sl: 30, ml: 27, sh: 12, mh: 7.5, st: 2.5, jd: 2.5, oog: [26, -4], oogR: 2.3 }, zit: { hy: 13, ax: 12, rot: -0.55 }, lig: { vx: 22, ax: 16, buik: 3 },
    kleur: '#A0522A', verK: '#6E3818', kopK: '#A0522A', voetK: '#9A4E26', verVoetK: '#6A3618', iris: '#3A2010', pas: 26, til: 6,
    staartF: _zStaartSimpel('#94491F', { hang: [2.85, 2.6, 2.4], loop: [3.3, 3.2, 3.0], zit: [1.9, 0.8, 0.3], lig: [2.9, 3.05, 3.1] }, [14, 16, 14], [5.5, 5, 3.8, 1.8]),
    oor: _zOorHang('#7E3E1C', '#6A3416', 16, 1.0),
    kopPatroon(ctx, P, K) { _zHaar(ctx, -2, -K.sh, K.sl + K.ml, K.sh * 2, 30, '#8A4420', 2.2, 0.15, 0.3, 3); },
    rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xb - 5, -104], [xf + 4, -106], [xf, -94], [xb + 20, -90], [xb - 5, -88]], '#8E4520'); _zV(ctx, [[xf + 8, -60], [xf - 20, -32], [xb + 40, -36], [xb + 40, -20], [xf + 8, -20]], '#B4683A');
      _zHaar(ctx, xb, -100, L, 60, 90, '#8A421E', 2.6, 3.0, 0.3, 5); } }),
  // Mops: 25–33 cm, vierkant en gedrongen (lengte ≈ hoogte), brede diepe borst, rechte stevige poten; ronde kop met zeer korte platte snuit (brachycefaal), diepe rimpels,
  // grote ronde donkere ogen, kleine zwarte knoop-/rozeoortjes, zwart masker, krulstaart strak over de heup
  mops: _zHondBouw({ H: 29, L: 96, cr: 98, yb: 44, tk: 54, hiel: 23, dik: 1.0, spierDik: 1.2, vw: 1.15, nekLen: 17, nekHoek: -1.05, nekDik: [32, 25], nekBasis: [38, -86], kopHoek: 0.05, kam: 1, keel: 3,
    kl: { sl: 27, ml: 5, sh: 15, mh: 9, st: 6, jd: 3, oog: [21, -4.5], oogR: 3.6, oogLid: false, mond: false, bekMax: 0.2,
      vorm: () => [[-4, 4], [-3, -9], [6, -15.5], [16, -16], [24, -12], [28, -6], [31, -3.5], [32.5, 0.5], [31.5, 4.5], [29, 7.5], [24, 10.5], [14, 12.5], [4, 12], [-3, 9]],
      vormOnder: () => [[22, 7], [29, 8], [30.5, 10.5], [27, 13], [18, 13.5], [12, 11]] },
    zit: { rot: -0.95, krimp: 0.72, ax: 15 }, lig: { vx: 30, ax: 20 },
    kleur: '#CDB287', verK: '#9E8762', kopK: '#CDB287', voetK: '#C8AC80', verVoetK: '#9A835E', iris: '#1E140C', neusK: '#151210', pas: 30,
    kopF(ctx, P, Q, lw) { ctx.save(); ctx.scale(0.95, 0.95); _zHondKop(ctx, P, Q, lw); ctx.restore(); },
    staartVoor: true, staartF(ctx, P, Q, R) { if (Q.staart === 'lig' || Q.staart === 'zit') return; const c = [R[0] + 5, R[1] - 9]; // strakke krul op de heup
      ctx.strokeStyle = '#B89C70'; ctx.lineWidth = 6.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(c[0], c[1], 7, 0.9, 5.6); ctx.stroke(); ctx.strokeStyle = '#A88C62'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(c[0], c[1], 7, 1.5, 5.0); ctx.stroke(); },
    oorVer: () => {}, oor(ctx, P, K) { _zV(ctx, [[3, -13.5], [11, -16.5], [14, -12], [10, -7], [5, -8.5]], '#26201C'); _zL(ctx, [[5, -12.5], [10, -11]], '#3E342C', 0.8); }, // knoopoor, valt naar voren
    kopPatroon(ctx, P, K) { _zV(ctx, [[17, -10], [26, -12], [36, -10], [36, 16], [20, 16], [15, 4]], '#2A2420'); // zwart masker
      _zV(ctx, [[16.5, -8.5], [21, -9.5], [25, -6.5], [22.5, -1.5], [17, -2.5]], '#1E1A16'); // donker rond het oog
      for (const [a, b, c] of [[[8, -12], [14, -14], [20, -13.5]], [[11, -9], [16, -10.5], [21, -10]], [[24, -4], [27, -6], [29, -4.5]], [[25, 1], [28, -0.5], [30, 1.5]]]) _zL(ctx, [a, b, c], '#8E7A58', 0.9); },
    kaakPatroon(ctx) { _zV(ctx, [[0, 0], [40, 0], [40, 20], [0, 20]], '#2A2420'); },
    nekPatroon(ctx, P, nl, wb) { for (let i = 0; i < 3; i++) _zL(ctx, [[nl * 0.2 + i * 3, wb * 0.15], [nl * 0.35 + i * 3, wb * 0.3], [nl * 0.3 + i * 3, wb * 0.45]], '#B49A70', 0.9); },
    rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zL(ctx, [[xb + 6, -97], [0, -99], [xf - 10, -100]], '#6E5E46', 2.2); _zV(ctx, [[xf + 8, -66], [xf - 14, -44], [xb + 30, -50], [xb + 30, -30], [xf + 8, -30]], '#DCC8A2'); } }),
  // Chihuahua: 15–23 cm, iets langer dan hoog, appelvormige kop (gewelfde schedel, stop bijna 90°), korte spitse snuit, grote ronde ogen, zeer grote rechtopstaande oren
  // die schuin opzij staan, fijne rechte poten, sikkelstaart boven de rug
  chihuahua: _zHondBouw({ H: 20, L: 108, cr: 97, yb: 50, tk: 62, hiel: 27, dik: 0.72, vw: 0.85, nekLen: 19, nekHoek: -1.0, nekDik: [26, 15], kopHoek: 0.25,
    kl: { sl: 22, ml: 10, sh: 14, mh: 4.6, st: 7, jd: 1.5, oog: [19, -3.6], oogR: 3, oogLid: false,
      vorm: (B) => [[-3, 4], [-3, -9], [5, -15], [14, -15.5], [20, -12], [22.5, -6.5], [27, -3.8], [31, -2.6], [32, 0], [31.5, 2], [29.5, 2.8], [26, 3.2], [21, 3.4], [16, 6], [8, 7.5], [-2, 6.5]],
      vormOnder: () => [[20, 2.5], [27, 3], [29, 3.4], [27.5, 5], [20, 5.6], [15, 5]] },
    kleur: '#D9B37C', verK: '#A88656', kopK: '#D9B37C', voetK: '#DCB880', verVoetK: '#A68454', iris: '#20140A', neusK: '#2A1E1A', pas: 34,
    staartF: _zStaartSimpel('#CDA46C', { hang: [-2.3, -1.5, -0.6], loop: [-2.1, -1.2, -0.3], zit: [1.7, 0.4, 0.1], lig: [2.8, 3.0, 3.1] }, [10, 12, 10], [2.6, 2.6, 2.2, 1.2]),
    oorVer: (ctx, P, K, Q) => { ctx.save(); ctx.translate(-2, 1); _zOorRecht('#B08A58', null, 21, 0.0, 0.5, -0.5, 0.45)(ctx, P, K, Q); ctx.restore(); },
    oor: _zOorRecht('#D9B37C', '#E8B8A2', 22, 0.1, 0.62, -0.42, 0.45),
    kopPatroon(ctx, P, K) { _zV(ctx, [[15, 0.5], [24, 1], [31, 1.5], [31, 8], [8, 8]], '#ECD4AC'); },
    rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xf + 8, -76], [xf - 12, -50], [xb + 30, -58], [xb + 30, -40], [xf + 8, -40]], '#ECD4AC'); _zV(ctx, [[xb - 4, -104], [xf, -106], [xf - 10, -97], [xb + 10, -95]], '#C9A06A'); } }),
};
function hond(ctx, ras, x, y, s, o = {}) { return _zVier(ctx, x, y, s, _zHONDEN[ras] || _zHONDEN.herder, o); }

// ================= PAARDACHTIGEN: paard, ezel, muilezel =================
// Opgezocht (bronnen in lessen_zoog.md): paard ≈ vierkant (schofthoogte = lengte boeg–zitbeen); hals ≈ 1,5 × hoofdlengte; rug en kruis elk ±⅓ van de lengte;
// borstdiepte (schoft–singel) ≈ elleboog–kogel; spronggewricht op de hoogte van de kastanje van de voorpoot (±0,33 H); koot en schouder ±45–55° t.o.v. de grond;
// achterpijp langer dan voorpijp. Ezel: grotere kop t.o.v. het lijf, oren ±25 cm, rechtopstaande korte manen, kwaststaart, smalle steile hoeven, rechte rug zonder schoft,
// lichte snuit, oogring en buik, aalstreep en schouderkruis. Muilezel (paardenhengst × ezelin): paardenlijf, oren tussen paard en ezel, ezelachtige kop en staart.
// Bekende fouten: hiel (sprong) op de plek van de knie, hoef als stip, ezel als verkleind paard.
function _zHoef(ctx, F, J, voor, kl, ver, P, lw) { const hw = P.hoefB * (voor ? 1 : 0.95), hh = P.hoefH; ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2] * 1.0);
  const Hf = [[-hw * 0.55, -hh * 0.8], [hw * 0.15, -hh, 1], [hw * 0.72, 0, 1], [-hw * 0.6, 0, 1]]; ctx.beginPath(); Hf.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
  ctx.fillStyle = ver ? _dk(P.hoefK, 0.25) : P.hoefK; ctx.fill(); if (!ver) { ctx.strokeStyle = _lt(P.hoefK, 0.3); ctx.lineWidth = lw * 2.2; ctx.beginPath(); ctx.moveTo(-hw * 0.55, -hh * 0.82); ctx.lineTo(hw * 0.14, -hh * 1.0); ctx.stroke();
    ctx.strokeStyle = _lt(P.hoefK, 0.12); ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(hw * 0.05, -hh * 0.8); ctx.lineTo(hw * 0.55, -hh * 0.05); ctx.stroke(); }
  ctx.restore(); }
function _zPaardKop(ctx, P, Q, lw) { const K = P.kl, k = K.l / 38, kk = P.kopK || P.kleur; ctx.save(); ctx.translate(-2, -P.nekDik[1] / 2 + 6.6 * k * (K.dik || 1)); ctx.scale(k, k * (K.dik || 1)); // achterhoofd op de bovenrand van de hals
  const kop = K.vorm || [[-2, 2], [0, -6.5], [8, -7.6], [13, -7.2], [24, -5.8], [33, -4.4], [37.6, -3], [39.6, 0], [39.2, 3], [36.6, 4.4], [33.8, 4], [34.6, 5.8], [30, 6.8], [22, 6.6], [13, 9.6], [6, 10.4], [1, 8]];
  if (P.oorF) P.oorF(ctx, P, K, true, Q);
  _zV(ctx, kop, kk); _zIn(ctx, kop, () => { if (P.kopPatroon) P.kopPatroon(ctx, P, K); _zL(ctx, [[9, 9.4], [12, 4], [18, 2.6], [26, 3]], _dk(kk, 0.14), 0.7); }); // kaakrand
  _zV(ctx, [[36.2, -1.4], [37.8, -2], [38.6, -0.6], [37.6, 1], [36.6, 0.6]], _dk(P.snuitK || kk, 0.55)); // neusgat
  _zL(ctx, [[39, 2.6], [36.5, 3.4], [34.2, 3.6]], _dk(P.snuitK || kk, 0.5), 0.6);
  _zOog(ctx, 11.5, -3.3, K.oogR || 1.5, P.iris || '#2A1A10', { pupil: 'liggend', rand: P.oogRand || null });
  _zL(ctx, [[9.6, -5.2], [11.5, -5.6], [13.6, -5]], _dk(kk, 0.3), 0.6); // wenkbrauwboog
  if (P.oorF) P.oorF(ctx, P, K, false, Q);
  if (P.voorlok) _zV(ctx, [[-1, -7], [4, -8.2], ..._zKam([4, -8.2], [9, -2], 3, 1.2, 5)], P.manenK);
  ctx.restore(); }
function _zOorPaard(kl, bin, h, br = 3) { return (ctx, P, K, ver, Q) => { const tip = [1 - (Q && Q.h === 'grazen' ? 0 : 1.5) - h * 0.12, -6.5 - h], b0 = [-0.8 - br * 0.2, -5.2], b1 = [2.6 + br * 0.55, -7.2];
  ctx.save(); if (ver) { ctx.translate(-1.8, 0.6); ctx.rotate(-0.12); } const O = [b0, [b0[0] - br * 0.35, lerp(b0[1], tip[1], 0.55)], [tip[0], tip[1], 1], [b1[0] + br * 0.15, lerp(b1[1], tip[1], 0.5)], b1];
  _zV(ctx, O, ver ? _dk(kl, 0.25) : kl); if (!ver && bin) _zV(ctx, [_zLerp(b0, b1, 0.35), _zLerp(_zLerp(b0, b1, 0.3), tip, 0.82), _zLerp(b1, tip, 0.35)], bin); ctx.restore(); }; }
function _zPaardBouw(p) {
  const L = p.L || 100, xf = L / 2, xb = -L / 2, yb = p.yb ?? 50, cr = p.cr ?? 99, sch = p.schoft ?? 3, d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const S = [xf - 4, -64], El = [xf - 12, -yb], Kn = [xf - 11, -28], Fv = [xf - 6, 0];
  const Hp = [xb + 14, -(cr - 19)], St = [xb + 26, -yb - 4], Hk = [xb + 7 + (p.hielDx || 0), -(p.sprong ?? 33)], Fa = [xb + 11 + (p.hielDx || 0) * 0.5, 0];
  const pk = p.koot ?? 8, pa = p.kootHoek ?? 0.68, kv = (F, a) => [F[0] - Math.sin(a) * pk, -Math.cos(a) * pk];
  const KgV = kv(Fv, pa), KgA = kv(Fa, pa - 0.05), t = p.dik || 1;
  const romp = [[xb + 2, -cr + 4], [xb + 12, -cr], [xb + 30, -cr + 1], [-6, -96 + (p.rugZak || 0)], [xf - 26, -98], [xf - 18, -100 - sch], [xf - 8, -96], [xf + 3, -80], [xf + 4.5, -70], [xf + 2, -62],
    [xf - 6, -yb - 1.5], [xf - 22, -yb], [-6, -yb - 0.5 - (p.buik || 0)], [xb + 30, -yb - 2], [xb + 20, -yb - 5], [xb + 9, -62], [xb + 1, -70], [xb - 4, -79], [xb - 5, -88], [xb - 2, -cr + 6]];
  return Object.assign({ L, yb, heup: Hp, schouder: S, romp, sw: [xb + 1, -cr + 2], voetX: [Fv[0], Fa[0]], verDx: 10, pas: 44, til: 9,
    nekBasis: [xf - 10, -84], nekLen: 50, nekHoek: -0.95, nekDik: [38, 18], kam: 3, keel: 1, kopHoek: 1.05, graas: { nek: 1.15, kop: 1.65, vx: 4 },
    voor: { a: d(S, El), b: d(El, Kn) * 1.01, dist: [[pk, pa], [d(KgV, Kn) / 2, Math.asin((KgV[0] - Kn[0]) / d(KgV, Kn))], [d(KgV, Kn) / 2, Math.asin((KgV[0] - Kn[0]) / d(KgV, Kn))]], top: [-10, -20], flex: [-1.2, -0.9, -0.9],
      w: [[11 * t, 11 * t], [11 * t, 12 * t], [6.5 * t, 9 * t], [4.4 * t, 4.2 * t], [3.2 * t, 3.4 * t], [2.2 * t, 2.5 * t], [2.1 * t, 3.5 * t], [1.6 * t, 2 * t]] },
    achter: { a: d(Hp, St), b: d(St, Hk), dist: [[pk, pa - 0.05], [d(KgA, Hk) / 2, Math.asin((KgA[0] - Hk[0]) / d(KgA, Hk))], [d(KgA, Hk) / 2, Math.asin((KgA[0] - Hk[0]) / d(KgA, Hk))]], top: [4, -6], flex: [-1.0, -0.5, -0.5],
      w: [[12 * t, 12 * t], [15 * t, 15 * t], [8 * t, 10 * t], [4.8 * t, 6 * t], [2.8 * t, 4.6 * t], [2.3 * t, 2.7 * t], [2.1 * t, 3.5 * t], [1.6 * t, 2 * t]] },
    voet: _zHoef, kopF: _zPaardKop, hoefB: 7.5, hoefH: 5, voorlok: true }, p); }
// manen langs de halskam (in het assenstelsel van de nek) en de staart
function _zManen(kl, hoog, rechtop = false) { return (ctx, P, Q, nb, na) => { const nl = P.nekLen, wb = P.nekDik[0], wt = P.nekDik[1]; ctx.save(); ctx.translate(nb[0], nb[1]); ctx.rotate(na);
  const kamY = (u) => -lerp(wb * 0.48, wt * 0.5, u) - (P.kam || 0) * Math.sin(Math.PI * u) * 0.9;
  const A = []; for (let i = 0; i <= 8; i++) { const u = i / 8; A.push([lerp(-wb * 0.2, nl + 1, u), kamY(u) + (rechtop ? 2.5 : 0.8)]); }
  const B = []; for (let i = 8; i >= 0; i--) { const u = i / 8, xx = lerp(-wb * 0.2, nl + 1, u);
    if (rechtop) { B.push([xx - 1, kamY(u) - hoog * (0.85 + 0.2 * hash(i * 3.1))]); B.push([xx - 2.4, kamY(u) - hoog * 0.7]); }
    else { B.push([xx + 1.5, kamY(u) + hoog * (0.75 + 0.45 * hash(i * 3.1)), 1]); B.push([xx - 1.2, kamY(u) + hoog * 0.5]); } }
  if (!rechtop) { for (const p of A) p[1] -= 2.2; }
  _zV(ctx, [...A, ...B], kl); ctx.restore(); }; }
function _zPaardStaart(kl, lang, kwast = null) { return (ctx, P, Q, R) => { const zw = { hang: 0, loop: 0.12, zit: 0, lig: 0.4 }[Q.staart] || 0;
  const dock = _zStaartPad(R, [2.2 + zw, 1.95 + zw], [7, 8]); // staartwortel (dok)
  if (kwast) { const pad = _zStaartPad(R, [2.15 + zw, 1.8 + zw, 1.65 + zw], [10, 14, 12]); _zStaart(ctx, pad, [3, 2.6, 2, 1.8], P.kleur); const e = pad[3];
    _zV(ctx, [[e[0] - 1.5, e[1] - 6], [e[0] + 2.5, e[1] - 6], ..._zKam([e[0] + 3, e[1] + 2], [e[0] - 3, e[1] + 2], 4, 3, 5)], kwast); return; }
  const e = dock[2], v = lang; const S = [[R[0] + 2, R[1] - 2], [R[0] - 5, R[1] - 1], [e[0] - 5, e[1] + 4], [e[0] - 6 - zw * 10, e[1] + v * 0.55], ..._zKam([e[0] - 4 - zw * 14, e[1] + v], [e[0] + 6 - zw * 12, e[1] + v * 0.96], 4, 2.5, 3), [e[0] + 3, e[1] + v * 0.5], [e[0] + 2, e[1]], [R[0] + 3, R[1] + 4]];
  _zV(ctx, S, kl); _zIn(ctx, S, () => _zHaar(ctx, e[0] - 10, R[1], 16, v + 6, 22, _lt(kl, 0.12), 6, 1.62 + zw, 0.6, 3)); }; }
var _zPAARD = _zPaardBouw({ H: 160, kleur: '#8E5A38', verK: '#5E3B24', pootK: '#8E5A38', kopK: '#8E5A38', hoefK: '#4E443C', manenK: '#1C1612', snuitK: '#6E4630', iris: '#2A1A10',
  kl: { l: 41, oogR: 1.55, dik: 1.06 }, oorF: _zOorPaard('#8E5A38', '#4A2E1E', 8, 3),
  manenF: _zManen('#1C1612', 7), staartF: _zPaardStaart('#1C1612', 46),
  kopPatroon(ctx) { _zV(ctx, [[14, -7.6], [20, -7.4], [32, -5.2], [37, -3.6], [37, -2.2], [31, -3.8], [19, -6], [14, -6.4]], '#E8DECD'); }, // bles
  rompPatroon(ctx, P) { _zV(ctx, [[-60, -66], [-30, -52], [20, -52], [44, -60], [60, -40], [-60, -40]], '#9C6844'); _zHaar(ctx, -50, -98, 100, 40, 40, '#7C4E30', 3, 3.0, 0.3, 5); },
  pootPatroon(ctx, P, voor, J) { const k = J[4], kg = J[6]; _zV(ctx, [[k[0] - 12, k[1] + (voor ? 1 : -3)], ..._zKam([k[0] - 8, k[1] - (voor ? 3 : 7)], [k[0] + 10, k[1] - (voor ? 1 : 4)], 4, 1.4, 21), [k[0] + 12, 8], [k[0] - 12, 8]], '#1C1612'); // zwarte onderbenen (bruin paard)
    _zL(ctx, [[k[0] - 1.6, k[1] + 4], [kg[0] - 2.4, kg[1] - 3], [kg[0] - 1.2, kg[1] + 1.5]], '#3A302A', 0.7); }, // pees tot de kogel
  verPatroon(ctx, P, voor, J) { const k = J[4]; _zV(ctx, [[k[0] - 12, k[1] - 3], [k[0] + 12, k[1] - 3], [k[0] + 12, 8], [k[0] - 12, 8]], '#14100D'); } });
var _zEZEL = _zPaardBouw({ H: 110, L: 104, schoft: 0.5, rugZak: 0.5, buik: 2, sprong: 34, kootHoek: 0.48, koot: 7, dik: 1.1, nekLen: 40, nekHoek: -0.8, nekDik: [50, 30], kam: 2.5, keel: 3, kopHoek: 1.0,
  kleur: '#8C8781', verK: '#5E5A55', pootK: '#8C8781', kopK: '#8C8781', hoefK: '#2E2824', manenK: '#3A3430', snuitK: '#E4DED2', iris: '#24180E', oogRand: '#E4DED2', voorlok: false,
  hoefB: 6, hoefH: 5.4, graas: { nek: 1.0, kop: 1.6, vx: 4 },
  kl: { l: 48, dik: 1.12, oogR: 1.5 }, oorF: _zOorPaard('#8C8781', '#3A3430', 21, 5.5),
  manenF: _zManen('#3E3833', 5.5, true), staartF: _zPaardStaart('#2E2A26', 0, '#2E2A26'),
  kopPatroon(ctx) { _zV(ctx, [[30, -6], [42, -5], [42, 9], [28, 9], [27, 2]], '#E4DED2'); _zL(ctx, [[30, -5.5], [28.5, 1], [30, 7]], '#C8C2B6', 0.6); }, // lichte meelsnuit
  rompPatroon(ctx, P) { _zV(ctx, [[-60, -64], [-30, -56], [10, -55], [42, -60], [60, -40], [-60, -40]], '#E4DED2'); // lichte buik
    _zL(ctx, [[-52, -97], [-10, -96], [30, -98]], '#3A3430', 2.6); _zL(ctx, [[33, -98], [37, -88], [39, -78]], '#3A3430', 2.2); // aalstreep en schouderkruis
    _zHaar(ctx, -50, -98, 100, 40, 50, '#76716B', 2.6, 3.0, 0.3, 5); },
  pootPatroon(ctx, P, voor, J) { const k = J[4]; _zV(ctx, [[k[0] - 12, k[1] - 14], [k[0] + 12, k[1] - 14], [k[0] + 12, 8], [k[0] - 12, 8]], '#D6D0C4'); // lichte onderbenen
    if (voor) for (let i = 0; i < 3; i++) _zL(ctx, [[J[3][0] - 4, J[3][1] + i * 2.4 - 2], [J[3][0] + 4, J[3][1] + i * 2.4 - 3]], '#6A655F', 0.8); } }); // zebrastreepjes op de voorbenen
var _zMUILEZEL = _zPaardBouw({ H: 130, L: 102, schoft: 1.5, sprong: 34, kootHoek: 0.58, koot: 7.5, dik: 1.05, nekLen: 44, nekHoek: -0.88, nekDik: [46, 26], kam: 2.5, keel: 2, kopHoek: 1.02,
  kleur: '#6C4C38', verK: '#47321F', pootK: '#6C4C38', kopK: '#6C4C38', hoefK: '#2A2420', manenK: '#2A201A', snuitK: '#B89C82', iris: '#24180E', oogRand: '#A48A72', voorlok: false,
  hoefB: 6.6, hoefH: 5.2,
  kl: { l: 43, dik: 1.06, oogR: 1.5 }, oorF: _zOorPaard('#6C4C38', '#2E2018', 15, 4.5),
  manenF: _zManen('#2A201A', 4.5, true), staartF: (ctx, P, Q, R) => { // staart: korte haren bovenaan, lange haren vanaf halverwege (tussen paard en ezel in)
    const zw = Q.staart === 'loop' ? 0.12 : 0; const pad = _zStaartPad(R, [2.15 + zw, 1.85 + zw], [8, 10]); _zStaart(ctx, pad, [3, 2.8, 2.4], P.kleur); const e = pad[2];
    _zV(ctx, [[e[0] - 2.5, e[1] - 4], [e[0] + 3, e[1] - 4], [e[0] + 4, e[1] + 14], ..._zKam([e[0] + 3, e[1] + 26], [e[0] - 5, e[1] + 25], 4, 2.5, 3), [e[0] - 4, e[1] + 10]], '#2A201A'); },
  kopPatroon(ctx) { _zV(ctx, [[30, -6], [42, -5], [42, 9], [28, 9], [27, 2]], '#A48A72'); },
  rompPatroon(ctx, P) { _zV(ctx, [[-60, -62], [-30, -54], [10, -54], [42, -60], [60, -40], [-60, -40]], '#9A7A62'); _zL(ctx, [[-52, -97], [-10, -96], [30, -99]], '#47321F', 2); _zHaar(ctx, -50, -98, 100, 40, 40, '#5A3E2C', 2.8, 3.0, 0.3, 5); },
  pootPatroon(ctx, P, voor, J) { const k = J[4]; _zV(ctx, [[k[0] - 12, k[1] - 6], [k[0] + 12, k[1] - 6], [k[0] + 12, 8], [k[0] - 12, 8]], '#4A3324'); } });
function paard(ctx, x, y, s, o = {}) { return _zVier(ctx, x, y, s, _zPAARD, o); }
function ezel(ctx, x, y, s, o = {}) { return _zVier(ctx, x, y, s, _zEZEL, o); }
function muilezel(ctx, x, y, s, o = {}) { return _zVier(ctx, x, y, s, _zMUILEZEL, o); }

// ================= KATACHTIGEN: jachtluipaard, leeuw, tijger, huiskat =================
// Opgezocht (bronnen in lessen_zoog.md): jachtluipaard lijf 112–135 cm, staart 66–84 cm, schofthoogte ±80 cm; kleine ronde kop met korte snuit, lange dunne poten,
// diepe borst en smalle 'wespentaille', holle (soepele) rug, massieve zwarte stippen, zwarte traanstreep van ooghoek naar bovenlip, staart met zwarte ringen en witte punt,
// stompe nagels die niet intrekken. Leeuw: schofthoogte ♂ ±123 cm, kop-romp 172–250 cm, staart iets meer dan de helft daarvan met zwarte kwast; manen over kop, hals en borst;
// kleine ronde oren met zwarte achterkant; lichte buik met hangende buikplooi. Tijger: kop-romp ♂ 189–300 cm, staart < ½ daarvan, verticale zwarte strepen over lijf,
// poten, kop en staart, zwarte oren met witte vlek, witte wangen. Huiskat: ±25 cm schofthoogte, grotere kop t.o.v. lijf, driehoekige oren, spleetpupil. Allemaal teengangers
// (elleboog tegen de borst, hiel hoog), achterpoten iets langer, rug soepel; staart in rust laag met de punt omhoog.
function _zKatKop(ctx, P, Q, lw) { const K = P.kl, { sl, ml, sh, mh, jd = 1 } = K, l = sl + ml, kk = P.kopK || P.kleur;
  if (P.kraagF) P.kraagF(ctx, P, K, Q);
  const oor = (ver) => { const [b0, b1, h, kt] = K.oorB; ctx.save(); if (ver) ctx.translate(-K.sl * 0.18, 0.4);
    const v = [b0 * sl, -sh * 0.86], w = [b1 * sl, -sh * 0.98], tip = [(b0 + b1) / 2 * sl + kt * h, -sh - h], rond = K.oorRond ?? 1;
    const O = rond > 0.5 ? [v, [v[0] - h * 0.25, lerp(v[1], tip[1], 0.7)], [tip[0] - h * 0.2, tip[1] + h * 0.05], [tip[0] + h * 0.25, tip[1] + h * 0.08], [w[0] + h * 0.15, lerp(w[1], tip[1], 0.6)], w]
      : [v, [lerp(v[0], tip[0], 0.5) - h * 0.08, lerp(v[1], tip[1], 0.5)], [tip[0], tip[1], 1], [lerp(w[0], tip[0], 0.5) + h * 0.06, lerp(w[1], tip[1], 0.5)], w];
    _zV(ctx, O, ver ? _dk(P.oorK || kk, 0.3) : (P.oorK || kk)); if (!ver) { _zV(ctx, [_zLerp(v, w, 0.3), _zLerp(_zLerp(v, w, 0.35), tip, 0.75), _zLerp(w, tip, 0.45), _zLerp(v, w, 0.8)], P.oorBin || _dk(kk, 0.35)); } ctx.restore(); };
  oor(true);
  const kop = [[-3, sh * 0.35], [-2.5, -sh * 0.5], [sl * 0.3, -sh], [sl * 0.78, -sh * 0.93], [sl + ml * 0.15, -sh * 0.6], [sl + ml * 0.8, -mh * 0.62], [l, -mh * 0.22], [l - 0.2, mh * 0.18], [l - 1.2, mh * 0.5],
    [sl + ml * 0.55, mh * 0.8], [sl + ml * 0.2, mh * 0.68], [sl + ml * 0.45, mh * 1.05], [sl * 0.55, mh * 1.15 + jd], [sl * 0.1, mh * 0.95 + jd], [-3, mh * 0.6]];
  _zV(ctx, kop, kk);
  _zIn(ctx, kop, () => { _zV(ctx, [[sl * 0.7, 0], [sl + ml * 0.3, -mh * 0.2], [l + 1, -mh * 0.1], [l + 1, mh * 2], [sl * 0.3, mh * 2.2], [sl * 0.4, mh * 0.5]], P.snuitK || _lt(kk, 0.35)); if (P.kopPatroon) P.kopPatroon(ctx, P, K, Q); });
  // neusje, mond, snorharen
  _zV(ctx, [[l - mh * 0.55, -mh * 0.55], [l + 0.2, -mh * 0.42], [l + 0.3, -mh * 0.05], [l - mh * 0.3, mh * 0.05]], P.neusK || '#5A3A34');
  _zL(ctx, [[l - 0.3, mh * 0.05], [l - 0.8, mh * 0.42], [sl + ml * 0.6, mh * 0.62], [sl + ml * 0.25, mh * 0.6]], '#2A1E1A', 0.5);
  ctx.fillStyle = _dk(P.snuitK || kk, 0.35); for (let i = 0; i < 6; i++) circ(ctx, sl + ml * (0.45 + (i % 3) * 0.13), mh * (0.12 + Math.floor(i / 3) * 0.22), 0.22);
  if (K.snor !== false) { ctx.strokeStyle = 'rgba(242,238,228,0.7)'; ctx.lineWidth = 0.22; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(sl + ml * 0.55, mh * (0.15 + i * 0.12)); ctx.quadraticCurveTo(l + 4, mh * (0.1 + i * 0.3), l + 8, mh * (0.2 + i * 0.6)); } ctx.stroke(); }
  const [ox, oy] = K.oog, r = K.oogR; _zV(ctx, [[ox - r * 1.7, oy + r * 0.2], [ox - r * 0.4, oy - r * 1.05], [ox + r * 1.2, oy - r * 0.7], [ox + r * 1.7, oy + r * 0.1], [ox + r * 0.5, oy + r * 1.0], [ox - r * 0.9, oy + r * 0.8]], '#1E1A16');
  if (K.spleet) { _zOog(ctx, ox, oy, r, P.iris, { pupil: 'vol', dicht: 0 }); ctx.save(); circ(ctx, ox, oy, r * 0.92, P.iris); ctx.fillStyle = '#07090C'; ctx.beginPath(); ctx.ellipse(ox, oy, r * 0.2, r * 0.82, 0, 0, 6.283); ctx.fill(); circ(ctx, ox + r * 0.35, oy - r * 0.35, r * 0.15, 'rgba(255,255,255,0.75)'); ctx.restore(); }
  else _zOog(ctx, ox, oy, r, P.iris, { pupil: 'rond' });
  oor(false); }
function _zKatBouw(p) { const P = _zHondBouw(Object.assign({ voorDist: null }, p)); P.kopF = _zKatKop; P.voet = _zPootje; P.nagel = p.nagel === undefined ? null : p.nagel; return P; }
function _zKatStaart(kleur, lens, breed, o = {}) { return (ctx, P, Q, R) => { const hk = { hang: [2.15, 1.72, 1.7, 2.15, 2.75], loop: [2.6, 2.1, 1.9, 2.3, 2.9], zit: [1.6, 0.4, 0.05, -0.2, -0.6], lig: [2.9, 3.1, 3.2, 3.4, 3.9] }[Q.staart];
  const pad = _zStaartPad(R, hk, lens); return _zStaart(ctx, pad, breed, kleur, { punt: o.punt, puntR: o.puntR, fn: o.fn ? (S) => o.fn(ctx, pad, S) : null }); }; }
// vlekken/strepen binnen een clip
function _zStippen(ctx, x0, y0, w, h, n, r, kleur, seed, uit = null) { ctx.fillStyle = kleur; for (let i = 0; i < n; i++) { const x = x0 + hash(seed + i * 1.91) * w, y = y0 + hash(seed + i * 3.73) * h; if (uit && uit(x, y)) continue; const rr = r * (0.6 + 0.7 * hash(seed + i * 5.3));
  ctx.beginPath(); ctx.ellipse(x, y, rr * 1.1, rr * 0.9, hash(seed + i) * 3, 0, 6.283); ctx.fill(); } }
function _zStreep(ctx, x, y0, y1, w, kleur, seed, buig = 2) { const P = [[x - w * 0.15, y0], [x + w * 0.5, y0 + (y1 - y0) * 0.2], [x + w * 0.35 + (hash(seed) - 0.5) * buig, y0 + (y1 - y0) * 0.55], [x + w * 0.1, y1, 1], [x - w * 0.25, y0 + (y1 - y0) * 0.6], [x - w * 0.5, y0 + (y1 - y0) * 0.25]]; _zV(ctx, P, kleur); }
var _zLUIPAARD = (() => { const P = _zKatBouw({ H: 100, L: 112, cr: 95, yb: 50, tk: 72, hiel: 26, dik: 0.8, vw: 0.95, nekLen: 26, nekHoek: -0.62, nekDik: [26, 15], kopHoek: 0.12, kam: 1, keel: 1,
  kl: { sl: 12, ml: 6.5, sh: 6.5, mh: 4.2, jd: 1, oog: [11, -2.4], oogR: 1.25, oorB: [0.15, 0.5, 3.4, -0.2] },
  kleur: '#D4A45E', verK: '#9C7440', kopK: '#D4A45E', snuitK: '#EEDCB4', voetK: '#DDB678', verVoetK: '#987040', iris: '#C08A2E', neusK: '#3A2A24', oorK: '#B88A4C', oorBin: '#2A221C', nagel: '#3A3028', pas: 42, til: 10,
  zit: { hy: 18, ax: 18, rot: -0.85, krimp: 0.78 }, lig: { vx: 34, ax: 22 },
  staartF: _zKatStaart('#D4A45E', [12, 18, 18, 14, 10], [3.6, 3.4, 3.2, 3, 2.8, 2.6], { punt: '#F2EEE4', puntR: 5, fn: (ctx, pad) => { for (let i = 0; i < 4; i++) { const u = 0.62 + i * 0.09; const k = Math.min(4, Math.floor(u * 5)), f = u * 5 - k; const q = _zLerp(pad[k], pad[k + 1], f); circ(ctx, q[0], q[1], 4.2, '#1E1A16'); } _zStippen(ctx, pad[0][0] - 40, pad[0][1] - 10, 60, 50, 30, 1.3, '#1E1A16', 77); } }),
  kopPatroon(ctx, P, K) { _zStippen(ctx, -3, -K.sh, K.sl * 0.85, K.sh * 0.9, 18, 0.5, '#1E1A16', 31); _zL(ctx, [[K.sl * 0.98, -1.2], [K.sl + 1.4, 2.4], [K.sl + K.ml * 0.45, K.mh * 0.75]], '#1E1A16', 1.0); }, // traanstreep
  nekPatroon(ctx, P, nl, wb) { _zV(ctx, [[-10, wb * 0.12], [nl + 4, 2], [nl + 4, 30], [-10, 30]], '#EEDCB4'); _zStippen(ctx, -8, -wb * 0.6, nl + 10, wb * 0.75, 30, 1.0, '#1E1A16', 41); },
  rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xf + 8, -64], [xf - 12, -54], [0, -62], [xb + 26, -70], [xb + 12, -66], [xb + 10, -40], [xf + 8, -40]], '#EEDCB4');
    _zStippen(ctx, xb - 4, -106, L + 10, 52, 190, 1.55, '#1E1A16', 11, (x, y) => y > -64 + (x > 0 ? 4 : 0)); },
  pootPatroon(ctx, P, voor, J) { const a = J[1], e = J[J.length - 1]; _zStippen(ctx, Math.min(a[0], e[0]) - 10, a[1], 22, e[1] - a[1] - 8, 26, 1.0, '#1E1A16', voor ? 51 : 61); } });
  return P; })();
function jachtluipaard(ctx, x, y, s = 1, o = {}) { const oo = Object.assign({}, o); if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  oo.kijk = o.kijk ?? 1; return _zVier(ctx, x, y, s * 3.6, _zLUIPAARD, oo); }
function luipaardIcoon(ctx, x, y, s = 0.14, kijk = 1, a = 1) { jachtluipaard(ctx, x, y, s, { kijk, a }); }
var _zLEEUW = _zKatBouw({ H: 100, L: 142, cr: 97, yb: 44, tk: 50, hiel: 24, dik: 1.25, vw: 1.35, nekLen: 26, nekHoek: -0.55, nekDik: [42, 30], kopHoek: 0.1, kam: 1, keel: 4,
  kl: { sl: 19, ml: 10, sh: 9.5, mh: 6.5, jd: 1.5, oog: [16.5, -3.4], oogR: 1.35, oorB: [0.1, 0.42, 4.2, -0.1] },
  kleur: '#C99B5C', verK: '#8E6A3C', kopK: '#CDA064', snuitK: '#E8D2A8', voetK: '#C99B5C', verVoetK: '#8A663A', iris: '#B07A2A', neusK: '#6A4038', oorK: '#B08048', oorBin: '#2A1E16', pas: 46,
  zit: { hy: 16, ax: 16, rot: -0.7 }, lig: { vx: 40, ax: 24 },
  staartF: _zKatStaart('#C99B5C', [16, 20, 20, 14, 8], [4.2, 3.8, 3.4, 3, 2.8, 2.6], { fn: (ctx, pad) => { const e = pad[5], d = pad[4]; _zV(ctx, [[d[0], d[1]], ..._zKam([e[0] - 4, e[1] - 4], [e[0] + 5, e[1] + 5], 4, 4, 9).map(p => p), [e[0] + 2, e[1] + 9], [e[0] - 6, e[1] + 4]], '#3A2414'); } }),
  manenF(ctx, P, Q, nb, na) { if (!P.manen) return; ctx.save(); ctx.translate(nb[0], nb[1]); ctx.rotate(na); const nl = P.nekLen; // manen over hals, schouder en borst
    _zV(ctx, [[-22, -20], ..._zKam([-10, -26], [nl + 6, -24], 7, 5, 3, 0.3), [nl + 10, -6], ..._zKam([nl + 8, 14], [-6, 34], 7, 5, 5, 0.3), [-20, 22]], P.manen); ctx.restore(); },
  kraagF(ctx, P, K, Q) { if (!P.manen) return; _zV(ctx, [[-10, -2], ..._zKam([-6, -16], [12, -17], 5, 4, 13, 0.3), [14, -12], [18, -4], [17, 8], ..._zKam([14, 14], [-4, 16], 5, 4, 17, 0.3)], P.manen); },
  kopPatroon(ctx, P, K) { _zV(ctx, [[K.sl * 0.85, -K.sh * 0.6], [K.sl * 1.1, -K.sh * 0.55], [K.sl + K.ml, -K.mh * 0.4], [K.sl + K.ml, -K.mh * 0.7], [K.sl * 0.95, -K.sh * 0.85]], '#B88A50'); },
  rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xf + 8, -62], [xf - 14, -50], [xb + 30, -54], [xb + 20, -50], [xb + 20, -36], [xf + 8, -36]], '#E2C894');
    _zV(ctx, [[xf - 20, -50], [-10, -48], [xb + 34, -50], [xb + 34, -44], [-10, -43], [xf - 22, -46]], '#D8BC86'); // buikplooi
    _zHaar(ctx, xb, -98, L, 30, 50, '#B08048', 3, 3.0, 0.3, 5); _zL(ctx, [[xb + 22, -54], [xb + 28, -70], [xb + 22, -84]], '#A87C46', 1); _zL(ctx, [[xf - 8, -86], [xf - 2, -70], [xf - 8, -56]], '#A87C46', 1); },
  manen: '#6E4626' });
var _zTIJGER = _zKatBouw({ H: 100, L: 158, cr: 98, yb: 44, tk: 50, hiel: 24, dik: 1.2, vw: 1.3, nekLen: 26, nekHoek: -0.5, nekDik: [40, 28], kopHoek: 0.12, kam: 1, keel: 3,
  kl: { sl: 18, ml: 10, sh: 9, mh: 6.4, jd: 1.5, oog: [15.6, -3.2], oogR: 1.3, oorB: [0.12, 0.44, 4, -0.1] },
  kleur: '#D6843C', verK: '#9A5A26', kopK: '#D8883E', snuitK: '#F0E6D2', voetK: '#E0A060', verVoetK: '#965624', iris: '#C8A030', neusK: '#B07060', oorK: '#2A221E', oorBin: '#F0E6D2', pas: 48,
  zit: { hy: 16, ax: 16, rot: -0.7 }, lig: { vx: 40, ax: 24 },
  staartF: _zKatStaart('#D6843C', [16, 20, 20, 16, 10], [4, 3.6, 3.3, 3, 2.8, 2.6], { punt: '#1E1612', puntR: 5, fn: (ctx, pad) => { for (let i = 0; i < 7; i++) { const u = 0.25 + i * 0.1; const k = Math.min(4, Math.floor(u * 5)), f = u * 5 - k; const q = _zLerp(pad[k], pad[k + 1], f); circ(ctx, q[0], q[1], 3.3, '#1E1612'); } } }),
  kopPatroon(ctx, P, K) { const { sl, ml, sh, mh } = K; _zV(ctx, [[sl * 0.4, sh * 0.05], [sl * 0.9, -sh * 0.15], [sl + ml * 0.3, mh * 0.2], [sl, mh * 2], [-3, mh * 2], [-3, sh * 0.3]], '#F0E6D2'); // witte wang
    _zV(ctx, [[sl * 0.72, -sh * 0.55], [sl * 0.92, -sh * 0.62], [sl * 0.94, -sh * 0.45], [sl * 0.74, -sh * 0.4]], '#F0E6D2');
    for (let i = 0; i < 4; i++) _zL(ctx, [[sl * (0.15 + i * 0.13), -sh * 1.05], [sl * (0.18 + i * 0.13), -sh * 0.75], [sl * (0.12 + i * 0.13), -sh * 0.5]], '#1E1612', 0.9);
    for (let i = 0; i < 3; i++) _zL(ctx, [[-2, -sh * 0.1 + i * 2.2], [sl * 0.25, sh * 0.05 + i * 2], [sl * 0.4, i * 2.6]], '#1E1612', 0.8); },
  nekPatroon(ctx, P, nl, wb) { _zV(ctx, [[-10, wb * 0.1], [nl + 4, 4], [nl + 4, 30], [-10, 30]], '#F0E6D2'); for (let i = 0; i < 5; i++) _zStreep(ctx, -4 + i * 6.5, -wb * 0.6, wb * 0.1, 2.4, '#1E1612', 50 + i); },
  rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xf + 8, -62], [xf - 14, -52], [xb + 30, -56], [xb + 20, -52], [xb + 20, -36], [xf + 8, -36]], '#F0E6D2');
    for (let i = 0; i < 17; i++) { const x = xb + 4 + i * (L - 14) / 16 + (hash(i * 3.3) - 0.5) * 3; _zStreep(ctx, x, -104, -60 + hash(i * 7.1) * 8, 3.2 + hash(i) * 1.4, '#1E1612', i); if (i % 3 === 1) _zStreep(ctx, x + 2.5, -100, -82, 1.8, '#1E1612', i + 40); } },
  pootPatroon(ctx, P, voor, J) { const a = J[1], b = J[3]; for (let i = 0; i < 4; i++) { const q = _zLerp(a, b, 0.2 + i * 0.22); _zL(ctx, [[q[0] - 8, q[1] - 1], [q[0], q[1] + 1], [q[0] + 5, q[1]]], '#1E1612', 1.6); } } });
var _zHUISKAT = _zKatBouw({ H: 100, L: 134, cr: 104, yb: 46, tk: 56, hiel: 26, dik: 1.0, vw: 1.05, nekLen: 24, nekHoek: -0.75, nekDik: [32, 22], kopHoek: 0.18, kam: 1, keel: 2,
  kl: { sl: 22, ml: 7, sh: 11, mh: 6, jd: 1.2, oog: [20, -4], oogR: 2.2, spleet: true, oorB: [0.08, 0.5, 11, -0.05], oorRond: 0 },
  kleur: '#8E8C86', verK: '#5E5C58', kopK: '#908E88', snuitK: '#D4D2CA', voetK: '#B8B6AE', verVoetK: '#5A5854', iris: '#B8B83A', neusK: '#C08A86', oorBin: '#C8A6A0', pas: 40,
  zit: { hy: 18, ax: 18, rot: -0.82, krimp: 0.76 }, lig: { vx: 36, ax: 24 },
  staartF: _zKatStaart('#8E8C86', [16, 22, 22, 18, 12], [4.4, 4.2, 4, 3.8, 3.6, 3.2], { punt: '#2E2C2A', puntR: 7, fn: (ctx, pad) => { for (let i = 0; i < 6; i++) { const u = 0.2 + i * 0.13; const k = Math.min(4, Math.floor(u * 5)), f = u * 5 - k; const q = _zLerp(pad[k], pad[k + 1], f); circ(ctx, q[0], q[1], 3.2, '#4A4844'); } } }),
  kopPatroon(ctx, P, K) { const { sl, sh } = K; for (let i = 0; i < 3; i++) _zL(ctx, [[sl * (0.35 + i * 0.12), -sh * 1.05], [sl * (0.38 + i * 0.12), -sh * 0.7]], '#4A4844', 0.9); _zL(ctx, [[sl * 0.95, -sh * 0.15], [sl * 0.7, sh * 0.15], [sl * 0.4, sh * 0.1]], '#4A4844', 0.8); },
  nekPatroon(ctx, P, nl, wb) { _zV(ctx, [[-10, wb * 0.1], [nl + 4, 4], [nl + 4, 30], [-10, 30]], '#C8C6BE'); },
  rompPatroon(ctx, P) { const L = P.L, xf = L / 2, xb = -L / 2; _zV(ctx, [[xf + 8, -66], [xf - 14, -54], [xb + 30, -60], [xb + 20, -56], [xb + 20, -36], [xf + 8, -36]], '#C2C0B8');
    _zL(ctx, [[xb + 6, -102], [0, -103], [xf - 12, -102]], '#4A4844', 3); for (let i = 0; i < 11; i++) { const x = xb + 10 + i * (L - 22) / 10; _zStreep(ctx, x, -103, -80 + hash(i * 4.1) * 10, 2.3, '#55534F', i + 3, 4); } },
  pootPatroon(ctx, P, voor, J) { const a = J[2], b = J[4]; for (let i = 0; i < 3; i++) { const q = _zLerp(a, b, 0.15 + i * 0.25); _zL(ctx, [[q[0] - 6, q[1] - 1], [q[0] + 4, q[1] + 1]], '#5A5854', 1.4); } } });
function leeuw(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 2.2, _zLEEUW, o); }
function tijger(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 2.0, _zTIJGER, o); }
function huiskat(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 2.2, _zHUISKAT, o); }

// ================= KOP UIT EEN OMTREK (hoefdieren, nijlpaard, oerwalvissen) =================
// P.kl: { vorm: omtrek (x naar voren, y omlaag, oorsprong = eind van de nek), oog: [x, y], oogR, pupil, neus: [x, y], mond: lijn, oorF(ctx, ver), extra(ctx) (hoorns, gewei, tanden) }
function _zKopVorm(ctx, P, Q, lw) { const K = P.kl, kk = P.kopK || P.kleur; if (K.oorF) K.oorF(ctx, P, true, Q); if (K.achter) K.achter(ctx, P, Q);
  _zV(ctx, K.vorm, kk); _zIn(ctx, K.vorm, () => { if (P.kopPatroon) P.kopPatroon(ctx, P, K, Q); });
  if (K.neus) { const [nx, ny] = K.neus; _zV(ctx, [[nx - 1.2, ny - 0.7], [nx + 0.6, ny - 1.0], [nx + 1.0, ny + 0.3], [nx - 0.6, ny + 0.8]], K.neusK || _dk(kk, 0.55)); }
  if (K.mond) _zL(ctx, K.mond, K.mondK || _dk(kk, 0.5), K.mondDik || 0.7);
  if (K.tanden) { ctx.fillStyle = '#EDE6D2'; for (const [tx, ty, h] of K.tanden) { ctx.beginPath(); ctx.moveTo(tx - 0.6, ty); ctx.lineTo(tx, ty + h); ctx.lineTo(tx + 0.6, ty); ctx.closePath(); ctx.fill(); } }
  const [ox, oy] = K.oog; if (K.lid !== false) _zV(ctx, [[ox - K.oogR * 1.6, oy + K.oogR * 0.2], [ox, oy - K.oogR * 1.2], [ox + K.oogR * 1.6, oy], [ox, oy + K.oogR * 1.0]], K.lidK || _dk(kk, 0.4));
  _zOog(ctx, ox, oy, K.oogR, P.iris || '#2A1A10', { pupil: K.pupil || 'liggend', rand: K.oogRand || null });
  if (K.oorF) K.oorF(ctx, P, false, Q); if (K.extra) K.extra(ctx, P, Q, lw); }
function _zKlauw(ctx, F, J, voor, kl, ver, P, lw) { // tweetenige hoef (rund, hert, Pakicetus): twee helften met een spleet, bijklauw achter
  const hw = P.hoefB, hh = P.hoefH; ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2]); const k = ver ? _dk(P.hoefK, 0.25) : P.hoefK;
  _zV(ctx, [[-hw * 0.5, -hh * 0.85], [hw * 0.1, -hh, 1], [hw * 0.75, 0, 1], [-hw * 0.55, 0, 1]], k); if (!ver) { _zL(ctx, [[hw * 0.02, -hh * 0.95], [hw * 0.12, 0]], _lt(k, 0.3), lw * 1.2); circ(ctx, -hw * 0.62, -hh * 1.5, hw * 0.16, k); }
  ctx.restore(); }

// ---------- KOE (rund) ----------
// Opgezocht: schofthoogte ±140 cm, lijf ±1,2 × schofthoogte, rechte rug, uitstekende heupknobbels, diep tonvormig lijf (buik laag), korte dikke hals met kwab (halskwab),
// tweetenige hoeven met bijklauwen, lange staart met kwast tot de hak, uier tussen de achterbenen; horizontale oren onder de hoorns; liggende pupil.
var _zKOE = (() => { const P = _zPaardBouw({ H: 140, L: 120, yb: 46, cr: 100, schoft: 0, sprong: 34, koot: 6, kootHoek: 0.62, dik: 1.15, buik: 6, nekLen: 28, nekHoek: -0.3, nekDik: [38, 28], nekBasis: [42, -78], kam: 0.5, keel: 7, kopHoek: 1.05, graas: { nek: 0.9, kop: 1.5, vx: 3 },
  kleur: '#8C5A3A', verK: '#5E3B26', pootK: '#8C5A3A', kopK: '#8C5A3A', hoefK: '#2A2420', iris: '#2A1A10', hoefB: 7, hoefH: 4.6, voorlok: false,
  kl: { vorm: [[-3, 3], [0, -8], [8, -10.5], [15, -9], [26, -7], [36, -6.5], [41, -4], [42.5, 1], [41.5, 6], [36, 8], [30, 7.4], [22, 9], [12, 12.5], [4, 12], [-3, 8]], oog: [12, -4.5], oogR: 1.7, neus: [40.5, -0.6], mond: [[41.5, 5.4], [36, 6], [31, 5.4]],
    oorF(ctx, P, ver) { ctx.save(); if (ver) ctx.translate(-2, -1); _zV(ctx, [[2, -6], [-5, -9], [-10, -7.5], [-6, -4.5], [1, -3.5]], ver ? '#5E3B26' : '#7A4E32'); ctx.restore(); },
    extra(ctx) { _zV(ctx, [[4, -9], [2, -15], [-2, -19], [0, -19.5], [5, -15], [7.5, -9.5]], '#D8CBB0'); _zV(ctx, [[1.2, -18], [-2, -19], [0, -19.6]], '#3A3228'); } },
  kopPatroon(ctx) { _zV(ctx, [[33, -8], [45, -8], [45, 12], [32, 12], [31, 0]], '#C9A68A'); _zV(ctx, [[14, -11], [22, -11], [19, -6], [15, -6.5]], '#E8DED0'); }, // lichte snuit, bles
  staartF: (ctx, P, Q, R) => { const zw = Q.staart === 'loop' ? 0.1 : 0; const pad = _zStaartPad(R, [1.75 + zw, 1.62 + zw, 1.58 + zw], [16, 22, 20]); _zStaart(ctx, pad, [2.4, 1.8, 1.5, 1.4], '#7A4C30'); const e = pad[3];
    _zV(ctx, [[e[0] - 1.5, e[1] - 6], [e[0] + 2, e[1] - 6], ..._zKam([e[0] + 3, e[1] + 4], [e[0] - 3, e[1] + 4], 4, 2.5, 5)], '#3A2418'); },
  rompPatroon(ctx, P) { _zV(ctx, [[-44, -104], [-36, -100], [-40, -94], [-48, -96]], '#9A6A48'); _zL(ctx, [[-40, -97], [-36, -88], [-30, -80]], '#7A4E32', 0.9); // heupknobbel
    _zV(ctx, [[-30, -46], [-22, -44], [-20, -40], [-30, -38], [-36, -42]], '#D8A898'); // uier
    _zHaar(ctx, -50, -98, 100, 50, 40, '#7A4C30', 3, 3.0, 0.3, 5); _zL(ctx, [[30, -94], [36, -76], [34, -60]], '#7A4E32', 0.9); } });
  P.voet = _zKlauw; P.kopF = _zKopVorm; return P; })();
function koe7(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 1.7, _zKOE, o); }

// ---------- EDELHERT ----------
// Opgezocht (Wikipedia Red deer; British Wildlife Centre): hert ±120 cm schofthoogte, slank, lange dunne poten met hoge hak, hals met manen in de bronst,
// gewei met oogspruit, ijsspruit, middenspruit en kroon (bij een volwassen 12-ender 6 per stang), lichte spiegel rond een korte staart, grote oren, liggende pupil.
// Vechten: koppen laag, gewei naar voren, voorbenen gestrekt, achterbenen duwen.
var _zHERT = (() => { const P = _zPaardBouw({ H: 120, L: 106, yb: 54, cr: 102, schoft: 2, sprong: 38, hielDx: -6, koot: 7, kootHoek: 0.55, dik: 1.0, nekLen: 40, nekHoek: -1.0, nekDik: [36, 18], kam: 3, keel: 5, kopHoek: 1.1,
  vecht: { nek: 0.45, kop: 2.25 }, graas: { nek: 1.2, kop: 1.6, vx: 4 },
  kleur: '#8C5A3A', verK: '#5A3A26', pootK: '#8C5A3A', kopK: '#946240', hoefK: '#2A2018', iris: '#2A1A10', hoefB: 5.6, hoefH: 4.4, voorlok: false,
  kl: { vorm: [[-3, 2], [0, -6], [7, -7.2], [14, -6.2], [24, -4.2], [30, -3], [32.4, -0.6], [32, 2.8], [29, 4.2], [24, 4.4], [16, 6], [8, 8.6], [1, 7.4]], oog: [11, -2.8], oogR: 1.5, neus: [31, -0.6], mond: [[31.5, 3], [28, 3.6], [25.5, 3.4]],
    oorF(ctx, P, ver, Q) { ctx.save(); if (ver) ctx.translate(-2, 0.5); _zV(ctx, [[1, -5.5], [-4, -12], [-8, -14.5], [-7, -10], [-2, -4]], ver ? '#5A3A26' : '#8C5A3A'); if (!ver) _zV(ctx, [[0, -6], [-4, -11], [-6.5, -12.5], [-5, -9], [-1.5, -5]], '#C8A890'); ctx.restore(); },
    extra(ctx, P) { if (!P.gewei) return; // gewei vast aan de schedel, getekend in de staande oriëntatie (draait mee met de kop)
      const stang = (dx, kl, w) => { ctx.save(); ctx.translate(3 + dx, -6.5); ctx.rotate(-P.kopHoek); const B = [[0, 0], [-4, -14], [-10, -30], [-12, -46], [-9, -62], [-5, -72]]; _zL(ctx, B, kl, w);
        for (const [a, b] of [[[-1, -4], [13, -11]], [[-3, -10], [11, -21]], [[-10.5, -32], [3, -42]], [[-10, -58], [-1, -70]], [[-9.5, -60], [-17, -71]], [[-11, -50], [-19, -58]]]) _zL(ctx, [a, _zLerp(a, b, 0.5), b], kl, w * 0.72);
        circ(ctx, 0, 0, w * 0.9, '#6A5A44'); ctx.restore(); }; stang(-2.5, '#8A7A60', 2.2); stang(0, '#D2C29E', 2.5); } },
  kopPatroon(ctx) { _zV(ctx, [[26, -5], [34, -5], [34, 6], [25, 6]], '#5E3E2A'); _zV(ctx, [[8, -1], [14, 0], [12, 3], [7, 2]], '#B88A64'); },
  manenF(ctx, P, Q, nb, na) { if (!P.gewei) return; ctx.save(); ctx.translate(nb[0], nb[1]); ctx.rotate(na); const nl = P.nekLen; // bronstmanen aan de keel
    _zV(ctx, [[nl * 0.05, 6], [nl * 0.9, 6], ..._zKam([nl * 0.92, 13], [nl * 0.1, 21], 7, 4, 3, 0.4)], '#5A3C2C'); ctx.restore(); },
  staartF: (ctx, P, Q, R) => { _zV(ctx, [[R[0] + 1, R[1] - 1], [R[0] - 3, R[1] + 1], [R[0] - 3.5, R[1] + 9], [R[0] - 0.5, R[1] + 10]], '#5A3A26'); },
  rompPatroon(ctx, P) { _zV(ctx, [[-62, -108], [-48, -104], ..._zKam([-47, -100], [-55, -86], 3, 1.2, 3), [-62, -84]], '#B8956C'); // spiegel: kleine lichte vlek rond de staartwortel, geen schijf
    _zV(ctx, [[-60, -64], [-30, -58], [20, -58], [46, -64], [60, -40], [-60, -40]], '#A47452'); _zHaar(ctx, -50, -100, 100, 40, 40, '#74482E', 3, 3.0, 0.3, 5);
    _zL(ctx, [[-28, -64], [-22, -80], [-30, -94]], '#74482E', 0.9); _zL(ctx, [[36, -92], [42, -78], [38, -64]], '#74482E', 0.8); }, gewei: true });
  P.voet = _zKlauw; P.kopF = _zKopVorm; return P; })();
function edelhert(ctx, x, y, s = 1, o = {}) { const k = o.kop || 0; const oo = Object.assign({}, o, { nekHoek: (o.nekHoek || 0) + k * 1.15, kopHoek: (o.kopHoek || 0) + k * 0.35 });
  if (k > 0.5 && !o.houding) { oo.houding = 'vechten'; oo.nekHoek = o.nekHoek || 0; oo.kopHoek = o.kopHoek || 0; } return _zVier(ctx, x, y, s * 2, _zHERT, oo); }

// ---------- NIJLPAARD ----------
// Opgezocht (Wikipedia Hippopotamus; YPTE): schofthoogte ±1,5 m, lengte 3,5–4 m, tonvormig lijf op korte zuilpoten met vier tenen, kop enorm (tot ±⅓ van de romp),
// ogen, oren en neusgaten bovenop de kop (alles boven water), korte platte staart, haarloze grijs-paarse huid, roze in plooien en rond ogen en mond.
var _zNIJL = (() => { const xf = 85, xb = -85; const P = _zHondBouw({ H: 100, L: 170, cr: 100, yb: 30, tk: 26, hiel: 16, pols: 9, dik: 1.7, vw: 1.8, nekLen: 14, nekHoek: -0.3, nekDik: [50, 46], kam: 0, keel: 4, kopHoek: 0.28, pas: 30, til: 5,
  kleur: '#6E5E66', verK: '#4C4048', kopK: '#74636A', iris: '#3A2414', graas: { nek: 0.5, kop: 0.9, vx: 2 } });
  P.romp = [[xb + 2, -88], [xb + 14, -98], [xb + 50, -102], [0, -100], [xf - 30, -102], [xf - 10, -99], [xf + 4, -86], [xf + 6, -66], [xf + 2, -46], [xf - 10, -32], [xf - 40, -24], [0, -20], [xb + 40, -22], [xb + 18, -28], [xb + 7, -40], [xb - 2, -56], [xb - 5, -72], [xb - 3, -84]];
  P.nekBasis = [xf - 10, -66]; P.sw = [xb, -86]; P.spieren = false;
  P.kopF = (ctx, P, Q, lw) => { // grote rechthoekige kop, brede snuit met neusgaten bovenop, oog en oor hoog
    const v = [[-6, 10], [-5, -18], [4, -23], [14, -22.5], [20, -20], [26, -17], [36, -15], [46, -16], [54, -13], [58, -6], [58, 6], [54, 14], [44, 18], [30, 20], [16, 22], [2, 22], [-6, 18]];
    _zV(ctx, [[2, -21], [-1, -27], [3, -28.5], [6, -22]], '#4C4048'); _zV(ctx, v, P.kopK); _zIn(ctx, v, () => { _zV(ctx, [[30, 4], [60, 2], [60, 24], [28, 24]], '#B88A8A'); _zV(ctx, [[-8, 12], [60, 13], [60, 30], [-8, 30]], '#8A7880'); });
    _zL(ctx, [[57, 8], [46, 10], [34, 9], [26, 6]], '#3A2A30', 1.1); _zV(ctx, [[47, -15.5], [51, -16.8], [52, -14.5], [48.5, -13.8]], '#2A1E22');
    _zV(ctx, [[10, -24.5], [13.5, -27], [18, -26], [19, -21], [12, -20.5]], '#74636A'); _zOog(ctx, 14.5, -23, 1.9, '#3A2414', { pupil: 'rond' }); _zL(ctx, [[11, -25.5], [14.5, -26.6], [18, -25.4]], '#C99090', 0.7);
    _zV(ctx, [[3, -21.5], [1.5, -26.5], [5, -27.5], [6.5, -22]], '#74636A'); _zV(ctx, [[3.4, -22.5], [2.6, -25.6], [4.8, -26.2], [5.6, -22.6]], '#C98E8A'); };
  P.voor.w = P.voor.w.map(w => [w[0] * 1.05, w[1] * 1.05]); P.achter.w[0] = [14, 12]; P.achter.w[1] = [18, 15]; P.voetX = [xf - 14, xb + 14];
  P.voet = (ctx, F, J, voor, kl, ver, P) => { ctx.save(); ctx.translate(F[0], F[1]); _zV(ctx, [[-9, -9], [9, -9], [11, -2], [9, 0, 1], [-9, 0, 1], [-11, -2]], kl); if (!ver) { ctx.fillStyle = '#3A3034'; for (const dx of [-6, -1.5, 3, 7]) { ctx.beginPath(); ctx.ellipse(dx, -1.4, 1.9, 1.5, 0, 0, 6.283); ctx.fill(); } } ctx.restore(); };
  P.staartF = (ctx, P, Q, R) => { _zV(ctx, [[R[0] + 2, R[1] - 2], [R[0] - 6, R[1] + 2], [R[0] - 10, R[1] + 16], [R[0] - 6, R[1] + 18], [R[0] + 1, R[1] + 6]], '#5E5058'); };
  P.rompPatroon = (ctx, P) => { _zV(ctx, [[-100, -40], [0, -36], [100, -44], [100, -10], [-100, -10]], '#86747C'); _zL(ctx, [[xf - 10, -96], [xf - 2, -70], [xf - 12, -44]], '#5A4C54', 1.2); _zL(ctx, [[xb + 24, -90], [xb + 30, -64], [xb + 22, -40]], '#5A4C54', 1.2);
    ctx.fillStyle = 'rgba(201,142,138,0.35)'; ctx.beginPath(); ctx.ellipse(xf - 22, -34, 14, 4, 0, 0, 6.283); ctx.fill(); };
  return P; })();
function nijlpaard(ctx, x, y, s = 1, o = {}) { const oo = typeof o === 'number' ? { a: o } : o; return _zVier(ctx, x, y, s * 1.95, _zNIJL, oo); }

// ---------- PAKICETUS (±50 Mj) ----------
// Opgezocht (Thewissen e.a. 2001; Wikipedia Archaeoceti/Pakicetus): ±1–2 m, zo groot als een wolf; lange slanke poten, kleine hoefjes (evenhoevig enkelbot),
// lange smalle staart, lange smalle snuit met spitse tanden, ogen dicht bij elkaar hoog op de kop. Bekende fout: als zwemmende walvis met vinnen tekenen.
var _zPAKI = (() => { const P = _zHondBouw({ H: 100, L: 120, cr: 98, yb: 56, tk: 64, hiel: 30, dik: 0.82, vw: 0.8, nekLen: 26, nekHoek: -0.62, nekDik: [28, 16], kam: 1, keel: 1, kopHoek: 0.25, pas: 44,
  kleur: '#8C6A48', verK: '#5E4630', kopK: '#8C6A48', voetK: '#8C6A48', iris: '#3A2414' });
  P.kopF = _zKopVorm; P.kl = { vorm: [[-3, 3], [-1, -6], [8, -8.4], [14, -7.4], [24, -4.8], [36, -3.4], [44, -2.4], [46, -0.6], [45, 1.6], [36, 2.4], [24, 3.6], [14, 5.6], [4, 7.2], [-2, 6]], oog: [11.5, -6.2], oogR: 1.25, pupil: 'rond', neus: [45, -1.4], lid: true,
    mond: [[45, 0.8], [34, 1.2], [20, 2.4], [14, 3]], tanden: [[42, 0.9, 1.4], [38, 1.0, 1.8], [34, 1.2, 1.2], [29, 1.5, 1.4], [24, 1.9, 1.2]],
    oorF(ctx, P, ver) { ctx.save(); if (ver) ctx.translate(-1.5, 0.4); _zV(ctx, [[0, -6], [-1.5, -10.5], [2.5, -7.5]], ver ? '#5E4630' : '#6A4E34'); ctx.restore(); } };
  P.hoefB = 4.4; P.hoefH = 3.4; P.hoefK = '#2E2620'; P.voet = _zKlauw;
  P.staartF = _zStaartSimpel('#7E5E40', { hang: [2.35, 2.0, 1.8, 1.7], loop: [2.6, 2.4, 2.2, 2.1], zit: [1.8, 0.5, 0.1, 0.05], lig: [2.9, 3.05, 3.1, 3.1] }, [14, 18, 16, 12], [4.4, 3.8, 3, 2.2, 1.2]);
  P.rompPatroon = (ctx, P) => { _zV(ctx, [[66, -70], [40, -58], [-60, -66], [-60, -40], [66, -40]], '#B89A76'); _zHaar(ctx, -60, -100, 120, 30, 40, '#74563A', 3, 3.0, 0.3, 5); };
  return P; })();
function pakicetus(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 1.8, _zPAKI, o); }

// ---------- AMBULOCETUS (±48 Mj) ----------
// Opgezocht (Thewissen e.a. 1994/1996; Wikipedia): ±3 m, zo groot als een zeeleeuw; laag lijf op korte poten, voorpoten met vijf korte hoefjes, zeer grote lange achtervoeten
// (zwemmen door te peddelen), lange krokodilachtige snuit, ogen bovenop de kop maar opzij gericht, lange dikke staart zonder staartvin. Kon op het land maar moeizaam lopen.
var _zAMBU = (() => { const P = _zHondBouw({ H: 100, L: 210, cr: 100, yb: 44, tk: 46, hiel: 18, pols: 10, dik: 1.4, vw: 1.2, nekLen: 26, nekHoek: -0.3, nekDik: [46, 32], kam: 0, keel: 2, kopHoek: 0.06, pas: 30, til: 6,
  kleur: '#6E5E4A', verK: '#4A3E30', kopK: '#6E5E4A', voetK: '#5E5040', iris: '#3A2414', lig: { vx: 30, ax: 30, buik: 2 } });
  P.kopF = _zKopVorm; P.kl = { vorm: [[-4, 6], [-2, -10], [8, -14], [16, -12.5], [28, -8], [44, -6], [64, -4.4], [72, -2.6], [73, 0.6], [70, 3], [52, 4.4], [32, 6.6], [16, 11], [4, 13]], oog: [15.5, -12.2], oogR: 1.9, pupil: 'rond',
    neus: [71, -2.4], mond: [[72, 1.2], [54, 2.2], [34, 4.4], [24, 6]], tanden: [[68, 1.4, 2.4], [62, 1.7, 2], [56, 2, 2.6], [50, 2.4, 2], [44, 2.9, 2.4], [38, 3.4, 2]] };
  P.achter.dist = [[16, 1.38]]; P.voetX[1] += 4; // lange achtervoet plat op de grond
  P.voet = (ctx, F, J, voor, kl, ver, P, lw) => { ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2] * 0.8);
    if (voor) { _zV(ctx, [[-4, -5], [4, -5.5], [6.5, 0, 1], [-5, 0, 1]], ver ? '#3A3028' : '#4A3E30'); if (!ver) for (const dx of [-2, 1, 4]) _zL(ctx, [[dx, -2.5], [dx + 0.6, 0]], '#2E261E', lw * 1.5); }
    else { _zV(ctx, [[-14, -3], [-6, -5.5], [10, -4], [26, -2.4], [28, 0, 1], [-14, 0, 1]], ver ? '#3A3028' : '#4E4232'); if (!ver) for (const dx of [8, 14, 20]) _zL(ctx, [[dx - 8, -3.4], [dx + 6, -0.8]], '#3A3028', lw * 1.4); } ctx.restore(); };
  P.staartF = _zStaartSimpel('#64553F', { hang: [2.75, 2.85, 2.95, 3.0], loop: [2.9, 3.0, 3.05, 3.1], zit: [2.7, 2.9, 3.0, 3.05], lig: [3.0, 3.1, 3.12, 3.14] }, [24, 30, 30, 24], [10, 9, 7, 5, 2.4]);
  P.rompPatroon = (ctx, P) => { _zV(ctx, [[120, -66], [60, -54], [-110, -60], [-110, -30], [120, -30]], '#9C8A70'); _zHaar(ctx, -105, -100, 210, 34, 50, '#5A4C3A', 3, 3.0, 0.3, 5); };
  return P; })();
function ambulocetus(ctx, x, y, s = 1, o = {}) { return _zVier(ctx, x, y, s * 1.3, _zAMBU, o); }

// ================= WALVISSEN EN ZWEMMERS (zijaanzicht, anker = midden van het lijf) =================
// lijf uit een profiel: rug- en buiklijn als functie van u (0 = snuit, 1 = staartwortel); golf = verticale golving (walvissen golven op en neer, niet opzij)
function _zProfiel(x0, x1, rug, buik, golf, n = 28) { const T = [], B = []; for (let i = 0; i <= n; i++) { const u = i / n, x = lerp(x0, x1, u), g = golf ? golf(u) : 0; T.push([x, g - rug(u)]); B.push([x, g + buik(u)]); } return [...T, ...B.reverse()]; }

// ---------- BULTRUG ----------
// Opgezocht (Wikipedia Humpback whale; NOAA): ±15 m; borstvinnen tot ⅓ van de lichaamslengte met knobbels op de voorrand; knobbels (tuberkels) op kop en onderkaak;
// keelgroeven van kin tot navel; kleine rugvin op een bult op ±⅔ van de lengte; brede horizontale staartvin met gekartelde achterrand; zwemt door de staart op en neer te slaan.
// o.t = tijd (s): de staart slaat op en neer, de borstvin beweegt mee. Lengte 800 eenheden bij s = 1. o.rontgen / o.heup zoals voorheen.
function bultrug(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, heup = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const rug = '#2E3641', rugL = '#3C4552', buik = '#C9CFD7', vin = '#DCE1E6', vinR = '#9AA3B2', fase = t * 1.1;
  const golf = (u) => Math.sin(fase - u * 2.2) * 26 * Math.pow(Math.max(0, u - 0.35) / 0.65, 2);
  const R = _zProfiel(400, -350, (u) => u < 0.06 ? 10 + u * 520 : 6 + 88 * Math.pow(Math.sin(Math.PI * Math.min(1, (u + 0.02) / 1.06)), 0.85) * (1 - 0.35 * u) - (u > 0.8 ? (u - 0.8) * 40 : 0),
    (u) => u < 0.05 ? 6 + u * 300 : 6 + 96 * Math.pow(Math.sin(Math.PI * Math.min(1, u / 1.0)), 0.9) * (1 - 0.45 * u), golf, 34);
  const r = 1 - rontgen * 0.8; const sg = golf(1), dsg = (golf(1) - golf(0.96)) / 14;
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin: horizontaal, van opzij een wig met twee punten; volgt de helling van de staartsteel
  ctx.save(); ctx.translate(-350, sg); ctx.rotate(Math.atan(dsg) * 1.6 + Math.cos(fase - 2.2) * 0.25);
  _zV(ctx, [[12, -8], [-30, -12], [-80, -22, 1], [-112, -20, 1], [-96, -8], [-112, 2, 1], [-104, 12, 1], [-70, 14], [-30, 9], [12, 8]], rug); _zL(ctx, [[-82, -18], [-96, -9], [-106, 3]], rugL, 1.5); ctx.restore();
  // rugvin op een bult
  const rv = golf(0.62); _zV(ctx, [[-120, rv - 80], [-150, rv - 92], [-176, rv - 104, 1], [-170, rv - 88], [-196, rv - 70], [-150, rv - 72]], rug);
  _zV(ctx, R, rug, _lt(rug, 0.18), 1.5);
  _zIn(ctx, R, () => { // lichte buik met vlekkerige rand, keelgroeven, knobbels
    const B = []; for (let i = 0; i <= 20; i++) { const u = i / 20, xx = lerp(400, -200, u); B.push([xx, golf(u * 0.75) + 10 + 30 * Math.sin(Math.PI * Math.min(1, u * 1.3)) + Math.sin(i * 1.9) * 4]); }
    _zV(ctx, [...B, [-200, 200], [400, 200]], buik); _zStippen(ctx, -80, 20, 300, 40, 26, 6, '#8E96A2', 41, (xx, yy) => yy > 40 + golf((400 - xx) / 750) * 0);
    ctx.strokeStyle = rgba('#7A8290', 0.85); ctx.lineWidth = 2; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(388 - i * 6, 12 + i * 4); ctx.quadraticCurveTo(220, 50 + i * 7.5, 30 - i * 6, 86 + i * 2.5); ctx.stroke(); }
    for (let i = 0; i < 10; i++) circ(ctx, 380 - i * 15, -26 - i * 3.6, 3.6, rugL); for (let i = 0; i < 5; i++) circ(ctx, 372 - i * 20, 4 + i * 3, 3.2, _lt(rug, 0.2)); });
  _zL(ctx, [[398, -2], [340, 2], [280, 10], [244, 18], [232, 14]], '#141A22', 2.5); _zOog(ctx, 238, 4, 4.6, '#3A2A1E', { rand: '#1C232C' });
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; _zV(ctx, R, null, rgba(C.line, 0.9), 2);
    vul(ctx, [[396, -8], [330, -30], [260, -46], [214, -44], [206, -10], [250, 0], [330, -2]], BOT.kaal, BOT.kaalR, 1.5); vul(ctx, [[396, 2], [320, 8], [250, 14], [240, 6], [320, 0]], BOT.kaal);
    for (let i = 0; i < 30; i++) { const u = i / 29, vx = 200 - u * 540, vy = -42 + Math.sin(u * 3.1) * -16 + u * 34 + golf(0.25 + u * 0.75); roundRect(ctx, vx - 7, vy - 9 + u * 3, 14 - u * 5, 18 - u * 8, 3); shape(ctx, BOT.kaal, BOT.kaalR, 1); }
    ctx.strokeStyle = BOT.kaal; ctx.lineWidth = 3.5; for (let i = 0; i < 9; i++) { const rx = 180 - i * 22; ctx.beginPath(); ctx.moveTo(rx, -48 + i * 0.6); ctx.quadraticCurveTo(rx - 26, 10, rx - 18, 56 - i * 2); ctx.stroke(); }
    const hc = heup > 0.01 ? C.goud : BOT.kaal, hy = golf(0.68); bot(ctx, -122, 46 + hy, -86, 34 + hy, 9, hc); bot(ctx, -112, 56 + hy, -76, 44 + hy, 9, hc); ctx.restore(); }
  // borstvin: lang (±⅓ van de lengte), wit, gekartelde voorrand met knobbels; begint in de romp achter de mondhoek
  ctx.save(); ctx.globalAlpha *= (rontgen > 0.01 ? 1 - rontgen * 0.75 : 1); ctx.translate(196, 46); ctx.rotate(Math.sin(t * 0.7) * 0.08);
  const FL = [[18, -12], [8, 8]]; for (let i = 1; i <= 10; i++) { const u = i / 10; FL.push([8 - u * 236 + (i % 2 ? 2.5 : -1.5), 8 + u * 140 + (i % 2 ? 4.5 : 0)]); } FL.push([-246, 150, 1], [-206, 116], [-140, 76], [-70, 36], [-24, 2], [0, -16]);
  _zV(ctx, FL, vin, vinR, 2); _zIn(ctx, FL, () => _zStippen(ctx, -200, 40, 200, 110, 14, 4, '#B4BCC6', 9));
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(196, 46); bot(ctx, 4, -2, -26, 16, 20, BOT.arm); bot(ctx, -28, 18, -70, 46, 14, BOT.onder); bot(ctx, -24, 30, -64, 56, 12, BOT.onder);
    for (let d = 0; d < 4; d++) { let px = -72 - d * 2, py = 50 + d * 8; const n = [5, 7, 6, 4][d]; for (let k = 0; k < n; k++) { const nx = px - 22, ny = py + 13 - d * 0.5; bot(ctx, px, py, nx, ny, 8 - k * 0.5, BOT.hand, { kop: 1.1 }); px = nx; py = ny; } }
    ctx.restore(); }
  ctx.restore(); }

// ---------- BASILOSAURUS (±40 Mj) ----------
// Opgezocht (Wikipedia Archaeoceti; Gingerich e.a. 1990): 15–18 m, zeer langgerekt; kleine kop met lange kaken en verschillende tanden (spits voor, gezaagd achter),
// neusgaten halverwege de snuit, korte borstvinnen, piepkleine achterpootjes (±35 cm) met tenen, los van de wervelkolom; kleine staartvin. Lengte 900 eenheden.
function basilosaurus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, poot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const huid = '#4E5862', huidD = '#3E4750', buik = '#9AA6B0', fase = t;
  const golf = (u) => Math.sin(u * 6 - fase * 1.4) * 12 * Math.pow(u, 1.2);
  const R = _zProfiel(450, -440, (u) => u < 0.07 ? 6 + u * 300 : 6 + 36 * Math.pow(Math.sin(Math.PI * Math.min(1, (u - 0.02) / 1.0)), 0.7) * (1 - 0.3 * u),
    (u) => u < 0.06 ? 5 + u * 260 : 5 + 34 * Math.pow(Math.sin(Math.PI * Math.min(1, u / 1.0)), 0.75) * (1 - 0.35 * u), golf, 40);
  const sg = golf(1), dsg = (golf(1) - golf(0.97)) / 27;
  ctx.save(); ctx.translate(-440, sg); ctx.rotate(Math.atan(dsg)); _zV(ctx, [[8, -5], [-24, -10], [-46, -22, 1], [-40, -6], [-48, 10, 1], [-24, 8], [8, 5]], huidD); ctx.restore();
  _zV(ctx, R, huid); _zIn(ctx, R, () => { const B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; B.push([lerp(450, -440, u), golf(u) + 6]); } _zV(ctx, [...B, [-460, 80], [460, 80]], buik); _zHaar(ctx, -400, -40, 800, 30, 50, huidD, 10, 3.1, 0.6, 3); });
  _zL(ctx, [[450, 1], [420, 3], [380, 6], [366, 8]], '#1A1E22', 2); ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 6; i++) { const tx = 440 - i * 13; ctx.beginPath(); ctx.moveTo(tx - 3, 2 + i * 0.6); ctx.lineTo(tx, 10 + i * 0.4); ctx.lineTo(tx + 3, 2 + i * 0.6); ctx.fill(); }
  circ(ctx, 412, -9, 2.2, '#1A1E22'); _zOog(ctx, 384, -12, 4, '#2E2016');
  const bv = golf(0.17); _zV(ctx, [[300, 22 + bv], [274, 46 + bv], [252, 66 + bv, 1], [248, 58 + bv], [266, 30 + bv], [284, 16 + bv]], huidD);
  ctx.save(); const pk = poot > 0.01 ? C.goud : huidD, py = golf(0.72); ctx.translate(0, py); // achterpootje: dij, onderbeen, voet met tenen — klein en los van de wervelkolom
  _zV(ctx, _zLid([[-196, 26, 3.4, 3.4], [-204, 36, 2.4, 2.4], [-212, 44, 2, 2]]), pk); ctx.strokeStyle = pk; ctx.lineWidth = 1.8; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-212, 44); ctx.lineTo(-220 + i * 3.5, 51); ctx.stroke(); } ctx.restore();
  ctx.restore(); }

// ---------- RODHOCETUS (±47 Mj) ----------
// Opgezocht (Gingerich e.a. 2001; Wikipedia): ±3 m, langgerekt zwemmerslijf op korte poten, grote achtervoeten als peddels (zwemmen met de achterpoten),
// korte voorpoten met hoefjes, lange krachtige staart zonder staartvin, lange snuit; neusgaten iets naar achter verschoven. o.t laat de achtervoeten peddelen.
function rodhocetus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, rot = 0, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const huid = '#5E5A54', huidD = '#46423E', buik = '#9A948A', fase = t * 2.2, golf = (u) => Math.sin(u * 4 - fase) * 8 * Math.pow(u, 1.5);
  const slag = Math.sin(fase), achterpoot = (dx, kl, a0) => { ctx.save(); ctx.translate(-110 + dx, 18); ctx.rotate(1.05 + slag * 0.4 + a0); // dij → onderbeen → lange peddelvoet met vliezen, slepen naar achter
    _zV(ctx, _zLid([[0, -6, 14, 14], [-2, 16, 9, 10], [0, 34, 6, 7]]), kl); ctx.translate(0, 34); ctx.rotate(-0.25 - slag * 0.35); _zV(ctx, [[-6, -2], [-7, 24], [-6, 66, 1], [2, 70, 1], [6, 24], [6, -2]], _dk(kl, 0.08)); ctx.strokeStyle = _dk(kl, 0.3); ctx.lineWidth = 1.4; for (const xx of [-3.5, 0, 3.5]) { ctx.beginPath(); ctx.moveTo(xx * 0.8, 12); ctx.lineTo(xx * 1.1, 64); ctx.stroke(); } ctx.restore(); };
  achterpoot(20, huidD, 0.2);
  const pad = _zStaartPad([-150, golf(0.55)], [3.1 + Math.atan(golf(0.8) / 100), 3.14 + Math.atan((golf(1) - golf(0.8)) / 60), 3.16], [70, 70, 60]);
  _zStaart(ctx, pad, [24, 18, 12, 6], huid);
  const R = _zProfiel(310, -160, (u) => u < 0.12 ? 6 + u * 110 : 6 + 38 * Math.pow(Math.sin(Math.PI * Math.min(1, (u - 0.04) / 0.98)), 0.7), (u) => u < 0.1 ? 4 + u * 80 : 4 + 34 * Math.pow(Math.sin(Math.PI * Math.min(1, u / 1.02)), 0.75), (u) => golf(u * 0.55), 30);
  _zV(ctx, R, huid); _zIn(ctx, R, () => { _zV(ctx, [[320, 4], [100, 16], [-170, 16], [-170, 60], [320, 60]], buik); });
  _zL(ctx, [[308, 1], [270, 2], [220, 5], [204, 6]], '#1E1A16', 2); ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 6; i++) { const tx = 300 - i * 13; ctx.beginPath(); ctx.moveTo(tx - 2.5, 2); ctx.lineTo(tx, 8); ctx.lineTo(tx + 2.5, 2); ctx.fill(); }
  circ(ctx, 252, -10, 2, '#1E1A16'); _zOog(ctx, 210, -14, 4.5, '#2E2016');
  // voorpoot kort, met hoefjes
  ctx.save(); ctx.translate(124, 18); ctx.rotate(0.6 + slag * 0.1); _zV(ctx, _zLid([[0, -4, 9, 9], [6, 16, 6, 6], [10, 32, 4.5, 4.5]]), huid); _zV(ctx, [[6, 30], [18, 30], [20, 37], [6, 37]], '#2E2A26'); ctx.restore();
  achterpoot(0, huid, 0);
  ctx.restore(); }

// ---------- GEWONE ZEEHOND ----------
// Opgezocht (SeaWorld; Aquarium of the Pacific): 1,2–2 m; lijf rond in het midden en taps naar beide kanten; korte voorflippers met vijf tenen en stompe nagels;
// achterflippers waaiervormig naar achteren, kunnen niet onder het lijf (op het land schuift hij op zijn buik); geen oorschelp; snorharen op dikke kussens;
// zilvergrijs met donkere vlekken, dichter op de rug. o.houding 'liggen' (standaard, op de buik met kop omhoog) of 'zwemmen'. Lengte 360 eenheden.
function zeehond(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, houding = 'liggen' } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a);
  const k = '#8E908A', d = '#5E605C', l = '#C4C6BE', zw = houding === 'zwemmen';
  if (zw) ctx.translate(0, -50);
  const kopOp = zw ? 0 : 1, g = (u) => zw ? Math.sin(u * 4 - t * 2) * 6 * u : 0;
  const R = [[-150, -10 + g(1)], [-120, -46 + g(0.85)], [-40, -74 + g(0.5)], [40, -80 + g(0.3)], [100, -84 + g(0.2) - kopOp * 4], [140, -96 - kopOp * 12], [176, -100 - kopOp * 14], [200, -88 - kopOp * 12], [204, -70 - kopOp * 10], [186, -56 - kopOp * 8], [150, -40], [80, -8 * (zw ? 0 : 1) - (zw ? 26 : 0)], [-20, -2 - (zw ? 30 : 0)], [-110, -2 + g(0.9) - (zw ? 20 : 0)]];
  // achterflippers: samen naar achteren, waaiervormig
  ctx.save(); ctx.translate(-146, -10 + g(1)); ctx.rotate(zw ? Math.sin(t * 2) * 0.3 : 0.08); _zV(ctx, [[8, -10], [-30, -22], [-58, -34, 1], [-62, -24], [-50, -10], [-64, 2, 1], [-58, 10, 1], [-30, 6], [8, 8]], d);
  ctx.strokeStyle = _dk(d, 0.3); ctx.lineWidth = 1.2; for (const yy of [-20, -10, 0]) { ctx.beginPath(); ctx.moveTo(-14, yy * 0.4); ctx.lineTo(-54, yy * 1.2 - 2); ctx.stroke(); } ctx.restore();
  _zV(ctx, R, k); _zIn(ctx, R, () => { _zV(ctx, [[-170, -14], [0, -22], [120, -36], [210, -56], [210, 20], [-170, 20]], l); _zStippen(ctx, -140, -90, 320, 80, 70, 3.2, d, 7, (xx, yy) => yy > -24 - xx * 0.08); _zStippen(ctx, -140, -50, 300, 40, 20, 2.4, '#8A8C86', 9); });
  // kop: ronde schedel, hondachtige snuit, geen oorschelp (alleen een gaatje), grote donkere ogen, V-neusgaten, snorharen
  const ky = -kopOp * 12; _zOog(ctx, 166, -86 + ky, 6.5, '#120E0C', { pupil: 'vol' }); circ(ctx, 140, -84 + ky, 1.6, '#3E403C');
  _zL(ctx, [[198, -80 + ky], [201, -76 + ky], [198, -73 + ky]], '#1A1410', 1.6); _zL(ctx, [[201, -66 + ky], [194, -62 + ky], [186, -63 + ky]], '#3A3834', 1.2);
  ctx.strokeStyle = 'rgba(232,232,224,0.85)'; ctx.lineWidth = 0.9; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(192, -70 + ky + i * 2); ctx.quadraticCurveTo(212, -72 + ky + i * 4, 228, -66 + ky + i * 7); ctx.stroke(); }
  // voorflipper met nagels
  ctx.save(); ctx.translate(86, -26); ctx.rotate(zw ? 0.9 + Math.sin(t * 2) * 0.1 : 0.15); _zV(ctx, [[-10, -8], [14, -6], [30, 6], [32, 16, 1], [-4, 16, 1], [-12, 4]], d); ctx.strokeStyle = '#1E1C1A'; ctx.lineWidth = 1.6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(12 + i * 5.5, 12); ctx.lineTo(15 + i * 5.5, 17); ctx.stroke(); } ctx.restore();
  ctx.restore(); }

// ---------- BOSMUIS ----------
// Opgezocht (Zoogdiervereniging): kop-romp 8–11 cm, staart ±even lang, grote oren en uitpuilende ogen, lange snorharen, lichte buik scherp afgezet; teenganger met roze voetjes.
// Eenheid = cm, anker = midden onder. o.houding 'staan' of 'rechtop' (op de achterpoten, kijkt rond).
function muis(ctx, x, y, s, o = {}) { const { kijk = 1, a = 1, houding = 'staan' } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const v = '#9A7656', vd = '#6E5038', l = '#E2D6C2', roze = '#D8A8A0';
  const op = houding === 'rechtop'; // rechtop: lijf draait om de heup omhoog, achtervoeten en staart blijven op de grond
  if (op) { _zL(ctx, [[-3.6, -0.6], [-6, -0.3], [-9.5, -0.2], [-12.5, -0.6]], '#A88470', 0.5); _zV(ctx, [[-2.6, -0.35], [0.4, -0.4], [0.8, 0, 1], [-2.7, 0, 1]], roze); _zV(ctx, [[-3.4, -0.35], [-0.6, -0.4], [-0.2, 0, 1], [-3.5, 0, 1]], '#C49890');
    ctx.translate(-3.9, -0.7); ctx.rotate(-1.05); ctx.translate(3.9, 0.7); }
  else _zL(ctx, [[-4.4, -1.6], [-7.5, -1.2], [-10.5, -0.6], [-13.5, -0.9]], '#A88470', 0.5); // staart, kaal, zo lang als het lijf
  _zV(ctx, _zLid([[-2.6, -2.2, 1.0, 1.0], [-2.2, -0.9, 0.5, 0.6], [-2.6, -0.2, 0.3, 0.3]]), vd); _zV(ctx, [[-3.1, -0.3], [-1.6, -0.35], [-1.3, 0, 1], [-3.2, 0, 1]], roze);
  const R = [[-4.8, -1.4], [-4.6, -3.0], [-3, -4.3], [-0.4, -4.7], [2, -4.3], [3.6, -3.6], [5.0, -2.6], [5.6, -1.9], [5.2, -1.4], [3.8, -1.1], [2.4, -0.7], [0, -0.6], [-2.6, -0.7], [-4.2, -0.9]];
  _zV(ctx, R, v); _zIn(ctx, R, () => { _zV(ctx, [[-5, -1.2], [-2, -1.5], [1.5, -1.3], [4, -1.6], [5.5, -1.5], [5.5, 0], [-5, 0]], l); _zHaar(ctx, -4.5, -4.8, 8, 3, 40, vd, 0.6, 3.0, 0.08, 3, 0.4); });
  _zV(ctx, _zLid([[-1.8, -2.4, 1.1, 1.3], [-2.4, -1.2, 0.55, 0.6], [-1.6, -0.3, 0.35, 0.35]]), v); _zV(ctx, [[-2.2, -0.35], [-0.4, -0.4], [0, 0, 1], [-2.3, 0, 1]], roze); // achterpoot: dij, hiel, lange voet
  _zV(ctx, _zLid([[2.6, -1.6, 0.5, 0.5], [2.8, -0.5, 0.3, 0.3]]), v); _zV(ctx, [[2.6, -0.3], [3.6, -0.3], [3.9, 0, 1], [2.5, 0, 1]], roze);
  _zV(ctx, [[1.6, -4.0], [1.4, -5.6], [2.2, -6.2], [3.2, -5.8], [3.4, -4.6], [2.8, -3.9]], '#B48E76'); _zV(ctx, [[1.9, -4.3], [1.8, -5.4], [2.4, -5.8], [3.0, -5.4], [3.0, -4.6]], '#D8A898'); // groot oor
  _zOog(ctx, 3.8, -3.2, 0.55, '#120C08', { pupil: 'vol' }); circ(ctx, 5.55, -1.85, 0.28, '#5A3A34');
  ctx.strokeStyle = 'rgba(232,226,214,0.8)'; ctx.lineWidth = 0.06; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(5.0, -1.9); ctx.lineTo(7.2, -2.5 + i * 0.5); ctx.stroke(); }
  ctx.restore(); }

// ---------- CHIMPANSEE ----------
// Opgezocht (eFossils limb proportions; Hunt 1992): knokkelloper; intermembrale index ±106 (armen langer dan benen, mens ±70), dus de schouder staat hoger dan de heup;
// handen op de knokkels (middelste vingerkootjes), voeten plat met een grijpende grote teen; donkere vacht, kaal licht gezicht met wenkbrauwboog en vooruitstekende mond,
// grote ronde oren opzij. Schouderhoogte ±80 eenheden bij s = 1 (zoals voorheen). Aanroep chimp(ctx, x, y, s, a) of chimp(ctx, x, y, s, {a, kijk, houding}).
var _zCHIMP = { H: 100, L: 64, yb: 60, heup: [-24, -60], schouder: [22, -84], spieren: false, armLijn: true, sw: [-34, -66], voetX: [26, -20], verDx: 8, pas: 30, til: 8,
  romp: [[-38, -56], [-37, -70], [-24, -82], [0, -93], [18, -102], [30, -100], [37, -88], [35, -74], [26, -64], [6, -56], [-14, -52], [-30, -50]],
  nekBasis: [26, -92], nekLen: 10, nekHoek: -0.25, nekDik: [26, 22], kopHoek: 0.05, kleur: '#2E2622', verK: '#1E1916', kopK: '#2E2622',
  voor: { a: 41, b: 40, dist: [[7, -0.1]], top: [-6, -10], flex: [-1.2], w: [[12, 12], [10, 9], [5.2, 6.4], [5.8, 5.2], [3.6, 3.8], [4.2, 4.2]] },
  achter: { a: 34, b: 32, dist: [[11.5, 1.1]], top: [2, -4], flex: [0.4], w: [[12, 12], [12, 12.5], [6.5, 7], [5, 6.8], [3.8, 4.2], [3.4, 3.4]] },
  zit: { rot: -1.15, krimp: 1, ax: 18, am: 1.35, vx: 6, nek: -0.3, kop: 0 }, lig: { vx: 30, ax: 26 },
  voet(ctx, F, J, voor, kl, ver, P, lw) { ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2] * 0.6); const k = ver ? kl : '#2A221E';
    if (voor) { _zV(ctx, [[-5, -9], [4, -9.5], [7, -5], [6.5, 0, 1], [-5, 0, 1], [-6.5, -4]], k); if (!ver) { _zL(ctx, [[0, -3], [6, -2.8]], '#4A3E36', lw * 1.2); _zL(ctx, [[-1, -0.6], [5.5, -0.6]], '#5A4A40', lw); } } // vuist op de knokkels
    else { _zV(ctx, [[-14, -4.5], [-6, -6], [2, -4], [8, -2.4], [9, 0, 1], [-15, 0, 1]], k); if (!ver) _zV(ctx, [[-12, -3.8], [-15.5, -6.5], [-16.5, -3], [-14, 0]], '#3A302A'); } ctx.restore(); }, // platte voet, grote teen naar binnen/achter
  kopF(ctx, P, Q, lw) { const g = '#C8A890', gd = '#A88A74'; // schedel met haar, licht kaal gezicht, wenkbrauwboog, uitstekende mond, groot rond oor
    _zV(ctx, [[-6, 4], [-6, -10], [2, -16], [12, -16], [18, -12], [20, -6], [16, 6], [6, 10], [-4, 9]], P.kopK);
    _zV(ctx, [[11, -10], [18, -11.5], [22, -8], [26, -2], [28, 3], [27, 8], [22, 11], [14, 11], [9, 6], [9, -2]], g);
    _zV(ctx, [[10, -11.5], [20, -12.5], [23, -9], [19, -8], [11, -8]], gd); // wenkbrauwboog
    _zL(ctx, [[27.5, 5], [22, 5.4], [18, 4.6]], '#5A4038', 0.9); _zL(ctx, [[20, 0], [24, 1], [26.5, 2]], gd, 0.6); circ(ctx, 26.6, -0.4, 0.6, '#4A3028');
    _zOog(ctx, 17.5, -6.5, 1.4, '#4A2A14', { pupil: 'rond' });
    _zV(ctx, [[0, -7], [-5, -6], [-6.5, 0], [-3, 3.5], [1.5, 1.5]], g); _zL(ctx, [[-1, -4], [-4, -1.5], [-2, 1.5]], gd, 0.8); }, // oor
  rompPatroon(ctx) { _zHaar(ctx, -40, -102, 78, 50, 70, '#4A3E36', 3, 2.2, 0.5, 5); },
  pootPatroon(ctx, P, voor, J) { _zHaar(ctx, Math.min(J[1][0], J[3][0]) - 8, J[1][1], 20, J[3][1] - J[1][1], 18, '#4A3E36', 2.6, voor ? 1.7 : 1.4, 0.4, voor ? 7 : 9); } };
function chimp(ctx, x, y, s = 1, a = 1) { const o = typeof a === 'object' ? a : { a }; return _zVier(ctx, x, y, s * 0.8, _zCHIMP, o); }
