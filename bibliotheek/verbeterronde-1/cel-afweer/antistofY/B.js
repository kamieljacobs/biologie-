// =====================================================================================
// ANTISTOF (IgG) als Y van vier kralenketens. Recept: twee identieke zware ketens (± 450 aminozuren) en twee identieke
// lichte ketens (± 215 aminozuren); elke keten is opgevouwen in domeinen (± 110 aminozuren elk): zware keten VH, CH1
// (arm), scharnier, CH2, CH3 (steel), lichte keten VL, CL (arm, naast de zware keten). Hier als kralenketen die per
// domein heen en weer vouwt (β-strengen), zodat zichtbaar is dat het eiwit een gevouwen keten is. De bindplaats ligt
// in de top van elke arm, tussen het eind van de zware en de lichte keten, en past op één epitoop; twee gelijke
// bindplaatsen. Arm en steel elk ± 7 nm, armen soepel in het scharnier (± 60–180°). Zwavelbruggen in het scharnier.
// Als B-celreceptor loopt de zware keten door in een staartje in het membraan. Antistof ± 15 nm, virus ± 100 nm.
// Bron: OpenStax Anatomy & Physiology 21.4; OpenStax/Lumen Biology 'Antibody Structure'. Bekende fouten: Y als drie
// streepjes; bindplaats aan de steel; vier ketens niet te onderscheiden; antistof zo groot als het virus.
// Aanroep: antistofY(ctx, x, y, s, o) — (x, y) = scharnier, s = 1 → ± 200 px hoog. o.ang (0 = armen omhoog), o.open
// (halve armhoek, standaard 0.7), o.buig [l, r], o.vouw (0 = gestrekte ketens … 1 = gevouwen, standaard 1),
// o.k = pasvorm (0–3), o.bind [0..1, 0..1], o.agCol, o.op = 'vrij' | 'bcel', o.hl, o.t.
// Geeft { tips, richt, voet, scharnier } terug (schermcoördinaten).
// =====================================================================================
const _AYB = { zwaar: '#C99A2E', licht: '#EBCB72', varZ: '#F0D27A', varL: '#F7E6B0', zwavel: '#F2F2EE', ag: '#E07A5F' };
function _aybVouw(p0, p1, w, passes, vouw, sd) { // keten die per domein heen en weer loopt (β-strengen): dwars over de breedte w, langzaam verder langs de as
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy * sd, ny = ux * sd;
  const n = passes * 2 + 1, out = [];
  for (let j = 0; j <= n; j++) { const along = (j / n) * L; const lat = (j % 2 ? 0.5 : -0.5) * w * vouw * (j === 0 || j === n ? 0.3 : 1); out.push([p0[0] + ux * along + nx * lat, p0[1] + uy * along + ny * lat]); }
  return out;
}
function _aybKetting(ctx, pts, r, kleuren, grens, lw) { // kralen op vaste afstand langs een glad pad; kleur wisselt bij fractie 'grens'
  const P = bioDicht(pts, 10); let acc = 0; const kralen = [P[0]]; for (let i = 1; i < P.length; i++) { acc += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); if (acc >= r * 2.05) { kralen.push(P[i]); acc = 0; } }
  ctx.strokeStyle = rgba('#F6E2A6', 0.55); ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, pts, false); ctx.stroke();
  kralen.forEach((p, i) => { const f = i / Math.max(1, kralen.length - 1); const col = f < grens ? kleuren[0] : kleuren[1]; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.283); shape(ctx, col, lighten(col, 0.35), Math.max(0.6, r * 0.18)); });
  return kralen;
}
function antistofY(ctx, x, y, s = 1, o = {}) {
  const { a = 1, ang = 0, open = 0.7, buig = [0, 0], vouw = 1, k = 0, bind = [0, 0], agCol = _AYB.ag, op = 'vrij', hl = 0, t = 0 } = o;
  const D = 34 * s, Bw = 15 * s, r = Math.max(1.1, 3.5 * s), o0 = 20 * s;
  const ca = Math.cos(ang), sa = Math.sin(ang); const P = (px, py) => [x + px * ca - py * sa, y + px * sa + py * ca];
  const armAn = [-Math.PI / 2 - open - buig[0] + 0.03 * Math.sin(t * 1.3), -Math.PI / 2 + open + buig[1] + 0.03 * Math.sin(t * 1.1 + 1)];
  const tipL = o0 + 2 * D + 6 * s;
  const ret = { tips: armAn.map(an => P(Math.cos(an) * (tipL + 6 * s), Math.sin(an) * (tipL + 6 * s))), richt: armAn.map(an => an + ang), voet: P(0, o0 + 2 * D + 12 * s + (op === 'bcel' ? 30 * s : 0)), scharnier: [x, y] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(0.8, 1.6 * s);
  if (hl > 0.01) { ctx.save(); ctx.globalAlpha *= 0.22 * hl; ctx.strokeStyle = C.goud; ctx.lineWidth = 34 * s; ctx.beginPath(); ctx.moveTo(0, o0 + 2 * D); ctx.lineTo(0, 0); armAn.forEach(an => { ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * tipL, Math.sin(an) * tipL); }); ctx.stroke(); ctx.restore(); }
  const arms = armAn.map((an, i) => { const sd = i ? 1 : -1, ux = Math.cos(an), uy = Math.sin(an), nx = -uy * sd, ny = ux * sd; return { an, sd, ux, uy, nx, ny }; });
  const Q = (A2, along, lat) => [A2.ux * along + A2.nx * lat, A2.uy * along + A2.ny * lat];
  const v = clamp(vouw, 0, 1);
  // zware ketens: top (VH) → CH1 → scharnier → CH2 → CH3 (→ staart in membraan)
  arms.forEach(A2 => { const sd = A2.sd, lat = -Bw * 0.62, fx = sd * Bw * 0.62;
    const pts = [].concat(_aybVouw(Q(A2, tipL, lat), Q(A2, o0 + D + 3 * s, lat), Bw * 0.8, 1, v, -sd), _aybVouw(Q(A2, o0 + D - 3 * s, lat), Q(A2, o0, lat), Bw * 0.8, 1, v, -sd),
      [[sd * Bw * 0.3, o0 * 0.6], [fx * 0.9, o0 + 2 * s]], _aybVouw([fx, o0 + 4 * s], [fx, o0 + D], Bw * 0.8, 1, v, sd), _aybVouw([fx, o0 + D + 4 * s], [fx, o0 + 2 * D], Bw * 0.8, 1, v, sd));
    if (op === 'bcel') pts.push([fx * 0.6, o0 + 2 * D + 14 * s], [fx * 0.5, o0 + 2 * D + 32 * s]);
    _aybKetting(ctx, pts, r, [_AYB.varZ, _AYB.zwaar], 0.17, lw); });
  // zwavelbruggen tussen de zware ketens in het scharnier
  ctx.strokeStyle = _AYB.zwavel; ctx.lineWidth = Math.max(1, 1.8 * s); for (const yy of [o0 * 0.75, o0 * 1.05]) { ctx.beginPath(); ctx.moveTo(-Bw * 0.45, yy); ctx.lineTo(Bw * 0.45, yy); ctx.stroke(); }
  // lichte ketens: top (VL) → CL, aan de buitenkant van de arm
  arms.forEach(A2 => { const lat = Bw * 0.62;
    const pts = [].concat(_aybVouw(Q(A2, tipL, lat), Q(A2, o0 + D + 3 * s, lat), Bw * 0.8, 1, v, A2.sd), _aybVouw(Q(A2, o0 + D - 3 * s, lat), Q(A2, o0 + 4 * s, lat), Bw * 0.8, 1, v, A2.sd));
    _aybKetting(ctx, pts, r * 0.95, [_AYB.varL, _AYB.licht], 0.5, lw);
    ctx.strokeStyle = _AYB.zwavel; ctx.lineWidth = Math.max(1, 1.5 * s); const z1 = Q(A2, o0 + 5 * s, -Bw * 0.3), z2 = Q(A2, o0 + 5 * s, Bw * 0.3); ctx.beginPath(); ctx.moveTo(z1[0], z1[1]); ctx.lineTo(z2[0], z2[1]); ctx.stroke(); });
  // bindplaats: pasvorm-rand in de top + antigeen
  arms.forEach((A2, i) => { ctx.save(); const c = Q(A2, tipL + 2 * s, 0); ctx.translate(c[0], c[1]); ctx.rotate(A2.an + Math.PI / 2); const w = Bw * 1.0;
    ctx.beginPath(); ctx.moveTo(-w * 0.5, 0);
    if (k === 1) ctx.arc(0, 0, w * 0.5, Math.PI, 0, true); else if (k === 2) { ctx.lineTo(-w * 0.45, w * 0.55); ctx.lineTo(w * 0.45, w * 0.55); ctx.lineTo(w * 0.5, 0); }
    else if (k === 3) { ctx.lineTo(-w * 0.2, w * 0.5); ctx.lineTo(0, w * 0.15); ctx.lineTo(w * 0.2, w * 0.5); ctx.lineTo(w * 0.5, 0); } else { ctx.lineTo(0, w * 0.6); ctx.lineTo(w * 0.5, 0); }
    ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = Math.max(1, 2 * s); ctx.stroke();
    const b = clamp(bind[i] || 0, 0, 1); if (b > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, b * 2); ctx.translate(0, -(1 - ease(b)) * 40 * s - 1.5 * s); const ww = w * 0.94;
      ctx.beginPath(); ctx.moveTo(-ww * 0.8, -ww * 0.25); ctx.lineTo(-ww * 0.5, 0);
      if (k === 1) ctx.arc(0, 0, ww * 0.5, Math.PI, 0, true); else if (k === 2) { ctx.lineTo(-ww * 0.45, ww * 0.55); ctx.lineTo(ww * 0.45, ww * 0.55); ctx.lineTo(ww * 0.5, 0); }
      else if (k === 3) { ctx.lineTo(-ww * 0.2, ww * 0.5); ctx.lineTo(0, ww * 0.15); ctx.lineTo(ww * 0.2, ww * 0.5); ctx.lineTo(ww * 0.5, 0); } else { ctx.lineTo(0, ww * 0.6); ctx.lineTo(ww * 0.5, 0); }
      ctx.lineTo(ww * 0.8, -ww * 0.25); ctx.bezierCurveTo(ww * 1.5, -ww * 0.6, ww * 1.3, -ww * 1.7, 0, -ww * 1.6); ctx.bezierCurveTo(-ww * 1.3, -ww * 1.7, -ww * 1.5, -ww * 0.6, -ww * 0.8, -ww * 0.25); ctx.closePath();
      shape(ctx, rgba(agCol, 0.9), lighten(agCol, 0.35), 1.4); ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); return ret;
}
