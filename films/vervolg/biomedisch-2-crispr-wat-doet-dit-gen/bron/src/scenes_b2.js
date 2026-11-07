const TOUW_B2 = { kx: 398, ky: 716 };
// Wat word jij? · Biomedische wetenschappen 2 · CRISPR: wat doet dit gen? — scènes per alinea (v1.0, 24 okt 2026)
// Rode draad: hoog cholesterol in de familie van Opa Henk; van verband naar oorzaak naar behandeling.
// Elk beeld staat er op t = 0; alleen wat de stem noemt komt later erbij.

Object.assign(SCENES, {
  title(ctx, t) { dnaStuk(ctx, 1180, 700, 620, 10, 1, 6, 0.4 + 0.25 * Math.sin(t * 0.9)); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); tuinGrond(ctx, 1);
    tomatenplant(ctx, 440, 880, 1, 1, t);
    gespiegeld(ctx, 712, () => persoon(ctx, 'henk', 712, 880, 430, { t, pose: 'wijs', kijk: 1, uit: 'blij' }));
    persoon(ctx, 'kind', 250, 880, 250, { t, pose: 'wijs', kijk: 1, uit: 'blij' });
    touw(ctx, TOUW_B2.kx, TOUW_B2.ky, 466, 600, 1, 14); touw(ctx, 452, 596, 484, 604, 1, 4);
    naamBij(ctx, 'Opa Henk', '71 jaar', 720, 380, q.on('Henk', 1, 0.3), 'center');
    naamBij(ctx, 'Teun', '', 230, 580, q.on('Teun', 1, 0.3), 'center');
    // stamboom rechts: vader van Henk, Henk, Linda
    const H = q.on('hartinfarct', 1, 0.5), L = q.on('Linda', 1, 0.5);
    stamFig(ctx, 1080, 250, 32, true, q.on('vader', 1) > 0.5, 'vader van Henk', H);
    ctx.save(); ctx.globalAlpha *= H; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1080, 282); ctx.lineTo(1080, 390); ctx.stroke(); ctx.restore();
    stamFig(ctx, 1080, 422, 32, true, true, 'Henk', H);
    ctx.save(); ctx.globalAlpha *= L; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(1080, 454); ctx.lineTo(1080, 562); ctx.stroke(); ctx.restore();
    stamFig(ctx, 1080, 594, 32, false, true, 'Linda', L);
    cholBalk(ctx, 1190, 402, 300, 0.92, 'cholesterol Henk', q.on('cholesterol', 1), C.koraal, clamp((t - q.at('cholesterol', 1)) * 1.4, 0, 1));
    cholBalk(ctx, 1190, 574, 300, 0.88, 'cholesterol Linda', q.on('cholesterol', 1, 1.4), C.koraal, clamp((t - q.at('cholesterol', 1)) * 1.2, 0, 1));
    // Dr. Kim met het gelezen DNA
    const K = q.on('Kim', 1, 0.4);
    if (K > 0.01) { gespiegeld(ctx, 1730, () => persoon(ctx, 'kim', 1730, 880, 420, { t, a: K, pose: 'vasthouden', kijk: 1, outfit: 'lab' })); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1760, 400, K, 'center'); }
    dnaStuk(ctx, 1150, 668, 430, 9, q.on('afwijking', 1, 0.5), 5);
    tag(ctx, 'bij allebei dezelfde afwijking', 1365, 758, C.goud, q.on('allebei', 1), 'center', 28);
    vraagteken(ctx, 890, 300, q.on('denk', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: een verband, nog geen oorzaak');
    // links: stamboom met de variant die meeloopt
    paneel(ctx, 120, 230, 760, 600, 'verband in een familie', 1);
    const rij = [[320, 330, true, true], [560, 330, false, false], [250, 540, false, true], [430, 540, true, false], [640, 540, true, true]];
    rij.forEach(([x, y, man, ziek], i) => stamFig(ctx, x, y, 30, man, ziek, '', 1));
    ctx.save(); ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(350, 330); ctx.lineTo(530, 330); ctx.moveTo(440, 330); ctx.lineTo(440, 420); ctx.moveTo(250, 420); ctx.lineTo(640, 420); [250, 430, 640].forEach(x => { ctx.moveTo(x, 420); ctx.lineTo(x, 510); }); ctx.stroke(); ctx.restore();
    rij.forEach(([x, y, man, ziek]) => { if (ziek) circ(ctx, x, y + 52, 9, C.goud); });
    regel(ctx, 'de variant loopt mee met de ziekte', 500, 700, 1, C.text2, 28, 'center', 500);
    chip(ctx, 'of ligt hij er alleen dicht bij?', 500, 776, C.oker, q.on('meeliften', 1), 26);
    // rechts: meer families, en de vondst van 2003
    const M = q.on('families', 1, 0.6);
    for (let i = 0; i < 3; i++) { const a2 = M * clamp((t - q.at('families', 1)) * 1.6 - i * 0.5, 0, 1);
      paneel(ctx, 1000 + i * 290, 300 - i * 20, 240, 240, '', a2);
      stamFig(ctx, 1080 + i * 290, 380 - i * 20, 24, i % 2 === 0, true, '', a2); stamFig(ctx, 1160 + i * 290, 380 - i * 20, 24, i % 2 === 1, true, '', a2);
      stamFig(ctx, 1120 + i * 290, 480 - i * 20, 24, i % 2 === 0, true, '', a2); }
    metaA(ctx, 'FRANSE ONDERZOEKERS · HET JAAR 2003', 1000, 240, q.on('Franse', 1), C.grain, 'left', 26);
    dnaStuk(ctx, 1010, 690, 760, 12, q.on('vonden', 1, 0.6), 7);
    naamBij(ctx, 'PCSK9', 'het verdachte gen', 1390, 782, q.on('PCSK9', 1), 'center'); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'AMERIKAANSE ONDERZOEKERS · MENSEN MET EEN KAPOT PCSK9', 140, 200, 1, C.grain, 'left', 26);
    // twee groepen met hun cholesterolbalk
    paneel(ctx, 120, 250, 800, 420, 'gen werkt gewoon', 1);
    groep(ctx, 220, 420, 20, 10, 56, 15, () => '#5A6478', 1);
    cholBalk(ctx, 200, 540, 620, 0.9, 'LDL-cholesterol', 1, C.koraal, 1);
    paneel(ctx, 1000, 250, 800, 420, 'gen is kapot', q.on('kapot', 1, 0.5));
    groep(ctx, 1100, 420, 20, 10, 56, 15, () => '#5A6478', q.on('kapot', 1, 0.5));
    cholBalk(ctx, 1080, 540, 620, 0.65, 'LDL-cholesterol', q.on('kapot', 1, 0.5), C.groen, clamp((t - q.at('lager', 1)) * 1.4, 0, 1));
    chip(ctx, 'gemiddeld 28 procent lager', 1390, 636, C.groen, q.on('achtentwintig', 1), 28);
    chip(ctx, 'in 15 jaar bijna 90 procent minder hartziekte', 1390, 718, C.groen, q.on('hartziekte', 1), 28);
    // de stap die nog mist
    const D = q.on('draaien', 1, 0.5);
    regel(ctx, 'vergelijken is nog niet aantonen', 500, 730, q.on('vergelijken', 1), C.oker, 36, 'center', 700);
    if (D > 0.01) { tag(ctx, 'zelf het gen uitzetten en kijken', 500, 820, C.goud, D, 'center', 30); kruis(ctx, 1760, 806, 22, q.on('niet', 1)); regel(ctx, 'bij mensen mag dat niet', 1660, 818, q.on('niet', 1), C.koraal, 28, 'right', 600); } },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema');
    // vier modellen staan er vanaf t = 0; de kaartjes komen bij wat genoemd wordt
    gistcel(ctx, 300, 380, 1, 1, t); naamBij(ctx, 'gist', '', 300, 500, 1, 'center'); regel(ctx, 'een cel van 5 micrometer', 300, 540, 1, C.text2, 24, 'center', 500);
    worm(ctx, 790, 380, 360, 1, 1, t); naamBij(ctx, 'C. elegans', '', 790, 500, 1, 'center'); regel(ctx, 'worm van 1 millimeter', 790, 540, 1, C.text2, 24, 'center', 500);
    zebravisEmbryo(ctx, 1270, 370, 0.72, 1, t, 0.4); naamBij(ctx, 'zebravis', '', 1270, 500, 1, 'center'); regel(ctx, 'embryo van 1 millimeter', 1270, 540, 1, C.text2, 24, 'center', 500);
    muisje(ctx, 1740, 460, 0.58, 1, t); naamBij(ctx, 'muis', '', 1700, 500, 1, 'center'); regel(ctx, '9 centimeter lang', 1700, 540, 1, C.text2, 24, 'center', 500);
    modelKaart(ctx, 300, 600, 400, '6000 genen', 'bijna alle genen één voor één uit', q.on('zesduizend', 1, 0.6), C.oker);
    chip(ctx, 'bijna 1 op de 5 is nodig om te groeien', 300, 762, C.oker, q.on('vijf', 1), 26);
    modelKaart(ctx, 790, 600, 400, '959 lichaamscellen', 'van elke cel de afstamming bekend', q.on('negenhonderdnegenenvijftig', 1, 0.6), C.groen);
    chip(ctx, 'je ziet welke cel misgaat', 790, 762, C.groen, q.on('misgaat', 1), 26);
    regel(ctx, 'een modelorganisme: goed te houden en te veranderen', 1400, 700, q.on('modelorganisme', 1), C.text2, 30, 'center', 500); },

  s07(ctx, t, q) { bg(ctx, 'schema');
    zebravisEmbryo(ctx, 660, 470, 1.45, 1, t, q.on('kloppend', 1, 0.6));
    naamBij(ctx, 'zebravisembryo', '', 660, 740, 1, 'center');
    regel(ctx, 'een orgaan zien terwijl het zich vormt', 1420, 360, q.on('orgaan', 1), C.text, 38, 'center', 700);
    chip(ctx, 'kloppend hart in een embryo', 1420, 460, C.koraal, q.on('hart', 1), 28);
    vraagteken(ctx, 1420, 680, q.on('denk', 1), 130); },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: een doorzichtig embryo');
    zebravisEmbryo(ctx, 400, 420, 1.1, 1, t, 1);
    naamBij(ctx, 'zebravisembryo', 'buiten de moeder, glashelder', 400, 620, 1, 'center');
    chip(ctx, 'je ziet het hart kloppen', 400, 700, C.koraal, q.on('kloppen', 1), 28);
    chip(ctx, '70 procent van onze genen heeft hier een tegenhanger', 400, 778, C.teal, q.on('zeventig', 1), 26);
    const M = q.on('muis', 1, 0.5);
    muisje(ctx, 1180, 450, 0.8, M, t);
    naamBij(ctx, 'muis', '', 1130, 536, M, 'center');
    regel(ctx, 'een lever zoals de onze', 1130, 576, M, C.text2, 26, 'center', 500);
    regel(ctx, 'bijna elk van onze genen heeft hier een tegenhanger', 1130, 614, q.on('tegenhanger', 2), C.teal, 26, 'center', 500);
    regel(ctx, 'geen kleine mens: elk model past bij een vraag', 1130, 250, q.on('kleine', 1), C.goud, 34, 'center', 700);
    weegKaart(ctx, 1130, 676, 720, 'dierproef in Nederland', 'een commissie weegt belang tegen ongerief, en vraagt of het met minder of zonder dieren kan', q.on('commissie', 1, 0.6), C.oker); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'CRISPR-CAS9 IN HET KORT', 140, 190, 1, C.grain, 'left', 26);
    dnaStuk(ctx, 300, 430, 1100, 16, 1, 9, q.on('knipt', 1, 0.5));
    gidsRna(ctx, 850, 300, 1, q.on('gids-RNA', 1, 0.5));
    naamBij(ctx, 'gids-RNA', '', 850, 220, q.on('gids-RNA', 1, 0.5), 'center'); regel(ctx, 'past op één plek in het DNA', 1080, 290, q.on('past', 1), C.text2, 26, 'left', 500);
    cas9(ctx, 850, 430, 1, q.on('Cas9', 1, 0.5), clamp((t - q.at('Cas9', 1)) * 1.2, 0, 1));
    naamBij(ctx, 'Cas9', 'knipt beide strengen', 1000, 560, q.on('Cas9', 1, 0.5), 'left');
    // reparatie gaat net niet goed -> gen werkt niet meer
    const R = q.on('repareert', 1, 0.5);
    if (R > 0.01) { dnaStuk(ctx, 300, 650, 1100, 16, R, -1); ctx.save(); ctx.globalAlpha *= R; ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(900, 614); ctx.lineTo(940, 686); ctx.stroke(); ctx.restore();
      chip(ctx, 'reparatie net niet goed', 700, 760, C.koraal, R, 28); chip(ctx, 'dit gen werkt niet meer', 1180, 760, C.koraal, q.on('meer', 1), 28); }
    const K = q.on('muis', 1, 0.4);
    muisje(ctx, 1700, 560, 0.62, K, t, { knock: K }); naamBij(ctx, 'knock-outmuis', '', 1660, 620, K, 'center');
    regel(ctx, 'en wat meet je dan?', 1660, 300, q.on('meet', 1), C.goud, 34, 'center', 700); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    const P = q.on('PCSK9', 1, 0.5), pakU = clamp((t - q.at('pakt', 1)) / 2.2, 0, 1);
    levercel(ctx, 620, 500, 260, 1, t, { rec: 6, pak: P > 0.5 ? 2 : -1, pakU, binnen: q.on('binnen', 1, 0.8) });
    naamBij(ctx, 'LDL-receptor', '', 880, 320, q.on('receptoren', 1, 0.5), 'left'); regel(ctx, 'haalt cholesterol naar binnen', 880, 360, q.on('receptoren', 1, 0.5), C.text2, 26, 'left', 500);
    for (let i = 0; i < 4; i++) { const w = wander(i, t, 10, 0.5), f = q.on('cholesterol', 1, 0.8); ldlDeeltje(ctx, 300 + i * 56 + w.x, 300 + (i % 2) * 48 + w.y, 1, f); }
    tag(ctx, 'LDL-cholesterol in het bloed', 390, 230, C.goud, q.on('cholesterol', 1, 0.8), 'center', 26);
    if (P > 0.01) { pcsk9(ctx, 300, 650, 1, P, t); naamBij(ctx, 'PCSK9', '', 300, 730, P, 'center'); regel(ctx, 'laat een receptor afbreken', 300, 768, P, C.text2, 26, 'center', 500); }
    regel(ctx, 'meer PCSK9 is minder receptoren', 1420, 300, q.on('minder', 1), C.koraal, 36, 'center', 700);
    cholBalk(ctx, 1180, 400, 480, 0.9, 'cholesterol in het bloed', q.on('minder', 1), C.koraal, 1);
    const HK = q.on('Henk', 1, 0.5);
    tag(ctx, 'bij Henk en Linda: te veel PCSK9', 1420, 520, C.koraal, HK * (1 - q.on('Onderzoekers', 1, 0.5) * 0.6), 'center', 28);
    const U = q.on('uit', 2, 0.5);
    muisje(ctx, 1480, 700, 0.7, U, t, { knock: U }); naamBij(ctx, 'gen voor PCSK9 uit', 'in de lever', 1400, 796, U, 'center');
    vraagteken(ctx, 1790, 560, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: minder cholesterol');
    levercel(ctx, 440, 430, 200, 1, t, { rec: 8, binnen: clamp((t - 0.5) / 2.5, 0, 1) });
    chip(ctx, 'meer receptoren blijven zitten', 440, 756, C.groen, q.on('blijven', 1), 28);
    chip(ctx, 'meer cholesterol de cel in', 440, 834, C.groen, q.on('halen', 1), 28);
    metaA(ctx, 'HET JAAR 2014 · CRISPR IN DE LEVER VAN MUIZEN', 900, 200, q.on('2014', 1), C.grain, 'left', 26);
    const V = q.on('virus', 1, 0.5);
    muisje(ctx, 1030, 450, 0.62, V, t, { knock: V });
    chip(ctx, 'tot de helft van de genkopieën geraakt', 1400, 450, C.goud, q.on('helft', 1), 26);
    cholBalk(ctx, 900, 540, 820, 0.62, 'cholesterol 35 tot 40 procent lager', q.on('lager', 1), C.groen, clamp((t - q.at('lager', 1)) * 1.3, 0, 1));
    // drie controles
    const C1 = q.on('controlegroep', 1, 0.5), C2 = q.on('tweede', 1, 0.5), C3 = q.on('zoekt', 1, 0.3);
    weegKaart(ctx, 1010, 640, 420, 'controlegroep', 'alles behalve de knip zelf', C1, C.teal);
    weegKaart(ctx, 1470, 640, 420, 'tweede gids-RNA', 'elders in hetzelfde gen, zelfde resultaat', C2, C.teal);
    weegKaart(ctx, 1480, 230, 620, 'ergens anders geknipt?', 'nazoeken of Cas9 ook buiten het doelgen heeft geknipt', C3, C.oker); },

  // ---------- H4 ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    infuus(ctx, 420, 420, 1, 1, t, q.on('infuus', 1, 0.6));
    persoon(ctx, 'henk', 760, 880, 440, { t, pose: 'staan', kijk: -1, uit: 'neutraal' });
    naamBij(ctx, 'Opa Henk', '', 760, 400, 1, 'center'); regel(ctx, 'mensen zoals Henk', 760, 438, 1, C.text2, 26, 'center', 500);
    metaA(ctx, 'EUROPA · FEBRUARI VAN HET JAAR 2024', 1120, 200, q.on('februari', 1), C.grain, 'left', 26);
    weegKaart(ctx, 1360, 240, 600, 'eerste CRISPR-behandeling toegelaten', 'bij sikkelcelziekte en bij bètathalassemie', q.on('toegelaten', 1, 0.6), C.groen);
    groep(ctx, 1140, 560, 35, 12, 44, 13, () => '#5A6478', q.on('vijfendertig', 1, 0.6));
    chip(ctx, '35 patiënten, één infuus', 1360, 480, C.teal, q.on('vijfendertig', 1, 0.6), 28);
    cholBalk(ctx, 1120, 726, 660, 0.38, 'LDL bij de hoogste dosis: 62 procent lager', q.on('dosis', 1), C.groen, clamp((t - q.at('dosis', 1)) * 1.3, 0, 1));
    chip(ctx, 'weinig mensen, korte tijd: nog geen bewijs van langer leven', 1360, 830, C.oker, q.on('bewijs', 1), 26); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    infuus(ctx, 420, 400, 0.85, 1, t, 1);
    levercel(ctx, 980, 480, 200, 1, t, { rec: 7, binnen: 0.7 });
    dnaStuk(ctx, 860, 790, 480, 10, q.on('veranderd', 1, 0.5), 5);
    tag(ctx, 'DNA in levercellen veranderd', 1100, 866, C.goud, q.on('veranderd', 1, 0.5), 'center', 28);
    regel(ctx, 'en de kinderen van die patiënt?', 1540, 420, q.on('kinderen', 1), C.text, 36, 'center', 700);
    stamFig(ctx, 1460, 560, 30, false, false, '', q.on('kinderen', 1));
    stamFig(ctx, 1620, 560, 30, true, false, '', q.on('kinderen', 1));
    vraagteken(ctx, 1540, 710, q.on('denk', 1), 110); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: niet erfelijk');
    // links: somatisch, blijft bij de patiënt
    paneel(ctx, 120, 230, 820, 390, 'lichaamscel · somatisch', 1);
    levercel(ctx, 320, 400, 110, 1, t, { rec: 5, binnen: 0.6, label: 0 });
    naamBij(ctx, 'levercel', '', 320, 530, 1, 'center');
    stamFig(ctx, 620, 380, 30, true, false, 'patiënt', 1);
    stamFig(ctx, 820, 380, 28, false, false, 'kind', q.on('blijft', 1, 0.6));
    if (q.on('blijft', 1, 0.6) > 0.5) { kruis(ctx, 730, 380, 20, q.on('blijft', 1, 0.6)); }
    chip(ctx, 'blijft bij de patiënt zelf', 640, 540, C.groen, q.on('somatisch', 1), 26);
    // rechts: kiembaan, gaat door naar de generaties
    const KB = q.on('eicel', 1, 0.6);
    paneel(ctx, 1000, 230, 800, 390, 'eicel, zaadcel of embryo · kiembaan', KB);
    if (KB > 0.01) { ctx.save(); ctx.globalAlpha *= KB; circ(ctx, 1120, 400, 56, 'rgba(140,123,191,0.3)', C.paars, 3); circ(ctx, 1120, 400, 22, rgba(C.kern, 0.6), C.kernR, 2); ctx.restore();
      naamBij(ctx, 'eicel', '', 1120, 520, KB, 'center');
      for (let i = 0; i < 3; i++) { const a2 = KB * clamp((t - q.at('kind', 1)) * 1.4 - i * 0.5, 0, 1);
        stamFig(ctx, 1360 + i * 150, 400, 28, i % 2 === 0, true, '', a2); if (i) { ctx.save(); ctx.globalAlpha *= a2; pijl(ctx, 1300 + (i - 1) * 150, 400, 1332 + (i - 1) * 150, 400, C.line, 1, 3, 12); ctx.restore(); } }
      regel(ctx, 'in elke cel van het kind, en de generaties daarna', 1470, 470, q.on('generaties', 1), C.text2, 26, 'center', 500);
      stempel(ctx, 1400, 548, 'in Nederland verboden', C.koraal, q.on('Embryowet', 1), -0.08); }
    // drie afwegingen
    weegKaart(ctx, 420, 660, 540, 'geen toestemming', 'het kind dat het aangaat kan niet meebeslissen', q.on('toestemming', 1, 0.5), C.goud);
    weegKaart(ctx, 1000, 660, 540, 'niet terug te draaien', 'wat nu veilig lijkt, kan een generatie later anders uitpakken', q.on('uitpakken', 1, 0.5), C.goud);
    weegKaart(ctx, 1580, 660, 540, 'waar ligt de grens?', 'een ziekte voorkomen of een eigenschap uitkiezen', q.on('grens', 1, 0.5), C.goud);
    chip(ctx, 'ook somatisch: meer dan een miljoen euro per patiënt. Wie krijgt hem?', 960, 866, C.oker, q.on('miljoen', 1), 26); },

  // ---------- Recap ----------
  s18(ctx, t, q) { bg(ctx, 'schema'); tuinGrond(ctx, 1);
    tomatenplant(ctx, 250, 880, 0.8, 1, t);
    persoon(ctx, 'henk', 420, 880, 400, { t, pose: 'staan', kijk: -1, uit: 'blij' });
    persoon(ctx, 'kind', 580, 880, 235, { t, pose: 'zwaai', kijk: -1, uit: 'lacht' });
    chip(ctx, 'een pil die zijn cholesterol verlaagt', 470, 320, C.teal, q.on('pil', 1), 26);
    stapBol(ctx, 1020, 450, 1, 'verband', 1, C.teal, t >= q.at('verband', 1) ? 1 : 0.35);
    stapBol(ctx, 1260, 450, 2, 'hypothese', 1, C.teal, t >= q.at('hypothese', 1) ? 1 : 0.35);
    stapBol(ctx, 1500, 450, 3, 'model', 1, C.teal, t >= q.at('model', 1) ? 1 : 0.35);
    stapBol(ctx, 1740, 450, 4, 'patiënt', 1, C.goud, t >= q.at('voorzichtig', 1) ? 1 : 0.35);
    [1020, 1260, 1500].forEach(x => pijl(ctx, x + 56, 450, x + 180, 450, C.line, 0.7, 3, 13));
    regel(ctx, 'elke keer dezelfde weg', 1380, 300, q.on('weg', 1, 0.5), C.text, 36, 'center', 700); },

  s19(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'kim', 380, 880, 460, { t, pose: 'wijs', kijk: 1, outfit: 'lab' });
    naamBij(ctx, 'Dr. Kim', 'biomedisch onderzoeker', 380, 360, 1, 'center');
    modelKaart(ctx, 1000, 260, 520, 'bachelor · 3 jaar', 'universiteit, Biomedische wetenschappen', q.on('bachelor', 1, 0.5), C.teal);
    modelKaart(ctx, 1600, 260, 520, 'master · 2 jaar', 'daarna', q.on('master', 1, 0.5), C.teal);
    ctx.save(); const pa = Math.min(q.on('master', 1, 0.5), 1); ctx.globalAlpha *= pa; pijl(ctx, 1270, 310, 1330, 310, C.line, 1, 4, 14); ctx.restore();
    chip(ctx, 'geen arts, maar onderzoeker', 1300, 470, C.goud, q.on('onderzoeker', 1), 30);
    regel(ctx, 'hoe ziektes ontstaan in cellen en moleculen', 1300, 550, q.on('moleculen', 1), C.text2, 30, 'center', 500);
    modelKaart(ctx, 1040, 640, 440, 'onderzoekslab', 'universiteit of instituut', q.on('onderzoekslab', 1, 0.5), C.groen);
    modelKaart(ctx, 1560, 640, 440, 'ziekenhuislab', 'in het ziekenhuis', q.on('ziekenhuislab', 1, 0.5), C.groen); }
});
