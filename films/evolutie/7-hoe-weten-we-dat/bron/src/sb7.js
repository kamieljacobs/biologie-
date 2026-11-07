// Evolutie v2 — film 7 'Hoe weten we dat?' — storyboard: één keyframe per scène (22 okt 2026)
function zee(ctx, o = {}) { const { opp = 150 } = o; ctx.fillStyle = C.bgMacroSky; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#22466A'; ctx.fillRect(0, opp, W, 120); ctx.fillStyle = '#1A3A58'; ctx.fillRect(0, opp + 120, W, H);
  ctx.strokeStyle = rgba('#9CCBE3', 0.5); ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= W; x += 20) { const y = opp + Math.sin(x / 60) * 3; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
  ctx.fillStyle = '#2C3A34'; zacht(ctx, [[-40, 960], [400, 930], [900, 950], [1400, 925], [1960, 945], [1960, 1100], [-40, 1100]]); ctx.fill(); }
function oever(ctx) { macroNacht(ctx, { horizon: 640 }); }
const RIJ_W = 'ATGGCTAAGTTCGAC', RIJ_N = 'ATGGCAAAGTTCGAC', RIJ_K = 'ATCGCAAGGTTCAAC', RIJ_Z = 'TTCGCAAGCTACAAT';
function telVerschil(a, b) { let n = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && b[i] !== '-') n++; return n; }
function eindKaart(ctx, film, zinnen) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, film, 'SAMENVATTING');
  zinnen.forEach((z, i) => { text(ctx, z, 160, 300 + i * 120, fTekst(48, 600), C.text, 'left'); }); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 240); ctx.lineTo(116, 240); ctx.lineTo(116, 300 + (zinnen.length - 1) * 120 + 20); ctx.lineTo(130, 300 + (zinnen.length - 1) * 120 + 20); ctx.stroke(); }

// omgeklapte stapel met letters P (jongste, nu onderop) … R (oudste, nu bovenop)
function pqrLagen(ctx, x, y, w, h, rot, o = {}) { const n = 3, cx = x + w / 2, cy = y + h / 2, L = ['R', 'Q', 'P'];
    gesteente(ctx, x, y, w, h, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { rot, golf: 3, a: o.a == null ? 1 : o.a, nadruk: o.nadruk == null ? -1 : o.nadruk, fossielen: [{ soort: 'schelp', laag: 0, x: 0.4, s: o.fs || 1.3, goud: o.goud }] });
    for (let i = 0; i < n; i++) { const ly = h / 2 - (i + 0.5) * h / n, lx = -w / 2 - 50, px = cx + lx * Math.cos(rot) - ly * Math.sin(rot), py = cy + lx * Math.sin(rot) + ly * Math.cos(rot);
      text(ctx, L[i], px, py + 16, fTekst(46, 800), i === 0 && o.goud ? C.goud : C.text, 'center'); } }
