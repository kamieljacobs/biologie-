// ===== Vaste personages — Biologie bij Kamiel (15 okt 2026) =====
// Zes vaste mensen die in alle films terugkomen. Vlak getekend (Part C: geen omlijning, één schaduwtint), warm en herkenbaar.
// Gebruik:  persoon(ctx, 'noor', x, y, h, { uit: 'blij', pose: 'wijs', a: 1, kijk: 1, t })
//   x, y = midden tussen de voeten op de grond · h = lengte in px · uit = gezichtsuitdrukking · pose = houding · kijk = -1/1 kijkrichting
//   Geeft ankerpunten terug: { hoofd:{x,y,r}, handR, handL, heup } voor pijlen, labels en vastgehouden voorwerpen.
// Uitdrukkingen: neutraal, blij, lacht, verbaasd, denkt, bezorgd, praat (mond open/dicht op t), slaapt (ogen dicht), moe (half dichte ogen)
// Houdingen: staan, zwaai, wijs, wijsOmhoog, denk, schouders, handenHeup, vasthouden (o.hold(ctx,x,y) tekent iets in de rechterhand)
// Zijaanzicht (21 okt 2026): { zij: true, kijk: 1|-1, gang: 'loop'|'ren', t (of fase 0..1), tempo } — van opzij, lopend of rennend; zie _zij onderaan

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
              practicum: { top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#B23A3A', veiligheidsbril: true } } },
  kim:    { naam: 'Dr. Kim', leeftijd: 42, rol: 'arts en onderzoeker · legt uit in lab en spreekkamer', huid: '#E6C09C', haar: '#1A1418', kapsel: 'golf', golfLang: 0.3, zijpony: true, wimpers: true, lippen: '#B4544C', wenkbrauw: '#1A1418',
            top: 'labjas', topKleur: '#F2F2EE', topAccent: '#D4D8DE', binnen: '#3E8E9A', broek: '#2A3242', schoen: '#2A2F3E', schoenAccent: '#3E8E9A', accessoire: ['stethoscoop', 'oorbel'], lengte: 1.02,
            garderobe: { werk: {}, gewoon: { top: 'jasje', topKleur: '#3E5C7A', topAccent: '#324B64', binnen: '#E8E2D4', accessoire: ['oorbel'] }, lab: { accessoire: ['oorbel'] } } }, // gewoon (20 okt 2026): zonder labjas, bv. als pedagoog
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
            top: 'trui', topKleur: '#8A5A3A', topAccent: '#744A30', broek: '#33415C', schoen: '#4A3A2E', schoenAccent: '#2E241C', accessoire: ['bril'], lengte: 1.0 }
};
// families en vaste verbanden (getekend op de castboekpagina 'Families'); ouders: [vader, moeder]
const CAST_FAMILIE = {
  noor:   { ouders: ['rachid', 'linda'], broerzus: ['kind'] },
  kind:   { ouders: ['rachid', 'linda'] },
  linda:  { ouders: ['henk', 'ria'], partner: 'rachid', broerzus: ['petra'] },
  petra:  { ouders: ['henk', 'ria'] },
  rachid: { ouders: ['ahmed', 'malika'] },
  henk:   { partner: 'ria' }, ahmed: { partner: 'malika' },
  yasmin: { broerzus: ['bilal'] }, daan: { tweeling: 'thijs' }
};
const CAST_EXTRA = ['linda', 'rachid', 'ria', 'ahmed', 'malika', 'petra', 'thijs', 'erik', 'joost'];
const CAST_VOLGORDE = ['noor', 'sam', 'lotte', 'daan', 'yasmin', 'bilal', 'kim', 'henk', 'visser', 'ravi', 'jesse', 'femke', 'mirjam', 'esra', 'mila', 'gerrit', 'wouter', 'ilse'];
const CAST_JONG = ['kind', 'baby']; // jonge personages (20 okt 2026): Teun (± 6 jaar) en een baby

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
  vasthouden: { R: [0.55, 1.55], L: [0.14, 0.06] }
};

function persoon(ctx, id, x, y, h, o = {}) {
  const P0 = CAST[id]; if (!P0) return {}; const P = Object.assign({}, P0, (P0.garderobe && o.outfit && P0.garderobe[o.outfit]) || {}); const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {};
  const t = o.t || 0, uit = o.uit || 'neutraal', pose = POSES[o.pose || 'staan'] || POSES.staan, kijk = o.kijk || 1;
  h *= P.lengte || 1; if (P.baby) return _baby(ctx, P, x, y, h, a, uit, o);
  if (o.zij) return _zij(ctx, P, x, y, h, a, o); // zijaanzicht (21 okt 2026)
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const hh = h / (P.kop || 6.1), top = y - h, cx = x + (P.krom ? hh * 0.15 : 0);
  const hoofdY = top + hh * 0.55, schouderY = top + hh * 1.42, tailleY = top + hh * 3.0, heupY = top + hh * 3.45, voetY = y;
  const sw = hh * (P.schouderK || (P.leeftijd > 30 ? 1.95 : 1.8)), hw2 = hh * (P.heupK || 1.45); const huidS = _donker(P.huid, 0.12);
  const ink = _donker(P.huid, 0.68);
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
  for (const s of [-1, 1]) {
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
  const arm = (s, cfg) => { const [a1, a2] = cfg; const L1 = hh * 1.32 * (P.armK || 1), L2 = hh * 1.2 * (P.armK || 1), sx = cx + s * sw * 0.4, sy = schouderY + hh * 0.25;
    const ex = sx + s * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1, hx = ex + s * Math.sin(a2) * L2, hy = ey + Math.cos(a2) * L2;
    const mouw = P.top === 'labjas' ? (s < 0 ? P.topKleur : P.topAccent) : (s < 0 ? P.topKleur : P.topAccent);
    ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.27; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    const kort = P.top === 'hoodie' || P.top === 'trui' || P.top === 'vest' || P.top === 'labjas' || P.top === 'jasje' || P.top === 'overhemd' || P.top === 'jas';
    if (P.top === 'tshirt') { ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.29; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = mouw; ctx.lineWidth = hh * 0.46; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + (ex - sx) * 0.45, sy + (ey - sy) * 0.45); ctx.stroke(); }
    if (P.top !== 'tshirt') { ctx.strokeStyle = mouw; ctx.lineWidth = hh * 0.42; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); } if (kort) ctx.lineTo(ex + (hx - ex) * 0.72, ey + (hy - ey) * 0.72); if (P.top !== 'tshirt') ctx.stroke();
    if (kort) { ctx.strokeStyle = _donker(mouw, 0.12); ctx.lineWidth = hh * 0.44; ctx.beginPath(); ctx.moveTo(ex + (hx - ex) * 0.66, ey + (hy - ey) * 0.66); ctx.lineTo(ex + (hx - ex) * 0.74, ey + (hy - ey) * 0.74); ctx.stroke(); }
    const ang = Math.atan2(hy - ey, hx - ex); ctx.fillStyle = P.huid; ctx.beginPath(); ctx.ellipse(hx + Math.cos(ang) * hh * 0.08, hy + Math.sin(ang) * hh * 0.08, hh * 0.19, hh * 0.15, ang, 0, 6.283); ctx.fill();
    if (Math.abs(a2 - a1) > 1.2 || a2 > 1.3) { ctx.strokeStyle = P.huid; ctx.lineWidth = hh * 0.08; ctx.beginPath(); ctx.moveTo(hx + Math.cos(ang) * hh * 0.18, hy + Math.sin(ang) * hh * 0.18); ctx.lineTo(hx + Math.cos(ang) * hh * 0.36, hy + Math.sin(ang) * hh * 0.36); ctx.stroke(); }
    return { x: hx + Math.cos(ang) * hh * 0.12, y: hy + Math.sin(ang) * hh * 0.12, ang }; };
  let R = pose.R.slice(), L = pose.L.slice();
  if (o.pose === 'zwaai') R[1] += 0.25 * Math.sin(t * 7);
  if (kijk < 0) [R, L] = [L, R];
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
  // oren
  if (P.kapsel !== 'hoofddoek') for (const s of [-1, 1]) { ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(cx + s * fw * 0.5, hy + hh * 0.05, hh * 0.1, hh * 0.13, 0, 0, 6.283); ctx.fill(); }
  if (P.accessoire.includes('oorbel')) circ(ctx, cx - fw * 0.5, hy + hh * 0.2, hh * 0.045, '#E0B64A');
  // gezicht: zacht ei met iets smallere kin
  ctx.fillStyle = P.huid; ctx.beginPath(); ctx.moveTo(cx + ax, hy - hh * 0.5);
  ctx.bezierCurveTo(cx + ax + fw * 0.3, hy - hh * 0.5, cx + ax + fw * 0.5, hy - hh * 0.3, cx + ax + fw * 0.5, hy);
  ctx.bezierCurveTo(cx + ax + fw * 0.5, hy + hh * 0.3, cx + ax + fw * 0.25, hy + hh * 0.5, cx + ax, hy + hh * 0.52);
  ctx.bezierCurveTo(cx + ax - fw * 0.25, hy + hh * 0.5, cx + ax - fw * 0.5, hy + hh * 0.3, cx + ax - fw * 0.5, hy);
  ctx.bezierCurveTo(cx + ax - fw * 0.5, hy - hh * 0.3, cx + ax - fw * 0.3, hy - hh * 0.5, cx + ax, hy - hh * 0.5); ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = _donker(P.huid, 0.06); ctx.beginPath(); ctx.ellipse(cx + ax - kijk * fw * 0.58, hy, fw * 0.25, hh * 0.7, 0, 0, 6.283); ctx.fill(); ctx.restore();
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
  const E = { neutraal: [0, 0, 'glim'], blij: [0.02, 0, 'lach'], lacht: [0.04, 0, 'open'], verbaasd: [0.07, 0, 'o'], denkt: [0.03, -0.06, 'scheef'], bezorgd: [-0.02, 0.07, 'zuur'], praat: [0.01, 0, Math.sin(t * 11) > 0 ? 'open' : 'glim'], slaapt: [-0.01, 0, 'glim'], moe: [-0.03, 0.04, 'glim'] }[uit] || [0, 0, 'glim'];
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
  const my = ey0 + hh * 0.3; ctx.strokeStyle = P.lippen || ink; ctx.fillStyle = _donker(P.huid, 0.6); ctx.lineWidth = Math.max(1.4, hh * (P.lippen ? 0.045 : 0.035));
  if (mond === 'glim') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.12, my); ctx.quadraticCurveTo(ex0, my + hh * 0.05, ex0 + fw * 0.12, my); ctx.stroke(); }
  if (mond === 'lach') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.16, my - hh * 0.01); ctx.quadraticCurveTo(ex0, my + hh * 0.11, ex0 + fw * 0.16, my - hh * 0.01); ctx.stroke(); }
  if (mond === 'open') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.15, my - hh * 0.01); ctx.quadraticCurveTo(ex0, my + hh * 0.17, ex0 + fw * 0.15, my - hh * 0.01); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#FBF8F2'; ctx.fillRect(ex0 - fw * 0.1, my - hh * 0.005, fw * 0.2, hh * 0.03); }
  if (mond === 'o') { ctx.beginPath(); ctx.ellipse(ex0, my + hh * 0.03, fw * 0.06, hh * 0.07, 0, 0, 6.283); ctx.fill(); }
  if (mond === 'scheef') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.1, my + hh * 0.02); ctx.quadraticCurveTo(ex0 + fw * 0.02, my + hh * 0.03, ex0 + fw * 0.13, my - hh * 0.02); ctx.stroke(); }
  if (mond === 'zuur') { ctx.beginPath(); ctx.moveTo(ex0 - fw * 0.11, my + hh * 0.04); ctx.quadraticCurveTo(ex0, my - hh * 0.02, ex0 + fw * 0.11, my + hh * 0.04); ctx.stroke(); }
  if (P.baard) { ctx.fillStyle = P.haar; ctx.beginPath(); ctx.ellipse(ex0, my - hh * 0.07, fw * 0.2, hh * 0.05, 0, Math.PI, 0); ctx.fill(); }
  ctx.restore();
  return { hoofd: { x: cx, y: hy, r: hh * 0.55 }, handR, handL, heup: { x: cx, y: heupY }, top: hy - hh * 0.75 };
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
  const hh = h / (P.kop || 6.1), top = y - h;
  const fEff = G ? G.f * tempo : 1, fase = G ? (o.fase != null ? o.fase : t * fEff) : 0, fi = fase * 6.2832;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (kijk < 0) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
  const hoofdY0 = top + hh * 0.55, schouderY0 = top + hh * 1.42, heupY0 = top + hh * 3.45, voetY = y;
  const hw = hh * (P.heupK || 1.45) * 0.62, d = hh * (P.schouderK ? P.schouderK * 0.68 : 1.25); // diepte van romp (zij)
  const Lb = voetY - heupY0 - hh * 0.22, L1 = Lb * 0.5, L2 = Lb * 0.5;
  // --- benen: pose per been uit de gangcyclus (B1 = been aan de kant van de kijker)
  const fr = (q) => ((q % 1) + 1) % 1, p1 = fr(fase), p2 = fr(fase + 0.5);
  let B1 = _beenPose(G, p1, L1, L2, hh), B2 = _beenPose(G, p2, L1, L2, hh);
  // --- heuphoogte: steunvoet op de grond; in de zweeffase een worp (zwaartekracht) tussen afzet en landing
  const duty = G ? G.duty : 1, steun = (B) => B.p < duty;
  let heupY;
  if (!G) heupY = voetY - Math.max(B1.low, B2.low);
  else if (steun(B1) || steun(B2)) heupY = Math.min(steun(B1) ? voetY - B1.low : 1e9, steun(B2) ? voetY - B2.low : 1e9);
  else { const L = B1.p >= duty && B1.p < 0.5 ? B1 : B2, Tf = (0.5 - duty) / fEff, tau = (L.p - duty) / fEff;
    const yTO = voetY - _beenPose(G, duty, L1, L2, hh).low, yIC = voetY - _beenPose(G, 0, L1, L2, hh).low, g = 9.81 * (h / 1.7) * (G.zweef || 1);
    heupY = yTO + (yIC - yTO) * tau / Tf - 0.5 * g * tau * (Tf - tau); }
  // zwaaivoet nooit door de grond: tenen iets optrekken
  for (const k of [1, 2]) { let B = k === 1 ? B1 : B2; if (G && !steun(B)) for (let e = 0; e < 10 && heupY + B.low > voetY - hh * 0.03; e++) B = _beenPose(G, B.p, L1, L2, hh, (e + 1) * 5); if (k === 1) B1 = B; else B2 = B; }
  // --- vooruit (o.vooruit): x is het startpunt; tijdens de steunfase staat de steunvoet stil op de grond
  let cx = x;
  if (G && o.vooruit) { const sEnd = Math.min(duty, 0.5), c0 = _beenPose(G, 0, L1, L2, hh).ballX, v = (c0 - _beenPose(G, sEnd, L1, L2, hh).ballX) * fEff / sEnd;
    const S = [B1, B2].filter(B => B.p < sEnd).sort((p, q) => p.p - q.p)[0]; const dl = S ? (c0 - S.ballX) - v * S.p / fEff : 0; cx = x + v * t + dl; }
  const dy = heupY - heupY0, lean = G ? G.leun * Math.PI / 180 : 0;
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
    if (o.pose === 'zak') return [-0.15, -0.35];
    return [0.04 * kant, 0.12]; };
  const tekenArm = (B, kant) => { const [u, e] = armHoek(B, kant); const [sx, sy] = rot(sx0, sy0);
    const ex = sx + Math.sin(u + lean) * A1, ey = sy + Math.cos(u + lean) * A1, f = u + lean + e, hx = ex + Math.sin(f) * A2, hy = ey + Math.cos(f) * A2;
    const ver = kant < 0, lang = P.top !== 'tshirt';
    // dichtbije arm: mouw iets lichter dan het shirt en een donkere rand, zodat de arm loskomt van de romp (Kamiel 22 okt 2026)
    const mouw = ver ? _donker(P.top === 'labjas' ? P.topKleur : (P.topAccent || P.topKleur), 0.16) : _licht(P.topKleur, 0.1), hu = ver ? _donker(P.huid, 0.14) : P.huid;
    const rand = ver ? null : rgba('#0B1020', 0.55), rw = hh * 0.07;
    const huidPad = () => { ctx.beginPath(); ctx.moveTo(lang ? ex + (hx - ex) * 0.6 : sx + (ex - sx) * 0.4, lang ? ey + (hy - ey) * 0.6 : sy + (ey - sy) * 0.4); if (!lang) ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); };
    const mouwPad = () => { ctx.beginPath(); ctx.moveTo(sx, sy); if (lang) { ctx.lineTo(ex, ey); ctx.lineTo(ex + (hx - ex) * 0.72, ey + (hy - ey) * 0.72); } else ctx.lineTo(sx + (ex - sx) * 0.5, sy + (ey - sy) * 0.5); };
    const handPad = () => { ctx.beginPath(); ctx.ellipse(hx + Math.sin(f) * hh * 0.07, hy + Math.cos(f) * hh * 0.07, hh * 0.17, hh * 0.2, -f, 0, 6.283); };
    const wMouw = hh * (lang ? 0.4 : 0.44), wHuid = hh * 0.27;
    if (rand) { ctx.strokeStyle = rand; ctx.lineWidth = wHuid + rw; huidPad(); ctx.stroke(); ctx.lineWidth = wMouw + rw; mouwPad(); ctx.stroke(); ctx.lineWidth = rw; handPad(); ctx.stroke(); }
    ctx.strokeStyle = hu; ctx.lineWidth = wHuid; huidPad(); ctx.stroke();
    ctx.strokeStyle = mouw; ctx.lineWidth = wMouw; mouwPad(); ctx.stroke();
    if (lang) { ctx.strokeStyle = ver ? _donker(P.top === 'labjas' ? P.topKleur : (P.topAccent || P.topKleur), 0.3) : _donker(P.topKleur, 0.06); ctx.lineWidth = hh * 0.42; ctx.beginPath(); ctx.moveTo(ex + (hx - ex) * 0.66, ey + (hy - ey) * 0.66); ctx.lineTo(ex + (hx - ex) * 0.74, ey + (hy - ey) * 0.74); ctx.stroke(); }
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
  const sY = schouderY0 + dy, tY = top + hh * 3.0 + dy, onder = heupY + hh * (P.top === 'labjas' ? 0.95 : P.top === 'jas' ? 0.45 : 0.24);
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
  ctx.strokeStyle = huidS; ctx.lineWidth = hh * 0.32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(nx, ny + hh * 0.05); ctx.lineTo(hcx - hh * 0.04, hy + hh * 0.35); ctx.stroke();
  if (P.top === 'hoodie') { ctx.fillStyle = P.topAccent; ctx.beginPath(); ctx.moveTo(nx - hh * 0.12, ny - hh * 0.12); ctx.quadraticCurveTo(nx - d * 0.62, ny - hh * 0.1, nx - d * 0.55, ny + hh * 0.55); ctx.quadraticCurveTo(nx - d * 0.3, ny + hh * 0.3, nx + hh * 0.05, ny + hh * 0.05); ctx.closePath(); ctx.fill(); }
  if (P.top === 'overhemd') { ctx.fillStyle = _licht(P.topKleur, 0.15); ctx.beginPath(); ctx.moveTo(nx - hh * 0.2, ny - hh * 0.05); ctx.lineTo(nx + hh * 0.22, ny - hh * 0.02); ctx.lineTo(nx + hh * 0.1, ny + hh * 0.25); ctx.closePath(); ctx.fill(); }
  if (P.accessoire.includes('stethoscoop')) { ctx.strokeStyle = '#3A3F4E'; ctx.lineWidth = hh * 0.05; ctx.beginPath(); ctx.moveTo(nx - hh * 0.15, ny); ctx.quadraticCurveTo(nx + hh * 0.35, ny + hh * 0.7, nx + hh * 0.3, ny + hh * 1.05); ctx.stroke(); circ(ctx, nx + hh * 0.3, ny + hh * 1.1, hh * 0.09, '#9AA3B2'); }
  const H = _zijHoofd(ctx, P, hcx, hy, hh, uit, t, G, fi);
  ctx.restore();
  const m = (p) => kijk < 0 ? { ...p, x: 2 * x - p.x } : p;
  return { hoofd: m({ x: hcx, y: hy, r: hh * 0.55 }), handR: m(hand1), handL: m(hand2 || hand1), heup: m({ x: cx, y: heupY }), voet: m(voet1), x: kijk < 0 ? 2 * x - cx : cx };
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
  if (P.kapsel !== 'hoofddoek') { ctx.fillStyle = huidS; ctx.beginPath(); ctx.ellipse(cx - r * 0.18, hy + r * 0.1, r * 0.17, r * 0.24, 0.15, 0, 6.283); ctx.fill(); ctx.strokeStyle = _donker(P.huid, 0.25); ctx.lineWidth = Math.max(1, hh * 0.025); ctx.beginPath(); ctx.arc(cx - r * 0.18, hy + r * 0.1, r * 0.1, -1.2, 1.4); ctx.stroke();
    if (P.accessoire.includes('oorbel')) circ(ctx, cx - r * 0.16, hy + r * 0.38, hh * 0.045, '#E0B64A'); }
  // gezicht
  const E = { neutraal: [0, 'glim'], blij: [0.02, 'lach'], lacht: [0.04, 'open'], verbaasd: [0.07, 'o'], denkt: [0.03, 'scheef'], bezorgd: [-0.02, 'zuur'], praat: [0.01, Math.sin(t * 11) > 0 ? 'open' : 'glim'], slaapt: [-0.01, 'glim'], moe: [-0.03, 'glim'] }[uit] || [0, 'glim'];
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
  // mond
  const mx = cx + r * 0.72, my = hy + r * 0.52; ctx.strokeStyle = P.lippen || ink; ctx.lineWidth = Math.max(1.4, hh * 0.04); ctx.beginPath();
  if (E[1] === 'open' || E[1] === 'o') { ctx.fillStyle = '#5A2A2A'; ctx.beginPath(); ctx.ellipse(mx + r * 0.02, my, r * 0.09, r * (E[1] === 'o' ? 0.11 : 0.08), 0, 0, 6.283); ctx.fill(); }
  else if (E[1] === 'lach') { ctx.arc(mx - r * 0.08, my - r * 0.06, r * 0.14, 0.2, 1.5); ctx.stroke(); }
  else if (E[1] === 'zuur') { ctx.moveTo(mx - r * 0.12, my + r * 0.02); ctx.lineTo(mx + r * 0.06, my - r * 0.02); ctx.stroke(); }
  else { ctx.moveTo(mx - r * 0.14, my); ctx.quadraticCurveTo(mx - r * 0.04, my + r * 0.05, mx + r * 0.06, my - r * 0.01); ctx.stroke(); }
  // bril
  if (P.accessoire.includes('bril') || P.veiligheidsbril) { const vb = !!P.veiligheidsbril; ctx.strokeStyle = vb ? 'rgba(190,220,235,0.9)' : '#2A2F3E'; ctx.lineWidth = Math.max(1.4, hh * 0.04);
    if (vb) { ctx.fillStyle = 'rgba(190,220,235,0.35)'; ctx.beginPath(); ctx.ellipse(ex + r * 0.12, ey + r * 0.02, r * 0.26, r * 0.2, 0, 0, 6.283); ctx.fill(); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(ex + r * 0.3, ey - r * 0.12); ctx.lineTo(ex + r * 0.3, ey + r * 0.16); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(ex + r * 0.28, ey - r * 0.08); ctx.lineTo(cx - r * 0.12, hy - r * 0.05); ctx.stroke(); }
  return { x: cx, y: hy };
}

