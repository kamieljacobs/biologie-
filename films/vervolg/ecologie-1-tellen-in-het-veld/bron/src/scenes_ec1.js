// Wat word jij? · Ecologie en natuurbeheer · Tellen in het veld — scènes per alinea (fase A, 25 okt 2026)
// Look: Schema met cast (Daan stagiair, outfit veld; Ecoloog Bas, voorstel, outfit veld). Micro alleen binnen een zoomcirkel (DNA in de keutel, eDNA in het ven), paars = DNA.
// Decor (heide, bosrand) alleen onder scènes die echt in het veld spelen (cold open, H1-begin, H2-begin, H3 keutel, recap). Elke scène staat er op t = 0.

const EC_PROF8 = ['A', 'B', 'A', 'C', 'A', null, 'B', 'C'];   // acht keutels: zeven profielen (A ×3, B ×2, C ×2) en één zonder profiel
function profielRij(ctx, x0, y, o = {}) { const { a = 1, buisA = 1, profA = 1, gap = 200, s = 1, pw = 150, ph = 110, groep = 0, leegHl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  EC_PROF8.forEach((L, i) => { const x = x0 + i * gap; monsterBuisje(ctx, x, y, s, { a: buisA, nr: String(i + 1), inhoud: 'keutel' });
    const py = y + 40 * s; if (profA > 0.01) dnaProfiel(ctx, x - pw / 2, py, pw, ph, L || 'A', { a: profA * clamp(profA * 8 - i, 0, 1), leeg: !L, hl: !L ? leegHl : 0, kl: L ? EC_PAARS[L] : '#5A6272' }); });
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) {
    // rechts: wat de film telt — een gemerkte vlinder, een pootafdruk en een DNA-profiel
    heideblauwtje(ctx, 1500, 360, 9, { zij: true, nr: '17' });
    pootafdrukWolf(ctx, 1260, 650, 13, -0.25, { kl: '#8A7A62' });
    dnaProfiel(ctx, 1500, 560, 260, 170, 'A', { label: false });
  },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    bosrand(ctx, { x1: 1250, seed: 4 }); groveDen(ctx, 1420, FLOOR - 4, 560, { seed: 9 });
    heideGrond(ctx, { zand: 1 });
    wildcamera(ctx, 1422, 610, 4, { ir: 0.5 + 0.5 * Math.sin(t * 2) > 0.9 ? 1 : 0 });
    naamBij(ctx, 'wildcamera', '', 1480, 600, q.on('Hoeveel', 1), 'left');
    pootafdrukWolf(ctx, 1080, 858, 4, -0.4, { kl: '#6A5A44', hl: q.on('wolf', 1) });
    const D = q.on('Daan', 1, 0.3), B = q.on('Ecoloog', 1, 0.3);
    daan(ctx, 430, t, { a: D, uit: q.on('wolf', 1) > 0.5 && q.on('Bas', 1) < 0.5 ? 'blij' : 'neutraal' });
    naamBij(ctx, 'Daan', 'stagiair', 430, 386, D, 'center');
    bas(ctx, 780, t, { a: B, uit: q.on('lacht', 1) > 0.5 && q.on('Hoeveel', 1) < 0.5 ? 'lacht' : 'neutraal' });
    naamBij(ctx, 'Bas', 'ecoloog', 780, 348, B, 'center');
    // kaart van het gebied: de wolf woont ergens in het bos
    const K = q.on('Veluwe', 1);
    const P = gebiedKaart(ctx, 1380, 120, 470, 300, { a: K });
    vraagteken(ctx, P.bos[0] + 60, P.bos[1] + 70, q.on('Hoeveel', 1), 90);
    vraagteken(ctx, 1080, 640, q.on('denk', 1), 110); },

  // ---------- H1 Vangen, merken, terugvangen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord c: ze lezen sporen');
    // het antwoord: sporen → verschillende profielen
    const S = 1 - q.on('Maar', 1, 0.5);
    ecA(ctx, S, () => { wolfKeutel(ctx, 560, 480, 14); naamBij(ctx, 'sporen', '', 560, 600, 1, 'center'); pijl(ctx, 800, 480, 960, 480, C.line, 1, 4, 16);
      ['A', 'B', 'C'].forEach((L, i) => dnaProfiel(ctx, 1010 + i * 260, 400, 220, 160, L, { a: q.on('verschillende', 1, 0.4 + i * 0.2) }));
      naamBij(ctx, 'verschillende dieren', '', 1360, 640, q.on('dieren', 1), 'center'); });
    // daarna op de heide: Daan met een vlindernet, vlinders boven de bloeiende heide
    const H = q.on('Maar', 1, 0.6);
    ecA(ctx, H, () => { bosrand(ctx, { seed: 6 }); heideGrond(ctx, { seed: 8 });
      for (let i = 0; i < 9; i++) { const w = wander(i, t, 60, 0.35); heideblauwtje(ctx, 900 + i * 110 + w.x, 600 + (i % 3) * 50 + w.y, 1.0, { flap: 0.5 + 0.4 * Math.sin(t * 9 + i) }); }
      daan(ctx, 360, t, { pose: 'vasthouden', hold: holdNet });
      naamBij(ctx, 'Daan', '', 360, 386, 1, 'center');
      metaA(ctx, 'HEIDEBLAUWTJES · ± 3 CM', 1340, 540, q.on('heide', 1), C.grain, 'center', 24); });
    defKaart(ctx, 'populatie', 'alle individuen van één soort in één gebied', 1080, 230, 720, q.on('populatie', 1));
    tag(ctx, 'niet tellen, maar schatten', 1440, 470, C.goud, q.on('schat', 1), 'center', 34); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    // 1 merken: één vlinder groot, nummertje op de onderkant van de vleugel
    const nrA = q.on('nummertje', 1, 0.8), vl = q.on('vliegen', 1, 1.2);
    heideblauwtje(ctx, 300, 380 - 40 * ease(vl), 8, { zij: true, nr: nrA > 0.5 ? '17' : '', hl: q.on('nummertje', 1) * (1 - vl) });
    metaA(ctx, 'VERGROOT', 300, 470, 1, C.grain, 'center', 24);
    naamBij(ctx, 'nummer met stift', 'onderkant vleugel', 420, 330, nrA * (1 - q.on('Twee', 1)), 'left');
    mono(ctx, '40 gemerkt', 300, 580, q.on('veertig', 1), C.goud, 52);
    // 2 tweede vangst: 30 vlinders, 6 gemerkt (goud omrand)
    const V2 = q.on('Twee', 1), Z = q.on('Zes', 1);
    metaA(ctx, 'TWEE DAGEN LATER · 30 GEVANGEN', 930, 262, V2, C.grain, 'center', 24);
    vlinderRaster(ctx, 740, 310, 30, 6, 76, { a: V2, t, goud: Z > 0.5 ? [2, 7, 13, 16, 22, 27] : [] });
    mono(ctx, '6 gemerkt', 930, 700, Z, C.goud, 44);
    // 3 de verhouding: zes van dertig = een vijfde, dus ook een vijfde van alle vlinders
    const R1 = q.on('vijfde', 1), R2 = q.on('Dus', 1), T = q.on('tweehonderd', 1);
    regel(ctx, 'tweede vangst', 1360, 330, R1, C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 1360, 350, 420, 6 / 30 * R1, null, null, R1);
    mono(ctx, '6 / 30 = 1/5', 1570, 450, R1, C.text, 36);
    regel(ctx, 'alle vlinders', 1360, 530, R2, C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 1360, 550, 420, 0.2 * R2, null, null, R2);
    mono(ctx, T > 0.5 ? '40 / 200 = 1/5' : '40 / ?  = 1/5', 1570, 650, R2, T > 0.5 ? C.groen : C.text, 36);
    // 4 de som op het scherm
    const SC = q.on('scherm', 1);
    if (SC > 0.01) { ctx.save(); ctx.globalAlpha *= SC; roundRect(ctx, 400, 745, 1120, 115, 18); shape(ctx, rgba(C.fill, 0.92), C.goud, 2); ctx.restore(); }
    mono(ctx, 'aantal ≈ 40 × 30 ÷ 6 = 200', 960, 824, SC, C.text, 62);
    tag(ctx, 'vangen, merken en terugvangen', 960, 175, C.goud, q.on('heet', 1), 'center', 34); },

  s06(ctx, t, q) { bg(ctx, 'schema');
    // een gemerkte en een ongemerkte vlinder: even makkelijk te vangen?
    const sc = q.on('schuw', 1, 1.4);
    heideblauwtje(ctx, 560 - 230 * ease(sc), 420 + 10 * ease(sc), 7, { zij: true, nr: '17', koraal: sc });
    heideblauwtje(ctx, 1000, 420, 7, { zij: true });
    naamBij(ctx, 'gemerkt', '', 560, 540, 1 - sc, 'center'); naamBij(ctx, 'niet gemerkt', '', 1000, 540, 1, 'center');
    text(ctx, '=', 780, 400, fTitel(96), C.groen, 'center');
    ecA(ctx, 1 - sc, () => chip(ctx, 'even makkelijk te vangen', 780, 260, C.groen, q.on('makkelijk', 1), 30));
    tag(ctx, 'na het merken schuw', 330, 250, C.koraal, sc, 'center', 32);
    kruis(ctx, 780, 380, 40, sc);
    // de som met een onbekende
    const S = q.on('schatting', 1);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; roundRect(ctx, 520, 680, 880, 110, 18); shape(ctx, rgba(C.fill, 0.92), C.line, 1.5); ctx.restore(); }
    mono(ctx, '40 × 30 ÷ ?  = ?', 960, 756, S, C.text, 60);
    vraagteken(ctx, 1500, 460, q.on('denk', 1), 130); },

  s08(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord b: de schatting wordt te hoog');
    const D3 = q.on('drie', 1);
    metaA(ctx, 'TWEEDE VANGST · 30', 360, 250, 1, C.grain, 'center', 24);
    vlinderRaster(ctx, 180, 300, 30, 6, 72, { t, goud: D3 > 0.5 ? [2, 13, 22] : [2, 7, 13, 16, 22, 27] });
    mono(ctx, D3 > 0.5 ? '3 gemerkt' : '6 gemerkt', 360, 690, 1, D3 > 0.5 ? C.koraal : C.goud, 44);
    regel(ctx, 'lijkt gemerkt', 820, 330, q.on('lijkt', 1), C.text, 30, 'left', 600);
    verhoudingBalk(ctx, 820, 350, 420, lerp(0.2, 0.1, q.on('lijkt', 1)), null, null, q.on('lijkt', 1), C.koraal);
    mono(ctx, '3 / 30 = 1/10', 1030, 450, q.on('lijkt', 1), C.text, 36);
    const S = q.on('som', 1);
    if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; roundRect(ctx, 200, 740, 820, 110, 18); shape(ctx, rgba(C.fill, 0.92), C.koraal, 2); ctx.restore(); }
    mono(ctx, '40 × 30 ÷ 3 = 400', 610, 816, S, C.koraal, 60);
    tag(ctx, '2 × te veel', 1030, 560, C.koraal, q.on('twee', 1), 'center', 32);
    // nieuwe, ongemerkte vlinders erbij: hetzelfde effect
    const N = q.on('Nieuwe', 1, 1.6);
    for (let i = 0; i < 5; i++) { const w = wander(i + 20, t, 10, 0.5), tx = 1380 + (i % 3) * 90 + w.x, ty = 230 + Math.floor(i / 3) * 80 + w.y; heideblauwtje(ctx, lerp(2000, tx, ease(N)), lerp(140, ty, ease(N)), 1.5, { a: clamp(N * 3, 0, 1), flap: 0.4 + 0.3 * Math.sin(t * 8 + i), koraal: 1 }); }
    naamBij(ctx, 'nieuw, zonder nummer', '', 1500, 410, q.on('nummer', 1), 'center', C.koraal);
    dichtIcoon(ctx, 1500, 610, 105, q.on('dicht', 1));
    naamBij(ctx, 'dicht', 'niemand erbij, niemand weg', 1500, 780, q.on('dicht', 1), 'center'); },

  // ---------- H2 Elke week dezelfde route ----------
  s09(ctx, t, q) { bg(ctx, 'schema');
    bosrand(ctx, { x1: 1150, seed: 2 }); heideGrond(ctx, { seed: 12 });
    const V = q.on('vrijwilliger', 1, 0.3);
    daan(ctx, 250, t, { h: 420 }); naamBij(ctx, 'Daan', '', 250, 392, 1, 'center');
    vrijwilliger(ctx, 520, t, { a: V, pose: 'vasthouden', hold: holdKlembord });
    naamBij(ctx, 'vrijwilliger', '', 520, 390, V, 'center');
    // de denkbeeldige doos vóór haar
    const DZ = q.on('doos', 1);
    telDoos(ctx, 660, 840, 360, 300, 230, 110, DZ);
    naamBij(ctx, '5 m breed', '', 840, 878, q.on('breed', 1), 'center');
    naamBij(ctx, '5 m vooruit', '', 1110, 700, q.on('vooruit', 1), 'left');
    metaA(ctx, 'NIET OP SCHAAL', 1010, 405, DZ, C.grain, 'center', 22);
    for (let i = 0; i < 3; i++) { const w = wander(i + 3, t, 30, 0.4); heideblauwtje(ctx, 760 + i * 110 + w.x, 650 - (i % 2) * 60 + w.y, 0.6, { a: DZ, flap: 0.5 + 0.4 * Math.sin(t * 9 + i) }); }
    // de route van bovenaf, in stukken van vijftig meter
    const RT = q.on('route', 1), k = clamp((t - q.at('route', 1)) / 14, 0, 1);
    routeKaart(ctx, 1240, 130, 620, 260, { a: RT, k, stukken: q.on('vijftig', 1), doos: q.on('doos', 1), hlStuk: q.on('vijftig', 1) > 0.5 ? Math.min(9, Math.floor(k * 10)) : -1 });
    metaA(ctx, '1 STREEPJE = 50 M', 1550, 430, q.on('vijftig', 1), C.grain, 'center', 22);
    zon(ctx, 1330, 520, 28, q.on('mooi', 1), t); klokje(ctx, 1460, 520, 36, 7 / 12, q.on('overdag', 1)); metaA(ctx, '10–17 UUR', 1460, 600, q.on('overdag', 1), C.grain, 'center', 22);
    tag(ctx, 'transect', 1550, 690, C.goud, q.on('transect', 1), 'center', 40); },

  s10(ctx, t, q) { bg(ctx, 'schema');
    const NL = q.on('duizenden', 1, 0.8);
    const NLM = nederland(ctx, 110, 150, 205, { a: 1 }); nlStippen(ctx, NLM, Math.round(140 * NL));
    metaA(ctx, 'TELROUTES (SCHEMATISCH)', 360, 790, NL, C.grain, 'center', 22);
    kaartjeEc(ctx, 700, 170, 600, 110, 'Netwerk Ecologische Monitoring', 'vrijwilligers tellen', { a: q.on('Netwerk', 1) });
    pijl(ctx, 1000, 290, 1000, 340, C.line, q.on('Centraal', 1), 3, 14);
    kaartjeEc(ctx, 700, 350, 600, 110, 'CBS', 'rekent de tellingen om', { a: q.on('Centraal', 1) });
    // een index, geen totaal
    const IX = q.on('index', 1);
    indexGrafiek(ctx, 790, 540, 480, 200, { a: IX, punten: 1, klein: true });
    metaA(ctx, '1992 = 100', 1040, 520, IX, C.grain, 'center', 22);
    naamBij(ctx, 'index', 'geen totaal', 1300, 600, q.on('index', 1), 'left');
    // een proefvlak: alles tellen in een vast vierkant
    const PV = q.on('proefvlak', 1);
    proefvlak(ctx, 1500, 260, 300, { a: PV, eitjes: q.on('alles', 1) });
    naamBij(ctx, 'proefvlak', 'voorbeeld', 1650, 230, PV, 'center');
    naamBij(ctx, 'eitjes op klokjesgentiaan', '', 1650, 650, q.on('alles', 1), 'center'); },

  s11(ctx, t, q) { bg(ctx, 'schema');
    vrijwilliger(ctx, 360, t, { pose: q.on('bloemen', 1) > 0.5 ? 'wijs' : 'vasthouden', hold: q.on('bloemen', 1) > 0.5 ? null : holdKlembord, uit: 'blij' });
    naamBij(ctx, 'vrijwilliger', '', 360, 390, 1, 'center');
    routeKaart(ctx, 720, 200, 1000, 460, { a: 1, k: 0.5 + 0.5 * Math.sin(t * 0.4), stukken: 1, bloemen: q.on('bloemen', 1), nieuw: q.on('mooiere', 1, 1.2) });
    naamBij(ctx, 'vaste route', '', 900, 330, 1, 'center');
    naamBij(ctx, 'mooiere route', 'langs de bloemen', 1260, 700, q.on('mooiere', 1), 'center', C.koraal);
    vraagteken(ctx, 1815, 470, q.on('denk', 1), 110); },

  s13(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord a: nee, dan stijgt de telling');
    // twee staafjes: zelfde aantal vlinders, langs de bloemen zie je er meer
    const B = q.on('bloemen', 1), M = q.on('vlinders', 1);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(180, 640); ctx.lineTo(820, 640); ctx.stroke();
    roundRect(ctx, 250, 640 - 180, 160, 180, 8); shape(ctx, rgba(C.groen, 0.5), C.groen, 2); text(ctx, 'vaste route', 330, 690, fTekst(30, 600), C.text, 'center');
    if (B > 0.01) { const h = 180 + 170 * M; ctx.save(); ctx.globalAlpha *= B; roundRect(ctx, 560, 640 - h, 160, h, 8); shape(ctx, rgba(C.koraal, 0.45), C.koraal, 2); text(ctx, 'langs de bloemen', 640, 690, fTekst(30, 600), C.text, 'center'); ctx.restore(); }
    metaA(ctx, 'GETELD', 180, 250, 1, C.grain, 'left', 24);
    tag(ctx, 'meer gezien, niet meer vlinders', 500, 790, C.koraal, q.on('niet', 1), 'center', 32);
    stempel(ctx, 360, 360, 'vergelijking klopt niet', C.koraal, q.on('vergelijking', 1), -0.08);
    // wat elk jaar hetzelfde blijft
    const S = [['route', 1050], ['doos', 1300], ['weer', 1550]];
    S.forEach(([w, x], i) => { const a = q.on(w, w === 'doos' ? 2 : 1); ecA(ctx, a, () => { roundRect(ctx, x - 100, 200, 200, 170, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5);
      if (w === 'route') { ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 70, 280); ctx.lineTo(x + 70, 280); ctx.stroke(); for (let k = 0; k <= 4; k++) { ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 70 + k * 35, 268); ctx.lineTo(x - 70 + k * 35, 292); ctx.stroke(); } }
      if (w === 'doos') telDoos(ctx, x - 50, 320, 70, 70, 34, 24, 1);
      if (w === 'weer') { zon(ctx, x - 30, 275, 22, 1, t); klokje(ctx, x + 40, 280, 26, 7 / 12, 1); }
      text(ctx, w, x, 350, fTekst(30, 600), C.text, 'center'); vink_(ctx, x + 80, 210, 18, 1); }); });
    defKaart(ctx, 'monitoring', 'steeds op dezelfde manier herhaald meten, zodat je een verandering kunt zien', 960, 470, 860, q.on('monitoring', 1)); },

  // ---------- H3 Sporen in plaats van dieren ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    // 1 het camerabeeld: hoeveel tegelijk, welpen, maar niet welke
    const CAM = 1 - q.on('Daarvoor', 1, 0.6);
    ecA(ctx, CAM, () => { camBeeldEc1(ctx, 300, 170, 900, 500, { t, n: 2, welp: q.on('welpen', 1) });
      tag(ctx, 'hoeveel tegelijk', 1460, 300, C.goud, q.on('tegelijk', 1), 'center', 34);
      tag(ctx, 'welpen?', 1460, 400, C.goud, q.on('welpen', 1), 'center', 34);
      vraagteken(ctx, 610, 360, q.on('wélke', 1), 80); vraagteken(ctx, 960, 380, q.on('wélke', 1), 80);
      tag(ctx, 'welke wolf?', 1460, 520, C.koraal, q.on('wélke', 1), 'center', 34); });
    // 2 Daan raapt met handschoenen een keutel op
    const DA = q.on('Daarvoor', 1, 0.5);
    ecA(ctx, DA, () => { heideGrond(ctx, { zand: 1, seed: 14, x1: 900 }); ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 820, 1100, 80);
      wolfKeutel(ctx, 640, 852, 3.6, { hl: q.on('keutel', 1) * (1 - q.on('cellen', 1)) }); ecBordje(ctx, 740, 860, 1, 1);
      daan(ctx, 400, t, { outfit: 'veldHand', pose: 'vasthouden', hold: holdBuisje });
      naamBij(ctx, 'Daan', 'met handschoenen', 400, 386, 1, 'center');
      naamBij(ctx, 'keutel', '', 640, 800, q.on('keutel', 1), 'center'); });
    // 3 zoom: cellen uit de darmwand, met DNA (paars)
    const Z = q.on('poep', 1, 0.8), DN = q.on('DNA', 1, 0.8);
    zoomCircle(ctx, 1150, 400, 250, 640, 840, 'VERGROOT · CEL UIT DE DARMWAND', Z, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(890, 140, 520, 520);
      darmcellen(ctx, 1150, 400, 230, 1 - DN * 0.85, t);
      if (DN > 0.01) ecDNA(ctx, 940, 1360, 400, 16, { a: DN, fase: t * 0.3, herh: [[0.12, 0.3], [0.45, 0.6], [0.74, 0.9]], hl: q.on('DNA-profiel', 1) }); });
    naamBij(ctx, 'DNA', '', 1150, 470, DN, 'center', C.kernR);
    // 4 het lab maakt een profiel; BIJ12 regelt het
    kaartjeEc(ctx, 1500, 170, 390, 110, 'lab in Wageningen', 'maakt het profiel', { a: q.on('lab', 1) });
    dnaProfiel(ctx, 1575, 340, 240, 150, 'A', { a: q.on('DNA-profiel', 1) });
    metaA(ctx, 'ZIE DNA LEZEN', 1695, 530, q.on('lezen', 1), C.grain, 'center', 22);
    kaartjeEc(ctx, 1500, 580, 390, 110, 'BIJ12', 'voor de provincies', { a: q.on('BIJ12', 1) }); },

  s15(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'ÉÉN MAAND · ACHT KEUTELS', 960, 200, 1, C.grain, 'center', 26);
    profielRij(ctx, 260, 420, { buisA: 1, profA: q.on('profielen', 1, 1.6) });
    vraagteken(ctx, 960, 790, q.on('Hoeveel', 1), 110); },

  s17(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord c: minstens drie');
    profielRij(ctx, 300, 300, { s: 0.8, pw: 140, ph: 100, gap: 190, leegHl: q.on('levert', 1) });
    chip(ctx, 'oud of nat: DNA valt uit elkaar', 1250, 500, C.koraal, q.on('natte', 1), 26);
    // drie wolven (A, B, C) en één die niets achterliet
    const W3 = q.on('drie', 1);
    ['A', 'B', 'C'].forEach((L, i) => { const x = 280 + i * 230, a = clamp(W3 * 3 - i, 0, 1); wolfBib(ctx, x, 720, 1.1, { a, t: t + i * 0.3, kijk: 1 }); if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; text(ctx, L, x, 590, fTekst(36, 800), EC_PAARS[L], 'center'); ctx.restore(); } });
    const N = q.on('niets', 1); wolfBib(ctx, 980, 720, 1.1, { a: 0.35 * N, t: t + 0.5 }); vraagteken(ctx, 980, 600, N, 64);
    naamBij(ctx, 'niets gevonden', 'telt niet mee', 980, 790, N, 'center');
    haak(ctx, 200, 760, 760, 'minstens 3', C.groen, q.on('minimum', 1));
    // één jonge wolf die verder trekt: één profiel is genoeg
    const J = q.on('jonge', 1, 0.8), k = clamp((t - q.at('jonge', 1)) / 4.5, 0, 1);
    ecA(ctx, J, () => { const M = nederland(ctx, 1300, 450, 125, { a: 1 });
      const path = [[7.05, 52.35], [6.5, 52.3], [6.1, 52.15], [5.7, 52.2], [5.3, 52.05]].map(([lo, la]) => M.xy(lo, la));
      ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); const n = k * (path.length - 1); for (let i = 0; i <= Math.floor(n); i++) i ? ctx.lineTo(...path[i]) : ctx.moveTo(...path[i]);
      const i0 = Math.min(path.length - 2, Math.floor(n)), f = n - i0, cur = [lerp(path[i0][0], path[i0 + 1][0], f), lerp(path[i0][1], path[i0 + 1][1], f)]; ctx.lineTo(...cur); ctx.stroke(); ctx.setLineDash([]);
      wolfBib(ctx, cur[0], cur[1] - 4, 0.32, { t, loop: k < 1 ? 1 : 0, kijk: -1 });
      monsterBuisje(ctx, path[2][0], path[2][1] + 4, 0.4, { a: q.on('keutel', 3), dop: '#E0B64A' });
      dnaProfiel(ctx, 1640, 520, 150, 100, 'D', { a: q.on('achterlaat', 1) });
      stempel(ctx, 1715, 700, 'telt mee', C.groen, q.on('telt', 2), -0.1); }); },

  s18(ctx, t, q) { bg(ctx, 'schema');
    // 1 een DNA-profiel als merkteken dat de wolf zelf achterlaat
    const TW = q.at('water', 1), E = 1 - clamp((t - (TW - 0.45)) / 0.3, 0, 1);
    ecA(ctx, E, () => {
      heideblauwtje(ctx, 280, 380, 7, { zij: true, nr: '17' }); naamBij(ctx, 'merkteken', 'met stift', 280, 520, 1, 'center');
      text(ctx, '≈', 470, 390, fTitel(90), C.goud, 'center');
      dnaProfiel(ctx, 560, 290, 220, 140, 'A', { hl: q.on('merkteken', 1) });
      naamBij(ctx, 'merkteken', 'laat de wolf zelf achter', 670, 520, q.on('merkteken', 1), 'center');
      const L = q.on('later', 1);
      dnaProfiel(ctx, 560, 590, 220, 140, 'A', { a: L, hl: q.on('teruggevangen', 1) });
      vink_(ctx, 830, 660, 26, q.on('teruggevangen', 1));
      tag(ctx, 'teruggevangen', 1000, 680, C.groen, q.on('teruggevangen', 1), 'center', 32);
      bergKaartje(ctx, 1200, 200, 620, 360, q.on('Roemeense', 1));
      metaA(ctx, 'GENETISCH VANGEN EN TERUGVANGEN', 1510, 610, q.on('Roemeense', 1), C.grain, 'center', 22); });
    // 2 water uit het ven: omgevings-DNA
    const V = clamp((t - (TW - 0.1)) / 0.35, 0, 1);
    ecA(ctx, V, () => { heideGrond(ctx, { seed: 15, x1: 1000 }); ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 800, 1000, 100);
      ven(ctx, 420, 760, 300, 70, { hl: q.on('ven', 2) });
      daan(ctx, 830, t, { pose: 'vasthouden', hold: holdFles }); naamBij(ctx, 'Daan', '', 830, 386, 1, 'center');
      const Z = q.on('omgevings-DNA', 1, 0.8);
      zoomCircle(ctx, 1420, 380, 240, 420, 740, 'VERGROOT · LOSSE STUKJES DNA IN WATER', q.on('zit', 1), () => { ctx.fillStyle = rgba(C.teal, 0.25); ctx.fillRect(1170, 130, 500, 500); dnaStukjes(ctx, 1420, 380, 130, 140, 6, 1, t); });
      naamBij(ctx, 'omgevings-DNA', '', 1420, 118, Z, 'center', C.kernR);
      kaartjeEc(ctx, 1220, 700, 400, 110, 'wel of niet hier: ja', '', { a: q.on('verraadt', 1), col: C.groen, px: 30 });
      ecA(ctx, q.on('hoeveel', 2), () => { roundRect(ctx, 1640, 700, 240, 110, 14); shape(ctx, rgba(C.fill, 0.85), C.koraal, 2); text(ctx, 'hoeveel?', 1700, 768, fTekst(30, 700), C.text, 'left'); kruis(ctx, 1672, 755, 14, 1); }); }); },

  // ---------- H4 Van telling naar trend ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); keet(ctx);
    daan(ctx, 600, t, { kijk: 1, uit: q.on('concluderen', 1) > 0.5 ? 'verbaasd' : 'neutraal' }); naamBij(ctx, 'Daan', '', 600, 386, 1, 'center');
    bas(ctx, 1330, t, { outfit: 'gewoon' }); naamBij(ctx, 'Bas', '', 1330, 348, 1, 'center');
    tafel(ctx);
    laptop(ctx, 960, 690, 540, 1, (x, y, w, h) => { metaText(ctx, 'met DNA aangetoond · BIJ12', x + w / 2, y + 44, C.grain, 'center', 20);
      wolvenStaven(ctx, x + 60, y + 80, w - 120, h - 150, { a24: q.on('2024', 1), a25: q.on('2025', 1), px: 30 }); });
    vraagteken(ctx, 960, 270, q.on('concluderen', 1), 110); },

  s21(ctx, t, q) { bg(ctx, 'schema'); ec1Antwoord(ctx, 'antwoord b: er is misschien meer gezocht');
    metaA(ctx, 'WOLVEN MET DNA AANGETOOND · BIJ12', 430, 240, 1, C.grain, 'center', 22);
    wolvenStaven(ctx, 150, 280, 560, 340, { px: 36 });
    chip(ctx, 'minstens 131', 560, 712, C.goud, q.on('minstens', 1), 30);
    loep(ctx, 860, 400, 60, q.on('Zoek', 1)); tag(ctx, 'meer gezocht?', 880, 560, C.koraal, q.on('Zoek', 1), 'center', 30);
    tag(ctx, 'meer monsters?', 880, 640, C.koraal, q.on('monsters', 1), 'center', 30);
    kaartjeEc(ctx, 150, 762, 640, 110, 'totaal: niet te zeggen', 'BIJ12', { a: q.on('zeggen', 1), col: C.koraal });
    // roedels: van één in 2019 naar naar schatting veertien
    const R = q.on('roedels', 1), V = q.on('veertien', 1), VL = q.on('Veluwe', 1);
    const M = nederland(ctx, 1150, 150, 230, { a: R });
    if (R > 0.01) EC_ROEDELS.forEach((p, i) => { const a = i === 0 ? R : clamp(V * 14 - i, 0, 1); if (a <= 0.01) return; const [x, y] = M.xy(p[0], p[1]); ctx.save(); ctx.globalAlpha *= a;
      circ(ctx, x, y, 11, rgba(C.groen, 0.25), i < 7 && VL > 0.5 ? C.goud : C.groen, 2.5); circ(ctx, x, y, 5, i < 7 && VL > 0.5 ? C.goud : C.groen); ctx.restore(); });
    mono(ctx, V > 0.5 ? '2025: 14 roedels' : '2019: 1 roedel', 1450, 120 + 0, R, C.text, 40);
    metaA(ctx, 'NAAR SCHATTING · LIGGING SCHEMATISCH', 1430, 840, V, C.grain, 'center', 20);
    naamBij(ctx, 'Veluwe', '7 roedels', 1600, 560, VL, 'left', C.goud); },

  s22(ctx, t, q) { bg(ctx, 'schema');
    metaA(ctx, 'DAGVLINDERS · INDEX (1992 = 100) · CBS', 260, 170, 1, C.grain, 'left', 22);
    const G = indexGrafiek(ctx, 260, 210, 1160, 500, { punten: 1, hl2024: q.on('2024', 1), trend: q.on('richting', 1, 2.5), band: q.on('marge', 1) });
    naamBij(ctx, '2024: laagste jaar', '', G.X(32) - 10, G.Y(40.83) + 60, q.on('2024', 1), 'right', C.koraal);
    tag(ctx, 'één jaar is nog geen trend', 1660, 300, C.koraal, q.on('slecht', 1), 'center', 30);
    naamBij(ctx, 'trend', '', G.X(32) + 30, G.Y(43.85) - 10, q.on('richting', 1), 'left', C.groen);
    naamBij(ctx, 'marge', '', G.X(4) + 20, G.Y(96) - 30, q.on('marge', 1), 'left', C.groen);
    chip(ctx, 'ruim de helft minder', 1660, 470, C.groen, q.on('helft', 1), 30);
    kaartjeEc(ctx, 1500, 620, 340, 110, 'Toeval of echt?', 'film over de marge', { a: q.on('Toeval', 1) }); },

  // ---------- Recap ----------
  s23(ctx, t, q) { bg(ctx, 'schema'); avondHeide(ctx);
    daan(ctx, 380, t, { pose: 'vasthouden', hold: holdBoekje, uit: q.on('Toch', 1) > 0.5 ? 'blij' : 'neutraal' }); naamBij(ctx, 'Daan', '', 380, 386, 1, 'center');
    // drie kaartjes: wat Daan vandaag deed
    ecA(ctx, 1, () => { [[860, 'vangen en merken'], [1180, 'telroute'], [1500, 'DNA uit keutels']].forEach(([x, s2], i) => { roundRect(ctx, x, 150, 280, 200, 16); shape(ctx, rgba(C.fill, 0.9), i === 2 ? C.paars : C.line, i === 2 && q.on('DNA-profiel', 1) > 0.5 ? 3 : 1.5); text(ctx, s2, x + 140, 330, fTekst(26, 600), C.text, 'center'); });
      heideblauwtje(ctx, 1000, 270, 4, { zij: true, nr: '17' });
      ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1220, 250); ctx.lineTo(1420, 250); ctx.stroke(); telDoos(ctx, 1300, 268, 40, 40, 20, 14, 1);
      wolfKeutel(ctx, 1570, 260, 2.2); dnaProfiel(ctx, 1640, 190, 110, 100, 'A', { label: false }); });
    // het notitieboek
    const N = q.on('schrijft', 1);
    if (N > 0.01) { ctx.save(); ctx.globalAlpha *= N; roundRect(ctx, 760, 420, 1060, 220, 14); shape(ctx, '#F2EEE4', '#C8C0B0', 2);
      ctx.strokeStyle = '#C8C0B0'; ctx.lineWidth = 1.5; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(800, 500 + i * 60); ctx.lineTo(1780, 500 + i * 60); ctx.stroke(); }
      const k1 = clamp((t - q.at('schrijft', 1) - 0.6) / 2.5, 0, 1), k2 = clamp((t - q.at('getal', 1) + 0.3) / 1.4, 0, 1), s1 = 'minstens drie wolven in ons gebied.', s2 = 'Een getal is een schatting.';
      text(ctx, s1.slice(0, Math.round(s1.length * k1)), 810, 490, `italic 600 46px ${F.tekst}`, '#1A2740', 'left');
      text(ctx, s2.slice(0, Math.round(s2.length * k2)), 810, 560, `italic 600 46px ${F.tekst}`, '#1A2740', 'left'); ctx.restore(); }
    chip(ctx, 'elk nieuw profiel = een wolf', 1290, 720, C.paars, q.on('DNA-profiel', 1) * (1 - N), 30);
    chip(ctx, 'minstens zoveel', 1290, 800, C.goud, q.on('minstens', 1) * (1 - N), 30); },

  s24(ctx, t, q) { bg(ctx, 'schema');
    daan(ctx, 300, t, { pose: 'wijs', uit: 'blij' }); naamBij(ctx, 'Daan', '', 300, 386, 1, 'center');
    kaartjeEc(ctx, 620, 170, 560, 110, 'Bos- en natuurbeheer', 'hbo · Velp · 4 jaar', { a: q.on('hbo', 1) });
    kaartjeEc(ctx, 1240, 170, 560, 110, 'Biologie', 'wo-bachelor · Nijmegen', { a: q.on('biologie', 1) });
    kaartjeEc(ctx, 620, 310, 560, 110, 'Bos- en natuurbeheer', 'wo-bachelor · Wageningen', { a: q.on('Wageningen', 1) });
    kaartjeEc(ctx, 1240, 310, 560, 110, 'mbo', 'bij een groene school', { a: q.on('mbo', 1) });
    werkplekIcoon(ctx, 820, 600, 'beheer', 'natuurbeheerder', q.on('natuurbeheerder', 1));
    werkplekIcoon(ctx, 1210, 600, 'provincie', 'provincie', q.on('provincie', 1));
    werkplekIcoon(ctx, 1600, 600, 'instituut', 'onderzoeksinstituut', q.on('onderzoeksinstituut', 1, 0.4)); }
});
