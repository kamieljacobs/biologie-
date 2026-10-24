// Evolutie v2 — extra film 4 (sleutel e12) 'Hoe werden we mens?' — storyboard: één keyframe per scène (23 okt 2026).
// Laad: e12_land, pop_rept_chimp, teken_evo12, sb12  →  python3 render.py e12_land,pop_rept_chimp,teken_evo12,sb12 SB12
const e12Tag = (ctx, hfst) => metaText(ctx, 'EVOLUTIE · EXTRA 4/4 · ' + hfst, 80, 78, C.text2, 'left', 26);
const e12Schema = (ctx, hfst) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e12Tag(ctx, hfst); };
const e12Vraag = (ctx, vraag, opties) => { vraagKaart(ctx, vraag, opties); ctx.fillStyle = C.bgSchema; ctx.fillRect(60, 40, 900, 60); e12Tag(ctx, 'VRAAG'); };
function e12Eind(ctx, zinnen) { e12Schema(ctx, 'SAMENVATTING'); zinnen.forEach((z, i) => text(ctx, z, 160, 300 + i * 120, fTekst(48, 600), C.text, 'left'));
  ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 240); ctx.lineTo(116, 240); ctx.lineTo(116, 300 + (zinnen.length - 1) * 120 + 20); ctx.lineTo(130, 300 + (zinnen.length - 1) * 120 + 20); ctx.stroke(); }
// schaal voor mensfiguren in Macro-scènes: 1 cm = PX px
const E12PX = 3.0;
const e12H = (soort, k = E12PX) => E12_SOORT[soort].H * k;
// wereldkaart-uitsneden
const E12_EURAZIE = { lon: [-20, 150], lat: [-45, 66] };
const NEA_GEBIED = [[-10, 43], [-9, 50], [-3, 53], [5, 54], [20, 54], [40, 55], [60, 54], [80, 53], [88, 51], [84, 45], [62, 37], [45, 31], [35, 31], [25, 36], [12, 39], [0, 36]];
function e12Lat(ctx, x, y, h, cm, o = {}) { const { kleur = C.goud } = o; lijn(ctx, [[x, y], [x, y - h]], kleur, 3); for (let i = 0; i <= 10; i++) lijn(ctx, [[x, y - h * i / 10], [x + (i % 5 ? 10 : 18), y - h * i / 10]], kleur, 2);
  metaText(ctx, cm, x + 26, y - h + 10, kleur, 'left', 26); }
function e12Doorstreep(ctx, x1, y1, x2, y2) { pijl(ctx, x1, y1, x2, y2, C.text2, 1, 5, 22); lijn(ctx, [[(x1 + x2) / 2 - 40, (y1 + y2) / 2 - 40], [(x1 + x2) / 2 + 40, (y1 + y2) / 2 + 40]], C.koraal, 7); lijn(ctx, [[(x1 + x2) / 2 + 40, (y1 + y2) / 2 - 40], [(x1 + x2) / 2 - 40, (y1 + y2) / 2 + 40]], C.koraal, 7); }
function e12Boom(ctx, x, y, s = 1) { lijn(ctx, [[x, y], [x - 6 * s, y - 260 * s]], '#3A2E24', 18 * s); lijn(ctx, [[x - 4 * s, y - 180 * s], [x + 70 * s, y - 250 * s]], '#3A2E24', 9 * s);
  vul(ctx, [[x - 160 * s, y - 250 * s], [x - 20 * s, y - 320 * s], [x + 150 * s, y - 270 * s], [x + 70 * s, y - 230 * s], [x - 90 * s, y - 225 * s]], '#2E5040'); }
