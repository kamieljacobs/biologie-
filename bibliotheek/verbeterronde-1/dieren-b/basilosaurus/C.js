// ===================================================================================
// BASILOSAURUS (± 40–34 Mj), aanpassing: zoomcirkel voor het achterpootje. Recept: tot ± 18 m, lang palingachtig lijf,
// tanden, kleine borstvinnen en minuscule achterpootjes (± 35–60 cm, met knie, voet en tenen) die niet meer droegen:
// het punt van de walvisreeks. Op normale schaal zijn ze bijna onzichtbaar, dus: o.zoom (0–1) tekent een vergrotingscirkel
// (goud omrand, ×o.zoomK, standaard 5) boven het lijf met het pootje erin, met een lijntje naar de plek op het lijf.
// o.poot = 1 kleurt het pootje goud (zoals voorheen). Geeft { B, R, poot: [x, y] } terug (plek van het pootje in de
// coördinaten van de aanroeper), zodat een naam of eigen zoom daar kan aanhaken.
// ===================================================================================
// Variant C (= A + herstel): het achterpootje als ECHT KLEIN POOTJE (dij, knie, onderbeen, voet met teentjes), geen
// vinlap. Gingerich, Smith & Simons 1990 (Science): "functional pelvic limb and foot bones ... The foot is paraxonic";
// NYIT: "retained external hindlimbs with a functional knee and toes"; Encyclopedia of Alabama: "reduced, but well-formed
// legs, feet, and toes". Grootte ± 1/40 van het lijf (op schaal bijna onzichtbaar: daarom de zoomcirkel).
(function () { const d = ZW_DEF.basilosaurus; d.achter = d.achter.filter(([n]) => n !== 'poot'); d.voor = d.voor.filter(([n]) => n !== 'poot'); })();
function _basiPootje(ctx, B, d, goud) { const v = B.pr.vin.poot; if (!v) return; const s0 = v.s, d0 = v.d + 3, P = (ds, dd) => ZwPop.pt(B, s0 + ds, d0 + dd);
  const H = P(0, 0), K = P(7, -9), A = P(-1, -17), V = P(4, -21), kl = goud ? C.goud : d.pal.poot, rand = ZwPop.mixHex(kl, 0.35, '#1E2A3A');
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, c] of [[6.5, rand], [4.6, kl]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(...H); ctx.lineTo(...K); ctx.lineTo(...A); ctx.lineTo(...V); ctx.stroke(); }
  ctx.fillStyle = kl; ctx.beginPath(); ctx.arc(K[0], K[1], 2.8, 0, 6.283); ctx.fill(); // knie
  for (const [ds, dd] of [[4, -5], [6, -2], [6, 1.5]]) { const T = P(4 + ds, -21 + dd); ctx.strokeStyle = rand; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(...V); ctx.lineTo(...T); ctx.stroke(); ctx.strokeStyle = kl; ctx.lineWidth = 2; ctx.stroke(); } }
basilosaurus = function (ctx, x, y, s = 1, o = {}) { const d = ZW_DEF.basilosaurus; d.pal.goud = C.goud; if ((o.a ?? 1) <= 0.01) return;
  const T0 = ctx.getTransform(); let ank = null;
  d.naLijf = function (c, B) { const v = B.pr.vin.poot; if (!v) return; _basiPootje(c, B, d, (o.poot || 0) > 0.01); const p = ZwPop.vinPts(B, v, [[0, 4]], {})[0]; const q = c.getTransform().transformPoint(new DOMPoint(p[0], p[1])); ank = T0.inverse().transformPoint(q); };
  const r = ZwTeken.teken(d, ctx, x, y, s, o); d.naLijf = function (c, B) { _basiPootje(c, B, d, (o.poot || 0) > 0.01); }; if (!r || !ank) return r; r.poot = [ank.x, ank.y];
  const z = o.zoom || 0; if (z > 0.01) { const k = o.zoomK || 5, Rz = (o.zoomR || 60 * s) , cx = ank.x + (o.zoomDx ?? -Rz * 0.4), cy = ank.y + (o.zoomDy ?? -Rz * 2.2);
    ctx.save(); ctx.globalAlpha *= z * (o.a ?? 1); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, Rz * 0.04);
    ctx.beginPath(); ctx.arc(ank.x, ank.y, Rz / k * 1.1, 0, 6.283); ctx.stroke();
    const an = Math.atan2(cy - ank.y, cx - ank.x); ctx.beginPath(); ctx.moveTo(ank.x + Math.cos(an) * Rz / k * 1.1, ank.y + Math.sin(an) * Rz / k * 1.1); ctx.lineTo(cx - Math.cos(an) * Rz, cy - Math.sin(an) * Rz); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.clip();
    ZwTeken.teken(d, ctx, cx + (x - ank.x) * k, cy + (y - ank.y) * k, s * k, Object.assign({}, o, { zoom: 0 })); ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, 6.283); ctx.stroke(); ctx.restore(); r.zoom = [cx, cy, Rz]; }
  d.naLijf = null; return r; };
