// =====================================================================================
// GOLGI-APPARAAT (stapel), doorsnede. Recept: een stapel van 4–6 platte, gebogen membraanzakken
// (cisternen), in het midden smal en aan de randen opgezwollen; de bolle kant (cis) is naar het ER en de kern
// gekeerd, de holle kant (trans) naar het celmembraan. Blaasjes uit het ER komen aan bij de ciskant en
// versmelten ermee; aan de transkant snoeren blaasjes af van de opgezwollen randen, met een eiwit erin dat
// een vertakte suikerketen draagt, en reizen naar het membraan. Cis iets lichter (ER-kleur erin), trans in
// de volle golgikleur. Maat ± 1 µm breed; blaasje ± 50–100 nm.
// Bron: OpenStax Biology 2e § 4.4 (reeks platte membraanzakken; de kant het dichtst bij het ER heet cis;
// ER-blaasjes versmelten met de ciskant; blaasjes van de transkant versmelten met het plasmamembraan).
// Bekende fouten: losse, rechte streepjes; geen richting (cis/trans); blaasjes die zomaar verdwijnen.
// Gebruik: golgiStapel(ctx, x, y, s, { a, t, rot = 0, n = 5, blaasjes = true }). Lokaal: cis onder (+y),
//   trans boven (−y); draai met rot zodat +y naar de kern wijst. Ontwerpmaat 260 × 160 bij s = 1.
//   Animatie met t (periode 6 s): ER-blaasje komt aan en versmelt (cis), een blaasje snoert af (trans).
// Geeft ankerpunten terug: { stapel, cis, trans, blaasjeIn, blaasjeUit }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease; uit lib_bio.js: _mixHex.
// =====================================================================================
function golgiStapel(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, n = 5, blaasjes = true } = o;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const pitch = 21, bow = 18, Wk = [104, 120, 126, 118, 98, 84], yk = (k) => ((n - 1) / 2 - k) * pitch;
  const cy = (k, lx) => yk(k) + bow * (1 - Math.pow(lx / Wk[k], 2));
  const th = (k, lx) => 3 + 4.6 * Math.pow(Math.min(1, Math.abs(lx) / Wk[k]), 6);
  const u = ((t % 6) + 6) % 6 / 6;
  // ER-blaasje (cis): reist 0–0,45, versmelt 0,45–0,6
  const eIn = ease(clamp(u / 0.45, 0, 1)), vIn = [lerp(-70, -24, eIn), lerp(118, cy(0, -24) + th(0, -24) + 6, eIn)], rIn = 6.5 * (1 - ease(clamp((u - 0.45) / 0.15, 0, 1)));
  // transblaasje: groeit aan de rand 0,25–0,55, laat los en reist 0,55–1
  const kt = n - 1, rx = Wk[kt] - 2, ry = cy(kt, rx); const groei = ease(clamp((u - 0.25) / 0.3, 0, 1)), weg = ease(clamp((u - 0.55) / 0.45, 0, 1));
  const vUit = [lerp(rx + 8, rx + 70, weg), lerp(ry - 9, ry - 95, weg)], rUit = 7 * groei;
  const anker = { stapel: P(0, cy(2, 0)), cis: P(0, cy(0, 0) + 10), trans: P(0, cy(kt, 0) - 8), blaasjeIn: P(vIn[0], vIn[1]), blaasjeUit: P(vUit[0], vUit[1]) };
  if (a <= 0.01) return anker;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const kleur = (k) => _mixHex(_mixHex(C.golgi, C.er, 0.4 * (1 - k / (n - 1))), '#1A2740', 0.3), rand = (k) => lighten(_mixHex(C.golgi, C.er, 0.4 * (1 - k / (n - 1))), 0.3);
  const cis = (k) => { const W = Wk[k], N = 40; ctx.beginPath();
    for (let i = 0; i <= N; i++) { const lx = -W + 2 * W * i / N; ctx.lineTo(lx, cy(k, lx) - th(k, lx)); }
    const ce = cy(k, W), te = th(k, W); ctx.arc(W, ce, te, -Math.PI / 2 - 0.2, Math.PI / 2 + 0.2);
    for (let i = N; i >= 0; i--) { const lx = -W + 2 * W * i / N; ctx.lineTo(lx, cy(k, lx) + th(k, lx)); }
    const cb = cy(k, -W); ctx.arc(-W, cb, te, Math.PI / 2 - 0.2, Math.PI * 1.5 + 0.2); ctx.closePath(); };
  for (let k = 0; k < n; k++) { cis(k); ctx.fillStyle = kleur(k); ctx.fill(); ctx.strokeStyle = rand(k); ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // eiwit met suikerketen (klein): kraaltjes + vertakt groen takje
  const lading = (px, py, sc) => { ctx.fillStyle = lighten(C.enzym, 0.4); for (let b = 0; b < 5; b++) { ctx.beginPath(); ctx.arc(px - 2.4 * sc + Math.cos(b * 1.9) * 1.8 * sc, py + Math.sin(b * 1.9) * 1.8 * sc, 0.9 * sc, 0, 6.283); ctx.fill(); }
    ctx.strokeStyle = C.groen; ctx.lineWidth = lw(0.9); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4 * sc, py - 3.2 * sc); ctx.moveTo(px + 2.6 * sc, py - 1.6 * sc); ctx.lineTo(px + 4.3 * sc, py - 0.4 * sc); ctx.stroke(); };
  if (blaasjes) {
    const ves = (px, py, r, vul, ring) => { ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fillStyle = vul; ctx.fill(); ctx.strokeStyle = ring; ctx.lineWidth = lw(1.3); ctx.stroke(); };
    // vaste blaasjes rond de stapel
    for (const [px, py] of [[40, 100], [-108, 74], [96, 82]]) ves(px, py, 5.5, _mixHex(C.er, '#1A2740', 0.6), C.er);
    for (const [px, py] of [[-Wk[kt] - 10, yk(kt) - 2], [-40, yk(kt) - 22], [30, yk(kt) - 34], [Wk[kt - 1] + 12, yk(kt - 1) + 2]]) { ves(px, py, 6.5, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5) lading(px, py, 1); }
    // ER-blaasje komt aan en versmelt
    if (rIn > 0.4) ves(vIn[0], vIn[1], rIn, _mixHex(C.er, '#1A2740', 0.6), C.er);
    // afsnoerend transblaasje (met nek zolang het vastzit)
    if (rUit > 0.4) { if (weg < 0.05) { ctx.beginPath(); ctx.moveTo(rx, ry - 3); ctx.quadraticCurveTo(rx + 5, ry - 6, vUit[0], vUit[1]); ctx.strokeStyle = rand(kt); ctx.lineWidth = lw(3 * (1 - groei * 0.5)); ctx.stroke(); }
      ves(vUit[0], vUit[1], rUit, _mixHex(C.ves, '#1A2740', 0.35), C.vesR); if (s > 0.5 && rUit > 5) lading(vUit[0], vUit[1], 1); }
  }
  ctx.restore();
  return anker;
}
