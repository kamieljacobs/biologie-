// Evolutie v2 · film 1 Wat is evolutie eigenlijk? — storyboard: één keyframe per scène (22 okt 2026)
const _F1 = 1;
const ORANJE_PLEK = [[1380, 760, 'succinea', 14, 0.3], [1555, 800, 'spectabilis', 0, -0.4], [1700, 740, 'succinea', 6, 1.2], [1230, 790, 'succinea', 18, -0.9], [1820, 805, 'succinea', 10, 0.6], [1620, 300, 'conspicua', 0, 0.15], [1470, 470, 'succinea', 12, -0.2]];
function f1Bg(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function goudRing(ctx, x, y, r) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); ctx.restore(); }
function broerZus(ctx, x1, x2, y, h, o = {}) { const A = persoon(ctx, 'yasmin', x1, y, h, { uit: o.uitY || 'blij' }); const B = persoon(ctx, 'bilal', x2, y, h, { uit: o.uitB || 'lacht', kijk: -1 }); return [A, B]; }
// drie paren + beestje eronder (genotype → fenotype)
function genotypeRij(ctx, x0, dx, y, o = {}) { const paren = [[EVO.a1, EVO.a1, 'spectabilis'], [EVO.a1, EVO.a2, 'spectabilis'], [EVO.a2, EVO.a2, 'succinea']];
  paren.forEach(([k1, k2, v], i) => { const x = x0 + i * dx; chromosoomPaar(ctx, x, y, 240, { allelen: [k1, k2] }); lhb(ctx, x, y + 270, 0.95, { vorm: v, stippen: 12 }); }); }
function allelRij(ctx, x, y, kleuren, r = 18, goud = []) { kleuren.forEach((k, i) => { knikker(ctx, x + i * (r * 2.5), y, r, k); if (goud.includes(i)) goudRing(ctx, x + i * (r * 2.5), y, r + 7); }); }

