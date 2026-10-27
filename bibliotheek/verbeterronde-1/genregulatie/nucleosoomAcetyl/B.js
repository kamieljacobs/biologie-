// =====================================================================================
// NUCLEOSOMEN DICHT ↔ OPEN, vooraanzicht met ladingen (vezel ↔ kralensnoer). Recept (OpenStax Biology 2e § 16.3; Alberts 6e hfst. 4):
//  - elk nucleosoom = kern van acht histonen (schijf ± 11 nm) met het DNA (2 nm) er ± 1,65 keer omheen; recht van voren
//    gezien een schijf met een ring DNA langs de rand, linker-DNA naar de volgende.
//  - histonstaarten zijn positief geladen (+), het DNA negatief (−): ze trekken elkaar aan. Dicht (o.open 0): nucleosomen
//    pakken zich in een zigzag-vezel tegen elkaar, de promotor zit ertussen verstopt, een transcriptiefactor kan er niet bij.
//  - acetylgroepen (groen) op de staarten maken ze minder positief ('the charge becomes less positive, and the binding of DNA
//    to the histones is relaxed', OpenStax): de + verdwijnen, de vezel valt open tot een kralensnoer, de promotor (goud)
//    ligt vrij en een transcriptiefactor kan binden (o.tf).
// Bekende fouten: open = minder nucleosomen; lading op de verkeerde plek; DNA dat door de schijf loopt.
// Vereist dnaDraad (lib_micro_evo.js). Zelfde aanroep als de zijaanzichtversie: van (x0,y0) naar (x1,y1); o.n, o.R (straal
// van de schijf), o.open 0..1, o.tf 0..1, o.t. Geeft {promotor, centra, tf} terug.
// =====================================================================================
function _naAcetyl(ctx, x, y, rr, an, a = 1) { // acetylgroep: C=O en CH3 (drie bolletjes), groen
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.strokeStyle = lighten(C.groen, 0.3); ctx.lineWidth = rr * 0.4;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, -rr * 0.9); ctx.moveTo(rr * 1.6, 0); ctx.lineTo(rr * 2.6, rr * 0.9); ctx.stroke();
  _bioCirc(ctx, rr * 1.6, 0, rr * 0.75, C.groen, lighten(C.groen, 0.35), 1); _bioCirc(ctx, rr * 2.7, -rr * 0.95, rr * 0.6, '#D8DCE2', null); _bioCirc(ctx, rr * 2.7, rr * 0.95, rr * 0.6, C.groen, null); ctx.restore(); }
