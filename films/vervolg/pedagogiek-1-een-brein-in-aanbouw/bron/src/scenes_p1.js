// Wat word jij? · Pedagogiek · Een brein in aanbouw — scènes per alinea (v1.0, 20 okt 2026). Look: Schema, met cast (Bilal, Sam, Daan, baby).
// Rode draad: Bilal en het rode licht.

function vergKaart(ctx, x, y, w, h, titel, regels, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(col, 0.14), col, 2); text(ctx, titel, x + w / 2, y + 56, fTekst(38, 700), col, 'center'); regels.forEach((r, i) => text(ctx, r, x + w / 2, y + 112 + i * 44, fTekst(32, 600), C.text, 'center')); ctx.restore(); }
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// straatbeeld: weg onderaan, licht rechts; groep = Bilal alleen (0) of met vrienden (1); door = 0..1 rijdt door
function kruisBeeld(ctx, t, groepA, door, licht = 'rood') { wegStrook(ctx, 760); verkeerslicht(ctx, 1500, 420, 1, 1, licht);
  const dx = door * 420; fietsje(ctx, 1060 + dx, 805, 1.2, 1, '#AFC0D0'); persoon(ctx, 'bilal', 900 + dx, 800, 440, { t, uit: groepA > 0.5 ? 'lacht' : 'neutraal' });
  fietsje(ctx, 820 + dx, 805, 1.1, groepA, '#AFC0D0'); persoon(ctx, 'sam', 680 + dx, 800, 400, { t, a: groepA, uit: 'lacht' }); fietsje(ctx, 600 + dx, 805, 1.05, groepA, '#AFC0D0'); persoon(ctx, 'daan', 480 + dx, 800, 380, { t, a: groepA, uit: 'blij' }); }

