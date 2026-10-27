// =====================================================================================
// INSULINEPEN (navulbaar, met 3 ml-patroon), zijaanzicht, op ware maat; dop op/af, dosis instellen, indrukken.
// Recept: NovoPen 6 (gebruiksaanwijzing Novo Nordisk + ADCES-productblad): dop, patroonhouder met venster op de
//  Penfill-patroon van 3 ml (300 eenheden bij U-100), doseerknop die je uittrekt en draait (1–60 eenheden, per 1),
//  dosisvenster, en indrukken om in te spuiten; de knop schuift dan terug. Pennaaldjes zijn kort (± 4–6 mm, ≈) en
//  gaan in het onderhuidse vet, niet in de spier. Lengte pen ± 16 cm, ± 1,6 cm dik (≈, productfoto's).
//  Insuline is helder (bijna kleurloos): hier lichte teal-zweem in het venster.
//  Bekende fouten: pen zo dik als een sigaar of zo lang als een onderarm; lange naald zoals bij een spierprik;
//  dosisvenster aan de naaldkant.
// x, y = naaldpunt; s = px per mm. o.dop 0..1, o.dosis (eenheden), o.druk 0..1 (knop ingedrukt), o.vul 0..1
// (patroon), o.rot, o.a. Geeft { punt, knop, venster } terug.
// =====================================================================================
function _penTeken(ctx, s, o) { // pen in lokale mm, punt van de naald op (0,0), pen naar links (−x); s = px per mm
  const { dop = 0, dosis = 10, druk = 0, naald = true, vul = 0.7 } = o; const lw = Math.max(1, s * 0.25) / s;
  const body = '#3E6F95', bodyL = '#5B8DB5', bodyD = '#2C5476', staal = '#C8D0DA';
  const xN = -4, xHub = xN - 6, xCart = xHub - 52, xBody = xCart - 70, xDial = xBody - 20, uit = 8 * (1 - clamp(druk, 0, 1)) * (dosis > 0 ? 1 : 0);
  // naald (4 mm, 32 G ≈ 0,23 mm) + hub
  if (naald) { ctx.fillStyle = staal; ctx.fillRect(xN, -0.15, 4, 0.3); ctx.fillStyle = '#D5DBE3'; roundRect(ctx, xHub, -3.5, 6, 7, 1); ctx.fill(); }
  // houder met venster op de patroon (insuline helder, bijna kleurloos; zuigerstopje)
  roundRect(ctx, xCart, -6.5, xHub - xCart, 13, 3); shape(ctx, '#B9C4D2', '#DCE3EB', lw);
  roundRect(ctx, xCart + 8, -4, 38, 8, 2); ctx.fillStyle = '#0F1828'; ctx.fill(); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fillRect(xCart + 8 + 38 * (1 - vul), -3.5, 38 * vul, 7);
  ctx.fillStyle = '#3B3F48'; ctx.fillRect(xCart + 8 + 38 * (1 - vul) - 2, -3.5, 2.5, 7);
  // lichaam, doseerknop met venster, drukknop
  roundRect(ctx, xBody, -7.5, xCart - xBody + 2, 15, 3); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyL; ctx.fillRect(xBody + 2, -6.5, xCart - xBody - 2, 2);
  roundRect(ctx, xBody + 20, -3.5, 18, 7, 1.5); ctx.fillStyle = '#E8EEF5'; ctx.fill(); if (s > 1.4) text(ctx, String(Math.round(dosis)), xBody + 29, 2.2, fMeta(6), '#121A26', 'center');
  roundRect(ctx, xDial - uit, -8, 20, 16, 3); shape(ctx, bodyD, bodyL, lw); if (s > 1.4) { ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = lw; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(xDial - uit + k * 2.8, -8); ctx.lineTo(xDial - uit + k * 2.8, 8); ctx.stroke(); } }
  roundRect(ctx, xDial - uit - 6, -5, 7, 10, 2); shape(ctx, '#D5DBE3', '#F0F2F5', lw);
  // dop (schuift over naald en houder)
  if (dop > 0.01) { ctx.save(); ctx.globalAlpha *= dop; const dx = (1 - dop) * 40; roundRect(ctx, xCart - 4 + dx, -8, 70, 16, 4); shape(ctx, body, bodyL, lw); ctx.fillStyle = bodyD; ctx.fillRect(xCart + 2 + dx, -10.5, 40, 3); ctx.restore(); }
  return { knop: xDial - uit - 6, venster: xBody + 29, lengte: -(xDial - uit - 6) };
}
function insulinePen(ctx, x, y, s, o = {}) {
  const { a = 1, rot = 0 } = o; const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [x + (px * co - py * si) * s, y + (px * si + py * co) * s];
  const ret = { punt: [x, y], knop: P(-160, 0), venster: P(-110, 0) }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineJoin = 'round'; const r = _penTeken(ctx, s, o); ctx.restore();
  ret.knop = P(r.knop, 0); ret.venster = P(r.venster, 0); return ret;
}
