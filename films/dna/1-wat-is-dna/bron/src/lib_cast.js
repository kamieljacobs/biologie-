// ===== Vaste personages — Biologie bij Kamiel (15 okt 2026) =====
// Zes vaste mensen die in alle films terugkomen. Vlak getekend (Part C: geen omlijning, één schaduwtint), warm en herkenbaar.
// Gebruik:  persoon(ctx, 'noor', x, y, h, { uit: 'blij', pose: 'wijs', a: 1, kijk: 1, t })
//   x, y = midden tussen de voeten op de grond · h = lengte in px · uit = gezichtsuitdrukking · pose = houding · kijk = -1/1 kijkrichting
//   Geeft ankerpunten terug: { hoofd:{x,y,r}, handR, handL, heup } voor pijlen, labels en vastgehouden voorwerpen.
// Uitdrukkingen: neutraal, blij, lacht, verbaasd, denkt, bezorgd, ernstig (zacht bezorgd: binnenkant wenkbrauwen omhoog, mond recht; 25 okt 2026), praat (mond open/dicht op t), slaapt (ogen dicht), moe (half dichte ogen)
// Houdingen: staan, zwaai, wijs, wijsOmhoog, denk, schouders, handenHeup, vasthouden (o.hold(ctx,x,y) tekent iets in de rechterhand),
//   handdruk (25 okt 2026): onderarm naar de ander, hand half open met duim omhoog; o.hand = {x, y} grijppunt (anders vóór het lichaam), o.schud 0..1 = drie keer op en neer.
//   Twee personages die elkaar de hand geven: handdruk(ctx, idL, idR, xm, voetY, h, { t, schud, outfitL, outfitR, uitL, uitR, zij, aL, aR }).
//   zit (25 okt 2026): zittend, vooraanzicht én zijaanzicht. o.stoel = true|kleur tekent een stoel erachter/eronder; o.tafel = y van het tafelblad → handen op tafel;
//   o.handOpHand = {x, y} → de arm aan die kant legt de hand op dat punt (bv. de hand van de partner: geef r.handR/handL van de partner door; teken de partner eerst);
//   o.zitHoogte = zithoogte in px (standaard 1,45 × kopmaat ≈ 45 cm); zijaanzicht: o.reik = hoe ver de handen op tafel vóór de borst liggen (× kopmaat, standaard 1,0).
//   Zonder tafel liggen de handen in de schoot. Geeft ook schoot:{x,y} (midden bovenop de dijen) en zit:{y} (zithoogte) terug.
// Zijaanzicht (21 okt 2026): { zij: true, kijk: 1|-1, gang: 'loop'|'ren', t (of fase 0..1), tempo } — van opzij, lopend of rennend; zie _zij onderaan