Object.assign(SCENES, {
  title(ctx, t) { breinRijping(ctx, 1560, 620, 0.72, 1, 0.75, t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema'); const V = q.on('vrienden', 1, 0.6); const door = clamp((t - q.at('door', 1)) / 2.5, 0, 1);
    kruisBeeld(ctx, t, V, V > 0.5 ? door : 0); naamBij(ctx, 'Bilal', '17 jaar', 1000, 300, q.on('Bilal', 1) * (1 - V));
    chip(ctx, 'alleen: wacht altijd', 500, 200, C.groen, q.on('alleen', 1) * (1 - V), 30); chip(ctx, 'met vrienden: fietst door', 500, 200, C.koraal, V, 30); chip(ctx, 'weet: gevaarlijk', 1150, 200, C.teal, q.on('gevaarlijk', 1), 30); vraagteken(ctx, 1780, 260, q.on('Waarom', 1), 100); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); tag(ctx, 'hij weet best dat het gevaarlijk is', 960, 400, C.teal, q.on('best', 1), 'center', 32); brein(ctx, 960, 640, 0.7, q.on('opgroeien', 1)); },

  s05(ctx, t, q) { bg(ctx, 'schema'); const K = q.on('Inprenting', 1, 0.6), V = q.on('twee', 2, 0.6);
    if (K < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - K; persoon(ctx, 'baby', 360, 640, 300, { t, uit: 'slaapt' }); groeiBrein(ctx, 900, 480, 0.6, 0.25, q.on('pasgeboren', 1), 'pasgeboren · ± ¼'); groeiBrein(ctx, 1450, 480, 0.6, 0.75, q.on('tweede', 1), 'rond 2 jaar · ± ¾'); netwerkGroei(ctx, 160, 180, 1600, 160, q.on('razendsnel', 1), clamp((t - q.at('razendsnel', 1)) / 2, 0, 1), 0, t); ctx.restore(); }
    if (K > 0.01 && V < 0.99) { ctx.save(); ctx.globalAlpha *= K * (1 - V); chip(ctx, 'film: Inprenting en de sensitieve periode', 960, 220, C.teal, 1, 28); klanken(ctx, 600, 480, 1, 1); regel(ctx, '6 maanden: hoort het verschil', 600, 640, 1, C.groen, 30, 'center', 700); klanken(ctx, 1320, 480, q.on('slechter', 1), 0); regel(ctx, '1 jaar: nauwelijks nog', 1320, 640, q.on('slechter', 1), C.koraal, 30, 'center', 700); haak(ctx, 400, 1520, 740, 'afgestemd op wat ze steeds hoorden', C.groen, q.on('afgestemd', 1)); ctx.restore(); }
    if (V > 0.01) { ctx.save(); ctx.globalAlpha *= V; netwerkGroei(ctx, 260, 220, 640, 520, 1, 1, 0, t); regel(ctx, 'kind van 2', 580, 790, 1, C.text, 32, 'center', 700); netwerkGroei(ctx, 1020, 220, 640, 520, 1, 0.45, 0.6, t); regel(ctx, 'jij', 1340, 790, 1, C.text, 32, 'center', 700); vraagteken(ctx, 960, 480, q.on('zegt', 1), 100); ctx.restore(); } },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const sn = q.on('verdwijnen', 1, 2);
    netwerkGroei(ctx, 260, 220, 900, 560, 1, 1, sn, t); chip(ctx, 'vaak gebruikt: blijft', 1500, 300, C.teal, q.on('gebruikt', 1), 28); chip(ctx, 'weinig gebruikt: verdwijnt', 1500, 380, C.text2, q.on('Weinig', 1), 28); chip(ctx, 'film: Leren en onthouden', 1500, 460, C.teal, q.on('Leren', 1), 26); chip(ctx, 'efficiënter', 1500, 560, C.goud, q.on('efficiënter', 1), 30); chip(ctx, 'paden in een bos', 1500, 640, C.groen, q.on('bos', 1), 28); },

  s08(ctx, t, q) { bg(ctx, 'schema'); const M = q.on('myeline', 1, 1.5); myelineAxon(ctx, 260, 330, 1400, 1, M, t); naamBij(ctx, 'myeline', 'isolatielaag', 300, 420, q.on('myeline', 1)); chip(ctx, 'film: Het kabelnetwerk', 1400, 220, C.teal, q.on('kabelnetwerk', 1), 26);
    breinRijping(ctx, 960, 680, 0.55, q.on('tegelijk', 1), 0, t); vraagteken(ctx, 1500, 680, q.on('laatste', 1), 100); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord b'); const u = clamp((t - 0.5) / 5, 0, 1) * 0.8 + 0.2 * q.on('voorhoofdskwab', 1, 2);
    breinRijping(ctx, 860, 520, 1.15, 1, u, t); naamBij(ctx, 'voorhoofdskwab', 'vooruit denken · jezelf inhouden', 590, 650, q.on('voorhoofdskwab', 1), 'center'); chip(ctx, 'verandert door tot in je twintiger jaren', 1500, 820, C.goud, q.on('twintiger', 1), 28); },

  // ---------- H3 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); beloningRem(ctx, 860, 500, 1.15, 1, q.on('beloningssysteem', 1), q.on('rem', 1), t, q.on('spannends', 1));
    naamBij(ctx, 'beloningssysteem', 'reageert extra sterk', 900, 548, q.on('beloningssysteem', 1)); naamBij(ctx, 'rem voorin', 'nog in aanbouw', 600, 385, q.on('rem', 1), 'center');
    tag(ctx, 'MODEL · onderzoekers discussiëren nog', 1500, 220, C.goud, q.on('model', 1), 'center', 28); },

  s12(ctx, t, q) { bg(ctx, 'schema'); metaText(ctx, 'AMERIKAANSE ONDERZOEKERS · 2005', 120, 140, C.grain, 'left', 30); const ts = q.at('muur', 1), tb = q.at('bots', 1); const u = clamp((t - ts) / Math.max(1, tb - ts), 0, 1);
    rijspel(ctx, 400, 200, 1120, 460, q.on('rijspel', 1), u, t >= tb ? 'BOTS!' : ''); chip(ctx, 'langer doorrijden = meer punten', 960, 720, C.goud, q.on('punten', 1), 28); chip(ctx, 'te lang: alles kwijt', 960, 800, C.koraal, q.on('bots', 1), 28);
    stippen(ctx, 180, 400, 1, 1, C.teal, q.on('alleen', 1), 1, 20, 40); metaA(ctx, 'ALLEEN', 200, 470, q.on('alleen', 1), C.grain, 'center', 22); stippen(ctx, 1680, 380, 3, 3, C.koraal, q.on('leeftijdgenoten', 1), 3, 20, 46); metaA(ctx, 'MET 2 LEEFTIJDGENOTEN', 1730, 460, q.on('leeftijdgenoten', 1), C.grain, 'center', 22); vraagteken(ctx, 1780, 760, q.on('erbij', 2), 90); },

  s14(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord a'); risicoStaven(ctx, 360, 300, 1200, 460, 1, clamp(t / 4, 0, 1)); },

  s15(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('Bilal', 1, 0.8);
    if (B < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - B; metaText(ctx, 'LATER ONDERZOEK · HERSENSCANNER', 120, 140, C.grain, 'left', 30); beloningRem(ctx, 700, 500, 0.95, 1, 1, 1, t, q.on('actiever', 1)); naamBij(ctx, 'beloningsgebied', 'actiever met vrienden', 760, 680, q.on('beloningsgebied', 1)); stippen(ctx, 1350, 420, 3, 3, C.koraal, q.on('vrienden', 1), 3, 22, 50); ctx.restore(); }
    if (B > 0.01) { ctx.save(); ctx.globalAlpha *= B; kruisBeeld(ctx, t, 1, 0, 'rood'); chip(ctx, 'weet: gevaarlijk', 600, 150, C.teal, 1, 28); chip(ctx, 'met vrienden: beloning weegt zwaarder', 1150, 150, C.koraal, q.on('zwaarder', 1), 28); chip(ctx, 'ook nut: durven en zelfstandig worden', 960, 230, C.groen, q.on('nut', 1), 28); ctx.restore(); } },

  // ---------- H4 ----------
  s16(ctx, t, q) { bg(ctx, 'schema'); const R = q.on('rijexamen', 1, 0.8);
    vergKaart(ctx, 260, 260, 620, 220, 'alleen verbieden', ['werkt vaak slecht'], C.koraal, q.on('verbieden', 1) * (1 - R)); vergKaart(ctx, 1040, 260, 620, 220, 'begeleiden', ['ruimte die stap voor stap groeit'], C.groen, q.on('ruimte', 1) * (1 - R)); trap(ctx, 1060, 760, (1 - R) * q.on('stap', 1), 4, ['', '', '', '']);
    if (R > 0.01) { auto(ctx, 960, 620, 2.2, R); persoon(ctx, 'bilal', 1440, 880, 460, { t, a: R }); persoon(ctx, 'henk', 1680, 880, 470, { t, a: q.on('coach', 1, 0.3), kijk: -1 }); naamBij(ctx, 'coach', 'bv. opa Henk', 1680, 330, q.on('coach', 1)); chip(ctx, '17: rijexamen', 960, 260, C.teal, R, 30); chip(ctx, 'tot 18: alleen met een coach', 960, 340, C.goud, q.on('coach', 1), 30); vraagteken(ctx, 1780, 300, q.on('eigenlijk', 1), 90); } },

  s18(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'Antwoord c'); const P = q.on('pedagoog', 1, 0.8);
    beloningRem(ctx, 640, 500, 0.85, 1 - P, 1, 1, t, 0); tag(ctx, 'coach = rem van buiten', 1300, 420, C.teal, q.on('buiten', 1) * (1 - P), 'center', 32);
    if (P > 0.01) { ['ouders', 'scholen', 'jeugdhulp'].forEach((s2, i) => tag(ctx, s2, 560 + i * 400, 300, C.teal, P * q.on(s2, 1), 'center', 32)); vergKaart(ctx, 460, 420, 1000, 180, 'wat kun je verwachten?', ['en hoe help je verder?'], C.goud, q.on('verwachten', 1)); chip(ctx, 'regels', 700, 720, C.text2, q.on('regels', 1), 28); chip(ctx, 'schooltijden · film: Slaap', 1200, 720, C.teal, q.on('schooltijden', 1), 28); } },

  // ---------- Recap ----------
  s19(ctx, t, q) { bg(ctx, 'schema'); const H = q.on('aanbouw', 1, 0.8); ctx.save(); ctx.globalAlpha *= 1 - H; kruisBeeld(ctx, t, 1, 0, 'rood'); ctx.restore();
    if (H > 0.01) { breinRijping(ctx, 560, 480, 0.9, H, 0.7, t); beloningRem(ctx, 1360, 480, 0.9, H, 1, 1, t, 0.6); regel(ctx, 'rijpt van achter naar voor', 560, 720, H, C.text, 30, 'center', 700); regel(ctx, 'beloning vooruit, rem later', 1360, 720, H, C.text, 30, 'center', 700); haak(ctx, 300, 1640, 800, 'geen excuus, wel een verklaring', C.groen, q.on('excuus', 1)); } },
  s20(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'pedagogiek (hbo)', 640, 300, C.teal, q.on('hbo', 1), 'center', 34); tag(ctx, 'pedagogische wetenschappen (wo)', 1280, 300, C.teal, q.on('universiteit', 1), 'center', 34);
    ['jeugdhulp', 'school', 'onderzoek'].forEach((s2, i) => tag(ctx, s2, 560 + i * 400, 540, C.goud, q.on('jeugdhulp', 1), 'center', 32)); }
});
