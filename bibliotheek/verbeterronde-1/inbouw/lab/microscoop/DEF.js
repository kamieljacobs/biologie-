// =====================================================================================
// LICHTMICROSCOOP (binoculair, schoolmodel), zijaanzicht als lijntekening (Part C, lab-bibliotheek), op ware maat.
// Recept (Evident/Olympus CX23: 198 × 398 × 386 mm, ± 6 kg; LED-lamp onderin, Abbe-condensor, kruistafel met
//  verplaatsing 76 × 30 mm, coaxiale grove en fijne scherpstelknop aan beide kanten, scherpstellen door de tafel te
//  bewegen (slag grof 15 mm); onderdelen volgens CUNY Bio Lab Manual: oculair, revolver met objectieven,
//  objectieftafel met preparaatklem, condensor, lamp, voet, statief (arm), grove en fijne instelling, lichtregelaar).
//  Opbouw in zijaanzicht: voet ± 250 mm diep met de lamp; statief (C-vorm) achter; kop met twee oculairen schuin
//  (± 30°) naar de kijker; revolver met 3 objectieven (verschillend lang); tafel ± 140 mm met glaasje; condensor
//  onder de tafel; knoppen laag op het statief. Het licht gaat van de lamp omhoog door condensor, preparaat en
//  objectief (teal bundel, alleen als o.licht).
//  Bekende fouten: oculair recht boven het objectief zonder kop; lamp boven de tafel; microscoop zo groot als een
//  kind; scherpstellen door het oculair te draaien.
// x, y = midden van de voet op tafel; s = px per mm. o.tafel 0..1 (hoogte van de tafel binnen de grove slag),
// o.licht (bool), o.kijk (−1 = oculairen naar links, 1 = naar rechts), o.a. Geeft { oculair, objectief, tafel, lamp,
// knop, condensor } terug.
// =====================================================================================
function microscoop(ctx, x, y, s, o = {}) {
  const { a = 1, tafel = 0.5, licht = true } = o; const k = o.kijk || 1;
  const P = (px, py) => [x + k * px * s, y + py * s]; const dz = clamp(tafel, 0, 1) * 15;
  const ret = { oculair: P(95, -380), objectief: P(30, -215), tafel: P(30, -170 - dz), lamp: P(20, -18), knop: P(-80, -110), condensor: P(30, -140 - dz) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(k * s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const L = C.er, lw = Math.max(1.2, s * 1.2) / s, f = rgba(L, 0.10), poly = (pts, fill = f) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); shape(ctx, fill, L, lw); };
  // lichtbundel
  if (licht) { ctx.fillStyle = rgba(C.teal, 0.22); ctx.beginPath(); ctx.moveTo(14, -30); ctx.lineTo(46, -30); ctx.lineTo(40, -150 - dz); ctx.lineTo(36, -228); ctx.lineTo(24, -228); ctx.lineTo(20, -150 - dz); ctx.closePath(); ctx.fill(); }
  // voet met lamp, statief (C-vorm)
  roundRect(ctx, -125, -40, 250, 40, 8); shape(ctx, f, L, lw); circ(ctx, 30, -40, 14, licht ? rgba(C.goud, 0.8) : rgba(L, 0.2), L, lw);
  poly([[-110, -40], [-110, -300], [-90, -330], [60, -330], [70, -300], [-60, -300], [-70, -280], [-70, -40]]);
  // kop met twee oculairen schuin naar de kijker
  poly([[-60, -330], [60, -330], [70, -350], [-40, -360]]); poly([[40, -345], [62, -360], [104, -398], [86, -412], [30, -365]]);
  ctx.save(); ctx.translate(95, -405); ctx.rotate(-0.72); roundRect(ctx, -9, -20, 18, 24, 3); shape(ctx, rgba(L, 0.25), L, lw); ctx.restore();
  // revolver met drie objectieven
  poly([[0, -300], [60, -300], [52, -318], [8, -318]]); poly([[16, -300], [44, -300], [40, -240], [20, -240]], rgba(L, 0.2)); poly([[46, -300], [60, -300], [62, -268], [52, -268]], rgba(L, 0.12)); poly([[-2, -300], [12, -300], [8, -258], [0, -258]], rgba(L, 0.12));
  // tafel (beweegt), glaasje met klem, condensor
  ctx.save(); ctx.translate(0, -dz); poly([[-40, -168], [110, -168], [110, -158], [-40, -158]], rgba(L, 0.22)); poly([[-70, -160], [-40, -168], [-40, -158], [-70, -150]]);
  ctx.fillStyle = rgba('#E8EEF5', 0.5); ctx.fillRect(-10, -172, 80, 4); ctx.fillStyle = rgba(C.paars, 0.6); ctx.fillRect(26, -172, 8, 3); // preparaat
  poly([[10, -158], [50, -158], [44, -138], [16, -138]], rgba(L, 0.16)); ctx.restore();
  // grove en fijne knop (coaxiaal) laag op het statief
  circ(ctx, -90, -110, 24, rgba(L, 0.18), L, lw); circ(ctx, -90, -110, 12, rgba(L, 0.3), L, lw);
  ctx.restore(); return ret;
}
