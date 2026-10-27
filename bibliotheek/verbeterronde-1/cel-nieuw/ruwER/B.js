// =====================================================================================
// RUW ER (met glad ER), ruimtelijk: gestapelde bladen rond de kern, schuin van boven gezien. Recept: platte
// membraanzakken (cisternen) die in lagen om de kern buigen; we zien van elk blad het bovenvlak (bezaaid met
// ribosomen, deels in spiraalvormige groepjes = polysomen) en een smalle zijkant (de dikte van de zak,
// donkerder). Het binnenste blad gaat over in het buitenste kernmembraan (ook met ribosomen). Bladen zijn met
// schroefvormige 'trappen' met elkaar verbonden; aan de uiteinden gaat het ruw ER over in het glad ER: buisjes
// zonder ribosomen. Een eiwitketen groeit vanuit een ribosoom door het membraan het lumen in.
// Bron: OpenStax Biology 2e § 4.4 (ER doorlopend met de kernenvelop; ribosomen aan de cytoplasmakant; glad
// ER doorlopend met ruw ER, weinig of geen ribosomen). De trapvorm van de verbindingen is een vormkeuze.
// Bekende fouten: ribosomen als regelmatig raster; bladen die los van de kern zweven; glad ER als losse lijnen.
// Gebruik: ruwER(ctx, x, y, s, { a, t, r0 = 120, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1,
//   keten = 0 }). (x, y) = midden van de kern, r0 = straal buitenste kernmembraan, a0..a1 = hoekbereik.
// Geeft ankerpunten terug: { ruw, glad, lumen, ribosoom, aansluiting, keten }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function ruwER(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r0 = 120, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1, keten = 0, rib = true } = o;
  const pitch = 24, half = 8.5, dikte = 4.5, rk = (k) => r0 + 18 + k * pitch;
  const wob = (k, f) => 2.4 * Math.sin(f * 6 + k * 1.3);
  const span = (k) => [a0 + 0.05 * k + hash(k * 3 + 1) * 0.06, a1 - hash(k * 3 + 2) * 0.1];
  const pol = (r, f) => [x + Math.cos(f) * r * s, y + Math.sin(f) * r * s]; const am = (a0 + a1) / 2;
  const anker = { ruw: pol(rk(1), am + 0.15), glad: pol(r0 + 40, a1 + 0.3 * glad), lumen: pol(rk(2) + half + 2, am - 0.2), ribosoom: pol(rk(lagen - 1), am - 0.35), aansluiting: pol(r0 + 6, a0 + 0.1), keten: pol(rk(lagen - 1), am) };
  if (a <= 0.01) return anker;
  const kVlak = _mixHex(C.er, '#1A2740', 0.62), kZij = _mixHex(C.er, '#1A2740', 0.8), kRand = C.er;
  const lw = (px) => Math.max(px * s, 0.6) / s; const L = (r, f) => [Math.cos(f) * r, Math.sin(f) * r];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const band = (rIn, rOut, f0, f1, k) => { const N = Math.max(10, Math.round((f1 - f0) * rOut / 6)); ctx.beginPath();
    for (let i = 0; i <= N; i++) { const f = lerp(f0, f1, i / N); const [px, py] = L(rOut + wob(k, f), f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    for (let i = N; i >= 0; i--) { const f = lerp(f0, f1, i / N); const [px, py] = L(rIn + wob(k, f), f); ctx.lineTo(px, py); } ctx.closePath(); };
  // glad ER (achter de bladen): buisjes met een lichte bovenrand
  if (glad > 0.01) { ctx.save(); ctx.globalAlpha *= clamp(glad * 1.5, 0, 1); const lijnen = [];
    for (let k = 0; k < lagen; k++) { const [, f1] = span(k); let p = L(rk(k), f1 - 0.03), f = f1 - 0.03, r = rk(k);
      for (let j = 0; j < 4; j++) { const nf = f + 0.12 * glad + hash(k * 7 + j) * 0.06, nr = r + (hash(k * 11 + j * 3) - 0.5) * 30; const q = L(nr, nf); lijnen.push([p, q]); if (hash(k + j * 5) > 0.5 && k < lagen - 1) lijnen.push([q, L(rk(k + 1) + (hash(j) - 0.5) * 10, nf + 0.05)]); p = q; f = nf; r = nr; } }
    const tube = (w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; for (const [p, q] of lijnen) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo((p[0] + q[0]) / 2 + (hash(q[0]) - 0.5) * 18, (p[1] + q[1]) / 2 + (hash(q[1]) - 0.5) * 18, q[0], q[1]); ctx.stroke(); } };
    tube(7, kRand); tube(4.6, kZij); tube(1.4, rgba(C.er, 0.5)); ctx.restore(); }
  // kernenvelop als vlak (buitenste kernmembraan), onder de bladen
  if (kern) { band(r0 - 8, r0, a0 - 0.25, a1 + 0.25, -1); ctx.fillStyle = kVlak; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.2); ctx.stroke(); }
  // bladen van binnen naar buiten (buitenste ligt bovenop): zijkant + bovenvlak
  const bladen = [];
  for (let k = 0; k < lagen; k++) { const [f0, f1] = span(k); bladen.push([k, f0, f1]);
    band(rk(k) - half - dikte, rk(k) - half, f0, f1, k); ctx.fillStyle = kZij; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1); ctx.stroke();
    band(rk(k) - half, rk(k) + half, f0, f1, k); ctx.fillStyle = kVlak; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.3); ctx.stroke();
    // ribosomen op het vlak: losse en polysoom-spiraaltjes, nooit een raster
    if (rib && s > 0.18) { ctx.fillStyle = C.ribo; const N = Math.floor((f1 - f0) * rk(k) / 5.5);
      for (let i = 0; i < N; i++) { const f = f0 + 0.02 + (f1 - f0 - 0.04) * hash(i * 13 + k * 7), r = rk(k) + (hash(i * 5 + k * 3) * 2 - 1) * (half - 2.2);
        if (keten > 0 && k === lagen - 1 && Math.abs(f - am) < 0.18) continue; const [px, py] = L(r + wob(k, f), f); ctx.beginPath(); ctx.arc(px, py, 1.5, 0, 6.283); ctx.fill(); }
      for (let g = 0; g < 3; g++) { const f = lerp(f0, f1, 0.2 + 0.3 * g + hash(k * 9 + g) * 0.1); if (keten > 0 && k === lagen - 1 && Math.abs(f - am) < 0.2) continue; const [cx, cy] = L(rk(k) + wob(k, f), f);
        for (let j = 0; j < 6; j++) { const an = j * 1.05 + k, rr = 1.5 + j * 0.75; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr * 1.5, cy + Math.sin(an) * rr, 1.5, 0, 6.283); ctx.fill(); } } }
  }
  // aansluiting kern → binnenste blad en schroeftrap tussen bladen (een gebogen strook van vlak naar vlak)
  const trap = (rA, rB, f) => { const w = 0.05; ctx.beginPath(); const p0 = L(rA, f - w), p1 = L(rB, f + w * 0.3), p2 = L(rB, f + w * 1.3), p3 = L(rA, f + w);
    ctx.moveTo(p0[0], p0[1]); ctx.quadraticCurveTo(...L((rA + rB) / 2, f - w * 0.2), p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.quadraticCurveTo(...L((rA + rB) / 2, f + w * 1.4), p3[0], p3[1]); ctx.closePath();
    ctx.fillStyle = kVlak; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1); ctx.stroke(); };
  if (kern) trap(r0 - 2, rk(0) - half + 1, a0 + 0.12);
  for (let k = 0; k < lagen - 1; k++) trap(rk(k) + half - 1, rk(k + 1) - half + 1, lerp(a0, a1, 0.25 + 0.5 * hash(k * 41 + 7)));
  if (kern && rib && s > 0.18) { ctx.fillStyle = C.ribo; for (let i = 0; i < 26; i++) { const f = a0 - 0.2 + (a1 - a0 + 0.4) * hash(i * 17), r = r0 - 4 + (hash(i * 3) - 0.5) * 5; const [px, py] = L(r, f); ctx.beginPath(); ctx.arc(px, py, 1.5, 0, 6.283); ctx.fill(); } }
  // polysoom met groeiende keten die door het vlak het lumen in gaat (onder het vlak doorschijnend)
  if (keten > 0.01) { const k = lagen - 1; ctx.strokeStyle = C.teal; ctx.lineWidth = lw(1.3); ctx.beginPath();
    for (let i = 0; i <= 30; i++) { const f = lerp(am - 0.16, am + 0.16, i / 30); const [px, py] = L(rk(k) + 2 * Math.sin(i * 0.8 + t), f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    for (let j = 0; j < 5; j++) { const f = lerp(am - 0.13, am + 0.13, j / 4); const [gx, gy] = L(rk(k) + 2 * Math.sin(j * 6 + t), f); const lengte = Math.round(clamp(keten * 1.25 - (4 - j) * 0.18, 0, 1) * 14);
      ctx.fillStyle = rgba(lighten(C.enzym, 0.35).replace(/rgb\((\d+),(\d+),(\d+)\)/, (m, r, g, b) => '#' + [r, g, b].map(v => (+v).toString(16).padStart(2, '0')).join('')), 0.45);
      for (let b = 0; b < lengte; b++) { const [px, py] = L(rk(k) - 2 - b * 0.9, f - b * 0.006 + Math.sin(b) * 0.004); ctx.beginPath(); ctx.arc(px, py, 1.1, 0, 6.283); ctx.fill(); }
      ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(gx, gy, 3.8, 3, f, 0, 6.283); ctx.fill(); ctx.fillStyle = lighten(C.ribo, 0.2); ctx.beginPath(); ctx.ellipse(gx + Math.cos(f) * 3.5, gy + Math.sin(f) * 3.5, 2.6, 2, f, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}
