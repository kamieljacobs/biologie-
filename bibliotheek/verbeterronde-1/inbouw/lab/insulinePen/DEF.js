// =====================================================================================
// INSULINEPEN tegen de buik, met een doorsnede van huid, onderhuids vet en buikspier onder de prikplek.
// Recept: NovoPen 6 (gebruiksaanwijzing Novo Nordisk; ADCES): dosis 1–60 eenheden, indrukken en ± 6 s wachten
//  voor je de naald terugtrekt (≈). Het pennaaldje is kort (± 4–6 mm, ≈) en gaat loodrecht in het onderhuidse vet
//  van de buik (± 5 cm naast de navel, ≈); daar vormt de insuline een depot dat langzaam in het bloed komt. Lagen
//  (≈): huid ± 2 mm, onderhuids vet ± 10–20 mm (hier 14), dan de buikspier — de naald komt daar dus niet.
//  Pen ± 16 cm (≈). Bekende fouten: depot in de spier; naald schuin; pen in de bovenarm met een spierprik verwarren.
//  Dosis instellen: de doseerknop draait en schuift uit (± 0,5 mm per eenheid, ≈) en het venster telt op (0 → 12);
//  bij indrukken schuift de knop terug en telt het venster af naar 0 terwijl het depot groeit.
// x, y = prikplek op de huid; s = px per mm. o.prik 0..1, o.dosis (ingestelde eenheden), o.druk 0..1 (indrukken: knop
// terug, teller naar 0, depot groeit), o.a.
// Geeft { punt, knop, huid, vet, depot } terug.
// =====================================================================================
function _penTeken(ctx, s, o) { // pen in lokale mm, punt van de naald op (0,0), pen naar links (−x); s = px per mm
  const { dop = 0, dosis = 10, druk = 0, naald = true, vul = 0.7 } = o; const lw = Math.max(1, s * 0.25) / s;
  const body = '#3E6F95', bodyL = '#5B8DB5', bodyD = '#2C5476', staal = '#C8D0DA';
  const xN = -4, xHub = xN - 6, xCart = xHub - 52, xBody = xCart - 70, xDial = xBody - 20, uit = 0.5 * Math.max(0, dosis) * (1 - clamp(druk, 0, 1)), teller = Math.round(Math.max(0, dosis) * (1 - clamp(druk, 0, 1))); // knop schuift ± 0,5 mm per eenheid uit (≈)
  // naald (4 mm, 32 G ≈ 0,23 mm) + hub
  if (naald) { ctx.fillStyle = staal; ctx.fillRect(xN, -0.15, 4, 0.3); ctx.fillStyle = '#D5DBE3'; roundRect(ctx, xHub, -3.5, 6, 7, 1); ctx.fill(); }
  // houder met venster op de patroon (insuline helder, bijna kleurloos; zuigerstopje)
  roundRect(ctx, xCart, -6.5, xHub - xCart, 13, 3); shape(ctx, '#B9C4D2', '#DCE3EB', lw);
  roundRect(ctx, xCart + 8, -4, 38, 8, 2); ctx.fillStyle = '#0F1828'; ctx.fill(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(xCart + 8 + 38 * (1 - vul), -3.5, 38 * vul, 7);
  ctx.fillStyle = '#3B3F48'; ctx.fillRect(xCart + 8 + 38 * (1 - vul) - 2, -3.5, 2.5, 7);
  // lichaam, doseerknop met venster, drukknop
  roundRect(ctx, xBody, -7.5, xCart - xBody + 2, 15, 3); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyL; ctx.fillRect(xBody + 2, -6.5, xCart - xBody - 2, 2);
  roundRect(ctx, xBody + 22, -4.5, 14, 9, 1.5); ctx.fillStyle = '#E8EEF5'; ctx.fill(); if (s > 1.4) { const m = ctx.getTransform(), wx = m.a * (xBody + 29) + m.e, wy = m.b * (xBody + 29) + m.f, sc2 = Math.hypot(m.a, m.b); ctx.save(); ctx.setTransform(sc2, 0, 0, sc2, wx, wy); text(ctx, String(teller), 0, 2.2, fMeta(6), '#121A26', 'center'); ctx.restore(); } // cijfer rechtop
  roundRect(ctx, xDial - uit, -8, 20, 16, 3); shape(ctx, bodyD, bodyL, lw); if (s > 1.4) { ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = lw; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(xDial - uit + k * 2.8, -8); ctx.lineTo(xDial - uit + k * 2.8, 8); ctx.stroke(); } }
  roundRect(ctx, xDial - uit - 6, -5, 7, 10, 2); shape(ctx, '#D5DBE3', '#F0F2F5', lw);
  // dop (schuift over naald en houder)
  if (dop > 0.01) { ctx.save(); ctx.globalAlpha *= dop; const dx = (1 - dop) * 40; roundRect(ctx, xCart - 4 + dx, -8, 70, 16, 4); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyD; ctx.fillRect(xCart + 2 + dx, -10.5, 40, 3); ctx.restore(); }
  return { knop: xDial - uit - 6, venster: xBody + 29, lengte: -(xDial - uit - 6) };
}
function insulinePen(ctx, x, y, s, o = {}) {
  const { a = 1, prik = 1, druk = 0, buik = true } = o; const diep = buik ? clamp(prik, 0, 1) * 4 : 0, tx = x, ty = y + diep * s;
  const ret = { punt: [tx, ty], knop: [x, y - 160 * s], huid: [x + 40 * s, y], vet: [x + 40 * s, y + 9 * s], depot: [tx, ty] }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  if (buik) { const B = 55, laag = (d0, d1, f) => { ctx.fillStyle = f; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d0 + xx * xx / 900) * s); } for (let k = 30; k >= 0; k--) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d1 + xx * xx / 900) * s); } ctx.closePath(); ctx.fill(); };
    laag(0, 2, BIO.huid); laag(0, 0.5, BIO.huidS); laag(2, 16, BIO.vet); laag(16, 30, BIO.spier);
    if (s > 3) { ctx.save(); ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (2 + xx * xx / 900) * s); } for (let k = 30; k >= 0; k--) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (16 + xx * xx / 900) * s); } ctx.clip(); ctx.strokeStyle = rgba(BIO.vetS, 0.6); ctx.lineWidth = 1;
      for (let i = 0; i < 22; i++) { const xx = -B + 4 + (i % 11) * 10 + hash(i) * 3, yy = 5.5 + Math.floor(i / 11) * 6.5 + hash(i + 4); ctx.beginPath(); ctx.ellipse(x + xx * s, y + (yy + xx * xx / 900) * s, 4.4 * s, 3 * s, 0, 0, 6.283); ctx.stroke(); } ctx.restore(); }
    const dep = clamp(druk, 0, 1) * clamp(prik * 2 - 1, 0, 1); if (dep > 0.01) { ctx.fillStyle = rgba(C.teal, 0.6); ctx.beginPath(); ctx.ellipse(tx, ty + 0.5 * s, Math.sqrt(dep) * 5 * s, Math.sqrt(dep) * 2.6 * s, 0, 0, 6.283); ctx.fill(); } }
  ctx.translate(tx, ty); ctx.rotate(Math.PI / 2); ctx.scale(s, s); _penTeken(ctx, s, Object.assign({ dosis: 0 }, o, { dop: 0 }));
  ctx.restore(); return ret;
}
