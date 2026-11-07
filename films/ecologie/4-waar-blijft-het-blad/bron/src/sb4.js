const _V4 = {"e4q06": {"v": ["Welke van deze stoffen is anorganisch?"], "o": ["Cellulose", "Eiwit", "Nitraat"]}, "e4q09": {"v": ["Op een dood blad groeit een witte schimmel. Is die", "schimmel een producent?"], "o": ["Nee, hij haalt organische stof uit het blad", "Ja, hij groeit vanzelf op het blad", "Ja, schimmels zijn planten"]}, "e4q17": {"v": ["Een derde van het blad is weg. Waar is dat deel gebleven?"], "o": ["Het is opgegeten en daarmee verdwenen", "Als koolstofdioxide in de lucht, en als water en mineralen in de bodem", "Het is omgezet in energie"]}, "e4q20": {"v": ["Een leerling zegt: 'De energie uit het blad komt met de", "mineralen terug in de eik.' Wat vind jij?"], "o": ["Klopt: mineralen nemen de energie mee", "Niet helemaal: de energie blijft als humus in de bodem", "Klopt niet: de energie komt vrij als warmte"]}, "e4q27": {"v": ["Een composthoop die veel te nat is, gaat stinken. Wat is", "daar de oorzaak van?"], "o": ["Er komt te weinig zuurstof in", "De hoop is te koud geworden", "Er zitten te veel bacteriën in"]}, "e4q33": {"v": ["Waarom bleef het lichaam in het veen zo lang bewaard?"], "o": ["Het lag er diep en ijskoud", "Het werd gebalsemd voor het begraven", "Het lag nat, zuur en zonder zuurstof"]}};
// Ecologie v2 · film 4 Waar blijft het blad? — keyframes storyboard (één per scène). Laadt na teken_eco4.js. Vraagteksten in _V4 komen uit films/f4.json.
const _N4 = 4;
const _sch4 = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
const _vk4 = (ctx, id) => ecoVraagKaart(ctx, _V4[id].v, _V4[id].o, _N4);
const _vrij = (c, x, y) => { e4CO2(c, x + 18, y - 12, 10); e4H2O(c, x + 66, y - 12, 9); e4Ammonium(c, x + 104, y - 12, 11); e4Fosfaat(c, x + 140, y - 12, 10); };
const _log4 = (ctx, n, o = {}) => e4Logboek(ctx, o.x || 980, o.y || 130, o.w || 860, [['11 nov', '1,0 g', 'valt van de eik', null], ['dec', '…', 'pissebed, worm', null], ['feb', '…', 'schimmels, bacteriën', _vrij], ['mei', '0,7 g', 'gewogen', _vrij]].slice(0, n));
const SB4 = {
  // ---------------- Opening
  e4s01(ctx) { e4Bos(ctx); ecoTag(ctx, _N4, 'OPENING');
    persoon(ctx, 'bas', 700, 900, 460, { pose: 'vasthouden', kijk: 1 }); e4Zakje(ctx, 900, 880, 40, 26, 8, (c) => ecoEikenblad(c, 900, 880, 2.2, { hoek: 0.1 }));
    zoomCircle(ctx, 1380, 470, 260, 900, 880, 'gaaszakje ± 15 cm · vergroot', 1, () => { ctx.fillStyle = '#4A3A2C'; ctx.fillRect(1120, 210, 520, 520); e4Zakje(ctx, 1380, 470, 380, 250, 40, (c) => ecoEikenblad(c, 1380, 470, 15, { hoek: 0.1 })); });
    naamBij(ctx, 'ecoloog', null, 700, 360, 1, 'center'); ecoSchaal(ctx, 'ecoloog ± 1,80 m · zakje ± 15 cm'); },
  e4s02(ctx) { e4Bos(ctx); ecoTag(ctx, _N4, 'OPENING');
    for (let i = 0; i < 24; i++) ecoEikenblad(ctx, 100 + hash(i) * 1720, 140 + hash(i + 20) * 520, 2.6, { hoek: hash(i + 5) * 6 });
    roundRect(ctx, 640, 120, 640, 90, 16); shape(ctx, rgba(C.bgMicro, 0.85), C.line, 1.5); text(ctx, 'november  →  april', 960, 180, fTekst(44, 700), C.text, 'center'); },
  e4s03(ctx) { ecoTitelKaart(ctx, _N4, 'Waar blijft het blad?', ['Waar blijven alle herfstbladeren?'], (c) => {
    e4Zakje(c, 1420, 620, 420, 260, 44, (cc) => ecoEikenblad(cc, 1420, 620, 18, { hoek: -0.2 })); e4Logboek(c, 1120, 120, 640, [], { kw: [0, 0.2, 0.38, 0.62] }); }); },
  // ---------------- H1
  e4s04(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H1 EEN BLAD IS VOEDSEL'); _log4(ctx, 1);
    ecoEikenblad(ctx, 480, 520, 30, { hoek: -0.3 });
    e4Keten(ctx, 120, 820, 6, 16); naamBij(ctx, 'cellulose', null, 120, 880, 1, 'left', C.groen);
    e4Keten(ctx, 420, 820, 5, 14, C.oker, 0.2); naamBij(ctx, 'lignine', null, 420, 880, 1, 'left', C.oker);
    e4Kraal(ctx, 680, 820, 3, 11); naamBij(ctx, 'eiwit', 'weinig', 680, 876, 1, 'left', C.groen);
    naamBij(ctx, 'organische stoffen', 'groot · energierijk · met koolstof', 1060, 640, 1, 'left', C.groen); },
  e4s05(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H1 EEN BLAD IS VOEDSEL');
    roundRect(ctx, 160, 220, 720, 560, 22); shape(ctx, rgba(C.fill, 0.5), C.groen, 2); naamBij(ctx, 'organisch', 'groot · energierijk', 520, 300, 1, 'center', C.groen);
    e4Keten(ctx, 260, 460, 7, 18); e4Kraal(ctx, 280, 620, 9, 13);
    roundRect(ctx, 1040, 220, 720, 560, 22); shape(ctx, rgba(C.fill, 0.5), ECOK.anorganisch, 2); naamBij(ctx, 'anorganisch', 'klein · bijna geen energie', 1400, 300, 1, 'center', ECOK.anorganisch);
    e4CO2(ctx, 1180, 460, 20); e4H2O(ctx, 1380, 460, 18); e4Nitraat(ctx, 1560, 460, 22); e4Fosfaat(ctx, 1260, 620, 20);
    [['CO₂', 1180], ['water', 1380], ['nitraat', 1560]].forEach(([n, x]) => naamBij(ctx, n, null, x, 530, 1, 'center')); naamBij(ctx, 'fosfaat', null, 1310, 690, 1, 'left'); },
  e4q06(ctx) { _vk4(ctx, 'e4q06'); },
  e4s07(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H1 EEN BLAD IS VOEDSEL');
    e4BoomZonder(ctx, 700, 860, 4.6, {}); circ(ctx, 1500, 200, 56, C.goud); metaText(ctx, 'LICHT', 1500, 300, C.goud, 'center', 26);
    pijl(ctx, 1440, 230, 980, 360, C.goud, 1, 3, 16); e4CO2(ctx, 1180, 470, 18); pijl(ctx, 1120, 470, 950, 440, ECOK.anorganisch, 1, 3, 14);
    e4H2O(ctx, 900, 840, 14); e4Nitraat(ctx, 560, 840, 18); pijl(ctx, 700, 840, 700, 640, ECOK.stikstof, 1, 3, 14);
    naamBij(ctx, 'autotroof', 'maakt zelf organische stof', 1300, 640, 1, 'left', C.groen); naamBij(ctx, 'producent', null, 1300, 740, 1, 'left', C.groen); },
  e4s08(ctx) { e4Bos(ctx); ecoTag(ctx, _N4, 'H1 EEN BLAD IS VOEDSEL');
    ecoRee(ctx, 440, 830, 3.2, { houding: 'grazen' }); ctx.fillStyle = '#5A4434'; ctx.fillRect(1010, 760, 90, 70); // stronk
    for (const [x, y, r] of [[1030, 760, 26], [1070, 752, 32]]) { ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.45, 0, Math.PI, 0); shape(ctx, '#C9A880', '#E2CCA8', 1.5); ctx.fillRect(x - 5, y, 10, 14); }
    ecoEikenblad(ctx, 1500, 850, 7, { hoek: 0.2 }); ecoPissebed(ctx, 1500, 838, 18, {});
    naamBij(ctx, 'ree', null, 440, 580, 1, 'center'); naamBij(ctx, 'paddenstoel', null, 1060, 680, 1, 'center'); naamBij(ctx, 'pissebed', 'vergroot', 1500, 770, 1, 'center');
    text(ctx, 'heterotroof', 960, 220, fTekst(56, 700), C.oker, 'center'); metaText(ctx, 'NEEMT ORGANISCHE STOF OP', 960, 270, C.text2, 'center', 26); },
  e4q09(ctx) { _vk4(ctx, 'e4q09'); },
  e4s10(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H1 EEN BLAD IS VOEDSEL');
    ecoEikenblad(ctx, 420, 540, 26, { stadium: 0.15, hoek: -0.2 }); zoomCircle(ctx, 1240, 500, 330, 520, 520, 'schimmeldraden in het blad · vergroot', 1, () => {
      ctx.fillStyle = '#3E4A2E'; ctx.fillRect(900, 160, 680, 680); for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { roundRect(ctx, 920 + i * 110, 180 + j * 110, 100, 100, 26); shape(ctx, '#5E7A44', '#7A9A5A', 2); }
      e4Schimmel(ctx, 940, 760, 260, -0.6, 2); e4Schimmel(ctx, 1500, 260, 240, 2.4, 5); e4Keten(ctx, 1180, 470, 3, 10, C.groen, 0.4); pijl(ctx, 1240, 500, 1300, 560, C.groen, 1, 3, 12); });
    naamBij(ctx, 'heterotroof', 'geen bladgroen', 420, 760, 1, 'center', C.oker); },
  // ---------------- H2
  e4s11(ctx) { e4Bos(ctx, { blad: false }); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS'); metaText(ctx, 'DECEMBER', 1800, 78, C.goud, 'right', 28);
    e4Zakje(ctx, 960, 760, 1300, 420, 70, (c) => { ctx.fillStyle = '#4A3A2C'; ctx.fillRect(300, 540, 1320, 440); ecoEikenblad(c, 900, 700, 40, { stadium: 0.3, hoek: -0.1 }); ecoPissebed(c, 760, 690, 40, {}); ecoRegenworm(c, 1000, 880, 40, { houding: 'zij' }); });
    naamBij(ctx, 'pissebed', '± 1,5 cm', 760, 600, 1, 'center'); naamBij(ctx, 'regenworm', '± 20 cm', 1420, 830, 1, 'center'); ecoSchaal(ctx, 'vergroot ± 4×'); },
  e4s12(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    ecoPissebed(ctx, 520, 600, 90, {}); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(240 + i * 26, 610 + (i % 2) * 8, 10, 6, 0.3, 0, 6.283); shape(ctx, '#4A3A2C', '#6E5A44', 1.5); }
    zoomCircle(ctx, 1260, 480, 300, 300, 600, 'uitwerpsel · vergroot', 1, () => { ctx.fillStyle = '#3A2E24'; ctx.fillRect(960, 180, 600, 600); for (let i = 0; i < 40; i++) { ctx.save(); ctx.translate(1000 + hash(i) * 520, 220 + hash(i + 9) * 520); ctx.rotate(hash(i + 3) * 6); ctx.fillStyle = ['#7A6A3E', '#8A7A4A', '#6A5A34'][i % 3]; ctx.fillRect(-14, -7, 28, 14); ctx.restore(); } });
    naamBij(ctx, 'detrituseter', 'maakt het blad kleiner', 520, 470, 1, 'center', C.oker); },
  e4s13(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    const K = [[400, 760, 'dood blad', (c, x, y, r) => ecoEikenblad(c, x, y, r / 7, { stadium: 0.3 })], [400, 470, 'pissebed', (c, x, y, r) => ecoPissebed(c, x, y + r * 0.2, r / 1.1, {})], [400, 200, 'spitsmuis', (c, x, y, r) => ecoSpitsmuis(c, x - r * 0.1, y + r * 0.4, r / 6, {})],
      [1100, 760, 'dood blad', (c, x, y, r) => ecoEikenblad(c, x, y, r / 7, { stadium: 0.3, hoek: 0.5 })], [1100, 470, 'regenworm', (c, x, y, r) => ecoRegenworm(c, x - r * 0.85, y + r * 0.15, r / 12, { houding: 'boven', buig: 0.6 })], [1100, 200, 'merel', (c, x, y, r) => merel(c, x - r * 0.2, y + r * 0.55, r / 130, {})]];
    for (const [a, b] of [[0, 1], [1, 2], [3, 4], [4, 5]]) { const [x1, y1] = K[a], [x2, y2] = K[b]; pijl(ctx, x1, y1 - 86, x2, y2 + 86, C.oker, 1, 4, 18); }
    K.forEach(([x, y, n, f]) => { circ(ctx, x, y, 80, rgba(C.fill, 0.9), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(x, y, 78, 0, 6.283); ctx.clip(); f(ctx, x, y, 80); ctx.restore(); naamBij(ctx, n, null, x + 110, y + 12, 1, 'left'); });
    naamBij(ctx, 'pijl: van voedsel naar eter', null, 1500, 860, 1, 'center', C.oker); },
  e4s14(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS'); metaText(ctx, 'FEBRUARI', 1800, 78, C.goud, 'right', 28); _log4(ctx, 3, { x: 1000, y: 540, w: 860 });
    zoomCircle(ctx, 520, 450, 340, 520, 450, 'bodem onder het blad · vergroot', 1, () => e4BodemMicro(ctx, 520, 450, 340));
    e4CO2(ctx, 1120, 230, 18); e4H2O(ctx, 1320, 230, 16); e4Ammonium(ctx, 1520, 230, 18); e4Fosfaat(ctx, 1720, 230, 18); [['CO₂', 1120], ['water', 1320], ['ammonium', 1520], ['fosfaat', 1720]].forEach(([n, x]) => metaText(ctx, n, x, 290, C.text2, 'center', 26));
    naamBij(ctx, 'mineralisatie', 'reducenten: schimmels en bacteriën', 1430, 400, 1, 'center', C.text); },
  e4s15(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    zoomCircle(ctx, 960, 480, 380, 960, 480, 'enzymen buiten de cel · vergroot', 1, () => { ctx.fillStyle = C.bgMicro; ctx.fillRect(580, 100, 760, 760);
      e4Schimmel(ctx, 620, 760, 300, -0.4, 4); e4Keten(ctx, 760, 420, 9, 22, C.groen, 0.05);
      for (const [x, y] of [[880, 380], [1060, 400]]) enzymKluwen(ctx, x, y, 42, { bind: 1, knip: 0.6 });
      e4Keten(ctx, 1160, 560, 1, 18); e4Keten(ctx, 1220, 610, 1, 18); e4Keten(ctx, 1110, 640, 1, 18); });
    naamBij(ctx, 'enzym', null, 960, 300, 1, 'center', C.goud); naamBij(ctx, 'schimmeldraad', null, 760, 780, 1, 'center'); },
  e4s16(ctx) { e4Bos(ctx, { blad: false }); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS'); metaText(ctx, 'MEI', 1800, 78, C.goud, 'right', 28);
    persoon(ctx, 'bas', 600, 900, 460, { pose: 'vasthouden' }); e4Weegschaal(ctx, 1000, 760, 320, '0,7 g'); ecoEikenblad(ctx, 1000, 640, 14, { stadium: 0.5, hoek: 0.1 });
    _log4(ctx, 4, { x: 1000, y: 120, w: 860 }); },
  e4q17(ctx) { _vk4(ctx, 'e4q17'); },
  e4s18(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    e4BoomZonder(ctx, 760, 700, 3.8, {}); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 700, W, 200);
    lijn(ctx, [[760, 700], [770, 780], [740, 860]], '#8A6A4C', 8); lijn(ctx, [[766, 760], [880, 820], [960, 880]], '#8A6A4C', 6);
    ctx.setLineDash([10, 10]); lijn(ctx, [[1040, 860], [960, 880], [770, 780], [760, 600], [770, 400], [860, 240]], C.goud, 2); ctx.setLineDash([]);
    e4Nitraat(ctx, 1080, 860, 18, true); e4Nitraat(ctx, 768, 520, 14, true); e4Nitraat(ctx, 860, 240, 14, true);
    e4CO2(ctx, 1400, 300, 18); pijl(ctx, 1260, 760, 1380, 340, ECOK.anorganisch, 0.7, 3, 14); naamBij(ctx, 'koolstofdioxide', 'in de lucht', 1420, 380, 1, 'left');
    naamBij(ctx, 'nitraat', 'de wortel in, de stam op', 1120, 830, 1, 'left', ECOK.stikstof); ecoEikenblad(ctx, 1240, 790, 6, { stadium: 0.55 }); },
  e4s19(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    e4BoomZonder(ctx, 560, 860, 3.6, {}); ctx.fillStyle = '#3A2E24'; ctx.fillRect(0, 860, W, 40);
    [[1100, 840, (c, x, y) => ecoPissebed(c, x, y, 40, {})], [1320, 850, (c, x, y) => ecoRegenworm(c, x - 120, y, 14, {})], [1580, 850, (c, x, y) => { for (let i = 0; i < 4; i++) e4Bacterie(c, x + i * 30, y - 10 - (i % 2) * 14, 30, i); }]].forEach(([x, y, f]) => { f(ctx, x, y); e4Warmte(ctx, x, y - 70, 1.4); });
    e4Warmte(ctx, 560, 300, 1.6); naamBij(ctx, 'ook de eik dissimileert', 'dag en nacht', 560, 200, 1, 'center');
    naamBij(ctx, 'warmte', 'verlaat het bos', 1340, 560, 1, 'center', C.koraal); },
  e4q20(ctx) { _vk4(ctx, 'e4q20'); },
  e4s21(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS');
    const P = [[960, 230, 'eik'], [1360, 620, 'blad'], [560, 620, 'bodem']];
    for (let i = 0; i < 3; i++) { const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % 3]; const an = Math.atan2(y2 - y1, x2 - x1); pijl(ctx, x1 + Math.cos(an) * 120, y1 + Math.sin(an) * 120, x2 - Math.cos(an) * 120, y2 - Math.sin(an) * 120, C.groen, 1, 5, 20); }
    circ(ctx, 960, 230, 100, rgba(C.fill, 0.9), C.line, 1.5); ctx.save(); ctx.beginPath(); ctx.arc(960, 230, 98, 0, 6.283); ctx.clip(); e4BoomZonder(ctx, 960, 320, 1.1, {}); ctx.restore();
    circ(ctx, 1360, 620, 100, rgba(C.fill, 0.9), C.line, 1.5); ecoEikenblad(ctx, 1360, 620, 13, { stadium: 0.3 });
    circ(ctx, 560, 620, 100, rgba(C.fill, 0.9), C.line, 1.5); e4CO2(ctx, 520, 600, 12); e4Nitraat(ctx, 590, 600, 14); e4Fosfaat(ctx, 560, 650, 12);
    P.forEach(([x, y, n], i) => naamBij(ctx, n, null, x, y + 150, 1, 'center'));
    circ(ctx, 1700, 160, 44, C.goud); pijl(ctx, 1650, 190, 1080, 240, C.goud, 1, 4, 16); e4Warmte(ctx, 1500, 860, 1.6); pijl(ctx, 1420, 760, 1760, 860, C.koraal, 1, 4, 16); naamBij(ctx, 'warmte', null, 1660, 790, 1, 'center', C.koraal); naamBij(ctx, 'licht', null, 1700, 260, 1, 'center', C.goud);
    haak(ctx, 460, 1460, 790, 'Stoffen gaan rond. Energie gaat één kant op.', C.groen); },
  e4s22(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS'); metaText(ctx, 'PROEFOPZET', 960, 150, C.goud, 'center', 30);
    [[560, 'grof gaas', '5 mm · ook pissebed, worm', 60], [1360, 'fijn gaas', '0,5 mm · alleen microben', 12]].forEach(([x, n, m, maas]) => { e4Zakje(ctx, x, 470, 460, 300, maas, (c) => ecoEikenblad(c, x, 470, 20, {})); naamBij(ctx, n, m, x, 690, 1, 'center'); metaText(ctx, '125 G BLAD', x, 290, C.text2, 'center', 26); });
    ecoPissebed(ctx, 560, 560, 40, {}); ecoPissebed(ctx, 1080, 600, 40, {}); naamBij(ctx, 'past er niet door', null, 1080, 800, 1, 'center', C.koraal);
    ecoSchaal(ctx, 'een half jaar in het bos, dan wegen'); },
  e4s23(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H2 DE OPRUIMERS'); e4ProefStaaf(ctx, 260, 760, 1000, 500);
    naamBij(ctx, 'grof: 72 g weg', null, 1340, 420, 1, 'left', C.oker); naamBij(ctx, 'fijn: 36 g weg', null, 1340, 500, 1, 'left', C.teal);
    naamBij(ctx, 'met detrituseters ± 2× zo snel', null, 1340, 620, 1, 'left', C.groen); },
  // ---------------- H3
  e4s24(ctx) { e4Tuin(ctx); ecoTag(ctx, _N4, 'H3 DE COMPOSTHOOP'); e4Moestuinbak(ctx, 1400, 900, 420);
    e4Compost(ctx, 1100, 880, 520, 330, {}); persoon(ctx, 'noor', 650, 900, 420, { pose: 'vasthouden' }); e4Thermometer(ctx, 1170, 640, 200, 0.8, '60 °C');
    for (let i = 0; i < 3; i++) lijn(ctx, [[1060 + i * 30, 540], [1050 + i * 30, 480], [1070 + i * 30, 430]], rgba('#E8EEF4', 0.35), 6); },
  e4s25(ctx) { e4Tuin(ctx); ecoTag(ctx, _N4, 'H3 DE COMPOSTHOOP');
    e4Moestuinbak(ctx, 990, 900, 720); for (let i = 0; i < 6; i++) { for (const d of [-1, 1]) { ctx.save(); ctx.translate(1080 + i * 110, 836); ctx.rotate(d * 0.7); ctx.beginPath(); ctx.ellipse(d * 16, -6, 22, 11, 0, 0, 6.283); ctx.fillStyle = '#7FC48F'; ctx.fill(); ctx.restore(); } lijn(ctx, [[1080 + i * 110, 852], [1080 + i * 110, 830]], '#5FA86E', 5); }
    persoon(ctx, 'noor', 700, 900, 420, { pose: 'vasthouden' }); for (let i = 0; i < 16; i++) circ(ctx, 840 + hash(i) * 120, 700 + hash(i + 9) * 50, 7, '#3A2A1E'); 
    e4Nitraat(ctx, 1200, 870, 16, true); naamBij(ctx, 'compost', 'naar de moestuin', 900, 600, 1, 'center'); naamBij(ctx, 'jonge sla', null, 1350, 770, 1, 'center'); },
  e4s26(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H3 DE COMPOSTHOOP');
    e4Compost(ctx, 760, 820, 900, 560, { doorsnede: true });
    for (let i = 0; i < 12; i++) { const x = 600 + hash(i) * 320, y = 560 + hash(i + 4) * 180; e4Bacterie(ctx, x, y, 30, i); } e4Warmte(ctx, 760, 500, 1.6);
    ['warm', 'vochtig', 'zuurstof'].forEach((n, i) => { roundRect(ctx, 1360, 300 + i * 140, 400, 100, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, n, 1560, 365 + i * 140, fTekst(44, 700), C.text, 'center'); });
    metaText(ctx, 'DOORSNEDE · LUCHTKANALEN', 760, 880, C.text2, 'center', 26); },
  e4q27(ctx) { _vk4(ctx, 'e4q27'); },
  e4s28(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H3 DE COMPOSTHOOP');
    e4Compost(ctx, 760, 820, 900, 560, { doorsnede: true, nat: true }); for (let i = 0; i < 8; i++) e4Bacterie(ctx, 600 + hash(i) * 320, 600 + hash(i + 4) * 160, 30, i, '#7FAFC0');
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(580 + i * 120, 220 - (i % 2) * 30, 50, 24, 0, 0, 6.283); ctx.fillStyle = rgba('#C9C06A', 0.35); ctx.fill(); } naamBij(ctx, 'water in de luchtkanalen', null, 760, 880, 1, 'center', C.teal);
    naamBij(ctx, 'te nat: geen lucht', 'trage afbraak · stank', 1400, 480, 1, 'left', C.koraal); },
  e4s29(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H3 DE COMPOSTHOOP'); vwoMarker(ctx);
    const st = (x, kl, n, cn, h) => { vul(ctx, [[x - 260, 760], [x - 140, 760 - h], [x + 140, 760 - h], [x + 260, 760]], kl, _lt(kl, 0.25), 2); naamBij(ctx, n, cn, x, 840, 1, 'center'); };
    st(560, '#5FA86E', 'vers gras', 'C/N ± 15', 300); st(1360, '#A06C36', 'eikenblad', 'C/N ± 40–80', 300);
    text(ctx, 'snel', 560, 360, fTekst(48, 700), C.groen, 'center'); text(ctx, 'traag', 1360, 360, fTekst(48, 700), C.oker, 'center');
    e4Nitraat(ctx, 480, 600, 14); e4Nitraat(ctx, 560, 560, 14); e4Nitraat(ctx, 640, 610, 14); e4Nitraat(ctx, 1360, 590, 14); },
  // ---------------- H4
  e4s30(ctx) { e4Hoogveen(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT');
    naamBij(ctx, 'hoogveen', 'nat · zuur · zuurstofarm', 960, 300, 1, 'center'); naamBij(ctx, 'veenmos', null, 520, 700, 1, 'center'); naamBij(ctx, 'wollegras', null, 1460, 640, 1, 'center'); },
  e4s31(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT');
    e4VeenDoorsnede(ctx, 300, 160, 1000, 700); ['nu', '± 200 jaar', '± 400 jaar', '± 600 jaar', '± 800 jaar', '± 1000 jaar'].forEach((n, i) => metaText(ctx, n, 1340, 160 + (i + 0.6) * 700 / 6, C.text2, 'left', 26));
    lijn(ctx, [[260, 160], [260, 860]], C.goud, 3); metaText(ctx, '± 1 M', 240, 520, C.goud, 'right', 28); naamBij(ctx, '± 1 mm per jaar', null, 800, 120, 1, 'center', C.goud); },
  e4s32(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT');
    e4VeenDoorsnede(ctx, 160, 160, 760, 700); zoomCircle(ctx, 1360, 480, 320, 600, 700, 'yde · ± 2000 jaar in het veen', 1, () => { ctx.fillStyle = '#3A2E24'; ctx.fillRect(1040, 160, 640, 640); e4Yde(ctx, 1400, 520, 2.2); });
    naamBij(ctx, 'gevonden in het jaar 1897', 'turfstekers bij Yde (Drenthe)', 1360, 120, 1, 'center'); },
  e4q33(ctx) { _vk4(ctx, 'e4q33'); },
  e4s34(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT');
    ['nat', 'zuur', 'geen zuurstof'].forEach((n, i) => { roundRect(ctx, 140 + i * 340, 240, 300, 120, 18); shape(ctx, rgba(C.fill, 0.85), C.line, 1.5); text(ctx, n, 290 + i * 340, 315, fTekst(44, 700), C.text, 'center'); });
    haak(ctx, 140, 1100, 380, 'Afbraak staat bijna stil.', C.goud);
    roundRect(ctx, 1320, 520, 360, 240, 14); shape(ctx, '#4E3A28', '#6E5A44', 2); for (let i = 0; i < 14; i++) circ(ctx, 1350 + hash(i) * 300, 550 + hash(i + 7) * 180, 9, '#2A2018');
    for (let i = 0; i < 6; i++) e4Bacterie(ctx, 1360 + hash(i + 30) * 280, 560 + hash(i + 40) * 160, 28, i);
    naamBij(ctx, 'turf', 'droog · lucht · weer afbraak', 1500, 830, 1, 'center'); },
  e4s35(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT'); vwoMarker(ctx);
    zoomCircle(ctx, 960, 450, 330, 960, 450, 'hete bron in de diepzee · ± 2500 m diep', 1, () => e4ZwarteRoker(ctx, 960, 450, 330));
    naamBij(ctx, 'zwavelwaterstof', 'uit de bron', 1330, 300, 1, 'left'); naamBij(ctx, 'bacteriën', 'energie uit een reactie', 1330, 560, 1, 'left', C.goud); naamBij(ctx, 'geen licht', null, 590, 220, 1, 'right', C.text2); },
  e4s36(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'H4 WAAR AFBRAAK STOPT'); vwoMarker(ctx);
    e4Bacterie(ctx, 960, 470, 260, 0.1, C.teal); e4CO2(ctx, 560, 460, 22); pijl(ctx, 620, 460, 820, 470, ECOK.anorganisch, 1, 4, 16); e4Keten(ctx, 1220, 470, 3, 18); pijl(ctx, 1100, 470, 1200, 470, C.groen, 1, 4, 16);
    circ(ctx, 1500, 220, 40, null, C.goud, 3); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; lijn(ctx, [[1500 + Math.cos(a) * 52, 220 + Math.sin(a) * 52], [1500 + Math.cos(a) * 70, 220 + Math.sin(a) * 70]], C.goud, 3); } lijn(ctx, [[1440, 280], [1560, 160]], C.koraal, 6); metaText(ctx, 'GEEN LICHT NODIG', 1500, 330, C.text2, 'center', 26); naamBij(ctx, 'CO₂', null, 560, 530, 1, 'center'); naamBij(ctx, 'organische stof', null, 1270, 530, 1, 'center', C.groen);
    naamBij(ctx, 'chemo-autotroof', 'energie uit een reactie · koolstof uit CO₂', 960, 760, 1, 'center', C.groen); },
  // ---------------- Samenvatting
  e4s37(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'SAMENVATTING');
    e4Logboek(ctx, 100, 140, 1040, [['11 nov', '1,0 g', 'valt van de eik', null], ['mei', '0,7 g', 'gewogen', _vrij], ['jaar 2', '0,4 g', '', _vrij], ['jaar 3', '0,1 g', '', _vrij]]);
    lijn(ctx, [[1300, 520], [1780, 520]], C.line, 4); lijn(ctx, [[1540, 520], [1540, 760]], C.line, 4); vul(ctx, [[1500, 780], [1580, 780], [1540, 740]], C.line);
    for (let i = 0; i < 4; i++) ecoEikenblad(ctx, 1340 + i * 26, 490 - i * 10, 4, { hoek: 0.4 + i }); for (let i = 0; i < 4; i++) ecoEikenblad(ctx, 1660 + i * 26, 490 - i * 10, 4, { stadium: 0.3 + i * 0.2, hoek: i }); naamBij(ctx, 'nieuw blad', null, 1380, 580, 1, 'center'); naamBij(ctx, 'oud blad weg', null, 1700, 580, 1, 'center');
    metaText(ctx, 'MODEL: AFRONDING', 120, 880, C.text2, 'left', 26); },
  e4s38(ctx) { e4Bos(ctx, { blad: false }); ecoTag(ctx, _N4, 'SAMENVATTING'); metaText(ctx, 'MEI', 1800, 78, C.goud, 'right', 28);
    e4BoomZonder(ctx, 1200, 860, 6.0, {}); e4Nitraat(ctx, 1160, 200, 22, true); naamBij(ctx, 'nitraat van vorig jaar', 'in een nieuw blad', 1240, 130, 1, 'left', ECOK.stikstof); persoon(ctx, 'bas', 600, 900, 460, { pose: 'vasthouden' }); e4Zakje(ctx, 790, 885, 40, 26, 8, (c) => ecoEikenblad(c, 790, 885, 2.2, {})); naamBij(ctx, 'nieuw zakje', '± 15 cm', 820, 830, 1, 'left'); },
  e4s39(ctx) { _sch4(ctx); ecoTag(ctx, _N4, 'EINDKAART');
    ['Organische stof wordt afgebroken tot anorganische stof.', 'Detrituseters maken klein, reducenten breken af.', 'Stoffen gaan rond, energie verlaat het bos als warmte.'].forEach((r, i) => text(ctx, r, 200, 330 + i * 130, fTekst(54, 600), C.text, 'left'));
    ctx.strokeStyle = C.groen; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(170, 270); ctx.lineTo(150, 270); ctx.lineTo(150, 620); ctx.lineTo(170, 620); ctx.stroke(); },
};
