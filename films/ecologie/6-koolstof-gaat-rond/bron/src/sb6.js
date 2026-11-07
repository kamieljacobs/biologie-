// Ecologie v2 · film 6 Koolstof gaat rond — storyboard: één keyframe per scène (29 okt 2026)
// Het gevolgde koolstofatoom is goud (focus); CO₂ en koolstofstromen grijs; organische stof groen; warmte koraal; water/oceaan teal.
const _F6 = 6;
function e6Vraag(ctx, regels, opties) { ecoVraagKaart(ctx, regels, opties, _F6); }
// vaste vakposities van het kringloopschema (groeit door de film)
const E6_SNEL = [{ id: 'lucht', x: 960, y: 210, naam: 'lucht', tijd: 'jaren' }, { id: 'plant', x: 520, y: 460, naam: 'planten', tijd: 'jaren–eeuwen', kl: '#2E4A3A' },
  { id: 'dier', x: 960, y: 560, naam: 'dieren', tijd: 'dagen–jaren' }, { id: 'bodem', x: 1400, y: 460, naam: 'bodem', tijd: 'jaren–eeuwen', kl: '#3A3026' }];
const E6_SNEL_P = [['lucht', 'plant', 'fotosynthese'], ['plant', 'lucht', 'dissimilatie'], ['plant', 'dier', null], ['dier', 'lucht', null], ['plant', 'bodem', null], ['dier', 'bodem', null], ['bodem', 'lucht', 'afbraak']];