// ---------- algemene hulpjes ----------
function fadeIO(t,a,b,d=0.5){ return ramp(t,a,d)*(1-ramp(t,b,d)); }
function dot(ctx,x,y,r,fill,stroke,lw=1.2){ ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fillStyle=fill; ctx.fill(); if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } }
function arrow(ctx,x1,y1,x2,y2,color,lw=4,head=16,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw; ctx.lineCap='round';
  const a=Math.atan2(y2-y1,x2-x1), bx=x2-Math.cos(a)*head*0.8, by=y2-Math.sin(a)*head*0.8; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(bx,by); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2,y2); ctx.lineTo(x2-Math.cos(a-0.45)*head,y2-Math.sin(a-0.45)*head); ctx.lineTo(x2-Math.cos(a+0.45)*head,y2-Math.sin(a+0.45)*head); ctx.closePath(); ctx.fill(); ctx.restore(); }
function crossOut(ctx,x,y,s,alpha=1){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.strokeStyle=C.koraal; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-s,y-s); ctx.lineTo(x+s,y+s); ctx.moveTo(x+s,y-s); ctx.lineTo(x-s,y+s); ctx.stroke(); ctx.restore(); }
function pill(ctx,x,y,s,color=C.goud,alpha=1,size=30){ if(alpha<=0.01) return; ctx.save(); ctx.globalAlpha*=alpha; ctx.font=fTekst(size,600); const w=ctx.measureText(s).width+44; roundRect(ctx,x-w/2,y-size*0.95,w,size*1.65,size*0.8); shape(ctx,rgba(C.bgSchema,0.94),color,1.5); text(ctx,s,x,y+size*0.32,fTekst(size,600),color,'center'); ctx.restore(); }
function wrap(ctx, s, x, y, maxW, lh){ const words=s.split(' '); let line=''; for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; } if(line) ctx.fillText(line,x,y); return y; }
function alpha(ctx,a,fn){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; fn(); ctx.restore(); }
function chips(ctx,items,y){ // row of term chips, centred; items: [label, alpha, color]
  ctx.save(); ctx.font=fTekst(32,600); const ws=items.map(i=>ctx.measureText(i[0]).width+48); const gap=18; const tot=ws.reduce((a,b)=>a+b,0)+gap*(items.length-1); let x=W/2-tot/2;
  items.forEach((it,i)=>{ const a=it[1]; if(a>0.01){ ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x,y-34,ws[i],58,29); shape(ctx,rgba(C.bgSchema,0.94),it[2]||C.text,1.5); text(ctx,it[0],x+ws[i]/2,y+6,fTekst(32,600),it[2]||C.text,'center'); ctx.restore(); }
    else { ctx.save(); ctx.setLineDash([6,6]); roundRect(ctx,x,y-34,ws[i],58,29); ctx.strokeStyle=rgba(C.line,0.35); ctx.lineWidth=1; ctx.stroke(); ctx.restore(); }
    x+=ws[i]+gap; }); ctx.restore(); }
function inset(cx,cy,r,a,fn){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,6.283); ctx.clip(); ctx.fillStyle=C.bgSchema; ctx.fillRect(cx-r,cy-r,2*r,2*r); fn(); ctx.restore(); ctx.beginPath(); ctx.arc(cx,cy,r,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
function human(ctx,x,y,h,a=1,color=C.mens){ ctx.save(); ctx.globalAlpha*=a; ctx.fillStyle=color; const u=h/8;
  ctx.beginPath(); ctx.arc(x,y-h+u,u*0.9,0,6.283); ctx.fill();
  roundRect(ctx,x-u*1.3,y-h+u*2.1,u*2.6,u*3.6,u*0.8); ctx.fill();
  roundRect(ctx,x-u*1.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill(); roundRect(ctx,x+u*0.2,y-h+u*5.5,u*1.0,u*2.5,u*0.4); ctx.fill();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x-u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.arc(x+u*0.3,y-h+u*0.9,u*0.09,0,6.283); ctx.fill();
  ctx.strokeStyle=C.bgSchema; ctx.lineWidth=u*0.08; ctx.beginPath(); ctx.arc(x,y-h+u*1.1,u*0.3,0.3,2.84); ctx.stroke(); ctx.restore(); }
function cat(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a; const c=C.okerD;
  ctx.beginPath(); ctx.ellipse(x,y-55*s,95*s,48*s,0,0,6.283); shape(ctx,c,lighten(c,0.3),2);
  ctx.beginPath(); ctx.arc(x+92*s,y-110*s,40*s,0,6.283); shape(ctx,c,lighten(c,0.3),2);
  ctx.beginPath(); ctx.moveTo(x+66*s,y-136*s); ctx.lineTo(x+70*s,y-176*s); ctx.lineTo(x+92*s,y-148*s); ctx.closePath(); ctx.moveTo(x+104*s,y-148*s); ctx.lineTo(x+124*s,y-176*s); ctx.lineTo(x+126*s,y-134*s); ctx.closePath(); shape(ctx,c,lighten(c,0.3),2);
  [[-60,0],[-30,0],[40,0],[70,0]].forEach(([dx])=>{ roundRect(ctx,x+dx*s-9*s,y-30*s,18*s,30*s,8*s); shape(ctx,c,lighten(c,0.3),1.5); });
  ctx.strokeStyle=c; ctx.lineWidth=14*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-88*s,y-70*s); ctx.quadraticCurveTo(x-150*s,y-80*s,x-140*s,y-150*s); ctx.stroke();
  ctx.fillStyle=C.bgSchema; ctx.beginPath(); ctx.arc(x+80*s,y-116*s,4*s,0,6.283); ctx.arc(x+106*s,y-116*s,4*s,0,6.283); ctx.fill(); ctx.restore(); }
function oak(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a;
  ctx.beginPath(); ctx.moveTo(x-22*s,y); ctx.lineTo(x-14*s,y-150*s); ctx.lineTo(x+14*s,y-150*s); ctx.lineTo(x+22*s,y); ctx.closePath(); shape(ctx,C.bruin,lighten(C.bruin,0.3),2);
  [[0,-250,110],[-90,-200,80],[90,-205,85],[-50,-300,80],[55,-305,78],[0,-180,90]].forEach(([dx,dy,r],i)=>{ blob(ctx,x+dx*s,y+dy*s,r*s,r*0.85*s,0.06,i); shape(ctx,'#4E8A5C',lighten('#4E8A5C',0.3),2); });
  ctx.restore(); }
function microscope(ctx,x,y,s,a=1){ ctx.save(); ctx.globalAlpha*=a; const f=C.fill, l=C.line;
  roundRect(ctx,x-90*s,y-24*s,180*s,24*s,6*s); shape(ctx,f,l,2);
  ctx.beginPath(); ctx.moveTo(x+40*s,y-24*s); ctx.quadraticCurveTo(x+80*s,y-160*s,x+20*s,y-250*s); ctx.lineWidth=26*s; ctx.strokeStyle=l; ctx.lineCap='round'; ctx.stroke(); ctx.lineWidth=20*s; ctx.strokeStyle=f; ctx.stroke();
  roundRect(ctx,x-80*s,y-120*s,150*s,14*s,4*s); shape(ctx,f,l,2);
  ctx.save(); ctx.translate(x-10*s,y-200*s); ctx.rotate(-0.35); roundRect(ctx,-18*s,-90*s,36*s,150*s,6*s); shape(ctx,f,l,2); roundRect(ctx,-24*s,-110*s,48*s,24*s,6*s); shape(ctx,f,l,2); ctx.restore();
  ctx.restore(); }

// ---------- sla en keuken (stijlframe 1, vlak) ----------
function blobPath(cx,cy,rx,ry,rot,seed,waves,amp){ const N=140, pts=[];
  for(let i=0;i<N;i++){ const th=i/N*6.283; const r=1+(amp*Math.sin(th*waves+seed)+amp*0.5*Math.sin(th*waves*2.2+seed*1.7)+amp*0.35*Math.abs(Math.sin(th*waves*4.1+seed)));
    const x=Math.cos(th)*rx*r, y=Math.sin(th)*ry*r; pts.push([cx+x*Math.cos(rot)-y*Math.sin(rot), cy+x*Math.sin(rot)+y*Math.cos(rot)]); }
  ctx.beginPath(); pts.forEach((q,i)=>{ const n=pts[(i+1)%N], m=[(q[0]+n[0])/2,(q[1]+n[1])/2]; if(!i) ctx.moveTo(m[0],m[1]); else ctx.quadraticCurveTo(q[0],q[1],m[0],m[1]); }); ctx.closePath(); }
function leafPath(pts){ ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.closePath(); }
function lettuceLeaf(cx,cy,rx,ry,rot,seed,lx,ly,col,vein,o){ o=o||{}; const wv=o.waves||11, am=o.amp||0.07;
  blobPath(cx,cy,rx,ry,rot,seed,wv,am); shape(ctx,col,lighten(col,0.32),2);
  ctx.save(); blobPath(cx,cy,rx,ry,rot,seed,wv,am); ctx.clip(); ctx.strokeStyle=rgba(vein,0.35); ctx.lineWidth=2; ctx.lineCap='round';
  for(let k=0;k<3;k++){ const a=rot+(k-1)*0.45; const ex=cx+Math.cos(a-1.57)*rx*0.85, ey=cy+Math.sin(a-1.57)*ry*0.85; ctx.beginPath(); ctx.moveTo(lx,ly); ctx.quadraticCurveTo((lx+ex)/2,(ly+ey)/2+8,ex,ey); ctx.stroke(); }
  ctx.restore(); }
const G1='#5FA86E', G2='#6FB57C', G3='#9ACB8E', V1='#D8EBCF';
function stevigeKrop(x,y,s){ const L=(cx,cy,rx,ry,rot,seed,c,o)=>lettuceLeaf(x+cx*s,y+cy*s,rx*s,ry*s,rot,seed,x,y+40*s,c,V1,o);
  L(-150,60,150,95,-0.35,1,G1); L(150,60,150,95,0.35,2,G1); L(-90,95,140,80,-0.1,3,G1); L(95,98,140,80,0.12,4,G1);
  L(-175,-20,120,120,-0.6,5,G1); L(175,-20,120,120,0.6,6,G1); L(-110,-95,120,105,-0.4,7,G1); L(110,-95,120,105,0.4,8,G1); L(0,-140,140,90,0,9,G1);
  L(-80,-30,115,120,-0.25,10,G2,{amp:0.06}); L(85,-30,115,120,0.25,11,G2,{amp:0.06}); L(0,-60,120,110,0,12,G2,{amp:0.06});
  L(-35,10,85,95,-0.15,13,G3,{amp:0.05,waves:9}); L(40,15,85,92,0.15,14,G3,{amp:0.05,waves:9});
  L(0,55,120,70,0,15,G1,{amp:0.06}); L(-40,110,135,55,-0.05,16,G1); L(55,112,130,52,0.08,17,G1); }
function slappeKrop(x,y,s){ const top=[x+4*s,y-165*s], hemY=y+10*s;
  const SF=['#9AA068','#939A62'], SB=['#7C8452','#81894F'];
  [[-275,-120,0,0],[110,280,1,0],[-230,-20,2,0],[40,235,3,0],[-170,30,4,1],[-40,170,5,1],[-110,0,6,1],[-5,105,7,1]].forEach(([a,b,k,front])=>{
    const h=hash(k*4.7+1), c=front?SF[k%2]:SB[k%2]; const xa=x+a*s, xb=x+b*s, bulge=(32+30*h)*s;
    const edge=(xe,dir,t)=>{ const bx=top[0]+(xe-top[0])*t, by=top[1]+(hemY-top[1])*Math.pow(t,0.9); return [bx+dir*bulge*Math.sin(Math.PI*t)*0.9, by-bulge*0.35*Math.sin(Math.PI*t)]; };
    const pts=[], N=36; for(let i=0;i<=N;i++) pts.push(edge(xa,-1,i/N));
    for(let i=0;i<=N;i++){ const t=i/N; pts.push([xa+(xb-xa)*t, hemY+(Math.sin(t*14+k*2)*11+Math.abs(Math.sin(t*37+k))*7)*s-(front?0:14*s)]); }
    for(let i=N;i>=0;i--) pts.push(edge(xb,1,i/N));
    leafPath(pts); shape(ctx,c,lighten(c,0.3),2);
    ctx.save(); leafPath(pts); ctx.clip();
    if(front){ const mx=(xa+xb)/2+(h-0.5)*40*s; ctx.globalAlpha=0.6; ctx.strokeStyle='#D8D6B8'; ctx.lineCap='round';
      for(let i=0;i<12;i++){ const t1=i/12, t2=(i+1)/12; ctx.lineWidth=(7-5*t1)*s; ctx.beginPath(); ctx.moveTo(top[0]+(mx-top[0])*t1+Math.sin(t1*3)*12*s, top[1]+(hemY-top[1])*t1); ctx.lineTo(top[0]+(mx-top[0])*t2+Math.sin(t2*3)*12*s, top[1]+(hemY-top[1])*t2); ctx.stroke(); } }
    ctx.globalAlpha=0.25; ctx.strokeStyle=lighten(c,0.35); ctx.lineWidth=2;
    for(let w=0;w<5;w++){ const t=0.45+0.5*hash(k*9+w), u=hash(k*13+w*3); const p1=edge(xa,-1,t), p2=edge(xb,1,t); const px=p1[0]+(p2[0]-p1[0])*u, py=p1[1]+(p2[1]-p1[1])*u;
      ctx.beginPath(); ctx.moveTo(px,py); ctx.quadraticCurveTo(px+(hash(w+k)-0.5)*30*s,py+20*s,px+(hash(w*2+k)-0.5)*24*s,py+42*s); ctx.stroke(); }
    ctx.restore(); });
  ctx.beginPath(); ctx.ellipse(top[0],top[1]+4*s,18*s,9*s,0,0,6.283); shape(ctx,C.oker,lighten(C.oker,0.3),2); }
// krop op basislijn yb (onderkant op het aanrecht); u = 0 stevig … 1 slap (snelle overvloeier met een klein inzakken)
function krop(x,yb,s,u,a=1){ if(a<=0.01) return; u=clamp(u,0,1);
  if(u<0.99){ ctx.save(); ctx.globalAlpha*=a*(1-u); ctx.translate(x,yb); ctx.scale(1+0.08*u,1-0.3*u); ctx.translate(-x,-yb); stevigeKrop(x,yb-163*s,s); ctx.restore(); }
  if(u>0.01){ ctx.save(); ctx.globalAlpha*=a*u; ctx.translate(x,yb); ctx.scale(1,0.75+0.25*u); ctx.translate(-x,-yb); slappeKrop(x,yb-10*s,s); ctx.restore(); } }
function ridge(x0,x1,base,amp,seed,step){ const pts=[]; for(let x=x0;x<=x1+step;x+=step){ const u=x*0.004+seed; pts.push([x, base-amp*(0.55*Math.abs(Math.sin(u))+0.3*Math.sin(u*2.3+1)+0.15*Math.sin(u*5.1))]); } return pts; }
function treeLine(X,Wd,base,hMin,hVar,step,seed){ const pts=[[X-20,base+400]]; for(let x=X-20;x<=X+Wd+20;x+=step*(0.7+0.6*hash(x*0.11+seed))){ const h=hMin+hVar*hash(x*0.37+seed); pts.push([x-step*0.45,base-h*0.35]); pts.push([x,base-h]); pts.push([x+step*0.45,base-h*0.35]); } pts.push([X+Wd+20,base+400]); return pts; }
function windowView(X,Y,Wd,Hd,sun,dusk=0){ // sun: 0 morning (left low) … 1 evening (right low)
  ctx.save(); ctx.beginPath(); ctx.rect(X,Y,Wd,Hd); ctx.clip();
  ctx.fillStyle=C.bgMacroSky; ctx.fillRect(X,Y,Wd,Hd); if(dusk>0){ ctx.fillStyle=rgba('#0D1420',0.45*dusk); ctx.fillRect(X,Y,Wd,Hd); }
  const sx=X+Wd*(0.12+0.76*sun), sy=Y+Hd*(0.55-0.42*Math.sin(Math.PI*sun)); dot(ctx,sx,sy,22,C.goud);
  leafPath([[X,Y+300],[X+90,Y+240],[X+170,Y+270],[X+290,Y+150],[X+350,Y+120],[X+430,Y+190],[X+520,Y+230],[X+590,Y+210],[X+Wd,Y+240],[X+Wd,Y+Hd],[X,Y+Hd]]); ctx.fillStyle=C.berg; ctx.fill();
  leafPath([[X+350,Y+120],[X+400,Y+165],[X+380,Y+172],[X+362,Y+160],[X+345,Y+182],[X+325,Y+160],[X+305,Y+170],[X+290,Y+150]]); ctx.fillStyle=C.bergTop; ctx.fill();
  ctx.fillStyle=C.bgMacroHill; leafPath(treeLine(X,Wd,Y+330,26,30,18,3)); ctx.fill();
  ctx.fillStyle=C.bgMacroFront; leafPath(treeLine(X,Wd,Y+385,40,50,30,8)); ctx.fill();
  ctx.restore(); ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.strokeRect(X,Y,Wd,Hd); ctx.beginPath(); ctx.moveTo(X+Wd/2,Y); ctx.lineTo(X+Wd/2,Y+Hd); ctx.stroke(); }
const COUNTER=790;
function counter(){ ctx.beginPath(); ctx.rect(0,COUNTER,W,26); shape(ctx,C.bruin,lighten(C.bruin,0.3),2); }
function bowl(bx,a=1,level=1,inner){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const top=640, bot=COUNTER-2;
  if(inner) inner();
  const wy=top+40+(1-level)*30; ctx.beginPath(); ctx.moveTo(bx-150+(1-level)*8,wy); ctx.lineTo(bx+150-(1-level)*8,wy); ctx.lineTo(bx+118,bot-2); ctx.lineTo(bx-118,bot-2); ctx.closePath(); ctx.fillStyle=rgba(C.water,0.45); ctx.fill();
  ctx.strokeStyle=rgba(C.teal,0.6); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(bx-146,wy); ctx.lineTo(bx+146,wy); ctx.stroke();
  ctx.strokeStyle=C.line; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(bx-165,top); ctx.lineTo(bx-120,bot); ctx.lineTo(bx+120,bot); ctx.lineTo(bx+165,top); ctx.stroke(); ctx.restore(); }
function kitchenBase(sun=0.5,dusk=0){ bg(ctx,'schema'); windowView(1160,110,640,420,sun,dusk); counter(); }

// ---------- cellen ----------
function cytoFill(cx,cy,rx,ry,hl=0,seed=3){ blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.fillStyle=rgba(C.er,0.07+0.12*hl); ctx.fill();
  ctx.save(); blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.clip(); ctx.fillStyle=rgba(C.grain,0.35); for(let i=0;i<160;i++){ const a=hash(i*7+seed)*6.283, d=Math.sqrt(hash(i*7+1+seed)); ctx.beginPath(); ctx.arc(cx+Math.cos(a)*d*rx,cy+Math.sin(a)*d*ry,1.4,0,6.283); ctx.fill(); } ctx.restore(); }
function hlRing(cx,cy,rx,ry,a,seed=3){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; blob(ctx,cx,cy,rx,ry,0.04,seed,0); ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.stroke(); ctx.restore(); }
// dierlijke cel (wangcel, schematisch): o = {cyto, kern, mitos, org, hlMem, hlCyto, hlKern, t}
function animalCell(cx,cy,rx,ry,o={}){ const t=o.t||0;
  cytoFill(cx,cy,rx,ry,o.hlCyto||0,3);
  if(o.org){ alpha(ctx,o.org,()=>{ for(let i=0;i<5;i++){ const a=1.1+i*1.05, w=wander(i+30,t,10,0.5); vesicle(ctx,cx+Math.cos(a)*rx*0.55+w.x,cy+Math.sin(a)*ry*0.5+w.y,9); } }); }
  if(o.mitos){ alpha(ctx,o.mitos,()=>{ [[0.42,0.38,0.3],[-0.15,0.62,-0.2],[0.6,-0.3,1.1],[-0.55,0.45,0.6],[0.15,-0.62,0.1]].forEach(([u,v,r],i)=>{ const w=wander(i+40,t,8,0.4); mitochondrion(ctx,cx+u*rx+w.x,cy+v*ry+w.y,Math.max(44,rx*0.16),r,1,4,t); }); }); }
  membrane(ctx,cx,cy,rx,ry,C.er,0.04,3,t*0.3); hlRing(cx,cy,rx,ry,o.hlMem||0);
  if(o.kern!==0){ alpha(ctx,o.kern===undefined?1:o.kern,()=>{ nucleus(ctx,cx-rx*0.28,cy-ry*0.08,Math.max(30,ry*0.3),1,t); if(o.hlKern) { ctx.save(); ctx.globalAlpha*=o.hlKern; ctx.beginPath(); ctx.arc(cx-rx*0.28,cy-ry*0.08,Math.max(30,ry*0.3)+10,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=4; ctx.stroke(); ctx.restore(); } }); } }
// plantencel (stijlframe 2): o = {wall, chloro, vac (0..1 grootte), kern, mitos, hlWall, hlMem, hlCyto, hlMito, sugar, t}
const CHL=[[-0.78,-0.55,0.3],[-0.15,-0.82,0],[0.55,-0.7,-0.3],[0.86,0.05,1.2],[0.55,0.72,0.4],[-0.3,0.82,-0.2],[-0.86,0.25,1.4]];
function plantCellV(cx,cy,rx,ry,o={}){ const t=o.t||0, v=o.vac===undefined?1:o.vac;
  const turg=o.turg===undefined?1:o.turg; // 1 strak, 0 slap (membraan iets van de wand)
  if(o.wall) alpha(ctx,o.wall,()=>{ cellWall(ctx,cx,cy,rx,ry,1); if(o.hlWall){ ctx.save(); ctx.globalAlpha*=o.hlWall; blob(ctx,cx,cy,rx,ry,0,0); ctx.strokeStyle=C.goud; ctx.lineWidth=5; ctx.stroke(); ctx.restore(); } });
  const mrx=(rx-12)*(0.94+0.06*turg), mry=(ry-12)*(0.9+0.1*turg);
  cytoFill(cx,cy+(1-turg)*8,mrx,mry,o.hlCyto||0,3);
  if(v>0.02){ vacuole(ctx,cx+10,cy+6,mrx*0.82,mry*0.74,1,0.25+0.75*v);
    if(o.sugar) alpha(ctx,o.sugar,()=>{ for(let i=0;i<18;i++){ const a=hash(i*3.1)*6.283, d=Math.sqrt(hash(i*5.7))*0.7, w=wander(i+60,t,6,0.8); dot(ctx,cx+10+Math.cos(a)*d*mrx*0.82*(0.25+0.75*v)+w.x,cy+6+Math.sin(a)*d*mry*0.74*(0.25+0.75*v)+w.y,5,C.oker); } }); }
  membrane(ctx,cx,cy+(1-turg)*8,mrx,mry,C.er,0.01+0.05*(1-turg),3,0); hlRing(cx,cy+(1-turg)*8,mrx,mry,o.hlMem||0);
  if(o.chloro) alpha(ctx,o.chloro,()=>CHL.forEach(([u,w,r])=>chloroplast(ctx,cx+u*mrx*(0.98+0.02*turg),cy+w*mry*(0.95+0.05*turg),Math.max(40,rx*0.2),1,r)));
  if(o.kern!==0) alpha(ctx,o.kern===undefined?1:o.kern,()=>nucleus(ctx,cx-mrx*0.62,cy-mry*0.05,Math.max(26,rx*0.13),1,t));
  if(o.mitos) alpha(ctx,o.mitos,()=>{ mitochondrion(ctx,cx+mrx*0.2,cy+mry*0.86,Math.max(36,rx*0.15),0.2,1,4,t); mitochondrion(ctx,cx-mrx*0.35,cy-mry*0.7,Math.max(32,rx*0.13),-0.4,1,4,t);
    if(o.hlMito){ ctx.save(); ctx.globalAlpha*=o.hlMito; ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(cx+mrx*0.2,cy+mry*0.86,Math.max(36,rx*0.15)*0.75,22,0.2,0,6.283); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx-mrx*0.35,cy-mry*0.7,Math.max(32,rx*0.13)*0.75,20,-0.4,0,6.283); ctx.stroke(); ctx.restore(); } }); }
// microscoopbeeld van wangcellen (methyleenblauw)
function wangcel(x,y,r,rot,seed){ const n=7+Math.floor(hash(seed)*3), pts=[];
  for(let i=0;i<n;i++){ const a=rot+i/n*6.283+(hash(seed+i*1.3)-0.5)*0.5, rr=r*(0.78+0.35*hash(seed*2+i)); pts.push([x+Math.cos(a)*rr, y+Math.sin(a)*rr]); }
  ctx.beginPath(); pts.forEach((p,i)=>{ const q=pts[(i+1)%n], m=[(p[0]+q[0])/2,(p[1]+q[1])/2]; if(!i){ const l=pts[n-1]; ctx.moveTo((l[0]+p[0])/2,(l[1]+p[1])/2); } ctx.quadraticCurveTo(p[0],p[1],m[0],m[1]); });
  ctx.closePath(); ctx.fillStyle='rgba(120,155,205,0.22)'; ctx.fill(); ctx.strokeStyle='rgba(55,85,145,0.55)'; ctx.lineWidth=1.6; ctx.stroke();
  ctx.beginPath(); const f=hash(seed+9)*6.283; ctx.moveTo(x+Math.cos(f)*r*0.75,y+Math.sin(f)*r*0.75); ctx.quadraticCurveTo(x+Math.cos(f+1.4)*r*0.25,y+Math.sin(f+1.4)*r*0.25,x+Math.cos(f+2.4)*r*0.7,y+Math.sin(f+2.4)*r*0.7); ctx.strokeStyle='rgba(55,85,145,0.28)'; ctx.lineWidth=2.2; ctx.stroke();
  ctx.fillStyle='rgba(60,90,150,0.25)'; for(let i=0;i<26;i++){ const a=hash(seed+i*2.1)*6.283, d=Math.sqrt(hash(seed*3+i))*r*0.7; ctx.beginPath(); ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,1.4,0,6.283); ctx.fill(); }
  const nx=x+(hash(seed+4)-0.5)*r*0.3, ny=y+(hash(seed+5)-0.5)*r*0.3; ctx.beginPath(); ctx.ellipse(nx,ny,r*0.13,r*0.1,rot,0,6.283); ctx.fillStyle='rgba(42,62,128,0.85)'; ctx.fill(); }
