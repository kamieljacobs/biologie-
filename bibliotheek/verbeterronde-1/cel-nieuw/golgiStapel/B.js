// =====================================================================================
// GOLGI-APPARAAT (stapel), ruimtelijk: schuin van boven gezien als een stapel platte, licht holle schijven.
// Recept: 4–6 cisternen boven elkaar; elke schijf heeft een bovenvlak (licht) en een smalle zijkant
// (donker, de dikte van de zak); de randen zijn opgezwollen en aan de transkant doorbroken (gaatjes,
// buisjesnet) waar blaasjes afsnoeren. De onderste schijf (cis, lichter, ER-kleur erin) ligt naar het ER en
// de kern; de bovenste (trans, volle golgikleur) naar het celmembraan. ER-blaasjes komen onder aan, versmelten;
// boven snoert een blaasje af met een eiwit met suikerketen erin en reist weg.
// Bron: OpenStax Biology 2e § 4.4 (platte membraanzakken; cis het dichtst bij het ER; blaasjes van ER naar cis,
// van trans naar het plasmamembraan).
// Bekende fouten: een stapel zonder richting; schijven die elkaar raken zonder ruimte; regelmatige gaatjes.
// Gebruik: golgiStapel(ctx, x, y, s, { a, t, rot = 0, n = 5, blaasjes = true }). Lokaal: cis onder (+y),
//   trans boven (−y). Ontwerpmaat 260 × 160 bij s = 1. Animatie met t (periode 6 s).
// Geeft ankerpunten terug: { stapel, cis, trans, blaasjeIn, blaasjeUit }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
function golgiStapel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, n = 5, blaasjes = true } = o;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const pitch = 19, Wk = [100, 116, 124, 118, 104, 90], yk = (k) => ((n - 1) / 2 - k) * pitch + 4, dik = 5.5, RY = 0.27;
  const u = ((t % 6) + 6) % 6 / 6; const kt = n - 1;
  const eIn = ease(clamp(u / 0.45, 0, 1)), vIn = [lerp(-80, -30, eIn), lerp(110, yk(0) + Wk[0] * RY + dik + 6, eIn)], rIn = 6.5 * (1 - ease(clamp((u - 0.45) / 0.15, 0, 1)));
  const rx = Wk[kt] * 0.98, ry = yk(kt); const groei = ease(clamp((u - 0.25) / 0.3, 0, 1)), weg = ease(clamp((u - 0.55) / 0.45, 0, 1));
  const vUit = [lerp(rx + 6, rx + 66, weg), lerp(ry - 6, ry - 92, weg)], rUit = 7 * groei;
  const anker = { stapel: P(0, yk(2)), cis: P(0, yk(0) + Wk[0] * RY + 10), trans: P(0, yk(kt) - 6), blaasjeIn: P(vIn[0], vIn[1]), blaasjeUit: P(vUit[0], vUit[1]) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const basis = (k) => _mixHex(C.golgi, C.er, 0.4 * (1 - k / (n - 1)));
  const rand = (W, cyy, k) => { ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i / 60 * 6.283; const wob = 1 + 0.025 * Math.sin(an * 5 + k * 2) + 0.02 * Math.sin(an * 9 + k); const px = Math.cos(an) * W * wob, py = cyy + Math.sin(an) * W * RY * wob; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  for (let k = 0; k < n; k++) { const W = Wk[k], c0 = yk(k), b = basis(k);
    // zijkant (dikte): onderste helft van de rand, iets omlaag
    rand(W, c0 + dik, k); ctx.fillStyle = _mixHex(b, '#121A26', 0.55); ctx.fill(); ctx.strokeStyle = lighten(b, 0.2); ctx.lineWidth = lw(1.1); ctx.stroke();
    rand(W, c0, k); ctx.fillStyle = _mixHex(b, '#1A2740', 0.15); ctx.fill(); ctx.strokeStyle = lighten(b, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
    // holte in het midden (schijf licht hol)
    ctx.beginPath(); ctx.ellipse(-W * 0.04, c0 + 1.5, W * 0.62, W * RY * 0.55, 0, 0, 6.283); ctx.fillStyle = _mixHex(b, '#1A2740', 0.32); ctx.fill();
    // gaatjes (fenestratie) in de rand, meer naar de transkant
    const ng = Math.round(2 + 6 * k / (n - 1)); ctx.fillStyle = _mixHex(b, '#121A26', 0.6);
    for (let g = 0; g < ng; g++) { const an = hash(k * 19 + g * 7) * 6.283; const rr = 0.8 + 0.12 * hash(g * 3 + k); ctx.beginPath(); ctx.ellipse(Math.cos(an) * W * rr, c0 + Math.sin(an) * W * RY * rr, 3.4 + hash(g) * 2, 1.6, 0, 0, 6.283); ctx.fill(); } }
  const lading = (px, py, sc) => { ctx.fillStyle = lighten(C.enzym, 0.4); for (let b = 0; b < 5; b++) { ctx.beginPath(); ctx.arc(px - 2.4 * sc + Math.cos(b * 1.9) * 1.8 * sc, py + Math.sin(b * 1.9) * 1.8 * sc, 0.9 * sc, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = C.groen; ctx.lineWidth = lw(0.9); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4 * sc, py - 3.2 * sc); ctx.moveTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4.3 * sc, py - 0.4 * sc); ctx.stroke(); };
  if (blaasjes) { const ves = (px, py, r, vul, ring) => { ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = ring; ctx.lineWidth = lw(1.3); ctx.stroke(); ctx.beginPath(); ctx.arc(px - r * 0.3, py - r * 0.3, r * 0.35, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.12); ctx.fill(); };
    for (const [px, py] of [[40, 96], [-112, 72], [100, 80]]) ves(px, py, 5.5, _mixHex(C.er, '#1A2740', 0.6), C.er);
    for (const [px, py] of [[-Wk[kt] - 8, yk(kt) - 2], [-40, yk(kt) - 34], [30, yk(kt) - 40], [Wk[kt - 1] + 10, yk(kt - 1) + 4]]) { ves(px, py, 6.5, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5) lading(px, py, 1); }
    if (rIn > 0.4) ves(vIn[0], vIn[1], rIn, _mixHex(C.er, '#1A2740', 0.6), C.er);
    if (rUit > 0.4) { if (weg < 0.05) { ctx.beginPath(); ctx.moveTo(rx - 2, ry); ctx.lineTo(vUit[0], vUit[1]); ctx.strokeStyle = lighten(basis(kt), 0.35); ctx.lineWidth = lw(3 * (1 - groei * 0.5)); ctx.stroke(); }
      ves(vUit[0], vUit[1], rUit, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5 && rUit > 5) lading(vUit[0], vUit[1], 1); } }
  ctx.restore();
  return anker;
}
