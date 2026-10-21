// Wat word jij? · Diergeneeskunde 3 · Van dier naar mens — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Dierenarts Mila, Lotte, Dr. Kim als huisarts, Opa Henk als patiënt, Verpleegkundige Jesse).
// Rode draad: de Q-koortsuitbraak in Brabant.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
const geitKudde = (ctx, x, y, s, a, t, n = 4) => { for (let i = 0; i < n; i++) geit(ctx, x + i * 150 * s, y + (i % 2) * 18 * s, s * (0.9 + (i % 2) * 0.1), { a, t: t + i, kijk: i % 2 ? -1 : 1 }); };

Object.assign(SCENES, {
  title(ctx, t) { brabantKaart(ctx, 1380, 560, 0.8, 1, { pat: 0.6 + 0.05 * Math.sin(t), boer: 1, link: 0.6, t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'BRABANT · VOORJAAR 2009', 120, 160, q.on('voorjaar', 1), C.grain, 'left', 28);
    const K = q.on('Ze', 1, 0.8);
    persoon(ctx, 'kim', 300, 880, 420, { t, uit: 'bezorgd', pose: 'denk', a: q.on('huisartsen', 1, 0.3) * (1 - K * 0.0) }); naamBij(ctx, 'Dr. Kim', 'huisarts', 380, 360, q.on('huisartsen', 1), 'left');
    persoon(ctx, 'henk', 620, 880, 380, { t, uit: 'bezorgd', kijk: -1, a: q.on('mensen', 1, 0.3) }); thermometer(ctx, 760, 620, 150, q.on('koorts', 1), 0.85);
    chip(ctx, 'hoge koorts', 1400, 230, C.koraal, q.on('koorts', 1), 28); chip(ctx, 'hoofdpijn', 1400, 300, C.koraal, q.on('hoofdpijn', 1), 28); chip(ctx, 'longontsteking', 1400, 370, C.koraal, q.on('longontsteking', 1), 28);
    tag(ctx, 'Q-koorts · een bacterie', 1400, 470, C.goud, q.on('blijkt', 1), 'center', 32);
    brabantKaart(ctx, 1400, 690, 0.62, q.on('jaar', 2, 0.6), { pat: clamp((t - q.at('jaar', 2)) / 3, 0, 1), t }); regel(ctx, 'bijna 2500 zieken gemeld', 1400, 860, q.on('tweeduizend', 1), C.koraal, 34, 'center', 800);
    vraagteken(ctx, 960, 300, q.on('vandaan', 1), 120); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const W = q.on('waaien', 1, 0.6);
    stal(ctx, 120, 760, 640, 300, 1); stro(ctx, 100, 760, 700, q.on('stro', 1));
    geit(ctx, 330, 760, 1.15, { t, drachtig: 1 - q.on('verwerpt', 1) }); naamBij(ctx, 'Coxiella', 'bacterie', 1000, 330, q.on('Coxiella', 1), 'left', C.koraal);
    chip(ctx, 'geit zelf nauwelijks ziek', 330, 260, C.text2, q.on('nauwelijks', 1), 26);
    lamDood(ctx, 600, 760, 1.1, q.on('lammetje', 1), q.on('placenta', 1, 2), t); naamBij(ctx, 'placenta', 'vol bacteriën', 560, 580, q.on('placenta', 1), 'left', C.koraal);
    stofWind(ctx, 760, 620, 1700, 560, W * clamp((t - q.at('waaien', 1)) / 3, 0, 1), t, 1);
    huisje(ctx, 1560, 760, 1.2, q.on('ademen', 1)); huisje(ctx, 1760, 760, 1, q.on('ademen', 1));
    chip(ctx, 'kilometers van de stal', 1660, 560, C.goud, q.on('kilometers', 1), 30); },

  s05(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'zoönose', 960, 230, q.on('zoönose', 1), C.goud, 72, 'center', 800); regel(ctx, 'een ziekte die van dieren op mensen overspringt', 960, 300, q.on('zoönose', 1), C.text2, 32, 'center', 600);
    const G = q.on('helft', 1); if (G > 0.01) { for (let i = 0; i < 100; i++) { const xx = 520 + (i % 20) * 44, yy = 360 + Math.floor(i / 20) * 44; circ(ctx, xx, yy, 16 * G, i < 61 ? C.oker : '#3A4458'); } chip(ctx, 'ruim de helft kan ook dieren besmetten', 960, 610, C.oker, G, 28); }
    const D = q.on('hondsdolheid', 1); hond(ctx, 480, 860, 0.9, { t, a: D }); naamBij(ctx, 'hondsdolheid', '', 480, 690, D, 'center');
    const L = q.on('Lyme', 1); teek(ctx, 960, 790, 1.6, L); naamBij(ctx, 'ziekte van Lyme', 'via teken', 960, 700, L, 'center');
    const V = q.on('griepvirussen', 1); kip(ctx, 1330, 860, 1.3, { a: V }); varken(ctx, 1640, 860, 0.85, { t, a: V }); naamBij(ctx, 'griep', 'vogels en varkens', 1490, 640, V, 'center'); },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('slot', 1), V = q.on('vogelgriepvirus', 1, 0.8);
    // virus beweegt naar de cel; links vogelcel (past), rechts mensencel (past niet)
    celRand(ctx, 560, 1180, 520, -2.3, -0.84, 'rond', Math.max(0.3, q.on('cel', 1)), C.oker); naamBij(ctx, V > 0.5 ? 'cel van een vogel' : 'cel', V > 0.5 ? 'receptor past' : 'met receptoren', 560, 790, q.on('cel', 1), 'center');
    const vx = 560, vy = 380 + 120 * S + (V > 0.5 ? 60 : 0) * clamp((t - q.at('vogelgriepvirus', 1)) / 1.5, 0, 1); virusDg(ctx, vx, vy, 46, q.on('virus', 1), C.koraal, t);
    regel(ctx, 'sleutel in een slot', 560, 250, S, C.goud, 40, 'center', 800);
    celRand(ctx, 1380, 1180, 520, -2.3, -0.84, 'hoek', Math.max(0.3, V), C.teal); naamBij(ctx, 'cel in neus en keel', 'mens · receptor past slecht', 1380, 790, q.on('slecht', 1), 'center');
    virusDg(ctx, 1380, 400, 46, q.on('slecht', 1), C.koraal, t); kruis(ctx, 1460, 500, 26, q.on('slecht', 1)); vink_(ctx, 660, 520, 26, V); },

  s07(ctx, t, q) { bg(ctx, 'schema'); const Z = q.on('Waarom', 1, 0.8); metaA(ctx, 'NEDERLAND · 2003 · VOGELGRIEP', 120, 160, Math.max(0.4, q.on('2003', 1)) * (1 - Z), C.grain, 'left', 28);
    ctx.save(); ctx.globalAlpha *= 1 - Z * 0.75;
    stal(ctx, 120, 560, 760, 260, Math.max(0.4, q.on('pluimvee', 1))); for (let i = 0; i < 7; i++) kip(ctx, 190 + i * 100, 560, 0.85, { a: q.on('pluimvee', 1), dood: q.on('gedood', 1) > 0.5 ? 1 : 0, kijk: i % 2 ? -1 : 1 });
    chip(ctx, 'ongeveer 30 miljoen dieren gedood', 500, 650, C.koraal, q.on('miljoen', 1), 28);
    regel(ctx, '89', 1130, 330, q.on('negenentachtig', 1), C.koraal, 96, 'center', 800); regel(ctx, 'virus gevonden', 1130, 390, q.on('oogontsteking', 1), C.text2, 28, 'center', 600); regel(ctx, 'vooral oogontsteking', 1130, 426, q.on('oogontsteking', 1), C.text2, 28, 'center', 600);
    regel(ctx, '± 1000', 1650, 330, q.on('duizend', 1), C.oker, 96, 'center', 800); regel(ctx, 'besmet', 1650, 390, q.on('merkten', 1), C.text2, 28, 'center', 600); regel(ctx, 'vaak zonder klachten', 1650, 426, q.on('merkten', 1), C.text2, 28, 'center', 600);
    tag(ctx, 'één dierenarts overleden', 1400, 520, C.text, q.on('overleed', 1), 'center', 32); ctx.restore();
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; for (let i = 0; i < 5; i++) persoon(ctx, ['noor', 'sam', 'lotte', 'daan', 'henk'][i], 520 + i * 220, 880, 300, { t, uit: 'neutraal', a: 1 }); virusDg(ctx, 960, 300, 40, 1, C.koraal, t); vraagteken(ctx, 1100, 300, q.on('denk', 1), 110); regel(ctx, 'vaker in mensen: waarom een risico?', 960, 200, 1, C.goud, 40, 'center', 800); ctx.restore(); } },

  s09(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const K = q.on('kopieerfouten', 1), P = q.on('pandemie', 1, 0.8), O = q.on('Daarom', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - O;
    const kl = [C.koraal, C.koraal, C.paars, C.koraal, C.goud, C.koraal, C.koraal, C.koraal];
    for (let i = 0; i < 8; i++) { const f = i === 0 ? 1 : clamp(K * 8 - i, 0, 1); virusDg(ctx, 220 + i * 110, 330 + (i % 2) * 70, 26, f, kl[i], t); }
    const B = q.on('beter', 1); if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; circ(ctx, 660, 400, 60, null, C.goud, 4); ctx.restore(); }
    const M = q.on('vermenigvuldigt', 1); for (let i = 0; i < 9; i++) virusDg(ctx, 1200 + (i % 3) * 120, 300 + Math.floor(i / 3) * 120, 26, clamp(M * 9 - i, 0, 1), C.goud, t);
    tag(ctx, 'film: Selectie van dichtbij', 640, 620, C.teal, q.on('Selectie', 1), 'center', 28); chip(ctx, 'variant die beter past wint', 1320, 660, C.goud, M, 28);
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; for (let i = 0; i < 3; i++) persoon(ctx, ['sam', 'noor', 'bilal'][i], 1000 + i * 180, 880, 220, { t, uit: 'bezorgd' }); pijl(ctx, 1060, 690, 1150, 690, C.koraal, 1, 4, 14); pijl(ctx, 1240, 690, 1330, 690, C.koraal, 1, 4, 14); tag(ctx, 'van mens op mens: pandemie', 1180, 590, C.koraal, 1, 'center', 30); ctx.restore(); }
    ctx.restore();
    if (O > 0.01) { kip(ctx, 360, 760, 1.5, { a: O, dood: 1 }); naamBij(ctx, 'dode vogels', 'onderzocht', 360, 520, O, 'center'); vos(ctx, 960, 760, 1.6, q.on('vossen', 1)); naamBij(ctx, 'vos', 'zoogdier', 980, 520, q.on('vossen', 1), 'center'); zeehond(ctx, 1520, 760, 1.6, q.on('zeehonden', 1)); naamBij(ctx, 'zeehond', 'zoogdier', 1520, 600, q.on('zeehonden', 1), 'center'); } },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); const A = Math.max(0.6, q.on('artsen', 1)), D = Math.max(0.6, q.on('dierenartsen', 1));
    loket(ctx, 140, 220, 760, 580, 'artsen', A, C.teal); persoon(ctx, 'kim', 360, 760, 360, { t, a: A, uit: 'bezorgd' }); persoon(ctx, 'henk', 660, 760, 320, { t, a: A, kijk: -1, uit: 'bezorgd' }); thermometer(ctx, 780, 600, 110, A);
    loket(ctx, 1020, 220, 760, 580, 'dierenartsen', D, C.oker); persoon(ctx, 'mila', 1220, 760, 360, { t, a: D, outfit: 'stal', uit: 'bezorgd' }); geit(ctx, 1520, 760, 0.95, { t, a: D }); lamDood(ctx, 1640, 760, 0.7, q.on('verwerpende', 1), 0, t);
    const M = q.on('bij', 1); if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; ctx.fillStyle = '#5A4A3A'; for (let r = 0; r < 8; r++) for (let c = 0; c < 2; c++) { roundRect(ctx, 930 + c * 30 + (r % 2) * 15, 230 + r * 70, 28, 64, 4); ctx.fill(); } ctx.restore(); chip(ctx, 'gegevens kwamen niet bij elkaar', 960, 860, C.koraal, M, 28); }
    tag(ctx, '2008: meldplicht voor Q-koorts bij geiten', 960, 170, C.goud, q.on('2008', 1), 'center', 32); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('aantal', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - G;
    const k1 = q.on('maatregelen', 1), k2 = q.on('tank', 1), k3 = q.on('drachtige', 1);
    geit(ctx, 330, 700, 1.1, { t, a: k1 }); spuit(ctx, 300, 420, 1.2, k1, 0.5); regel(ctx, 'vaccineren', 330, 300, k1, C.teal, 38, 'center', 800);
    melkTank(ctx, 900, 700, 1.3, k2, q.on('onderzocht', 1)); regel(ctx, 'tankmelk testen', 960, 300, k2, C.teal, 38, 'center', 800);
    for (let i = 0; i < 3; i++) geit(ctx, 1330 + i * 190, 700, 0.75, { t: t + i, a: k3 * (1 - 0.6 * q.on('gedood', 1)), drachtig: 1 }); regel(ctx, 'drachtige dieren ruimen', 1570, 300, k3, C.koraal, 38, 'center', 800); chip(ctx, 'meer dan 50.000', 1570, 400, C.koraal, q.on('vijftigduizend', 1), 30);
    ctx.restore();
    if (G > 0.01) { staafGrafiek(ctx, 300, 760, 820, 460, [195 / 2424, 1003 / 2424, 1, 411 / 2424], ['2007', '2008', '2009', '2010'], G, clamp((t - q.at('aantal', 1)) / 2, 0, 1), C.koraal, 'GEMELDE ZIEKEN PER JAAR');
      regel(ctx, '2424', 300 + 820 * 0.625, 760 - 460 - 14, G, C.koraal, 30, 'center', 800); chip(ctx, 'daarna sterk gedaald', 760, 220, C.groen, q.on('daalde', 1), 28);
      persoon(ctx, 'henk', 1500, 880, 400, { t, a: q.on('klachten', 1), uit: 'bezorgd', pose: 'schouders' }); chip(ctx, 'sommigen nu nog: ernstige vermoeidheid', 1500, 360, C.oker, q.on('vermoeidheid', 1), 28); } },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('antibiotica', 1, 0.8);
    oneHealth(ctx, 960, 470, 230, 1 - M, q.on('geheel', 1), t); regel(ctx, 'One Health', 960, 170, q.on('Health', 1) * (1 - M), C.goud, 60, 'center', 800);
    if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; tag(ctx, 'film: Welk antibioticum? · MRSA', 480, 220, C.teal, q.on('Welk', 1), 'center', 28);
      varken(ctx, 480, 640, 1.1, { t, a: q.on('varkens', 1) }); naamBij(ctx, 'MRSA-variant', 'varkens en kalveren', 480, 400, q.on('variant', 1), 'center', C.goud);
      ziekenhuisBed(ctx, 1500, 760, 1.2, q.on('ziekenhuis', 1)); persoon(ctx, 'gerrit', 1150, 880, 400, { t, a: q.on('varkenshouder', 1, 0.3), outfit: 'gewoon', uit: 'verbaasd' }); naamBij(ctx, 'varkenshouder', 'opgenomen', 1150, 440, q.on('varkenshouder', 1), 'center'); persoon(ctx, 'jesse', 1420, 880, 380, { t, a: q.on('getest', 1), pose: 'vasthouden', kijk: -1, hold: (c, x, y) => wattenstaafje(c, x, y, Math.PI) }); chip(ctx, 'eerst testen', 1480, 400, C.teal, q.on('getest', 1), 28);
      vraagteken(ctx, 1000, 360, q.on('juist', 1), 110); ctx.restore(); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const V = q.on('veehouder', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - V;
    persoon(ctx, 'gerrit', 220, 880, 420, { t, uit: 'blij' }); neusMRSA(ctx, 560, 380, 150, q.on('neus', 1), t); pijl(ctx, 290, 520, 420, 440, C.goud, q.on('neus', 1), 3, 12); naamBij(ctx, 'MRSA in de neus', 'niet ziek', 560, 590, q.on('neus', 1), 'center', C.goud);
    ziekenhuisBed(ctx, 1150, 760, 1.2, q.on('kwetsbare', 1)); persoon(ctx, 'henk', 1400, 880, 360, { t, a: q.on('kwetsbare', 1), uit: 'bezorgd', kijk: -1 }); pijl(ctx, 720, 470, 1020, 600, C.koraal, q.on('doorgeven', 1), 5, 18); chip(ctx, 'kwetsbare patiënt', 1300, 440, C.koraal, q.on('kwetsbare', 1), 28);
    chip(ctx, 'meer antibiotica bij dieren → meer resistente bacteriën', 960, 840, C.oker, q.on('resistente', 1), 28); ctx.restore();
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; persoon(ctx, 'mila', 300, 880, 420, { t, uit: 'blij', pose: 'vasthouden', hold: (c, x, y) => recept(c, x + 30, y - 20, 0.6, 1) }); naamBij(ctx, 'vaste dierenarts', 'alleen zij schrijft voor', 300, 370, 1, 'center'); persoon(ctx, 'gerrit', 560, 880, 400, { t, a: q.on('samen', 1, 0.4), kijk: -1, uit: 'blij' });
      chip(ctx, 'samen: gezondheidsplan', 430, 260, C.teal, q.on('gezondheidsplan', 1), 28);
      lijnGrafiek(ctx, 900, 760, 860, 440, [[2009, 1], [2011, 0.68], [2013, 0.42], [2015, 0.4], [2017, 0.36], [2019, 0.31], [2021, 0.27], [2023, 0.25], [2025, 0.23]], q.on('Sinds', 1), clamp((t - q.at('Sinds', 1)) / 3, 0, 1), C.groen, { ylab: 'ANTIBIOTICA IN DE VEEHOUDERIJ (2009 = 100 %)' });
      chip(ctx, 'ruim driekwart minder', 1500, 300, C.groen, q.on('driekwart', 1), 30); ctx.restore(); } },

  // ---------- Recap ----------
  s15(ctx, t, q) { bg(ctx, 'schema'); stal(ctx, 100, 760, 560, 240, 1); for (let i = 0; i < 3; i++) geit(ctx, 190 + i * 170, 760, 0.6, { t: t + i }); stofWind(ctx, 680, 640, 1150, 640, 1, t, Math.max(0.5, q.on('ziek', 1)));
    brabantKaart(ctx, 1380, 400, 0.5, Math.max(0.5, q.on('Brabant', 1)), { pat: 1, boer: 1, t }); chip(ctx, 'oplossing bij de dieren', 1380, 560, C.groen, q.on('oplossing', 1), 28);
    persoon(ctx, 'mila', 1560, 880, 360, { t, outfit: 'stal', uit: 'blij', a: q.on('dierenarts', 1, 0.3) }); persoon(ctx, 'lotte', 1760, 880, 320, { t, kijk: -1, uit: 'blij', a: q.on('dierenarts', 1, 0.3) }); regel(ctx, 'voor dier én mens', 760, 230, q.on('mensen', 1), C.goud, 44, 'center', 800); },
  s16(ctx, t, q) { bg(ctx, 'schema'); kaartje(ctx, 160, 260, 480, 'praktijk', C.teal, q.on('praktijk', 1), 34); kaartje(ctx, 720, 260, 480, 'overheid', C.oker, q.on('overheid', 1), 34); kaartje(ctx, 1280, 260, 480, 'laboratorium', C.paars, q.on('laboratorium', 1), 34);
    regel(ctx, 'dieren behandelen', 400, 400, q.on('praktijk', 1), C.text2, 28, 'center', 600); regel(ctx, 'dierziekten opsporen, voedsel controleren', 960, 400, q.on('controleert', 1), C.text2, 28, 'center', 600); regel(ctx, 'uitbraken onderzoeken', 1520, 400, q.on('onderzoekt', 1), C.text2, 28, 'center', 600);
    persoon(ctx, 'mila', 960, 880, 360, { t, uit: 'blij', pose: 'wijs' }); tag(ctx, 'start: Diergeneeskunde in Utrecht', 960, 520, C.goud, q.on('Utrecht', 1), 'center', 32); }
});
