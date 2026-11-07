// RESTRICTIE-ENZYM (EcoRI), verbeterronde 2 eiwitten (28 okt 2026): de twee domeinen van elke helft zijn nu een compacte
// gevouwen kralenketen (_kkKluwen, eiwitten/_hulp.js) in hetzelfde doorschijnende oppervlak, in plaats van het lint
// (_reeLint/_reePad, een lus die zichzelf vaak kruist); de klem-armen zijn een rijtje kralen (_kkPad). Vorm, plaats,
// grootte, stappen, DNA en aanroep ongewijzigd.
// Recept (OpenStax Biology 2e § 17.1: restrictie-enzymen herkennen een vaste volgorde en knippen voorspelbaar, vaak
//  verspringend → plakkerige uiteinden; EcoRI: G↓AATTC, homodimeer van twee gelijke ketens van ± 31 kDa, 5′-overhang AATT).
//  De plek is een palindroom: één symmetrisch dimeer, elke helft knipt één streng op dezelfde plek in zijn eigen
//  leesrichting. Maten: elk eiwitdeel ± 5 nm, DNA 2 nm breed, 0,34 nm per basepaar.
//  Stappen: o.stap 0–1 glijden, 1–2 herkennen en klemmen (plek goud omrand), 2–2,5 knippen (zigzag), 2,5–3 loslaten.
//  Eiwit = gevouwen keten van kralen (BEELDAFSPRAKEN), géén schaar-icoon. Klem: na herkenning slaat elke helft een smalle
//  arm vóór het DNA langs (Kim e.a. 1986; Wikipedia EcoRI).
//  Bekende fouten: rechte knip; één streng geknipt; enzym als schaar; uitsteeksels die niet AATT/TTAA zijn; lint.
// x, y = midden van de herkenningsplek op het DNA; s = px per 0,1 nm. o.stap 0..3, o.t, o.a. Geeft { enzym, site, knipBoven, knipOnder } terug.
// (_reePad, _reeKralen en _reeLint worden niet meer gebruikt; mogen uit lib_bio.js als niets anders ze aanroept)
function restrictieEnzym(ctx, x, y, s, o = {}) {
  const { a = 1, stap = 1, t = 0 } = o; const st = clamp(stap, 0, 3);
  const glij = clamp(st, 0, 1), klem = clamp(st - 1, 0, 1), knip = clamp((st - 2) / 0.5, 0, 1), los = clamp((st - 2.5) / 0.5, 0, 1);
  const bp = 3.4, L = 10, seq = 'TACCTGCAGTCGAATTCTAGCCATGGTA', iSite = 11, /* index van de G in GAATTC */ n = seq.length, comp = { A: 'T', T: 'A', C: 'G', G: 'C' };
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
  for (const [sg, kl] of [[1, C.enzym], [-1, '#8A7FA8']]) { const cx2 = ex, cy2 = ey + sg * (-27 * s - dicht - weg); ctx.beginPath(); const hp = []; for (let k = 0; k < 14; k++) { const u = k / 14 * 6.283; hp.push([cx2 + Math.cos(u) * 40 * s, cy2 + Math.sin(u) * 22 * s * (1 + 0.1 * Math.sin(u * 3))]); } bioPad(ctx, hp, true); ctx.fillStyle = rgba(kl, 0.22); ctx.fill(); ctx.strokeStyle = rgba(lighten(kl, 0.3), 0.5); ctx.lineWidth = 1.5; ctx.stroke();
    [[-14, -24, 15, 0.8], [14, -30, 14, 2.4]].forEach(([dx2, dy2, r2, sd]) => { const E = _ellips(r2, r2 * 0.8); _kkKluwen(ctx, ex + sg * dx2 * s, ey + sg * (dy2 * s - dicht - weg), E.binnen, { bbox: E.bbox, sc: s, r: 2.4, col: kl, seed: Math.round(sd * 10) + (sg > 0 ? 0 : 5), rot: sg < 0 ? Math.PI : 0, key: 'ree' + dx2 }); }); }
  // klem (herstel 28 okt 2026; Kim e.a. 1986 Science + Wikipedia EcoRI: elke helft slaat een 'arm' om het DNA): na herkenning
  // steekt elke helft één smalle arm (rijtje kralen) vóór het DNA langs naar de overkant; bij loslaten trekken de armen terug
  const armA = ease(clamp(klem * 1.5, 0, 1)) * (1 - ease(los));
  if (armA > 0.01) { ctx.save(); ctx.globalAlpha *= armA; for (const [sg, kl] of [[1, C.enzym], [-1, '#8A7FA8']]) { const ax = ex - sg * 30 * s, ay = ey - sg * 4 * s; _kkPad(ctx, [[ax + sg * 3 * s, ay + sg * 26 * s], [ax - sg * 3 * s, ay + sg * 8 * s], [ax + sg * 3 * s, ay - sg * 10 * s], [ax, ay - sg * 26 * s]], Math.max(2, 2.4 * s), kl, { stap: 2 }); }; ctx.restore(); }
  if (herken) { ctx.fillStyle = C.goud; for (const [px, py] of [[X(iSite + 0.5), yT - 8 * s], [X(iSite + 4.5), yB + 8 * s]]) { ctx.beginPath(); ctx.arc(px + (ex - x), py + (py < y ? -1 : 1) * weg, 3.5 * s, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  ctx.restore(); return ret;
}
