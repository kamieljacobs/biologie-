// sb7.js — Ecologie v2, film 7 'Stikstof gaat rond' — storyboard: één keyframe per scène (29 okt 2026). Laadt na teken_eco7.js.
const _F7 = 7;
const _tafel7 = (ctx, y = 800) => { ctx.fillStyle = '#2A3448'; ctx.fillRect(60, y, W - 120, 16); };
function _sch7(ctx, hfst) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, hfst); }
function _vraag7(ctx, vraag, opties, beeld) { ecoVraagKaart(ctx, vraag, opties, _F7); if (beeld) beeld(ctx); }
const _O7 = (s) => s.split(' · ').map(x => x.replace(/^[A-D] /, ''));
function SCENE7(id) { return (typeof SB7_DATA !== 'undefined' && SB7_DATA[id]) || {}; }
// cast: Yasmin en Bilal in practicumjas (proef), Gerrit in stalkleding
const _yas = (ctx, x, y, h, o = {}) => persoon(ctx, 'yasmin', x, y, h, Object.assign({ outfit: 'practicum' }, o));
const _bil = (ctx, x, y, h, o = {}) => persoon(ctx, 'bilal', x, y, h, Object.assign({ outfit: 'practicum' }, o));
const _ger = (ctx, x, y, h, o = {}) => persoon(ctx, 'gerrit', x, y, h, Object.assign({ outfit: 'stal' }, o));
const _gieter7 = (c, x, y) => { c.save(); c.translate(x, y); c.fillStyle = '#5E7A9A'; roundRect(c, -10, -20, 70, 46, 10); c.fill(); c.strokeStyle = '#5E7A9A'; c.lineWidth = 6; c.beginPath(); c.moveTo(56, -8); c.lineTo(110, -40); c.stroke(); c.restore(); };
const _ionenRegen = (soort, n, seed, yRel = [0.1, 0.9]) => (ctx, x0, top0, w, bodem) => { for (let i = 0; i < n; i++) e7Ion(ctx, x0 + 20 + hash(seed + i * 1.3) * (w - 40), top0 + (yRel[0] + hash(seed + i * 2.1) * (yRel[1] - yRel[0])) * (bodem - top0), 9, soort); };