const SB6 = {
  // ================= OPENING =================
  e6s01(ctx) { e6Moerasbos(ctx); e6Schubboom(ctx, 1300, 780, 640, { seed: 9 }); ctx.fillStyle = rgba(C.bgMacroSky, 0.85); ctx.fillRect(60, 44, 560, 50); ecoTag(ctx, _F6, 'OPENING'); e6Boomvaren(ctx, 760, 770, 230, { seed: 11, licht: true }); e6Atoom(ctx, 820, 560, 16);
    naamBij(ctx, 'boomvaren', '± 8 meter', 760, 830 - 20, 1, 'center'); naamBij(ctx, 'wolfsklauwboom', 'tot ± 30 meter', 1420, 400, 1, 'left'); ecoSchaal(ctx, 'Carboon · ± 300 miljoen jaar geleden'); },
  e6s02(ctx) { e6Straat(ctx); ecoTag(ctx, _F6, 'OPENING'); e6Co2(ctx, 1420, 230, 2, { goud: true }); text(ctx, '?', 1600, 260, fTitel(140), C.goud, 'center');
    naamBij(ctx, 'hetzelfde atoom', 'als koolstofdioxide', 1420, 340, 1, 'center', C.goud); ecoSchaal(ctx, 'nu'); },
  e6s03(ctx) { ecoTitelKaart(ctx, _F6, 'Koolstof gaat rond', ['Hoe komt koolstof van een varen van', '300 miljoen jaar in de lucht boven jouw straat?'], (c) => {
    c.strokeStyle = E6K.co2; c.lineWidth = 8; c.beginPath(); c.arc(1460, 780, 190, 0, 6.283); c.stroke(); for (const an of [0.4, 2.0, 3.6, 5.2]) pijl(c, 1460 + Math.cos(an) * 190, 780 + Math.sin(an) * 190, 1460 + Math.cos(an + 0.3) * 190, 780 + Math.sin(an + 0.3) * 190, E6K.co2, 1, 8, 22);
    e6Atoom(c, 1460 + 190, 780, 18); }); },

  // ================= H1 DE SNELLE KRINGLOOP =================
  e6s04(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE SNELLE KRINGLOOP'); ecoEikenblad(ctx, 780, 560, 34, { stadium: 0, hoek: -0.25 });
    for (const [x, y, g] of [[220, 300, false], [380, 210, false], [330, 420, true], [1560, 260, false]]) e6Co2(ctx, x, y, 2.2, { goud: g }); pijl(ctx, 430, 430, 600, 500, E6K.co2, 1, 5, 18);
    // glucose als zeshoek met het gouden atoom
    const gx = 1380, gy = 620; ctx.strokeStyle = C.oker; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * 6.283 + 0.52; ctx.lineTo(gx + Math.cos(an) * 70, gy + Math.sin(an) * 70); } ctx.stroke(); e6Atoom(ctx, gx + 61, gy - 35, 14);
    pijl(ctx, 1000, 600, 1280, 620, C.line, 1, 4, 18); naamBij(ctx, 'glucose', 'organische stof', gx, gy + 130, 1, 'center', C.oker); naamBij(ctx, 'koolstofdioxide', 'uit de lucht', 330, 540, 1, 'center', '#D2D8E2');
    naamBij(ctx, 'fotosynthese', null, 800, 300, 1, 'center', C.groen); },
  e6q05(ctx) { e6Vraag(ctx, ['Een plant staat een nacht onder een afgesloten glazen stolp, in het donker.', 'Wat gebeurt er met de koolstofdioxide onder de stolp?'], ['Die daalt: een plant neemt koolstofdioxide op', 'Die stijgt: de plant dissimileert ook in het donker', "Die blijft gelijk: 's nachts doet een plant niets"]);
    ctx.save(); ctx.beginPath(); ctx.ellipse(1690, 800, 130, 30, 0, 0, 6.283); ctx.fillStyle = '#3A3026'; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.rect(1540, 400, 300, 400); ctx.clip(); ecoKlaver(ctx, 1690, 790, 9, {}); ctx.restore(); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1570, 800); ctx.lineTo(1570, 590); ctx.arc(1690, 590, 120, Math.PI, 0); ctx.lineTo(1810, 800); ctx.stroke(); ctx.restore(); },
  e6s06(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE SNELLE KRINGLOOP');
    for (const [x, dag] of [[520, true], [1400, false]]) { roundRect(ctx, x - 380, 170, 760, 640, 20); shape(ctx, rgba(dag ? '#2E4466' : '#141E30', 0.9), C.line, 2);
      ctx.save(); roundRect(ctx, x - 380, 170, 760, 640, 20); ctx.clip(); ecoKlaver(ctx, x, 640, 26, {}); ctx.fillStyle = '#3A3026'; ctx.fillRect(x - 380, 642, 760, 170); ctx.restore(); pijl(ctx, x + 120, 470, x + 270, 330, E6K.co2, 1, 6, 20); e6Co2(ctx, x + 300, 300, 1.4);
      if (dag) { pijl(ctx, x - 270, 330, x - 120, 470, E6K.co2, 1, 12, 26); e6Co2(ctx, x - 300, 300, 1.4); naamBij(ctx, 'fotosynthese', 'opname, met licht', x - 200, 720, 1, 'center', C.groen); }
      naamBij(ctx, 'dissimilatie', 'afgifte, altijd', x + 200, 720, 1, 'center', '#D2D8E2'); metaText(ctx, dag ? 'DAG' : 'NACHT', x, 220, C.text2, 'center', 28); } },
  e6s07(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE SNELLE KRINGLOOP'); e6Kringloop(ctx, E6_SNEL, E6_SNEL_P);
    e6Atoom(ctx, 960 + 175, 210, 14); haak(ctx, 380, 1540, 650, 'de snelle kringloop: dagen tot eeuwen', C.groen); },
  e6s08(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE SNELLE KRINGLOOP'); e6Kringloop(ctx, E6_SNEL, E6_SNEL_P, { a: 0.9 });
    pijl(ctx, 200, 720, 1720, 720, C.goud, 0.9, 6, 22); for (const x of [700, 1150, 1600]) e5WarmteE6(ctx, x, 700);
    naamBij(ctx, 'pijlen = koolstof gaat ergens heen', 'niet "eet"', 960, 860, 1, 'center', '#D2D8E2'); naamBij(ctx, 'energie stroomt door', 'en wordt warmte', 1780, 660, 1, 'right', C.goud); },

  // ================= H2 WAAR AFBRAAK STOPT =================
  e6s09(ctx) { e6Moerasbos(ctx, { water: 600 }); ctx.fillStyle = rgba(C.bgMacroSky, 0.85); ctx.fillRect(60, 44, 760, 50); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT');
    ctx.fillStyle = '#4A3420'; ctx.fillRect(0, 820, W, 260); ctx.strokeStyle = '#7A5A3A'; ctx.lineWidth = 6; for (let i = 0; i < 12; i++) { const x = hash(i * 4) * W, y = 620 + hash(i * 6) * 180; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 90 + hash(i) * 60, y + 10 + hash(i * 2) * 30); ctx.stroke(); }
    e6Atoom(ctx, 1100, 860, 14); naamBij(ctx, 'veen', 'dode varens, niet afgebroken', 360, 900, 1, 'center', '#C9A35C'); naamBij(ctx, 'nat, weinig zuurstof', 'reducenten werken nauwelijks', 1460, 700, 1, 'center', C.teal); },
  e6s10(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT');
    [['veen', 0.05], ['bruinkool', 0.5], ['steenkool', 1]].forEach(([n, f], i) => { const x = 160 + i * 560; e6Lagen(ctx, x, 200, 440, 560, f); naamBij(ctx, n, ['begin', 'miljoenen jaren', 'tientallen miljoenen jaren'][i], x + 220, 840, 1, 'center'); });
    pijl(ctx, 620, 480, 700, 480, C.line, 1, 5, 18); pijl(ctx, 1180, 480, 1260, 480, C.line, 1, 5, 18); },
  e6q11(ctx) { e6Vraag(ctx, ['Hoe lang zat het atoom in de steenkool,', 'voordat het weer boven kwam?'], ['Ongeveer driehonderd miljoen jaar', 'Ongeveer duizend jaar', 'Ongeveer tien jaar']); },
  e6s12(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT'); const kool = e6Mijn(ctx, 300, 300, 1100, 560); e6Mijnwerker(ctx, 960, kool + 42, 150, { kijk: 1 }); 
    ctx.fillStyle = '#1E1C1E'; ctx.fillRect(300 + 1100 * 0.85, kool - 150, 1100 * 0.15 - 2, 200); e6Atoom(ctx, 1320, kool - 40, 16); naamBij(ctx, 'steenkoollaag', 'Carboon · ± 300 miljoen jaar oud', 1320, 940 - 40, 1, 'center'); naamBij(ctx, 'mijn in Zuid-Limburg', 'tot het jaar 1974', 1550, 360, 1, 'left', C.text2); },
  e6s13(ctx) { e6Straat(ctx, { grond: 880 }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 880); ctx.fillStyle = '#243656'; ctx.fillRect(0, 760, W, 120); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT');
    ctx.fillStyle = '#3A3E46'; ctx.fillRect(0, 880, W, 200); e6Centrale(ctx, 820, 880, 1.1); e6Co2(ctx, 1260, 180, 1.6, { goud: true });
    naamBij(ctx, 'kolencentrale', 'steenkool verbrand', 620, 560, 1, 'center'); naamBij(ctx, 'weer koolstofdioxide', null, 1260, 300, 1, 'center', C.goud); },
  e6s14(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT');
    const kol = [['aardolie en aardgas', 'plankton op de zeebodem', '#3E5A70'], ['steenkool', 'moerasbossen', '#2A2628'], ['kalksteen', 'schelpen en kalkskeletten', '#C9C0A6']];
    kol.forEach(([n, m, kl], i) => { const x = 210 + i * 560; roundRect(ctx, x, 230, 420, 520, 16); shape(ctx, rgba(kl, 0.55), C.line, 2); naamBij(ctx, n, m, x + 210, 820, 1, 'center');
      if (i === 0) { for (let k = 0; k < 18; k++) circ(ctx, x + 40 + hash(k * 3) * 340, 300 + hash(k * 7) * 380, 6, C.groen, null); }
      if (i === 1) { ctx.strokeStyle = '#6A5A4A'; ctx.lineWidth = 4; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(x + 40, 300 + k * 52); ctx.lineTo(x + 380, 296 + k * 52); ctx.stroke(); } }
      if (i === 2) { ctx.strokeStyle = '#8A8068'; ctx.lineWidth = 3; for (let k = 0; k < 16; k++) { const cx = x + 50 + (k % 4) * 100, cy = 300 + Math.floor(k / 4) * 110; ctx.beginPath(); ctx.arc(cx, cy, 26, Math.PI, 0); ctx.stroke(); for (let r = -2; r <= 2; r++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * 11, cy - 24); ctx.stroke(); } } } });
    metaText(ctx, 'ALLE DRIE: MILJOENEN JAREN', 960, 190, C.grain, 'center', 28); },
  e6s15(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'WAAR AFBRAAK STOPT');
    const V = [{ id: 'lucht', x: 960, y: 170, naam: 'lucht', tijd: 'jaren' }, { id: 'plant', x: 520, y: 380, naam: 'planten', tijd: 'jaren–eeuwen', kl: '#2E4A3A' }, { id: 'bodem', x: 1400, y: 380, naam: 'bodem', tijd: 'jaren–eeuwen', kl: '#3A3026' },
      { id: 'veen', x: 1400, y: 660, naam: 'veen', tijd: 'duizenden jaren', kl: '#4A3420' }, { id: 'fossiel', x: 960, y: 820, naam: 'steenkool, olie, gas', tijd: 'miljoenen jaren', kl: '#2A2628' }, { id: 'kalk', x: 400, y: 760, naam: 'kalksteen', tijd: 'miljoenen jaren', kl: '#6A6452' }];
    e6Kringloop(ctx, V, [['lucht', 'plant', null], ['plant', 'bodem', null], ['bodem', 'lucht', null], ['bodem', 'veen', null], ['veen', 'fossiel', null], ['fossiel', 'lucht', 'verbranding', C.koraal], ['lucht', 'kalk', null, C.teal]], { bw: 300 });
    naamBij(ctx, 'trage kringloop', null, 1600, 900, 1, 'center', C.goud); naamBij(ctx, 'via de oceaan', null, 470, 600, 1, 'center', _lt(C.teal, 0.2)); },

  // ================= H3 VOORRAAD EN STROOM =================
  e6s16(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM'); e6Staaf(ctx, 300, 760, 1380, 500, { leeg: true }); },
  e6q17(ctx) { e6Vraag(ctx, ['Waar zit van deze vijf de meeste koolstof?'], ['In de lucht', 'In de oceaan', 'In alle planten op aarde']); },
  e6s18(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM'); e6Staaf(ctx, 300, 760, 1380, 500, { getallen: true }); },
  e6s19(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM'); e6Oceaan(ctx, 260, 180, 1400, 680);
    for (const x of [500, 900, 1300]) { e6Co2(ctx, x, 150, 1); pijl(ctx, x, 168, x, 230, E6K.co2, 1, 4, 14); } for (const x of [600, 1100]) pijl(ctx, x, 520, x, 760, '#C9B896', 1, 4, 16);
    naamBij(ctx, 'algen', 'fotosynthese', 1690, 260, 1, 'left', C.groen); naamBij(ctx, 'resten', 'zakken', 1690, 560, 1, 'left', '#C9B896'); naamBij(ctx, 'diepzee', 'eeuwen', 1690, 800, 1, 'left', C.teal); },
  e6s20(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM'); e6Badkuip(ctx, 560, 760, 800, 360, { peil: 0.5, kranen: [[0.3, 40, E6K.co2, 'stroom erin']], afvoer: [[0.7, 40, E6K.co2, 'stroom eruit']] });
    naamBij(ctx, 'voorraad', 'koolstof in de lucht · gigaton', 960, 640, 1, 'center'); metaText(ctx, 'VOORRAAD = GIGATON · STROOM = GIGATON PER JAAR', 960, 200, C.grain, 'center', 26); },
  e6s21(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM');
    e6Badkuip(ctx, 560, 760, 800, 360, { peil: 0.5, kranen: [[0.22, 70, E6K.co2, 'dissimilatie, afbraak'], [0.62, 60, C.teal, 'uit de oceaan']], afvoer: [[0.3, 70, C.groen, 'fotosynthese'], [0.72, 60, C.teal, 'in de oceaan']] });
    naamBij(ctx, 'evenwicht', 'zonder de mens', 960, 640, 1, 'center'); },
  e6s22(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM');
    e6Badkuip(ctx, 560, 760, 800, 360, { peil: 0.5, kranen: [[0.22, 70, E6K.co2, null], [0.62, 60, C.teal, null], [0.92, 14, C.koraal, 'fossiele brandstoffen']], afvoer: [[0.3, 70, C.groen, null], [0.72, 60, C.teal, null]] });
    naamBij(ctx, '± 10 gigaton per jaar extra', 'wat miljoenen jaren lag', 1560, 640, 1, 'left', C.koraal); },
  e6q23(ctx) { e6Vraag(ctx, ['Wat gebeurt er met het niveau in de badkuip?'], ['Het stijgt: er komt meer in dan er uit kan', 'Het blijft gelijk: de oceaan neemt alles op', 'Het daalt: planten groeien harder en halen meer weg']); },
  e6s24(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM');
    e6Badkuip(ctx, 560, 760, 800, 360, { peil: 0.5, stijg: 50, kranen: [[0.22, 70, E6K.co2, null], [0.62, 60, C.teal, null], [0.92, 14, C.koraal, null]], afvoer: [[0.3, 76, C.groen, null], [0.72, 66, C.teal, null]] });
    naamBij(ctx, 'de helft blijft in de lucht', 'het niveau stijgt elk jaar', 960, 260, 1, 'center', C.goud); metaText(ctx, 'BROEIKASEFFECT: ZIE ÉÉN AARDE', 80, 880, C.text2, 'left', 26); },

  e6s25(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'VOORRAAD EN STROOM');
    e6Badkuip(ctx, 160, 760, 640, 300, { peil: 0.55, stijg: 30, kranen: [[0.25, 60, E6K.co2, null], [0.9, 14, C.koraal, null]], afvoer: [[0.4, 60, C.groen, null]] }); naamBij(ctx, '± 900 gigaton', 'in de lucht', 480, 620, 1, 'center');
    text(ctx, '6 ÷ 900 × 100 % ≈ 0,7 % per jaar', 1340, 380, fTekst(48, 700), C.goud, 'center'); naamBij(ctx, 'netto erbij: ± 6 gigaton per jaar', null, 1340, 280, 1, 'center');
    roundRect(ctx, 1000, 560, 500, 50, 10); shape(ctx, rgba(E6K.co2, 0.6), C.line, 2); roundRect(ctx, 1000, 640, 680, 50, 10); shape(ctx, rgba(E6K.co2, 0.9), C.line, 2);
    metaText(ctx, '1958', 980, 595, C.text2, 'right', 26); metaText(ctx, 'NU', 980, 675, C.text2, 'right', 26); naamBij(ctx, 'ruim een derde meer', null, 1340, 760, 1, 'center', C.goud); },
  // ================= VWO DE LIJN DIE ADEMT =================
  e6s26(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE LIJN DIE ADEMT'); vwoMarker(ctx); const P = e6Keeling(ctx, 300, 780, 1360, 520, 1958, 2025, {});
    naamBij(ctx, '± 315', 'in het jaar 1958', P.X(1960), P.Y(350), 1, 'left'); naamBij(ctx, '± 430', 'nu', P.X(2025) - 20, P.Y(430) - 40, 1, 'right'); },
  e6s27(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE LIJN DIE ADEMT'); vwoMarker(ctx); const P = e6Keeling(ctx, 300, 780, 1360, 520, 2021, 2024, { pmin: 410, pmax: 430, trend: true, stap: 1 / 48 });
    for (const j of [2021, 2022, 2023]) { const jm = j + 0.37, jo = j + 0.79; naamBij(ctx, 'mei', null, P.X(jm), P.Y(e6KeelingWaarde(jm)) - 30, 1, 'center', C.text); naamBij(ctx, 'okt', null, P.X(jo), P.Y(e6KeelingWaarde(jo)) + 60, 1, 'center', C.text); }
    naamBij(ctx, '± 6 ppm', 'op en neer', 1780, 420, 1, 'right', '#D2D8E2'); naamBij(ctx, 'trend', null, P.X(2023.6), P.Y(424.5) - 60, 1, 'center', C.goud); },
  e6q28(ctx) { e6Vraag(ctx, ['Waarom daalt de lijn juist van mei tot oktober?'], ["In de zomer ademen planten niet, dus er komt geen koolstofdioxide bij", 'Op het noordelijk halfrond haalt fotosynthese dan meer weg dan alles samen afgeeft', 'In de zomer verbranden we minder brandstof']); },
  e6s29(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE LIJN DIE ADEMT'); vwoMarker(ctx); e11Aarde(ctx, 560, 500, 300, 1, 0);
    const P = e6Keeling(ctx, 1040, 760, 760, 380, 2021, 2024, { pmin: 410, pmax: 430, titel: false, stap: 1 / 48 });
    naamBij(ctx, 'noordelijk halfrond', 'meeste land en bos', 560, 140, 1, 'center'); naamBij(ctx, 'zomer: meer fotosynthese', 'lijn omlaag', 1420, 300, 1, 'center', C.groen); },
  e6s30(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'DE LIJN DIE ADEMT'); vwoMarker(ctx);
    const pts = [[960, 240, 'warmer'], [1360, 640, 'oceaan neemt minder op'], [560, 640, 'meer CO₂ in de lucht']];
    for (let i = 0; i < 3; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % 3]; const k = i === 1 ? 0.34 : 0.22; pijl(ctx, lerp(x1, x2, k), lerp(y1, y2, k), lerp(x1, x2, 1 - k), lerp(y1, y2, 1 - k), C.koraal, 1, 6, 22); }
    pts.forEach(([x, y, n]) => { roundRect(ctx, x - 250, y - 50, 500, 100, 18); shape(ctx, '#2A3A58', C.line, 2); text(ctx, n, x, y + 12, fTekst(36, 700), C.text, 'center'); });
    haak(ctx, 560, 1360, 760, 'positieve terugkoppeling', C.koraal); },

  // ================= H4 OPSLAG OF KRINGLOOP? =================
  e6s31(ctx) { e6Straat(ctx, { grond: 880 }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 880); ecoTag(ctx, _F6, 'OPSLAG OF KRINGLOOP?');
    vul(ctx, [[-40, 760], [800, 730], [1980, 760], [1980, 880], [-40, 880]], C.bgMacroFront);
    persoon(ctx, 'noor', 520, 880, 330, { uit: 'blij', pose: 'wijs' }); ecoZomereik(ctx, 700, 880, 1.6, { groei: 0.25 });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 880); ctx.clip(); ecoZomereik(ctx, 1450, 880, 2.6, {}); ctx.restore();
    pijl(ctx, 1000, 700, 1180, 700, C.line, 1, 4, 18); naamBij(ctx, 'tientallen jaren later', null, 1090, 660, 1, 'center', C.text2); e6Co2(ctx, 1500, 160, 1.2); pijl(ctx, 1500, 190, 1480, 330, E6K.co2, 1, 5, 18);
    naamBij(ctx, 'droog hout: ± de helft is koolstof', null, 1450, 940, 1, 'center', C.groen); },
  e6q32(ctx) { e6Vraag(ctx, ['Is een bos een opslag of een kringloop?'], ['Alleen een opslag: wat het opneemt, blijft er voor altijd in', 'Alleen een kringloop: het geeft elk jaar alles weer terug', 'Allebei: er stroomt veel in en uit, en er ligt een grote voorraad']); },
  e6s33(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'OPSLAG OF KRINGLOOP?');
    [[480, 'jong bos', 0.3, 40], [1440, 'oud bos', 0.75, 12]].forEach(([x, n, p, st]) => { ctx.fillStyle = '#3A5540'; ctx.fillRect(x - 300, 470, 600, 40); for (let i = 0; i < 3; i++) ecoZomereik(ctx, x - 160 + i * 160, 470, n === 'jong bos' ? 1.4 : 1.8, { groei: n === 'jong bos' ? 0.35 : 1 });
      e6Badkuip(ctx, x - 260, 860, 520, 220, { peil: p, stijg: st, kranen: [[0.3, 46, C.groen, null]], afvoer: [[0.7, 40, E6K.co2, null]] }); naamBij(ctx, n, st > 20 ? 'legt netto veel vast' : 'legt vaak nog wat vast', x, 130, 1, 'center'); });
    metaText(ctx, 'BADKUIP = VOORRAAD IN HOUT EN BODEM', 960, 940 - 40, C.grain, 'center', 26); },
  e6s34(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'OPSLAG OF KRINGLOOP?');
    ecoZomereik(ctx, 520, 760, 1.6, {}); ctx.fillStyle = '#3A3026'; ctx.fillRect(300, 760, 440, 60); for (let i = 0; i < 6; i++) { const x = 440 + i * 30; vul(ctx, [[x, 760], [x + 14, 700 - hash(i) * 40], [x + 28, 760]], i % 2 ? C.koraal : C.goud); } e6Co2(ctx, 520, 160, 1.3); pijl(ctx, 520, 560, 520, 200, E6K.co2, 1, 8, 22);
    ctx.fillStyle = '#5A4A38'; roundRect(ctx, 1160, 700, 520, 70, 30); ctx.fill(); for (let i = 0; i < 9; i++) circ(ctx, 1200 + i * 55, 700 + (i % 2) * 10, 10, '#C9B896'); e6Co2(ctx, 1420, 420, 1.1); pijl(ctx, 1420, 680, 1420, 460, E6K.co2, 1, 4, 16);
    naamBij(ctx, 'verbranden', 'binnen uren terug', 520, 860, 1, 'center', C.koraal); naamBij(ctx, 'verteren', 'jaren tot tientallen jaren', 1420, 860, 1, 'center', '#C9B896'); },

  // ================= SAMENVATTING =================
  e6s35(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'SAMENVATTING');
    const R = [['varen', 220], ['veen', 470], ['steenkool', 720], ['schoorsteen', 970], ['lucht', 1220], ['eikenblad', 1470]];
    R.forEach(([n, x], i) => { roundRect(ctx, x - 100, 420, 200, 110, 18); shape(ctx, i < 3 ? '#2A3A58' : '#2E4A3A', C.line, 2); text(ctx, n, x, 488, fTekst(34, 700), C.text, 'center'); if (i < R.length - 1) pijl(ctx, x + 104, 475, x + 146, 475, C.goud, 1, 5, 16); });
    e6Atoom(ctx, 1470, 380, 16); metaText(ctx, 'MILJOENEN JAREN', 470, 600, C.grain, 'center', 26); metaText(ctx, 'JAREN', 1220, 600, C.grain, 'center', 26);
    haak(ctx, 120, 820, 640, 'trage kringloop', C.text2); haak(ctx, 870, 1570, 640, 'snelle kringloop', C.groen); },
  e6s36(ctx) { e6Bg(ctx); ecoTag(ctx, _F6, 'SAMENVATTING');
    const R = ['Koolstof gaat rond: fotosynthese legt het vast, dissimilatie, afbraak en verbranding geven het terug.', 'Waar afbraak stopt, ligt koolstof miljoenen jaren in veen, steenkool, olie, gas en kalksteen.', 'Fossiele brandstoffen verbranden voegt koolstof toe aan de lucht: het niveau in de badkuip stijgt.'];
    R.forEach((r, i) => { ctx.font = fTekst(44, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrap(ctx, r, 200, 300 + i * 150, 1500, 54); });
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(150, 240); ctx.lineTo(130, 240); ctx.lineTo(130, 700); ctx.lineTo(150, 700); ctx.stroke(); },
};
function e5WarmteE6(ctx, x, y) { ctx.save(); ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const dx = (i - 1) * 20; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20; const px = x + dx + Math.sin(u * 9 + i) * 6, py = y - u * 60; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
