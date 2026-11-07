// Wat word jij? · Geneeskunde · Wat de patholoog ziet — scènes per alinea (v1.0, 20 okt 2026). Look: Schema en Micro, met cast (Mevrouw Visser als patiënt, Dr. Kim als patholoog).
// Rode draad: een moedervlek die verandert.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
// Dr. Kim aan de microscoop op een labtafel; x = Kim, microscoop rechts van haar
function kimMicroscoop(ctx, t, x, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 560;
  persoon(ctx, 'kim', x, 880, h, { t, outfit: 'lab', kijk: 1, uit: o.uit || 'neutraal', pose: o.pose || 'staan' });
  labTafel(ctx, x + 30 * s, 880 - 250 * s, 330 * s); labMicroscoop(ctx, x + 230 * s, 880 - 250 * s, 0.95 * s, 1, -1, o.licht || 0);
  if (o.glaasje != null) glaasje(ctx, x + 205 * s - (1 - o.glaasje) * 140 * s, 880 - 250 * s - 128 * 0.95 * s - 6 * s - (1 - o.glaasje) * 60 * s, 0.22 * s, 1, 1);
  ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { coupe(ctx, 1690, 610, 220, t, { soort: 'melanoom' }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('huisarts', 1);
    const PV = persoon(ctx, 'visser', 330, 880, 640, { t, kijk: 1, uit: t > q.at('groter', 1) ? 'verbaasd' : 'neutraal', pose: 'staan' }); if (PV.handR) moedervlek(ctx, PV.handR.x, PV.handR.y - 80, 6, clamp((t - q.at('groter', 1) + 0.3) / 2.5, 0, 1));
    naamBij(ctx, 'Mevrouw Visser', '', 160, 200, q.on('Visser', 1, 0.4));
    const u = clamp((t - q.at('groter', 1) + 0.3) / 2.5, 0, 1);
    armPaneel(ctx, 700, 190, 500, 300, q.on('moedervlek', 1, 0.4), 0, 'vroeger'); armPaneel(ctx, 1260, 190, 500, 300, q.on('verandert', 1, 0.4), u, 'nu');
    chip(ctx, 'groter', 1330, 560, C.goud, q.on('groter', 1), 28); chip(ctx, 'grillige rand', 1510, 560, C.goud, q.on('grillig', 1), 28); chip(ctx, 'twee kleuren', 1700, 560, C.goud, q.on('kleuren', 1), 28);
    tag(ctx, 'huisarts', 820, 770, C.teal, B, 'center', 30); pijl(ctx, 920, 755, 1000, 755, C.line, q.on('dermatoloog', 1), 4, 16);
    tag(ctx, 'dermatoloog', 1130, 770, C.teal, q.on('dermatoloog', 1), 'center', 30); pijl(ctx, 1270, 755, 1350, 755, C.line, q.on('lab', 1), 4, 16);
    potje(ctx, 1440, 790, 0.7, q.on('weg', 1), t, 1); regel(ctx, 'naar het lab', 1540, 770, q.on('lab', 1), C.text, 30, 'left', 700);
    vraagteken(ctx, 1810, 400, q.on('Wie', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const K = 1 - q.on('herhalen', 1, 0.6);
    if (K > 0.01) { kimMicroscoop(ctx, t, 1180, 600, K, { licht: 1 }); naamBij(ctx, 'Dr. Kim', 'patholoog', 1150, 220, q.on('patholoog', 1) * K, 'center'); regel(ctx, 'arts die ziekten herkent in weefsel', 600, 500, q.on('arts', 1) * K, C.text, 40, 'center', 700); }
    const H = q.on('herhalen', 1, 0.6); if (H < 0.01) return;
    const hl = t >= q.at('zenuwweefsel', 1) ? 'zenuw' : t >= q.at('spierweefsel', 1) ? 'spier' : t >= q.at('bindweefsel', 1) ? 'bind' : t >= q.at('Dekweefsel', 1) ? 'dek' : null;
    const hlF = t < q.at('huid', 1) + 0.6 ? hl : (t >= q.at('pigmentcellen', 1) && t < q.at('kleurstof', 1) ? 'pig' : null);
    const g = huidSchema(ctx, 140, 200, 1180, 660, t, { a: H, hl: hlF, nest: q.on('groepje', 1, 1.2), mel: clamp((t - q.at('melanoom', 1)) / 2.5, 0, 1), kap: q.on('beschermt', 1, 1.2) });
    tag(ctx, 'film: Van cel tot lichaam', 1640, 200, C.teal, H * q.on('herhalen', 1), 'center', 26);
    const ym = (g.yS + g.eB(1320)) / 2;
    naamBij(ctx, 'opperhuid', 'dekweefsel', 1350, ym + 10, H * q.on('Dekweefsel', 1));
    naamBij(ctx, 'lederhuid', 'bindweefsel', 1350, 800, H * q.on('bindweefsel', 1));
    naamBij(ctx, 'haarspiertje', 'spierweefsel', g.mx - 165, g.my + 130, H * q.on('spierweefsel', 1) * (1 - q.on('melanoom', 1)), 'center');
    naamBij(ctx, 'zenuwuiteinde', 'zenuwweefsel', g.zx + 60, 780, H * q.on('zenuwweefsel', 1));
    naamBij(ctx, 'pigmentcellen', 'onderin de opperhuid', g.zx + 30, g.eB(g.zx + 30) - 76, H * q.on('pigmentcellen', 1) * (1 - q.on('groepje', 1)));
    zon(ctx, 1660, 380, 50, H * q.on('zon', 1), t);
    naamBij(ctx, 'moedervlek', 'groepje pigmentcellen', g.nx, g.ny + 120, H * q.on('groepje', 1) * (1 - q.on('melanoom', 1)), 'center');
    naamBij(ctx, 'melanoom', 'pigmentcellen delen ongeremd', g.nx, g.ny + 190, H * q.on('melanoom', 1), 'center', C.koraal); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('microscoop', 1, 0.8), A = 1 - M;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A;
      const p1 = q.on('formaline', 1), p2 = q.on('paraffine', 1), p3 = q.on('plakjes', 1), p4 = q.on('coupe', 1);
      potje(ctx, 300, 470, 1.15, q.on('lab', 1), t, 1); naamBij(ctx, 'formaline', 'fixeren', 300, 660, p1, 'center');
      chip(ctx, 'bederft niet · cellen blijven in vorm', 330, 780, C.groen, q.on('bederft', 1), 26);
      pijl(ctx, 460, 450, 540, 450, C.line, p2, 4, 16); paraffineBlok(ctx, 700, 500, 1.1, p2); naamBij(ctx, 'paraffine', 'kaarsvet', 700, 660, p2, 'center');
      pijl(ctx, 860, 450, 940, 450, C.line, p3, 4, 16); microtoom(ctx, 1130, 540, 0.9, p3, t, clamp((t - q.at('plakjes', 1)) / 2.5, 0, 1), 1); naamBij(ctx, 'snijden', 'flinterdun', 1130, 660, p3, 'center');
      chip(ctx, 'dunner dan een cel', 1130, 780, C.goud, q.on('Dunner', 1), 26);
      pijl(ctx, 1330, 450, 1410, 450, C.line, p4, 4, 16); glaasje(ctx, 1600, 470, 1, p4, 0); naamBij(ctx, 'coupe', 'plakje op een glaasje', 1600, 660, p4, 'center');
      ctx.restore(); }
    if (M > 0.01) { labTafel(ctx, 160, 700, 560, M); labMicroscoop(ctx, 440, 700, 1.25, M, 1, 1); coupe(ctx, 1150, 470, 330, t, { a: M, kern: 0, rest: 0 });
      regel(ctx, 'bijna niets te zien', 1150, 860, q.on('niets', 1) * M, C.text2, 34, 'center', 700); vraagteken(ctx, 1640, 300, q.on('Waarom', 1), 110); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const B = q.on('stappen', 1, 0.8);
    const kk = clamp((t - q.at('kernen', 1) + 0.2) / 1.5, 0, 1), rr = clamp((t - q.at('roze', 1) + 0.2) / 1.5, 0, 1);
    coupe(ctx, 560, 500, 320, t, { kern: kk, rest: rr });
    naamBij(ctx, 'bijna doorzichtig', '', 560, 880 - 10, q.on('doorzichtig', 1) * (1 - kk), 'center', C.text2);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; const kb = q.on('kleurstoffen', 1);
      kleurBak(ctx, 1220, 520, 1.1, kb, HE.paars, t); naamBij(ctx, 'hematoxyline', 'kernen blauwpaars', 1220, 660, kb * q.on('kernen', 1), 'center');
      kleurBak(ctx, 1600, 520, 1.1, kb, '#E27AA0', t); naamBij(ctx, 'eosine', 'de rest roze', 1600, 660, kb * q.on('roze', 1), 'center'); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B;
      regel(ctx, 'gewone coupe', 1000, 300, 1, C.text, 34, 'left', 700); balk(ctx, 1000, 330, 780, clamp((t - q.at('stappen', 1)) / 1.5, 0, 1), C.oker, ''); regel(ctx, 'een paar dagen', 1780, 410, q.on('dagen', 1), C.oker, 30, 'right', 700);
      const v = q.on('operatie', 1); if (v > 0.01) { regel(ctx, 'vriescoupe', 1060, 560, v, C.text, 34, 'left', 700); sneeuwvlok(ctx, 1020, 548, 26, v); balk(ctx, 1000, 590, 780, 0.06 * clamp((t - q.at('vriest', 1)) / 1, 0, 1), '#BFE3F4', ''); regel(ctx, '± een half uur', 1060, 680, q.on('half', 1), '#BFE3F4', 30, 'left', 700); }
      chip(ctx, 'tijdens een operatie: de chirurg wacht', 1390, 780, C.goud, q.on('chirurg', 1), 26); ctx.restore(); } },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('Links', 1, 0.8);
    const kx = lerp(560, 200, L), kh = lerp(620, 500, L);
    kimMicroscoop(ctx, t, kx, kh, 1, { licht: 1, glaasje: clamp((t - q.at('glaasje', 1)) / 1.2, 0, 1), uit: 'neutraal' });
    naamBij(ctx, 'Dr. Kim', 'patholoog', kx - 20, 880 - kh * 1.1 - 30, q.on('Kim', 1, 0.4) * (1 - L), 'center');
    const a1 = q.on('Links', 1), a2 = q.on('Rechts', 1);
    coupe(ctx, 880, 470, 240, t, { a: a1, soort: 'gewoon' }); naamBij(ctx, 'gewone moedervlek', 'kleine cellen · gelijke kernen', 880, 770, a1, 'center');
    coupe(ctx, 1480, 470, 240, t, { a: a2, soort: 'melanoom' }); naamBij(ctx, 'Mevrouw Visser', 'het weggehaalde stukje', 1480, 770, a2, 'center');
    vraagteken(ctx, 1800, 300, q.on('kenmerken', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c');
    const dl = q.on('deling', 1), kn = q.on('kernen', 1), om = q.on('omhoog', 1), dp = q.on('beneden', 1), me = q.on('meet', 1);
    const g = coupe(ctx, 640, 500, 340, t, { soort: 'melanoom', deling: dl * (1 - kn * 0.7), kernen: kn * (1 - om * 0.7), meet: me ? clamp((t - q.at('meet', 1)) / 1.5, 0, 1) : 0, vat: q.on('kans', 1) });
    pijl(ctx, 600, 400, 600, 270, C.goud, om * (1 - me), 6, 22); pijl(ctx, 640, 560, 640, 720, C.goud, dp * (1 - me), 6, 22);
    tag(ctx, 'film: Mutaties', 1440, 210, C.teal, q.on('Mutaties', 2), 'center', 26);
    chip(ctx, 'rem op delen kwijt', 1440, 300, C.koraal, q.on('rem', 1), 28);
    chip(ctx, 'veel delingen', 1440, 390, C.goud, dl, 28); chip(ctx, 'grote, ongelijke kernen', 1440, 480, C.koraal, kn, 28); chip(ctx, 'groei omhoog en de diepte in', 1440, 570, C.goud, om, 28);
    naamBij(ctx, 'dikte', 'in millimeters', 640 - 340 - 50, 470, me, 'right', C.goud);
    chip(ctx, 'hoe dieper, hoe groter de kans', 1440, 700, C.goud, q.on('dieper', 1), 28); chip(ctx, 'via bloed of lymfe verder', 1440, 790, C.koraal, q.on('kans', 1), 28); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('verslag', 1, 0.8), Cc = q.on('bespreken', 1, 0.8), D = q.on('Visser', 1, 0.8);
    const A1 = 1 - B; // liniaal en randen
    coupe(ctx, 400, 440, 250, t, { a: 1 - Cc, soort: 'melanoom', meet: 1 }); naamBij(ctx, '0,6 mm', 'dikte', 400 - 250 - 14, 470, 1 - Cc, 'right', C.goud);
    liniaal(ctx, 820, 290, 300, 3, A1 * q.on('nul', 1), 0.6, clamp((t - q.at('zes', 1)) / 1, 0, 1)); regel(ctx, '0,6 mm', 820 + 300 * 0.6 / 2, 240, A1 * q.on('zes', 1), C.goud, 34, 'center', 800);
    chip(ctx, 'vroeg ontdekt', 1560, 460, C.groen, A1 * q.on('vroeg', 1), 30);
    excisie(ctx, 1150, 640, 0.75, A1 * q.on('randen', 1), q.on('vrij', 1)); naamBij(ctx, 'snijrand vrij', '', 1340, 760, A1 * q.on('vrij', 1), 'left', C.groen); vink_(ctx, 1420, 700, 22, A1 * q.on('vrij', 1));
    const vx = 1240, vy = 190; verslag(ctx, vx, vy, 540, 400 , B, [['Wat is het?', 'melanoom', q.on('wat', 1)], ['Hoe diep?', '0,6 mm', q.on('diep', 2)], ['Helemaal eruit?', 'snijranden vrij', q.on('helemaal', 1)]]);
    vink_(ctx, vx + 470, vy + 330, 20, B * q.on('helemaal', 1));
    const O = Cc * (1 - D); if (O > 0.01) { persoon(ctx, 'kim', 230, 880, 520, { t, outfit: 'lab', a: O, kijk: 1, uit: 'neutraal', pose: 'wijs' });
      scherm(ctx, 470, 260, 420, 250, O, () => coupe(ctx, 680, 385, 200, t, { soort: 'melanoom', meet: 1 }));
      overlegTafel(ctx, 300, 720, 900, O, ['dermatoloog', 'chirurg', 'patholoog'], [q.on('dermatoloog', 1), q.on('chirurg', 1), q.on('patholoog', 1)]); }
    if (D > 0.01) { persoon(ctx, 'visser', 380, 880, 600, { t, a: D, kijk: 1, uit: 'blij' });
      chip(ctx, 'kleine extra operatie · veilige rand', 840, 480, C.teal, D * q.on('operatie', 1), 28); chip(ctx, 'regelmatig controle', 840, 600, C.teal, D * q.on('controle', 1), 28); } },

  // ---------- Recap ----------
  s12(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'visser', 250, 880, 480, { t, kijk: 1, uit: 'blij' }); armPaneel(ctx, 110, 180, 300, 180, q.on('moedervlek', 1), 1, '');
    const kk = (w, n) => q.on(w, n || 1);
    oogIcoon(ctx, 640, 520, 0.9, kk('oog')); regel(ctx, 'het oog van de dermatoloog', 640, 600, kk('oog'), C.text2, 26, 'center', 700); kruis(ctx, 640, 520, 46, q.on('dermatoloog', 1));
    bloedBuis(ctx, 950, 520, 0.9, kk('bloedtest')); regel(ctx, 'een bloedtest', 950, 600, kk('bloedtest'), C.text2, 26, 'center', 700); kruis(ctx, 950, 520, 46, kk('bloedtest'));
    const P = kk('plakje');
    potje(ctx, 560, 290, 0.6, P, t, 1); paraffineBlok(ctx, 800, 300, 0.6, P * clamp((t - q.at('plakje', 1)) * 2 - 0.5, 0, 1)); microtoom(ctx, 1060, 320, 0.5, P * clamp((t - q.at('plakje', 1)) * 2 - 1, 0, 1), t, 1, 0); glaasje(ctx, 1330, 280, 0.7, P * clamp((t - q.at('plakje', 1)) * 2 - 1.5, 0, 1), 1);
    vink_(ctx, 1480, 280, 26, q.on('antwoord', 1));
    const K = q.on('patholoog', 1, 0.5); kimMicroscoop(ctx, t, 1380, 460, K, { licht: 1 }); naamBij(ctx, 'Dr. Kim', 'patholoog', 1370, 380, K, 'center');
    chip(ctx, 'bijna elke diagnose kanker', 1110, 730, C.goud, q.on('diagnose', 1), 26); },

  s13(ctx, t, q) { bg(ctx, 'schema'); const g1 = q.on('geneeskunde', 1), g2 = q.on('vijf', 1), an = q.on('analisten', 1);
    balk(ctx, 140, 280, 720, clamp((t - q.at('zes', 1)) / 1.2, 0, 1), C.teal, ''); regel(ctx, '6 jaar geneeskunde', 140, 250, g1, C.text, 32, 'left', 700); regel(ctx, 'arts', 860, 370, g1, C.text2, 26, 'right', 700);
    balk(ctx, 880, 280, 600, clamp((t - q.at('vijf', 1)) / 1.2, 0, 1), C.paars, ''); regel(ctx, '+ 5 jaar opleiding tot patholoog', 880, 250, g2, C.text, 32, 'left', 700);
    persoon(ctx, 'kim', 1700, 880, 600, { t, outfit: 'lab', a: q.on('Patholoog', 1, 0.4), kijk: -1, uit: 'blij' });
    microtoom(ctx, 420, 700, 0.8, an, t, 1, 1); kleurBak(ctx, 760, 700, 0.75, an, HE.paars, t); kleurBak(ctx, 960, 700, 0.75, an, '#E27AA0', t);
    naamBij(ctx, 'analist', 'snijdt en kleurt de coupes', 660, 460, an, 'center');
    chip(ctx, 'mbo', 1180, 640, C.groen, q.on('mbo', 1), 30); chip(ctx, 'hbo', 1180, 740, C.groen, q.on('hbo', 1), 30); }
});