const WANG=[[380,300,92,0.2],[560,250,100,1.1],[730,330,95,2.0],[300,470,90,0.7],[470,430,105,2.6],[660,500,98,1.7],[820,470,85,0.4],[390,640,96,1.9],[570,660,92,0.9],[750,660,88,2.9],[230,330,80,1.5],[880,300,78,0.8],[240,610,76,2.2],[540,90,90,0.1],[900,640,80,1.2]];
function microField(cx,cy,R,s=1){ ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.283); ctx.clip(); ctx.fillStyle='#E6ECEF'; ctx.fillRect(cx-R,cy-R,2*R,2*R);
  ctx.translate(cx,cy); ctx.scale(s,s); ctx.translate(-560,-470); WANG.forEach(([x,y,r,rot],i)=>wangcel(x,y,r,rot,i*5.7+2));
  ctx.fillStyle='rgba(42,62,128,0.7)'; for(let i=0;i<40;i++){ const a=hash(i*3.3)*6.283, d=Math.sqrt(hash(i*7.1))*390; ctx.beginPath(); ctx.ellipse(560+Math.cos(a)*d,470+Math.sin(a)*d,2.6,1.5,a,0,6.283); ctx.fill(); }
  ctx.restore(); ctx.beginPath(); ctx.arc(cx,cy,R,0,6.283); ctx.strokeStyle='#05080D'; ctx.lineWidth=10; ctx.stroke(); }
// bladweefsel: honingraat van plantencellen (in een zoomcirkel)
function tissue(cx,cy,R,t=0,turg=1){ for(let r=-4;r<=4;r++) for(let c=-5;c<=5;c++){ const x=cx+c*92+(r%2?46:0), y=cy+r*70; if(Math.hypot(x-cx,y-cy)>R+80) continue;
  ctx.beginPath(); ctx.ellipse(x,y,44,32*(0.9+0.1*turg),0,0,6.283); shape(ctx,rgba(C.teal,0.18),C.groen,5);
  for(let k=0;k<4;k++){ const a=k*1.6+hash(r*11+c); dot(ctx,x+Math.cos(a)*30,y+Math.sin(a)*20,6,C.chloro); } } }

// castboek heeft circ() nodig
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// ===== Anatomie — realistisch lichaam met organen (21 okt 2026) =====
// Vervangt het oude 'poppetje' (rond hoofd, blokkenlijf) in lichaamskaarten. Vooraanzicht van een tiener,
// echte verhoudingen (hoofd = 1/7,3 van de lengte), organen op hun echte plek (hart en maag links in het lichaam
// = rechts in beeld, lever rechts in het lichaam = links in beeld).
// Gebruik: zet BODY = {cx, yb, h} (midden, voeten, lengte) en roep bodyOrgans({...}) aan, zelfde sleutels als vroeger:
//   sil (lichaam), zenuw, spijs, adem, bloed, uitsch, skelet, spier, afweer, hormoon, voortpl (0..1), t, beat, breath
// Losse organen (met gloed als ze oplichten): liver, pancreas, mouth, skull, skin, eyes, nose, testes, spleen.
// AP(x,y): hoofdhoogte-coördinaten (x vanaf het midden, y vanaf de kruin, voeten op 7,3) → pixels.

const ANA = { huid:'#D9A982', huidS:'#BF8C66', haar:'#4A2E1E', ink:'#3A2418', short:'#3F5F86',
  brein:'#E7B2BC', breinS:'#C98C99', long:'#E8A2A8', longS:'#C9787F', hart:'#B8333B', hartL:'#D9555B',
  slag:'#D04A44', ader:'#5677C2', lever:'#8E3B32', leverL:'#A84E43', gal:'#6E9A4A', maag:'#E39C8A', maagS:'#C67D6C',
  darm:'#EDB79F', darmS:'#C98C74', dik:'#D9967A', dikS:'#B67459', alv:'#E9C27E', milt:'#7D3A52', nier:'#9B3D3A', nierL:'#B85450',
  blaas:'#E6C878', urine:'#F0D66A', bot:'#ECE5D3', botS:'#BDB49E', spier:'#B9524C', spierL:'#D47A70', zenuw:'#B79AE6', lymf:'#7CC48A',
  klier:'#E8B84A', baar:'#D9868A', slok:'#D98C80', lucht:'#E6D3C3' };
const AN_H = 7.3;
function AB(){ const HH=BODY.h/AN_H; return { HH, top:BODY.yb-BODY.h, cx:BODY.cx }; }
function AP(x,y){ const b=AB(); return [b.cx+x*b.HH, b.top+y*b.HH]; }
function APs(pts){ return pts.map(p=>AP(p[0],p[1])); }
function AHH(){ return AB().HH; }
// vloeiend pad door punten (Catmull-Rom → Bézier)
function anPath(ctx,P,closed=true){ const n=P.length; ctx.beginPath(); ctx.moveTo(P[0][0],P[0][1]); const N=closed?n:n-1;
  for(let i=0;i<N;i++){ const p0=P[(i-1+n)%n], p1=P[i], p2=P[(i+1)%n], p3=P[(i+2)%n]; const a0=(!closed&&i===0)?p1:p0, a3=(!closed&&i===n-2)?p2:p3;
    ctx.bezierCurveTo(p1[0]+(p2[0]-a0[0])/6, p1[1]+(p2[1]-a0[1])/6, p2[0]-(a3[0]-p1[0])/6, p2[1]-(a3[1]-p1[1])/6, p2[0], p2[1]); }
  if(closed) ctx.closePath(); }
// rechterhelft (x ≥ 0, van boven naar beneden) → hele omtrek, gespiegeld
function anSym(R){ const L=R.slice().reverse().filter(p=>p[0]!==0).map(p=>[-p[0],p[1]]); return R.concat(L); }
function anMir(pts,s){ return pts.map(p=>[p[0]*s,p[1]]); }
function anGlow(color,g){ if(g>0.01){ ctx.shadowColor=color; ctx.shadowBlur=26*g; } }
function anShape(pts,fill,stroke,lw=1.5,closed=true,glow=0){ ctx.save(); anGlow(fill,glow); anPath(ctx,APs(pts),closed); ctx.fillStyle=fill; ctx.fill(); ctx.shadowBlur=0; if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } ctx.restore(); }
function anLine(pts,color,w,closed=false,dash=null){ ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); anPath(ctx,APs(pts),closed); ctx.stroke(); ctx.restore(); }
// punt op een polylijn (in px) op fractie u, met lengtes
function anAlong(P,u){ let L=0; const seg=[]; for(let i=1;i<P.length;i++){ const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]); seg.push(d); L+=d; }
  let r=clamp(u,0,1)*L; for(let i=0;i<seg.length;i++){ if(r<=seg[i]||i===seg.length-1){ const k=seg[i]?Math.min(1,r/seg[i]):0; return [lerp(P[i][0],P[i+1][0],k), lerp(P[i][1],P[i+1][1],k)]; } r-=seg[i]; } return P[P.length-1]; }
// dichte versie van een vloeiend pad (voor bewegende deeltjes)
function anDense(pts,n=60){ const P=APs(pts), out=[]; const m=P.length; for(let i=0;i<m-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(m-1,i+2)];
  for(let k=0;k<n/m+2;k++){ const s=k/(n/m+2); const s2=s*s, s3=s2*s; const f=(a,b,c,d)=>0.5*((2*b)+(-a+c)*s+(2*a-5*b+4*c-d)*s2+(-a+3*b-3*c+d)*s3); out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])]); } } out.push(P[m-1]); return out; }

