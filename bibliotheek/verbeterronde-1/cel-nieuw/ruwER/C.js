// =====================================================================================
// RUW ER (met glad ER), doorsnede rond de kern — ronde 2. Recept: platte membraanzakken (cisternen) die in
// nette lagen om de kern buigen; de ruimte binnenin (lumen) loopt via brede, zacht uitlopende halsjes door
// in de ruimte tussen de twee kernmembranen (perinucleaire ruimte): het buitenste kernmembraan gaat over in
// het eerste ER-blad. Ribosomen zitten vast óp het membraan aan de cytoplasmakant (koepeltje met de platte
// kant tegen het membraan; op beide vlakken van een blad en op het buitenste kernmembraan), nooit in het
// lumen. Aan het eind gaat het ruw ER over in het glad ER: buisjes zonder ribosomen. Polysoom: een mRNA-draad
// met een rij ribosomen; de eiwitketen groeit door het membraan het lumen in en krijgt een suikerketen.
// Maten: lumen ± 30–60 nm, ribosoom ± 25 nm; hier lumen 10, ribosoom 5 ontwerpeenheden.
// Bron: OpenStax Biology 2e § 4.4 (ER-membraan doorlopend met de kernenvelop; ribosomen op de cytoplasmakant;
// eiwitten vouwen en krijgen zijketens in het lumen; glad ER doorlopend met ruw ER, weinig of geen ribosomen).
// Bekende fouten: ribosomen als losse stippen tussen de zakken of in het lumen; dwarsbalkjes tussen bladen;
// ER los van de kern; glad ER los in de cel.
// Gebruik: ruwER(ctx, x, y, s, { a, t, r0 = 120, gap = 8, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true,
//   envelop = kern, kernVlak = envelop, aansl = [hoeken], glad = 1, keten = 0, rib = true }).
//   (x, y) = midden van de kern, r0 = straal buitenste kernmembraan, gap = breedte perinucleaire ruimte (zet
//   hem gelijk aan die van kernEnvelopPorie), envelop = teken zelf een stuk kernenvelop (false als de kern al
//   getekend is: dan alleen de halsjes), aansl = hoeken van de halsjes kern → blad 0.
// Geeft ankerpunten terug: { ruw, glad, lumen, ribosoom, aansluiting, keten }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function ruwER(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, r0 = 120, gap = 8, a0 = -2.4, a1 = -0.8, lagen = 4, kern = true, glad = 1, keten = 0, rib = true } = o;
  const envelop = o.envelop ?? kern, kernVlak = o.kernVlak ?? envelop;
  const aansl = o.aansl ?? (kern ? [a0 + 0.16, lerp(a0, a1, 0.47), lerp(a0, a1, 0.82)] : []);
  const th = 5, pitch = 25, rk = (k) => r0 + 18 + k * pitch;
  const wob = (k, f) => 1.2 * Math.sin(f * 5 + k * 1.3);
  const span = (k) => [a0 + 0.03 * k + hash(k * 3 + 1) * 0.04, a1 - hash(k * 3 + 2) * 0.06];
  const pol = (r, f) => [x + Math.cos(f) * r * s, y + Math.sin(f) * r * s]; const am = (a0 + a1) / 2;
  const anker = { ruw: pol(rk(1), am + 0.15), glad: pol(r0 + 17 + pitch * 1.5, a1 + 0.38 * glad), lumen: pol(rk(2), am - 0.2), ribosoom: pol(rk(lagen - 1) + th + 3, am - 0.35),
    aansluiting: pol(r0 + 8, aansl[0] ?? a0), keten: pol(rk(lagen - 1) + 12, am) };
  if (a <= 0.01) return anker;
  const kLumen = _mixHex(C.er, '#1A2740', 0.72), kRand = C.er;
  const lw = (px) => Math.max(px * s, 0.6) / s; const L = (r, f) => [Math.cos(f) * r, Math.sin(f) * r];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const thk = (k) => (keten > 0 && k === lagen - 1) ? th * 1.3 : th;
  const cisPad = (k, f0, f1) => { const T = thk(k); const N = Math.max(8, Math.round((f1 - f0) * rk(k) / 5)); ctx.beginPath();
    for (let i = 0; i <= N; i++) { const f = lerp(f0, f1, i / N); ctx.lineTo(...L(rk(k) + wob(k, f) + T, f)); }
    const e1 = rk(k) + wob(k, f1); for (let j = 1; j < 10; j++) { const q = j / 10 * Math.PI; const [px, py] = L(e1 + T * Math.cos(q), f1 + T * Math.sin(q) / e1); ctx.lineTo(px, py); }
    for (let i = N; i >= 0; i--) { const f = lerp(f0, f1, i / N); ctx.lineTo(...L(rk(k) + wob(k, f) - T, f)); }
    const e0 = rk(k) + wob(k, f0); for (let j = 1; j < 10; j++) { const q = j / 10 * Math.PI; const [px, py] = L(e0 - T * Math.cos(q), f0 - T * Math.sin(q) / e0); ctx.lineTo(px, py); }
    ctx.closePath(); };
  // ---- glad ER (achter de bladen): buisjesnetwerk voorbij a1, vast aan de uiteinden
  const ribbels = [];
  if (glad > 0.01) { const knopen = [], cols = 4, rows = lagen + 1, fd = 0.5 * glad;
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) { const f = a1 + 0.02 + (c + 0.6) / cols * fd + (hash(c * 17 + r * 5) - 0.5) * 0.08; const rr = r0 + 10 + r * pitch * 1.05 + (hash(c * 7 + r * 11) - 0.5) * 18; knopen.push({ c, r, p: L(rr, f) }); }
    const kn = (c, r) => knopen.find(q => q.c === c && q.r === r);
    for (const q of knopen) { const rechts = kn(q.c + 1, q.r), boven = kn(q.c, q.r + 1); if (rechts && hash(q.c * 31 + q.r * 3) > 0.25) ribbels.push([q.p, rechts.p]); if (boven && hash(q.c * 13 + q.r * 29) > 0.45) ribbels.push([q.p, boven.p]); }
    for (let k = 0; k < lagen; k++) { const [, f1] = span(k); const e = L(rk(k) + wob(k, f1), f1); const doel = kn(0, Math.min(rows - 1, k + (k > 1 ? 1 : 0))); if (doel) ribbels.push([e, doel.p, true]); }
    const tube = (w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; for (const [p, q] of ribbels) { const mx = (p[0] + q[0]) / 2 + (hash(p[0] * 1.3) - 0.5) * 26, my = (p[1] + q[1]) / 2 + (hash(p[1] * 1.7) - 0.5) * 26; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(mx, my, q[0], q[1]); ctx.stroke(); } };
    ctx.save(); ctx.globalAlpha *= clamp(glad * 1.5, 0, 1); tube(6.4, kRand); tube(3.8, kLumen); ctx.restore(); }
  // ---- stuk kernenvelop: nucleoplasma, binnen- en buitenmembraan met de perinucleaire ruimte
  const ef0 = a0 - 0.3, ef1 = a1 + 0.3;
  if (envelop) {
    if (kernVlak) { ctx.beginPath(); ctx.arc(0, 0, r0 - gap, ef0, ef1); ctx.arc(0, 0, Math.max(0, r0 - gap - 46), ef1, ef0, true); ctx.closePath(); ctx.fillStyle = _mixHex(C.kern, '#2A3448', 0.45); ctx.fill(); }
    ctx.beginPath(); ctx.arc(0, 0, r0, ef0, ef1); ctx.arc(0, 0, r0 - gap, ef1, ef0, true); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.4); for (const r of [r0, r0 - gap]) { ctx.beginPath(); ctx.arc(0, 0, r, ef0, ef1); ctx.stroke(); } }
  // ---- bladen
  const stukken = []; for (let k = 0; k < lagen; k++) { const [f0, f1] = span(k); stukken.push([k, f0, f1]); cisPad(k, f0, f1); ctx.fillStyle = kLumen; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.4); ctx.stroke(); }
  // ---- halsjes: lumen loopt zichtbaar door (zacht uitlopend, geen balkjes)
  const hals = (rA, rB, f, rAm, rBm, kleurA) => { const N = 16, side = (sg) => { const p = []; for (let i = 0; i <= N; i++) { const u = i / N, r = lerp(rA, rB, u), w = 3.6 + 4.2 * Math.pow(2 * u - 1, 2); p.push([r, f + sg * w / r]); } return p; };
    const l = side(-1), rr = side(1); ctx.beginPath(); l.forEach(([r, ff], i) => i ? ctx.lineTo(...L(r, ff)) : ctx.moveTo(...L(r, ff))); rr.slice().reverse().forEach(([r, ff]) => ctx.lineTo(...L(r, ff))); ctx.closePath(); ctx.fillStyle = kLumen; ctx.fill();
    for (const sd of [l, rr]) { ctx.beginPath(); let pen = false; sd.forEach(([r, ff]) => { if (r < rAm - 0.5 || r > rBm + 0.5) { pen = false; return; } const pt = L(r, ff); pen ? ctx.lineTo(...pt) : ctx.moveTo(...pt); pen = true; }); ctx.strokeStyle = kleurA; ctx.lineWidth = lw(1.4); ctx.stroke(); } };
  const hb = []; // halsjes bewaren voor de ribosomen
  for (const f of aansl) { hals(r0 - gap / 2, rk(0) + wob(0, f), f, r0, rk(0) + wob(0, f) - thk(0), kRand); hb.push([r0, rk(0), f]); }
  for (let k = 0; k < lagen - 1; k++) { const f = lerp(a0, a1, [0.3, 0.7, 0.5][k % 3]) + 0.05 * k; hals(rk(k) + wob(k, f), rk(k + 1) + wob(k + 1, f), f, rk(k) + wob(k, f) + thk(k), rk(k + 1) + wob(k + 1, f) - thk(k + 1), kRand); hb.push([rk(k), rk(k + 1), f]); }
  if (glad > 0.01) { ctx.fillStyle = kLumen; for (const [p, q, naad] of ribbels) if (naad) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.6, 0, 6.283); ctx.fill(); } }
  // ---- ribosomen: koepeltje vast op de cytoplasmakant van het membraan
  const opHals = (r, f) => hb.some(([rA, rB, fv]) => Math.abs(f - fv) * r < 11 && r > rA - 6 && r < rB + 6);
  const ribo = (r, f, naarBuiten) => { const [px, py] = L(r, f); const n = f + (naarBuiten ? 0 : Math.PI); ctx.save(); ctx.translate(px, py); ctx.rotate(n);
    ctx.beginPath(); ctx.ellipse(0.4, 0, 2.6, 3, 0, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = C.ribo; ctx.fill(); ctx.restore(); };
  if (rib && s > 0.18) {
    for (const [k, f0, f1] of stukken) for (const kant of [1, -1]) { const R = rk(k) + kant * thk(k); const N = Math.floor((f1 - f0) * R / 7.2);
      for (let i = 1; i < N; i++) { const f = f0 + (f1 - f0) * (i + (hash(i * 7 + k * 31 + kant) - 0.5) * 0.3) / N; if (hash(i * 3 + k * 17 + kant * 5) < 0.1 || opHals(R, f)) continue;
        if (keten > 0 && k === lagen - 1 && kant === 1 && Math.abs(f - am) < 0.32) continue; ribo(R + wob(k, f) + kant * 0.7, f, kant === 1); } }
    if (envelop || kern) { const N = Math.floor((ef1 - ef0) * r0 / 9); for (let i = 0; i < N; i++) { const f = ef0 + (ef1 - ef0) * (i + 0.5) / N; if (opHals(r0, f) || hash(i * 9) < 0.25) continue; ribo(r0 + 0.7, f, true); } } }
  // ---- polysoom: mRNA met een rij ribosomen over het buitenste blad; ketens groeien het lumen in
  if (keten > 0.01) { const k = lagen - 1, T = thk(k), Rm = rk(k) + T + 8.5; const fa = am - 0.3, fb = am + 0.3;
    ctx.strokeStyle = C.teal; ctx.lineWidth = lw(1.4); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const f = lerp(fa - 0.04, fb + 0.04, i / 40); const [px, py] = L(Rm + wob(k, f) + 1.6 * Math.sin(i * 0.9 + t * 1.5), f); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    const nR = 6; for (let j = 0; j < nR; j++) { const f = lerp(fa, fb, (j + 0.5) / nR); const rb = rk(k) + wob(k, f);
      const lengte = clamp(keten * 1.25 - (nR - 1 - j) * 0.16, 0, 1) * 22;
      if (lengte > 0.5) { ctx.fillStyle = lighten(C.enzym, 0.35); for (let b = 0; b < lengte; b++) { let px, py;
          if (b < 3) { [px, py] = L(rb + T - 1 - b * 2.6, f); } else { const u = b - 3; const ff = f - u * 0.012 * (1 - Math.min(1, u / 14) * 0.5); const rr = rb - T * 0.1 + Math.sin(u * 1.1) * T * 0.45 * Math.min(1, u / 6); [px, py] = L(rr, ff); }
          ctx.beginPath(); ctx.arc(px, py, 1.2, 0, 6.283); ctx.fill(); }
        if (lengte > 20 && j === nR - 1) { const ff = f - 17 * 0.012 * 0.6; const [gx, gy] = L(rb, ff); ctx.strokeStyle = C.groen; ctx.lineWidth = lw(1); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 4, gy + Math.sin(ff - 1.5) * 4); ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ff - 1.5) * 2 - Math.cos(ff) * 2.5, gy + Math.sin(ff - 1.5) * 2 - Math.sin(ff) * 2.5); ctx.stroke(); } }
      // ribosoom: grote subeenheid op het membraan, kleine erboven op het mRNA
      const [gx, gy] = L(rb + T + 3.8, f), [kx, ky] = L(rb + T + 8.6, f); ctx.fillStyle = C.ribo; ctx.beginPath(); ctx.ellipse(gx, gy, 3.8, 4.6, f, 0, 6.283); ctx.fill();
      ctx.fillStyle = lighten(C.ribo, 0.2); ctx.beginPath(); ctx.ellipse(kx, ky, 2.4, 3.4, f, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  return anker;
}