const SB7 = {
  // ================= Opening =================
  e7s01(ctx) { e7Weiland(ctx, { groen: 0 }); koe7(ctx, 640, 640, 0.75, { houding: 'grazen' }); koe7(ctx, 1020, 630, 0.68, {}); koe7(ctx, 1380, 636, 0.72, { houding: 'grazen', kijk: -1 });
    for (const x of [300, 820, 1500]) e7Waterplant(ctx, x, 830, 60, 0.9); ecoTag(ctx, _F7, 'OPENING'); naamBij(ctx, 'april', 'HELDER WATER', 160, 200, 1, 'left'); },
  e7s02(ctx) { e7Weiland(ctx, { groen: 1 }); koe7(ctx, 640, 640, 0.75, { houding: 'grazen' }); koe7(ctx, 1020, 630, 0.68, {}); koe7(ctx, 1380, 636, 0.72, { houding: 'grazen', kijk: -1 });
    ecoTag(ctx, _F7, 'OPENING'); naamBij(ctx, 'juni', 'GROENE LAAG', 160, 200, 1, 'left');
    text(ctx, 'Waarom wordt een sloot', W / 2, 250, fTekst(56, 700), C.text, 'center'); text(ctx, 'naast een weiland groen?', W / 2, 320, fTekst(56, 700), C.text, 'center');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(960, 790, 520, 62, 0, 0, 6.283); ctx.stroke(); },
  e7s03(ctx) { ecoTitelKaart(ctx, _F7, 'Stikstof gaat rond', ['Waarom wordt een sloot', 'naast een weiland groen?'], (c) => { c.save(); c.beginPath(); c.rect(1060, 180, 780, 640); c.clip(); c.translate(1060, 180); c.scale(0.41, 0.6); c.translate(-300, -60); e7Doorsnede(c, { slootX: 1500 }); c.restore();
      for (let i = 0; i < 6; i++) pijl(c, 1180 + i * 90, 580 + (i % 2) * 20, 1260 + i * 90, 600 + (i % 2) * 20, E7.nit, 1, 4, 14); c.strokeStyle = C.line; c.lineWidth = 1.5; c.strokeRect(1060, 180, 780, 640); }); },

  // ================= H1 Stikstof uit de lucht =================
  e7s04(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx); _yas(ctx, 300, 900, 430, { pose: 'wijs' }); _bil(ctx, 1660, 900, 450, { kijk: -1 });
    [620, 880, 1140, 1400].forEach((x, i) => e7Bak(ctx, x, 800, { w: 200, h: 260, lagen: i === 3 ? [] : [[E7.zand, 110 + i * 10]], label: 'bak ' + (i + 1), opvang: i === 0 ? 0.4 : 0 }));
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(620, 740, 26, 0, 6.283); ctx.stroke(); naamBij(ctx, 'kraantje', 'HIER KOMT HET WATER ERUIT', 620, 862, 1, 'center'); },
  e7s05(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); e7Eiwit(ctx, 560, 480, 2.2, { vouw: 0.85, n: 34 });
    naamBij(ctx, 'eiwit', 'KETEN VAN AMINOZUREN', 560, 800, 1, 'center'); naamBij(ctx, 'stikstof', 'IN ELK AMINOZUUR', 300, 220, 1, 'left', _l7(E7.nit, 0.35));
    const vak = (x, naam, fn) => { roundRect(ctx, x, 260, 280, 440, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); ctx.save(); ctx.beginPath(); roundRect(ctx, x, 260, 280, 440, 14); ctx.clip(); fn(x + 140, 660); ctx.restore(); naamBij(ctx, naam, null, x + 140, 750, 1, 'center'); };
    vak(980, 'plant', (x, y) => ecoKlaver(ctx, x, y, 14, {})); vak(1290, 'koe', (x, y) => (ctx.fillStyle = '#3A5540', ctx.fillRect(x - 140, y - 60, 280, 120), koe7(ctx, x, y - 60, 0.55, {}))); vak(1600, 'jij', (x, y) => persoon(ctx, 'yasmin', x, y + 10, 360, { outfit: 'school' }));
    metaText(ctx, 'ALLEMAAL EIWIT · NIET OP SCHAAL', 980, 230, C.text2, 'left', 26); },

  e7s06(ctx) { e7Weiland(ctx, { groen: 0, sloot: false }); for (let i = 0; i < 26; i++) e7N2(ctx, 120 + hash(i * 3.1) * 1680, 120 + hash(i * 1.7) * 300, 16, { rot: hash(i) * 3 });
    ecoTag(ctx, _F7, 'STIKSTOF UIT DE LUCHT'); const x0 = 460, w = 1000, y = 520; [[0.78, E7.n2, '78 % stikstofgas'], [0.21, C.teal, '21 % zuurstof'], [0.01, C.text2, '']].reduce((acc, [f, kl, nm]) => { roundRect(ctx, x0 + acc * w, y, f * w - 3, 56, 8); shape(ctx, kl, _l7(kl, 0.3), 1); return acc + f; }, 0); naamBij(ctx, '78 % stikstofgas', null, x0 + 390, y + 110, 1, 'center'); naamBij(ctx, '21 % zuurstof', null, x0 + 885, y + 110, 1, 'center');
    metaText(ctx, 'SAMENSTELLING VAN DROGE LUCHT', x0, y - 18, C.text2, 'left', 26); },
  e7q07(ctx) { const S = SCENE7('e7q07'); _vraag7(ctx, ['Het gras staat de hele dag in lucht vol stikstofgas.', 'Kan het gras die stikstof gebruiken?'], _O7(S.opties || ''), (c) => { e7Gras(c, 1680, 720, 240, 260, { n: 9 }); for (let i = 0; i < 10; i++) e7N2(c, 1560 + hash(i * 2) * 260, 300 + hash(i * 5) * 300, 15, { rot: hash(i) * 3 }); }); },
  e7s08(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'STIKSTOF UIT DE LUCHT');
    vul(ctx, [[0, 140], [W, 140], [W, 420], [1080, 420], [1040, 470], [880, 470], [840, 420], [0, 420]], '#3E6A4A', '#5E8A66', 2);
    for (let i = 0; i < 16; i++) { const cx = 60 + i * 120; if (cx > 760 && cx < 1160) continue; ctx.beginPath(); ctx.ellipse(cx, 300, 52, 80, 0, 0, 6.283); shape(ctx, '#4E7E58', '#6E9E78', 1.5); chloroplast(ctx, cx - 10, 280, 26, 0.9, 0.4); chloroplast(ctx, cx + 14, 330, 24, 0.9, -0.3); }
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(960 + s * 58, 440, 46, 30, 0, 0, 6.283); shape(ctx, '#5E9A62', '#8ABE8C', 1.5); }
    naamBij(ctx, 'huidmondje', 'ONDERKANT VAN EEN BLAD', 960, 540, 1, 'center');
    lijn(ctx, [[700, 800], [880, 620], [960, 470], [990, 380], [1050, 470], [1120, 620], [1300, 820]], rgba(C.goud, 0.6), 2.5);
    e7N2(ctx, 960, 400, 26, { rot: 0.6 }); e7N2(ctx, 760, 740, 26, { rot: 0.2 }); e7N2(ctx, 1240, 760, 26, { rot: 1.2 }); for (let i = 0; i < 8; i++) e7N2(ctx, 200 + hash(i * 9) * 1500, 640 + hash(i * 4) * 200, 20, { rot: hash(i) * 3, a: 0.6 });
    naamBij(ctx, 'stikstofgas', 'ERIN EN ONVERANDERD ERUIT', 1340, 700, 1, 'left'); metaText(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26); },
  e7s09(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx); e7Bak(ctx, 720, 800, { plant: 'gras', plantH: 18, label: 'bak 1', meta: 'GRAS' }); e7Bak(ctx, 1120, 800, { plant: 'klaver', plantH: 22, label: 'bak 2', meta: 'KLAVER' });
    e7Klok(ctx, 1500, 260, 0); _bil(ctx, 330, 900, 450, { pose: 'vasthouden', hold: _gieter7 });
    naamBij(ctx, 'arm zand, geen mest', 'ALLEEN WATER EN LICHT', 920, 230, 1, 'center'); },
  e7q10(ctx) { const S = SCENE7('e7q10'); _vraag7(ctx, 'Welke bak groeit na acht weken het best?', _O7(S.opties || ''), (c) => { e7Bak(c, 1610, 760, { w: 150, h: 200, plant: 'gras', plantH: 14, label: 'bak 1' }); e7Bak(c, 1790, 760, { w: 150, h: 200, plant: 'klaver', plantH: 16, label: 'bak 2' }); }); },
  e7s11(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); _tafel7(ctx); e7Klok(ctx, 1560, 220, 8); e7Bak(ctx, 520, 800, { plant: 'grasGeel', plantH: 46, label: 'bak 1', meta: 'GRAS' }); e7Bak(ctx, 860, 800, { plant: 'klaver', plantH: 110, label: 'bak 2', meta: 'KLAVER', wortelKnol: 1.1 });
    ecoKlaver(ctx, 1380, 560, 18, { knol: 2.2 });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1390, 690, 200, 120, 0, 0, 6.283); ctx.stroke(); naamBij(ctx, 'wortelknolletjes', null, 1390, 860, 1, 'center');
    _yas(ctx, 1760, 900, 430, { kijk: -1, pose: 'wijs' }); },
  e7s12(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'STIKSTOF UIT DE LUCHT');
    lijn(ctx, [[120, 300], [260, 420], [330, 600], [360, 820]], '#C8AA84', 10); ctx.beginPath(); ctx.ellipse(300, 520, 34, 22, 0.9, 0, 6.283); shape(ctx, '#E8809E', '#9A3E5E', 2);
    zoomCircle(ctx, 920, 470, 330, 300, 520, 'DOORSNEDE VAN EEN KNOLLETJE · ± 3 MM', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(560, 120, 720, 720); e7Knol(ctx, 920, 470, 250); });
    for (let i = 0; i < 5; i++) e7N2(ctx, 1380 + i * 46, 260 + i * 30, 16, { rot: i }); pijl(ctx, 1380, 330, 1250, 400, E7.n2, 1, 4, 14);
    for (let i = 0; i < 4; i++) e7Ion(ctx, 1440 + i * 50, 700 + (i % 2) * 30, 12, 'amm'); pijl(ctx, 1250, 600, 1400, 680, E7.amm, 1, 4, 14);
    naamBij(ctx, 'stikstofgas', null, 1500, 230, 1, 'left'); naamBij(ctx, 'ammonium', null, 1480, 800, 1, 'left'); naamBij(ctx, 'bacteriën', 'IN DE ROZE CELLEN', 1360, 520, 1, 'left'); },
  e7s13(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); ecoKlaver(ctx, 520, 600, 26, { knol: 2 });
    e7Bacterie(ctx, 1380, 560, 220, { rot: 0.1 }); e7Bacterie(ctx, 1460, 640, 160, { rot: -0.4, a: 0.8 });
    pijl(ctx, 760, 420, 1200, 470, ECOK.organisch, 1, 5, 18); pijl(ctx, 1200, 700, 760, 720, E7.nit, 1, 5, 18);
    naamBij(ctx, 'suikers', 'VAN DE PLANT', 980, 400, 1, 'center', ECOK.organisch); naamBij(ctx, 'ammonium', 'VAN DE BACTERIE', 980, 790, 1, 'center', _l7(E7.nit, 0.35));
    naamBij(ctx, 'klaver', 'VLINDERBLOEMIGE', 200, 300, 1, 'left'); naamBij(ctx, 'bacterie', 'IN HET KNOLLETJE', 1420, 440, 1, 'center');
    haak(ctx, 520, 1460, 830, 'mutualisme: allebei voordeel', C.groen); },
  e7s14(ctx) { e7Weiland(ctx, { groen: 0, sloot: false, horizon: 480 }); for (let i = 0; i < 40; i++) ecoKlaver(ctx, 80 + hash(i * 3.3) * 1760, 700 + hash(i * 1.9) * 160, 2.6 + hash(i) * 1.2, {});
    _ger(ctx, 980, 820, 360, { pose: 'zwaai' }); ecoTag(ctx, _F7, 'STIKSTOF UIT DE LUCHT'); naamBij(ctx, 'klaver tussen het gras', '± EEN KWART', 1400, 640, 1, 'left');
    card(ctx, 1240, 160, 600, 170, 'minder kunstmest', '± 100 kg stikstof per hectare per jaar'); },
  e7s15(ctx) { e7Weiland(ctx, { groen: 0, sloot: false, horizon: 460 }); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 640, W, 440); for (let x = 0; x < W; x += 60) { ctx.fillStyle = '#3E3024'; ctx.fillRect(x, 640, 30, 440); }
    for (let i = 0; i < 70; i++) ecoKlaver(ctx, 40 + hash(i * 2.7) * 1100, 660 + hash(i * 3.9) * 220, 2.4, {}); ecoTag(ctx, _F7, 'STIKSTOF UIT DE LUCHT');
    naamBij(ctx, 'ondergeploegd', 'WORDT HUMUS EN MINERALEN', 1500, 760, 1, 'center');
    naamBij(ctx, 'groenbemester', 'KLAVER WORDT ONDERGEPLOEGD', 560, 560, 1, 'center'); },
  e7s16(ctx) { _sch7(ctx, 'STIKSTOF UIT DE LUCHT'); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 760, W, 140); naamBij(ctx, 'bodem', null, 120, 830, 1, 'left');
    const cols = [[420, 6, 'bacteriën', 'IN KNOLLETJES'], [960, 2, 'bliksem', 'EEN KLEIN BEETJE'], [1500, 9, 'kunstmestfabriek', 'VEEL ENERGIE']];
    for (const [x, d] of cols) pijl(ctx, x, 280, x, 730, E7.nit, 1, d * 3, 22);
    e7Bacterie(ctx, 420, 200, 120); ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(990, 120); ctx.lineTo(940, 200); ctx.lineTo(985, 200); ctx.lineTo(930, 280); ctx.stroke();
    ctx.fillStyle = '#5E6A80'; ctx.fillRect(1420, 170, 160, 100); ctx.fillRect(1440, 100, 30, 70); ctx.fillRect(1500, 120, 30, 50);
    cols.forEach(([x, , n, m]) => naamBij(ctx, n, m, x + 40, 500, 1, 'left')); metaText(ctx, 'DIKTE VAN DE PIJL = HOEVEELHEID', 80, 880, C.text2, 'left', 26); },

  // ================= H2 Van mest tot nitraat =================
  e7s17(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); ctx.fillStyle = '#4A3A2A'; ctx.fillRect(0, 620, 900, 300); e7Gras(ctx, 450, 620, 500, 360, { n: 18 }); e7Wortels(ctx, 450, 620, 220, 360, {});
    for (let i = 0; i < 10; i++) e7Ion(ctx, 160 + hash(i * 3) * 600, 700 + hash(i * 5) * 170, 11, i % 3 ? 'nit' : 'amm');
    pijl(ctx, 700, 420, 1000, 420, C.line, 1, 3, 14); e7Eiwit(ctx, 1380, 430, 1.6, { vouw: 0.5, n: 26 });
    naamBij(ctx, 'ammonium en nitraat', 'UIT DE BODEM', 450, 840, 1, 'center'); naamBij(ctx, 'aminozuren, eiwit', 'IN DE PLANT', 1380, 680, 1, 'center');
    haak(ctx, 1120, 1640, 780, 'stikstofassimilatie', C.groen); },
  e7s18(ctx) { e7Weiland(ctx, { sloot: false, horizon: 460 }); koe7(ctx, 900, 760, 1.25, { houding: 'grazen' }); ecoTag(ctx, _F7, 'VAN MEST TOT NITRAAT');
    ctx.fillStyle = E7.mest; ctx.beginPath(); ctx.ellipse(560, 800, 70, 22, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = rgba('#D8C86A', 0.55); ctx.beginPath(); ctx.ellipse(700, 812, 90, 16, 0, 0, 6.283); ctx.fill();
    naamBij(ctx, 'mest', 'STIKSTOF IN RESTEN', 560, 870, 1, 'center'); naamBij(ctx, 'urine', 'UREUM', 760, 870, 1, 'left'); naamBij(ctx, 'eiwit in gras', null, 1300, 640, 1, 'left'); },
  e7s19(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 960, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 34, label: 'bak 3', meta: 'MET KOEIENMEST', opvang: 0 });
    _ger(ctx, 560, 900, 450, { pose: 'vasthouden', hold: (c, x, y) => { c.save(); c.fillStyle = '#7A8494'; roundRect(c, x - 30, y - 6, 70, 80, 8); c.fill(); c.fillStyle = E7.mest; c.fillRect(x - 24, y, 58, 16); c.restore(); } });
    e7Klok(ctx, 1500, 260, 0); e7Strip(ctx, 1400, 720, 'amm', 0); e7Strip(ctx, 1600, 720, 'nit', 0); },
  e7s20(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 520, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 34, label: 'bak 3', opvang: 0.5 }); e7Klok(ctx, 520, 200, 1);
    e7Strip(ctx, 760, 740, 'amm', 0.85, { h: 260 }); e7Strip(ctx, 930, 740, 'nit', 0, { h: 260 });
    zoomCircle(ctx, 1400, 470, 290, 560, 470, 'IN DE MEST · VERGROOT', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1100, 140, 600, 600);
      e7Eiwit(ctx, 1330, 330, 0.9, { vouw: 0.3, n: 16 }); e7Bacterie(ctx, 1460, 470, 150, { rot: -0.5 }); e7Bacterie(ctx, 1260, 560, 120, { rot: 0.3 });
      for (let i = 0; i < 7; i++) e7Ion(ctx, 1200 + i * 60, 640 + (i % 2) * 30, 12, 'amm'); });
    naamBij(ctx, 'ammonificatie', 'AFBREKERS MAKEN AMMONIUM', 1400, 110, 1, 'center'); },
  e7s21(ctx) { e7Stal(ctx, { vloer: 640 }); ecoTag(ctx, _F7, 'VAN MEST TOT NITRAAT'); koe7(ctx, 700, 640, 1.2, {});
    ctx.fillStyle = rgba('#D8C86A', 0.6); ctx.fillRect(1080, 622, 300, 18); ctx.fillStyle = E7.mest; ctx.beginPath(); ctx.ellipse(1180, 622, 60, 14, 0, Math.PI, 0); ctx.fill();
    for (let i = 0; i < 14; i++) e7Ion(ctx, 1110 + hash(i * 2.2) * 260, 330 + hash(i * 3.3) * 250, 10, 'amm', { teken: false });
    pijl(ctx, 1240, 600, 1300, 300, E7.amm, 1, 4, 16); naamBij(ctx, 'ammoniak', 'ONTSNAPT NAAR DE LUCHT', 1420, 300, 1, 'left'); naamBij(ctx, 'urine + mest', 'OP DE ROOSTERVLOER', 1230, 740, 1, 'center'); },
  e7s22(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 480, 800, { lagen: [[E7.zand, 120], [E7.humus, 30]], mest: 26, label: 'bak 3', opvang: 0.6 }); e7Klok(ctx, 480, 200, 4);
    const gx = 900, gy = 760, gw = 840, gh = 440; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    for (let wk = 0; wk <= 4; wk++) metaText(ctx, String(wk), gx + wk * gw / 4, gy + 40, C.text2, 'center', 28); metaText(ctx, 'WEEK', gx + gw, gy + 76, C.text2, 'right', 26); metaText(ctx, 'HOEVEELHEID IN HET WATER', gx, gy - gh - 20, C.text2, 'left', 26);
    const am = [0, 0.85, 0.6, 0.3, 0.15], ni = [0, 0.05, 0.35, 0.65, 0.85];
    lijn(ctx, am.map((v, i) => [gx + i * gw / 4, gy - v * gh]), E7.amm, 5); lijn(ctx, ni.map((v, i) => [gx + i * gw / 4, gy - v * gh]), E7.nit, 5);
    naamBij(ctx, 'ammonium', null, gx + gw * 0.27, gy - 0.9 * gh, 1, 'left', E7.amm); naamBij(ctx, 'nitraat', 'NITRIFICATIE · MET ZUURSTOF', gx + gw * 0.62, gy - 0.86 * gh, 1, 'left', _l7(E7.nit, 0.35)); metaText(ctx, 'VOORBEELD', gx + gw, gy - gh - 20, C.text2, 'right', 26); },
  e7q23(ctx) { const S = SCENE7('e7q23'); _vraag7(ctx, ['Je doet dezelfde mest in een bak die je luchtdicht afsluit.', 'Wat meet je na vier weken?'], _O7(S.opties || ''), (c) => { e7Bak(c, 1610, 760, { w: 150, h: 200, lagen: [[E7.zand, 70]], mest: 18, label: 'open' }); e7Bak(c, 1790, 760, { w: 150, h: 200, lagen: [[E7.zand, 70]], mest: 18, dicht: true, label: 'dicht' }); }); },
  e7s24(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); _tafel7(ctx); e7Bak(ctx, 380, 800, { w: 200, lagen: [[E7.zand, 110]], mest: 24, label: 'open', opvang: 0.5 }); e7Bak(ctx, 1060, 800, { w: 200, lagen: [[E7.zand, 110]], mest: 24, dicht: true, label: 'dicht', meta: 'LUCHTDICHT', opvang: 0.5 });
    const mini = (gx, am, ni) => { const gy = 760, gw = 300, gh = 260; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke(); lijn(ctx, am.map((v, i) => [gx + i * gw / 4, gy - v * gh]), E7.amm, 5); lijn(ctx, ni.map((v, i) => [gx + i * gw / 4, gy - v * gh]), E7.nit, 5); metaText(ctx, '4 WEKEN', gx + gw, gy + 36, C.text2, 'right', 26); };
    mini(560, [0, 0.85, 0.6, 0.3, 0.15], [0, 0.05, 0.35, 0.65, 0.85]); mini(1240, [0, 0.4, 0.6, 0.75, 0.85], [0, 0, 0, 0.02, 0.02]);
    naamBij(ctx, 'ammonium', 'STAPELT OP', 1560, 500, 1, 'left', E7.amm); naamBij(ctx, 'nitraat', 'BLIJFT WEG', 1560, 740, 1, 'left', _l7(E7.nit, 0.35));
    haak(ctx, 1240, 1540, 800, 'zonder zuurstof geen nitrificatie', C.koraal); },
  e7s25(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'VAN MEST TOT NITRAAT'); vwoMarker(ctx);
    e7Bacterie(ctx, 960, 470, 520, { rot: 0 });
    for (let i = 0; i < 3; i++) e7Ion(ctx, 360 + i * 60, 440 + i * 20, 18, 'amm'); pijl(ctx, 520, 460, 680, 470, E7.amm, 1, 5, 18);
    for (let i = 0; i < 3; i++) e7Ion(ctx, 1440 + i * 60, 440 + i * 20, 18, 'nit'); pijl(ctx, 1240, 470, 1400, 460, E7.nit, 1, 5, 18);
    pijl(ctx, 960, 200, 960, 360, C.goud, 1, 6, 20); naamBij(ctx, 'energie', 'UIT DE OMZETTING', 1000, 220, 1, 'left', C.goud);
    for (let i = 0; i < 3; i++) circ(ctx, 760 + i * 46, 700, 14, '#5E6675', '#8A92A0', 1.5); pijl(ctx, 880, 690, 960, 600, '#8A92A0', 1, 3, 12); naamBij(ctx, 'koolstofdioxide', 'WORDT ORGANISCHE STOF', 780, 790, 1, 'center');
    circ(ctx, 1560, 220, 40, null, C.goud, 3); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; ctx.beginPath(); ctx.moveTo(1560 + Math.cos(a) * 52, 220 + Math.sin(a) * 52); ctx.lineTo(1560 + Math.cos(a) * 70, 220 + Math.sin(a) * 70); ctx.stroke(); }
    ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1490, 290); ctx.lineTo(1630, 150); ctx.stroke(); naamBij(ctx, 'geen licht nodig', null, 1560, 340, 1, 'center');
    naamBij(ctx, 'nitrificerende bacterie', 'CHEMO-AUTOTROOF', 960, 620, 1, 'center'); },
  e7s26(ctx) { _sch7(ctx, 'VAN MEST TOT NITRAAT'); vwoMarker(ctx);
    const gx = 520, gy = 760, k = 5.5; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 760, gy); ctx.stroke(); metaText(ctx, 'KEER ZOVEEL KOOLSTOF ALS STIKSTOF (C/N)', gx, gy - 90 * k - 20, C.text2, 'left', 26);
    roundRect(ctx, gx + 80, gy - 80 * k, 220, 80 * k - 2, 8); shape(ctx, _m7(C.oker, 0.25, C.bgSchema), _l7(C.oker, 0.3), 1.5); text(ctx, 'stro ± 80', gx + 190, gy + 50, fTekst(40, 700), C.text, 'center');
    roundRect(ctx, gx + 460, gy - 17 * k, 220, 17 * k - 2, 8); shape(ctx, _m7(C.groen, 0.25, C.bgSchema), _l7(C.groen, 0.3), 1.5); text(ctx, 'klaver ± 17', gx + 570, gy + 50, fTekst(40, 700), C.text, 'center');
    card(ctx, 1380, 380, 440, 160, 'meer hierover', 'in de film Waar blijft het blad?'); },

  e7s27(ctx) { _sch7(ctx, 'HET LEK NAAR DE SLOOT'); _tafel7(ctx); e7Bak(ctx, 760, 800, { lagen: [[E7.klei, 150]], mest: 24, label: 'klei', meta: 'MET MEST', druppels: 1, opvang: 0.5 }); e7Bak(ctx, 1160, 800, { lagen: [[E7.zand, 150]], mest: 24, label: 'zand', meta: 'MET MEST', druppels: 1, opvang: 0.6, seed: 4 });
    _bil(ctx, 330, 900, 450, { pose: 'vasthouden', hold: _gieter7 }); _yas(ctx, 1620, 900, 430, { kijk: -1 }); },
  e7q28(ctx) { const S = SCENE7('e7q28'); _vraag7(ctx, 'Welke strip kleurt in het water onder de kleibak?', _O7(S.opties || ''), (c) => { e7Bak(c, 1700, 620, { w: 170, h: 220, lagen: [[E7.klei, 110]], mest: 16, label: 'klei', opvang: 0.5 }); e7Strip(c, 1620, 860, 'amm', 0, { h: 160 }); e7Strip(c, 1790, 860, 'nit', 0, { h: 160 }); }); },
  e7s29(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'HET LEK NAAR DE SLOOT'); e7Kleideeltje(ctx, 960, 470, 1100, 170);
    for (let i = 0; i < 6; i++) e7Ion(ctx, 560 + i * 160, 300, 22, 'amm'); for (let i = 0; i < 4; i++) { const x = 620 + i * 230, y = 640 + (i % 2) * 80; e7Ion(ctx, x, y, 22, 'nit'); pijl(ctx, x, y + 34, x, y + 120, E7.nit, 0.8, 3, 12); }
    for (let i = 0; i < 6; i++) { const x = 560 + hash(i * 3) * 900, y = 720 + hash(i * 5) * 120; ctx.fillStyle = rgba('#9CCBE3', 0.7); ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.quadraticCurveTo(x + 8, y, x, y + 6); ctx.quadraticCurveTo(x - 8, y, x, y - 12); ctx.fill(); }
    naamBij(ctx, 'ammonium', 'POSITIEF · BLIJFT HANGEN', 1560, 300, 1, 'left', E7.amm); naamBij(ctx, 'kleideeltje', 'NEGATIEF GELADEN', 1560, 470, 1, 'left'); naamBij(ctx, 'nitraat', 'NEGATIEF · SPOELT UIT', 1560, 690, 1, 'left', _l7(E7.nit, 0.35)); metaText(ctx, 'MODEL · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26); },
  e7s30(ctx) { _sch7(ctx, 'HET LEK NAAR DE SLOOT'); _tafel7(ctx, 820); e7Bak(ctx, 560, 820, { lagen: [[E7.klei, 150]], mest: 18, label: 'klei', opvang: 0.5, a: 0.5 }); e7Bak(ctx, 1160, 820, { lagen: [[E7.zand, 150]], mest: 18, label: 'zand', opvang: 0.65, seed: 4 });
    e7Strip(ctx, 740, 760, 'amm', 0, { h: 240, a: 0.5 }); e7Strip(ctx, 900, 760, 'nit', 0.7, { h: 240, a: 0.5 }); e7Strip(ctx, 1360, 760, 'amm', 0.25, { h: 240 }); e7Strip(ctx, 1530, 760, 'nit', 0.95, { h: 240 }); },
  e7s31(ctx) { e7Doorsnede(ctx, { kroos: 1 }); ecoTag(ctx, _F7, 'HET LEK NAAR DE SLOOT');
    for (let i = 0; i < 9; i++) { const x = 160 + i * 120, y = 560 + (i % 3) * 40; pijl(ctx, x, y, x + 40, y + 120, E7.nit, 0.9, 4, 14); }
    for (let i = 0; i < 4; i++) pijl(ctx, 900 + i * 90, 760, 1000 + i * 90, 700 - i * 30, E7.nit, 0.9, 4, 14);
    for (let i = 0; i < 3; i++) pijl(ctx, 980 + i * 100, 720, 1060 + i * 100, 640 - i * 20, E7.fos, 1, 4, 14); naamBij(ctx, 'nitraat spoelt uit', 'MET HET REGENWATER', 640, 790, 1, 'center', _l7(E7.nit, 0.35)); naamBij(ctx, 'fosfaat', 'BIJ VEEL MEST', 1250, 760, 1, 'left', E7.fos); naamBij(ctx, 'kroos en algen', 'GROEIEN HARDER', 1460, 440, 1, 'center'); },
  e7s32(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'HET LEK NAAR DE SLOOT');
    const paneel = (x, winter, naam) => { ctx.save(); ctx.beginPath(); ctx.rect(x, 140, 820, 700); ctx.clip(); ctx.translate(x, 140); ctx.scale(0.43, 0.75); ctx.translate(0, -120); e7Doorsnede(ctx, { kroos: 0, winter, slootX: 2400, gw: 820 }); ctx.restore();
      for (let i = 0; i < 6; i++) { const px = x + 80 + i * 120, py = 540; if (winter) pijl(ctx, px, py, px + 10, py + 150, E7.nit, 1, 4, 14); else pijl(ctx, px + 10, py + 80, px, py - 20, E7.nit, 1, 4, 14); }
      ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, 140, 820, 700); naamBij(ctx, naam, winter ? 'WEINIG OPNAME · VEEL REGEN' : 'WORTELS NEMEN OP', x + 410, 200, 1, 'center'); };
    paneel(110, false, 'zomer'); paneel(990, true, 'winter'); },
  e7s33(ctx) { _sch7(ctx, 'HET LEK NAAR DE SLOOT'); e7Balans(ctx, 360, 780, { k: 2.2 }); _ger(ctx, 1560, 900, 440, { kijk: -1, pose: 'wijs' }); },
  e7q34(ctx) { const S = SCENE7('e7q34'); _vraag7(ctx, ['Erop: 120 kg kunstmest, 80 kg mest en 20 kg uit de lucht.', 'Eraf: 140 kg in de oogst. Wat blijft er per hectare over?'], _O7(S.opties || ''), (c) => { c.save(); c.translate(1500, 330); c.scale(0.5, 0.5); e7Balans(c, 0, 600, { k: 2 }); c.restore(); }); },
  e7s35(ctx) { _sch7(ctx, 'HET LEK NAAR DE SLOOT'); e7Balans(ctx, 360, 780, { k: 2.2, overschot: true });
    const ox = 1000, oy = 780 - 180 * 2.2; pijl(ctx, ox + 30, oy - 40, ox + 300, oy - 160, E7.amm, 1, 4, 16); pijl(ctx, ox + 30, oy + 20, ox + 300, oy + 60, E7.nit, 1, 4, 16); pijl(ctx, ox + 30, oy + 70, ox + 300, oy + 230, E7.n2, 1, 4, 16);
    naamBij(ctx, 'ammoniak', 'NAAR DE LUCHT', ox + 320, oy - 170, 1, 'left', E7.amm); naamBij(ctx, 'nitraat', 'NAAR GRONDWATER EN SLOOT', ox + 320, oy + 60, 1, 'left', _l7(E7.nit, 0.35)); naamBij(ctx, 'stikstofgas', 'DENITRIFICATIE', ox + 320, oy + 240, 1, 'left'); },
  e7s36(ctx) { _sch7(ctx, 'HET LEK NAAR DE SLOOT'); const kn = [[560, 260, 'fosfaat in de bodem'], [1060, 260, 'plant'], [1360, 560, 'dier'], [1060, 820, 'mest, dood'], [560, 820, 'sloot']];
    const rij = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4]]; for (const [a, b] of rij) { const A = kn[a], B = kn[b]; const d = Math.hypot(B[0] - A[0], B[1] - A[1]), ux = (B[0] - A[0]) / d, uy = (B[1] - A[1]) / d; pijl(ctx, A[0] + ux * 160, A[1] + uy * 60, B[0] - ux * 160, B[1] - uy * 60, a === 0 && b === 4 ? C.line : E7.fos, 1, a === 0 && b === 4 ? 3 : 5, 18); }
    for (const [x, y, n] of kn) { roundRect(ctx, x - 150, y - 44, 300, 88, 44); shape(ctx, _m7(E7.fos, 0.75, C.bgSchema), E7.fos, 2); text(ctx, n, x, y + 12, fTekst(36, 600), C.text, 'center'); }
    naamBij(ctx, 'langzaam, bij veel mest', null, 400, 560, 1, 'center');
    roundRect(ctx, 1460, 140, 360, 160, 16); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, 'lucht', 1640, 210, fTekst(40, 700), C.text2, 'center'); ctx.strokeStyle = C.koraal; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1490, 280); ctx.lineTo(1790, 160); ctx.stroke(); naamBij(ctx, 'geen gasvorm', null, 1640, 350, 1, 'center'); },

  // ================= H4 Zonder zuurstof =================
  e7s37(ctx) { _sch7(ctx, 'ZONDER ZUURSTOF'); _tafel7(ctx); e7Bak(ctx, 960, 800, { lagen: [[E7.zand, 150]], mest: 22, water: 80, label: 'zandbak', meta: 'ONDER WATER', opvang: 0, kraanOpen: false, ionen: _ionenRegen('nit', 12, 7) });
    _yas(ctx, 560, 900, 430, { pose: 'vasthouden', hold: _gieter7 }); e7Klok(ctx, 1460, 260, 0); naamBij(ctx, 'kraantje dicht', null, 960, 880, 1, 'center'); },
  e7q38(ctx) { const S = SCENE7('e7q38'); _vraag7(ctx, 'Wat gebeurt er met het nitraat in de bak onder water?', _O7(S.opties || ''), (c) => { e7Bak(c, 1720, 740, { w: 180, h: 240, lagen: [[E7.zand, 110]], mest: 16, water: 60, label: 'onder water', opvang: 0, kraanOpen: false, ionen: _ionenRegen('nit', 8, 7) }); }); },
  e7s39(ctx) { _sch7(ctx, 'ZONDER ZUURSTOF'); _tafel7(ctx); e7Bak(ctx, 480, 800, { lagen: [[E7.zand, 150]], mest: 22, water: 80, label: 'na 3 weken', opvang: 0.4 }); e7Klok(ctx, 480, 200, 3); e7Strip(ctx, 740, 760, 'nit', 0.05);
    zoomCircle(ctx, 1360, 470, 300, 500, 560, 'NATTE GROND · VERGROOT', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(1040, 120, 640, 640); for (let i = 0; i < 9; i++) circ(ctx, 1100 + hash(i * 3) * 520, 200 + hash(i * 7) * 480, 40 + hash(i) * 20, '#7A6448', '#A08A6A', 1.5);
      e7Bacterie(ctx, 1320, 470, 170, { rot: 0.2 }); for (let i = 0; i < 3; i++) e7Ion(ctx, 1150 + i * 40, 560 + i * 10, 14, 'nit'); pijl(ctx, 1240, 560, 1290, 510, E7.nit, 1, 3, 10);
      for (let i = 0; i < 4; i++) e7N2(ctx, 1420 + i * 34, 360 - i * 50, 16, { rot: i }); pijl(ctx, 1400, 420, 1440, 360, E7.n2, 1, 3, 10); });
    naamBij(ctx, 'denitrificatie', 'NITRAAT WORDT STIKSTOFGAS', 1360, 90, 1, 'center'); },
  e7s40(ctx) { e7Doorsnede(ctx, { kroos: 0.3, gw: 700 }); ecoTag(ctx, _F7, 'ZONDER ZUURSTOF'); ctx.fillStyle = rgba('#1A2224', 0.45); ctx.fillRect(0, 590, W, 110);
    for (let i = 0; i < 26; i++) { const x = 60 + hash(i * 2.3) * 1800, y = 600 + hash(i * 4.1) * 90; circ(ctx, x, y, 6, rgba(E7.n2, 0.9), _l7(E7.n2, 0.3), 1); }
    for (let i = 0; i < 4; i++) pijl(ctx, 260 + i * 300, 590, 260 + i * 300, 420, E7.n2, 0.8, 3, 12); pijl(ctx, 1490, 610, 1490, 420, E7.n2, 0.8, 3, 12);
    naamBij(ctx, 'stikstofgas', 'UIT DE NATTE LAAG', 1500, 380, 1, 'center'); naamBij(ctx, 'weinig zuurstof', 'NATTE GROND · SLOOTBODEM', 700, 790, 1, 'center'); },
  e7s41(ctx) { _sch7(ctx, 'ZONDER ZUURSTOF'); e7Kringloop(ctx, { zuurstof: true }); },

  // ================= H5 Van wc tot kraan =================
  e7s42(ctx) { _sch7(ctx, 'VAN WC TOT KRAAN'); ctx.fillStyle = '#2E3A52'; ctx.fillRect(120, 220, 560, 600); e7Toilet(ctx, 420, 820, 1.2); _bil(ctx, 230, 820, 400, { pose: 'wijs', outfit: 'school' });
    ctx.strokeStyle = C.line; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(420, 830); ctx.lineTo(420, 900); ctx.lineTo(1500, 900); ctx.lineTo(1500, 820); ctx.stroke();
    ctx.save(); ctx.translate(1200, 640); ctx.scale(0.42, 0.42); e7Rwzi(ctx, 0, 400, { labels: false }); ctx.restore(); naamBij(ctx, 'riool', null, 960, 860, 1, 'center'); naamBij(ctx, 'rioolwaterzuivering', null, 1580, 500, 1, 'center'); },
  e7s43(ctx) { _sch7(ctx, 'VAN WC TOT KRAAN'); e7Rwzi(ctx, 220, 640, { focus: ['rooster', 'bezink', 'lucht'] }); for (let i = 0; i < 3; i++) { e7Ion(ctx, 820 + i * 60, 470, 14, 'amm'); e7Ion(ctx, 960 + i * 60, 520, 14, 'nit'); } pijl(ctx, 870, 500, 940, 520, C.line, 1, 3, 12);
    naamBij(ctx, 'ammonium wordt nitraat', 'NITRIFICATIE', 900, 260, 1, 'center'); },
  e7s44(ctx) { _sch7(ctx, 'VAN WC TOT KRAAN'); e7Rwzi(ctx, 220, 640, { focus: ['anox'] }); for (let i = 0; i < 3; i++) e7Ion(ctx, 1210 + i * 50, 520, 13, 'nit'); for (let i = 0; i < 4; i++) e7N2(ctx, 1230 + i * 40, 300 - i * 30, 15, { rot: i }); pijl(ctx, 1290, 480, 1300, 360, E7.n2, 1, 3, 12);
    naamBij(ctx, 'nitraat wordt stikstofgas', 'DENITRIFICATIE', 1560, 260, 1, 'left'); pijl(ctx, 1240, 560, 1150, 620, E7.fos, 1, 5, 16); naamBij(ctx, 'fosfaat eruit', 'NAAR HET SLIB', 1290, 820, 1, 'center', E7.fos); },
  e7s45(ctx) { ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'VAN WC TOT KRAAN'); vwoMarker(ctx); e7Anammox(ctx, 960, 480, 200);
    for (let i = 0; i < 3; i++) e7Ion(ctx, 420 + i * 60, 400, 20, 'amm'); for (let i = 0; i < 3; i++) e7Ion(ctx, 420 + i * 60, 560, 20, 'n2', { teken: false });
    pijl(ctx, 600, 420, 740, 460, E7.amm, 1, 5, 18); pijl(ctx, 600, 560, 740, 510, C.line, 1, 5, 18);
    for (let i = 0; i < 4; i++) e7N2(ctx, 1320 + i * 70, 460 + (i % 2) * 40, 22, { rot: i }); pijl(ctx, 1180, 480, 1290, 480, E7.n2, 1, 5, 18);
    naamBij(ctx, 'ammonium', null, 480, 340, 1, 'center', E7.amm); naamBij(ctx, 'nitriet', null, 480, 640, 1, 'center'); naamBij(ctx, 'stikstofgas', 'ZONDER ZUURSTOF', 1420, 600, 1, 'center'); naamBij(ctx, 'anammoxbacterie', null, 960, 760, 1, 'center'); },
  e7q46(ctx) { const S = SCENE7('e7q46'); _vraag7(ctx, ['Het gezuiverde water stroomt uit de laatste tank.', 'Gaat het daarna rechtstreeks naar jouw kraan?'], _O7(S.opties || ''), (c) => { e7Kraan(c, 1700, 600, 1.1); }); },
  e7s47(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'VAN WC TOT KRAAN');
    vul(ctx, [[-40, 520], [500, 500], [1000, 530], [1500, 510], [1960, 520], [1960, H], [-40, H]], C.bgMacroHill);
    lijn(ctx, [[-40, 720], [300, 690], [700, 740], [1100, 700], [1500, 740], [1960, 710]], C.water, 80);
    ctx.save(); ctx.translate(40, 520); ctx.scale(0.24, 0.24); e7Rwzi(ctx, 0, 300, { labels: false }); ctx.restore(); naamBij(ctx, 'zuivering', null, 210, 640, 1, 'center');
    pijl(ctx, 300, 640, 360, 690, C.line, 1, 3, 12); naamBij(ctx, 'de Maas', null, 760, 820, 1, 'center');
    for (let i = 0; i < 2; i++) { roundRect(ctx, 1080 + i * 230, 420, 200, 90, 30); shape(ctx, _m7(C.water, 0.3, C.bgMacroSky), C.teal, 2); } naamBij(ctx, 'bekkens', 'BIESBOSCH', 1290, 400, 1, 'center');
    pijl(ctx, 1060, 690, 1110, 520, C.teal, 1, 4, 14); naamBij(ctx, 'inname', null, 1010, 620, 1, 'right');
    ctx.fillStyle = '#5E6A80'; ctx.fillRect(1600, 380, 180, 120); naamBij(ctx, 'drinkwaterbedrijf', null, 1690, 360, 1, 'center'); pijl(ctx, 1540, 460, 1590, 460, C.teal, 1, 4, 14);
    e7Kraan(ctx, 1640, 680, 0.8); e7Glas(ctx, 1760, 700, 110, 0.6); metaText(ctx, 'SCHEMATISCH · NIET OP SCHAAL', 80, 880, C.text2, 'left', 26);
    card(ctx, 160, 160, 620, 150, '± 60 % grondwater', 'de rest vooral uit rivieren'); },
  e7s48(ctx) { _sch7(ctx, 'VAN WC TOT KRAAN'); e7Glas(ctx, 640, 760, 380, 0.75); e7Strip(ctx, 900, 760, 'nit', 0.2, { h: 320 });
    const lx = 1200, ly0 = 780, lh = 520; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx, ly0); ctx.lineTo(lx, ly0 - lh); ctx.stroke();
    for (let v = 0; v <= 100; v += 25) { const y = ly0 - v / 100 * lh; ctx.beginPath(); ctx.moveTo(lx - 10, y); ctx.lineTo(lx, y); ctx.stroke(); metaText(ctx, String(v), lx - 20, y + 9, C.text2, 'right', 26); }
    ctx.strokeStyle = C.koraal; ctx.lineWidth = 4; const yg = ly0 - 0.5 * lh; ctx.beginPath(); ctx.moveTo(lx, yg); ctx.lineTo(lx + 520, yg); ctx.stroke(); naamBij(ctx, 'grens 50 mg per liter', 'GRONDWATER', lx + 30, yg - 58, 1, 'left', C.koraal);
    metaText(ctx, 'NITRAAT IN MG PER LITER', lx, ly0 - lh - 24, C.text2, 'left', 26); },

  // ================= Samenvatting =================
  e7s49(ctx) { _sch7(ctx, 'SAMENVATTING'); e7Kringloop(ctx, { dy: 20 });
    },
  e7s50(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F7, 'SAMENVATTING');
    const z = ['Bacteriën binden stikstofgas; planten maken er eiwit van.', 'Nitraat en fosfaat spoelen uit naar de sloot; ammonium blijft hangen.', 'Met zuurstof wordt het nitraat, zonder zuurstof weer stikstofgas.'];
    z.forEach((s, i) => text(ctx, s, 180, 330 + i * 120, fTekst(48, 600), C.text, 'left')); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(150, 280); ctx.lineTo(130, 280); ctx.lineTo(130, 590); ctx.lineTo(150, 590); ctx.stroke();
    text(ctx, 'Stoffen gaan rond. Energie stroomt erdoorheen.', 180, 760, fTekst(48, 700), C.groen, 'left'); },
};
// ---- scènegegevens uit films/f7.json (opties van de vraagkaarten); bijgewerkt door maak_f7.py ----
const SB7_DATA = /*DATA*/{"e7q07": {"opties": "A Ja, via de huidmondjes, en het maakt er eiwit van · B Nee, het gebruikt alleen stikstof uit de bodem, als ammonium of nitraat · C Ja, maar alleen als het regent", "juist": "B"}, "e7q10": {"opties": "A De bak met gras · B Geen van beide: zonder mest is er geen stikstof · C De bak met klaver", "juist": "C"}, "e7q23": {"opties": "A Veel ammonium en bijna geen nitraat · B Veel nitraat en bijna geen ammonium · C Niets: zonder lucht breekt niemand de mest af", "juist": "A"}, "e7q28": {"opties": "A Alleen de ammoniumstrip · B Allebei even sterk · C Alleen de nitraatstrip", "juist": "C"}, "e7q34": {"opties": "A Niets: de oogst haalt alles weg · B Tachtig kilo · C Tweehonderdtwintig kilo", "juist": "B"}, "e7q38": {"opties": "A Het wordt stikstofgas en verdwijnt naar de lucht · B Het blijft gewoon in de bak zitten · C Het wordt weer ammonium", "juist": "A"}, "e7q46": {"opties": "A Ja, het wordt teruggepompt naar de waterleiding · B Ja, na een extra filter in dezelfde zuivering · C Nee, het stroomt een sloot of rivier in", "juist": "C"}};
