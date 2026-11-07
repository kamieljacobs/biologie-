// =====================================================================================
// BLADGROENKORREL (chloroplast, echt), ruimtelijk opengesneden. Recept: lensvormig, ± 5–10 µm lang en
// 2–3 µm dik; twee membranen; we kijken schuin van boven in de korrel (bovenste helft weggesneden). De
// grana staan als stapeltjes muntjes (elk thylakoïd een plat rond zakje: bovenvlak + smalle zijkant) in het
// stroma, verbonden door schuine stromalamellen; zetmeelkorrel en vetbolletjes in het stroma. De snijrand
// laat buiten- en binnenmembraan zien. Licht van linksboven: elk muntje één schaduwzijde (vlakke tint).
// Bron: OpenStax Biology 2e fig. 4.16 (buiten- en binnenmembraan, thylakoïden gestapeld tot grana, stroma);
// Principles of Biology 5.12 (eigen DNA en ribosomen; granum = stapel thylakoïden).
// Bekende fouten: grana als hoge torens (± 5–10 thylakoïden, niet 30); los zwevende stapels zonder lamellen.
// Gebruik: chloroplastEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 88, grana = 7, licht = 0..1, seed }).
//   Ontwerpmaat 200 × 88 bij s = 1. Geeft ankerpunten terug: { mid, membraan, granum, thylakoide, stroma,
//   zetmeel, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function chloroplastEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 88, grana = 7, licht = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, opY = -B * 0.18, opA = A * 0.9, opB = B * 0.66;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const posG = []; for (let i = 0; i < grana; i++) { const row = i % 2; posG.push([-opA * 0.72 + opA * 1.44 * (i + 0.5) / grana + (hash(i + seed) - 0.5) * 6, opY + (row ? 0.28 : -0.12) * opB + (hash(i * 3 + seed) - 0.5) * 6]); }
  posG.sort((p, q) => p[1] - q[1]);
  const anker = { mid: P(0, 0), membraan: P(-A * 0.3, B * 0.98), granum: P(posG[3][0], posG[3][1] - 10), thylakoide: P(posG[2][0], posG[2][1]), stroma: P(A * 0.2, opY + opB * 0.55), zetmeel: P(-A * 0.4, opY + opB * 0.4), dna: P(A * 0.6, opY) };
  if (a <= 0.01) return anker;
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - u * u, 0.62); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64; for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * lang > 90;
  const kOpp = _mixHex(C.chloro, '#1A2740', 0.12), kTus = _mixHex(C.chloro, '#121A26', 0.6), kStroma = _mixHex(C.chloro, '#1A2740', 0.55), kTop = _mixHex(C.chloro, '#F2F2EE', 0.15), kZij = _mixHex(C.chloro, '#121A26', 0.3);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.5); ctx.stroke();
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.4); ctx.stroke();
  const ins = Math.max(3, B * 0.07); pad(opA - ins, opB - ins, opY); ctx.fillStyle = kStroma; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.2); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // stromalamellen tussen buren
  ctx.fillStyle = rgba(kTop, 0.8); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.7);
  for (let i = 0; i < posG.length; i++) for (let j = i + 1; j < posG.length; j++) { const [x1, y1] = posG[i], [x2, y2] = posG[j]; if (Math.hypot(x2 - x1, y2 - y1) > opA * 0.42 || hash(i * 7 + j + seed) < 0.35) continue;
    const h1 = -6 - hash(i + j) * 10, h2 = -4 - hash(i * j + 1) * 10; ctx.beginPath(); ctx.moveTo(x1, y1 + h1 - 1.6); ctx.lineTo(x2, y2 + h2 - 1.6); ctx.lineTo(x2, y2 + h2 + 1.6); ctx.lineTo(x1, y1 + h1 + 1.6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(-A * 0.4, opY + opB * 0.4, A * 0.1, B * 0.13, 0.2, 0, 6.283); ctx.fillStyle = _mixHex(C.oker, '#F2F2EE', 0.25); ctx.fill(); ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.fillStyle = _mixHex(C.oker, '#121A26', 0.35); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc((hash(i * 9 + 2 + seed) - 0.5) * A * 1.3, opY + (hash(i * 9 + 4 + seed) - 0.5) * opB, 2.4, 0, 6.283); ctx.fill(); }
  if (groot) { ctx.beginPath(); ctx.ellipse(A * 0.62, opY + 2, 5.5, 4, 0.2, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  // grana als muntstapels (achter naar voor)
  for (let i = 0; i < posG.length; i++) { const [gxx, gyy] = posG[i]; const m = 4 + Math.floor(hash(i * 7 + 1 + seed) * 3), rx = 8 + hash(i * 3 + seed) * 2, ry = rx * 0.38, st = 3.4;
    for (let k = 0; k < m; k++) { const yy = gyy - k * st; ctx.beginPath(); ctx.ellipse(gxx, yy + 1.5, rx, ry, 0, 0, Math.PI); ctx.lineTo(gxx - rx, yy); ctx.ellipse(gxx, yy, rx, ry, 0, Math.PI, 0, true); ctx.closePath(); ctx.fillStyle = kZij; ctx.fill();
      ctx.beginPath(); ctx.ellipse(gxx, yy, rx, ry, 0, 0, 6.283); ctx.fillStyle = kTop; ctx.fill(); ctx.strokeStyle = kZij; ctx.lineWidth = lw(0.8); ctx.stroke(); } }
  ctx.restore();
  if (licht > 0.01) { ctx.globalAlpha *= licht; ctx.strokeStyle = lighten(C.goud, 0.35); ctx.lineWidth = lw(1.6);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); const sx = -A * 0.6 + i * 40 - 40 + u * 40, sy = -B - 70 + u * 60; ctx.save(); ctx.globalAlpha *= u < 0.8 ? 1 : (1 - u) / 0.2; ctx.beginPath(); for (let k = 0; k <= 14; k++) { const q = k / 14; ctx.lineTo(sx + q * 18 + Math.sin(q * 12) * 2.5, sy + q * 22 - Math.sin(q * 12) * 2); } ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const v = ((t * 0.3 + i / 3) % 1); const ox = A * 0.5 + v * 70, oy = B * 0.2 + i * 14 - 14 + v * 20; ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i === 1) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(ox + Math.cos(an) * 6, oy + Math.sin(an) * 6); } ctx.closePath(); ctx.strokeStyle = C.oker; ctx.lineWidth = lw(1.8); ctx.stroke(); }
      else { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 3.4, oy, 3.8, 0, 6.283); ctx.fill(); } } ctx.restore(); } }
  ctx.restore();
  return anker;
}
