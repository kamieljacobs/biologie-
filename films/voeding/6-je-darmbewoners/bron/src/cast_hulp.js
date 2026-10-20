// ===== Personages in de voedingsfilms (20 okt 2026) =====
// Hulpjes rond persoon() uit lib_cast.js: rompmaat (om organen op de romp te tekenen) en liggend (in bed).
// Jonge personages komen uit het castboek zelf: persoon(ctx, 'kind', ...) en persoon(ctx, 'baby', ...).
function circ(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
// zelfde maten als in persoon(): cx, hh (hoofdmaat), schouder/taille/heup (y), breed (schouderbreedte), hw2 (heupbreedte)
function rompMaat(id, x, y, h) { const P = CAST[id], H = h * (P.lengte || 1), hh = H / (P.kop || 6.1), top = y - H;
  return { cx: x + (P.krom ? hh * 0.15 : 0), hh, top, hoofd: top + hh * 0.55, schouder: top + hh * 1.42, taille: top + hh * 3.0, heup: top + hh * 3.45, breed: hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8)), hw2: hh * (P.heupK || 1.45) }; }
// pad van de romp (voor clip): zelfde vorm als in persoon()
function rompPad(ctx, m) { const { cx, hh, schouder: sY, taille: tY, heup: hY, breed: b, hw2 } = m; ctx.beginPath(); ctx.moveTo(cx, sY - hh * 0.1);
  ctx.bezierCurveTo(cx + b * 0.46, sY - hh * 0.12, cx + b * 0.56, sY + hh * 0.12, cx + b * 0.5, sY + hh * 0.62);
  ctx.bezierCurveTo(cx + b * 0.45, tY - hh * 0.3, cx + hw2 * 0.52, hY - hh * 0.2, cx + hw2 * 0.54, hY + hh * 0.22);
  ctx.quadraticCurveTo(cx, hY + hh * 0.36, cx - hw2 * 0.54, hY + hh * 0.22);
  ctx.bezierCurveTo(cx - hw2 * 0.52, hY - hh * 0.2, cx - b * 0.45, tY - hh * 0.3, cx - b * 0.5, sY + hh * 0.62);
  ctx.bezierCurveTo(cx - b * 0.56, sY + hh * 0.12, cx - b * 0.46, sY - hh * 0.12, cx, sY - hh * 0.1); ctx.closePath(); }
// liggend personage (hoofd links), bv. in bed. (hx, hy) = midden van het hoofd, h = lengte
function liggend(ctx, id, hx, hy, h, o = {}) { const m = rompMaat(id, 0, 0, h), d = -m.hoofd; // afstand voeten -> hoofdmidden
  ctx.save(); ctx.translate(hx + d, hy); ctx.rotate(-Math.PI / 2); const r = persoon(ctx, id, 0, 0, h, o); ctx.restore(); return r; }
