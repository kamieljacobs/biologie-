// =====================================================================================
// SCHIMMEL EN GIST. Recept (OpenStax Microbiology § 5.3; OpenStax Biology 2e § 24.1): schimmels zijn eukaryoten met een
// celwand. GIST = eencellige schimmel (bakkersgist, ovale cel ± 5–10 µm) die zich ongeslachtelijk vermeerdert door
// KNOPPEN: aan de moedercel groeit een kleinere dochtercel, de kern deelt en één kern schuift door de hals de knop in;
// soms blijven cellen als een kort kettinkje aan elkaar (pseudohyfe); op de moedercel blijft een knoplitteken.
// DRAADSCHIMMEL = vertakte draden (HYFEN), bij veel soorten met dwarswanden (septa); samen een netwerk (MYCELIUM).
// Broodschimmel (Rhizopus): aan het eind van rechtopstaande draden zitten bolletjes vol sporen (SPORANGIA): het witte
// pluis met zwarte stipjes op beschimmeld brood. Kleuren: celwand ivoor, cytoplasma licht, kern paars (Part C), sporen donker.
// Bekende fouten: gist als bacterie (zonder kern); hyfen als massieve takjes; knop los naast de cel; schimmel als groene vlek zonder draden.
// Aanroep: schimmelGist(ctx, x, y, s, { soort: 'gist' | 'schimmel' | 'brood', t, a, seed }) — s = schaal (gistcel ± 60·s px,
// schimmel ± 300·s px hoog, broodplak ± 360·s px breed); t (0–1): gist = knoppen (0 geen knop … 1 knop bijna los),
// schimmel = groei van het mycelium en rijpen van de sporangia, brood = groei van de plekken. Geeft ankerpunten terug.
// Variant B: in de omgeving. Schimmel groeit OP en IN een broodkruim (hyfen dringen het kruim in, rhizoïden), rijpe
// sporangia laten sporen los die wegzweven (t); gist als één grote, duidelijke cel waarvan de knopstadia (t) los te tonen zijn
// (variant C: B + de gistcel uit A); brood met een vergrotingscirkel die van de plek naar de draden inzoomt.
// =====================================================================================
function schimmelGist(ctx, x, y, s = 1, o = {}) {
  const { soort = 'gist', t = 1, a = 1, seed = 1 } = o; if (a <= 0.01) return {};
  const WAND = '#D9CFB6', CYT = '#2E3A4E', KERN = C.kern || '#5B4A8C', KERNR = C.kernR || '#9C86D8', VAC = '#4A5C78', SPOOR = '#2A2A30';
  const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const R = {};
  const T = (px, py) => [x + px * s, y + py * s];
  if (soort === 'gist') { // moedercel (ovaal) + knop die groeit aan de rechterpool
    const r = 30, ry = 25, k = ss(t / 0.85), rb = r * 0.72 * Math.max(0.12, k), bx = r * 0.86 + rb * 0.82, by = -3;
    const vormen = (d) => { ctx.beginPath(); ctx.ellipse(0, 0, r + d, ry + d, 0, 0, 6.283); if (t > 0.04) { ctx.moveTo(bx + rb * 0.92 + d, by); ctx.ellipse(bx, by, rb * 0.92 + d, rb * 0.82 + d, 0, 0, 6.283); } };
    vormen(3); ctx.fillStyle = WAND; ctx.fill(); // celwand (samen: hals sluit vanzelf)
    if (t > 0.04) { ctx.fillStyle = WAND; ctx.fillRect(r * 0.6, by - rb * 0.45, bx - r * 0.6, rb * 0.9); } // hals
    vormen(0); ctx.fillStyle = CYT; ctx.fill(); if (t > 0.04) { ctx.fillStyle = CYT; ctx.fillRect(r * 0.6, by - rb * 0.32, bx - r * 0.6, rb * 0.64); }
    if (t > 0.97) { ctx.strokeStyle = WAND; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(r * 0.98, by - rb * 0.5); ctx.lineTo(r * 0.98, by + rb * 0.5); ctx.stroke(); } // nieuwe wand: knop snoert af
    // vacuole en kern(en)
    ctx.beginPath(); ctx.ellipse(-10, 4, 11, 9, 0, 0, 6.283); ctx.fillStyle = VAC; ctx.fill(); ctx.strokeStyle = rgba('#A9C0D8', 0.55); ctx.lineWidth = 1; ctx.stroke();
    const kd = Math.max(0, Math.min(1, (t - 0.45) / 0.4)); // kern rekt door de hals en deelt
    if (kd < 0.75) { const lx = 8 + kd * (bx - 8) * 0.5, w = 7 + kd * (bx - 8) * 0.55; ctx.beginPath(); ctx.ellipse(lx, -3, w, 6.5 - kd * 2, 0, 0, 6.283); ctx.fillStyle = KERN; ctx.fill(); ctx.strokeStyle = KERNR; ctx.lineWidth = 1.4; ctx.stroke(); R.kern = T(lx, -3); }
    else { for (const px of [10, bx]) { ctx.beginPath(); ctx.ellipse(px, -3, 6.5, 5.5, 0, 0, 6.283); ctx.fillStyle = KERN; ctx.fill(); ctx.strokeStyle = KERNR; ctx.lineWidth = 1.4; ctx.stroke(); } R.kern = T(10, -3); R.kernKnop = T(bx, -3); }
    // knoplitteken van een eerdere knop
    ctx.strokeStyle = rgba(WAND, 0.9); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(-r * 0.7, -ry * 0.72, 4, 2.4, -0.7, 0, 6.283); ctx.stroke();
    R.cel = T(-r * 0.2, ry + 3); R.wand = T(-r - 3, 0); if (t > 0.04) R.knop = T(bx, by - rb * 0.82 - 3); R.vacuole = T(-10, 4);
  } else if (soort === 'schimmel') { // mycelium op een ondergrond, sporangiofoor met sporangia (Rhizopus)
    const g = ss(t / 0.7), rijp = ss((t - 0.55) / 0.45);
    const buis = (P, w) => { ctx.strokeStyle = WAND; ctx.lineWidth = w + 3; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); ctx.strokeStyle = CYT; ctx.lineWidth = w - 1; ctx.stroke(); };
    const septa = (P, w, stap) => { let acc = stap * 0.6; for (let i = 1; i < P.length; i++) { const [x0, y0] = P[i - 1], [x1, y1] = P[i], L = Math.hypot(x1 - x0, y1 - y0); while (acc < L) { const u = acc / L, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u, nx = -(y1 - y0) / L, ny = (x1 - x0) / L; ctx.strokeStyle = WAND; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(px - nx * w * 0.55, py - ny * w * 0.55); ctx.lineTo(px + nx * w * 0.55, py + ny * w * 0.55); ctx.stroke(); acc += stap; } acc -= L; } };
    const lijn = (x0, y0, an, L, buig, n = 8) => { const P = []; for (let i = 0; i <= n; i++) { const u = i / n, a2 = an + buig * u; P.push([x0 + Math.cos(an + buig * u * 0.5) * L * u, y0 + Math.sin(an + buig * u * 0.5) * L * u]); } return P; };
    // ondergrond
    ctx.fillStyle = '#C9AE78'; ctx.beginPath(); ctx.moveTo(-230, 2); for (let i = 0; i <= 23; i++) ctx.lineTo(-230 + i * 20, (hash(i * 1.7) - 0.5) * 6); ctx.lineTo(230, 70); ctx.lineTo(-230, 70); ctx.closePath(); ctx.fill();
    ctx.fillStyle = rgba('#8E7448', 0.6); for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.ellipse(-220 + hash(i * 2.9) * 440, 12 + hash(i * 6.1) * 50, 4 + hash(i) * 6, 2.5 + hash(i * 3) * 3, 0, 0, 6.283); ctx.fill(); } // kruim met gaatjes
    // liggende hyfen (stolonen) en vertakkingen
    const H = []; const tak = (x0, y0, an, L, d) => { if (d > 2) return; const P = lijn(x0, y0, an, L * g, (hash(seed + x0 * 0.1 + d) - 0.5) * 0.5); H.push([P, 6 - d]); const e = P[P.length - 1];
      if (g > 0.3) { tak(...P[4], an + (d % 2 ? 0.7 : -0.7), L * 0.55, d + 1); if (d < 1) tak(...e, an + 0.35, L * 0.5, d + 1); } };
    tak(-10, 4, 2.95, 170, 0); tak(10, 4, 0.2, 170, 0); tak(-30, 6, 2.3, 60, 1); tak(40, 6, 0.9, 60, 1); // groeit het kruim in
    for (const [P, w] of H) buis(P, w); for (const [P, w] of H) septa(P, w, 26);
    // sporangiofoor(en): rechtop, met sporangium
    const voet = [[-60, -2], [0, -4], [55, -2]]; R.sporangium = null;
    voet.forEach(([fx, fy], i) => { const h = (190 - i * 30 - (i === 1 ? -30 : 0)) * g; const P = lijn(fx, fy, -1.57 + (i - 1) * 0.12, h, (i - 1) * -0.1); buis(P, 5); const top = P[P.length - 1];
      if (g > 0.5) { const rs = 20 * rijp + 6; ctx.beginPath(); ctx.arc(top[0], top[1] - rs * 0.75, rs, 0, 6.283); ctx.fillStyle = rijp > 0.5 ? SPOOR : '#8A8678'; ctx.fill(); ctx.strokeStyle = WAND; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = rgba('#B8B4A8', 0.75); for (let k = 0; k < 18 * rijp; k++) { const an = hash(k * 3.1 + i) * 6.283, d = Math.sqrt(hash(k * 5.7 + i)) * rs * 0.82; ctx.beginPath(); ctx.arc(top[0] + Math.cos(an) * d, top[1] - rs * 0.75 + Math.sin(an) * d, 1.8, 0, 6.283); ctx.fill(); }
        if (i === 1) { R.sporangium = T(top[0] + rs + 4, top[1] - rs * 0.75); R.sporen = T(top[0], top[1] - rs * 1.75); R.drager = T(P[4][0] + 6, P[4][1]); } } });
    // wortelachtige rhizoïden de ondergrond in
    for (const [fx] of voet) for (let k = 0; k < 3; k++) { const P = lijn(fx, 0, 1.57 + (k - 1) * 0.6, 12 * g, 0.4, 3); ctx.strokeStyle = WAND; ctx.lineWidth = 1.6; ctx.beginPath(); P.forEach((p, j) => j ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); }
    // losgelaten sporen zweven weg
    if (rijp > 0.6) { ctx.fillStyle = rgba(SPOOR, 0.9); ctx.strokeStyle = rgba('#B8B4A8', 0.8); ctx.lineWidth = 0.8; for (let k = 0; k < 16; k++) { const u = (t * 1.0 + hash(k * 4.3)) % 1, px = (hash(k * 1.9) - 0.5) * 200 + Math.sin(u * 6 + k) * 10, py = -200 - u * 90; ctx.globalAlpha = a * (1 - u) * (rijp - 0.6) / 0.4; ctx.beginPath(); ctx.arc(px, py, 2.4, 0, 6.283); ctx.fill(); ctx.stroke(); } ctx.globalAlpha = a; }
    R.hyfe = T(-120 * g, 14); R.septum = T(36, -10); R.mycelium = T(0, 22);
  } else { // brood: plak met schimmelplekken (wit pluis, donkere sporenstipjes)
    const kor = '#A8743E', krui = '#E6CF9C';
    const plak = () => { ctx.beginPath(); ctx.moveTo(-170, 90); ctx.lineTo(-170, -40); ctx.bezierCurveTo(-190, -120, -110, -150, -60, -120); ctx.bezierCurveTo(-30, -160, 30, -160, 60, -120); ctx.bezierCurveTo(110, -150, 190, -120, 170, -40); ctx.lineTo(170, 90); ctx.quadraticCurveTo(170, 100, 160, 100); ctx.lineTo(-160, 100); ctx.quadraticCurveTo(-170, 100, -170, 90); ctx.closePath(); };
    plak(); ctx.fillStyle = kor; ctx.fill(); ctx.save(); ctx.translate(0, 4); ctx.scale(0.92, 0.9); plak(); ctx.restore(); ctx.fillStyle = krui; ctx.fill();
    ctx.fillStyle = rgba('#B89A62', 0.55); for (let i = 0; i < 22; i++) { ctx.beginPath(); ctx.ellipse(-130 + hash(i * 2.3) * 260, -90 + hash(i * 4.1) * 170, 3 + hash(i) * 4, 2 + hash(i * 7) * 2.5, hash(i * 3) * 3, 0, 6.283); ctx.fill(); } // gaatjes in het kruim
    const plek = (px, py, rr, k) => { const r2 = rr * ss(t * 1.2 - k * 0.15); if (r2 < 1) return; ctx.beginPath(); ctx.arc(px, py, r2 * 1.15, 0, 6.283); ctx.fillStyle = rgba('#F2EFE6', 0.55); ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, r2, 0, 6.283); ctx.fillStyle = '#E9E6DC'; ctx.fill(); ctx.beginPath(); ctx.arc(px, py, r2 * 0.6, 0, 6.283); ctx.fillStyle = '#7E8C7A'; ctx.fill();
      ctx.fillStyle = SPOOR; for (let j = 0; j < 14; j++) { const an = hash(j * 3.3 + k) * 6.283, d = Math.sqrt(hash(j * 5.1 + k)) * r2 * 0.8; ctx.beginPath(); ctx.arc(px + Math.cos(an) * d, py + Math.sin(an) * d, Math.max(1, r2 * 0.06), 0, 6.283); ctx.fill(); } };
    plek(-60, -40, 34, 0); plek(40, 20, 24, 1); plek(85, -70, 14, 2);
    // vergrotingscirkel: van de grootste plek naar de draden
    if (t > 0.3) { const z = ss((t - 0.3) / 0.4), cx = 120, cy = -175, rz = 62; ctx.globalAlpha = a * z; ctx.strokeStyle = C.goud || '#E2B33C'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(-60, -40, 40, 0, 6.283); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-25, -60); ctx.lineTo(cx - rz * 0.86, cy + rz * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, rz, 0, 6.283); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.clip(); ctx.translate(cx, cy + 40); ctx.scale(0.32, 0.32);
      ctx.fillStyle = '#C9AE78'; ctx.fillRect(-250, 0, 500, 200);
      for (let i = 0; i < 9; i++) { const fx = -160 + i * 40, h = 90 + hash(i * 3.3) * 120; ctx.strokeStyle = WAND; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(fx, 0); ctx.quadraticCurveTo(fx + 10, -h * 0.5, fx + (hash(i) - 0.5) * 30, -h); ctx.stroke(); ctx.beginPath(); ctx.arc(fx + (hash(i) - 0.5) * 30, -h - 14, 16, 0, 6.283); ctx.fillStyle = SPOOR; ctx.fill(); ctx.strokeStyle = WAND; ctx.lineWidth = 3; ctx.stroke(); }
      ctx.restore(); ctx.beginPath(); ctx.arc(cx, cy, rz, 0, 6.283); ctx.stroke(); ctx.globalAlpha = a; R.zoom = T(cx, cy - rz); }
    R.plek = T(-60, -40 - 40); R.brood = T(0, 100);
  }
  ctx.restore(); return R; }
