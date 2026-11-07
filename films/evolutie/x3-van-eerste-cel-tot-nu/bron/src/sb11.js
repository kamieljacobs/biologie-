// Evolutie v2 — extra film 3 (sleutel e11) 'Van eerste cel tot nu' — storyboard: één keyframe per scène (23 okt 2026).
// Laad: dieren_zoog, micro_evo, pop_rept_chimp, e11_aarde, teken_evo11, sb11
const e11Tag = (ctx, hfst) => metaText(ctx, 'EVOLUTIE · EXTRA 3/4 · ' + hfst, 80, 78, C.text2, 'left', 26);
const e11Schema = (ctx, hfst) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); e11Tag(ctx, hfst); };
const e11Micro = (ctx, hfst) => { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); e11Tag(ctx, hfst); };
function e11Oerzee(ctx, o = {}) { const { lucht = '#2A2A3A', opp = 470 } = o; ctx.fillStyle = lucht; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#243656'; ctx.fillRect(0, opp - 80, W, 80);
  ctx.fillStyle = E11.zeeL; ctx.fillRect(0, opp, W, 300); lijn(ctx, [[0, opp], [W, opp]], rgba('#9CCBE3', 0.5), 2); ctx.fillStyle = E11.zand; ctx.fillRect(0, opp + 300, W, H); }
function e11Zeebodem(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#1C3A58'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#22466A'; ctx.fillRect(0, 0, W, 140);
  vul(ctx, [[-40, 760], [500, 730], [1000, 755], [1500, 725], [1960, 750], [1960, 1100], [-40, 1100]], '#3B4436'); }
function e11Eind(ctx, zinnen) { e11Schema(ctx, 'SAMENVATTING'); zinnen.forEach((z, i) => text(ctx, z, 160, 300 + i * 120, fTekst(48, 600), C.text, 'left'));
  ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 240); ctx.lineTo(116, 240); ctx.lineTo(116, 300 + (zinnen.length - 1) * 120 + 20); ctx.lineTo(130, 300 + (zinnen.length - 1) * 120 + 20); ctx.stroke(); }
function e11Vraag(ctx, vraag, opties) { vraagKaart(ctx, vraag, opties, null); e11Tag(ctx, 'VRAAG'); }
const T = { leven: e11Tijd(3480), zuurstof: e11Tijd(2430), euk: e11Tijd(1600), ediacara: e11Tijd(575), camb: e11Tijd(539), land: e11Tijd(470), tikt: e11Tijd(375), perm: e11Tijd(252), kpg: e11Tijd(66), chimp: e11Tijd(7) };
// de laatste minuut als balk (Schema): x0..x0+w = 60 s
function e11Minuut(ctx, x0, y0, w, o = {}) { const { gemarkeerd = 6 } = o; roundRect(ctx, x0, y0, w, 60, 10); shape(ctx, rgba(E11.leven, 0.35), C.line, 2);
  const xs = x0 + w * (1 - gemarkeerd / 60); roundRect(ctx, xs, y0, x0 + w - xs, 60, 8); shape(ctx, C.goud, _lt(C.goud, 0.3), 2);
  for (let s = 0; s <= 60; s += 10) { lijn(ctx, [[x0 + w * s / 60, y0 + 60], [x0 + w * s / 60, y0 + 76]], C.line, 2); metaText(ctx, s === 60 ? '24:00' : '23:59:' + String(s).padStart(2, '0'), x0 + w * s / 60, y0 + 112, C.text2, 'center', 26); } }