function nucleosoomAcetyl(ctx, x0, y0, x1, y1, o = {}) {
  const { a = 1, n = 4, R = 60, open = 0, tf = 0, t = 0 } = o; if (a <= 0.01) return {};
  const ac = ease(clamp(open / 0.35, 0, 1)), schuif = ease(clamp((open - 0.3) / 0.7, 0, 1));
  const ang = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), cs = Math.cos(ang), sn = Math.sin(ang), Wd = (p) => [x0 + p[0] * cs - p[1] * sn, y0 + p[0] * sn + p[1] * cs];
  const dw = Math.max(5, R * 0.36), Rs = R * 0.78, uit = { centra: [] }, half = n / 2;
  // plekken: dicht = zigzag (twee rijen, overlappend), open = één rij met in het midden een vrij stuk (promotor)
  const C2 = []; for (let i = 0; i < n; i++) { const zx = L / 2 + (i - (n - 1) / 2) * R * 1.15, zy = (i % 2 ? 1 : -1) * R * 0.62;
    const ox = i < half ? R * 0.95 + i * R * 2.3 : L - R * 0.95 - (n - 1 - i) * R * 2.3;
    C2.push([lerp(zx, ox, schuif), lerp(zy, (i % 2 ? 1 : -1) * R * 0.12, schuif)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.rotate(ang);
  const pm = [(C2[half - 1][0] + C2[half][0]) / 2, (C2[half - 1][1] + C2[half][1]) / 2 + R * 0.25 * schuif];
  if (schuif > 0.05) { ctx.save(); ctx.globalAlpha *= schuif; roundRect(ctx, pm[0] - R * 0.95, pm[1] - dw * 1.3, R * 1.9, dw * 2.6, dw); ctx.fillStyle = rgba(C.goud, 0.28); ctx.fill(); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  // DNA-pad: binnenkomen links onder elke schijf, rondje langs de rand, eruit rechts onder → naar de volgende
  const ring = (c, i) => { const P = [], a0 = Math.PI * 0.75, tot = 1.65 * 6.283; for (let k = 0; k <= 70; k++) { const u = k / 70, an = a0 + u * tot, rr = Rs + dw * 0.55 + (u < 0.5 ? 0 : -dw * 0.25); P.push([c[0] + Math.cos(an) * rr, c[1] + Math.sin(an) * rr]); } return P; };
  const R2 = C2.map(ring);
  const linkers = [[[0, 0], [C2[0][0] - R * 0.8, C2[0][1] + R * 0.3], R2[0][0]]];
  for (let i = 0; i < n - 1; i++) { const A = R2[i][R2[i].length - 1], B = R2[i + 1][0]; linkers.push(i === half - 1 ? [A, [pm[0] - R * 0.5, pm[1]], [pm[0] + R * 0.5, pm[1]], B] : [A, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + R * 0.35], B]); }
  linkers.push([R2[n - 1][R2[n - 1].length - 1], [C2[n - 1][0] + R * 0.9, C2[n - 1][1] - R * 0.2], [L, 0]]);
  linkers.forEach(P => dnaDraad(ctx, P, { w: dw, helix: true, fase: t * 0.2 }));
  // schijven met DNA-ring (achterste rij eerst)
  const volg = [...C2.keys()].sort((i, j) => C2[i][1] - C2[j][1]);
  volg.forEach(i => { const c = C2[i]; _bioCirc(ctx, c[0], c[1], Rs, '#6E7F9C', '#9AAAC4', 1.5);
    for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.8; _bioCirc(ctx, c[0] + Math.cos(an) * Rs * 0.42, c[1] + Math.sin(an) * Rs * 0.42, Rs * 0.38, '#7A8BA8', '#A4B2CA', 1); }
    dnaDraad(ctx, R2[i], { w: dw, helix: true, glad: false, fase: t * 0.2 });
    // staarten: dicht = tegen het DNA van de buren met +; open = naar buiten met acetylgroepen
    const rr = R * 0.075; for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283 + 0.4 + i, P = [];
      for (let q = 0; q < 6; q++) { const u = q / 5, len = lerp(0.55, 0.95, schuif) * R, krul = lerp(1.4, 0.3, schuif); P.push([c[0] + Math.cos(an) * Rs * 0.7 + Math.cos(an + u * krul) * u * len, c[1] + Math.sin(an) * Rs * 0.7 + Math.sin(an + u * krul) * u * len]); }
      ctx.strokeStyle = '#B8C4D8'; ctx.lineWidth = rr * 0.5; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); P.forEach(p => _bioCirc(ctx, p[0], p[1], rr, '#9AAAC4', '#C4CEDC', 1));
      const q = P[3]; if (ac < 0.5 && R >= 24) { ctx.save(); ctx.globalAlpha *= 1 - ac * 2; text(ctx, '+', q[0] + rr * 2.2, q[1] - rr * 1.2, fTekst(Math.max(10, R * 0.32), 700), C.text, 'center'); ctx.restore(); }
      _naAcetyl(ctx, P[5][0], P[5][1], rr * 1.1, an + 0.3, ac); } uit.centra.push(Wd(c)); });
  if (tf > 0.01 && schuif > 0.6) { const p = ease(tf), tx = pm[0], ty = lerp(pm[1] - R * 2.6, pm[1] - dw * 1.7, p); enzymKluwen(ctx, tx, ty, R * 0.62, { a: Math.min(1, tf * 2), col: '#7A8BA8', seed: 3, an: Math.PI / 2 }); uit.tf = Wd([tx, ty]); }
  uit.promotor = Wd(pm); ctx.restore(); return uit;
}
