// Wat word jij? · Medische beeldvorming 2 · Bestraling — scènes per alinea (v1.0, 24 okt 2026). Look: Schema en Micro, met cast (Opa Henk, Oma Ria, Dr. Kim).
// Rode draad: Opa Henk krijgt twintig bestralingen voor prostaatkanker.

function fase(t, q, w, n = 1, d = 0.6) { return q.on(w, n, d); }

Object.assign(SCENES, {
  title(ctx, t) { bundel(ctx, 1500, 120, 1500, 560, 140, 0.8, t); dnaHelix(ctx, 900, 1860, 560, 70, t, { breuken: [{ x: 1500, s: 2, sep: 30 + 10 * Math.sin(t) }] }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); wachtkamer(ctx, 1);
    persoon(ctx, 'ria', 400, 880, 440, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'henk', 560, 880, 470, { t, kijk: -1, uit: t > q.at('fronst', 1) ? 'bezorgd' : 'neutraal' }); handInHand(ctx, 482, 680, 1);
    naamBij(ctx, 'Oma Ria', '', 380, 400, 1, 'center'); naamBij(ctx, 'Opa Henk', 'prostaatkanker', 600, 360, q.on('Henk', 1), 'center');
    persoon(ctx, 'kim', 1660, 880, 480, { t, kijk: 1, pose: q.on('bestraling', 1) > 0.5 ? 'wijs' : 'staan', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'radiotherapeut', 1660, 340, q.on('radiotherapeut', 1), 'center');
    kalender20(ctx, 860, 370, q.on('twintig', 1), 0, 44); metaA(ctx, 'ELKE WERKDAG · EEN PAAR MINUTEN', 1000, 270, q.on('werkdag', 1), C.grain, 'center', 22);
    vraagteken(ctx, 760, 330, q.on('DNA', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'Antwoord b: kankercellen herstellen slechter');
    const G = q.on('gray', 1, 0.8), E = q.on('elektronen', 1, 1.2), R = q.on('reactieve', 1, 1.5), B1 = q.on('breken', 1, 0.5), Z = q.on('zelf', 1);
    // links: cel in de bundel; later de getallen per gray
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; bundel(ctx, 0, 260, 330, 560, 120, 0.9, t); mcel(ctx, 330, 560, 180, t, { chrom: [[-0.2, -0.1, 0.4], [0.2, 0.1, -0.5]] }); naamBij(ctx, 'ioniserende straling', '', 140, 250, q.on('ioniserende', 1)); ctx.restore(); }
    if (G > 0.01) { metaA(ctx, '1 GRAY = 1 JOULE PER KILOGRAM', 140, 300, G, C.grain, 'left', 26);
      chip(ctx, '± 1000 enkelstrengsbreuken', 380, 420, M2.s0, q.on('duizend', 1), 30); chip(ctx, '± 40 dubbelstrengsbreuken', 380, 520, M2.breuk, q.on('veertig', 1), 30); metaA(ctx, 'PER CEL, PER GRAY', 380, 600, q.on('veertig', 1), C.text2, 'center', 22); }
    // rechts: water, elektron, reactief deeltje
    const wx = 900, wy = 330; if (R < 0.99) h2o(ctx, wx, wy, 1.1, 1 - R); naamBij(ctx, 'water', '', wx - 50, wy - 70, 1 - R);
    if (E > 0.01 && E < 0.99 || (E >= 0.99 && R < 0.5)) elektron(ctx, wx + 260 * ease(E), wy - 120 * ease(E), 1 - R);
    if (R > 0.01) { const f = ease(clamp((t - q.at('breken', 1) + 1.2) / 1.4, 0, 1)); radicaal(ctx, wx + (1080 - wx) * f, wy + (560 - wy) * f, 1.0, (1 - B1 * 0.8) * (1 - G), t); naamBij(ctx, 'reactief deeltje', '', wx + 60, wy + 120, R * (1 - B1)); }
    // DNA met breuken
    const S1 = q.on('enkelstrengsbreuk', 1), HE = clamp((t - q.at('herstellen', 1)) / 3, 0, 1), D2 = q.on('dubbelstrengsbreuk', 1), SEP = clamp((t - q.at('stukken', 1) + 1) / 2, 0, 1);
    const br = [{ x: 1080, s: 0, a: B1, herstel: HE }]; if (D2 > 0.01) br.push({ x: 1520, s: 2, a: D2, sep: 70 * ease(SEP) });
    dnaHelix(ctx, 720, 1820, 640, 60, t, { breuken: br });
    if (Z > 0.01 && D2 < 0.5) bundel(ctx, 1520, 300, 1520, 600, 60, Z * 0.8, t);
    naamBij(ctx, 'enkelstrengsbreuk', '', 1080, 800, S1 * (1 - D2 * 0.5), 'center'); chip(ctx, 'andere streng als voorbeeld', 1080, 470, C.groen, q.on('voorbeeld', 1) * (1 - D2), 26);
    naamBij(ctx, 'dubbelstrengsbreuk', '', 1560, 800, D2, 'center'); chip(ctx, 'lastig te repareren', 1520, 480, M2.breuk, q.on('lastiger', 1), 26); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'micro'); const M = q.on('Mutaties', 1, 0.5);
    paneel(ctx, 100, 200, 820, 640, '', 1); tag(ctx, 'gezonde cel', 510, 270, C.groen, 1, 'center', 30);
    const HE = q.on('herstelt', 1, 1.5); mcel(ctx, 400, 560, 200, t, { chrom: [[-0.2, -0.05, 0.4, HE < 0.5], [0.18, 0.1, -0.5]] });
    remBord(ctx, 760, 430, 60, q.on('rem', 1)); naamBij(ctx, 'controlepunt', '', 760, 380, q.on('controlepunt', 1), 'center');
    chip(ctx, 'eerst herstellen', 400, 815, C.groen, HE * (1 - q.on('Lukt', 1)), 24);
    chip(ctx, 'of stopt voorgoed met delen', 400, 815, C.text2, q.on('voorgoed', 1), 24);
    mcel(ctx, 780, 660, 62, t, { a: q.on('zichzelf', 1, 0.3), seed: 7, dood: q.on('zichzelf', 1, 2.5), chrom: [[0, 0, 0.3, true]] }); chip(ctx, 'of ruimt zichzelf op', 780, 790, C.text2, q.on('zichzelf', 1), 22);
    paneel(ctx, 1000, 200, 820, 640, '', M); tag(ctx, 'tumorcel', 1410, 270, C.koraal, M, 'center', 30);
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; mcel(ctx, 1300, 560, 200, t, { chrom: [[-0.2, -0.05, 0.4, true], [0.18, 0.1, -0.5, q.on('gebroken', 1) > 0.5]], seed: 3 }); remBord(ctx, 1660, 430, 60, 1, q.on('kapot', 1), 0); ctx.restore();
      chip(ctx, 'remmen kapot', 1660, 560, C.koraal, q.on('kapot', 1), 26); pijl(ctx, 1520, 720, 1720, 720, C.koraal, q.on('deelt', 1), 6, 22); chip(ctx, 'deelt door', 1620, 800, C.koraal, q.on('deelt', 1), 26); }
    vraagteken(ctx, 1810, 330, q.on('gebeurt', 1), 90); },

  s07(ctx, t, q) { bg(ctx, 'micro'); antwoord(ctx, 'Antwoord a: de dochtercellen missen stukken DNA');
    const DC = q.on('dochtercellen', 1, 0.8), ZO = q.on('Zo', 1, 0.8);
    if (DC < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - DC; const u = clamp(t / 6, 0, 1); delingCel(ctx, 960, 520, 980, 520, u, t, { gloed: q.on('centromeer', 1), insnoer: u * 0.5 });
      naamBij(ctx, 'stuk zonder centromeer', '', 960, 640, q.on('centromeer', 1), 'center'); naamBij(ctx, 'trekdraden', '', 640, 470, q.on('trekdraden', 1), 'center'); chip(ctx, 'raakt kwijt', 1000, 790, M2.breuk, q.on('kwijt', 1), 26); ctx.restore(); }
    if (DC > 0.01 && ZO < 0.99) { ctx.save(); ctx.globalAlpha *= DC * (1 - ZO); const DD = q.on('sterven', 1, 2.5); mcel(ctx, 620, 520, 190, t, { chrom: [[-0.2, -0.1, 0.3, true], [0.15, 0.12, -0.4]], los: [[0.68, 0.3, 0.8]], dood: DD }); mcel(ctx, 1300, 520, 190, t, { chrom: [[-0.2, -0.1, 0.3, true], [0.15, 0.12, -0.4]], los: [[-0.68, 0.3, -0.8]], seed: 2, dood: DD });
      naamBij(ctx, 'missen genen', '', 960, 800, DC, 'center'); ctx.restore(); }
    if (ZO > 0.01) { ctx.save(); ctx.globalAlpha *= ZO; tag(ctx, 'gezond weefsel', 520, 280, C.groen, 1, 'center', 30); tag(ctx, 'tumor', 1400, 280, C.koraal, 1, 'center', 30);
      for (let i = 0; i < 9; i++) { const cx = 380 + (i % 3) * 140, cy = 420 + Math.floor(i / 3) * 140; mcel(ctx, cx, cy, 62, t, { seed: i, chrom: i === 4 ? [[0, 0, 0.3]] : [] }); }
      for (let i = 0; i < 12; i++) { const cx = 1210 + (i % 4) * 128 + (Math.floor(i / 4) % 2) * 30, cy = 410 + Math.floor(i / 4) * 140; mcel(ctx, cx, cy, 60, t, { seed: i + 20, rand: '#F2A08A', chrom: i % 4 !== 3 ? [[-0.1, 0, 0.3, i % 3 === 0], [0.15, 0.05, -0.4]] : [] }); }
      chip(ctx, 'weinig cellen delen', 520, 820, C.groen, 1, 26); chip(ctx, 'meeste tumoren: veel delende cellen', 1400, 820, C.koraal, q.on('tumor', 1), 26); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('prostaat', 1);
    bundel(ctx, 560, 270, 560, 500, 110, 0.85 * (1 - q.on('Daarom', 1) * 0.7), t);
    bekken(ctx, 560, 480, 0.9, 1, { tumor: 1 }); metaA(ctx, 'DOORSNEDE BEKKEN · VAN ONDEREN GEZIEN', 560, 225, 1, C.grain, 'center', 22);
    naamBij(ctx, 'prostaat', '', 560, 500, P, 'center'); naamBij(ctx, 'blaas', '', 560, 420, q.on('blaas', 1), 'center'); naamBij(ctx, 'endeldarm', '', 560, 600, q.on('endeldarm', 1), 'center');
    tag(ctx, 'gezond weefsel geraakt', 560, 830, C.koraal, 1 - q.on('Daarom', 1), 'center', 26);
    kalender20(ctx, 1240, 330, q.on('twintig', 1), 0, 56); chip(ctx, '20 × 3 gray', 1430, 740, C.goud, q.on('gray', 1), 30); chip(ctx, '4,5 week', 1430, 810, C.goud, q.on('halve', 1), 26);
    stempel(ctx, 1450, 190, 'niet alles in één keer', C.koraal, q.on('alles', 1) * (1 - q.on('twintig', 1)), -0.08); vraagteken(ctx, 1780, 260, q.on('Waarom', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: gezond weefsel herstelt tussen de keren beter');
    const PK = q.on('Prostaatkanker', 1, 0.8), BV = q.on('Bovendien', 1, 0.8), MK = q.on('merkt', 1, 0.8);
    if (PK < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - PK; metaA(ctx, 'BIJ DE MEESTE TUMOREN', 140, 250, 1, C.grain, 'left', 26);
      const u = clamp((t - q.at('Tussen', 1)) / Math.max(1, q.at('groot.', 1) - q.at('Tussen', 1)), 0, 1); const g = fractieGrafiek(ctx, 300, 330, 1180, 420, u, 1);
      naamBij(ctx, 'gezond weefsel', 'herstelt', 1510, 330 + 420 - (g.g ? g.g[1] : 1) * 420 * 0.92 + 10, q.on('gezonde', 1), 'left');
      naamBij(ctx, 'tumor', 'herstelt slechter', 1510, 330 + 420 - (g.tm ? g.tm[1] : 1) * 420 * 0.92 - 20, q.on('Tumorcellen', 1), 'left'); ctx.restore(); }
    if (PK > 0.01 && BV < 0.99) { ctx.save(); ctx.globalAlpha *= PK * (1 - BV); tag(ctx, 'prostaatkanker: de uitzondering', 960, 250, C.goud, 1, 'center', 32);
      chip(ctx, 'groeit langzaam', 620, 350, C.text2, q.on('langzaam', 1), 26); chip(ctx, 'herstelt zelf ook goed', 1100, 350, C.text2, q.on('herstelt', 1), 26);
      const V = q.on('veertig', 1), TW = q.on('twintig', 1);
      metaA(ctx, '39 × 2 GRAY · KLEINE PORTIES', 300, 470, q.on('Kleine', 1), C.text2, 'left', 22); porties(ctx, 300, 560, 39, 2, '#7A8BA8', q.on('Kleine', 1), 1200);
      kruis(ctx, 1560, 520, 26, V * 0.9, C.koraal);
      metaA(ctx, '20 × 3 GRAY · GROTERE PORTIES', 300, 650, TW, C.goud, 'left', 22); porties(ctx, 300, 780, 20, 3, C.goud, TW, 1200, q.on('gray', 1));
      naamBij(ctx, 'Henk', '', 960, 760, q.on('Henk', 1) * TW, 'left'); ctx.restore(); }
    if (BV > 0.01 && MK < 0.99) { ctx.save(); ctx.globalAlpha *= BV * (1 - MK); ctx.beginPath(); ctx.rect(0, 190, W, 690); ctx.clip(); bekken(ctx, 960, 520, 0.85, 1, { tumor: 1, bundels: clamp((t - q.at('Bovendien', 1)) / 4, 0, 1), t }); ctx.restore();
      ctx.save(); ctx.globalAlpha *= BV * (1 - MK); naamBij(ctx, 'hoogste dosis', 'in de prostaat', 960, 470, q.on('hoogst', 1), 'center'); chip(ctx, 'eromheen: steeds een deel', 960, 850, C.teal, q.on('eromheen', 1), 26); ctx.restore(); }
    if (MK > 0.01) { persoon(ctx, 'henk', 760, 880, 470, { t, uit: 'moe', a: MK, kijk: 1 }); naamBij(ctx, 'Opa Henk', 'na een paar weken', 760, 360, MK, 'center');
      chip(ctx, 'vaker plassen', 1220, 470, C.oker, q.on('plassen', 1), 30); chip(ctx, 'moe', 1220, 570, C.oker, q.on('moe.', 1), 30); chip(ctx, 'meestal weg na een paar maanden', 1300, 700, C.groen, q.on('verdwijnen', 1), 28); } },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const EL = q.on('Elke', 3, 0.8), OR = q.on('Oma', 1, 0.6);
    if (EL < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - EL; ctScherm(ctx, 640, 480, 0.72, 1, { contour: clamp((t - q.at('tekent', 1)) / 3, 0, 1), bundels: clamp((t - q.at('bestralingsplan', 1)) / 1.2, 0, 1), t });
      metaA(ctx, 'CT-PLAK VAN HET BEKKEN', 640, 200, 1, C.grain, 'center', 24); tag(ctx, 'film: In het lichaam kijken', 640, 860, C.teal, q.on('lichaam', 1) * (1 - q.on('plakjes', 1)), 'center', 26);
      persoon(ctx, 'kim', 1400, 880, 480, { t, kijk: 1, pose: 'wijs', a: q.on('Kim', 1, 0.3) }); naamBij(ctx, 'Dr. Kim', 'radiotherapeut', 1400, 340, q.on('Kim', 1), 'center');
      chip(ctx, 'bestralingsplan: richtingen en dosis', 1440, 230, C.goud, q.on('bestralingsplan', 1), 26); ctx.restore(); }
    if (EL > 0.01 && OR < 0.99) { ctx.save(); ctx.globalAlpha *= EL * (1 - OR); metaA(ctx, 'BESTRALINGSTAFEL · VAN BOVEN GEZIEN', 960, 230, 1, C.grain, 'center', 24); tafelBoven(ctx, 960, 520, 620, t, { laser: q.on('precies', 1), stip: q.on('stipjes', 1) });
      naamBij(ctx, 'stipjes op de huid van het bekken', 'merktekens', 1000, 780, q.on('stipjes', 1), 'center'); ctx.restore(); }
    if (OR > 0.01) { persoon(ctx, 'ria', 860, 880, 440, { t, kijk: 1, pose: 'denk', a: OR }); persoon(ctx, 'henk', 1100, 880, 470, { t, kijk: -1, uit: 'blij', a: OR });
      naamBij(ctx, 'Oma Ria', '', 860, 400, OR, 'center'); pijl(ctx, 940, 600, 1020, 600, C.goud, q.on('afstand', 1), 4, 14); pijl(ctx, 1020, 600, 940, 600, C.goud, q.on('afstand', 1), 4, 14); vraagteken(ctx, 1320, 380, q.on('denk', 1), 110); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: er blijft geen straling in hem achter'); const VO = q.on('ligt', 1, 0.6);
    if (VO < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - VO; const aan = t < q.at('aanstaat', 1) ? 1 : 1 - clamp((t - q.at('aanstaat', 1)) / 0.6, 0, 1);
      versneller(ctx, 720, 820, 0.85, 1, aan, t); chip(ctx, aan > 0.5 ? 'toestel aan: straling' : 'toestel uit: geen straling', 560, 300, aan > 0.5 ? C.goud : C.text2, 1, 26);
      const K = q.on('gewoon', 1, 0.6); persoon(ctx, 'ria', 1160 + 110 * K, 880, 440, { t, kijk: 1, uit: K > 0.5 ? 'lacht' : 'neutraal', pose: K > 0.5 ? 'vasthouden' : 'staan', a: q.on('Ria', 1, 0.3) }); persoon(ctx, 'henk', 1420, 880, 470, { t, kijk: -1, uit: 'blij', a: q.on('Henk', 1, 0.3) }); if (0) persoon(ctx, 'ria', 0, 0, 1, { t, kijk: 1, uit: K > 0.5 ? 'lacht' : 'neutraal', pose: K > 0.5 ? 'vasthouden' : 'staan', a: q.on('Ria', 1, 0.3) });
      chip(ctx, 'niet radioactief', 1440, 330, C.groen, q.on('radioactief', 1), 30); ctx.restore(); }
    if (VO > 0.01) { ctx.save(); ctx.globalAlpha *= VO;
      [220, 370, 520].forEach(yy => { ctx.save(); ctx.globalAlpha *= q.on('regels', 1); roundRect(ctx, 100, yy, 540, 120, 16); ctx.setLineDash([10, 8]); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); });
      regelKaart(ctx, 100, 220, 540, 'tijd', 'zo kort mogelijk', 'tijd', q.on('tijd', 1), t); regelKaart(ctx, 100, 370, 540, 'afstand', 'zo ver mogelijk weg', 'afstand', q.on('afstand', 1), t); regelKaart(ctx, 100, 520, 540, 'afscherming', 'iets ertussen', 'muur', q.on('afscherming', 1), t);
      const TB = 1, BU = q.on('Tijdens', 1); bunker(ctx, 830, 290, 460, 420, TB, { bundel: BU }); naamBij(ctx, 'beton', '± 2 meter dik', 1060, 160, q.on('beton', 1), 'center');
      metaA(ctx, 'BESTRALINGSRUIMTE · VAN BOVEN GEZIEN', 1060, 820, TB, C.grain, 'center', 20);
      bediening(ctx, 1440, 330, TB, { camera: q.on('camera', 1), t }); naamBij(ctx, 'bedieningsruimte', 'MBB\'er kijkt mee', 1630, 300, TB, 'center');
      dosismeter(ctx, 1640, 720, 0.75, q.on('dosismeter', 1)); naamBij(ctx, 'dosismeter', '', 1560, 760, q.on('dosismeter', 1), 'right'); ctx.restore(); } },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); tuin(ctx, 1, t); const KI = q.on('controles', 1, 0.5), HE = q.on('helft', 1, 0.4), RI = q.on('richten', 1, 0.6);
    persoon(ctx, 'henk', 560, 880, 470, { t, kijk: 1, uit: 'blij' }); persoon(ctx, 'ria', 340, 880, 440, { t, kijk: 1, uit: 'lacht' }); naamBij(ctx, 'Opa Henk', 'een paar maanden later', 560, 360, 1, 'center');
    chip(ctx, 'bedoeld om te genezen', 1360, 300, C.groen, q.on('genezen', 1) * (1 - KI), 30);
    const KA = KI * (1 - HE); if (KA > 0.01) { paneel(ctx, 1150, 200, 520, 600, '', KA); ctx.save(); ctx.globalAlpha *= KA; ctx.fillStyle = C.bgSchema; roundRect(ctx, 1152, 202, 516, 596, 16); ctx.fill(); persoon(ctx, 'kim', 1410, 780, 420, { t, kijk: -1 }); ctx.restore(); naamBij(ctx, 'Dr. Kim', 'controle in het ziekenhuis', 1410, 300, KA, 'center'); }
    const HA = HE * (1 - RI); if (HA > 0.01) { ctx.save(); ctx.globalAlpha *= HA; for (let i = 0; i < 10; i++) { const x = 1040 + i * 72, y = 330; ctx.fillStyle = i < 5 ? C.goud : '#5A6478'; ctx.beginPath(); ctx.arc(x, y - 52, 18, 0, 6.283); ctx.fill(); roundRect(ctx, x - 22, y - 30, 44, 56, 16); ctx.fill(); }
      metaA(ctx, 'ONGEVEER DE HELFT KRIJGT BESTRALING', 1364, 230, 1, C.grain, 'center', 22);
      chip(ctx, 'meeste tumoren: kapot DNA, slechter herstel', 1364, 440, C.koraal, q.on('meeste', 1), 26); ctx.restore(); }
    if (RI > 0.01) { ctx.save(); ctx.globalAlpha *= RI; roundRect(ctx, 1060, 170, 640, 690, 18); ctx.fillStyle = C.bgSchema; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.rect(1062, 172, 636, 600); ctx.clip(); bekken(ctx, 1380, 470, 0.5, 1, { tumor: 1, bundels: clamp((t - q.at('richten', 1)) / 2, 0, 1), t }); ctx.restore();
      chip(ctx, 'bij Henk: bundels kruisen in de prostaat', 1380, 825, C.goud, RI, 26); } },

  s15(ctx, t, q) { bg(ctx, 'schema'); const xs = [300, 630, 960, 1290, 1620], s = ['röntgen', 'CT', 'MRI', 'echo', 'bestraling'], cue = ['röntgen', 'CT', 'MRI', 'echo', 'bestraling'];
    metaA(ctx, 'MBB\'ER · MEDISCH BEELDVORMINGS- EN BESTRALINGSDESKUNDIGE', 960, 240, 1, C.grain, 'center', 24);
    xs.forEach((x, i) => vakIcoon(ctx, x, 470, s[i], 0.45 + 0.55 * q.on(cue[i], 1, 0.4), t, i === 4 ? 1 : 0));
    chip(ctx, 'hbo-bachelor MBRT · 4 jaar', 960, 720, C.goud, q.on('vier', 1), 32); metaA(ctx, 'FONTYS · HANZE · INHOLLAND', 960, 800, q.on('hogeschool', 1), C.text2, 'center', 22); }
});
