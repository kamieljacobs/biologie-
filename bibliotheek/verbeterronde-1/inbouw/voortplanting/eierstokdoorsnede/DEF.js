// =====================================================================================
// EIERSTOK in doorsnede (variant: de cyclus rond de schors, zoals de klassieke leerboekplaat). Recept: amandel
// ± 3 × 2 × 1 cm; merg in het midden met vaten vanaf de hilus (onder); in de schors liggen alle stadia met de klok
// mee: primordiale follikels (groepje, één laag platte cellen) → primair (kubisch, zona) → secundair (meer lagen,
// theca) → holte (antrum) → Graafse follikel die uitpuilt → eisprong (wand scheurt, eicel met stralenkrans en
// vocht naar buiten) → geel lichaam op dezelfde plek → wit lichaam (litteken). In het echt gebeurt dat niet
// tegelijk; het beeld is een samenvatting. o.groei / o.eis / o.geel zetten de gouden focus op dat stadium
// (groei 0..1 schuift van primordiaal naar Graaf). Bron: Junqueira h. 22; Megías, Atlas of Plant and Animal
// Histology (Univ. Vigo) 'ovarian follicles'. Bekende fouten: stadia in het merg; eisprong naast de eierstok
// zonder scheur; geel lichaam elders dan de eisprong.
// =====================================================================================
function eierstokDoorsnede(ctx, x, y, rx, ry, o = {}) {
  const { a = 1, n = 60, groei = 0, eis = 0, geel = 0, t = 0, focus = true } = o; if (a <= 0.01) return null; ctx.save(); ctx.globalAlpha *= a;
  const R = ry * 0.36; // Graafse follikel
  const st = [ // [hoek, stadium-f, schaal]
    [-2.85, 0, 1], [-2.2, 0.2, 1], [-1.55, 0.4, 1], [-0.85, 0.65, 1], [-0.1, 1, 1], [0.8, 'eis', 1], [1.85, 'geel', 1], [2.75, 'wit', 1]];
  const randR = th => Math.hypot(Math.cos(th) * rx, Math.sin(th) * ry);
  const graafA = st[4][0], bult = R * 0.5;
  const omtrek = Array.from({ length: 80 }, (_, k) => { const an = -Math.PI + k / 80 * 6.283; let w = 1 + 0.025 * Math.sin(an * 3 + 1);
    const d = Math.abs(an - graafA); const b = d < 0.45 ? bult * Math.pow(Math.cos(d / 0.45 * Math.PI / 2), 2) : 0;
    const d2 = Math.abs(an - st[5][0]); const kuil = d2 < 0.25 ? -R * 0.25 * Math.pow(Math.cos(d2 / 0.25 * Math.PI / 2), 2) : 0;
    const rr = randR(an) * w + b + kuil; return [x + Math.cos(an) * rr, y + Math.sin(an) * rr * (ry / randR(an)) * (randR(an) / ry)]; });
  ctx.beginPath(); bioPad(ctx, omtrek, true); shape(ctx, rgba('#C98A6A', 0.3), '#D9A894', Math.max(1.5, ry * 0.015));
  ctx.save(); ctx.beginPath(); bioPad(ctx, omtrek, true); ctx.clip();
  ctx.beginPath(); ctx.ellipse(x, y + ry * 0.12, rx * 0.42, ry * 0.36, 0, 0, 6.283); ctx.fillStyle = rgba('#8A5A50', 0.4); ctx.fill();
  const vs = Math.max(1, ry / 160); ctx.lineCap = 'round';
  [[BIO.bloed, -0.04], [BIO.ader, 0.04]].forEach(([c, dx]) => { ctx.strokeStyle = rgba(c, 0.75); ctx.lineWidth = 4 * vs; ctx.beginPath(); bioPad(ctx, [[x + dx * rx, y + ry], [x + dx * rx, y + ry * 0.45], [x + dx * rx - rx * 0.2, y + ry * 0.05]], false); ctx.stroke();
    ctx.lineWidth = 2.5 * vs; ctx.beginPath(); bioPad(ctx, [[x + dx * rx, y + ry * 0.45], [x + rx * 0.22 + dx * rx, y + ry * 0.1]], false); ctx.stroke(); });
  ctx.restore();
  // een paar losse primordiale follikels door de hele schors
  const pr = Math.max(3, Math.min(6, ry * 0.03));
  for (let i = 0; i < Math.min(n, 40); i++) { const an = -Math.PI + hash(i * 3 + 1) * 6.283, rr = lerp(0.8, 0.92, hash(i * 3 + 2)); if (st.some(s => Math.abs(s[0] - an) < 0.28)) continue;
    const px = x + Math.cos(an) * rx * rr, py = y + Math.sin(an) * ry * rr; ctx.beginPath(); ctx.arc(px, py, pr, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.7), rgba('#C9966A', 0.8), 0.8); }
  // focusstadium
  const fStad = geel > 0.5 ? 6 : eis > 0.3 ? 5 : Math.round(clamp(groei, 0, 1) * 4);
  let uit = null;
  st.forEach(([an, f], i) => {
    const fr = typeof f === 'number' ? lerp(R * 0.12, R, Math.pow(f, 1.4)) : R * 0.8;
    const dd = i === 4 ? randR(an) - fr * 0.55 : f === 'eis' ? randR(an) - fr * 0.55 : randR(an) * 0.86 - fr * 0.9;
    const px = x + Math.cos(an) * dd * rx / randR(an) * (randR(an) / rx), py = y + Math.sin(an) * dd * ry / randR(an) * (randR(an) / ry);
    const qx = x + Math.cos(an) * dd, qy = y + Math.sin(an) * dd;
    if (i === 0) { for (let k = 0; k < 6; k++) { const aa = k * 1.05; ctx.beginPath(); ctx.arc(qx + Math.cos(aa) * pr * 2.4, qy + Math.sin(aa) * pr * 2.4, pr, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.8), rgba('#C9966A', 0.9), 0.8); ctx.beginPath(); ctx.arc(qx + Math.cos(aa) * pr * 2.4, qy + Math.sin(aa) * pr * 2.4, pr * 0.5, 0, 6.283); ctx.fillStyle = '#F2E6C8'; ctx.fill(); } }
    else if (typeof f === 'number') { const p = follikel(ctx, qx, qy, f, { R, seed: i }); if (i === 4) uit = { x: qx, y: qy, ei: p }; }
    else if (f === 'eis') { // gescheurde, ingezakte follikel met open stigma; eicel + vocht buiten
      ctx.save(); ctx.beginPath(); for (let k = 0; k <= 30; k++) { const th = k / 30 * 6.283; const r2 = fr * (0.8 + 0.12 * Math.sin(th * 7)); k ? ctx.lineTo(qx + Math.cos(th) * r2, qy + Math.sin(th) * r2) : ctx.moveTo(qx + Math.cos(th) * r2, qy + Math.sin(th) * r2); } ctx.closePath();
      shape(ctx, rgba('#E2B88E', 0.8), '#C9966A', 1.2); ctx.beginPath(); ctx.arc(qx, qy, fr * 0.5, 0, 6.283); ctx.fillStyle = rgba('#7E3236', 0.6); ctx.fill(); ctx.restore();
      const ux = Math.cos(an), uy = Math.sin(an), ox = x + ux * (randR(an) + fr * 1.1), oy = y + uy * (randR(an) + fr * 1.1);
      ctx.save(); ctx.fillStyle = rgba('#DCE8EE', 0.25); ctx.beginPath(); ctx.ellipse(ox, oy, fr * 0.8, fr * 0.55, an, 0, 6.283); ctx.fill(); ctx.restore();
      ctx.strokeStyle = rgba('#DCE8EE', 0.5); ctx.lineWidth = Math.max(1, fr * 0.06); ctx.beginPath(); ctx.moveTo(qx + ux * fr * 0.6, qy + uy * fr * 0.6); ctx.lineTo(ox - ux * fr * 0.4, oy - uy * fr * 0.4); ctx.stroke();
      eicelEcht(ctx, ox, oy, Math.max(4, R * 0.13), 1, true); }
    else if (f === 'geel') { if (typeof geelLichaam === 'function') geelLichaam(ctx, qx, qy, fr * 0.95, { leef: 1, t }); }
    else { if (typeof geelLichaam === 'function') geelLichaam(ctx, qx, qy, fr * 0.8, { leef: 0, t }); }
    if (focus && i === fStad && (groei > 0 || eis > 0 || geel > 0)) { ctx.beginPath(); ctx.arc(qx, qy, fr * 1.25 + 6, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(1.5, ry * 0.012); ctx.stroke(); }
  });
  ctx.restore(); return uit;
}