// ---------- het lichaam zelf ----------
const AN_BODY=[[0.15,0.9],[0.17,1.16],[0.3,1.3],[0.6,1.37],[0.86,1.45],[0.99,1.6],[1.06,1.9],[1.1,2.35],[1.14,2.8],[1.2,3.2],[1.25,3.65],[1.27,3.98],[1.33,4.2],[1.34,4.46],[1.27,4.66],[1.17,4.63],[1.12,4.38],[1.09,4.05],[1.03,3.62],[0.97,3.18],[0.93,2.82],[0.89,2.35],[0.85,2.02],[0.79,1.88],[0.73,2.05],[0.7,2.55],[0.63,2.98],[0.68,3.35],[0.76,3.72],[0.75,4.25],[0.66,4.85],[0.56,5.28],[0.57,5.55],[0.6,5.92],[0.52,6.45],[0.42,6.92],[0.48,7.1],[0.47,7.3],[0.2,7.3],[0.17,7.08],[0.22,6.9],[0.16,6.35],[0.13,5.85],[0.13,5.3],[0.1,4.8],[0.07,4.3],[0,4.04]];
const AN_HEAD=[[0,-0.01],[0.22,0.03],[0.36,0.18],[0.39,0.42],[0.36,0.66],[0.28,0.86],[0.14,0.98],[0,1.01]];
const AN_TRUNK=[[0,1.36],[0.55,1.5],[0.64,2.1],[0.6,2.95],[0.65,3.5],[0.45,3.9],[0,3.98]];
function anFigure(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  const body=APs(anSym(AN_BODY)), head=APs(anSym(AN_HEAD));
  // lijf: schaduwtint, dan de lichte kant er bovenop (licht van links)
  const fillBody=(col,dx)=>{ ctx.save(); ctx.translate(dx,0); anPath(ctx,body); ctx.fillStyle=col; ctx.fill(); anPath(ctx,head); ctx.fill(); ctx.restore(); };
  fillBody(ANA.huidS,0); ctx.save(); anPath(ctx,body); ctx.clip(); fillBody(ANA.huid,-0.07*HH); ctx.restore();
  ctx.save(); anPath(ctx,head); ctx.clip(); fillBody(ANA.huid,-0.06*HH); ctx.restore();
  // oren
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.385,0.53); ctx.beginPath(); ctx.ellipse(ex,ey,0.06*HH,0.12*HH,0,0,6.283); ctx.fillStyle=s<0?ANA.huid:ANA.huidS; ctx.fill(); }
  // kaaklijn-schaduw, sleutelbeenderen, navel, knieën (zachte lijntjes)
  ctx.save(); ctx.globalAlpha*=0.5; anShape([[-0.2,1.0],[0,1.08],[0.2,1.0],[0.17,1.12],[0,1.17],[-0.17,1.12]],ANA.huidS,null);
  anLine([[-0.62,1.42],[-0.3,1.47],[-0.08,1.43]],ANA.huidS,0.025*HH); anLine([[0.62,1.42],[0.3,1.47],[0.08,1.43]],ANA.huidS,0.025*HH);
  const [nx,ny]=AP(0,3.12); dot(ctx,nx,ny,0.03*HH,ANA.huidS);
  for(const s of [-1,1]) anLine([[s*0.24,5.2],[s*0.33,5.27],[s*0.42,5.2]],ANA.huidS,0.02*HH); ctx.restore();
  // zwembroek
  const SH=[[0,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.13,4.36],[0.09,4.12],[0,4.07]];
  ctx.save(); anPath(ctx,body); ctx.clip(); anShape(anSym(SH),ANA.short,null); ctx.globalAlpha*=0.35; anShape([[0.45,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.5,4.34]],'#1E2E44',null); ctx.restore();
  // haar
  const HR=[[0,-0.07],[0.24,-0.04],[0.4,0.12],[0.43,0.34],[0.39,0.47],[0.36,0.3],[0.3,0.22],[0.22,0.25],[0.16,0.19],[0.08,0.24],[0,0.2]];
  anShape(anSym(HR),ANA.haar,null); ctx.save(); ctx.globalAlpha*=0.35; anLine([[-0.1,0.0],[0.05,0.08],[0.2,0.04]],'#7A5236',0.02*HH); anLine([[0.12,-0.03],[0.28,0.06],[0.36,0.2]],'#7A5236',0.018*HH); ctx.restore();
  // gezicht (iets sterker dan het lijf, zodat het een mens blijft)
  ctx.save(); ctx.globalAlpha=Math.min(1,ctx.globalAlpha*1.6);
  for(const s of [-1,1]){ const [bx,by]=AP(s*0.15,0.4); ctx.strokeStyle=ANA.haar; ctx.lineWidth=0.03*HH; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx-s*0.07*HH,by+0.01*HH); ctx.quadraticCurveTo(bx,by-0.025*HH,bx+s*0.07*HH,by+0.005*HH); ctx.stroke();
    const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.072*HH,0.042*HH,0,0,6.283); ctx.fillStyle='#FBF7F0'; ctx.fill(); dot(ctx,ex+0.008*HH,ey,0.034*HH,'#5A3A26'); dot(ctx,ex+0.008*HH,ey,0.018*HH,'#1E140E'); dot(ctx,ex+0.02*HH,ey-0.012*HH,0.009*HH,'#FFFFFF');
    const [cx2,cy2]=AP(s*0.24,0.7); dot(ctx,cx2,cy2,0.06*HH,rgba('#E07A5F',0.18)); }
  ctx.strokeStyle=ANA.huidS; ctx.lineWidth=0.022*HH; ctx.lineCap='round'; const [n1x,n1y]=AP(0.02,0.55), [n2x,n2y]=AP(0.05,0.69); ctx.beginPath(); ctx.moveTo(n1x,n1y); ctx.quadraticCurveTo(n2x+0.02*HH,n2y-0.04*HH,n2x,n2y); ctx.lineTo(n2x-0.07*HH,n2y+0.005*HH); ctx.stroke();
  const [mx,my]=AP(0,0.81); ctx.strokeStyle='#A85E50'; ctx.lineWidth=0.028*HH; ctx.beginPath(); ctx.moveTo(mx-0.1*HH,my-0.01*HH); ctx.quadraticCurveTo(mx,my+0.05*HH,mx+0.1*HH,my-0.01*HH); ctx.stroke();
  ctx.restore(); ctx.restore(); }
// lichaamsholte: iets donkerder in de romp, zodat organen eruit springen
function anCavity(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a*0.6; ctx.filter='blur('+Math.round(0.08*AHH())+'px)'; anShape(anSym(AN_TRUNK),'#1A1220',null); ctx.restore(); }

// ---------- skelet ----------
function anBone(x1,y1,x2,y2,w,a=1){ const HH=AHH(); const [p,q]=[AP(x1,y1),AP(x2,y2)]; ctx.save(); ctx.globalAlpha*=a; ctx.lineCap='round';
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=w*HH+3; ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke();
  ctx.strokeStyle=ANA.bot; ctx.lineWidth=w*HH; ctx.stroke(); for(const e of [p,q]){ ctx.beginPath(); ctx.arc(e[0],e[1],w*HH*0.95,0,6.283); ctx.fillStyle=ANA.bot; ctx.fill(); ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; ctx.stroke(); } ctx.restore(); }
function anSkeleton(a,o={}){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  if(o.schedel!==false) anSkull(1,0);
  // wervelkolom
  for(let i=0;i<24;i++){ const y=1.05+i*0.118; const w=(i<7?0.05:i<19?0.06:0.075); const [x0,y0]=AP(-w,y); roundRect(ctx,x0,y0,2*w*HH,0.085*HH,0.02*HH); shape(ctx,ANA.bot,ANA.botS,1); }
  // bekken
  for(const s of [-1,1]) anShape([[s*0.08,3.42],[s*0.4,3.2],[s*0.66,3.28],[s*0.64,3.55],[s*0.48,3.72],[s*0.32,3.92],[s*0.06,3.98],[s*0.1,3.78]],ANA.bot,ANA.botS,1.2);
  anShape([[-0.1,3.4],[0.1,3.4],[0.07,3.75],[0,3.85],[-0.07,3.75]],ANA.botS,null);
  // ribbenkast + borstbeen + sleutelbeenderen
  ctx.save(); ctx.lineCap='round'; for(let i=0;i<10;i++){ const y=1.58+i*0.105, w=0.42+Math.min(i,5)*0.045-Math.max(0,i-6)*0.02; for(const s of [-1,1]){ const P=APs([[s*0.06,y],[s*w*0.7,y-0.02],[s*w,y+0.12],[s*(w+0.02),y+0.28+i*0.01]]); ctx.strokeStyle=ANA.botS; ctx.lineWidth=0.05*HH; anPath(ctx,P,false); ctx.stroke(); ctx.strokeStyle=ANA.bot; ctx.lineWidth=0.034*HH; ctx.stroke(); } }
  anShape([[-0.06,1.48],[0.06,1.48],[0.05,2.3],[0,2.42],[-0.05,2.3]],ANA.bot,ANA.botS,1.2);
  for(const s of [-1,1]){ anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.botS,0.05*HH); anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.bot,0.034*HH); } ctx.restore();
  // armen en benen
  for(const s of [-1,1]){ anBone(s*0.88,1.55,s*1.03,2.82,0.07); anBone(s*1.04,2.92,s*1.16,3.98,0.045); anBone(s*1.0,2.92,s*1.1,3.98,0.04);
    for(let k=0;k<4;k++){ const fx=s*(1.15+k*0.035); anBone(s*1.17,4.05,fx,4.45+(k===1||k===2?0.05:0),0.022); }
    anBone(s*0.4,3.75,s*0.33,5.15,0.09); const [px2,py2]=AP(s*0.33,5.2); dot(ctx,px2,py2,0.07*HH,ANA.bot,ANA.botS,1.2);
    anBone(s*0.31,5.3,s*0.3,6.92,0.07); anBone(s*0.42,5.33,s*0.4,6.92,0.035);
    anShape([[s*0.24,6.98],[s*0.42,6.98],[s*0.47,7.22],[s*0.22,7.24]],ANA.bot,ANA.botS,1.2); }
  ctx.restore(); }
// schedel als losse laag (ook voor 'schedel'-label); g = gloed
function anSkull(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anShape(anSym([[0,0.0],[0.22,0.03],[0.35,0.17],[0.38,0.42],[0.33,0.63],[0.24,0.72],[0,0.74]]),ANA.bot,ANA.botS,1.5,true,g);
  anShape(anSym([[0,0.7],[0.24,0.7],[0.27,0.84],[0.18,0.98],[0,1.0]]),ANA.bot,ANA.botS,1.5);
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.1*HH,0.085*HH,0,0,6.283); ctx.fillStyle='#3A3442'; ctx.fill(); }
  anShape([[0,0.58],[0.05,0.68],[0,0.7],[-0.05,0.68]],'#3A3442',null);
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; for(let k=-3;k<=3;k++){ const [tx,ty]=AP(k*0.04,0.76); ctx.strokeRect(tx-0.018*HH,ty,0.036*HH,0.06*HH); }
  ctx.restore(); }

// ---------- spieren ----------
function anMuscle(pts,a=1,fib=null){ anShape(pts,ANA.spier,ANA.spierL,1.2); if(fib){ ctx.save(); ctx.globalAlpha*=0.45; fib.forEach(f=>anLine(f,ANA.spierL,1.2)); ctx.restore(); } }
function anMuscles(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ const M=p=>anMir(p,s);
    anMuscle(M([[0.06,1.55],[0.5,1.5],[0.78,1.62],[0.66,1.98],[0.3,2.12],[0.07,2.05]]),1,[M([[0.1,1.7],[0.6,1.68]]),M([[0.1,1.88],[0.62,1.82]])]); // borstspier
    anMuscle(M([[0.72,1.44],[0.92,1.48],[1.04,1.72],[0.98,2.05],[0.84,1.85]])); // schouder
    anMuscle(M([[0.9,2.0],[1.02,2.05],[1.08,2.5],[1.04,2.82],[0.94,2.75],[0.9,2.35]]),1,[M([[0.97,2.1],[1.0,2.75]])]); // biceps
    anMuscle(M([[0.97,2.92],[1.12,2.92],[1.2,3.35],[1.2,3.8],[1.12,3.8],[1.02,3.35]])); // onderarm
    anMuscle(M([[0.56,2.2],[0.66,2.6],[0.6,3.0],[0.62,3.35],[0.4,3.4],[0.42,2.7]])); // schuine buikspier
    anMuscle(M([[0.34,3.75],[0.72,3.8],[0.7,4.4],[0.56,5.05],[0.38,5.1],[0.3,4.5]]),1,[M([[0.45,3.9],[0.48,5.0]]),M([[0.6,3.95],[0.55,4.9]])]); // dijbeen
    anMuscle(M([[0.14,4.15],[0.3,4.3],[0.36,5.0],[0.2,4.95],[0.12,4.6]])); // binnenkant dij
    anMuscle(M([[0.42,5.35],[0.56,5.45],[0.6,5.9],[0.52,6.35],[0.44,6.1]])); // kuit
    anMuscle(M([[0.26,5.4],[0.34,5.38],[0.36,6.2],[0.3,6.6],[0.24,6.0]])); // scheenbeenspier
  }
  // rechte buikspier met 'blokjes'
  anMuscle([[-0.3,2.3],[0.3,2.3],[0.32,3.1],[0.24,3.75],[0,3.85],[-0.24,3.75],[-0.32,3.1]]);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0,2.3],[0,3.82]],ANA.spierL,2); [2.55,2.82,3.1].forEach(y=>anLine([[-0.3,y],[0.3,y+0.01]],ANA.spierL,2)); ctx.restore();
  ctx.restore(); }

// ---------- spijsvertering ----------
const AN_SLOK=[[0.0,0.92],[0.01,1.3],[0.02,1.9],[0.06,2.4],[0.12,2.62]];
const AN_MAAG=[[0.1,2.63],[0.26,2.54],[0.46,2.57],[0.58,2.72],[0.59,2.96],[0.48,3.14],[0.27,3.21],[0.06,3.16],[-0.07,3.07],[-0.06,2.99],[0.08,3.02],[0.22,2.99],[0.31,2.88],[0.27,2.74],[0.16,2.7]];
const AN_LEVER=[[-0.67,2.6],[-0.4,2.5],[-0.12,2.53],[0.08,2.57],[0.2,2.62],[0.06,2.72],[-0.1,2.82],[-0.34,2.97],[-0.58,3.0],[-0.69,2.85]];
const AN_ALV=[[-0.16,3.02],[-0.06,2.98],[0.18,2.95],[0.38,2.89],[0.52,2.87],[0.54,2.93],[0.38,2.98],[0.16,3.05],[-0.04,3.1],[-0.14,3.14]];
const AN_DIK=[[-0.44,3.72],[-0.5,3.45],[-0.51,3.12],[-0.44,3.02],[-0.2,3.08],[0.1,3.1],[0.38,3.04],[0.52,3.02],[0.55,3.25],[0.53,3.6],[0.42,3.8],[0.2,3.74],[0.07,3.82],[0.0,3.98]];
function anDunPts(){ const P=[[-0.06,3.04],[-0.17,3.1],[-0.18,3.22],[0.02,3.22]]; const rows=5; for(let r=0;r<rows;r++){ const y=3.28+r*0.095, dir=r%2?-1:1; for(let k=0;k<=6;k++){ const u=k/6; P.push([dir*(-0.34+0.68*u),y+Math.sin(u*Math.PI*3)*0.025]); } } P.push([-0.38,3.72],[-0.44,3.7]); return P; }
const AN_GUT=()=>{ const d=anDunPts(); return [[0,0.8],[0,0.95]].concat(AN_SLOK.slice(1)).concat([[0.25,2.72],[0.38,2.82],[0.36,3.0],[0.15,3.08]]).concat(d.slice(0)).concat(AN_DIK.slice(1)); };
function anTube(pts,w,col,colS,t=0,amp=0){ const HH=AHH(); const P=anDense(pts,Math.max(60,pts.length*10)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.strokeStyle=colS; ctx.lineWidth=w*HH+3; ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
  if(amp>0){ for(let i=1;i<P.length;i++){ const k=1+amp*Math.sin(i*0.35-t*4); ctx.strokeStyle=col; ctx.lineWidth=w*HH*k; ctx.beginPath(); ctx.moveTo(P[i-1][0],P[i-1][1]); ctx.lineTo(P[i][0],P[i][1]); ctx.stroke(); } }
  else { ctx.strokeStyle=col; ctx.lineWidth=w*HH; ctx.stroke(); }
  ctx.restore(); return P; }
function anDigest(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anTube(AN_SLOK,0.05,ANA.slok,'#A8625A');
  // dikke darm met haustra-insnoeringen
  const D=anTube(AN_DIK,0.12,ANA.dik,ANA.dikS,t,0.04); ctx.strokeStyle=ANA.dikS; ctx.lineWidth=1.5; for(let i=6;i<D.length-8;i+=6){ const p=D[i], q=D[i+1]; const dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy)||1; const nx=-dy/L*0.055*HH, ny=dx/L*0.055*HH; ctx.beginPath(); ctx.moveTo(p[0]-nx,p[1]-ny); ctx.lineTo(p[0]+nx,p[1]+ny); ctx.stroke(); }
  anLine([[-0.42,3.74],[-0.4,3.83],[-0.36,3.86]],ANA.dikS,0.035*HH); // blindedarm/appendix
  // dunne darm: kronkelende buis
  anTube(anDunPts(),0.065,ANA.darm,ANA.darmS,t,0.06);
  // maag met plooien
  anShape(AN_MAAG,ANA.maag,ANA.maagS,2); ctx.save(); ctx.globalAlpha*=0.5; anLine([[0.2,2.62],[0.38,2.7],[0.45,2.9]],ANA.maagS,1.5); anLine([[0.12,3.06],[0.3,3.05],[0.42,2.98]],ANA.maagS,1.5); ctx.restore();
  ctx.restore(); }
function liver(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_LEVER,ANA.lever,ANA.leverL,2,true,g); ctx.globalAlpha*=0.6; anLine([[0.05,2.56],[-0.02,2.7],[-0.1,2.84]],ANA.leverL,1.5); anShape([[-0.3,2.9],[-0.22,2.92],[-0.2,3.02],[-0.28,3.02]],ANA.gal,null); ctx.restore(); }
function pancreas(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_ALV,ANA.alv,'#C99E58',1.5,true,g); ctx.globalAlpha*=0.5; for(let k=0;k<7;k++){ const [x,y]=AP(-0.08+k*0.08,3.02-k*0.017); dot(ctx,x,y,1.8,'#C99E58'); } ctx.restore(); }
function spleen(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape([[0.5,2.68],[0.6,2.62],[0.68,2.75],[0.66,2.98],[0.57,2.98],[0.55,2.84]],ANA.milt,'#9A5470',1.5,true,g); ctx.restore(); }
function mouth(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.oker,a); const [x,y]=AP(0,0.82); ctx.beginPath(); ctx.ellipse(x,y,0.11*HH,0.045*HH,0,0,6.283); ctx.fillStyle='#7A2E30'; ctx.fill(); ctx.shadowBlur=0; ctx.beginPath(); ctx.ellipse(x,y+0.012*HH,0.06*HH,0.025*HH,0,0,6.283); ctx.fillStyle='#D9787A'; ctx.fill(); ctx.fillStyle='#F4EFE4'; ctx.fillRect(x-0.08*HH,y-0.045*HH,0.16*HH,0.022*HH); ctx.restore(); }

// ---------- ademhaling ----------
const AN_LONG_R=[[-0.24,1.48],[-0.42,1.6],[-0.6,1.9],[-0.69,2.28],[-0.7,2.62],[-0.55,2.68],[-0.34,2.62],[-0.14,2.55],[-0.1,2.2],[-0.11,1.8],[-0.16,1.56]];
const AN_LONG_L=[[0.24,1.48],[0.42,1.6],[0.6,1.9],[0.69,2.28],[0.7,2.64],[0.55,2.7],[0.38,2.68],[0.3,2.5],[0.2,2.32],[0.12,2.02],[0.12,1.76],[0.17,1.56]];
function anLungs(a,breath=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const k=1+0.06*Math.sin(breath);
  for(const [L,s] of [[AN_LONG_R,-1],[AN_LONG_L,1]]){ const [ox,oy]=AP(s*0.4,1.75); ctx.save(); ctx.translate(ox,oy); ctx.scale(k,1+0.07*Math.sin(breath)); ctx.translate(-ox,-oy);
    anShape(L,ANA.long,ANA.longS,2,true,g);
    ctx.save(); anPath(ctx,APs(L)); ctx.clip(); ctx.globalAlpha*=0.35; for(let i=0;i<40;i++){ const [x,y]=AP(s*(0.18+hash(i*3.1+s)*0.5),1.6+hash(i*5.7+s)*1.05); dot(ctx,x,y,1.6+hash(i)*2.2,ANA.longS); } ctx.restore();
    ctx.save(); ctx.globalAlpha*=0.7; s<0?anLine([[-0.68,2.05],[-0.4,2.15],[-0.18,2.3]],ANA.longS,1.5):anLine([[0.66,1.95],[0.4,2.2],[0.24,2.45]],ANA.longS,1.5); if(s<0) anLine([[-0.65,2.42],[-0.4,2.5]],ANA.longS,1.5); ctx.restore();
    // vertakkende luchtwegen
    ctx.save(); ctx.globalAlpha*=0.8; const b0=[s*0.06,1.85]; const tree=(p,ang,len,d)=>{ if(d>3) return; const q=[p[0]+Math.cos(ang)*len*s,p[1]+Math.sin(ang)*len]; anLine([p,q],ANA.lucht,(0.035-d*0.007)*HH); tree(q,ang-0.45,len*0.66,d+1); tree(q,ang+0.45,len*0.66,d+1); }; tree(b0,0.75,0.24,0); ctx.restore();
    ctx.restore(); }
  ctx.restore(); }
function anTrachea(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const [x0,y0]=AP(-0.035,1.02); ctx.fillStyle=ANA.lucht; roundRect(ctx,x0,y0,0.07*HH,0.84*HH,0.03*HH); ctx.fill(); ctx.strokeStyle='#BBA898'; ctx.lineWidth=1.2; for(let i=0;i<10;i++){ const [a1,b1]=AP(-0.035,1.08+i*0.08), [a2]=AP(0.035,0); ctx.beginPath(); ctx.moveTo(a1,b1); ctx.lineTo(a2,b1); ctx.stroke(); } ctx.restore(); }
function nose(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.teal,a); anLine([[0.04,0.68],[0.02,0.58],[-0.02,0.6],[-0.03,0.72],[-0.01,0.92],[0,1.05]],C.teal,0.04*HH); ctx.restore(); anTrachea(a); }

