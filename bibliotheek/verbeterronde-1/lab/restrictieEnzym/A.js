// =====================================================================================
// RESTRICTIE-ENZYM (EcoRI): eiwit dat langs het DNA glijdt, de herkenningsplek GAATTC vindt, zich vastklemt en
// beide strengen verspringend knipt, zodat er plakkerige uiteinden (AATT) ontstaan.
// Recept (OpenStax Biology 2e § 17.1: restrictie-enzymen herkennen een vaste volgorde en knippen voorspelbaar, vaak
//  verspringend → plakkerige uiteinden die met complementaire uiteinden kunnen paren; EcoRI: G↓AATTC, homodimeer
//  van twee gelijke ketens van ± 31 kDa, 5′-overhang AATT). De plek is een palindroom: beide strengen lezen van
//  5′ naar 3′ GAATTC, daarom past één symmetrisch dimeer en knipt elke helft één streng op dezelfde plek in zijn
//  eigen leesrichting. Maten: elk eiwitdeel ± 5 nm, DNA 2 nm breed, 0,34 nm per basepaar.
//  Stappen: o.stap 0–1 glijden, 1–2 herkennen en klemmen (plek goud omrand), 2–2,5 knippen (zigzag),
//  2,5–3 loslaten, uiteinden wijken uiteen.
//  Eiwit = gevouwen keten (BEELDAFSPRAKEN), géén schaar-icoon. Een DNA-schaar alleen als metafoor in tekst.
//  Bekende fouten: rechte knip; één streng geknipt; enzym als schaar; uitsteeksels die niet AATT/TTAA zijn.
// x, y = midden van de herkenningsplek op het DNA; s = px per 0,1 nm (DNA-breedte = 20 · s px). o.stap 0..3,
// o.t, o.a. Geeft { enzym, site, knipBoven, knipOnder } terug.
// =====================================================================================
// --- eiwitketen-hulpjes (alleen voor dit object): een kluwen uit een doorlopende keten met helices (3,6 kralen per
// winding) en gestrekte stukken, gevouwen binnen een ellips; z = diepte (voor/achter) voor licht en dikte.
function _reePad(cx, cy, rx, ry, n, seed, rot = 0) { const P = [], rh = Math.min(rx, ry) * 0.13, c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) { const u = i / n * 6.283, hel = Math.floor(i / 9 + seed) % 3 !== 2;
    let px = rx * (0.78 * Math.sin(3 * u + seed) + 0.12 * Math.sin(7 * u + seed * 2)), py = ry * (0.78 * Math.sin(4 * u + seed * 0.7) + 0.12 * Math.cos(9 * u)), pz = Math.cos(3 * u + seed) * 0.6 + Math.sin(5 * u) * 0.4;
    if (hel) { const ph = i * 1.745; px += Math.cos(ph) * rh; py += Math.sin(ph) * rh * 0.55; pz += Math.sin(ph) * 0.5; }
    P.push([cx + px * c - py * s, cy + px * s + py * c, pz]); } return P; }
function _reeKralen(ctx, P, r, kleur, o = {}) { const { hl = null } = o; ctx.strokeStyle = lighten(kleur, 0.35); ctx.lineWidth = Math.max(1, r * 0.45); ctx.beginPath(); bioPad(ctx, P.map(p => [p[0], p[1]]), false); ctx.stroke();
  P.map((p, i) => i).sort((A, B) => P[A][2] - P[B][2]).forEach(i => { const p = P[i], d = (p[2] + 1) / 2; ctx.fillStyle = d > 0.5 ? lighten(kleur, 0.12 * d) : kleur; ctx.beginPath(); ctx.arc(p[0], p[1], r * (0.82 + 0.25 * d), 0, 6.283); ctx.fill(); ctx.strokeStyle = rgba(C.bgMicro, 0.35); ctx.lineWidth = 1; ctx.stroke(); }); }
