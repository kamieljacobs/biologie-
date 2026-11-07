// Storyboard Ecologie v2 · film 1 Hoeveel passen er? — één keyframe per scène (1920×1080). Laadt na teken_eco1.js. (Vervangt de kopie uit de evolutiereeks.)
const _S1 = 1.83; // px per cm in scènes met de boer (Gerrit 1,80 m = 330 px)
const _vk1 = (ctx, v, o) => ecoVraagKaart(ctx, v, o, 1);
const _bg1 = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
// sloot-decor: weiland voor, sloot in het midden, overkant met wilgen
function _e1Sloot(ctx, o = {}) { const { wilgen = true, stomp = true } = o; e1Macro(ctx, { horizon: 520 });
  if (wilgen) { e1Wilg(ctx, 1500, 650, 0.55, { knot: true, seed: 5 }); e1Wilg(ctx, 1780, 660, 0.5, { knot: true, seed: 9 }); e1Wilg(ctx, 260, 640, 0.45, { knot: true, seed: 2 }); }
  ctx.fillStyle = E1.water; ctx.fillRect(0, 660, W, 90); ctx.fillStyle = E1.waterD; ctx.fillRect(0, 742, W, 8);
  e1Riet(ctx, 120, 676, 0.8, { seed: 2 }); e1Riet(ctx, 1240, 676, 0.7, { seed: 7 });
  e1Oever(ctx, 748, { golf: 6 }); if (stomp) e1Stomp(ctx, 980, 900, _S1, {}); }
function _vSpoor(ctx, x, y, L = 520) { ctx.strokeStyle = rgba(E1.waterL, 0.9); ctx.lineWidth = 3; [-1, 1].forEach((k) => { ctx.beginPath(); ctx.moveTo(x - 20, y + 4); ctx.lineTo(x - L, y + k * 34); ctx.stroke(); }); }
// rivierkreek-decor (Biesbosch / Gelderse Poort)
function _e1Kreek(ctx) { e1Macro(ctx, { horizon: 470 }); ctx.fillStyle = E1.water; ctx.fillRect(0, 560, W, 210); ctx.fillStyle = E1.waterD; ctx.fillRect(0, 762, W, 8);
  e1Wilg(ctx, 1650, 560, 0.45, { seed: 4 }); e1Wilg(ctx, 300, 556, 0.4, { seed: 8 }); e1Riet(ctx, 900, 572, 0.7, { seed: 3 }); e1Oever(ctx, 768, { golf: 8 }); }
const _gNat = [260, 800, 1400, 600];
const _asNat = (ctx, yLabel = 'aantal bevers in Nederland') => e1As(ctx, ..._gNat, { xLabel: 'jaar', yLabel, xt: [[0, '1985'], [0.375, '2000'], [0.75, '2015'], [1, '2025']], yt: [[0, '0'], [2 / 7, '2000'], [4 / 7, '4000'], [6 / 7, '6000']] });

