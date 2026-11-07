// Wat word jij? · Medische beeldvorming 1 · In het lichaam kijken — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Dr. Kim als radioloog; Opa Henk, Noor, Lotte).
// Rode draad: één dag van Dr. Kim, met de beelden van Henk (pols, buik) en Lotte (knie).

// eerst het oude weg, dan het nieuwe (één beeld tegelijk)
function uitV(q, t, w, n = 1) { return 1 - clamp((t - q.at(w, n)) / 0.4, 0, 1); }
function inV(q, t, w, n = 1) { return clamp((t - q.at(w, n) - 0.4) / 0.5, 0, 1); }

Object.assign(SCENES, {
  title(ctx, t) { ctPlak(ctx, 1450, 640, 0.6, 1, { kleur: 0.35 + 0.1 * Math.sin(t * 0.8) }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const F = q.on('röntgenfoto', 1), L = q.on('Lotte', 1, 0.3);
    tuin(ctx, 1 - F * 0.75, 1); const val = 1 - clamp((t - q.at('röntgenfoto', 1)) / 0.4, 0, 1); liggend(ctx, 'henk', 110, 735, 410, { kop: 1, t, a: val, uit: 'verbaasd' }); persoon(ctx, 'henk', 200, 880, 430, { t, a: 1 - val, uit: 'neutraal', pose: 'vasthouden', kijk: 1 });
    metaA(ctx, 'IN DE TUIN', 120, 220, 1 - F, C.grain); naamBij(ctx, 'Opa Henk', 'pols en zij', 200, val > 0.5 ? 560 : 380, 1, 'center');
    polsFoto(ctx, 570, 450, 0.75, F, { breuk: q.on('breuk', 1) }); naamBij(ctx, 'breuk', '', 520, 520, q.on('breuk', 1), 'center', C.koraal);
    persoon(ctx, 'kim', 900, 880, 430, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'wijs', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 900, 360, q.on('Kim', 1, 0.3), 'center');
    persoon(ctx, 'lotte', 1230, 880, 400, { t, a: L, outfit: 'sport', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Lotte', 'kruisband', 1230, 380, L, 'center');
    knieFoto(ctx, 1570, 450, 0.75, q.on('röntgenfoto', 2)); chip(ctx, 'kruisband?', 1570, 780, C.goud, q.on('niets', 1), 28);
    vraagteken(ctx, 1790, 300, q.on('Waarom', 1), 110); },

  // ---------- H1 Röntgen ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a: bot houdt meer straling tegen'); const A = uitV(q, t, 'Henk', 1), B = inV(q, t, 'Henk', 1) * uitV(q, t, 'longfoto', 1), Cc = inV(q, t, 'longfoto', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const u = clamp((t - q.at('stuurt', 1)) / 2.5, 0, 1);
      rontgenOpstelling(ctx, 560, 520, 1, { u, plaat: q.on('donker', 1), t });
      naamBij(ctx, 'röntgenbuis', '', 700, 255, q.on('röntgenapparaat', 1), 'left'); naamBij(ctx, 'plaat', 'zwart · grijs · wit', 840, 790, q.on('plaat', 1), 'left');
      naamBij(ctx, 'bot', '', 505, 470, q.on('Bot', 2), 'center'); naamBij(ctx, 'spier', '', 560, 600, q.on('Spieren', 1), 'center');
      const hl = t > q.at('Bot', 2) ? 3 : t > q.at('Spieren', 1) ? 2 : t > q.at('Lucht', 1) ? 0 : -1;
      grijsSchaal(ctx, 1010, 300, 1, hl, [q.on('Lucht', 1), q.on('vet', 1), q.on('banden', 1), q.on('Bot', 2)]);
      chip(ctx, 'bot zit vol kalk', 1655, 560, C.text2, q.on('kalk', 1), 26); longFoto(ctx, 1110, 660, 0.5, q.on('longen', 1)); naamBij(ctx, 'longen', 'bijna zwart', 1210, 680, q.on('longen', 1), 'left'); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; polsFoto(ctx, 560, 470, 0.82, 1, { breuk: 1 }); naamBij(ctx, 'pols van Henk', '', 560, 235, 1, 'center');
      naamBij(ctx, 'breuk', 'straling gaat erdoor', 560, 760, q.on('breuk', 1), 'center', C.koraal);
      knieFoto(ctx, 1380, 470, 0.82, q.on('kruisband', 1), { spook: q.on('weg', 1) }); naamBij(ctx, 'knie', '', 1380, 235, q.on('kruisband', 1), 'center');
      naamBij(ctx, 'kruisband?', 'zelfde grijs als spier en vet', 1380, 790, q.on('grijs', 2), 'center', C.goud); ctx.restore(); }
    if (Cc > 0.01) { ctx.save(); ctx.globalAlpha *= Cc; polsFoto(ctx, 560, 470, 0.82, 0.35, { breuk: 1 }); knieFoto(ctx, 1380, 470, 0.82, 0.35);
      regel(ctx, 'longfoto ≈ één week', 960, 380, 1, C.goud, 46, 'center', 700); weekStrook(ctx, 757, 440, 1, Math.round(7 * clamp((t - q.at('week', 1)) / 1.5, 0, 1)));
      longFoto(ctx, 960, 700, 0.5, 1); naamBij(ctx, 'straling uit je omgeving', 'uit de grond en uit de ruimte', 960, 560, q.on('grond', 1), 'center'); ctx.restore(); } },

  // ---------- H2 MRI ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const A = uitV(q, t, 'bestaat', 1), B = inV(q, t, 'bestaat', 1) * uitV(q, t, 'gezonde', 1), D = inV(q, t, 'gezonde', 1);
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; mriScanner(ctx, 1150, 600, 0.9, { schuif: clamp(t / 4, 0, 1), id: 'lotte', t, outfit: 'sport' });
      chip(ctx, 'geen röntgenstraling', 520, 300, C.teal, q.on('geen', 1), 30); chip(ctx, 'een heel sterke magneet', 520, 380, C.goud, q.on('magneet', 1), 30); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; const k = q.on('kompasnaaldje', 1);
      waterMolecuul(ctx, 330, 430, 1.3, 1, k); naamBij(ctx, 'watermolecuul', 'twee waterstofatomen', 330, 600, 1, 'center');
      naamBij(ctx, 'kern = kompasnaaldje', '', 330, 250, k, 'center', C.goud); if (k > 0.01) { ctx.save(); ctx.globalAlpha *= k * (1 - q.on('alle', 1)); naald(ctx, 540, 450, 70, 0.7 + 0.2 * Math.sin(t)); ctx.restore(); }
      const orde = clamp((t - q.at('meer', 1)) / 1.5, 0, 1), kantel = clamp((t - q.at('duwt', 1)) / 0.6, 0, 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1));
      naaldVeld(ctx, 840, 290, 6, 5, 104, q.on('alle', 1), { orde, kantel, t });
      const M = q.on('meer', 1); pijl(ctx, 700, 720, 700, 290, C.goud, M, 8, 28); naamBij(ctx, 'magneetveld', '', 700, 260, M, 'center', C.goud);
      chip(ctx, 'tienduizenden keren sterker dan de aarde', 1110, 820, C.goud, q.on('aarde', 1) * (1 - q.on('Dan', 2, 0.4)), 28);
      radioGolf(ctx, 840, 790, 1350, q.on('radiogolf', 1) * (1 - q.on('aarde', 1) * 0) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), t, C.teal, 18, 5);
      if (q.on('radiogolf', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)); ctx.fillStyle = C.bgSchema; ctx.fillRect(700, 760, 1200, 110); ctx.restore(); radioGolf(ctx, 840, 800, 1350, q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), t, C.teal, 18, 5); naamBij(ctx, 'radiogolf', '', 1400, 812, q.on('radiogolf', 1) * (1 - clamp((t - q.at('Zwaaien', 1)) / 1.2, 0, 1)), 'left', C.teal); }
      radioGolf(ctx, 1500, 400, 1760, q.on('radiosignaal', 1), t, C.groen, 14, 5); naamBij(ctx, 'radiosignaal', 'terug naar de scanner', 1630, 480, q.on('radiosignaal', 1), 'center', C.groen);
      chip(ctx, 'water, vet, stevig weefsel: elk een ander signaal', 1260, 820, C.text2, q.on('stevig', 1), 26); ctx.restore(); }
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; mriKnie(ctx, 620, 480, 1, 1, { scheur: q.on('onderbroken', 1), hl: q.on('vlek', 1) }); naamBij(ctx, 'knie van Lotte', 'MRI · van opzij', 620, 190, 1, 'center');
      naamBij(ctx, 'kruisband', 'gezond: donkere streep', 900, 420, 1, 'left'); naamBij(ctx, 'lichte vlek', '', 900, 540, q.on('vlek', 1), 'left', C.goud);
      persoon(ctx, 'lotte', 1500, 880, 420, { t, outfit: 'sport', kijk: -1, uit: 'neutraal' }); vraagteken(ctx, 1720, 330, q.on('Waardoor', 1), 110); ctx.restore(); } },

  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c: vocht geeft veel signaal'); const V = uitV(q, t, 'Zo', 1), Z = inV(q, t, 'Zo', 1);
    mriKnie(ctx, 780, 490, 1, 1, { scheur: 1, hl: 1 - Z });
    chip(ctx, 'vocht en bloed: veel waterstof', 780, 820, C.goud, q.on('vocht', 1) * V, 28); chip(ctx, 'banden · kraakbeen · menisci', 780, 820, C.teal, Z * q.on('banden', 1), 28);
    persoon(ctx, 'kim', 300, 880, 440, { t, outfit: 'lab', pose: 'wijs', kijk: 1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 300, 340, q.on('Kim', 1), 'center');
    klokje(ctx, 1360, 380, 56, clamp((t - q.at('duurt', 1)) / 2, 0, 1) * 0.5, q.on('duurt', 1)); naamBij(ctx, 'al gauw een half uur', '', 1440, 394, q.on('duurt', 1), 'left');
    chip(ctx, 'hard kloppend geluid', 1560, 520, C.text2, q.on('kloppend', 1), 28);
    const M = q.on('metaal', 1); sleutels(ctx, 1300, 690, 0.9, M); bankpas(ctx, 1700, 690, 0.9, q.on('bankpas', 1)); kruis(ctx, 1300, 690, 50, q.on('sleutels', 1)); kruis(ctx, 1700, 690, 50, q.on('bankpas', 1));
    naamBij(ctx, 'sleutel: metaal', '', 1300, 610, q.on('sleutels', 1), 'center'); naamBij(ctx, 'bankpas', 'strip gewist', 1700, 600, q.on('bankpas', 1), 'center');
    naamBij(ctx, 'niet mee de ruimte in', 'magneet staat altijd aan', 1510, 815, M, 'center', C.koraal); },

  // ---------- H3 Echo ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('grens', 1);
    metaA(ctx, 'SPOEDEISENDE HULP', 120, 200, 1);
    persoon(ctx, 'kim', 1010, 880, 440, { t, outfit: 'lab', pose: 'wijs', kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'radioloog', 1010, 380, 1, 'center');
    brancard(ctx, 140, 640, 760); liggend(ctx, 'henk', 860, 598, 410, { kop: -1, t, uit: 'neutraal' });
    echoOpHuid(ctx, 700, 572, q.on('echokop', 1), q.on('gel', 1));
    persoon(ctx, 'noor', 300, 880, 390, { t, a: q.on('Noor', 1, 0.3), pose: 'vasthouden', kijk: 1, uit: 'blij' });
    naamBij(ctx, 'Opa Henk', 'pijn in zijn zij', 330, 470, 1 - q.on('Noor', 1), 'left'); naamBij(ctx, 'Noor', 'kleindochter', 250, 430, q.on('Noor', 1), 'center');
    const E = q.on('hoog', 1); echoPrincipe(ctx, 1150, 200, 420, E, { p: (t - q.at('grens', 1)) > 0 ? ((t - q.at('grens', 1)) / 3) % 1 : 0, gel: q.on('gel', 2), toon: q.on('grens', 1), diepte: q.on('dieper', 1), blok: q.on('bot', 1) });
    chip(ctx, 'te hoog om te horen', 1360, 160, C.koraal, E * (1 - P), 28);
    chip(ctx, 'gel: geen lucht ertussen', 1360, 790, C.teal, q.on('gel', 2), 28); chip(ctx, 'geen straling', 1360, 850, C.groen, q.on('straling', 1), 28);
    vraagteken(ctx, 1800, 240, q.on('denk', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: vocht is zwart'); const vb = q.on('zwart', 1) * (1 - q.on('geen', 2));
    echoScherm(ctx, 620, 300, 380, 1, { vocht: vb, t }); naamBij(ctx, 'lever', '', 470, 520, 1, 'center'); naamBij(ctx, 'rib', '', 715, 446, 1, 'center'); naamBij(ctx, 'schaduw', '', 715, 640, 1, 'center');
    naamBij(ctx, 'vocht', 'zwart', 514, 650, vb, 'center', C.koraal);
    chip(ctx, 'geen zwarte plekken', 620, 790, C.groen, q.on('geen', 2), 28); vink_(ctx, 860, 776, 18, q.on('geen', 2));
    brancard(ctx, 1160, 640, 600); liggend(ctx, 'henk', 1700, 598, 410, { kop: -1, t }); chip(ctx, '71 jaar · van een ladder gevallen', 1460, 380, C.text2, q.on('eenenzeventig', 1), 28);
    tag(ctx, 'CT-scan', 1460, 300, C.goud, q.on('CT-scan', 1), 'center', 36); },

  // ---------- H4 CT ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('organen', 1, 0.6), SZ = uitV(q, t, 'Uit', 1);
    if (SZ > 0.01) { mriScanner(ctx, 1380, 560, 0.7, SZ, { schuif: 0.1 + 0.4 * clamp(t / 6, 0, 1), id: 'henk', t, naam: 'CT · ZIJAANZICHT' }); naamBij(ctx, 'bed schuift door de ring', '', 1250, 790, SZ * q.on('schuift', 1), 'center'); }
    ctRing(ctx, 520, 440, 230, 1, { an: t * 2.2, stralen: 1 }); metaA(ctx, 'CT · VOORAANZICHT', 520, 140, 1, C.grain, 'center');
    naamBij(ctx, 'röntgenbuis draait rond', '', 520, 790, q.on('draait', 1), 'center');
    chip(ctx, 'CT buik ≈ 100 × longfoto, of meer', 520, 850, C.koraal, q.on('straling', 2), 26);
    brood(ctx, 1290, 470, 1, (1 - O) * q.on('brood', 1) * (1 - SZ), clamp((t - q.at('sneetjes', 1)) / 1, 0, 1)); naamBij(ctx, 'plakjes', 'zoals sneetjes brood', 1330, 640, (1 - O) * q.on('plakjes', 1), 'center');
    ctPlak(ctx, 1300, 470, 0.74, O, { hl: { lever: q.on('lever', 1) } });
    naamBij(ctx, 'lever', 'links op het scherm', 1200, 470, q.on('links', 1), 'center', C.goud);
    persoon(ctx, 'kim', 1760, 880, 420, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'denk', kijk: -1, uit: 'neutraal' });
    vraagteken(ctx, 1760, 300, q.on('Hoe', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b: gezien vanaf de voeten'); const L = q.on('lezen', 1);
    liggend(ctx, 'henk', 200, 500, 400, { kop: 1, t, a: 1 - L * 0.6 }); oog(ctx, 120, 500, 0.9, q.on('voeten', 1) * (1 - L * 0.6));
    if (q.on('voeten', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('voeten', 1) * (1 - L * 0.6); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(380, 380); ctx.lineTo(380, 620); ctx.stroke(); ctx.restore(); }
    naamBij(ctx, 'kijk vanaf de voeten', 'buik boven', 330, 700, q.on('voeten', 1) * (1 - L * 0.6), 'center');
    ctPlak(ctx, 1200, 470, 0.95, 1, { RL: q.on('rechterkant', 1), breuk: q.on('breukje', 1), hl: { lever: q.on('lever', 1) * (1 - q.on('maag', 1) * 0.6), maag: q.on('maag', 1), milt: q.on('milt', 1), wervel: q.on('wervel', 1), aorta: q.on('aorta', 1), rib: q.on('ribben', 1) * (1 - q.on('breukje', 1)) } });
    naamBij(ctx, 'rechts van Henk', '', 860, 170, q.on('rechterkant', 1), 'left', C.goud);
    naamBij(ctx, 'lever', '', 1040, 470, q.on('lever', 1), 'center'); naamBij(ctx, 'maag', '', 1335, 430, q.on('maag', 1), 'center'); naamBij(ctx, 'milt', '', 1420, 575, q.on('milt', 1), 'center');
    naamBij(ctx, 'wervel', '', 1140, 600, q.on('wervel', 1), 'right'); naamBij(ctx, 'aorta', '', 1262, 530, q.on('aorta', 1), 'left'); naamBij(ctx, 'ribben', '', 1460, 690, q.on('ribben', 1), 'center');
    naamBij(ctx, 'breukjes', '', 950, 300, q.on('breukje', 1), 'right', C.koraal);
    persoon(ctx, 'kim', 1760, 880, 400, { t, outfit: 'lab', pose: 'staan', kijk: -1, uit: 'neutraal' });
    chip(ctx, 'lever en milt heel · geen bloed', 1200, 820, C.groen, q.on('heel', 1), 28); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); const h = persoon(ctx, 'henk', 260, 880, 420, { t, uit: 'blij', pose: 'vasthouden', kijk: 1 }); gips(ctx, h.handR, q.on('gips', 1), 18);
    persoon(ctx, 'noor', 440, 880, 400, { t, a: q.on('Noor', 1, 0.3), uit: 'blij', kijk: -1 }); naamBij(ctx, 'Opa Henk en Noor', 'naar huis', 350, 400, q.on('Noor', 1), 'center');
    persoon(ctx, 'lotte', 1720, 880, 420, { t, a: q.on('Lotte', 1, 0.3), outfit: 'sport', kijk: -1 }); mriKnie(ctx, 1480, 340, 0.45, q.on('MRI', 1), { scheur: 1 });
    tag(ctx, 'röntgen en CT: wat straling tegenhoudt', 960, 330, C.goud, q.on('tegenhoudt', 1), 'center', 30); tag(ctx, 'MRI: het signaal van waterstof', 960, 430, C.teal, q.on('waterstof', 1), 'center', 30);
    tag(ctx, 'echo: teruggekaatst geluid', 960, 530, C.groen, q.on('teruggekaatst', 1), 'center', 30); regel(ctx, 'kies wat je wilt zien', 960, 660, q.on('kiest', 1), C.text, 40, 'center', 700); },
  s15(ctx, t, q) { bg(ctx, 'schema');
    tag(ctx, 'medisch beeldvormings- en bestralingsdeskundige', 620, 230, C.teal, q.on('beelden', 1), 'center', 30);
    regel(ctx, 'hbo · vier jaar', 620, 310, q.on('vier', 1), C.text, 36, 'center', 700); regel(ctx, 'Groningen · Haarlem · Eindhoven', 620, 370, q.on('Groningen', 1), C.text2, 30, 'center', 600);
    chip(ctx, 'radiologie', 330, 470, C.teal, q.on('radiologie', 1), 28); chip(ctx, 'nucleaire geneeskunde', 620, 470, C.teal, q.on('nucleaire', 1), 28); chip(ctx, 'radiotherapie', 920, 470, C.teal, q.on('radiotherapie', 1), 28);
    ctRing(ctx, 620, 680, 110, q.on('beelden', 1), { an: t * 2.2, stralen: 0.6 });
    tag(ctx, 'volgende film: Bestraling', 1000, 620, C.goud, q.on('volgende', 1), 'center', 26);
    tag(ctx, 'radioloog', 1400, 230, C.paars, q.on('radioloog', 1), 'center', 34); regel(ctx, 'geneeskunde · zes jaar', 1400, 310, q.on('zes', 1), C.text, 32, 'center', 700); regel(ctx, 'specialisatie · vijf jaar', 1400, 370, q.on('specialisatie', 1), C.text, 32, 'center', 700);
    persoon(ctx, 'kim', 1560, 880, 420, { t, a: q.on('Kim', 1, 0.3), outfit: 'lab', pose: 'staan', kijk: -1, uit: 'blij' }); }
});