// ---------- bloed ----------
const AN_SLAG={ aorta:[[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.1,2.05],[0.06,2.4],[0.05,2.9],[0.04,3.38]],
  hals:s=>[[s*0.06,1.82],[s*0.09,1.4],[s*0.12,1.0],[s*0.2,0.78],[s*0.28,0.5],[s*0.24,0.28]],
  arm:s=>[[s*0.12,1.8],[s*0.42,1.58],[s*0.82,1.68],[s*0.92,2.2],[s*1.0,2.85],[s*1.08,3.42],[s*1.16,4.02],[s*1.26,4.48]],
  been:s=>[[s*0.04,3.38],[s*0.2,3.66],[s*0.34,3.96],[s*0.37,4.62],[s*0.34,5.22],[s*0.31,5.82],[s*0.3,6.52],[s*0.32,7.02],[s*0.4,7.22]],
  nier:s=>[[s*0.05,3.06],[s*0.26,3.06]] };
const AN_ADER={ hol:[[-0.09,2.06],[-0.09,1.74],[-0.12,1.4],[-0.16,0.98],[-0.24,0.7]], holO:[[-0.04,2.3],[-0.05,2.9],[-0.02,3.38]], hals2:[[0.12,1.74],[0.16,1.4],[0.18,0.98],[0.24,0.7]],
  arm:s=>[[s*0.1,1.74],[s*0.46,1.64],[s*0.86,1.76],[s*0.96,2.28],[s*1.05,2.88],[s*1.13,3.44],[s*1.21,4.02],[s*1.3,4.44]],
  been:s=>[[s*0.0,3.4],[s*0.15,3.72],[s*0.27,4.0],[s*0.3,4.62],[s*0.27,5.22],[s*0.25,5.82],[s*0.24,6.52],[s*0.26,7.02],[s*0.33,7.24]] };
function anVesselList(){ const A=[AN_SLAG.aorta], V=[AN_ADER.hol,AN_ADER.holO,AN_ADER.hals2]; for(const s of [-1,1]){ A.push(AN_SLAG.hals(s),AN_SLAG.arm(s),AN_SLAG.been(s),AN_SLAG.nier(s)); V.push(AN_ADER.arm(s),AN_ADER.been(s)); } return {A,V}; }
function anVessels(a,t=0,flow=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const {A,V}=anVesselList();
  V.forEach(p=>anLine(p,ANA.ader,0.042*HH)); A.forEach(p=>anLine(p,ANA.slag,0.036*HH));
  // haarvaatjes in handen en voeten
  ctx.save(); ctx.globalAlpha*=0.7; for(const s of [-1,1]){ for(let k=0;k<4;k++){ anLine([[s*1.24,4.42],[s*(1.18+k*0.045),4.58]],ANA.slag,1.2); anLine([[s*0.38,7.2],[s*(0.26+k*0.06),7.28]],ANA.slag,1.2); } } ctx.restore();
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; A.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<4;i++){ const u=((t*0.35+i/4+j*0.13)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#FFB3A8'); } });
    V.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<3;i++){ const u=1-((t*0.28+i/3+j*0.17)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#B9C8F2'); } }); ctx.restore(); }
  ctx.restore(); }
function anHeart(a,beat=0,g=0){ if(a<=0.01) return; const HH=AHH(); const p=Math.pow(Math.max(0,Math.sin(beat)),3); const k=1+0.09*p; const [ox,oy]=AP(0.09,2.22);
  ctx.save(); ctx.globalAlpha*=a; ctx.translate(ox,oy); ctx.scale(k,k); ctx.translate(-ox,-oy);
  anLine([[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.12,1.98]],ANA.slag,0.07*HH); anLine([[-0.08,1.76],[-0.08,2.06]],ANA.ader,0.075*HH); anLine([[0.06,2.0],[0.14,1.88],[0.24,1.9]],'#3E5FA8',0.055*HH);
  anShape([[-0.13,1.99],[0.04,1.95],[0.2,2.02],[0.33,2.2],[0.33,2.36],[0.28,2.48],[0.12,2.46],[-0.04,2.38],[-0.15,2.22],[-0.16,2.08]],p>0.5?ANA.hartL:ANA.hart,'#7E1E26',2,true,g+0.4*p);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0.06,1.98],[0.12,2.2],[0.22,2.42]],'#E8C27A',1.6); anLine([[-0.1,2.05],[-0.06,2.25],[0.06,2.4]],'#E8C27A',1.4); ctx.restore();
  ctx.restore(); }

// ---------- zenuwstelsel ----------
const AN_ZEN={ merg:[[0,0.62],[0,1.0],[0,2.0],[0,3.32]],
  arm:s=>[[s*0.02,1.3],[s*0.4,1.5],[s*0.86,1.62],[s*0.97,2.3],[s*1.06,2.95],[s*1.14,3.5],[s*1.21,4.05],[s*1.25,4.42]],
  been:s=>[[s*0.01,3.25],[s*0.2,3.7],[s*0.35,4.0],[s*0.38,4.7],[s*0.37,5.15],[s*0.32,6.0],[s*0.29,6.9],[s*0.33,7.2]],
  been2:s=>[[s*0.37,5.15],[s*0.45,5.5],[s*0.43,6.2],[s*0.39,6.95]] };
function anNerveList(){ const N=[AN_ZEN.merg]; for(const s of [-1,1]) N.push(AN_ZEN.arm(s),AN_ZEN.been(s),AN_ZEN.been2(s)); return N; }
function anBrain(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const B=anSym([[0,0.1],[0.17,0.1],[0.29,0.18],[0.33,0.32],[0.31,0.45],[0.22,0.5],[0.1,0.47],[0,0.44]]);
  anShape(B,ANA.brein,ANA.breinS,2,true,g); ctx.save(); anPath(ctx,APs(B)); ctx.clip(); ctx.globalAlpha*=0.8;
  for(let i=0;i<9;i++){ const s=i%2?1:-1, y=0.14+i*0.04; const pts=[]; for(let k=0;k<=8;k++){ const u=k/8; pts.push([s*(0.03+u*0.3),y+Math.sin(u*14+i)*0.025+u*0.05]); } anLine(pts,ANA.breinS,1.5); }
  anLine([[0,0.1],[0,0.46]],ANA.breinS,2.5); ctx.restore(); anLine([[0,0.46],[0,0.7]],ANA.breinS,0.06*HH); ctx.restore(); }
function anNerves(a,t=0,imp=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const N=anNerveList();
  anLine(AN_ZEN.merg,ANA.zenuw,0.05*HH); N.slice(1).forEach(p=>anLine(p,ANA.zenuw,0.022*HH));
  ctx.save(); ctx.globalAlpha*=0.6; for(let i=0;i<6;i++){ const y=1.72+i*0.2; for(const s of [-1,1]) anLine([[s*0.01,y],[s*0.3,y+0.02],[s*0.6,y+0.12]],ANA.zenuw,1.2); }
    for(const s of [-1,1]){ for(let k=0;k<4;k++) anLine([[s*1.25,4.42],[s*(1.17+k*0.04),4.6]],ANA.zenuw,1.1); for(let k=0;k<4;k++) anLine([[s*0.33,7.2],[s*(0.24+k*0.07),7.28]],ANA.zenuw,1.1); anLine([[s*0.04,0.48],[s*0.15,0.5]],ANA.zenuw,1.5); } ctx.restore();
  anBrain(1); if(imp>0.01) anImpulses(t,imp); ctx.restore(); }
function anImpulses(t,a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anNerveList().forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<2;i++){ const u=((t*0.55+i/2+j*0.21)%1); const [x,y]=anAlong(P,j===0?u:(j%2?u:1-u)); ctx.save(); ctx.shadowColor='#E6D8FF'; ctx.shadowBlur=12; dot(ctx,x,y,0.026*HH,'#F2EAFF'); ctx.restore(); } }); ctx.restore(); }
function eyes(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.15,0.5); ctx.save(); anGlow(C.teal,1); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y,0.1*HH,0.065*HH,0,0,6.283); ctx.stroke(); ctx.restore(); } anLine([[-0.15,0.5],[-0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); anLine([[0.15,0.5],[0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); ctx.restore(); }

// ---------- uitscheiding ----------
function anKidney(s,a=1,g=0){ const cx=s*0.37, cy=s<0?3.1:3.04;
  // nier: bolle kant naar buiten, inham (hilus) naar het midden
  const P=[[0,-0.15],[0.09,-0.12],[0.12,0.0],[0.09,0.12],[0,0.15],[-0.06,0.1],[-0.035,0.0],[-0.06,-0.1]].map(p=>[cx+p[0]*s,cy+p[1]]);
  anShape(P,ANA.nier,ANA.nierL,1.8,true,g); ctx.save(); ctx.globalAlpha*=0.5; anShape([[cx+0.04*s,cy-0.09],[cx+0.07*s,cy],[cx+0.04*s,cy+0.09],[cx-0.0*s,cy]],ANA.nierL,null); ctx.restore(); }
function anUrinary(a,t=0,flow=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anKidney(s,1,g); anLine(AN_URL(s),'#E0C070',0.022*HH); }
  anShape([[0,3.72],[0.14,3.76],[0.17,3.88],[0.08,3.97],[0,3.98],[-0.08,3.97],[-0.17,3.88],[-0.14,3.76]],ANA.blaas,'#C9A84E',1.8,true,g);
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; for(const s of [-1,1]){ const P=anDense(AN_URL(s),30); for(let i=0;i<3;i++){ const u=((t*0.45+i/3+(s>0?0.15:0))%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,ANA.urine); } } ctx.restore(); }
  ctx.restore(); }
function AN_URL(s){ return [[s*0.31,3.08],[s*0.24,3.3],[s*0.2,3.6],[s*0.12,3.78]]; }
function anAdrenal(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const cx=s*0.37, cy=(s<0?3.1:3.04)-0.17; anShape([[cx-0.07,cy+0.03],[cx,cy-0.05],[cx+0.07,cy+0.03]],ANA.klier,'#B88A2A',1.2); } ctx.restore(); }

// ---------- afweer ----------
const AN_LYMF=[[-0.15,1.12],[0.15,1.12],[-0.2,1.22],[0.2,1.22],[-0.72,1.86],[-0.66,1.92],[-0.74,1.95],[0.72,1.86],[0.66,1.92],[0.74,1.95],[-0.3,3.86],[-0.36,3.92],[0.3,3.86],[0.36,3.92],[0.12,3.4],[-0.1,3.46],[0.02,3.3]];
function anLymph(a,t=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  ctx.save(); ctx.globalAlpha*=0.55; anLine([[0.02,3.25],[0.03,2.4],[0.04,1.6],[0.12,1.32]],ANA.lymf,1.5); for(const s of [-1,1]){ anLine([[s*0.2,1.22],[s*0.46,1.6],[s*0.7,1.9],[s*0.95,2.5],[s*1.1,3.4],[s*1.22,4.2]],ANA.lymf,1.2); anLine([[s*0.33,3.9],[s*0.33,4.6],[s*0.3,5.6],[s*0.27,6.8]],ANA.lymf,1.2); } ctx.restore();
  spleen(1,g); anShape([[-0.08,1.52],[0.08,1.52],[0.07,1.72],[0,1.78],[-0.07,1.72]],'#9CD0A6',null); // thymus
  AN_LYMF.forEach(([x,y],i)=>{ const [px2,py2]=AP(x,y); ctx.save(); anGlow(ANA.lymf,g); ctx.beginPath(); ctx.ellipse(px2,py2,0.035*HH,0.026*HH,hash(i)*3,0,6.283); ctx.fillStyle=ANA.lymf; ctx.fill(); ctx.strokeStyle='#3E8A50'; ctx.lineWidth=1; ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// ---------- hormoonklieren ----------
function anGlands(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(ANA.klier,g);
  const [hx,hy]=AP(0,0.55); dot(ctx,hx,hy,0.035*HH,ANA.klier,'#B88A2A',1.2);
  anShape([[0,1.2],[0.06,1.12],[0.11,1.15],[0.11,1.3],[0.06,1.33],[0,1.26],[-0.06,1.33],[-0.11,1.3],[-0.11,1.15],[-0.06,1.12]],ANA.klier,'#B88A2A',1.2,true,g);
  ctx.shadowBlur=0; anAdrenal(1); ctx.restore(); }

// ---------- voortplanting ----------
function anRepro(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anLine([[s*0.07,3.62],[s*0.17,3.55],[s*0.24,3.58]],ANA.baar,0.02*HH); const [ox,oy]=AP(s*0.27,3.62); ctx.save(); anGlow(ANA.baar,g); ctx.beginPath(); ctx.ellipse(ox,oy,0.045*HH,0.03*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.restore(); }
  anShape([[0,3.56],[0.08,3.58],[0.07,3.7],[0.03,3.78],[0,3.8],[-0.03,3.78],[-0.07,3.7],[-0.08,3.58]],ANA.baar,'#B86468',1.5,true,g);
  ctx.restore(); }
function testes(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.06,4.1); ctx.save(); anGlow(ANA.baar,g||a); ctx.beginPath(); ctx.ellipse(x,y,0.04*HH,0.055*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.strokeStyle='#B86468'; ctx.lineWidth=1.2; ctx.stroke(); ctx.restore(); } ctx.restore(); }

// ---------- huid ----------
function skin(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; ctx.shadowColor='#F0C9A0'; ctx.shadowBlur=18; ctx.strokeStyle='#F0C9A0'; ctx.lineWidth=0.045*HH; ctx.lineJoin='round';
  anPath(ctx,APs(anSym(AN_BODY))); ctx.stroke(); anPath(ctx,APs(anSym(AN_HEAD))); ctx.stroke(); ctx.restore(); }
function skull(a){ anSkull(a,a); }

// ---------- alles samen (zelfde sleutels als het oude bodyOrgans) ----------
function bodyOrgans(o={}){ const A=k=>o[k]===undefined?0:o[k]; const t=o.t||0; const sil=o.sil===undefined?0.3:o.sil;
  const figA=Math.min(1,0.25+sil*1.0);
  anFigure(figA,t); anCavity(0.35*Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('hormoon'),A('afweer'),A('voortpl'),A('zenuw'),0.4)*Math.min(1,sil*3));
  const rest=Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('zenuw'),A('afweer'),A('hormoon'),A('voortpl'));
  anSkeleton(A('skelet'),{schedel:A('skelet')>0.5});
  anMuscles(A('spier')*(1-0.55*rest));
  anVessels(A('bloed')*0.9,t,A('bloed')>0.5?A('bloed'):0);
  anNerves(A('zenuw'),t,o.impuls||0);
  anUrinary(A('uitsch'),t,o.urine||0);
  anRepro(A('voortpl'));
  pancreas(A('spijs')*0.9); anDigest(A('spijs'),t);
  anTrachea(A('adem')); anLungs(A('adem'),o.breath||0);
  anHeart(A('bloed'),o.beat||0);
  anLymph(A('afweer'),t);
  anGlands(A('hormoon'));
}
// mens = vaste personage uit het castboek in plaats van het oude poppetje (Kamiel 20 okt 2026)
function human(ctx,x,y,h,a=1,color,o={}){ persoon(ctx,o.wie||'lotte',x,y,h,Object.assign({a},o)); }

// ===== Van cel tot lichaam — scènes (kerndoelen onderbouw, film 2) =====
// Hulpjes uit film 1 staan hierboven (helpers1.js), plus het castboek (lib_cast.js: persoon) en de anatomie (anatomie.js: realistisch lichaam, bodyOrgans, anHeart, anLungs, …).
// Nieuwe tekeningen: gymzaal, spiercel, weefseltegels, kuitspier, bot, slaplant met organen, bladdoorsnede, gespecialiseerde cellen, trap.
// Versie 1.1 (21 okt 2026): grijze poppetjes vervangen. 'Jij' = Lotte uit het castboek (zoals in film 2b), rent in de gymles echt (zijaanzicht);
// 'een volwassen mens' = Mevrouw Visser; lichaam met organen = anatomie.js; losse organen (hart, long, maag, huid) en de kuitspier realistischer.

// ---------- film 2: nieuwe tekeningen ----------
function muscleCell(x,y,len,a=1,ry=24){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.moveTo(x-len/2,y); ctx.quadraticCurveTo(x-len/4,y-ry-2,x,y-ry); ctx.quadraticCurveTo(x+len/4,y-ry-2,x+len/2,y); ctx.quadraticCurveTo(x+len/4,y+ry+2,x,y+ry); ctx.quadraticCurveTo(x-len/4,y+ry+2,x-len/2,y); ctx.closePath(); shape(ctx,rgba(C.koraal,0.35),lighten(C.koraal,0.2),2);
  ctx.strokeStyle=rgba(C.koraal,0.6); ctx.lineWidth=1.5; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x-len/2+30,y+k*ry/3); ctx.lineTo(x+len/2-30,y+k*ry/3); ctx.stroke(); }
  nucleus(ctx,x-len*0.18,y-ry*0.25,Math.min(11,ry*0.45),1,0); nucleus(ctx,x+len*0.22,y+ry*0.2,Math.min(11,ry*0.45),1,0); ctx.restore(); }
function neuron(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle=C.paars; ctx.lineCap='round';
  ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+420*s,y+10*s); ctx.stroke();
  [[-60,-70],[-80,10],[-50,80],[20,-85],[30,80]].forEach(([dx,dy])=>{ ctx.lineWidth=3*s; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+dx*0.5*s,y+dy*0.7*s,x+dx*s,y+dy*s); ctx.stroke(); });
  [[-20,-30],[-20,30],[20,30]].forEach(([dx,dy])=>{ ctx.lineWidth=2.5*s; ctx.beginPath(); ctx.moveTo(x+420*s,y+10*s); ctx.lineTo(x+420*s+dx*s,y+10*s+dy*s); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(x,y,34*s,30*s,0,0,6.283); shape(ctx,rgba(C.paars,0.5),lighten(C.paars,0.3),2); nucleus(ctx,x,y,12*s,1,0); ctx.restore(); }
function rbc(x,y,r,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.95,0,0,6.283); shape(ctx,'#B85A5A','#D88080',2); ctx.beginPath(); ctx.ellipse(x,y,r*0.45,r*0.4,0,0,6.283); ctx.fillStyle=rgba('#7A3838',0.5); ctx.fill(); ctx.restore(); }
function bone(x,y,len,rot,a=1,s=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.rotate(rot); const w=26*s, k=30*s;
  roundRect(ctx,-len/2,-w/2,len,w,w/2); shape(ctx,'#E9E4D6','#B8B2A2',2);
  [[-len/2,-1],[len/2,1]].forEach(([ex])=>{ ctx.beginPath(); ctx.arc(ex,-k*0.55,k*0.6,0,6.283); ctx.arc(ex,k*0.55,k*0.6,0,6.283); shape(ctx,'#E9E4D6','#B8B2A2',2); });
  ctx.restore(); }
function boneCells(x,y,len,a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let i=0;i<14;i++){ const px=x-len/2+40+(i*(len-80)/13), py=y+(hash(i*3.3)-0.5)*16; ctx.beginPath(); ctx.ellipse(px,py,9,6,hash(i)*3,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); for(let k=0;k<5;k++){ const an=k*1.26+hash(i+k); ctx.strokeStyle=rgba(C.kern,0.6); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(px+Math.cos(an)*9,py+Math.sin(an)*6); ctx.lineTo(px+Math.cos(an)*20,py+Math.sin(an)*14); ctx.stroke(); } } ctx.restore(); }
// ---------- mensen: castboek (Lotte = jij) ----------
// tijdelijk het anatomie-assenstelsel verleggen: punt (ox,oy) in hoofdhoogtes komt op (x,y), HH px per hoofdhoogte
function opPlek(x,y,HH,ox,oy,fn){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; BODY.h=HH*AN_H; BODY.cx=x-ox*HH; BODY.yb=y-oy*HH+BODY.h; try{ fn(); } finally{ Object.assign(BODY,o); } }
function lijfOp(cx,yb,h,fn){ const o={cx:BODY.cx,yb:BODY.yb,h:BODY.h}; Object.assign(BODY,{cx,yb,h}); try{ fn(); } finally{ Object.assign(BODY,o); } }
// grondsnelheid (px/s) bij een gang: exact uit het castboek (gangSnelheid), zodat de steunvoet niet over de vloer glijdt (v1.2, 22 okt 2026)
function grondV(h,gang='ren'){ return gangSnelheid('lotte',h,gang); }
// Lotte rent (of staat) van opzij; o.hart / o.adem (0..1) tekenen hart en longen in de borst, o.puf = ademwolkjes bij de mond
// o.gang = 'ren' (standaard) of 'sprint'; o.vooruit: x = startpunt, Lotte beweegt zelf met grondV (steunvoet staat stil op de vloer)
function renner(x,fy,h,t,o={}){ const kijk=o.kijk||1, ren=o.ren!==false, gang=o.gang||'ren';
  const A=persoon(ctx,'lotte',x,fy,h,{zij:true,kijk,gang:ren?gang:null,vooruit:ren&&!!o.vooruit,t,outfit:'sport',uit:o.uit||'blij',a:o.a==null?1:o.a});
  if(!A.hoofd) return A; const r=A.hoofd.r, hh=h*(CAST.lotte.lengte||1)/6.1;
  const bx=lerp(A.heup.x,A.hoofd.x,0.5)+kijk*0.12*hh, by=lerp(A.heup.y,A.hoofd.y,0.5)+0.05*hh; A.borst={x:bx,y:by};
  A.mond={x:A.hoofd.x+kijk*0.72*r, y:A.hoofd.y+0.45*r};
  const hart=o.hart||0, adem=o.adem||0;
  if(hart>0.01||adem>0.01){ ctx.save(); ctx.translate(bx,by); ctx.rotate(kijk*(ren?GANG[gang].leun*Math.PI/180:0.03)); ctx.translate(-bx,-by);
    opPlek(bx,by,0.155*hh*6.1/7.3*4.6,0.02,2.12,()=>{ anLungs(adem*0.95,o.breath||0,adem*0.5); anHeart(hart,o.beat||0,hart*0.6); }); ctx.restore(); }
  const pf=o.puf||0; if(pf>0.01) for(let i=0;i<3;i++){ const u=((t*1.7+i/3)%1); alpha(ctx,pf*(1-u)*0.75,()=>{ ctx.beginPath(); ctx.ellipse(A.mond.x+kijk*(10+u*18)-kijk*u*110,A.mond.y+6+u*14,7+u*16,5+u*11,0,0,6.283); ctx.fillStyle='#D8EEF2'; ctx.fill(); }); }
  return A; }
