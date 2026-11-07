// =====================================================================================
// Bevruchting (film Bevruchting, 7 nov 2026) · kandidaten voor bibliotheek/lib_bio.js
// =====================================================================================
// BEVRUCHTING VAN DICHTBIJ (bvMantel). Recept (mens): eicel ± 100–120 µm; zona pellucida ± 13–18 µm dik, doorzichtig
// glycoproteïnelaag; daarbuiten de corona radiata (losse follikelcellen); kop van een zaadcel 4–5 µm met acrosoom als
// kapje over de voorste ± 60 %. Volgorde: zaadcel door de cellen → bindt aan de zona → acrosoom opent (enzymen) → smal
// schuin tunneltje door de zona → kop raakt het eicelmembraan en versmelt → kern gaat naar binnen → de zona verandert
// vanaf het versmeltpunt rondom ('mantel dicht': geen nieuwe binding, zaadcellen in de zona komen niet verder).
// Bron: Sadler, Langman's Medical Embryology h. 3; Alberts, Molecular Biology of the Cell (fertilization).
// Bekende fouten: zaadcel even groot als de eicel; zona als dunne lijn in een close-up; acrosoom achter op de kop;
// meerdere zaadcellen in het cytoplasma.
// Teken in het lokale vlak: eicelmidden (x, y + R), zodat de bovenste boog in beeld is. R = straal eicel in px.
// o.sp = [{ u (hoek-positie, −1..1 langs de boog), d (0 = buiten, 0.35 = op de zona, 1 = op het membraan, 1.3 = binnen),
//          acro (0..1 acrosoom open), t, foc (gouden rand) }]; o.dicht (0..1 golf rond de zona vanaf het versmeltpunt);
// o.ux (versmeltpunt, −1..1); o.kern (0..1 zaadkern zichtbaar binnen); o.krans (0..1 follikelcellen).
function bvMantel(ctx, x, y, R, o = {}) {
  const { a = 1, t = 0, sp = [], dicht = 0, ux = 0, kern = 0, krans = 1, boog = 0.75 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const cx = x, cy = y + R, zd = R * 0.15, zo = R + zd; // zona van R tot R + zd
  const A0 = -Math.PI / 2 - boog, A1 = -Math.PI / 2 + boog;
  const hoek = (u) => -Math.PI / 2 + u * boog;
  const P = (ang, r) => [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  // cytoplasma (met rustige textuur) en kernhint
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fillStyle = '#E9DCBC'; ctx.globalAlpha *= 0.24; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R - 2, 0, 6.283); ctx.clip();
  for (let k = 0; k < 220; k++) { const an = A0 - 0.2 + hash(k * 3 + 1) * (A1 - A0 + 0.4), rr = R * (0.55 + 0.44 * hash(k * 3 + 2));
    const [px, py] = P(an, rr); ctx.beginPath(); ctx.arc(px, py, 2 + 2 * hash(k), 0, 6.283); ctx.fillStyle = rgba('#C9B896', 0.22); ctx.fill(); }
  ctx.restore();
  // zona pellucida: glazige band; 'dicht' kleurt hem vanaf het versmeltpunt rondom iets dichter en koeler
  ctx.beginPath(); ctx.arc(cx, cy, zo, 0, 6.283); ctx.arc(cx, cy, R, 0, 6.283, true); ctx.fillStyle = rgba('#F4F1E6', 0.16); ctx.fill('evenodd');
  for (let k = 0; k < 140; k++) { const an = A0 - 0.15 + (k / 140) * (A1 - A0 + 0.3), rr = R + zd * (0.15 + 0.7 * hash(k * 7)); const [px, py] = P(an, rr);
    ctx.beginPath(); ctx.arc(px, py, 1.6, 0, 6.283); ctx.fillStyle = rgba('#F4F1E6', 0.28); ctx.fill(); }
  if (dicht > 0.001) { const hc = hoek(ux), sp2 = ease(clamp(dicht, 0, 1)) * Math.PI;
    ctx.beginPath(); ctx.arc(cx, cy, zo, hc - sp2, hc + sp2); ctx.arc(cx, cy, R, hc + sp2, hc - sp2, true); ctx.closePath(); ctx.fillStyle = rgba(C.teal, 0.28); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, zo - 1, hc - sp2, hc + sp2); ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 3; ctx.stroke(); }
  ctx.beginPath(); ctx.arc(cx, cy, zo, A0 - 0.3, A1 + 0.3); ctx.strokeStyle = rgba('#F4F1E6', 0.55); ctx.lineWidth = 1.5; ctx.stroke();
  // eicelmembraan
  ctx.beginPath(); ctx.arc(cx, cy, R, A0 - 0.3, A1 + 0.3); ctx.strokeStyle = '#D9C49A'; ctx.lineWidth = 2.5; ctx.stroke();
  // follikelcellen (corona) los rond de zona
  if (krans > 0.01) { ctx.save(); ctx.globalAlpha *= krans;
    for (let k = 0; k < 34; k++) { const an = A0 - 0.12 + (k + 0.5 * hash(k * 9)) / 34 * (A1 - A0 + 0.24), rr = zo + R * (0.05 + 0.13 * hash(k * 9 + 4)), cr = R * (0.045 + 0.02 * hash(k));
      const [px, py] = P(an, rr); ctx.beginPath(); ctx.ellipse(px, py, cr * 1.15, cr * 0.85, an, 0, 6.283); shape(ctx, rgba('#E2B88E', 0.55), rgba('#B88A60', 0.7), 1);
      ctx.beginPath(); ctx.arc(px, py, cr * 0.32, 0, 6.283); ctx.fillStyle = rgba('#9C6A4A', 0.6); ctx.fill(); }
    ctx.restore(); }
  // zaadcellen
  const s = R / 60 / 2.4; // 60 µm eicelstraal → px per µm = R/60; zaadcelEcht rekent 2,4·s px per µm
  for (const z of sp) {
    const an = hoek(z.u), d = z.d;
    // radiale positie van de kop: buiten (zo + 0.5R) → zona (zo) → membraan (R) → binnen
    const r = d < 0.35 ? lerp(zo + R * 0.55, zo + R * 0.02, d / 0.35) : d < 1 ? lerp(zo, R + 4, (d - 0.35) / 0.65) : lerp(R + 4, R - R * 0.12, clamp((d - 1) / 0.3, 0, 1));
    const [hx, hy] = P(an, r); const ang = an + Math.PI; // kop wijst naar het midden
    // tunneltje achter de kop in de zona
    if (d > 0.35 && d < 1.05 && z.acro > 0.5) { const [ax, ay] = P(an, zo + 2), [bx, by] = P(an, Math.max(r, R)); ctx.strokeStyle = rgba('#121A26', 0.8); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }
    const binnen = clamp((d - 1) / 0.3, 0, 1);
    if (binnen < 1) { ctx.save(); if (binnen > 0) { ctx.beginPath(); ctx.arc(cx, cy, R + 1, 0, 6.283); ctx.rect(cx - 4 * R, cy - 4 * R, 8 * R, 8 * R); ctx.clip('evenodd'); }
      zaadcelEcht(ctx, hx, hy, ang, z.t == null ? t : z.t, s, { acro: z.acro > 0.5 ? rgba(C.teal, 0) : C.teal, slag: d > 0.95 ? 0.6 : 2.2 }); ctx.restore(); }
    // acrosoom opent: kapje weg, enzymen (gouden puntjes) waaieren uit voor de kop
    if (z.acro > 0.01 && z.acro < 1.4 && binnen < 0.2) { const e = clamp(z.acro, 0, 1);
      for (let k = 0; k < 9; k++) { const da = (k - 4) * 0.035, dr = -R * (0.012 + 0.045 * e) * (0.6 + 0.4 * hash(k + 3)); const [ex, ey] = P(an + da, r + dr);
        ctx.beginPath(); ctx.arc(ex, ey, 3, 0, 6.283); ctx.fillStyle = rgba(C.goud, 0.9 * (1 - 0.6 * clamp((d - 0.9) / 0.2, 0, 1))); ctx.fill(); } }
    if (z.foc) { ctx.beginPath(); ctx.arc(hx, hy, R * 0.07, 0, 6.283); ctx.strokeStyle = rgba(C.goud, z.foc); ctx.lineWidth = 2; ctx.stroke(); }
  }
  // zaadkern binnen (na versmelten): grijs DNA-kluwen dat naar binnen schuift
  if (kern > 0.01) { const an = hoek(ux); const [kx, ky] = P(an, R - R * lerp(0.12, 0.32, ease(kern)));
    ctx.save(); ctx.globalAlpha *= clamp(kern * 3, 0, 1); ctx.beginPath(); ctx.ellipse(kx, ky, R * 0.05, R * 0.035, an, 0, 6.283); shape(ctx, rgba('#AEB8C8', 0.9), '#DCE3EC', 1.5); ctx.restore(); }
  ctx.restore();
  return { cx, cy, zo, P: (u, r) => P(hoek(u), r) };
}