function _reeLint(ctx, P, w, kleur, o = {}) { // cartoon: achterste stukken smal en donker, voorste breed en licht
  const seg = (voor) => { for (let i = 1; i < P.length; i++) { const z = (P[i][2] + P[i - 1][2]) / 2; if ((z >= 0) !== voor) continue; ctx.strokeStyle = voor ? lighten(kleur, 0.18 + 0.2 * z) : _mixHex(kleur, '#121A26', 0.35); ctx.lineWidth = voor ? w * (0.75 + 0.35 * z) : w * 0.5;
      ctx.beginPath(); const a0 = P[Math.max(0, i - 2)], a1 = P[i - 1], b1 = P[i]; ctx.moveTo((a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2); ctx.quadraticCurveTo(a1[0], a1[1], (a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2); ctx.stroke(); } };
  ctx.lineCap = 'round'; seg(false); seg(true); }
function restrictieEnzym(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 1, t = 0 } = o; const st = clamp(stap, 0, 3);
  const glij = clamp(st, 0, 1), klem = clamp(st - 1, 0, 1), knip = clamp((st - 2) / 0.5, 0, 1), los = clamp((st - 2.5) / 0.5, 0, 1);
  const bp = 3.4, L = 10, seq = 'TACCTGCAGTCGAATTCTAGCCATGGTA', iSite = 10, n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const X = (i) => x + (i - iSite - 2.5) * bp * s, yT = y - L * s, yB = y + L * s;
  const ex = x + lerp(-110, 0, ease(glij)) * s + Math.sin(t * 3) * (glij < 1 ? 2 * s : 0), ey = y, weg = ease(los) * 32 * s, ea = 1 - ease(los) * 0.8, dicht = lerp(14, 0, ease(klem)) * s;
  const uit = ease(los) * 2.2 * bp * s; const dxT = (i) => (knip >= 1 && i >= iSite + 1 ? uit : 0), dxB = (i) => (knip >= 1 && i >= iSite + 5 ? uit : 0);
  const ret = { enzym: [ex, ey], site: [X(iSite + 2.5), y], knipBoven: [X(iSite + 0.5), yT], knipOnder: [X(iSite + 4.5), yB] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  const hw = bp * s * 0.34, rw = Math.max(2.5, bp * s * 0.35), herken = klem > 0.3;
  const rug = (yy, i0, i1, dxf) => { ctx.strokeStyle = D2.oud; ctx.lineWidth = rw; ctx.beginPath(); ctx.moveTo(X(i0) - bp * s * 0.45 + dxf(i0), yy); ctx.lineTo(X(i1) + bp * s * 0.45 + dxf(i1), yy); ctx.stroke(); };
  if (knip >= 1) { rug(yT, 0, iSite, dxT); rug(yT, iSite + 1, n - 1, dxT); rug(yB, 0, iSite + 4, dxB); rug(yB, iSite + 5, n - 1, dxB); }
  else { rug(yT, 0, n - 1, dxT); rug(yB, 0, n - 1, dxB); }
  for (let i = 0; i < n; i++) { const inSite = i >= iSite && i < iSite + 6; const rand = inSite && herken ? C.goud : null;
    d2Base(ctx, X(i) + dxT(i), yT, Math.PI / 2, seq[i], L * s, hw, { rand, letter: s >= 2.5 }); d2Base(ctx, X(i) + dxB(i), yB, -Math.PI / 2, comp[seq[i]], L * s, hw, { rand, letter: s >= 2.5 }); }
  // de zigzag-knip oplichten
  if (knip > 0.01 && los < 0.7) { ctx.save(); ctx.globalAlpha *= (knip < 1 ? knip : 1 - los / 0.7); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, 1.2 * s); ctx.setLineDash([4 * s, 3 * s]); ctx.beginPath(); ctx.moveTo(X(iSite + 0.5), yT - L * s * 0.6); ctx.lineTo(X(iSite + 0.5), y); ctx.lineTo(X(iSite + 4.5), y); ctx.lineTo(X(iSite + 4.5), yB + L * s * 0.6); ctx.stroke(); ctx.restore(); }
  // homodimeer: twee gelijke ketens, puntgespiegeld om het midden van de herkenningsplek; elk knipt één streng
  ctx.save(); ctx.globalAlpha *= ea * 0.93;
  const sub = (sg) => [[-14, -24, 15, 0.8], [14, -30, 14, 2.4]].reduce((acc, [dx2, dy2, r2, sd]) => { const P = _reePad(ex + sg * dx2 * s, ey + sg * (dy2 * s - dicht - weg), r2 * s, r2 * 0.8 * s, 28, sd, sg < 0 ? Math.PI : 0); return acc.concat(P); }, []);
  _reeKralen(ctx, sub(1), Math.max(1.4, 2.6 * s), C.enzym); _reeKralen(ctx, sub(-1), Math.max(1.4, 2.6 * s), '#8A7FA8');
  if (herken) { ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, 1.2 * s); for (const [px, py] of [[X(iSite + 0.5), yT - 8 * s], [X(iSite + 4.5), yB + 8 * s]]) { ctx.beginPath(); ctx.arc(px + (ex - x), py + (py < y ? -1 : 1) * weg, 4 * s, 0, 6.283); ctx.stroke(); } }
  ctx.restore();
  ctx.restore(); return ret;
}
