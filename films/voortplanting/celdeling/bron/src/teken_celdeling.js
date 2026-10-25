// =====================================================================================
// CELDELING · nieuwe tekenobjecten (lichte remake, fase 1, 25 okt 2026). Kandidaat voor bibliotheek/lib_bio.js.
// Vereist lib.js (C, rgba, lighten, lerp, ease, clamp, text, metaText, naamBij, roundRect, shape), _mixHex (lib_cast.js).
//
// CHROMATIDE MET ARMEN. Recept (bron: OpenStax Biology 2e § 10.2 en 11.1; Pierce, Genetics Essentials § 2.x):
//  - een chromatide = één DNA-molecuul, opgerold; twee zusterchromatiden vast bij het centromeer (cohesine).
//  - centromeer niet in het midden (cen ≈ 0,38 bij het lange paar, 0,30 bij het korte); de kinetochoor zit aan de
//    buitenkant van het centromeer, naar de pool gericht.
//  - in de anafase gaat het centromeer vóórop en slepen de armen erachteraan (V-vorm): de trekdraad hangt aan het
//    kinetochoor, niet aan de armen. Dat is een morph van dezelfde chromatide, geen nieuwe tekening.
//  - crossing-over: twee niet-zusterchromatiden (de binnenste van een paar) wisselen het stuk voorbij het chiasma;
//    daarna bestaat één chromatide uit een stuk teal (vaderskant) en een stuk oker (moederskant). De zuster ernaast
//    blijft ongewijzigd. Kleuren zoals Chromosomen 2.1: vaderskant C.teal, moederskant C.oker.
//  Bekende fouten: X die als één staaf beweegt; chromatiden die in de anafase met de armen vóórop gaan; crossing-over
//  tussen zusterchromatiden; alle vier de chromatiden gemengd.
// =====================================================================================
const CD = { vader: C.teal, moeder: C.oker, draad: '#8FA0B5', pool: '#B8C4D6' };
const _cdk = (h, k = 0.4) => _mixHex(h, '#000000', k);

