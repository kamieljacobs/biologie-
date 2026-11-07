// =====================================================================================
// EIERSTOK in doorsnede. Recept: eierstok ± 3 × 2 × 1 cm (amandel); schors (buitenste derde) met primordiale
// follikels (eicel met één laag platte cellen; klein, ± 40 per beeld genoeg: het zijn er duizenden, niet tekenen
// als kralenketting), merg in het midden met bloedvaten die via de hilus binnenkomen. Rijping: primair → secundair
// → follikel met holte (antrum), eicel op de cumulus → Graafse follikel 18–25 mm (zo groot dat hij uitpuilt aan het
// oppervlak). Eisprong (eis 0 → 1): de follikelwand en de wand van de eierstok scheuren op de top van de bult
// (stigma), follikelvocht stroomt uit en neemt de eicel met zona en stralenkrans (cumulus) mee; de lege follikel
// zakt in. Daarna (geel 0 → 1) wordt op precies dezelfde plek het gele lichaam (geelLichaam) gevormd uit de wand.
// Groottes niet op schaal (follikels vergroot). Bron: Junqueira h. 22; Megías, Atlas of Plant and Animal Histology
// (Univ. Vigo) 'ovarian follicles'. Bekende fouten: honderden gelijke kraaltjes; eisprong als eicel die met
// streepjes naast de eierstok zweeft; geel lichaam los van de plek van de eisprong.
// =====================================================================================
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 60, groei = 0, eis = 0, geel = 0, t = 0, winnaar = 3 } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const grp = [[-0.45, -0.38], [-0.2, 0.48], [0.18, -0.52], [0.5, -0.12], [-0.6, 0.22]];
  // positie van de winnaar: tegen de rand, zodat hij uitpuilt
  const wa = Math.atan2(grp[winnaar][1] / 1, grp[winnaar][0] / 1), WR = ry * 0.42;
  const randR = th => Math.hypot(Math.cos(th) * rx, Math.sin(th) * ry);
  const gW = groei; const wf = Math.pow(gW, 1.6), wr = lerp(9, WR, wf);
  const wd = randR(wa) - wr * lerp(1.2, 0.72, wf) ; const wx = x + Math.cos(wa) * wd, wy = y + Math.sin(wa) * wd * (ry / rx) * (rx / ry);
  const bult = wf * wr * 0.55 * (1 - clamp(geel, 0, 1) * 0.8) * (1 - 0.5 * clamp(eis, 0, 1));
  const omtrek = Array.from({ length: 72 }, (_, k) => { const an = k / 72 * 6.283; let w = 1 + 0.03 * Math.sin(an * 3 + 1) + 0.02 * Math.sin(an * 7);
    const d = Math.abs(((an - wa) % 6.283 + 9.425) % 6.283 - 3.1416); const b = d < 0.5 ? bult * Math.pow(Math.cos(d / 0.5 * Math.PI / 2), 2) : 0;
    return [x + Math.cos(an) * (rx * w + b * Math.abs(Math.cos(an))), y + Math.sin(an) * (ry * w + b * Math.abs(Math.sin(an)))]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.32), '#D9A894', 3);
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.08, rx * 0.5, ry * 0.42, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.35); ctx.fill();
  const vat = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke(); };
  const vs = Math.max(1, ry / 180);
  [[-0.05, 1], [0.05, 1]].forEach(([dx], i) => { const c = i ? rgba(BIO.ader, 0.7) : rgba(BIO.bloed, 0.75);
    vat([[x + dx * rx, y + ry * 1.05], [x + dx * rx * 1.4, y + ry * 0.5], [x - 0.25 * rx + i * 0.1 * rx, y + ry * 0.05], [x - 0.5 * rx, y - ry * 0.1]], c, 5 * vs);
    vat([[x + dx * rx * 1.4, y + ry * 0.5], [x + 0.3 * rx + i * 0.07 * rx, y + ry * 0.1], [x + 0.45 * rx, y - ry * 0.05]], c, 4 * vs);
    vat([[x - 0.25 * rx + i * 0.1 * rx, y + ry * 0.05], [x - 0.1 * rx, y - ry * 0.35]], c, 3 * vs); });
  ctx.restore();
  // primordiale follikels: klein, in de schors, wisselende afstand (niet als kralenketting)
  const pr = Math.max(3.5, Math.min(7, ry * 0.035));
  for (let i = 0; i < n; i++) { const an = hash(i * 3 + 1) * 6.283, rr = lerp(0.72, 0.92, hash(i * 3 + 2)); const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry * rr;
    if (Math.hypot(px - wx, py - wy) < wr * 1.15) continue;
    ctx.beginPath(); ctx.arc(px, py, pr, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.7), rgba('#C9966A', 0.8), 0.8); ctx.beginPath(); ctx.arc(px, py, pr * 0.5, 0, 6.283); ctx.fillStyle = rgba('#F2E6C8', 0.9); ctx.fill(); }
  // groepje dat rijpt; één wint, de rest gaat te gronde
  let uit = null;
  grp.forEach(([gx, gy], i) => { if (i === winnaar) return; const g = groei * 0.5 * (1 - eis); if (g <= 0.01) return;
    follikel(ctx, x + gx * rx * 0.85, y + gy * ry * 0.85, g * 0.55, { R: WR, seed: i, a: 1 - eis * 0.7 }); });
  const e1 = clamp(eis, 0, 1), gl = clamp(geel, 0, 1);
  if (gW > 0.01 && gl < 0.99) {
    ctx.save(); ctx.globalAlpha *= 1 - gl;
    // lege, ingezakte follikel na de eisprong (antrum loopt leeg, wand plooit)
    const fIn = lerp(gW, gW * 0.75, e1);
    const p = follikel(ctx, wx, wy, fIn, { R: WR, seed: winnaar, eicel: e1 < 0.05 });
    if (e1 > 0.01) { // stigma: scheur op de top, vocht stroomt uit, eicel met cumulus gaat mee
      const ux = Math.cos(wa), uy = Math.sin(wa); const top = [wx + ux * wr * 1.02, wy + uy * wr * 1.02];
      ctx.save(); ctx.beginPath(); ctx.arc(top[0], top[1], wr * 0.32 * Math.min(1, e1 * 3), 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.globalAlpha *= 0.85; ctx.fill(); ctx.restore();
      const d = ease(e1) * wr * 1.5, ex = top[0] + ux * d * 0.9, ey = top[1] + uy * d * 0.9;
      ctx.save(); ctx.globalAlpha *= 0.55 * (1 - 0.6 * e1); ctx.fillStyle = rgba('#DCE8EE', 0.6); ctx.beginPath(); ctx.moveTo(top[0] - uy * wr * 0.25, top[1] + ux * wr * 0.25);
      ctx.quadraticCurveTo(ex - uy * wr * 0.6, ey + ux * wr * 0.6, ex + ux * wr * 0.4, ey + uy * wr * 0.4); ctx.quadraticCurveTo(ex + uy * wr * 0.6, ey - ux * wr * 0.6, top[0] + uy * wr * 0.25, top[1] - ux * wr * 0.25); ctx.closePath(); ctx.fill(); ctx.restore();
      const er = Math.max(6, WR * 0.12); const ox = lerp(p[0], ex, ease(Math.min(1, e1 * 1.3))), oy = lerp(p[1], ey, ease(Math.min(1, e1 * 1.3)));
      eicelEcht(ctx, ox, oy, er, 1, true); }
    ctx.restore(); uit = { x: wx, y: wy, ei: [wx, wy, Math.max(6, WR * 0.12)] };
  }
  if (gl > 0.01 && typeof geelLichaam === 'function') geelLichaam(ctx, wx, wy, wr * 0.95, { a: gl, leef: 1, t });
  ctx.restore(); return uit || { x: wx, y: wy, ei: [wx, wy, 6] };
}
