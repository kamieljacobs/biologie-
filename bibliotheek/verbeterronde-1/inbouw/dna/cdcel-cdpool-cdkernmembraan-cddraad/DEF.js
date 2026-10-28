// =====================================================================================
// DELENDE CEL — inbouw 28 okt 2026: Kamiel houdt de huidige (oude) cdCel, cdPool, cdKernmembraan en cdDraad ongewijzigd
// ('lekker simpel'; geen organellen, die leiden af). Nieuw is alleen cdAnafaseCel hieronder: de gemelde fout 'geen duidelijke
// anafase' is bevestigd (Wikipedia 'Anaphase'; Digital Histology 'Mitosis overview 7': zusterchromatiden gaan uit elkaar en
// worden naar tegenovergestelde polen getrokken). Bouwt op de oude cdCel (zonder organellen) en de bestaande cdEen/cdPool/cdDraad.
// =====================================================================================
// ANAFASE (OpenStax Biology 2e § 10.2: in de anafase gaan de zusterchromatiden uit elkaar en worden ze naar tegenovergestelde polen
// getrokken; bestaand recept cdEen: centromeer vóórop, armen slepen erachteraan): delende cel met polen; per chromosoom twee
// chromatiden die f (0 = metafaseplaat, 1 = bij de polen) uit elkaar zijn, elk aan een bundel trekdraden vanaf zijn eigen pool.
// cdAnafaseCel(ctx, cx, cy, rx, ry, {f, insnoer, n, len, w, kl, t, a})
function cdAnafaseCel(ctx, cx, cy, rx, ry, o = {}) { const { f = 0.5, insnoer = 0.15, n = 4, len = ry * 0.36, w = Math.max(5, ry * 0.05), kl = C.kernR, t = 0, a = 1 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; cdCel(ctx, cx, cy, rx, ry, { insnoer, t });
  const pl = cx - rx * 0.8, pr = cx + rx * 0.8, e = ease(clamp(f, 0, 1)), d = lerp(w * 0.7, rx * 0.55, e), zw = 0.2 + e * 0.95; // rustige V: armen slepen, maar overlappen de buren niet
  cdPool(ctx, pl, cy); cdPool(ctx, pr, cy);
  for (let i = 0; i < n; i++) { const yy = cy + (i - (n - 1) / 2) * ry * 0.24, yl = lerp(yy, cy + (yy - cy) * 0.85, e);
    cdDraad(ctx, pl, cy, cx - d, yl, 1, CD.draad, Math.max(1, w * 0.18)); cdDraad(ctx, pr, cy, cx + d, yl, 1, CD.draad, Math.max(1, w * 0.18));
    cdEen(ctx, cx - d, yl, len, { w, kl, zwaai: zw, kant: 1, kin: true }); cdEen(ctx, cx + d, yl, len, { w, kl, zwaai: zw, kant: -1, kin: true }); }
  ctx.restore(); }
