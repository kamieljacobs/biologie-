// scenes_e5.js — film 5 Waarom zo weinig roofdieren? — geanimeerde scènes op de keyframes van sb5.js (bouw 29 okt 2026)
// t = seconden sinds het begin van de alinea; q.on(woord, n, duur) = 0→1 vanaf dat woord. Kleuren: energie goud · warmte koraal · productie groen · feces/voer oker · stoffen grijs.
const E5KOE = 2;                       // px per cm in de weilandscènes
const E5KOE_V = 130 * E5KOE * 0.75;    // koe stapt 130 cm per cyclus, ± 0,75 cyclus per s
function e5KoeA(ctx, x, y, o = {}) { koe7(ctx, x, y, E5KOE / 1.7, o); }

Object.assign(SCENES, {
  // ================= TITEL: piramide gras · muizen · vos (rechts van x 1150) =================
  title(ctx, t) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H);
    e5PiramideA(ctx, 1460, 880, [[680, C.groen, null], [380, C.oker, null], [130, C.koraal, null]], { h: 150, g: [t / 0.8, (t - 0.4) / 0.8, (t - 0.8) / 0.8] });
    [1200, 1330, 1460, 1590, 1720].forEach((x, i) => { ctx.save(); ctx.translate(x, 850); ctx.rotate(Math.sin(t * 1.3 + i) * 0.04); grasPol(ctx, 0, 0, 1.6); ctx.restore(); });
    if (t > 0.6) { const m = e5Heen(t - 0.6, 1330, 1440, 60); muis(ctx, m.x, 708, 7, { houding: 'lopen', t: m.d / (3.6 * 7), kijk: m.kijk }); muis(ctx, 1560, 708, 7, { kijk: -1 }); }
    if (t > 1.0) ecoVos(ctx, 1460, 562, 1.1, { houding: 'staan', t }); },

  // ================= OPENING =================
  s01(ctx, t, q) { const D = e5Dur(arguments[3], 8), u = t / D; ctx.save(); const z = 1.08 - 0.06 * u; ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-960 + 60 - 120 * u, -540);
    e5Weiland(ctx, { slootY: 780 });
    e5KoeA(ctx, 520, 700, { houding: 'grazen', t }); e5KoeA(ctx, 1060, 640, { houding: t % 7 < 4 ? 'staan' : 'grazen', kijk: -1, t });
    const aM = q.on('muizen', 1, 0.3);
    if (aM > 0) { const t0 = q.at('muizen'); const m1 = e5Naar(t, t0, 1180, 1320, 140), m2 = e5Naar(t, t0 + 0.4, 1460, 1560, 100), m3 = e5Naar(t, t0 + 0.2, 1900, 1730, 140);
      muis(ctx, m1.x, 770, 6, { houding: m1.loopt ? 'draven' : 'staan', t: m1.d / (5.5 * 6) });
      ecoSpitsmuis(ctx, m2.x, 772, 6, { houding: m2.loopt ? 'rennen' : 'snuffelen', t: m2.loopt ? m2.d / (4.2 * 6) : t * 0.6 });
      muis(ctx, m3.x, 768, 6, { kijk: -1, houding: m3.loopt ? 'draven' : 'staan', t: m3.d / (5.5 * 6) }); }
    ctx.restore();
    naamBij(ctx, 'muizen en spitsmuizen', 'honderden per hectare', 1530, 680, q.on('honderden'), 'center'); if (aM > 0.5) ecoSchaal(ctx, 'muizen en spitsmuis 3× vergroot'); },
  s02(ctx, t, q) { const zu = e5S(t / 3.2), z = lerp(1.9, 1, zu); ctx.save(); ctx.translate(1560, 700); ctx.scale(z, z); ctx.translate(-1560, -700);
    e5Weiland(ctx, { horizon: 430, slootY: 820, bomen: true });
    [[300, 600], [420, 640], [760, 590], [1180, 620], [1300, 650]].forEach(([x, y], i) => koe7(ctx, x, y, 0.5 / 1.7, { houding: 'grazen', t: t + i }));
    ctx.strokeStyle = E5.sloot; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 700); ctx.lineTo(1920, 690); ctx.stroke();
    const v = e5Naar(t, 0, 1760, 1560, 0.9 * 40 * 1.3); ecoVos(ctx, v.x, 700, 0.9, { houding: v.loopt ? 'lopen' : 'staan', kijk: -1, t: v.d / (40 * 0.9) }); ctx.restore();
    const aV = q.on('één', 1, 0.6); ctx.save(); ctx.globalAlpha *= aV; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1560, 660, 70 + 8 * Math.sin(t * 2), 0, 6.283); ctx.stroke(); ctx.restore();
    naamBij(ctx, 'één vos', '100–400 hectare leefgebied', 1640, 470, q.on('hectare'), 'center', C.goud);
    vraagteken(ctx, 960, 330 + 6 * Math.sin(t * 2), q.on('Waarom'), 160); },

  // ================= H1 HET GRAS =================
  s04(ctx, t, q) { e5Weiland(ctx, { slootY: 820 });
    const uH = e5Tus(t, q.at('hectare'), q.at('hectare') + 2.2); e5HekP(ctx, uH); // hectare in perspectief: de achterkant ligt ± 100 m verder weg
    persoon(ctx, 'gerrit', 1260, 820, 180 * e5PX / 1.02, { uit: 'neutraal', pose: uH > 0 ? 'wijs' : 'staan', kijk: -1, t, a: q.on('veehouder', 1, 0.3) });
    const aB = q.on('gaat', 1, 0.8); e5BoekA(ctx, 1420, 150, 440, 300, 'één hectare · één jaar', [['erin', 0, C.goud, null, q.on('erin')], ['eruit', 0, C.koraal, null, q.on('eruit')]], { a: Math.min(1, aB * 2), open: aB });
    if (q.on('boek') > 0) { ctx.save(); ctx.globalAlpha *= q.on('boek') * (0.5 + 0.5 * Math.sin(t * 3)); roundRect(ctx, 1414, 144, 452, 312, 18); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'één hectare', '100 × 100 meter', 640, 700, q.on('bijhoudt'), 'center', C.goud); },
  s05(ctx, t, q) { e5Weiland(ctx, { slootY: 830 }); const aZ = q.on('zonlicht', 1, 0.8);
    if (aZ > 0) { ctx.save(); ctx.translate(260, 170); ctx.rotate(t * 0.08); ctx.translate(-260, -170); e5Zon(ctx, 260, 170, 60, aZ); ctx.restore(); }
    e5Band(ctx, 330, 230, 1000, 640, 150, { a: 0.35, kop: false, stroom: false, u: q.on('lichtenergie', 1, 1.5), t, v: 120 });
    e5Band(ctx, 340, 220, 980, 640, 6, { buig: 0.2, u: q.on('fotosynthese', 1, 1.5), t });
    const aK = q.on('deel', 1, 1); e5WarmteA(ctx, 1150, 620, 1.2, t, { a: 0.9 * aK }); e5WarmteA(ctx, 1350, 640, 1.0, t + 1, { a: 0.7 * aK });
    e5Band(ctx, 1020, 620, 1500, 300, 60, { kleur: C.goud, a: 0.25, stroom: false, buig: -0.3, u: aK, t, v: 120 });
    naamBij(ctx, 'zonlicht', 'per jaar enorm veel', 420, 330, q.on('enorm'), 'left', C.goud); naamBij(ctx, 'vastgelegd door het gras', '± 1–2 %', 980, 560, q.on('procent'), 'center', C.goud);
    naamBij(ctx, 'teruggekaatst en warmte', null, 1500, 250, aK, 'center', C.text2); },
  s06(ctx, t, q) { e5Bg(ctx); const uB = e5Tus(t, q.at('vastleggen') - 0.6, q.at('heet') + 0.4);
    e5BoekA(ctx, 360, 200, 1200, 560, 'het boek van de veehouder · één hectare · één jaar', [['BPP', uB, C.goud, uB > 0.9 ? 'alles wat het gras vastlegt' : null, 1], ['', 0, C.goud], ['', 0, C.goud]], { open: e5S(t / 0.8) });
    const { bx, bw, yy } = e5BoekBalk(360, 1200, 0, 200); if (uB > 0 && uB < 1) e5Band(ctx, bx + bw * uB + 40, 80, bx + bw * uB, yy + 4, 10, { u: 1, t, kop: true, a: Math.sin(Math.PI * uB) });
    naamBij(ctx, 'bruto primaire productie', 'BPP', 960, 860, q.on('bruto'), 'center', C.goud);
    const aK = q.on('Kort'); if (aK > 0) { ctx.save(); ctx.globalAlpha *= aK * (0.6 + 0.4 * Math.sin(t * 4)); roundRect(ctx, 380, yy - 10, 130, 56, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); } },
  // vraag-alinea: het gras, dag en nacht wisselen; de vraag zelf komt op de kaart
  s07(ctx, t, q) { e5Bg(ctx); const dag = (Math.sin(t * 0.7) + 1) / 2;
    roundRect(ctx, 560, 170, 800, 640, 20); shape(ctx, rgba(dag > 0.5 ? '#2E4466' : '#141E30', 0.9), C.line, 2); ctx.save(); ctx.globalAlpha *= dag; roundRect(ctx, 560, 170, 800, 640, 20); ctx.fillStyle = rgba('#3A5478', 0.6); ctx.fill(); ctx.restore();
    const an = Math.PI + t * 0.7; const sx = 960 + Math.cos(an) * 300, sy = 520 + Math.sin(an) * 260;
    ctx.save(); roundRect(ctx, 560, 170, 800, 640, 20); ctx.clip(); if (sy < 600) e5Zon(ctx, sx, sy, 38); const mx = 960 - Math.cos(an) * 300, my = 520 - Math.sin(an) * 260; if (my < 600) { circ(ctx, mx, my, 34, '#C8CED8'); circ(ctx, mx + 16, my - 10, 30, dag > 0.5 ? '#2E4466' : '#141E30'); } ctx.restore();
    ctx.save(); ctx.translate(960, 740); ctx.rotate(Math.sin(t * 1.4) * 0.03); grasPol(ctx, 0, 0, 3.4); ctx.restore();
    naamBij(ctx, 'glucose afbreken', 'dissimilatie', 960, 120, q.on('glucose'), 'center', C.koraal); vraagteken(ctx, 1220, 420, q.on('dissimilatie'), 120); },
  s09(ctx, t, q) { e5Bg(ctx); const aD = q.on('dissimileert', 1, 0.8), aF = q.on('fotosynthese', 1, 0.8), gr = q.on('groter', 1, 1);
    [[520, true, 1], [1400, false, q.on('nacht', 1, 0.8)]].forEach(([x, dag, ap]) => { if (ap <= 0.01) return; ctx.save(); ctx.globalAlpha *= ap;
      roundRect(ctx, x - 380, 170, 760, 640, 20); shape(ctx, rgba(dag ? '#2E4466' : '#141E30', 0.9), C.line, 2);
      ctx.save(); ctx.translate(x, 700); ctx.rotate(Math.sin(t * 1.3 + x) * 0.03); grasPol(ctx, 0, 0, 2.6); ctx.restore();
      e5WarmteA(ctx, x + 120, 560, 1, t, { a: aD }); e5PijlA(ctx, x + 40, 520, x + 200, 400, '#9AA3B2', 5, aD, t); if (aD > 0.5) text(ctx, 'CO₂', x + 225, 395, fTekst(36, 700), '#C8CED8', 'left');
      if (dag) { ctx.save(); ctx.translate(x - 250, 270); ctx.rotate(t * 0.1); ctx.translate(-(x - 250), -270); e5Zon(ctx, x - 250, 270, 40); ctx.restore(); e5PijlA(ctx, x - 200, 360, x - 50, 520, C.goud, 6 + 6 * gr, aF, t); naamBij(ctx, 'fotosynthese', 'alleen met licht', x - 210, 760, aF, 'center', C.goud); }
      else { circ(ctx, x - 250, 270, 36, '#C8CED8'); circ(ctx, x - 234, 260, 32, '#141E30'); }
      naamBij(ctx, 'dissimilatie', 'altijd', x + 200, 760, aD, 'center', C.koraal); metaText(ctx, dag ? 'DAG' : 'NACHT', x, 220, C.text2, 'center', 28); ctx.restore(); }); },
  s10(ctx, t, q) { e5Bg(ctx); const uR = e5Tus(t, q.at('deel'), q.at('helft') + 0.6), uN = e5Tus(t, q.at('overblijft') - 0.2, q.at('overblijft') + 1.4);
    e5BoekA(ctx, 360, 200, 1200, 560, 'het boek van de veehouder', [['BPP', 1, C.goud, 'vastgelegd', 1], ['R', 0.5 * uR, C.koraal, uR > 0.9 ? 'eigen dissimilatie · vaak ± de helft' : null, Math.min(1, uR * 3)], ['NPP', 0.5 * uN, C.groen, q.on('aangroei') > 0.5 ? 'aangroei = voedsel' : null, Math.min(1, uN * 3)]]);
    const b0 = e5BoekBalk(360, 1200, 0, 200), b1 = e5BoekBalk(360, 1200, 1, 200), b2 = e5BoekBalk(360, 1200, 2, 200);
    // de rechterhelft van de BPP-balk wordt koraal en zakt naar R; de groene rest schuift naar NPP
    if (uR > 0 && uR < 1) { ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * uR); roundRect(ctx, b0.bx + b0.bw * 0.5, lerp(b0.yy, b1.yy, uR), b0.bw * 0.5, 36, 8); ctx.fillStyle = C.koraal; ctx.fill(); ctx.restore(); }
    if (uN > 0 && uN < 1) { ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * uN); roundRect(ctx, b0.bx, lerp(b0.yy, b2.yy, uN), b0.bw * 0.5, 36, 8); ctx.fillStyle = C.groen; ctx.fill(); ctx.restore(); }
    e5WarmteA(ctx, 1620, 440, 0.9, t, { a: uR });
    naamBij(ctx, 'netto primaire productie', 'NPP = BPP − R', 960, 860, q.on('netto'), 'center', C.groen); },
  s11(ctx, t, q) { e5Weiland(ctx, { slootY: 860 }); const aV = q.on('vierkante'), uK = e5Tus(t, q.at('knipt'), q.at('vierkante') + 0.8);
    if (aV > 0 || uK > 0) { e5Proefvlak(ctx, 300, 790, 200, { geknipt: uK > 0.5 ? 1 : 0, a: Math.max(aV, uK) });
      if (uK < 1) { ctx.save(); ctx.globalAlpha *= 1 - uK; for (let i = 0; i < 6; i++) grasPol(ctx, 322 + i * 30 + (hash(i) - 0.5) * 8, 784 - (i % 3) * 18, 0.8); ctx.restore(); } }
    naamBij(ctx, '1 m²', 'proefvlak, geknipt', 400, 860, aV, 'center', C.goud);
    persoon(ctx, 'gerrit', 700, 820, 180 * e5PX / 1.02, { uit: 'neutraal', pose: 'vasthouden', kijk: 1, t, a: e5S(t / 0.3) });
    const aS = q.on('stoof', 1, 0.6); const uD = e5Tus(t, q.at('droogt'), q.at('verandert') + 0.3);
    if (aS > 0) { ctx.save(); ctx.globalAlpha *= aS; roundRect(ctx, 880, 300, 900, 520, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
      e5Stoof(ctx, 930, 360, 300, 300, { temp: '70 °C' });
      if (uD > 0 && uD < 1) for (let k = 0; k < 5; k++) { const p = e5Fr(t * 0.6 + k / 5); e5Druppel(ctx, 990 + k * 45, 560 - p * 140, 8, Math.sin(Math.PI * p) * 0.9); }
      const kg = lerp(1.2, 0.35, uD).toFixed(2).replace('.', ',') + ' kg';
      e5Weegschaal(ctx, 1460, 640, 300, { getal: kg, lading: (c, x, y) => grasHoop(c, x, y, lerp(1.1, 0.9, uD), uD > 0.5) });
      e5PijlA(ctx, 1250, 520, 1320, 520, C.line, 4, 1, t, { stip: false }); ctx.restore(); }
    naamBij(ctx, 'drooggewicht', 'tot het gewicht niet meer verandert', 1330, 740, q.on('drooggewicht'), 'center', C.groen);
    naamBij(ctx, 'biomassa', 'massa van de organische stof', 1330, 270, q.on('biomassa'), 'center', C.groen); },
  s12(ctx, t, q) { e5Bg(ctx); const aL = q.on('begin', 1, 0.6), uR = e5Tus(t, q.at('eind'), q.at('bijgegroeid') + 0.4);
    [[640, aL, 0.35, 'begin seizoen'], [1280, q.on('eind', 1, 0.6), lerp(0.35, 1, uR), 'eind seizoen']].forEach(([x, a, h, lab]) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
      e5Weegschaal(ctx, x, 720, 360, { getal: h < 0.5 ? 'weinig' : 'veel', lading: (c, xx, yy) => grasHoop(c, xx, yy, 1.2 + 1.6 * h, true) }); naamBij(ctx, lab, null, x, 800, 1, 'center'); ctx.restore(); });
    e5PijlA(ctx, 830, 520, 1080, 520, C.groen, 6, q.on('bijgegroeid', 1, 0.8), t);
    naamBij(ctx, 'aangroei', 'tot ± 14 ton droge stof per hectare per jaar', 960, 300, q.on('veertien'), 'center', C.groen); },
  s13(ctx, t, q) { e5Bg(ctx); const tw = q.at('twee', 2);
    const g = [q.on('moeras', 1, 1.2), q.on('regenwoud', 1, 1.2), e5Tus(t, tw + 0.3, tw + 1.3), e5Tus(t, tw + 0.8, tw + 1.8), e5Tus(t, tw + 1.3, tw + 2.3), q.on('oceaan', 1, 1.2), q.on('woestijn', 1, 1.2)];
    e5StaafA(ctx, 300, 760, 1340, 520, g, { a: e5S(t / 0.6) });
    const aM = q.on('mineralen'), xo = 300 + 1340 / 7 * 5.5; naamBij(ctx, 'te weinig mineralen', null, xo, 600, aM, 'center', C.text2);
    e5Druppel(ctx, xo - 50, 650 + 4 * Math.sin(t * 2), 14, q.on('water', 1, 0.6)); e5Korrel(ctx, xo + 50, 652, 14, aM); },
  s14(ctx, t, q) { e5Bg(ctx); const uL = q.on('hoger', 1, 1.2);
    e5StaafA(ctx, 300, 760, 1340, 520, [1, 1, 1, 1, 1, 1, 1], { licht: 4, dimU: uL });
    naamBij(ctx, 'het weiland', 'meer NPP = meer voedsel', 300 + 1340 / 7 * 4.5, 470, q.on('voedsel'), 'center', C.groen);
    const aT = q.on('weiland', 1, 1.2); if (aT > 0) { ctx.save(); ctx.globalAlpha *= aT * 0.9; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.restore(); } },

  // ================= H2 DE KOE =================
  s15(ctx, t, q) { e5Weiland(ctx, { slootY: 860 });
    e5KoeA(ctx, 860, 800, { houding: 'staan', t });
    for (let k = 0; k < 2; k++) e5Adem(ctx, 1110, 640, e5Fr(t * 0.35 + k * 0.5) * 1.6, 1);
    e5WarmteA(ctx, 780, 480, 1.4, t, { n: 4, a: q.on('warm', 1, 1) });
    persoon(ctx, 'gerrit', 1320, 820, 180 * e5PX / 1.02, { uit: 'blij', pose: q.on('warmte') > 0.5 ? 'wijs' : 'staan', kijk: -1, t, a: q.on('dampt', 1, 0.3) });
    naamBij(ctx, 'warmte uit dissimilatie', null, 780, 330, q.on('dissimilatie'), 'center', C.koraal); if (q.on('vriest') > 0.5) ecoSchaal(ctx, '−2 °C · vroeg in de ochtend'); },
  s16(ctx, t, q) { e5Bg(ctx); const aS = q.on('meetstal', 1, 0.8);
    e5Meetstal(ctx, 300, 240, 900, 520, { a: aS });
    const tR = q.at('rund') - 0.5, k = e5Naar(t, tR, -320, 760, E5KOE_V); if (isFinite(tR) && t > tR) e5KoeA(ctx, k.x, 740, { houding: k.loopt ? 'lopen' : 'staan', t: k.loopt ? k.d / (130 * E5KOE) : t });
    const aL = q.on('afgesloten', 1, 0.8); e5PijlA(ctx, 130, 310, 290, 310, '#C8CED8', 4, aL, t); e5PijlA(ctx, 1210, 310, 1380, 310, '#C8CED8', 4, aL, t + 0.3);
    const tV = q.at('voer'), tM = q.at('mest'), tG = q.at('gassen');
    if (t > tV) e5Meter(ctx, 1520, 260, 64, 0.8 * e5Tus(t, tV, tV + 2.5), C.oker, 'voer', { meta: 'erin' });
    if (t > tM) e5Meter(ctx, 1520, 480, 64, 0.35 * e5Tus(t, tM, tM + 2.5), C.oker, 'mest', { meta: 'eruit' });
    if (t > tG) e5Meter(ctx, 1520, 700, 64, 0.6 * e5Tus(t, tG, tG + 2.5), C.koraal, 'gassen en warmte', { meta: 'eruit' });
    naamBij(ctx, 'meetstal', 'afgesloten · lucht in en uit gemeten', 750, 200, aL, 'center'); },
  s17(ctx, t, q) { e5Bg(ctx); koe7(ctx, 1580, 500, 1.6 / 1.7, { houding: 'staan', kijk: -1, a: e5S(t / 0.3), t }); // vol getekend (geen doorzichtige figuren), iets kleiner, achter het schema
    e5SchemaA(ctx, 760, 220, 1, { opname: 200, feces: 60 }, { t, A: { opname: q.on('opname', 1, 1), feces: e5Tus(t, q.at('verteert'), q.at('feces') + 0.5) }, focus: 'feces', fa: q.on('mest') }); },
  s18(ctx, t, q) { e5Bg(ctx); const ud = e5Tus(t, q.at('dissimilatie'), q.at('dissimilatie') + 2);
    e5SchemaA(ctx, 760, 220, 1, { opname: 200, feces: 60, diss: 135, prod: 5 }, { t, A: { diss: ud, prod: q.on('productie', 1, 1.6) }, breed: { diss: lerp(0.2, 1, e5Tus(t, q.at('spieren'), q.at('warm') + 0.5)) }, focus: 'prod', fa: q.on('groei') }); },
  // vraag-alinea: de getallen komen in het schema; productie blijft open
  s19(ctx, t, q) { e5Bg(ctx);
    e5SchemaA(ctx, 760, 220, 1, { opname: 200, feces: 60, diss: 135, prod: 5 }, { t, getal: { opname: q.on('tweehonderd') > 0.5, feces: q.on('Zestig') > 0.5, diss: q.on('Honderdvijfendertig') > 0.5, prod: q.on('procent') > 0.3 ? '?' : null } });
    vraagteken(ctx, 1360, 780, q.on('procent'), 90); },
  s21(ctx, t, q) { e5Bg(ctx); const aV = q.on('vijf', 2, 0.6);
    e5SchemaA(ctx, 760, 220, 1, { opname: 200, feces: 60, diss: 135, prod: 5 }, { t, getal: { opname: true, feces: true, diss: true, prod: aV > 0.5 }, focus: 'prod', fa: aV, pct: '± 2,5 %', pa: q.on('tweeënhalf') });
    const f = ['200', ' − 60', ' − 135', ' = 5'], c = [e5S(t / 0.6), q.on('zestig'), q.on('honderdvijfendertig'), aV]; ctx.save(); ctx.font = fTekst(44, 700); let x = 960 - ctx.measureText(f.join('')).width / 2;
    f.forEach((s, i) => { if (c[i] > 0.01) { ctx.globalAlpha = c[i]; text(ctx, s, x, 870, fTekst(44, 700), i === 3 ? C.groen : C.text, 'left'); } ctx.font = fTekst(44, 700); x += ctx.measureText(s).width; }); ctx.restore(); },
  s22(ctx, t, q) { e5Bg(ctx); e5SchemaA(ctx, 520, 220, 0.75, { opname: 200, feces: 60, diss: 135, prod: 5 }, { t, namen: false, focus: 'prod', fa: 1 });
    regel(ctx, 'secundaire productie', 1500, 330, q.on('secundaire'), C.groen, 48, 'center', 700); regel(ctx, '= opname − feces − dissimilatie', 1500, 400, q.on('min', 1), C.text, 40, 'center', 500);
    const tD = q.at('dieren'), uB = e5Tus(t, q.at('biomassa') - 0.4, q.at('biomassa') + 1.6);
    for (let i = 0; i < 6; i++) { const a = e5Tus(t, tD + i * 0.25, tD + i * 0.25 + 0.4); if (a <= 0.01) continue; const x = 1240 + (i % 3) * 170, y = 600 + Math.floor(i / 3) * 130;
      koe7(ctx, x, y, 0.6 / 1.7, { houding: 'grazen', a, t: t + i });
      if (uB > 0 && uB < 1) { const p = e5S(uB * 1.3 - i * 0.05); ctx.save(); ctx.globalAlpha *= Math.sin(Math.PI * Math.min(1, p)); roundRect(ctx, lerp(x - 10, 1490, p), lerp(y - 70, 790, p), 20, 14, 4); ctx.fillStyle = C.groen; ctx.fill(); ctx.restore(); } }
    if (uB > 0.3) { ctx.save(); ctx.globalAlpha *= e5S((uB - 0.3) / 0.7); roundRect(ctx, 1440, 780, 120, 50, 10); shape(ctx, rgba(C.groen, 0.6), C.groen, 2); ctx.restore(); }
    metaText(ctx, 'per m² per jaar', 1500, 866, rgba(C.text2, q.on('vierkante')), 'center', 26); },

  // ================= H3 WAAR BLIJFT DE ENERGIE? =================
  s23(ctx, t, q) { e5Weiland(ctx, { horizon: 420, slootY: 900 });
    const aS = q.on('schimmels', 1, 1.5); if (aS > 0) { ctx.save(); ctx.strokeStyle = 'rgba(232,236,240,0.7)'; ctx.lineWidth = 1.5; for (let i = 0; i < 14; i++) { const x0 = 700 + i * 12, L = 60 * aS * (0.6 + hash(i)); ctx.beginPath(); ctx.moveTo(x0, 700); ctx.quadraticCurveTo(x0 + (hash(i * 3) - 0.5) * 60, 700 + L * 0.5, x0 + (hash(i * 5) - 0.5) * 90, 700 + L); ctx.stroke(); } ctx.restore(); }
    e5Vlaai(ctx, 760, 700, 2.6);
    const aE = q.on('energie', 1, 0.8); if (aE > 0) { ctx.save(); ctx.globalAlpha *= aE * (0.25 + 0.12 * Math.sin(t * 2.5)); ctx.beginPath(); ctx.ellipse(760, 660, 190, 60, 0, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore(); }
    const kA = e5Heen(t, 640, 760, 18), kB = e5Heen(t + 2, 900, 820, 14); if (q.on('Mestkevers', 1, 0.3) > 0) { e5KeverB(ctx, kA.x, 640 + (kA.x - 640) * -0.05, 1.5, kA.d / 14, kA.kijk); e5KeverB(ctx, kB.x, 690, 1.5, kB.d / 14, kB.kijk); }
    ecoRegenworm(ctx, 1040, 770, 16, { houding: 'zij', t: t * 0.5, vooruit: true, a: q.on('regenwormen', 1, 0.3) });
    naamBij(ctx, 'mestkevers', 'detrituseter · 2× vergroot', 600, 560, q.on('Mestkevers'), 'center'); naamBij(ctx, 'regenworm', 'detrituseter', 1180, 840, q.on('regenwormen'), 'center');
    naamBij(ctx, 'mest', 'nog vol energie', 760, 800, aE, 'center', C.oker); naamBij(ctx, 'schimmels en bacteriën', 'reducenten', 1500, 640, q.on('bacteriën'), 'center'); },
  // vraag-alinea: mest met energie, gras ernaast, een stippellijn met vraagteken
  s24(ctx, t, q) { e5Weiland(ctx, { horizon: 420, slootY: 900 }); e5Vlaai(ctx, 700, 720, 2.6);
    ctx.save(); ctx.globalAlpha *= q.on('energie', 1, 0.8) * (0.3 + 0.12 * Math.sin(t * 2.5)); ctx.beginPath(); ctx.ellipse(700, 680, 190, 60, 0, 0, 6.283); ctx.fillStyle = C.goud; ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(1280, 760); ctx.rotate(Math.sin(t * 1.2) * 0.03); grasPol(ctx, 0, 0, 3.2); ctx.restore();
    const aG = q.on('gras', 1, 1); if (aG > 0) { ctx.save(); ctx.globalAlpha *= aG; ctx.setLineDash([16, 14]); ctx.lineDashOffset = -t * 30; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(820, 640); ctx.quadraticCurveTo(1020, 420, 1220, 600); ctx.stroke(); ctx.restore(); vraagteken(ctx, 1020, 480, aG, 110); }
    naamBij(ctx, 'mest', null, 700, 800, q.on('mest'), 'center', C.oker); naamBij(ctx, 'gras', null, 1280, 820, aG, 'center', C.groen); },
  s26(ctx, t, q) { e5Bg(ctx); const cx = 960, cy = 520, R = 260;
    const aS = q.on('stoffen', 1, 1); ctx.strokeStyle = rgba(E5K.stof, 0.35 + 0.65 * aS); ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke();
    if (aS > 0) for (let i = 0; i < 10; i++) { const an = -1.5708 + (i / 10) * 6.283 + t * 0.35; circ(ctx, cx + Math.cos(an) * R, cy + Math.sin(an) * R, 9, rgba('#C8CED8', aS)); }
    for (const an of [0.3, 1.9, 3.5, 5.0]) { const x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; pijl(ctx, x, y, cx + Math.cos(an + 0.25) * R, cy + Math.sin(an + 0.25) * R, E5K.stof, 0.4 + 0.6 * aS, 8, 22); }
    const ap = { gras: q.on('gras'), koe: e5S(t / 0.6), mest: q.on('mest'), bodem: e5S(t / 0.6) };
    [['gras', -1.5708], ['koe', 0], ['mest', 1.5708], ['bodem', 3.1416]].forEach(([n, an]) => { const x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R; ctx.save(); ctx.globalAlpha *= Math.max(0.5, ap[n]); circ(ctx, x, y, 62, '#2A3A58', C.line, 2); text(ctx, n, x, y + 12, fTekst(36, 700), C.text, 'center'); ctx.restore(); });
    const aE = q.on('energie', 1, 1.2); e5Band(ctx, 420, 140, cx - 40, cy - R - 64, 22, { buig: 0.2, u: aE, t }); naamBij(ctx, 'zonlicht', null, 420, 120, aE, 'center', C.goud);
    const aW = q.on('warmte', 1, 1); for (const an of [-1.0, 0.6, 2.2]) e5WarmteA(ctx, cx + Math.cos(an) * (R + 90), cy + Math.sin(an) * (R + 90), 0.9, t + an, { hoek: an, a: aW });
    naamBij(ctx, 'stoffen gaan rond', null, cx, cy - 20, q.on('rond'), 'center', '#C8CED8'); metaText(ctx, 'CO₂ · water', cx, cy + 24, rgba(C.grain, q.on('koolstofdioxide')), 'center', 26); metaText(ctx, 'mineralen', cx, cy + 58, rgba(C.grain, q.on('mineralen')), 'center', 26);
    naamBij(ctx, 'warmte', 'verlaat het weiland', 1500, 270, q.on('bouwen'), 'center', C.koraal); },
  s27(ctx, t, q) { e5Bg(ctx); const aZ = q.on('zon', 1, 0.6);
    ctx.save(); ctx.translate(170, 330); ctx.rotate(t * 0.1); ctx.translate(-170, -330); e5Zon(ctx, 170, 330, 50 + 6 * q.on('zonlicht') * Math.sin(t * 3) ** 2, Math.max(0.4, aZ)); ctx.restore();
    const uB = e5Tus(t, q.at('stroomt'), q.at('buiten') + 0.4); e5Band(ctx, 250, 330, 1500, 330, 60, { kop: false, u: Math.max(uB, 0.02 * aZ), t, v: 90 });
    [['gras', 520, q.on('gras')], ['koe', 900, q.on('dieren')], ['bodemleven', 1280, q.on('dieren')]].forEach(([n, x, a]) => { roundRect(ctx, x - 110, 280, 220, 100, 16); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.save(); ctx.globalAlpha *= Math.max(0.35, a); roundRect(ctx, x - 110, 280, 220, 100, 16); shape(ctx, '#2A3A58', C.line, 2); text(ctx, n, x, 345, fTekst(36, 700), C.text, 'center'); ctx.restore(); e5WarmteA(ctx, x, 270, 0.9, t + x, { a: e5S(t / 0.8) }); });
    e5WarmteA(ctx, 1620, 330, 1.4, t, { hoek: 0, n: 4, a: Math.max(e5S(t / 0.8) * 0.6, uB) }); naamBij(ctx, 'warmte', 'naar buiten', 1700, 450, q.on('warmte'), 'center', C.koraal);
    ctx.strokeStyle = E5K.stof; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(900, 640, 520, 110, 0, 0, 6.283); ctx.stroke();
    for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 - t * 0.4; circ(ctx, 900 + Math.cos(an) * 520, 640 + Math.sin(an) * 110, 8, '#C8CED8'); }
    naamBij(ctx, 'energie stroomt', 'één kant op', 900, 150, q.on('stroomt'), 'center', C.goud); naamBij(ctx, 'stoffen gaan rond', null, 900, 655, q.on('rond'), 'center', '#C8CED8'); },
  s28(ctx, t, q) { e5Bg(ctx); const aG = q.on('gras', 1, 0.6), aK = q.on('koe', 1, 0.6), aM = q.on('mens', 1, 0.3);
    if (aG > 0) { ctx.save(); ctx.globalAlpha *= aG; ctx.translate(300, 640); ctx.rotate(Math.sin(t * 1.2) * 0.03); grasPol(ctx, 0, 0, 2.4); ctx.restore(); }
    koe7(ctx, 900, 640, 1.875 / 1.7, { houding: t % 6 < 3.5 ? 'staan' : 'grazen', a: aK, t }); persoon(ctx, 'noor', 1640, 640, 300, { uit: 'neutraal', a: aM, t });
    e5Band(ctx, 400, 560, 640, 560, 14, { u: q.on('koe', 1, 1), t }); e5Band(ctx, 1170, 500, 1540, 500, 14, { u: q.on('mens', 1, 1), t });
    [['producent', 'trofisch niveau 1', 300, 'producent'], ['consument 1e orde', 'niveau 2', 900, 'eerste'], ['consument 2e orde', 'niveau 3', 1640, 'tweede']].forEach(([a, b, x, w]) => naamBij(ctx, a, b, x, 760, q.on(w), 'center'));
    naamBij(ctx, 'van gegeten naar eter', 'richting van de energie', 960, 230, q.on('volgen'), 'center', C.goud); },

  // ================= H4 VAN NIVEAU NAAR NIVEAU =================
  s29(ctx, t, q) { e5Bg(ctx); const B = [[760, 'producenten'], [520, 'planteneters'], [300, 'roofdieren'], [140, 'toproofdieren']];
    const aW = q.on('gedissimileerd', 1, 1), aT = q.on('tien', 1, 1);
    B.forEach(([b, n], i) => { const g = e5S((t - i * 0.6) / 0.8); if (g <= 0.01) return; const y = 780 - i * 150, bw = b * (0.4 + 0.6 * g); ctx.save(); ctx.globalAlpha *= g;
      roundRect(ctx, 760 - bw / 2, y - 90, bw, 90, 12); shape(ctx, rgba(C.goud, 0.18 + 0.1 * (3 - i)), C.goud, 2); text(ctx, n, 760, y - 32, fTekst(36, 700), C.text, 'center'); ctx.restore();
      e5WarmteA(ctx, 760 + b / 2 + 60, y - 40, 0.8, t + i, { hoek: 0, a: aW }); if (i < 3) e5Band(ctx, 760, y - 92, 760, y - 150 + 4, Math.max(5, b / 40), { u: aT, t }); });
    naamBij(ctx, '± 10 % gaat door', 'per niveau, gemiddeld', 1280, 360, aT, 'left', C.goud); naamBij(ctx, 'de rest: warmte,', null, 1280, 540, q.on('deel'), 'left', C.koraal); naamBij(ctx, 'feces, niet gegeten', null, 1280, 590, q.on('deel'), 'left', C.koraal); },
  s30(ctx, t, q) { e5Bg(ctx); const V = [['planten', '1.000.000 kJ', 1100, q.on('miljoen', 1, 1.2)], ['planteneters', '100.000 kJ', 110, q.on('honderdduizend', 1, 1)], ['roofdieren', '10.000 kJ', 11, q.on('tienduizend', 1, 1)], ['toproofdieren', '1000 kJ', 1.1, q.on('duizend', 3, 1)]];
    V.forEach(([n, v, b, u], i) => { if (u <= 0.01) return; const y = 260 + i * 150, bw = Math.max(6, b * u); ctx.save(); ctx.globalAlpha *= Math.min(1, u * 2); text(ctx, n, 560, y + 48, fTekst(40, 700), C.text, 'right'); roundRect(ctx, 600, y, bw, 70, 8); shape(ctx, rgba(C.goud, 0.7), C.goud, 2);
      if (b > 600) { if (u > 0.6) text(ctx, v, 630, y + 50, fTekst(38, 700), C.bgSchema, 'left'); } else text(ctx, v, 630 + Math.max(6, b), y + 50, fTekst(38, 600), C.goud, 'left'); ctx.restore(); });
    metaText(ctx, 'per jaar · per gebied · elk niveau ± 10 % van het vorige', 600, 880, rgba(C.text2, q.on('roofdieren', 1)), 'left', 26); },
  s31(ctx, t, q) { e5Bg(ctx); const uP = e5Tus(t, q.at('elkaar') - 0.5, q.at('energie', 2) + 0.3);
    // de vier balken uit de vorige scène schuiven tot een piramide van energie
    [440, 120, 36, 12].forEach((b, i) => { const x0 = 600, y0 = 260 + i * 150, w0 = [1100, 110, 11, 1.1][i], x1 = 1540 - b / 2, y1 = 760 - (i + 1) * 100 + 4;
      const x = lerp(x0, x1, uP), y = lerp(y0, y1, uP), w = Math.max(6, lerp(w0, b, uP)), h = lerp(70, 92, uP); roundRect(ctx, x, y, w, h, 8); shape(ctx, rgba(C.goud, lerp(0.7, 0.55, uP)), C.goud, 2); });
    metaText(ctx, 'energie', 1540, 804, rgba(C.grain, uP), 'center', 26);
    const aA = q.on('aantallen', 1, 1), aB = q.on('biomassa', 1, 1);
    e5PiramideA(ctx, 380, 760, [[440, C.groen, null], [300, C.oker, null], [140, C.koraal, null]], { h: 100, titel: 'aantallen', ta: aA, g: [aA * 2, aA * 2 - 0.5, aA * 2 - 1] });
    e5PiramideA(ctx, 960, 760, [[440, C.groen, null], [240, C.oker, null], [80, C.koraal, null]], { h: 100, titel: 'biomassa', ta: aB, g: [aB * 2, aB * 2 - 0.5, aB * 2 - 1] });
    naamBij(ctx, 'individuen per niveau', null, 380, 360, q.on('individuen'), 'center'); naamBij(ctx, 'droge massa · één moment', null, 960, 360, q.on('droge'), 'center'); naamBij(ctx, 'energie per jaar', null, 1540, 360, uP, 'center', C.goud); },
  s32(ctx, t, q) { e5Weiland(ctx, { horizon: 520, slootY: 900, bomen: false });
    const aW = q.on('wilg', 1, 0.8); ctx.save(); ctx.globalAlpha *= Math.max(aW, e5S(t / 0.8)); e5Knotwilg(ctx, 230, 880, 300); ctx.restore(); naamBij(ctx, 'knotwilg', 'aan de slootkant', 300, 820, q.on('slootkant'), 'left');
    const aZ = q.on('bladluizen', 1, 0.8), nL = Math.floor(26 * e5Tus(t, q.at('duizenden') - 0.3, q.at('duizenden') + 1.5)), aH = q.on('lieveheersbeestjes', 1, 0.8);
    zoomCircle(ctx, 720, 400, 200, 330, 470, 'twijg · ± 20× vergroot', aZ, () => { ctx.fillStyle = '#2E4466'; ctx.fillRect(500, 180, 440, 440); ctx.strokeStyle = '#8A7A4E'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(520, 560); ctx.lineTo(920, 260); ctx.stroke();
      for (let i = 0; i < nL; i++) { const u = 0.08 + i * 0.033, px = lerp(520, 920, u) + (hash(i) - 0.5) * 18, py = lerp(560, 260, u) + (hash(i * 3) - 0.5) * 18 - 8; e5Bladluis(ctx, px, py + Math.sin(t * 3 + i) * 0.8, 6, -0.64); }
      if (aH > 0) { const u1 = lerp(0.0, 0.3, aH), u2 = lerp(1.0, 0.75, aH); lhb(ctx, lerp(520, 920, u1) - 10, lerp(560, 260, u1) - 20, 0.32, { rot: 0.9, stippen: 7, a: aH }); lhb(ctx, lerp(520, 920, u2) - 10, lerp(560, 260, u2) - 20, 0.32, { rot: 0.9, stippen: 7, a: aH }); } });
    const aP = q.on('kop', 1, 0.8); if (aP > 0) { ctx.save(); ctx.globalAlpha *= aP; roundRect(ctx, 1080, 170, 780, 640, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
      e5PiramideA(ctx, 1330, 760, [[60, C.groen, '1 wilg'], [420, C.oker, 'bladluizen'], [110, C.koraal, 'lieveheersbeestjes']], { h: 140, g: [Math.max(aP, aW), aZ, aH] });
      metaText(ctx, 'piramide van aantallen', 1470, 230, C.grain, 'center', 26); ctx.restore(); }
    naamBij(ctx, 'bladluizen', 'duizenden', 720, 160, q.on('duizenden'), 'center'); },
  // vraag-alinea: drie kleine piramides; de vraag komt op de kaart
  s33(ctx, t, q) { e5Bg(ctx); const P = [['energie', C.goud, [440, 200, 80]], ['aantallen', C.oker, [440, 260, 120]], ['biomassa', C.groen, [440, 240, 90]]];
    P.forEach(([n, kl, L], i) => { const a = e5S((t - i * 0.4) / 0.6), x = 420 + i * 540; if (a <= 0.01) return; ctx.save(); ctx.translate(x, 700); ctx.rotate(Math.sin(t * 1.1 + i * 2) * 0.03); ctx.translate(-x, -700);
      e5PiramideA(ctx, x, 700, L.map(b => [b, kl, null]), { h: 100, a, titel: n }); ctx.restore(); });
    vraagteken(ctx, 960, 260, q.on('kop'), 140); },
  s35(ctx, t, q) { e5Bg(ctx); const uL = e5Tus(t, 0.2, q.at('kwijt') + 0.3), aW = q.on('kwijt', 1, 1);
    const L = [[900, C.goud, null], [460, C.goud, null], [200, C.goud, null], [70, C.goud, null]];
    e5PiramideA(ctx, 960, 820, L, { h: 130, labels: false, g: L.map((_, i) => uL * 4 - i) });
    [[450], [230], [100], [35]].forEach(([b], i) => e5WarmteA(ctx, 960 + b + 70, 820 - i * 130 - 60, 0.9, t + i, { hoek: 0, a: aW }));
    haak(ctx, 510, 1410, 834, 'altijd smaller naar boven', C.groen, q.on('Altijd')); },
  s36(ctx, t, q) { e5Weiland(ctx, { horizon: 460, slootY: 830 });
    ecoKonijn(ctx, 300, 790, 2.2, { houding: 'zitten', t, a: q.on('konijnen', 1, 0.4) }); muis(ctx, 480, 800, 4, { a: q.on('muizen', 1, 0.4), t });
    const v = e5Naar(t, 0.2, 520, 820, 2.2 * 40 * 1.3); ecoVos(ctx, v.x, 790, 2.2, { houding: v.loopt ? 'lopen' : 'staan', t: v.loopt ? v.d / (40 * 2.2) : t, kijk: v.loopt || q.on('muizen') < 0.5 ? 1 : -1 });
    const aP = q.on('energie', 1, 0.8); if (aP > 0) { ctx.save(); ctx.globalAlpha *= aP; roundRect(ctx, 1240, 170, 560, 560, 20); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2);
      const kr = e5Tus(t, q.at('klein'), q.at('klein') + 1.5), tE = q.at('energie'); e5PiramideA(ctx, 1520, 680, [[460, C.groen, null], [200, C.oker, null], [lerp(140, 40, kr), C.koraal, null]], { h: 130, labels: false, g: [1, (t - tE) / 0.8, (t - tE - 0.4) / 0.8] });
      const aN = q.on('niveaus', 1, 1); if (aN > 0) { ctx.setLineDash([10, 10]); ctx.strokeStyle = rgba(C.koraal, 0.6 * aN); ctx.lineWidth = 2; roundRect(ctx, 1520 - 8, 680 - 4 * 130 + 34, 16, 92, 6); ctx.stroke(); ctx.setLineDash([]); }
      metaText(ctx, 'piramide van energie', 1520, 716, C.grain, 'center', 26); ctx.restore(); }
    naamBij(ctx, 'vos', '± 1 % van de NPP', 1480, 340, q.on('procent'), 'right', C.koraal); },

  // ================= H5 WARM OF KOUD =================
  s37(ctx, t, q) { e5Weiland(ctx, { horizon: 300, slootY: 960, bomen: false }); const v = 4.2 * 40 * 2.2;
    // scharrelen: rennen, snuffelen; bij 'eten' naar de regenworm
    const tE = q.at('eten'); let x, h, ph;
    const a1 = e5Naar(t, 0, 520, 900, v); if (!a1.klaar) { x = a1.x; h = 'rennen'; ph = a1.d / (4.2 * 40); }
    else if (!isFinite(tE) || t < tE - 1.2) { x = 900; h = 'snuffelen'; ph = t * 0.6; }
    else { const a2 = e5Naar(t, tE - 1.2, 900, 1290, v); x = a2.x; h = a2.loopt ? 'rennen' : 'snuffelen'; ph = a2.loopt ? a2.d / (4.2 * 40) : t * 0.8; }
    ecoSpitsmuis(ctx, x, 760, 40, { houding: h, t: ph }); ecoRegenworm(ctx, 1420, 800, 22, { houding: 'zij', t: t * 0.4 });
    const aG = q.on('achtenvijftig', 1, 1.2), aV = q.on('verwacht', 1, 1);
    metaText(ctx, 'ENERGIE PER DAG · ± 8 GRAM', 120, 180, rgba(C.grain, Math.max(aG, aV)), 'left', 26);
    if (aV > 0) { ctx.save(); ctx.globalAlpha *= Math.min(1, aV * 2); roundRect(ctx, 120, 210, 260 * aV, 50, 10); shape(ctx, rgba(C.koraal, 0.35), C.line, 2); text(ctx, 'verwacht', 400, 246, fTekst(36, 600), C.text, 'left'); ctx.restore(); }
    if (aG > 0) { ctx.save(); ctx.globalAlpha *= Math.min(1, aG * 2); roundRect(ctx, 120, 280, 610 * aG, 50, 10); shape(ctx, rgba(C.koraal, 0.85), C.koraal, 2); text(ctx, 'gemeten: ± 58 kJ', 750, 316, fTekst(36, 700), C.text, 'left'); ctx.restore(); }
    metaText(ctx, '2–2,5× ZO VEEL · OCHOCIŃSKA & TAYLOR 2005', 120, 372, rgba(C.text2, q.on('tweeënhalf')), 'left', 26);
    naamBij(ctx, 'bosspitsmuis', '± 8 gram · vergroot', 900, 470, q.on('bosspitsmuis'), 'center'); },
  s38(ctx, t, q) { e5Bg(ctx); const a1 = q.on('bakje', 1, 0.6), a2 = q.on('andere', 1, 0.6), a3 = q.on('derde', 1, 0.6), aT = q.on('twintig', 1, 0.6);
    const bak = (x, a, lab, la) => { if (a <= 0.01) return; e5Bakje(ctx, x, 680, 540, 380, { a, temp: aT > 0.5 ? '20 °C' : '', label: la > 0.5 ? lab : null }); };
    bak(110, a1, 'spitsmuis', q.on('spitsmuis')); bak(690, a2, 'zandhagedis', q.on('zandhagedis')); bak(1270, a3, 'alleen voer', a3);
    const aV = q.on('voedsel', 1, 0.6); if (a1 > 0.5) e5Hoopje(ctx, 200, 658, 50, C.oker, Math.max(aV, a3)); if (a2 > 0.5) e5Hoopje(ctx, 780, 658, 50, C.oker, Math.max(aV, a3)); if (a3 > 0.5) e5Hoopje(ctx, 1460, 658, 50);
    const aS = q.on('spitsmuis', 1, 0.3); if (aS > 0) { const m = e5Heen(t, 470, 330, 60); ecoSpitsmuis(ctx, m.x, 656, 24, { houding: 'rennen', t: m.d / (4.2 * 24), kijk: m.kijk, a: aS }); }
    hagedis(ctx, 980, 654, 0.95, { houding: 'staan', t, a: q.on('zandhagedis', 1, 0.3) });
    naamBij(ctx, 'controle', 'voer droogt vanzelf uit', 1490, 520, q.on('controle'), 'center', C.groen);
    metaText(ctx, 'ONAFHANKELIJK: SOORT DIER · AFHANKELIJK: VOER DAT VERDWIJNT', 960, 830, rgba(C.grain, q.on('meet')), 'center', 26); metaText(ctx, 'CONSTANT: 20 °C · ZELFDE GEWICHT', 960, 874, rgba(C.grain, aT), 'center', 26); },
  // vraag-alinea: twee bakjes met evenveel voer; de vraag komt op de kaart
  s39(ctx, t, q) { e5Bg(ctx); e5Bakje(ctx, 160, 700, 760, 420, { label: 'spitsmuis' }); e5Hoopje(ctx, 270, 678, 56);
    const m = e5Heen(t, 760, 470, 80); ecoSpitsmuis(ctx, m.x, 676, 30, { houding: 'rennen', t: m.d / (4.2 * 30), kijk: m.kijk });
    e5Bakje(ctx, 1000, 700, 760, 420, { label: 'zandhagedis' }); hagedis(ctx, 1380, 674, 1.2, { houding: 'staan', t }); e5Hoopje(ctx, 1110, 678, 56);
    vraagteken(ctx, 960, 200, q.on('gram'), 130); },
  s41(ctx, t, q) { e5Bg(ctx); const uE = e5Tus(t, 0.3, q.at('hagedis') + 0.8);
    e5Bakje(ctx, 160, 700, 760, 420, { label: q.on('endotherm') > 0.5 ? 'spitsmuis · endotherm' : 'spitsmuis' }); e5Hoopje(ctx, 270, 678, lerp(56, 12, uE), C.oker, lerp(1, 0.7, uE));
    ecoSpitsmuis(ctx, 560, 676, 30, { houding: 'snuffelen', t: t * 0.8 }); const aW = q.on('warm', 1, 1), aH = q.on('huid', 1, 1);
    e5WarmteA(ctx, 600, 500, 1.3, t, { n: 4, a: aW }); for (const [dx, an] of [[-120, -2.2], [140, -0.9]]) e5WarmteA(ctx, 560 + dx, 640, 0.8, t + dx, { hoek: an, a: aH });
    e5Bakje(ctx, 1000, 700, 760, 420, { label: q.on('ectotherm') > 0.5 ? 'zandhagedis · ectotherm' : 'zandhagedis' }); hagedis(ctx, 1380, 674, 1.2, { houding: 'staan', t }); e5Hoopje(ctx, 1110, 678, lerp(56, 52, uE));
    naamBij(ctx, 'bijna op', null, 270, 600, e5S((uE - 0.7) / 0.3), 'center', C.oker); naamBij(ctx, 'bijna alles over', null, 1150, 580, e5S((uE - 0.7) / 0.3), 'center', C.oker);
    naamBij(ctx, '< 1/10 van de energie', 'van een zoogdier van zijn gewicht', 1300, 180, q.on('tiende'), 'center', C.text); naamBij(ctx, 'warm houden', null, 600, 300, aW, 'center', C.koraal); },
  s42(ctx, t, q) { e5Bg(ctx); const aL = e5S(t / 0.8), aR = q.on('koudbloedig', 1, 1);
    e5SchemaA(ctx, 352, 320, 0.8, { opname: 100, feces: 30, diss: 68, prod: 2 }, { t, namen: false, a: aL, A: { diss: q.on('dissimilatie', 1, 1.4), prod: q.on('productie', 1, 1.4) }, pct: 'een paar %', pa: q.on('paar') });
    regel(ctx, 'warmbloedig', 496, 260, q.on('warmbloedig'), C.text, 48, 'center', 700);
    e5SchemaA(ctx, 1312, 320, 0.8, { opname: 100, feces: 30, diss: 40, prod: 30 }, { t, namen: false, a: aR, A: { opname: aR, feces: aR, diss: aR, prod: q.on('tientallen', 1, 1.4) }, pct: 'tientallen %', pa: q.on('tientallen') });
    regel(ctx, 'koudbloedig (insect)', 1456, 260, aR, C.text, 48, 'center', 700); },
  s43(ctx, t, q) { e5Bg(ctx); const tI = q.at('Insecten'), tR = q.at('groei', 2) - 0.2;
    const zak = (x0, y0, k, t0) => { const p = e5Tus(t, t0 + k * 0.22, t0 + k * 0.22 + 0.5); if (p <= 0.01) return; e5Zak(ctx, x0, lerp(y0 - 260, y0, p), 1.2, Math.min(1, p * 3)); };
    const nI = isFinite(tI) ? Math.min(2, Math.max(0, (t - tI) / 0.22)) : 0, nR = isFinite(tR) ? Math.min(8, Math.max(0, (t - tR) / 0.22)) : 0;
    e5Weegschaal(ctx, 560, 760 + 3 * Math.min(1, nI / 2), 440, { a: e5S(t / 0.6), lading: (c, x, y) => { for (let k = 0; k < 2; k++) zak(x - 40 + k * 80, y, k, tI); } });
    naamBij(ctx, '2 kg voer', '→ 1 kg insecten', 560, 840, q.on('twee'), 'center');
    e5Weegschaal(ctx, 1360, 760 + 4 * Math.min(1, nR / 8), 600, { a: e5S(t / 0.6), lading: (c, x, y) => { for (let i = 0; i < 8; i++) zak(x - 210 + (i % 4) * 140, y - Math.floor(i / 4) * 70, i, tR); } });
    naamBij(ctx, '8 kg voer', '→ 1 kg rund', 1360, 840, q.on('acht'), 'center');
    naamBij(ctx, 'voedselconversie', 'kg voer per kg groei', 960, 230, q.on('voedselconversie'), 'center', C.goud);
    const aD = e5S(t / 0.8); for (let i = 0; i < 7; i++) e5Meelworm(ctx, 500 + (i % 4) * 34 + Math.sin(t * 2 + i) * 3, 470 + Math.floor(i / 4) * 16, 1.2, aD, (hash(i) - 0.5) * 0.6);
    metaText(ctx, 'koudbloedig: meelwormen', 560, 430, rgba(C.text2, aD), 'center', 24); koe7(ctx, 1360, 520, 0.55 / 1.7, { houding: 'grazen', t, a: aD }); metaText(ctx, 'warmbloedig: rund', 1360, 430, rgba(C.text2, aD), 'center', 24); },
  s44(ctx, t, q) { e5Bg(ctx); const vloer = 860, tafel = 640, aP = e5S(t / 0.3);
    persoon(ctx, 'rachid', 260, vloer, 500, { pose: 'zit', stoel: true, tafel, uit: 'neutraal', t, a: aP }); persoon(ctx, 'noor', 520, vloer, 470, { pose: 'zit', stoel: true, tafel, uit: 'blij', t, a: aP }); persoon(ctx, 'kind', 760, vloer, 330, { pose: 'zit', stoel: true, tafel, uit: 'blij', t, a: aP });
    ctx.fillStyle = '#7A5E44'; ctx.fillRect(120, tafel, 780, 20); ctx.fillStyle = '#8A6E52'; ctx.fillRect(120, tafel, 780, 6); ctx.fillStyle = '#5E4834'; ctx.fillRect(150, tafel + 20, 18, vloer - tafel - 20); ctx.fillRect(852, tafel + 20, 18, vloer - tafel - 20);
    e5Bord(ctx, 520, tafel - 4, 0.3); e5Bord(ctx, 290, tafel - 4, 0.3); e5Bord(ctx, 760, tafel - 4, 0.24);
    const aG = q.on('voer', 1, 0.8), uK = e5Tus(t, q.at('voer') + 0.3, q.at('procent') + 0.3);
    e5GrasStapel(ctx, 1480, 760, 1.4, aG);
    e5Band(ctx, 1290, 700, 806, 632, lerp(70, 8, uK), { buig: 0, u: aG, t, a: aG });
    naamBij(ctx, 'het voer dat de koe at', null, 1480, 470, aG, 'center', C.groen); naamBij(ctx, '± 3 % in het vlees', 'bord ± 25 cm', 1000, 540, q.on('procent'), 'center', C.goud);
    const aA = q.on('akker', 1, 1); if (aA > 0) { ctx.save(); ctx.globalAlpha *= aA; metaText(ctx, 'graan of bonen: één trofisch niveau minder', 1480, 822, C.text2, 'center', 26);
      for (let i = 0; i < 5; i++) { const x = 1680 + i * 46, sw = Math.sin(t * 1.5 + i) * 3; ctx.strokeStyle = '#D8C27A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 790); ctx.quadraticCurveTo(x + sw, 760, x + sw * 2, 735); ctx.stroke(); ctx.fillStyle = '#E2C870'; ctx.beginPath(); ctx.ellipse(x + sw * 2, 724, 5, 13, sw * 0.03, 0, 6.283); ctx.fill(); }
      ctx.restore(); } },

  // ================= SAMENVATTING =================
  s45(ctx, t, q) { e5Bg(ctx); const aS = e5S(t / 0.8);
    e5SchemaA(ctx, 360, 260, 0.82, { opname: 200, feces: 60, diss: 135, prod: 5 }, { t, namen: false, a: aS, A: { opname: aS, feces: q.on('gras', 1, 1.5), diss: q.on('dieren', 1, 1.5), prod: q.on('dieren', 1, 1.5) } });
    e5WarmteA(ctx, 680, 720, 1.0, t, { n: 4, a: q.on('warmte', 1, 1) });
    const aR = q.on('Stoffen', 1, 0.8); if (aR > 0) { ctx.save(); ctx.globalAlpha *= aR; ctx.strokeStyle = E5K.stof; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(520, 800, 180, 34, 0, 0, 6.283); ctx.stroke(); for (let i = 0; i < 6; i++) { const an = i / 6 * 6.283 + t * 0.6; circ(ctx, 520 + Math.cos(an) * 180, 800 + Math.sin(an) * 34, 6, '#C8CED8'); } ctx.restore(); }
    const tS = q.at('stap'); e5PiramideA(ctx, 1460, 760, [[560, C.groen, null], [260, C.oker, null], [60, C.koraal, null]], { h: 140, labels: false, g: [(t - tS) / 0.8, (t - tS - 0.8) / 0.8, (t - q.at('tien')) / 0.8] });
    ecoVos(ctx, 1460, 340, 0.6, { houding: 'staan', t, a: q.on('roofdieren', 1, 0.4) });
    naamBij(ctx, 'te weinig energie over', null, 1460, 250, q.on('weinig', 2), 'center', C.koraal); },
});