const SB12 = {
  // ---------- Opening ----------
  e12s01(ctx) { e12Steppe(ctx, { horizon: 600 }); e12Tag(ctx, 'OPENING');
    // dal: links (voorgrond) Homo sapiens, rechts op de andere helling neanderthalers bij een vuur (verder weg = kleiner)
    vul(ctx, [[1100, 760], [1350, 700], [1700, 690], [1980, 720], [1980, 900], [1100, 900]], '#34503E');
    e12Vuur(ctx, 1560, 740, 0.55, { t: 0.3 }); e12Mens(ctx, 'neanderthaler', 1470, 745, e12H('neanderthaler', 1.5), { kijk: -1 }); e12Mens(ctx, 'neanderthalerV', 1660, 745, e12H('neanderthalerV', 1.5), { kijk: -1 });
    e12Mens(ctx, 'sapiens', 300, 900, e12H('sapiens'), { pose: 'loop', t: 0.15, hold: (c, x, y) => e12Speer(c, x - 150, y + 150, x + 120, y - 330, { w: 7 }) });
    e12Mens(ctx, 'sapiens', 540, 905, e12H('sapiens') * 0.95, { pose: 'wijs' });
    naamBij(ctx, 'Homo sapiens', null, 420, 330, 1, 'center'); naamBij(ctx, 'neanderthalers', null, 1560, 470, 1, 'center', C.oker);
    evoSchaal(ctx, '±45 000 jaar geleden · Europa · reconstructie'); },
  e12s02(ctx) { e12Schema(ctx, 'OPENING'); const K = e12Kaart(ctx, 160, 150, 1600, 700, { lon: [-25, 165], lat: [-42, 68] });
    e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.3 }); e12Gebied(ctx, K, [[78, 56], [86, 54], [90, 50], [84, 48], [78, 50]], C.koraal, { a: 0.4 });
    e12Gebied(ctx, K, [[119, -8], [122, -8.2], [123, -8.8], [120, -9]], C.groen, { a: 0.7 }); e12Gebied(ctx, K, [[-15, 30], [10, 33], [40, 30], [50, 12], [42, -10], [30, -30], [15, -32], [10, -5], [-15, 12]], C.teal, { a: 0.25 });
    naamBij(ctx, 'neanderthaler', null, K.X(15), K.Y(60), 1, 'center', C.oker); naamBij(ctx, 'denisovamensen', null, K.X(97), K.Y(60), 1, 'center', C.koraal);
    naamBij(ctx, 'Homo floresiensis', null, K.X(121), K.Y(-15), 1, 'center', C.groen); naamBij(ctx, 'Homo sapiens', null, K.X(18), K.Y(-14), 1, 'center', C.teal);
    text(ctx, 'Waarom zijn wij nu de enige mensensoort?', 960, 960, fTitel(64), C.text, 'center'); evoSchaal(ctx, '±60 000 jaar geleden · vereenvoudigd'); },
  e12s03(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'HAVO · VWO · EVOLUTIE · EXTRA 4/4', W - 80, 78, C.text2, 'right', 26);
    text(ctx, 'Hoe werden we mens?', 120, 330, fTitel(92), C.text, 'left'); ['Waarom zijn wij nu de enige', 'mensensoort?'].forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left'));
    lijn(ctx, [[1150, 900], [1820, 900]], C.line, 2); e12Mens(ctx, 'neanderthaler', 1330, 900, 165 * 3.6, { kijk: 1 }); e12Mens(ctx, 'sapiens', 1620, 900, 172 * 3.6, { kijk: -1 });
    naamBij(ctx, 'neanderthaler', null, 1330, 960, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1620, 960, 1, 'center', C.teal); },
  // ---------- H1 De splitsing ----------
  e12s04(ctx) { macroNacht(ctx, { horizon: 640 }); e12Tag(ctx, 'DE SPLITSING');
    roundRect(ctx, 160, 150, 1600, 40, 20); shape(ctx, rgba('#2A3A58', 0.9), C.line, 2); ctx.fillStyle = C.goud; roundRect(ctx, 1760 - 1600 * 7 / 4000 - 6, 150, 1600 * 7 / 4000 + 6, 40, 6); ctx.fill();
    metaText(ctx, '4 miljard jaar', 160, 236, C.text2, 'left', 26); metaText(ctx, 'laatste 7 miljoen jaar', 1760, 236, C.goud, 'right', 26);
    chimp(ctx, 760, 900, 3.0 / 1.07 * 1.0 * 1.05, { houding: 'zitten' }); persoon(ctx, 'noor', 1180, 905, 165 * 3.0 * 1.03, { kijk: -1, uit: 'denkt' });
    naamBij(ctx, 'chimpansee', null, 760, 560, 1, 'center'); evoSchaal(ctx, 'chimpansee en Noor op schaal'); },
  e12q05(ctx) { e12Vraag(ctx, 'Hoe zag de gemeenschappelijke voorouder van mens en chimpansee eruit?', ['Als een chimpansee van nu', 'Als een mengvorm, half mens en half chimpansee', 'Als een eigen soort, anders dan allebei']);
    e12Splitsing(ctx, 1540, 520, 280, 260, { vraag: true }); text(ctx, 'mens', 1540, 495, fTekst(36, 600), C.text, 'center'); text(ctx, 'chimpansee', 1800, 495, fTekst(36, 600), C.text, 'center'); },
  e12s06(ctx) { e12Schema(ctx, 'DE SPLITSING'); const y0 = 880, yT = 420; // tijdas verticaal: onder 7 Mj, boven nu
    lijn(ctx, [[260, y0], [260, yT]], C.line, 2.5); [[7, '7 Mj'], [6, '6'], [4, '4'], [2, '2'], [0, 'nu']].forEach(([mj, l]) => { const yy = y0 - (7 - mj) / 7 * (y0 - yT); lijn(ctx, [[252, yy], [268, yy]], C.line, 2); metaText(ctx, l, 236, yy + 8, C.text2, 'right', 26); });
    const kx = 960, ky = y0 - 0.5 / 7 * (y0 - yT); lijn(ctx, [[kx, ky], [620, yT]], C.line, 6); lijn(ctx, [[kx, ky], [1300, yT]], C.line, 6); lijn(ctx, [[kx, ky], [kx, ky + 50]], C.line, 6); circ(ctx, kx, ky, 18, C.bgSchema, C.goud, 5);
    e12Mens(ctx, 'sapiens', 620, yT - 10, 230); chimp(ctx, 1300, yT - 10, 1.6, { houding: 'staan' });
    naamBij(ctx, 'gemeenschappelijke voorouder', '±6–8 miljoen jaar · Afrika', kx + 40, ky + 10, 1, 'left', C.goud);
    naamBij(ctx, 'mens', null, 500, yT - 60, 1, 'right'); naamBij(ctx, 'chimpansee', null, 1440, yT - 60, 1, 'left');
    metaText(ctx, 'beide lijnen even lang veranderd', 1560, 640, C.text2, 'center', 26); text(ctx, '?', kx, ky + 12, fTekst(26, 800), C.goud, 'center');
    e12Doorstreep(ctx, 1160, 300, 780, 300); naamBij(ctx, 'stamt niet af van', null, 970, 250, 1, 'center', C.koraal); },
  e12q08(ctx) { e12Vraag(ctx, 'Wat kwam eerst in onze lijn?', ['Grote hersenen, daarna rechtop lopen', 'Rechtop lopen, daarna grote hersenen', 'Allebei tegelijk, stapje voor stapje']);
    e12Voetafdruk(ctx, 1600, 440, 170, 0, {}); e12Schedel(ctx, 'sapiens', 1640, 760, 0.75, { nadruk: C.paars }); },
  e12s09(ctx) { e12Savanne(ctx, { horizon: 640 }); e12Tag(ctx, 'EERST LOPEN'); e12Boom(ctx, 560, 900, 1.6);
    e12Mens(ctx, 'afarensis', 1000, 905, e12H('afarensis', 3.6), { pose: 'loop', t: 0.2 }); e12Lat(ctx, 1210, 905, e12H('afarensis', 3.6), '1,07 m');
    naamBij(ctx, 'Lucy', 'Australopithecus afarensis · ±3,2 miljoen jaar', 1000, 440, 1, 'center');
    naamBij(ctx, 'lange armen', null, 820, 700, 1, 'right', C.goud); naamBij(ctx, 'bekken en dijbeen', null, 1250, 780, 1, 'left', C.goud); evoSchaal(ctx, 'Ethiopië · reconstructie, beharing aangenomen'); },
  e12s10(ctx) { macroNacht(ctx, { horizon: 560, heuvel: false }); e12Tag(ctx, 'EERST LOPEN'); vul(ctx, [[-40, 560], [1960, 560], [1960, H], [-40, H]], '#6E685E');
    for (let i = 0; i < 60; i++) circ(ctx, hash(i * 3) * W, 600 + hash(i * 7) * 300, 3 + hash(i) * 5, rgba('#5E5A52', 0.6));
    for (let i = 0; i < 6; i++) { e12Voetafdruk(ctx, 160 + i * 150, 800 + (i % 2 ? 26 : -26), 70, Math.PI / 2, { links: i % 2 === 0, a: 0.6 + i * 0.07 }); e12Voetafdruk(ctx, 200 + i * 130, 700 + (i % 2 ? 18 : -18), 56, Math.PI / 2, { links: i % 2 === 0, a: 0.6 + i * 0.07 }); }
    e12Mens(ctx, 'afarensis', 1220, 830, e12H('afarensis', 3.2) * 1.3, { pose: 'loop', t: 0.1 }); e12Mens(ctx, 'afarensis', 1120, 740, e12H('afarensis', 3.2) * 1.05, { pose: 'loop', t: 0.55 });
    naamBij(ctx, 'Laetoli', 'Tanzania · ±3,6 miljoen jaar', 160, 300, 1, 'left'); naamBij(ctx, 'natte vulkanische as', null, 400, 960, 1, 'left'); evoSchaal(ctx, 'reconstructie'); },
  e12s11(ctx) { e12Schema(ctx, 'EERST LOPEN'); e12AsVlak(ctx, 300, 220, 560, 640, { seed: 4 }); e12AsVlak(ctx, 1060, 220, 560, 640, { seed: 9 });
    e12Voetafdruk(ctx, 580, 560, 420, 0); e12Voetafdruk(ctx, 1340, 560, 400, 0, { aap: true });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(580 - 0.42 * 0.22 * 420, 560 - 0.45 * 420, 46, 50, 0, 0, 6.283); ctx.stroke();
    pijl(ctx, 700, 740, 700, 380, C.goud, 1, 5, 22); naamBij(ctx, 'hiel → tenen', null, 730, 560, 1, 'left', C.goud);
    naamBij(ctx, 'Laetoli', 'grote teen in lijn · ±18–26 cm, vergroot', 580, 150, 1, 'center'); naamBij(ctx, 'chimpansee', 'grote teen opzij', 1340, 150, 1, 'center'); },
  e12s12(ctx) { e12Schema(ctx, 'EERST LOPEN'); e12Cilinder(ctx, 520, 820, 400, { label: 'chimpansee', schaal: 0.3 }); e12Cilinder(ctx, 960, 820, 450, { label: 'soort van Lucy', meta: 'afarensis', schaal: 0.3 }); e12Cilinder(ctx, 1400, 820, 0, { label: 'later', schaal: 0.3, a: 0.5 });
    chimp(ctx, 330, 820, 1.4, { houding: 'zitten' }); e12Mens(ctx, 'afarensis', 760, 820, 250); naamBij(ctx, 'herseninhoud', 'gemiddelde per soort · cm³', 960, 200, 1, 'center', C.paars); },
  // ---------- H3 ----------
  e12s13(ctx) { e12Savanne(ctx, { horizon: 640 }); e12Tag(ctx, 'HERSENEN, WERKTUIGEN EN VUUR');
    e12Mens(ctx, 'erectus', 900, 905, e12H('erectus', 3.4), { pose: 'loop', t: 0.3 }); e12Mens(ctx, 'afarensis', 1300, 905, e12H('afarensis', 3.4), { a: 0.6 });
    naamBij(ctx, 'Homo erectus', 'de rechtopgaande mens · ±1,9 Mj', 900, 230, 1, 'center'); naamBij(ctx, 'Lucy', null, 1300, 480, 0.8, 'center'); naamBij(ctx, 'lange benen', null, 700, 780, 1, 'right', C.goud);
    evoSchaal(ctx, 'op schaal · reconstructie'); },
  e12q14(ctx) { e12Vraag(ctx, ['Lucy en Homo erectus liepen allebei rechtop.', 'Wat was er nieuw bij Homo erectus?'], ['Hij liep als eerste echt rechtop', 'Zijn hersenen waren twee keer zo groot', 'Hij kon als eerste goed klimmen']);
    lijn(ctx, [[1500, 900], [1860, 900]], C.line, 2); e12Mens(ctx, 'afarensis', 1580, 900, 107 * 3.0); e12Mens(ctx, 'erectus', 1760, 900, 175 * 3.0); },
  e12s15(ctx) { e12Schema(ctx, 'HERSENEN, WERKTUIGEN EN VUUR'); const x0 = 160, w = 1100, X = (mj) => x0 + (4 - mj) / 4 * w;
    lijn(ctx, [[x0, 420], [x0 + w, 420]], C.line, 2.5); [4, 3, 2, 1, 0].forEach(m => { lijn(ctx, [[X(m), 412], [X(m), 428]], C.line, 2); metaText(ctx, m ? m + ' Mj' : 'nu', X(m), 466, C.text2, 'center', 26); });
    roundRect(ctx, X(3.9), 300, X(2.8) - X(3.9), 40, 20); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'afarensis', X(3.35), 280, fTekst(34, 600), C.text, 'center');
    roundRect(ctx, X(1.9), 300, X(0.11) - X(1.9), 40, 20); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'Homo erectus', X(1.0), 280, fTekst(34, 600), C.text, 'center');
    metaText(ctx, 'allebei rechtop', X(2.4), 230, C.goud, 'center', 26); pijl(ctx, X(3.9), 560, X(1.9), 560, C.goud, 1, 4, 18); text(ctx, 'bijna 2 miljoen jaar', X(2.9), 620, fTekst(34, 700), C.goud, 'center');
    e12Cilinder(ctx, 1460, 900, 450, { label: 'Lucy', schaal: 0.26, w: 110 }); e12Cilinder(ctx, 1700, 900, 900, { label: 'erectus', schaal: 0.26, w: 110 }); },
  e12s16(ctx) { e12Steppe(ctx, { horizon: 640 }); e12Tag(ctx, 'HERSENEN, WERKTUIGEN EN VUUR'); e12Vuur(ctx, 1300, 880, 1.1, { t: 0.4 });
    e12Mens(ctx, 'erectus', 760, 900, e12H('erectus', 3.2), { pose: 'kniel', hold: (c, x, y) => e12Handbijl(c, x + 6, y - 6, 60, { rot: 0.6 }) });
    e12Handbijl(ctx, 1700, 330, 220); naamBij(ctx, 'handbijl', '±20 cm · oudste ±1,76 Mj', 1700, 500, 1, 'center');
    text(ctx, '?', 1300, 740, fTitel(80), C.goud, 'center'); naamBij(ctx, 'vuur gebruikt?', '±1 miljoen jaar · Zuid-Afrika', 1300, 640, 1, 'center', C.goud); evoSchaal(ctx, 'reconstructie'); },
  e12s18(ctx) { e12Steppe(ctx, { horizon: 620 }); e12Tag(ctx, 'DE NEANDERTHALER');
    e12Mens(ctx, 'neanderthaler', 930, 905, e12H('neanderthaler', 3.3), { pose: 'loop', t: 0.1, hold: (c, x, y) => e12Speer(c, x - 170, y + 170, x + 130, y - 340, { w: 8 }) });
    e12Mens(ctx, 'neanderthalerV', 1200, 905, e12H('neanderthalerV', 3.3), { pose: 'loop', t: 0.6 });
    const K = e12Kaart(ctx, 1380, 110, 480, 300, { lon: [-15, 95], lat: [25, 62] }); e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.35 });
    metaText(ctx, 'Europa, West- en Centraal-Azië', 1840, 455, C.oker, 'right', 22); naamBij(ctx, 'neanderthaler', '±400 000–40 000 jaar geleden', 160, 200, 1, 'left'); evoSchaal(ctx, 'reconstructie · kleding aangenomen'); },
  e12s19(ctx) { e12Steppe(ctx, { horizon: 560 }); e12Tag(ctx, 'DE NEANDERTHALER'); const k = 3.6;
    e12Mens(ctx, 'neanderthaler', 760, 960, 165 * k); e12Mens(ctx, 'sapiens', 1200, 960, 172 * k);
    naamBij(ctx, 'neanderthaler', '♂ ±1,65 m', 760, 270, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', '±1,72 m', 1200, 240, 1, 'center', C.teal);
    naamBij(ctx, 'brede, diepe borstkas', null, 560, 520, 1, 'right', C.goud); naamBij(ctx, 'korte onderarm', null, 560, 700, 1, 'right', C.goud); naamBij(ctx, 'kort onderbeen', null, 560, 860, 1, 'right', C.goud); evoSchaal(ctx, 'op schaal'); },
  e12s20(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); e12Schedel(ctx, 'neanderthaler', 520, 470, 1.25, { nadruk: C.paars }); e12Schedel(ctx, 'sapiens', 1180, 470, 1.25, { nadruk: C.paars });
    naamBij(ctx, 'wenkbrauwboog', null, 640, 300, 1, 'center', C.goud); naamBij(ctx, 'geen kin', null, 650, 640, 1, 'left', C.goud); naamBij(ctx, 'lang en laag', null, 330, 290, 1, 'center');
    naamBij(ctx, 'kin', null, 1250, 640, 1, 'left', C.goud); naamBij(ctx, 'hoog en rond', null, 1180, 230, 1, 'center');
    naamBij(ctx, 'neanderthaler', null, 520, 790, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1180, 790, 1, 'center', C.teal);
    e12Cilinder(ctx, 1560, 850, 1500, { schaal: 0.3, w: 100, label: null }); e12Cilinder(ctx, 1760, 850, 1350, { schaal: 0.3, w: 100, label: null }); metaText(ctx, 'hersenen', 1660, 280, C.paars, 'center', 26); },
  e12q21(ctx) { e12Vraag(ctx, 'Hoe liep een neanderthaler?', ['Op handen en voeten, zoals een chimpansee', 'Voorovergebogen, met gebogen knieën', 'Rechtop, net zoals jij']);
    chimp(ctx, 1560, 360, 1.5, {}); e12Mens(ctx, 'neanderthaler', 1580, 640, 240, { pose: 'boule' }); e12Mens(ctx, 'neanderthaler', 1580, 900, 240); },
  e12s22(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); lijn(ctx, [[300, 880], [1620, 880]], C.line, 2);
    e12Mens(ctx, 'neanderthaler', 620, 880, 560, { pose: 'boule', a: 0.55 }); pijl(ctx, 860, 600, 1060, 600, C.line, 1, 5, 22); e12Mens(ctx, 'neanderthaler', 1300, 880, 560);
    naamBij(ctx, '1911', 'beeld van een primitief wezen · oude man met artrose', 620, 220, 1, 'center', C.koraal); naamBij(ctx, 'later rechtgezet', 'gewoon rechtop', 1300, 220, 1, 'center', C.groen); },
  e12s23(ctx) { e12Steppe(ctx, { horizon: 600 }); e12Tag(ctx, 'DE NEANDERTHALER');
    e12Mens(ctx, 'neanderthaler', 700, 905, e12H('neanderthaler', 3.4), { pose: 'kniel', hold: (c, x, y) => { vul(c, [[x - 10, y - 26], [x + 30, y - 30], [x + 36, y - 6], [x - 6, y - 4]], '#8E8A84', '#6E6A64', 2); } });
    vul(ctx, [[930, 900], [990, 860], [1080, 858], [1120, 896]], '#B8A27E', '#8A7656', 2); vul(ctx, [[1000, 862], [1050, 820], [1100, 860]], '#D2BE98', '#8A7656', 2);
    e12Speer(ctx, 1240, 860, 1760, 560, { w: 9 }); naamBij(ctx, 'voorbereide kern', 'Levallois · vanaf ±300 000 jaar', 960, 790, 1, 'left'); naamBij(ctx, 'speerpunt', null, 1700, 500, 1, 'center', C.goud); },
  e12s24(ctx) { e12Steppe(ctx, { horizon: 600 }); e12Tag(ctx, 'DE NEANDERTHALER'); vul(ctx, [[600, 900], [1320, 900], [1300, 880], [620, 880]], '#6E6048');
    e12Pyriet(ctx, 860, 720, 2.2); vul(ctx, [[1000, 700], [1080, 660], [1160, 690], [1150, 760], [1040, 770]], '#9A928A', '#6E6A64', 2);
    for (let i = 0; i < 9; i++) { const a = -0.3 + i * 0.12, r = 60 + hash(i) * 80; circ(ctx, 960 + Math.cos(a + 1.6) * r, 740 + Math.sin(a + 1.6) * r * 0.8, 5, C.goud); }
    e12Vuur(ctx, 960, 900, 0.6, { aan: 0.6 }); naamBij(ctx, 'pyriet', null, 860, 600, 1, 'center', C.goud); naamBij(ctx, 'vuursteen', null, 1080, 600, 1, 'center');
    naamBij(ctx, 'Barnham, Engeland', '±400 000 jaar · vuur maken, waarschijnlijk', 160, 200, 1, 'left'); },
  e12s25(ctx) { e12Steppe(ctx, { horizon: 600 }); e12Tag(ctx, 'DE NEANDERTHALER'); e12Vuur(ctx, 1500, 900, 1.0, { t: 0.7 });
    e12Mens(ctx, 'neanderthaler', 620, 905, e12H('neanderthaler', 3.4), { pose: 'zit', uit: 'moe' });
    const zb = E12_SOORT.neanderthaler.H * 3.4; ctx.save(); ctx.translate(620 + Math.sin(1.5) * (0.505 - 0.275) * zb + Math.sin(1.5 - 1.42) * 0.12 * zb, 905 - 0.06 * zb); ctx.rotate(-0.08); roundRect(ctx, -26, -30, 52, 44, 10); shape(ctx, '#D8CDB6', '#A89E86', 2); ctx.restore(); // verband om het onderbeen
    e12Mens(ctx, 'neanderthalerV', 1060, 905, e12H('neanderthalerV', 3.4), { kijk: -1, hoek: { lean: 0.5, th: [1.3, -0.05], kn: [1.5, 1.52], sh: [0.95, 0.75], el: [0.55, 0.65], kop: 0.3, voet2: 3.14 } });
    naamBij(ctx, 'zorg voor gewonden', null, 160, 200, 1, 'left'); evoSchaal(ctx, 'reconstructie'); },
  e12s26(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); for (let i = 0; i < 5; i++) e12Klauw(ctx, 300 + i * 110, 470 + Math.abs(i - 2) * -30, 1.3, (i - 2) * 0.25);
    ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(250, 340); ctx.quadraticCurveTo(520, 520, 790, 340); ctx.stroke();
    naamBij(ctx, 'arendsklauwen', 'Krapina, Kroatië · ±130 000 jaar', 520, 740, 1, 'center'); naamBij(ctx, 'misschien een ketting', null, 520, 820, 1, 'center', C.goud);
    e12Grotwand(ctx, 1100, 260, 640, 460); e12Handafdruk(ctx, 1420, 490, 1.2, 0.1); naamBij(ctx, 'rode handafdruk', 'Spanje', 1420, 820, 1, 'center');
    roundRect(ctx, 1240, 860, 360, 56, 12); shape(ctx, rgba(C.koraal, 0.25), C.koraal, 2); text(ctx, 'datering omstreden', 1420, 898, fTekst(32, 700), C.koraal, 'center'); },
  e12s27(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-15, 110], lat: [0, 64] });
    e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.35 }); e12Route(ctx, K, [[38, 10], [42, 24], [36, 33], [30, 42], [18, 48], [5, 49]], C.teal, { lw: 8 }); 
    naamBij(ctx, 'neanderthaler', null, K.X(60), K.Y(58), 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', 'vanaf ±50 000 jaar geleden ook Europa in', K.X(43), K.Y(12), 1, 'center', C.teal); naamBij(ctx, 'samen in dezelfde streken', null, K.X(12), K.Y(56), 1, 'center', C.goud); },
  e12q28(ctx) { e12Vraag(ctx, 'Kregen Homo sapiens en neanderthalers samen kinderen?', ['Ja, dat zie je nog in ons DNA', 'Nee, daarvoor verschilden ze te veel', 'Alleen heel even, zonder sporen']);
    e12Mens(ctx, 'neanderthaler', 1560, 860, 420); e12Mens(ctx, 'sapiens', 1780, 860, 440, { kijk: -1 }); },
  e12s29(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); e12BotDNA(ctx, 420, 520, 1.5); e12Genoom(ctx, 1200, 820, 600, { pNea: 0, h: 420 });
    naamBij(ctx, 'oud DNA', 'uit botten van neanderthalers', 420, 330, 1, 'center', C.paars); naamBij(ctx, 'genoom gelezen', '2010 · Svante Pääbo · Nobelprijs 2022', 1500, 900, 1, 'center'); },
  e12s30(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); e12Genoom(ctx, 360, 820, 1200, { pNea: 0.02, h: 520 });
    naamBij(ctx, 'mens van nu, buiten Afrika', null, 960, 210, 1, 'center'); naamBij(ctx, '±2 % neanderthaler-DNA', 'kruising vooral ±47 000 jaar geleden', 960, 900, 1, 'center', C.oker); },
  e12s31(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); pot(ctx, 600, 760, 1.4, { p: 0, n: 70, extra: null, seed: 3 }); pot(ctx, 1320, 760, 1.4, { p: 1, n: 70, seed: 5 });
    // smalle verbinding
    roundRect(ctx, 790, 560, 340, 40, 20); shape(ctx, rgba('#AFC0D0', 0.15), EVO.glas, 3); circ(ctx, 900, 580, 13, EVO.a2, EVO.a2R, 2); circ(ctx, 1010, 580, 13, EVO.a2, EVO.a2R, 2); pijl(ctx, 840, 530, 1080, 530, C.oker, 1, 4, 18);
    naamBij(ctx, 'neanderthalers', null, 600, 880, 1, 'center', C.oker); naamBij(ctx, 'Homo sapiens', null, 1320, 880, 1, 'center', C.teal);
    naamBij(ctx, 'een beetje genenstroom', 'waarschijnlijk minder vaak vruchtbare kinderen', 960, 220, 1, 'center', C.goud); metaText(ctx, 'soort = groep die in de natuur samen vruchtbare nakomelingen kan krijgen', 960, 960, C.text2, 'center', 22); metaText(ctx, 'de meeste biologen: twee soorten', 960, 1000, C.text2, 'center', 22); },
  e12s32(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); e12Genoom(ctx, 1500, 900, 340, { pNea: 0.02, h: 180 }); metaText(ctx, 'een stukje in ons', 1670, 960, C.oker, 'center', 22); const kx = 860, ky = 760; lijn(ctx, [[kx, ky], [560, 380]], C.line, 6); lijn(ctx, [[kx, ky], [1360, 380]], C.line, 6); lijn(ctx, [[kx, ky], [kx, ky + 80]], C.line, 6); circ(ctx, kx, ky, 18, C.bgSchema, C.goud, 5);
    e12Mens(ctx, 'neanderthaler', 460, 370, 230); e12Mens(ctx, 'sapiens', 1260, 370, 240, { kijk: -1 }); e12Doorstreep(ctx, 600, 260, 1120, 260); naamBij(ctx, 'stamt niet af van', null, 860, 200, 1, 'center', C.koraal);
    naamBij(ctx, 'gemeenschappelijke voorouder', '> 500 000 jaar geleden', kx + 40, ky + 70, 1, 'left', C.goud); naamBij(ctx, 'zustergroepen', null, 860, 560, 1, 'center'); },
  e12s33(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [40, 160], lat: [-15, 62] });
    e12Gebied(ctx, K, [[141, -3], [150, -5], [151, -10], [142, -9], [138, -6]], C.koraal, { a: 0.55 });
    e12Vingerbot(ctx, K.X(84), K.Y(51), 1.4); naamBij(ctx, 'Denisovagrot', 'vingerbotje', K.X(84), K.Y(58), 1, 'center', C.koraal);
    naamBij(ctx, 'tot 6 % denisova-DNA', 'Papoea-Nieuw-Guinea', K.X(146), K.Y(-2) - 40, 1, 'center', C.koraal);
    e12Mens(ctx, 'floresiensis', K.X(121), K.Y(-8.5), 106 * 2.0); naamBij(ctx, 'Homo floresiensis', 'Flores · ±1,06 m', K.X(121) - 120, K.Y(-8.5) + 50, 1, 'right', C.groen); },
  e12s34(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-15, 95], lat: [25, 64] }); e12Gebied(ctx, K, NEA_GEBIED, C.oker, { a: 0.12, streep: true });
    for (const [lo, la] of [[-5, 40], [3, 44], [14, 45], [-8, 37.5], [40, 44], [70, 51]]) e12Gebied(ctx, K, [[lo - 2, la - 1], [lo + 2, la - 1], [lo + 2, la + 1.2], [lo - 2, la + 1]], C.oker, { a: 0.6, streep: false });
    naamBij(ctx, 'laatste werktuigen', '±41 000–39 000 jaar geleden', 960, 960, 1, 'center', C.oker); },
  e12s36(ctx) { e12Schema(ctx, 'DE NEANDERTHALER'); const kaart = [['concurrentie', 'met Homo sapiens'], ['klimaat', 'koud en wisselend'], ['kleine groepen', 'inteelt'], ['opgaan', 'in Homo sapiens']];
    kaart.forEach(([n, m], i) => { const x = 180 + i * 400; roundRect(ctx, x, 360, 360, 360, 22); shape(ctx, rgba(C.fill, 0.8), C.line, 2); text(ctx, n, x + 180, 560, fTekst(42, 700), C.text, 'center'); metaText(ctx, m, x + 180, 610, C.grain, 'center', 24);
      circ(ctx, x + 180, 450, 36, null, C.text2, 3); text(ctx, '?', x + 180, 466, fTekst(44, 700), C.text2, 'center'); });
    naamBij(ctx, 'geen ervan bewezen', null, 960, 820, 1, 'center', C.goud); },
  // ---------- H5 Wij ----------
  e12s37(ctx) { e12Schema(ctx, 'WIJ'); const K = e12Kaart(ctx, 160, 150, 1600, 740, { lon: [-20, 160], lat: [-42, 62] });
    circ(ctx, K.X(-8.4), K.Y(31.9), 14, C.goud); naamBij(ctx, 'Jebel Irhoud', '±300 000 jaar', K.X(-8.4), K.Y(31.9) - 30, 1, 'center', C.goud);
    e12Route(ctx, K, [[38, 8], [43, 14], [48, 26], [40, 36], [25, 45], [8, 48]], C.teal, { lw: 7 }); e12Route(ctx, K, [[48, 26], [70, 28], [90, 25], [110, 30]], C.teal, { lw: 7 }); e12Route(ctx, K, [[90, 25], [102, 5], [120, -8], [134, -20]], C.teal, { lw: 7, a: 0.7 });
    naamBij(ctx, 'uit Afrika', '±70 000–50 000 jaar geleden', K.X(55), K.Y(5), 1, 'center', C.teal); naamBij(ctx, 'oorsprong: Afrika', null, K.X(20), K.Y(-25), 1, 'center', C.teal); },
  e12q38(ctx) { e12Vraag(ctx, 'Leefden Homo erectus en Homo sapiens ooit tegelijk?', ['Nee, Homo erectus veranderde in Homo sapiens', 'Ja, een tijd lang, op verschillende plekken', 'Nee, er zat een miljoen jaar tussen']);
    lijn(ctx, [[1520, 900], [1860, 900]], C.line, 2); e12Mens(ctx, 'erectus', 1600, 900, 175 * 3.0); e12Mens(ctx, 'sapiens', 1780, 900, 172 * 3.0, { kijk: -1 }); },
  e12s39(ctx) { e12Schema(ctx, 'WIJ'); const g = 860; lijn(ctx, [[160, g], [1760, g]], C.line, 2);
    chimp(ctx, 300, g, 2.6, { houding: 'lopen', t: 0.2 }); e12Mens(ctx, 'afarensis', 620, g, 107 * 3.2, { pose: 'loop', t: 0.3 }); e12Mens(ctx, 'erectus', 900, g, 175 * 3.2, { pose: 'loop', t: 0.5 }); e12Mens(ctx, 'neanderthaler', 1220, g, 165 * 3.2, { pose: 'loop', t: 0.7 }); e12Mens(ctx, 'sapiens', 1540, g, 172 * 3.2, { pose: 'loop', t: 0.9 });
    lijn(ctx, [[180, 600], [1740, 600]], C.koraal, 8); naamBij(ctx, 'één lijn naar ons toe? klopt niet', null, 560, 420, 1, 'center', C.koraal);
    const X = (ka) => 260 + (400 - ka) / 400 * 1400; lijn(ctx, [[X(400), 250], [X(0), 250]], C.line, 2); [400, 300, 200, 100, 0].forEach(k => metaText(ctx, k ? k + ' 000 jaar' : 'nu', X(k), 286, C.text2, 'center', 22));
    roundRect(ctx, X(400), 150, X(110) - X(400), 30, 15); shape(ctx, rgba('#C8BCA4', 0.85), '#E0D6C0', 2); text(ctx, 'Homo erectus (Java)', X(400) + 10, 140, fTekst(30, 600), C.text, 'left');
    roundRect(ctx, X(300), 195, X(0) - X(300), 30, 15); shape(ctx, rgba(C.teal, 0.85), _lt(C.teal, 0.3), 2); text(ctx, 'Homo sapiens', X(0), 185, fTekst(30, 600), C.teal, 'right');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, X(300) - 4, 144, X(110) - X(300) + 8, 86, 12); ctx.stroke(); },
  e12s40(ctx) { e12Schema(ctx, 'WIJ'); e12Struik(ctx, 380, 170, 1300, 600, { markeer: ['sapiens', 'chimp'] }); metaText(ctx, 'vereenvoudigd · meer dan twintig soorten bekend', 1680, 940, C.text2, 'right', 24); },
  // ---------- Samenvatting ----------
  e12s41(ctx) { e12Schema(ctx, 'SAMENVATTING'); e12Struik(ctx, 380, 170, 1300, 600, { nu: 0.06, dim: ['chimp', 'afarensis', 'erectus'] }); naamBij(ctx, '60 000 jaar geleden', null, e12TijdX(380, 1300, 0.06), 150, 1, 'center', C.goud); },
  e12s42(ctx) { e12Schema(ctx, 'SAMENVATTING'); e12Struik(ctx, 380, 170, 860, 600, { nu: 0, dim: ['afarensis', 'erectus', 'neanderthaler', 'denisova', 'floresiensis'] });
    e12Genoom(ctx, 1320, 760, 500, { pNea: 0.02, pDen: 0.01, h: 400 }); naamBij(ctx, 'stukjes in ons DNA', 'neanderthaler · denisovamens', 1570, 840, 1, 'center', C.oker); },
  e12s43(ctx) { e12Eind(ctx, ['Mens en chimpansee delen een voorouder: geen van beide.', 'Rechtop lopen kwam eerst, grote hersenen later.', 'De neanderthaler liep rechtop en is een zustergroep, geen voorouder.', 'Er leefden meerdere mensensoorten; wij bleven over.', 'Geen ladder maar een struik; hun DNA leeft voort in veel mensen.']); }
};
