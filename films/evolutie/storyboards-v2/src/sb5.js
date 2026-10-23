// Evolutie v2 · film 5 Toeval en uitwisseling — storyboard: één keyframe per scène (22 okt 2026)
// Allel achromatopsie = oker (allel 2), normaal = teal (allel 1). Krachten: selectie groen, drift goud, genenstroom lichte teal (#9CCBE3, review 22 okt), mutatie paars.
const _F5 = 5, K = EVO.kracht;
function goudRing(ctx, x, y, r) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function f5Bg(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function telRaster(ctx, x, y, kol, rij, dx, h, grijs, kleurGewoon = C.text2) { let i = 0; for (let r = 0; r < rij; r++) for (let k = 0; k < kol; k++, i++) telpop(ctx, x + k * dx, y + r * h * 1.25, h, grijs.includes(i) ? C.oker : kleurGewoon, grijs.includes(i) ? 1 : 0.55); }
function zigzag(ctx, x1, y1, x2, y2, kleur, lw = 4) { ctx.save(); ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); const n = 6; for (let i = 0; i <= n; i++) { const u = i / n, px = lerp(x1, x2, u), py = lerp(y1, y2, u) + (i % 2 ? -18 : 18) * (i > 0 && i < n ? 1 : 0); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); pijl(ctx, lerp(x1, x2, 0.92), lerp(y1, y2, 0.92), x2, y2, kleur, 1, lw); }
function vierKrachten(ctx, aan) { // pot in het midden met pijlen
  pot(ctx, 960, 760, 1.2, { p: 0.6, n: 70, seed: 9, a: 1 }); allelBalk(ctx, 800, 800, 320, 0.6, { procent: false });
  const d = { selectie: () => { pijl(ctx, 1460, 420, 1150, 560, K.selectie, 1, 5); naamBij(ctx, 'selectie', 'hangt af van de omgeving', 1480, 400, 1, 'left', K.selectie); },
    drift: () => { zigzag(ctx, 420, 420, 770, 560, K.drift, 5); naamBij(ctx, 'drift', 'toeval, geen richting', 400, 400, 1, 'right', K.drift); },
    stroom: () => { pijl(ctx, 420, 760, 760, 700, K.stroom, 1, 5); pijl(ctx, 760, 740, 420, 820, K.stroom, 1, 5); naamBij(ctx, 'genenstroom', 'allelen erin en eruit', 400, 900 - 40, 1, 'right', _lt(K.stroom, 0.3)); },
    mutatie: () => { knikker(ctx, 1300, 640, 18, K.mutatie); pijl(ctx, 1280, 660, 1150, 720, K.mutatie, 1, 4); naamBij(ctx, 'mutatie', 'zeldzaam, nieuwe knikker', 1340, 650, 1, 'left', _lt(K.mutatie, 0.3)); } };
  for (const k of Object.keys(d)) { if (aan[k] == null) continue; ctx.save(); ctx.globalAlpha *= aan[k]; d[k](); ctx.restore(); } }