// plaatsdelict (25 okt 2026): forensisch onderzoeker in witte wegwerpoverall (Tyvek) met capuchon over het haar, mondkapje, nitrilhandschoenen en witte overschoenen
const _NITRIL = '#5B8CC9', _MASKER = '#DCE5EC';
const _PLAATSDELICT = { top: 'overall', topKleur: '#F2F2EE', topAccent: '#D4D8DE', broek: '#F2F2EE', schoen: '#F2F2EE', schoenAccent: '#D4D8DE', veiligheidsbril: false, accessoire: ['capuchon', 'mondkapje', 'handschoenen'] };
const CAST = {
  noor:   { naam: 'Noor', leeftijd: 16, rol: 'leerling · nieuwsgierig, stelt de vragen', huid: '#D9A982', haar: '#3A2418', kapsel: 'golf', wenkbrauw: '#2A1A12',
            top: 'trui', topKleur: '#E0A43A', topAccent: '#C98A2A', broek: '#33415C', schoen: '#F2F2EE', schoenAccent: '#D86A5A', accessoire: ['oorbel'], lengte: 0.97,
            garderobe: { school: {}, zomer: { top: 'tshirt', topKleur: '#E07A5F', topAccent: '#C9654B', broek: '#5B7FA8' },
              winter: { top: 'jas', topKleur: '#2E5C6E', topAccent: '#244A59', sjaal: '#E0A43A', broek: '#33415C', schoen: '#5A4030', schoenAccent: '#3A2A20' },
              sport: { top: 'tshirt', topKleur: '#5BA4C9', topAccent: '#4A8BB0', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#5BA4C9' },
              practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#E0A43A', veiligheidsbril: true } } },
  sam:    { naam: 'Sam', leeftijd: 16, rol: 'leerling · sportief, doet proefjes', huid: '#7A5440', haar: '#1E1612', kapsel: 'krul', wenkbrauw: '#140E0A',
            top: 'hoodie', topKleur: '#4F8F6A', topAccent: '#3E7556', broek: '#2A2F3E', schoen: '#F2F2EE', schoenAccent: '#4F8F6A', accessoire: [], lengte: 1.04,
            garderobe: { school: {}, zomer: { top: 'tshirt', topKleur: '#F2C14E', topAccent: '#D9A93A', broek: '#4A5A78' },
              winter: { top: 'jas', topKleur: '#3A3F4E', topAccent: '#2C303C', sjaal: '#4F8F6A', broek: '#2A2F3E', schoen: '#2A2F3E', schoenAccent: '#4F8F6A' },
              sport: { top: 'tshirt', topKleur: '#D8573F', topAccent: '#B9452F', broek: '#2A2F3E', kort: true, schoen: '#F2F2EE', schoenAccent: '#D8573F' },
              practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#4F8F6A', veiligheidsbril: true } } },
  daan:   { naam: 'Daan', leeftijd: 15, rol: 'leerling · rustig, denkt na, houdt van getallen', huid: '#EBC6A6', haar: '#D8B26A', kapsel: 'pony', wenkbrauw: '#B8904E',
            top: 'overhemd', topKleur: '#5B8CC9', topAccent: '#4A76AD', broek: '#5A4A3A', schoen: '#3A3F4E', schoenAccent: '#6B7287', accessoire: ['bril', 'sproeten'], lengte: 0.95,
            garderobe: { school: {}, practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#5B8CC9', veiligheidsbril: true } } }, // practicum (20 okt 2026)
  yasmin: { naam: 'Yasmin', leeftijd: 16, rol: 'leerling · scherp, wil later arts worden', huid: '#B98563', haar: '#2A1C16', kapsel: 'knot', wenkbrauw: '#2A1C16',
            top: 'jasje', topKleur: '#E8E2D4', topAccent: '#CFC7B4', binnen: '#2E3A55', broek: '#2E3A55', schoen: '#2A2F3E', schoenAccent: '#C8463C', accessoire: ['oorbel'], lengte: 0.98,
            garderobe: { school: {}, practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#2E3A55', veiligheidsbril: true } } }, // practicum (20 okt 2026)
  bilal:  { naam: 'Bilal', leeftijd: 17, rol: 'broer van Yasmin · grapjas, gamet graag', huid: '#B07A58', haar: '#1E1512', kapsel: 'kort', wenkbrauw: '#1E1512', stoppels: true,
            top: 'trui', topKleur: '#B23A3A', topAccent: '#962F2F', broek: '#2A2F3E', schoen: '#F2F2EE', schoenAccent: '#B23A3A', accessoire: [], lengte: 1.08,
            garderobe: { school: {}, zomer: { top: 'tshirt', topKleur: '#E8E2D4', topAccent: '#CFC7B4', broek: '#4D6E9C' },
              winter: { top: 'jas', topKleur: '#4A5240', topAccent: '#3C4334', sjaal: '#B23A3A', schoen: '#2A2F3E', schoenAccent: '#B23A3A' },
              sport: { top: 'tshirt', topKleur: '#2A2F3E', topAccent: '#1F2330', broek: '#2A2F3E', kort: true, schoenAccent: '#B23A3A' },
              practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#B23A3A', veiligheidsbril: true },
              plaatsdelict: _PLAATSDELICT } }, // plaatsdelict (25 okt 2026, Forensisch onderzoek)
  kim:    { naam: 'Dr. Kim', leeftijd: 42, rol: 'arts en onderzoeker · legt uit in lab en spreekkamer', huid: '#E6C09C', haar: '#1A1418', kapsel: 'golf', golfLang: 0.3, zijpony: true, wimpers: true, lippen: '#B4544C', wenkbrauw: '#1A1418',
            top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#3E8E9A', broek: '#2A3242', schoen: '#2A2F3E', schoenAccent: '#3E8E9A', accessoire: ['stethoscoop', 'oorbel'], lengte: 1.02,
            garderobe: { werk: {}, gewoon: { top: 'jasje', topKleur: '#3E5C7A', topAccent: '#324B64', binnen: '#E8E2D4', accessoire: ['oorbel'] }, lab: { accessoire: ['oorbel'] }, plaatsdelict: _PLAATSDELICT } }, // plaatsdelict (25 okt 2026, Forensisch onderzoek): witte overall met capuchon, mondkapje, nitrilhandschoenen, overschoenen; gewoon (20 okt 2026): zonder labjas, bv. als pedagoog
  lotte:  { naam: 'Lotte', leeftijd: 16, rol: 'leerling · fietst overal heen, nuchter en direct', huid: '#F1D2B8', haar: '#E6C27A', kapsel: 'staart', wenkbrauw: '#C29A55', oog: '#5A8FC4',
            top: 'trui', strepen: '#F4F1EA', topKleur: '#2B3F66', topAccent: '#223354', broek: '#4D6E9C', schoen: '#F2F2EE', schoenAccent: '#2B3F66', accessoire: [], lengte: 1.06,
            garderobe: { school: {}, zomer: { top: 'tshirt', strepen: null, topKleur: '#4FB3A5', topAccent: '#3E978B', broek: '#7FA3C9' },
              winter: { top: 'jas', strepen: null, topKleur: '#C9503C', topAccent: '#A8402F', sjaal: '#2B3F66', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C' },
              sport: { top: 'tshirt', strepen: null, topKleur: '#2B3F66', topAccent: '#223354', broek: '#F4F1EA', kort: true, schoen: '#F2F2EE', schoenAccent: '#E8833A' },
              koningsdag: { top: 'tshirt', strepen: null, topKleur: '#F08A24', topAccent: '#D9741A', broek: '#4D6E9C' },
              practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#2B3F66', strepen: null, veiligheidsbril: true } } },
  kind:   { naam: 'Teun', leeftijd: 6, rol: 'broertje van Noor · ± 6 jaar, ± 20 kg · voor scènes met een jong kind', huid: '#D9A982', haar: '#3A2418', kapsel: 'kort', wenkbrauw: '#2A1A12',
            top: 'tshirt', topKleur: '#5BA4C9', topAccent: '#4A8BB0', broek: '#33415C', kort: true, schoen: '#F2F2EE', schoenAccent: '#E0A43A', accessoire: [], lengte: 1,
            kop: 5.3, armK: 0.86, schouderK: 1.55, heupK: 1.32 }, // kinderverhoudingen: groter hoofd, korter lijf en kortere armen
  baby:   { naam: 'Baby', leeftijd: 0, rol: 'pasgeboren baby (een paar dagen oud) · ligt (hoofd links); h = lengte van de baby', baby: true, huid: '#EBC3A6', haar: '#5A3A26', wenkbrauw: '#8A6A50',
            topKleur: '#F2E6CC', topAccent: '#DDCCAA', accessoire: [], lengte: 1 },
  visser: { naam: 'Mevrouw Visser', leeftijd: 38, rol: 'docent biologie · vraagt eerst wat jij denkt', huid: '#C8956E', haar: '#5A3A24', kapsel: 'bob', wenkbrauw: '#4A2E1C',
            top: 'trui', topKleur: '#3E8E7E', topAccent: '#327466', broek: '#2E3A55', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril', 'oorbel'], lengte: 1.0,
            garderobe: { school: {}, practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#3E8E7E', veiligheidsbril: true } } }, // docent (20 okt 2026, Wat word jij? · Leraar biologie)
  henk:   { naam: 'Opa Henk', leeftijd: 71, rol: 'opa van Noor · man van Oma Ria, tuiniert, af en toe patiënt', huid: '#E3B998', haar: '#D9D9D4', kapsel: 'kalend', baard: true, wenkbrauw: '#BDBDB6',
            top: 'vest', topKleur: '#8A6A4E', topAccent: '#735740', binnen: '#E6E1D3', broek: '#4A5240', schoen: '#4A3A2E', schoenAccent: '#6B5440', accessoire: ['bril'], lengte: 0.96, krom: 0.03 },
  jesse:  { naam: 'Verpleegkundige Jesse', leeftijd: 29, rol: 'verpleegkundige · meet, kijkt en belt op tijd', huid: '#EFCDB0', haar: '#8A5A34', kapsel: 'kort', wenkbrauw: '#6E4628',
            top: 'overhemd', topKleur: '#EEF2F5', topAccent: '#D2DCE4', broek: '#DCE5EC', schoen: '#F2F2EE', schoenAccent: '#5B8CC9', accessoire: [], lengte: 1.0,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#4F8F6A', topAccent: '#3F7558', broek: '#33415C', schoen: '#3A3F4E', schoenAccent: '#4F8F6A' } } }, // verpleegkundige (20 okt 2026, Wat word jij? · Verpleegkunde)
  femke:  { naam: 'Fysiotherapeut Femke', leeftijd: 33, rol: 'fysiotherapeut · test, oefent en bouwt de belasting op', huid: '#D8A47F', haar: '#2E2018', kapsel: 'staart', wenkbrauw: '#2E2018',
            top: 'tshirt', topKleur: '#2E7D7A', topAccent: '#256765', broek: '#2A2F3E', schoen: '#F2F2EE', schoenAccent: '#2E7D7A', accessoire: [], lengte: 1.0,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#C9654B', topAccent: '#A8523C', broek: '#33415C' } } }, // fysiotherapeut (21 okt 2026, Wat word jij? · Verpleegkunde en Fysiotherapie)
  ravi:   { naam: 'Apotheker Ravi', leeftijd: 35, rol: 'apotheker · achter de balie, controleert elk recept', huid: '#9C6B4E', haar: '#1A1412', kapsel: 'kort', wenkbrauw: '#1A1412', stoppels: true,
            top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#6A5A9A', broek: '#2E3442', schoen: '#2A2F3E', schoenAccent: '#6A5A9A', accessoire: ['bril'], lengte: 1.03,
            garderobe: { werk: {}, gewoon: { top: 'overhemd', topKleur: '#6A5A9A', topAccent: '#584A82', broek: '#2E3442', accessoire: ['bril'] } } }, // apotheker (20 okt 2026, Wat word jij? · Farmacie)
  mirjam: { naam: 'Verloskundige Mirjam', leeftijd: 46, rol: 'verloskundige · luistert, meet en legt eerlijk uit', huid: '#E9C3A0', haar: '#B89A72', kapsel: 'golf', golfLang: 0.45, wenkbrauw: '#8A6E4C', wimpers: true, lippen: '#B4605A',
            top: 'vest', topKleur: '#8C5A7A', topAccent: '#744A65', binnen: '#EEE6DA', broek: '#2E3442', schoen: '#3A3F4E', schoenAccent: '#8C5A7A', accessoire: ['bril', 'oorbel'], lengte: 0.99,
            garderobe: { werk: {}, bevalling: { top: 'tshirt', topKleur: '#5E8FA8', topAccent: '#4D7A90', broek: '#5E8FA8', schoen: '#F2F2EE', schoenAccent: '#5E8FA8', accessoire: ['bril'] } } }, // verloskundige (21 okt 2026, Wat word jij? · Verloskunde)
  esra:   { naam: 'Esra', leeftijd: 29, rol: 'zwanger van haar eerste kind · cliënte van Mirjam', huid: '#C99872', haar: '#2A1A14', kapsel: 'golf', golfLang: 1.2, wenkbrauw: '#24160F', wimpers: true, lippen: '#A9584E',
            top: 'trui', topKleur: '#D9A441', topAccent: '#BF8C32', broek: '#3E4A63', schoen: '#F2F2EE', schoenAccent: '#C9654B', accessoire: ['oorbel'], lengte: 0.97, zwanger: 0.8,
            garderobe: { gewoon: {}, jas: { top: 'jas', topKleur: '#6B4E3A', topAccent: '#584030', sjaal: '#D9A441' }, kraam: { top: 'vest', topKleur: '#8FA6B8', topAccent: '#7790A3', binnen: '#F2ECE2', zwanger: 0 } } }, // cliënte (21 okt 2026, Wat word jij? · Verloskunde); o.zwanger 0..1 = buik (0 = niet zwanger)
  mila:   { naam: 'Dierenarts Mila', leeftijd: 34, rol: 'dierenarts · van koe en paard tot kat, op het erf en in de praktijk', huid: '#E4B48E', haar: '#7A4A2A', kapsel: 'vlecht', wenkbrauw: '#5E3820',
            top: 'overhemd', topKleur: '#3E7C6A', topAccent: '#33685A', broek: '#2E3442', schoen: '#2A2F3E', schoenAccent: '#3E7C6A', accessoire: ['stethoscoop'], lengte: 1.0,
            garderobe: { werk: {}, stal: { top: 'jas', topKleur: '#2F5D50', topAccent: '#264C42', broek: '#2F5D50', schoen: '#3A3F2E', schoenAccent: '#2A2E22', accessoire: [] }, gewoon: { top: 'trui', topKleur: '#B8743A', topAccent: '#9C6230', broek: '#33415C', accessoire: [] } } }, // dierenarts (21 okt 2026, Wat word jij? · Diergeneeskunde): werk = praktijk met stethoscoop, stal = groene overall en laarzen
  gerrit: { naam: 'Veehouder Gerrit', leeftijd: 52, rol: 'veehouder · melkvee en varkens, kent elk dier', huid: '#D9A584', haar: '#8A7A66', kapsel: 'kort', wenkbrauw: '#6A5A48', stoppels: true,
            top: 'jas', topKleur: '#3A5A8C', topAccent: '#2F4A74', broek: '#3A5A8C', schoen: '#2E3A2A', schoenAccent: '#1E261C', accessoire: [], lengte: 1.02,
            garderobe: { stal: {}, gewoon: { top: 'overhemd', topKleur: '#8A5A3A', topAccent: '#744A30', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C' } } } // veehouder (21 okt 2026, Wat word jij? · Diergeneeskunde, ook voor Landbouw): stal = blauwe overall en laarzen
  ,
  wouter: { naam: 'Tandarts Wouter', leeftijd: 44, rol: 'tandarts · kijkt, voelt, maakt foto\'s en boort pas als het moet', huid: '#E8BE9A', haar: '#5A4434', kapsel: 'kort', wenkbrauw: '#46342A', stoppels: true,
            top: 'overhemd', topKleur: '#F4F6F8', topAccent: '#D8DFE6', broek: '#2E4A5C', schoen: '#F2F2EE', schoenAccent: '#2E8A9A', accessoire: ['bril'], lengte: 1.03,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#2E4A5C', topAccent: '#253C4B', broek: '#5A4A3A', schoen: '#3A3F4E', schoenAccent: '#2E8A9A' } } }, // tandarts (21 okt 2026, Wat word jij? · Tandheelkunde): werk = witte tuniek
  ilse:   { naam: 'Mondhygiënist Ilse', leeftijd: 31, rol: 'mondhygiënist · meet het tandvlees, poetst mee en voorkomt gaatjes', huid: '#F0CFB4', haar: '#B4542E', kapsel: 'staart', wenkbrauw: '#8E3E22', wimpers: true, lippen: '#B4605A',
            top: 'overhemd', topKleur: '#CFE6E2', topAccent: '#B2D2CC', broek: '#CFE6E2', schoen: '#F2F2EE', schoenAccent: '#3E9A8A', accessoire: ['oorbel'], lengte: 0.98,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#6A5A9A', topAccent: '#584A82', broek: '#33415C', schoen: '#3A3F4E', schoenAccent: '#6A5A9A' } } } // mondhygiënist (21 okt 2026, Wat word jij? · Tandheelkunde): werk = mintgroen pak
,
  // ===== Familie van Noor, tweeling en figuranten (22 okt 2026; Kamiel: 'meer personages, met namen, een soort stamboom') =====
  linda:  { naam: 'Linda', leeftijd: 44, rol: 'moeder van Noor en Teun · dochter van Opa Henk en Oma Ria', huid: '#E9C1A0', haar: '#6A4A30', kapsel: 'golf', golfLang: 0.55, wenkbrauw: '#4A3220', wimpers: true, lippen: '#B4605A',
            top: 'trui', topKleur: '#5E8FA8', topAccent: '#4D7A90', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 0.98,
            garderobe: { gewoon: {}, zwanger: { top: 'tshirt', topKleur: '#4FB3A5', topAccent: '#3E978B', zwanger: 0.85, haar: '#6A4A30', golfLang: 0.9 } } }, // zwanger = 16 jaar geleden, zwanger van Noor
  rachid: { naam: 'Rachid', leeftijd: 47, rol: 'vader van Noor en Teun · zoon van Opa Ahmed en Oma Malika', huid: '#B98060', haar: '#1E1612', kapsel: 'kort', wenkbrauw: '#1A120E', stoppels: true,
            top: 'overhemd', topKleur: '#3E6E5A', topAccent: '#33594A', broek: '#2E3442', schoen: '#3A2E26', schoenAccent: '#241C16', accessoire: [], lengte: 1.04 },
  ria:    { naam: 'Oma Ria', leeftijd: 69, rol: 'oma van Noor · vrouw van Opa Henk, moeder van Linda en Petra', huid: '#EBC6A6', haar: '#E2DFD6', kapsel: 'bob', wenkbrauw: '#B8B2A6', wimpers: true, lippen: '#B4605A',
            top: 'vest', topKleur: '#7A8FB0', topAccent: '#647896', binnen: '#F2ECE2', broek: '#4A4E5E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril', 'oorbel'], lengte: 0.95,
            garderobe: { gewoon: {}, vroeger: { haar: '#B07A44', wenkbrauw: '#8A5A30', kapsel: 'golf', golfLang: 0.85, accessoire: ['oorbel'], top: 'trui', topKleur: '#C9654B', topAccent: '#A8523C', broek: '#4D6E9C' } } }, // vroeger = ± 45 jaar geleden (zwanger van Linda)
  ahmed:  { naam: 'Opa Ahmed', leeftijd: 74, rol: 'opa van Noor · vader van Rachid', huid: '#A87656', haar: '#D2D0C8', kapsel: 'kort', wenkbrauw: '#BDB8AE', stoppels: true,
            top: 'jasje', topKleur: '#5A5A66', topAccent: '#4A4A55', binnen: '#E8E2D4', broek: '#3A3F4E', schoen: '#2A2F3E', schoenAccent: '#1E2230', accessoire: ['bril'], lengte: 1.0, krom: 0.03 },
  malika: { naam: 'Oma Malika', leeftijd: 71, rol: 'oma van Noor · moeder van Rachid', huid: '#B07A58', haar: '#3A2A22', kapsel: 'hoofddoek', doekKleur: '#7A5A8C', doekAccent: '#624876', wenkbrauw: '#2A1C16', wimpers: true,
            top: 'vest', topKleur: '#4A6A5A', topAccent: '#3C584A', binnen: '#E6E1D3', broek: '#3E3A4E', schoen: '#3A2E26', schoenAccent: '#241C16', accessoire: [], lengte: 0.94 },
  petra:  { naam: 'Tante Petra', leeftijd: 41, rol: 'tante van Noor · zus van Linda', huid: '#ECC4A2', haar: '#9A6A3A', kapsel: 'staart', wenkbrauw: '#7A5028', wimpers: true, lippen: '#B4605A',
            top: 'jas', topKleur: '#4F8F6A', topAccent: '#3E7556', broek: '#2E3442', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 1.0 },
  thijs:  { naam: 'Thijs', leeftijd: 15, rol: 'eeneiige tweelingbroer van Daan · zelfde DNA, ander shirt', huid: '#EBC6A6', haar: '#D8B26A', kapsel: 'pony', wenkbrauw: '#B8904E',
            top: 'tshirt', topKleur: '#C9654B', topAccent: '#A8523C', broek: '#5A4A3A', schoen: '#3A3F4E', schoenAccent: '#6B7287', accessoire: ['sproeten'], lengte: 0.95 },
  erik:   { naam: 'Erik', leeftijd: 38, rol: 'figurant · verdachte, voorbijganger, iemand uit een onderzoek', huid: '#E3B998', haar: '#7A6A58', kapsel: 'kort', wenkbrauw: '#5A4A3A', stoppels: true,
            top: 'jas', topKleur: '#3A3F4E', topAccent: '#2C303C', broek: '#4A4E5E', schoen: '#2A2F3E', schoenAccent: '#1E2230', accessoire: [], lengte: 1.02 },
  joost:  { naam: 'Joost', leeftijd: 55, rol: 'figurant · verre familie, buurman, iemand uit een onderzoek', huid: '#E6BE9A', haar: '#B8B0A0', kapsel: 'kort', wenkbrauw: '#9A9284',
            top: 'trui', topKleur: '#8A5A3A', topAccent: '#744A30', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril'], lengte: 1.0 },
  buurvrouw: { naam: 'Mevrouw Jansen', leeftijd: 72, rol: 'buurvrouw · oudere vrouw, los van Noors familie', huid: '#E8C3A4', haar: '#DCD8D0', kapsel: 'kort', wenkbrauw: '#BEB6AA', wimpers: true, lippen: '#B4605A',
            top: 'vest', topKleur: '#6E8A5E', topAccent: '#5C744E', binnen: '#EEE6DA', broek: '#4A4E5E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 0.93, krom: 0.03,
            garderobe: { thuis: {}, buiten: { top: 'jas', topKleur: '#7A5A6E', topAccent: '#644A5A' } } }, // 25 okt 2026 (Forensisch onderzoek 3): kort wit haar, groen vest; bewust anders dan Oma Ria (geen bob, geen bril)
  lieke:  { naam: 'Lieke', leeftijd: 36, rol: 'forensisch entomoloog · alleen in haar eigen vak', huid: '#C4906A', haar: '#2A1C16', kapsel: 'staart', elastiek: '#7A5A9A', wenkbrauw: '#22160F', wimpers: true, lippen: '#A9584E',
            top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#7A5A9A', broek: '#2E3442', schoen: '#2A2F3E', schoenAccent: '#7A5A9A', accessoire: ['bril', 'oorbel'], lengte: 0.99,
            garderobe: { lab: {}, plaatsdelict: _PLAATSDELICT } }, // 25 okt 2026 (Forensisch onderzoek 3): labjas met paarse binnenkant, bril; plaatsdelict = larven verzamelen op de plaats
  merel:  { naam: 'Procestechnoloog Merel', leeftijd: 38, rol: 'procestechnoloog · laat cellen in grote vaten een product maken en zuivert het · alleen in haar eigen vak', huid: '#9C6A4C', haar: '#24170F', kapsel: 'kort', wenkbrauw: '#1E130C', wimpers: true, lippen: '#A9584E',
            top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#C7843A', broek: '#33415C', schoen: '#2A2F3E', schoenAccent: '#C7843A', accessoire: ['oorbel'], lengte: 0.97,
            garderobe: { lab: {}, gewoon: { top: 'trui', topKleur: '#2E8A9A', topAccent: '#26737F', broek: '#33415C' } } }, // 25 okt 2026 (Biotechnologie, begeleider van Sam; goedgekeurd door Kamiel 25 okt 2026): kort donker haar, labjas met oker binnenkant, geen bril (anders dan Lieke)
  fleur:  { naam: 'Fleur', leeftijd: 10, rol: 'meisje van ± 10 jaar (groep 7) · voor scènes met een basisschoolkind, bv. de HPV-prik', huid: '#C99872', haar: '#3A2418', kapsel: 'vlecht', wenkbrauw: '#2A1A12',
            top: 'tshirt', strepen: null, topKleur: '#E07A8F', topAccent: '#C8667A', broek: '#4D6E9C', schoen: '#F2F2EE', schoenAccent: '#E07A8F', accessoire: [], lengte: 1,
            kop: 5.8, armK: 0.9, schouderK: 1.42, heupK: 1.24 }, // kinderverhoudingen (± 10 jaar, ± 140 cm): hoofd iets kleiner dan bij Teun
  ruben:  { naam: 'Ruben', leeftijd: 10, rol: 'jongen van ± 10 jaar (groep 7) · klasgenoot van Fleur', huid: '#F0CFB4', haar: '#B4542E', kapsel: 'kort', wenkbrauw: '#8A3E22',
            top: 'tshirt', strepen: null, topKleur: '#4FB3A5', topAccent: '#3E978B', broek: '#33415C', schoen: '#F2F2EE', schoenAccent: '#2B3F66', accessoire: [], lengte: 1,
            kop: 5.8, armK: 0.9, schouderK: 1.45, heupK: 1.22 },
  // ===== Gezin De Wit (25 okt 2026, Erfelijkheid 1 Chromosomen; ter keuring): figurantengezin met een kind met albinisme (OCA1) =====
  // Ouders Aa (geen albinisme), drie kinderen: Sara en Jens met huid en haar zoals hun ouders, Levi (10) met albinisme: heel lichte huid,
  // wit-blond haar, wenkbrauwen en wimpers, lichtblauwgrijze ogen (MedlinePlus OCA1: 'white hair, very pale skin, light-colored irises').
  // Garderobe 'licht' = variant B voor de keuring: een gezin met een lichte huid (dan valt Levi minder op; Kamiel kiest).
  dennis: { naam: 'Dennis', leeftijd: 43, rol: 'figurant · vader in het gezin De Wit (Aa)', huid: '#8E6248', haar: '#1E1612', kapsel: 'krul', wenkbrauw: '#16100C', stoppels: true,
            top: 'trui', topKleur: '#4D6E9C', topAccent: '#3F5C84', broek: '#3A3F4E', schoen: '#3A2E26', schoenAccent: '#241C16', accessoire: [], lengte: 1.04,
            garderobe: { gewoon: {}, licht: { huid: '#E6BE9A', haar: '#6A4A30', wenkbrauw: '#4A3220', kapsel: 'kort' } } },
  marieke: { naam: 'Marieke', leeftijd: 41, rol: 'figurant · moeder in het gezin De Wit (Aa)', huid: '#B98563', haar: '#3A2418', kapsel: 'golf', golfLang: 0.6, wenkbrauw: '#2A1A12', wimpers: true, lippen: '#A8564E',
            top: 'vest', topKleur: '#C9654B', topAccent: '#A8523C', binnen: '#F2ECE2', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 0.97,
            garderobe: { gewoon: {}, licht: { huid: '#EFC9A8', haar: '#8A5A30', wenkbrauw: '#6A4422' } } },
  sara:   { naam: 'Sara', leeftijd: 13, rol: 'figurant · dochter in het gezin De Wit, oudste, krullen van haar vader', huid: '#A5734F', haar: '#24180F', kapsel: 'staart', wenkbrauw: '#1E140C', wimpers: true,
            top: 'hoodie', topKleur: '#8C7BBF', topAccent: '#7464A6', broek: '#2E3442', schoen: '#F2F2EE', schoenAccent: '#8C7BBF', accessoire: [], lengte: 0.97,
            kop: 6.0, armK: 0.95, schouderK: 1.3, heupK: 1.16, garderobe: { gewoon: {}, licht: { huid: '#EBC4A2', haar: '#7A5230', wenkbrauw: '#5A3A20' } } },
  levi:   { naam: 'Levi', leeftijd: 10, rol: 'figurant · zoon in het gezin De Wit, heeft albinisme (aa): heel lichte huid, wit-blond haar, lichte ogen', huid: '#F6E4D8', haar: '#EDE2BC', kapsel: 'kort', wenkbrauw: '#E2D6B4', oog: '#8FAAC0',
            top: 'tshirt', strepen: null, topKleur: '#4F8F6A', topAccent: '#3E7556', broek: '#33415C', schoen: '#F2F2EE', schoenAccent: '#4F8F6A', accessoire: [], lengte: 1,
            kop: 5.8, armK: 0.9, schouderK: 1.45, heupK: 1.22, garderobe: { gewoon: {}, licht: {} } },
  jens: { naam: 'Jens', leeftijd: 7, rol: 'figurant · jongste zoon in het gezin De Wit, huid en haar als zijn moeder', huid: '#B07C58', haar: '#2E1E14', kapsel: 'kort', wenkbrauw: '#22160E',
            top: 'tshirt', topKleur: '#E0A43A', topAccent: '#C98A2A', broek: '#4D6E9C', kort: true, schoen: '#F2F2EE', schoenAccent: '#D86A5A', accessoire: [], lengte: 1,
            kop: 5.4, armK: 0.87, schouderK: 1.52, heupK: 1.3, garderobe: { gewoon: {}, licht: { huid: '#F0CCAE', haar: '#9A6A3A', wenkbrauw: '#7A5028' } } },
  // grootouders De Wit (voor de fotolijstjes): geen van vieren heeft albinisme
  opawit: { naam: 'Opa Frank', leeftijd: 72, rol: 'figurant · opa (vaderskant) in het gezin De Wit', huid: '#80583F', haar: '#CFCCC4', kapsel: 'kort', wenkbrauw: '#B8B4AA', baard: true,
            top: 'overhemd', topKleur: '#5A6E5E', topAccent: '#4A5C4E', broek: '#3A3F4E', schoen: '#2A2F3E', schoenAccent: '#1E2230', accessoire: ['bril'], lengte: 1.0,
            garderobe: { gewoon: {}, licht: { huid: '#E6BE9A' } } },
  omawit: { naam: 'Oma Lucia', leeftijd: 70, rol: 'figurant · oma (vaderskant) in het gezin De Wit', huid: '#946A4E', haar: '#D8D4CC', kapsel: 'bob', wenkbrauw: '#A8A296', wimpers: true, lippen: '#A8564E',
            top: 'vest', topKleur: '#7A5A8C', topAccent: '#624876', binnen: '#EEE6DA', broek: '#3E3A4E', schoen: '#3A2E26', schoenAccent: '#241C16', accessoire: ['oorbel'], lengte: 0.95,
            garderobe: { gewoon: {}, licht: { huid: '#EBC6A6' } } },
  opabos: { naam: 'Opa Wim', leeftijd: 70, rol: 'figurant · opa (moederskant) in het gezin De Wit', huid: '#C08E6A', haar: '#BDBAB2', kapsel: 'kalend', wenkbrauw: '#9A968C',
            top: 'trui', topKleur: '#5E8FA8', topAccent: '#4D7A90', broek: '#4A4E5E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: [], lengte: 1.0, krom: 0.03,
            garderobe: { gewoon: {}, licht: { huid: '#EDC7A6' } } },
  omabos: { naam: 'Oma Anja', leeftijd: 68, rol: 'figurant · oma (moederskant) in het gezin De Wit', huid: '#B07C58', haar: '#E2DFD6', kapsel: 'golf', golfLang: 0.4, wenkbrauw: '#B8B2A6', wimpers: true, lippen: '#A8564E',
            top: 'trui', topKleur: '#C9A35C', topAccent: '#AE8A48', broek: '#3E3A4E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril'], lengte: 0.95,
            garderobe: { gewoon: {}, licht: { huid: '#F0CCAE' } } },
  // ===== Ouders in Bio-informatica 2 (25 okt 2026; figuranten, ouders van een meisje van 4 met een zeldzame aandoening; los van alle families) =====
  anouk:  { naam: 'Anouk', leeftijd: 34, rol: 'figurant · moeder van een meisje van 4 (Bio-informatica 2, uitslaggesprek) · los van alle families', huid: '#E9C2A0', haar: '#7A3A20', kapsel: 'golf', golfLang: 0.32, wenkbrauw: '#5A2A16', wimpers: true, lippen: '#B05A50',
            top: 'overhemd', topKleur: '#C8775A', topAccent: '#AE634A', broek: '#2E3A55', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['oorbel'], lengte: 0.98,
            garderobe: { gewoon: {}, jas: { top: 'jas', topKleur: '#4A5A6E', topAccent: '#3C4A5C', sjaal: '#C8775A' } } }, // roodbruin haar tot net op de schouders, terracotta blouse
  milan:  { naam: 'Milan', leeftijd: 36, rol: 'figurant · vader van een meisje van 4 (Bio-informatica 2, uitslaggesprek) · los van alle families', huid: '#93654A', haar: '#1C1410', kapsel: 'kort', wenkbrauw: '#16100C', stoppels: true,
            top: 'trui', topKleur: '#3E5A86', topAccent: '#32496E', broek: '#4A4E5E', schoen: '#2A2F3E', schoenAccent: '#1E2230', accessoire: ['bril-dun'], lengte: 1.03,
            garderobe: { gewoon: {}, jas: { top: 'jas', topKleur: '#3A3F4E', topAccent: '#2C303C', sjaal: '#3E5A86' } } }, // kort zwart haar, stoppels, dun brilletje, blauwe trui
  // ===== Figuranten in Bio-informatica 3 (25 okt 2026; bedacht uitbraakvoorbeeld; ter keuring; los van alle families) =====
  sanne:  { naam: 'Sanne', leeftijd: 34, rol: 'figurant · verpleegkundige op dezelfde afdeling als Jesse (Bio-informatica 3, bedacht uitbraakvoorbeeld) · los van alle families', huid: '#B98060', haar: '#2A1C16', kapsel: 'staart', elastiek: '#5B8CC9', wenkbrauw: '#22160F', wimpers: true, lippen: '#A9584E',
            top: 'overhemd', topKleur: '#8DB3D3', topAccent: '#769EC0', broek: '#8DB3D3', schoen: '#F2F2EE', schoenAccent: '#5B8CC9', accessoire: ['oorbel'], lengte: 0.98,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#9A5A6E', topAccent: '#824A5C', broek: '#33415C', schoen: '#3A3F4E', schoenAccent: '#2A2F3E' } } },
  bram:   { naam: 'Bram', leeftijd: 46, rol: 'figurant · zorgmedewerker in een ander ziekenhuis (Bio-informatica 3, bedacht uitbraakvoorbeeld) · los van alle families', huid: '#D9AE8A', haar: '#3A2A20', kapsel: 'kort', wenkbrauw: '#2E2018', stoppels: true,
            top: 'overhemd', topKleur: '#7FB09A', topAccent: '#6A9A85', broek: '#7FB09A', schoen: '#F2F2EE', schoenAccent: '#3E7C6A', accessoire: ['bril'], lengte: 1.02,
            garderobe: { werk: {}, gewoon: { top: 'trui', topKleur: '#5A6E8A', topAccent: '#4A5C74', broek: '#3E3A4E' } } },
  wilma:  { naam: 'Wilma', leeftijd: 63, rol: 'figurant · patiënt op de afdeling, zittend in gewone kleding (Bio-informatica 3, bedacht uitbraakvoorbeeld) · los van alle families', huid: '#E9C1A0', haar: '#A8A49C', kapsel: 'bob', wenkbrauw: '#8A847A', wimpers: true, lippen: '#B4605A',
            top: 'vest', topKleur: '#8A6A8E', topAccent: '#745878', binnen: '#EEE6DA', broek: '#3E4A5E', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril'], lengte: 0.95 },
  passant: { naam: 'Voorbijganger', leeftijd: 40, rol: 'figurant (naamloos, net als Erik en Joost zonder verhaal) · iemand uit de buurt, geen vaste rol (Bio-informatica 3)', huid: '#C99A78', haar: '#5A4232', kapsel: 'kort', wenkbrauw: '#4A3628',
            top: 'trui', topKleur: '#6E8A6A', topAccent: '#5A7458', broek: '#3E4658', schoen: '#4A4A52', schoenAccent: '#34343A', accessoire: [], lengte: 1.0 }
};
// families en vaste verbanden (getekend op de castboekpagina 'Families'); ouders: [vader, moeder]
const CAST_FAMILIE = {
  noor:   { ouders: ['rachid', 'linda'], broerzus: ['kind'] },
  kind:   { ouders: ['rachid', 'linda'] },
  linda:  { ouders: ['henk', 'ria'], partner: 'rachid', broerzus: ['petra'] },
  petra:  { ouders: ['henk', 'ria'] },
  rachid: { ouders: ['ahmed', 'malika'] },
  henk:   { partner: 'ria' }, ahmed: { partner: 'malika' },
  yasmin: { broerzus: ['bilal'] }, daan: { tweeling: 'thijs' },
  dennis: { ouders: ['opawit', 'omawit'], partner: 'marieke' }, marieke: { ouders: ['opabos', 'omabos'] },
  sara: { ouders: ['dennis', 'marieke'], broerzus: ['levi', 'jens'] }, levi: { ouders: ['dennis', 'marieke'] }, jens: { ouders: ['dennis', 'marieke'] },
  anouk: { partner: 'milan' }
};
const CAST_EXTRA = ['linda', 'rachid', 'ria', 'ahmed', 'malika', 'petra', 'thijs', 'erik', 'joost', 'buurvrouw'];
const CAST_VOLGORDE = ['noor', 'sam', 'lotte', 'daan', 'yasmin', 'bilal', 'kim', 'henk', 'visser', 'ravi', 'jesse', 'femke', 'mirjam', 'esra', 'mila', 'gerrit', 'wouter', 'ilse', 'lieke', 'merel'];
const CAST_JONG = ['kind', 'fleur', 'ruben', 'baby']; // 22 okt 2026: Fleur en Ruben (± 10 jaar)
const CAST_OUDERS_BI = ['anouk', 'milan']; // 25 okt 2026: ouders in het uitslaggesprek van Bio-informatica 2 (figuranten, ter keuring)
const CAST_FIGURANTEN_BI3 = ['sanne', 'bram', 'wilma', 'passant']; // 25 okt 2026: Bio-informatica 3, bedacht uitbraakvoorbeeld (ter keuring)
const CAST_GEZIN_WIT = ['opawit', 'omawit', 'opabos', 'omabos', 'dennis', 'marieke', 'sara', 'levi', 'jens']; // 25 okt 2026, ter keuring
// // jonge personages (20 okt 2026): Teun (± 6 jaar) en een baby

function _mix(hex, k, naar = '#000000') { const a = parseInt(hex.slice(1), 16), b = parseInt(naar.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return `rgb(${c(16)},${c(8)},${c(0)})`; }
const _donker = (h, k) => _mix(h, k, '#000000'), _licht = (h, k) => _mix(h, k, '#FFFFFF');

const POSES = {
  staan:      { R: [0.14, 0.06], L: [0.14, 0.06] },
  zwaai:      { R: [2.5, 2.9], L: [0.14, 0.06] },
  wijs:       { R: [1.45, 1.55], L: [0.14, 0.06] },
  wijsOmhoog: { R: [2.3, 2.7], L: [0.14, 0.06] },
  denk:       { R: [0.3, -2.75], L: [0.35, -1.45] },
  schouders:  { R: [0.75, 2.2], L: [0.75, 2.2] },
  handenHeup: { R: [0.75, -0.55], L: [0.75, -0.55] },
  vasthouden: { R: [0.55, 1.55], L: [0.14, 0.06] },
  handdruk:   { R: [0.6, 1.5], L: [0.14, 0.06] },
  zit:        { R: [0.14, 0.06], L: [0.14, 0.06] } // zit (25 okt 2026): armen via IK naar schoot, tafel of de hand van de partner
};
// handdruk (25 okt 2026): twee-botten-IK, hoeken vanaf 'recht omlaag' naar +x, elleboog onder de lijn schouder→hand
function _ik(dx, dy, L1, L2) { let d = Math.hypot(dx, dy); d = Math.min(Math.max(d, Math.abs(L1 - L2) + 1), (L1 + L2) * 0.995);
  const phi = Math.atan2(dx, dy), al = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)))), a1 = phi - al;
  const ex = Math.sin(a1) * L1, ey = Math.cos(a1) * L1; return [a1, Math.atan2(dx - ex, dy - ey)]; }
// zit (25 okt 2026): twee-botten-IK met de elleboog naar buiten (+x) en omlaag, hoeken vanaf 'recht omlaag' naar +x
function _ikUit(dx, dy, L1, L2) { let d = Math.hypot(dx, dy); d = Math.min(Math.max(d, Math.abs(L1 - L2) + 1), (L1 + L2) * 0.995); const k = d / Math.hypot(dx, dy || 1e-6) || 1; dx *= k; dy *= k;
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), hgt = Math.sqrt(Math.max(0, L1 * L1 - a * a)), mx = dx * a / d, my = dy * a / d, px = -dy / d, py = dx / d;
  let ex = mx + px * hgt, ey = my + py * hgt; const ex2 = mx - px * hgt, ey2 = my - py * hgt; if (ex2 > ex) { ex = ex2; ey = ey2; }
  return [Math.atan2(ex, ey), Math.atan2(dx - ex, dy - ey)]; }
// stoel (vooraanzicht): rugleuning achter de romp, zitting en poten; kleur = o.stoel (true = standaard)
function _stoelVoor(ctx, cx, heupY, voetY, hh, sw, hw2, kleur) { const k = typeof kleur === 'string' ? kleur : '#5A6A84', rand = _licht(k, 0.35), lw = Math.max(1.5, hh * 0.05);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = rand; ctx.lineWidth = hh * 0.1; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + s * hw2 * 0.62, heupY + hh * 0.3); ctx.lineTo(cx + s * hw2 * 0.66, voetY - hh * 0.03); ctx.stroke(); }
  roundRect(ctx, cx - sw * 0.5, heupY - hh * 1.95, sw, hh * 1.75, hh * 0.22); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = lw; ctx.stroke();
  roundRect(ctx, cx - hw2 * 0.72, heupY + hh * 0.16, hw2 * 1.44, hh * 0.2, hh * 0.08); ctx.fillStyle = _donker(k, 0.1); ctx.fill(); ctx.stroke(); ctx.restore(); }
const _schudY = (s) => { s = Math.max(0, Math.min(1, s || 0)); return Math.sin(s * 6 * Math.PI) * Math.sin(s * Math.PI); }; // 0..1 → drie keer op en neer, rustig in en uit
// hand in handdrukgreep: handpalm, vingers naar voren, duim omhoog; v = 'omhoog' loodrecht op de onderarm
function _grip(ctx, hx, hy, ang, hh, kleur, rand) { const ux = Math.cos(ang), uy = Math.sin(ang); let vx = Math.sin(ang), vy = -Math.cos(ang); if (vy > 0) { vx = -vx; vy = -vy; }
  const P = (a, b) => [hx + ux * hh * a + vx * hh * b, hy + uy * hh * a + vy * hh * b];
  const vorm = () => { const [px, py] = P(0.1, 0), [fx, fy] = P(0.3, -0.03); ctx.beginPath(); ctx.ellipse(px, py, hh * 0.2, hh * 0.16, ang, 0, 6.283); ctx.moveTo(fx + hh * 0.15, fy); ctx.ellipse(fx, fy, hh * 0.15, hh * 0.12, ang, 0, 6.283); };
  const duim = () => { const [a, b] = P(0.06, 0.1), [c, d] = P(0.24, 0.2); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); };
  if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = hh * 0.07; vorm(); ctx.stroke(); ctx.lineWidth = hh * 0.1 + hh * 0.07; duim(); ctx.stroke(); }
  ctx.fillStyle = kleur; vorm(); ctx.fill(); ctx.strokeStyle = kleur; ctx.lineCap = 'round'; ctx.lineWidth = hh * 0.1; duim(); ctx.stroke();
  ctx.strokeStyle = _donker(kleur, 0.22); ctx.lineWidth = Math.max(1, hh * 0.025); const [k1, k2] = P(0.2, 0.09), [k3, k4] = P(0.22, -0.12); ctx.beginPath(); ctx.moveTo(k1, k2); ctx.lineTo(k3, k4); ctx.stroke();
  const [cx, cy] = P(0.18, 0); return { x: cx, y: cy, ang, grip: true, hh, kleur }; }
// vingertoppen van de onderste hand over de rug van de bovenste hand (zodat de handen in elkaar grijpen)
function _gripVingers(ctx, H) { if (!H || !H.grip) return; const hh = H.hh, ux = Math.cos(H.ang), uy = Math.sin(H.ang); let vx = Math.sin(H.ang), vy = -Math.cos(H.ang); if (vy > 0) { vx = -vx; vy = -vy; }
  const fx = H.x + ux * hh * 0.2 - vx * hh * 0.02, fy = H.y + uy * hh * 0.2 - vy * hh * 0.02;
  ctx.fillStyle = H.kleur; ctx.beginPath(); ctx.ellipse(fx, fy, hh * 0.11, hh * 0.1, H.ang, 0, 6.283); ctx.fill();
  ctx.strokeStyle = _donker(H.kleur, 0.22); ctx.lineWidth = Math.max(1, hh * 0.022); ctx.beginPath(); ctx.ellipse(fx, fy, hh * 0.11, hh * 0.1, H.ang, -1.9, -0.3); ctx.stroke(); }
// maten van een personage (zelfde formules als persoon/_zij)
function _castMaat(id, h, outfit) { const P0 = CAST[id] || {}; const P = Object.assign({}, P0, (P0.garderobe && outfit && P0.garderobe[outfit]) || {}); const H = h * (P.lengte || 1), hh = H / (P.kop || 6.1);
  return { H, hh, sw: hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8)), d: hh * (P.schouderK ? P.schouderK * 0.68 : 1.25), armL: hh * 2.52 * (P.armK || 1), krom: P.krom ? hh * 0.15 : 0 }; }
// twee personages geven elkaar de hand: idL staat links (kijk 1), idR rechts (kijk -1); xm = midden tussen beiden, voet = grondlijn
function handdruk(ctx, idL, idR, xm, voet, h, o = {}) {
  const zij = !!o.zij, mL = _castMaat(idL, h, o.outfitL), mR = _castMaat(idR, h, o.outfitR);
  const schY = (m) => voet - m.H + m.hh * (1.42 + (zij ? 0.28 : 0.25)); // schouderpunt van de arm
  const yG = (schY(mL) + schY(mR)) / 2 + (mL.hh + mR.hh) / 2 * 1.45 + _schudY(o.schud) * (mL.hh + mR.hh) / 2 * 0.3; // grijppunt: iets boven de heup
  const reik = (m) => (zij ? m.d * 0.04 : m.sw * 0.4) + m.armL * 0.68; // schouder → grijppunt horizontaal
  const g = (mL.hh + mR.hh) / 2 * 0.07, xL = xm - reik(mL) - g + (zij ? 0 : -mL.krom), xR = xm + reik(mR) + g + (zij ? 0 : mR.krom);
  const base = { t: o.t, zij, pose: 'handdruk' };
  const rL = persoon(ctx, idL, xL, voet, h, Object.assign({}, base, { kijk: 1, outfit: o.outfitL, uit: o.uitL || 'blij', a: o.aL == null ? 1 : o.aL, hand: { x: xm - g, y: yG } }));
  const rR = persoon(ctx, idR, xR, voet, h, Object.assign({}, base, { kijk: -1, outfit: o.outfitR, uit: o.uitR || 'blij', a: o.aR == null ? 1 : o.aR, hand: { x: xm + g, y: yG } }));
  if ((o.aL == null ? 1 : o.aL) > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(o.aL == null ? 1 : o.aL, o.aR == null ? 1 : o.aR); _gripVingers(ctx, rL.handR); ctx.restore(); }
  return { xL, xR, yHand: yG, rL, rR }; }

function persoon(ctx, id, x, y, h, o = {}) {
  const P0 = CAST[id]; if (!P0) return {}; const P = Object.assign({}, P0, (P0.garderobe && o.outfit && P0.garderobe[o.outfit]) || {}); const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const t = o.t || 0, uit = o.uit || 'neutraal', pose = POSES[o.pose || 'staan'] || POSES.staan, kijk = o.kijk || 1;
  h *= P.lengte || 1; if (P.baby) return _baby(ctx, P, x, y, h, a, uit, o);
  if (P.accessoire && P.accessoire.includes('capuchon')) { P.kapsel = 'capuchon'; P.zijpony = false; } // capuchon (25 okt 2026): haar helemaal onder de kap
  if (o.zij) return _zij(ctx, P, x, y, h, a, o); // zijaanzicht (21 okt 2026)
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const zit = o.pose === 'zit', hh = h / (P.kop || 6.1), zitH = o.zitHoogte || hh * 1.45, top = zit ? y - zitH - hh * 3.45 : y - h, cx = x + (P.krom ? hh * 0.15 : 0); // zit: bovenlijf zakt, heup op zithoogte
  const hoofdY = top + hh * 0.55, schouderY = top + hh * 1.42, tailleY = top + hh * 3.0, heupY = top + hh * 3.45, voetY = y;
  const sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8)), hw2 = hh * (P.heupK || 1.45); const huidS = _donker(P.huid, 0.12);
  const ink = _donker(P.huid, 0.68);
  if (zit && o.stoel) _stoelVoor(ctx, cx, heupY, voetY, hh, sw, hw2, o.stoel);
  { const fw0 = hh * 0.86, hy0 = hoofdY; if (P.kapsel === 'golf') { ctx.fillStyle = P.haar; const onder = schouderY + hh * (P.golfLang ?? 1.05), N = 18;
      ctx.beginPath(); ctx.moveTo(cx - fw0 * 0.6, hy0 - hh * 0.2);
      for (let k = 0; k <= N; k++) { const u = k / N, yy = hy0 - hh * 0.2 + (onder - hy0 + hh * 0.2) * u, bw = fw0 * (0.64 + 0.32 * Math.sin(Math.min(1, u * 1.4) * 1.57)) + Math.sin(u * 12) * hh * 0.07; ctx.lineTo(cx - bw, yy); }
      for (let k = 0; k <= 6; k++) { const u = k / 6; ctx.lineTo(cx - fw0 * 0.9 + fw0 * 1.8 * u, onder + Math.sin(u * 9.4) * hh * 0.08); }
      for (let k = N; k >= 0; k--) { const u = k / N, yy = hy0 - hh * 0.2 + (onder - hy0 + hh * 0.2) * u, bw = fw0 * (0.64 + 0.32 * Math.sin(Math.min(1, u * 1.4) * 1.57)) + Math.sin(u * 12 + 1) * hh * 0.07; ctx.lineTo(cx + bw, yy); }
      ctx.closePath(); ctx.fill(); }
    if (P.kapsel === 'staart') { ctx.fillStyle = P.haar; const bx = cx + fw0 * 0.42, by = hy0 - hh * 0.3;
      ctx.beginPath(); ctx.moveTo(bx - hh * 0.1, by); ctx.bezierCurveTo(bx + hh * 0.55, by + hh * 0.1, bx + hh * 0.5, by + hh * 0.9, bx + hh * 0.18, schouderY + hh * 0.55);
      ctx.bezierCurveTo(bx + hh * 0.3, by + hh * 0.85, bx + hh * 0.15, by + hh * 0.35, bx - hh * 0.1, by + hh * 0.18); ctx.closePath(); ctx.fill();
      ctx.fillStyle = _donker(P.haar, 0.15); ctx.beginPath(); ctx.moveTo(bx + hh * 0.25, by + hh * 0.3); ctx.bezierCurveTo(bx + hh * 0.4, by + hh * 0.7, bx + hh * 0.3, schouderY, bx + hh * 0.18, schouderY + hh * 0.5); ctx.bezierCurveTo(bx + hh * 0.28, schouderY, bx + hh * 0.3, by + hh * 0.7, bx + hh * 0.25, by + hh * 0.3); ctx.fill(); } }
  // --- benen + schoenen
  if (zit) for (const s of [-1, 1]) { // zittend (vooraanzicht): dijen naar de kijker toe (verkort), knieën iets uit elkaar, onderbenen recht omlaag
    const lx = cx + s * hw2 * 0.25, kx = cx + s * hw2 * 0.3, ky = heupY + hh * 0.26, br = s < 0 ? P.broek : _donker(P.broek, 0.12);
    ctx.strokeStyle = _donker(P.broek, 0.2); ctx.lineWidth = hh * 0.56; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + s * hh * 0.02, voetY - hh * 0.32); ctx.stroke(); // onderbeen (in de schaduw onder het tafelblad/de dij)
    if (P.kort) { ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.4; ctx.beginPath(); ctx.moveTo(kx, ky + hh * 0.2); ctx.lineTo(kx + s * hh * 0.02, voetY - hh * 0.3); ctx.stroke(); }
    ctx.strokeStyle = br; ctx.lineWidth = hh * 0.66; ctx.beginPath(); ctx.moveTo(lx, heupY + hh * 0.05); ctx.lineTo(kx, ky); ctx.stroke(); // dij, van boven gezien
    ctx.fillStyle = s < 0 ? _licht(P.broek, 0.08) : _donker(P.broek, 0.05); ctx.beginPath(); ctx.ellipse(kx, ky + hh * 0.04, hh * 0.31, hh * 0.22, 0, 0, 6.283); ctx.fill(); // knie
    const sx = kx + s * hh * 0.06 + hh * 0.04; ctx.fillStyle = P.schoen; ctx.beginPath(); ctx.ellipse(sx, voetY - hh * 0.15, hh * 0.4, hh * 0.18, 0, Math.PI, 0); ctx.lineTo(sx + hh * 0.4, voetY - hh * 0.04); ctx.lineTo(sx - hh * 0.4, voetY - hh * 0.04); ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.schoenAccent; ctx.fillRect(sx - hh * 0.4, voetY - hh * 0.07, hh * 0.8, hh * 0.05);
  }
  else for (const s of [-1, 1]) {
    const lx = cx + s * hw2 * 0.24;
    ctx.strokeStyle = s < 0 ? P.broek : _donker(P.broek, 0.12); ctx.lineWidth = hh * 0.6;
    const kn = heupY + (voetY - heupY) * 0.42; ctx.beginPath(); ctx.moveTo(lx, heupY); ctx.lineTo(lx + s * hh * (P.kort ? 0.02 : 0.05), P.kort ? kn : voetY - hh * 0.32); ctx.stroke();
    if (P.kort) { ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.4; ctx.beginPath(); ctx.moveTo(lx + s * hh * 0.02, kn + hh * 0.05); ctx.lineTo(lx + s * hh * 0.05, voetY - hh * 0.3); ctx.stroke(); ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = hh * 0.36; ctx.beginPath(); ctx.moveTo(lx + s * hh * 0.045, voetY - hh * 0.42); ctx.lineTo(lx + s * hh * 0.05, voetY - hh * 0.3); ctx.stroke(); }
    const sx = lx + s * hh * 0.08 + hh * 0.06; ctx.fillStyle = P.schoen; ctx.beginPath(); ctx.ellipse(sx, voetY - hh * 0.15, hh * 0.42, hh * 0.18, 0, Math.PI, 0); ctx.lineTo(sx + hh * 0.42, voetY - hh * 0.04); ctx.lineTo(sx - hh * 0.42, voetY - hh * 0.04); ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.schoenAccent; ctx.fillRect(sx - hh * 0.42, voetY - hh * 0.07, hh * 0.84, hh * 0.05);
  }
  // --- romp (vorm per kledingstuk)
  const romp = (breed) => { ctx.beginPath(); ctx.moveTo(cx, schouderY - hh * 0.1);
    ctx.bezierCurveTo(cx + breed * 0.46, schouderY - hh * 0.12, cx + breed * 0.56, schouderY + hh * 0.12, cx + breed * 0.5, schouderY + hh * 0.62);
    ctx.bezierCurveTo(cx + breed * 0.45, tailleY - hh * 0.3, cx + hw2 * 0.52, heupY - hh * 0.2, cx + hw2 * 0.54, heupY + hh * 0.22);
    ctx.quadraticCurveTo(cx, heupY + hh * 0.36, cx - hw2 * 0.54, heupY + hh * 0.22);
    ctx.bezierCurveTo(cx - hw2 * 0.52, heupY - hh * 0.2, cx - breed * 0.45, tailleY - hh * 0.3, cx - breed * 0.5, schouderY + hh * 0.62);
    ctx.bezierCurveTo(cx - breed * 0.56, schouderY + hh * 0.12, cx - breed * 0.46, schouderY - hh * 0.12, cx, schouderY - hh * 0.1); ctx.closePath(); };
  const schaduwRomp = (kleur) => { ctx.save(); ctx.clip(); ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(cx + sw * 0.66, tailleY, sw * 0.36, hh * 2.6, 0, 0, 6.283); ctx.fill(); ctx.restore(); };
  if (P.top === 'labjas') { // lange jas tot over de heup
    ctx.fillStyle = P.binnen; romp(sw); ctx.fill();
    ctx.fillStyle = P.topKleur; ctx.beginPath(); ctx.moveTo(cx - sw * 0.5, schouderY + hh * 0.05); ctx.quadraticCurveTo(cx - sw * 0.56, schouderY + hh * 0.5, cx - sw * 0.52, heupY + hh * 0.75);
    ctx.lineTo(cx - hh * 0.12, heupY + hh * 0.75); ctx.lineTo(cx - hh * 0.2, schouderY + hh * 0.2); ctx.lineTo(cx - hh * 0.05, schouderY - hh * 0.1); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + sw * 0.5, schouderY + hh * 0.05); ctx.quadraticCurveTo(cx + sw * 0.56, schouderY + hh * 0.5, cx + sw * 0.52, heupY + hh * 0.75);
    ctx.lineTo(cx + hh * 0.12, heupY + hh * 0.75); ctx.lineTo(cx + hh * 0.2, schouderY + hh * 0.2); ctx.lineTo(cx + hh * 0.05, schouderY - hh * 0.1); ctx.closePath(); ctx.fillStyle = P.topAccent; ctx.fill();
    ctx.fillStyle = _donker(P.topKleur, 0.08); ctx.fillRect(cx + sw * 0.22, tailleY + hh * 0.1, hh * 0.38, hh * 0.05); ctx.fillRect(cx - sw * 0.22 - hh * 0.38, tailleY + hh * 0.1, hh * 0.38, hh * 0.05);
  } else {
    ctx.fillStyle = P.topKleur; romp(sw); ctx.fill(); romp(sw); schaduwRomp(P.topAccent);
    if (P.top === 'hoodie') { ctx.fillStyle = P.topAccent; roundRect(ctx, cx - hh * 0.55, tailleY - hh * 0.05, hh * 1.1, hh * 0.5, hh * 0.18); ctx.fill();
      ctx.strokeStyle = _licht(P.topKleur, 0.5); ctx.lineWidth = hh * 0.035; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + s * hh * 0.14, schouderY + hh * 0.05); ctx.lineTo(cx + s * hh * 0.17, schouderY + hh * 0.55); ctx.stroke(); } }
    if (P.top === 'overall') { ctx.strokeStyle = P.topAccent; ctx.lineWidth = Math.max(1, hh * 0.035); ctx.beginPath(); ctx.moveTo(cx, schouderY + hh * 0.05); ctx.lineTo(cx, heupY + hh * 0.3); ctx.stroke(); // rits
      ctx.lineWidth = Math.max(1, hh * 0.05); ctx.beginPath(); ctx.moveTo(cx - hw2 * 0.5, tailleY + hh * 0.05); ctx.quadraticCurveTo(cx, tailleY + hh * 0.13, cx + hw2 * 0.5, tailleY + hh * 0.05); ctx.stroke(); } // elastiek in de taille
    if (P.top === 'trui' && !P.strepen) { ctx.fillStyle = P.topAccent; for (let i = 0; i < 2; i++) ctx.fillRect(cx - sw * 0.5, tailleY - hh * (0.55 - i * 0.22), sw, hh * 0.07); }
    if (P.strepen) { romp(sw); ctx.save(); ctx.clip(); ctx.fillStyle = P.strepen; for (let yy = schouderY + hh * 0.45; yy < heupY + hh * 0.3; yy += hh * 0.36) ctx.fillRect(cx - sw, yy, sw * 2, hh * 0.15); ctx.fillStyle = rgba('#000000', 0.12); ctx.beginPath(); ctx.ellipse(cx + sw * 0.66, tailleY, sw * 0.36, hh * 2.6, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
    if (P.top === 'overhemd') { ctx.strokeStyle = P.topAccent; ctx.lineWidth = hh * 0.035; ctx.beginPath(); ctx.moveTo(cx, schouderY + hh * 0.1); ctx.lineTo(cx, heupY + hh * 0.2); ctx.stroke();
      ctx.fillStyle = _licht(P.topKleur, 0.6); for (let i = 0; i < 4; i++) circ(ctx, cx + hh * 0.06, schouderY + hh * (0.45 + i * 0.45), hh * 0.035, _licht(P.topKleur, 0.6));
      ctx.fillStyle = _licht(P.topKleur, 0.15); for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx, schouderY + hh * 0.05); ctx.lineTo(cx + s * hh * 0.32, schouderY - hh * 0.05); ctx.lineTo(cx + s * hh * 0.18, schouderY + hh * 0.3); ctx.closePath(); ctx.fill(); } }
    if (P.top === 'jasje') { ctx.fillStyle = P.binnen; ctx.beginPath(); ctx.moveTo(cx - hh * 0.28, schouderY); ctx.lineTo(cx + hh * 0.28, schouderY); ctx.lineTo(cx, tailleY - hh * 0.2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = P.topAccent; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + s * hh * 0.28, schouderY); ctx.lineTo(cx + s * hh * 0.42, schouderY + hh * 0.5); ctx.lineTo(cx, tailleY - hh * 0.2); ctx.closePath(); ctx.fill(); } }
    if (P.top === 'jas') { ctx.strokeStyle = _donker(P.topKleur, 0.3); ctx.lineWidth = hh * 0.04; ctx.beginPath(); ctx.moveTo(cx, schouderY + hh * 0.1); ctx.lineTo(cx, heupY + hh * 0.3); ctx.stroke();
      ctx.fillStyle = P.topAccent; for (const s of [-1, 1]) roundRect(ctx, cx + s * sw * 0.18 - hh * 0.2, tailleY, hh * 0.4, hh * 0.32, hh * 0.06), ctx.fill(); }
    if (P.top === 'vest') { ctx.fillStyle = P.binnen; ctx.beginPath(); ctx.moveTo(cx - hh * 0.3, schouderY); ctx.lineTo(cx + hh * 0.3, schouderY); ctx.lineTo(cx + hh * 0.08, heupY + hh * 0.3); ctx.lineTo(cx - hh * 0.08, heupY + hh * 0.3); ctx.closePath(); ctx.fill();
      for (let i = 0; i < 4; i++) circ(ctx, cx + hh * 0.17, schouderY + hh * (0.7 + i * 0.42), hh * 0.05, _donker(P.topKleur, 0.3)); }
  }
  // --- zwangerschapsbuik (o.zwanger of P.zwanger, 0..1): ronde buik laag op de romp, licht naar de kijkrichting
  { const zw = o.zwanger != null ? o.zwanger : (P.zwanger || 0); if (zw > 0.02 && !P.baby) {
    const open = P.top === 'labjas' || P.top === 'vest' || P.top === 'jasje', kl = open ? (P.binnen || P.topKleur) : P.topKleur;
    const rx = hh * (0.5 + 0.48 * zw), ry = hh * (0.5 + 0.5 * zw), bx = cx + kijk * hh * 0.12 * zw, by = heupY - hh * 0.5 + ry * 0.3;
    ctx.fillStyle = kl; ctx.beginPath(); ctx.ellipse(bx, by, rx, ry, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = _donker(kl, 0.16); ctx.lineWidth = hh * 0.07; ctx.beginPath(); ctx.ellipse(bx, by, rx * 0.98, ry * 0.98, 0, 0.35, 2.8); ctx.stroke();
    ctx.fillStyle = rgba('#FFFFFF', 0.13); ctx.beginPath(); ctx.ellipse(bx + kijk * rx * 0.3, by - ry * 0.45, rx * 0.3, ry * 0.17, -0.5 * kijk, 0, 6.283); ctx.fill();
    if (open) { ctx.fillStyle = P.topKleur; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx + s2 * sw * 0.5, schouderY + hh * 0.6); ctx.quadraticCurveTo(cx + s2 * Math.max(sw * 0.45, rx * 1.02), by, cx + s2 * Math.max(hw2 * 0.55, rx * 0.95), heupY + hh * 0.35); ctx.lineTo(cx + s2 * Math.max(hw2 * 0.55, rx * 0.95) + s2 * hh * 0.18, heupY + hh * 0.35); ctx.lineTo(cx + s2 * sw * 0.56, schouderY + hh * 0.6); ctx.closePath(); ctx.fill(); } }
  } }
  // --- armen
  const arm = (s, cfg) => { const [a1, a2] = cfg; const L1 = hh * 1.32 * (P.armK || 1) * (cfg[2] || 1), L2 = hh * 1.2 * (P.armK || 1) * (cfg[3] || 1), sx = cx + s * sw * 0.4, sy = schouderY + hh * 0.25;
    const ex = sx + s * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1, hx = ex + s * Math.sin(a2) * L2, hy = ey + Math.cos(a2) * L2;
    const mouw = P.top === 'labjas' ? (s < 0 ? P.topKleur : P.topAccent) : (s < 0 ? P.topKleur : P.topAccent);
    const handK = P.accessoire.includes('handschoenen') ? _NITRIL : P.huid; // nitrilhandschoenen (25 okt 2026)
    ctx.strokeStyle = handK; ctx.lineWidth = hh * 0.27; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    const kort = P.top === 'hoodie' || P.top === 'trui' || P.top === 'vest' || P.top === 'labjas' || P.top === 'jasje' || P.top === 'overhemd' || P.top === 'jas' || P.top === 'overall';
    if (P.top === 'tshirt') { ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.29; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = mouw; ctx.lineWidth = hh * 0.46; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + (ex - sx) * 0.45, sy + (ey - sy) * 0.45); ctx.stroke(); }
    if (P.top !== 'tshirt') { ctx.strokeStyle = mouw; ctx.lineWidth = hh * 0.42; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); } if (kort) ctx.lineTo(ex + (hx - ex) * 0.72, ey + (hy - ey) * 0.72); if (P.top !== 'tshirt') ctx.stroke();
    if (kort) { ctx.strokeStyle = _donker(mouw, 0.12); ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(ex + (hx - ex) * 0.66, ey + (hy - ey) * 0.66); ctx.lineTo(ex + (hx - ex) * 0.74, ey + (hy - ey) * 0.74); ctx.stroke(); }
    if (o.pose === 'handdruk' && s === kijk) return _grip(ctx, hx, hy, Math.atan2(hy - ey, hx - ex), hh, handK, null);
    const ang = Math.atan2(hy - ey, hx - ex); ctx.fillStyle = handK; ctx.beginPath(); ctx.ellipse(hx + Math.cos(ang) * hh * 0.08, hy + Math.sin(ang) * hh * 0.08, hh * 0.19, hh * 0.15, ang, 0, 6.283); ctx.fill();
    if (!zit && (Math.abs(a2 - a1) > 1.2 || a2 > 1.3)) { ctx.strokeStyle = handK; ctx.lineWidth = hh * 0.08; ctx.beginPath(); ctx.moveTo(hx + Math.cos(ang) * hh * 0.18, hy + Math.sin(ang) * hh * 0.18); ctx.lineTo(hx + Math.cos(ang) * hh * 0.36, hy + Math.sin(ang) * hh * 0.36); ctx.stroke(); }
    return { x: hx + Math.cos(ang) * hh * 0.12, y: hy + Math.sin(ang) * hh * 0.12, ang }; };
  let R = pose.R.slice(), L = pose.L.slice();
  if (o.pose === 'zwaai') R[1] += 0.25 * Math.sin(t * 7);
  if (o.pose === 'handdruk') { const L1 = hh * 1.32 * (P.armK || 1), L2 = hh * 1.2 * (P.armK || 1), sx = cx + kijk * sw * 0.4, sy = schouderY + hh * 0.25;
    const tx = o.hand ? o.hand.x : sx + kijk * (L1 + L2) * 0.68, ty = (o.hand ? o.hand.y : sy + hh * 1.2 + _schudY(o.schud) * hh * 0.3);
    R = _ik(kijk * (tx - sx) - hh * 0.18, ty - sy, L1, L2); } // pols iets vóór het grijppunt (handpalm)
  if (zit) { // zit: elk van beide armen naar zijn doel (schoot, tafel, of de hand van de partner); bovenarm en onderarm wijzen deels naar de kijker → verkort
    const L1 = hh * 1.32 * (P.armK || 1), L2 = hh * 1.2 * (P.armK || 1), sy = schouderY + hh * 0.25;
    const doel = (s) => { const sx = cx + s * sw * 0.4; let tx, ty, k1 = 0.8, k2 = 0.5;
      if (o.handOpHand && Math.sign(o.handOpHand.x - cx) === s) { tx = o.handOpHand.x - s * hh * 0.12; ty = o.handOpHand.y - hh * 0.06; // bovenarm omlaag langs het lijf, elleboog op tafel(hoogte), onderarm ligt naar de partner
        const exE = sx + s * hh * 0.55, eyE = Math.min(ty + hh * 0.02, sy + L1 * 0.9), u1 = Math.hypot(exE - sx, eyE - sy), u2 = Math.hypot(tx - exE, ty - eyE);
        const b1 = Math.atan2(s * (exE - sx), eyE - sy), b2 = Math.atan2(s * (tx - exE), ty - eyE); return [b1, b2, u1 / L1, Math.max(0.3, u2 / L2)]; }
      else if (o.tafel != null) { tx = cx + s * sw * 0.2; ty = o.tafel - hh * 0.13; }
      else { tx = cx + s * hw2 * 0.22; ty = heupY + hh * 0.05; k2 = 0.62; }
      const [b1, b2] = _ikUit(s * (tx - sx) - hh * 0.12, ty - sy, L1 * k1, L2 * k2); return [b1, b2, k1, k2]; };
    R = doel(kijk); L = doel(-kijk); }
  // kijk -1 (25 okt 2026): arm(kijk, …) spiegelt al; de oude extra wissel [R, L] = [L, R] zette de wijs-/vasthoudarm terug naar rechts
  const handR = arm(kijk, R), handL = arm(-kijk, L);
  if (o.hold) o.hold(ctx, handR.x, handR.y, handR.ang);
  if (P.kapsel === 'golf') { for (const s of [-1, 1]) { const N = 14, y0 = hoofdY + hh * 0.05, y1 = schouderY + hh * (P.golfLang ?? 1.05); const xs = (u, off) => cx + s * (hh * (0.36 + 0.22 * u) + off + Math.sin(u * 9 + (s > 0 ? 0.6 : 0)) * hh * 0.07);
      ctx.fillStyle = P.haar; ctx.beginPath(); for (let k = 0; k <= N; k++) { const u = k / N; ctx.lineTo(xs(u, hh * 0.26 * (1 - u * 0.35)), y0 + (y1 - y0) * u); }
      for (let k = N; k >= 0; k--) { const u = k / N; ctx.lineTo(xs(u, -hh * 0.04), y0 + (y1 - y0) * u); } ctx.closePath(); ctx.fill();
      ctx.strokeStyle = _donker(P.haar, 0.3); ctx.lineWidth = hh * 0.025; ctx.beginPath(); for (let k = 2; k <= N - 1; k++) { const u = k / N; ctx.lineTo(xs(u, hh * 0.1), y0 + (y1 - y0) * u); } ctx.stroke(); } }
  if (P.kapsel === 'vlecht') { for (const s of [-1, 1]) { const x0 = cx + s * hh * 0.4, y0 = hoofdY + hh * 0.12, x1 = cx + s * hh * 0.52, y1 = schouderY + hh * 1.1;
      const pt = (u) => [x0 + (x1 - x0) * u + s * Math.sin(u * 2.6) * hh * 0.07, y0 + (y1 - y0) * u];
      ctx.strokeStyle = P.haar; ctx.lineCap = 'round'; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const u = k / 20, [bx, by] = pt(u); ctx.lineWidth = hh * (0.3 - u * 0.08); k ? ctx.lineTo(bx, by) : ctx.moveTo(bx, by); } ctx.lineWidth = hh * 0.27; ctx.stroke();
      const n = 10; for (let k = 0; k < n; k++) { const u = (k + 0.5) / n, [bx, by] = pt(u), w = hh * (0.15 - u * 0.04), zij = k % 2 ? -1 : 1;
        ctx.fillStyle = _donker(P.haar, 0.28); ctx.beginPath(); ctx.ellipse(bx + zij * w * 0.35, by, w * 0.75, w * 0.42, zij * 0.75, 0, 6.283); ctx.fill();
        ctx.fillStyle = _licht(P.haar, 0.08); ctx.beginPath(); ctx.ellipse(bx + zij * w * 0.42, by - w * 0.12, w * 0.45, w * 0.18, zij * 0.75, 0, 6.283); ctx.fill(); }
      ctx.fillStyle = P.elastiek; roundRect(ctx, x1 + s * hh * 0.0 - hh * 0.1, y1 + hh * 0.06, hh * 0.2, hh * 0.08, hh * 0.04); ctx.fill();
      ctx.fillStyle = P.haar; ctx.beginPath(); ctx.moveTo(x1 - hh * 0.09, y1 + hh * 0.14); ctx.quadraticCurveTo(x1 - hh * 0.04, y1 + hh * 0.36, x1 + hh * 0.02, y1 + hh * 0.4); ctx.quadraticCurveTo(x1 + hh * 0.06, y1 + hh * 0.3, x1 + hh * 0.09, y1 + hh * 0.14); ctx.closePath(); ctx.fill(); } }
  if (P.sjaal) { ctx.fillStyle = P.sjaal; roundRect(ctx, cx - hh * 0.5, schouderY - hh * 0.2, hh * 1.0, hh * 0.38, hh * 0.18); ctx.fill(); ctx.fillStyle = _donker(P.sjaal, 0.12); roundRect(ctx, cx + hh * 0.08, schouderY + hh * 0.05, hh * 0.3, hh * 1.0, hh * 0.08); ctx.fill(); for (let k = 0; k < 3; k++) ctx.fillRect(cx + hh * (0.1 + k * 0.1), schouderY + hh * 1.05, hh * 0.05, hh * 0.15); }
  // --- nek
  ctx.fillStyle = huidS; roundRect(ctx, cx - hh * 0.16, hoofdY + hh * 0.3, hh * 0.32, schouderY - hoofdY - hh * 0.22, hh * 0.1); ctx.fill();
  if (P.top === 'hoodie') { ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.ellipse(cx, schouderY - hh * 0.02, hh * 0.55, hh * 0.2, 0, 0, Math.PI); ctx.fill(); }
  if (P.accessoire.includes('stethoscoop')) { ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = hh * 0.05; ctx.beginPath(); ctx.moveTo(cx - hh * 0.3, schouderY - hh * 0.02); ctx.quadraticCurveTo(cx - hh * 0.32, schouderY + hh * 0.9, cx - hh * 0.08, schouderY + hh * 1.15); ctx.moveTo(cx + hh * 0.3, schouderY - hh * 0.02); ctx.quadraticCurveTo(cx + hh * 0.34, schouderY + hh * 0.7, cx + hh * 0.22, schouderY + hh * 0.95); ctx.stroke(); circ(ctx, cx + hh * 0.22, schouderY + hh * 1.0, hh * 0.09, '#9AA3B2'); }
  // --- hoofd
  const hy = hoofdY, fw = hh * 0.86, ax = kijk * hh * 0.03; // kleine draai in kijkrichting
  // haar achter
  ctx.fillStyle = P.haar;
  if (P.kapsel === 'krul') { for (let k = 0; k < 14; k++) { const an = Math.PI * (0.95 + k / 13 * 1.1); circ(ctx, cx + Math.cos(an) * fw * 0.6, hy - hh * 0.08 + Math.sin(an) * hh * 0.62, hh * 0.21, P.haar); } }
  if (P.kapsel === 'bob') { ctx.beginPath(); ctx.moveTo(cx - fw * 0.6, hy - hh * 0.2); ctx.quadraticCurveTo(cx - fw * 0.66, hy + hh * 0.42, cx - fw * 0.5, hy + hh * 0.46); ctx.lineTo(cx + fw * 0.5, hy + hh * 0.46); ctx.quadraticCurveTo(cx + fw * 0.66, hy + hh * 0.42, cx + fw * 0.6, hy - hh * 0.2); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'knot') { circ(ctx, cx + fw * 0.04, hy - hh * 0.64, hh * 0.28, P.haar); ctx.strokeStyle = _licht(P.haar, 0.14); ctx.lineWidth = Math.max(1, hh * 0.035); ctx.beginPath(); ctx.arc(cx + fw * 0.04, hy - hh * 0.66, hh * 0.15, 3.6, 5.9); ctx.stroke();
    ctx.fillStyle = P.haar; ctx.beginPath(); ctx.moveTo(cx - fw * 0.6, hy - hh * 0.1); ctx.quadraticCurveTo(cx - fw * 0.66, hy + hh * 0.35, cx - fw * 0.5, hy + hh * 0.4); ctx.lineTo(cx + fw * 0.5, hy + hh * 0.4); ctx.quadraticCurveTo(cx + fw * 0.66, hy + hh * 0.35, cx + fw * 0.6, hy - hh * 0.1); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'hoofddoek' && P.doekKlein) { ctx.fillStyle = P.doekKleur; // losse doek: achterhoofd tot kaaklijn, hals vrij, lus laag om de hals
    ctx.beginPath(); ctx.moveTo(cx - fw * 0.66, hy - hh * 0.1); ctx.bezierCurveTo(cx - fw * 0.72, hy + hh * 0.3, cx - fw * 0.6, hy + hh * 0.52, cx - fw * 0.2, hy + hh * 0.5); ctx.lineTo(cx + fw * 0.2, hy + hh * 0.5);
    ctx.bezierCurveTo(cx + fw * 0.6, hy + hh * 0.52, cx + fw * 0.72, hy + hh * 0.3, cx + fw * 0.66, hy - hh * 0.1); ctx.bezierCurveTo(cx + fw * 0.7, hy - hh * 0.9, cx - fw * 0.7, hy - hh * 0.9, cx - fw * 0.66, hy - hh * 0.1); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx - fw * 0.68, hy + hh * 0.2); ctx.quadraticCurveTo(cx - fw * 0.68, schouderY + hh * 0.04, cx - fw * 0.3, schouderY + hh * 0.16); ctx.quadraticCurveTo(cx, schouderY + hh * 0.24, cx + fw * 0.3, schouderY + hh * 0.16);
    ctx.quadraticCurveTo(cx + fw * 0.68, schouderY + hh * 0.04, cx + fw * 0.68, hy + hh * 0.2); ctx.lineTo(cx + fw * 0.4, hy + hh * 0.42); ctx.quadraticCurveTo(cx + fw * 0.36, schouderY - hh * 0.06, cx, schouderY + hh * 0.03);
    ctx.quadraticCurveTo(cx - fw * 0.36, schouderY - hh * 0.06, cx - fw * 0.4, hy + hh * 0.42); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = P.doekAccent; ctx.lineWidth = Math.max(1, hh * 0.03); ctx.beginPath(); ctx.moveTo(cx - fw * 0.5, schouderY + hh * 0.06); ctx.quadraticCurveTo(cx, schouderY + hh * 0.2, cx + fw * 0.5, schouderY + hh * 0.06); ctx.stroke();
    ctx.fillStyle = P.doekAccent; ctx.beginPath(); ctx.moveTo(cx + fw * 0.3, schouderY + hh * 0.0); ctx.quadraticCurveTo(cx + fw * 0.62, schouderY + hh * 0.05, cx + fw * 0.72, schouderY + hh * 0.42); ctx.lineTo(cx + fw * 0.5, schouderY + hh * 0.46); ctx.quadraticCurveTo(cx + fw * 0.46, schouderY + hh * 0.2, cx + fw * 0.2, schouderY + hh * 0.12); ctx.closePath(); ctx.fill(); }
  else if (P.kapsel === 'hoofddoek') { ctx.fillStyle = P.doekKleur; ctx.beginPath(); ctx.moveTo(cx - fw * 0.66, hy - hh * 0.05); ctx.bezierCurveTo(cx - fw * 0.74, hy + hh * 0.7, cx - sw * 0.42, schouderY + hh * 0.3, cx - sw * 0.3, schouderY + hh * 0.75);
    ctx.lineTo(cx + sw * 0.3, schouderY + hh * 0.75); ctx.bezierCurveTo(cx + sw * 0.42, schouderY + hh * 0.3, cx + fw * 0.74, hy + hh * 0.7, cx + fw * 0.66, hy - hh * 0.05); ctx.bezierCurveTo(cx + fw * 0.7, hy - hh * 0.85, cx - fw * 0.7, hy - hh * 0.85, cx - fw * 0.66, hy - hh * 0.05); ctx.fill();
    ctx.fillStyle = P.doekAccent; ctx.beginPath(); ctx.moveTo(cx + fw * 0.2, schouderY + hh * 0.05); ctx.quadraticCurveTo(cx + sw * 0.3, schouderY + hh * 0.3, cx + sw * 0.3, schouderY + hh * 0.75); ctx.lineTo(cx + sw * 0.12, schouderY + hh * 0.75); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'capuchon') { ctx.fillStyle = P.topKleur; ctx.beginPath(); ctx.moveTo(cx - hh * 0.62, schouderY + hh * 0.14); // kap: van de schouders om het hoofd heen
    ctx.bezierCurveTo(cx - fw * 0.74, hy + hh * 0.55, cx - fw * 0.8, hy - hh * 0.2, cx - fw * 0.62, hy - hh * 0.52); ctx.bezierCurveTo(cx - fw * 0.42, hy - hh * 0.82, cx + fw * 0.42, hy - hh * 0.82, cx + fw * 0.62, hy - hh * 0.52);
    ctx.bezierCurveTo(cx + fw * 0.8, hy - hh * 0.2, cx + fw * 0.74, hy + hh * 0.55, cx + hh * 0.62, schouderY + hh * 0.14); ctx.quadraticCurveTo(cx, schouderY + hh * 0.3, cx - hh * 0.62, schouderY + hh * 0.14); ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.ellipse(cx - kijk * fw * 0.6, hy, fw * 0.28, hh * 1.1, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  // oren
  if (P.kapsel !== 'hoofddoek' && P.kapsel !== 'capuchon') for (const s of [-1, 1]) { ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(cx + s * fw * 0.5, hy + hh * 0.05, hh * 0.1, hh * 0.13, 0, 0, 6.283); ctx.fill(); }
  if (P.accessoire.includes('oorbel')) circ(ctx, cx - fw * 0.5, hy + hh * 0.2, hh * 0.045, '#E0B64A');
  // gezicht: zacht ei met iets smallere kin
  ctx.fillStyle = P.huid; ctx.beginPath(); ctx.moveTo(cx + ax, hy - hh * 0.5);
  ctx.bezierCurveTo(cx + ax + fw * 0.3, hy - hh * 0.5, cx + ax + fw * 0.5, hy - hh * 0.3, cx + ax + fw * 0.5, hy);
  ctx.bezierCurveTo(cx + ax + fw * 0.5, hy + hh * 0.3, cx + ax + fw * 0.25, hy + hh * 0.5, cx + ax, hy + hh * 0.52);
  ctx.bezierCurveTo(cx + ax - fw * 0.25, hy + hh * 0.5, cx + ax - fw * 0.5, hy + hh * 0.3, cx + ax - fw * 0.5, hy);
  ctx.bezierCurveTo(cx + ax - fw * 0.5, hy - hh * 0.3, cx + ax - fw * 0.3, hy - hh * 0.5, cx + ax, hy - hh * 0.5); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = _donker(P.huid, 0.06); ctx.beginPath(); ctx.ellipse(cx + ax - kijk * fw * 0.58, hy, fw * 0.25, hh * 0.7, 0, 0, 6.283); ctx.fill(); ctx.restore();
  if (P.kapsel === 'capuchon') { ctx.fillStyle = P.topKleur; ctx.beginPath(); // rand van de kap: alleen het gezicht blijft vrij (evenodd)
    ctx.ellipse(cx, hy - hh * 0.05, fw * 0.7, hh * 0.78, 0, 0, 6.283); ctx.ellipse(cx + ax, hy + hh * 0.04, fw * 0.43, hh * 0.45, 0, 0, 6.283); ctx.fill('evenodd');
    ctx.strokeStyle = P.topAccent; ctx.lineWidth = Math.max(1.4, hh * 0.06); ctx.beginPath(); ctx.ellipse(cx + ax, hy + hh * 0.04, fw * 0.44, hh * 0.46, 0, 0, 6.283); ctx.stroke(); }
  // haar voor
  ctx.fillStyle = P.haar;
  const kap = (diep) => { ctx.beginPath(); ctx.moveTo(cx - fw * 0.53, hy + hh * 0.02); ctx.bezierCurveTo(cx - fw * 0.6, hy - hh * 0.7, cx + fw * 0.6, hy - hh * 0.74, cx + fw * 0.53, hy + hh * 0.02); ctx.bezierCurveTo(cx + fw * 0.46, hy - hh * diep, cx + fw * 0.15, hy - hh * (diep + 0.06), cx - fw * 0.05, hy - hh * (diep + 0.04)); ctx.bezierCurveTo(cx - fw * 0.3, hy - hh * diep, cx - fw * 0.46, hy - hh * (diep - 0.08), cx - fw * 0.53, hy + hh * 0.02); ctx.fill(); };
  if (P.kapsel === 'lang' || P.kapsel === 'vlecht' || P.kapsel === 'golf' || P.kapsel === 'staart' || P.kapsel === 'knot') { kap(0.22); if (!P.zijpony) { ctx.fillStyle = _donker(P.haar, 0.25); ctx.fillRect(cx + fw * 0.06, hy - hh * 0.5, hh * 0.035, hh * 0.22); } }
  if (P.zijpony) { ctx.fillStyle = P.haar; ctx.beginPath(); ctx.moveTo(cx - fw * 0.2, hy - hh * 0.62); ctx.bezierCurveTo(cx + fw * 0.25, hy - hh * 0.6, cx + fw * 0.5, hy - hh * 0.35, cx + fw * 0.56, hy + hh * 0.05); ctx.bezierCurveTo(cx + fw * 0.4, hy - hh * 0.2, cx + fw * 0.1, hy - hh * 0.3, cx - fw * 0.25, hy - hh * 0.3); ctx.bezierCurveTo(cx - fw * 0.4, hy - hh * 0.3, cx - fw * 0.5, hy - hh * 0.2, cx - fw * 0.53, hy - hh * 0.05); ctx.bezierCurveTo(cx - fw * 0.55, hy - hh * 0.4, cx - fw * 0.42, hy - hh * 0.6, cx - fw * 0.2, hy - hh * 0.62); ctx.fill(); ctx.strokeStyle = _licht(P.haar, 0.12); ctx.lineWidth = Math.max(1, hh * 0.025); ctx.beginPath(); ctx.moveTo(cx - fw * 0.05, hy - hh * 0.52); ctx.bezierCurveTo(cx + fw * 0.25, hy - hh * 0.48, cx + fw * 0.42, hy - hh * 0.3, cx + fw * 0.48, hy - hh * 0.08); ctx.stroke(); }
  if (P.kapsel === 'kort') { ctx.beginPath(); ctx.moveTo(cx - fw * 0.53, hy - hh * 0.05); ctx.bezierCurveTo(cx - fw * 0.6, hy - hh * 0.62, cx - fw * 0.3, hy - hh * 0.78, cx + fw * 0.05, hy - hh * 0.76);
    ctx.bezierCurveTo(cx + fw * 0.4, hy - hh * 0.76, cx + fw * 0.62, hy - hh * 0.6, cx + fw * 0.53, hy - hh * 0.05); ctx.lineTo(cx + fw * 0.47, hy - hh * 0.18); ctx.quadraticCurveTo(cx + fw * 0.45, hy - hh * 0.36, cx + fw * 0.2, hy - hh * 0.38);
    ctx.quadraticCurveTo(cx - fw * 0.1, hy - hh * 0.42, cx - fw * 0.42, hy - hh * 0.34); ctx.quadraticCurveTo(cx - fw * 0.48, hy - hh * 0.3, cx - fw * 0.47, hy - hh * 0.18); ctx.closePath(); ctx.fill();
    ctx.fillStyle = rgba(P.haar, 0.35); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + sd * fw * 0.5, hy - hh * 0.06, fw * 0.06, hh * 0.16, 0, 0, 6.283); ctx.fill(); } ctx.fillStyle = P.haar; }
  if (P.stoppels) { ctx.fillStyle = rgba(P.haar, 0.14); ctx.beginPath(); ctx.moveTo(cx - fw * 0.48, hy + hh * 0.05); ctx.bezierCurveTo(cx - fw * 0.42, hy + hh * 0.56, cx + fw * 0.42, hy + hh * 0.56, cx + fw * 0.48, hy + hh * 0.05);
    ctx.bezierCurveTo(cx + fw * 0.34, hy + hh * 0.24, cx + fw * 0.2, hy + hh * 0.2, cx, hy + hh * 0.24); ctx.bezierCurveTo(cx - fw * 0.2, hy + hh * 0.2, cx - fw * 0.34, hy + hh * 0.24, cx - fw * 0.48, hy + hh * 0.05); ctx.fill(); ctx.fillStyle = P.haar; }
  if (P.kapsel === 'krul') { for (let k = 0; k < 9; k++) { const an = Math.PI * (1.08 + k / 8 * 0.84); circ(ctx, cx + Math.cos(an) * fw * 0.48, hy - hh * 0.1 + Math.sin(an) * hh * 0.48, hh * 0.17, P.haar); } }
  if (P.kapsel === 'pony') { ctx.beginPath(); ctx.moveTo(cx - fw * 0.54, hy + hh * 0.0); ctx.bezierCurveTo(cx - fw * 0.62, hy - hh * 0.72, cx + fw * 0.62, hy - hh * 0.74, cx + fw * 0.54, hy - hh * 0.02);
    ctx.bezierCurveTo(cx + fw * 0.4, hy - hh * 0.2, cx + fw * 0.1, hy - hh * 0.16, cx - fw * 0.12, hy - hh * 0.26); ctx.bezierCurveTo(cx - fw * 0.3, hy - hh * 0.16, cx - fw * 0.46, hy - hh * 0.2, cx - fw * 0.54, hy); ctx.fill(); }
  if (P.kapsel === 'bob') { ctx.beginPath(); ctx.moveTo(cx - fw * 0.56, hy + hh * 0.1); ctx.bezierCurveTo(cx - fw * 0.62, hy - hh * 0.72, cx + fw * 0.62, hy - hh * 0.74, cx + fw * 0.56, hy + hh * 0.1);
    ctx.lineTo(cx + fw * 0.44, hy - hh * 0.22); ctx.quadraticCurveTo(cx, hy - hh * 0.3, cx - fw * 0.44, hy - hh * 0.22); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'kalend') { for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(cx + s * fw * 0.48, hy - hh * 0.08, fw * 0.12, hh * 0.24, s * 0.2, 0, 6.283); ctx.fill(); } ctx.fillStyle = _donker(P.huid, 0.08); ctx.beginPath(); ctx.ellipse(cx, hy - hh * 0.36, fw * 0.3, hh * 0.08, 0, Math.PI, 0); ctx.fill(); }
  if (P.kapsel === 'hoofddoek' && P.doekKlein) { ctx.fillStyle = P.haar; kap(0.24); // haar zichtbaar onder de losse doek
    ctx.fillStyle = P.doekKleur; ctx.beginPath(); ctx.moveTo(cx - fw * 0.66, hy + hh * 0.3); ctx.bezierCurveTo(cx - fw * 0.76, hy - hh * 0.6, cx - fw * 0.42, hy - hh * 0.9, cx, hy - hh * 0.88);
    ctx.bezierCurveTo(cx + fw * 0.42, hy - hh * 0.9, cx + fw * 0.76, hy - hh * 0.6, cx + fw * 0.66, hy + hh * 0.3); ctx.lineTo(cx + fw * 0.6, hy + hh * 0.28);
    ctx.bezierCurveTo(cx + fw * 0.66, hy - hh * 0.25, cx + fw * 0.45, hy - hh * 0.66, cx, hy - hh * 0.68); ctx.bezierCurveTo(cx - fw * 0.45, hy - hh * 0.66, cx - fw * 0.66, hy - hh * 0.25, cx - fw * 0.6, hy + hh * 0.28); ctx.closePath(); ctx.fill(); }
  else if (P.kapsel === 'hoofddoek') { ctx.fillStyle = P.doekKleur; ctx.beginPath(); ctx.moveTo(cx - fw * 0.56, hy + hh * 0.35); ctx.bezierCurveTo(cx - fw * 0.64, hy - hh * 0.72, cx + fw * 0.64, hy - hh * 0.72, cx + fw * 0.56, hy + hh * 0.35);
    ctx.bezierCurveTo(cx + fw * 0.5, hy - hh * 0.1, cx + fw * 0.4, hy - hh * 0.36, cx, hy - hh * 0.38); ctx.bezierCurveTo(cx - fw * 0.4, hy - hh * 0.36, cx - fw * 0.5, hy - hh * 0.1, cx - fw * 0.56, hy + hh * 0.35); ctx.fill();
    ctx.fillStyle = P.doekAccent; ctx.beginPath(); ctx.moveTo(cx - fw * 0.5, hy - hh * 0.2); ctx.quadraticCurveTo(cx, hy - hh * 0.46, cx + fw * 0.5, hy - hh * 0.2); ctx.quadraticCurveTo(cx, hy - hh * 0.38, cx - fw * 0.5, hy - hh * 0.2); ctx.fill(); }
  if (P.baard) { ctx.fillStyle = P.haar; ctx.beginPath(); ctx.moveTo(cx - fw * 0.46, hy + hh * 0.08); ctx.bezierCurveTo(cx - fw * 0.4, hy + hh * 0.62, cx + fw * 0.4, hy + hh * 0.62, cx + fw * 0.46, hy + hh * 0.08); ctx.bezierCurveTo(cx + fw * 0.3, hy + hh * 0.3, cx - fw * 0.3, hy + hh * 0.3, cx - fw * 0.46, hy + hh * 0.08); ctx.fill(); }
  // gezicht: wenkbrauwen, ogen, neus, mond (per uitdrukking)
  const E = { neutraal: [0, 0, 'glim'], blij: [0.02, 0, 'lach'], lacht: [0.04, 0, 'open'], verbaasd: [0.07, 0, 'o'], denkt: [0.03, -0.06, 'scheef'], bezorgd: [-0.02, 0.07, 'zuur'], ernstig: [0.015, -0.07, 'recht'], praat: [0.01, 0, Math.sin(t * 11) > 0 ? 'open' : 'glim'], slaapt: [-0.01, 0, 'glim'], moe: [-0.03, 0.04, 'glim'] }[uit] || [0, 0, 'glim'];
  const [browUp, browTilt, mond] = E; const ex0 = cx + ax, ey0 = hy + hh * 0.0, klein = hh < 34;
  for (const s of [-1, 1]) {
    const bx = ex0 + s * fw * 0.2; ctx.strokeStyle = P.wenkbrauw; ctx.lineWidth = Math.max(1.4, hh * 0.045);
    ctx.beginPath(); ctx.moveTo(bx - fw * 0.1, ey0 - hh * (0.16 + browUp) + s * hh * browTilt * 0.5); ctx.quadraticCurveTo(bx, ey0 - hh * (0.21 + browUp), bx + fw * 0.1, ey0 - hh * (0.17 + browUp) - s * hh * browTilt * 0.5); ctx.stroke();
    if (klein) { circ(ctx, bx, ey0 + hh * 0.02, hh * 0.05, ink); }
    else if (uit === 'slaapt') { ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.4, hh * 0.035); ctx.beginPath(); ctx.arc(bx, ey0 - hh * 0.01, fw * 0.09, 0.45, 2.69); ctx.stroke(); } // ogen dicht (21 okt 2026)
    else { ctx.fillStyle = '#FBF8F2'; ctx.beginPath(); ctx.ellipse(bx, ey0 + hh * 0.02, fw * 0.1, hh * (uit === 'verbaasd' ? 0.085 : 0.065), 0, 0, 6.283); ctx.fill();
      if (P.oog) { circ(ctx, bx + kijk * fw * 0.025, ey0 + hh * 0.025, hh * 0.058, P.oog); circ(ctx, bx + kijk * fw * 0.025, ey0 + hh * 0.025, hh * 0.032, ink); } else circ(ctx, bx + kijk * fw * 0.025, ey0 + hh * 0.025, hh * 0.058, ink); circ(ctx, bx + kijk * fw * 0.025 + hh * 0.02, ey0 + hh * 0.005, hh * 0.018, '#FFFFFF');
      if (uit === 'lacht') { ctx.fillStyle = P.huid; ctx.fillRect(bx - fw * 0.12, ey0 + hh * 0.05, fw * 0.24, hh * 0.06); }
      if (uit === 'moe') { ctx.fillStyle = P.huid; ctx.fillRect(bx - fw * 0.12, ey0 - hh * 0.06, fw * 0.24, hh * 0.075); ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.2, hh * 0.03); ctx.beginPath(); ctx.moveTo(bx - fw * 0.1, ey0 + hh * 0.012); ctx.lineTo(bx + fw * 0.1, ey0 + hh * 0.012); ctx.stroke(); } } // half dichte ogen (21 okt 2026)
    circ(ctx, ex0 + s * fw * 0.3, ey0 + hh * 0.2, hh * 0.075, rgba('#E07A5F', 0.16));
  }
  if (P.wimpers && hh >= 34) { ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.2, hh * 0.03); for (const s of [-1, 1]) { const bx = ex0 + s * fw * 0.2, ey = ey0 + hh * 0.02; ctx.beginPath(); ctx.ellipse(bx, ey, fw * 0.105, hh * 0.07, 0, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx + s * fw * 0.095, ey - hh * 0.03); ctx.lineTo(bx + s * fw * 0.15, ey - hh * 0.065); ctx.stroke(); } }
  if (P.accessoire.includes('sproeten')) { ctx.fillStyle = rgba(_donker(P.huid, 0.35), 0.6); for (let k = 0; k < 7; k++) circ(ctx, ex0 + (k % 2 ? 1 : -1) * fw * (0.12 + (k % 3) * 0.06), ey0 + hh * (0.13 + (k % 3) * 0.03), hh * 0.014, _donker(P.huid, 0.3)); }
  if (P.accessoire.includes('bril') || P.accessoire.includes('bril-dun')) { const dun = P.accessoire.includes('bril-dun'); ctx.strokeStyle = dun ? '#5A5F6E' : '#2A2F3E'; ctx.lineWidth = Math.max(1.4, hh * (dun ? 0.025 : 0.04));
    for (const s of [-1, 1]) { ctx.beginPath(); dun ? ctx.ellipse(ex0 + s * fw * 0.2, ey0 + hh * 0.025, fw * 0.15, hh * 0.1, 0, 0, 6.283) : roundRect(ctx, ex0 + s * fw * 0.2 - fw * 0.15, ey0 - hh * 0.08, fw * 0.3, hh * 0.2, hh * 0.07); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.05, ey0 + hh * 0.0); ctx.quadraticCurveTo(ex0, ey0 - hh * 0.03, ex0 + fw * 0.05, ey0); ctx.stroke(); }
  if (P.veiligheidsbril) { ctx.fillStyle = 'rgba(200,230,240,0.35)'; ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = Math.max(1.4, hh * 0.03); roundRect(ctx, ex0 - fw * 0.42, ey0 - hh * 0.1, fw * 0.84, hh * 0.24, hh * 0.1); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#5A5F6E'; ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.42, ey0); ctx.lineTo(ex0 - fw * 0.52, ey0 - hh * 0.02); ctx.moveTo(ex0 + fw * 0.42, ey0); ctx.lineTo(ex0 + fw * 0.52, ey0 - hh * 0.02); ctx.stroke(); }
  ctx.strokeStyle = _donker(P.huid, 0.3); ctx.lineWidth = Math.max(1.2, hh * 0.03); ctx.beginPath(); ctx.moveTo(ex0 + kijk * fw * 0.02, ey0 + hh * 0.08); ctx.quadraticCurveTo(ex0 + kijk * fw * 0.08, ey0 + hh * 0.17, ex0, ey0 + hh * 0.19); ctx.stroke();
  const masker = P.accessoire.includes('mondkapje');
  if (masker) { const mt = ey0 + hh * 0.1, mb = hy + hh * 0.56, mw = fw * 0.41; ctx.fillStyle = _MASKER; ctx.beginPath(); ctx.moveTo(ex0 - mw, mt + hh * 0.04); // mondkapje (25 okt 2026) over neus en mond
    ctx.quadraticCurveTo(ex0, mt - hh * 0.05, ex0 + mw, mt + hh * 0.04); ctx.lineTo(ex0 + mw * 0.95, mb - hh * 0.1); ctx.quadraticCurveTo(ex0, mb + hh * 0.04, ex0 - mw * 0.95, mb - hh * 0.1); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = _donker(_MASKER, 0.14); ctx.lineWidth = Math.max(1, hh * 0.025); for (let k = 1; k <= 3; k++) { const yy = mt + (mb - mt) * k / 4.3; ctx.beginPath(); ctx.moveTo(ex0 - mw * 0.85, yy); ctx.quadraticCurveTo(ex0, yy + hh * 0.03, ex0 + mw * 0.85, yy); ctx.stroke(); }
    ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = Math.max(1, hh * 0.03); ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.17, mt + hh * 0.005); ctx.quadraticCurveTo(ex0, mt - hh * 0.035, ex0 + fw * 0.17, mt + hh * 0.005); ctx.stroke(); } // neusbeugel
  const my = ey0 + hh * 0.3; ctx.strokeStyle = P.lippen || ink; ctx.fillStyle = _donker(P.huid, 0.6); ctx.lineWidth = Math.max(1.4, hh * (P.lippen ? 0.045 : 0.035));
  if (!masker && mond === 'glim') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.12, my); ctx.quadraticCurveTo(ex0, my + hh * 0.05, ex0 + fw * 0.12, my); ctx.stroke(); }
  if (!masker && mond === 'lach') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.16, my - hh * 0.01); ctx.quadraticCurveTo(ex0, my + hh * 0.11, ex0 + fw * 0.16, my - hh * 0.01); ctx.stroke(); }
  if (!masker && mond === 'open') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.15, my - hh * 0.01); ctx.quadraticCurveTo(ex0, my + hh * 0.17, ex0 + fw * 0.15, my - hh * 0.01); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#FBF8F2'; ctx.fillRect(ex0 - fw * 0.1, my - hh * 0.005, fw * 0.2, hh * 0.03); }
  if (!masker && mond === 'o') { ctx.beginPath(); ctx.ellipse(ex0, my + hh * 0.03, fw * 0.06, hh * 0.07, 0, 0, 6.283); ctx.fill(); }
  if (!masker && mond === 'scheef') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.1, my + hh * 0.02); ctx.quadraticCurveTo(ex0 + fw * 0.02, my + hh * 0.03, ex0 + fw * 0.13, my - hh * 0.02); ctx.stroke(); }
  if (!masker && mond === 'recht') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.1, my + hh * 0.015); ctx.lineTo(ex0 + fw * 0.1, my + hh * 0.015); ctx.stroke(); } // ernstig (25 okt 2026): zachte bezorgdheid, wenkbrauwen binnenkant omhoog, mond recht
  if (!masker && mond === 'zuur') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.11, my + hh * 0.04); ctx.quadraticCurveTo(ex0, my - hh * 0.02, ex0 + fw * 0.11, my + hh * 0.04); ctx.stroke(); }
  if (P.baard) { ctx.fillStyle = P.haar; ctx.beginPath(); ctx.ellipse(ex0, my - hh * 0.07, fw * 0.2, hh * 0.05, 0, Math.PI, 0); ctx.fill(); }
  ctx.restore();
  return { hoofd: { x: cx, y: hy, r: hh * 0.55 }, handR, handL, heup: { x: cx, y: heupY }, top: hy - hh * 0.75, schoot: zit ? { x: cx, y: heupY + hh * 0.05 } : undefined, zit: zit ? { y: heupY } : undefined };
}

