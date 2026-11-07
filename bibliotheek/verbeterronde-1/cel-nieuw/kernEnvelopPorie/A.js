// =====================================================================================
// KERN MET KERNENVELOP EN KERNPORIËN, doorsnede. Recept: de kern is rond (± 1/3 van de celdiameter); de
// envelop bestaat uit twee membranen (buiten en binnen) met een smalle ruimte ertussen; bij elke kernporie
// lopen buiten- en binnenmembraan in elkaar over (de rand is rond), en in de opening zit het porie-complex
// (twee blokjes aan weerszijden, draadjes naar het cytoplasma en een 'mandje' naar binnen). Op het buitenste
// membraan zitten hier en daar ribosomen (het loopt door in het ruw ER). Binnenin: chromatine als losse,
// zacht kronkelende draden, dichter tegen de rand behalve bij de poriën; een donkere nucleolus.
// mRNA (dun, sliertig, enkelstrengs) schuift met het 5'-eind voorop door een porie naar buiten.
// Bron: OpenStax Biology 2e fig. 4.10 (twee fosfolipide-dubbellagen, poriën laten stoffen erin en eruit,
// nucleolus, chromatine in het nucleoplasma); § 4.4 (ER-membraan doorlopend met de kernenvelop).
// Bekende fouten: de envelop als één lijn; poriën als stippellijn zonder dat de membranen samenkomen;
// DNA als zigzag of veer; mRNA als staafje.
// Gebruik: kernEnvelopPorie(ctx, x, y, s, { a, t, r = 150, porien = 14, mrna = -1 (0..1 = voortgang),
//   mrnaPorie = 2, nucleolus = true, ribo = true, dim }). Ontwerpmaat Ø 300 bij s = 1.
// Geeft ankerpunten terug: { kern, envelop, porie, porien[], nucleolus, chromatine, mrna, tussenruimte }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function kernEnvelopPorie(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r = 150, porien = 14, mrna = -1, mrnaPorie = 2, nucleolus = true, ribo = true } = o;
  const gap = Math.max(7, r * 0.075), off = 0.31; const pf = Array.from({ length: porien }, (_, i) => off + (i + (hash(i * 5 + 2) - 0.5) * 0.35) / porien * 6.283);
  const P = (lx, ly) => [x + lx * s, y + ly * s]; const fp = pf[mrnaPorie % porien];
  const anker = { kern: P(0, 0), envelop: P(Math.cos(-1.9) * r, Math.sin(-1.9) * r), porie: P(Math.cos(fp) * r, Math.sin(fp) * r), porien: pf.map(f => P(Math.cos(f) * (r - 4), Math.sin(f) * (r - 4))),
    nucleolus: P(-r * 0.22, r * 0.12), chromatine: P(r * 0.35, r * 0.3), mrna: P(Math.cos(fp) * r * 1.35, Math.sin(fp) * r * 1.35), tussenruimte: P(Math.cos(2.6) * (r - 4), Math.sin(2.6) * (r - 4)) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * r > 90;
  const kPlasma = _mixHex(C.kern, '#2A3448', 0.45), kTus = _mixHex(C.kern, '#121A26', 0.72), kRand = C.kernR, kChrom = _mixHex(C.kernR, C.kern, 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // nucleoplasma
  ctx.beginPath(); ctx.arc(0, 0, r - gap, 0, 6.283); ctx.fillStyle = kPlasma; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r - gap - 1, 0, 6.283); ctx.clip();
  // heterochromatine: dichtere vlekken tegen het binnenmembraan, niet voor de poriën
  for (let i = 0; i < 40; i++) { const f = hash(i * 7 + 1) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.12)) continue;
    ctx.beginPath(); ctx.ellipse(Math.cos(f) * (r - gap - 5), Math.sin(f) * (r - gap - 5), 9 + hash(i) * 7, 4, f + 1.57, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.75); ctx.fill(); }
  // chromatine: losse, zacht kronkelende draden
  if (groot) { ctx.strokeStyle = rgba(kChrom, 0.55); ctx.lineWidth = lw(1.5);
    for (let k = 0; k < 14; k++) { let px = (hash(k * 3) * 2 - 1) * r * 0.55, py = (hash(k * 3 + 1) * 2 - 1) * r * 0.55, an = hash(k * 3 + 2) * 6.283; ctx.beginPath(); ctx.moveTo(px, py);
      for (let j = 0; j < 30; j++) { an += Math.sin(j * 0.5 + k * 2 + t * 0.15) * 0.35; px += Math.cos(an) * 4.4; py += Math.sin(an) * 4.4; const d = Math.hypot(px, py); if (d > r * 0.72) { an = Math.atan2(-py, -px) + Math.sin(j + k) * 0.6; } ctx.lineTo(px, py); } ctx.stroke(); } }
  // nucleolus
  if (nucleolus) { ctx.beginPath(); for (let i = 0; i <= 36; i++) { const f = i / 36 * 6.283, rr = r * 0.25 * (1 + 0.07 * Math.sin(f * 3 + 1) + 0.05 * Math.sin(f * 5)); const px = -r * 0.22 + Math.cos(f) * rr, py = r * 0.12 + Math.sin(f) * rr * 0.9; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    ctx.closePath(); ctx.fillStyle = _mixHex(C.kern, '#121A26', 0.5); ctx.fill(); ctx.strokeStyle = rgba(C.kernR, 0.5); ctx.lineWidth = lw(1); ctx.stroke(); if (groot) { ctx.fillStyle = rgba(C.kernR, 0.35); for (let i = 0; i < 30; i++) { const f = hash(i * 11) * 6.283, d = Math.sqrt(hash(i * 11 + 1)) * r * 0.2; ctx.beginPath(); ctx.arc(-r * 0.22 + Math.cos(f) * d, r * 0.12 + Math.sin(f) * d, 1.4, 0, 6.283); ctx.fill(); } } }
  ctx.restore();
  // envelop: stukken dubbel membraan tussen de poriën, met ronde rand waar buiten en binnen samenkomen
  const gh = 5.5 / r; const rc = r - gap / 2;
  for (let i = 0; i < porien; i++) { const f0 = pf[i] + gh, f1 = pf[(i + 1) % porien] + (i === porien - 1 ? 6.283 : 0) - gh;
    ctx.beginPath(); ctx.arc(0, 0, r, f0, f1); ctx.arc(Math.cos(f1) * rc, Math.sin(f1) * rc, gap / 2, f1, f1 + Math.PI); ctx.arc(0, 0, r - gap, f1, f0, true); ctx.arc(Math.cos(f0) * rc, Math.sin(f0) * rc, gap / 2, f0 + Math.PI, f0 + 2 * Math.PI); ctx.closePath();
    ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // porie-complexen
  for (let i = 0; i < porien; i++) { const f = pf[i], c = Math.cos(f), sn = Math.sin(f), tx = -sn, ty = c;
    ctx.fillStyle = '#B4A8E0'; for (const sg of [-1, 1]) { const bx = c * rc + tx * sg * (gh * r + 1.5), by = sn * rc + ty * sg * (gh * r + 1.5); ctx.beginPath(); ctx.ellipse(bx, by, gap * 0.8, 2.8, f, 0, 6.283); ctx.fill(); }
    if (groot) { ctx.strokeStyle = rgba('#B4A8E0', 0.8); ctx.lineWidth = lw(1);
      for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(c * (r + 1) + tx * sg * 4, sn * (r + 1) + ty * sg * 4); ctx.lineTo(c * (r + 9) + tx * sg * 6, sn * (r + 9) + ty * sg * 6); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(c * (r - gap) + tx * 5, sn * (r - gap) + ty * 5); ctx.lineTo(c * (r - gap - 10) + tx * 2.5, sn * (r - gap - 10) + ty * 2.5); ctx.lineTo(c * (r - gap - 10) - tx * 2.5, sn * (r - gap - 10) - ty * 2.5); ctx.lineTo(c * (r - gap) - tx * 5, sn * (r - gap) - ty * 5); ctx.stroke(); } }
  // ribosomen op het buitenste kernmembraan
  if (ribo && groot) { ctx.fillStyle = C.ribo; for (let i = 0; i < 70; i++) { const f = hash(i * 13 + 5) * 6.283; if (pf.some(q => Math.abs(((f - q + 9.42) % 6.283) - 3.14) < 0.07)) continue; ctx.beginPath(); ctx.arc(Math.cos(f) * (r + 3.6), Math.sin(f) * (r + 3.6), 1.9, 0, 6.283); ctx.fill(); } }
  // mRNA door een porie naar buiten (5'-eind voorop)
  if (mrna >= 0) { const c = Math.cos(fp), sn = Math.sin(fp), tx = -sn, ty = c; const pad = [];
    for (let i = 0; i <= 60; i++) { const u = i / 60; const d = lerp(r * 0.2, r - gap / 2, u); pad.push([c * d + tx * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u), sn * d + ty * Math.sin(u * 13 + 1) * r * 0.1 * (1 - u)]); }
    for (let i = 1; i <= 50; i++) { const u = i / 50; const d = r - gap / 2 + u * r * 0.75; pad.push([c * d + tx * Math.sin(u * 9) * 12 * u, sn * d + ty * Math.sin(u * 9) * 12 * u]); }
    const cum = [0]; for (let i = 1; i < pad.length; i++) cum.push(cum[i - 1] + Math.hypot(pad[i][0] - pad[i - 1][0], pad[i][1] - pad[i - 1][1]));
    const tot = cum[cum.length - 1], Ls = r * 0.95, kop = lerp(Ls * 0.95, tot, clamp(mrna, 0, 1)), staart = kop - Ls;
    const op = (dd) => { let i = 1; while (i < cum.length - 1 && cum[i] < dd) i++; const u = (dd - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1]); return [lerp(pad[i - 1][0], pad[i][0], u), lerp(pad[i - 1][1], pad[i][1], u)]; };
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(2); ctx.beginPath(); for (let k = 0; k <= 60; k++) { const [px, py] = op(Math.max(0, staart) + (kop - Math.max(0, staart)) * k / 60); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const [hx, hy] = op(kop); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, 6.283); ctx.fill();
    const m = op(kop - Ls * 0.3); anker.mrna = P(m[0], m[1]); }
  ctx.restore();
  return anker;
}