const SB5 = {
  e5s01(ctx) { atolMacro(ctx); evoTag(ctx, _F5, 'OPENING'); naamBij(ctx, 'Pingelap', 'atol in de Grote Oceaan · ±250 inwoners', 80, 200, 1, 'left'); },
  e5s02(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'OPENING'); telRaster(ctx, 210, 340, 5, 4, 120, 110, [13]); naamBij(ctx, 'Pingelap', '±1 op de 20', 450, 900 - 80, 1, 'center');
    ctx.fillStyle = rgba(C.text2, 0.3); for (let i = 0; i < 1500; i++) { const x = 1000 + (i % 50) * 16, y = 250 + Math.floor(i / 50) * 16; ctx.fillRect(x, y, 9, 9); } ctx.fillStyle = C.oker; ctx.fillRect(1000 + 37 * 16 - 3, 250 + 19 * 16 - 3, 15, 15);
    naamBij(ctx, 'elders', '1 op de 30.000 · uitsnede', 1400, 900 - 80, 1, 'center'); },
  e5s03(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'OPENING'); pot(ctx, 760, 820, 1.4, { p: 0.75, n: 90, seed: 6 }); allelBalk(ctx, 580, 870, 360, 0.75, { procent: false });
    naamBij(ctx, 'allel voor achromatopsie', 'geen voordeel', 1100, 460, 1, 'left', EVO.a2R); text(ctx, '?', 1240, 700, fTitel(180), C.goud, 'center'); },
  e5s04(ctx) { titelKaart(ctx, _F5, 'Toeval en uitwisseling', ['Kan een allel vaak worden', 'zonder dat het iets oplevert?'], (c) => {
    pot(c, 1460, 860, 1.25, { p: 0.6, n: 80, seed: 3 }); zigzag(c, 1060, 500, 1300, 600, K.drift, 5); pijl(c, 1860, 520, 1620, 620, K.selectie, 1, 5); }); },
  e5s05(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENETISCHE DRIFT'); pot(ctx, 560, 800, 1.35, { p: 0.5, n: 90, seed: 12 }); pot(ctx, 1360, 800, 1.35, { p: 0.5, n: 22, seed: 13 });
    for (const [x, y, k] of [[900, 420, EVO.a1], [950, 390, EVO.a2], [1000, 430, EVO.a2], [1050, 400, EVO.a1]]) knikker(ctx, x, y, 18, k); pijl(ctx, 820, 470, 1120, 470, C.line, 1, 3);
    metaText(ctx, 'generatie 1', 560, 880, C.text2, 'center', 26); metaText(ctx, 'generatie 2', 1360, 880, C.text2, 'center', 26); naamBij(ctx, 'een greep uit de pot', null, 960, 330, 1, 'center', C.goud); },
  e5s06(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENETISCHE DRIFT'); pot(ctx, 960, 820, 1.6, { p: 0.5, n: 110, seed: 14 });
    for (const [x, y, k, a] of [[700, 300, EVO.a1, 1], [760, 260, EVO.a2, 1], [1160, 300, EVO.a2, 0.35], [1230, 260, EVO.a1, 0.35], [820, 330, EVO.a1, 1], [1100, 340, EVO.a2, 1]]) knikker(ctx, x, y, 20, k, a);
    naamBij(ctx, 'mee', null, 760, 200, 1, 'center', C.goud); naamBij(ctx, 'blijven achter', 'ongeluk, geen partner', 1200, 200, 1, 'center', C.text2); },
  e5q07(ctx) { vraagKaart(ctx, ['Tien dieren, de helft van de allelen blauw. Geen selectie.', 'Elke generatie trek je blind. Na zestig generaties?'], ['Precies de helft: zonder selectie verandert er niets', 'Het dominante allel wordt vanzelf vaker', 'Het schommelt, en vaak is één allel helemaal verdwenen'], _F5); },
  e5s08(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENETISCHE DRIFT'); frequentieGrafiek(ctx, 260, 830, 1400, 560, DRIFT.klein, { titel: 'simulatie · 10 dieren · 8 keer', markeer: 1 }); },
  e5s09(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENETISCHE DRIFT'); frequentieGrafiek(ctx, 180, 830, 700, 560, DRIFT.klein, { titel: '10 dieren', a: 0.6 }); frequentieGrafiek(ctx, 1080, 830, 700, 560, DRIFT.groot, { titel: '5000 dieren' }); },
  e5s10(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENETISCHE DRIFT'); frequentieGrafiek(ctx, 180, 760, 700, 500, DRIFT.klein, { titel: '10 dieren' }); frequentieGrafiek(ctx, 1080, 760, 700, 500, DRIFT.groot, { titel: '5000 dieren', a: 0.6 });
    haak(ctx, 180, 880, 810, 'drift: sterk in kleine populaties', K.drift); naamBij(ctx, 'genetische drift', 'verandering van allelfrequenties door toeval', 960, 150, 1, 'center', K.drift); },
  e5s11(ctx) { atolMacro(ctx, { storm: 1 }); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT');
    ctx.strokeStyle = rgba('#AFC0D0', 0.5); ctx.lineWidth = 3; for (let i = 0; i < 14; i++) { const x = 140 + i * 130, y = 120 + (i % 3) * 70; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 70, y + 160); ctx.stroke(); }
    naamBij(ctx, 'tyfoon', 'rond 1775 · daarna hongersnood', 80, 200, 1, 'left'); evoSchaal(ctx, '±20 overlevenden'); },
  e5s12(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT'); pot(ctx, 440, 820, 1.5, { p: 0.995, n: 100, seed: 15, extra: [[EVO.a2, 1]] });
    flessenhals(ctx, 960, 560, 1.4, { kleur: K.drift }); pot(ctx, 1480, 820, 0.9, { p: 39 / 40, n: 40, seed: 16 }); knikker(ctx, 960, 560, 16, EVO.a2); goudRing(ctx, 960, 560, 26);
    naamBij(ctx, 'flessenhalseffect', null, 960, 330, 1, 'center', K.drift); metaText(ctx, 'vóór de tyfoon', 440, 880, C.text2, 'center', 26); metaText(ctx, '±20 mensen · 40 allelen', 1480, 880, C.text2, 'center', 26); },
  e5q13(ctx) { vraagKaart(ctx, ['Een populatie gaat door een flessenhals:', 'van duizend naar twintig dieren. Wat gebeurt er met de genetische variatie?'], ['Die neemt af: zeldzame allelen komen er vaak niet door', 'Die neemt toe: in een kleine groep ontstaan meer mutaties', 'Die blijft gelijk: alle allelen zijn er nog, alleen minder vaak'], _F5); },
  e5s14(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT'); const ps = [0.975, 0.95, 0.9, 0.85];
    ps.forEach((p, i) => { const x = 360 + i * 400; pot(ctx, x, 700, 0.9, { p, n: 40, seed: 40 + i }); allelBalk(ctx, x - 130, 740, 260, p, { procent: false }); metaText(ctx, 'generatie ' + (i * 2 + 1), x, 840, C.text2, 'center', 26); if (i < 3) zigzag(ctx, x + 140, 480, x + 260, 480, K.drift, 3); });
    naamBij(ctx, 'klein blijven: drift werkt door', null, 960, 230, 1, 'center', K.drift); evoSchaal(ctx, 'schematisch'); },
  e5s15(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT');
    allelBalk(ctx, 420, 300, 1000, 0.975, { procent: false, h: 46 }); allelBalk(ctx, 420, 520, 1000, 0.78, { procent: false, h: 46 });
    metaText(ctx, 'na de tyfoon', 390, 334, C.text2, 'right', 26); metaText(ctx, 'nu', 390, 554, C.text2, 'right', 26);
    naamBij(ctx, '±3 op de 10 dragers', '±1 op de 20 achromatopsie', 1450, 540, 1, 'left', EVO.a2R);
    telRaster(ctx, 440, 720, 20, 1, 50, 90, [1, 4, 8, 11, 15, 18]); metaText(ctx, 'dragers', 390, 770, C.oker, 'right', 26); haak(ctx, 420, 1420, 800, 'toeval, geen selectie', K.drift); },
  e5s16(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT'); pot(ctx, 480, 820, 1.5, { p: 0.5, n: 100, seed: 18 });
    vul(ctx, [[1150, 800], [1300, 760], [1500, 750], [1680, 790], [1700, 820], [1140, 830]], C.okerD); pot(ctx, 1420, 760, 0.8, { p: 0.67, n: 3, seed: 19 });
    for (const [x, y, k] of [[860, 420, EVO.a1], [920, 390, EVO.a1], [980, 430, EVO.a2]]) knikker(ctx, x, y, 18, k); pijl(ctx, 720, 470, 1200, 470, C.line, 1, 3);
    naamBij(ctx, 'founder-effect', 'een paar stichters, toevallige allelen', 960, 290, 1, 'center', K.drift); metaText(ctx, 'leeg eiland', 1420, 880, C.text2, 'center', 26); },
  e5s17(ctx) { macroNacht(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT'); jachtluipaard(ctx, 960, 860, 1.15, { fase: 0.15 });
    naamBij(ctx, 'jachtluipaard', 'Acinonyx jubatus', 80, 200, 1, 'left'); evoSchaal(ctx, 'flessenhals ±12.000 jaar geleden'); },
  e5s18(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT'); jachtluipaard(ctx, 520, 640, 0.75); jachtluipaard(ctx, 1400, 640, 0.75, { kijk: -1 });
    roundRect(ctx, 920, 380, 80, 80, 10); shape(ctx, '#D3A35E', C.goud, 3); circ(ctx, 948, 410, 7, '#1E1A16'); circ(ctx, 975, 438, 6, '#1E1A16'); pijl(ctx, 760, 420, 900, 420, C.line, 1, 3); pijl(ctx, 1020, 420, 1160, 420, C.line, 1, 3);
    for (let i = 0; i < 14; i++) { const x = 560 + i * 60, y = 800; ctx.strokeStyle = C.groen; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 12, y); ctx.lineTo(x - 2, y + 12); ctx.lineTo(x + 16, y - 14); ctx.stroke(); }
    naamBij(ctx, '14 van de 14 geaccepteerd', "O'Brien e.a. 1985", 960, 200, 1, 'center', C.groen); },
  e5s19(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'FLESSENHALS EN FOUNDER-EFFECT');
    pot(ctx, 560, 800, 1.3, { p: 0.4, n: 90, seed: 21, extra: [[C.paars, 10], [C.koraal, 10], [C.groen, 10]] }); pot(ctx, 1360, 800, 1.3, { p: 0.98, n: 90, seed: 22 });
    metaText(ctx, 'andere katachtigen', 560, 880, C.text2, 'center', 26); metaText(ctx, 'jachtluipaard', 1360, 880, C.goud, 'center', 26);
    naamBij(ctx, 'afweergenen', 'weinig variatie = risico bij een nieuwe ziekte', 960, 250, 1, 'center'); evoSchaal(ctx, 'schematisch'); },
  e5s20(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENENSTROOM'); const R = [[220, 260, 520, 300], [1180, 230, 520, 300], [260, 610, 520, 260], [1150, 590, 560, 280]];
    R.forEach(([x, y, w, h], i) => { reservaat(ctx, x, y, w, h); jachtluipaard(ctx, x + w * 0.38, y + h * 0.8, 0.28, { kijk: i % 2 ? -1 : 1 }); pot(ctx, x + w * 0.8, y + h * 0.82, 0.42, { p: [0.9, 0.3, 0.6, 1][i], n: 12, seed: 60 + i }); });
    naamBij(ctx, 'Zuid-Afrika', 'omheinde reservaten', 960, 160, 1, 'center'); },
  e5s21(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENENSTROOM'); const R = [[220, 260, 520, 300], [1180, 230, 520, 300], [260, 610, 520, 260], [1150, 590, 560, 280]];
    R.forEach(([x, y, w, h], i) => { reservaat(ctx, x, y, w, h); jachtluipaard(ctx, x + w * 0.38, y + h * 0.8, 0.28, { kijk: i % 2 ? -1 : 1, a: i === 1 ? 0.35 : 1 }); pot(ctx, x + w * 0.8, y + h * 0.82, 0.42, { p: [0.9, 0.3, 0.6, 1][i], n: 12, seed: 60 + i }); });
    pijl(ctx, 1300, 560, 760, 690, K.stroom, 1, 6); pijl(ctx, 780, 400, 1160, 380, K.stroom, 1, 6); knikker(ctx, 1010, 600, 16, EVO.a2); knikker(ctx, 1046, 592, 16, EVO.a2);
    naamBij(ctx, 'genenstroom', 'sinds 2011 verhuizen naar ander reservaat', 960, 160, 1, 'center', _lt(K.stroom, 0.3)); },
  e5q22(ctx) { vraagKaart(ctx, ['Twee populaties: 90 en 10 procent blauw.', 'Elke generatie verhuist één op de twintig dieren.'], ['Ze blijven zo verschillend: zo weinig dieren maakt niet uit', 'Na een tijd gaan de twee potten op elkaar lijken', 'Allebei gaan ze naar honderd procent blauw'], _F5); },
  e5s23(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENENSTROOM'); frequentieGrafiek(ctx, 300, 830, 1300, 560, STROOM, { gen: 40, kleuren: [K.stroom, _lt(K.stroom, 0.45)], titel: 'simulatie · 5% uitwisseling per generatie' });
    naamBij(ctx, 'populatie A', null, 1620, 830 - 0.52 * 560 - 30, 1, 'left', K.stroom); naamBij(ctx, 'populatie B', null, 1620, 830 - 0.55 * 560 + 60, 1, 'left', _lt(K.stroom, 0.45)); },
  e5s24(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'GENENSTROOM'); pot(ctx, 640, 760, 1.2, { p: 0.55, n: 70, seed: 70 }); pot(ctx, 1280, 760, 1.2, { p: 0.5, n: 70, seed: 71 });
    pijl(ctx, 820, 420, 1100, 420, K.stroom, 1, 5); pijl(ctx, 1100, 480, 820, 480, K.stroom, 1, 5); haak(ctx, 460, 1460, 820, 'genenstroom: potten gaan op elkaar lijken', _lt(K.stroom, 0.3)); },
  e5s25(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'VIER KRACHTEN IN ÉÉN POT'); vierKrachten(ctx, { selectie: 1 }); },
  e5s26(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'VIER KRACHTEN IN ÉÉN POT'); vierKrachten(ctx, { selectie: 0.35, drift: 1 }); },
  e5s27(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'VIER KRACHTEN IN ÉÉN POT'); vierKrachten(ctx, { selectie: 0.35, drift: 0.35, stroom: 1, mutatie: 1 }); },
  e5q28(ctx) { vraagKaart(ctx, 'Welke kracht kan een allel vaak maken, ook als het niets oplevert of zelfs schaadt?', ['Selectie', 'Mutatie', 'Genetische drift'], _F5); },
  e5s29(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'VIER KRACHTEN IN ÉÉN POT'); pingelapKaart(ctx, 620, 500, 0.95, { namen: false });
    pot(ctx, 1380, 760, 1.15, { p: 0.78, n: 70, seed: 6 }); allelBalk(ctx, 1220, 800, 320, 0.78, { procent: false }); zigzag(ctx, 1000, 330, 1260, 450, K.drift, 5);
    pijl(ctx, 1760, 330, 1530, 450, K.selectie, 0.35, 5); naamBij(ctx, 'drift', 'kijkt niet naar voordeel', 1120, 280, 1, 'center', K.drift); },
  e5s30(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); pot(ctx, 700, 760, 1.3, { p: 0.6, n: 80, seed: 80 }); allelBalk(ctx, 520, 810, 360, 0.6, { procent: false });
    naamBij(ctx, 'Hardy-Weinberg', 'een meetlat voor de pot', 1100, 480, 1, 'left', C.goud); },
  e5s31(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); allelBalk(ctx, 360, 440, 1200, 0.6, { procent: false, h: 70 });
    text(ctx, 'p', 360 + 360, 500, fTekst(64, 700), C.bgMicro, 'center'); text(ctx, 'q', 360 + 960, 500, fTekst(64, 700), C.bgMicro, 'center');
    text(ctx, 'p + q = 1', 960, 700, fTitel(96), C.text, 'center'); },
  e5s32(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); pot(ctx, 360, 640, 1.0, { p: 0.6, n: 55, seed: 81 });
    knikker(ctx, 640, 330, 22, EVO.a1); knikker(ctx, 700, 330, 22, EVO.a2); pijl(ctx, 560, 380, 620, 350, C.line, 1, 3);
    genotypeBalk(ctx, 760, 480, 1000, 0.6, { h: 90 }); for (const [x, t] of [[760 + 180, 'twee keer blauw'], [760 + 600, 'één van elk'], [760 + 920, 'twee keer geel']]) metaText(ctx, t, x, 640, C.text2, 'center', 26); },
  e5s33(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); genotypeBalk(ctx, 460, 240, 1000, 0.6, { h: 80 });
    const v = ['grote populatie', 'willekeurig paren', 'geen selectie', 'geen genenstroom', 'geen mutatie']; v.forEach((t, i) => { const x = 160 + i * 330; roundRect(ctx, x, 440, 300, 110, 14); shape(ctx, rgba(C.fill, 0.8), C.line, 1.5); text(ctx, t, x + 150, 508, fTekst(36, 600), C.text, 'center'); });
    haak(ctx, 160, 1790, 590, 'wijkt het af? dan werkt er een kracht', C.groen); },
  e5s34(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); ctx.fillStyle = rgba(C.text2, 0.3); for (let i = 0; i < 2500; i++) { const x = 360 + (i % 100) * 12, y = 220 + Math.floor(i / 100) * 22; ctx.fillRect(x, y, 8, 16); }
    ctx.fillStyle = C.oker; ctx.fillRect(360 + 63 * 12 - 2, 220 + 13 * 22 - 2, 12, 20); naamBij(ctx, '1 op de 2500 ziek', 'q² = 1/2500', 960, 820, 1, 'center', EVO.a2R); },
  e5q35(ctx) { vwoMarker(ctx); vraagKaart(ctx, ['Eén op de 2500 baby\'s heeft een recessieve ziekte.', 'Welk deel van de mensen is drager van het allel?'], ['Ongeveer één op de vijftig', 'Ongeveer één op de vijfentwintig', 'Eén op de 2500'], _F5); ctx.fillStyle = C.paars; ctx.fillRect(0, 0, 6, H); metaText(ctx, 'VWO', W - 80, 78, C.paars, 'right', 28); },
  e5s36(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HARDY-WEINBERG'); const r = [['q² = 1/2500', C.text2], ['q = √(1/2500) = 1/50', C.text2], ['p ≈ 1', C.text2], ['2pq ≈ 2 × 1/50 = 1/25 ≈ 4%', C.goud]];
    r.forEach(([t, c], i) => text(ctx, t, 300, 300 + i * 120, fTekst(60, 600), c, 'left')); naamBij(ctx, 'drager', 'één van elk allel · niet ziek', 1300, 660, 1, 'left', C.goud); },
  e5s37(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); vwoMarker(ctx); evoTag(ctx, _F5, 'HETEROZYGOTENVOORDEEL');
    bloedvat(ctx, [[-50, 560], [500, 520], [1000, 600], [1500, 540], [1980, 580]], 150, 0, { n: 0 });
    for (const [x, y, an, sk] of [[260, 540, 0.2, 0], [520, 500, -0.3, 1], [780, 560, 0.1, 0], [1040, 600, 0.5, 1], [1300, 560, -0.2, 1], [1560, 540, 0.3, 0], [1760, 590, -0.1, 1]]) sk ? sikkelcel(ctx, x, y, 46, an) : rodeBloedcel(ctx, x, y, 52, an, 0);
    naamBij(ctx, 'sikkelcel', 'bij weinig zuurstof', 520, 380, 1, 'center'); naamBij(ctx, 'normale rode bloedcel', null, 260, 680, 1, 'center'); evoSchaal(ctx, 'rode bloedcel ±7 µm · vergroot'); },
  e5s38(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); vwoMarker(ctx); evoTag(ctx, _F5, 'HETEROZYGOTENVOORDEEL');
    bloedvat(ctx, [[-50, 520], [600, 520], [900, 540], [1980, 540]], 70, 0, { n: 0 }); for (const [x, y, an] of [[820, 520, 0.3], [900, 540, -0.4], [960, 520, 0.6], [1040, 545, -0.2]]) sikkelcel(ctx, x, y, 34, an);
    for (const [x, y] of [[300, 520], [480, 525]]) rodeBloedcel(ctx, x, y, 40, 0, 0.8); naamBij(ctx, 'sikkelcellen blijven haken', 'twee sikkelcelallelen', 960, 380, 1, 'center', C.koraal); },
  e5q39(ctx) { vraagKaart(ctx, 'Waarom blijft het sikkelcelallel in malariagebieden zo gewoon?', ['Dragers worden minder vaak ernstig ziek van malaria', 'Het allel ontstaat daar steeds opnieuw door mutatie', 'Door drift, want die populaties zijn klein'], _F5); ctx.fillStyle = C.paars; ctx.fillRect(0, 0, 6, H); metaText(ctx, 'VWO', W - 80, 78, C.paars, 'right', 28); },
  e5s40(ctx) { f5Bg(ctx); vwoMarker(ctx); evoTag(ctx, _F5, 'HETEROZYGOTENVOORDEEL'); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(260, 600); ctx.lineTo(1660, 600); ctx.stroke();
    const d = [[480, [EVO.a1, EVO.a1], 'twee normale allelen', 'ernstige malaria'], [960, [EVO.a1, EVO.a2], 'drager', '±9× minder ernstige malaria'], [1440, [EVO.a2, EVO.a2], 'twee sikkelcelallelen', 'sikkelcelziekte']];
    for (const [x, [a, b], n, m] of d) { knikker(ctx, x - 30, 520, 30, a); knikker(ctx, x + 30, 520, 30, b); naamBij(ctx, n, m, x, 670, 1, 'center', x === 960 ? C.groen : C.text); }
    haak(ctx, 820, 1100, 760, 'heterozygotenvoordeel', C.groen); metaText(ctx, 'blauw = normaal allel · geel = sikkelcelallel', 960, 300, C.text2, 'center', 26); },
  e5s41(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'SAMENGEVAT'); frequentieGrafiek(ctx, 260, 760, 600, 420, DRIFT.klein, { titel: 'klein' }); frequentieGrafiek(ctx, 1100, 760, 600, 420, DRIFT.groot, { titel: 'groot' });
    naamBij(ctx, 'genetische drift', 'toeval · sterk in kleine populaties', 960, 200, 1, 'center', K.drift); },
  e5s42(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'SAMENGEVAT'); card(ctx, 200, 300, 720, 300, 'flessenhals · founder-effect', 'populatie ineens klein: variatie gaat verloren', 1, K.drift); card(ctx, 1000, 300, 720, 300, 'genenstroom', 'allelen tussen populaties: potten worden meer gelijk', 1, _lt(K.stroom, 0.3)); },
  e5s43(ctx) { f5Bg(ctx); evoTag(ctx, _F5, 'SAMENGEVAT'); pingelapKaart(ctx, 600, 480, 0.85); allelBalk(ctx, 1080, 420, 640, 0.78, { procent: false }); naamBij(ctx, 'allel achromatopsie', '±22% · was 1 op 40', 1720, 380, 1, 'right', EVO.a2R);
    haak(ctx, 1080, 1720, 560, 'vaak door toeval, niet door voordeel', K.drift); },
  e5s44(ctx) { f5Bg(ctx); metaText(ctx, 'EVOLUTIE 5/8 · SAMENGEVAT', 160, 200, C.text2, 'left', 28);
    const z = ['Drift: toeval verandert allelfrequenties, vooral in kleine populaties.', 'Flessenhals en founder-effect: weinig dieren, minder variatie.', 'Genenstroom: uitwisseling maakt populaties meer gelijk.'];
    z.forEach((t, i) => text(ctx, t, 200, 380 + i * 110, fTekst(48, 600), C.text, 'left')); ctx.strokeStyle = C.groen; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 320); ctx.lineTo(140, 320); ctx.lineTo(140, 640); ctx.lineTo(160, 640); ctx.stroke();
    text(ctx, 'Volgende film: Hoe één soort er twee wordt', 200, 800, fTekst(40, 500), C.text2, 'left'); },
};
