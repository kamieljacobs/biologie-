// Storyboard Ecologie v2 · film 2 Waar past een soort? — één keyframe per scène (1920×1080). Laadt na teken_eco1.js en teken_eco2.js. (Vervangt de kopie uit de evolutiereeks.)
const _vk2 = (ctx, v, o, vwo) => { ecoVraagKaart(ctx, v, o, 2); if (vwo) vwoMarker(ctx); };
const _bg2 = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const _hl = (ctx, t, x, kl = C.text) => text(ctx, t, x, 170, fTekst(44, 700), kl, 'center');
// twee beken naast elkaar (Macro), met kop "beek A" / "beek B"
function _e2TweeBeken(ctx, o = {}) { _bg2(ctx); const r = { A: e2Beek(ctx, 0, 110, 955, 790, { soort: 'snel', seed: 2 }), B: e2Beek(ctx, 965, 110, 955, 790, { soort: 'traag', seed: 5 }) }; e2Split(ctx);
  if (o.koppen !== false) { naamBij(ctx, 'beek A', 'snel · koud · helder', 480, 170, 1, 'center'); naamBij(ctx, 'beek B', 'traag · warm · troebel', 1440, 170, 1, 'center'); } return r; }
// krommegrafiek-assen voor zuurstof
function _e2As(ctx, x, y, w, h, xl = 'zuurstof (mg per liter)', yl = 'groei en overleving') { e1As(ctx, x, y, w, h, { xLabel: xl, yLabel: yl, xt: [[0, '0'], [0.25, '3'], [0.5, '6'], [0.75, '9'], [1, '12']] }); }
const _u = (mg) => mg / 12; // mg/l -> as-fractie

