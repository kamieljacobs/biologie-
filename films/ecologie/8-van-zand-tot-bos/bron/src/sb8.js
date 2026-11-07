// sb8.js — Ecologie v2, film 8 'Van zand tot bos' — storyboard: één keyframe per scène (29 okt 2026). Laadt na teken_eco8.js.
const _F8 = 8;
function _sch8(ctx, hfst) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F8, hfst); }
const _O8 = (s) => (s || '').split(' · ').map(x => x.replace(/^[A-D] /, ''));
function SCENE8(id) { return (typeof SB8_DATA !== 'undefined' && SB8_DATA[id]) || {}; }
const _map8 = (c, x, y) => { c.save(); c.fillStyle = '#C8B48A'; roundRect(c, x - 34, y - 6, 68, 84, 6); c.fill(); c.fillStyle = '#E8E2D2'; c.fillRect(x - 26, y + 4, 52, 62); c.restore(); };
const B8 = { // inhoud van de bladen
  1: { blad: 1, stadium: 0, humus: 0, soorten: [], meters: { hitte: 0.95, vocht: 0.1, licht: 1, stuiven: 0.9 } },
  3: { blad: 3, stadium: 3, humus: 22, soorten: [['korstmos', 30], ['buntgras', 25], ['struikheide', 20], ['grove den', 5]], meters: { hitte: 0.6, vocht: 0.35, licht: 0.85, stuiven: 0.3 } },
  4: { blad: 4, stadium: 4, humus: 40, soorten: [['korstmos', 5], ['struikheide', 60], ['grove den', 25]], meters: { hitte: 0.45, vocht: 0.5, licht: 0.4, stuiven: 0.05 } },
  6: { blad: 6, stadium: 6, humus: 110, soorten: [['zomereik', 60], ['beuk', 10], ['grove den', 10], ['bosbes', 30]], meters: { hitte: 0.25, vocht: 0.75, licht: 0.1, stuiven: 0 } },
};
const SB8 = {
  // ===== Opening =====
  e8s01(ctx) { e8Zandvlakte(ctx, {}); ecoTag(ctx, _F8, 'OPENING'); naamBij(ctx, 'stuifzand', 'KOOTWIJKERZAND · VELUWE', 960, 200, 1, 'center');
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(1750, 400, 200, 150, 0, 0, 6.283); ctx.stroke(); naamBij(ctx, 'bomen rukken op', null, 1700, 640, 1, 'center'); },
  e8s02(ctx) { e8Zandvlakte(ctx, {}); ecoTag(ctx, _F8, 'OPENING'); e8Paaltje(ctx, 960, 780, '23', 1.6); _bas8(ctx, 1240, 820, 360, { pose: 'wijs', kijk: -1 }); _daan8(ctx, 700, 820, 360, { pose: 'vasthouden', hold: (c, x, y) => _map8(c, x, y) });
    text(ctx, 'Hoe wordt kaal zand', W / 2, 230, fTekst(56, 700), C.text, 'center'); text(ctx, 'vanzelf een bos?', W / 2, 300, fTekst(56, 700), C.text, 'center'); },
  e8s03(ctx) { ecoTitelKaart(ctx, _F8, 'Van zand tot bos', ['Hoe wordt kaal zand', 'vanzelf een bos?'], (c) => { c.save(); c.translate(980, 160); c.scale(0.62, 0.62); e8Dossier(c, 0, 0, B8[1]); e8Dossier(c, 820, 0, B8[6]); c.restore(); }); },
  // ===== H1 =====
  e8s04(ctx) { e8Zandvlakte(ctx, { rand: false }); ecoTag(ctx, _F8, 'DE EERSTE BEWONERS'); e8Vierkant(ctx, 960, 820, 760, 0, {}); _bas8(ctx, 360, 860, 360, { pose: 'wijs' }); _daan8(ctx, 1560, 860, 360, { kijk: -1, pose: 'vasthouden', hold: (c, x, y) => _map8(c, x, y) });
    naamBij(ctx, '4 bij 4 meter', 'MEETVIERKANT · VOORBEELD', 960, 560, 1, 'center'); },
  e8s05(ctx) { _sch8(ctx, 'DE EERSTE BEWONERS'); e8Dossier(ctx, 160, 150, B8[1]); naamBij(ctx, 'meer dan 45 °C', 'AAN HET OPPERVLAK', 1100, 300, 1, 'left', C.koraal); naamBij(ctx, 'geen humus', 'HOUDT GEEN WATER VAST', 1100, 520, 1, 'left'); naamBij(ctx, 'het zand stuift', null, 1100, 740, 1, 'left'); },
  e8q06(ctx) { const S = SCENE8('e8q06'); ecoVraagKaart(ctx, 'Waarom staan er op blad één geen eiken?', _O8(S.opties), _F8); ctx.save(); ctx.translate(1520, 280); ctx.scale(0.45, 0.45); e8Dossier(ctx, 0, 0, B8[1]); ctx.restore(); },
  e8s07(ctx) { _sch8(ctx, 'DE EERSTE BEWONERS'); ctx.fillStyle = E8.zand; ctx.fillRect(0, 640, W, 200); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 640); ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 840, W, 240); ecoTag(ctx, _F8, 'DE EERSTE BEWONERS');
    e8Buntgras(ctx, 360, 640, 11, {}); ctx.fillStyle = rgba(C.groen, 0.35); ctx.fillRect(560, 632, 220, 8); e8Mos(ctx, 1100, 640, 220, 2.5); e8Korstmos(ctx, 1560, 640, 6);
    naamBij(ctx, 'buntgras', 'EERST', 360, 720, 1, 'center'); naamBij(ctx, 'algen', 'EERST', 670, 720, 1, 'center'); naamBij(ctx, 'mos', 'DAARNA', 1100, 720, 1, 'center'); naamBij(ctx, 'korstmos', 'DAARNA', 1560, 720, 1, 'center'); pijl(ctx, 820, 560, 1000, 560, C.line, 1, 3, 14); metaText(ctx, 'NIET OP SCHAAL TEN OPZICHTE VAN ELKAAR', 80, 880, C.text2, 'left', 26); },
  e8s08(ctx) { _sch8(ctx, 'DE EERSTE BEWONERS'); e8Buntgras(ctx, 400, 760, 14, {}); naamBij(ctx, 'pioniersoort', null, 400, 860, 1, 'center');
    const K = ['brede tolerantie: hitte, droogte, arme bodem', 'veel kleine zaden of sporen', 'die ver waaien', 'en lang kiemkrachtig blijven']; K.forEach((k, i) => text(ctx, '· ' + k, 760, 300 + i * 70, fTekst(40, 600), C.text, 'left'));
    const kromme = (x0, w, kl, nm) => { ctx.strokeStyle = kl; ctx.lineWidth = 4; ctx.beginPath(); for (let u = 0; u <= 1; u += 0.02) { const xx = 760 + u * 900, yy = 820 - 180 * Math.exp(-Math.pow((u - x0) / w, 2)); u ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); naamBij(ctx, nm, null, 760 + x0 * 900, 610, 1, 'center', kl); };
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(760, 820); ctx.lineTo(1680, 820); ctx.stroke(); kromme(0.5, 0.33, C.groen, ''); kromme(0.5, 0.09, C.text2, ''); naamBij(ctx, 'smal', null, 1260, 610, 1, 'center', C.text2); naamBij(ctx, 'breed: pioniersoort', null, 1000, 760, 1, 'right', C.groen); metaText(ctx, 'TEMPERATUUR, DROOGTE →', 1680, 860, C.text2, 'right', 26); },
  e8s09(ctx) { _sch8(ctx, 'DE EERSTE BEWONERS'); ctx.fillStyle = E8.zand; ctx.fillRect(0, 560, W, 340); ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, 560); ecoTag(ctx, _F8, 'DE EERSTE BEWONERS');
    e8Buntgras(ctx, 700, 560, 12, { wortels: true }); e8Buntgras(ctx, 1300, 560, 12, { overstoven: 4 });
    ctx.strokeStyle = rgba(E8.zandL, 0.7); ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const y = 420 + i * 22; ctx.beginPath(); ctx.moveTo(1000, y); ctx.bezierCurveTo(1080, y - 10, 1150, y + 8, 1220, y); ctx.stroke(); }
    naamBij(ctx, 'wortels houden het zand vast', null, 700, 860, 1, 'center'); naamBij(ctx, 'overstoven: groeit erdoorheen', null, 1300, 860, 1, 'center'); },
  // ===== H2 =====
  e8s10(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); e8Dossier(ctx, 120, 150, Object.assign({}, B8[1], { a: 0.35 })); e8Dossier(ctx, 1040, 150, B8[3]); pijl(ctx, 900, 530, 1020, 530, C.goud, 1, 4, 16); naamBij(ctx, '± 10 jaar', 'LATER', 960, 600, 1, 'center', C.goud);
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(1060, 444, 136, 34); },
  e8s11(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); e8Profiel(ctx, 200, 260, 260, 460, 60, {});
    const rij = [['vocht', 0.1, 0.4, C.teal], ['voedingsstoffen', 0.05, 0.3, C.groen], ['stuiven', 0.9, 0.3, E8.zand], ['hitte', 0.95, 0.6, C.koraal]];
    rij.forEach(([n, a, b, kl], i) => { const y = 300 + i * 130; e8Meter(ctx, 700, y, 700, n.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), b, kl); ctx.strokeStyle = C.text2; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(700 + 700 * a, y - 6); ctx.lineTo(700 + 700 * a, y + 24); ctx.stroke(); ctx.setLineDash([]); text(ctx, b > a ? 'omhoog' : 'omlaag', 1440, y + 18, fTekst(36, 700), b > a ? C.groen : C.koraal, 'left'); });
    haak(ctx, 700, 1400, 820, 'pioniers veranderen de abiotische factoren', C.groen); },
  e8s12(ctx) { e8Zandvlakte(ctx, { rand: false, wind: false }); ecoTag(ctx, _F8, 'PIONIERS VERANDEREN DE PLEK'); e8Vierkant(ctx, 960, 840, 1100, 3, { seed: 3 }); naamBij(ctx, 'struikheide', null, 600, 520, 1, 'center'); naamBij(ctx, 'jonge grove den', null, 1300, 520, 1, 'center'); },
  e8s13(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); ctx.save(); ctx.translate(700, 170); ctx.scale(0.85, 0.85); e8Dossier(ctx, 0, 0, Object.assign({}, B8[4], { nadruk: 'korstmos' })); ctx.restore();
    _bas8(ctx, 380, 880, 400, { pose: 'wijs' }); _daan8(ctx, 1640, 880, 400, { kijk: -1 }); naamBij(ctx, '"Het buntgras is gewoon oud"', null, 1640, 330, 1, 'center'); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(710, 712, 300, 50); },
  e8q14(ctx) { const S = SCENE8('e8q14'); ecoVraagKaart(ctx, 'Waarom is het buntgras op blad vier verdwenen?', _O8(S.opties), _F8); ctx.save(); ctx.translate(1480, 300); ctx.scale(0.5, 0.5); e8Dossier(ctx, 0, 0, B8[4]); ctx.restore(); },
  e8s15(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); ctx.fillStyle = E8.humusL; ctx.fillRect(0, 760, W, 140); ecoStruikheide(ctx, 640, 760, 5, {}); ecoGroveDen(ctx, 1100, 760, 1.6, { groei: 0.6 }); e8Buntgras(ctx, 860, 760, 8, { a: 0.55 });
    for (let i = 0; i < 6; i++) pijl(ctx, 700 + i * 70, 150, 760 + i * 70, 480, rgba(C.goud, 0.6), 1, 3, 12); naamBij(ctx, 'licht', null, 860, 120, 1, 'center', C.goud);
    naamBij(ctx, 'buntgras in de schaduw', 'VERLIEST DE CONCURRENTIE', 860, 860, 1, 'center'); naamBij(ctx, 'heide', null, 520, 600, 1, 'center'); naamBij(ctx, 'grove den', null, 1260, 380, 1, 'left'); },
  e8s16(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK'); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(140 + i * 430, 180); ctx.scale(0.5, 0.5); e8Dossier(ctx, 0, 0, B8[[1, 3, 4, 6][i]] ? (i < 3 ? B8[[1, 3, 4][i]] : { blad: '?', soorten: [], a: 0.3 }) : {}); ctx.restore(); }
    e8Balk(ctx, 160, 700, 1600, 2); haak(ctx, 160, 1760, 780, 'successie · primair: op kale grond', C.groen); },
  e8s17(ctx) { _sch8(ctx, 'PIONIERS VERANDEREN DE PLEK');
    const kol = ['blad 1', 'blad 2', 'blad 3', 'blad 4', 'blad 5', 'blad 6'], rij = [['korstmos', [0, 20, 30, 5, 0, 0]], ['buntgras', [0, 15, 25, 0, 0, 0]], ['struikheide', [0, 0, 20, 60, 10, 0]], ['grove den', [0, 0, 5, 25, 60, 10]]];
    const x0 = 500, y0 = 280, cw = 200, rh = 100; metaText(ctx, 'BEDEKKING IN PROCENT · VOORBEELD', x0 - 340, y0 - 80, C.text2, 'left', 26);
    kol.forEach((k, j) => text(ctx, k, x0 + j * cw + cw / 2, y0 - 20, fTekst(36, 600), C.text2, 'center'));
    rij.forEach(([n, v], i) => { const y = y0 + i * rh; if (n === 'buntgras') { roundRect(ctx, x0 - 360, y + 4, 360 + 6 * cw, rh - 8, 10); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); } text(ctx, n, x0 - 340, y + 62, fTekst(40, 600), C.text, 'left');
      v.forEach((p, j) => { text(ctx, String(p), x0 + j * cw + cw / 2, y + 62, fTekst(44, 700), p ? C.text : C.text2, 'center'); }); ctx.strokeStyle = rgba(C.line, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 - 340, y + rh); ctx.lineTo(x0 + 6 * cw, y + rh); ctx.stroke(); }); },
  // ===== H3 =====
  e8s18(ctx) { e8Zandvlakte(ctx, { rand: true, wind: false }); ecoTag(ctx, _F8, 'IS HET BOS OOIT AF?');
    const P = [[420, 780, 'open zand', 0], [820, 640, 'heide', 4], [1220, 720, 'jong dennenbos', 5], [1600, 600, 'oud bos', 6]]; for (const [x, y, n, st] of P) { e8Vierkant(ctx, x, y, 260, st, { seed: st + 2 }); naamBij(ctx, n, null, x, y + 50, 1, 'center'); }
    naamBij(ctx, 'vier meetplekken', 'VERSCHILLENDE LEEFTIJD', 960, 200, 1, 'center'); },
  e8s19(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F8, 'IS HET BOS OOIT AF?'); ctx.fillStyle = '#3A3428'; ctx.fillRect(0, 780, W, 120);
    for (const [x, s, b] of [[160, 2.6, 0], [480, 2.4, 1], [820, 2.8, 0], [1500, 2.5, 1], [1800, 2.7, 0]]) (b ? ecoBerk : ecoGroveDen)(ctx, x, 780, s, {});
    for (const x of [620, 1050, 1250]) ecoZomereik(ctx, x, 780, 0.6, { groei: 0.25 });
    naamBij(ctx, 'jonge eiken', 'VERDRAGEN WAT SCHADUW', 860, 640, 1, 'center'); },
  e8s20(ctx) { _sch8(ctx, 'IS HET BOS OOIT AF?'); e8Dossier(ctx, 160, 150, B8[6]); naamBij(ctx, 'climaxecosysteem?', null, 1340, 420, 1, 'center', C.goud); naamBij(ctx, 'dikke humuslaag', null, 1340, 560, 1, 'center'); naamBij(ctx, 'weinig licht op de grond', null, 1340, 680, 1, 'center'); },
  e8q21(ctx) { const S = SCENE8('e8q21'); ecoVraagKaart(ctx, 'Is het bos op blad zes nu af?', _O8(S.opties), _F8); ctx.save(); ctx.translate(1500, 300); ctx.scale(0.5, 0.5); e8Dossier(ctx, 0, 0, B8[6]); ctx.restore(); },
  e8s22(ctx) { ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F8, 'IS HET BOS OOIT AF?'); ctx.fillStyle = '#3A3428'; ctx.fillRect(0, 780, W, 120);
    for (const x of [140, 420, 1820]) ecoZomereik(ctx, x, 780, 2.2, {});
    ctx.beginPath(); ctx.ellipse(1010, 690, 40, 110, 0, 0, 6.283); ctx.fillStyle = '#5A4632'; ctx.fill(); ctx.strokeStyle = '#8A6A4C'; ctx.lineWidth = 5; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(1010, 690); ctx.lineTo(1010 + Math.cos(k) * 90, 690 + Math.sin(k * 1.3) * 110); ctx.stroke(); } _vh8(ctx, [[1040, 740], [1640, 770], [1640, 790], [1040, 790]], '#6E5440'); for (let k = 0; k < 4; k++) lijn(ctx, [[1200 + k * 120, 770], [1260 + k * 120, 720 - k * 6]], '#6E5440', 10);
    for (let i = 0; i < 5; i++) ecoBerk(ctx, 620 + i * 90, 780, 0.6, { groei: 0.3 }); for (let i = 0; i < 6; i++) pijl(ctx, 600 + i * 90, 120, 620 + i * 90, 560, rgba(C.goud, 0.5), 1, 3, 12);
    naamBij(ctx, 'omgewaaide eik', null, 1340, 680, 1, 'center'); naamBij(ctx, 'licht in het gat', 'PIONIERS BEGINNEN OPNIEUW', 820, 860, 1, 'center'); },
  e8s23(ctx) { _sch8(ctx, 'IS HET BOS OOIT AF?'); const gx = 300, gy = 760, gw = 1300, gh = 440; ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy - gh); ctx.lineTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    metaText(ctx, 'AANDEEL EIK IN HET BOS · VOORBEELD', gx, gy - gh - 20, C.text2, 'left', 26); metaText(ctx, 'JAREN →', gx + gw, gy + 44, C.text2, 'right', 26); for (let v = 0; v <= 100; v += 50) metaText(ctx, v + ' %', gx - 14, gy - v / 100 * gh + 9, C.text2, 'right', 26);
    const P = []; for (let i = 0; i <= 60; i++) { const u = i / 60; let v = 0.62 + 0.05 * Math.sin(u * 23) + 0.03 * Math.sin(u * 51); if (u > 0.45 && u < 0.6) v -= 0.18 * Math.sin((u - 0.45) / 0.15 * Math.PI); P.push([gx + u * gw, gy - v * gh]); } lijn(ctx, P, C.groen, 5);
    ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.groen, 0.5); ctx.lineWidth = 2; for (const v of [0.5, 0.72]) { ctx.beginPath(); ctx.moveTo(gx, gy - v * gh); ctx.lineTo(gx + gw, gy - v * gh); ctx.stroke(); } ctx.setLineDash([]);
    naamBij(ctx, 'storm', null, gx + 0.52 * gw, gy - 0.32 * gh, 1, 'center', C.koraal); haak(ctx, gx, gx + gw, gy + 70, 'biologisch evenwicht: schommelt binnen grenzen', C.groen); },
  e8s24(ctx) { e8Zandvlakte(ctx, { wind: false }); ecoTag(ctx, _F8, 'IS HET BOS OOIT AF?'); ctx.save(); ctx.translate(560, 820); ctx.rotate(-1.45); ecoGroveDen(ctx, 0, 0, 1.0, {}); ctx.restore(); ecoGroveDen(ctx, 360, 820, 1.2, {}); _bas8(ctx, 760, 840, 330, { pose: 'wijs' });
    ctx.fillStyle = '#4E5A40'; ctx.fillRect(1000, 760, 920, 140); for (let i = 0; i < 26; i++) ecoStruikheide(ctx, 1010 + hash(i * 2.7) * 900, 790 + hash(i * 3.1) * 100, 1.6, {}); for (let i = 0; i < 3; i++) ECO_HOEF.schaap.teken(ctx, 1200 + i * 230, 860 + (i % 2) * 30, 1.8, { houding: 'grazen', kijk: i % 2 ? -1 : 1 }); naamBij(ctx, 'bomen kappen', 'ZAND OPEN HOUDEN', 520, 520, 1, 'center'); naamBij(ctx, 'schapen op de heide', 'ETEN JONGE BOOMPJES', 1450, 560, 1, 'center'); },
  e8s25(ctx) { _sch8(ctx, 'IS HET BOS OOIT AF?'); vwoMarker(ctx); for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(200 + i * 260, 160); ctx.scale(0.3, 0.3); e8Dossier(ctx, 0, 0, B8[[1, 3, 3, 4, 6, 6][i]]); ctx.restore(); text(ctx, 'blad ' + (i + 1), 314 + i * 260, 420, fTekst(36, 600), C.text2, 'center'); }
    const gx = 200, gy = 820, gw = 1560, gh = 300; lijn(ctx, Array.from({ length: 21 }, (_, i) => [gx + i / 20 * gw, gy - gh * (0.95 - 0.85 * i / 20)]), C.koraal, 5); lijn(ctx, Array.from({ length: 21 }, (_, i) => [gx + i / 20 * gw, gy - gh * (0.1 + 0.85 * i / 20)]), C.groen, 5);
    naamBij(ctx, 'invloed abiotisch', 'HITTE · DROOGTE · STUIVEN', gx + 30, gy - gh - 10, 1, 'left', C.koraal); naamBij(ctx, 'invloed concurrentie', 'BIOTISCH', gx + gw - 30, gy - gh - 10, 1, 'right', C.groen); },
  // ===== H4 =====
  e8s26(ctx) { e8Brand(ctx, { stap: 0 }); ecoTag(ctx, _F8, 'NA DE BRAND'); naamBij(ctx, 'Strabrechtse Heide', 'IN HET JAAR 2010 · ± 150 HECTARE', 960, 200, 1, 'center'); },
  e8s27(ctx) { _sch8(ctx, 'NA DE BRAND'); e8Dossier(ctx, 120, 150, B8[1]); e8Dossier(ctx, 1040, 150, { blad: 1, titel: 'BRANDPLEK · BLAD 1', brand: 0, humus: 90, zaden: true, wortels: true, as: true, soorten: [], meters: { hitte: 0.7, vocht: 0.5, licht: 1, stuiven: 0.1 } });
    ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.strokeRect(138, 440, 140, 236); ctx.strokeRect(1058, 440, 140, 236); },
  e8q28(ctx) { const S = SCENE8('e8q28'); ecoVraagKaart(ctx, ['Waarom groeit er op de brandplek veel sneller', 'iets terug dan op het kale zand?'], _O8(S.opties), _F8); e8Profiel(ctx, 1560, 300, 120, 260, 0, { label: false }); e8Profiel(ctx, 1720, 300, 120, 260, 90, { zaden: true, wortels: true, as: true, label: false }); naamBij(ctx, 'zand', null, 1620, 620, 1, 'center'); naamBij(ctx, 'brandplek', null, 1780, 620, 1, 'center'); },
  e8s29(ctx) { _sch8(ctx, 'NA DE BRAND'); e8Profiel(ctx, 560, 200, 800, 620, 300, { zaden: true, wortels: true, as: true, label: false });
    naamBij(ctx, 'zwarte laag', null, 1400, 214, 1, 'left'); naamBij(ctx, 'humus', 'HOUDT WATER VAST', 1400, 360, 1, 'left'); naamBij(ctx, 'zaadbank', 'ZADEN VAN HEIDE', 1400, 470, 1, 'left', C.goud); naamBij(ctx, 'wortels', 'LOPEN WEER UIT', 1400, 580, 1, 'left'); naamBij(ctx, 'zand', null, 1400, 740, 1, 'left'); },
  e8s30(ctx) { e8Brand(ctx, { stap: 1 }); ecoTag(ctx, _F8, 'NA DE BRAND'); naamBij(ctx, 'een jaar later', 'HEIDE UIT DE ZAADBANK · BERK WAAIT AAN', 960, 200, 1, 'center'); },
  e8s31(ctx) { _sch8(ctx, 'NA DE BRAND'); const T = ['eerste jaren', 'na een paar jaar', 'na een paar jaar meer', 'na tientallen jaren']; for (let i = 0; i < 4; i++) { e8Akker(ctx, 120 + i * 440, 640, 400, i); text(ctx, T[i], 320 + i * 440, 760, fTekst(36, 600), C.text, 'center'); }
    naamBij(ctx, 'verlaten akker', 'SECUNDAIRE SUCCESSIE', 960, 220, 1, 'center'); },
  e8s32(ctx) { e8Zandvlakte(ctx, { wind: false }); ecoTag(ctx, _F8, 'NA DE BRAND'); for (let i = 0; i < 40; i++) e8Mos(ctx, 200 + hash(i * 2.2) * 1500, 560 + hash(i * 3.9) * 300, 50, 1.6);
    for (const [x, y] of [[500, 700], [900, 640], [1300, 760]]) e8Korstmos(ctx, x, y, 3); naamBij(ctx, 'uitheems mos', 'INVASIEVE EXOOT', 960, 480, 1, 'center');
    card(ctx, 1260, 140, 580, 150, 'meer hierover', 'in de film Ingrijpen of laten gaan?'); },
  // ===== Samenvatting =====
  e8s33(ctx) { _sch8(ctx, 'SAMENVATTING'); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(140 + i * 300, 150); ctx.scale(0.36, 0.36); e8Dossier(ctx, 0, 0, B8[[1, 3, 4, 6][i]]); ctx.restore(); }
    ctx.save(); ctx.translate(1400, 150); ctx.scale(0.36, 0.36); e8Dossier(ctx, 0, 0, { blad: 1, titel: 'BRANDPLEK · BLAD 1', brand: 1, humus: 90, zaden: true, meters: { hitte: 0.6, vocht: 0.5, licht: 1, stuiven: 0.1 } }); ctx.restore();
    e8Balk(ctx, 160, 520, 1600, 4); naamBij(ctx, 'primair: honderden jaren', null, 560, 680, 1, 'center'); naamBij(ctx, 'secundair: veel sneller', null, 1540, 680, 1, 'center'); e8Paaltje(ctx, 1780, 860, '23', 1); },
  e8s34(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); ecoTag(ctx, _F8, 'SAMENVATTING');
    const z = ['Pioniers veranderen de plek, en verliezen daarna de concurrentie.', 'Op een bodem met humus en een zaadbank gaat het veel sneller.', 'Een climaxbos blijft veranderen, maar blijft een bos.'];
    z.forEach((s, i) => text(ctx, s, 180, 330 + i * 120, fTekst(48, 600), C.text, 'left')); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(150, 280); ctx.lineTo(130, 280); ctx.lineTo(130, 590); ctx.lineTo(150, 590); ctx.stroke();
    text(ctx, 'Niemand plant het bos. De plek verandert zichzelf.', 180, 760, fTekst(48, 700), C.groen, 'left'); },
};
const SB8_DATA = /*DATA*/{"e8q06": {"opties": "A Er komen nooit eikels op het zand · B Eiken groeien alleen waar mensen ze planten · C Een eikel die kiemt, overleeft het hete, droge en stuivende zand niet", "juist": "C"}, "e8q14": {"opties": "A Heide en dennen nemen licht, water en voedingsstoffen weg · B Het buntgras is oud geworden en doodgegaan · C Het zand is te voedselarm geworden voor buntgras", "juist": "A"}, "e8q21": {"opties": "A Ja, een climaxbos verandert nooit meer · B Nee, het verandert steeds een beetje, maar blijft een bos · C Nee, over honderd jaar is het weer kaal zand", "juist": "B"}, "e8q28": {"opties": "A Na een brand waaien er van ver veel meer zaden aan · B Na een brand regent het meer · C In de bodem zitten al humus, zaden en levende wortels", "juist": "C"}};