const SB7 = {
  e7s01(ctx) { zee(ctx); evoTag(ctx, 7, 'OPENING'); bultrug(ctx, 960, 520, 1.55, { t: 0.6 }); naamBij(ctx, 'bultrug', 'ongeveer 15 m · een zoogdier', 300, 330); evoSchaal(ctx, 'bultrug · niet op schaal met de achtergrond'); },
  e7s02(ctx) { zee(ctx); evoTag(ctx, 7, 'OPENING'); bultrug(ctx, 960, 520, 1.55, { rontgen: 1, heup: 1 }); naamBij(ctx, 'heupbotjes', 'los van de wervelkolom', 560, 680, 1, 'center', C.goud); },
  e7s03(ctx) { oever(ctx); evoTag(ctx, 7, 'OPENING'); gesteente(ctx, 820, 330, 1100, 600, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }]);
    text(ctx, 'Welke laag is het oudst?', 120, 230, fTitel(72), C.text, 'left'); },
  e7s04(ctx) { titelKaart(ctx, 7, 'Hoe weten we dat?', ['Hoe weet je welke laag', 'in de grond het oudst is?'], (c) => { bultrug(c, 1400, 700, 0.95, { rontgen: 1, heup: 1 }); }); },
  e7s05(ctx) { oever(ctx); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN'); ctx.fillStyle = '#22466A'; ctx.fillRect(300, 300, 1320, 160);
    gesteente(ctx, 300, 460, 1320, 420, [{ dik: 1 }, { dik: 1 }, { dik: 1 }, { dik: 0.6, kleur: '#C2AC84' }], { fossielen: [{ laag: 3, soort: 'pakicetus', x: 0.5, s: 1.6, goud: true }] });
    ctx.fillStyle = rgba('#C9B896', 0.5); for (let i = 0; i < 40; i++) circ(ctx, 340 + hash(i) * 1240, 320 + hash(i * 3) * 130, 3);
    naamBij(ctx, 'fossiel', 'versteend overblijfsel', 1240, 690, 1, 'left', C.goud); naamBij(ctx, 'zand en klei bezinken', null, 960, 260, 1, 'center'); },
  e7s06(ctx) { oever(ctx); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN'); gesteente(ctx, 240, 300, 1100, 580, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }], { nadruk: 0 });
    pijl(ctx, 1460, 330, 1460, 840, C.goud, 1, 5, 22); naamBij(ctx, 'ouder', null, 1500, 600, 1, 'left', C.goud); naamBij(ctx, 'relatieve datering', 'de volgorde, nog geen jaren', 240, 250, 1, 'left'); },
  e7s07(ctx) { oever(ctx); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN'); gesteente(ctx, 760, 300, 900, 480, [{ dik: 1 }, { dik: 1.2 }, { dik: 0.8 }, { dik: 1.1 }, { dik: 0.9 }], { rot: Math.PI - 0.42, fossielen: [{ soort: 'schelp', laag: 0, x: 0.35, s: 1.6 }, { soort: 'schelp', laag: 0, x: 0.7, s: 1.6 }] });
    persoon(ctx, 'kim', 380, 880, 400, { pose: 'wijs', kijk: 1, uit: 'denkt' }); naamBij(ctx, 'omgeklapt', 'na het afzetten: schelpen op hun kop', 160, 200, 1, 'left'); },
  e7q08(ctx) { vraagKaart(ctx, ['Deze lagen zijn na het afzetten omgeklapt.', 'Welke laag is het oudst?'], ['Laag P: die ligt nu het diepst', 'Laag R: die lag onderop toen de lagen nog plat lagen', 'Dat kun je na het kantelen niet meer weten'], 7);
    pqrLagen(ctx, 1500, 500, 300, 240, Math.PI - 0.3); },
  e7s09(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN');
    pqrLagen(ctx, 260, 340, 520, 340, Math.PI - 0.3, { a: 0.45 }); pijl(ctx, 880, 510, 1040, 510, C.line, 1, 4, 18);
    pqrLagen(ctx, 1180, 340, 560, 340, 0, { nadruk: 0, goud: true }); naamBij(ctx, 'R: als eerste afgezet = het oudst', null, 1460, 790, 1, 'center', C.goud);
    naamBij(ctx, 'in gedachten terugdraaien', null, 960, 260, 1, 'center'); },
  e7s10(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN'); halveringsGrafiek(ctx, 300, 760, 1100, 480);
    naamBij(ctx, 'halveringstijd', 'koolstof-14: ongeveer 5730 jaar', 1480, 300, 1, 'left', C.teal); naamBij(ctx, 'absolute datering', 'leeftijd in jaren', 1480, 440, 1, 'left'); },
  e7s11(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN'); halveringsGrafiek(ctx, 200, 760, 900, 440, { n: 9, maxLabel: 3 });
    ctx.setLineDash([10, 8]); ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200 + 900 * 8.7 / 9, 280); ctx.lineTo(200 + 900 * 8.7 / 9, 760); ctx.stroke(); ctx.setLineDash([]);
    naamBij(ctx, '±50.000 jaar', 'grens koolstof-14', 1080, 250, 1, 'center', C.koraal);
    gesteente(ctx, 1320, 380, 460, 300, [{ dik: 1 }, { dik: 1 }, { dik: 1 }], { golf: 3 }); naamBij(ctx, 'oudere lagen', 'andere radioactieve stoffen', 1550, 330, 1, 'center');
    metaText(ctx, 'gemeten', 1550, 740, C.grain, 'center', 28); },
  e7s12(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'LAGEN EN FOSSIELEN');
    const kl = ['#6E5A44', '#8C7258', '#A8916A', '#7A6A5A', '#B8A07A', '#93805E'];
    for (let i = 0; i < 6; i++) { const x0 = 160 + i * 266; roundRect(ctx, x0 + 4, 300, 258, 260, 10); shape(ctx, kl[i], _lt(kl[i], 0.2), 1.5); }
    tijdAs(ctx, 160, 680, 1600, { van: 60 }); naamBij(ctx, 'elke laag een leeftijd', null, 960, 250, 1, 'center'); },
  e7s13(ctx) { oever(ctx); evoTag(ctx, 7, 'WALVISSEN IN DE LAGEN'); pakicetus(ctx, 900, 820, 1.7, { houding: 'lopen', t: 0.3 }); // stapt uit zijn laag naar voren
    ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(900 + 140 * 1.7, 820 - 146 * 1.7, 40, 0, 6.283); ctx.stroke(); // cirkel op het oor
    naamBij(ctx, 'Pakicetus', 'ongeveer 50 miljoen jaar · 1–2 m', 160, 200, 1, 'left'); naamBij(ctx, 'oor met walvisbouw', null, 1190, 470, 1, 'left', C.goud); evoSchaal(ctx, 'reconstructie · Pakistan en India'); },
  e7s14(ctx) { oever(ctx); evoTag(ctx, 7, 'WALVISSEN IN DE LAGEN'); ambulocetus(ctx, 880, 740, 1.5, { houding: 'liggen' }); // laag in het water, alleen de ogen erboven ctx.fillStyle = rgba('#2E6FBF', 0.5); ctx.fillRect(0, 640, W, 260);
    lijn(ctx, [[0, 640], [W, 640]], '#9CCBE3', 2); naamBij(ctx, 'Ambulocetus', 'ongeveer 48 miljoen jaar · ±3 m', 160, 200, 1, 'left'); naamBij(ctx, 'ogen bovenop de kop', null, 1220, 500, 1, 'left'); evoSchaal(ctx, 'reconstructie'); },
  e7s15(ctx) { zee(ctx, { opp: 110 }); evoTag(ctx, 7, 'WALVISSEN IN DE LAGEN'); rodhocetus(ctx, 660, 520, 2.0, { t: 0.35 }); // peddelt met de achtervoeten
    zoomCircle(ctx, 1560, 420, 190, 372, 662, 'enkelbot · dubbele katrol', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1360, 220, 400, 400);
      vul(ctx, [[1490, 330], [1630, 330], [1650, 400], [1620, 470], [1500, 470], [1470, 400]], C.goud, _lt(C.goud, 0.3), 2); ctx.strokeStyle = _dk(C.goud, 0.4); ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(1560, 330, 40, 0.2, 2.94); ctx.stroke(); ctx.beginPath(); ctx.arc(1560, 470, 40, 3.34, 6.08); ctx.stroke(); });
    naamBij(ctx, 'Rodhocetus', 'ongeveer 47 miljoen jaar · 2–3 m', 160, 210, 1, 'left'); naamBij(ctx, 'zoals bij evenhoevigen', null, 1560, 700, 1, 'center', C.goud); evoSchaal(ctx, 'reconstructie'); },
  e7s16(ctx) { zee(ctx, { opp: 110 }); evoTag(ctx, 7, 'WALVISSEN IN DE LAGEN'); basilosaurus(ctx, 900, 480, 1.75, { poot: 1, t: 0.4 }); // golft door het water
    zoomCircle(ctx, 1500, 720, 150, 900 - 206 * 1.75, 480 + 42 * 1.75, 'achterpootje ±35 cm · vergroot', 1, () => { ctx.fillStyle = '#4E5862'; ctx.fillRect(1340, 560, 320, 320); ctx.fillStyle = '#9AA6B0'; ctx.fillRect(1340, 640, 320, 240);
      bot(ctx, 1440, 640, 1500, 720, 26, C.goud); bot(ctx, 1500, 720, 1540, 790, 18, C.goud); bot(ctx, 1500, 730, 1530, 792, 10, C.goud); for (let i = 0; i < 3; i++) { bot(ctx, 1540, 796, 1560 + i * 14, 830, 8, C.goud); bot(ctx, 1560 + i * 14, 834, 1572 + i * 16, 856, 7, C.goud); } });
    naamBij(ctx, 'Basilosaurus', 'ongeveer 40 miljoen jaar · 15 m', 160, 220, 1, 'left'); evoSchaal(ctx, 'reconstructie'); },
  e7q17(ctx) { vraagKaart(ctx, 'Is Pakicetus de voorouder van Ambulocetus?', ['Niet per se', 'Ja, het ene dier veranderde in het andere', 'Nee, ze zijn niet verwant'], 7);
    pakicetus(ctx, 1680, 560, 0.55); ambulocetus(ctx, 1680, 820, 0.45); },
  e7s18(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'WALVISSEN IN DE LAGEN'); const X = tijdAsMj(ctx, 160, 840, 1600, 52, 36, { stap: 2, nu: true });
    const yT = 560; ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X(52), yT); ctx.lineTo(X(0), yT); ctx.stroke();
    const tak = (mj, dy, fn, naam, lx, ly) => { const px = X(mj + 0.8); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(px, yT); ctx.lineTo(X(mj), yT + dy); ctx.stroke(); circ(ctx, px, yT, 7, C.bgSchema, C.line, 3); circ(ctx, X(mj), yT + dy, 6, C.line);
      fn(X(mj), yT + dy - 12); naamBij(ctx, naam, 'ongeveer ' + mj + ' miljoen jaar', X(mj) + lx, yT + dy + ly, 1, 'center'); };
    tak(50, -160, (x, y) => pakicetus(ctx, x, y, 0.42), 'Pakicetus', 0, -150); tak(48, 150, (x, y) => ambulocetus(ctx, x, y - 6, 0.36), 'Ambulocetus', 0, 60); tak(47, -160, (x, y) => rodhocetus(ctx, x + 60, y - 20, 0.38), 'Rodhocetus', 200, -90); tak(40, 150, (x, y) => basilosaurus(ctx, x, y - 26, 0.24), 'Basilosaurus', 0, 30);
    bultrug(ctx, X(0) - 40, yT - 70, 0.24); naamBij(ctx, 'walvissen nu', null, X(0), yT - 150, 1, 'right');
    naamBij(ctx, 'verwanten op zijtakken', 'reconstructie · vereenvoudigd', 1760, 200, 1, 'right', C.goud); },
  e7s19(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HETZELFDE SKELET');
    armSkelet(ctx, 'mens', 280, 220, 560, { huid: 0.15 }); armSkelet(ctx, 'vleermuis', 520, 220, 560, { huid: 0.15 }); armSkelet(ctx, 'walvis', 1340, 220, 560, { huid: 0.15 }); armSkelet(ctx, 'paard', 1640, 220, 560, { huid: 0.15 });
    [['mens', 280], ['vleermuis', 700], ['walvis', 1340], ['paard', 1660]].forEach(([n, x]) => naamBij(ctx, n, null, x, 180, 1, 'center'));
    naamBij(ctx, 'opperarmbeen', null, 560, 880, 1, 'center', BOT.arm); naamBij(ctx, 'spaakbeen + ellepijp', null, 960, 880, 1, 'center', BOT.onder); naamBij(ctx, 'pols- en handbotjes', null, 1400, 880, 1, 'center', BOT.hand); },
  e7s20(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HETZELFDE SKELET');
    armSkelet(ctx, 'mens', 280, 220, 540, { huid: 1 }); armSkelet(ctx, 'vleermuis', 520, 220, 540, { huid: 1 }); armSkelet(ctx, 'walvis', 1340, 220, 540, { huid: 1 }); armSkelet(ctx, 'paard', 1640, 220, 540, { huid: 1 });
    [['grijpen', 280], ['vliegen', 760], ['zwemmen', 1340], ['rennen', 1660]].forEach(([n, x]) => naamBij(ctx, n, null, x, 840, 1, 'center'));
    naamBij(ctx, 'homologe organen', 'zelfde bouw · andere functie', 960, 150, 1, 'center', C.goud); },
  e7q21(ctx) { vraagKaart(ctx, 'Waarom zitten er vingerbotjes in een walvisvin?', ['Een vin heeft vingers nodig om te sturen', 'Walvissen erfden ze van een voorouder met vingers', 'Dat is toeval'], 7);
    armSkelet(ctx, 'walvis', 1680, 330, 520, { huid: 0.6 }); },
  e7s22(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HETZELFDE SKELET');
    const top = [['mens', 300], ['vleermuis', 620], ['walvis', 1300], ['paard', 1620]]; top.forEach(([n, x]) => { armSkelet(ctx, n, n === 'vleermuis' ? x - 60 : x, 160, 330, { huid: 0.3 }); });
    const vx = 960, vy = 780; top.forEach(([n, x]) => { ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(n === 'vleermuis' ? x + 60 : x, 520); ctx.stroke(); });
    circ(ctx, vx, vy, 12, C.goud, _lt(C.goud, 0.4), 2); naamBij(ctx, 'gemeenschappelijke voorouder', 'poot met vijf vingers', vx, vy + 70, 1, 'center', C.goud); },
  e7s23(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HETZELFDE SKELET');
    const wervel = (x0, y0, n) => { for (let i = 0; i < n; i++) { roundRect(ctx, x0 + i * 46, y0 - 18, 40, 36, 8); shape(ctx, BOT.kaal, BOT.kaalR, 1.5); } };
    wervel(160, 380, 14); vul(ctx, [[520, 360], [640, 340], [700, 380], [660, 470], [560, 480], [500, 420]], BOT.kaal, BOT.kaalR, 2); bot(ctx, 600, 450, 560, 640, 30, BOT.kaal); bot(ctx, 560, 650, 600, 820, 22, BOT.kaal);
    naamBij(ctx, 'landdier', 'bekken vast aan de wervelkolom', 160, 260, 1, 'left');
    wervel(1020, 380, 16); bot(ctx, 1420, 520, 1500, 490, 22, C.goud); bot(ctx, 1440, 560, 1520, 530, 22, C.goud);
    naamBij(ctx, 'walvis', 'heupbotjes los in de buik', 1020, 260, 1, 'left'); naamBij(ctx, 'dragen niets', null, 1470, 640, 1, 'center', C.goud); },
  e7s24(ctx) { zee(ctx); evoTag(ctx, 7, 'HETZELFDE SKELET'); bultrug(ctx, 960, 500, 1.55, { rontgen: 1, heup: 1, a: 1 });
    naamBij(ctx, 'rudimentair orgaan', 'oorspronkelijke functie kwijt', 300, 780, 1, 'left', C.goud); },
  e7s25(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HETZELFDE SKELET'); persoon(ctx, 'noor', 520, 880, 620, { zij: true, kijk: 1 });
    zoomCircle(ctx, 1300, 460, 290, 500, 560, 'staartbeen · 3–5 vergroeide wervels', 1, () => { ctx.fillStyle = C.bgSchema; ctx.fillRect(1000, 160, 600, 600); staartbeen(ctx, 1300, 480, 1.35); });
    },
  e7s26(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    dnaRijen(ctx, 480, 220, [{ naam: 'voorouder', seq: 'ATGGCTAAGTTCGAC' }], { toonVerschil: false });
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1030, 300); ctx.lineTo(760, 460); ctx.moveTo(1030, 300); ctx.lineTo(1300, 460); ctx.stroke();
    dnaRijen(ctx, 160, 500, [{ naam: '', seq: 'ATGGCTAAGTTCGAC' }, { naam: 'lijn 1', seq: 'ATGGCAAAGTTCGAC' }], { cw: 40, naamW: 140, gap: 26 });
    dnaRijen(ctx, 1000, 500, [{ naam: '', seq: 'ATGGCTAAGTTCGAC' }, { naam: 'lijn 2', seq: 'ATGGCTAAGTACGTC' }], { cw: 40, naamW: 140, gap: 26 });
    naamBij(ctx, 'eigen mutaties in elke lijn', null, 960, 800, 1, 'center', C.goud); },
  e7s27(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA'); persoon(ctx, 'kim', 220, 860, 520, { pose: 'wijs', uit: 'praat' });
    dnaRijen(ctx, 470, 220, [{ naam: 'walvis', seq: RIJ_W }, { naam: 'nijlpaard', seq: RIJ_N }, { naam: 'koe', seq: RIJ_K }, { naam: 'zeehond', seq: RIJ_Z }], { cw: 44 });
    naamBij(ctx, 'minder verschillen = nauwer verwant', null, 1130, 760, 1, 'center', C.goud); },
  e7q28(ctx) { vraagKaart(ctx, 'Welk dier is het nauwst verwant aan de walvis?', ['De zeehond', 'De koe', 'Het nijlpaard'], 7);
    const y0 = 320 + 58 + 30; zeehond(ctx, 1240, y0 + 84, 0.42); koe7(ctx, 1260, y0 + 124 + 96, 0.3); nijlpaard(ctx, 1250, y0 + 248 + 96, 0.3); },
  e7s29(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    const rows = [{ naam: 'walvis', seq: RIJ_W }, { naam: 'nijlpaard', seq: RIJ_N }, { naam: 'koe', seq: RIJ_K }, { naam: 'zeehond', seq: RIJ_Z }];
    dnaRijen(ctx, 300, 220, rows.slice(0, 3)); dnaRijen(ctx, 300, 220 + 3 * 82, [rows[0], rows[3]].map((r, i) => i ? r : { naam: '', seq: '' }), { a: 0.35 });
    rows.slice(1).forEach((r, i) => { const n = telVerschil(RIJ_W, r.seq); naamBij(ctx, n + (n === 1 ? ' verschil' : ' verschillen'), null, 1220, 220 + (i + 1) * 82 + 40, i === 2 ? 0.35 : 1, 'left', i === 0 ? C.goud : C.text); });
    roundRect(ctx, 286, 220 + 82 - 10, 1180, 76, 14); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke();
    naamBij(ctx, 'zeehond: een roofdier', 'familie van honden en beren', 520, 700, 0.6, 'left'); },
  e7s30(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    dnaRijen(ctx, 260, 260, [{ naam: 'walvis', seq: 'ATGGCGGTCAAGTTC' }, { naam: 'nijlpaard', seq: 'ATGGCGGTCAAGTTC' }, { naam: 'koe', seq: 'ATGGC---CAAGTTC' }], { ins: [5, 8], toonVerschil: false, cw: 52 });
    naamBij(ctx, 'ingevoegd stukje', 'zelfde plek', 260 + 220 + 52 * 6.5, 220, 1, 'center', C.paars); naamBij(ctx, 'ontbreekt', null, 260 + 220 + 52 * 6.5, 560, 1, 'center');
    naamBij(ctx, 'geërfd van één gemeenschappelijke voorouder', null, 960, 720, 1, 'center', C.goud); },
  e7s31(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    const x0 = 300, y0 = 780, w = 1200, h = 460; ctx.fillStyle = 'rgba(255,255,255,0.03)'; for (let i = 1; i < 6; i++) ctx.fillRect(x0 + i * w / 6, y0 - h, 1.5, h);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x0, y0 - h - 20); ctx.lineTo(x0, y0); ctx.lineTo(x0 + w + 20, y0); ctx.stroke();
    for (let i = 0; i < 14; i++) { const u = (i + 0.5) / 14, v = u * 0.9 + (hash(i * 7) - 0.5) * 0.12; circ(ctx, x0 + u * w, y0 - v * h, 8, rgba(C.paars, 0.8), _lt(C.paars, 0.4), 1.5); }
    ctx.strokeStyle = C.paars; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + w, y0 - 0.9 * h); ctx.stroke();
    circ(ctx, x0 + w * 0.6, y0 - 0.54 * h, 14, C.goud, _lt(C.goud, 0.4), 2); naamBij(ctx, 'fossiel met gemeten leeftijd', 'zet de klok gelijk', x0 + w * 0.6 + 30, y0 - 0.54 * h + 70, 1, 'left', C.goud);
    metaText(ctx, 'verschillen in het dna', x0, y0 - h - 40, C.grain, 'left', 26); metaText(ctx, 'tijd sinds de splitsing →', x0 + w, y0 + 50, C.text2, 'right', 26);
    naamBij(ctx, 'moleculaire klok', null, 1560, 200, 1, 'left', C.paars); },
  e7q32(ctx) { vraagKaart(ctx, ['Twee soorten verschillen in 2% van een gen, twee andere in 4%.', 'Welke splitsing is het langst geleden?'], ['De splitsing met 4% verschil', 'De splitsing met 2% verschil', 'Dat kun je uit procenten niet afleiden'], 7);
    const bx = 1500; roundRect(ctx, bx, 520, 120, 40, 8); shape(ctx, rgba(C.goud, 0.5), C.goud, 2); text(ctx, '2%', bx + 140, 552, fTekst(36, 700), C.text); roundRect(ctx, bx, 600, 240, 40, 8); shape(ctx, rgba(C.goud, 0.5), C.goud, 2); text(ctx, '4%', bx + 260, 632, fTekst(36, 700), C.text); },
  e7s33(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    roundRect(ctx, 300, 340, 420, 70, 12); shape(ctx, rgba(C.goud, 0.45), C.goud, 2); roundRect(ctx, 300, 500, 840, 70, 12); shape(ctx, rgba(C.goud, 0.45), C.goud, 2);
    text(ctx, '2% verschil', 330, 388, fTekst(40, 700), C.text); text(ctx, '4% verschil', 330, 548, fTekst(40, 700), C.text);
    pijl(ctx, 300, 680, 1160, 680, C.line, 1, 3, 16); metaText(ctx, 'tijd sinds de splitsing', 300, 730, C.text2, 'left', 26); naamBij(ctx, '≈ 2× zo lang geleden', 'ongeveer: de klok tikt', 1180, 530, 1, 'left', C.goud); naamBij(ctx, '', 'niet precies gelijk', 1180, 562, 1, 'left'); },
  e7s34(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA'); const X = tijdAsMj(ctx, 200, 640, 1520, 60, 30, { stap: 5 });
    const yT = 640; circ(ctx, X(55), yT, 14, C.paars, _lt(C.paars, 0.4), 2); naamBij(ctx, 'DNA-klok: splitsing', 'walvis en nijlpaard · ±55 mj', X(55), 300, 1, 'center', C.paars); ctx.strokeStyle = C.paars; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(55), 360); ctx.lineTo(X(55), yT - 16); ctx.stroke(); ctx.setLineDash([]);
    circ(ctx, X(50), yT, 14, C.goud, _lt(C.goud, 0.4), 2); pakicetus(ctx, X(50) + 40, 520, 0.36); naamBij(ctx, 'oudste walvisfossiel', 'ongeveer 50 mj', X(50) + 180, 430, 1, 'left', C.goud);
    haak(ctx, X(57), X(48), 760, 'lagen, botten en DNA: hetzelfde verhaal', C.groen); },
  e7s35(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); evoTag(ctx, 7, 'HET SPOOR IN HET DNA');
    cladogram(ctx, 480, 840, 1000, 480, ['zeehond', ['koe', ['nijlpaard', 'walvis']]], { markeer: ['walvis'], tekenBlad: (c, n, x, y, a) => { const f = { zeehond: () => zeehond(c, x, y - 10, 0.36, { a }), koe: () => koe7(c, x, y, 0.32, { a }), nijlpaard: () => nijlpaard(c, x, y, 0.3, { a }), walvis: () => bultrug(c, x, y - 40, 0.2, { a }) }[n]; f && f(); } });
    naamBij(ctx, 'cladogram', 'verder in film 8', 160, 220, 1, 'left', C.goud); },
  e7s36(ctx) { eindKaart(ctx, 7, ['De laag die als eerste werd afgezet, is het oudst.', 'Heupbotjes en vingerbotjes: geërfd van voorouders op het land.', 'Fossielen, homologe botten en DNA vertellen hetzelfde.']); },
};
