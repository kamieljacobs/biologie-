// --- intracellulaire receptor (steroïdhormoon): ligand gaat door het membraan, bindt de receptor in het cytoplasma,
// het complex gaat de kern in en bindt het DNA. f: 0–0,3 door het membraan · 0,3–0,5 binden · 0,5–1 naar de kern.
function _mrSteroid(ctx, x, y, w, col, an = 0) { // vier gekoppelde ringen (3 zeshoeken + vijfhoek), herkenbaar als steroïd
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const r = w / 4.6; const C6 = [[-1.73 * r, 0.5 * r], [0, -0.5 * r], [1.73 * r, 0.5 * r]];
  const ring = (cx, cy, n, rr) => { ctx.beginPath(); for (let i = 0; i < n; i++) { const a2 = -Math.PI / 2 + i * 6.283 / n + (n === 6 ? Math.PI / 6 : 0); const px = cx + Math.cos(a2) * rr, py = cy + Math.sin(a2) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); shape(ctx, rgba(col, 0.85), lighten(col, 0.4), Math.max(1, r * 0.18)); };
  C6.forEach(p => ring(p[0], p[1], 6, r)); ring(3.25 * r, -0.2 * r, 5, r * 0.88); ctx.restore();
}
function _mrIntern(ctx, x, y, s, o) {
  const { f = 0, ligCol = C.paars, kern = [0, 260], recCol = C.enzym, t = 0 } = o;
  const kx = kern[0] * s, ky = kern[1] * s; // kernrand (lokaal), membraan op y = 0, cytoplasma bij +y
  const lig = f < 0.3 ? [lerp(-30, 10, f / 0.3) * s, lerp(-70, 60, ease(f / 0.3)) * s] : null;
  const recStart = [40 * s, 120 * s]; const mv = ease(clamp((f - 0.5) / 0.5, 0, 1));
  const rp = [lerp(recStart[0], kx, mv), lerp(recStart[1], ky - 26 * s, mv)];
  // receptor: gevouwen keten met een DNA-bindend deel (twee 'vingers') en een hormoonzak
  ctx.save(); ctx.translate(rp[0], rp[1]); const b = clamp((f - 0.3) / 0.2, 0, 1);
  enzymKluwen(ctx, 0, 0, 24 * s, { col: recCol, an: -Math.PI / 2, sluit: b, seed: 7 });
  ctx.strokeStyle = lighten(recCol, 0.3); ctx.lineWidth = Math.max(1.5, 4 * s); ctx.lineCap = 'round';
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 8 * s, 20 * s); ctx.quadraticCurveTo(sd * 14 * s, 32 * s, sd * 6 * s, 40 * s + b * 4 * s); ctx.stroke(); }
  if (b > 0.01) _mrSteroid(ctx, 0, -20 * s + (1 - b) * -30 * s, 22 * s, ligCol);
  ctx.restore();
  if (lig) _mrSteroid(ctx, lig[0], lig[1], 22 * s, ligCol, 0.4);
  return { receptor: [rp[0], rp[1]] };
}
