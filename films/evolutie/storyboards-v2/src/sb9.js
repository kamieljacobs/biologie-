// Evolutie v2 — extra film 9 'De reis van Darwin' — storyboard: één keyframe per scène (23 okt 2026).
// Laad (volgorde): zie ref9/laadlijst.txt + sb9.
function x9tag(ctx, hfst) { metaText(ctx, `EVOLUTIE · EXTRA 1/4 · ${hfst}`, 80, 78, C.text2, 'left', 26); }
function x9schema(ctx, hfst) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); x9tag(ctx, hfst); }
function x9wereld(ctx, x, y, w, h, o = {}) { return x9kaart(ctx, x, y, w, h, -170, 190, -62, 72, o); }
function x9titelKaart(ctx, titel, vraag, beeld) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); metaText(ctx, 'HAVO · VWO · EVOLUTIE · EXTRA', W - 80, 78, C.text2, 'right', 26);
  text(ctx, titel, 120, 330, fTitel(92), C.text, 'left'); vraag.forEach((r, i) => text(ctx, r, 120, 420 + i * 60, fTekst(48, 500), C.text2, 'left')); if (beeld) beeld(ctx); }
function x9vraag(ctx, vraag, opties, beeld) { vraagKaart(ctx, vraag, opties, null); x9tag(ctx, 'VRAAG'); if (beeld) beeld(ctx); }
// tijdlijn 1831–1859 met mijlpalen (hergebruikt in opening, H4 en samenvatting)
function x9tijdlijn(ctx, y, o = {}) { const X = x9tijdas(ctx, 160, y, 1600, 1830, 1860); const { gat = false, mijl = [] } = o;
  if (gat) { ctx.save(); ctx.setLineDash([10, 8]); roundRect(ctx, X(1838), y - 120, X(1858) - X(1838), 100, 10); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); text(ctx, '?', (X(1838) + X(1858)) / 2, y - 48, fTitel(64), C.goud, 'center'); }
  mijl.forEach(([j, t, k, b]) => x9mijl(ctx, X, j, y, t, k || C.text, { boven: b !== false })); return X; }

