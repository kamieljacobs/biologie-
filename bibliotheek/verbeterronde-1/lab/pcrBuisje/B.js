// =====================================================================================
// PCR-BUISJE (0,2 ml) in drie-kwart-aanzicht, los of als strip van 8 in een rekje, op ware maat.
// Recept (mm; productbladen 0,2 ml-buisjes, 96-wells raster 9 mm hart-op-hart):
//  - buisje ± 20 mm hoog, buitendiameter bovenaan ± 6 mm, bovenste 6 mm bijna cilindrisch, dan kegel naar een
//    ronde punt van ± 1,4 mm; binnenvolume ± 230 µl. Een mix van 20–50 µl staat alleen in de punt.
//  - echt 3D gedraaid: het profiel wordt rondgedraaid (oogpunt 28° boven het buisje), dus de rand, het
//    vloeistofoppervlak en de dop zijn ellipsen; de dop draait om het scharnier achter op de rand naar achteren.
//  - strip: buisjes 9 mm hart-op-hart, aan de rand verbonden met een dun vliesje; in het rek zakt het buisje
//    tot ± 8 mm onder de rand in een gat (het kegeldeel is dan verborgen).
//  - drie vlakke tinten (glans links, kunststof, schaduwzijde rechts), geen verloop; vloeistof teal.
//  Bekende fouten: buisjes te ver uit elkaar of te dik voor het raster; vloeistof boven in het buisje.
// x, y = midden van de bovenrand van het eerste buisje; s = px per mm. Opties: o.n (1–8 buisjes), o.rek (bool),
// o.open (getal 0..1 of lijst per buisje), o.vol (µl), o.kleur, o.hl (index van het buisje met gouden rand, −1 = geen),
// o.a. Geeft { rand: [[x,y]…], punt, vloeistof, dop } (van het eerste buisje) en o.n terug.
// =====================================================================================
function _pcrR(y) { if (y < 0) return 3.0; if (y <= 6) return lerp(3.0, 2.9, y / 6); if (y <= 19.3) return lerp(2.9, 0.72, (y - 6) / 13.3); return 0.72 * Math.sqrt(Math.max(0, 1 - (y - 19.3) / 0.8)); }
function _pcrRi(y) { return Math.max(0, _pcrR(y) - 0.3); }
function _pcrNiv(vol) { let v = 0; for (let y = 19.4; y > 0; y -= 0.05) { const r = _pcrRi(y); v += Math.PI * r * r * 0.05; if (v >= vol) return y; } return 0; }
function pcrBuisje(ctx, x, y, s, o = {}) {
  const { a = 1, n = 1, rek = false, open = 0, vol = 25, kleur = C.teal, hl = -1 } = o;
  const E = 28 * Math.PI / 180, ce = Math.cos(E), se = Math.sin(E);
  const pr = (X, Y, Z) => [X, Y * ce + Z * se]; // Y omlaag positief (diepte), Z naar de kijker
  const yN = _pcrNiv(vol);
  const ret = { rand: [], punt: [x, y + 20 * ce * s], vloeistof: [x, y + (yN + 18) / 2 * ce * s], dop: [x, y - 3 * s], n };
  for (let i = 0; i < n; i++) ret.rand.push([x + i * 9 * s, y]);
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.18) / s, L = C.er, glans = rgba('#E8EEF5', 0.30), plastic = rgba(L, 0.16), schaduw = rgba('#2A3A58', 0.55), klein = s < 4;
  const zak = 8; // diepte waarop het rek begint
  const rekX0 = -6, rekX1 = (n - 1) * 9 + 6, rekD = 6.5;
  if (rek) { // bovenvlak van het rek met gaten
    ctx.beginPath(); const q = [pr(rekX0, zak, -rekD), pr(rekX1, zak, -rekD), pr(rekX1, zak, rekD), pr(rekX0, zak, rekD)]; ctx.moveTo(...q[0]); q.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); shape(ctx, '#3A4C6E', lighten('#3A4C6E', 0.2), lw);
    for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.ellipse(i * 9, zak * ce, _pcrR(zak) + 0.25, (_pcrR(zak) + 0.25) * se, 0, 0, 6.283); ctx.fillStyle = '#1E2A40'; ctx.fill(); } }
  const opens = Array.isArray(open) ? open : Array(n).fill(open);
  for (let i = 0; i < n; i++) { const X0 = i * 9, op = clamp(opens[i] || 0, 0, 1);
    ctx.save(); ctx.translate(X0, 0);
    if (rek) { ctx.beginPath(); ctx.rect(-8, -20, 16, 20 + zak * ce); ctx.ellipse(0, zak * ce, _pcrR(zak) + 0.25, (_pcrR(zak) + 0.25) * se, 0, 0, Math.PI); ctx.clip(); }
    // dop achter het buisje als hij (half) open staat
    const dop = (achter) => { const phi = op * Math.PI * 0.62; if ((phi > 0.6) !== achter) return; // ver open: dop staat achter de rand
      for (const [dy, f] of [[-1.4, plastic], [0, rgba(L, 0.28)]]) { ctx.beginPath(); for (let k = 0; k <= 28; k++) { const u = k / 28 * 6.283, Xc = Math.cos(u) * 3.25, Zc = Math.sin(u) * 3.25;
          const Zr = -3.4 + (Zc + 3.4) * Math.cos(phi), Yr = -(Zc + 3.4) * Math.sin(phi) - 0.9 + dy * Math.cos(phi); const p = pr(Xc, Yr, Zr); k ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.closePath(); shape(ctx, f, L, lw); } };
    const strip = () => { const phi = op * Math.PI * 0.62; const p0 = pr(0, -0.2, -3.0), p1 = pr(0, -(0.15) * Math.sin(phi) - 0.9 - 0.7 * Math.cos(phi), -3.4 + 0.15 * Math.cos(phi)); ctx.strokeStyle = L; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(p0[0] + 0.0, p0[1]); ctx.quadraticCurveTo(p0[0], p0[1] - 1.6, p1[0], p1[1]); ctx.stroke(); };
    strip(); dop(true);
    // lichaam: rondgedraaid profiel
    const sil = []; for (let yy = 0; yy <= 20.1; yy += 0.4) sil.push([_pcrR(yy), yy * ce]);
    const body = () => { ctx.beginPath(); ctx.moveTo(-sil[0][0], sil[0][1]); sil.forEach(p => ctx.lineTo(-p[0], p[1])); for (let k = sil.length - 1; k >= 0; k--) ctx.lineTo(sil[k][0], sil[k][1]); ctx.closePath(); };
    body(); ctx.fillStyle = plastic; ctx.fill(); ctx.save(); body(); ctx.clip();
    ctx.fillStyle = schaduw; ctx.beginPath(); sil.forEach((p, k) => k ? ctx.lineTo(p[0] * 0.55 + p[0] * 0.45, p[1]) : ctx.moveTo(p[0], p[1])); for (let k = sil.length - 1; k >= 0; k--) ctx.lineTo(sil[k][0] * 0.45, sil[k][1]); ctx.closePath(); ctx.fill();
    if (!klein) { ctx.fillStyle = glans; ctx.beginPath(); sil.forEach((p, k) => k ? ctx.lineTo(-p[0] * 0.72, p[1]) : ctx.moveTo(-p[0] * 0.72, p[1])); for (let k = sil.length - 1; k >= 0; k--) ctx.lineTo(-sil[k][0] * 0.5, sil[k][1]); ctx.closePath(); ctx.fill(); }
    // vloeistof
    if (vol > 0.5) { const rN = _pcrRi(yN); ctx.beginPath(); ctx.moveTo(-rN, yN * ce); for (let yy = yN; yy <= 19.9; yy += 0.3) ctx.lineTo(-_pcrRi(yy), yy * ce); for (let yy = 19.9; yy >= yN; yy -= 0.3) ctx.lineTo(_pcrRi(yy), yy * ce); ctx.closePath();
      ctx.fillStyle = rgba(kleur, 0.55); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, yN * ce, rN, rN * se, 0, 0, 6.283); ctx.save(); ctx.globalAlpha *= 0.8; ctx.fillStyle = lighten(kleur, 0.3); ctx.fill(); ctx.restore(); }
    ctx.restore();
    body(); ctx.strokeStyle = hl === i ? C.goud : L; ctx.lineWidth = hl === i ? lw * 2 : lw; ctx.stroke();
    // rand (open mond) en vliesje naar het volgende buisje
    ctx.beginPath(); ctx.ellipse(0, 0, 3.0, 3.0 * se, 0, 0, 6.283); ctx.fillStyle = op > 0.05 ? rgba('#121A26', 0.6) : plastic; ctx.fill(); ctx.strokeStyle = L; ctx.lineWidth = lw; ctx.stroke();
    if (i < n - 1) { ctx.beginPath(); ctx.rect(3.0, -0.35, 3.0, 0.7); shape(ctx, rgba(L, 0.25), null); }
    dop(false);
    ctx.restore(); }
  if (rek) { // voorkant van het rek bedekt de onderkant van de buisjes
    ctx.beginPath(); const f0 = pr(rekX0, zak, rekD), f1 = pr(rekX1, zak, rekD); ctx.moveTo(...f0); ctx.lineTo(...f1); ctx.lineTo(f1[0], f1[1] + 12 * ce); ctx.lineTo(f0[0], f0[1] + 12 * ce); ctx.closePath(); shape(ctx, '#2F4060', lighten('#2F4060', 0.2), lw); }
  ctx.restore(); return ret;
}
