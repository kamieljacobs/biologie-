// ===== Personages in de voedingsfilms (20 okt 2026) =====
// Hulpjes rond persoon() uit lib_cast.js: rompmaat (om organen op de romp te tekenen), tint (lichaam deels gekleurd),
// kind (jonger personage met kinderverhoudingen) en liggend (in bed).
function circ(ctx, x, y, r, fill, stroke, lw = 1.5) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
// zelfde maten als in persoon(): cx, hh (hoofdmaat), schouder/taille/heup (y), breed (schouderbreedte), hw2 (heupbreedte)
function rompMaat(id, x, y, h) { const P = CAST[id], H = h * (P.lengte || 1), hh = H / 6.1, top = y - H;
  return { cx: x + (P.krom ? hh * 0.15 : 0), hh, top, hoofd: top + hh * 0.55, schouder: top + hh * 1.42, taille: top + hh * 3.0, heup: top + hh * 3.45, breed: hh * (P.leeftijd > 30 ? 1.95 : 1.8), hw2: hh * 1.45 }; }
// pad van de romp (voor clip): zelfde vorm als in persoon()
function rompPad(ctx, m) { const { cx, hh, schouder: sY, taille: tY, heup: hY, breed: b, hw2 } = m; ctx.beginPath(); ctx.moveTo(cx, sY - hh * 0.1);
  ctx.bezierCurveTo(cx + b * 0.46, sY - hh * 0.12, cx + b * 0.56, sY + hh * 0.12, cx + b * 0.5, sY + hh * 0.62);
  ctx.bezierCurveTo(cx + b * 0.45, tY - hh * 0.3, cx + hw2 * 0.52, hY - hh * 0.2, cx + hw2 * 0.54, hY + hh * 0.22);
  ctx.quadraticCurveTo(cx, hY + hh * 0.36, cx - hw2 * 0.54, hY + hh * 0.22);
  ctx.bezierCurveTo(cx - hw2 * 0.52, hY - hh * 0.2, cx - b * 0.45, tY - hh * 0.3, cx - b * 0.5, sY + hh * 0.62);
  ctx.bezierCurveTo(cx - b * 0.56, sY + hh * 0.12, cx - b * 0.46, sY - hh * 0.12, cx, sY - hh * 0.1); ctx.closePath(); }
const _CASTDOEK = {};
function _castDoek(k, w, h) { let c = _CASTDOEK[k]; if (!c) { c = _CASTDOEK[k] = document.createElement('canvas'); } if (c.width !== w || c.height !== h) { c.width = w; c.height = h; } const g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h); return [c, g]; }
// personage dat van onder af voor een deel (frac 0..1 van de lengte) met kleur gevuld is, bv. 'ruim 50 % water'
function persoonTint(ctx, id, x, y, h, o = {}, kleur = '#4FB3A5', frac = 0.5, dekking = 0.7) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const S = 2, w = Math.ceil(h * 0.9), hh = Math.ceil(h * 1.12);
  const [c, g] = _castDoek('tint', w * S, hh * S); g.scale(S, S); const r = persoon(g, id, w / 2, hh - 6, h, Object.assign({}, o, { a: 1 }));
  if (frac > 0.001) { g.globalCompositeOperation = 'source-atop'; g.fillStyle = rgba(kleur, dekking); g.fillRect(0, hh - 6 - h * frac, w, h * frac + 6); g.globalCompositeOperation = 'source-over'; }
  ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(c, x - w / 2, y - hh + 6, w, hh); ctx.restore(); return r; }
// jong kind in de stijl van de personages: hoofd en hals op ware grootte, lijf kleiner (kinderverhoudingen). h = lengte van het kind
function kindFiguur(ctx, id, x, y, h, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; const H0 = h / 0.72, m = rompMaat(id, 0, 0, H0), knip = m.schouder - m.hh * 0.12 - m.top, kop = knip, lijf = H0 * (CAST[id].lengte || 1) - knip, k2 = 0.64;
  const S = 2, w = Math.ceil(H0 * 0.9), hgt = Math.ceil(H0 * 1.1), [c, g] = _castDoek('kind', w * S, hgt * S); g.scale(S, S); const top = hgt - 6 - H0 * (CAST[id].lengte || 1);
  persoon(g, id, w / 2, hgt - 6, H0, Object.assign({}, o, { a: 1 }));
  const tot = kop + lijf * k2, sch = h / tot; // alles samen precies h hoog
  ctx.save(); ctx.globalAlpha *= a; const y0 = y - h;
  ctx.drawImage(c, 0, top * S, w * S, kop * S, x - w * sch / 2, y0, w * sch, kop * sch); // hoofd
  ctx.drawImage(c, 0, (top + kop) * S, w * S, (lijf + 6) * S, x - w * sch * k2 / 2, y0 + kop * sch - 0.5, w * sch * k2, (lijf + 6) * sch * k2); // lijf
  ctx.restore(); }
// liggend personage (hoofd links), bv. in bed. (hx, hy) = midden van het hoofd, h = lengte
function liggend(ctx, id, hx, hy, h, o = {}) { const m = rompMaat(id, 0, 0, h), d = -m.hoofd; // afstand voeten -> hoofdmidden
  ctx.save(); ctx.translate(hx + d, hy); ctx.rotate(-Math.PI / 2); const r = persoon(ctx, id, 0, 0, h, o); ctx.restore(); return r; }
