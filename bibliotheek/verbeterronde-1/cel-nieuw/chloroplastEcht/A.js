// =====================================================================================
// BLADGROENKORREL (chloroplast, echt), doorsnede. Recept: lensvormig, ± 5–10 µm lang en 2–3 µm dik
// (hier 2,3 : 1); omhuld door twee membranen (buiten en binnen, smalle ruimte ertussen). Binnenin de stroma
// (vloeistof) met thylakoïden: platte zakjes die tot grana (stapels van ± 5–10) zijn opgestapeld; de grana
// zijn onderling verbonden door losse thylakoïden (stromalamellen) die schuin tussen de stapels lopen.
// In het stroma: een zetmeelkorrel, vetbolletjes (plastoglobuli), eigen DNA-ringetje en kleine ribosomen.
// licht: licht valt in, O₂ en glucose gaan eruit (fotosynthese).
// Bron: OpenStax Biology 2e fig. 4.16 (buiten- en binnenmembraan, thylakoïden gestapeld tot grana, stroma);
// Principles of Biology 5.12 (eigen DNA en ribosomen; granum = stapel thylakoïden; stroma rond de grana).
// Bekende fouten: grana als losse muntjes zonder verbindingen; één membraan; een ovaal met streepjes.
// Gebruik: chloroplastEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 88, grana = 6, licht = 0..1, seed }).
//   Ontwerpmaat 200 × 88 bij s = 1. Geeft ankerpunten terug: { mid, membraan, granum, thylakoide, stroma,
//   zetmeel, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp; uit lib_bio.js: _mixHex.
// =====================================================================================
function chloroplastEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 88, grana = 6, licht = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2;
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const gx = (i) => -A * 0.72 + A * 1.44 * (i + 0.5) / grana, gy = (i) => (hash(i * 5 + seed) - 0.5) * B * 0.55;
  const anker = { mid: P(0, 0), membraan: P(-A * 0.3, -B * 0.95), granum: P(gx(Math.floor(grana / 2)), gy(Math.floor(grana / 2))), thylakoide: P(gx(1) + A * 0.1, gy(1)), stroma: P(A * 0.15, B * 0.55), zetmeel: P(-A * 0.25, B * 0.45), dna: P(A * 0.55, -B * 0.4) };
  if (a <= 0.01) return anker;
  const hh = (lx, ins, onder) => { const aa = A - ins; const u = Math.min(1, Math.abs(lx) / aa); return (B - ins) * Math.pow(1 - u * u, 0.62) * (onder ? 0.92 : 1.04); };
  const omtrek = (ins) => { ctx.beginPath(); const N = 64, aa = A - ins; for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, -hh(lx, ins, false)) : ctx.moveTo(lx, -hh(lx, ins, false)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, hh(lx, ins, true)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.6) / s; const groot = s * lang > 90;
  const kTus = _mixHex(C.chloro, '#121A26', 0.6), kStroma = _mixHex(C.chloro, '#1A2740', 0.5), kThyl = _mixHex(C.chloro, '#F2F2EE', 0.08), kThylR = _mixHex(C.chloro, '#121A26', 0.35);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  omtrek(0); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.35); ctx.lineWidth = lw(1.5); ctx.stroke();
  const ins = Math.max(3.5, B * 0.08); omtrek(ins); ctx.fillStyle = kStroma; ctx.fill(); ctx.strokeStyle = lighten(C.chloro, 0.25); ctx.lineWidth = lw(1.1); ctx.stroke();
  ctx.save(); omtrek(ins + 1); ctx.clip();
  // grana-geometrie
  const G = []; for (let i = 0; i < grana; i++) { const m = 4 + Math.floor(hash(i * 7 + 1 + seed) * 4); const w = 15 + hash(i * 3 + seed) * 5; const hgt = m * 5; const xx = gx(i), yy = gy(i);
    const maxH = Math.min(hh(xx - w / 2, ins + 4, false), hh(xx + w / 2, ins + 4, false)) + Math.min(hh(xx - w / 2, ins + 4, true), hh(xx + w / 2, ins + 4, true)); const mm = Math.max(2, Math.min(m, Math.floor(maxH * 0.85 / 5)));
    G.push({ x: xx, y: yy, w, m: mm, top: yy - mm * 5 / 2 }); }
  // stromalamellen: schuin tussen de stapels (dubbele lijn = plat zakje)
  ctx.strokeStyle = kThylR; ctx.fillStyle = kThyl;
  for (let i = 0; i < grana - 1; i++) for (let j = 0; j < 2; j++) { const g1 = G[i], g2 = G[i + 1]; const l1 = Math.floor(hash(i * 11 + j * 3 + seed) * g1.m), l2 = Math.floor(hash(i * 13 + j * 5 + seed) * g2.m);
    const y1 = g1.top + l1 * 5 + 2, y2 = g2.top + l2 * 5 + 2; ctx.beginPath(); ctx.moveTo(g1.x + g1.w / 2 - 2, y1 - 1.5); ctx.lineTo(g2.x - g2.w / 2 + 2, y2 - 1.5); ctx.lineTo(g2.x - g2.w / 2 + 2, y2 + 1.5); ctx.lineTo(g1.x + g1.w / 2 - 2, y1 + 1.5); ctx.closePath(); ctx.fill(); ctx.lineWidth = lw(0.7); ctx.stroke(); }
  // zetmeel, plastoglobuli, DNA, ribosomen
  ctx.beginPath(); ctx.ellipse(-A * 0.25, B * 0.45, A * 0.11, B * 0.17, 0.15, 0, 6.283); ctx.fillStyle = _mixHex(C.oker, '#F2F2EE', 0.25); ctx.fill(); ctx.strokeStyle = lighten(C.oker, 0.3); ctx.lineWidth = lw(1); ctx.stroke();
  ctx.fillStyle = _mixHex(C.oker, '#121A26', 0.35); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc((hash(i * 9 + 2 + seed) - 0.5) * A * 1.3, (hash(i * 9 + 4 + seed) - 0.5) * B * 1.1, 2.6, 0, 6.283); ctx.fill(); }
  if (groot) { ctx.beginPath(); ctx.ellipse(A * 0.55, -B * 0.4, 6, 4.6, 0.2, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke();
    ctx.fillStyle = rgba(C.ribo, 0.5); for (let i = 0; i < 24; i++) { ctx.beginPath(); ctx.arc((hash(i * 5 + 7) - 0.5) * A * 1.6, (hash(i * 5 + 8) - 0.5) * B * 1.3, 1.2, 0, 6.283); ctx.fill(); } }
  // grana: stapels platte schijfjes
  for (const g of G) for (let k = 0; k < g.m; k++) { const yy = g.top + k * 5; const w = g.w * (1 - 0.06 * Math.abs(k - g.m / 2) / g.m);
    ctx.beginPath(); ctx.moveTo(g.x - w / 2 + 2, yy); ctx.lineTo(g.x + w / 2 - 2, yy); ctx.arc(g.x + w / 2 - 2, yy + 2, 2, -Math.PI / 2, Math.PI / 2); ctx.lineTo(g.x - w / 2 + 2, yy + 4); ctx.arc(g.x - w / 2 + 2, yy + 2, 2, Math.PI / 2, Math.PI * 1.5); ctx.closePath();
    ctx.fillStyle = kThyl; ctx.fill(); ctx.strokeStyle = kThylR; ctx.lineWidth = lw(0.9); ctx.stroke(); }
  ctx.restore();
  // licht in, O₂ en glucose eruit
  if (licht > 0.01) { ctx.globalAlpha *= licht; ctx.strokeStyle = lighten(C.goud, 0.35); ctx.lineWidth = lw(1.6);
    for (let i = 0; i < 3; i++) { const u = ((t * 0.5 + i / 3) % 1); const sx = -A * 0.6 + i * 40 - 40 + u * 40, sy = -B - 70 + u * 60; ctx.save(); ctx.globalAlpha *= u < 0.8 ? 1 : (1 - u) / 0.2; ctx.beginPath(); for (let k = 0; k <= 14; k++) { const q = k / 14; ctx.lineTo(sx + q * 18 + Math.sin(q * 12) * 2.5, sy + q * 22 - Math.sin(q * 12) * 2); } ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const v = ((t * 0.3 + i / 3) % 1); const ox = A * 0.5 + v * 70, oy = B * 0.2 + i * 14 - 14 + v * 20; ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i === 1) { ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.283 + 0.52; ctx.lineTo(ox + Math.cos(an) * 6, oy + Math.sin(an) * 6); } ctx.closePath(); ctx.strokeStyle = C.oker; ctx.lineWidth = lw(1.8); ctx.stroke(); }
      else { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 3.4, oy, 3.8, 0, 6.283); ctx.fill(); } } ctx.restore(); } }
  ctx.restore();
  return anker;
}