const SB11 = {
  e11s01(ctx) { macroNacht(ctx, { horizon: 900, heuvel: false }); e11Tag(ctx, 'OPENING'); e11Aarde(ctx, 560, 470, 260);
    e11Klok(ctx, 1360, 470, 300, { uur: 0.0001, toonLeven: false }); naamBij(ctx, 'de geschiedenis van de aarde', 'als één dag van 24 uur', 1360, 120, 1, 'center'); },
  e11s02(ctx) { e11Schema(ctx, 'OPENING'); e11Klok(ctx, 620, 520, 330, { uur: T.leven, bogen: [{ van: T.leven, tot: T.leven + 0.25, kleur: E11.leven }], toonLeven: false, merk: [{ u: T.leven, kleur: E11.leven }] }); naamBij(ctx, 'oudste sporen van leven', '±05:36 · ±3,5 miljard jaar', 1000, 220, 1, 'left', E11.leven);
    zoomCircle(ctx, 1500, 600, 230, 925, 500, 'stromatoliet · laagjes door microben', 1, () => { ctx.fillStyle = '#22466A'; ctx.fillRect(1250, 350, 500, 500); ctx.fillStyle = E11.zand; ctx.fillRect(1250, 720, 500, 200); e11Stromatoliet(ctx, 1500, 740, 1.6, { seed: 2, laag: 14 }); e11Stromatoliet(ctx, 1330, 740, 0.9, { seed: 5 }); e11Stromatoliet(ctx, 1660, 740, 1.0, { seed: 6 }); }); },
  e11s03(ctx) { e11Schema(ctx, 'OPENING'); e11Klok(ctx, 700, 540, 340, { uur: T.leven });
    ['eerste dieren?', 'planten op het land?', 'de mens?'].forEach((t, i) => naamBij(ctx, t, null, 1200, 400 + i * 110, 1, 'left', C.goud)); },
  e11s04(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'HAVO · VWO · EVOLUTIE · EXTRA 3/4', W - 80, 78, C.text2, 'right', 26);
    text(ctx, 'Van eerste cel tot nu', 120, 330, fTitel(92), C.text, 'left'); ['Vier miljard jaar leven:', 'wanneer verschijnt wat?'].forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left'));
    e11Klok(ctx, 1460, 560, 300, { uur: T.leven }); },
  e11s05(ctx) { e11Schema(ctx, 'OPENING'); e11Klok(ctx, 760, 540, 340, { bogen: [{ van: 9, tot: 10, kleur: C.goud }], uur: null, toonLeven: false });
    naamBij(ctx, '1 uur ≈ 190 miljoen jaar', null, 1220, 360, 1, 'left', C.goud); naamBij(ctx, '1 minuut ≈ 3 miljoen jaar', null, 1220, 470, 1, 'left');
    naamBij(ctx, 'aarde: ±4,5 miljard jaar', 'gemeten · 24 uur', 1220, 600, 1, 'left'); },
  // H1
  e11s06(ctx) { e11Oerzee(ctx); e11Tag(ctx, 'ZUURSTOF UIT DE ZEE'); metaText(ctx, '05:36 · ±3,5 MILJARD JAAR GELEDEN', W - 80, 78, C.goud, 'right', 26);
    zoomCircle(ctx, 1300, 560, 250, 700, 640, 'cellen zonder kern · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1050, 310, 500, 500);
      [[1220, 470, 100, 0.3, 0], [1380, 560, 80, -0.4, 1], [1250, 660, 90, 1.1, 0], [1420, 420, 64, 0.2, 2]].forEach(([x, y, l, r, k]) => e11Prok(ctx, x, y, l, r, { kleur: k === 1 ? '#A89878' : C.teal, bol: k === 2 })); });
    naamBij(ctx, 'bacteriën en archaea', 'allemaal afstammelingen van LUCA', 1300, 880, 1, 'center'); naamBij(ctx, 'bijna geen zuurstof', null, 160, 260, 1, 'left'); evoSchaal(ctx, 'model · niet op schaal'); },
  e11s07(ctx) { e11Oerzee(ctx); e11Tag(ctx, 'ZUURSTOF UIT DE ZEE');
    [[260, 770, 1.3, 1], [480, 770, 1.0, 4], [680, 770, 1.5, 2], [930, 770, 1.1, 5], [1150, 770, 1.35, 3]].forEach(([x, y, s, sd]) => e11Stromatoliet(ctx, x, y, s, { seed: sd }));
    for (let i = 0; i < 26; i++) circ(ctx, 200 + hash(i) * 1050, 500 + hash(i * 3) * 120, 6 + hash(i * 7) * 5, rgba(C.teal, 0.35), C.teal, 2);
    zoomCircle(ctx, 1560, 330, 200, 1150, 640, 'cyanobacteriën · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1360, 130, 400, 400); e11Cyano(ctx, 1410, 300, 9, { r: 14 }); e11Cyano(ctx, 1430, 390, 8, { r: 14, golf: -0.3 }); circ(ctx, 1640, 230, 8, rgba(C.teal, 0.4), C.teal, 2); });
    naamBij(ctx, 'stromatolieten', 'gebouwd door cyanobacteriën', 260, 880, 1, 'left'); naamBij(ctx, 'zuurstof', null, 560, 450, 1, 'center', C.teal);
    roundRect(ctx, 120, 150, 280, 40, 18); shape(ctx, '#2A3A58', C.line, 2); naamBij(ctx, 'zuurstof in de lucht: ±0', null, 120, 240, 1, 'left'); },
  e11q08(ctx) { e11Vraag(ctx, 'Waarom bleef die zuurstof zo lang uit de lucht?', ['Ze maakten eerst te weinig zuurstof om iets te merken', 'De zuurstof reageerde eerst met ijzer in de zee', 'Zuurstof ontsnapte uit de lucht naar de ruimte']);
    e11Stromatoliet(ctx, 1700, 360, 1.0); for (let i = 0; i < 6; i++) circ(ctx, 1640 + hash(i) * 140, 220 + hash(i * 2) * 60, 7, rgba(C.teal, 0.35), C.teal, 2); },
  e11s09(ctx) { e11Schema(ctx, 'ZUURSTOF UIT DE ZEE'); roundRect(ctx, 200, 200, 820, 520, 18); shape(ctx, rgba(E11.zeeL, 0.6), C.line, 2);
    for (let i = 0; i < 30; i++) { const x = 260 + hash(i * 5) * 700, y = 240 + hash(i * 9) * 300; if (i % 2) circ(ctx, x, y, 9, rgba(C.oker, 0.5), C.oker, 2); else circ(ctx, x, y, 7, rgba(C.teal, 0.4), C.teal, 2); }
    for (let i = 0; i < 9; i++) circ(ctx, 300 + i * 70 + hash(i) * 30, 560 + hash(i + 4) * 70, 8, E11.roest, _lt(E11.roest, 0.3), 1.5);
    naamBij(ctx, 'opgelost ijzer', null, 230, 190, 1, 'left', C.oker); naamBij(ctx, 'zuurstof', null, 1000, 190, 1, 'right', C.teal); naamBij(ctx, 'roest zakt naar de bodem', null, 610, 690, 1, 'center', E11.roest);
    const kl = ['#5A4A40', E11.roest, '#4E4A48', '#9A4A30', '#56504A', E11.roest, '#4A4440', '#A0503A'];
    kl.forEach((k, i) => { roundRect(ctx, 1220, 260 + i * 52, 520, 48, 6); shape(ctx, k, _lt(k, 0.2), 1.5); });
    naamBij(ctx, 'rode banden in oud gesteente', 'gebande ijzerformatie', 1480, 760, 1, 'center'); },
  e11s10(ctx) { e11Schema(ctx, 'ZUURSTOF UIT DE ZEE'); e11Klok(ctx, 520, 540, 310, { uur: T.zuurstof, merk: [{ u: T.zuurstof, kleur: C.teal, tekst: '±11:00', meta: '2,4 miljard jaar' }] });
    const x0 = 1000, y0 = 760, w = 780, hh = 380; lijn(ctx, [[x0, y0], [x0 + w, y0]], C.line, 2.5); lijn(ctx, [[x0, y0], [x0, y0 - hh]], C.line, 2.5);
    const X = (mj) => x0 + (3500 - mj) / 3500 * w, Y = (v) => y0 - v * hh; ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath();
    [[3500, 0], [2500, 0.01], [2430, 0.12], [2300, 0.2], [2000, 0.15], [800, 0.17], [600, 0.6], [300, 0.95], [0, 0.85]].forEach(([m, v], i) => i ? ctx.lineTo(X(m), Y(v)) : ctx.moveTo(X(m), Y(v))); ctx.stroke();
    lijn(ctx, [[X(2430), y0], [X(2430), y0 - hh]], rgba(C.goud, 0.7), 2); metaText(ctx, '2,4', X(2430), y0 + 40, C.goud, 'center', 28);
    metaText(ctx, '3,5', x0, y0 + 40, C.text2, 'center', 28); metaText(ctx, 'NU', x0 + w, y0 + 40, C.text2, 'center', 28); metaText(ctx, 'MILJARD JAAR GELEDEN', x0 + w, y0 + 84, C.text2, 'right', 26);
    metaText(ctx, 'ZUURSTOF IN DE LUCHT · GESTILEERD', x0, y0 - hh - 30, C.grain, 'left', 26); naamBij(ctx, 'veel minder dan nu', null, X(1400), Y(0.17) - 60, 1, 'center', C.teal); },
  e11s11(ctx) { e11Micro(ctx, 'ZUURSTOF UIT DE ZEE');
    [[400, 400, 140, 0.3, 1], [620, 620, 120, -0.6, 1], [880, 380, 150, 1.0, 1], [1080, 640, 130, 0.2, 0], [1300, 420, 140, -0.3, 1], [1500, 600, 130, 0.8, 0], [760, 820, 110, 0.4, 1]].forEach(([x, y, l, r, d]) => e11Prok(ctx, x, y, l, r, { dood: d === 1, kleur: C.teal }));
    for (let i = 0; i < 14; i++) circ(ctx, 300 + hash(i * 3) * 1300, 260 + hash(i * 7) * 600, 7, rgba(C.teal, 0.3), C.teal, 1.5);
    naamBij(ctx, 'zuurstof: giftig voor veel cellen', null, 160, 220, 1, 'left'); naamBij(ctx, 'gebruikt zuurstof: meer energie', null, 1300, 760, 1, 'center', C.teal); },
  // H2
  e11s12(ctx) { e11Micro(ctx, 'DE CEL MET EEN KERN'); e11Euk(ctx, 1150, 520, 360, { focus: ['kern', 'mito'] }); e11Prok(ctx, 380, 520, 90, 0.2, { kleur: C.teal });
    naamBij(ctx, 'bacterie', 'geen kern', 380, 620, 1, 'center'); naamBij(ctx, 'kern', 'met het DNA', 1050, 430, 1, 'center', C.text); naamBij(ctx, 'mitochondrium', null, 1450, 860, 1, 'center', C.mitoR);
    evoSchaal(ctx, 'bacterie ±2 micrometer · cel ±20 micrometer · schematisch'); },
  e11s13(ctx) { e11Micro(ctx, 'DE CEL MET EEN KERN'); e11Mito(ctx, 560, 500, 560, 0.1); e11Mito(ctx, 1440, 500, 520, 0.1, { deling: 0.75 });
    naamBij(ctx, 'eigen DNA in een ring', null, 620, 300, 1, 'center', C.kernR); naamBij(ctx, 'twee membranen', null, 560, 720, 1, 'center', C.goud); naamBij(ctx, 'deelt zich in tweeën', null, 1440, 720, 1, 'center');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(560, 500, 300, 136, 0.1, 0, 6.283); ctx.stroke(); },
  e11q14(ctx) { e11Vraag(ctx, 'Waar komen de mitochondriën vandaan?', ['Het zijn bacteriën die je met je eten binnenkrijgt', 'De cel maakte ze zelf; ze lijken toevallig op bacteriën', 'Het waren ooit vrijlevende bacteriën, opgenomen door een cel']);
    e11Mito(ctx, 1700, 300, 240, 0.2); },
  e11s15(ctx) { e11Micro(ctx, 'DE CEL MET EEN KERN'); e11Endo(ctx, 520, 540, 250, 0.5); e11Endo(ctx, 1320, 540, 250, 1);
    pijl(ctx, 860, 540, 1000, 540, C.line, 1, 4, 18); naamBij(ctx, 'archaeon (waarschijnlijk)', null, 480, 250, 1, 'center', '#C8B898'); naamBij(ctx, 'bacterie die zuurstof gebruikt', null, 760, 860, 1, 'center', C.teal);
    naamBij(ctx, 'endosymbiose', 'opgenomen, niet verteerd', 1320, 250, 1, 'center', C.goud); evoSchaal(ctx, 'model · vereenvoudigd'); },
  e11s16(ctx) { e11Micro(ctx, 'DE CEL MET EEN KERN'); e11Endo(ctx, 560, 540, 240, 1, { gast: 'cyano' }); pijl(ctx, 880, 540, 1020, 540, C.line, 1, 4, 18);
    e11Euk(ctx, 1380, 540, 280, { chloro: true, focus: 'chloro' }); naamBij(ctx, 'cyanobacterie', 'opgenomen', 560, 860, 1, 'center', E11.cyano); naamBij(ctx, 'bladgroenkorrel', 'bij planten en algen', 1380, 900, 1, 'center', C.groen); },
  e11s17(ctx) { e11Schema(ctx, 'DE CEL MET EEN KERN'); e11Klok(ctx, 760, 540, 330, { uur: T.euk, merk: [{ u: T.euk, kleur: C.paars, tekst: '±15:30', meta: '1,6 miljard jaar' }] });
    ctx.setLineDash([12, 10]); ctx.strokeStyle = C.paars; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(760, 540, 330 - 21, e11U(e11Tijd(2100)), e11U(T.euk)); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'misschien eerder?', null, 1180, 860, 1, 'left', C.paars); e11Euk(ctx, 1500, 420, 150); naamBij(ctx, 'eukaryoot', 'cel met een kern', 1500, 640, 1, 'center'); },
  e11s18(ctx) { e11Schema(ctx, 'DE CEL MET EEN KERN'); e11Levensboom(ctx, 360, 820, 1200, 480, { stap: 2 }); },
  // H3
  e11s19(ctx) { e11Schema(ctx, 'GROOT WORDEN EN HET LAND OP'); e11Klok(ctx, 760, 540, 330, { uur: 21, bogen: [{ van: T.leven, tot: 21, kleur: E11.leven, a: 0.95 }], merk: [{ u: 21, kleur: C.goud, tekst: '±21:00', meta: 'eerste dieren' }] });
    naamBij(ctx, 'tot ±21:00', 'losse cellen en kleine algen', 1200, 400, 1, 'left', C.groen); },
  e11s20(ctx) { e11Zeebodem(ctx); e11Tag(ctx, 'GROOT WORDEN EN HET LAND OP'); metaText(ctx, '±575 MILJOEN JAAR GELEDEN', W - 80, 78, C.goud, 'right', 26);
    [[300, 800, 420, 0.05], [470, 790, 300, -0.05], [1500, 790, 380, 0.07], [1660, 800, 260, -0.04]].forEach(([x, y, h, b]) => e11Frond(ctx, x, y, h, { buig: b }));
    e11Dickinsonia(ctx, 960, 820, 520, { plat: 0.42 }); naamBij(ctx, 'Dickinsonia', 'tot ±1,4 m · cholesterol: een dier', 960, 640, 1, 'center', C.goud); naamBij(ctx, 'bladvormige wezens op een steel', null, 380, 300, 1, 'center'); evoSchaal(ctx, 'reconstructie'); },
  e11s21(ctx) { e11Zeebodem(ctx); e11Tag(ctx, 'GROOT WORDEN EN HET LAND OP'); metaText(ctx, '±539 MILJOEN JAAR GELEDEN · 21:09', W - 80, 78, C.goud, 'right', 26);
    ctx.save(); ctx.translate(0, 0); [[400, 800, 150, 0.2], [620, 830, 120, -0.4], [1500, 810, 140, 3.0]].forEach(([x, y, l, r]) => { ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.55); e11Trilobiet(ctx, 0, 0, l, { rot: r }); ctx.restore(); }); ctx.restore();
    e11Anomalocaris(ctx, 1000, 440, 560, { rot: 0.1, t: 0.3 }); naamBij(ctx, 'Anomalocaris', 'rover · tot ±0,5 m', 1000, 260, 1, 'center'); naamBij(ctx, 'trilobieten', 'met ogen en een pantser', 510, 700, 1, 'center'); evoSchaal(ctx, 'reconstructie · niet op schaal'); },
  e11s22(ctx) { macroNacht(ctx, { horizon: 620, heuvel: false }); e11Tag(ctx, 'GROOT WORDEN EN HET LAND OP'); metaText(ctx, '±470 MILJOEN JAAR GELEDEN', W - 80, 78, C.goud, 'right', 26);
    ctx.fillStyle = '#5A5A62'; ctx.fillRect(0, 620, W, 460); vul(ctx, [[-40, 760], [700, 740], [1200, 770], [1960, 750], [1960, 1100], [-40, 1100]], E11.zeeL);
    [[300, 750, 70], [380, 752, 50], [460, 748, 64], [560, 750, 46], [640, 746, 58]].forEach(([x, y, h], i) => e11Cooksonia(ctx, x, y, h, { seed: i }));
    zoomCircle(ctx, 1400, 400, 230, 460, 720, 'stengel met schimmeldraden · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1170, 170, 460, 460);
      for (let i = 0; i < 6; i++) { roundRect(ctx, 1210 + i * 66, 200, 60, 400, 20); shape(ctx, rgba(C.groen, 0.25), _lt(C.groen, 0.2), 1.5); }
      ctx.strokeStyle = rgba('#E6E1D3', 0.8); ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(1180, 260 + k * 100); for (let i = 1; i <= 8; i++) ctx.lineTo(1180 + i * 55, 260 + k * 100 + Math.sin(i + k) * 26); ctx.stroke(); } });
    naamBij(ctx, 'eerste landplantjes', 'een paar cm · zonder wortels', 160, 860, 1, 'left', C.groen); },
  e11s23(ctx) { macroNacht(ctx, { horizon: 620, heuvel: false }); e11Tag(ctx, 'GROOT WORDEN EN HET LAND OP'); metaText(ctx, '±425 MILJOEN JAAR GELEDEN · ±21:45', W - 80, 78, C.goud, 'right', 26);
    ctx.fillStyle = '#5A5A62'; ctx.fillRect(0, 620, W, 460); vul(ctx, [[-40, 900], [700, 880], [1200, 910], [1960, 890], [1960, 1100], [-40, 1100]], E11.zeeL);
    [[300, 860, 300], [600, 862, 220], [1330, 858, 280], [1620, 860, 200]].forEach(([x, y, h], i) => e11Cooksonia(ctx, x, y, h, { seed: i + 2 }));
    e11Duizendpoot(ctx, 960, 860, 420, { t: 0.2 }); naamBij(ctx, 'duizendpootachtige', '±425 miljoen jaar · een paar cm', 960, 960, 1, 'center', C.goud);
    naamBij(ctx, 'eerste dieren op het land', null, 160, 220, 1, 'left'); evoSchaal(ctx, 'vergroot'); },
  e11q24(ctx) { e11Vraag(ctx, ['Een paddenstoel staat stil en groeit uit de grond.', 'Met wie zijn schimmels het nauwst verwant?'], ['Met dieren: dat blijkt uit hun DNA', 'Met planten: die staan ook stil en groeien uit de grond', 'Met geen van beide: schimmels zijn een groep apart']);
    e11Paddenstoel(ctx, 1720, 360, 1.1, { draden: false }); },
  e11s25(ctx) { e11Schema(ctx, 'GROOT WORDEN EN HET LAND OP'); const P = e11Levensboom(ctx, 260, 860, 1100, 500, { stap: 3, markeer: 'schimmeldier', dier: (c, x, y) => e11Morganucodon(c, x, y, 70) });
    ['zelfde lijn in het DNA', 'chitine in de celwand', 'opslag als glycogeen'].forEach((t, i) => naamBij(ctx, t, null, 1440, 420 + i * 90, 1, 'left', C.goud)); },
  e11s26(ctx) { macroNacht(ctx, { horizon: 560, heuvel: false }); e11Tag(ctx, 'GROOT WORDEN EN HET LAND OP'); metaText(ctx, '±375 MILJOEN JAAR GELEDEN · 22:00', W - 80, 78, C.goud, 'right', 26);
    ctx.fillStyle = '#3B4436'; ctx.fillRect(0, 560, W, 520); vul(ctx, [[-40, 700], [900, 690], [1960, 700], [1960, 1100], [-40, 1100]], rgba('#2E6FBF', 0.45)); lijn(ctx, [[0, 700], [W, 700]], '#9CCBE3', 2);
    e11Tiktaalik(ctx, 960, 820, 1200); naamBij(ctx, 'Tiktaalik', '±375 miljoen jaar · tot ±2,7 m', 340, 300, 1, 'left'); naamBij(ctx, 'vin met botjes als een pols', null, 1360, 940, 1, 'center', C.goud);
    naamBij(ctx, 'nek', null, 1300, 640, 1, 'center'); evoSchaal(ctx, 'reconstructie'); },
  // H4
  e11s27(ctx) { e11Schema(ctx, 'RAMPEN EN NIEUWE KANSEN'); e11Soortenlijn(ctx, 200, 760, 1500, 460); naamBij(ctx, 'vijf massa-extincties', null, 1700, 220, 1, 'right', C.koraal); },
  e11s28(ctx) { macroNacht(ctx, { horizon: 620, heuvel: false }); e11Tag(ctx, 'RAMPEN EN NIEUWE KANSEN'); metaText(ctx, '252 MILJOEN JAAR GELEDEN · 22:40', W - 80, 78, C.koraal, 'right', 26);
    ctx.fillStyle = '#2E2A2C'; ctx.fillRect(0, 620, W, 460);
    for (let i = 0; i < 4; i++) { const x = 300 + i * 420; vul(ctx, [[x - 160, 640], [x - 40, 560], [x + 40, 560], [x + 160, 640]], '#3A3234'); for (let k = 0; k < 5; k++) circ(ctx, x + (hash(i * 9 + k) - 0.5) * 120, 460 - k * 70, 40 + k * 14, rgba('#4A4A56', 0.55)); }
    vul(ctx, [[-40, 760], [400, 700], [800, 740], [1200, 690], [1600, 730], [1960, 700], [1960, 840], [-40, 860]], C.koraal, _lt(C.koraal, 0.3), 2);
    naamBij(ctx, 'vulkaanuitbarstingen in Siberië', null, 960, 960 - 60, 1, 'center'); naamBij(ctx, '±9 op 10 soorten in zee weg', null, 960, 220, 1, 'center', C.koraal); },
  e11s29(ctx) { macroNacht(ctx, { horizon: 700, heuvel: false }); e11Tag(ctx, 'RAMPEN EN NIEUWE KANSEN'); metaText(ctx, '66 MILJOEN JAAR GELEDEN · 23:39', W - 80, 78, C.koraal, 'right', 26);
    lijn(ctx, [[1700, 120], [1300, 640]], C.koraal, 10); circ(ctx, 1300, 650, 26, C.goud, C.koraal, 4);
    e11TRex(ctx, 760, 900, 820, { silhouet: true }); ctx.save(); ctx.translate(1080, 380); ctx.fillStyle = '#C8C0B0'; ctx.beginPath(); ctx.ellipse(0, 0, 26, 9, -0.1, 0, 6.283); ctx.fill(); circ(ctx, 26, -6, 8, '#C8C0B0'); vul(ctx, [[34, -7], [44, -4], [33, -2]], C.oker); vul(ctx, [[-6, -4], [-30, -48], [8, -46], [14, -4]], '#B0A898'); vul(ctx, [[-22, 0], [-46, -6], [-44, 8]], '#B0A898'); ctx.restore();
    naamBij(ctx, 'inslag bij Mexico', null, 1500, 760, 1, 'center', C.koraal); naamBij(ctx, 'vogels: de dinosauriërs die overleefden', null, 1130, 300, 1, 'center'); evoSchaal(ctx, 'Tyrannosaurus ±12 m'); },
  e11s30(ctx) { macroNacht(ctx, { horizon: 640 }); e11Tag(ctx, 'RAMPEN EN NIEUWE KANSEN');
    e11TRex(ctx, 1750, 990, 1500, { t: 0.1 });
    e11Morganucodon(ctx, 820, 960, 220); [[560, 980], [1020, 980]].forEach(([x, y]) => { for (let k = 0; k < 5; k++) { ctx.save(); ctx.translate(x, y); ctx.rotate(-1.2 + k * 0.5); ctx.beginPath(); ctx.ellipse(0, -60, 14, 64, 0, 0, 6.283); shape(ctx, '#4F7A3C', _lt('#4F7A3C', 0.2), 1.5); ctx.restore(); } });
    naamBij(ctx, 'klein zoogdier uit het Krijt', 'waarschijnlijk vooral ’s nachts actief', 820, 760, 1, 'center'); naamBij(ctx, 'Tyrannosaurus', 'heup ±4 m', 1500, 300, 1, 'center'); evoSchaal(ctx, 'reconstructie · niet op schaal'); },
  e11q31(ctx) { e11Vraag(ctx, 'Wat gebeurde er na de inslag met de zoogdieren?', ['Ze ontstonden opnieuw uit overlevende dinosauriërs', 'Ze bleven klein en zeldzaam, net als ervoor', 'Ze waaierden uit tot veel nieuwe soorten']);
    e11Morganucodon(ctx, 1700, 420, 200); },
  e11s32(ctx) { e11Schema(ctx, 'RAMPEN EN NIEUWE KANSEN'); const x0 = 200, x1 = 1700, X = (mj) => x0 + (90 - mj) / 90 * (x1 - x0), yb = 820;
    lijn(ctx, [[x0, yb + 60], [x1, yb + 60]], C.line, 2.5); [90, 66, 56, 0].forEach(m => metaText(ctx, m ? String(m) : 'nu', X(m), yb + 104, m === 66 ? C.koraal : C.text2, 'center', 28)); metaText(ctx, 'MILJOEN JAAR GELEDEN', x1, yb + 146, C.text2, 'right', 26);
    lijn(ctx, [[X(66), 200], [X(66), yb + 60]], rgba(C.koraal, 0.8), 4);
    ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(90), 520); ctx.lineTo(X(66), 520); ctx.stroke();
    const tak = (y) => { ctx.beginPath(); ctx.moveTo(X(66), 520); ctx.quadraticCurveTo(X(60), y, X(0), y); ctx.stroke(); };
    [220, 300, 380, 450, 520, 590, 660, 730, 800].forEach(tak); for (const y of [480, 560]) { ctx.strokeStyle = rgba(C.line, 0.4); ctx.beginPath(); ctx.moveTo(X(84), 520); ctx.quadraticCurveTo(X(76), y, X(70), y); ctx.stroke(); }
    naamBij(ctx, 'vroege primaten', '±56 miljoen jaar', X(56) + 20, 290, 1, 'left', C.goud); naamBij(ctx, 'vroege paardachtigen', '±56 miljoen jaar', X(56) + 20, 720, 1, 'left', C.goud);
    naamBij(ctx, 'inslag', null, X(66), 180, 1, 'center', C.koraal); naamBij(ctx, 'zoogdieren', null, X(90), 490, 1, 'left'); evoSchaal(ctx, 'vereenvoudigd'); },
  e11s33(ctx) { e11Schema(ctx, 'RAMPEN EN NIEUWE KANSEN'); const x0 = 160, w = 1100, y0 = 520; roundRect(ctx, x0, y0, w, 60, 10); shape(ctx, rgba(E11.leven, 0.35), C.line, 2);
    for (let m = 0; m <= 60; m += 10) { lijn(ctx, [[x0 + w * m / 60, y0 + 60], [x0 + w * m / 60, y0 + 76]], C.line, 2); metaText(ctx, m === 60 ? '24:00' : '23:' + String(m).padStart(2, '0'), x0 + w * m / 60, y0 + 112, C.text2, 'center', 26); }
    const xk = x0 + w * (60 - 20.9) / 60, xc = x0 + w * (60 - 2.2) / 60; ctx.fillStyle = rgba(C.goud, 0.35); ctx.fillRect(x0 + w * (60 - 2.5) / 60, y0, w * 0.6 / 60, 60); lijn(ctx, [[xk, y0 - 20], [xk, y0 + 80]], C.koraal, 4); naamBij(ctx, 'inslag', '23:39', xk - 30, y0 - 40, 1, 'right', C.koraal);
    lijn(ctx, [[xc, y0 - 20], [xc, y0 + 80]], C.goud, 4); naamBij(ctx, '6 tot 8 miljoen jaar', '±2 min voor 24:00', xc + 10, y0 - 130, 1, 'right', C.goud); metaText(ctx, 'HET LAATSTE UUR', x0, y0 - 140, C.grain, 'left', 26);
    const bx = 1560, by = 760; tak(ctx, bx, by, bx - 160, by - 300); tak(ctx, bx, by, bx + 160, by - 300); lijn(ctx, [[bx, by], [bx, by + 50]], C.line, 5); circ(ctx, bx, by, 9, C.bgSchema, C.goud, 3.5);
    persoon(ctx, 'noor', bx + 160, by - 330, 150); chimp(ctx, bx - 160, by - 330, 0.9); naamBij(ctx, 'mens', null, bx + 160, by - 520, 1, 'center'); naamBij(ctx, 'chimpansee', null, bx - 160, by - 520, 1, 'center');
    naamBij(ctx, 'gemeenschappelijke voorouder', null, bx, by + 100, 1, 'center', C.goud);
    function tak(c, x1, y1, x2, y2) { lijn(c, [[x1, y1], [x2, y2]], C.line, 5); } },
  e11s34(ctx) { e11Schema(ctx, 'RAMPEN EN NIEUWE KANSEN'); metaText(ctx, 'DE LAATSTE MINUUT', 160, 380, C.grain, 'left', 26); e11Minuut(ctx, 160, 420, 1500);
    naamBij(ctx, 'Homo sapiens', '±300.000 jaar · ±6 seconden', 1660, 340, 1, 'right', C.goud); lijn(ctx, [[160 + 1500 * 59.9 / 60, 410], [160 + 1500 * 59.9 / 60, 490]], C.koraal, 3);
    naamBij(ctx, 'het eerste schrift', 'laatste ±0,1 seconde', 1660, 640, 1, 'right', C.koraal); persoon(ctx, 'noor', 1760, 560, 160);
    naamBij(ctx, 'Hoe werden we mens?', 'volgende extra film', 160, 820, 1, 'left', C.text); },
  e11s35(ctx) { e11Schema(ctx, 'SAMENVATTING'); e11Klok(ctx, 760, 540, 340, { uur: 23.999, bogen: [{ van: T.leven, tot: 21, kleur: E11.leven, a: 0.9 }, { van: 21, tot: 24, kleur: C.goud, a: 0.9 }],
      merk: [{ u: T.zuurstof, kleur: C.teal, tekst: 'zuurstof', meta: '±11:00' }, { u: T.euk, kleur: C.paars, tekst: 'cel met een kern', meta: '±15:30' }, { u: 21, kleur: C.goud, tekst: 'dieren, land, rampen', meta: 'vanaf ±21:00' }, { u: T.kpg, kleur: C.koraal }] });
    naamBij(ctx, 'Homo sapiens: de laatste 6 seconden', null, 1240, 140, 1, 'left', C.goud); },
  e11s36(ctx) { e11Eind(ctx, ['Op één dag: van ±05:36 tot ±21:00 vooral losse cellen.', 'Cellen maakten de zuurstof en, door endosymbiose, de cel met een kern.', 'Daarna in drie uur: dieren, land, vijf rampen; Homo sapiens in 6 seconden.']); },
};
