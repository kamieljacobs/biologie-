// =====================================================================================
// CHROMATIDE MET ARMEN — variant A (beeldbank 27 okt 2026): één chromosoomtaal in paars.
// Recept ongewijzigd (OpenStax Biology 2e § 10.2 en 11.1): zusterchromatiden vast bij het centromeer (cen ≈ 0,38 lang paar,
// 0,30 kort paar), kinetochoor aan de buitenkant, in de anafase centromeer vóórop en armen slepend; crossing-over tussen
// niet-zusterchromatiden. Wijzigingen:
//  - kleur: standaard paars (C.kernR, zoals kernChromatine/chromatideX: DNA = paars, C1). Teal en oker hebben in C1 een andere
//    betekenis (informatie/water, voedsel); herkomst daarom als licht en donker paars: CD.vader licht, CD.moeder donker.
//    Alleen kleuren op herkomst waar die ertoe doet (crossing-over, meiose); anders kl weglaten → CD.std.
//  - cdKluwen c = 0 begint als losse, zacht kronkelende draad zoals kernChromatine c = 0 (dun, lang, draaiing ≤ 0,8 rad, 64 punten), niet als lusje.
// In de bibliotheek: vervang de regel `const CD = …` door CD hieronder.
Object.assign(CD, { std: C.kernR, vader: '#C3B8EE', moeder: '#5E4C94', draad: '#8FA0B5', pool: '#B8C4D6' });
function cdPad(cx, cy, len, rot, o = {}) {
  const { cen = 0.38, zwaai = 0, kant = 1, bol = 0.10, n = 22 } = o; const P = [];
  const arm = (L, sgn, nn) => { const pts = []; const ang = rot + (sgn < 0 ? -Math.PI / 2 : Math.PI / 2) + sgn * -kant * zwaai * 1.15;
    for (let i = 0; i <= nn; i++) { const u = i / nn, d = u * L; const bend = Math.sin(u * Math.PI) * L * bol * (1 + zwaai); const dx = Math.cos(ang), dy = Math.sin(ang);
      pts.push([cx + dx * d + (-dy) * bend * kant * 0.6, cy + dy * d + dx * bend * kant * 0.6]); } return pts; };
  const up = arm(len * cen, -1, Math.round(n * cen)).reverse(), lo = arm(len * (1 - cen), 1, Math.round(n * (1 - cen)));
  return up.concat(lo.slice(1)); // van boven-tip (u=0) via centromeer naar onder-tip (u=1)
}
function cdChromatide(ctx, P, w, segs, o = {}) {
  const { a = 1, coils = true } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const N = P.length - 1, at = (u) => Math.round(clamp(u, 0, 1) * N);
  const lijn = (i0, i1) => { ctx.beginPath(); ctx.moveTo(P[i0][0], P[i0][1]); for (let i = i0 + 1; i <= i1; i++) ctx.lineTo(P[i][0], P[i][1]); };
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = _cdk(kl); ctx.lineWidth = w + 3; ctx.stroke(); });
  segs.forEach(([u0, u1, kl]) => { lijn(at(u0), at(u1)); ctx.strokeStyle = kl; ctx.lineWidth = w; ctx.stroke(); });
  if (coils && w >= 9) { ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = Math.max(1, w * 0.09);
    for (let i = 1; i < N; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i + 1]; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; const [x, y] = P[i];
      ctx.beginPath(); ctx.moveTo(x - nx * w * 0.38 - dx / L * w * 0.12, y - ny * w * 0.38 - dy / L * w * 0.12); ctx.quadraticCurveTo(x + dx / L * w * 0.18, y + dy / L * w * 0.18, x + nx * w * 0.38 - dx / L * w * 0.12, y + ny * w * 0.38 - dy / L * w * 0.12); ctx.stroke(); } }
  ctx.restore();
}
function cdChromosoom(ctx, x, y, len, o = {}) {
  const { w = 18, cen = 0.38, kl = CD.std, segsL = null, segsR = null, uiteen = 0, a = 1, kin = false, ringen = 0, dxL = 0, dxR = 0, zwaai = 0, rot = 0, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  // xv > 0: X-vorm, de armen van elke zuster wijken licht naar buiten (vast bij het centromeer)
  const gap = w * 0.52 + uiteen * w * 0.6;
  const PL = cdPad(x - gap + dxL, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen, zwaai, kant: 1 }), PR = cdPad(x + gap + dxR, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen, zwaai, kant: -1 });
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x + (dxL + dxR) / 2, y + len * (0.5 - cen), w * 3.1 + Math.abs(dxR - dxL) / 2, len * 0.62, 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
  cdChromatide(ctx, PL, w, segsL || [[0, 1, kl]], { a }); cdChromatide(ctx, PR, w, segsR || [[0, 1, kl]], { a });
  ctx.save(); ctx.globalAlpha *= a;
  if (uiteen < 0.25) { ctx.beginPath(); ctx.arc(x + (dxL + dxR) / 2, y, w * 0.5 * (1 - uiteen * 4), 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); }
  if (kin) [[PL, -1], [PR, 1]].forEach(([P, s]) => { const c = P[Math.round(cen * (P.length - 1))]; roundRect(ctx, c[0] + s * w * 0.45 - (s < 0 ? w * 0.32 : 0), c[1] - w * 0.55, w * 0.32, w * 1.1, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); });
  if (ringen > 0.01) { ctx.globalAlpha *= ringen; for (const u of [0.12, 0.25, 0.52, 0.7, 0.86]) { const i = Math.round(u * (PL.length - 1)); const p = PL[i], q = PR[i]; ctx.beginPath(); ctx.ellipse((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.abs(q[0] - p[0]) / 2 + w * 0.62, w * 0.22, 0, 0, 6.283); ctx.strokeStyle = C.grain; ctx.lineWidth = 2.2; ctx.stroke(); } }
  ctx.restore(); return { PL, PR };
}
function cdEen(ctx, x, y, len, o = {}) {
  const { w = 14, cen = 0.38, rot = 0, zwaai = 0, kant = 1, segs = null, kl = CD.std, a = 1, kin = false } = o; if (a <= 0.01) return;
  const P = cdPad(x, y, len, rot, { cen, zwaai, kant }); cdChromatide(ctx, P, w, segs || [[0, 1, kl]], { a });
  if (kin) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - kant * w * 0.62 - w * 0.16, y - w * 0.5, w * 0.32, w, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); ctx.restore(); }
  return P;
}
function _cdKronkel(n, seed, R) { // losse draad zoals kernChromatine c = 0: lang, zacht kronkelend (≤ 0,8 rad per stap), stuurt zacht terug
  const key = 'krA' + n + '_' + seed + '_' + Math.round(R); if (_bioPolyCache[key]) return _bioPolyCache[key];
  const P = []; let x = 0, y = -R * 0.5, an = hash(seed) * 6.283; const st = R * 0.1;
  for (let k = 0; k < n; k++) { an += (hash(seed * 31 + k * 7) - 0.5) * 0.8 + Math.sin(k * 0.45 + seed) * 0.2; const d = Math.hypot(x, y);
    if (d > R * 0.6) { let df = Math.atan2(-y, -x) - an; df = Math.atan2(Math.sin(df), Math.cos(df)); an += clamp(df, -0.4, 0.4) * clamp((d - R * 0.6) / (R * 0.3), 0, 1); }
    x += Math.cos(an) * st; y += Math.sin(an) * st; P.push([x, y]); }
  _bioPolyCache[key] = P; return P; }
