// Evolutie v2 · film 5 Toeval en uitwisseling — geanimeerde scènes (Claude, 23 okt 2026)
// Elke scène bouwt het goedgekeurde keyframe (sb5.js) op in de maat van de stem. Eigen hulpfuncties: teken_e5.js.
Object.assign(SCENES, {
  // ---------- titel: alleen het beeld rechts ----------
  title(ctx, t) {
    pot(ctx, 1460, 860, 1.25, { p: 0.6, n: 80, seed: 3 });
    for (let k = 0; k < 2; k++) { const u = f5fr(t / 3.4 + k * 0.5); const kl = k ? EVO.a2 : EVO.a1; const [x, y] = f5boog(1400 + k * 90, 540, 1450 + k * 40, 540, ease(u), 150); knikker(ctx, x, y, 15, kl, Math.sin(Math.PI * u)); }
    ctx.save(); ctx.globalAlpha *= 0.8 + 0.2 * Math.sin(t * 1.3); zigzag(ctx, 1060, 500, 1300, 600, K.drift, 5); ctx.restore();
    const g = 0.92 + 0.08 * Math.sin(t * 1.1 + 1); pijl(ctx, 1860, 520, lerp(1860, 1620, g), lerp(520, 620, g), K.selectie, 1, 5);
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { const D = f5segDur('s01') || 8.6, u = ease(t / D);
    ctx.save(); const sc = lerp(1.14, 1, u); ctx.translate(960, 600); ctx.scale(sc, sc); ctx.translate(-960 + lerp(240, 0, u), -600); atolMacro(ctx, { t }); ctx.restore();
    const a = q.on('Pingelap', 1, 0.6), m1 = q.on('atol', 1, 0.5), m2 = q.on('tweehonderd', 1, 0.5);
    naamBij(ctx, 'Pingelap', null, 80, 200, a * (1 - m1), 'left'); naamBij(ctx, 'Pingelap', 'atol in de Grote Oceaan', 80, 200, a * m1 * (1 - m2), 'left'); naamBij(ctx, 'Pingelap', 'atol in de Grote Oceaan · ±250 inwoners', 80, 200, a * m2, 'left'); },

  s02(ctx, t, q) { f5Bg(ctx);
    const grijs = q.on('geen', 1, 0.8), puls = q.on('achromatopsie', 1, 0.4) * (1 - q.on('Elders', 1, 0.6));
    for (let i = 0; i < 20; i++) { const r = Math.floor(i / 5), k = i % 5, x = 210 + k * 120, y = 340 + r * 137.5, ai = ramp(t, 0.2 + i * 0.1, 0.3); if (ai <= 0.01) continue;
      if (i === 13) { telpop(ctx, x, y, 110, C.text2, ai * 0.55 * (1 - grijs)); telpop(ctx, x, y, 110, C.oker, ai * grijs); if (puls > 0.01) { ctx.save(); ctx.globalAlpha *= puls; goudRing(ctx, x, y - 55, 70 + 4 * Math.sin(t * 3)); ctx.restore(); } }
      else telpop(ctx, x, y, 110, C.text2, ai * 0.55); }
    naamBij(ctx, 'Pingelap', '±1 op de 20', 450, 820, q.on('twintig', 1, 0.6), 'center');
    const ae = q.on('Elders', 1, 0.6); if (ae > 0.01) { const T0 = q.at('Elders'), z = lerp(3.4, 1, ease((t - T0) / 2.6)), cx = 1000 + 37 * 16 + 4.5, cy = 250 + 19 * 16 + 4.5;
      ctx.save(); ctx.globalAlpha *= ae; ctx.beginPath(); ctx.rect(980, 230, 840, 520); ctx.clip(); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
      ctx.fillStyle = rgba(C.text2, 0.3); for (let i = 0; i < 1500; i++) { const x = 1000 + (i % 50) * 16, y = 250 + Math.floor(i / 50) * 16; ctx.fillRect(x, y, 9, 9); }
      ctx.fillStyle = C.oker; ctx.fillRect(1000 + 37 * 16 - 3, 250 + 19 * 16 - 3, 15, 15); ctx.restore();
      const rg = q.on('dertigduizend', 1, 0.5); if (rg > 0.01) { ctx.save(); ctx.globalAlpha *= rg; goudRing(ctx, cx, cy, 22); ctx.restore(); } }
    naamBij(ctx, 'elders', '1 op de 30.000 · uitsnede', 1400, 820, q.on('dertigduizend', 1, 0.6), 'center'); },

  s03(ctx, t, q) { f5Bg(ctx); const vis = Math.round(90 * f5u(t, 0.1, 2.4));
    pot(ctx, 760, 820, 1.4, { p: 0.75, n: 90, seed: 6, vis }); allelBalk(ctx, 580, 870, 360, 0.75, { procent: false, a: ramp(t, 2.2, 0.6) });
    const rg = q.on('gewoon', 1, 0.5) * (1 - q.on('Kan', 1, 0.5)); if (rg > 0.01) { ctx.save(); ctx.globalAlpha *= rg; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (let i = 0; i < 90; i++) if (f5potKleur(0.75, 90, 6, i) === EVO.a2) { const [x, y] = f5potPlek(760, 820, 1.4, i, 6); if (!f5inPot(x, y, 760, 820, 1.4)) continue; ctx.beginPath(); ctx.arc(x, y, 22, 0, 6.283); ctx.stroke(); } ctx.restore(); }
    f5naam(ctx, 'allel voor achromatopsie', 'geen voordeel', 1100, 460, q.on('allel', 1, 0.6), q.on('voordeel', 1, 0.6), 'left', EVO.a2R);
    vraagteken(ctx, 1240, 700, q.on('Kan', 1, 0.6), 180); },

  // ---------- Hoofdstuk 1 — Genetische drift ----------
  s05(ctx, t, q) { f5Bg(ctx);
    pot(ctx, 560, 800, 1.35, { p: 0.5, n: 90, seed: 12, vis: Math.round(90 * f5u(t, q.at('genenpool'), q.at('knikkers') + 0.4)) });
    metaText(ctx, 'generatie 1', 560, 860, rgba(C.text2, q.on('generatie', 1, 0.6)), 'center', 26);
    const ar = q.on('volgende', 1, 0.6);
    metaText(ctx, 'generatie 2', 1360, 860, rgba(C.text2, ar), 'center', 26);
    const G = [[900, 420, EVO.a1], [950, 390, EVO.a2], [1000, 430, EVO.a2], [1050, 400, EVO.a1]], Tg = q.at('niet');
    const weg = ramp(t, q.at('eruit') + 0.3, 0.4);
    G.forEach(([x, y, k], i) => { const u = ease((t - Tg - i * 0.15) / 0.9); if (u <= 0) return; const [px, py] = f5boog(500 + i * 40, 430, x, y + 3 * Math.sin(t * 2 + i), u, 90); knikker(ctx, px, py, 18, k, 1 - weg); });
    pijl(ctx, 820, 470, 820 + 300 * q.on('greep', 1, 0.6), 470, C.line, q.on('greep', 1, 0.3), 3);
    naamBij(ctx, 'een greep uit de pot', null, 960, 330, q.on('greep', 1, 0.6), 'center', C.goud);
    const aan = f5stroom(ctx, t, q.at('eruit'), 0.7, 22, 1100, 440, 1360, 800, 1.35, 0.5, 22, 13, { vlucht: 0.5, hb: 50 });
    pot(ctx, 1360, 800, 1.35, { p: 0.5, n: 22, seed: 13, a: ar, vis: aan }); },

  s06(ctx, t, q) { f5Bg(ctx); pot(ctx, 960, 820, 1.6, { p: 0.5, n: 110, seed: 14 });
    const E = [[700, 300, EVO.a1, 0], [760, 260, EVO.a2, 0], [1160, 300, EVO.a2, 1], [1230, 260, EVO.a1, 1], [820, 330, EVO.a1, 0], [1100, 340, EVO.a2, 1]];
    const Ts = q.at('toeval') + 0.1, dimA = q.on('ongeluk', 1, 0.8);
    E.forEach(([x, y, k, achter], i) => { const ur = ease((t - 0.2 - i * 0.15) / 0.9); if (ur <= 0) return; const mx = 860 + i * 40, my = 300 + (i % 2) * 30;
      const [rx, ry] = f5boog(880 + i * 35, 400, mx, my, ur, 60); const us = ease((t - Ts - i * 0.08) / 0.9);
      const px = lerp(rx, x, us), py = lerp(ry, y, us) + 4 * Math.sin(t * 2 + i); knikker(ctx, px, py, 20, k, achter ? lerp(1, 0.35, dimA) : 1); });
    naamBij(ctx, 'mee', null, 760, 200, ramp(t, Ts + 0.4, 0.6), 'center', C.goud);
    f5naam(ctx, 'blijven achter', 'ongeluk, geen partner', 1200, 200, q.on('ongeluk', 1, 0.6), q.on('partner', 1, 0.6), 'center', C.text2); },

  s07(ctx, t, q) { f5Bg(ctx); const T0 = 0;
    for (let i = 0; i < 10; i++) { const a = ramp(t, T0 + i * 0.08, 0.3); if (a <= 0.01) continue; const xa = 330 + i * 140, wandel = i % 3 === 1, g = f5ijs(t, xa - 16, 32, 1.6, 2.2 + hash(i) * 1.5, i * 1.7);
      muis(ctx, wandel ? g.x : xa, 470, 9, { houding: wandel && g.loopt ? 'lopen' : 'staan', t: g.fase, kijk: wandel ? g.kijk : (i % 2 ? -1 : 1), a }); }
    const ap = q.on('allelen', 1, 0.5); pot(ctx, 640, 840, 1.0, { p: 0.5, n: 20, seed: 31, a: ap, vis: Math.round(20 * f5u(t, q.at('allelen'), q.at('geel') + 0.3)) });
    const as = q.on('Geen', 1, 0.5) * (1 - q.on('Elke', 1, 0.5)); pijl(ctx, 1000, 600, 820, 690, K.selectie, as * 0.7, 5); kruis(ctx, 910, 645, 30, as);
    const Tb = q.at('Elke'), ab = ramp(t, Tb, 0.5); if (ab > 0.01) { const per = 1.0, stop = q.at('Wat'), tt = Math.min(t, stop), nn = Math.max(0, Math.floor((tt - Tb) / per)), uu = t > stop ? 1 : f5u((t - Tb) - nn * per, 0, 0.6);
      pijl(ctx, 780, 700, 1110, 700, C.line, ab, 3);
      pot(ctx, 1280, 840, 1.0, { p: [0.5, 0.45, 0.55, 0.4, 0.5, 0.35][nn % 6], n: 20, seed: 50 + nn, a: ab, vis: Math.round(20 * uu) });
      metaText(ctx, 'generatie ' + (nn + 2), 1280, 875, rgba(C.text2, ab), 'center', 26); }
    vraagteken(ctx, 1490, 800, q.on('zestig', 1, 0.6), 130); },

  s09(ctx, t, q) { f5Bg(ctx); const X = 260, Y = 830, Wd = 1400, Hh = 560, L = DRIFT.klein, Ta = q.at('acht');
    const tot = L.map((_, i) => i === 1 ? 60 * f5u(t, q.at('trekt'), Ta - 0.6) : 60 * f5u(t, Ta + i * 0.25, Ta + i * 0.25 + 2.4));
    f5graf(ctx, X, Y, Wd, Hh, L, { titel: 'simulatie · 10 dieren · 8 keer', markeer: 1, mA: ramp(t, Ta, 0.8), tot, kop: true, assen: ramp(t, 0.1, 0.6) });
    const av = q.on('nul', 1, 0.6) * (1 - q.on('weg', 1, 0.6) * 0.6); if (av > 0.01) L.forEach((Li, i) => { const g = f5vast(Li); if (g < 0 || g > 60) return; ctx.save(); ctx.globalAlpha *= av; circ(ctx, X + g / 60 * Wd, Y - Li[g] * Hh, 9, C.bgSchema, C.text, 3); ctx.restore(); });
    const aw = q.on('weg', 1, 0.6); if (aw > 0.01) { const g = f5vast(L[1]); if (g >= 0) { ctx.save(); ctx.globalAlpha *= aw; goudRing(ctx, X + g / 60 * Wd, Y - L[1][g] * Hh, 18); ctx.restore(); } } },

  s10(ctx, t, q) { f5Bg(ctx); const u = ease(t / 0.9), lx = lerp(260, 180, u), lw = lerp(1400, 700, u), al = lerp(1, 0.6, q.on('vijfduizend', 1, 0.8)), GY = lerp(830, 760, u), GH = lerp(560, 500, u);
    f5graf(ctx, lx, GY, lw, GH, DRIFT.klein, { markeer: 1, mA: 1 - u, a: al, titel: u > 0.5 ? '10 dieren' : 'simulatie · 10 dieren · 8 keer' });
    const ar = q.on('vijfduizend', 1, 0.6); f5graf(ctx, 1080, 760, 700, 500, DRIFT.groot, { titel: '5000 dieren', a: ar, tot: 60 * f5u(t, q.at('dieren') + 0.3, q.at('wiebelen') + 1.4), kop: true });
    const ah = q.on('helft', 1, 0.5); if (ah > 0.01) { ctx.save(); ctx.globalAlpha *= ah * 0.8; ctx.strokeStyle = C.goud; ctx.setLineDash([10, 8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(1080, 760 - 250); ctx.lineTo(1780, 760 - 250); ctx.stroke(); ctx.restore(); } },

  s11(ctx, t, q) { f5Bg(ctx); const u = 1, Y = 760, Hh = 500;
    const k = q.on('kleine', 1, 0.6), g = q.on('grote', 1, 0.6);
    const aL = lerp(0.6, 1, u) * lerp(1, 0.45, g), aR = lerp(1, 0.45, k) * (1 - g) + g;
    f5graf(ctx, 180, Y, 700, Hh, DRIFT.klein, { titel: '10 dieren', a: aL }); f5graf(ctx, 1080, Y, 700, Hh, DRIFT.groot, { titel: '5000 dieren', a: aR });
    naamBij(ctx, 'genetische drift', 'verandering van allelfrequenties door toeval', 960, 150, q.on('genetische', 1, 0.6), 'center', K.drift);
    haak(ctx, 180, 880, 810, 'drift: sterk in kleine populaties', K.drift, q.on('sterk', 1, 0.6) * lerp(1, 0.5, g));
    haak(ctx, 1080, 1780, 810, 'zwak in grote populaties', K.drift, q.on('nauwelijks', 1, 0.6)); },

  // ---------- Hoofdstuk 2 — Flessenhals en founder-effect ----------
  s12(ctx, t, q) { const storm = q.on('raast', 1, 1.2) * lerp(1, 0.15, q.on('Daarna', 1, 1.6)); atolMacro(ctx, { storm, t });
    naamBij(ctx, 'Pingelap', null, 80, 200, ramp(t, 0.1, 0.5) * (1 - q.on('jaar', 1, 0.4)), 'left');
    f5naam(ctx, 'tyfoon', 'rond 1775 · daarna hongersnood', 80, 200, q.on('jaar', 1, 0.6), q.on('hongersnood', 1, 0.6), 'left');
    const a20 = q.on('twintig', 1, 0.6); if (a20 > 0.01) { ctx.save(); ctx.globalAlpha *= a20; evoSchaal(ctx, '±20 overlevenden'); ctx.restore(); } },

  s13(ctx, t, q) { f5Bg(ctx);
    const slotD = f5potSlot(100, 15, 99); pot(ctx, 440, 820, 1.5, { p: 0.995, n: 100, seed: 15, extra: [[EVO.a2, 1]], verberg: t > q.at('drager') - 0.6 ? [slotD] : null });
    metaText(ctx, 'vóór de tyfoon', 440, 870, C.text2, 'center', 26);
    flessenhals(ctx, 960, 560, 1.4, { kleur: K.drift, a: q.on('klein', 1, 0.6) });
    naamBij(ctx, 'flessenhalseffect', null, 960, 330, q.on('flessenhalseffect', 1, 0.6), 'center', K.drift);
    const ar = q.on('Welke', 1, 0.6);
    let io = 0; for (let i = 0; i < 40; i++) if (f5potKleur(39 / 40, 40, 16, i) === EVO.a2) io = i;
    const pad = (i, u) => { const [sx, sy] = f5potPlek(1480, 820, 0.9, i, 16); const P = [i === io ? f5potPlek(440, 820, 1.5, slotD, 15) : [380 + (i % 6) * 22, 520], [700, 520], [870, 556], [960, 560], [1050, 560], [1250, 520], [sx, sy - 120], [sx, sy]];
      let Lt = 0; const sg = []; for (let k = 1; k < P.length; k++) { const d = Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]); sg.push(d); Lt += d; }
      let s = clamp(u, 0, 1) * Lt; for (let k = 1; k < P.length; k++) { if (s <= sg[k - 1]) { const f = s / sg[k - 1]; return [lerp(P[k - 1][0], P[k][0], f), lerp(P[k - 1][1], P[k][1], f)]; } s -= sg[k - 1]; } return P[P.length - 1]; };
    const T0 = q.at('Welke') + 0.2, vlucht = 1.3; let aan = 0, j = 0;
    for (let i = 0; i < 40; i++) { if (i === io) { continue; } const ti = T0 + j * 0.08; j++; const u = (t - ti) / vlucht; if (u >= 1) { aan = i + 1; continue; } if (u <= 0) continue; const [x, y] = pad(i, u); knikker(ctx, x, y, 12, f5potKleur(39 / 40, 40, 16, i)); }
    const Td = q.at('drager') - 0.6, Tl = q.at('achromatopsie') + 0.2; let landed = t > Tl + 0.8;
    if (t > Td && !landed) { const ud = t < Tl ? 0.42 * ease((t - Td) / 0.8) : lerp(0.42, 1, ease((t - Tl) / 0.8)); const [x, y] = pad(io, ud); knikker(ctx, x, y, 16, EVO.a2); ctx.save(); ctx.globalAlpha *= ramp(t, Td + 0.5, 0.3); goudRing(ctx, x, y, 26); ctx.restore(); }
    if (landed) { const [x, y] = f5potPlek(1480, 820, 0.9, io, 16); ctx.save(); ctx.globalAlpha *= 1 - ramp(t, Tl + 1.6, 0.6); goudRing(ctx, x, y, 20); ctx.restore(); }
    pot(ctx, 1480, 820, 0.9, { p: 39 / 40, n: 40, seed: 16, a: ar, vis: Math.max(aan, landed ? io + 1 : 0), verberg: landed ? null : [io] });
    metaText(ctx, '±20 mensen · 40 allelen', 1480, 870, rgba(C.text2, ar), 'center', 26); },

  s14(ctx, t, q) { f5Bg(ctx); const EX = [[C.paars, 10], [C.koraal, 10], [C.groen, 10]];
    pot(ctx, 440, 820, 1.5, { p: 0.4, n: 100, seed: 21, extra: EX, vis: Math.round(100 * f5u(t, 0.1, 1.5)) });
    metaText(ctx, '1000 dieren', 440, 870, rgba(C.text2, q.on('duizend', 1, 0.5)), 'center', 26);
    flessenhals(ctx, 960, 560, 1.4, { kleur: K.drift, a: q.on('flessenhals', 1, 0.6) });
    pot(ctx, 1480, 820, 0.9, { n: 0, a: q.on('twintig', 1, 0.6) }); metaText(ctx, '20 dieren', 1480, 870, rgba(C.text2, q.on('twintig', 1, 0.6)), 'center', 26);
    vraagteken(ctx, 1480, 640, q.on('variatie', 1, 0.6), 130); },

  s16(ctx, t, q) { f5Bg(ctx); const Tb = q.at('Daarna'), mv = ease((t - Tb) / 0.9), fA = 1 - ramp(t, Tb, 0.5);
    pot(ctx, 440, 820, 1.5, { p: 0.4, n: 100, seed: 21, extra: [[C.paars, 10], [C.koraal, 10], [C.groen, 10]], a: fA });
    metaText(ctx, '1000 dieren', 440, 870, rgba(C.text2, fA), 'center', 26);
    let io = 0; for (let i = 0; i < 40; i++) if (f5potKleur(0.975, 40, 40, i) === EVO.a2) io = i;
    const px = lerp(1300, 360, mv), py = lerp(800, 700, mv), ps = lerp(1.0, 0.9, mv);
    pot(ctx, px, py, ps, { p: 0.975, n: 40, seed: 40, vis: Math.round(40 * f5u(t, q.at('veertig') - 0.3, q.at('veertig') + 1.2)) });
    metaText(ctx, '20 mensen · 40 allelen', 1300, 860, rgba(C.text2, q.on('veertig', 1, 0.5) * fA), 'center', 26);
    const Tz = q.at('Zeldzame'); [[C.paars, 0], [C.koraal, 1], [C.paars, 2]].forEach(([k, i]) => { const u = (t - Tz - i * 0.3) / 1.6; if (u <= 0 || u > 1.3) return; const [x, y] = f5boog(480 + i * 30, 400, 980 + i * 40, 520, ease(Math.min(u, 1)), 120); const a = u < 0.7 ? 1 : clamp(1 - (u - 0.7) / 0.6, 0, 1); knikker(ctx, x, y, 17, k, a * fA); kruis(ctx, x, y, 14, (u > 0.6 ? clamp((u - 0.6) / 0.2, 0, 1) : 0) * a * fA, C.text); });
    const ag = q.on('overblijft', 1, 0.6) * (1 - ramp(t, Tb + 1.0, 0.5)); if (ag > 0.01) { const [x, y] = f5potPlek(px, py, ps, io, 40); ctx.save(); ctx.globalAlpha *= ag; goudRing(ctx, x, y, 22); ctx.restore(); }
    const ps4 = [0.975, 0.95, 0.9, 0.85], Tg = q.at('generaties'), ab = ramp(t, Tb + 0.6, 0.5);
    allelBalk(ctx, 230, 740, 260, 0.975, { procent: false, a: ab }); metaText(ctx, 'generatie 1', 360, 840, rgba(C.text2, ab), 'center', 26);
    for (let i = 1; i < 4; i++) { const x = 360 + i * 400, Ti = Tg - 0.4 + (i - 1) * 0.75, a = ramp(t, Ti + 0.35, 0.4);
      f5zig(ctx, x - 260, 480, x - 140, 480, f5u(t, Ti, Ti + 0.4), K.drift, 3);
      pot(ctx, x, 700, 0.9, { p: ps4[i], n: 40, seed: 40 + i, a, vis: Math.round(40 * f5u(t, Ti + 0.35, Ti + 0.9)) });
      allelBalk(ctx, x - 130, 740, 260, ps4[i], { procent: false, a }); metaText(ctx, 'generatie ' + (i * 2 + 1), x, 840, rgba(C.text2, a), 'center', 26); }
    naamBij(ctx, 'klein blijven: drift werkt door', null, 960, 230, q.on('drift', 1, 0.6), 'center', K.drift); },

  s17(ctx, t, q) { f5Bg(ctx);
    allelBalk(ctx, 420, 300, 1000, 0.975, { procent: false, h: 46, a: ramp(t, 0, 0.5) }); metaText(ctx, 'na de tyfoon', 390, 334, rgba(C.text2, ramp(t, 0, 0.5)), 'right', 26);
    const an = q.on('Nu', 1, 0.5), pn = lerp(0.975, 0.78, ease((t - q.at('Nu') - 0.2) / 1.6));
    allelBalk(ctx, 420, 520, 1000, pn, { procent: false, h: 46, a: an }); metaText(ctx, 'nu', 390, 554, rgba(C.text2, an), 'right', 26);
    naamBij(ctx, '±3 op de 10 dragers', '±1 op de 20 achromatopsie', 1450, 540, q.on('drager', 1, 0.6), 'left', EVO.a2R);
    const ad = q.on('drager', 1, 0.6), D = [1, 4, 8, 11, 15, 18], T2 = q.at('drie', 2);
    for (let i = 0; i < 20; i++) { const a = ramp(t, T2 + i * 0.04, 0.3); if (a <= 0.01) continue; const x = 440 + i * 50, isD = D.includes(i);
      telpop(ctx, x, 720, 90, C.text2, a * 0.55 * (isD ? 1 - ad : 1)); if (isD) telpop(ctx, x, 720, 90, C.oker, a * ad); }
    metaText(ctx, 'dragers', 390, 770, rgba(C.oker, ad), 'right', 26);
    haak(ctx, 420, 1420, 800, 'toeval, geen selectie', K.drift, q.on('toeval', 1, 0.6));
    const ag = q.on('procent', 1, 0.6) * (1 - q.on('Nu', 1, 0.6)); if (ag > 0.01) { ctx.save(); ctx.globalAlpha *= ag; f5raster(ctx, 1500, 180, 10, 10, 30, 30, 22, 22, 1, [[2, 3, C.oker, 1], [7, 5, C.oker, 1], [4, 8, C.oker, 1]]); naamBij(ctx, '±3% achromatopsie', '4 generaties na de tyfoon', 1640, 520, 1, 'center', EVO.a2R); ctx.restore(); } },

  s18(ctx, t, q) { f5Bg(ctx); pot(ctx, 480, 820, 1.5, { p: 0.5, n: 100, seed: 18 });
    const ae = q.on('leeg', 1, 0.6); ctx.save(); ctx.globalAlpha *= ae; vul(ctx, [[1150, 800], [1300, 760], [1500, 750], [1680, 790], [1700, 820], [1140, 830]], C.okerD); ctx.restore();
    metaText(ctx, 'leeg eiland', 1420, 870, rgba(C.text2, ae), 'center', 26);
    const Th = q.at('Hun'), H3 = [[860, 420], [920, 390], [980, 430]]; let aan = 0;
    H3.forEach(([hx, hy], i) => { const k = f5potKleur(0.67, 3, 19, i), ur = ease((t - q.at('individuen') - i * 0.2) / 0.9); if (ur <= 0) return;
      const [rx, ry] = f5boog(440 + i * 30, 420, hx, hy + 4 * Math.sin(t * 2 + i), ur, 80); const uf = (t - Th - i * 0.3) / 1.1;
      if (uf >= 1) { aan = i + 1; return; } if (uf <= 0) { knikker(ctx, rx, ry, 18, k); return; }
      const [sx, sy] = f5potPlek(1420, 760, 0.8, i, 19); const [x, y] = f5boog(hx, hy, sx, sy, ease(uf), 140); knikker(ctx, x, y, lerp(18, 13 * 0.8, uf), k); });
    pijl(ctx, 720, 470, 720 + 480 * q.on('nieuwe', 1, 0.8), 470, C.line, q.on('nieuwe', 1, 0.3), 3);
    pot(ctx, 1420, 760, 0.8, { p: 0.67, n: 3, seed: 19, a: ae, vis: aan });
    naamBij(ctx, 'founder-effect', 'een paar stichters, toevallige allelen', 960, 290, q.on('founder', 1, 0.6), 'center', K.drift); },

  s19(ctx, t, q) { const D = f5segDur('s19') || 7.6, P = 1.35, s = 1.15, pas = F5_LUIP_PAS * s;
    const world = pas * t / P, sx = lerp(620, 1160, t / D), cam = world - sx;
    macroNacht(ctx);
    for (let k = 0; k < 5; k++) { const span = 2800; let x = ((k * 560 + 200 - cam * 0.3) % span + span) % span - 300; f5acacia(ctx, x, 560 + (k % 2) * 10, 0.9 + 0.2 * hash(k)); }
    for (let k = 0; k < 26; k++) { const span = W + 400; let x = ((k * 97 + hash(k * 3) * 60 - cam) % span + span) % span - 200; f5gras(ctx, x, 862 + hash(k * 7) * 16, 0.8 + 0.5 * hash(k * 11)); }
    jachtluipaard(ctx, sx, 860, s, { houding: 'lopen', t: t / P });
    naamBij(ctx, 'jachtluipaard', 'Acinonyx jubatus', 80, 200, q.on('jachtluipaard', 1, 0.6), 'left');
    const af = q.on('twaalfduizend', 1, 0.6); if (af > 0.01) { ctx.save(); ctx.globalAlpha *= af; metaText(ctx, 'flessenhals ±12.000 jaar geleden', 80, 290, C.text2, 'left', 26); ctx.restore(); } },

  s20(ctx, t, q) { f5Bg(ctx); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 640); ctx.lineTo(760, 640); ctx.moveTo(1160, 640); ctx.lineTo(1640, 640); ctx.stroke();
    jachtluipaard(ctx, 520, 640, 0.75, { houding: 'liggen' }); jachtluipaard(ctx, 1400, 640, 0.75, { kijk: -1 });
    const Ts = q.at('stukje'), Ta = q.at('ene'), Tb = q.at('dier') + 0.2, as = ramp(t, Ts, 0.4);
    let x, y, z; if (t < Ta) { x = 560; y = 560; z = 34; } else { const u = ease((t - Ta) / (Tb - Ta)); if (u < 0.5) { x = lerp(560, 960, u * 2); y = lerp(560, 420, ease(u * 2)); z = lerp(34, 80, u * 2); } else { x = lerp(960, 1380, (u - 0.5) * 2); y = lerp(420, 470, ease((u - 0.5) * 2)); z = lerp(80, 40, (u - 0.5) * 2); } }
    if (as > 0.01) { ctx.save(); ctx.globalAlpha *= as; roundRect(ctx, x - z / 2, y - z / 2, z, z, 8); shape(ctx, '#D3A35E', C.goud, 3); circ(ctx, x - z * 0.15, y - z * 0.12, z * 0.09, '#1E1A16'); circ(ctx, x + z * 0.18, y + z * 0.2, z * 0.075, '#1E1A16'); ctx.restore(); }
    pijl(ctx, 760, 420, 900, 420, C.line, ramp(t, Ta, 0.4), 3); pijl(ctx, 1020, 420, 1160, 420, C.line, ramp(t, Ta + 0.5, 0.4), 3);
    const am = q.on('mensen', 1, 0.5) * (1 - q.on('jachtluipaarden', 1, 0.5)); if (am > 0.01) { ctx.save(); ctx.globalAlpha *= am; roundRect(ctx, 930, 740, 60, 60, 8); shape(ctx, '#E3B998', C.line, 2); ctx.restore(); kruis(ctx, 960, 770, 26, am * q.on('af', 1, 0.4)); metaText(ctx, 'mens', 960, 850, rgba(C.text2, am), 'center', 26); }
    const Tv = q.at('veertien'); for (let i = 0; i < 14; i++) { const a = ramp(t, Tv + i * 0.08, 0.25); if (a <= 0.01) continue; const cx = 560 + i * 60, cy = 800; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 12, cy); ctx.lineTo(cx - 2, cy + 12); ctx.lineTo(cx + 16, cy - 14); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, '14 van de 14 geaccepteerd', "O'Brien e.a. 1985", 960, 200, q.on('veertien', 1, 0.6), 'center', C.groen); },

  s21(ctx, t, q) { f5Bg(ctx); const EX = [[C.paars, 10], [C.koraal, 10], [C.groen, 10]];
    pot(ctx, 1360, 800, 1.3, { p: 0.98, n: 90, seed: 22, vis: Math.round(90 * f5u(t, 0.1, 1.4)) }); metaText(ctx, 'jachtluipaard', 1360, 870, rgba(C.goud, ramp(t, 0.1, 0.5)), 'center', 26);
    const al = q.on('variatie', 1, 0.6); pot(ctx, 560, 800, 1.3, { p: 0.4, n: 90, seed: 21, extra: EX, a: al, vis: Math.round(90 * f5u(t, q.at('variatie'), q.at('variatie') + 1.2)) });
    metaText(ctx, 'andere katachtigen', 560, 870, rgba(C.text2, al), 'center', 26);
    f5naam(ctx, 'afweergenen', 'weinig variatie = risico bij een nieuwe ziekte', 960, 250, q.on('afweergenen', 1, 0.6), q.on('risico', 1, 0.6), 'center');
    if (q.on('risico', 1, 0.5) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('risico', 1, 0.5); evoSchaal(ctx, 'schematisch'); ctx.restore(); }
    const Tz = q.at('ziekte'); for (const [X, pp, seed, ex] of [[1360, 0.98, 22, null], [560, 0.4, 21, EX]]) for (let i = 0; i < 90; i++) { if (f5potKleur(pp, 90, seed, i, ex) !== EVO.a1) continue; const [x, y] = f5potPlek(X, 800, 1.3, i, seed); if (!f5inPot(x, y, X, 800, 1.3)) continue; const a = ramp(t, Tz + 0.15 + (i % 9) * 0.06 + Math.floor(i / 9) * 0.08, 0.4); if (a <= 0.01) continue;
      ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, 16, rgba('#121A26', 0.55)); ctx.strokeStyle = rgba(C.koraal, 0.9); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, 16, 0, 6.283); ctx.stroke(); ctx.restore(); } },

  // ---------- Hoofdstuk 3 — Genenstroom ----------
  s22(ctx, t, q) { f5Bg(ctx); f5reservaten(ctx, t, q, { verschijn: true });
    naamBij(ctx, 'Zuid-Afrika', 'omheinde reservaten', 960, 160, q.on('Zuid', 1, 0.6), 'center'); },

  s23(ctx, t, q) { f5Bg(ctx); f5reservaten(ctx, t, q, { verhuis: true });
    const Tl = q.at('Uitwisseling') - 0.3;
    naamBij(ctx, 'Zuid-Afrika', 'omheinde reservaten', 960, 160, 1 - ramp(t, Tl - 0.4, 0.4), 'center');
    f5naam(ctx, 'genenstroom', 'sinds 2011 verhuizen naar ander reservaat', 960, 160, ramp(t, Tl, 0.5), q.on('genenstroom', 1, 0.6), 'center', _lt(K.stroom, 0.3)); },

  s24(ctx, t, q) { f5Bg(ctx); const aA = ramp(t, 0, 0.4), aB = ramp(t, 0.3, 0.4);
    pot(ctx, 640, 760, 1.2, { p: 0.9, n: 70, seed: 70, a: aA }); allelBalk(ctx, 520, 790, 240, 0.9, { a: aA * q.on('negentig', 1, 0.5) });
    pot(ctx, 1280, 760, 1.2, { p: 0.1, n: 70, seed: 71, a: aB }); allelBalk(ctx, 1160, 790, 240, 0.1, { a: aB * q.on('tien', 1, 0.5) });
    const Tv = q.at('verhuist'); if (t > Tv) for (let k = 0; k < 4; k++) { const u = (t - Tv - k * 1.3) / 1.2; if (u <= 0 || u >= 1) continue; const e = ease(u), a = Math.min(1, Math.sin(Math.PI * u) * 3);
      const [x1, y1] = f5boog(700, 400, 1220, 400, e, 100); knikker(ctx, x1, y1, 16, EVO.a1, a); const [x2, y2] = f5boog(1220, 420, 700, 420, e, -80); knikker(ctx, x2, y2, 16, EVO.a2, a); }
    const ap = q.on('verhuist', 1, 0.5) * 0.8; pijl(ctx, 820, 300, 1100, 300, K.stroom, ap, 4); pijl(ctx, 1100, 540, 820, 540, K.stroom, ap, 4);
    vraagteken(ctx, 960, 470, q.on('Wat', 1, 0.6), 120); },

  s26(ctx, t, q) { f5Bg(ctx); const X = 300, Y = 830, Wd = 1300, Hh = 560, kl = [K.stroom, _lt(K.stroom, 0.45)];
    const Tv = q.at('verhuist'), Te = q.at('gelijk') - 0.2, n = 40 * f5u(t, Tv, Te);
    f5graf(ctx, X, Y, Wd, Hh, STROOM, { gen: 40, kleuren: kl, titel: 'simulatie · 5% uitwisseling per generatie', tot: n, kop: true, assen: ramp(t, 0, 0.5) });
    const a0 = q.on('negentig', 1, 0.5), b0 = q.on('tien', 1, 0.5); if (n <= 0.01) { circ(ctx, X, Y - 0.9 * Hh, 7, rgba(kl[0], a0)); circ(ctx, X, Y - 0.1 * Hh, 7, rgba(kl[1], b0)); }
    const [ax, ay] = f5kopPunt(X, Y, Wd, Hh, STROOM[0], n, 40), [bx, by] = f5kopPunt(X, Y, Wd, Hh, STROOM[1], n, 40);
    const yA = Math.min(ay - 20, by - 66), yB = Math.max(by + 46, ay + 92);
    naamBij(ctx, 'populatie A', null, ax + 22, yA, a0, 'left', kl[0]); naamBij(ctx, 'populatie B', null, bx + 22, yB, b0, 'left', kl[1]); },

  s27(ctx, t, q) { f5Bg(ctx); const u = ease(f5u(t, 0.1, 2.2)), ue = ease(f5u(t, q.at('groeien'), q.at('groeien') + 1.4));
    const pA = lerp(lerp(0.9, 0.55, u), 0.72, ue), pB = lerp(lerp(0.1, 0.5, u), 0.33, ue), stop = q.on('Stopt', 1, 0.6);
    pot(ctx, 640, 760, 1.2, { p: pA, n: 70, seed: 70 }); pot(ctx, 1280, 760, 1.2, { p: pB, n: 70, seed: 71 });
    allelBalk(ctx, 520, 790, 240, pA, { procent: false }); allelBalk(ctx, 1160, 790, 240, pB, { procent: false });
    const pul = 1 + 0.4 * q.on('nieuwe', 1, 0.3) * (1 - q.on('populatie', 2, 0.5)); pijl(ctx, 820, 420, 1100, 420, K.stroom, 1 - stop * 0.85, 5 * pul); pijl(ctx, 1100, 480, 820, 480, K.stroom, 1 - stop * 0.85, 5 * pul);
    for (let k = 0; k < 3; k++) { const uu = f5fr(t * 0.55 + k / 3), fa = Math.sin(Math.PI * uu) * (1 - stop); knikker(ctx, lerp(830, 1090, uu), 395, 12, k % 2 ? EVO.a2 : EVO.a1, fa); knikker(ctx, lerp(1090, 830, uu), 505, 12, k % 2 ? EVO.a1 : EVO.a2, fa); }
    if (stop > 0.01) { ctx.save(); ctx.globalAlpha *= stop; ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(960, 360); ctx.lineTo(960, 780); ctx.stroke(); ctx.restore(); }
    haak(ctx, 460, 1460, 820, 'genenstroom: potten gaan op elkaar lijken', _lt(K.stroom, 0.3), q.on('gelijk', 1, 0.6) * (1 - stop)); },

  // ---------- Hoofdstuk 4 — Vier krachten in één pot ----------
  s28(ctx, t, q) { f5Bg(ctx); const p = lerp(0.6, 0.67, ease(f5u(t, q.at('worden'), q.at('worden') + 1.2)));
    f5vier(ctx, { p, potA: ramp(t, 0, 0.5), vis: Math.round(70 * f5u(t, 0.2, 1.8)), t, sel: [q.on('Selectie', 1, 0.4), f5u(t, q.at('Selectie'), q.at('Selectie') + 0.8), q.on('hangt', 1, 0.6)] }); },

  s29(ctx, t, q) { f5Bg(ctx); const w = q.on('verschuift', 1, 0.6), p = lerp(0.67, 0.6, ease(f5u(t, 0, 5.5))) + 0.05 * w * (Math.sin(t * 2.3) * 0.6 + Math.sin(t * 4.1 + 1) * 0.4) * (1 + 0.6 * q.on('kleine', 1, 0.6));
    f5vier(ctx, { p, t, sel: [lerp(1, 0.35, ramp(t, 0, 0.6)), 1, 1], drift: [ramp(t, 0, 0.4), f5u(t, 0.05, 0.9), q.on('richting', 1, 0.6)] }); },

  s30(ctx, t, q) { f5Bg(ctx); const p = 0.6 + 0.02 * Math.sin(t * 2.1); const Tm = q.at('nieuwe'), mutU = t < Tm ? 0 : f5u(t, Tm, Tm + 0.9);
    f5vier(ctx, { p, t, sel: [0.35, 1, 1], drift: [lerp(1, 0.35, ramp(t, 0, 0.6)), 1, 1], stroom: [ramp(t, 0, 0.4), f5u(t, 0.05, 0.8), q.on('erbij', 1, 0.6)], stroomLoop: q.on('erbij', 1, 0.6) * (1 - 0.6 * q.on('mutatie', 1, 0.6)),
      mut: [q.on('mutatie', 1, 0.5), f5u(t, q.at('mutatie'), q.at('mutatie') + 0.6), q.on('zeldzaam', 1, 0.6)], mutU, mutIn: t > Tm + 0.85 ? 1 : 0 }); },

  s31(ctx, t, q) { f5Bg(ctx); f5vier(ctx, { p: 0.6 + 0.015 * Math.sin(t * 2.1), t, sel: [0.6, 1, 0], drift: [0.6, 1, 0], stroom: [0.6, 1, 0], mut: [0.6, 1, 0], mutIn: 1, vraag: q.on('kracht', 1, 0.6) }); },

  s33(ctx, t, q) { f5Bg(ctx); const Td = q.at('Drift'), ak = q.on('kleine', 1, 0.8);
    pingelapKaart(ctx, 620, 500, 0.95, { namen: false, a: ak }); naamBij(ctx, 'Pingelap', null, 620, 790, q.on('Pingelap', 1, 0.6), 'center');
    const p = lerp(0.975, 0.78, ease(f5u(t, q.at('toeval'), q.at('gewoon') + 0.3)));
    pot(ctx, 1380, 760, 1.15, { p, n: 70, seed: 6, a: ramp(t, 0, 0.4) }); allelBalk(ctx, 1220, 800, 320, p, { procent: false, a: ramp(t, 0, 0.4) });
    f5pijl(ctx, 1760, 330, 1530, 450, f5u(t, 0.1, 0.8), K.selectie, lerp(1, 0.35, ramp(t, Td, 0.6)), 5);
    naamBij(ctx, 'selectie', 'voordeel wordt vaker', 1780, 290, ramp(t, 0.3, 0.5) * (1 - ramp(t, Td - 0.3, 0.4)), 'right', K.selectie);
    f5zig(ctx, 1000, 330, 1260, 450, f5u(t, Td, Td + 0.8), K.drift, 5);
    f5naam(ctx, 'drift', 'kijkt niet naar voordeel', 1120, 280, ramp(t, Td, 0.5), q.on('kijkt', 1, 0.6), 'center', K.drift); },

  // ---------- Hoofdstuk 5 — Hardy-Weinberg (vwo) ----------
  s34(ctx, t, q) { f5Bg(ctx); pot(ctx, 700, 760, 1.3, { p: 0.6, n: 80, seed: 80, vis: Math.round(80 * f5u(t, 0, 1.3)) }); allelBalk(ctx, 520, 810, 360, 0.6, { procent: false, a: ramp(t, 0.9, 0.4) });
    const am = q.on('meet', 1, 0.5); if (am > 0.01) { ctx.save(); ctx.globalAlpha *= am; ctx.strokeStyle = C.goud; ctx.lineWidth = 2; for (let i = 0; i <= 10; i++) { const x = 520 + i * 36, hh = i % 5 ? 8 : 16; ctx.beginPath(); ctx.moveTo(x, 852); ctx.lineTo(x, 852 + hh * ramp(t, q.at('meet') + i * 0.04, 0.2)); ctx.stroke(); } ctx.restore(); }
    f5naam(ctx, 'Hardy-Weinberg', 'een meetlat voor de pot', 1100, 480, q.on('regel', 1, 0.6), q.on('Hardy', 1, 0.6), 'left', C.goud); },

  s35(ctx, t, q) { f5Bg(ctx); const u = ease(t / 0.9), bx = lerp(520, 360, u), by = lerp(810, 440, u), bw = lerp(360, 1200, u), bh = lerp(34, 70, u);
    if (u < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - u; pot(ctx, 700, 760, 1.3, { p: 0.6, n: 80, seed: 80 }); ctx.restore(); }
    allelBalk(ctx, bx, by, bw, 0.6, { procent: false, h: bh });
    text(ctx, 'p', 360 + 360, 500, fTekst(64, 700), rgba(C.bgMicro, q.on('p', 1, 0.4)), 'center'); text(ctx, 'q', 360 + 960, 500, fTekst(64, 700), rgba(C.bgMicro, q.on('q', 1, 0.4)), 'center');
    const parts = [['p', q.on('p', 2, 0.3)], [' + ', q.on('plus', 1, 0.3)], ['q', q.on('q', 2, 0.3)], [' = 1', q.on('één', 1, 0.3)]];
    ctx.font = fTitel(96); const ws = parts.map(([s]) => ctx.measureText(s).width), tw = ws.reduce((a, b) => a + b, 0); let x = 960 - tw / 2;
    parts.forEach(([s, a], i) => { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, 700 + (1 - a) * 20, fTitel(96), C.text, 'left'); ctx.restore(); } x += ws[i]; }); },

  s36(ctx, t, q) { f5Bg(ctx); const P = 0.6, X = 760, Wd = 1000; pot(ctx, 360, 640, 1.0, { p: P, n: 55, seed: 81, a: ramp(t, 0, 0.4) });
    const Tg = q.at('twee'), ag = 1 - ramp(t, q.at('Twee', 2) - 0.3, 0.4);
    [[640, 330, EVO.a1], [700, 330, EVO.a2]].forEach(([x, y, k], i) => { const u = ease((t - Tg - i * 0.2) / 0.8); if (u <= 0) return; const [px, py] = f5boog(330 + i * 40, 420, x, y + 3 * Math.sin(t * 2 + i), u, 70); knikker(ctx, px, py, 22, k, ag); });
    pijl(ctx, 560, 380, 620, 350, C.line, ramp(t, Tg + 0.6, 0.4) * ag, 3);
    const vak = [[X + P * P * Wd / 2, [EVO.a1, EVO.a1], 'Twee', 2, 'kwadraat', 1, 'twee keer blauw'], [X + P * P * Wd + P * (1 - P) * Wd, [EVO.a1, EVO.a2], 'Eén', 1, 'twee', 4, 'één van elk'], [X + Wd * (1 - (1 - P) * (1 - P) / 2), [EVO.a2, EVO.a2], 'Twee', 3, 'kwadraat', 2, 'twee keer geel']];
    const zicht = [0, 0, 0]; vak.forEach(([cx, ks, w1, n1, w2, n2, lab], j) => { const T1 = q.at(w1, n1); zicht[j] = q.on(w2, n2, 0.6);
      ks.forEach((k, i) => { const u = ease((t - T1 - i * 0.15) / 0.9); if (u <= 0) return; const [px, py] = f5boog(330 + i * 40, 420, cx + (i ? 26 : -26), 420 + 3 * Math.sin(t * 2 + i + j), u, 120); knikker(ctx, px, py, 20, k); });
      metaText(ctx, lab, cx, 640, rgba(C.text2, zicht[j]), 'center', 26); });
    f5gBalk(ctx, X, 480, Wd, P, { h: 90, zicht });
    const ag2 = q.on('genotypefrequenties', 1, 0.6); if (ag2 > 0.01) { ctx.save(); ctx.globalAlpha *= ag2; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, X - 8, 472, Wd + 16, 106, 14); ctx.stroke(); ctx.restore(); } },

  s37(ctx, t, q) { f5Bg(ctx); const u = ease(t / 0.9), P = 0.6;
    if (u < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - u; pot(ctx, 360, 640, 1.0, { p: P, n: 55, seed: 81 }); ctx.restore(); }
    f5gBalk(ctx, lerp(760, 460, u), lerp(480, 240, u), 1000, P, { h: lerp(90, 80, u) });
    const v = [['grote populatie', 'grote', 1], ['willekeurig paren', 'willekeurig', 1], ['geen selectie', 'selectie', 1], ['geen genenstroom', 'genenstroom', 1], ['geen mutatie', 'mutatie', 1]];
    v.forEach(([s, w, n], i) => { const a = q.on(w, n, 0.5); if (a <= 0.01) return; const x = 160 + i * 330; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, 440 + (1 - a) * 30, 300, 110, 14); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); text(ctx, s, x + 150, 508 + (1 - a) * 30, fTekst(36, 600), C.text, 'center'); ctx.restore(); });
    haak(ctx, 160, 1790, 590, 'wijkt het af? dan werkt er een kracht', C.groen, q.on('Wijkt', 1, 0.6)); },

  s38(ctx, t, q) { f5Bg(ctx); const zicht = f5u(t, 0.3, q.at('baby')); const ao = q.on('heeft', 1, 0.5);
    f5raster(ctx, 360, 220, 100, 25, 12, 22, 8, 16, zicht, [[63, 13, C.oker, ao]]);
    const az = q.on('ziekte', 1, 0.5) * (1 - q.on('kwadraat', 1, 0.8) * 0.5); if (az > 0.01) { ctx.save(); ctx.globalAlpha *= az; goudRing(ctx, 360 + 63 * 12 + 4, 220 + 13 * 22 + 8, 20); ctx.restore(); }
    f5naam(ctx, '1 op de 2500 ziek', 'q² = 1/2500', 960, 820, q.on('ziekte', 1, 0.6), q.on('kwadraat', 1, 0.6), 'center', EVO.a2R); },

  s39(ctx, t, q) { f5Bg(ctx); f5raster(ctx, 360, 220, 100, 25, 12, 22, 8, 16, 1, [[63, 13, C.oker, 1]]);
    naamBij(ctx, '1 op de 2500 ziek', 'q² = 1/2500', 960, 820, 1 - q.on('drager', 1, 0.6), 'center', EVO.a2R);
    naamBij(ctx, 'drager?', 'één van elk allel · niet ziek', 960, 820, q.on('drager', 1, 0.6), 'center', C.goud); },

  s41(ctx, t, q) { f5Bg(ctx);
    const rg = [['q² = 1/2500', C.text2, ramp(t, 0, 0.4)], ['q = √(1/2500) = 1/50', C.text2, q.on('wortel', 1, 0.6)], ['p ≈ 1', C.text2, q.on('Dan', 1, 0.6)]];
    rg.forEach(([s, c, a], i) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, 300 - (1 - a) * 40, 300 + i * 120, fTekst(60, 600), c, 'left'); ctx.restore(); });
    const L4 = [['2pq ≈ 2 × 1/50', q.on('twee', 1, 0.5)], [' = 1/25', q.on('vijfentwintig', 1, 0.5)], [' ≈ 4%', q.on('vier', 1, 0.5)]]; let x = 300;
    L4.forEach(([s, a]) => { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, 660 + (1 - a) * 20, fTekst(60, 600), C.goud, 'left'); ctx.restore(); } ctx.font = fTekst(60, 600); x += ctx.measureText(s).width; });
    const ar = q.on('Dragers', 1, 0.6), lit = [[3, 1], [7, 4], [1, 6], [5, 8]];
    f5raster(ctx, 1310, 250, 10, 10, 45, 34, 30, 26, ar, lit.map(([k, r], i) => [k, r, C.goud, ramp(t, q.at('vier') + i * 0.15, 0.3)]));
    if (ar > 0.01) metaText(ctx, '100 mensen', 1310, 620, rgba(C.text2, ar), 'left', 26);
    f5naam(ctx, 'drager', 'één van elk allel · niet ziek', 1310, 700, q.on('vier', 1, 0.6), q.on('ziek', 1, 0.6), 'left', C.goud); },

  // ---------- heterozygotenvoordeel (vwo) ----------
  s42(ctx, t, q) { const Tz = q.at('Met'), z = ease((t - Tz) / 1.3);
    f5Bg(ctx); const k2 = q.on('sikkelcelallelen', 1, 0.5);
    knikker(ctx, 930, 540, 30, EVO.a1, ramp(t, 0.2, 0.4) * (1 - k2)); knikker(ctx, 930, 540, 30, EVO.a2, ramp(t, 0.2, 0.4) * k2); knikker(ctx, 990, 540, 30, EVO.a2, ramp(t, 0.5, 0.4));
    naamBij(ctx, 'twee allelen', 'selectie houdt ze in stand', 960, 460, q.on('twee', 1, 0.5) * (1 - z), 'center');
    if (z > 0.001 && z < 1) { const r = lerp(40, 1150, z); zoomCircle(ctx, 960, 540, r, 960, 540, null, 1, () => f5vat42(ctx, t, q)); }
    if (z >= 1) f5vat42(ctx, t, q); },

  s43(ctx, t, q) { const Tc = q.at('Toch');
    const xf = ramp(t, Tc - 0.1, 0.5); if (xf > 0.01) { f5Bg(ctx); f5dragersRij(ctx, t, q, Tc - 0.4); }
    if (xf < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - xf; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H);
      bloedvat(ctx, [[-50, 520], [600, 520], [900, 540], [1980, 540]], 70, 0, { n: 0 });
      const S = [[820, 520, 0.3], [900, 540, -0.4], [960, 520, 0.6], [1040, 545, -0.2]]; S.forEach(([x, y, an], i) => { const u = ease((t + 0.6 - i * 0.35) / 2.2); sikkelcel(ctx, lerp(x - 700, x, u), y + (1 - u) * 6 * Math.sin(t * 3 + i), 34, an + (1 - u) * 0.3 * Math.sin(t * 2 + i)); });
      for (const [x, y, i] of [[300, 520, 0], [480, 525, 1]]) { const u = ease((t - 0.4 - i * 0.4) / 2.6); rodeBloedcel(ctx, lerp(x - 500, x, u) + 2 * Math.sin(t * 2.5 + i), y, 40, 0, 0.8); }
      naamBij(ctx, 'sikkelcellen blijven haken', 'twee sikkelcelallelen', 960, 380, ramp(t, 0.1, 0.6), 'center', C.koraal);
      const ak = q.on('kinderen', 1, 0.6); if (ak > 0.01) { ctx.save(); ctx.globalAlpha *= ak; naamBij(ctx, 'zonder behandeling', 'meer dan de helft sterft jong', 960, 720, 1, 'center', C.koraal); ctx.restore(); }
      ctx.restore(); } },

  s44(ctx, t, q) { f5Bg(ctx); f5dragersRij(ctx, 99, null, 0); vraagteken(ctx, 960, 400, q.on('Waarom', 1, 0.6), 150); },

  s46(ctx, t, q) { f5Bg(ctx); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(260, 600); ctx.lineTo(260 + 1400 * ramp(t, 0, 0.8), 600); ctx.stroke();
    metaText(ctx, 'blauw = normaal allel · geel = sikkelcelallel', 960, 300, rgba(C.text2, ramp(t, 0.2, 0.5)), 'center', 26);
    const ab = q.on('best', 1, 0.6);
    knikker(ctx, 990, 520, 30, EVO.a2, q.on('sikkelcelallel', 1, 0.4)); knikker(ctx, 930, 520, 30, EVO.a1, q.on('normaal', 1, 0.4));
    f5naam(ctx, 'drager', '±9× minder ernstige malaria', 960, 670, q.on('Dragers', 1, 0.6), q.on('negen', 1, 0.6), 'center', ab > 0.5 ? C.groen : C.text);
    const al = q.on('malaria', 2, 0.6), ar = ramp(t, q.at('malaria', 2) + 0.6, 0.6);
    knikker(ctx, 450, 520, 30, EVO.a1, al); knikker(ctx, 510, 520, 30, EVO.a1, al); naamBij(ctx, 'twee normale allelen', 'ernstige malaria', 480, 670, al, 'center');
    knikker(ctx, 1410, 520, 30, EVO.a2, ar); knikker(ctx, 1470, 520, 30, EVO.a2, ar); naamBij(ctx, 'twee sikkelcelallelen', 'sikkelcelziekte', 1440, 670, ar, 'center');
    if (ab > 0.01) { ctx.save(); ctx.globalAlpha *= ab * (0.75 + 0.25 * Math.sin(t * 2.5)); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; roundRect(ctx, 880, 472, 160, 96, 48); ctx.stroke(); ctx.restore(); }
    haak(ctx, 820, 1100, 760, 'heterozygotenvoordeel', C.groen, q.on('heterozygotenvoordeel', 1, 0.6));
    const ap = q.on('beide', 1, 0.5); if (ap > 0.01) { ctx.save(); ctx.globalAlpha *= ap; for (const x of [480, 1440]) { ctx.strokeStyle = C.goud; ctx.lineWidth = 3; roundRect(ctx, x - 80, 472, 160, 96, 48); ctx.stroke(); } ctx.restore(); } },

  // ---------- Samengevat ----------
  s47(ctx, t, q) { f5Bg(ctx); const Td = q.at('Dat'), fA = 1 - ramp(t, Td - 0.3, 0.5), fB = ramp(t, Td, 0.5);
    if (fA > 0.01) { ctx.save(); ctx.globalAlpha *= fA; pot(ctx, 700, 800, 1.2, { p: 0.5, n: 80, seed: 12 });
      const aan = f5stroom(ctx, t, q.at('greep') - 0.2, 1.2, 14, 700, 470, 1260, 800, 0.9, 0.5, 14, 13, { vlucht: 0.6, hb: 120 });
      pot(ctx, 1260, 800, 0.9, { p: 0.5, n: 14, seed: 13, vis: aan, a: ramp(t, 0.6, 0.5) }); vraagteken(ctx, 1260, 420, q.on('toeval', 1, 0.5), 110); ctx.restore(); }
    if (fB > 0.01) { ctx.save(); ctx.globalAlpha *= fB; const k = q.on('kleine', 1, 0.6), g = q.on('grote', 1, 0.6), n = 60 * f5u(t, Td, Td + 2.0);
      f5graf(ctx, 260, 760, 600, 420, DRIFT.klein, { titel: 'klein', tot: n, a: lerp(1, 0.5, g) }); f5graf(ctx, 1100, 760, 600, 420, DRIFT.groot, { titel: 'groot', tot: n, a: lerp(1, 0.5, k * (1 - g)) });
      naamBij(ctx, 'genetische drift', 'toeval · sterk in kleine populaties', 960, 200, q.on('drift', 1, 0.6), 'center', K.drift); ctx.restore(); } },

  s48(ctx, t, q) { f5Bg(ctx); const a1 = q.on('flessenhals', 1, 0.6), a2 = q.on('Genenstroom', 1, 0.6);
    card(ctx, 200, 300, 720, 300, 'flessenhals · founder-effect', 'populatie ineens klein: variatie gaat verloren', a1, K.drift);
    card(ctx, 1000, 300, 720, 300, 'genenstroom', 'allelen tussen populaties: potten worden meer gelijk', a2, _lt(K.stroom, 0.3));
    if (a1 > 0.01) { ctx.save(); ctx.globalAlpha *= a1; flessenhals(ctx, 560, 720, 0.8, { kleur: K.drift });
      for (let k = 0; k < 4; k++) { const u = f5fr(t * 0.35 + k / 4), x = lerp(430, 690, u), a = Math.sin(Math.PI * u); knikker(ctx, x, 720, 11, k === 2 ? EVO.a2 : EVO.a1, a); } ctx.restore(); }
    if (a2 > 0.01) { ctx.save(); ctx.globalAlpha *= a2; pot(ctx, 1210, 840, 0.42, { p: 0.6, n: 20, seed: 90 }); pot(ctx, 1510, 840, 0.42, { p: 0.5, n: 20, seed: 91 });
      pijl(ctx, 1290, 720, 1430, 720, K.stroom, 1, 4); pijl(ctx, 1430, 760, 1290, 760, K.stroom, 1, 4);
      for (let k = 0; k < 2; k++) { const u = f5fr(t * 0.5 + k / 2), a = Math.sin(Math.PI * u); knikker(ctx, lerp(1300, 1420, u), 700, 10, EVO.a1, a); knikker(ctx, lerp(1420, 1300, u), 780, 10, EVO.a2, a); } ctx.restore(); } },

  s49(ctx, t, q) { f5Bg(ctx); pingelapKaart(ctx, 600, 480, 0.85, { a: q.on('Pingelap', 1, 0.6), namen: false }); naamBij(ctx, 'Pingelap', 'atol · ±1,8 km² land', 600, 760, q.on('Pingelap', 1, 0.6), 'center');
    const p = lerp(0.975, 0.78, ease(f5u(t, q.at('Daarna'), q.at('gewoon') + 0.4)));
    allelBalk(ctx, 1080, 420, 640, p, { procent: false, a: q.on('allel', 1, 0.6) });
    f5naam(ctx, 'allel achromatopsie', '±22% · was 1 op 40', 1720, 380, q.on('achromatopsie', 1, 0.6), q.on('gewoon', 1, 0.6), 'right', EVO.a2R);
    haak(ctx, 1080, 1720, 560, 'vaak door toeval, niet door voordeel', K.drift, q.on('vaak', 1, 0.6)); },
});