// pad van één chromatide: centromeer (cx, cy); armen omhoog (len*cen) en omlaag (len*(1-cen)) langs richting rot;
// zwaai = 0..1 hoe ver de armen naar achteren slepen; kant = +1 (beweegt naar links, armen slepen naar rechts) of -1
function cdPad(cx, cy, len, rot, o = {}) {
  const { cen = 0.38, zwaai = 0, kant = 1, bol = 0.10, n = 22 } = o; const P = [];
  const arm = (L, sgn, nn) => { const pts = []; const ang = rot + (sgn < 0 ? -Math.PI / 2 : Math.PI / 2) + sgn * -kant * zwaai * 1.15;
    for (let i = 0; i <= nn; i++) { const u = i / nn, d = u * L; const bend = Math.sin(u * Math.PI) * L * bol * (1 + zwaai); const dx = Math.cos(ang), dy = Math.sin(ang);
      pts.push([cx + dx * d + (-dy) * bend * kant * 0.6, cy + dy * d + dx * bend * kant * 0.6]); } return pts; };
  const up = arm(len * cen, -1, Math.round(n * cen)).reverse(), lo = arm(len * (1 - cen), 1, Math.round(n * (1 - cen)));
  return up.concat(lo.slice(1)); // van boven-tip (u=0) via centromeer naar onder-tip (u=1)
}
// teken een chromatide langs pad P met kleursegmenten segs = [[u0, u1, kleur], …]
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
// een heel chromosoom (X): twee zusterchromatiden; uiteen 0 = vast, 1 = los; kin = kinetochoren tonen;
// ringen = cohesine (goud-grijze ringen (Kamiel 25 okt 2026: niet oker, dat is moederskant)) 0..1; segsL / segsR = kleuren per zuster; zwaaiL/R en dxL/R voor de anafase
function cdChromosoom(ctx, x, y, len, o = {}) {
  const { w = 18, cen = 0.38, kl = CD.vader, segsL = null, segsR = null, uiteen = 0, a = 1, kin = false, ringen = 0, dxL = 0, dxR = 0, zwaai = 0, rot = 0, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
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
// delende cel (Micro): rond/ovaal membraan dat in het midden insnoert; spoelfiguur met polen; rustige textuur
function cdCel(ctx, cx, cy, rx, ry, o = {}) {
  const { insnoer = 0, a = 1, polen = 0, kern = 0, seed = 3, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const pad = () => { ctx.beginPath(); for (let i = 0; i <= 120; i++) { const an = i / 120 * 6.283, c = Math.cos(an), s = Math.sin(an); const pinch = 1 - insnoer * 0.92 * Math.exp(-Math.pow(c / 0.32, 2)); const wob = 1 + 0.008 * Math.sin(an * 5 + t * 0.7 + seed);
    const X = cx + c * rx * wob, Y = cy + s * ry * pinch * wob; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.closePath(); };
  pad(); ctx.fillStyle = rgba('#2A3448', 0.6); ctx.fill();
  ctx.save(); pad(); ctx.clip(); for (let i = 0; i < 160; i++) { const X = cx + (hash(i * 3 + seed) - 0.5) * rx * 2, Y = cy + (hash(i * 7 + seed) - 0.5) * ry * 2; ctx.beginPath(); ctx.arc(X, Y, 1.6, 0, 6.283); ctx.fillStyle = rgba(C.grain, 0.12); ctx.fill(); } ctx.restore();
  pad(); ctx.strokeStyle = C.er; ctx.lineWidth = 2.2; ctx.stroke(); ctx.save(); ctx.translate(cx, cy); ctx.scale(0.985, 0.975); ctx.translate(-cx, -cy); pad(); ctx.strokeStyle = rgba(C.er, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  ctx.restore();
}
function cdPool(ctx, x, y, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(CD.draad, 0.5); ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) { const an = k / 14 * 6.283; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 10, y + Math.sin(an) * 10); ctx.lineTo(x + Math.cos(an) * 34, y + Math.sin(an) * 34); ctx.stroke(); }
  // centrosoom: twee centriolen haaks op elkaar
  roundRect(ctx, x - 9, y - 4, 18, 8, 3); shape(ctx, '#C9B896', '#E6D9B8', 1); roundRect(ctx, x - 4, y - 12, 8, 18, 3); shape(ctx, '#B8A57E', '#E6D9B8', 1); ctx.restore(); }
// trekdraad van pool naar een punt (licht gebogen)
function cdDraad(ctx, px, py, x, y, a = 1, kl = CD.draad, lw = 1.4) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo((px + x) / 2, (py + y) / 2 + (y - py) * 0.12, x, y); ctx.stroke(); ctx.restore(); }

// MODELCEL 2n = 4: lang paar (len 1) en kort paar (len 0.62); per chromosoom: paar, kant (vader/moeder)
const MODEL4 = [{ p: 'L', k: 'vader' }, { p: 'L', k: 'moeder' }, { p: 'K', k: 'vader' }, { p: 'K', k: 'moeder' }];
const cdLen = (p, L) => (p === 'L' ? L : L * 0.62), cdCen = (p) => (p === 'L' ? 0.38 : 0.30);

// ÉÉN CHROMATIDE los (na de anafase, of in een geslachtscel): pad + kinetochoor aan de kant van de pool
function cdEen(ctx, x, y, len, o = {}) {
  const { w = 14, cen = 0.38, rot = 0, zwaai = 0, kant = 1, segs = null, kl = CD.vader, a = 1, kin = false } = o; if (a <= 0.01) return;
  const P = cdPad(x, y, len, rot, { cen, zwaai, kant }); cdChromatide(ctx, P, w, segs || [[0, 1, kl]], { a });
  if (kin) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - kant * w * 0.62 - w * 0.16, y - w * 0.5, w * 0.32, w, 3); shape(ctx, '#3A3F55', '#9AA3C2', 1.2); ctx.restore(); }
  return P;
}
// CONDENSEREN ALS MORPH (C8): dezelfde draad gaat van een losse kronkel (c = 0, chromatine) naar een opgerolde chromatide
// (c = 1). dubbel = twee zusterdraden naast elkaar (na de S-fase). Elk punt van de draad schuift naar een punt op de chromatide.
function _cdKronkel(n, seed, R) { const key = 'kr' + n + '_' + seed + '_' + Math.round(R); if (_bioPolyCache[key]) return _bioPolyCache[key];
  const P = []; let x = 0, y = -R * 0.6, an = hash(seed) * 6.283; for (let k = 0; k < n; k++) { an += (hash(seed * 31 + k * 7) - 0.5) * 1.6 + Math.sin(k * 0.5 + seed) * 0.25; const st = R * 0.11;
    let nx = x + Math.cos(an) * st, ny = y + Math.sin(an) * st; const d = Math.hypot(nx, ny); if (d > R) { an += Math.PI * 0.7; nx = x + Math.cos(an) * st; ny = y + Math.sin(an) * st; } x = nx; y = ny; P.push([x, y]); }
  _bioPolyCache[key] = P; return P; }