const SB1 = {
  e1s01(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'OPENING'); const [A, B] = broerZus(ctx, 760, 1160, 880, 640);
    for (const P of [A, B]) { goudRing(ctx, P.hoofd.x, P.hoofd.y - P.hoofd.r * 0.05, P.hoofd.r * 1.25); }
    naamBij(ctx, 'Yasmin', 'zus · 16', 520, 420, 1, 'right'); naamBij(ctx, 'Bilal', 'broer · 17', 1400, 400, 1, 'left'); },
  e1s02(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'OPENING'); broerZus(ctx, 760, 1160, 880, 640, { uitY: 'denkt', uitB: 'verbaasd' });
    text(ctx, '?', 960, 420, fTitel(160), C.goud, 'center'); },
  e1s03(ctx) { titelKaart(ctx, _F1, 'Wat is evolutie eigenlijk?', ['Waarom lijken broers en zussen op elkaar,', 'maar nooit precies?'], (c) => {
    pot(c, 1500, 820, 1.25, { p: 0.15, n: 80, seed: 4 }); lhb(c, 1170, 820, 0.9, { vorm: 'succinea', stippen: 14, rot: -0.3 }); lhb(c, 1260, 660, 0.8, { vorm: 'spectabilis', rot: 0.4 }); lhb(c, 1800, 860, 0.8, { vorm: 'conspicua', rot: -0.2 }); }); },
  e1s04(ctx) { kozijnHoek(ctx); evoTag(ctx, _F1, 'VARIATIE'); lhbGroep(ctx, ORANJE_PLEK.slice(0, 5), 0.9); lhb(ctx, 1520, 420, 0.9, { vorm: 'succinea', stippen: 12, rot: 0.5, open: 0.8 }); roundRect(ctx, 64, 846, 560, 50, 8); ctx.fillStyle = 'rgba(18,26,38,0.85)'; ctx.fill(); evoSchaal(ctx, 'oktober · ware grootte ±7 mm'); },
  e1s05(ctx) { kozijnHoek(ctx); evoTag(ctx, _F1, 'VARIATIE'); lhbGroep(ctx, ORANJE_PLEK, 0.9);
    for (const i of [0, 1, 5]) goudRing(ctx, ORANJE_PLEK[i][0], ORANJE_PLEK[i][1] - 4, 82);
    naamBij(ctx, 'Aziatisch lieveheersbeestje', 'Harmonia axyridis', 80, 160, 1, 'left'); },
  e1s06(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'VARIATIE'); const base = 700; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, base); ctx.lineTo(1620, base); ctx.stroke();
    const d = [[480, 'succinea', 81, 'oranje', 'zwarte stippen'], [960, 'spectabilis', 15, 'zwart', 'vier rode vlekken'], [1440, 'conspicua', 4, 'zwart', 'twee rode vlekken']];
    for (const [x, v, pc, n, m] of d) { const bh = pc * 4.4; roundRect(ctx, x + 110, base - bh, 70, bh, 8); shape(ctx, rgba(C.oker, 0.75), _lt(C.oker, 0.3), 1.5); text(ctx, pc + '%', x + 145, base - bh - 18, fTekst(40, 700), C.text, 'center'); lhb(ctx, x - 20, base - 120, 1.35, { vorm: v, stippen: 14 }); naamBij(ctx, n, m, x + 60, base + 60, 1, 'center'); }
    evoSchaal(ctx, 'telling in Brabant · 7160 beestjes · 2003–2015'); },
  e1s07(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'VARIATIE'); lhb(ctx, 520, 560, 2.2, { vorm: 'spectabilis' });
    chromosoomPaar(ctx, 1160, 470, 420, {}); naamBij(ctx, 'gen voor kleurvorm', null, 1240, 340, 1, 'left'); naamBij(ctx, 'allel', 'variant van een gen', 1240, 430, 1, 'left', C.goud);
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(1088, 470 - 210 + 420 * 0.32 - 16, 145, 32); },
  e1s08(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'VARIATIE'); genotypeRij(ctx, 560, 400, 400);
    naamBij(ctx, 'allel voor zwart', 'dominant', 80, 200, 1, 'left', EVO.a1R); naamBij(ctx, 'allel voor oranje', 'recessief', 1840, 200, 1, 'right', EVO.a2R);
    haak(ctx, 1260, 1460, 790, 'alleen zo oranje', C.groen); },
  e1q09(ctx) { vraagKaart(ctx, ['Twee oranje beestjes uit hetzelfde legsel.', 'Het ene groeit op in de kou, het andere in de warmte.'], ['Evenveel stippen: zelfde ouders, zelfde uiterlijk', 'Het beestje uit de warmte krijgt meer stippen', 'Het beestje uit de kou krijgt meer stippen'], _F1); },
  e1s10(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'VARIATIE'); thermometer(ctx, 360, 720, 360, 0.2, C.teal); thermometer(ctx, 1160, 720, 360, 0.8, C.koraal);
    lhb(ctx, 680, 520, 2.1, { vorm: 'succinea', stippen: 19 }); lhb(ctx, 1480, 520, 2.1, { vorm: 'succinea', stippen: 8 });
    naamBij(ctx, '14 °C', '19 stippen', 360, 800, 1, 'center'); naamBij(ctx, '28 °C', 'gemiddeld 8 stippen', 1160, 800, 1, 'center'); evoSchaal(ctx, 'proef · Michie e.a. 2010'); },
  e1s11(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'VARIATIE'); lhb(ctx, 620, 480, 2.1, { vorm: 'succinea', stippen: 19 }); lhb(ctx, 1000, 500, 1.6, { vorm: 'succinea', stippen: 8 }); lhb(ctx, 1340, 500, 1.2, { vorm: 'succinea', stippen: 8 });
    naamBij(ctx, 'kou', null, 620, 260, 1, 'center'); naamBij(ctx, 'warmte', null, 1000, 300, 1, 'center'); naamBij(ctx, 'weinig voedsel', null, 1340, 340, 1, 'center');
    haak(ctx, 480, 1460, 720, 'omgeving, niet erfelijk', C.groen); },
  e1s12(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?'); chromosoomPaar(ctx, 960, 470, 440, { nieuw: [1, _lt(C.paars, 0.6)] });
    naamBij(ctx, 'mutatie', 'nieuw allel', 1060, 420, 1, 'left', C.paars); naamBij(ctx, 'hoe dat gaat:', 'zie de DNA-reeks', 860, 420, 1, 'right', C.text2); },
  e1s13(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?'); chromosoomPaar(ctx, 1240, 450, 380, { nieuw: [1, _lt(C.paars, 0.6)] });
    persoon(ctx, 'yasmin', 360, 860, 440, { uit: 'denkt' }); persoon(ctx, 'bilal', 640, 860, 440, { uit: 'neutraal', kijk: -1 });
    naamBij(ctx, 'toevallig', 'niet omdat het nodig is', 1340, 760, 1, 'left', C.paars); naamBij(ctx, 'zeldzaam', null, 1340, 690, 1, 'left', C.paars); },
  e1q14(ctx) { vraagKaart(ctx, ['Yasmin en Bilal hebben dezelfde ouders.', 'Waarom hebben ze toch niet dezelfde allelen?'], ['Bij elk kind ontstaan nieuwe mutaties die het uiterlijk bepalen', 'Elk kind krijgt van elke ouder een toevallige helft', 'Elk kind erft ook wat de ouders leerden of trainden'], _F1); },
  e1s15(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?');
    chromosoomPaar(ctx, 480, 330, 260, { allelen: [EVO.a1, EVO.a2] }); chromosoomPaar(ctx, 1440, 330, 260, { allelen: [EVO.a2, EVO.a2] });
    naamBij(ctx, 'moeder', null, 480, 520, 1, 'center'); naamBij(ctx, 'vader', null, 1440, 520, 1, 'center');
    geslachtscel(ctx, 380, 720, 'ei', EVO.a1, 1); geslachtscel(ctx, 580, 720, 'ei', EVO.a2, 1); geslachtscel(ctx, 1400, 700, 'zaad', EVO.a2, 1); geslachtscel(ctx, 1560, 790, 'zaad', EVO.a2, 1);
    pijl(ctx, 450, 550, 400, 620, C.line, 1, 3); pijl(ctx, 510, 550, 560, 620, C.line, 1, 3); pijl(ctx, 1420, 550, 1400, 650, C.line, 1, 3); pijl(ctx, 1460, 550, 1540, 740, C.line, 1, 3);
    naamBij(ctx, 'meiose', 'één van de twee, door toeval', 960, 400, 1, 'center', C.goud); metaText(ctx, 'geslachtscellen', 960, 720, C.text2, 'center', 26); },
  e1s16(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?');
    geslachtscel(ctx, 520, 330, 'ei', EVO.a1, 1.1); geslachtscel(ctx, 820, 330, 'zaad', EVO.a2, 1.1); pijl(ctx, 660, 440, 660, 560, C.line, 1, 3);
    chromosoomPaar(ctx, 660, 720, 240, { allelen: [EVO.a1, EVO.a2] }); naamBij(ctx, 'kind 1', null, 660, 890, 1, 'center');
    geslachtscel(ctx, 1120, 330, 'ei', EVO.a2, 1.1); geslachtscel(ctx, 1420, 330, 'zaad', EVO.a2, 1.1); pijl(ctx, 1260, 440, 1260, 560, C.line, 1, 3);
    chromosoomPaar(ctx, 1260, 720, 240, { allelen: [EVO.a2, EVO.a2] }); naamBij(ctx, 'kind 2', null, 1260, 890, 1, 'center');
    naamBij(ctx, 'bevruchting', 'nieuwe combinatie = recombinatie', 960, 180, 1, 'center', C.goud); },
  e1s17(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?'); broerZus(ctx, 560, 1360, 650, 470);
    const y = [EVO.a1, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a1, EVO.a1, EVO.a2], b = [EVO.a1, EVO.a1, EVO.a2, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a2];
    allelRij(ctx, 380, 760, y, 18, [1, 3, 6]); allelRij(ctx, 1180, 760, b, 18, [1, 3, 6]); metaText(ctx, 'acht genen · twee allelen per gen, versimpeld', 960, 860, C.text2, 'center', 26); },
  e1s18(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'WAAR KOMT VARIATIE VANDAAN?');
    card(ctx, 380, 300, 520, 260, 'mutatie', 'maakt nieuwe allelen', 1, C.paars); card(ctx, 1020, 300, 520, 260, 'recombinatie', 'maakt nieuwe combinaties (meiose en bevruchting)', 1, C.goud);
    haak(ctx, 380, 1540, 600, 'samen: erfelijke variatie', C.groen); },
  e1s19(ctx) { macroNacht(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL'); huisGevel(ctx, 640, 760, 520, 330);
    for (const [x, y, s] of [[300, 760, 1], [1420, 760, 1.2], [1650, 780, 0.9]]) { ctx.beginPath(); ctx.moveTo(x - 70 * s, y); ctx.lineTo(x, y - 230 * s); ctx.lineTo(x + 70 * s, y); ctx.closePath(); ctx.fillStyle = '#2A4436'; ctx.fill(); }
    lhb(ctx, 785, 532, 0.16, { vorm: 'succinea', stippen: 10 }); goudRing(ctx, 785, 532, 26); naamBij(ctx, 'populatie', 'één soort · één gebied · plant zich onderling voort', 80, 200, 1, 'left'); evoSchaal(ctx, 'uitzoomen: kozijn → huis → tuin'); },
  e1q20(ctx) { vraagKaart(ctx, 'Hoe groot is de populatie waar dit beestje bij hoort?', ['Precies alle beestjes in deze tuin', 'Alle Aziatische lieveheersbeestjes op aarde', 'Dat kiest de onderzoeker: een tuin, een stad of heel Nederland'], _F1); },
  e1s21(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL'); kaartNL(ctx, 760, 520, 4.4, { land: rgba(C.goud, 0.12), rand: C.goud });
    const [tx, ty] = nlXY(51.84, 5.86, 760, 520, 4.4); circ(ctx, tx, ty, 9, C.goud); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(tx, ty, 50, 0, 6.283); ctx.stroke();
    naamBij(ctx, 'tuin', null, tx - 20, ty + 10, 1, 'right'); naamBij(ctx, 'stad', null, tx + 60, ty - 30, 1, 'left'); naamBij(ctx, 'heel Nederland', 'keuze van de onderzoeker', 380, 160, 1, 'left', C.goud);
    pot(ctx, 1290, 760, 0.4, { p: 0.15, n: 12, seed: 2, a: 0.5 }); pot(ctx, 1460, 760, 0.62, { p: 0.15, n: 30, seed: 3, a: 0.7 }); pot(ctx, 1720, 760, 0.95, { p: 0.15, n: 80, seed: 5 });
    metaText(ctx, 'tuin', 1290, 810, C.text2, 'center', 26); metaText(ctx, 'stad', 1460, 810, C.text2, 'center', 26); metaText(ctx, 'Nederland', 1720, 810, C.goud, 'center', 26); },
  e1s22(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL'); kaartNL(ctx, 960, 520, 4.4);
    const pts = [[51.84, 5.86], [51.98, 5.91], [51.69, 5.3], [52.09, 5.12], [51.56, 5.09], [51.81, 4.67], [52.0, 6.2]].map(([a, b]) => nlXY(a, b, 960, 520, 4.4));
    for (const [x, y] of pts) circ(ctx, x, y, 9, C.oker, _lt(C.oker, 0.3), 2);
    ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]); for (const [i, j] of [[0, 1], [0, 2], [2, 4], [3, 1], [5, 2], [1, 6]]) { const [x1, y1] = pts[i], [x2, y2] = pts[j]; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 50, x2, y2); ctx.stroke(); } ctx.setLineDash([]);
    naamBij(ctx, 'geen scherpe grens', 'beestjes vliegen van tuin naar tuin', 80, 200, 1, 'left'); },
  e1s23(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL'); pot(ctx, 960, 800, 1.6, { p: 0.15, n: 110, seed: 7 });
    for (const [x, y, k] of [[860, 230, EVO.a2], [1010, 170, EVO.a1], [930, 110, EVO.a2], [1080, 260, EVO.a2]]) knikker(ctx, x, y, 20, k);
    naamBij(ctx, 'genenpool', 'alle allelen van de populatie', 1220, 420, 1, 'left', C.goud); knikker(ctx, 560, 468, 18, EVO.a1); knikker(ctx, 560, 548, 18, EVO.a2); naamBij(ctx, 'allel voor zwart', null, 520, 480, 1, 'right', EVO.a1R); naamBij(ctx, 'allel voor oranje', null, 520, 560, 1, 'right', EVO.a2R); },
  e1s24(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL');
    for (let i = 0; i < 10; i++) { const x = 170 + i * 160, zw = i === 2 || i === 6; lhb(ctx, x, 260, 0.95, { vorm: zw ? 'spectabilis' : 'succinea', stippen: 10 + (i % 5) * 2 }); knikker(ctx, x - 24, 400, 18, zw ? EVO.a1 : EVO.a2); knikker(ctx, x + 24, 400, 18, EVO.a2); }
    pot(ctx, 960, 880, 1.05, { p: 0.1, n: 20, seed: 11 }); pijl(ctx, 960, 470, 960, 540, C.line, 1, 3); },
  e1q25(ctx) { vraagKaart(ctx, ['Twee van de tien beestjes zijn zwart.', 'Welk deel van de knikkers in de pot is blauw?'], ['Tien procent', 'Twintig procent, net als de beestjes', 'Vijftig procent'], _F1); },
  e1s26(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'POPULATIE EN GENENPOOL'); pot(ctx, 640, 640, 1.3, { p: 0.1, n: 20, seed: 11 }); allelBalk(ctx, 440, 700, 400, 0.1, { namen: ['zwart', 'oranje'] });
    naamBij(ctx, 'allelfrequentie', 'aandeel van een allel in de pot', 640, 880, 1, 'center', C.goud);
    for (let i = 0; i < 10; i++) lhb(ctx, 1160 + (i % 5) * 130, 380 + Math.floor(i / 5) * 170, 0.75, { vorm: i === 2 || i === 6 ? 'spectabilis' : 'succinea', stippen: 12, a: i === 2 || i === 6 ? 1 : 0.35 });
    naamBij(ctx, '20% van de beestjes is zwart', null, 1420, 640, 1, 'center'); },
  e1s27(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'EVOLUTIE'); const ps = [0.1, 0.18, 0.3];
    ps.forEach((p, i) => { const x = 460 + i * 500; pot(ctx, x, 620, 1.05, { p, n: 60, seed: 20 + i }); allelBalk(ctx, x - 150, 680, 300, p, {}); metaText(ctx, 'generatie ' + (1 + i * 10), x, 820, C.text2, 'center', 28); if (i < 2) pijl(ctx, x + 170, 480, x + 330, 480, C.line, 1, 3); });
    naamBij(ctx, 'evolutie', 'verandering van allelfrequenties, over generaties', 960, 170, 1, 'center', C.goud); },
  e1q28(ctx) { vraagKaart(ctx, ['Tien procent van de allelen is blauw.', 'Twintig generaties later is dat dertig procent. Wat is er veranderd?'], ['Elk beestje is in zijn leven donkerder geworden', 'De genenpool: er zitten meer allelen voor zwart in de pot', 'De beestjes pasten zich aan omdat ze zwart moesten worden'], _F1); },
  e1s29(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'EVOLUTIE'); lhb(ctx, 400, 470, 2.0, { vorm: 'succinea', stippen: 14 }); goudRing(ctx, 400, 470, 175);
    naamBij(ctx, 'individu', 'allelen veranderen niet', 400, 720, 1, 'center');
    [0.1, 0.18, 0.3].forEach((p, i) => { const x = 1000 + i * 330; pot(ctx, x, 560, 0.75, { p, n: 50, seed: 30 + i }); allelBalk(ctx, x - 110, 600, 220, p, { procent: false }); });
    naamBij(ctx, 'populatie', 'genenpool verandert', 1330, 720, 1, 'center', C.goud); },
  e1s30(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'EVOLUTIE'); naamBij(ctx, 'Groot-Brittannië', 'eerste twee jaar van de verspreiding', 300, 260, 1, 'left');
    allelBalk(ctx, 300, 400, 1100, 0.3, { procent: false, h: 50 }); allelBalk(ctx, 300, 560, 1100, 0.2, { procent: false, h: 50 }); metaText(ctx, 'jaar 1', 280, 436, C.text2, 'right', 28); metaText(ctx, 'jaar 2', 280, 596, C.text2, 'right', 28);
    naamBij(ctx, 'allel voor zwart', 'wordt zeldzamer', 300, 700, 1, 'left', EVO.a1R); evoSchaal(ctx, 'schematisch · richting volgens Michie e.a. 2010'); },
  e1s31(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'EVOLUTIE'); pot(ctx, 960, 720, 1.25, { p: 0.3, n: 70, seed: 41 }); allelBalk(ctx, 800, 770, 320, 0.3, { procent: false });
    const k = [[C.groen, 'selectie', 'film 2–4', 420, 300], [C.goud, 'toeval', 'film 5', 420, 640], [C.line, 'uitwisseling', 'film 5', 1500, 300], [C.paars, 'mutatie', 'nieuwe knikkers', 1500, 640]];
    for (const [c, n, m, x, y] of k) { naamBij(ctx, n, m, x, y, 1, 'center', c); pijl(ctx, x + (x < 960 ? 150 : -150), y - 10, x < 960 ? 790 : 1130, y < 500 ? 520 : 640, c, 1, 4); } },
  e1s32(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'SAMENGEVAT'); card(ctx, 200, 280, 480, 300, 'variatie', 'deels erfelijk, deels omgeving', 1, C.goud); card(ctx, 720, 280, 480, 300, 'mutatie', 'nieuwe allelen', 1, C.paars); card(ctx, 1240, 280, 480, 300, 'recombinatie', 'nieuwe combinaties door meiose en bevruchting', 1, C.goud); },
  e1s33(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'SAMENGEVAT'); broerZus(ctx, 560, 1360, 650, 470, { uitY: 'lacht', uitB: 'blij' });
    allelRij(ctx, 380, 760, [EVO.a1, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a1, EVO.a1, EVO.a2]); allelRij(ctx, 1180, 760, [EVO.a1, EVO.a1, EVO.a2, EVO.a2, EVO.a2, EVO.a1, EVO.a2, EVO.a2]);
    naamBij(ctx, 'zelfde ouders, andere greep', null, 960, 210, 1, 'center', C.goud); },
  e1s34(ctx) { f1Bg(ctx); evoTag(ctx, _F1, 'SAMENGEVAT'); [0.1, 0.18, 0.3].forEach((p, i) => { const x = 560 + i * 400; pot(ctx, x, 640, 0.95, { p, n: 55, seed: 50 + i }); allelBalk(ctx, x - 130, 690, 260, p, { procent: false }); });
    haak(ctx, 400, 1520, 760, 'evolutie = verandering van allelfrequenties', C.groen); },
  e1s35(ctx) { f1Bg(ctx); metaText(ctx, 'EVOLUTIE 1/8 · SAMENGEVAT', 160, 200, C.text2, 'left', 28);
    const z = ['Variatie is deels erfelijk: allelen, ontstaan door mutatie.', 'Meiose en bevruchting geven elk kind een nieuwe combinatie.', 'Evolutie is een verandering van de allelfrequenties in een populatie.'];
    z.forEach((t, i) => text(ctx, t, 200, 380 + i * 110, fTekst(48, 600), C.text, 'left')); ctx.strokeStyle = C.groen; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, 320); ctx.lineTo(140, 320); ctx.lineTo(140, 640); ctx.lineTo(160, 640); ctx.stroke();
    text(ctx, 'Volgende film: Natuurlijke selectie', 200, 800, fTekst(40, 500), C.text2, 'left'); },
};