// ===== baby (20 okt 2026): ligt op de rug, hoofd links. (x, y) = midden onder de baby, h = lengte. Vlak, geen omlijning, één schaduwtint.
// o.uit: 'slaapt' (ogen dicht), 'blij', 'neutraal', 'huilt'; o.geel 0..1 = gele huid (geelzucht); o.t = tijd (zacht trappelen)
function _baby(ctx, P, x, y, h, a, uit, o) { const t = o.t || 0, geel = o.geel || 0; const huid = geel > 0 ? _mixHex(P.huid, '#E2C25A', geel * 0.75) : P.huid, huidS = _donker(huid, 0.12), ink = _donker(huid, 0.68);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const u = h / 10, by = y - 1.7 * u; // u = maat; romp ligt op hoogte by
  // beentjes: gebogen, licht trappelend (boxpakje met voetjes)
  for (const s of [-1, 1]) { const k = Math.sin(t * 3 + (s > 0 ? 1.4 : 0)) * 0.18; const hp = [x + 1.6 * u, by + s * 0.75 * u], kn = [x + 2.9 * u, by + s * (2.0 + k) * u], vt = [x + 3.9 * u, by + s * (1.25 + k) * u];
    ctx.strokeStyle = P.topKleur; ctx.lineWidth = 1.15 * u; ctx.beginPath(); ctx.moveTo(...hp); ctx.lineTo(...kn); ctx.lineTo(...vt); ctx.stroke();
    ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.ellipse(vt[0] + 0.25 * u, vt[1], 0.62 * u, 0.5 * u, 0, 0, 6.283); ctx.fill(); }
  // armpjes naast het hoofd
  for (const s of [-1, 1]) { const k = Math.sin(t * 2.4 + (s > 0 ? 0.8 : 0)) * 0.15; const sh = [x - 0.9 * u, by + s * 1.15 * u], el = [x - 1.0 * u, by + s * (2.35 + k) * u], hd = [x - 1.85 * u, by + s * (2.55 + k) * u];
    ctx.strokeStyle = P.topKleur; ctx.lineWidth = 0.95 * u; ctx.beginPath(); ctx.moveTo(...sh); ctx.lineTo(...el); ctx.lineTo(hd[0] + 0.3 * u, hd[1]); ctx.stroke();
    ctx.fillStyle = huid; ctx.beginPath(); ctx.arc(hd[0], hd[1], 0.5 * u, 0, 6.283); ctx.fill(); }
  // romp: mollig ovaal in een boxpakje, onderkant in de schaduwtint
  ctx.beginPath(); ctx.ellipse(x + 0.35 * u, by, 2.15 * u, 1.65 * u, 0, 0, 6.283); ctx.fillStyle = P.topKleur; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.ellipse(x + 0.35 * u, by, 2.15 * u, 1.65 * u, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.ellipse(x + 0.6 * u, by + 1.9 * u, 2.6 * u, 1.0 * u, 0, 0, 6.283); ctx.fill(); ctx.restore();
  ctx.fillStyle = _donker(P.topKleur, 0.12); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + (-0.6 + i * 0.8) * u, by - 0.15 * u, 0.12 * u, 0, 6.283); ctx.fill(); } // drukknoopjes
  ctx.fillStyle = _licht(P.topKleur, 0.35); ctx.beginPath(); ctx.ellipse(x - 1.55 * u, by, 0.35 * u, 0.9 * u, 0, 0, 6.283); ctx.fill(); // kraagje
  // hoofd
  const hx = x - 3.25 * u, hy = by, hr = 1.85 * u; ctx.fillStyle = huid; ctx.beginPath(); ctx.arc(hx, hy, hr, 0, 6.283); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(hx, hy, hr, 0, 6.283); ctx.clip(); ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(hx + 0.2 * u, hy + 1.6 * u, 1.9 * u, 0.7 * u, 0, 0, 6.283); ctx.fill(); ctx.restore();
  for (const s of [-1, 1]) { ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(hx + s * 1.8 * u, hy + 0.1 * u, 0.3 * u, 0.42 * u, 0, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = P.haar; ctx.beginPath(); ctx.ellipse(hx - 0.2 * u, hy - 1.55 * u, 1.05 * u, 0.42 * u, -0.15, 0, 6.283); ctx.fill(); // plukje haar
  ctx.strokeStyle = P.haar; ctx.lineWidth = 0.22 * u; ctx.beginPath(); ctx.arc(hx + 0.35 * u, hy - 1.95 * u, 0.4 * u, 2.2, 5.2); ctx.stroke();
  ctx.fillStyle = rgba('#E07A6A', 0.35); for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + s * 1.0 * u, hy + 0.55 * u, 0.42 * u, 0.26 * u, 0, 0, 6.283); ctx.fill(); }
  const ogen = uit === 'slaapt' || o.ogen === false ? 'dicht' : 'open'; ctx.fillStyle = ink; ctx.strokeStyle = ink; ctx.lineWidth = 0.18 * u;
  for (const s of [-1, 1]) { const ex = hx + s * 0.68 * u, ey = hy - 0.05 * u; if (ogen === 'dicht') { ctx.beginPath(); ctx.arc(ex, ey - 0.12 * u, 0.32 * u, 0.35, 2.8); ctx.stroke(); } else { ctx.beginPath(); ctx.ellipse(ex, ey, 0.2 * u, 0.25 * u, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(ex + 0.06 * u, ey - 0.08 * u, 0.06 * u, 0, 6.283); ctx.fill(); ctx.fillStyle = ink; } }
  ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(hx, hy + 0.32 * u, 0.2 * u, 0.13 * u, 0, 0, 6.283); ctx.fill(); // neusje
  ctx.beginPath(); if (uit === 'huilt') { ctx.fillStyle = _donker(huid, 0.55); ctx.ellipse(hx, hy + 0.95 * u, 0.32 * u, 0.26 * u, 0, 0, 6.283); ctx.fill(); }
  else { ctx.lineWidth = 0.17 * u; ctx.strokeStyle = ink; ctx.arc(hx, hy + 0.65 * u, uit === 'blij' ? 0.42 * u : 0.3 * u, 0.5, 2.64); ctx.stroke(); }
  ctx.restore(); return { hoofd: { x: hx, y: hy, r: hr }, heup: { x: x + 2.4 * u, y: by }, top: hy - hr }; }
