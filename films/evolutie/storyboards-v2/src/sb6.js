// Evolutie v2 · film 6 Hoe één soort er twee wordt — keyframes storyboard
const _F6 = 6;
function _s6(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); }
function _erf(ctx) { macroNacht(ctx, { horizon: 560 }); ctx.strokeStyle = '#8C7A5E'; ctx.lineWidth = 6; for (let i = 0; i < 9; i++) { const x = 60 + i * 230; ctx.beginPath(); ctx.moveTo(x, 640); ctx.lineTo(x, 760); ctx.stroke(); } ctx.lineWidth = 5; for (const yy of [670, 720]) { ctx.beginPath(); ctx.moveTo(40, yy); ctx.lineTo(1900, yy); ctx.stroke(); } }
function _paarChromosomen(ctx, x, y, set) { // set: [[l1, l2|null], ...]; l2 null = geen partner
  set.forEach(([l1, l2, past], i) => { const xx = x + i * 150; chromosoom(ctx, xx, y, l1, '#A392D6'); if (l2) chromosoom(ctx, xx + 26 + (past ? 0 : 12), y + (past ? 0 : 18), l2, '#5A4A8A');
    if (!past) { ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(xx + 20, y + 8, 56, 92, 0, 0, 6.283); ctx.stroke(); } }); }
function _tegel(ctx, x, y, w, h, titel, sub, teken, a = 1) { ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); text(ctx, titel, x + w / 2, y + h - 64, fTekst(38, 700), C.text, 'center'); if (sub) metaText(ctx, sub, x + w / 2, y + h - 26, C.grain, 'center', 24); if (teken) teken(x + w / 2, y + (h - 90) / 2); ctx.restore(); }
function _water(ctx, top = 0) { ctx.fillStyle = '#1B3550'; ctx.fillRect(0, top, W, H - top); }

