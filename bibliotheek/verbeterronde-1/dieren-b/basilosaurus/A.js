// ===================================================================================
// BASILOSAURUS (± 40–34 Mj), aanpassing: zoomcirkel voor het achterpootje. Recept: tot ± 18 m, lang palingachtig lijf,
// tanden, kleine borstvinnen en minuscule achterpootjes (± 35–60 cm, met knie, voet en tenen) die niet meer droegen:
// het punt van de walvisreeks. Op normale schaal zijn ze bijna onzichtbaar, dus: o.zoom (0–1) tekent een vergrotingscirkel
// (goud omrand, ×o.zoomK, standaard 5) boven het lijf met het pootje erin, met een lijntje naar de plek op het lijf.
// o.poot = 1 kleurt het pootje goud (zoals voorheen). Geeft { B, R, poot: [x, y] } terug (plek van het pootje in de
// coördinaten van de aanroeper), zodat een naam of eigen zoom daar kan aanhaken.
// ===================================================================================
basilosaurus = function (ctx, x, y, s = 1, o = {}) { const d = ZW_DEF.basilosaurus; d.pal.goud = C.goud; if ((o.a ?? 1) <= 0.01) return;
  const T0 = ctx.getTransform(); let ank = null;
  d.naLijf = function (c, B) { const v = B.pr.vin.poot; if (!v) return; const p = ZwPop.vinPts(B, v, [[0, 4]], {})[0]; const q = c.getTransform().transformPoint(new DOMPoint(p[0], p[1])); ank = T0.inverse().transformPoint(q); };
  const r = ZwTeken.teken(d, ctx, x, y, s, o); d.naLijf = null; if (!r || !ank) return r; r.poot = [ank.x, ank.y];
  const z = o.zoom || 0; if (z > 0.01) { const k = o.zoomK || 5, Rz = (o.zoomR || 60 * s) , cx = ank.x + (o.zoomDx ?? -Rz * 0.4), cy = ank.y + (o.zoomDy ?? -Rz * 2.2);
    ctx.save(); ctx.globalAlpha *= z * (o.a ?? 1); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, Rz * 0.04);
    ctx.beginPath(); ctx.arc(ank.x, ank.y, Rz / k * 1.1, 0, 6.283); ctx.stroke();
    const an = Math.atan2(cy - ank.y, cx - ank.x); ctx.beginPath(); ctx.moveTo(ank.x + Math.cos(an) * Rz / k * 1.1, ank.y + Math.sin(an) * Rz / k * 1.1); ctx.lineTo(cx - Math.cos(an) * Rz, cy - Math.sin(an) * Rz); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.clip();
    ZwTeken.teken(d, ctx, cx + (x - ank.x) * k, cy + (y - ank.y) * k, s * k, Object.assign({}, o, { zoom: 0 })); ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cy, Rz, 0, 6.283); ctx.stroke(); ctx.restore(); r.zoom = [cx, cy, Rz]; }
  return r; };
