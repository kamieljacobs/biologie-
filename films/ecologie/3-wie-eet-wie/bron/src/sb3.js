const _V3 = {"e3q05": {"v": ["Je tekent deze voedselketen met pijlen. Hoe loopt de pijl", "tussen het konijn en de vos?"], "o": ["Van het konijn naar de vos", "Van de vos naar het konijn: de vos eet het konijn", "Een lijn zonder richting: ze horen bij elkaar"]}, "e3q13": {"v": ["Het konijn eet een deel van het eikje. Het eikje blijft", "leven. Hoe heet deze relatie?"], "o": ["Predatie", "Parasitisme", "Vraat"]}, "e3q19": {"v": ["Kijk naar de piek van de hazen rond het jaar 1903. Wat", "doet de lijn van de lynx vlak daarna?"], "o": ["Hij daalt meteen mee", "Hij stijgt nog een jaar of twee door", "Hij blijft gelijk"]}, "e3q22": {"v": ["In een duingebied haal je alle vossen weg. Wat gebeurt er", "met de konijnen?"], "o": ["Ze verdwijnen ook", "Ze nemen toe tot voedsel of ziekte ze remt", "Ze groeien door tot het hele duin vol zit"]}, "e3q26": {"v": ["Wie heeft voordeel als een gaai eikels verstopt?"], "o": ["De gaai én de eik", "Alleen de gaai: hij eet de eikels later op", "Alleen de eik: zijn eikels komen in de grond"]}, "e3q36": {"v": ["Uit een eitje komt een larve. Die kan geen schaap", "besmetten. Eerst moet hij een kleine slak vinden. Waarom", "heeft de leverbot die slak nodig?"], "o": ["De slak is voedsel voor de larve", "De slak brengt de eitjes naar het schaap", "In de slak vermenigvuldigt de larve zich"]}, "e3q39": {"v": ["Een leverbot doodt zijn gastheer meestal niet snel. Hoe", "komt dat?"], "o": ["Snelle doders kregen minder nakomelingen", "Hij wil zijn gastheer sparen", "Een worm is te klein om te doden"]}};
// Ecologie v2 · film 3 Wie eet wie? — keyframes storyboard (één per scène). Laadt na teken_eco3.js. Vraagteksten in _V3 komen uit films/f3.json.
const _N = 3;
const _sch = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const _vk = (ctx, id) => ecoVraagKaart(ctx, _V3[id].v, _V3[id].o, _N);
const _G = 820; // grondlijn in duinscènes
const SB3 = {
  // ---------------- Opening
  e3s01(ctx) { e3Duin(ctx); ecoTag(ctx, _N, 'OPENING');
    [[1180, _G - 6, 'grazen', 0.1], [1330, _G + 14, 'zitten', 0], [1480, _G - 2, 'grazen', 0.5], [1620, _G + 20, 'grazen', 0.3], [1760, _G + 4, 'zitten', 0]].forEach(([x, y, h, t], i) => ecoKonijn(ctx, x, y, 3, { houding: h, t, kijk: i % 2 ? -1 : 1 }));
    ecoVos(ctx, 620, _G + 10, 3.2, { houding: 'sluipen', t: 0.35 });
    ecoSchaal(ctx, 'vos ± 1 m lang · konijn ± 40 cm'); },
  e3s02(ctx) { e3Duin(ctx); ecoTag(ctx, _N, 'OPENING');
    ecoVos(ctx, 760, _G + 10, 3.2, { houding: 'staan', kijk: 1 }); // de vos kijkt naar het lege stuk veld
    [[1240, _G, 'rennen', 0.2], [1420, _G + 14, 'rennen', 0.6], [1600, _G - 4, 'huppen', 0.4]].forEach(([x, y, h, t]) => ecoKonijn(ctx, x, y, 3, { houding: h, t }));
    // de teller van dagen in de lucht
    [1, 2, 3, 4, 5, 6, 7].forEach((d, i) => { roundRect(ctx, 640 + i * 96, 200, 76, 76, 12); shape(ctx, rgba(C.fill, 0.8), i < 5 ? C.line : C.goud, 1.5); text(ctx, String(d), 678 + i * 96, 252, fTekst(36, 700), C.text, 'center'); });
    metaText(ctx, 'DAG', 560, 248, C.text2, 'right', 28); naamBij(ctx, 'elk voorjaar weer konijnen', null, 960, 360, 1, 'center', C.goud); },
  e3s03(ctx) { ecoTitelKaart(ctx, _N, 'Wie eet wie?', ['Waarom eet een vos de konijnen', 'nooit allemaal op?'], (c) => {
    ctx.save(); ctx.beginPath(); ctx.arc(1440, 600, 300, 0, 6.283); ctx.clip(); e3Duin(c, { horizon: 520, helmPos: [[1240, 680, 1], [1650, 690, 0.8]] }); ecoVos(c, 1380, 760, 2.6, { houding: 'staan' }); ecoKonijn(c, 1620, 770, 2.6, { houding: 'zitten', kijk: -1 }); ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(1440, 600, 300, 0, 6.283); ctx.stroke(); }); },
  // ---------------- H1
  e3s04(ctx) { e3Duin(ctx, { helmPos: [[520, 900, 1.6], [1700, 860, 1.0]] }); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    ecoKonijn(ctx, 760, _G + 40, 3.4, { houding: 'grazen', t: 0.4 }); ecoVos(ctx, 1380, _G + 10, 3.0, { houding: 'staan', kijk: -1 });
    naamBij(ctx, 'helm', null, 330, 760, 1, 'center'); naamBij(ctx, 'konijn', null, 800, 640, 1, 'center'); naamBij(ctx, 'vos', null, 1360, 590, 1, 'center');
    metaText(ctx, 'VOEDSELKETEN', 960, 200, C.goud, 'center', 30); },
  e3q05(ctx) { _vk(ctx, 'e3q05'); },
  e3s06(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    const P = [[400, 520, 'helm'], [960, 520, 'konijn'], [1520, 520, 'vos']];
    e3Pijl(ctx, 400, 520, 960, 520, { r1: 120, r2: 120, lw: 6 }); e3Pijl(ctx, 960, 520, 1520, 520, { r1: 120, r2: 120, lw: 6 });
    circ(ctx, 1240, 520, 12, C.goud); // het voedsel reist mee
    P.forEach(([x, y, k]) => e3Knoop(ctx, x, y, k, E3P[k], { r: 112, focus: k === 'vos' }));
    text(ctx, 'wordt gegeten door', 680, 470, fTekst(36, 600), C.oker, 'center'); text(ctx, 'wordt gegeten door', 1240, 470, fTekst(36, 600), C.oker, 'center');
    haak(ctx, 300, 1620, 740, 'De pijl volgt het voedsel: van gegeten naar eter.', C.groen); },
  e3s07(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    e3Pijl(ctx, 400, 520, 960, 520, { r1: 120, r2: 120, lw: 6 }); e3Pijl(ctx, 960, 520, 1520, 520, { r1: 120, r2: 120, lw: 6 });
    e3Knoop(ctx, 400, 520, null, E3P.helm, { r: 112, rand: C.groen, focus: true }); e3Knoop(ctx, 960, 520, null, E3P.konijn, { r: 112 }); e3Knoop(ctx, 1520, 520, null, E3P.vos, { r: 112 });
    naamBij(ctx, 'producent', 'maakt zelf voedsel met licht', 400, 720, 1, 'center', C.groen);
    haak(ctx, 860, 1620, 660, 'consumenten', C.oker); },
  e3s08(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    const kol = [['herbivoor', 'eet planten', 400], ['omnivoor', 'eet planten én dieren', 960], ['carnivoor', 'eet vooral dieren', 1520]];
    kol.forEach(([n, m, x]) => { roundRect(ctx, x - 250, 200, 500, 600, 20); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); naamBij(ctx, n, m, x, 270, 1, 'center'); });
    e3Knoop(ctx, 400, 520, 'konijn', E3P.konijn, { r: 110 });
    e3Knoop(ctx, 960, 470, 'vos', E3P.vos, { r: 110, focus: true }); e3Knoop(ctx, 860, 700, null, E3P.muis, { r: 62 }); e3Knoop(ctx, 1060, 700, null, E3P.braam, { r: 62 });
    metaText(ctx, 'en ook: aaseter', 960, 860, C.text2, 'center', 28);
    ctx.save(); ctx.globalAlpha = 0.35; e3Knoop(ctx, 1520, 520, null, E3P.vos, { r: 110 }); ctx.restore(); },
  e3s09(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL'); e3Web(ctx, { focus: ['muis', 'rups', 'merel'] }); metaText(ctx, 'VOEDSELWEB · DUINEN', 1780, 140, C.goud, 'right', 30); },
  e3s10(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    [[790, 'PRODUCENTEN'], [540, 'CONSUMENT 1E ORDE'], [280, 'CONSUMENT 2E ORDE']].forEach(([y, l]) => { roundRect(ctx, 150, y - 105, 1460, 210, 18); shape(ctx, rgba(C.fill, 0.35), rgba(C.line, 0.5), 1); metaText(ctx, l, 1640, y + 10, C.text2, 'left', 26); });
    e3Web(ctx, { focus: ['vos'], extra: (c) => { ctx.save(); ctx.globalAlpha = 0.35; e3Knoop(c, 1190, 540, null, E3P.vos, { r: 50 }); ctx.restore(); naamBij(c, 'ook 1e orde (bramen)', null, 1250, 470, 1, 'left', C.text2); } }); },
  e3s11(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H1 PIJLEN VAN VOEDSEL');
    e3Web(ctx, { dim: ['muis'], dik: ['konijn-vos'], focus: ['konijn'], extra: (c) => { for (let i = 0; i < 5; i++) { const x = 690 + i * 34, y = 890 - (i % 2) * 6; ctx.beginPath(); ctx.ellipse(x, y, 10, 14, 0.3, 0, 6.283); shape(ctx, '#A06C36', '#BC8A50', 1.5); } } });
    naamBij(ctx, 'minder muizen', null, 760, 450, 1, 'center', C.koraal); },
  // ---------------- H2
  e3s12(ctx) { e3Duin(ctx, { helmPos: [[260, 800, 1], [1750, 850, 1.1]] }); ecoTag(ctx, _N, 'H2 ETEN ZONDER TE DODEN');
    e3Boom(ctx, 'eik', 1080, _G + 40, 5.2, { groei: 0.3 }); ecoKonijn(ctx, 900, _G + 44, 5.2, { houding: 'grazen', t: 0.6 });
    naamBij(ctx, 'jonge eik', 'een paar jaar oud', 1200, 380, 1, 'left'); ecoSchaal(ctx, 'eikje ± 70 cm · konijn ± 40 cm'); },
  e3q13(ctx) { _vk(ctx, 'e3q13'); },
  e3s14(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H2 ETEN ZONDER TE DODEN');
    for (const [x, t, m] of [[520, 'vraat', 'de plant leeft door'], [1400, 'predatie', 'de prooi gaat dood']]) { roundRect(ctx, x - 380, 180, 760, 620, 22); shape(ctx, rgba(C.fill, 0.5), C.line, 1.5); naamBij(ctx, t, m, x, 260, 1, 'center'); }
    e3Boom(ctx, 'eik', 660, 740, 4.4, { groei: 0.3 }); ecoKonijn(ctx, 480, 740, 4.4, { houding: 'grazen' });
    ecoVos(ctx, 1330, 740, 3.6, { houding: 'staan' }); ecoKonijn(ctx, 1620, 740, 3.8, { houding: 'zitten', kijk: -1, a: 0.35 });
    e3Teken(ctx, 400, 400, '+'); e3Teken(ctx, 640, 400, '−'); e3Teken(ctx, 1280, 400, '+'); e3Teken(ctx, 1560, 400, '−'); },
  e3s15(ctx) { e3Duin(ctx, { helm: false }); ecoTag(ctx, _N, 'H2 ETEN ZONDER TE DODEN');
    e3Braam(ctx, 280, _G + 20, 1.6); e3Boom(ctx, 'eik', 1500, _G + 20, 2.2, { groei: 0.25 });
    zoomCircle(ctx, 640, 360, 210, 520, 690, 'stekels · ± 5 mm', 1, () => { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(400, 120, 480, 480); e3Braam(ctx, 330, 600, 4.2, { bramen: 0 }); });
    zoomCircle(ctx, 1220, 360, 210, 1460, 640, 'looizuren · bitter', 1, () => { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(980, 120, 480, 480); ecoEikenblad(ctx, 1220, 360, 28, { stadium: 0, hoek: -0.5 }); });
    // zomerbalk: gehalte looizuren stijgt
    metaText(ctx, 'MEI', 1060, 860, C.text2, 'left', 26); metaText(ctx, 'SEPT', 1380, 860, C.text2, 'right', 26); for (let i = 0; i < 8; i++) { ctx.fillStyle = rgba(C.groen, 0.25 + i * 0.09); ctx.fillRect(1060 + i * 40, 800, 36, 24); } },
  // ---------------- H3
  e3s16(ctx) { e3Sneeuwbos(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN');
    ecoSneeuwschoenhaas(ctx, 620, 830, 3.4, { houding: 'zitten', vacht: 'winter' }); ecoLynx(ctx, 1300, 820, 3.2, { houding: 'lopen', t: 0.3, kijk: -1 });
    naamBij(ctx, 'sneeuwschoenhaas', 'wintervacht', 620, 600, 1, 'center'); naamBij(ctx, 'lynx', 'Canadese lynx', 1300, 520, 1, 'center'); metaText(ctx, 'CANADA', 1780, 140, C.goud, 'right', 30); },
  e3s17(ctx) { e3Sneeuwbos(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN');
    ecoLynx(ctx, 760, 830, 3.2, { houding: 'sprinten', t: 0.4 }); ecoSneeuwschoenhaas(ctx, 1320, 830, 3.2, { houding: 'rennen', t: 0.5, vacht: 'winter' });
    roundRect(ctx, 1380, 190, 380, 130, 16); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, '± 1 haas', 1570, 250, fTekst(44, 700), C.text, 'center'); metaText(ctx, 'per 1–2 dagen', 1570, 296, C.text2, 'center', 26); },
  e3s18(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN'); e3Grafiek(ctx, { tot: 13 });
    naamBij(ctx, 'sneeuwschoenhaas', null, 760, 210, 1, 'left', C.teal); naamBij(ctx, 'lynx', null, 560, 450, 1, 'left', C.oker);
    metaText(ctx, 'PELSHANDEL CANADA · VANGSTEN, GEEN TELLINGEN', 1780, 140, C.text2, 'right', 26); },
  e3q19(ctx) { _vk(ctx, 'e3q19'); },
  e3s20(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN'); e3Grafiek(ctx, { pieken: true });
    pijl(ctx, 446, 880, 504, 880, C.goud, 1, 3, 14); pijl(ctx, 1146, 880, 1274, 880, C.goud, 1, 3, 14); metaText(ctx, '1 JAAR', 476, 930, C.goud, 'center', 26); metaText(ctx, '2 JAAR', 1210, 930, C.goud, 'center', 26);
    naamBij(ctx, 'de prooi gaat voor, de rover volgt', 'golf van ± 10 jaar', 1780, 150, 1, 'right', C.goud); },
  e3s21(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN');
    const V = [[960, 210, 'veel hazen', 'haas', 1.3], [1420, 520, 'meer lynxen', 'lynx', 1.3], [960, 790, 'minder hazen', 'haas', 0.7], [500, 520, 'minder lynxen', 'lynx', 0.7]];
    for (let i = 0; i < 4; i++) { const [x1, y1] = V[i], [x2, y2] = V[(i + 1) % 4]; e3Pijl(ctx, x1, y1, x2, y2, { r1: 130, r2: 130, kl: C.line, lw: 3 }); }
    V.forEach(([x, y, n, k, f], i) => e3Knoop(ctx, x, y, null, (c, xx, yy, r) => E3P[k](c, xx, yy, r * f), { r: 96, focus: i === 0 }));
    V.forEach(([x, y, n], i) => naamBij(ctx, n, null, x + (i === 1 ? 120 : i === 3 ? -120 : 0), y + (i === 0 ? -120 : i === 2 ? 150 : 8), 1, i === 1 ? 'left' : i === 3 ? 'right' : 'center')); },
  e3q22(ctx) { _vk(ctx, 'e3q22'); },
  e3s23(ctx) { e3Duin(ctx, { helm: false }); ecoTag(ctx, _N, 'H3 DE GOLVEN');
    vul(ctx, [[-60, 740], [600, 720], [1200, 760], [1990, 730], [1990, H], [-60, H]], '#6A6A48'); // kaal, geel geworden gras
    for (let i = 0; i < 18; i++) { const x = 140 + i * 95 + 30 * hash(i), y = 790 + 50 * hash(i + 4); ecoKonijn(ctx, x, y, 2.4, { houding: i % 3 ? 'zitten' : 'grazen', kijk: i % 2 ? 1 : -1, a: i % 7 === 2 || i % 9 === 4 ? 1 : 0.35 }); }
    naamBij(ctx, 'myxomatose', 'in de jaren vijftig · > 9 op de 10 dood', 960, 300, 1, 'center', C.koraal); },
  e3s24(ctx) { e3Duin(ctx); ecoTag(ctx, _N, 'H3 DE GOLVEN');
    ecoVos(ctx, 760, _G + 10, 3.2, { houding: 'muizensprong', t: 0.45 }); muis(ctx, 940, _G + 20, 6, {});
    ecoKonijn(ctx, 1460, _G, 3, { houding: 'zitten', kijk: -1 }); ecoKonijn(ctx, 1600, _G + 10, 3, { houding: 'grazen' });
    vul(ctx, [[1520, _G + 18], [1560, _G - 10], [1620, _G + 18]], '#1E2A24'); // hol
    naamBij(ctx, 'sinds het jaar 1968 terug', null, 760, 420, 1, 'center', C.text2);
    haak(ctx, 1380, 1680, _G + 40, 'Er blijven er altijd over.', C.groen); },
  // ---------------- H4
  e3s25(ctx) { e3Duin(ctx, { helm: false });
    const stam = (x, w) => { ctx.beginPath(); ctx.moveTo(x - w / 2 - 18, _G + 34); ctx.quadraticCurveTo(x - w / 2, _G - 20, x - w * 0.45, 0); ctx.lineTo(x + w * 0.45, 0); ctx.quadraticCurveTo(x + w / 2, _G - 20, x + w / 2 + 18, _G + 34); ctx.closePath(); shape(ctx, '#5A4632', '#6E5844', 2); ctx.strokeStyle = '#4A3828'; ctx.lineWidth = 3; for (let k = 0; k < 7; k++) { const xx = x - w * 0.35 + k * w * 0.11; ctx.beginPath(); ctx.moveTo(xx, _G + 20); ctx.bezierCurveTo(xx + 8, 600, xx - 8, 300, xx + 4, 0); ctx.stroke(); } };
    stam(260, 220); stam(1720, 170); ctx.fillStyle = '#4A3A2C'; ctx.fillRect(0, _G + 30, W, 4); ecoTag(ctx, _N, 'H4 SAMENLEVEN');
    ecoGaai(ctx, 960, _G + 30, 4, { houding: 'duwen', t: 0.35 });
    naamBij(ctx, 'gaai', '± 34 cm', 960, 640, 1, 'center'); naamBij(ctx, 'stam van een oude eik', null, 420, 500, 1, 'left'); ecoSchaal(ctx, 'gaai ± 34 cm · eikenstam ± 55 cm breed'); },
  e3q26(ctx) { _vk(ctx, 'e3q26'); },
  e3s27(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H4 SAMENLEVEN');
    roundRect(ctx, 180, 160, 1100, 680, 24); shape(ctx, '#2F4A3A', '#5A7A62', 2); metaText(ctx, 'DUINBOS · BOVENAANZICHT', 200, 140, C.text2, 'left', 26);
    for (const [x, y, r] of [[360, 330, 70], [620, 260, 60], [980, 360, 80], [460, 620, 64], [1100, 660, 70]]) circ(ctx, x, y, r, '#3F6B4A', '#5A8A62', 2);
    for (let i = 0; i < 70; i++) { const x = 230 + hash(i) * 1000, y = 200 + hash(i + 80) * 600; const kiem = i % 17 === 3; circ(ctx, x, y, kiem ? 14 : 10, kiem ? C.groen : rgba(C.oker, i % 5 ? 0.35 : 1)); }
    naamBij(ctx, '± 5000 eikels', 'in één herfst', 1560, 380, 1, 'center', C.oker); naamBij(ctx, 'vergeten → nieuwe eik', null, 1560, 560, 1, 'center', C.groen);
    ecoGaai(ctx, 1560, 800, 5, { houding: 'eikel' }); },
  e3s28(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H4 SAMENLEVEN');
    ecoGaai(ctx, 640, 760, 11, { houding: 'eikel' }); e3Boom(ctx, 'eik', 1260, 820, 3.2, {});
    e3Teken(ctx, 640, 260, '+', { r: 48 }); e3Teken(ctx, 1260, 200, '+', { r: 48 });
    naamBij(ctx, 'voedsel', null, 640, 350, 1, 'center'); naamBij(ctx, 'verspreid', null, 1260, 290, 1, 'center');
    text(ctx, 'mutualisme', 960, 880, fTekst(48, 700), C.groen, 'center'); },
  e3s29(ctx) { e3Duin(ctx, { helm: false }); ecoTag(ctx, _N, 'H4 SAMENLEVEN');
    vul(ctx, [[300, _G + 60], [700, 560], [1100, 520], [1500, 600], [1800, _G + 60]], '#C9A86A', '#DCC08A', 2); // duinhelling
    e3Hol(ctx, 1040, 700, 1.3); e3Hol(ctx, 1400, 690, 1.3);
    e3Bergeend(ctx, 860, 716, 3.6, { kijk: 1 }); ecoKonijn(ctx, 1520, 700, 3.6, { houding: 'zitten', kijk: -1 });
    e3Teken(ctx, 820, 420, '+', { r: 40 }); e3Teken(ctx, 1520, 450, '0', { r: 40 });
    naamBij(ctx, 'bergeend', 'broedt in het hol', 820, 340, 1, 'center'); naamBij(ctx, 'konijn', 'merkt er nauwelijks iets van', 1520, 370, 1, 'center'); ecoSchaal(ctx, 'bergeend ± 60 cm · konijn ± 40 cm'); naamBij(ctx, 'commensalisme', null, 960, 880, 1, 'center', C.groen); },
  e3s30(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H4 SAMENLEVEN'); metaText(ctx, 'SYMBIOSE: LANG EN NAUW SAMENLEVEN', 260, 200, C.goud, 'left', 30);
    const R = [['mutualisme', '+', '+', 'gaai en eik'], ['commensalisme', '+', '0', 'bergeend en konijn'], ['parasitisme', '+', '−', 'leverbot en schaap']];
    R.forEach(([n, a, b, v], i) => { const y = 300 + i * 150; text(ctx, n, 260, y + 14, fTekst(44, 700), C.text, 'left'); e3Teken(ctx, 880, y, a); e3Teken(ctx, 980, y, b); text(ctx, v, 1080, y + 12, fTekst(38, 500), C.text2, 'left'); });
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(260, 700); ctx.lineTo(1660, 700); ctx.stroke();
    text(ctx, 'predatie', 260, 784, fTekst(44, 700), C.text2, 'left'); e3Teken(ctx, 880, 770, '+', { a: 0.6 }); e3Teken(ctx, 980, 770, '−', { a: 0.6 }); text(ctx, 'prooi gaat meteen dood', 1080, 782, fTekst(38, 500), C.text2, 'left'); },
  e3s31(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H4 SAMENLEVEN'); vwoMarker(ctx);
    persoon(ctx, 'noor', 440, 900, 600, { uit: 'neutraal' });
    zoomCircle(ctx, 1220, 470, 330, 450, 650, 'dikke darm · vergroot ± 2000×', 1, () => e3Darm(ctx, 1220, 470, 330));
    naamBij(ctx, 'bacteriën', 'ongeveer evenveel als je cellen', 1220, 110, 1, 'center'); e3Teken(ctx, 1640, 300, '+', { r: 34 }); e3Teken(ctx, 1730, 300, '+', { r: 34 }); naamBij(ctx, 'mens', null, 1640, 380, 1, 'center'); naamBij(ctx, 'bacterie', null, 1760, 380, 1, 'left'); },
  e3s32(ctx) { e3Duin(ctx, { helm: false, horizon: 420 }); ecoTag(ctx, _N, 'H4 SAMENLEVEN'); vwoMarker(ctx);
    vul(ctx, [[-60, 600], [400, 580], [900, 610], [1990, 590], [1990, H], [-60, H]], '#3A2E24'); e3Boom(ctx, 'den', 420, 600, 2.2, { groei: 0.5 }); lijn(ctx, [[420, 600], [432, 700], [404, 790]], '#C9A880', 10); lijn(ctx, [[428, 660], [500, 720], [540, 790]], '#C9A880', 7);
    zoomCircle(ctx, 1300, 470, 330, 420, 790, 'worteltop met schimmeldraden · vergroot', 1, () => e3Mycorrhiza(ctx, 1300, 470, 330));
    naamBij(ctx, 'mycorrhiza', 'jonge grove den', 1300, 112, 1, 'center'); naamBij(ctx, 'water, mineralen → wortel', null, 950, 200, 1, 'right', ECOK.stikstof); naamBij(ctx, 'suikers → schimmel', null, 950, 260, 1, 'right', C.groen); },
  // ---------------- H5
  e3s33(ctx) { e3Duin(ctx, { helm: false }); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    vul(ctx, [[600, 860], [900, 830], [1300, 850], [1500, 880], [1100, 900], [700, 900]], '#3E6A7A'); // plas in de duinvallei
    [[300, 800, 'grazen'], [520, 820, 'grazen'], [760, 790, 'staan']].forEach(([x, y, h], i) => ecoSchaap(ctx, x, y, 2.6, { houding: h, kijk: i % 2 ? -1 : 1 }));
    ecoSchaap(ctx, 1240, 790, 2.6, { houding: 'staan', kijk: -1 });
    persoon(ctx, 'gerrit', 1600, 830, 440, { zij: true, kijk: -1, gang: 'loop', t: 0.3 });
    naamBij(ctx, 'mager schaap', null, 1240, 520, 1, 'center', C.koraal); },
  e3s34(ctx) { e3Duin(ctx, { helm: false }); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    ecoSchaap(ctx, 760, _G + 10, 3.2, { houding: 'staan' }); persoon(ctx, 'mila', 1180, _G + 20, 520, { pose: 'wijsOmhoog', kijk: -1 }); persoon(ctx, 'gerrit', 1520, _G + 20, 540, { pose: 'denk', kijk: -1 });
    naamBij(ctx, 'dierenarts', 'onderzoekt de mest', 1180, 200, 1, 'center'); naamBij(ctx, 'schapenhouder', null, 1560, 230, 1, 'center'); },
  e3s35(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    ecoSchaap(ctx, 420, 760, 3.2, { houding: 'staan' }); ctx.beginPath(); ctx.ellipse(470, 600, 52, 34, -0.2, 0, 6.283); shape(ctx, rgba('#8C4A42', 0.9), C.goud, 2); // plek van de lever: in de buik, rechterflank, net achter het middenrif
    zoomCircle(ctx, 1240, 460, 340, 470, 600, 'lever · schematisch · niet op schaal', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(900, 120, 680, 680); e3Lever(ctx, 1240, 460, 1.4); e3Leverbot(ctx, 1170, 380, 0.42, { rot: -0.6 }); e3Leverbot(ctx, 1330, 470, 0.38, { rot: 0.3 }); for (let i = 0; i < 6; i++) e3Ei(ctx, 1230 + i * 14, 560 + i * 18, 7); });
    naamBij(ctx, 'leverbot', '± 3 cm', 1240, 290, 1, 'center'); },
  e3q36(ctx) { _vk(ctx, 'e3q36'); },
  e3s37(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    const cx = 960, cy = 480, R = 330; const st = [
      [-90, 'schaap', (x, y) => ecoSchaap(ctx, x, y + 60, 1.6, { houding: 'grazen' })],
      [-30, 'eitjes in mest', (x, y) => { for (let i = 0; i < 4; i++) e3Ei(ctx, x - 30 + i * 20, y + (i % 2) * 10, 12); }],
      [30, 'larve in water', (x, y) => { ctx.beginPath(); ctx.ellipse(x, y + 20, 80, 26, 0, 0, 6.283); ctx.fillStyle = rgba('#3E6A7A', 0.8); ctx.fill(); e3Trilhaarlarve(ctx, x, y + 10, 26); }],
      [90, 'slak', (x, y) => ecoLeverbotslak(ctx, x, y + 40, 60, {})],
      [150, 'honderden larven', (x, y) => { for (let i = 0; i < 7; i++) e3Cercarie(ctx, x - 50 + (i % 4) * 32, y - 20 + Math.floor(i / 4) * 34, 11, 0.4 * i); }],
      [210, 'cysten op gras', (x, y) => { e3Grasspriet(ctx, x, y + 60, 120); e3Cyste(ctx, x + 2, y - 10, 11); e3Cyste(ctx, x + 4, y + 26, 11); }]];
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke(); ctx.setLineDash([]);
    st.forEach(([g, n, f], i) => { const a = g * Math.PI / 180, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; circ(ctx, x, y, 100, rgba(C.fill, 0.95), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, 98, 0, 6.283); ctx.clip(); f(x, y); ctx.restore();
      const vert = Math.abs(Math.cos(a)) < 0.3; const nx = vert ? x + 125 : cx + Math.cos(a) * (R + 125), ny = vert ? y + 12 : cy + Math.sin(a) * (R + 125) + 12; naamBij(ctx, n, null, nx, ny, 1, vert || Math.cos(a) > 0.3 ? 'left' : 'right');
      const a2 = a + Math.PI / 3, b1 = a + 0.36, b2 = a2 - 0.36; pijl(ctx, cx + Math.cos(b1) * R, cy + Math.sin(b1) * R, cx + Math.cos(b2) * R, cy + Math.sin(b2) * R, C.oker, 1, 3, 14); });
    metaText(ctx, 'schematisch · stadia vergroot', 80, 880, C.text2, 'left', 26); },
  e3s38(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    circ(ctx, 600, 470, 230, rgba(C.fill, 0.95), C.goud, 3); ecoSchaap(ctx, 600, 620, 3.2, { houding: 'staan' }); naamBij(ctx, 'eindgastheer', 'volwassen worm · eitjes', 600, 790, 1, 'center', C.goud);
    circ(ctx, 1320, 470, 230, rgba(C.fill, 0.95), C.goud, 3); ecoLeverbotslak(ctx, 1320, 540, 150, {}); naamBij(ctx, 'tussengastheer', 'larven vermenigvuldigen', 1320, 790, 1, 'center', C.goud);
    text(ctx, '1 → honderden', 1320, 230, fTekst(48, 700), C.goud, 'center'); },
  e3q39(ctx) { _vk(ctx, 'e3q39'); },
  e3s40(ctx) { _sch(ctx); ecoTag(ctx, _N, 'H5 TWEE GASTHEREN');
    const rij = (y, lang, a) => { ctx.save(); ctx.globalAlpha = a; ecoSchaap(ctx, 300, y + 60, 1.6, { houding: 'staan' }); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(460, y + 30); ctx.lineTo(460 + lang, y + 30); ctx.stroke();
      for (let i = 0; i < Math.round(lang / 40); i++) e3Ei(ctx, 480 + i * 40, y, 10); ctx.restore(); };
    rij(300, 1200, 1); rij(560, 260, 0.35);
    metaText(ctx, 'SCHAAP LEEFT LANG · VEEL EITJES', 480, 260, C.text2, 'left', 26); metaText(ctx, 'SCHAAP STERFT SNEL · WEINIG EITJES', 480, 520, C.text2, 'left', 26);
    haak(ctx, 460, 1660, 700, 'Niet willen: wie snel doodt, laat minder nakomelingen na.', C.groen); },
  // ---------------- Samenvatting
  e3s41(ctx) { _sch(ctx); ecoTag(ctx, _N, 'SAMENVATTING');
    e3Web(ctx, { focus: ['vos'], extra: (c) => { for (const [k, n] of [['helm', 2], ['konijn', 4], ['vos', 8]]) { const [x, y] = E3WEB[k]; for (let i = 0; i < n; i++) circ(c, x + 82 + (i % 4) * 24, y - 50 + Math.floor(i / 4) * 24, 9, C.koraal); } } });
    naamBij(ctx, 'accumulatie', 'zie de film Eén aarde', 1560, 760, 1, 'center', C.koraal); },
  e3s42(ctx) { _sch(ctx); ecoTag(ctx, _N, 'SAMENVATTING');
    e3Web(ctx, { extra: (c) => { e3Teken(c, 1030, 230, '+', { r: 24 }); e3Teken(c, 840, 760, '+', { r: 24 }); } });
    roundRect(ctx, 1500, 160, 360, 300, 18); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); e3Bergeend(ctx, 1600, 330, 1.7); ecoKonijn(ctx, 1770, 330, 1.6, { houding: 'zitten', kijk: -1 }); e3Teken(ctx, 1600, 210, '+', { r: 24 }); e3Teken(ctx, 1770, 210, '0', { r: 24 }); naamBij(ctx, 'commensalisme', null, 1680, 410, 1, 'center');
    roundRect(ctx, 1500, 560, 360, 300, 18); shape(ctx, rgba(C.fill, 0.9), C.line, 1.5); e3Knoop(ctx, 1600, 690, null, E3P.schaap, { r: 60 }); e3Knoop(ctx, 1770, 690, null, E3P.slak, { r: 60 });
    e3Teken(ctx, 1600, 600, '−', { r: 24 }); naamBij(ctx, 'leverbot', null, 1680, 830, 1, 'center'); },
  e3s43(ctx) { e3Duin(ctx); ecoTag(ctx, _N, 'SAMENVATTING');
    vul(ctx, [[1100, 760], [1300, 640], [1500, 760]], '#4A5E4C'); ecoVos(ctx, 1300, 650, 2.6, { houding: 'staan', kijk: -1 });
    [[420, _G + 20, 'grazen'], [580, _G, 'zitten'], [760, _G + 30, 'grazen'], [880, _G + 10, 'zitten']].forEach(([x, y, h], i) => ecoKonijn(ctx, x, y, 2.8, { houding: h, kijk: i % 2 ? -1 : 1 }));
    ctx.save(); ctx.translate(240, 120); ctx.scale(0.32, 0.3); e3Grafiek(ctx, { x: 200, y: 700, w: 1400, h: 520 }); ctx.restore(); },
  e3s44(ctx) { _sch(ctx); ecoTag(ctx, _N, 'EINDKAART');
    ['De pijl wijst van voedsel naar eter.', 'Rover en prooi golven samen.', 'Symbiose: +/+, +/0 of +/−.'].forEach((r, i) => text(ctx, r, 200, 330 + i * 130, fTekst(56, 600), C.text, 'left'));
    ctx.strokeStyle = C.groen; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(170, 270); ctx.lineTo(150, 270); ctx.lineTo(150, 620); ctx.lineTo(170, 620); ctx.stroke(); },
};
