// =====================================================================================
// SCHIMMEL EN GIST — variant A (verbeterronde 2): VAN OPZIJ, ZO WEINIG MOGELIJK LIJNEN. Eén gistcel die knopt, één
// broodschimmel (Rhizopus) die op en in een stuk brood groeit, en een boterham met plekken. Geen loep, geen losse sporenwolk,
// geen knoplitteken: alleen wat de leerling moet zien.
// Recept (OpenStax Microbiology § 5.3 via LibreTexts; LibreTexts Botany Ha/Morrow/Algiers 2.3.2; LibreTexts 'Rhizopus', Briggs):
//  - GIST = eencellige schimmel (ovale cel met celwand, kern en vacuole) die zich ongeslachtelijk vermeerdert door KNOPPEN:
//    aan de moedercel groeit een kleinere dochtercel; de kern deelt (mitose) en één kern gaat de knop in; daarna snoert een
//    nieuwe wand de knop af. t 0..1: 0 geen knop · 0,1–0,6 knop groeit · 0,45–0,85 kern rekt door de hals en deelt · ≥ 0,95 wand.
//  - BROODSCHIMMEL (Rhizopus stolonifer): liggende draden (stolonen) over het brood, wortelachtige rhizoïden het brood in, en
//    rechtopstaande sporendragers met aan de top een rond SPORANGIUM vol sporen (het witte pluis met donkere stipjes). De draden
//    van Rhizopus hebben GEEN dwarswanden (veel kernen in één doorlopende draad): daarom hier gladde buizen zonder septa.
//    t 0..1: draden groeien (0–0,7), sporangia rijpen en kleuren donker (0,55–1).
//  - BROOD: plak met plekken (wit pluis, donkere stipjes in het midden) die groeien met t.
//  - kleuren: celwand ivoor, cytoplasma donker grijsblauw, kern paars (Part C), vacuole licht teal (water), sporen donker, brood oker.
// Bekende fouten: gist zonder kern (= bacterie); knop los naast de cel; broodschimmel met dwarswanden; schimmel als groene vlek.
// Aanroep (zelfde als ronde 1): schimmelGist(ctx, x, y, s, {soort: 'gist' | 'schimmel' | 'brood', t, a, seed}); s = schaal
// (gistcel ± 60·s px, schimmel ± 300·s px hoog, broodplak ± 340·s px breed). Geeft ankerpunten terug.
// =====================================================================================
function schimmelGist(ctx, x, y, s = 1, o = {}) {
  const { soort = 'gist', t = 1, a = 1, seed = 1 } = o; if (a <= 0.01) return {};
  const WAND = '#E3D9BF', CYT = '#33415A', KERN = C.kern, KERNR = C.kernR, VAC = '#7FB6D2', SPOOR = '#2A2A30', BROOD = '#D9BE86', KORST = '#A8743E';
  const ss = (u) => ease(clamp(u, 0, 1)); const R = {}, T = (px, py) => [x + px * s, y + py * s];
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (soort === 'gist') {
    const r = 30, ry = 24, k = ss((t - 0.08) / 0.55), rb = 21 * k, bx = r + rb * 0.78 - 2, hals = Math.min(rb, 9);
    const omtrek = (d) => { ctx.beginPath(); ctx.ellipse(0, 0, r + d, ry + d, 0, 0, 6.283); if (rb > 1) { ctx.moveTo(bx + rb + d, 0); ctx.ellipse(bx, 0, rb + d, rb * 0.92 + d, 0, 0, 6.283); ctx.rect(r * 0.7, -hals - d, bx - r * 0.7, 2 * (hals + d)); } };
    omtrek(4); ctx.fillStyle = WAND; ctx.fill(); omtrek(0); ctx.fillStyle = CYT; ctx.fill();
    ctx.beginPath(); ctx.ellipse(-11, 5, 10, 8, 0, 0, 6.283); ctx.fillStyle = rgba(VAC, 0.75); ctx.fill(); R.vacuole = T(-11, 5);
    const kd = ss((t - 0.45) / 0.4);
    if (kd < 0.8) { const x0 = 8, x1 = lerp(8, bx, kd); ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, -3, 6.5 + (x1 - x0) / 2, lerp(6, 4, kd), 0, 0, 6.283); shape(ctx, KERN, KERNR, 1.4); R.kern = T((x0 + x1) / 2, -3); }
    else { [8, bx].forEach(px => { ctx.beginPath(); ctx.ellipse(px, -3, 6, 5, 0, 0, 6.283); shape(ctx, KERN, KERNR, 1.4); }); R.kern = T(8, -3); R.kernKnop = T(bx, -3); }
    if (t > 0.95) { ctx.strokeStyle = WAND; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(r + 1, -hals); ctx.lineTo(r + 1, hals); ctx.stroke(); }
    R.cel = T(-r * 0.2, ry + 4); R.wand = T(-r - 4, 0); if (rb > 1) R.knop = T(bx, -rb - 4);
  } else if (soort === 'schimmel') {
    const g = ss(t / 0.7), rijp = ss((t - 0.55) / 0.45);
    // stuk brood (oker blok met een paar gaatjes)
    roundRect(ctx, -200, 0, 400, 70, 10); ctx.fillStyle = BROOD; ctx.fill(); ctx.fillStyle = rgba('#B8975C', 0.6);
    [[-150, 30], [-70, 48], [10, 26], [90, 44], [160, 22]].forEach(([px, py], i) => { ctx.beginPath(); ctx.ellipse(px, py, 9, 5, 0.2 * i, 0, 6.283); ctx.fill(); });
    const buis = (P, w) => { if (P.length < 2) return; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.strokeStyle = WAND; ctx.lineWidth = w + 3; ctx.stroke(); ctx.strokeStyle = CYT; ctx.lineWidth = w - 1.5; ctx.stroke(); };
    // stolon: één liggende draad over het brood (gebogen tussen twee voetjes), geen dwarswanden
    const voet = [-120, 0, 120], L = 120 * g; const stol = []; for (let i = 0; i <= 24; i++) { const u = i / 24, px = lerp(-150, 150, u); if (Math.abs(px) > 30 + L * 1.1) continue; stol.push([px, -3 - Math.sin(u * Math.PI * 2) ** 2 * 10]); } buis(stol, 7);
    // rhizoïden het brood in
    voet.forEach(fx => { if (Math.abs(fx) > 30 + L * 1.1) return; ctx.strokeStyle = WAND; ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { const d = (k ? 26 : 36) * g;
      ctx.beginPath(); ctx.moveTo(fx, 2); ctx.bezierCurveTo(fx + k * 4, d * 0.4, fx + k * 16 - 3, d * 0.7, fx + k * 20 + (k ? 0 : 4), d); ctx.stroke(); } });
    // sporendragers met sporangium
    voet.forEach((fx, i) => { if (Math.abs(fx) > 30 + L * 1.1) return; const h = (i === 1 ? 210 : 170) * ss((g - 0.3) / 0.7); if (h < 4) return; const tx = fx + (i - 1) * 10;
      const P = []; for (let j = 0; j <= 10; j++) { const u = j / 10; P.push([lerp(fx, tx, u), -u * h]); } buis(P, 6);
      if (h > 60) { const rs = 8 + 16 * rijp, cy = -h - rs * 0.8; ctx.beginPath(); ctx.arc(tx, cy, rs, 0, 6.283); shape(ctx, rijp > 0.5 ? SPOOR : '#8A8678', WAND, 2);
        ctx.fillStyle = rgba('#C9C4B6', 0.8); for (let k = 0; k < 12 * rijp; k++) { const an = hash(k * 3.1 + i) * 6.283, d = Math.sqrt(hash(k * 5.7 + i)) * rs * 0.75; ctx.beginPath(); ctx.arc(tx + Math.cos(an) * d, cy + Math.sin(an) * d, 2, 0, 6.283); ctx.fill(); }
        if (i === 1) { R.sporangium = T(tx + rs + 4, cy); R.drager = T(tx + 8, -h * 0.5); } } });
    R.hyfe = T(-80, -14); R.rhizoide = T(-120, 30); R.brood = T(0, 70);
  } else { // brood
    const plak = () => { ctx.beginPath(); ctx.moveTo(-160, 95); ctx.lineTo(-160, -40); ctx.bezierCurveTo(-180, -115, -105, -145, -55, -115); ctx.bezierCurveTo(-25, -150, 25, -150, 55, -115); ctx.bezierCurveTo(105, -145, 180, -115, 160, -40); ctx.lineTo(160, 95); ctx.closePath(); };
    plak(); ctx.fillStyle = KORST; ctx.fill(); ctx.save(); ctx.translate(0, 5); ctx.scale(0.91, 0.9); plak(); ctx.restore(); ctx.fillStyle = BROOD; ctx.fill();
    const plek = (px, py, rr, k) => { const r2 = rr * ss(t * 1.2 - k * 0.15); if (r2 < 1) return; ctx.beginPath(); ctx.arc(px, py, r2, 0, 6.283); ctx.fillStyle = '#EEEBE2'; ctx.fill();
      ctx.fillStyle = SPOOR; for (let j = 0; j < 10; j++) { const an = hash(j * 3.3 + k) * 6.283, d = Math.sqrt(hash(j * 5.1 + k)) * r2 * 0.6; ctx.beginPath(); ctx.arc(px + Math.cos(an) * d, py + Math.sin(an) * d, Math.max(1.2, r2 * 0.07), 0, 6.283); ctx.fill(); } };
    plek(-55, -30, 36, 0); plek(50, 30, 24, 1); R.plek = T(-55, -70); R.brood = T(0, 95);
  }
  ctx.restore(); return R; }