// gymzaal die meeschuift (camera volgt de renner): scroll in px
function gymHall(scroll=0){ bg(ctx,'schema'); const fy=800, P=2400, off=((scroll%P)+P)%P;
  // achterwand: lambrisering met naden, hoge ramen
  ctx.fillStyle='#1F2C45'; ctx.fillRect(0,fy-190,W,190); ctx.strokeStyle=rgba(C.line,0.22); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,fy-190); ctx.lineTo(W,fy-190); ctx.stroke();
  ctx.strokeStyle=rgba(C.line,0.1); ctx.lineWidth=2; for(let x=-(off%160);x<W;x+=160){ ctx.beginPath(); ctx.moveTo(x,fy-190); ctx.lineTo(x,fy); ctx.stroke(); }
  for(let k=-1;k<2;k++){ const b=k*P-off;
    for(let w=0;w<3;w++){ const wx=b+620+w*300; if(wx>W+40||wx<-260) continue; roundRect(ctx,wx,90,220,150,6); shape(ctx,rgba('#2E4466',0.55),rgba(C.line,0.3),2); ctx.strokeStyle=rgba(C.line,0.18); ctx.beginPath(); ctx.moveTo(wx+110,90); ctx.lineTo(wx+110,240); ctx.moveTo(wx,165); ctx.lineTo(wx+220,165); ctx.stroke(); }
    // wandrek
    const rx=b+120; if(rx<W+40&&rx>-300){ ctx.strokeStyle=rgba('#C9A27E',0.55); ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(rx,230); ctx.lineTo(rx,fy); ctx.moveTo(rx+220,230); ctx.lineTo(rx+220,fy); ctx.stroke(); ctx.lineWidth=4; for(let i=0;i<9;i++){ ctx.beginPath(); ctx.moveTo(rx,270+i*60); ctx.lineTo(rx+220,270+i*60); ctx.stroke(); } }
    // basketbalbord met ring en netje
    const hx=b+1750; if(hx<W+200&&hx>-200){ ctx.strokeStyle=rgba(C.line,0.5); ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(hx+120,280); ctx.lineTo(hx+170,280); ctx.lineTo(hx+170,fy-190); ctx.stroke(); roundRect(ctx,hx-20,250,150,100,6); shape(ctx,rgba('#E9E4D6',0.12),rgba(C.line,0.55),3); ctx.strokeStyle=rgba('#E8833A',0.9); ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(hx+40,360,40,9,0,0,6.283); ctx.stroke(); ctx.strokeStyle=rgba(C.line,0.4); ctx.lineWidth=1.5; for(let i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(hx+i*16,362); ctx.lineTo(hx+12+i*12,410); ctx.stroke(); } }
    // bank langs de wand
    const bk=b+2050; if(bk<W+40&&bk>-420){ roundRect(ctx,bk,fy-70,380,22,6); shape(ctx,'#8A6A4E','#A8866A',1.5); ctx.fillStyle='#6E5440'; ctx.fillRect(bk+30,fy-48,14,48); ctx.fillRect(bk+336,fy-48,14,48); }
  }
  // vloer: houten sportvloer met lijnen
  ctx.fillStyle='#3A3550'; ctx.fillRect(0,fy,W,H-fy); ctx.fillStyle='#4A4258'; for(let y=fy;y<H;y+=26){ ctx.fillRect(0,y,W,2); }
  ctx.strokeStyle=rgba(C.goud,0.45); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,fy+60); ctx.lineTo(W,fy+60); ctx.stroke();
  ctx.strokeStyle=rgba('#E8833A',0.35); ctx.lineWidth=4; for(let x=-(off%640);x<W+640;x+=640){ ctx.beginPath(); ctx.moveTo(x,fy+8); ctx.lineTo(x-40,H); ctx.stroke(); }
  ctx.strokeStyle=rgba(C.line,0.35); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,fy); ctx.lineTo(W,fy); ctx.stroke();
  return fy; }
function heart(x,y,s,a=1,beat=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); const k=1+0.12*Math.max(0,Math.sin(beat)); ctx.scale(s*k,s*k); ctx.beginPath(); ctx.moveTo(0,28); ctx.bezierCurveTo(-40,-6,-30,-40,0,-18); ctx.bezierCurveTo(30,-40,40,-6,0,28); ctx.closePath(); shape(ctx,C.koraal,lighten(C.koraal,0.25),2); ctx.restore(); }
function lungs(x,y,s,a=1,breath=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; const k=1+0.08*Math.max(0,Math.sin(breath)); [[-1,0],[1,0]].forEach(([d])=>{ ctx.beginPath(); ctx.ellipse(x+d*40*s,y,30*s*k,52*s*k,0,0,6.283); shape(ctx,rgba(C.teal,0.55),lighten(C.teal,0.2),2); }); ctx.strokeStyle=lighten(C.teal,0.2); ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(x,y-80*s); ctx.lineTo(x,y-20*s); ctx.stroke(); ctx.restore(); }
function kidney(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.ellipse(x,y,14*s,24*s,0,0,6.283); shape(ctx,'#9A4A4A','#C47070',1.5); ctx.restore(); }
// lichaam met organen: anatomie.js (bodyOrgans, realistisch, vooraanzicht); BODY = midden, voeten, lengte
const BODY={cx:960,yb:895,h:730};
const SYS={ // naam, sleutel, aanwijspunt (relatief in u), labelpositie, taak
  spijs:['spijsverteringsstelsel',0.3,4.3,1400,470,'eten klein maken, opnemen'],
  adem:['ademhalingsstelsel',-0.9,3.1,440,600,'zuurstof erin, koolstofdioxide eruit'],
  bloed:['bloedvatenstelsel',-0.3,2.95,440,60,'alles rondbrengen'],
  zenuw:['zenuwstelsel',0,0.5,1400,120,'signalen doorgeven'],
  skelet:['skelet',0.7,6.6,1400,760,'stevigheid en bescherming'],
  spier:['spierstelsel',-1.55,3.1,440,600,'bewegen'],
  uitsch:['uitscheidingsstelsel',0.95,4.55,1400,600,'afval uit je bloed'],
  afweer:['afweersysteem',1.35,2.5,1400,300,'tegen ziekteverwekkers'],
  hormoon:['hormoonstelsel',0,0.85,440,110,'regelen met stoffen in je bloed'],
  voortpl:['voortplantingsstelsel',0.1,5.45,440,760,'nieuw leven'],
};
// namen in twee kolommen naast het lichaam, op de hoogte van het stelsel (geen wijslijnen; zoals film 2b)
function sysPos(k){ const HH=AHH(), top=AB().top, L=BODY.cx-1.45*HH, R=BODY.cx+1.45*HH, y=v=>top+v*HH;
  return ({ hormoon:[L,y(0.55),'right'], bloed:[L,y(1.3),'right'], adem:[L,y(2.05),'right'], spier:[L,y(2.8),'right'], voortpl:[L,y(3.55),'right'],
            zenuw:[R,y(0.4),'left'], afweer:[R,y(1.45),'left'], spijs:[R,y(2.4),'left'], uitsch:[R,y(3.2),'left'], skelet:[R,y(4.6),'left'] })[k]; }
function sysLabel(k,a,meta=true){ const s=SYS[k]; if(a<=0.01) return; const p=sysPos(k); naamBij(ctx,s[0],meta?s[5]:'',p[0],p[1],a,p[2]); }
// kuitspier als orgaan: twee spierkoppen, dikke buik, versmalt naar de achillespees
function calfPath(k=1){ ctx.beginPath(); ctx.moveTo(-74*k,-252*k); ctx.bezierCurveTo(-128*k,-205*k,-138*k,-40*k,-98*k,62*k); ctx.bezierCurveTo(-74*k,128*k,-34*k,176*k,-22*k,212*k); ctx.lineTo(22*k,212*k);
  ctx.bezierCurveTo(34*k,176*k,74*k,128*k,98*k,62*k); ctx.bezierCurveTo(138*k,-40*k,128*k,-205*k,74*k,-252*k); ctx.bezierCurveTo(40*k,-276*k,-40*k,-276*k,-74*k,-252*k); ctx.closePath(); }
function calf(x,y,s,a=1,o={}){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.translate(x,y); ctx.scale(s,s);
  // achillespees (onder) en pezen van de koppen (boven)
  const pees=o.pees===undefined?1:o.pees; alpha(ctx,pees,()=>{ ctx.fillStyle='#E9E4D6'; ctx.beginPath(); ctx.moveTo(-24,200); ctx.bezierCurveTo(-20,260,-16,300,-20,336); ctx.lineTo(20,336); ctx.bezierCurveTo(16,300,20,260,24,200); ctx.closePath(); ctx.fill(); ctx.strokeStyle=rgba('#B8B2A2',0.7); ctx.lineWidth=1.5; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(k*9,215); ctx.lineTo(k*6,330); ctx.stroke(); }
    [-1,1].forEach(d=>{ ctx.beginPath(); ctx.moveTo(d*60,-262); ctx.quadraticCurveTo(d*70,-300,d*64,-322); ctx.strokeStyle='#E9E4D6'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.stroke(); }); });
  // spierbuik met schaduw rechts, glans links
  calfPath(); ctx.fillStyle='#B9524C'; ctx.fill(); ctx.save(); calfPath(); ctx.clip(); ctx.fillStyle='#9E423D'; ctx.beginPath(); ctx.ellipse(110,0,90,300,0,0,6.283); ctx.fill(); ctx.fillStyle=rgba('#E58E82',0.35); ctx.beginPath(); ctx.ellipse(-70,-60,30,150,0.1,0,6.283); ctx.fill();
    // spiervezelbundels die naar de pees lopen
    ctx.strokeStyle=rgba('#7E2E2A',0.55); ctx.lineWidth=2; for(let k=-5;k<=5;k++){ if(k===0) continue; ctx.beginPath(); ctx.moveTo(k*20,-262+Math.abs(k)*8); ctx.bezierCurveTo(k*30,-120,k*24,60,k*3.5,212); ctx.stroke(); }
    ctx.strokeStyle=rgba('#F0A89C',0.35); ctx.lineWidth=1.2; for(let k=-4;k<=4;k++){ ctx.beginPath(); ctx.moveTo(k*20+10,-250+Math.abs(k)*8); ctx.bezierCurveTo(k*30+10,-120,k*24+8,60,k*3.5+3,212); ctx.stroke(); }
    // naad tussen de twee koppen
    ctx.strokeStyle=rgba('#6E2622',0.8); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,-268); ctx.bezierCurveTo(6,-180,-4,-90,0,-10); ctx.stroke(); ctx.restore();
  calfPath(); ctx.strokeStyle='#D47A70'; ctx.lineWidth=2.5; ctx.stroke();
  if(o.zenuw){ ctx.save(); ctx.globalAlpha*=o.zenuw; ctx.strokeStyle='#B79AE6'; ctx.shadowColor='#B79AE6'; ctx.shadowBlur=8; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-22,-262); ctx.quadraticCurveTo(14,-60,-12,190); ctx.stroke(); [[-80,-60],[62,0],[-70,80],[50,120]].forEach(([dx,dy])=>{ ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo((dx<0?-6:-2),dy-60); ctx.quadraticCurveTo(dx*0.5,dy-20,dx,dy); ctx.stroke(); }); ctx.restore(); }
  if(o.vat){ ctx.save(); ctx.globalAlpha*=o.vat; ctx.lineCap='round'; ctx.strokeStyle='#D04A44'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(30,-258); ctx.quadraticCurveTo(-24,0,22,200); ctx.stroke(); ctx.strokeStyle='#5677C2'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(50,-252); ctx.quadraticCurveTo(4,20,40,196); ctx.stroke();
    ctx.lineWidth=2; [[-0.2,-1],[0.15,1],[0.45,-1],[0.7,1]].forEach(([u,d])=>{ const py=-250+u*450, px=34-58*Math.sin(u*Math.PI)*0.9+u*0; ctx.strokeStyle='#D04A44'; ctx.beginPath(); ctx.moveTo(px,py); ctx.quadraticCurveTo(px+d*40,py+20,px+d*70,py+50); ctx.stroke(); }); ctx.restore(); }
  if(o.bind){ ctx.save(); ctx.globalAlpha*=o.bind; ctx.save(); ctx.scale(1.07,1.04); calfPath(); ctx.restore(); ctx.strokeStyle=rgba('#E9E4D6',0.75); ctx.lineWidth=7; ctx.stroke(); ctx.save(); ctx.scale(1.07,1.04); calfPath(); ctx.restore(); ctx.strokeStyle=rgba('#FFFFFF',0.35); ctx.lineWidth=1.5; ctx.setLineDash([3,7]); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// losse organen, realistisch getekend met anatomie.js (voor de rij hart · long · maag · huid · bot)
function orgaanLos(k,x,y,s=1,t=0){
  if(k==='hart') opPlek(x,y,330*s,0.09,2.15,()=>anHeart(1,t*6,0.25));
  if(k==='long') opPlek(x,y,165*s,0,1.86,()=>{ anTrachea(1); anLungs(1,t*3,0.2); });
  if(k==='maag') opPlek(x,y,270*s,0.26,2.86,()=>{ anLine([[0.04,2.38],[0.08,2.52],[0.13,2.64]],ANA.slok,0.09*AHH()); anShape(AN_MAAG,ANA.maag,ANA.maagS,2.5); ctx.save(); ctx.globalAlpha*=0.55; anLine([[0.2,2.62],[0.38,2.7],[0.45,2.9]],ANA.maagS,2); anLine([[0.12,3.06],[0.3,3.05],[0.42,2.98]],ANA.maagS,2); anLine([[0.25,2.75],[0.4,2.82],[0.46,3.0]],ANA.maagS,1.5); ctx.restore(); anLine([[-0.06,3.04],[-0.17,3.1],[-0.2,3.2]],ANA.darm,0.07*AHH()); });
  if(k==='huid') huidBlok(x,y,s);
}
// stukje huid in doorsnede: opperhuid, lederhuid (haar, zweetklier, bloedvaatje), onderhuids vet
function huidBlok(x,y,s=1){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); const w=190,h=150; roundRect(ctx,-w/2,-h/2,w,h,12); ctx.save(); ctx.clip();
  ctx.fillStyle='#EBD49A'; ctx.fillRect(-w/2,-h/2,w,h); for(let i=0;i<9;i++){ ctx.beginPath(); ctx.ellipse(-w/2+14+i*22,h/2-20+(i%2)*8,13,11,0,0,6.283); ctx.fillStyle='#F3E2AE'; ctx.fill(); ctx.strokeStyle='#CDB574'; ctx.lineWidth=1; ctx.stroke(); }
  ctx.fillStyle='#E6A99A'; ctx.beginPath(); ctx.moveTo(-w/2,-h/2); ctx.lineTo(w/2,-h/2); ctx.lineTo(w/2,h/2-40); ctx.bezierCurveTo(40,h/2-30,-40,h/2-46,-w/2,h/2-36); ctx.closePath(); ctx.fill();
  ctx.strokeStyle=rgba('#C98577',0.6); ctx.lineWidth=1.2; for(let i=0;i<7;i++){ ctx.beginPath(); for(let k=0;k<=12;k++){ const px=-w/2+k*w/12, py=-h/2+42+i*9+Math.sin(k*1.3+i)*3; k?ctx.lineTo(px,py):ctx.moveTo(px,py); } ctx.stroke(); }
  ctx.strokeStyle='#D04A44'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-w/2,h/2-52); ctx.bezierCurveTo(-30,h/2-50,-20,-h/2+40,10,-h/2+38); ctx.bezierCurveTo(30,-h/2+40,30,h/2-56,w/2,h/2-50); ctx.stroke();
  ctx.strokeStyle='#8FB8D8'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(52,-h/2+14); ctx.lineTo(54,h/2-62); ctx.stroke(); ctx.beginPath(); for(let k=0;k<20;k++){ const an=k*0.9; ctx.lineTo(54+Math.cos(an)*9,h/2-58+Math.sin(an)*5+k*0.3); } ctx.stroke();
  ctx.fillStyle='#C98577'; ctx.beginPath(); ctx.ellipse(-46,h/2-58,10,16,0,0,6.283); ctx.fill(); ctx.strokeStyle='#3A2418'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-46,h/2-58); ctx.lineTo(-42,-h/2+14); ctx.quadraticCurveTo(-36,-h/2-10,-22,-h/2-30); ctx.stroke();
  ctx.fillStyle='#D9A982'; ctx.beginPath(); ctx.moveTo(-w/2,-h/2); ctx.lineTo(w/2,-h/2); ctx.lineTo(w/2,-h/2+14); for(let k=12;k>=0;k--){ ctx.lineTo(-w/2+k*w/12,-h/2+14+Math.sin(k*1.7)*3); } ctx.closePath(); ctx.fill(); ctx.fillStyle='#C08A62'; ctx.fillRect(-w/2,-h/2,w,4);
  ctx.restore(); roundRect(ctx,-w/2,-h/2,w,h,12); ctx.strokeStyle=rgba('#F0D6B8',0.7); ctx.lineWidth=2; ctx.stroke();
  ctx.strokeStyle='#3A2418'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-42,-h/2); ctx.quadraticCurveTo(-36,-h/2-10,-22,-h/2-30); ctx.stroke(); ctx.restore(); }