const SB9 = {
  // ---------- Opening ----------
  e9s01(ctx) { x9zee(ctx, { hor: 640 }); x9tag(ctx, 'OPENING'); x9schip(ctx, 700, 700, 20);
    zoomCircle(ctx, 1460, 420, 290, 960, 640, 'Darwin aan de reling', 1, () => { ctx.fillStyle = '#243656'; ctx.fillRect(1160, 120, 600, 600); ctx.fillStyle = '#1F4466'; ctx.fillRect(1160, 500, 600, 300); x9mens(ctx, 'x9darwin', 1460, 860, 560, { uit: 'neutraal', kijk: -1 }); vul(ctx, [[1150, 600], [1780, 590], [1780, 760], [1150, 760]], '#5A4232'); lijn(ctx, [[1150, 600], [1780, 590]], '#7A5A44', 12); });
    naamBij(ctx, 'de Beagle', 'bark · ongeveer 27 m lang', 220, 200); naamBij(ctx, 'Charles Darwin', '22 jaar', 1460, 100, 1, 'center', C.goud); evoSchaal(ctx, 'Plymouth · december 1831'); },
  e9s02(ctx) { x9schema(ctx, 'OPENING'); text(ctx, 'Soorten veranderen nooit.', 160, 260, fTitel(64), C.text2, 'left'); doorstreep(ctx, 150, 240, 900, 240);
    x9tijdlijn(ctx, 640, { gat: true, mijl: [[1831, 'vertrek', C.text], [1836, 'terug', C.text], [1859, 'boek', C.goud]] }); x9origin(ctx, 1730, 560, 180); },
  e9s03(ctx) { x9titelKaart(ctx, 'De reis van Darwin', ['Wat zag Darwin onderweg, en', 'waarom duurde het twintig jaar', 'voor hij het opschreef?'], (c) => { c.save(); roundRect(c, 1060, 160, 760, 760, 20); c.clip(); c.translate(1060, 160); c.scale(0.4, 0.7); x9zee(c, { hor: 700 }); x9schip(c, 960, 760, 34); c.restore(); }); },
  // ---------- H1 Aan boord ----------
  e9s04(ctx) { x9schema(ctx, 'AAN BOORD VAN DE BEAGLE'); const P = x9kaart(ctx, 760, 130, 1080, 740, -95, -25, -58, 10);
    const kust = [[-35, -8], [-39, -15], [-41, -22], [-48, -26], [-53, -33], [-58, -38], [-62, -39], [-65, -42], [-66, -47], [-69, -51], [-68, -55], [-74, -50], [-74, -42], [-73, -37], [-72, -30], [-71, -20], [-77, -12], [-81, -5]]; kust.forEach(([lo, la]) => { const [px, py] = P(lo, la); circ(ctx, px, py, 7, C.goud, _lt(C.goud, 0.4), 1.5); });
    naamBij(ctx, 'kust in kaart brengen', 'metingen langs de kust', 1300, 210, 1, 'center', C.goud);
    x9mens(ctx, 'x9fitzroy', 220, 880, 480, { uit: 'praat', pose: 'wijs', kijk: 1 }); x9mens(ctx, 'x9darwin', 560, 880, 520, { uit: 'blij', kijk: -1 });
    naamBij(ctx, 'kapitein FitzRoy', '26 jaar', 200, 300, 1, 'center'); naamBij(ctx, 'Darwin', 'natuuronderzoeker', 580, 230, 1, 'center'); },
  e9s05(ctx) { x9schema(ctx, 'AAN BOORD VAN DE BEAGLE'); const P = x9kaart(ctx, 100, 140, 1720, 640, -100, 260, -62, 72); x9route(ctx, P, 1);
    x9plek(ctx, P, -4.1, 50.4, 'Plymouth', '27 dec 1831', { dy: -20 }); x9plek(ctx, P, -5.1, 50.1, '', null); x9plek(ctx, P, -90.5, -0.7, 'Galápagos', 'sep 1835', { align: 'right', dy: -16 });
    text(ctx, '1831 → 1836', 1820, 850, fTitel(64), C.goud, 'right'); metaText(ctx, 'ruim 3 jaar aan land · 1,5 jaar op zee', 100, 850, C.text2, 'left', 28); },
  e9q06(ctx) { x9vraag(ctx, 'Wat dacht Darwin over soorten toen hij vertrok?', ['Dat soorten langzaam veranderen, zoals zijn opa al schreef', 'Dat soorten niet veranderen, net als de meeste onderzoekers', 'Dat dieren veranderen door wat ze oefenen']); },
  e9s07(ctx) { x9schema(ctx, 'AAN BOORD VAN DE BEAGLE'); x9mens(ctx, 'x9darwin', 520, 880, 560, { uit: 'denkt' }); naamBij(ctx, 'soorten liggen vast', 'wat de meeste onderzoekers denken', 520, 230, 1, 'center');
    roundRect(ctx, 1040, 220, 300, 380, 14); shape(ctx, rgba(C.fill, 0.6), C.line, 1.5); x9mens(ctx, 'x9erasmus', 1190, 590, 340, { uit: 'neutraal' }); metaText(ctx, 'ERASMUS DARWIN · 1794', 1190, 650, C.grain, 'center', 26);
    naamBij(ctx, 'idee: soorten veranderen', 'zijn opa, zonder overtuigend bewijs', 1190, 730, 1, 'center'); },
  // ---------- H2 Reuzen en nandoes ----------
  e9s08(ctx) { macroNacht(ctx, { horizon: 560, heuvel: false }); x9tag(ctx, 'REUZEN EN NANDOES'); x9oever(ctx, 0, 600, W, 480);
    ctx.save(); ctx.setLineDash([10, 8]); x9dier(ctx, 'megatherium', 1240, 560, 0.62, { a: 0.35 }); ctx.restore(); metaText(ctx, 'RECONSTRUCTIE', 1240, 580, C.text2, 'center', 26); x9bot(ctx, 'schedel', 1160, 760, 1.8, { goud: true, rot: 0.1 }); x9bot(ctx, 'dijbeen', 1520, 820, 1.3, { rot: -0.2 });
    x9mens(ctx, 'x9darwin', 520, 860, 260, { pose: 'wijs', kijk: 1, uit: 'verbaasd' });
    naamBij(ctx, 'Megatherium', 'uitgestorven luiaard · tot ±4 ton', 1240, 330, 1, 'center', C.goud); naamBij(ctx, 'schedel', null, 1160, 700, 1, 'center', C.goud); evoSchaal(ctx, 'Punta Alta, Argentinië · 1832 · botten vergroot'); },
  e9s09(ctx) { macroNacht(ctx, { horizon: 560 }); x9tag(ctx, 'REUZEN EN NANDOES'); x9glyptodon(ctx, 1200, 860, 1.6); x9mens(ctx, 'x9darwin', 360, 860, 183 * 1.6 / 1.08, { uit: 'neutraal', kijk: 1 });
    x9bot(ctx, 'plaat', 560, 800, 1.6, { goud: true }); naamBij(ctx, 'Glyptodon', 'uitgestorven gordeldier · ±3 m', 1200, 470, 1, 'center', C.goud); naamBij(ctx, 'botplaatjes', 'pantser', 620, 740, 1, 'center'); evoSchaal(ctx, 'Darwin en Glyptodon op dezelfde schaal'); },
  e9s10(ctx) { macroNacht(ctx, { horizon: 520 }); x9tag(ctx, 'REUZEN EN NANDOES'); const s = 0.62, g = 860;
    x9megatherium(ctx, 420, g, s, { a: 0.5 }); x9glyptodon(ctx, 1180, g, s, { a: 0.5 });
    lijn(ctx, [[700, g - 120], [760, g - 128]], '#5A4A3A', 2); x9luiaard(ctx, 730, g - 120 + 75 * s * 0.92, s); x9gordeldier(ctx, 1420, g, s);
    zoomCircle(ctx, 760, 300, 170, 730, g - 110, 'luiaard · nu · 4–8 kg', 1, () => { lijn(ctx, [[600, 200], [920, 186]], '#5A4A3A', 12); x9luiaard(ctx, 760, 194 + 75 * 3.4 * 0.92, 3.4); });
    zoomCircle(ctx, 1600, 360, 170, 1420, g - 6, 'gordeldier · nu · ±30 cm', 1, () => { x9gordeldier(ctx, 1600, 420, 6); });
    naamBij(ctx, 'Megatherium', 'uitgestorven', 330, 560, 0.9, 'center'); naamBij(ctx, 'Glyptodon', 'uitgestorven', 1100, 640, 0.9, 'center'); evoSchaal(ctx, 'alle vier op dezelfde schaal · cirkels vergroot'); },
  e9q11(ctx) { x9vraag(ctx, ['Darwin vindt de reuzen precies waar nu hun kleine familie leeft.', 'Wat past daar het best bij?'], ['Toeval: fossielen kunnen overal liggen', 'De reuzen zijn gekrompen tot de kleine soorten', 'De reuzen en de kleine soorten zijn verwant'],
    (c) => { x9megatherium(c, 1640, 900, 0.36, { a: 0.7 }); x9glyptodon(c, 1640, 560, 0.4, { a: 0.7 }); }); },
  e9s12(ctx) { x9schema(ctx, 'REUZEN EN NANDOES'); const P = x9wereld(ctx, 100, 140, 1200, 560);
    [[20, 0], [80, 30], [-100, 40], [130, -25], [10, 48], [100, 60]].forEach(([lo, la]) => { const [px, py] = P(lo, la); circ(ctx, px, py, 10, rgba(C.line, 0.3), C.line, 1.5); });
    const [ax, ay] = P(-62, -39); circ(ctx, ax, ay, 14, C.goud, _lt(C.goud, 0.4), 2); naamBij(ctx, 'hier gevonden', 'Punta Alta', ax + 24, ay + 50, 1, 'left', C.goud); naamBij(ctx, 'zou kunnen', 'als de plek niets zegt', 640, 200, 0.7, 'center');
    x9megatherium(ctx, 1590, 470, 0.42); x9gordeldier(ctx, 1590, 720, 2.6); haak(ctx, 1400, 1780, 740, 'familie, op dezelfde plek', C.groen); },
  e9s13(ctx) { x9vlakte(ctx, { hor: 560 }); x9tag(ctx, 'REUZEN EN NANDOES'); x9nandoe(ctx, 1000, 860, 3.6);
    dim(ctx, () => { [[220, 600], [360, 606]].forEach(([gx, gy], i) => { paard(ctx, gx, gy, 0.5, { kijk: 1 }); x9mens(ctx, 'x9martens', gx - 4, gy - 72, 90, { zij: true, kijk: 1, a: 1 }); }); }, 0.8);
    naamBij(ctx, 'grote nandoe', 'ongeveer 1,5 m', 1300, 360, 1, 'left', C.goud); naamBij(ctx, "gaucho's", 'ruiters van de pampa', 290, 400, 1, 'center'); evoSchaal(ctx, 'Patagonië'); },
  e9s14(ctx) { x9vlakte(ctx, { hor: 520 }); x9tag(ctx, 'REUZEN EN NANDOES'); x9nandoeKlein(ctx, 640, 860, 4.2, { goud: true });
    roundRect(ctx, 1180, 740, 500, 120, 6); shape(ctx, '#6A4A34', '#8A6A4E', 2); lijn(ctx, [[1180, 780], [1680, 780]], '#5A3E2C', 3);
    ctx.save(); ctx.translate(1430, 742); ctx.scale(1.5, 1.5); vul(ctx, [[-200, 0], [-150, -24], [60, -30], [190, -8], [196, 0]], '#7C6A56'); ctx.fillStyle = '#E8E0D0'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.ellipse(-160 + i * 26, -12 - hash(i) * 8, 4, 6, 0.4, 0, 6.283); ctx.fill(); }
    lijn(ctx, [[-120, -6], [-40, -60], [-20, -64]], '#C2B8A8', 7); vul(ctx, [[-28, -72], [-6, -70], [8, -64], [-10, -60], [-28, -62]], '#C2B8A8'); dierOog(ctx, -14, -67, 2.2); lijn(ctx, [[40, -4], [70, -50], [60, -96]], '#B8AE98', 5); lijn(ctx, [[110, -4], [140, -50], [130, -96]], '#B8AE98', 5); ctx.restore();
    naamBij(ctx, 'kleine nandoe', 'witte veerpunten · ±1 m', 640, 330, 1, 'center', C.goud); naamBij(ctx, 'kop, nek, poten, huid', 'bewaard', 1430, 590, 1, 'center'); evoSchaal(ctx, 'Port Desire · begin 1834'); },
  e9s15(ctx) { x9schema(ctx, 'REUZEN EN NANDOES'); const bx = 140, by = 130, bw = 760, bh = 760, kaart = (land) => x9kaart(ctx, bx, by, bw, bh, -76, -52, -56, -22, { raster: false, land, rand: _lt(land, 0.3) });
    const P = kaart('#3E6E8A'); const [, yr] = P(0, -40.6); ctx.save(); ctx.beginPath(); ctx.rect(bx, yr, bw, by + bh - yr); ctx.clip(); kaart('#7A6A44'); ctx.restore();
    ctx.strokeStyle = C.teal; ctx.lineWidth = 5; ctx.beginPath(); [[-70.5, -39.0], [-68, -39.4], [-66, -39.9], [-64, -40.5], [-62.8, -41.0]].forEach(([lo, la], i) => { const [px, py] = P(lo, la); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke();
    naamBij(ctx, 'Río Negro', 'overgang', 960, 470, 1, 'left', C.teal); metaText(ctx, 'VEREENVOUDIGD', bx + bw - 20, by + bh - 20, C.text2, 'right', 26);
    x9nandoe(ctx, 1260, 560, 2.2); x9nandoeKlein(ctx, 1580, 880, 2.2); naamBij(ctx, 'grote nandoe', 'vooral noorden', 1260, 190, 1, 'center', C.teal); naamBij(ctx, 'kleine nandoe', 'vooral zuiden', 1580, 620, 1, 'center', C.oker); },
  // ---------- H3 De eilanden ----------
  e9s16(ctx) { x9schema(ctx, 'DE EILANDEN'); const P = x9kaart(ctx, 100, 130, 1720, 700, -100, 0, -30, 25);
    x9plek(ctx, P, -90.5, -0.7, 'Galápagos', 'september 1835', { dy: -60, align: 'center' }); x9plek(ctx, P, -23.6, 15.5, 'Kaapverdische eilanden', 'januari 1832', { kleur: C.text2, dy: -60, align: 'right', dx: -10 });
    const [a, b] = P(-89.5, -1.5), [c] = P(-80.5, -1.5); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a, b + 30); ctx.lineTo(c, b + 30); ctx.stroke(); metaText(ctx, '±1000 km', (a + c) / 2, b + 74, C.goud, 'center', 28); },
  e9s17(ctx) { x9lava(ctx, { hor: 520 }); x9tag(ctx, 'DE EILANDEN'); vul(ctx, [[300, 820], [420, 740], [620, 760], [700, 830]], '#4A4A4C'); vul(ctx, [[1150, 820], [1260, 730], [1460, 750], [1560, 830]], '#4A4A4C');
    x9spotlijster(ctx, 500, 760, 14); x9spotlijster(ctx, 1350, 752, 14, { kijk: -1, pal: ['#4E463F', '#7C7268', '#E6DED0'] });
    naamBij(ctx, 'spotlijster', 'Charles-eiland', 500, 470, 1, 'center', C.goud); naamBij(ctx, 'spotlijster', 'Chatham-eiland', 1350, 470, 1, 'center', C.goud); evoSchaal(ctx, 'vogels vergroot · ±25 cm'); },
  e9s18(ctx) { x9lava(ctx, { hor: 520 }); x9tag(ctx, 'DE EILANDEN'); x9schildpad(ctx, 'koepel', 560, 840, 3.6); x9schildpad(ctx, 'zadel', 1360, 840, 3.6);
    naamBij(ctx, 'koepelschild', 'vochtig eiland, laag voedsel', 560, 440, 1, 'center'); naamBij(ctx, 'zadelschild', 'droog eiland, nek omhoog', 1360, 300, 1, 'center', C.goud); evoSchaal(ctx, 'reuzenschildpadden · ±1,4–1,5 m'); },
  e9q19(ctx) { x9vraag(ctx, ['De Galápagos en de Kaapverdische eilanden zijn allebei vulkanisch,', 'droog en ongeveer even hoog. Op welke dieren lijken de Galápagos-dieren het meest?'], ['Op de dieren van Zuid-Amerika', 'Op geen enkele soort ergens anders', 'Op de dieren van de Kaapverdische eilanden']); },
  e9s20(ctx) { x9schema(ctx, 'DE EILANDEN'); const P = x9kaart(ctx, 100, 130, 1720, 720, -100, 30, -40, 30);
    const [g1, g2] = P(-90.5, -0.7), [z1, z2] = P(-60, -12), [k1, k2] = P(-23.6, 15.5), [f1, f2] = P(5, 12);
    pijl(ctx, z1, z2, g1 + 30, g2 + 6, C.teal, 1, 6, 24); pijl(ctx, f1, f2, k1 + 26, k2, C.oker, 1, 6, 24); circ(ctx, g1, g2, 12, C.teal); circ(ctx, k1, k2, 12, C.oker);
    naamBij(ctx, 'Galápagos', 'lijkt op Zuid-Amerika', g1 + 10, g2 - 70, 1, 'left', C.teal); naamBij(ctx, 'Kaapverdië', 'lijkt op Afrika', k1, k2 - 40, 1, 'center', C.oker); },
  e9s22(ctx) { x9schema(ctx, 'DE EILANDEN'); roundRect(ctx, 260, 380, 1400, 420, 18); shape(ctx, '#5A4030', '#7A5A44', 3);
    [[480, 640, 'groot', 15.5], [800, 650, 'middel', 12.5], [1120, 640, 'zanger', 10], [1440, 650, 'middel', 12.5]].forEach(([x, y, sr, cm], i) => { x9vink(ctx, sr, x, y, cm, { s: 1.3, kijk: i % 2 ? -1 : 1 }); roundRect(ctx, x - 60, y + 40, 120, 54, 8); shape(ctx, '#E6DCC4', '#C9BC9C', 1.5); text(ctx, '?', x, y + 82, fTekst(40, 800), '#7A6A5A', 'center'); });
    naamBij(ctx, 'vinken, slordig verzameld', 'eiland meestal niet genoteerd', 960, 300, 1, 'center'); },
  e9q21(ctx) { x9vraag(ctx, 'Wanneer begreep Darwin dat de vinken van de Galápagos bijzonder waren?', ['Meteen op de eilanden, toen hij hun snavels vergeleek', 'Pas in Londen, toen een vogelkenner ze onderzocht', 'Nooit: dat ontdekten pas onderzoekers na zijn dood']); },
  e9s23(ctx) { x9schema(ctx, 'DE EILANDEN'); x9mens(ctx, 'x9gould', 300, 880, 540, { uit: 'praat', pose: 'wijs' }); naamBij(ctx, 'John Gould', 'vogelkenner · Londen, januari 1837', 320, 250, 1, 'center');
    [[800, 'groot', 15.5, 'grote grondvink'], [1120, 'middel', 12.5, 'middelste grondvink'], [1440, 'zanger', 10, 'zangervink']].forEach(([x, sr, cm, n]) => { x9vink(ctx, sr, x, 540, cm, { s: 1.4, houding: 'staan' }); metaText(ctx, n, x, 590, C.grain, 'center', 24); }); naamBij(ctx, 'allemaal vinken', 'nauw verwante nieuwe soorten', 1120, 250, 1, 'center', C.goud);
    [[800, 'Charles'], [1100, 'Albemarle'], [1400, 'Chatham en James']].forEach(([x, n]) => { x9spotlijster(ctx, x, 830, 6); metaText(ctx, n, x, 870, C.grain, 'center', 24); }); naamBij(ctx, 'spotlijsters: drie soorten', null, 1100, 700, 1, 'center'); },
  // ---------- H4 I think ----------
  e9s24(ctx) { x9schema(ctx, 'I THINK'); x9boek(ctx, 560, 140, 800, 740); x9ithink(ctx, 960, 780, 1.9); metaText(ctx, 'NOTITIEBOEK B · JULI 1837 · VEREENVOUDIGD', 960, 930, C.text2, 'center', 26); },
  e9s25(ctx) { x9schema(ctx, 'I THINK'); x9boek(ctx, 120, 160, 700, 680, { a: 0.45 }); x9ithink(ctx, 470, 760, 1.6, { a: 0.6 });
    const knoop = (x, y) => circ(ctx, x, y, 10, C.groen); ctx.strokeStyle = C.groen; ctx.lineWidth = 4;
    const twee = (x, y, A, B, ta, tb) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 140, y - 130); ctx.moveTo(x, y); ctx.lineTo(x + 140, y - 130); ctx.moveTo(x, y); ctx.lineTo(x, y + 50); ctx.stroke(); knoop(x, y); A(x - 140, y - 150); B(x + 140, y - 150); };
    twee(1340, 500, (x, y) => x9nandoe(ctx, x, y, 1.25), (x, y) => x9nandoeKlein(ctx, x, y, 1.25));
    twee(1340, 880, (x, y) => x9glyptodon(ctx, x - 20, y, 0.4), (x, y) => x9gordeldier(ctx, x + 10, y, 2.0));
    naamBij(ctx, 'gemeenschappelijke voorouder', 'van verwante soorten', 1370, 550, 1, 'left', C.groen); naamBij(ctx, 'soorten splitsen', null, 1300, 150, 1, 'center'); },
  e9s26(ctx) { x9schema(ctx, 'I THINK'); grafiekAs(ctx, 220, 800, 900, 560, { xLabel: 'tijd', yt: [] });
    ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, yy = 800 - 60 * Math.pow(2, u * 3.1); i ? ctx.lineTo(220 + u * 900, yy) : ctx.moveTo(220, yy); } ctx.stroke();
    ctx.strokeStyle = C.oker; ctx.beginPath(); ctx.moveTo(220, 740); ctx.lineTo(1120, 520); ctx.stroke(); naamBij(ctx, 'bevolking', null, 1000, 240, 1, 'left', C.koraal); naamBij(ctx, 'voedsel', null, 1140, 520, 1, 'left', C.oker);
    naamBij(ctx, 'Thomas Malthus', 'gelezen in 1838', 220, 190, 1, 'left'); roundRect(ctx, 1300, 420, 500, 140, 16); shape(ctx, rgba(C.groen, 0.15), C.groen, 2); text(ctx, 'natuurlijke selectie', 1550, 505, fTekst(48, 700), C.groen, 'center'); },
  e9s27(ctx) { x9schema(ctx, 'I THINK'); const X = x9tijdlijn(ctx, 780, { gat: true, mijl: [[1837, 'I think', C.text, false], [1844, '±230 blz.', C.goud, false]] });
    x9brief(ctx, 1000, 360, 260, { rot: -0.06 }); metaText(ctx, 'AAN EMMA: UITGEVEN ALS IK STERF', 1000, 500, C.grain, 'center', 26); text(ctx, '“alsof ik een moord beken”', 1560, 300, fTekst(44, 600), C.text, 'center'); metaText(ctx, 'BRIEF AAN HOOKER · 1844', 1560, 350, C.grain, 'center', 26); },
  e9q28(ctx) { x9vraag(ctx, 'Waarom wachtte Darwin zo lang met publiceren?', ['Hij had ander werk en wilde eerst veel bewijs', 'Hij durfde het niet, uit angst voor de kerk', 'Hij vond geen uitgever die het wilde drukken']); },
  e9s29(ctx) { x9schema(ctx, 'I THINK'); const X = x9tijdas(ctx, 160, 760, 1600, 1830, 1860);
    const balk = (j0, j1, t, k, rij) => { const y = 640 - rij * 110; roundRect(ctx, X(j0), y, X(j1) - X(j0), 64, 10); shape(ctx, rgba(k, 0.3), k, 2); text(ctx, t, (X(j0) + X(j1)) / 2, y + 45, fTekst(36, 600), C.text, 'center'); };
    balk(1838, 1846, 'boeken over de reis', C.teal, 0); balk(1846, 1854, 'zeepokken', C.oker, 1); balk(1854, 1858.5, 'groot boek', C.groen, 0); x9zeepok(ctx, X(1850), 410, 1.4);
    naamBij(ctx, 'vaak ziek', 'de hele periode', X(1847), 250, 1, 'center'); x9mens(ctx, 'x9darwinOud', 1740, 420, 260, { uit: 'moe' }); metaText(ctx, 'historici zijn het oneens over "durfde niet"', 160, 880, C.text2, 'left', 26); },
  // ---------- H5 Wallace ----------
  e9s30(ctx) { x9zee(ctx, { hor: 600 }); x9tag(ctx, 'WALLACE'); x9schip(ctx, 960, 680, 18, { masten: 2, brand: 1 }); naamBij(ctx, 'de Helen', 'augustus 1852 · verzameling verloren', 960, 160, 1, 'center', C.koraal);
    x9mens(ctx, 'x9wallace', 1560, 760, 200, { uit: 'verbaasd', kijk: -1 }); x9sloep(ctx, 1560, 770, 300); naamBij(ctx, 'Alfred Russel Wallace', 'in de sloep', 1560, 470, 1, 'center'); },
  e9s31(ctx) { x9schema(ctx, 'WALLACE'); const P = x9kaart(ctx, 100, 130, 1300, 740, 95, 150, -15, 12);
    x9plek(ctx, P, 127.35, 0.8, 'Ternate', 'stuurt het op', { dx: -24, align: 'right', dy: 10 }); const [hx, hy] = P(128.4, 0.5); naamBij(ctx, 'Halmahera', 'februari 1858, koorts', hx + 40, hy + 70, 1, 'left', C.goud);
    const [tx, ty] = P(127.4, 0.8); ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.quadraticCurveTo(1100, 100, 1500, 210); ctx.stroke(); ctx.restore(); x9brief(ctx, 1580, 220, 150, { rot: 0.1 });
    metaText(ctx, 'NAAR DARWIN · VOOR LYELL', 1580, 330, C.grain, 'center', 26); x9mens(ctx, 'x9wallace', 1650, 880, 420, { uit: 'denkt' }); },
  e9q32(ctx) { x9vraag(ctx, 'Darwin leest in de brief van Wallace zijn eigen idee. Wat gebeurde er daarna?', ['Darwin hield de brief geheim en bracht het idee als het zijne', 'Darwin trok zich terug en liet de eer aan Wallace', 'Darwins vrienden lieten beide teksten samen voorlezen']); },
  e9s33(ctx) { x9schema(ctx, 'WALLACE'); x9mens(ctx, 'x9darwinOud', 340, 880, 560, { uit: 'bezorgd', pose: 'vasthouden' }); x9brief(ctx, 470, 560, 150, { rot: -0.2 });
    naamBij(ctx, 'Darwin, juni 1858', '“al mijn originaliteit wordt verpletterd”', 120, 230, 1, 'left');
    [['Darwin 1844', C.text], ['Darwin 1857', C.text], ['Wallace 1858', C.goud]].forEach(([t, k], i) => { const x = 980 + i * 280; x9brief(ctx, x, 520, 220, { zegel: false, rot: (i - 1) * 0.05 }); text(ctx, t, x, 680, fTekst(36, 600), k, 'center'); });
    haak(ctx, 860, 1660, 720, 'samen voorlezen · geregeld door Lyell en Hooker', C.groen); },
  e9s34(ctx) { ctx.fillStyle = '#2A2630'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#3A3440'; ctx.fillRect(0, 760, W, 320); x9tag(ctx, 'WALLACE');
    for (let i = 0; i < 5; i++) dim(ctx, () => x9stoel(ctx, 260 + i * 150, 900, 1), 0.5); x9stoel(ctx, 1080, 900, 1, 'Darwin'); x9stoel(ctx, 1300, 900, 1, 'Wallace');
    x9mens(ctx, 'x9secretaris', 1640, 880, 460, { uit: 'praat', kijk: -1 }); x9lessenaar(ctx, 1560, 900, 1.3); x9brief(ctx, 1560, 700, 110, { zegel: false, rot: -0.1 });
    naamBij(ctx, 'Linnean Society, Londen', '1 juli 1858', 160, 200, 1, 'left'); naamBij(ctx, 'twee lege stoelen', 'Wallace op reis · Darwin op een begrafenis', 1190, 620, 1, 'center', C.goud); naamBij(ctx, 'de secretaris leest voor', null, 1640, 340, 1, 'center'); },
  e9s35(ctx) { x9schema(ctx, 'WALLACE'); for (let i = 5; i >= 1; i--) dim(ctx, () => x9origin(ctx, 1160 + i * 60, 800 - i * 14, 440), 0.5); x9origin(ctx, 1120, 820, 500);
    naamBij(ctx, 'On the Origin of Species', '24 november 1859', 160, 380, 1, 'left', C.goud); naamBij(ctx, 'eerste druk: 1250 exemplaren', 'al vóór verschijnen besteld', 160, 520, 1, 'left'); },
  // ---------- Samenvatting ----------
  e9s36(ctx) { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); x9tag(ctx, 'SAMENVATTING');
    ['Onderweg: reuzen naast hun kleine familie, nandoes die elkaar', 'aflossen, eilanddieren die lijken op het vasteland ernaast.', 'Twintig jaar: reisboeken, zeepokken, ziekte en bewijs verzamelen.', 'In 1858 samen met Wallace bekend, in 1859 het boek.'].forEach((z, i) => text(ctx, z, 160, 280 + i * 100, fTekst(46, 600), C.text, 'left'));
    ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(130, 230); ctx.lineTo(116, 230); ctx.lineTo(116, 600); ctx.lineTo(130, 600); ctx.stroke();
    metaText(ctx, 'HOE HET WERKT', 160, 760, C.grain, 'left', 28); text(ctx, 'Natuurlijke selectie', 160, 840, fTitel(64), C.goud, 'left'); }
};
