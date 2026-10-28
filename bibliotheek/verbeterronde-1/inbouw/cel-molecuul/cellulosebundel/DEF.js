// CELLULOSE — definitief (A, inbouw 28 okt 2026: zonder vezelrand, omklappen zichtbaar aan de CH2OH-zijtak).
// Recept (biotopics.co.uk 'The cellulose molecule in 3-D'; Pearson Biochemistry 'Cellulose: structure, properties
// and biological function'; WOU Chemistry 'Carbohydrates part 4'): cellulose = rechte, onvertakte ketens van glucose
// met β-1,4-bindingen; elke tweede glucose ligt omgekeerd (180° gedraaid t.o.v. de buur). Dat zie je aan de
// CH2OH-zijtak (kort steeltje met bolletje, zelfde oker): afwisselend boven en onder de keten, en aan het
// zuurstofbruggetje (teal) dat afwisselend boven/onder ligt. De ketens liggen evenwijdig en worden door
// waterstofbruggen (teal stippellijntjes) bij elkaar gehouden tot een vezeltje (microfibril); er zit géén omhulsel
// om de vezel (Kamiel 28 okt: groene rand weg). Hier een doorsnede van 2–3 ketens; een echte microfibril heeft er
// veel meer naast elkaar. Glucose blijft oker (V.kh, zelfde molecuul als in zetmeel, C1). Een enzym voor zetmeel
// (amylase) past niet op de β-binding: o.glijd 0..1 laat een enzym over de vezel glijden en eraf schuiven.
// Bekende fouten: losse groene bolletjes; groene glucose; geen waterstofbruggen; ketens die spiralen; een
// vak/omhulsel om de vezel.
// Aanroep zoals voorheen: celluloseBundel(ctx, x, y, n, r, {a, ketens, angle}); nieuw: glijd, t. (col wordt niet
// meer gebruikt: er is geen vezelrand.) Geeft ringposities terug: [[x, y], ...] per keten achter elkaar.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, glijd = -1, t = 0 } = o;
  const gl = (typeof V !== 'undefined' ? V.kh : C.oker); const dy = r * 2.9, dx = r * 2.2; const cs = Math.cos(angle), sn = Math.sin(angle);
  const ringen = []; for (let k = 0; k < ketens; k++) for (let i = 0; i < n; i++) { const px = (k % 2) * r * 0.5 + i * dx, py = k * dy; ringen.push([x + px * cs - py * sn, y + px * sn + py * cs]); }
  if (a <= 0.01) return ringen; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineCap = 'round';
  const L = (n - 1) * dx + r * 0.5; const licht = _mixHex(gl, '#FFFFFF', 0.35), lijn = Math.max(1.2, r * 0.13);
  // CH2OH-zijtak: ring i wijst omhoog (i even) of omlaag (i oneven); iets naar rechts van het midden
  const zij = (i) => (i % 2 ? 1 : -1);
  // waterstofbruggen tussen de ketens: kort en recht, van een zijtak die naar de buurketen wijst naar die buurketen
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = Math.max(1, r * 0.13); ctx.setLineDash([r * 0.22, r * 0.2]);
  for (let k = 0; k < ketens - 1; k++) { const o0 = (k % 2) * r * 0.5, o1 = ((k + 1) % 2) * r * 0.5;
    for (let i = 0; i < n; i++) { if (i % 2 === 1) { const sx = o0 + i * dx + r * 0.25; ctx.beginPath(); ctx.moveTo(sx, k * dy + r * 1.35); ctx.lineTo(sx, (k + 1) * dy - r * 0.72); ctx.stroke(); }
      else { const sx = o1 + i * dx + r * 0.25; ctx.beginPath(); ctx.moveTo(sx, (k + 1) * dy - r * 1.35); ctx.lineTo(sx, k * dy + r * 0.72); ctx.stroke(); } } }
  ctx.setLineDash([]);
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.5; const yy = k * dy;
    // β-1,4-bruggetjes: het zuurstof (teal) ligt afwisselend boven en onder de keten
    for (let i = 0; i < n - 1; i++) { const up = i % 2 ? -1 : 1; ctx.strokeStyle = licht; ctx.lineWidth = Math.max(1.5, r * 0.18); ctx.beginPath(); ctx.moveTo(off + i * dx + r * 0.7, yy); ctx.lineTo(off + i * dx + dx / 2, yy + up * r * 0.35); ctx.lineTo(off + (i + 1) * dx - r * 0.7, yy); ctx.stroke();
      ctx.beginPath(); ctx.arc(off + i * dx + dx / 2, yy + up * r * 0.35, Math.max(1.2, r * 0.16), 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
    // glucoseringen met de CH2OH-zijtak die mee omklapt
    for (let i = 0; i < n; i++) { const cx = off + i * dx, z = zij(i); const sx = cx + r * 0.25, s0 = yy + z * r * 0.62, s1 = yy + z * r * 1.12;
      ctx.strokeStyle = licht; ctx.lineWidth = lijn; ctx.beginPath(); ctx.moveTo(sx, s0); ctx.lineTo(sx, s1); ctx.stroke();
      hexagon(ctx, cx, yy, r * 0.78, rgba(gl, 0.9), licht, Math.max(1, r * 0.08), i % 2 ? Math.PI : 0);
      ctx.beginPath(); ctx.arc(sx, s1, Math.max(1.1, r * 0.17), 0, 6.283); ctx.fillStyle = gl; ctx.fill(); ctx.strokeStyle = licht; ctx.lineWidth = Math.max(0.8, r * 0.06); ctx.stroke(); } }
  // enzym dat niet past en afglijdt
  if (glijd >= 0 && typeof enzymKluwen === 'function') { const g = clamp(glijd, 0, 1); const ex = lerp(-r * 1.0, L * 0.55, ease(Math.min(1, g * 1.4))), ey = -r * 2.6 - ease(clamp((g - 0.55) / 0.45, 0, 1)) * r * 4; enzymKluwen(ctx, ex, ey, r * 1.9, { an: Math.PI / 2 + 0.2 * Math.sin(t * 2), a: 1 - clamp((g - 0.8) / 0.2, 0, 1) * 0.6 }); }
  ctx.restore(); return ringen;
}
