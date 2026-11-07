// RODE BLOEDCEL — variant A 'echte schijfvorm, zonder glans' (27 okt 2026).
// Recept (OpenStax A&P 2e 18.4; Evans & Fung 1972 voor het profiel): ingedeukte schijf (biconcaaf), 7–8 µm
// breed, aan de rand ± 2,5 µm dik en in het midden ± 1 µm ('plump at the periphery, very thin in the center');
// geen kern. Van boven: schijf met een donkerder (dunner) midden; van opzij: halter (dikke randen, smalle
// taille). Geen glans of highlight (C1): de delle komt alleen uit het donkerder midden. In een haarvat
// (± 5–8 µm, even breed als de cel) gaan ze één voor één en buigen ze tot een parachute (kom met de bolle kant
// vooruit), ± even breed als het vat. Bekende fouten: bollen; witte glansboog; vervormde cellen die als
// stroompijltjes lezen.
// Aanroep zoals voorheen: rodeBloedcel(ctx, x, y, r, an, kant (0 boven … 1 opzij), a); bloedvat(ctx, pts, r, t, o).
function _rbcProfiel(r, ry) { // halterprofiel (Evans-Fung), r = halve breedte, ry = halve dikte aan de rand
  const P = []; const N = 28; const z = q => Math.pow(Math.max(0, 1 - q * q), 0.35) * (0.207 + 2.003 * q * q - 1.123 * q * q * q * q); const zmax = 0.62;
  for (let i = 0; i <= N; i++) { const q = -1 + 2 * i / N; P.push([q * r, -z(Math.abs(q)) / zmax * ry]); } for (let i = N - 1; i >= 1; i--) { const q = -1 + 2 * i / N; P.push([q * r, z(Math.abs(q)) / zmax * ry]); } return P;
}
function _rbcParachute(ctx, x, y, an, R) { ctx.save(); ctx.translate(x, y); ctx.rotate(an);
  ctx.beginPath(); ctx.moveTo(-R * 0.55, -R); ctx.bezierCurveTo(R * 0.35, -R * 1.02, R * 0.75, -R * 0.55, R * 0.75, 0); ctx.bezierCurveTo(R * 0.75, R * 0.55, R * 0.35, R * 1.02, -R * 0.55, R);
  ctx.bezierCurveTo(-R * 0.25, R * 0.55, -R * 0.1, R * 0.25, -R * 0.1, 0); ctx.bezierCurveTo(-R * 0.1, -R * 0.25, -R * 0.25, -R * 0.55, -R * 0.55, -R); ctx.closePath(); shape(ctx, BIO.bloed, _mixHex(BIO.bloed, '#FFFFFF', 0.2), 1);
  ctx.beginPath(); ctx.ellipse(R * 0.28, 0, R * 0.2, R * 0.55, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.3); ctx.fill(); ctx.restore(); }
function rodeBloedcel(ctx, x, y, r, an = 0, kant = 0, a = 1) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const ry = r * lerp(1, 0.34, kant); const rand = _mixHex(BIO.bloed, '#FFFFFF', 0.15);
  if (kant < 0.75) { ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); shape(ctx, BIO.bloed, rand, Math.max(1, r * 0.06));
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.52, ry * 0.52, 0, 0, 6.283); ctx.fillStyle = rgba('#6E1A1A', 0.42 * (1 - kant * 0.6)); ctx.fill(); }
  else { const f = (kant - 0.75) / 0.25; const P = _rbcProfiel(r, ry); const E = P.map(p => [p[0], Math.sign(p[1] || 1) * Math.sqrt(Math.max(0, 1 - Math.pow(p[0] / r, 2))) * ry]);
    ctx.beginPath(); bioPad(ctx, P.map((p, i) => [lerp(E[i][0], p[0], f) * 0.97, lerp(E[i][1], p[1], f)]).filter((p, i) => i % 2 === 0), true); shape(ctx, BIO.bloed, rand, Math.max(1, r * 0.06)); }
  ctx.restore();
}
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null, haarvat = false } = o; if (a <= 0.01) return;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  pad(); ctx.strokeStyle = rgba(wand, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
  pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = speed * (0.75 + 0.5 * hash(i * 7 + 1)); const u = ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) _rbcParachute(ctx, px, py, an, r * 0.92);
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}