function cdKluwen(ctx, x, y, len, o = {}) {
  const { c = 0, dubbel = true, w = 16, cen = 0.38, rot = 0, kl = CD.std, segsL = null, segsR = null, a = 1, seed = 1, R = len * 0.5, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  const e = ease(c), gap = w * 0.52;
  const doel = [cdPad(x - (dubbel ? gap : 0), y, len, rot, xv > 0 && dubbel ? { cen, zwaai: xv, kant: -1, bol: 0, n: 64 } : { cen, n: 64 }), cdPad(x + gap, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0, n: 64 } : { cen, n: 64 })];
  const n = doel[0].length, K = _cdKronkel(n, seed, R);
  const strengen = dubbel ? [0, 1] : [0];
  strengen.forEach(s => { const P = doel[s].map((q, k) => { const kx = x + K[k][0] + s * 5, ky = y + K[k][1] + s * 6; return [lerp(kx, q[0], e), lerp(ky, q[1], e)]; });
    const segs = (s ? segsR : segsL) || [[0, 1, kl]];
    if (e < 0.5) { ctx.save(); ctx.globalAlpha *= a; segs.forEach(([u0, u1, k2]) => { const i0 = Math.round(u0 * (n - 1)), i1 = Math.round(u1 * (n - 1)); dnaDraad(ctx, P.slice(i0, i1 + 1), { w: lerp(2.6, w * 0.5, e * 2), kleur: k2, donker: _cdk(k2), helix: false }); }); ctx.restore(); }
    else cdChromatide(ctx, P, lerp(w * 0.5, w, (e - 0.5) * 2), segs, { a, coils: e > 0.85 }); });
  if (e > 0.7 && dubbel) { ctx.save(); ctx.globalAlpha *= a * (e - 0.7) / 0.3; ctx.beginPath(); ctx.arc(x, y, w * 0.48, 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y + len * (0.5 - cen) * e, lerp(R * 1.05, w * 2.4, e), lerp(R * 1.05, len * 0.62, e), 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