const SB6 = {
  e6s01(ctx) { _erf(ctx); evoTag(ctx, _F6, 'OPENING');
    paard(ctx, 300, 640, 1.6, { a: 0.55, houding: 'grazen' }); ezel(ctx, 1650, 640, 1.6, { a: 0.55, kijk: -1, houding: 'grazen' }); // grazen in de wei
    muilezel(ctx, 900, 900, 2.9); ctx.save(); ctx.translate(2 * 1440, 0); ctx.scale(-1, 1); persoon(ctx, 'gerrit', 1440, 900, 520, { pose: 'wijs' }); ctx.restore(); // gespiegeld: zijn hand ligt op de hals van de muilezel
    naamBij(ctx, 'muilezel', 'krijgt nooit jongen', 860, 300, 1, 'center'); naamBij(ctx, 'Veehouder Gerrit', null, 1440, 330, 1, 'center'); evoSchaal(ctx, 'Gerrit 1,80 m · muilezel 1,30 m schofthoogte'); },
  e6s02(ctx) { titelKaart(ctx, _F6, 'Hoe één soort er twee wordt', 'Is een muilezel een soort?', (c) => { const g = 900, s = 2.3; paard(c, 980, g, s); muilezel(c, 1400, g, s); ezel(c, 1760, g, s);
    naamBij(c, 'paard', null, 980, 470, 1, 'center'); naamBij(c, 'muilezel', null, 1400, 540, 1, 'center'); naamBij(c, 'ezel', null, 1760, 580, 1, 'center'); }); },
  e6s03(ctx) { macroNacht(ctx, { horizon: 560 }); evoTag(ctx, _F6, 'WAT IS EEN SOORT?');
    wolf(ctx, 560, 820, 5.4); hond(ctx, 'chihuahua', 1300, 820, 5.4, { kijk: -1 });
    naamBij(ctx, 'wolf', null, 560, 230, 1, 'center'); naamBij(ctx, 'chihuahua', null, 1300, 640, 1, 'center');
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(960, 700); ctx.lineTo(1180, 700); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'samen vruchtbare jongen', 'één soort: Canis lupus', 1300, 380, 1, 'center', C.groen); evoSchaal(ctx, 'op schaal'); },
  e6s04(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WAT IS EEN SOORT?');
    text(ctx, 'soort', 160, 300, fTitel(80), C.text, 'left'); ctx.font = fTekst(52, 500); ctx.fillStyle = C.text; wrap(ctx, 'een groep individuen die in de natuur samen vruchtbare nakomelingen kunnen krijgen', 160, 400, 1600, 64);
    ctx.font = fTekst(52, 500); const x0 = 160 + ctx.measureText('een groep individuen die in de natuur samen ').width, x1 = x0 + ctx.measureText('vruchtbare').width; ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, 414); ctx.lineTo(x1, 414); ctx.stroke();
    text(ctx, 'hond en wolf: één soort · hondenras ≈ ondersoort in de natuur', 160, 640, fTekst(40, 600), C.groen, 'left'); },
  e6q05(ctx) { vraagKaart(ctx, ['Een paard en een ezel krijgen samen een muilezel. Die is gezond,', 'maar onvruchtbaar. Zijn paard en ezel één soort?'], ["Ja, want ze krijgen samen een jong", "Nee, want hun jong kan zelf geen jongen krijgen", "Ja, want ze lijken veel op elkaar"], _F6); },
  e6s06(ctx) { macroNacht(ctx, { horizon: 560 }); evoTag(ctx, _F6, 'WAT IS EEN SOORT?');
    const s = 2.3; paard(ctx, 330, 700, s); ezel(ctx, 1600, 700, s, { kijk: -1 }); muilezel(ctx, 960, 760, s);
    naamBij(ctx, 'paard', 'soort 1', 330, 270, 1, 'center'); naamBij(ctx, 'ezel', 'soort 2', 1600, 400, 1, 'center'); naamBij(ctx, 'hybride', null, 960, 330, 1, 'center', C.goud);
    pijl(ctx, 960, 790, 960, 860, C.line, 1, 4); ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(925, 840); ctx.lineTo(995, 890); ctx.moveTo(995, 840); ctx.lineTo(925, 890); ctx.stroke(); },
  e6s07(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WAT IS EEN SOORT?');
    text(ctx, 'paard 64', 160, 200, fTekst(44, 700), '#A392D6', 'left'); text(ctx, '+', 470, 200, fTekst(44, 700), C.text2, 'left'); text(ctx, 'ezel 62', 520, 200, fTekst(44, 700), '#8C7BBF', 'left'); text(ctx, '→ muilezel 63', 820, 200, fTekst(44, 700), C.text, 'left');
    metaText(ctx, 'meiose: chromosomen zoeken hun partner', 160, 300, C.grain, 'left', 26);
    _paarChromosomen(ctx, 200, 560, [[150, 150, true], [130, 128, true], [120, 100, false], [100, 95, true], [90, 70, false], [80, 80, true], [70, null, false]]);
    naamBij(ctx, 'paart niet', null, 200 + 2 * 150 + 20, 715, 1, 'center', C.koraal); naamBij(ctx, 'geen partner', null, 200 + 6 * 150 + 10, 715, 1, 'center', C.koraal);
    haak(ctx, 160, 1180, 770, 'bijna geen werkende geslachtscellen', C.koraal); metaText(ctx, 'licht: paard · donker: ezel', 1240, 420, C.grain, 'left', 24); metaText(ctx, 'schematisch · 7 van de 63', 1240, 470, C.text2, 'left', 24); },
  e6s08(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WAT IS EEN SOORT?');
    for (let r = 0; r < 3; r++) { const y = 330 + r * 190; paard(ctx, 230, y, 0.75); text(ctx, '×', 420, y - 50, fTekst(48, 700), C.text2, 'center'); ezel(ctx, 570, y, 0.75); pijl(ctx, 700, y - 60, 820, y - 60, C.line, 1, 3); muilezel(ctx, 950, y, 0.75); }
    pijl(ctx, 1080, 520, 1260, 520, C.line, 1, 4); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(1300, 470); ctx.lineTo(1400, 570); ctx.moveTo(1400, 470); ctx.lineTo(1300, 570); ctx.stroke(); // rood kruis
    naamBij(ctx, 'geen soort', 'elke muilezel: opnieuw paard × ezel', 1450, 680, 1, 'center', C.koraal); },
  e6s09(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    const st = []; for (let i = 0; i < 18; i++) st.push([0.12 + hash(i) * 0.76, 0.15 + hash(i + 50) * 0.7, hash(i + 9) < 0.55 ? EVO.a1 : EVO.a2]);
    kaartBarriere(ctx, 160, 200, 900, 560, { rivier: 0, stippen: st }); naamBij(ctx, 'één populatie', null, 610, 850, 1, 'center');
    pot(ctx, 1460, 720, 1.4, { p: 0.55, n: 90, seed: 5, label: 'één genenpool' }); allelBalk(ctx, 1280, 160, 360, 0.55, { procent: false }); metaText(ctx, 'genenstroom: allelen gaan heen en weer', 1460, 250, C.grain, 'center', 24); },
  e6s10(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    const st = []; for (let i = 0; i < 18; i++) { const L = i < 9; st.push([L ? 0.1 + hash(i) * 0.3 : 0.6 + hash(i) * 0.3, 0.15 + hash(i + 50) * 0.7, hash(i + 9) < 0.55 ? EVO.a1 : EVO.a2]); }
    kaartBarriere(ctx, 510, 200, 900, 560, { rivier: 1, stippen: st }); naamBij(ctx, 'barrière', 'rivier', 1010, 160, 1, 'center', C.water === '#2E6FBF' ? '#9CCBE3' : C.text);
    naamBij(ctx, 'geografische isolatie', null, 960, 850, 1, 'center'); },
  e6s11(ctx) { macroNacht(ctx, { horizon: 440 }); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.moveTo(880, 440); ctx.quadraticCurveTo(960, 650, 840, H); ctx.lineTo(1080, H); ctx.quadraticCurveTo(1180, 650, 1000, 440); ctx.closePath(); ctx.fill();
    muis(ctx, 660, 760, 14, { houding: 'rechtop' }); // kijkt naar de overkant naamBij(ctx, 'muis', 'kan niet over', 640, 640, 1, 'center');
    zwaluw(ctx, 960, 300, 12); naamBij(ctx, 'vogel', 'vliegt eroverheen', 960, 180, 1, 'center');
    ctx.fillStyle = '#4A4A4A'; ctx.fillRect(1240, 820, 680, 70); ctx.fillStyle = '#E6E0D4'; for (let i = 0; i < 6; i++) ctx.fillRect(1270 + i * 110, 850, 60, 8);
    slak(ctx, 1500, 818, 20); naamBij(ctx, 'slak', 'weg is al een barrière', 1520, 660, 1, 'center'); },
  e6q12(ctx) { vraagKaart(ctx, ['De rivier blijft duizenden generaties liggen.', 'Wat gebeurt er met de twee genenpools?'], ["Ze blijven gelijk, want ze komen uit dezelfde pot", "Ze passen zich samen aan, want het is één soort", "Ze gaan steeds meer van elkaar verschillen"], _F6); },
  e6s13(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    pot(ctx, 520, 680, 1.35, { p: 0.72, n: 85, seed: 3, extra: [[EVO.kracht.mutatie, 2]], label: 'links' }); pot(ctx, 1400, 680, 1.35, { p: 0.3, n: 85, seed: 8, extra: [[EVO.kracht.mutatie, 2]], label: 'rechts' });
    ctx.strokeStyle = C.water; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(960, 200); ctx.quadraticCurveTo(990, 500, 950, 820); ctx.stroke();
    const k = [['eigen mutaties', EVO.kracht.mutatie], ['eigen selectie', EVO.kracht.selectie], ['eigen toeval', EVO.kracht.drift]];
    k.forEach(([t, c], i) => { naamBij(ctx, t, null, 960, 200 + i * 60 - 60 + 0, 0, 'center'); }); 
    metaText(ctx, 'geen genenstroom meer', 960, 170, C.grain, 'center', 26);
    text(ctx, 'eigen mutaties · eigen selectie · eigen toeval', 960, 880 - 20, fTekst(38, 600), C.text, 'center'); },
  e6s14(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    const rij = [[0.55, 0.55, 'generatie 0'], [0.68, 0.4, 'generatie 500'], [0.85, 0.18, 'generatie 5000']];
    rij.forEach(([p1, p2, g], i) => { const y = 260 + i * 200; metaText(ctx, g, 160, y + 28, C.text2, 'left', 26); allelBalk(ctx, 560, y, 520, p1, { procent: false }); allelBalk(ctx, 1220, y, 520, p2, { procent: false }); });
    text(ctx, 'links', 820, 200, fTekst(40, 600), C.text, 'center'); text(ctx, 'rechts', 1480, 200, fTekst(40, 600), C.text, 'center');
    haak(ctx, 560, 1740, 720, 'divergente evolutie', C.groen); },
  e6s15(ctx) { macroNacht(ctx, { horizon: 600 }); evoTag(ctx, _F6, 'ÉÉN POT WORDT TWEE');
    for (let i = 0; i < 9; i++) { const x = 40 + i * 70; vul(ctx, [[x, 640], [x + 40, 420 + (i % 3) * 30], [x + 80, 640]], '#2E4A38'); }
    wolf(ctx, 520, 870, 3.0); persoon(ctx, 'gerrit', 1680, 880, 530, { kijk: -1 }); hond(ctx, 'herder', 1330, 870, 3.0, { kijk: -1, houding: 'zitten' }); // zit op het erf
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(760, 660); ctx.lineTo(1160, 660); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, 'nog genenstroom', 'nog één soort', 960, 420, 1, 'center', C.groen); metaText(ctx, 'al minstens 15 000 jaar elk een eigen weg', 960, 250, C.text2, 'center', 26); },
  e6s16(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WANNEER IS HET TWEE?');
    const st = []; for (let i = 0; i < 22; i++) st.push([0.12 + hash(i * 3) * 0.76, 0.15 + hash(i * 3 + 1) * 0.7, i % 2 ? EVO.a1 : EVO.a2]);
    kaartBarriere(ctx, 510, 200, 900, 560, { rivier: 0.08, stippen: st }); naamBij(ctx, 'samen, maar paren ze nog?', null, 960, 850, 1, 'center'); },
  e6s17(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WANNEER IS HET TWEE?'); text(ctx, 'vóór de bevruchting', 140, 200, fTekst(48, 700), C.text, 'left');
    const w = 390, y = 260, h = 470;
    _tegel(ctx, 140, y, w, h, 'tijd', 'ander moment', (cx, cy) => { circ(ctx, cx, cy, 90, rgba(C.fill, 0.8), C.line, 3); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - 66); ctx.moveTo(cx, cy); ctx.lineTo(cx + 46, cy + 10); ctx.stroke(); });
    _tegel(ctx, 560, y, w, h, 'plek', 'andere plek', (cx, cy) => { ctx.fillStyle = C.water; ctx.beginPath(); ctx.ellipse(cx + 50, cy + 50, 90, 34, 0, 0, 6.283); ctx.fill(); vul(ctx, [[cx - 120, cy + 60], [cx - 80, cy - 100], [cx - 40, cy + 60]], '#5FA86E'); });
    _tegel(ctx, 980, y, w, h, 'gedrag', 'ander lied of balts', (cx, cy) => { ctx.fillStyle = C.text; ctx.beginPath(); ctx.ellipse(cx - 30, cy + 50, 30, 22, -0.4, 0, 6.283); ctx.fill(); ctx.fillRect(cx - 4, cy - 90, 8, 140); ctx.beginPath(); ctx.moveTo(cx + 4, cy - 90); ctx.quadraticCurveTo(cx + 60, cy - 60, cx + 50, cy - 10); ctx.lineWidth = 8; ctx.strokeStyle = C.text; ctx.stroke(); });
    _tegel(ctx, 1400, y, w, h, 'bouw', 'past niet op elkaar', (cx, cy) => { roundRect(ctx, cx - 80, cy - 50, 90, 110, 16); shape(ctx, rgba(C.goud, 0.2), C.goud, 4); circ(ctx, cx - 35, cy, 14, C.bgSchema); ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx + 30, cy); ctx.lineTo(cx + 110, cy); ctx.moveTo(cx + 90, cy); ctx.lineTo(cx + 90, cy + 26); ctx.stroke(); circ(ctx, cx + 30, cy, 22, null, C.line, 8); }); },
  e6s18(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WANNEER IS HET TWEE?'); text(ctx, 'ná de bevruchting', 140, 200, fTekst(48, 700), C.text, 'left');
    _tegel(ctx, 140, 260, 1640, 520, 'het jong sterft jong of is onvruchtbaar', 'zoals de muilezel', (cx, cy) => { muilezel(ctx, cx - 120, cy + 170, 1.55); pijl(ctx, cx + 180, cy, cx + 400, cy, C.line, 1, 5); ctx.strokeStyle = C.koraal; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx + 430, cy - 40); ctx.lineTo(cx + 510, cy + 40); ctx.moveTo(cx + 510, cy - 40); ctx.lineTo(cx + 430, cy + 40); ctx.stroke(); }); },
  e6q19(ctx) { vraagKaart(ctx, ['Twee kikkersoorten leven in dezelfde vijver.', 'De ene paart in april, de andere in juni. Wat voor isolatie is dit?'], ['Isolatie vóór de bevruchting', 'Geografische isolatie', 'Isolatie ná de bevruchting'], _F6); },
  e6s20(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WANNEER IS HET TWEE?');
    const M = ['maart', 'april', 'mei', 'juni', 'juli']; const x0 = 260, mw = 280;
    M.forEach((m, i) => { roundRect(ctx, x0 + i * mw, 600, mw - 10, 80, 10); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, m, x0 + i * mw + (mw - 10) / 2, 652, fTekst(36, 600), C.text, 'center'); });
    roundRect(ctx, x0 + mw, 600, mw - 10, 80, 10); ctx.strokeStyle = EVO.a1; ctx.lineWidth = 5; ctx.stroke(); roundRect(ctx, x0 + 3 * mw, 600, mw - 10, 80, 10); ctx.strokeStyle = EVO.a2; ctx.stroke();
    kikker(ctx, x0 + mw + 135, 560, 22, { kleur: '#7E8A4E' }); kikker(ctx, x0 + 3 * mw + 135, 560, 22, { kleur: '#8C6A3E' });
    naamBij(ctx, 'soort 1 paart', null, x0 + mw + 135, 760, 1, 'center', EVO.a1R); naamBij(ctx, 'soort 2 paart', null, x0 + 3 * mw + 135, 760, 1, 'center', EVO.a2R);
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.ellipse(960, 300, 520, 90, 0, 0, 6.283); ctx.fill(); naamBij(ctx, 'dezelfde vijver', null, 960, 210, 1, 'center'); },
  e6s21(ctx) { _s6(ctx); evoTag(ctx, _F6, 'WANNEER IS HET TWEE?');
    const st = [['barrière', 'genenstroom stopt'], ['verschillen', 'mutatie, selectie, toeval'], ['reproductieve isolatie', 'twee soorten']];
    st.forEach(([t, m], i) => { const x = 200 + i * 560; roundRect(ctx, x, 230, 480, 120, 16); shape(ctx, rgba(C.fill, 0.7), i === 2 ? C.groen : C.line, 2); text(ctx, t, x + 240, 285, fTekst(40, 700), C.text, 'center'); metaText(ctx, m, x + 240, 325, C.grain, 'center', 24); if (i < 2) pijl(ctx, x + 490, 290, x + 550, 290, C.line, 1, 4); });
    pot(ctx, 440, 760, 0.9, { p: 0.55, n: 60, seed: 2 }); pot(ctx, 920, 760, 0.75, { p: 0.75, n: 45, seed: 3 }); pot(ctx, 1120, 760, 0.75, { p: 0.35, n: 45, seed: 4 });
    pot(ctx, 1500, 760, 0.75, { p: 0.92, n: 45, seed: 5 }); pot(ctx, 1700, 760, 0.75, { p: 0.1, n: 45, seed: 6 }); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1600, 520); ctx.lineTo(1600, 780); ctx.stroke();
    evoSchaal(ctx, 'meestal tienduizenden generaties of meer'); },
  e6s22(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ZONDER BARRIÈRE'); vwoMarker(ctx);
    kaartBarriere(ctx, 140, 260, 760, 480, { rivier: 1, stippen: [[0.25, 0.4, EVO.a1], [0.3, 0.62, EVO.a1], [0.2, 0.55, EVO.a1], [0.72, 0.38, EVO.a2], [0.78, 0.6, EVO.a2], [0.68, 0.52, EVO.a2]] });
    naamBij(ctx, 'allopatrisch', 'gescheiden plaatsen', 520, 840, 1, 'center');
    vul(ctx, [[1080, 420], [1300, 290], [1600, 300], [1800, 450], [1760, 680], [1480, 760], [1180, 700]], '#2E5A8A', '#5BA4C9', 2.5);
    for (let i = 0; i < 10; i++) populatieStip(ctx, 1200 + hash(i * 7) * 520, 380 + hash(i * 7 + 2) * 300, 11, i % 2 ? EVO.a1 : EVO.a2);
    naamBij(ctx, 'sympatrisch', 'dezelfde plaats', 1460, 840, 1, 'center'); },
  e6s23(ctx) { macroNacht(ctx, { horizon: 480, heuvel: false }); evoTag(ctx, _F6, 'ZONDER BARRIÈRE'); vwoMarker(ctx);
    ctx.fillStyle = '#1F4466'; ctx.fillRect(0, 480, W, CAPTION_Y - 480); vul(ctx, [[-40, 480], [300, 440], [700, 470], [1100, 430], [1500, 460], [1960, 440], [1960, 490], [-40, 490]], '#2F4A3A');
    const v = ['blauw', 'rood', 'vrouw', 'blauw', 'rood', 'blauw', 'vrouw', 'rood', 'blauw', 'rood'];
    v.forEach((k, i) => cichlide(ctx, 200 + i * 170 + (i % 2) * 40, 600 + (i % 3) * 90, 1.1, { vorm: k, kijk: i % 2 ? -1 : 1, t: i * 0.13 }));
    naamBij(ctx, 'Victoriameer', '±500 soorten cichliden · in ±15 000 jaar', 960, 360, 1, 'center'); },
  e6s24(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ZONDER BARRIÈRE'); vwoMarker(ctx);
    ctx.fillStyle = '#2C5A86'; ctx.fillRect(0, 160, W, 300); ctx.fillStyle = '#5A3A4A'; ctx.fillRect(0, 460, W, 380);
    cichlide(ctx, 720, 320, 3.2, { vorm: 'blauw', t: 0.1 }); cichlide(ctx, 1200, 640, 3.2, { vorm: 'rood', t: 0.35 });
    naamBij(ctx, 'Pundamilia pundamilia', 'ondiep · blauw licht', 1060, 260, 1, 'left'); naamBij(ctx, 'Pundamilia nyererei', 'dieper · vooral rood licht', 840, 580, 1, 'right');
    metaText(ctx, 'ondiep', 1820, 200, C.text2, 'right', 26); metaText(ctx, 'dieper', 1820, 820, C.text2, 'right', 26); },
  e6q25(ctx) { vwoMarker(ctx); vraagKaart(ctx, ['Er is geen muur in het water. Hoe kunnen de blauwe', 'en de rode vissen toch apart blijven?'], ['Er moet een barrière zijn die we niet zien', 'Vrouwtjes kiezen een mannetje met de kleur die zij het best zien', 'Het zijn geen echte soorten, maar kleurvarianten'], _F6); vwoMarker(ctx); },
  e6s26(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ZONDER BARRIÈRE'); vwoMarker(ctx);
    ctx.fillStyle = '#2C5A86'; ctx.fillRect(0, 160, W, 300); ctx.fillStyle = '#5A3A4A'; ctx.fillRect(0, 460, W, 380);
    cichlide(ctx, 520, 360, 2.4, { vorm: 'blauw', a: 0.45, t: 0.2 }); cichlide(ctx, 1400, 640, 2.6, { vorm: 'rood', t: 0.05 }); cichlide(ctx, 1000, 580, 2.6, { vorm: 'vrouw', t: 0.3 }); // vrouwtje zwemt langs en kiest het rode
    pijl(ctx, 1180, 600, 1260, 620, C.goud, 1, 4); naamBij(ctx, 'vrouwtje kiest rood', 'haar ogen zien rood het best', 1000, 760, 1, 'center', C.goud); naamBij(ctx, 'partnerkeuze stopt de genenstroom', null, 960, 230, 1, 'center'); },
  e6s27(ctx) { _s6(ctx); evoTag(ctx, _F6, 'ZONDER BARRIÈRE'); vwoMarker(ctx);
    pot(ctx, 600, 700, 1.3, { p: 0.85, n: 80, seed: 2 }); pot(ctx, 1320, 700, 1.3, { p: 0.15, n: 80, seed: 7 });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(960, 300); ctx.lineTo(960, 720); ctx.stroke();
    text(ctx, 'rivier of berg', 600, 260, fTekst(40, 600), C.text, 'center'); metaText(ctx, 'allopatrisch', 600, 300, C.grain, 'center', 24);
    text(ctx, 'partnerkeuze', 1320, 260, fTekst(40, 600), C.text, 'center'); metaText(ctx, 'sympatrisch', 1320, 300, C.grain, 'center', 24);
    haak(ctx, 400, 1520, 790, 'in beide gevallen stopt de genenstroom', C.groen); },
  e6s28(ctx) { _s6(ctx); evoTag(ctx, _F6, 'SAMENVATTING');
    _tegel(ctx, 120, 200, 540, 600, 'soort', 'samen vruchtbare jongen', (cx, cy) => { wolf(ctx, cx - 90, cy + 90, 2.2); hond(ctx, 'teckel', cx + 150, cy + 90, 2.2, { kijk: -1 }); });
    _tegel(ctx, 690, 200, 540, 600, 'hybride', 'muilezel: onvruchtbaar', (cx, cy) => { muilezel(ctx, cx, cy + 130, 1.3); });
    _tegel(ctx, 1260, 200, 540, 600, 'één pot wordt twee', 'genenstroom stopt', (cx, cy) => { pot(ctx, cx - 110, cy + 110, 0.65, { p: 0.8, n: 40, seed: 2 }); pot(ctx, cx + 110, cy + 110, 0.65, { p: 0.2, n: 40, seed: 3 }); });
    haak(ctx, 120, 1800, 820, 'een muilezel is geen soort, maar een hybride', C.groen); },
  e6s29(ctx) { _s6(ctx); metaText(ctx, 'EVOLUTIE 6/8 · HOE ÉÉN SOORT ER TWEE WORDT', 140, 160, C.text2, 'left', 26);
    const Z = ['Een soort is een groep die in de natuur samen vruchtbare nakomelingen kan krijgen; de muilezel is een onvruchtbare hybride.', 'Een barrière stopt de genenstroom: twee genenpools lopen uit elkaar door eigen mutaties, selectie en toeval.', 'Reproductieve isolatie, vóór of ná de bevruchting, maakt er twee soorten van.'];
    Z.forEach((z, i) => { text(ctx, (i + 1) + '', 160, 320 + i * 150, fTekst(56, 800), C.goud, 'left'); ctx.font = fTekst(42, 500); ctx.fillStyle = C.text; wrap(ctx, z, 230, 320 + i * 150, 1500, 50); });
    haak(ctx, 140, 1700, 740, 'volgende film: hoe weten we dat?', C.groen); },
};
