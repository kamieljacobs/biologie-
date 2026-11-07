// Uittreksel uit bibliotheek/dieren/lib_dieren.js (2026-10-28): alleen hond,muis en wat die nodig hebben (scripts: extract.js).
function zacht(ctx, P, dicht = true) { ctx.beginPath(); const n = P.length; if (n < 3) return;
  if (dicht) { const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }
  else { ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < n - 1; i++) { const p = P[i], q = P[i + 1]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.lineTo(P[n - 1][0], P[n - 1][1]); } }
function vul(ctx, P, fill, stroke = null, lw = 2, dicht = true) { zacht(ctx, P, dicht); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
function lijn(ctx, P, col, lw = 2, dicht = false) { if (P.length === 2) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); ctx.lineTo(P[1][0], P[1][1]); } else zacht(ctx, P, dicht); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
const _dk = (hex, k = 0.25) => _mix(hex, k, '#000000');
const _lt = (hex, k = 0.25) => _mix(hex, k, '#FFFFFF');
function _bd(ctx, x, y, s, kijk = 1, a = 1, rot = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s * kijk, s); }
function dierOog(ctx, x, y, r, iris = '#2A1E14', o = {}) { const { pupil = 'rond', rand = null, dicht = 0 } = o; ctx.save();
  if (rand) circ(ctx, x, y, r * 1.25, rand); circ(ctx, x, y, r, iris);
  ctx.fillStyle = '#07090C'; ctx.beginPath();
  if (pupil === 'rond') ctx.arc(x, y, r * 0.55, 0, 6.283);
  else if (pupil === 'liggend') { roundRect(ctx, x - r * 0.75, y - r * 0.22, r * 1.5, r * 0.44, r * 0.2); }
  else if (pupil === 'U') { ctx.moveTo(x - r * 0.7, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.95, x + r * 0.7, y - r * 0.35); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.quadraticCurveTo(x, y + r * 0.45, x - r * 0.4, y - r * 0.35); ctx.closePath(); }
  else if (pupil === 'vol') ctx.arc(x, y, r * 0.92, 0, 6.283);
  ctx.fill(); circ(ctx, x + r * 0.32, y - r * 0.34, Math.max(1.2, r * 0.18), 'rgba(255,255,255,0.75)');
  if (dicht > 0.01) { ctx.beginPath(); ctx.ellipse(x, y, r * 1.3, r * 1.3 * dicht, 0, 0, 6.283); ctx.fillStyle = o.lid || '#3A2A20'; ctx.fill(); }
  ctx.restore(); }
function binnen(ctx, P, fn) { ctx.save(); zacht(ctx, P); ctx.clip(); fn(); ctx.restore(); }
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
function _zLid(J) { const F = [], B = [];
  for (let i = 0; i < J.length; i++) { const a = J[Math.max(0, i - 1)], b = J[Math.min(J.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
    const wv = J[i][2], wa = J[i][3] ?? wv; F.push([J[i][0] + dy * wv, J[i][1] - dx * wv]); B.push([J[i][0] - dy * wa, J[i][1] + dx * wa]); }
  return [...F, ...B.reverse()]; }
function _zHaar(ctx, x0, y0, w, h, n, col, len, an, lw, seed = 1, spr = 0.35) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < n; i++) { const x = x0 + hash(seed + i * 2.31) * w, y = y0 + hash(seed + i * 5.17) * h, a = an + (hash(seed + i * 7.9) - 0.5) * spr * 2, l = len * (0.6 + 0.8 * hash(seed + i * 3.3));
    ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + Math.sin(a) * l * 0.12, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); } ctx.stroke(); }
function _zVoet(ctx, x0, l, h, kleur, lijnK, nagel = null, lw = 0.5) { // zijaanzicht: hielkussen achter, twee zichtbare tenen met knokkels, nagels voorop
  const P = [[x0 - l * 0.16, -h * 0.95], [x0 + l * 0.12, -h * 1.22], [x0 + l * 0.42, -h * 1.12], [x0 + l * 0.56, -h * 0.98], [x0 + l * 0.74, -h * 0.98], [x0 + l * 0.92, -h * 0.66], [x0 + l * 1.0, -h * 0.22], [x0 + l * 0.94, 0, 1], [x0 - l * 0.04, 0, 1], [x0 - l * 0.22, -h * 0.38]];
  _zV(ctx, P, kleur); if (lijnK) { ctx.strokeStyle = lijnK; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + l * 0.56, -h * 0.95); ctx.quadraticCurveTo(x0 + l * 0.6, -h * 0.5, x0 + l * 0.58, -h * 0.08); ctx.moveTo(x0 + l * 0.3, -h * 1.0); ctx.quadraticCurveTo(x0 + l * 0.33, -h * 0.5, x0 + l * 0.3, -h * 0.1); ctx.stroke(); }
  if (nagel) { ctx.fillStyle = nagel; for (const u of [0.66, 0.97]) { ctx.beginPath(); ctx.moveTo(x0 + l * (u - 0.08), -h * 0.32); ctx.quadraticCurveTo(x0 + l * (u + 0.08), -h * 0.3, x0 + l * (u + 0.07), 0); ctx.lineTo(x0 + l * (u - 0.04), -h * 0.02); ctx.closePath(); ctx.fill(); } } }
function _zOog(ctx, x, y, r, iris, o = {}) { const m = ctx.getTransform(), sx = Math.hypot(m.a, m.b); const px = m.a * x + m.c * y + m.e, py = m.b * x + m.d * y + m.f;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); dierOog(ctx, px, py, r * sx, iris, o); ctx.restore(); }
function _zNadruk(ctx, nadruk, E) { if (!nadruk) return; ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3 / E; ctx.setLineDash([10 / E, 7 / E]); ctx.beginPath(); ctx.arc(nadruk[0] * 100, -nadruk[1] * 100, nadruk[2] * 100, 0, 6.283); ctx.stroke(); ctx.restore(); }
function _zIK(R, T, a, b, sgn) { const dx = T[0] - R[0], dy = T[1] - R[1]; let d = Math.hypot(dx, dy); d = Math.max(Math.abs(a - b) + 0.01, Math.min(d, (a + b) * 0.999));
  const A = Math.atan2(dy, dx) + sgn * Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d)))); return [R[0] + a * Math.cos(A), R[1] + a * Math.sin(A)]; }
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
    if (h === 'huilen') { Q.nek = P.huil ? P.huil.nek : -1.5; Q.kop = P.huil ? P.huil.kop : -0.9; Q.bek = 1; Q.oor = 1; } }
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
function _zPootje(ctx, F, J, voor, kl, ver, P, lw) { const vl = P.voetL * (voor ? 1 : 0.92), ph = P.voetH; ctx.save(); ctx.translate(F[0], F[1]); ctx.rotate(F[2] * 0.9 + (F[3] != null && !voor && P.h !== 0 ? 0 : 0));
  _zVoet(ctx, -vl * 0.22, vl, ph, kl, ver ? null : _dk(kl, 0.35), ver ? null : (P.nagel || '#2A2420'), lw * 1.2); ctx.restore(); }
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
function _zStippen(ctx, x0, y0, w, h, n, r, kleur, seed, uit = null) { ctx.fillStyle = kleur; for (let i = 0; i < n; i++) { const x = x0 + hash(seed + i * 1.91) * w, y = y0 + hash(seed + i * 3.73) * h; if (uit && uit(x, y)) continue; const rr = r * (0.6 + 0.7 * hash(seed + i * 5.3));
  ctx.beginPath(); ctx.ellipse(x, y, rr * 1.1, rr * 0.9, hash(seed + i) * 3, 0, 6.283); ctx.fill(); } }
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
function _zProfiel(x0, x1, rug, buik, golf, n = 28) { const T = [], B = []; for (let i = 0; i <= n; i++) { const u = i / n, x = lerp(x0, x1, u), g = golf ? golf(u) : 0; T.push([x, g - rug(u)]); B.push([x, g + buik(u)]); } return [...T, ...B.reverse()]; }
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
function _zPadOpen(ctx, P) { const n = P.length; if (n < 3) return; const g = (i) => P[(i + n) % n]; ctx.moveTo(P[0][0], P[0][1]);
  for (let i = 0; i < n; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2); ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); } ctx.closePath(); }
var _zBULT = {"omtrek":[[-350.0,9.6],[-308.4,19.6],[-290.3,27.7],[-247.8,35.9],[-218.8,43.1],[-202.5,49.4],[-178.1,53.9],[-101.2,74.8],[-70.4,80.2],[-46.9,82.0],[13.7,82.0],[33.6,79.3],[36.3,80.2],[38.1,82.9],[37.2,87.4],[44.5,83.8],[68.9,80.2],[77.0,76.6],[86.1,76.6],[90.6,72.0],[90.6,67.5],[92.4,64.8],[97.8,63.9],[99.6,61.2],[105.1,60.3],[109.6,53.0],[110.5,44.9],[114.1,43.1],[118.6,44.0],[122.3,40.4],[123.2,35.9],[130.4,31.3],[134.0,33.1],[135.8,39.5],[129.5,48.5],[125.0,49.4],[123.2,51.2],[122.3,59.4],[116.8,65.7],[115.9,69.3],[110.5,72.0],[144.0,68.4],[163.9,63.9],[169.3,61.2],[209.1,53.0],[252.5,38.6],[291.4,19.6],[298.7,17.8],[302.3,15.0],[324.0,6.9],[343.0,1.5],[349.3,1.5],[356.6,-2.1],[362.0,-1.2],[363.8,-3.0],[370.1,-4.9],[379.2,-3.0],[381.9,-7.6],[387.3,-8.5],[390.0,-14.8],[393.7,-18.4],[399.1,-21.1],[400.0,-29.3],[391.9,-36.5],[378.3,-40.1],[372.9,-47.4],[366.5,-46.5],[362.0,-49.2],[356.6,-48.3],[351.1,-51.9],[344.8,-51.0],[338.5,-54.6],[332.1,-53.7],[326.7,-57.3],[318.6,-56.4],[314.1,-59.1],[306.8,-58.2],[301.4,-61.9],[296.0,-62.8],[293.2,-66.4],[258.0,-66.4],[238.1,-70.9],[208.2,-74.5],[144.9,-78.1],[141.3,-76.3],[129.5,-78.1],[111.4,-77.2],[107.8,-79.0],[-27.0,-79.0],[-75.9,-76.3],[-96.7,-73.6],[-103.9,-76.3],[-114.8,-76.3],[-118.4,-78.1],[-138.3,-78.1],[-140.1,-75.4],[-142.8,-74.5],[-142.8,-70.0],[-146.4,-65.5],[-151.0,-62.8],[-161.8,-60.0],[-167.2,-56.4],[-174.5,-54.6],[-182.6,-54.6],[-185.3,-51.9],[-204.3,-48.3],[-208.0,-45.6],[-223.3,-45.6],[-232.4,-42.9],[-243.2,-42.9],[-250.5,-39.2],[-266.8,-39.2],[-274.0,-35.6],[-289.4,-32.9],[-312.0,-26.6],[-316.5,-26.6],[-322.0,-23.9],[-325.6,-23.9],[-347.3,-16.6],[-350.0,-14.8]],"vlakken":[[2,[[[-112.1,42.2],[-112.1,44.0],[-104.8,45.8],[-99.4,53.9],[-99.4,58.5],[-103.0,63.0],[-103.0,67.5],[-88.5,72.9],[-85.8,72.0],[-83.1,73.9],[-75.0,73.9],[-68.6,67.5],[-60.5,64.8],[-55.1,64.8],[-49.6,62.1],[-49.6,60.3],[-52.4,59.4],[-62.3,61.2],[-65.9,63.0],[-75.9,63.0],[-77.7,63.9],[-78.6,67.5],[-84.0,71.1],[-93.1,66.6],[-94.9,63.0],[-92.2,61.2],[-83.1,61.2],[-79.5,59.4],[-77.7,56.7],[-78.6,53.0],[-84.9,49.4],[-93.1,53.9],[-95.8,52.1],[-96.7,47.6],[-101.2,43.1],[-105.7,41.3]]]],[2,[[[-170.0,41.3],[-170.0,43.1],[-162.7,46.7],[-156.4,47.6],[-149.2,45.8],[-138.3,52.1],[-135.6,50.3],[-132.0,52.1],[-131.1,51.2],[-124.7,52.1],[-117.5,44.9],[-117.5,43.1],[-120.2,42.2],[-127.4,47.6],[-135.6,50.3],[-146.4,41.3],[-151.9,41.3],[-158.2,44.0],[-163.6,43.1],[-168.2,40.4]]]],[2,[[[-184.4,38.6],[-184.4,40.4],[-182.6,41.3],[-179.0,40.4],[-175.4,42.2],[-173.6,41.3],[-173.6,39.5],[-175.4,38.6],[-176.3,39.5],[-179.9,37.7]]]],[2,[[[19.1,36.8],[17.3,35.9],[5.5,43.1],[4.6,42.2],[1.9,44.0],[1.0,43.1],[-1.7,44.9],[-2.6,44.0],[-8.9,45.8],[-14.4,50.3],[-20.7,53.0],[-23.4,52.1],[-29.7,53.0],[-38.8,57.6],[-38.8,59.4],[-37.0,60.3],[-31.5,59.4],[-20.7,53.9],[-18.0,54.9],[-12.5,53.9],[-4.4,47.6],[14.6,43.1],[19.1,38.6]]]],[2,[[[-227.0,32.2],[-227.0,34.0],[-224.2,35.0],[-220.6,39.5],[-207.1,44.9],[-205.2,44.0],[-198.0,44.9],[-191.7,41.3],[-191.7,39.5],[-193.5,38.6],[-197.1,38.6],[-204.3,42.2],[-213.4,39.5],[-219.7,34.0],[-225.2,31.3]]]],[2,[[[-238.7,29.5],[-242.3,28.6],[-246.9,30.4],[-246.9,32.2],[-243.2,33.1],[-238.7,31.3]]]],[2,[[[-265.9,28.6],[-265.9,30.4],[-264.1,31.3],[-261.3,29.5],[-255.0,32.2],[-252.3,31.3],[-252.3,29.5],[-257.7,27.7],[-261.3,29.5],[-264.1,27.7]]]],[2,[[[230.8,-3.0],[229.0,-4.0],[217.2,-0.3],[210.0,-1.2],[197.3,-0.3],[189.2,3.3],[187.4,2.4],[183.8,3.3],[170.2,11.4],[166.6,10.5],[162.1,11.4],[157.5,7.8],[155.7,8.7],[155.7,15.0],[161.2,16.0],[169.3,12.3],[173.8,13.2],[190.1,4.2],[193.7,5.1],[201.9,3.3],[209.1,4.2],[221.8,3.3],[230.8,-1.2]]]],[2,[[[-350.0,-4.0],[-348.2,-3.0],[-342.8,-5.8],[-338.2,-5.8],[-329.2,-8.5],[-316.5,-7.6],[-311.1,-9.4],[-308.4,-7.6],[-302.1,-13.0],[-294.8,-12.1],[-290.3,-13.9],[-284.0,-13.9],[-274.0,-11.2],[-256.8,-17.5],[-235.1,-19.3],[-228.8,-24.8],[-219.7,-22.0],[-201.6,-21.1],[-196.2,-23.9],[-188.1,-23.9],[-177.2,-29.3],[-168.2,-28.4],[-163.6,-30.2],[-158.2,-26.6],[-150.1,-33.8],[-142.8,-33.8],[-136.5,-35.6],[-126.5,-41.0],[-123.8,-41.0],[-118.4,-37.4],[-113.9,-41.9],[-98.5,-50.1],[-90.3,-52.8],[-84.9,-51.9],[-80.4,-47.4],[-74.1,-47.4],[-67.7,-43.8],[-68.6,-36.5],[-66.8,-35.6],[-63.2,-36.5],[-63.2,-39.2],[-67.7,-42.9],[-67.7,-44.7],[-60.5,-51.0],[-56.0,-48.3],[-56.9,-41.9],[-55.1,-41.0],[-50.5,-41.0],[-42.4,-46.5],[-32.4,-45.6],[-31.5,-42.9],[-36.1,-39.2],[-36.1,-36.5],[-34.3,-35.6],[-28.8,-37.4],[-24.3,-41.9],[-22.5,-47.4],[-19.8,-49.2],[-17.1,-49.2],[-11.6,-45.6],[1.9,-46.5],[5.5,-44.7],[6.5,-41.9],[-2.6,-34.7],[-2.6,-32.0],[-0.8,-31.1],[1.0,-32.0],[4.6,-36.5],[9.2,-38.3],[16.4,-33.8],[17.3,-26.6],[21.8,-22.0],[24.5,-23.0],[27.3,-25.7],[29.1,-30.2],[33.6,-33.8],[55.3,-34.7],[59.8,-37.4],[69.8,-35.6],[81.5,-41.9],[89.7,-41.0],[98.7,-42.9],[106.9,-46.5],[113.2,-46.5],[118.6,-42.9],[123.2,-45.6],[127.7,-44.7],[128.6,-41.0],[125.0,-36.5],[125.0,-34.7],[136.7,-33.8],[140.3,-26.6],[139.4,-21.1],[144.9,-19.3],[146.7,-15.7],[141.3,-10.3],[130.4,-8.5],[122.3,-1.2],[108.7,5.1],[103.3,6.0],[94.2,11.4],[89.7,11.4],[85.2,8.7],[79.7,8.7],[58.9,16.9],[58.9,18.7],[60.7,19.6],[68.0,16.9],[70.7,17.8],[74.3,26.8],[58.9,43.1],[56.2,49.4],[45.4,62.1],[44.5,64.8],[45.4,71.1],[40.8,76.6],[39.9,83.8],[43.5,84.7],[68.0,80.2],[77.0,72.0],[79.7,72.0],[82.4,73.9],[85.2,72.9],[87.0,69.3],[80.6,66.6],[81.5,61.2],[84.3,60.3],[89.7,63.9],[104.2,53.9],[106.0,47.6],[111.4,42.2],[119.5,38.6],[122.3,32.2],[129.5,25.0],[133.1,18.7],[144.9,7.8],[147.6,1.5],[151.2,-2.1],[154.8,-4.0],[157.5,-2.1],[158.4,0.6],[160.3,1.5],[162.1,0.6],[163.0,-3.0],[170.2,-10.3],[171.1,-14.8],[173.8,-17.5],[183.8,-23.0],[183.8,-25.7],[175.6,-28.4],[171.1,-32.9],[171.1,-37.4],[174.7,-40.1],[178.3,-41.0],[186.5,-40.1],[195.5,-34.7],[198.3,-34.7],[209.1,-29.3],[224.5,-29.3],[229.9,-31.1],[235.3,-28.4],[243.5,-29.3],[248.9,-32.0],[254.3,-30.2],[256.2,-26.6],[260.7,-23.9],[259.8,-20.2],[254.3,-14.8],[237.2,-7.6],[237.2,-5.8],[239.0,-4.9],[241.7,-6.7],[248.0,-6.7],[255.2,-10.3],[263.4,-18.4],[275.2,-23.9],[279.7,-23.9],[284.2,-21.1],[296.9,-22.0],[300.5,-20.2],[311.3,-21.1],[323.1,-17.5],[335.8,-17.5],[345.7,-12.1],[353.0,-13.0],[356.6,-11.2],[362.0,-5.8],[379.2,-6.7],[385.5,-10.3],[391.0,-15.7],[391.0,-17.5],[396.4,-21.1],[397.3,-27.5],[387.3,-35.6],[372.9,-41.9],[357.5,-43.8],[351.1,-47.4],[343.9,-47.4],[341.2,-49.2],[332.1,-48.3],[324.9,-52.8],[316.8,-52.8],[311.3,-55.5],[302.3,-55.5],[289.6,-63.7],[272.4,-62.8],[271.5,-63.7],[248.9,-64.6],[241.7,-62.8],[234.4,-62.8],[225.4,-66.4],[204.6,-68.2],[191.0,-72.7],[180.2,-72.7],[179.3,-71.8],[100.5,-72.7],[77.0,-68.2],[53.5,-68.2],[44.5,-73.6],[32.7,-73.6],[31.8,-74.5],[21.8,-74.5],[20.9,-73.6],[-13.4,-74.5],[-20.7,-72.7],[-24.3,-73.6],[-39.7,-73.6],[-40.6,-72.7],[-65.9,-73.6],[-66.8,-72.7],[-100.3,-71.8],[-122.9,-77.2],[-126.5,-75.4],[-129.3,-77.2],[-134.7,-77.2],[-141.0,-74.5],[-141.0,-70.9],[-149.2,-61.9],[-159.1,-59.1],[-170.0,-53.7],[-181.7,-51.9],[-189.0,-48.3],[-199.8,-47.4],[-208.9,-43.8],[-222.4,-43.8],[-228.8,-41.0],[-243.2,-41.0],[-248.7,-38.3],[-265.0,-38.3],[-274.0,-33.8],[-300.2,-29.3],[-313.8,-24.8],[-321.0,-23.9],[-341.9,-17.5],[-350.0,-13.0]],[[367.4,-25.7],[373.8,-31.1],[377.4,-32.0],[386.4,-26.6],[391.0,-25.7],[391.9,-20.2],[386.4,-16.6],[381.9,-16.6],[375.6,-21.1],[372.9,-20.2],[369.2,-21.1],[367.4,-23.0]],[[-265.9,-32.9],[-263.1,-34.7],[-257.7,-33.8],[-251.4,-31.1],[-249.6,-27.5],[-252.3,-25.7],[-256.8,-25.7],[-265.0,-29.3]],[[235.3,-46.5],[238.1,-44.7],[238.1,-41.9],[233.5,-38.3],[229.9,-41.0],[229.9,-43.8]],[[187.4,-52.8],[193.7,-55.5],[197.3,-52.8],[197.3,-50.1],[194.6,-48.3],[191.0,-48.3],[187.4,-51.0]],[[-139.2,-70.9],[-134.7,-72.7],[-132.0,-70.9],[-132.0,-69.1],[-136.5,-66.4],[-139.2,-68.2]],[[-122.9,-72.7],[-123.8,-70.0],[-127.4,-68.2],[-132.0,-70.0],[-130.2,-73.6],[-126.5,-75.4]]]],[1,[[[74.3,74.8],[74.3,76.6],[76.1,77.5],[83.4,76.6],[83.4,74.8],[79.7,72.9],[77.0,72.9]]]],[1,[[[81.5,62.1],[81.5,66.6],[87.9,68.4],[89.7,67.5],[89.7,65.7],[84.3,61.2]]]],[1,[[[109.6,49.4],[107.8,48.5],[106.0,49.4],[105.1,54.9],[96.9,59.4],[96.9,61.2],[98.7,62.1],[106.0,59.4],[106.9,54.9],[109.6,53.0]]]],[1,[[[-246.0,35.0],[-246.0,36.8],[-236.9,38.6],[-222.4,43.1],[-219.7,42.2],[-219.7,40.4],[-224.2,35.9],[-230.6,33.1],[-239.6,32.2]]]],[1,[[[73.4,25.0],[70.7,21.4],[70.7,18.7],[68.9,17.8],[61.6,19.6],[49.9,25.9],[44.5,26.8],[29.1,35.9],[23.6,36.8],[18.2,39.5],[12.8,44.9],[-4.4,48.5],[-12.5,54.9],[-22.5,55.8],[-31.5,60.3],[-47.8,62.1],[-55.1,65.7],[-60.5,65.7],[-68.6,68.4],[-75.0,74.8],[-88.5,73.9],[-102.1,69.3],[-103.9,67.5],[-103.9,63.0],[-100.3,58.5],[-100.3,53.9],[-103.0,48.5],[-106.6,45.8],[-117.5,45.8],[-124.7,53.0],[-130.2,52.1],[-138.3,53.0],[-149.2,46.7],[-160.0,48.5],[-169.1,44.0],[-176.3,42.2],[-191.7,42.2],[-198.0,45.8],[-202.5,45.8],[-204.3,46.7],[-204.3,48.5],[-191.7,52.1],[-170.9,55.8],[-164.5,58.5],[-146.4,62.1],[-137.4,65.7],[-101.2,74.8],[-70.4,80.2],[-47.8,81.1],[-46.9,82.0],[13.7,82.0],[33.6,79.3],[38.1,81.1],[39.9,80.2],[39.9,76.6],[44.5,71.1],[43.5,68.4],[44.5,62.1],[55.3,49.4],[58.0,43.1],[72.5,28.6]]]],[1,[[[115.9,70.2],[117.7,71.1],[125.0,70.2],[125.9,71.1],[144.0,68.4],[152.1,65.7],[163.9,63.9],[169.3,61.2],[209.1,53.0],[252.5,38.6],[291.4,19.6],[297.8,17.8],[297.8,16.0],[296.0,15.0],[164.8,15.0],[161.2,16.9],[157.5,16.9],[154.8,15.0],[138.5,15.0],[134.0,18.7],[134.0,22.3],[130.4,24.1],[123.2,32.2],[123.2,34.0],[125.0,35.0],[130.4,31.3],[134.9,35.0],[135.8,39.5],[130.4,47.6],[123.2,51.2],[123.2,57.6],[116.8,65.7]],[[140.3,19.6],[144.9,23.2],[144.9,25.0],[142.2,28.6],[138.5,30.4],[134.0,26.8],[134.0,22.3]]]]],"rang":[0,2,1],"grond":0,"oog":[215.4,-23.0],"mond":[[396.4,-15.7],[315.0,-6.7],[242.6,2.4],[215.4,-1.2]]};
function bultrug(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, heup = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const B = _zBULT, tint = ['#262E38', '#3A4450', '#C9CFD7'], pal = B.rang.map(r => tint[r]), rug = pal[B.grond], fase = t * 1.1;
  const golf = (u) => Math.sin(fase - u * 2.2) * 26 * Math.pow(Math.max(0, u - 0.35) / 0.65, 2), G = (p) => [p[0], p[1] + golf((400 - p[0]) / 750)];
  const R = B.omtrek.map(G), r0 = 1 - rontgen * 0.8, sg = golf(1), dsg = (golf(1) - golf(0.96)) / 30;
  ctx.save(); ctx.globalAlpha *= r0;
  ctx.save(); ctx.translate(-350, sg + 4); ctx.rotate(Math.atan(dsg) * 1.6 + Math.cos(fase - 2.2) * 0.25); // staartvin: horizontaal, van opzij een wig met twee punten
  _zV(ctx, [[14, -9], [-30, -12], [-80, -22, 1], [-112, -20, 1], [-96, -8], [-112, 2, 1], [-104, 12, 1], [-70, 14], [-30, 9], [14, 9]], tint[0]); ctx.restore();
  _zV(ctx, R, rug); _zIn(ctx, R, () => { for (const [ci, rings] of B.vlakken) { ctx.beginPath(); for (const r of rings) _zPadOpen(ctx, r.map(G)); ctx.fillStyle = pal[ci]; ctx.fill('evenodd'); }
    for (let i = 0; i < 9; i++) circ(ctx, 372 - i * 14, -16 - i * 3.2 + golf(0), 3.2, '#4A5462'); });
  _zL(ctx, B.mond.map(G), '#141A22', 2.2); _zOog(ctx, B.oog[0], B.oog[1] + 2, 4.4, '#3A2A1E', { rand: '#1C232C' });
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; _zV(ctx, R, null, rgba(C.line, 0.9), 2);
    vul(ctx, [[396, -8], [330, -30], [260, -46], [214, -44], [206, -10], [250, 0], [330, -2]], BOT.kaal, BOT.kaalR, 1.5); vul(ctx, [[396, 2], [320, 8], [250, 14], [240, 6], [320, 0]], BOT.kaal);
    for (let i = 0; i < 30; i++) { const u = i / 29, vx = 200 - u * 540, vy = -36 + Math.sin(u * 3.1) * -14 + u * 30 + golf(0.25 + u * 0.75); roundRect(ctx, vx - 7, vy - 9 + u * 3, 14 - u * 5, 18 - u * 8, 3); shape(ctx, BOT.kaal, BOT.kaalR, 1); }
    ctx.strokeStyle = BOT.kaal; ctx.lineWidth = 3.5; for (let i = 0; i < 9; i++) { const rx = 180 - i * 22; ctx.beginPath(); ctx.moveTo(rx, -42 + i * 0.6); ctx.quadraticCurveTo(rx - 26, 10, rx - 18, 52 - i * 2); ctx.stroke(); }
    const hc = heup > 0.01 ? C.goud : BOT.kaal, hy = golf(0.68); bot(ctx, -122, 42 + hy, -86, 30 + hy, 9, hc); bot(ctx, -112, 52 + hy, -76, 40 + hy, 9, hc); ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= (rontgen > 0.01 ? 1 - rontgen * 0.75 : 1); ctx.translate(140, 24); ctx.rotate(-0.05 + Math.sin(t * 0.7) * 0.08); // borstvin: ±⅓ van de lengte, wit met knobbels op de voorrand
  const FL = [[18, -12], [8, 8]]; for (let i = 1; i <= 10; i++) { const u = i / 10; FL.push([8 - u * 236 + (i % 2 ? 2.5 : -1.5), 8 + u * 140 + (i % 2 ? 4.5 : 0)]); } FL.push([-246, 150, 1], [-206, 116], [-140, 76], [-70, 36], [-24, 2], [0, -16]);
  _zV(ctx, FL, '#D8DDE3'); _zIn(ctx, FL, () => { _zV(ctx, [[30, -30], [-60, 10], [-160, 60], [-250, 100], [-250, 200], [40, 200]], '#3A4450'); _zStippen(ctx, -200, 40, 200, 110, 14, 4, '#B4BCC6', 9); });
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(140, 24); bot(ctx, 4, -2, -26, 16, 20, BOT.arm); bot(ctx, -28, 18, -70, 46, 14, BOT.onder); bot(ctx, -24, 30, -64, 56, 12, BOT.onder);
    for (let dd = 0; dd < 4; dd++) { let px = -72 - dd * 2, py = 50 + dd * 8; const n = [5, 7, 6, 4][dd]; for (let kk = 0; kk < n; kk++) { const nx = px - 22, ny = py + 13 - dd * 0.5; bot(ctx, px, py, nx, ny, 8 - kk * 0.5, BOT.hand, { kop: 1.1 }); px = nx; py = ny; } }
    ctx.restore(); }
  ctx.restore(); }
function _hx(c) { if (c[0] === '#') return c.length === 4 ? '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c; const m = c.match(/\d+/g).map(Number); return '#' + m.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join(''); }
function _mx(c, k, met) { const a = parseInt(_hx(c).slice(1), 16), b = parseInt(met.slice(1), 16); const m = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => m(s).toString(16).padStart(2, '0')).join(''); }
const _D = (c, k = 0.25) => _mx(c, k, '#000000'), _L = (c, k = 0.25) => _mx(c, k, '#FFFFFF');
function _A(c, a) { const n = parseInt(_hx(c).slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function _buis(P, top, bot) { const N = P.length, L = [], R = [];
  for (let i = 0; i < N; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(N - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; const nx = dy / l, ny = -dx / l; // nx,ny = 'boven' bij looprichting naar rechts
    L.push([P[i][0] + nx * top[i], P[i][1] + ny * top[i]]); R.push([P[i][0] - nx * bot[i], P[i][1] - ny * bot[i]]); }
  return L.concat(R.reverse()); }
function _prof(tab, u) { for (let i = 0; i < tab.length - 1; i++) { const [u0, a] = tab[i], [u1, b] = tab[i + 1]; if (u <= u1) { const f = (u - u0) / (u1 - u0 || 1); const g = f * f * (3 - 2 * f); return a + (b - a) * g; } } return tab[tab.length - 1][1]; }
function _streek(ctx, P, Wd, fill, rand = null, lw = 1.2) { const top = Wd.map(w => w / 2), O = _buis(P, top, top); vul(ctx, O, fill, rand, lw); }
function _zwemLijf(x0, x1, top, bot, golf) { // x0 = snuit (rechts), x1 = staartwortel (links); top/bot = profielen op u 0..1; golf(u) = verticale verschuiving
  const N = 28, P = [], T = [], B = []; for (let i = 0; i <= N; i++) { const u = i / N; P.push([lerp(x0, x1, u), golf(u)]); T.push(_prof(top, u)); B.push(_prof(bot, u)); }
  const seg = (u) => { const i = Math.max(0, Math.min(N - 1, Math.floor(u * N))); return [i, u * N - i]; };
  const hoek = (u) => { const [i] = seg(u); return Math.atan2(P[i][1] - P[i + 1][1], P[i][0] - P[i + 1][0]); }; // richting naar de snuit
  const pt = (u, v = 0) => { const [i, f] = seg(u), a = P[i], b = P[i + 1]; const px = lerp(a[0], b[0], f), py = lerp(a[1], b[1], f), an = hoek(u); return [px + Math.sin(an) * v, py - Math.cos(an) * v]; }; // v > 0 = rugzijde
  return { O: _buis(P, T, B), P, pt, hoek }; }
function _vin(ctx, Z, u, v, pts, fill, rand = null, rot = 0) { const [px, py] = Z.pt(u, v), an = Z.hoek(u) + rot; ctx.save(); ctx.translate(px, py); ctx.rotate(an); vul(ctx, pts, fill, rand, 1.6); ctx.restore(); return [px, py, an]; }
function haai(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', fase = houding === 'recht' ? 0 : t * 3.2; const zw = houding === 'recht' ? 0 : 1;
  const rug = '#6E7A86', rugD = '#56616C', buik = '#DCE0E4', rand = '#96A2AE', zwart = '#1E242A';
  const golf = (u) => zw * Math.sin(fase - u * 4) * 3 * u * u; // zijwaartse slag: van opzij hooguit een klein deinen
  const top = [[0, 3], [0.04, 14], [0.12, 33], [0.3, 50], [0.5, 42], [0.7, 26], [0.88, 13], [1, 10]], ond = [[0, 5], [0.05, 16], [0.15, 34], [0.32, 41], [0.5, 34], [0.7, 20], [0.88, 10], [1, 9]];
  const Z = _zwemLijf(252, -206, top, ond, golf); const r = 1 - rontgen * 0.75;
  const swing = Math.cos(fase - 4); // staartvin draait zijwaarts: lijkt smaller
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin (heterocerk): grote bovenlob met inkeping bij de punt, kleinere onderlob; zwarte achterrand
  const [tx, ty, ta] = Z.pt(1, 0).concat([Z.hoek(1)]); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta); ctx.scale(0.72 + 0.28 * Math.abs(swing * zw + (1 - zw)), 1);
  const SV = [[6, -9], [-24, -30], [-62, -74], [-96, -112], [-104, -112], [-96, -94], [-84, -84], [-76, -50], [-62, -12], [-66, 8], [-82, 34], [-92, 52], [-70, 46], [-30, 18], [6, 9]];
  vul(ctx, SV, rug, rand, 2); binnen(ctx, SV, () => { lijn(ctx, [[-104, -112], [-96, -94], [-84, -84], [-76, -50], [-62, -12], [-66, 8], [-82, 34], [-92, 52]], zwart, 7); }); ctx.restore();
  // rugvinnen, buikvinnen, aarsvin (vast op het lijf)
  _vin(ctx, Z, 0.36, 44, [[14, 4], [-6, -40], [-22, -70], [-30, -72], [-40, -40], [-50, 0]], rug, rand);
  _vin(ctx, Z, 0.74, 22, [[4, 2], [-6, -18], [-12, -20], [-16, -4], [-26, 0]], rugD, rand); _vin(ctx, Z, 0.74, 22, [[-6, -18], [-12, -20], [-14, -12]], zwart);
  _vin(ctx, Z, 0.6, -30, [[6, -2], [-8, 18], [-20, 22], [-24, 6], [-30, -2]], rugD); _vin(ctx, Z, 0.76, -18, [[4, -2], [-6, 16], [-12, 18], [-16, 2], [-22, -2]], rugD);
  // lijf met tegenschaduw
  vul(ctx, Z.O, rug, rand, 2);
  binnen(ctx, Z.O, () => { const L = []; for (let i = 0; i <= 20; i++) { const u = i / 20; L.push(Z.pt(u, -_prof(ond, u) * (u < 0.1 ? 0.2 : 0.1) + (u < 0.15 ? 2 : 6))); } L.push([-260, 80], [300, 80]); vul(ctx, L, buik);
    // kieuwspleten: vijf licht gebogen lijnen boven de borstvin
    ctx.strokeStyle = _D(rug, 0.32); ctx.lineWidth = 2.4; for (let i = 0; i < 5; i++) { const u = 0.15 + i * 0.022; const p1 = Z.pt(u, 20 - i), p2 = Z.pt(u + 0.006, -10 - i * 2); ctx.beginPath(); ctx.moveTo(...p1); ctx.quadraticCurveTo(p1[0] - 5, (p1[1] + p2[1]) / 2, p2[0], p2[1]); ctx.stroke(); } });
  // bek (onderstandig), neusgat, oog
  const m0 = Z.pt(0.07, -10), m1 = Z.pt(0.115, -18); ctx.strokeStyle = '#2A3038'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(...m0); ctx.quadraticCurveTo(m0[0] - 8, m0[1] + 6, m1[0], m1[1]); ctx.stroke();
  circ(ctx, ...Z.pt(0.03, -4), 1.8, '#3A4048'); const oe = Z.pt(0.085, 6); dierOog(ctx, oe[0], oe[1], 5.2, '#2A3036');
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, Z.O, null, _A(C.line, 0.9), 2);
    lijn(ctx, Z.P.slice(3).map(p => [p[0], p[1] - 4]), '#B8C8C0', 4); ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 2; for (let i = 0; i < 26; i++) { const u = 0.12 + i * 0.033, p = Z.pt(u, 4); ctx.beginPath(); ctx.moveTo(p[0], p[1] - 6); ctx.lineTo(p[0], p[1] + 6); ctx.stroke(); }
    ctx.restore(); }
  // borstvin: sikkelvormig, vast laag achter de kieuwen
  ctx.save(); ctx.translate(110, 24 + golf(0.24));
  vul(ctx, [[12, -6], [-10, 22], [-44, 60], [-70, 80], [-78, 78], [-58, 46], [-32, 6]], rontgen > 0.01 ? _A('#6E7A86', 0.25) : rugD, rontgen > 0.01 ? C.line : rand, 2);
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.strokeStyle = '#B8C8C0'; ctx.lineWidth = 2.5; for (let i = 0; i < 9; i++) { const f = i / 8; ctx.beginPath(); ctx.moveTo(-6 - f * 20, 4 + f * 4); ctx.lineTo(-30 - f * 36, 36 + f * 32); ctx.stroke(); } bot(ctx, 4, -6, -26, 4, 7, '#B8C8C0'); ctx.restore(); }
  ctx.restore();
  ctx.restore(); }
function dolfijn(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rontgen = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', zw = houding === 'recht' || rontgen > 0.01 ? 0 : 1, fase = t * 2.6;
  const mantel = '#4E5C6A', flank = '#76848F', buik = '#D0D6DC', rand = '#9AA6B2';
  const golf = (u) => zw * Math.sin(fase - u * 3.2) * 46 * Math.max(0, u - 0.3) ** 1.5; // op-en-neer slag, vooral achter de rugvin
  const top = [[0, 5], [0.055, 8], [0.08, 30], [0.13, 48], [0.22, 56], [0.4, 60], [0.6, 46], [0.78, 24], [0.92, 13], [1, 9]], ond = [[0, 6], [0.05, 9], [0.1, 22], [0.22, 42], [0.4, 52], [0.6, 38], [0.78, 17], [0.92, 9], [1, 7]];
  const Z = _zwemLijf(250, -222, top, ond, golf); const r = 1 - rontgen * 0.75;
  ctx.save(); ctx.globalAlpha *= r;
  // staartvin: horizontaal, van opzij een smalle wig die met de slag op en neer kantelt
  const [tx, ty] = Z.pt(1, 0), ta = Z.hoek(1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta + zw * Math.cos(fase - 3.2) * 0.35);
  vul(ctx, [[6, -7], [-30, -10], [-62, -18], [-78, -12], [-64, 0], [-78, 12], [-62, 18], [-30, 10], [6, 7]], mantel, rand, 2); ctx.restore();
  _vin(ctx, Z, 0.5, 56, [[26, 4], [6, -30], [-16, -62], [-32, -72], [-28, -54], [-34, -20], [-46, 2]], mantel, rand);
  vul(ctx, Z.O, flank, rand, 2);
  binnen(ctx, Z.O, () => { const T = [], B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; T.push(Z.pt(u, _prof(top, u) * 0.35 - 4)); B.push(Z.pt(u, -_prof(ond, u) * 0.3)); }
    vul(ctx, T.concat([[-300, -120], [320, -120]]), mantel); vul(ctx, B.concat([[-300, 120], [320, 120]]), buik); });
  // mondlijn, oog, blaasgat
  const m = [Z.pt(0, 0), Z.pt(0.06, -1), Z.pt(0.1, 3)]; lijn(ctx, m, '#2A3038', 2); dierOog(ctx, ...Z.pt(0.125, 6), 4.6, '#1E2226');
  const bg = Z.pt(0.17, _prof(top, 0.17) - 2); ctx.beginPath(); ctx.ellipse(bg[0], bg[1], 4, 1.6, 0, 0, 6.283); ctx.fillStyle = '#2A3038'; ctx.fill();
  ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; vul(ctx, Z.O, null, _A(C.line, 0.9), 2); ctx.restore(); }
  const FL = [[14, -6], [-6, 18], [-40, 48], [-58, 54], [-50, 34], [-22, 4]];
  ctx.save(); ctx.translate(120, 30 + golf(0.24)); ctx.globalAlpha *= (rontgen > 0.01 ? 0.4 : 1); vul(ctx, FL, _D(mantel, 0.05), rand, 1.6); ctx.restore();
  if (rontgen > 0.01) { ctx.save(); ctx.globalAlpha *= rontgen; ctx.translate(120, 30); vul(ctx, FL, null, C.line, 2);
    bot(ctx, 8, -6, -4, 8, 11, BOT.arm); bot(ctx, -6, 10, -18, 24, 8, BOT.onder); bot(ctx, -2, 14, -14, 28, 8, BOT.onder);
    for (let d = 0; d < 4; d++) { let px = -18 + d * 3, py = 28 + d * 2; for (let k = 0; k < [3, 5, 4, 2][d]; k++) { const nx = px - 7, ny = py + 6; bot(ctx, px, py, nx, ny, 4, BOT.hand, { kop: 1.05 }); px = nx; py = ny; } } ctx.restore(); }
  ctx.restore(); }
function ichthyosaurus(ctx, x, y, s = 1, o = {}) { const { a = 1, kijk = 1, t = 0, rot = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, kijk, a, rot);
  const houding = o.houding || 'zwemmen', zw = houding === 'recht' ? 0 : 1, fase = t * 3;
  const rug = '#56604C', rugD = '#454E3C', buik = '#CCC8B0', rand = '#8A9478';
  const golf = (u) => zw * Math.sin(fase - u * 4) * 3 * u * u;
  const top = [[0, 2], [0.14, 5], [0.2, 18], [0.27, 36], [0.42, 56], [0.6, 42], [0.8, 18], [0.94, 9], [1, 8]], ond = [[0, 2], [0.14, 5], [0.2, 16], [0.27, 32], [0.42, 50], [0.6, 34], [0.8, 14], [0.94, 8], [1, 7]];
  const Z = _zwemLijf(300, -196, top, ond, golf); const swing = zw ? Math.abs(Math.cos(fase - 4)) : 1;
  // staartvin: maanvormig, wervelkolom loopt in de onderlob
  const [tx, ty] = Z.pt(1, 0), ta = Z.hoek(1); ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta); ctx.scale(0.7 + 0.3 * swing, 1);
  const SV = [[6, -7], [-30, -26], [-62, -64], [-80, -78], [-72, -46], [-58, -6], [-60, 10], [-78, 54], [-84, 82], [-62, 64], [-30, 24], [6, 7]]; vul(ctx, SV, rug, rand, 2);
  lijn(ctx, [[0, 0], [-34, 18], [-66, 52]], _A(rugD, 0.8), 3); ctx.restore();
  _vin(ctx, Z, 0.46, 44, [[16, 4], [-2, -36], [-14, -52], [-24, -48], [-36, 2]], rug, rand);
  _vin(ctx, Z, 0.66, -26, [[6, -2], [-10, 18], [-28, 30], [-34, 26], [-22, 6], [-12, -2]], rugD);
  vul(ctx, Z.O, rug, rand, 2);
  binnen(ctx, Z.O, () => { const B = []; for (let i = 0; i <= 24; i++) { const u = i / 24; B.push(Z.pt(u, -_prof(ond, u) * 0.15 + 3)); } vul(ctx, B.concat([[-300, 120], [340, 120]]), buik);
    ctx.fillStyle = _A('#8A9478', 0.35); for (let i = 0; i < 30; i++) { const p = Z.pt(0.25 + hash(i * 3.1) * 0.6, 10 + hash(i * 5.7) * 26); ctx.beginPath(); ctx.arc(p[0], p[1], 1.6, 0, 6.283); ctx.fill(); } });
  // bek met tanden, groot oog met scleraalring
  const m0 = Z.pt(0, 0), m1 = Z.pt(0.2, -2); lijn(ctx, [m0, m1], '#24281E', 2); ctx.fillStyle = '#E8E2CC'; for (let i = 0; i < 12; i++) { const p = Z.pt(0.01 + i * 0.015, 0); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] - 2, p[1] + (i % 2 ? 4 : -4)); ctx.lineTo(p[0] - 4, p[1]); ctx.fill(); }
  const oe = Z.pt(0.24, 10); circ(ctx, oe[0], oe[1], 17, _D(rug, 0.2), '#B8B49A', 3); ctx.strokeStyle = '#8A8670'; ctx.lineWidth = 1.2; for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283; ctx.beginPath(); ctx.moveTo(oe[0] + Math.cos(an) * 11, oe[1] + Math.sin(an) * 11); ctx.lineTo(oe[0] + Math.cos(an) * 16, oe[1] + Math.sin(an) * 16); ctx.stroke(); }
  dierOog(ctx, oe[0], oe[1], 9, '#4A3A1A');
  // voorvin: groot, smal, sikkelvormig
  _vin(ctx, Z, 0.32, -34, [[8, -2], [-12, 24], [-36, 52], [-50, 62], [-50, 52], [-30, 18], [-16, -2]], rugD, rand);
  ctx.restore(); }
function _bladOmtrek(w) { const P = [], n = 40, hw = (u) => w * 0.43 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 0.85) * (1 - 0.25 * Math.pow(u, 5));
  const tand = (u) => 1 + 0.06 * (((u * 22) % 1) < 0.7 ? ((u * 22) % 1) / 0.7 : (1 - ((u * 22) % 1)) / 0.3) * (u > 0.08 && u < 0.95 ? 1 : 0);
  for (let i = 0; i <= n; i++) { const u = i / n; P.push([u * 2 * w, -hw(u) * tand(u)]); } for (let i = n; i >= 0; i--) { const u = i / n; P.push([u * 2 * w, hw(u) * tand(u + 0.02)]); } return { P, hw }; }
function blad(ctx, x, y, w, o = {}) { const { a = 1, rot = 0, kleur = '#5FA86E', steel = 0.3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const { P, hw } = _bladOmtrek(w); const d = _D(kleur, 0.18), l = _L(kleur, 0.1);
  if (steel > 0) _streek(ctx, [[-w * steel, w * 0.02], [-w * steel * 0.4, 0], [w * 0.04, 0]], [w * 0.035, w * 0.04, w * 0.05], d);
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = kleur; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = l; ctx.fillRect(0, 0, w * 2.2, w); ctx.restore();
  ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.strokeStyle = _L(kleur, 0.25); ctx.lineWidth = Math.max(1.2, w * 0.012); ctx.stroke();
  // nerven: middennerf dunner naar de top, zijnerven gebogen naar voren, eindigen net binnen de rand
  ctx.strokeStyle = _L(kleur, 0.3); ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1.4, w * 0.018); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(w, -w * 0.02, w * 1.96, 0); ctx.stroke();
  ctx.lineWidth = Math.max(1, w * 0.008); for (let k = 1; k <= 8; k++) { const u = k / 9.5; const h = hw(Math.min(1, u + 0.08)) * 0.88; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(u * 2 * w, 0); ctx.quadraticCurveTo(u * 2 * w + w * 0.1, sg * h * 0.55, u * 2 * w + w * 0.26, sg * h); ctx.stroke(); } }
  ctx.restore(); }
const HondPop = (() => {
  const RAD = Math.PI / 180;
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const dir = (a) => [Math.cos(a), Math.sin(a)];
  const mul = (v, k) => [v[0] * k, v[1] * k];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const len = (v) => Math.hypot(v[0], v[1]);
  const lin = (a, b, u) => a + (b - a) * u;
  const sstep = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  // sleutelkromme [[u, waarde], ...] met zachte overgangen; per = periodiek (u modulo 1, laatste = eerste)
  const kurve = (K, u) => { u = Math.max(K[0][0], Math.min(K[K.length - 1][0], u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  let STAP = 0.7; // bemonsteringsstap van de vormen (cm); per dier D.stap (kleine dieren fijner)
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function spline(P) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = [];
    const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n];
      const st = Math.max(2, Math.ceil(len(sub(b, a)) / STAP));
      for (let s = 0; s < st; s++) { const u = s / st, u2 = u * u, u3 = u2 * u; const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
        out.push([h00 * a[0] + h10 * ta[0] + h01 * b[0] + h11 * tb[0], h00 * a[1] + h10 * ta[1] + h01 * b[1] + h11 * tb[1]]); } }
    return out; }
  function openLijn(P) { const out = []; const n = P.length; for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)];
      const ta = [(b[0] - p0[0]) / 2, (b[1] - p0[1]) / 2], tb = [(p3[0] - a[0]) / 2, (p3[1] - a[1]) / 2]; const st = Math.max(2, Math.ceil(len(sub(b, a)) / STAP));
      for (let k = 0; k <= st; k++) { const u = k / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function binnen(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
  function pad(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  // vlek: onregelmatige ronde vorm (cm)
  function vlekVorm(c, r, seed, rek = 1, hoek = 0) { const P = []; const n = 7; for (let i = 0; i < n; i++) { const a = i / n * 6.283; const rr = r * (0.78 + 0.4 * hsh(seed * 7.1 + i * 1.7));
      P.push(add(c, rot([Math.cos(a) * rr * rek, Math.sin(a) * rr], hoek))); } return spline(P); }
  // band (streep) langs een middenlijn met breedte die taps afloopt: lijn = [[x,y],...] (cm), w0 -> w1
  function streep(lijn, w0, w1) { const L = openLijn(lijn); const n = L.length; if (n < 2) return null; const l = [], r = [];
    for (let i = 0; i < n; i++) { const a = L[Math.max(0, i - 1)], b = L[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = i / (n - 1), w = lin(w0, w1, u) * Math.sin(Math.PI * Math.min(1, 0.15 + u * 0.85)) ** 0.35;
      l.push(add(L[i], mul(nn, w))); r.push(sub(L[i], mul(nn, w))); } return l.concat(r.reverse()); }

  // ---------- generieke botten ----------
  const POOTB = (z) => [['scap' + z, 'rompV', 'schoft', 'schouder'], ['hum' + z, 'scap' + z, 'schouder', 'elleboog'], ['rad' + z, 'hum' + z, 'elleboog', 'pols'], ['mc' + z, 'rad' + z, 'pols', 'vkogel'], ['vp' + z, 'mc' + z, 'vkogel', 'vteen'],
    ['dij' + z, 'rompA', 'heup', 'knie'], ['schn' + z, 'dij' + z, 'knie', 'hak'], ['mt' + z, 'schn' + z, 'hak', 'akogel'], ['ap' + z, 'mt' + z, 'akogel', 'ateen']];
  const BOTEN = [['rompV', null, 'midrug', 'nekBasis'], ['rompM', null, 'midrug', 'lend'], ['rompA', 'rompM', 'lend', 'kruis'],
    ['nek', 'rompV', 'nekBasis', 'kop'], ['kop', 'nek', 'kop', 'neus'], ['kaak', 'kop', 'kaak', 'kin'], ...POOTB(''), ...POOTB('F'),
    ['st0', 'rompA', 'staart0', 'staart1'], ['st1', 'st0', 'staart1', 'staart2'], ['st2', 'st1', 'staart2', 'staart3'], ['st3', 'st2', 'staart3', 'staart4']];
  const ROMPNAMEN = ['rompV', 'rompM', 'rompA', 'nek', 'kop', 'kaak', 'st0', 'st1', 'st2', 'st3'];
  const LEGS = ['A', 'AF', 'V', 'VF'];

  function maak(D) {
    STAP = D.stap || 0.7; const K = D.K, X0 = D.X0, G0 = D.G0; const kr = D.krimp; // krimp = [xa, xb, f]: lijf tussen xa en xb (plaat-px) in x samendrukken (AI-platen zijn te lang; rasstandaard wint)
    const wx = (x) => { if (!kr) return x; const d = (kr[1] - kr[0]) * (1 - kr[2]); return x <= kr[0] ? x + d / 2 : x >= kr[1] ? x - d / 2 : kr[0] + d / 2 + (x - kr[0]) * kr[2]; };
    const cm = (p) => [(wx(p[0]) - wx(X0)) / K, (p[1] - G0) / K]; D.HOUDING.rust = D.HOUDING.rust || {};
    const J = {}; for (const k in D.J) J[k] = cm(D.J[k]); if (D.anker == null) D.anker = (J.schouder[0] + J.heup[0]) / 2; // anker = midden tussen schouder en heup (midden onder het dier)
    const BOT = {}, ORDE = [];
    for (const [n, par, j0, j1] of BOTEN) { const v = sub(J[j1], J[j0]); BOT[n] = { n, par, j0, j1, L: len(v), A0: ang(v), J0: J[j0] }; ORDE.push(n); }
    for (const n of ORDE) { const b = BOT[n]; b.off = b.par ? rot(sub(b.J0, BOT[b.par].J0), -BOT[b.par].A0) : [0, 0]; }
    const ROOT0 = J.midrug;
    const PAL = Object.assign({ neus: '#2A2220', klauw: '#2A2420', mond: '#3A2622', tong: '#B86A64', vlek: '#2A221E' }, D.PAL);
    const PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.3, D.verKleur || '#3E3A36');
    const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');

    // ---- delen opbouwen (cm, ruststand) ----
    const PREP = {}; let seed = D.seed || 1;
    // haarpieken langs de omtrek (manen): tand = [hoogte cm, golflengte cm, alleen waar f(p) waar is]
    function tanden(P, [amp, w, f]) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
      let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
        if (f && !f(p)) return p; const ww = w * (0.8 + 0.4 * hsh(Math.floor(sc / w) * 3.3)), ph = fr(sc / ww), h = amp * (0.6 + 0.6 * hsh(Math.floor(sc / ww) * 7.7)) * (ph < 0.75 ? Math.pow(ph / 0.75, 1.4) : (1 - ph) / 0.25); return add(p, mul(nn, h)); }); }
    const laag = (l) => { if (l.veeg) return { c: l.c, pts: streep(l.p.map(cm), l.veeg[0], l.veeg[1]) }; if (l.lijn) return { c: l.c, lijn: l.lijn, pts: openLijn(l.p.map(cm)) }; let P = spline(l.p.map(p => { const c = cm(p); return p[2] ? [c[0], c[1], 1] : c; })); if (l.tand) P = tanden(P, l.tand); return { c: l.c, pts: P }; };
    for (const k in D.DELEN) { const d = D.DELEN[k]; PREP[k] = { bot: d.bot, skin: d.skin, voet: d.voet, lagen: d.lagen.map(laag) }; }
    // poten uit profielen: [[u, voor, achter], ...] in cm langs het bot (voor = kant naar +x bij een bot dat omlaag wijst)
    function profiel(bn, prof) { const b = BOT[bn], d = dir(b.A0), s = [d[1], -d[0]]; const V = [], A = [];
      const dk = (bn.startsWith('rad') || bn.startsWith('mc') || bn.startsWith('vp') ? D.dikV : D.dikA) || D.dik || 1; for (const [u, wv, wa] of prof) { const p = add(b.J0, mul(d, b.L * u)); V.push(add(p, mul(s, wv * dk))); A.push(sub(p, mul(s, wa * dk))); }
      return spline(V.concat(A.reverse())); }
    for (const k in D.POOT) { const P = D.POOT[k]; const lagen = [{ c: P.c || 'basis', pts: profiel(P.bot || k, P.prof) }];
      for (const ex of (P.lagen || [])) lagen.push(ex.prof ? { c: ex.c, pts: profiel(P.bot || k, ex.prof) } : laag(ex));
      PREP[k] = { bot: P.bot || k, voet: P.voet, lagen }; }
    // staart als buis langs de keten met breedtes per knoop
    if (D.STAART) { const keten = ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j]); const W = D.STAART.w; const L = [], R = [];
      const lijn = openLijn(keten); const cum = [0]; for (let i = 1; i < lijn.length; i++) cum.push(cum[i - 1] + len(sub(lijn[i], lijn[i - 1]))); const tot = cum[cum.length - 1];
      const wAt = (u) => { const x = u * (W.length - 1), i = Math.min(W.length - 2, Math.floor(x)); return lin(W[i], W[i + 1], x - i); };
      for (let i = 0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const w = wAt(cum[i] / tot);
        L.push(add(lijn[i], mul(nn, w))); R.push(sub(lijn[i], mul(nn, w))); }
      const e = lijn[lijn.length - 1], e2 = lijn[lijn.length - 4], te = sub(e, e2), tel = len(te); const tip = add(e, mul(te, W[W.length - 1] * 0.9 / tel));
      let basis = L.concat([tip], R.reverse()); if (D.STAART.tand) basis = tanden(basis, D.STAART.tand);
      const lagen = [{ c: D.STAART.c || 'basis', pts: basis }];
      const bandOp = (u, bw, c) => { const s0 = Math.max(0, u - bw / tot / 2) * tot, s1 = Math.min(1, u + bw / tot / 2) * tot; const idx = (s) => { let i = 0; while (i < cum.length - 1 && cum[i] < s) i++; return i; };
        const i0 = idx(s0), i1 = idx(s1); const P = []; for (let i = i0; i <= i1; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(add(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        for (let i = i1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(cum[i] / tot) * 1.6))); }
        if (u + bw / tot / 2 >= 1) P.splice(i1 - i0 + 1, 0, add(tip, mul(te, 3 / tel))); return { c, pts: P }; };
      for (const [u, bw, c] of (D.STAART.banden || [])) lagen.push(bandOp(u, bw, c));
      if (D.STAART.onder) { const P = []; for (let i = 0; i < lijn.length; i++) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 0.25))); }
        for (let i = lijn.length - 1; i >= 0; i--) { const u = cum[i] / tot; if (u < D.STAART.onder[0] || u > D.STAART.onder[1]) continue; const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; P.push(sub(lijn[i], mul(nn, wAt(u) * 1.5))); }
        lagen.splice(1, 0, { c: D.STAART.onderC || 'licht', pts: P }); }
      if (D.STAART.kwast) { const [u0, c] = D.STAART.kwast; const s0 = u0 * tot; let i0 = 0; while (i0 < cum.length - 1 && cum[i0] < s0) i0++; const P = []; const kw = D.STAART.kwastW || 3.2;
        for (let i = i0; i < lijn.length; i++) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(add(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        P.push(add(tip, mul(te, kw * 0.7 / tel)));
        for (let i = lijn.length - 1; i >= i0; i--) { const a = lijn[Math.max(0, i - 1)], b = lijn[Math.min(lijn.length - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl]; const u = (cum[i] - s0) / (tot - s0); P.push(sub(lijn[i], mul(nn, kw * Math.sin(Math.PI * (0.1 + 0.75 * u)) + 0.4))); }
        PREP.kwast = { skin: 'staart', lagen: [{ c, pts: spline(P.filter((_, i) => i % 3 === 0)) }] }; }
      PREP.staart = { skin: 'staart', lagen }; }
    // tekening: vlekken / strepen per deel (in ruststand, daarna meegebogen door dezelfde huid)
    if (D.TEKENING) D.TEKENING({ PREP, J, cm, vlekVorm, streep, binnen, hsh, BOT });

    // ---- gewichten (zachte huid) ----
    function projectie(v, keten) { let best = 1e9, bu = 0; for (let i = 0; i < keten.length - 1; i++) { const a = keten[i], b = keten[i + 1], ab = sub(b, a); const u = Math.max(-0.5, Math.min(1.5, ((v[0] - a[0]) * ab[0] + (v[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2)));
      const q = add(a, mul(ab, Math.max(0, Math.min(1, u)))); const d = len(sub(v, q)) + (u < 0 || u > 1 ? Math.abs(u - Math.max(0, Math.min(1, u))) * 5 : 0); if (d < best) { best = d; bu = i + u; } } return bu; }
    const xr = ROOT0[0], xl = J.lend[0], xk = J.kruis[0], xn = J.nekBasis[0];
    const GEW = {
      romp: (v) => { const x = v[0]; const wV = sstep((x - (xr - 0.35 * (xr - xl))) / (0.35 * (xr - xl) + 0.45 * (xn - xr)));
        const wA = sstep(((xl + 0.25 * (xr - xl)) - x) / (0.25 * (xr - xl) + 0.6 * (xl - xk))); const wM = Math.max(0, 1 - wV - wA); const s = wV + wA + wM; return [['rompV', wV / s], ['rompM', wM / s], ['rompA', wA / s]]; },
      nek: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.3) / 1.0), wk = sstep((u - 0.7) / 0.4); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      manen: (v) => { const u = projectie(v, [J.nekBasis, J.kop]); const wa = 1 - sstep((u + 0.5) / 1.1), wk = sstep((u - 0.55) / 0.6); return [['rompV', wa], ['nek', Math.max(0, 1 - wa - wk)], ['kop', wk]]; },
      dij: (v) => { const u = projectie(v, [J.heup, J.knie]); const w = sstep((u - 0.15) / 0.8); return [['rompA', 1 - w], ['dij', w]]; },
      hum: (v) => { const u = projectie(v, [J.schoft, J.schouder, J.elleboog]); const w = sstep((u - 0.75) / 0.7); const wr = 1 - sstep((u + 0.1) / 0.6); return [['rompV', wr * 0.6], ['scap', Math.max(0, 1 - w - wr * 0.6)], ['hum', w]]; },
      staart: (v) => { const u = projectie(v, ['staart0', 'staart1', 'staart2', 'staart3', 'staart4'].map(j => J[j])); const c = [['rompA', -0.4], ['st0', 0.5], ['st1', 1.5], ['st2', 2.5], ['st3', 3.5]];
        let w = c.map(([b, m]) => [b, Math.max(0, 1 - Math.abs(u - m) / 1.0)]); if (u > 3.5) w = [['st3', 1]]; const s = w.reduce((a, [, x]) => a + x, 0) || 1; return w.map(([b, x]) => [b, x / s]); },
    };
    for (const k in PREP) { const p = PREP[k]; if (!p.skin) continue; p.lagen.forEach(l => { if (l.mid) l.wm = GEW[p.skin](l.mid).filter(([, x]) => x > 1e-4); else l.w = l.pts.map(v => GEW[p.skin](v).filter(([, x]) => x > 1e-4)); }); }

    // ---- kinematica ----
    function fk(R, A) { const piv = {}; for (const n of ORDE) { const b = BOT[n]; piv[n] = b.par ? add(piv[b.par], rot(b.off, A[b.par])) : R; } return piv; }
    const eind = (piv, A, n) => add(piv[n], mul(dir(A[n]), BOT[n].L));
    function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
      dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
      const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return [a1, ang(sub(t, j)), rek]; }
    const RESTA = {}; for (const n of ORDE) RESTA[n] = BOT[n].A0;
    // voeten = { L: {teen, meta, poot} } (graden) -> hoeken via IK; scapZwaai graden
    function zetBenen(R, A, voeten, scapZwaai = {}) { let piv = fk(R, A); const rek = {};
      for (const L in voeten) { const v = voeten[L], voor = L[0] === 'V', z = L.length > 1 ? 'F' : ''; const nP = voor ? 'vp' : 'ap', nM = voor ? 'mc' : 'mt';
        const kogel = sub(v.teen, mul(dir(v.poot * RAD), BOT[nP].L)), gew = sub(kogel, mul(dir(v.meta * RAD), BOT[nM].L));
        if (voor) { A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - (scapZwaai[L] || 0) * RAD; piv = fk(R, A);
          const [a1, a2, r] = ik(eind(piv, A, 'scap' + z), gew, BOT.hum.L, BOT.rad.L, +1); A['hum' + z] = a1; A['rad' + z] = a2; rek[L] = r; }
        else { A['dij' + z] = A.rompA; piv = fk(R, A); const [a1, a2, r] = ik(piv['dij' + z], gew, BOT.dij.L, BOT.schn.L, -1); A['dij' + z] = a1; A['schn' + z] = a2; rek[L] = r; }
        A[nM + z] = v.meta * RAD; A[nP + z] = v.poot * RAD; v.kogel = kogel; }
      return rek; }
    const mixA = (A0, A1, w, namen) => { for (const n of namen) { const d = Math.atan2(Math.sin(A1[n] - A0[n]), Math.cos(A1[n] - A0[n])); A0[n] = A0[n] + d * w; } };
    // rompA wordt (zoals de andere romphoeken) in wereldgraden opgegeven
    function lichaam(spec) { const A = Object.assign({}, RESTA); for (const n in (spec.A || {})) A[n] = spec.A[n] * RAD; if (spec.A && spec.A.kop != null && spec.A.kaak == null) A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return A; }
    // rust-teenposities (ruststand = gemeten plaat)
    const RP = fk(ROOT0, RESTA); const TEEN0 = { V: eind(RP, RESTA, 'vp'), VF: eind(RP, RESTA, 'vpF'), A: eind(RP, RESTA, 'ap'), AF: eind(RP, RESTA, 'apF') };

    // ---- houdingen (specs per dier) ----
    const RUSTVOET = (L) => { const z = L.length > 1 ? 'F' : '', voor = L[0] === 'V'; return [TEEN0[L][0], TEEN0[L][1], BOT[(voor ? 'mc' : 'mt') + z].A0 / RAD, BOT[(voor ? 'vp' : 'ap') + z].A0 / RAD]; };
    // auto-houding: voeten recht onder schouder/heup (+dx), romphoogte zo dat de poten 'rek' gestrekt zijn (bisectie)
    const AUTO = {};
    function autoStaan(h, S) { if (AUTO[h]) return AUTO[h]; const A0 = lichaam(S), au = S.auto, ty = au.ty ?? -1;
      const probeer = (y) => { const A = Object.assign({}, A0), R = [ROOT0[0], y]; const piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const vt = { V: [sch[0] + au.V, ty, au.meta ? au.meta[0] : 80, au.poot ? au.poot[0] : 20], A: [hp[0] + au.A, ty, au.meta ? au.meta[1] : 86, au.poot ? au.poot[1] : 22] };
        const voeten = {}; for (const L of LEGS) { const v = vt[L[0]]; voeten[L] = { teen: [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1]], meta: v[2], poot: v[3] }; }
        const rek = zetBenen(R, A, voeten); return { rek: Math.max(rek.V, rek.A), vt }; };
      let lo = -400, hi = 0; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (probeer(m).rek > au.rek) lo = m; else hi = m; }
      const { vt } = probeer(hi); const voet = {}; for (const L of LEGS) { const v = vt[L[0]]; voet[L] = [v[0] + (L.length > 1 ? au.ver[L[0]] : 0), v[1], v[2], v[3]]; }
      return (AUTO[h] = { R: [0, hi], voet }); }
    function geschaald(S) { if (!S.schaal) return S; const [B, f] = S.schaal; const R = B.R ? [B.R[0] * f, B.R[1] * f] : null; const voet = {}; for (const L in B.voet) { const v = B.voet[L]; voet[L] = [v[0] * f, v[1] * f, v[2], v[3]]; }
      return Object.assign({}, B, { R, voet, A: Object.assign({}, B.A, S.A || {}) }); }
    // auto-zit: heup op hoogte 'heup' boven de grond, romp zo rechtop als de voorpoten toelaten (rompV van rv[0] naar rv[1])
    function autoZit(h, S) { if (AUTO[h]) return AUTO[h]; const au = S.autoZit, ty = au.ty ?? -1; let best = null;
      for (let rv = au.rv[0]; rv <= au.rv[1]; rv += 2) { const d = rv - au.rv[0]; const A = lichaam({ A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) });
        let piv = fk([ROOT0[0], 0], A); const y = -au.heup - piv.dij[1]; const R = [ROOT0[0], y]; piv = fk(R, A); const sch = eind(piv, A, 'scap'), hp = piv.dij;
        const voeten = {}; for (const L of LEGS) { const voor = L[0] === 'V', ver = L.length > 1 ? au.ver[L[0]] : 0; voeten[L] = { teen: [(voor ? sch[0] + au.V : hp[0] + au.A) + ver, ty], meta: au.meta[voor ? 0 : 1], poot: au.poot[voor ? 0 : 1] }; }
        const A2 = Object.assign({}, A); const rek = zetBenen(R, A2, voeten); best = { R: [0, y], voet: Object.fromEntries(LEGS.map(L => [L, [voeten[L].teen[0], ty, voeten[L].meta, voeten[L].poot]])), A: Object.assign({}, S.A, { rompV: rv, rompM: S.A.rompM + d * 0.5, nek: S.A.nek - d * 0.6 }) };
        if (rek.V <= 0.985) break; }
      return (AUTO[h] = best); }
    function houding(h, o = {}) { let S = geschaald(D.HOUDING[h] || D.HOUDING.staan); if (S.autoZit) S = Object.assign({}, S, autoZit(h, S)); if (S.auto) S = Object.assign({}, S, autoStaan(h, S)); const A = lichaam(S); const R = S.R ? [ROOT0[0] + (S.R[0] || 0), S.R[1]] : ROOT0.slice();
      if (o.kopHoek) A.kop += o.kopHoek; if (o.nekHoek) A.nek += o.nekHoek;
      if (S.adem && o.t != null) { const w = Math.sin(2 * Math.PI * o.t); A.st2 += 4 * RAD * w; A.st3 += 7 * RAD * Math.sin(2 * Math.PI * o.t - 0.7); }
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0) + (o.bek || 0);
      const voeten = {}; for (const L of LEGS) { let v = S.voet ? (S.voet[L] || S.voet[L[0]]) : RUSTVOET(L); if (!S.voet && S.ver && L.length > 1) v = [v[0] + S.ver[L[0]], v[1], v[2], v[3]]; voeten[L] = { teen: [v[0], v[1]], meta: v[2], poot: v[3], steun: true }; }
      const rek = zetBenen(R, A, voeten); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, zit: !!S.zit, volgorde: S.volgorde }; }

    // ---- gangen ----
    // stap: laterale volgorde, teen staat stil in de steunfase, zwaai met Hermite, IK
    function stap(G, t) {
      let H = D.HOUDING[G.basis || 'staan']; if (H.auto) H = Object.assign({}, H, autoStaan(G.basis || 'staan', H)); const A = lichaam(Object.assign({}, H, { A: Object.assign({}, H.A, G.romp || {}) })); // G.romp = wereldhoeken van romp/nek/kop/staart in deze gang (G.A = sleutelkrommen achterpoot)
      const w2 = Math.sin(4 * Math.PI * (t - (G.bobFase || 0.06)));
      const R = [ROOT0[0], (G.Ry ?? ((H.R ? H.R[1] : ROOT0[1]) + (G.dy || 0))) + (G.bob || 0.6) * Math.cos(4 * Math.PI * (t - 0.06))];
      A.rompV += (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompA -= (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t); A.rompM -= 0.4 * (G.rol || 0.8) * RAD * Math.sin(4 * Math.PI * t);
      A.nek += (G.knik || 2) * RAD * Math.sin(4 * Math.PI * (t + 0.1)); A.kop -= (G.knik || 2) * 0.7 * RAD * Math.sin(4 * Math.PI * (t + 0.1));
      const sz = G.staartZwaai || [3, 5, 7, 9]; for (let i = 0; i < 4; i++) A['st' + i] += sz[i] * RAD * Math.sin(2 * Math.PI * (t - 0.2 - i * 0.12));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0);
      const half = G.S * G.beta / 2, voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', p = fr(t - G.fase[L]), steun = p < G.beta; const v0 = H.voet ? (H.voet[k] || H.voet[L]) : RUSTVOET(k); // verre poot loopt in hetzelfde spoor (geen standverschil)
        const nx = v0[0] + G.nx[k], ty0 = v0[1]; let tx, ty, u;
        if (steun) { u = p / G.beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { u = (p - G.beta) / (1 - G.beta); const m = -G.S * (1 - G.beta) * 0.5; tx = hermite(nx - half, nx + half, m, m, u); ty = ty0 - G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, voor ? 0.75 : 0.9)), 1.2); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        if (voor) scap[L] = (G.scap || 8) * (tx - nx) / half; }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten }; }
    // galop (niet gebruikt bij honden; blijft voor hergebruik): roterende galop met gebogen (gathered) en gestrekte (extended) zweeffase; romp buigt via rompM/rompA
    function galopRomp(G, t) { const flex = kurve(G.flex, fr(t)); // 0 = gestrekt, 1 = gebogen
      const A = lichaam({ A: G.gestrekt }), A1 = lichaam({ A: G.gebogen }); mixA(A, A1, flex, ROMPNAMEN);
      for (let i = 0; i < 4; i++) A['st' + i] += (G.staartZwaai[i] || 0) * RAD * Math.sin(2 * Math.PI * (t - 0.15 - i * 0.1));
      A.kaak = A.kop + (BOT.kaak.A0 - BOT.kop.A0); return { A, R: [ROOT0[0], kurve(G.Ry, fr(t))], flex }; }
    const galopZwaai = (G, L, t) => { const beta = G.beta[L[0] === 'V' ? 'V' : 'A'], p = fr(t - G.fase[L]); return G.scap * (p < beta ? (1 - 2 * p / beta) : kurve([[0, -1], [0.5, 0.2], [1, 1]], (p - beta) / (1 - beta))); };
    function galopGewricht(G, t, L) { const { A, R } = galopRomp(G, t), voor = L[0] === 'V', z = L.length > 1 ? 'F' : '';
      if (voor) A['scap' + z] = BOT.scap.A0 + (A.rompV - BOT.rompV.A0) - galopZwaai(G, L, t) * RAD; else A['dij' + z] = A.rompA; const piv = fk(R, A); return voor ? eind(piv, A, 'scap' + z) : piv['dij' + z]; }
    function galop(G, t) {
      const { A, R, flex } = galopRomp(G, t);
      const voeten = {}, scap = {};
      for (const L of LEGS) { const voor = L[0] === 'V', k = voor ? 'V' : 'A', beta = G.beta[k], p = fr(t - G.fase[L]), steun = p < beta; const half = G.S * beta / 2;
        const nx = G.nx[k], ty0 = G.ty[k]; let tx, ty, u;
        if (steun) { u = p / beta; tx = nx + half * (1 - 2 * u); ty = ty0; }
        else { // zwaai in het assenstelsel van heup/schouder (poolcoördinaten), aansluitend op de steunpunten bij loslaten en neerzetten
          u = (p - beta) / (1 - beta); const t0 = t - p, tLO = t0 + beta, tTD = t0 + 1;
          const hLO = galopGewricht(G, tLO, L), hTD = galopGewricht(G, tTD, L), h = galopGewricht(G, t, L);
          const rLO = sub([nx - half, ty0], hLO), rTD = sub([nx + half, ty0], hTD); const aLO = ang(rLO), aTD = ang(rTD);
          const a = hermite(aLO, aTD, G.am0[k] * (aTD - aLO), G.am1[k] * (aTD - aLO), u), l = lin(len(rLO), len(rTD), u) - kurve(G.fold[k], u);
          const q = add(h, mul(dir(a), l)); tx = q[0]; ty = Math.min(ty0, q[1]); }
        voeten[L] = { teen: [tx, ty], meta: kurve(G[k][steun ? 'metaS' : 'metaZ'], u), poot: kurve(G[k][steun ? 'pootS' : 'pootZ'], u), steun, u };
        scap[L] = galopZwaai(G, L, t); }
      const rek = zetBenen(R, A, voeten, scap); for (const L in voeten) voeten[L].rek = rek[L];
      return { R, A, voeten, flex }; }
    const GANGEN = {}; if (D.LOPEN) GANGEN.lopen = (t) => stap(D.LOPEN, t); if (D.DRAF) GANGEN.draven = (t) => stap(D.DRAF, t);
    const SNELHEID = { lopen: D.LOPEN ? D.LOPEN.S : 0, draven: D.DRAF ? D.DRAF.S : 0 };
    function stand(o) { if (o.stand) return o.stand; const h = o.houding || 'staan';
      if (GANGEN[h]) { const st = GANGEN[h](fr(o.t || 0)); if (o.kopHoek) st.A.kop += o.kopHoek; if (o.nekHoek) st.A.nek += o.nekHoek; return st; }
      return houding(h, o); }

    // ---- tekenen ----
    function tekenDeel(ctx, k, M, ver, piv, A, modus) {
      const Dl = PREP[k]; if (!Dl) return; const pal = ver ? PALF : PAL;
      const tr = Dl.skin ? (l) => { if (l.wm) { let x = 0, y = 0; for (const [b, w] of l.wm) { const q = M[b](l.mid); x += q[0] * w; y += q[1] * w; } const dx = x - l.mid[0], dy = y - l.mid[1]; return l.pts.map(v => [v[0] + dx, v[1] + dy]); } // vlek: alleen verschuiven, niet uitrekken
        return l.pts.map((v, i) => { let x = 0, y = 0; for (const [b, w] of l.w[i]) { const q = M[b](v); x += q[0] * w; y += q[1] * w; } return [x, y]; }); } : null;
      ctx.save();
      if (!Dl.skin) { const b = BOT[Dl.bot]; ctx.translate(piv[Dl.bot][0], piv[Dl.bot][1]); ctx.rotate(A[Dl.bot] - b.A0); ctx.translate(-b.J0[0], -b.J0[1]); }
      const basis = tr ? tr(Dl.lagen[0]) : Dl.lagen[0].pts;
      if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(pal[Dl.lagen[0].c]); ctx.lineWidth = D.rand || 0.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); return; }
      pad(ctx, basis); ctx.fillStyle = pal[Dl.lagen[0].c]; ctx.fill();
      if (Dl.lagen.length > 1) { ctx.save(); pad(ctx, basis); ctx.clip(); for (let i = 1; i < Dl.lagen.length; i++) { const L = Dl.lagen[i], P = tr ? tr(L) : L.pts;
        if (L.lijn) { ctx.beginPath(); P.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = pal[L.c]; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, P); ctx.fillStyle = pal[L.c]; ctx.fill(); } } ctx.restore(); }
      if (Dl.voet && D.TENEN) D.TENEN(ctx, k, pal, BOT, cm);
      if (k === 'kop' && D.GEZICHT) D.GEZICHT(ctx, pal, cm, A, BOT);
      ctx.restore(); }
    // tekenvolgorde: verre poten, staart, nabije voorpoot (onder de borst vandaan), romp, nabije achterpoot, schouder, nek, manen, kop
    const VOLGORDE = D.VOLGORDE || [['schn', 1], ['mt', 1], ['ap', 1], ['dij', 1], ['rad', 1], ['mc', 1], ['vp', 1], ['hum', 1], ['staart'], ['kwast'], ['rad'], ['mc'], ['vp'], ['romp'],
      ['schn'], ['mt'], ['ap'], ['dij'], ['krul'], ['hum'], ['nek'], ['manen'], ['oorF'], ['kaak'], ['kop'], ['oor']];
    function matrices(st) { const { R, A } = st, piv = fk(R, A); const M = {};
      for (const n of ORDE) { const b = BOT[n], da = A[n] - b.A0, c = Math.cos(da), si = Math.sin(da), p = piv[n], j = b.J0; M[n] = (v) => { const vx = v[0] - j[0], vy = v[1] - j[1]; return [p[0] + vx * c - vy * si, p[1] + vx * si + vy * c]; }; }
      return { piv, M }; }
    function teken(ctx, x, y, s, o = {}) {
      if ((o.a ?? 1) < 0.999 && typeof document !== 'undefined' && ctx.canvas && !o.skelet) { // doorzichtig: eerst los tekenen (anders schemeren overlappende delen door elkaar)
        if ((o.a ?? 1) <= 0.01) return null; const c = document.createElement('canvas'); c.width = ctx.canvas.width; c.height = ctx.canvas.height; const k = c.getContext('2d');
        k.setTransform(ctx.getTransform()); const st = teken(k, x, y, s, Object.assign({}, o, { a: 1 }));
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha *= o.a; ctx.drawImage(c, 0, 0); ctx.restore(); return st; }
      const st = stand(o); const { A } = st; const { piv, M } = matrices(st);
      const dx = o.wereld && SNELHEID[o.houding] ? SNELHEID[o.houding] * fr(o.t || 0) : 0;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * (o.kijk || 1), s); ctx.translate(dx - (D.anker || 0), 0);
      if (st.zit) { ctx.beginPath(); ctx.rect(-400, -400, 800, 400 + (D.klipGrond ?? 0.6)); ctx.clip(); }
      let VO = st.volgorde ? st.volgorde : VOLGORDE;
      const MF = Object.assign({}, M), pivF = Object.assign({}, piv), AF = Object.assign({}, A);
      for (const n of ORDE) if (n.endsWith('F')) { const m = n.slice(0, -1); MF[m] = M[n]; pivF[m] = piv[n]; AF[m] = A[n]; }
      if (o.zonder) VO = VO.filter(([k]) => !o.zonder.includes(k));
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF, 'rand'); else tekenDeel(ctx, k, M, false, piv, A, 'rand'); }
      for (const [k, ver] of VO) { if (ver) tekenDeel(ctx, k, MF, true, pivF, AF); else tekenDeel(ctx, k, M, false, piv, A); }
      if (o.skelet) { ctx.lineWidth = 0.5; for (const n of ORDE) { const e = eind(piv, A, n); ctx.strokeStyle = n.endsWith('F') ? '#4FC3F7' : (n.startsWith('romp') ? '#FFEB3B' : '#FF5252'); ctx.beginPath(); ctx.moveTo(piv[n][0], piv[n][1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(piv[n][0], piv[n][1], 0.7, 0, 6.283); ctx.fill(); } }
      ctx.restore(); return st; }
    function info(o = {}) { const st = stand(o); const piv = fk(st.R, st.A); return { piv, A: st.A, voeten: st.voeten, R: st.R, flex: st.flex, eind: (n) => eind(piv, st.A, n) }; }
    function deel(ctx, k, dx = 0, dy = 0) { const M = {}; for (const n of ORDE) M[n] = (v) => v; ctx.save(); ctx.translate(dx, dy);
      if (k.endsWith('F') && PREP[k.slice(0, -1)]) tekenDeel(ctx, k.slice(0, -1), M, true, RP, RESTA); else tekenDeel(ctx, k, M, false, RP, RESTA); ctx.restore();
      const Dl = PREP[k.replace(/F$/, '')]; if (!Dl) return []; const bones = Dl.skin ? { romp: ['rompV', 'rompM', 'rompA'], nek: ['nek', 'kop'], manen: ['nek'], staart: ['st0', 'st1', 'st2', 'st3'], dij: ['dij'], hum: ['scap', 'hum'] }[Dl.skin] : [Dl.bot];
      return bones.map(b => [BOT[b].J0[0] + dx, BOT[b].J0[1] + dy]); }
    function meng(stA, stB, w) { const A = Object.assign({}, stA.A); mixA(A, stB.A, w, ORDE); return { R: [lin(stA.R[0], stB.R[0], w), lin(stA.R[1], stB.R[1], w)], A, voeten: {}, zit: w < 0.5 ? stA.zit : stB.zit }; }
    return { teken, info, stand, deel, houding, fk, meng, BOT, ORDE, PREP, J, PAL, D, TEEN0, SNELHEID, GANGEN, RP, RESTA, cm };
  }
  return { maak, kurve, vlekVorm, streep, binnen, hsh, mixHex, spline, openLijn };
})();
function _hondTenen(ctx, k, pal, BOT, f, klauw = true) { const b = BOT[k]; const d = [Math.cos(b.A0), Math.sin(b.A0)], s = [d[1], -d[0]]; const p = (u, w) => [b.J0[0] + d[0] * b.L * u + s[0] * w * f, b.J0[1] + d[1] * b.L * u + s[1] * w * f];
  ctx.strokeStyle = HondPop.mixHex(pal.licht || pal.basis, 0.5, '#1A1410'); ctx.lineWidth = 0.2 * f; ctx.lineCap = 'round';
  for (const u of [0.45, 0.76]) { const a = p(u, 1.5), c = p(u + 0.04, -0.7); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); }
  if (klauw) { ctx.fillStyle = pal.klauw; for (const u of [0.86, 1.0]) { const a = p(u - 0.06, -0.15), c = p(u + 0.09, -0.75), e = p(u - 0.02, -0.85); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(e[0], e[1]); ctx.closePath(); ctx.fill(); } } }
function _hondOog(ctx, O, r, iris, pal, o = {}) { // amandeloog: donkere rand + dierOog in eigen schaal (dierOog werkt in px)
  ctx.fillStyle = o.rand || '#1E1A18'; ctx.beginPath(); ctx.ellipse(O[0], O[1], r * 1.45, r * (o.rond ? 1.25 : 0.95), o.hoek ?? -0.15, 0, 6.283); ctx.fill();
  if (typeof dierOog === 'function') { ctx.save(); ctx.translate(O[0] + r * 0.12, O[1]); ctx.scale(r / 4, r / 4); dierOog(ctx, 0, 0, 4.0, iris); ctx.restore(); }
  else { ctx.fillStyle = iris; ctx.beginPath(); ctx.arc(O[0], O[1], r, 0, 6.283); ctx.fill(); } }
function _hondLijn(ctx, P, c, w) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
const HOND_HERDER_DEF = {
  K: 153 / 62, X0: 200, G0: 229, rand: 0.42, stap: 0.5, verMix: 0.32, verKleur: '#4A4038', krimp: [140, 250, 0.89],
  J: { midrug: [200, 91], nekBasis: [262, 96], lend: [165, 98], kruis: [130, 110],
    kop: [306, 54], neus: [364, 76], kaak: [318, 81], kin: [345, 89],
    schoft: [254, 92], schouder: [291, 127], elleboog: [252, 160], pols: [258, 207], vkogel: [262, 221], vteen: [283, 228],
    heup: [127, 121], knie: [148, 165], hak: [97, 194], akogel: [99, 221], ateen: [111, 228],
    staart0: [121, 113], staart1: [110, 134], staart2: [95, 158], staart3: [76, 180], staart4: [54, 198] },
  PAL: { basis: '#C3874B', tanL: '#CC955A', tanD: '#A9703C', licht: '#D9AE76', creme: '#E7CA9A', zadel: '#2A2827', zadelR: '#4B3C30', masker: '#262423', oorbin: '#A87A50', neus: '#161515', klauw: '#2A2522' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[112, 128], [118, 116], [130, 104], [146, 93], [165, 86], [190, 82], [215, 80], [240, 79], [258, 82], [274, 92], [290, 108], [301, 126], [302, 140], [292, 152], [272, 162], [248, 166], [226, 165], [206, 160], [190, 156], [178, 157], [166, 162], [150, 165], [132, 160], [118, 148]] },
      { c: 'zadelR', tand: [0.9, 2.4, (p) => p[1] > -27], p: [[108, 124], [120, 108], [134, 97], [152, 88], [175, 82], [200, 80], [228, 79], [252, 79], [268, 86], [266, 98], [256, 108], [246, 122], [236, 134], [222, 143], [204, 146], [188, 143], [174, 133], [160, 124], [146, 120], [130, 126], [116, 136]] },
      { c: 'zadel', tand: [0.8, 2.2, (p) => p[1] > -28], p: [[108, 122], [120, 106], [134, 95], [152, 86], [175, 80], [200, 78], [228, 77], [252, 77], [266, 84], [262, 94], [252, 103], [242, 116], [232, 127], [218, 135], [203, 138], [188, 134], [175, 125], [160, 117], [146, 114], [130, 120], [116, 130]] },
      { c: 'licht', tand: [0.7, 2.0, (p) => p[1] < -24], p: [[303, 132], [298, 148], [284, 158], [266, 165], [246, 168], [224, 167], [204, 162], [189, 158], [178, 159], [166, 164], [160, 160], [172, 151], [190, 149], [210, 153], [232, 156], [255, 154], [276, 147], [294, 134]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[248, 84], [262, 74], [276, 64], [292, 54], [304, 46], [316, 48], [324, 60], [326, 78], [322, 92], [315, 108], [309, 122], [304, 136], [296, 146], [282, 140], [270, 124], [260, 108], [252, 96]] },
      { c: 'zadel', tand: [0.9, 2.4, (p) => true], p: [[246, 80], [262, 71], [278, 61], [294, 51], [305, 45], [311, 52], [300, 62], [288, 72], [278, 84], [270, 96], [262, 100], [252, 94]] },
      { c: 'zadel', veeg: [1.3, 0.3], p: [[270, 92], [276, 106], [284, 120], [290, 132]] },
      { c: 'tanD', veeg: [1.1, 0.3], p: [[288, 70], [292, 86], [296, 102], [300, 118]] },
      { c: 'creme', tand: [0.8, 2.0, (p) => p[0] > 36], p: [[325, 84], [322, 98], [316, 112], [309, 126], [303, 140], [295, 140], [300, 124], [307, 108], [313, 94], [316, 84]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[301, 46], [312, 40], [326, 40], [338, 47], [347, 56], [354, 62], [361, 68], [366, 74], [365, 79], [358, 82], [346, 84], [334, 85], [322, 86], [312, 82], [304, 72], [300, 58]] },
      { c: 'zadel', p: [[301, 46], [312, 40], [326, 40], [336, 46], [326, 50], [314, 54], [304, 58]] },
      { c: 'masker', p: [[336, 55], [348, 60], [358, 66], [366, 73], [365, 79], [358, 82], [346, 84], [334, 85], [329, 79], [331, 70], [333, 62]] },
      { c: 'tanL', p: [[312, 72], [322, 71], [330, 76], [327, 84], [316, 86], [308, 80]] },
      { c: 'tanD', p: [[328, 56], [336, 55], [340, 60], [332, 61]] },
      { c: 'neus', p: [[357, 71], [363, 70], [367, 74], [365, 79], [359, 78]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'masker', p: [[318, 82], [332, 84], [346, 85], [354, 85], [348, 90], [334, 92], [322, 92], [315, 88]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'zadel', p: [[305, 48], [309, 34, 1], [318, 19, 1], [327, 31], [330, 48]] },
      { c: 'oorbin', p: [[310, 46], [313, 34], [318, 25, 1], [322, 33], [325, 46]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'zadel', p: [[318, 44], [323, 32, 1], [331, 21, 1], [334, 34], [334, 48]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[250, 90], [266, 95], [282, 106], [294, 120], [299, 136], [293, 148], [277, 158], [262, 166], [250, 168], [244, 158], [243, 136], [245, 112]] },
      { c: 'tanD', veeg: [1.2, 0.4], p: [[258, 104], [260, 124], [258, 146], [254, 162]] },
      { c: 'licht', p: [[295, 124], [299, 138], [291, 150], [278, 159], [272, 153], [285, 141]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[112, 112], [126, 104], [142, 108], [156, 120], [164, 136], [165, 152], [159, 165], [149, 172], [137, 175], [124, 169], [112, 156], [106, 140], [106, 124]] },
      { c: 'zadel', tand: [0.8, 2.2, (p) => p[1] > -44], p: [[106, 112], [122, 101], [142, 103], [160, 115], [146, 118], [128, 118], [112, 126]] },
      { c: 'creme', tand: [0.8, 2.0, (p) => p[0] < -36], p: [[103, 124], [103, 146], [109, 162], [121, 174], [127, 168], [118, 154], [112, 138], [110, 124]] },
      { c: 'tanD', veeg: [1.0, 0.3], p: [[152, 128], [156, 146], [152, 162]] },
    ] },
  },
  POOT: {
    rad: { prof: [[-0.14, 3.8, 1.6], [0.0, 3.8, 3.6], [0.15, 3.5, 3.5], [0.45, 2.8, 2.4], [0.8, 2.5, 2.2], [1.0, 2.5, 2.5], [1.08, 2.3, 1.8]], lagen: [{ c: 'licht', prof: [[0.0, -1.2, 3.8], [0.4, -0.9, 2.6], [1.0, -0.8, 2.7], [1.1, -0.8, 2.0]] }] },
    mc: { prof: [[-0.25, 2.4, 2.4], [0.0, 2.3, 2.3], [0.6, 2.1, 2.0], [1.0, 2.2, 2.2], [1.25, 1.8, 1.8]], c: 'licht' },
    vp: { voet: true, c: 'licht', prof: [[-0.42, 1.6, 1.4], [-0.1, 2.6, 1.3], [0.3, 2.5, 1.2], [0.65, 2.0, 1.0], [0.9, 1.3, 0.7], [1.03, 0.4, 0.35]] },
    schn: { prof: [[-0.12, 3.6, 3.0], [0.05, 3.9, 4.2], [0.3, 3.2, 4.0], [0.6, 2.4, 2.6], [0.85, 2.0, 2.2], [1.0, 2.2, 2.6], [1.1, 1.8, 1.8]], lagen: [{ c: 'licht', prof: [[0.0, -1.5, 4.4], [0.4, -1.3, 3.6], [0.8, -0.6, 2.4], [1.12, -0.4, 2.0]] }] },
    mt: { prof: [[-0.12, 2.0, 2.6], [0.05, 2.1, 2.8], [0.3, 2.0, 2.0], [0.8, 2.0, 1.9], [1.0, 2.1, 2.1], [1.18, 1.8, 1.8]], c: 'licht' },
    ap: { voet: true, c: 'licht', prof: [[-0.45, 1.5, 1.3], [-0.1, 2.5, 1.25], [0.3, 2.4, 1.15], [0.65, 1.95, 0.95], [0.9, 1.25, 0.7], [1.03, 0.4, 0.35]] },
  },
  STAART: { c: 'zadel', w: [2.4, 3.4, 4.2, 4.4, 3.8, 2.2], onder: [0.04, 0.97], onderC: 'basis', tand: [1.1, 2.6] }, dikV: 1.2, dikA: 1.12,
  GEZICHT(ctx, pal, cm) { _hondOog(ctx, cm([334, 63]), 0.85, '#6A3B1A', pal, { hoek: -0.2 });
    _hondLijn(ctx, [cm([322, 84]), cm([334, 85]), cm([348, 85]), cm([355, 84])], '#120F0E', 0.28); },
  TENEN: (ctx, k, pal, BOT) => _hondTenen(ctx, k, pal, BOT, 1.0),
  HOUDING: {
    staan: { adem: 1, ver: { V: 3, A: 18 } },
    zitten: { zit: 1, autoZit: { heup: 10, rv: [-64, -30], V: 2, A: 15, ver: { V: 4, A: 3 }, ty: -0.4, meta: [80, 2], poot: [21, 4] }, A: { rompV: -64, rompM: 122, rompA: 100, nek: -66, kop: 18, st0: 120, st1: 172, st2: 180, st3: 184 } },
    liggen: { R: [0, -25], zit: 1, A: { rompV: -6, rompM: 176, rompA: 168, nek: -52, kop: 16, st0: 150, st1: 174, st2: 180, st3: 184 },
      voet: { V: [66, -0.4, 2, 4], VF: [60, -0.4, 3, 4], A: [-12, -0.4, 4, 6], AF: [-8, -0.4, 4, 6] } },
  },
};
const _HOND_KRV = {
  stap: { V: { metaS: [[0, 62], [0.5, 72], [0.82, 86], [1, 104]], metaZ: [[0, 104], [0.32, 128], [0.58, 116], [0.85, 70], [1, 62]], pootS: [[0, 21], [0.68, 21], [1, 72]], pootZ: [[0, 72], [0.3, 100], [0.6, 88], [0.86, 28], [1, 21]] },
          A: { metaS: [[0, 70], [0.5, 84], [0.82, 98], [1, 110]], metaZ: [[0, 110], [0.35, 70], [0.62, 52], [0.86, 60], [1, 70]], pootS: [[0, 21], [0.62, 21], [1, 68]], pootZ: [[0, 68], [0.3, 92], [0.6, 52], [0.86, 26], [1, 21]] } },
  draf: { V: { metaS: [[0, 58], [0.5, 74], [0.8, 92], [1, 112]], metaZ: [[0, 112], [0.3, 160], [0.55, 150], [0.82, 40], [1, 58]], pootS: [[0, 21], [0.6, 21], [1, 80]], pootZ: [[0, 80], [0.3, 140], [0.6, 95], [0.85, 12], [1, 21]] },
          A: { metaS: [[0, 60], [0.5, 84], [0.8, 104], [1, 122]], metaZ: [[0, 122], [0.35, 70], [0.62, 48], [0.86, 47], [1, 60]], pootS: [[0, 21], [0.55, 21], [1, 110]], pootZ: [[0, 110], [0.3, 100], [0.6, 55], [0.86, 12], [1, 21]] } } };
function _hondStap(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.66, fase: { A: 0, V: 0.24, AF: 0.5, VF: 0.74 }, lift: { V: lift, A: lift * 0.85 }, bob: S * 0.008, nx: { V: 0, A: S * 0.03 }, dy: S * 0.02, scap: 8, rol: 0.8, knik: 2,
  staartZwaai: [2, 3, 4, 5] }, _HOND_KRV.stap, o); }
function _hondDraf(S, lift, o = {}) { return Object.assign({ basis: 'staan', S, beta: 0.44, fase: { A: 0, VF: 0.02, AF: 0.5, V: 0.52 }, lift: { V: lift, A: lift * 0.75 }, bob: S * 0.01, nx: { V: S * 0.05, A: S * 0.05 }, dy: S * 0.025, scap: 11, rol: 1.0, knik: 1.5,
  staartZwaai: [3, 5, 7, 9] }, _HOND_KRV.draf, o); }
HOND_HERDER_DEF.LOPEN = _hondStap(72, 7.5, { romp: { nek: -40, kop: 24 } });
HOND_HERDER_DEF.DRAF = _hondDraf(108, 12, { romp: { nek: -27, kop: 32, st0: 150, st1: 160, st2: 168, st3: 172 } });
const HOND_TECKEL_DEF = {
  K: 90 / 23, X0: 540, G0: 229, rand: 0.2, stap: 0.25, klipGrond: 0.25, verMix: 0.3, verKleur: '#3A2A22', krimp: [482, 590, 0.94],
  J: { midrug: [540, 150], nekBasis: [600, 150], lend: [505, 151], kruis: [475, 154],
    kop: [613, 110], neus: [672, 115], kaak: [628, 124], kin: [657, 129],
    schoft: [592, 146], schouder: [622, 170], elleboog: [596, 194], pols: [598, 213], vkogel: [601, 221], vteen: [611, 227],
    heup: [478, 161], knie: [483, 190], hak: [459, 204], akogel: [460, 222], ateen: [470, 228],
    staart0: [474, 158], staart1: [457, 164], staart2: [443, 175], staart3: [430, 182], staart4: [416, 185] },
  PAL: { basis: '#6B4530', donker: '#553728', licht: '#875537', snuit: '#7C4D33', poot: '#7A4B31', oor: '#4A3024', neus: '#1A1412', klauw: '#2A201C' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[462, 170], [466, 158], [478, 149], [495, 143], [515, 140], [545, 140], [570, 140], [588, 141], [602, 148], [616, 160], [626, 174], [624, 188], [612, 198], [592, 204], [570, 203], [548, 197], [530, 190], [512, 186], [498, 186], [484, 184], [470, 180]] },
      { c: 'donker', p: [[462, 160], [478, 147], [500, 140], [530, 138], [570, 138], [592, 140], [598, 144], [578, 146], [545, 148], [508, 150], [484, 155], [468, 165]] },
      { c: 'licht', p: [[627, 176], [622, 190], [608, 200], [588, 205], [566, 204], [546, 198], [528, 191], [512, 187], [516, 182], [536, 186], [560, 192], [586, 195], [606, 190], [620, 178]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[588, 145], [598, 134], [605, 120], [611, 106], [624, 101], [634, 110], [636, 126], [634, 142], [630, 158], [628, 172], [616, 170], [604, 160], [595, 152]] },
      { c: 'licht', p: [[637, 124], [635, 142], [631, 158], [629, 173], [623, 168], [627, 152], [630, 136]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[607, 108], [612, 98], [622, 92], [636, 90], [646, 93], [652, 98], [658, 104], [668, 108], [674, 112], [674, 118], [668, 124], [656, 128], [644, 128], [632, 126], [620, 122], [611, 116]] },
      { c: 'snuit', p: [[644, 113], [658, 111], [669, 112], [674, 117], [664, 124], [650, 126], [640, 122]] },
      { c: 'neus', p: [[667, 110], [673, 109], [676, 113], [673, 117], [667, 116]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[630, 124], [644, 126], [656, 127], [662, 128], [656, 131], [644, 132], [632, 130]] }] },
    oor: { bot: 'kop', lagen: [{ c: 'oor', p: [[603, 108], [612, 102], [622, 103], [628, 112], [630, 124], [630, 136], [624, 143], [614, 141], [606, 131], [601, 119]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[588, 146], [602, 150], [616, 160], [624, 174], [620, 188], [608, 198], [596, 202], [588, 196], [586, 178], [586, 160]] },
      { c: 'licht', p: [[624, 172], [622, 186], [612, 196], [606, 192], [616, 182]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[466, 156], [478, 150], [492, 154], [502, 166], [506, 180], [502, 192], [492, 198], [478, 198], [466, 190], [460, 176]] },
      { c: 'licht', p: [[460, 168], [462, 182], [468, 192], [476, 197], [468, 184], [465, 170]] },
    ] },
  },
  POOT: {
    rad: { c: 'poot', prof: [[-0.25, 2.2, 1.0], [0.0, 2.3, 2.1], [0.3, 1.9, 1.7], [0.7, 1.6, 1.4], [1.0, 1.6, 1.5], [1.12, 1.5, 1.2]] },
    mc: { c: 'poot', prof: [[-0.3, 1.5, 1.5], [0.0, 1.5, 1.5], [1.0, 1.4, 1.4], [1.3, 1.2, 1.2]] },
    vp: { voet: true, c: 'poot', prof: [[-0.55, 1.1, 1.0], [-0.2, 1.6, 0.9], [0.3, 1.6, 0.8], [0.7, 1.25, 0.6], [0.94, 0.75, 0.45], [1.05, 0.3, 0.25]] },
    schn: { c: 'poot', prof: [[-0.15, 2.5, 1.8], [0.05, 2.6, 2.6], [0.4, 2.0, 2.2], [0.8, 1.5, 1.5], [1.0, 1.5, 1.6], [1.12, 1.3, 1.2]] },
    mt: { c: 'poot', prof: [[-0.15, 1.3, 1.3], [0.1, 1.3, 1.45], [0.6, 1.2, 1.2], [1.0, 1.3, 1.3], [1.2, 1.1, 1.1]] },
    ap: { voet: true, c: 'poot', prof: [[-0.55, 1.1, 1.0], [-0.2, 1.55, 0.9], [0.3, 1.55, 0.8], [0.7, 1.2, 0.6], [0.94, 0.72, 0.45], [1.05, 0.3, 0.25]] },
  },
  STAART: { c: 'basis', w: [1.15, 1.0, 0.85, 0.65, 0.45, 0.22] },
  GEZICHT(ctx, pal, cm) { _hondOog(ctx, cm([644, 104]), 0.52, '#4A2A14', pal, { hoek: -0.1 });
    _hondLijn(ctx, [cm([636, 124]), cm([648, 125]), cm([662, 125])], '#1E1410', 0.16); },
  TENEN: (ctx, k, pal, BOT) => _hondTenen(ctx, k, pal, BOT, 0.55),
  HOUDING: { staan: { adem: 1, ver: { V: 1, A: 4.5 } },
    zitten: { zit: 1, autoZit: { heup: 3.8, rv: [-60, -6], V: 1, A: 6, ver: { V: 1.5, A: 1.5 }, ty: -0.25, meta: [80, 2], poot: [24, 4] }, A: { rompV: -60, rompM: 130, rompA: 112, nek: -84, kop: 6, st0: 150, st1: 176, st2: 182, st3: 186 } },
    liggen: { R: [0, -11], zit: 1, A: { rompV: -3, rompM: 178, rompA: 172, nek: -66, kop: 8, st0: 160, st1: 176, st2: 182, st3: 186 },
      voet: { V: [30, -0.25, 2, 4], VF: [28, -0.25, 3, 4], A: [-9, -0.25, 4, 6], AF: [-7, -0.25, 4, 6] } } },
};
HOND_TECKEL_DEF.LOPEN = _hondStap(22, 2.4);
HOND_TECKEL_DEF.DRAF = _hondDraf(32, 2.8);
const HOND_MOPS_DEF = {
  K: 119 / 29, X0: 850, G0: 229, rand: 0.24, stap: 0.25, klipGrond: 0.3, verMix: 0.3, verKleur: '#6A5A48', krimp: [805, 900, 0.74], dikV: 1.05, dikA: 1.05,
  J: { midrug: [850, 122], nekBasis: [896, 120], lend: [818, 122], kruis: [796, 125],
    kop: [918, 98], neus: [960, 108], kaak: [935, 122], kin: [952, 128],
    schoft: [893, 124], schouder: [916, 150], elleboog: [886, 181], pols: [890, 211], vkogel: [893, 221], vteen: [910, 227],
    heup: [790, 132], knie: [805, 165], hak: [771, 194], akogel: [769, 221], ateen: [779, 227],
    staart0: [794, 120], staart1: [790, 108], staart2: [798, 99], staart3: [810, 102], staart4: [812, 112] },
  PAL: { basis: '#ECD3B0', rug: '#E0C094', licht: '#F5E3C8', rimpel: '#C7A073', masker: '#2C2A29', oor: '#252423', neus: '#161515', klauw: '#3A3029' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[774, 140], [778, 126], [788, 116], [804, 113], [825, 113], [850, 113], [872, 112], [890, 112], [906, 122], [920, 136], [930, 150], [928, 166], [918, 178], [900, 184], [880, 185], [860, 182], [840, 176], [828, 172], [816, 174], [804, 180], [790, 182], [778, 172], [772, 156]] },
      { c: 'rug', p: [[806, 114], [830, 112], [856, 112], [874, 113], [872, 126], [864, 140], [850, 148], [834, 146], [820, 136], [810, 124]] },
      { c: 'licht', p: [[929, 160], [920, 176], [904, 184], [882, 186], [862, 183], [842, 177], [828, 173], [832, 168], [852, 172], [878, 176], [902, 174], [920, 166]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[878, 118], [890, 106], [903, 92], [918, 84], [932, 84], [940, 96], [941, 112], [937, 128], [932, 142], [928, 152], [916, 150], [900, 140], [886, 130]] },
      { c: 'rimpel', veeg: [0.35, 0.1], p: [[912, 112], [918, 124], [920, 138]] },
      { c: 'rimpel', veeg: [0.3, 0.1], p: [[900, 116], [906, 130], [908, 142]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[908, 96], [914, 86], [926, 80], [942, 82], [952, 90], [958, 100], [961, 110], [960, 120], [956, 126], [946, 132], [934, 134], [922, 130], [912, 120], [906, 108]] },
      { c: 'masker', p: [[937, 94], [948, 91], [956, 97], [960, 107], [961, 118], [958, 126], [948, 132], [936, 134], [930, 126], [932, 112], [933, 101]] },
      { c: 'rimpel', veeg: [0.3, 0.08], p: [[932, 89], [940, 87], [948, 89]] },
      { c: 'rimpel', veeg: [0.25, 0.08], p: [[930, 94], [937, 92]] },
      { c: 'neus', p: [[954, 103], [958, 100], [962, 102], [962, 107], [957, 108]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'masker', p: [[933, 127], [946, 130], [954, 128], [950, 134], [940, 137], [930, 134]] }] },
    oor: { bot: 'kop', lagen: [{ c: 'oor', p: [[908, 90], [912, 82], [922, 79], [931, 82], [935, 92], [931, 104], [922, 106], [914, 100]] }] },
    oorF: { bot: 'kop', lagen: [{ c: 'oor', p: [[927, 82], [936, 77], [943, 81], [939, 88], [931, 88]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[892, 124], [906, 130], [918, 142], [926, 156], [922, 172], [910, 182], [896, 186], [886, 182], [884, 164], [886, 140]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[776, 130], [788, 122], [802, 126], [814, 140], [818, 158], [812, 174], [800, 182], [786, 182], [776, 172], [772, 152]] },
      { c: 'rimpel', veeg: [0.3, 0.1], p: [[808, 146], [810, 160], [806, 172]] },
    ] },
    krul: { bot: 'rompA', lagen: [
      { c: 'basis', p: [[789, 118], [786, 108], [790, 99], [799, 94], [810, 95], [817, 102], [818, 112], [812, 120], [803, 122], [796, 118]] },
      { c: 'licht', p: [[796, 101], [804, 97], [812, 101], [814, 109], [808, 116], [800, 116], [795, 110]] },
      { c: 'rimpel', lijn: 0.35, p: [[805, 106], [801, 108], [802, 103], [808, 102], [811, 108], [806, 113], [799, 112]] },
    ] },
  },
  POOT: {
    rad: { prof: [[-0.15, 2.5, 1.2], [0.0, 2.6, 2.4], [0.3, 2.2, 1.9], [0.7, 1.9, 1.6], [1.0, 1.9, 1.8], [1.1, 1.7, 1.3]], lagen: [{ c: 'licht', prof: [[0.0, -0.9, 2.5], [0.6, -0.6, 1.7], [1.1, -0.6, 1.4]] }] },
    mc: { prof: [[-0.3, 1.75, 1.6], [0.0, 1.75, 1.6], [1.0, 1.65, 1.55], [1.3, 1.45, 1.4]] },
    vp: { voet: true, c: 'licht', prof: [[-0.45, 1.25, 1.05], [-0.1, 1.8, 0.95], [0.3, 1.7, 0.9], [0.7, 1.35, 0.7], [0.93, 0.85, 0.5], [1.04, 0.3, 0.25]] },
    schn: { prof: [[-0.12, 2.9, 2.4], [0.05, 3.1, 3.2], [0.35, 2.5, 2.8], [0.7, 1.9, 1.9], [1.0, 1.9, 2.0], [1.1, 1.6, 1.5]] },
    mt: { prof: [[-0.12, 1.7, 1.8], [0.1, 1.7, 1.8], [0.6, 1.55, 1.5], [1.0, 1.6, 1.6], [1.2, 1.4, 1.4]] },
    ap: { voet: true, c: 'licht', prof: [[-0.45, 1.25, 1.05], [-0.1, 1.75, 0.95], [0.3, 1.65, 0.9], [0.7, 1.3, 0.7], [0.93, 0.8, 0.5], [1.04, 0.3, 0.25]] },
  },
  GEZICHT(ctx, pal, cm) { _hondOog(ctx, cm([943, 104]), 0.95, '#3A2414', pal, { rond: 1, hoek: 0, rand: '#141312' });
    _hondLijn(ctx, [cm([944, 124]), cm([951, 127]), cm([957, 124])], '#0E0D0C', 0.2); },
  TENEN: (ctx, k, pal, BOT) => _hondTenen(ctx, k, pal, BOT, 0.62),
  HOUDING: { staan: { adem: 1, ver: { V: 1.5, A: 5.5 } },
    zitten: { zit: 1, autoZit: { heup: 5.5, rv: [-62, -24], V: 1.5, A: 7, ver: { V: 2, A: 2 }, ty: -0.3, meta: [80, 2], poot: [22, 4] }, A: { rompV: -62, rompM: 125, rompA: 105, nek: -62, kop: 10, st0: 120, st1: 176, st2: 182, st3: 186 } },
    liggen: { R: [0, -13.5], zit: 1, A: { rompV: -4, rompM: 178, rompA: 172, nek: -46, kop: 12, st0: 160, st1: 176, st2: 182, st3: 186 },
      voet: { V: [30, -0.3, 2, 4], VF: [27, -0.3, 3, 4], A: [-7, -0.3, 4, 6], AF: [-5, -0.3, 4, 6] } } },
};
HOND_MOPS_DEF.LOPEN = _hondStap(26, 3.2, { staartZwaai: [0, 0, 0, 0] });
HOND_MOPS_DEF.DRAF = _hondDraf(38, 3.3, { staartZwaai: [0, 0, 0, 0] });
const HOND_CHIHUAHUA_DEF = {
  K: 89 / 20, X0: 1150, G0: 230, rand: 0.16, stap: 0.2, klipGrond: 0.2, verMix: 0.3, verKleur: '#5A4636', krimp: [1112, 1185, 0.8],
  J: { midrug: [1150, 150], nekBasis: [1186, 148], lend: [1122, 151], kruis: [1103, 152],
    kop: [1203, 118], neus: [1235, 128], kaak: [1214, 134], kin: [1228, 137],
    schoft: [1184, 148], schouder: [1204, 163], elleboog: [1186, 186], pols: [1188, 213], vkogel: [1190, 222], vteen: [1198, 228],
    heup: [1100, 159], knie: [1114, 184], hak: [1088, 204], akogel: [1086, 222], ateen: [1093, 228],
    staart0: [1097, 151], staart1: [1090, 141], staart2: [1088, 129], staart3: [1092, 119], staart4: [1099, 112] },
  PAL: { basis: '#D29E65', donker: '#B9844F', licht: '#F2DDBB', oorbin: '#D79B88', neus: '#2A2220', klauw: '#6A5A4A' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[1090, 160], [1094, 150], [1104, 145], [1125, 142], [1150, 142], [1168, 142], [1180, 142], [1192, 148], [1202, 158], [1208, 170], [1204, 182], [1194, 188], [1176, 191], [1160, 189], [1144, 184], [1132, 180], [1120, 184], [1106, 186], [1094, 180], [1088, 170]] },
      { c: 'licht', p: [[1208, 166], [1205, 180], [1194, 189], [1174, 192], [1156, 190], [1140, 184], [1130, 181], [1134, 176], [1150, 180], [1170, 184], [1190, 180], [1202, 170]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[1176, 146], [1186, 138], [1194, 126], [1200, 116], [1210, 112], [1218, 118], [1220, 130], [1218, 142], [1214, 154], [1210, 166], [1202, 166], [1192, 158], [1182, 152]] },
      { c: 'licht', p: [[1219, 128], [1218, 142], [1214, 154], [1210, 168], [1204, 164], [1208, 150], [1212, 138]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[1196, 118], [1198, 108], [1204, 102], [1214, 100], [1222, 104], [1226, 112], [1228, 120], [1234, 123], [1237, 128], [1235, 133], [1228, 137], [1220, 138], [1210, 134], [1202, 128]] },
      { c: 'licht', p: [[1222, 122], [1230, 122], [1237, 128], [1232, 135], [1222, 137], [1214, 132]] },
      { c: 'neus', p: [[1233, 125], [1237, 124], [1239, 128], [1236, 131], [1233, 130]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[1214, 134], [1222, 136], [1229, 136], [1226, 139], [1218, 140], [1212, 138]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'basis', p: [[1192, 118], [1194, 106], [1197, 96, 1], [1202, 88, 1], [1206, 98], [1208, 110], [1206, 118]] },
      { c: 'oorbin', p: [[1196, 116], [1198, 104], [1201, 94, 1], [1204, 104], [1205, 116]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'donker', p: [[1204, 110], [1207, 98, 1], [1212, 88, 1], [1215, 100], [1214, 112]] }] },
    hum: { skin: 'hum', lagen: [
      { c: 'basis', p: [[1182, 148], [1194, 152], [1204, 162], [1208, 174], [1202, 184], [1192, 190], [1184, 190], [1180, 176], [1180, 160]] },
      { c: 'licht', p: [[1204, 158], [1209, 168], [1208, 178], [1202, 186], [1196, 184], [1201, 172], [1200, 162]] },
    ] },
    dij: { skin: 'dij', lagen: [
      { c: 'basis', p: [[1090, 156], [1100, 150], [1112, 154], [1120, 166], [1122, 180], [1116, 190], [1106, 194], [1096, 190], [1089, 178], [1086, 166]] },
      { c: 'licht', p: [[1086, 164], [1087, 178], [1093, 190], [1100, 194], [1094, 180], [1091, 166]] },
    ] },
  },
  POOT: {
    rad: { prof: [[-0.15, 1.3, 0.7], [0.0, 1.35, 1.2], [0.3, 1.05, 0.9], [0.7, 0.85, 0.75], [1.0, 0.82, 0.75], [1.1, 0.75, 0.6]], lagen: [{ c: 'licht', prof: [[0.0, -0.5, 1.3], [0.6, -0.3, 0.9], [1.1, -0.3, 0.7]] }] },
    mc: { c: 'licht', prof: [[-0.3, 0.78, 0.72], [0.0, 0.78, 0.72], [1.0, 0.74, 0.7], [1.3, 0.66, 0.64]] },
    vp: { voet: true, c: 'licht', prof: [[-0.5, 0.7, 0.6], [-0.1, 1.0, 0.55], [0.3, 0.95, 0.5], [0.7, 0.75, 0.4], [0.93, 0.45, 0.3], [1.04, 0.15, 0.15]] },
    schn: { prof: [[-0.12, 1.6, 1.2], [0.05, 1.7, 1.6], [0.35, 1.3, 1.4], [0.7, 0.95, 0.9], [1.0, 0.95, 1.0], [1.1, 0.8, 0.75]], lagen: [{ c: 'licht', prof: [[0.0, -0.7, 1.7], [0.6, -0.4, 1.0], [1.1, -0.3, 0.8]] }] },
    mt: { c: 'licht', prof: [[-0.12, 0.8, 0.85], [0.1, 0.8, 0.85], [0.6, 0.74, 0.74], [1.0, 0.78, 0.78], [1.2, 0.7, 0.7]] },
    ap: { voet: true, c: 'licht', prof: [[-0.5, 0.7, 0.6], [-0.1, 1.0, 0.55], [0.3, 0.95, 0.5], [0.7, 0.75, 0.4], [0.93, 0.45, 0.3], [1.04, 0.15, 0.15]] },
  },
  STAART: { c: 'basis', w: [1.1, 1.0, 0.9, 0.75, 0.55, 0.28], onder: [0.05, 0.9], onderC: 'licht' },
  GEZICHT(ctx, pal, cm) { _hondOog(ctx, cm([1221, 124]), 0.72, '#2E1C0E', pal, { rond: 1, hoek: 0 });
    _hondLijn(ctx, [cm([1219, 136]), cm([1226, 137]), cm([1232, 135])], '#3A2A20', 0.12); },
  TENEN: (ctx, k, pal, BOT) => _hondTenen(ctx, k, pal, BOT, 0.36),
  HOUDING: { staan: { adem: 1, ver: { V: 1, A: 3 } },
    zitten: { zit: 1, autoZit: { heup: 3.6, rv: [-64, -24], V: 1, A: 5, ver: { V: 1.2, A: 1.2 }, ty: -0.2, meta: [80, 2], poot: [24, 4] }, A: { rompV: -64, rompM: 122, rompA: 102, nek: -74, kop: 14, st0: 110, st1: 150, st2: 176, st3: 190 } },
    liggen: { R: [0, -8.5], zit: 1, A: { rompV: -4, rompM: 178, rompA: 172, nek: -58, kop: 14, st0: 160, st1: 176, st2: 182, st3: 186 },
      voet: { V: [22, -0.2, 2, 4], VF: [20, -0.2, 3, 4], A: [-6, -0.2, 4, 6], AF: [-4.5, -0.2, 4, 6] } } },
};
HOND_CHIHUAHUA_DEF.LOPEN = _hondStap(18, 2.2);
HOND_CHIHUAHUA_DEF.DRAF = _hondDraf(30, 2.8);
const HOND = {};
for (const [n, D] of [['herder', HOND_HERDER_DEF], ['teckel', HOND_TECKEL_DEF], ['mops', HOND_MOPS_DEF], ['chihuahua', HOND_CHIHUAHUA_DEF]]) HOND[n] = HondPop.maak(D);
function hond(ctx, ras, x, y, s, o = {}) { const P = HOND[ras] || HOND.herder; if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o);
  if (oo.fase != null && !oo.houding) { oo.houding = 'lopen'; oo.t = oo.fase; }
  let h = oo.houding || 'staan'; h = { rennen: 'draven', draf: 'draven', stappen: 'lopen', grazen: 'staan', snuffelen: 'staan', vechten: 'staan', huilen: 'zitten' }[h] || h;
  if (!P.GANGEN[h] && !P.D.HOUDING[h]) h = 'staan'; oo.houding = h; return P.teken(ctx, x, y, s, oo); }
const MUIS_DEF = {
  K: 1, X0: 0, G0: 0, rand: 0.06, stap: 0.05, klipGrond: 0.03, verMix: 0.3, verKleur: '#3A2E26', dik: 1,
  J: { midrug: [0, -2.9], nekBasis: [2.2, -2.8], lend: [-1.8, -2.9], kruis: [-3.4, -2.6],
    kop: [3.0, -3.1], neus: [5.8, -1.9], kaak: [3.6, -2.0], kin: [5.1, -1.55],
    schoft: [1.8, -3.0], schouder: [2.6, -1.9], elleboog: [1.9, -1.1], pols: [2.2, -0.36], vkogel: [2.3, -0.18], vteen: [2.9, -0.06],
    heup: [-3.0, -2.2], knie: [-2.0, -1.35], hak: [-3.6, -0.72], akogel: [-2.4, -0.14], ateen: [-1.8, -0.05],
    staart0: [-3.9, -2.2], staart1: [-6.0, -1.5], staart2: [-8.2, -0.95], staart3: [-10.4, -0.7], staart4: [-12.8, -0.85] },
  PAL: { basis: '#9A7656', donker: '#84644A', licht: '#E2D6C2', roze: '#D8A8A0', oorbin: '#D8A898', staart: '#A88470', neus: '#B57E78', klauw: '#8A6A60' },
  DELEN: {
    romp: { skin: 'romp', lagen: [
      { c: 'basis', p: [[-4.6, -1.6], [-4.3, -2.9], [-3.2, -3.8], [-1.2, -4.2], [1.0, -4.1], [2.4, -3.6], [3.2, -2.6], [3.2, -1.6], [2.6, -0.9], [1.2, -0.8], [-0.6, -0.8], [-2.2, -0.9], [-3.8, -1.1]] },
      { c: 'donker', p: [[-4.4, -2.7], [-3.2, -3.9], [-1.2, -4.3], [1.0, -4.2], [2.4, -3.7], [1.6, -3.5], [-0.6, -3.6], [-2.6, -3.3], [-4.0, -2.4]] },
      { c: 'licht', p: [[3.3, -1.9], [2.8, -0.8], [1.0, -0.7], [-1.0, -0.7], [-2.6, -0.8], [-3.6, -1.2], [-2.4, -1.35], [-0.5, -1.3], [1.4, -1.4], [2.8, -1.7]] },
    ] },
    nek: { skin: 'nek', lagen: [
      { c: 'basis', p: [[1.6, -3.8], [2.6, -4.0], [3.6, -3.6], [4.0, -2.6], [3.6, -1.6], [2.8, -1.2], [2.2, -2.0], [1.8, -2.8]] },
      { c: 'licht', p: [[3.9, -2.2], [3.6, -1.5], [2.9, -1.15], [2.9, -1.6], [3.4, -1.9]] },
    ] },
    kop: { bot: 'kop', lagen: [
      { c: 'basis', p: [[2.8, -3.6], [3.4, -4.1], [4.2, -4.0], [4.9, -3.4], [5.5, -2.6], [5.9, -2.1], [5.85, -1.75], [5.2, -1.45], [4.4, -1.3], [3.6, -1.5], [3.0, -2.2]] },
      { c: 'licht', p: [[3.6, -1.95], [4.6, -1.95], [5.6, -1.85], [5.4, -1.4], [4.4, -1.25], [3.6, -1.45]] },
      { c: 'neus', p: [[5.62, -2.2], [5.95, -2.05], [5.92, -1.75], [5.6, -1.82]] },
    ] },
    kaak: { bot: 'kaak', lagen: [{ c: 'licht', p: [[3.8, -1.55], [4.6, -1.5], [5.3, -1.5], [5.0, -1.2], [4.2, -1.15]] }] },
    oor: { bot: 'kop', lagen: [
      { c: 'basis', p: [[3.0, -3.7], [2.75, -4.9], [3.25, -5.65], [4.1, -5.55], [4.45, -4.7], [4.1, -3.9]] },
      { c: 'oorbin', p: [[3.2, -3.95], [3.1, -4.8], [3.5, -5.3], [4.0, -5.2], [4.15, -4.5], [3.9, -4.05]] },
    ] },
    oorF: { bot: 'kop', lagen: [{ c: 'donker', p: [[3.8, -3.9], [3.9, -4.95], [4.45, -5.25], [4.85, -4.7], [4.6, -4.0]] }] },
    hum: { skin: 'hum', lagen: [{ c: 'basis', p: [[1.6, -3.2], [2.6, -3.0], [3.2, -2.2], [3.0, -1.4], [2.4, -0.9], [1.8, -1.0], [1.5, -1.8]] }] },
    dij: { skin: 'dij', lagen: [{ c: 'basis', p: [[-4.2, -2.6], [-3.2, -3.2], [-2.0, -3.0], [-1.3, -2.2], [-1.4, -1.3], [-2.2, -0.9], [-3.4, -1.0], [-4.2, -1.6]] }] },
  },
  POOT: {
    rad: { prof: [[-0.15, 0.3, 0.2], [0.0, 0.32, 0.3], [0.5, 0.22, 0.2], [1.0, 0.17, 0.17], [1.12, 0.15, 0.13]] },
    mc: { c: 'roze', prof: [[-0.3, 0.15, 0.15], [0.0, 0.15, 0.15], [1.0, 0.13, 0.13], [1.3, 0.11, 0.11]] },
    vp: { voet: true, c: 'roze', prof: [[-0.4, 0.13, 0.11], [0.0, 0.17, 0.1], [0.5, 0.15, 0.09], [0.9, 0.1, 0.06], [1.06, 0.04, 0.04]] },
    schn: { prof: [[-0.12, 0.45, 0.35], [0.1, 0.45, 0.42], [0.5, 0.3, 0.28], [1.0, 0.2, 0.2], [1.12, 0.17, 0.15]] },
    mt: { c: 'roze', prof: [[-0.15, 0.17, 0.19], [0.0, 0.18, 0.19], [1.0, 0.14, 0.12], [1.12, 0.12, 0.1]] },
    ap: { voet: true, c: 'roze', prof: [[-0.3, 0.12, 0.1], [0.0, 0.15, 0.09], [0.5, 0.13, 0.08], [0.9, 0.09, 0.05], [1.08, 0.03, 0.03]] },
  },
  STAART: { c: 'staart', w: [0.3, 0.2, 0.16, 0.13, 0.1, 0.06] },
  GEZICHT(ctx, pal, cm) { const O = cm([4.45, -3.0]); ctx.fillStyle = '#100B08'; ctx.beginPath(); ctx.ellipse(O[0], O[1], 0.48, 0.44, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(O[0] + 0.16, O[1] - 0.16, 0.1, 0, 6.283); ctx.fill();
    ctx.strokeStyle = 'rgba(236,230,218,0.8)'; ctx.lineWidth = 0.035; const a = cm([5.35, -1.9]); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(a[0] + 1.2, a[1] - 0.4 + i * 0.2, a[0] + 2.4, a[1] - 0.9 + i * 0.5); ctx.stroke(); } },
  HOUDING: { staan: { adem: 1, ver: { V: 0.4, A: 0.5 } },
    zitten: { zit: 1, autoZit: { heup: 1.1, rv: [-50, -10], V: 0.3, A: 1.2, ver: { V: 0.3, A: 0.3 }, ty: -0.04, meta: [80, 4], poot: [20, 4] }, A: { rompV: -50, rompM: 140, rompA: 118, nek: -40, kop: 26, st0: 150, st1: 178, st2: 184, st3: 186 } },
    rechtop: { R: [-1.2, -4.2], zit: 1, A: { rompV: -72, rompM: 112, rompA: 98, nek: -38, kop: 22, st0: 168, st1: 182, st2: 184, st3: 186 },
      voet: { V: [2.4, -3.0, 100, 70], VF: [2.7, -3.1, 100, 72], A: [-2.0, -0.04, 4, 4], AF: [-1.6, -0.04, 4, 4] } },
  },
};
MUIS_DEF.LOPEN = _hondStap(3.6, 0.55, { romp: { nek: -36, kop: 24 }, staartZwaai: [1, 2, 3, 4] });
MUIS_DEF.DRAF = _hondDraf(5.5, 0.9, { romp: { nek: -30, kop: 28 }, staartZwaai: [2, 3, 4, 5] });
const MUIS = HondPop.maak(MUIS_DEF);
function muis(ctx, x, y, s, o = {}) { if ((o.a ?? 1) <= 0.01) return; const oo = Object.assign({}, o); let h = oo.houding || 'staan'; h = { rennen: 'draven', zit: 'zitten' }[h] || h; if (!MUIS.GANGEN[h] && !MUIS.D.HOUDING[h]) h = 'staan'; oo.houding = h; return MUIS.teken(ctx, x, y, s, oo); }
const PopRC = (() => {
  const RAD = Math.PI / 180;
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (v, k) => [v[0] * k, v[1] * k];
  const len = (v) => Math.hypot(v[0], v[1]), ang = (v) => Math.atan2(v[1], v[0]), dir = (a) => [Math.cos(a), Math.sin(a)];
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const lin = (a, b, u) => a + (b - a) * u, cl = (x, a, b) => Math.max(a, Math.min(b, x));
  const sstep = (u) => { u = cl(u, 0, 1); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const kurve = (K, u) => { u = cl(u, K[0][0], K[K.length - 1][0]); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };
  // 1D Catmull-Rom door sleutelpunten [[s, v], ...] (niet-uniform)
  function cr(K, s) { const n = K.length; if (s <= K[0][0]) return K[0][1]; if (s >= K[n - 1][0]) return K[n - 1][1]; let i = 0; while (K[i + 1][0] < s) i++;
    const p0 = K[Math.max(0, i - 1)], p1 = K[i], p2 = K[i + 1], p3 = K[Math.min(n - 1, i + 2)], h = p2[0] - p1[0], u = (s - p1[0]) / h;
    const m1 = (p2[1] - p0[1]) / (p2[0] - p0[0] || 1) * h, m2 = (p3[1] - p1[1]) / (p3[0] - p1[0] || 1) * h; return hermite(p1[1], p2[1], m1, m2, u); }
  function spline(P) { const n = P.length, out = []; const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n]; const st = Math.max(2, Math.min(24, Math.ceil(len(sub(b, a)) / 0.6)));
      for (let s = 0; s < st; s++) { const u = s / st; out.push([hermite(a[0], b[0], ta[0], tb[0], u), hermite(a[1], b[1], ta[1], tb[1], u)]); } } return out; }
  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  // buis rond een open lijn met halve breedtes W; ronde kappen; zijde = { links: [i0,i1], rechts: [...] } voor haarpieken
  function buis(P, W, kap = [1, 1]) { const n = P.length, L = [], R = [];
    for (let i = 0; i < n; i++) { const a = P[Math.max(0, i - 1)], b = P[Math.min(n - 1, i + 1)], t = sub(b, a), tl = len(t) || 1, nn = [-t[1] / tl, t[0] / tl];
      L.push(add(P[i], mul(nn, W[i]))); R.push(sub(P[i], mul(nn, W[i]))); }
    const capPts = (c, w, a0) => { const o = []; for (let k = 1; k < 8; k++) { const a = a0 - Math.PI * k / 8; o.push(add(c, mul(dir(a), w))); } return o; };
    const t0 = sub(P[Math.min(1, n - 1)], P[0]), t1 = sub(P[n - 1], P[Math.max(0, n - 2)]);
    const eind = kap[1] ? capPts(P[n - 1], W[n - 1], ang(t1) + Math.PI / 2) : [];
    const begin = kap[0] ? capPts(P[0], W[0], ang(t0) - Math.PI / 2) : [];
    return { pts: L.concat(eind, R.slice().reverse(), begin), nL: L.length, nE: eind.length }; }
  // fijne lijn langs een open pad met dikte w0 -> w1 (streep, plek)
  function streep(lijn, w0, w1) { const n = lijn.length; if (n < 2) return null; const W = lijn.map((_, i) => lin(w0, w1, i / (n - 1))); return buis(lijn, W).pts; }
  // haarpieken (vlamvorm, helling naar achter) op een deel van een gesloten omtrek: f(i, p) -> gewicht 0..1
  function pieken(P, amp, w, f, seed = 1) { const n = P.length; let ar = 0; for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n]; ar += a[0] * b[1] - b[0] * a[1]; } const sg = ar > 0 ? 1 : -1;
    let sc = 0; return P.map((p, i) => { const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; if (i) sc += len(sub(p, a)); const g = f(i, p); if (g <= 0) return p; const t = sub(b, a), tl = len(t) || 1, nn = [sg * t[1] / tl, -sg * t[0] / tl];
      const k = Math.floor(sc / w), ph = fr(sc / w), h = amp * g * (0.55 + 0.7 * hsh(k * 7.7 + seed)) * (ph < 0.72 ? Math.pow(ph / 0.72, 1.5) : (1 - ph) / 0.28); return add(p, mul(nn, h)); }); }
  function ik2(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2); dd = cl(dd, Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-3);
    const al = Math.acos(cl((l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd), -1, 1)); const a1 = ang(d) + teken * al, j = add(p0, mul(dir(a1), l1)); return { j, a1, a2: ang(sub(t, j)), rek }; }
  // 3D
  const v3 = { sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], len: (a) => Math.hypot(a[0], a[1], a[2]), norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; } };
  function ik3(P, T, l1, l2, pool) { let d = v3.sub(T, P); let dd = v3.len(d); const rek = dd / (l1 + l2); const dn = v3.norm(d); dd = cl(dd, Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-3);
    const a = (l1 * l1 - l2 * l2 + dd * dd) / (2 * dd), h = Math.sqrt(Math.max(0, l1 * l1 - a * a)); let pv = v3.sub(pool, v3.mul(dn, v3.dot(pool, dn))); pv = v3.norm(pv);
    const K = v3.add(v3.add(P, v3.mul(dn, a)), v3.mul(pv, h)); const T2 = v3.add(P, v3.mul(dn, dd)); return { K, T: T2, rek }; }
  // tekenen in twee passes: eerst alleen een lichte rand van alle delen, dan alle vlakken (+ lagen geknipt op het deel)
  const RANDK = (c) => mixHex(c, 0.22, '#F2EEE6');
  function tekenDelen(ctx, delen, rand) { ctx.lineJoin = 'round';
    for (const d of delen) { if (!d || d.geenRand) continue; pad(ctx, d.pts); ctx.strokeStyle = RANDK(d.c); ctx.lineWidth = rand; ctx.stroke(); }
    for (const d of delen) { if (!d) continue; pad(ctx, d.pts); ctx.fillStyle = d.c; ctx.fill();
      if (d.lagen && d.lagen.length) { ctx.save(); pad(ctx, d.pts); ctx.clip(); for (const L of d.lagen) { if (!L) continue; if (L.fn) { L.fn(ctx); continue; }
        if (L.lijn) { ctx.beginPath(); L.pts.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = L.c; ctx.lineWidth = L.lijn; ctx.lineCap = 'round'; ctx.stroke(); }
        else { pad(ctx, L.pts); ctx.fillStyle = L.c; ctx.fill(); } } ctx.restore(); }
      if (d.na) d.na(ctx); } }

  // =====================================================================================================
  // REPTIEL-RIG
  // =====================================================================================================
  function reptiel(D) {
    const L = D.L, NS = D.NS || 180, S0 = D.anker; // S0 = x van de snuitpunt in ruststand (anker = x 0)
    const top0 = (s) => cr(D.prof.map(p => [p[0], p[1]]), s), bot0 = (s) => cr(D.prof.map(p => [p[0], p[2]]), s), brd = (s) => Math.max(0.02, cr(D.prof.map(p => [p[0], p[3]]), s));
    const diep = (s) => top0(s) - bot0(s);
    const SS = Array.from({ length: NS }, (_, i) => L * Math.pow(i / (NS - 1), 1));
    const PAL = D.PAL, PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.34, D.verKleur || '#2E3428');
    const GANG = D.GANG, sm = (D.sS + D.sH) / 2;
    // ---- pose: per knoop [x, y(centrum = onderkant), z], hoek phi (zijwaarts), en per poot de gewrichten ----
    function wervel(phiF, bodem) { // phiF(s) zijwaartse richting; bodem(s) = hoogte buik boven grond (cm, +)
      const X = new Array(NS), Z = new Array(NS), PH = SS.map(phiF); let im = 0; while (SS[im + 1] < sm) im++;
      X[im] = S0 - SS[im]; Z[im] = 0;
      for (let i = im - 1; i >= 0; i--) { const ds = SS[i + 1] - SS[i], ph = (PH[i] + PH[i + 1]) / 2; X[i] = X[i + 1] + Math.cos(ph) * ds; Z[i] = Z[i + 1] + Math.sin(ph) * ds; }
      for (let i = im + 1; i < NS; i++) { const ds = SS[i] - SS[i - 1], ph = (PH[i] + PH[i - 1]) / 2; X[i] = X[i - 1] - Math.cos(ph) * ds; Z[i] = Z[i - 1] - Math.sin(ph) * ds; }
      const B = SS.map(bodem); return { X, Z, PH, B }; }
    const op = (W, s) => { let i = 0; while (i < NS - 2 && SS[i + 1] < s) i++; const u = (s - SS[i]) / (SS[i + 1] - SS[i]);
      return { x: lin(W.X[i], W.X[i + 1], u), z: lin(W.Z[i], W.Z[i + 1], u), ph: lin(W.PH[i], W.PH[i + 1], u), b: lin(W.B[i], W.B[i + 1], u) }; };
    // gewricht (schouder/heup) van poot L: 3D
    function gordel(W, L) { const voor = L[0] === 'V', sg = L[1] === 'N' ? 1 : -1, s = voor ? D.sS : D.sH, q = op(W, s);
      const y = -(q.b + diep(s) * (voor ? D.jS : D.jH)), wz = brd(s) * 0.82; return [q.x - Math.sin(q.ph) * wz * sg, y, q.z + Math.cos(q.ph) * wz * sg]; }
    // poot: G (gewricht), B (bal = begin tenen) op de grond, psi = richting voet in xz, p = hiel omhoog (graden), q = tenen krullen (graden, + = omlaag)
    function poot(G, L, B, psi, p, q) { const voor = L[0] === 'V', P = D.poot[voor ? 'V' : 'A'], sg = L[1] === 'N' ? 1 : -1;
      const cp = Math.cos(p * RAD), sp = Math.sin(p * RAD); const Wp = [B[0] - P.l[2] * cp * Math.cos(psi), B[1] - P.l[2] * sp - P.dik * cp, B[2] - P.l[2] * cp * Math.sin(psi)];
      const pool = [P.pool[0], P.pool[1], P.pool[2] * sg]; const r = ik3(G, Wp, P.l[0], P.l[1], pool);
      const tenen = P.tenen.map(([da, tl], k) => { const a = psi + da * sg * RAD, cq = Math.cos(q * RAD); return [B[0] + tl * cq * Math.cos(a), B[1] + tl * Math.sin(q * RAD), B[2] + tl * cq * Math.sin(a)]; });
      return { G, K: r.K, W: r.T, B, tenen, rek: r.rek, psi }; }
    const POTEN = ['VN', 'VF', 'AN', 'AF'];
    function stand(o) { const h = o.houding || 'lopen', t = fr(o.t || 0);
      if (h === 'liggen') { const LG = D.LIGGEN; const W = wervel((s) => LG.phi ? LG.phi(s) : 0, (s) => cr(LG.bodem, s)); const benen = {};
        for (const Lb of POTEN) { const voor = Lb[0] === 'V', sg = Lb[1] === 'N' ? 1 : -1, G = gordel(W, Lb), v = LG.voet[voor ? 'V' : 'A'];
          const Bx = S0 - (voor ? D.sS : D.sH) + v[0] + (sg < 0 ? v[3] || 0 : 0); benen[Lb] = poot(G, Lb, [Bx, 0, sg * v[1]], sg * v[2] * RAD, 0, 0); benen[Lb].steun = true; }
        return { W, benen }; }
      const G = GANG, staan = h === 'staan';
      const fase = (Lb) => fr(t - G.fase[Lb]);
      const yS = staan ? 0 : -G.yaw[0] * RAD * Math.cos(2 * Math.PI * (t - G.fase.VN)), yH = staan ? 0 : -G.yaw[1] * RAD * Math.cos(2 * Math.PI * (t - G.fase.AN));
      const kop = G.kopVast ?? 0.4, kap = G.staartGolf || 0.6;
      const phiF = (s) => { if (s <= D.sS) return yS * (kop + (1 - kop) * s / D.sS); if (s <= D.sH) return lin(yS, yH, (s - D.sS) / (D.sH - D.sS));
        const u = (s - D.sH) / (L - D.sH); const A = lin(G.yaw[1], G.yaw[2], Math.pow(u, 0.8)) * RAD; return staan ? 0 : -A * Math.cos(2 * Math.PI * (t - G.fase.AN) - 2 * Math.PI * kap * u); };
      const bob = staan ? 0 : (G.bob || 0) * Math.cos(4 * Math.PI * (t - 0.08));
      const W = wervel(phiF, (s) => bot0(s) + bob * (s < D.sH + 20 ? 1 : 0) + (D.staartLeg ? D.staartLeg(s, t) : 0)); const benen = {};
      for (const Lb of POTEN) { const voor = Lb[0] === 'V', k = voor ? 'V' : 'A', sg = Lb[1] === 'N' ? 1 : -1, Gp = gordel(W, Lb), beta = G.beta[k];
        const nx = S0 - (voor ? D.sS : D.sH) + G.nx[k], half = G.S * beta / 2; const p = staan ? (Lb[1] === 'N' ? 0.3 : 0.5) * beta : fase(Lb), steun = p < beta; let bx, by = 0, bz = sg * G.spread[k], hp, tq, u;
        if (staan) { bx = nx + (sg < 0 ? G.verDx || 0 : 0); hp = 0; tq = 0; u = 0.5; }
        else if (steun) { u = p / beta; bx = nx + half * (1 - 2 * u); hp = kurve([[0, 0], [0.62, 0], [1, G.hiel[k]]], u); tq = 0; }
        else { u = (p - beta) / (1 - beta); const m = -G.S * (1 - beta) * 0.5; bx = hermite(nx - half, nx + half, m, m, u); by = -G.lift[k] * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.85)), 1.1);
          bz = sg * (G.spread[k] - G.inw[k] * Math.sin(Math.PI * u)); hp = kurve([[0, G.hiel[k]], [0.45, G.hiel[k] * 0.6], [0.85, -6], [1, 0]], u); tq = kurve([[0, 10], [0.4, 35], [0.85, -5], [1, 0]], u); }
        if (voor && G.scap && !staan) Gp[0] += G.scap * cl2((bx - nx) / half); // schoudergordel/borstbeen schuift mee (Baier e.a.: grotere pas in de high walk)
        const psi = sg * G.psi[k] * RAD + (steun ? 0 : sg * 10 * RAD * Math.sin(Math.PI * u));
        benen[Lb] = poot(Gp, Lb, [bx, by, bz], psi, hp, tq); benen[Lb].steun = steun; benen[Lb].u = u; }
      return { W, benen }; }
    // ---- zijaanzicht ----
    const NO = D.NO || 260; const SO = Array.from({ length: NO }, (_, i) => L * i / (NO - 1));
    function zij(st) { const { W } = st; const Tp = [], Bp = [];
      for (const s of SO) { const q = op(W, s), d = diep(s) + (D.kam ? D.kam(s) : 0); Tp.push([q.x, -(q.b + d)]); Bp.push([q.x, -q.b]); }
      const q0 = op(W, 0), d0 = diep(0), r0 = d0 / 2; const neus = []; for (let k = 1; k < 8; k++) { const a = -Math.PI / 2 + Math.PI * k / 8; neus.push([q0.x + Math.cos(a) * r0 * (D.neusRond || 0.8), -(q0.b + r0) + Math.sin(a) * r0]); }
      const romp = Tp.concat().reverse().concat([]).reverse(); // top van snuit naar staart
      const pts = neus.slice().reverse().concat(Tp, Bp.slice().reverse()); // start bij neus onder->boven? (gesloten, volgorde maakt niet uit)
      const M = (s, f) => { const q = op(W, s); return [q.x, -(q.b + diep(s) * f)]; }; // f = 0 onderkant, 1 bovenkant (zonder kam)
      return { pts, M, Tp, Bp }; }
    function pootDelen(b, ver, P, pal, k) { // delen van één poot in volgorde achter -> voor, zijaanzicht (x, y)
      const pr = (v) => [v[0], v[1]]; const w = P.w; const G = pr(b.G), K = pr(b.K), Wt = pr(b.W), B = pr(b.B);
      const G2 = [G[0], G[1] - (P.hoger || 0)]; const boven = { pts: buis([G2, lin2(G, K, 0.5), K], [w[0], (w[0] + w[1]) / 2, w[1]]).pts, c: pal.poot, lagen: [] };
      const onder = { pts: buis([K, lin2(K, Wt, 0.5), Wt], [w[1], (w[1] + w[2]) / 2, w[2]]).pts, c: pal.poot, lagen: [] };
      const voet = { pts: buis([Wt, B], [w[2], w[3]]).pts, c: pal.poot, lagen: [] };
      const tenen = b.tenen.map((T, j) => ({ pts: buis([B, lin2(B, pr(T), 0.6), pr(T)], [w[4], w[4] * 0.85, w[4] * 0.55]).pts, c: pal.poot, geenRand: false, na: P.klauw ? (ctx) => { const e = pr(T), a = ang(sub(e, B)); ctx.fillStyle = pal.klauw; ctx.beginPath(); ctx.moveTo(...add(e, mul(dir(a + 1.4), w[4] * 0.5))); ctx.lineTo(...add(e, mul(dir(a), P.klauw))); ctx.lineTo(...add(e, mul(dir(a - 1.4), w[4] * 0.5))); ctx.closePath(); ctx.fill(); } : null }));
      // zwemvlies (achterpoot krokodil): vlak tussen de tenen
      const vlies = P.vlies ? { pts: [B].concat(b.tenen.slice(0, P.vlies).map(pr).map((T) => lin2(B, T, 0.75))), c: pal.pootD, geenRand: true } : null;
      if (P.schubben) for (const part of [boven, onder]) part.lagen.push({ fn: (ctx) => P.schubben(ctx, part === boven ? [G, K] : [K, Wt], w, pal) });
      // dij/bovenarm: lichtere voorkant, donkere achterkant (leesbaarheid)
      boven.lagen.unshift({ pts: buis([lin2(G, K, 0.25), K], [w[0] * 0.3, w[1] * 0.28]).pts.map(p => add(p, mul(norm2(sub(K, G), k === 'A' ? -1 : 1), w[1] * 0.72))), c: pal.pootL });
      onder.lagen.unshift({ pts: buis([K, Wt], [w[1] * 0.3, w[2] * 0.3]).pts.map(p => add(p, mul(norm2(sub(Wt, K), k === 'A' ? 1 : -1), w[1] * 0.75))), c: pal.pootD });
      return ver ? [boven, onder, vlies, voet, ...tenen] : [...tenen, vlies, voet, onder, boven]; }
    const lin2 = (a, b, u) => [lin(a[0], b[0], u), lin(a[1], b[1], u)], cl2 = (v) => cl(v, -1.2, 1.2);
    const norm2 = (v, sg = 1) => { const l = len(v) || 1; return [-v[1] / l * sg, v[0] / l * sg]; };
    function teken(ctx, x, y, s, o = {}) { const st = o.stand || stand(o); const kijk = o.kijk || 1, ver = (Lb) => Lb[1] === 'F';
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * kijk, s); const rand = (o.rand ?? 1.5) / s;
      if (o.wereld && (o.houding || 'lopen') === 'lopen') ctx.translate(GANG.S * fr(o.t || 0), 0);
      if (o.boven) { tekenBoven(ctx, st, rand, o); ctx.restore(); return st; }
      const Z = zij(st); const delen = [];
      const P = D.poot;
      for (const Lb of ['AF', 'VF']) delen.push(...pootDelen(st.benen[Lb], true, P[Lb[0]], { poot: PALF.poot, pootL: PALF.pootL, pootD: PALF.pootD, klauw: PALF.klauw }, Lb[0]));
      if (D.verKam) delen.push(D.verKam(Z, PALF, st));
      const lijf = { pts: Z.pts, c: PAL.flank, lagen: D.lagen ? D.lagen(Z, PAL, st) : [] }; delen.push(lijf);
      for (const Lb of ['AN', 'VN']) delen.push(...pootDelen(st.benen[Lb], false, P[Lb[0]], PAL, Lb[0]));
      tekenDelen(ctx, delen, rand);
      if (D.kopDetail) D.kopDetail(ctx, Z, PAL, s, st);
      if (o.skelet) { ctx.lineWidth = 2 / s; for (const Lb of POTEN) { const b = st.benen[Lb]; ctx.strokeStyle = ver(Lb) ? '#4FC3F7' : '#FF5252'; ctx.beginPath(); [b.G, b.K, b.W, b.B].forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
        ctx.strokeStyle = '#FFEB3B'; ctx.beginPath(); SO.forEach((s2, i) => { const q = op(st.W, s2); i ? ctx.lineTo(q.x, -q.b - diep(s2) / 2) : ctx.moveTo(q.x, -q.b - diep(s2) / 2); }); ctx.stroke(); }
      ctx.restore(); return st; }
    // ---- bovenaanzicht (controle tegen de plaat): x vooruit, scherm-y = -z ----
    function tekenBoven(ctx, st, rand, o) { const { W } = st; const Lp = [], Rp = [];
      for (const s of SO) { const q = op(W, s), w = brd(s); Lp.push([q.x - Math.sin(q.ph) * w, -(q.z + Math.cos(q.ph) * w)]); Rp.push([q.x + Math.sin(q.ph) * w, -(q.z - Math.cos(q.ph) * w)]); }
      const delen = []; const pr = (v) => [v[0], -v[2]];
      for (const Lb of POTEN) { const b = st.benen[Lb], P = D.poot[Lb[0]], w = P.w; const G = pr(b.G), K = pr(b.K), Wt = pr(b.W), B = pr(b.B);
        delen.push({ pts: buis([G, K], [w[0], w[1]]).pts, c: PAL.poot }, { pts: buis([K, Wt], [w[1], w[2]]).pts, c: PAL.poot }, { pts: buis([Wt, B], [w[2], w[3]]).pts, c: PAL.poot },
          ...b.tenen.map(T => ({ pts: buis([B, pr(T)], [w[4], w[4] * 0.5]).pts, c: PAL.poot }))); }
      const R = Lp.concat(Rp.reverse()); delen.push({ pts: R, c: PAL.flank, lagen: [{ pts: (() => { const A = [], B2 = []; for (const s of SO) { const q = op(W, s), w = brd(s) * 0.55; A.push([q.x - Math.sin(q.ph) * w, -(q.z + Math.cos(q.ph) * w)]); B2.push([q.x + Math.sin(q.ph) * w, -(q.z - Math.cos(q.ph) * w)]); } return A.concat(B2.reverse()); })(), c: PAL.rug }] });
      tekenDelen(ctx, delen, rand);
      if (o.skelet) { ctx.lineWidth = 2 / (o.sk || 1); ctx.strokeStyle = '#FFEB3B'; ctx.beginPath(); SO.forEach((s2, i) => { const q = op(W, s2); i ? ctx.lineTo(q.x, -q.z) : ctx.moveTo(q.x, -q.z); }); ctx.stroke(); } }
    function info(o = {}) { const st = stand(o); return st; }
    return { teken, stand, info, D, op, diep, bot0, top0, brd, SO };
  }

  // =====================================================================================================
  // AAP-RIG (chimpansee), 2D
  // =====================================================================================================
  function aap(D) {
    const PAL = D.PAL, PALF = {}; for (const k in PAL) PALF[k] = mixHex(PAL[k], D.verMix ?? 0.32, D.verKleur || '#141820');
    const B = D.bot; // lengtes
    // romp in rust: x langs de romp vanaf het heupgewricht, y = buikkant (+)
    const ROMP = pieken(spline(D.romp), D.piek[0], D.piek[1], (i, p) => (p[1] < -9 ? 1 : (p[1] > 13 && p[0] < 44 ? 0.8 : 0)), 11); const wBorst = (x) => sstep((x - (B.buik - 9)) / 18);
    const ROMPLAAG = D.rompLagen.map(l => ({ c: l.c, pts: spline(l.p) }));
    function fk(S) { // S: { R, A: {buik, borst, nek, kop} (graden) }
      const A = {}; for (const k in S.A) A[k] = S.A[k] * RAD; const R = S.R, mid = add(R, mul(dir(A.buik), B.buik)), nekB = add(mid, mul(dir(A.borst), B.borst)), kopJ = add(nekB, mul(dir(A.nek), B.nek));
      const huid = (p) => { const w = wBorst(p[0]); const a = add(R, rot(p, A.buik)), b = add(mid, rot([p[0] - B.buik, p[1]], A.borst)); return [lin(a[0], b[0], w), lin(a[1], b[1], w)]; };
      return { A, R, mid, nekB, kopJ, huid, sch: huid(D.schouder), heup: huid(D.heup) }; }
    // pose -> volledige stand (alle gewrichten)
    function benen(F, S, voeten, handen) { const out = {};
      for (const k in voeten) { const v = voeten[k]; const va = v.voet * RAD, Bp = v.bal; const A = sub(Bp, mul(dir(va), B.voet)); const r = ik2(F.heup, A, B.dij, B.schn, v.knieTeken ?? -1);
        out['A' + k] = { H: F.heup, K: r.j, Ak: A, Bp, voet: va, teen: (v.teen ?? 0) * RAD, rek: r.rek, steun: v.steun }; }
      for (const k in handen) { const h = handen[k]; const sch = add(F.sch, [h.schX || 0, h.schY || 0]); let Wp, ha = h.hand * RAD, Kn;
        if (h.knokkel) { Kn = h.knokkel; Wp = sub(Kn, mul(dir(ha), B.hand)); } else { Wp = h.pols; Kn = add(Wp, mul(dir(ha), B.hand)); }
        const r = ik2(sch, Wp, B.hum, B.rad, h.elleboogTeken ?? 1); out['V' + k] = { S: sch, E: r.j, Wp, Kn, hand: ha, vinger: h.vinger * RAD, rek: r.rek, steun: h.steun, grijp: h.grijp }; }
      return out; }
    // ---- houdingen ----
    const HOUDING = D.HOUDING;
    function stand(o) { const h = o.houding || 'staan'; const f = HOUDING[h] || HOUDING.staan; const st = f(o, { fk, benen, B, D, kurve, hermite, fr, lin, dir, add, sub, mul, RAD }); return st; }
    // ---- tekenen ----
    function tekenArm(b, pal, ver) { const d = []; const w = D.wArm;
      const hum = buis([b.S, lin2(b.S, b.E, 0.45), b.E], [w[0], w[0] * 0.95, w[1]]); const rad = buis([b.E, lin2(b.E, b.Wp, 0.4), b.Wp, add(b.Wp, mul(dir(b.hand), 1.2))], [w[1], w[1] * 1.02, w[2], w[2] * 0.9]);
      const humP = pieken(hum.pts, 1.1, 7, (i) => (i > hum.nL * 0.25 && i < hum.nL) ? 1 : 0, 3);
      const radP = pieken(rad.pts, 1.4, 6.5, (i) => (i < rad.nL * 0.9) ? 1 : 0, 5); // haar aan de achterkant van de onderarm
      const vg = b.Kn ? add(b.Kn, mul(dir(b.vinger), B.vinger)) : null;
      const hand = { pts: buis([b.Wp, lin2(b.Wp, b.Kn, 0.55), b.Kn], [w[3], w[3] * 1.12, w[4]]).pts, c: pal.huid, lagen: [{ pts: buis([b.Wp, lin2(b.Wp, b.Kn, 0.5)], [w[3] * 1.05, w[3] * 0.4]).pts, c: pal.vacht }] };
      const ving = { pts: buis([b.Kn, lin2(b.Kn, vg, 0.5), vg], [w[5], w[5] * 0.95, w[5] * 0.75]).pts, c: pal.huid, lagen: [{ lijn: 0.35, pts: [add(b.Kn, mul(dir(b.vinger + 1.4), w[5] * 0.6)), add(vg, mul(dir(b.vinger + 1.6), w[5] * 0.3))], c: pal.huidD }] };
      const duim = { pts: buis([lin2(b.Wp, b.Kn, 0.35), add(lin2(b.Wp, b.Kn, 0.35), mul(dir(b.hand + (b.grijp ? 1.2 : 0.55)), 3.6))], [1.3, 1.0]).pts, c: pal.huidD };
      const humD = { pts: humP, c: pal.vacht, lagen: [{ pts: buis([lin2(b.S, b.E, 0.1), lin2(b.S, b.E, 0.8)], [w[0] * 0.3, w[1] * 0.22]).pts.map(p => add(p, mul(norm2(sub(b.E, b.S)), -w[0] * 0.55))), c: pal.licht }, { pts: buis([lin2(b.S, b.E, 0.3), lin2(b.S, b.E, 1.0)], [w[0] * 0.25, w[1] * 0.25]).pts.map(p => add(p, mul(norm2(sub(b.E, b.S)), w[0] * 0.8))), c: pal.donker }] };
      const radD = { pts: radP, c: pal.vacht };
      return ver ? [humD, radD, ving, duim, hand] : [ving, duim, hand, radD, humD]; }
    function tekenBeen(b, pal, ver) { const w = D.wBeen;
      const dij = buis([b.H, lin2(b.H, b.K, 0.5), b.K], [w[0], w[0] * 0.9, w[1]]); const schn = buis([b.K, lin2(b.K, b.Ak, 0.5), b.Ak], [w[1] * 0.92, w[1] * 0.8, w[2]]);
      const dijP = pieken(dij.pts, 1.3, 8, (i) => (i > dij.nL + dij.nE) ? 1 : 0, 7), schnP = pieken(schn.pts, 1.1, 7, (i) => (i > schn.nL + schn.nE) ? 0.9 : 0, 9);
      // voet in zoolframe (bal = oorsprong, x langs de zool), hoek = voet - zoolhoek
      const za = b.voet - D.zoolHoek * RAD; const Z = (p) => add(b.Bp, rot(p, za)); const voetP = spline(D.voetVorm.map(Z));
      const T = add(b.Bp, mul(dir(za + b.teen), B.teen));
      const teen = { pts: buis([b.Bp, lin2(b.Bp, T, 0.5), T], [w[4], w[4] * 0.92, w[4] * 0.7]).pts.map(p => add(p, mul(dir(za + Math.PI / 2), w[4] * 0.55))), c: pal.huid, lagen: [] };
      const voet = { pts: voetP, c: pal.huid, lagen: [{ pts: spline(D.voetVacht.map(Z)), c: pal.vacht }] };
      const dijD = { pts: dijP, c: pal.vacht, lagen: [{ pts: buis([lin2(b.H, b.K, 0.2), lin2(b.H, b.K, 0.85)], [w[0] * 0.3, w[1] * 0.22]).pts.map(p => add(p, mul(norm2(sub(b.K, b.H)), -w[0] * 0.6))), c: pal.licht }, { pts: buis([lin2(b.H, b.K, 0.3), lin2(b.H, b.K, 1.0)], [w[0] * 0.28, w[1] * 0.3]).pts.map(p => add(p, mul(norm2(sub(b.K, b.H)), w[0] * 0.78))), c: pal.donker }] };
      const schnD = { pts: schnP, c: pal.vacht };
      const grtn = D.groteTeen ? { pts: buis([Z([-5.5, 1.6]), Z([-1.5, 2.6]), Z([1.5, 2.2])], [1.3, 1.25, 1.0]).pts, c: pal.huidD } : null;
      return ver ? [dijD, schnD, grtn, voet, teen] : [grtn, teen, voet, schnD, dijD]; }
    const lin2 = (a, b, u) => [lin(a[0], b[0], u), lin(a[1], b[1], u)];
    const norm2 = (v, sg = 1) => { const l = len(v) || 1; return [-v[1] / l * sg, v[0] / l * sg]; };
    function teken(ctx, x, y, s, o = {}) { const st = o.stand || stand(o); const F = st.F; const kijk = o.kijk || 1;
      ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.translate(-(D.anker || 0), 0); const rand = (o.rand ?? 1.5) / s;
      if (o.wereld && st.S) ctx.translate(st.S * fr(o.t || 0), 0);
      if (st.voor) st.voor(ctx, PAL, s);
      if (st.zit) { ctx.save(); ctx.beginPath(); ctx.rect(-400, -400, 800, 400.4); ctx.clip(); }
      const romp = { pts: ROMP.map(F.huid), c: PAL.vacht, lagen: ROMPLAAG.map(l => ({ c: PAL[l.c], pts: l.pts.map(F.huid) })) };
      const kopT = (p) => add(F.kopJ, rot(mul(p, D.kopSchaal), F.A.kop));
      const nek = { pts: buis([F.nekB, lin2(F.nekB, F.kopJ, 0.5), F.kopJ], D.wNek).pts, c: PAL.vacht };
      const kop = { pts: pieken(spline(D.kop.map(kopT)), 0.9, 3.2, (i, p) => D.kopHaar(i), 13), c: PAL.vacht, lagen: D.kopLagen.map(l => ({ c: PAL[l.c], pts: spline(l.p.map(kopT)) })), na: (ctx) => D.gezicht(ctx, kopT, PAL, s, F) };
      const oor = { pts: spline(D.oor.map(kopT)), c: PAL.huid, lagen: [{ pts: spline(D.oorBinnen.map(kopT)), c: PAL.huidD }] };
      const delen = [...tekenArm(st.b.VF, PALF, true), ...tekenBeen(st.b.AF, PALF, true), romp, nek, ...tekenBeen(st.b.AN, PAL, false)];
      const armN = tekenArm(st.b.VN, PAL, false);
      if (st.armVoorKop) delen.push(kop, oor, ...armN); else delen.push(...armN, kop, oor);
      tekenDelen(ctx, delen, rand); if (st.zit) ctx.restore();
      if (st.na) st.na(ctx, PAL, s);
      if (o.skelet) { ctx.lineWidth = 2 / s; const L = (pts, c) => { ctx.strokeStyle = c; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
        L([F.R, F.mid, F.nekB, F.kopJ], '#FFEB3B'); for (const k of ['VN', 'VF']) { const b = st.b[k]; L([b.S, b.E, b.Wp, b.Kn], k === 'VF' ? '#4FC3F7' : '#FF5252'); }
        for (const k of ['AN', 'AF']) { const b = st.b[k]; L([b.H, b.K, b.Ak, b.Bp], k === 'AF' ? '#4FC3F7' : '#FF5252'); } }
      ctx.restore(); return st; }
    return { teken, stand, fk, D, PAL };
  }
  return { reptiel, aap, kurve, hermite, cr, mixHex, hsh, fr, lin, sstep, buis, streep, spline, pieken, RAD };
})();
const REPT_KROK_DEF = {
  L: 400, anker: 200, NS: 200, NO: 300, sS: 112, sH: 222, jS: 0.12, jH: 0.28, verMix: 0.36, verKleur: '#20261E', neusRond: 0.9,
  // [s vanaf de snuit, bovenkant, onderkant, halve breedte] (cm boven de grond in de loophouding)
  // hoogtes 23 cm lager dan de plaat (Kamiel 23 okt: poten te lang); dij = 1/16 van 400 cm (Farlow e.a. 2005, alligators tot 427 cm: dij 236-263 mm); buik ±16 cm boven de grond
  prof: [[0, 56, 47, 6], [4, 60.5, 46.5, 8], [10, 59.5, 46, 8.5], [28, 62, 44, 10.5], [42, 66, 42, 13], [52, 69, 40.5, 15], [62, 67, 38.5, 16.5], [72, 69.5, 35.5, 17], [86, 72, 30, 17], [100, 74, 23, 21], [118, 75.5, 17.5, 26], [150, 76.5, 16, 29], [185, 77, 16.5, 29.5], [212, 75, 19, 27], [238, 70, 23.5, 21], [262, 63, 26.5, 16], [290, 53, 23, 13], [320, 39, 13, 10], [350, 25.9, 3.9, 7], [376, 18.8, 3.3, 4], [400, 12, 7.5, 0.8]],
  // rugkam: ronde osteodermen op de romp, driehoekige kam (naar achter hellend) op de staart
  kam(s) { if (s > 84 && s < 238) { const f = ((s - 84) / 9.2) % 1; return 2.6 * Math.pow(Math.sin(Math.PI * f), 0.7); }
    if (s >= 238 && s < 396) { const h = 7.5 - (s - 238) * 0.034, f = ((s - 238) / 10.5) % 1; return h * (f < 0.78 ? Math.pow(f / 0.78, 1.3) : (1 - f) / 0.22); } return 0; },
  staartLeg: null,
  PAL: { flank: '#7C7456', rug: '#5C5846', buik: '#B4A983', band: '#343A3D', schub: '#4A493C', schubL: '#958B66', poot: '#6E6A52', pootL: '#7A7459', pootD: '#5E5A46', klauw: '#2A2A22', kaak: '#B0A580', tand: '#ECE6CE', mond: '#2A2E1E' },
  poot: {
    V: { l: [20.5, 14, 7], dik: 4, hoger: 0, pool: [-0.55, -0.35, 1], w: [7.5, 5.4, 4.8, 4.6, 2.8], tenen: [[-55, 7], [-25, 9.5], [0, 10.5], [25, 9.5], [50, 7]], klauw: 2.4,
 },
    A: { l: [25, 19.5, 10], dik: 4.5, hoger: 2, pool: [0.55, -0.35, 1], w: [9.5, 6.4, 5.2, 4.9, 3.0], tenen: [[-32, 11], [-10, 13.5], [12, 14.5], [34, 12]], klauw: 2.8, vlies: 4,
 },
  },
  // walking trot met diagonale koppels (achter loopt 0,06 voor op zijn diagonale voorpoot); S = slaglengte per cyclus
  GANG: { S: 72, scap: 6, beta: { V: 0.68, A: 0.74 }, fase: { AN: 0, VF: 0.06, AF: 0.5, VN: 0.56 }, nx: { V: 6, A: 2 }, spread: { V: 33, A: 36 }, inw: { V: 6, A: 7 }, psi: { V: 32, A: 14 },
    lift: { V: 7, A: 8 }, hiel: { V: 38, A: 46 }, yaw: [11, 12, 16], kopVast: 0.35, staartGolf: 0.55, bob: 1.2, verDx: -6 },
  LIGGEN: { bodem: [[0, 3], [40, 1.5], [70, 0.5], [100, 0], [300, 0], [400, 0]], phi: (s) => (s > 220 ? -0.35 * Math.sin((s - 220) / 180 * Math.PI) : 0) - 0.04,
    voet: { V: [6, 38, 55, 0], A: [-18, 42, -30, 0] } },
};
REPT_KROK_DEF.lagen = (Z, P) => { const { M } = Z, L = []; const Ls = (a, b, n, fn) => { const o = []; for (let i = 0; i <= n; i++) o.push(fn(a + (b - a) * i / n)); return o; };
  // rug donker (bovenste 35 %), buik licht (onderste 30 %), onderkaak licht
  L.push({ c: P.rug, pts: Ls(60, 400, 60, s => M(s, 0.66 + 0.04 * Math.sin(s / 7))).concat([M(400, 2), M(60, 2)]) });
  L.push({ c: P.buik, pts: Ls(0, 392, 90, s => M(s, s < 64 ? 0.42 + 0.045 * Math.sin(s / 6.5) : (s < 100 ? _rcLin0(0.42, 0.33, (s - 64) / 36) : 0.33 - 0.08 * Math.max(0, (s - 240) / 150)))).concat([M(392, -1), M(-4, -1)]) });
  // benen platen (osteodermen) in rijen op rug en bovenflank: donkere afgeronde tegels, iets lichter naar de flank
  for (let r = 0; r < 4; r++) for (let s = 90 + (r % 2) * 4.6; s < 244; s += 9.2) { const f = [0.92, 0.81, 0.7, 0.59][r]; const Q = [M(s, f + 0.045), M(s + 7.2, f + 0.045), M(s + 7.2, f - 0.045), M(s, f - 0.045)];
    L.push({ c: r < 2 ? P.schub : _rcMix(P.schub, P.flank, 0.25 + r * 0.15), pts: _rcRondHoek(Q, 1.1) }); }
  // staart: donkere blokken boven, lichte blokken onder (geblokt als op de plaat), afwisselend
  for (let s = 246, i = 0; s < 394; s += 11.5, i++) { const w = 9 - (s - 246) * 0.02; if (i % 2 === 0) L.push({ c: P.band, pts: _rcRondHoek([M(s, 1.3), M(s + w, 1.3), M(s + w - 1, 0.5), M(s - 1, 0.5)], 1.2) });
    else L.push({ c: _rcMix(P.flank, P.schubL, 0.45), pts: _rcRondHoek([M(s, 0.5), M(s + w, 0.5), M(s + w - 1, 0.3), M(s - 1, 0.3)], 1.6) }); }
  // buikschubben: dwarse lijnen
  for (let s = 100; s < 238; s += 5.4) L.push({ lijn: 0.5, c: '#A09676', pts: [M(s, 0.02), M(s + 0.4, 0.28)] });
  return L; };
REPT_KROK_DEF.kopDetail = (ctx, Z, P, s) => { const { M } = Z; // (onderkaak licht = buiklaag)
  // kaaklijn (golvend), tanden die in elkaar grijpen, 4e ondertand steekt boven de bovenkaak uit
  const K = []; for (let i = 0; i <= 36; i++) { const ss = 1 + i * 2; K.push(M(ss, 0.42 + 0.045 * Math.sin(ss / 6.5) - (ss > 60 ? (ss - 60) * 0.004 : 0))); }
  ctx.strokeStyle = P.mond; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.fillStyle = P.tand; for (let i = 0; i < 15; i++) { const ss = 4 + i * 3.9; if (ss > 62) break; const f = 0.42 + 0.045 * Math.sin(ss / 6.5); const p = M(ss, f), up = i % 2 === 0; const h = up ? 2.4 : 2.2;
    ctx.beginPath(); ctx.moveTo(p[0] - 1.1, p[1]); ctx.lineTo(p[0], p[1] + (up ? -h : h)); ctx.lineTo(p[0] + 1.1, p[1]); ctx.closePath(); ctx.fill(); }
  { const p = M(13, 0.42 + 0.045 * Math.sin(2)); ctx.beginPath(); ctx.moveTo(p[0] - 1.6, p[1] + 1); ctx.lineTo(p[0] - 0.2, p[1] - 5.2); ctx.lineTo(p[0] + 1.4, p[1] + 1); ctx.closePath(); ctx.fill(); }
  // neusgat op de knobbel, oog op de oogknobbel (geelgroen, verticale spleet), oorklep erachter
  { const p = M(3, 0.95); ctx.fillStyle = P.mond; ctx.beginPath(); ctx.ellipse(p[0], p[1], 1.4, 0.9, 0, 0, 6.283); ctx.fill(); }
  { const p = M(51, 0.98); ctx.fillStyle = P.rug; ctx.beginPath(); ctx.ellipse(p[0], p[1] - 0.6, 6.4, 3.6, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#C8B030'; ctx.beginPath(); ctx.ellipse(p[0] + 0.6, p[1] - 0.6, 2.6, 2.1, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#0A0C08'; ctx.beginPath(); ctx.ellipse(p[0] + 0.7, p[1] - 0.6, 0.5, 1.9, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(p[0] + 1.6, p[1] - 1.6, 0.55, 0, 6.283); ctx.fill();
    ctx.strokeStyle = P.schub; ctx.lineWidth = 0.9; ctx.beginPath(); const a = M(44, 0.86), b = M(52, 0.8), c = M(60, 0.86); ctx.moveTo(...a); ctx.quadraticCurveTo(b[0], b[1] + 1.5, c[0], c[1]); ctx.stroke(); }
  { const p = M(64, 0.8); ctx.fillStyle = P.schub; ctx.beginPath(); ctx.ellipse(p[0], p[1], 3.2, 1.2, -0.15, 0, 6.283); ctx.fill(); } };
function _rcLin0(a, b, u) { u = Math.max(0, Math.min(1, u)); return a + (b - a) * u; }
function _rcMix(a, b, k) { return PopRC.mixHex(a, k, b); }
function _rcH(n) { return PopRC.hsh(n); }
function _rcRond(c, r) { const o = []; for (let i = 0; i < 10; i++) o.push([c[0] + Math.cos(i / 10 * 6.283) * r, c[1] + Math.sin(i / 10 * 6.283) * r * 0.8]); return o; }
function _rcRondHoek(P, r) { // vierhoek met afgeronde hoeken
  const o = []; const n = P.length; for (let i = 0; i < n; i++) { const a = P[(i - 1 + n) % n], b = P[i], c = P[(i + 1) % n]; const l1 = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, l2 = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1;
    const k1 = Math.min(r / l1, 0.45), k2 = Math.min(r / l2, 0.45); o.push([b[0] + (a[0] - b[0]) * k1, b[1] + (a[1] - b[1]) * k1], b, [b[0] + (c[0] - b[0]) * k2, b[1] + (c[1] - b[1]) * k2]); }
  return PopRC.spline(o.map((p, i) => (i % 3 === 1 ? p : [p[0], p[1], 1]))); }
const REPT_HAG_DEF = {
  L: 20, anker: 7.2, NS: 160, NO: 260, sS: 3.0, sH: 7.7, jS: 0.28, jH: 0.32, verMix: 0.36, verKleur: '#1E2A1C', neusRond: 1.1,
  prof: [[0, 2.14, 1.98, 0.12], [0.3, 2.42, 1.86, 0.3], [0.7, 2.6, 1.76, 0.43], [1.2, 2.68, 1.66, 0.52], [1.85, 2.62, 1.45, 0.56], [2.4, 2.48, 1.3, 0.5], [3.0, 2.4, 1.08, 0.6],
    [4.2, 2.32, 0.92, 0.74], [5.6, 2.34, 0.88, 0.78], [6.9, 2.36, 0.98, 0.72], [7.7, 2.28, 1.1, 0.58], [8.1, 2.06, 1.22, 0.46], [9.2, 1.86, 1.2, 0.4], [11, 1.5, 0.98, 0.3],
    [14, 0.98, 0.6, 0.19], [17, 0.56, 0.3, 0.1], [20, 0.2, 0.12, 0.02]],
  PAL: { flank: '#7E9A44', rug: '#8C6E46', rugD: '#6E5434', vlek: '#3A2C1C', oogvlek: '#E6DFC2', buik: '#D6D29C', groenD: '#5C7630', groenL: '#A2BC66', poot: '#78923E', pootL: '#86A04A', pootD: '#68822F', klauw: '#2A2618', kop: '#7A8C42', mond: '#2E2A1A', ring: '#6A7E36' },
  poot: {
    V: { l: [1.2, 1.05, 0.38], dik: 0.1, pool: [-0.5, -0.75, 1], w: [0.3, 0.2, 0.15, 0.13, 0.055], tenen: [[-60, 0.32], [-28, 0.5], [0, 0.6], [28, 0.55], [62, 0.34]], klauw: 0.08 },
    A: { l: [1.45, 1.3, 0.55], dik: 0.11, pool: [0.45, -0.8, 1], w: [0.38, 0.24, 0.17, 0.15, 0.06], tenen: [[-42, 0.35], [-20, 0.6], [0, 0.85], [16, 1.15], [70, 0.55]], klauw: 0.08 },
  },
  GANG: { S: 5.2, scap: 0.25, beta: { V: 0.6, A: 0.62 }, fase: { AN: 0, VF: 0.02, AF: 0.5, VN: 0.52 }, nx: { V: 0.05, A: 0.1 }, spread: { V: 1.6, A: 1.95 }, inw: { V: 0.35, A: 0.4 }, psi: { V: 40, A: 22 },
    lift: { V: 0.62, A: 0.7 }, hiel: { V: 42, A: 55 }, yaw: [24, 26, 30], kopVast: 0.25, staartGolf: 0.7, bob: 0.06, verDx: 0.2 },
  LIGGEN: { bodem: [[0, 0.55], [1.2, 0.3], [2.4, 0.06], [3, 0], [12, 0], [20, 0]], phi: (s) => (s > 7.7 ? 0.5 * Math.sin((s - 7.7) / 12.3 * Math.PI * 1.2) : 0) + (s < 3 ? 0.12 * (3 - s) / 3 : 0),
    voet: { V: [0.3, 2.0, 70, 0], A: [-0.6, 2.4, -20, 0] } },
};
REPT_HAG_DEF.lagen = (Z, P) => { const { M } = Z, L = []; const Ls = (a, b, n, fn) => { const o = []; for (let i = 0; i <= n; i++) o.push(fn(a + (b - a) * i / n)); return o; };
  // groene flank met lichte stippen; bruine rugband (paarkleed-man: groene flanken), oogvlekken in twee rijen; lichte buik; staart: bruin met vage ringen
  L.push({ c: P.buik, pts: Ls(0.2, 19.5, 50, s => M(s, s < 1.7 ? 0.36 - 0.06 * Math.pow(s / 1.65, 2) : (s < 2.6 ? _rcLin0(0.3, 0.2, (s - 1.7) / 0.9) : (s < 8.2 ? 0.2 : 0.22 - 0.08 * (s - 8.2) / 11)))).concat([M(19.5, -1), M(0.2, -1)]) });
  for (let i = 0; i < 70; i++) { const s = 2.6 + _rcH(i * 1.7) * 5.4, f = 0.32 + _rcH(i * 2.9) * 0.38, p = M(s, f); L.push({ c: i % 3 ? P.groenD : P.groenL, pts: _rcRond(p, 0.05 + _rcH(i * 4.1) * 0.035) }); }
  L.push({ c: P.rug, pts: Ls(1.5, 20, 80, s => M(s, s < 2.6 ? _rcLin0(1.02, 0.7, (s - 1.5) / 1.1) : (s < 8 ? 0.7 - 0.03 * Math.sin(s * 3.1) : _rcLin0(0.7, 0.18, (s - 8) / 5)))).concat([M(20.5, 2), M(1.5, 2)]) });
  L.push({ c: P.rugD, pts: Ls(2.0, 12, 50, s => M(s, s < 2.8 ? _rcLin0(1.02, 0.86, (s - 2.0) / 0.8) : (s < 8 ? 0.86 : _rcLin0(0.86, 0.5, (s - 8) / 4)))).concat([M(12.5, 2), M(2.0, 2)]) });
  for (const [f, d] of [[0.79, 0], [0.92, 0.25]]) for (let s = 2.4 + d; s < 9.4; s += 0.5) { const p = M(s, f + 0.02 * Math.sin(s * 5)); L.push({ c: P.vlek, pts: _rcRond(p, 0.085) }); L.push({ c: P.oogvlek, pts: _rcRond(p, 0.03) }); }
  for (let s = 8.8; s < 19.6; s += 0.62) L.push({ c: P.rugD, pts: [M(s, 1.2), M(s + 0.2, 1.2), M(s + 0.16, 0.45), M(s - 0.04, 0.45)] });
  return L; };
REPT_HAG_DEF.kopDetail = (ctx, Z, P, s) => { const { M } = Z;
  const K = []; for (let i = 0; i <= 16; i++) { const ss = 0.05 + i * 0.1; K.push(M(ss, 0.36 - 0.06 * Math.pow(ss / 1.65, 2))); }
  ctx.strokeStyle = P.mond; ctx.lineWidth = 0.05; ctx.lineCap = 'round'; ctx.beginPath(); K.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  { const p = M(0.12, 0.62); ctx.fillStyle = P.mond; ctx.beginPath(); ctx.arc(p[0], p[1], 0.03, 0, 6.283); ctx.fill(); }
  { const p = M(0.98, 0.62); ctx.save(); ctx.translate(p[0], p[1]); const k = s; ctx.scale(1 / k, 1 / k); if (typeof dierOog === 'function') dierOog(ctx, 0, 0, Math.max(1.3, 0.15 * k), '#6A4A1A', { rand: '#D8D0A0' }); ctx.restore(); }
  { const p = M(1.86, 0.5); ctx.fillStyle = PopRC.mixHex(P.flank, 0.45, '#1A1A10'); ctx.beginPath(); ctx.ellipse(p[0], p[1], 0.07, 0.11, 0, 0, 6.283); ctx.fill(); }
};
const VogelPop = (() => {
  const RAD = Math.PI / 180, EPS = 14 * RAD; // eps = camera iets boven het dier: verre vleugel valt niet samen met de nabije
  const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (v, k) => [v[0] * k, v[1] * k];
  const dir = (a) => [Math.cos(a), Math.sin(a)], ang = (v) => Math.atan2(v[1], v[0]), len = (v) => Math.hypot(v[0], v[1]);
  const L = (a, b, u) => a + (b - a) * u, LP = (p, q, u) => [L(p[0], q[0], u), L(p[1], q[1], u)];
  const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  const fr = (u) => u - Math.floor(u);
  const mix = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const DK = (c, k = 0.25) => mix(c, k, '#000000'), LT = (c, k = 0.25) => mix(c, k, '#FFFFFF');
  const VER = (c) => mix(c, 0.3, '#2E2B29'); // verre delen: warm donker (wolfles 6)
  const RIM = (c) => mix(c, 0.3, '#F2EEE6');
  // sleutelkromme [[u, waarde], ...] met smoothstep
  const kurve = (K, u) => { u = Math.max(0, Math.min(1, u)); let i = 0; while (i < K.length - 2 && K[i + 1][0] < u) i++; const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * ss((u - u0) / Math.max(1e-6, u1 - u0)); };
  const hermite = (a, b, m0, m1, u) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * a + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * b + (u3 - u2) * m1; };

  // ---------- vormen ----------
  function crs(P, st = 1.2) { // gesloten Catmull-Rom; punt met 3e waarde 1 = scherpe hoek
    const n = P.length, out = []; const T = P.map((p, i) => { if (p[2]) return [0, 0]; const a = P[(i - 1 + n) % n], b = P[(i + 1) % n]; return [(b[0] - a[0]) * 0.5, (b[1] - a[1]) * 0.5]; });
    for (let i = 0; i < n; i++) { const a = P[i], b = P[(i + 1) % n], ta = T[i], tb = T[(i + 1) % n]; const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = 0; s < m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  function cro(P, st = 1.2) { const n = P.length, out = [];
    for (let i = 0; i < n - 1; i++) { const a = P[i], b = P[i + 1], p0 = P[Math.max(0, i - 1)], p3 = P[Math.min(n - 1, i + 2)]; const ta = mul(sub(b, p0), 0.5), tb = mul(sub(p3, a), 0.5); const m = Math.max(2, Math.ceil(len(sub(b, a)) / st));
      for (let s = (i ? 1 : 0); s <= m; s++) out.push([hermite(a[0], b[0], ta[0], tb[0], s / m), hermite(a[1], b[1], ta[1], tb[1], s / m)]); }
    return out; }
  // buis langs een (open) middellijn P met breedtes W per controlepunt (boven/onder apart mogelijk: Wo)
  function buis(P, W, Wo = W, st = 1.0) { const C = cro(P, st); const cum = [0]; for (let i = 1; i < C.length; i++) cum.push(cum[i - 1] + len(sub(C[i], C[i - 1])));
    const ck = [0]; for (let i = 1; i < P.length; i++) ck.push(ck[i - 1] + len(sub(P[i], P[i - 1]))); const tot = cum[cum.length - 1] || 1, totk = ck[ck.length - 1] || 1;
    const wAt = (Wv, s) => { if (Wv.length !== P.length) { const u = s / tot * (Wv.length - 1), i = Math.min(Wv.length - 2, Math.floor(u)); return L(Wv[i], Wv[i + 1], u - i); }
      const u = s / tot * totk; let i = 0; while (i < ck.length - 2 && ck[i + 1] < u) i++; return L(Wv[i], Wv[i + 1], Math.max(0, Math.min(1, (u - ck[i]) / Math.max(1e-6, ck[i + 1] - ck[i])))); };
    const A = [], B = []; for (let i = 0; i < C.length; i++) { const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)]; const d = sub(b, a), l = len(d) || 1, n = [d[1] / l, -d[0] / l];
      A.push(add(C[i], mul(n, wAt(Wo, cum[i]) / 2))); B.push(sub(C[i], mul(n, wAt(W, cum[i]) / 2))); }
    return { pts: A.concat(B.reverse()), boven: A, onder: B, mid: C }; }
  const tf = (o, a, j = [0, 0]) => (v) => add(o, rot(sub(v, j), a)); // lokaal -> wereld

  // ---------- tekenen: lijst van delen ----------
  // deel = { b: basisvorm, c: vulkleur, l: [{p, c} | {lijn, c, w}], r: false (geen rand), o: omtreklijn [kleur, breedte], na(ctx) }
  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  function render(ctx, D, rw) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const d of D) if (d.r !== false && d.b) { pad(ctx, d.b); ctx.strokeStyle = d.rk || RIM(d.c); ctx.lineWidth = rw * 2; ctx.stroke(); }
    for (const d of D) { if (d.vooraf) d.vooraf(ctx); if (!d.b) { if (d.na) d.na(ctx); continue; }
      pad(ctx, d.b); ctx.fillStyle = d.c; ctx.fill();
      if (d.l && d.l.length) { ctx.save(); pad(ctx, d.b); ctx.clip(); for (const l of d.l) { if (!l) continue;
          if (l.lijn) { ctx.beginPath(); l.lijn.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = l.c; ctx.lineWidth = l.w; ctx.stroke(); }
          else if (l.fn) l.fn(ctx); else { pad(ctx, l.p); ctx.fillStyle = l.c; ctx.fill(); } } ctx.restore(); }
      if (d.o) { pad(ctx, d.b); ctx.strokeStyle = d.o[0]; ctx.lineWidth = d.o[1]; ctx.stroke(); }
      if (d.na) d.na(ctx); } }

  // ---------- poot ----------
  function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al; return { knie: add(p0, mul(dir(a1), l1)), rek }; }
  // tenen: polylijnen (wereld) met breedtes. P = poot-spec, v = voet-pose
  function tenen(P, v) { const F = v.F, T = P.teen, H = P.hal, tw = P.tw, uit = [];
    const boog = (C, r, a0, a1, n = 8) => { const out = []; for (let i = 0; i <= n; i++) { const a = L(a0, a1, i / n); out.push(add(C, mul(dir(a), r))); } return out; };
    if (v.modus === 'tak') { const C = v.C, r = len(sub(F, C)), a0 = ang(sub(F, C));
      const vr = Math.min(1.7, T / r), hr = Math.min(1.35, H / r);
      uit.push({ p: boog(C, r, a0, a0 + vr * 0.92), w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 }); // buitenteen (iets verder)
      uit.push({ p: boog(C, r, a0, a0 + vr), w: [tw * 0.85, tw * 0.62], klauw: 1 }); // middenteen
      uit.push({ p: boog(C, r, a0 + 0.05, a0 - hr), w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else if (v.modus === 'schors') { const a = v.ta || 0; // tenen gespreid tegen de schors
      for (const [da, l, k] of [[-1.15, T, 1], [-0.75, T * 0.8, 1], [1.9, H, -1]]) { const d = dir(a + da); uit.push({ p: [F, add(F, mul(d, l * 0.55)), add(F, add(mul(d, l), mul(dir(a + da + k * 0.6), l * 0.1)))], w: [tw * 0.8, tw * 0.55], klauw: k }); } }
    else if (v.modus === 'vlucht' || v.modus === 'zwaai') { const a = v.ta, k = v.modus === 'vlucht' ? 1 : 0.6, T = P.teen * (v.modus === 'vlucht' ? 0.6 : 0.85), H = P.hal * (v.modus === 'vlucht' ? 0.6 : 0.85); // tenen gekruld (vlucht) of halfgevouwen (zwaaifase lopen)
      const d = dir(a); const C = add(F, mul(dir(a + 1.4), T * 0.22 * k + 0.5));
      uit.push({ p: [F, add(F, mul(dir(a + 0.5), T * 0.45)), add(F, mul(dir(a + 1.2), T * (0.75 - 0.25 * k)))], w: [tw * 0.8, tw * 0.55], klauw: 1, tint: 0.12 });
      uit.push({ p: [F, add(F, mul(dir(a + 0.25), T * 0.55)), add(F, mul(dir(a + 0.9), T * (0.95 - 0.3 * k)))], w: [tw * 0.85, tw * 0.6], klauw: 1 });
      uit.push({ p: [F, add(F, mul(dir(a + 3.0), H * 0.5)), add(F, mul(dir(a + 2.5), H * 0.8))], w: [tw * 0.8, tw * 0.55], klauw: -1 }); }
    else { const y = F[1] + tw * 0.15; // grond: plat, middenteen naar voren, buitenteen iets korter (naar de kijker), achterteen (hallux)
      uit.push({ p: [[F[0], y], [F[0] + T * 0.5, y + tw * 0.1], [F[0] + T * 0.8, y + tw * 0.15]], w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 });
      uit.push({ p: [[F[0], y], [F[0] + T * 0.55, y + tw * 0.15], [F[0] + T, y + tw * 0.2]], w: [tw * 0.85, tw * 0.62], klauw: 1 });
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.15], [F[0] - H, y + tw * 0.2]], w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    return uit; }
  // poot -> delen. heup (wereld), v = {F, ta, modus, C}, ver = verre poot
  function pootDelen(sp, heup, v, ver, kl) {
    const P = sp.poot, D = []; const hiel = sub(v.F, mul(dir(v.ta), P.tars)); const { knie, rek } = ik(heup, hiel, P.fem, P.tib, -1);
    const leg = ver ? VER(P.kl) : P.kl, legL = LT(leg, 0.14), dij = ver ? VER(kl.dij || sp.pal.buik) : (kl.dij || sp.pal.buik);
    // tibiotarsus: bevederd deel (dij/broek) en eventueel kaal onderste deel (reiger, pauw)
    const kaal = P.kaal || 0; const kD = LP(knie, hiel, P.kaal ? 1 - kaal : (P.dijTot ?? 0.55));
    if (kaal > 0) D.push({ b: buis([LP(knie, hiel, 0.5), hiel], [P.tw * 1.25, P.tw * 1.1]).pts, c: leg });
    const dijV = buis([LP(heup, knie, 0.4), knie, LP(knie, kD, 0.55), kD], [P.dij[0] * 0.8, P.dij[0], P.dij[0] * 0.8, P.dij[1]]).pts;
    const dijD = { b: dijV, c: dij };
    // tarsus met schubben (dwarsstreepjes aan de voorkant)
    const tv = buis([hiel, LP(hiel, v.F, 0.5), v.F], [P.tw * 1.2, P.tw, P.tw * 0.95]);
    const sch = []; for (let i = 1; i < 6; i++) { const q = LP(hiel, v.F, i / 6), n = rot(dir(v.ta), -Math.PI / 2); sch.push({ lijn: [add(q, mul(n, P.tw * 0.15)), add(q, mul(n, P.tw * 0.55))], c: DK(leg, 0.25), w: P.tw * 0.12 }); }
    const spoor = P.spoor ? (ctx) => { const q = LP(hiel, v.F, 0.62), n = rot(dir(v.ta), Math.PI / 2); const t = add(q, add(mul(n, P.tw * 1.4), mul(dir(v.ta), -P.tw * 0.5)));
      ctx.fillStyle = DK(leg, 0.2); ctx.beginPath(); ctx.moveTo(...add(q, mul(dir(v.ta), -P.tw * 0.5))); ctx.lineTo(...t); ctx.lineTo(...add(q, mul(dir(v.ta), P.tw * 0.5))); ctx.closePath(); ctx.fill(); } : null;
    D.push({ b: tv.pts, c: leg, l: [...sch, { lijn: [LP(hiel, v.F, 0.05), LP(hiel, v.F, 0.95)].map(q => add(q, mul(rot(dir(v.ta), Math.PI / 2), P.tw * 0.28))), c: legL, w: P.tw * 0.2 }], na: spoor });
    for (const t of tenen(P, v)) { const pp = buis(t.p, t.w); const c = t.tint ? DK(leg, t.tint) : leg; const e = t.p[t.p.length - 1], e2 = t.p[t.p.length - 2]; const a = ang(sub(e, e2));
      D.push({ b: pp.pts, c, na: (ctx) => { // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

  // ---------- vleugel ----------
  // a = langs de lichaamsas (vooruit +), b = langs de spanwijdte. Botten: beta = hoek vanaf +a richting +b.
  function veer(p, be, l, w, punt) { const d = dir(be), n = [-d[1], d[0]], A = [], B = [];
    for (let i = 0; i <= 10; i++) { const u = i / 10; let hw = w * (u < 0.2 ? 0.55 + 2.25 * u : 1); if (u > 0.55) hw *= punt ? Math.pow((1 - u) / 0.45, 0.75) * 0.95 + 0.05 : Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.55) / 0.45, 2.2)));
      const q = add(p, mul(d, u * l)); A.push(add(q, mul(n, hw))); B.push(sub(q, mul(n, hw * 0.62))); }
    return A.concat(B.reverse()); }
  function vleugelGeo(W, f, sweep = 0) {
    const bh = L(56, 170, f) * RAD, bu = L(78, 16, f) * RAD + sweep * 0.5, bm = L(90, 184, f) * RAD + sweep;
    const S = [0, 0], E = add(S, mul(dir(bh), W.hum)), Wr = add(E, mul(dir(bu), W.uln)), T = add(Wr, mul(dir(bm), W.man));
    const P = [], Sx = [], Tt = []; const nP = W.P.length, nS = W.S.length;
    for (let i = 0; i < nP; i++) { const q = i / (nP - 1); const be = bm + L(L(W.pw0 ?? -4, W.pw1 ?? 66, q), L(0, 6, q), f) * RAD; P.push({ p: LP(T, Wr, q * 0.92), be, l: W.P[i], w: W.P[i] * (W.pb ?? 0.13), punt: W.punt ?? 1 }); }
    for (let j = 0; j < nS; j++) { const q = j / (nS - 1); const be = L(L(166, 184, q), L(178, 182, q), f) * RAD; Sx.push({ p: LP(Wr, E, q * 0.95), be, l: W.S[j], w: W.S[j] * (W.sb ?? 0.24), punt: 0 }); }
    for (let k = 0; k < W.T.length; k++) { const be = L(186 + 5 * k, 183 + 3 * k, f) * RAD; Tt.push({ p: LP(E, S, 0.1 + 0.3 * k), be, l: W.T[k], w: W.T[k] * 0.24, punt: 0 }); }
    const dS = dir(L(176, 180, f) * RAD), dP = dir(bm + L(20, 3, f) * RAD), dT = dir(L(186, 182, f) * RAD);
    const M = LP(Wr, T, 0.55);
    const dek = [S, E, LP(E, Wr, 0.5), Wr, M, add(M, mul(dP, W.P[2] * 0.26)), add(Wr, mul(dS, W.S[0] * 0.42)), add(LP(E, Wr, 0.5), mul(dS, W.S[3] * 0.44)), add(E, mul(dS, W.S[nS - 1] * 0.46)), add(S, mul(dT, W.T[0] * 0.5))];
    const kleinDek = [S, E, LP(E, Wr, 0.5), Wr, LP(Wr, T, 0.3), add(LP(Wr, T, 0.3), mul(dP, W.P[2] * 0.1)), add(Wr, mul(dS, W.S[0] * 0.2)), add(E, mul(dS, W.S[nS - 1] * 0.2)), add(S, mul(dT, W.T[0] * 0.22))];
    return { S, E, Wr, T, P, Sx, Tt, dek, kleinDek, dS }; }
  // vleugel -> delen in wereld. sw = schouder (wereld), tb = romphoek, k = projectiefactor (sin(phi ± eps)), dorsaal = bovenkant zichtbaar
  function vleugelDelen(sp, sw, tb, phi, f, ver, sweep = 0) {
    const W = sp.vl, k = ver ? Math.sin(phi - EPS) : Math.sin(phi + EPS), dors = ver ? Math.sin(phi) > -0.05 : k < 0.05;
    const ax = dir(tb), up = [Math.sin(tb), -Math.cos(tb)], g = vleugelGeo(W, f, sweep);
    const pr = (q) => add(sw, add(mul(ax, q[0]), mul(up, q[1] * k * (W.bk ?? 1))));
    const pal = W.pal, cv = (c) => ver ? VER(c) : c;
    const veerC = dors ? pal.veer : pal.onder, zoom = dors ? pal.zoom : DK(pal.onder, 0.12), dek = dors ? pal.dek : LT(pal.onder, 0.1);
    const D = [];
    const veerDeel = (v, c, zc, extra) => { const pts = veer(v.p, v.be, v.l, v.w, v.punt).map(pr); const shaft = [v.p, add(v.p, mul(dir(v.be), v.l * 0.9))].map(pr);
      D.push({ b: pts, c: cv(c), o: [cv(zc), (W.lw ?? 0.9) * L(1, 0.7, f)], l: [f < 0.7 ? { lijn: shaft, c: cv(DK(c, 0.2)), w: (W.lw ?? 0.9) * 0.6 } : null, extra] }); };
    const P = g.P, S = g.Sx, T = g.Tt;
    const handC = pal.hand || veerC, armC = pal.arm || veerC;
    const tip = (v, c) => pal.punt ? { p: veer(add(v.p, mul(dir(v.be), v.l * 0.62)), v.be, v.l * 0.4, v.w, v.punt).map(pr), c: cv(c) } : null;
    if (dors) { for (const v of P) veerDeel(v, dors ? handC : veerC, zoom, tip(v, pal.punt)); for (const v of S) veerDeel(v, armC, zoom); for (const v of T) veerDeel(v, pal.tert || armC, zoom); }
    else { for (const v of [...T].reverse()) veerDeel(v, veerC, zoom); for (const v of [...S].reverse()) veerDeel(v, veerC, zoom); for (const v of [...P].reverse()) veerDeel(v, veerC, zoom); }
    const band = dors && pal.band ? { p: [g.Wr, g.E, add(g.E, mul(g.dS, W.S[W.S.length - 1] * 0.46)), add(g.Wr, mul(g.dS, W.S[0] * 0.42))].map(pr), c: cv(pal.band) } : null;
    const dekL = dors && pal.dekPatroon ? { fn: (ctx) => pal.dekPatroon(ctx, g, pr, ver) } : null;
    D.push({ b: crs(g.dek.map(pr), 1), c: cv(dek), l: [band, dors ? { p: crs(g.kleinDek.map(pr), 1), c: cv(pal.kleinDek || DK(dek, 0.08)) } : null, dekL] });
    return { D, g, pr, k, dors }; }

  // ---------- staart ----------
  function staartDelen(sp, basis, a, spreid, ver) { const S = sp.staart, n = S.n || 5, D = []; const cv = (c) => ver ? VER(c) : c;
    // pennen van achter (verst) naar voor; bij spreiden draaien ze iets uit elkaar
    for (let i = 0; i < n; i++) { const q = n > 1 ? i / (n - 1) : 0.5; const da = (q - 0.5) * spreid * 0.5 + (S.krom || 0) * (q - 0.5); const be = Math.PI + a + da;
      const l = S.L * (S.vork ? 1 + S.vork * Math.pow(Math.abs(q - 0.5) * 2, 3) : 1) * (S.rond ? 1 - 0.08 * Math.pow(Math.abs(q - 0.5) * 2, 2) : 1);
      const p = add(basis, mul(dir(be + Math.PI / 2), (q - 0.5) * S.wb * (0.18 + 0.5 * spreid)));
      const pts = veer(p, be, l, (S.vork ? S.wt * 0.38 : S.wt * 0.5) * (S.vork && Math.abs(q - 0.5) > 0.4 ? 0.6 : 1), S.vork ? 1 : 0);
      const wit = S.wit && (i === n - 1) ? { p: veer(add(p, mul(dir(be), l * 0.35)), be, l * 0.66, S.wt * 0.5, 0), c: cv(S.wit) } : null;
      D.push({ b: pts, c: cv(i === n - 1 ? S.kl : DK(S.kl, 0.1)), o: [cv(S.rand || LT(S.kl, 0.2)), (S.lw || 0.9) * 0.7], l: [{ lijn: [add(p, mul(dir(be), l * 0.1)), add(p, mul(dir(be), l * 0.9))], c: cv(DK(S.kl, 0.22)), w: (S.lw || 0.9) * 0.55 }, wit] }); }
    return D; }

  // ---------- nek (zachte buis tussen romp en kop) ----------
  function nekDelen(sp, P) { const N = sp.nek; const pts = P.nekPts; const nb = buis(pts, P.nekW || N.w, P.nekW || N.w);
    const lagen = []; if (N.voor) lagen.push({ p: nb.onder.concat([...nb.mid].reverse()), c: N.voor }); if (N.achter) lagen.push({ p: nb.boven.concat([...nb.mid].reverse()), c: N.achter });
    if (N.patroon) lagen.push({ fn: (ctx) => N.patroon(ctx, nb) });
    return [{ b: nb.pts, c: N.kl, l: lagen }]; }

  // ---------- het hele dier ----------
  function delen(sp, P, o = {}) {
    const D = [], Tb = tf(P.heup, P.tb), pal = sp.pal;
    const kopW = add(P.kop, [0, 0]), Tk = tf(kopW, P.tk);
    const vl = P.vl || {}; const vlieg = !!vl.vlieg;
    // romp
    const romp = { b: sp.romp.map(Tb), c: pal.basis, l: (sp.rompLagen || []).map(l => l.fn ? { fn: (ctx) => { ctx.save(); ctx.translate(...P.heup); ctx.rotate(P.tb); l.fn(ctx, P); ctx.restore(); } } : l.lijn ? { lijn: l.lijn.map(Tb), c: l.c, w: l.w } : { p: l.p.map(Tb), c: l.c }) };
    const poot = (zij) => { const v = P.poot[zij]; if (!v) return { D: [] }; return pootDelen(sp, Tb(sp.heupL || [0, 0]), v, zij === 'f', { dij: sp.dijKl }); };
    const pn = poot('n'), pf = poot('f');
    const vlD = (zij) => { const v = vl[zij]; if (!v) return { D: [] }; return vleugelDelen(sp, Tb(sp.vl.sch), P.tb, v.phi, v.f, zij === 'f', v.sweep || 0); };
    const staart = staartDelen(sp, Tb(sp.staart.aan), P.tb + (P.ts || 0), P.tsp || 0, false);
    const kop = { b: (sp.kop.Kc || (sp.kop.Kc = VogelPop.crs(sp.kop.K, 1))).map(Tk), c: sp.kop.kl, l: (sp.kop.lagen || []).map(l => l.lijn ? { lijn: l.lijn.map(Tk), c: l.c, w: l.w } : { p: l.p.map(Tk), c: l.c }),
      na: (ctx) => { ctx.save(); ctx.translate(...kopW); ctx.rotate(P.tk); sp.kop.na(ctx, o, P); ctx.restore(); } };
    // volgorde: verre poot, verre vleugel (vlucht), staart/sleep, nabije poot (vlucht: achter de buik), romp, nabije poot, nabije vleugel, nek, kop
    if (pf.dij) D.push(pf.dij); D.push(...pf.D);
    if (vl.f && vlieg) D.push(...vlD('f').D);
    if (sp.achter) D.push(...sp.achter(P, Tb, o));
    if (!sp.staartVoor) D.push(...staart);
    if (pn.dij) D.push(pn.dij);
    if (P.pootAchter) D.push(...pn.D);
    D.push(romp);
    if (sp.staartVoor) D.push(...staart);
    if (sp.rompNa) D.push(...sp.rompNa(P, Tb, o));
    if (!P.pootAchter) D.push(...pn.D);
    if (vl.n) D.push(...vlD('n').D);
    if (sp.vlNa) D.push(...sp.vlNa(P, Tb, o));
    D.push(...nekDelen(sp, P));
    D.push(kop);
    if (sp.kopNa) D.push(...sp.kopNa(P, Tk, o));
    return { D, pn, pf }; }

  function teken(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }

  return { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, mix, DK, LT, VER, RIM, kurve, hermite, crs, cro, buis, tf, pad, render, ik, tenen, pootDelen, veer, vleugelGeo, vleugelDelen, staartDelen, delen, teken };
})();
(function () {
  const V = VogelPop, { RAD, EPS, rot, add, sub, mul, dir, ang, len, L, LP, ss, fr, DK, LT, VER, RIM, crs, cro, buis, tf, render, vleugelDelen, staartDelen } = V;
  // ---------- poot ----------
  function ik(p0, t, l1, l2, teken) { const d = sub(t, p0); let dd = len(d); const rek = dd / (l1 + l2);
    dd = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, dd)); const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + dd * dd - l2 * l2) / (2 * l1 * dd))));
    const a1 = ang(d) + teken * al; return { knie: add(p0, mul(dir(a1), l1)), rek }; }
  // tenen: polylijnen (wereld) met breedtes. P = poot-spec, v = voet-pose
  function tenen(P, v) { const F = v.F, T = P.teen, H = P.hal, tw = P.tw, uit = [];
    const boog = (C, r, a0, a1, n = 8) => { const out = []; for (let i = 0; i <= n; i++) { const a = L(a0, a1, i / n); out.push(add(C, mul(dir(a), r))); } return out; };
    if (v.modus === 'tak') { const C = v.C, r = len(sub(F, C)), a0 = ang(sub(F, C));
      const vr = Math.min(1.7, T / r), hr = Math.min(1.35, H / r);
      uit.push({ p: boog(C, r, a0, a0 + vr * 0.92), w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 }); // buitenteen (iets verder)
      uit.push({ p: boog(C, r, a0, a0 + vr), w: [tw * 0.85, tw * 0.62], klauw: 1 }); // middenteen
      uit.push({ p: boog(C, r, a0 + 0.05, a0 - hr), w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else if (v.modus === 'schors') { const a = v.ta || 0; // tenen gespreid tegen de schors
      for (const [da, l, k] of [[-1.15, T, 1], [-0.75, T * 0.8, 1], [1.9, H, -1]]) { const d = dir(a + da); uit.push({ p: [F, add(F, mul(d, l * 0.55)), add(F, add(mul(d, l), mul(dir(a + da + k * 0.6), l * 0.1)))], w: [tw * 0.8, tw * 0.55], klauw: k }); } }
    else if (v.modus === 'vlucht' || v.modus === 'zwaai') { const a = v.ta, k = v.modus === 'vlucht' ? 1 : 0.6, T = P.teen * (v.modus === 'vlucht' ? 0.6 : 0.85), H = P.hal * (v.modus === 'vlucht' ? 0.6 : 0.85); // tenen gekruld (vlucht) of halfgevouwen (zwaaifase lopen)
      const d = dir(a); const C = add(F, mul(dir(a + 1.4), T * 0.22 * k + 0.5));
      uit.push({ p: [F, add(F, mul(dir(a + 0.5), T * 0.45)), add(F, mul(dir(a + 1.2), T * (0.75 - 0.25 * k)))], w: [tw * 0.8, tw * 0.55], klauw: 1, tint: 0.12 });
      uit.push({ p: [F, add(F, mul(dir(a + 0.25), T * 0.55)), add(F, mul(dir(a + 0.9), T * (0.95 - 0.3 * k)))], w: [tw * 0.85, tw * 0.6], klauw: 1 });
      uit.push({ p: [F, add(F, mul(dir(a + 3.0), H * 0.5)), add(F, mul(dir(a + 2.5), H * 0.8))], w: [tw * 0.8, tw * 0.55], klauw: -1 }); }
    else if (!P.vork) { const y = F[1] + tw * 0.15; // grond (zonder vork, ongewijzigd): plat, middenteen naar voren, buitenteen iets korter, achterteen
      uit.push({ p: [[F[0], y], [F[0] + T * 0.5, y + tw * 0.1], [F[0] + T * 0.8, y + tw * 0.15]], w: [tw * 0.8, tw * 0.6], klauw: 1, tint: 0.12 });
      uit.push({ p: [[F[0], y], [F[0] + T * 0.55, y + tw * 0.15], [F[0] + T, y + tw * 0.2]], w: [tw * 0.85, tw * 0.62], klauw: 1 });
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.15], [F[0] - H, y + tw * 0.2]], w: [tw * 0.85, tw * 0.6], klauw: -1 }); }
    else { const y = F[1] + tw * 0.15; // grond: drietand. Van opzij: middenteen recht naar voren, buitenteen schuin naar de kijker
      // (iets omlaag en korter door perspectief), binnenteen schuin weg (iets omhoog, donker), achterteen (hallux) naar achteren;
      // teengewrichten als kleine knobbels zodat de tenen ook op 80 px als vork lezen (Grant: anisodactyl, 3 voor + 1 achter).
      const vork = (da, l, kl, tint) => { const d = [Math.cos(da), Math.sin(da)]; return { p: [[F[0], y], [F[0] + d[0] * l * 0.5, y + d[1] * l * 0.5], [F[0] + d[0] * l, y + d[1] * l]], w: [tw * 0.85, tw * 0.45], klauw: kl, tint, knobbel: 1 }; };
      uit.push(vork(-0.5, T * 0.8, 1, 0.3));  // binnenteen (verste kant, half achter de middenteen)
      uit.push(vork(0.02, T, 1, 0));           // middenteen
      uit.push(vork(0.5, T * 0.72, 1, 0.1));   // buitenteen (naar de kijker)
      uit.push({ p: [[F[0] + tw * 0.3, y], [F[0] - H * 0.5, y + tw * 0.05], [F[0] - H, y + tw * 0.15]], w: [tw * 0.9, tw * 0.62], klauw: -1, knobbel: 1 }); }
    return uit; }
  // poot -> delen. heup (wereld), v = {F, ta, modus, C}, ver = verre poot
  function pootDelen(sp, heup, v, ver, kl) {
    const P = sp.poot, D = []; const hiel = sub(v.F, mul(dir(v.ta), P.tars)); const { knie, rek } = ik(heup, hiel, P.fem, P.tib, -1);
    const leg = ver ? VER(P.kl) : P.kl, legL = LT(leg, 0.14), dij = ver ? VER(kl.dij || sp.pal.buik) : (kl.dij || sp.pal.buik);
    // tibiotarsus: bevederd deel (dij/broek) en eventueel kaal onderste deel (reiger, pauw)
    const kaal = P.kaal || 0; const kD = LP(knie, hiel, P.kaal ? 1 - kaal : (P.dijTot ?? 0.55));
    if (kaal > 0) D.push({ b: buis([LP(knie, hiel, 0.5), hiel], [P.tw * 1.25, P.tw * 1.1]).pts, c: leg });
    const dijV = buis([LP(heup, knie, 0.4), knie, LP(knie, kD, 0.55), kD], [P.dij[0] * 0.8, P.dij[0], P.dij[0] * 0.8, P.dij[1]]).pts;
    const dijD = { b: dijV, c: dij };
    // tarsus met schubben (dwarsstreepjes aan de voorkant)
    const tv = buis([hiel, LP(hiel, v.F, 0.5), v.F], [P.tw * 1.2, P.tw, P.tw * 0.95]);
    const sch = []; for (let i = 1; i < 6; i++) { const q = LP(hiel, v.F, i / 6), n = rot(dir(v.ta), -Math.PI / 2); sch.push({ lijn: [add(q, mul(n, P.tw * 0.15)), add(q, mul(n, P.tw * 0.55))], c: DK(leg, 0.25), w: P.tw * 0.12 }); }
    const spoor = P.spoor ? (ctx) => { const q = LP(hiel, v.F, 0.62), n = rot(dir(v.ta), Math.PI / 2); const t = add(q, add(mul(n, P.tw * 1.4), mul(dir(v.ta), -P.tw * 0.5)));
      ctx.fillStyle = DK(leg, 0.2); ctx.beginPath(); ctx.moveTo(...add(q, mul(dir(v.ta), -P.tw * 0.5))); ctx.lineTo(...t); ctx.lineTo(...add(q, mul(dir(v.ta), P.tw * 0.5))); ctx.closePath(); ctx.fill(); } : null;
    D.push({ b: tv.pts, c: leg, l: [...sch, { lijn: [LP(hiel, v.F, 0.05), LP(hiel, v.F, 0.95)].map(q => add(q, mul(rot(dir(v.ta), Math.PI / 2), P.tw * 0.28))), c: legL, w: P.tw * 0.2 }], na: spoor });
    for (const t of tenen(P, v)) { const pp = buis(t.p, t.w); const c = t.tint ? DK(leg, t.tint) : leg; const e = t.p[t.p.length - 1], e2 = t.p[t.p.length - 2]; const a = ang(sub(e, e2));
      D.push({ b: pp.pts, c, na: (ctx) => { if (t.knobbel && P.tw >= 3) { ctx.fillStyle = LT(c, 0.1); for (const u of [0.45, 0.75]) { const q = t.p.length > 2 ? LP(t.p[1], t.p[2], (u - 0.5) * 2 > 0 ? (u - 0.5) * 2 : 0) : t.p[0]; ctx.beginPath(); ctx.arc(q[0], q[1], P.tw * 0.42, 0, 6.283); ctx.fill(); } } // klauw: gebogen haakje
        const l = P.tw * 0.95, k = t.klauw, w = P.tw * 0.3, n = [-Math.sin(a), Math.cos(a)]; const tip = [e[0] + Math.cos(a + k * 0.9) * l, e[1] + Math.sin(a + k * 0.9) * l];
        ctx.fillStyle = P.klauw || '#1E1A18'; ctx.beginPath(); ctx.moveTo(e[0] - n[0] * w * k * -1, e[1] - n[1] * w * k * -1); ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.8, e[1] + Math.sin(a) * l * 0.8, tip[0], tip[1]);
        ctx.quadraticCurveTo(e[0] + Math.cos(a) * l * 0.4 + n[0] * w * k, e[1] + Math.sin(a) * l * 0.4 + n[1] * w * k, e[0] + n[0] * w * k, e[1] + n[1] * w * k); ctx.closePath(); ctx.fill(); } }); }
    return { D, dij: dijD, hiel, knie, rek }; }

  // ---------- nek (zachte buis tussen romp en kop) ----------
  function nekDelen(sp, P) { const N = sp.nek; const pts = P.nekPts; const nb = buis(pts, P.nekW || N.w, P.nekW || N.w);
    const lagen = []; if (N.voor) lagen.push({ p: nb.onder.concat([...nb.mid].reverse()), c: N.voor }); if (N.achter) lagen.push({ p: nb.boven.concat([...nb.mid].reverse()), c: N.achter });
    if (N.patroon) lagen.push({ fn: (ctx) => N.patroon(ctx, nb) });
    return [{ b: nb.pts, c: N.kl, l: lagen }]; }

  // ---------- het hele dier ----------
  function delen(sp, P, o = {}) {
    const D = [], Tb = tf(P.heup, P.tb), pal = sp.pal;
    const kopW = add(P.kop, [0, 0]), Tk = tf(kopW, P.tk);
    const vl = P.vl || {}; const vlieg = !!vl.vlieg;
    // romp
    const romp = { b: sp.romp.map(Tb), c: pal.basis, l: (sp.rompLagen || []).map(l => l.fn ? { fn: (ctx) => { ctx.save(); ctx.translate(...P.heup); ctx.rotate(P.tb); l.fn(ctx, P); ctx.restore(); } } : l.lijn ? { lijn: l.lijn.map(Tb), c: l.c, w: l.w } : { p: l.p.map(Tb), c: l.c }) };
    const poot = (zij) => { const v = P.poot[zij]; if (!v) return { D: [] }; return pootDelen(sp, Tb(sp.heupL || [0, 0]), v, zij === 'f', { dij: sp.dijKl }); };
    const pn = poot('n'), pf = poot('f');
    const vlD = (zij) => { const v = vl[zij]; if (!v) return { D: [] }; return vleugelDelen(sp, Tb(sp.vl.sch), P.tb, v.phi, v.f, zij === 'f', v.sweep || 0); };
    const staart = staartDelen(sp, Tb(sp.staart.aan), P.tb + (P.ts || 0), P.tsp || 0, false);
    const kop = { b: (sp.kop.Kc || (sp.kop.Kc = VogelPop.crs(sp.kop.K, 1))).map(Tk), c: sp.kop.kl, l: (sp.kop.lagen || []).map(l => l.lijn ? { lijn: l.lijn.map(Tk), c: l.c, w: l.w } : { p: l.p.map(Tk), c: l.c }),
      na: (ctx) => { ctx.save(); ctx.translate(...kopW); ctx.rotate(P.tk); sp.kop.na(ctx, o, P); ctx.restore(); } };
    // volgorde: verre poot, verre vleugel (vlucht), staart/sleep, nabije poot (vlucht: achter de buik), romp, nabije poot, nabije vleugel, nek, kop
    if (pf.dij) D.push(pf.dij); D.push(...pf.D);
    if (vl.f && vlieg) D.push(...vlD('f').D);
    if (sp.achter) D.push(...sp.achter(P, Tb, o));
    if (!sp.staartVoor) D.push(...staart);
    if (pn.dij) D.push(pn.dij);
    if (P.pootAchter) D.push(...pn.D);
    D.push(romp);
    if (sp.staartVoor) D.push(...staart);
    if (sp.rompNa) D.push(...sp.rompNa(P, Tb, o));
    if (!P.pootAchter) D.push(...pn.D);
    if (vl.n) D.push(...vlD('n').D);
    if (sp.vlNa) D.push(...sp.vlNa(P, Tb, o));
    D.push(...nekDelen(sp, P));
    D.push(kop);
    if (sp.kopNa) D.push(...sp.kopNa(P, Tk, o));
    return { D, pn, pf }; }

  function tekenNieuw(ctx, sp, P, x, y, s, o = {}) { const D = delen(sp, P, o);
    ctx.save(); ctx.globalAlpha *= (o.a ?? 1); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); ctx.scale(s * (o.kijk || 1), s); if (P.dx) ctx.translate(P.dx, 0);
    render(ctx, D.D, sp.rw); ctx.restore(); return D; }
  V.tenen = tenen; V.pootDelen = pootDelen; V.delen = delen; V.teken = tekenNieuw;
})();
const ZW_DATA = {"ambulocetus":{"k":1.25,"ds":2.5,"grenzen":{},"vinnen":{},"punten":{"oog":[70.44,12.12],"neus":[2.2,5.85],"heup":[340.19,-16.23],"schouder":[141.8,-16.76]},"lijnen":{"mond":[[6.33,-6.07],[26.08,-4.2],[50.62,-6.21],[65.82,-7.99]]},"kleuren":{"rug":"#554E47","mid":"#675E53","buik":"#A79780","flank":"#786D60"},"X0":251.25,"Y0":-92.5,"rust":[0.0051,-0.19,-0.0518,0.0847,0.0433,0.0417,-0.0319,0.0486,0.0168,0.0876,0.3401,0.3698,0.1919,-0.0276],"poten":{"A":[[-87.5,-77.5],[-68.8,-45.0],[-96.2,-12.5],[-73.8,-2.5],[-42.5,0.0]],"V":[[112.5,-82.5],[97.5,-48.8],[106.2,-15.0],[112.5,-5.0],[125.0,0.0]]},"prof":[[0.0,4.2,5.0],[5.0,6.1,7.3],[10.0,8.5,11.4],[15.0,10.4,15.5],[20.0,12.1,18.1],[25.0,13.4,19.1],[30.0,14.4,19.4],[35.0,15.3,19.8],[40.0,16.1,20.1],[45.0,16.7,20.4],[50.0,17.3,20.7],[55.0,18.3,21.7],[60.0,20.1,23.3],[65.0,21.9,24.7],[70.0,23.1,25.9],[75.0,24.1,27.0],[80.0,25.2,27.8],[85.0,26.5,27.9],[90.0,27.8,27.7],[95.0,28.7,27.4],[100.0,29.2,27.2],[105.0,29.7,27.2],[110.0,30.3,27.6],[115.0,31.0,28.3],[120.0,32.0,29.0],[125.0,33.3,30.0],[130.0,34.8,31.2],[135.0,36.3,32.8],[140.0,37.9,35.5],[145.0,39.5,39.0],[150.0,41.1,41.7],[155.0,42.6,43.1],[160.0,43.9,43.8],[165.0,44.7,43.4],[170.0,45.0,41.6],[175.0,44.6,40.5],[180.0,43.7,41.3],[185.0,42.9,43.4],[190.0,42.4,45.6],[195.0,42.2,46.6],[200.0,42.1,46.6],[205.0,42.3,46.3],[210.0,42.6,45.9],[215.0,42.9,45.5],[220.0,43.4,45.4],[225.0,44.0,45.4],[230.0,44.2,45.5],[235.0,44.6,45.5],[240.0,44.9,45.3],[245.0,45.1,44.9],[250.0,45.3,44.5],[255.0,45.6,43.9],[260.0,45.6,43.2],[265.0,45.5,42.7],[270.0,45.2,43.1],[275.0,44.8,44.7],[280.0,44.4,46.0],[285.0,44.0,46.2],[290.0,43.6,46.0],[295.0,43.1,45.6],[300.0,42.2,44.9],[305.0,41.3,43.3],[310.0,40.4,40.8],[315.0,39.3,39.1],[320.0,38.2,39.1],[325.0,37.0,39.3],[330.0,35.6,38.7],[335.0,34.1,37.6],[340.0,32.8,36.6],[345.0,31.6,35.6],[350.0,30.2,34.5],[355.0,28.6,32.8],[360.0,27.1,29.3],[365.0,25.6,25.2],[370.0,24.2,22.6],[375.0,22.7,21.6],[380.0,21.6,20.9],[385.0,20.7,20.4],[390.0,19.8,20.0],[395.0,18.9,19.6],[400.0,18.2,19.2],[405.0,17.6,18.8],[410.0,17.4,18.5],[415.0,17.4,18.1],[420.0,17.1,17.6],[425.0,16.8,17.4],[430.0,16.6,17.1],[435.0,16.3,16.7],[440.0,15.8,16.3],[445.0,15.2,15.8],[450.0,14.9,15.3],[455.0,14.6,14.7],[460.0,14.1,14.2],[465.0,13.4,13.8],[470.0,12.8,13.2],[475.0,12.3,12.7],[480.0,11.7,12.0],[485.0,10.9,11.5],[490.0,9.9,10.8],[495.0,9.0,10.1],[500.0,8.2,9.4],[505.0,7.3,8.6],[510.0,6.5,7.5],[515.0,5.8,6.1],[520.0,5.0,4.6],[525.0,3.9,3.0],[530.0,2.4,1.4],[535.0,0.9,0.4],[537.5,0.5,0.2]]},"basilosaurus":{"k":0.787,"ds":1.574,"grenzen":{},"vinnen":{"borst":{"s":188.52,"d":-31.64,"lagen":[{"c":"mid","p":[[12.5,8.5],[9.4,8.1],[8.5,9.6],[1.4,8.9],[-2.7,10.0],[-6.6,9.6],[-12.2,10.6],[-29.6,10.3],[-30.6,11.7],[-28.2,12.0],[-27.5,12.9],[-31.1,17.2],[-32.8,17.8],[-33.0,19.4],[-39.3,26.6],[-40.6,31.2],[-39.1,32.2],[-31.2,32.3],[-16.4,27.5],[-5.5,21.6],[8.4,10.4],[12.3,10.8]]}]},"poot":{"s":724.71,"d":-21.3,"lagen":[{"c":"mid","p":[[10.0,-2.3],[-3.5,-3.0],[-2.3,-0.4],[-10.4,4.6],[-10.6,6.2],[-9.2,7.2],[-9.6,9.6],[-7.1,9.2],[-3.4,10.6],[-1.7,10.1],[-0.7,8.7],[1.0,8.2],[1.3,6.6],[3.2,4.5],[9.4,0.8]]}]},"staart":{"s":876.72,"d":3.01,"lagen":[{"c":"rug","p":[[-73.4,47.1],[-64.8,48.1],[-54.3,46.1],[-42.7,41.9],[-29.3,34.7],[-13.7,23.0],[-3.9,13.8],[1.0,12.0],[2.7,-2.9],[-5.8,-4.6],[-14.0,-9.5],[-15.5,-9.7],[-19.2,-12.5],[-20.8,-12.6],[-24.4,-15.4],[-47.1,-25.1],[-57.9,-27.1],[-58.6,-28.0],[-68.1,-28.3],[-68.3,-26.7],[-64.6,-23.9],[-59.9,-16.3],[-58.9,-11.4],[-57.5,-9.7],[-57.1,-6.4],[-55.7,-4.7],[-55.9,-3.1],[-54.0,1.0],[-49.8,6.3],[-46.8,7.4],[-45.4,9.1],[-48.7,10.3],[-53.9,14.5],[-56.0,19.0],[-58.7,21.9],[-65.1,36.2],[-69.7,42.0],[-71.3,42.6],[-73.2,44.8]]}]}},"punten":{"oog":[60.37,7.5],"neus":[30.2,10.15]},"lijnen":{"mond":[[1.48,-4.55],[21.24,-1.71],[40.6,-5.08],[56.39,-8.86]]},"kleuren":{"rug":"#464E58","mid":"#6E767E","buik":"#BEC0C2","tand":"#E6E2D2"},"prof":[[0.0,9.1,6.0],[3.1,10.6,10.6],[6.3,12.0,14.0],[9.4,13.1,15.3],[12.6,13.6,14.9],[15.7,14.2,14.5],[18.9,14.6,14.5],[22.0,14.8,14.7],[25.2,15.1,15.0],[28.3,15.4,15.3],[31.5,15.6,15.6],[34.6,15.8,15.9],[37.8,16.1,16.1],[40.9,16.3,16.5],[44.1,16.5,16.9],[47.2,17.2,17.2],[50.4,17.7,17.6],[53.5,18.2,18.0],[56.7,18.8,18.4],[59.8,18.9,18.8],[63.0,19.2,19.3],[66.1,19.7,19.7],[69.3,20.3,20.2],[72.4,21.1,20.8],[75.5,22.0,21.3],[78.7,22.7,21.8],[81.8,23.2,22.4],[85.0,23.9,23.0],[88.1,24.3,23.6],[91.3,24.7,24.2],[94.4,25.2,24.9],[97.6,25.8,25.6],[100.7,26.4,26.2],[103.9,27.1,26.9],[107.0,27.8,27.7],[110.2,28.4,28.4],[113.3,29.2,29.1],[116.5,30.0,29.9],[119.6,30.8,30.5],[122.8,31.5,31.2],[125.9,31.9,32.0],[129.1,32.5,32.5],[132.2,32.9,32.9],[135.4,33.4,33.5],[138.5,33.8,34.1],[141.7,34.2,34.5],[144.8,34.6,34.8],[148.0,35.0,35.4],[151.1,35.7,36.0],[154.2,36.6,36.5],[157.4,37.2,37.3],[160.6,37.6,37.9],[163.7,38.0,38.4],[166.8,38.6,38.9],[170.0,39.5,39.5],[173.1,39.9,40.1],[176.3,40.2,40.6],[179.4,40.5,41.1],[182.6,40.9,41.5],[185.7,41.1,41.8],[188.9,41.5,42.1],[192.0,41.8,42.4],[195.2,41.7,42.6],[198.3,41.7,42.8],[201.5,42.0,42.9],[204.6,42.2,43.0],[207.8,42.5,43.1],[210.9,42.6,43.2],[214.1,42.8,43.3],[217.2,43.0,43.4],[220.4,43.2,43.4],[223.5,43.4,43.4],[226.7,43.5,43.5],[229.8,43.4,43.5],[232.9,43.3,43.6],[236.1,43.5,43.6],[239.2,43.7,43.7],[242.4,43.9,44.0],[245.5,44.1,44.0],[248.7,44.3,44.1],[251.8,44.1,44.3],[255.0,44.0,44.1],[258.1,44.2,44.2],[261.3,44.4,44.4],[264.4,44.6,44.3],[267.6,44.5,44.2],[270.7,44.1,44.5],[273.9,44.2,44.6],[277.0,44.3,44.5],[280.2,44.4,44.4],[283.3,44.5,44.3],[286.5,44.5,44.3],[289.6,44.5,44.3],[292.8,44.4,44.3],[295.9,44.3,44.5],[299.1,44.3,44.5],[302.2,44.7,44.6],[305.4,44.8,44.7],[308.5,44.7,44.8],[311.6,44.6,44.5],[314.8,44.5,44.4],[317.9,44.3,44.5],[321.1,44.4,44.7],[324.2,44.7,44.6],[327.4,44.6,44.3],[330.5,44.5,44.3],[333.7,44.3,44.5],[336.8,44.2,44.4],[340.0,44.0,44.1],[343.1,44.1,44.2],[346.3,44.3,44.1],[349.4,44.2,43.9],[352.6,44.1,44.0],[355.7,43.9,44.1],[358.9,43.7,43.9],[362.0,43.8,43.8],[365.2,44.0,44.0],[368.3,43.9,43.7],[371.5,43.6,43.7],[374.6,43.4,43.4],[377.8,43.2,43.4],[380.9,43.0,43.1],[384.1,42.8,43.0],[387.2,43.0,42.8],[390.4,43.0,42.8],[393.5,42.8,42.8],[396.6,42.5,42.5],[399.8,42.4,42.4],[402.9,42.1,42.2],[406.1,41.9,42.2],[409.2,41.8,42.0],[412.4,42.0,41.8],[415.5,41.8,41.5],[418.7,41.5,41.3],[421.8,41.2,41.2],[425.0,41.0,41.0],[428.1,40.7,40.7],[431.3,40.5,40.5],[434.4,40.2,40.3],[437.6,40.1,40.3],[440.7,40.3,40.1],[443.9,40.1,39.8],[447.0,39.8,39.7],[450.2,39.5,39.5],[453.3,39.2,39.2],[456.5,39.0,39.0],[459.6,38.8,39.0],[462.8,38.5,38.6],[465.9,38.2,38.4],[469.1,38.2,38.1],[472.2,38.3,37.9],[475.4,38.0,37.7],[478.5,37.8,37.7],[481.6,37.4,37.4],[484.8,37.1,37.1],[487.9,36.9,36.9],[491.1,36.6,36.6],[494.2,36.4,36.5],[497.4,36.2,36.2],[500.5,35.9,35.9],[503.7,35.7,35.7],[506.8,35.4,35.4],[510.0,35.2,35.1],[513.1,34.9,34.9],[516.3,34.6,34.6],[519.4,34.4,34.4],[522.6,34.2,34.2],[525.7,34.0,34.0],[528.9,33.8,33.8],[532.0,33.6,33.5],[535.2,33.3,33.1],[538.3,32.7,32.8],[541.5,32.3,32.6],[544.6,32.2,32.2],[547.8,32.1,32.0],[550.9,31.7,31.7],[554.0,31.2,31.4],[557.2,31.0,31.1],[560.3,30.9,30.8],[563.5,30.6,30.4],[566.6,30.2,30.2],[569.8,30.1,29.8],[572.9,29.8,29.5],[576.1,29.4,29.5],[579.2,29.4,29.4],[582.4,29.0,29.1],[585.5,28.7,28.5],[588.7,28.4,28.4],[591.8,28.2,28.3],[595.0,27.9,28.1],[598.1,27.7,27.5],[601.3,27.4,27.1],[604.4,27.1,26.9],[607.6,26.8,26.7],[610.7,26.5,26.5],[613.9,26.2,26.2],[617.0,26.0,26.0],[620.2,25.7,25.7],[623.3,25.3,25.4],[626.5,25.1,25.1],[629.6,25.0,24.8],[632.8,24.8,24.7],[635.9,24.5,24.7],[639.0,24.2,24.4],[642.2,23.8,23.9],[645.3,23.6,23.5],[648.5,23.6,23.5],[651.6,23.4,23.3],[654.8,23.1,23.0],[657.9,22.9,22.9],[661.1,22.6,22.8],[664.2,22.4,22.7],[667.4,22.2,22.3],[670.5,22.2,22.2],[673.7,22.0,22.0],[676.8,22.0,21.7],[680.0,21.8,21.6],[683.1,21.5,21.3],[686.3,21.0,21.2],[689.4,20.7,20.9],[692.6,20.5,20.4],[695.7,20.2,20.3],[698.9,20.0,20.1],[702.0,19.8,19.8],[705.1,19.6,19.6],[708.3,19.4,19.4],[711.5,19.1,19.2],[714.6,18.9,19.0],[717.7,18.7,18.8],[720.9,18.5,18.6],[724.0,18.2,18.4],[727.2,18.1,18.3],[730.3,18.0,18.1],[733.5,17.7,17.9],[736.6,17.5,17.8],[739.8,17.4,17.6],[742.9,17.3,17.5],[746.1,17.2,17.3],[749.2,17.1,17.1],[752.4,16.8,17.0],[755.5,16.8,16.8],[758.7,16.8,16.7],[761.8,16.5,16.5],[765.0,16.4,16.3],[768.1,16.1,16.1],[771.3,15.8,15.9],[774.4,15.7,15.6],[777.6,15.4,15.4],[780.7,15.2,15.2],[783.9,14.9,14.9],[787.0,14.6,14.6],[790.1,14.4,14.4],[793.3,14.1,14.1],[796.4,13.8,13.8],[799.6,13.6,13.6],[802.7,13.2,13.4],[805.9,13.0,13.1],[809.0,12.7,12.4],[812.2,12.2,11.9],[815.3,11.7,11.6],[818.5,11.3,11.3],[821.6,11.0,11.1],[824.8,10.7,10.8],[827.9,10.4,10.4],[831.1,10.2,10.2],[834.2,9.9,9.8],[837.4,9.5,9.5],[840.5,9.3,9.2],[843.7,8.9,8.9],[846.8,8.6,8.6],[850.0,8.3,8.3],[853.1,7.9,7.9],[856.3,7.8,7.7],[859.4,7.7,7.5],[862.5,7.7,7.6],[865.7,7.5,7.4],[868.9,7.3,7.4],[872.0,7.2,7.7],[875.1,7.1,8.3],[876.7,7.2,8.5]]},"bultrug":{"k":2.3,"ds":4.6,"grenzen":{},"vinnen":{"rug":{"s":561.69,"d":72.79,"lagen":[{"c":"rug","p":[[-35.8,-2.8],[-35.5,1.8],[-33.2,1.6],[-25.8,10.4],[33.9,7.2],[36.0,4.8],[49.8,4.0],[49.5,-2.9],[10.3,-3.0],[7.9,-5.2],[-10.5,-4.2],[-12.9,-6.4],[-33.6,-5.3]]}]},"borst":{"s":309.67,"d":-43.94,"lagen":[{"c":"rugL","p":[[31.0,45.8],[10.7,41.9],[-6.4,45.6],[-29.4,43.5],[-32.1,45.4],[-45.7,42.8],[-48.4,44.6],[-96.2,37.8],[-99.8,44.1],[-90.8,45.8],[-88.9,48.5],[-161.7,147.0],[-161.1,156.5],[-155.2,162.3],[-150.7,163.2],[-135.8,159.0],[-131.3,159.8],[-115.6,151.1],[-112.5,147.1],[-105.7,148.3],[-99.9,142.4],[-99.0,137.9],[-93.7,134.3],[-84.2,133.7],[-82.0,122.5],[-76.6,118.8],[-70.3,122.4],[-72.5,133.7],[-70.6,136.3],[-57.1,138.9],[-49.4,135.7],[-32.9,122.5],[-27.9,121.1],[-15.8,107.0],[-15.0,102.5],[-4.2,95.2],[-2.9,88.4],[5.6,80.7],[12.7,68.0],[20.4,64.8],[22.1,55.8],[30.2,50.3]]},{"c":"wit","p":[[0.4,46.9],[-9.1,47.4],[-7.7,52.4],[-11.7,61.0],[-25.1,70.1],[-32.4,71.1],[-41.3,81.1],[-45.8,80.2],[-47.1,87.0],[-52.5,90.6],[-56.6,87.5],[-61.5,88.9],[-61.0,98.4],[-64.1,102.5],[-69.1,103.8],[-70.0,108.4],[-85.7,117.1],[-89.8,113.9],[-92.5,115.8],[-91.5,123.0],[-96.9,126.6],[-102.8,120.8],[-104.9,132.1],[-115.7,139.4],[-122.1,135.8],[-130.6,143.6],[-136.9,140.0],[-137.8,144.6],[-148.5,151.8],[-156.3,143.3],[-160.7,154.2],[-157.1,159.6],[-140.8,160.4],[-123.3,154.4],[-114.8,146.6],[-105.3,146.1],[-100.9,135.2],[-86.0,131.1],[-84.3,122.0],[-78.9,118.4],[-66.7,116.0],[-65.4,109.2],[-50.1,102.8],[-43.0,90.1],[-28.7,76.5],[-8.0,66.4],[-5.4,52.8]]}]},"staart":{"s":754.4,"d":-1.08,"lagen":[{"c":"rug","p":[[3.2,-7.7],[-53.2,3.6],[-55.0,6.3],[-83.9,14.5],[-85.7,17.2],[-94.7,19.0],[-96.5,21.7],[-105.5,23.5],[-118.2,30.7],[-117.3,35.2],[-99.2,31.6],[-58.2,37.5],[-60.9,47.4],[-59.5,54.1],[-56.8,56.0],[-58.6,58.6],[-54.1,81.2],[-55.9,83.9],[-55.9,107.4],[-60.9,117.7],[-60.0,122.2],[-48.7,120.0],[-32.5,107.4],[-18.9,92.9],[-2.7,68.6],[10.8,30.7]]}]}},"punten":{"oog":[192.84,7.83]},"lijnen":{"mond":[[2.74,1.76],[72.54,-8.89],[144.73,-7.88],[188.65,-8.22]]},"kleuren":{"rug":"#39495D","rugL":"#4C5D72","wit":"#CFD0D3","witD":"#B1B5BB","mid":"#828B98"},"prof":[[0.0,7.3,0.6],[9.2,17.6,7.5],[18.4,22.5,21.0],[27.6,25.6,26.6],[36.8,27.7,29.4],[46.0,29.4,29.9],[55.2,31.5,30.5],[64.4,34.1,32.8],[73.6,34.9,35.0],[82.8,37.2,37.0],[92.0,39.5,39.5],[101.2,41.2,41.5],[110.4,45.8,43.9],[119.6,48.5,47.5],[128.8,50.7,51.5],[138.0,55.0,55.0],[147.2,59.6,60.0],[156.4,64.0,63.9],[165.6,67.3,67.0],[174.8,70.5,69.9],[184.0,73.1,71.7],[193.2,75.4,73.6],[202.4,77.8,76.2],[211.6,80.0,77.9],[220.8,82.0,80.5],[230.0,83.7,82.7],[239.2,85.3,84.8],[248.4,87.0,86.7],[257.6,87.8,88.3],[266.8,89.2,89.7],[276.0,90.5,90.9],[285.2,90.9,92.0],[294.4,92.2,92.8],[303.6,92.6,93.5],[312.8,93.1,94.0],[322.0,93.3,94.3],[331.2,93.2,94.5],[340.4,93.3,94.5],[349.6,93.5,94.4],[358.8,93.2,94.1],[368.0,93.0,93.7],[377.2,92.6,93.2],[386.4,92.4,92.5],[395.6,91.5,91.8],[404.8,90.5,90.9],[414.0,89.9,90.0],[423.2,88.9,89.0],[432.4,88.3,87.8],[441.6,87.0,86.6],[450.8,86.1,85.4],[460.0,84.7,84.1],[469.2,83.7,83.5],[478.4,82.0,82.9],[487.6,81.0,81.7],[496.8,80.3,79.9],[506.0,79.0,78.5],[515.2,77.2,77.4],[524.4,75.3,75.7],[533.6,73.1,73.7],[542.8,70.7,71.7],[552.0,68.2,69.6],[561.2,65.5,67.5],[570.4,62.8,65.0],[579.6,60.0,62.3],[588.8,57.1,59.3],[598.0,54.3,56.6],[607.2,51.4,53.4],[616.4,48.6,46.1],[625.6,45.9,38.0],[634.8,43.3,42.9],[644.0,40.9,44.5],[653.2,38.9,40.1],[662.4,36.4,35.9],[671.6,34.1,33.2],[680.8,31.1,31.6],[690.0,28.4,28.4],[699.2,26.2,25.1],[708.4,22.7,22.3],[717.6,20.0,19.3],[726.8,18.2,14.3],[736.0,16.3,9.3],[745.2,13.8,16.7],[754.4,11.2,32.6]]},"dolfijn":{"k":1.36,"ds":2.72,"grenzen":{},"vinnen":{"rug":{"s":267.7,"d":62.28,"lagen":[{"c":"cape","p":[[-27.6,-33.5],[-27.7,-30.7],[-21.2,-23.6],[-16.2,-13.9],[-15.5,-0.2],[-20.0,9.1],[-27.1,15.6],[-38.2,20.5],[-38.3,21.9],[-23.4,22.6],[-21.9,21.3],[-17.9,21.5],[-5.4,18.0],[-0.0,18.2],[12.4,14.7],[19.2,15.0],[20.6,13.7],[27.4,14.1],[37.1,11.8],[53.4,12.5],[53.5,8.5],[49.5,8.3],[41.5,3.8],[23.3,-14.7],[11.5,-23.4],[-3.2,-30.9],[-7.2,-31.1],[-13.9,-34.2],[-24.8,-34.7]]}]},"borst":{"s":128.34,"d":-37.24,"lagen":[{"c":"flank","p":[[-68.7,48.5],[-66.0,49.9],[-49.7,48.3],[-25.3,38.4],[-7.8,23.2],[-5.2,17.8],[-2.5,15.0],[0.2,15.0],[0.2,12.2],[-48.8,12.9],[-48.8,15.6],[-44.7,16.9],[-47.3,23.8],[-51.3,29.2],[-68.8,45.8]]}]},"staart":{"s":470.56,"d":-7.48,"lagen":[{"c":"cape","p":[[14.6,-15.3],[-3.2,-11.1],[-6.8,-13.0],[-7.3,-14.9],[-30.7,-26.1],[-44.5,-29.1],[-56.7,-29.5],[-58.7,-25.9],[-51.5,-22.0],[-42.3,-7.7],[-37.5,-5.1],[-37.0,-3.2],[-40.3,2.7],[-40.2,16.7],[-46.1,27.5],[-42.5,29.4],[-34.6,29.1],[-21.6,25.4],[-8.0,17.4],[-2.2,9.7],[-0.3,9.1],[2.9,3.1],[4.8,2.6]]}]}},"punten":{"oog":[73.06,0.09],"blaas":[119.79,46.88],"mondhoek":[47.93,-14.0]},"lijnen":{"mond":[[1.31,0.36],[20.63,-0.59],[36.68,-5.95],[50.18,-10.42]]},"kleuren":{"cape":"#6B727D","flank":"#888E97","buik":"#C4C4C3","donker":"#525963","mid":"#767D87"},"prof":[[0.0,0.3,0.9],[5.4,3.0,6.5],[10.9,6.8,11.9],[16.3,9.0,13.1],[21.8,10.5,13.6],[27.2,11.9,14.8],[32.6,15.9,17.1],[38.1,19.4,20.9],[43.5,22.4,23.8],[49.0,25.1,26.4],[54.4,27.6,29.3],[59.8,30.1,31.2],[65.3,31.8,33.5],[70.7,32.7,35.8],[76.2,34.0,37.9],[81.6,35.9,39.7],[87.0,37.4,41.7],[92.5,38.8,43.4],[97.9,40.4,44.4],[103.4,42.2,45.5],[108.8,43.8,46.4],[114.2,45.8,48.0],[119.7,47.7,49.4],[125.1,48.9,50.1],[130.6,49.9,50.8],[136.0,50.7,51.4],[141.4,51.4,52.0],[146.9,52.0,52.5],[152.3,52.4,53.0],[157.8,52.8,53.4],[163.2,53.3,53.8],[168.6,53.7,54.1],[174.1,54.2,54.5],[179.5,54.4,54.7],[185.0,55.0,54.9],[190.4,54.9,55.1],[195.8,55.1,55.3],[201.3,55.7,55.4],[206.7,55.9,55.4],[212.2,56.0,55.5],[217.6,55.9,55.7],[223.0,55.7,55.6],[228.5,55.4,55.0],[233.9,55.0,54.2],[239.4,54.4,54.0],[244.8,53.8,53.5],[250.2,53.1,52.5],[255.7,52.3,52.1],[261.1,51.4,51.1],[266.6,50.5,50.3],[272.0,49.5,49.3],[277.4,48.4,48.1],[282.9,47.3,46.9],[288.3,46.2,45.8],[293.8,45.0,44.9],[299.2,43.8,43.7],[304.6,42.6,42.4],[310.1,41.4,41.0],[315.5,40.2,39.7],[321.0,39.0,38.7],[326.4,37.9,37.6],[331.8,36.7,36.2],[337.3,35.5,35.3],[342.7,34.0,34.2],[348.2,32.8,32.5],[353.6,31.9,31.4],[359.0,30.7,30.5],[364.5,30.1,30.1],[369.9,29.2,29.2],[375.4,27.9,27.9],[380.8,26.8,26.5],[386.2,25.6,25.6],[391.7,24.5,24.8],[397.1,23.8,23.5],[402.6,23.4,22.7],[408.0,22.7,21.6],[413.4,21.2,20.6],[418.9,20.1,19.6],[424.3,18.9,18.6],[429.8,17.5,17.4],[435.2,16.4,16.1],[440.6,15.1,15.0],[446.1,13.7,13.7],[451.5,12.6,12.1],[457.0,11.6,10.7],[462.4,10.0,9.5],[467.8,8.5,9.2],[470.6,8.0,9.4]]},"haai":{"k":1.3,"ds":2.6,"grenzen":{},"vinnen":{"rug1":{"s":230.59,"d":62.13,"lagen":[{"c":"rug","p":[[-12.2,-36.5],[-12.0,-15.7],[-10.8,-14.3],[-12.2,-13.1],[-12.7,-4.0],[-14.0,-2.8],[-15.9,7.5],[-17.3,10.0],[-20.0,11.2],[-20.1,13.8],[-26.9,17.3],[-32.4,23.5],[-19.4,24.2],[-6.2,21.1],[10.7,20.7],[12.1,19.5],[19.9,19.9],[21.2,18.7],[48.5,20.2],[48.6,17.6],[43.5,16.0],[23.0,-12.5],[9.5,-27.5],[5.6,-27.8],[4.5,-31.7],[-4.3,-37.4],[-10.8,-37.8]]},{"c":"zwart","p":[[-10.9,-35.2],[-10.8,-14.3],[-4.1,-17.9],[9.0,-18.5],[14.3,-20.8],[10.7,-26.2],[6.8,-26.4],[5.7,-30.4],[-3.1,-36.0],[-9.6,-36.4]]}]},"rug2":{"s":384.33,"d":25.94,"lagen":[{"c":"rug","p":[[-15.6,11.3],[-7.8,11.6],[9.5,4.7],[21.2,5.2],[21.2,3.9],[4.8,-7.3],[1.0,-7.5],[-0.4,-6.2],[-1.6,-7.6],[-1.5,-11.5],[-8.0,-11.8],[-7.5,5.2],[-15.5,10.0]]},{"c":"zwart","p":[[-6.7,-10.4],[-7.0,-5.2],[-5.7,-3.9],[-0.5,-4.9],[-0.2,-10.1]]}]},"borst":{"s":156.46,"d":-29.1,"lagen":[{"c":"mid","p":[[16.6,-9.7],[6.2,-9.3],[4.9,-8.0],[-5.4,-6.3],[-9.2,-3.6],[-26.0,0.9],[-33.6,5.1],[-33.4,12.8],[-34.6,14.2],[-38.5,14.3],[-38.4,19.5],[-30.6,19.3],[-29.2,20.5],[-29.0,27.0],[-33.6,42.8],[-43.4,62.6],[-43.2,67.8],[-31.6,63.5],[-16.4,51.3],[-12.6,49.9],[14.9,16.4],[21.4,16.2],[30.4,13.3],[31.5,9.3],[26.3,9.5],[25.0,8.2],[27.3,0.4]]},{"c":"zwart","p":[[-32.3,45.3],[-33.6,45.4],[-42.0,63.9],[-41.9,69.1],[-35.4,67.5],[-22.7,59.3],[-22.7,58.0],[-28.0,56.9],[-32.0,53.1]]},{"c":"zwart","p":[[31.7,13.2],[29.1,14.6],[16.1,15.1],[12.4,20.4],[16.2,17.6],[30.5,15.9]]}]},"buikvin":{"s":317.18,"d":-22.13,"lagen":[{"c":"mid","p":[[-28.6,2.8],[-28.6,6.7],[-22.0,13.1],[-20.7,18.3],[-18.1,20.9],[-15.4,27.4],[-8.9,27.4],[-3.8,24.7],[11.8,12.9],[19.6,14.2],[19.6,10.3],[13.1,10.3],[1.3,6.5],[-5.2,6.5],[-6.5,5.2],[-18.2,4.0],[-19.5,2.7]]}]},"aars":{"s":398.54,"d":-26.83,"lagen":[{"c":"mid","p":[[-16.6,-14.3],[-16.7,-11.8],[-5.8,-0.6],[-9.1,9.6],[-7.8,9.7],[-6.7,12.4],[-4.1,12.6],[2.8,7.8],[5.3,8.0],[11.0,1.9],[17.8,-2.8],[20.4,-2.7],[20.6,-5.3],[-2.5,-10.8],[-8.8,-13.8]]},{"c":"zwart","p":[[-6.1,4.6],[-7.9,11.0],[-6.6,11.1],[-5.5,13.8],[-0.2,12.8],[1.3,10.3],[-2.5,8.8],[-4.8,4.7]]}]},"staart":{"s":436.8,"d":5.1,"lagen":[{"c":"rug","p":[[-109.8,-72.0],[-109.9,-68.2],[-102.4,-58.8],[-95.0,-43.0],[-91.1,-42.9],[-87.1,-45.4],[-54.5,-5.5],[-39.5,17.1],[-41.3,35.2],[-51.1,59.7],[-53.8,63.5],[-53.9,66.1],[-50.0,66.2],[-36.8,57.5],[-34.0,51.0],[-30.1,52.5],[-26.0,46.1],[-20.7,42.3],[-19.3,38.5],[-15.3,36.0],[-15.3,33.4],[-11.3,30.9],[-11.2,28.3],[-7.2,25.8],[-7.2,23.2],[-3.2,20.7],[-0.5,16.9],[4.7,17.0],[5.3,-3.8],[0.1,-3.9],[-24.0,-24.1],[-59.7,-48.5],[-91.8,-66.3],[-105.9,-71.9]]},{"c":"zwart","p":[[-40.2,41.8],[-42.8,41.7],[-52.6,67.4],[-46.1,66.3],[-34.1,57.5],[-34.0,51.0],[-39.1,48.3]]},{"c":"zwart","p":[[-9.9,29.6],[-11.2,29.6],[-12.7,33.5],[-15.3,34.7],[-16.7,38.5],[-20.7,41.0],[-22.1,44.9],[-20.8,44.9],[-18.0,39.8],[-14.1,37.3],[-14.0,34.7],[-10.0,32.2]]},{"c":"licht","p":[[-83.2,-45.3],[-78.3,-37.3],[-73.2,-33.3],[-53.1,-8.0],[-36.8,14.6],[-35.8,22.4],[-37.1,23.6],[-38.9,41.8],[-36.5,47.1],[-31.4,51.1],[-19.3,38.5],[-7.1,21.9],[-0.4,15.6],[6.0,15.8],[6.3,8.0],[-23.6,7.1],[-30.0,4.3],[-75.6,-39.9]]}]}},"punten":{"oog":[43.07,2.82],"neus":[20.72,-4.54]},"lijnen":{"mond":[[42.1,-19.46],[52.45,-21.1],[63.09,-21.73]],"kieuw1":[[140.72,9.02],[137.43,-23.42]],"kieuw2":[[131.63,9.21],[128.3,-21.92]],"kieuw3":[[122.53,8.13],[119.18,-20.39]],"kieuw4":[[114.74,8.34],[111.42,-17.58]],"kieuw5":[[108.23,7.22],[104.92,-16.09]]},"kleuren":{"rug":"#636E78","mid":"#848B91","licht":"#A5A9AA","buik":"#CCCBC4","zwart":"#282E36"},"prof":[[0.0,2.6,1.7],[5.2,6.4,5.3],[10.4,9.2,8.9],[15.6,11.3,11.7],[20.8,13.0,13.7],[26.0,15.0,15.4],[31.2,17.0,16.6],[36.4,19.3,17.4],[41.6,21.6,19.6],[46.8,24.1,24.2],[52.0,26.0,26.4],[57.2,27.6,27.7],[62.4,29.1,29.1],[67.6,30.6,30.7],[72.8,31.9,31.6],[78.0,33.1,32.9],[83.2,34.2,34.4],[88.4,35.4,35.5],[93.6,36.5,36.6],[98.8,37.5,37.3],[104.0,38.2,38.2],[109.2,39.2,38.9],[114.4,40.0,40.2],[119.6,40.9,41.2],[124.8,41.9,41.6],[130.0,42.7,42.5],[135.2,43.4,43.5],[140.4,44.1,44.4],[145.6,44.6,45.1],[150.8,45.3,45.7],[156.0,45.6,46.2],[161.2,46.3,46.6],[166.4,46.5,46.9],[171.6,46.7,47.1],[176.8,47.2,47.2],[182.0,47.3,47.3],[187.2,47.5,47.3],[192.4,47.7,47.2],[197.6,47.7,47.0],[202.8,47.7,46.8],[208.0,47.5,46.6],[213.2,47.3,46.5],[218.4,46.9,46.4],[223.6,46.5,46.1],[228.8,46.1,45.8],[234.0,45.5,45.6],[239.2,44.9,45.2],[244.4,44.3,44.5],[249.6,43.6,43.5],[254.8,42.9,43.1],[260.0,42.2,42.4],[265.2,41.4,41.4],[270.4,40.7,40.6],[275.6,39.9,39.6],[280.8,38.9,38.9],[286.0,38.3,37.9],[291.2,37.4,37.3],[296.4,36.6,36.1],[301.6,35.8,34.9],[306.8,34.8,33.9],[312.0,34.0,32.8],[317.2,32.6,31.7],[322.4,31.5,30.6],[327.6,30.2,29.5],[332.8,28.9,28.4],[338.0,27.9,27.4],[343.2,26.6,26.6],[348.4,25.4,25.9],[353.6,24.2,25.5],[358.8,23.4,25.4],[364.0,23.7,24.9],[369.2,25.4,24.2],[374.4,25.8,24.0],[379.6,25.0,23.3],[384.8,23.6,22.2],[390.0,21.8,20.8],[395.2,19.8,19.4],[400.4,17.9,17.9],[405.6,16.0,16.4],[410.8,14.7,15.0],[416.0,13.9,13.9],[421.2,13.2,13.1],[426.4,12.6,12.3],[431.6,11.8,11.7],[436.8,11.2,11.5]]},"ichthyosaurus":{"k":1.72,"ds":3.44,"grenzen":{},"vinnen":{"rug":{"s":307.45,"d":74.89,"lagen":[{"c":"rug","p":[[-28.9,-45.1],[-28.8,-38.2],[-25.2,-28.0],[-24.8,-3.9],[-28.1,6.5],[-38.2,18.7],[-38.1,27.3],[-17.5,25.2],[-5.5,21.6],[10.0,21.3],[11.7,19.6],[56.4,18.9],[56.4,15.4],[47.7,13.9],[42.5,10.5],[28.5,-6.5],[2.3,-31.9],[-20.3,-45.3]]}]},"voor":{"s":187.82,"d":-28.91,"lagen":[{"c":"mid","p":[[9.8,18.3],[-2.2,19.1],[-3.8,20.9],[-12.4,21.5],[-14.0,23.3],[-31.0,26.2],[-32.6,28.0],[-44.6,28.8],[-44.3,33.9],[-40.9,33.7],[-38.9,37.0],[-40.5,38.9],[-39.9,49.2],[-41.5,51.0],[-42.0,68.3],[-48.9,94.6],[-46.9,99.6],[-38.4,97.3],[-15.6,76.9],[-14.2,71.6],[-6.3,60.8],[2.6,39.5],[5.0,23.8],[10.1,21.8]]}]},"achter":{"s":373.37,"d":-29.09,"lagen":[{"c":"mid","p":[[-50.4,54.8],[-43.5,55.1],[-20.7,43.9],[0.7,25.9],[4.4,19.1],[16.4,21.3],[16.6,16.2],[4.6,14.0],[1.3,10.4],[-10.7,8.2],[-15.7,4.5],[-27.6,2.3],[-34.4,-1.4],[-48.1,-1.9],[-48.3,1.5],[-32.9,5.6],[-27.9,9.2],[-35.2,19.2],[-39.2,32.9],[-50.3,51.4]]}]},"staart":{"s":481.6,"d":9.21,"lagen":[{"c":"rug","p":[[-69.6,-79.8],[-70.0,-76.3],[-60.5,-51.1],[-54.5,-24.6],[-55.2,-17.8],[-52.9,-7.2],[-53.9,3.1],[-52.4,5.0],[-53.3,13.6],[-55.1,15.1],[-56.2,25.4],[-58.1,26.9],[-61.2,40.4],[-72.4,65.2],[-86.6,86.2],[-87.0,89.6],[-83.6,90.0],[-70.9,84.4],[-50.3,69.2],[-50.0,65.8],[-42.2,57.9],[-38.6,56.5],[-38.3,53.1],[-15.3,31.3],[-6.2,27.0],[0.8,26.0],[3.8,-3.1],[-4.8,-4.0],[-11.3,-8.1],[-12.6,-11.7],[-23.6,-23.2],[-28.0,-30.5],[-27.6,-34.0],[-32.4,-37.9],[-32.1,-41.3],[-36.9,-45.3],[-45.7,-60.0],[-64.5,-79.2]]}]}},"punten":{"oog":[130.2,5.54],"neus":[97.77,11.91]},"lijnen":{"mond":[[0.0,-1.72],[61.78,-4.97],[111.85,-12.56],[132.34,-17.3]]},"kleuren":{"rug":"#3D4F64","mid":"#506378","flank":"#8A96A2","buik":"#AFB4B9","vlek":"#6C7C8C"},"prof":[[0.0,4.3,3.3],[6.9,4.9,4.5],[13.8,5.8,5.8],[20.6,6.7,6.4],[27.5,7.0,6.6],[34.4,7.9,7.9],[41.3,8.3,9.5],[48.2,9.3,9.4],[55.0,10.2,10.1],[61.9,11.1,10.8],[68.8,12.1,11.6],[75.7,12.9,12.9],[82.6,13.8,14.0],[89.4,14.7,15.6],[96.3,16.4,17.5],[103.2,18.9,19.5],[110.1,21.7,22.1],[117.0,25.1,24.9],[123.8,28.0,27.6],[130.7,30.5,30.4],[137.6,33.4,33.0],[144.5,36.9,36.4],[151.4,39.9,39.4],[158.2,41.9,42.3],[165.1,44.2,44.8],[172.0,46.8,46.9],[178.9,48.7,48.6],[185.8,50.4,50.3],[192.6,52.4,51.9],[199.5,54.1,53.5],[206.4,55.5,54.9],[213.3,56.9,56.3],[220.2,57.9,57.6],[227.0,58.8,58.7],[233.9,59.6,59.6],[240.8,60.6,60.4],[247.7,61.0,61.0],[254.6,61.2,61.3],[261.4,61.3,61.6],[268.3,61.2,61.9],[275.2,61.1,61.9],[282.1,60.9,61.8],[289.0,60.5,61.1],[295.8,60.1,60.6],[302.7,59.5,60.1],[309.6,58.8,59.0],[316.5,58.0,58.1],[323.4,57.1,57.0],[330.2,56.0,55.5],[337.1,54.8,54.2],[344.0,53.4,52.9],[350.9,51.9,51.0],[357.8,49.9,49.1],[364.6,47.6,47.3],[371.5,45.4,45.2],[378.4,42.5,42.9],[385.3,40.4,40.4],[392.2,37.9,37.9],[399.0,35.1,35.4],[405.9,33.4,32.9],[412.8,30.8,30.5],[419.7,28.0,28.3],[426.6,26.1,26.3],[433.4,24.2,24.5],[440.3,22.6,22.3],[447.2,20.6,20.1],[454.1,18.8,19.6],[461.0,16.8,18.0],[467.8,15.5,15.7],[474.7,14.8,14.9],[481.6,14.8,15.4]]},"pakicetus":{"k":1.2,"ds":2.4,"grenzen":{},"vinnen":{},"punten":{"oog":[52.62,7.97],"oor":[98.4,16.58],"neus":[3.0,1.57],"heup":[271.99,-10.93],"schouder":[158.37,-12.81]},"lijnen":{"mond":[[2.34,-4.52],[24.93,-10.37],[49.36,-10.99],[60.38,-10.1]]},"kleuren":{"rug":"#6A5A4A","flank":"#8A745C","buik":"#B8A68C","donker":"#3E352D"},"X0":235.2,"Y0":-106.8,"rust":[-0.2579,-0.2287,-0.2604,0.0256,0.325,0.2262,0.0647,-0.012,-0.009,0.0464,0.4086,0.5845,0.4329,0.2296],"poten":{"A":[[-31.2,-99.6],[-21.6,-67.2],[-39.6,-33.6],[-36.0,-8.4],[-24.0,0.0]],"V":[[85.2,-103.2],[75.6,-67.2],[81.6,-24.0],[82.8,-8.4],[93.6,0.0]]},"prof":[[0.0,2.9,9.3],[4.8,4.2,10.2],[9.6,6.0,11.3],[14.4,7.5,12.0],[19.2,8.7,12.6],[24.0,10.0,12.8],[28.8,11.4,12.8],[33.6,12.7,13.0],[38.4,14.1,13.4],[43.2,15.5,13.7],[48.0,16.9,14.0],[52.8,18.4,14.3],[57.6,20.0,14.6],[62.4,21.6,15.0],[67.2,22.6,15.5],[72.0,23.4,16.2],[76.8,24.5,17.0],[81.6,26.0,18.0],[86.4,27.7,19.1],[91.2,28.7,20.3],[96.0,28.8,21.6],[100.8,28.9,22.9],[105.6,28.9,24.2],[110.4,28.8,25.6],[115.2,28.4,26.9],[120.0,27.9,28.4],[124.8,27.5,30.2],[129.6,27.2,32.1],[134.4,27.4,33.7],[139.2,28.7,35.3],[144.0,30.2,38.2],[148.8,31.1,41.8],[153.6,31.2,43.3],[158.4,31.0,42.8],[163.2,31.1,41.8],[168.0,31.8,41.0],[172.8,33.0,40.3],[177.6,34.1,39.6],[182.4,35.1,38.9],[187.2,35.9,38.5],[192.0,36.4,38.4],[196.8,36.7,38.5],[201.6,37.2,38.5],[206.4,37.8,38.3],[211.2,37.8,37.9],[216.0,37.4,37.2],[220.8,37.0,36.8],[225.6,36.6,37.0],[230.4,36.0,37.4],[235.2,35.2,37.4],[240.0,34.3,37.1],[244.8,33.0,36.8],[249.6,31.8,36.5],[254.4,30.5,36.1],[259.2,28.8,35.4],[264.0,26.6,34.4],[268.8,24.2,33.3],[273.6,21.4,32.1],[278.4,18.7,30.8],[283.2,16.5,29.2],[288.0,14.9,26.3],[292.8,13.7,20.8],[297.6,12.8,14.9],[302.4,12.0,12.4],[307.2,11.4,12.0],[312.0,11.0,11.8],[316.8,10.6,11.4],[321.6,10.1,10.9],[326.4,9.5,10.7],[331.2,8.8,10.5],[336.0,8.1,10.3],[340.8,7.5,9.6],[345.6,7.0,8.8],[350.4,6.8,8.2],[355.2,6.8,7.7],[360.0,6.7,7.3],[364.8,6.5,6.8],[369.6,6.3,6.4],[374.4,6.0,6.0],[379.2,5.5,5.5],[384.0,5.2,5.2],[388.8,4.9,4.8],[393.6,4.5,4.3],[398.4,4.1,3.8],[403.2,3.5,3.2],[408.0,3.0,2.5],[412.8,2.7,1.8],[415.2,2.6,1.7]]},"rodhocetus":{"k":1.4,"ds":2.8,"grenzen":{},"vinnen":{},"punten":{"oog":[83.4,16.69],"oor":[121.49,15.91],"neus":[16.42,9.67],"heup":[428.21,-8.45],"schouder":[203.1,-22.92]},"lijnen":{"mond":[[3.96,-4.73],[33.53,-6.01],[68.99,-8.41],[96.59,-10.41]]},"kleuren":{"rug":"#544E4A","mid":"#68615C","buik":"#A09990","flank":"#787069"},"X0":310.8,"Y0":-26.6,"rust":[0.0337,-0.0144,0.1008,0.2636,0.1501,0.0271,0.0602,0.1249,0.1661,0.1748,0.3382,0.4313,0.273,0.2282],"poten":{"A":[[-112.0,25.2],[-93.8,44.8],[-112.0,61.6],[-128.8,92.4],[-142.8,112.0]],"V":[[114.8,16.8],[106.4,44.8],[114.8,68.6],[120.4,78.4],[131.6,84.0]]},"prof":[[0.0,10.7,10.7],[5.6,12.0,12.2],[11.2,13.7,13.9],[16.8,14.9,14.8],[22.4,15.7,15.6],[28.0,16.6,16.4],[33.6,17.5,17.3],[39.2,18.5,18.3],[44.8,19.3,19.3],[50.4,19.8,20.3],[56.0,20.6,21.1],[61.6,21.9,21.9],[67.2,23.5,22.8],[72.8,24.9,23.9],[78.4,26.0,25.4],[84.0,26.9,26.9],[89.6,27.7,28.5],[95.2,28.5,29.9],[100.8,29.4,31.0],[106.4,30.5,31.0],[112.0,31.6,28.1],[117.6,32.7,24.3],[123.2,34.0,26.4],[128.8,35.1,31.1],[134.4,35.8,33.3],[140.0,36.4,34.1],[145.6,36.9,35.1],[151.2,37.6,36.2],[156.8,38.1,37.2],[162.4,38.5,38.1],[168.0,39.3,38.9],[173.6,40.6,39.6],[179.2,42.0,40.3],[184.8,43.0,41.0],[190.4,43.8,41.8],[196.0,44.7,42.5],[201.6,45.8,43.3],[207.2,46.7,44.2],[212.8,47.5,45.2],[218.4,48.3,46.2],[224.0,49.2,47.2],[229.6,50.5,48.4],[235.2,51.5,49.3],[240.8,51.8,49.8],[246.4,51.4,50.2],[252.0,51.2,50.6],[257.6,51.2,50.7],[263.2,51.5,50.7],[268.8,51.9,50.7],[274.4,52.1,50.9],[280.0,52.2,51.2],[285.6,52.5,51.3],[291.2,52.4,51.1],[296.8,51.8,51.0],[302.4,51.4,51.0],[308.0,50.9,51.2],[313.6,50.4,51.1],[319.2,49.8,50.8],[324.8,49.4,50.5],[330.4,48.8,50.0],[336.0,48.1,49.5],[341.6,47.1,49.0],[347.2,46.2,48.3],[352.8,45.3,47.6],[358.4,44.7,46.8],[364.0,44.0,45.6],[369.6,42.7,44.3],[375.2,41.4,43.2],[380.8,40.3,42.4],[386.4,39.2,41.6],[392.0,38.3,40.7],[397.6,37.8,39.8],[403.2,37.4,38.8],[408.8,37.0,37.8],[414.4,36.8,37.0],[420.0,37.0,36.6],[425.6,36.8,36.1],[431.2,35.9,35.6],[436.8,34.9,35.2],[442.4,34.2,35.0],[448.0,33.7,34.4],[453.6,32.9,33.5],[459.2,31.9,32.8],[464.8,31.0,32.2],[470.4,30.1,31.5],[476.0,29.1,30.9],[481.6,28.0,30.3],[487.2,26.7,29.6],[492.8,25.4,28.8],[498.4,24.4,27.7],[504.0,23.2,26.5],[509.6,21.7,25.3],[515.2,20.2,24.0],[520.8,18.7,22.7],[526.4,17.2,21.1],[532.0,15.7,19.2],[537.6,14.3,17.3],[543.2,12.9,15.4],[548.8,11.6,13.5],[554.4,10.6,11.9],[560.0,10.0,10.7],[565.6,10.1,10.0],[571.2,10.4,9.8],[576.8,10.7,10.0],[582.4,10.8,10.1],[588.0,10.7,10.1],[593.6,10.5,9.9],[599.2,10.2,9.7],[604.8,9.8,9.6],[610.4,9.2,9.5],[616.0,8.4,9.2],[621.6,7.6,8.6],[627.2,6.8,7.7],[632.8,5.8,7.0],[638.4,4.7,6.3],[644.0,3.5,5.4],[649.6,2.4,4.4],[655.2,1.8,3.6]]}};
const ZwPop = (() => {
  const lerp = (a, b, u) => a + (b - a) * u, clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const sstep = (u) => { u = clamp(u, 0, 1); return u * u * (3 - 2 * u); };
  const TAU = Math.PI * 2, RAD = Math.PI / 180;
  const mixHex = (h, k, m) => { const a = parseInt(h.slice(1), 16), b = parseInt(m.slice(1), 16); const f = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [16, 8, 0].map(s => f(s).toString(16).padStart(2, '0')).join(''); };
  const RANDK = (c) => mixHex(c, 0.28, '#EEF2F4');
  // stuksgewijs lineaire kromme met zachte overgangen: K = [[u, waarde], ...]
  const kurve = (K, u) => { if (u <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) if (u <= K[i + 1][0]) { const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * sstep((u - u0) / Math.max(1e-6, u1 - u0)); } return K[K.length - 1][1]; };
  const kurveL = (K, u) => { if (u <= K[0][0]) return K[0][1]; for (let i = 0; i < K.length - 1; i++) if (u <= K[i + 1][0]) { const [u0, a0] = K[i], [u1, a1] = K[i + 1]; return a0 + (a1 - a0) * (u - u0) / Math.max(1e-6, u1 - u0); } return K[K.length - 1][1]; };

  function pad(ctx, P) { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); ctx.closePath(); }
  // gesloten Catmull-Rom, dicht bemonsterd (voor de vinnen: hoekige tracering -> vloeiend)
  function glad(P, st = 3) { const n = P.length, out = []; for (let i = 0; i < n; i++) { const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      for (let k = 0; k < st; k++) { const u = k / st, u2 = u * u, u3 = u2 * u; out.push([0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
        0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3)]); } } return out; }
  function gladOpen(P, st = 4) { const n = P.length, out = []; for (let i = 0; i < n - 1; i++) { const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(n - 1, i + 2)];
      for (let k = 0; k < st; k++) { const u = k / st, u2 = u * u, u3 = u2 * u; out.push([0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
        0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3)]); } } out.push(P[n - 1]); return out; }

  // ---------- lijf: profiel + ruggengraat ----------
  function prep(def) {
    if (def._p) return def._p; const D = def.data, P = D.prof, Ls = P[P.length - 1][0], n = def.nSeg || 12;
    const vin = {}; for (const k in D.vinnen) { const v = D.vinnen[k]; vin[k] = { s: v.s, d: v.d, lagen: v.lagen.map(L => ({ c: L.c, p: def.hoekig && def.hoekig.includes(k) ? L.p : glad(L.p, 2) })) }; }
    if (def.extraVin) Object.assign(vin, def.extraVin(Ls)); // bv. de horizontale staartvin van opzij (wig) of handmatige delen
    if (def.vinS) for (const k in def.vinS) if (vin[k]) vin[k].s = def.vinS[k] * Ls; // verplaatst aanhechtpunt (bron wint van de plaat)
    if (def.vinSchaal) for (const k in def.vinSchaal) if (vin[k]) { const [fx, fy] = def.vinSchaal[k]; vin[k].lagen.forEach(L => { L.p = L.p.map(([x, y]) => [x * fx, y * fy]); }); }
    return (def._p = { P, Ls, n, Lseg: Ls / n, vin });
  }
  const profAt = (P, s) => { if (s <= P[0][0]) return [P[0][1], P[0][2]]; let lo = 0, hi = P.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (P[m][0] < s) lo = m; else hi = m; }
    const u = (s - P[lo][0]) / Math.max(1e-6, P[hi][0] - P[lo][0]); return [lerp(P[lo][1], P[hi][1], u), lerp(P[lo][2], P[hi][2], u)]; };

  // keten: pitch[i] (rad, + = staartkant omlaag) en yaw[i] (rad, zijwaarts; alleen verkorting zichtbaar) per segment
  function keten(def, pr, pitch, yaw, anker) {
    const J = [[0, 0]]; for (let i = 0; i < pr.n; i++) { const c = Math.cos(yaw[i] || 0); J.push([J[i][0] - pr.Lseg * c * Math.cos(pitch[i] || 0), J[i][1] + pr.Lseg * Math.sin(pitch[i] || 0)]); }
    // verschuif zodat het ankerpunt (zwaartepunt, u = def.zw) op zijn rustplek blijft (+ eventuele deining)
    const B = { J, pr }; const q = frame(B, def.zw * pr.Ls).p;
    let q0 = [def.X0 - def.zw * pr.Ls, def.Y0 || 0];
    if (def.rust) { if (!def._rustQ) { const J0 = [[def.X0, def.Y0]]; for (let i = 0; i < pr.n; i++) J0.push([J0[i][0] - pr.Lseg * Math.cos(def.rust[i]), J0[i][1] + pr.Lseg * Math.sin(def.rust[i])]); def._rustQ = frame({ J: J0, pr }, def.zw * pr.Ls).p; } q0 = def._rustQ; }
    const dx = q0[0] - q[0] + (anker ? anker[0] : 0), dy = q0[1] - q[1] + (anker ? anker[1] : 0);
    for (const p of J) { p[0] += dx; p[1] += dy; } return B;
  }
  // punt + raaklijn op afstand s (Catmull-Rom door de gewrichten); t wijst naar de staart, n = rugzijde
  function frame(B, s) {
    const { J, pr } = B; const f = clamp(s / pr.Lseg, 0, pr.n - 1e-6), i = Math.floor(f), u = f - i;
    const g = (k) => k < 0 ? [2 * J[0][0] - J[1][0], 2 * J[0][1] - J[1][1]] : k > pr.n ? [2 * J[pr.n][0] - J[pr.n - 1][0], 2 * J[pr.n][1] - J[pr.n - 1][1]] : J[k];
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2), u2 = u * u, u3 = u2 * u;
    const P = [0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u3));
    const T = [0, 1].map(k => 0.5 * ((-p0[k] + p2[k]) + 2 * (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u + 3 * (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u2));
    let tl = Math.hypot(T[0], T[1]) || 1; const t = [T[0] / tl, T[1] / tl]; let sx = 1;
    if (s > pr.Ls) { const e = s - pr.Ls; P[0] += t[0] * e; P[1] += t[1] * e; }
    if (s < 0) { P[0] += t[0] * s; P[1] += t[1] * s; }
    return { p: P, t, n: [-t[1], t[0]] }; // t = (-1, 0) -> n = (0, -1): omhoog
  }
  const pt = (B, s, d) => { const F = frame(B, s); return [F.p[0] + F.n[0] * d, F.p[1] + F.n[1] * d]; };

  function omtrek(B) { const P = B.pr.P, T = [], O = []; for (const [s, b, o] of P) { const F = frame(B, s); T.push([F.p[0] + F.n[0] * b, F.p[1] + F.n[1] * b]); O.push([F.p[0] - F.n[0] * o, F.p[1] - F.n[1] * o]); } return T.concat(O.reverse()); }
  // toonband: van kromme 'van' (lijst [u, v], v = -1 buikrand .. 1 rugrand) naar 'tot' (kromme, of 'rug' / 'buik' = voorbij de rand)
  function band(B, b) {
    const P = B.pr.P, Ls = B.pr.Ls, u0 = b.van[0][0], u1 = b.van[b.van.length - 1][0], A = [], Z = [];
    const dAt = (K, u, prf) => { if (K === 'rug') return prf[0] * 1.3 + 4; if (K === 'buik') return -prf[1] * 1.3 - 4; const v = (b.lin ? kurveL : kurve)(K, u); return v >= 0 ? v * prf[0] : v * prf[1]; };
    const N = Math.max(8, Math.round((u1 - u0) * 90)); for (let i = 0; i <= N; i++) { const u = lerp(u0, u1, i / N), s = u * Ls, prf = profAt(P, s);
      let dv = dAt(b.van, u, prf); if (b.golf) dv += b.golf[0] * Math.sin(u * b.golf[1] + (b.golf[2] || 0)) + (b.golf[3] || 0) * Math.sin(u * b.golf[1] * 2.7 + 1.3);
      A.push(pt(B, s, dv)); Z.push(pt(B, s, dAt(b.tot, u, prf))); }
    if (b.open0) { const F = frame(B, u0 * Ls); A.unshift([A[0][0] - F.t[0] * 40, A[0][1] - F.t[1] * 40]); Z.unshift([Z[0][0] - F.t[0] * 40, Z[0][1] - F.t[1] * 40]); }
    if (b.open1) { const F = frame(B, u1 * Ls); A.push([A[A.length - 1][0] + F.t[0] * 60, A[A.length - 1][1] + F.t[1] * 60]); Z.push([Z[Z.length - 1][0] + F.t[0] * 60, Z[Z.length - 1][1] + F.t[1] * 60]); }
    return A.concat(Z.reverse());
  }
  // vin: lokale punten (x naar de snuit, y omlaag) op het anker (s, d), met eigen draaiing rho en verkorting sx
  function vinPts(B, v, P, o = {}) { const F = frame(B, v.s), a = [F.p[0] + F.n[0] * v.d, F.p[1] + F.n[1] * v.d], sx = o.sx ?? 1, sy = o.sy ?? 1, c = Math.cos(o.rho || 0), si = Math.sin(o.rho || 0), dx = o.dx || 0, dy = o.dy || 0, sh = o.shear || 0;
    return P.map(([x0, y0]) => { let x = x0 * c - y0 * si, y = x0 * si + y0 * c; x = x * sx + sh * y + dx; y = y * sy + dy; return [a[0] - F.t[0] * x - F.n[0] * y, a[1] - F.t[1] * x - F.n[1] * y]; }); }

  // ---------- tekenen ----------
  function tekenVin(ctx, B, def, naam, modus, o = {}) {
    const v = B.pr.vin[naam]; if (!v) return; const pal = o.pal || def.pal, L0 = v.lagen[0], basis = vinPts(B, v, L0.p, o), c0 = pal[o.c || def.vinKleur?.[naam] || L0.c] || L0.c;
    if (modus === 'rand') { pad(ctx, basis); ctx.strokeStyle = RANDK(c0); ctx.lineWidth = def.rand || 2; ctx.lineJoin = 'round'; ctx.stroke(); return; }
    pad(ctx, basis); ctx.fillStyle = c0; ctx.fill();
    ctx.save(); pad(ctx, basis); ctx.clip();
    for (let i = 1; i < v.lagen.length; i++) { const L = v.lagen[i]; if (def.zonderLaag && def.zonderLaag.includes(naam + ':' + L.c)) continue; pad(ctx, vinPts(B, v, L.p, o)); ctx.fillStyle = pal[L.c] || L.c; ctx.fill(); }
    const mr = def.vinRand && def.vinRand[naam]; // donkere achterrand: vin donker, verschoven kopie in vinkleur erover
    if (mr) { ctx.fillStyle = pal[mr.c]; ctx.fillRect(-9999, -9999, 19998, 19998); for (const L of v.lagen) { if (L !== L0 && !(mr.lagen || []).includes(L.c)) continue;
        pad(ctx, vinPts(B, v, L.p, Object.assign({}, o, { dx: (o.dx || 0) + mr.dx, dy: (o.dy || 0) + (mr.dy || 0) }))); ctx.fillStyle = L === L0 ? c0 : (pal[L.c] || L.c); ctx.fill(); } }
    if (o.extra) o.extra(ctx, basis);
    ctx.restore();
  }
  function tekenLijf(ctx, B, def, modus, R) {
    const O = omtrek(B), pal = def.pal;
    if (modus === 'rand') { pad(ctx, O); ctx.strokeStyle = RANDK(pal[def.lijfKleur]); ctx.lineWidth = def.rand || 2; ctx.lineJoin = 'round'; ctx.stroke(); return O; }
    pad(ctx, O); ctx.fillStyle = pal[def.lijfKleur]; ctx.fill();
    ctx.save(); pad(ctx, O); ctx.clip();
    for (const b of def.tonen || []) { pad(ctx, band(B, b)); ctx.fillStyle = pal[b.c] || b.c; ctx.fill(); }
    if (def.binnen) def.binnen(ctx, B, R);
    ctx.restore();
    return O;
  }
  return { prep, keten, frame, pt, omtrek, band, vinPts, tekenVin, tekenLijf, pad, glad, gladOpen, kurve, kurveL, mixHex, RANDK, profAt, lerp, clamp, sstep, TAU, RAD };
})();
const ZwSlag = (() => {
  const { kurve, TAU, clamp } = ZwPop;
  function rug(def, pr, o) {
    const G = (def.slagPer && def.slagPer[o.houding || def.standaard]) || def.slag, zw = (o.houding || 'zwemmen') !== 'recht' && !(o.rontgen > 0.01 && def.rontgenStil), ph = (o.t || 0) * G.f + (G.fase0 || 0);
    const n = pr.n, pitch = new Array(n).fill(0), yaw = new Array(n).fill(0), L = pr.Ls;
    const w = (u) => kurve(G.A, u) * L * Math.sin(TAU * (ph - u / G.lam));
    const wv = (u) => G.V ? kurve(G.V, u) * L * Math.sin(TAU * (2 * ph - u / G.lam) + (G.Vfase || 0)) : 0;
    for (let i = 0; i < n; i++) { const u0 = i / n, u1 = (i + 1) / n; const dz = zw ? (w(u1) - w(u0)) : 0, dv = zw ? (wv(u1) - wv(u0)) : 0;
      if (G.soort === 'zij') { yaw[i] = Math.atan2(dz, pr.Lseg); pitch[i] = Math.atan2(dv, pr.Lseg); } else { pitch[i] = Math.atan2(dz, pr.Lseg); } }
    if (def.rust) for (let i = 0; i < n; i++) pitch[i] += def.rust[i] || 0; // gebogen rusthouding (bv. kop omhoog)
    if (o.buig) for (let i = 0; i < n; i++) pitch[i] += o.buig * Math.sin(Math.PI * i / n) * (i / n - 0.5) * 2; // extra (bv. duik)
    // eindhoek van de staartvin: zij -> yaw van het laatste stuk, versterkt (de vin buigt verder door); op -> pitch leidt 90° op de golf
    const uE = 1, dE = zw ? (w(uE) - w(uE - 0.04)) / (0.04 * L) : 0, ga = Math.atan(dE);
    const vinYaw = G.soort === 'zij' ? ga * (G.vinVerst || 1.5) : 0;
    const vinPitch = G.soort === 'op' && zw ? (G.vinPitch || 0.45) * Math.cos(TAU * (ph - 1 / G.lam)) : 0;
    return { pitch, yaw, vinYaw, vinPitch, ph, zw };
  }
  return { rug };
})();
const ZW_DEF = {};
ZW_DEF.haai = { naam: 'haai', X0: 252, Y0: 0, zw: 0.42, nSeg: 12, rand: 2, lijfKleur: 'rug',
  pal: { rug: '#66717B', rugD: '#56616C', mid: '#868D93', licht: '#A9ADAE', buik: '#D6D8D6', zwart: '#262C33', far: '#4E5862' },
  slag: { soort: 'zij', f: 0.55, lam: 0.95, A: [[0, 0.016], [0.25, 0.004], [0.5, 0.02], [0.8, 0.06], [1, 0.085]], V: [[0, 0], [0.6, 0], [1, 0.006]], vinVerst: 1.6 },
  tonen: [{ c: 'mid', van: [[0, 0.1], [0.06, -0.1], [0.15, -0.22], [0.3, -0.3], [0.6, -0.28], [0.85, -0.2], [1, -0.1]], tot: 'buik', open1: true },
          { c: 'buik', van: [[0, -0.05], [0.06, -0.32], [0.15, -0.48], [0.3, -0.56], [0.6, -0.52], [0.85, -0.42], [1, -0.32]], tot: 'buik', open1: true }],
  zonderLaag: ['rug1:zwart', 'staart:zwart'],
  vinRand: { staart: { c: 'zwart', dx: 7, dy: -2, lagen: ['licht'] } },
  achter: [['borst', { ver: 1, rho: 0.10, dx: -8, dy: -3 }], ['rug2'], ['aars'], ['buikvin', { ver: 1, dx: -5, dy: -2 }], ['rug1'], ['staart'], ['buikvin']], voor: [['borst']],
  binnen(ctx, B, R) { const D = this.data, pal = this.pal;
    // kieuwspleten (5, licht gebogen), bek onderstandig, neusgat
    ctx.strokeStyle = ZwPop.mixHex(pal.rug, 0.35, '#1A2026'); ctx.lineWidth = 2.2; ctx.lineCap = 'round';
    for (const k of ['kieuw1', 'kieuw2', 'kieuw3', 'kieuw4', 'kieuw5']) { const L = D.lijnen[k].map(([s, d]) => ZwPop.pt(B, s, d)); const m = [(L[0][0] + L[1][0]) / 2 - 2.5, (L[0][1] + L[1][1]) / 2];
      ctx.beginPath(); ctx.moveTo(...L[0]); ctx.quadraticCurveTo(m[0], m[1], L[1][0], L[1][1]); ctx.stroke(); }
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#3A4048'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...M[0]); ctx.quadraticCurveTo(M[1][0], M[1][1] + 1.5, M[2][0], M[2][1]); ctx.stroke();
    const ns = ZwPop.pt(B, ...D.punten.neus); ctx.fillStyle = '#3A4048'; ctx.beginPath(); ctx.ellipse(ns[0], ns[1], 2.4, 1.2, 0.2, 0, 6.283); ctx.fill();
    const oe = ZwPop.pt(B, ...D.punten.oog); if (typeof dierOog === 'function') dierOog(ctx, oe[0], oe[1], 4.6, '#C8B45A', { rand: '#2C3238' }); },
  // röntgen: kraakbeen (geen botten): schedel, kaken, wervelkolom tot in de bovenlob, straalkraakbeen in de vinnen
  rontgen(ctx, B, R) { const K = '#B8C8C0', L = B.pr.Ls; ctx.strokeStyle = K; ctx.fillStyle = K; ctx.lineCap = 'round';
    const sk = [[8, 2], [40, 12], [80, 10], [92, 0], [80, -8], [40, -8], [10, -4]].map(([s, d]) => ZwPop.pt(B, s, d)); ctx.globalAlpha *= 0.9; ZwPop.pad(ctx, ZwPop.glad(sk, 3)); ctx.lineWidth = 2.5; ctx.stroke();
    const kk = [[44, -12], [60, -20], [78, -18], [86, -10]].map(([s, d]) => ZwPop.pt(B, s, d)); ctx.lineWidth = 4; ctx.beginPath(); kk.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke();
    const W = []; for (let s = 92; s <= L + 1; s += 6) W.push(ZwPop.pt(B, s, 3)); ctx.lineWidth = 4; ctx.beginPath(); W.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke();
    ctx.lineWidth = 2; for (let s = 100; s < L; s += 13) { const a = ZwPop.pt(B, s, 10), b = ZwPop.pt(B, s, -4); ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
    // wervelkolom in de bovenlob van de staartvin
    const v = B.pr.vin.staart; if (v) { const P = ZwPop.vinPts(B, v, [[0, 0], [-30, -24], [-60, -50], [-92, -78]], R.staartOpt); ctx.lineWidth = 3.5; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); }
    // straalkraakbeen in de borstvin
    const bv = B.pr.vin.borst; if (bv) { ctx.lineWidth = 2.4; for (let i = 0; i < 9; i++) { const f = i / 8; const P = ZwPop.vinPts(B, bv, [[-4 - f * 22, 4 + f * 2], [-24 - f * 30, 34 + f * 22]]); ctx.beginPath(); ctx.moveTo(...P[0]); ctx.lineTo(...P[1]); ctx.stroke(); }
      const P = ZwPop.vinPts(B, bv, [[6, -2], [-30, 6]]); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(...P[0]); ctx.lineTo(...P[1]); ctx.stroke(); } }
};
const ZwTeken = (() => {
  const Z = ZwPop;
  function opties(def, R, naam, extra = {}) { const o = Object.assign({}, extra); const G = def.slag;
    if (naam === 'staart') { if (G.soort === 'zij') { const c = Math.cos(R.vinYaw); o.sx = Math.max(0.28, Math.abs(c)); o.shear = (o.shear || 0) + 0.18 * Math.sin(R.vinYaw) * (def.staartShear ?? 1); } else o.rho = (o.rho || 0) + R.vinPitch; }
    else if (G.soort === 'zij' && R.yawAt) o.sx = Math.cos(R.yawAt(def._p.vin[naam].s));
    if (def.vinAnim && def.vinAnim[naam]) Object.assign(o, def.vinAnim[naam](R, o));
    if (o.ver) o.pal = def.palVer || (def.palVer = Object.fromEntries(Object.entries(def.pal).map(([k, c]) => [k, Z.mixHex(c, 0.3, '#1E2A3A')])));
    return o; }
  function teken(def, ctx, x, y, s, o = {}) {
    const { a = 1, kijk = 1, rot = 0, rontgen = 0 } = o; if (a <= 0.01) return; const pr = Z.prep(def);
    const R = ZwSlag.rug(def, pr, o); R.o = o; const B = Z.keten(def, pr, R.pitch, R.yaw, def.deining ? def.deining(R, o) : null);
    // yaw op s (voor de verkorting van vinnen)
    R.yawAt = (ss) => R.yaw[Math.max(0, Math.min(pr.n - 1, Math.floor(ss / pr.Lseg)))] || 0;
    R.staartOpt = opties(def, R, 'staart');
    _bd(ctx, x, y, s, kijk, a, rot); ctx.lineJoin = 'round';
    const r = 1 - rontgen * 0.75; ctx.save(); ctx.globalAlpha *= r;
    const lijst = (L) => L.map(([n, e]) => [n, opties(def, R, n, e || {})]);
    const A = lijst(def.achter || []), V = lijst(def.voor || []);
    if (def.voorTeken) def.voorTeken(ctx, B, R, 'achter');
    for (const [n, op] of A) Z.tekenVin(ctx, B, def, n, 'rand', op);
    Z.tekenLijf(ctx, B, def, 'rand', R);
    for (const [n, op] of V) Z.tekenVin(ctx, B, def, n, 'rand', op);
    for (const [n, op] of A) Z.tekenVin(ctx, B, def, n, 'vul', op);
    const O = Z.tekenLijf(ctx, B, def, 'vul', R);
    if (def.naLijf) def.naLijf(ctx, B, R);
    for (const [n, op] of V) Z.tekenVin(ctx, B, def, n, 'vul', op);
    if (def.voorTeken) def.voorTeken(ctx, B, R, 'voor');
    ctx.restore();
    if (rontgen > 0.01 && def.rontgen) { ctx.save(); ctx.globalAlpha *= rontgen; Z.pad(ctx, O); ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 2; ctx.stroke(); def.rontgen(ctx, B, R, o); ctx.restore(); }
    ctx.restore(); return { B, R };
  }
  return { teken, opties };
})();
for (const k in ZW_DEF) ZW_DEF[k].data = ZW_DATA[k];
haai = function (ctx, x, y, s = 1, o = {}) { return ZwTeken.teken(ZW_DEF.haai, ctx, x, y, s, o); };
function _zwFluke(c, th, Ls) { return { s: Ls, d: 0, lagen: [{ c: 'rug', p: ZwPop.glad([[8, -th * 0.55], [-c * 0.18, -th * 0.62], [-c * 0.55, -th * 0.42], [-c * 0.92, -th * 0.12], [-c, 0], [-c * 0.92, th * 0.14], [-c * 0.55, th * 0.42], [-c * 0.18, th * 0.6], [8, th * 0.55]], 3) }] }; }
function _zwArm(ctx, B, v, T, o, opt = {}) { const L = Math.hypot(T[0], T[1]), ux = T[0] / L, uy = T[1] / L, nx = -uy, ny = ux, at = (f, w = 0) => [ux * L * f + nx * w * L, uy * L * f + ny * w * L];
  const P = (q) => ZwPop.vinPts(B, v, [q], o)[0], dik = opt.dik || 1;
  const sch = P(at(0)), ell = P(at(0.24)), pol = P(at(0.44)); bot(ctx, ...sch, ...ell, 0.11 * L * dik, BOT.arm);
  bot(ctx, ...ell, ...P(at(0.44, -0.035)), 0.07 * L * dik, BOT.onder); bot(ctx, ...P(at(0.24, 0.03)), ...P(at(0.44, 0.04)), 0.065 * L * dik, BOT.onder);
  const vingers = opt.vingers || [[-0.07, 3], [-0.02, 6], [0.03, 5], [0.08, 3]];
  for (const [w, n] of vingers) { let a = at(0.48, w * 0.6); for (let k = 0; k < n; k++) { const f = 0.48 + (k + 1) * (0.47 / Math.max(...vingers.map(q => q[1]))) * 1.0, b = at(Math.min(0.97, f), w * (1 + k * 0.12));
      bot(ctx, ...P(a), ...P(b), Math.max(2, 0.045 * L * dik * (1 - k * 0.07)), BOT.hand, { kop: 1.1 }); a = b; } } }
function _zwSkelet(ctx, B, def, R, o) { const S = def.skel, L = B.pr.Ls, pt = (s, d) => ZwPop.pt(B, s * L, d * ZwPop.profAt(B.pr.P, s * L)[d >= 0 ? 0 : 1]);
  const kl = BOT.kaal, klR = BOT.kaalR;
  if (S.schedel) { ctx.save(); ZwPop.pad(ctx, ZwPop.glad(S.schedel.map(([s, d]) => pt(s, d)), 3)); ctx.fillStyle = kl; ctx.fill(); ctx.strokeStyle = klR; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  if (S.kaak) { ZwPop.pad(ctx, ZwPop.glad(S.kaak.map(([s, d]) => pt(s, d)), 3)); ctx.fillStyle = kl; ctx.fill(); }
  // wervels: blokjes langs de ruggengraat, kleiner naar de staart; doornuitsteeksels in het rompdeel
  const [w0, w1, nW] = S.wervels; for (let i = 0; i < nW; i++) { const u = w0 + (w1 - w0) * i / (nW - 1), F = ZwPop.frame(B, u * L), h = ZwPop.profAt(B.pr.P, u * L), sz = Math.max(3, (h[0] + h[1]) * 0.16 * (1 - 0.55 * (u - w0) / (w1 - w0)));
    const c = [F.p[0] + F.n[0] * (h[0] - h[1]) * 0.12, F.p[1] + F.n[1] * (h[0] - h[1]) * 0.12], a = Math.atan2(F.t[1], F.t[0]);
    ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(a); roundRect(ctx, -sz * 0.45, -sz * 0.55, sz * 0.9, sz * 1.1, sz * 0.2); ctx.fillStyle = kl; ctx.fill();
    if (u < S.doorn) { ctx.fillRect(-sz * 0.12, sz * 0.4, sz * 0.24, sz * 1.1); } ctx.restore(); }
  if (S.ribben) { const [r0, r1, n] = S.ribben; ctx.strokeStyle = kl; ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const u = r0 + (r1 - r0) * i / (n - 1), a = pt(u, 0.15), m = pt(u + 0.015, -0.45), b = pt(u + 0.035, -0.85);
      ctx.lineWidth = S.ribDik || 3; ctx.beginPath(); ctx.moveTo(...a); ctx.quadraticCurveTo(m[0], m[1], b[0], b[1]); ctx.stroke(); } }
  if (S.heup) { const hc = o.heup > 0.01 ? C.goud : kl, [s, d, l] = S.heup, a = pt(s, d), F = ZwPop.frame(B, s * L); const b = [a[0] - F.t[0] * -l * 0.9 + F.n[0] * -l * 0.25, a[1] - F.t[1] * -l * 0.9 + F.n[1] * -l * 0.25];
    bot(ctx, a[0], a[1], b[0], b[1], Math.max(4, l * 0.22), hc); bot(ctx, a[0] + 6, a[1] + 6, b[0] + 6, b[1] + 8, Math.max(3, l * 0.16), hc); }
  if (S.arm) { const v = B.pr.vin[S.arm.vin]; if (v) _zwArm(ctx, B, v, S.arm.T, ZwTeken.opties(def, R, S.arm.vin, S.arm.o || {}), S.arm); } }
ZW_DEF.dolfijn = { naam: 'dolfijn', X0: 250, Y0: 0, zw: 0.38, nSeg: 12, rand: 2, lijfKleur: 'flank',
  pal: { cape: '#646C77', flank: '#8A919A', buik: '#CFD1D2', donker: '#525A65', mid: '#767D88', rug: '#646C77' },
  slag: { soort: 'op', f: 1.0, lam: 1.15, A: [[0, 0.012], [0.3, 0.0], [0.55, 0.004], [0.78, 0.03], [1, 0.072]], vinPitch: 0.5 },
  extraVin: (Ls) => ({ fluke: _zwFluke(0.13 * Ls, 0.032 * Ls, Ls) }), vinS: {},
  tonen: [{ c: 'cape', van: [[0, 0.35], [0.06, 0.45], [0.12, 0.62], [0.2, 0.5], [0.35, 0.32], [0.5, 0.18], [0.65, 0.02], [0.8, -0.15], [1, -0.3]], tot: 'rug', open0: true, open1: true },
          { c: 'buik', van: [[0.0, -0.2], [0.07, -0.25], [0.12, -0.32], [0.22, -0.48], [0.42, -0.55], [0.58, -0.6], [0.68, -0.82], [0.74, -1.08]], tot: 'buik', open0: true }],
  achter: [['borst', { ver: 1, rho: 0.12, dx: 10, dy: -4 }], ['rug'], ['fluke']], voor: [['borst']],
  vinAnim: { borst: (R, o) => ({ rho: (o.rho || 0) + (R.zw ? 0.07 * Math.sin(ZwPop.TAU * R.ph - 1) : 0) }) },
  binnen(ctx, B) { const D = this.data;
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#3A4148'; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    const bg = ZwPop.pt(B, ...D.punten.blaas); ctx.fillStyle = '#3E4650'; ctx.beginPath(); ctx.ellipse(bg[0], bg[1] + 2, 4.5, 1.6, 0.1, 0, 6.283); ctx.fill();
    const oe = ZwPop.pt(B, ...D.punten.oog); dierOog(ctx, oe[0], oe[1], 4.4, '#2A2420', { rand: '#4A525C' }); },
  skel: { schedel: [[0.0, 0.0], [0.08, 0.3], [0.15, 0.55], [0.19, 0.2], [0.17, -0.2], [0.08, -0.15]], kaak: [[0.005, -0.25], [0.12, -0.45], [0.14, -0.25], [0.06, -0.1]], wervels: [0.19, 1.0, 34], doorn: 0.8, ribben: [0.24, 0.42, 9],
    arm: { vin: 'borst', T: [-70, 46], vingers: [[-0.07, 2], [-0.02, 7], [0.03, 6], [0.08, 2]] } },
  rontgen(ctx, B, R, o) { _zwSkelet(ctx, B, this, R, o); }
};
ZW_DEF.ichthyosaurus = { naam: 'ichthyosaurus', X0: 300, Y0: 0, zw: 0.4, nSeg: 12, rand: 2, lijfKleur: 'rug',
  pal: { rug: '#3F5166', mid: '#526579', flank: '#8B97A3', buik: '#B3B8BD', vlek: '#6A7A8B', rugD: '#344456' },
  slag: { soort: 'zij', f: 0.5, lam: 1.0, A: [[0, 0.01], [0.3, 0.003], [0.6, 0.01], [0.85, 0.035], [1, 0.07]], V: [[0, 0], [0.7, 0], [1, 0.004]], vinVerst: 1.5 }, staartShear: 0.5,
  tonen: [{ c: 'mid', van: [[0, 0.0], [0.15, 0.08], [0.3, 0.12], [0.6, 0.1], [0.85, 0.0], [1, -0.1]], tot: 'buik', open1: true },
          { c: 'flank', van: [[0, -0.15], [0.15, -0.08], [0.3, -0.04], [0.6, -0.06], [0.85, -0.15], [1, -0.25]], tot: 'buik', open1: true },
          { c: 'buik', van: [[0.12, -0.5], [0.3, -0.42], [0.6, -0.48], [0.85, -0.55], [1, -0.7]], tot: 'buik', open1: true }],
  achter: [['voor', { ver: 1, rho: 0.15, dx: 8, dy: -3 }], ['achter', { ver: 1, rho: 0.12, dx: 6, dy: -2 }], ['rug'], ['staart'], ['achter']], voor: [['voor']],
  vinAnim: { voor: (R, o) => ({ rho: (o.rho || 0) + (R.zw ? 0.05 * Math.sin(ZwPop.TAU * R.ph) : 0) }) },
  binnen(ctx, B) { const D = this.data, L = B.pr.Ls;
    // vlekkenrij op de toongrens
    ctx.fillStyle = this.pal.vlek; for (let i = 0; i < 46; i++) { const u = 0.24 + 0.6 * hash(i * 3.7), s = u * L, h = ZwPop.profAt(B.pr.P, s); const p = ZwPop.pt(B, s, (0.06 - 0.16 * hash(i * 5.3)) * h[1]); ctx.beginPath(); ctx.ellipse(p[0], p[1], 2.2 + 1.6 * hash(i * 9.1), 1.6 + hash(i * 2.3), 0, 0, 6.283); ctx.fill(); }
    // bek met tanden
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#20262E'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    ctx.fillStyle = '#E8E4D4'; for (let i = 0; i < 14; i++) { const s = 6 + i * 6, p = ZwPop.pt(B, s, D.lijnen.mond[0][1] - 0.2 - i * 0.02); const F = ZwPop.frame(B, s); ctx.beginPath(); ctx.moveTo(p[0] - F.t[0] * 1.6, p[1] - F.t[1] * 1.6); ctx.lineTo(p[0] - F.n[0] * (i % 2 ? 3.2 : -3.2), p[1] - F.n[1] * (i % 2 ? 3.2 : -3.2)); ctx.lineTo(p[0] + F.t[0] * 1.6, p[1] + F.t[1] * 1.6); ctx.fill(); }
    const ns = ZwPop.pt(B, ...D.punten.neus); ctx.fillStyle = '#22282F'; ctx.beginPath(); ctx.ellipse(ns[0], ns[1], 2.6, 1.1, 0, 0, 6.283); ctx.fill();
    // groot oog met benen scleraalring
    const oe = ZwPop.pt(B, ...D.punten.oog); circ(ctx, oe[0], oe[1], 15, this.pal.rugD); circ(ctx, oe[0], oe[1], 12.5, '#B9B49C'); ctx.strokeStyle = '#8A8670'; ctx.lineWidth = 1.2;
    for (let i = 0; i < 14; i++) { const an = i / 14 * 6.283; ctx.beginPath(); ctx.moveTo(oe[0] + Math.cos(an) * 8.5, oe[1] + Math.sin(an) * 8.5); ctx.lineTo(oe[0] + Math.cos(an) * 12.5, oe[1] + Math.sin(an) * 12.5); ctx.stroke(); }
    dierOog(ctx, oe[0], oe[1], 8, '#4A3A1A'); }
};
function _zwBultFlipper(Lf, s) { const dir = [-0.55, 0.83], nr = [0.83, 0.55], V = [], A = [], W = [];
  for (let i = 0; i <= 24; i++) { const a = i / 24, w = Lf * (0.27 * (1 - a) ** 0.75 + 0.035) * (a < 0.1 ? 0.8 + a * 2 : 1), kn = i % 2 && a > 0.12 && a < 0.96 ? 0.14 : 0, c = [dir[0] * Lf * a - 0.1 * Lf * a * a, dir[1] * Lf * a - 0.04 * Lf * a * a];
    V.push([c[0] + nr[0] * w * (0.5 + kn * 0.5), c[1] + nr[1] * w * (0.5 + kn * 0.5)]); A.push([c[0] - nr[0] * w * 0.5, c[1] - nr[1] * w * 0.5]); W.push([c[0] + nr[0] * w * 0.12, c[1] + nr[1] * w * 0.12]); }
  const tip = [dir[0] * Lf * 1.03 - 0.1 * Lf, dir[1] * Lf * 1.03 - 0.04 * Lf], blad = V.concat([tip], A.reverse());
  const wit = V.slice(5).concat([tip], W.slice(5).reverse()), witPunt = []; for (let k = 0; k < 9; k++) { const a = 0.8 + k * 0.025, c = [dir[0] * Lf * a - 0.1 * Lf * a * a, dir[1] * Lf * a - 0.04 * Lf * a * a]; witPunt.push([c[0] - nr[0] * Lf * 0.01, c[1] - nr[1] * Lf * 0.01]); }
  return { s, d: -42, lagen: [{ c: 'rugL', p: blad }, { c: 'wit', p: wit }, { c: 'witD', p: V.slice(16).concat([tip], witPunt.reverse()) }] }; }
ZW_DEF.bultrug = { naam: 'bultrug', X0: 400, Y0: 0, zw: 0.4, nSeg: 14, rand: 2.4, lijfKleur: 'rug',
  pal: { rug: '#36465A', rugL: '#46566B', wit: '#CDD0D4', witD: '#AEB3BA', mid: '#7F8896', groef: '#9EA6B0', knobbel: '#56677C' },
  slag: { soort: 'op', f: 0.22, lam: 1.2, A: [[0, 0.008], [0.3, 0.0], [0.6, 0.006], [0.8, 0.028], [1, 0.068]], vinPitch: 0.42 },
  extraVin: (Ls) => ({ fluke: _zwFluke(0.12 * Ls, 0.026 * Ls, Ls), borst: _zwBultFlipper(0.3 * Ls, 0.31 * Ls) }),
  tonen: [{ c: 'rugL', van: [[0.14, -0.05], [0.3, -0.12], [0.55, -0.22], [0.8, -0.3], [1, -0.32]], tot: 'buik', open1: true },
          { c: 'wit', van: [[0.0, -0.05], [0.05, -0.12], [0.16, -0.18], [0.3, -0.3], [0.45, -0.48], [0.6, -0.62], [0.7, -0.8], [0.78, -1.06]], tot: 'buik', open0: true, golf: [2.5, 70, 0, 2] }],
  achter: [['rug'], ['fluke']], voor: [['borst']],
  vinAnim: { borst: (R, o) => ({ rho: (o.rho || 0) + 0.09 * Math.sin(ZwPop.TAU * (R.ph * 0.5) + 0.6) }) },
  vinRand: {},
  binnen(ctx, B) { const D = this.data, L = B.pr.Ls, pal = this.pal;
    // keelgroeven: lijnen van kin naar navel, op vaste fractie van de buikdikte
    ctx.strokeStyle = pal.groef; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    for (let k = 0; k < 9; k++) { const v = -0.3 - k * 0.08, P = []; for (let u = 0.02 + k * 0.004; u <= 0.46 - k * 0.012; u += 0.01) { const s = u * L, h = ZwPop.profAt(B.pr.P, s); P.push(ZwPop.pt(B, s, (v - 0.28 * u) * h[1])); }
      ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); }
    // mondlijn (gebogen), knobbels op bovenkaak en kin
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#1A222C'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    for (let i = 0; i < 12; i++) { const s = 6 + i * 13, h = ZwPop.profAt(B.pr.P, s); circ(ctx, ...ZwPop.pt(B, s, h[0] * (0.78 - 0.1 * (i % 2))), 3.2, pal.knobbel); }
    for (let i = 0; i < 5; i++) { const s = 8 + i * 12, h = ZwPop.profAt(B.pr.P, s); circ(ctx, ...ZwPop.pt(B, s, -h[1] * 0.55), 2.8, pal.rugL); }
    const oe = ZwPop.pt(B, ...D.punten.oog); dierOog(ctx, oe[0], oe[1], 4.6, '#3A2A1E', { rand: '#1C232C' }); },
  skel: { schedel: [[0.0, 0.05], [0.12, 0.45], [0.24, 0.6], [0.28, 0.25], [0.25, -0.1], [0.12, -0.05]], kaak: [[0.0, -0.15], [0.14, -0.5], [0.25, -0.35], [0.12, -0.2]], wervels: [0.28, 1.0, 32], doorn: 0.75, ribben: [0.32, 0.55, 9], ribDik: 3.5,
    heup: [0.69, -0.35, 40], arm: { vin: 'borst', T: [-124, 188], vingers: [[-0.06, 3], [-0.02, 7], [0.02, 6], [0.06, 3]] } },
  rontgen(ctx, B, R, o) { _zwSkelet(ctx, B, this, R, o); }
};
(function () { const d = ZW_DEF.bultrug, oud = d.voorTeken; const ev = d.extraVin; d.extraVin = (Ls) => Object.assign(ev(Ls), { fluke: _zwFluke(0.05 * Ls, 0.022 * Ls, Ls) }); d._p = null;
  d.voorTeken = function (ctx, B, R, fase) { if (oud) oud.call(this, ctx, B, R, fase); if (fase !== 'voor') return;
    const Ls = B.pr.Ls, F = ZwPop.frame(B, Ls * 0.95), c = 0.1 * Ls, k = 0.26 + 0.1 * Math.sin(ZwPop.TAU * (R.ph || 0) + 1.2), S = 0.165 * Ls * k;
    const P = (u, v) => [F.p[0] + F.t[0] * (u + 0.25) * c + F.n[0] * v, F.p[1] + F.t[1] * (u + 0.25) * c + F.n[1] * v]; // t wijst naar de staart: lobben zwepen naar achteren
    const lob = (z) => { const Q = [[-0.2, 0.05 * z], [0.1, 0.5 * z], [0.35, 0.86 * z], [0.62, 1.0 * z]]; for (let i = 0; i <= 6; i++) { const u = i / 6, sc = (i % 2) * 0.04; Q.push([0.62 - u * 0.4 + sc, (1 - u) * z + u * 0.04 * z]); } Q.push([0.2, 0]); return Q.map(([u, v]) => P(u, v * S)); };
    for (const z of [1, -1]) { const Q = lob(z); ctx.beginPath(); ctx.moveTo(...Q[0]); for (const q of Q) ctx.lineTo(...q); ctx.closePath(); ctx.fillStyle = z > 0 ? this.pal.rug : this.pal.rugL; ctx.fill(); ctx.strokeStyle = ZwPop.RANDK ? ZwPop.RANDK(this.pal.rug) : '#5A6A80'; ctx.lineWidth = this.rand || 2; ctx.stroke(); } };
})();
ZW_DEF.basilosaurus = { naam: 'basilosaurus', X0: 450, Y0: 0, zw: 0.42, nSeg: 14, rand: 2.2, lijfKleur: 'rug',
  pal: { rug: '#425064', mid: '#5B6678', buik: '#9DA1A5', tand: '#ECE6D2', mond: '#7A3E3E', poot: '#5B6678' },
  slag: { soort: 'op', f: 0.3, lam: 0.7, A: [[0, 0.004], [0.2, 0.007], [0.6, 0.016], [1, 0.032]], vinPitch: 0.3 },
  extraVin: (Ls) => ({ fluke: _zwFluke(0.065 * Ls, 0.022 * Ls, Ls) }), vinS: { poot: 0.76 }, vinSchaal: { poot: [1.4, 1.4] },
  tonen: [{ c: 'mid', van: [[0.04, -0.12], [0.2, -0.06], [0.5, -0.12], [0.8, -0.22], [1, -0.3]], tot: 'buik', open1: true },
          { c: 'buik', van: [[0.07, -0.42], [0.2, -0.4], [0.5, -0.36], [0.8, -0.46], [1, -0.6]], tot: 'buik', open1: true }],
  achter: [['borst', { ver: 1, rho: 0.14, dx: 8, dy: -3 }], ['poot', { ver: 1, dx: 6, dy: -2 }], ['fluke']], voor: [['borst'], ['poot']],
  vinAnim: { poot: (R, o) => (R.o.poot > 0.01 ? { c: 'goud' } : {}) },
  binnen(ctx, B) { const D = this.data;
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#1A1E22'; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    ctx.fillStyle = this.pal.tand; for (let i = 0; i < 7; i++) { const s = 4 + i * 8.5, p = ZwPop.pt(B, s, D.lijnen.mond[0][1] + 0.3 - i * 0.35), F = ZwPop.frame(B, s), h = i < 3 ? 6 : 4.5;
      ctx.beginPath(); ctx.moveTo(p[0] - F.t[0] * 2.4, p[1] - F.t[1] * 2.4); ctx.lineTo(p[0] - F.n[0] * h, p[1] - F.n[1] * h); ctx.lineTo(p[0] + F.t[0] * 2.4, p[1] + F.t[1] * 2.4); ctx.fill(); }
    const ns = ZwPop.pt(B, ...D.punten.neus); ctx.fillStyle = '#1A1E22'; ctx.beginPath(); ctx.ellipse(ns[0], ns[1], 3, 1.3, 0, 0, 6.283); ctx.fill();
    const oe = ZwPop.pt(B, ...D.punten.oog); dierOog(ctx, oe[0], oe[1], 4, '#2E2016'); }
};
for (const k of ['dolfijn', 'ichthyosaurus', 'bultrug', 'basilosaurus']) ZW_DEF[k].data = ZW_DATA[k];
dolfijn = function (ctx, x, y, s = 1, o = {}) { return ZwTeken.teken(ZW_DEF.dolfijn, ctx, x, y, s, o); };
ichthyosaurus = function (ctx, x, y, s = 1, o = {}) { return ZwTeken.teken(ZW_DEF.ichthyosaurus, ctx, x, y, s, o); };
bultrug = function (ctx, x, y, s = 1, o = {}) { return ZwTeken.teken(ZW_DEF.bultrug, ctx, x, y, s, o); };
(function () { const d = ZW_DEF.basilosaurus; d.achter = d.achter.filter(([n]) => n !== 'poot'); d.voor = d.voor.filter(([n]) => n !== 'poot'); })();
function _basiPootje(ctx, B, d, goud) { const v = B.pr.vin.poot; if (!v) return; const s0 = v.s, d0 = v.d + 3, P = (ds, dd) => ZwPop.pt(B, s0 + ds, d0 + dd);
  const H = P(0, 0), K = P(7, -9), A = P(-1, -17), V = P(4, -21), kl = goud ? C.goud : d.pal.poot, rand = ZwPop.mixHex(kl, 0.35, '#1E2A3A');
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, c] of [[6.5, rand], [4.6, kl]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(...H); ctx.lineTo(...K); ctx.lineTo(...A); ctx.lineTo(...V); ctx.stroke(); }
  ctx.fillStyle = kl; ctx.beginPath(); ctx.arc(K[0], K[1], 2.8, 0, 6.283); ctx.fill(); // knie
  for (const [ds, dd] of [[4, -5], [6, -2], [6, 1.5]]) { const T = P(4 + ds, -21 + dd); ctx.strokeStyle = rand; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(...V); ctx.lineTo(...T); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.stroke(); } }
basilosaurus = function (ctx, x, y, s = 1, o = {}) { const d = ZW_DEF.basilosaurus; d.pal.goud = C.goud; if ((o.a ?? 1) <= 0.01) return;
  d.naLijf = function (c, B) { _basiPootje(c, B, d, (o.poot || 0) > 0.01); }; const r = ZwTeken.teken(d, ctx, x, y, s, o); d.naLijf = null; return r; };
const ZwPoot = (() => {
  const Z = ZwPop, D2R = Math.PI / 180, fr = (u) => u - Math.floor(u);
  const len = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]), ang = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  function ik(p0, t, l1, l2, teken) { let dx = t[0] - p0[0], dy = t[1] - p0[1], d = Math.hypot(dx, dy); d = Math.max(Math.abs(l1 - l2) + 1e-3, Math.min(l1 + l2 - 1e-3, d));
    const al = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)))), a1 = Math.atan2(dy, dx) + teken * al; const j = [p0[0] + Math.cos(a1) * l1, p0[1] + Math.sin(a1) * l1];
    const a2 = Math.atan2(t[1] - j[1], t[0] - j[0]); return [j, [j[0] + Math.cos(a2) * l2, j[1] + Math.sin(a2) * l2]]; }
  function prep(def) { if (def._poot) return def._poot; const P = {};
    for (const k in def.poten) { const L = def.poten[k], pts = def.data.poten[L.bron || k], voor = k[0] === 'V';
      P[k] = { voor, ver: k.length > 1, L: [0, 1, 2, 3].map(i => len(pts[i], pts[i + 1])), aMeta: ang(pts[2], pts[3]), aTeen: ang(pts[3], pts[4]), teen0: [pts[4][0] + (L.dx || 0), pts[4][1]], w: L.w, aan: L.aan || (voor ? 'schouder' : 'heup') }; }
    return (def._poot = P); }
  // stand van alle poten voor houding o; geeft per poot de gewrichtspunten [heup, knie, hak, bal, teen]
  function stand(def, B, R, o) {
    const P = prep(def), G = def.gang || {}, h = o.houding || 'staan', res = {};
    for (const k in P) { const p = P[k], q = def.data.punten[p.aan], heup = Z.pt(B, q[0], q[1]); if (p.ver) { heup[0] += p.voor ? -3 : 3; heup[1] -= 2; }
      let teen = p.teen0.slice(), aM = p.aMeta, aT = p.aTeen, zwaai = false;
      const Kv = p.voor ? (def.krommen || {}).V : (def.krommen || {}).A;
      if (h === 'lopen' && G.S) { const ph = (o.t || 0) * G.f, fase = fr(ph - G.fase[k]), beta = G.beta, halve = G.S * beta / 2, nx = G.nx || 0;
        if (fase < beta) { const u = fase / beta; teen[0] = p.teen0[0] + nx + halve * (1 - 2 * u); aM += Z.kurve(Kv.metaS, u) * D2R; aT += Z.kurve(Kv.teenS, u) * D2R; }
        else { const u = (fase - beta) / (1 - beta); zwaai = true; const a = p.teen0[0] + nx - halve, b = p.teen0[0] + nx + halve; teen[0] = a + (b - a) * Z.sstep(u) + Math.sin(Math.PI * u) * (b - a) * 0.08;
          teen[1] = p.teen0[1] - G.lift[p.voor ? 'V' : 'A'] * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.85)), 1.2); aM += Z.kurve(Kv.metaZ, u) * D2R; aT += Z.kurve(Kv.teenZ, u) * D2R; } }
      else if (def.potenHouding && def.potenHouding[h]) { const r = def.potenHouding[h](k, p, o, B); teen = r.teen || teen; aM = r.aM ?? aM; aT = r.aT ?? aT; if (r.vrij) { res[k] = vrij(p, heup, r); continue; } }
      const bal = [teen[0] - Math.cos(aT) * p.L[3], teen[1] - Math.sin(aT) * p.L[3]], hak = [bal[0] - Math.cos(aM) * p.L[2], bal[1] - Math.sin(aM) * p.L[2]];
      const [knie, hak2] = ik(heup, hak, p.L[0], p.L[1], p.voor ? 1 : -1); const d = [hak2[0] - hak[0], hak2[1] - hak[1]]; // te kort: voet volgt
      res[k] = { J: [heup, knie, hak2, [bal[0] + d[0], bal[1] + d[1]], [teen[0] + d[0], teen[1] + d[1]]], zwaai }; }
    return res; }
  // vrije poot (zwemmen): hoeken per bot (graden, schermrichting) i.p.v. IK
  function vrij(p, heup, r) { const J = [heup]; r.a.forEach((a, i) => { const q = J[i]; J.push([q[0] + Math.cos(a * D2R) * p.L[i], q[1] + Math.sin(a * D2R) * p.L[i]]); }); return { J, spreid: r.spreid || 0 }; }
  // poot als één zachte keten: zijranden met gemiddelde normalen, ronde gewrichten
  function kettingPad(J, W) { const L = [], Rr = []; for (let i = 0; i < J.length; i++) { const a = J[Math.max(0, i - 1)], b = J[Math.min(J.length - 1, i + 1)]; let tx = b[0] - a[0], ty = b[1] - a[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      L.push([J[i][0] - ty * W[i] / 2, J[i][1] + tx * W[i] / 2]); Rr.push([J[i][0] + ty * W[i] / 2, J[i][1] - tx * W[i] / 2]); } return Z.gladOpen(L, 3).concat(Z.gladOpen(Rr.reverse(), 3)); }
  function teken(ctx, def, k, S, modus, pal) { const p = prep(def)[k], J = S.J, W = p.w.slice(); if (S.spreid) W[3] *= 1 + S.spreid * 0.15, W[4] *= 1 + S.spreid * 0.3;
    const omt = kettingPad(J, W), c1 = pal[def.pootKleur?.[0] || 'flank'], c2 = pal[def.pootKleur?.[1] || 'poot'];
    const rond = () => { for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.arc(J[i][0], J[i][1], W[i] / 2, 0, 6.283); } };
    if (modus === 'rand') { Z.pad(ctx, omt); ctx.strokeStyle = Z.RANDK(c1); ctx.lineWidth = def.rand || 2; ctx.lineJoin = 'round'; ctx.stroke(); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.arc(J[i][0], J[i][1], W[i] / 2, 0, 6.283); ctx.stroke(); } return; }
    ctx.fillStyle = c1; Z.pad(ctx, omt); ctx.fill(); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.arc(J[i][0], J[i][1], W[i] / 2, 0, 6.283); ctx.fill(); }
    // onderbeen donkerder vanaf halverwege de schacht
    const m = [(J[1][0] + J[2][0]) / 2 + (J[2][0] - J[1][0]) * 0.15, (J[1][1] + J[2][1]) / 2 + (J[2][1] - J[1][1]) * 0.15];
    const J2 = [m, J[2], J[3], J[4]], W2 = [(W[1] + W[2]) / 2 + 0.6, W[2] + 0.6, W[3] + 0.6, W[4] + 0.6]; ctx.fillStyle = c2; Z.pad(ctx, kettingPad(J2, W2)); ctx.fill(); for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.arc(J2[i][0], J2[i][1], W2[i] / 2, 0, 6.283); ctx.fill(); }
    if (def.voet) def.voet(ctx, p, J, W, pal, S); }
  return { prep, stand, teken, ik };
})();
const ZwLoper = (() => {
  const Z = ZwPop;
  function teken(def, ctx, x, y, s, o = {}) {
    const { a = 1, kijk = 1, rot = 0 } = o; if (a <= 0.01) return; const pr = Z.prep(def), h = o.houding || def.standaard || 'staan';
    const oo = Object.assign({}, o, { houding: h }); const R = ZwSlag.rug(def, pr, oo); R.o = oo;
    const G = def.gang || {}; let dy = 0, dx = 0; if (h === 'lopen' && G.S) { const ph = (o.t || 0) * G.f; dy = (G.bob || 0) * Math.cos(4 * Math.PI * (ph - 0.06)); }
    if (def.lijfHouding && def.lijfHouding[h]) { const r = def.lijfHouding[h](R, oo); dy += r.dy || 0; dx += r.dx || 0; }
    const B = Z.keten(def, pr, R.pitch, R.yaw, [dx, dy]); const P = ZwPoot.stand(def, B, R, oo);
    _bd(ctx, x, y, s, kijk, a, rot); ctx.lineJoin = 'round';
    if (o.wereld && G.S && h === 'lopen') ctx.translate(G.S * ((o.t || 0) * G.f % 1), 0);
    const palV = def.palVer || (def.palVer = Object.fromEntries(Object.entries(def.pal).map(([k, c]) => [k, Z.mixHex(c, 0.32, '#2A2420')])));
    const ver = Object.keys(P).filter(k => k.length > 1), nV = Object.keys(P).filter(k => k === 'V'), nA = Object.keys(P).filter(k => k === 'A');
    const vinA = (def.achter || []).map(([n, e]) => [n, ZwTeken.opties(def, R, n, e || {})]), vinV = (def.voor || []).map(([n, e]) => [n, ZwTeken.opties(def, R, n, e || {})]);
    for (const k of ver) ZwPoot.teken(ctx, def, k, P[k], 'rand', palV); for (const k of nV) ZwPoot.teken(ctx, def, k, P[k], 'rand', def.pal);
    for (const [n, op] of vinA) Z.tekenVin(ctx, B, def, n, 'rand', op);
    Z.tekenLijf(ctx, B, def, 'rand', R); for (const k of nA) ZwPoot.teken(ctx, def, k, P[k], 'rand', def.pal);
    for (const [n, op] of vinV) Z.tekenVin(ctx, B, def, n, 'rand', op);
    for (const k of ver) ZwPoot.teken(ctx, def, k, P[k], 'vul', palV);
    for (const [n, op] of vinA) Z.tekenVin(ctx, B, def, n, 'vul', op);
    for (const k of nV) ZwPoot.teken(ctx, def, k, P[k], 'vul', def.pal);
    Z.tekenLijf(ctx, B, def, 'vul', R); if (def.naLijf) def.naLijf(ctx, B, R);
    for (const k of nA) ZwPoot.teken(ctx, def, k, P[k], 'vul', def.pal);
    if (def.overPoot) def.overPoot(ctx, B, R, P);
    for (const [n, op] of vinV) Z.tekenVin(ctx, B, def, n, 'vul', op);
    ctx.restore(); return { B, R, P };
  }
  return { teken };
})();
const ZW_KROM_STAP = { A: { metaS: [[0, 0], [0.55, 0], [0.82, -22], [1, -40]], teenS: [[0, 0], [0.8, 0], [1, -8]], metaZ: [[0, -40], [0.3, 28], [0.6, 30], [0.86, 4], [1, 0]], teenZ: [[0, -8], [0.3, 55], [0.65, 45], [0.9, 8], [1, 0]] },
  V: { metaS: [[0, 0], [0.6, 0], [0.85, -18], [1, -32]], teenS: [[0, 0], [0.85, 0], [1, -6]], metaZ: [[0, -32], [0.25, 70], [0.55, 75], [0.86, 8], [1, 0]], teenZ: [[0, -6], [0.3, 85], [0.6, 80], [0.9, 10], [1, 0]] } };
function _zwHoefjes(ctx, p, J, W, pal) { const t = J[4], b = J[3], a = Math.atan2(t[1] - b[1], t[0] - b[0]); ctx.save(); ctx.translate(t[0], t[1]); ctx.rotate(a); ctx.fillStyle = pal.hoef;
  ctx.beginPath(); ctx.moveTo(-W[4] * 0.9, -W[4] * 0.55); ctx.lineTo(W[4] * 0.7, -W[4] * 0.1); ctx.lineTo(W[4] * 0.55, W[4] * 0.6); ctx.lineTo(-W[4] * 0.9, W[4] * 0.6); ctx.closePath(); ctx.fill(); ctx.restore(); }
ZW_DEF.pakicetus = { naam: 'pakicetus', zw: 0.5, nSeg: 14, rand: 1.8, lijfKleur: 'flank', standaard: 'staan',
  pal: { rug: '#665645', flank: '#88725A', buik: '#BBA98F', poot: '#5C4E40', donker: '#3E352D', hoef: '#2A241F', licht: '#A8957A' },
  slag: { soort: 'op', f: 0.25, lam: 1, A: [[0, 0], [0.65, 0], [1, 0.012]] },
  slagPer: { lopen: { soort: 'op', f: 1.0, lam: 0.8, A: [[0, 0], [0.64, 0], [0.8, 0.01], [1, 0.03]] } },
  tonen: [{ c: 'rug', van: [[0.12, 0.6], [0.25, 0.45], [0.45, 0.4], [0.66, 0.3], [0.75, 0.0], [1, -0.3]], tot: 'rug', open1: true },
          { c: 'licht', van: [[0.02, -0.15], [0.1, -0.05], [0.2, -0.15], [0.3, -0.35], [0.5, -0.4], [0.64, -0.45], [0.68, -1.1]], tot: 'buik', open0: true },
          { c: 'buik', van: [[0.05, -0.45], [0.15, -0.4], [0.3, -0.6], [0.5, -0.65], [0.62, -0.7], [0.66, -1.1]], tot: 'buik', open0: true }],
  gang: { S: 88, f: 1.0, beta: 0.64, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 11, A: 9 }, bob: 1.2, nx: 4 }, krommen: ZW_KROM_STAP,
  poten: { A: { w: [40, 19, 11, 9, 6] }, V: { w: [30, 16, 10, 8.5, 6] }, AF: { bron: 'A', dx: 14, w: [34, 17, 10, 8.5, 6] }, VF: { bron: 'V', dx: -12, w: [26, 15, 9.5, 8, 6] } },
  pootKleur: ['flank', 'poot'], voet: _zwHoefjes,
  binnen(ctx, B) { const D = this.data;
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#2E2620'; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    ctx.fillStyle = '#EDE6D2'; for (let i = 0; i < 6; i++) { const s = 6 + i * 7, p = ZwPop.pt(B, s, D.lijnen.mond[0][1] + 0.4 - i * 0.2), F = ZwPop.frame(B, s); ctx.beginPath(); ctx.moveTo(p[0] - F.t[0] * 1.3, p[1] - F.t[1] * 1.3); ctx.lineTo(p[0] - F.n[0] * 3, p[1] - F.n[1] * 3); ctx.lineTo(p[0] + F.t[0] * 1.3, p[1] + F.t[1] * 1.3); ctx.fill(); }
    const ns = ZwPop.pt(B, ...D.punten.neus); ctx.fillStyle = '#2A221C'; ctx.beginPath(); ctx.ellipse(ns[0], ns[1], 2.2, 1.4, 0, 0, 6.283); ctx.fill();
    const oe = ZwPop.pt(B, ...D.punten.oog); dierOog(ctx, oe[0], oe[1], 3.4, '#3A2414', { rand: '#3E352D' }); },
  naLijf(ctx, B) { const q = this.data.punten.oor, p = ZwPop.pt(B, q[0], q[1]), F = ZwPop.frame(B, q[0]), a = Math.atan2(-F.t[1], -F.t[0]); // klein oor
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(a); ZwPop.pad(ctx, ZwPop.glad([[4, 4], [2, -6], [-3, -11], [-7, -6], [-6, 4]], 3)); ctx.fillStyle = this.pal.rug; ctx.fill(); ZwPop.pad(ctx, ZwPop.glad([[1, 2], [0, -5], [-3, -8], [-5, -4], [-4, 2]], 3)); ctx.fillStyle = '#9C7F66'; ctx.fill(); ctx.restore(); }
};
ZW_DEF.pakicetus.data = ZW_DATA.pakicetus;
Object.assign(ZW_DEF.pakicetus, { X0: ZW_DATA.pakicetus?.X0, Y0: ZW_DATA.pakicetus?.Y0, rust: ZW_DATA.pakicetus?.rust });
pakicetus = function (ctx, x, y, s = 1, o = {}) { return ZwLoper.teken(ZW_DEF.pakicetus, ctx, x, y, s, o); };
function _zwPeddel(k, p, o, def) { const P = def.peddel, Z = ZwPop, L = Z.lerp, ph = (o.t || 0) * P.f + (k.length > 1 ? 0.5 : 0), u = ph - Math.floor(ph);
  if (p.voor) { const w = Math.sin(Z.TAU * ph); return { vrij: true, a: P.voor.map((a, i) => a + w * (P.voorZwaai || 4) * (i + 1) * 0.5) }; }
  if (u < P.kracht) { const w = Z.sstep(u / P.kracht); return { vrij: true, a: P.van.map((a, i) => L(a, P.naar[i], w)), spreid: 1 }; }
  const w = Z.sstep((u - P.kracht) / (1 - P.kracht)), b = Math.sin(Math.PI * w);
  return { vrij: true, a: [L(P.naar[0], P.van[0], w), L(P.naar[1], P.van[1], w) - 45 * b, L(P.naar[2], P.van[2], w * w) + 10 * b, L(P.naar[3], P.van[3], w * w) + 5 * b], spreid: 0.15 * w }; }
function _zwVoetTenen(ctx, p, J, W, pal, S) { const b = J[3], t = J[4], a = Math.atan2(t[1] - b[1], t[0] - b[0]), Lt = Math.hypot(t[0] - b[0], t[1] - b[1]);
  ctx.save(); ctx.translate(b[0], b[1]); ctx.rotate(a); const sp = S.spreid || 0, n = p.voor ? 3 : 4;
  if (false) { ctx.fillStyle = ZwPop.mixHex(pal.poot, 0.25, '#1E1A16'); ZwPop.pad(ctx, [[0, -W[3] * 0.4], [Lt * 1.12, -W[4] * (1.4 + sp * 1.4)], [Lt * 1.12, W[4] * (1.4 + sp * 1.4)], [0, W[3] * 0.4]]); ctx.globalAlpha *= 0.8; ctx.fill(); ctx.globalAlpha /= 0.8; }
  ctx.strokeStyle = ZwPop.mixHex(pal.poot, 0.35, '#1E1A16'); ctx.lineWidth = 1.2; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const f = n === 1 ? 0 : i / (n - 1) - 0.5, y = f * W[4] * (1.0 + sp * 0.4); ctx.beginPath(); ctx.moveTo(Lt * 0.2, f * W[3] * 0.5); ctx.lineTo(Lt * 1.05, y); ctx.stroke();
    ctx.fillStyle = pal.hoef; ctx.beginPath(); ctx.ellipse(Lt * 1.08, y, p.voor ? 2.6 : 2.2, p.voor ? 2 : 1.4, 0, 0, 6.283); ctx.fill(); }
  ctx.restore(); }
ZW_DEF.ambulocetus = { naam: 'ambulocetus', zw: 0.45, nSeg: 14, rand: 1.8, lijfKleur: 'flank', standaard: 'staan',
  pal: { rug: '#554E47', flank: '#6B6255', mid: '#8C7F6C', buik: '#A89880', poot: '#5A5248', hoef: '#2E2924', tand: '#ECE6D2' },
  slag: { soort: 'op', f: 0.25, lam: 1, A: [[0, 0], [0.6, 0], [1, 0.01]] },
  slagPer: { lopen: { soort: 'op', f: 0.7, lam: 0.9, A: [[0, 0], [0.6, 0], [1, 0.025]] }, zwemmen: { soort: 'op', f: 0.8, lam: 0.8, A: [[0, 0.004], [0.4, 0.0], [0.62, 0.008], [1, 0.06]] } },
  tonen: [{ c: 'rug', van: [[0.05, 0.55], [0.2, 0.5], [0.4, 0.45], [0.62, 0.4], [0.8, 0.2], [1, 0.0]], tot: 'rug', open1: true, golf: [1.5, 60, 0, 1] },
          { c: 'mid', van: [[0.02, -0.15], [0.15, -0.1], [0.3, -0.25], [0.5, -0.3], [0.65, -0.35], [0.8, -0.45], [1, -0.5]], tot: 'buik', open0: true, open1: true, golf: [1.2, 80, 1, 0.8] },
          { c: 'buik', van: [[0.04, -0.4], [0.15, -0.35], [0.3, -0.5], [0.5, -0.5], [0.63, -0.55], [0.7, -1.1]], tot: 'buik', open0: true }],
  gang: { S: 66, f: 0.7, beta: 0.7, fase: { A: 0, V: 0.25, AF: 0.5, VF: 0.75 }, lift: { V: 8, A: 7 }, bob: 1.4, nx: 3 }, krommen: ZW_KROM_STAP,
  poten: { A: { w: [44, 20, 12, 10, 9] }, V: { w: [34, 17, 11, 9, 7] }, AF: { bron: 'A', dx: 16, w: [38, 18, 11, 9.5, 8.5] }, VF: { bron: 'V', dx: -14, w: [30, 15, 10, 8.5, 6.5] } },
  pootKleur: ['flank', 'poot'], voet: _zwVoetTenen,
  peddel: { f: 0.8, kracht: 0.45, van: [80, 100, 110, 118], naar: [150, 165, 175, 180], voor: [120, 150, 165, 172], voorZwaai: 3 },
  lijfHouding: { liggen: () => ({ dy: 44 }), zwemmen: () => ({ dy: -10 }) },
  potenHouding: { liggen: (k, p) => ({ teen: [p.teen0[0] + (p.voor ? 26 : 34), 0], aM: p.voor ? 0.05 : 0.02, aT: 0 }), zwemmen: (k, p, o) => _zwPeddel(k, p, o, ZW_DEF.ambulocetus) },
  binnen(ctx, B) { const D = this.data;
    const M = D.lijnen.mond.map(([s, d]) => ZwPop.pt(B, s, d)); ctx.strokeStyle = '#2A2420'; ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...M[0]); for (let i = 1; i < M.length; i++) ctx.lineTo(...M[i]); ctx.stroke();
    ctx.fillStyle = this.pal.tand; for (let i = 0; i < 9; i++) { const s = 6 + i * 7, p = ZwPop.pt(B, s, D.lijnen.mond[0][1] + 0.5 - i * 0.25), F = ZwPop.frame(B, s), up = i % 2 ? 1 : -1; ctx.beginPath(); ctx.moveTo(p[0] - F.t[0] * 1.6, p[1] - F.t[1] * 1.6); ctx.lineTo(p[0] - F.n[0] * 3.4 * up, p[1] - F.n[1] * 3.4 * up); ctx.lineTo(p[0] + F.t[0] * 1.6, p[1] + F.t[1] * 1.6); ctx.fill(); }
    const ns = ZwPop.pt(B, ...D.punten.neus); ctx.fillStyle = '#221E1A'; ctx.beginPath(); ctx.ellipse(ns[0], ns[1], 2.4, 1.5, 0, 0, 6.283); ctx.fill();
    const oe = ZwPop.pt(B, ...D.punten.oog); dierOog(ctx, oe[0], oe[1], 4, '#C49A3A', { rand: '#3E3730' }); }
};
ZW_DEF.rodhocetus = { naam: 'rodhocetus', zw: 0.45, nSeg: 14, rand: 1.8, lijfKleur: 'flank', standaard: 'zwemmen',
  pal: { rug: '#4F4945', flank: '#625B56', mid: '#7A726C', buik: '#A29A90', poot: '#4E4844', hoef: '#24201C', tand: '#ECE6D2' },
  slag: { soort: 'op', f: 0.6, lam: 0.9, A: [[0, 0.003], [0.5, 0], [0.7, 0.006], [1, 0.03]] },
  tonen: [{ c: 'rug', van: [[0.0, 0.4], [0.15, 0.5], [0.4, 0.45], [0.65, 0.35], [0.85, 0.1], [1, -0.1]], tot: 'rug', open1: true },
          { c: 'mid', van: [[0.02, -0.15], [0.15, -0.15], [0.3, -0.3], [0.55, -0.35], [0.7, -0.45], [0.9, -0.6], [1, -0.7]], tot: 'buik', open0: true, open1: true },
          { c: 'buik', van: [[0.04, -0.45], [0.15, -0.4], [0.3, -0.55], [0.55, -0.6], [0.66, -0.7], [0.72, -1.1]], tot: 'buik', open0: true }],
  poten: { A: { w: [40, 18, 11, 10, 9] }, V: { w: [30, 15, 10, 8.5, 7] }, AF: { bron: 'A', w: [36, 16, 10, 9, 8] }, VF: { bron: 'V', w: [27, 14, 9, 8, 6.5] } },
  pootKleur: ['flank', 'poot'], voet: _zwVoetTenen,
  peddel: { f: 0.6, kracht: 0.45, van: [95, 115, 125, 132], naar: [158, 168, 176, 180], voor: [105, 135, 150, 160], voorZwaai: 5 },
  potenHouding: { zwemmen: (k, p, o) => _zwPeddel(k, p, o, ZW_DEF.rodhocetus), recht: (k, p, o) => _zwPeddel(k, p, { t: 0 }, ZW_DEF.rodhocetus) },
  binnen: ZW_DEF.ambulocetus.binnen,
  naLijf(ctx, B) { const q = this.data.punten.oor, p = ZwPop.pt(B, q[0], q[1]); ctx.fillStyle = '#3A3430'; ctx.beginPath(); ctx.ellipse(p[0], p[1], 3, 2.2, 0, 0, 6.283); ctx.fill(); }
};
for (const k of ['ambulocetus', 'rodhocetus']) { const d = ZW_DEF[k]; d.data = ZW_DATA[k]; Object.assign(d, { X0: ZW_DATA[k]?.X0, Y0: ZW_DATA[k]?.Y0, rust: ZW_DATA[k]?.rust }); }
ambulocetus = function (ctx, x, y, s = 1, o = {}) { return ZwLoper.teken(ZW_DEF.ambulocetus, ctx, x, y, s, o); };
rodhocetus = function (ctx, x, y, s = 1, o = {}) { const h = o.houding === 'recht' ? 'recht' : 'zwemmen'; return ZwLoper.teken(ZW_DEF.rodhocetus, ctx, x, y, s, Object.assign({}, o, { houding: h })); };