const SB2 = {
  // ---------------- Opening
  e2s01(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'OPENING');
    const half = (x0, helder) => { ctx.save(); ctx.beginPath(); ctx.rect(x0, 110, 955, 970); ctx.clip(); ctx.translate(x0, 0);
      ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 110, 955, 970); vul(ctx, [[-20, 520], [300, 470], [650, 500], [980, 460], [980, 620], [-20, 620]], C.bgMacroHill);
      ctx.fillStyle = C.bgMacroFront; ctx.fillRect(0, 600, 955, 480);
      ctx.fillStyle = helder ? E2.helder : E2.troebel; ctx.fillRect(0, 690, 955, 240);
      const p = persoon(ctx, 'noor', 330, 900, 330, { outfit: 'zomer', pose: 'vasthouden', uit: helder ? 'verbaasd' : 'neutraal' });
      ctx.fillStyle = helder ? rgba(E2.helder, 0.88) : rgba(E2.troebel, 0.94); ctx.fillRect(0, 812, 955, 120); ctx.strokeStyle = helder ? '#7FB0E0' : '#7E9A86'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 812); ctx.lineTo(955, 812); ctx.stroke();
      vul(ctx, [[p.handR.x - 26, p.handR.y + 6], [p.handR.x - 18, p.handR.y - 18], [p.handR.x + 20, p.handR.y - 22], [p.handR.x + 30, p.handR.y + 4], [p.handR.x + 4, p.handR.y + 16]], E2.steen, E2.steenL, 2);
      ctx.restore(); return { x: p.handR.x + x0, y: p.handR.y }; };
    const p = half(0, true); half(965, false); e2Split(ctx);
    zoomCircle(ctx, 720, 420, 170, p.x + 4, p.y + 10, '', 1, () => { ctx.fillStyle = E2.steenD; ctx.fillRect(540, 240, 360, 360); ctx.fillStyle = E2.steen; ctx.beginPath(); ctx.ellipse(720, 440, 200, 120, 0, 0, 6.283); ctx.fill(); ecoSteenvlieglarve(ctx, 720, 440, 70, { houding: 'boven' }); });
    naamBij(ctx, 'steenvlieglarve', 'onderkant van de steen · vergroot', 720, 200, 1, 'center');
    naamBij(ctx, 'beek A', 'snel · helder', 120, 200, 1, 'left'); naamBij(ctx, 'beek B', 'traag · troebel', 1440, 200, 1, 'center'); ecoSchaal(ctx, 'larve ± 2 cm'); },
  e2s02(ctx) { _e2TweeBeken(ctx, { koppen: false }); ecoTag(ctx, 2, 'OPENING');
    zoomCircle(ctx, 1440, 460, 230, 1440, 840, 'slib met rode muggenlarven · vergroot', 1, () => { ctx.fillStyle = E2.slib; ctx.fillRect(1200, 230, 480, 480); [[1330, 380], [1500, 470], [1400, 600], [1560, 340], [1310, 520]].forEach(([x, y], i) => ecoMuggenlarve(ctx, x, y, 30, { houding: i % 2 ? 'rust' : 'zij' })); });
    ecoSteenvlieglarve(ctx, 480, 790, 90, {}); naamBij(ctx, 'steenvlieglarve', 'vergroot', 480, 640, 1, 'center'); text(ctx, '?', 1440, 160, fTitel(96), C.goud, 'center'); },
  e2s03(ctx) { ecoTitelKaart(ctx, 2, 'Waar past een soort?', ['Waarom leeft een steenvlieglarve', 'in de ene beek wel en in de andere niet?'], (c) => {
      e2Beek(c, 1180, 560, 300, 320, { soort: 'snel', seed: 2 }); e2Beek(c, 1500, 560, 300, 320, { soort: 'traag', seed: 5 }); ecoSteenvlieglarve(c, 1330, 830, 6, {}); ecoMuggenlarve(c, 1650, 850, 6, {}); }); },
  // ---------------- H1
  e2s04(ctx) { _bg2(ctx); const r = e2Beek(ctx, 0, 110, W, 790, { soort: 'snel', seed: 2 }); ecoTag(ctx, 2, 'WAT IS ER ANDERS?');
    ecoSteenvlieglarve(ctx, 430, 735, 80, {}); ecoEendagsvlieglarve(ctx, 1150, 690, 110, {}); ecoEikenblad(ctx, 760, 760, 3, { hoek: 0.3, stadium: 0.3 }); e2Forel(ctx, 1450, 420, 6, {});
    naamBij(ctx, 'ecosysteem', 'water · bodem · licht · organismen', 300, 300, 1, 'left'); naamBij(ctx, 'levensgemeenschap', 'alle populaties samen', 1200, 300, 1, 'left'); naamBij(ctx, 'habitat', 'onder stenen in stromend water', 430, 640, 1, 'center');
    ecoSchaal(ctx, 'larven vergroot'); },
  e2s05(ctx) { _e2TweeBeken(ctx); ecoTag(ctx, 2, 'WAT IS ER ANDERS?');
    ecoSteenvlieglarve(ctx, 260, 735, 70, {}); ecoEendagsvlieglarve(ctx, 640, 650, 100, {}); e2Forel(ctx, 620, 440, 5, {});
    [[1130, 760], [1330, 790], [1530, 765], [1730, 800]].forEach(([x, y], i) => ecoMuggenlarve(ctx, x, y, 70, { houding: i % 2 ? 'rust' : 'zij' }));
    lijn(ctx, [[1700, 800], [1730, 780], [1760, 805], [1790, 785]], '#C88A7A', 4);
    naamBij(ctx, 'steenvlieg- en eendagsvlieglarven', 'forel', 420, 330, 1, 'center'); naamBij(ctx, 'rode muggenlarven', 'slijkwormen', 1440, 330, 1, 'center'); ecoSchaal(ctx, 'larven vergroot'); },
  e2s06(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'WAT IS ER ANDERS?'); e2Split(ctx); _hl(ctx, 'beek A', 480); _hl(ctx, 'beek B', 1440);
    const M = [['temperatuur', 0.25, 0.65, '12 °C', '20 °C'], ['stroming', 0.85, 0.15, 'snel', 'traag'], ['zuurstof', 0.83, 0.25, '10 mg/l', '3 mg/l']];
    M.forEach(([n, a, b, wa, wb], i) => { e2Meter(ctx, 140, 320 + i * 170, 680, { naam: n, v: a, kleur: C.teal, waarde: wa }); e2Meter(ctx, 1100, 320 + i * 170, 680, { naam: n, v: b, kleur: C.koraal, waarde: wb }); });
    haak(ctx, 140, 1780, 790, 'abiotische factoren: niet-levend', C.goud); },
  e2s07(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'WAT IS ER ANDERS?'); e2Glas(ctx, 300, 700, 200, 300, 24, 'koud'); e2Glas(ctx, 640, 700, 200, 300, 8, 'warm');
    const x0 = 1020; ctx.fillStyle = E2.helder; ctx.fillRect(x0, 420, 760, 220); [0, 1, 2].forEach(i => vul(ctx, [[x0 + 120 + i * 240, 640], [x0 + 200 + i * 240, 560], [x0 + 280 + i * 240, 640]], E2.steen));
    ctx.strokeStyle = '#E8F2FA'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(x0 + 160 + i * 110, 430, 26, Math.PI, 0); ctx.stroke(); } e2Bolletjes(ctx, x0 + 60, 450, 640, 150, 20, C.teal, 4);
    naamBij(ctx, 'stroomversnelling', 'lucht wordt het water in gemengd', x0 + 380, 360, 1, 'center'); naamBij(ctx, 'zuurstof', 'opgelost in water', 470, 330, 1, 'center'); },
  e2s08(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'WAT IS ER ANDERS?'); e2Split(ctx); _hl(ctx, 'beek A', 480); _hl(ctx, 'beek B', 1440);
    const ik = [['voedsel', 'bladafval'], ['rover', 'forel'], ['concurrent', 'andere larven'], ['parasiet', '']];
    ik.forEach(([n, m], i) => { naamBij(ctx, n, m, 160 + (i % 2) * 380, 360 + Math.floor(i / 2) * 200, 1, 'left'); naamBij(ctx, n, m, 1120 + (i % 2) * 380, 360 + Math.floor(i / 2) * 200, 1, 'left'); });
    ecoEikenblad(ctx, 400, 330, 2.4, { stadium: 0.3 }); e2Forel(ctx, 820, 330, 3, {});
    roundRect(ctx, 1500, 700, 240, 60, 20); shape(ctx, '#7A7F88', '#5A606A', 2); ctx.fillStyle = rgba('#8A7A5A', 0.8); ctx.beginPath(); ctx.moveTo(1740, 715); ctx.quadraticCurveTo(1800, 740, 1790, 850); ctx.lineTo(1760, 850); ctx.quadraticCurveTo(1770, 760, 1740, 745); ctx.fill();
    naamBij(ctx, 'de mens', 'loost afvalwater · verandert zuurstof', 1180, 640, 1, 'left'); haak(ctx, 140, 1780, 820, 'biotische factoren: van andere organismen', C.groen); },
  e2s09(ctx) { _bg2(ctx); const r = e2Beek(ctx, 0, 110, W, 790, { soort: 'snel', seed: 7 }); ecoTag(ctx, 2, 'WAT IS ER ANDERS?');
    e2Forel(ctx, 900, 480, 14, { kijk: -1 }); ecoSteenvlieglarve(ctx, 1450, 790, 40, { kijk: -1 }); naamBij(ctx, 'beekforel', 'rover · biotische factor', 900, 330, 1, 'center'); naamBij(ctx, 'steenvlieglarve', 'kruipt weg onder de steen', 1450, 690, 1, 'center');
    ecoSchaal(ctx, 'forel ± 30 cm · larve vergroot'); },
  e2q10(ctx) { _vk2(ctx, ['In beide beken drijven dode bladeren.', 'Wat voor factor is dat bladafval voor een larve die het eet?'], ['Biotisch: het is voedsel, en het komt van een organisme', 'Abiotisch: het blad leeft niet meer']); },
  e2s11(ctx) { _bg2(ctx); e2Beek(ctx, 0, 110, W, 790, { soort: 'snel', seed: 9, stenen: false }); ecoTag(ctx, 2, 'WAT IS ER ANDERS?');
    ecoEikenblad(ctx, 900, 720, 12, { stadium: 0.45, hoek: 0.2 }); ecoSteenvlieglarve(ctx, 1240, 760, 90, { kijk: -1 });
    naamBij(ctx, 'dood blad = voedsel', 'telt als biotische factor', 960, 470, 1, 'center'); ecoSchaal(ctx, 'larve vergroot'); },
  // ---------------- H2
  e2s12(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); const x = 260, y = 800, w = 1400, h = 520; _e2As(ctx, x, y, w, h);
    e2Kromme(ctx, x, y, w, h, { min: _u(6), max: _u(13.5), opt: _u(10.5) });
    e2Vlijn(ctx, x + _u(6) * w, y, y - h * 0.55, C.line, 'minimumtolerantiegrens'); e2Vlijn(ctx, x + _u(10.5) * w, y, y - h * 1.02, C.goud, '');  text(ctx, 'optimum', x + _u(10.5) * w + 20, y - h * 0.8, fTekst(36, 700), C.goud, 'left');
    haak(ctx, x + _u(6) * w, x + _u(13.5) * w, y - h - 110, '', C.groen); text(ctx, 'tolerantiegebied', x + _u(6) * w - 20, y - h - 80, fTekst(36, 700), C.groen, 'right'); naamBij(ctx, 'optimumkromme', 'steenvlieglarve · zuurstof', 400, 360, 1, 'left'); ecoSchaal(ctx, 'model · voorbeeldwaarden'); },
  e2s13(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); const x = 260, y = 800, w = 1400, h = 520; _e2As(ctx, x, y, w, h);
    e2Kromme(ctx, x, y, w, h, { min: _u(6), max: _u(13.5), opt: _u(10.5) });
    e2Vlijn(ctx, x + _u(10) * w, y, y - h - 20, C.teal, 'beek A · 10 mg/l', { dash: [] }); e2Vlijn(ctx, x + _u(3) * w, y, y - h * 0.5, C.koraal, 'beek B · 3 mg/l', { dash: [] });
    text(ctx, 'onder de minimumgrens', x + _u(3) * w, y - h * 0.5 - 70, fTekst(36, 600), C.koraal, 'center'); ecoSchaal(ctx, 'voorbeeldwaarden'); },
  e2s14(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ecoTag(ctx, 2, 'BINNEN DE GRENZEN');
    zoomCircle(ctx, 1100, 480, 330, 360, 640, 'onderkant · vergroot', 1, () => { ctx.fillStyle = rgba(E2.helder, 0.5); ctx.fillRect(770, 150, 660, 660); e2Kieuwen(ctx, 1100, 480, 260); e2Bolletjes(ctx, 800, 220, 140, 520, 12, C.teal, 3); for (let i = 0; i < 4; i++) pijl(ctx, 790, 260 + i * 140, 900, 260 + i * 140, rgba(C.teal, 0.8), 1, 4, 14); });
    ecoSteenvlieglarve(ctx, 360, 660, 10, { houding: 'boven' }); naamBij(ctx, 'kieuwbosjes', 'onder het borststuk', 1560, 300, 1, 'left'); },
  e2s15(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); const x = 260, y = 800, w = 1400, h = 520; _e2As(ctx, x, y, w, h);
    e2Kromme(ctx, x, y, w, h, { min: _u(6), max: _u(13.5), opt: _u(10.5), a: 0.5 }); e2Kromme(ctx, x, y, w, h, { min: _u(0.6), max: _u(13.5), opt: _u(7), kleur: C.koraal, piek: 0.75 });
    e2Vlijn(ctx, x + _u(10) * w, y, y - h - 20, C.teal, 'A'); e2Vlijn(ctx, x + _u(3) * w, y, y - h - 20, C.teal, 'B');
    naamBij(ctx, 'rode muggenlarve', 'brede tolerantie · hemoglobine', x + _u(5) * w, y - h * 0.86, 1, 'center'); naamBij(ctx, 'steenvlieglarve', 'smal', x + _u(12.4) * w, y - h * 1.04, 0.8, 'center');
    ecoMuggenlarve(ctx, 400, 300, 26, {}); ecoSchaal(ctx, 'model · voorbeeldwaarden'); },
  e2s16(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); const F = [['zuurstof', 0.35, 0.9, 0.7, 0.2], ['temperatuur', 0.1, 0.6, 0.35, 0.8], ['stroming', 0.4, 1.0, 0.8, 0.12]];
    F.forEach(([n, mi, ma, op, b], i) => { const x = 140 + i * 590, y = 720, w = 480, h = 330; e1As(ctx, x, y, w, h, { xLabel: n, yLabel: '' }); e2Kromme(ctx, x, y, w, h, { min: mi, max: ma, opt: op });
      const uit = b < mi || b > ma; e2Vlijn(ctx, x + b * w, y, y - h - 10, uit ? C.koraal : C.teal, uit ? 'B buiten' : 'B', { dash: [] }); });
    haak(ctx, 140, 1760, 860, 'alle factoren moeten binnen de grenzen liggen', C.groen); },
  e2s17(ctx) { e1Macro(ctx, { horizon: 500 }); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); ctx.fillStyle = E2.helder; ctx.fillRect(0, 560, W, 120); e1Oever(ctx, 676, { golf: 5 });
    persoon(ctx, 'noor', 520, 960, 330, { outfit: 'zomer', uit: 'blij', pose: 'wijs' }); e2Bak(ctx, 760, 700, 820, 280, 22, { larven: [['s', 0.2, 0.5], ['e', 0.5, 0.35], ['e', 0.62, 0.72], ['m', 0.84, 0.45]] });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(760 + 0.2 * 820, 700 + 0.5 * 280, 80, 0, 6.283); ctx.stroke();
    naamBij(ctx, 'indicatorsoort', 'steenvlieglarve: smalle tolerantie', 1170, 640, 1, 'center'); ecoSchaal(ctx, 'larven ± 1 tot 2 cm · vergroot'); },
  e2s18(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN');
    const yy = e2Tabel(ctx, 300, 240, ['larve', 'zuurstof (mg/l)', 'temperatuur (°C)'], [['steenvlieglarve', '7 – 14', '4 – 18'], ['eendagsvlieglarve', '5 – 14', '4 – 22'], ['rode muggenlarve', '1 – 14', '4 – 30']], { bw: [500, 400, 400] });
    roundRect(ctx, 300, yy + 60, 1290, 100, 16); shape(ctx, rgba(C.goud, 0.15), C.goud, 2); text(ctx, 'beek C:  6 mg zuurstof per liter  ·  19 °C', 945, yy + 125, fTekst(44, 700), C.goud, 'center');
    metaText(ctx, 'voorbeeldwaarden', 300, yy + 210, C.text2, 'left', 26); },
  e2q19(ctx) { _vk2(ctx, ['Beek C: 6 mg zuurstof per liter en 19 °C. Gebruik de tabel.', 'Welke larven kunnen in beek C leven?'], ['Alle drie: zes milligram is genoeg', 'Alleen de rode muggenlarve', 'De eendagsvlieglarve en de rode muggenlarve']); },
  e2s20(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'BINNEN DE GRENZEN'); const R = C.koraal, G = C.groen;
    const yy = e2Tabel(ctx, 300, 240, ['larve', 'zuurstof (mg/l)', 'temperatuur (°C)'], [['steenvlieglarve', '7 – 14', '4 – 18'], ['eendagsvlieglarve', '5 – 14', '4 – 22'], ['rode muggenlarve', '1 – 14', '4 – 30']], { bw: [500, 400, 400], kleuren: [[null, R, R], [null, G, G], [null, G, G]] });
    text(ctx, 'beek C:  6 mg/l  ·  19 °C', 945, yy + 90, fTekst(44, 700), C.goud, 'center'); haak(ctx, 300, 1590, yy + 130, 'één factor buiten de grens is genoeg', C.koraal); },
  // ---------------- H3
  e2s21(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'DE ZWAKSTE SCHAKEL'); const n = [['temperatuur', 0], ['stroming', 0], ['voedsel', 0], ['zuurstof', 1]];
    n.forEach(([naam, zw], i) => { const cx = 360 + i * 400, cy = 460; ctx.strokeStyle = zw ? C.koraal : '#8FA0B5'; ctx.lineWidth = zw ? 6 : 34; ctx.beginPath(); ctx.ellipse(cx, cy, 190, 90, 0, 0, 6.283); ctx.stroke(); text(ctx, naam, cx, cy + 170, fTekst(40, 700), zw ? C.koraal : C.text, 'center'); });
    naamBij(ctx, 'beperkende factor', 'steenvlieglarve in beek B: zuurstof', 960, 260, 1, 'center'); },
  e2s22(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'DE ZWAKSTE SCHAKEL'); e2Split(ctx);
    [[0, 0.35], [965, 1]].forEach(([x0, d], k) => { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(x0, 110, 955, 790); circ(ctx, x0 + 800, 230, 50, rgba(C.goud, 0.9)); ctx.fillStyle = E2.helder; ctx.fillRect(x0, 760, 955, 140); vul(ctx, [[x0, 620], [x0 + 955, 600], [x0 + 955, 770], [x0, 770]], '#4A3E30');
      for (let i = 0; i < 14; i++) { const px = x0 + 60 + i * 64, hh = (70 + hash(i * 3 + k) * 60) * (0.4 + d * 0.9); lijn(ctx, [[px, 620], [px + 6, 620 - hh]], C.groen, 6 + d * 4); vul(ctx, [[px + 6, 620 - hh], [px - 18, 620 - hh * 0.7], [px + 6, 620 - hh * 0.55], [px + 30, 620 - hh * 0.7]], rgba(C.groen, 0.85)); } });
    _hl(ctx, 'oever links', 480); _hl(ctx, 'oever rechts', 1440); metaText(ctx, 'evenveel zon · evenveel water', 960, 940 - 60, C.text2, 'center', 26); },
  e2q23(ctx) { _vk2(ctx, ['Op beide oevers is genoeg licht en water. Links groeit weinig.', 'Wat helpt de planten op de linkeroever het meest?'], ['Extra water', 'Extra van het mineraal dat er het minst is', 'Extra licht']); },
  e2s24(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'DE ZWAKSTE SCHAKEL');
    e2Ton(ctx, 560, 860, 800, 620, [['licht', 0.92], ['water', 0.88], ['kalium', 0.76], ['stikstof', 0.42], ['fosfaat', 0.64]]);
    naamBij(ctx, 'wet van het minimum', 'de kortste duig bepaalt het niveau', 1460, 400, 1, 'left'); naamBij(ctx, 'beperkende factor', 'hier: stikstof', 1460, 560, 1, 'left'); },
  e2s25(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'DE ZWAKSTE SCHAKEL'); ctx.fillStyle = E2.helder; ctx.fillRect(300, 200, 1320, 660);
    for (let i = 0; i < 6; i++) { ctx.fillStyle = rgba(C.goud, 0.3 - i * 0.05); ctx.fillRect(300, 200 + i * 110, 1320, 110); }
    vul(ctx, [[300, 320], [1620, 820], [1620, 860], [300, 860]], E2.slib, null, 2, false); ctx.fillStyle = E2.slib; ctx.beginPath(); ctx.moveTo(300, 320); ctx.lineTo(1620, 820); ctx.lineTo(1620, 860); ctx.lineTo(300, 860); ctx.closePath(); ctx.fill();
    for (let i = 0; i < 40; i++) { const u = hash(i * 3.3); const bx = 330 + u * 1260, by = 320 + (bx - 300) / 1320 * 500; if (hash(i * 7.1) < u * 1.05) continue; const hh = 70 * (1 - u * 0.8); lijn(ctx, [[bx, by], [bx - 8, by - hh * 0.5], [bx + 4, by - hh]], C.groen, 5); lijn(ctx, [[bx, by], [bx + 10, by - hh * 0.6]], C.groen, 4); }
    metaText(ctx, 'ondiep', 280, 260, C.text2, 'right', 28); metaText(ctx, 'diep', 280, 840, C.text2, 'right', 28); naamBij(ctx, 'licht', 'neemt af met de diepte', 1660, 300, 1, 'left'); naamBij(ctx, 'wieren', 'dicht waar het ondiep is · ijl in de diepte', 900, 820, 1, 'center'); },
  // ---------------- H4
  e2s26(ctx) { e1Macro(ctx, { horizon: 640 }); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN');
    e2Eik(ctx, 960, 1100, 1.2, {}); e2Twijg(ctx, [[1260, 420], [1420, 380], [1560, 330]], 5); ecoPimpelmees(ctx, 1480, 360, 12, { houding: 'klampen', rot: 3.0 });
    e2Twijg(ctx, [[960, 640], [740, 600], [560, 560]], 26, E2.stam); e2Koolmees(ctx, 720, 590, 12, {});
    naamBij(ctx, 'pimpelmees · dunne buitentwijg', '', 1640, 150, 1, 'center'); naamBij(ctx, 'koolmees · dikke tak', '', 300, 150, 1, 'center'); naamBij(ctx, 'zelfde habitat', '', 960, 900 - 50, 1, 'center'); ecoSchaal(ctx, 'mezen vergroot'); },
  e2q27(ctx) { _vk2(ctx, ['Twee soorten eten in dezelfde boom.', 'Wat gebeurt er op den duur?'], ['Ze delen het voedsel gewoon eerlijk', 'Ze kunnen nooit samen in één bos leven', 'Eén soort verdwijnt, tenzij ze een deel van het werk anders doen']); },
  e2s28(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); const P1 = '#C9B896', P2 = C.okerD, P3 = C.teal;
    e2Buis(ctx, 300, 880, 300, { soorten: [[9, P1, 'boven']], titel: 'soort 1 alleen', lijnen: [[P1]] }); e2Buis(ctx, 720, 880, 300, { soorten: [[9, P2, 'boven']], titel: 'soort 2 alleen', lijnen: [[P2]] });
    e2Buis(ctx, 1140, 880, 300, { soorten: [[10, P1, 'boven'], [1, P2, 'boven']], titel: 'samen', lijnen: [[P1], [P2, 'weg']] }); e2Buis(ctx, 1560, 880, 300, { soorten: [[7, P1, 'boven'], [6, P3, 'onder']], titel: 'andere voedselplek', lijnen: [[P1], [P3]] });
    naamBij(ctx, 'concurrentie-uitsluitingsprincipe', 'pantoffeldiertjes · gause, jaren 1930', 960, 210, 1, 'center'); },
  e2s29(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); e2Split(ctx); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 110, 955, 790); ctx.fillRect(965, 110, 955, 790);
    e2Twijg(ctx, [[60, 300], [300, 340], [560, 330], [860, 380]], 6); e2Twijg(ctx, [[300, 340], [420, 420], [520, 470]], 4); ecoPimpelmees(ctx, 440, 430, 11, { houding: 'klampen', rot: 2.9 }); e2Rups(ctx, 610, 360, 50); e2Spin(ctx, 760, 430, 16);
    e2Twijg(ctx, [[980, 400], [1400, 380], [1900, 420]], 30, E2.stam); e2Koolmees(ctx, 1300, 382, 11, {}); e2Rups(ctx, 1540, 360, 90, '#6E9A4E'); ctx.fillStyle = C.bgMacroFront; ctx.fillRect(965, 780, 955, 120); e2Koolmees(ctx, 1640, 800, 8, {}); vul(ctx, [[1720, 800], [1736, 776], [1752, 800]], '#8A6A4A');
    naamBij(ctx, 'pimpelmees', 'dunne twijgen · kleine prooi', 480, 220, 1, 'center'); naamBij(ctx, 'koolmees', 'grote rupsen · ook op de grond', 1440, 220, 1, 'center');
    haak(ctx, 100, 1820, 900 - 80, 'zelfde habitat, andere niche', C.groen); },
  e2s30(ctx) { e1Macro(ctx, { horizon: 640 }); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); ctx.fillStyle = E2.stam; ctx.fillRect(840, 0, 240, 1080); ctx.strokeStyle = E2.stamD; ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(860 + i * 32, 0); ctx.lineTo(866 + i * 32 + (i % 2) * 8, 1080); ctx.stroke(); }
    e2Nestkast(ctx, 960, 620, 14, 28); ecoPimpelmees(ctx, 1110, 560, 14, { houding: 'vliegen', t: 0.3, kijk: -1 }); lijn(ctx, [[1080, 760], [1500, 750]], E2.stamD, 16); e2Koolmees(ctx, 1320, 752, 14, { kijk: -1 });
    naamBij(ctx, 'invlieggat 28 mm', 'koolmees past er niet door', 960, 760, 1, 'center'); naamBij(ctx, 'interspecifieke concurrentie', 'om nestholtes', 1400, 360, 1, 'left'); },
  e2q31(ctx) { _vk2(ctx, ['Wanneer is de concurrentie tussen twee soorten het grootst?'], ['Als hun niches veel overlappen', 'Als ze in verschillende bossen leven', 'Als de ene soort veel groter is dan de andere']); },
  e2s32(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN');
    circ(ctx, 760, 500, 300, rgba(C.teal, 0.25), C.teal, 4); circ(ctx, 1160, 500, 300, rgba(C.okerD, 0.25), C.okerD, 4);
    ctx.save(); ctx.beginPath(); ctx.arc(760, 500, 300, 0, 6.283); ctx.clip(); circ(ctx, 1160, 500, 300, rgba(C.koraal, 0.45)); ctx.restore();
    text(ctx, 'niche pimpelmees', 600, 500, fTekst(40, 700), C.text, 'center'); text(ctx, 'niche koolmees', 1320, 500, fTekst(40, 700), C.text, 'center');
    text(ctx, 'nestholtes', 960, 470, fTekst(36, 700), C.text, 'center'); text(ctx, 'rupsen', 960, 530, fTekst(36, 700), C.text, 'center'); naamBij(ctx, 'overlap = concurrentie', '', 960, 880, 1, 'center'); },
  e2s33(ctx) { e1Macro(ctx, { horizon: 640 }); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); ctx.fillStyle = E2.stam; ctx.fillRect(840, 0, 240, 1080); ctx.strokeStyle = E2.stamD; ctx.lineWidth = 3; for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(860 + i * 32, 0); ctx.lineTo(866 + i * 32 + (i % 2) * 8, 1080); ctx.stroke(); }
    e2Nestkast(ctx, 960, 620, 14, 32); lijn(ctx, [[840, 700], [600, 690]], E2.stamD, 14); lijn(ctx, [[1080, 700], [1320, 690]], E2.stamD, 14); e2Koolmees(ctx, 720, 692, 12, {}); e2Koolmees(ctx, 1200, 692, 12, { kijk: -1 });
    naamBij(ctx, 'intraspecifieke concurrentie', 'zelfde soort · zelfde niche', 960, 260, 1, 'center'); },
  e2s34(ctx) { e1Macro(ctx, { horizon: 640 }); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); e2Twijg(ctx, [[200, 260], [700, 330], [1100, 300]], 6); ecoPimpelmees(ctx, 620, 420, 30, { houding: 'klampen', rot: 3.0 });
    zoomCircle(ctx, 1450, 560, 260, 1450, 560, 'steenvlieglarve · plat in de stroming', 1, () => { ctx.fillStyle = E2.helder; ctx.fillRect(1190, 300, 520, 520); vul(ctx, [[1190, 700], [1300, 610], [1600, 600], [1710, 700], [1710, 820], [1190, 820]], E2.steen);
      ecoSteenvlieglarve(ctx, 1450, 604, 100, {}); for (let i = 0; i < 4; i++) pijl(ctx, 1220, 420 + i * 45, 1400, 420 + i * 45, rgba('#9ACBEA', 0.8), 1, 4, 14); });
    naamBij(ctx, 'adaptatie', 'erfelijk · ontstaan door natuurlijke selectie', 600, 800, 1, 'center'); },
  // ---------------- vwo
  e2s35(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); vwoMarker(ctx); const x = 260, y = 780, w = 1400, h = 480;
    e1As(ctx, x, y, w, h, { xLabel: 'watertemperatuur (°C)', yLabel: 'overleving', xt: [[0, '0'], [0.5, '15'], [1, '30']] });
    e2Kromme(ctx, x, y, w, h, { min: 0.1, max: 0.62, opt: 0.38, a: 0.4 }); e2Kromme(ctx, x, y, w, h, { min: 0.16, max: 0.7, opt: 0.45 }); pijl(ctx, x + 0.4 * w, y - h - 30, x + 0.48 * w, y - h - 30, C.groen, 1, 5, 18);
    naamBij(ctx, 'acclimatisatie', 'in weken · niet erfelijk', x + 0.8 * w, y - h * 0.8, 1, 'center'); metaText(ctx, 'model', 1700, 210, C.text2, 'right', 26); },
  e2s36(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); vwoMarker(ctx);
    for (let i = 0; i < 40; i++) { ctx.fillStyle = _mix('#7FB8DC', i / 40, '#24507A'); ctx.fillRect(160 + i * 40, 380, 41, 220); }
    e2Forel(ctx, 900, 490, 8, {}); naamBij(ctx, 'zeeforel', '', 900, 600 + 60, 1, 'center'); text(ctx, 'zoet', 160, 650, fTekst(40, 700), C.text, 'left'); text(ctx, 'zout', 1760, 650, fTekst(40, 700), C.text, 'right');
    naamBij(ctx, 'vismigratierivier', 'geleidelijke overgang · tijd om te acclimatiseren', 960, 300, 1, 'center'); },
  e2s37(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); vwoMarker(ctx); const x = 240, y = 760, w = 1440, h = 460;
    e1As(ctx, x, y, w, h, { xLabel: 'maand', yLabel: '', xt: [[0, 'jan'], [0.25, 'apr'], [0.5, 'jul'], [0.75, 'okt'], [1, 'jan']] });
    const D = [], T = []; for (let i = 0; i <= 120; i++) { const u = i / 120; D.push([x + u * w, y - h * (0.5 - 0.38 * Math.cos(u * 6.283 - 0.33))]); T.push([x + u * w, y - h * (0.45 - 0.3 * Math.cos(u * 6.283 - 0.6)) + Math.sin(i * 1.7) * 18 + Math.sin(i * 0.43) * 22]); }
    lijn(ctx, T, C.koraal, 4); lijn(ctx, D, C.goud, 6); text(ctx, 'daglengte', x + w * 0.5, y - h * 0.95, fTekst(40, 700), C.goud, 'center'); text(ctx, 'temperatuur', x + w * 0.32, y - h * 0.16, fTekst(40, 700), C.koraal, 'center');
    naamBij(ctx, 'fotoperiodiciteit', 'daglengte als signaal', 1500, 260, 1, 'center'); },
  e2q38(ctx) { _vk2(ctx, ['Een plant bloeit elk jaar rond dezelfde datum, ook na een warme winter.', 'Op welke factor reageert hij waarschijnlijk?'], ['De temperatuur', 'De daglengte'], true); },
  e2s39(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EÉN BOOM, TWEE MEZEN'); vwoMarker(ctx); const x = 240, y = 760, w = 1440, h = 460;
    e1As(ctx, x, y, w, h, { xLabel: 'maand', yLabel: '', xt: [[0, 'jan'], [0.25, 'apr'], [0.5, 'jul'], [0.75, 'okt'], [1, 'jan']] });
    const D = [], T = []; for (let i = 0; i <= 120; i++) { const u = i / 120; D.push([x + u * w, y - h * (0.5 - 0.38 * Math.cos(u * 6.283 - 0.33))]); T.push([x + u * w, y - h * (0.6 - 0.25 * Math.cos(u * 6.283 - 0.6)) + Math.sin(i * 1.7) * 18]); }
    lijn(ctx, T, C.koraal, 4); lijn(ctx, D, C.goud, 6); e2Vlijn(ctx, x + 0.33 * w, y, y - h - 10, C.groen, 'bloei');
    text(ctx, 'warme winter', x + w * 0.08, y - h * 0.48, fTekst(36, 700), C.koraal, 'left'); text(ctx, 'daglengte gelijk', x + w * 0.62, y - h * 0.95, fTekst(36, 700), C.goud, 'left'); },
  // ---------------- samenvatting
  e2s40(ctx) { const r = _e2TweeBeken(ctx); ecoTag(ctx, 2, 'SAMENVATTING');
    e2Meter(ctx, 140, 320, 680, { naam: 'zuurstof', v: 0.83, kleur: C.teal, waarde: '10 mg/l' }); e2Meter(ctx, 1100, 320, 680, { naam: 'zuurstof', v: 0.25, kleur: C.koraal, waarde: '3 mg/l' });
    ecoSteenvlieglarve(ctx, 420, 750, 90, {}); [[1180, 790], [1420, 770], [1660, 800]].forEach(([x, y]) => ecoMuggenlarve(ctx, x, y, 70, {})); ecoSchaal(ctx, 'larven vergroot');
    naamBij(ctx, 'beperkende factor', 'zuurstof', 1440, 520, 1, 'center'); },
  e2s41(ctx) { e1Macro(ctx, { horizon: 640 }); ecoTag(ctx, 2, 'SAMENVATTING'); e2Eik(ctx, 760, 1100, 1.1, {});
    e2Twijg(ctx, [[1000, 430], [1120, 390]], 5); ecoPimpelmees(ctx, 1080, 410, 7, { houding: 'klampen', rot: 3.0 }); e2Koolmees(ctx, 560, 620, 7, {});
    roundRect(ctx, 1320, 300, 520, 520, 24); shape(ctx, rgba(C.bgSchema, 0.92), C.line, 2); e2Ton(ctx, 1380, 760, 400, 380, [['licht', 0.9], ['water', 0.86], ['kalium', 0.74], ['stikstof', 0.42], ['fosfaat', 0.62]]);
    naamBij(ctx, 'andere niche', '', 760, 230, 1, 'center'); },
  e2s42(ctx) { e1Macro(ctx, { horizon: 500 }); ecoTag(ctx, 2, 'SAMENVATTING'); ctx.fillStyle = E2.helder; ctx.fillRect(0, 560, W, 120); e1Oever(ctx, 676, { golf: 5 });
    const p = persoon(ctx, 'noor', 640, 960, 330, { outfit: 'zomer', uit: 'lacht', pose: 'vasthouden' }); lijn(ctx, [[p.handR.x, p.handR.y], [p.handR.x + 200, p.handR.y - 240]], '#8A6A4A', 6);
    ctx.strokeStyle = '#C8CCD4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(p.handR.x + 230, p.handR.y - 250, 60, 34, 0.3, 0, 6.283); ctx.stroke();
    e2Bak(ctx, 900, 700, 820, 260, 22, { larven: [['s', 0.2, 0.5], ['e', 0.48, 0.35], ['s', 0.68, 0.62], ['e', 0.86, 0.4]] }); ecoSchaal(ctx, 'larven vergroot'); },
  e2s43(ctx) { _bg2(ctx); ecoTag(ctx, 2, 'EINDKAART');
    ['Een soort leeft alleen waar elke factor binnen haar tolerantiegebied ligt.', 'De beperkende factor is de factor die het verst buiten het optimum ligt.', 'Soorten in één habitat kunnen samenleven als hun niches verschillen.']
      .forEach((s, i) => text(ctx, s, 160, 300 + i * 130, fTekst(46, 600), C.text, 'left')); haak(ctx, 160, 1700, 620, 'een soort past waar alle factoren kloppen', C.groen); },
};
