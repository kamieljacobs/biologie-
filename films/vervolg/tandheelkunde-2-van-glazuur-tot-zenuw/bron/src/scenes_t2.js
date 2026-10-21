// Wat word jij? · Tandheelkunde 2 · Van glazuur tot zenuw — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Tandarts Wouter; Lotte als patiënt).
// Rode draad: één gaatje in een kies van Lotte, van de eerste foto tot de vulling.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
// wissel tussen twee delen: eerst oud weg, dan nieuw (één beeld tegelijk)
function wisselA(u) { return [clamp(1 - u * 2, 0, 1), clamp(u * 2 - 1, 0, 1)]; }

Object.assign(SCENES, {
  title(ctx, t) { kiesT2(ctx, 1560, 600, 0.8, { t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('jaar', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'lotte', 760, 880, 520, { t, outfit: 'gewoon', kijk: 1, pose: 'vasthouden', uit: t > q.at('steek', 1) ? 'huilt' : 'blij', hold: ijsjeHold(t > q.at('hap', 1) + 0.4 ? 1 : 0) });
      steek(ctx, 870, 470, 1, q.on('steek', 1, 0.2) * (0.75 + 0.25 * Math.sin(t * 12)));
      kiesT2(ctx, 1380, 520, 0.62, { t, gaatje: 2, a: q.on('kies', 1) }); naamBij(ctx, 'een kies van Lotte', '', 1380, 830, q.on('kies', 1), 'center'); });
    laag(ctx, B, () => { metaA(ctx, 'EEN JAAR GELEDEN', 160, 200, 1, C.grain, 'left', 28);
      tandStoel(ctx, 620, 880); persoon(ctx, 'lotte', 980, 880, 470, { t, outfit: 'gewoon', kijk: 1, uit: 'blij' }); chip(ctx, 'nergens last van', 980, 340, C.groen, q.on('nergens', 1), 28);
      kiesT2(ctx, 1500, 520, 0.6, { t, gaatje: 1 }); naamBij(ctx, 'toch al een gaatje', '', 1500, 830, q.on('gaatje', 1), 'center'); vraagteken(ctx, 1500, 260, q.on('Waarom', 1), 100); }); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); kiesT2(ctx, 760, 500, 0.95, { t, a: clamp(t / 0.6, 0, 1) }); },

  s05(ctx, t, q) { bg(ctx, 'schema');
    const G = q.on('glazuur', 1), T = q.on('tandbeen', 1), P = q.on('pulpa', 1), R = q.on('wortel', 1);
    const hl = t < q.at('Daaronder', 1) ? 'glazuur' : t < q.at('Midden', 1) ? 'tandbeen' : t < q.at('wortel', 1) ? 'pulpa' : 'wortel';
    kiesT2(ctx, 640, 500, 0.95, { t, hl: t > 0.6 ? hl : null, kanaal: T });
    kiesLabels(ctx, 640, 500, 0.95, { glazuur: G, tandbeen: T, pulpa: P, zenuw: q.on('zenuw', 2), bloedvat: q.on('bloedvaatjes', 1), kaakbot: q.on('kaakbot', 1), wortelvlies: q.on('vlies', 1), wortel: R });
    // zooms rechts, één tegelijk
    const z1 = q.on('kristallen', 1) * (1 - q.on('Daaronder', 1)), z2 = q.on('kanaaltjes', 1) * (1 - q.on('Midden', 1)), z3 = q.on('vlies', 1);
    const K = kiesPunt(640, 500, 0.95, 'glazuur'), D = kiesPunt(640, 500, 0.95, 'tandbeen'), V = kiesPunt(640, 500, 0.95, 'wortelvlies');
    zoomCircle(ctx, 1450, 430, 260, K.x, K.y, '', z1, () => kristallen(ctx, 1450, 430, 260, 1));
    laag(ctx, z1, () => { naamBij(ctx, 'kristallen', 'calcium en fosfaat', 1450, 750, q.on('calcium', 1), 'center'); chip(ctx, 'geen cellen · geen zenuwen', 1450, 860, C.koraal, q.on('zenuwen', 1), 28); });
    zoomCircle(ctx, 1450, 430, 260, D.x, D.y, '', z2, () => { ctx.save(); ctx.translate(1450, 430); ctx.rotate(-0.15); ctx.translate(-1450, -430); for (let k = -3; k <= 3; k++) kanaaltjeMini(ctx, 1180, 1720, 430 + k * 78, 1); ctx.restore(); });
    laag(ctx, z2, () => naamBij(ctx, 'kanaaltjes met vocht', '', 1450, 750, q.on('vocht', 1), 'center'));
    zoomCircle(ctx, 1450, 430, 260, V.x, V.y, '', z3, () => vliesZoom(ctx, 1450, 430, 260, 1, t));
    laag(ctx, z3, () => { naamBij(ctx, 'wortel', '', 1250, 470, 1, 'center'); naamBij(ctx, 'kaakbot', '', 1630, 470, 1, 'center'); naamBij(ctx, 'wortelvlies', 'stevige vezels', 1450, 750, q.on('vezels', 1), 'center'); }); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const [F0, F] = wisselA(q.on('felle', 1, 1));
    const g = t < q.at('tandbeen', 1) ? 1 : 2; const S = 0.72, kx = 360, ky = 470;
    kiesT2(ctx, kx, ky, S, { t, gaatje: g, a: 1 - q.on('felle', 1, 1) * 0.6 });
    tag(ctx, 'merk je niets', kx, 140, C.groen, q.on('merk', 1) * (1 - q.on('tandbeen', 1)), 'center', 30);
    const Z = q.on('prikkel', 1) * F0;
    const D = kiesPunt(kx, ky, S, 'gaatje2');
    laag(ctx, Z, () => { ctx.strokeStyle = rgba(C.goud, 0.7); ctx.lineWidth = 2; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(D.x, D.y); ctx.lineTo(760, 330); ctx.moveTo(D.x, D.y); ctx.lineTo(760, 630); ctx.stroke(); ctx.setLineDash([]);
      const bw = q.on('bewegen', 1, 1.5) * (1 - q.on('zenuwuiteinden', 1, 3) * 0.3);
      kanaaltje(ctx, 800, 1430, 480, 1, { t, beweeg: q.on('Kou', 1, 2) + bw, kou: q.on('Kou', 1), zenuw: q.on('zenuwuiteinden', 1) });
      naamBij(ctx, 'glazuurkant', '', 800, 690, 1, 'left'); naamBij(ctx, 'pulpa', '', 1500, 690, 1, 'center'); naamBij(ctx, 'zenuwuiteinde', '', 1300, 400, q.on('zenuwuiteinden', 1), 'center');
      const B = q.on('signaal', 1); brein(ctx, 1640, 240, 0.42, B, { t, gloed: q.on('hersenen', 1) }); naamBij(ctx, 'hersenen', '', 1640, 150, B, 'center'); signaalPad(ctx, [[1550, 540], [1620, 450], [1640, 320]], B, t);
      tag(ctx, 'film: Het kabelnetwerk', 1100, 830, C.teal, q.on('kabelnetwerk', 1), 'center', 28); });
    laag(ctx, F, () => { persoon(ctx, 'lotte', 1250, 880, 500, { t, outfit: 'gewoon', kijk: -1, pose: 'vasthouden', uit: 'huilt', hold: ijsjeHold(1) }); steek(ctx, 1150, 460, 1, 0.75 + 0.25 * Math.sin(t * 12)); chip(ctx, 'felle, korte steek', 1250, 250, C.goud, 1, 30); }); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Daarom', 1, 1));
    laag(ctx, A, () => { tandLamp(ctx, 640, 230, 1, q.on('lamp', 1), 0.25); persoon(ctx, 'wouter', 420, 880, 520, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: spiegelHold }); naamBij(ctx, 'Tandarts Wouter', '', 230, 330, q.on('Wouter', 1));
      kiezenRij(ctx, 1280, 520, 0.55, { t, witPlek: q.on('plekje', 1), tussen: q.on('tussen', 1) });
      naamBij(ctx, 'dof, wit plekje', 'ontkalking', 1060, 250, q.on('plekje', 1), 'center');
      tag(ctx, 'film: Zuur in je mond', 1280, 840, C.teal, q.on('Zuur', 1) * (1 - q.on('tussen', 1)), 'center', 28);
      laag(ctx, q.on('tussen', 1), () => { kruis(ctx, 1490, 210, 26, 1); tag(ctx, 'tussen de kiezen: niet te zien', 1280, 840, C.koraal, 1, 'center', 28); }); });
    laag(ctx, B, () => { rontgenBuis(ctx, 300, 330, 1, q.on('röntgenfoto', 1) * (1 - q.on('licht', 1)), t); persoon(ctx, 'wouter', 230, 880, 460, { t, kijk: 1, uit: 'neutraal', pose: 'wijs' });
      const R = q.on('röntgenfoto', 1); rontgenFoto(ctx, 620, 190, 1180, 560, R, { gaatje: 1, donker: q.on('donkerder', 1), ring: q.on('donkerder', 1), t });
      naamBij(ctx, 'licht', 'glazuur en tandbeen', 760, 830, q.on('licht', 1), 'left');
      naamBij(ctx, 'donker', 'gaatje: minder mineraal', 1240, 830, q.on('mineraal', 1), 'left'); }); },

  s08(ctx, t, q) { bg(ctx, 'schema'); metaA(ctx, 'EEN JAAR GELEDEN', 160, 170, 1, C.grain, 'left', 28);
    rontgenFoto(ctx, 560, 220, 1000, 510, 1, { gaatje: 1, donker: 1, ring: q.on('vlekje', 1), t });
    naamBij(ctx, 'alleen in het glazuur', '', 1060, 800, q.on('glazuur', 1), 'center');
    persoon(ctx, 'wouter', 260, 880, 470, { t, kijk: 1, uit: 'neutraal', pose: 'denk' }); vraagteken(ctx, 1720, 450, q.on('Wat', 1), 110); },

  // ---------- H3 ----------
  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const V = q.on('vulling', 1, 1); const [A, B] = wisselA(V);
    laag(ctx, A, () => { const her = q.on('herstellen', 1, 2) * 0.35 + q.on('hard', 1, 1.5) * 0.65;
      kiezenRij(ctx, 720, 640, 0.85, { t, witPlek: 1 - her * 0.85, tussen: 0 });
      naamBij(ctx, 'ontkalkt plekje', '', 380, 300, 1 - q.on('hard', 1), 'center'); naamBij(ctx, 'weer hard', '', 380, 300, q.on('hard', 1), 'center', C.groen);
      tandpastaTube(ctx, 1480, 330, 1, q.on('fluoride', 1)); naamBij(ctx, 'fluoride', '', 1480, 430, q.on('fluoride', 1), 'center');
      rager(ctx, 1420, 580, 1, q.on('ragertje', 1)); floss(ctx, 1640, 600, 1, q.on('floss', 1)); naamBij(ctx, 'ook tussen je kiezen', '', 1500, 720, q.on('ragertje', 1), 'center'); });
    laag(ctx, B, () => { const st = [q.on('vulling', 1), q.on('opnieuw', 1), q.on('groter', 1)];
      [0, 1, 2].forEach(i => { kiesT2(ctx, 420 + i * 540, 520, 0.5, { t, a: st[i], vulling: [0.5, 0.8, 1.15][i] }); if (i) pijl(ctx, 420 + i * 540 - 360, 450, 420 + i * 540 - 190, 450, C.line, st[i], 4, 16); });
      naamBij(ctx, 'vulling', '', 420, 800, st[0], 'center'); naamBij(ctx, 'opnieuw', 'gat groter', 960, 800, st[1], 'center'); naamBij(ctx, 'nog eens', 'nog groter', 1500, 800, st[2], 'center');
      tag(ctx, 'pas boren als het echt moet', 960, 230, C.goud, q.on('Daarom', 1), 'center', 34); }); },

  s11(ctx, t, q) { bg(ctx, 'schema'); const [A, B] = wisselA(q.on('Wouter', 1, 1));
    laag(ctx, A, () => { persoon(ctx, 'lotte', 300, 880, 480, { t, outfit: 'gewoon', kijk: 1, uit: 'verbaasd' }); kruis(ctx, 300, 300, 22, q.on('poetste', 1)); naamBij(ctx, 'niet tussen haar kiezen', '', 300, 250, q.on('poetste', 1), 'center');
      rontgenFoto(ctx, 640, 230, 1100, 560, q.on('plekje', 1), { gaatje: t > q.at('groeide', 1) + 0.6 ? 2 : 1, donker: 1, ring: q.on('tandbeen', 1), t });
      naamBij(ctx, 'tot in het tandbeen', '', 1190, 860, q.on('tandbeen', 1), 'center'); tag(ctx, 'nu moet het wel', 1190, 180, C.koraal, q.on('wel', 1), 'center', 32); });
    laag(ctx, B, () => { const kx = 1180, ky = 500, S = 0.95;
      const boor = q.on('boort', 1), vul = clamp((t - q.at('laagjes', 1) + 1.5) / 2.6, 0, 1), lagen = Math.floor(clamp((t - q.at('Elke', 1)) / 0.7, 0, 3.99) * (q.on('Elke', 1) > 0.01 ? 1 : 0));
      const fase = t < q.at('boort', 1) ? 0 : t < q.at('kunststof', 1) ? 1 : 2;
      persoon(ctx, 'wouter', 380, 880, 520, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: fase === 0 ? spuitHold : fase === 1 ? boorHold : null });
      kiesBehandeling(ctx, kx, ky, S, { t, verdoofd: q.on('verdooft', 1), blok: q.on('blokkeert', 1), geboord: clamp((t - q.at('boort', 1)) / 2.4, 0, 1) * boor, vul: fase === 2 ? Math.max(vul * 0.25, lagen / 4 + (q.on('Elke', 1) > 0.01 ? 0.25 : 0)) : 0, blauw: q.on('blauw', 1), lagenAan: lagen });
      naamBij(ctx, 'verdoving', 'signaal stopt', 720, 300, q.on('verdooft', 1) * (1 - q.on('boort', 1)), 'center');
      naamBij(ctx, 'zacht tandbeen eruit', '', 720, 300, q.on('boort', 1) * (1 - q.on('kunststof', 1)), 'center');
      naamBij(ctx, 'kunststof in tandkleur', 'dunne laagjes', 720, 300, q.on('kunststof', 1) * (1 - q.on('blauw', 1)), 'center');
      naamBij(ctx, 'blauw licht', 'maakt elke laag hard', 720, 300, q.on('blauw', 1) * (1 - q.on('zoveel', 1)), 'center');
      tag(ctx, 'zoveel mogelijk eigen kies', 720, 300, C.groen, q.on('zoveel', 1), 'center', 30); }); },

  // ---------- H4 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const Hu = q.on('Waarom', 1, 0.8);
    const kx = lerp(760, 520, Hu), S = lerp(0.95, 0.75, Hu);
    kiesOntsteking(ctx, kx, 500, S, { t, bact: q.on('bacteriën', 1, 2), afval: q.on('afvalstoffen', 1), ontst: q.on('ontsteking', 1), wijd: q.on('wijder', 1), zwel: q.on('zwelt', 1) });
    laag(ctx, 1 - Hu, () => { naamBij(ctx, 'bacteriën', '', kx + 420 * S, 220, q.on('bacteriën', 1), 'left'); naamBij(ctx, 'afvalstoffen', '', kx + 420 * S, 300, q.on('afvalstoffen', 1), 'left');
      naamBij(ctx, 'ontsteking', 'afweer reageert', kx + 420 * S, 420, q.on('ontsteking', 1), 'left'); naamBij(ctx, 'bloedvaatjes wijder', '', kx + 420 * S, 530, q.on('wijder', 1), 'left'); naamBij(ctx, 'weefsel zwelt op', '', kx + 420 * S, 610, q.on('zwelt', 1), 'left');
      tag(ctx, 'film: De eerste verdediging', 1500, 800, C.teal, q.on('verdediging', 1), 'center', 28); });
    laag(ctx, Hu, () => { huidStuk(ctx, 1380, 500, 520, q.on('huid', 1), 0.6 + 0.1 * Math.sin(t * 3)); naamBij(ctx, 'ontsteking in je huid', '', 1380, 760, q.on('huid', 1), 'center'); naamBij(ctx, 'in een tand', '', kx, 860, 1, 'center'); vraagteken(ctx, 960, 300, q.on('denk', 1), 100); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const Dd = q.on('Vaak', 1, 1); const [A, B] = wisselA(Dd);
    laag(ctx, A, () => { const hz = q.on('huid', 1); huidStuk(ctx, 460, 520, 520, hz, 0.4 + 0.6 * q.on('uitzetten', 1, 1.5)); naamBij(ctx, 'huid: zwelling kan naar buiten', '', 460, 760, q.on('uitzetten', 1), 'center');
      kiesOntsteking(ctx, 1320, 480, 0.8, { t, bact: 1, ontst: 1, wijd: 1, zwel: 1, druk: q.on('druk', 1), klop: q.on('kloppende', 1) });
      naamBij(ctx, 'tand: opgesloten', '', 1320, 860, q.on('opgesloten', 1), 'center'); naamBij(ctx, 'druk op de zenuw', '', 1620, 300, q.on('druk', 1), 'left');
      maantje(ctx, 1760, 170, 40, q.on('nachts', 1)); naamBij(ctx, 'ook \'s nachts', '', 1700, 260, q.on('nachts', 1), 'center'); });
    laag(ctx, B, () => { kiesOntsteking(ctx, 760, 480, 0.95, { t, bact: 1, ontst: 1, dood: q.on('sterft', 1, 1.5), punt: q.on('punt', 1, 1.5) });
      naamBij(ctx, 'pulpa sterft af', '', 1200, 380, q.on('sterft', 1), 'left'); naamBij(ctx, 'ontsteking bij de wortelpunt', '', 1200, 760, q.on('punt', 1), 'left'); }); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const kx = 820, S = 1;
    const weg = q.on('weg', 1, 1.2), schoon = q.on('schoon', 1, 1.5), vul = q.on('vult', 1, 1.2);
    persoon(ctx, 'wouter', 280, 880, 500, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal', hold: boorHold }); naamBij(ctx, 'wortelkanaalbehandeling', '', 960, 150, q.on('wortelkanaalbehandeling', 1), 'center');
    kiesWortelkanaal(ctx, kx, 500, S, { t, weg, schoon, vul, vijl: q.on('schoon', 1) * (1 - q.on('vult', 1)) });
    naamBij(ctx, 'pulpa eruit', '', 1250, 330, weg * (1 - schoon), 'left'); naamBij(ctx, 'kanaaltjes schoon', '', 1250, 330, schoon * (1 - vul), 'left'); naamBij(ctx, 'en gevuld', '', 1250, 330, vul, 'left');
    laag(ctx, q.on('kou', 1), () => { sneeuwvlok(ctx, 1450, 560, 34); kruis(ctx, 1450, 560, 40, 1); regel(ctx, 'geen kou of warmte', 1520, 572, 1, C.text, 32, 'left', 700); });
    laag(ctx, q.on('staan', 1), () => { vink_(ctx, 1450, 700, 30, 1); regel(ctx, 'blijft staan, je kauwt erop', 1520, 712, 1, C.text, 32, 'left', 700); }); },

  // ---------- Recap ----------
  s16(ctx, t, q) { bg(ctx, 'schema');
    persoon(ctx, 'lotte', 300, 880, 480, { t, outfit: 'gewoon', kijk: 1, pose: 'vasthouden', uit: 'lacht', hold: ijsjeHold(0) }); persoon(ctx, 'wouter', 560, 880, 520, { t, kijk: -1, uit: 'blij' });
    kiesT2(ctx, 1000, 470, 0.55, { t, vulling: 0.8 });
    recapKaart(ctx, 1300, 260, 520, 'glazuur: geen zenuw', C.teal, q.on('glazuur', 1)); recapKaart(ctx, 1300, 400, 520, 'pijn pas diep in het tandbeen', C.koraal, q.on('diep', 1));
    recapKaart(ctx, 1300, 540, 520, 'zoeken met een röntgenfoto', C.goud, q.on('zoekt', 1)); recapKaart(ctx, 1300, 680, 520, 'pas boren als het moet', C.groen, q.on('voelt', 1)); },

  s17(ctx, t, q) { bg(ctx, 'schema');
    nlKaart(ctx, 470, 470, 1.25, q.on('opleiding', 1), [q.on('Groningen', 1), q.on('Amsterdam', 1), q.on('Nijmegen', 1)]);
    tag(ctx, 'Tandheelkunde · universiteit', 1300, 250, C.teal, q.on('universitaire', 1), 'center', 34);
    regel(ctx, 'zes jaar', 1300, 340, q.on('zes', 1), C.text, 36, 'center', 700); regel(ctx, 'al tijdens je studie patiënten', 1300, 410, q.on('behandelt', 1), C.text2, 30, 'center', 600);
    chip(ctx, 'meer aanmeldingen dan plaatsen: selectie', 1300, 500, C.goud, q.on('selectie', 1), 28);
    persoon(ctx, 'wouter', 1100, 880, 300, { t, kijk: 1, uit: 'blij' }); tag(ctx, 'mbo: tandartsassistent', 1460, 700, C.groen, q.on('mbo', 1), 'center', 32); }
});
