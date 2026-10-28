// DEFINITIEF (inbouw 28 okt 2026): variant A, ongewijzigd overgenomen. Recept hieronder.
// BACTERIËN VAN SOA'S — variant A 'kurkentrekker, duidelijk insluitsel, gedeelde schaal' (27 okt 2026).
// Recepten:
// GONOKOK (Neisseria gonorrhoeae): gramnegatieve diplokok, twee koffieboonvormige kokken met de platte kanten
//   naar elkaar, samen ± 1,5 × 0,8 µm (OpenStax Microbiology 3.3: diplococcus = 'a pair of two cocci').
// CHLAMYDIA (C. trachomatis): leeft alleen ín lichaamscellen; het insluitsel (eigen membraan, dubbele lijn)
//   ligt naast de kern en zit vol kleine, dichte elementaire lichaampjes (± 0,3 µm, besmettelijk) en grotere,
//   lichte reticulaire lichaampjes (± 1 µm, delen zich); groei 0..1 laat het insluitsel groeien en de RB's
//   omzetten in EB's; barst 0..1: de cel scheurt en de EB's komen vrij.
// SYFILIS (Treponema pallidum): spirocheet, dun (± 0,15 µm) en lang (6–15 µm), 6–14 strakke windingen; een
//   echte schroef (kurkentrekker): windingen voor (dik, licht) en achter (dun, donker) wisselen af; de flagellen
//   liggen binnen het omhulsel en laten het lichaam draaien (OpenStax Microbiologie 4.3).
// SCHAAL: een lichaamscel ± 15–20 µm; gonokok ± 1,5 µm (± 1/12 van de cel); spirocheet 10 µm lang maar dunner
//   dan een gonokok. Zet ze in één beeld op deze verhouding, of label 'vergroot'.
// Bekende fouten: alle bacteriën als staafjes; spirocheet als vlakke sinuslijn; insluitsel en kern als gelijke
//   doorzichtige vlekken.
// Aanroepen zoals voorheen: gonokok(ctx, x, y, s, rot, {a, col, dood, deel}); chlamydiaCel(ctx, x, y, r, {a, t,
//   groei, barst}); spirocheet(ctx, x, y, len, {a, t, rot, col, dood, n}).
function gonokok(ctx, x, y, s = 1, rot = 0, o = {}) {
  const { a = 1, col = C.koraal, dood = 0, deel = 0 } = typeof o === 'number' ? { a: o } : o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
  const c = dood > 0.5 ? '#6A7488' : col; const gap = (2 + 10 * deel) * s; const boon = (sd) => { ctx.save(); ctx.translate(sd * (gap / 2 + 9 * s), 0); ctx.scale(sd, 1);
    ctx.beginPath(); ctx.moveTo(-9 * s, -12 * s); ctx.bezierCurveTo(4 * s, -16 * s, 13 * s, -8 * s, 13 * s, 0); ctx.bezierCurveTo(13 * s, 8 * s, 4 * s, 16 * s, -9 * s, 12 * s); ctx.quadraticCurveTo(-11 * s, 0, -9 * s, -12 * s); ctx.closePath();
    if (dood > 0.01 && dood < 1) { ctx.setLineDash([5 * s, 4 * s]); } shape(ctx, rgba(c, 0.55 * (1 - 0.5 * dood)), c, 2 * s); ctx.setLineDash([]);
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-2 * s + (k % 2) * 7 * s, -5 * s + Math.floor(k / 2) * 9 * s, 1.4 * s, 0, 6.283); ctx.fillStyle = rgba('#F2F2EE', 0.45); ctx.fill(); } ctx.restore(); };
  boon(-1); boon(1); ctx.restore();
}
function chlamydiaCel(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, groei = 1, barst = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const b = clamp(barst, 0, 1), g = clamp(groei, 0, 1);
  // lichaamscel: neutraal cytoplasma, membraan dat bij barsten opengaat
  ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fillStyle = rgba('#2A3448', 0.85 * (1 - 0.6 * b)); ctx.fill();
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.5, r * 0.025); ctx.beginPath(); const gat = b * 1.2; ctx.arc(x, y, r, -0.6 + gat / 2, -0.6 - gat / 2 + 6.283); ctx.stroke();
  // kern: paars, eigen rand, kernlichaampje; wordt door het insluitsel opzij gedrukt
  const kx = x + r * lerp(0.3, 0.45, g), ky = y - r * lerp(0.15, 0.3, g), kr = r * lerp(0.3, 0.24, g);
  ctx.beginPath(); ctx.ellipse(kx, ky, kr, kr * lerp(0.9, 0.7, g), 0.5, 0, 6.283); shape(ctx, rgba(C.kern, 0.85), C.kernR, Math.max(1, r * 0.015));
  ctx.beginPath(); ctx.arc(kx - kr * 0.2, ky + kr * 0.1, kr * 0.25, 0, 6.283); ctx.fillStyle = '#4A3A78'; ctx.fill();
  // insluitsel: eigen membraan (dubbele lijn), RB's groot en licht, EB's klein en dicht
  const ir = r * lerp(0.15, 0.55, g), ix = x - r * 0.2, iy = y + r * 0.12;
  if (b < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - b; ctx.beginPath(); ctx.arc(ix, iy, ir, 0, 6.283); ctx.fillStyle = rgba('#3A3448', 0.9); ctx.fill(); ctx.strokeStyle = _mixHex(C.koraal, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1, r * 0.012); ctx.stroke(); ctx.beginPath(); ctx.arc(ix, iy, ir - Math.max(2, r * 0.025), 0, 6.283); ctx.stroke(); ctx.restore(); }
  const n = Math.round(lerp(4, 60, g)); const rb = Math.max(2.5, r * 0.055), eb = Math.max(1.4, r * 0.022);
  for (let k = 0; k < n; k++) { const an = hash(k * 7 + 1) * 6.283, d = Math.sqrt(hash(k * 7 + 2)) * (ir - rb * 1.4); const isEB = hash(k * 3.3) < lerp(0.1, 0.75, g);
    const uit = isEB ? b * r * (0.5 + 0.9 * hash(k)) : 0; const dir = -0.6 + (hash(k * 5) - 0.5) * 1.6; const px = ix + Math.cos(an) * d + Math.cos(dir) * uit + Math.sin(t * 2 + k) * r * 0.004, py = iy + Math.sin(an) * d + Math.sin(dir) * uit;
    if (!isEB && b > 0.5) continue; ctx.beginPath(); ctx.arc(px, py, isEB ? eb : rb, 0, 6.283); if (isEB) { ctx.fillStyle = C.koraal; ctx.fill(); } else shape(ctx, rgba(C.koraal, 0.25), _mixHex(C.koraal, '#FFFFFF', 0.3), 1); }
  ctx.restore();
}
function spirocheet(ctx, x, y, len, o = {}) {
  const { a = 1, t = 0, rot = 0, col = C.koraal, dood = 0, n = 9 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round';
  const c = dood > 0.5 ? '#6A7488' : col; const ph = dood > 0.5 ? 0 : t * 6; const amp = len * 0.05, dik = Math.max(1.4, len * 0.016); const N = n * 24;
  const pt = i => { const u = i / N, w = u * n * 6.283 - ph; return [(u - 0.5) * len + Math.cos(w) * amp * 0.35, Math.sin(w) * amp, Math.cos(w)]; }; // lichte schuinte: lussen = schroef
  for (const voor of [false, true]) { for (let i = 0; i < N; i++) { const p = pt(i), q = pt(i + 1); if ((p[2] > 0) !== voor) continue; ctx.strokeStyle = voor ? _mixHex(c, '#FFFFFF', 0.15) : _mixHex(c, '#1A2740', 0.45); ctx.lineWidth = voor ? dik * 1.25 : dik * 0.8; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } }
  ctx.restore();
}
