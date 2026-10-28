// DEFINITIEF (inbouw 28 okt 2026): variant B, ongewijzigd overgenomen. Recept hieronder.
// =====================================================================================
// MITOCHONDRION (echt), ruimtelijk opengesneden. Recept: langwerpig, ± 0,5–1 µm breed en 1–10 µm lang
// (hier 2,3 : 1). We kijken schuin van boven in een mitochondrion waarvan de bovenste helft is weggesneden:
// de snijrand laat de twee membranen zien (buiten glad, binnen met smalle tussenruimte), en in de holte staan
// de cristae als platen dwars op de lengteas die vanaf de wand de matrix in steken, niet allemaal even ver.
// Licht van linksboven: elke plaat heeft één schaduwzijde (vlakke tint, geen verloop). In de matrix eigen
// DNA-ringetjes en ribosomen. Deling: insnoering in het midden tot twee helften.
// Bron: OpenStax Biology 2e fig. 4.13 (binnenmembraan met cristae, matrix); Principles of Biology 5.12
// (eigen DNA en ribosomen); Digital Histology (vorm variabel, tot 10 µm lang); BioNumbers 100436 (± 1 µm).
// Bekende fouten: platen die los in de holte zweven; een snijrand met één lijn (één membraan); te veel
// glans of een kleurverloop (Part C: geen verloop).
// Gebruik: mitochondrionEcht(ctx, x, y, s, { a, t, rot, lang = 200, dik = 86, cristae = 11, deling = 0..1,
//   stoffen = 0..1, seed }). Ontwerpmaat 200 × 86 bij s = 1.
// Geeft ankerpunten terug: { mid, buiten, binnen, crista, matrix, dna }.
// Vereist uit lib.js: C, rgba, lighten, hash, clamp, lerp, wander; uit lib_bio.js: _mixHex.
// =====================================================================================
function mitochondrionEcht(ctx, x, y, s, o = {}) {
  const { a = 1, t = 0, rot = 0, lang = 200, dik = 86, cristae = 11, deling = 0, stoffen = 0, seed = 0 } = o;
  const A = lang / 2, B = dik / 2, n = 2.4, d = clamp(deling, 0, 1);
  const P = (lx, ly) => [x + (lx * Math.cos(rot) - ly * Math.sin(rot)) * s, y + (lx * Math.sin(rot) + ly * Math.cos(rot)) * s];
  const opY = -B * 0.2, opA = A * 0.9, opB = B * 0.66;
  const anker = { mid: P(0, 0), buiten: P(0, B), binnen: P(-A * 0.5, opY - opB + 5), crista: P(-A * 0.1, opY), matrix: P(A * 0.3, opY + opB * 0.4), dna: P(A * 0.5, opY) };
  if (a <= 0.01) return anker;
  const knijp = (lx, aa) => 1 - d * 0.97 * Math.exp(-Math.pow(lx / (aa * 0.17), 2));
  const se = (aa, bb, lx) => { const u = Math.min(1, Math.abs(lx) / aa); return bb * Math.pow(1 - Math.pow(u, n), 1 / n) * knijp(lx, aa); };
  const pad = (aa, bb, cy) => { ctx.beginPath(); const N = 64;
    for (let i = 0; i <= N; i++) { const lx = -aa + 2 * aa * i / N; i ? ctx.lineTo(lx, cy - se(aa, bb, lx)) : ctx.moveTo(lx, cy - se(aa, bb, lx)); }
    for (let i = N; i >= 0; i--) { const lx = -aa + 2 * aa * i / N; ctx.lineTo(lx, cy + se(aa, bb, lx)); } ctx.closePath(); };
  const lw = (px) => Math.max(px * s, 0.7) / s;
  const kOpp = C.mito, kTus = _mixHex(C.mito, '#1A2740', 0.55), kHol = _mixHex(C.mito, '#1A2740', 0.38), kPlaat = _mixHex(C.mito, '#F2F2EE', 0.12), kSchaduw = _mixHex(C.mito, '#1A2740', 0.22);
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // buitenkant (onderste, naar ons toe gekeerde helft van de wand)
  pad(A, B, 0); ctx.fillStyle = kOpp; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.6); ctx.stroke();
  // snijvlak: buitenmembraan, tussenruimte, binnenmembraan
  pad(opA, opB, opY); ctx.fillStyle = kTus; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.5); ctx.stroke();
  const ins = Math.max(3.5, B * 0.09);
  pad(opA - ins, opB - ins, opY); ctx.fillStyle = kHol; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1.1); ctx.stroke();
  ctx.save(); pad(opA - ins, opB - ins, opY); ctx.clip();
  // achterwand: lichtere strook bovenin (de binnenkant van de wand die we zien)
  pad(opA - ins, opB - ins, opY - (opB - ins) * 0.55); ctx.fillStyle = _mixHex(C.mito, '#1A2740', 0.3); ctx.fill();
  if (s * lang > 90) for (let i = 0; i < 22; i++) { const lx = (hash(i * 7 + seed) * 2 - 1) * opA * 0.85, ly = opY + (hash(i * 7 + 3 + seed) * 2 - 1) * opB * 0.6; const w = wander(i + 300 + seed, t, 1.4, 0.6);
    ctx.beginPath(); ctx.arc(lx + w.x, ly + w.y, 1.4, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 0.5); ctx.fill(); }
  // cristae als platen dwars op de as: voet op de wand (onder), steken omhoog de matrix in
  const nc = s * lang < 60 ? Math.max(4, Math.round(cristae / 2)) : cristae;
  for (let i = 0; i < nc; i++) {
    const lx = -opA + ins + (2 * opA - 2 * ins) * (i + 0.5 + (hash(i * 13 + seed) - 0.5) * 0.3) / nc;
    const hb = se(opA - ins, opB - ins, lx); if (hb < opB * 0.35) continue;
    const vanOnder = (i + seed) % 3 !== 1; const hoog = hb * 2 * (0.62 + 0.3 * hash(i * 5 + seed));
    const y0 = vanOnder ? opY + hb + 2 : opY - hb - 2, y1 = vanOnder ? y0 - hoog : y0 + hoog;
    const w = Math.max(3.2, lang / 40), sk = (hash(i * 9 + seed) - 0.5) * 6 + Math.sin(t * 0.5 + i) * 0.6;
    ctx.beginPath(); ctx.moveTo(lx - w, y0); ctx.lineTo(lx - w * 0.8 + sk, y1); ctx.quadraticCurveTo(lx + sk, y1 + (vanOnder ? -w : w), lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath();
    ctx.fillStyle = kPlaat; ctx.fill(); ctx.strokeStyle = C.mitoR; ctx.lineWidth = lw(1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx + w * 0.15, y0); ctx.lineTo(lx + w * 0.15 + sk, y1 + (vanOnder ? 1 : -1) * w * 0.4); ctx.lineTo(lx + w * 0.8 + sk, y1); ctx.lineTo(lx + w, y0); ctx.closePath(); ctx.fillStyle = kSchaduw; ctx.fill();
  }
  if (s * lang > 90) for (const [dx, r] of [[A * 0.52, 6], [-A * 0.62, 5]]) { ctx.beginPath(); ctx.ellipse(dx, opY + 4, r, r * 0.75, 0.3, 0, 6.283); ctx.strokeStyle = C.kernR; ctx.lineWidth = lw(1.1); ctx.stroke(); }
  ctx.restore();
  // stoffen erin en eruit
  if (stoffen > 0.01) { ctx.globalAlpha *= stoffen;
    for (let i = 0; i < 4; i++) { const u = ((t * 0.25 + i / 4) % 1); const inX = lerp(-A - 60, -A * 0.4, u), inY = opY + (i - 1.5) * 14;
      ctx.save(); ctx.globalAlpha *= u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15;
      if (i % 2) { ctx.fillStyle = C.teal; for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(inX + dd * 3.2, inY, 3.6, 0, 6.283); ctx.fill(); } }
      else { ctx.strokeStyle = C.oker; ctx.lineWidth = lw(2.4); ctx.beginPath(); ctx.moveTo(inX - 8, inY + 2); ctx.lineTo(inX, inY - 3); ctx.lineTo(inX + 8, inY + 2); ctx.stroke(); } ctx.restore();
      const v = ((t * 0.25 + i / 4 + 0.5) % 1); const ox = lerp(A * 0.4, A + 70, v), oy = opY + (i - 1.5) * 16;
      ctx.save(); ctx.globalAlpha *= v < 0.15 ? v / 0.15 : 1;
      if (i % 2) { ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(ox - 6, oy, 4, 0, 6.283); ctx.fill(); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(ox + 2 + k * 5.5, oy, 2.4, 0, 6.283); ctx.fill(); } }
      else { ctx.fillStyle = C.mens; ctx.beginPath(); ctx.arc(ox, oy, 3.4, 0, 6.283); ctx.fill(); ctx.fillStyle = lighten(C.teal, 0.2); for (const dd of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + dd * 6, oy, 3, 0, 6.283); ctx.fill(); } }
      ctx.restore(); }
  }
  ctx.restore();
  return anker;
}
