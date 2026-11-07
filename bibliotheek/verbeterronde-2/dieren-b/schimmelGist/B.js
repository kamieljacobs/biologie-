// =====================================================================================
// SCHIMMEL EN GIST — variant B (verbeterronde 2): VAN BOVENAF EN MET EEN LOEP. Lichte cellen (zoals onder de microscoop):
// cytoplasma licht, celwand een donkere lijn. De draadschimmel groeit als een ster van vertakte draden uit één spore (van boven
// gezien, zoals een schimmelkolonie op een voedingsbodem); de boterham heeft een loep die op één plek inzoomt op de
// sporendragers van de broodschimmel.
// Recept (OpenStax Microbiology § 5.3 via LibreTexts; LibreTexts Botany Ha/Morrow/Algiers 2.3.2; LibreTexts 'Rhizopus', Briggs):
//  - GIST: eencellige schimmel met celwand, kern en vacuole; KNOPPEN: een kleinere dochtercel groeit aan de moedercel, de kern
//    deelt (mitose) en één kern gaat de knop in, dan snoert een wand de knop af. t als variant A.
//  - DRAADSCHIMMEL (soort 'schimmel'): uit een spore groeien draden (HYFEN) die zich vertakken tot een netwerk (MYCELIUM);
//    bij veel schimmels hebben de hyfen dwarswandjes (SEPTA), hier als korte streepjes. t 0..1 = groei.
//  - BROODSCHIMMEL in de loep (Rhizopus): rechtopstaande sporendragers met een rond sporangium vol sporen, GEEN dwarswanden
//    in de draden (Rhizopus is coenocytisch). Daarom staan septa alleen in de draadschimmel-ster, niet in de loep.
//  - kleuren: cytoplasma licht ivoor, celwand donker bruingrijs, kern paars (Part C), vacuole licht teal, sporen donker, brood oker.
// Bekende fouten: gist zonder kern; knop los naast de cel; broodschimmel met dwarswanden; schimmel als groene vlek.
// Aanroep (zelfde als ronde 1): schimmelGist(ctx, x, y, s, {soort: 'gist' | 'schimmel' | 'brood', t, a, seed}); s = schaal
// (gistcel ± 60·s px, schimmelster ± 320·s px, broodplak ± 340·s px breed met loep). Geeft ankerpunten terug.
// =====================================================================================
function schimmelGist(ctx, x, y, s = 1, o = {}) {
  const { soort = 'gist', t = 1, a = 1, seed = 1 } = o; if (a <= 0.01) return {};
  const CYT = '#EDE6D2', WAND = '#6B5E4A', KERN = C.kern, KERNR = C.kernR, VAC = '#A9D1E4', SPOOR = '#2A2A30', BROOD = '#D9BE86', KORST = '#A8743E';
  const ss = (u) => ease(clamp(u, 0, 1)); const R = {}, T = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'gist') {
    const r = 30, ry = 25, k = ss((t - 0.08) / 0.55), rb = 21 * k, bx = r + rb * 0.78 - 2, hals = Math.min(rb, 9);
    ctx.beginPath(); ctx.ellipse(0, 0, r, ry, 0, 0, 6.283); if (rb > 1) { ctx.moveTo(bx + rb, 0); ctx.ellipse(bx, 0, rb, rb * 0.92, 0, 0, 6.283); } ctx.fillStyle = CYT; ctx.fill();
    if (rb > 1) { ctx.fillRect(r * 0.7, -hals, bx - r * 0.7, 2 * hals); }
    // omtrek als één lijn: moedercel en knop samen (de hals blijft open tot de wand komt)
    ctx.save(); ctx.strokeStyle = WAND; ctx.lineWidth = 2.6; ctx.beginPath(); const am = rb > 1 ? Math.asin(clamp(hals / ry, 0, 0.95)) : 0;
    ctx.ellipse(0, 0, r, ry, 0, am, 6.283 - am); ctx.stroke(); if (rb > 1) { const ab = Math.asin(clamp(hals / (rb * 0.92), 0, 0.98)); ctx.beginPath(); ctx.ellipse(bx, 0, rb, rb * 0.92, 0, Math.PI + ab, Math.PI - ab + 6.283); ctx.stroke(); } ctx.restore();
    ctx.beginPath(); ctx.ellipse(-11, 5, 10, 8, 0, 0, 6.283); ctx.fillStyle = VAC; ctx.fill(); R.vacuole = T(-11, 5);
    const kd = ss((t - 0.45) / 0.4);
    if (kd < 0.8) { const x0 = 8, x1 = lerp(8, bx, kd); ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, -3, 6.5 + (x1 - x0) / 2, lerp(6, 4, kd), 0, 0, 6.283); shape(ctx, KERN, KERNR, 1.2); R.kern = T((x0 + x1) / 2, -3); }
    else { [8, bx].forEach(px => { ctx.beginPath(); ctx.ellipse(px, -3, 6, 5, 0, 0, 6.283); shape(ctx, KERN, KERNR, 1.2); }); R.kern = T(8, -3); R.kernKnop = T(bx, -3); }
    if (t > 0.95) { ctx.strokeStyle = WAND; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(r * 0.98, -hals); ctx.lineTo(r * 0.98, hals); ctx.stroke(); }
    R.cel = T(-r * 0.2, ry + 4); R.wand = T(-r - 3, 0); if (rb > 1) R.knop = T(bx, -rb - 4);
  } else if (soort === 'schimmel') { // ster van hyfen uit één spore (van boven), met septa
    const g = ss(t);
    ctx.beginPath(); ctx.arc(0, 0, 170, 0, 6.283); ctx.fillStyle = rgba(BROOD, 0.16); ctx.fill(); // voedingsbodem
    const draad = (x0, y0, an, L, d, sd) => { if (L < 6) return; const P = [[x0, y0]]; let px = x0, py = y0, a2 = an; const n = Math.max(2, Math.round(L / 10));
      for (let i = 1; i <= n; i++) { a2 += (hash(sd * 3.7 + i * 1.3) - 0.5) * 0.35; px += Math.cos(a2) * L / n; py += Math.sin(a2) * L / n; P.push([px, py]); }
      ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = WAND; ctx.lineWidth = 7 - d * 1.2; ctx.stroke(); ctx.strokeStyle = CYT; ctx.lineWidth = 4.4 - d * 1.1; ctx.stroke();
      for (let i = 2; i < P.length; i += 3) { const [ax, ay] = P[i - 1], [bx2, by2] = P[i], l = Math.hypot(bx2 - ax, by2 - ay) || 1, nx = -(by2 - ay) / l, ny = (bx2 - ax) / l, w = (7 - d * 1.2) * 0.5; ctx.strokeStyle = WAND; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ax - nx * w, ay - ny * w); ctx.lineTo(ax + nx * w, ay + ny * w); ctx.stroke(); }
      if (d < 2) [0.45, 0.75].forEach((f, j) => { const q = P[Math.round(f * (P.length - 1))]; draad(q[0], q[1], a2 + (j ? -0.75 : 0.75), L * 0.45, d + 1, sd * 1.7 + j + 1); }); };
    for (let k = 0; k < 7; k++) draad(0, 0, k / 7 * 6.283 + 0.3, 150 * g, 0, seed + k * 2.1);
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, 6.283); shape(ctx, SPOOR, WAND, 1.5); // de spore
    R.spore = T(0, -12); R.hyfe = T(140 * g, 0); R.mycelium = T(0, 120 * g);
  } else { // brood met loep
    const plak = () => { ctx.beginPath(); ctx.moveTo(-160, 95); ctx.lineTo(-160, -40); ctx.bezierCurveTo(-180, -115, -105, -145, -55, -115); ctx.bezierCurveTo(-25, -150, 25, -150, 55, -115); ctx.bezierCurveTo(105, -145, 180, -115, 160, -40); ctx.lineTo(160, 95); ctx.closePath(); };
    plak(); ctx.fillStyle = KORST; ctx.fill(); ctx.save(); ctx.translate(0, 5); ctx.scale(0.91, 0.9); plak(); ctx.restore(); ctx.fillStyle = BROOD; ctx.fill();
    const plek = (px, py, rr, k) => { const r2 = rr * ss(t * 1.2 - k * 0.15); if (r2 < 1) return; ctx.beginPath(); ctx.arc(px, py, r2, 0, 6.283); ctx.fillStyle = '#EEEBE2'; ctx.fill();
      ctx.fillStyle = SPOOR; for (let j = 0; j < 10; j++) { const an = hash(j * 3.3 + k) * 6.283, d = Math.sqrt(hash(j * 5.1 + k)) * r2 * 0.6; ctx.beginPath(); ctx.arc(px + Math.cos(an) * d, py + Math.sin(an) * d, Math.max(1.2, r2 * 0.07), 0, 6.283); ctx.fill(); } };
    plek(-60, 10, 34, 0); plek(60, 50, 22, 1); R.plek = T(-60, -30); R.brood = T(0, 95);
    const z = ss((t - 0.3) / 0.4); if (z > 0.01) { const cx = 120, cy = -205, rz = 100; ctx.save(); ctx.globalAlpha *= z; ctx.strokeStyle = C.goud; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(-60, 10, 40, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-40, -24); ctx.lineTo(cx - rz * 0.7, cy + rz * 0.72); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, rz, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.clip();
      ctx.fillStyle = BROOD; ctx.fillRect(cx - rz, cy + 40, 2 * rz, rz); // broodoppervlak in de loep
      [-42, 0, 42].forEach((dx, i) => { const h = i === 1 ? 92 : 74, fx = cx + dx; ctx.strokeStyle = WAND; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx, cy + 40); ctx.lineTo(fx + (i - 1) * 6, cy + 40 - h); ctx.stroke(); ctx.strokeStyle = CYT; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(fx + (i - 1) * 6, cy + 40 - h - 12, 14, 0, 6.283); shape(ctx, SPOOR, WAND, 2); ctx.fillStyle = rgba('#C9C4B6', 0.8); for (let k = 0; k < 7; k++) { const an = hash(k * 3.1 + i) * 6.283, d = Math.sqrt(hash(k * 5.7 + i)) * 9; ctx.beginPath(); ctx.arc(fx + (i - 1) * 6 + Math.cos(an) * d, cy + 28 - h + Math.sin(an) * d, 1.8, 0, 6.283); ctx.fill(); } });
      ctx.strokeStyle = CYT; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - rz, cy + 38); ctx.quadraticCurveTo(cx, cy + 30, cx + rz, cy + 38); ctx.stroke(); // liggende draad
      ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, rz, 0, 6.283); ctx.stroke(); ctx.restore(); R.zoom = T(cx, cy - rz); }
  }
  ctx.restore(); return R; }
