// ENZYM met actieve plek (goud) — variant B 'lintmodel met binden en knippen' (27 okt 2026).
// Recept (C9; OpenStax Biology 2e 3.4): een enzym is een gevouwen eiwitketen; in het lintmodel (zoals in
// leerboeken) zie je de α-helices als spiraallinten (± 3,6 aminozuren per winding), de β-strengen als brede
// platte pijlen naast elkaar (waterstofbruggen ertussen) en de lussen als dunne buisjes; de omtrek van het
// eiwit is een zacht silhouet erachter. Aan één kant een ronde holte (actieve plek, goud) die past bij één
// substraat; bij binden sluit de holte ± 20° (induced fit), het substraat wordt geknipt en de stukken laten los.
// Kleur C.enzym (grijsblauw), voorkant lichter, achterkant donkerder.
// Standen: o.sluit 0..1 (holte dicht), o.bind 0..1 (substraat schuift de holte in), o.knip 0..1 (substraat is
// geknipt en de twee stukken drijven weg). Substraat = twee glucose-zeshoeken (V.kh), alleen als bind > 0.
// Bekende fouten: bol met krabbel; holte die niet verandert; substraat dat in het eiwit verdwijnt.
// Aanroep zoals voorheen: enzymKluwen(ctx, x, y, r, {a, an, sluit, col, seed}); nieuw: bind, knip, sub (kleur).
// Geeft terug: {plek:[x,y], lip:[x,y]}.
function enzymKluwen(ctx, x, y, r, o = {}) {
  const { a = 1, an = 0, col = C.enzym, seed = 4, bind = 0, knip = 0, sub = (typeof V !== 'undefined' ? V.kh : C.oker) } = o;
  const sluit = Math.max(o.sluit || 0, ease(clamp(bind, 0, 1)) * (1 - ease(clamp(knip, 0, 1)) * 0.7));
  const cs = Math.cos(an), sn = Math.sin(an); const W = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const ret = { plek: W(r * 0.68, 0), lip: W(r * 0.72, -r * 0.4) };
  if (a <= 0.01) return ret;
  const donker = _mixHex(col, '#1A2740', 0.45), licht = _mixHex(col, '#FFFFFF', 0.3), mid = col;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // silhouet met ronde holte rond hoek 0; bovenlip draait dicht
  const R = u => { let rr = r * (1 + 0.06 * Math.sin(u * 4 + seed) + 0.035 * Math.sin(u * 7 + seed)); let d = ((u + Math.PI) % 6.283 + 6.283) % 6.283 - Math.PI;
    if (d < 0) d *= lerp(1, 0.45, sluit); const ad = Math.abs(d); if (ad < 0.48) rr *= 1 - 0.48 * Math.sqrt(Math.max(0, 1 - Math.pow(ad / 0.48, 2))); return rr; };
  const om = []; for (let k = 0; k < 72; k++) { const u = k / 72 * 6.283, rr = R(u); om.push([Math.cos(u) * rr, Math.sin(u) * rr]); }
  ctx.beginPath(); bioPad(ctx, om, true); shape(ctx, rgba(donker, 0.9), rgba(licht, 0.6), Math.max(1, r * 0.02));
  if (r >= 22) { const lw = Math.max(1.2, r * 0.035);
    // lussen: dun buisje dat de elementen verbindt
    const lus = [[-0.62, -0.55], [-0.75, -0.1], [-0.55, 0.3], [-0.3, 0.62], [0.1, 0.72], [0.45, 0.55], [0.3, 0.22], [-0.05, 0.1], [-0.2, -0.25], [0.05, -0.6], [0.4, -0.62]].map(p => [p[0] * r, p[1] * r]);
    ctx.strokeStyle = licht; ctx.lineWidth = lw; ctx.beginPath(); bioPad(ctx, lus, false); ctx.stroke();
    // β-plaat: drie brede platte pijlen naast elkaar, afwisselend van richting
    for (let k = 0; k < 3; k++) { const y0 = r * (0.26 + k * 0.15), dir = k % 2 ? -1 : 1, xa = -r * 0.5, xb = r * 0.28; const w = r * 0.055;
      const x0 = dir > 0 ? xa : xb, x1 = dir > 0 ? xb : xa; ctx.beginPath(); ctx.moveTo(x0, y0 - w); ctx.lineTo(x1 - dir * w * 2.2, y0 - w); ctx.lineTo(x1 - dir * w * 2.2, y0 - w * 1.9); ctx.lineTo(x1, y0); ctx.lineTo(x1 - dir * w * 2.2, y0 + w * 1.9); ctx.lineTo(x1 - dir * w * 2.2, y0 + w); ctx.lineTo(x0, y0 + w); ctx.closePath(); shape(ctx, mid, licht, Math.max(0.8, r * 0.012));
      if (k < 2) { ctx.save(); ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = Math.max(0.8, r * 0.01); ctx.setLineDash([r * 0.02, r * 0.025]); for (let q = 0; q < 4; q++) { const qx = lerp(xa + r * 0.08, xb - r * 0.12, q / 3); ctx.beginPath(); ctx.moveTo(qx, y0 + w); ctx.lineTo(qx, y0 + r * 0.15 - w); ctx.stroke(); } ctx.restore(); } }
    // α-helices: spiraallint, achterste helft donker, voorste helft licht
    const helix = (x0, y0, x1, y1, n, rad) => { const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux; const N = n * 24; const pt = i => { const u = i / N, ph = u * n * 6.283; return [x0 + ux * L * u + nx * Math.sin(ph) * rad, y0 + uy * L * u + ny * Math.sin(ph) * rad, Math.cos(ph)]; };
      for (const voor of [false, true]) { for (let i = 0; i < N; i++) { const p = pt(i), q = pt(i + 1); if ((p[2] > 0) !== voor) continue; ctx.strokeStyle = voor ? licht : _mixHex(col, '#1A2740', 0.15); ctx.lineWidth = r * (voor ? 0.075 : 0.065); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } } };
    helix(-r * 0.7, -r * 0.42, -r * 0.18, -r * 0.62, 3.2, r * 0.11);
    helix(-r * 0.68, r * 0.0, -r * 0.48, -r * 0.3, 1.6, r * 0.09);
    helix(-r * 0.05, -r * 0.4, r * 0.42, -r * 0.48, 2.6, r * 0.1);
  } else { ctx.strokeStyle = licht; ctx.lineWidth = Math.max(1, r * 0.06); ctx.beginPath(); bioPad(ctx, [[-r * 0.5, -r * 0.3], [-r * 0.1, -r * 0.5], [-r * 0.3, 0.1 * r], [0.2 * r, 0.4 * r]], false); ctx.stroke(); }
  // actieve plek
  ctx.strokeStyle = C.goud; ctx.lineWidth = Math.max(2, r * 0.05); ctx.beginPath(); const hp = []; for (let k = -12; k <= 12; k++) { const u = k / 12 * 0.5; hp.push([Math.cos(u) * R(u), Math.sin(u) * R(u)]); } bioPad(ctx, hp, false); ctx.stroke();
  // substraat: twee glucoseringen die binnenschuiven, geknipt worden en loslaten
  if (bind > 0.01 && typeof hexagon === 'function') { const b = ease(clamp(bind, 0, 1)), kn = ease(clamp(knip, 0, 1)); const hr = r * 0.16; const px = r * 0.66 + (1 - b) * r * 0.9;
    const s1 = [px - hr * 0.95 - kn * r * 0.15, -kn * r * 0.55], s2 = [px + hr * 0.95 + kn * r * 0.55, kn * r * 0.25];
    if (kn < 0.05) { ctx.strokeStyle = _mixHex(sub, '#FFFFFF', 0.35); ctx.lineWidth = Math.max(1.5, r * 0.03); ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke(); }
    hexagon(ctx, s1[0], s1[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); hexagon(ctx, s2[0], s2[1], hr, sub, _mixHex(sub, '#FFFFFF', 0.35)); }
  ctx.restore(); return ret;
}
