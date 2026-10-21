// Wat word jij? · Diergeneeskunde 2 · Bronst, dekken en kalven — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Dierenarts Mila, stagiaire Lotte).
// Rode draad: één melkkoe, van tochtig tot kalven.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }

Object.assign(SCENES, {
  title(ctx, t) { koe(ctx, 1200, 640, 0.75, { t }); koe(ctx, 1500, 720, 0.4, { t, uier: 0, horens: false, kijk: -1 }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); stal(ctx, 820, 760, 1000, 300, 1);
    persoon(ctx, 'mila', 300, 880, 440, { t, outfit: 'stal', uit: 'blij' }); persoon(ctx, 'lotte', 560, 880, 370, { t, uit: 'neutraal', kijk: -1 }); naamBij(ctx, 'Lotte', 'stagiaire', 560, 455, q.on('Lotte', 1), 'center'); naamBij(ctx, 'Dierenarts Mila', '', 300, 390, q.on('Mila', 1), 'center');
    koe(ctx, 1120, 760, 0.8, { t, a: q.on('melkveebedrijf', 1) }); koe(ctx, 1560, 760, 0.8, { t, a: q.on('melkveebedrijf', 1), kijk: -1 }); koe(ctx, 1340, 860, 0.35, { t, uier: 0, horens: false, a: q.on('kalf', 1) });
    chip(ctx, 'melk pas na een kalf', 1500, 180, C.teal, q.on('melk', 1), 28); chip(ctx, 'op tijd drachtig', 1500, 240, C.teal, q.on('drachtig', 1), 28); chip(ctx, 'tochtig: vlak voor de eisprong', 1500, 300, C.koraal, q.on('tochtig', 1), 28); vraagteken(ctx, 960, 230, q.on('ziet', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const S = q.on('springt', 1);
    cyclusKlok(ctx, 330, 420, 170, q.on('weken', 1), (t * 0.06) % 1, { tocht: [0, 0.5] }); chip(ctx, 'een halve dag', 330, 680, C.koraal, q.on('halve', 1), 28);
    koeSprong(ctx, 1200, 820, 0.9, S * clamp((t - q.at('springt', 1)) / 1, 0, 1), t); chip(ctx, 'onrustig · loeit · loopt veel', 1200, 260, C.oker, q.on('onrustig', 1), 28);
    tag(ctx, 'staande tocht', 1200, 360, C.koraal, q.on('staande', 1), 'center', 36); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const E = q.on('eisprong', 1);
    koe(ctx, 460, 780, 1.0, { t }); halsband(ctx, 640, 590, 1.2, q.on('sensor', 1), (t * 1.5) % 1); naamBij(ctx, 'sensor', 'om de hals of aan een poot', 640, 380, q.on('sensor', 1), 'center');
    stappenStaaf(ctx, 900, 560, 560, 260, q.on('Loopt', 1), clamp((t - q.at('Loopt', 1)) / 2, 0, 1), 10);
    telefoon(ctx, 1680, 480, 1.3, q.on('melding', 1), 'koe 312 is tochtig', q.on('telefoon', 1));
    chip(ctx, 'eisprong ± een dag na het begin van de tocht', 1180, 700, C.koraal, E, 28); tag(ctx, 'op tijd insemineren', 1180, 800, C.goud, q.on('Precies', 1), 'center', 32); },

  s06(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'film: Van bevruchting tot baby', 960, 200, C.teal, Math.max(0.4, q.on('bevruchting', 1)), 'center', 28);
    koeHormonen(ctx, 360, 330, 1000, 370, Math.max(0.3, q.on('FSH', 1)), clamp((t - q.at('FSH', 1)) / 4, 0, 1)); regel(ctx, 'koe · cyclus van 21 dagen', 960, 270, q.on('koe', 1), C.text, 34, 'center', 800);
    chip(ctx, 'slijmvlies wordt opgenomen, niet afgestoten', 960, 830, C.oker, q.on('opgenomen', 1), 28); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('signaal', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - L;
    jaarRad(ctx, 960, 470, 240, 1, [[8, 11, C.oker, q.on('herfst', 1)], [2, 5, C.groen, q.on('voorjaar', 1)]]);
    schaapDg(ctx, 330, 560, 1.1, { a: q.on('Schapen', 1) }); naamBij(ctx, 'schaap', 'herfst · 5 mnd drachtig', 330, 640, q.on('Schapen', 1), 'center', C.oker);
    paard(ctx, 1560, 600, 0.55, { t, a: q.on('Paarden', 1) }); naamBij(ctx, 'paard', 'voorjaar · 11 mnd drachtig', 1600, 680, q.on('Paarden', 1), 'center', C.groen);
    chip(ctx, 'jongen allebei in het voorjaar: vers gras', 960, 830, C.groen, q.on('lammeren', 1), 28); schaapDg(ctx, 1170, 380, 0.45, { a: q.on('lammeren', 1) }); paard(ctx, 1220, 500, 0.2, { t, a: q.on('veulens', 1) }); ctx.restore();
    if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; regel(ctx, 'het signaal: daglicht', 960, 220, 1, C.goud, 48, 'center', 800);
      dagNacht(ctx, 600, 330, 900, 0.35, 1, 'zomer', t); dagNacht(ctx, 600, 450, 900, 0.65, q.on('langer', 1), 'winter', t);
      naamBij(ctx, 'pijnappelklier', 'maakt melatonine in het donker', 960, 640, q.on('pijnappelklier', 1), 'center', C.paars); chip(ctx, 'langere nacht → meer melatonine → seizoen', 960, 780, C.paars, q.on('seizoen', 1), 28); ctx.restore(); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); nachtStal(ctx, 400, 820, 1120, 560, 1); lamp(ctx, 960, 300, q.on('lamp', 1), q.on('lamp', 1)); paard(ctx, 900, 820, 0.85, { t, a: q.on('merries', 1) });
    metaText(ctx, 'WINTERAVOND', 430, 300, C.text2, 'left', 24); naamBij(ctx, 'renpaarden', 'merries', 520, 220, q.on('renpaarden', 1), 'left'); vraagteken(ctx, 1450, 400, q.on('Waarom', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const R = q.on('renpaarden', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - R; dagNacht(ctx, 560, 330, 900, 0.65 - 0.25 * q.on('minder', 1), 1, 'met lamp', t); chip(ctx, 'minder melatonine', 1010, 480, C.paars, q.on('melatonine', 1), 28); tag(ctx, 'lichaam: voorjaar', 1010, 580, C.groen, q.on('voorjaar', 1), 'center', 32); ctx.restore();
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; jaarRad(ctx, 600, 520, 220, 1, [], 0); tag(ctx, 'iedereen een jaar ouder op 1 januari', 600, 230, C.goud, q.on('januari', 1), 'center', 30);
      paard(ctx, 1260, 820, 0.42, { t, a: q.on('veulen', 1) }); regel(ctx, 'januari', 1270, 860, q.on('veulen', 1), C.goud, 28, 'center', 700); paard(ctx, 1620, 820, 0.3, { t, a: q.on('juni', 1) }); regel(ctx, 'juni', 1630, 860, q.on('juni', 1), C.text2, 28, 'center', 700); ctx.restore(); } },

  s11(ctx, t, q) { bg(ctx, 'schema'); kat(ctx, 560, 760, 1.8, { t, a: q.on('kat', 1) }); kat(ctx, 940, 760, 2.0, { t, a: q.on('paring', 1), kleur: '#C98A4A', streep: '#9A6A38', kijk: -1 });
    chip(ctx, 'geen vaste eisprong', 740, 260, C.text2, q.on('vaste', 1), 28); tag(ctx, 'paring → eisprong', 740, 330, C.koraal, q.on('paring', 1), 'center', 32); regel(ctx, 'geïnduceerde eisprong', 740, 190, q.on('geïnduceerde', 1), C.goud, 44, 'center', 800);
    konijn(ctx, 1480, 760, 1.6, q.on('Konijnen', 1)); naamBij(ctx, 'konijn', 'ook', 1480, 480, q.on('Konijnen', 1), 'center'); },

  // ---------- H3 ----------
  s12(ctx, t, q) { bg(ctx, 'schema'); const P = q.on('pipet', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - P;
    stier(ctx, 380, 720, 0.85, { t, a: q.on('stier', 1) }); kruis(ctx, 380, 380, 30, q.on('geen', 1) * (1 - q.on('sperma', 1)));
    chip(ctx, '± 9 op de 10 melkkoeien: kunstmatige inseminatie', 960, 230, C.teal, q.on('negen', 1), 28);
    rietjesRek(ctx, 760, 380, 40, q.on('rietjes', 1), clamp((t - q.at('rietjes', 1)) / 2, 0, 1)); naamBij(ctx, 'duizenden rietjes', '', 900, 520, q.on('duizenden', 1), 'center');
    stikstofVat(ctx, 1500, 700, 1.3, q.on('stikstof', 1), t); naamBij(ctx, 'vloeibare stikstof', '−196 °C', 1500, 760, q.on('stikstof', 1), 'center');
    chip(ctx, 'stier kiezen uit een catalogus', 960, 700, C.oker, q.on('catalogus', 1), 28); ctx.restore();
    if (P > 0.01) { ctx.save(); ctx.globalAlpha *= P; koe(ctx, 1100, 800, 1.1, { t, kijk: -1 }); pipet(ctx, 1640 + (1 - clamp((t - q.at('pipet', 1)) / 2, 0, 1)) * 120, 618, 1.25, 1, Math.PI); naamBij(ctx, 'pipet', 'via de schede naar de baarmoeder', 1560, 540, 1, 'center'); ctx.restore(); } },

  s13(ctx, t, q) { bg(ctx, 'schema'); const U = q.on('spoelt', 1), O = q.on('andere', 1);
    koe(ctx, 360, 780, 0.9, { t }); naamBij(ctx, 'topkoe', '', 360, 420, q.on('topkoe', 1), 'center', C.goud);
    eierstok(ctx, 820, 400, 70, Math.round(1 + 7 * q.on('tegelijk', 1)), q.on('hormonen', 1), t); naamBij(ctx, 'veel eicellen tegelijk', '', 820, 520, q.on('tegelijk', 1), 'center');
    for (let i = 0; i < 6; i++) { const f = clamp(U * 6 - i, 0, 1); embryo(ctx, 760 + i * 70, 640, 22, f); } naamBij(ctx, 'embryo\'s uitspoelen', 'na een week', 940, 720, U, 'center');
    for (let i = 0; i < 3; i++) koe(ctx, 1260 + i * 240, 830 - (i % 2) * 40, 0.4, { t: t + i, a: O }); chip(ctx, 'andere koeien dragen ze uit', 1500, 480, C.teal, O, 28);
    tag(ctx, 'zelfde idee als ivf', 960, 860, C.teal, q.on('ivf', 1), 'center', 28); },

  // ---------- H4 ----------
  s14(ctx, t, q) { bg(ctx, 'schema'); koe(ctx, 420, 800, 1.0, { t, kijk: -1 }); persoon(ctx, 'mila', 800, 880, 420, { t, outfit: 'stal', pose: 'vasthouden', uit: 'neutraal', kijk: -1 });
    echoScherm(ctx, 1040, 260, 560, 400, q.on('scherm', 1), t, q.on('vruchtje', 1)); naamBij(ctx, 'vruchtje', '± 1 cm', 1320, 720, q.on('vruchtje', 1), 'center'); chip(ctx, 'kloppend hartje', 1320, 790, C.koraal, q.on('hartje', 1), 28);
    persoon(ctx, 'lotte', 1760, 880, 360, { t, uit: 'verbaasd', kijk: -1, a: q.on('Lotte', 1) }); metaText(ctx, 'NA ± EEN MAAND', 120, 220, C.grain, 'left', 26); },

  s15(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'ACHT MAANDEN LATER · NACHT', 120, 200, C.grain, 'left', 26); const Z = q.on('pootjes', 1, 0.8), N0 = 1 - q.on('Normaal', 1, 0.6);
    if (N0 > 0.01) { nachtStal(ctx, 300, 820, 1000, 520, N0); koe(ctx, 760, 820, 1.0, { t, a: N0, kijk: -1 }); telefoon(ctx, 1420, 480, 1.1, N0, 'het kalven schiet niet op', 1); }
    kalfLigging(ctx, 760, 500, 1.3, 'voor', q.on('Normaal', 1) * (1 - Z)); naamBij(ctx, 'normaal', 'voorpoten met de kop erop', 760, 760, q.on('Normaal', 1) * (1 - Z), 'center', C.groen);
    if (Z > 0.01) { ctx.save(); ctx.globalAlpha *= Z; ctx.beginPath(); ctx.ellipse(760, 500, 300, 200, 0, 0, 6.283); ctx.fillStyle = '#141C2E'; ctx.fill(); ctx.strokeStyle = '#C98A7A'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#A8784E'; [[-30, 470], [10, 500]].forEach(([dx, yy]) => { roundRect(ctx, 760 + dx + 100, yy - 8, 160, 16, 8); ctx.fill(); }); ctx.fillStyle = '#3A3430'; roundRect(ctx, 1010, 456, 24, 24, 4); ctx.fill(); roundRect(ctx, 1050, 486, 24, 24, 4); ctx.fill();
      chip(ctx, 'zolen omhoog', 1200, 400, C.koraal, q.on('zolen', 1), 28); chip(ctx, 'een hak', 1200, 470, C.koraal, q.on('hak', 1), 28); ctx.restore(); }
    persoon(ctx, 'mila', 1650, 880, 420, { t, outfit: 'stal', pose: 'denk', uit: 'denkt', kijk: -1 }); vraagteken(ctx, 760, 260, q.on('betekent', 1), 100); },

  s17(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const K = q.on('keizersnede', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - K; kalfLigging(ctx, 760, 500, 1.3, 'achter', 1); naamBij(ctx, 'achterstevoren', 'achterpoten eerst', 760, 760, q.on('achterstevoren', 1), 'center', C.koraal);
    chip(ctx, 'navelstreng raakt bekneld: snel!', 1400, 380, C.koraal, q.on('navelstreng', 1), 28); persoon(ctx, 'mila', 1650, 880, 420, { t, outfit: 'stal', pose: 'vasthouden', uit: 'bezorgd', kijk: -1, a: q.on('trekt', 1, 0.3) }); chip(ctx, 'meetrekken met de weeën', 1400, 460, C.teal, q.on('weeën', 1), 28); ctx.restore();
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; koe(ctx, 900, 800, 1.1, { t }); snede(ctx, 900, 800, 1.1, q.on('staan', 1)); persoon(ctx, 'mila', 400, 880, 420, { t, outfit: 'stal', pose: 'wijs', uit: 'neutraal' }); tag(ctx, 'keizersnede op de boerderij', 960, 230, C.goud, 1, 'center', 32); chip(ctx, 'koe blijft staan · plaatselijke verdoving', 1300, 860, C.teal, q.on('verdoving', 1), 26); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('Moet', 1, 0.8);
    dikbil(ctx, 640, 780, 1.1, { t, a: q.on('Belgisch', 1) }); naamBij(ctx, 'Belgisch witblauw', 'extra spieren', 640, 380, q.on('Belgisch', 1), 'center');
    chip(ctx, 'mutatie in een gen dat spiergroei remt', 640, 860, C.paars, q.on('mutatie', 1), 26); chip(ctx, 'zware kalveren · smal bekken', 1380, 360, C.oker, q.on('zwaar', 1), 28); chip(ctx, 'de meeste: keizersnede', 1380, 440, C.koraal, q.on('meeste', 1), 28);
    persoon(ctx, 'mila', 1500, 880, 420, { t, outfit: 'stal', uit: 'denkt', pose: 'denk', kijk: -1, a: V }); regel(ctx, 'wat vraag je van een dier?', 1380, 580, q.on('vraagt', 1), C.goud, 40, 'center', 800); vraagteken(ctx, 1720, 360, V, 90); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'lotte', 260, 880, 380, { t, uit: 'blij' });
    const items = [['melding', q.on('melding', 1)], ['rietje', q.on('rietje', 1)], ['echo', q.on('echo', 1)], ['kalf', q.on('achterstevoren', 1)]];
    items.forEach(([n, al], i) => { const x = 560 + i * 340; paneel(ctx, x, 260, 300, 340, '', al);
      if (n === 'melding') telefoon(ctx, x + 150, 430, 0.9, al, 'koe 312 is tochtig', 1); if (n === 'rietje') { stikstofVat(ctx, x + 150, 560, 0.8, al, t); } if (n === 'echo') echoScherm(ctx, x + 30, 310, 240, 200, al, t, 1); if (n === 'kalf') kalfLigging(ctx, x + 150, 440, 0.45, 'achter', al); });
    tag(ctx, 'zelfde kennis · tientallen soorten · elk een eigen klok', 1150, 760, C.goud, q.on('klok', 1), 'center', 30); },
  s20(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'master Diergeneeskunde · Utrecht', 960, 220, C.goud, q.on('master', 1), 'center', 34); regel(ctx, 'landbouwhuisdieren', 960, 320, q.on('landbouwhuisdieren', 1), C.oker, 44, 'center', 800);
    koe(ctx, 420, 780, 0.6, { t, a: q.on('koeien', 1) }); varken(ctx, 820, 780, 0.9, { t, a: q.on('varkens', 1) }); geit(ctx, 1160, 780, 1.0, { t, a: q.on('geiten', 1) }); schaapDg(ctx, 1460, 780, 1.0, { a: q.on('schapen', 1) });
    persoon(ctx, 'mila', 1760, 880, 400, { t, outfit: 'stal', uit: 'blij', kijk: -1 }); chip(ctx, 'dag en nacht op pad', 1100, 420, C.teal, q.on('nacht', 1), 28); }
});