// =====================================================================================
// KLIEVING (bvKlieving). Recept (mens): zygote ± 100 µm binnen de zona; eerste deling ± 24–30 uur na de bevruchting,
// daarna ± elke dag een ronde (2 → 4 → 8 → 16; morula ± dag 3–4). Tussen de delingen geen groei: het totale volume
// blijft gelijk, elke cel krijgt de helft van het volume (straal × 0,79). Delingsvlakken loodrecht op elkaar; bij 4 cellen
// vaak in kruisvorm/tetraëder, bij 8 compactie (cellen platten tegen elkaar). Twee poollichaampjes onder de zona.
// Bron: Sadler h. 3; Gilbert, Developmental Biology (cleavage); UNSW Embryology 'Week 1'.
// Bekende fouten: cellen even groot als de zygote; embryo groeit mee; cellen als losse knikkers zonder contact.
// n = aantal cellen (continu: 1 → 2 → 4 → 8 → 16; tussen 2^k en 2^(k+1) deelt elke cel), r = straal van de zygote (px).
function _bvKliefCellen(n) {
  const L = clamp(Math.log2(Math.max(1, n)), 0, 4), lev = Math.floor(L + 1e-6), u = L - lev;
  const assen = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0.6, 0.6, 0.5]];
  let cel = [{ p: [0, 0, 0], r: 1, id: 1 }];
  const splits = (lijst, k, f) => { const ax = assen[k % 4], al = Math.hypot(ax[0], ax[1], ax[2]); const uit = [];
    for (const c of lijst) { const rr = c.r * Math.pow(0.5, 1 / 3); const off = rr * 0.92 * f; const rot = (hash(c.id * 13 + k) - 0.5) * 0.5;
      const v = [ax[0] / al, ax[1] / al, ax[2] / al]; const vx = v[0] * Math.cos(rot) - v[1] * Math.sin(rot), vy = v[0] * Math.sin(rot) + v[1] * Math.cos(rot);
      const rad = lerp(c.r, rr, f);
      uit.push({ p: [c.p[0] + vx * off, c.p[1] + vy * off, c.p[2] + v[2] * off], r: rad, id: c.id * 2 }, { p: [c.p[0] - vx * off, c.p[1] - vy * off, c.p[2] - v[2] * off], r: rad, id: c.id * 2 + 1 }); }
    return uit; };
  const ontspan = (lijst, sterk) => { for (let it = 0; it < 30; it++) { for (let i = 0; i < lijst.length; i++) for (let j = i + 1; j < lijst.length; j++) { const A = lijst[i], B = lijst[j];
        const d = [B.p[0] - A.p[0], B.p[1] - A.p[1], B.p[2] - A.p[2]], dl = Math.hypot(d[0], d[1], d[2]) || 1e-6, min = (A.r + B.r) * 0.86;
        if (dl < min) { const m = (min - dl) / 2 * sterk; for (let q = 0; q < 3; q++) { A.p[q] -= d[q] / dl * m; B.p[q] += d[q] / dl * m; } } }
      for (const c of lijst) { const d = Math.hypot(c.p[0], c.p[1], c.p[2]); if (d + c.r * 0.92 > 1) { const sc = Math.max(0, 1 - c.r * 0.92) / (d || 1); c.p = c.p.map(v => v * sc); } } } return lijst; };
  for (let k = 0; k < lev; k++) cel = ontspan(splits(cel, k, 1), 1);
  if (u > 0.001 && lev < 4) cel = ontspan(splits(cel, lev, ease(u)), ease(u));
  // kijkhoek: iets gekanteld, zodat ook de cellen achter elkaar te zien zijn
  const rx = 0.55, ry = 0.45; return cel.map(c => { let [x, y, z] = c.p; const y1 = y * Math.cos(rx) - z * Math.sin(rx), z1 = y * Math.sin(rx) + z * Math.cos(rx);
    const x2 = x * Math.cos(ry) + z1 * Math.sin(ry), z2 = -x * Math.sin(ry) + z1 * Math.cos(ry); return { p: [x2, y1, z2], r: c.r, id: c.id }; });
}
function bvKlieving(ctx, x, y, r, n, o = {}) {
  const { a = 1, zona = 1, pool = 2, hl = -1, kern = 1, spook = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round';
  const R = r * 0.96;
  if (zona > 0.01) { ctx.beginPath(); ctx.arc(x, y, r * 1.16, 0, 6.283); ctx.arc(x, y, r * 1.01, 0, 6.283, true); ctx.fillStyle = rgba('#F4F1E6', 0.14 * zona); ctx.fill('evenodd');
    ctx.beginPath(); ctx.arc(x, y, r * 1.16, 0, 6.283); ctx.strokeStyle = rgba('#F4F1E6', 0.6 * zona); ctx.lineWidth = Math.max(1.5, r * 0.012); ctx.stroke(); }
  if (pool > 0) for (let k = 0; k < pool; k++) { const an = -2.2 + k * 0.42; ctx.beginPath(); ctx.arc(x + Math.cos(an) * r * 1.05, y + Math.sin(an) * r * 1.05, r * 0.075, 0, 6.283); shape(ctx, rgba('#F2E6C8', 0.75), '#D9C49A', 1); }
  if (spook > 0.01) { ctx.save(); ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(x, y, R, 0, 6.283); ctx.strokeStyle = rgba(C.goud, spook); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  const cel = _bvKliefCellen(n).sort((p, q) => p.p[2] - q.p[2]);
  cel.forEach((c, i) => { const px = x + c.p[0] * R, py = y + c.p[1] * R, cr = c.r * R * 1.04, z = clamp((c.p[2] + 1) / 2, 0, 1);
    const lk = Math.round(lerp(196, 232, z)), kleur = `rgba(${lk},${Math.round(lk * 0.93)},${Math.round(lk * 0.78)},0.97)`; ctx.beginPath(); ctx.arc(px, py, cr, 0, 6.283); shape(ctx, kleur, '#B9A57C', Math.max(1, r * 0.01));
    if (kern > 0.01 && cr > 6) { ctx.beginPath(); ctx.arc(px + cr * 0.12, py - cr * 0.08, cr * 0.3, 0, 6.283); ctx.fillStyle = rgba(C.kern, 0.55 * kern); ctx.fill(); }
    if (c.id === hl) { ctx.beginPath(); ctx.arc(px, py, cr + 3, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.stroke(); } });
  ctx.restore();
}
