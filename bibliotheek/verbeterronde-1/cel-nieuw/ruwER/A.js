// =====================================================================================
// RUW ER (met glad ER), doorsnede rond de kern. Recept: platte membraanzakken (cisternen) die in een paar
// lagen om de kern heen buigen; de ruimte binnenin (lumen) loopt door in de ruimte tussen de twee
// kernmembranen: het buitenste kernmembraan gaat over in het eerste ER-blad. Ribosomen zitten aan de
// cytoplasmakant (op beide vlakken van een blad, en op het buitenste kernmembraan), nooit in het lumen.
// Bladen zijn hier en daar met elkaar verbonden; aan de uiteinden gaat het ruw ER over in het glad ER: een
// netwerk van buisjes zonder ribosomen. Een eiwit groeit vanuit een ribosoom (op een mRNA-draad, polysoom)
// door het membraan het lumen in, vouwt daar en krijgt een suikerketen.
// Maten: lumen ± 30–60 nm, ribosoom ± 25 nm; hier lumen 9, ribosoom-Ø 5 ontwerpeenheden.
// Bron: OpenStax Biology 2e § 4.4 (ER-membraan doorlopend met kernenvelop; ribosomen op de cytoplasmakant;
// eiwitten vouwen en krijgen zijketens in het lumen; glad ER doorlopend met ruw ER, weinig of geen ribosomen).
// Bekende fouten: ER als losse golflijntjes naast de kern; ribosomen in het lumen; glad ER los in de cel.
// Gebruik: ruwER(ctx, x, y, s, { a, t, r0 = 120, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1,
//   keten = 0 }). (x, y) = midden van de kern (krommingsmiddelpunt), r0 = straal buitenste kernmembraan,
//   a0..a1 = hoekbereik (rad, canvashoeken), glad 0..1 = hoeveel glad ER, keten 0..1 = eiwit groeit.
// Geeft ankerpunten terug: { ruw, glad, lumen, ribosoom, aansluiting, keten }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function ruwER(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r0 = 120, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1, keten = 0, rib = true } = o;
  const th = 4.5, pitch = 24, rk = (k) => r0 + 17 + k * pitch;
  const wob = (k, f) => 2.6 * Math.sin(f * 7 + k * 1.7) + 1.6 * Math.sin(f * 13 + k);
  const span = (k) => [a0 + 0.04 * k + hash(k * 3 + 1) * 0.08, a1 - hash(k * 3 + 2) * 0.12 - (k === lagen - 1 ? 0.04 : 0)];
  const pol = (r, f) => [x + Math.cos(f) * r * s, y + Math.sin(f) * r * s];
  const am = (a0 + a1) / 2;
  const sR = (lagen - 1) * pitch + r0 + 17;
  const anker = { ruw: pol(rk(1), am + 0.15), glad: pol(r0 + 17 + pitch * 1.5, a1 + 0.38 * glad), lumen: pol(rk(2), am - 0.2), ribosoom: pol(rk(lagen - 1) + 8, am - 0.35),
    aansluiting: pol(r0 + 8, a0 + 0.18), keten: pol(sR + 10, am) };
  if (a <= 0.01) return anker;
  const kLumen = _mixHex(C.er, '#1A2740', 0.72), kRand = C.er;
  const lw = (px) => Math.max(px * s, 0.6) / s;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = (r, f) => [Math.cos(f) * r, Math.sin(f) * r];
  const thk = (k) => (keten > 0 && k === lagen - 1) ? th * 1.35 : th;
  // ---- vorm van één cisterne als gesloten pad (met ronde uiteinden)
  const cisPad = (k, f0, f1) => { const T = thk(k); const N = Math.max(8, Math.round((f1 - f0) * rk(k) / 6)); ctx.beginPath();
    for (let i = 0; i <= N; i++) { const f = lerp(f0, f1, i / N); const [px, py] = L(rk(k) + wob(k, f) + T, f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
    const e1 = L(rk(k) + wob(k, f1), f1); for (let j = 1; j < 8; j++) { const an = f1 + j / 8 * Math.PI; ctx.lineTo(e1[0] + Math.cos(f1) * T * Math.cos(j / 8 * Math.PI) - Math.sin(f1) * 0 + Math.cos(f1 + Math.PI / 2) * T * Math.sin(j / 8 * Math.PI), e1[1] + Math.sin(f1) * T * Math.cos(j / 8 * Math.PI) + Math.sin(f1 + Math.PI / 2) * T * Math.sin(j / 8 * Math.PI)); }
    for (let i = N; i >= 0; i--) { const f = lerp(f0, f1, i / N); const [px, py] = L(rk(k) + wob(k, f) - T, f); ctx.lineTo(px, py); }
    const e0 = L(rk(k) + wob(k, f0), f0); for (let j = 1; j < 8; j++) { ctx.lineTo(e0[0] - Math.cos(f0) * T * Math.cos(j / 8 * Math.PI) - Math.cos(f0 + Math.PI / 2) * T * Math.sin(j / 8 * Math.PI), e0[1] - Math.sin(f0) * T * Math.cos(j / 8 * Math.PI) - Math.sin(f0 + Math.PI / 2) * T * Math.sin(j / 8 * Math.PI)); }
    ctx.closePath(); };
  // bladen (met één doorbroken blad: fenestratie)
  const stukken = []; for (let k = 0; k < lagen; k++) { const [f0, f1] = span(k); if (k === 2 && f1 - f0 > 0.9) { const g = lerp(f0, f1, 0.42); stukken.push([k, f0, g - 0.05], [k, g + 0.05, f1]); } else stukken.push([k, f0, f1]); }
  // ---- glad ER: buisjesnetwerk voorbij a1, vast aan de uiteinden van de bladen
  const knopen = [], ribbels = [];
  if (glad > 0.01) { const cols = 4, rows = lagen + 1, fd = 0.5 * glad;
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { const f = a1 - 0.02 + (c + 0.6) / cols * fd + (hash(c * 17 + r * 5) - 0.5) * 0.08; const rr = r0 + 10 + r * pitch * 1.05 + (hash(c * 7 + r * 11) - 0.5) * 18; knopen.push({ c, r, p: L(rr, f) }); }
    const kn = (c, r) => knopen.find(q => q.c === c && q.r === r);
    for (const q of knopen) { const rechts = kn(q.c + 1, q.r), boven = kn(q.c, q.r + 1);
      if (rechts && hash(q.c * 31 + q.r * 3) > 0.25) ribbels.push([q.p, rechts.p]); if (boven && hash(q.c * 13 + q.r * 29) > 0.45) ribbels.push([q.p, boven.p]); }
    for (let k = 0; k < lagen; k++) { const [, f1] = span(k); const e = L(rk(k) + wob(k, f1), f1); const doel = kn(0, Math.min(rows - 1, k + (k > 1 ? 1 : 0))); if (doel) ribbels.push([e, doel.p, true]); }
    const tube = (w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; for (const [p, q] of ribbels) { const mx = (p[0] + q[0]) / 2 + (hash(p[0] * 1.3) - 0.5) * 26, my = (p[1] + q[1]) / 2 + (hash(p[1] * 1.7) - 0.5) * 26; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(mx, my, q[0], q[1]); ctx.stroke(); } };
    ctx.save(); ctx.globalAlpha *= clamp(glad * 1.5, 0, 1); tube(6.2, kRand); tube(3.6, kLumen); ctx.restore(); }
  // ---- kernenvelop (stuk) met perinucleaire ruimte
  if (kern) { const f0 = a0 - 0.25, f1 = a1 + 0.25; ctx.beginPath(); ctx.arc(0, 0, r0, f0, f1); ctx.arc(0, 0, r0 - 7, f1, f0, true); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.3); for (const r of [r0, r0 - 7]) { ctx.beginPath(); ctx.arc(0, 0, r, f0, f1); ctx.stroke(); } }
  for (const [k, f0, f1] of stukken) { cisPad(k, f0, f1); ctx.fillStyle = kLumen; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.3); ctx.stroke(); }
  // ---- verbindingen: kern → blad 0, blad k → blad k+1 (lumen loopt door)
  const kanaal = (rA, rB, f, w) => { const p0 = L(rA, f), p1 = L(rB, f); const nx = -Math.sin(f) * w / 2, ny = Math.cos(f) * w / 2;
    ctx.beginPath(); ctx.moveTo(p0[0] + nx, p0[1] + ny); ctx.lineTo(p1[0] + nx, p1[1] + ny); ctx.lineTo(p1[0] - nx, p1[1] - ny); ctx.lineTo(p0[0] - nx, p0[1] - ny); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.3); for (const sg of [1, -1]) { ctx.beginPath(); ctx.moveTo(p0[0] + sg * nx * 1.15, p0[1] + sg * ny * 1.15); ctx.lineTo(p1[0] + sg * nx * 1.15, p1[1] + sg * ny * 1.15); ctx.stroke(); } };
  const verb = [];
  if (kern) { for (const f of [a0 + 0.18, lerp(a0, a1, 0.62)]) { verb.push([r0 - 3.5, rk(0) + wob(0, f), f]); } }
  for (let k = 0; k < lagen - 1; k += 2) { const f = lerp(a0, a1, 0.2 + 0.6 * hash(k * 41 + 7)); verb.push([rk(k) + wob(k, f), rk(k + 1) + wob(k + 1, f), f]); }
  for (const [rA, rB, f] of verb) kanaal(rA, rB, f, 7.5);
  // naad met het glad ER dichtmaken
  if (glad > 0.01) { ctx.fillStyle = kLumen; for (const [p, q, naad] of ribbels) if (naad) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, 6.283); ctx.fill(); } }
  // ---- ribosomen aan de cytoplasmakant
  const bijVerb = (r, f) => verb.some(([rA, rB, fv]) => Math.abs(f - fv) * r < 7 && r > Math.min(rA, rB) - 8 && r < Math.max(rA, rB) + 8);
  if (rib && s > 0.18) { ctx.fillStyle = C.ribo; const rr = 1.9;
    for (const [k, f0, f1] of stukken) for (const kant of [1, -1]) { const R = rk(k) + kant * (thk(k) + 3.4); const N = Math.floor((f1 - f0) * R / 7);
      for (let i = 1; i < N; i++) { const f = f0 + (f1 - f0) * (i + (hash(i * 7 + k * 31 + kant) - 0.5) * 0.5) / N; if (hash(i * 3 + k * 17 + kant * 5) < 0.12) continue; if (bijVerb(R, f)) continue;
        if (keten > 0 && k === lagen - 1 && kant === 1 && Math.abs(f - am) < 0.32) continue;
        const [px, py] = L(R + wob(k, f), f); ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fill(); } }
    if (kern) { const R = r0 + 3.4; const N = Math.floor((a1 - a0 + 0.5) * R / 11); for (let i = 0; i < N; i++) { const f = a0 - 0.25 + (a1 - a0 + 0.5) * (i + 0.5) / N; if (bijVerb(R, f) || hash(i * 9) < 0.3) continue; const [px, py] = L(R, f); ctx.beginPath(); ctx.arc(px, py, rr, 0, 6.283); ctx.fill(); } } }
  // ---- polysoom: mRNA over het buitenste blad, eiwitketens groeien het lumen in
  if (keten > 0.01) { const k = lagen - 1, T = thk(k), Rm = rk(k) + T + 9; const fa = am - 0.3, fb = am + 0.3;
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(1.4); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = lerp(fa - 0.04, fb + 0.04, i / 40); const [px, py] = L(Rm + wob(k, f) + 2.2 * Math.sin(i * 0.9 + t * 1.5), f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const nR = 5; for (let j = 0; j < nR; j++) { const f = lerp(fa, fb, (j + 0.5) / nR); const rb = rk(k) + wob(k, f);
      const lengte = clamp(keten * 1.25 - (nR - 1 - j) * 0.18, 0, 1) * 22; // oudere ribosomen (rechts) hebben een langere keten
      // keten: door het membraan, dan langs het lumen, het eind vouwt
      if (lengte > 0.5) { ctx.fillStyle = lighten(C.enzym, 0.35); for (let b = 0; b < lengte; b++) { let px, py;
          if (b < 3) { [px, py] = L(rb + T - 1 - b * 2.6, f); } else { const u = b - 3; const ff = f - u * 0.014 * (1 - Math.min(1, u / 14) * 0.5); const rr = rb - T * 0.15 + Math.sin(u * 1.1) * T * 0.45 * Math.min(1, u / 6); [px, py] = L(rr, ff); }
          ctx.beginPath(); ctx.arc(px, py, 1.25, 0, 6.283); ctx.fill(); }
        if (lengte > 20 && j === nR - 1) { const ff = f - 17 * 0.014 * 0.6; const [gx, gy] = L(rb, ff); ctx.strokeStyle = C.groen; ctx.lineWidth = lw(1); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 4, gy + Math.sin(ff - 1.5) * 4); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 2 - Math.cos(ff) * 2.5, gy + Math.sin(ff - 1.5) * 2 - Math.sin(ff) * 2.5); ctx.stroke(); } }
      // ribosoom met kleine en grote subeenheid, op het membraan
      const [gx, gy] = L(rb + T + 4.2, f), [kx, ky] = L(rb + T + 9, f + 0.004); ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(gx, gy, 4.4, 3.4, f, 0, 6.283); ctx.fill();
      ctx.fillStyle = lighten(C.ribo, 0.2); ctx.beginPath(); ctx.ellipse(kx, ky, 3.2, 2.2, f, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}
