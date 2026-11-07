# Twijfels — vd3 Eten als behandeling: de diëtist in het ziekenhuis (31 okt 2026, script v2)

Na de blinde beoordelaar (variant A won, duidelijk). Alleen punten die voor script v1 nog gelden (regels.json V1). Vervallen: lengte H3 (nu 229 woorden), variant C (eiwit drie keer bijgesteld), ziekenhuiskeuken als decor. Niets gegenereerd. Bijgewerkt na de feitenreview (`reviews/review_v1.md`, script v2): t6 en t7 aangepast, t8 opgelost, t9 nieuw.

## t1 Eiwit vóór dialyse: 'minder' of 'niet meer dan nodig'
- **Twijfel:** de planning (en de oude startvraag) zegt 'vóór dialyse minder eiwit'. De Nederlandse richtlijn (NHG/NIV 2018; NfN/NIV 2020) adviseert bij een nierfunctie onder 30 een *normale* hoeveelheid (0,8 g/kg) en raadt strengere beperking af; de Amerikaanse KDOQI (2020) gaat lager (0,55–0,6). Nederlanders eten gemiddeld ± 1,0 g/kg.
- **Waarom:** het script zegt 'niet méér eiwit dan zijn lichaam nodig heeft. Dat is minder dan de meeste mensen eten', en tijdens dialyse 'omhoog, boven dat van een gezond mens' (in beeld 1–1,2). Dat klopt met beide richtlijnen en houdt het contrast. Wie 'eiwitarm dieet bij nierziekte' kent, kan dit als afwijking zien; het docentdeel noemt de twee richtlijnen. Getallen.md 24–25.

## t2 Hanneke in het ziekenhuis
- **Twijfel:** Hanneke is goedgekeurd als diëtist met een eigen praktijk (vd1, vd2). Hier werkt ze in het ziekenhuis.
- **Waarom:** diëtisten werken in beide ('alleen in haar eigen vak' blijft gewaarborgd). Geen bron dat één diëtist beide combineert; het script verklaart het niet. Alternatief: een nieuwe ziekenhuisdiëtist (afgeraden: meer cast, minder herkenning). Voorstel: Hanneke houden.

## t3 Patiënten en team
- **Twijfel:** **Mevrouw Jansen** (72, buurvrouw) als ondervoede patiënt met een gebroken heup na een val (H1, H2, H4) en **Erik** (38, figurant) als nierpatiënt in H3, naamloos in de stem.
- **Waarom:** Mevrouw Jansen past (ouderen grootste risicogroep; los van Noors familie); zij heeft al een eigen verhaal (vlinderteller, Forensisch 3) en een heupbreuk is een nieuwe stap in haar levensloop. Erik blijft binnen zijn grens (figurant, één hoofdstuk, geen eigen verhaal). Fysiotherapeut Femke (castboek, bestaat in `lib_cast.js`) en Verpleegkundige Jesse kort in H4, elk in hun eigen vak; in de stem 'de fysiotherapeut' zonder naam.

## t4 Nieuwe outfit en decor (alleen voorstel)
- **Twijfel:** nodig zijn een outfit `ziekenhuis` (ziekenhuishemd en vest) voor Mevrouw Jansen, en decor: ziekenhuiskamer (bed, raam, tafeltje) en ziekenhuisgang met dienbladenkar (cold open en recap).
- **Waarom:** er is al een ziekenhuisbed in code (`henkInBed` in Verpleegkunde 1, `films/vervolg/verpleegkunde-1-bel-je-de-arts/bron/src/scenes.js` r. 169) dat te veralgemenen is naar een bed met een ander castpersonage (let op maten: in Fysiotherapie 2 gaf een vaste bedlengte rare verhoudingen, WERKWIJZE-LESSEN). Eén ElevenLabs-decor per plek (recraft-v4.1, één variant, ± 240 credits) zou volstaan. Niets gegenereerd.

## t5 Lichaam en sonde in beeld (gevoelig)
- **Twijfel:** H2 toont een castpersonage met `lib_anatomie.js` (lever, beenspieren) en spiereiwit dat 'verdwijnt'; H4 een neussonde.
- **Waarom:** geen magere lichamen als schok, geen close-up van het inbrengen; de sonde schematisch in een zoomcirkel náást het gezicht (BEELDAFSPRAKEN: niets over het gezicht), het dienblad ernaast. Spierverlies als 'iets dunner been' in doorsnede. Geen gips of brace bij de heup. Kamiel: is een sonde in beeld acceptabel, of liever alleen het flesje en de trap met treden?

## t6 Hoe stellig over spierafbraak
- **Twijfel (v2 grotendeels opgelost):** v1 zei 'vet helpt mee, maar spaart de spieren niet'; de feitenreview (M1) vond dat te stellig. Nu: 'Vet levert de meeste energie, maar je hersenen draaien daar de eerste dagen niet op. Dus breekt je lichaam spiereiwit af.' Ketonen (die later spier sparen) staan niet in de stem.
- **Waarom nog op het blad:** 'na ± 1 dag bijna op' rust nog op één B-bron (LITFL) plus A-bronnen zonder dat getal (≈). Kamiel: ketonen weglaten (verdieping, docentdeel) of één zin 'later spaart je lichaam de spieren een beetje' (kost ± 8 woorden, film zit op 899)?

## t7 Bedrustonderzoek: toegeschreven, één bron
- **Twijfel:** 'gezonde ouderen verloren in tien dagen bedrust bijna een kilo spier uit hun benen' (Kortebein 2007) heb ik alleen in het nieuwsbericht van de eigen universiteit gezien (B12), niet in de JAMA-samenvatting zelf.
- **Waarom:** toegeschreven bewering → ≈. Steun uit B13 (A, Maastricht: 5 dagen gips, dijspier −3,5 %) en B14. Kan de frisse feitenreview de JAMA-letter openen, dan ✓; anders vervangen door het Maastrichtse onderzoek ('na vijf dagen met een been in het gips was de dijspier van jonge mannen al kleiner').
- **Na de feitenreview (K2):** ook de reviewer opende alleen het UAMS-bericht; 'spier' voor mager weefsel is een verantwoorde vereenvoudiging. Blijft ≈ (toegeschreven); meta '12 OUDEREN' toegevoegd. Kamiel: houden of vervangen door het Maastrichtse onderzoek?

## t8 Vochtbeperking vóór de dialyse — opgelost (v2)
- Feitenreview M2: vóór dialyse is een vochtbeperking meestal niet nodig, pas bij vochtophoping (Nierstichting B21 p. 34–35; NKF B39). Nu Eriks persoonlijke drinkadvies ('Hij plast nog maar weinig, dus hij krijgt een persoonlijk drinkadvies: minder drinken'), water niet meer in het rijtje 'hoopt op', eindkaart 'soms ook vocht'. Getallen.md 23a ✓. Niet meer voor Kamiel.

## t9 Kalium in de hoofdstuktitel
- **Twijfel:** de goedgekeurde titel 'Als de nieren stoppen: minder zout en kalium, en eiwit dat ineens anders moet' maakt van kaliumbeperking een algemene nierregel; die geldt alleen als het bloedkalium te hoog is (B21 p. 29; review K5).
- **Waarom:** in de stem staat het goed ('Ook zijn kalium is te hoog'). Titel niet zelf gewijzigd omdat Kamiel hem in de planning goedkeurde. Voorstel: 'minder zout, soms minder kalium, en eiwit dat ineens anders moet'.