function _mixHex(h1, h2, k) { const a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16); const c = (s) => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k); return '#' + [c(16), c(8), c(0)].map(v => v.toString(16).padStart(2, '0')).join(''); }

// ===== Zijaanzicht (21 okt 2026) =====
// Gebruik: persoon(ctx, 'sam', x, y, h, { zij: true, kijk: 1, gang: 'ren', t })
//   zij: true  = van opzij getekend (kijk 1 = naar rechts, -1 = naar links)
//   gang: 'loop' | 'ren' | 'sprint' | geen (stilstaan) · fase 0..1 per pas-cyclus (zonder fase loopt hij op t) · tempo = vermenigvuldiger
//   vooruit: true = x is het startpunt en hij beweegt zelf vooruit met gangSnelheid(); de steunvoet glijdt dan niet over de grond
//   pose: 'staan' | 'wijs' (arm naar voren) | 'zwaai' | 'zak' (handen in de zakken) · uit: zoals vooraanzicht (blij, praat, moe, …)
// Geeft { hoofd:{x,y,r}, handR, handL, heup, voet } terug.
// Gangcycli uit de biomechanica (22 okt 2026). Per been is fase 0 het eerste contact (voet raakt de grond).
// th = dijbeen t.o.v. verticaal (+ = naar voren), kn = kniebuiging, an = enkel (+ = tenen omhoog), in graden, door de cyclus heen.
// duty = deel van de cyclus dat een voet op de grond staat: lopen 0,62 (dubbele steun), rennen 0,32 en sprinten 0,22 (zweeffase: beide voeten los).
// arm = schouder t.o.v. de romp [achter, voor], elle = elleboogbuiging [achter, voor] in graden (sprint: schouder ±120° bereik, elleboog voor ±100°, achter ±50°).
// f = pascycli per seconde (één cyclus = twee stappen). kantel = hele lichaam voorover vanaf de enkels (graden; de voeten komen meer onder/achter het lichaam), leun = romp voorover t.o.v. verticaal; kantel = leun geeft één rechte lijn van kruin tot hiel (Kamiel 22 okt 2026). Armen zwaaien tegengesteld aan het been aan dezelfde kant.
// Bronnen: Fukuchi e.a. 2017 (open dataset, 2,5–4,5 m/s: heup −8..53°, knie tot 109°, enkel −20..27°), Novacheck 1998 (fasen, sprint), Perry & Burnfield (lopen), duty factor ±0,30 bij 12 km/u.
const GANG = {
  loop:   { f: 0.9, duty: 0.62, kantel: 3, leun: 3, arm: [-20, 20], elle: [12, 32],
            th: [[0, 22], [0.15, 16], [0.3, 5], [0.5, -11], [0.6, -8], [0.73, 10], [0.87, 24]],
            kn: [[0, 3], [0.13, 17], [0.3, 8], [0.42, 4], [0.55, 22], [0.62, 38], [0.72, 62], [0.83, 35], [0.93, 6]],
            an: [[0, 0], [0.07, -6], [0.3, 6], [0.48, 10], [0.6, -8], [0.65, -16], [0.75, -4], [0.88, 1]] },
  ren:    { f: 1.43, duty: 0.32, kantel: 16, leun: 16, zweef: 5, arm: [-62, 36], elle: [52, 108],
            th: [[0, 24], [0.12, 10], [0.32, -16], [0.4, -20], [0.52, -6], [0.66, 18], [0.83, 38], [0.93, 31]],
            kn: [[0, 18], [0.12, 42], [0.24, 30], [0.32, 18], [0.42, 48], [0.55, 92], [0.66, 108], [0.76, 92], [0.86, 52], [0.95, 20]],
            an: [[0, 4], [0.12, 24], [0.24, 14], [0.32, -14], [0.4, -21], [0.5, -8], [0.62, 4], [0.8, 8], [0.93, 5]] },
  sprint: { f: 2.2, duty: 0.22, kantel: 22, leun: 22, zweef: 3, arm: [-76, 56], elle: [45, 108],
            th: [[0, 28], [0.1, 8], [0.22, -22], [0.3, -26], [0.45, 4], [0.62, 42], [0.78, 52], [0.9, 40]],
            kn: [[0, 22], [0.08, 38], [0.22, 20], [0.32, 62], [0.45, 116], [0.57, 128], [0.7, 100], [0.82, 55], [0.93, 25]],
            an: [[0, -6], [0.08, 18], [0.22, -24], [0.3, -28], [0.45, -6], [0.65, 10], [0.85, 4]] }
};
function _kf(tab, p) { // periodieke kubische interpolatie (Catmull-Rom met ongelijke afstanden)
  const n = tab.length, T = (i) => tab[((i % n) + n) % n][0] + Math.floor(i / n), Y = (i) => tab[((i % n) + n) % n][1];
  let i = n - 1; for (let k = 0; k < n; k++) if (tab[k][0] <= p) i = k;
  const t0 = T(i), t1 = T(i + 1), y0 = Y(i), y1 = Y(i + 1), m0 = (Y(i + 1) - Y(i - 1)) / (T(i + 1) - T(i - 1)), m1 = (Y(i + 2) - Y(i)) / (T(i + 2) - T(i));
  const dt = t1 - t0, u = (p - t0) / dt, u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * y0 + (u3 - 2 * u2 + u) * dt * m0 + (-2 * u3 + 3 * u2) * y1 + (u3 - u2) * dt * m1; }
