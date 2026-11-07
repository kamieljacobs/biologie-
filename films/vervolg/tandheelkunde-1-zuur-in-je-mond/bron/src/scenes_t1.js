// Wat word jij? · Tandheelkunde 1 · Zuur in je mond — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Mondhygiënist Ilse; Bilal snoept de hele middag; Sam eet de zak in één keer leeg).
// Rode draad: één zak snoep, twee manieren van eten.

// snoepje dat van (x0,y0) in een boog naar (x1,y1) vliegt; u 0..1
function snoepVlucht(ctx, x0, y0, x1, y1, u, i) { if (u <= 0 || u >= 1) return; const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 90; snoepje(ctx, x, y, 0.8, i, Math.min(1, (1 - u) * 6)); }
function scheiding(ctx, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(960, 200); ctx.lineTo(960, 860); ctx.stroke(); ctx.restore(); }
function tafeltje(ctx, x, y, w, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#7A5A40'; ctx.fillRect(x, y, w, 22); ctx.fillStyle = '#5E4430'; ctx.fillRect(x + 16, y + 22, 18, 880 - y - 22); ctx.fillRect(x + w - 34, y + 22, 18, 880 - y - 22); ctx.restore(); }

Object.assign(SCENES, {
  title(ctx, t) { const u = (t * 0.15) % 1; kies(ctx, 1420, 520, 0.95, { vlies: 1, plak: clamp(u * 2.5, 0, 1) * clamp((1 - u) * 5, 0, 1), t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); scheiding(ctx, q.on('Sam', 2));
    // Bilal: hele middag achter de computer, om het kwartier één snoepje
    bureau(ctx, 140, 640, 600, 1, t); const B = persoon(ctx, 'bilal', 330, 880, 430, { t, kijk: 1, uit: 'blij' });
    const kw = q.at('kwartier', 1), nB = t > kw ? Math.floor((t - kw) / 1.6) + 1 : 0, uB = t > kw ? ((t - kw) % 1.6) / 0.8 : 0;
    snoepzak(ctx, 210, 640, 0.75, 1 - Math.min(nB, 8) / 16, 1); if (nB > 0 && nB <= 8 && B.hoofd) snoepVlucht(ctx, 210, 520, B.hoofd.x + 20, B.hoofd.y + B.hoofd.r * 0.5, uB, nB);
    klokje(ctx, 600, 260, 54, clamp((t - kw) / 12, 0, 0.95), q.on('middag', 1)); metaA(ctx, 'de hele middag', 600, 350, q.on('middag', 1), C.text2, 'center', 22);
    naamBij(ctx, 'Bilal', '', 330, 420, q.on('Bilal', 1), 'center');
    // Sam: na het avondeten de hele zak in één keer
    const S = q.on('Sam', 2); if (S > 0.01) { ctx.save(); ctx.globalAlpha *= S; tafeltje(ctx, 1240, 660, 520); eetmoment(ctx, 1640, 620, 'bord', q.on('avondeten', 1));
      const P = persoon(ctx, 'sam', 1420, 880, 440, { t, kijk: 1, uit: t > q.at('leeg', 1) ? 'lacht' : 'blij' }); const z0 = q.at('hele', 2), z1 = q.at('leeg', 1) + 0.6, vu = clamp((t - z0) / (z1 - z0), 0, 1);
      snoepzak(ctx, 1490, 660, 0.75, 1 - vu, 1); if (vu > 0 && vu < 1 && P.hoofd) for (let k = 0; k < 3; k++) snoepVlucht(ctx, 1490, 540, P.hoofd.x + 20, P.hoofd.y + P.hoofd.r * 0.5, ((t - z0) * 2.2 + k / 3) % 1, k + 2);
      naamBij(ctx, 'Sam', '', 1420, 420, 1, 'center'); metaA(ctx, 'na het avondeten', 1640, 520, q.on('avondeten', 1), C.text2, 'center', 22); ctx.restore(); }
    tag(ctx, 'zelfde zak · zelfde suiker', 960, 180, C.goud, q.on('precies', 1), 'center', 30); vraagteken(ctx, 960, 560, q.on('gaatjes', 1), 120); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); kies(ctx, 960, 500, 1.0, { a: q.on('Om', 1), namen: q.on('kijken', 1), t }); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const kx = 470, ky = 500, ks = 0.92;
    const vl = q.on('vliesje', 1), hecht = clamp((t - q.at('bacteriën', 1)) / 5, 0, 1), deel = clamp((t - q.at('delen', 1)) / 3.5, 0, 1), sl = q.on('slijm', 1, 1.5);
    kies(ctx, kx, ky, ks, { vlies: vl, plak: Math.max(hecht * 0.35, clamp((t - q.at('delen', 1)) / 10, 0, 1)), t });
    const [hx, hy] = kiesPunt(kx, ky, ks, 'hals'); const Z = q.on('vliesje', 1, 0.8);
    zoomCircle(ctx, 1350, 440, 320, hx - 4, hy - 40, '', Z, () => plakZoom(ctx, 1350, 440, 320, { vlies: vl, hecht, deel, slijm: sl, spoel: q.on('spoelen', 1), t }));
    naamBij(ctx, 'tandplak', 'biofilm', hx - 20, hy - 120, q.on('tandplak', 1), 'right');
    wisselChip(ctx, [['vliesje', 1, 'vliesje van eiwitten uit speeksel', C.teal], ['bacteriën', 1, 'bacteriën zetten zich vast', C.oker], ['delen', 1, 'ze delen', C.oker], ['slijm', 1, 'kleverig slijm van suiker', C.groen], ['biofilm', 1, 'biofilm', C.goud], ['darmbewoners', 1, ''], ['plak', 2, 'het slijm houdt ze vast', C.goud], ['spoelen', 1, 'spoelen helpt niet', C.koraal]], 1350, 830, t, q, 28);
    const F = q.on('darmbewoners', 1) * (1 - q.on('plak', 2)); filmKaart(ctx, 'Je darmbewoners', 1350, 830, F);
    chip(ctx, 'honderden soorten · de meeste onschuldig', 1350, 70 + 100, C.groen, q.on('honderden', 1) * (1 - q.on('plak', 2)), 26); },

  s06(ctx, t, q) { bg(ctx, 'schema'); const I = q.on('Mondhygiënist', 1, 0.3);
    persoon(ctx, 'ilse', 330, 880, 440, { t, a: I, kijk: 1, pose: t > q.at('kleurt', 1) ? 'vasthouden' : 'wijs', uit: 'blij', hold: t > q.at('kleurt', 1) ? (c, x, y) => plakVerklikker(c, x, y + 10) : null });
    naamBij(ctx, 'Mondhygiënist Ilse', '', 330, 390, I, 'center');
    persoon(ctx, 'bilal', 620, 880, 430, { t, a: q.on('Bilal', 1, 0.3), kijk: 1, uit: t > q.at('alles', 1) ? 'verbaasd' : 'neutraal' });
    const pa = clamp((t - q.at('paarse', 1)) / 3, 0, 1); tandRij(ctx, 1020, 620, 720, { plak: 0.5, paars: pa, t });
    metaA(ctx, 'de tanden van bilal', 1380, 330, q.on('Bilal', 1), C.text2, 'center', 22);
    if (q.on('Langs', 1) > 0.01) { ctx.save(); ctx.globalAlpha *= q.on('Langs', 1) * (0.6 + 0.4 * Math.sin(t * 4)); ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.setLineDash([10, 8]); roundRect(ctx, 1000, 560, 760, 90, 30); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'hier poetst hij te kort', 1380, 790, C.goud, q.on('plekken', 1), 28); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const G = q.on('Binnen', 1, 0.8);
    if (G < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - G; zuurBacterie(ctx, 900, 420, 1.1, q.on('Zodra', 1), t, q.on('bacteriën', 1));
      naamBij(ctx, 'bacterie in de plak', '', 900, 300, q.on('bacteriën', 1), 'center'); naamBij(ctx, 'suiker', '', 470, 330, q.on('suiker', 1), 'center'); naamBij(ctx, 'melkzuur', '', 1330, 330, q.on('melkzuur', 1), 'center');
      filmKaart(ctx, 'Alles op adem', 900, 690, q.on('film', 1)); ctx.restore(); }
    if (G > 0.01) { const tb = q.at('Binnen', 1); phGrafiek(ctx, 300, 220, 1300, 520, { a: G, m0: -5, m1: 60, happen: [0], tot: lerp(-5, 9, (t - tb) / 5.2), ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
      metaA(ctx, 'ph in de plak', 300, 180, G, C.text2, 'left', 22); } },

  s08(ctx, t, q) { bg(ctx, 'schema'); const tl = q.at('omhoog', 1);
    kristal(ctx, 480, 420, 0.9, { a: q.on('glazuur', 1), weg: clamp((t - q.at('lossen', 1)) / 3, 0, 1), terug: clamp((t - q.at('terug', 1) + 2.5) / 3, 0, 1), t });
    naamBij(ctx, 'calcium', '', 260, 720, q.on('calcium', 1), 'center', C.goud); naamBij(ctx, 'fosfaat', '', 520, 720, q.on('fosfaat', 1), 'center', C.teal); metaA(ctx, 'kristal van glazuur', 480, 160, q.on('kristallen', 1), C.text2, 'center', 22);
    const tot = t < tl ? lerp(-5, 7, (t - 1) / 3) : lerp(7, 60, (t - tl) / 6);
    phGrafiek(ctx, 1000, 220, 800, 440, { a: q.on('Onder', 1), m0: -5, m1: 60, happen: [0], tot, kritA: q.on('5,5', 1), schaduw: q.on('ontkalken', 1), ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
    wisselChip(ctx, [['ontkalken', 1, 'ontkalken', C.koraal], ['speeksel', 1, 'speeksel vangt het zuur op', C.teal], ['terug', 1, 'herstel', C.groen]], 960, 830, t, q, 30); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const E = q.on('advies', 1, 0.8), G = 1 - E;
    if (G > 0.01) { const tk = [[0, '13:00'], [60, '14:00'], [120, '15:00'], [180, '16:00']], hB = []; for (let m = 0; m <= 180; m += 15) hB.push(m);
      phGrafiek(ctx, 470, 210, 1250, 230, { a: G, m0: -10, m1: 200, happen: hB, tot: lerp(-10, 200, (t - 0.4) / 10.8), kritA: 1, kritTekst: '', schaduw: q.on('zuur', 1), ticks: tk, ymin: 3.8, snoep: 1, lw: 4 });
      naamBij(ctx, 'Bilal', 'elk kwartier', 380, 300, G, 'right');
      const hS = [0, 1.5, 3, 4.5, 6, 7.5]; phGrafiek(ctx, 470, 560, 1250, 230, { a: G * q.on('Sam', 1), m0: -10, m1: 200, happen: hS, tot: lerp(-10, 200, (t - q.at('Sam', 1)) / 2.8), kritA: 1, kritTekst: '', schaduw: q.on('Sam', 1), ticks: [[0, '19:00'], [60, '20:00'], [120, '21:00'], [180, '22:00']], ymin: 3.8, col: C.teal, snoep: 1, lw: 4 });
      naamBij(ctx, 'Sam', 'hele zak', 380, 650, G * q.on('Sam', 1), 'right');
      regel(ctx, 'glazuur lost op', 1720, 180, G * q.on('Kijk', 1), C.goud, 26, 'right', 700);
      chip(ctx, 'geen herstel', 1500, 140, C.koraal, G * q.on('herstellen', 1), 26); chip(ctx, 'daarna rust', 1500, 520, C.groen, G * q.on('rust', 1), 26); }
    if (E > 0.01) { ctx.save(); ctx.globalAlpha *= E; regel(ctx, 'hooguit 7 eetmomenten per dag', 960, 240, q.on('zeven', 1), C.goud, 48, 'center', 800);
      for (let i = 0; i < 7; i++) { const bord = i % 2 === 0 && i < 6, f = i < 3 ? q.on('maaltijden', 1) : q.on('vier', 1); const soort = [0, 2, 4].includes(i) ? 'bord' : 'snoep'; eetmoment(ctx, 330 + i * 210, 420, soort, clamp(f * 3 - (i % 4) * 0.3, 0, 1), i); }
      naamBij(ctx, '3 maaltijden', '', 750, 540, q.on('maaltijden', 1), 'center', C.teal); naamBij(ctx, '+ 4 keer tussendoor', '', 1170, 540, q.on('vier', 1), 'center', C.goud);
      const Wt = q.on('Water', 1); glas(ctx, 860, 790, 0.9, Wt); kopje(ctx, 1060, 790, 1.1, q.on('thee', 1)); tag(ctx, 'telt niet mee', 1300, 750, C.groen, q.on('tellen', 1), 'left', 30); ctx.restore(); } },

  s10(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('kauwgom', 1);
    persoon(ctx, 'sam', 760, 880, 450, { t, kijk: 1, uit: 'blij', pose: K > 0.3 ? 'vasthouden' : 'staan', hold: K > 0.3 ? (c, x, y) => kauwgom(c, x, y + 20) : null });
    snoepzak(ctx, 1080, 880, 0.9, 0, 1); metaA(ctx, 'leeg', 1080, 690, q.on('zak', 1), C.text2, 'center', 22); vraagteken(ctx, 1300, 500, q.on('Helpt', 1), 120); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const hS = [0, 1.5, 3, 4.5, 6, 7.5], sn = q.at('sneller', 1);
    phGrafiek(ctx, 280, 260, 1100, 440, { m0: -5, m1: 70, happen: hS, tot: lerp(-5, 70, (t - sn + 0.6) / 2.2), rec: 9, col: C.groen, kritA: 1, kritTekst: '', ticks: [[0, 'snoep'], [30, '30 min'], [60, '60 min']], gestippeld: { rec: 20, col: C.text2 }, snoep: 1 });
    naamBij(ctx, 'zonder kauwgom', '', 1000, 470, 1, 'left', C.text2); naamBij(ctx, 'met kauwgom: meer speeksel', '', 620, 420, q.on('sneller', 1), 'left', C.groen);
    const Pl = q.on('Plak', 1); kauwgom(ctx, 1640, 380); kruis(ctx, 1640, 330, 40, Pl); naamBij(ctx, 'haalt geen plak weg', '', 1640, 450, Pl, 'center');
    tandenborstel(ctx, 1600, 640, 0.9, -0.15, q.on('tandenborstel', 1)); vink_(ctx, 1660, 720, 26, q.on('tandenborstel', 1)); },

  // ---------- H3 ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); const Bc = q.on('cariës', 1, 0.8), M = q.on('maagzuur', 1, 0.8), A = 1 - Bc;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; blikje(ctx, 260, 640, 1.1, '#B23A3A', 'cola', q.on('Frisdrank', 1)); sportfles(ctx, 470, 640, 1.1, q.on('sportdrank', 1)); sappak(ctx, 680, 640, 1.1, q.on('vruchtensap', 1));
      const ph = q.on('twee', 2); tag(ctx, 'pH 2,5', 260, 720, C.koraal, ph, 'center', 26); tag(ctx, 'pH 3–4', 470, 720, C.koraal, ph, 'center', 26); tag(ctx, 'pH 3–4', 680, 720, C.koraal, ph, 'center', 26);
      chip(ctx, 'geen bacteriën nodig', 470, 820, C.teal, q.on('bacteriën', 1), 26); ctx.restore(); }
    // rechter kies: zuur maakt de buitenkant zacht, daarna erosie
    const er = clamp((t - q.at('slijt', 1)) / 3, 0, 1);
    kies(ctx, 1360, 470, 0.85, { a: q.on('buitenkant', 1), zacht: q.on('buitenkant', 1) * (1 - er * 0.5), erosie: er, t });
    naamBij(ctx, 'zacht glazuur', '', 1360, 220, q.on('zacht', 1) * (1 - q.on('erosie', 1)), 'center', C.koraal); naamBij(ctx, 'erosie', 'overal dunner en gladder', 1360, 810, q.on('erosie', 1), 'center');
    if (Bc > 0.01) { ctx.save(); ctx.globalAlpha *= Bc * (1 - M); kies(ctx, 560, 470, 0.85, { plak: 0.8, gat: clamp((t - q.at('gaatje', 1)) / 2, 0, 1), t }); naamBij(ctx, 'cariës', 'gaatje waar plak blijft', 560, 810, 1, 'center'); ctx.restore(); }
    if (M > 0.01) { maagZuur(ctx, 520, 380, 1.1, M, q.on('omhoog', 1), t); naamBij(ctx, 'maagzuur', 'pH ≈ 1', 520, 810, M, 'center'); } },

  s14(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 480, 880, 440, { t, kijk: 1, pose: 'wijs', uit: 'neutraal' }); naamBij(ctx, 'Ilse', '', 480, 390, 1, 'center');
    bubbel(ctx, 700, 300, 'suiker: slecht voor je tanden', '#F2F2EE', q.on('suiker', 1), 30);
    const L = q.on('light', 1); persoon(ctx, 'bilal', 1000, 880, 430, { t, kijk: -1, uit: 'blij', pose: L > 0.3 ? 'vasthouden' : 'staan', hold: L > 0.3 ? (c, x, y) => colaLight(c, x, y + 40) : null });
    vraagteken(ctx, 1350, 480, q.on('goed', 1), 120); },

  s16(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const G = q.on('geen', 1);
    zuurBacterie(ctx, 480, 380, 0.75, 1, t, 0); kruis(ctx, 300, 380, 34, G); suikerRingetje(ctx, 300, 380, 22, 1); naamBij(ctx, 'geen suiker: geen zuur', '', 480, 520, G, 'center');
    blikje(ctx, 1300, 520, 1.15, '#B23A3A', 'cola', q.on('cola', 1), true); tag(ctx, 'pH ≈ 3: nog steeds zuur', 1300, 600, C.koraal, q.on('zelf', 1), 'center', 28);
    const Wt = q.on('Water', 1); glas(ctx, 480, 830, 0.8, Wt, 0.75); vink_(ctx, 600, 760, 26, Wt); naamBij(ctx, 'water', '', 650, 800, Wt, 'left', C.groen);
    const Wa = q.on('wacht', 1); klokje(ctx, 1180, 760, 60, clamp((t - q.at('wacht', 1)) / 1.5, 0, 1), Wa); tandenborstel(ctx, 1320, 760, 0.6, 0, Wa); naamBij(ctx, '1 uur wachten', '', 1180, 860, Wa, 'center'); },

  // ---------- H4 ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const T = q.on('tandpasta', 1, 0.8), A = 1 - T;
    if (A > 0.01) { ctx.save(); ctx.globalAlpha *= A; const fl = clamp((t - q.at('fluoride', 2)) / 4, 0, 1);
      kristal(ctx, 480, 420, 0.85, { fluor: fl, weg: 0, t }); naamBij(ctx, 'fluoride', '', 480, 720, q.on('fluoride', 2), 'center', C.groen); metaA(ctx, 'kristal van glazuur', 480, 170, 1, C.text2, 'center', 22);
      const u = q.on('lagere', 1, 1.2), kr = lerp(5.5, 4.5, u);
      phGrafiek(ctx, 1020, 220, 780, 420, { m0: -5, m1: 60, happen: [0], tot: 60, krit: kr, kritA: 1, kritTekst: u > 0.5 ? 'sterker glazuur' : 'glazuur lost op', schaduw: 1, ticks: [[0, 'hap'], [30, '30 min'], [60, '60 min']], snoep: 1 });
      wisselChip(ctx, [['lost', 1, 'lost minder snel op', C.groen], ['herstelt', 1, 'herstelt sneller', C.groen], ['nieuwe', 1, 'nieuw glazuur: sterker', C.groen]], 1410, 790, t, q, 28); ctx.restore(); }
    if (T > 0.01) { ctx.save(); ctx.globalAlpha *= T; tandpasta(ctx, 480, 360, 1.2, 1); tandenborstel(ctx, 470, 520, 1, 0, q.on('Poets', 1)); tag(ctx, '2 × per dag', 480, 660, C.goud, q.on('twee', 1), 'center', 30);
      wasbak(ctx, 1150, 560, q.on('spuug', 1), q.on('uit', 1)); naamBij(ctx, 'alleen uitspugen', '', 1150, 700, q.on('uit', 1), 'center', C.groen);
      glas(ctx, 1560, 600, 0.9, q.on('Spoel', 1), 0.7); kruis(ctx, 1560, 520, 50, q.on('Spoel', 1)); naamBij(ctx, 'niet naspoelen', '', 1560, 700, q.on('Spoel', 1), 'center', C.koraal); ctx.restore(); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 400, 880, 460, { t, kijk: 1, pose: t > q.at('kijkt', 1) ? 'wijs' : 'staan', uit: 'blij' }); naamBij(ctx, 'Ilse', 'mondhygiënist', 400, 370, q.on('Ilse', 1), 'center');
    const ts = q.at('tandsteen', 1), st = 1 - clamp((t - ts - 0.3) / 1.5, 0, 1);
    tandRij(ctx, 900, 600, 840, { plak: 0.6 * (1 - q.on('poetsen', 1) * 0.7), paars: 0.6 * q.on('kijkt', 1) * (1 - q.on('poetsen', 1)), steen: st, witPlek: q.on('witte', 1), borstel: (t > q.at('poetsen', 1) && t < q.at('tussen', 1)) ? 1 : -1, ragertje: (t > q.at('tussen', 1) && t < ts) ? 0.5 : -1, t });
    wisselChip(ctx, [['plak', 1, 'waar blijft de plak zitten?', C.goud], ['poetsen', 1, 'beter poetsen', C.teal], ['tussen', 1, 'ook tussen je tanden', C.teal], ['tandsteen', 1, 'tandsteen weghalen', C.oker], ['witte', 1, 'wit plekje: glazuur ontkalkt', C.text2], ['redden', 1, 'nog te redden', C.groen]], 1320, 800, t, q, 28); },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'bilal', 280, 880, 400, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'sam', 1660, 880, 410, { t, kijk: -1, uit: 'blij' });
    const hB = []; for (let m = 0; m <= 180; m += 15) hB.push(m);
    phGrafiek(ctx, 560, 200, 800, 200, { m0: -10, m1: 200, happen: hB, tot: 200, kritA: 1, kritTekst: '', schaduw: q.on('rust', 1), ymin: 3.8, lw: 4 }); naamBij(ctx, 'Bilal', '', 280, 440, 1, 'center');
    phGrafiek(ctx, 560, 500, 800, 200, { m0: -10, m1: 200, happen: [0, 1.5, 3, 4.5, 6, 7.5], tot: 200, kritA: 1, kritTekst: '', schaduw: q.on('rust', 1), ymin: 3.8, col: C.teal, lw: 4 }); naamBij(ctx, 'Sam', '', 1660, 440, 1, 'center');
    chip(ctx, 'zelfde zak · zelfde suiker', 960, 160, C.goud, q.on('Zelfde', 1) * (1 - q.on('Voor', 1)), 28);
    tag(ctx, 'hoe vaak telt zwaarder dan hoeveel', 960, 820, C.goud, q.on('vaak', 1), 'center', 32); },

  s20(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'ilse', 330, 880, 450, { t, kijk: 1, uit: 'blij', pose: 'wijs' }); naamBij(ctx, 'Ilse', 'mondhygiënist', 330, 380, 1, 'center');
    tag(ctx, 'hbo · Mondzorgkunde · 4 jaar', 960, 230, C.teal, q.on('Mondzorgkunde', 1), 'center', 34);
    [['Nijmegen', 1], ['Utrecht', 1], ['Amsterdam', 1], ['Groningen', 1]].forEach(([s2, n], i) => chip(ctx, s2, 690 + i * 180, 320, C.text2, q.on(s2, n), 26));
    chip(ctx, 'selectie: meer aanmeldingen dan plaatsen', 960, 420, C.koraal, q.on('selectie', 1), 26); chip(ctx, 'zelf patiënten behandelen', 960, 510, C.groen, q.on('patiënten', 1), 26);
    const Wd = q.on('tandarts', 2, 0.3); persoon(ctx, 'wouter', 1600, 880, 470, { t, a: Wd, kijk: -1, uit: 'blij' }); naamBij(ctx, 'Tandarts Wouter', '', 1600, 370, Wd, 'center');
    tag(ctx, 'universiteit · Tandheelkunde · 6 jaar', 960, 640, C.paars, q.on('tandheelkunde', 1), 'center', 32);
    filmKaart(ctx, 'volgende film: Van glazuur tot zenuw', 960, 780, q.on('volgende', 1)); }
});