// weefseltegel: cirkel met een patroon
function tissueTile(x,y,r,kind,a,t=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.clip(); ctx.translate(x,y);
  if(kind==='spier'){ for(let k=-3;k<=3;k++) muscleCell(0,k*44,r*2.4,1,16); }
  if(kind==='zenuw'){ neuron(-110,-40,0.55); neuron(-60,70,0.45); neuron(-150,120,0.4); }
  if(kind==='bot'){ ctx.fillStyle='#E9E4D6'; ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<4;i++){ ctx.strokeStyle='#C9C3B3'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,0,30+i*32,0,6.283); ctx.stroke(); } for(let i=0;i<22;i++){ const an=hash(i*2.1)*6.283, d=35+hash(i*5.3)*(r-45); ctx.beginPath(); ctx.ellipse(Math.cos(an)*d,Math.sin(an)*d,7,4,an,0,6.283); shape(ctx,rgba(C.kern,0.8),lighten(C.kern,0.3),1); } }
  if(kind==='bind'){ ctx.strokeStyle=C.grain; ctx.lineWidth=2.5; for(let i=0;i<16;i++){ const an=hash(i*1.7)*6.283, px=(hash(i*3.1)-0.5)*2*r, py=(hash(i*4.3)-0.5)*2*r; ctx.beginPath(); ctx.moveTo(px-Math.cos(an)*120,py-Math.sin(an)*120); ctx.lineTo(px+Math.cos(an)*120,py+Math.sin(an)*120); ctx.stroke(); } for(let i=0;i<9;i++){ const px=(hash(i*7.1)-0.5)*1.6*r, py=(hash(i*8.3)-0.5)*1.6*r; ctx.beginPath(); ctx.ellipse(px,py,16,9,hash(i)*3,0,6.283); shape(ctx,rgba(C.grain,0.35),C.grain,1.2); nucleus(ctx,px,py,5,1,0); } }
  if(kind==='dek'){ for(let row=-2;row<=2;row++) for(let c=-4;c<=4;c++){ const px=c*60+(row%2?30:0), py=row*34; ctx.beginPath(); ctx.ellipse(px,py,31,17,0,0,6.283); shape(ctx,'rgba(120,155,205,0.22)','rgba(55,85,145,0.6)',1.5); dot(ctx,px,py,6,'rgba(42,62,128,0.85)'); } }
  if(kind==='bloed'){ ctx.fillStyle=rgba('#E8D9A8',0.18); ctx.fillRect(-r,-r,2*r,2*r); for(let i=0;i<14;i++){ const px=(hash(i*2.7)-0.5)*1.8*r, py=(hash(i*3.9)-0.5)*1.8*r+(t*20+i*13)%40-20; rbc(px,py,22); } dot(ctx,30,-40,18,'rgba(235,235,245,0.9)','#C9C3D6',1.5); dot(ctx,-70,60,16,'rgba(235,235,245,0.9)','#C9C3D6',1.5); }
  ctx.restore(); ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.strokeStyle=C.line; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore(); }