const _ZOOL = [[-0.24, 0.22], [0.42, 0.22], [0.64, 0.16]]; // hiel, bal, teen (voetassen, × kopmaat) t.o.v. de enkel
function _beenPose(G, p, L1, L2, hh, extra = 0) { // p = fase van dit been (0..1)
  const D = Math.PI / 180; let th, kn, an;
  if (G) { th = (_kf(G.th, p) - (G.kantel || 0)) * D; kn = _kf(G.kn, p) * D; an = (_kf(G.an, p) + extra) * D; } else { th = 0.02; kn = 0.03; an = 0; }
  const kx = Math.sin(th) * L1, ky = Math.cos(th) * L1, sa = th - kn, ax = kx + Math.sin(sa) * L2, ay = ky + Math.cos(sa) * L2, fA = sa + an;
  const ux = Math.cos(fA), uy = -Math.sin(fA), nx = Math.sin(fA), ny = Math.cos(fA);
  let low = -1e9, lowX = 0; for (const [lx, ly] of _ZOOL) { const X = ax + (lx * ux + ly * nx) * hh, Y = ay + (lx * uy + ly * ny) * hh; if (Y > low) { low = Y; lowX = X; } }
  const ballX = ax + (0.42 * ux + 0.22 * nx) * hh; // bal van de voet: daar rolt de voet over af (glijdt niet)
  return { th, kn, kx, ky, ax, ay, sa, fA, low, lowX, ballX, p }; }
