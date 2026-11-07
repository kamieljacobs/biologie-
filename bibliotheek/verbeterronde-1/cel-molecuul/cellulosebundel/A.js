// CELLULOSE — variant A 'zelfde glucose als zetmeel, in een vezel' (27 okt 2026).
// Recept (WOU Chemistry 'Carbohydrates part 4'; Berg h. 11): cellulose = rechte, onvertakte ketens van glucose
// met β-1,4-bindingen; elke tweede glucose ligt omgekeerd (hier: het zuurstofbruggetje wisselt boven/onder en
// de ring is 180° gedraaid). De ketens liggen evenwijdig en zijn met waterstofbruggen (teal stippellijntjes,
// dik genoeg om op filmgrootte te zien) tot een vezeltje (microfibril) gebonden. Glucose blijft oker (V.kh,
// zelfde molecuul als in zetmeel, C1); de vezel krijgt een groene rand (plant). Een enzym voor zetmeel
// (amylase) past niet op de β-binding: o.glijd 0..1 laat een enzym over de vezel glijden en eraf schuiven.
// Bekende fouten: losse groene bolletjes; groene glucose; geen waterstofbruggen; ketens die spiralen.
// Aanroep zoals voorheen: celluloseBundel(ctx, x, y, n, r, {a, ketens, angle, col}); nieuw: glijd, t.
// col = kleur van de vezelrand (oud: vulkleur). Geeft ringposities terug: [[x, y], ...] per keten achter elkaar.
function celluloseBundel(ctx, x, y, n, r, o = {}) {
  const { a = 1, ketens = 3, angle = 0, col = (typeof V !== 'undefined' ? V.vezel : C.groen), glijd = -1, t = 0 } = o;
  const gl = (typeof V !== 'undefined' ? V.kh : C.oker); const dy = r * 2.7, dx = r * 2.2; const cs = Math.cos(angle), sn = Math.sin(angle);
  const ringen = []; for (let k = 0; k < ketens; k++) for (let i = 0; i < n; i++) { const px = (k % 2) * r * 0.5 + i * dx, py = k * dy; ringen.push([x + px * cs - py * sn, y + px * sn + py * cs]); }
  if (a <= 0.01) return ringen; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineCap = 'round';
  // vezelrand (microfibril)
  const L = (n - 1) * dx + r * 0.5; roundRect(ctx, -r * 1.5, -r * 1.5, L + r * 3, (ketens - 1) * dy + r * 3, r * 1.4); shape(ctx, rgba(col, 0.1), rgba(col, 0.85), Math.max(1.5, r * 0.18));
  // waterstofbruggen tussen de ketens
  ctx.strokeStyle = rgba(C.teal, 0.85); ctx.lineWidth = Math.max(1.2, r * 0.16); ctx.setLineDash([r * 0.28, r * 0.24]);
  for (let k = 0; k < ketens - 1; k++) for (let i = 0; i < n; i++) { const x0 = (k % 2) * r * 0.5 + i * dx, x1 = ((k + 1) % 2) * r * 0.5 + i * dx; ctx.beginPath(); ctx.moveTo(x0 + r * 0.2, k * dy + r * 0.7); ctx.lineTo(x1 + r * 0.2, (k + 1) * dy - r * 0.7); ctx.stroke(); }
  ctx.setLineDash([]);
  // ketens: rechte lijn met omgekeerde ringen (β-1,4: brugje afwisselend boven/onder)
  for (let k = 0; k < ketens; k++) { const off = (k % 2) * r * 0.5; const yy = k * dy;
    for (let i = 0; i < n - 1; i++) { const up = i % 2 ? -1 : 1; ctx.strokeStyle = _mixHex(gl, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.18); ctx.beginPath(); ctx.moveTo(off + i * dx + r * 0.7, yy); ctx.lineTo(off + i * dx + dx / 2, yy + up * r * 0.35); ctx.lineTo(off + (i + 1) * dx - r * 0.7, yy); ctx.stroke();
      ctx.beginPath(); ctx.arc(off + i * dx + dx / 2, yy + up * r * 0.35, Math.max(1.2, r * 0.16), 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); }
    for (let i = 0; i < n; i++) { const flip = i % 2 ? Math.PI : 0; ctx.save(); ctx.translate(off + i * dx, yy); ctx.rotate(flip); hexagon(ctx, 0, 0, r * 0.78, rgba(gl, 0.9), _mixHex(gl, '#FFFFFF', 0.35), Math.max(1, r * 0.08));
      ctx.beginPath(); ctx.arc(r * 0.35, -r * 0.35, Math.max(1, r * 0.11), 0, 6.283); ctx.fillStyle = _mixHex(gl, '#1A2740', 0.35); ctx.fill(); ctx.restore(); } } // stipje = CH2OH-kant: wisselt mee met het omklappen
  // enzym dat niet past en afglijdt
  if (glijd >= 0 && typeof enzymKluwen === 'function') { const g = clamp(glijd, 0, 1); const ex = lerp(-r * 1.0, L * 0.55, ease(Math.min(1, g * 1.4))), ey = -r * 2.6 - ease(clamp((g - 0.55) / 0.45, 0, 1)) * r * 4; enzymKluwen(ctx, ex, ey, r * 1.9, { an: Math.PI / 2 + 0.2 * Math.sin(t * 2), a: 1 - clamp((g - 0.8) / 0.2, 0, 1) * 0.6 }); }
  ctx.restore(); return ringen;
}
