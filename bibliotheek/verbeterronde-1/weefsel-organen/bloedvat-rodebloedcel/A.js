// =====================================================================================
// BLOEDVAT met stroom. Recept: rode bloedcel = ingedeukte schijf, 7–8 µm breed, ± 2 µm dik; van opzij een
// halter, van boven een schijf met lichter midden; ze kantelen in de stroom en vervormen in een haarvat
// (± 5–8 µm, één voor één). Hormonen veel kleiner: stipjes die meestromen. Bekende fouten: bloedcellen als
// bollen; stroom met constante snelheid zonder spreiding.
// pts = pad (ontwerpcoördinaten op het scherm), r = halve binnendiameter.
// =====================================================================================
// v2 (beeldbank 27 okt 2026; OpenStax A&P 2e 20.1): o.wand mag ook een soort zijn: 'slagader' (dikke wand: binnenlaag,
// dikke laag glad spierweefsel met kringvormige vezels, buitenlaag bindweefsel; wand ± 0,5 × binnenstraal), 'ader' (zelfde
// lagen maar dun, ± 0,2 × binnenstraal) of 'haarvat' (alleen één laag endotheelcellen met platte kernen, binnenstraal ± die
// van een rode bloedcel). In een haarvat gaan rode bloedcellen één voor één en vervormen tot een parachute (bol vóór, holle
// achterkant), met onregelmatige tussenruimte; geen pijltjesvorm meer. Een kleurwaarde als o.wand werkt zoals in v1.
// rodeBloedcel is ongewijzigd.
function bloedvat(ctx, pts, r, t, o = {}) {
  const { a = 1, wand = BIO.vaatwand, n = 14, speed = 0.12, cel = 10, deeltjes = null } = o; if (a <= 0.01) return;
  const soort = (wand === 'slagader' || wand === 'ader' || wand === 'haarvat') ? wand : null;
  const haarvat = o.haarvat || soort === 'haarvat', wandKl = soort ? BIO.vaatwand : wand;
  const P = bioDicht(pts, 24);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const pad = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (const p of P) ctx.lineTo(p[0], p[1]); };
  const loop = (fn, stap) => { let acc = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); acc += d; if (acc >= stap) { acc = 0; fn(P[i][0], P[i][1], Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]), i); } } };
  if (soort === 'slagader' || soort === 'ader') {
    const w = r * (soort === 'slagader' ? 0.5 : 0.2);
    pad(); ctx.strokeStyle = '#D8B8A8'; ctx.lineWidth = 2 * (r + w); ctx.stroke();                       // buitenlaag (bindweefsel)
    pad(); ctx.strokeStyle = soort === 'slagader' ? '#A8443C' : '#8E4A50'; ctx.lineWidth = 2 * (r + w * 0.72); ctx.stroke(); // middenlaag (spier)
    // kringvormige spiervezels, in lengtedoorsnede als korte ovaaltjes in de middenlaag
    ctx.fillStyle = rgba('#5A1E1C', 0.55); loop((px, py, an) => { for (const z of [-1, 1]) for (let q = 0; q < (soort === 'slagader' ? 2 : 1); q++) { const off = z * (r + w * (0.22 + 0.25 * q + (soort === 'ader' ? 0.12 : 0))); ctx.beginPath(); ctx.ellipse(px - Math.sin(an) * off, py + Math.cos(an) * off, Math.max(1.2, w * 0.09), Math.max(1, w * 0.1), an, 0, 6.283); ctx.fill(); } }, Math.max(5, w * 0.3));
    pad(); ctx.strokeStyle = '#F0D8D0'; ctx.lineWidth = 2 * r + Math.max(2, r * 0.08); ctx.stroke();      // binnenlaag (endotheel)
    pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  } else if (haarvat && soort === 'haarvat') {
    pad(); ctx.strokeStyle = rgba('#E8C8C0', 0.9); ctx.lineWidth = 2 * r + Math.max(3, r * 0.35); ctx.stroke();   // één laag endotheel
    pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
    ctx.fillStyle = rgba(BIO.kern, 0.85); loop((px, py, an, i) => { const z = i % 2 ? 1 : -1, off = z * (r + Math.max(1.5, r * 0.09)); ctx.beginPath(); ctx.ellipse(px - Math.sin(an) * off, py + Math.cos(an) * off, Math.max(4, r * 0.7), Math.max(1.2, r * 0.12), an, 0, 6.283); ctx.fill(); }, Math.max(18, r * 3.2)); // platte kernen
  } else {
    pad(); ctx.strokeStyle = rgba(wandKl, 0.85); ctx.lineWidth = 2 * r + 8; ctx.stroke();
    pad(); ctx.strokeStyle = '#3A1A22'; ctx.lineWidth = 2 * r; ctx.stroke();
  }
  pad(); ctx.strokeStyle = rgba('#F0C0B0', 0.06); ctx.lineWidth = 2 * r * 0.5; ctx.stroke();
  for (let i = 0; i < n; i++) { // rode bloedcellen, gespreid in snelheid en positie
    const sp = haarvat ? speed : speed * (0.75 + 0.5 * hash(i * 7 + 1));
    const u = haarvat ? (((t * sp + i / n + (hash(i * 7 + 2) - 0.5) * 0.4 / n) % 1) + 1) % 1 : ((t * sp + hash(i * 7 + 2)) % 1 + 1) % 1;
    const [px, py, an] = bioPunt(P, u); const off = haarvat ? 0 : (hash(i * 7 + 3) * 2 - 1) * r * 0.55;
    const kant = haarvat ? 1 : 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7);
    if (haarvat) { // parachute: bolle voorkant, holle achterkant, net zo breed als het haarvat
      const L = r * 1.6, R = r * 0.9; ctx.save(); ctx.translate(px, py); ctx.rotate(an);
      ctx.beginPath(); ctx.moveTo(-L * 0.45, -R); ctx.bezierCurveTo(L * 0.25, -R * 1.02, L * 0.62, -R * 0.55, L * 0.62, 0); ctx.bezierCurveTo(L * 0.62, R * 0.55, L * 0.25, R * 1.02, -L * 0.45, R);
      ctx.quadraticCurveTo(-L * 0.18, 0, -L * 0.45, -R); ctx.closePath(); shape(ctx, BIO.bloed, lighten(BIO.bloed, 0.25), 1);
      ctx.beginPath(); ctx.ellipse(L * 0.05, 0, L * 0.16, R * 0.45, 0, 0, 6.283); ctx.fillStyle = rgba('#7A1E1E', 0.3); ctx.fill(); ctx.restore(); }
    else rodeBloedcel(ctx, px - Math.sin(an) * off, py + Math.cos(an) * off, cel, an + 0.6 * Math.sin(t + i), kant, 0.95);
  }
  if (deeltjes) { const { n: dn = 10, col = C.teal, rr = 6, sp = speed * 1.1, van = 0 } = deeltjes;
    for (let i = 0; i < dn; i++) { const u = van + (1 - van) * (((t * sp * (0.8 + 0.4 * hash(i + 50)) + hash(i + 60)) % 1 + 1) % 1); const [px, py, an] = bioPunt(P, u); const off = (hash(i + 70) * 2 - 1) * r * 0.6;
      ctx.beginPath(); ctx.arc(px - Math.sin(an) * off, py + Math.cos(an) * off, rr, 0, 6.283); shape(ctx, col, lighten(col, 0.4), 1.5); } }
  ctx.restore();
}