// snelheid (px/s) waarmee iemand van lengte h vooruitgaat bij deze gang, zodat de steunvoet niet glijdt
function gangSnelheid(id, h, gang = 'ren', tempo = 1) { const P = CAST[id] || {}, G = GANG[gang]; h *= P.lengte || 1; const hh = h / (P.kop || 6.1);
  const L = (h - hh * 3.45) - hh * 0.22, s = Math.min(G.duty, 0.5), a = _beenPose(G, 0, L / 2, L / 2, hh), b = _beenPose(G, s, L / 2, L / 2, hh); return (a.ballX - b.ballX) * G.f * tempo / s; }
function _zij(ctx, P, x, y, h, a, o) {
  const t = o.t || 0, uit = o.uit || 'neutraal', kijk = o.kijk || 1, G = o.gang ? GANG[o.gang] : null, tempo = o.tempo || 1;
  const zit = o.pose === 'zit' && !o.gang, hh = h / (P.kop || 6.1), zitH = o.zitHoogte || hh * 1.45, top = zit ? y - zitH - hh * 3.45 : y - h; // zit (25 okt 2026)
  const fEff = G ? G.f * tempo : 1, fase = G ? (o.fase != null ? o.fase : t * fEff) : 0, fi = fase * 6.2832;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kijk < 0) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
  const hoofdY0 = top + hh * 0.55, schouderY0 = top + hh * 1.42, heupY0 = top + hh * 3.45, voetY = y;
  const hw = hh * (P.heupK || 1.45) * 0.62, d = hh * (P.schouderK ? P.schouderK * 0.68 : 1.25); // diepte van romp (zij)
  const Lb = voetY - heupY0 - hh * 0.22, L1 = Lb * 0.5, L2 = Lb * 0.5;
  // --- benen: pose per been uit de gangcyclus (B1 = been aan de kant van de kijker)
  const fr = (q) => ((q % 1) + 1) % 1, p1 = fr(fase), p2 = fr(fase + 0.5);
  let B1 = _beenPose(G, p1, L1, L2, hh), B2 = _beenPose(G, p2, L1, L2, hh);
  if (zit) { const need = zitH - hh * 0.22, th = Math.PI / 2 - Math.asin(Math.max(-0.5, Math.min(0.5, (need - L2) / L1))); // dij (bijna) horizontaal naar voren, onderbeen loodrecht omlaag, voet plat
    const mk = (off) => { const kx = Math.sin(th) * L1 + off, ky = Math.cos(th) * L1; return { th, kn: th, kx, ky, ax: kx, ay: ky + L2, sa: 0, fA: 0, low: ky + L2 + hh * 0.22, lowX: kx, ballX: kx + hh * 0.42, p: 0 }; };
    B1 = mk(0); B2 = mk(-hh * 0.1); }
  // --- heuphoogte: steunvoet op de grond; in de zweeffase een worp (zwaartekracht) tussen afzet en landing
  const duty = G ? G.duty : 1, steun = (B) => B.p < duty;
  let heupY;
  if (zit) heupY = heupY0;
  else if (!G) heupY = voetY - Math.max(B1.low, B2.low);
  else if (steun(B1) || steun(B2)) heupY = Math.min(steun(B1) ? voetY - B1.low : 1e9, steun(B2) ? voetY - B2.low : 1e9);
  else { const L = B1.p >= duty && B1.p < 0.5 ? B1 : B2, Tf = (0.5 - duty) / fEff, tau = (L.p - duty) / fEff;
    const yTO = voetY - _beenPose(G, duty, L1, L2, hh).low, yIC = voetY - _beenPose(G, 0, L1, L2, hh).low, g = 9.81 * (h / 1.7) * (G.zweef || 1);
    heupY = yTO + (yIC - yTO) * tau / Tf - 0.5 * g * tau * (Tf - tau); }
  // zwaaivoet nooit door de grond: tenen iets optrekken
  for (const k of [1, 2]) { let B = k === 1 ? B1 : B2; if (G && !zit && !steun(B)) for (let e = 0; e < 10 && heupY + B.low > voetY - hh * 0.03; e++) B = _beenPose(G, B.p, L1, L2, hh, (e + 1) * 5); if (k === 1) B1 = B; else B2 = B; }
  // --- vooruit (o.vooruit): x is het startpunt; tijdens de steunfase staat de steunvoet stil op de grond
  let cx = x;
  if (G && o.vooruit) { const sEnd = Math.min(duty, 0.5), c0 = _beenPose(G, 0, L1, L2, hh).ballX, v = (c0 - _beenPose(G, sEnd, L1, L2, hh).ballX) * fEff / sEnd;
    const S = [B1, B2].filter(B => B.p < sEnd).sort((p, q) => p.p - q.p)[0]; const dl = S ? (c0 - S.ballX) - v * S.p / fEff : 0; cx = x + v * t + dl; }
  const dy = heupY - heupY0, lean = G ? G.leun * Math.PI / 180 : (zit ? (o.leun != null ? o.leun : (o.tafel != null ? 6 : 0)) * Math.PI / 180 : 0); // zit aan tafel: iets voorover
  if (zit && o.stoel) { const k = typeof o.stoel === 'string' ? o.stoel : '#5A6A84', rand = _licht(k, 0.35); ctx.save(); ctx.lineCap = 'round'; // stoel van opzij: poten, zitting, rugleuning achter de rug
    const zx0 = cx - hw * 0.75, zx1 = cx + L1 * 0.62, zy = heupY + hh * 0.24; ctx.strokeStyle = rand; ctx.lineWidth = hh * 0.1;
    ctx.beginPath(); ctx.moveTo(zx0 + hh * 0.1, zy); ctx.lineTo(zx0 + hh * 0.05, voetY - hh * 0.03); ctx.moveTo(zx1 - hh * 0.1, zy); ctx.lineTo(zx1 - hh * 0.05, voetY - hh * 0.03); ctx.moveTo(zx0 + hh * 0.08, zy); ctx.lineTo(zx0 - hh * 0.12, heupY - hh * 1.9); ctx.stroke();
    roundRect(ctx, zx0 - hh * 0.32, heupY - hh * 2.0, hh * 0.26, hh * 1.4, hh * 0.1); ctx.fillStyle = k; ctx.fill(); ctx.strokeStyle = rand; ctx.lineWidth = Math.max(1.5, hh * 0.05); ctx.stroke();
    roundRect(ctx, zx0 - hh * 0.05, zy - hh * 0.06, zx1 - zx0 + hh * 0.05, hh * 0.18, hh * 0.07); ctx.fillStyle = _donker(k, 0.1); ctx.fill(); ctx.stroke(); ctx.restore(); }
  // bovenlijf kantelt om de heup
  const rot = (px, py) => { const dx = px - cx, dyy = py - heupY; return [cx + dx * Math.cos(lean) - dyy * Math.sin(lean), heupY + dx * Math.sin(lean) + dyy * Math.cos(lean)]; }; // lean > 0 = voorover (bovenkant naar de kijkrichting)
  const ink = _donker(P.huid, 0.68), huidS = _donker(P.huid, 0.12);
  // --- been tekenen
  const tekenBeen = (B, ver) => {
    const hx = cx - hw * 0.05, kx = hx + B.kx, ky = heupY + B.ky, ax = hx + B.ax, ay = heupY + B.ay;
    const br = ver ? _donker(P.broek, 0.18) : P.broek, hu = ver ? _donker(P.huid, 0.14) : P.huid;
    ctx.lineWidth = hh * 0.58; ctx.strokeStyle = br; ctx.beginPath(); ctx.moveTo(hx, heupY); ctx.lineTo(kx, ky);
    if (P.kort) { const mx = kx + (ax - kx) * 0.12, my = ky + (ay - ky) * 0.12; ctx.lineTo(mx, my); ctx.stroke(); ctx.strokeStyle = hu; ctx.lineWidth = hh * 0.4; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(ax, ay); ctx.stroke();
      ctx.strokeStyle = ver ? '#D6D6D0' : '#F2F2EE'; ctx.lineWidth = hh * 0.38; ctx.beginPath(); ctx.moveTo(kx + (ax - kx) * 0.9, ky + (ay - ky) * 0.9); ctx.lineTo(ax, ay); ctx.stroke(); }
    else { ctx.lineTo(ax, ay); ctx.stroke(); }
    // schoen in de voetstand uit de cyclus (hiel, bal, teen)
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(-B.fA);
    ctx.fillStyle = ver ? _donker(P.schoen, 0.15) : P.schoen; ctx.beginPath(); ctx.moveTo(-hh * 0.2, -hh * 0.12);
    ctx.quadraticCurveTo(-hh * 0.3, hh * 0.18, -hh * 0.2, hh * 0.22); ctx.lineTo(hh * 0.56, hh * 0.22); ctx.quadraticCurveTo(hh * 0.68, hh * 0.18, hh * 0.64, hh * 0.08); ctx.quadraticCurveTo(hh * 0.5, -hh * 0.04, hh * 0.22, -hh * 0.06); ctx.quadraticCurveTo(hh * 0.05, -hh * 0.14, -hh * 0.2, -hh * 0.12); ctx.fill();
    ctx.fillStyle = ver ? _donker(P.schoenAccent, 0.15) : P.schoenAccent; ctx.fillRect(-hh * 0.22, hh * 0.15, hh * 0.84, hh * 0.07); ctx.restore();
    return { x: ax, y: ay }; };
  // --- armen
  const sx0 = cx + d * 0.04, sy0 = schouderY0 + dy + hh * 0.28;
  const A1 = hh * 1.32 * (P.armK || 1), A2 = hh * 1.2 * (P.armK || 1);
  // armzwaai: tegengesteld aan het been aan dezelfde kant; schouder t.o.v. de romp en elleboog van achter (A) naar voor (V)
  const thMin = G ? Math.min(...G.th.map(q => q[1])) : 0, thMax = G ? Math.max(...G.th.map(q => q[1])) : 1;
  const armHoek = (B, kant) => { // kant 1 = dichtbij; B = been aan dezelfde kant
    if (G) { const D = Math.PI / 180, th = B.th / D + (G.kantel || 0), v = 1 - (th - thMin) / (thMax - thMin); // v: 0 = arm achter, 1 = arm voor
      const w = v * v * (3 - 2 * v); return [(G.arm[0] + (G.arm[1] - G.arm[0]) * w) * D, (G.elle[0] + (G.elle[1] - G.elle[0]) * w) * D]; }
    if (o.pose === 'wijs' && kant > 0) return [1.35, 0.1];
    if (o.pose === 'wijsOmhoog' && kant > 0) return [2.4, 0.2];
    if (o.pose === 'zwaai' && kant > 0) return [2.6, 0.5 + 0.35 * Math.sin(t * 7)];
    if (o.pose === 'vasthouden' && kant > 0) return [0.55, 1.2];
    if (o.pose === 'handdruk' && kant > 0) { const [sx, sy] = rot(sx0, sy0); const lx = o.hand ? (kijk < 0 ? 2 * x - o.hand.x : o.hand.x) : sx + (A1 + A2) * 0.68, ly = o.hand ? o.hand.y : sy + hh * 1.2 + _schudY(o.schud) * hh * 0.3;
      const [a1, a2] = _ik(lx - sx - hh * 0.18, ly - sy, A1, A2); return [a1 - lean, a2 - a1]; }
    if (o.pose === 'zak') return [-0.15, -0.35];
    if (zit) { const [sx, sy] = rot(sx0, sy0); let lx, ly; // zit: hand op tafel vóór de borst, op de hand van de partner, of in de schoot
      if (o.handOpHand && kant > 0) { lx = (kijk < 0 ? 2 * x - o.handOpHand.x : o.handOpHand.x) - hh * 0.12; ly = o.handOpHand.y - hh * 0.06; }
      else if (o.tafel != null) { lx = cx + d * 0.5 + hh * (o.reik != null ? o.reik : 1.0) + (kant > 0 ? 0 : hh * 0.25); ly = o.tafel - hh * 0.13; }
      else { lx = cx + L1 * 0.55 + (kant > 0 ? 0 : hh * 0.1); ly = heupY - hh * 0.12; }
      const [a1, a2] = _ik(lx - sx, ly - sy, A1, A2); return [a1 - lean, a2 - a1]; }
    return [0.04 * kant, 0.12]; };
  const tekenArm = (B, kant) => { const [u, e] = armHoek(B, kant); const [sx, sy] = rot(sx0, sy0);
    const ex = sx + Math.sin(u + lean) * A1, ey = sy + Math.cos(u + lean) * A1, f = u + lean + e, hx = ex + Math.sin(f) * A2, hy = ey + Math.cos(f) * A2;
    const ver = kant < 0, lang = P.top !== 'tshirt';
    // dichtbije arm: mouw iets lichter dan het shirt en een donkere rand, zodat de arm loskomt van de romp (Kamiel 22 okt 2026)
    const mouw = ver ? _donker(P.top === 'labjas' ? P.topKleur : (P.topAccent || P.topKleur), 0.16) : _licht(P.topKleur, 0.1), hu0 = P.accessoire.includes('handschoenen') ? _NITRIL : P.huid, hu = ver ? _donker(hu0, 0.14) : hu0; // nitrilhandschoenen (25 okt 2026)
    const rand = ver ? null : rgba('#0B1020', 0.55), rw = hh * 0.07;
    const huidPad = () => { ctx.beginPath(); ctx.moveTo(lang ? ex + (hx - ex) * 0.6 : sx + (ex - sx) * 0.4, lang ? ey + (hy - ey) * 0.6 : sy + (ey - sy) * 0.4); if (!lang) ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); };
    const mouwPad = () => { ctx.beginPath(); ctx.moveTo(sx, sy); if (lang) { ctx.lineTo(ex, ey); ctx.lineTo(ex + (hx - ex) * 0.72, ey + (hy - ey) * 0.72); } else ctx.lineTo(sx + (ex - sx) * 0.5, sy + (ey - sy) * 0.5); };
    const handPad = () => { ctx.beginPath(); ctx.ellipse(hx + Math.sin(f) * hh * 0.07, hy + Math.cos(f) * hh * 0.07, hh * 0.17, hh * 0.2, -f, 0, 6.283); };
    const wMouw = hh * (lang ? 0.4 : 0.44), wHuid = hh * 0.27;
    if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = wHuid + rw; huidPad(); ctx.stroke(); ctx.lineWidth = wMouw + rw; mouwPad(); ctx.stroke(); ctx.lineWidth = rw; handPad(); ctx.stroke(); }
    ctx.strokeStyle = hu; ctx.lineWidth = wHuid; huidPad(); ctx.stroke();
    ctx.strokeStyle = mouw; ctx.lineWidth = wMouw; mouwPad(); ctx.stroke();
    if (lang) { ctx.strokeStyle = ver ? _donker(P.top === 'labjas' ? P.topKleur : (P.topAccent || P.topKleur), 0.3) : _donker(P.topKleur, 0.06); ctx.lineWidth = hh * 0.42; ctx.beginPath(); ctx.moveTo(ex + (hx - ex) * 0.66, ey + (hy - ey) * 0.66); ctx.lineTo(ex + (hx - ex) * 0.74, ey + (hy - ey) * 0.74); ctx.stroke(); }
    if (o.pose === 'handdruk' && kant > 0 && !G) { const H = _grip(ctx, hx, hy, Math.PI / 2 - f, hh, hu, rand); return Object.assign(H, { x: H.x, y: H.y }); }
    ctx.fillStyle = hu; handPad(); ctx.fill();
    return { x: hx + Math.sin(f) * hh * 0.12, y: hy + Math.cos(f) * hh * 0.12, ang: Math.PI / 2 - f }; };
  // tekenvolgorde: ver been, ver arm, romp, dichtbij been (onder de romp door), dichtbij arm, hoofd
  tekenBeen(B2, true);
  const hand2 = tekenArm(B2, -1);
  { const [nx0, ny0] = rot(cx + d * 0.05, schouderY0 + dy - hh * 0.05), V0 = (schouderY0 - hoofdY0) - hh * 0.04 - (G && G !== GANG.loop ? hh * 0.05 : 0); // haar achter het hoofd beweegt mee met de kanteling
    const hx0 = nx0 + hh * 0.04 + Math.sin(lean) * V0, hy0 = ny0 - Math.cos(lean) * V0;
    if (P.kapsel === 'staart' || P.kapsel === 'vlecht' || P.kapsel === 'golf') _zijHaarAchter(ctx, P, rot, hx0 - d * 0.05 - hh * 0.04, hy0 - hh * 0.04, schouderY0 + dy, hh, t, G, fi); }
  const voet1 = tekenBeen(B1, false);
  // --- romp (zijkant): rug links, borst rechts
  const sY = schouderY0 + dy, tY = top + hh * 3.0 + dy, onder = heupY + hh * (zit ? 0.24 : P.top === 'labjas' ? 0.95 : P.top === 'jas' ? 0.45 : 0.24);
  if (zit && (P.top === 'labjas' || P.top === 'jas')) { const pd = P.top === 'labjas' ? 0.85 : 0.45, hx = cx - hw * 0.05; // zit: jaspand ligt over de dij
    ctx.fillStyle = _donker(P.topKleur, 0.04); ctx.beginPath(); ctx.moveTo(cx - hw * 0.5, heupY - hh * 0.2); ctx.lineTo(cx + hw * 0.42, heupY - hh * 0.25);
    ctx.lineTo(hx + B1.kx * pd + hh * 0.05, heupY + B1.ky * pd - hh * 0.33); ctx.quadraticCurveTo(hx + B1.kx * pd + hh * 0.12, heupY + B1.ky * pd + hh * 0.05, hx + B1.kx * pd - hh * 0.05, heupY + B1.ky * pd + hh * 0.38);
    ctx.lineTo(cx - hw * 0.55, heupY + hh * 0.42); ctx.closePath(); ctx.fill(); }
  const romp = () => { const pts = [[cx - d * 0.42, sY + hh * 0.05], [cx - d * 0.5, sY + hh * 0.7], [cx - d * 0.44, tY], [cx - hw * 0.5, heupY], [cx - hw * 0.5, onder], [cx + hw * 0.42, onder], [cx + hw * 0.44, heupY - hh * 0.1], [cx + d * 0.4, tY - hh * 0.2], [cx + d * 0.52, sY + hh * 0.75], [cx + d * 0.36, sY + hh * 0.02], [cx, sY - hh * 0.12]].map(p => rot(p[0], p[1]));
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]); ctx.quadraticCurveTo(pts[3][0], pts[3][1], pts[4][0], pts[4][1]);
    ctx.lineTo(pts[5][0], pts[5][1]); ctx.quadraticCurveTo(pts[6][0], pts[6][1], pts[7][0], pts[7][1]); ctx.quadraticCurveTo(pts[8][0], pts[8][1], pts[9][0], pts[9][1]);
    ctx.quadraticCurveTo(pts[10][0], pts[10][1], pts[0][0], pts[0][1]); ctx.closePath(); };
  ctx.fillStyle = P.topKleur; romp(); ctx.fill();
  ctx.save(); romp(); ctx.clip();
  { const [bx, by] = rot(cx - d * 0.62, tY); ctx.fillStyle = P.topAccent || _donker(P.topKleur, 0.1); ctx.beginPath(); ctx.ellipse(bx, by, d * 0.3, hh * 2.6, lean, 0, 6.283); ctx.fill(); } // schaduw op de rug
  if (P.strepen) { ctx.fillStyle = P.strepen; for (let yy = sY + hh * 0.45; yy < heupY + hh * 0.3; yy += hh * 0.36) { const [qx, qy] = rot(cx, yy); ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-d, 0, d * 2, hh * 0.15); ctx.restore(); } }
  if (P.top === 'labjas' || P.top === 'vest' || P.top === 'jasje') { const [p1x, p1y] = rot(cx + d * 0.36, sY + hh * 0.05), [p2x, p2y] = rot(cx + hw * 0.4, onder); ctx.strokeStyle = P.binnen || P.topAccent; ctx.lineWidth = hh * 0.22; ctx.beginPath(); ctx.moveTo(p1x + hh * 0.08, p1y); ctx.lineTo(p2x + hh * 0.08, p2y); ctx.stroke();
    ctx.strokeStyle = P.topAccent; ctx.lineWidth = hh * 0.05; ctx.beginPath(); ctx.moveTo(p1x - hh * 0.06, p1y); ctx.lineTo(p2x - hh * 0.06, p2y); ctx.stroke(); }
  if (P.top === 'hoodie') { const [px, py] = rot(cx + d * 0.18, tY + hh * 0.05); ctx.fillStyle = P.topAccent; ctx.save(); ctx.translate(px, py); ctx.rotate(lean); roundRect(ctx, -d * 0.1, -hh * 0.05, d * 0.5, hh * 0.48, hh * 0.15); ctx.fill(); ctx.restore(); }
  if (P.top === 'trui' && !P.strepen) { ctx.fillStyle = P.topAccent; for (let i = 0; i < 2; i++) { const [qx, qy] = rot(cx, tY - hh * (0.55 - i * 0.22)); ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-d, 0, d * 2, hh * 0.07); ctx.restore(); } }
  if (P.top === 'jas') { ctx.fillStyle = P.topAccent; const [qx, qy] = rot(cx + d * 0.05, tY + hh * 0.05); ctx.save(); ctx.translate(qx, qy); ctx.rotate(lean); ctx.fillRect(-hh * 0.2, 0, hh * 0.42, hh * 0.32); ctx.restore(); }
  ctx.restore();
  // zwangerschapsbuik
  { const zw = o.zwanger != null ? o.zwanger : (P.zwanger || 0); if (zw > 0.02) { const [bx, by] = rot(cx + d * 0.12, heupY - hh * 0.45); ctx.fillStyle = (P.top === 'vest' || P.top === 'labjas') ? (P.binnen || P.topKleur) : P.topKleur; ctx.beginPath(); ctx.ellipse(bx + hh * 0.12 * zw, by, hh * (0.32 + 0.36 * zw), hh * (0.48 + 0.3 * zw), 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = rgba('#FFFFFF', 0.12); ctx.beginPath(); ctx.ellipse(bx + hh * 0.38 * zw, by - hh * 0.3 * zw, hh * 0.18 * zw, hh * 0.1 * zw, -0.6, 0, 6.283); ctx.fill(); } }
  if (P.sjaal) { const [qx, qy] = rot(cx, sY - hh * 0.05); ctx.fillStyle = P.sjaal; ctx.beginPath(); ctx.ellipse(qx, qy, d * 0.42, hh * 0.22, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = _donker(P.sjaal, 0.12); ctx.save(); ctx.translate(qx - d * 0.3, qy); ctx.rotate(0.25 + (G ? 0.5 + 0.15 * Math.sin(fi * 2) : 0)); roundRect(ctx, -hh * 0.12, 0, hh * 0.26, hh * 0.95, hh * 0.08); ctx.fill(); ctx.restore(); }
  // --- dichtbij arm
  const hand1 = tekenArm(B1, 1);
  if (o.hold) o.hold(ctx, hand1.x, hand1.y, hand1.ang);
  // --- nek en hoofd
  const [nx, ny] = rot(cx + d * 0.05, sY - hh * 0.05);
  const Vk = (schouderY0 - hoofdY0) - hh * 0.04 - (G && G !== GANG.loop ? hh * 0.05 : 0); // nek → hoofd, langs de lichaamsas (kruin in lijn met het lijf)
  const hcx = nx + hh * 0.04 + Math.sin(lean) * Vk, hy = ny - Math.cos(lean) * Vk;
  ctx.strokeStyle = P.kapsel === 'capuchon' ? (P.topAccent || P.topKleur) : huidS; ctx.lineWidth = hh * 0.32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny + hh * 0.05); ctx.lineTo(hcx - hh * 0.04, hy + hh * 0.35); ctx.stroke(); // capuchon: hals bedekt
  if (P.top === 'hoodie') { ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.moveTo(nx - hh * 0.12, ny - hh * 0.12); ctx.quadraticCurveTo(nx - d * 0.62, ny - hh * 0.1, nx - d * 0.55, ny + hh * 0.55); ctx.quadraticCurveTo(nx - d * 0.3, ny + hh * 0.3, nx + hh * 0.05, ny + hh * 0.05); ctx.closePath(); ctx.fill(); }
  if (P.top === 'overhemd') { ctx.fillStyle = _licht(P.topKleur, 0.15); ctx.beginPath(); ctx.moveTo(nx - hh * 0.2, ny - hh * 0.05); ctx.lineTo(nx + hh * 0.22, ny - hh * 0.02); ctx.lineTo(nx + hh * 0.1, ny + hh * 0.25); ctx.closePath(); ctx.fill(); }
  if (P.accessoire.includes('stethoscoop')) { ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = hh * 0.05; ctx.beginPath(); ctx.moveTo(nx - hh * 0.15, ny); ctx.quadraticCurveTo(nx + hh * 0.35, ny + hh * 0.7, nx + hh * 0.3, ny + hh * 1.05); ctx.stroke(); circ(ctx, nx + hh * 0.3, ny + hh * 1.1, hh * 0.09, '#9AA3B2'); }
  const H = _zijHoofd(ctx, P, hcx, hy, hh, uit, t, G, fi);
  ctx.restore();
  const m = (p) => kijk < 0 ? { ...p, x: 2 * x - p.x } : p;
  return { hoofd: m({ x: hcx, y: hy, r: hh * 0.55 }), handR: m(hand1), handL: m(hand2 || hand1), heup: m({ x: cx, y: heupY }), voet: m(voet1), x: kijk < 0 ? 2 * x - cx : cx, schoot: zit ? m({ x: cx + L1 * 0.5, y: heupY - hh * 0.1 }) : undefined, zit: zit ? { y: heupY } : undefined };
}
function _zijHaarAchter(ctx, P, rot, cx, hoofdY, schouderY, hh, t, G, fi) {
  ctx.fillStyle = P.haar; const hx = cx - hh * 0.38, hy = hoofdY - hh * 0.25, zw = G ? Math.sin(fi * 2) * (G !== GANG.loop ? 0.35 : 0.12) : 0;
  if (P.kapsel === 'staart') { ctx.save(); ctx.translate(hx, hy); ctx.rotate(0.15 + zw + (G && G !== GANG.loop ? 0.5 : 0)); ctx.beginPath(); ctx.moveTo(0, -hh * 0.12);
    ctx.bezierCurveTo(-hh * 0.45, hh * 0.05, -hh * 0.42, hh * 0.9, -hh * 0.2, hh * 1.25); ctx.bezierCurveTo(-hh * 0.12, hh * 0.85, -hh * 0.05, hh * 0.35, hh * 0.12, hh * 0.12); ctx.closePath(); ctx.fill(); ctx.restore(); }
  if (P.kapsel === 'vlecht') { ctx.save(); ctx.translate(hx + hh * 0.05, hy + hh * 0.3); ctx.rotate(0.1 + zw * 0.6); for (let k = 0; k < 8; k++) { circ(ctx, -hh * 0.04 * k * 0.3, hh * (0.1 + k * 0.15), hh * (0.15 - k * 0.008), k % 2 ? _donker(P.haar, 0.18) : P.haar); } ctx.restore(); }
  if (P.kapsel === 'golf') { const L = hh * (0.9 + (P.golfLang ?? 1.05)); ctx.beginPath(); ctx.moveTo(hx + hh * 0.5, hy - hh * 0.2); ctx.quadraticCurveTo(hx - hh * 0.32, hy, hx - hh * 0.22 - zw * hh * 0.3, hy + L);
    for (let k = 0; k <= 4; k++) ctx.lineTo(hx - hh * 0.22 + k * hh * 0.14 - zw * hh * 0.3, hy + L + Math.sin(k * 2.4) * hh * 0.08);
    ctx.quadraticCurveTo(hx + hh * 0.4, hy + L * 0.4, hx + hh * 0.5, hy - hh * 0.2); ctx.fill(); }
}
function _zijHoofd(ctx, P, cx, hy, hh, uit, t, G, fi) {
  const ink = _donker(P.huid, 0.68), r = hh * 0.5, huidS = _donker(P.huid, 0.12), haar = P.haar;
  // haar achter (bob, krul, hoofddoek, knot)
  if (P.kapsel === 'bob') { ctx.fillStyle = haar; ctx.beginPath(); ctx.moveTo(cx + r * 0.3, hy - r * 0.95); ctx.bezierCurveTo(cx - r * 1.3, hy - r * 1.05, cx - r * 1.25, hy + r * 0.6, cx - r * 0.9, hy + r * 0.85); ctx.lineTo(cx + r * 0.15, hy + r * 0.85); ctx.lineTo(cx + r * 0.1, hy - r * 0.2); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'krul') for (let k = 0; k < 12; k++) { const an = Math.PI * (0.55 + k / 11 * 1.25); circ(ctx, cx - r * 0.12 + Math.cos(an) * r * 1.02, hy - r * 0.08 + Math.sin(an) * r * 1.02, hh * 0.21, haar); }
  if (P.kapsel === 'knot') circ(ctx, cx - r * 0.85, hy - r * 0.65, hh * 0.27, haar);
  if (P.kapsel === 'hoofddoek') { ctx.fillStyle = P.doekKleur; ctx.beginPath(); ctx.moveTo(cx + r * 0.75, hy - r * 0.55); ctx.bezierCurveTo(cx + r * 0.4, hy - r * 1.45, cx - r * 1.4, hy - r * 1.3, cx - r * 1.15, hy + r * 0.3);
    ctx.quadraticCurveTo(cx - r * 1.3, hy + r * 1.6, cx - r * 0.9, hy + r * 2.0); ctx.lineTo(cx + r * 0.55, hy + r * 1.9); ctx.quadraticCurveTo(cx + r * 0.2, hy + r * 1.3, cx + r * 0.45, hy + r * 0.85); ctx.closePath(); ctx.fill(); }
  // schedel + gezicht (naar rechts): achterhoofd rond, voorhoofd, neus, kin
  ctx.fillStyle = P.huid; ctx.beginPath(); ctx.moveTo(cx - r * 0.2, hy + r * 0.95);
  ctx.bezierCurveTo(cx - r * 1.12, hy + r * 0.7, cx - r * 1.15, hy - r * 1.0, cx - r * 0.05, hy - r * 1.02);
  ctx.bezierCurveTo(cx + r * 0.62, hy - r * 1.02, cx + r * 0.86, hy - r * 0.55, cx + r * 0.84, hy - r * 0.12); // voorhoofd
  ctx.quadraticCurveTo(cx + r * 1.04, hy + r * 0.12, cx + r * 0.88, hy + r * 0.24); // neus
  ctx.quadraticCurveTo(cx + r * 0.86, hy + r * 0.42, cx + r * 0.84, hy + r * 0.55); // lip
  ctx.quadraticCurveTo(cx + r * 0.82, hy + r * 0.9, cx + r * 0.45, hy + r * 0.95); // kin
  ctx.quadraticCurveTo(cx + r * 0.1, hy + r * 1.0, cx - r * 0.2, hy + r * 0.95); ctx.fill();
  if (P.stoppels) { ctx.fillStyle = rgba(P.haar, 0.16); ctx.beginPath(); ctx.moveTo(cx - r * 0.3, hy + r * 0.3); ctx.quadraticCurveTo(cx - r * 0.2, hy + r * 0.95, cx + r * 0.45, hy + r * 0.95); ctx.quadraticCurveTo(cx + r * 0.82, hy + r * 0.9, cx + r * 0.84, hy + r * 0.62); ctx.quadraticCurveTo(cx + r * 0.3, hy + r * 0.6, cx - r * 0.3, hy + r * 0.3); ctx.fill(); }
  if (P.baard) { ctx.fillStyle = haar; ctx.beginPath(); ctx.moveTo(cx - r * 0.35, hy + r * 0.15); ctx.quadraticCurveTo(cx - r * 0.3, hy + r * 1.15, cx + r * 0.5, hy + r * 1.1); ctx.quadraticCurveTo(cx + r * 0.9, hy + r * 1.0, cx + r * 0.86, hy + r * 0.62); ctx.quadraticCurveTo(cx + r * 0.6, hy + r * 0.55, cx + r * 0.62, hy + r * 0.45); ctx.quadraticCurveTo(cx + r * 0.1, hy + r * 0.6, cx - r * 0.35, hy + r * 0.15); ctx.fill(); }
  // haar voor/boven
  ctx.fillStyle = haar;
  const kap = (nek, voorhoofd, vol = 1) => { const v = r * 0.08 * vol; ctx.beginPath(); ctx.moveTo(cx + r * 0.8, hy - r * voorhoofd);
    ctx.bezierCurveTo(cx + r * 0.95 + v, hy - r * 0.95, cx + r * 0.35, hy - r * 1.12 - v, cx - r * 0.2, hy - r * 1.1 - v);
    ctx.bezierCurveTo(cx - r * 0.85 - v, hy - r * 1.05 - v, cx - r * 1.12 - v, hy - r * 0.5, cx - r * 1.04 - v, hy + r * 0.05);
    ctx.quadraticCurveTo(cx - r * 1.0 - v, hy + r * nek * 0.75, cx - r * 0.78, hy + r * nek);
    ctx.quadraticCurveTo(cx - r * 0.5, hy + r * 0.45, cx - r * 0.42, hy + r * 0.12); ctx.quadraticCurveTo(cx - r * 0.42, hy - r * 0.32, cx - r * 0.1, hy - r * 0.38);
    ctx.quadraticCurveTo(cx + r * 0.25, hy - r * (voorhoofd + 0.12), cx + r * 0.8, hy - r * voorhoofd); ctx.closePath(); ctx.fill(); };
  if (P.kapsel === 'kort') kap(0.45, 0.55);
  if (P.kapsel === 'capuchon') { const kk = P.topKleur || '#F2F2EE', ka = P.topAccent || _donker(kk, 0.1); // capuchon (25 okt 2026): kap om schedel en nek, gezicht vrij
    const kapPad = () => { ctx.beginPath(); ctx.moveTo(cx + r * 0.62, hy - r * 0.86); ctx.bezierCurveTo(cx + r * 0.2, hy - r * 1.38, cx - r * 1.32, hy - r * 1.3, cx - r * 1.3, hy + r * 0.1);
      ctx.quadraticCurveTo(cx - r * 1.32, hy + r * 1.2, cx - r * 1.1, hy + r * 1.95); ctx.lineTo(cx + r * 0.42, hy + r * 1.9); ctx.quadraticCurveTo(cx + r * 0.52, hy + r * 1.3, cx + r * 0.42, hy + r * 0.95);
      ctx.quadraticCurveTo(cx + r * 0.12, hy + r * 0.62, cx + r * 0.14, hy + r * 0.05); ctx.quadraticCurveTo(cx + r * 0.18, hy - r * 0.58, cx + r * 0.62, hy - r * 0.86); ctx.closePath(); };
    ctx.fillStyle = kk; kapPad(); ctx.fill(); ctx.save(); kapPad(); ctx.clip(); ctx.fillStyle = ka; ctx.beginPath(); ctx.ellipse(cx - r * 1.25, hy + r * 0.2, r * 0.4, r * 1.8, 0, 0, 6.283); ctx.fill(); ctx.restore();
    ctx.strokeStyle = ka; ctx.lineWidth = Math.max(1.4, hh * 0.06); ctx.beginPath(); ctx.moveTo(cx + r * 0.62, hy - r * 0.86); ctx.quadraticCurveTo(cx + r * 0.18, hy - r * 0.58, cx + r * 0.14, hy + r * 0.05); ctx.quadraticCurveTo(cx + r * 0.12, hy + r * 0.62, cx + r * 0.42, hy + r * 0.95); ctx.stroke(); }
  if (P.kapsel === 'krul') { kap(0.55, 0.5, 2); for (let k = 0; k < 6; k++) { const an = Math.PI * (1.05 + k / 5 * 0.75); circ(ctx, cx + Math.cos(an) * r * 0.85, hy - r * 0.1 + Math.sin(an) * r * 0.85, hh * 0.17, haar); } }
  if (P.kapsel === 'pony' || P.zijpony) { kap(0.6, 0.38); ctx.beginPath(); ctx.moveTo(cx + r * 0.15, hy - r * 0.9); ctx.quadraticCurveTo(cx + r * 0.85, hy - r * 0.75, cx + r * 0.82, hy - r * 0.32); ctx.quadraticCurveTo(cx + r * 0.4, hy - r * 0.45, cx + r * 0.05, hy - r * 0.35); ctx.closePath(); ctx.fill(); }
  if (P.kapsel === 'golf' && !P.zijpony) kap(0.8, 0.5);
  if (P.kapsel === 'staart' || P.kapsel === 'knot' || P.kapsel === 'vlecht') { kap(0.5, 0.55); if (P.kapsel === 'staart') { ctx.fillStyle = P.elastiek || _donker(haar, 0.35); circ(ctx, cx - r * 0.95, hy - r * 0.55, hh * 0.06, ctx.fillStyle); } }
  if (P.kapsel === 'bob') kap(0.9, 0.45);
  if (P.kapsel === 'kalend') { ctx.beginPath(); ctx.moveTo(cx - r * 0.55, hy - r * 0.62); ctx.quadraticCurveTo(cx - r * 1.08, hy - r * 0.45, cx - r * 1.04, hy + r * 0.1);
    ctx.quadraticCurveTo(cx - r * 1.0, hy + r * 0.5, cx - r * 0.72, hy + r * 0.62); ctx.quadraticCurveTo(cx - r * 0.5, hy + r * 0.4, cx - r * 0.45, hy + r * 0.1); ctx.quadraticCurveTo(cx - r * 0.4, hy - r * 0.2, cx - r * 0.12, hy - r * 0.25);
    ctx.quadraticCurveTo(cx - r * 0.5, hy - r * 0.35, cx - r * 0.55, hy - r * 0.62); ctx.fill(); }
  if (P.kapsel === 'hoofddoek') { ctx.fillStyle = P.doekKleur; ctx.beginPath(); ctx.moveTo(cx + r * 0.78, hy - r * 0.5); ctx.bezierCurveTo(cx + r * 0.6, hy - r * 1.3, cx - r * 1.2, hy - r * 1.25, cx - r * 1.1, hy + r * 0.2); ctx.lineTo(cx - r * 0.2, hy + r * 0.6); ctx.quadraticCurveTo(cx + r * 0.1, hy - r * 0.6, cx + r * 0.78, hy - r * 0.5); ctx.fill(); }
  // oor
  if (P.kapsel !== 'hoofddoek' && P.kapsel !== 'capuchon') { ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(cx - r * 0.18, hy + r * 0.1, r * 0.17, r * 0.24, 0.15, 0, 6.283); ctx.fill(); ctx.strokeStyle = _donker(P.huid, 0.25); ctx.lineWidth = Math.max(1, hh * 0.025); ctx.beginPath(); ctx.arc(cx - r * 0.18, hy + r * 0.1, r * 0.1, -1.2, 1.4); ctx.stroke();
    if (P.accessoire.includes('oorbel')) circ(ctx, cx - r * 0.16, hy + r * 0.38, hh * 0.045, '#E0B64A'); }
  // gezicht
  const E = { neutraal: [0, 'glim'], blij: [0.02, 'lach'], lacht: [0.04, 'open'], verbaasd: [0.07, 'o'], denkt: [0.03, 'scheef'], bezorgd: [-0.02, 'zuur'], ernstig: [0.015, 'recht'], praat: [0.01, Math.sin(t * 11) > 0 ? 'open' : 'glim'], slaapt: [-0.01, 'glim'], moe: [-0.03, 'glim'] }[uit] || [0, 'glim'];
  if (G && G !== GANG.loop && uit === 'neutraal') E[1] = 'open';
  const ex = cx + r * 0.5, ey = hy - r * 0.08;
  ctx.strokeStyle = P.wenkbrauw; ctx.lineWidth = Math.max(1.4, hh * 0.05); ctx.beginPath(); ctx.moveTo(ex - r * 0.18, ey - r * (0.3 + E[0] * 2)); ctx.quadraticCurveTo(ex + r * 0.05, ey - r * (0.4 + E[0] * 2), ex + r * 0.24, ey - r * (0.3 + E[0] * 2)); ctx.stroke();
  if (uit === 'slaapt') { ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.4, hh * 0.035); ctx.beginPath(); ctx.arc(ex + r * 0.03, ey, r * 0.13, 0.4, 2.6); ctx.stroke(); }
  else { ctx.fillStyle = '#FBF8F2'; ctx.beginPath(); ctx.ellipse(ex + r * 0.04, ey + r * 0.02, r * 0.13, r * (uit === 'verbaasd' ? 0.17 : 0.13), 0, 0, 6.283); ctx.fill();
    circ(ctx, ex + r * 0.1, ey + r * 0.03, r * 0.1, P.oog || ink); if (P.oog) circ(ctx, ex + r * 0.11, ey + r * 0.03, r * 0.055, ink); circ(ctx, ex + r * 0.13, ey - r * 0.01, r * 0.035, '#FFFFFF');
    if (uit === 'moe') { ctx.fillStyle = P.huid; ctx.fillRect(ex - r * 0.12, ey - r * 0.16, r * 0.32, r * 0.14); } }
  if (P.wimpers) { ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1.2, hh * 0.03); ctx.beginPath(); ctx.moveTo(ex + r * 0.15, ey - r * 0.08); ctx.lineTo(ex + r * 0.26, ey - r * 0.17); ctx.stroke(); }
  if (P.accessoire.includes('sproeten')) for (let k = 0; k < 4; k++) circ(ctx, ex + r * (0.1 + (k % 2) * 0.12), ey + r * (0.28 + (k > 1 ? 0.08 : 0)), hh * 0.018, _donker(P.huid, 0.25));
  circ(ctx, ex + r * 0.05, hy + r * 0.4, r * 0.15, rgba('#E07A5F', 0.16));
  // mondkapje (25 okt 2026): van neusrug tot kin, geen mond
  const masker = P.accessoire.includes('mondkapje');
  if (masker) { ctx.fillStyle = _MASKER; ctx.beginPath(); ctx.moveTo(cx + r * 0.3, hy + r * 0.16); ctx.lineTo(cx + r * 0.88, hy + r * 0.1); ctx.quadraticCurveTo(cx + r * 1.12, hy + r * 0.22, cx + r * 1.02, hy + r * 0.5);
    ctx.quadraticCurveTo(cx + r * 0.98, hy + r * 0.92, cx + r * 0.55, hy + r * 1.0); ctx.quadraticCurveTo(cx + r * 0.3, hy + r * 0.95, cx + r * 0.28, hy + r * 0.8); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = _donker(_MASKER, 0.14); ctx.lineWidth = Math.max(1, hh * 0.025); for (const yy of [0.38, 0.58, 0.78]) { ctx.beginPath(); ctx.moveTo(cx + r * 0.34, hy + r * yy); ctx.quadraticCurveTo(cx + r * 0.7, hy + r * (yy + 0.04), cx + r * 0.98, hy + r * (yy - 0.02)); ctx.stroke(); }
    ctx.strokeStyle = '#9AA3B2'; ctx.lineWidth = Math.max(1, hh * 0.03); ctx.beginPath(); ctx.moveTo(cx + r * 0.3, hy + r * 0.3); ctx.lineTo(cx + r * 0.12, hy + r * 0.25); ctx.stroke(); } // bandje naar de kap
  const mx = cx + r * 0.72, my = hy + r * 0.52; ctx.strokeStyle = P.lippen || ink; ctx.lineWidth = Math.max(1.4, hh * 0.04); ctx.beginPath();
  if (masker) { }
  else if (E[1] === 'open' || E[1] === 'o') { ctx.fillStyle = '#5A2A2A'; ctx.beginPath(); ctx.ellipse(mx + r * 0.02, my, r * 0.09, r * (E[1] === 'o' ? 0.11 : 0.08), 0, 0, 6.283); ctx.fill(); }
  else if (E[1] === 'lach') { ctx.arc(mx - r * 0.08, my - r * 0.06, r * 0.14, 0.2, 1.5); ctx.stroke(); }
  else if (E[1] === 'recht') { ctx.moveTo(mx - r * 0.12, my); ctx.lineTo(mx + r * 0.06, my); ctx.stroke(); }
  else if (E[1] === 'zuur') { ctx.moveTo(mx - r * 0.12, my + r * 0.02); ctx.lineTo(mx + r * 0.06, my - r * 0.02); ctx.stroke(); }
  else { ctx.moveTo(mx - r * 0.14, my); ctx.quadraticCurveTo(mx - r * 0.04, my + r * 0.05, mx + r * 0.06, my - r * 0.01); ctx.stroke(); }
  // bril
  if (P.accessoire.includes('bril') || P.veiligheidsbril) { const vb = !!P.veiligheidsbril; ctx.strokeStyle = vb ? 'rgba(190,220,235,0.9)' : '#2A2F3E'; ctx.lineWidth = Math.max(1.4, hh * 0.04);
    if (vb) { ctx.fillStyle = 'rgba(190,220,235,0.35)'; ctx.beginPath(); ctx.ellipse(ex + r * 0.12, ey + r * 0.02, r * 0.26, r * 0.2, 0, 0, 6.283); ctx.fill(); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(ex + r * 0.3, ey - r * 0.12); ctx.lineTo(ex + r * 0.3, ey + r * 0.16); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(ex + r * 0.28, ey - r * 0.08); ctx.lineTo(cx - r * 0.12, hy - r * 0.05); ctx.stroke(); }
  return { x: cx, y: hy };
}
