// Wat word jij? · Geneeskunde · Van klacht naar diagnose — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Opa Henk, Dr. Kim als huisarts).

Object.assign(SCENES, {
  title(ctx, t) { keten(ctx, 1380, 560, 0.7, 1, 2, t, 0); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('huisarts', 1, 0.8);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; trapje(ctx, 240, 880, 6, 110, 70, 1); persoon(ctx, 'henk', 590, 880 - 3 * 70, 440, { t, uit: 'verbaasd', pose: 'handenHeup', kijk: 1 }); naamBij(ctx, 'Opa Henk', '71 jaar', 680, 300, q.on('Henk', 1)); chip(ctx, 'buiten adem op de trap', 1180, 420, C.koraal, q.on('adem', 1), 30); ctx.restore(); }
    if (K > 0.01) { ctx.save(); ctx.globalAlpha *= K; bureau(ctx, 520, 700, 1); persoon(ctx, 'kim', 300, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'henk', 760, 880, 440, { t, kijk: -1, uit: 'neutraal' }); naamBij(ctx, 'Dr. Kim', 'huisarts', 160, 320, 1); ctx.restore();
      longIcoon(ctx, 1150, 420, 0.8, q.on('longen', 1)); druppelIcoon(ctx, 1450, 420, 0.8, q.on('bloed', 1)); hartIcoon(ctx, 1750, 420, 0.8, q.on('hart', 1), C.koraal, t, 1);
      regel(ctx, 'longen', 1150, 560, q.on('longen', 1), C.text, 30, 'center', 700); regel(ctx, 'bloed', 1450, 560, q.on('bloed', 1), C.text, 30, 'center', 700); regel(ctx, 'hart', 1750, 560, q.on('hart', 1), C.text, 30, 'center', 700); vraagteken(ctx, 1450, 720, q.on('denk', 1), 100); } },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const zw = t > q.at('hart', 2) ? 2 : t > q.at('bloedarmoede', 1) ? 1 : t > q.at('longziekte', 1) ? 0 : -1;
    keten(ctx, 960, 400, 1, q.on('Zuurstof', 1), zw, t, q.on('longen', 1)); tag(ctx, 'film: Gas op reis', 960, 230, C.teal, q.on('Gas', 1), 'center', 26);
    chip(ctx, 'longen: hoesten, piepen', 480, 690, C.teal, q.on('longziekte', 1), 26); chip(ctx, 'bloed: moe en bleek', 880, 690, C.koraal, q.on('bloedarmoede', 1), 26); chip(ctx, 'hart: erger als je plat ligt, dikke enkels', 1400, 690, C.goud, q.on('Plat', 1), 28); regel(ctx, 'de zwakke schakel zoeken', 960, 820, q.on('schakel', 2), C.goud, 36, 'center', 800); },

  // ---------- H2 ----------
  s05(ctx, t, q) { bg(ctx, 'schema'); const O = q.on('onderzoekt', 1, 0.6);
    bureau(ctx, 520, 700, 1); persoon(ctx, 'kim', 300, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal', pose: O > 0.5 ? 'wijs' : 'staan' }); persoon(ctx, 'henk', 760, 880, 440, { t, kijk: -1, uit: 'neutraal' });
    if (O < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - O; ['sinds wanneer?', 'wanneer erger?', 'hoest u?', 'extra kussens?'].forEach((s2, i) => bubbel(ctx, 1200 + (i % 2) * 360, 260 + Math.floor(i / 2) * 130, s2, '#F2F2EE', q.on(['Sinds', 'Wanneer', 'Hoest', 'kussens'][i], i === 1 ? 2 : 1), 30));
      tag(ctx, 'anamnese', 1380, 560, C.goud, q.on('anamnese', 1), 'center', 34); chip(ctx, "'s nachts benauwd · drie kussens", 1380, 660, C.koraal, q.on('drie', 1), 28); ctx.restore(); }
    if (O > 0.01) { ctx.save(); ctx.globalAlpha *= O; const st = q.on('stethoscoop', 1); if (st > 0.01) { ctx.save(); ctx.globalAlpha *= st; ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(400, 560); ctx.bezierCurveTo(520, 640, 600, 520, 720, 560); ctx.stroke(); circ(ctx, 724, 560, 14, '#9AA3B2', '#3A3F4E', 3); golf(ctx, 1080, 260, 200, 14, st, { t }); ctx.restore(); } longIcoon(ctx, 1180, 360, 0.9, q.on('stethoscoop', 1), C.teal, q.on('geknisper', 1)); naamBij(ctx, 'zacht geknisper', 'onderin de longen', 1180, 520, q.on('geknisper', 1), 'center');
      enkel(ctx, 1520, 440, 0.9, q.on('enkel', 1), q.on('putje', 1)); naamBij(ctx, 'putje blijft staan', 'vocht in de enkel', 1540, 580, q.on('putje', 1), 'center');
      satMeter(ctx, 1780, 360, q.on('zuurstof', 1), '93%'); vraagteken(ctx, 1500, 760, q.on('denk', 1), 90); ctx.restore(); } },

  // ---------- H3 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const E = q.on('echo', 1, 0.8);
    ddLijst(ctx, 140, 260, 1 - E, [['hartfalen', 0.8, q.on('Bovenaan', 1)], ['longziekte', 0.35, q.on('Daaronder', 1)], ['bloedarmoede', 0.25, q.on('bloedarmoede', 1)]], t > q.at('verhoogd', 1) ? 0 : -1);
    tag(ctx, 'differentiaaldiagnose', 420, 640, C.goud, q.on('differentiaaldiagnose', 1) * (1 - E), 'center', 30);
    buisje(ctx, 900, 420, q.on('bloed', 1) * (1 - E)); tag(ctx, 'hartstof: sterk verhoogd', 1180, 300, C.koraal, q.on('verhoogd', 1) * (1 - E), 'center', 26); buisje(ctx, 1500, 420, q.on('rode', 1) * (1 - E)); tag(ctx, 'rode bloedcellen: normaal', 1500, 580, C.groen, q.on('normaal', 1) * (1 - E), 'center', 26);
    if (E > 0.01) { echoScherm(ctx, 160, 230, 560, 420, E, t, 1); naamBij(ctx, 'echo van het hart', 'knijpt zwak', 440, 700, E, 'center');
      longIcoon(ctx, 1080, 420, 1, q.on('hoopt', 1), C.teal, clamp((t - q.at('lekt', 1)) / 2, 0, 1)); naamBij(ctx, 'vocht in de longen', 'geknisper', 1080, 600, q.on('lekt', 1), 'center');
      nierIcoon(ctx, 1450, 400, 1, q.on('nieren', 1)); naamBij(ctx, 'nieren', 'houden water vast', 1470, 520, q.on('nieren', 1), 'center'); enkel(ctx, 1720, 430, 0.75, q.on('enkels', 1), 1);
      regel(ctx, 'diagnose: hartfalen', 960, 800, q.on('diagnose', 2), C.goud, 48, 'center', 800); } },

  // ---------- H4 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); bureau(ctx, 960, 700, 1); persoon(ctx, 'kim', 720, 880, 470, { t, kijk: 1, outfit: 'gewoon', uit: 'neutraal' }); persoon(ctx, 'henk', 1200, 880, 440, { t, kijk: -1, uit: q.on('tuin', 1) > 0.5 ? 'blij' : 'neutraal' });
    bubbel(ctx, 560, 300, 'in gewone woorden', '#F2F2EE', q.on('gewone', 1), 28); bubbel(ctx, 1360, 300, 'weer in mijn tuin werken', '#F2F2EE', q.on('tuin', 1), 28);
    card(ctx, 120, 420, 380, 160, 'plastabletten', 'vocht eruit · vaak naar de wc', q.on('Plastabletten', 1), C.teal); card(ctx, 1420, 420, 380, 160, 'én hartmedicijn', 'ontlast het hart', q.on('ontlasten', 1), C.teal); vraagteken(ctx, 960, 240, q.on('denk', 1), 90); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const T = q.on('ochtends', 1, 0.8);
    if (T < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - T; tag(ctx, 'samen beslissen', 960, 260, C.goud, q.on('samen', 1), 'center', 38); card(ctx, 360, 360, 480, 170, 'de arts', 'kennis over wat werkt', q.on('kennis', 1), C.teal); card(ctx, 1080, 360, 480, 170, 'de patiënt', 'wat voor hem telt', q.on('telt', 1), C.goud); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; zon(ctx, 260, 260, 50, 1, t); regel(ctx, "'s ochtends tabletten", 260, 380, 1, C.text, 30, 'center', 700); persoon(ctx, 'henk', 900, 880, 440, { t, uit: 'blij', kijk: 1 }); weegschaal(ctx, 900, 880, q.on('weegt', 1)); chip(ctx, 'elke dag wegen · +2 kilo in een paar dagen? bellen', 1400, 520, C.goud, q.on('weegt', 1), 28);
      chip(ctx, "'s middags tuinieren", 1400, 400, C.groen, q.on('tuinieren', 1), 30); ctx.restore(); } },

  // ---------- Recap ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); keten(ctx, 860, 330, 0.8, 1, 2, t, 1); trapje(ctx, 1500, 560, 4, 70, 45, q.on('trap', 1)); persoon(ctx, 'henk', 1640, 560 - 2 * 45, 300, { t, a: q.on('trap', 1, 0.3), uit: 'blij', kijk: -1 }); ['klacht', 'vragen', 'onderzoeken', 'toetsen', 'samen beslissen'].forEach((s2, i) => { tag(ctx, s2, 260 + i * 350, 700, i === 4 ? C.goud : C.teal, q.on(i === 0 ? 'klacht' : s2.split(' ')[0], i === 0 ? 2 : 1), 'center', 30); if (i) pijl(ctx, 260 + (i - 1) * 350 + 130, 688, 260 + i * 350 - 140, 688, C.line, q.on(i === 4 ? 'samen' : s2, 1), 3, 12); }); },
  s12(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'geneeskunde · 6 jaar', 960, 260, C.teal, q.on('Geneeskunde', 1), 'center', 36); tag(ctx, 'huisarts · + 3 jaar', 620, 400, C.goud, q.on('huisarts', 1), 'center', 30); tag(ctx, 'specialist · + 4 tot 6 jaar', 1300, 400, C.goud, q.on('specialist', 1), 'center', 30);
    regel(ctx, 'bv. cardioloog, longarts', 1300, 480, q.on('cardioloog', 1), C.text2, 28, 'center', 600); persoon(ctx, 'kim', 960, 880, 380, { t, outfit: 'gewoon', uit: 'blij' }); }
});
