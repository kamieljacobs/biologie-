// =====================================================================================
// MITOCHONDRION (echt), doorsnede. Recept: langwerpig, ± 0,5–1 µm breed en 1–10 µm lang (hier 2,3 : 1);
// twee membranen: een glad buitenmembraan en een binnenmembraan dat met plooien (cristae) de matrix in
// steekt; de cristae zijn instulpingen van het binnenmembraan (de smalle ruimte ertussen loopt door tot in
// elke plooi), wisselend van boven en onder, ongelijk lang en niet precies evenwijdig. In de matrix: eigen
// DNA als kleine ringetjes en eigen (kleine) ribosomen. Deling: insnoering in het midden tot twee helften.
// Bron: OpenStax Biology 2e fig. 4.13 (binnenmembraan met cristae, matrix); Principles of Biology 5.12
// (eigen DNA en ribosomen); Digital Histology (vorm variabel, tot 10 µm lang); BioNumbers 100436 (± 1 µm).
// Bekende fouten: cristae als losse streepjes die niet aan het binnenmembraan vastzitten; één membraan;
// een perfect symmetrische 'worst' met kamtanden; ATP als tekstbolletje in de matrix.
// Gebruik: mitochondrionEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 86, cristae = 12, deling = 0..1,
//   stoffen = 0..1 (pyruvaat + O₂ erin, ATP + CO₂ eruit), seed }). Ontwerpmaat 200 × 86 bij s = 1.
// Geeft ankerpunten terug: { mid, buiten, binnen, crista, matrix, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, ease, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function mitochondrionEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 86, cristae = 12, deling = 0, stoffen = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, n = 2.4, d = clamp(deling, 0, 1);
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const anker = { mid: P(0, 0), buiten: P(0, -B), binnen: P(-A * 0.35, -B + 8), crista: P(-A * 0.1, 0), matrix: P(A * 0.3, B * 0.25), dna: P(A * 0.45, -B * 0.2) };
  if (a <= 0.01) return anker;
  const knijp = (lx) => 1 - d * 0.97 * Math.exp(-Math.pow(lx / (A * 0.16), 2));
  const hh = (lx, ins) => { const aa = A - ins, bb = B - ins; const u = Math.min(1, Math.abs(lx) / aa); return Math.max(0, bb * Math.pow(1 - Math.pow(u, n), 1 / n) * knijp(lx) - (d > 0 ? ins * 0.3 * (1 - knijp(lx)) : 0)); };
  const omtrek = (ins) => { ctx.beginPath(); const N = 64, aa = A - ins;
    for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, -hh(lx, ins)) : ctx.moveTo(lx, -hh(lx, ins)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, hh(lx, ins)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.7) / s;
  const kTus = _mixHex(C.mito, '#1A2740', 0.55), kMat = _mixHex(C.mito, '#2A3448', 0.25), kRand = C.mitoR, kPlooi = _mixHex(C.mito, '#1A2740', 0.45);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // buitenmembraan + tussenruimte
  omtrek(0); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.6); ctx.stroke();
  const ins = Math.max(4.5, B * 0.12);
  omtrek(ins); ctx.fillStyle = kMat; ctx.fill(); ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.3); ctx.stroke();
  // matrix: ribosomen en DNA-ringetjes (alleen als het groot genoeg is)
  ctx.save(); omtrek(ins); ctx.clip();
  if (s * lang > 90) {
    for (let i = 0; i < 26; i++) { const lx = (hash(i * 7 + seed) * 2 - 1) * A * 0.85, ly = (hash(i * 7 + 3 + seed) * 2 - 1) * B * 0.6; const w = wander(i + 300 + seed, t, 1.5, 0.6);
      ctx.beginPath(); ctx.arc(lx + w.x, ly + w.y, 1.5, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.55); ctx.fill(); }
    for (const [dx, dy, r] of [[A * 0.45, -B * 0.2, 6], [-A * 0.5, B * 0.22, 5]]) { ctx.beginPath();
      for (let i = 0; i <= 24; i++) { const an = i / 24 * 6.283, rr = r * (1 + 0.08 * Math.sin(an * 2 + seed)); i ? ctx.lineTo(dx + Math.cos(an) * rr, dy + Math.sin(an) * rr * 0.8) : ctx.moveTo(dx + rr, dy); }
      ctx.closePath(); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  }
  // cristae: instulpingen van het binnenmembraan, afwisselend boven/onder, ongelijk
  const nc = s * lang < 60 ? Math.max(3, Math.round(cristae / 2)) : cristae;
  for (let i = 0; i < nc; i++) {
    const lx = -A + ins + (2 * A - 2 * ins) * (i + 0.5 + (hash(i * 13 + seed) - 0.5) * 0.35) / nc;
    const h0 = hh(lx, ins); if (h0 < B * 0.45) continue;
    const dir = (i + seed) % 2 ? 1 : -1; const len = h0 * (0.75 + 0.65 * hash(i * 5 + 1 + seed)); const tilt = (hash(i * 9 + seed) - 0.5) * 0.5 + Math.sin(t * 0.6 + i) * 0.04;
    const w = Math.max(3, lang / 46); const base = dir * (h0 + 1.5);
    const tipX = lx + Math.sin(tilt) * len, tipY = base - dir * len * Math.cos(tilt);
    const mx = (lx + tipX) / 2 + dir * 3 * Math.sin(i), my = (base + tipY) / 2;
    ctx.beginPath(); ctx.moveTo(lx - w, base); ctx.quadraticCurveTo(mx - w, my, tipX - w * 0.9, tipY + dir * w * 0.2);
    ctx.quadraticCurveTo(tipX, tipY - dir * w * 1.6, tipX + w * 0.9, tipY + dir * w * 0.2); ctx.quadraticCurveTo(mx + w, my, lx + w, base);
    ctx.fillStyle = kPlooi; ctx.fill();
    ctx.beginPath(); ctx.moveTo(lx - w, base - dir * 2.2); ctx.quadraticCurveTo(mx - w, my, tipX - w * 0.9, tipY + dir * w * 0.2);
    ctx.quadraticCurveTo(tipX, tipY - dir * w * 1.6, tipX + w * 0.9, tipY + dir * w * 0.2); ctx.quadraticCurveTo(mx + w, my, lx + w, base - dir * 2.2);
    ctx.strokeStyle = kRand; ctx.lineWidth = lw(1.2); ctx.stroke();
  }
  ctx.restore();
  // stoffen: pyruvaat (oker, 3 C) en O₂ (teal) erin van links, ATP (koraal) en CO₂ eruit naar rechts
  if (stoffen > 0.01) { ctx.globalAlpha *= stoffen;
    for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const inX = lerp(-A - 60, -A * 0.4, u), inY = (i - 1.5) * 16; const f = u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15;
      ctx.save(); ctx.globalAlpha *= f; if (i % 2) { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(inX + dd * 3.2, inY, 3.6, 0, 6.283); ctx.fill(); } }
      else { ctx.strokeStyle = C.oker; ctx.lineWidth = lw(2.4); ctx.beginPath(); ctx.moveTo(inX - 8, inY + 2); ctx.lineTo(inX, inY - 3); ctx.lineTo(inX + 8, inY + 2); ctx.stroke(); }
      ctx.restore();
      const v = ((t * 0.25 + i / 4 + 0.5) % 1); const ox = lerp(A * 0.4, A + 70, v), oy = (i - 1.5) * 18; const g = v < 0.15 ? v / 0.15 : 1;
      ctx.save(); ctx.globalAlpha *= g; if (i % 2) { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(ox - 6, oy, 4, 0, 6.283); ctx.fill(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(ox + 2 + k * 5.5, oy, 2.4, 0, 6.283); ctx.fill(); } }
      else { ctx.fillStyle = C.mens; ctx.beginPath(); ctx.arc(ox, oy, 3.4, 0, 6.283); ctx.fill(); ctx.fillStyle = lighten(C.teal, 0.2); for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 6, oy, 3, 0, 6.283); ctx.fill(); } }
      ctx.restore(); }
  }
  ctx.restore();
  return anker;
}