function cdKluwen(ctx, x, y, len, o = {}) {
  const { c = 0, dubbel = true, w = 16, cen = 0.38, rot = 0, kl = CD.vader, segsL = null, segsR = null, a = 1, seed = 1, R = len * 0.55, hl = 0, xv = 0 } = o; if (a <= 0.01) return;
  const e = ease(c), gap = w * 0.52;
  const doel = [cdPad(x - (dubbel ? gap : 0), y, len, rot, xv > 0 && dubbel ? { cen, zwaai: xv, kant: -1, bol: 0 } : { cen }), cdPad(x + gap, y, len, rot, xv > 0 ? { cen, zwaai: xv, kant: 1, bol: 0 } : { cen })];
  const n = doel[0].length, K = _cdKronkel(n, seed, R);
  const strengen = dubbel ? [0, 1] : [0];
  strengen.forEach(s => { const P = doel[s].map((q, k) => { const kx = x + K[k][0] + s * 5, ky = y + K[k][1] + s * 6; return [lerp(kx, q[0], e), lerp(ky, q[1], e)]; });
    const segs = (s ? segsR : segsL) || [[0, 1, kl]];
    if (e < 0.5) { ctx.save(); ctx.globalAlpha *= a; segs.forEach(([u0, u1, k2]) => { const i0 = Math.round(u0 * (n - 1)), i1 = Math.round(u1 * (n - 1)); dnaDraad(ctx, P.slice(i0, i1 + 1), { w: lerp(3, w * 0.5, e * 2), kleur: k2, donker: _cdk(k2) }); }); ctx.restore(); }
    else cdChromatide(ctx, P, lerp(w * 0.5, w, (e - 0.5) * 2), segs, { a, coils: e > 0.85 }); });
  if (e > 0.7 && dubbel) { ctx.save(); ctx.globalAlpha *= a * (e - 0.7) / 0.3; ctx.beginPath(); ctx.arc(x, y, w * 0.48, 0, 6.283); ctx.fillStyle = _cdk(kl, 0.5); ctx.fill(); ctx.restore(); }
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= a * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(x, y + len * (0.5 - cen) * e, lerp(R * 1.05, w * 2.4, e), lerp(R * 1.05, len * 0.62, e), 0, 0, 6.283); ctx.stroke(); ctx.restore(); }
}
// kernmembraan dat in blaasjes uiteenvalt (v 0 = heel, 1 = weg) of weer terugkomt
function cdKernmembraan(ctx, x, y, r, v = 0, a = 1) { if (a <= 0.01 || v >= 0.99) return; ctx.save(); ctx.globalAlpha *= a * (1 - v * 0.6);
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.18 * (1 - v)); ctx.fill();
  const n = 26; for (const f of [1, 0.965]) for (let k = 0; k < n; k++) { const a0 = k / n * 6.283, len = (6.283 / n) * (1 - 0.15 - v * 0.7); const dr = v * 22 * (hash(k * 3) - 0.3);
    ctx.beginPath(); ctx.arc(x, y, r * f + dr, a0, a0 + len); ctx.strokeStyle = C.kernR; ctx.lineWidth = 2.4; ctx.stroke(); }
  ctx.restore(); }
// teller rechtsboven: model en mens naast elkaar
function cdTeller(ctx, regels, a = 1, x = 1480, y = 150) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = 46 + regels.length * 44;
  roundRect(ctx, x - 20, y - 50, 360, h, 14); shape(ctx, rgba(C.bgSchema, 0.92), rgba(C.line, 0.6), 1.2);
  regels.forEach(([lab, val, kl], i) => { metaText(ctx, lab, x, y + i * 44, C.text2, 'left', 22); text(ctx, val, x + 320, y + 4 + i * 44, fTekst(34, 700), kl || C.text, 'right'); }); ctx.restore(); }
// maximale zwaai zodat de armen van een losse chromatide de middellijn niet kruisen (afstand = centromeer tot middellijn)
function cdZwaaiMax(afstand, armLen, w) { return Math.asin(clamp((afstand - w * 0.75) / Math.max(1, armLen), 0, 1)) / 1.15; }