const SB1 = {
  // ---------------- Opening
  e1s01(ctx) { _e1Sloot(ctx); ecoTag(ctx, 1, 'OPENING'); persoon(ctx, 'gerrit', 700, 900, 330, { outfit: 'gewoon', uit: 'verbaasd', kijk: 1 });
    ecoSchaal(ctx, 'mens 1,80 m · wilgenstam ± 25 cm'); },
  e1s02(ctx) { _e1Sloot(ctx); ecoTag(ctx, 1, 'OPENING'); persoon(ctx, 'gerrit', 720, 900, 330, { outfit: 'gewoon', uit: 'denkt', pose: 'denk' });
    _vSpoor(ctx, 1150, 690, 300); ecoBever(ctx, 1240, 700, _S1, { houding: 'zwemmen', water: false }); naamBij(ctx, 'bever', 'alleen kop en rug boven water', 1250, 620, 1, 'center'); ecoSchaal(ctx, 'bever ± 1,2 m met staart'); },
  e1s03(ctx) { ecoTitelKaart(ctx, 1, 'Hoeveel passen er?', ['Hoeveel bevers passen er', 'in Nederland?'], (c) => {
      roundRect(c, 1100, 300, 720, 560, 24); shape(c, rgba(C.bgMacroFront, 0.9)); ecoBever(c, 1460, 820, 5.2, { houding: 'knagen' }); }); },
  // ---------------- H1 Wie tel je mee?
  e1s04(ctx) { _e1Kreek(ctx); ecoTag(ctx, 1, 'WIE TEL JE MEE?'); e1Kist(ctx, 1180, 860, 2.4, { open: 1 }); ecoBever(ctx, 880, 830, 2.4, { houding: 'lopen', kijk: -1, t: 0.3 });
    naamBij(ctx, 'het jaar 1988', 'biesbosch · eerste uitzetting', 1000, 320, 1, 'center'); ecoSchaal(ctx, 'kist ± 1 m'); },
  e1s05(ctx) { _e1Kreek(ctx); ecoTag(ctx, 1, 'WIE TEL JE MEE?');
    [[260, 800, 1], [600, 812, -1], [1000, 806, 1], [1460, 818, -1]].forEach(([x, y, k], i) => ecoBever(ctx, x, y, 1.6, { houding: i % 2 ? 'staan' : 'lopen', kijk: k, t: i * 0.2 }));
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.strokeRect(430, 700, 820, 150); metaText(ctx, '1 km oever', 840, 684, C.goud, 'center', 28);
    naamBij(ctx, 'populatiedichtheid', 'bevers per kilometer oever', 840, 330, 1, 'center'); naamBij(ctx, 'populatie', 'één soort · één gebied · onderling voortplanten', 840, 190, 1, 'center');
    ecoSchaal(ctx, 'schematisch · niet op schaal'); },
  e1s06(ctx) { e1Macro(ctx, { horizon: 420, heuvel: false }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 420); ecoTag(ctx, 1, 'WIE TEL JE MEE?');
    e1Burcht(ctx, 1100, 640, 0.95, { doorsnede: true, waterW: 2.4, bewoners: (x, y) => ecoBever(ctx, x, y, 1.0, { houding: 'staan', kijk: -1 }) });
    naamBij(ctx, 'burcht', 'takken en modder', 1150, 300, 1, 'center'); naamBij(ctx, 'woonkamer', 'boven de waterlijn', 1460, 590, 1, 'left'); naamBij(ctx, 'ingang', 'onder water', 300, 820, 1, 'left');
    ecoSchaal(ctx, 'doorsnede · burcht ± 5 m breed'); },
  e1s07(ctx) { _e1Sloot(ctx, { wilgen: false }); ecoTag(ctx, 1, 'WIE TEL JE MEE?'); const g7 = persoon(ctx, 'gerrit', 760, 900, 330, { outfit: 'gewoon', pose: 'vasthouden', uit: 'neutraal' }); e1Telefoon(ctx, g7.handR.x, g7.handR.y - 18, 1.3);
    roundRect(ctx, 1180, 150, 600, 470, 20); shape(ctx, rgba(C.bgSchema, 0.95), C.line, 2);
    vul(ctx, [[1260, 210], [1500, 190], [1700, 260], [1720, 470], [1600, 580], [1330, 590], [1230, 430]], '#33503E');
    [[[1270, 560], [1420, 470], [1560, 430], [1700, 400]], [[1300, 330], [1450, 360], [1600, 300]]].forEach(r => lijn(ctx, r, E1.water, 7));
    for (let i = 0; i < 26; i++) { const r = i % 2 ? [[1270, 560], [1700, 400]] : [[1300, 330], [1600, 300]]; const u = hash(i * 3.3); circ(ctx, r[0][0] + (r[1][0] - r[0][0]) * u + (hash(i) - 0.5) * 30, r[0][1] + (r[1][1] - r[0][1]) * u + (hash(i * 2) - 0.5) * 30, 7, rgba(C.goud, 0.85)); }
    circ(ctx, 1480, 470, 13, C.goud, C.bgSchema, 3); metaText(ctx, 'meldingen van knaagsporen', 1480, 660, C.text2, 'center', 26); },
  e1s08(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WIE TEL JE MEE?');
    e1Haarval(ctx, 420, 560, 1.6); ecoBever(ctx, 420, 650, 1.5, { houding: 'lopen', t: 0.4 });
    zoomCircle(ctx, 900, 330, 120, 430, 495, 'één haar · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(780, 210, 240, 240); lijn(ctx, [[830, 430], [880, 330], [940, 250]], '#7A5A42', 10); circ(ctx, 828, 432, 14, '#C9A890'); });
    [1, 2, 3].forEach((k, i) => { e1Profiel(ctx, 1180, 220 + i * 170, 520, 110, k * 7, C.text); metaText(ctx, 'bever ' + k, 1740, 290 + i * 170, C.text2, 'left', 26); });
    naamBij(ctx, 'DNA-profiel', 'elk dier een eigen patroon', 1440, 760, 1, 'center'); },
  e1s09(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WIE TEL JE MEE?');
    text(ctx, 'ronde 1', 330, 210, fTekst(44, 700), C.text, 'center'); text(ctx, 'ronde 2', 1290, 210, fTekst(44, 700), C.text, 'center');
    for (let i = 0; i < 40; i++) e1Icoon(ctx, 150 + (i % 8) * 52, 290 + Math.floor(i / 8) * 70, 19, { merk: true });
    for (let i = 0; i < 30; i++) e1Icoon(ctx, 1110 + (i % 6) * 70, 290 + Math.floor(i / 6) * 70, 19, { merk: i < 12, kleur: i < 12 ? C.okerD : '#6E6A64' });
    text(ctx, '40 gevonden', 330, 740, fTekst(48, 700), C.goud, 'center'); text(ctx, '30 gevonden · 12 al bekend', 1290, 740, fTekst(48, 700), C.text, 'center');
    metaText(ctx, 'een maand later', 810, 470, C.text2, 'center', 28); pijl(ctx, 680, 500, 940, 500, C.line, 1, 3, 16); },
  e1q10(ctx) { _vk1(ctx, ['Ronde 1: 40 bevers. Ronde 2: 30 bevers, waarvan 12 al bekend.', 'Hoeveel bevers leven er ongeveer in dit gebied?'], ['Zeventig', 'Honderd', 'Achtenvijftig']); },
  e1s11(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WIE TEL JE MEE?');
    for (let i = 0; i < 30; i++) e1Icoon(ctx, 160 + (i % 6) * 70, 260 + Math.floor(i / 6) * 70, 19, { merk: i < 12, kleur: i < 12 ? C.okerD : '#6E6A64', a: i < 12 ? 1 : 0.5 });
    text(ctx, '12 van 30 = 2 op de 5', 360, 690, fTekst(48, 700), C.goud, 'center');
    text(ctx, '40 bekende bevers = 2/5 van alle bevers', 1260, 330, fTekst(48, 600), C.text, 'center');
    text(ctx, 'alle bevers ≈ 40 × 5/2 = 100', 1260, 440, fTekst(56, 800), C.goud, 'center');
    haak(ctx, 860, 1660, 490, 'vangen, merken en terugvangen', C.groen);
    metaText(ctx, 'voorwaarden: tussen de rondes niemand erbij of eraf', 1260, 680, C.text2, 'center', 26); metaText(ctx, 'elke bever evenveel kans om gevonden te worden', 1260, 720, C.text2, 'center', 26); },
  // ---------------- H2 Erbij en eraf
  e1s12(ctx) { _e1Kreek(ctx); ecoTag(ctx, 1, 'ERBIJ EN ERAF'); e1Burcht(ctx, 1260, 770, 0.6, {});
    ecoBever(ctx, 760, 830, 1.6, { houding: 'staan' }); ecoBever(ctx, 980, 840, 1.6, { houding: 'staan', kijk: -1 }); ecoBever(ctx, 1640, 842, 1.15, { houding: 'staan', kijk: -1 }); naamBij(ctx, 'jong van vorig jaar', '', 1640, 780, 1, 'center');
    [[520, 700], [400, 712], [280, 704]].forEach(([x, y]) => ecoBever(ctx, x, y, 1.7, { houding: 'zwemmen', water: false, kijk: -1 }));
    naamBij(ctx, 'ouderpaar', '', 870, 772, 1, 'center'); naamBij(ctx, 'jongen van dit jaar', '2 tot 3 per worp', 400, 630, 1, 'center'); ecoSchaal(ctx, 'volwassen bever ± 85 cm zonder staart'); },
  e1s13(ctx) { ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 0, W, H); ecoTag(ctx, 1, 'ERBIJ EN ERAF');
    const R = [[-40, 860], [300, 760], [560, 640], [820, 600], [1100, 470], [1400, 400], [1700, 260], [1980, 180]]; lijn(ctx, R, E1.water, 90); lijn(ctx, [[820, 600], [900, 760], [1000, 980]], E1.water, 30); lijn(ctx, [[1400, 400], [1560, 600], [1600, 880]], E1.water, 22);
    e1Burcht(ctx, 560, 600, 0.28, {}); ctx.save(); ctx.setLineDash([12, 12]); lijn(ctx, [[600, 640], [820, 600], [1100, 470], [1400, 400], [1540, 580], [1590, 760]], C.goud, 4); ctx.restore();
    ecoBever(ctx, 1590, 780, 0.9, { houding: 'zwemmen', water: false }); circ(ctx, 1600, 870, 18, C.goud, C.bgSchema, 3); naamBij(ctx, 'sloot van de boer', '', 1650, 860, 1, 'left');
    naamBij(ctx, 'familie', '', 560, 520, 1, 'center'); metaText(ctx, 'meestal 10 tot 20 km', 1100, 380, C.goud, 'center', 28); ecoSchaal(ctx, 'kaart · niet op schaal'); },
  e1s14(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'ERBIJ EN ERAF'); e1Popcirkel(ctx, 960, 470, 170);
    text(ctx, 'groei = (geboorte + immigratie) − (sterfte + emigratie)', 960, 850, fTekst(46, 700), C.text, 'center'); },
  e1s15(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'ERBIJ EN ERAF'); e1Popcirkel(ctx, 960, 470, 150, { getallen: ['120', '10', '60', '30'] });
    text(ctx, '400', 960, 540, fTekst(48, 800), C.goud, 'center'); metaText(ctx, 'begin van het jaar', 960, 690, C.text2, 'center', 26); },
  e1q16(ctx) { _vk1(ctx, ['400 bevers. In een jaar: 120 geboren, 60 dood, 10 erbij, 30 vertrokken.', 'Met hoeveel procent groeit deze populatie in een jaar?'], ['Dertig procent', 'Vijftien procent', 'Tien procent']); },
  e1s17(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'ERBIJ EN ERAF');
    const r = (y, a, b, kl) => { text(ctx, a, 760, y, fTekst(48, 600), kl, 'right'); text(ctx, b, 820, y, fTekst(48, 800), kl, 'left'); };
    r(260, 'erbij', '120 + 10 = 130', C.groen); r(360, 'eraf', '60 + 30 = 90', C.koraal); r(480, 'groei', '130 − 90 = 40', C.text);
    text(ctx, '40 / 400 = 10 % per jaar', 960, 650, fTekst(64, 800), C.goud, 'center'); haak(ctx, 620, 1300, 690, 'groeisnelheid', C.groen); },
  // ---------------- H3 Steeds sneller
  e1s18(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER'); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2004 }); naamBij(ctx, '± 130', '2000', X(2000) - 20, Y(128) - 70, 1, 'right'); naamBij(ctx, 'minstens 220', '2004', X(2004) + 20, Y(220) - 70, 1, 'left'); metaText(ctx, 'schattingen', 1660, 210, C.text2, 'right', 26); },
  e1s19(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER'); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023 }); naamBij(ctx, '± 3500', '2019', X(2019) - 30, Y(3500) - 20, 1, 'right'); naamBij(ctx, '± 6000', '2023', X(2023) - 30, Y(6000) - 20, 1, 'right'); metaText(ctx, 'schattingen', 1660, 210, C.text2, 'right', 26); },
  e1s20(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER'); _asNat(ctx, 'aantal bevers');
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, punten: false });
    const trap = (j, n, lbl) => { const n2 = n * 1.2; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(X(j), Y(n)); ctx.lineTo(X(j + 1), Y(n)); ctx.lineTo(X(j + 1), Y(n2)); ctx.stroke(); text(ctx, lbl, X(j + 1) + 20, Y((n + n2) / 2) + 14, fTekst(40, 700), C.groen, 'left'); };
    trap(2005.2, 200, '+40'); trap(2016.1, 2000, '+400');
    naamBij(ctx, 'exponentiële groei', 'j-curve · ± 20 % per jaar', 800, 300, 1, 'center'); },
  e1q21(ctx) { _vk1(ctx, ['Een populatie groeit elk jaar met twintig procent.', 'Na hoeveel jaar is ze ongeveer twee keer zo groot?'], ['Na ongeveer vier jaar', 'Na vijf jaar', 'Na tien jaar']); },
  e1s22(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER');
    const v = [100, 120, 144, 173, 207], x0 = 300, y0 = 800, sc = 2.4; ctx.save(); ctx.setLineDash([10, 10]); lijn(ctx, [[x0 - 40, y0 - 200 * sc], [x0 + 5 * 180, y0 - 200 * sc]], C.goud, 3); ctx.restore(); metaText(ctx, 'dubbel = 200', x0 + 5 * 180 + 10, y0 - 200 * sc + 10, C.goud, 'left', 28);
    v.forEach((n, i) => { roundRect(ctx, x0 + i * 180, y0 - n * sc, 120, n * sc, 8); shape(ctx, rgba(i === 4 ? C.goud : C.okerD, 0.9), C.line, 1.5); text(ctx, String(n), x0 + i * 180 + 60, y0 - n * sc - 18, fTekst(40, 700), C.text, 'center'); metaText(ctx, 'jaar ' + i, x0 + i * 180 + 60, y0 + 44, C.text2, 'center', 28); });
    text(ctx, 'regel van 70:', 1440, 560, fTekst(44, 600), C.text, 'left'); text(ctx, '70 / 20 = 3,5 jaar', 1440, 640, fTekst(52, 800), C.goud, 'left'); metaText(ctx, 'precies: 3,8 jaar', 1440, 700, C.text2, 'left', 28);
    naamBij(ctx, 'verdubbelingstijd', '', 1440, 470, 1, 'left'); },
  e1s23(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER'); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, deel: [2019, 2023, C.goud], kleur: C.okerD });
    metaText(ctx, 'schattingen · verschillende methoden', 1660, 210, C.text2, 'right', 26); naamBij(ctx, '± 20 % per jaar', '2004 – 2019', X(2012), Y(1600) - 30, 1, 'right'); naamBij(ctx, '± 14 % per jaar', '2019 – 2023', X(2020) - 50, Y(5400) - 40, 1, 'right'); },
  e1q24(ctx) { _vk1(ctx, ['2004–2019: ± 20 % groei per jaar. 2019–2023: ± 14 % per jaar.', 'Welke conclusie mag je uit deze gegevens trekken?'], ['In het jaar 2023 is de draagkracht van Nederland bereikt', 'Het aantal bevers groeit nog, maar met een lager percentage', 'Na het jaar 2019 komen er geen bevers meer bij']); },
  e1s25(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'STEEDS SNELLER'); _asNat(ctx);
    const { X, Y } = e1Nationaal(ctx, ..._gNat, { tot: 2023, deel: [2019, 2023, C.goud], kleur: C.okerD });
    text(ctx, 'draagkracht van Nederland: niet in deze gegevens', 1660, 150, fTekst(36, 600), C.text2, 'right');
    naamBij(ctx, 'stijgt nog', 'de groei remt af', X(2020) - 40, Y(5000), 1, 'right'); },
  // ---------------- H4 Wanneer is het vol?
  e1s26(ctx) { _e1Kreek(ctx); ecoTag(ctx, 1, 'WANNEER IS HET VOL?'); vul(ctx, [[820, 800], [860, 772], [920, 768], [960, 800]], E1.klei);
    ecoBever(ctx, 680, 812, 2.2, { houding: 'staan' }); ecoBever(ctx, 1500, 690, 1.8, { houding: 'zwemmen', water: false, kijk: 1 });
    naamBij(ctx, 'geurhoopje', 'modder en bevergeil', 900, 720, 1, 'left'); naamBij(ctx, 'vreemde bever', 'zwemt weg', 1500, 610, 1, 'center'); },
  e1s27(ctx) { ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 0, W, H); ecoTag(ctx, 1, 'WANNEER IS HET VOL?');
    lijn(ctx, [[-40, 520], [400, 470], [800, 520], [1200, 470], [1600, 520], [1980, 480]], E1.water, 180); lijn(ctx, [[300, 690], [700, 720], [1100, 700], [1500, 760]], E1.water, 40);
    const T = [[120, 360], [420, 330], [720, 360], [1020, 330], [1320, 360], [1620, 330], [260, 620], [700, 640], [1150, 630]];
    T.forEach(([x, y]) => { ctx.strokeStyle = C.goud; ctx.lineWidth = 4; roundRect(ctx, x, y, 270, 60, 14); ctx.stroke(); e1Burcht(ctx, x + 135, y + 56, 0.13, {}); });
    naamBij(ctx, 'Millingerwaard', 'gelderse poort · 9 territoria', 960, 810, 1, 'center'); ecoSchaal(ctx, 'kaart · schematisch'); },
  e1q28(ctx) { _vk1(ctx, ['Alle geschikte oevers zijn bezet.', 'Wat gebeurt er de jaren daarna met het aantal bevers in dit gebied?'], ['Het groeit door tot alle wilgen op zijn', 'Het zakt naar nul', 'Het blijft ongeveer gelijk']); },
  e1s29(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WANNEER IS HET VOL?'); const x = 260, y = 800, w = 1200, h = 560;
    e1As(ctx, x, y, w, h, { xLabel: 'jaar', yLabel: 'volwassen bevers in de millingerwaard', xt: [[0, '1995'], [0.5, '2005'], [1, '2015']], yt: [[0, '0'], [0.5, '10'], [0.9, '18']] });
    const P = []; for (let i = 0; i <= 40; i++) { const u = i / 40, n = 18 / (1 + Math.exp(-(u - 0.3) * 14)) + (u > 0.5 ? Math.sin(u * 30) * 0.6 : 0); P.push([x + u * w, y - n / 20 * h]); } e1Lijn(ctx, P, C.okerD, 6);
    ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 18 / 20 * h], [x + w, y - 18 / 20 * h]], C.goud, 4); ctx.restore(); text(ctx, 'draagkracht', x + w + 20, y - 18 / 20 * h + 14, fTekst(40, 700), C.goud, 'left');
    [0.7, 0.8, 0.9].forEach((u) => pijl(ctx, x + u * w, y - 0.82 * h, x + u * w + 60, y - 0.72 * h, C.koraal, 1, 4, 14)); text(ctx, 'jongen trekken weg', x + 0.8 * w, y - 0.6 * h, fTekst(36, 600), C.koraal, 'center');
    ecoSchaal(ctx, 'vereenvoudigd · kaandorp & lange 2010'); },
  e1s30(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WANNEER IS HET VOL?'); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const N0 = 0.02, r = 7.5, K = 0.7, J = [], S = []; for (let i = 0; i <= 80; i++) { const u = i / 80, j = N0 * Math.exp(r * u), s = K / (1 + (K - N0) / N0 * Math.exp(-r * u)); if (j < 1.05) J.push([x + u * w, y - j * h]); S.push([x + u * w, y - s * h]); }
    e1Lijn(ctx, J, rgba(C.goud, 0.5), 5, [12, 10]); e1Lijn(ctx, S, C.okerD, 7);
    ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.7 * h], [x + w, y - 0.7 * h]], C.goud, 3); ctx.restore(); text(ctx, 'draagkracht', x + w - 10, y - 0.7 * h - 20, fTekst(40, 700), C.goud, 'right');
    text(ctx, 'J', x + 0.6 * w, y - 0.95 * h, fTitel(90), rgba(C.goud, 0.7), 'center'); text(ctx, 'S', x + 0.95 * w, y - 0.5 * h, fTitel(90), C.okerD, 'center');
    naamBij(ctx, 'logistische groei', 's-curve', x + 0.75 * w, y - 0.3 * h, 1, 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  e1s31(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WANNEER IS HET VOL?'); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80; let n = 0.62 / (1 + Math.exp(-(u - 0.3) * 16)); n += 0.3 * Math.exp(-Math.pow((u - 0.45) / 0.08, 2)) - 0.12 * Math.exp(-Math.pow((u - 0.62) / 0.07, 2)); P.push([x + u * w, y - n * h]); }
    e1Lijn(ctx, P, C.okerD, 7); ctx.save(); ctx.beginPath(); ctx.rect(x, 0, w, y - 0.62 * h); ctx.clip(); e1Lijn(ctx, P, C.koraal, 9); ctx.restore();
    ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.62 * h], [x + w, y - 0.62 * h]], C.goud, 3); ctx.restore(); text(ctx, 'draagkracht', x + w - 10, y - 0.62 * h + 50, fTekst(40, 700), C.goud, 'right');
    naamBij(ctx, 'overshoot', 'meer dieren dan het gebied kan voeden', x + 0.45 * w, y - 0.98 * h, 1, 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  // ---------------- H5 Wat houdt het aantal in toom?
  e1s32(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?');
    text(ctx, 'weinig bevers', 480, 230, fTekst(44, 700), C.text, 'center'); text(ctx, 'veel bevers', 1440, 230, fTekst(44, 700), C.text, 'center');
    e1Oeverlint(ctx, 140, 300, 680, 8, { bezet: 2 }); e1Oeverlint(ctx, 1100, 300, 680, 8, { bezet: 8 });
    [['geen plek', 'territorium'], ['minder voedsel', 'per bever'], ['ziekte', 'springt over']].forEach(([a, b], i) => naamBij(ctx, a, b, 1220 + i * 230, 480, 1, 'center'));
    haak(ctx, 1100, 1780, 560, 'dichtheidsafhankelijk', C.koraal); },
  e1q33(ctx) { _vk1(ctx, ['Een hoogwater in het voorjaar verdrinkt jonge bevers in hun burcht.', 'Wat voor factor is dat?'], ['Dichtheidsafhankelijk: bij meer bevers gaan er meer dood', 'Dichtheidsonafhankelijk: het treft een vast deel', 'Biotisch: het gaat over bevers']); },
  e1s34(ctx) { e1Macro(ctx, { horizon: 420, heuvel: false }); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 300); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?');
    e1Burcht(ctx, 1100, 640, 0.95, { doorsnede: true, waterW: 2.4, bewoners: (x, y) => ecoBever(ctx, x, y, 0.8, { houding: 'staan', kijk: -1, a: 0.6 }) });
    ctx.fillStyle = rgba(E1.water, 0.6); ctx.fillRect(0, 470, W, 170); ctx.strokeStyle = E1.waterL; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(W, 470); ctx.stroke(); metaText(ctx, 'normale waterlijn', 80, 630, C.text2, 'left', 26);
    ecoBever(ctx, 640, 470, 3.6, { houding: 'zwemmen', water: false }); ecoBever(ctx, 960, 468, 2.0, { houding: 'zwemmen', water: false });
    naamBij(ctx, 'hoogwater', 'dichtheidsonafhankelijk', 300, 400, 1, 'left'); ecoSchaal(ctx, 'doorsnede · schematisch'); },
  e1s35(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); const x = 260, y = 800, w = 1300, h = 600;
    e1As(ctx, x, y, w, h, { xLabel: 'tijd', yLabel: 'populatiegrootte' });
    const P = []; for (let i = 0; i <= 100; i++) { const u = i / 100; let n = 0.62 / (1 + Math.exp(-(u - 0.18) * 20)); if (u > 0.3) n += 0.06 * Math.sin(u * 34) * Math.min(1, (u - 0.3) * 5); P.push([x + u * w, y - n * h]); }
    e1Lijn(ctx, P, C.okerD, 7); ctx.save(); ctx.setLineDash([14, 12]); lijn(ctx, [[x, y - 0.62 * h], [x + w, y - 0.62 * h]], C.goud, 3); ctx.restore();
    pijl(ctx, x + 0.62 * w, y - 0.8 * h, x + 0.62 * w, y - 0.7 * h, C.koraal, 1, 5, 18); pijl(ctx, x + 0.71 * w, y - 0.44 * h, x + 0.71 * w, y - 0.54 * h, C.groen, 1, 5, 18);
    naamBij(ctx, 'populatieregulatie', 'dynamiek rond de draagkracht', x + 0.5 * w, y - 0.2 * h, 1, 'center'); haak(ctx, x + 0.35 * w, x + w, y - 0.84 * h - 60, 'biologisch evenwicht', C.groen); },
  e1s36(ctx) { e1Macro(ctx, { horizon: 520 }); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?');
    ctx.fillStyle = E1.water; ctx.fillRect(0, 700, 860, 140); ctx.fillRect(860, 590, W - 860, 140); e1Oever(ctx, 840, { golf: 4 }); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(860, 730, W - 860, 120);
    e1Stuw(ctx, 860, 640, 0.9, { plank: true }); ecoBever(ctx, 760, 640, 1.3, { houding: 'lopen', t: 0.2, kijk: 1 });
    e1Wilg(ctx, 1500, 600, 0.4, { knot: true }); e1Wilg(ctx, 1800, 600, 0.35, { knot: true });
    naamBij(ctx, 'barrière opgeheven', 'loopplank langs de stuw', 520, 420, 1, 'center'); naamBij(ctx, 'lege oevers', '', 1640, 560, 1, 'center'); },
  e1s37(ctx) { e1Macro(ctx, { horizon: 520 }); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx);
    e1Veldmuis(ctx, 360, 640, 9, {}); for (let i = 0; i < 7; i++) e1Veldmuis(ctx, 200 + i * 64, 760, 9, { jong: true, kijk: i % 2 ? 1 : -1 });
    ecoBever(ctx, 1360, 760, 2.0, { houding: 'staan', kijk: -1 }); ecoBever(ctx, 1600, 770, 1.0, { houding: 'staan', kijk: -1 }); ecoBever(ctx, 1760, 772, 0.9, { houding: 'lopen', kijk: -1, t: 0.4 });
    naamBij(ctx, 'r-strateeg', 'veel jongen · weinig zorg', 420, 300, 1, 'center'); naamBij(ctx, 'K-strateeg', 'weinig jongen · lang zorgen', 1460, 300, 1, 'center');
    ecoSchaal(ctx, 'muis vergroot · niet op dezelfde schaal'); },
  e1s38(ctx) { e1Macro(ctx, { horizon: 460 }); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx);
    ctx.fillStyle = E1.gras; ctx.fillRect(0, 560, W, 340); for (let i = 0; i < 26; i++) { const x = 80 + hash(i * 3.1) * 1300, y = 600 + hash(i * 7.7) * 260; ctx.fillStyle = '#7A6A50'; ctx.beginPath(); ctx.ellipse(x, y, 60 + hash(i) * 70, 18 + hash(i * 2) * 14, 0, 0, 6.283); ctx.fill(); circ(ctx, x + 10, y, 7, '#2A2018'); circ(ctx, x - 22, y + 3, 6, '#2A2018'); }
    persoon(ctx, 'gerrit', 1640, 900, 330, { outfit: 'gewoon', uit: 'bezorgd', kijk: -1 }); e1Veldmuis(ctx, 900, 760, 4, {}); e1Veldmuis(ctx, 600, 820, 4, { kijk: -1 });
    naamBij(ctx, 'muizenplaag', 'het jaar 2026 · ± 18 000 ha grasland', 700, 400, 1, 'center'); ecoSchaal(ctx, 'muizen vergroot'); },
  e1s39(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx);
    const lb = ['0–1 jaar', '1–2 jaar', '2–3 jaar', '3+ jaar']; e1Piramide(ctx, 720, 800, [110, 70, 46, 30], { bh: 90, sc: 4, labels: lb }); e1Piramide(ctx, 1450, 800, [52, 46, 42, 38], { bh: 90, sc: 4 });
    text(ctx, 'groeiende populatie', 720, 300, fTekst(44, 700), C.text, 'center'); text(ctx, 'rond de draagkracht', 1450, 300, fTekst(44, 700), C.text, 'center'); metaText(ctx, 'leeftijdsopbouw · voorbeeld', 960, 880, C.text2, 'center', 26); },
  e1s40(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx);
    e1KaartMarkermeer(ctx, 200, 180, 1.0);
    pijl(ctx, 230, 330, 700, 400, C.teal, 1, 5, 20); pijl(ctx, 1020, 240, 790, 380, C.groen, 1, 5, 20); pijl(ctx, 420, 760, 680, 500, C.goud, 1, 5, 20);
    text(ctx, 'wind', 400, 320, fTekst(36, 600), C.teal, 'center'); text(ctx, 'vogels', 960, 220, fTekst(36, 600), C.groen, 'center'); text(ctx, 'water', 470, 660, fTekst(36, 600), C.goud, 'center');
    naamBij(ctx, 'Marker Wadden', 'vanaf 2016 · ± 400 soorten in 2021', 1460, 420, 1, 'left'); ecoSchaal(ctx, 'kaart · schematisch'); },
  e1q41(ctx) { _vk1(ctx, ['Twee nieuwe eilanden: een groot eiland dicht bij de kust, een klein eiland ver op zee.', 'Waar leven na twintig jaar de meeste soorten?'], ['Op het grote eiland dichtbij', 'Op het kleine eiland ver weg', 'Op allebei evenveel: elke soort heeft ze dan bereikt']); vwoMarker(ctx); },
  e1s42(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx); const x = 300, y = 800, w = 1200, h = 560;
    e1As(ctx, x, y, w, h, { xLabel: 'aantal soorten op het eiland', yLabel: 'snelheid' });
    const im = (k) => [[x, y - h * 0.9 * k], [x + w, y - 0.02 * h]], ex = (k) => [[x, y - 0.02 * h], [x + w, y - h * 0.9 * k]];
    e1Lijn(ctx, im(1), C.groen, 6); e1Lijn(ctx, im(0.55), rgba(C.groen, 0.55), 5, [12, 10]); e1Lijn(ctx, ex(0.55), C.koraal, 6); e1Lijn(ctx, ex(1), rgba(C.koraal, 0.55), 5, [12, 10]);
    text(ctx, 'vestigen · dichtbij', x + 20, y - h * 0.9 - 14, fTekst(36, 700), C.groen, 'left'); text(ctx, 'vestigen · ver weg', x + 20, y - h * 0.5 - 20, fTekst(36, 600), rgba(C.groen, 0.8), 'left');
    text(ctx, 'uitsterven · klein eiland', x + w, y - h * 0.9 - 14, fTekst(36, 600), rgba(C.koraal, 0.8), 'right'); text(ctx, 'uitsterven · groot eiland', x + w, y - h * 0.5 - 20, fTekst(36, 700), C.koraal, 'right');
    circ(ctx, x + w * (1 / 1.55), y - h * 0.9 * 0.55 / 1.55, 14, C.goud, C.bgSchema, 3); circ(ctx, x + w * (0.55 / 1.55), y - h * 0.9 * 0.55 / 1.55, 14, rgba(C.goud, 0.5), C.bgSchema, 3);
    metaText(ctx, 'meeste soorten', x + w * (1 / 1.55), y + 60, C.goud, 'center', 26); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  e1s43(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'WAT HOUDT HET AANTAL IN TOOM?'); vwoMarker(ctx);
    pot(ctx, 340, 640, 1.0, { p: 0.85, n: 26, seed: 3, label: 'kleine populatie' }); pot(ctx, 1320, 640, 1.0, { p: 0.4, n: 40, seed: 5, label: 'buurpopulatie' });
    ecoBever(ctx, 960, 800, 2.4, { houding: 'lopen', kijk: -1, t: 0.3 }); pijl(ctx, 1190, 860, 730, 860, C.teal, 1, 5, 20);
    naamBij(ctx, 'immigrant', 'brengt nieuwe allelen mee', 960, 560, 1, 'center'); ecoSchaal(ctx, 'drift en inteelt: evolutie 4 en 5'); },
  // ---------------- Samenvatting
  e1s44(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'SAMENVATTING');
    e1Oeverlint(ctx, 160, 380, 1600, 12, { h: 70 }); naamBij(ctx, 'één territorium', '2 tot 4 km oever · 4 tot 6 bevers', 300, 560, 1, 'left');
    text(ctx, 'draagkracht = geschikte oever ÷ oever per familie', 960, 760, fTekst(48, 700), C.goud, 'center'); },
  e1s45(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'SAMENVATTING');
    text(ctx, '2 km oever per familie · 5 bevers per familie', 960, 240, fTekst(44, 600), C.text2, 'center');
    text(ctx, '3000 km ÷ 2 km = 1500 families × 5 ≈ 7500 bevers', 960, 380, fTekst(56, 800), C.goud, 'center'); text(ctx, '6000 km ÷ 2 km = 3000 families × 5 ≈ 15 000 bevers', 960, 490, fTekst(56, 800), C.goud, 'center');
    metaText(ctx, 'rekenvoorbeeld · aangenomen getallen', 960, 580, C.text2, 'center', 28); haak(ctx, 420, 1500, 630, 'het antwoord hangt af van hoeveel geschikte oever er is', C.groen); },
  e1s46(ctx) { _e1Sloot(ctx); ecoTag(ctx, 1, 'SAMENVATTING'); persoon(ctx, 'gerrit', 600, 900, 330, { outfit: 'gewoon', uit: 'blij' });
    _vSpoor(ctx, 1150, 690); ecoBever(ctx, 1240, 700, _S1, { houding: 'zwemmen', water: false });
    const x = 1240, y = 380, w = 420, h = 200; const P = []; for (let i = 0; i <= 30; i++) { const u = i / 30; P.push([x + u * w, y - h / (1 + Math.exp(-(u - 0.45) * 11))]); } e1Lijn(ctx, P, C.goud, 6); text(ctx, 'S', x + w + 30, y - h + 30, fTitel(72), C.goud, 'left'); },
  e1s47(ctx) { _bg1(ctx); ecoTag(ctx, 1, 'EINDKAART');
    ['Een populatie groeit door geboorte en immigratie, en krimpt door sterfte en emigratie.', 'Zonder rem groeit ze exponentieel (J); met rem tot de draagkracht (S).', 'Dichtheidsafhankelijke factoren houden het aantal rond de draagkracht.']
      .forEach((s, i) => text(ctx, s, 160, 300 + i * 130, fTekst(46, 600), C.text, 'left')); haak(ctx, 160, 1700, 620, 'een populatie groeit niet eeuwig door', C.groen); },
};