// bloedvat (schematisch, verticaal) met bewegende cellen
function vessel(x,y,w,h,t,a=1,label=true){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; roundRect(ctx,x-w/2,y,w,h,w/2); shape(ctx,rgba('#9A4A4A',0.35),'#C47070',2); ctx.save(); roundRect(ctx,x-w/2,y,w,h,w/2); ctx.clip(); for(let i=0;i<12;i++){ const py=y+((t*70+i*(h/9))%h), px=x+(hash(i*3.3)-0.5)*(w-70); rbc(px,py,20+hash(i)*6); } dot(ctx,x+10,y+((t*55+200)%h),17,'rgba(235,235,245,0.9)','#C9C3D6',1.5); ctx.restore(); ctx.restore(); }
// slaplant met organen (bloeiende sla: stengel, bloem), in de grond
function groundLine(y){ ctx.fillStyle='#2A2119'; ctx.fillRect(0,y,W,H-y); ctx.strokeStyle=lighten(C.bruin,0.2); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
function roots(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; ctx.strokeStyle='#D9CFA8'; ctx.lineCap='round'; [[0,0,-30,120,-60,250,5],[0,0,40,100,90,230,4.5],[0,0,-90,80,-180,170,3.5],[0,0,100,60,200,150,3.5],[0,0,-20,160,20,300,3],[-30,120,-110,140,-150,220,2],[40,100,120,150,150,260,2],[-60,250,-90,290,-100,340,1.5],[90,230,130,280,160,330,1.5]].forEach(([ax,ay,bx,by,cx2,cy2,w])=>{ ctx.lineWidth=w*s; ctx.beginPath(); ctx.moveTo(x+ax*s,y+ay*s); ctx.quadraticCurveTo(x+bx*s,y+by*s,x+cx2*s,y+cy2*s); ctx.stroke(); }); ctx.restore(); }
function flower(x,y,s,a=1){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(let k=0;k<8;k++){ const an=k/8*6.283; ctx.beginPath(); ctx.ellipse(x+Math.cos(an)*22*s,y+Math.sin(an)*22*s,20*s,9*s,an,0,6.283); shape(ctx,C.goud,lighten(C.goud,0.3),1.5); } dot(ctx,x,y,12*s,C.oker,lighten(C.oker,0.3),1.5); ctx.restore(); }
function slaPlant(x,yg,s,o={}){ // x, grondlijn yg; o: {wortel,stengel,blad,bloem,hl}
  const A=k=>o[k]===undefined?1:o[k];
  roots(x,yg,s*0.9,A('wortel'));
  alpha(ctx,A('stengel'),()=>{ ctx.strokeStyle=G1; ctx.lineWidth=16*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,yg); ctx.quadraticCurveTo(x+10*s,yg-250*s,x-6*s,yg-470*s); ctx.stroke(); ctx.strokeStyle=lighten(G1,0.3); ctx.lineWidth=2; ctx.stroke(); });
  alpha(ctx,A('blad'),()=>{ [[-90,-120,0.9,-0.9,1],[95,-140,0.9,0.9,2],[-80,-250,0.75,-1.0,3],[85,-270,0.75,1.0,4],[-60,-360,0.6,-1.1,5],[60,-380,0.6,1.1,6]].forEach(([dx,dy,sc,rot,seed])=>{ lettuceLeaf(x+dx*s,yg+dy*s,95*s*sc,55*s*sc,rot,seed,x,yg+dy*s+40*s,seed%2?G1:G2,V1,{amp:0.06}); }); });
  flower(x-6*s,yg-490*s,s*1.1,A('bloem'));
  if(o.hl){ const P={wortel:[x,yg+150*s,200*s],stengel:[x,yg-230*s,70*s],blad:[x+95*s,yg-140*s,110*s],bloem:[x-6*s,yg-490*s,60*s]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.arc(P[0],P[1],P[2],0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); } }
// bladdoorsnede: opperhuid boven en onder, bladmoes, vaatbundel
function leafCross(x,y,w,o={}){ const A=k=>o[k]===undefined?1:o[k]; const h=360;
  ctx.save(); ctx.beginPath(); ctx.rect(x-w/2,y-h/2,w,h); ctx.fillStyle=C.bgMicro; ctx.fill(); ctx.strokeStyle=rgba(C.line,0.3); ctx.lineWidth=1; ctx.stroke();
  alpha(ctx,A('moes'),()=>{ for(let r=0;r<4;r++) for(let c=0;c<Math.floor(w/70);c++){ const px=x-w/2+45+c*70+(r%2?20:0), py=y-110+r*72; if(Math.abs(px-x)<70&&r>=1&&r<=2) continue; ctx.beginPath(); ctx.ellipse(px,py,30,32,0,0,6.283); shape(ctx,rgba(C.teal,0.18),C.groen,3); for(let k=0;k<4;k++){ const an=k*1.6+hash(r*11+c); chloroplast(ctx,px+Math.cos(an)*14,py+Math.sin(an)*15,16,1,an); } } });
  alpha(ctx,A('opper'),()=>{ [y-h/2+22,y+h/2-22].forEach(py=>{ for(let c=0;c<Math.floor(w/60);c++){ const px=x-w/2+32+c*60; ctx.beginPath(); ctx.ellipse(px,py,29,19,0,0,6.283); shape(ctx,rgba('#C9D6E6',0.25),'#9FB3CC',2); dot(ctx,px,py,5,'rgba(42,62,128,0.85)'); } }); });
  alpha(ctx,A('vaat'),()=>{ ctx.beginPath(); ctx.ellipse(x,y+10,64,78,0,0,6.283); shape(ctx,rgba(C.oker,0.2),C.oker,3); [[-22,-30],[22,-30],[0,-5],[-24,22],[24,22],[0,45]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.arc(x+dx,y+10+dy,14,0,6.283); shape(ctx,rgba(C.teal,0.35),lighten(C.teal,0.2),2); }); });
  if(o.hl){ const P={opper:[x,y-h/2+22,w,50],moes:[x,y-25,w,200],vaat:[x,y+10,150,180]}[o.hl]; ctx.save(); ctx.setLineDash([10,8]); roundRect(ctx,P[0]-P[2]/2,P[1]-P[3]/2,P[2],P[3],12); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// trap van vijf treden
const TRAP=[['cel','',C.koraal],['weefsel','dezelfde cellen, dezelfde taak'],['orgaan','verschillende weefsels samen'],['orgaanstelsel','organen die samenwerken'],['organisme','alles samen: één levend wezen']];
function trap(al,sub=true){ const x0=120,y0=780,sw=330,sh=118;
  TRAP.forEach((s,i)=>{ const a=al[i]; if(a<=0.01) return; alpha(ctx,a,()=>{ const x=x0+i*sw, y=y0-i*sh; ctx.beginPath(); ctx.rect(x,y,sw-6,H-y-200); shape(ctx,rgba(C.fill,0.9),C.line,1.5); text(ctx,s[0],x+24,y+52,fTekst(40,700),C.goud); if(sub&&s[1]){ ctx.font=fTekst(26); ctx.fillStyle=C.text2; ctx.textAlign='left'; wrap(ctx,s[1],x+24,y+92,sw-50,32); } }); }); }
function trapArt(al,t){ // tekeningen op de treden: mens
  alpha(ctx,al[0],()=>muscleCell(285,560,200));
  alpha(ctx,al[1],()=>{ for(let k=0;k<5;k++) muscleCell(615,470+k*20-40,210,0.9); });
  alpha(ctx,al[2],()=>calf(945,390,0.5,1,{zenuw:1,vat:1,bind:1}));
  alpha(ctx,al[3],()=>lijfOp(1275,420,290,()=>bodyOrgans({sil:0.55,bloed:1,t,beat:t*5})));
  alpha(ctx,al[4],()=>persoon(ctx,'lotte',1605,306,262,{uit:'blij',t})); }

// ================= SCÈNES =================
const SCENES={
// ---- cold open: gymles ----
s01(ctx,t,q){ const tS=q.at('sprint')-0.2, tH=q.at('hart'), tA=q.at('ademt'), tW=q.at('Waarom'), h=430;
  // v1.2: sprint uit het castboek; de camera volgt half (Lotte schuift van 380 naar 1220), de gymzaal schuift de rest, samen exact grondV → de steunvoet staat stil op de vloer
  const u=clamp((t-tS)/Math.max(1,tW-tS),0,1)*0.95, xs=lerp(380,1220,u), v=grondV(h,'sprint');
  const scroll=Math.max(0,v*(t-tS)-(xs-380)); const fy=gymHall(scroll);
  const hb=ramp(t,tH-0.6,0.5), br=ramp(t,tA-0.2,0.5);
  const A=renner(t>=tS?xs-v*(t-tS):xs,fy,h,t>=tS?t-tS:t,{ren:t>=tS,gang:'sprint',vooruit:true,hart:hb,adem:br,puf:br,beat:t*12,breath:t*7});
  // beenspieren oplichten
  const lg=fadeIO(t,q.at('beenspieren'),tH,0.4); if(lg>0.01){ ctx.save(); ctx.globalAlpha*=lg; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; const ry=(fy-A.heup.y)/2+28; ctx.beginPath(); ctx.ellipse(A.heup.x+6,A.heup.y+ry-28,150,ry,0,0,6.283); ctx.stroke(); ctx.restore(); }
  naamBij(ctx,'beenspieren','werken hard',A.heup.x-175,A.heup.y+10,lg,'right',C.goud);
  naamBij(ctx,'hart','bonkt',A.borst.x+175,A.borst.y+10,fadeIO(t,tH,tW+1,0.4),'left',C.koraal);
  naamBij(ctx,'ademt sneller','',A.mond.x+40,A.hoofd.y-A.hoofd.r-24,fadeIO(t,tA,tW+1,0.4),'left',C.teal);
  pill(ctx,960,150,'waarom doet de rest van je lichaam mee?',C.goud,ramp(t,tW,0.5),36);
},
// ---- titel ----
s03(ctx,t,q){ bg(ctx,'schema'); const a=ramp(t,0.1,0.7);
  alpha(ctx,a,()=>{ text(ctx,'Van cel tot lichaam',120,380,fTitel(110),C.text); text(ctx,'Hoe dertigduizend miljard cellen samenwerken',120,460,fTekst(44),C.text2); });
  alpha(ctx,ramp(t,0.5,1.2),()=>{ ctx.save(); ctx.translate(1420,0); ctx.scale(0.72,0.72); ctx.translate(-960,120); bodyOrgans({sil:0.45,zenuw:1,spijs:1,adem:1,bloed:1,uitsch:1,skelet:0,t,beat:t*5,breath:t*2.5}); ctx.restore(); });
  metaText(ctx,'ONDERBOUW · KERNDOELEN · FILM 2',W-80,60,C.text2,'right',24); },
// ---- H1: 30 000 miljard, geordend; spiercel → spierweefsel ----
s04(ctx,t,q){ bg(ctx,'schema'); const tK=q.at('klein'), tM=q.at('miljoenen'), tG=q.at("Zo'n");
  const a1=1-ramp(t,tK-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ persoon(ctx,'visser',520,800,560,{uit:'blij',t}); pill(ctx,520,150,'≈ 30 000 miljard cellen',C.goud,ramp(t,q.at('dertigduizend'),0.5),34);
    // hoop cellen → geordend
    const ord=ramp(t,q.at('geordend'),1.2); for(let i=0;i<48;i++){ const hx=1100+hash(i*2.1)*600, hy=300+hash(i*3.7)*460; const gx=1000+(i%8)*95, gy=330+Math.floor(i/8)*80; ctx.beginPath(); ctx.ellipse(lerp(hx,gx,ord),lerp(hy,gy,ord),26,20,0,0,6.283); shape(ctx,rgba(C.koraal,0.3),lighten(C.koraal,0.2),1.5); dot(ctx,lerp(hx,gx,ord),lerp(hy,gy,ord),6,C.kern); }
    metaText(ctx,'niet zomaar op een hoop',1340,260,C.grain,'center',26*clamp(1-ord,0.01,1)); metaText(ctx,'geordend, in stappen',1340,260,C.goud,'center',26*clamp(ord,0.01,1)); });
  const a2=ramp(t,tK-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'micro');
    const one=1-ramp(t,tM-0.2,0.8); const sq=fadeIO(t,q.at('korter'),q.at('bijna'),0.4); const len=600*(1-0.18*Math.max(0,Math.sin((t-q.at('korter'))*3))*sq);
    alpha(ctx,one,()=>{ muscleCell(960,470,len,1,40); label(ctx,'spiercel','lang en dun',960,430,1340,220,ramp(t,q.at('spiercel'),0.5)); pill(ctx,960,720,'kan korter worden',C.koraal,fadeIO(t,q.at('korter'),q.at('bijna'),0.4),30); pill(ctx,960,150,'één spiercel kan bijna niets',C.text,fadeIO(t,q.at('bijna'),tM,0.4),30); });
    const many=ramp(t,tM-0.2,0.8); if(many>0.01) alpha(ctx,many,()=>{ for(let r=0;r<9;r++) for(let c=0;c<3;c++){ muscleCell(430+c*520+(r%2?30:0),200+r*62,500,1,24); }
      const pr=ramp(t,q.at('kracht'),0.5); arrow(ctx,300,470,120,470,C.goud,6,20,pr); arrow(ctx,1620,470,1800,470,C.goud,6,20,pr);
      pill(ctx,960,820,'miljoenen spiercellen naast elkaar: samen kracht zetten',C.goud,pr,30);
      const wf=ramp(t,tG,0.5); haak(ctx,120,1800,760,'',C.goud,0); naamBij(ctx,'spierweefsel','dezelfde cellen, dezelfde taak',960,748,ramp(t,q.at('spierweefsel'),0.5),'center',C.goud);
      pill(ctx,960,100,'weefsel = een groep dezelfde cellen met dezelfde taak',C.goud,wf,30); }); });
},
// ---- H1: meer soorten weefsel (tegels) ----
s05(ctx,t,q){ bg(ctx,'schema'); const T=[['spierweefsel','kracht zetten','spier',q.at('meer')],['zenuwweefsel','geeft signalen door','zenuw',q.at('Zenuwweefsel')],['botweefsel','hard','bot',q.at('Botweefsel')],['bindweefsel','houdt alles bij elkaar','bind',q.at('Bindweefsel')],['dekweefsel','bedekt, zoals je huid','dek',q.at('Dekweefsel')]];
  T.forEach((it,i)=>{ const x=240+i*360, y=420, a=ramp(t,it[3],0.5); tissueTile(x,y,140,it[2],a,t); alpha(ctx,a,()=>{ text(ctx,it[0],x,620,fTekst(34,600),C.text,'center'); metaText(ctx,it[1],x,660,C.grain,'center',24); }); });
  const dim2=ramp(t,q.at('namen'),0.5); alpha(ctx,dim2,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.55); ctx.fillRect(0,0,W,H); });
  pill(ctx,960,150,'die namen hoef je niet te onthouden',C.text2,fadeIO(t,q.at('namen'),q.at('Wel'),0.4),32);
  alpha(ctx,ramp(t,q.at('Wel'),0.5),()=>{ text(ctx,'elk weefsel',960,380,fTitel(64),C.goud,'center'); text(ctx,'bestaat uit cellen',960,470,fTekst(44),C.text,'center'); alpha(ctx,ramp(t,q.at('eigen'),0.4),()=>text(ctx,'en heeft een eigen taak',960,540,fTekst(44),C.text,'center')); });
},
// ---- H1: kuitspier = orgaan; hart, long, maag, huid, bot; bot vraag ----
s06(ctx,t,q){ bg(ctx,'schema'); const tO=q.at('Verschillende'), tH=q.at('hart'), tB=q.at('bot');
  const a1=1-ramp(t,tH-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ const zo=ramp(t,0.2,1.2); const LH=560, hh=LH*CAST.lotte.lengte/6.1, top=860-LH*CAST.lotte.lengte, heupY=top+3.45*hh, kn=heupY+(860-heupY)*0.42;
    persoon(ctx,'lotte',420,860,LH,{outfit:'sport',uit:'blij',t});
    // kuit van het been aan de kant van de tekening; stippelring en twee zoomlijnen
    const kx=420+1.45*hh*0.24+hh*0.04, ky=kn+(860-0.3*hh-kn)*0.42, kry=(860-0.3*hh-kn)*0.42;
    ctx.save(); ctx.globalAlpha*=zo; ctx.setLineDash([8,8]); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(kx,ky,hh*0.38,kry,0,0,6.283); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(kx+hh*0.2,ky-kry*0.9); ctx.lineTo(1062,206); ctx.moveTo(kx+hh*0.2,ky+kry*0.9); ctx.lineTo(1070,760); ctx.stroke(); ctx.restore();
    calf(1180,470,1.0,zo,{zenuw:ramp(t,q.at('zenuwweefsel'),0.5),vat:ramp(t,q.at('bloedvaten'),0.5),bind:ramp(t,q.at('bindweefsel'),0.5),pees:0.0});
    // namen rechts naast de spier, van boven naar beneden (geen wijslijnen)
    naamBij(ctx,'kuitspier','',1350,250,ramp(t,q.at('kuitspier'),0.5),'left');
    naamBij(ctx,'spierweefsel','',1350,370,ramp(t,q.at('spierweefsel'),0.4),'left',C.koraal);
    naamBij(ctx,'zenuwweefsel','geeft het signaal',1350,470,ramp(t,q.at('zenuwweefsel'),0.4),'left','#B79AE6');
    naamBij(ctx,'bloedvaten','',1350,590,ramp(t,q.at('bloedvaten'),0.4),'left','#E07A70');
    naamBij(ctx,'bindweefsel','eromheen',1350,690,ramp(t,q.at('bindweefsel'),0.4),'left','#E9E4D6');
    pill(ctx,960,100,'orgaan = verschillende weefsels samen, met een eigen taak',C.goud,ramp(t,tO,0.5),30);
    const tk=ramp(t,q.at('taak'),0.5); pill(ctx,420,150,'taak: korter worden',C.koraal,tk,30); });
  const a2=ramp(t,tH-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ const O=[['hart',q.at('hart'),400,380,()=>orgaanLos('hart',400,380,1,t)],['long',q.at('long'),700,380,()=>orgaanLos('long',700,380,1,t)],['maag',q.at('maag'),1000,380,()=>orgaanLos('maag',1000,380,1,t)],['huid',q.at('huid'),1300,380,()=>orgaanLos('huid',1300,380,1,t)],['bot',tB,1600,380,()=>bone(1600,380,200,0,1,1.2)]];
    const bq=ramp(t,q.at('hard'),0.6);
    alpha(ctx,1-bq,()=>{ O.forEach(([n,tt,x,y,fn])=>{ const a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ fn(); text(ctx,n,x,560,fTekst(36,600),C.text,'center'); }); });
      metaText(ctx,'allemaal organen',960,180,C.grain,'center',28*clamp(ramp(t,tH,0.5),0.01,1)); });
    if(bq>0.01) alpha(ctx,bq,()=>{ bone(960,470,560,0,1,2.2); pill(ctx,960,720,'zit daar nog leven in?',C.goud,ramp(t,q.at('leven'),0.5),36); }); });
},
// ---- H2: bot leeft; orgaanstelsels: spijsvertering, ademhaling, bloedvaten; bloed vraag ----
s08(ctx,t,q){ bg(ctx,'schema'); const tOrg=q.at('Organen'), tBl=q.at('stroomt');
  const a1=1-ramp(t,tOrg-0.3,0.6);
  if(a1>0.01) alpha(ctx,a1,()=>{ bone(960,470,560,0,1,2.2); boneCells(960,470,560,ramp(t,q.at('botcellen'),0.6));
    naamBij(ctx,'botcellen','maken het harde spul, en zitten er nog in',960,560,ramp(t,q.at('botcellen'),0.5),'center',C.kern);
    const br=fadeIO(t,q.at('gebroken'),tOrg,0.5); if(br>0.01){ const heal=ramp(t,q.at('gebroken')+1.2,1.5); alpha(ctx,br*(1-heal),()=>{ ctx.strokeStyle=C.koraal; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(1000,440); ctx.lineTo(980,470); ctx.lineTo(1010,500); ctx.stroke(); }); pill(ctx,960,720,heal>0.5?'groeit weer aan elkaar':'gebroken',heal>0.5?C.groen:C.koraal,br,30); }
    pill(ctx,960,150,'een bot leeft',C.groen,ramp(t,q.at('leeft'),0.5),36); });
  const a2=ramp(t,tOrg-0.3,0.6)*(1-ramp(t,tBl-0.2,0.6)*0.85);
  if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('mond'),0.6),adem:ramp(t,q.at('neus'),0.6),bloed:ramp(t,q.at('hart'),0.6),t,beat:t*5,breath:t*2.5});
    pill(ctx,960,100,'orgaanstelsel = organen die samenwerken, met één grote taak',C.goud,fadeIO(t,q.at('orgaanstelsel'),q.at('mond'),0.4),30);
    sysLabel('spijs',ramp(t,q.at('spijsverteringsstelsel'),0.5)); sysLabel('adem',ramp(t,q.at('ademhalingsstelsel'),0.5)); sysLabel('bloed',ramp(t,q.at('bloedvatenstelsel'),0.5));
    const pS=sysPos('spijs'), pA=sysPos('adem'); mouth(fadeIO(t,q.at('mond'),q.at('slokdarm'),0.3)); nose(fadeIO(t,q.at('neus'),q.at('luchtpijp'),0.3));
    alpha(ctx,fadeIO(t,q.at('mond'),q.at('spijsverteringsstelsel'),0.3),()=>metaText(ctx,'mond · slokdarm · maag · darmen',pS[0],pS[1],C.grain,'left',24));
    alpha(ctx,fadeIO(t,q.at('neus'),q.at('ademhalingsstelsel'),0.3),()=>metaText(ctx,'neus · luchtpijp · longen',pA[0],pA[1],C.grain,'right',24)); });
  const a3=ramp(t,tBl-0.2,0.6); if(a3>0.01) alpha(ctx,a3,()=>{ bg(ctx,'micro'); vessel(960,80,320,760,t); pill(ctx,960,870-20,'is bloed ook een weefsel?',C.goud,ramp(t,q.at('weefsel'),0.5),36); });
},
// ---- H2: bloed = weefsel; de rest van de stelsels; tien ----
s10(ctx,t,q){ bg(ctx,'micro'); const tV=q.at('Verder');
  const a1=1-ramp(t,tV-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ vessel(960,80,320,760,t); label(ctx,'bloed','vol cellen met dezelfde taak: vervoeren',1180,400,1400,250,ramp(t,q.at('cellen'),0.5)); pill(ctx,960,870-20,'ook een weefsel, alleen zwemmen de cellen in vocht',C.goud,ramp(t,q.at('vocht'),0.5),30); });
  const a2=ramp(t,tV-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'schema');
    const K=[['zenuw','zenuwstelsel'],['skelet','skelet'],['spier','spierstelsel'],['uitsch','uitscheidingsstelsel'],['afweer','afweersysteem'],['hormoon','hormoonstelsel'],['voortpl','voortplantingsstelsel']];
    const o={sil:0.3,spijs:0.4,adem:0.4,bloed:0.4,t,beat:t*5,breath:t*2.5}; K.forEach(([k,w])=>o[k]=ramp(t,q.at(w),0.6)); o.impuls=0.6*o.zenuw; o.urine=0.6*o.uitsch; bodyOrgans(o);
    K.forEach(([k,w])=>sysLabel(k,ramp(t,q.at(w),0.5)));
    const ten=ramp(t,q.at('Tien'),0.5); pill(ctx,960,100,'tien orgaanstelsels',C.goud,ten,34); alpha(ctx,ramp(t,q.at('film'),0.4),()=>metaText(ctx,'elk later in een eigen film',960,150,C.grain,'center',24)); });
},
// ---- H2: organisme; terug naar de gymles: stelsels werken samen ----
s11(ctx,t,q){ bg(ctx,'schema'); const tG=q.at('gymles'), tS=q.at('werken');
  const a1=1-ramp(t,tG-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{ bodyOrgans({sil:0.3,spijs:0.5,adem:0.5,bloed:0.5,zenuw:0.5,skelet:0.5,uitsch:0.5,afweer:0.5,hormoon:0.5,voortpl:0.5,t}); const org=ramp(t,q.at('organisme'),0.5); alpha(ctx,org,()=>{ ctx.save(); ctx.setLineDash([12,10]); ctx.beginPath(); ctx.ellipse(960,528,300,404,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=3; ctx.stroke(); ctx.restore(); }); naamBij(ctx,'organisme','één levend wezen: jij',1282,420,org,'left',C.goud); });
  const a2=ramp(t,tG-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bodyOrgans({sil:0.3,spijs:ramp(t,q.at('darmen'),0.5),adem:ramp(t,q.at('longen'),0.5),bloed:ramp(t,q.at('bloed'),0.5),spier:1,t,beat:t*9,breath:t*4});
    // mitochondriën in de kuitspier (inzet, met zoomlijnen vanaf de kuit)
    const mi=fadeIO(t,q.at('mitochondriën'),q.at('Daarom'),0.5), [kx,ky]=AP(-0.5,5.85);
    if(mi>0.01){ ctx.save(); ctx.globalAlpha*=mi; ctx.strokeStyle=C.goud; ctx.lineWidth=1.5; const ang=Math.atan2(560-ky,380-kx); for(const d of [-1,1]){ const an=ang+d*Math.PI/2; ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(380+Math.cos(an)*150,560+Math.sin(an)*150); ctx.stroke(); } ctx.setLineDash([6,6]); ctx.beginPath(); ctx.ellipse(kx,ky,0.16*AHH(),0.5*AHH(),0,0,6.283); ctx.stroke(); ctx.restore(); }
    inset(380,560,150,mi,()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(230,410,300,300); muscleCell(380,560,280,1,40); for(let i=0;i<6;i++) mitochondrion(ctx,300+i*32,545+(i%2)*30,30,0.1*i,1,3,t); });
    alpha(ctx,fadeIO(t,q.at('verbranden'),q.at('Daarom'),0.4),()=>{ metaText(ctx,'spiercel:',380,745,C.grain,'center',22); metaText(ctx,'verbrandt voedingsstoffen met zuurstof',380,778,C.grain,'center',22); });
    // stromen langs de bloedvaten: zuurstof longen → hart → slagader → been; voedingsstoffen darmen → slagader → ander been
    const zs=fadeIO(t,q.at('zuurstof',2),tS,0.5), vs=fadeIO(t,q.at('voedingsstoffen',2),tS,0.5);
    const PZ=anDense([[-0.4,2.1],[-0.15,2.12],[0.06,2.2],[0.05,2.9],[0.04,3.38],[-0.2,3.66],[-0.34,3.96],[-0.37,4.62],[-0.42,5.2],[-0.5,5.8]],80), PV=anDense([[0.1,3.5],[0.05,3.42],[0.2,3.66],[0.34,3.96],[0.37,4.62],[0.42,5.2],[0.5,5.8]],70);
    for(let i=0;i<8;i++){ const w=((t*0.3+i/8)%1); alpha(ctx,zs,()=>{ const [x,y]=anAlong(PZ,w); dot(ctx,x,y,7,C.teal,'#FFFFFF',1); }); alpha(ctx,vs,()=>{ const [x,y]=anAlong(PV,w); dot(ctx,x,y,7,C.oker,'#FFFFFF',1); }); }
    const HH=AHH(), top=AB().top, L=BODY.cx-1.45*HH, R=BODY.cx+1.45*HH;
    naamBij(ctx,'zuurstof','uit je longen',L,top+2.05*HH,zs,'right',C.teal); naamBij(ctx,'voedingsstoffen','uit je darmen',R,top+3.4*HH,vs,'left',C.oker); naamBij(ctx,'bloed','naar de spiercellen',R,top+2.2*HH,fadeIO(t,q.at('bloed'),tS,0.5),'left',C.koraal);
    pill(ctx,960,100,'ademt sneller · hart pompt harder: je spieren hebben meer nodig',C.goud,fadeIO(t,q.at('Daarom'),tS,0.4),28);
    pill(ctx,960,100,'je orgaanstelsels werken samen',C.goud,ramp(t,tS,0.5),34); });
},
// ---- H3: terug naar de sla — vraag ----
s12(ctx,t,q){ bg(ctx,'macro'); groundLine(700); krop(700,700,0.9,0); alpha(ctx,ramp(t,0.3,0.6),()=>roots(700,700,0.8,0.6)); pill(ctx,960,150,'heeft een plant ook organen?',C.goud,ramp(t,q.at('organen'),0.5),36); },
// ---- H3: organen van de plant ----
s14(ctx,t,q){ bg(ctx,'macro'); groundLine(700); const P=['wortels','stengel','bladeren','bloem'];
  const hl = t>=q.at('zorgt')?'bloem': t>=q.at('vangen')?'blad': t>=q.at('draagt')?'stengel': t>=q.at('halen')?'wortel':null;
  slaPlant(760,700,1.0,{wortel:ramp(t,q.at('wortels'),0.5),stengel:ramp(t,q.at('stengel'),0.5),blad:1,bloem:ramp(t,q.at('bloem'),0.5),hl});
  pill(ctx,760,100,'een slaplant is een organisme',C.goud,fadeIO(t,q.at('organisme'),q.at('organen'),0.4),32);
  label(ctx,'wortels','halen water uit de grond',760,820,1250,840,ramp(t,q.at('halen'),0.5),C.grain);
  label(ctx,'stengel','draagt en vervoert',760,470,1250,560,ramp(t,q.at('draagt'),0.5),C.groen);
  naamBij(ctx,'bladeren','vangen licht',950,600,ramp(t,q.at('vangen'),0.5),'left',C.groen);
  label(ctx,'bloem','zorgt voor zaden',754,210,1250,200,ramp(t,q.at('zorgt'),0.5),C.goud);
  alpha(ctx,ramp(t,q.at('Alle'),0.5),()=>{ ctx.save(); ctx.setLineDash([10,8]); ctx.beginPath(); ctx.ellipse(760,870,240,160,0,0,6.283); ctx.strokeStyle=C.goud; ctx.lineWidth=2.5; ctx.stroke(); ctx.restore(); });
  pill(ctx,760,100,'wortelstelsel: een orgaanstelsel van de plant',C.goud,ramp(t,q.at('wortelstelsel'),0.5),30);
},
// ---- H3: één blad: opperhuid, bladmoes, vaatbundels ----
s15(ctx,t,q){ bg(ctx,'micro'); const tO=q.at('opperhuid'), tM=q.at('bladmoes'), tVb=q.at('vaatbundels'), tB=q.at('dus');
  const hl = t>=tB?null: t>=tVb?'vaat': t>=tM?'moes': t>=tO?'opper':null;
  const intro=1-ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,intro,()=>{ bg(ctx,'macro'); groundLine(700); slaPlant(560,700,0.9,{}); zoomCircle(ctx,1300,420,280,655,560,'één blad, doorgesneden',ramp(t,q.at('zoomen'),0.6),()=>{ ctx.fillStyle=C.bgMicro; ctx.fillRect(1000,120,600,600); leafCross(1300,420,560,{}); }); });
  const main=ramp(t,q.at('buitenkant')-0.3,0.6); alpha(ctx,main,()=>{ bg(ctx,'micro'); leafCross(960,470,1100,{opper:ramp(t,tO-0.5,0.5),moes:ramp(t,tM-0.5,0.5),vaat:ramp(t,tVb-0.5,0.5),hl});
    naamBij(ctx,'opperhuid','een laag platte cellen: beschermt',420,258,ramp(t,tO,0.5),'left','#C9D6E6');
    naamBij(ctx,'bladmoes','vol bladgroenkorrels:',385,450,ramp(t,tM,0.5),'right',C.groen); naamBij(ctx,'','maakt voedsel',385,478,ramp(t,tM,0.5),'right',C.groen);
    naamBij(ctx,'vaatbundel','in de nerf: vervoert water en voedsel',960,700,ramp(t,tVb,0.5),'center',C.oker);
    pill(ctx,960,100,'een blad is een orgaan: verschillende weefsels samen, met een eigen taak',C.goud,ramp(t,tB,0.5),28); });
},
// ---- H3 havo/vwo: gespecialiseerde cellen ----
s16(ctx,t,q){ bg(ctx,'micro'); const tP=q.at('plant');
  const a1=1-ramp(t,tP-0.3,0.6); if(a1>0.01) alpha(ctx,a1,()=>{
    const bt=ramp(t,q.at('bouwtekening'),0.5);
    const cells=[['spiercel',q.at('spiercel'),420,()=>muscleCell(420,470,440,1,34)],['zenuwcel',q.at('zenuwcel'),960,()=>neuron(820,470,0.9)],['rode bloedcel',q.at('rode'),1500,()=>rbc(1500,470,70)]];
    cells.forEach(([n,tt,x,fn])=>{ const a=ramp(t,tt,0.5); alpha(ctx,a,()=>{ fn(); text(ctx,n,x,640,fTekst(36,600),C.text,'center'); }); });
    alpha(ctx,ramp(t,q.at('korter'),0.4),()=>metaText(ctx,'lang, kan korter worden',420,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('uitlopers'),0.4),()=>metaText(ctx,'lange uitlopers: signalen ver doorgeven',960,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('plat'),0.4),()=>metaText(ctx,'klein en plat, geen celkern',1500,690,C.grain,'center',24));
    alpha(ctx,ramp(t,q.at('dunste'),0.4),()=>{ roundRect(ctx,1380,720,240,40,20); shape(ctx,rgba('#9A4A4A',0.35),'#C47070',2); rbc(1400+((t*60)%200),740,16); });
    pill(ctx,960,100,'dezelfde bouwtekening in de celkern',C.goud,fadeIO(t,q.at('bouwtekening'),q.at('gespecialiseerd'),0.4),30);
    alpha(ctx,ramp(t,q.at('celkern',2),0.4),()=>crossOut(ctx,1500,470,18,0.9));
    pill(ctx,960,100,'gespecialiseerd: de bouw van de cel past bij zijn taak',C.goud,ramp(t,q.at('gespecialiseerd'),0.5),30); });
  const a2=ramp(t,tP-0.3,0.6); if(a2>0.01) alpha(ctx,a2,()=>{ bg(ctx,'micro');
    plantCellV(520,470,380,280,{t,wall:1,chloro:1,vac:1,kern:1,mitos:1}); text(ctx,'cel in het bladmoes',520,820,fTekst(36,600),C.text,'center');
    alpha(ctx,ramp(t,q.at('wortel'),0.5),()=>{ plantCellV(1400,470,380,280,{t,wall:1,chloro:0,vac:1,kern:1,mitos:1}); text(ctx,'cel in de wortel',1400,820,fTekst(36,600),C.text,'center'); metaText(ctx,'geen bladgroenkorrels: daar is geen licht',1400,860,C.grain,'center',24); });
    pill(ctx,960,100,'ook bij de plant: de bouw past bij de taak',C.goud,ramp(t,tP,0.5),30); });
},
// ---- samenvatting: de trap ----
s17(ctx,t,q){ bg(ctx,'schema'); const al=[ramp(t,q.at('cel'),0.5),ramp(t,q.at('weefsel'),0.5),ramp(t,q.at('orgaan'),0.5),ramp(t,q.at('orgaanstelsel'),0.5),ramp(t,q.at('organisme'),0.5)];
  trap(al); trapArt(al,t);
  metaText(ctx,'van klein naar groot',120,120,C.grain,'left',26); text(ctx,'Van cel tot lichaam',120,190,fTitel(56),C.text);
  const sla=ramp(t,q.at('sla'),0.5); alpha(ctx,sla,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.92); ctx.fillRect(0,0,W,H); trap([1,1,1,1,1],false); metaText(ctx,'en de sla',120,120,C.groen,'left',26); text(ctx,'Van cel tot plant',120,190,fTitel(56),C.text); const R=[['bladmoescel',()=>plantCellV(285,560,70,52,{wall:1,chloro:1,vac:1,kern:1})],['bladmoes',()=>tissue(615,470,90,t)],['blad',()=>{ lettuceLeaf(945,420,120,70,0,3,945,500,G1,V1,{amp:0.06}); }],['wortelstelsel',()=>roots(1275,300,0.5)],['slaplant',()=>slaPlant(1600,400,0.45,{})]]; R.forEach(([n,fn],i)=>{ fn(); metaText(ctx,n,120+i*330+160,H-150,C.groen,'center',24); }); });
  const gym=ramp(t,q.at('gymles'),0.5); alpha(ctx,gym,()=>{ ctx.fillStyle=rgba(C.bgSchema,0.95); ctx.fillRect(0,0,W,H); const vG=grondV(400,'ren'), sc=vG*t; /* v1.2: vloer schuift exact mee met de pas */ ctx.fillStyle=rgba('#3A3550',0.9); ctx.fillRect(0,800,W,100); ctx.strokeStyle=rgba(C.goud,0.45); ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,840); ctx.lineTo(W,840); ctx.stroke(); ctx.strokeStyle=rgba('#E8833A',0.4); for(let x=-(sc%480);x<W+480;x+=480){ ctx.beginPath(); ctx.moveTo(x,806); ctx.lineTo(x-30,900); ctx.stroke(); } renner(900-vG*t,800,400,t,{vooruit:true,hart:1,adem:0.8,puf:0.8,beat:t*12,breath:t*7}); pill(ctx,960,150,'je spieren werken nooit alleen: je hele lichaam doet mee',C.goud,ramp(t,q.at('hele'),0.5),32); });
},
// ---- eindkaart: probeer het zelf (speelt 12 s) ----
s18(ctx,t,q){ bg(ctx,'schema'); text(ctx,'Onthoud',120,200,fTitel(80),C.text);
  const K=['Cel, weefsel, orgaan, orgaanstelsel, organisme.','Een orgaan is gemaakt van verschillende weefsels met één taak.','Organen werken samen: je hele lichaam doet mee.'];
  K.forEach((s,i)=>alpha(ctx,ramp(t,0.4+i*0.8,0.6),()=>{ const y=300+i*170; roundRect(ctx,120,y,1680,140,14); shape(ctx,rgba(C.bgSchema,0.95),i===0?C.goud:C.line,i===0?1.5:1); text(ctx,String(i+1),185,y+90,fTitel(60),C.goud,'center'); ctx.font=fTekst(38); ctx.fillStyle=C.text; ctx.textAlign='left'; wrap(ctx,s,260,y+84,1500,46); }));
  metaText(ctx,'biologie bij kamiel · stem: roos (elevenlabs) · versie 1.2 · oktober 2026',W/2,CAPTION_Y-10,C.text2,'center',22); },
};
