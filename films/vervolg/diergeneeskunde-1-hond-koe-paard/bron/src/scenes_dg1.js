// Wat word jij? · Diergeneeskunde 1 · Hond, koe, paard — scènes per alinea (v1.0, 21 okt 2026). Look: Schema, met cast (Dierenarts Mila, Noor met haar kat).
// Rode draad: één werkdag van Mila met drie bezoeken.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
const KOE_S = 1.25; // koe groot in doorsnede

Object.assign(SCENES, {
  title(ctx, t) { koe(ctx, 1120, 600, 0.75, { t, kauw: 1 }); paard(ctx, 1600, 620, 0.62, { t }); kat(ctx, 1380, 860, 0.9, { t }); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'mila', 300, 880, 460, { t, uit: 'blij', pose: q.on('Toch', 1) > 0.5 ? 'schouders' : 'zwaai' }); naamBij(ctx, 'Dierenarts Mila', '', 300, 380, q.on('Mila', 1), 'center');
    const K = q.on('koe', 1), P = q.on('paard', 1), Kt = q.on('kat', 1);
    paneel(ctx, 600, 200, 400, 560, '', K); koe(ctx, 790, 640, 0.62, { t, a: K }); regel(ctx, 'eet niet meer', 800, 720, K, C.text, 30, 'center', 700);
    paneel(ctx, 1040, 200, 400, 560, '', P); paard(ctx, 1220, 660, 0.55, { t, a: P, pijn: 1 }); regel(ctx, 'buikpijn', 1240, 720, P, C.text, 30, 'center', 700);
    paneel(ctx, 1480, 200, 360, 560, '', Kt); kat(ctx, 1660, 620, 1.1, { t, a: Kt, ziek: 1 }); regel(ctx, 'iets binnengekregen', 1660, 720, Kt, C.text, 30, 'center', 700);
    tag(ctx, 'één studie', 300, 250, C.goud, q.on('studie', 1), 'center', 34); vraagteken(ctx, 1240, 150, q.on('kan', 1), 90); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); const B = clamp((t - q.at('opperarm', 1)) / 3, 0, 1) * q.on('opperarm', 1, 0.3);
    const A0 = Math.max(0.35, q.on('skelet', 1)); persoon(ctx, 'noor', 640, 860, 240, { t, a: A0 }); hond(ctx, 1150, 860, 0.5, { t, a: A0 }); paard(ctx, 1640, 860, 0.36, { t, a: A0 });
    regel(ctx, 'mens', 480, 260, q.on('mens', 1), C.text, 38, 'center', 800); armBotten(ctx, 'mens', 480, 320, 460, q.on('mens', 1), 0.3 + B * 0.7);
    regel(ctx, 'hond', 960, 260, q.on('hond', 1), C.text, 38, 'center', 800); armBotten(ctx, 'hond', 950, 320, 460, q.on('hond', 1), 0.3 + B * 0.7);
    regel(ctx, 'paard', 1440, 260, q.on('paard', 1), C.text, 38, 'center', 800); armBotten(ctx, 'paard', 1420, 320, 460, q.on('paard', 1), 0.3 + B * 0.7);
    naamBij(ctx, 'opperarm', '', 140, 400, q.on('opperarm', 1), 'left', C.goud); naamBij(ctx, 'spaakbeen', 'en ellepijp', 140, 560, q.on('spaakbeen', 1), 'left', C.teal); naamBij(ctx, 'hand en vingers', '', 140, 740, q.on('verhoudingen', 1), 'left', C.koraal);
    chip(ctx, 'paard: op de top van één middelvinger', 1500, 250, C.paars, q.on('middelvinger', 1), 26);
    tag(ctx, 'film: Hoe weten we dat? · homologe botten', 960, 190, C.teal, q.on('homologe', 1), 'center', 28); },

  s05(ctx, t, q) { bg(ctx, 'schema'); regel(ctx, 'wat is normaal?', 960, 210, q.on('normaal', 1), C.goud, 48, 'center', 800);
    const T = Math.max(0.4, q.on('hartslag', 1)); hartTabel(ctx, 400, 330, [['paard', '± 30 per minuut', 0.15, C.groen], ['mens', '± 70', 0.35, C.text2], ['hond', '± 90', 0.45, C.text2], ['kat', '± 140 per minuut', 0.7, C.koraal]], T, clamp((t - q.at('hartslag', 1)) / 2.5, 0, 1));
    paard(ctx, 230, 420, 0.28, { t, a: T }); kat(ctx, 300, 640, 0.55, { t, a: q.on('kat', 1) });
    chip(ctx, 'bij een kat: levensgevaarlijk traag', 1300, 720, C.koraal, q.on('levensgevaarlijk', 1), 28); chip(ctx, 'een lijst normaalwaarden per diersoort', 960, 830, C.goud, q.on('lijst', 1), 28); },

  // ---------- H2 ----------
  s06(ctx, t, q) { bg(ctx, 'schema'); koe(ctx, 520, 760, 1.05, { t, kauw: q.on('eet', 1) }); grasPol(ctx, 760, 762, 300, q.on('gras', 1), t);
    cellulose(ctx, 1080, 400, 6, 34, q.on('cellulose', 1), 0, t); naamBij(ctx, 'cellulose', 'keten van glucose', 1260, 500, q.on('cellulose', 1), 'center', C.groen);
    chip(ctx, 'geen enzym om dit te knippen', 1260, 600, C.koraal, q.on('enzymen', 1), 28); persoon(ctx, 'noor', 1700, 880, 320, { t, uit: 'denkt', a: q.on('Jij', 1) }); vraagteken(ctx, 1260, 250, q.on('energie', 1), 100); },

  s08(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const u = clamp((t - q.at('vier', 1)) / 3, 0, 1);
    koe(ctx, 700, 830, KOE_S, { t, doorsnede: q.on('maag', 1), binnen: (c) => koeMagen(c, u, q.on('pens', 1) > 0.5 ? 'pens' : null, t) });
    naamBij(ctx, 'pens', '± 150 liter', 520, 380, q.on('pens', 1), 'center', '#C9DFA8');
    const M = q.on('microben', 1); if (M > 0.01) { ctx.save(); ctx.globalAlpha *= M; paneel(ctx, 1260, 260, 560, 420, '', 1); for (let i = 0; i < 7; i++) microbe(ctx, 1320 + hash(i * 3) * 440, 320 + hash(i * 7) * 120, 1.3, hash(i) * 3, t); cellulose(ctx, 1320, 520, 5, 26, 1, q.on('breken', 1), t); ctx.restore(); }
    chip(ctx, 'vetzuren → belangrijkste brandstof', 1540, 730, C.goud, q.on('vetzuren', 1), 26); belletjes(ctx, 1010, 600, q.on('methaan', 1), t); naamBij(ctx, 'methaan', 'uitgeboerd', 1060, 380, q.on('methaan', 1), 'left', '#C9DFA8'); },

  s09(ctx, t, q) { bg(ctx, 'schema'); const L = q.on('netmaag', 1);
    koe(ctx, 700, 830, KOE_S, { t, doorsnede: 1, kauw: q.on('kauwt', 1) * (1 - L), binnen: (c) => koeMagen(c, 1, L < 0.5 ? null : (t < q.at('boekmaag', 1) ? 'net' : t < q.at('lebmaag', 1) ? 'boek' : 'leb'), t) });
    if (q.on('terug', 1) > 0.01 && L < 0.5) { const f = clamp((t - q.at('terug', 1)) / 2, 0, 1); const px = 700 + KOE_S * (-20 + f * 270), py = 830 + KOE_S * (-180 + f * 30); circ(ctx, px, py, 16, C.groen, '#C9DFA8', 2); }
    regel(ctx, 'herkauwen', 1480, 260, q.on('herkauwen', 1), C.goud, 52, 'center', 800); chip(ctx, '± 8 uur per dag', 1480, 340, C.goud, q.on('acht', 1), 28);
    naamBij(ctx, 'netmaag', '', 860, 600, q.on('netmaag', 1), 'left', '#D8AE7E'); naamBij(ctx, 'boekmaag', '', 880, 690, q.on('boekmaag', 1), 'left', '#BBA0D0'); naamBij(ctx, 'lebmaag', 'echte maag: maagzuur en enzymen', 640, 760, q.on('lebmaag', 1), 'center', '#F0A890');
    chip(ctx, 'microben verteerd: eiwit', 1480, 460, C.groen, q.on('eiwit', 1), 28); },

  s10(ctx, t, q) { bg(ctx, 'schema'); const S = q.on('stil', 1), P = q.on('ping', 1), V = q.on('verschoven', 1);
    koe(ctx, 820, 800, 1.15, { t, doorsnede: V, binnen: (c) => koeMagen(c, V, 'leb', t, { gas: V, verschoven: V }) });
    persoon(ctx, 'mila', 300, 880, 440, { t, pose: 'wijs', uit: S > 0.5 ? 'denkt' : 'neutraal', outfit: 'stal' }); naamBij(ctx, 'linkerkant', 'van de buik', 760, 360, q.on('linkerkant', 1), 'center');
    luisteren(ctx, 700, 600, q.on('stethoscoop', 1) * (1 - P), (1 - S), t, ''); chip(ctx, S > 0.5 ? 'stil' : 'gezond: 1–2 × per minuut gerommel', 1250, 290, S > 0.5 ? C.koraal : C.goud, q.on('gezonde', 1) * (1 - P), 28);
    if (P > 0.01) { ping(ctx, 760, 560, P, t); tag(ctx, 'ping!', 760, 470, C.goud, P, 'center', 34); }
    naamBij(ctx, 'lebmaag vol gas', 'verschoven', 1100, 400, V, 'left', '#F0A890'); chip(ctx, 'terugzetten: kleine operatie', 1450, 700, C.teal, q.on('operatie', 1), 28); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('gras', 1), u = clamp((t - q.at('maag', 1)) / 4, 0, 1);
    paard(ctx, 820, 860, 1.25, { t, pijn: (1 - D) * q.on('schopt', 1), doorsnede: D, binnen: (c) => paardDarm(c, u, t > q.at('blinde', 1) ? 'blinde' : null, t) });
    regel(ctx, 'koliek = buikpijn', 1520, 230, q.on('koliek', 1), C.koraal, 44, 'center', 800); persoon(ctx, 'mila', 1650, 880, 420, { t, outfit: 'stal', uit: 'bezorgd', a: q.on('koliek', 1, 0.3) });
    naamBij(ctx, 'één kleine maag', '', 1250, 560, q.on('kleine', 1), 'left', '#F0A890'); naamBij(ctx, 'blinde darm', 'gistingsvat', 760, 760, q.on('blinde', 1), 'center', '#C9DFA8'); naamBij(ctx, 'dikke darm', '', 540, 520, q.on('dikke', 1), 'center', '#C9DFA8'); },

  s12(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Mila', 1, 0.8);
    paard(ctx, 820, 860, 1.25, { t, doorsnede: 1 - K * 0.9, binnen: (c) => paardDarm(c, 1, 'maag', t, { slot: q.on('sluitspier', 1) }) });
    naamBij(ctx, 'sluitspier', 'kan bijna niet braken', 1250, 470, q.on('sluitspier', 1) * (1 - K), 'left', C.goud);
    chip(ctx, 'verstopt of gedraaid: niets kan terug', 1450, 620, C.koraal, q.on('gedraaid', 1) * (1 - K), 28); tag(ctx, 'altijd een spoedgeval', 1450, 720, C.koraal, q.on('spoedgeval', 1), 'center', 32);
    if (K > 0.01) { persoon(ctx, 'mila', 300, 880, 440, { t, outfit: 'stal', uit: 'neutraal', pose: 'wijs', kijk: 1, a: K }); chip(ctx, 'darmen voelen', 1380, 300, C.teal, q.on('endeldarm', 1), 26); chip(ctx, 'tandvlees', 1380, 360, C.teal, q.on('tandvlees', 1), 26); chip(ctx, 'hartslag', 1380, 420, C.teal, q.on('hartslag', 1), 26); chip(ctx, 'hoog en pijn blijft → kliniek', 1380, 500, C.koraal, q.on('kliniek', 1), 26); } },

  // ---------- H4 ----------
  s13(ctx, t, q) { bg(ctx, 'schema'); persoon(ctx, 'noor', 500, 880, 440, { t, uit: q.on('hoofdpijn', 1) > 0.5 ? 'bezorgd' : 'neutraal', pose: q.on('halve', 1) > 0.5 ? 'vasthouden' : 'staan', hold: (c, x, y) => tablet(c, x + 10, y, 20, 1, 1) }); naamBij(ctx, 'Noor', '', 500, 400, q.on('Noor', 1), 'center');
    kat(ctx, 900, 880, 1.6, { t, a: q.on('kat', 1) }); chip(ctx, 'een halve tablet paracetamol', 1400, 400, C.oker, q.on('halve', 1), 30); chip(ctx, 'voor jou: gewone pijnstiller', 1400, 480, C.text2, q.on('jou', 1), 28); vraagteken(ctx, 1400, 650, q.on('kat', 3), 120); },

  s15(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const R = q.on('rode', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - R;
    tag(ctx, 'film: De lever als fabriek', 960, 230, C.teal, q.on('fabriek', 1), 'center', 28);
    leverRoutes(ctx, 760, 560, q.on('lever', 1) + q.on('paracetamol', 1), q.on('mist', 1), Math.max(q.on('tussenproduct', 1) * 0.4, q.on('Daardoor', 1)), t);
    regel(ctx, 'mens', 300, 360, q.on('mens', 1) * (1 - q.on('kat', 1)), C.text, 36, 'center', 800); regel(ctx, 'kat', 300, 360, q.on('kat', 1), C.koraal, 36, 'center', 800); ctx.restore();
    if (R > 0.01) { ctx.save(); ctx.globalAlpha *= R; const br = q.on('bruin', 1); for (let i = 0; i < 7; i++) rodeBloedcel(ctx, 260 + i * 110, 380 + (i % 2) * 70, 44, Math.max(br, q.on('beschadigt', 1) * 0.4), 1); naamBij(ctx, 'rode bloedcellen', 'minder zuurstof', 600, 560, 1, 'center', C.koraal);
      kat(ctx, 1300, 860, 1.6, { t, ziek: 1 }); chip(ctx, 'bruin tandvlees, moeilijk ademen', 1300, 400, C.koraal, br, 28); persoon(ctx, 'mila', 1700, 880, 420, { t, uit: 'bezorgd', kijk: -1, a: q.on('tegengif', 1) }); chip(ctx, 'tegengif en zuurstof', 1650, 300, C.groen, q.on('tegengif', 1), 28);
      tag(ctx, 'eerst de dierenarts bellen', 600, 760, C.goud, q.on('bellen', 1), 'center', 32); ctx.restore(); } },

  s16(ctx, t, q) { bg(ctx, 'schema'); const D = q.on('doseert', 1, 0.8);
    ctx.save(); ctx.globalAlpha *= 1 - D;
    hond(ctx, 350, 820, 1.4, { t, a: Math.max(0.4, q.on('collies', 1)) }); naamBij(ctx, 'collie', '± 3 op de 4: afwijking in het gen', 350, 470, q.on('drie', 1), 'center');
    bloedHersen(ctx, 1150, 700, q.on('pompje', 1), q.on('honden', 1) > 0.5 ? 0 : 1, q.on('honden', 1, 2), t); ctx.restore();
    if (D > 0.01) { ctx.save(); ctx.globalAlpha *= D; persoon(ctx, 'mila', 400, 880, 440, { t, uit: 'denkt', pose: 'denk' }); chip(ctx, 'niet alleen per kilo', 1100, 300, C.text2, 1, 30); tag(ctx, 'welke soort?', 900, 480, C.teal, q.on('soort', 1), 'center', 36); tag(ctx, 'welk ras?', 1200, 580, C.oker, q.on('ras', 1), 'center', 36); tag(ctx, 'welk dier?', 1500, 680, C.goud, q.on('dier', 2), 'center', 36); ctx.restore(); } },

  // ---------- Recap ----------
  s17(ctx, t, q) { bg(ctx, 'schema'); const K = Math.max(0.35, q.on('koe', 1)), P = Math.max(0.35, q.on('paard', 1)), Kt = Math.max(0.35, q.on('kat', 1));
    paneel(ctx, 160, 220, 500, 460, '', K); koe(ctx, 400, 600, 0.6, { t, a: K }); regel(ctx, 'verschoven lebmaag', 410, 660, K, C.text, 28, 'center', 700);
    paneel(ctx, 710, 220, 500, 460, '', P); paard(ctx, 940, 620, 0.5, { t, a: P }); regel(ctx, 'kan niet braken', 960, 660, P, C.text, 28, 'center', 700);
    paneel(ctx, 1260, 220, 500, 460, '', Kt); kat(ctx, 1510, 590, 1.1, { t, a: Kt }); regel(ctx, 'geen paracetamol', 1510, 660, Kt, C.text, 28, 'center', 700);
    regel(ctx, 'één bouwplan, drie aanpassingen', 960, 160, q.on('bouwplan', 1), C.goud, 44, 'center', 800); tag(ctx, 'een vergelijkend bioloog', 960, 800, C.teal, q.on('bioloog', 1), 'center', 34); },
  s18(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'Universiteit Utrecht · de enige opleiding', 960, 220, C.goud, Math.max(0.4, q.on('Utrecht', 1)), 'center', 34);
    opleidingLijn(ctx, 360, 300, 1200, q.on('bachelor', 1), q.on('master', 1));
    const R = q.on('kies', 1); kat(ctx, 520, 760, 1.0, { t, a: R }); regel(ctx, 'gezelschapsdieren', 520, 830, q.on('gezelschapsdieren', 1), C.teal, 30, 'center', 700);
    koe(ctx, 960, 760, 0.5, { t, a: R }); regel(ctx, 'landbouwhuisdieren', 960, 830, q.on('landbouwhuisdieren', 1), C.oker, 30, 'center', 700);
    paard(ctx, 1400, 760, 0.44, { t, a: R }); regel(ctx, 'paarden', 1420, 830, q.on('paarden', 1, 0.3), C.goud, 30, 'center', 700);
    persoon(ctx, 'mila', 1760, 880, 380, { t, uit: 'blij', kijk: -1 }); }
});
